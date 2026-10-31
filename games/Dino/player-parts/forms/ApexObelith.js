// PLAYER_FILE: ApexObelith
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: APEX_SKINS, SFX, apexColor, apexDrawObelith, apexNativePlatforms, bienDayHT, bosses, camX, camY, canvas, coBuc, ctx, dino, dkNenY, frames, keys, mapTheme, obstacles, oceanCamY, platforms, sgDamage, sgSegmentBox, sgTargets, tetrisCamY, worldL, worldR
// index.html:105104 · Phạm vi: apexCreate
function __Part0(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.obelith.1 EDITABLE
const obelith={clock:0,blocks:[],charge:0,ready:false,beam:null,generation:0,form:0,activated:false};
// PLAYER_PART_END s8.apexCreate.obelith.1
}}

// index.html:105105 · Phạm vi: apexCreate
function __Part1(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.obelithPreview.1 EDITABLE
let obelithPreview=false;
// PLAYER_PART_END s8.apexCreate.obelithPreview.1
}}

// index.html:105106 · Phạm vi: apexCreate
function __Part2(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.resetObelith.1 EDITABLE
function resetObelith(){obelith.clock=0;obelith.blocks=[];obelith.charge=0;obelith.ready=false;obelith.beam=null;obelith.form=0;obelith.activated=false;}
// PLAYER_PART_END s8.apexCreate.resetObelith.1
}}

// index.html:105107 · Phạm vi: apexCreate
function __Part3(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.obelithPad.1 EDITABLE
function obelithPad(){return dino.isGrounded&&obelith.blocks.includes(dino.activePlatform)&&!dino.isLedgeClimbing?dino.activePlatform:null;}
// PLAYER_PART_END s8.apexCreate.obelithPad.1
}}

// index.html:105108 · Phạm vi: apexCreate
function __Part4(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.obelithTarget.1 EDITABLE
function obelithTarget(clash=false,bossOnly=false){
  const left=camX||0,top=(camY||0)-(mapTheme==='ocean'?oceanCamY||0:0)-(mapTheme==='tetris'?tetrisCamY||0:0);
  const pool=sgTargets(owner).filter(o=>o.hp>0&&!o.invulnAll&&(clash||!o._beamClashPoint)&&!obstacles.includes(o.__goc||o)&&o.x+o.w>=left&&o.x<=left+canvas.width&&o.y+o.h>=top&&o.y<=top+canvas.height&&(!bossOnly||bosses.includes(o.__goc||o)));
  pool.sort((a,b)=>{
   const priority=o=>clash&&o._beamClashPoint?0:bosses.includes(o.__goc||o)?1:2;
   return priority(a)-priority(b)||Math.hypot(a.x+a.w/2-owner.x-owner.w/2,a.y+a.h/2-owner.y-owner.h/2)-Math.hypot(b.x+b.w/2-owner.x-owner.w/2,b.y+b.h/2-owner.y-owner.h/2);
  });return pool[0]||null;
 }
// PLAYER_PART_END s8.apexCreate.obelithTarget.1
}}

// index.html:105116 · Phạm vi: apexCreate
function __Part5(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.spawnObelithBlocks.1 EDITABLE
function spawnObelithBlocks(){
  const left=Math.max(worldL(),camX||0),right=Math.min(worldR(),left+canvas.width),w=124/SCALE,h=32/SCALE;
  const floor=(mapTheme==='ocean'?bienDayHT():dkNenY()),top=(floor-240)/SCALE;
  // Leave a full wall-jump corridor outside each shrine.
  const inset=Math.min(112,Math.max(40,(right-left-2*w*SCALE)/4));
  const xs=[(left+inset)/SCALE,(right-inset)/SCALE-w];
  obelith.generation++;obelith.activated=false;
  for(let i=0;i<2;i++){
   let p=obelith.blocks[i];
   if(!p){p={isObelith:true,runeColor:'#349cff',vy:0,solid:true};obelith.blocks[i]=p;}
   const occupied=(dino.isGrounded&&dino.activePlatform===p)||((dino.isLedgeGrabbing||dino.isLedgeClimbing)&&dino.ledgePlatform===p);
   if(!occupied)Object.assign(p,{x:xs[i],y:top,w,h});
   p.pulse=60;p.generation=obelith.generation;
   if(!platforms.includes(p))platforms.push(p);
  }
 }
// PLAYER_PART_END s8.apexCreate.spawnObelithBlocks.1
}}

// index.html:105132 · Phạm vi: apexCreate
function __Part6(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.fireObelithBeam.1 EDITABLE
function fireObelithBeam(){
  const pad=obelithPad();
  if(apexColor!==4||!obelith.ready||!pad||obelith.beam)return false;
  const left=Math.max(worldL(),camX||0),right=Math.min(worldR(),left+canvas.width);
  const top=(camY||0)-(mapTheme==='ocean'?oceanCamY||0:0)-(mapTheme==='tetris'?tetrisCamY||0:0);
  const floor=mapTheme==='ocean'?bienDayHT():coBuc()?top+canvas.height:dkNenY();
  const bottom=Math.min(top+canvas.height,Math.max(owner.y+owner.h+60,floor));
  const fromLeft=pad.x+pad.w/2<(left+right)/2/SCALE,near=fromLeft?left:right,far=fromLeft?right:left;
  obelith.ready=false;obelith.charge=0;
  obelith.beam={age:0,hits:0,hit:new Set(),clashTicks:new Map(),view:{left,right,top,bottom},corners:[{x:near,y:bottom},{x:far,y:bottom},{x:far,y:top}],ray:null};
  dino.rangedCharging=false;dino.rangedChargeSec=0;dino.laserActiveSec=0;
  if(SFX.tone)SFX.tone(260,.2,'sawtooth',.1,900);
  return true;
 }
// PLAYER_PART_END s8.apexCreate.fireObelithBeam.1
}}

// index.html:105146 · Phạm vi: apexCreate
function __Part7(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.tickObelithBeam.1 EDITABLE
function tickObelithBeam(beam){
  beam.age++;
  // Sweep the boundary in order: near lower corner -> far lower -> far upper.
  const stage=beam.age<=60?0:1,q=stage===0?(beam.age-1)/59:(beam.age-60)/60;
  const a=beam.corners[stage],b=beam.corners[stage+1],tx=a.x+(b.x-a.x)*q,ty=a.y+(b.y-a.y)*q;
  dino.facing=tx>=dino.x*SCALE?1:-1;dino.visualScaleX=dino.facing;
  dino.headPitch=Math.max(-1.25,Math.min(1.25,Math.atan2(ty-(dino.y-75)*SCALE,Math.abs(tx-dino.x*SCALE))));
  dino.jawOpen=1.1;dino.fireGlowTimer=4;dino.chargePulse=1;
  const r=computeSkeletalRig(dino.crouchBlend,dino.dashBlend,dino.walkCycle,dino.breathCycle,dino.recoilOffset,dino.headPitch,dino.vy,dino.isGrounded);
  const c=Math.cos(r.headRotation),sn=Math.sin(r.headRotation);
  const ray={x0:(dino.x+dino.facing*(r.headX+42*c-4*sn))*SCALE,y0:(dino.y+r.headY+42*sn+4*c)*SCALE,x1:tx,y1:ty};
  const last=beam.ray||ray;beam.ray=ray;
  const travel=Math.max(Math.hypot(ray.x0-last.x0,ray.y0-last.y0),Math.hypot(ray.x1-last.x1,ray.y1-last.y1));
  const steps=Math.max(1,Math.ceil(travel/12)),view=beam.view;
  for(const o of sgTargets(owner)){
   if(!(o.hp>0)||o.invulnAll||o.x+o.w<view.left||o.x>view.right||o.y+o.h<view.top||o.y>view.bottom)continue;
   const root=o.__goc||o;
   if(!o._beamClashPoint&&beam.hit.has(root))continue;
   if(o._beamClashPoint&&beam.age-(beam.clashTicks.get(o.ownerBoss)??-999)<12)continue;
   // Interpolate between consecutive rays to cover even tiny enemies during fast turns.
   for(let i=0;i<=steps;i++){
    const f=i/steps,x0=last.x0+(ray.x0-last.x0)*f,y0=last.y0+(ray.y0-last.y0)*f,x1=last.x1+(ray.x1-last.x1)*f,y1=last.y1+(ray.y1-last.y1)*f;
    if(sgSegmentBox(x0,y0,x1,y1,o,21)===null)continue;
    if(o._beamClashPoint){beam.clashTicks.set(o.ownerBoss,beam.age);sgDamage(owner,o,20,'apex');}
    else{beam.hit.add(root);beam.hits++;sgDamage(owner,o,20,'apex');}
    break;
   }
  }
  if(beam.age>=120)obelith.beam=null;
 }
// PLAYER_PART_END s8.apexCreate.tickObelithBeam.1
}}

// index.html:105176 · Phạm vi: apexCreate
function __Part8(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.hideObelithBlocks.1 EDITABLE
function hideObelithBlocks(){
  const old=obelith.blocks;
  if(dino.isWallSliding&&old.some(p=>dino.y>p.y&&dino.y-96<p.y+p.h&&Math.min(Math.abs(dino.x+28-p.x),Math.abs(dino.x-28-p.x-p.w))<8)){dino.isWallSliding=false;dino.wallDir=0;}
  if(old.includes(dino.activePlatform)){dino.activePlatform=null;dino.isGrounded=false;dino.vy=Math.max(1,dino.vy);}
  if(old.includes(dino.ledgePlatform)){dino.ledgePlatform=null;dino.isLedgeGrabbing=dino.isLedgeClimbing=false;dino.ledgeIgnoreTimer=12;}
  for(let i=platforms.length-1;i>=0;i--)if(old.includes(platforms[i]))platforms.splice(i,1);
  obelith.blocks=[];obelith.charge=0;obelith.ready=false;obelith.beam=null;
 }
// PLAYER_PART_END s8.apexCreate.hideObelithBlocks.1
}}

// index.html:105195 · Phạm vi: apexCreate
function __Part9(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.tickObelith.1 EDITABLE
function tickObelith(){
  if(owner.hp<=0){resetObelith();return;}
  if(apexColor!==4){obelith.clock=Math.min(600,obelith.clock+1);return;}
  // First landing starts a fresh use window; hopping/re-entering never renews it.
  if(obelith.blocks.length&&!obelith.activated&&obelithPad()){obelith.activated=true;obelith.clock=0;}
  if(++obelith.clock>=(obelith.blocks.length?300:600)){obelith.clock=0;if(obelith.blocks.length)hideObelithBlocks();else spawnObelithBlocks();}
  for(const p of obelith.blocks)if(p.pulse>0)p.pulse--;
  const pad=obelithPad();
  if(!pad){obelith.charge=0;obelith.ready=false;obelith.beam=null;obelith.form=Math.max(0,obelith.form-1/30);return;}
  if(obelith.beam){
   tickObelithBeam(obelith.beam);
  }else if(!obelith.ready){
   obelith.charge=Math.min(60,obelith.charge+1);
   if(obelith.charge===60){obelith.ready=true;if(SFX.tone)SFX.tone(1200,.12,'sine',.08,1700);}
  }
  obelith.form=Math.max(obelith.form,obelith.beam||obelith.ready?1:obelith.charge/60);
  dino.chargePulse=Math.max(dino.chargePulse,obelith.form);
 }
// PLAYER_PART_END s8.apexCreate.tickObelith.1
}}

// index.html:105213 · Phạm vi: apexCreate
function __Part10(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawObelithSites.1 EDITABLE
function drawObelithSites(){
  if(apexColor!==4)return;
  for(const p of obelith.blocks){
   apexDrawObelith(p.x,p.y,p.w,p.h,null,APEX_SKINS[4].energyGlow);
   ctx.save();ctx.strokeStyle=APEX_SKINS[4].energyGlow;ctx.lineWidth=2;
   ctx.globalAlpha=.25+(p.pulse||0)/100;
   for(let i=0;i<3;i++){const a=frames*.025+i*Math.PI*2/3;ctx.beginPath();ctx.moveTo(p.x+p.w/2+Math.cos(a)*30,p.y-26+Math.sin(a)*8);ctx.lineTo(p.x+p.w/2+Math.cos(a+.5)*30,p.y-26+Math.sin(a+.5)*8);ctx.stroke();}
   if(dino.activePlatform===p){
    ctx.globalAlpha=.9;ctx.strokeStyle=obelith.ready?'#d5efff':APEX_SKINS[4].energyGlow;ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(p.x+p.w/2,p.y-3,p.w*.45,10,0,-Math.PI/2,-Math.PI/2+Math.PI*2*obelith.charge/60);ctx.stroke();
   }
   ctx.restore();
  }
  if(obelith.beam?.ray){
   const b=obelith.beam,ray=b.ray,tx=ray.x1/SCALE,ty=ray.y1/SCALE,m={spawnX:ray.x0/SCALE,spawnY:ray.y0/SCALE};
   const pulse=1+Math.sin(b.age*.8)*.07,dx=tx-m.spawnX,dy=ty-m.spawnY,len=Math.hypot(dx,dy)||1;
   ctx.save();ctx.translate(m.spawnX,m.spawnY);ctx.rotate(Math.atan2(dy,dx));ctx.lineCap='round';
   for(const [width,color,blur] of [[116,'rgba(40,117,255,.2)',24],[76,'rgba(52,156,255,.8)',12],[42,'#8bcaff',5],[19,'#effaff',0]]){
    ctx.strokeStyle=color;ctx.shadowColor='#349cff';ctx.shadowBlur=blur;ctx.lineWidth=width*pulse;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(len,0);ctx.stroke();
   }
   ctx.shadowBlur=0;ctx.strokeStyle='#c5eaff';ctx.lineWidth=2;
   for(let i=0;i<2;i++){ctx.beginPath();for(let x=0;x<=len;x+=10){const y=Math.sin(x*.055-b.age*.4+i*Math.PI)*28*pulse;if(x)ctx.lineTo(x,y);else ctx.moveTo(x,y);}ctx.stroke();}
   ctx.restore();ctx.save();ctx.strokeStyle='#b5e0ff';ctx.lineWidth=3;
   ctx.beginPath();ctx.ellipse(tx,ty,22,44+Math.sin(b.age*.7)*5,Math.atan2(dy,dx),0,Math.PI*2);ctx.stroke();ctx.restore();
  }
 }
// PLAYER_PART_END s8.apexCreate.drawObelithSites.1
}}

// index.html:105238 · Phạm vi: apexCreate
function __Part11(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.obelithSkin.1 EDITABLE
function obelithSkin(){
  if(apexColor!==4)return APEX_SKINS[apexColor];
  const q=obelithPreview||ultimate?.kind===4?1:obelith.form,skin={...APEX_SKINS[4]};
  const dormant={energyCore:'#8b98a8',energyGlow:'#354352',energyArc:'#233146'};
  for(const k of Object.keys(dormant)){
   const a=parseInt(dormant[k].slice(1),16),b=parseInt(skin[k].slice(1),16);
   skin[k]='#'+[16,8,0].map(shift=>Math.round(((a>>shift)&255)*(1-q)+((b>>shift)&255)*q).toString(16).padStart(2,'0')).join('');
  }return skin;
 }
// PLAYER_PART_END s8.apexCreate.obelithSkin.1
}}

// index.html:105247 · Phạm vi: apexCreate
function __Part12(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.obelithPower.1 EDITABLE
function obelithPower(){return apexColor===4?(obelithPreview||ultimate?.kind===4?1:obelith.form):0;}
// PLAYER_PART_END s8.apexCreate.obelithPower.1
}}

// index.html:105248 · Phạm vi: apexCreate
function __Part13(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawObelithTrace.1 EDITABLE
function drawObelithTrace(points,phase=0,glyphs=true){
  const power=obelithPower();if(power<=.01)return;
  ctx.save();ctx.lineCap=ctx.lineJoin='round';ctx.globalAlpha=power*.75;
  ctx.strokeStyle='#349cff';ctx.shadowColor='#2684ff';ctx.shadowBlur=9*power;ctx.lineWidth=2;
  ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();
  // A travelling highlight follows the same articulated seam instead of flying off the body.
  const q=((frames*.025+phase)%(points.length-1)),j=Math.floor(q),f=q-j;
  const x=points[j][0]+(points[j+1][0]-points[j][0])*f,y=points[j][1]+(points[j+1][1]-points[j][1])*f;
  ctx.fillStyle='#e5f7ff';ctx.beginPath();ctx.arc(x,y,2.5,0,Math.PI*2);ctx.fill();
  if(glyphs)for(let i=0;i<points.length-1;i++){
   const a=points[i],b=points[i+1],x=(a[0]+b[0])/2,y=(a[1]+b[1])/2;
   ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(b[1]-a[1],b[0]-a[0]));ctx.globalAlpha=power*(.5+.4*Math.sin(frames*.09-i+phase));
   ctx.strokeStyle='#9dd4ff';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-4,0);ctx.lineTo(0,-5);ctx.lineTo(4,0);ctx.lineTo(0,5);ctx.closePath();ctx.moveTo(0,-7);ctx.lineTo(0,7);ctx.moveTo(0,0);ctx.lineTo(6,-4);ctx.stroke();ctx.restore();
  }ctx.restore();
 }
// PLAYER_PART_END s8.apexCreate.drawObelithTrace.1
}}

// index.html:105263 · Phạm vi: apexCreate
function __Part14(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawObelithGloss.1 EDITABLE
function drawObelithGloss(r){
  if(apexColor!==4)return;
  ctx.save();ctx.translate(r.torsoCenterX,r.torsoCenterY);ctx.rotate(r.spineAngle);
  const g=ctx.createLinearGradient(0,-26,0,19);g.addColorStop(0,'rgba(170,193,221,.65)');g.addColorStop(.3,'rgba(83,108,143,.25)');g.addColorStop(1,'rgba(49,70,97,0)');
  ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-37,-9);ctx.bezierCurveTo(-22,-29,17,-30,37,-10);ctx.bezierCurveTo(11,-19,-13,-17,-37,-9);ctx.fill();
  ctx.strokeStyle='rgba(193,210,232,.65)';ctx.lineWidth=1.3;ctx.beginPath();ctx.ellipse(-3,-15,27,7,0,Math.PI*1.1,Math.PI*1.83);ctx.stroke();ctx.restore();
  ctx.save();ctx.strokeStyle='rgba(140,164,195,.5)';ctx.lineWidth=1.5;ctx.lineCap='round';ctx.beginPath();
  r.tailNodes.forEach((n,i)=>i?ctx.lineTo(n.x,n.y-n.rTop*.55):ctx.moveTo(n.x,n.y-n.rTop*.55));ctx.stroke();
  ctx.translate(r.headX,r.headY);const flip=r.w>.55||r.lookAwayFactor>.45?-1:1;ctx.scale(flip,1);ctx.rotate(r.headRotation*flip);ctx.fillStyle='rgba(166,187,214,.5)';ctx.beginPath();ctx.moveTo(-9,-18);ctx.quadraticCurveTo(15,-24,37,-14);ctx.quadraticCurveTo(11,-17,-9,-18);ctx.fill();
  ctx.strokeStyle='#c83a4d';ctx.lineWidth=1.1;ctx.beginPath();ctx.moveTo(-8,-21);ctx.lineTo(15,-22);ctx.lineTo(35,-15);ctx.stroke();ctx.restore();
 }
// PLAYER_PART_END s8.apexCreate.drawObelithGloss.1
}}

// index.html:105274 · Phạm vi: apexCreate
function __Part15(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawObelithRunes.1 EDITABLE
function drawObelithRunes(r){
  const q=obelithPower();if(q<=.01)return;
  ctx.save();const g=ctx.createRadialGradient(r.torsoCenterX,r.torsoCenterY,4,r.torsoCenterX,r.torsoCenterY,85);
  g.addColorStop(0,'rgba(52,156,255,'+(q*.28)+')');g.addColorStop(1,'rgba(25,101,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(r.torsoCenterX,r.torsoCenterY,85,62,r.spineAngle,0,Math.PI*2);ctx.fill();ctx.restore();
  drawObelithTrace(r.tailNodes.slice().reverse().map(n=>[n.x,n.y]).concat([[r.hipX,r.hipY],[r.torsoCenterX,r.torsoCenterY],[r.chestX,r.chestY],[r.neckMidX,r.neckMidY],[r.headX-8,r.headY]]));
  drawObelithTrace([[r.hipX-15,r.hipY-13],[r.torsoCenterX,r.torsoCenterY-17],[r.chestX,r.chestY-10]],2,false);
  ctx.save();ctx.translate(r.headX,r.headY);const flip=r.w>.55||r.lookAwayFactor>.45?-1:1;ctx.scale(flip,1);ctx.rotate(r.headRotation*flip);drawObelithTrace([[-8,-17],[17,-18],[34,-11]],1);ctx.restore();
 }
// PLAYER_PART_END s8.apexCreate.drawObelithRunes.1
}}

// index.html:105282 · Phạm vi: apexCreate
function __Part16(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.startObelithUltimate.1 EDITABLE
function startObelithUltimate(u){
  dino.x=(owner.x+owner.w/2)/SCALE;dino.y=(owner.y+owner.h)/SCALE;
  obelith.beam=null;obelith.ready=false;obelith.charge=0;obelith.form=1;currentSkin=APEX_SKINS[4];
  dino.activePlatform=dino.ledgePlatform=null;dino.isLedgeGrabbing=dino.isLedgeClimbing=dino.isWallSliding=false;
  u.floor=mapTheme==='ocean'?bienDayHT():dkNenY();
  for(const p of apexNativePlatforms())if(p.x<=owner.x+owner.w&&p.x+p.w>=owner.x&&p.top>=owner.y+owner.h-2&&p.top<u.floor&&!p.wall)u.floor=p.top;
  u.floor=Math.min(u.floor,u.top+canvas.height-12);
  u.pillarX=dino.x*SCALE;u.pillarW=132;u.liftFrom=dino.y*SCALE;
  // Leave room above the pillar to see the coiled ascent and the entire saw.
  u.summit=Math.min(u.liftFrom,Math.max(u.top+(u.mode==='boss'?180:140),Math.min(u.floor-200,u.liftFrom-100)));u.pillarTop=u.floor;
  u.hit=false;u.radius=u.mode==='boss'?78:66;u.trail=[];u.impact=null;u.ricochets=[];u.bounceHits=new Map();
  u.sawActive=false;u.meteorActive=false;u.bounceFrames=0;u.endAt=u.mode==='boss'?266:390;
 }
// PLAYER_PART_END s8.apexCreate.startObelithUltimate.1
}}

// index.html:105295 · Phạm vi: apexCreate
function __Part17(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.obelithCurve.1 EDITABLE
function obelithCurve(a,c,b,q){const k=1-q;return {x:k*k*a.x+2*k*q*c.x+q*q*b.x,y:k*k*a.y+2*k*q*c.y+q*q*b.y};}
// PLAYER_PART_END s8.apexCreate.obelithCurve.1
}}

// index.html:105296 · Phạm vi: apexCreate
function __Part18(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.obelithSawPose.1 EDITABLE
function obelithSawPose(u,p){
  dino.x=p.x/SCALE;dino.y=p.y/SCALE+48;dino.isGrounded=false;dino.meleeState='air_saw_spin';dino.sawSpinAngle=u.t*.55;dino.scaleX=dino.scaleY=1.25;
  u.sawActive=true;u.trail.push({...p});if(u.trail.length>12)u.trail.shift();
 }
// PLAYER_PART_END s8.apexCreate.obelithSawPose.1
}}

// index.html:105300 · Phạm vi: apexCreate
function __Part19(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.obelithSweep.1 EDITABLE
function obelithSweep(u,a,b){
  // Read the live population, including newly spawned enemies and enemies entering the view.
  for(const o of sgTargets(owner)){
   if(o._beamClashPoint||o.invulnAll||!(o.hp>0)||o.x+o.w<u.left||o.x>u.left+canvas.width||o.y+o.h<u.top||o.y>u.top+canvas.height||sgSegmentBox(a.x,a.y,b.x,b.y,o,u.radius)===null)continue;
   const root=o.__goc||o,hit=u.bounceHits.get(root)||{last:-999,damage:0};
   if(u.t-hit.last<24||hit.damage>=150)continue;
   const damage=Math.min(25,150-hit.damage),v={o,x:o.x,y:o.y,w:o.w,h:o.h,deadAt:null,sprite:null,pad:0};
   if(o.hp<=damage)ultCaptureLive(v);
   sgDamage(owner,o,damage,'apex');hit.last=u.t;hit.damage+=damage;u.bounceHits.set(root,hit);
   const continues=!o.sdtUltXong&&((o.phase===1&&typeof o.startPhase2==='function')||(o.phase===2&&typeof o.suBatDau==='function'));
   if(o.hp<=0&&!continues&&v.sprite){v.deadAt=u.t;v.o={x:v.x,y:v.y,w:v.w,h:v.h};u.victims.push(v);}
  }
 }
// PLAYER_PART_END s8.apexCreate.obelithSweep.1
}}

// index.html:105313 · Phạm vi: apexCreate
function __Part20(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.obelithRicochet.1 EDITABLE
function obelithRicochet(u){
  if(!u.ball){
   const r=u.radius+12,ground=mapTheme==='ocean'?bienDayHT():dkNenY();
   u.bounds={left:Math.max(worldL()+r,u.left+r),right:Math.min(worldR()-r,u.left+canvas.width-r),top:u.top+r+12,bottom:Math.min(ground-r,u.top+canvas.height-r-28)};
   if(u.bounds.bottom<u.bounds.top+30)u.bounds.bottom=u.bounds.top+30;
   u.ball={x:Math.max(u.bounds.left,Math.min(u.bounds.right,dino.x*SCALE)),y:Math.max(u.bounds.top,Math.min(u.bounds.bottom,(dino.y-48)*SCALE)),vx:u.dir*26,vy:18};
  }
  const p=u.ball,b=u.bounds;let remaining=1;
  // Sweep each reflected segment separately, so neither corners nor fast passes tunnel through enemies.
  for(let i=0;i<4&&remaining>1e-6;i++){
   const tx=p.vx>0?(b.right-p.x)/p.vx:(b.left-p.x)/p.vx,ty=p.vy>0?(b.bottom-p.y)/p.vy:(b.top-p.y)/p.vy;
   const dt=Math.max(0,Math.min(remaining,tx,ty)),from={x:p.x,y:p.y};p.x+=p.vx*dt;p.y+=p.vy*dt;
   obelithSweep(u,from,p);remaining-=dt;
   const hitX=tx<=dt+1e-7,hitY=ty<=dt+1e-7;
   if(hitX)p.vx=-p.vx;if(hitY)p.vy=-p.vy;
   if(hitX||hitY){u.ricochets.push({x:p.x,y:p.y,t:u.t,vertical:hitX});if(u.ricochets.length>12)u.ricochets.shift();}
   else break;
  }
  u.bounceFrames++;obelithSawPose(u,p);
 }
// PLAYER_PART_END s8.apexCreate.obelithRicochet.1
}}

// index.html:105333 · Phạm vi: apexCreate
function __Part21(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.obelithDetonate.1 EDITABLE
function obelithDetonate(u,x,y,scale=1){
  u.impact={x,y,at:u.t,scale};
  if(SFX.tone){SFX.tone(65,.35,'sawtooth',.16*scale,24);SFX.tone(180,.2,'triangle',.1*scale,35);}
 }
// PLAYER_PART_END s8.apexCreate.obelithDetonate.1
}}

// index.html:105337 · Phạm vi: apexCreate
function __Part22(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.tickObelithUltimate.1 EDITABLE
function tickObelithUltimate(u){
  const t=u.t;u.meteorActive=false;
  if(t<=48){
   const q=1-Math.pow(1-t/48,3);u.pillarTop=u.floor+(u.summit-u.floor)*q;
   dino.x=u.pillarX/SCALE;dino.y=Math.min(u.liftFrom,u.pillarTop)/SCALE;dino.isGrounded=u.pillarTop<=u.liftFrom;dino.headPitch=-.55*q;
  }else if(t<=138){
   dino.headPitch=-.55;dino.jawOpen=.3+(t-48)/90*.6;dino.chargePulse=(t-48)/90;
  }else{
   u.pillarTop=u.summit+(u.floor-u.summit)*Math.min(1,(t-138)/48);
   if(u.mode==='ricochet'){
    if(t<=318)obelithRicochet(u); // Exactly 180 frames / three seconds of ricocheting.
    else if(t<=366){
     if(t===319){u.returnFrom={x:dino.x*SCALE,y:(dino.y-48)*SCALE};u.returnTo={x:u.pillarX,y:u.floor-48*SCALE};u.returnControl={x:(u.returnFrom.x+u.pillarX)/2,y:Math.min(u.returnFrom.y,u.returnTo.y)-170};}
     const q=(t-318)/48,p=obelithCurve(u.returnFrom,u.returnControl,u.returnTo,q);obelithSawPose(u,p);
     if(q>.8){u.sawActive=false;dino.meleeState='none';dino.scaleX=dino.scaleY=1;}
     if(t===366)obelithDetonate(u,u.pillarX,u.floor,.45);
    }else{u.sawActive=false;dino.meleeState='none';dino.scaleX=dino.scaleY=1;dino.y=u.floor/SCALE;dino.isGrounded=true;}
   }else if(t<=186){
    if(t===139){
     const o=u.aim.o;u.arcFrom={x:dino.x*SCALE,y:(dino.y-48)*SCALE};
     u.through={x:o.x+o.w/2,y:o.y+o.h/2};const margin=u.radius+18;
     u.arcTo={x:Math.max(worldL()+margin,Math.min(worldR()-margin,u.through.x-u.dir*40)),y:Math.min(u.top+132,u.through.y-120)};
     u.arcControl={x:(u.arcFrom.x+u.arcTo.x)/2-u.dir*65,y:Math.max(Math.min(u.arcFrom.y-40,u.top+88),Math.min(u.arcFrom.y,u.arcTo.y)-95)};
     u.to={x:Math.max(worldL()+margin,Math.min(worldR()-margin,u.through.x+u.dir*45)),y:0};
     u.landingFloor=mapTheme==='ocean'?bienDayHT():dkNenY();
     for(const p of apexNativePlatforms())if(!p.wall&&p.x<=u.to.x&&p.x+p.w>=u.to.x&&p.top>=u.through.y&&p.top<u.landingFloor)u.landingFloor=p.top;
     u.to.y=u.landingFloor-8;
    }
    obelithSawPose(u,obelithCurve(u.arcFrom,u.arcControl,u.arcTo,(t-138)/48));
   }else if(t<=222){
    const q=Math.pow((t-186)/36,1.65),a=q<.75?u.arcTo:u.through,b=q<.75?u.through:u.to,f=q<.75?q/.75:(q-.75)/.25;
    const p={x:a.x+(b.x-a.x)*f,y:a.y+(b.y-a.y)*f},last=u.trail[u.trail.length-1]||u.arcTo;
    u.meteorActive=true;obelithSawPose(u,p);
    if(!u.hit&&sgSegmentBox(last.x,last.y,p.x,p.y,u.aim.o,u.radius)!==null){u.hit=true;ultHit(u.aim,150);}
    if(t===222)obelithDetonate(u,p.x,u.landingFloor);
   }else{
    u.sawActive=false;dino.meleeState='none';dino.scaleX=dino.scaleY=1;dino.sawSpinAngle=0;
    dino.facing=u.aim.o.x+u.aim.o.w/2<dino.x*SCALE?-1:1;dino.visualScaleX=dino.facing;dino.headPitch=0;
    dino.y=u.landingFloor/SCALE;dino.isGrounded=true;
   }
  }
  dino.vx=dino.vy=0;owner.x=dino.x*SCALE-owner.w/2;owner.y=dino.y*SCALE-owner.h;owner.dy=0;owner.grounded=dino.isGrounded;
  if(t>=u.endAt)ultEnd();
 }
// PLAYER_PART_END s8.apexCreate.tickObelithUltimate.1
}}

// index.html:105381 · Phạm vi: apexCreate
function __Part23(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawObelithUltimate.1 EDITABLE
function drawObelithUltimate(u){
  const t=u.t,h=Math.max(1,u.floor-u.pillarTop);
  if(h>2)apexDrawObelith(u.pillarX-u.pillarW/2,u.pillarTop,u.pillarW,h,null,currentSkin.energyGlow);
  if(t<=138){
   ctx.save();ctx.scale(SCALE,SCALE);drawDinosaur();ctx.restore();
   if(t>48){const q=Math.min(1,(t-48)/90),cx=dino.x*SCALE,cy=(dino.y-48)*SCALE;ctx.save();ctx.strokeStyle=currentSkin.energyGlow;ctx.lineWidth=2;
    for(let i=0;i<12;i++){const a=i*Math.PI/6+t*.04,r=22+(1-q)*75;ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);ctx.lineTo(cx+Math.cos(a)*(r+10),cy+Math.sin(a)*(r+10));ctx.stroke();}ctx.restore();}
  }else if(u.sawActive){
   const cx=dino.x*SCALE,cy=(dino.y-48)*SCALE,radius=u.mode==='boss'&&!u.meteorActive?u.radius*.82:u.radius;
   if(u.meteorActive){
   // A broad, tapered comet tail streams opposite the dive, with a visible saw at its core.
   const tail=u.trail[0]||u.arcTo,angle=Math.atan2(cy-tail.y,cx-tail.x);
   ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);
   const flame=ctx.createLinearGradient(-330,0,85,0);flame.addColorStop(0,'rgba(23,65,220,0)');flame.addColorStop(.4,'rgba(35,107,255,.25)');flame.addColorStop(.8,'rgba(76,171,255,.8)');flame.addColorStop(1,'rgba(205,239,255,.9)');
   ctx.fillStyle=flame;ctx.beginPath();ctx.moveTo(70,0);ctx.quadraticCurveTo(40,-110,-100,-65);ctx.lineTo(-330,-18);ctx.lineTo(-235,0);ctx.lineTo(-355,30);ctx.quadraticCurveTo(-70,100,70,0);ctx.fill();
   for(let i=0;i<14;i++){const age=(t*9+i*27)%280;ctx.globalAlpha=(1-age/280)*.7;ctx.fillStyle=i%2?'#d5efff':'#348bff';ctx.beginPath();ctx.ellipse(-age,Math.sin(i*4+age*.035)*(12+age*.16),3+age*.015,2,0,0,Math.PI*2);ctx.fill();}ctx.restore();
   }
   ctx.save();ctx.lineCap='round';for(let i=1;i<u.trail.length;i++){ctx.globalAlpha=i/u.trail.length*.45;ctx.strokeStyle=currentSkin.energyGlow;ctx.lineWidth=radius*1.5;ctx.beginPath();ctx.moveTo(u.trail[i-1].x,u.trail[i-1].y);ctx.lineTo(u.trail[i].x,u.trail[i].y);ctx.stroke();}ctx.restore();
   ctx.save();ctx.scale(SCALE,SCALE);drawDinosaur();ctx.restore();
   ctx.save();ctx.translate(cx,cy);ctx.rotate(t*.65);ctx.shadowColor=currentSkin.energyGlow;ctx.shadowBlur=18;ctx.strokeStyle=currentSkin.energyCore;ctx.lineWidth=4;
   ctx.beginPath();ctx.arc(0,0,radius-4,0,Math.PI*2);ctx.stroke();
   for(let i=0;i<20;i++){const a=i*Math.PI/10,r=radius;ctx.fillStyle=i%2?currentSkin.energyGlow:'#d5efff';ctx.beginPath();ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r);ctx.lineTo(Math.cos(a+.12)*(r+16),Math.sin(a+.12)*(r+16));ctx.lineTo(Math.cos(a+.24)*r,Math.sin(a+.24)*r);ctx.closePath();ctx.fill();}ctx.restore();
  }else{ctx.save();ctx.scale(SCALE,SCALE);drawDinosaur();ctx.restore();}
  for(const hit of u.ricochets){const age=t-hit.t;if(age>18)continue;ctx.save();ctx.translate(hit.x,hit.y);ctx.globalAlpha=1-age/18;ctx.strokeStyle='#b8e4ff';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,0,8+age*3,12+age*2,hit.vertical?Math.PI/2:0,0,Math.PI*2);ctx.stroke();ctx.restore();}
 }
// PLAYER_PART_END s8.apexCreate.drawObelithUltimate.1
}}

// index.html:105407 · Phạm vi: apexCreate
function __Part24(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawObelithImpact.1 EDITABLE
function drawObelithImpact(u){
  if(!u.impact)return;
  const age=u.t-u.impact.at,q=Math.min(1,age/44),x=u.impact.x,y=u.impact.y;
  ctx.save();ctx.translate(x,y);ctx.scale(u.impact.scale||1,u.impact.scale||1);
  const radius=45+Math.pow(q,.55)*150,g=ctx.createRadialGradient(0,-12,1,0,-12,radius);
  g.addColorStop(0,'rgba(215,242,255,'+Math.max(0,1-q*2)+')');g.addColorStop(.3,'rgba(52,156,255,'+(.65*(1-q))+')');g.addColorStop(1,'rgba(23,101,255,0)');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,-12,radius,0,Math.PI*2);ctx.fill();
  for(let i=0;i<3;i++){ctx.globalAlpha=Math.max(0,1-q-i*.12);ctx.strokeStyle=i%2?'#348bff':'#c5eaff';ctx.lineWidth=5-i;ctx.beginPath();ctx.ellipse(0,0,30+q*(220-i*35),8+q*(43-i*5),0,0,Math.PI*2);ctx.stroke();}
  for(let i=0;i<34;i++){
   const a=Math.PI+i*Math.PI/33,v=2.5+(i*7%13)*.45,xx=Math.cos(a)*age*v,yy=Math.sin(a)*age*v+age*age*.085;
   ctx.globalAlpha=Math.max(0,1-q);ctx.fillStyle=i%3?'#9a8051':'#85c6ff';ctx.save();ctx.translate(xx,yy);ctx.rotate(i+age*.13);ctx.fillRect(-3,-4,4+i%5,5+i%7);ctx.restore();
  }ctx.restore();
  if(age<6){ctx.save();ctx.fillStyle='rgba(195,230,255,'+(.28*(u.impact.scale||1)*(1-age/6))+')';ctx.fillRect(u.left,u.top,canvas.width,canvas.height);ctx.restore();}
 }
// PLAYER_PART_END s8.apexCreate.drawObelithImpact.1
}}
