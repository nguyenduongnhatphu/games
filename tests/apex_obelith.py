"""Obelith Apex: traversal shrines, exact beam timing and single-target saw ultimate."""
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
        window.obReset=function(color=4){
            for(const k of Object.keys(keys))delete keys[k];
            mapTheme='desert';camX=camY=0;apexSetColor(color);xDatForm(8);startGame('normal');paused=false;
            dino.x=180;dino.y=320-dino.h;dino.grounded=true;dino.invincible=true;dino.invTimer=999999;
            spawnTimerEnemy=spawnTimerCactus=999999;nextBossScore=99999999;
            return dino.apex;
        };
        window.obStep=function(n=1){for(let i=0;i<n;i++){frames++;dino.update();}};
        window.obKey=function(code,down=true){window.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{code,bubbles:true}));};
        window.obTap=function(code){obKey(code);obKey(code,false);};
        window.obTarget=function(x=450,hp=1000){
            const o={x,y:260,w:42,h:60,hp,maxHp:hp,update(){},draw(){ctx.fillStyle='#acb8c2';ctx.fillRect(this.x,this.y,this.w,this.h);},takeDamage(d){this.hp-=d;}};
            enemies.push(o);return o;
        };
        window.obStand=function(a,p){
            dino.x=(p.x+p.w/2)*.55-dino.w/2;dino.y=p.y*.55-dino.h;
            const s=a.state;s.isGrounded=true;s.activePlatform=p;s.vx=s.vy=0;s.isLedgeGrabbing=s.isLedgeClimbing=s.isWallSliding=false;
        };
        check(APEX_SKINS.length===5&&APEX_ROLES.length===5&&APEX_ULT_TEXT.length===5,'fifth variant not registered');
        apexSetColor(5);check(apexColor===0,'next variant wrap');apexSetColor(-1);check(apexColor===4,'previous variant wrap');
        for(let i=0;i<5;i++){apexSetColor(i);gameState='custom_menu';xDatForm(8);drawCustomMenu();}
        let a=obReset();obStep(599);check(!a.obelith().blocks.length,'shrines spawn before 10 seconds');
        obStep();const pads=a.obelith().blocks;
        check(pads.length===2&&pads[0].y===pads[1].y,'not two corner shrines');
        check(pads[0].x*.55<50&&(pads[1].x+pads[1].w)*.55>950,'shrines not in opposite corners');
        check(320-pads[0].y*.55>=280,'shrines too low');
        const generation=a.obelith().generation;obStep(600);
        check(a.obelith().blocks.length===2&&a.obelith().generation===generation+1,'periodic shrines accumulate / fail to refresh');
        const target=obTarget();obStand(a,pads[0]);obStep(59);
        check(!a.obelith().ready&&a.obelith().charge===59,'charge before 1 second');obStep();
        check(a.obelith().ready,'standing atop does not charge');
        obKey('KeyK');obStep(1);obKey('KeyK',false);
        check(a.obelith().beam&&!a.shots.length,'empowered K still fires normal ammo');
        obStep(118);check(target.hp===982,'beam timing before final tick');obStep();
        check(target.hp===980&&!a.obelith().beam,'beam is not exactly 20 damage over 120 frames');
        obStep(60);check(a.obelith().ready,'shrine does not recharge');
        a.state.isGrounded=false;a.state.activePlatform=null;dino.y+=15;obStep();
        check(!a.obelith().ready&&a.obelith().charge===0,'charge carried away from shrine');
        obStand(a,pads[0]);obStep(60);obKey('KeyK');obStep(12);obKey('KeyK',false);
        const before=target.hp;a.state.isGrounded=false;a.state.activePlatform=null;dino.y+=15;obStep(125);
        check(!a.obelith().beam&&target.hp===before,'beam continues after leaving shrine');
        mapTheme='forest';obStep();check(!a.obelith().blocks.length&&!a.obelith().ready,'shrines leaked into a new arena');
        for(let i=0;i<4;i++){a=obReset(i);obStep(605);check(!a.obelith().blocks.length,'other variant gains Obelith shrines');}
        return 'PASS five variants, 10-second two-shrine cycle, 1-second charge, 20 damage/2s, cancellation and arena/variant isolation';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        for(const side of [0,1]){
            const a=obReset();obStep(600);const p=a.obelith().blocks[side],s=a.state;
            // Start on the floor beside the inner edge; every move after this uses real key events.
            dino.x=(side?p.x-28:p.x+p.w+28)*.55-dino.w/2;dino.y=320-dino.h;s.vx=s.vy=0;
            obTap('Space');obStep(24);obTap('Space');obStep(20);
            check(dino.y+dino.h>p.y*.55+50&&s.activePlatform!==p,'double jump reaches the high shrine directly');
            const toward=side?'KeyD':'KeyA';obKey(toward);
            for(let i=0;i<8&&!s.isWallSliding;i++)obStep();
            check(s.isWallSliding,'cannot grip the shrine wall');obTap('Space');
            let climbed=false;
            for(let i=0;i<70;i++){
                obStep();if(s.isLedgeGrabbing)obTap('Space');
                if(s.activePlatform===p){climbed=true;break;}
            }
            obKey(toward,false);check(climbed,'wall kick/climb never reaches shrine '+side);
            obStep(60);check(a.obelith().ready,'climbing does not earn charge');
        }
        return 'PASS both high shrines require and support real wall traversal';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        for(const kind of ['godzilla','fire']){
            const a=obReset();obStep(600);const p=a.obelith().blocks[0];obStand(a,p);obStep(60);
            const b=kind==='godzilla'?new GodzillaBoss(1):new FireCloneBoss(1);b.x=800;b.y=320-b.h;b.hp=b.maxHp=1000;
            b.state=kind==='godzilla'?'clash_go':'beam_clash';b.clashX=430;b.clashY=288;b.clashDist=300;b.clashSpeed=.01;b.clashHits=0;b.subStateTimer=300;
            b.beamClashX=430;b.beamMouthX=810;b.beamMouthY=288;b.beamDir=-1;b.subTimer=0;bosses.push(b);doChieuBatDau(b);
            obKey('KeyK');obStep();obKey('KeyK',false);
            check(a.obelith().beam?.target._beamClashPoint,'Obelith beam ignores '+kind+' contact');
            for(let i=0;i<130&&beamClashActive(b);i++){obStep();b.update();}
            check(!beamClashActive(b),'Obelith cannot win '+kind+' clash');
        }
        const a=obReset();WORLD_W=2400;camX=1000;dino.x=1180;obStep(600);
        const pads=a.obelith().blocks;check(pads[0].x*.55>1000&&(pads[1].x+pads[1].w)*.55<2000,'shrines ignore scrolling viewport');
        a.state.ledgePlatform=pads[0];a.state.isLedgeGrabbing=a.state.isLedgeClimbing=false;a.state.activePlatform=null;
        camX=1200;dino.x=1380;obStep(600);
        check(pads[0].x*.55>1200,'old ledge pointer pins an abandoned shrine offscreen');
        return 'PASS Obelith beam on both boss clashes and shrine placement in a scrolling arena';
    }'''))
    page.evaluate("apexSetColor(4);xDatForm(8);")
    page.reload()
    assert page.evaluate("()=>{startGame('normal');return apexColor===4&&apexOn()&&!!dino.apex;}")
    # Reinstall helpers after checking persisted selection.
    page.evaluate('''() => {
        window.obReset=function(color=4){for(const k of Object.keys(keys))delete keys[k];mapTheme='desert';camX=camY=0;apexSetColor(color);xDatForm(8);startGame('normal');paused=false;dino.x=180;dino.y=320-dino.h;dino.invincible=true;dino.invTimer=999999;return dino.apex;};
        window.obStep=function(n=1){for(let i=0;i<n;i++){frames++;dino.update();}};
        window.obTarget=function(x=450,hp=1000){const o={x,y:260,w:42,h:60,hp,maxHp:hp,update(){},draw(){ctx.fillStyle='#acb8c2';ctx.fillRect(this.x,this.y,this.w,this.h);},takeDamage(d){this.hp-=d;}};enemies.push(o);return o;};
    }''')
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        let a=obReset(),target=obTarget(),other=obTarget(470);ultCharge=100;
        check(a.ultStart()&&a.isCinematic(),'Obelith ultimate entry');
        let u=a.ultimate();check(u.kind===4&&u.victims.length===1&&u.aim.o===target,'ultimate targets an area');
        for(let i=0;i<48;i++)a.cinematicFrame();
        check(u.pillarTop===u.summit&&dino.y+dino.h<100&&target.hp===1000,'pillar does not rise harmlessly');
        for(let i=0;i<90;i++)a.cinematicFrame();check(target.hp===1000&&u.t===138,'damage during 1.5-second charge');
        for(let i=0;i<86;i++)a.cinematicFrame();
        check(!a.isCinematic()&&!dino.ultActive&&target.hp===850&&other.hp===1000,'ultimate not exactly 150 to one target');
        check(dino.x>=worldL()&&dino.x+dino.w<=worldR()&&Number.isFinite(dino.y),'ultimate leaves player out of bounds');
        obStep(5);check(!a.state.isLedgeClimbing&&a.state.meleeState==='none','ultimate never releases controls');
        a=obReset();target=obTarget(450,100);other=obTarget(470);ultCharge=100;a.ultStart();u=a.ultimate();
        for(let i=0;i<181;i++)a.cinematicFrame();
        check(target.hp<=0&&u.aim.deadAt!==null&&other.hp===1000,'killed target lacks split finisher / nearby target damaged');
        for(let i=181;i<224;i++)a.cinematicFrame();
        a=obReset();obStep(600);const p=a.obelith().blocks[0];
        dino.x=(p.x+p.w/2)*.55-dino.w/2;dino.y=p.y*.55-dino.h;
        a.state.isGrounded=true;a.state.activePlatform=p;a.state.vx=a.state.vy=0;obStep();
        target=obTarget();ultCharge=100;a.ultStart();u=a.ultimate();const from=dino.y+dino.h;
        for(let i=0;i<48;i++){a.cinematicFrame();check(dino.y+dino.h<=from+.01,'ultimate teleports shrine player down to the floor');}
        check(u.floor===320&&u.pillarTop<=from,'ultimate pillar did not rise from actual ground');
        for(let i=48;i<224;i++)a.cinematicFrame();
        a=obReset();target=obTarget(450,100);target.phase=1;target.startPhase2=function(){};ultCharge=100;a.ultStart();u=a.ultimate();
        for(let i=0;i<181;i++)a.cinematicFrame();check(target.hp<=0&&u.aim.deadAt===null,'split finisher falsely kills a boss with another phase');
        for(let i=181;i<224;i++)a.cinematicFrame();
        for(const final of [false,true]){
            a=obReset();target=obTarget(450,100);target.phase=final?1:2;
            target.startPhase2=function(){};target.suBatDau=function(){};target.sdtUltXong=final;
            ultCharge=100;a.ultStart();u=a.ultimate();for(let i=0;i<181;i++)a.cinematicFrame();
            check((u.aim.deadAt!==null)===final,'finisher disagrees with SDT/exhausted boss lifecycle');
            for(let i=181;i<224;i++)a.cinematicFrame();
        }
        a=obReset();ultCharge=100;check(!a.ultStart()&&ultCharge===100,'empty ultimate consumes meter');
        xDatForm(0);startGame('normal');check(!dino.apex,'Obelith state leaks into Dino');
        xDatForm(8);startGame('pvp');check(!apexOn()&&!dino.apex,'Obelith leaks into PvP');
        check(_loiKhung.size===0,'caught frame errors');
        return 'PASS pillar rise, 90-frame charge, 150 single-target damage, lethal split, clean controls, meter and PvP/restart';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        for(const color of [0,2,3]){
            const a=obReset(color),target=obTarget();ultCharge=100;check(a.ultStart(),'old ultimate entry '+color);
            let elapsed=0;while(a.isCinematic()&&elapsed++<250)a.cinematicFrame();
            check(!a.isCinematic()&&target.hp===900,'old ultimate changed '+color+' '+target.hp);
        }
        const a=obReset(1);ultCharge=100;a.ultStart();check(!a.isCinematic()&&a.magmaRemaining()===600,'Magma ultimate changed');
        obStep(600);check(!a.magmaRemaining()&&!dino.ultActive,'Magma does not expire');
        return 'PASS all four existing Apex ultimates retain damage/timing';
    }'''))
    assert not errors,errors
    browser.close()
