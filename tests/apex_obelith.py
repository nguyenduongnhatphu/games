"""Obelith Apex: traversal shrines, sweeping beam and two-mode saw ultimate."""
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
            mapTheme='desert';camX=camY=0;apexSetColor(color);xDatForm(8);startGame('normal');paused=false;mapTheme='desert';camX=camY=oceanCamY=tetrisCamY=0;
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
        const sweep=a.obelith().beam;obStep(118);check(target.hp===980&&sweep.age===119,'beam does not deal 20 on contact');obStep();
        check(target.hp===980&&!a.obelith().beam,'beam is not exactly 20 per target over a 120-frame sweep');
        obStep(60);check(a.obelith().ready,'shrine does not recharge');
        a.state.isGrounded=false;a.state.activePlatform=null;dino.y+=15;obStep();
        check(!a.obelith().ready&&a.obelith().charge===0,'charge carried away from shrine');
        a=obReset();obStep(600);const cancelTarget=obTarget();obStand(a,a.obelith().blocks[0]);obStep(60);obKey('KeyK');obStep(12);obKey('KeyK',false);
        const before=cancelTarget.hp;a.state.isGrounded=false;a.state.activePlatform=null;dino.y+=15;obStep(125);
        check(!a.obelith().beam&&cancelTarget.hp===before,'beam continues after leaving shrine');
        mapTheme='forest';obStep();check(!a.obelith().blocks.length&&!a.obelith().ready,'shrines leaked into a new arena');
        for(let i=0;i<4;i++){a=obReset(i);obStep(605);check(!a.obelith().blocks.length,'other variant gains Obelith shrines');}
        return 'PASS five variants, 5s landing deadline / fresh 5s use / 10s cooldown, no hop refresh, safe expiry, gradual transformation, 1-second charge, 20 per target / 2s sweep, cancellation and arena/variant isolation';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        for(const side of [0,1]){
            let a=obReset();obStep(600);obStand(a,a.obelith().blocks[side]);obStep(60);
            const mirror=x=>side?1000-x:x,foes=[];
            for(const [x,y] of [[450,260],[700,260],[800,80],[40,280]]){
                const o=obTarget(mirror(x));o.y=y;o.w=o.h=10;foes.push(o);
            }
            const missed=obTarget(mirror(20));missed.y=0;missed.w=missed.h=10;
            const outside=obTarget(side?-200:1200),mover=obTarget(-200);mover.w=mover.h=4;
            obKey('KeyK');obStep();obKey('KeyK',false);const beam=a.obelith().beam;
            check(beam.ray.x1===(side?1000:0)&&beam.ray.y1===320,'sweep does not begin at near lower corner '+side);
            // Move an initially offscreen foe into the fan while it is sweeping.
            obStep(9);mover.x=mirror(500);mover.y=280;
            obStep(50);check(beam.age===60&&beam.ray.x1===(side?0:1000)&&beam.ray.y1===320,'sweep misses far lower corner '+side);
            obStep(60);check(!a.obelith().beam&&beam.ray.x1===(side?0:1000)&&beam.ray.y1===0,'sweep does not finish at far upper corner '+side);
            check(foes.every(o=>o.hp===980),'not 20 exactly once to every touched enemy '+side+' '+JSON.stringify(foes.map(o=>[o.x,o.y,o.hp])));
            check(mover.hp===980&&beam.hit.size===5,'moving tiny foe falls through the sweep '+side);
            check(missed.hp===1000&&outside.hp===1000,'sweep damages enemies outside its path or viewport '+side);
            // No target lock: killing the first foe must not interrupt the map sweep.
            a=obReset();obStep(600);obStand(a,a.obelith().blocks[side]);obStep(60);
            const first=obTarget(mirror(80),10);first.y=280;first.w=first.h=10;
            const later=obTarget(mirror(850));later.y=80;later.w=later.h=10;
            obKey('KeyK');obStep();obKey('KeyK',false);const cast=a.obelith().beam;obStep(119);
            check(first.hp<=0&&later.hp===980&&cast.age===120,'first kill interrupts sweeping into later enemies '+side);
        }
        // A sweep needs no target, and snapshots world-space corners in a scrolling arena.
        let a=obReset();WORLD_W=2400;camX=1000;dino.x=1180;obStep(600);obStand(a,a.obelith().blocks[0]);obStep(60);
        obKey('KeyK');obStep();obKey('KeyK',false);let beam=a.obelith().beam;
        check(beam&&beam.corners[0].x===1000&&beam.corners[1].x===2000,'empty/scrolling arena prevents sweep or uses wrong corners');
        obStep(119);check(!a.obelith().beam&&beam.ray.x1===2000&&beam.ray.y1===0,'empty sweep ends early');
        return 'PASS mirrored three-corner sweeps, exact 20 per enemy, small moving targets, no duplicate hits, path/viewport exclusion, kill continuation, empty and scrolling arenas';
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
            check(a.obelith().beam?.ray,'Obelith sweep did not start against '+kind);
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
        window.obReset=function(color=4){for(const k of Object.keys(keys))delete keys[k];mapTheme='desert';camX=camY=0;apexSetColor(color);xDatForm(8);startGame('normal');paused=false;mapTheme='desert';camX=camY=oceanCamY=tetrisCamY=0;dino.x=180;dino.y=320-dino.h;dino.invincible=true;dino.invTimer=999999;return dino.apex;};
        window.obStep=function(n=1){for(let i=0;i<n;i++){frames++;dino.update();}};
        window.obTarget=function(x=450,hp=1000){const o={x,y:260,w:42,h:60,hp,maxHp:hp,update(){},draw(){ctx.fillStyle='#acb8c2';ctx.fillRect(this.x,this.y,this.w,this.h);},takeDamage(d){this.hp-=d;}};enemies.push(o);return o;};
    }''')
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        window.obBossTarget=(x=450,hp=1000)=>{const o=obTarget(x,hp);bosses.push(o);return o;};
        let a=obReset(),target=obBossTarget(),other=obTarget(470);ultCharge=100;
        check(a.ultStart()&&a.isCinematic(),'Obelith ultimate entry');
        let u=a.ultimate();check(u.kind===4&&u.mode==='boss'&&u.victims.length===1&&u.aim.o===target,'ultimate targets an area');
        for(let i=0;i<48;i++)a.cinematicFrame();
        check(u.pillarTop===u.summit&&dino.y+dino.h<220&&target.hp===1000,'pillar does not rise harmlessly');
        for(let i=0;i<90;i++)a.cinematicFrame();check(target.hp===1000&&u.t===138,'damage during 1.5-second charge');
        let highest=Infinity;
        for(let i=0;i<48;i++){a.cinematicFrame();highest=Math.min(highest,(a.state.y-48)*.55);}
        check(u.t===186&&target.hp===1000&&!u.meteorActive&&highest<Math.min(u.arcFrom.y,u.arcTo.y)-10,'boss ascent does not arc upwards harmlessly '+JSON.stringify({t:u.t,hp:target.hp,meteor:u.meteorActive,highest,from:u.arcFrom,to:u.arcTo,control:u.arcControl}));
        for(let i=0;i<80;i++)a.cinematicFrame();
        check(!a.isCinematic()&&!dino.ultActive&&target.hp===850&&other.hp===1000,'ultimate not exactly 150 to one target');
        check(u.impact&&u.impact.at===222&&u.impact.y===u.floor,'meteor has no ground explosion');
        check(dino.x>=worldL()&&dino.x+dino.w<=worldR()&&Number.isFinite(dino.y),'ultimate leaves player out of bounds');
        obStep(5);check(!a.state.isLedgeClimbing&&a.state.meleeState==='none','ultimate never releases controls');
        a=obReset();target=obBossTarget(450,100);other=obTarget(470);ultCharge=100;a.ultStart();u=a.ultimate();
        for(let i=0;i<223;i++)a.cinematicFrame();
        check(target.hp<=0&&u.aim.deadAt!==null&&other.hp===1000,'killed target lacks split finisher / nearby target damaged');
        for(let i=223;i<266;i++)a.cinematicFrame();
        a=obReset();obStep(600);const p=a.obelith().blocks[0];
        dino.x=(p.x+p.w/2)*.55-dino.w/2;dino.y=p.y*.55-dino.h;
        a.state.isGrounded=true;a.state.activePlatform=p;a.state.vx=a.state.vy=0;obStep();
        target=obBossTarget();ultCharge=100;a.ultStart();u=a.ultimate();const from=dino.y+dino.h;
        for(let i=0;i<48;i++){a.cinematicFrame();check(dino.y+dino.h<=from+.01,'ultimate teleports shrine player down to the floor');}
        check(u.floor===320&&u.pillarTop<=from,'ultimate pillar did not rise from actual ground');
        for(let i=48;i<266;i++)a.cinematicFrame();
        a=obReset();target=obBossTarget(450,100);target.phase=1;target.startPhase2=function(){};ultCharge=100;a.ultStart();u=a.ultimate();
        for(let i=0;i<223;i++)a.cinematicFrame();check(target.hp<=0&&u.aim.deadAt===null,'split finisher falsely kills a boss with another phase');
        for(let i=223;i<266;i++)a.cinematicFrame();
        for(const final of [false,true]){
            a=obReset();target=obBossTarget(450,100);target.phase=final?1:2;
            target.startPhase2=function(){};target.suBatDau=function(){};target.sdtUltXong=final;
            ultCharge=100;a.ultStart();u=a.ultimate();for(let i=0;i<223;i++)a.cinematicFrame();
            check((u.aim.deadAt!==null)===final,'finisher disagrees with SDT/exhausted boss lifecycle');
            for(let i=223;i<266;i++)a.cinematicFrame();
        }
        for(const x of [5,450,950]){
            a=obReset();target=obBossTarget(x);target.y=25;ultCharge=100;a.ultStart();u=a.ultimate();
            let previousY=-Infinity;
            for(let i=0;i<266;i++){
                a.cinematicFrame();
                if(u.meteorActive){const y=(a.state.y-48)*.55;check(y>=previousY,'meteor flies upward at an elevated boss');previousY=y;}
            }
            check(u.through.y-u.arcTo.y>=120,'boss dive starts below the target');
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
        let a=obReset(),target=obTarget(280),other=obTarget(680),offscreen=obTarget(1400),miss=obTarget(450);
        target.y=other.y=0;target.h=other.h=320;target.w=400;other.w=120;miss.y=600;
        ultCharge=100;check(a.ultStart(),'roaming ultimate rejected');let u=a.ultimate();
        check(u.mode==='ricochet'&&u.victims.length===2,'roaming mode does not capture the visible crowd');
        for(let i=0;i<138;i++)a.cinematicFrame();check(target.hp===1000&&other.hp===1000,'roaming damages during charge');
        const hitFrames=[];let hp=target.hp,xBounces=0,yBounces=0,lastVx=0,lastVy=0;
        for(let i=0;i<180;i++){
            a.cinematicFrame();const ball=u.ball,b=u.bounds;
            check(ball.x>=b.left-.01&&ball.x<=b.right+.01&&ball.y>=b.top-.01&&ball.y<=b.bottom+.01,'ricochet leaves its camera bounds');
            if(lastVx&&Math.sign(ball.vx)!==Math.sign(lastVx))xBounces++;
            if(lastVy&&Math.sign(ball.vy)!==Math.sign(lastVy))yBounces++;lastVx=ball.vx;lastVy=ball.vy;
            if(target.hp<hp){check(hp-target.hp===25,'ricochet does not deal 25 per crossing');hitFrames.push(u.t);hp=target.hp;}
        }
        check(u.bounceFrames===180&&u.t===318&&xBounces>=3&&yBounces>=4,'ricochet is not three seconds of real boundary reflections');
        check(target.hp===850&&other.hp<1000&&offscreen.hp===1000&&miss.hp===1000,'multi-target cap, camera isolation or physical contact failed');
        check(hitFrames.every((t,i)=>!i||t-hitFrames[i-1]>=24),'ricochet can rehit continuously');
        const damage=other.hp;
        for(let i=0;i<24;i++)a.cinematicFrame();
        check(u.bounceFrames===180&&other.hp===damage&&(a.state.y-48)*.55<Math.min(u.returnFrom.y,u.returnTo.y),'return does not follow an upward arc / still damages');
        for(let i=0;i<24;i++)a.cinematicFrame();
        check(Math.abs(dino.x+dino.w/2-u.pillarX)<.01&&Math.abs(dino.y+dino.h-u.floor)<.01&&u.pillarTop===u.floor,'roaming does not land at the retracted pillar');
        for(let i=0;i<24;i++)a.cinematicFrame();
        check(!a.isCinematic()&&!dino.ultActive&&other.hp===damage,'roaming ultimate does not release controls');
        a=obReset();target=obTarget(280,20);target.y=0;target.w=400;target.h=320;ultCharge=100;a.ultStart();u=a.ultimate();
        for(let i=0;i<318;i++)a.cinematicFrame();
        check(target.hp<=0&&u.victims[0].deadAt!==null,'roaming lethal pass lacks split finisher');
        for(let i=318;i<390;i++)a.cinematicFrame();
        // Scrolled arenas use the visible screen edges and the actual player position.
        a=obReset();WORLD_W=2400;camX=1000;dino.x=1180;target=obTarget(1450);ultCharge=100;a.ultStart();u=a.ultimate();
        for(let i=0;i<318;i++)a.cinematicFrame();
        check(u.bounds.left>1000&&u.bounds.right<2000&&Math.abs(u.pillarX-1195.4)<.01,'ricochet ignores scrolling viewport or player origin');
        for(let i=318;i<390;i++)a.cinematicFrame();
        check(Math.abs(dino.x+dino.w/2-u.pillarX)<.01,'scrolled return misses original pillar');
        return 'PASS roaming 180-frame ricochet, reflected collision, 25/pass with 0.4s rehit and 150/target cap, split, curved harmless return and scrolling';
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
