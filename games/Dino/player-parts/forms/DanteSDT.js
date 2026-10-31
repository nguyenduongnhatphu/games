// PLAYER_FILE: DanteSDT
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CM, DSW_MOVES, Effect, SDT_ULT, SFX, checkAABB, combatStance, ctx, danteDraw, danteDrawSword, danteGhost, danteHit, danteKey, danteLabel, danteOn, danteSetStyle, danteStyle, danteStyleLive, danteStyleState, danteSwapWeapon, danteSwordCount, danteSwordPose, danteTeleport, danteTick, dashCd, dashVx, dino, doDash, dojoMode, drawDantePlayerBody, drawSdtDante, drawUI, dswFloor, dswPose, dswReleaseHolds, dswStart, dswState, faustReset, frames, keys, mapTheme, paused, resolveSolidPillars, resolveTetrisWalls, sgDamage, sgSegmentBox, sgTargets, shakeTimer, ultCharge, veCanhKhoan, visualEffects, worldL, worldR
// index.html:111162 · Phạm vi: global
// PLAYER_PART_BEGIN s16.DANTE_SIN_MAX.1 EDITABLE
const DANTE_SIN_MAX=900,DANTE_SIN_PARTICLES=200;
// PLAYER_PART_END s16.DANTE_SIN_MAX.1

// index.html:111163 · Phạm vi: global
// PLAYER_PART_BEGIN s16.DANTE_SIN_DRILL.1 EDITABLE
const DANTE_SIN_DRILL={length:150,radius:48,rear:27,palette:{bd:'#24080c',dk:'#110507',lt:'#9a1b21',out:'#ff5722',rim:'#ffc400',eye:'#ffe0b2'}};
// PLAYER_PART_END s16.DANTE_SIN_DRILL.1

// index.html:111164 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteDrawSinDrill.1 EDITABLE
function danteDrawSinDrill(cx,cy,dir,age){veCanhKhoan(cx,cy,dir<0?Math.PI:0,age,DANTE_SIN_DRILL.palette);}
// PLAYER_PART_END s16.danteDrawSinDrill.1

// index.html:111165 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSinDrillBox.1 EDITABLE
function danteSinDrillBox(fromX,toX,cy,dir){
 const {length,radius,rear}=DANTE_SIN_DRILL;
 return {x:Math.min(fromX,toX)-(dir<0?length:rear),y:cy-radius,w:Math.abs(toX-fromX)+length+rear,h:radius*2};
}
// PLAYER_PART_END s16.danteSinDrillBox.1

// index.html:111169 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSin.1 EDITABLE
function danteSin(p=dino?.dante){return !!(p&&(p.sinTime>0||p.judgement));}
// PLAYER_PART_END s16.danteSin.1

// index.html:111170 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSinCharge.1 EDITABLE
function danteSinCharge(p=dino?.dante){return p?.sinCharge||0;}
// PLAYER_PART_END s16.danteSinCharge.1

// index.html:111171 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSinClean.1 EDITABLE
function danteSinClean(p){
 p.attack=null;p.k=null;p.cd=0;p.swapInput=null;p.swapReady=0;p.rounds=[];
 for(const s of [p.sword,p.balrog,p.cavaliere,p.cerberus])if(s){s.queue=[];s.airSlow=0;s.last='';}
 if(p.sword){dswReleaseHolds(p.sword);p.sword.round=null;p.sword.waves=[];p.sword.pose=null;p.sword.trail=[];}
 faustReset(p);const s=danteStyleState(p);s.swords=[];s.release=null;s.guardUntil=s.perfectUntil=-100;
 p.body._swordLean=p.body._swordLunge=0;p.body._swordTurn=1;p.body._faustLegs=null;p.body._sinDrill=false;p.body._gunRoll=0;
}
// PLAYER_PART_END s16.danteSinClean.1

// index.html:111178 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSinEnter.1 EDITABLE
function danteSinEnter(){
 const p=dino?.dante,charge=danteSinCharge(p);if(!p||!danteStyleLive()||paused||danteSin(p)||!(charge>0))return false;
 const saved={arm:p.arm,style:danteStyle(p)};danteSinClean(p);p.sinSaved=saved;p.dt=0;p.sinCharge=0;p.sinTime=Math.max(1,Math.round(DANTE_SIN_MAX*Math.min(100,charge)/100));p.sinShotCount=0;p.sinShotReady=0;p.sinDash=-100;p.sinBullets=[];
 p.arm=0;p.style=0;combatStance=3;ultCharge=0;p.body._sin=true;dashCd=0;
 if(SFX.tone)SFX.tone(100,.2,'sawtooth',.1,500);danteLabel('SIN DEVIL TRIGGER');visualEffects.push(new Effect(dino.x+dino.w/2,dino.y+30,'charge_wave',true,2));return true;
}
// PLAYER_PART_END s16.danteSinEnter.1

// index.html:111184 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSinExit.1 EDITABLE
function danteSinExit(){
 const p=dino.dante,saved=p.sinSaved||{arm:0,style:0};danteSinClean(p);p.sinTime=0;p.judgement=null;p.sinBullets=[];p.body._sin=false;p.body._sinDrill=false;p.dt=0;p.arm=saved.arm;p.style=saved.style;combatStance=p.style===1?0:p.style===2?2:3;p.sinSaved=null;dashVx=0;ultCharge=0;
}
// PLAYER_PART_END s16.danteSinExit.1

// index.html:111187 · Phạm vi: global
// PLAYER_PART_BEGIN s16.sinHitBase.1 EDITABLE
const sinHitBase=danteHit;
// PLAYER_PART_END s16.sinHitBase.1

// index.html:111188 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteHit.1 EDITABLE
danteHit=function(p,o,damage,...args){
 const full=!o._beamClashPoint&&ultCharge>=100&&!p.dt&&!danteSin(p),dealt=sinHitBase(p,o,damage,...args);
 if(full&&dealt>0)p.sinCharge=Math.min(100,danteSinCharge(p)+dealt*.35);
 return dealt;
};
// PLAYER_PART_END s16.danteHit.1

// index.html:111193 · Phạm vi: global
// PLAYER_PART_BEGIN s16.sinSwordCountBase.1 EDITABLE
const sinSwordCountBase=danteSwordCount;
// PLAYER_PART_END s16.sinSwordCountBase.1

// index.html:111194 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSwordCount.1 EDITABLE
danteSwordCount=function(){return danteSin()?6:sinSwordCountBase();};
// PLAYER_PART_END s16.danteSwordCount.1

// index.html:111195 · Phạm vi: global
// PLAYER_PART_BEGIN s16.sinSwordStartBase.1 EDITABLE
const sinSwordStartBase=dswStart;
// PLAYER_PART_END s16.sinSwordStartBase.1

// index.html:111196 · Phạm vi: global
// PLAYER_PART_BEGIN s16.dswStart.1 EDITABLE
dswStart=function(id,...args){
 const p=dino?.dante;if(danteSin(p)&&id==='stinger'){danteSinDrill();return;}
 sinSwordStartBase(id,...args);if(danteSin(p)&&p.attack?.sword){p.attack.damage*=2.2;p.attack.name='SIN · '+p.attack.name;}
};
// PLAYER_PART_END s16.dswStart.1

// index.html:111200 · Phạm vi: global
// PLAYER_PART_BEGIN s16.sinPoseBase.1 EDITABLE
const sinPoseBase=dswPose;
// PLAYER_PART_END s16.sinPoseBase.1

// index.html:111201 · Phạm vi: global
// PLAYER_PART_BEGIN s16.dswPose.1 EDITABLE
dswPose=function(...args){const v=sinPoseBase(...args);if(args[0]?.dante&&danteSin(args[0].dante)){v.len*=1.35;v.tx=v.x+v.dir*Math.cos(v.angle)*v.len;v.ty=v.y+Math.sin(v.angle)*v.len*v.flat;v.red=true;}return v;};
// PLAYER_PART_END s16.dswPose.1

// index.html:111202 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSinBlink.1 EDITABLE
function danteSinBlink(){
 const n=dino,dir=n.isFacingLeft?-1:1;
 const target=sgTargets(n).filter(o=>{if(o._beamClashPoint)return false;const gap=dir>0?o.x-n.x-n.w:n.x-o.x-o.w;return gap>=0&&gap<2*CM&&n.y<o.y+o.h&&n.y+n.h>o.y;}).sort((a,b)=>Math.abs(a.x-n.x)-Math.abs(b.x-n.x))[0];
 return target?danteTeleport(target,true):false;
}
// PLAYER_PART_END s16.danteSinBlink.1

// index.html:111207 · Phạm vi: global
// PLAYER_PART_BEGIN s16.sinDashBase.1 EDITABLE
const sinDashBase=doDash;
// PLAYER_PART_END s16.sinDashBase.1

// index.html:111208 · Phạm vi: global
// PLAYER_PART_BEGIN s16.doDash.1 EDITABLE
doDash=function(direction){
 if(!danteSin())return sinDashBase(direction);if(!danteStyleLive()||paused||dino.dante.judgement)return;
 const n=dino,p=n.dante,dir=direction===-1?-1:direction===1?1:n.isFacingLeft?-1:1;
 if(p.attack?.sinDrill){p.attack=null;p.cd=0;p.body._sinDrill=false;}
 n.isFacingLeft=dir<0;n.dashDir=dir;dashCd=0;dashVx=dir*25;p.sinDash=frames;dswState(p).lastDash=frames;
 n.invincible=true;n.invTimer=Math.max(n.invTimer,8);danteGhost(n);danteSinBlink();
};
// PLAYER_PART_END s16.doDash.1

// index.html:111215 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSinDrill.1 EDITABLE
function danteSinDrill(){
 const p=dino.dante;if(!p.sinTime||p.judgement||p.sinTime<45)return;
 p.sinTime-=45;p.k=null;p.attack={sinDrill:true,royal:true,age:0,duration:28,dir:dino.isFacingLeft?-1:1,hit:new Map(),crossed:false,name:'SIN STINGER · DRILL'};p.cd=28;dswState(p).queue=[];danteStyleState(p).swords=[];
}
// PLAYER_PART_END s16.danteSinDrill.1

// index.html:111219 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSinFire.1 EDITABLE
function danteSinFire(){
 const n=dino,p=n.dante;if(!p.sinTime||p.judgement||p.sinTime<36||p.sinShotCount>=DANTE_SIN_PARTICLES||frames<(p.sinShotReady||0)||p.attack)return;
 const count=Math.min(10,DANTE_SIN_PARTICLES-p.sinShotCount),dir=n.isFacingLeft?-1:1;
 const target=sgTargets(n).filter(o=>(o.x+o.w/2-n.x-n.w/2)*dir>=0&&Math.hypot(o.x-n.x,o.y-n.y)<1000).sort((a,b)=>Math.hypot(a.x-n.x,a.y-n.y)-Math.hypot(b.x-n.x,b.y-n.y))[0];
 const cx=n.x+n.w/2,cy=n.y+24;
 for(let i=0;i<count;i++){
  const side=i%2?-1:1,lane=Math.floor(i/2),x=cx-dir*28,y=cy+(i%5-2)*4;
  p.sinBullets.push({x,y,vx:-dir*8,vy:side*8,life:110,age:0,target,dir,side,lane,origin:{x:cx,y:cy},start:{x,y},converged:false,trail:[]});
 }
 p.sinShotCount+=count;p.sinTime-=36;p.sinShotReady=frames+4;
}
// PLAYER_PART_END s16.danteSinFire.1

// index.html:111230 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteJudgement.1 EDITABLE
function danteJudgement(){
 const n=dino,p=n.dante;if(!p.sinTime||p.judgement)return;
 const ratio=Math.max(0,Math.min(1,p.sinTime/DANTE_SIN_MAX)),total=50+450*ratio;
 danteSinClean(p);p.sinTime=0;p.sinCharge=0;p.sinBullets=[];ultCharge=0;
 const target=sgTargets(n).filter(o=>Math.hypot(o.x-n.x,o.y-n.y)<800).sort((a,b)=>Math.hypot(a.x-n.x,a.y-n.y)-Math.hypot(b.x-n.x,b.y-n.y))[0];
 if(target)danteTeleport(target,false);
 p.judgement={landY:dswFloor(n.x+n.w/2,n.y+n.h)-n.h,grounded:n.grounded,age:0,total,x:target?target.x+target.w/2:n.x+n.w/2+(n.isFacingLeft?-100:100),y:target?target.y+target.h/2:n.y+30,homeX:n.x,homeY:n.y,fx:{mua:true,pha:'goi',kiem:[]},arcs:[],swords:[],blast:null};
 danteLabel('JUDGEMENT · '+Math.round(total));dashVx=0;
}
// PLAYER_PART_END s16.danteJudgement.1

// index.html:111239 · Phạm vi: global
// PLAYER_PART_BEGIN s16.sinKeyBase.1 EDITABLE
const sinKeyBase=danteKey;
// PLAYER_PART_END s16.sinKeyBase.1

// index.html:111240 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteKey.1 EDITABLE
danteKey=function(code,repeat){
 if(!danteStyleLive())return sinKeyBase(code,repeat);
 const p=dino.dante;
 if(p.judgement&&['KeyJ','KeyK','KeyU','KeyQ','KeyE','KeyI','KeyO','KeyL','ShiftLeft','ShiftRight'].includes(code))return true;
 if(code==='KeyU'&&!danteSin(p)&&!repeat&&!paused&&(p.dt||(ultCharge<100&&danteSinCharge(p)>0))){if(!danteSinEnter())danteLabel('SDT EMPTY');return true;}
 if(danteSin(p)){
  if(['KeyQ','KeyE','KeyI','KeyO','KeyL'].includes(code))return true;
  if(code==='KeyU'){if(!repeat&&!paused)danteJudgement();return true;}
  if(code==='KeyK'){keys[code]=true;if(!repeat&&!paused){if(frames-(p.sinDash??-100)<=24)danteSinDrill();else danteSinFire();}return true;}
 }
 return sinKeyBase(code,repeat);
};
// PLAYER_PART_END s16.danteKey.1

// index.html:111252 · Phạm vi: global
// PLAYER_PART_BEGIN s16.sinSetStyleBase.1 EDITABLE
const sinSetStyleBase=danteSetStyle;
// PLAYER_PART_END s16.sinSetStyleBase.1

// index.html:111253 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSetStyle.1 EDITABLE
danteSetStyle=function(index){if(danteSin())return;return sinSetStyleBase(index);};
// PLAYER_PART_END s16.danteSetStyle.1

// index.html:111254 · Phạm vi: global
// PLAYER_PART_BEGIN s16.sinSwapBase.1 EDITABLE
const sinSwapBase=danteSwapWeapon;
// PLAYER_PART_END s16.sinSwapBase.1

// index.html:111255 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSwapWeapon.1 EDITABLE
danteSwapWeapon=function(...args){if(danteSin())return;return sinSwapBase(...args);};
// PLAYER_PART_END s16.danteSwapWeapon.1

// index.html:111256 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteSinTick.1 EDITABLE
function danteSinTick(){
 if(!danteStyleLive()||paused)return;const n=dino,p=n.dante;
 if(!danteSin(p)){p.body._sin=false;return;}
 p.arm=0;p.style=0;combatStance=3;p.dt=0;ultCharge=0;p.body._sin=true;p.body.wing=(p.body.wing||0)+.12;
 if(p.judgement){
  const j=p.judgement;j.age++;n.invincible=true;n.invTimer=Math.max(n.invTimer,3);n.dy=0;dashVx=0;n.x=j.homeX;n.y=j.homeY;n.grounded=j.grounded;
  const phase=Math.max(0,Math.min(3,Math.floor((j.age-8)/38))),id=['a1','a2','a3','high'][phase],age=Math.max(0,Math.min(DSW_MOVES[id].T-1,(j.age-8-phase*38)/1.7));
  if(j.age>=170){const rise=j.age<230?Math.min(130,(j.age-170)*7):Math.max(0,130-(j.age-230)*10);n.y=j.landY-rise;n.grounded=rise===0;}
  dswState(p).pose=dswPose(n,j.age<170?{...DSW_MOVES[id],id,dir:n.isFacingLeft?-1:1}:null,age);p.body.armR=j.age<170?Math.sin(age/24*Math.PI)*-1.8:j.age<244?-2.2:.3;
  if([20,58,96,134].includes(j.age)){
   for(const o of sgTargets(n))if(Math.hypot(o.x+o.w/2-j.x,o.y+o.h/2-j.y)<240)sgDamage(n,o,j.total*.15,'judgement');
   j.arcs.push({t:32,max:32,angle:phase%2?-.9:.9});shakeTimer=Math.max(shakeTimer,10);
   for(let i=0;i<6;i++)j.swords.push({i,count:6,dir:n.isFacingLeft?-1:1,move:{kind:phase%2?'rise':'cut'},origin:{x:n.x+n.w/2,y:n.y},delay:i*4,age:0,stroke:0,alpha:0,phase:'formation',trail:[]});
   if(SFX.tone)SFX.tone(200+phase*90,.12,'sawtooth',.09,100);
  }
  j.arcs=j.arcs.filter(a=>--a.t>0);danteJudgementSwords(j,n);
  if(j.age>=170&&j.age<214&&j.age%2===0){
   for(let q=0;q<3;q++){const i=j.fx.kiem.length;j.fx.kiem.push({x:j.homeX+n.w/2+(i%2?-1:1)*(30+i%22*12),y:j.landY-180-i%6*18,tx:j.homeX+n.w/2+(i%11-5)*32,ty:j.landY+32,scale:1.7+i%4*.25,pha:'treo',t:0,launch:214+Math.floor(i/3)});}
  }
  if(j.age>=214&&j.age<244){j.fx.pha='ban';for(const k of j.fx.kiem)if(j.age>=k.launch){k.pha='bay';k.vx=(k.tx-k.x)*.25;k.vy=(k.ty-k.y)*.25;k.x+=k.vx;k.y+=k.vy;}}
  if(j.age===244){
   const center={x:n.x+n.w/2,y:n.y+n.h/2};j.blast={...center,t:0,radius:360};
   j.fx.pha='xong';for(const k of j.fx.kiem)k.pha='het';
   for(const o of sgTargets(n)){const factor=danteJudgementFalloff(center,o);if(factor>0)sgDamage(n,o,j.total*.4*factor,'judgement');}
   visualEffects.push(new Effect(center.x,n.y+n.h,'body_slam_shockwave',true,200));shakeTimer=Math.max(shakeTimer,38);
   if(SFX.bossExplode)SFX.bossExplode();
  }
  if(j.blast)j.blast.t++;
  if(j.age>=284)danteSinExit();return;
 }
 p.sinTime--;
 // Only an intentional Dash crosses behind: a sword's small advance is not a Dash.
 if(frames%2===0&&frames-(p.sinDash??-1000)<=24&&Math.abs(dashVx)>2){danteGhost(n);danteSinBlink();}
 if(keys.KeyK)danteSinFire();
 const a=p.attack;p.body._sinDrill=!!a?.sinDrill;
 if(a?.sinDrill){
  a.age++;const old=n.x;n.x=Math.max(worldL(),Math.min(worldR()-n.w,n.x+a.dir*14));if(mapTheme==='tetris')resolveTetrisWalls(n,n.x-old);else resolveSolidPillars(n);n.isFacingLeft=a.dir<0;n.invincible=true;n.invTimer=Math.max(n.invTimer,3);n.dy=0;
  const drillBox=danteSinDrillBox(old+n.w/2,n.x+n.w/2,n.y+n.h/2,a.dir);
  let blinkBox=null;
  if(!a.crossed&&danteSinBlink()){a.crossed=true;a.dir=n.isFacingLeft?-1:1;}
  p.body.facingLeft=n.isFacingLeft;
  if(a.crossed)blinkBox=danteSinDrillBox(n.x+n.w/2,n.x+n.w/2,n.y+n.h/2,a.dir);
  // Crossing behind a target changes direction by teleport: sweep each side
  // separately so the teleport itself never creates damage across the map.
  for(const o of sgTargets(n))if((checkAABB(drillBox,o)||(blinkBox&&checkAABB(blinkBox,o)))&&a.age-(a.hit.get(o.__goc||o)??-20)>=10){sgDamage(n,o,8,'sin-drill');a.hit.set(o.__goc||o,a.age);}
  if(a.age>=a.duration){p.attack=null;p.cd=0;p.body._sinDrill=false;}
 }
 const sinTargets=sgTargets(n);
 for(const q of p.sinBullets||[]){
  const ox=q.x,oy=q.y;q.life--;q.age++;
  if(q.age<=16){
   // Fan out from the back along curved wing lanes before seeking the target.
   const t=q.age/16,u=1-t,o=q.origin,side=q.side,lane=q.lane;
   const c1={x:o.x-q.dir*110,y:o.y+side*(70+lane*15)},c2={x:o.x+q.dir*80,y:o.y+side*(15+lane*10)},end={x:o.x+q.dir*180,y:o.y+side*(65+lane*28)};
   q.x=u*u*u*q.start.x+3*u*u*t*c1.x+3*u*t*t*c2.x+t*t*t*end.x;
   q.y=u*u*u*q.start.y+3*u*u*t*c1.y+3*u*t*t*c2.y+t*t*t*end.y;q.vx=q.x-ox;q.vy=q.y-oy;
  }else{
   if(!q.target||q.target.hp<=0)q.target=sinTargets.filter(o=>o.hp>0).sort((a,b)=>Math.hypot(a.x-q.x,a.y-q.y)-Math.hypot(b.x-q.x,b.y-q.y))[0]||null;
   if(q.target){
    const tx=q.target.x+q.target.w/2,ty=q.target.y+q.target.h/2,distance=Math.hypot(tx-q.x,ty-q.y);
    if(distance<210)q.converged=true;
    const spread=q.converged?0:q.side*Math.min(180,Math.max(0,distance-160)*.55),goal=Math.atan2(ty+spread-q.y,tx-q.x),angle=Math.atan2(q.vy,q.vx),delta=Math.atan2(Math.sin(goal-angle),Math.cos(goal-angle)),turn=q.converged?.3:.1;
    q.vx=Math.cos(angle+Math.max(-turn,Math.min(turn,delta)))*19;q.vy=Math.sin(angle+Math.max(-turn,Math.min(turn,delta)))*19;
   }
   q.x+=q.vx;q.y+=q.vy;
  }
  q.trail.push({x:ox,y:oy});if(q.trail.length>12)q.trail.shift();
  for(const o of sinTargets)if(o.hp>0&&sgSegmentBox(ox,oy,q.x,q.y,o,4)!==null){sgDamage(n,o,2,'sin-particle');q.life=0;break;}
 }
 p.sinBullets=(p.sinBullets||[]).filter(q=>q.life>0);
 if(p.sinTime<=0)danteSinExit();
}
// PLAYER_PART_END s16.danteSinTick.1

// index.html:111328 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteJudgementFalloff.1 EDITABLE
function danteJudgementFalloff(center,o){
 const x=Math.max(o.x,Math.min(center.x,o.x+o.w)),y=Math.max(o.y,Math.min(center.y,o.y+o.h));
 return Math.max(0,Math.min(1,(360-Math.hypot(x-center.x,y-center.y))/290));
}
// PLAYER_PART_END s16.danteJudgementFalloff.1

// index.html:111332 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteJudgementSwords.1 EDITABLE
function danteJudgementSwords(j,n){
 for(const sword of j.swords){
  const old=sword.stroke;sword.age++;sword.stroke=Math.max(0,sword.age-sword.delay);sword.phase=sword.stroke>0?'slash':'formation';
  sword.alpha=sword.stroke>0?Math.min(1,sword.stroke/3)*Math.max(0,1-Math.max(0,sword.stroke-18)/14):0;
  const pose=danteSwordPose(n,sword,Math.min(12,sword.stroke/1.5));pose.len*=1.35;pose.tx=pose.x+sword.dir*Math.cos(pose.angle)*pose.len;pose.ty=pose.y+Math.sin(pose.angle)*pose.len*pose.flat;Object.assign(sword,pose);
  if(sword.stroke>0&&sword.stroke<=18)for(let sub=1;sub<=3;sub++){
   const v=danteSwordPose(n,sword,(old+(sword.stroke-old)*sub/3)/1.5),len=v.len*1.35;
   sword.trail.push({x:v.x,y:v.y,tx:v.x+sword.dir*Math.cos(v.angle)*len,ty:v.y+Math.sin(v.angle)*len*v.flat,age:sword.age-1+sub/3});
  }
  sword.trail=sword.trail.filter(v=>sword.age-v.age<10);if(sword.trail.length>30)sword.trail.splice(0,sword.trail.length-30);
 }
 j.swords=j.swords.filter(s=>s.stroke<32);
}
// PLAYER_PART_END s16.danteJudgementSwords.1

// index.html:111345 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteDrawJudgement.1 EDITABLE
function danteDrawJudgement(j){
 SDT_ULT.veDonKet.call({suVung:{...j.fx,kiem:[]}});
 for(const sword of j.swords){
  // Long translucent echo ribbons remain after each independent support cut.
  ctx.save();ctx.fillStyle='#ff532e';
  for(let i=1;i<sword.trail.length;i++){const a=sword.trail[i-1],b=sword.trail[i];ctx.globalAlpha=sword.alpha*Math.max(0,1-(sword.age-b.age)/10)*.12;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(a.tx,a.ty);ctx.lineTo(b.tx,b.ty);ctx.lineTo(b.x,b.y);ctx.closePath();ctx.fill();}
  ctx.restore();danteDrawSword({...sword,trail:sword.trail.filter(v=>sword.age-v.age<4)});
 }
 for(const a of j.arcs){ctx.save();ctx.globalAlpha=a.t/a.max;ctx.translate(j.x,j.y);ctx.rotate(a.angle);ctx.strokeStyle='#ffb68f';ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(0,0,180+(1-a.t/a.max)*30,70,0,-2.4,1.2);ctx.stroke();ctx.restore();}
 for(const k of j.fx.kiem){if(k.pha==='het')continue;ctx.save();ctx.translate(k.x,k.y);ctx.rotate(Math.atan2(k.ty-k.y,k.tx-k.x));ctx.scale(k.scale,k.scale);ctx.globalAlpha=k.pha==='treo'?.65:1;ctx.fillStyle='#19060b';ctx.strokeStyle='#ff681f';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(38,0);ctx.lineTo(-18,-6);ctx.lineTo(-12,0);ctx.lineTo(-18,6);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#ffe19a';ctx.fillRect(-8,-1,34,2);ctx.fillStyle='#ff5722';ctx.fillRect(-20,-10,5,20);ctx.restore();}
 if(j.blast){
  const b=j.blast,t=Math.min(1,b.t/40),r=24+336*(1-Math.pow(1-t,2));
  ctx.save();ctx.globalAlpha=Math.pow(1-t,1.5);const glow=ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,r);glow.addColorStop(0,'#fff7cf');glow.addColorStop(.25,'#ffc05a');glow.addColorStop(.65,'rgba(255,70,20,.6)');glow.addColorStop(1,'rgba(255,30,10,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(b.x,b.y,r,0,Math.PI*2);ctx.fill();
  for(let k=0;k<3;k++){ctx.strokeStyle=k?'#ff6f32':'#fff2bd';ctx.lineWidth=5-k;ctx.beginPath();ctx.arc(b.x,b.y,Math.max(1,r-k*17),0,Math.PI*2);ctx.stroke();}ctx.restore();
 }
}
// PLAYER_PART_END s16.danteDrawJudgement.1

// index.html:111361 · Phạm vi: global
// PLAYER_PART_BEGIN s16.sinTickBase.1 EDITABLE
const sinTickBase=danteTick;
// PLAYER_PART_END s16.sinTickBase.1

// index.html:111362 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteTick.1 EDITABLE
danteTick=function(){sinTickBase();danteSinTick();};
// PLAYER_PART_END s16.danteTick.1

// index.html:111363 · Phạm vi: global
// PLAYER_PART_BEGIN s16.sinBodyBase.1 EDITABLE
const sinBodyBase=drawDantePlayerBody;
// PLAYER_PART_END s16.sinBodyBase.1

// index.html:111364 · Phạm vi: global
// PLAYER_PART_BEGIN s16.drawDantePlayerBody.1 EDITABLE
drawDantePlayerBody=function(b,x,y){if(!b._sin)return sinBodyBase(b,x,y);
 if(b._sinDrill){
  danteDrawSinDrill(x+20,y+30,b.facingLeft?-1:1,frames);return;
 }
 drawSdtDante({...b,drawn:false},x-13,y-28);};
// PLAYER_PART_END s16.drawDantePlayerBody.1

// index.html:111369 · Phạm vi: global
// PLAYER_PART_BEGIN s16.sinDrawBase.1 EDITABLE
const sinDrawBase=danteDraw;
// PLAYER_PART_END s16.sinDrawBase.1

// index.html:111370 · Phạm vi: global
// PLAYER_PART_BEGIN s16.danteDraw.1 EDITABLE
danteDraw=function(n){
 sinDrawBase(n);const p=n.dante;if(!p||!danteSin(p))return;
 for(const q of p.sinBullets||[]){
  ctx.save();ctx.lineCap='round';
  for(let i=1;i<q.trail.length;i++){ctx.globalAlpha=i/q.trail.length*.65;ctx.strokeStyle=q.converged?'#fff2bb':'#ff864f';ctx.lineWidth=1+i/q.trail.length*2;ctx.beginPath();ctx.moveTo(q.trail[i-1].x,q.trail[i-1].y);ctx.lineTo(q.trail[i].x,q.trail[i].y);ctx.stroke();}
  ctx.globalAlpha=1;ctx.fillStyle='#fff6cc';ctx.beginPath();ctx.arc(q.x,q.y,3,0,Math.PI*2);ctx.fill();ctx.restore();
 }
 if(p.judgement)danteDrawJudgement(p.judgement);

};
// PLAYER_PART_END s16.danteDraw.1

// index.html:111380 · Phạm vi: global
// PLAYER_PART_BEGIN s16.sinUIBase.1 EDITABLE
const sinUIBase=drawUI;
// PLAYER_PART_END s16.sinUIBase.1

// index.html:111381 · Phạm vi: global
// PLAYER_PART_BEGIN s16.drawUI.1 EDITABLE
drawUI=function(){
 sinUIBase();if(!danteOn()||!dino?.dante)return;const p=dino.dante;ctx.save();if(dojoMode)ctx.translate(0,15);
 if(danteSin(p)){
  ctx.fillStyle='#1c1119';ctx.fillRect(10,45,282,129);ctx.textAlign='left';ctx.font='bold 13px Consolas,monospace';ctx.fillStyle='#ffba79';ctx.fillText('DANTE · SIN DEVIL TRIGGER',18,65);
  ctx.font='11px Consolas,monospace';ctx.fillStyle='#f3dddd';ctx.fillText('DEVIL SWORD DANTE · SWORDMASTER',18,85);ctx.fillText(p.judgement?'JUDGEMENT · '+Math.round(p.judgement.total):p.attack?p.attack.name:'J: SIN SWORD · K: THE LUCE',18,105);
  ctx.fillText('Dash K: DRILL · U: JUDGEMENT',18,125);ctx.fillText(p.judgement?'FOUR SLASHES → SIN SWORDS → BLAST':'SDT '+(p.sinTime/60).toFixed(1)+'s · FREE DASH',18,145);ctx.fillText('HP '+Math.ceil(dino.hp)+' / '+dino.maxHp,18,165);
 }
 ctx.fillStyle='#1c1119';ctx.fillRect(10,176,282,45);ctx.textAlign='left';ctx.font='11px Consolas,monospace';ctx.fillStyle='#ffe3a3';
 ctx.fillText(p.judgement?'JUDGEMENT · '+Math.round(p.judgement.total):danteSin(p)?'SDT · J: SWORD · K: LUCE · Dash K: DRILL':'SDT '+Math.floor(danteSinCharge(p))+'% · HIT WITH FULL DT',18,190);
 ctx.fillStyle='#4c2332';ctx.fillRect(18,198,260,6);ctx.fillStyle='#ffab40';ctx.fillRect(18,198,260*(danteSin(p)?p.sinTime/DANTE_SIN_MAX:danteSinCharge(p)/100),6);
 ctx.fillStyle='#e8d8cf';ctx.fillText(danteSin(p)?'U: JUDGEMENT · LUCE '+(p.sinShotCount||0)+'/200':p.dt?'U: ENTER SDT · USE STORED CHARGE':danteSinCharge(p)>0&&ultCharge<100?'U: SDT · '+(danteSinCharge(p)*.15).toFixed(1)+'s STORED':'U: DT → U: SDT → U: JUDGEMENT',18,216);ctx.restore();
};
// PLAYER_PART_END s16.drawUI.1
