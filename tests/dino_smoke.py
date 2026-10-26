"""Dino browser regression smoke test.

Requires Python Playwright and Chromium. Start the repository's HTTP server on
port 8000 first, then run: python3 tests/dino_smoke.py
"""
from pathlib import Path
from html.parser import HTMLParser
import subprocess
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
 pg.goto('http://127.0.0.1:8000/games/Dino/index.html');pg.wait_for_timeout(400)
 pg.evaluate("xDatForm(9)");pg.reload();pg.wait_for_timeout(400)
 print('saved Dante reload',pg.evaluate("()=>{startGame('normal');return {ok:danteOn()&&!!dino.dante&&dino.h===60&&dino.maxHp===10,feet:dino.y+dino.h}}"));assert pg.evaluate('danteOn()&&!!dino.dante&&dino.h===60')
 pg.wait_for_timeout(500);assert pg.evaluate('_loiKhung.size===0')
 # Test each contextual branch without RAF advancing between assertions.
 result=pg.evaluate('''()=>{
 paused=true;const results=[];const reset=()=>{for(const k of Object.keys(keys))delete keys[k];dino.dante.attack=null;dino.dante.cd=0;dino.dante.rounds=[];dino.dante.arm=4;dino.grounded=true;combatStance=0;};
 function run(special,charge,expected){eiCommand(special,charge);const a=dino.dante.attack;if(!a||a.id!==expected)throw Error('expected '+expected);for(let i=0;i<EI_MOVES[expected].T;i++)eiTick();const q=dino.dante.rounds;if(!q.length)throw Error('no shots');results.push([expected,q.length,q.every(r=>Number.isFinite(r.vx)&&Number.isFinite(r.vy))]);return q;}
 reset();run(false,0,'shot');reset();let q=run(true,0,'twosome');if(!(q.some(r=>r.vx>0)&&q.some(r=>r.vx<0)))throw Error('both directions');
 reset();keys.KeyS=true;run(true,0,'honeycomb');reset();dino.grounded=false;dino.dante.ebony.rainUsed=false;q=run(true,0,'rain');if(!q.every(r=>r.vy>0))throw Error('rain must shoot down');
 dino.dante.cd=0;dino.dante.attack=null;eiCommand(true,0);if(dino.dante.attack.id==='rain')throw Error('infinite hover');
 reset();q=run(true,45,'charge');if(!q.every(r=>r.damage===6&&r.kind==='ei-charge'))throw Error('charge damage');reset();combatStance=1;run(true,0,'twin');
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
 reset();enemies.length=0;danteKey('KeyK',false);doDash(1);keys.KeyK=false;step(48);
 if(dino.dante.attack||!Number.isFinite(dino.y))throw Error('no-target vault');
 reset();dashCd=20;danteKey('KeyK',false);doDash(1);
 if(dino.dante.attack?.id==='vault'||dino.dante.k===null)throw Error('failed dash consumed charge');
 reset();doDash(1);frames+=25;dashVx=0;danteKey('KeyJ',false);
 if(dino.dante.attack?.id!=='shot')throw Error('expired dash input');
 reset();doDash(1);paused=true;danteKey('KeyJ',false);
 if(dino.dante.attack)throw Error('paused combo');return results;
 }"""))
 # Old Devil Arms still start and draw their own attacks.
 for arm in [0,1,2,3,5]:
  pg.evaluate(f"()=>{{startGame('normal');paused=true;dino.dante.arm={arm};danteKey('KeyJ',false);for(let i=0;i<35;i++){{danteTick();danteDraw(dino);}}}}")
 # Mode/retry and switching regressions.
 for mode in ['normal','boss_rush','test_boss']:
  pg.evaluate(f"startGame('{mode}')");assert pg.evaluate('!!dino.dante && dino.maxHp===10')
 pg.evaluate("startGame('pvp')");assert pg.evaluate('!danteOn()&&!dino.dante')
 pg.evaluate("()=>{xDatForm(0);startGame('normal');}");assert pg.evaluate('!dino.dante')
 assert not errors,errors
 print('PASS syntax, reload/start, 7 pistol branches, directional dash combos, real damage, 10 form menus, live input, restart modes and PvP exclusion');b.close()
