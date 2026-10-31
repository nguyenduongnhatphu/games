// PLAYER_FILE: DanteEbonyIvory
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CUS_DAN, DANTE_ATTACK_RATE, DantePlayerRig, LT, MegaManXBoss, Player, SFX, VG_H, ammoPicker, ammoXem, apexCreate, apexOn, apexWrap, battuMa, ctx, currentAmmoType, cusNCPicker, danteActive, danteBulletColor, danteDraw, danteHit, danteKey, danteLabel, danteOn, danteRangedBase, danteStyle, danteSync, danteTick, dashCd, dashVx, dino, doDash, dojoMode, drawCustomMenu, drawDantePlayerBody, drawUI, drawVergilBody, frames, gameOver, gameVictory, ironPlayerPreview, keys, paused, playerAttackStep, previewDino, runePicker, runeXem, sgTargets, sgVaultTarget, shakeTimer, wrapLines, xFormIdx
// index.html:110044 · Phạm vi: global
// PLAYER_PART_BEGIN s13.EI_MOVES.1 EDITABLE
const EI_MOVES={
 shot:{name:'EBONY & IVORY',T:8,shots:[1],damage:1},
 twin:{name:'TWINS',T:16,shots:[1,4],damage:1},
 charge:{name:'CHARGED SHOT',T:24,shots:[4,8],damage:6},
 twosome:{name:'TWOSOME TIME',T:32,shots:[2,10,18,26],damage:2},
 honeycomb:{name:'HONEYCOMB FIRE',T:44,shots:[4,8,12,16,20,24,28,32,36],damage:1},
 rain:{name:'RAIN STORM',T:36,shots:[3,9,15,21,27],damage:2},
 stinger:{name:'GUN STINGER',T:32,shots:[13],damage:10},
 slide:{name:'CUT-IN SLIDE',T:40,shots:[],damage:12},
 fireworks:{name:'FIREWORKS',T:34,shots:[9,19],damage:5},
 vault:{name:'RAIN STORM · VAULT',T:48,shots:[],damage:1}
};
// PLAYER_PART_END s13.EI_MOVES.1

// index.html:110056 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiState.1 EDITABLE
function eiState(p){return p.ebony||(p.ebony={hand:0,flash:[],rainUsed:false,lastJ:-1000,lastK:-1000,lastDash:-1000,slideReady:-1000,dashDir:1});}
// PLAYER_PART_END s13.eiState.1

// index.html:110057 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiCommand.1 EDITABLE
function eiCommand(special,charge){
 const n=dino,p=n.dante;
 if(!p||p.cd>0||p.attack||n.isShielding()||n.hp<=0)return;
 const e=eiState(p),down=keys.KeyS||keys.ArrowDown;
 let id='shot';
 if(special){
  if(charge>=45)id='charge';
  else if(danteStyle(p)===1){
   if(!n.grounded&&!e.rainUsed)id='rain';
   else id=down?'honeycomb':'twosome';
  }else id='twin';
 }
 const m=EI_MOVES[id];
 p.attack={ebony:true,id,name:m.name,age:0,duration:m.T,dir:n.isFacingLeft?-1:1};p.cd=m.T;
 if(id==='rain')e.rainUsed=true;
 if(special)danteLabel(m.name);
}
// PLAYER_PART_END s13.eiCommand.1

// index.html:110074 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiShoot.1 EDITABLE
function eiShoot(n,p,a,angle,hand,damage,charged=false){
 const e=eiState(p),x=n.x+n.w/2+Math.cos(angle)*34+(hand?-9:9),y=n.y+22+Math.sin(angle)*18+(hand?3:-3);
 const speed=charged?21:18;
 p.rounds.push({arm:4,x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,r:charged?5:2.5,kind:charged?'ei-charge':'bullet',color:danteBulletColor(p),damage:danteRangedBase(p,charged?damage:1,charged)+(p.dt?2:0),life:50,age:0,hit:new Set(),dir:a.dir});
 e.flash.push({x,y,angle,hand,t:4});
}
// PLAYER_PART_END s13.eiShoot.1

// index.html:110081 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiUsing.1 EDITABLE
function eiUsing(){return danteActive(dino)&&dino.dante?.arm===4&&!paused&&!gameOver&&!gameVictory;}
// PLAYER_PART_END s13.eiUsing.1

// index.html:110082 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiStartMove.1 EDITABLE
function eiStartMove(id,charge=0){
 const n=dino,p=n.dante,e=eiState(p),m=EI_MOVES[id];
 p.k=null;p.cd=m.T;p.attack={ebony:true,id,name:m.name,age:0,duration:m.T,dir:e.dashDir,charge};
 const a=p.attack;n.isFacingLeft=a.dir<0;e.lastDash=e.slideReady=e.lastJ=e.lastK=-1000;
 a.target=sgVaultTarget(n,a.dir);a.startX=n.x;a.startY=n.y;a.travel=0;
 if(id==='stinger')dashVx=a.dir*17;
 if(id==='slide'){
  const distance=a.target?Math.max(80,(a.target.x+a.target.w/2-(n.x+n.w/2))*a.dir+65):165;
  a.speed=Math.max(12,Math.min(23,distance/14));dashVx=a.dir*a.speed;
 }
 if(id==='vault'){n.dy=-13;n.grounded=false;dashVx=a.dir*8;}
 danteLabel(m.name);
}
// PLAYER_PART_END s13.eiStartMove.1

// index.html:110095 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiKeyBase.1 EDITABLE
const eiKeyBase=danteKey;
// PLAYER_PART_END s13.eiKeyBase.1

// index.html:110096 · Phạm vi: global
// PLAYER_PART_BEGIN s13.danteKey.1 EDITABLE
danteKey=function(code,repeat){
 if(eiUsing()&&!repeat){
  const p=dino.dante,e=eiState(p),a=p.attack;
  if((code==='KeyQ'||code==='KeyE')&&a?.ebony&&a.age>=4){p.attack=null;p.cd=0;}
  if(code==='KeyJ'&&frames-e.lastDash<=24){
   keys[code]=true;eiStartMove(frames-e.slideReady<=24?'slide':'stinger');return true;
  }
  if(code==='KeyK'&&frames-e.lastDash<=24){keys[code]=true;eiStartMove('fireworks');return true;}
  if(code==='KeyK')e.lastK=frames;
  const handled=eiKeyBase(code,repeat);
  if(code==='KeyJ'&&p.attack?.id==='shot')e.lastJ=frames;
  return handled;
 }
 return eiKeyBase(code,repeat);
};
// PLAYER_PART_END s13.danteKey.1

// index.html:110111 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiDashBase.1 EDITABLE
const eiDashBase=doDash;
// PLAYER_PART_END s13.eiDashBase.1

// index.html:110112 · Phạm vi: global
// PLAYER_PART_BEGIN s13.doDash.1 EDITABLE
doDash=function(...args){
 const using=eiUsing(),before=dashCd,p=using?dino.dante:null,e=p?eiState(p):null;
 const charge=p?.k,fromK=using&&(charge!==null||frames-e.lastK<=24);
 eiDashBase(...args);
 if(!using||dashCd<=before)return;
 e.lastDash=frames;e.dashDir=dino.dashDir;
 if(fromK){eiStartMove('vault',charge||0);return;}
 e.slideReady=frames-e.lastJ<=24&&dino.grounded?frames:-1000;
 if(p.attack?.ebony){p.attack=null;p.cd=0;}
};
// PLAYER_PART_END s13.doDash.1

// index.html:110122 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiAim.1 EDITABLE
function eiAim(n,dir){
 const cx=n.x+n.w/2,cy=n.y+22;
 const targets=sgTargets(n).filter(o=>(o.x+o.w/2-cx)*dir>0&&Math.abs(o.y+o.h/2-cy)<180);
 targets.sort((a,b)=>Math.hypot(a.x-cx,a.y-cy)-Math.hypot(b.x-cx,b.y-cy));
 const t=targets[0],pitch=t?Math.max(-.35,Math.min(.35,Math.atan2(t.y+t.h/2-cy,Math.abs(t.x+t.w/2-cx)))):0;
 return dir>0?pitch:Math.PI-pitch;
}
// PLAYER_PART_END s13.eiAim.1

// index.html:110129 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiCoyote.1 EDITABLE
function eiCoyote(n,p,a,angle,damage){
 const x=n.x+n.w/2,y=n.y+24,range=185;
 // One damage event per target in a short cone; effects do not deal extra pellet damage.
 for(const o of sgTargets(n)){
  const dx=o.x+o.w/2-x,dy=o.y+o.h/2-y,d=Math.hypot(dx,dy);
  const spread=Math.atan2(Math.sin(Math.atan2(dy,dx)-angle),Math.cos(Math.atan2(dy,dx)-angle));
  if(d<30||(d<range+o.w/2&&Math.abs(spread)<.48+Math.atan2(o.h/2,Math.max(1,d)))){
   if(danteHit(p,o,danteRangedBase(p,(d<90?damage:Math.ceil(damage*.65)),true)+(p.dt?2:0))>0&&Number.isFinite(o.dy))o.dy=Math.min(o.dy,-3);
  }
 }
 const e=eiState(p);e.flash.push({x:x+Math.cos(angle)*48,y:y+Math.sin(angle)*48,angle,hand:0,t:6,coyote:true});
 for(let i=0;i<7;i++){const theta=angle+(i-3)*.11;p.rounds.push({x,y,vx:Math.cos(theta)*18,vy:Math.sin(theta)*18,r:2,kind:'coyote-smoke',damage:0,life:8,age:0,hit:new Set()});}
 shakeTimer=Math.max(shakeTimer,5);if(SFX.tone)SFX.tone(100,.11,'sawtooth',.09,40);
}
// PLAYER_PART_END s13.eiCoyote.1

// index.html:110143 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiDashMove.1 EDITABLE
function eiDashMove(n,p,a,m){
 if(!['stinger','slide','fireworks','vault'].includes(a.id))return false;
 const e=eiState(p);
 if(a.id==='stinger'){
  const close=a.target&&(a.target.x+a.target.w/2-(n.x+n.w/2))*a.dir<65;
  if(a.age<10)dashVx=close?0:a.dir*17;
  if(a.age===13){eiCoyote(n,p,a,a.dir>0?0:Math.PI,m.damage);dashVx=-a.dir*4;}
 }else if(a.id==='slide'){
  const passed=a.target&&(n.x+n.w/2-a.target.x-a.target.w/2)*a.dir>55;
  if(!a.passed&&(passed||a.age>=17)){a.passed=a.age;dashVx=0;}
  if(!a.passed)dashVx=a.dir*a.speed;
  if(a.age===4){n.invincible=true;n.invTimer=Math.max(n.invTimer,12);}
  if(a.passed){
   const dir=a.target?(a.target.x+a.target.w/2>n.x+n.w/2?1:-1):-a.dir;
   n.isFacingLeft=dir<0;p.body.facingLeft=n.isFacingLeft;
   if(a.age===a.passed+5){eiCoyote(n,p,a,dir>0?0:Math.PI,m.damage);dashVx=-dir*3;}
  }
 }else if(a.id==='fireworks'){
  if(m.shots.includes(a.age)){eiCoyote(n,p,a,0,m.damage);eiCoyote(n,p,a,Math.PI,m.damage);}
 }else{
  if(a.age<18&&!a.sent)dashVx=a.dir*8;
  const above=a.target&&Math.abs(n.x+n.w/2-a.target.x-a.target.w/2)<55&&n.y+n.h<a.target.y+12;
  if(!a.sent&&(above||n.dy>=-1||a.age>=25)){
   a.sent=true;dashVx=-a.dir*3;n.dy=Math.min(n.dy,-2);
   const angle=a.target?Math.atan2(a.target.y+a.target.h/2-(n.y+22),a.target.x+a.target.w/2-(n.x+n.w/2)):Math.PI/2;
   // Same evenly spaced 60-degree fan as Song Sung, now free of ammo and reload state.
   for(let i=0;i<12;i++)eiShoot(n,p,a,angle-Math.PI/6+i*Math.PI/33,i%2,a.charge>=45?2:1);
  }
 }
 if(a.age>=m.T){p.attack=null;p.body._gunRoll=0;}
 return true;
}
// PLAYER_PART_END s13.eiDashMove.1

// index.html:110175 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiTick.1 EDITABLE
function eiTick(){
 if(!danteActive(dino)||!dino.dante)return;
 const n=dino,p=n.dante,e=eiState(p),a=p.attack;
 p.body._gunRoll=a?.id==='slide'&&a.age<18?Math.PI*2*a.age/18:0;
 e.flash=e.flash.filter(f=>--f.t>0);
 if(n.grounded)e.rainUsed=false;
 if(!a||!a.ebony||!playerAttackStep(a,DANTE_ATTACK_RATE))return;
 const m=EI_MOVES[a.id];a.age++;
 if(eiDashMove(n,p,a,m))return;
 if(m.shots.includes(a.age)){
  const aim=eiAim(n,a.dir),hand=e.hand++%2;
  if(a.id==='twosome'){
   eiShoot(n,p,a,aim,0,m.damage);eiShoot(n,p,a,eiAim(n,-a.dir),1,m.damage);
  }else if(a.id==='rain'){
   const spread=Math.sin(a.age*.7)*.65;
   eiShoot(n,p,a,Math.PI/2+spread,0,m.damage);eiShoot(n,p,a,Math.PI/2-spread,1,m.damage);
  }else if(a.id==='honeycomb'){
   const spread=Math.sin(a.age*.9)*.22;
   eiShoot(n,p,a,aim+spread,hand,m.damage);
  }else eiShoot(n,p,a,aim,hand,m.damage,a.id==='charge');
  if(SFX.tone)SFX.tone(hand?920:720,.035,'triangle',.045,180);
 }
 // One short suspension per jump; no infinite airborne firing stall.
 if(a.id==='rain'&&!n.grounded)n.dy=Math.min(n.dy,.6);
 if(a.age>=m.T)p.attack=null;
}
// PLAYER_PART_END s13.eiTick.1

// index.html:110201 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiTickBase.1 EDITABLE
const eiTickBase=danteTick;
// PLAYER_PART_END s13.eiTickBase.1

// index.html:110202 · Phạm vi: global
// PLAYER_PART_BEGIN s13.danteTick.1 EDITABLE
danteTick=function(){eiTickBase();eiTick();};
// PLAYER_PART_END s13.danteTick.1

// index.html:110203 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiDraw.1 EDITABLE
function eiDraw(n){
 const p=n.dante,e=eiState(p),a=p.attack,dir=n.isFacingLeft?-1:1;
 ctx.save();ctx.translate(n.x+n.w/2,n.y+30);ctx.scale(dir,1);ctx.rotate(p.body._gunRoll||0);ctx.translate(0,-10);
 const shotgun=a?.ebony&&['stinger','slide','fireworks'].includes(a.id);
 if(shotgun){
  ctx.save();if(a.id==='fireworks')ctx.rotate(a.age*.32);
  ctx.strokeStyle='#a52b31';ctx.lineWidth=6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-9,0);ctx.lineTo(8,9);ctx.lineTo(24,1);ctx.stroke();
  ctx.fillStyle='#272b32';ctx.fillRect(14,-6,34,8);ctx.fillStyle='#b4bdc3';ctx.fillRect(24,-7,27,3);ctx.fillStyle='#664734';ctx.fillRect(9,1,13,7);ctx.fillStyle='#181b21';ctx.fillRect(20,3,6,10);ctx.restore();
 }
 for(let hand=0;hand<(shotgun?0:2);hand++){
  let angle=a&&a.ebony?(a.id==='twosome'&&hand?Math.PI:a.id==='rain'?Math.PI/2+(hand?-.65:.65)*Math.sin(a.age*.4):(dir>0?eiAim(n,dir):Math.PI-eiAim(n,dir))):1.1;
  const recoil=e.flash.some(f=>f.hand===hand)?-3:0;
  ctx.save();ctx.translate(hand?-9:9,hand?3:0);ctx.rotate(angle);
  ctx.strokeStyle=hand?'#751c25':'#b02c32';ctx.lineWidth=6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(8+recoil,3);ctx.lineTo(17+recoil,0);ctx.stroke();
  ctx.fillStyle='#e2bc9b';ctx.fillRect(14+recoil,-3,5,5);
  ctx.fillStyle=hand?'#1b1d24':'#e6e9ee';ctx.strokeStyle=hand?'#9a9da5':'#424957';ctx.lineWidth=1;
  ctx.fillRect(17+recoil,-5,17,5);ctx.strokeRect(17+recoil,-5,17,5);ctx.fillStyle='#47362d';ctx.fillRect(18+recoil,0,5,7);
  ctx.restore();
 }
 ctx.restore();
 for(const f of e.flash){ctx.save();ctx.translate(f.x,f.y);ctx.rotate(f.angle);ctx.fillStyle=f.hand?'#ffd483':'#fff5d6';ctx.beginPath();ctx.moveTo(0,-4);ctx.lineTo(f.coyote?30:14,0);ctx.lineTo(0,4);ctx.fill();ctx.restore();}
}
// PLAYER_PART_END s13.eiDraw.1

// index.html:110225 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiDrawBase.1 EDITABLE
const eiDrawBase=danteDraw;
// PLAYER_PART_END s13.eiDrawBase.1

// index.html:110226 · Phạm vi: global
// PLAYER_PART_BEGIN s13.danteDraw.1 EDITABLE
danteDraw=function(n){eiDrawBase(n);if(n.dante&&n.dante.arm===4)eiDraw(n);};
// PLAYER_PART_END s13.danteDraw.1

// index.html:110229 · Phạm vi: global
// PLAYER_PART_BEGIN s13.formAmmoSummary.1 EDITABLE
function formAmmoSummary(text,x,y,width,lineHeight){
 const lines=wrapLines(text||'',width);
 lines.slice(0,2).forEach((line,i)=>{
  if(i===1&&lines.length>2){
   line=line.trimEnd();while(line&&ctx.measureText(line+'…').width>width)line=line.slice(0,-1);
   line+='…';
  }
  ctx.fillText(line,x,y+i*lineHeight);
 });
}
// PLAYER_PART_END s13.formAmmoSummary.1

// index.html:110239 · Phạm vi: global
// PLAYER_PART_BEGIN s13.formSamples.1 EDITABLE
const formSamples=new Map();
// PLAYER_PART_END s13.formSamples.1

// index.html:110240 · Phạm vi: global
// PLAYER_PART_BEGIN s13.formPreviewBase.1 EDITABLE
const formPreviewBase=drawCustomMenu;
// PLAYER_PART_END s13.formPreviewBase.1

// index.html:110241 · Phạm vi: global
// PLAYER_PART_BEGIN s13.drawCustomMenu.1 EDITABLE
drawCustomMenu=function(){
 formPreviewBase();
 if(runePicker!==null||battuMa||runeXem||ammoPicker||cusNCPicker||ammoXem!==null)return;
 const form=xFormIdx();
 const bottom=currentAmmoType===CUS_DAN&&!danteOn()&&!apexOn()?363:383;
 ctx.save();ctx.beginPath();ctx.rect(330,307,340,bottom-307);ctx.clip();
 if(form===11){ironPlayerPreview(534,bottom-2);
 }else if(form===8){
  if(!previewDino.apex)previewDino.apex=apexCreate(previewDino);
  previewDino.apex.preview(478,330);
 }else{
  let sample=formSamples.get(form);
  if(!sample){
   if(form===10){sample={facingLeft:false,stage:1,drawn:false,armR:.15,armL:-.25,wing:0,dashV:0};}
   else if(form===9){sample=new DantePlayerRig(1);sample.facingLeft=false;sample.state='idle';}
   else if(form===7){sample=new MegaManXBoss(1);sample.giap='thuong';sample.laChoi=true;sample.aS='khong';sample.grounded=true;}
   else{sample=new Player(2,0,form,0,false);sample.id=0;sample.ammoType=-1;}
   formSamples.set(form,sample);
  }
  const scale=form===10?1.15:form===9?1.15:form===7?1.1:1.45;
  const height=form===10?VG_H:form===9?60:form===7?60:44;
  ctx.fillStyle='rgba(0,0,0,.24)';ctx.beginPath();ctx.ellipse(534,bottom-2,40,5,0,0,Math.PI*2);ctx.fill();
  ctx.translate(form<7?494:522,bottom-height*scale);ctx.scale(scale,scale);
  if(form===10)drawVergilBody(sample,0,0);
  else if(form===9){sample.walk=frames*.5;drawDantePlayerBody(sample,0,0);}
  else if(form===7)sample.veThan(0,0,1,{});
  else sample.drawDinoBody(0,0,form,false,false,null);
 }
 ctx.restore();
};
// PLAYER_PART_END s13.drawCustomMenu.1

// index.html:110271 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiUIBase.1 EDITABLE
const eiUIBase=drawUI;
// PLAYER_PART_END s13.eiUIBase.1

// index.html:110272 · Phạm vi: global
// PLAYER_PART_BEGIN s13.drawUI.1 EDITABLE
drawUI=function(){
 eiUIBase();
 if(!danteOn()||!dino?.dante||dino.dante.arm!==4)return;
 const p=dino.dante;
 ctx.save();if(dojoMode)ctx.translate(0,15);ctx.fillStyle='#1c1119';ctx.fillRect(15,92,275,20);ctx.fillStyle='#f3dddd';ctx.textAlign='left';ctx.font='11px Consolas';
 ctx.fillText(p.k!==null?'CHARGED SHOT: '+Math.min(100,Math.floor(p.k/45*100))+'%':p.attack?p.attack.name:'SHIFT J: STINGER · J SHIFT J: SLIDE',20,105);ctx.restore();
};
// PLAYER_PART_END s13.drawUI.1

// index.html:110279 · Phạm vi: global
// PLAYER_PART_BEGIN s13.eiHelpBase.1 EDITABLE
const eiHelpBase=drawCustomMenu;
// PLAYER_PART_END s13.eiHelpBase.1

// index.html:110280 · Phạm vi: global
// PLAYER_PART_BEGIN s13.drawCustomMenu.2 EDITABLE
drawCustomMenu=function(){
 eiHelpBase();if(!danteOn()||dino?.dante?.arm!==4)return;
 ctx.save();ctx.fillStyle='#190e14';ctx.fillRect(708,135,262,380);ctx.fillStyle='#ffd483';ctx.font='bold 12px Consolas';ctx.textAlign='left';ctx.fillText('EBONY & IVORY · Q/E',716,157);ctx.font='11px Consolas';ctx.fillStyle='#eee0df';
 apexWrap(LT('Giữ J: bắn luân phiên 2 súng\nGiữ K 0.75s: CHARGED SHOT\nGUNSLINGER — nhả K nhanh:\nĐất: TWOSOME TIME (hai phía)\nCúi: HONEYCOMB FIRE (liên thanh)\nTrên không: RAIN STORM\nStyle khác: K bắn kép\nDash J: GUN STINGER (Coyote-A)\nJ Dash J: CUT-IN SLIDE\nDash K: FIREWORKS (Coyote-A)\nK Dash: bật qua địch, quạt 60°', 'Hold J: alternating pistol fire\nHold K 0.75s: CHARGED SHOT\nGUNSLINGER — tap K:\nGround: TWOSOME TIME (both sides)\nDown: HONEYCOMB FIRE (rapid fire)\nAir: RAIN STORM\nOther styles: K twin shots\nDash J: GUN STINGER (Coyote-A)\nJ Dash J: CUT-IN SLIDE\nDash K: FIREWORKS (Coyote-A)\nK Dash: vault, 60-degree fan'),716,180,246,24);ctx.restore();
};
// PLAYER_PART_END s13.drawCustomMenu.2

// index.html:110286 · Phạm vi: global
// PLAYER_PART_BEGIN s13.danteSync.1 EDITABLE
danteSync();
// PLAYER_PART_END s13.danteSync.1
