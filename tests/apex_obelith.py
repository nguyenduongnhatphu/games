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
        check(pads[0].x*.55>=100&&(pads[1].x+pads[1].w)*.55<=900,'no wall-jump corridors outside the shrines');
        check(320-pads[0].y*.55>=240,'shrines too low');
        const generation=a.obelith().generation;
        obStand(a,pads[0]);obStep(299);check(a.obelith().blocks.length===2,'shrines disappear before 5s');
        obStep();check(!a.obelith().blocks.length&&!a.state.activePlatform&&!a.state.isGrounded&&!a.obelith().ready,'expired shrine still supports player/charge');
        obStep(599);check(!a.obelith().blocks.length,'shrine returns before 10s absence');obStep();
        check(a.obelith().blocks.length===2&&a.obelith().generation===generation+1,'shrine fails to return after 10s absence');
        // A late landing earns the full use window; unclaimed shrines only wait five seconds.
        a=obReset();obStep(600);obStep(299);
        check(a.obelith().blocks.length===2&&!a.obelith().activated,'unclaimed shrine expired early');
        obStand(a,a.obelith().blocks[0]);obStep();
        check(a.obelith().activated&&a.obelith().clock===1,'last-moment landing does not start a fresh five-second window');
        obStep(90);a.state.activePlatform=null;a.state.isGrounded=false;dino.y+=15;obStep(20);
        obStand(a,a.obelith().blocks[1]);obStep();
        check(a.obelith().clock===112,'switching/re-entering shrine renews the use timer');
        obStep(187);check(a.obelith().blocks.length===2,'used shrines expired before five seconds after landing');
        obStep();check(!a.obelith().blocks.length,'used shrine never expires');
        obStep(599);check(!a.obelith().blocks.length,'used shrine cooldown too short');obStep();
        check(a.obelith().blocks.length===2&&!a.obelith().activated,'next cycle keeps old activation');
        obStep(299);check(a.obelith().blocks.length===2,'unused shrine expires too early');obStep();
        check(!a.obelith().blocks.length&&!a.obelith().activated,'unused shrine does not enter cooldown after five seconds');
        obStep(599);check(!a.obelith().blocks.length,'unused cooldown shorter than ten seconds');obStep();
        check(a.obelith().blocks.length===2,'unused shrine does not return after cooldown');
        a=obReset();obStep(600);const fresh=a.obelith().blocks;
        const target=obTarget();obStand(a,fresh[0]);obStep(59);
        check(!a.obelith().ready&&a.obelith().charge===59&&a.obelith().form>0&&a.obelith().form<1,'charge/form before 1 second');obStep();
        check(a.obelith().ready&&a.obelith().form===1,'standing atop does not transform/charge');
        obKey('KeyK');obStep(1);obKey('KeyK',false);
        check(a.obelith().beam&&!a.shots.length,'empowered K still fires normal ammo');
        obStep(118);check(target.hp===982,'beam timing before final tick');obStep();
        check(target.hp===980&&!a.obelith().beam,'beam is not exactly 20 damage over 120 frames');
        obStep(60);check(a.obelith().ready,'shrine does not recharge');
        a.state.isGrounded=false;a.state.activePlatform=null;dino.y+=15;obStep();
        check(!a.obelith().ready&&a.obelith().charge===0,'charge carried away from shrine');
        a=obReset();obStep(600);const cancelTarget=obTarget();obStand(a,a.obelith().blocks[0]);obStep(60);obKey('KeyK');obStep(12);obKey('KeyK',false);
        const before=cancelTarget.hp;a.state.isGrounded=false;a.state.activePlatform=null;dino.y+=15;obStep(125);
        check(!a.obelith().beam&&cancelTarget.hp===before,'beam continues after leaving shrine');
        mapTheme='forest';obStep();check(!a.obelith().blocks.length&&!a.obelith().ready,'shrines leaked into a new arena');
        for(let i=0;i<4;i++){a=obReset(i);obStep(605);check(!a.obelith().blocks.length,'other variant gains Obelith shrines');}
        return 'PASS five variants, 5s landing deadline / fresh 5s use / 10s cooldown, no hop refresh, safe expiry, gradual transformation, 1-second charge, 20 damage/2s, cancellation and arena/variant isolation';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        for(const side of [0,1]){
            const a=obReset();obStep(600);const p=a.obelith().blocks[side],s=a.state;
            // Start on the floor beside the inner edge; every move after this uses real key events.
            dino.x=(side?p.x-28:p.x+p.w+28)*.55-dino.w/2;dino.y=320-dino.h;s.vx=s.vy=0;
            obTap('Space');obStep(24);obTap('Space');obStep(20);
            check(dino.y+dino.h>p.y*.55+20&&s.activePlatform!==p,'double jump reaches the high shrine directly');
            const toward=side?'KeyD':'KeyA';obKey(toward);
            for(let i=0;i<8&&!s.isWallSliding&&!s.isLedgeGrabbing;i++)obStep();
            check(s.isWallSliding||s.isLedgeGrabbing,'cannot grip the shrine wall/ledge');obTap('Space');
            let climbed=false;
            for(let i=0;i<70;i++){
                obStep();if(s.isLedgeGrabbing)obTap('Space');
                if(s.activePlatform===p){climbed=true;break;}
            }
            obKey(toward,false);check(climbed,'wall kick/climb never reaches shrine '+side);
            obStep(60);check(a.obelith().ready,'climbing does not earn charge');
        }
        for(const side of [0,1]){
            const a=obReset();obStep(600);const p=a.obelith().blocks[side],s=a.state;
            dino.x=side?worldR()-dino.w:worldL();dino.y=320-dino.h;s.isGrounded=true;s.activePlatform=null;s.vx=s.vy=0;
            const wall=side?'KeyD':'KeyA',inward=side?'KeyA':'KeyD';let crossing=false,landed=false;
            obKey(wall);obTap('Space');
            for(let i=0;i<180;i++){
                obStep();
                if(s.isWallSliding){obTap('Space');if(dino.y+dino.h<p.y*.55+60){obKey(wall,false);obKey(inward);crossing=true;}}
                const center=(p.x+p.w/2)*.55;
                if(crossing&&(side?dino.x+dino.w/2<=center:dino.x+dino.w/2>=center))obKey(inward,false);
                if(s.isLedgeGrabbing)obTap('Space');
                if(s.activePlatform===p){landed=true;break;}
            }
            obKey(wall,false);obKey(inward,false);check(landed,'outer wall corridor cannot reach shrine '+side);
            obStep(60);check(a.obelith().ready,'outer wall climb does not finish charging in time');
        }
        return 'PASS double jumps cannot reach shrines; real traversal from inner faces and both outer boundary walls';
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
        camX=1200;dino.x=1380;obStep(900);
        check(a.obelith().blocks[0].x*.55>1200,'old ledge pointer pins an abandoned shrine offscreen');
        return 'PASS Obelith beam on both boss clashes and shrine placement in a scrolling arena';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        let a=obReset();obStep(600);const foe=obTarget();obStand(a,a.obelith().blocks[0]);obStep(230);
        obKey('KeyK');obStep();obKey('KeyK',false);obStep(69);
        check(!a.obelith().blocks.length&&!a.obelith().beam&&!a.state.activePlatform,'expiry leaves beam or invisible floor');
        const hp=foe.hp;obStep(120);check(foe.hp===hp&&a.obelith().form===0,'expired beam keeps damaging / transformed body persists');
        a=obReset();obStep(600);const pad=a.obelith().blocks[0];
        a.state.ledgePlatform=pad;a.state.isLedgeClimbing=true;a.state.climbStartX=a.state.x;a.state.climbStartY=a.state.y;
        a.state.climbTargetX=pad.x+30;a.state.climbTargetY=pad.y;
        a.obelith().clock=299;obStep();check(!a.state.isLedgeClimbing&&!a.state.ledgePlatform,'expired ledge keeps climbing');
        for(const side of [-1,1]){
            a=obReset();const s=a.state;
            dino.x=side<0?worldL():worldR()-dino.w;dino.y=60-dino.h;s.vy=0;s.isGrounded=false;s.activePlatform=null;
            const toward=side<0?'KeyA':'KeyD';obKey(toward);obStep(30);
            check(s.isWallSliding&&s.wallBudget<120,'wall grip does not drain '+side);
            const budget=s.wallBudget;obKey(toward,false);obStep(179);
            check(s.wallBudget===budget,'wall regenerates before 3s rest');obStep();
            check(s.wallBudget===Math.min(120,budget+60),'3s rest does not restore 1s grip');
            a=obReset();const b=a.state;dino.x=side<0?worldL():worldR()-dino.w;dino.y=35-dino.h;b.vy=0;b.isGrounded=false;
            obKey(toward);obStep(120);check(b.wallBudget===0&&b.wallCooldown>0,'wall never exhausts');
            obKey(toward,false);const remaining=b.wallCooldown;obStep(remaining-1);
            check(b.wallBudget===0,'exhausted wall returns too soon');obStep();
            check(b.wallBudget===60&&b.wallCooldown===0,'exhausted wall not restored after 3s');
        }
        return 'PASS beam/ledge expiration and both walls restore 1s grip per 3s rest, including exhaustion';
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
        check(u.impact&&u.impact.at===180&&u.impact.y===u.floor,'meteor has no ground explosion');
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
        for(const x of [5,450,950]){
            a=obReset();target=obTarget(x);target.y=25;ultCharge=100;a.ultStart();u=a.ultimate();
            for(let i=0;i<224;i++)a.cinematicFrame();
            check(target.hp===850&&u.impact&&u.impact.y===320,'meteor misses an elevated/edge target or explodes in midair');
            check(dino.x+dino.w/2>=78&&dino.x+dino.w/2<=922,'meteor landing clips the saw outside arena');
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
