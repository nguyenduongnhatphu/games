"""Playable DT -> SDT -> Judgement resource, damage and input regressions."""
import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);pg=b.new_page(viewport={'width':1100,'height':800});errors=[];pg.on('pageerror',lambda e:errors.append(str(e)))
 pg.goto(os.environ.get('DINO_TEST_URL','http://127.0.0.1:8000')+'/games/Dino/index.html');pg.wait_for_timeout(300)
 print(pg.evaluate('''()=>{
 function reset(){for(const k of Object.keys(keys))delete keys[k];xDatForm(9);startGame('normal');paused=false;dino.x=300;dino.y=260;dino.grounded=true;dino.isFacingLeft=false;spawnTimerCactus=spawnTimerEnemy=99999;}
 function target(x=440,y=260,w=40,h=60){const o={x,y,w,h,hp:2000,maxHp:2000,dy:0,grounded:true,facingLeft:true,state:'idle',update(){},draw(){}};enemies.push(o);return o;}
 function tick(n){for(let i=0;i<n;i++){frames++;danteTick();}}
 function enter(){ultCharge=100;dino.dante.sinCharge=100;danteKey('KeyU',false);if(dino.dante.dt!==600)throw Error('DT 10 seconds');danteKey('KeyU',false);if(dino.dante.sinTime!==900)throw Error('SDT entry');}
 function near(a,b){return Math.abs(a-b)<1e-6;}
 reset();const p=dino.dante,o=target();ultCharge=99;danteHit(p,o,10);if(danteSinCharge(p)!==0||ultCharge!==100)throw Error('SDT charged before DT full');
 danteHit(p,o,10);if(!near(danteSinCharge(p),3.5))throw Error('SDT overflow charge');o.invulnAll=true;danteHit(p,o,100);if(!near(danteSinCharge(p),3.5))throw Error('blocked hit charged SDT');o.invulnAll=false;
 danteKey('KeyU',false);danteKey('KeyU',false);if(!p.dt||danteSin(p))throw Error('SDT entered without charge');danteHit(p,o,10);if(!near(danteSinCharge(p),3.5))throw Error('SDT charged during DT');
 reset();dino.dante.arm=5;danteSetStyle(2);enter();const sin=dino.dante;
 for(const key of ['KeyQ','KeyE','KeyI','KeyO'])danteKey(key,false);
 danteSwapWeapon(1);danteSetStyle(3);if(sin.arm!==0||sin.style!==0||ultCharge!==0||sin.dt)throw Error('SDT loadout lock');
 paused=true;const time=sin.sinTime;for(let i=0;i<30;i++)danteSinTick();if(sin.sinTime!==time)throw Error('paused SDT drain');paused=false;
 const left=target(360,245,30,70),right=target(405,245,30,70);danteKey('KeyJ',false);keys.KeyJ=false;
 if(sin.attack.damage<=6||danteStyleState(sin).swords.length!==6)throw Error('SDT sword/support upgrade');tick(40);
 if(!near(4000-left.hp-right.hp,25.2)||right.hp>=2000||ultCharge!==0)throw Error('SDT sword AoE / resource refill '+[left.hp,right.hp,ultCharge]);
 tick(900);if(danteSin(sin)||sin.arm!==5||sin.style!==2||sin.body._sin)throw Error('SDT expiry failed loadout restore');
 reset();enter();const energyTarget=target(500,0,100,500);danteKey('KeyK',false);tick(110);
 if(dino.dante.sinShotCount!==200||!near(energyTarget.hp,1600)||dino.dante.sinTime>100||dino.dante.sinTime<=0)throw Error('energy cap/damage/drain '+[dino.dante.sinShotCount,energyTarget.hp,dino.dante.sinTime]);
 danteKey('KeyK',false);tick(1);if(dino.dante.sinShotCount!==200)throw Error('energy cap reset on repress');keys.KeyK=false;
 reset();enter();const drillTarget=target(400);doDash(1);if(dino.x<=drillTarget.x+drillTarget.w||dashCd!==0||!dino.isFacingLeft)throw Error('SDT dash cross-behind');
 doDash(-1);if(dashCd!==0)throw Error('continuous dash cooldown');danteKey('KeyK',false);keys.KeyK=false;
 if(!dino.dante.attack?.sinDrill)throw Error('Dash K drill');tick(28);if(drillTarget.hp>=2000||dino.dante.attack)throw Error('drill hit / recovery');
 reset();enter();dswStart('stinger');if(!dino.dante.attack?.sinDrill)throw Error('Stinger did not become drill');
 for(const resource of [900,450,1]){
  reset();enter();const victim=target(),far=target(1500);dino.dante.sinTime=resource;danteKey('KeyU',false);
  const j=dino.dante.judgement,total=50+450*resource/900;
  if(!near(j.total,total)||dino.dante.sinTime||ultCharge||danteSinCharge())throw Error('Judgement resource snapshot');
  danteKey('KeyU',false);if(dino.dante.judgement!==j)throw Error('Judgement repeat');tick(11);if(victim.hp!==2000)throw Error('premature damage');
  for(let i=0;i<4;i++){tick(i?18:1);if(!near(victim.hp,2000-total*.15*(i+1)))throw Error('four slash subtotal '+i);danteDraw(dino);}
  tick(52);if(!near(victim.hp,2000-total)||far.hp!==2000)throw Error('Judgement total / range '+[victim.hp,total]);
  danteDraw(dino);tick(22);if(danteSin()||dino.dante.judgement||dino.dante.body._sin)throw Error('Judgement never ended');
 }
 reset();enter();danteKey('KeyK',false);startGame('normal');if(danteSin()||danteSinCharge()||dino.dante.sinBullets?.length)throw Error('SDT leaked after restart');
 return 'PASS SDT charge gate, DT entry, locked loadout, sword AoE, 200 particles x 2, rapid drain, dash/drill, exact 50-500 Judgement and cleanup';
 }'''))
 # Exercise native keyboard events and capture the actual SDT rig.
 pg.evaluate("()=>{for(const k of Object.keys(keys))delete keys[k];xDatForm(9);startGame('normal');ultCharge=100;dino.dante.sinCharge=100;spawnTimerCactus=spawnTimerEnemy=99999;}")
 pg.keyboard.press('u');pg.keyboard.press('u');pg.wait_for_timeout(60);assert pg.evaluate('danteSin()&&dino.dante.arm===0')
 pg.screenshot(path='/tmp/dante-sdt-live.png')
 pg.keyboard.press('u');pg.wait_for_timeout(1700);pg.screenshot(path='/tmp/dante-judgement-live.png');pg.wait_for_timeout(1000);assert pg.evaluate('!danteSin()')
 assert not errors,errors
 b.close()
