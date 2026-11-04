"""Artorias import: 30-damage Abyss interruption, new moves, poses and lifecycle.

Requires Python Playwright, Chromium and a server at DINO_TEST_URL (default port 8000).
"""
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1100,'height':800})
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.add_init_script('window.requestAnimationFrame=()=>0;')
    page.goto(os.environ.get('DINO_TEST_URL','http://127.0.0.1:8000')+'/games/Dino/index.html')
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        window.artSetup=function(buffed=false){
            for(const k of Object.keys(keys))delete keys[k];
            xDatForm(0);startGame('normal');paused=true;runeSlots=[null,null];setupArtoriasArena();
            dino.x=350;dino.y=320-dino.h;dino.grounded=true;dino.invincible=true;dino.invTimer=99999;
            const b=new ArtoriasBoss(1);b.x=550;b.y=b.baseY;b.state='idle';b.actionTimer=99999;
            b.buffed=buffed;bosses.push(b);return b;
        };
        window.artStep=function(b,n=1){for(let i=0;i<n;i++){frames++;b.update();b.draw();}};
        function channel(){const b=artSetup();b.hp=140;artStep(b);check(b.state==='a_buff'&&b.buffHp===140,'native channel did not start');return b;}
        check(ART_BUFF_HP===30&&ART_BUFF_T===185,'wrong channel configuration');
        let b=channel();dealDamage(b,22,'flat');artStep(b);
        check(b.state==='a_buff'&&!b.stagger,'old 22 threshold still interrupts');
        dealDamage(b,7,'flat');artStep(b);check(b.state==='a_buff'&&!b.stagger,'29 damage interrupts');
        const labels=[],fill=ctx.fillText;ctx.fillText=function(t,...args){labels.push(t);return fill.call(this,t,...args);};
        try{b.draw();}finally{ctx.fillText=fill;}
        check(labels.some(t=>t.includes('29/30')),'HUD does not show the 30-damage goal');
        dealDamage(b,1,'flat');artStep(b);
        check(b.state==='staggered'&&b.stagger===110&&!b.buffed,'30 damage does not interrupt/stagger');
        artStep(b,110);check(!b.stagger&&b.state==='idle','stagger recovery stuck');
        b.hp=70;artStep(b);check(b.state==='a_buff'&&b.buffTries===2,'second native buff attempt missing');
        dealDamage(b,30,'flat');artStep(b);check(b.stagger===110,'second attempt not interruptible');
        artStep(b,110);b.hp=20;artStep(b);check(b.state!=='a_buff'&&b.buffTries===2,'more than two buff attempts');
        b=channel();artStep(b,Math.floor(ART_BUFF_T/b.spd()));
        check(!b.buffed&&b.state==='a_buff','buff finishes before its timer');artStep(b);
        check(b.buffed&&b.burst&&b.wisps.length===3&&b.state==='idle','uninterrupted buff did not create burst/wisps');
        b.actionTimer=99999;artStep(b,180);check(!b.wisps.length&&!b.burst,'buff hazards never expire');
        // Damage before the channel starts must not count toward its interruption.
        b=artSetup();dealDamage(b,55,'flat');artStep(b);
        check(b.state==='a_buff'&&b.buffHp===b.hp&&!b.stagger,'pre-channel damage counts toward interruption');
        return 'PASS 22/29 damage cannot interrupt; exactly 30 staggers for 110 frames, HUD, two attempts, timeout and hazard expiry';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        const results=[];
        for(const buffed of [false,true])for(const id of Object.keys(ART_CD)){
            const b=artSetup(buffed);b.state=id;b.subTimer=0;b.faceP();
            let elapsed=0,flipped=false,crouched=false,slashed=false;
            while(b.state===id&&elapsed<800){
                artStep(b);elapsed++;
                flipped||=Math.abs(b.flipAngle)>.2;crouched||=b.crouch>=6;slashed||=!!b.slash;
                check([b.x,b.y,b.dy,b.armR,b.swordAngle,b.flipAngle,b.crouch,b.lean].every(Number.isFinite),'invalid move pose '+id);
            }
            check(b.state==='idle'&&elapsed<800,'move stuck '+id+' buff '+buffed);
            check(b.flipAngle===0&&b.crouch===0,'move never reset pose '+id);
            if(id==='a_flip'||id==='a_roll')check(flipped,'body never somersaults '+id);
            if(id==='a_lunge')check(crouched&&slashed,'lunge missing crouch/strike');
            if(id==='a_howl')check(b._howlMode==='dash'&&slashed,'far howl mode missing');
            results.push([buffed,id,elapsed]);
        }
        for(const buffed of [false,true]){
            const b=artSetup(buffed);b.x=430;dino.x=350;b.state='a_howl';b.subTimer=0;
            let strikes=0,last=null,recovery=0;
            while(b.state==='a_howl'){
                artStep(b);if(b.slash&&b.slash!==last){strikes++;last=b.slash;}
                if(b.subTimer>=64)recovery++;
            }
            check(b._howlMode==='spin'&&strikes>1&&recovery>10,'close howl has no spin/recovery');
        }
        // Wisps curve toward the player and can be shot down by ordinary rounds.
        let b=artSetup();b.spawnAbyssWisps(3);const w=b.wisps[0];
        for(let i=0;i<20;i++){frames++;b.tickWisps();}
        check(w.t===20&&Math.hypot(w.vx,w.vy)<=5,'wisp speed/homing invalid');
        projectiles.push({owner:1,x:w.x-15,y:w.y-15,w:30,h:30,dmg:1});frames++;b.tickWisps();
        check(b.wisps.length===2,'ordinary projectile cannot break wisp');
        setupGaelArena();check(mapTheme==='gael'&&typeof new GaelBoss(1).update==='function','import damaged neighboring Gael arena/class');
        check(_loiKhung.size===0,'caught frame errors');
        return 'PASS '+results.length+' attack variants, both howl modes, somersault poses, crouch lunge, recovery, wisps and Gael isolation';
    }'''))
    assert not errors,errors
    browser.close()
