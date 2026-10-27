"""Atlantis Thalassa: both arenas, attack upgrades, visuals and restart lifecycle.

Requires Python Playwright, Chromium and a server at DINO_TEST_URL (port 8000 by default).
"""
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
        window.thSetup=function(phase=1){
            for(const k of Object.keys(keys))delete keys[k];
            xDatForm(0);startGame('normal');paused=true;setupBeachArena();
            const b=new ThalassaBoss(1);b.x=740;b.y=b.baseY;b.state='nghi';b.invulnAll=false;b.actionTimer=99999;
            bosses.push(b);dino.x=480;dino.y=320-dino.h;dino.grounded=true;dino.invincible=true;dino.invTimer=99999;
            if(phase===2){b.phase=2;bbNhanChim();b.y=OCEAN_SURF+130;dino.y=OCEAN_FLOOR-dino.h;}
            return b;
        };
        window.thStep=function(b,n=1){for(let i=0;i<n;i++){frames++;b.update();b.draw();}};
        window.thAttack=function(id,phase=1){
            const b=thSetup(phase),spawn={};
            for(const key of ['gai','cotN','giao','chanS','songT','song','luon','rong']){
                spawn[key]=[];const push=b[key].push;
                b[key].push=function(...items){spawn[key].push(...items.map(o=>({...o})));return push.apply(this,items);};
            }
            b.batDau(id);let elapsed=0;
            while(b.state===id&&elapsed<600){thStep(b);elapsed++;}
            if(b.state===id)throw Error('attack stuck '+phase+'.'+id);
            // Finish existing hazards without allowing the AI to start another attack.
            for(let i=0;i<320;i++){frames++;b.tickVat();b.draw();}
            if([b.x,b.y,b.vx,b.vy,b.goc].some(x=>!Number.isFinite(x)))throw Error('invalid physics '+phase+'.'+id);
            return {b,spawn,elapsed};
        };
        for(const phase of [1,2]){
            const attacks=phase===1?['combo','thuong','phun','cot','loc','giang','chan','songthan']:Object.keys(CL_CD).filter(k=>k!=='loc');
            for(const id of attacks){
                const {b,spawn}=thAttack(id,phase);
                if(id==='giang'){
                    check(spawn.giao.length===(phase===2?5:3),'wrong spear count '+phase);
                    check(spawn.giao.every(g=>!!g.cuongHoa===(phase===2)),'wrong spear enhancement');
                    const gap=phase===2?22:CL_GIAO_CACH;
                    check(spawn.giao.every((g,i,a)=>!i||g.ban-a[i-1].ban===gap),'wrong spear spacing');
                    if(phase===2)check(spawn.gai.length===10&&spawn.cotN.length===5,'enhanced spears missing side bolts/impact columns');
                    check(!b.giao.length&&!b.xoa&&!b.tayKhong(),'trident never returns');
                }
                if(id==='phun')check(spawn.gai.length===(phase===2?16:5),'wrong fan volleys '+phase);
                if(id==='cot')check(spawn.cotN.length===(phase===2?5:3),'wrong water column count '+phase);
                if(id==='chan'){
                    check(spawn.chanS.length===2&&spawn.chanS.every(c=>c.day===(phase===2?OCEAN_FLOOR:320)),'quake on wrong floor');
                    if(phase===2)check(spawn.cotN.length>0,'underwater quake missing columns');
                }
                if(id==='songthan')check(spawn.songT.length===(phase===2?2:1)&&spawn.songT.every(w=>w.day===(phase===2?OCEAN_FLOOR:320)),'tsunami count/depth');
                if(id==='thuong'&&phase===2)check(spawn.gai.filter(g=>g.loai==='gai').length===3,'second thrust missing bolts');
                if(id==='chem')check(spawn.song.length===4,'third crescent missing double wave');
                if(id==='long')check(spawn.rong.length===2,'dragon did not cross twice');
            }
        }
        return 'PASS all 8 shore and 12 underwater attacks, 3/5 spears, impact columns, 7+9 fan, quake, tsunami and hazard expiry';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        let b=thSetup();b.state='vao';b.y=-120;b.invulnAll=true;thStep(b,100);
        check(b.state==='nghi'&&!b.invulnAll&&b.y===b.baseY,'entrance stuck');
        b.hp=b.maxHp/2;thStep(b);
        check(b.phase===2&&b.state==='ngap'&&b.invulnAll,'50% transition missing');
        for(let i=0;i<400&&b.state==='ngap';i++)thStep(b);
        check(b.nuoc()&&mapTheme==='ocean'&&!b.invulnAll&&b.state==='nghi','flood transition stuck');
        check(platforms[0].top===OCEAN_FLOOR&&oceanPads.length===2&&Math.abs(bbNuoc-OCEAN_SURF)<=.5,'wrong underwater arena');
        check(b.name.includes('ATLANTIS'),'new identity not applied');b.veNguoi();bbVeNgap();
        b.batDau('trieu');thStep(b,40);check(b.minionTargets().length>0,'summoned eels not targetable');
        const proxy=b.minionTargets()[0],eel=b.luon[0];dealDamage(proxy,3,'flat');
        check(eel.hp<=0,'eels cannot be destroyed');
        b=thSetup(2);const hp=dino.hp;b.hurtP();b.hurtP();check(dino.hp===hp,'iframe damage bypass');
        const shield=dino.isShielding;dino.isShielding=()=>true;dino.invincible=false;frames++;b.hurtP();
        check(dino.hp===hp,'shield bypass');dino.isShielding=shield;
        // Both actual water hazards collide at the underwater floor, not at beach height.
        b=thSetup(2);let hits=0;b.hurtP=()=>{hits++;};
        b.chanS=[{x:dino.x+dino.w/2,v:0,t:0,hit:0,day:OCEAN_FLOOR,cuongHoa:true}];frames++;b.tickVat();check(hits===1,'underwater quake never hits floor');
        b.chanS=[];dino.y=250;b.songT=[{x:dino.x+dino.w/2,v:0,h:105,t:0,hit:0,day:OCEAN_FLOOR}];frames++;b.tickVat();
        check(hits===1,'underwater tsunami hits invisible beach-height box');
        dino.y=OCEAN_FLOOR-dino.h;frames++;b.tickVat();check(hits===2,'underwater tsunami misses its visible depth');
        setupBeachArena();check(!bbNgap&&bbNuoc===400&&mapTheme==='baibien'&&oceanPads.length===0,'retry inherits flooded arena');
        check(_loiKhung.size===0,'caught frame errors');
        return 'PASS entrance, 50% flood, swimming arena, destroyable eels, guard/iframes, correct hazard depth and retry reset';
    }'''))
    print(page.evaluate('''() => {
        xDatForm(0);startGame('normal');paused=true;
        const rows=selfTest().filter(r=>r.nhom.startsWith('THALASSA'));
        if(rows.length<8||rows.some(r=>!r.dat))throw Error(JSON.stringify(rows.filter(r=>!r.dat)));
        return 'PASS '+rows.length+' built-in Thalassa checks';
    }'''))
    assert not errors,errors
    browser.close()
