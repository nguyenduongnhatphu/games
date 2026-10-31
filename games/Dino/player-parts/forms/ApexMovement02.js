// PLAYER_FILE: ApexMovement02
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: afterimages, apexColor, apexControl, apexInput, apexNativePlatforms, apexSync, bienDayHT, channelShieldLocked, coBuc, currentShieldType, dashCd, dashVx, dino, dkNenY, frames, gameState, keys, launchFromPit, mapTheme, platforms, sgSegmentBox, shieldCdNguoiChoi, ultCharge, worldL, worldR
// index.html:105439 · Phạm vi: apexCreate
function __Part0(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.syncPlatforms.1 EDITABLE
function syncPlatforms(){
  const tag=gameState+':'+mapTheme;
  if(tag!==leafStage){leafStage=tag;leafs=[];leafClock=0;resetObelith();}

  leafs.forEach((p,i)=>{if(!p.fallen){const prev=p.y;p.y=p.baseY+Math.sin(frames*.035)*3;p.vy=p.y-prev;if(dino.ledgePlatform===p)dino.ledgeCornerY=p.y;}});
  platforms.length=0;
  for(const p of apexNativePlatforms()){if(!Number.isFinite(p.top)||p.solid===false||(owner.dropTimer>0&&p.top<=owner.dropFromTop+10))continue;let q=nativeMap.get(p);if(!q){q={runeColor:'#6cbca3',vy:0,source:p};nativeMap.set(p,q);}Object.assign(q,{x:p.x/SCALE,y:p.top/SCALE,w:p.w/SCALE,h:(p.h||18)/SCALE,oneWay:!!(p.wild&&!p.pillar)});platforms.push(q);}
  for(const [p] of nativeMap)if(!apexNativePlatforms().includes(p))nativeMap.delete(p);
  for(const p of leafs){if(p.fallen){p.fallen--;if(!p.fallen)p.ttl=null;continue;}if(p.ttl!==null&&--p.ttl<=0){p.fallen=240;if(dino.activePlatform===p||dino.ledgePlatform===p){dino.activePlatform=dino.ledgePlatform=null;dino.isGrounded=dino.isLedgeGrabbing=dino.isLedgeClimbing=dino.isWallSliding=false;dino.vy=2;}continue;}platforms.push(p);}
  if(apexColor===4)for(const p of obelith.blocks)platforms.push(p);
  if(dino.activePlatform&&!platforms.includes(dino.activePlatform)){dino.activePlatform=null;dino.isGrounded=false;}
  if(dino.ledgePlatform&&!platforms.includes(dino.ledgePlatform)){dino.ledgePlatform=null;dino.isLedgeGrabbing=dino.isLedgeClimbing=false;}
  if(dino.isGrounded&&!dino.activePlatform&&Math.abs(dino.y-groundY)>2){const p=platforms.find(p=>Math.abs(dino.y-p.y)<4&&dino.x+28>p.x&&dino.x-28<p.x+p.w);if(p)dino.activePlatform=p;else dino.isGrounded=false;}
 }
// PLAYER_PART_END s8.apexCreate.syncPlatforms.1
}}

// index.html:105453 · Phạm vi: apexCreate
function __Part1(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.contactLeaves.1 EDITABLE
function contactLeaves(){for(const p of platforms){if(p.source&&p.source.isLeaf&&(dino.activePlatform===p||dino.ledgePlatform===p))p.source.leafArmed=true;}for(const p of leafs){if(p.fallen||p.ttl!==null)continue;const side=Math.min(Math.abs(dino.x+28-p.x),Math.abs(dino.x-28-p.x-p.w))<8&&dino.y>p.y&&dino.y-96<p.y+p.h;
 if(dino.activePlatform===p||((dino.isLedgeGrabbing||dino.isLedgeClimbing)&&dino.ledgePlatform===p)||(dino.isWallSliding&&side))p.ttl=120;}}
// PLAYER_PART_END s8.apexCreate.contactLeaves.1
}}

// index.html:105455 · Phạm vi: apexCreate
function __Part2(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.inputEvents.1 EDITABLE
const inputEvents=[],eventKeys={},moveTap={left:-9999,right:-9999};
// PLAYER_PART_END s8.apexCreate.inputEvents.1
}}

// index.html:105455 · Phạm vi: apexCreate
function __Part3(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.inputFrame.1 EDITABLE
let inputFrame=0;
// PLAYER_PART_END s8.apexCreate.inputFrame.1
}}

// index.html:105479 · Phạm vi: apexCreate
function __Part4(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.applyInput.1 EDITABLE
function applyInput(k){keys.left=!!(k.KeyA||k.ArrowLeft);keys.right=!!(k.KeyD||k.ArrowRight);keys.down=!!(k.KeyS||k.ArrowDown);
 const now={u:!!k.KeyU,l:!!k.KeyL,j:!!k.KeyJ,k:!!k.KeyK,jump:!!(k.Space||k.KeyW||k.ArrowUp),dash:!!(k.ShiftLeft||k.ShiftRight),left:keys.left,right:keys.right};
 if(now.u&&!previous.u&&ultStart()){previous=now;return;}
 let tapDir=0;for(const side of ['left','right'])if(now[side]&&!previous[side]){if(inputFrame-moveTap[side]<=15&&!dino.isLedgeGrabbing){tapDir=side==='left'?-1:1;moveTap[side]=-9999;}else moveTap[side]=inputFrame;}
 if(!channelShieldLocked(owner)&&currentShieldType===0&&now.l&&!previous.l&&owner.shieldCd<=0&&owner.meleeTimer<=0){owner.meleeTimer=30;owner.shieldCd=shieldCdNguoiChoi();owner.meleeID++;}
 const guardHeld=!channelShieldLocked(owner)&&(currentShieldType===0?owner.meleeTimer>0:now.l&&!owner.shieldLock&&owner.shieldEnergy>0);
 dino.guardTimer=guardHeld?1:0;
 if(guardHeld){dino.meleeState='none';dino.meleeTimer=0;dino.meleeHolding=false;dino.meleeQueuedNext=false;dino.rangedCharging=false;dino.rangedChargeSec=0;dino.laserActiveSec=0;rise=null;}

 if(now.jump&&!previous.jump)jumpAttack();
 if((now.dash&&!previous.dash)||tapDir){const ready=dino.dashCooldown<=0;triggerDash(tapDir||(keys.left?-1:keys.right?1:dino.facing));if(ready&&(dino.dashTimer>0||dino.meleeState==='death_roll')){dashHits=new Set();owner.invincible=true;owner.invTimer=Math.max(owner.invTimer||0,13);}}
 if(dino.guardTimer>0){previous=now;return;}
 if(now.j&&!previous.j)startMeleePress();if(!now.j&&previous.j)releaseMeleePress();
 if(now.k&&!previous.k)startRangedCharge();if(!now.k&&previous.k)releaseRangedCharge();previous=now;
 }
// PLAYER_PART_END s8.apexCreate.applyInput.1
}}

// index.html:105494 · Phạm vi: apexCreate
function __Part5(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.input.1 EDITABLE
function input(){inputFrame++;for(const e of inputEvents){eventKeys[e.code]=e.down;applyInput(eventKeys);}inputEvents.length=0;Object.assign(eventKeys,apexInput());applyInput(eventKeys);}
// PLAYER_PART_END s8.apexCreate.input.1
}}

// index.html:105495 · Phạm vi: apexCreate
function __Part6(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.tick.1 EDITABLE
function tick(){
  if(ultimate){
   if(liveUltimate()){
    if(ultimate.scene!==gameState+':'+mapTheme){ultEnd();return;}
    currentSkin=obelithSkin();owner.invincible=true;owner.invTimer=Math.max(owner.invTimer||0,2);
    ultimate.victims=ultimate.victims.filter(v=>ultimate.t-v.deadAt<96);
    groundY=(mapTheme==='ocean'?bienDayHT():coBuc()?1200:dkNenY())/SCALE;
    syncPlatforms();syncTargets();tickObelith();updateLooseObjects(1);
    if(dino.dashCooldown>0)dino.dashCooldown--;if(owner.shieldCd>0)owner.shieldCd--;tickHexShield();
    if(wallBudget<120&&++wallRest>=180){wallBudget=Math.min(120,wallBudget+60);wallRest=0;}
    wallCooldown=wallBudget===0?180-wallRest:0;if(wallBreakAge<40)wallBreakAge++;
    dino.wallBudget=wallBudget;dino.wallCooldown=wallCooldown;dino.wallRest=wallRest;
    ultTick();
   }
   return;
  }
  if(wallBreakAge<40)wallBreakAge++;
  currentSkin=obelithSkin();apexSync();owner.ammoType=21;owner.maxHp=8;owner.hp=Math.min(owner.hp,8);owner.maxAmmo=owner.ammo=1;
  if(owner.invTimer>0){owner.invTimer--;if(owner.invTimer<=0)owner.invincible=false;}
  // Reconcile external boss knockback and stage transitions before our own physics.
  dino.x=(owner.x+owner.w/2)/SCALE;dino.y=(owner.y+owner.h)/SCALE;
  groundY=(mapTheme==='ocean'?bienDayHT():coBuc()?1200:dkNenY())/SCALE;
  if(mapTheme==='ocean'&&Number.isFinite(owner.dy))dino.vy=owner.dy/SCALE;
  if(owner.meleeTimer>0)owner.meleeTimer--;if(owner.shieldCd>0)owner.shieldCd--;tickHexShield();
  if(owner.dropTimer>0)owner.dropTimer--;
  if(mapTheme==='ocean'&&(apexInput().KeyS||apexInput().ArrowDown)&&dino.isGrounded&&dino.y*SCALE<groundY*SCALE-10){owner.dropTimer=16;owner.dropFromTop=dino.y*SCALE;dino.activePlatform=null;dino.isGrounded=false;dino.vy=Math.max(dino.vy,1/SCALE);}
  syncPlatforms();syncTargets();input();if(ultimate)return;tickMagma();const px=dino.x,py=dino.y,wasDash=dino.dashTimer>0,wasRoll=dino.meleeState==='death_roll'&&!dino.apexRollFinish;
  tickSpecialties(wasDash);update(1/60);tickTailRise();contactLeaves();tickObelith();
  if(wallCooldown<=0&&(dino.isWallSliding||dino.isLedgeGrabbing)){
   wallRest=0;
   if(--wallBudget<=0){wallBudget=0;wallCooldown=180;wallBreakAge=0;
    const side=dino.wallDir||dino.ledgeSide||dino.facing;
    spawnParticles(dino.x+side*28,dino.y-48,24,{spreadVx:7,spreadVy:7,color:currentSkin.energyGlow,glow:true,shape:'shard',gravity:.2,decay:.025});
    shockwaves.push({x:dino.x+side*28,y:dino.y-48,rx:8,ry:36,maxRx:65,alpha:1,color:currentSkin.energyCore,lineWidth:3});
    dino.isWallSliding=dino.isLedgeGrabbing=false;dino.ledgePlatform=null;dino.wallDir=0;dino.ledgeIgnoreTimer=20;dino.vy=Math.max(dino.vy,2);
   }
  }
  if(!dino.isWallSliding&&!dino.isLedgeGrabbing&&!dino.isLedgeClimbing&&wallBudget<120){
   if(++wallRest>=180){wallBudget=Math.min(120,wallBudget+60);wallRest=0;}
  }else if(dino.isWallSliding||dino.isLedgeGrabbing||dino.isLedgeClimbing)wallRest=0;
  wallCooldown=wallBudget===0?180-wallRest:0;
  dino.wallBudget=wallBudget;dino.wallCooldown=wallCooldown;dino.wallRest=wallRest;
  dino.x=Math.max((worldL()+owner.w/2)/SCALE,Math.min((worldR()-owner.w/2)/SCALE,dino.x));
  if(wasRoll){for(const t of targets){const last=dino.rollHits.get(t.o);if(last!==undefined&&frames-last<15)continue;if(sgSegmentBox(px*SCALE,(py-48)*SCALE,dino.x*SCALE,(dino.y-48)*SCALE,t.o,apexColor===1?34*magmaReach():28)!==null){const dealt=hitTarget(t,apexColor===1?5:4);if(dealt>0&&apexColor===2)apexControl(t.o,6);dino.rollHits.set(t.o,frames);}}}
  if(wasDash){for(const t of targets){if(dashHits.has(t.o))continue;const box=t.o;if(sgSegmentBox(px*SCALE,(py-48)*SCALE,dino.x*SCALE,(dino.y-48)*SCALE,box,apexColor===1?26.4*magmaReach():22)!==null){hitTarget(t,apexColor===3?5:apexColor===1?4:3);dashHits.add(t.o);}}}
  if(mapTheme!=='ocean'&&dino.y*SCALE>(mapTheme==='tetris'?Math.max(600,dkNenY()+100):344)){
   owner.x=dino.x*SCALE-owner.w/2;owner.y=dino.y*SCALE-owner.h;owner.takeDamage(2);launchFromPit(owner,dino.gravity*SCALE);
   dino.x=(owner.x+owner.w/2)/SCALE;dino.y=(owner.y+owner.h)/SCALE;dino.vy=owner.dy/SCALE;dino.vx=0;
   dino.guardTimer=0;dino.activePlatform=dino.ledgePlatform=null;dino.isGrounded=dino.isWallSliding=dino.isLedgeGrabbing=dino.isLedgeClimbing=false;
   dino.meleeState='none';dino.meleeHolding=dino.meleeQueuedNext=false;dino.meleeTimer=0;dino.jumpsLeft=dino.maxJumps;dino.ledgeIgnoreTimer=12;
  }
  owner.x=dino.x*SCALE-owner.w/2;owner.y=dino.y*SCALE-owner.h;owner.dy=dino.vy*SCALE;owner.grounded=dino.isGrounded;owner.isCrouching=dino.isCrouching;owner.isFacingLeft=dino.facing<0;owner.jumpCount=2-dino.jumpsLeft;
  owner.canDoubleJump=dino.jumpsLeft>0;owner.chargeProgress=Math.min(1,dino.rangedChargeSec/2);owner.aKeyHeldTime=0;
  dashCd=dino.dashCooldown;dashVx=0;if(magmaTime>0)ultCharge=0;finishMagmaFrame();
  if(particles.length>180)particles.splice(0,particles.length-180);if(afterimages.length>12)afterimages.splice(0,afterimages.length-12);
 }
// PLAYER_PART_END s8.apexCreate.tick.1
}}
