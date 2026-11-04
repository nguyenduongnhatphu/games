"""Actual player attack cadence, hit events and one-command combo buffering."""
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
        function reset(form=9,arm=0){
            for(const k of Object.keys(keys))delete keys[k];
            xDatForm(form);startGame('normal');paused=false;dashVx=0;
            dino.x=240;dino.y=320-dino.h;dino.grounded=true;dino.dy=0;
            if(form===9)dino.dante.arm=arm;
        }
        function step(count){for(let i=0;i<count;i++){frames++;danteTick();}}
        const samples=[];
        const starters=[()=>dswStart('a1'),()=>blrStart('j1'),()=>cavStart('j1'),()=>kcbStart('j1'),()=>eiCommand(false,0),()=>faustCommand(false,0)];
        for(let arm=0;arm<6;arm++){
            reset(9,arm);starters[arm]();const a=dino.dante.attack,T=a.T??a.duration;
            let elapsed=0;while(dino.dante.attack===a&&elapsed<200){step(1);elapsed++;}
            check(elapsed>=T/0.8-1&&elapsed<=Math.ceil(T/0.8)+2,'Dante cadence '+[arm,T,elapsed]);
            samples.push([arm,T,elapsed]);
        }
        // Each press banks at most one successor; the latest direction/key wins.
        for(let arm=0;arm<4;arm++){
            reset(9,arm);const commands=[dswCommand,blrCommand,cavCommand,kcbCommand];
            commands[arm]({key:'J'});
            for(let i=0;i<8;i++)commands[arm]({key:'J'});
            commands[arm]({key:'K',down:false});
            const state=[dino.dante.sword,dino.dante.balrog,dino.dante.cavaliere,dino.dante.cerberus][arm];
            check(state.queue.length===1&&state.queue[0].key==='K','Dante buffered runaway '+arm);
            danteSwapWeapon(1);check(!state.queue.length&&!dino.dante.attack,'swap failed during slow combo');
        }
        reset(10);let v=dino.vergil;ymtCommand({key:'J'});
        for(let i=0;i<10;i++)ymtCommand({key:'J'});
        check(v.queue.length===1,'Vergil buffered runaway');
        const first=v.attack;step(15);check(v.attack===first,'Vergil still chains in 0.25s');
        step(10);check(v.attack?.id==='a2','Vergil buffered successor lost');
        step(100);check(!v.attack&&!v.queue.length,'Vergil keeps attacking after one buffered successor');
        // A held pose must never replay damage events on the extra display frames.
        for(const [id,want] of [['rapid',5],['m_combo3',2],['c_flurry',9]]){
            reset(10);v=dino.vergil;const strikes=[],base=ymtStrike;
            ymtStrike=function(n,v,a,pulse){strikes.push(pulse);return base(n,v,a,pulse);};
            try{ymtStart(id);const a=v.attack;let t=0;while(v.attack===a&&t++<200)step(1);}
            finally{ymtStrike=base;}
            check(strikes.length===want&&new Set(strikes).size===want,'replayed/skipped Yamato hit '+[id,strikes]);
        }
        reset(9,4);let shots=0;const shoot=eiShoot;
        eiShoot=function(...args){shots++;return shoot(...args);};
        try{keys.KeyS=true;eiCommand(true,0);keys.KeyS=false;step(70);}finally{eiShoot=shoot;}
        check(shots===9,'replayed/skipped E&I volley '+shots);
        // Air movement and already fired rounds still advance on every world frame.
        reset(9,4);eiCommand(false,0);step(1);const round=dino.dante.rounds[0],x=round.x,age=round.age;
        step(8);check(round.age===age+8&&Math.abs(round.x-x-round.vx*8)<1e-6,'projectile slowed with attack');
        reset(10);danteKey('KeyJ',false);step(18);keys.KeyJ=false;step(1);
        check(dino.vergil.attack?.id==='a1','short J hold accidentally becomes Judgement Cut');
        reset(10);danteKey('KeyJ',false);step(28);keys.KeyJ=false;step(1);
        check(dino.vergil.attack?.id==='pjcut','wider perfect release lost');
        // Player pacing never mutates move tables shared by boss controllers.
        check(DSW_MOVES.a1.T===20&&YMT_MOVES.a1.T===18&&YMT_MOVES.a1.hits[0]===4,'boss move data changed');
        check(!_loiKhung.size,'caught game errors');
        return {Dante:samples,Vergil:'one successor, readable recovery, all multihits and deliberate charge release',projectiles:'full speed'};
    }'''))
    assert not errors, errors
    browser.close()
