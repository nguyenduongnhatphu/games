// PLAYER_FILE: PlayerState
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: AMMO_NAMES, DK_TIERS, DSAW_NAC, LH_TIERS, beamClashTargets, bosses, defMode, defUnits, enemies, gameState, obstacles, pvpDoiThu, pvpVoBoc
// index.html:83046 · Phạm vi: global
// PLAYER_PART_BEGIN s6.ultCharge.1 EDITABLE
let ultCharge = 0;
// PLAYER_PART_END s6.ultCharge.1

// index.html:83135 · Phạm vi: global
// PLAYER_PART_BEGIN s6.currentForm.1 EDITABLE
let currentForm = parseInt(localStorage.getItem("dino_current_form")) || 0;
// PLAYER_PART_END s6.currentForm.1

// index.html:86080 · Phạm vi: global
// PLAYER_PART_BEGIN s6.currentPower.1 EDITABLE
let currentPower = 0;
// PLAYER_PART_END s6.currentPower.1

// index.html:89277 · Phạm vi: global
// PLAYER_PART_BEGIN s6.currentAmmoType.1 EDITABLE
let currentAmmoType = (function(){
            let v = parseInt(localStorage.getItem("dino_ammo_type"));
            // @@HE-LUU — truoc day cung `v < 14` nen CUSTOM (14) va DINOSAW (15) bi danh ve PULSE
            return (Number.isFinite(v) && v >= 0 && v < Math.max(22, AMMO_NAMES.length)) ? v : 0;
        })();
// PLAYER_PART_END s6.currentAmmoType.1

// index.html:89284 · Phạm vi: global
// PLAYER_PART_BEGIN s6.combatStance.1 EDITABLE
let combatStance = parseInt(localStorage.getItem("dino_stance")) || 0;
// PLAYER_PART_END s6.combatStance.1

// index.html:89285 · Phạm vi: global
// PLAYER_PART_BEGIN s6.currentShieldType.1 EDITABLE
let currentShieldType = parseInt(localStorage.getItem("dino_shield")) || 0;
// PLAYER_PART_END s6.currentShieldType.1

// index.html:94018 · Phạm vi: global
// PLAYER_PART_BEGIN s6.checkAABB.1 EDITABLE
function checkAABB(r1, r2) { return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y; }
// PLAYER_PART_END s6.checkAABB.1

// index.html:94455 · Phạm vi: global
// PLAYER_PART_BEGIN s6.OC_FULL.1 EDITABLE
const OC_FULL = 160;
// PLAYER_PART_END s6.OC_FULL.1

// index.html:94470 · Phạm vi: global
// PLAYER_PART_BEGIN s6.CHARGE_TIERS.1 EDITABLE
const CHARGE_TIERS = [
            // 0 PULSE    : 25% vien to | 62.5% vien xuyen | 100% phan hach   (maxChargeFrames 90)
            [[22.5,"#4DD0E1"],[56.25,"#FF9800"],[90,"#FFEB3B"]],
            // 1 INFERNO  : mua hoa phao | hoa an                             (maxChargeFrames 120)
            [[60,"#FF9800"],[120,"#FF5722"]],
            // 2 RAPIDFIRE: mot moc duy nhat — du 1 giay moi cam duoc tru sung
            [[60,"#9CCC65"]],
            // 3 PRISM    : xuyen mot | xuyen vo han | lang kinh tu | lang kinh MAX
            [[30,"#FFF176"],[60,"#FFEE58"],[114,"#FFB74D"],[150,"#FFFFFF"]],
            // 4 VOLT     : 2 | 3 | 4 | 5 tia
            [[45,"#4FC3F7"],[90,"#00E5FF"],[120,"#40C4FF"],[150,"#FFFFFF"]],
            // 5 DINOSWORD: chem nang | kiem khi | dai kiem khi | vu dieu luot | lao xuyen
            [[15,"#ECEFF1"],[30,"#CFD8DC"],[60,"#B0BEC5"],[90,"#90A4AE"],[120,"#FFFFFF"]],
            // 6 PULSAR   : 4 | 5 | 6 | 7 tia moi canh (9 va 11 tia nam trong Channel)
            [[30,"#FFE082"],[75,"#FFD54F"],[90,"#FFC107"],[120,"#FFFFFF"]],
            // 7 BOOMERANG: mot moc duy nhat — LUOI KEP, an dmg ca luot di lan luot ve
            [[90,"#FF80AB"]],
            // 8 CRYO     : khoi bang | khoi gai | tuong bang | tuong cong them
            [[15,"#B3E5FC"],[45,"#4FC3F7"],[75,"#0288D1"],[135,"#FFFFFF"]],
            // 9 WHISPER  : luu dan nay | tia khoa muc tieu | vien nang pha giap
            [[15,"#F8BBD0"],[45,"#F06292"],[75,"#C2185B"]],
            // 10 GIAO    : choc 3 phat | quet ngang | mua giao | luot dam xuyen
            [[15,"#B2DFDB"],[45,"#4DB6AC"],[75,"#00897B"],[105,"#FFFFFF"]],
            // 11 BUA     : nen manh | nem bua | nem + sam set | nem co goi ve (mo PARRY)
            [[15,"#CFD8DC"],[30,"#90A4AE"],[60,"#FFD54F"],[120,"#FFFFFF"]],
            // 12 MIDAS   : khong co nac nao — giu K chi la tich so, va vong charge
            //              khong duoc ve cho MIDAS (xem `anVongSac` trong @@VK-MIDAS).
            [],
            // 13 VENOM   : dam xuyen | bon nhat | toa gai | lao dap  (Channel o 185)
            [[25,"#6E6E7A"],[60,"#9A9AA8"],[100,"#D8D8E4"],[145,"#FFFFFF"]],
            // 14 CUSTOM  : mot moc duy nhat — 3 giay la DAY KHO tru dan (24 vien)
            [[180,"#90A4AE"]],
            /* 15 DINOSAW: NO MAY | CUA VANG | CUA XANH | CUA TU THAN (xanh lam)
               Moc dat theo dung dac ta cua Hans: 0.25-0.5s / 0.5-1s / 1-2s / 2-3s. */
            [[DSAW_NAC[1],"#FF7043"],[DSAW_NAC[2],"#FFD54F"],[DSAW_NAC[3],"#66BB6A"],[DSAW_NAC[4],"#29B6F6"]],
            // 16 PHI TIEU: quat 2 | 4 | 6 | 8 kim (moc 3 giay cung la Channel THIEN LA DIA VONG)
            [[45,"#FFCDD2"],[90,"#EF9A9A"],[135,"#E57373"],[180,"#FFFFFF"]],
            // 17 KIEM VU : moi 0.5 giay sinh mot thanh kiem; 3 giay la Channel VUONG KHO
            [[30,"#B2EBF2"],[60,"#80DEEA"],[90,"#4DD0E1"],[120,"#26C6DA"],[150,"#00BCD4"],[180,"#FFFFFF"]],
            // 18 LUOI HAI: moc / chu thap / luot lui / khien xoay / cua dia nguc (Channel tu 3 giay)
            LH_TIERS,
            // 19 DAI KIEM: quet song | cam kiem (keo xuong dat) | nhay dap trong luc | dai cu kiem da | bat mon (Channel tu 3 giay)
            DK_TIERS
        ];
// PLAYER_PART_END s6.CHARGE_TIERS.1

// index.html:96853 · Phạm vi: global
// PLAYER_PART_BEGIN s6.allTargets.1 EDITABLE
function allTargets(){
            let out = beamClashTargets();
            // Trong PvP thi THEM nguoi choi ben kia vao danh sach, chu khong THAY THE.
            // Ban dau toi cho no thay the han, va tu kiem tu 34/34 tut xuong 28/34: 35 phep
            // thu trong game deu tha boss gia ra roi do sat thuong, ma o PvP chung bong dung
            // tang hinh. San dau PvP that thi khong co con nao nen cong them la khong doi gi.
            if (gameState === 'pvp'){
                let o = pvpDoiThu();
                if (o) out.push(pvpVoBoc(o));
            }
            for (let b of bosses) out.push(b);
            // quan trieu hoi da nam san trong `enemies` duoi dang BossMinion
            for (let e of enemies) out.push(e);
            for (let o of obstacles) out.push(o);
            if (defMode) for (let u of defUnits) if (u.ben === 'e' && u.hp > 0) out.push(u);
            return out;
        }
// PLAYER_PART_END s6.allTargets.1

// index.html:97444 · Phạm vi: global
// PLAYER_PART_BEGIN s6.PARRY_PCT_BLOCK.1 EDITABLE
const PARRY_PCT_BLOCK = 0.035;
// PLAYER_PART_END s6.PARRY_PCT_BLOCK.1

// index.html:97445 · Phạm vi: global
// PLAYER_PART_BEGIN s6.PARRY_PCT_PERFECT.1 EDITABLE
const PARRY_PCT_PERFECT = 0.080;
// PLAYER_PART_END s6.PARRY_PCT_PERFECT.1

// index.html:97446 · Phạm vi: global
// PLAYER_PART_BEGIN s6.PARRY_RG_BONUS.1 EDITABLE
const PARRY_RG_BONUS = 1.40;
// PLAYER_PART_END s6.PARRY_RG_BONUS.1

// index.html:97447 · Phạm vi: global
// PLAYER_PART_BEGIN s6.PARRY_MIN_BLOCK.1 EDITABLE
const PARRY_MIN_BLOCK = 4, PARRY_MIN_PERFECT = 6;
// PLAYER_PART_END s6.PARRY_MIN_BLOCK.1

// index.html:97448 · Phạm vi: global
// PLAYER_PART_BEGIN s6.PARRY_ULT_BLOCK.1 EDITABLE
const PARRY_ULT_BLOCK = 5, PARRY_ULT_PERFECT = 15;
// PLAYER_PART_END s6.PARRY_ULT_BLOCK.1
