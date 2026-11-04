"""Earned combo endings bypass earlier CC immunity once, with finite boss recoil."""
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.add_init_script('requestAnimationFrame=()=>0')
    page.goto(os.environ.get('DINO_TEST_URL', 'http://127.0.0.1:8000')+'/games/Dino/index.html')
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        function reset(weapon){
            for(const k of Object.keys(keys))delete keys[k];
            xDatForm(weapon==='vergil'?10:9);startGame('normal');paused=false;dashVx=0;
            dino.x=240;dino.y=320-dino.h;dino.grounded=true;dino.isFacingLeft=false;
            if(weapon!=='vergil'){dino.dante.arm=({dsd:0,balrog:1,cavaliere:2,cerberus:3,faust:5})[weapon];danteSetStyle(1);}
            return weapon==='vergil'?dino.vergil:dino.dante;
        }
        const starters={dsd:dswStart,balrog:blrStart,cavaliere:cavStart,cerberus:kcbStart,vergil:ymtStart};
        function step(n=1){for(let i=0;i<n;i++){frames++;danteTick();for(const b of bosses)b.update();}}
        function boss(){const b={x:320,y:260,w:40,h:60,hp:10000,maxHp:10000,state:'idle',grounded:true,calls:0,update(){this.calls++;}};bosses.push(b);return b;}
        function strike(weapon,p,a,b){
            const pulse=a.hits?a.hits.length-1:0;
            if(weapon==='dsd'){a.age=a.end;dswStrike(dino,p,a,pulse,a.wind);}
            else if(weapon==='balrog')blrStrike(dino,p,blrState(p),a,pulse);
            else if(weapon==='cavaliere')cavStrike(dino,p,cavState(p),a,pulse);
            else if(weapon==='cerberus')kcbStrike(dino,p,kcbState(p),a,pulse);
            else ymtStrike(dino,p,a,pulse);
        }
        const checked=[];
        for(const weapon of Object.keys(starters))for(const route of PLAYER_FINISH_ROUTES[weapon]){
            const p=reset(weapon),start=id=>{
                if(weapon==='balrog'&&route[0]==='a1'){
                    if(['a1','a2','retreat_round'].includes(id)){p.arm=0;dswStart(id);}
                    else if(id==='flydragon1')danteBalrogRelay();
                    else blrStart(id);
                }else starters[weapon](id);
            };
            // Use the real attack controllers and clocks for all preceding moves.
            for(const id of route.slice(0,-1)){
                start(id);const a=p.attack;let timeout=240;
                while(p.attack===a&&timeout-->0)step();
                check(timeout>0,'move never ends '+weapon+id);
            }
            const b=boss();const c=dswControl(b,{hold:true},p);check(c,'opening control rejected');
            step(37);b.state='charging';check(!dswControl(b,{launch:true},p),'ordinary CC ignored immunity');
            // Reconnect within the normal input window after the earlier Opening expires.
            start(route.at(-1));const a=p.attack;
            check(a._comboFinish,'route failed qualification '+[weapon,route]);
            b.x=320;b.y=dino.y;b.h=dino.h;const hp=b.hp;
            if(a.launchBike){
                cavState(p).thrownBike={attack:a,x:b.x-18,y:320,dir:1,vx:0,t:0,hit:new Set(),damage:6};
                cavTick(dino,p);
            }else strike(weapon,p,a,b);
            check(b.hp<hp&&a._finishHits?.has(b)&&b._dswControl?.vx>10,'finisher blocked '+[weapon,route.at(-1)]);
            const window=danteBossWindows.get(b),until=window.until,x=b.x;
            // Additional contacts cannot renew the kick or its twelve-frame boss lock.
            playerFinisherControl(dino,p,a,b);check(window.until===until,'finisher renewed stun');
            p.attack=null;for(const state of [p.sword,p.balrog,p.cavaliere,p.cerberus])if(state)state.queue=[];
            step(14);check(b.x>x+50&&!b._dswControl&&b.calls>=3,'boss cannot retaliate '+[weapon,route,b.x-x,b.calls]);
            check(!dswControl(b,{hold:true},p),'finisher opened a fresh infinite combo');
            checked.push(weapon+':'+route.at(-1));
        }
        // Standalone finish IDs, interrupted routes and expired links never earn an exception.
        for(const weapon of ['dsd','balrog','cavaliere','cerberus','vergil']){
            const p=reset(weapon),route=PLAYER_FINISH_ROUTES[weapon][0],start=starters[weapon],b=boss();
            b.state='charging';danteBossWindows.set(b,{until:frames-1,ready:frames+120});
            start(route.at(-1));const a=p.attack;strike(weapon,p,a,b);
            check(!a._comboFinish&&!b._dswControl,'standalone finisher bypass '+weapon);
            reset(weapon);const live=weapon==='vergil'?dino.vergil:dino.dante;
            start(route[0]);live.attack.age=0;start(route[1]);start(route.at(-1));
            check(!live.attack._comboFinish,'skipped windup earned finisher '+weapon);
            reset(weapon);const expired=weapon==='vergil'?dino.vergil:dino.dante;
            for(const id of route.slice(0,-1)){start(id);const before=expired.attack;while(expired.attack===before)step();}
            step(46);start(route.at(-1));check(!expired.attack._comboFinish,'expired route earned finisher '+weapon);
        }
        // Vergil's two-hit ending knocks back only on its final slash, even after another CC group.
        const v=reset('vergil');for(const id of ['m_combo1','m_combo2']){ymtStart(id);const a=v.attack;while(v.attack===a)step();}
        const mob={x:300,y:262,w:40,h:58,hp:1000,maxHp:1000,grounded:true,update(){}};enemies.push(mob);
        vgCanApplyCC(mob,'upper');ymtStart('m_combo3');const a=v.attack;
        ymtStrike(dino,v,a,0);check(!a._finishHits&&!mob._dswControl,'Mirage pushes before final slash');
        ymtStrike(dino,v,a,1);check(a._finishHits.has(mob)&&mob._dswControl.vx===24,'Vergil final slash lost to shared lockout');
        const bp=reset('balrog');for(const id of ['k1','k2']){blrStart(id);const before=bp.attack;while(bp.attack===before)step();}
        const airMob={x:320,y:260,w:40,h:60,hp:1000,maxHp:1000,grounded:true,update(){}};enemies.push(airMob);
        blrStart('k3');blrStrike(dino,bp,blrState(bp),bp.attack,0);
        check(airMob._dswControl?.air&&Number.isFinite(airMob._dswControl.targetY),'finisher removed launch height cap');
        const minY=airMob._dswControl.targetY;let high=airMob.y;
        for(let i=0;i<180;i++){frames++;airMob.update();high=Math.min(high,airMob.y);}
        check(high>=minY-10&&airMob.grounded&&!airMob._dswControl,'launched finisher never lands');
        const fp=reset('faust');dino.dante.arm=5;
        function hatSlash(){keys.KeyS=true;faustCommand(true,0);keys.KeyS=false;}
        for(let i=0;i<2;i++){hatSlash();const before=fp.attack;while(fp.attack===before)step();}
        const hatBoss=boss();hatBoss.x=290;hatBoss.state='charging';
        danteBossWindows.set(hatBoss,{until:frames-1,ready:frames+120});
        hatSlash();const lastHat=fp.attack;check(lastHat.id==='upper'&&lastHat._comboFinish,'Faust hat chain lost');
        for(let i=0;i<25&&!lastHat._finishHits?.has(hatBoss);i++)step();
        check(lastHat._finishHits?.has(hatBoss)&&hatBoss._dswControl?.vx>10,'Faust finisher blocked');
        checked.push('faust:upper');
        check(!_loiKhung.size,'caught game errors');
        return {earnedFinishers:checked,boss:'one 12-frame recoil, >50 px, then AI resumes; ordinary CC stays resisted'};
    }'''))
    assert not errors, errors
    browser.close()
