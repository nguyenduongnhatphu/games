"""Ironhaul: staged HP, every move, vehicle return, shield counterplay and native loop."""
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
        window.ihSetup=(stage=1,left=true,form=0)=>{
            for(const k in keys)delete keys[k];runeSlots=[null,null];currentPower=0;phuKien=0;
            xDatForm(form);testBossSelection=81;startGame('test_boss');bossWaitTimer=0;spawnEntities();
            const b=bosses[0];b.idle(9999);
            if(stage>=2){b.hp=0;b.combatTick();for(let i=0;i<101;i++)b.update();}
            if(stage===3){b.hp=50;b.combatTick();for(let i=0;i<101;i++)b.update();}
            b.idle(9999);b.x=left?600:160;b.y=b.baseY;dino.x=left?250:650;dino.y=320-dino.h;dino.dy=0;dino.grounded=true;
            dino.invincible=true;dino.invTimer=99999;b.faceP();return b;
        };
        window.ihTick=(b,draw=true)=>{
            frames++;b.combatTick();b.update();
            for(let i=bossProjectiles.length-1;i>=0;i--){const q=bossProjectiles[i];q.update();if(draw)q.draw();if(bossProjRaNgoai(q))bossProjectiles.splice(i,1);}
            if(draw){const m=ctx.getTransform(),alpha=ctx.globalAlpha;b.draw();const n=ctx.getTransform();check(m.a===n.a&&m.b===n.b&&m.c===n.c&&m.d===n.d&&m.e===n.e&&m.f===n.f&&ctx.globalAlpha===alpha,'leaked canvas state');}
            check([b.x,b.y,b.hp,b.w,b.h,b.dy].every(Number.isFinite),'invalid boss pose');
            check(b.x>=0&&b.x+b.w<=canvas.width+1,'boss escapes arena');
            check(bossProjectiles.every(q=>[q.x,q.y,q.vx,q.vy].every(Number.isFinite)),'invalid projectile');
        };
    }''')
    print(page.evaluate('''()=>{
        let b=ihSetup();check(b.hp===30&&b.maxHp===30&&b.vehicle,'truck health');
        dealDamage(b,1000,'flat');check(b.hp===0,'truck does not die');b.combatTick();check(b.phase===2&&b.hp===150&&b.maxHp===150&&!b.dying,'robot phase');
        dealDamage(b,1000,'flat');check(b.hp===150,'transform takes damage');
        for(let i=0;i<101;i++)ihTick(b);check(!b.vehicle&&b.w===104&&b.h===180&&!b.invulnAll,'robot never deploys');
        dealDamage(b,1000,'flat');check(b.hp===50,'burst skips silver phase');for(let i=0;i<8;i++)dealDamage(b,1000,'flat');check(b.hp===50,'multi-hit burst skips armour transition');b.combatTick();check(b.silver&&b.hp===50&&b.maxHp===150,'silver healed or threshold wrong');
        for(let i=0;i<101;i++)ihTick(b);dealDamage(b,49,'flat');check(b.hp===1,'silver damage blocked');dealDamage(b,1,'flat');check(b.hp===0,'silver cannot die');
        b=ihSetup();runeSlots=['firststrike',null];dealDamage(b,1,'flat');check(b.hp===23&&b._firstStrikeUsed,'First Strike lost');dealDamage(b,1,'flat');check(b.hp===22,'First Strike repeats');runeSlots=[null,null];
        return 'PASS 30 HP truck → 150 HP robot → 50 HP silver without healing; finite invulnerability / burst gate / death / First Strike';
    }'''))
    print(page.evaluate('''()=>{
        const results=[];
        for(const stage of [1,2,3])for(const left of [true,false]){
            const moves=ihSetup(stage,left).legalMoves();
            for(const move of moves){
                const b=ihSetup(stage,left);b.begin(move);let flipped=false,vehicle=false,returned=false,shots=0,lastN=0;
                for(let i=0;i<430;i++){
                    ihTick(b);vehicle ||= b.vehicle;flipped ||= b.ram?.leg===1;
                    shots+=Math.max(0,bossProjectiles.length-lastN);lastN=bossProjectiles.length;
                    if(b.state==='idle'){returned=true;break;}
                }
                check(returned,stage+' '+move+' never recovers');check(!b.slash&&!b.ram,'stale hitboxes '+move);
                check(stage===1?b.vehicle:!b.vehicle,'wrong final form '+move);
                if(move==='ih_ram'||move==='ih_morph')check(flipped&&vehicle,'missing two vehicle passes '+move);
                if(['ih_cannon','ih_gatling','ih_barrage','ih_aegis'].includes(move))check(shots>0,'no projectiles '+move);
                results.push([stage,left,move]);
            }
        }
        for(const stage of [1,2,3])for(const side of [-1,1]){
            const b=ihSetup(stage);b.x=side<0?8:canvas.width-b.w-8;dino.x=side<0?0:canvas.width-dino.w;
            b.begin(stage===1?'ih_ram':'ih_morph');const distance=[0,0];
            for(let i=0;i<430&&b.state!=='idle';i++){
                const r=b.ram,leg=r?.leg,active=r?.stage==='drive',x=b.x;
                ihTick(b);if(active&&leg<2)distance[leg]+=Math.abs(b.x-x);
            }
            check(distance.every(d=>d>500),'corner charge counts a blocked zero-length pass '+stage+' '+side+' '+distance);
        }
        return 'PASS '+results.length+' move/phase/direction combinations: finite recovery, two truck passes, real projectiles, stable geometry and Canvas';
    }'''))
    print(page.evaluate('''()=>{
        for(const left of [true,false])for(const f of [0,7,8,9,10]){
            let b=ihSetup(3,left,f);b.begin('ih_parry');b.subTimer=27;
            dino.x=b.cx()+b.dir()*110-dino.w/2;const hp=b.hp;
            const dealt=sgDamage(dino,b,3,'test');check(!dealt&&b.hp===hp&&b.state==='ih_riposte','front parry missing '+f);
            check(b.parryLock===8&&b.parryCd>0,'no bounded parry cooldown');
            let calls=0;const original=dino.takeDamage;dino.takeDamage=()=>calls++;
            for(let i=0;i<25;i++)ihTick(b);check(calls===0,'instant unavoidable riposte');
            for(let i=0;i<90;i++)ihTick(b);dino.takeDamage=original;
            check(b.state==='idle'&&!b.invulnAll,'riposte never recovers');
            b=ihSetup(3,left,f);b.begin('ih_parry');b.subTimer=27;dino.x=b.cx()-b.dir()*110-dino.w/2;
            dealDamage(b,3,'ammo');check(b.hp===47&&b.state==='ih_parry','back attacks cannot punish');
            b=ihSetup(3,left,f);b.begin('ih_parry');b.subTimer=10;dealDamage(b,3,'ammo');check(b.hp===47,'windup immune');
            b=ihSetup(3,left,f);b.begin('ih_parry');b.subTimer=36;dealDamage(b,3,'ammo');check(b.hp===47,'missed parry has no opening');
        }
        const b=ihSetup(3);b.begin('ih_parry');b.subTimer=27;dino.x=b.cx()-100;
        dealDamage(b,3,'ammo',{owner:1,x:b.cx()+90,y:b.cy(),w:10,h:10});
        check(b.hp===47&&b.state==='ih_parry','projectile side rechecked from current player position');
        return 'PASS five player rigs × both sides: front parry, delayed counter, rear punish, vulnerable windup/recovery, projectile origin and cooldown';
    }'''))
    print(page.evaluate('''()=>{
        let b=ihSetup(2);b.begin('ih_combo');dino.x=b.cx()+b.attackDir*110-dino.w/2;
        let count=0;const take=dino.takeDamage;dino.takeDamage=()=>count++;
        for(let i=0;i<24;i++)ihTick(b);check(!count,'sword damages before warning');
        for(let i=0;i<100;i++)ihTick(b);dino.takeDamage=take;check(count>=1&&count<=3,'sword hitboxes missing or repeated '+count);
        b=ihSetup(1);b.begin('ih_cannon');for(let i=0;i<37;i++)ihTick(b);check(!bossProjectiles.length,'cannon fires before deployment');
        ihTick(b);check(bossProjectiles.length===1&&bossProjectiles[0].ihKind==='shell','cannon not fired');
        let shells=1;for(let i=0;i<100;i++){const before=bossProjectiles.length;ihTick(b);shells+=Math.max(0,bossProjectiles.length-before);}check(shells===3,'cannon shell count '+shells);
        b=ihSetup(1);b.begin('ih_gatling');let bullets=0;for(let i=0;i<150;i++){const before=bossProjectiles.length;ihTick(b);bullets+=Math.max(0,bossProjectiles.length-before);}check(bullets===12,'gatling bullet count '+bullets);
        // Stage changes clean up an airborne, controlled or truck-form attack.
        b=ihSetup(2,true,9);danteTick();b.begin('ih_morph');for(let i=0;i<50;i++)ihTick(b);check(b.vehicle,'morph fixture');
        dino.dante.attack={id:'high'};const control=dswControl(b,{hold:true,launch:true});check(control&&b._dswControl,'control fixture not engaged');b.hp=50;b.combatTick();check(b.silver&&!b.vehicle&&!b._dswControl&&!b.ram&&!b.slash&&b.grounded,'phase change leaves controls/vehicle');
        return 'PASS sword active frames, exact 3 mortar / 12 machine-gun rounds, interruption and silver transition cleanup';
    }'''))
    print(page.evaluate('''()=>{
        for(const stage of [1,2,3]){
            const b=ihSetup(stage);b.idle(10);const seen=new Set();
            for(let i=0;i<2600;i++){
                dino.invincible=true;dino.invTimer=99999;dino.x=240+Math.sin(i*.009)*120;
                loopAnToan();seen.add(b.state);check(b.hp>0&&!b.dying&&!gameOver,'native loop ends unexpectedly');
            }
            check(seen.size>=(stage===1?4:5),'native AI chooses too few states '+stage+' '+[...seen]);
            check([...seen].every(s=>['idle','ih_unfold','ih_riposte'].includes(s)||b.legalMoves().includes(s)),'illegal phase move');
        }
        check(!_loiKhung.size,'caught errors '+[..._loiKhung]);
        const b=ihSetup(3);b.hp=0;for(let i=0;i<100;i++)loopAnToan();check(!bosses.includes(b),'native final defeat does not remove boss');
        testBossSelection=0;startGame('test_boss');bossWaitTimer=0;spawnEntities();check(bosses[0] instanceof TRexBoss&&mapTheme!=='ironcity','city leaks into old boss');
        return 'PASS native AI 2,600 frames per stage, legal move selection, final defeat and restart isolation';
    }'''))
    print(page.evaluate('''()=>{
        for(const f of [0,7,8,9,10]){
            const b=ihSetup(2,true,f);dino.x=b.x-52;dino.y=320-dino.h;b.faceP();loopAnToan();
            dispatchEvent(new KeyboardEvent('keydown',{code:'KeyJ'}));
            for(let i=0;i<100;i++)loopAnToan();dispatchEvent(new KeyboardEvent('keyup',{code:'KeyJ'}));
            check(b.hp<150,'native J cannot damage robot form '+f);
        }
        const b=ihSetup(2);b.begin('ih_combo');dino.invincible=false;dino.invTimer=0;dino.meleeTimer=26;dino.parryWindow=3;perfectParryCd=0;
        const hp=dino.hp,bhp=b.hp;b.hurtBox({x:dino.x,y:dino.y,w:dino.w,h:dino.h},'player-parry-test');
        check(dino.hp===hp&&b.hp<bhp&&b.state==='idle','player perfect parry does not stop sword');
        check(!_loiKhung.size,'native combat errors');
        return 'PASS real J input damages robot with all five rigs; player perfect guard counters and interrupts its melee';
    }'''))
    # Find the city page and exercise the actual test-menu click.
    button=page.evaluate('''()=>{gameState='test_menu';for(let i=0;i<getTestMenuLayout().np;i++){testMenuPage=i;const L=getTestMenuLayout(),c=L.btns.find(c=>c.it[1]===81);if(c){drawTestMenu();const r=canvas.getBoundingClientRect();return {x:r.x+(c.x+c.w/2)*r.width/canvas.width,y:r.y+(c.y+c.h/2)*r.height/canvas.height};}}throw Error('No city test-menu entry');}''')
    page.mouse.click(button['x'],button['y'])
    page.evaluate("for(let i=0;i<130;i++)loopAnToan();check(bosses[0] instanceof IronhaulBoss&&mapTheme==='ironcity','test-menu click');")
    page.screenshot(path='/tmp/ironhaul-final.png')
    assert not errors,errors
    print('PASS actual city boss-menu click; no browser errors')
    browser.close()
