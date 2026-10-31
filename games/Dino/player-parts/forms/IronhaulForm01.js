// PLAYER_FILE: IronhaulForm01
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CM, FloatingText, IronhaulBoss, Player, SFX, X_N_DANG, bosses, checkAABB, coBuc, combatStance, currentAmmoType, currentPower, danteKey, dashCd, dashVx, dino, dkNenY, doDash, dojoMode, floatingTexts, frames, gameOver, gameState, gameVictory, ironhaulEase, ironhaulIK, ironhaulMix, ironhaulRig, ironhaulWeapons, keys, mapTheme, paused, phuKien, platforms, resolveSolidPillars, resolveTetrisWalls, runeSlots, sgDamage, sgSegmentBox, sgTargets, shakeTimer, shinGuardReset, startGame, ultCharge, worldL, worldR, xDatForm, xDongBo, xFormIdx, xFormOn
// index.html:115486 · Phạm vi: global
// PLAYER_PART_BEGIN s22.IRON_ROBOT_W.1 EDITABLE
const IRON_ROBOT_W=46,IRON_ROBOT_H=78,IRON_ROBOT_CROUCH=55,IRON_ROBOT_SCALE=.44;
// PLAYER_PART_END s22.IRON_ROBOT_W.1

// index.html:115487 · Phạm vi: global
// PLAYER_PART_BEGIN s22.IRON_DRIVE_MAX.1 EDITABLE
const IRON_DRIVE_MAX=12,IRON_DRIVE_RUNUP=6*CM;
// PLAYER_PART_END s22.IRON_DRIVE_MAX.1

// index.html:115488 · Phạm vi: global
// PLAYER_PART_BEGIN s22.IRON_FORM.1 EDITABLE
const IRON_FORM=11,IRON_MODES=['GUNBLADE','SILVER AEGIS','TRUCK'];
// PLAYER_PART_END s22.IRON_FORM.1

// index.html:115489 · Phạm vi: global
// PLAYER_PART_BEGIN s22.IRON_PLAYER_MOVES.1 EDITABLE
const IRON_PLAYER_MOVES={
    // =========================================================================
    // 1. COMBO A CƠ KHÍ BÁM ĐẤT (J × 5):
    // Chém nhiệt -> Đâm phản lực + Khiên húc -> Song trảm + Nổ cò
    // -> Bổ kiếm -> Đột cọc thủy lực kết chuỗi.
    // =========================================================================
    cut:{
        name:'GUNBLADE · CHÉM NHIỆT I',T:18,cancel:10,state:'ih_combo',offset:18,
        sword:[[4,'cut',148,10,3]],step:[2,10,4.2],
        motion:'lean_cut',jet:1
    },
    rise:{
        name:'JET THRUST · ĐÂM LAO PHẢN LỰC II',T:20,cancel:11,state:'ih_advance',offset:42,
        shield:[[3,'bash',10,1.5]],sword:[[5,'thrust',182,11,3.5]],bunker:[6,94,2.5],step:[1,12,8.5],
        motion:'deep_thrust',jet:2
    },
    cross:{
        name:'GUNBLADE · SONG TRẢM & NỔ CÒ III',T:28,cancel:18,state:'ih_upper',offset:10,
        sword:[[6,'rise',162,11,2.8],[15,'cut',168,11,2.8]],shots:[16],round:'shell_burst',power:2.5,step:[2,18,5.5],
        motion:'jump_spin',jet:2
    },
    thrust:{
        name:'PILE CLEAVER · BỔ KIẾM ĐÓNG CỌC IV',T:32,cancel:21,state:'ih_skyfall',offset:0,
        sword:[[15,'cut',188,14,5]],bunker:[17,102,4],step:[2,20,6.5],finish:true,
        motion:'front_flip',jet:3
    },
    execution:{
        name:'FULL BURN · ĐỘT CỌC PHÁ GIÁP V',T:38,cancel:26,state:'ih_reversal',offset:15,
        shield:[[6,'spin',18,3]],sword:[[16,'thrust',205,15,6.5]],bunker:[16,125,5],waves:[16],step:[3,20,8],finish:true,
        motion:'spin_bunker',jet:3
    },

    // =========================================================================
    // 2. NHÁNH COMBO B CƠ KHÍ & ĐẤU Vật MECHA (Đang đánh J bấm K):
    // - Nhịp 1/2 + K: LỘN NGƯỢC BẮN PHÁO RAILGUN & ĐÓNG CỌC (Backflip Gun-Slash)
    // - Nhịp 3/4 + K: NHẢY ĐẠP VAI KẺ ĐỊCH & NÃ ĐẠN GHÉM TẦM GẦN (Vault Kick & Point-Blank Blast)
    // =========================================================================
    gunslash:{
        name:'GUNSLASH · LÙI BẮN PHẢN KÍCH',T:30,cancel:18,state:'ih_gunblade',offset:14,
        sword:[[6,'thrust',172,11,3.5]],bunker:[7,108,4],shots:[8,14],round:'rail',power:3.2,step:[3,15,-6],followJ:'pursuit',link:10,
        motion:'back_flip',jet:3
    },
    upper:{
        name:'BOOSTER · CHÉM HẤT PHẢN LỰC',T:28,cancel:16,state:'ih_upper',offset:18,
        jump:[10,-7.2],sword:[[7,'rise',168,14,4.2]],step:[2,14,4.5],finish:true,
        motion:'back_flip_up',jet:3
    },
    advance:{
        name:'PIERCING DRILL · KHOAN PHẢN LỰC ĐÂM XUYÊN',T:36,cancel:24,state:'ih_advance',offset:22,
        shield:[[5,'bash',14,2.5]],sword:[[10,'thrust',190,12,4],[20,'thrust',200,13,5]],bunker:[10,95,3,20,115,4.5],step:[1,24,10],
        motion:'drill_rush',jet:3
    },
    cleaver:{
        name:'PILE DRIVER · BỔ KIẾM ĐÓNG CỌC',T:40,cancel:28,state:'ih_cleaver',offset:10,
        sword:[[14,'cut',190,14,5],[25,'thrust',202,14,6]],bunker:[15,102,4,25,124,5],step:[2,22,7],finish:true,
        motion:'front_flip',jet:3
    },

    // =========================================================================
    // 3. HỆ THỐNG HỎA LỰC TẦM XA & KHÔNG KÍCH NHÀO LỘN:
    // =========================================================================
    gun:{name:'AUTOCANNON · XẠ KÍCH LIÊN THANH',T:20,cancel:12,state:'ih_barrage',offset:22,shots:[4,8,12],round:'bullet',power:1.5,motion:'recoil_stance'},
    cannon:{name:'SIEGE RAILGUN · PHÁO ĐIỆN TỪ',T:34,cancel:22,state:'ih_barrage',offset:8,shots:[12],round:'rail',power:7.5,step:[10,16,-3.5],motion:'heavy_recoil',jet:2},
    barrage:{name:'VALKYRIE PODS · MƯA TÊN LỬA DẪN ĐƯỜNG',T:40,cancel:25,state:'ih_barrage',offset:8,shots:[9,15,21],missiles:[13],round:'shell',power:3,motion:'recoil_stance',jet:2},

    air:{
        name:'AERIAL LANCE · KHÔNG KÍCH ĐÂM XUYÊN',T:22,cancel:13,state:'ih_advance',offset:42,
        sword:[[6,'thrust',172,12,4]],bunker:[7,96,3.5],step:[2,12,5.5],airSlow:24,
        motion:'air_lance',jet:2
    },
    aircross:{
        name:'AERIAL · SONG TRẢM',T:30,cancel:18,state:'ih_upper',offset:0,
        sword:[[6,'cut',165,11,3.5],[16,'rise',172,12,4]],airSlow:30,
        motion:'front_flip',jet:3
    },
    plunge:{
        name:'METEOR DROP · ĐÓNG CỌC',T:48,cancel:32,state:'ih_skyfall',offset:0,
        sword:[[14,'cut',190,18,6.5]],bunker:[16,115,4.5],plunge:true,finish:true,
        motion:'dive_flip',jet:3
    },

    // =========================================================================
    // 4. CƠ ĐỘNG NHÀO LỘN CHIẾN THUẬT (J/K + DASH & JUMP):
    // =========================================================================
    recoil:{
        name:'VAULT STAB · LỘN LÊN ĐÂM XUỐNG',T:48,cancel:40,state:'ih_skyfall',offset:0,
        jump:[2,-7.8],sword:[[20,'downthrust',180,14,4.5]],step:[2,16,8],diveAt:16,waitLand:true,followJ:'pursuit',link:34,
        motion:'vault_stab',jet:3
    },
    pursuit:{
        name:'REAR REAVER · VÒNG LƯNG XOAY TRẢM',T:42,cancel:36,state:'ih_reversal',offset:0,
        sword:[[18,'spin',175,16,6]],flank:true,finish:true,motion:'rear_spin',jet:3
    },
    lowcut:{name:'LOW REAVER · CHÉM QUÉT TẦM CÚI',T:28,cancel:18,state:'ih_combo',offset:18,sword:[[7,'low',155,14,4]],low:true,motion:'low_cut'},
    rail:{name:'SLIDING RAILGUN · TRƯỢT BẮN XUYÊN GIÁP',T:34,cancel:22,state:'ih_gunblade',offset:14,shots:[10,18],round:'rail',power:4.5,step:[2,16,6],motion:'low_slide',jet:2},
    gunvault:{
        name:'THRUSTER VAULT · BẬT NHẢY BẮN TRẢ',T:40,cancel:26,state:'ih_gunblade',offset:10,
        shots:[10,18,26],missiles:[20],round:'bullet',power:2,jump:[2,-6],step:[1,16,-4.5],followK:'rail',link:12,
        motion:'back_flip',jet:3
    },
    skyripper:{
        name:'SKY RIPPER · THĂNG THIÊN LIÊN TRẢM',T:48,cancel:34,state:'ih_upper',offset:0,
        sword:[[8,'rise',168,14,4],[20,'cut',175,13,4],[32,'thrust',188,14,5]],bunker:[33,108,4],airSlow:44,finish:true,
        motion:'front_flip',jet:3
    },
    gunrain:{
        name:'AERIAL SALVO · PHÁO KÍCH TRÊN KHÔNG',T:44,cancel:28,state:'ih_barrage',offset:10,
        shots:[8,16,24,32],round:'bullet',power:2,airSlow:42,
        motion:'back_flip',jet:3
    },

    // =========================================================================
    // 5. DẠNG CHIẾN XA BỌC THÉP (ARMORED ASSAULT TRUCK & MORPH):
    // =========================================================================
    gatling:{name:'VULCAN ROTARY · SÚNG MÁY HẠNG NẶNG',T:12,cancel:8,state:'ih_gatling',offset:22,shots:[3,7],round:'bullet',power:1.2},
    truckcannon:{name:'SIEGE HOWITZER · PHÁO ĐỘI HÌNH & TÊN LỬA',T:32,cancel:20,state:'ih_cannon',offset:18,shots:[10],missiles:[14],round:'shell',power:5.5},
    ram:{name:'NITRO BULLDOZER · THIẾT XA CÀN QUÉT',T:32,cancel:20,state:'ih_ram',offset:0,ram:true,finish:true,jet:3},
    broadside:{name:'DRIFT BROADSIDE · XẠ KÍCH CƠ ĐỘNG',T:40,cancel:26,state:'ih_cannon',offset:10,shots:[8,18,28],missiles:[22],round:'shell',power:3.5,jet:2},
    morphslam:{
        name:'TACTICAL MORPH · BIẾN ROBOT ĐÓNG CỌC',T:32,cancel:20,state:'ih_cleaver',offset:10,
        sword:[[12,'cut',192,15,6]],bunker:[13,115,4.5],step:[1,16,8],finish:true,
        motion:'front_flip',jet:3
    },

    // =========================================================================
    // 6. DẠNG SILVER AEGIS (OVERDRIVE MECHA — ĐÂM THƯƠNG ÁNH SÁNG, NHÀO LỘN QUANG TRẢM):
    // =========================================================================
    silvercut:{name:'AEGIS · QUANG TRẢM I',T:18,cancel:10,state:'ih_silvercombo',offset:16,sword:[[4,'cut',170,11,3.5]],step:[2,10,4.5],motion:'lean_cut',jet:2},
    spin:{name:'AEGIS · ĐÂM THƯƠNG & KHIÊN XOÁY II',T:22,cancel:13,state:'ih_silvercombo',offset:40,shield:[[4,'spin',16,3.5]],sword:[[8,'thrust',195,11,4]],step:[2,12,7.5],motion:'deep_thrust',jet:2},
    silverbloom:{name:'AEGIS · SONG KHIÊN TRẢM III',T:30,cancel:19,state:'ih_silvercombo',offset:0,shield:[[5,'spin',20,4]],sword:[[14,'rise',200,14,5]],waves:[14],step:[2,16,6],motion:'jump_spin',jet:3},
    silvercross:{name:'AEGIS · CROSS REQUIEM IV',T:34,cancel:22,state:'ih_cross',offset:46,sword:[[8,'rise',205,13,5],[20,'cut',215,14,6]],waves:[12,22],step:[2,18,6.5],motion:'front_flip',jet:3},
    silverfinish:{name:'AEGIS · PHÁN QUYẾT',T:26,cancel:16,state:'ih_silvercombo',offset:79,sword:[[7,'rise',190,14,5.5]],waves:[9],finish:true,motion:'lean_cut',jet:3},
    sovereign:{
        name:'SOVEREIGN ARRAY · BÃO KIẾM KHÍ',T:54,cancel:38,state:'ih_reversal',offset:0,
        shield:[[8,'spin',20,4]],sword:[[22,'thrust',225,14,6.5],[38,'cut',230,15,7.5]],bunker:[22,130,5],waves:[14,26,40],missiles:[12,26],fan:true,finish:true,
        motion:'spin_bunker',jet:3
    },

    throw:{name:'AEGIS BOOMERANG · PHI KHIÊN CẮT',T:26,cancel:15,state:'ih_aegis',offset:18,shots:[7],round:'shield',power:4.5,motion:'lean_cut'},
    bash:{name:'AEGIS BUNKER · ĐỘT KÍCH PHÁ THẾ',T:24,cancel:15,state:'ih_riposte',offset:14,shield:[[6,'bash',14,5]],bunker:[7,112,4.5],step:[1,12,7.5],finish:true,motion:'deep_thrust',jet:2},
    shieldrush:{name:'AEGIS VANGUARD · KHIÊN ĐỘT KÍCH',T:38,cancel:25,state:'ih_shieldrush',offset:15,shield:[[6,'bash',14,3.5]],sword:[[20,'thrust',200,14,6]],step:[1,20,9],finish:true,motion:'drill_rush',jet:3},
    reversal:{name:'AEGIS REVERSAL · XOAY KHIÊN ĐÂM XUYÊN',T:42,cancel:28,state:'ih_reversal',offset:15,shield:[[6,'spin',18,3.5]],sword:[[24,'thrust',205,14,6.5]],waves:[24],finish:true,motion:'spin_bunker',jet:2},
    riposte:{name:'AEGIS COUNTER · PHẢN KÍCH',T:34,cancel:22,state:'ih_riposte',offset:8,shield:[[8,'bash',14,4]],sword:[[18,'cut',200,14,6.5]],bunker:[18,120,5],waves:[18],step:[2,16,8],finish:true,motion:'front_flip',jet:3},

    aegislance:{
        name:'AEGIS METEOR LANCE · THƯƠNG ÁNH SÁNG XUYÊN PHÁ',T:44,cancel:30,state:'ih_shieldrush',offset:0,
        shield:[[6,'bash',14,5]],sword:[[18,'thrust',235,13,7],[32,'rise',225,13,6]],bunker:[18,135,5],step:[1,22,10.5],waves:[20],finish:true,
        motion:'drill_rush',jet:3
    },
    aegisorbit:{
        name:'AEGIS ORBIT · LÙI KHIÊN PHẢN LỰC',T:38,cancel:24,state:'ih_reversal',offset:0,
        shield:[[6,'spin',20,5]],sword:[[22,'thrust',215,14,6]],waves:[22],step:[1,14,-6],followJ:'aegislance',link:12,
        motion:'back_flip',jet:3
    },
    aegiswheel:{name:'TWIN AEGIS WHEELS · SONG LUÂN KHIÊN',T:38,cancel:24,state:'ih_aegis',offset:12,shots:[8,18],missiles:[10],round:'shield',power:5,dual:true,motion:'lean_cut',jet:2},
    aegisvault:{
        name:'AEGIS VAULT · KHÔNG CHIẾN QUANG TRẢM',T:46,cancel:30,state:'ih_reversal',offset:0,
        shield:[[8,'spin',20,5]],sword:[[26,'cut',220,15,7]],jump:[2,-6.5],waves:[24],followK:'aegiswheel',link:14,
        motion:'back_flip',jet:3
    },
    ascension:{
        name:'AEGIS ASCENSION · THĂNG THIÊN',T:52,cancel:36,state:'ih_upper',offset:0,
        sword:[[8,'rise',205,14,5],[22,'cut',215,14,6],[36,'thrust',230,14,7]],bunker:[36,120,4.5],airSlow:46,waves:[26,38],finish:true,
        motion:'front_flip',jet:3
    },
    starfall:{
        name:'AEGIS STARFALL · MƯA SAO BĂNG',T:52,cancel:36,state:'ih_upper',offset:0,
        sword:[[12,'cut',210,14,6]],shield:[[26,'spin',20,5]],airSlow:48,waves:[18,30,42],missiles:[14,28],fan:true,
        motion:'back_flip',jet:3
    },

    charge:{name:'OVERDRIVE IGNITION · NỔ LÕI TỨC THÌ',T:30,cancel:18,state:'ih_overcharge',offset:0,nova:[10,6,92],missiles:[16],motion:'power_stance',jet:3},
    nova:{name:'CORE ASCENSION · VỤ NỔ LÕI QUANG HỌC',T:42,cancel:26,state:'ih_overcharge',offset:0,shield:[[12,'spin',20,5]],nova:[16,14,125],waves:[18,30],fan:true,motion:'power_stance',jet:3},
    ultimate:{name:'AEGIS BREAKER · FINAL DISCHARGE',T:108,state:'ih_reversal',offset:0,jump:[18,-9.5],shield:[[14,'spin',22,4]],sword:[[36,'rise',220,15,6],[62,'cut',240,18,7.5]],bunker:[64,145,6],waves:[38,64],missiles:[16,34,52],ultimate:true,motion:'front_flip',jet:3}
};
// PLAYER_PART_END s22.IRON_PLAYER_MOVES.1

// index.html:115664 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironForm.1 EDITABLE
let ironForm=false,ironLoadout=null;
// PLAYER_PART_END s22.ironForm.1

// index.html:115665 · Phạm vi: global
// PLAYER_PART_BEGIN s22.TryStatement.1 EDITABLE
try{ironForm=localStorage.getItem('dino_ironhaul_form')==='1';}catch(e){}
// PLAYER_PART_END s22.TryStatement.1

// index.html:115666 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironOn.1 EDITABLE
function ironOn(){return ironForm&&gameState!=='pvp';}
// PLAYER_PART_END s22.ironOn.1

// index.html:115667 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironActive.1 EDITABLE
function ironActive(n=dino){return ironOn()&&n===dino&&n.hp>0&&['normal','boss_rush','test_boss'].includes(gameState);}
// PLAYER_PART_END s22.ironActive.1

// index.html:115668 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSync.1 EDITABLE
function ironSync(){
    if(ironOn()){
        if(!ironLoadout)ironLoadout={power:currentPower,ammo:currentAmmoType,accessory:phuKien,stance:combatStance,runes:runeSlots.slice()};
        currentPower=0;currentAmmoType=0;phuKien=0;combatStance=0;runeSlots=[null,null];
    }else if(ironLoadout){const s=ironLoadout;currentPower=s.power;currentAmmoType=s.ammo;phuKien=s.accessory;combatStance=s.stance;runeSlots=s.runes.slice();ironLoadout=null;}
}
// PLAYER_PART_END s22.ironSync.1

// index.html:115674 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSetBase.1 EDITABLE
const ironSetBase=xDatForm;
// PLAYER_PART_END s22.ironSetBase.1

// index.html:115675 · Phạm vi: global
// PLAYER_PART_BEGIN s22.xDatForm.1 EDITABLE
xDatForm=function(i){const next=((i%X_N_DANG)+X_N_DANG)%X_N_DANG;ironForm=false;ironSync();ironSetBase(next===IRON_FORM?0:next);ironForm=next===IRON_FORM;ironSync();try{localStorage.setItem('dino_ironhaul_form',ironForm?'1':'0');}catch(e){}};
// PLAYER_PART_END s22.xDatForm.1

// index.html:115676 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironIdxBase.1 EDITABLE
const ironIdxBase=xFormIdx,ironOnBase=xFormOn,ironSyncBase=xDongBo;
// PLAYER_PART_END s22.ironIdxBase.1

// index.html:115677 · Phạm vi: global
// PLAYER_PART_BEGIN s22.xFormIdx.1 EDITABLE
xFormIdx=function(){return ironForm?IRON_FORM:ironIdxBase();};
// PLAYER_PART_END s22.xFormIdx.1

// index.html:115678 · Phạm vi: global
// PLAYER_PART_BEGIN s22.xFormOn.1 EDITABLE
xFormOn=function(){return ironForm||ironOnBase();};
// PLAYER_PART_END s22.xFormOn.1

// index.html:115679 · Phạm vi: global
// PLAYER_PART_BEGIN s22.xDongBo.1 EDITABLE
xDongBo=function(){ironSyncBase();ironSync();};
// PLAYER_PART_END s22.xDongBo.1

// index.html:115680 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironInit.1 EDITABLE
function ironInit(n){
    const feet=n.y+n.h;n.form=0;n.ammoType=0;n.maxHp=n.hp=10;n.w=IRON_ROBOT_W;n.h=IRON_ROBOT_H;n.y=feet-IRON_ROBOT_H;
    n.ironhaul={
        mode:0,attack:null,queue:null,k:null,combo:0,airCombo:0,ended:-1000,
        core:0,coreReady:0,guardUntil:-100,perfectUntil:-100,guardReady:0,counter:0,
        lastDash:-1000,lastJ:-1000,lastK:-1000,
        silver:0,silverMax:720,silverReturn:0,silverFinishing:false,novaReady:0,
        rounds:[],fx:[],trails:[],ghosts:[],jets:[],bunkers:[],shells:[],
        shieldOut:0,transition:0,lastX:n.x,gait:0,hitstop:0,driveSpeed:0,driveDistance:0,driveHeading:n.isFacingLeft?-1:1,driveDir:0,driveGuardUntil:-100,driveShield:false,driveArmed:true,driveDashUntil:-100,driveHits:new Map(),truckAir:false,truckDrop:0
    };
    ultCharge=dojoMode?100:0;
}
// PLAYER_PART_END s22.ironInit.1

// index.html:115692 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironStartBase.1 EDITABLE
const ironStartBase=startGame;
// PLAYER_PART_END s22.ironStartBase.1

// index.html:115693 · Phạm vi: global
// PLAYER_PART_BEGIN s22.startGame.1 EDITABLE
startGame=function(mode){if(mode==='pvp'&&ironForm)xDatForm(0);ironSync();ironStartBase(mode);if(ironOn())ironInit(dino);};
// PLAYER_PART_END s22.startGame.1

// index.html:115694 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironMode.1 EDITABLE
function ironMode(n,mode,morphAttack=false){
    const p=n.ironhaul;if(!p)return;const cx=n.x+n.w/2,feet=n.y+n.h;
    ironCapture(n,10);let next=((mode%3)+3)%3;if(next===1&&!p.silver&&!p.silverFinishing)next=0;
    p.mode=next;p.attack=null;p.queue=null;p.k=null;p.combo=p.airCombo=0;p.counter=0;p.guardUntil=p.perfectUntil=-100;p.transition=16;p.pendingJump=null;
    ironResetDrive(n);n.w=p.mode===2?86:IRON_ROBOT_W;n.h=p.mode===2?34:IRON_ROBOT_H;n.x=Math.max(worldL(),Math.min(worldR()-n.w,cx-n.w/2));n.y=feet-n.h;n.isCrouching=false;
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

// index.html:115709 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironWhite.1 EDITABLE
function ironWhite(p){return p.mode===1&&(p.silver>0||p.silverFinishing);}
// PLAYER_PART_END s22.ironWhite.1

// index.html:115710 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironResetDrive.1 EDITABLE
function ironResetDrive(n){
    const p=n.ironhaul;if(!p)return;
    p.driveSpeed=0;p.driveDistance=0;p.driveDir=0;p.driveHeading=n.isFacingLeft?-1:1;
    p.driveGuardUntil=p.driveGuardUntil>frames?p.driveGuardUntil:-100;p.driveDashUntil=-100;p.driveShield=false;p.driveArmed=true;p.driveHits=new Map();p.truckAir=false;p.truckAirFrames=0;p.truckDrop=0;dashVx=0;
}
// PLAYER_PART_END s22.ironResetDrive.1

// index.html:115715 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDriveMove.1 EDITABLE
function ironDriveMove(n,mv){
    const p=n.ironhaul;p.driveFrom=n.x;dashVx=0;
    if(n.webTimer>0||n._voidTe||n._fallRecovery){ironResetDrive(n);return n._fallRecovery?mv:0;}
    const input=Math.sign(mv),heading=p.driveHeading||(n.isFacingLeft?-1:1),lock=!!(keys.KeyS||keys.ArrowDown);
    const boost=frames<p.driveDashUntil;
    if(!input){
        p.driveDistance=0;p.driveArmed=true;p.driveForward=boost;
        if(!boost)p.driveSpeed*=.6;
        if(Math.abs(p.driveSpeed)<IRON_DRIVE_MAX*.9)p.driveShield=false;
        if(Math.abs(p.driveSpeed)<.2)p.driveSpeed=0;
        return p.driveSpeed;
    }
    const reverse=lock&&input!==heading;
    if(input!==p.driveDir||reverse!==p.driveReverse){
        p.driveDistance=0;p.driveArmed=!boost;
        if(!boost){p.driveSpeed=0;p.driveShield=false;}
        if(reverse)p.driveShield=false;
    }
    p.driveDir=input;p.driveReverse=reverse;p.driveForward=!reverse;
    if(!reverse)p.driveHeading=input;
    n.isFacingLeft=p.driveHeading<0;
    const speed=reverse?Math.min(IRON_DRIVE_MAX*.5,Math.abs(p.driveSpeed)+.22):boost?IRON_DRIVE_MAX:3.5+(IRON_DRIVE_MAX-3.5)*Math.min(1,p.driveDistance/IRON_DRIVE_RUNUP);
    p.driveSpeed=input*speed;
    return p.driveSpeed;
}
// PLAYER_PART_END s22.ironDriveMove.1

// index.html:115740 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDriveMoved.1 EDITABLE
function ironDriveMoved(n){
    const p=n.ironhaul,dx=n.x-(p.driveFrom??n.x);
    if(Math.abs(p.driveSpeed)>.2&&Math.abs(dx)<.05){ironResetDrive(n);return;}
    if(p.driveForward&&p.driveDir&&Math.sign(dx)===p.driveDir){
        p.driveDistance=Math.min(IRON_DRIVE_RUNUP,p.driveDistance+Math.abs(dx));
        if(p.driveArmed&&p.driveDistance>=IRON_DRIVE_RUNUP*.86&&Math.abs(p.driveSpeed)>=IRON_DRIVE_MAX*.9){
            p.driveShield=true;p.driveArmed=false;
        }
    }
    if(p.driveForward&&Math.abs(dx)>=1){
        const box={x:p.driveHeading>0?p.driveFrom+n.w-10:n.x,y:n.y,w:10+Math.abs(dx),h:n.h};
        for(const o of ironTargets(n)){
            const root=o.__goc||o;
            if(checkAABB(box,o)&&frames-(p.driveHits.get(root)??-1000)>=30)ironDriveImpact(n,o);
        }
        for(const [o,at]of p.driveHits)if(frames-at>90)p.driveHits.delete(o);
    }
}
// PLAYER_PART_END s22.ironDriveMoved.1

// index.html:115758 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDriveImpact.1 EDITABLE
function ironDriveImpact(n,o){
    const p=n.ironhaul,root=o.__goc||o,fast=Math.abs(p.driveSpeed)>=IRON_DRIVE_MAX*.9||frames<p.driveDashUntil;
    const dealt=ironDamage(n,o,fast?6.5:3,{dir:p.driveHeading,move:{finish:fast}});
    if(dealt>0){
        p.driveHits.set(root,frames);
        if(fast&&p.driveShield){p.driveShield=false;p.driveGuardUntil=frames+10;}
    }
    return dealt;
}
// PLAYER_PART_END s22.ironDriveImpact.1

// index.html:115767 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDriveDash.1 EDITABLE
function ironDriveDash(n,forced){
    const p=n.ironhaul;if(dashCd>0||n.webTimer>0||n.jcState||paused||gameOver||gameVictory)return;
    const dir=Math.sign(forced)||((keys.KeyA||keys.ArrowLeft)?-1:(keys.KeyD||keys.ArrowRight)?1:p.driveHeading||1);
    ironCancel(n);p.guardUntil=p.perfectUntil=-100;p.lastDash=frames;
    p.driveHeading=p.driveDir=dir;p.driveReverse=false;p.driveForward=true;
    p.driveSpeed=dir*IRON_DRIVE_MAX;p.driveDistance=IRON_DRIVE_RUNUP;p.driveDashUntil=frames+8;
    p.driveShield=true;p.driveGuardUntil=-100;p.driveArmed=false;p.driveHits=new Map();
    n.isFacingLeft=dir<0;n.dashDir=dir;dashVx=0;dashCd=34;p.transition=8;
    return true;
}
// PLAYER_PART_END s22.ironDriveDash.1

// index.html:115777 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironCapture.1 EDITABLE
function ironCapture(n,duration=12){
    const p=n.ironhaul;if(!p)return;const b=ironBody(n),t=(b.rigPose||ironhaulRig(b)).targets;
    const targets={...t,swordTarget:{...t.swordTarget},offTarget:{...t.offTarget}};
    if(b.playerCrouch){targets.swordTarget.y-=36;targets.offTarget.y-=36;}
    p.follow={at:frames,targets,duration};
}
// PLAYER_PART_END s22.ironCapture.1

// index.html:115783 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironCancel.1 EDITABLE
function ironCancel(n=dino){const p=n.ironhaul;if(!p)return;ironCapture(n);p.attack=null;p.queue=null;p.k=null;p.pendingJump=null;}
// PLAYER_PART_END s22.ironCancel.1

// index.html:115784 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSilverStart.1 EDITABLE
function ironSilverStart(n=dino){
    const p=n.ironhaul;if(!p||ironWhite(p)||ultCharge<100)return false;
    p.silverReturn=p.mode===2?2:0;p.silver=p.silverMax;p.silverFinishing=false;p.novaReady=0;ultCharge=0;
    ironMode(n,1);n.invincible=true;n.invTimer=Math.max(n.invTimer,24);p.fx.push({x:n.x+n.w/2,y:n.y+n.h/2,r:90,t:24,max:24});ironLabel('SILVER AEGIS · 12 GIÂY');return true;
}
// PLAYER_PART_END s22.ironSilverStart.1

// index.html:115789 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironSilverEnd.1 EDITABLE
function ironSilverEnd(n=dino){const p=n.ironhaul;if(!p)return;p.silver=0;p.silverFinishing=false;ironMode(n,p.silverReturn===2?2:0);ultCharge=0;}
// PLAYER_PART_END s22.ironSilverEnd.1

// index.html:115790 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironPower.1 EDITABLE
function ironPower(p,base,a){return (ironWhite(p)?base*1.5+1:base)*(a?.finisherPower||1);}
// PLAYER_PART_END s22.ironPower.1

// index.html:115791 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironLabel.1 EDITABLE
function ironLabel(s){floatingTexts.push(new FloatingText(dino.x-25,dino.y-25,s));}
// PLAYER_PART_END s22.ironLabel.1

// index.html:115793 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironComputeKinematics.1 EDITABLE
function ironComputeKinematics(n,p,a){
    if(!a||p.mode===2)return {rot:0,lean:0,scaleX:1,offX:0,offY:0,spearCone:0,drillSpin:0};
    const m=a.move,u=Math.max(0,Math.min(1,a.age/Math.max(1,m.T)));
    const sinU=Math.sin(u*Math.PI);
    const dir=a.dir||(n.isFacingLeft?-1:1);
    let rot=0,lean=0,scaleX=1,offX=0,offY=0,spearCone=0,drillSpin=0;

    switch(m.motion){
        case 'vault_stab':
            rot=dir*ironhaulEase(Math.min(1,a.age/18))*Math.PI*2;
            offY=-5*sinU;
            break;
        case 'rear_spin':
            rot=dir*ironhaulEase(Math.max(0,Math.min(1,(a.age-18)/16)))*Math.PI*2;
            break;
        case 'low_cut':
            lean=.06*sinU;
            break;
        case 'deep_thrust': // Nhịp 2 (J2) & Bash: Hạ thấp trọng tâm, chồm mạnh thân người về trước và đâm thẳng mũi kiếm như mũi giáo phản lực!
            lean=0.38*sinU;
            offX=dir*16*sinU;
            offY=5*sinU;
            spearCone=sinU;
            break;
        case 'drill_rush': // Dash + J (Khoan phản lực đâm xuyên): Nghiêng người 40 độ lao vút tới kèm vòng xoáy mũi khoan!
            lean=0.44*Math.min(1,a.age/8);
            offX=dir*18*sinU;
            offY=4;
            spearCone=1;
            drillSpin=a.age*0.85;
            break;
        case 'air_lance': // Không kích đâm xuyên trên không
            lean=0.36;
            offX=dir*14*sinU;
            spearCone=sinU;
            break;
        case 'jump_spin': // A small shoulder turn; keep the robot readable.
            scaleX=1-.14*sinU;
            lean=0.18*sinU;
            offY=-8*sinU;
            break;
        case 'front_flip': // A short cutting lean; reserve the full turn for the ultimate.
            rot=dir*(m.ultimate?u*Math.PI*2:.42*sinU);
            offY=-5*sinU;
            break;
        case 'dive_flip': // Plunge (Cúi + K trên không): Lộn vòng trên không rồi cắm thẳng mũi kiếm xuống đất
            rot=dir*.38*sinU;
            break;
        case 'back_flip': // Recoil tilt for evasive gun moves.
            rot=-dir*.28*sinU;
            offY=-4*sinU;
            break;
        case 'back_flip_up': // Upper (Cúi + J): Nhào lộn ngược vút lên trời chém hất
            rot=-dir*.4*sinU;
            offY=-5*sinU;
            break;
        case 'spin_bunker': // Nhịp 5 (Execution / Sovereign): Xoay tít toàn thân kết hợp phóng cọc thủy lực cực đại!
            scaleX=1-.16*sinU;
            lean=0.34*sinU;
            offX=dir*14*sinU;
            spearCone=a.age>=12?sinU:0;
            break;
        case 'low_slide': // Trượt thấp bắn Railgun
            lean=-0.24*sinU;
            offY=8*sinU;
            break;
        case 'recoil_stance':
        case 'heavy_recoil':
            lean=-0.18*sinU;
            offX=-dir*6*sinU;
            break;
        default: // 'lean_cut'
            lean=0.22*sinU;
            offX=dir*8*sinU;
            break;
    }
    return {rot,lean,scaleX,offX,offY,spearCone,drillSpin};
}
// PLAYER_PART_END s22.ironComputeKinematics.1

// index.html:115872 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironBody.1 EDITABLE
function ironBody(n){
    const p=n.ironhaul,a=p.attack,scale=p.mode===2?.3:IRON_ROBOT_SCALE;
    const kin=ironComputeKinematics(n,p,a);
    const b=Object.create(IronhaulBoss.prototype);
    Object.assign(b,{
        x:((n.x+n.w/2+kin.offX)/scale)-(p.mode===2?143:52),
        y:((n.y+n.h+kin.offY)/scale)-(p.mode===2?104:180),
        w:p.mode===2?286:104,
        h:p.mode===2?104:180,
        phase:2,silver:p.mode===1,vehicle:p.mode===2,
        facingLeft:(a?a.dir:n.isFacingLeft?-1:1)<0,
        grounded:n.grounded,
        pose:a?.move.round?'gun':'idle',
        state:a?a.move.state:frames<p.guardUntil?'ih_parry':'idle',
        subTimer:a?a.age+(a.move.offset||0):0,
        slash:a?.slash||null,
        shieldStrike:a?.shield||null,
        coreBuff:p.core,
        muzzle:p.muzzle||0,
        shieldOut:p.shieldOut,
        gait:p.gait,
        animSpeed:p.speed||0,
        animAt:frames,
        scale,
        _kin:kin
    });
    b.playerCrouch=!!n.isCrouching;
    b.followPose=p.follow;b.playerBlend=true;b.playerReach=p.reach??112;if(ironWhite(p))b.coreBuff=Math.max(1,p.core||0);
    if(b.vehicle&&a?.move.round==='shell')b.state='ih_cannon';
    const target=ironTarget(n);b.lockX=(target?target.x+target.w/2:n.x+(n.isFacingLeft?-200:200))/scale;b.lockY=(target?target.y+target.h/2:n.y+n.h/2)/scale;
    if(a?.slash&&['low','downthrust','spin'].includes(a.slash.kind)){
        const r=ironhaulRig(b),kind=a.slash.kind,angle=a.slash.angle;
        const goal=kind==='low'?{x:70,y:-55}:kind==='downthrust'?{x:55,y:-65}:{x:75,y:-100};
        const arm=ironhaulIK(r.sword.root,goal,34,35,1);arm.angle=angle;
        arm.hand={x:arm.end.x+Math.cos(angle)*11,y:arm.end.y+Math.sin(angle)*11};
        r.sword=arm;r.targets.swordTarget={...goal};r.targets.blade=angle;b.rigPose=r;
    }
    // Aim the player's actual arm/barrel in world space, independently of sword poses.
    if(!b.vehicle&&!b.silver&&(p.k!==null||['bullet','rail','shell','shell_burst'].includes(a?.move.round))){
        const r=ironhaulRig(b),m=ironKinematicsMatrix(b,n.x+n.w/2,n.y+n.h/2),det=m.a*m.d-m.b*m.c;
        const wx=target?target.x+target.w/2:n.x+n.w/2+(b.facingLeft?-400:400),wy=target?target.y+target.h/2:n.y+n.h*.5;
        const dx=wx-m.e,dy=wy-m.f,ux=(m.d*dx-m.c*dy)/det/scale,uy=(-m.b*dx+m.a*dy)/det/scale;
        const dir=b.facingLeft?-1:1,root=r.off.root,tx=(ux-b.cx())*dir,ty=uy-b.y-b.h;
        const angle=Math.max(-1.05,Math.min(1.05,Math.atan2(ty-root.y,Math.max(25,tx-root.x))));
        const wrist={x:root.x+Math.cos(angle)*62,y:root.y+Math.sin(angle)*62},arm=ironhaulIK(root,wrist,34,35,1);
        arm.angle=angle;arm.hand={x:arm.end.x+Math.cos(angle)*11,y:arm.end.y+Math.sin(angle)*11};
        r.off=arm;r.targets.offTarget={...wrist};r.targets.shieldAngle=angle;b.rigPose=r;
    }
    return b;
}
// PLAYER_PART_END s22.ironBody.1

// index.html:115924 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironTargets.1 EDITABLE
function ironTargets(n){
    const targets=sgTargets(n),clashing=new Set(targets.filter(o=>o._beamClashPoint).map(o=>o.ownerBoss));
    return targets.filter(o=>o._beamClashPoint||!clashing.has(o.__goc||o));
}
// PLAYER_PART_END s22.ironTargets.1

// index.html:115928 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironTarget.1 EDITABLE
function ironTarget(n){
    const dir=n.isFacingLeft?-1:1,cx=n.x+n.w/2,cy=n.y+n.h/2;
    return ironTargets(n).filter(o=>!o.invulnAll&&(o.x+o.w/2-cx)*dir>-30&&Math.hypot(o.x+o.w/2-cx,o.y+o.h/2-cy)<900).sort((a,b)=>(b._beamClashPoint?1:0)-(a._beamClashPoint?1:0)||Math.hypot(a.x+ a.w/2-cx,a.y+a.h/2-cy)-Math.hypot(b.x+b.w/2-cx,b.y+b.h/2-cy))[0]||null;
}
// PLAYER_PART_END s22.ironTarget.1

// index.html:115933 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironKinematicsMatrix.1 EDITABLE
function ironKinematicsMatrix(b,cx,cy){
    const k=b._kin||{},angle=b.vehicle?0:(k.rot||0)+(b.facingLeft?-1:1)*(k.lean||0);
    const sx=b.vehicle?1:(k.scaleX??1),c=Math.cos(angle),s=Math.sin(angle),x=cx+(k.offX||0),y=cy+(k.offY||0);
    return {a:c*sx,b:s*sx,c:-s,d:c,e:x-c*sx*x+s*y,f:y-s*sx*x-c*y};
}
// PLAYER_PART_END s22.ironKinematicsMatrix.1

// index.html:115938 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironGeometry.1 EDITABLE
function ironGeometry(n){
    const b=ironBody(n),g=ironhaulWeapons(b),s=b.scale,m=ironKinematicsMatrix(b,n.x+n.w/2,n.y+n.h/2);
    const point=p=>({x:m.a*p.x*s+m.c*p.y*s+m.e,y:m.b*p.x*s+m.d*p.y*s+m.f});
    const shield=point(g.shield),gun=point(g.gun),points=g.shieldPoints.map(point);
    const xs=points.map(p=>p.x),ys=points.map(p=>p.y);
    return {body:b,grip:point(g.grip),tip:point(g.tip),shield,gun,gunAngle:Math.atan2(gun.y-shield.y,gun.x-shield.x),shieldBox:{x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)}};
}
// PLAYER_PART_END s22.ironGeometry.1

// index.html:115945 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDamage.1 EDITABLE
function ironDamage(n,o,damage,attack){
    const dealt=sgDamage(n,o,damage,'ironhaul');
    if(dealt>0){if(!ironWhite(n.ironhaul)&&!o._beamClashPoint&&!attack?.move?.ultimate&&!attack?.ultimate)ultCharge=Math.min(100,ultCharge+dealt*.8);
        const root=o.__goc||o;if(attack?.move?.finish&&!root._beamClashPoint&&!bosses.includes(root)){if(Number.isFinite(root.dy))root.dy=-5;if(Number.isFinite(root.x))root.x+=attack.dir*12;}
    }return dealt;
}
// PLAYER_PART_END s22.ironDamage.1

// index.html:115951 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironBegin.1 EDITABLE
function ironBegin(id,n=dino){
    const p=n.ironhaul,m=IRON_PLAYER_MOVES[id];if(!p||!m||p.attack||frames<p.guardUntil)return false;
    if(id==='throw'&&p.shieldOut)return false;
    if(id==='charge'&&(p.mode===2||p.coreReady>0))return false;
    if(id==='nova'&&(!ironWhite(p)||p.novaReady>0))return false;
    const before=p.mode;
    if(m.ultimate&&!ironWhite(p))return false;
    if(!['cut','rise','cross','thrust','execution','silvercut','spin','silverbloom','silvercross','sovereign'].includes(id))p.combo=0;
    ironCapture(n,10);
    p.attack={id,move:m,age:0,dir:n.isFacingLeft?-1:1,slash:null,shield:null,hits:new Set(),before,input:null,airWait:0};p.k=null;
    if(id==='recoil'||m.flank){
        p.attack.target=ironTarget(n);p.attack.from={x:n.x,feet:n.y+n.h};
    }
    if(m.ultimate){p.attack.finisherPower=.9+2.7*p.silver/p.silverMax;p.silverFinishing=true;p.silver=0;ultCharge=0;n.invincible=true;n.invTimer=Math.max(n.invTimer,18);}
    if(id==='charge')p.coreReady=720;
    if(id==='nova')p.novaReady=360;
    if(!['cut','rise','silvercut','spin','gatling'].includes(id))ironLabel(m.name);
    return true;
}
// PLAYER_PART_END s22.ironBegin.1

// index.html:115971 · Phạm vi: global
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

// index.html:116002 · Phạm vi: global
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

// index.html:116025 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironCommand.1 EDITABLE
function ironCommand(key,n=dino,charge=0,downOverride){
    const p=n.ironhaul;if(!p)return;
    if(key==='J')p.lastJ=frames;else if(key==='K')p.lastK=frames;
    if(p.attack){
        const a=p.attack,link=key==='J'?a.move.followJ:a.move.followK;
        if(link){
            if(a.age>=(a.move.link||10)&&(!a.move.waitLand||n.grounded)){ironCancel(n);ironBegin(link,n);if(p.attack)p.attack.input=key;}
            else p.queue={key,charge,down:downOverride??!!(keys.KeyS||keys.ArrowDown),follow:link,until:frames+a.move.T+90};
            return;
        }
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
        else if(down)id='lowcut';
        else if(dash){id=ironWhite(p)?'aegislance':'advance';p.lastDash=-1000;}
        else if(!n.grounded&&!(p.combo>0&&frames-p.ended<=44)){id=(p.airCombo++%2)?'aircross':'air';}
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

// index.html:116074 · Phạm vi: global
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

// index.html:116101 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironKeyBase.1 EDITABLE
const ironKeyBase=danteKey;
// PLAYER_PART_END s22.ironKeyBase.1

// index.html:116101 · Phạm vi: global
// PLAYER_PART_BEGIN s22.danteKey.1 EDITABLE
danteKey=function(code,repeat){return ironKey(code,repeat)||ironKeyBase(code,repeat);};
// PLAYER_PART_END s22.danteKey.1

// index.html:116102 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDashBase.1 EDITABLE
const ironDashBase=doDash;
// PLAYER_PART_END s22.ironDashBase.1

// index.html:116103 · Phạm vi: global
// PLAYER_PART_BEGIN s22.doDash.1 EDITABLE
doDash=function(...args){
    const p=ironActive()?dino.ironhaul:null,a=p?.attack,source=p?(p.k!==null?'K':a?.input&&a.age>=5?a.input:frames-p.lastK<=22?'K':frames-p.lastJ<=22?'J':null):null;
    if(p?.mode===2)return ironDriveDash(dino,args[0]);
    const old=dashCd,result=ironDashBase.apply(this,args);
    if(p&&dashCd>old&&Math.abs(dashVx)>1&&!a?.move.ultimate){
        ironCancel();p.lastDash=frames;
        const id=p.mode===2?(source==='K'?'broadside':'ram'):source==='J'?'recoil':source==='K'?(ironWhite(p)?'aegisvault':'gunvault'):null;
        if(id){ironBegin(id);if(p.attack){p.attack.input=null;if(id==='recoil')dashVx=0;else if(['gunvault','aegisorbit'].includes(id))dashVx=-p.attack.dir*Math.max(10,Math.abs(dashVx));}}
    }return result;
};
// PLAYER_PART_END s22.doDash.1

// index.html:116113 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironGuardBase.1 EDITABLE
const ironGuardBase=Player.prototype.isShielding;
// PLAYER_PART_END s22.ironGuardBase.1

// index.html:116114 · Phạm vi: global
// PLAYER_PART_BEGIN s22.Player.prototype.isShielding.1 EDITABLE
Player.prototype.isShielding=function(){if(ironOn()&&this===dino&&this.ironhaul)return frames<this.ironhaul.guardUntil;return ironGuardBase.call(this);};
// PLAYER_PART_END s22.Player.prototype.isShielding.1

// index.html:116115 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironParryBase.1 EDITABLE
const ironParryBase=shinGuardReset;
// PLAYER_PART_END s22.ironParryBase.1

// index.html:116116 · Phạm vi: global
// PLAYER_PART_BEGIN s22.shinGuardReset.1 EDITABLE
shinGuardReset=function(perfect){const p=ironActive()?dino.ironhaul:null;if(perfect&&p&&p.mode!==2&&frames<p.perfectUntil&&!p.counter){p.counter=frames+8;p.perfectUntil=-100;p.guardReady=frames;}return ironParryBase(perfect);};
// PLAYER_PART_END s22.shinGuardReset.1

// index.html:116117 · Phạm vi: global
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

// index.html:116144 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironBlast.1 EDITABLE
function ironBlast(n,q){
    const p=n.ironhaul,hit=new Set();for(const o of ironTargets(n)){const root=o.__goc||o;
        if(!hit.has(root)&&Math.hypot(Math.max(o.x,Math.min(q.x,o.x+o.w))-q.x,Math.max(o.y,Math.min(q.y,o.y+o.h))-q.y)<=54){hit.add(root);ironDamage(n,o,q.damage,q);}}
    p.fx.push({x:q.x,y:q.y,r:54,t:18,max:18});shakeTimer=Math.max(shakeTimer,5);q.life=0;
}
// PLAYER_PART_END s22.ironBlast.1

// index.html:116149 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironArea.1 EDITABLE
function ironArea(n,base,radius,a){
    const p=n.ironhaul,x=n.x+n.w/2,y=n.y+n.h-8,damage=ironPower(p,base,a);
    for(const o of ironTargets(n))if(Math.hypot(Math.max(o.x,Math.min(x,o.x+o.w))-x,Math.max(o.y,Math.min(y,o.y+o.h))-y)<=radius)ironDamage(n,o,damage,a);
    p.fx.push({x,y,r:radius,t:25,max:25});shakeTimer=Math.max(shakeTimer,12);SFX.tone(120,.18,'sawtooth',.1,45);
}
// PLAYER_PART_END s22.ironArea.1

// index.html:116154 · Phạm vi: global
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

// index.html:116203 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironFlankStep.1 EDITABLE
function ironFlankStep(n,a){
    if(!a.flankGoal){
        const t=a.target,dir=a.dir,goal=t&&t.hp>0&&!t._beamClashPoint?(dir>0?t.x+t.w+18:t.x-n.w-18):a.from.x+dir*90;
        a.flankGoal={x:Math.max(worldL(),Math.min(worldR()-n.w,Math.max(a.from.x-3*CM,Math.min(a.from.x+3*CM,goal)))),dir:-dir};
    }
    if(a.age<=16){
        const u=ironhaulEase(a.age/16),old=n.x;
        n.x=ironhaulMix(a.from.x,a.flankGoal.x,u);
        if(mapTheme==='tetris')resolveTetrisWalls(n,n.x-old);else resolveSolidPillars(n);
        n.y=a.from.feet-Math.sin(a.age/16*Math.PI)*28-n.h;n.dy=0;n.grounded=false;
    }else if(a.age===17){a.dir=a.flankGoal.dir;n.isFacingLeft=a.dir<0;n.dy=.5;}
}
// PLAYER_PART_END s22.ironFlankStep.1

// index.html:116215 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironTruckLanding.1 EDITABLE
function ironTruckLanding(n){
    const p=n.ironhaul;if(p.mode!==2||n._fallRecovery){p.truckAir=false;p.truckAirFrames=0;p.truckDrop=0;return;}
    if(!n.grounded){p.truckAir=true;p.truckAirFrames=(p.truckAirFrames||0)+1;p.truckDrop=Math.max(p.truckDrop||0,n.dy);return;}
    if(p.truckAir&&p.truckAirFrames>=3&&p.truckDrop>2){
        const radius=100,damage=Math.min(7,3+Math.floor(p.truckDrop/3)),x=n.x+n.w/2,y=n.y+n.h;
        for(const o of ironTargets(n))if(Math.hypot(Math.max(o.x,Math.min(x,o.x+o.w))-x,Math.max(o.y,Math.min(y,o.y+o.h))-y)<=radius)ironDamage(n,o,damage,{ultimate:false});
        p.fx.push({x,y,r:radius,t:20,max:20});shakeTimer=Math.max(shakeTimer,7);SFX.tone(110,.1,'sawtooth',.1,55);
    }
    p.truckAir=false;p.truckAirFrames=0;p.truckDrop=0;
}
// PLAYER_PART_END s22.ironTruckLanding.1
