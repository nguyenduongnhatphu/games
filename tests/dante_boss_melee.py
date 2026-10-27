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
  for(let i=0;i<400&&boss._closeCombo;i++){
   frames++;boss.update();if(boss._closeCombo?.phase==='wind')wind++;if(boss.state==='recovery')recovery++;boss.draw();
   if(boss.slash&&boss.slash.dmg!==1)throw Error('combo damage spike');
  }
  if(events.length!==pattern.steps.length||events.some((e,i)=>i&&e.frame-events[i-1].frame<28))throw Error('bad strike cadence '+id+' '+JSON.stringify(events));
  if(recovery!==52||wind<pattern.steps.length*12||boss._closeCombo||boss._swordCustom||boss._closePose||boss.chuoi.length)throw Error('missing opening / cleanup '+id+' '+recovery);
 }
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
 // The regular chooser can select each melee weapon, but respects its cooldown.
 const savedRandom=Math.random;
 try{
  Math.random=()=>.1;
  for(const arm of [0,1,2,3]){
   const boss=setup('dsd_a');boss.cancelCloseCombo();boss.state='idle';boss.arms=arm;boss._closeReady=0;boss.chuoi=[];boss.pickSkill();
   if(!boss._closeCombo||boss._closeCombo.pattern.arm!==arm||boss._closeCombo.phase!=='approach')throw Error('chooser failed '+arm);
  }
  const boss=setup('dsd_a');boss.cancelCloseCombo();boss.state='idle';boss._closeReady=frames+480;boss.chuoi=[];boss.pickSkill();if(boss._closeCombo)throw Error('new patterns ignored cooldown');
  const follow=setup('dsd_a');follow.cancelCloseCombo();follow.arms=3;follow._closeReady=0;follow.batNe(1);if(!follow.chuoi[0]?.startsWith('close:'))throw Error('Trickster failed to queue melee');
  const next=follow.chuoi.shift();follow.grounded=true;follow.raChieu(next);if(follow._closeCombo?.phase!=='wind'||follow.arms!==3)throw Error('dodge follow-up did not start Cerberus');
 }finally{Math.random=savedRandom;}
 // Player Dante's command tables remain separate from the new boss patterns.
 xDatForm(9);startGame('normal');dino.dante.arm=0;danteKey('KeyJ',false);if(dino.dante.attack?.id!=='a1')throw Error('player combo changed');
 dino.dante.attack=null;dino.dante.k=null;dino.dante.cd=0;ultCharge=100;dino.dante.sinCharge=100;danteKey('KeyU',false);danteKey('KeyU',false);const plainBoss=new DanteBoss(1);if(dswPose(plainBoss,{...DSW_MOVES.a1,dir:1},8).len!==78||dswPose(dino,{...DSW_MOVES.a1,dir:1},8).len<=78)throw Error('player SDT scaling leaked into boss pose');
 return 'PASS 9 patterns / strike cadence / telegraphs / 52-frame openings / fixed Trickster aim / interrupt and SDT cleanup / native selection and follow-ups';
 }'''))
 assert not errors,errors
 b.close()
