// PLAYER_FILE: PowersAndAccessories02
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, QS_MUS, SFX, ST_HOI, ST_KHOA, ST_MAX, ST_MUS_CD, ST_MUS_HO, ST_NAY, addStyle, bosses, checkAABB, dashCd, dashVx, dealDamage, dino, doDash, enemies, floatingTexts, gameState, keys, obstacles, qsT, qsThemVet, qsTran, quetTrieuHoiTuDong, shakeTimer, spawnAfterimage, stBat, stCharge, stFreeAir, stHoi, stKhoa, stMusCd, stNay, stXuongT, visualEffects
// index.html:90664 · Phạm vi: global
// PLAYER_PART_BEGIN s6.stTick.1 EDITABLE
function stTick(){
            if (!stBat()) return;
            if (stXuongT > 0) stXuongT--; if (stMusCd > 0) stMusCd--;
            if (stKhoa > 0) { stKhoa--; if (stKhoa === 0) stCharge = ST_MAX; }
            else if (stCharge < qsTran()) { stHoi--; if (stHoi <= 0) { stCharge++; stHoi = ST_HOI; } }
            if (dino && dino.grounded) { stFreeAir = true; stNay = 0; }   // cham dat = tra lai cu luot khong mien phi
        }
// PLAYER_PART_END s6.stTick.1

// index.html:90672 · Phạm vi: global
// PLAYER_PART_BEGIN s6.stTieu.1 EDITABLE
function stTieu(){
            if (stKhoa > 0 || stCharge <= 0) return false;
            stCharge--;
            if (stCharge === 0) stKhoa = ST_KHOA;
            else stHoi = ST_HOI;   // moi cu luot DAT LAI dong ho hoi -> luot lien tuc thi thuc su can charge
            return true;
        }
// PLAYER_PART_END s6.stTieu.1

// index.html:90679 · Phạm vi: global
// PLAYER_PART_BEGIN s6.stCong.1 EDITABLE
function stCong(){ if (stKhoa > 0) { stKhoa = 0; stCharge = 1; } else if (stCharge < qsTran()) stCharge++; }
// PLAYER_PART_END s6.stCong.1

// index.html:90681 · Phạm vi: global
// PLAYER_PART_BEGIN s6.stMustang.1 EDITABLE
function stMustang(){
            // TACH LAM HAI: SAT THUONG khi luot xuyen qua thi LUON co, con cu HAT LEN (Mustang)
            // moi bi khoa. Truoc day gop chung, nen luc khong Mustang duoc — dang ult, hoac con
            // hoi chieu — thi luot xuyen qua ke dich khong gay gi ca.
            if (!stBat() || Math.abs(dashVx) < 2) return false;
            let batTung = (qsT <= 0) && (stMusCd <= 0);
            let R = { x: dino.x - 4, y: dino.y, w: dino.w + 8, h: dino.h };
            let ds = [];
            for (let b of bosses) ds.push(b);
            for (let e of enemies) ds.push(e);
            for (let o of obstacles) ds.push(o);
            if (typeof quetTrieuHoiTuDong === 'function') for (let b of bosses) { try { ds = ds.concat(quetTrieuHoiTuDong(b)); } catch(e){} }
            let coCham = false;
            for (let t of ds) {
                if (!t || t.hp === undefined || t.hp <= 0) continue;
                if (!checkAABB(R, t)) continue;
                if ((t._stCd || 0) > 0) continue;          // moi muc tieu co nhip rieng
                t._stCd = 14;
                coCham = true;
                // --- SAT THUONG: luon co, ke ca khi khong hat len duoc ---
                if (typeof dealDamage === 'function') dealDamage(t, qsT > 0 ? QS_MUS : 2, 'ammo');
                // DAU AN QUICKSILVER: phai dat o day, khong phai trong nhanh Mustang. Truoc day
                // no nam trong nhanh hat len, ma trong ult thi khong hat len -> khong co dau an
                // nao ca -> don ket cua chieu cuoi khong gay gi.
                if (qsT > 0){
                    stCong(); stFreeAir = true;
                    if (typeof qsThemVet === 'function') qsThemVet(dino.x + dino.w/2, dino.y + dino.h);
                }
                visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + dino.h/2, 'explosion', true, 20));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(660, 0.08, 'square', 0.18, 900);
                if (!batTung){
                    floatingTexts.push(new FloatingText(dino.x - 18, dino.y - 26, "XUYÊN!"));
                    if (typeof addStyle === 'function') addStyle(4, 'mustang');
                    continue;                              // xuyen tiep, khong hat len
                }
                // --- MUSTANG: cu hat len, chi khi duoc phep ---
                let luc = ST_NAY[Math.min(stNay, ST_NAY.length - 1)];
                stNay++;
                dino.dy = -luc; dino.grounded = false; dino.canDoubleJump = true;
                dashVx = 0; dashCd = 0; stXuongT = 0;
                dino.invincible = true; dino.invTimer = Math.max(dino.invTimer || 0, 22);
                stMusCd = ST_MUS_CD;
                // Chi BA cu dap dau duoc tra charge + luot mien phi.
                if (stNay <= ST_MUS_HO) { stCong(); stFreeAir = true; }
                floatingTexts.push(new FloatingText(dino.x - 18, dino.y - 26, "MUSTANG"));
                if (typeof addStyle === 'function') addStyle(10, 'mustang');
                shakeTimer = Math.max(shakeTimer, 8);
                return true;
            }
            return coCham;
        }
// PLAYER_PART_END s6.stMustang.1

// index.html:90735 · Phạm vi: global
// PLAYER_PART_BEGIN s6.ST_LEN.1 EDITABLE
const ST_LEN = -18.5;
// PLAYER_PART_END s6.ST_LEN.1

// index.html:90736 · Phạm vi: global
// PLAYER_PART_BEGIN s6.stLuotLen.1 EDITABLE
function stLuotLen(){
            if (!stBat()) return false;
            dino.dy = ST_LEN; dashVx *= 0.5; stXuongT = 0;
            spawnAfterimage();
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(720, 0.07, 'square', 0.15, 1080);
            return true;
        }
// PLAYER_PART_END s6.stLuotLen.1

// index.html:90744 · Phạm vi: global
// PLAYER_PART_BEGIN s6.stLuotXuong.1 EDITABLE
function stLuotXuong(){
            if (!stBat() || dino.grounded || stXuongT > 0) return false;
            dino.dy = 23; stXuongT = 20; dashVx = 0;
            spawnAfterimage();
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(280, 0.07, 'sawtooth', 0.14, 420);
            return true;
        }
// PLAYER_PART_END s6.stLuotXuong.1

// index.html:90752 · Phạm vi: global
// PLAYER_PART_BEGIN s6.stTuDongTrenKhong.1 EDITABLE
function stTuDongTrenKhong(){
            if (!stBat() || dino.grounded || dino.jcState || dino.ultActive || dino.webTimer > 0) return;
            if (!(gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp')) return;
            if (keys['KeyS'] || keys['ArrowDown']) { stLuotXuong(); return; }
            let dir = (keys['KeyA'] || keys['ArrowLeft']) ? -1 : ((keys['KeyD'] || keys['ArrowRight']) ? 1 : 0);
            if (!dir) return;
            if (dashCd > 0 || Math.abs(dashVx) > 2) return;              // cho cu truoc tan het
            // Trong QUICKSILVER: luot BAO NHIEU CUNG DUOC, khong tieu charge, khong gioi han
            // ba lan. Day la ult cua mot he chuyen ve co dong — gioi han o day la tu mau thuan.
            if (qsT <= 0){
                if (stFreeAir) stFreeAir = false;                        // cu dau tien sau khi roi dat: MIEN PHI
                else if (!stTieu()) return;                              // het charge -> tro ve di chuyen thuong
            }
            doDash(dir);
        }
// PLAYER_PART_END s6.stTuDongTrenKhong.1
