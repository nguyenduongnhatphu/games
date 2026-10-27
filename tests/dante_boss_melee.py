"""Gemini boss integration: real AI, all shared weapon tables, collision and cleanup."""
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    pg = b.new_page(viewport={'width': 1100, 'height': 800})
    errors = []
    pg.on('pageerror', lambda e: errors.append(str(e)))
    pg.goto(os.environ.get('DINO_TEST_URL', 'http://127.0.0.1:8000') + '/games/Dino/index.html')
    pg.wait_for_timeout(300)
    print(pg.evaluate('''() => {
 function setup(id='dsd_a', trick=false) {
  for(const k of Object.keys(keys)) delete keys[k];
  xDatForm(0);startGame('normal');paused=true;
  dino.x=300;dino.y=260;dino.grounded=true;dino.invincible=true;dino.invTimer=99999;
  const boss=new DanteBoss(1);boss.x=410;boss.y=260;boss.hp=boss.maxHp=500;
  boss.phase=1;boss.state='idle';boss.grounded=true;boss.switchT=1;bosses.push(boss);
  if(!boss.startCloseCombo(id,trick))throw Error('cannot start '+id);
  return boss;
 }
 function step(boss,n=1){for(let i=0;i<n;i++){frames++;boss.update();boss.draw();}}
 // Every move must resolve against an actual live player table, not a fallback pose.
 const snapshots=JSON.stringify([DSW_MOVES,BLR_MOVES,CAV_MOVES,KCB_MOVES]);
 const execute=danteBossExecuteHit;let events=[];
 try {
  danteBossExecuteHit=function(boss,f,m,index){events.push({id:m.id,index,t:f.tick});return execute(boss,f,m,index);};
  for(const [id,pattern] of Object.entries(DANTE_BOSS_MELEE)) {
   const boss=setup(id,true),visited=new Set();let recover=0,ready=0;events=[];
   for(const move of pattern.moves)if(!danteBossLookupMove(pattern.table,move))throw Error('unknown move '+id+'.'+move);
   for(let i=0;i<600&&boss._closeCombo;i++) {
    const f=boss._closeCombo;
    if(f.phase==='step')visited.add(f.index);
    if(f.phase==='ready')ready++;
    if(f.phase==='recover')recover++;
    step(boss);
    if(boss._closePose&&Object.values(boss._closePose).some(v=>typeof v==='number'&&!Number.isFinite(v)))throw Error('invalid pose '+id);
    if(boss.state==='morphing')throw Error('switch timer truncated '+id);
   }
   if(visited.size!==pattern.moves.length||recover!==24||ready!==12||boss._closeCombo||boss._closePose||boss._closeMove||boss._comboFx||boss._closeKick||boss._swordCustom)throw Error('incomplete combo/cleanup '+id);
   for(const [i,move] of pattern.moves.entries()) {
    const f={pattern,index:i,dir:1},m=danteBossGetStepMove(f),src=danteBossLookupMove(pattern.table,move);
    if(m.T!==Math.max(src.T,src.end+2)||m.end!==src.end||m.wind!==Math.max(2,src.wind))throw Error('table timing drift '+id);
    const actual=events.filter(e=>e.id===move);
    if(m.waves&&actual.length!==1)throw Error('duplicated Drive wave '+id);
    if(m.count&&actual.length!==m.count)throw Error('lost rapid strikes '+id);
    if(m.hits&&actual.length!==m.hits.length)throw Error('lost hit timing '+id);
   }
  }
 } finally {danteBossExecuteHit=execute;}
 if(JSON.stringify([DSW_MOVES,BLR_MOVES,CAV_MOVES,KCB_MOVES])!==snapshots)throw Error('boss mutated player data');
 // No extra front rectangle can damage outside the DSD blade, even on its event frame.
 const blade=setup(),f=blade._closeCombo;f.phase='step';let hits=0;blade.hurtP=()=>{hits++;};
 dino.x=blade.x-80;dino.y=310;dino.w=dino.h=2;f.tick=5;
 blade.runCloseCombo();if(hits||blade.slash)throw Error('DSD front box hit outside blade');
 const m=danteBossGetStepMove(f);danteBossExecuteHit(blade,f,m,0);if(hits)throw Error('second DSD damage path');
 f.tick=7;const pose=dswPose(blade,m,8);dino.x=(pose.x+pose.tx)/2-1;dino.y=(pose.y+pose.ty)/2-1;
 blade.runCloseCombo();if(hits!==1)throw Error('visible blade missed');
 for(let i=0;i<3;i++)blade.runCloseCombo();if(hits!==1)throw Error('same swing damaged repeatedly');
 const expected=dswPose(blade,danteBossLookupMove('DSW','a1')?{...DSW_MOVES.a1,dir:f.dir}:null,f.tick);
 if(Math.hypot(expected.tx-blade._closePose.tx,expected.ty-blade._closePose.ty)>.001)throw Error('DSD pose differs from player');
 // Startup is visible and harmless, then the first attack direction stays locked.
 const warned=setup('balrog_a');let earlyHits=0;warned.hurtP=()=>{earlyHits++;};
 step(warned,1);if(!warned.tel)throw Error('missing combo warning');const dir=warned._closeCombo.dir;
 dino.x=700;step(warned,11);if(earlyHits)throw Error('startup damaged player');
 dino.x=warned.x-30;step(warned,2);if(warned._closeCombo.dir!==dir)throw Error('first attack turned after warning');
 // Long-range Trickster has a finite approach, even if the player moves away.
 const dash=setup('dsd_b',true);dash.x=850;dash.cancelCloseCombo();dash.state='idle';dash.startCloseCombo('dsd_b',true);
 const limit=dash._closeCombo.approachEnd;for(let i=0;i<limit+1;i++){dino.x=i%2?40:900;step(dash);}
 if(dash._closeCombo?.phase==='approach')throw Error('unbounded Trickster chase');
 // Swordmaster uses weapon-qualified kinds and all projected tips are finite.
 for(const [id,index,kind] of [['balrog_a',2,'cut'],['balrog_a',3,'drill'],['cavaliere_a',2,'cut'],['cerberus_a',2,'fan'],['cerberus_a',3,'cut']]) {
  const boss=setup(id);boss.dtStage=2;const f=boss._closeCombo;f.phase='step';f.index=index;
  const m=danteBossGetStepMove(f);danteBossSpawnPhantomSwords(boss,f,m);
  if(boss._comboFx.phantomSwords.length!==3||boss._comboFx.phantomSwords.some(sw=>sw.kind!==kind))throw Error('wrong phantom formation '+id+'.'+index);
  step(boss,10);for(const sw of boss._comboFx.phantomSwords)if(!Number.isFinite(sw.tx)||!Number.isFinite(sw.ty))throw Error('invalid phantom');
 }
 // Native guard/parry path stays in use for the new strikes.
 const guarded=setup('balrog_a');dino.invincible=false;dino.invTimer=0;dino.x=guarded.x-55;
 const guard=dino.isShielding;dino.isShielding=()=>true;const hp=dino.hp;
 try {const f=guarded._closeCombo,m=danteBossGetStepMove(f);danteBossExecuteHit(guarded,f,m,0);if(dino.hp!==hp)throw Error('new strike bypassed guard');}
 finally {dino.isShielding=guard;}
 // Changing phase, taking an evasive action, and death remove every custom effect.
 for(const change of [boss=>{boss.state='d_trickev';boss.neT=10;},boss=>{boss.phase=2;boss.state='sdt_wake';boss.subTimer=0;},boss=>{boss.hp=0;boss.suSt='ket';}]) {
  const boss=setup('dance');boss.dtStage=2;step(boss,18);change(boss);step(boss);
  if(boss._closeCombo||boss._closeMove||boss._closePose||boss._comboFx||boss._swordCustom)throw Error('interrupted effects leaked');
 }
 // Queued old ranged chains and ranged loadouts must still approach with melee.
 for(const arm of [0,1,2,3,4,5]) {
  const boss=setup();boss.cancelCloseCombo();boss.state='idle';boss.arms=arm;boss.x=850;boss._closeReady=0;boss.chuoi=['g_rain','f_redhot','g_twosome'];boss.pickSkill();
  if(boss._closeCombo?.id!=='dsd_a'||boss._closeCombo.phase!=='approach')throw Error('ranged priority returned '+arm);
 }
 // Run a full native AI minute. No forced starts after setup.
 const ai=setup();ai.cancelCloseCombo();ai.state='idle';ai.x=850;dino.x=200;ai.actionTimer=0;ai._closeReady=0;
 const decisions=[],start=frames,startBase=ai.startCloseCombo,castBase=ai.raChieu;let firstHit=null;
 ai.startCloseCombo=function(id,trick){decisions.push({kind:'melee',id});return startBase.call(this,id,trick);};
 ai.raChieu=function(id){if(['d_drive','g_twosome','g_coyote','f_hat'].includes(id))decisions.push({kind:'ranged',id});return castBase.call(this,id);};
 ai.hurtP=()=>{if(firstHit===null)firstHit=frames-start;};
 for(let i=0;i<3600;i++)step(ai);
 const melee=decisions.filter(d=>d.kind==='melee'),ranged=decisions.filter(d=>d.kind==='ranged');
 if(new Set(melee.map(d=>d.id)).size!==Object.keys(DANTE_BOSS_MELEE).length||melee[0].id!=='dsd_a'||melee[1].id!=='dsd_b'||firstHit===null||firstHit>150||ranged.length>Math.ceil(melee.length/3))throw Error('native AI priority failed '+JSON.stringify({decisions,firstHit}));
 if(decisions.some((d,i)=>i&&d.kind==='ranged'&&decisions[i-1].kind==='ranged'))throw Error('ranged spam');
 const idle=setup();idle.cancelCloseCombo();idle.state='idle';idle.x=850;dino.x=100;bossProjectiles.length=0;
 for(let i=0;i<180;i++){frames++;idle.dmcTick();}if(bossProjectiles.length)throw Error('idle E&I returned');
 // Player sword input and SDT geometry remain unchanged by boss integration.
 xDatForm(9);startGame('normal');paused=false;dino.dante.arm=0;danteKey('KeyJ',false);
 if(dino.dante.attack?.id!=='a1')throw Error('player combo changed');
 dino.dante.attack=null;dino.dante.k=null;dino.dante.cd=0;ultCharge=100;dino.dante.sinCharge=100;danteKey('KeyU',false);danteKey('KeyU',false);
 const normalBoss=new DanteBoss(1);
 if(dswPose(normalBoss,{...DSW_MOVES.a1,dir:1},8).len!==78||dswPose(dino,{...DSW_MOVES.a1,dir:1},8).len<=78)throw Error('player SDT geometry leaked into boss');
 return 'PASS Gemini 14 combos, all four player tables, continuous multi-hit timings, no double blade/wave damage, DT phantom swords, finite approaches, 60s native AI, guards and interruption cleanup';
 }'''))
    assert not errors, errors
    b.close()
