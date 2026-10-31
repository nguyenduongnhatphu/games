// PLAYER_FILE: DanteForm
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DANTE_ATTACK_RATE, DANTE_STYLES, DT_ARMS, DT_H, DT_W, DantePlayerRig, Effect, FloatingText, LT, Player, SFX, X_N_DANG, apexWrap, camY, checkAABB, combatStance, ctx, currentAmmoType, currentForm, currentPower, danteSin, danteStyle, dashVx, dino, dojoMode, dojoUltBusy, drawCustomMenu, drawDantePlayerBody, drawDantePlayerDtOverlay, drawUI, dswCommand, dswState, eiCommand, faustCommand, floatingTexts, frames, gameOver, gameState, gameVictory, keys, paused, phuKien, playerAttackStep, sgDamage, sgTargets, startGame, ultCharge, visualEffects, xDatForm, xDongBo, xForm
// index.html:106611 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteForm.1 EDITABLE
let danteForm=false,danteLoadout=null;
// PLAYER_PART_END s12.danteForm.1

// index.html:106612 · Phạm vi: global
// PLAYER_PART_BEGIN s12.TryStatement.1 EDITABLE
try{danteForm=localStorage.getItem('dino_dante_form')==='1';}catch(e){}
// PLAYER_PART_END s12.TryStatement.1

// index.html:106614 · Phạm vi: global
// PLAYER_PART_BEGIN s12.IfStatement.1 EDITABLE
if(danteForm){xForm=false;currentForm=0;}
// PLAYER_PART_END s12.IfStatement.1

// index.html:106615 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteOn.1 EDITABLE
function danteOn(){return danteForm&&gameState!=='pvp';}
// PLAYER_PART_END s12.danteOn.1

// index.html:106616 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteActive.1 EDITABLE
function danteActive(n){return danteOn()&&['normal','boss_rush','test_boss'].includes(gameState)&&n===dino&&n.hp>0;}
// PLAYER_PART_END s12.danteActive.1

// index.html:106617 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteSync.1 EDITABLE
function danteSync(){
 if(danteOn()){
  if(!danteLoadout)danteLoadout={power:currentPower,ammo:currentAmmoType,accessory:phuKien,stance:combatStance};
  currentPower=0;currentAmmoType=0;phuKien=0;
 }else if(danteLoadout){const s=danteLoadout;currentPower=s.power;currentAmmoType=s.ammo;phuKien=s.accessory;combatStance=s.stance;danteLoadout=null;}
}
// PLAYER_PART_END s12.danteSync.1

// index.html:106623 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteFormBase.1 EDITABLE
const danteFormBase=xDatForm;
// PLAYER_PART_END s12.danteFormBase.1

// index.html:106624 · Phạm vi: global
// PLAYER_PART_BEGIN s12.xDatForm.1 EDITABLE
xDatForm=function(i){const choose=((i%X_N_DANG)+X_N_DANG)%X_N_DANG;danteForm=false;danteSync();danteFormBase(choose);if(choose===9){danteForm=true;xForm=false;currentForm=0;}danteSync();try{localStorage.setItem('dino_dante_form',danteForm?'1':'0');localStorage.setItem('dino_current_form',currentForm);}catch(e){}};
// PLAYER_PART_END s12.xDatForm.1

// index.html:106625 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteSyncBase.1 EDITABLE
const danteSyncBase=xDongBo;
// PLAYER_PART_END s12.danteSyncBase.1

// index.html:106625 · Phạm vi: global
// PLAYER_PART_BEGIN s12.xDongBo.1 EDITABLE
xDongBo=function(){danteSyncBase();danteSync();};
// PLAYER_PART_END s12.xDongBo.1

// index.html:106626 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteInit.1 EDITABLE
function danteInit(n){
 const feet=n.y+n.h;
 n.form=0;n.ammoType=0;n.maxHp=n.hp=10;n.w=DT_W;n.h=DT_H;n.y=feet-n.h;
 n.dante={body:new DantePlayerRig(1),arm:0,combo:0,lastJ:-100,cd:0,k:null,attack:null,rounds:[],fx:[],dt:0,regen:0};
 n.dante.body.state='idle';n.dante.body.facingLeft=false;ultCharge=dojoMode?100:0;
}
// PLAYER_PART_END s12.danteInit.1

// index.html:106632 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteStartBase.1 EDITABLE
const danteStartBase=startGame;
// PLAYER_PART_END s12.danteStartBase.1

// index.html:106633 · Phạm vi: global
// PLAYER_PART_BEGIN s12.startGame.1 EDITABLE
startGame=function(mode){if(mode==='pvp'&&danteForm)xDatForm(0);danteSync();danteStartBase(mode);if(danteOn())danteInit(dino);};
// PLAYER_PART_END s12.startGame.1

// index.html:106634 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteLabel.1 EDITABLE
function danteLabel(s){floatingTexts.push(new FloatingText(dino.x-25,dino.y-32,s));}
// PLAYER_PART_END s12.danteLabel.1

// index.html:106635 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteKey.1 EDITABLE
function danteKey(code,repeat){
 if(!danteActive(dino)||!dino.dante||!['KeyJ','KeyK','KeyQ','KeyE','KeyI','KeyO','KeyU','KeyR'].includes(code))return false;
 keys[code]=true;if(paused||gameOver||gameVictory||repeat)return true;
 const p=dino.dante;
 if(code==='KeyJ')danteAttack(false,0);
 if(code==='KeyK'&&p.k===null&&!p.attack)p.k=0;
 if(code==='KeyQ'||code==='KeyE'){if(!p.attack&&p.k===null){p.arm=(p.arm+(code==='KeyE'?1:5))%6;p.combo=0;danteLabel(DT_ARMS[p.arm].n);}}
 if(code==='KeyI'||code==='KeyO'){if(!p.attack&&p.k===null){combatStance=(combatStance+(code==='KeyO'?1:2))%3;danteLabel(['GUNSLINGER','TRICKSTER','ROYAL GUARD'][combatStance]);}}
 if(code==='KeyU'&&!p.dt&&!p.attack&&ultCharge>=100){p.k=null;p.dt=600;p.regen=0;ultCharge=0;danteLabel('DEVIL TRIGGER!');visualEffects.push(new Effect(dino.x+dino.w/2,dino.y+dino.h/2,'explosion',true,65));}
 return true;
}
// PLAYER_PART_END s12.danteKey.1

// index.html:106646 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteRelease.1 EDITABLE
function danteRelease(){if(!danteActive(dino)||!dino.dante)return;const p=dino.dante;if(p.k!==null){const charge=p.k;p.k=null;danteAttack(true,charge);}}
// PLAYER_PART_END s12.danteRelease.1

// index.html:106647 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteAttack.1 EDITABLE
function danteAttack(special,charge){
 if(dino.dante&&dino.dante.arm===0){dswCommand({key:special?'K':'J',charge,down:!!(keys.KeyS||keys.ArrowDown),air:!dino.grounded,dash:frames-dswState(dino.dante).lastDash<=24});return;}
 if(dino.dante&&dino.dante.arm===4){eiCommand(special,charge);return;}
 if(dino.dante&&dino.dante.arm===5){faustCommand(special,charge);return;}
 const n=dino,p=n.dante;if(!p||p.cd>0||p.attack||n.isShielding()||n.hp<=0)return;
 const arm=p.arm,dir=n.isFacingLeft?-1:1,air=!n.grounded,down=keys.KeyS||keys.ArrowDown,dash=Math.abs(dashVx)>1;
 if(frames-p.lastJ>40)p.combo=0;const combo=p.combo++%3;p.lastJ=frames;
 const full=charge>=60,bonus=p.dt?2:0;
 let name='',reach=90,dmg=4,wind=5,duration=18,pulses=1,interval=6,kind='slash',lift=false;
 if(!special){
  if(arm===0){name=air?'AERIAL RAVE':dash?'STINGER':down?'HIGH TIME':['COMBO I','COMBO II','COMBO III'][combo];dmg=dash?7:combo===2?7:4;reach=dash?135:100;lift=!!down;}
  if(arm===1){name='BALROG';dmg=combo===2?6:3;reach=65;duration=13;wind=3;kind='fist';}
  if(arm===2){name='CAVALIERE';dmg=2;reach=105;duration=30;pulses=4;kind='wheel';}
  if(arm===3){name='CERBERUS';dmg=4;reach=120;duration=20;kind='ice';}
  if(arm===4){name='EBONY & IVORY';dmg=2;wind=0;duration=8;kind='gun';}
 }else{
  if(arm===0){name=air?'HELM BREAKER':full?'OVERDRIVE':'DRIVE';dmg=full?16:8;reach=145;duration=30;kind=air?'slam':'drive';}
  if(arm===1){name='REAL IMPACT';dmg=full?20:10;reach=80;wind=10;duration=34;lift=true;kind='fist';}
  if(arm===2){name='FULL THROTTLE';dmg=3;reach=110;duration=44;pulses=6;kind='wheel';}
  if(arm===3){name=full?'HOT STUFF':'REVOLVER';dmg=full?6:3;reach=full?155:125;duration=38;pulses=4;kind=full?'fire':'ice';}
  if(arm===4){name=full?'CHARGED SHOT':'COYOTE-A';dmg=full?6:3;wind=3;duration=28;kind='shotgun';}
 }
 if(name==='STINGER'||name==='FULL THROTTLE')dashVx=dir*(name==='STINGER'?14:18);
 p.attack={name,arm,dir,reach,dmg:dmg+bonus,wind,duration,pulses,interval,kind,lift,age:0,hit:new Set(),special,full};p.cd=duration;
 if(special)danteLabel(name);
}
// PLAYER_PART_END s12.danteAttack.1

// index.html:106673 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteHit.1 EDITABLE
function danteHit(p,o,damage,arm=p.damageArm??p.arm){const scale=arm===1?.8:arm===2?.75:arm===3?.8:arm===5?.8:1;const dealt=sgDamage(dino,o,damage*scale,'dante');if(dealt>0&&!o._beamClashPoint&&!p.dt&&!p.sinTime&&!p.judgement)ultCharge=Math.min(100,ultCharge+dealt*.7);return dealt;}
// PLAYER_PART_END s12.danteHit.1

// index.html:106674 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dantePulse.1 EDITABLE
function dantePulse(n,p,a){
 const cx=n.x+n.w/2,cy=n.y+n.h/2;
 function round(x,y,vx,vy,r,kind,damage,life=65){p.rounds.push({arm:a.arm,x,y,vx,vy,r,kind,damage,life,age:0,hit:new Set(),dir:a.dir});}
 if(a.kind==='gun'||a.kind==='shotgun'){
  const count=a.kind==='gun'?1:5;
  for(let i=0;i<count;i++){const angle=(i-(count-1)/2)*.13;round(cx+a.dir*20,cy-10,Math.cos(angle)*a.dir*15,Math.sin(angle)*15,a.kind==='gun'?3:5,'bullet',a.dmg,a.kind==='gun'?55:24);}
 }else if(a.kind==='drive')round(cx,cy,a.dir*10,0,24,'drive',a.dmg,55);
 else if(a.kind==='hat')round(cx,cy,a.dir*9,0,17,'hat',a.dmg,65);
 else if(a.kind==='meteor'){
  const targets=sgTargets(n),t=targets.filter(o=>(o.x-cx)*a.dir>=-20).sort((a,b)=>Math.abs(a.x-cx)-Math.abs(b.x-cx))[0];
  round(t?t.x+t.w/2:cx+a.dir*140,Math.max((typeof camY==='number'?camY:0)-25,n.y-200),0,11,a.full?24:16,'meteor',a.dmg,100);
 }else{
  const box={x:a.dir<0?n.x-a.reach:n.x+n.w-8,y:n.y-(a.lift?50:10),w:a.reach+8,h:n.h+(a.lift?65:20)};
  if(a.kind==='ice'||a.kind==='fire'){box.x=cx-a.reach;box.w=a.reach*2;box.y=cy-a.reach;box.h=a.reach*2;}
  for(const o of sgTargets(n))if(checkAABB(box,o)){if(danteHit(p,o,a.dmg)>0&&a.lift&&Number.isFinite(o.dy))o.dy=-8;}
  p.fx.push({x:cx,y:cy,dir:a.dir,r:a.reach,kind:a.kind,t:12,max:12,col:DT_ARMS[a.arm].c});
 }
 if(SFX.tone)SFX.tone(a.kind==='gun'?700:220,.04,'triangle',.05,100);
}
// PLAYER_PART_END s12.dantePulse.1

// index.html:106693 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteTick.1 EDITABLE
function danteTick(){
 if(!danteActive(dino))return;
 if(!dino.dante)danteInit(dino);
 const n=dino,p=n.dante;if(p.cd>0)p.cd--;
 if(p.k!==null){if(keys.KeyK)p.k=Math.min(120,p.k+1);else danteRelease();}
 if(p.arm!==0&&p.arm!==1&&p.arm!==2&&p.arm!==3&&p.arm!==5&&keys.KeyJ&&!keys.KeyK&&!p.attack&&p.cd<=0)danteAttack(false,0);
 if(p.dt>0){p.dt--;ultCharge=0;if(++p.regen>=120){p.regen=0;n.hp=Math.min(n.maxHp,n.hp+1);}}
 if(p.attack&&!p.attack.sword&&!p.attack.balrog&&!p.attack.cavaliere&&!p.attack.cerberus&&!p.attack.ebony&&!p.attack.faust&&!p.attack.royal&&playerAttackStep(p.attack,DANTE_ATTACK_RATE)){const a=p.attack;a.age++;
  if(a.kind==='slam'&&!n.grounded){a.age=Math.min(a.age,a.wind);n.dy=Math.max(n.dy,9);}
  if(a.age>=a.wind+1&&(a.age-a.wind-1)%a.interval===0&&a.pulses>0){dantePulse(n,p,a);a.pulses--;}
  if(a.kind==='slam'&&!n.grounded)n.dy=Math.max(n.dy,9);
  if(a.age>=a.duration)p.attack=null;
 }
 for(const q of p.rounds){
  q.age++;q.life--;const oldX=q.x,oldY=q.y;
  if(q.kind==='hat'&&q.age>25){const angle=Math.atan2(n.y+n.h/2-q.y,n.x+n.w/2-q.x);q.vx=Math.cos(angle)*12;q.vy=Math.sin(angle)*12;if(Math.hypot(n.x+n.w/2-q.x,n.y+n.h/2-q.y)<18)q.life=0;}
  q.x+=q.vx;q.y+=q.vy;
  const box={x:Math.min(oldX,q.x)-q.r,y:Math.min(oldY,q.y)-q.r,w:Math.abs(q.x-oldX)+q.r*2,h:Math.abs(q.y-oldY)+q.r*2};
  for(const o of sgTargets(n)){const id=o.__goc||o;if(!q.hit.has(id)&&checkAABB(box,o)){q.hit.add(id);danteHit(p,o,q.damage,q.arm??4);if(q.kind==='bullet'||q.kind==='meteor'){q.life=0;break;}}}
  if(q.kind==='meteor'&&q.life===0)p.fx.push({x:q.x,y:q.y,dir:1,r:50,kind:'fire',t:12,max:12,col:'#ff5533'});
 }
 p.rounds=p.rounds.filter(q=>q.life>0);p.fx=p.fx.filter(f=>--f.t>0);
 const b=p.body;b.x=n.x;b.y=n.y;b.w=n.w;b.h=n.h;b.arms=p.arm;b.facingLeft=n.isFacingLeft;b.grounded=n.grounded;b.walk+=Math.abs(n.x-(p.lastX??n.x));p.lastX=n.x;b.dashV=dashVx;b.drawn=!!p.attack;b.dtStage=p.dt?2:1;
 b.armR=p.attack?Math.sin(p.attack.age/p.attack.duration*Math.PI*2)*1.4-.6:0;b.armL=p.arm===4&&p.attack?-1.3:0;
}
// PLAYER_PART_END s12.danteTick.1

// index.html:106718 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteDraw.1 EDITABLE
function danteDraw(n){const p=n.dante;if(!p)return;const b=p.body;ctx.save();if(n.invincible&&frames%6<3)ctx.globalAlpha=.5;ctx.translate(n.x,n.y);ctx.scale(n.w/DT_W,n.h/DT_H);drawDantePlayerBody(b,0,0);if(p.dt)drawDantePlayerDtOverlay(b,0,0);ctx.restore();
 for(const q of p.rounds){ctx.save();ctx.translate(q.x,q.y);ctx.rotate(q.kind==='hat'?q.age*.35:Math.atan2(q.vy,q.vx));ctx.fillStyle=q.color||(q.kind==='bullet'?'#ffe6a0':q.kind==='ei-charge'?'#a4dfff':'#ff5264');ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=12;ctx.beginPath();ctx.ellipse(0,0,q.r,q.kind==='hat'?6:q.r,0,0,Math.PI*2);ctx.fill();if(q.kind==='drive'){ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(-10,0,25,-1.2,1.2);ctx.stroke();}ctx.restore();}
 for(const f of p.fx){ctx.save();ctx.translate(f.x,f.y);ctx.scale(f.dir,1);ctx.globalAlpha=f.t/f.max;ctx.strokeStyle=f.col;ctx.shadowColor=f.col;ctx.shadowBlur=14;ctx.lineWidth=6;ctx.beginPath();if(['ice','fire','wheel'].includes(f.kind))ctx.arc(0,0,f.r*(1-f.t/f.max*.25),0,Math.PI*2);else ctx.ellipse(0,0,f.r,f.r*.65,-.6,-1.3,1.2);ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();ctx.restore();}
 if(p.k!==null){const chargeMax=p.arm===5?((keys.KeyS||keys.ArrowDown)?90:60):45;ctx.save();ctx.strokeStyle=p.k>=chargeMax?'#fff1b0':'#ff5566';ctx.lineWidth=3;ctx.beginPath();ctx.arc(n.x+n.w/2,n.y+n.h/2,25,0,Math.PI*2*Math.min(1,p.k/chargeMax));ctx.stroke();ctx.restore();}
 if(n.isShielding()){ctx.save();ctx.strokeStyle=combatStance===2?'#ffb341':'#79dfff';ctx.fillStyle='rgba(100,180,255,.12)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(n.x+n.w/2,n.y+n.h/2,n.w*.9,n.h*.65,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore();}
}
// PLAYER_PART_END s12.danteDraw.1

// index.html:106724 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteDrawBase.1 EDITABLE
const danteDrawBase=Player.prototype.draw;
// PLAYER_PART_END s12.danteDrawBase.1

// index.html:106724 · Phạm vi: global
// PLAYER_PART_BEGIN s12.Player.prototype.draw.1 EDITABLE
Player.prototype.draw=function(...args){if(danteOn()&&this===dino&&this.dante){danteDraw(this);return;}return danteDrawBase.apply(this,args);};
// PLAYER_PART_END s12.Player.prototype.draw.1

// index.html:106725 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteDamageBase.1 EDITABLE
const danteDamageBase=Player.prototype.takeDamage;
// PLAYER_PART_END s12.danteDamageBase.1

// index.html:106725 · Phạm vi: global
// PLAYER_PART_BEGIN s12.Player.prototype.takeDamage.1 EDITABLE
Player.prototype.takeDamage=function(...args){const before=this.hp,result=danteDamageBase.apply(this,args);if(this.dante&&this.hp<before){this.dante.k=null;this.dante.attack=null;this.dante.cd=Math.max(12,this.dante.cd);}return result;};
// PLAYER_PART_END s12.Player.prototype.takeDamage.1

// index.html:106726 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteBusyBase.1 EDITABLE
const danteBusyBase=dojoUltBusy;
// PLAYER_PART_END s12.danteBusyBase.1

// index.html:106726 · Phạm vi: global
// PLAYER_PART_BEGIN s12.dojoUltBusy.1 EDITABLE
dojoUltBusy=function(n){return !!(n&&n.dante&&n.dante.dt>0)||danteBusyBase(n);};
// PLAYER_PART_END s12.dojoUltBusy.1

// index.html:106727 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteMenuBase.1 EDITABLE
const danteMenuBase=drawCustomMenu;
// PLAYER_PART_END s12.danteMenuBase.1

// index.html:106728 · Phạm vi: global
// PLAYER_PART_BEGIN s12.drawCustomMenu.1 EDITABLE
drawCustomMenu=function(){danteMenuBase();if(!danteOn())return;ctx.save();ctx.fillStyle='#190e14';ctx.fillRect(24,76,276,452);ctx.fillRect(702,80,272,436);ctx.textAlign='left';ctx.fillStyle='#ff6878';ctx.font='bold 22px Consolas';ctx.fillText('DANTE · 10 HP',38,108);ctx.fillText('DEVIL HUNTER',716,111);ctx.font='12px Consolas';ctx.fillStyle='#eee0df';apexWrap(LT('POWER / RUNE / PHỤ KIỆN: KHÓA\n\nJ: combo · Kiếm: bấm nối nhịp\nK: Drive / giữ K: Overdrive\nCúi K: Round Trip (ném kiếm)\nQ / E: đổi 6 vũ khí\nI / O: Gunslinger / Trickster / RG\nL: khiên · Shift: lướt\nSpace / W: nhảy đôi\nU: Devil Trigger 10 giây\n\nDT: mỗi hit +2 sát thương,\nhồi 1 HP mỗi 2 giây.','POWER / RUNES / ACCESSORIES: LOCKED\n\nJ: combo · Sword: tap to chain\nK: Drive / hold K: Overdrive\nDown K: Round Trip (throw sword)\nQ / E: cycle six weapons\nI / O: Gunslinger / Trickster / RG\nL: shield · Shift: dash\nSpace / W: double jump\nU: Devil Trigger for 10 seconds\n\nDT: +2 damage per hit,\nheal 1 HP every 2 seconds.'),38,145,246,19);apexWrap(LT('KIẾM DEVIL SWORD DANTE\nJJJ: xuống → lên → xoay ngang\nJKKK: xoay 2 → đâm → đâm mạnh\nJJ KKK: kiếm ném → Fly Dragon\nJ → Nhảy: HIGH TIME\nTrên không JJJJ: 3 chém → bổ\nTrên không K: HELM BREAKER\nDash J: STINGER\nJ Dash: MILLION STAB\nThêm J ×4: 6 / 8 / 10 / 12 / 14\nCúi J: PROP → J ×3 SHREDDER\nK: DRIVE (3 dmg)\nGiữ K 0.75s: OVERDRIVE (3×3)\nCúi K: ROUND TRIP (1 dmg / 15f)\nDash → K liên tục: DANCE MACABRE\nChém thường 3 · đòn mạnh 5\nMillion Stab: 1 dmg mỗi nhát', 'DEVIL SWORD DANTE\nJJJ: down → up → spin\nJKKK: double spin → stabs → thrust\nJJ KKK: Round Trip → Fly Dragon\nJ → Jump: HIGH TIME\nAir JJJJ: 3 slashes → slam\nAir K: HELM BREAKER\nDash J: STINGER\nJ Dash: MILLION STAB\nExtra J ×4: 6 / 8 / 10 / 12 / 14\nDown J: PROP → J ×3 SHREDDER\nK: DRIVE (3 dmg)\nHold K 0.75s: OVERDRIVE (3×3)\nDown K: ROUND TRIP (1 dmg / 15f)\nDash → repeat K: DANCE MACABRE\nNormal slash 3 · heavy 5\nMillion Stab: 1 damage per stab'),716,145,248,20);ctx.restore();};
// PLAYER_PART_END s12.drawCustomMenu.1

// index.html:106729 · Phạm vi: global
// PLAYER_PART_BEGIN s12.danteUIBase.1 EDITABLE
const danteUIBase=drawUI;
// PLAYER_PART_END s12.danteUIBase.1

// index.html:106729 · Phạm vi: global
// PLAYER_PART_BEGIN s12.drawUI.1 EDITABLE
drawUI=function(){danteUIBase();if(!danteOn()||!dino||!dino.dante)return;const p=dino.dante;ctx.save();if(dojoMode)ctx.translate(0,15);ctx.fillStyle='#1c1119';ctx.fillRect(10,45,282,144);ctx.textAlign='left';ctx.font='bold 13px Consolas';ctx.fillStyle=DT_ARMS[p.arm].c;ctx.fillText('DANTE · '+DT_ARMS[p.arm].n,20,65);ctx.font='11px Consolas';ctx.fillStyle='#f3dddd';ctx.fillText('Q/E: WEAPON · I/O: '+DANTE_STYLES[danteStyle(p)],20,85);ctx.fillText(p.k!==null?'OVERDRIVE CHARGE: '+Math.min(100,Math.floor(p.k/45*100))+'%':p.attack?p.attack.name:'J: COMBO · K: DRIVE · S+K: ROUND TRIP',20,105);ctx.fillStyle='#55313b';ctx.fillRect(20,133,250,8);ctx.fillStyle='#ff5166';ctx.fillRect(20,133,250*(p.dt?p.dt/600:Math.min(100,ultCharge)/100),8);ctx.fillStyle='#fff';ctx.fillText(p.dt?'DEVIL TRIGGER '+(p.dt/60).toFixed(1)+'s':'U: DEVIL TRIGGER '+Math.floor(ultCharge)+'%',20,125);ctx.fillText('HP '+Math.ceil(dino.hp)+' / '+dino.maxHp+' · '+LT('KHIÊN ','SHIELD ')+(dino.shieldCd>0?(dino.shieldCd/60).toFixed(1)+'s':LT('SẴN SÀNG','READY')),20,163);if(!danteSin(p)){ctx.font='10px Consolas';ctx.fillText(p.sword?.round?'ROUND TRIP: ACTIVE · Q/E: WEAPON':'DSD · JJ KKK: ROUND TRIP > FLY DRAGON',20,180);}ctx.restore();};
// PLAYER_PART_END s12.drawUI.1
