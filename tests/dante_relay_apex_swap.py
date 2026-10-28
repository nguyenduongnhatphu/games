"""Dante JJ KKK relay, persistent Round Trip and live Apex Q/E variants."""
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1100,'height':800})
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.add_init_script('requestAnimationFrame=()=>0')
    page.goto(os.environ.get('DINO_TEST_URL','http://127.0.0.1:8000')+'/games/Dino/index.html')
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        function key(code,down=true,repeat=false){window.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{code,repeat,bubbles:true}));}
        function tap(code){key(code);key(code,false);}
        function step(n=1){for(let i=0;i<n;i++){frames++;dino.update();danteTick();for(const o of [...enemies,...bosses])if(o.hp>0)o.update();}}
        function reset(form=9,color=0){
            for(const k of Object.keys(keys))delete keys[k];
            apexSetColor(color);xDatForm(form);startGame('normal');paused=false;mapTheme='desert';camX=camY=0;dashVx=0;
            spawnTimerCactus=spawnTimerEnemy=999999;nextBossScore=99999999;
            dino.x=400;dino.y=320-dino.h;dino.grounded=true;dino.isFacingLeft=false;
        }
        function target(left=false,boss=false){const o={x:left?290:510,y:260,w:42,h:60,hp:10000,maxHp:10000,grounded:true,state:'charging',calls:0,update(){this.calls++;},draw(){}};(boss?bosses:enemies).push(o);return o;}
        function finish(p,a=p.attack){let limit=250;while(p.attack===a&&limit-->0)step();check(limit>0,'attack stuck '+a.id);}
        const relays=[];
        for(const left of [false,true])for(const queued of [false,true]){
            reset();dino.isFacingLeft=left;const p=dino.dante,o=target(left,left),dir=left?-1:1;
            tap('KeyJ');check(p.attack?.id==='a1','first J');finish(p);
            tap('KeyJ');check(p.attack?.id==='a2','second J');
            if(queued)tap('KeyK');finish(p);
            if(!queued)tap('KeyK');
            check(p.attack?.id==='retreat_round','JJ K must backstep/throw');
            const oldX=dino.x;
            if(queued)tap('KeyK');finish(p);
            check((dino.x-oldX)*dir<-15,'Round Trip did not retreat '+[left,queued,oldX,dino.x,dashVx,p.attack?.id]);
            const round=p.sword.round;check(round&&!round.returning,'missing Round Trip');
            if(!queued)tap('KeyK');
            check(p.arm===1&&p.attack?.id==='flydragon1'&&p.sword.round===round,'relay did not equip Balrog / deleted sword');
            const rushX=dino.x;
            if(queued)tap('KeyK');finish(p);
            check((dino.x-rushX)*dir>15,'Fly Dragon did not rush forward');
            if(!queued)tap('KeyK');
            const end=p.attack;check(end?.id==='flydragon2'&&end._comboFinish,'last K is not an earned rising finisher');
            let launched=false,timeout=100;
            while(p.attack===end&&timeout-->0){step();launched ||= left?(o._dswControl?.vx||0)*dir>10:!!o._dswControl?.air;dino.draw();}
            check(launched&&o.hp<9990,'Fly Dragon ending missed launcher '+[left,queued,o.hp,o.x,dino.x]);
            relays.push([left,queued,10000-o.hp]);
        }
        // Ordinary Round Trip stays independent across every equipped weapon.
        reset();let p=dino.dante;keys.KeyS=true;tap('KeyK');keys.KeyS=false;
        finish(p);let round=p.sword.round;check(round,'ordinary Round Trip missing');
        const o=target();o.x=round.x-20;o.y=round.y-25;
        for(let i=1;i<6;i++){
            const age=round.t,hp=o.hp;tap('KeyE');
            check(p.arm===i&&p.sword.round===round,'weapon switch deleted Round Trip '+i);
            step(16);check(p.sword.round===round&&!round.returning&&round.t===age+16,'switch recalls/resets Round Trip '+i);
            check(o.hp<hp,'sword stops dealing DSD damage with arm '+i);
            dino.draw();
        }
        step(150);check(!p.sword.round,'Round Trip never returns/expires');
        reset();p=dino.dante;keys.KeyS=true;tap('KeyK');keys.KeyS=false;finish(p);tap('KeyE');
        startGame('normal');check(!dino.dante.sword?.round,'Round Trip leaked into restart');
        // Q/E cycles all five variants without recreating the Apex rig.
        reset(8);step();const a=dino.apex,state=a.state;dino.hp=5;ultCharge=47;state.dashCooldown=31;
        const x=dino.x,y=dino.y,wall=state.wallBudget;
        for(let color=1;color<=5;color++){
            tap('KeyE');check(apexColor===color%5&&dino.apex===a&&a.state===state,'E does not cycle live variants');
            check(dino.hp===5&&ultCharge===47&&state.dashCooldown===31&&state.wallBudget===wall&&dino.x===x&&dino.y===y,'variant swap resets resources or position');
            dino.draw();drawUI();
        }
        tap('KeyQ');check(apexColor===4,'Q wrap');key('KeyQ',true,true);key('KeyQ',false);check(apexColor===4,'held Q repeats switch');
        check(localStorage.getItem('dino_apex_color')==='4','variant not saved');
        paused=true;tap('KeyE');check(apexColor===4,'paused switch');paused=false;
        // Leaving an occupied shrine removes support and charge, while cooldown keeps progressing away.
        a.obelith().clock=599;step();const pad=a.obelith().blocks[0];check(pad,'Obelith shrine missing after swap');
        dino.x=(pad.x+pad.w/2)*.55-dino.w/2;dino.y=pad.y*.55-dino.h;
        state.activePlatform=pad;state.isGrounded=true;state.vy=0;step(60);check(a.obelith().ready,'Obelith charge');
        tap('KeyE');check(apexColor===0&&!a.obelith().blocks.length&&!a.obelith().ready&&!state.activePlatform&&!state.isGrounded,'old shrine/charge remains after switch');
        step(100);tap('KeyQ');check(apexColor===4&&a.obelith().clock===100&&!a.obelith().blocks.length,'switch resets/bypasses shrine cooldown');
        tap('KeyE');check(a.obelith().clock===100,'leaving while cooling resets shrine timer');step(10);tap('KeyQ');check(a.obelith().clock===110,'re-entry resets shrine timer');
        step(489);check(!a.obelith().blocks.length,'shrine cooldown short');step();check(a.obelith().blocks.length===2,'shrine cooldown failed');
        // A cinematic cannot change ultimate kind or bank a delayed Q/E press.
        reset(8,4);step();ultCharge=100;check(dino.apex.ultStart(),'Obelith U start');const u=dino.apex.ultimate();
        tap('KeyE');check(apexColor===4&&u.kind===4&&!dino.apex.events.some(e=>e.code==='KeyE'&&e.down),'ultimate queues a variant switch');
        // Magma's timed buff may carry through a swap, but switching never refreshes it.
        reset(8,1);step();ultCharge=100;check(dino.apex.ultStart(),'Magma U start');step(80);
        const remain=dino.apex.magmaRemaining();tap('KeyE');check(apexColor===2&&dino.apex.magmaRemaining()===remain,'Magma timer reset by switch');
        step();check(dino.apex.magmaRemaining()===remain-1,'Magma timer frozen after switching');
        check(!_loiKhung.size,'caught frame errors');
        return {relay:relays,roundTrip:'all six weapons, continues dealing damage, finite lifetime',Apex:'Q/E, wrap/save, same rig/resources, shrine lifecycle, finite ultimate'};
    }'''))
    assert not errors,errors
    browser.close()
