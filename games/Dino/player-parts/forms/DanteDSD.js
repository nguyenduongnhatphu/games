// PLAYER_FILE: DanteDSD
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DANTE_ATTACK_RATE, Effect, OCEAN_FLOOR, Player, canvas, checkAABB, ctx, danteActive, danteBalrogRelay, danteBossOpening, danteBossWindows, danteControlAllowed, danteDraw, danteHit, danteIsBoss, danteKey, danteLabel, danteOn, danteRelease, danteSin, danteTick, dashCd, dashVx, dino, dkNenY, doDash, frames, gameOver, gameVictory, keys, mapTheme, paused, platforms, playerAttackStep, playerComboBuffer, playerComboTrack, playerFinisherControl, sgTargets, shakeTimer, vergilOn, vgDealDamage, visualEffects, worldL, worldR
// index.html:106735 · Phạm vi: global
// PLAYER_PART_BEGIN s12.DSW_MOVES.1 EDITABLE
const DSW_MOVES={
 a1:{name:'COMBO A · DOWN',T:20,wind:4,end:13,damage:3,pose:'down',advance:5},
 a2:{name:'COMBO A · UP',T:20,wind:4,end:13,damage:3,pose:'up',advance:6},
 a3:{name:'COMBO A · SPIN CLEAVE',T:28,wind:6,end:20,damage:3,pose:'spin',push:10,advance:10},
 bspin:{name:'COMBO B · DOUBLE SPIN',T:34,wind:4,end:28,damage:3,pose:'spin',hits:[8,21],advance:8},
 bstab:{name:'COMBO B · MILLION STAB',T:32,wind:2,end:28,damage:1,pose:'stab',count:6},
 thrust:{name:'POWER THRUST',T:28,wind:10,end:19,damage:5,pose:'thrust',push:19,red:true,advance:14},
 air1:{name:'AERIAL · DOWN',T:18,wind:3,end:11,damage:3,pose:'down'},
 air2:{name:'AERIAL · UP',T:18,wind:3,end:11,damage:3,pose:'up'},
 air3:{name:'AERIAL · CROSS',T:20,wind:4,end:14,damage:3,pose:'cross'},
 air4:{name:'AERIAL · SMASH',T:25,wind:7,end:16,damage:5,pose:'down',slam:true,red:true},
 high:{name:'HIGH TIME',T:26,wind:5,end:16,damage:5,pose:'up',launch:true,red:true},
 helm:{name:'HELM BREAKER',T:24,wind:5,end:17,damage:5,pose:'down',slam:true,red:true},
 stinger:{name:'STINGER',T:24,wind:5,end:16,damage:5,pose:'thrust',push:13,red:true},
 million:{name:'MILLION STAB',T:30,wind:0,end:29,damage:1,pose:'stab',count:6},
 prop:{name:'PROP',T:26,wind:4,end:19,damage:3,pose:'prop',launch:'prop',red:true},
 shred:{name:'SHREDDER',T:28,wind:0,end:26,damage:3,pose:'shred',hits:[4,13,22],hold:true,red:true},
 drive:{name:'DRIVE',T:26,wind:7,end:18,damage:3,pose:'up',waves:1,red:true},
 overdrive:{name:'OVERDRIVE',T:44,wind:7,end:30,damage:3,pose:'up',waves:3,red:true},
 round:{name:'ROUND TRIP',T:22,wind:5,end:13,damage:0,pose:'cross',round:true,red:true},
 retreat_round:{name:'ROUND TRIP · BACKSTEP',T:28,wind:6,end:18,damage:0,pose:'cross',round:true,red:true},
 dhit:{name:'DANCE MACABRE · RAM',T:16,wind:3,end:10,damage:5,pose:'ram',advance:10,red:true},
 ddown:{name:'DANCE MACABRE · DOWN',T:18,wind:3,end:11,damage:3,pose:'down',advance:6},
 dup:{name:'DANCE MACABRE · UP',T:18,wind:3,end:11,damage:3,pose:'up',advance:6},
 dcross:{name:'DANCE MACABRE · CROSS',T:20,wind:4,end:13,damage:3,pose:'cross',advance:6},
 dspin:{name:'DANCE MACABRE · SPIN',T:24,wind:4,end:18,damage:3,pose:'spin',advance:8},
 dstab:{name:'DANCE MACABRE · 12 STABS',T:60,wind:0,end:59,damage:1,pose:'stab',count:12,red:true},
 dwave1:{name:'DANCE MACABRE · DRIVE I',T:22,wind:4,end:13,damage:3,pose:'up',waves:1,red:true},
 dwave2:{name:'DANCE MACABRE · DRIVE II',T:22,wind:4,end:13,damage:3,pose:'up',waves:1,red:true},
 dfinish:{name:'DANCE MACABRE · FINISH',T:40,wind:20,end:31,damage:5,pose:'cross',push:24,wall:true,red:true,advance:16}
};
// PLAYER_PART_END s12.DSW_MOVES.1

// index.html:106766 · Phạm vi: global
// PLAYER_PART_BEGIN s12.DSW_DANCE.1 EDITABLE
const DSW_DANCE=['dhit','ddown','dup','dcross','dspin','dstab','dwave1','dwave2','dfinish'];
// PLAYER_PART_END s12.DSW_DANCE.1

// index.html:106768 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswState.1 EDITABLE
function dswState(p){
 return p.sword||(p.sword={queue:[],last:'',ended:-1000,lastDash:-1000,dashDir:1,airSlow:0,round:null,waves:[],trail:[],sparks:[],controls:new Set(),pose:null});
}
// PLAYER_PART_END s12.dswState.1

// index.html:106771 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswUsing.1 EDITABLE
function dswUsing(){return danteActive(dino)&&dino.dante&&dino.dante.arm===0;}
// PLAYER_PART_END s12.dswUsing.1

// index.html:106772 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswFloor.1 EDITABLE
function dswFloor(x,feet){
 let floor=mapTheme==='ocean'?OCEAN_FLOOR:dkNenY();
 for(const pl of platforms||[])if(!pl.wall&&x>=pl.x&&x<=pl.x+pl.w&&pl.top>=feet-12)floor=Math.min(floor,pl.top);
 return floor;
}
// PLAYER_PART_END s12.dswFloor.1

// index.html:106781 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswControl.1 EDITABLE
function dswControl(o,opt={},p=dino.dante){
 o=o.__goc||o;
 if(!o||!p||o.invulnAll||o.hp<=0||o._beamClashPoint)return;
 if(!danteControlAllowed(o))return null;
 const s=dswState(p);
 let c=o._dswControl;
 if(!c){
  const own=Object.prototype.hasOwnProperty.call(o,'update'),old=o.update;
  c={stun:0,vx:0,vy:0,air:false,hold:false,slam:false,targetY:null,life:300,wall:false,own,old,owner:dino,arm:p.damageArm??p.arm,vergil:p===dino.vergil};
  if(danteIsBoss(o)){const b=danteBossWindows.get(o);if(!b||frames>=b.until){const duration=danteBossOpening(o)?36:6;danteBossWindows.set(o,{...b,until:frames+duration,ready:frames+duration+120});}c.bossOrigin={y:o.y,grounded:o.grounded};}
  o._dswControl=c;s.controls.add(o);
  const release=()=>{
   if(o.update===c.wrap){if(own)o.update=old;else delete o.update;}
   delete o._dswControl;s.controls.delete(o);
  };
  c.release=release;
  c.wrap=function(...args){
   if(c.bossOrigin&&frames>=danteBossWindows.get(this).until){
    this.y=c.bossOrigin.y;this.grounded=c.bossOrigin.grounded;this.dy=0;if('vy' in this)this.vy=0;
    release();return typeof old==='function'?old.apply(this,args):undefined;
   }
   if(this.hp<=0||!(c.vergil?vergilOn():danteOn())||dino!==c.owner||dino.hp<=0||--c.life<=0){
    release();
    return typeof old==='function'?old.apply(this,args):undefined;
   }
   const ox=this.x,oy=this.y,oh=this.h||48,ow=this.w||40;
   const floor=dswFloor(ox+ow/2,oy+oh);

   // Nếu đang bị Stun hoặc giữ trên không thì khóa AI di chuyển chủ động của địch,
   // nhưng VẪN cập nhật vật lý rơi của chính `_dswControl` cho tới khi chạm đất!
   const lock=c.stun>0||c.hold||c.air;
   if(c.stun>0)c.stun--;
   if(!lock&&typeof old==='function')old.apply(this,args);

   if(c.air){
    this.grounded=false;
    if(c.hold){
     // Đang bị giữ bởi Shredder hoặc Aerial Rave -> Kéo mượt về độ cao chuẩn trước mặt Dante
     const wantY=(c.targetY!==null)?c.targetY:(dino.y+dino.h/2-oh/2-8);
     this.y+=(wantY-oy)*0.32;
     c.vy=0;
     if(!p.attack||!(c.vergil?p.attack.holdAir:['prop','shred'].includes(p.attack.id))){
      c.hold=false;c.vy=1.2; // Tắt Shredder là bắt đầu rơi xuống ngay!
     }
    }else{
     // Đang bay lên hoặc rơi xuống
     if(c.targetY!==null&&c.vy<0&&oy<=c.targetY){
      this.y=c.targetY;c.vy=0.4;c.targetY=null; // Chặn trần bay để không văng tuốt lên trời
     }else{
      const grav=c.slam?1.35:(c.stun>0?0.24:0.58);
      const maxFall=c.slam?20:(c.stun>0?2.0:11);
      c.vy=Math.min(maxFall,c.vy+grav);
      this.y=oy+c.vy;
     }
    }
    this.dy=c.vy;if('vy' in this)this.vy=c.vy;

    // Kiểm tra chạm mặt sàn -> Hạ cánh an toàn, không bao giờ kẹt lơ lửng
    if(c.vy>=0&&this.y+oh>=floor){
     this.y=floor-oh;this.dy=0;if('vy' in this)this.vy=0;
     this.grounded=true;c.air=false;c.hold=false;c.slam=false;c.targetY=null;
    }
   }

   // Xử lý đẩy ngang & Va tường (Dance Macabre Finisher)
   if(Math.abs(c.vx)>0.2){
    const raw=this.x+c.vx;
    const minX=(typeof worldL==='function'?worldL():12),maxX=(typeof worldR==='function'?worldR():canvas.width-12)-ow;
    this.x=Math.max(minX,Math.min(maxX,raw));
    if(c.wall&&this.x!==raw){
     if(c.vergil)vgDealDamage(p,this,5,'yamato');else danteHit(p,this,5,c.arm);
     c.wall=false;c.vx=-c.vx*0.35;
     visualEffects.push(new Effect(this.x+ow/2,this.y+oh/2,'explosion',true,42));
     shakeTimer=Math.max(shakeTimer,14);
    }
    c.vx*=0.86;
   }

   // Chỉ tháo wrapper khi kẻ địch đã chạm đất hoàn toàn và hết lực đẩy
   if(!c.air&&!c.hold&&c.stun<=0&&Math.abs(c.vx)<=0.2){
    release();
   }
  };
  o.update=c.wrap;
 }

 const oh=o.h||48;
 const floor=dswFloor(o.x+(o.w||40)/2,o.y+oh);

 // 1. PROP: Hất lên vừa đúng tầm ngực/đầu của Dante (cách mặt đất ~42px) để nối Shredder 100% trúng!
 if(opt.launch==='prop'){
  c.air=true;c.hold=false;c.slam=false;
  c.targetY=Math.max(40,dino.y+dino.h-oh-38);
  c.vy=-6.2;
  c.stun=Math.max(c.stun,36);
  o.grounded=false;
  const wantX=dino.x+dino.w/2+(dino.isFacingLeft?-1:1)*52-(o.w||40)/2;
  o.x+=(wantX-o.x)*0.45;
 }
 // 2. HIGH TIME: Hất cao hơn Prop để nhảy lên đánh Aerial Rave, nhưng có trần chặn rõ ràng
 else if(opt.launch){
  c.air=true;c.hold=false;c.slam=false;
  c.targetY=Math.max(36,floor-oh-105);
  c.vy=-9.2;
  c.stun=Math.max(c.stun,30); // Khống chế 0.5s (30 frame)
  o.grounded=false;
 }
 // 3. Đòn chém bồi trên không: cộng thêm 0.1s (6 frame) khống chế & ghìm rơi
 if(opt.extra&&c.air){
  c.stun+=6;
  c.vy=Math.min(c.vy,-0.8);
 }
 // 4. SHREDDER: Giữ cứng kẻ địch trong lốc xoáy lưỡi cưa trước mặt Dante
 if(opt.hold){
  c.air=true;c.hold=true;c.slam=false;
  c.targetY=Math.max(40,dino.y+dino.h-oh-36);
  c.vy=0;
  c.stun=Math.max(c.stun,14);
  const wantX=dino.x+dino.w/2+(dino.isFacingLeft?-1:1)*56-(o.w||40)/2;
  o.x+=(wantX-o.x)*0.35;
 }
 // 5. AERIAL SMASH / HELM BREAKER: Đập thẳng từ trên không xuống sàn
 if(opt.slam){
  c.air=true;c.hold=false;c.slam=true;c.targetY=null;
  c.vy=17;
  c.stun=Math.max(c.stun,14);
 }
 // 6. Đẩy lùi / Đánh văng vô tường
 if(opt.push){
  c.vx=opt.push;
  c.stun=Math.max(c.stun,12);
  c.wall=!!opt.wall;
 }
 c.life=300;
 return c;
}
// PLAYER_PART_END s12.dswControl.1

// index.html:106918 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswReleaseHolds.1 EDITABLE
function dswReleaseHolds(s){
 for(const o of s.controls){
  if(o._dswControl){
   o._dswControl.hold=false;
   o._dswControl.targetY=null;
   if(o._dswControl.vy<=0)o._dswControl.vy=1.8;
  }
 }
}
// PLAYER_PART_END s12.dswReleaseHolds.1

// index.html:106928 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswStart.1 EDITABLE
function dswStart(id,extra={}){
 const n=dino,p=n.dante,s=dswState(p),m=DSW_MOVES[id];if(!m||n.hp<=0)return;
 if(s.round&&!['drive','overdrive','round','retreat_round'].includes(id)){s.round.returning=true;}
 p.k=null;p.cd=0;
 p.attack={...m,...extra,id,sword:true,age:0,dir:n.isFacingLeft?-1:1,hit:new Map(),name:m.name,duration:m.T};
 playerComboTrack(p,p.attack,'dsd');
 s.trail=[];
 if(id==='million'||id==='bstab'||id==='dstab')dashVx=0;
 if(id==='high')s.airSlow=100;
 if(id==='helm'){s.airSlow=0;p.attack.airWait=0;}
 if(id==='stinger')dashVx=p.attack.dir*16;
 if(id==='retreat_round')dashVx=-p.attack.dir*12;
 if(id==='dhit')dashVx=p.attack.dir*12;
 if(id==='shred'){
  for(const o of s.controls)if(o._dswControl){o._dswControl.air=true;o._dswControl.hold=true;}
 }
 if(!['a1','a2','a3','air1','air2','air3','air4'].includes(id))danteLabel(m.name);
}
// PLAYER_PART_END s12.dswStart.1

// index.html:106947 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswCommand.1 EDITABLE
function dswCommand(cmd){
 const n=dino,p=n.dante,s=dswState(p),a=p.attack;
 if(a&&a.sword){
  const pendingDash=s.queue.find(q=>q.key==='dash');
  if(cmd.key==='J'&&pendingDash){pendingDash.extensions=Math.min(4,(pendingDash.extensions||0)+1);return;}
  if(cmd.key==='J'&&a.id==='million'){a.extensions=Math.min(4,(a.extensions||0)+1);return;}
  if(cmd.key==='K'&&DSW_DANCE.includes(a.id)){a.continue=Math.min(8,(a.continue||0)+1);return;}
  playerComboBuffer(s.queue,cmd);
  return;
 }
 dswDispatch(cmd);
}
// PLAYER_PART_END s12.dswCommand.1

// index.html:106963 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswDispatch.1 EDITABLE
function dswDispatch(cmd){
 const n=dino,p=n.dante,s=dswState(p),recent=frames-s.ended<=35,last=recent?s.last:'';
 if(n.isShielding()||p.cd>0)return;
 if(cmd.force){dswStart(cmd.force,cmd);return;}
 if(cmd.key==='jump'){if(n.grounded&&last==='a1')dswStart('high');return;}
 if(cmd.key==='dash'){
  if(last==='a1'||last==='a2'||last==='a3'){dashVx=0;dswStart('million',{level:0,extensions:cmd.extensions||0});}
  return;
 }
 if(cmd.key==='K'){
  // 1. Trên không + K -> Helm Breaker
  if(cmd.air){dswStart('helm');return;}
  // 2. Nối chuỗi Combo B (J -> K -> K -> K)
  if(last==='a2'&&!cmd.down&&!cmd.dash&&!danteSin(p)){dswStart('retreat_round');return;}
  if(last==='retreat_round'&&!danteSin(p)){danteBalrogRelay();return;}
  if(last==='a1'){dswStart('bspin');return;}
  if(last==='bspin'){dswStart('bstab');return;}
  if(last==='bstab'){dswStart('thrust');return;}
  // 3. Lướt tới + K -> Mở màn Dance Macabre
  if(cmd.dash){dswStart('dhit',{continue:0});return;}
  // 4. Cúi + K -> Ném kiếm ROUND TRIP (Nếu kiếm đang bay ngoài sân thì gọi thu về, chống spam)
  if(cmd.down){
   if(s.round){s.round.returning=true;return;}
   dswStart('round');return;
  }
  // 5. Đứng + K -> DRIVE (Nhấn thả) hoặc OVERDRIVE (Giữ K >= 45 frame)
  dswStart((cmd.charge||0)>=45?'overdrive':'drive');
  return;
 }
 if(cmd.key==='J'){
  if(cmd.down&&n.grounded){
   if(last==='prop'||last==='shred'){
    const count=last==='shred'?(s.shreds||0)+1:1;
    if(count<=3){s.shreds=count;dswStart('shred');return;}
   }
   s.shreds=0;dswStart('prop');return;
  }
  if(last==='prop'||last==='shred'){
   const count=last==='shred'?(s.shreds||0)+1:1;
   if(count<=3){s.shreds=count;dswStart('shred');return;}
  }
  if(!n.grounded){
   const i=['air1','air2','air3'].indexOf(last);
   dswStart(i>=0?'air'+(i+2):'air1');return;
  }
  if(cmd.dash){dswStart('stinger');return;}
  dswStart(last==='a1'?'a2':last==='a2'?'a3':'a1');
 }
}
// PLAYER_PART_END s12.dswDispatch.1

// index.html:107013 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswKeyBase.1 EDITABLE
const dswKeyBase=danteKey;
// PLAYER_PART_END s12.dswKeyBase.1

// index.html:107014 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteKey.2 EDITABLE
danteKey=function(code,repeat){
 if(!dswUsing())return dswKeyBase(code,repeat);
 const p=dino.dante,s=dswState(p),a=p.attack;
 if(['KeyJ','KeyK'].includes(code)){
  keys[code]=true;if(repeat||paused||gameOver||gameVictory)return true;
  const cmd={key:code==='KeyJ'?'J':'K',down:!!(keys.KeyS||keys.ArrowDown),air:!dino.grounded,dash:frames-s.lastDash<=24};
  if(code==='KeyJ'){
   dswCommand(cmd);
  }else{
   // Khi bấm K: nếu là Trên không, Lướt, Cúi (Round Trip), hoặc đang nối Combo B / Dance Macabre thì thi triển ngay!
   // Nếu đang đứng bình thường thì bắt đầu nạp Drive / Overdrive.
   const recent=frames-s.ended<=35,last=recent?s.last:'';
   const isComboB=(!a&&['a1','a2','bspin','bstab','retreat_round'].includes(last))||(a&&['a1','a2','bspin','bstab','retreat_round'].includes(a.id));
   const isDance=(a&&DSW_DANCE.includes(a.id));
   if(cmd.air||cmd.dash||cmd.down||isComboB||isDance||a){
    dswCommand(cmd);
   }else{
    p.k=0;s.chargeCmd=cmd;
   }
  }
  return true;
 }
 if(['Space','KeyW','ArrowUp'].includes(code)&&!repeat&&!paused){
  if(dino.grounded&&((a&&a.id==='a1')||(!a&&s.last==='a1'&&frames-s.ended<=35))){
   keys[code]=true;dswCommand({key:'jump'});return true;
  }
 }
 if(code==='KeyL'&&!repeat){dswCancel(p);}
 return dswKeyBase(code,repeat);
};
// PLAYER_PART_END s12.danteKey.2

// index.html:107045 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswReleaseBase.1 EDITABLE
const dswReleaseBase=danteRelease;
// PLAYER_PART_END s12.dswReleaseBase.1

// index.html:107046 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteRelease.2 EDITABLE
danteRelease=function(){
 if(!dswUsing())return dswReleaseBase();
 const p=dino.dante,s=dswState(p);
 if(p.k!==null){
  const c={...(s.chargeCmd||{key:'K',down:false}),charge:p.k};
  p.k=null;s.chargeCmd=null;
  dswCommand(c);
 }
};
// PLAYER_PART_END s12.danteRelease.2

// index.html:107056 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswDashBase.1 EDITABLE
const dswDashBase=doDash;
// PLAYER_PART_END s12.dswDashBase.1

// index.html:107057 · Phạm vi: global
// PLAYER_PART_BEGIN s12.doDash.1 EDITABLE
doDash=function(...args){
 const before=dashCd;dswDashBase(...args);
 if(dswUsing()&&dashCd>before){
  const s=dswState(dino.dante);s.lastDash=frames;s.dashDir=dino.dashDir;
  dswCommand({key:'dash'});
 }
};
// PLAYER_PART_END s12.doDash.1

// index.html:107065 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswCancel.1 EDITABLE
function dswCancel(p){
 if(!p||!p.sword)return;
 p.attack=null;p.k=null;p.sword.queue=[];p.sword.last='';p.sword.airSlow=0;
 dswReleaseHolds(p.sword);
}
// PLAYER_PART_END s12.dswCancel.1

// index.html:107074 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswPose.1 EDITABLE
function dswPose(n,a,age){
 const dir=a?a.dir:(n.isFacingLeft?-1:1),m=a||{};
 const progress=a?Math.max(0,Math.min(1,(age-m.wind)/Math.max(1,m.end-m.wind))):0;
 // Hàm nội suy bậc 3 có độ văng (Ease-out cubic) tạo lực chém thật
 const eased=1-Math.pow(1-progress,3);
 const windRatio=a&&m.wind>0?Math.min(1,age/m.wind):1;

 // Tọa độ vai chuẩn trên cơ thể Dante
 const ox=n.x+n.w/2, oy=n.y;
 let angle=0.55, hx=13, hy=25, len=78, flat=1, thrustCone=0, spinbuzz=false;

 if(!a){
  // Tư thế cầm kiếm nghỉ (Idle) tự nhiên bên hông phải
  const breath=Math.sin(frames*0.07)*1.2;
  angle=0.68; hx=12; hy=27+breath; len=74;
 } else {
  switch(m.pose){
   case 'down': // Chém bổ từ trên đỉnh đầu xuống
    if(age<=m.wind){
     angle=-2.35-0.25*windRatio; hx=4-4*windRatio; hy=12-3*windRatio;
    }else{
     angle=-2.6+3.65*eased;
     hx=10+12*Math.sin(eased*Math.PI);
     hy=12+20*eased;
    }
    break;

   case 'up': // Chém vớt ngược từ dưới đất lên trời (Combo A2 / High Time / Drive)
    if(age<=m.wind){
     angle=1.55+0.2*windRatio; hx=6; hy=36;
    }else{
     angle=1.75-3.65*eased;
     hx=10+12*Math.sin(eased*Math.PI);
     hy=36-22*eased;
    }
    break;

   case 'cross': // Chém vắt ngang ngực (Aerial 3 / Dance Macabre Finish)
    if(age<=m.wind){
     angle=-2.65; hx=2; hy=24; flat=0.45;
    }else{
     angle=-2.65+5.1*eased;
     hx=8+14*Math.sin(eased*Math.PI);
     hy=24; flat=0.36;
    }
    break;

   case 'spin': { // Xoay người chém vòng tròn 360 / 720 độ
    const loops=(m.id==='bspin')?2:1;
    angle=-2.5+Math.PI*2*loops*eased;
    hx=10+10*Math.cos(angle);
    hy=25+4*Math.sin(angle);
    flat=0.42;
    break;
   }

   case 'prop': // Xoay kiếm cối xay thẳng đứng trước ngực hất địch lên
   case 'shred': {
    const spd=(m.pose==='shred')?0.85:0.58;
    angle=-(age-m.wind)*spd;
    hx=22; hy=23; len=70; spinbuzz=true;
    break;
   }

   case 'stab': { // Million Stab: Đâm siêu tốc nhiều mũi ở các góc quạt nhỏ
    const count=m.count||6, span=(m.id==='dstab')?60:30;
    const phase=((age*count)/span)%1;
    const jab=Math.sin(phase*Math.PI);
    const fan=Math.sin(age*2.3)*0.16;
    angle=fan;
    hx=8+16*jab; // Cổ tay chỉ vươn trong tầm giải phẫu học (tối đa 24px!)
    hy=24+Math.sin(age*1.9)*4;
    len=78+16*jab;
    thrustCone=jab;
    break;
   }

   case 'thrust': { // Stinger & Power Thrust: Thu kiếm lấy đà rồi phóng mũi giáo đỏ rực!
    if(age<=m.wind){
     angle=0.08; hx=-4*windRatio; hy=26; len=74;
    }else{
     const punch=Math.sin(eased*Math.PI*0.85);
     angle=0;
     hx=22*punch; // Tay duỗi thẳng tự nhiên (22px), KHÔNG kéo giãn tay!
     hy=24;
     len=94;
     thrustCone=punch;
    }
    break;
   }

   case 'ram': // Dance Macabre nhịp 1: Húc vai cận chiến
    angle=2.2; hx=14; hy=24; len=72;
    break;
  }
 }

 if(m.id==='helm'&&m.airWait>3&&!n.grounded){
  angle=1.22; hx=18; hy=22; len=88;
 }
 if(m.red)len+=8;

 const wx=ox+dir*hx, wy=oy+hy;
 return {
  x:wx, y:wy,
  tx:wx+dir*Math.cos(angle)*len,
  ty:wy+Math.sin(angle)*len*flat,
  angle, flat, len, dir, ox, oy,
  red:!!m.red, thrustCone, spinbuzz, pose:m.pose||''
 };
}
// PLAYER_PART_END s12.dswPose.1

// index.html:107186 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswBladeTouches.1 EDITABLE
function dswBladeTouches(o,v,w=12){
 const steps=14, ow=o.w||24, oh=o.h||32;
 for(let i=0;i<=steps;i++){
  const t=i/steps, x=v.x+(v.tx-v.x)*t, y=v.y+(v.ty-v.y)*t;
  if(x>=o.x-w&&x<=o.x+ow+w&&y>=o.y-w&&y<=o.y+oh+w)return true;
 }
 return false;
}
// PLAYER_PART_END s12.dswBladeTouches.1

// index.html:107195 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswStrike.1 EDITABLE
function dswStrike(n,p,a,pulse,prevAge){
 const s=dswState(p);
 for(const o of sgTargets(n)){
  const root=o.__goc||o,seen=a.hit.get(root);
  if(seen===pulse)continue;
  let hit=false;

  // Vùng hitbox rộng và ổn định cho Prop & Shredder để xoay cưa không bao giờ trượt
  if(a.id==='prop'||a.id==='shred'){
   const box={
    x:a.dir<0?n.x-96:n.x+n.w-12,
    y:n.y-42,
    w:108,
    h:n.h+58
   };
   if(checkAABB(box,o))hit=true;
  }

  if(!hit){
   for(let k=0;k<=6;k++){
    const v=dswPose(n,a,prevAge+(a.age-prevAge)*k/6);
    if(a.prevX!==undefined&&['stinger','dhit','thrust'].includes(a.id)){
     const dx=(a.prevX-n.x)*(1-k/6);v.x+=dx;v.tx+=dx;
    }
    if(dswBladeTouches(o,v,a.pose==='stab'||a.pose==='thrust'?18:13)){hit=true;break;}
   }
  }
  if(!hit)continue;
  const dealt=danteHit(p,o,a.damage+(p.dt?2:0));
  if(!dealt)continue;
  a.hit.set(root,pulse);

  if(playerFinisherControl(n,p,a,o,{pulse}))continue;
  if(!danteControlAllowed(root))continue;
  const held=root._dswControl;
  dswControl(o,{
   launch:a.launch,
   extra:!!(held&&held.air)&&!a.launch&&!a.hold&&!a.slam,
   hold:a.hold,
   slam:a.slam,
   push:a.push?a.push*a.dir:0,
   wall:a.wall
  });

  if(a.launch)s.airSlow=Math.max(s.airSlow,90);
  if(a.id==='high'&&!a.jumped){
   a.jumped=true;n.dy=-8.8;n.grounded=false;n.canDoubleJump=true;n.jumpCount=1;
  }
  if(a.pose==='stab'&&root._dswControl){
   root._dswControl.stun=Math.max(root._dswControl.stun,10);
   // Giữ địch ở ngay đầu mũi kiếm khi đang đâm Million Stab
   if(Math.abs((o.x+o.w/2)-(n.x+n.w/2))<65)o.x+=a.dir*3;
  }
  if(a.id.startsWith('d')&&DSW_DANCE.includes(a.id)&&root._dswControl){
   root._dswControl.stun=Math.max(root._dswControl.stun,a.T-a.age+10);
  }
 }
}
// PLAYER_PART_END s12.dswStrike.1

// index.html:107254 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswWave.1 EDITABLE
function dswWave(n,p,a,idx=0){
 const s=dswState(p);
 s.waves.push({
  x:n.x+n.w/2+a.dir*24,
  y:n.y+n.h/2-4+(idx===1?-8:idx===2?6:0),
  dir:a.dir,
  vy:idx===1?-0.35:idx===2?0.35:0,
  scale:a.id==='overdrive'?(idx===2?1.3:1.1):1.0,
  t:0,
  hit:new Set(),
  damage:3+(p.dt?2:0)
 });
}
// PLAYER_PART_END s12.dswWave.1

// index.html:107268 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswFinish.1 EDITABLE
function dswFinish(p,a){
 const s=dswState(p);p.attack=null;s.last=a.id;s.ended=frames;
 if(a.id==='million'){
  const level=a.level||0;
  if((a.extensions||0)>0&&level<4){
   dswStart('million',{level:level+1,count:6+(level+1)*2,extensions:a.extensions-1});
   return;
  }
  dswStart('thrust');return;
 }
 const di=DSW_DANCE.indexOf(a.id);
 if(di>=0&&di<DSW_DANCE.length-1&&(a.continue||keys.KeyK)){
  dswStart(DSW_DANCE[di+1],{continue:Math.max(0,(a.continue||0)-1)});
  return;
 }
 if(s.queue.length)dswDispatch(s.queue.shift());
 if(!p.attack||p.attack.id!=='shred')dswReleaseHolds(s);
}
// PLAYER_PART_END s12.dswFinish.1

// index.html:107287 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswTick.1 EDITABLE
function dswTick(n,p){
 const s=dswState(p);
 if(s.prevArm!==undefined&&s.prevArm!==p.arm){s.queue=[];s.last='';dswReleaseHolds(s);}
 s.prevArm=p.arm;
 if(s.airSlow>0)s.airSlow--;
 if(n.grounded&&!p.attack)s.airSlow=0;

 const a=p.attack;
 if(a&&a.sword&&playerAttackStep(a,DANTE_ATTACK_RATE)){
  const prev=a.age;a.age++;
  if(a.advance&&a.age===a.wind+1&&n.grounded){
   dashVx=a.dir*a.advance;
  }
  if(a.id==='helm'&&!n.grounded){
   a.airWait++;a.age=Math.min(a.age,a.wind+1);n.dy=Math.max(n.dy,13);
   if(a.airWait>150){p.attack=null;s.queue=[];}
  }
  if(p.attack){
   if(a.id==='high'&&a.age===a.end&&!a.jumped){
    a.jumped=true;n.dy=-8.8;n.grounded=false;n.canDoubleJump=true;n.jumpCount=1;
   }
   if(a.count){
    const first=a.id==='million'||a.id==='dstab'?0:a.wind,span=a.id==='dstab'?60:30;
    const k=Math.floor((a.age-first-1)*a.count/span);
    const old=Math.floor((prev-first-1)*a.count/span);
    if(k>=0&&k<a.count&&k!==old){
     a.age=Math.max(a.age,first+1);
     dswStrike(n,p,a,k,Math.max(0,a.age-3));
     // Sinh tia kiếm đỏ khi đâm Million Stab
     s.sparks.push({
      x:n.x+n.w/2+a.dir*18,
      y:n.y+26+(Math.random()-0.5)*22,
      dir:a.dir,
      len:78+Math.random()*28,
      ang:(Math.random()-0.5)*0.18,
      t:6,max:6
     });
    }
   }
   else if(a.hits){
    const index=a.hits.indexOf(a.age);
    if(index>=0)dswStrike(n,p,a,index,Math.max(0,a.age-5));
   }
   else if(!a.waves&&!a.round&&a.age>a.wind&&a.age<=a.end){
    dswStrike(n,p,a,0,prev);
   }

   if(a.waves&&a.age>=a.wind+1&&(a.age-a.wind-1)%7===0&&(a.age-a.wind-1)/7<a.waves){
    dswWave(n,p,a,(a.age-a.wind-1)/7);
   }
   if(a.round&&a.age===a.wind+1&&!s.round){
    s.round={x:n.x+n.w/2+a.dir*24,y:n.y+28,dir:a.dir,t:0,returning:false,hit:new Map()};
   }
   a.prevX=n.x;
   if(a.age>=a.T)dswFinish(p,a);
  }
 }

 if(!p.attack&&s.queue.length&&!s.round)dswDispatch(s.queue.shift());

 // Cập nhật kiếm xoay Round Trip (Tự động tìm và bám mục tiêu gần nhất, 1 dmg / 15 frame)
 if(s.round){
  const r=s.round;r.t++;
  if(r.t>135)r.returning=true;
  if(r.returning){
   const dx=n.x+n.w/2-r.x,dy=n.y+n.h/2-r.y,dist=Math.hypot(dx,dy);
   if(dist<22)s.round=null;
   else{r.x+=dx/dist*16;r.y+=dy/dist*16;}
  }else{
   const targets=sgTargets(n).filter(o=>o&&o.hp>0);
   const near=targets.sort((a,b)=>Math.hypot((a.x+a.w/2)-r.x,(a.y+a.h/2)-r.y)-Math.hypot((b.x+b.w/2)-r.x,(b.y+b.h/2)-r.y))[0];
   if(near&&r.t>10){
    const tx=near.x+(near.w||40)/2,ty=near.y+(near.h||50)/2;
    r.x+=(tx-r.x)*0.16;r.y+=(ty-r.y)*0.16;
   }else if(r.t<=18){
    r.x+=r.dir*10;
   }
   for(const o of targets){
    const id=o.__goc||o;
    if(checkAABB({x:r.x-54,y:r.y-54,w:108,h:108},o)&&r.t-(r.hit.get(id)??-20)>=15){
     if(danteHit(p,o,1+(p.dt?2:0)))r.hit.set(id,r.t);
    }
   }
  }
 }

 // Cập nhật sóng kiếm Drive / Overdrive
 for(const w of s.waves){
  const old=w.x;w.x+=w.dir*12.5;w.y+=(w.vy||0);w.t++;
  for(const o of sgTargets(n)){
   const id=o.__goc||o;
   if(!w.hit.has(id)&&checkAABB({x:Math.min(old,w.x)-20,y:w.y-44*w.scale,w:48*w.scale,h:88*w.scale},o)){
    if(danteHit(p,o,w.damage))w.hit.add(id);
   }
  }
 }
 s.waves=s.waves.filter(w=>w.t<55);
 s.sparks=(s.sparks||[]).filter(sp=>--sp.t>0);

 // Cập nhật Pose & Vệt chém (Trail)
 s.pose=dswPose(n,p.attack&&p.attack.sword?p.attack:null,p.attack?p.attack.age:0);
 if(p.attack&&p.attack.sword&&p.attack.age>p.attack.wind&&p.attack.age<=p.attack.end&&!s.round&&!['stab','thrust'].includes(p.attack.pose)){
  for(let sub=1;sub<=3;sub++){
   s.trail.push({...dswPose(n,p.attack,p.attack.age-1+sub/3),t:8});
  }
 }
 s.trail=s.trail.filter(v=>--v.t>0);
 if(s.trail.length>24)s.trail.splice(0,s.trail.length-24);

 // Chuyển động thân người Dante (Lean, Lunge, Spin) mượt mà theo từng nhát kiếm
 const motion=p.attack&&p.attack.sword?p.attack:null;
 if(motion){
  const pr=Math.max(0,Math.min(1,(motion.age-motion.wind)/Math.max(1,motion.end-motion.wind)));
  if(motion.pose==='thrust'||motion.pose==='stab'||motion.pose==='ram'){
   p.body._swordLean=0.26*Math.sin(pr*Math.PI);
   p.body._swordLunge=10*Math.sin(pr*Math.PI);
   p.body._swordBackArm=0.75;
  }else if(motion.pose==='down'){
   p.body._swordLean=0.16*Math.sin(pr*Math.PI);
   p.body._swordLunge=5*pr;
   p.body._swordBackArm=0.55;
  }else if(motion.pose==='up'){
   p.body._swordLean=-0.14*Math.sin(pr*Math.PI);
   p.body._swordLunge=4*pr;
   p.body._swordBackArm=-0.35;
  }else{
   p.body._swordLean=0.1*Math.sin(pr*Math.PI);
   p.body._swordLunge=0;
   p.body._swordBackArm=0.4;
  }
  p.body._swordTurn=motion.pose==='spin'?Math.cos(pr*Math.PI*2*(motion.id==='bspin'?2:1)):1;
 }else{
  p.body._swordLean=0;p.body._swordLunge=0;p.body._swordTurn=1;p.body._swordBackArm=0.22;
 }
 p.body._swordCustom=p.arm===0||p.arm===1||p.arm===2||p.arm===3;
 p.body.drawn=p.arm===0?true:p.body.drawn;
 if(p.attack&&p.attack.sword)p.body.facingLeft=p.attack.dir<0;
}
// PLAYER_PART_END s12.dswTick.1

// index.html:107426 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswTickBase.1 EDITABLE
const dswTickBase=danteTick;
// PLAYER_PART_END s12.dswTickBase.1

// index.html:107427 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteTick.2 EDITABLE
danteTick=function(){dswTickBase();if(danteActive(dino)&&dino.dante){const p=dino.dante;if(p.arm===0||p.sword)dswTick(dino,p);}};
// PLAYER_PART_END s12.danteTick.2

// index.html:107429 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswUpdateBase.1 EDITABLE
const dswUpdateBase=Player.prototype.update;
// PLAYER_PART_END s12.dswUpdateBase.1

// index.html:107430 · Phạm vi: global
// PLAYER_PART_BEGIN s12.Player.prototype.update.1 EDITABLE
Player.prototype.update=function(...args){
 if(!dswUsing()||this!==dino)return dswUpdateBase.apply(this,args);
 const p=this.dante,s=dswState(p),a=p.attack;
 const locked=a&&a.sword&&!['stinger','dhit','helm'].includes(a.id);
 const saved={};
 if(locked)for(const k of ['KeyA','KeyD','ArrowLeft','ArrowRight']){saved[k]=keys[k];keys[k]=false;}
 if(s.airSlow>0&&!this.grounded&&(!a||a.id!=='helm'))this.dy=Math.min(this.dy,0.75);
 try{return dswUpdateBase.apply(this,args);}
 finally{
  for(const k in saved)keys[k]=saved[k];
  if(s.airSlow>0&&!this.grounded&&(!a||a.id!=='helm'))this.dy=Math.min(this.dy,0.75);
 }
};
// PLAYER_PART_END s12.Player.prototype.update.1

// index.html:107444 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswDamageBase.1 EDITABLE
const dswDamageBase=Player.prototype.takeDamage;
// PLAYER_PART_END s12.dswDamageBase.1

// index.html:107445 · Phạm vi: global
// PLAYER_PART_BEGIN s12.Player.prototype.takeDamage.2 EDITABLE
Player.prototype.takeDamage=function(...args){
 const hp=this.hp,result=dswDamageBase.apply(this,args);
 if(this.hp<hp&&this.dante)dswCancel(this.dante);
 return result;
};
// PLAYER_PART_END s12.Player.prototype.takeDamage.2

// index.html:107454 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswPaintBlade.1 EDITABLE
function dswPaintBlade(x,y,angle,len=78,red=false,flat=1){
 ctx.save();
 ctx.translate(x,y);
 ctx.scale(1,flat);
 ctx.rotate(angle);

 // 1. Chuôi kiếm & Quả đấm đầu lâu đỏ
 ctx.fillStyle='#1B1F26';
 ctx.fillRect(-16,-2.8,16,5.6);
 ctx.fillStyle='#C62828';
 ctx.fillRect(-13,-1.8,10,3.6);
 ctx.fillStyle='#FFD54F';
 ctx.beginPath();ctx.arc(-17,0,3.2,0,Math.PI*2);ctx.fill();

 // 2. Hộ thủ xương quỷ (Awakened Skull Guard)
 ctx.fillStyle='#37474F';
 ctx.beginPath();
 ctx.moveTo(-2,-13);ctx.lineTo(9,-8);ctx.lineTo(11,0);
 ctx.lineTo(9,8);ctx.lineTo(-2,13);ctx.lineTo(2,0);
 ctx.closePath();ctx.fill();
 ctx.fillStyle='#FF1744';
 ctx.fillRect(3,-4,2.5,2);ctx.fillRect(3,2,2.5,2);

 // 3. Thân lưỡi kiếm Devil Sword Dante (2 nhánh gai thần + khe dung nham đỏ ở giữa)
 ctx.shadowColor='#FF1744';
 ctx.shadowBlur=red?22:8;

 // Lớp hào quang lưỡi kiếm khi phát sáng đỏ (High Time / Stinger / Helm Breaker / Overdrive)
 if(red){
  ctx.fillStyle='rgba(255, 23, 68, 0.32)';
  ctx.beginPath();
  ctx.moveTo(6,-11);ctx.lineTo(len*0.75,-12);ctx.lineTo(len+12,0);
  ctx.lineTo(len*0.75,12);ctx.lineTo(6,11);
  ctx.closePath();ctx.fill();
 }

 // Lưỡi thép bạc vát cạnh sắc lẹm
 const bg=ctx.createLinearGradient(6,0,len,0);
 bg.addColorStop(0,red?'#FF5252':'#90A4AE');
 bg.addColorStop(0.55,red?'#FF8A80':'#ECEFF1');
 bg.addColorStop(1,'#FFFFFF');
 ctx.fillStyle=bg;
 ctx.beginPath();
 ctx.moveTo(6,-6.5);
 ctx.lineTo(len*0.28,-8.5);
 ctx.lineTo(len*0.34,-6);
 ctx.lineTo(len*0.76,-7.5);
 ctx.lineTo(len,0);
 ctx.lineTo(len*0.76,7.5);
 ctx.lineTo(len*0.34,6);
 ctx.lineTo(len*0.28,8.5);
 ctx.lineTo(6,6.5);
 ctx.closePath();ctx.fill();

 // Sống kiếm đen xám
 ctx.fillStyle='#263238';
 ctx.beginPath();
 ctx.moveTo(8,-3.8);ctx.lineTo(len-10,0);ctx.lineTo(8,3.8);
 ctx.closePath();ctx.fill();

 // Mạch dung nham huyết quỷ phát sáng dọc tâm kiếm
 ctx.strokeStyle=red?'#FFF8E1':'#FF1744';
 ctx.lineWidth=red?3.2:2.2;
 ctx.beginPath();ctx.moveTo(9,0);ctx.lineTo(len-8,0);ctx.stroke();

 ctx.restore();
}
// PLAYER_PART_END s12.dswPaintBlade.1

// index.html:107523 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteArmJoints.1 EDITABLE
function danteArmJoints(sx,sy,wx,wy,dir=1){
 const dx=wx-sx,dy=wy-sy,raw=Math.hypot(dx,dy),d=Math.max(1,Math.min(26.5,raw));
 const ux=raw>1e-6?dx/raw:dir,uy=raw>1e-6?dy/raw:0;
 const x=sx+ux*d,y=sy+uy*d;
 const bend=Math.sqrt(Math.max(0,14*14-d*d/4));
 // Both bones stay 14 px long; a fixed bend side avoids elbow flips mid-swing.
 const side=dir>=0?1:-1;
 return {wx:x,wy:y,ex:sx+ux*d/2-uy*bend*side,ey:sy+uy*d/2+ux*bend*side};
}
// PLAYER_PART_END s12.danteArmJoints.1

// index.html:107532 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswPaintArmIK.1 EDITABLE
function dswPaintArmIK(sx,sy,wx,wy,dir){
 const dx=wx-sx, dy=wy-sy;
 const dist=Math.min(28,Math.hypot(dx,dy));
 const baseAng=Math.atan2(dy,dx);
 // Tính khớp khuỷu tay cong tự nhiên xuống dưới
 const bend=Math.sqrt(Math.max(0,15*15-(dist*0.5)*(dist*0.5)))*0.55;
 const ex=sx+dx*0.5-dir*Math.sin(baseAng)*bend*0.35;
 const ey=sy+dy*0.5+Math.abs(Math.cos(baseAng))*bend+3;

 ctx.save();
 ctx.lineCap='round';ctx.lineJoin='round';
 // Bóng áo khoác ngoài
 ctx.strokeStyle='#5F0909';ctx.lineWidth=9.5;
 ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(ex,ey);ctx.lineTo(wx,wy);ctx.stroke();
 // Tay áo khoác đỏ Trenchcoat
 ctx.strokeStyle='#B71C1C';ctx.lineWidth=7;
 ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(ex,ey);ctx.lineTo(wx,wy);ctx.stroke();
 // Đai cổ tay bạc
 ctx.fillStyle='#CFD8DC';
 ctx.beginPath();ctx.arc(wx-dx*0.12,wy-dy*0.12,3.6,0,Math.PI*2);ctx.fill();
 // Bàn tay đeo găng da đen nắm đốc kiếm
 ctx.fillStyle='#1C1C24';
 ctx.beginPath();ctx.arc(wx,wy,4.5,0,Math.PI*2);ctx.fill();
 ctx.restore();
}
// PLAYER_PART_END s12.dswPaintArmIK.1

// index.html:107558 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswDraw.1 EDITABLE
function dswDraw(n){
 const p=n.dante,s=dswState(p),a=p.attack,v=s.pose||dswPose(n,null,0);
 ctx.save();

 // 1. Vẽ dải lụa kiếm khí (Ribbon Slash Trail) 2 lớp rực rỡ
 for(let i=1;i<s.trail.length;i++){
  const u=s.trail[i-1],w=s.trail[i];
  const alpha=(w.t/8)*0.48;
  ctx.globalAlpha=alpha;
  ctx.fillStyle=w.red?'#FF1744':'#FF5252';
  ctx.beginPath();
  ctx.moveTo(u.x+(u.tx-u.x)*0.45,u.y+(u.ty-u.y)*0.45);
  ctx.lineTo(u.tx,u.ty);
  ctx.lineTo(w.tx,w.ty);
  ctx.lineTo(w.x+(w.tx-w.x)*0.45,w.y+(w.ty-w.y)*0.45);
  ctx.closePath();ctx.fill();

  ctx.globalAlpha=alpha*1.3;
  ctx.strokeStyle=w.red?'#FFF8E1':'#FFCDD2';
  ctx.lineWidth=2.5;
  ctx.beginPath();ctx.moveTo(u.tx,u.ty);ctx.lineTo(w.tx,w.ty);ctx.stroke();
 }
 ctx.globalAlpha=1;

 // 2. Vẽ hiệu ứng bánh xe cưa kiếm đỏ khi dùng PROP / SHREDDER
 if(v.spinbuzz&&a&&['prop','shred'].includes(a.id)){
  ctx.save();
  ctx.translate(v.x+v.dir*24,v.y-6);
  for(let k=0;k<3;k++){
   const sa=v.angle+k*(Math.PI*2/3);
   ctx.globalAlpha=0.45;
   ctx.strokeStyle=k%2===0?'#FF1744':'#FFFFFF';
   ctx.lineWidth=6-k;
   ctx.beginPath();ctx.arc(0,0,54-k*8,sa,sa+1.7);ctx.stroke();
  }
  ctx.restore();
 }

 // 3. Vẽ các tia đâm Million Stab
 for(const sp of s.sparks||[]){
  const ratio=sp.t/sp.max;
  ctx.save();
  ctx.globalAlpha=ratio;
  ctx.translate(sp.x,sp.y);
  ctx.rotate(sp.ang);
  ctx.shadowColor='#FF1744';ctx.shadowBlur=12;
  const ex=sp.dir*sp.len;
  ctx.strokeStyle='#FF1744';ctx.lineWidth=4*ratio;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(ex,0);ctx.stroke();
  ctx.fillStyle='#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(ex+sp.dir*14,0);
  ctx.lineTo(ex-sp.dir*6,-4.5*ratio);
  ctx.lineTo(ex-sp.dir*6,4.5*ratio);
  ctx.closePath();ctx.fill();
  ctx.restore();
 }

 // 4. Vẽ Thanh Kiếm & Cánh Tay IK + Mũi Giáo Năng Lượng Đỏ của STINGER / POWER THRUST
 if(p.arm===0&&!a?.sinDrill){
  const sx=n.x+n.w/2+v.dir*9+(p.body._swordLunge||0)*v.dir*0.5;
  const sy=n.y+21;
  if(!s.round){
   ctx.save();
   ctx.translate(v.x,v.y);
   ctx.scale(v.dir,1);
   dswPaintBlade(0,0,v.angle,v.len,v.red,v.flat);

   // HIỆU ỨNG MŨI GIÁO HUYẾT QUỶ (CRIMSON SPEAR CONE) KHI ĐÂM STINGER / POWER THRUST
   if(v.thrustCone>0.15&&v.pose==='thrust'){
    const c=v.thrustCone;
    ctx.save();
    ctx.rotate(v.angle);
    ctx.globalAlpha=0.85*c;
    ctx.shadowColor='#FF1744';ctx.shadowBlur=24;
    // Luồng xung kích hình nón phóng ra từ mũi kiếm
    const grad=ctx.createLinearGradient(20,0,v.len+55,0);
    grad.addColorStop(0,'rgba(255, 23, 68, 0.05)');
    grad.addColorStop(0.5,'rgba(255, 23, 68, 0.75)');
    grad.addColorStop(1,'#FFFFFF');
    ctx.fillStyle=grad;
    ctx.beginPath();
    ctx.moveTo(22,-16*c);
    ctx.lineTo(v.len+52*c,0);
    ctx.lineTo(22,16*c);
    ctx.lineTo(38,0);
    ctx.closePath();ctx.fill();

    // Vòng sóng siêu âm (Sonic Ring) quanh thân kiếm khi đâm Stinger
    ctx.strokeStyle='#FFF8E1';ctx.lineWidth=2.5*c;
    ctx.beginPath();ctx.ellipse(36,0,5,18*c,0,0,Math.PI*2);ctx.stroke();
    ctx.restore();
   }
   ctx.restore();
  }
  // Vẽ cánh tay IK đè lên chuôi kiếm để bàn tay nắm trọn chuôi kiếm
  dswPaintArmIK(sx,sy,v.x,v.y,v.dir);
 }

 // 5. Vẽ kiếm xoay Round Trip đang bay ngoài sân
 if(s.round){
  ctx.save();
  ctx.translate(s.round.x,s.round.y);
  ctx.strokeStyle='rgba(255, 23, 68, 0.45)';ctx.lineWidth=5;
  ctx.beginPath();ctx.arc(0,0,52,s.round.t*0.4,s.round.t*0.4+4.2);ctx.stroke();
  ctx.restore();
  dswPaintBlade(s.round.x,s.round.y,s.round.t*0.58,68,true);
 }

 // 6. Vẽ luồng kiếm khí DRIVE & OVERDRIVE (Bán nguyệt kép rực lửa đỏ-trắng)
 for(const w of s.waves){
  ctx.save();
  ctx.translate(w.x,w.y);
  ctx.scale(w.dir*(w.scale||1),w.scale||1);
  ctx.shadowColor='#FF1744';ctx.shadowBlur=20;
  ctx.fillStyle='#FF1744';
  ctx.beginPath();
  ctx.arc(-10,0,42,-1.18,1.18);
  ctx.arc(-22,0,36,1.08,-1.08,true);
  ctx.closePath();ctx.fill();
  ctx.fillStyle='#FFF8E1';
  ctx.beginPath();
  ctx.arc(-8,0,37,-0.88,0.88);
  ctx.arc(-16,0,33,0.82,-0.82,true);
  ctx.closePath();ctx.fill();
  ctx.restore();
 }
 ctx.restore();
}
// PLAYER_PART_END s12.dswDraw.1

// index.html:107688 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dswDrawBase.1 EDITABLE
const dswDrawBase=danteDraw;
// PLAYER_PART_END s12.dswDrawBase.1

// index.html:107689 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteDraw.2 EDITABLE
danteDraw=function(n){
 const p=n.dante;
 if(p){p.body._swordCustom=p.arm===0||p.arm===1||p.arm===2||p.arm===3||p.arm===4||p.arm===5;if(p.arm===0)p.body.drawn=true;}
 dswDrawBase(n);
 if(p&&(p.arm===0||p.sword))dswDraw(n);
};
// PLAYER_PART_END s12.danteDraw.2
