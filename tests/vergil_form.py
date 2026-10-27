"""Vergil integration: menu/save, actual inputs, combat, SDT and beam clashes.

Run with a repository HTTP server available at DINO_TEST_URL (default port 8000).
Requires Python Playwright and Chromium.
"""
import os
from playwright.sync_api import sync_playwright

URL = os.environ.get('DINO_TEST_URL', 'http://127.0.0.1:8000') + '/games/Dino/index.html'

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1100, 'height': 800})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    # Advance the real game explicitly so timing windows are deterministic.
    page.add_init_script('window.requestAnimationFrame=()=>0;')
    page.goto(URL)
    print(page.evaluate('''() => {
        function check(ok, why) { if (!ok) throw Error(why); }
        window.vgTestKey = function(code, down=true) {
            window.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup', {code, bubbles:true}));
        };
        window.vgTestTap = function(code) { vgTestKey(code);vgTestKey(code,false); };
        window.vgTestStep = function(count) {
            for(let i=0;i<count;i++){frames++;dino.update();danteTick();}
        };
        window.vgTestReset = function() {
            for(const k of Object.keys(keys))delete keys[k];
            xDatForm(VG_FORM_IDX);startGame('normal');paused=false;
            spawnTimerCactus=spawnTimerEnemy=999999;nextBossScore=9999999;
            dino.x=240;dino.y=320-VG_H;dino.grounded=true;dino.dy=0;dashVx=0;
            dino.invincible=false;dino.invTimer=0;
            return dino.vergil;
        };
        window.vgTestTarget = function(x=300,y=262,w=38,h=58) {
            const o={x,y,w,h,hp:10000,maxHp:10000,dy:0,grounded:true,
                update(){},draw(){},takeDamage(d){this.hp-=d;}};
            enemies.push(o);return o;
        };
        for(let i=0;i<11;i++){
            xDatForm(i);gameState='custom_menu';drawCustomMenu();
            check(xFormIdx()===i,'wrong Form index '+i);
        }
        check(formSamples.has(10),'no Vergil preview');
        xDatForm(11);check(xFormIdx()===0,'next arrow does not wrap');
        xDatForm(-1);check(xFormIdx()===10,'previous arrow does not wrap');
        const labels=[],fill=ctx.fillText;
        ctx.fillText=function(t,...args){labels.push(t);return fill.call(this,t,...args);};
        drawCustomMenu();ctx.fillText=fill;
        check(labels.includes('VERGIL')&&labels.some(t=>t.includes('YAMATO & MIRAGE')),'Vergil menu missing');
        vgTestTap('KeyV');check(xFormIdx()===9,'V does not leave Vergil');
        vgTestTap('KeyV');check(xFormIdx()===10,'V does not select Vergil');
        xDatForm(0);currentPower=1;currentAmmoType=3;phuKien=1;combatStance=2;
        xDatForm(10);xDongBo();check(!currentPower&&!currentAmmoType&&!phuKien&&!combatStance,'equipment not locked');
        runeSlots=['triplejump',null];check(!hasRune('triplejump'),'Vergil inherited Rune');
        xDatForm(0);check(currentPower===1&&currentAmmoType===3&&phuKien===1&&combatStance===2,'loadout not restored');
        for(const mode of ['normal','boss_rush','test_boss']){
            xDatForm(10);startGame(mode);
            check(vergilActive(dino)&&dino.vergil&&dino.maxHp===10&&dino.h===VG_H&&dino.y+dino.h===320,'bad spawn '+mode);
        }
        vgTestReset();vgTestKey('KeyS');vgTestStep(3);check(dino.h===38&&dino.y+dino.h===320,'crouch dimensions');
        vgTestKey('KeyS',false);vgTestStep(3);check(dino.h===VG_H&&dino.y+dino.h===320,'standing dimensions');
        return 'PASS 11 Form menus, preview, V shortcut, wrap, equipment/runes and spawn modes';
    }'''))
    # A saved Vergil must also win over stale X/Dante flags, before Customize opens.
    page.evaluate("localStorage.setItem('dino_vergil_form','1');localStorage.setItem('dino_x_form','1');localStorage.setItem('dino_dante_form','1');")
    page.reload()
    assert page.evaluate("()=>{startGame('normal');return vergilOn()&&!danteOn()&&!xForm&&xFormIdx()===10&&!!dino.vergil&&dino.h===VG_H;}")
    # Reinstall helpers after navigation; they use only public input/combat functions.
    page.evaluate('''() => {
        window.vgTestKey=(code,down=true)=>window.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{code,bubbles:true}));
        window.vgTestTap=code=>{vgTestKey(code);vgTestKey(code,false);};
        window.vgTestStep=count=>{for(let i=0;i<count;i++){frames++;dino.update();danteTick();}};
        window.vgTestReset=()=>{
            for(const k of Object.keys(keys))delete keys[k];
            xDatForm(10);startGame('normal');paused=false;
            spawnTimerCactus=spawnTimerEnemy=999999;nextBossScore=9999999;
            dino.x=240;dino.y=262;dino.grounded=true;dino.dy=0;dashVx=0;dino.invincible=false;dino.invTimer=0;
            return dino.vergil;
        };
        window.vgTestTarget=(x=300,y=262,w=38,h=58)=>{
            const o={x,y,w,h,hp:10000,maxHp:10000,dy:0,grounded:true,update(){},draw(){},takeDamage(d){this.hp-=d;}};
            enemies.push(o);return o;
        };
    }''')
    print(page.evaluate('''() => {
        function check(ok, why){if(!ok)throw Error(why);}
        let v=vgTestReset(),target=vgTestTarget();
        const combo=[];
        for(const id of ['a1','a2','a3','a4']){
            vgTestTap('KeyJ');check(v.attack?.id===id,'Combo A '+id);combo.push(id);
            vgTestStep(YMT_MOVES[id].T);
        }
        check(target.hp<10000&&projectiles.length===0,'no Yamato damage / default Dino bullet leaked');
        v=vgTestReset();vgTestTap('KeyJ');vgTestStep(18);vgTestTap('KeyJ');vgTestStep(30);vgTestTap('KeyJ');
        check(v.attack?.id==='c_flurry','delayed Combo C');vgTestStep(42);vgTestTap('KeyJ');check(v.attack?.id==='c_finish','Combo C finish');
        for(const air of [false,true]){
            v=vgTestReset();dino.grounded=!air;if(air)dino.y=150;
            vgTestKey('KeyS');vgTestTap('KeyJ');vgTestKey('KeyS',false);
            check(v.attack?.id===(air?'air1':'upper1'),'crouch / aerial input');
            vgTestStep(10);vgTestTap('KeyJ');
            if(!air)check(v.attack?.id==='upper2'&&!dino.grounded,'Upper Slash follow-up');
        }
        v=vgTestReset();vgTestTarget(470);vgTestKey('KeyJ');vgTestStep(19);vgTestKey('KeyJ',false);vgTestStep(1);
        check(v.attack?.id==='pjcut'&&v.cuts.length,'perfect release');vgTestStep(12);
        check(enemies[0].hp<10000,'Judgement Cut missed ranged target');
        v=vgTestReset();vgTestKey('KeyJ');vgTestStep(34);vgTestKey('KeyJ',false);vgTestStep(1);
        check(v.attack?.id==='jcut','ordinary charged release');
        v=vgTestReset();vgTestKey('KeyK');check(v.attack?.id==='rapid','K Rapid Slash');vgTestStep(18);
        check(v.attack?.id==='rstar'&&!dino.grounded,'hold K Rising Star');vgTestKey('KeyK',false);
        v=vgTestReset();vgTestKey('KeyS');vgTestTap('KeyK');vgTestKey('KeyS',false);
        check(v.attack?.id==='vslash','Void Slash input');vgTestStep(10);check(v.voidZones.length,'Void zone not created');
        v=vgTestReset();dino.grounded=false;dino.y=150;vgTestTap('KeyK');check(v.attack?.id==='helm','air K Helm Breaker');
        vgTestStep(35);check(dino.grounded&&!v.attack,'Helm Breaker never lands');
        // Each independent sword formation must hit without replacing the active Yamato move.
        for(let mode=0;mode<4;mode++){
            v=vgTestReset();v.conc=300;target=vgTestTarget(mode===1?295:450);
            for(let i=0;i<mode;i++)vgTestTap('KeyE');
            check(v.mirageMode===mode,'formation cycle');vgTestTap('KeyJ');const attack=v.attack;
            vgTestTap('KeyI');check(v.attack===attack&&v.swords.length,'Mirage interrupted Yamato '+mode);
            vgTestStep(65);check(target.hp<10000,'Mirage formation missed '+mode);
        }
        v=vgTestReset();target=vgTestTarget(520);vgTestTap('KeyI');vgTestStep(18);
        check(v.markedTarget===target,'Shooting Blade mark');vgTestTap('ShiftLeft');
        check(Math.abs(dino.x-target.x)<140&&v.ghosts.length&&dino.invincible,'Grim Trick');
        vgTestKey('KeyS');vgTestTap('ShiftLeft');vgTestKey('KeyS',false);check(v.ghosts.length,'Trick Down');
        vgTestKey('KeyW');vgTestTap('ShiftLeft');vgTestKey('KeyW',false);check(dino.y<target.y&&!dino.grounded,'Trick Up');
        v=vgTestReset();vgTestTap('KeyL');const hp=dino.hp,conc=v.conc;
        dino.takeDamage(1);check(dino.hp===hp&&v.conc>conc&&v.guardReady===frames,'Perfect Guard');
        vgTestStep(35);dino.invincible=true;dino.invTimer=10;vgTestTap('KeyJ');const before=v.conc;
        dino.takeDamage(1);check(v.conc===before&&v.attack,'iframe cancelled combo');
        dino.invincible=false;dino.invTimer=0;dino.takeDamage(1);
        check(dino.hp<hp&&v.conc<before&&!v.attack,'damage did not cancel combo / lower Concentration');
        return 'PASS Yamato combos, charge/release, K branches, 4 Mirage formations, Trick and guard/damage';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        let v=vgTestReset(),target=vgTestTarget();
        vgTestTap('KeyO');check(v.mirageStance>0&&!v.swords.length,'O still fires ranged swords');
        for(const id of ['m_combo1','m_combo2','m_combo3']){
            vgTestTap('KeyJ');check(v.attack?.id===id,'O J combo '+id);
            dino.draw();vgTestStep(YMT_MOVES[id].T);
        }
        check(target.hp<10000&&!target._dswControl,'Mirage combo damage / unwanted stun');
        v=vgTestReset();target=vgTestTarget(470);vgTestTap('KeyO');vgTestTap('KeyK');
        check(v.attack?.id==='m_stinger','O K Deep Stinger');vgTestStep(6);dino.draw();
        check(target.hp<10000&&target._dswControl,'Deep Stinger hit/control');
        v=vgTestReset();target=vgTestTarget(460);vgTestTap('KeyO');vgTestKey('KeyS');vgTestTap('KeyK');vgTestKey('KeyS',false);
        check(v.attack?.id==='m_round'&&v.roundSword,'O Down K Round Trip');vgTestStep(60);dino.draw();
        check(target.hp<10000&&!target._dswControl,'Round Trip damage / unwanted stun');
        vgTestStep(80);check(!v.roundSword,'Round Trip never expires');
        v=vgTestReset();target=vgTestTarget();vgTestTap('KeyO');vgTestKey('KeyS');vgTestTap('KeyJ');vgTestKey('KeyS',false);
        check(v.attack?.id==='m_high'&&!dino.grounded,'O Down J launcher');vgTestStep(7);
        check(target.hp<10000&&target._dswControl,'Mirage launcher missed');
        v=vgTestReset();vgTestTap('KeyJ');const attack=v.attack;
        vgTestTap('KeyO');check(v.attack===attack&&v.mirageStance>0,'O interrupts current Yamato attack');
        vgTestTap('KeyI');check(v.attack===attack&&v.swords.length,'I not independent of O/melee');
        vgTestTap('KeyO');check(!v.mirageStance,'O does not toggle off');
        v=vgTestReset();vgTestTap('KeyO');vgTestStep(360);check(!v.mirageStance,'Mirage stance never expires');
        // Ordinary sword strings and ranged cuts cause damage without adding a CC wrapper.
        for(const id of ['a1','a2','a3','a4','c_flurry','c_finish','rapid','m_combo1','m_combo2','m_combo3','m_round']){
            v=vgTestReset();target=vgTestTarget();ymtStart(id);ymtStrike(dino,v,v.attack,0);
            check(target.hp<10000&&!target._dswControl&&!vgTargetCcMap.has(target),'ordinary move controls target '+id);
        }
        for(const id of ['jcut','pjcut']){
            v=vgTestReset();target=vgTestTarget(460);ymtStart(id);vgTestStep(18);
            check(target.hp<10000&&!target._dswControl,'Judgement Cut still stuns '+id);
        }
        // Both Upper Slash stages and Mirage's launcher share one two-second lockout.
        v=vgTestReset();target=vgTestTarget();ymtStart('upper1');ymtStrike(dino,v,v.attack,0);
        check(target._dswControl,'first Upper Slash rejected');const first=frames,record=vgTargetCcMap.get(target);
        check(record.keys.upper===first+120,'wrong same-move cooldown');target._dswControl.release();
        function strike(id){dino.x=240;dino.y=262;dino.grounded=true;target.x=300;target.y=262;target.grounded=true;ymtStart(id);ymtStrike(dino,v,v.attack,0);}
        frames=first+43;const hp=target.hp;strike('upper2');
        check(target.hp<hp&&!target._dswControl,'Upper Slash repeat bypassed lockout / lost damage');
        frames=first+119;strike('m_high');check(!target._dswControl,'Mirage launcher bypassed shared group');
        frames=first+120;strike('upper1');check(target._dswControl,'CC did not recover after two seconds');
        // Different CC groups still need the short global recovery interval.
        v=vgTestReset();target=vgTestTarget();
        check(vgCanApplyCC(target,'upper')&&!vgCanApplyCC(target,'rain'),'CC groups ignore shared recovery');
        frames+=42;check(vgCanApplyCC(target,'rain')&&!vgCanApplyCC(target,'rain'),'Heavy Rain repeats within lockout');
        return 'PASS separate I/O inputs, Mirage combos/launcher/drill/Round Trip, no ordinary stun and two-second CC lockouts';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        let v=vgTestReset(),target=vgTestTarget();ultCharge=100;vgTestTap('KeyU');
        const damage=[],base=vgDealDamage;
        vgDealDamage=function(...args){const dealt=base(...args);damage.push([args[3],dealt]);return dealt;};
        try{vgTestTap('KeyJ');vgTestStep(31);}finally{vgDealDamage=base;}
        check(damage.some(([tag,d])=>tag==='doppelganger'&&d>0),'separated Doppelganger never hits');
        check(v.dop.x>target.x+target.w/2&&v.dop.facingLeft,'Doppelganger does not flank');
        v=vgTestReset();dino.x=1600;dino.y=110;dino.grounded=false;dino.dy=-4;camX=1250;
        target=vgTestTarget(1740);ultCharge=100;vgTestTap('KeyU');vgTestTap('KeyU');
        check(v.jce.floorY===320&&v.jce.homeY===320-dino.h&&dino.y+dino.h===320&&dino.grounded,'airborne JCE did not land');
        vgTestStep(24);check(v.jce.slashes.length,'JCE produced no slashes');
        for(const slash of v.jce.slashes){
            check(Math.abs((slash.x1+slash.x2)/2-target.x-target.w/2)<=45,'JCE misses target horizontally');
            check(Math.abs((slash.y1+slash.y2)/2-target.y-target.h/2)<=22.5,'JCE slashes still above target');
        }
        const covers=[],fill=ctx.fillRect;
        ctx.fillRect=function(x,y,w,h){if(w===canvas.width)covers.push([x,y,this.fillStyle]);return fill.call(this,x,y,w,h);};
        try{dino.draw();}finally{ctx.fillRect=fill;}
        check(covers.some(([x,y,color])=>x===camX&&y===camY-20&&color.includes('0.14')),'JCE overlay too opaque / detached from camera');
        enemies.length=0;vgTestStep(3);const last=v.jce.slashes.at(-1),cx=(last.x1+last.x2)/2;
        check(cx>=camX+100&&cx<=camX+canvas.width-100,'empty JCE fallback ignores camera');
        return 'PASS separated/flanking Doppelganger damage, grounded JCE, target-centered cuts and transparent camera overlay';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        let v=vgTestReset(),target=vgTestTarget();ultCharge=100;vgTestTap('KeyU');
        check(v.sdt===VG_SDT_MAX&&v.dop&&ultCharge===0&&dojoUltBusy(dino),'SDT/Doppelganger entry');
        check(Math.abs(v.dop.x-dino.x)>=78&&v.dop.y<dino.y,'Doppelganger still overlaps player');
        vgTestTap('KeyJ');vgTestStep(17);check(v.dop.attack&&target.hp<10000,'Doppelganger did not follow');
        dino.draw();drawUI();vgTestTap('KeyU');check(v.jce,'JCE input');const hp=target.hp;
        vgTestStep(88);check(target.hp<hp&&v.sheatheSpark,'JCE finish');dino.draw();
        vgTestStep(25);check(!v.jce,'JCE stuck');
        v=vgTestReset();ultCharge=100;vgTestTap('KeyU');v.sdt=120;vgTestTap('KeyU');
        vgTestStep(113);check(!v.sdt&&!v.dop&&!v.dopHist.length,'JCE left a permanent Doppelganger');
        v=vgTestReset();ultCharge=100;vgTestTap('KeyU');vgTestStep(VG_SDT_MAX);
        check(!v.sdt&&!v.dop&&!dojoUltBusy(dino),'SDT/Doppelganger expiry');
        // Shared juggle physics must keep this controller alive, then release it normally.
        v=vgTestReset();target=vgTestTarget();const old=target.update;
        const control=vgControl(target,{launch:true});check(control&&target.update!==old,'missing Vergil juggle');
        for(let i=0;i<180&&target._dswControl;i++){frames++;target.update();}
        check(target.update===old&&target.grounded&&!target._dswControl,'Vergil juggle did not land/release');
        const boss=new TRexBoss(1);boss.x=300;boss.y=320-boss.h;boss.state='charge';bosses.push(boss);
        check(!vgControl(boss,{launch:true}),'Vergil ignored boss resistance during attack');
        boss.state='idle';const opening=vgControl(boss,{launch:true});check(opening,'boss opening rejected');
        const window=danteBossWindows.get(boss);frames=window.until;boss.update();
        check(!boss._dswControl&&!vgControl(boss,{launch:true}),'Vergil permanently controlled boss');
        check(!vgCanApplyCC(boss,'upper'),'CC lockout ignored boss resistance');
        // Virtual clash contacts accept Vergil damage without granting resources or Trick marks.
        for(const kind of ['godzilla','fire']){
            v=vgTestReset();const b=kind==='godzilla'?new GodzillaBoss(1):new FireCloneBoss(1);
            b.x=800;b.hp=b.maxHp=1000;b.y=320-b.h;b.state=kind==='godzilla'?'clash_go':'beam_clash';
            b.clashX=430;b.clashY=288;b.clashDist=300;b.clashSpeed=.01;b.clashHits=0;b.subStateTimer=300;
            b.beamClashX=430;b.beamMouthX=810;b.beamMouthY=288;b.beamDir=-1;b.subTimer=0;bosses.push(b);doChieuBatDau(b);
            const point=beamClashRecord(b).target,before=v.conc;ultCharge=0;
            check(vgDealDamage(v,point,3)>0&&v.conc===before&&ultCharge===0,'clash resource farming');
            check(vgFindTarget(dino,1,680,true)!==point,'Trick aimed at beam');
            for(let i=0;i<5&&beamClashActive(b);i++){frames++;vgDealDamage(v,point,3);b.update();}
            check(!beamClashActive(b),'Vergil ignored by '+kind+' clash');
        }
        xDatForm(10);startGame('pvp');check(!vergilOn()&&!vergilForm&&!dino.vergil,'Vergil leaked into PvP');
        xDatForm(9);startGame('normal');vgTestTap('KeyJ');check(danteOn()&&!vergilOn()&&dino.dante.attack,'Dante broken after Vergil');
        check(_loiKhung.size===0,'caught frame errors');
        return 'PASS SDT, Doppelganger, JCE, expiry, both boss clashes, PvP and return to Dante';
    }'''))
    assert not errors, errors
    browser.close()
