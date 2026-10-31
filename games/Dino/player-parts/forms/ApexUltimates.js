// PLAYER_FILE: ApexUltimates
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DPR, SFX, apexColor, apexInput, bossProjectiles, bosses, camX, camY, canvas, ctx, dino, dojoMode, drawEnvironment, enemies, frames, gameOver, gameState, gameVictory, mapTheme, obstacles, oceanCamY, sanhChoUlt, sgDamage, sgSegmentBox, tetrisCamY, ultCharge, worldL, worldR
// index.html:104936 · Phạm vi: apexCreate
function __Part0(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.ultimate.1 EDITABLE
let ultimate=null,magmaTime=0,magmaAge=0;
// PLAYER_PART_END s8.apexCreate.ultimate.1
}}

// index.html:104937 · Phạm vi: apexCreate
function __Part1(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.liveUltimate.1 EDITABLE
function liveUltimate(){return !!ultimate&&ultimate.kind===4&&ultimate.mode==='ricochet';}
// PLAYER_PART_END s8.apexCreate.liveUltimate.1
}}

// index.html:104938 · Phạm vi: apexCreate
function __Part2(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.ultNames.1 EDITABLE
const ultNames=['EMERALD · ATOMIC EXTINCTION','MAGMA · MOLTEN SOVEREIGN','STALKER · EVENT HORIZON','NEBULA · WORLD SEVER','OBELITH · SUNDERING ASCENT'];
// PLAYER_PART_END s8.apexCreate.ultNames.1
}}

// index.html:104939 · Phạm vi: apexCreate
function __Part3(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.magmaBonus.1 EDITABLE
function magmaBonus(){return magmaTime>0?2:0;}
// PLAYER_PART_END s8.apexCreate.magmaBonus.1
}}

// index.html:104940 · Phạm vi: apexCreate
function __Part4(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.magmaReach.1 EDITABLE
function magmaReach(){return magmaTime>0?1.5:1;}
// PLAYER_PART_END s8.apexCreate.magmaReach.1
}}

// index.html:104941 · Phạm vi: apexCreate
function __Part5(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.ultStart.1 EDITABLE
function ultStart(){
  if(ultimate||magmaTime>0||ultCharge<100||owner.hp<=0||gameOver||gameVictory||!sanhChoUlt())return false;
  const obelithViewTop=(camY||0)-(mapTheme==='ocean'?oceanCamY||0:0)-(mapTheme==='tetris'?tetrisCamY||0:0);
  const obelithHasBoss=apexColor===4&&bosses.some(b=>b.hp>0&&b.x+b.w>=(camX||0)&&b.x<=(camX||0)+canvas.width&&b.y+b.h>=obelithViewTop&&b.y<=obelithViewTop+canvas.height);
  const obelithAim=apexColor===4?obelithTarget(false,obelithHasBoss):null;
  if(apexColor===4&&obelithHasBoss&&!obelithAim){comboBadge.textContent='OBELITH · NO TARGET';return false;}
  ultCharge=0;owner.ultActive=true;if(SFX.tone)SFX.tone(apexColor===1?100:65,.35,'sawtooth',.12,apexColor===1?350:180);dino.meleeState='none';dino.meleeTimer=0;dino.meleeHolding=false;dino.meleeQueuedNext=false;dino.dashTimer=0;dino.riseAngle=0;rise=null;
  dino.apexChannel=false;dino.rangedCharging=false;dino.rangedChargeSec=0;dino.laserActiveSec=0;dino.guardTimer=0;owner.meleeTimer=0;
  if(apexColor===1){magmaTime=600;magmaAge=0;dino.magmaTime=600;return true;}
  syncPlatforms();syncTargets();const left=camX||0,top=(camY||0)-(mapTheme==='ocean'?oceanCamY||0:0)-(mapTheme==='tetris'?tetrisCamY||0:0);
  const victims=targets.filter(t=>t.o.x+t.o.w>=left&&t.o.x<=left+canvas.width&&t.o.y+t.o.h>=top&&t.o.y<=top+canvas.height).map(t=>({o:t.o,x:t.o.x,y:t.o.y,w:t.o.w,h:t.o.h,deadAt:null,sprite:null,pad:0}));
  if(apexColor===4&&obelithHasBoss){const v=victims.find(v=>(v.o.__goc||v.o)===(obelithAim.__goc||obelithAim));victims.splice(0,victims.length,...(v?[v]:[]));}
  ultimate={kind:apexColor,t:0,left,top,cx:left+canvas.width*.5,cy:top+canvas.height*.5,victims,beamVictims:[],cuts:[],captured:false,dir:dino.facing};
  const near=victims.slice().sort((a,b)=>Math.hypot(a.x+a.w/2-owner.x,a.y+a.h/2-owner.y)-Math.hypot(b.x+b.w/2-owner.x,b.y+b.h/2-owner.y))[0];
  ultimate.aim=near||null;if(near)dino.facing=near.x+near.w/2>=owner.x+owner.w/2?1:-1;ultimate.dir=dino.facing;dino.visualScaleX=dino.facing;dino.vx=dino.vy=0;dino.dashBlend=dino.crouchBlend=0;dino.airSpinAngle=0;
  if(apexColor===4){ultimate.mode=obelithHasBoss?'boss':'ricochet';ultimate.scene=gameState+':'+mapTheme;if(!obelithHasBoss){ultimate.victims=[];owner.invincible=true;owner.invTimer=Math.max(owner.invTimer||0,2);}startObelithUltimate(ultimate);}
  return true;
 }
// PLAYER_PART_END s8.apexCreate.ultStart.1
}}

// index.html:104959 · Phạm vi: apexCreate
function __Part6(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.ultCaptureLive.1 EDITABLE
function ultCaptureLive(v){
  const o=v.o,pad=Math.max(54,Math.min(120,o.w*.75)),m=ctx.getTransform(),scale=Math.abs(m.a)||DPR;
  const ox=(o.x-pad)*scale+m.e,oy=(o.y-pad)*scale+m.f;
  const sx=Math.max(0,Math.floor(ox)),sy=Math.max(0,Math.floor(oy));
  const ex=Math.min(Math.round(canvas.width*DPR),Math.ceil(ox+(o.w+pad*2)*scale)),ey=Math.min(Math.round(canvas.height*DPR),Math.ceil(oy+(o.h+pad*2)*scale));
  v.pad=pad;v.sprite=document.createElement('canvas');v.sprite.width=Math.ceil(o.w+pad*2);v.sprite.height=Math.ceil(o.h+pad*2);
  if(ex<=sx||ey<=sy)return;
  const saved=document.createElement('canvas');saved.width=ex-sx;saved.height=ey-sy;
  saved.getContext('2d').drawImage(canvas,sx,sy,saved.width,saved.height,0,0,saved.width,saved.height);
  ctx.save();
  try{
   ctx.setTransform(1,0,0,1,0,0);ctx.beginPath();ctx.rect(sx,sy,saved.width,saved.height);ctx.clip();ctx.clearRect(sx,sy,saved.width,saved.height);
   ctx.setTransform(m);if(typeof o.draw==='function')o.draw();
   v.sprite.getContext('2d').drawImage(canvas,sx,sy,saved.width,saved.height,(sx-ox)/scale,(sy-oy)/scale,saved.width/scale,saved.height/scale);
  }finally{
   ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.filter='none';ctx.shadowBlur=0;ctx.clearRect(sx,sy,saved.width,saved.height);ctx.drawImage(saved,sx,sy);ctx.restore();
  }
 }
// PLAYER_PART_END s8.apexCreate.ultCaptureLive.1
}}

// index.html:104977 · Phạm vi: apexCreate
function __Part7(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.ultCapture.1 EDITABLE
function ultCapture(v){
  const o=v.o,pad=ultimate.kind===4?Math.max(54,Math.min(120,o.w*.75)):Math.max(24,Math.min(100,o.w*.4));v.pad=pad;
  const c=document.createElement('canvas');c.width=Math.min(950,Math.ceil(o.w+pad*2));c.height=Math.min(550,Math.ceil(o.h+pad*2));
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);ctx.translate(pad-o.x,pad-o.y);
  if(typeof o.draw==='function')o.draw();else{ctx.fillStyle=currentSkin.energyGlow;ctx.fillRect(o.x,o.y,o.w,o.h);}ctx.restore();
  c.getContext('2d').drawImage(canvas,0,0,c.width,c.height,0,0,c.width,c.height);v.sprite=c;if(ultimate.kind===0){v.ash=document.createElement('canvas');v.ash.width=c.width;v.ash.height=c.height;const ac=v.ash.getContext('2d');ac.drawImage(c,0,0);ac.globalCompositeOperation='source-atop';ac.globalAlpha=.85;ac.fillStyle='#a5aaa0';ac.fillRect(0,0,c.width,c.height);}
 }
// PLAYER_PART_END s8.apexCreate.ultCapture.1
}}

// index.html:104984 · Phạm vi: apexCreate
function __Part8(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.ultHit.1 EDITABLE
function ultHit(v,damage){
  if(v.deadAt!==null||!(v.o.hp>0))return;
  sgDamage(owner,v.o,damage,'apex');
  const continues=!v.o.sdtUltXong&&((v.o.phase===1&&typeof v.o.startPhase2==='function')||(v.o.phase===2&&typeof v.o.suBatDau==='function'));
  if(v.o.hp<=0&&!(ultimate.kind===4&&continues))v.deadAt=ultimate.t;
 }
// PLAYER_PART_END s8.apexCreate.ultHit.1
}}

// index.html:104990 · Phạm vi: apexCreate
function __Part9(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.ultEnd.1 EDITABLE
function ultEnd(){
  if(ultimate?.kind===4){dino.meleeState='none';dino.sawSpinAngle=0;dino.scaleX=dino.scaleY=1;dino.activePlatform=dino.ledgePlatform=null;dino.isLedgeGrabbing=dino.isLedgeClimbing=dino.isWallSliding=false;}
  ultimate=null;owner.ultActive=false;ultCharge=dojoMode?100:0;dino.headPitch=0;dino.jawOpen=.08;dino.chargePulse=0;dino.recoilOffset=0;
  owner.invincible=true;owner.invTimer=Math.max(owner.invTimer||0,20);
  // Consume inputs made during the film; require a new press for new attacks.
  inputEvents.length=0;Object.assign(eventKeys,apexInput());previous={l:!!eventKeys.KeyL,j:!!eventKeys.KeyJ,k:!!eventKeys.KeyK,u:!!eventKeys.KeyU,jump:!!(eventKeys.Space||eventKeys.KeyW||eventKeys.ArrowUp),dash:!!(eventKeys.ShiftLeft||eventKeys.ShiftRight),left:!!(eventKeys.KeyA||eventKeys.ArrowLeft),right:!!(eventKeys.KeyD||eventKeys.ArrowRight)};
 }
// PLAYER_PART_END s8.apexCreate.ultEnd.1
}}

// index.html:104997 · Phạm vi: apexCreate
function __Part10(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.ultMouth.1 EDITABLE
function ultMouth(){const r=computeSkeletalRig(0,0,dino.walkCycle,dino.breathCycle,0,dino.headPitch,0,dino.isGrounded);return {x:(dino.x+dino.facing*(r.headX+Math.cos(r.headRotation)*40))*SCALE,y:(dino.y+r.headY+Math.sin(r.headRotation)*40+5)*SCALE};}
// PLAYER_PART_END s8.apexCreate.ultMouth.1
}}

// index.html:104998 · Phạm vi: apexCreate
function __Part11(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.ultTick.1 EDITABLE
function ultTick(){
  const u=ultimate;if(!u)return;u.t++;const t=u.t;dino.breathCycle+=.025;
  if(u.kind===4){tickObelithUltimate(u);return;}
  if(u.kind===0){
   if(t<=70){const q=t/70;dino.headPitch=-1.25*Math.sin(q*Math.PI/2);dino.jawOpen=.15+q*.95;}
   else if(t<=90){const q=(t-70)/20;const a=u.aim,aimPitch=a?Math.max(-1.1,Math.min(.6,Math.atan2(a.o.y+a.o.h/2-(dino.y-70)*SCALE,Math.abs(a.o.x+a.o.w/2-dino.x*SCALE)))):0;dino.headPitch=-1.25*(1-q)+aimPitch*q;dino.jawOpen=1.15;}
   dino.chargePulse=Math.min(1,t/90);
   if(t===90){if(SFX.tone)SFX.tone(95,.9,'sawtooth',.13,280);const m=ultMouth(),a=u.aim,tx=a?a.o.x+a.w/2:m.x+u.dir*1000,ty=a?a.o.y+a.h/2:m.y;u.angle=Math.atan2(ty-m.y,tx-m.x);u.beamVictims=u.victims.filter(v=>sgSegmentBox(m.x,m.y,m.x+Math.cos(u.angle)*2400,m.y+Math.sin(u.angle)*2400,v.o,65)!==null);}
   if(t>90&&t<=150){
    if(u.aim)dino.headPitch=Math.max(-1.1,Math.min(.6,Math.atan2(u.aim.o.y+u.aim.o.h/2-(dino.y-70)*SCALE,Math.abs(u.aim.o.x+u.aim.o.w/2-dino.x*SCALE))));
    for(const v of u.beamVictims){v.o.x+=( (u.dir>0?worldR()-v.o.w:worldL())-v.o.x)*.12;}
    if((t-90)%6===0)for(const v of u.beamVictims)ultHit(v,10);
    dino.recoilOffset=4+Math.sin(t*2)*2;
   }
   if(t>=180)ultEnd();
  }else if(u.kind===2){
   if(t<=125)for(const v of u.victims){v.o.x+=(u.cx-v.o.w/2-v.o.x)*.09;v.o.y+=(u.cy-v.o.h/2-v.o.y)*.09;}
   if(t>=45&&t<=117&&(t-45)%12===0){const n=(t-45)/12,a=-1.1+n*2.37;u.cuts.push({x:u.cx,y:u.cy,a,t,len:360});if(SFX.tone)SFX.tone(1300,.05,'triangle',.1,160);for(const v of u.victims)ultHit(v,10);}
   if(t===135){if(SFX.tone)SFX.tone(220,.3,'sawtooth',.14,40);u.cuts.push({x:u.cx,y:u.cy,a:Math.PI/2,t,len:650,final:true});for(const v of u.victims){const floor=lavaSurface(v.o.x/SCALE,Math.min(v.y,v.o.y)/SCALE).y*SCALE;v.o.y=floor-v.o.h;if('dy' in v.o)v.o.dy=0;ultHit(v,30);}}
   if(t>=180)ultEnd();
  }else{
   if(t>=18&&t<=108&&t%2===0){const n=t/2;u.cuts.push({x:u.left+((n*137)%1000)/1000*canvas.width,y:u.top+((n*211)%600)/600*canvas.height,a:n*2.399,t,len:canvas.width*1.35});}
   if(t===110){if(SFX.tone)SFX.tone(700,.3,'sawtooth',.12,40);for(const v of u.victims)ultHit(v,100);}
   if(t>=160)ultEnd();
  }
 }
// PLAYER_PART_END s8.apexCreate.ultTick.1
}}

// index.html:105024 · Phạm vi: apexCreate
function __Part12(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawUltVictim.1 EDITABLE
function drawUltVictim(v,u){
  if(!v.sprite)return;const x=v.o.x-v.pad,y=v.o.y-v.pad,img=v.sprite;
  if(v.deadAt===null||(u.kind===2&&u.t<135)){ctx.drawImage(img,x,y);return;}
  const age=u.t-Math.max(v.deadAt,u.kind===2?135:0),fade=Math.max(0,1-age/(u.kind===4?96:48));ctx.save();ctx.globalAlpha=fade;
  if(u.kind===0){
   // Dissolve the captured enemy into small drifting ash tiles, preserving its silhouette.
   const cell=Math.max(5,Math.ceil(img.width/24));for(let yy=0;yy<img.height;yy+=cell)for(let xx=0;xx<img.width;xx+=cell){const n=((xx*13+yy*7)%31)/31,w=Math.min(cell,img.width-xx),h=Math.min(cell,img.height-yy);ctx.globalAlpha=fade*(.4+n*.6);ctx.drawImage(v.ash||img,xx,yy,w,h,x+xx+u.dir*age*(.5+n*2),y+yy-age*(.2+n),w,h);}
  }else if(u.kind===2||u.kind===4){
   for(let half=0;half<2;half++){const w=img.width/2;ctx.save();ctx.translate(x+half*w+(half?1:-1)*age*(u.kind===4?1.15:.75),y+age*age*(u.kind===4?.012:.018));ctx.rotate((half?1:-1)*age*(u.kind===4?.01:.006));ctx.drawImage(img,half*w,0,w,img.height,0,0,w,img.height);ctx.restore();}
   if(u.kind===4&&age<24){ctx.strokeStyle='#d5efff';ctx.shadowColor='#349cff';ctx.shadowBlur=14;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x+img.width/2,y);ctx.lineTo(x+img.width/2,y+img.height);ctx.stroke();}
  }else{
   const cols=5,rows=4,w=img.width/cols,h=img.height/rows;for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){ctx.save();ctx.translate(x+(col+.5)*w+(col-2)*age*1.2,y+(row+.5)*h+(row-1.5)*age+age*age*.016);ctx.rotate((col-row)*age*.015);ctx.drawImage(img,col*w,row*h,w,h,-w/2,-h/2,w,h);ctx.restore();}
  }ctx.restore();
 }
// PLAYER_PART_END s8.apexCreate.drawUltVictim.1
}}

// index.html:105038 · Phạm vi: apexCreate
function __Part13(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.ultLine.1 EDITABLE
function ultLine(x,y,a,len,width,color){ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=width>5?12:3;ctx.beginPath();ctx.moveTo(-len/2,0);ctx.quadraticCurveTo(-len*.1,-width*.6,len/2,0);ctx.quadraticCurveTo(len*.1,width*.6,-len/2,0);ctx.fill();ctx.restore();}
// PLAYER_PART_END s8.apexCreate.ultLine.1
}}

// index.html:105039 · Phạm vi: apexCreate
function __Part14(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.ultDashGhost.1 EDITABLE
function ultDashGhost(cut,age){
  if(age>8)return;const old={x:dino.x,y:dino.y,facing:dino.facing,visualScaleX:dino.visualScaleX,dashBlend:dino.dashBlend,scaleX:dino.scaleX};
  dino.x=(cut.x+Math.cos(cut.a)*(age/8-.5)*cut.len)/SCALE;dino.y=(cut.y+Math.sin(cut.a)*(age/8-.5)*cut.len)/SCALE+45;dino.facing=Math.cos(cut.a)>=0?1:-1;dino.visualScaleX=dino.facing;dino.dashBlend=1;dino.scaleX=1.5;ctx.save();ctx.globalAlpha=.28*(1-age/9);ctx.scale(SCALE,SCALE);drawDinosaur();ctx.restore();Object.assign(dino,old);
 }
// PLAYER_PART_END s8.apexCreate.ultDashGhost.1
}}

// index.html:105044 · Phạm vi: apexCreate
function __Part15(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawUltimate.1 EDITABLE
function drawUltimate(){
  const u=ultimate;if(!u)return;const t=u.t;ctx.save();
  ctx.fillStyle=u.kind===4?'rgba(3,12,28,.18)':u.kind===0?'rgba(2,18,12,.28)':'rgba(4,2,18,.68)';ctx.fillRect(u.left,u.top,canvas.width,canvas.height);
  if(u.kind===4){drawObelithUltimate(u);}
  else if(u.kind===0){
   ctx.save();ctx.scale(SCALE,SCALE);drawDinosaur();ctx.restore();const m=ultMouth();
   if(t<90){const q=t/90;ctx.strokeStyle='#baffbc';ctx.lineWidth=1.5;for(let i=0;i<15;i++){const a=i*2.4+t*.04,r=12+(1-q)*80;ctx.beginPath();ctx.moveTo(m.x+Math.cos(a)*r,m.y+Math.sin(a)*r);ctx.lineTo(m.x+Math.cos(a)*(r+8),m.y+Math.sin(a)*(r+8));ctx.stroke();}const g=ctx.createRadialGradient(m.x,m.y,1,m.x,m.y,8+q*25);g.addColorStop(0,'#f4ffcf');g.addColorStop(.3,'rgba(132,255,128,.7)');g.addColorStop(1,'rgba(30,255,122,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(m.x,m.y,8+q*25,0,Math.PI*2);ctx.fill();}
   if(t>=90&&t<=150){const a=u.aim,angle=a?Math.atan2(a.o.y+a.o.h/2-m.y,a.o.x+a.o.w/2-m.x):u.angle;u.angle=angle;const len=2400,pulse=1+.06*Math.sin(t*2);ctx.save();ctx.translate(m.x,m.y);ctx.rotate(angle);
    for(const [w,c,blur] of [[115,'rgba(33,255,116,.16)',28],[76,'rgba(102,255,139,.6)',18],[43,'#b6ffd1',10],[21,'#f8fff0',0]]){ctx.shadowColor='#60ff8c';ctx.shadowBlur=blur;ctx.strokeStyle=c;ctx.lineWidth=w*pulse;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(len,0);ctx.stroke();}ctx.shadowBlur=0;
    for(let i=0;i<9;i++){ctx.strokeStyle='rgba(236,255,183,.7)';ctx.lineWidth=2;ctx.beginPath();for(let x=0;x<1400;x+=25){const y=Math.sin(x*.035+t*.45+i)*28;if(x)ctx.lineTo(x,y);else ctx.moveTo(x,y);}ctx.stroke();}ctx.restore();
    // A temporary blasted ground scar and erupting rock debris; collision terrain is preserved.
    const floor=lavaSurface(m.x/SCALE,m.y/SCALE).y*SCALE;ctx.fillStyle='#1c3025';ctx.beginPath();ctx.moveTo(m.x,floor);for(let i=0;i<30;i++)ctx.lineTo(m.x+u.dir*i*35,floor+Math.sin(i*7)*9+8);ctx.lineTo(m.x+u.dir*1015,floor+17);ctx.closePath();ctx.fill();
    for(let i=0;i<45;i++){const age=(t-90+i*7)%37,x=m.x+u.dir*(i*23+age*4),y=floor-age*(1+i%5)+age*age*.05;ctx.save();ctx.translate(x,y);ctx.rotate(age*.1+i);ctx.fillStyle=i%3?'#53634d':'#a6c98a';ctx.fillRect(-3,-3,4+i%7,3+i%5);ctx.restore();}
   }
  }else if(u.kind===2){
   const scale=Math.min(1,t/35),split=t>135?(t-135)*3:0;
   for(let half=0;half<2;half++){ctx.save();ctx.translate((half?1:-1)*split,0);ctx.beginPath();ctx.rect(half?u.cx:u.cx-220,u.cy-220,220,440);ctx.clip();const g=ctx.createRadialGradient(u.cx,u.cy,20,u.cx,u.cy,135*scale+1);g.addColorStop(0,'#000008');g.addColorStop(.65,'#04010f');g.addColorStop(.8,'#815ce3');g.addColorStop(.85,'#e8e2ff');g.addColorStop(.9,'#6133be');g.addColorStop(1,'rgba(70,20,120,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(u.cx,u.cy,135*scale+1,0,Math.PI*2);ctx.fill();ctx.restore();}
   for(let i=0;i<26&&t<135;i++){const a=i*2.4+t*.07,r=45+((i*19-t*3)%180+180)%180;ctx.strokeStyle='rgba(164,144,255,.45)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(u.cx,u.cy,r,a,a+.3);ctx.stroke();}
  }
  if(u.kind===3&&u.backdrop&&t>=110){
   const age=t-110;ctx.save();ctx.setTransform(DPR,0,0,DPR,0,0);
   for(let i=0;i<12;i++){const x=(i%4)*canvas.width/4,y=Math.floor(i/4)*canvas.height/3,w=canvas.width/4,h=canvas.height/3;ctx.save();ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+w,y);ctx.lineTo(x+(i%2?w:0),y+h);ctx.closePath();ctx.clip();ctx.globalAlpha=Math.max(0,.65-age/80);ctx.drawImage(u.backdrop,Math.sin(i*9)*age*.9,Math.cos(i*5)*age*.5);ctx.restore();}ctx.restore();
  }
  for(const v of u.victims)drawUltVictim(v,u);
  if(u.kind===4)drawObelithImpact(u);
  for(const cut of u.cuts){const age=t-cut.t,life=u.kind===3?100:24;if(age>life)continue;const alpha=Math.max(0,1-age/life);if(!cut.final)ultDashGhost(cut,age);ctx.globalAlpha=alpha;const reach=Math.min(1,(age+1)/4)*cut.len;ultLine(cut.x,cut.y,cut.a,reach,cut.final?24:7,u.kind===2?'#717cff':'#a855f7');ultLine(cut.x,cut.y,cut.a,reach,cut.final?9:2,'#f7eeff');if(cut.final){ultLine(cut.x+12,cut.y,cut.a,reach,2,'#e3caff');}}
  ctx.globalAlpha=1;
  if(u.kind===3&&t>=110){const fade=Math.max(0,1-(t-110)/18);ctx.fillStyle='rgba(235,218,255,'+fade*.8+')';ctx.fillRect(u.left,u.top,canvas.width,canvas.height);}
  ctx.restore();
  ctx.save();ctx.setTransform(DPR,0,0,DPR,0,0);ctx.fillStyle='#03050c';ctx.fillRect(0,0,canvas.width,28);ctx.fillRect(0,canvas.height-28,canvas.width,28);ctx.textAlign='center';ctx.font='bold 13px Consolas';ctx.fillStyle=currentSkin.energyGlow;ctx.fillText(ultNames[u.kind],canvas.width/2,19);ctx.restore();
 }
// PLAYER_PART_END s8.apexCreate.drawUltimate.1
}}

// index.html:105075 · Phạm vi: apexCreate
function __Part16(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.cinematicFrame.1 EDITABLE
function cinematicFrame(){
  if(!ultimate||liveUltimate())return;const u=ultimate;if(!u.captured){for(const v of u.victims)ultCapture(v);u.captured=true;}
  frames++;ultTick();ctx.save();ctx.setTransform(DPR,0,0,DPR,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);ctx.translate(-u.left,-u.top);
  if(u.kind===4&&u.impact){const kick=Math.max(0,1-(u.t-u.impact.at)/18)*6;ctx.translate(Math.sin(u.t*2.3)*kick,Math.cos(u.t*2.9)*kick*.7);}
  drawEnvironment();
  if(u.kind===3&&!u.backdrop){u.backdrop=document.createElement('canvas');u.backdrop.width=canvas.width;u.backdrop.height=canvas.height;u.backdrop.getContext('2d').drawImage(canvas,0,0);}
  const targetsInFilm=new Set(u.victims.map(v=>v.o.__goc||v.o));for(const o of [...obstacles,...enemies,...bosses,...bossProjectiles])if(!targetsInFilm.has(o)&&typeof o.draw==='function')o.draw();
  if(ultimate)drawUltimate();else{for(const v of u.victims)if(v.o.hp>0&&typeof v.o.draw==='function')v.o.draw();draw();}ctx.restore();
 }
// PLAYER_PART_END s8.apexCreate.cinematicFrame.1
}}

// index.html:105084 · Phạm vi: apexCreate
function __Part17(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.tickMagma.1 EDITABLE
function tickMagma(){
  if(magmaTime<=0)return;magmaAge++;dino.magmaTime=magmaTime;
  if(magmaAge%60===0)for(const t of targets){const o=t.o,nx=Math.max(o.x,Math.min(owner.x+owner.w/2,o.x+o.w)),ny=Math.max(o.y,Math.min(owner.y+owner.h/2,o.y+o.h));if(Math.hypot(nx-owner.x-owner.w/2,ny-owner.y-owner.h/2)<=90)sgDamage(owner,o,5,'apex');}
  if(magmaAge%8===1){const land=lavaSurface(dino.x,dino.y);let z=lavaPools.find(z=>z.ult&&Math.abs(z.x-dino.x)<45&&Math.abs(z.y-land.y)<5);if(!z)lavaPools.push({x:dino.x,y:land.y,surface:land.surface,age:0,seed:Math.random()*10,ult:true});}
 }
// PLAYER_PART_END s8.apexCreate.tickMagma.1
}}

// index.html:105089 · Phạm vi: apexCreate
function __Part18(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.finishMagmaFrame.1 EDITABLE
function finishMagmaFrame(){
  if(magmaTime<=0)return;
  if(--magmaTime<=0){dino.magmaTime=0;owner.ultActive=false;ultCharge=0;for(let i=lavaPools.length-1;i>=0;i--)if(lavaPools[i].ult)lavaPools.splice(i,1);}
 }
// PLAYER_PART_END s8.apexCreate.finishMagmaFrame.1
}}

// index.html:105093 · Phạm vi: apexCreate
function __Part19(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawMagmaAura.1 EDITABLE
function drawMagmaAura(){
  if(magmaTime<=0)return;ctx.save();ctx.translate(dino.x,dino.y-48);const g=ctx.createRadialGradient(0,0,25,0,0,165);g.addColorStop(0,'rgba(255,165,30,.12)');g.addColorStop(.65,'rgba(255,70,0,.15)');g.addColorStop(1,'rgba(255,50,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,165,0,Math.PI*2);ctx.fill();
  for(let i=0;i<18;i++){const q=(magmaAge+i*17)%60/60,x=Math.sin(i*4)*100;ctx.globalAlpha=(1-q)*.7;ctx.fillStyle=i%2?'#ffab25':'#ff4c0a';ctx.beginPath();ctx.ellipse(x+Math.sin(q*9+i)*6,45-q*130,3+(1-q)*5,9+(1-q)*13,.2*Math.sin(i),0,Math.PI*2);ctx.fill();}ctx.restore();
 }
// PLAYER_PART_END s8.apexCreate.drawMagmaAura.1
}}

// index.html:105097 · Phạm vi: apexCreate
function __Part20(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawMagmaVeins.1 EDITABLE
function drawMagmaVeins(r){
  if(magmaTime<=0)return;ctx.save();ctx.lineCap='round';const points=[[r.hipX,r.hipY],[r.torsoCenterX,r.torsoCenterY],[r.chestX,r.chestY],[r.neckMidX,r.neckMidY],[r.headX-10,r.headY]];
  for(const [w,c] of [[5,'#7f1c07'],[2.8,'#ff690c'],[1,'#ffe78a']]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.shadowColor='#ff5900';ctx.shadowBlur=w===2.8?7:0;ctx.beginPath();points.forEach(([x,y],i)=>{if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);});ctx.stroke();for(let i=0;i<3;i++){const [x,y]=points[i];ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-6,y+7);ctx.lineTo(x+1,y+14);ctx.stroke();}}
  for(let i=1;i<r.tailNodes.length;i++){ctx.strokeStyle='#ff9e23';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(r.tailNodes[i-1].x,r.tailNodes[i-1].y);ctx.lineTo(r.tailNodes[i].x,r.tailNodes[i].y);ctx.stroke();}ctx.restore();
 }
// PLAYER_PART_END s8.apexCreate.drawMagmaVeins.1
}}
