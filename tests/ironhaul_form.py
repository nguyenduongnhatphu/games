"""Playable Ironhaul: real inputs, shared geometry, three modes, resources and isolation."""
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
        window.ihfSetup=(mode=0,left=false)=>{
            for(const k in keys)delete keys[k];xDatForm(0);runeSlots=[null,null];currentPower=0;phuKien=0;
            xDatForm(11);testBossSelection=81;startGame('test_boss');bossWaitTimer=99999;
            bosses.length=enemies.length=obstacles.length=projectiles.length=bossProjectiles.length=0;
            platforms.length=0;platforms.push({x:-60,top:320,w:canvas.width+120,h:110});
            dino.x=400;dino.y=320-dino.h;dino.grounded=true;dino.dy=0;if(mode===1)dino.ironhaul.silver=720;ironMode(dino,mode);dino.isFacingLeft=left;
            dino.invincible=true;dino.invTimer=99999;
            const target={name:'TARGET',aiRieng:true,state:'idle',actionTimer:99999,x:left?dino.x-55:dino.x+dino.w+15,y:252,w:40,h:68,hp:10000,maxHp:10000,dy:0,grounded:true,update(){},draw(){}};
            bosses.push(target);return target;
        };
        window.ihfStep=(count=1,draw=true)=>{for(let i=0;i<count;i++){
            frames++;dino.update();danteTick();
            if(draw){const m=ctx.getTransform(),alpha=ctx.globalAlpha;dino.draw();const n=ctx.getTransform();check(m.a===n.a&&m.b===n.b&&m.c===n.c&&m.d===n.d&&m.e===n.e&&m.f===n.f&&ctx.globalAlpha===alpha,'Canvas leak');}
            check([dino.x,dino.y,dino.w,dino.h,dino.hp].every(Number.isFinite),'invalid player physics');
        }};
        window.ihfKey=(code,down=true)=>dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{code}));
    }''')
    print(page.evaluate('''()=>{
        xDatForm(0);runeSlots=['hp','critstrike'];currentAmmoType=5;currentPower=0;phuKien=1;combatStance=1;
        const before={runes:runeSlots.join(','),ammo:currentAmmoType,accessory:phuKien,stance:combatStance};
        xDatForm(11);check(xFormIdx()===11&&xFormOn()&&!danteOn()&&!vergilOn()&&!apexOn()&&!xForm,'not exclusive');
        check(!hasRune('hp')&&!hasRune('critstrike')&&runeSlots.every(x=>!x)&&currentAmmoType===0&&phuKien===0,'equipment not locked');
        gameState='custom_menu';resetPreview();drawCustomMenu();xDatForm(0);
        check(runeSlots.join(',')===before.runes&&currentAmmoType===before.ammo&&phuKien===before.accessory&&combatStance===before.stance,'loadout not restored');
        for(const f of [7,8,9,10,11,0,11]){xDatForm(f);check(xFormIdx()===f,'selection leaks '+f);}
        ihfSetup();check(dino.hp===10&&dino.maxHp===10&&dino.w===40&&dino.h===68,'robot dimensions / HP');
        const p=dino.ironhaul;dino.hp=7;ultCharge=63;p.core=123;p.coreReady=300;const cx=dino.x+dino.w/2,feet=dino.y+dino.h;
        for(const mode of [1,2,0]){ironMode(dino,mode);check(Math.abs(dino.x+dino.w/2-cx)<.001&&dino.y+dino.h===feet,'morph changes centre / feet');check(dino.hp===7&&ultCharge===63&&p.core===123&&p.coreReady===300,'morph refills resources');}
        return 'PASS exclusive form selection, locked/restored equipment, 10 HP, small rig and resource-preserving morphs';
    }'''))
    print(page.evaluate('''()=>{
        let count=0;
        for(const mode of [0,1,2])for(const left of [false,true]){
            const ids=mode===0?['cut','rise','cross','thrust','execution','upper','advance','cleaver','gun','cannon','barrage','air','charge','recoil','pursuit','rail','gunvault','skyripper','gunrain','aircross','plunge','gunslash','morphslam']:mode===1?['silvercut','spin','silverfinish','throw','bash','shieldrush','reversal','riposte','air','silverbloom','silvercross','sovereign','aegislance','aegisorbit','aegiswheel','aegisvault','ascension','starfall','nova']:['gatling','truckcannon','ram','cannon','barrage','broadside'];
            for(const id of ids){const t=ihfSetup(mode,left);check(ironBegin(id),'cannot start '+id);const T=IRON_PLAYER_MOVES[id].T;
                if(['recoil','gunvault','gunslash'].includes(id)){
                    // Backflip fire leaves the ground lane; put an aerial target in the real round's path.
                    const fire=IRON_PLAYER_MOVES[id].shots[0];ihfStep(fire);const q=dino.ironhaul.rounds[0];check(!!q,'no acrobatic round '+id);
                    t.x=q.x+q.vx-t.w/2;t.y=q.y+q.vy-t.h/2;ihfStep(T-fire);
                }else ihfStep(T);
                check(!dino.ironhaul.attack,'move stuck '+id);check(!projectiles.length&&!bossProjectiles.length,'enemy or base Dino bullets leaked '+id);
                if(id!=='charge')check(t.hp<10000,'no friendly damage '+mode+' '+left+' '+id);
                check(t.dy===0,'boss gets permanent launcher '+id);count++;
            }
        }
        return 'PASS '+count+' move/mode/direction cases, real target damage, no hostile or base-Dino projectiles and no boss launch lock';
    }'''))
    print(page.evaluate('''()=>{
        const render=ironhaulRobot;let captured=null,samples=0;
        ironhaulRobot=function(b){
            const m=ctx.getTransform(),g=ironhaulWeapons(b),point=p=>m.transformPoint(new DOMPoint(p.x,p.y));
            captured={grip:point(g.grip),tip:point(g.tip),shield:point(g.shield),gun:point(g.gun)};
            return render(b);
        };
        try{
            for(const left of [false,true])for(const [mode,id] of [[0,'cut'],[0,'rise'],[0,'cross'],[0,'thrust'],[0,'execution'],[0,'upper'],[0,'advance'],[0,'air'],[0,'plunge'],[0,'recoil'],[0,'rail'],[0,'gun'],[0,'charge'],[1,'sovereign'],[1,'ascension'],[1,'starfall']]){
                ihfSetup(mode,left);ironBegin(id);const T=IRON_PLAYER_MOVES[id].T;
                for(let age=0;age<T;age++){
                    ihfStep(1,false);const g=ironGeometry(dino);captured=null;
                    ctx.save();ctx.translate(13,29);ctx.scale(.8,.8);const camera=ctx.getTransform();
                    try{dino.draw();}finally{ctx.restore();}
                    check(!!captured,'no robot draw '+id);
                    for(const key of ['grip','tip','shield','gun']){
                        const expected=camera.transformPoint(new DOMPoint(g[key].x,g[key].y));
                        check(Math.hypot(expected.x-captured[key].x,expected.y-captured[key].y)<.001,'render / hit geometry diverges '+id+' '+age+' '+key);
                    }
                    samples++;
                }
            }
        }finally{ironhaulRobot=render;}
        for(const left of [false,true])for(const [id,age] of [['cut',7],['rise',8],['cross',9],['thrust',18],['execution',20],['advance',14]]){
            ihfSetup(0,left);ironBegin(id);ihfStep(age);
            const g=ironGeometry(dino),t={x:g.tip.x-4,y:g.tip.y-4,w:8,h:8,hp:50,maxHp:50};bosses.length=0;bosses.push(t);
            ihfStep();check(t.hp<50,'drawn blade skips target on next swept frame '+id+' '+left);
        }
        return 'PASS '+samples+' flip / thrust / spin poses match actual Canvas grip, sword, shield and muzzle in both directions and with camera scaling; rendered-blade swept hits';
    }'''))
    print(page.evaluate('''()=>{
        for(const left of [false,true]){
            ihfSetup(0,left);ihfKey('KeyJ');ihfKey('KeyJ',false);ihfStep(11);
            ihfKey('KeyJ');ihfKey('KeyJ',false);check(dino.ironhaul.attack?.id==='rise'&&dino.ironhaul.attack.age===0,'early J cancel waits for recovery');
            ihfStep(6);ihfKey('KeyK');ihfKey('KeyK',false);check(dino.ironhaul.attack?.id==='gunslash','J K gunblade branch missing');
            ihfStep(10);ihfKey('KeyJ');ihfKey('KeyJ',false);check(dino.ironhaul.attack?.id==='pursuit','gunblade pursuit missing');
            const hp=dino.hp;ultCharge=37;ihfKey('KeyQ');ihfKey('KeyQ',false);
            check(dino.ironhaul.mode===2&&dino.ironhaul.attack?.id==='ram','attack-to-truck morph missing');
            ihfKey('KeyE');ihfKey('KeyE',false);check(dino.ironhaul.mode===0&&dino.ironhaul.attack?.id==='morphslam','truck-to-robot morph attack missing');
            check(dino.hp===hp&&ultCharge===37,'tactical morph refills resources');ihfStep(120);
            check(!dino.ironhaul.attack&&!dino.ironhaul.jets.length&&!dino.ironhaul.bunkers.length&&!dino.ironhaul.shells.length,'new mechanical effects never expire');
            const t=ihfSetup(0,left);t.x=left?60:780;t.y=180;ironBegin('barrage');ihfStep(9);
            const missiles=dino.ironhaul.rounds.filter(q=>q.kind==='missile');check(missiles.length===3&&missiles.every(q=>q.vy<0),'missile pods do not launch upwards');
            for(let i=0;i<100;i++){if(i<30)t.x+=left?1:-1;ihfStep();}
            check(t.hp<10000&&!dino.ironhaul.rounds.some(q=>q.kind==='missile'),'homing missiles cannot reach moving target or expire');
            const t2=ihfSetup(1,left);t2.x=left?60:780;t2.y=180;dino.ironhaul.silver=2;ironSpawnMissiles(dino,4);
            check(dino.ironhaul.rounds.every(q=>q.ultimate&&q.white),'white missile provenance lost');ihfStep(120);
            check(t2.hp<10000&&dino.ironhaul.mode===0&&ultCharge===0,'lingering white missiles refill ultimate after expiry');
        }
        return 'PASS early J cancels, J K J branch, both tactical morph attacks, moving-target homing, finite new effects and white missile resource isolation';
    }'''))
    print(page.evaluate('''()=>{
        for(const mode of [0,1]){
            ihfSetup(mode);ihfKey('KeyJ');ihfKey('KeyJ',false);ihfStep(15);ihfKey('KeyJ');ihfKey('KeyJ',false);ihfStep(15);
            check(dino.ironhaul.attack?.id===(mode?'spin':'rise'),'one-slot combo buffer missing');
            ihfStep(50);check(!dino.ironhaul.attack,'J repeats forever');
            ihfKey('KeyK');ihfStep(10);ihfKey('KeyK',false);ihfStep();check(dino.ironhaul.attack?.id===(mode?'throw':'gun'),'tap/release K wrong');
        }
        ihfSetup(0);ihfKey('KeyK');ihfStep(50);ihfKey('KeyK',false);ihfStep();check(dino.ironhaul.attack?.id==='barrage','charged K missing');
        ihfStep(70);ihfKey('KeyE');ihfKey('KeyE',false);check(dino.ironhaul.mode===2,'E robot/truck morph');ultCharge=100;ihfKey('KeyU');ihfKey('KeyU',false);check(dino.ironhaul.mode===1,'U silver entry');
        ihfKey('KeyK');ihfKey('KeyK',false);ihfStep(14);const q=dino.ironhaul.rounds.find(q=>q.kind==='shield');check(!!q,'no thrown shield');
        ihfKey('KeyE');ihfKey('KeyE',false);check(dino.ironhaul.mode===1,'Q/E leaves ultimate armour');dino.ironhaul.silver=1;ihfStep();check(dino.ironhaul.mode===2&&dino.ironhaul.rounds.includes(q),'expiry deletes thrown shield');
        ihfStep(120);check(!dino.ironhaul.rounds.some(q=>q.kind==='shield')&&!dino.ironhaul.shieldOut,'shield never returns');
        const t=ihfSetup(2);ihfKey('KeyJ');ihfStep(90);ihfKey('KeyJ',false);ihfStep(20);check(t.hp<9996,'held truck gatling missing');
        ihfSetup(2);dashCd=0;ihfKey('ShiftLeft');ihfKey('ShiftLeft',false);check(dino.ironhaul.attack?.id==='ram','native dash does not ram');ihfStep(45);check(!dino.ironhaul.attack,'ram is infinite');
        return 'PASS public J/K input, finite combo buffer, charged cannon, Q/E morph, persistent returning shield, truck hold-fire and dash ram';
    }'''))
    print(page.evaluate('''()=>{
        for(const mode of [0,1])for(const left of [false,true]){
            const expected=mode?['aegisorbit','aegislance','aegisvault','aegiswheel','ascension','starfall']:['recoil','advance','gunvault','rail','skyripper','gunrain'];
            ihfSetup(mode,left);ihfKey('KeyJ');ihfKey('KeyJ',false);ihfStep(10);dashCd=0;ihfKey('ShiftLeft');ihfKey('ShiftLeft',false);check(dino.ironhaul.attack?.id===expected[0],'J Dash missing '+mode);ihfStep(70);
            ihfSetup(mode,left);dashCd=0;ihfKey('ShiftLeft');ihfKey('ShiftLeft',false);ihfKey('KeyJ');ihfKey('KeyJ',false);check(dino.ironhaul.attack?.id===expected[1],'Dash J missing '+mode);ihfStep(80);
            ihfSetup(mode,left);ihfKey('KeyK');ihfStep(8);dashCd=0;ihfKey('ShiftLeft');ihfKey('ShiftLeft',false);ihfKey('KeyK',false);check(dino.ironhaul.attack?.id===expected[2],'K Dash missing '+mode);ihfStep(85);
            ihfSetup(mode,left);dashCd=0;ihfKey('ShiftLeft');ihfKey('ShiftLeft',false);ihfKey('KeyK');ihfKey('KeyK',false);ihfStep();check(dino.ironhaul.attack?.id===expected[3],'Dash K missing '+mode);ihfStep(70);
            ihfSetup(mode,left);ihfKey('KeyJ');ihfKey('KeyJ',false);ihfStep(8);ihfKey('Space');ihfStep();ihfKey('Space',false);check(dino.ironhaul.attack?.id===expected[4]&&!dino.grounded,'J Jump missing '+mode);ihfStep(90);
            ihfSetup(mode,left);ihfKey('KeyK');ihfStep(8);ihfKey('Space');ihfStep();ihfKey('Space',false);ihfKey('KeyK',false);check(dino.ironhaul.attack?.id===expected[5],'K Jump missing '+mode);ihfStep(90);
            check(!dino.ironhaul.attack,'branch fails to recover');
        }
        ihfSetup();ihfKey('KeyJ');ihfKey('KeyJ',false);ihfStep(8);dashCd=0;ihfKey('ShiftLeft');ihfKey('ShiftLeft',false);ihfStep(22);ihfKey('KeyJ');ihfKey('KeyJ',false);check(dino.ironhaul.attack?.id==='pursuit','J Dash J pursuit missing');
        ihfSetup();ihfKey('KeyK');ihfStep(8);dashCd=0;ihfKey('ShiftLeft');ihfKey('ShiftLeft',false);ihfKey('KeyK',false);ihfStep(26);ihfKey('KeyK');ihfKey('KeyK',false);check(dino.ironhaul.attack?.id==='rail','K Dash K rail missing');
        for(const mode of [0,1]){
            ihfSetup(mode);const seq=mode?['silvercut','spin','silverbloom','silvercross','sovereign']:['cut','rise','cross','thrust','execution'];
            for(const id of seq){ihfKey('KeyJ');ihfKey('KeyJ',false);check(dino.ironhaul.attack?.id===id,'long combo order '+id);ihfStep(IRON_PLAYER_MOVES[id].T);}
            check(!dino.ironhaul.attack,'long combo auto loops');
        }
        ihfSetup();ironMode(dino,1);check(dino.ironhaul.mode===0,'free silver mode bypasses ultimate');
        ihfSetup();ihfKey('KeyJ');ihfKey('KeyJ',false);ihfStep(8);ihfKey('KeyS');ihfKey('KeyK');ihfKey('KeyK',false);ihfKey('KeyS',false);ihfStep(10);check(dino.ironhaul.attack?.id==='cleaver','buffer loses the crouch modifier');
        return 'PASS both directions: J Dash / Dash J / K Dash / Dash K / J Jump / K Jump, linked followups, five-step manual combos and ultimate-only white armour';
    }'''))
    print(page.evaluate('''()=>{
        for(const [mode,id,age,part] of [[0,'execution',28,'sword'],[1,'spin',22,'shield']]){
            ihfSetup(mode);ironBegin(id);ihfStep(age);const g0=ironGeometry(dino);ihfStep();const g1=ironGeometry(dino);
            const start=part==='sword'?g0.tip:g0.shield,end=part==='sword'?g1.tip:g1.shield;
            check(Math.hypot(end.x-start.x,end.y-start.y)<12,'weapon snaps at release '+id);
            ihfStep(IRON_PLAYER_MOVES[id].T-age);check(dino.ironhaul.follow&&dino.ironhaul.trails.length<=24&&dino.ironhaul.ghosts.length<=6,'unbounded / absent motion recovery');
        }
        const damage=[];for(const mode of [0,1]){const t=ihfSetup(mode);ironBegin(mode?'silvercut':'cut');ihfStep(28);damage.push(10000-t.hp);}
        check(damage[0]===3&&damage[1]>=damage[0]*1.5,'white damage not buffed '+damage);
        ihfSetup();ihfKey('KeyK');ihfStep(8);dashCd=30;const hold=dino.ironhaul.k;ihfKey('ShiftLeft');ihfKey('ShiftLeft',false);check(dino.ironhaul.k===hold&&!dino.ironhaul.attack,'failed dash consumes charge');ihfKey('KeyK',false);
        ihfSetup();ihfKey('KeyJ');ihfKey('KeyJ',false);ihfStep(8);ihfKey('Space');ihfStep();ihfKey('Space',false);const airborne=dino.ironhaul.attack;
        dino.jumpCount=2;dino.canDoubleJump=false;ihfStep(10);ihfKey('KeyJ');ihfKey('KeyJ',false);ihfKey('Space');ihfStep();ihfKey('Space',false);check(dino.ironhaul.attack===airborne,'failed jump restarts aerial combo / infinite hover');
        ihfSetup(1);dino.ironhaul.silver=110;const t=bosses[0];t.x=850;ironBegin('sovereign');ihfStep(110);check(dino.ironhaul.mode===0&&!dino.ironhaul.silver,'expiry leaves white move running');ihfStep(130);check(ultCharge===0,'old white waves recharge ultimate');
        return 'PASS smooth sword/shield release, bounded trails/ghosts, white damage boost, failed-dash charge preservation and clean timed expiry';
    }'''))
    print(page.evaluate('''()=>{
        ihfSetup();ironBegin('charge');ihfStep(11);check(!dino.ironhaul.core,'core powers too early');ihfStep();check(dino.ironhaul.core===540,'9-second core missing');
        ihfStep(IRON_PLAYER_MOVES.charge.T-12);check(!ironBegin('charge'),'no core cooldown');
        ironBegin('rise');ihfStep(20);check(dino.ironhaul.rounds.some(q=>q.kind==='wave'),'powered thrust has no energy slash');ihfStep(540);check(!dino.ironhaul.core,'core never expires');
        for(const mode of [0,2]){
            ihfSetup(mode);ultCharge=99;check(!ironSilverStart(),'underfilled transformation');ultCharge=100;dino.invincible=false;dino.invTimer=0;
            check(ironSilverStart()&&ultCharge===0&&dino.ironhaul.mode===1&&dino.ironhaul.silver===720,'white entry');
            ihfStep(30);check(!dino.invincible,'white gives permanent immunity');const hp=dino.hp;
            dino.takeDamage(1);check(dino.hp===hp-1&&dino.ironhaul.mode===1,'damage removes whole white form');
            ihfStep(689);check(dino.ironhaul.mode===1,'white ends early');ihfStep();check(dino.ironhaul.mode===mode&&!dino.ironhaul.silver&&ultCharge===0,'white never expires or refunds ultimate');
        }
        const powers=[];
        for(const left of [720,120]){
            const t=ihfSetup(1);dino.ironhaul.silver=left;ultCharge=0;dino.invincible=false;dino.invTimer=0;
            check(ironBegin('ultimate'),'white finisher unavailable');ihfStep(154);powers.push(10000-t.hp);
            check(dino.ironhaul.mode===0&&!dino.ironhaul.attack&&!dino.invincible&&!dino.ironhaul.silverFinishing&&ultCharge===0,'finisher fails to consume / restore');
        }
        check(powers[0]>powers[1]*1.8,'remaining time does not scale finisher '+powers);
        ihfSetup(1);ironBegin('ultimate');ihfStep(30);dino.invincible=false;dino.invTimer=0;dino.takeDamage(1);
        check(!dino.ironhaul.attack&&dino.ironhaul.mode===0&&!dino.ironhaul.silverFinishing,'damage leaves finisher locked');
        return 'PASS finite core/cooldown, powered energy slash, 100% transformation cost, exact 12-second expiry, enhanced moves, timed finisher scaling, finite immunity / interruption';
    }'''))
    print(page.evaluate('''()=>{
        for(const mode of [0,1]){ihfSetup(mode);ihfKey('KeyL');ihfKey('KeyL',false);ihfStep(mode?9:7);check(dino.isShielding()&&dino.meleeTimer<23&&!dino.parryWindow&&frames>=dino.ironhaul.perfectUntil,'Perfect window exceeds documented duration');}
        ihfSetup(1);dino.invincible=false;dino.invTimer=0;ihfKey('KeyL');ihfKey('KeyL',false);check(dino.isShielding(),'no native guard');
        const hp=dino.hp,q=new BossProjectile(dino.x+dino.w/2,dino.y+dino.h/2,0,0,false,1);bossProjectiles.push(q);perfectParryCd=0;checkCollisions();
        check(dino.hp===hp&&!bossProjectiles.includes(q)&&dino.ironhaul.counter>frames,'silver perfect guard does not schedule riposte');
        ihfStep(7);check(!dino.ironhaul.attack,'instant riposte');ihfStep();check(dino.ironhaul.attack?.id==='riposte','delayed riposte missing');ihfStep(60);check(!dino.ironhaul.attack&&!dino.isShielding(),'guard / riposte never ends');
        for(const mode of [0,1,2]){
            ihfSetup(mode);const feet=dino.y+dino.h;
            for(let k=0;k<4;k++){keys.KeyS=true;ihfStep(8);keys.KeyS=false;ihfStep(8);check(dino.y+dino.h===feet,'crouch drifts floor '+mode);}
            ihfKey('Space');ihfStep(12);ihfKey('Space',false);check(dino.y+dino.h<feet-30,'mode cannot jump '+mode);ihfStep(90);check(dino.y+dino.h===feet&&dino.grounded,'mode cannot land '+mode);
        }
        return 'PASS real projectile perfect guard → delayed silver counter; stable crouch/jump/landing in all modes';
    }'''))
    print(page.evaluate('''()=>{
        for(const mode of [0,1,2]){
            ihfSetup(mode);mapTheme='forest';platforms.length=0;platforms.push({x:-60,w:280,top:320,h:80},{x:560,w:500,top:320,h:80},{x:620,w:100,top:240,h:20});
            dino.x=400;dino.y=430;dino.dy=8;dino.grounded=false;dino.invincible=false;dino.invTimer=0;ironBegin(mode===2?'ram':'thrust');ihfStep();
            check(dino._fallRecovery&&dino.dy<-12&&!dino.ironhaul.attack,'mode fails to recover / cancel pit attack '+mode);
            check(dino.y+dino.h<320&&dino.hp>0,'pit relaunch is too low');
            check(ironBegin(mode===2?'gatling':'air'),'cannot attack during rebound');ihfStep();check(!!dino.ironhaul.attack,'rebound deletes new aerial attack');ihfStep(90);
        }
        xDatForm(11);mapTheme='wilds';startGame('normal');check(dino.x>5000&&dino.ironhaul&&dino.h===68,'large map entry');
        const start=dino.x;ihfKey('KeyD');for(let i=0;i<45;i++)loopAnToan();ihfKey('KeyD',false);check(dino.x>start+100,'large-map movement blocked');
        ihfKey('Space');for(let i=0;i<14;i++)loopAnToan();ihfKey('Space',false);
        ihfKey('Space');loopAnToan();ihfKey('Space',false);check(dino.jumpCount>=2&&dino.dy<0,'new form has no double jump');
        check(!_loiKhung.size,'large map errors '+[..._loiKhung]);
        for(const [mode,move] of [[0,'gun'],[0,'barrage'],[0,'cleaver'],[1,'throw'],[1,'sovereign'],[2,'gatling'],[2,'truckcannon']])for(const kind of ['godzilla','fire']){
            ihfSetup(mode);bosses.length=0;const b=kind==='godzilla'?new GodzillaBoss():new FireCloneBoss();b.hp=b.maxHp=1000;b.x=800;b.y=320-b.h;
            b.state=kind==='godzilla'?'clash_go':'beam_clash';b.clashX=480;b.clashY=288;b.beamClashX=480;b.beamMouthY=288;b.beamMouthX=810;b.beamDir=-1;bosses.push(b);doChieuBatDau(b);ultCharge=0;
            ironBegin(move);ihfStep(100);check(doChieuLay(b).length>0,'move ignores real beam clash '+move+' '+kind);check(b.hp===1000&&ultCharge===0,'clash farms fake health / ultimate '+move+' '+kind);
        }
        ihfSetup();const g=ironGeometry(dino);check([g.grip.x,g.tip.y,g.gun.x,g.shieldBox.w].every(Number.isFinite),'shared geometry invalid');
        // Walk a real arena against the existing boss and exercise every form.
        for(const mode of [0,1,2]){
            ihfSetup(mode);bosses.length=0;const b=new IronhaulBoss();b.phase=2;b.silver=false;b.resizeVehicle(false);b._hp=b.maxHp=150;b.idle(99999);b.x=dino.x+dino.w+10;bosses.push(b);
            ihfKey('KeyJ');for(let i=0;i<100;i++){dino.invincible=true;dino.invTimer=9999;loopAnToan();}ihfKey('KeyJ',false);
            check(b.hp<150,'native form cannot damage real boss '+mode);
        }
        check(!_loiKhung.size,'native frame errors '+[..._loiKhung]);
        xDatForm(0);startGame('normal');check(!ironOn()&&!dino.ironhaul&&dino.maxHp===5,'old form affected');
        xDatForm(11);startGame('pvp');check(!ironOn()&&xFormIdx()===0&&!dino.ironhaul,'PvP exclusion missing');
        return 'PASS shared rig geometry, both real beam-clash bosses, native fight in all modes, ordinary-form restart and PvP isolation';
    }'''))
    # Saved selection must work without opening Customize.
    page.evaluate('xDatForm(11)');page.reload()
    assert page.evaluate("()=>{startGame('normal');return ironOn()&&xFormIdx()===11&&!!dino.ironhaul&&dino.h===68&&dino.hp===10;}")
    point=page.evaluate("()=>{gameState='custom_menu';xDatForm(10);resetPreview();drawCustomMenu();const r=canvas.getBoundingClientRect();return {x:r.x+649*r.width/canvas.width,y:r.y+100*r.height/canvas.height};}")
    page.mouse.click(point['x'],point['y']);assert page.evaluate('ironOn()&&xFormIdx()===11')
    page.mouse.click(point['x'],point['y']);assert page.evaluate('!ironOn()&&xFormIdx()===0')
    point=page.evaluate("()=>{const r=canvas.getBoundingClientRect();return {x:r.x+443*r.width/canvas.width,y:r.y+100*r.height/canvas.height};}")
    page.mouse.click(point['x'],point['y']);assert page.evaluate('ironOn()&&xFormIdx()===11')
    page.evaluate("drawCustomMenu();")
    page.screenshot(path='/tmp/ironhaul-form-final.png')
    assert not errors,errors
    print('PASS saved selection/reload/start, actual Customize arrows / wrap and three-mode preview; no browser errors')
    browser.close()
