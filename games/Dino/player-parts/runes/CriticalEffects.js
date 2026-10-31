// PLAYER_FILE: CriticalEffects
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CRIT3_GOC, CUS_DAN, currentAmmoType, cusCapCua, cusNguoiDang, dino, hasRune
// index.html:47248 · Phạm vi: global
// PLAYER_PART_BEGIN s3.critStack.1 EDITABLE
let critStack = 0;
// PLAYER_PART_END s3.critStack.1

// index.html:47249 · Phạm vi: global
// PLAYER_PART_BEGIN s3.critStack3.1 EDITABLE
let critStack3 = 0;
// PLAYER_PART_END s3.critStack3.1

// index.html:47256 · Phạm vi: global
// PLAYER_PART_BEGIN s3.VC_TI_LE.1 EDITABLE
const VC_TI_LE = 0.20, VC_SAT_THUONG = 0.5, VC_NHAN = 1.5;
// PLAYER_PART_END s3.VC_TI_LE.1

// index.html:47257 · Phạm vi: global
// PLAYER_PART_BEGIN s3.vcBat.1 EDITABLE
function vcBat(){
            if (typeof cusCapCua !== 'function' || typeof CUS_DAN === 'undefined') return false;
            let a = (typeof cusNguoiDang !== 'undefined' && cusNguoiDang && cusNguoiDang.ammoType !== undefined) ? cusNguoiDang.ammoType : currentAmmoType;
            return a === CUS_DAN && cusCapCua('vocuc') > 0;
        }
// PLAYER_PART_END s3.vcBat.1

// index.html:47262 · Phạm vi: global
// PLAYER_PART_BEGIN s3.critNhan.1 EDITABLE
function critNhan(c){
            if (!(c > 1) || !vcBat()) return c;
            let lv = cusCapCua('vocuc'), coRune = critChanceGoc() > 0;
            if (!coRune) return lv >= 2 ? 2 : 1.5;               // chi mang chi den tu Vo Cuc Kiem
            return lv >= 2 ? c * VC_NHAN : c + VC_SAT_THUONG;     // C1: 2.5 / 3.5 · C2: 3 / 4.5
        }
// PLAYER_PART_END s3.critNhan.1

// index.html:47268 · Phạm vi: global
// PLAYER_PART_BEGIN s3.critChuoi.1 EDITABLE
function critChuoi(c){ let n = critNhan(c); return (c === 3 ? 'SIÊU CHÍ MẠNG! ×' : 'CRITICAL x') + n + (c === 3 ? '' : '!'); }
// PLAYER_PART_END s3.critChuoi.1

// index.html:47269 · Phạm vi: global
// PLAYER_PART_BEGIN s3.critChance.1 EDITABLE
function critChance(){ let c = critChanceGoc(); return vcBat() ? Math.min(1, c + VC_TI_LE) : c; }
// PLAYER_PART_END s3.critChance.1

// index.html:47270 · Phạm vi: global
// PLAYER_PART_BEGIN s3.critChanceGoc.1 EDITABLE
function critChanceGoc(){
            if (hasRune('critstrikex')){
                let mat = Math.max(0, (dino.maxHp || 1) - (dino.hp || 0));
                // Mau toi da mac dinh chi la 5 (9 neu mang rune MAU), nen "+15% moi diem mau mat"
                // chi ra 85% khi con 1 mau. Bao dam ve "con 1 mau = 100%" bang cach chot cung o day.
                if ((dino.hp || 0) <= 1) return 1;
                return Math.min(1, 0.25 + critStack * 0.05 + mat * 0.15);
            }
            // C1 cung duoc CONG DON +5% moi lan danh hut (reset khi trung). Truoc day C1 chi la
            // 25% co dinh nen no thua xa cac rune De 1 o. C2 van hon nho phan an theo mau da mat
            // va don SIEU CHI MANG x3.
            if (hasRune('critstrike')) return Math.min(1, 0.25 + critStack * 0.05);
            if (hasRune('explshot')) return 0.25;
            // SWORDMASTER cung mo duoc chi mang, o muc thap: 15%.
            if (hasRune('swordmaster')) return 0.15;
            return 0;
        }
// PLAYER_PART_END s3.critChanceGoc.1

// index.html:47288 · Phạm vi: global
// PLAYER_PART_BEGIN s3.rollCrit.1 EDITABLE
function rollCrit(){
            let c = critChance();
            if (c <= 0) return 0;
            if (Math.random() >= c){ if (hasRune('critstrikex') || hasRune('critstrike')) critStack++; return 0; }
            critStack = 0;
            // SIEU CHI MANG x3 co DUONG CONG DON RIENG: moi cu x2 ma khong len x3 thi cong +5%
            // cho lan sau. Truoc day x3 chi roll duoc khi ti le x2 da dat 100% (tuc gan chet),
            // nen o mau day nguoi choi khong bao gio thay no.
            if (hasRune('critstrikex')){
                let c3 = Math.min(1, CRIT3_GOC + critStack3 * 0.05);
                if (Math.random() < c3){ critStack3 = 0; return 3; }
                critStack3++;
            }
            return 2;
        }
// PLAYER_PART_END s3.rollCrit.1
