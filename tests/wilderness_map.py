"""Exploration prototype: actual inputs, shared terrain, every rig, combat at altitude."""
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1100,'height':740})
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.add_init_script('requestAnimationFrame=()=>0;')
    page.goto(os.environ.get('DINO_TEST_URL','http://127.0.0.1:8009')+'/games/Dino/index.html')
    page.evaluate('''()=>{
        window.check=(v,msg)=>{if(!v)throw Error(msg);};
        window.wStep=()=>{frames++;wildernessTick();dino.update();xTick();danteTick();};
        window.wSetup=(f,empty=true)=>{
            for(const k in keys)delete keys[k];runeSlots=[null,null];currentPower=0;phuKien=0;
            xDatForm(f);mapTheme='wilds';startGame('normal');if(empty)enemies.length=0;
            for(let i=0;i<3;i++)wStep();dino.invincible=true;dino.invTimer=99999;
        };
        window.wPlace=(x,top)=>{
            dino._wildLadder=null;dino.x=x;dino.y=top-dino.h;dino.dy=0;dino.grounded=true;
            if(dino.apex){const a=dino.apex.state;a.x=(x+dino.w/2)/.55;a.y=top/.55;a.vx=a.vy=0;a.isGrounded=true;a.activePlatform=a.ledgePlatform=null;a.isLedgeGrabbing=a.isLedgeClimbing=a.isWallSliding=false;}
            wStep();
        };
        window.wDown=code=>dispatchEvent(new KeyboardEvent('keydown',{code}));
        window.wUp=code=>dispatchEvent(new KeyboardEvent('keyup',{code}));
        window.wJumpTo=(dest,top)=>{
            wDown('Space');let landed=false;
            for(let i=0;i<100;i++){
                const dx=dest-dino.x;keys.KeyD=dx>12;keys.KeyA=dx< -12;
                wStep();if(i===1)wUp('Space');
                if(i>3&&dino.grounded&&dino.y+dino.h<=top+4){landed=true;break;}
            }
            keys.KeyD=keys.KeyA=false;return landed;
        };
    }''')
    print(page.evaluate('''()=>{
        wSetup(0,false);const ps=platforms.map(p=>[p.x,p.top]),population=enemies.length;
        for(let i=0;i<600;i++)loopAnToan();
        check(WORLD_W===12000&&Math.abs(dino.x-6000)<5,'world/spawn');
        check(platforms.every((p,i)=>p.sway||p.x===ps[i][0]&&p.top===ps[i][1]),'terrain scrolls');
        check(enemies.length===population&&bosses.length===0&&score===0&&gameSpeed===0&&!gameVictory,'runner/boss queue leaked');
        check(wilderness.arenas.length===4&&wilderness.rests.length===6,'landmarks');
        check(campaignO().some(c=>c.id==='wilds'),'campaign entry missing');
        wDown('Tab');check(wilderness.mapOpen,'map key');wUp('Tab');wDown('Tab');wUp('Tab');check(!wilderness.mapOpen,'map close');
        return 'PASS static world, central spawn, 4 arenas / 6 rest points, no auto-scroll/spawn/victory/score, map toggle';
    }'''))
    page.screenshot(path='/tmp/wilds-spawn.png')
    print(page.evaluate('''()=>{
        for(let f=0;f<11;f++){
            wSetup(f);wPlace(4200,320);const x=dino.x;keys.KeyA=true;
            for(let i=0;i<50;i++)wStep();keys.KeyA=false;
            check(dino.x<x-100&&dino.isFacingLeft,'left/facing '+f);
            keys.KeyD=true;for(let i=0;i<60;i++)wStep();keys.KeyD=false;
            check(dino.x>x&& !dino.isFacingLeft,'right/facing '+f);
            wPlace(4500,-1300);dino.grounded=false;wildernessCamera(true);
            check(dino.y>=camY&&dino.y+dino.h<camY+canvas.height,'camera loses high player '+f);
            wPlace(4500,WILDS.top-200);wStep();check(dino.y>=WILDS.top+20,'ceiling escape '+f);
            wPlace(1355,320);dino.y=420;dino.grounded=false;
            if(dino.apex){dino.apex.state.y=(420+dino.h)/.55;dino.apex.state.isGrounded=false;}
            wStep();check(dino._fallRecovery&&dino.dy<-14,'pit recovery '+f);
        }
        return 'PASS all 11 forms: both directions, facing, high camera, pit rebound';
    }'''))
    print(page.evaluate('''()=>{
        for(const f of [0,7,8,9,10]){
            wSetup(f);wPlace(8000,250);
            for(let j=1;j<=25;j++)check(wJumpTo(7900+j*125+70,250-j*70),'mountain step '+j+' form '+f);
            check(wJumpTo(11300,-1570),'mountain summit '+f);
            check(dino.y+dino.h<=-1565,'not on summit '+f);
            wSetup(f);wPlace(5490,230);
            for(let j=1;j<=24;j++)check(wJumpTo(5430+(j%2)*160+90,230-j*90),'tree branch '+j+' form '+f);
            check(wJumpTo(5530,-2020),'tree crown '+f);
            check(dino.y+dino.h<=-2015,'not on crown '+f);
            wSetup(f);wPlace(5595,230);wDown('KeyW');
            for(let i=0;i<260;i++)wStep();wUp('KeyW');
            check(dino.y+dino.h<-450,'rope route '+f);
            check(!dino._wildLadder,'rope never exits '+f);
        }
        return 'PASS Dino / X / Apex / Dante / Vergil: entire 26-step mountain and 25-branch tree route + both summits using real jump inputs; rope climb';
    }'''))
    print(page.evaluate('''()=>{
        wSetup(8);wPlace(5800,-500);dino.grounded=false;dino.apex.state.isGrounded=false;
        keys.KeyD=true;let clung=false;
        for(let i=0;i<50;i++){wStep();const a=dino.apex.state;if(a.isWallSliding||a.isLedgeGrabbing)clung=true;}
        keys.KeyD=false;check(clung,'Apex cannot cling to giant trunk');
        for(const f of [0,7,8,9,10]){
            wSetup(f);wPlace(11500,-1570);wStep();check(wilderness.checkpoint===4,'checkpoint not activated '+f);
            wPlace(10000,320);wDown('KeyH');wUp('KeyH');
            check(Math.abs(dino.x-11500)<60&&dino.y<-1500&&dino.dy<0,'checkpoint return '+f);
            for(let i=0;i<70;i++)wStep();check(dino.grounded&&Math.abs(dino.y+dino.h+1570)<4,'checkpoint fall loop '+f);
        }
        return 'PASS Apex trunk wall cling, all main rigs activate/return to elevated checkpoint and land';
    }'''))
    print(page.evaluate('''()=>{
        wSetup(0);const high={x:9500,y:-1000,w:10,h:10};
        check(!projRaNgoai(high)&&!bossProjRaNgoai(high),'high projectiles culled');
        check(projRaNgoai({x:9500,y:-3000}),'out of world not culled');
        frames+=361;check(projRaNgoai(high),'projectiles live forever');
        for(const f of [0,7,8,9,10]){
            wSetup(f);wPlace(6020,-2020);const e=new WildernessEnemy('bruiser',6100,-2020);e.cd=9999;enemies.push(e);
            wDown('KeyJ');for(let i=0;i<75;i++)loopAnToan();wUp('KeyJ');
            check(e.hp<12,'no high-altitude combat '+f);
        }
        wSetup(7);wPlace(11500,-1570);xChoi.dan=[];
        xChoi.ban('lemon',8,0,6);const bullet=xChoi.dan[0];xChoi.tickVatThe();check(xChoi.dan.includes(bullet),'X native buster culled beyond screen');
        const lurk=new WildernessEnemy('lurker',dino.x+100,-1570);lurk.update();check(lurk.state==='wake','ambusher does not wake');
        for(let i=0;i<37;i++)lurk.update();check(lurk.state==='idle','ambusher never emerges');
        const pest=new WildernessEnemy('pest',dino.x+140,-1570);pest.cd=0;pest.update();check(pest.state==='wind','pest no warning');
        const count=bossProjectiles.length;for(let i=0;i<31;i++)pest.update();check(bossProjectiles.length===count,'pest fires before warning');
        pest.update();check(bossProjectiles.length===count+1,'pest does not fire');
        wSetup(10);wPlace(5520,-1930);vgPerformTrick(dino,dino.vergil,'up');
        check(dino.y<-1800,'Vergil teleport resets elevation');
        return 'PASS all five rigs damage native enemies on crown; X distant buster, world projectile bounds/lifetime, hidden ambusher and telegraphed canopy fire';
    }'''))
    # Exercise the regular world loop while visiting every region and both altitude extremes.
    print(page.evaluate('''()=>{
        for(const f of [0,7,8,9,10]){
            wSetup(f,false);
            for(const [x,y] of [[1000,320],[4200,320],[5500,-850],[6000,-2020],[11500,-1570]]){
                wPlace(x,y);wildernessCamera(true);
                for(let i=0;i<80;i++)loopAnToan();
                check(Number.isFinite(dino.x+dino.y+camX+camY)&&!gameOver,'world loop invalid '+f);
                check(camX>=0&&camX<=WILDS.width-canvas.width&&camY>=WILDS.top,'camera bounds');
            }
        }
        check(!_loiKhung.size,'caught frame errors '+[..._loiKhung]);
        wSetup(0);mapTheme='forest';startGame('normal');check(!wildernessOn()&&!wilderness&&WORLD_W===canvas.width&&camY===-160,'world leaks into campaign');
        return 'PASS native loop across 5 regions × 5 rigs; clean return to runner';
    }'''))
    # Actual canvas click follows the same Campaign path as the player.
    button=page.evaluate("""()=>{gameState='map_select';campaignTab=null;drawMapSelect();const c=campaignO().find(c=>c.id==='wilds'),b=canvas.getBoundingClientRect();return {x:b.x+(c.x+c.w/2)*b.width/canvas.width,y:b.y+(c.y+c.h/2)*b.height/canvas.height};}""")
    page.mouse.click(button['x'],button['y'])
    assert page.evaluate("wildernessOn() && WORLD_W===12000 && Math.abs(dino.x-6000)<1"), 'Campaign click failed'
    page.evaluate("wilderness.checkpoint=4;startGame('normal');check(wildernessOn()&&wilderness.checkpoint===0&&platforms.length===133,'restart does not reset world');")
    print('PASS actual Campaign click and fresh restart')
    assert not errors,errors
    browser.close()
