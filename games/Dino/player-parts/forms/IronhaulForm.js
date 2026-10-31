// PLAYER_FILE: IronhaulForm
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: FloatingText, IronhaulBoss, Player, SFX, X_N_DANG, ammoPicker, ammoXem, apexWrap, battuMa, bosses, checkAABB, coBuc, combatStance, ctx, currentAmmoType, currentPower, cusNCPicker, danteKey, danteTick, dashCd, dashVx, dino, dkNenY, doDash, dojoMode, dojoUltBusy, drawCustomMenu, drawUI, floatingTexts, formAmmoSummary, frames, gameOver, gameState, gameVictory, ironhaulCoreFx, ironhaulEase, ironhaulMix, ironhaulPolygon, ironhaulRig, ironhaulRobot, ironhaulTruck, ironhaulWeapons, keys, mapTheme, paused, phuKien, platforms, resolveSolidPillars, resolveTetrisWalls, runePicker, runeSlots, runeXem, sgDamage, sgSegmentBox, sgTargets, shakeTimer, shinGuardReset, startGame, ultCharge, worldL, worldR, xDatForm, xDongBo, xFormIdx, xFormOn
// index.html:115482 · Phạm vi: global
// PLAYER_PART_BEGIN s22.IRON_FORM.1 EDITABLE
const IRON_FORM=11,IRON_MODES=['GUNBLADE','SILVER AEGIS','TRUCK'];
// PLAYER_PART_END s22.IRON_FORM.1

// index.html:115483 · Phạm vi: global
// PLAYER_PART_BEGIN s22.IRON_PLAYER_MOVES.1 EDITABLE
const IRON_PLAYER_MOVES={
    cut:{name:'GUNBLADE · CHÉM XUỐNG',T:28,state:'ih_combo',offset:18,sword:[[8,'cut',140,14,3]]},
    rise:{name:'GUNBLADE · CHÉM LÊN',T:28,state:'ih_combo',offset:46,sword:[[8,'rise',140,14,3]]},
    thrust:{name:'GUNBLADE · ĐÂM KẾT',T:38,state:'ih_combo',offset:74,sword:[[12,'thrust',165,16,5]],finish:true},
    upper:{name:'BOOSTER · CHÉM HẤT',T:34,state:'ih_upper',offset:18,sword:[[12,'rise',150,16,4]],finish:true},
    advance:{name:'BOOSTER RUSH · CHÉM → ĐÂM',T:66,state:'ih_advance',offset:22,sword:[[22,'cut',165,16,4],[46,'thrust',170,16,5]],step:[5,18,4.5]},
    cleaver:{name:'ĐẠI KIẾM HAI TAY',T:70,state:'ih_cleaver',offset:10,sword:[[24,'cut',175,18,5],[48,'thrust',175,16,5]]},
    gun:{name:'TAM LIÊN XUNG',T:32,state:'ih_barrage',offset:22,shots:[8,15,22],round:'bullet'},
    cannon:{name:'TRỌNG PHÁO',T:58,state:'ih_barrage',offset:8,shots:[24],round:'shell',power:8},
    barrage:{name:'PHÁO TAM LIÊN',T:68,state:'ih_barrage',offset:8,shots:[24,34,44],round:'shell',power:3},
    air:{name:'KHÔNG KÍCH',T:32,state:'ih_upper',offset:42,sword:[[12,'cut',150,16,4]]},
    silvercut:{name:'AEGIS · KIẾM',T:28,state:'ih_silvercombo',offset:16,sword:[[8,'cut',150,14,3]]},
    spin:{name:'AEGIS · XOAY KHIÊN',T:36,state:'ih_silvercombo',offset:40,shield:[[10,'spin',24,3]]},
    silverfinish:{name:'AEGIS · CHÉM KẾT',T:38,state:'ih_silvercombo',offset:79,sword:[[12,'rise',170,18,5]],finish:true},
    throw:{name:'PHI KHIÊN · THU HỒI',T:40,state:'ih_aegis',offset:18,shots:[12],round:'shield'},
    bash:{name:'KHIÊN · PHÁ THẾ',T:38,state:'ih_riposte',offset:14,shield:[[14,'bash',20,5]],finish:true},
    shieldrush:{name:'KHIÊN TIÊN PHONG',T:58,state:'ih_shieldrush',offset:15,shield:[[14,'bash',20,3]],sword:[[38,'cut',165,16,5]],step:[5,19,4],finish:true},
    reversal:{name:'XOAY KHIÊN → ĐÂM',T:66,state:'ih_reversal',offset:15,shield:[[14,'spin',26,3]],sword:[[44,'thrust',175,16,6]],finish:true},
    riposte:{name:'PARRY · PHẢN KÍCH',T:58,state:'ih_riposte',offset:8,shield:[[20,'bash',18,3]],sword:[[38,'cut',170,16,5]],finish:true},
    gatling:{name:'GIÁ SÚNG MÁY',T:16,state:'ih_gatling',offset:22,shots:[4],round:'bullet'},
    truckcannon:{name:'PHÁO THIẾT XA',T:48,state:'ih_cannon',offset:18,shots:[20],round:'shell',power:5},
    ram:{name:'THIẾT XA · TÔNG',T:36,state:'ih_ram',offset:0,step:[4,24,6],ram:true,finish:true},
    charge:{name:'LÕI NĂNG LƯỢNG → KIẾM',T:92,state:'ih_overcharge',offset:0},
    cross:{name:'GUNBLADE · SONG TRẢM',T:48,state:'ih_combo',offset:0,sword:[[10,'cut',150,14,2],[30,'rise',155,14,2]]},
    execution:{name:'GUNBLADE · ĐẠI TRẢM KẾT',T:52,state:'ih_cleaver',offset:10,sword:[[24,'cut',185,20,7]],finish:true},
    recoil:{name:'J → DASH · RECOIL SLASH',T:58,state:'ih_gunblade',offset:14,sword:[[32,'cut',165,16,4]],shots:[16,23],round:'bullet',power:2,step:[2,12,-3],followJ:'pursuit',link:18},
    pursuit:{name:'RECOIL → J · BOOSTER PURSUIT',T:66,state:'ih_flank',offset:40,sword:[[22,'rise',165,16,4],[46,'cut',185,17,6]],step:[5,20,4],finish:true},
    rail:{name:'DASH → K · BREACH CANNON',T:58,state:'ih_gunblade',offset:14,shots:[22,34],round:'rail',power:4},
    gunvault:{name:'K → DASH · GUN VAULT',T:62,state:'ih_gunblade',offset:10,shots:[20,30,40],round:'bullet',power:2,jump:[8,-7],step:[2,12,-2.5],followK:'rail',link:24},
    skyripper:{name:'J → JUMP · SKY RIPPER',T:74,state:'ih_upper',offset:0,sword:[[14,'rise',155,18,4],[38,'cut',165,16,3],[56,'rise',170,14,5]],airSlow:42,finish:true},
    gunrain:{name:'K → JUMP · AERIAL BARRAGE',T:64,state:'ih_barrage',offset:10,shots:[18,28,38,48],round:'bullet',power:2,airSlow:40},
    aircross:{name:'AERIAL · CROSS RAVE',T:46,state:'ih_upper',offset:0,sword:[[10,'cut',150,14,3],[28,'rise',155,14,4]]},
    plunge:{name:'CÚI K · METEOR CLEAVER',T:72,state:'ih_skyfall',offset:0,sword:[[30,'cut',180,20,6]],plunge:true,finish:true},
    broadside:{name:'K → DASH · MOBILE BROADSIDE',T:62,state:'ih_cannon',offset:10,shots:[18,30,42],round:'shell',power:3,step:[4,22,3]},
    silverbloom:{name:'AEGIS · SONG KHIÊN TRẢM',T:52,state:'ih_silvercombo',offset:0,shield:[[10,'spin',32,4]],sword:[[30,'rise',185,18,5]]},
    silvercross:{name:'AEGIS · CROSS REQUIEM',T:56,state:'ih_cross',offset:46,sword:[[18,'rise',190,16,5],[38,'cut',200,16,6]],waves:[26,46]},
    sovereign:{name:'SOVEREIGN ARRAY · BÃO KIẾM KHÍ',T:98,state:'ih_reversal',offset:0,shield:[[18,'spin',28,4]],sword:[[48,'thrust',210,18,6],[74,'cut',210,18,7]],waves:[30,56,82],fan:true,finish:true},
    aegislance:{name:'DASH → J · AEGIS METEOR LANCE',T:76,state:'ih_shieldrush',offset:0,shield:[[14,'bash',20,5]],sword:[[38,'thrust',220,16,7],[58,'rise',210,14,6]],step:[5,23,4.8],waves:[47],finish:true},
    aegisorbit:{name:'J → DASH · AEGIS ORBIT',T:68,state:'ih_reversal',offset:0,shield:[[12,'spin',30,5]],sword:[[44,'thrust',200,18,6]],step:[2,13,-3],followJ:'aegislance',link:22},
    aegiswheel:{name:'DASH → K · TWIN AEGIS WHEELS',T:66,state:'ih_aegis',offset:12,shots:[18,32],round:'shield',power:5,dual:true},
    aegisvault:{name:'K → DASH · AEGIS REVERSAL',T:78,state:'ih_reversal',offset:0,shield:[[16,'spin',28,5]],sword:[[54,'cut',210,18,7]],jump:[8,-7],waves:[44],followK:'aegiswheel',link:26},
    ascension:{name:'J → JUMP · AEGIS ASCENSION',T:86,state:'ih_upper',offset:0,sword:[[14,'rise',195,18,5],[40,'cut',210,18,6],[66,'thrust',220,16,7]],airSlow:52,waves:[54,74],finish:true},
    starfall:{name:'K → JUMP · AEGIS STARFALL',T:88,state:'ih_upper',offset:0,sword:[[22,'cut',205,18,6]],shield:[[48,'spin',28,5]],airSlow:56,waves:[36,56,76],fan:true},
    nova:{name:'CORE ASCENSION · PHÁ LÕI',T:74,state:'ih_overcharge',offset:0,shield:[[30,'spin',28,5]],nova:[36,14,105],waves:[44,60],fan:true},
    ultimate:{name:'AEGIS BREAKER · FINAL DISCHARGE',T:154,state:'ih_reversal',offset:0,shield:[[26,'spin',28,4]],sword:[[66,'rise',205,18,5],[96,'cut',220,18,6]],ultimate:true}
};
// PLAYER_PART_END s22.IRON_PLAYER_MOVES.1

// index.html:115529 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironForm.1 EDITABLE
let ironForm=false,ironLoadout=null;
// PLAYER_PART_END s22.ironForm.1

// index.html:115530 · Phạm vi: global
// PLAYER_PART_BEGIN s22.TryStatement.1 EDITABLE
try{ironForm=localStorage.getItem('dino_ironhaul_form')==='1';}catch(e){}
// PLAYER_PART_END s22.TryStatement.1

// index.html:115531 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironOn.1 EDITABLE
function ironOn(){return ironForm&&gameState!=='pvp';}
// PLAYER_PART_END s22.ironOn.1

// index.html:115532 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironActive.1 EDITABLE
function ironActive(n=dino){return ironOn()&&n===dino&&n.hp>0&&['normal','boss_rush','test_boss'].includes(gameState);}
// PLAYER_PART_END s22.ironActive.1

// index.html:115533 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSync.1 EDITABLE
function ironSync(){
    if(ironOn()){
        if(!ironLoadout)ironLoadout={power:currentPower,ammo:currentAmmoType,accessory:phuKien,stance:combatStance,runes:runeSlots.slice()};
        currentPower=0;currentAmmoType=0;phuKien=0;combatStance=0;runeSlots=[null,null];
    }else if(ironLoadout){const s=ironLoadout;currentPower=s.power;currentAmmoType=s.ammo;phuKien=s.accessory;combatStance=s.stance;runeSlots=s.runes.slice();ironLoadout=null;}
}
// PLAYER_PART_END s22.ironSync.1

// index.html:115539 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSetBase.1 EDITABLE
const ironSetBase=xDatForm;
// PLAYER_PART_END s22.ironSetBase.1

// index.html:115540 · Phạm vi: global
// PLAYER_PART_BEGIN s22.xDatForm.1 EDITABLE
xDatForm=function(i){const next=((i%X_N_DANG)+X_N_DANG)%X_N_DANG;ironForm=false;ironSync();ironSetBase(next===IRON_FORM?0:next);ironForm=next===IRON_FORM;ironSync();try{localStorage.setItem('dino_ironhaul_form',ironForm?'1':'0');}catch(e){}};
// PLAYER_PART_END s22.xDatForm.1

// index.html:115541 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironIdxBase.1 EDITABLE
const ironIdxBase=xFormIdx,ironOnBase=xFormOn,ironSyncBase=xDongBo;
// PLAYER_PART_END s22.ironIdxBase.1

// index.html:115542 · Phạm vi: global
// PLAYER_PART_BEGIN s22.xFormIdx.1 EDITABLE
xFormIdx=function(){return ironForm?IRON_FORM:ironIdxBase();};
// PLAYER_PART_END s22.xFormIdx.1

// index.html:115543 · Phạm vi: global
// PLAYER_PART_BEGIN s22.xFormOn.1 EDITABLE
xFormOn=function(){return ironForm||ironOnBase();};
// PLAYER_PART_END s22.xFormOn.1

// index.html:115544 · Phạm vi: global
// PLAYER_PART_BEGIN s22.xDongBo.1 EDITABLE
xDongBo=function(){ironSyncBase();ironSync();};
// PLAYER_PART_END s22.xDongBo.1

// index.html:115545 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironInit.1 EDITABLE
function ironInit(n){
    const feet=n.y+n.h;n.form=0;n.ammoType=0;n.maxHp=n.hp=10;n.w=40;n.h=68;n.y=feet-68;
    n.ironhaul={mode:0,attack:null,queue:null,k:null,combo:0,airCombo:0,ended:-1000,core:0,coreReady:0,guardUntil:-100,perfectUntil:-100,guardReady:0,counter:0,lastDash:-1000,lastJ:-1000,lastK:-1000,silver:0,silverMax:720,silverReturn:0,silverFinishing:false,novaReady:0,rounds:[],fx:[],trails:[],ghosts:[],shieldOut:0,transition:0,lastX:n.x,gait:0};
    ultCharge=dojoMode?100:0;
}
// PLAYER_PART_END s22.ironInit.1

// index.html:115550 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironStartBase.1 EDITABLE
const ironStartBase=startGame;
// PLAYER_PART_END s22.ironStartBase.1

// index.html:115551 · Phạm vi: global
// PLAYER_PART_BEGIN s22.startGame.1 EDITABLE
startGame=function(mode){if(mode==='pvp'&&ironForm)xDatForm(0);ironSync();ironStartBase(mode);if(ironOn())ironInit(dino);};
// PLAYER_PART_END s22.startGame.1

// index.html:115552 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironMode.1 EDITABLE
function ironMode(n,mode){
    const p=n.ironhaul;if(!p)return;const cx=n.x+n.w/2,feet=n.y+n.h;
    ironCapture(n,12);let next=((mode%3)+3)%3;if(next===1&&!p.silver&&!p.silverFinishing)next=0;
    p.mode=next;p.attack=null;p.queue=null;p.k=null;p.combo=p.airCombo=0;p.counter=0;p.guardUntil=p.perfectUntil=-100;p.transition=18;p.pendingJump=null;
    n.w=p.mode===2?86:40;n.h=p.mode===2?34:68;n.x=Math.max(worldL(),Math.min(worldR()-n.w,cx-n.w/2));n.y=feet-n.h;n.isCrouching=false;
}
// PLAYER_PART_END s22.ironMode.1

// index.html:115558 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironWhite.1 EDITABLE
function ironWhite(p){return p.mode===1&&(p.silver>0||p.silverFinishing);}
// PLAYER_PART_END s22.ironWhite.1

// index.html:115559 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironCapture.1 EDITABLE
function ironCapture(n,duration=12){
    const p=n.ironhaul;if(!p)return;const b=ironBody(n),t=ironhaulRig(b).targets;
    const targets={...t,swordTarget:{...t.swordTarget},offTarget:{...t.offTarget}};
    if(b.playerCrouch){targets.swordTarget.y-=36;targets.offTarget.y-=36;}
    p.follow={at:frames,targets,duration};
}
// PLAYER_PART_END s22.ironCapture.1

// index.html:115565 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironCancel.1 EDITABLE
function ironCancel(n=dino){const p=n.ironhaul;if(!p)return;ironCapture(n);p.attack=null;p.queue=null;p.k=null;p.pendingJump=null;}
// PLAYER_PART_END s22.ironCancel.1

// index.html:115566 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSilverStart.1 EDITABLE
function ironSilverStart(n=dino){
    const p=n.ironhaul;if(!p||ironWhite(p)||ultCharge<100)return false;
    p.silverReturn=p.mode===2?2:0;p.silver=p.silverMax;p.silverFinishing=false;p.novaReady=0;ultCharge=0;
    ironMode(n,1);n.invincible=true;n.invTimer=Math.max(n.invTimer,24);p.fx.push({x:n.x+n.w/2,y:n.y+n.h/2,r:90,t:24,max:24});ironLabel('SILVER AEGIS · 12 GIÂY');return true;
}
// PLAYER_PART_END s22.ironSilverStart.1

// index.html:115571 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSilverEnd.1 EDITABLE
function ironSilverEnd(n=dino){const p=n.ironhaul;if(!p)return;p.silver=0;p.silverFinishing=false;ironMode(n,p.silverReturn===2?2:0);ultCharge=0;}
// PLAYER_PART_END s22.ironSilverEnd.1

// index.html:115572 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironPower.1 EDITABLE
function ironPower(p,base,a){return (ironWhite(p)?base*1.5+1:base)*(a?.finisherPower||1);}
// PLAYER_PART_END s22.ironPower.1

// index.html:115573 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironLabel.1 EDITABLE
function ironLabel(s){floatingTexts.push(new FloatingText(dino.x-25,dino.y-25,s));}
// PLAYER_PART_END s22.ironLabel.1

// index.html:115574 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironBody.1 EDITABLE
function ironBody(n){
    const p=n.ironhaul,a=p.attack,scale=p.mode===2?.3:.38;
    const b=Object.create(IronhaulBoss.prototype);Object.assign(b,{x:(n.x+n.w/2)/scale-(p.mode===2?143:52),y:(n.y+n.h)/scale-(p.mode===2?104:180),w:p.mode===2?286:104,h:p.mode===2?104:180,phase:2,silver:p.mode===1,vehicle:p.mode===2,facingLeft:(a?a.dir:n.isFacingLeft?-1:1)<0,grounded:n.grounded,pose:a?.move.round?'gun':'idle',state:a?a.move.state:frames<p.guardUntil?'ih_parry':'idle',subTimer:a?a.age+(a.move.offset||0):0,slash:a?.slash||null,shieldStrike:a?.shield||null,coreBuff:p.core,muzzle:p.muzzle||0,shieldOut:p.shieldOut,gait:p.gait,animSpeed:p.speed||0,animAt:frames,scale});
    b.playerCrouch=!!n.isCrouching;
    b.followPose=p.follow;b.playerBlend=true;b.playerReach=p.reach??112;if(ironWhite(p))b.coreBuff=Math.max(1,p.core||0);
    if(b.vehicle&&a?.move.round==='shell')b.state='ih_cannon';
    const target=ironTarget(n);b.lockX=(target?target.x+target.w/2:n.x+(n.isFacingLeft?-200:200))/scale;b.lockY=(target?target.y+target.h/2:n.y+n.h/2)/scale;
    return b;
}
// PLAYER_PART_END s22.ironBody.1

// index.html:115583 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironTarget.1 EDITABLE
function ironTarget(n){
    const dir=n.isFacingLeft?-1:1,cx=n.x+n.w/2,cy=n.y+n.h/2;
    return sgTargets(n).filter(o=>!o.invulnAll&&(o.x+o.w/2-cx)*dir>-30&&Math.hypot(o.x+o.w/2-cx,o.y+o.h/2-cy)<900).sort((a,b)=>(b._beamClashPoint?1:0)-(a._beamClashPoint?1:0)||Math.hypot(a.x+ a.w/2-cx,a.y+a.h/2-cy)-Math.hypot(b.x+b.w/2-cx,b.y+b.h/2-cy))[0]||null;
}
// PLAYER_PART_END s22.ironTarget.1

// index.html:115587 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironGeometry.1 EDITABLE
function ironGeometry(n){
    const b=ironBody(n),g=ironhaulWeapons(b),s=b.scale,point=p=>({x:p.x*s,y:p.y*s});
    return {body:b,grip:point(g.grip),tip:point(g.tip),shield:point(g.shield),gun:point(g.gun),gunAngle:g.gunAngle,shieldBox:{x:g.shieldBox.x*s,y:g.shieldBox.y*s,w:g.shieldBox.w*s,h:g.shieldBox.h*s}};
}
// PLAYER_PART_END s22.ironGeometry.1

// index.html:115591 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDamage.1 EDITABLE
function ironDamage(n,o,damage,attack){
    const dealt=sgDamage(n,o,damage,'ironhaul');
    if(dealt>0){if(!ironWhite(n.ironhaul)&&!o._beamClashPoint&&!attack?.move?.ultimate&&!attack?.ultimate)ultCharge=Math.min(100,ultCharge+dealt*.8);
        const root=o.__goc||o;if(attack?.move?.finish&&!root._beamClashPoint&&!bosses.includes(root)){if(Number.isFinite(root.dy))root.dy=-5;if(Number.isFinite(root.x))root.x+=attack.dir*12;}
    }return dealt;
}
// PLAYER_PART_END s22.ironDamage.1

// index.html:115597 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironBegin.1 EDITABLE
function ironBegin(id,n=dino){
    const p=n.ironhaul,m=IRON_PLAYER_MOVES[id];if(!p||!m||p.attack||frames<p.guardUntil)return false;
    if(id==='throw'&&p.shieldOut)return false;
    if(id==='charge'&&(p.mode===2||p.coreReady>0))return false;
    if(id==='nova'&&(!ironWhite(p)||p.novaReady>0))return false;
    const before=p.mode;
    if(m.ultimate&&!ironWhite(p))return false;
    ironCapture(n,10);
    p.attack={id,move:m,age:0,dir:n.isFacingLeft?-1:1,slash:null,shield:null,hits:new Set(),before,input:null,airWait:0};p.k=null;
    if(m.ultimate){p.attack.finisherPower=.9+2.7*p.silver/p.silverMax;p.silverFinishing=true;p.silver=0;ultCharge=0;n.invincible=true;n.invTimer=Math.max(n.invTimer,18);}
    if(id==='charge')p.coreReady=720;
    if(id==='nova')p.novaReady=360;
    if(!['cut','rise','silvercut','spin','gatling'].includes(id))ironLabel(m.name);
    return true;
}
// PLAYER_PART_END s22.ironBegin.1

// index.html:115612 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironCommand.1 EDITABLE
function ironCommand(key,n=dino,charge=0,downOverride){
    const p=n.ironhaul;if(!p)return;
    if(key==='J')p.lastJ=frames;else if(key==='K')p.lastK=frames;
    if(p.attack){
        const a=p.attack,link=key==='J'?a.move.followJ:a.move.followK;
        if(link&&a.age>=(a.move.link||18)){ironCancel(n);ironBegin(link,n);if(p.attack)p.attack.input=key;return;}
        if(a.age>=Math.max(8,a.move.T-18)&&!a.move.ultimate&&!p.queue)p.queue={key,charge,down:downOverride??!!(keys.KeyS||keys.ArrowDown),until:frames+40};return;
    }
    const dash=frames-p.lastDash<=22,down=downOverride??!!(keys.KeyS||keys.ArrowDown);
    let id;
    if(key==='J'){
        if(p.mode===2)id='gatling';
        else if(dash){id=ironWhite(p)?'aegislance':'advance';p.lastDash=-1000;}
        else if(down)id=ironWhite(p)?'bash':'upper';
        else if(!n.grounded){id=(p.airCombo++%2)?'aircross':'air';}
        else{if(frames-p.ended>48)p.combo=0;const seq=ironWhite(p)?['silvercut','spin','silverbloom','silvercross','sovereign']:['cut','rise','cross','thrust','execution'];id=seq[p.combo++%seq.length];}
    }else if(key==='K'){
        if(p.mode===2)id=charge>=45?'barrage':'truckcannon';
        else if(ironWhite(p))id=dash?'aegiswheel':down?'nova':'throw';
        else id=dash?'rail':!n.grounded&&down?'plunge':charge>=45?'barrage':down?'cleaver':'gun';
    }
    if(id&&ironBegin(id,n)&&p.attack){p.attack.input=key;if(dash&&p.mode!==2)dashVx=0;}
}
// PLAYER_PART_END s22.ironCommand.1

// index.html:115635 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironKey.1 EDITABLE
function ironKey(code,repeat){
    if(!ironActive())return false;
    if(['Space','KeyW','ArrowUp'].includes(code)){
        const p=dino.ironhaul;if(!repeat&&!paused&&!gameOver&&!gameVictory&&p&&p.mode!==2&&!p.attack?.move.ultimate){
            const kind=p.k!==null?'K':p.attack?.input==='J'||frames-p.lastJ<=26?'J':null;
            if(kind)p.pendingJump={kind,until:frames+8,jumpCount:dino.jumpCount||0};
        }return false;
    }
    if(!['KeyJ','KeyK','KeyQ','KeyE','KeyI','KeyO','KeyU','KeyL','KeyR','KeyY'].includes(code))return false;
    keys[code]=true;if(paused||gameOver||gameVictory||repeat)return true;
    const p=dino.ironhaul;if(!p)return true;
    if(code==='KeyQ'||code==='KeyE'){if(!ironWhite(p)){ironMode(dino,p.mode===2?0:2);ironLabel(IRON_MODES[p.mode]);}}
    else if(code==='KeyJ')ironCommand('J');
    else if(code==='KeyK'){p.lastK=frames;if(p.attack)ironCommand('K');else if(frames>=p.guardUntil)p.k=0;}
    else if(code==='KeyI')ironBegin(ironWhite(p)?'nova':'charge');
    else if(code==='KeyO')ironBegin(ironWhite(p)?'sovereign':p.mode===2?'cannon':'cleaver');
    else if(code==='KeyU'){if(ironWhite(p)){if(!p.attack?.move.ultimate){ironCancel();p.guardUntil=-100;ironBegin('ultimate');}}else ironSilverStart();}
    else if(code==='KeyL'&&frames>=p.guardReady&&!p.attack?.move.ultimate){ironCancel();p.guardUntil=frames+(ironWhite(p)?32:26);p.perfectUntil=frames+(ironWhite(p)?8:6);p.guardReady=frames+(ironWhite(p)?42:64);dino.meleeTimer=ironWhite(p)?30:28;dino.parryWindow=ironWhite(p)?8:6;dino.meleeID++;}
    return true;
}
// PLAYER_PART_END s22.ironKey.1

// index.html:115655 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironKeyBase.1 EDITABLE
const ironKeyBase=danteKey;
// PLAYER_PART_END s22.ironKeyBase.1

// index.html:115655 · Phạm vi: global
// PLAYER_PART_BEGIN s22.danteKey.1 EDITABLE
danteKey=function(code,repeat){return ironKey(code,repeat)||ironKeyBase(code,repeat);};
// PLAYER_PART_END s22.danteKey.1

// index.html:115656 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDashBase.1 EDITABLE
const ironDashBase=doDash;
// PLAYER_PART_END s22.ironDashBase.1

// index.html:115657 · Phạm vi: global
// PLAYER_PART_BEGIN s22.doDash.1 EDITABLE
doDash=function(...args){
    const p=ironActive()?dino.ironhaul:null,a=p?.attack,source=p?(p.k!==null?'K':a?.input&&a.age>=5?a.input:frames-p.lastK<=22?'K':frames-p.lastJ<=22?'J':null):null;
    const old=dashCd,result=ironDashBase.apply(this,args);
    if(p&&dashCd>old&&Math.abs(dashVx)>1&&!a?.move.ultimate){
        ironCancel();p.lastDash=frames;
        const id=p.mode===2?(source==='K'?'broadside':'ram'):source==='J'?(ironWhite(p)?'aegisorbit':'recoil'):source==='K'?(ironWhite(p)?'aegisvault':'gunvault'):null;
        if(id){ironBegin(id);if(p.attack){p.attack.input=null;if(['recoil','gunvault','aegisorbit'].includes(id))dashVx=-p.attack.dir*Math.max(10,Math.abs(dashVx));}}
    }return result;
};
// PLAYER_PART_END s22.doDash.1

// index.html:115666 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironGuardBase.1 EDITABLE
const ironGuardBase=Player.prototype.isShielding;
// PLAYER_PART_END s22.ironGuardBase.1

// index.html:115667 · Phạm vi: global
// PLAYER_PART_BEGIN s22.Player.prototype.isShielding.1 EDITABLE
Player.prototype.isShielding=function(){if(ironOn()&&this===dino&&this.ironhaul)return frames<this.ironhaul.guardUntil;return ironGuardBase.call(this);};
// PLAYER_PART_END s22.Player.prototype.isShielding.1

// index.html:115668 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironParryBase.1 EDITABLE
const ironParryBase=shinGuardReset;
// PLAYER_PART_END s22.ironParryBase.1

// index.html:115669 · Phạm vi: global
// PLAYER_PART_BEGIN s22.shinGuardReset.1 EDITABLE
shinGuardReset=function(perfect){const p=ironActive()?dino.ironhaul:null;if(perfect&&p?.mode===1&&frames<p.perfectUntil&&!p.counter){p.counter=frames+12;p.perfectUntil=-100;}return ironParryBase(perfect);};
// PLAYER_PART_END s22.shinGuardReset.1

// index.html:115670 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironFriendlyRound.1 EDITABLE
function ironFriendlyRound(n,kind,power,tilt=0){
    const p=n.ironhaul,a=p.attack,g=ironGeometry(n),target=ironTarget(n),dir=a?.dir||(n.isFacingLeft?-1:1);
    let source=p.mode===2?{x:n.x+n.w/2+dir*24,y:n.y+n.h-(kind==='bullet'?111:124)*.3}:kind==='shield'?g.shield:kind==='wave'?g.tip:g.gun;
    const aim=Math.atan2((target?target.y+target.h/2:n.y+n.h/2)-source.y,Math.abs((target?target.x+target.w/2:n.x+dir*400)-source.x));
    const white=ironWhite(p),q={kind,x:source.x,y:source.y,vx:dir*Math.cos(aim+tilt)*13,vy:Math.sin(aim+tilt)*13,r:kind==='bullet'?3:kind==='shield'?white?17:14:kind==='wave'?white?25:20:kind==='rail'?10:7,damage:ironPower(p,power||1,a),returnDamage:ironPower(p,2,a),age:0,life:kind==='shield'?110:120,hit:new Set(),dir,ultimate:white||!!a?.move.ultimate,white,leg:0};
    if((kind==='bullet'||kind==='rail')&&p.mode!==2){q.vx=Math.cos(g.gunAngle+tilt)*13;q.vy=Math.sin(g.gunAngle+tilt)*13;}
    if(kind==='shell'){
        const tx=target?target.x+target.w/2:source.x+dir*280,ty=target?target.y+target.h/2:source.y+50,T=38;
        q.vx=(tx-source.x)/T;q.vy=(ty-source.y-.18*T*(T+1)/2)/T;
    }
    if(kind==='shield'){q.vx=dir*8;q.vy=0;p.shieldOut=110;}
    p.rounds.push(q);p.muzzle=5;SFX.tone(kind==='shell'?110:650,.06,'triangle',.06,100);
}
// PLAYER_PART_END s22.ironFriendlyRound.1

// index.html:115683 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironBlast.1 EDITABLE
function ironBlast(n,q){
    const p=n.ironhaul,hit=new Set();for(const o of sgTargets(n)){const root=o.__goc||o;
        if(!hit.has(root)&&Math.hypot(Math.max(o.x,Math.min(q.x,o.x+o.w))-q.x,Math.max(o.y,Math.min(q.y,o.y+o.h))-q.y)<=54){hit.add(root);ironDamage(n,o,q.damage,q);}}
    p.fx.push({x:q.x,y:q.y,r:54,t:18,max:18});shakeTimer=Math.max(shakeTimer,5);q.life=0;
}
// PLAYER_PART_END s22.ironBlast.1

// index.html:115688 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironArea.1 EDITABLE
function ironArea(n,base,radius,a){
    const p=n.ironhaul,x=n.x+n.w/2,y=n.y+n.h-8,damage=ironPower(p,base,a);
    for(const o of sgTargets(n))if(Math.hypot(Math.max(o.x,Math.min(x,o.x+o.w))-x,Math.max(o.y,Math.min(y,o.y+o.h))-y)<=radius)ironDamage(n,o,damage,a);
    p.fx.push({x,y,r:radius,t:25,max:25});shakeTimer=Math.max(shakeTimer,12);SFX.tone(120,.18,'sawtooth',.1,45);
}
// PLAYER_PART_END s22.ironArea.1

// index.html:115693 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironRoundTick.1 EDITABLE
function ironRoundTick(n){
    const p=n.ironhaul;
    for(const q of p.rounds){
        q.age++;q.life--;const ox=q.x,oy=q.y;
        if(q.kind==='shell')q.vy+=.18;
        if(q.kind==='shield'&&q.age===24){q.leg=1;q.hit.clear();q.damage=q.returnDamage;}
        if(q.kind==='shield'&&q.leg){const goal=p.mode===1?ironGeometry(n).shield:{x:n.x+n.w/2,y:n.y+n.h/2},dx=goal.x-q.x,dy=goal.y-q.y,L=Math.hypot(dx,dy)||1;q.vx=dx/L*10;q.vy=dy/L*10;if(L<13)q.life=0;}
        q.x+=q.vx;q.y+=q.vy;const box={x:Math.min(ox,q.x)-q.r,y:Math.min(oy,q.y)-q.r,w:Math.abs(q.x-ox)+q.r*2,h:Math.abs(q.y-oy)+q.r*2};
        if(q.life<=0)continue;
        for(const o of sgTargets(n)){const root=o.__goc||o;if(q.hit.has(root)||!checkAABB(box,o))continue;
            if(q.kind==='shell'){ironBlast(n,q);break;}
            q.hit.add(root);ironDamage(n,o,q.damage,q);if(q.kind==='bullet'){q.life=0;break;}
        }
        if(q.kind==='shell'&&q.life>0&&q.vy>0){const tops=platforms.filter(pf=>!pf.wall&&pf.solid!==false&&q.x>=pf.x&&q.x<=pf.x+pf.w&&pf.top>=oy-q.r).map(pf=>pf.top);const floor=tops.length?Math.min(...tops):coBuc()?Infinity:dkNenY();if(q.y+q.r>=floor){q.y=floor;ironBlast(n,q);}}
    }
    p.rounds=p.rounds.filter(q=>q.life>0);p.shieldOut=p.rounds.some(q=>q.kind==='shield')?1:0;
}
// PLAYER_PART_END s22.ironRoundTick.1

// index.html:115710 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironTick.1 EDITABLE
function ironTick(){
    if(!ironActive())return;const n=dino;if(!n.ironhaul)ironInit(n);const p=n.ironhaul;
    n.parryWindow=Math.max(0,p.perfectUntil-frames);n.meleeTimer=Math.max(0,Math.min(n.meleeTimer,p.guardUntil-frames));if(frames>=p.perfectUntil)n.meleeTimer=Math.min(22,n.meleeTimer);
    if(p.silver>0&&!p.silverFinishing){p.silver--;ultCharge=0;if(!p.silver)ironSilverEnd(n);}
    if(p.novaReady>0)p.novaReady--;
    p.reach=(p.reach??112)+((p.attack?.slash?.reach??112)-(p.reach??112))*.35;
    if(p.core>0)p.core--;if(p.coreReady>0)p.coreReady--;if(p.muzzle>0)p.muzzle--;if(p.transition>0)p.transition--;
    p.fx=p.fx.filter(f=>--f.t>0);
    p.trails=p.trails.filter(f=>--f.t>0);p.ghosts=p.ghosts.filter(f=>--f.t>0);
    if(n.grounded)p.airCombo=0;
    if(p.pendingJump){if(frames>p.pendingJump.until)p.pendingJump=null;else if(!n.grounded&&(n.jumpCount||0)>p.pendingJump.jumpCount){const kind=p.pendingJump.kind;ironCancel(n);ironBegin(kind==='J'?(ironWhite(p)?'ascension':'skyripper'):(ironWhite(p)?'starfall':'gunrain'),n);}}
    if(p.k!==null){if(keys.KeyK)p.k=Math.min(90,p.k+1);else{const charge=p.k;p.k=null;ironCommand('K',n,charge);}}
    if(p.counter&&frames>=p.counter){p.counter=0;p.guardUntil=-100;ironBegin('riposte',n);}
    if(!p.attack&&p.mode===2&&keys.KeyJ&&!keys.KeyK&&frames>=p.guardUntil)ironCommand('J',n);
    const a=p.attack;
    if(a){a.age++;const m=a.move,old=ironGeometry(n);n.isFacingLeft=a.dir<0;
        if(m.jump&&a.age===m.jump[0]){n.dy=m.jump[1];n.grounded=false;}
        if(m.airSlow&&a.age<=m.airSlow&&!n.grounded)n.dy=Math.min(n.dy,.65);
        if(m.plunge&&a.age>=20&&!n.grounded)n.dy=Math.max(12,n.dy);
        if(m.step&&a.age>=m.step[0]&&a.age<=m.step[1]){
            const x=n.x,target=ironTarget(n);let travel=m.step[2];
            if(travel>0&&!m.ram&&target)travel=Math.min(travel,Math.max(0,(target.x+target.w/2-n.x-n.w/2)*a.dir-55));
            n.x=Math.max(worldL(),Math.min(worldR()-n.w,n.x+a.dir*travel));if(mapTheme==='tetris')resolveTetrisWalls(n,n.x-x);else resolveSolidPillars(n);
        }
        for(const beat of m.sword||[])if(a.age===beat[0]){ironCapture(n,8);const [at,kind,reach,life,damage]=beat,angles=kind==='rise'?[.52,-1.9]:kind==='thrust'?[-.12,.08]:[-2.2,.65];a.slash={kind,reach:reach*(ironWhite(p)?1.12:1),life,age:0,a0:angles[0],a1:angles[1],angle:angles[0],damage:ironPower(p,damage+(p.core?1:0),a),hit:new Set()};}
        for(const beat of m.shield||[])if(a.age===beat[0]){ironCapture(n,8);a.shield={kind:beat[1],age:0,life:beat[2],damage:ironPower(p,beat[3],a),hit:new Set()};}
        if(a.slash){const s=a.slash;s.age++;s.angle=s.a0+(s.a1-s.a0)*ironhaulEase(s.age/s.life);}
        if(a.shield)a.shield.age++;
        const g=ironGeometry(n);
        for(const o of sgTargets(n)){const root=o.__goc||o,s=a.slash,h=a.shield;
            if(s&&!s.hit.has(root))for(let k=0;k<=6;k++){const u=k/6;if(sgSegmentBox(ironhaulMix(old.grip.x,g.grip.x,u),ironhaulMix(old.grip.y,g.grip.y,u),ironhaulMix(old.tip.x,g.tip.x,u),ironhaulMix(old.tip.y,g.tip.y,u),o,4)!==null){s.hit.add(root);ironDamage(n,o,s.damage,a);break;}}
            if(h&&!p.shieldOut&&!h.hit.has(root)&&h.age>=h.life*.2&&h.age<=h.life*.9&&(checkAABB(g.shieldBox,o)||sgSegmentBox(old.shield.x,old.shield.y,g.shield.x,g.shield.y,o,9)!==null)){h.hit.add(root);ironDamage(n,o,h.damage,a);}
            if(m.ram&&a.age>=4&&a.age<=24&&!a.hits.has(root)&&checkAABB(n,o)){a.hits.add(root);ironDamage(n,o,6,a);}
        }
        if(a.slash){
            p.trails.push({grip:{...old.grip},tip:{...old.tip},toGrip:{...g.grip},toTip:{...g.tip},white:ironWhite(p),t:10});
            if((p.core||ironWhite(p))&&a.slash.kind==='thrust'&&a.slash.age===9)ironFriendlyRound(n,'wave',3);
            if(a.slash.age>=a.slash.life){ironCapture(n,12);a.slash=null;}
        }
        if(a.shield&&a.shield.age>=a.shield.life){ironCapture(n,12);a.shield=null;}
        if((m.shots||[]).includes(a.age))ironFriendlyRound(n,m.round,m.power||(m.round==='shield'?4:1));
        if(a.id==='charge'&&a.age===72){p.core=480;p.fx.push({x:n.x+n.w/2,y:n.y+24,r:42,t:20,max:20});}
        if((m.waves||[]).includes(a.age))for(const tilt of m.fan?[-.22,0,.22]:[0])ironFriendlyRound(n,'wave',3,tilt);
        if(m.nova&&a.age===m.nova[0])ironArea(n,m.nova[1],m.nova[2],a);
        if(m.plunge&&a.age>=20&&n.grounded&&!a.landed){a.landed=true;ironArea(n,6,76,a);}
        if(m.ultimate&&a.age===122)ironArea(n,12,145,a);
        if(m.plunge&&!a.landed&&a.age>=m.T&&!(++a.airWait>90))a.age=m.T-1;
        if(a.age>=m.T){ironCapture(n,12);p.attack=null;p.ended=frames;const queued=p.queue;p.queue=null;if(m.ultimate)ironSilverEnd(n);else if(queued&&frames<=queued.until)ironCommand(queued.key,n,queued.charge,queued.down);}
    }
    const dx=n.x-p.lastX;
    if(Math.abs(dx)>8&&frames%3===0){const b=ironBody(n);b.rigPose=ironhaulRig(b);p.ghosts.push({body:b,t:10});}
    p.ghosts=p.ghosts.slice(-6);p.trails=p.trails.slice(-24);
    ironRoundTick(n);p.speed=(p.speed||0)*.6+dx*.4;p.gait+=Math.abs(dx)*.11;p.lastX=n.x;
}
// PLAYER_PART_END s22.ironTick.1

// index.html:115764 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironCombatBase.1 EDITABLE
const ironCombatBase=danteTick;
// PLAYER_PART_END s22.ironCombatBase.1

// index.html:115764 · Phạm vi: global
// PLAYER_PART_BEGIN s22.danteTick.1 EDITABLE
danteTick=function(){ironCombatBase();ironTick();};
// PLAYER_PART_END s22.danteTick.1

// index.html:115765 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDamageBase.1 EDITABLE
const ironDamageBase=Player.prototype.takeDamage;
// PLAYER_PART_END s22.ironDamageBase.1

// index.html:115766 · Phạm vi: global
// PLAYER_PART_BEGIN s22.Player.prototype.takeDamage.1 EDITABLE
Player.prototype.takeDamage=function(...args){const hp=this.hp,result=ironDamageBase.apply(this,args);if(ironOn()&&this===dino&&this.ironhaul&&this.hp<hp){const p=this.ironhaul,a=p.attack;ironCancel(this);p.counter=0;p.combo=0;if(a?.move.ultimate)ironSilverEnd(this);}return result;};
// PLAYER_PART_END s22.Player.prototype.takeDamage.1

// index.html:115767 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDraw.1 EDITABLE
function ironDraw(n){
    const p=n.ironhaul,b=ironBody(n);
    for(const f of p.ghosts){ctx.save();ctx.globalAlpha=f.t/10*.18;ctx.scale(f.body.scale,f.body.scale);if(f.body.vehicle)ironhaulTruck(f.body);else ironhaulRobot(f.body);ctx.restore();}
    for(const f of p.trails){ctx.save();ctx.globalAlpha=f.t/10*(f.white?.28:.17);ctx.fillStyle=f.white?'#ddffff':'#ffc889';ctx.strokeStyle=f.white?'#a8faff':'#ffe3b3';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(f.grip.x,f.grip.y);ctx.lineTo(f.tip.x,f.tip.y);ctx.lineTo(f.toTip.x,f.toTip.y);ctx.lineTo(f.toGrip.x,f.toGrip.y);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}
    if(ironWhite(p)){ctx.save();ctx.globalAlpha=.2;ctx.strokeStyle='#b3faff';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(n.x+n.w/2,n.y+n.h-4,35+Math.sin(frames*.1)*3,9,0,0,7);ctx.stroke();for(let i=0;i<5;i++){const u=(frames*.012+i/5)%1;ctx.fillStyle='#e3ffff';ctx.fillRect(n.x+n.w/2+Math.sin(i*2.4)*28,n.y+n.h-u*85,2,6);}ctx.restore();}
    ctx.save();if(n.invincible&&frames%6<3)ctx.globalAlpha=.45;
    ctx.scale(b.scale,b.scale);if(b.vehicle)ironhaulTruck(b);else{ironhaulRobot(b);ironhaulCoreFx(b);}ctx.restore();
    if(p.transition){ctx.save();ctx.globalAlpha=p.transition/18*.6;ctx.strokeStyle=p.mode===1?'#d2fcff':'#9bcee5';ctx.lineWidth=2;const u=1-p.transition/18;for(let i=0;i<8;i++){const a=i*Math.PI/4,R=18+u*28,x=n.x+n.w/2+Math.cos(a)*R,y=n.y+n.h/2+Math.sin(a)*R;ctx.save();ctx.translate(x,y);ctx.rotate(a+u);ctx.strokeRect(-4,-7,8,14);ctx.restore();}ctx.restore();}
    for(const q of p.rounds){ctx.save();ctx.translate(q.x,q.y);ctx.fillStyle=q.white?'#bbfaff':'#ffda98';ctx.strokeStyle='#ecfbff';ctx.lineWidth=2;
        if(q.kind==='shield'){ctx.rotate(q.age*.3);ironhaulPolygon([[-12,-10],[0,-15],[13,-9],[13,9],[0,16],[-12,9]],'#dcebf3','#a4efff');}
        else if(q.kind==='wave'){ctx.rotate(Math.atan2(q.vy,q.vx));ctx.beginPath();ctx.arc(-8,0,q.r,-1.2,1.2);ctx.lineWidth=q.white?9:7;ctx.stroke();}
        else if(q.kind==='rail'){ctx.rotate(Math.atan2(q.vy,q.vx));ctx.fillRect(-22,-5,44,10);ctx.fillStyle='#fff';ctx.fillRect(-16,-2,36,4);}
        else{ctx.rotate(Math.atan2(q.vy,q.vx));ctx.beginPath();ctx.ellipse(0,0,q.r*1.5,q.r,0,0,7);ctx.fill();}ctx.restore();
    }
    for(const f of p.fx){ctx.save();ctx.globalAlpha=f.t/f.max;ctx.strokeStyle='#b4f5ff';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(f.x,f.y,f.r*(1-f.t/f.max*.6),f.r*.5*(1-f.t/f.max*.6),0,0,7);ctx.stroke();ctx.restore();}
    if(frames<p.guardUntil){ctx.save();ctx.strokeStyle=frames<p.perfectUntil?'#fff6c4':'#9de8ff';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(n.x+n.w/2,n.y+n.h/2,n.w*.82,n.h*.6,0,0,7);ctx.stroke();ctx.restore();}
    if(p.k!==null){ctx.save();ctx.strokeStyle=p.k>=45?'#fff5b5':'#80ddff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(n.x+n.w/2,n.y+n.h/2,26,0,Math.PI*2*Math.min(1,p.k/45));ctx.stroke();ctx.restore();}
}
// PLAYER_PART_END s22.ironDraw.1

// index.html:115785 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDrawBase.1 EDITABLE
const ironDrawBase=Player.prototype.draw;
// PLAYER_PART_END s22.ironDrawBase.1

// index.html:115785 · Phạm vi: global
// PLAYER_PART_BEGIN s22.Player.prototype.draw.1 EDITABLE
Player.prototype.draw=function(...args){if(ironOn()&&this===dino&&this.ironhaul){ironDraw(this);return;}return ironDrawBase.apply(this,args);};
// PLAYER_PART_END s22.Player.prototype.draw.1

// index.html:115786 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironPlayerPreview.1 EDITABLE
function ironPlayerPreview(x,feet){
    for(const mode of [0,1,2]){
        const cx=x+(mode-1)*90,w=mode===2?86:40,h=mode===2?34:68;
        const sample={x:cx-w/2,y:feet-h,w,h,isFacingLeft:false,grounded:true,ironhaul:{mode,attack:null,core:0,muzzle:0,shieldOut:0,gait:frames*.025,lastX:cx-w/2}};
        const b=ironBody(sample);ctx.save();ctx.scale(b.scale,b.scale);if(b.vehicle)ironhaulTruck(b);else ironhaulRobot(b);ctx.restore();
    }
}
// PLAYER_PART_END s22.ironPlayerPreview.1

// index.html:115793 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironUiBase.1 EDITABLE
const ironUiBase=drawUI;
// PLAYER_PART_END s22.ironUiBase.1

// index.html:115794 · Phạm vi: global
// PLAYER_PART_BEGIN s22.drawUI.1 EDITABLE
drawUI=function(){
    ironUiBase();if(!ironOn()||!dino.ironhaul)return;const p=dino.ironhaul,white=ironWhite(p);
    ctx.save();if(dojoMode)ctx.translate(0,15);ctx.fillStyle='#101e2c';ctx.fillRect(10,45,308,150);ctx.textAlign='left';ctx.font='bold 13px Consolas';ctx.fillStyle=white?'#efffff':'#b8edfa';ctx.fillText('IRONHAUL · '+IRON_MODES[p.mode],20,65);
    ctx.font='11px Consolas';ctx.fillStyle='#e1edf2';ctx.fillText(white?'SILVER AEGIS · '+(p.silverFinishing?'FINAL DISCHARGE':(p.silver/60).toFixed(1)+'s'):'Q/E: ROBOT / TRUCK · J×5: COMBO',20,85);
    formAmmoSummary(p.attack?.move.name||(p.k!==null?'GIỮ K: PHÁO TAM LIÊN':'J DASH / DASH J · K DASH / DASH K'),20,105,284,13);
    ctx.fillText(white?'I: NOVA · O: SOVEREIGN · U: ĐÒN KẾT':p.core?'KIẾM CƯỜNG HÓA: '+(p.core/60).toFixed(1)+'s':'I: LÕI '+(p.coreReady?Math.ceil(p.coreReady/60)+'s':'SẴN SÀNG')+' · O: ĐÒN NẶNG',20,133);
    ctx.fillStyle='#294355';ctx.fillRect(20,146,282,8);ctx.fillStyle=white?'#ecffff':'#a8efff';ctx.fillRect(20,146,282*(white?(p.silverFinishing?0:p.silver/p.silverMax):Math.min(100,ultCharge)/100),8);ctx.fillStyle='#fff';ctx.fillText(white?'U: DỒN THỜI GIAN CÒN LẠI → AEGIS BREAKER':'U: SILVER AEGIS 12s · '+Math.floor(ultCharge)+'%',20,178);ctx.restore();
};
// PLAYER_PART_END s22.drawUI.1

// index.html:115802 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironMenuBase.1 EDITABLE
const ironMenuBase=drawCustomMenu;
// PLAYER_PART_END s22.ironMenuBase.1

// index.html:115803 · Phạm vi: global
// PLAYER_PART_BEGIN s22.drawCustomMenu.1 EDITABLE
drawCustomMenu=function(){
    ironMenuBase();if(!ironOn()||runePicker!==null||battuMa||runeXem||ammoPicker||cusNCPicker||ammoXem!==null)return;
    ctx.save();ctx.fillStyle='#10212e';ctx.fillRect(24,76,276,452);ctx.fillRect(702,80,272,436);ctx.textAlign='left';ctx.fillStyle='#b1edff';ctx.font='bold 21px Consolas';ctx.fillText('IRONHAUL · 10 HP',38,108);ctx.fillText('SILVER AEGIS · ULT',716,111);ctx.font='12px Consolas';ctx.fillStyle='#dbeaf2';
    apexWrap('Q / E: ROBOT ↔ TRUCK\n\nJ ×5: combo dài; K: súng / pháo\nDash J: lao chém → đâm\nDash K: Breach Cannon\nJ Dash: lùi chém, bắn\n  → J: lao tới truy kích\nK Dash: bật né bắn\n  → K: Breach Cannon\nJ Jump: Sky Ripper, ba nhát trên không\nK Jump: giữ độ cao, bắn liên tiếp\nCúi J: chém hất\nTrên không J: chém / song trảm\nTrên không Cúi K: bổ thiên thạch\nGiữ K 0,75s: pháo tam liên\nI: nạp lõi 8s · O: kiếm hai tay\nL: đỡ / Perfect Guard\nU (100%): GIÁP TRẮNG 12 GIÂY\n\nSpace/W: nhảy đôi · Shift: Dash',38,140,248,18);
    apexWrap('GIÁP TRẮNG LÀ CHIÊU CUỐI\nSát thương ×1,5 +1; kiếm dài hơn.\nKhông hồi HP, không sạc U trong dạng.\n\nJ ×5: kiếm → khiên → song trảm\n  → Cross Requiem → Sovereign\nDash J: Aegis Meteor Lance\nJ Dash: khiên xoay lùi → J: lao đâm\nDash K: hai khiên năng lượng bay\nK Dash: nhảy xoay khiên, chém trả\nJ Jump: Aegis Ascension\nK Jump: Aegis Starfall\nCúi K / I: Core Nova\nO: Sovereign Array, bão kiếm khí\nL: Perfect 8f, nối phản kích\n\nU LẦN NỮA: AEGIS BREAKER\nDồn toàn bộ thời gian còn lại.\nCòn nhiều thời gian → đòn kết mạnh.\nHết 12s / kết chiêu: về dạng trước.',716,142,246,17);ctx.restore();
};
// PLAYER_PART_END s22.drawCustomMenu.1

// index.html:115809 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironGuardMenuBase.1 EDITABLE
const ironGuardMenuBase=drawCustomMenu;
// PLAYER_PART_END s22.ironGuardMenuBase.1

// index.html:115809 · Phạm vi: global
// PLAYER_PART_BEGIN s22.drawCustomMenu.2 EDITABLE
drawCustomMenu=function(){ironGuardMenuBase();if(!ironOn()||runePicker!==null||battuMa||runeXem||ammoPicker||cusNCPicker||ammoXem!==null)return;ctx.save();ctx.fillStyle='#120c06';ctx.fillRect(334,388,338,78);ctx.font='bold 13px Consolas';ctx.fillStyle='#b1edff';ctx.textAlign='left';ctx.fillText('GUARD',340,410);ctx.textAlign='center';ctx.fillText('PARRY / COUNTER',548,410);ctx.textAlign='left';ctx.font='11px Consolas';ctx.fillStyle='#90aebe';ctx.fillText('L: Perfect 6f / Silver 8f → phản kích',340,439);ctx.restore();};
// PLAYER_PART_END s22.drawCustomMenu.2

// index.html:115810 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironUltBusyBase.1 EDITABLE
const ironUltBusyBase=dojoUltBusy;
// PLAYER_PART_END s22.ironUltBusyBase.1

// index.html:115810 · Phạm vi: global
// PLAYER_PART_BEGIN s22.dojoUltBusy.1 EDITABLE
dojoUltBusy=function(n){return !!(ironOn()&&n===dino&&n.ironhaul?.attack?.move.ultimate)||ironUltBusyBase(n);};
// PLAYER_PART_END s22.dojoUltBusy.1

// index.html:115811 · Phạm vi: global
// PLAYER_PART_BEGIN s22.IfStatement.1 EDITABLE
if(ironForm)xDatForm(IRON_FORM);
// PLAYER_PART_END s22.IfStatement.1
