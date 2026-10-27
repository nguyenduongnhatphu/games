"""Boss Dante's bounded, telegraphed melee strings and native AI integration."""
import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);pg=b.new_page(viewport={'width':1100,'height':800});errors=[];pg.on('pageerror',lambda e:errors.append(str(e)))
 pg.goto(os.environ.get('DINO_TEST_URL','http://127.0.0.1:8000')+'/games/Dino/index.html');pg.wait_for_timeout(300)
 print(pg.evaluate('''()=>{
 function setup(id,trick=false){for(const k of Object.keys(keys))delete keys[k];xDatForm(0);startGame('normal');paused=false;dino.x=300;dino.y=260;dino.grounded=true;dino.invincible=true;dino.invTimer=99999;const boss=new DanteBoss(1);boss.x=410;boss.y=260;boss.hp=boss.maxHp=500;boss.phase=1;boss.state='idle';boss.grounded=true;boss.switchT=99999;bosses.push(boss);if(!boss.startCloseCombo(id,trick))throw Error('could not start '+id);return boss;}
 for(const id of Object.keys(DANTE_BOSS_MELEE)){
  const boss=setup(id),pattern=DANTE_BOSS_MELEE[id],events=[],base=boss.doSlash;
  boss.doSlash=function(...args){events.push({frame:frames,warning:!!this.tel,dir:this.dir()});return base.apply(this,args);};
  let recovery=0,wind=0;
  for(let i=0;i<600&&boss._closeCombo;i++){
   frames++;boss.update();if(boss._closeCombo?.phase==='wind')wind++;if(boss.state==='recovery')recovery++;boss.draw();
   if(boss.slash&&boss.slash.dmg!==1)throw Error('combo damage spike');
  }
  if(events.length!==pattern.steps.length||events.some((e,i)=>i&&e.frame-events[i-1].frame<25))throw Error('bad strike cadence '+id+' '+JSON.stringify(events));
  if(recovery!==52||wind<pattern.steps.length*12||boss._closeCombo||boss._swordCustom||boss._closePose||boss.chuoi.length)throw Error('missing opening / cleanup '+id+' '+recovery);
 }
 // The ordinary weapon-switch timer cannot truncate the complete Dance Macabre.
 const dance=setup('dance');dance.cancelCloseCombo();dance.state='idle';dance.switchT=1;dance.startCloseCombo('dance',true);let danceHits=0;const danceSlash=dance.doSlash;dance.doSlash=function(...args){danceHits++;return danceSlash.apply(this,args);};
 for(let i=0;i<600&&dance._closeCombo;i++){frames++;dance.update();if(dance.state==='morphing')throw Error('weapon timer interrupted Dance');}
 if(danceHits!==DSW_DANCE.length||dance._closeCombo)throw Error('Dance never completed');
 // Trickster approaches a snapshot and never tracks a dodge forever.
 const dash=setup('dsd_b',true),destination=dash._closeCombo.goal;let slashes=0;const slash=dash.doSlash;dash.doSlash=function(...args){slashes++;return slash.apply(this,args);};
 for(let i=0;i<12;i++){frames++;dash.update();}dino.x=20;
 for(let i=0;i<22;i++){frames++;dash.update();}
 if(Math.abs(dash.x-destination)>20||slashes||dash.state!=='recovery')throw Error('Trickster chased the dodging player');
 // Once a warning starts, the strike direction is locked until the next warning.
 const fixed=setup('balrog_a');frames++;fixed.update();const dir=fixed._closeCombo.dir;dino.x=700;
 for(let i=0;i<14;i++){frames++;fixed.update();}
 if(fixed.slash&&fixed.slash.dir!==dir)throw Error('untelegraphed turn');
 // Losing the current native state cancels the added pose without blocking evasions.
 const interrupted=setup('cerberus_b');interrupted.state='d_trickev';interrupted.neT=10;frames++;interrupted.update();
 if(interrupted._closeCombo||interrupted._closePose||interrupted._swordCustom)throw Error('interruption left attack behind');
 const transformed=setup('dance');transformed.phase=2;transformed.state='sdt_wake';transformed.subTimer=0;frames++;transformed.update();if(transformed._closeCombo)throw Error('combo leaked into SDT');
 // Priority works at long range, even with ranged weapons and old ranged queues.
 for(const arm of [0,1,2,3,4,5]){
  const boss=setup('dsd_a');boss.cancelCloseCombo();boss.state='idle';boss.arms=arm;boss.x=850;boss._closeReady=0;boss.chuoi=['g_rain','f_redhot','g_twosome'];boss.pickSkill();
  if(boss._closeCombo?.id!=='dsd_a'||boss._closeCombo.phase!=='approach')throw Error('far melee priority failed '+arm);
 }
 const waiting=setup('dsd_a');waiting.cancelCloseCombo();waiting.state='idle';waiting._closeReady=frames+40;waiting.chuoi=['g_ei'];waiting.pickSkill();if(waiting._closeCombo||waiting.state!=='idle'||waiting.chuoi.length)throw Error('cooldown reintroduced ranged chain');
 // Let the native update/pick/recovery loop run for a full minute without forcing skills.
 const ai=setup('dsd_a');ai.cancelCloseCombo();ai.state='idle';ai.x=850;dino.x=200;ai.actionTimer=0;ai._closeReady=0;ai.chuoi=['g_ei','f_redhot'];const decisions=[],start=frames;
 const startBase=ai.startCloseCombo;ai.startCloseCombo=function(id,trick){decisions.push({kind:'melee',id,at:frames-start});return startBase.call(this,id,trick);};
 const castBase=ai.raChieu;ai.raChieu=function(id){if(['g_ei','d_drive','g_coyote'].includes(id))decisions.push({kind:'ranged',id,at:frames-start});return castBase.call(this,id);};
 let firstHit=null;const hurt=ai.hurtP;ai.hurtP=function(...args){if(firstHit===null)firstHit=frames-start;return hurt.apply(this,args);};
 for(let i=0;i<3600;i++){frames++;ai.update();}
 const melee=decisions.filter(d=>d.kind==='melee'),ranged=decisions.filter(d=>d.kind==='ranged');
 if(melee.length<8||melee[0].id!=='dsd_a'||melee[1].id!=='dsd_b'||!melee.some(d=>d.id==='dance')||ranged.length>Math.ceil(melee.length/2)||firstHit===null||firstHit>150)throw Error('native AI still ranged / passive '+JSON.stringify({decisions,firstHit}));
 if(decisions.some((d,i)=>i&&d.kind==='ranged'&&decisions[i-1].kind==='ranged'))throw Error('ranged streak returned');
 // The old walk-and-fire supplement cannot hide the new melee decision loop.
 const idle=setup('dsd_a');idle.cancelCloseCombo();idle.state='idle';idle.x=850;dino.x=100;bossProjectiles.length=0;
 for(let i=0;i<180;i++){frames++;idle.dmcTick();}if(bossProjectiles.length)throw Error('idle still spammed E&I');
 // Pose and blade collision are the same functions/data as player DSD, not a broad front box.
 for(const id of ['dsd_a','dsd_b','dance']){
  const boss=setup(id);const f=boss._closeCombo;f.index=0;f.phase='strike';f.tick=2;
  const source=DSW_MOVES[f.pattern.moves[0]],motion=danteBossCloseMotion(f),actual=danteBossClosePose(boss,f,motion.wind+2),expected=dswPose(boss,{...source,dir:f.dir},source.wind+2);
  if(Math.hypot(actual.tx-expected.tx,actual.ty-expected.ty)>.001||actual.angle!==expected.angle)throw Error('player/boss DSD pose drift');
 }
 const blade=setup('dsd_a'),f=blade._closeCombo;let hits=0;blade.hurtP=()=>{hits++;};f.tick=13;blade.runCloseCombo();
 dino.x=blade.x-80;dino.y=310;dino.w=dino.h=2;blade.runCloseCombo();if(hits||blade.slash)throw Error('broad slash box hit outside blade');
 f.tick=3;const v=dswPose(blade,{...DSW_MOVES.a1,dir:f.dir},8);dino.x=(v.x+v.tx)/2-1;dino.y=(v.y+v.ty)/2-1;blade.runCloseCombo();if(hits!==1)throw Error('visible blade missed collision');
 for(let i=0;i<4;i++)blade.runCloseCombo();if(hits!==1)throw Error('same swing hit repeatedly');
 const savedRandom=Math.random;
 try{
  Math.random=()=>.1;const follow=setup('dsd_a');follow.cancelCloseCombo();follow.arms=3;follow._closeReady=0;follow.batNe(1);if(!follow.chuoi[0]?.startsWith('close:'))throw Error('Trickster failed to queue melee');
  const next=follow.chuoi.shift();follow.grounded=true;follow.raChieu(next);if(follow._closeCombo?.phase!=='wind'||follow.arms!==3)throw Error('dodge follow-up did not start Cerberus');
 }finally{Math.random=savedRandom;}
 // Player Dante's command tables remain separate from the new boss patterns.
 xDatForm(9);startGame('normal');dino.dante.arm=0;danteKey('KeyJ',false);if(dino.dante.attack?.id!=='a1')throw Error('player combo changed');
 dino.dante.attack=null;dino.dante.k=null;dino.dante.cd=0;ultCharge=100;dino.dante.sinCharge=100;danteKey('KeyU',false);danteKey('KeyU',false);const plainBoss=new DanteBoss(1);if(dswPose(plainBoss,{...DSW_MOVES.a1,dir:1},8).len!==78||dswPose(dino,{...DSW_MOVES.a1,dir:1},8).len<=78)throw Error('player SDT scaling leaked into boss pose');
 return 'PASS native 60s melee priority, far approaches, bounded ranged turns, player-shared DSD motion/collision, full Dance, telegraphs and counterplay';
 }'''))
 assert not errors,errors
 b.close()
