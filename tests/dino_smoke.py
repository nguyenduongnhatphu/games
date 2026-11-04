"""Dino browser regression smoke test.

Requires Python Playwright and Chromium. Start the repository's HTTP server on
port 8000 first, then run: python3 tests/dino_smoke.py
"""
from pathlib import Path
from html.parser import HTMLParser
import subprocess
import os
BASE_URL=os.environ.get("DINO_TEST_URL", "http://127.0.0.1:8000")
from playwright.sync_api import sync_playwright
class Scripts(HTMLParser):
 def __init__(self): super().__init__();self.active=False;self.parts=[]
 def handle_starttag(self,t,a):
  if t=='script':self.active=True
 def handle_endtag(self,t):
  if t=='script':self.active=False;self.parts.append('\n;\n')
 def handle_data(self,d):
  if self.active:self.parts.append(d)
s=Scripts();s.feed((Path(__file__).resolve().parents[1] / 'games/Dino/index.html').read_text());Path('/tmp/dino-all.js').write_text(''.join(s.parts));subprocess.run(['node','--check','/tmp/dino-all.js'],check=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);pg=b.new_page(viewport={'width':1100,'height':800});errors=[]
 pg.on('pageerror',lambda e:errors.append(str(e)))
 pg.on('console',lambda m:errors.append(m.text) if m.type=='error' and '[Dino]' in m.text else None)
 pg.goto(BASE_URL+'/games/Dino/index.html');pg.wait_for_timeout(400)
 pg.evaluate("xDatForm(9)");pg.reload();pg.wait_for_timeout(400)
 print('saved Dante reload',pg.evaluate("()=>{startGame('normal');return {ok:danteOn()&&!!dino.dante&&dino.h===60&&dino.maxHp===10,feet:dino.y+dino.h}}"));assert pg.evaluate('danteOn()&&!!dino.dante&&dino.h===60')
 pg.wait_for_timeout(500);assert pg.evaluate('_loiKhung.size===0')
 # Test each contextual branch without RAF advancing between assertions.
 result=pg.evaluate('''()=>{
 paused=true;const results=[];const reset=()=>{for(const k of Object.keys(keys))delete keys[k];dino.dante.attack=null;dino.dante.swapReady=0;dino.dante.nextSwap=0;dino.dante.cd=0;dino.dante.rounds=[];dino.dante.arm=4;dino.grounded=true;dino.dante.style=1;combatStance=0;};
 function run(special,charge,expected){eiCommand(special,charge);const a=dino.dante.attack;if(!a||a.id!==expected)throw Error('expected '+expected);for(let i=0;i<Math.ceil(EI_MOVES[expected].T/DANTE_ATTACK_RATE);i++)eiTick();const q=dino.dante.rounds;if(!q.length)throw Error('no shots');results.push([expected,q.length,q.every(r=>Number.isFinite(r.vx)&&Number.isFinite(r.vy))]);return q;}
 reset();run(false,0,'shot');reset();let q=run(true,0,'twosome');if(!(q.some(r=>r.vx>0)&&q.some(r=>r.vx<0)))throw Error('both directions');
 reset();keys.KeyS=true;run(true,0,'honeycomb');reset();dino.grounded=false;dino.dante.ebony.rainUsed=false;q=run(true,0,'rain');if(!q.every(r=>r.vy>0))throw Error('rain must shoot down');
 dino.dante.cd=0;dino.dante.attack=null;eiCommand(true,0);if(dino.dante.attack.id==='rain')throw Error('infinite hover');
 reset();q=run(true,45,'charge');if(!q.every(r=>r.damage===8&&r.kind==='ei-charge'))throw Error('charge damage');reset();danteSetStyle(2);run(true,0,'twin');
 reset();dino.isFacingLeft=true;q=run(false,0,'shot');if(!q.every(r=>r.vx<0))throw Error('left facing');dino.isFacingLeft=false;
 return results;
}''');print('E&I contextual moves:',result)
 # Bullet collision uses real enemy list and damage path, not stubs.
 print('combat',pg.evaluate('''()=>{
 startGame('normal');paused=true;const p=dino.dante;p.arm=4;dino.x=200;dino.y=260;dino.grounded=true;
 const target={x:310,y:265,w:32,h:50,hp:100,maxHp:100,dy:0,takeDamage(d){this.hp-=d;}};enemies.push(target);
 eiCommand(false,0);eiTick();for(let i=0;i<12;i++)danteTick();if(target.hp>=100)throw Error('no damage');return {hp:target.hp,rounds:p.rounds.length};
 }'''))
 # Render every old form and visit specialized form menus.
 for form in range(10):
  pg.evaluate(f"()=>{{gameState='custom_menu';xDatForm({form});drawCustomMenu();}}")
  assert pg.evaluate('_loiKhung.size===0'),form
  if form<8:assert pg.evaluate(f'formSamples.has({form})')
 pg.evaluate("()=>{xDatForm(9);startGame('normal');dino.dante.arm=4;gameState='custom_menu';drawCustomMenu();}")
 pg.evaluate("()=>{startGame('normal');dino.dante.arm=4;}");pg.keyboard.down('j');pg.wait_for_timeout(450);pg.keyboard.up('j')
 print('Live E&I hold J frames',pg.evaluate('frames'));assert pg.evaluate('frames>10')
 # Charge/release and recovery cancellation use the public input controller.
 print('input/cancel',pg.evaluate("""()=>{
 paused=false;for(const k of Object.keys(keys))delete keys[k];
 startGame('normal');const p=dino.dante;p.arm=4;
 danteKey('KeyK',false);for(let i=0;i<45;i++)danteTick();
 keys.KeyK=false;danteRelease();if(p.attack?.id!=='charge')throw Error('charge/release');
 for(let i=0;i<5;i++)danteTick();danteKey('KeyE',false);
 if(p.arm!==5||p.attack)throw Error('weapon cancel');return true;
 }"""))
 # Actual press/dash sequences, with player physics and bounded escape windows.
 print('dash combos',pg.evaluate("""()=>{
 const results=[];
 function reset(left=false){
  for(const k of Object.keys(keys))delete keys[k];startGame('normal');paused=false;
  dino.x=400;dino.y=260;dino.grounded=true;dino.isFacingLeft=left;dino.dante.arm=4;
  const target={x:left?270:510,y:260,w:36,h:60,hp:100,maxHp:100,dy:0,takeDamage(d){this.hp-=d;}};
  enemies.push(target);return target;
 }
 function step(count){for(let i=0;i<count;i++){frames++;dino.update();danteTick();}}
 for(const left of [false,true]){
  const dir=left?-1:1;let t=reset(left);doDash(dir);danteKey('KeyJ',false);
  if(dino.dante.attack?.id!=='stinger')throw Error('dash J');keys.KeyJ=false;step(32);
  if(t.hp>=100)throw Error('Gun Stinger missed nearby target');results.push(['stinger',left,t.hp]);
  t=reset(left);danteKey('KeyJ',false);step(1);keys.KeyJ=false;doDash(dir);danteKey('KeyJ',false);keys.KeyJ=false;
  if(dino.dante.attack?.id!=='slide')throw Error('J dash J');step(40);
  if((dino.x+dino.w/2-t.x-t.w/2)*dir<=0||t.hp>=98||dino.isFacingLeft===left)throw Error('slide must cross, turn and hit');
  if(dino.invincible)throw Error('slide grants permanent invulnerability');results.push(['slide',left,t.hp]);
  reset(left);doDash(dir);danteKey('KeyK',false);
  if(dino.dante.attack?.id!=='fireworks')throw Error('dash K');keys.KeyK=false;step(34);
  reset(left);danteKey('KeyK',false);step(5);doDash(dir);
  if(dino.dante.attack?.id!=='vault'||dino.dante.k!==null)throw Error('K dash');
  keys.KeyK=false;danteRelease();
  let sent=false;for(let i=0;i<30;i++){step(1);if(dino.dante.attack?.sent){sent=true;break;}}
  const fan=dino.dante.rounds.filter(q=>q.kind==='bullet');
  if(!sent||fan.length!==12||!fan.every(q=>Number.isFinite(q.vx)&&Number.isFinite(q.vy)))throw Error('vault fan');
  step(48);results.push(['vault',left]);
 }
 reset();enemies.length=0;danteKey('KeyK',false);doDash(1);keys.KeyK=false;step(Math.ceil(EI_MOVES.vault.T/DANTE_ATTACK_RATE));
 if(dino.dante.attack||!Number.isFinite(dino.y))throw Error('no-target vault');
 reset();dashCd=20;danteKey('KeyK',false);doDash(1);
 if(dino.dante.attack?.id==='vault'||dino.dante.k===null)throw Error('failed dash consumed charge');
 reset();doDash(1);frames+=25;dashVx=0;danteKey('KeyJ',false);
 if(dino.dante.attack?.id!=='shot')throw Error('expired dash input');
 reset();doDash(1);paused=true;danteKey('KeyJ',false);
 if(dino.dante.attack)throw Error('paused combo');return results;
 }"""))
 # Faust controller: real projectiles, orbit collision/cadence, hat return and melee inputs.
 print('Faust',pg.evaluate("""()=>{
 function reset(left=false){for(const k of Object.keys(keys))delete keys[k];startGame('normal');paused=false;dino.x=400;dino.y=260;dino.grounded=true;dino.isFacingLeft=left;dino.dante.arm=5;}
 function target(x,y,w=24,h=30){const o={x,y,w,h,hp:200,maxHp:200,dy:0,takeDamage(d){this.hp-=d;}};enemies.push(o);return o;}
 function step(n){for(let i=0;i<n;i++){frames++;danteTick();}}
 function K(){danteKey('KeyK',false);keys.KeyK=false;danteRelease();}
 for(const left of [false,true]){
  reset(left);const t=target(left?300:490,270);danteKey('KeyJ',false);keys.KeyJ=false;step(12);
  if(Math.abs(t.hp-198.4)>1e-6)throw Error('Faust tap must shoot one 2-damage bullet');
  reset(left);const ringTarget=target(415,345,10,10);danteKey('KeyJ',false);step(120);
  const f=faustState(dino.dante),damage=200-ringTarget.hp;
  if(!f.orbit||damage<=0||damage>20)throw Error('orbit damage/cadence '+damage);
  keys.KeyJ=false;step(1);if(f.orbit)throw Error('release J did not stop orbit');
  const hp=ringTarget.hp;step(36);if(ringTarget.hp!==hp)throw Error('orbit damages after release');
  reset(left);const hatTarget=target(left?300:500,265);K();if(dino.dante.attack?.id!=='throw')throw Error('K throw');step(90);
  if(faustState(dino.dante).hat||Math.abs(hatTarget.hp-192)>1e-6)throw Error('hat must hit once per pass and return '+hatTarget.hp);
 }
 reset();K();step(FAUST_MOVES.throw.T);if(!faustState(dino.dante).hat)throw Error('missing thrown hat');
 const h=faustState(dino.dante).hat,burstTarget=target(h.x-8,h.y-8);K();if(dino.dante.attack?.id!=='trick')throw Error('hat recall');step(6);
 if(burstTarget.hp>=200||!faustState(dino.dante).hat?.returning)throw Error('Hat Trick burst');step(100);if(faustState(dino.dante).hat)throw Error('hat stuck');
 reset();const melee=target(450,270);keys.KeyS=true;
 for(const id of ['slash','slash','upper']){K();if(dino.dante.attack?.id!==id)throw Error('down K combo');step(Math.ceil(FAUST_MOVES[id].T/DANTE_ATTACK_RATE));}
 if(Math.abs(melee.hp-186.4)>1e-6||!melee._dswControl?.air)throw Error('melee cadence / launch '+melee.hp);
 reset();dino.grounded=false;K();if(dino.dante.attack?.id!=='air')throw Error('air K');step(30);
 reset();doDash(1);K();if(dino.dante.attack?.id!=='dash')throw Error('dash K');step(30);
 reset();danteKey('KeyK',false);step(60);keys.KeyK=false;danteRelease();if(dino.dante.attack?.id!=='meteor')throw Error('charged K');step(50);
 if(faustState(dino.dante).meteors.length!==3)throw Error('Red Hot Night must create 3 meteors');
 reset();const meteorTarget=target(520,265);danteKey('KeyK',false);step(60);keys.KeyK=false;danteRelease();step(120);
 if(Math.abs(meteorTarget.hp-164.8)>1e-6)throw Error('meteors must actually hit '+meteorTarget.hp);
 // Each growing meteor blast hits once; targets outside the radius remain safe.
 reset();const epicentre=target(520,265),edge=target(610,275,10,10),outside=target(730,275);
 danteKey('KeyK',false);step(60);keys.KeyK=false;danteRelease();step(120);
 if(Math.abs(epicentre.hp-164.8)>1e-6||Math.abs(edge.hp-179.2)>1e-6||outside.hp!==200)throw Error('meteor AoE radii / repeated damage '+[epicentre.hp,edge.hp,outside.hp]);
 reset();const moving=target(520,265);danteKey('KeyK',false);step(60);keys.KeyK=false;danteRelease();moving.x+=300;step(120);
 if(moving.hp!==200)throw Error('meteor target position must stay locked');
 // Red Shot is a finite, piercing, aimed ranged attack with three charge tiers.
 for(const left of [false,true])for(const charge of [30,60,90]){
  reset(left);const front=target(left?200:600,270),far=target(left?0:800,270),behind=target(left?550:290,270);
  keys.KeyS=true;danteKey('KeyK',false);step(charge);keys.KeyK=false;danteRelease();keys.KeyS=false;
  if(dino.dante.attack?.id!=='beam')throw Error('charged ranged branch');
  step(42);const expected=.8*3*(charge===90?10:charge===60?8:5);
  if(Math.abs(front.hp-(200-expected))>1e-6||Math.abs(far.hp-(200-expected))>1e-6||behind.hp!==200)throw Error('piercing beam damage/direction '+[left,charge,front.hp,far.hp,behind.hp]);
 }
 reset();doDash(1);danteKey('KeyJ',false);if(dino.dante.attack?.id!=='beam')throw Error('dash J ranged');keys.KeyJ=false;step(42);
 reset();danteKey('KeyJ',false);step(25);const orbTarget=target(630,270);doDash(1);
 if(faustState(dino.dante).spears.length!==6||faustState(dino.dante).orbit)throw Error('orbit release');
 keys.KeyJ=false;step(70);if(orbTarget.hp>=200||faustState(dino.dante).spears.length)throw Error('homing damage/expiry');
 reset();K();step(24);const flight=faustState(dino.dante).hat; // Existing recall still works after new ranged moves.
 if(!flight)throw Error('hat flight regression');
 reset();danteKey('KeyK',false);step(60);keys.KeyK=false;danteRelease();step(16);dino.invincible=false;dino.takeDamage(1);step(80);
 if(faustState(dino.dante).meteors.length||faustState(dino.dante).lock)throw Error('cancelled meteor cleanup');
 reset();keys.KeyS=true;K();step(10);if(!dino.dante.body._faustLegs||!faustState(dino.dante).swings.length)throw Error('melee motion/trail missing');
 reset();danteKey('KeyJ',false);step(25);danteKey('KeyE',false);
 if(dino.dante.arm!==0||faustState(dino.dante).orbit)throw Error('orbit not cleaned on switch');
 reset();danteKey('KeyJ',false);step(25);dino.invincible=false;dino.takeDamage(1);
 if(dino.hp!==9||faustState(dino.dante).orbit)throw Error('damage must interrupt orbit');
 reset();dino.dante.dt=120;const dtTarget=target(490,270);danteKey('KeyJ',false);keys.KeyJ=false;step(12);if(Math.abs(dtTarget.hp-196.8)>1e-6)throw Error('Faust DT bonus');
 reset();K();step(17);danteKey('KeyE',false);if(faustState(dino.dante).hat)throw Error('hat persists after switching');
 reset();paused=true;danteKey('KeyJ',false);if(dino.dante.attack)throw Error('paused Faust attack');
 reset();danteKey('KeyJ',false);step(25);gameOver=true;faustTick();if(faustState(dino.dante).orbit)throw Error('gameover orbit');
 reset();danteKey('KeyJ',false);step(25);paused=true;
 return 'gunfire/orbit, swept melee, 3 ranged charge tiers, homing release, meteor AoE/position lock and interruption passed';
 }"""))
 pg.evaluate("()=>{paused=false;gameState='custom_menu';drawCustomMenu();}")
 pg.screenshot(path='/tmp/faust-menu.png')
 pg.evaluate("()=>{startGame('normal');dino.dante.arm=5;}")
 pg.keyboard.down('j');pg.wait_for_timeout(600);assert pg.evaluate('faustState(dino.dante).orbit===1');pg.screenshot(path='/tmp/faust-orbit.png');pg.keyboard.up('j');pg.wait_for_timeout(60);assert pg.evaluate('faustState(dino.dante).orbit===0')
 # Four Dante styles: fixed phantom damage, output rounds, actual guard collision routes,
 # movement thresholds/solids, and preservation of the original Dino controller.
 print('Dante styles',pg.evaluate("""()=>{
 function reset(style=1){for(const k of Object.keys(keys))delete keys[k];xDatForm(9);startGame('normal');paused=false;dino.x=300;dino.y=260;dino.grounded=true;dino.isFacingLeft=false;dino.dante.arm=4;danteSetStyle(style);}
 function enemy(x=450,y=260){const o={x,y,w:40,h:60,hp:1000,maxHp:1000,dy:0,grounded:true,facingLeft:true,state:'idle',lastMeleeHit:-1,name:'TEST',takeDamage(d){this.hp-=d;}};enemies.push(o);return o;}
 function tick(count){for(let i=0;i<count;i++){frames++;danteTick();}}
 const result=[];
 for(const [rank,count] of [[0,1],[1,1],[2,2],[3,2],[4,3],[5,3],[6,4]]){
  reset(0);dino.dante.arm=0;styleRankIdx=rank;dino.dante.dt=60;const o=enemy(365);danteKey('KeyJ',false);keys.KeyJ=false;
  const blades=danteStyleState(dino.dante).swords;
  if(o.hp!==1000||blades.length!==count||!blades.every(blade=>blade.x<dino.x+dino.w/2&&blade.color==='#ff2a55'))throw Error('phantoms must start behind on melee attack, before hit');
  tick(4);if(o.hp!==1000)throw Error('phantom damage during windup');
  tick(21);if(o.hp!==995-count)throw Error('Swordmaster rank '+rank+': '+o.hp);
 }
 reset(0);dino.dante.arm=0;const far=enemy(700);danteKey('KeyJ',false);keys.KeyJ=false;
 let freeHilt=false,independentCut=false;
 for(let i=0;i<19;i++){
  tick(1);for(const blade of danteStyleState(dino.dante).swords){
   if(Math.abs(blade.x-(dino.x+dino.w/2))>125||Math.abs(blade.tx-(dino.x+dino.w/2))>220)throw Error('phantom overreached');
   if(blade.phase==='slash'){
    freeHilt ||= blade.x>dino.x+dino.w/2;
    independentCut ||= Math.abs(blade.angle-dswPose(dino,blade.attack,blade.attack.age).angle)>.2;
   }
  }
 }
 if(!freeHilt||!independentCut)throw Error('supporting blades still attached to back or copying weapon rig');
 if(far.hp!==1000)throw Error('phantom targeted distant enemy');tick(16);if(danteStyleState(dino.dante).swords.length)throw Error('phantom lifetime');
 reset(0);danteKey('KeyJ',false);keys.KeyJ=false;tick(2);if(danteStyleState(dino.dante).swords.length)throw Error('gunfire summoned melee swords');
 reset(0);dino.dante.arm=0;dino.isFacingLeft=true;const left=enemy(230);danteKey('KeyJ',false);keys.KeyJ=false;tick(25);if(left.hp!==996)throw Error('left-facing phantom slash '+left.hp);
 reset(0);dino.dante.arm=0;dswStart('high');danteSwordStart();tick(8);const blade=danteStyleState(dino.dante).swords[0];
 if(blade.move.kind!=='rise'||blade.phase!=='slash')throw Error('upward support cut');
 const bx=blade.x,origin=blade.origin.x;dino.x+=180;tick(1);if(Math.abs(blade.x-bx)>30||blade.origin.x!==origin)throw Error('released support sword dragged along with player');
 paused=true;const stroke=blade.stroke;tick(4);paused=false;if(blade.stroke!==stroke)throw Error('support cut advanced while paused');
 danteKey('KeyL',false);tick(1);if(danteStyleState(dino.dante).swords.length)throw Error('guard-cancelled melee left damaging swords');
 reset(0);dino.dante.arm=0;dswStart('a1');danteSwordStart();const forming=danteStyleState(dino.dante).swords[0];
 const formingX=forming.x;dino.x+=50;tick(1);if(Math.abs(forming.x-formingX-50)>.001||forming.origin)throw Error('rear formation failed to follow before launch');
 tick(4);if(!forming.launched)throw Error('support sword not released');dino.dante.attack=null;const outOfReach=enemy(700);dino.x+=400;tick(8);if(outOfReach.hp!==1000)throw Error('released blades swept across the world after owner moved');
 // A long, repeated stab action still adds only one damage event per support sword.
 const stabHp=[];
 for(const style of [2,0]){reset(style);dino.dante.arm=0;styleRankIdx=6;const o=enemy(490,150);o.h=250;dswStart('million');tick(29);stabHp.push(o.hp);}
 if(stabHp[0]-stabHp[1]!==4)throw Error('multi-hit action multiplied or lost support damage '+stabHp);
 reset(0);dino.dante.arm=0;styleRankIdx=6;danteKey('KeyJ',false);keys.KeyJ=false;
 const group=danteStyleState(dino.dante).swords.slice();while(dino.dante.attack.age<4)tick(1);
 if(group[0].stroke!==1||group.slice(1).some(b=>b.launched))throw Error('first cut must precede delayed swords');
 while(dino.dante.attack.age<7)tick(1);if(group[1].stroke!==1||group[0].stroke!==5||group[2].launched)throw Error('cuts not sequenced three frames apart');
 while(dino.dante.attack)tick(1);if(!danteStyleState(dino.dante).swords.includes(group[3])||group[3].stroke<1||group[3].stroke>=16)throw Error('last support cut truncated at end of main attack');
 tick(12);if(danteStyleState(dino.dante).swords.length)throw Error('delayed cuts never expired');
 // Fast combo input preserves the pending cuts of the previous group.
 reset(0);dino.dante.arm=0;styleRankIdx=6;dswStart('a1');danteSwordStart();tick(10);const previousGroup=danteStyleState(dino.dante).swords.slice();
 dswStart('a2');danteSwordStart();if(danteStyleState(dino.dante).swords.length!==8||!previousGroup.every(b=>danteStyleState(dino.dante).swords.includes(b)))throw Error('next combo deleted pending cuts');
 tick(40);if(danteStyleState(dino.dante).swords.length)throw Error('combo groups never expired');
 // Hit interruption clears both active and waiting swords; invulnerability does not.
 reset(0);dino.dante.arm=0;styleRankIdx=6;dswStart('a1');danteSwordStart();tick(7);dino.invincible=true;dino.invTimer=20;dino.takeDamage(1);
 if(!danteStyleState(dino.dante).swords.length||dino.hp!==10)throw Error('invulnerability removed swords');
 dino.invincible=false;dino.invTimer=0;dino.takeDamage(1);if(dino.hp!==9||danteStyleState(dino.dante).swords.length)throw Error('damage did not cancel pending swords');
 reset(0);dino.dante.arm=0;dswStart('a1');danteSwordStart();dino.dante.arm=4;tick(1);if(danteStyleState(dino.dante).swords.length)throw Error('swords leaked across weapons');
 // Drill heads converge, all swords launch together and stay with Stinger's movement.
 for(const dir of [1,-1]){
  reset(0);dino.dante.arm=0;styleRankIdx=6;dino.isFacingLeft=dir<0;dswStart('stinger');danteSwordStart();tick(8);
  const drill=danteStyleState(dino.dante).swords;
  if(drill.length!==4||drill.some(b=>!b.isDrill||b.stroke!==3))throw Error('Stinger drill not simultaneous');
  if(Math.max(...drill.map(b=>b.tx))-Math.min(...drill.map(b=>b.tx))>.001)throw Error('drill tips do not converge');
  for(const b of drill){const rx=b.x+b.dir*Math.cos(b.angle)*b.len,ry=b.y+Math.sin(b.angle)*b.len*b.flat;if(Math.hypot(rx-b.tx,ry-b.ty)>.001)throw Error('drill drawing / hitbox mismatch');}
  const x=drill[0].origin.x;dino.x+=dir*80;tick(1);if(drill[0].origin.x!==x+dir*80)throw Error('drill did not follow Stinger');
 }
 // Shared combo IDs must not turn a bike slam / ice slam into punch drills or fan stabs.
 for(const [move,expected] of [[{...BLR_MOVES.j3,id:'j3',balrog:true},'cut'],[{...BLR_MOVES.j4,id:'j4',balrog:true},'drill'],[{...CAV_MOVES.j3,id:'j3',cavaliere:true},'cut'],[{...KCB_MOVES.j3,id:'j3',cerberus:true},'fan'],[{...KCB_MOVES.j4,id:'j4',cerberus:true},'cut']]){
  if(danteSwordMove(move).kind!==expected)throw Error('shared weapon ID misclassified '+move.name);
 }
 reset(0);dino.dante.arm=0;styleRankIdx=6;dswStart('million');danteSwordStart();const fan=danteStyleState(dino.dante).swords.slice();tick(1);
 if(fan[0].stroke!==1||fan.slice(1).some(b=>b.launched))throw Error('fan start timing');while(dino.dante.attack.age<3)tick(1);if(fan[1].stroke!==1)throw Error('fan two-frame delay');
 danteSetStyle(1);if(danteStyleState(dino.dante).swords.length)throw Error('phantoms survived style change');
 for(const [arm,start] of [[1,()=>blrStart('j1')],[2,()=>cavStart('j1')],[3,()=>kcbStart('j1')],[5,()=>{keys.KeyS=true;faustCommand(true,0);}]]){
  reset(0);dino.dante.arm=arm;start();tick(1);if(danteStyleState(dino.dante).swords.length!==1)throw Error('missing melee phantom for arm '+arm);
 }
 reset(0);dino.dante.arm=5;faustCommand(true,60);tick(1);if(danteStyleState(dino.dante).swords.length)throw Error('meteor summoned melee swords');
 result.push('sequential cuts and finishing tails / fan delays / converging Stinger drill / exact rank damage / interruption');
 for(const style of [0,1,2,3]){
  reset(style);eiCommand(false,0);eiTick();const q=dino.dante.rounds[0];
  if(q.damage!==(style===1?2:1)||q.color!==danteBulletColor(dino.dante))throw Error('E&I base/GS output');
  reset(style);dino.dante.arm=5;faustCommand(false,0);faustTick();const r=dino.dante.rounds[0];
  if(r.damage!==(style===1?2:1)||r.color!==danteBulletColor(dino.dante))throw Error('Faust base/GS output');
 }
 for(const style of [1,2]){
  reset(style);dino.dante.arm=5;faustCommand(true,60);tick(61);
  const f=faustState(dino.dante);if(f.meteors.length+f.impacts.filter(i=>i.meteor).length!==(style===1?4:3))throw Error('Gunslinger extra meteor');
 }
 result.push('ranged base 1 / red GS 2 / extra meteor');
 reset(2);const boss=enemy(344);enemies.length=0;bosses.push(boss);boss.state='charging';danteKey('KeyL',false);
 checkCollisions();const s=danteStyleState(dino.dante),stored=Math.max(1,Math.round(parryDamage(boss,true)*.5));
 if(s.bank!==stored||dino.shieldCd!==0||dino.hp!==10)throw Error('perfect melee rush guard '+s.bank);
 frames++;checkCollisions();if(s.bank!==stored)throw Error('same rush credited twice');
 keys.KeyL=false;danteKey('KeyL',false);
 const shot={x:dino.x+dino.w+3,y:dino.y+15,w:6,h:6,dmg:3,vx:-5,vy:0};bossProjectiles.push(shot);checkCollisions();
 if(bossProjectiles.includes(shot)||s.bank!==stored*2||dino.hp!==10||dino.shieldCd!==0)throw Error('perfect projectile guard');
 tick(8);const old=s.bank;bossProjectiles.push({x:dino.x+dino.w+3,y:dino.y+15,w:6,h:6,dmg:3});checkCollisions();
 if(s.bank!==old)throw Error('late block must not store');
 tick(30);dino.invincible=false;dino.takeDamage(1);if(dino.hp!==9)throw Error('guard never expired');
 reset(2);enemy();danteKey('KeyL',false);tick(8);const state=danteStyleState(dino.dante);dino.takeDamage(2);
 if(state.bank!==0||state.guardReady===frames)throw Error('normal block reset cooldown');
 reset(2);const customBoss=enemy();danteKey('KeyL',false);parry();const customBank=danteStyleState(dino.dante).bank;frames++;parry();
 if(customBank<=0||danteStyleState(dino.dante).bank!==customBank)throw Error('shared boss parry / sustained contact');
 reset(2);enemy();danteKey('KeyL',false);bossProjectiles.push({x:dino.x+10,y:dino.y+15,w:8,h:8,dmg:2,isPiercing:true});checkCollisions();
 if(dino.hp!==10||danteStyleState(dino.dante).bank<=0)throw Error('perfect piercing guard');
 reset(2);enemy();danteKey('KeyL',false);tick(8);dino.invincible=false;bossProjectiles.push({x:dino.x+10,y:dino.y+15,w:8,h:8,dmg:2,isPiercing:true});checkCollisions();
 if(dino.hp!==8||danteStyleState(dino.dante).bank!==0)throw Error('late piercing block should fail');
 // Dash L releases the stored amount once to one enemy; switching cannot leave a stuck action.
 reset(2);const target=enemy(365),other=enemy(380);danteStyleState(dino.dante).bank=40;doDash(1);danteKey('KeyL',false);tick(30);
 if(target.hp!==960||other.hp!==1000||danteStyleState(dino.dante).bank!==0)throw Error('Royal Release exact damage / one target');
 if(!danteStyleState(dino.dante).royalFx?.wave||shakeTimer<18||dino.dante.body._faustLegs)throw Error('Royal pressure wave / pose recovery');
 const oldMidas=midasVeDam,oldFist=midasVeNamDam;let fists=0;
 try{midasVeDam=midasVeNamDam=()=>{fists++;};danteDraw(dino);}finally{midasVeDam=oldMidas;midasVeNamDam=oldFist;}
 if(fists||target.hp!==960)throw Error('Royal visual drew Midas fist or applied damage');
 tick(60);if(danteStyleState(dino.dante).royalFx)throw Error('counter visual expiry');
 danteStyleState(dino.dante).bank=20;dashCd=0;doDash(1);danteKey('KeyL',false);danteKey('KeyO',false);
 if(dino.dante.attack?.royal||dino.isShielding())throw Error('release/guard leaked after switching');
 for(const power of [29,30]){
  reset(2);const o=enemy(365);danteStyleState(dino.dante).bank=power;doDash(1);danteKey('KeyL',false);tick(8);
  const fx=danteStyleState(dino.dante).royalFx;
  if(fx.wave!==(power>=30)||o.hp!==1000-power)throw Error('Royal wave threshold / stored damage');
  for(let i=0;i<3;i++)danteDraw(dino);if(o.hp!==1000-power)throw Error('Royal effect applied extra damage');
 }
 result.push('perfect melee/projectile, no duplicate, cooldown/expiry, exact release, hand-free wave at 30');
 reset(3);const t=enemy(440);const start=dino.x;doDash(1);
 if(dashVx<30||afterimages.length)throw Error('Trickster dash range / Dino decoy leak');
 dino.x=355;tick(1);if(dino.x<=t.x+t.w||!dino.isFacingLeft||danteStyleState(dino.dante).ghosts.length<2)throw Error('dash cross-behind');
 reset(3);enemy(500);keys.KeyS=true;danteKey('Space',false);
 if(dino.x>=500||dino.x<=400||!dino.invincible||dino.invTimer<8)throw Error('down jump front teleport');
 if(dino.dy>=0||dino.grounded)throw Error('teleport must jump upwards');
 const x=dino.x;danteKey('Space',false);if(dino.x!==x)throw Error('teleport cooldown');
 reset(3);enemy(500);danteKey('KeyS',false);keys.KeyS=false;tick(75);danteKey('Space',false);
 if(dino.x<=400||dino.dy>=0||dino.grounded||danteStyleState(dino.dante).crouchArmed)throw Error('crouch released then jump / consume input');
 reset(3);enemy(500);danteKey('ArrowDown',false);keys.ArrowDown=false;danteSetStyle(1);danteSetStyle(3);danteKey('Space',false);if(dino.x!==300)throw Error('crouch buffer leaked across styles');
 reset(3);const wallTarget=enemy(500);platforms.push({x:435,w:50,top:200,h:150,pillar:true});keys.KeyS=true;danteKey('Space',false);
 if(dino.x!==300)throw Error('teleport into solid');
 reset(3);const near=enemy(500);doDash(1);dino.x=near.x-dino.w-2*CM;tick(1);if(dino.x!==near.x-dino.w-2*CM)throw Error('2cm threshold must be strict');
 reset(0);doDash(1);if(dashVx>23)throw Error('Trickster range leaked to Swordmaster');
 result.push('Trickster ghosts, 2cm threshold, front/back teleports, i-frames and solids');
 reset(1);for(let i=0;i<4;i++){danteKey('KeyO',false);}if(danteStyle()!==1)throw Error('four-style cycle');
 danteKey('KeyI',false);if(danteStyle()!==0)throw Error('reverse style cycle');
 reset(1);dino.dante.arm=5;danteKey('KeyK',false);keys.KeyK=false;danteRelease();spawnTimerCactus=spawnTimerEnemy=99999;
 const bp={x:dino.x+dino.w+5,y:dino.y+15,w:4,h:4,vx:3,vy:0,dmg:1,update(){this.x+=this.vx;},draw(){}};bossProjectiles.push(bp);
 const before=stylePoints;loop();if(stylePoints<=before||hitstopTimer!==0)throw Error('Faust near-miss hitch regression '+[stylePoints,before,hitstopTimer]);
 result.push('Faust graze reward retained without global freeze');
 const saved=combatStance;gameState='menu';xDatForm(0);if(danteOn())throw Error('exit Dante');
 currentShieldType=0;startGame('normal');dino.meleeTimer=10;if(!dino.isShielding())throw Error('Dino guard was replaced');
 return result;
 }"""))
 # Actual keyboard input and live movement must produce the four support hits too.
 pg.evaluate("""()=>{xDatForm(9);startGame('normal');danteSetStyle(0);dino.x=300;dino.dante.arm=0;stylePoints=350;styleRankIdx=6;
 spawnTimerCactus=spawnTimerEnemy=99999;
 window.liveSwordTarget={x:365,y:260,w:40,h:60,hp:1000,maxHp:1000,dy:0,grounded:true,facingLeft:true,state:'idle',lastMeleeHit:-1,update(){},draw(){},takeDamage(d){this.hp-=d;}};
 enemies.push(liveSwordTarget);}""")
 pg.keyboard.press('j');pg.wait_for_timeout(600)
 assert pg.evaluate('liveSwordTarget.hp===993 && danteStyleState(dino.dante).swords.length===0'),pg.evaluate('liveSwordTarget.hp')
 # Exercise the actual keydown/keyup path: crouch is already released on jump.
 pg.evaluate("()=>{xDatForm(9);startGame('normal');danteSetStyle(3);dino.x=300;enemies.push({x:500,y:260,w:40,h:60,hp:100,maxHp:100,grounded:true,facingLeft:true,update(){},draw(){}});}")
 pg.keyboard.press('s');pg.wait_for_timeout(100);pg.keyboard.press('Space');pg.wait_for_timeout(40)
 assert pg.evaluate('dino.x>400 && dino.y<260 && dino.dy<0 && !dino.grounded')
 for style in range(4):
  pg.evaluate(f"()=>{{xDatForm(9);startGame('normal');danteSetStyle({style});}}")
  pg.wait_for_timeout(80)
  assert pg.evaluate('_loiKhung.size===0')
 # Old Devil Arms still start and draw their own attacks.
 for arm in [0,1,2,3,5]:
  pg.evaluate(f"()=>{{startGame('normal');paused=true;dino.dante.arm={arm};danteKey('KeyJ',false);for(let i=0;i<35;i++){{danteTick();danteDraw(dino);}}}}")
 # Tyrant Rex must spawn through the real encounter loop, including retries and Dante.
 # Missing BCR_W/BCR_H used to throw before the boss could enter the arena.
 for form in [0,9]:
  for retry in range(2):
   pg.evaluate(f"()=>{{xDatForm({form});testBossSelection=64;startGame('test_boss');paused=false;bossWaitTimer=0;dino.invincible=true;dino.invTimer=99999;}}")
   pg.wait_for_function("bosses.length===1&&bosses[0] instanceof TyrantRexBoss&&bosses[0].state!=='entering'",timeout=8000)
   assert pg.evaluate("bosses[0].w===168&&bosses[0].h===132&&bosses[0].baseY===188&&_loiKhung.size===0")
 pg.screenshot(path='/tmp/tyrant-rex-fixed.png')
 print('Tyrant Rex',pg.evaluate("""()=>{
  paused=true;const b=bosses[0];
  for(const phase of [1,2])for(const skill of ['gam','can','giam','quet','huc','nhay']){
   b.phase=phase;b.hp=b.maxHp=190;b.state=skill;b.subTimer=0;b.hit=false;b.x=600;b.y=b.baseY;b.dy=0;b.grounded=true;b.hung=0;
   for(let i=0;i<180;i++){frames++;b.update();b.draw();if(![b.x,b.y,b.w,b.h].every(Number.isFinite))throw Error('invalid Tyrant geometry '+skill);}
  }
  return 'spawn/retry with Dino and Dante; both phases and all six attacks passed';
 }"""))
 # Mode/retry and switching regressions.
 pg.evaluate('xDatForm(9)')
 for mode in ['normal','boss_rush','test_boss']:
  pg.evaluate(f"startGame('{mode}')");assert pg.evaluate('!!dino.dante && dino.maxHp===10')
 pg.evaluate("startGame('pvp')");assert pg.evaluate('!danteOn()&&!dino.dante')
 pg.evaluate("()=>{xDatForm(0);startGame('normal');}");assert pg.evaluate('!dino.dante')
 assert not errors,errors
 print('PASS syntax, reload/start, 7 pistol branches, directional dash combos, Faust gun/orbit/hat/meteor damage, 10 form menus, live input, restart modes and PvP exclusion');b.close()
