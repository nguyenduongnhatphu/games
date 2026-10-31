// PLAYER_FILE: DanteStyles
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: BLR_MOVES, CAM_TROI, CAV_MOVES, CM, DT_ARMS, FAUST_MOVES, FloatingText, KCB_MOVES, LT, Player, SFX, WILDS, addStyle, apexWrap, bosses, checkAABB, combatStance, ctx, danteActive, danteAttack, danteDraw, danteInit, danteKey, danteLabel, danteOn, danteTick, dashCd, dashVx, dino, dkNenY, doDash, dojoMode, drawCustomMenu, drawUI, dswReleaseHolds, faustReset, floatingTexts, frames, gameOver, gameVictory, hitDam, keys, mapTheme, parry, parryDamage, parryGainUlt, paused, perfectParryCd, platforms, playerHexImpact, sgDamage, sgSegmentBox, sgTargets, shakeTimer, shinGuardReset, styleRankIdx, tetris, wildernessOn, worldL, worldR
// index.html:110588 · Phạm vi: global
// PLAYER_PART_BEGIN s15.DANTE_STYLES.1 EDITABLE
const DANTE_STYLES=['SWORDMASTER','GUNSLINGER','ROYAL GUARD','TRICKSTER'];
// PLAYER_PART_END s15.DANTE_STYLES.1

// index.html:110589 · Phạm vi: global
// PLAYER_PART_BEGIN s15.DANTE_ROYAL_WAVE.1 EDITABLE
const DANTE_ROYAL_WAVE=30,DANTE_ROYAL_FX=40;
// PLAYER_PART_END s15.DANTE_ROYAL_WAVE.1

// index.html:110590 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteStyle.1 EDITABLE
function danteStyle(p=dino?.dante){return p?.style??1;}
// PLAYER_PART_END s15.danteStyle.1

// index.html:110591 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteStyleState.1 EDITABLE
function danteStyleState(p){return p.styles||(p.styles={guardUntil:-100,perfectUntil:-100,guardReady:0,bank:0,contacts:new WeakMap(),unknown:-100,lastDash:-100,dashDir:1,crossed:true,teleReady:0,phaseUntil:-100,ghosts:[],swords:[],seenAttacks:new WeakSet(),crouchArmed:false,royalFx:null,release:null});}
// PLAYER_PART_END s15.danteStyleState.1

// index.html:110592 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteStyleLive.1 EDITABLE
function danteStyleLive(){return danteActive(dino)&&!!dino.dante&&!gameOver&&!gameVictory;}
// PLAYER_PART_END s15.danteStyleLive.1

// index.html:110593 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteSetStyle.1 EDITABLE
function danteSetStyle(index){
 if(!dino?.dante)return;
 const p=dino.dante,s=danteStyleState(p);p.style=(index+4)%4;
 combatStance=p.style===1?0:p.style===2?2:3;
 s.guardUntil=s.perfectUntil=-100;s.crossed=true;s.crouchArmed=false;s.swords=[];s.release=null;s.royalFx=null;if(p.attack?.royal){p.attack=null;p.cd=0;p.body._swordLean=p.body._swordLunge=0;p.body._faustLegs=null;}
 dino.meleeTimer=dino.parryWindow=dino.dashShieldTimer=0;
 danteLabel(DANTE_STYLES[p.style]);
}
// PLAYER_PART_END s15.danteSetStyle.1

// index.html:110601 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteRangedBase.1 EDITABLE
function danteRangedBase(p,damage,heavy=false,guns=danteStyle(p)===1){return damage+(guns?(heavy?Math.max(1,Math.round(damage*.25)):1):0);}
// PLAYER_PART_END s15.danteRangedBase.1

// index.html:110602 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteBulletColor.1 EDITABLE
function danteBulletColor(p){return danteStyle(p)===1?'#ff4a67':'#d9e8ff';}
// PLAYER_PART_END s15.danteBulletColor.1

// index.html:110603 · Phạm vi: global
// PLAYER_PART_BEGIN s15.styleInitBase.1 EDITABLE
const styleInitBase=danteInit;
// PLAYER_PART_END s15.styleInitBase.1

// index.html:110604 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteInit.1 EDITABLE
danteInit=function(n){styleInitBase(n);n.dante.style=1;danteStyleState(n.dante);combatStance=0;};
// PLAYER_PART_END s15.danteInit.1

// index.html:110605 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteRoyalShield.1 EDITABLE
function danteRoyalShield(){return danteStyleLive()&&danteStyle()===2&&frames<danteStyleState(dino.dante).guardUntil;}
// PLAYER_PART_END s15.danteRoyalShield.1

// index.html:110606 · Phạm vi: global
// PLAYER_PART_BEGIN s15.dantePerfectGuard.1 EDITABLE
function dantePerfectGuard(){return danteRoyalShield()&&frames<danteStyleState(dino.dante).perfectUntil;}
// PLAYER_PART_END s15.dantePerfectGuard.1

// index.html:110607 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteGuardSource.1 EDITABLE
function danteGuardSource(){return sgTargets(dino).filter(o=>!o._beamClashPoint).sort((a,b)=>Math.hypot(a.x-dino.x,a.y-dino.y)-Math.hypot(b.x-dino.x,b.y-dino.y))[0]||null;}
// PLAYER_PART_END s15.danteGuardSource.1

// index.html:110608 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteGuardContact.1 EDITABLE
function danteGuardContact(amount=1,source=null){
 if(!danteRoyalShield())return false;
 const n=dino,p=n.dante,s=danteStyleState(p),perfect=dantePerfectGuard();
 source=source||danteGuardSource();
 // A sustained rush/contact is one event until it leaves contact or changes action.
 if(source&&typeof source==='object'){
  const last=s.contacts.get(source),state=source.state||'';
  s.contacts.set(source,{at:frames,state});
  if(last&&last.at>=frames-2&&last.state===state)return true;
 }else{if(s.unknown===frames)return true;s.unknown=frames;}
 if(perfect){
  const target=source&&Number.isFinite(source.maxHp)?source:danteGuardSource();
  const stored=target?Math.max(1,Math.round(parryDamage(target,true)*.5)):Math.max(1,amount);
  s.bank+=stored;s.guardReady=frames;n.shieldCd=perfectParryCd=0;
  parryGainUlt(true);addStyle(28,'parry');
  floatingTexts.push(new FloatingText(n.x-25,n.y-35,'PERFECT · +'+stored));
 }else floatingTexts.push(new FloatingText(n.x-20,n.y-30,'GUARD'));
 n.shinFlash=12;playerHexImpact(n,n.x+n.w/2,n.y+20);
 if(SFX.tone)SFX.tone(perfect?1200:300,.05,'triangle',.08,300);
 return true;
}
// PLAYER_PART_END s15.danteGuardContact.1

// index.html:110629 · Phạm vi: global
// PLAYER_PART_BEGIN s15.styleGuardResetBase.1 EDITABLE
const styleGuardResetBase=shinGuardReset;
// PLAYER_PART_END s15.styleGuardResetBase.1

// index.html:110630 · Phạm vi: global
// PLAYER_PART_BEGIN s15.shinGuardReset.1 EDITABLE
shinGuardReset=function(perfect){if(danteStyleLive()){if(danteRoyalShield())danteGuardContact(1,danteGuardSource());return;}return styleGuardResetBase(perfect);};
// PLAYER_PART_END s15.shinGuardReset.1

// index.html:110631 · Phạm vi: global
// PLAYER_PART_BEGIN s15.styleParryBase.1 EDITABLE
const styleParryBase=parry;
// PLAYER_PART_END s15.styleParryBase.1

// index.html:110632 · Phạm vi: global
// PLAYER_PART_BEGIN s15.parry.1 EDITABLE
parry=function(y){if(danteRoyalShield()){danteGuardContact(1,danteGuardSource());return;}return styleParryBase(y);};
// PLAYER_PART_END s15.parry.1

// index.html:110633 · Phạm vi: global
// PLAYER_PART_BEGIN s15.styleShieldBase.1 EDITABLE
const styleShieldBase=Player.prototype.isShielding;
// PLAYER_PART_END s15.styleShieldBase.1

// index.html:110634 · Phạm vi: global
// PLAYER_PART_BEGIN s15.Player.prototype.isShielding.1 EDITABLE
Player.prototype.isShielding=function(){if(danteStyleLive()&&this===dino)return frames<danteStyleState(this.dante).guardUntil;return styleShieldBase.call(this);};
// PLAYER_PART_END s15.Player.prototype.isShielding.1

// index.html:110635 · Phạm vi: global
// PLAYER_PART_BEGIN s15.styleDamageBase.1 EDITABLE
const styleDamageBase=Player.prototype.takeDamage;
// PLAYER_PART_END s15.styleDamageBase.1

// index.html:110636 · Phạm vi: global
// PLAYER_PART_BEGIN s15.Player.prototype.takeDamage.1 EDITABLE
Player.prototype.takeDamage=function(amount=1,...args){
 if(this===dino&&danteRoyalShield()){danteGuardContact(amount);return;}
 const hp=this.hp,result=styleDamageBase.call(this,amount,...args);
 if(this.hp<hp&&this.dante?.styles)this.dante.styles.swords=[];
 return result;
};
// PLAYER_PART_END s15.Player.prototype.takeDamage.1

// index.html:110642 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteGuardPress.1 EDITABLE
function danteGuardPress(){
 const n=dino,p=n.dante,s=danteStyleState(p);
 if(danteStyle()===2&&frames-s.lastDash<=24&&s.bank>0){
  p.k=null;p.attack={royal:true,name:'ROYAL RELEASE',age:0,duration:30,dir:s.dashDir};p.cd=30;
  s.guardUntil=s.perfectUntil=-100;s.release={age:0,dir:s.dashDir,hit:false,power:s.bank};s.lastDash=-100;danteLabel('ROYAL RELEASE');return;
 }
 if(frames<s.guardReady)return;
 p.k=null;if(p.attack){p.attack=null;p.cd=0;}
 s.guardUntil=frames+30;s.perfectUntil=frames+6;s.guardReady=frames+(danteStyle()===2?75:90);
 n.shieldCd=s.guardReady-frames;n.meleeTimer=30;n.parryWindow=6;n.meleeID++;
}
// PLAYER_PART_END s15.danteGuardPress.1

// index.html:110653 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteGhost.1 EDITABLE
function danteGhost(n){
 const s=danteStyleState(n.dante);s.ghosts.push({x:n.x,y:n.y,w:n.w,h:n.h,body:{...n.dante.body,facingLeft:n.isFacingLeft},t:14});
 if(s.ghosts.length>16)s.ghosts.shift();
}
// PLAYER_PART_END s15.danteGhost.1

// index.html:110657 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteTeleport.1 EDITABLE
function danteTeleport(target,behind){
 const n=dino,p=n.dante,s=danteStyleState(p);
 if(!target||target._beamClashPoint||![target.x,target.y,target.w,target.h].every(Number.isFinite))return false;
 const side=target.isFacingLeft??target.facingLeft??(target.x>n.x);
 let x=behind?(side?target.x+target.w+18:target.x-n.w-18):(side?target.x-n.w-18:target.x+target.w+18);
 const y=Math.max(wildernessOn()?WILDS.top:-CAM_TROI+10,target.y+target.h-n.h),before={x:n.x,y:n.y};
 x=Math.max(worldL(),Math.min(worldR()-n.w,x));
 const proposed={x,y,w:n.w,h:n.h};
 // No teleport into a solid pillar or a Tetris cell. Keep the old position on failure.
 for(const pf of platforms)if((pf.pillar||pf.wall)&&checkAABB(proposed,{x:pf.x,y:pf.top??pf.y,w:pf.w,h:pf.h||40}))return false;
 if(mapTheme==='tetris'&&typeof tetris!=='undefined'&&tetris){
  const T=tetris,c0=Math.floor((x-T.fx)/T.cell),c1=Math.floor((x+n.w-T.fx)/T.cell),r0=Math.floor((y-T.worldTop)/T.cell),r1=Math.floor((y+n.h-1-T.worldTop)/T.cell);
  for(let r=r0;r<=r1;r++)for(let c=c0;c<=c1;c++)if(r>=0&&r<T.rows&&c>=0&&c<T.cols&&T.grid[r][c])return false;
 }
 if(checkAABB(proposed,target)||Math.abs(x-before.x)<2)return false;
 danteGhost(n);n.x=x;n.y=y;n.dy=0;dashVx=0;n.isFacingLeft=target.x+target.w/2<x+n.w/2;n.grounded=!!target.grounded&&Math.abs(n.y+n.h-dkNenY())<8;
 n.invincible=true;n.invTimer=Math.max(n.invTimer,8);p.body.facingLeft=n.isFacingLeft;
 danteGhost(n);s.crossed=true;s.teleReady=frames+30;s.phaseUntil=frames+8;return true;
}
// PLAYER_PART_END s15.danteTeleport.1

// index.html:110676 · Phạm vi: global
// PLAYER_PART_BEGIN s15.styleKeyBase.1 EDITABLE
const styleKeyBase=danteKey;
// PLAYER_PART_END s15.styleKeyBase.1

// index.html:110677 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteKey.1 EDITABLE
danteKey=function(code,repeat){
 if(danteStyleLive()){
  const p=dino.dante,s=danteStyleState(p);
  if(['KeyQ','KeyE'].includes(code)){keys[code]=true;if(!paused&&!repeat)danteSwapWeapon(code==='KeyE'?1:-1);return true;}
  if(!paused&&!repeat&&['KeyJ','KeyK'].includes(code)&&frames<(p.swapReady||0)){keys[code]=true;p.swapInput=code;return true;}
  if(['KeyI','KeyO','KeyL'].includes(code)){
   keys[code]=true;if(paused||repeat)return true;
   if(code==='KeyL')danteGuardPress();else danteSetStyle(danteStyle()+(code==='KeyO'?1:-1));return true;
  }
  if(!paused&&!repeat&&danteStyle()===3&&['KeyS','ArrowDown'].includes(code))s.crouchArmed=true;
  if(!paused&&!repeat&&danteStyle()===3&&['Space','KeyW'].includes(code)&&(s.crouchArmed||keys.KeyS||keys.ArrowDown)){
   const target=sgTargets(dino).filter(o=>!o._beamClashPoint&&Math.hypot(o.x-dino.x,o.y-dino.y)<600).sort((a,b)=>Math.hypot(a.x-dino.x,a.y-dino.y)-Math.hypot(b.x-dino.x,b.y-dino.y))[0];
   const grounded=dino.grounded,jumps=dino.jumpCount||0;s.crouchArmed=false;
   if(frames>=s.teleReady&&target&&danteTeleport(target,false)){
    dino.dy=dino.jumpPower*(grounded?1:.85);dino.grounded=false;dino.canDoubleJump=grounded;dino.jumpCount=grounded?1:Math.min(2,jumps+1);dino.hoverArmed=false;
    keys[code]=true;danteLabel('AIR TRICK · RISE');return true;
   }
  }
 }
 const result=styleKeyBase(code,repeat);if(danteStyleLive())danteSwordStart();return result;
};
// PLAYER_PART_END s15.danteKey.1

// index.html:110698 · Phạm vi: global
// PLAYER_PART_BEGIN s15.styleDashBase.1 EDITABLE
const styleDashBase=doDash;
// PLAYER_PART_END s15.styleDashBase.1

// index.html:110699 · Phạm vi: global
// PLAYER_PART_BEGIN s15.doDash.1 EDITABLE
doDash=function(...args){
 const active=danteStyleLive()&&!paused,before=dashCd;
 styleDashBase(...args);
 if(!active||dashCd<=before)return;
 const n=dino,s=danteStyleState(n.dante);s.lastDash=frames;s.dashDir=n.dashDir;s.crossed=false;
 if(danteStyle()===3){dashVx*=1.45;danteGhost(n);}
};
// PLAYER_PART_END s15.doDash.1

// index.html:110706 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteSwordCount.1 EDITABLE
function danteSwordCount(){return styleRankIdx>=6?4:styleRankIdx>=4?3:styleRankIdx>=2?2:1;}
// PLAYER_PART_END s15.danteSwordCount.1

// index.html:110709 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteSwordMove.1 EDITABLE
function danteSwordMove(a){
 if(!a||a.royal||a.ebony||a.guard)return null;
 let pose=a.pose||'',id=a.id||'',wind=a.wind??4;
 if(a.faust){
  if(!['slash','upper','dash','air'].includes(id))return null;
  pose=id==='upper'||a.combo===1?'up':'down';wind=5;
 }else if(!a.sword&&!a.balrog&&!a.cavaliere&&!a.cerberus)return null;

 // Phân loại rõ 4 kiểu đội hình kiếm ảo ảnh:
 // 1. 'drill' : Stinger / Power Thrust / Siêu Trọng Quyền / Đâm Trường Côn -> Chụm mũi kiếm tạo MŨI KHOAN XOÁY!
 // 2. 'fan'   : Million Stab / Rapid Jab / MultiPoke -> Đâm chĩa ra nhiều hướng tầm cực xa!
 // 3. 'rise'  : High Time / Updraft / Chọc Gậy Lên -> Chém vớt vòng cung từ dưới đất lên trời!
 // 4. 'cut'   : Các đòn chém thường -> Bay ra chém lần lượt từng thanh nối tiếp nhau mượt mà!
 // j3/j4 are shared IDs: only Balrog j4 is a punch drill, and Cerberus j3 a fan stab.
 const isDrill=/^(stinger|thrust|dhit|mdragon|bcounter|hjolt|pole)$/.test(id)||(a.balrog&&id==='j4')||/thrust|magmaFin|pokeFront/i.test(pose);
 const isFan=/^(million|bstab|dstab|rjab)$/.test(id)||(a.cerberus&&id==='j3')||/stab|rjab|multiPoke/i.test(pose);
 const isRise=/up|bikeUp|pokeUp|upper/i.test(pose)||/^(high|updraft|Kautilya)$/.test(id);

 const kind=isDrill?'drill':isFan?'fan':isRise?'rise':'cut';
 return {kind,trigger:Math.max(1,wind)};
}
// PLAYER_PART_END s15.danteSwordMove.1

// index.html:110730 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteSwordPose.1 EDITABLE
function danteSwordPose(n,sword,stroke=sword.stroke){
 const i=sword.i,count=sword.count;
 const spread=i-(count-1)/2;
 const kind=sword.move.kind;
 const ox=sword.origin?.x??(n.x+n.w/2);
 const oy=sword.origin?.y??n.y;
 const dir=sword.dir;

 // Vị trí treo mặc định sau vai Dante (Xếp hình cánh chim Awakened DSD)
 const wingX=-24-Math.abs(spread)*8-(i%2)*6;
 const wingY=12+spread*10;

 // 1. KHI CHƯA PHÓNG (Đang xếp đội hình chờ tới lượt chém)
 if(stroke<=0){
  const hover=Math.sin(frames*0.18+i*1.2)*2.5;
  const angle=-0.35+spread*0.18;
  const len=66,flat=0.85;
  const x=ox+dir*wingX,y=oy+wingY+hover;
  return {x,y,angle,len,flat,tx:x+dir*Math.cos(angle)*len,ty:y+Math.sin(angle)*len*flat,drillSpin:0};
 }

 // 2. KIỂU 'DRILL' (STINGER / POWER THRUST): Các đầu mũi kiếm chụm khít lại ở mũi kiếm chính tạo thành MŨI KHOAN XOÁY!
 if(kind==='drill'){
  const dur=14;
  const p=Math.max(0,Math.min(1,stroke/dur));
  const thrustEase=Math.sin(p*Math.PI*0.88);
  const spin=stroke*0.85+(i*Math.PI*2/Math.max(1,count));
  const bladeLength=78;

  // Điểm hội tụ của tất cả các đầu mũi kiếm nằm xa phía trước mũi kiếm của Dante (136px!)
  const focalX=52+86*thrustEase;
  const focalY=25;

  // Phần chuôi kiếm xòe ra thành vòng tròn và quay tít quanh trục đâm tạo hình nón Mũi Khoan 3D
  const coneRadius=(18-6*thrustEase)*(count>1?1:0.4);
  const hiltsSpreadY=Math.sin(spin)*coneRadius;
  const hiltsSpreadX=Math.cos(spin)*6;

  const tx=ox+dir*focalX;
  const ty=oy+focalY+Math.sin(spin)*2.5; // Đầu mũi kiếm chụm sát nhau xoáy nhẹ
  const hx=tx-dir*(bladeLength-hiltsSpreadX);
  const hy=ty+hiltsSpreadY;
  const flat=0.55+0.35*Math.abs(Math.cos(spin));
  // Match the rendered tip to the collision tip after the perspective transform.
  const dx=(tx-hx)*dir,dy=(ty-hy)/flat;
  const angle=Math.atan2(dy,dx),len=Math.hypot(dx,dy);

  return {x:hx,y:hy,angle,len,flat,tx,ty,drillSpin:spin,isDrill:true,focalX:tx,focalY:ty,coneR:coneRadius};
 }

 // 3. KIỂU 'FAN' (MILLION STAB): Phóng vọt ra xa tới 120px và chĩa ra nhiều hướng hình rẻ quạt!
 if(kind==='fan'){
  const dur=11;
  const p=Math.max(0,Math.min(1,stroke/dur));
  // Hàm lao vọt ra cực nhanh rồi thu nhẹ về
  const jab=Math.sin(p*Math.PI);
  const fanAng=spread*0.24+(sword.fanJitter||0);
  const reach=18+98*jab; // Vươn xa hơn hẳn vũ khí thường!
  const len=74,flat=0.72;

  const x=ox+dir*(wingX*(1-jab)+Math.cos(fanAng)*reach);
  const y=oy+wingY*(1-jab*0.6)+24*jab+Math.sin(fanAng)*reach*0.85;
  return {x,y,angle:fanAng,len,flat,tx:x+dir*Math.cos(fanAng)*len,ty:y+Math.sin(fanAng)*len*flat,isFan:true};
 }

 // 4. KIỂU 'CUT' & 'RISE' (CHÉM LẦN LƯỢT TỪNG THANH):
 // Mỗi thanh kiếm bay vòng từ sau lưng ra phía trước và quét một đường vòng cung cực rộng & mượt!
 const dur=12;
 const p=Math.max(0,Math.min(1,stroke/dur));
 // Nội suy Ease-In-Out mượt mà cho quỹ đạo vung kiếm
 const ease=p<0.5?(2*p*p):(1-Math.pow(-2*p+2,2)/2);
 const arcSin=Math.sin(p*Math.PI);

 // Đan xen hướng chém của từng thanh kiếm (Thanh 1 chém bổ xuống, Thanh 2 chém vớt lên, Thanh 3 chém ngang...)
 const rising=(kind==='rise')?(i%2===0):(i%2===1);
 const vert=rising?-1:1;

 // Tầm vươn ra phía trước xa hơn vũ khí chính (chuôi kiếm bay ra tới +68px, cộng thêm lưỡi kiếm dài 74px = tầm 142px!)
 const reachX=wingX*(1-arcSin)+68*arcSin;
 const centerY=24+spread*5;
 const sweepY=centerY-vert*34*Math.cos(ease*Math.PI);

 // Góc xoay lưỡi kiếm quét trọn một cung 210 độ tạo vệt lụa tròn trịa
 const startAng=vert*2.25+spread*0.1;
 const endAng=-vert*1.65+spread*0.1;
 const angle=startAng+(endAng-startAng)*ease;

 const len=74;
 // Độ nghiêng mặt phẳng chém (3D perspective) khác nhau cho mỗi thanh kiếm để nhìn rõ từng đường kiếm tách biệt
 const flat=(i%3===2)?0.48:0.88;
 const x=ox+dir*reachX;
 const y=oy+sweepY;

 return {x,y,angle,len,flat,tx:x+dir*Math.cos(angle)*len,ty:y+Math.sin(angle)*len*flat};
}
// PLAYER_PART_END s15.danteSwordPose.1

// index.html:110825 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteSwordStart.1 EDITABLE
function danteSwordStart(){
 const n=dino,p=n.dante,s=danteStyleState(p),a=p.attack;
 if(!a||s.seenAttacks.has(a))return;
 s.seenAttacks.add(a);
 const move=danteSwordMove(a);if(danteStyle()!==0||!move)return;
 const count=danteSwordCount(),dir=a.dir||(n.isFacingLeft?-1:1);

 // Delayed cuts from the preceding combo finish alongside the new group.
 s.swords=s.swords.filter(sword=>sword.arm===p.arm);
 for(let i=0;i<count;i++){
  // ĐỘ TRỄ LẦN LƯỢT (`delay`):
  // - Nếu là Mũi Khoan Stinger ('drill'): Cả đội hình lao ra xoáy cùng lúc (delay = 0) để hợp thành mũi khoan!
  // - Nếu là Đâm Million Stab ('fan'): Phóng nối đuôi nhau siêu nhanh (cách nhau 2 frame).
  // - Nếu là Chém ('cut' / 'rise'): Chém lần lượt từng thanh cách nhau 3 frame để tạo chuỗi đường kiếm nối tiếp tuyệt đẹp!
  const stepDelay=move.kind==='drill'?0:(move.kind==='fan'?i*2:i*3);
  const fanJitter=(Math.random()-0.5)*0.12;
  const sword={
   attack:a,move,dir,i,count,arm:p.arm,
   age:0,stroke:0,
   delay:stepDelay,
   fanJitter,
   launched:false,origin:null,
   phase:'formation',alpha:0.45,
   hit:false,color:'#ff2a55',trail:[]
  };
  Object.assign(sword,danteSwordPose(n,sword,0));
  s.swords.push(sword);
 }
 if(s.swords.length>16)s.swords.splice(0,s.swords.length-16);
}
// PLAYER_PART_END s15.danteSwordStart.1

// index.html:110855 · Phạm vi: global
// PLAYER_PART_BEGIN s15.styleAttackBase.1 EDITABLE
const styleAttackBase=danteAttack;
// PLAYER_PART_END s15.styleAttackBase.1

// index.html:110856 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteAttack.1 EDITABLE
danteAttack=function(...args){const result=styleAttackBase(...args);if(danteStyleLive())danteSwordStart();return result;};
// PLAYER_PART_END s15.danteAttack.1

// index.html:110857 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteSwordsTick.1 EDITABLE
function danteSwordsTick(n,p,s){
 // Cho phép các thanh kiếm ảo ảnh hoàn thành nốt đường chém của mình kể cả khi các thanh sau chém trễ hơn vài frame!
 s.swords=s.swords.filter(sword=>{
  const maxStroke=sword.move.kind==='drill'?18:16;
  const alive=sword.stroke<maxStroke;
  // Chỉ hủy sớm nếu Dante bị trúng đòn hoặc bấm Khiên Royal Guard
  const interrupted=n.hp<=0||sword.arm!==p.arm||n.isShielding()||(p.attack&&p.attack!==sword.attack&&p.attack.royal);
  return alive&&!interrupted;
 });
 if(!s.swords.length)return;

 let targets=null;
 for(const sword of s.swords){
  const previous=sword.stroke;
  sword.age++;

  // Cập nhật tâm bám theo Dante trước khi thanh kiếm đó đến lượt phóng ra
  const triggerFrame=sword.move.trigger+(sword.delay||0);
  const atkAge=(sword.attack===p.attack&&p.attack)?p.attack.age:sword.age;

  if(!sword.launched&&atkAge>=triggerFrame){
   sword.launched=true;
   sword.origin={x:n.x+n.w/2,y:n.y};
   if(SFX.tone&&sword.i===0)SFX.tone(sword.move.kind==='drill'?620:980,0.04,'sine',0.06,420);
  }else if(sword.launched&&sword.move.kind==='drill'){
   // Với Stinger Drill, mũi khoan lướt đi cùng vị trí của Dante!
   sword.origin={x:n.x+n.w/2,y:n.y};
  }

  if(sword.launched)sword.stroke++;

  const activeEnd=sword.move.kind==='drill'?14:(sword.move.kind==='fan'?11:12);
  sword.phase=!sword.launched?'formation':sword.stroke<=activeEnd?'slash':'dissolve';
  sword.alpha=Math.min(1,(sword.age+1)/3)*Math.max(0,1-Math.max(0,sword.stroke-activeEnd)/4);

  Object.assign(sword,danteSwordPose(n,sword));

  if(sword.phase==='slash'){
   targets=targets||sgTargets(n);
   // Nội suy 5 bước mịn mỗi frame để vệt lụa kiếm khí (trail) cong mượt không bị gãy góc
   for(let step=1;step<=5;step++){
    const subStroke=previous+(sword.stroke-previous)*step/5;
    const v=danteSwordPose(n,sword,subStroke);
    sword.trail.push({x:v.x,y:v.y,tx:v.tx,ty:v.ty,age:sword.age-1+step/5});

    if(!sword.hit){
     for(const o of targets){
      if((o.x+o.w/2-(sword.origin?.x??n.x))*sword.dir<-15)continue;
      if(sgSegmentBox(v.x,v.y,v.tx,v.ty,o,10)!==null&&sgDamage(n,o,p.sinTime>0?2:1,'phantom')>0){
       sword.hit=true;
       break;
      }
     }
    }
   }
  }
  sword.trail=sword.trail.filter(v=>sword.age-v.age<4.5);
  if(sword.trail.length>22)sword.trail.splice(0,sword.trail.length-22);
 }
}
// PLAYER_PART_END s15.danteSwordsTick.1

// index.html:110917 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteStylesTick.1 EDITABLE
function danteStylesTick(){
 if(!danteStyleLive()||paused)return;
 const n=dino,p=n.dante,s=danteStyleState(p);
 if(p.swapInput&&frames>=(p.swapReady||0)){const code=p.swapInput,held=!!keys[code];p.swapInput=null;danteKey(code,false);keys[code]=held;}
 s.ghosts=s.ghosts.filter(g=>--g.t>0);danteSwordStart();danteSwordsTick(n,p,s);
 if(s.royalFx&&++s.royalFx.t>DANTE_ROYAL_FX)s.royalFx=null;p.body._trickPhase=Math.max(0,(s.phaseUntil-frames)/8);
 n.meleeTimer=Math.max(0,Math.min(n.meleeTimer,s.guardUntil-frames));n.parryWindow=Math.max(0,s.perfectUntil-frames);
 if(danteStyle()===3&&!s.crossed&&frames-s.lastDash<14){
  if(frames%2===0)danteGhost(n);
  if(frames>=s.teleReady){
   const target=sgTargets(n).filter(o=>{if(o._beamClashPoint)return false;const gap=s.dashDir>0?o.x-(n.x+n.w):n.x-(o.x+o.w);return gap>=0&&gap<2*CM&&n.y<o.y+o.h&&n.y+n.h>o.y;}).sort((a,b)=>Math.abs(a.x-n.x)-Math.abs(b.x-n.x))[0];
   if(target)danteTeleport(target,true);
  }
 }
 if(s.release&&p.attack?.royal){
  const a=p.attack;a.age++;s.release.age=a.age;
  const strength=a.age<8?-a.age/8:Math.exp(-(a.age-8)/10);p.body._swordLean=.35*strength;p.body._swordLunge=20*Math.max(0,strength);p.body._faustLegs={mode:'cast',t:1};
  if(a.age===8){
   s.royalFx={t:0,power:s.release.power,wave:s.release.power>=DANTE_ROYAL_WAVE,dir:a.dir,x:n.x+n.w/2+a.dir*22,y:n.y+n.h*.46,ground:n.y+n.h};
   const box={x:a.dir>0?n.x+n.w:n.x-160,y:n.y-10,w:160,h:n.h+20};
   const target=sgTargets(n).filter(o=>checkAABB(box,o)).sort((a,b)=>Math.abs(a.x-n.x)-Math.abs(b.x-n.x))[0];
   if(target&&s.bank>0){const damage=s.bank;sgDamage(n,target,damage,'royal');s.bank=0;s.release.hit=true;hitDam(target.x+target.w/2,target.y+target.h/2,a.dir,true,[255,213,100]);shakeTimer=Math.max(shakeTimer,18);
    floatingTexts.push(new FloatingText(n.x-30,n.y-40,'ROYAL RELEASE · '+damage));
    if(SFX.tone){SFX.tone(70,.22,'square',.17,30);SFX.tone(1200,.07,'triangle',.08,350);}}
  }
  if(a.age>=a.duration){p.attack=null;s.release=null;p.body._swordLean=p.body._swordLunge=0;p.body._faustLegs=null;}
 }else if(s.release){s.release=null;p.body._swordLean=p.body._swordLunge=0;p.body._faustLegs=null;}
}
// PLAYER_PART_END s15.danteStylesTick.1

// index.html:110945 · Phạm vi: global
// PLAYER_PART_BEGIN s15.styleTickBase.1 EDITABLE
const styleTickBase=danteTick;
// PLAYER_PART_END s15.styleTickBase.1

// index.html:110946 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteTick.1 EDITABLE
danteTick=function(){styleTickBase();danteStylesTick();};
// PLAYER_PART_END s15.danteTick.1

// index.html:110948 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteDrawShadow.1 EDITABLE
function danteDrawShadow(g){
 const b=g.body,dir=b.facingLeft?-1:1,flap=Math.sin(frames*.065)*2.2;
 ctx.save();ctx.globalAlpha=g.t/50;ctx.translate(g.x+g.w/2,g.y+g.h*.53);ctx.scale(dir*g.w/40,g.h/60);ctx.rotate(b._swordLean||0);ctx.translate(-20,-32);ctx.fillStyle='#080916';
 ctx.beginPath();ctx.moveTo(8,16);ctx.lineTo(31,16);ctx.lineTo(36,40);ctx.lineTo(19,58);ctx.lineTo(-10+flap,60);ctx.quadraticCurveTo(0,38,8,16);ctx.fill();
 ctx.beginPath();ctx.moveTo(9,12);ctx.lineTo(8,2);ctx.lineTo(15,-5);ctx.lineTo(20,-2);ctx.lineTo(24,-6);ctx.lineTo(31,2);ctx.lineTo(31,13);ctx.closePath();ctx.fill();
 ctx.fillRect(10,37,9,23);ctx.fillRect(24,37,9,23);ctx.strokeStyle='#080916';ctx.lineWidth=7;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(30,20);ctx.lineTo(35,34);ctx.lineTo(43,33);ctx.stroke();ctx.restore();
}
// PLAYER_PART_END s15.danteDrawShadow.1

// index.html:110955 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteDrawSword.1 EDITABLE
function danteDrawSword(sword){
 const alpha=sword.alpha;
 if(alpha<=0.02)return;
 ctx.save();
 ctx.lineCap='round';ctx.lineJoin='round';

 // 1. VẼ VỆT LỤA KIẾM KHÍ (RIBBON SLASH TRAIL) MƯỢT MÀ CỦA TỪNG LƯỠI KIẾM
 if(sword.trail.length>=2){
  for(let i=1;i<sword.trail.length;i++){
   const prev=sword.trail[i-1],v=sword.trail[i];
   const fade=Math.max(0,1-(sword.age-v.age)/4.5);
   // Dải lụa đỏ huyết ngọc từ giữa thân kiếm ra tới mũi kiếm
   ctx.globalAlpha=alpha*fade*0.28;
   ctx.fillStyle='#ff1744';
   ctx.beginPath();
   ctx.moveTo(prev.x+(prev.tx-prev.x)*0.35,prev.y+(prev.ty-prev.y)*0.35);
   ctx.lineTo(prev.tx,prev.ty);
   ctx.lineTo(v.tx,v.ty);
   ctx.lineTo(v.x+(v.tx-v.x)*0.35,v.y+(v.ty-v.y)*0.35);
   ctx.closePath();ctx.fill();

   // Đường viền mũi kiếm sáng trắng-hồng sắc lẹm để nhìn rõ thứ tự từng nhát chém
   ctx.globalAlpha=alpha*fade*0.85;
   ctx.strokeStyle='#ff80ab';
   ctx.lineWidth=3.2*fade;
   ctx.beginPath();ctx.moveTo(prev.tx,prev.ty);ctx.lineTo(v.tx,v.ty);ctx.stroke();

   ctx.strokeStyle='#ffffff';
   ctx.lineWidth=1.2*fade;
   ctx.beginPath();ctx.moveTo(prev.tx,prev.ty);ctx.lineTo(v.tx,v.ty);ctx.stroke();
  }
 }

 // 2. HIỆU ỨNG MŨI KHOAN XOÁY ỐC (SPIRAL DRILL RINGS) KHI DÙNG STINGER / THRUST
 if(sword.isDrill&&sword.phase==='slash'&&sword.i===0){
  ctx.save();
  ctx.globalAlpha=alpha*0.85;
  ctx.shadowColor='#ff1744';ctx.shadowBlur=16;
  // Các vòng xoắn ốc đỏ-trắng cuộn quanh đầu mũi khoan
  for(let r=0;r<3;r++){
   const rx=sword.focalX-sword.dir*(12+r*18);
   const ry=sword.focalY;
   const radY=Math.max(3,(sword.coneR||14)*(1-r*0.22)+4);
   ctx.strokeStyle=r===0?'#ffffff':'#ff1744';
   ctx.lineWidth=r===0?2.5:3.5;
   ctx.beginPath();
   ctx.ellipse(rx,ry,5,radY,0,sword.drillSpin+r,sword.drillSpin+r+Math.PI*1.35);
   ctx.stroke();
  }
  // Mũi nhọn ánh sáng xuyên phá ở đỉnh mũi khoan
  ctx.fillStyle='#ffffff';
  ctx.beginPath();
  ctx.moveTo(sword.focalX+sword.dir*18,sword.focalY);
  ctx.lineTo(sword.focalX-sword.dir*10,sword.focalY-7);
  ctx.lineTo(sword.focalX-sword.dir*10,sword.focalY+7);
  ctx.closePath();ctx.fill();
  ctx.restore();
 }

 // 3. HIỆU ỨNG TIA ĐÂM RẺ QUẠT (FAN STAB SPARK) KHI DÙNG MILLION STAB
 if(sword.isFan&&sword.phase==='slash'&&sword.stroke>=3&&sword.stroke<=8){
  ctx.save();
  ctx.globalAlpha=alpha*0.75;
  ctx.strokeStyle='#ffffff';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(sword.x,sword.y);ctx.lineTo(sword.tx+sword.dir*12,sword.ty);ctx.stroke();
  ctx.restore();
 }

 // 4. VẼ THANH KIẾM NĂNG LƯỢNG SUMMONED SWORD (Thiết kế chuẩn Mirage Blade của Dante)
 ctx.globalAlpha=alpha*0.92;
 ctx.translate(sword.x,sword.y);
 ctx.scale(sword.dir,sword.flat);
 ctx.rotate(sword.angle);
 ctx.shadowColor='#ff1744';ctx.shadowBlur=12;

 // Thân lưỡi kiếm năng lượng đỏ bán trong suốt có gai ngạnh
 ctx.fillStyle='#ff1744';
 ctx.beginPath();
 ctx.moveTo(2,-4.5);
 ctx.lineTo(18,-7);
 ctx.lineTo(14,-3.5);
 ctx.lineTo(sword.len-16,-5.5);
 ctx.lineTo(sword.len,0);
 ctx.lineTo(sword.len-16,5.5);
 ctx.lineTo(14,3.5);
 ctx.lineTo(18,7);
 ctx.lineTo(2,4.5);
 ctx.closePath();ctx.fill();

 // Lõi ánh sáng trắng hồng rực rỡ chạy dọc sống kiếm
 ctx.fillStyle='#ffe4ec';
 ctx.beginPath();
 ctx.moveTo(6,-1.8);
 ctx.lineTo(sword.len-4,0);
 ctx.lineTo(6,1.8);
 ctx.closePath();ctx.fill();

 // Hộ thủ cánh dơi quỷ & Chuôi kiếm năng lượng
 ctx.fillStyle='#d50032';
 ctx.beginPath();
 ctx.moveTo(-2,-11);ctx.lineTo(5,-3);ctx.lineTo(5,3);ctx.lineTo(-2,11);ctx.lineTo(-5,0);
 ctx.closePath();ctx.fill();
 ctx.fillRect(-14,-2,12,4);

 ctx.restore();
}
// PLAYER_PART_END s15.danteDrawSword.1

// index.html:111063 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteDrawRoyal.1 EDITABLE
function danteDrawRoyal(f){
 const t=f.t,fade=Math.pow(Math.max(0,1-t/DANTE_ROYAL_FX),1.5),e=1-Math.pow(1-t/DANTE_ROYAL_FX,3);
 ctx.save();ctx.translate(f.x,f.y);ctx.scale(f.dir,1);ctx.lineCap='round';
 if(t<12){
  const k=1-t/12,r=10+t*2.8;
  ctx.globalAlpha=k;ctx.strokeStyle='#fff5d5';ctx.lineWidth=3*k;
  ctx.beginPath();ctx.ellipse(0,0,Math.max(1,r*.4),r,0,0,Math.PI*2);ctx.stroke();
  for(let i=0;i<9;i++){const a=i*Math.PI*2/9;ctx.beginPath();ctx.moveTo(Math.cos(a)*8,Math.sin(a)*8);ctx.lineTo(Math.cos(a)*r*1.6,Math.sin(a)*r);ctx.stroke();}
 }
 const distance=(f.wave?150:65)*e;
 ctx.globalAlpha=fade*.6;ctx.strokeStyle='#ffce75';ctx.lineWidth=1.5;
 for(let i=0;i<10;i++){
  const y=Math.sin(i*2.4)*(f.wave?45:18),x=((i*19)%70)/70*distance;
  ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+12+(i%3)*8,y);ctx.stroke();
 }
 if(f.wave){
  const radius=28+e*46,x=12+distance;
  for(let i=2;i>=0;i--){
   ctx.globalAlpha=fade*(.8-i*.2);ctx.strokeStyle=i===0?'#fff9e6':'#ffc56b';ctx.lineWidth=i===0?4:7;
   ctx.shadowColor='#ffa52f';ctx.shadowBlur=i===0?12:0;
   ctx.beginPath();ctx.ellipse(x-i*12,0,12+e*13,radius-i*6,0,-Math.PI*.5,Math.PI*.5);ctx.stroke();
  }
 }
 ctx.shadowBlur=0;ctx.globalAlpha=fade*.5;ctx.strokeStyle='#ffe2a0';ctx.lineWidth=2;
 const ground=f.ground-f.y;
 for(let i=0;i<6;i++){
  const x=i*distance/6,height=(6+i%3*5)*Math.sin(e*Math.PI);
  ctx.beginPath();ctx.moveTo(x,ground);ctx.lineTo(x+6,ground-height);ctx.stroke();
 }
 ctx.restore();
}
// PLAYER_PART_END s15.danteDrawRoyal.1

// index.html:111094 · Phạm vi: global
// PLAYER_PART_BEGIN s15.styleDrawBase.1 EDITABLE
const styleDrawBase=danteDraw;
// PLAYER_PART_END s15.styleDrawBase.1

// index.html:111095 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteDraw.1 EDITABLE
danteDraw=function(n){
 const p=n.dante,s=p?danteStyleState(p):null;
 if(s){
  for(const g of s.ghosts)danteDrawShadow(g);
  for(const sword of s.swords)if(sword.phase==='formation')danteDrawSword(sword);
 }
 styleDrawBase(n);
 if(!s)return;
 for(const sword of s.swords)if(sword.phase!=='formation')danteDrawSword(sword);
 if(s.release&&s.release.age<8){ctx.save();ctx.translate(n.x+n.w/2,n.y+n.h/2);ctx.globalAlpha=.3+s.release.age/16;ctx.strokeStyle='#ffce75';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,12+s.release.age*2,0,Math.PI*2);ctx.stroke();ctx.restore();}
 if(s.royalFx)danteDrawRoyal(s.royalFx);

};
// PLAYER_PART_END s15.danteDraw.1

// index.html:111108 · Phạm vi: global
// PLAYER_PART_BEGIN s15.styleUIBase.1 EDITABLE
const styleUIBase=drawUI;
// PLAYER_PART_END s15.styleUIBase.1

// index.html:111109 · Phạm vi: global
// PLAYER_PART_BEGIN s15.drawUI.1 EDITABLE
drawUI=function(){
 styleUIBase();if(!danteOn()||!dino?.dante)return;
 const p=dino.dante,s=danteStyleState(p);ctx.save();if(dojoMode)ctx.translate(0,15);ctx.fillStyle='#1c1119';ctx.fillRect(15,72,275,18);ctx.fillRect(15,151,275,22);ctx.textAlign='left';ctx.font='11px Consolas,monospace';ctx.fillStyle='#e6e5ff';ctx.fillText('I/O: '+DANTE_STYLES[danteStyle()],20,85);
 const info=danteStyle()===2?'RG '+s.bank+(s.bank>=DANTE_ROYAL_WAVE?' · WAVE READY':' · WAVE AT 30')+' · Dash L':danteStyle()===3?'TRICKSTER · Crouch → Jump: RISE':danteStyle()===0?'PHANTOM SWORDS: '+danteSwordCount():'RED BULLETS · STRONG SHOTS +';
 ctx.fillText(info,20,165);ctx.restore();
};
// PLAYER_PART_END s15.drawUI.1

// index.html:111115 · Phạm vi: global
// PLAYER_PART_BEGIN s15.styleMenuBase.1 EDITABLE
const styleMenuBase=drawCustomMenu;
// PLAYER_PART_END s15.styleMenuBase.1

// index.html:111116 · Phạm vi: global
// PLAYER_PART_BEGIN s15.drawCustomMenu.1 EDITABLE
drawCustomMenu=function(){
 styleMenuBase();if(!danteOn()||!dino?.dante)return;
 ctx.save();ctx.fillStyle='#190e14';ctx.fillRect(28,117,266,405);ctx.textAlign='left';ctx.font='11px Consolas,monospace';ctx.fillStyle='#eee0df';
 apexWrap(LT('I/O: đổi 4 STANCE riêng\n\nSWORDMASTER\nKiếm đỏ tự chém phụ cận chiến\nD/C: 1 · B/A: 2 · S/SS: 3\nSSS: đội hình 4 kiếm\n\nGUNSLINGER\nĐạn thường: 1 → 2, chuyển đỏ\nĐòn mạnh tăng lực; thêm meteor\n\nROYAL GUARD\nPerfect L: hồi đỡ ngay, tích kho\nDash L: trả kho vào 1 mục tiêu\nTích 30 sát thương: thêm sóng\n\nTRICKSTER\nDash xa, bóng đen mờ\nGần <2cm: ra sau lưng mục tiêu\nCúi → Nhảy: bật lên, dịch tới\n\nQ/E: đổi giữa combo · U: DT', 'I/O: cycle 4 DANTE STYLES\n\nSWORDMASTER\nRed swords: supporting cuts, 1 dmg\nD/C: 1 · B/A: 2 · S/SS: 3\nSSS: four-sword formation\n\nGUNSLINGER\nNormal rounds: 1 → 2, turn red\nStronger specials, extra meteor\n\nROYAL GUARD\nPerfect L: guard reset, store\nDash L: release bank at 1 enemy\n30 stored damage: pressure wave\n\nTRICKSTER\nLong dash, dark afterimages\nWithin <2cm: cross behind foe\nCrouch → Jump: rise + teleport\n\nQ/E: swap mid-combo · U: DT'),38,139,246,17);ctx.restore();
};
// PLAYER_PART_END s15.drawCustomMenu.1

// index.html:111123 · Phạm vi: global
// PLAYER_PART_BEGIN s15.ForOfStatement.1 EDITABLE
for(const table of [BLR_MOVES,CAV_MOVES,KCB_MOVES])for(const m of Object.values(table)){
 for(const key of ['T','wind','end','cancel'])if(Number.isFinite(m[key]))m[key]=Math.ceil(m[key]*1.25);
 if(m.hits)m.hits=m.hits.map(t=>Math.ceil(t*1.25));
}
// PLAYER_PART_END s15.ForOfStatement.1

// index.html:111127 · Phạm vi: global
// PLAYER_PART_BEGIN s15.ForOfStatement.2 EDITABLE
for(const m of Object.values(FAUST_MOVES))m.T=Math.ceil(m.T*1.35);
// PLAYER_PART_END s15.ForOfStatement.2

// index.html:111128 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteBossWindows.1 EDITABLE
const danteBossWindows=new WeakMap();
// PLAYER_PART_END s15.danteBossWindows.1

// index.html:111129 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteIsBoss.1 EDITABLE
function danteIsBoss(o){return bosses.includes(o.__goc||o);}
// PLAYER_PART_END s15.danteIsBoss.1

// index.html:111130 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteBossOpening.1 EDITABLE
function danteBossOpening(o){return (o.state==='v_attacker_str'&&o._atkString?.phase==='sheathe')||/^(idle|rest|recover|recovery|stunned|stun|open|opening|dizzy|tired|vulnerable)$/.test(o.state||'');}
// PLAYER_PART_END s15.danteBossOpening.1

// index.html:111131 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteControlAllowed.1 EDITABLE
function danteControlAllowed(target){
 const o=target.__goc||target;if(o._beamClashPoint)return false;if(!danteIsBoss(o))return true;
 const window=danteBossWindows.get(o);
 if(window&&frames<window.until)return true;
 if(window&&frames<window.ready)return false;
 return danteBossOpening(o)||['high','prop','updraft','rimpact','Kautilya','revslam','j4','upper'].includes(dino.dante?.attack?.id);
}
// PLAYER_PART_END s15.danteControlAllowed.1

// index.html:111138 · Phạm vi: global
// PLAYER_PART_BEGIN s15.danteSwapWeapon.1 EDITABLE
function danteSwapWeapon(step){
 const n=dino,p=n.dante;if(frames<(p.nextSwap||0))return;
 const a=p.attack,remaining=a?Math.max(0,(a.cancel??a.duration)-a.age):p.cd;
 p.attack=null;p.k=null;p.swapInput=null;p.swapReady=frames+Math.max(8,Math.min(18,remaining||0));p.nextSwap=frames+12;
 for(const state of [p.sword,p.balrog,p.cavaliere,p.cerberus])if(state){state.queue=[];state.last='';state.airSlow=0;state.lastDash=-1000;}
 if(p.sword)dswReleaseHolds(p.sword);
 if(p.balrog){p.balrog.holdJ=0;p.balrog.hitstop=0;}
 if(p.cerberus)p.cerberus.holdK=0;
 faustReset(p);const styles=danteStyleState(p);styles.swords=[];styles.release=null;
 p.body._swordLean=p.body._swordLunge=0;p.body._swordTurn=1;p.body._faustLegs=null;p.body._cavRide=null;
 p.arm=(p.arm+step+6)%6;p.combo=0;p.cd=Math.max(0,p.swapReady-frames);
 danteLabel(DT_ARMS[p.arm].n);
}
// PLAYER_PART_END s15.danteSwapWeapon.1

// index.html:111152 · Phạm vi: global
// PLAYER_PART_BEGIN s15.ForOfStatement.3 EDITABLE
for(const name of ['dswCommand','blrCommand','cavCommand','kcbCommand','eiCommand','faustCommand']){
 const base=window[name];window[name]=function(...args){if(dino?.dante&&frames<(dino.dante.swapReady||0))return;return base(...args);};
}
// PLAYER_PART_END s15.ForOfStatement.3

// index.html:111156 · Phạm vi: global
// PLAYER_PART_BEGIN s15.ForOfStatement.4 EDITABLE
for(const [name,arm] of [['dswTick',0],['blrTick',1],['cavTick',2],['kcbTick',3],['eiTick',4],['faustTick',5]]){
 const base=window[name];window[name]=function(...args){const p=dino?.dante;if(!p)return base(...args);const before=p.damageArm;p.damageArm=arm;try{return base(...args);}finally{p.damageArm=before;}};
}
// PLAYER_PART_END s15.ForOfStatement.4
