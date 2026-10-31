// PLAYER_FILE: DanteFaust
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DANTE_ATTACK_RATE, LT, Player, SFX, ammoPicker, ammoXem, apexWrap, camY, ctx, danteActive, danteBulletColor, danteDraw, danteHit, danteKey, danteLabel, danteOn, danteRangedBase, danteStyle, danteTick, dashCd, dashVx, dino, dkNenY, doDash, dojoMode, drawCustomMenu, drawUI, dswControl, dswPaintArmIK, eiAim, frames, gameOver, gameVictory, keys, paused, playerAttackStep, playerComboTrack, playerFinisherControl, runePicker, sgSegmentBox, sgTargets, shakeTimer
// index.html:110294 · Phạm vi: global
// PLAYER_PART_BEGIN s14.FAUST_MOVES.1 EDITABLE
const FAUST_MOVES={
 shot:{name:'DR. FAUST · GUNFIRE',T:9},
 throw:{name:'SET HAT',T:24},
 trick:{name:'HAT TRICK',T:22},
 slash:{name:'MAD HATTER',T:24},
 upper:{name:'MAD HATTER · RISING BRIM',T:28},
 air:{name:'MAD HATTER · AIR SPIN',T:30},
 dash:{name:'HAT TRICK · SLIDE',T:30},
 beam:{name:'RED SHOT · CRIMSON LANCE',T:42},
 meteor:{name:'RED HOT NIGHT',T:90}
};
// PLAYER_PART_END s14.FAUST_MOVES.1

// index.html:110305 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustState.1 EDITABLE
function faustState(p){return p.faust||(p.faust={hold:0,orbit:0,angle:0,ringHits:new Map(),hat:null,combo:0,lastSlash:-1000,lastDash:-1000,flash:0,trail:[],swings:[],sparks:[],impacts:[],meteors:[],spears:[],beam:null,lock:null});}
// PLAYER_PART_END s14.faustState.1

// index.html:110306 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustActive.1 EDITABLE
function faustActive(){return danteActive(dino)&&dino.dante?.arm===5&&!gameOver&&!gameVictory;}
// PLAYER_PART_END s14.faustActive.1

// index.html:110307 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustReset.1 EDITABLE
function faustReset(p){if(!p?.faust)return;const f=p.faust;f.hold=f.orbit=0;f.hat=null;f.ringHits.clear();f.trail=[];f.swings=[];f.sparks=[];f.impacts=[];f.meteors=[];f.spears=[];f.beam=f.lock=null;p.body.hat=null;p.body._faustLegs=null;if(p.arm===5)p.body._swordLean=p.body._swordLunge=0;}
// PLAYER_PART_END s14.faustReset.1

// index.html:110308 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustCommand.1 EDITABLE
function faustCommand(special,charge=0){
 if(!faustActive()||paused)return;
 const n=dino,p=n.dante,f=faustState(p);
 if(p.cd>0||p.attack||n.isShielding())return;
 let id='shot';
 if(special){
  f.hold=f.orbit=0;f.ringHits.clear();
  if(charge>=30&&(keys.KeyS||keys.ArrowDown))id='beam';
  else if(charge>=60)id='meteor';
  else if(f.hat)id='trick';
  else if(frames-f.lastDash<=24){id='dash';f.lastDash=-1000;}
  else if(!n.grounded)id='air';
  else if(keys.KeyS||keys.ArrowDown){
   f.combo=frames-f.lastSlash<=42?(f.combo+1)%3:0;f.lastSlash=frames;id=f.combo===2?'upper':'slash';
  }else id='throw';
 }
 p.attack={faust:true,id,name:FAUST_MOVES[id].name,duration:FAUST_MOVES[id].T,age:0,dir:n.isFacingLeft?-1:1,hit:new Set(),combo:f.combo,charge};p.cd=p.attack.duration;
 playerComboTrack(p,p.attack,'faust');
 if(id==='beam'){const a=p.attack;a.angle=faustAim(n,a.dir);a.power=charge>=90?8:charge>=60?6:4;}
 if(id==='meteor'){p.attack.gunslinger=danteStyle(p)===1;const point=faustLock(n,p.attack.dir);f.lock={...point,t:90};p.attack.lock={...point};}
 if(special)danteLabel(p.attack.name);
}
// PLAYER_PART_END s14.faustCommand.1

// index.html:110330 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustRound.1 EDITABLE
function faustRound(n,p,angle,damage){
 p.rounds.push({arm:5,x:n.x+n.w/2+Math.cos(angle)*27,y:n.y+23,vx:Math.cos(angle)*16,vy:Math.sin(angle)*16,r:4,kind:'bullet',color:danteBulletColor(p),damage:danteRangedBase(p,1)+(p.dt?2:0),life:65,age:0,hit:new Set()});
 faustState(p).flash=5;if(SFX.tone)SFX.tone(480,.04,'triangle',.045,150);
}
// PLAYER_PART_END s14.faustRound.1

// index.html:110334 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustHatShape.1 EDITABLE
function faustHatShape(x,y,rotation=0,scale=1){
 ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ctx.scale(scale,scale);
 ctx.fillStyle='#3c0922';ctx.strokeStyle='#ff7a9e';ctx.lineWidth=1;
 ctx.beginPath();ctx.ellipse(0,0,18,5,0,0,Math.PI*2);ctx.fill();ctx.stroke();
 ctx.fillStyle='#872047';ctx.beginPath();ctx.moveTo(-11,-2);ctx.lineTo(-8,-15);ctx.lineTo(8,-15);ctx.lineTo(11,-2);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.fillStyle='#ffb46b';ctx.fillRect(-10,-6,20,3);ctx.restore();
}
// PLAYER_PART_END s14.faustHatShape.1

// index.html:110342 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustPoint.1 EDITABLE
function faustPoint(n,x,y){
 const b=n.dante.body,c=Math.cos(b._swordLean||0),s=Math.sin(b._swordLean||0),dir=n.isFacingLeft?-1:1;
 return {x:n.x+n.w/2+dir*((x-20)*c-(y-32)*s)*n.w/40,y:n.y+(32+(x-20)*s+(y-32)*c)*n.h/60};
}
// PLAYER_PART_END s14.faustPoint.1

// index.html:110346 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustPose.1 EDITABLE
function faustPose(n,a,age=a.age){
 const t=Math.max(0,Math.min(1,(age-5)/11)),ease=t*t*(3-2*t);
 let angle=a.id==='upper'?1.3-ease*3.1:a.id==='air'?-2+ease*Math.PI*3:a.id==='dash'?-.4+ease*.8:a.combo===1?1.3-ease*2.7:-1.5+ease*2.9;
 const hand={x:30+Math.cos(angle)*26,y:20+Math.sin(angle)*26};
 const hat={x:hand.x+Math.cos(angle)*14,y:hand.y+Math.sin(angle)*14};
 return {hand,hat,angle,world:faustPoint(n,hat.x,hat.y)};
}
// PLAYER_PART_END s14.faustPose.1

// index.html:110353 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustParticles.1 EDITABLE
function faustParticles(f,x,y,count=10,color='#ff789f'){
 for(let i=0;i<count;i++){const angle=Math.PI*2*i/count+Math.random()*.2,speed=1+Math.random()*4;f.sparks.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-1,t:16+Math.random()*12,max:28,color});}
 if(f.sparks.length>180)f.sparks.splice(0,f.sparks.length-180);
}
// PLAYER_PART_END s14.faustParticles.1

// index.html:110357 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustStrike.1 EDITABLE
function faustStrike(n,p,a){
 const f=faustState(p),current=faustPose(n,a).world,prev=faustPose(n,a,a.age-1).world;
 f.swings.push({x:current.x,y:current.y,angle:faustPose(n,a).angle,t:10});
 for(const o of sgTargets(n)){
  const root=o.__goc||o;
  if(a.hit.has(root)||sgSegmentBox(prev.x,prev.y,current.x,current.y,o,19)===null)continue;
  a.hit.add(root);
  if(danteHit(p,o,(a.id==='upper'?7:5)+(p.dt?2:0))>0){
   if(!playerFinisherControl(n,p,a,o,{launch:a.id==='upper'})&&a.id==='upper')dswControl(o,{launch:true});
   const x=Math.max(o.x,Math.min(current.x,o.x+o.w)),y=Math.max(o.y,Math.min(current.y,o.y+o.h));
   faustParticles(f,x,y);f.impacts.push({x,y,t:10,max:10,r:30});shakeTimer=Math.max(shakeTimer,3);
  }
 }
}
// PLAYER_PART_END s14.faustStrike.1

// index.html:110371 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustAim.1 EDITABLE
function faustAim(n,dir){
 const cx=n.x+n.w/2,cy=n.y+23;
 const t=sgTargets(n).filter(o=>(o.x+o.w/2-cx)*dir>0&&Math.hypot(o.x-cx,o.y-cy)<850).sort((a,b)=>Math.hypot(a.x-cx,a.y-cy)-Math.hypot(b.x-cx,b.y-cy))[0];
 return t?Math.atan2(t.y+t.h/2-cy,t.x+t.w/2-cx):dir>0?0:Math.PI;
}
// PLAYER_PART_END s14.faustAim.1

// index.html:110376 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustLock.1 EDITABLE
function faustLock(n,dir){
 const t=sgTargets(n).filter(o=>(o.x+o.w/2-n.x-n.w/2)*dir>=0&&Math.abs(o.x-n.x)<850).sort((a,b)=>Math.abs(a.x-n.x)-Math.abs(b.x-n.x))[0];
 return t?{x:t.x+t.w/2,y:t.y+t.h/2}:{x:n.x+n.w/2+dir*240,y:dkNenY()-8};
}
// PLAYER_PART_END s14.faustLock.1

// index.html:110380 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustBeam.1 EDITABLE
function faustBeam(n,p,a){
 const f=faustState(p),x=n.x+n.w/2,y=n.y+23,length=780,tx=x+Math.cos(a.angle)*length,ty=y+Math.sin(a.angle)*length;
 // Each pulse pierces, but damages each target at most once.
 for(const o of sgTargets(n))if(sgSegmentBox(x,y,tx,ty,o,9)!==null){
  if(danteHit(p,o,danteRangedBase(p,a.power,true)+(p.dt?2:0))>0)faustParticles(f,o.x+o.w/2,o.y+o.h/2,8);
 }
 f.beam={x,y,tx,ty,t:7,max:7,power:a.power};faustParticles(f,x,y,12,'#ffd1df');
 dashVx=-a.dir*3;shakeTimer=Math.max(shakeTimer,4);if(SFX.tone)SFX.tone(240,.1,'sawtooth',.07,80);
}
// PLAYER_PART_END s14.faustBeam.1

// index.html:110389 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustMeteorTick.1 EDITABLE
function faustMeteorTick(n,p,f){
 for(const m of f.meteors){
  m.age++;const t=Math.min(1,m.age/36),ease=t*t;
  m.x=m.sx+(m.tx-m.sx)*ease;m.y=m.sy+(m.ty-m.sy)*ease;
  if(m.age<36)continue;
  const radius=m.radius;
  for(const o of sgTargets(n)){
   const x=Math.max(o.x,Math.min(m.tx,o.x+o.w)),y=Math.max(o.y,Math.min(m.ty,o.y+o.h));
   if(Math.hypot(x-m.tx,y-m.ty)<=radius)danteHit(p,o,m.damage+(p.dt?2:0));
  }
  f.impacts.push({x:m.tx,y:m.ty,t:36,max:36,r:radius,meteor:true});faustParticles(f,m.tx,m.ty,m.index>=2?38:22,'#ffad77');
  shakeTimer=Math.max(shakeTimer,m.index>=2?13:7);if(SFX.tone)SFX.tone(m.index>=2?65:95,.18,'sawtooth',.1,25);
 }
 f.meteors=f.meteors.filter(m=>m.age<36);
}
// PLAYER_PART_END s14.faustMeteorTick.1

// index.html:110404 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustSpears.1 EDITABLE
function faustSpears(n,p,f){
 for(const q of f.spears){
  q.life--;const oldX=q.x,oldY=q.y;
  if(q.target&&q.target.hp>0){const desired=Math.atan2(q.target.y+q.target.h/2-q.y,q.target.x+q.target.w/2-q.x),diff=Math.atan2(Math.sin(desired-q.angle),Math.cos(desired-q.angle));q.angle+=Math.max(-.12,Math.min(.12,diff));}
  q.x+=Math.cos(q.angle)*16;q.y+=Math.sin(q.angle)*16;
  for(const o of sgTargets(n))if(sgSegmentBox(oldX,oldY,q.x,q.y,o,5)!==null){danteHit(p,o,danteRangedBase(p,3,true)+(p.dt?2:0));faustParticles(f,q.x,q.y,6);q.life=0;break;}
 }
 f.spears=f.spears.filter(q=>q.life>0);
}
// PLAYER_PART_END s14.faustSpears.1

// index.html:110413 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustOrbit.1 EDITABLE
function faustOrbit(n,p,f){
 const cx=n.x+n.w/2,cy=n.y+n.h/2,radius=64,old=f.angle;
 f.angle+=.13;
 for(const [root,until] of f.ringHits)if(until<=frames||root.hp<=0)f.ringHits.delete(root);
 for(let i=0;i<6;i++){
  const a=f.angle+i*Math.PI/3,b=old+i*Math.PI/3;
  const x=cx+Math.cos(a)*radius,y=cy+Math.sin(a)*radius;
  for(const o of sgTargets(n)){
   const root=o.__goc||o;
   if(f.ringHits.has(root))continue;
   if(sgSegmentBox(cx+Math.cos(b)*radius,cy+Math.sin(b)*radius,x,y,o,5)!==null){
    f.ringHits.set(root,frames+18);danteHit(p,o,danteRangedBase(p,1)+(p.dt?2:0));
   }
  }
 }
}
// PLAYER_PART_END s14.faustOrbit.1

// index.html:110429 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustHatTick.1 EDITABLE
function faustHatTick(n,p,f){
 const h=f.hat;if(!h)return;
 const oldX=h.x,oldY=h.y;h.age++;
 if(h.age>=22)h.returning=true;
 if(h.returning){const dx=n.x+n.w/2-h.x,dy=n.y+18-h.y,d=Math.hypot(dx,dy);if(d<20||h.age>=100){f.hat=null;return;}h.vx=dx/d*13;h.vy=dy/d*13;}
 h.x+=h.vx;h.y+=h.vy;
 const hits=h.returning?h.back:h.out;
 for(const o of sgTargets(n)){
  const root=o.__goc||o;if(hits.has(root))continue;
  if(sgSegmentBox(oldX,oldY,h.x,h.y,o,16)!==null){hits.add(root);danteHit(p,o,h.damage+(p.dt?2:0));}
 }
 f.trail.push({x:h.x,y:h.y,t:10});
}
// PLAYER_PART_END s14.faustHatTick.1

// index.html:110442 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustTick.1 EDITABLE
function faustTick(){
 if(!dino?.dante)return;
 const n=dino,p=n.dante;
 if(!faustActive()){faustReset(p);return;}
 if(paused)return;
 const f=faustState(p),a=p.attack;
 f.flash=Math.max(0,f.flash-1);f.trail=f.trail.filter(t=>--t.t>0);f.swings=f.swings.filter(t=>--t.t>0);f.impacts=f.impacts.filter(t=>--t.t>0);
 f.sparks=f.sparks.filter(t=>--t.t>0);for(const t of f.sparks){t.x+=t.vx;t.y+=t.vy;t.vy+=.12;}
 if(f.beam&&--f.beam.t<=0)f.beam=null;if(f.lock&&--f.lock.t<=0)f.lock=null;
 faustMeteorTick(n,p,f);faustSpears(n,p,f);
 p.body._faustLegs=null;p.body._swordLean=p.body._swordLunge=0;
 if(a?.faust){
  const hit=Math.sin(Math.max(0,Math.min(1,(a.age-4)/15))*Math.PI);
  if(['slash','upper','dash','air'].includes(a.id)){p.body._swordLean=(a.id==='upper'?-.25:.23)*hit;p.body._swordLunge=12*hit;p.body._faustLegs={mode:a.id,t:hit};}
  if(a.id==='meteor'||a.id==='beam')p.body._faustLegs={mode:'cast',t:1};
 }
 const shooting=keys.KeyJ&&!keys.KeyK&&p.k===null&&!n.isShielding()&&(!a||a.id==='shot')&&p.cd<=FAUST_MOVES.shot.T;
 f.hold=shooting?f.hold+1:0;f.orbit=shooting&&f.hold>=18?1:0;
 if(f.orbit)faustOrbit(n,p,f);
 else if(shooting&&!a&&p.cd<=0)faustCommand(false);
 if(!shooting)f.ringHits.clear();
 faustHatTick(n,p,f);
 // Throw/recall keep their original timing so the returning hat can still be recalled.
 if(a?.faust&&playerAttackStep(a,['throw','trick'].includes(a.id)?1:DANTE_ATTACK_RATE)){
  a.age++;
  if(a.id==='shot'&&a.age===1)faustRound(n,p,eiAim(n,a.dir),2);
  if(a.id==='throw'&&a.age===6&&!f.hat)f.hat={x:n.x+n.w/2,y:n.y+18,vx:a.dir*11,vy:0,age:0,damage:danteRangedBase(p,4,true),returning:false,out:new Set(),back:new Set()};
  if(a.id==='trick'&&a.age===5&&f.hat){
   const h=f.hat;
   for(const o of sgTargets(n))if(Math.hypot(o.x+o.w/2-h.x,o.y+o.h/2-h.y)<65)danteHit(p,o,danteRangedBase(p,6,true)+(p.dt?2:0));
   p.fx.push({x:h.x,y:h.y,dir:1,r:65,kind:'fire',t:14,max:14,col:'#ff6799'});h.returning=true;
  }
  if(['slash','upper','air','dash'].includes(a.id)){
   if(a.id==='dash'&&a.age<=10)dashVx=a.dir*12;
   if(a.id==='air'&&!n.grounded&&a.age<18)n.dy=Math.min(n.dy,1);
   if(a.age>=6&&a.age<=15)faustStrike(n,p,a);
  }
  if(a.id==='beam'&&[12,19,26].includes(a.age))faustBeam(n,p,a);
  if(a.id==='meteor'&&(a.gunslinger?[18,28,38,48]:[18,28,38]).includes(a.age)){
   const index=(a.age-18)/10,point=a.lock;
   f.meteors.push({sx:point.x-a.dir*(150-index*40),sy:Math.min(n.y-310,(typeof camY==='number'?camY:0)-90),x:point.x-a.dir*150,y:n.y-310,tx:point.x,ty:point.y,age:0,index,r:14+index*7,radius:50+index*20,damage:danteRangedBase(p,6+Math.min(index,2)*2,true,a.gunslinger)});
  }
  if(a.age>=a.duration)p.attack=null;
 }
 p.body.hat=!!f.hat||!!(a?.faust&&['slash','upper','air','dash'].includes(a.id));
}
// PLAYER_PART_END s14.faustTick.1

// index.html:110488 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustKeyBase.1 EDITABLE
const faustKeyBase=danteKey;
// PLAYER_PART_END s14.faustKeyBase.1

// index.html:110489 · Phạm vi: global
// PLAYER_PART_BEGIN s14.danteKey.1 EDITABLE
danteKey=function(code,repeat){
 if(faustActive()&&!paused&&!repeat){
  const p=dino.dante,f=faustState(p),a=p.attack;
  if(code==='KeyJ'&&frames-f.lastDash<=24){keys.KeyJ=true;f.lastDash=-1000;p.attack=null;p.cd=0;const down=keys.KeyS;keys.KeyS=true;faustCommand(true,30);keys.KeyS=down;return true;}
  if(a?.faust&&((a.id==='shot'&&a.age>=1)||a.age>=16)&&['KeyQ','KeyE','KeyK'].includes(code)){p.attack=null;p.cd=0;}
  const result=faustKeyBase(code,repeat);
  if(p.arm!==5){faustReset(p);f.lastDash=-1000;}
  return result;
 }
 return faustKeyBase(code,repeat);
};
// PLAYER_PART_END s14.danteKey.1

// index.html:110500 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustDashBase.1 EDITABLE
const faustDashBase=doDash;
// PLAYER_PART_END s14.faustDashBase.1

// index.html:110501 · Phạm vi: global
// PLAYER_PART_BEGIN s14.doDash.1 EDITABLE
doDash=function(...args){
 const using=faustActive()&&!paused,before=dashCd,release=using&&faustState(dino.dante).orbit;
 faustDashBase(...args);
 if(using&&dashCd>before){
  const p=dino.dante,f=faustState(p);f.lastDash=frames;
  if(release){
   const targets=sgTargets(dino).filter(o=>(o.x+o.w/2-dino.x-dino.w/2)*dino.dashDir>0).sort((a,b)=>Math.abs(a.x-dino.x)-Math.abs(b.x-dino.x));
   f.spears=[];
   for(let i=0;i<6;i++){const a=f.angle+i*Math.PI/3;f.spears.push({x:dino.x+dino.w/2+Math.cos(a)*64,y:dino.y+dino.h/2+Math.sin(a)*64,angle:faustAim(dino,dino.dashDir)+(i-2.5)*.12,target:targets[0]||null,life:50});}
   f.hold=f.orbit=0;p.cd=Math.max(p.cd,18);f.lastDash=-1000;danteLabel('MAN HAT · RELEASE');
  }
  if(p.attack?.id==='shot'){p.attack=null;if(!release)p.cd=0;}
 }
};
// PLAYER_PART_END s14.doDash.1

// index.html:110515 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustTickBase.1 EDITABLE
const faustTickBase=danteTick;
// PLAYER_PART_END s14.faustTickBase.1

// index.html:110516 · Phạm vi: global
// PLAYER_PART_BEGIN s14.danteTick.1 EDITABLE
danteTick=function(){faustTickBase();faustTick();};
// PLAYER_PART_END s14.danteTick.1

// index.html:110517 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustDamageBase.1 EDITABLE
const faustDamageBase=Player.prototype.takeDamage;
// PLAYER_PART_END s14.faustDamageBase.1

// index.html:110518 · Phạm vi: global
// PLAYER_PART_BEGIN s14.Player.prototype.takeDamage.1 EDITABLE
Player.prototype.takeDamage=function(...args){const hp=this.hp,result=faustDamageBase.apply(this,args);if(this.dante&&this.hp<hp)faustReset(this.dante);return result;};
// PLAYER_PART_END s14.Player.prototype.takeDamage.1

// index.html:110519 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustDraw.1 EDITABLE
function faustDraw(n){
 const p=n.dante,f=faustState(p),a=p.attack,cx=n.x+n.w/2,cy=n.y+n.h/2,dir=n.isFacingLeft?-1:1;
 const swinging=a?.faust&&['slash','upper','air','dash'].includes(a.id),progress=swinging?Math.max(0,Math.min(1,(a.age-5)/11)):0;
 const pose=swinging?faustPose(n,a):null,lean=p.body._swordLean||0;
 ctx.save();ctx.translate(cx,n.y+32);ctx.scale(dir*n.w/40,n.h/60);ctx.rotate(lean);ctx.translate(-20,-32);
 if(swinging){
  dswPaintArmIK(8,20,0,35,1);dswPaintArmIK(30,20,pose.hand.x,pose.hand.y,1);
  faustHatShape(pose.hat.x,pose.hat.y,pose.angle+Math.PI/2,1.15);
 }else{
  const cast=a?.id==='meteor'||p.k!==null,beam=a?.id==='beam';
  dswPaintArmIK(8,20,cast?5:2,cast?-5:37,1);
  dswPaintArmIK(30,20,beam?56:cast?34:48,cast?-4:beam?21:29,1);
 }
 if(f.flash){ctx.fillStyle='#ff628d';ctx.shadowColor='#ff466c';ctx.shadowBlur=12;ctx.beginPath();ctx.arc(50,23,6,0,Math.PI*2);ctx.fill();}ctx.restore();
 faustDrawEffects(n,p,f,a);
 if(f.orbit){ctx.save();ctx.strokeStyle='rgba(255,70,120,.25)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,64,0,Math.PI*2);ctx.stroke();
 for(let i=0;i<6;i++){const angle=f.angle+i*Math.PI/3;ctx.save();ctx.translate(cx+Math.cos(angle)*64,cy+Math.sin(angle)*64);ctx.rotate(angle+Math.PI/2);ctx.fillStyle=danteBulletColor(p);ctx.shadowColor=danteBulletColor(p);ctx.shadowBlur=12;ctx.beginPath();ctx.moveTo(0,-9);ctx.lineTo(5,0);ctx.lineTo(0,9);ctx.lineTo(-5,0);ctx.closePath();ctx.fill();ctx.restore();}ctx.restore();}
 for(const t of f.trail){ctx.save();ctx.globalAlpha=t.t/30;faustHatShape(t.x,t.y,frames*.3,.8);ctx.restore();}
 if(f.hat)faustHatShape(f.hat.x,f.hat.y,f.hat.age*.32);
 if(f.swings.length>1){
  ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
  for(let i=1;i<f.swings.length;i++){const b=f.swings[i-1],c=f.swings[i];ctx.globalAlpha=c.t/12;for(const [width,col] of [[18,'rgba(255,35,90,.15)'],[8,'#fc476f'],[2,'#ffe3e9']]){ctx.strokeStyle=col;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(c.x,c.y);ctx.stroke();}}
  ctx.restore();
 }

}
// PLAYER_PART_END s14.faustDraw.1

// index.html:110545 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustDrawEffects.1 EDITABLE
function faustDrawEffects(n,p,f,a){
 ctx.save();
 if((p.k!==null&&p.k>=10)||a?.id==='meteor'||a?.id==='beam'){
  const charge=p.k!==null?Math.min(1,p.k/60):1,x=n.x+n.w/2,y=n.y-30;
  ctx.save();ctx.translate(x,y);ctx.rotate(frames*.035);ctx.strokeStyle='#ff638d';ctx.shadowColor='#ff245a';ctx.shadowBlur=14;ctx.lineWidth=2;
  for(const r of [17+charge*9,30+charge*10]){ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();}
  for(let i=0;i<8;i++){const t=i*Math.PI/4;ctx.save();ctx.rotate(t);ctx.fillStyle=i%2?'#ff456e':'#ffe0dd';ctx.fillRect(24,-2,8+charge*8,4);ctx.restore();}ctx.restore();
 }
 if(f.lock||(p.k!==null&&p.k>=30&&!(keys.KeyS||keys.ArrowDown))){
  const point=f.lock||faustLock(n,n.isFacingLeft?-1:1);ctx.save();ctx.translate(point.x,point.y);ctx.strokeStyle='#ff4c72';ctx.lineWidth=2;ctx.setLineDash([8,5]);ctx.beginPath();ctx.ellipse(0,0,65,22,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='rgba(255,50,90,.10)';ctx.fill();ctx.beginPath();ctx.moveTo(-82,0);ctx.lineTo(82,0);ctx.moveTo(0,-32);ctx.lineTo(0,32);ctx.stroke();ctx.restore();
 }
 for(const m of f.meteors){
  const angle=Math.atan2(m.ty-m.sy,m.tx-m.sx),r=m.r,tail=95+m.index*25;
  ctx.save();ctx.translate(m.x,m.y);ctx.rotate(angle);
  const g=ctx.createLinearGradient(-tail,0,r,0);g.addColorStop(0,'rgba(210,10,65,0)');g.addColorStop(.65,'rgba(255,40,80,.7)');g.addColorStop(1,'#fff4cb');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-tail,0);ctx.quadraticCurveTo(-35,-r*1.7,r,0);ctx.quadraticCurveTo(-35,r*1.7,-tail,0);ctx.fill();
  ctx.rotate(m.age*.14);ctx.shadowColor='#ff3d66';ctx.shadowBlur=25;ctx.fillStyle='#67132b';ctx.strokeStyle='#ffad91';ctx.lineWidth=2;
  ctx.beginPath();for(let i=0;i<9;i++){const t=i*Math.PI*2/9,rr=r*(i%2?.85:1.05);ctx.lineTo(Math.cos(t)*rr,Math.sin(t)*rr);}ctx.closePath();ctx.fill();ctx.stroke();
  ctx.strokeStyle='#fff0c6';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-r*.7,-r*.2);ctx.lineTo(r*.1,0);ctx.lineTo(r*.5,r*.6);ctx.moveTo(r*.1,0);ctx.lineTo(r*.4,-r*.7);ctx.stroke();ctx.restore();
 }
 if(a?.id==='beam'&&a.age<12){const angle=a.angle;ctx.save();ctx.setLineDash([6,7]);ctx.strokeStyle='rgba(255,90,135,.5)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(n.x+n.w/2,n.y+23);ctx.lineTo(n.x+n.w/2+Math.cos(angle)*780,n.y+23+Math.sin(angle)*780);ctx.stroke();ctx.restore();}
 if(f.beam){const b=f.beam;ctx.save();ctx.globalAlpha=b.t/b.max;ctx.lineCap='round';ctx.shadowColor='#ff3463';ctx.shadowBlur=20;
  for(const [width,col] of [[26,'rgba(255,40,90,.2)'],[12,'#ff3769'],[4,'#fff0dc']]){ctx.strokeStyle=col;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(b.tx,b.ty);ctx.stroke();}ctx.restore();
 }
 for(const q of f.spears){ctx.save();ctx.translate(q.x,q.y);ctx.rotate(q.angle);ctx.strokeStyle='rgba(255,55,100,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-26,0);ctx.lineTo(0,0);ctx.stroke();ctx.fillStyle=danteBulletColor(p);ctx.shadowColor=danteBulletColor(p);ctx.shadowBlur=12;ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(-4,-5);ctx.lineTo(-10,0);ctx.lineTo(-4,5);ctx.closePath();ctx.fill();ctx.restore();}
 for(const h of f.impacts){const t=1-h.t/h.max,r=Math.max(1,h.r*t);ctx.save();ctx.globalAlpha=1-t;
  if(h.meteor){
   const blast=Math.max(1,h.r*(.4+t*.8)),g=ctx.createRadialGradient(h.x,h.y,0,h.x,h.y,blast);
   g.addColorStop(0,'rgba(255,249,213,.95)');g.addColorStop(.25,'rgba(255,165,96,.8)');g.addColorStop(.65,'rgba(255,38,75,.4)');g.addColorStop(1,'rgba(160,15,60,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(h.x,h.y,blast,0,Math.PI*2);ctx.fill();
   ctx.strokeStyle='#fff0c1';ctx.lineWidth=2;
   for(let i=0;i<12;i++){const angle=i*Math.PI/6,len=h.r*(.4+t*.9);ctx.beginPath();ctx.moveTo(h.x+Math.cos(angle)*len*.3,h.y+Math.sin(angle)*len*.3);ctx.lineTo(h.x+Math.cos(angle)*len,h.y+Math.sin(angle)*len*.8);ctx.stroke();}
   ctx.strokeStyle='#ff9c77';ctx.lineWidth=5*(1-t)+1;ctx.beginPath();ctx.ellipse(h.x,h.y,h.r*(.5+t),h.r*(.16+t*.25),0,0,Math.PI*2);ctx.stroke();
  }
ctx.strokeStyle='#ffc2a0';ctx.lineWidth=4*(1-t)+1;ctx.beginPath();ctx.ellipse(h.x,h.y,r,r*.55,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(255,60,80,.18)';ctx.fill();ctx.strokeStyle='#ff527b';ctx.beginPath();ctx.arc(h.x,h.y,r*.7,0,Math.PI*2);ctx.stroke();ctx.restore();}
 for(const q of f.sparks){ctx.globalAlpha=Math.min(1,q.t/12);ctx.fillStyle=q.color;ctx.fillRect(q.x-1.5,q.y-1.5,3,3);}
 ctx.restore();
}
// PLAYER_PART_END s14.faustDrawEffects.1

// index.html:110582 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustDrawBase.1 EDITABLE
const faustDrawBase=danteDraw;
// PLAYER_PART_END s14.faustDrawBase.1

// index.html:110583 · Phạm vi: global
// PLAYER_PART_BEGIN s14.danteDraw.1 EDITABLE
danteDraw=function(n){faustDrawBase(n);if(danteOn()&&n.dante?.arm===5)faustDraw(n);};
// PLAYER_PART_END s14.danteDraw.1

// index.html:110584 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustUIBase.1 EDITABLE
const faustUIBase=drawUI;
// PLAYER_PART_END s14.faustUIBase.1

// index.html:110585 · Phạm vi: global
// PLAYER_PART_BEGIN s14.drawUI.1 EDITABLE
drawUI=function(){faustUIBase();if(!danteOn()||dino?.dante?.arm!==5)return;const p=dino.dante,f=faustState(p);ctx.save();if(dojoMode)ctx.translate(0,15);ctx.fillStyle='#1c1119';ctx.fillRect(15,92,275,20);ctx.font='11px Consolas,monospace';ctx.fillStyle='#ffb4cd';ctx.textAlign='left';ctx.fillText(p.k!==null?(keys.KeyS||keys.ArrowDown?'RED SHOT: '+Math.min(3,Math.floor(p.k/30))+'/3':'RED HOT NIGHT: '+Math.min(100,Math.floor(p.k/60*100))+'%'):f.orbit?'MAN HAT · ORBIT':p.attack?p.attack.name:'J: FIRE / HOLD: ORBIT · K: HAT',20,105);ctx.restore();};
// PLAYER_PART_END s14.drawUI.1

// index.html:110586 · Phạm vi: global
// PLAYER_PART_BEGIN s14.faustMenuBase.1 EDITABLE
const faustMenuBase=drawCustomMenu;
// PLAYER_PART_END s14.faustMenuBase.1

// index.html:110587 · Phạm vi: global
// PLAYER_PART_BEGIN s14.drawCustomMenu.1 EDITABLE
drawCustomMenu=function(){faustMenuBase();if(!danteOn()||dino?.dante?.arm!==5||runePicker!==null||ammoPicker||ammoXem!==null)return;ctx.save();ctx.fillStyle='#190e14';ctx.fillRect(708,135,262,380);ctx.font='bold 14px Consolas,monospace';ctx.fillStyle='#ff85ab';ctx.textAlign='left';ctx.fillText('DR. FAUST · Q/E',716,157);ctx.font='11px Consolas,monospace';ctx.fillStyle='#eee0df';apexWrap(LT('J: bắn · Giữ J: vòng đạn\nĐang có vòng đạn → Dash:\nphóng 6 mũi truy kích mục tiêu\nDash J: RED SHOT xuyên xa\n\nK: ném mũ · K tiếp: gọi về nổ\nCúi K ×3: chém → quất → hất\nAir K: xoay người chém mũ\nDash K: lướt cắt vành mũ\n\nCúi + giữ K 0.5–1.5s:\nRED SHOT — 3 tia, lực tăng dần\nGiữ K 1s (không cúi):\nRED HOT NIGHT — khóa vị trí\n3 thiên thạch / Gunslinger: 4', 'J: fire · Hold J: orbit\nOrbit → Dash: launch 6\nhoming crystal spears\nDash J: long piercing RED SHOT\n\nK: throw · K again: recall burst\nDown K x3: slash, backhand, lift\nAir K: spinning brim slash\nDash K: sliding hat cut\n\nDown + hold K 0.5–1.5s:\nRED SHOT — 3 piercing pulses\nHold K 1s (no crouch):\nRED HOT NIGHT — lock position\n3 meteors / 4 in Gunslinger'),716,181,248,22);ctx.restore();};
// PLAYER_PART_END s14.drawCustomMenu.1
