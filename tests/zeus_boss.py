"""Zeus: ritual timing/counterplay, mirrored melee, player rigs and full native lifecycle."""
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1100,'height':740});errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.add_init_script('requestAnimationFrame=()=>0;')
    page.goto(os.environ.get('DINO_TEST_URL','http://127.0.0.1:8009')+'/games/Dino/index.html')
    page.evaluate('''()=>{
        window.check=(ok,msg)=>{if(!ok)throw Error(msg);};
        window.zSetup=(air=false,left=true,form=0)=>{
            for(const k in keys)delete keys[k];runeSlots=[null,null];currentPower=0;phuKien=0;
            xDatForm(form);testBossSelection=82;startGame('test_boss');bossWaitTimer=0;spawnEntities();
            const b=bosses[0];check(b instanceof ZeusBoss&&mapTheme==='olympus','real spawn');b.idle(9999);
            b.airborne=air;b.grounded=!air;b.y=air?178-b.h:b.baseY;b.x=left?650:180;
            dino.x=left?250:650;dino.y=320-dino.h;dino.dy=0;dino.grounded=true;dino.invincible=true;dino.invTimer=99999;b.faceP();return b;
        };
        window.zTick=(b,draw=true)=>{
            frames++;b.update();
            for(let i=bossProjectiles.length-1;i>=0;i--){const q=bossProjectiles[i];q.update();if(draw)q.draw();if(bossProjRaNgoai(q))bossProjectiles.splice(i,1);}
            if(draw){const m=ctx.getTransform(),alpha=ctx.globalAlpha;b.draw();const n=ctx.getTransform();check(m.a===n.a&&m.b===n.b&&m.c===n.c&&m.d===n.d&&m.e===n.e&&m.f===n.f&&ctx.globalAlpha===alpha,'Canvas state leak');}
            check([b.x,b.y,b.hp,b.w,b.h].every(Number.isFinite),'invalid boss position');
            check(b.x>=0&&b.x+b.w<=canvas.width,'escaped arena');
            check(bossProjectiles.every(q=>[q.x,q.y,q.vx,q.vy].every(Number.isFinite)),'invalid projectile');
        };
    }''')
    print(page.evaluate('''()=>{
        let combinations=0;
        for(const air of [false,true])for(const left of [false,true]){
            for(const move of zSetup(air,left).legalMoves()){
                const b=zSetup(air,left);check(b.begin(move),'legal move rejected');let recovered=false;
                for(let i=0;i<400;i++){zTick(b);if(b.state==='idle'){recovered=true;break;}}
                check(recovered,'infinite move '+move);check(!b.slash&&!b.portal&&!b.hazards.length,'stale attack '+move);
                check(b.airborne===air,'move changes stance unexpectedly');combinations++;
            }
        }
        const b=zSetup();check(!b.begin('z_rain'),'ground casts aerial ritual');b.airborne=true;check(!b.begin('z_blade'),'air uses grounded dash');
        return 'PASS '+combinations+' move/stance/direction variants, finite attacks and clean Canvas';
    }'''))
    print(page.evaluate('''()=>{
        for(const left of [true,false]){
            const b=zSetup(false,left);b.begin('z_blink');const target=b.portal.x,start=b.x;
            let damage=0;const take=dino.takeDamage;dino.takeDamage=()=>damage++;dino.isShielding=()=>false;
            dino.x=target-dino.w/2;
            for(let i=0;i<28;i++)zTick(b);check(b.x===start&&!damage,'teleport warning too short');
            zTick(b);check(Math.abs(b.cx()-target)<.001&&!damage,'arrival damages immediately');
            for(let i=0;i<13;i++)zTick(b);check(!damage,'missing arrival delay');
            zTick(b);check(damage===1,'missing small arrival shock');
            for(let i=0;i<17;i++)zTick(b);check(damage===1,'shock repeats every frame');
            dino.takeDamage=take;
            const teleports=[];let prev=b.x;
            for(let i=60;i<245;i++){zTick(b);if(Math.abs(b.x-prev)>20)teleports.push(b.x);prev=b.x;}
            check(teleports.length===2,'missing second/third teleport');
        }
        // Locked targets can be dodged; leaving the destination does not move it after the player.
        const b=zSetup();b.begin('z_blink');const x=b.portal.x;dino.x=800;
        for(let i=0;i<45;i++)zTick(b);check(b.cx()===x&&b.hazards[0].x===x,'teleport tracks through wind-up');
        return 'PASS three teleports, 28-frame destination warning, 14-frame arrival delay, one hit and fixed dodgeable destination';
    }'''))
    print(page.evaluate('''()=>{
        for(const move of ['z_tempest','z_rain','z_cataclysm']){
            const b=zSetup(true);b.begin(move);const cast=ZEUS_MOVES[move].cast;
            let damage=0;const take=dino.takeDamage;dino.takeDamage=()=>damage++;dino.isShielding=()=>false;
            if(move==='z_tempest')dino.x=170-dino.w/2;
            if(move==='z_cataclysm')dino.x=0;
            for(let i=0;i<cast-1;i++)zTick(b);check(!damage,'ritual fires before channel finishes '+move);
            zTick(b);if(move!=='z_rain')check(damage===1,'ritual never releases '+move);
            if(move==='z_rain'){
                check(b.hazards.length===3,'rain first row');dino.x=canvas.width/18-dino.w/2;
                for(let i=0;i<44;i++)zTick(b);check(!damage,'rain marks have no dodge window');
                zTick(b);check(damage===1,'rain first row does not land');
            }
            for(let i=0;i<18;i++)zTick(b);check(damage===1,'persistent hazard repeats');
            dino.takeDamage=take;
        }
        for(const form of [0,7,8,9,10])for(const px of [0,480,900]){
            const b=zSetup(true,true,form);dino.x=px;b.begin('z_cataclysm');dino.x=b.safeX-dino.w/2;
            let hits=0;const take=dino.takeDamage;dino.takeDamage=()=>hits++;dino.isShielding=()=>false;
            for(let i=0;i<175;i++)zTick(b);dino.takeDamage=take;check(!hits,'safe corridor clips rig '+form);
        }
        const b=zSetup(true);b.begin('z_rain');let bolts=0,ages=[];
        for(let i=0;i<306;i++){const before=b.hazards.length;zTick(b);if(b.hazards.length>before){bolts+=b.hazards.length-before;ages.push(i+1);}}
        check(bolts===9&&ages.join(',')==='100,148,196','rain pattern / telegraphs wrong');
        return 'PASS long ritual channels, staggered 45-frame rain markers, nine strikes, one hit per field and safe corridor for all rigs at both edges';
    }'''))
    print(page.evaluate('''()=>{
        for(const move of ['z_tempest','z_rain','z_cataclysm']){
            let b=zSetup(true);b.begin(move);for(let i=0;i<25;i++)zTick(b);
            dealDamage(b,11,'flat');zTick(b);check(b.state===move,'cast breaks too early');
            dealDamage(b,1,'flat');b.combatTick();check(b.state==='z_fall'&&!b.hazards.length&&!b.invulnAll,'12 damage does not interrupt '+move);
            for(let i=0;i<40;i++)zTick(b);check(b.state==='z_exposed'&&!b.airborne&&b.grounded&&b.y===b.baseY,'interrupted caster stuck in sky');
            for(let i=0;i<89;i++)zTick(b);check(b.state==='z_exposed','no punish window');zTick(b);check(b.state==='idle','punish window never ends');
        }
        let b=zSetup();runeSlots=['firststrike',null];dealDamage(b,1,'flat');check(b.hp===191,'First Strike lost');dealDamage(b,1,'flat');check(b.hp===190,'First Strike repeats');runeSlots=[null,null];
        b=zSetup(true);b.begin('z_cataclysm');b.hp=0;b.combatTick();check(!b.hazards.length,'death leaves sky punishment');
        return 'PASS 12-damage cast interrupt → grounded 90-frame opening; First Strike and death cleanup';
    }'''))
    print(page.evaluate('''()=>{
        for(const left of [false,true]){
            const b=zSetup(false,left);b.x=400;dino.x=left?b.x-60:b.x+b.w+30;b.begin('z_blade');
            let hits=0;const take=dino.takeDamage;dino.takeDamage=()=>hits++;dino.isShielding=()=>false;
            for(let i=0;i<57;i++)zTick(b);check(!hits,'dash body deals invisible contact damage');
            for(let i=0;i<85;i++)zTick(b);dino.takeDamage=take;check(hits>=1&&hits<=2,'mirrored sword missing or repeated '+left+' '+hits);
            const q=zSetup(false,left);q.begin('z_spear');for(let i=0;i<51;i++)zTick(q);check(!bossProjectiles.length,'spear too early');
            zTick(q);check(bossProjectiles.length===1,'spear never releases');const shot=bossProjectiles[0];check((shot.vx<0)===left,'spear flies backwards');
        }
        const b=zSetup();b.begin('z_blade');dino.invincible=false;dino.invTimer=0;dino.meleeTimer=26;dino.parryWindow=3;perfectParryCd=0;
        const hp=dino.hp,bhp=b.hp;b.hurt({x:dino.x,y:dino.y,w:dino.w,h:dino.h},'parry-test');
        check(dino.hp===hp&&b.hp<bhp&&b.state==='z_exposed','perfect guard cannot stop melee');
        return 'PASS mirrored swept sword, no passive dash damage, directional native spear and perfect-guard opening';
    }'''))
    print(page.evaluate('''()=>{
        for(const left of [false,true]){
            const b=zSetup(false,left);b.begin('z_hunt');const poses=[],lands=[];let prevX=b.x,minY=b.y;
            for(let i=1;i<=354;i++){
                zTick(b);if(Math.abs(b.x-prevX)>30)lands.push(i);prevX=b.x;minY=Math.min(minY,b.y);
                if([52,144,216].includes(i))check(!!b.slash,'missing thunder hunt sword '+i);
                if(i===232)check(b.grounded&&b.y===b.baseY,'hunt does not land');
            }
            check(lands.join(',')==='29,120','hunt teleport timings '+lands);check(minY<b.baseY-90,'hunt has no aerial finisher');
            check(b.state==='idle'&&!b.hazards.length&&!b.slash,'hunt never recovers');
        }
        const b=zSetup(true);b.begin('z_crown');const sent=[],origins=[];
        for(let i=1;i<=298;i++){
            zTick(b);if(i===96){check(b.crown[0].locked&&!b.crown[1].locked,'lance does not lock 24 frames early');const q=b.crown[0];origins.push({x:q.x,y:q.y,tx:q.tx,ty:q.ty});dino.x=800;}
            for(const q of bossProjectiles)if(!sent.includes(q)){sent.push(q);check([120,136,152,168,184,200,216].includes(i),'unexpected crown fire timing '+i);}
        }
        check(sent.length===7,'missing crown lances '+sent.length);
        const q=sent[0],origin=origins[0],angle=Math.atan2(origin.ty-origin.y,origin.tx-origin.x);
        check(Math.abs(q.vx-Math.cos(angle)*7.5)<.001&&Math.abs(q.vy-Math.sin(angle)*7.5)<.001,'lance follows player after aim lock');
        check(q.spawn.x===origin.x&&q.spawn.y===origin.y,'lance detaches from wrong point');
        check(sent.every(q=>q.w===20&&q.h===20&&q.dmg===1),'lance wake gets a giant hidden hitbox');
        return 'PASS mirrored teleport → two cuts → aerial finisher; exactly seven crown lances, locked aim, correct release points and small damage tips';
    }'''))
    print(page.evaluate('''()=>{
        let b=zSetup();b.begin('z_clap');const h=b.hazards[0];
        let damage=0;const take=dino.takeDamage;dino.takeDamage=()=>damage++;dino.isShielding=()=>false;
        dino.x=h.x+100;dino.y=h.y-10;dino.w=dino.h=20;
        for(let i=0;i<83;i++)zTick(b);check(!damage,'clap fires before windup');
        for(let i=0;i<25;i++)zTick(b);check(damage===1,'clap pulse missing/repeated');dino.takeDamage=take;
        check(!zeusPulseTouches({x:200,y:200,age:20,warn:0,life:24},{x:195,y:195,w:10,h:10}),'clap damages hollow interior after shell passes');
        check(zeusPulseTouches({x:200,y:200,age:20,warn:0,life:24},{x:360,y:195,w:10,h:10}),'clap shell does not match visible ring');
        b=zSetup(true);b.begin('z_tempest');for(let i=0;i<160;i++)zTick(b);const bridge=b.hazards.find(h=>h.kind==='bridge');
        check(bridge&&bridge.age===0,'storm has no second-stage lightning bridge');
        damage=0;dino.takeDamage=()=>damage++;dino.isShielding=()=>false;dino.x=(bridge.x+bridge.toX)/2;dino.y=bridge.y-10;dino.w=dino.h=20;
        for(let i=0;i<41;i++)zTick(b);check(!damage,'bridge warning too short');zTick(b);check(damage===1,'bridge never fires');
        b=zSetup(true);b.begin('z_cataclysm');for(let i=0;i<178;i++)zTick(b);const wave=b.hazards.find(h=>h.kind==='ring');
        check(wave?.warn===38,'cataclysm has no warned aftershock');damage=0;dino.takeDamage=()=>damage++;dino.isShielding=()=>false;dino.w=dino.h=20;dino.x=b.cx()+140;dino.y=270;
        for(let i=0;i<125;i++)zTick(b);check(!damage,'jump cannot avoid the ground aftershock');
        return 'PASS delayed hollow clap pulse, 42-frame storm-bridge warning and jumpable final aftershock';
    }'''))
    print(page.evaluate('''()=>{
        for(const move of ['z_crown','z_clap']){
            const b=zSetup(move==='z_crown');b.begin(move);for(let i=0;i<45;i++)zTick(b);dealDamage(b,12,'flat');b.combatTick();
            check(['z_fall','z_exposed'].includes(b.state)&&!b.crown.length&&!b.hazards.length,'new ritual cannot be interrupted '+move);
            for(let i=0;i<200;i++)zTick(b);check(!bossProjectiles.length,'interrupted crown still launches');
        }
        let b=zSetup();b.idle(0);b.chooseAttack();check(b.state==='z_hunt','new grounded signature hidden behind RNG');
        b=zSetup(true);b.idle(0);b.chooseAttack();check(b.state==='z_crown','new aerial signature hidden behind RNG');
        return 'PASS new rituals cancel pending lances/fields; first ground and aerial choices expose the new signatures';
    }'''))
    print(page.evaluate('''()=>{
        for(const form of [0,7,8,9,10]){
            const b=zSetup(false,true,form);b.x=400;dino.x=b.x-55;dino.y=320-dino.h;loopAnToan();
            dispatchEvent(new KeyboardEvent('keydown',{code:'KeyJ'}));for(let i=0;i<100;i++)loopAnToan();dispatchEvent(new KeyboardEvent('keyup',{code:'KeyJ'}));
            check(b.hp<240,'real J cannot damage Zeus '+form);
        }
        const b=zSetup();b.idle(1);const seen=new Set();let air=false,ground=false;
        for(let i=0;i<4400;i++){
            dino.invincible=true;dino.invTimer=99999;dino.x=300+Math.sin(i*.008)*170;loopAnToan();
            seen.add(b.state);air ||= b.airborne;ground ||= !b.airborne;check(!gameOver&&b.hp>0,'native fight ended');
        }
        for(const state of ['z_ascend','z_descend','z_tempest','z_rain','z_cataclysm'])check(seen.has(state),'AI misses '+state+' '+[...seen]);
        check(air&&ground&&!b.invulnAll,'stance loop / permanent immunity');check(!_loiKhung.size,'caught frame errors '+[..._loiKhung]);
        b.hp=0;for(let i=0;i<100;i++)loopAnToan();check(!bosses.includes(b),'native defeat never finishes');
        testBossSelection=0;startGame('test_boss');bossWaitTimer=0;spawnEntities();check(bosses[0] instanceof TRexBoss&&mapTheme!=='olympus','arena leaks on restart');
        return 'PASS real J across five rigs; 4,400 native frames, both stances, all sky rituals, final defeat and restart isolation';
    }'''))
    # Reach the casting body with each real player rig using a jump from the altar.
    print(page.evaluate('''()=>{
        for(const form of [0,7,8,9,10]){
            const b=zSetup(true,true,form);b.x=340;b.y=178-b.h;dino.x=268;dino.y=236-dino.h;dino.grounded=true;
            if(form===8){const a=dino.apex;a.state.x=dino.x/.55;a.state.y=(236-dino.h)/.55;}
            dispatchEvent(new KeyboardEvent('keydown',{code:'Space'}));let reached=false;
            for(let i=0;i<32;i++){if(i===8)dispatchEvent(new KeyboardEvent('keydown',{code:'KeyJ'}));loopAnToan();if(dino.y<178&&dino.y+dino.h>b.y)reached=true;}
            for(let i=0;i<45;i++)loopAnToan();dispatchEvent(new KeyboardEvent('keyup',{code:'KeyJ'}));
            dispatchEvent(new KeyboardEvent('keyup',{code:'Space'}));check(reached,'altar cannot reach caster with rig '+form);check(b.hp<240,'jumping J cannot hit aerial boss '+form);
        }
        return 'PASS real jump + J from altar damages aerial boss with Dino / X / Apex / Dante / Vergil';
    }'''))
    button=page.evaluate('''()=>{gameState='test_menu';for(let i=0;i<getTestMenuLayout().np;i++){testMenuPage=i;const L=getTestMenuLayout(),c=L.btns.find(c=>c.it[1]===82);if(c){drawTestMenu();const r=canvas.getBoundingClientRect();return {x:r.x+(c.x+c.w/2)*r.width/canvas.width,y:r.y+(c.y+c.h/2)*r.height/canvas.height};}}throw Error('Missing mythological menu entry');}''')
    page.mouse.click(button['x'],button['y'])
    page.evaluate("for(let i=0;i<130;i++)loopAnToan();check(bosses[0] instanceof ZeusBoss,'actual menu click');")
    page.screenshot(path='/tmp/zeus-boss-final.png')
    assert not errors,errors
    print('PASS actual mythological menu click; no browser errors')
    browser.close()
