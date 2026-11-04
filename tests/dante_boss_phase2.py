"""Post-SDT human combos and the shared, two-pass Sin wing drill."""
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width':1100,'height':800})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto(os.environ.get('DINO_TEST_URL','http://127.0.0.1:8000')+'/games/Dino/index.html')
    page.wait_for_timeout(300)
    print(page.evaluate('''() => {
 function reset(){for(const k of Object.keys(keys))delete keys[k];xDatForm(0);startGame('normal');paused=true;dino.x=400;dino.y=260;dino.grounded=true;dino.invincible=true;dino.invTimer=99999;}
 function makeBoss(){const b=new DanteBoss(1);b.x=510;b.y=260;b.grounded=true;b.hp=b.maxHp=500;b.state='idle';b.switchT=99999;bosses.push(b);return b;}
 function step(b,n=1){for(let i=0;i<n;i++){frames++;b.update();b.draw();}}
 // The real SDT -> human transition keeps the existing exhaustion timer and 0.5 speed.
 reset();const returned=makeBoss();returned.startPhase2();returned.hp=20;returned.suVeNguoi();
 if(returned.phase!==1||!returned.sdtUltXong||returned.suYeu!==SDTU_YEU||returned.spd()!==.5||returned.w!==40||returned.h!==60)throw Error('human exhaustion transition changed');
 step(returned,91);
 if(!returned._closeCombo||returned._closeCombo.id!=='dsd_a'||returned.suYeu!==SDTU_YEU-91)throw Error('exhausted human bypassed Gemini combos');
 // All four weapons retain the same event sequence at half speed; the normal
 // weapon timer cannot cut off the longer exhausted animation.
 const execute=danteBossExecuteHit;let events=[];
 try {
  danteBossExecuteHit=function(b,f,m,index){events.push(m.table+'.'+m.id+'.'+index);return execute(b,f,m,index);};
  for(const id of ['dsd_a','dance','balrog_a','cavaliere_b','cerberus_a']) {
   const results=[];
   for(const weak of [false,true]){
    reset();const b=makeBoss();if(weak){b.sdtUltXong=true;b.suYeu=10000;b.dtStage=3;}
    b.switchT=1;b.startCloseCombo(id,false);events=[];let elapsed=0,maxPhantoms=0;
    while(b._closeCombo&&elapsed<1200){step(b);elapsed++;maxPhantoms=Math.max(maxPhantoms,b._comboFx?.phantomSwords.length||0);if(b.state==='morphing')throw Error('weak combo cut off '+id);}
    if(b._closeCombo||elapsed>=1200)throw Error('weak combo stuck '+id);
    if(weak&&maxPhantoms)throw Error('exhausted human regained SDT swords');
    results.push({elapsed,events:events.slice()});
   }
   if(results[1].elapsed!==results[0].elapsed*2||JSON.stringify(results[0].events)!==JSON.stringify(results[1].events))throw Error('weak timing/events mismatch '+id+' '+JSON.stringify(results));
  }
 }finally{danteBossExecuteHit=execute;}
 reset();const finish=makeBoss();finish.sdtUltXong=true;finish.suYeu=20;finish.startCloseCombo('balrog_a',false);step(finish,30);
 if(finish.suYeu!==0||finish._closeCombo?.tick<=5)throw Error('weakness expiry stuck move clock');
 // The first ordinary SDT decision visibly includes the new drill.
 reset();const first=makeBoss();first.startPhase2();step(first,150);
 if(!first._sinDrillSeen||!first._sdtDrill)throw Error('native SDT never chose drill');
 // Each direction crosses the full arena exactly twice, with harmless startup,
 // a harmless wrap, and a real recovery opening. Collision samples the whole step.
 for(const dir of [-1,1]){
  reset();const b=makeBoss();b.startPhase2();b.invulnAll=false;b.state='idle';b.x=dir>0?100:800;b.faceP=()=>{b.facingLeft=dir<0;};
  if(!b.startSinDrill())throw Error('drill refused');
  const hits=[],passes=[],extent=[];let lastPass=0,recovery=0;
  b.hurtP=()=>{hits.push({phase:b._sdtDrill.phase,pass:b._sdtDrill.pass});};
  for(let i=0;i<350&&b._sdtDrill;i++){
   const f=b._sdtDrill;if(f.phase==='recover')recovery++;
   step(b);
   if(b._sdtDrill?.phase==='dash')extent.push(b.cx());
   if(b._sdtDrill&&b._sdtDrill.pass!==lastPass){lastPass=b._sdtDrill.pass;passes.push(lastPass);}
  }
  if(b._sdtDrill||passes.join(',')!=='1,2'||recovery!==36||hits.length!==2||hits.some(h=>h.phase!=='dash')||new Set(hits.map(h=>h.pass)).size!==2)throw Error('two-pass drill failed '+dir+' '+JSON.stringify({hits,passes,recovery}));
  if(Math.min(...extent)>=worldL()||Math.max(...extent)<=worldR()||b.x<worldL()||b.x+b.w>worldR())throw Error('drill did not traverse full map or return safely');
 }
 // Jumping above a locked lane avoids both passes, and shields use native hurtP.
 reset();const dodge=makeBoss();dodge.startPhase2();dodge.startSinDrill();dino.y=0;dino.h=2;let dodgedHits=0;dodge.hurtP=()=>dodgedHits++;
 for(let i=0;i<300&&dodge._sdtDrill;i++)step(dodge);if(dodgedHits)throw Error('drill chased vertical dodge');
 reset();const guarded=makeBoss();guarded.startPhase2();guarded.startSinDrill();dino.invincible=false;dino.invTimer=0;
 const shielding=dino.isShielding;dino.isShielding=()=>true;const hp=dino.hp;
 try{for(let i=0;i<300&&guarded._sdtDrill;i++)step(guarded);if(dino.hp!==hp)throw Error('drill bypassed shield');}finally{dino.isShielding=shielding;}
 // Cinematic Judgement can interrupt in mid-flight and removes offscreen drill state.
 reset();const cinematic=makeBoss();cinematic.startPhase2();cinematic.startSinDrill();step(cinematic,35);cinematic.hp=20;step(cinematic);
 if(cinematic._sdtDrill||cinematic.suSt!=='don'||cinematic.x<worldL()||cinematic.x+cinematic.w>worldR())throw Error('Judgement did not clean up drill');
 for(let i=0;i<850&&!(cinematic.sdtUltXong&&cinematic._closeCombo);i++)step(cinematic);
 if(cinematic.phase!==1||!cinematic.sdtUltXong||!cinematic._closeCombo||cinematic.suYeu<=0||cinematic.spd()!==.5)throw Error('full Judgement -> exhausted Gemini flow failed');
 reset();const dead=makeBoss();dead.startPhase2();dead.startSinDrill();step(dead,35);dead.hp=0;step(dead);
 if(dead._sdtDrill)throw Error('death left drill running');
 // Player drill shares the same 150px cone / 48px radius in both directions,
 // still costs the same resource, and can damage at its newly visible tip.
 for(const dir of [-1,1]){
  reset();xDatForm(9);startGame('normal');paused=false;dino.x=450;dino.y=260;dino.grounded=true;dino.isFacingLeft=dir<0;dino.dante.sinCharge=100;danteSinEnter();
  const cx=dino.x+dino.w/2+dir*14,cy=dino.y+dino.h/2;
  const target=(local,y=cy)=>{const o={x:cx+dir*local-1,y:y-1,w:2,h:2,hp:100,maxHp:100,update(){},draw(){}};enemies.push(o);return o;};
  const tip=target(145),far=target(160),above=target(80,cy-55);
  danteSinDrill();const stock=dino.dante.sinTime;frames++;danteSinTick();
  if(tip.hp!==92||far.hp!==100||above.hp!==100||stock!==855)throw Error('large player drill collision/resource '+dir+' '+JSON.stringify([tip.hp,far.hp,above.hp,stock]));
  const bladePainter=dswPaintBlade;let strayBlades=0;
  try{dswPaintBlade=(...args)=>{strayBlades++;return bladePainter(...args);};danteDraw(dino);if(strayBlades)throw Error('held DSD sticking out of folded wings');}
  finally{dswPaintBlade=bladePainter;}
 }
 const wingPainter=veCanhKhoan,calls=[];
 try{veCanhKhoan=(...args)=>calls.push(args);danteDrawSinDrill(100,200,-1,12);const b={_sdtDrill:{phase:'dash',dir:1,age:20}};drawSdtDante(b,300,200);
 if(calls.length!==2||calls.some(args=>args[4]!==DANTE_SIN_DRILL.palette)||calls[0][2]!==Math.PI)throw Error('not using Dragon Trigger wing renderer');}
 finally{veCanhKhoan=wingPainter;}
 return 'PASS exhausted human Gemini combos at half speed, exhaustion expiry, shared large Dragon wing drill, exact two arena crossings, telegraphs/dodges/guards, recovery and Judgement cleanup';
 }'''))
    assert not errors, errors
    browser.close()
