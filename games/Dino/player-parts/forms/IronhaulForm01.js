// PLAYER_FILE: IronhaulForm01
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
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
    // =========================================================================
    // 1. DẠNG ROBOT CƠ BẢN (GUNBLADE & HEAVY MECHA ARSENAL)
    // Nhịp đánh dứt khoát, cho phép Early Cancel mượt mà và kết hợp Vũ Khí Cơ Khí:
    // Chém kiếm nhiệt -> Nổ cò súng Gunblade -> Cọc Thủy Lực (Pile Bunker) -> Tên Lửa Vòm
    // =========================================================================
    cut:{name:'GUNBLADE · CHÉM NHIỆT I',T:20,cancel:11,state:'ih_combo',offset:18,sword:[[5,'cut',145,11,3]],step:[2,10,3.5],jet:1},
    rise:{name:'GUNBLADE · CHÉM NGƯỢC II',T:20,cancel:11,state:'ih_combo',offset:46,sword:[[5,'rise',148,11,3]],step:[2,10,4],jet:1},
    cross:{name:'GUNBLADE · SONG TRẢM & NỔ CÒ III',T:30,cancel:20,state:'ih_combo',offset:0,sword:[[6,'cut',155,11,2.5],[17,'rise',162,12,2.5]],shots:[18],round:'shell_burst',power:2.5,step:[3,16,4.5],jet:2},
    thrust:{name:'PILE BUNKER · ĐỐT CỌC THỦY LỰC IV',T:30,cancel:20,state:'ih_combo',offset:74,sword:[[9,'thrust',178,14,4.5]],bunker:[9,92,4],step:[3,14,7],finish:true,jet:2},
    execution:{name:'OVERLOAD CLEAVER · ĐẠI TRẢM PHÁ GIÁP V',T:38,cancel:26,state:'ih_cleaver',offset:10,sword:[[14,'cut',195,16,6.5]],bunker:[15,110,4.5],waves:[15],step:[4,16,6],finish:true,jet:3},

    // Đòn nhánh Combo B (Đang chém J bấm K -> Nổ Pháo Gunblade Cận Chiến & Đóng Cọc):
    gunslash:{name:'GUNBLADE · PHÁO KÍCH CẬN CHIẾN',T:28,cancel:18,state:'ih_gunblade',offset:14,sword:[[7,'thrust',165,12,3.5]],bunker:[8,105,4],shots:[8,14],round:'rail',power:3,step:[2,10,-3.5],followJ:'pursuit',link:10,jet:2},

    upper:{name:'THRUSTER · CHÉM HẤT PHẢN LỰC',T:26,cancel:15,state:'ih_upper',offset:18,sword:[[8,'rise',158,14,4]],jump:[4,-8.5],finish:true,jet:2},
    advance:{name:'JET ASSAULT · ĐỘT KÍCH PHẢN LỰC',T:44,cancel:32,state:'ih_advance',offset:22,sword:[[10,'cut',170,13,4],[24,'thrust',182,14,5]],bunker:[25,96,3.5],step:[2,24,8.5],jet:3},
    cleaver:{name:'PILE BUNKER · XUYÊN PHÁ CỰC ĐẠI',T:44,cancel:30,state:'ih_cleaver',offset:10,sword:[[14,'cut',185,15,5],[28,'thrust',195,15,6]],bunker:[14,98,3.5,28,118,5],step:[4,24,5.5],finish:true,jet:3},

    // Hệ thống Hỏa Lực Tầm Xa của Mecha (Autocannon, Railgun, Micro-Missiles, Heavy Mortar):
    gun:{name:'AUTOCANNON · XẠ KÍCH LIÊN THANH',T:22,cancel:13,state:'ih_barrage',offset:22,shots:[4,9,14],round:'bullet',power:1.5},
    cannon:{name:'SIEGE RAILGUN · PHÁO ĐIỆN TỪ',T:38,cancel:24,state:'ih_barrage',offset:8,shots:[14],round:'rail',power:7.5,step:[12,18,-2.5],jet:2},
    barrage:{name:'VALKYRIE PODS · MƯA TÊN LỬA DẪN ĐƯỜNG',T:44,cancel:28,state:'ih_barrage',offset:8,shots:[10,16,22],missiles:[8,14,20],round:'shell',power:3,jet:2},

    air:{name:'AERIAL THRUST · KHÔNG KÍCH',T:22,cancel:13,state:'ih_upper',offset:42,sword:[[7,'cut',158,13,4]],airSlow:22,jet:1},
    aircross:{name:'AERIAL · SONG TRẢM TÊN LỬA',T:32,cancel:20,state:'ih_upper',offset:0,sword:[[7,'cut',158,12,3.5],[18,'rise',165,13,4]],missiles:[12],airSlow:28,jet:2},
    plunge:{name:'METEOR DROP · ĐỘNG CƠ ĐẬP ĐẤT',T:52,cancel:36,state:'ih_skyfall',offset:0,sword:[[16,'cut',185,18,6]],plunge:true,finish:true,jet:3},

    // Cơ động chiến thuật (J/K + Dash & Jump):
    recoil:{name:'JET BACKSTEP · LÙI BẮN PHẢN KÍCH',T:38,cancel:22,state:'ih_gunblade',offset:14,sword:[[18,'cut',168,14,4]],shots:[8,14],round:'bullet',power:2,step:[1,11,-5.5],followJ:'pursuit',link:10,jet:2},
    pursuit:{name:'FULL BURN · LAO TRUY KÍCH',T:44,cancel:30,state:'ih_flank',offset:40,sword:[[12,'rise',172,14,4.5],[26,'cut',190,16,6]],bunker:[26,105,4],step:[2,20,8],finish:true,jet:3},
    rail:{name:'BREACH RAILGUN · PHÁO XUYÊN GIÁP',T:38,cancel:24,state:'ih_gunblade',offset:14,shots:[12,22],round:'rail',power:4.5,step:[10,18,-2],jet:2},
    gunvault:{name:'THRUSTER VAULT · BẬT NHẢY PHÓNG TÊN LỬA',T:44,cancel:28,state:'ih_gunblade',offset:10,shots:[12,20,28],missiles:[14,22],round:'bullet',power:2,jump:[4,-8],step:[2,12,-3.5],followK:'rail',link:14,jet:2},
    skyripper:{name:'SKY RIPPER · THĂNG THIÊN LIÊN TRẢM',T:54,cancel:38,state:'ih_upper',offset:0,sword:[[10,'rise',162,15,4],[24,'cut',170,14,3.5],[38,'rise',178,14,5]],missiles:[24],airSlow:44,finish:true,jet:3},
    gunrain:{name:'AERIAL SALVO · PHÁO KÍCH TRÊN KHÔNG',T:46,cancel:30,state:'ih_barrage',offset:10,shots:[10,18,26,34],missiles:[14,26],round:'bullet',power:2,airSlow:42,jet:2},

    // =========================================================================
    // 2. DẠNG CHIẾN XA BỌC THÉP (ARMORED ASSAULT TRUCK — Q/E HOẶC TACTICAL MORPH)
    // =========================================================================
    gatling:{name:'VULCAN ROTARY · SÚNG MÁY HẠNG NẶNG',T:12,cancel:8,state:'ih_gatling',offset:22,shots:[3,7],round:'bullet',power:1.2},
    truckcannon:{name:'SIEGE HOWITZER · PHÁO ĐỘI HÌNH & TÊN LỬA',T:34,cancel:22,state:'ih_cannon',offset:18,shots:[12],missiles:[10,16],round:'shell',power:5.5},
    ram:{name:'NITRO BULLDOZER · THIẾT XA CÀN QUÉT',T:34,cancel:22,state:'ih_ram',offset:0,step:[2,26,10.5],ram:true,finish:true,jet:3},
    broadside:{name:'DRIFT BROADSIDE · XẠ KÍCH CƠ ĐỘNG',T:44,cancel:28,state:'ih_cannon',offset:10,shots:[10,20,30],missiles:[12,24],round:'shell',power:3.5,step:[2,24,6.5],jet:2},
    morphslam:{name:'TACTICAL MORPH · BIẾN HÌNH ĐẬP ĐẤT',T:34,cancel:22,state:'ih_cleaver',offset:10,sword:[[12,'cut',188,16,6]],bunker:[13,110,4.5],step:[2,12,7],finish:true,jet:3},

    // =========================================================================
    // 3. DẠNG SILVER AEGIS (OVERDRIVE MECHA — KIẾM KHÍ, PHễu FUNNELS & KHIÊN TỪ TRƯỜNG)
    // =========================================================================
    silvercut:{name:'AEGIS · TRẢM QUANG I',T:20,cancel:11,state:'ih_silvercombo',offset:16,sword:[[5,'cut',165,12,3.5]],step:[2,10,4],jet:2},
    spin:{name:'AEGIS · KHIÊN TỪ TRƯỜNG II',T:24,cancel:14,state:'ih_silvercombo',offset:40,shield:[[6,'spin',18,3.5]],step:[2,12,4.5],jet:2},
    silverbloom:{name:'AEGIS · SONG KHIÊN TRẢM III',T:34,cancel:22,state:'ih_silvercombo',offset:0,shield:[[6,'spin',22,4]],sword:[[18,'rise',195,15,5]],waves:[18],step:[3,16,5],jet:2},
    silvercross:{name:'AEGIS · CROSS REQUIEM IV',T:38,cancel:26,state:'ih_cross',offset:46,sword:[[10,'rise',200,14,5],[24,'cut',210,15,6]],waves:[14,26],step:[3,18,5.5],jet:3},
    silverfinish:{name:'AEGIS · PHÁN QUYẾT',T:28,cancel:18,state:'ih_silvercombo',offset:79,sword:[[8,'rise',185,15,5.5]],waves:[10],finish:true,jet:3},
    sovereign:{name:'SOVEREIGN ARRAY · BÃO KIẾM KHÍ & PHỄU',T:64,cancel:46,state:'ih_reversal',offset:0,shield:[[10,'spin',22,4]],sword:[[28,'thrust',220,15,6],[46,'cut',225,16,7]],waves:[16,32,48],missiles:[14,30],fan:true,finish:true,jet:3},

    throw:{name:'AEGIS BOOMERANG · PHI KHIÊN CẮT',T:28,cancel:16,state:'ih_aegis',offset:18,shots:[8],round:'shield',power:4.5},
    bash:{name:'AEGIS BUNKER · KHIÊN ĐẬP PHÁ THẾ',T:26,cancel:16,state:'ih_riposte',offset:14,shield:[[8,'bash',16,5]],bunker:[9,105,4.5],step:[2,12,6],finish:true,jet:2},
    shieldrush:{name:'AEGIS VANGUARD · KHIÊN ĐỘT KÍCH',T:42,cancel:28,state:'ih_shieldrush',offset:15,shield:[[8,'bash',16,3.5]],sword:[[24,'cut',185,14,5.5]],step:[2,20,8],finish:true,jet:3},
    reversal:{name:'AEGIS REVERSAL · XOAY KHIÊN ĐÂM XUYÊN',T:46,cancel:32,state:'ih_reversal',offset:15,shield:[[8,'spin',20,3.5]],sword:[[28,'thrust',195,15,6.5]],waves:[28],finish:true,jet:2},
    riposte:{name:'AEGIS COUNTER · PHẢN KÍCH TỨC THÌ',T:38,cancel:24,state:'ih_riposte',offset:8,shield:[[10,'bash',14,4]],sword:[[22,'cut',195,15,6]],bunker:[22,115,5],waves:[22],step:[2,16,7],finish:true,jet:3},

    aegislance:{name:'AEGIS METEOR LANCE · THƯƠNG ÁNH SÁNG',T:52,cancel:36,state:'ih_shieldrush',offset:0,shield:[[8,'bash',16,5]],sword:[[22,'thrust',230,14,7],[38,'rise',220,14,6]],bunker:[22,125,5],step:[2,24,9],waves:[26],finish:true,jet:3},
    aegisorbit:{name:'AEGIS ORBIT · LÙI KHIÊN PHẢN LỰC',T:44,cancel:28,state:'ih_reversal',offset:0,shield:[[8,'spin',22,5]],sword:[[26,'thrust',210,15,6]],waves:[26],step:[2,12,-5],followJ:'aegislance',link:14,jet:2},
    aegiswheel:{name:'TWIN AEGIS WHEELS · SONG LUÂN KHIÊN',T:42,cancel:26,state:'ih_aegis',offset:12,shots:[10,20],missiles:[12],round:'shield',power:5,dual:true,jet:2},
    aegisvault:{name:'AEGIS VAULT · KHÔNG CHIẾN PHẢN ĐÒN',T:52,cancel:34,state:'ih_reversal',offset:0,shield:[[10,'spin',22,5]],sword:[[32,'cut',215,16,7]],jump:[4,-8],waves:[28],followK:'aegiswheel',link:16,jet:3},
    ascension:{name:'AEGIS ASCENSION · THĂNG THIÊN QUANG TRẢM',T:58,cancel:40,state:'ih_upper',offset:0,sword:[[10,'rise',205,15,5],[26,'cut',215,15,6],[42,'thrust',225,15,7]],airSlow:48,waves:[32,46],finish:true,jet:3},
    starfall:{name:'AEGIS STARFALL · MƯA SAO BĂNG',T:58,cancel:40,state:'ih_upper',offset:0,sword:[[14,'cut',210,15,6]],shield:[[30,'spin',22,5]],airSlow:50,waves:[22,36,50],missiles:[16,32],fan:true,jet:3},

    // Nạp Lõi Tức Thì (Không còn bắt đứng im 1.5s!) & Đại Chiêu:
    charge:{name:'OVERDRIVE IGNITION · NỔ LÕI TỨC THÌ',T:34,cancel:20,state:'ih_overcharge',offset:0,nova:[12,6,88],missiles:[12,18],jet:3},
    nova:{name:'CORE ASCENSION · VỤ NỔ LÕI QUANG HỌC',T:46,cancel:30,state:'ih_overcharge',offset:0,shield:[[14,'spin',22,5]],nova:[18,14,120],waves:[22,34],fan:true,jet:3},
    ultimate:{name:'AEGIS BREAKER · FINAL DISCHARGE',T:118,state:'ih_reversal',offset:0,shield:[[16,'spin',24,4]],sword:[[42,'rise',215,16,6],[68,'cut',235,18,7]],waves:[44,70],missiles:[20,40,60],ultimate:true,jet:3}
};
// PLAYER_PART_END s22.IRON_PLAYER_MOVES.1

// index.html:115556 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironForm.1 EDITABLE
let ironForm=false,ironLoadout=null;
// PLAYER_PART_END s22.ironForm.1

// index.html:115557 · Phạm vi: global
// PLAYER_PART_BEGIN s22.TryStatement.1 EDITABLE
try{ironForm=localStorage.getItem('dino_ironhaul_form')==='1';}catch(e){}
// PLAYER_PART_END s22.TryStatement.1

// index.html:115558 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironOn.1 EDITABLE
function ironOn(){return ironForm&&gameState!=='pvp';}
// PLAYER_PART_END s22.ironOn.1

// index.html:115559 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironActive.1 EDITABLE
function ironActive(n=dino){return ironOn()&&n===dino&&n.hp>0&&['normal','boss_rush','test_boss'].includes(gameState);}
// PLAYER_PART_END s22.ironActive.1

// index.html:115560 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSync.1 EDITABLE
function ironSync(){
    if(ironOn()){
        if(!ironLoadout)ironLoadout={power:currentPower,ammo:currentAmmoType,accessory:phuKien,stance:combatStance,runes:runeSlots.slice()};
        currentPower=0;currentAmmoType=0;phuKien=0;combatStance=0;runeSlots=[null,null];
    }else if(ironLoadout){const s=ironLoadout;currentPower=s.power;currentAmmoType=s.ammo;phuKien=s.accessory;combatStance=s.stance;runeSlots=s.runes.slice();ironLoadout=null;}
}
// PLAYER_PART_END s22.ironSync.1

// index.html:115566 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSetBase.1 EDITABLE
const ironSetBase=xDatForm;
// PLAYER_PART_END s22.ironSetBase.1

// index.html:115567 · Phạm vi: global
// PLAYER_PART_BEGIN s22.xDatForm.1 EDITABLE
xDatForm=function(i){const next=((i%X_N_DANG)+X_N_DANG)%X_N_DANG;ironForm=false;ironSync();ironSetBase(next===IRON_FORM?0:next);ironForm=next===IRON_FORM;ironSync();try{localStorage.setItem('dino_ironhaul_form',ironForm?'1':'0');}catch(e){}};
// PLAYER_PART_END s22.xDatForm.1

// index.html:115568 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironIdxBase.1 EDITABLE
const ironIdxBase=xFormIdx,ironOnBase=xFormOn,ironSyncBase=xDongBo;
// PLAYER_PART_END s22.ironIdxBase.1

// index.html:115569 · Phạm vi: global
// PLAYER_PART_BEGIN s22.xFormIdx.1 EDITABLE
xFormIdx=function(){return ironForm?IRON_FORM:ironIdxBase();};
// PLAYER_PART_END s22.xFormIdx.1

// index.html:115570 · Phạm vi: global
// PLAYER_PART_BEGIN s22.xFormOn.1 EDITABLE
xFormOn=function(){return ironForm||ironOnBase();};
// PLAYER_PART_END s22.xFormOn.1

// index.html:115571 · Phạm vi: global
// PLAYER_PART_BEGIN s22.xDongBo.1 EDITABLE
xDongBo=function(){ironSyncBase();ironSync();};
// PLAYER_PART_END s22.xDongBo.1

// index.html:115572 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironInit.1 EDITABLE
function ironInit(n){
    const feet=n.y+n.h;n.form=0;n.ammoType=0;n.maxHp=n.hp=10;n.w=40;n.h=68;n.y=feet-68;
    n.ironhaul={
        mode:0,attack:null,queue:null,k:null,combo:0,airCombo:0,ended:-1000,
        core:0,coreReady:0,guardUntil:-100,perfectUntil:-100,guardReady:0,counter:0,
        lastDash:-1000,lastJ:-1000,lastK:-1000,
        silver:0,silverMax:720,silverReturn:0,silverFinishing:false,novaReady:0,
        rounds:[],fx:[],trails:[],ghosts:[],jets:[],bunkers:[],shells:[],
        shieldOut:0,transition:0,lastX:n.x,gait:0,hitstop:0
    };
    ultCharge=dojoMode?100:0;
}
// PLAYER_PART_END s22.ironInit.1

// index.html:115584 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironStartBase.1 EDITABLE
const ironStartBase=startGame;
// PLAYER_PART_END s22.ironStartBase.1

// index.html:115585 · Phạm vi: global
// PLAYER_PART_BEGIN s22.startGame.1 EDITABLE
startGame=function(mode){if(mode==='pvp'&&ironForm)xDatForm(0);ironSync();ironStartBase(mode);if(ironOn())ironInit(dino);};
// PLAYER_PART_END s22.startGame.1

// index.html:115586 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironMode.1 EDITABLE
function ironMode(n,mode,morphAttack=false){
    const p=n.ironhaul;if(!p)return;const cx=n.x+n.w/2,feet=n.y+n.h;
    ironCapture(n,10);let next=((mode%3)+3)%3;if(next===1&&!p.silver&&!p.silverFinishing)next=0;
    p.mode=next;p.attack=null;p.queue=null;p.k=null;p.combo=p.airCombo=0;p.counter=0;p.guardUntil=p.perfectUntil=-100;p.transition=16;p.pendingJump=null;
    n.w=p.mode===2?86:40;n.h=p.mode===2?34:68;n.x=Math.max(worldL(),Math.min(worldR()-n.w,cx-n.w/2));n.y=feet-n.h;n.isCrouching=false;
    // Khi biến hình giữa lúc đang chiến đấu (Tactical Morph Cancel) -> Tạo xung kích cơ khí đẩy lùi nhẹ và phóng tên lửa!
    if(morphAttack){
        p.fx.push({x:n.x+n.w/2,y:n.y+n.h/2,r:64,t:14,max:14});
        if(p.mode===2){
            ironBegin('ram',n);
        }else{
            ironBegin('morphslam',n);
        }
    }
}
// PLAYER_PART_END s22.ironMode.1

// index.html:115601 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironWhite.1 EDITABLE
function ironWhite(p){return p.mode===1&&(p.silver>0||p.silverFinishing);}
// PLAYER_PART_END s22.ironWhite.1

// index.html:115602 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironCapture.1 EDITABLE
function ironCapture(n,duration=12){
    const p=n.ironhaul;if(!p)return;const b=ironBody(n),t=ironhaulRig(b).targets;
    const targets={...t,swordTarget:{...t.swordTarget},offTarget:{...t.offTarget}};
    if(b.playerCrouch){targets.swordTarget.y-=36;targets.offTarget.y-=36;}
    p.follow={at:frames,targets,duration};
}
// PLAYER_PART_END s22.ironCapture.1

// index.html:115608 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironCancel.1 EDITABLE
function ironCancel(n=dino){const p=n.ironhaul;if(!p)return;ironCapture(n);p.attack=null;p.queue=null;p.k=null;p.pendingJump=null;}
// PLAYER_PART_END s22.ironCancel.1

// index.html:115609 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSilverStart.1 EDITABLE
function ironSilverStart(n=dino){
    const p=n.ironhaul;if(!p||ironWhite(p)||ultCharge<100)return false;
    p.silverReturn=p.mode===2?2:0;p.silver=p.silverMax;p.silverFinishing=false;p.novaReady=0;ultCharge=0;
    ironMode(n,1);n.invincible=true;n.invTimer=Math.max(n.invTimer,24);p.fx.push({x:n.x+n.w/2,y:n.y+n.h/2,r:90,t:24,max:24});ironLabel('SILVER AEGIS · 12 GIÂY');return true;
}
// PLAYER_PART_END s22.ironSilverStart.1

// index.html:115614 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSilverEnd.1 EDITABLE
function ironSilverEnd(n=dino){const p=n.ironhaul;if(!p)return;p.silver=0;p.silverFinishing=false;ironMode(n,p.silverReturn===2?2:0);ultCharge=0;}
// PLAYER_PART_END s22.ironSilverEnd.1

// index.html:115615 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironPower.1 EDITABLE
function ironPower(p,base,a){return (ironWhite(p)?base*1.5+1:base)*(a?.finisherPower||1);}
// PLAYER_PART_END s22.ironPower.1

// index.html:115616 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironLabel.1 EDITABLE
function ironLabel(s){floatingTexts.push(new FloatingText(dino.x-25,dino.y-25,s));}
// PLAYER_PART_END s22.ironLabel.1

// index.html:115617 · Phạm vi: global
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

// index.html:115628 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironTargets.1 EDITABLE
function ironTargets(n){
    const targets=sgTargets(n),clashing=new Set(targets.filter(o=>o._beamClashPoint).map(o=>o.ownerBoss));
    return targets.filter(o=>o._beamClashPoint||!clashing.has(o.__goc||o));
}
// PLAYER_PART_END s22.ironTargets.1

// index.html:115632 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironTarget.1 EDITABLE
function ironTarget(n){
    const dir=n.isFacingLeft?-1:1,cx=n.x+n.w/2,cy=n.y+n.h/2;
    return ironTargets(n).filter(o=>!o.invulnAll&&(o.x+o.w/2-cx)*dir>-30&&Math.hypot(o.x+o.w/2-cx,o.y+o.h/2-cy)<900).sort((a,b)=>(b._beamClashPoint?1:0)-(a._beamClashPoint?1:0)||Math.hypot(a.x+ a.w/2-cx,a.y+a.h/2-cy)-Math.hypot(b.x+b.w/2-cx,b.y+b.h/2-cy))[0]||null;
}
// PLAYER_PART_END s22.ironTarget.1

// index.html:115636 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironGeometry.1 EDITABLE
function ironGeometry(n){
    const b=ironBody(n),g=ironhaulWeapons(b),s=b.scale,point=p=>({x:p.x*s,y:p.y*s});
    return {body:b,grip:point(g.grip),tip:point(g.tip),shield:point(g.shield),gun:point(g.gun),gunAngle:g.gunAngle,shieldBox:{x:g.shieldBox.x*s,y:g.shieldBox.y*s,w:g.shieldBox.w*s,h:g.shieldBox.h*s}};
}
// PLAYER_PART_END s22.ironGeometry.1

// index.html:115640 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDamage.1 EDITABLE
function ironDamage(n,o,damage,attack){
    const dealt=sgDamage(n,o,damage,'ironhaul');
    if(dealt>0){if(!ironWhite(n.ironhaul)&&!o._beamClashPoint&&!attack?.move?.ultimate&&!attack?.ultimate)ultCharge=Math.min(100,ultCharge+dealt*.8);
        const root=o.__goc||o;if(attack?.move?.finish&&!root._beamClashPoint&&!bosses.includes(root)){if(Number.isFinite(root.dy))root.dy=-5;if(Number.isFinite(root.x))root.x+=attack.dir*12;}
    }return dealt;
}
// PLAYER_PART_END s22.ironDamage.1

// index.html:115646 · Phạm vi: global
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

// index.html:115662 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSpawnMissiles.1 EDITABLE
function ironSpawnMissiles(n,count=4){
    const p=n.ironhaul;if(!p)return;
    const dir=p.attack?.dir||(n.isFacingLeft?-1:1);
    const cx=n.x+n.w/2,cy=n.y+(p.mode===2?8:16);
    const targets=ironTargets(n).filter(o=>!o.invulnAll&&o.hp>0);
    const white=ironWhite(p);
    for(let i=0;i<count;i++){
        const spread=(i-(count-1)/2)*0.32;
        const launchAng=-Math.PI*0.5-dir*0.35+spread;
        const tTarget=targets.length?targets[i%targets.length]:null;
        p.rounds.push({
            kind:'missile',
            x:cx-dir*6+(i%2?-6:6),
            y:cy,
            vx:Math.cos(launchAng)*7.5,
            vy:Math.sin(launchAng)*8.5-2,
            r:5,
            damage:ironPower(p,2.0,p.attack),
            age:0,
            life:95,
            hit:new Set(),
            dir,
            target:tTarget,
            white,ultimate:white||!!p.attack?.move.ultimate,
            trail:[]
        });
    }
    if(SFX.tone)SFX.tone(520,0.05,'sawtooth',0.07,880);
}
// PLAYER_PART_END s22.ironSpawnMissiles.1

// index.html:115693 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironTriggerBunker.1 EDITABLE
function ironTriggerBunker(n,reach=96,basePower=4){
    const p=n.ironhaul;if(!p)return;
    const a=p.attack,dir=a?.dir||(n.isFacingLeft?-1:1);
    const g=ironGeometry(n);
    const sx=g.grip.x,sy=g.grip.y;
    const ex=sx+dir*reach,ey=sy-4;
    const white=ironWhite(p);
    const dmg=ironPower(p,basePower+(p.core?1:0),a);
    for(const o of ironTargets(n)){
        if(sgSegmentBox(sx,sy,ex,ey,o,16)!==null){
            ironDamage(n,o,dmg,a);
            const root=o.__goc||o;
            if(!bosses.includes(root)&&Number.isFinite(root.x))root.x+=dir*16;
        }
    }
    p.bunkers.push({x:sx,y:sy,ex,ey,dir,white,t:11,max:11});
    // Văng vỏ đạn đồng nóng đỏ ra phía sau lưng Robot
    p.shells.push({x:sx-dir*8,y:sy-4,vx:-dir*(2.5+Math.random()*2.5),vy:-3.5-Math.random()*2,ang:Math.random()*6,t:26});
    p.fx.push({x:ex-dir*14,y:ey,r:46,t:12,max:12});
    shakeTimer=Math.max(shakeTimer,8);
    if(SFX.tone)SFX.tone(95,0.12,'sawtooth',0.14,40);
}
// PLAYER_PART_END s22.ironTriggerBunker.1

// index.html:115716 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironCommand.1 EDITABLE
function ironCommand(key,n=dino,charge=0,downOverride){
    const p=n.ironhaul;if(!p)return;
    if(key==='J')p.lastJ=frames;else if(key==='K')p.lastK=frames;
    if(p.attack){
        const a=p.attack,link=key==='J'?a.move.followJ:a.move.followK;
        if(link&&a.age>=(a.move.link||10)){ironCancel(n);ironBegin(link,n);if(p.attack)p.attack.input=key;return;}
        // HỆ THỐNG COMBO B CƠ KHÍ: Đang chém J nhịp 1/2/3 mà bấm K -> Chuyển ngay sang Pháo Kích Gunblade / Đột Cọc Pile Bunker!
        if(key==='K'&&['cut','rise','cross'].includes(a.id)&&a.age>=6){
            const down=downOverride??!!(keys.KeyS||keys.ArrowDown);
            ironCancel(n);ironBegin(down?'cleaver':'gunslash',n);
            if(p.attack)p.attack.input='K';
            return;
        }
        // EARLY COMBO CANCEL: Nối đòn ngay khi đạt frame `cancel` thay vì phải chờ hết hoạt ảnh T!
        const cancelFrame=a.move.cancel||Math.max(8,a.move.T-14);
        if(a.age>=cancelFrame&&!a.move.ultimate){
            const savedDown=downOverride??!!(keys.KeyS||keys.ArrowDown);
            ironCancel(n);p.ended=frames;
            ironCommand(key,n,charge,savedDown);
            return;
        }
        if(a.age>=Math.max(5,cancelFrame-8)&&!a.move.ultimate&&!p.queue){
            p.queue={key,charge,down:downOverride??!!(keys.KeyS||keys.ArrowDown),until:frames+36};
        }
        return;
    }
    const dash=frames-p.lastDash<=22,down=downOverride??!!(keys.KeyS||keys.ArrowDown);
    let id;
    if(key==='J'){
        if(p.mode===2)id=dash?'ram':'gatling';
        else if(dash){id=ironWhite(p)?'aegislance':'advance';p.lastDash=-1000;}
        else if(down)id=ironWhite(p)?'bash':'upper';
        else if(!n.grounded){id=(p.airCombo++%2)?'aircross':'air';}
        else{
            if(frames-p.ended>44)p.combo=0;
            const seq=ironWhite(p)?['silvercut','spin','silverbloom','silvercross','sovereign']:['cut','rise','cross','thrust','execution'];
            id=seq[p.combo++%seq.length];
        }
    }else if(key==='K'){
        if(p.mode===2)id=dash?'broadside':charge>=32?'barrage':'truckcannon';
        else if(ironWhite(p))id=dash?'aegiswheel':down?'nova':'throw';
        else id=dash?'rail':!n.grounded&&down?'plunge':charge>=32?'barrage':down?'cleaver':'gun';
    }
    if(id&&ironBegin(id,n)&&p.attack){p.attack.input=key;if(dash&&p.mode!==2)dashVx=0;}
}
// PLAYER_PART_END s22.ironCommand.1

// index.html:115761 · Phạm vi: global
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
    // Q / E: Nếu đang trong đòn tấn công hoặc đang lướt mà bấm Q/E -> TACTICAL MORPH ATTACK (Biến hình Tông Xe hoặc Biến Robot Đập Đất ngay lập tức!)
    if(code==='KeyQ'||code==='KeyE'){
        if(!ironWhite(p)){
            const inAction=!!p.attack||Math.abs(dashVx)>2;
            ironMode(dino,p.mode===2?0:2,inAction);
            if(!inAction)ironLabel(IRON_MODES[p.mode]);
        }
    }
    else if(code==='KeyJ')ironCommand('J');
    else if(code==='KeyK'){p.lastK=frames;if(p.attack)ironCommand('K');else if(frames>=p.guardUntil)p.k=0;}
    else if(code==='KeyI')ironBegin(ironWhite(p)?'nova':'charge');
    else if(code==='KeyO')ironBegin(ironWhite(p)?'sovereign':p.mode===2?'cannon':'cleaver');
    else if(code==='KeyU'){if(ironWhite(p)){if(!p.attack?.move.ultimate){ironCancel();p.guardUntil=-100;ironBegin('ultimate');}}else ironSilverStart();}
    else if(code==='KeyL'&&frames>=p.guardReady&&!p.attack?.move.ultimate){ironCancel();p.guardUntil=frames+(ironWhite(p)?32:26);p.perfectUntil=frames+(ironWhite(p)?9:7);p.guardReady=frames+(ironWhite(p)?38:56);dino.meleeTimer=ironWhite(p)?30:28;dino.parryWindow=ironWhite(p)?9:7;dino.meleeID++;}
    return true;
}
// PLAYER_PART_END s22.ironKey.1

// index.html:115788 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironKeyBase.1 EDITABLE
const ironKeyBase=danteKey;
// PLAYER_PART_END s22.ironKeyBase.1

// index.html:115788 · Phạm vi: global
// PLAYER_PART_BEGIN s22.danteKey.1 EDITABLE
danteKey=function(code,repeat){return ironKey(code,repeat)||ironKeyBase(code,repeat);};
// PLAYER_PART_END s22.danteKey.1

// index.html:115789 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDashBase.1 EDITABLE
const ironDashBase=doDash;
// PLAYER_PART_END s22.ironDashBase.1

// index.html:115790 · Phạm vi: global
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

// index.html:115799 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironGuardBase.1 EDITABLE
const ironGuardBase=Player.prototype.isShielding;
// PLAYER_PART_END s22.ironGuardBase.1

// index.html:115800 · Phạm vi: global
// PLAYER_PART_BEGIN s22.Player.prototype.isShielding.1 EDITABLE
Player.prototype.isShielding=function(){if(ironOn()&&this===dino&&this.ironhaul)return frames<this.ironhaul.guardUntil;return ironGuardBase.call(this);};
// PLAYER_PART_END s22.Player.prototype.isShielding.1

// index.html:115801 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironParryBase.1 EDITABLE
const ironParryBase=shinGuardReset;
// PLAYER_PART_END s22.ironParryBase.1

// index.html:115802 · Phạm vi: global
// PLAYER_PART_BEGIN s22.shinGuardReset.1 EDITABLE
shinGuardReset=function(perfect){const p=ironActive()?dino.ironhaul:null;if(perfect&&p&&p.mode!==2&&frames<p.perfectUntil&&!p.counter){p.counter=frames+8;p.perfectUntil=-100;p.guardReady=frames;}return ironParryBase(perfect);};
// PLAYER_PART_END s22.shinGuardReset.1

// index.html:115803 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironFriendlyRound.1 EDITABLE
function ironFriendlyRound(n,kind,power,tilt=0){
    const p=n.ironhaul,a=p.attack,g=ironGeometry(n),target=ironTarget(n),dir=a?.dir||(n.isFacingLeft?-1:1);
    let source=p.mode===2?{x:n.x+n.w/2+dir*24,y:n.y+n.h-(kind==='bullet'?111:124)*.3}:kind==='shield'?g.shield:kind==='wave'?g.tip:g.gun;
    const aim=Math.atan2((target?target.y+target.h/2:n.y+n.h/2)-source.y,Math.abs((target?target.x+target.w/2:n.x+dir*400)-source.x));
    const white=ironWhite(p);
    // Nếu là `shell_burst` (Nổ pháo Gunblade ở nhát chém thứ 3): Tạo chùm đạn ghém nhiệt tầm gần!
    if(kind==='shell_burst'){
        for(let k=-1;k<=1;k++){
            const ang=k*0.18;
            p.rounds.push({kind:'rail',x:g.grip.x+dir*18,y:g.grip.y,vx:dir*Math.cos(ang)*15,vy:Math.sin(ang)*15,r:7,damage:ironPower(p,power||2,a),age:0,life:18,hit:new Set(),dir,white,ultimate:white||!!a?.move.ultimate});
        }
        p.shells.push({x:g.grip.x,y:g.grip.y,vx:-dir*3,vy:-4,ang:1,t:24});
        p.muzzle=6;SFX.tone(160,.08,'sawtooth',.10,70);
        return;
    }
    const q={kind,x:source.x,y:source.y,vx:dir*Math.cos(aim+tilt)*14.5,vy:Math.sin(aim+tilt)*14.5,r:kind==='bullet'?3.5:kind==='shield'?white?17:14:kind==='wave'?white?25:20:kind==='rail'?11:7,damage:ironPower(p,power||1,a),returnDamage:ironPower(p,2.5,a),age:0,life:kind==='shield'?110:120,hit:new Set(),dir,ultimate:white||!!a?.move.ultimate,white,leg:0};
    if((kind==='bullet'||kind==='rail')&&p.mode!==2){q.vx=Math.cos(g.gunAngle+tilt)*15;q.vy=Math.sin(g.gunAngle+tilt)*15;}
    if(kind==='shell'){
        const tx=target?target.x+target.w/2:source.x+dir*280,ty=target?target.y+target.h/2:source.y+50,T=34;
        q.vx=(tx-source.x)/T;q.vy=(ty-source.y-.18*T*(T+1)/2)/T;
    }
    if(kind==='shield'){q.vx=dir*9.5;q.vy=0;p.shieldOut=110;}
    if(kind==='bullet'||kind==='rail'||kind==='shell'){
        p.shells.push({x:source.x-dir*6,y:source.y,vx:-dir*(2+Math.random()*2),vy:-3-Math.random()*2,ang:Math.random()*6,t:22});
    }
    p.rounds.push(q);p.muzzle=5;SFX.tone(kind==='shell'||kind==='rail'?120:650,.06,'triangle',.07,100);
}
// PLAYER_PART_END s22.ironFriendlyRound.1

// index.html:115830 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironBlast.1 EDITABLE
function ironBlast(n,q){
    const p=n.ironhaul,hit=new Set();for(const o of ironTargets(n)){const root=o.__goc||o;
        if(!hit.has(root)&&Math.hypot(Math.max(o.x,Math.min(q.x,o.x+o.w))-q.x,Math.max(o.y,Math.min(q.y,o.y+o.h))-q.y)<=54){hit.add(root);ironDamage(n,o,q.damage,q);}}
    p.fx.push({x:q.x,y:q.y,r:54,t:18,max:18});shakeTimer=Math.max(shakeTimer,5);q.life=0;
}
// PLAYER_PART_END s22.ironBlast.1

// index.html:115835 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironArea.1 EDITABLE
function ironArea(n,base,radius,a){
    const p=n.ironhaul,x=n.x+n.w/2,y=n.y+n.h-8,damage=ironPower(p,base,a);
    for(const o of ironTargets(n))if(Math.hypot(Math.max(o.x,Math.min(x,o.x+o.w))-x,Math.max(o.y,Math.min(y,o.y+o.h))-y)<=radius)ironDamage(n,o,damage,a);
    p.fx.push({x,y,r:radius,t:25,max:25});shakeTimer=Math.max(shakeTimer,12);SFX.tone(120,.18,'sawtooth',.1,45);
}
// PLAYER_PART_END s22.ironArea.1

// index.html:115840 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironRoundTick.1 EDITABLE
function ironRoundTick(n){
    const p=n.ironhaul;
    const targets=ironTargets(n);
    for(const q of p.rounds){
        q.age++;q.life--;const ox=q.x,oy=q.y;
        if(q.kind==='shell')q.vy+=.18;
        // Tên lửa vòm dẫn đường (Homing Micro-Missile): Bay vọt lên cao trong 10 frame đầu rồi uốn quỹ đạo lao thẳng vào mục tiêu!
        if(q.kind==='missile'){
            q.trail.push({x:ox,y:oy});
            if(q.trail.length>8)q.trail.shift();
            if(!q.target||q.target.hp<=0||q.target.invulnAll){
                q.target=targets.find(o=>!o.invulnAll&&o.hp>0)||null;
            }
            if(q.age>8&&q.target){
                const tx=q.target.x+q.target.w/2,ty=q.target.y+q.target.h/2;
                const desired=Math.atan2(ty-q.y,tx-q.x);
                const cur=Math.atan2(q.vy,q.vx);
                const diff=Math.atan2(Math.sin(desired-cur),Math.cos(desired-cur));
                const nextAng=cur+Math.max(-0.22,Math.min(0.22,diff));
                const spd=Math.min(16,8.5+q.age*0.25);
                q.vx=Math.cos(nextAng)*spd;
                q.vy=Math.sin(nextAng)*spd;
            }
        }
        if(q.kind==='shield'&&q.age===24){q.leg=1;q.hit.clear();q.damage=q.returnDamage;}
        if(q.kind==='shield'&&q.leg){const goal=p.mode===1?ironGeometry(n).shield:{x:n.x+n.w/2,y:n.y+n.h/2},dx=goal.x-q.x,dy=goal.y-q.y,L=Math.hypot(dx,dy)||1;q.vx=dx/L*11;q.vy=dy/L*11;if(L<14)q.life=0;}
        q.x+=q.vx;q.y+=q.vy;const box={x:Math.min(ox,q.x)-q.r,y:Math.min(oy,q.y)-q.r,w:Math.abs(q.x-ox)+q.r*2,h:Math.abs(q.y-oy)+q.r*2};
        if(q.life<=0)continue;
        for(const o of targets){const root=o.__goc||o;if(q.hit.has(root)||!checkAABB(box,o))continue;
            if(q.kind==='shell'){ironBlast(n,q);break;}
            if(q.kind==='missile'){
                ironDamage(n,o,q.damage,q);
                p.fx.push({x:q.x,y:q.y,r:28,t:10,max:10});
                q.life=0;break;
            }
            q.hit.add(root);ironDamage(n,o,q.damage,q);if(q.kind==='bullet'){q.life=0;break;}
        }
        if((q.kind==='shell'||q.kind==='missile')&&q.life>0&&q.vy>0){
            const tops=platforms.filter(pf=>!pf.wall&&pf.solid!==false&&q.x>=pf.x&&q.x<=pf.x+pf.w&&pf.top>=oy-q.r).map(pf=>pf.top);
            const floor=tops.length?Math.min(...tops):coBuc()?Infinity:dkNenY();
            if(q.y+q.r>=floor){
                q.y=floor;
                if(q.kind==='shell')ironBlast(n,q);
                else{p.fx.push({x:q.x,y:q.y,r:24,t:10,max:10});q.life=0;}
            }
        }
    }
    p.rounds=p.rounds.filter(q=>q.life>0);p.shieldOut=p.rounds.some(q=>q.kind==='shield')?1:0;
}
// PLAYER_PART_END s22.ironRoundTick.1

// index.html:115889 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironTick.1 EDITABLE
function ironTick(){
    if(!ironActive())return;const n=dino;if(!n.ironhaul)ironInit(n);const p=n.ironhaul;
    n.parryWindow=Math.max(0,p.perfectUntil-frames);n.meleeTimer=Math.max(0,Math.min(n.meleeTimer,p.guardUntil-frames));if(frames>=p.perfectUntil)n.meleeTimer=Math.min(22,n.meleeTimer);
    if(p.silver>0&&!p.silverFinishing){p.silver--;ultCharge=0;if(!p.silver)ironSilverEnd(n);}
    if(p.novaReady>0)p.novaReady--;
    p.reach=(p.reach??112)+((p.attack?.slash?.reach??112)-(p.reach??112))*.38;
    if(p.core>0)p.core--;if(p.coreReady>0)p.coreReady--;if(p.muzzle>0)p.muzzle--;if(p.transition>0)p.transition--;
    p.fx=p.fx.filter(f=>--f.t>0);
    p.trails=p.trails.filter(f=>--f.t>0);p.ghosts=p.ghosts.filter(f=>--f.t>0);
    p.jets=(p.jets||[]).filter(j=>--j.t>0);
    p.bunkers=(p.bunkers||[]).filter(b=>--b.t>0);
    for(const sh of p.shells||[]){sh.x+=sh.vx;sh.y+=sh.vy;sh.vy+=0.38;sh.ang+=0.35;sh.t--;}
    p.shells=(p.shells||[]).filter(sh=>sh.t>0);

    if(n.grounded)p.airCombo=0;
    if(p.pendingJump){if(frames>p.pendingJump.until)p.pendingJump=null;else if(!n.grounded&&(n.jumpCount||0)>p.pendingJump.jumpCount){const kind=p.pendingJump.kind;ironCancel(n);ironBegin(kind==='J'?(ironWhite(p)?'ascension':'skyripper'):(ironWhite(p)?'starfall':'gunrain'),n);}}
    if(p.k!==null){if(keys.KeyK)p.k=Math.min(90,p.k+1);else{const charge=p.k;p.k=null;ironCommand('K',n,charge);}}
    if(p.counter&&frames>=p.counter){p.counter=0;p.guardUntil=-100;ironBegin('riposte',n);}
    if(!p.attack&&p.mode===2&&keys.KeyJ&&!keys.KeyK&&frames>=p.guardUntil)ironCommand('J',n);
    const a=p.attack;
    if(a){
        a.age++;const m=a.move,old=ironGeometry(n);n.isFacingLeft=a.dir<0;
        // Sinh luồng lửa phản lực (Jet Booster Plume) sau lưng và vai Robot khi tung đòn cơ khí
        if(m.jet&&a.age>=2&&a.age<=m.T-6&&a.age%2===0){
            p.jets.push({
                x:n.x+n.w/2-a.dir*(p.mode===2?36:14),
                y:n.y+(p.mode===2?20:26)+(Math.random()-0.5)*10,
                dir:-a.dir,
                power:m.jet,
                white:ironWhite(p)||p.core>0,
                t:7,max:7
            });
        }
        if(m.jump&&a.age===m.jump[0]){n.dy=m.jump[1];n.grounded=false;}
        if(m.airSlow&&a.age<=m.airSlow&&!n.grounded)n.dy=Math.min(n.dy,.55);
        if(m.plunge&&a.age>=14&&!n.grounded)n.dy=Math.max(14,n.dy);
        if(m.step&&a.age>=m.step[0]&&a.age<=m.step[1]){
            const x=n.x,target=ironTarget(n);let travel=m.step[2];
            if(travel>0&&!m.ram&&target)travel=Math.min(travel,Math.max(0,(target.x+target.w/2-n.x-n.w/2)*a.dir-52));
            n.x=Math.max(worldL(),Math.min(worldR()-n.w,n.x+a.dir*travel));if(mapTheme==='tetris')resolveTetrisWalls(n,n.x-x);else resolveSolidPillars(n);
        }
        for(const beat of m.sword||[])if(a.age===beat[0]){ironCapture(n,6);const [at,kind,reach,life,damage]=beat,angles=kind==='rise'?[.52,-1.9]:kind==='thrust'?[-.12,.08]:[-2.2,.65];a.slash={kind,reach:reach*(ironWhite(p)?1.14:1),life,age:0,a0:angles[0],a1:angles[1],angle:angles[0],damage:ironPower(p,damage+(p.core?1:0),a),hit:new Set()};}
        for(const beat of m.shield||[])if(a.age===beat[0]){ironCapture(n,6);a.shield={kind:beat[1],age:0,life:beat[2],damage:ironPower(p,beat[3],a),hit:new Set()};}
        if(a.slash){const s=a.slash;s.age++;s.angle=s.a0+(s.a1-s.a0)*ironhaulEase(s.age/s.life);}
        if(a.shield)a.shield.age++;

        // Kích hoạt Cọc Thủy Lực Pile Bunker (nếu đòn đánh có thuộc tính `bunker`)
        if(m.bunker){
            for(let bIdx=0;bIdx<m.bunker.length;bIdx+=3){
                if(a.age===m.bunker[bIdx]){
                    ironTriggerBunker(n,m.bunker[bIdx+1],m.bunker[bIdx+2]);
                }
            }
        }
        // Kích hoạt Phóng Tên Lửa Vòm Dẫn Đường (nếu đòn đánh có thuộc tính `missiles`)
        if((m.missiles||[]).includes(a.age)){
            ironSpawnMissiles(n,ironWhite(p)?4:3);
        }

        const g=ironGeometry(n);
        for(const o of ironTargets(n)){const root=o.__goc||o,s=a.slash,h=a.shield;
            if(s&&!s.hit.has(root))for(let k=0;k<=6;k++){const u=k/6;if(sgSegmentBox(ironhaulMix(old.grip.x,g.grip.x,u),ironhaulMix(old.grip.y,g.grip.y,u),ironhaulMix(old.tip.x,g.tip.x,u),ironhaulMix(old.tip.y,g.tip.y,u),o,6)!==null){s.hit.add(root);ironDamage(n,o,s.damage,a);break;}}
            if(h&&!p.shieldOut&&!h.hit.has(root)&&h.age>=h.life*.15&&h.age<=h.life*.92&&(checkAABB(g.shieldBox,o)||sgSegmentBox(old.shield.x,old.shield.y,g.shield.x,g.shield.y,o,10)!==null)){h.hit.add(root);ironDamage(n,o,h.damage,a);}
            if(m.ram&&a.age>=2&&a.age<=26&&!a.hits.has(root)&&checkAABB(n,o)){a.hits.add(root);ironDamage(n,o,6.5,a);}
        }
        if(a.slash){
            p.trails.push({grip:{...old.grip},tip:{...old.tip},toGrip:{...g.grip},toTip:{...g.tip},white:ironWhite(p),core:p.core>0,t:10});
            if((p.core||ironWhite(p))&&a.slash.kind==='thrust'&&a.slash.age===6)ironFriendlyRound(n,'wave',3);
            if(a.slash.age>=a.slash.life){ironCapture(n,8);a.slash=null;}
        }
        if(a.shield&&a.shield.age>=a.shield.life){ironCapture(n,8);a.shield=null;}
        if((m.shots||[]).includes(a.age))ironFriendlyRound(n,m.round,m.power||(m.round==='shield'?4:1));
        // Nạp lõi Overdrive Ignition (I): Kích hoạt ngay ở frame 12 thay vì bắt đứng chờ 72 frames!
        if(a.id==='charge'&&a.age===12){
            p.core=540;
            p.fx.push({x:n.x+n.w/2,y:n.y+24,r:58,t:20,max:20});
            ironLabel('OVERDRIVE CORE · 9 GIÂY');
        }
        if((m.waves||[]).includes(a.age))for(const tilt of m.fan?[-.22,0,.22]:[0])ironFriendlyRound(n,'wave',3.2,tilt);
        if(m.nova&&a.age===m.nova[0])ironArea(n,m.nova[1],m.nova[2],a);
        if(m.plunge&&a.age>=14&&n.grounded&&!a.landed){a.landed=true;ironArea(n,6.5,84,a);ironSpawnMissiles(n,4);}
        if(m.ultimate&&a.age===92)ironArea(n,14,155,a);
        if(m.plunge&&!a.landed&&a.age>=m.T&&!(++a.airWait>90))a.age=m.T-1;
        if(a.age>=m.T){ironCapture(n,8);p.attack=null;p.ended=frames;const queued=p.queue;p.queue=null;if(m.ultimate)ironSilverEnd(n);else if(queued&&frames<=queued.until)ironCommand(queued.key,n,queued.charge,queued.down);}
    }
    const dx=n.x-p.lastX;
    if((Math.abs(dx)>6||p.attack?.move.jet>=3)&&frames%3===0){const b=ironBody(n);b.rigPose=ironhaulRig(b);p.ghosts.push({body:b,t:10});}
    p.ghosts=p.ghosts.slice(-6);p.trails=p.trails.slice(-24);
    ironRoundTick(n);p.speed=(p.speed||0)*.6+dx*.4;p.gait+=Math.abs(dx)*.11;p.lastX=n.x;
}
// PLAYER_PART_END s22.ironTick.1

// index.html:115979 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironCombatBase.1 EDITABLE
const ironCombatBase=danteTick;
// PLAYER_PART_END s22.ironCombatBase.1

// index.html:115979 · Phạm vi: global
// PLAYER_PART_BEGIN s22.danteTick.1 EDITABLE
danteTick=function(){ironCombatBase();ironTick();};
// PLAYER_PART_END s22.danteTick.1

// index.html:115980 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDamageBase.1 EDITABLE
const ironDamageBase=Player.prototype.takeDamage;
// PLAYER_PART_END s22.ironDamageBase.1

// index.html:115981 · Phạm vi: global
// PLAYER_PART_BEGIN s22.Player.prototype.takeDamage.1 EDITABLE
Player.prototype.takeDamage=function(...args){const hp=this.hp,result=ironDamageBase.apply(this,args);if(ironOn()&&this===dino&&this.ironhaul&&this.hp<hp){const p=this.ironhaul,a=p.attack;ironCancel(this);p.counter=0;p.combo=0;if(a?.move.ultimate)ironSilverEnd(this);}return result;};
// PLAYER_PART_END s22.Player.prototype.takeDamage.1

// index.html:115982 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDraw.1 EDITABLE
function ironDraw(n){
    const p=n.ironhaul,b=ironBody(n);
    const cx=n.x+n.w/2,cy=n.y+n.h/2,dir=n.isFacingLeft?-1:1;

    // 1. Vẽ Tàn Ảnh Quang Học (Optical Camo Afterimages) khi lướt phản lực
    for(const f of p.ghosts){
        ctx.save();ctx.globalAlpha=f.t/10*.20;
        ctx.scale(f.body.scale,f.body.scale);
        if(f.body.vehicle)ironhaulTruck(f.body);else ironhaulRobot(f.body);
        ctx.restore();
    }

    // 2. Vẽ Luồng Lửa Động Cơ Phản Lực (Jet Booster Plumes) sau lưng / gầm xe
    for(const j of p.jets||[]){
        const k=j.t/j.max,len=(18+j.power*11)*k;
        ctx.save();
        ctx.translate(j.x,j.y);
        ctx.scale(j.dir,1);
        ctx.globalAlpha=k*0.88;
        const jg=ctx.createLinearGradient(0,0,len,0);
        jg.addColorStop(0,'#FFFFFF');
        jg.addColorStop(0.4,j.white?'#00E5FF':'#FF9100');
        jg.addColorStop(1,'rgba(255, 61, 0, 0)');
        ctx.fillStyle=jg;
        ctx.beginPath();
        ctx.moveTo(0,-4.5*k);
        ctx.lineTo(len,0);
        ctx.lineTo(0,4.5*k);
        ctx.closePath();ctx.fill();
        ctx.restore();
    }

    // 3. Vẽ Dải Năng Lượng Lưỡi Kiếm Nhiệt / Quang Học (Plasma & Aegis Blade Ribbon)
    for(const f of p.trails){
        const k=f.t/10;
        ctx.save();
        ctx.globalAlpha=k*(f.white?.38:f.core?.34:.24);
        ctx.fillStyle=f.white?'#80D8FF':f.core?'#FF6D00':'#FFAB40';
        ctx.strokeStyle=f.white?'#E0F7FA':'#FFF8E1';
        ctx.lineWidth=2.0*k;
        ctx.beginPath();
        ctx.moveTo(f.grip.x,f.grip.y);
        ctx.lineTo(f.tip.x,f.tip.y);
        ctx.lineTo(f.toTip.x,f.toTip.y);
        ctx.lineTo(f.toGrip.x,f.toGrip.y);
        ctx.closePath();
        ctx.fill();ctx.stroke();
        ctx.restore();
    }

    // 4. Hào quang Lõi Overdrive & Silver Aegis dưới chân Robot
    if(ironWhite(p)||p.core>0){
        ctx.save();
        ctx.globalAlpha=.25;
        ctx.strokeStyle=ironWhite(p)?'#00E5FF':'#FF9100';
        ctx.lineWidth=2.2;
        ctx.beginPath();
        ctx.ellipse(cx,n.y+n.h-4,34+Math.sin(frames*.12)*3,8,0,0,7);
        ctx.stroke();
        ctx.restore();
    }

    // 5. Vẽ Khung Gầm Robot / Thiết Xa Ironhaul + Cánh Phễu Năng Lượng (Aegis Floating Funnels)
    ctx.save();
    if(n.invincible&&frames%6<3)ctx.globalAlpha=.45;
    ctx.scale(b.scale,b.scale);
    if(b.vehicle)ironhaulTruck(b);else{ironhaulRobot(b);ironhaulCoreFx(b);}
    ctx.restore();

    // Vẽ 4 Phễu Chiến Đấu Bay Lơ Lửng Sau Vai (Floating Aegis Bit Funnels) khi bật Silver Aegis hoặc Overdrive Core!
    if(p.mode!==2&&(ironWhite(p)||p.core>0)){
        ctx.save();
        const funnelCount=ironWhite(p)?4:2;
        for(let i=0;i<funnelCount;i++){
            const side=i%2===0?-1:1;
            const tier=Math.floor(i/2);
            const hover=Math.sin(frames*0.12+i*1.4)*3.5;
            const fx=cx-dir*(18+tier*10),fy=n.y+12+tier*14+hover;
            ctx.save();
            ctx.translate(fx,fy);
            ctx.rotate(dir*(0.22-tier*0.12));
            ctx.fillStyle=ironWhite(p)?'#E0F7FA':'#37474F';
            ctx.strokeStyle=ironWhite(p)?'#00E5FF':'#FF9100';
            ctx.lineWidth=1.5;
            ctx.beginPath();
            ctx.moveTo(dir*10,0);ctx.lineTo(-dir*6,-4.5);ctx.lineTo(-dir*4,0);ctx.lineTo(-dir*6,4.5);
            ctx.closePath();ctx.fill();ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
    }

    // 6. Vẽ Mũi Đột Cọc Thủy Lực Nổ (Pile Bunker Piston Spike & Shock Rings)
    for(const bk of p.bunkers||[]){
        const k=bk.t/bk.max;
        ctx.save();
        ctx.globalAlpha=k;
        // Lõi cọc thép nung đỏ/trắng phóng thẳng ra từ cánh tay
        ctx.strokeStyle=bk.white?'#00E5FF':'#FF6D00';
        ctx.lineWidth=9*k;ctx.lineCap='round';
        ctx.beginPath();ctx.moveTo(bk.x,bk.y);ctx.lineTo(bk.ex,bk.ey);ctx.stroke();
        ctx.strokeStyle='#FFFFFF';
        ctx.lineWidth=3.5*k;
        ctx.beginPath();ctx.moveTo(bk.x,bk.y);ctx.lineTo(bk.ex,bk.ey);ctx.stroke();
        // 2 Vòng nén khí siêu âm (Sonic Rings) nở rộng dọc trục đâm
        for(const rPos of [0.45,0.82]){
            const rx=bk.x+(bk.ex-bk.x)*rPos,ry=bk.y+(bk.ey-bk.y)*rPos;
            ctx.strokeStyle=bk.white?'#E0F7FA':'#FFE082';
            ctx.lineWidth=2.2*k;
            ctx.beginPath();
            ctx.ellipse(rx,ry,5,18*(1.2-0.3*k),0,0,7);
            ctx.stroke();
        }
        ctx.restore();
    }

    // 7. Vẽ Vỏ Đạn Đồng Văng Ra (Ejected Brass Casings)
    for(const sh of p.shells||[]){
        ctx.save();
        ctx.translate(sh.x,sh.y);
        ctx.rotate(sh.ang);
        ctx.globalAlpha=Math.min(1,sh.t/10);
        ctx.fillStyle='#FFD54F';
        ctx.fillRect(-2.5,-1.2,5,2.4);
        ctx.restore();
    }

    // 8. Hiệu ứng lắp ghép giáp cơ khí khi chuyển đổi Robot <-> Truck
    if(p.transition){
        ctx.save();ctx.globalAlpha=p.transition/16*.6;ctx.strokeStyle=p.mode===1?'#d2fcff':'#9bcee5';ctx.lineWidth=2;
        const u=1-p.transition/16;
        for(let i=0;i<8;i++){const a=i*Math.PI/4,R=18+u*28,x=cx+Math.cos(a)*R,y=cy+Math.sin(a)*R;ctx.save();ctx.translate(x,y);ctx.rotate(a+u);ctx.strokeRect(-4,-7,8,14);ctx.restore();}
        ctx.restore();
    }

    // 9. Vẽ Đạn Pháo, Railgun, Khiên Bay & Tên Lửa Vòm Dẫn Đường (Homing Micro-Missiles)
    for(const q of p.rounds){
        ctx.save();
        if(q.kind==='missile'){
            // Vệt khói tên lửa vòm uốn cong
            ctx.lineCap='round';
            for(let i=1;i<q.trail.length;i++){
                const u=i/q.trail.length;
                ctx.globalAlpha=u*0.55;
                ctx.strokeStyle=q.white?'#80D8FF':'#FFAB40';
                ctx.lineWidth=2.5*u;
                ctx.beginPath();ctx.moveTo(q.trail[i-1].x,q.trail[i-1].y);ctx.lineTo(q.trail[i].x,q.trail[i].y);ctx.stroke();
            }
            ctx.globalAlpha=1;
            ctx.translate(q.x,q.y);
            ctx.rotate(Math.atan2(q.vy,q.vx));
            ctx.fillStyle='#ECEFF1';
            ctx.beginPath();ctx.moveTo(7,0);ctx.lineTo(-4,-3);ctx.lineTo(-4,3);ctx.closePath();ctx.fill();
            ctx.fillStyle=q.white?'#00E5FF':'#FF3D00';
            ctx.fillRect(-7,-2,3,4);
        }else{
            ctx.translate(q.x,q.y);ctx.fillStyle=q.white?'#bbfaff':'#ffda98';ctx.strokeStyle='#ecfbff';ctx.lineWidth=2;
            if(q.kind==='shield'){ctx.rotate(q.age*.32);ironhaulPolygon([[-12,-10],[0,-15],[13,-9],[13,9],[0,16],[-12,9]],'#dcebf3','#a4efff');}
            else if(q.kind==='wave'){ctx.rotate(Math.atan2(q.vy,q.vx));ctx.beginPath();ctx.arc(-8,0,q.r,-1.2,1.2);ctx.lineWidth=q.white?9:7;ctx.stroke();}
            else if(q.kind==='rail'){ctx.rotate(Math.atan2(q.vy,q.vx));ctx.fillRect(-24,-5,48,10);ctx.fillStyle='#fff';ctx.fillRect(-18,-2,38,4);}
            else{ctx.rotate(Math.atan2(q.vy,q.vx));ctx.beginPath();ctx.ellipse(0,0,q.r*1.6,q.r,0,0,7);ctx.fill();}
        }
        ctx.restore();
    }

    // 10. Tâm Ngắm Khóa Mục Tiêu Cơ Khí (Mecha HUD Target Reticle)
    const lockTarget=ironTarget(n);
    if(lockTarget){
        const tx=lockTarget.x+lockTarget.w/2,ty=lockTarget.y+lockTarget.h/2;
        ctx.save();
        ctx.translate(tx,ty);
        ctx.rotate(frames*0.04);
        ctx.globalAlpha=0.52;
        ctx.strokeStyle=ironWhite(p)?'#00E5FF':'#FFAB40';
        ctx.lineWidth=1.6;
        const r=18+Math.sin(frames*0.15)*2;
        for(let i=0;i<4;i++){
            ctx.rotate(Math.PI/2);
            ctx.beginPath();ctx.moveTo(r-5,-r);ctx.lineTo(r,-r);ctx.lineTo(r,-r+5);ctx.stroke();
        }
        ctx.restore();
    }

    for(const f of p.fx){ctx.save();ctx.globalAlpha=f.t/f.max;ctx.strokeStyle='#b4f5ff';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(f.x,f.y,f.r*(1-f.t/f.max*.6),f.r*.5*(1-f.t/f.max*.6),0,0,7);ctx.stroke();ctx.restore();}
    if(frames<p.guardUntil){ctx.save();ctx.strokeStyle=frames<p.perfectUntil?'#fff6c4':'#9de8ff';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(cx,cy,n.w*.82,n.h*.6,0,0,7);ctx.stroke();ctx.restore();}
    if(p.k!==null){ctx.save();ctx.strokeStyle=p.k>=32?'#fff5b5':'#80ddff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,26,0,Math.PI*2*Math.min(1,p.k/32));ctx.stroke();ctx.restore();}
}
// PLAYER_PART_END s22.ironDraw.1

// index.html:116169 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDrawBase.1 EDITABLE
const ironDrawBase=Player.prototype.draw;
// PLAYER_PART_END s22.ironDrawBase.1

// index.html:116169 · Phạm vi: global
// PLAYER_PART_BEGIN s22.Player.prototype.draw.1 EDITABLE
Player.prototype.draw=function(...args){if(ironOn()&&this===dino&&this.ironhaul){ironDraw(this);return;}return ironDrawBase.apply(this,args);};
// PLAYER_PART_END s22.Player.prototype.draw.1

// index.html:116170 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironPlayerPreview.1 EDITABLE
function ironPlayerPreview(x,feet){
    for(const mode of [0,1,2]){
        const cx=x+(mode-1)*90,w=mode===2?86:40,h=mode===2?34:68;
        const sample={x:cx-w/2,y:feet-h,w,h,isFacingLeft:false,grounded:true,ironhaul:{mode,attack:null,core:0,muzzle:0,shieldOut:0,gait:frames*.025,lastX:cx-w/2}};
        const b=ironBody(sample);ctx.save();ctx.scale(b.scale,b.scale);if(b.vehicle)ironhaulTruck(b);else ironhaulRobot(b);ctx.restore();
    }
}
// PLAYER_PART_END s22.ironPlayerPreview.1

// index.html:116177 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironUiBase.1 EDITABLE
const ironUiBase=drawUI;
// PLAYER_PART_END s22.ironUiBase.1

// index.html:116178 · Phạm vi: global
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

// index.html:116186 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironMenuBase.1 EDITABLE
const ironMenuBase=drawCustomMenu;
// PLAYER_PART_END s22.ironMenuBase.1

// index.html:116187 · Phạm vi: global
// PLAYER_PART_BEGIN s22.drawCustomMenu.1 EDITABLE
drawCustomMenu=function(){
    ironMenuBase();if(!ironOn()||runePicker!==null||battuMa||runeXem||ammoPicker||cusNCPicker||ammoXem!==null)return;
    ctx.save();ctx.fillStyle='#10212e';ctx.fillRect(24,76,276,452);ctx.fillRect(702,80,272,436);ctx.textAlign='left';ctx.fillStyle='#b1edff';ctx.font='bold 21px Consolas';ctx.fillText('IRONHAUL · MECHA',38,108);ctx.fillText('SILVER AEGIS · ULT',716,111);ctx.font='12px Consolas';ctx.fillStyle='#dbeaf2';
    apexWrap('CƠ GIÁP CHIẾN THUẬT (HEAVY MECHA)\n\n• J ×5: Kiếm Nhiệt → Nổ Cò Súng →\n  Đột Cọc Thủy Lực (Pile Bunker)!\n• Đang chém J bấm K: Pháo Kích\n  Gunblade & Đóng Cọc Cận Chiến!\n• K: Súng máy / Giữ K: Mưa Tên Lửa\n  Vòm Dẫn Đường (Valkyrie Pods)\n• Dash J: Đột kích phản lực + Cọc\n• Dash K: Pháo Điện Từ (Railgun)\n• J/K + Dash: Lùi bắn & Phóng tên lửa\n• Q/E khi đang đánh: BIẾN HÌNH\n  TÔNG XE / ĐẬP ĐẤT TỨC THÌ!\n• I: Nổ Lõi Overdrive tức thì + Tên lửa\n• O: Đột Cọc Thủy Lực Cực Đại\n• L: Khiên Từ Trường (Perfect -> Phản)',38,140,248,18);
    apexWrap('SILVER AEGIS (OVERDRIVE 12 GIÂY)\nTriệu hồi Phễu Bay (Bit Funnels) &\nSát thương ×1.5 +1; Kiếm Quang Học.\n\n• J ×5: Quang Trảm → Khiên Xoay →\n  Cross Requiem → Sovereign Array\n  (Bão Kiếm Khí & Mưa Tên Lửa!)\n• Dash J: Thương Ánh Sáng + Cọc Nổ\n• Dash K: Song Luân Khiên + Tên Lửa\n• J/K Jump: Không Chiến Tên Lửa\n• Cúi K / I: Vụ Nổ Lõi Quang Học\n• O: Sovereign Array (Bão Kiếm Khí)\n\n• U LẦN NỮA: AEGIS BREAKER\n  Dồn năng lượng còn lại kích nổ\n  toàn màn hình + Mưa Tên Lửa!',716,142,246,17);ctx.restore();
};
// PLAYER_PART_END s22.drawCustomMenu.1

// index.html:116193 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironGuardMenuBase.1 EDITABLE
const ironGuardMenuBase=drawCustomMenu;
// PLAYER_PART_END s22.ironGuardMenuBase.1

// index.html:116193 · Phạm vi: global
// PLAYER_PART_BEGIN s22.drawCustomMenu.2 EDITABLE
drawCustomMenu=function(){ironGuardMenuBase();if(!ironOn()||runePicker!==null||battuMa||runeXem||ammoPicker||cusNCPicker||ammoXem!==null)return;ctx.save();ctx.fillStyle='#120c06';ctx.fillRect(334,388,338,78);ctx.font='bold 13px Consolas';ctx.fillStyle='#b1edff';ctx.textAlign='left';ctx.fillText('GUARD',340,410);ctx.textAlign='center';ctx.fillText('PARRY / COUNTER',548,410);ctx.textAlign='left';ctx.font='11px Consolas';ctx.fillStyle='#90aebe';ctx.fillText('L: Perfect 7f / Silver 9f → phản kích',340,439);ctx.restore();};
// PLAYER_PART_END s22.drawCustomMenu.2

// index.html:116194 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironUltBusyBase.1 EDITABLE
const ironUltBusyBase=dojoUltBusy;
// PLAYER_PART_END s22.ironUltBusyBase.1
