"""Real attacks must reach both boss beam clashes, without fake HP or duplicate hits."""
import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);pg=b.new_page();errors=[];pg.on('pageerror',lambda e:errors.append(str(e)));pg.goto(os.environ.get('DINO_TEST_URL','http://127.0.0.1:8000')+'/games/Dino/index.html');pg.wait_for_timeout(250)
 print(pg.evaluate('''()=>{
 const results=[];
 function key(code,down){window.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{code,key:code==='KeyJ'?'j':'k',bubbles:true}));}
 for(const kind of ['godzilla','fire'])for(const mode of ['arms','forms','ammo']){
  const list=mode==='arms'?[0,1,2,3,4,5]:mode==='forms'?[0,1,2,3,4,5,6,7,8,9]:Array.from({length:21},(_,i)=>i);
  for(const value of list){
   for(const k of Object.keys(keys))delete keys[k];xDatForm(mode==='arms'?9:mode==='forms'?value:0);
   if(mode==='ammo')currentAmmoType=value;
   runeSlots=[null,null];startGame('normal');paused=false;spawnTimerCactus=spawnTimerEnemy=99999;nextBossScore=99999999;
   dino.x=250;dino.y=320-dino.h;dino.grounded=true;dino.invincible=true;dino.invTimer=99999;
   if(mode==='arms')dino.dante.arm=value;
   if(mode==='ammo'&&value===17){key('KeyK',true);for(let i=0;i<200;i++)loop();key('KeyK',false);}
   const boss=kind==='godzilla'?new GodzillaBoss(1):new FireCloneBoss(1);boss.hp=boss.maxHp=10000;boss.x=800;boss.y=320-boss.h;boss.grounded=true;boss.actionTimer=9999;boss.state=kind==='godzilla'?'clash_go':'beam_clash';
   boss.clashX=430;boss.clashY=288;boss.clashDist=200;boss.clashSpeed=.01;boss.clashHits=0;boss.subStateTimer=300;
   boss.beamClashX=430;boss.beamMouthX=810;boss.beamMouthY=288;boss.beamDir=-1;boss.subTimer=0;
   bosses.push(boss);doChieuBatDau(boss);
   let won=false;const win=boss.clashWin;
   if(win)boss.clashWin=function(...args){won=true;return win.apply(this,args);};
   if(mode==='ammo'&&value===12){key('KeyK',true);for(let i=0;i<65;i++)loop();key('KeyK',false);}
   let count=0,pushes=0;
   for(;count<210&&!won&&boss.state!=='clash_lose';count++){
    const point=beamClashRecord(boss).target;
    // Walk up to the contact for melee weapons; the attack still uses its real hitbox.
    if((mode==='arms'&&value<4)||(mode==='forms'&&value===8)||(mode==='ammo'&&[5,10,11,12,13,15,18,19].includes(value))){dino.x=Math.min(650,point.x-dino.w-8);}
    dino.y=320-dino.h;dino.grounded=true;dino.isFacingLeft=false;
    if(count%24===0)key('KeyJ',true);
    const beforeX=boss.beamClashX;loop();if(kind==='fire'&&boss.beamClashX>beforeX+3)pushes++;
    if(count%24===1)key('KeyJ',false);
    if(kind==='fire'&&boss.state==='idle'&&boss.beamClashX>=boss.beamMouthX)won=true;
   }
   key('KeyJ',false);key('KeyK',false);
   if(mode==='ammo'&&kind==='fire'){
    if(!won&&!pushes)throw Error('ammo ignored by Fire Clone '+value);
   }else if(!won)throw Error('cannot win clash '+[kind,mode,value,boss.state]);
   results.push([kind,mode,value,won||pushes>0]);
  }
 }

 // Protocol invariants: stable geometry, no duplicated pressure, no HP/energy farming.
 for(const k of Object.keys(keys))delete keys[k];xDatForm(9);startGame('normal');paused=false;
 function clash(kind='godzilla',x=500){
  const b=kind==='godzilla'?new GodzillaBoss(1):new FireCloneBoss(1);b.hp=b.maxHp=1000;b.x=800;b.y=320-b.h;
  b.state=kind==='godzilla'?'clash_go':'beam_clash';b.clashX=x;b.clashY=288;b.clashSpeed=1;b.clashDist=300;b.clashHits=0;b.subStateTimer=300;
  b.beamClashX=x;b.beamMouthX=810;b.beamMouthY=288;b.beamDir=-1;b.subTimer=0;bosses.push(b);doChieuBatDau(b);return b;
 }
 const g=clash(),point=beamClashRecord(g).target,hp=g.hp;ultCharge=100;dino.dante.sinCharge=12;
 installFirstStrikeHook(point);if(point._firstStrikeHooked||dealDamage(point,99,'ammo',{owner:2}))throw Error('point accepted enemy damage or HP rune');
 if(allTargets()[0]!==point||sgTargets(dino)[0]!==point)throw Error('clash not first target');
 const source={};doChieuThu(source,point,2);if(doChieuThu(source,point,2))throw Error('object hit twice');
 danteHit(dino.dante,point,2);point.hp-=2;
 if(JSON.stringify(doChieuLay(g))!=='[2]'||g.hp!==hp||point.hp!==1||ultCharge!==100||dino.dante.sinCharge!==12)throw Error('duplicate pressure / false HP credit');
 frames++;if(!doChieuThu('continuous-test',point,1,12))throw Error('continuous clash missing');frames+=11;
 if(doChieuThu('continuous-test',point,1,12))throw Error('continuous clash ignored cooldown');frames++;
 if(!doChieuThu('continuous-test',point,1,12)||doChieuLay(g).length!==2)throw Error('continuous clash never recovered');
 frames++;if(doChieuThu({}, {x:0,y:0,w:3,h:3},99))throw Error('off-target counted');
 const px=point.x,py=point.y;point.x+=200;point.y-=200;point.dead=true;point.invulnAll=true;
 dswControl(point,{launch:true});apexControl(point,40);apexLaunch(point);
 if(point.x!==px||point.y!==py||point.dead||point.invulnAll||point._dswControl||point._apexControl||point._apexLift||danteTeleport(point,true))throw Error('point moved / disabled / became a teleport target');
 // Native Inferno/Claws already count their own impulse; proxy reports cannot double it.
 frames++;doChieuThu({},point,5);doChieuNative(g);if(doChieuLay(g).length)throw Error('legacy duplicate pressure');
 // Multiple bosses never read one another's impulses.
 const f=clash('fire',250);frames++;dealDamage(point,4,'ammo');
 if(doChieuLay(f).length||JSON.stringify(doChieuLay(g))!=='[4]')throw Error('cross-boss pressure leak');
 frames++;sgDamage(dino,beamClashRecord(f).target,3,'dante');doChieuDong(g);
 if(JSON.stringify(doChieuLay(f))!=='[3]')throw Error('closing one clash cleared another');
 // Enemy/P2 ordinary rounds cannot contribute to the player's clash.
 const enemyRound={x:f.beamClashX-3,y:285,w:6,h:6,dmg:99,owner:2};projectiles.push(enemyRound);const before=f.beamClashX;
 frames++;f.update();if(f.beamClashX>=before||!projectiles.includes(enemyRound))throw Error('enemy projectile won clash');
 // A projectile can contribute once per encounter, then again in a later encounter.
 const again=clash(),pierce={x:again.clashX-3,y:285,w:6,h:6,dmg:1,owner:1,pierceCount:2};projectiles.length=0;projectiles.push(pierce);
 frames++;again.update();const firstHits=again.clashHits;frames++;again.update();if(again.clashHits!==firstHits)throw Error('piercing round counted repeatedly');
 doChieuBatDau(again);again.clashHits=0;pierce.x=again.clashX-3;frames++;again.update();if(again.clashHits!==1)throw Error('old piercing flag disabled new encounter');
 const old=beamClashRecord(again).target;again.state='idle';if(beamClashReceive(old,99))throw Error('inactive point accepted damage');
 again.state='clash_go';doChieuBatDau(again);if(beamClashReceive(old,99))throw Error('stale point accepted new encounter');
 const live=beamClashRecord(again).target;gameState='pvp';if(beamClashTargets().length||doChieuCo()||beamClashReceive(live,99))throw Error('clash leaked into PvP');
 startGame('normal');if(old.hp||beamClashTargets().length)throw Error('clash leaked across restart');
 // X and Dual Guns must not charge their resources by hitting a virtual point.
 xDatForm(7);startGame('normal');paused=false;xTick();xNL=10;const xb=clash(),xp=beamClashRecord(xb).target,energy=xNL;
 xChoi.cham({k:'lemon',hit:0},{x:xp.x,y:xp.y,w:xp.w,h:xp.h});if(xNL!==energy)throw Error('X farmed energy on beam');
 xDatForm(0);currentAmmoType=20;startGame('normal');const sb=clash(),sp=beamClashRecord(sb).target,s=sgState(dino),progress=JSON.stringify(s.cannon.progress);
 sgDamage(dino,sp,10,'pistol');if(JSON.stringify(s.cannon.progress)!==progress)throw Error('Dual Guns farmed cannon energy');
 // Fire Clone can also push toward a mouth on the left side of the arena.
 startGame('normal');dino.x=700;const right=clash('fire',500);right.x=80;right.beamDir=1;right.beamMouthX=100;
 for(let i=0;i<4&&right.state==='beam_clash';i++){frames++;sgDamage(dino,beamClashRecord(right).target,6,'cannon');right.update();}
 if(right.state!=='idle'||right.hp!==987)throw Error('right-facing Fire Clone clash failed');
 // SDT drill is a real volume attack, using the same clash target as swords and gunfire.
 xDatForm(9);startGame('normal');paused=false;dino.x=300;dino.y=260;dino.grounded=true;dino.dante.sinCharge=100;danteSinEnter();
 const sd=clash('godzilla',430);danteSinDrill();for(let i=0;i<28&&sd.state==='clash_go';i++){frames++;danteTick();sd.update();}
 if(sd.state!=='idle'||sd.hp!==980||dino.dante.sinCharge!==0)throw Error('SDT drill ignored clash');
 startGame('normal');dino.x=300;dino.y=260;dino.grounded=true;dino.dante.sinCharge=100;danteSinEnter();
 const rays=clash('godzilla',430);danteSinFire();
 for(let i=0;i<150&&rays.state==='clash_go';i++){frames++;danteTick();rays.update();}
 if(rays.state!=='idle'||rays.hp!==980||dino.dante.sinShotCount!==10)throw Error('SDT energy ignored clash');
 return 'PASS 6 Dante arms, 10 forms, 21 ammo types on both bosses; real key input, resource exclusion, overlap/dedup, independent encounters, piercing lifecycle, SDT and PvP';
 }'''))
 assert not errors,errors;b.close()
