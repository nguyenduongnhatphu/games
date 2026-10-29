"""Gael upgrade: all phases/moves, acrobatic volleys, cape layers and cleanup."""
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1100, 'height': 800})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.add_init_script('requestAnimationFrame=()=>0')
    page.goto(os.environ.get('DINO_TEST_URL', 'http://127.0.0.1:8000')+'/games/Dino/index.html')
    page.evaluate('''() => {
        window.gCheck=(ok,why)=>{if(!ok)throw Error(why);};
        window.gSetup=(stage=1,left=false)=>{
            for(const k of Object.keys(keys))delete keys[k];
            xDatForm(0);startGame('normal');paused=false;setupGaelArena();testBossSelection=68;
            spawnTimerCactus=spawnTimerEnemy=999999;nextBossScore=99999999;
            dino.x=left?650:300;dino.y=320-dino.h;dino.grounded=true;dino.invincible=true;dino.invTimer=999999;
            const b=new GaelBoss(1);bosses.push(b);b.stage=stage;b.phase=stage===3?2:1;
            b.w=stage===1?GAE_W:GAE_W2;b.h=stage===1?GAE_H:GAE_H2;
            b.y=b.baseY=320-b.h;b.x=left?490:420;b.state='idle';b.actionTimer=999999;
            b.hp=b.maxHp=GAE_HP[stage];b.faceP();return b;
        };
        window.gStep=b=>{
            frames++;b.update();
            const before=ctx.getTransform(),alpha=ctx.globalAlpha;
            b.draw();const after=ctx.getTransform();
            gCheck(['a','b','c','d','e','f'].every(k=>before[k]===after[k])&&ctx.globalAlpha===alpha,'Gael leaked Canvas state');
            gCheck([b.x,b.y,b.dy,b.dashV,b.armR,b.flipAngle,b.capeWhip,b.capeAngle,b.noGoc].every(Number.isFinite),'nonfinite Gael pose');
            for(const q of bossProjectiles)gCheck([q.x,q.y,q.vx,q.vy].every(Number.isFinite),'nonfinite Gael bolt');
        };
    }''')
    print(page.evaluate('''() => {
        const moves=[];
        for(const stage of [1,2,3])for(const id of Object.keys(GAE_CD).filter(id=>GAE_PHA[id]<=stage)){
            const b=gSetup(stage);b.state=id;let t=0;
            while(b.state===id&&t++<800)gStep(b);
            gCheck(t<800&&b.state==='idle','Gael attack stuck '+[stage,id,t,b.state]);
            gCheck(b.flipAngle===0&&b.noGoc===0&&b.quay===0&&b.crouchLean===undefined,'attack pose not released '+id);
            moves.push([stage,id,t]);
        }
        const flights=[];
        for(const stage of [1,2,3])for(const left of [false,true])for(const mainCombo of [false,true]){
            const b=gSetup(stage,left),id=mainCombo?'g_combo':'g_vuot';b.state=id;
            const arrows=new Set();let flip=false,cape=false,land=-1,t=0,maxSpin=0;
            const sides=new Set();
            while(b.state===id&&t<400){
                gStep(b);t++;
                // The real combo chooses its ending on its first tick; exercise the upgraded branch.
                if(t===1&&mainCombo)b._ketKieu='vuot';
                for(const q of bossProjectiles)arrows.add(q);
                flip ||= b.flipAngle>.4;cape ||= b.capeWhip>.8;
                maxSpin=Math.max(maxSpin,Math.abs(b.quay));
                sides.add(Math.sign(b.cx()-dino.x-dino.w/2));
                if((mainCombo?b._daKet:b._daVuot)&&land<0)land=t;
            }
            const recovery=t-land,minimum=Math.floor((mainCombo?26:28)/b.spd());
            gCheck(arrows.size===4&&[...arrows].every(q=>q.frail&&q.vy>=4.8),'aerial volley missing/duplicate '+[stage,left,mainCombo,arrows.size]);
            gCheck(flip&&cape&&maxSpin>2&&sides.has(-1)&&sides.has(1),'no somersault/cape/spin/crossing '+[stage,left,mainCombo]);
            gCheck(land>0&&recovery>=minimum&&b.grounded&&b.state==='idle','flight cut off before landing/spin recovery '+[stage,mainCombo,t,land,recovery,minimum]);
            gCheck(!b.noTay&&!b.flipAngle&&!b.capeWhip&&!b._daVuot&&!b._daKet,'acrobatic pose leaked after ending');
            flights.push([stage,left,mainCombo,arrows.size,recovery]);
        }
        return {moves:moves.length,acrobaticVariants:flights};
    }'''))
    print(page.evaluate('''() => {
        let b=gSetup(2),damage=[];b.hurtP=n=>damage.push(n);
        dino.x=b.x+b.w+24;dino.y=b.y;dino.w=40;dino.h=b.h;b.faceP();
        b.doSlash(132,24,10);b.themHopAo(132,24,10);
        for(let i=0;i<22;i++)gStep(b);
        gCheck(damage.length===2&&damage.every(n=>n===1),'sword/cape must hit once each for one damage '+damage);
        b=gSetup();
        for(const stage of [2,3]){
            b.flipAngle=2.4;b.capeWhip=1;b.noGoc=2;b.crouchLean=.38;b.quay=8;b.noTay=1;
            b.y=90;b.dy=-8;b.grounded=false;b.dashV=16;b._daVuot=b._daKet=true;
            b.startPhase2();
            gCheck(b.stage===stage&&b.phase===(stage===3?2:1)&&b.hp===GAE_HP[stage],'wrong phase/health');
            gCheck(!b.flipAngle&&!b.capeWhip&&!b.quay&&!b.noGoc&&!b.noTay&&!b._daVuot&&!b._daKet&&b.crouchLean===undefined,'phase change froze a somersault');
            gCheck(b.grounded&&b.y===b.baseY&&b.dy===0&&b.dashV===0&&b.invulnAll,'phase transition did not settle');
            let limit=300;while(b.state==='g_hoi'+stage&&limit-->0)gStep(b);
            gCheck(limit>0&&!b.invulnAll&&b.state==='idle','phase introduction stuck');
        }
        // Native AI/scene loop: phase filtering, chains, projectiles and frame-error isolation.
        const native=[];
        for(const stage of [1,2,3]){
            b=gSetup(stage);b.actionTimer=0;const visited=new Set();
            for(let i=0;i<1500;i++){
                loopAnToan();visited.add(b.state);
                gCheck(!GAE_PHA[b.state]||GAE_PHA[b.state]<=stage,'later-stage skill leaked into earlier phase');
            }
            gCheck(visited.size>3&&bosses.includes(b)&&!_loiKhung.size,'native Gael AI stalled/crashed '+[stage,[...visited]]);
            native.push([stage,visited.size]);
        }
        b=gSetup(3);b.hp=b.maxHp*.2;b.actionTimer=0;gStep(b);
        gCheck(b.state==='g_cuoi'&&b.noCuoi,'native final burst not triggered');
        let limit=400;while(b.state==='g_cuoi'&&limit-->0)gStep(b);
        gCheck(limit>0,'final burst never ends');
        const last=b;startGame('normal');gCheck(!bosses.includes(last),'Gael leaked across restart');
        return {cape:'two finite one-damage layers',phases:'stable pose and grounded introductions',nativeAI:native,finalBurst:'finite'};
    }'''))
    # Inspect the actual rendered upgraded model, not a standalone mock.
    page.evaluate('''()=>{const b=gSetup(3);b.x=470;b.aoDai=.9;b.capeWhip=1;b.capeAngle=-.2;ctx.clearRect(0,0,canvas.width,canvas.height);drawGaelEnv();b.draw();}''')
    page.screenshot(path='/tmp/gael-upgraded.png')
    assert not errors, errors
    browser.close()
