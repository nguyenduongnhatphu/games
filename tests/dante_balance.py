"""Dante damage, boss counterplay and mid-combo swapping regression checks."""
import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);pg=b.new_page();errors=[];pg.on('pageerror',lambda e:errors.append(str(e)))
 pg.goto(os.environ.get('DINO_TEST_URL','http://127.0.0.1:8000')+'/games/Dino/index.html');pg.wait_for_timeout(300)
 print(pg.evaluate('''()=>{
 function reset(arm=0){for(const k of Object.keys(keys))delete keys[k];xDatForm(9);startGame('normal');paused=false;dino.x=300;dino.y=260;dino.grounded=true;dino.dante.arm=arm;}
 function enemy(boss=false,state='idle'){const o={x:350,y:260,w:40,h:60,hp:1000,maxHp:1000,dy:0,grounded:true,state,calls:0,update(){this.calls++;}};(boss?bosses:enemies).push(o);return o;}
 function tick(n){for(let i=0;i<n;i++){frames++;danteTick();}}
 function near(a,b){return Math.abs(a-b)<1e-6;}
 for(const [arm,want] of [[0,10],[1,8],[2,7.5],[3,8],[4,10],[5,8]]){reset(arm);const o=enemy();danteHit(dino.dante,o,10);if(!near(1000-o.hp,want))throw Error('weapon damage '+arm);}
 if(DSW_MOVES.a1.T!==20||EI_MOVES.shot.T!==8||BLR_MOVES.j1.T!==25||CAV_MOVES.j1.T!==33||KCB_MOVES.j1.T!==22||FAUST_MOVES.shot.T!==13)throw Error('attack timing balance');
 // Repeated pulls/holds cannot extend the absolute boss CC deadline.
 reset();const boss=enemy(true);const original=boss.update;let locked=0;
 for(let i=0;i<300;i++){
  frames++;const ctrl=dswControl(boss,{hold:true,launch:true});if(ctrl){ctrl.stun=999;locked++;}
  boss.update();
 }
 if(boss.calls<220||locked>75)throw Error('boss AI starved '+[boss.calls,locked]);
 reset(2);const attacking=enemy(true,'charging'),x=attacking.x,y=attacking.y;
 cavStart('j1');for(let pulse=0;pulse<4;pulse++)cavStrike(dino,dino.dante,cavState(dino.dante),dino.dante.attack,pulse);
 if(attacking._dswControl||attacking.x!==x||attacking.y!==y||attacking.hp>=1000)throw Error('ordinary grind moved or stopped attacking boss');
 reset();const finisher=enemy(true,'charging');dswStart('high');dswControl(finisher,{launch:true});
 for(let i=0;i<6;i++){frames++;finisher.update();}
 if(finisher._dswControl||finisher.calls!==1||dswControl(finisher,{hold:true}))throw Error('finisher failed short stun / resistance');
 // Swapping cannot clear the per-boss resistance window.
 danteSwapWeapon(1);tick(20);if(dswControl(finisher,{launch:true}))throw Error('weapon swap reset boss resistance');
 // Mobs still allow expressive launch/juggle control.
 reset();const mob=enemy();if(!dswControl(mob,{launch:true})?.air)throw Error('mob launcher removed');
 // All six weapons can be swapped during an accepted attack, with one buffered tap.
 const starters=[()=>dswStart('a1'),()=>blrStart('j1'),()=>cavStart('j1'),()=>kcbStart('j1'),()=>eiCommand(false,0),()=>faustCommand(true,0)];
 for(let arm=0;arm<6;arm++){
  reset(arm);starters[arm]();if(!dino.dante.attack)throw Error('starter '+arm);
  danteKey('KeyE',false);if(dino.dante.arm!==(arm+1)%6||dino.dante.attack)throw Error('mid-combo swap '+arm);
  danteKey('KeyJ',false);keys.KeyJ=false;if(!dino.dante.swapInput||dino.dante.attack)throw Error('swap recovery bypass');
  tick(20);if(!dino.dante.attack||keys.KeyJ)throw Error('buffered tap lost or stuck '+arm);
 }
 reset(5);faustCommand(true,60);tick(22);danteKey('KeyQ',false);if(dino.dante.arm!==4||faustState(dino.dante).meteors.length||faustState(dino.dante).lock)throw Error('swap did not cancel channel');
 reset(0);const delayed=enemy();dino.dante.rounds.push({arm:5,x:345,y:280,vx:4,vy:0,r:5,kind:'bullet',damage:4,life:10,age:0,hit:new Set()});tick(1);
 if(!near(delayed.hp,996.8))throw Error('Faust bullet lost source after swap');
 reset(0);const bikeTarget=enemy(),c=cavState(dino.dante);c.thrownBike={x:370,y:320,dir:1,vx:0,t:0,hit:new Set(),damage:8};cavTick(dino,dino.dante);
 if(!near(bikeTarget.hp,994))throw Error('bike lost source after swap');
 reset(2);const swordTarget=enemy();dswState(dino.dante).waves.push({x:340,y:285,dir:1,vy:0,scale:1,t:0,hit:new Set(),damage:3});dswTick(dino,dino.dante);if(!near(swordTarget.hp,997))throw Error('DSD wave nerfed after swap');
 return 'PASS damage/timing, finite boss CC and AI counterplay, no swap reset, 6 weapon swaps, buffered input and delayed damage origins';
 }'''))
 pg.evaluate("()=>{xDatForm(9);startGame('normal');dino.dante.arm=0;spawnTimerCactus=spawnTimerEnemy=99999;}")
 pg.keyboard.press('j');pg.keyboard.press('e');assert pg.evaluate('dino.dante.arm===1')
 pg.keyboard.press('j')
 pg.wait_for_function('dino.dante.attack?.balrog',timeout=2000)
 assert pg.evaluate('!keys.KeyJ')
 assert not errors,errors
 b.close()
