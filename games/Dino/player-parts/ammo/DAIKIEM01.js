// PLAYER_FILE: DAIKIEM01
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DK_DAN, FloatingText, LT, SFX, bossContactAttack, bosses, bzChatNo, bzHutDmg, bzKhoa, bzSongMau, canvas, currentAmmoType, dashVx, dealDamage, dino, dkBeMau, dkDaManh, dkHap, dkHapMoi, dkMuiDaPhong, dkNhayDapDap, dkNut, dkSong, dkVo, dkVong, enemies, floatingTexts, gameState, gdCatHop, hasRune, hitCat, hitDat, hitDiem, keys, lhDs, mapTheme, obstacles, parry, platforms, score, setCanBat, shakeTimer, tetris, trdDs, venKhoa, worldL, worldR
// index.html:72911 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_CHAY.1 EDITABLE
const DK_CHAY = 0.85, DK_CHAY_DAT = 0.62, DK_CHAY_BUFF = 1.0;
// PLAYER_PART_END s4.DK_CHAY.1

// index.html:72912 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_DAT_T.1 EDITABLE
const DK_DAT_T = 150;
// PLAYER_PART_END s4.DK_DAT_T.1

// index.html:72913 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_BUFF_T.1 EDITABLE
const DK_BUFF_T = 270;
// PLAYER_PART_END s4.DK_BUFF_T.1

// index.html:72914 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_GHIM_T.1 EDITABLE
const DK_GHIM_T = 240;
// PLAYER_PART_END s4.DK_GHIM_T.1

// index.html:72915 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_CAM_T.1 EDITABLE
const DK_CAM_T = 60;
// PLAYER_PART_END s4.DK_CAM_T.1

// index.html:72916 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_CH_NHIP.1 EDITABLE
const DK_CH_NHIP = 120;
// PLAYER_PART_END s4.DK_CH_NHIP.1

// index.html:72917 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_TRONG.1 EDITABLE
const DK_TRONG = 45;
// PLAYER_PART_END s4.DK_TRONG.1

// index.html:72918 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_TIERS.1 EDITABLE
const DK_TIERS = [[30, "#B0BEC5"], [60, "#B388FF"], [90, "#7C4DFF"], [120, "#A1887F"], [150, "#FF5252"]];
// PLAYER_PART_END s4.DK_TIERS.1

// index.html:72919 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_LUNG.1 EDITABLE
const DK_LUNG = [-1.85, 16, 4], DK_TAY = [1.77, 31, 20], DK_CAM = [Math.PI, 48, -58];
// PLAYER_PART_END s4.DK_LUNG.1

// index.html:72920 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_MAU.1 EDITABLE
const DK_MAU = [196, 206, 230];
// PLAYER_PART_END s4.DK_MAU.1

// index.html:72922 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_CM.1 EDITABLE
const DK_CM = 10;
// PLAYER_PART_END s4.DK_CM.1

// index.html:72923 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_JC_MOC.1 EDITABLE
const DK_JC_MOC = [30, 60, 90], DK_JC_DMG = [12, 16, 20], DK_JC_CM = [3, 5, 7];
// PLAYER_PART_END s4.DK_JC_MOC.1

// index.html:72924 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_NOVA_MOC.1 EDITABLE
const DK_NOVA_MOC = [0, 24, 48];
// PLAYER_PART_END s4.DK_NOVA_MOC.1

// index.html:72926 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_JC_K.1 EDITABLE
const DK_JC_K = [4, 7, 10];
// PLAYER_PART_END s4.DK_JC_K.1

// index.html:72928 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_JC_HUT.1 EDITABLE
const DK_JC_HUT = [3, 6, 9];
// PLAYER_PART_END s4.DK_JC_HUT.1

// index.html:72930 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BZ_LIEN.1 EDITABLE
const BZ_LIEN = 12, BZ_NGAT = 40, BZ_GIU = 20;
// PLAYER_PART_END s4.BZ_LIEN.1

// index.html:72931 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BZ_CHAT.1 EDITABLE
const BZ_CHAT = [12, 15, 18], BZ_TAM = [3, 5, 7], BZ_HOI = [600, 510, 420, 330, 240];
// PLAYER_PART_END s4.BZ_CHAT.1

// index.html:72932 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzBeRong.1 EDITABLE
function bzBeRong(tier){
            let map = 1000;
            if (typeof worldR === 'function' && typeof worldL === 'function') map = Math.max(480, worldR() - worldL());
            let dau = 106, cuoi = map * 0.5;
            let t = Math.max(1, Math.min(5, tier || 1));
            return dau + (cuoi - dau) * (t - 1) / 4;
        }
// PLAYER_PART_END s4.bzBeRong.1

// index.html:72939 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzBeMo.1 EDITABLE
function bzBeMo(ng, tier, x){
            let gy = dkChan(ng);
            dkBeMau.push({ x: x == null ? ng.x + ng.w / 2 : x, w: bzBeRong(tier), y: gy, t: 0, T: 1200, tier: tier || 1, hoi: 0 });
        }
// PLAYER_PART_END s4.bzBeMo.1

// index.html:72943 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BZ_TAM_THEM.1 EDITABLE
const BZ_TAM_THEM = 50, BZ_TAM_T = 300;
// PLAYER_PART_END s4.BZ_TAM_THEM.1

// index.html:72944 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzBat.1 EDITABLE
function bzBat(ng){
            if (!ng || !dkBat(ng)) return false;
            if (typeof hasRune !== 'function' || !hasRune('berserk')) return false;
            if (ng.id !== 1 && gameState === 'pvp') return false;
            return true;
        }
// PLAYER_PART_END s4.bzBat.1

// index.html:72951 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_DA_N.1 EDITABLE
const DK_DA_N = 5, DK_DA_DMG = 5, DK_DA_TAM = 60;
// PLAYER_PART_END s4.DK_DA_N.1

// index.html:72953 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_DA_MANH.1 EDITABLE
const DK_DA_MANH = [2, 2, 2, 3], DK_DA_MANH_DMG = 2;
// PLAYER_PART_END s4.DK_DA_MANH.1

// index.html:72955 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_DA_VO_DMG.1 EDITABLE
const DK_DA_VO_DMG = 7, DK_DA_VO_TAM = 150, DK_DA_VO_N = 4, DK_DA_VO_MANH = 4;
// PLAYER_PART_END s4.DK_DA_VO_DMG.1

// index.html:72961 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_DAP_JC.1 EDITABLE
const DK_DAP_JC = [5, 10, 15], DK_DAP_VO_DMG = 50, DK_DAP_VO_MAX = DK_DAP_VO_DMG + DK_DAP_JC[2], DK_DAP_VO_R = 190, DK_DAP_VO_CAO = 120;
// PLAYER_PART_END s4.DK_DAP_JC.1

// index.html:72964 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_NGANG_VO_BONUS.1 EDITABLE
const DK_NGANG_VO_BONUS = 10, DK_MUI_BAY_DMG = 4, DK_MUI_GAN = 4 * DK_CM;
// PLAYER_PART_END s4.DK_NGANG_VO_BONUS.1

// index.html:72965 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_DAP_DMG.1 EDITABLE
const DK_DAP_DMG = 24, DK_TRUNG_T = 30, DK_TRUNG_R = 170, DK_TRUNG_KEO = 0.14;
// PLAYER_PART_END s4.DK_DAP_DMG.1

// index.html:72966 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkBat.1 EDITABLE
function dkBat(ng){ return !!ng && (ng.id === 1 ? currentAmmoType : (ng.ammoType != null ? ng.ammoType : -1)) === DK_DAN; }
// PLAYER_PART_END s4.dkBat.1

// index.html:72967 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkNovaOn.1 EDITABLE
function dkNovaOn(ng){
            if (typeof hasRune !== 'function' || !hasRune('explshot')) return false;
            if (ng && typeof bzBat === 'function' && bzBat(ng)) return false;
            return dkBat(ng || (typeof dino !== 'undefined' ? dino : null));
        }
// PLAYER_PART_END s4.dkNovaOn.1

// index.html:72972 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkMoi.1 EDITABLE
function dkMoi(){ return { trang: 'lung', A: null, datT: 0, cho: 0, buff: 0, ch: null, ult: null, jCu: false,
                                   luotDu: 0, luotCu: false, kenh: false,
                                   da: 0, jHold: false, jT: 0, jTier: 0, jXa: 0, jDash: false,
                                   jGiu: 0, jHut: 0, jAn: false }; }
// PLAYER_PART_END s4.dkMoi.1

// index.html:72976 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkCua.1 EDITABLE
function dkCua(ng){ if (!ng.dk) ng.dk = dkMoi(); return ng.dk; }
// PLAYER_PART_END s4.dkCua.1

// index.html:72977 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkDir.1 EDITABLE
function dkDir(ng){ return ng.isFacingLeft ? -1 : 1; }
// PLAYER_PART_END s4.dkDir.1

// index.html:72978 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkDs.1 EDITABLE
function dkDs(){
            let ds = (typeof lhDs === 'function') ? lhDs() : trdDs();
            // vat can (xuong rong...) cung chem duoc
            if (gameState !== 'pvp' && typeof obstacles !== 'undefined') for (const o of obstacles) if (o && o.hp > 0) ds.push(o);
            return ds;
        }
// PLAYER_PART_END s4.dkDs.1

// index.html:72984 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkLaVatCan.1 EDITABLE
function dkLaVatCan(o){ return typeof obstacles !== 'undefined' && obstacles.indexOf(o) >= 0; }
// PLAYER_PART_END s4.dkLaVatCan.1

// index.html:72985 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkLaQuai.1 EDITABLE
function dkLaQuai(o){ return (typeof bosses !== 'undefined' && bosses.indexOf(o) >= 0) || (typeof enemies !== 'undefined' && enemies.indexOf(o) >= 0); }
// PLAYER_PART_END s4.dkLaQuai.1

// index.html:72986 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkLaBoss.1 EDITABLE
function dkLaBoss(o){ return typeof bosses !== 'undefined' && bosses.indexOf(o) >= 0; }
// PLAYER_PART_END s4.dkLaBoss.1

// index.html:72988 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkNenY.1 EDITABLE
function dkNenY(){ return (mapTheme === 'tetris' && typeof tetris !== 'undefined' && tetris) ? tetris.groundY : 320; }
// PLAYER_PART_END s4.dkNenY.1

// index.html:72990 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkMatDuoi.1 EDITABLE
function dkMatDuoi(x, chan){
            let best = dkNenY();
            if (typeof platforms !== 'undefined') for (const pf of platforms){
                if (pf.wall || pf.top === undefined || (pf.isLeaf && !pf.solid)) continue;
                if (x < pf.x || x > pf.x + pf.w) continue;
                if (pf.top >= chan - 4 && pf.top < best) best = pf.top;
            }
            return best;
        }
// PLAYER_PART_END s4.dkMatDuoi.1

// index.html:73000 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkChan.1 EDITABLE
function dkChan(ng){ return ng.grounded ? ng.y + ng.h : dkMatDuoi(ng.x + ng.w / 2, ng.y + ng.h); }
// PLAYER_PART_END s4.dkChan.1

// index.html:73001 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkDangBay.1 EDITABLE
function dkDangBay(o){ let c = o.y + (o.h || 20); return c < dkMatDuoi(o.x + (o.w || 20) / 2, c) - 12; }
// PLAYER_PART_END s4.dkDangBay.1

// index.html:73002 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkSfx.1 EDITABLE
function dkSfx(f, d, k, v, f2){ if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(f, d, k, v, f2); }
// PLAYER_PART_END s4.dkSfx.1

// index.html:73003 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkChu.1 EDITABLE
function dkChu(x, y, vi, en){ floatingTexts.push(new FloatingText(x, y, LT(vi, en))); }
// PLAYER_PART_END s4.dkChu.1

// index.html:73005 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkTG.1 EDITABLE
function dkTG(ng, lx, ly){
            let s = ng.getFormScale();
            return { x: dkDir(ng) > 0 ? ng.x + lx * s : ng.x + ng.w - lx * s, y: ng.y + ly * s };
        }
// PLAYER_PART_END s4.dkTG.1

// index.html:73009 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkDanh.1 EDITABLE
function dkDanh(o, dmg){
            if (!o || o.hp === undefined || o.hp <= 0) return;
            if (dkLaVatCan(o)){ o.hp -= dmg; if (o.hp <= 0 && typeof score !== 'undefined') score += 1; return; }   // nhu meleeStrike
            let hp0 = o.hp;
            if (typeof dealDamage === 'function') dealDamage(o, dmg, 'ammo'); else o.hp -= dmg;
            if (dkLaQuai(o)) bzHutDmg(Math.min(dmg, hp0));      // BERSERKER: gay sat thuong -> hut mau
        }
// PLAYER_PART_END s4.dkDanh.1

// index.html:73016 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkDay.1 EDITABLE
function dkDay(o, d, px){
            if (!dkLaQuai(o)) return;
            o.x += d * px * (dkLaBoss(o) ? 0.5 : 1);
            o.x = Math.max(worldL() - (o.w || 20) * 0.5, Math.min(worldR() - (o.w || 20) * 0.5, o.x));
        }
// PLAYER_PART_END s4.dkDay.1

// index.html:73022 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkPhaDon.1 EDITABLE
function dkPhaDon(o, ng){
            if (!dkLaQuai(o)) return;
            if (dkLaBoss(o) && typeof bossContactAttack === 'function' && bossContactAttack(o)){
                if (typeof o.toIdle === 'function') o.toIdle(40); else o.state = 'idle';
                if (o.dashVx !== undefined) o.dashVx = 0;
                dkChu(o.x + (o.w || 40) / 2 - 30, o.y - 20, "PHÁ ĐÒN!", "BROKEN!");
            }
            if (typeof venKhoa === 'function') venKhoa(o, 6);          // CHOANG chi 0.1 giay (truoc 0.4s)
        }
// PLAYER_PART_END s4.dkPhaDon.1

// index.html:73032 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkHop.1 EDITABLE
function dkHop(ng, sau, truoc, tren, duoi, dmg, hit, fn){
            let d = dkDir(ng), s = ng.getFormScale(), cx = ng.x + ng.w / 2;
            let x0 = cx + d * sau * s, x1 = cx + d * truoc * s;
            if (x0 > x1){ let t = x0; x0 = x1; x1 = t; }
            let y0 = ng.y - tren * s, y1 = ng.y + ng.h + duoi;
            if (typeof gdCatHop === 'function') gdCatHop({ x: x0, y: y0, w: x1 - x0, h: y1 - y0 });   // @@HE-GATDAN
            let n = 0;
            for (let o of dkDs()){
                if (hit && hit.has(o)) continue;
                if (o.x + (o.w || 20) < x0 || o.x > x1 || o.y + (o.h || 20) < y0 || o.y > y1) continue;
                if (hit) hit.add(o);
                if (dmg > 0){ dkDanh(o, dmg); let p = hitDiem(o, d, (y0 + y1) / 2); let catMau = (typeof bzBat === 'function' && bzBat(ng) && ng.dk && ((ng.dk.tamThem || 0) > 0 || (ng.dk.A && ng.dk.A.kieu === 'bzRut'))) ? [183, 28, 28] : DK_MAU; hitCat(p.x, p.y, d * -0.5, dmg >= 7, catMau); }
                if (fn) fn(o);
                let _mG = (ng.dk && ng.dk.A && ng.dk.A.m) || {};
                if (dmg > 0 && dkLaQuai(o) && dkDangBay(o) && !_mG.khongGhim) dkGhim(o, DK_TRONG);   // MA PHAP TRONG LUC: chem trung ke bay la no rot
                n++;
            }
            if (n) shakeTimer = Math.max(shakeTimer || 0, dmg >= 9 ? 10 : 6);
            return n;
        }
// PLAYER_PART_END s4.dkHop.1

// index.html:73052 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkTon.1 EDITABLE
function dkTon(ng, n){
            if (ng.dk && ng.dk.buff > 0){ ng._hoiCho = 45; return; }      // BAT MON: vo han the luc
            if (ng.dk && (ng.dk.voHan || 0) > 0 && bzBat(ng)){ ng._hoiCho = 45; return; }   // BUNG NO: 5 giay khong ton the luc
            ng.ammo = Math.max(0, ng.ammo - n); ng._hoiCho = 45;
            if (ng.ammo <= 0){ ng.isOverheated = true; ng.overheatTimer = 75; }
        }
// PLAYER_PART_END s4.dkTon.1

// index.html:73058 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkCong.1 EDITABLE
function dkCong(A){ return (A && A.them && A.them.cong) || 0; }
// PLAYER_PART_END s4.dkCong.1

// index.html:73060 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkMucSan.1 EDITABLE
function dkMucSan(ng){
            let dk = ng && ng.dk; if (!dk) return 0;
            if (dk.jHold && dk.jTier > 0 && !dk.jAn) return dk.jTier;
            if (dk.jGiu > 0) return dk.jGiu;
            if (dk.jXa > 0) return dk.jXa;
            if (dk.jHut > 0) return dk.jHut;
            if (typeof dkNovaOn === 'function' && dkNovaOn(ng)) return 1;
            return 0;
        }
// PLAYER_PART_END s4.dkMucSan.1

// index.html:73070 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkTieuJ.1 EDITABLE
function dkTieuJ(ng){
            let dk = ng.dk; if (!dk) return;
            dk.jGiu = 0; dk.jXa = 0; dk.jHut = 0; dk.bufJ = 0; dk.jDash = false;
            if (dk.jHold){ dk.jT = 0; dk.jTier = 0; dk.jAn = true; }
            else dk.jAn = false;
        }
// PLAYER_PART_END s4.dkTieuJ.1

// index.html:73078 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVangDa.1 EDITABLE
function dkVangDa(ng, luot){
            if ((luot || 1) >= DK_DA_N){ dkVangVo(ng); return; }
            let n = DK_DA_MANH[Math.max(0, Math.min(DK_DA_MANH.length - 1, (luot || 1) - 1))] || 2;
            let d = dkDir(ng), gy = dkChan(ng);
            let trenKhong = !ng.grounded && (ng.y + ng.h) < gy - 24;
            let x0 = ng.x + ng.w / 2 + d * (trenKhong ? 30 : 78);
            let y0 = trenKhong ? ng.y + ng.h * 0.4 : gy - 10;
            for (let i = 0; i < n; i++){
                let u = (i + 0.5) / n;
                let ang = -0.18 - u * 1.2 + (Math.random() - 0.5) * 0.32;
                let sp = 5.6 + Math.random() * 5.4;
                dkDaManh.push({
                    x: x0 + (Math.random() - 0.5) * 20,
                    y: y0 - Math.random() * 14,
                    vx: d * Math.cos(ang) * sp + (Math.random() - 0.5) * 1.2,
                    vy: Math.sin(ang) * sp - Math.random() * 1.6,
                    s: 4 + Math.random() * 3.4,
                    rot: Math.random() * 6.28,
                    vr: (Math.random() - 0.5) * 0.45,
                    hit: new Set(), t: 0, lan: false, lon: false, dmg: DK_DA_MANH_DMG
                });
            }
            if (!trenKhong) hitDat(x0, gy, 0, [120, 100, 90]);
            shakeTimer = Math.max(shakeTimer || 0, 8);
            dkSfx(150, 0.09, 'square', 0.12, 80);
        }
// PLAYER_PART_END s4.dkVangDa.1

// index.html:73105 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVangVo.1 EDITABLE
function dkVangVo(ng){
            let d = dkDir(ng), gy = dkChan(ng);
            let trenKhong = !ng.grounded && (ng.y + ng.h) < gy - 24;
            let x0 = ng.x + ng.w / 2 + d * (trenKhong ? 46 : 118);
            let y0 = trenKhong ? ng.y + ng.h * 0.22 : gy - 52;
            const MANH = [
                { len: 44, wid: 16, ang: -0.22, sp: 6.2 },
                { len: 62, wid: 18, ang: -0.68, sp: 8.4 },
                { len: 54, wid: 15, ang: -1.12, sp: 9.6 },
                { len: 38, wid: 13, ang: -1.52, sp: 7.5 }
            ];
            for (let i = 0; i < DK_DA_VO_N; i++){
                let m = MANH[i], ang = m.ang + (Math.random() - 0.5) * 0.1;
                dkDaManh.push({
                    x: x0 + d * (i - 1.5) * 12,
                    y: y0 - i * 9,
                    vx: d * Math.cos(ang) * m.sp,
                    vy: Math.sin(ang) * m.sp - 0.4,
                    s: m.len * 0.46,
                    len: m.len, wid: m.wid,
                    lon: true, dmg: DK_DA_VO_MANH,
                    rot: ang + (d < 0 ? Math.PI : 0),
                    vr: d * (0.05 + Math.random() * 0.05),
                    hit: new Set(), t: 0, lan: false
                });
            }
            dkVo.push({ x: x0 + d * 16, y: Math.min(y0 + 18, gy - 6), t: 0, T: 28, R: 170 });
            for (let k = -1; k <= 1; k += 2){
                let tia = [];
                for (let q = 0; q < 7; q++) tia.push({ a: -Math.PI / 2 + (q - 3) * 0.4, l: 20 + Math.random() * 24 });
                dkNut.push({ x: x0 + k * 22, y: gy, t: 0, T: 52, tia, d: k });
            }
            hitDat(x0, gy, 1, [179, 136, 255]);
            hitDat(x0 + d * 40, gy, 0, [141, 110, 99]);
            shakeTimer = Math.max(shakeTimer || 0, 26);
            dkChu(ng.x - 28, ng.y - 54, "KIẾM VỠ!", "SWORD BURST!");
            dkSfx(68, 0.42, 'sawtooth', 0.32, 26);
            dkSfx(190, 0.12, 'square', 0.16, 55);
        }
// PLAYER_PART_END s4.dkVangVo.1

// index.html:73146 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_M.1 EDITABLE
const DK_M = {
            chem:  { T: 32, hit: 20, ton: 1, dmg: 13, het: 'dat', keys: [[0.45, -0.25, 26, 10, 'io'], [0.62, 1.77, 31, 20, 'in'], [1, 1.77, 31, 20]],
                     hop: [-10, 168, 74, 8], dat: 1, am: 120 },
            // NHAC: day kiem len mot chut (mat dat nut) — khung lai — roi moi giat len. Nang, manh.
            nhac:  { T: 38, hit: 20, ton: 0, dmg: 13, het: 'lung', cho: 22, nut: 7, keys: [[0.2, 1.63, 33, 15, 'out'], [0.4, 1.6, 33, 14], [0.56, -0.5, 28, 12, 'in'], [1, -1.85, 16, 4, 'io']],
                     hop: [-10, 162, 100, 6], am: 260 },
            // NHAY khi kiem dang duoi dat: NHAC MANH len theo da nhay — 11, ton 2
            nhacJ: { T: 24, hit: 6, ton: 2, tonDu: 1, dmg: 9, het: 'lung', cho: 14, keys: [[0.3, -0.5, 28, 12, 'out'], [1, -1.85, 16, 4, 'io']],
                     hop: [-20, 168, 116, 40], day: 16, am: 200 },
            nhacN: { T: 24, hit: 6, ton: 0, dmg: 9, het: 'lung', cho: 16, keys: [[0.3, -0.5, 28, 12, 'out'], [1, -1.85, 16, 4, 'io']],
                     hop: [-20, 164, 110, 40], am: 280 },
            roi:   { T: 22, hit: 12, ton: 1, dmg: 7, het: 'datNeu', keys: [[0.3, -0.4, 26, 10, 'out'], [0.55, 1.77, 31, 20, 'in'], [1, 1.77, 31, 20]],
                     hop: [-10, 158, 40, 0], xuong: 1, am: 110 },
            dam2:  { T: 16, hit: 5, ton: 0, dmg: 10, het: 'dat', keys: [[0.3, 1.6, 42, 22, 'out'], [0.7, 1.6, 42, 22], [1, 1.77, 31, 20, 'io']],
                     hop: [0, 186, 8, 0], am: 420 },
            // ngang: [het lay da, het vung, bat dau thu, nghieng mat phang (am = chech len)]
            ngang: { T: 30, hit: 13, ton: 3, dmg: 9, het: 'lung', cho: 14, ngang: [0.25, 0.5, 0.62, 0], lao: 15, hop: [-80, 212, 44, 6], day: 44, pha: 1, am: 90 },
            // Vong thu hai cua Hoanh Tao: rong hon, nam ngang hon, +1. Khong ton them the luc — nhat dau da tieu het 3.
            ngang2:{ T: 20, hit: 7, ton: 0, dmg: 9, het: 'lung', cho: 10, ngang: [0.08, 0.36, 0.5, 0], lao: 6, hop: [-120, 280, 22, 4], day: 28, pha: 1, am: 74 },
            // K 0.5s: THU kiem ra sau mot chut roi DAM XUYEN, lao xa bang mot cu luot; hop di theo nguoi suot doan lao
            dam:   { T: 30, hit: 12, ton: 1, dmg: 8, het: 'lung', cho: 12, keys: [[0.33, 1.42, 2, 18, 'io'], [0.42, 1.6, 52, 22, 'in'], [0.72, 1.6, 50, 22], [1, -1.85, 16, 4, 'io']],
                     hop: [-20, 184, 10, 0], keoDai: 13, day: 12, laoLuc: 33, am: 360 },
            // K 1s: VUNG CHEM — chem NGANG nhung chech len mot chut, lay da cham roi vung nhanh
            cheo:  { T: 50, hit: 28, ton: 1, dmg: 10, het: 'lung', cho: 12, dung: 1, ngang: [0.45, 0.62, 0.74, -0.2],
                     hop: [-50, 196, 80, 6], day: 34, parry: [0.36, 0.68], am: 150 },
            // K 1.5s: tu the vac lung HA THANG kiem xuong dat sau lung (khong xoay vong) roi vung tu DUOI vong len (nguoc kim dong ho, kieu chem hat len cua Luoi hai);
            // mui kiem miet qua mat dat (nut) ngay truoc khi ra don
            quet:  { T: 60, hit: 34, ton: 2, dmg: 8, het: 'lung', cho: 12, dung: 1, nut: 32, nutX: 40, keys: [[0.3, -1.9, 20, 10, 'io'], [0.42, -1.9, 20, 10], [0.6, -0.7 - 2 * Math.PI, 30, 10, 'in'], [0.78, -0.7 - 2 * Math.PI, 30, 10], [1, -1.85 - 2 * Math.PI, 16, 4, 'io']],
                     hop: [-120, 186, 110, 6], day: 16, dayRa: 1, choang: 18, ghimBay: 1, song: 1, am: 100 },
            cam:   { T: 70, hit: 25, ton: 2, dmg: 0, het: 'cam', dung: 1, keys: [[0.25, 0.15, 30, -4, 'io'], [0.36, Math.PI, 48, -58, 'in'], [1, Math.PI, 48, -58]], am: 70 },
            buff:  { T: 36, hit: 14, ton: 2, dmg: 0, het: 'lung', keys: [[0.4, 0.1, 30, -2, 'io'], [0.75, 0.1, 30, -2], [1, -1.85, 16, 4, 'io']], am: 200 },
            kenh:  { T: 24, hit: 9, ton: 0, dmg: 0, het: 'kenh', dung: 1, keys: [[0.3, 0.15, 30, -4, 'io'], [0.4, Math.PI, 48, -58, 'in'], [1, Math.PI, 48, -58]], am: 70 },
            // K 1.5s: NHAY VOT len, giang xuong. Cac pha (gom luc / bay / lo lung / lao / hau dap) do dkNhayDapTick dieu khien — T,hit chi la tran an toan
            nhayDap: { T: 600, hit: 599, ton: 2, dmg: DK_DAP_DMG, het: 'dat', cho: 14, am: 140 },
            // K 2s: cam kiem hap thu dat da -> DAI CU KIEM THACH. dmg 0 nen khong tinh la don danh
            da:    { T: 78, hit: 24, ton: 2, dmg: 0, het: 'lung', cho: 10, dung: 1, keys: [[0.2, 0.15, 30, -4, 'io'], [0.3, Math.PI, 48, -58, 'in'], [0.78, Math.PI, 48, -58], [1, -1.85, 16, 4, 'io']], am: 90 },
            nho:   { T: 22, hit: 99, ton: 0, dmg: 0, het: 'lung', keys: [[1, -1.85, 16, 4, 'io']] },
            nho2:  { T: 40, hit: 99, ton: 0, dmg: 0, het: 'lung', nut: 8, keys: [[0.22, 1.63, 33, 15, 'out'], [0.42, 1.6, 33, 14], [1, -1.85, 16, 4, 'io']] },
            // @@HE-BZ — chuoi J. khongGhim: mat phep ghim ke bay cua dai kiem goc.
            bzXuong:{ T: 24, hit: 11, ton: 1, dmg: 5, het: 'lung', cho: 12, khongGhim: 1, buoc: 8,
                      keys: [[0.08, -0.5, 24, -4, 'out'], [0.458, 1.95, 34, 22], [1, 1.95, 34, 22]],
                      hop: [-8, 150, 64, 6], am: 150 },
            bzLen:  { T: 24, hit: 11, ton: 1, dmg: 5, het: 'lung', cho: 12, khongGhim: 1, buoc: 6,
                      keys: [[0.458, -0.35, 26, -8], [1, -0.5, 22, -4]],
                      hop: [-16, 148, 96, 10], day: 10, am: 170 },
            bzXoay: { T: 26, hit: 12, ton: 1, dmg: 6, het: 'lung', cho: 12, khongGhim: 1, buoc: 4,
                      ngang: [0.06, 0.46, 1.05, -0.12], hop: [-90, 170, 48, 8], day: 14, am: 130 },
            bzDam:  { T: 22, hit: 10, ton: 1, dmg: 6, het: 'lung', cho: 12, khongGhim: 1, buoc: 12,
                      keys: [[0.08, 1.15, 22, 10, 'out'], [0.455, 1.58, 52, 18], [1, 1.55, 48, 16]],
                      hop: [0, 186, 12, 0], am: 200 },
            bzXuyen:{ T: 30, hit: 16, ton: 1, dmg: 8, het: 'lung', cho: 14, khongGhim: 1, xuyen: 1,
                      keys: [[0.1, 1.2, 16, 12, 'out'], [0.533, 1.62, 56, 18], [1, 1.58, 50, 16]],
                      hop: [-10, 210, 16, 0], keoDai: 6, am: 90 },
            bzDamN: { T: 22, hit: 10, ton: 1, dmg: 6, het: 'lung', cho: 12, khongGhim: 1, buoc: 14,
                      keys: [[0.08, 1.05, 18, 8, 'out'], [0.455, 1.6, 54, 18], [1, 1.55, 48, 16]],
                      hop: [0, 196, 14, 0], am: 210 },
            bzLenN: { T: 24, hit: 11, ton: 1, dmg: 6, het: 'lung', cho: 12, khongGhim: 1, nhay: 1, hat: 36,
                      keys: [[0.458, -0.4, 24, -8], [1, -0.55, 18, -4]],
                      hop: [-20, 150, 110, 16], am: 180 },
            bzBo:   { T: 26, hit: 14, ton: 1, dmg: 8, het: 'lung', cho: 12, khongGhim: 1, xuong: 1,
                      keys: [[0.12, -0.45, 24, -6, 'out'], [0.538, 1.95, 32, 22], [1, 1.95, 32, 22]],
                      hop: [-30, 150, 70, 8], dat: 1, am: 100 },
            bzCam:  { T: 28, hit: 14, ton: 1, dmg: 4, het: 'lung', cho: 12, khongGhim: 1, camKhoa: 1,
                      keys: [[0.12, -0.2, 22, -2, 'out'], [0.5, Math.PI, 44, -40], [1, Math.PI, 44, -48]],
                      hop: [-40, 80, 20, 8], dat: 1, am: 80 },
            // JJ-JJ nhat sau: cam SAU HON, khong dam toi. Ap luc trong luc nang va lau hon.
            bzDe:   { T: 28, hit: 14, ton: 1, dmg: 10, het: 'lung', cho: 14, khongGhim: 1, de: 1,
                      keys: [[0.5, Math.PI, 36, 8], [1, Math.PI, 36, 12]],
                      hop: [-48, 74, 28, 20], dat: 1, am: 55 },
            bzKhi:  { T: 30, hit: 16, ton: 1, dmg: 6, het: 'lung', cho: 0, nghi: 40, khongGhim: 1, khi: 1,
                      keys: [[0.533, -0.85, 16, -6], [1, -1.05, 14, -4]],
                      hop: [-30, 160, 120, 10], am: 110 },
            bzHat:  { T: 16, hit: 8, ton: 0, dmg: 6, het: 'lung', cho: 2, khongGhim: 1, nhay: 1, nhayV: -17.7, hat: 240, treo: 18, lao: 18,
                      keys: [[0.5, -0.4, 24, -8], [1, -0.55, 18, -6]],
                      hop: [-16, 180, 130, 14], am: 160 },
            bzRot:  { T: 56, hit: 99, ton: 1, dmg: 8, het: 'lung', cho: 12, khongGhim: 1, rot: 1, am: 80 },
            bzCua:  { T: 150, hit: 8, ton: 1, dmg: 2, het: 'lung', cho: 12, khongGhim: 1, cua: 1,
                      keys: [[1, 0.4, 28, 8]],
                      am: 90 },
            bzChat: { T: 36, hit: 23, ton: 1, dmg: 12, het: 'lung', cho: 16, khongGhim: 1, chat: 1, dung: 1,
                      keys: [[0.45, -0.25, 26, 10, 'io'], [0.62, 1.77, 31, 20, 'in'], [1, 1.77, 31, 20]],
                      hop: [-10, 168, 74, 8], dat: 1, am: 120 },
            // Charge 2s: thu kiem, de ngang, dam toi, rut ra. bzSau ra don rut va bat suong do.
            bzRut:  { T: 44, hit: 20, ton: 1, dmg: 14, het: 'lung', cho: 12, khongGhim: 1, rut: 1, buoc: 10,
                      keys: [[0.16, Math.PI / 2, 4, 8, 'out'], [0.30, Math.PI / 2, 2, 6], [0.42, Math.PI / 2, 64, 4, 'in'], [0.58, Math.PI / 2, 64, 4], [0.78, Math.PI / 2, 10, 6, 'in'], [1, Math.PI / 2, 8, 6]],
                      hop: [-8, 220, 14, 2], am: 70 },
            // Charge 1s: 3 nhat xoay ngang (bzSau). hit cao de dkRaDon khong ra don som.
            bzVong: { T: 70, hit: 999, ton: 1, dmg: 0, het: 'lung', cho: 14, khongGhim: 1, vong: 1, am: 140 },
            // Channel: 3 nhat ngang lap lai. bzSau ban kiem khi. Khong tu het — tha K moi dung.
            bzKen:  { T: 900, hit: 899, ton: 0, dmg: 0, het: 'lung', cho: 10, khongGhim: 1, ken: 1, am: 90 },
            // Charge 2.5s: loan chem. bzSau dieu khien pha. ton 1 luc bat dau, khong ton tung nhat.
            bzLoan: { T: 360, hit: 999, ton: 1, dmg: 0, het: 'lung', cho: 14, khongGhim: 1, loan: 1, am: 110 },
            // CHARGE 2.5s — CHEM LIEN HOAN (55 sat thuong): chem xuong 8 · chem len 8 (moi don tien len mot chut) · chem ngang 9 roi lui ngan
            //                 · dam toi 10 · gom luc tao Aura roi MUI KHOAN lon lao xuyen 20. Tu noi tiep, khong nhan phim J giua chuoi.
            //                 BAT TU (iframe) SUOT CA CHUOI vi nguoi choi bi ep danh het chuoi. Can >= 4 mau, tru 3 mau (xem bzLoanRa).
            bzLH1: { T: 22, hit: 10, ton: 2, dmg: 8, het: 'lung', cho: 0, khongGhim: 1, tien: 22,
                     keys: [[0.08, -0.5, 24, -4, 'out'], [0.455, 1.95, 34, 22], [1, 1.95, 34, 22]],
                     hop: [-8, 160, 64, 6], am: 150 },
            bzLH2: { T: 22, hit: 10, ton: 0, dmg: 8, het: 'lung', cho: 0, khongGhim: 1, tien: 16,
                     keys: [[0.455, -0.35, 26, -8], [1, -0.5, 22, -4]],
                     hop: [-16, 158, 96, 10], day: 10, am: 170 },
            bzLH3: { T: 26, hit: 12, ton: 0, dmg: 9, het: 'lung', cho: 0, khongGhim: 1, tien: 10, luiSau: 8,
                     ngang: [0.06, 0.46, 1.05, -0.12], hop: [-90, 170, 48, 8], day: 14, am: 130 },
            bzLH4: { T: 22, hit: 10, ton: 0, dmg: 10, het: 'lung', cho: 0, khongGhim: 1, tien: 8, buoc: 12,
                     keys: [[0.08, 1.15, 22, 10, 'out'], [0.455, 1.58, 52, 18], [1, 1.55, 48, 16]],
                     hop: [0, 190, 12, 0], am: 200 },
            bzLH5: { T: 40, hit: 24, ton: 0, dmg: 20, het: 'lung', cho: 14, khongGhim: 1, khoan: 1, keoDai: 12,
                     keys: [[0.12, 1.2, 14, 12, 'out'], [0.42, 1.5, 40, 14], [0.6, 1.6, 54, 16], [1, 1.58, 50, 16]],
                     hop: [-10, 250, 38, 18], am: 90 }
        };
// PLAYER_PART_END s4.DK_M.1

// index.html:73256 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkEm.1 EDITABLE
function dkEm(u, em){
            if (em === 'in') return u * u * u;
            if (em === 'out') return 1 - Math.pow(1 - u, 3);
            if (em === 'io') return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
            return u;
        }
// PLAYER_PART_END s4.dkEm.1

// index.html:73263 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkTuThe.1 EDITABLE
function dkTuThe(dk){
            if (dk.kenh) return DK_CAM.slice();
            if (dk.trang === 'dat') return DK_TAY.slice();
            if (dk.trang === 'cam') return DK_CAM.slice();
            return DK_LUNG.slice();
        }
// PLAYER_PART_END s4.dkTuThe.1

// index.html:73269 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkPose.1 EDITABLE
function dkPose(ng){
            let dk = ng.dk; if (!dk) return { ang: DK_LUNG[0], px: DK_LUNG[1], py: DK_LUNG[2], nen: 1 };
            if (bzBat(ng) && dk.jHold && (dk.jT || 0) > 0 && !dk.A){
                let u = Math.min(1, dk.jT / 150);
                return { ang: -0.75 - u * 0.95, px: 18, py: -4 - u * 12, nen: 1 };
            }
            if (dk.ult && dk.ult.bz){
                let U = dk.ult;
                if (U.get || U.t >= 142) return { ang: Math.PI / 2, px: 40, py: 6, nen: 1 };
                let loc = U.loc || 0, u = Math.max(0, Math.min(1, (loc - 3) / 8));
                let ang = u < 0.45 ? (-0.55 + (1.8 + 0.55) * (u / 0.45)) : 1.8;
                return { ang: ang, px: 24 + u * 10, py: 6 + u * 12, nen: 1 };
            }
            if (dk.ult && dk.ult.t >= 36) return null;        // kiem dang bay tren troi
            if (dk.ult){
                let u = dk.ult.t / 36;
                let phi = u < 0.3 ? -2.6 : u < 0.7 ? -2.6 + dkEm((u - 0.3) / 0.4, 'in') * 4.0 : 1.4;
                return { ang: Math.PI / 2, px: 30, py: 18, nen: Math.cos(phi), phi };
            }
            let A = dk.A;
            if (!A){
                if (bzBat(ng) && dk._hetPose && (dk.cho > 0 || (dk.nghi || 0) > 0 || ((dk.bz || 0) > 0 && (dk.bzRh || 0) <= BZ_NGAT))) return dk._hetPose;
                let p = dkTuThe(dk); return { ang: p[0], px: p[1], py: p[2], nen: 1 };
            }
            if (A.kieu === 'bzCua'){
                if (A._slam){
                    let u = Math.min(1, (A.t - A._slam) / 8);
                    u = 1 - (1 - u) * (1 - u);
                    return { ang: A._slamFrom + (A._slamTo - A._slamFrom) * u, px: 30 + 4 * u, py: 8 + 16 * u, nen: 1 };
                }
                return { ang: A._ang == null ? 0.35 : A._ang, px: 28, py: 6, nen: 1 };
            }
            if (A.kieu === 'bzRot'){
                if (!A._rotNo) return { ang: -0.45, px: 24, py: -8, nen: 1 };
                let u = Math.min(1, (A.t - A._rotNo) / 5);
                u = 1 - (1 - u) * (1 - u);
                return { ang: -0.45 + u * 2.4, px: 28 + u * 4, py: -8 + u * 28, nen: 1 };
            }
            if (A.kieu === 'bzVong' || A.kieu === 'bzKen'){
                const NHIP = 18;
                let tt = Math.max(0, (A.t || 0) - 1);
                let lap = A.kieu === 'bzKen';
                if (!lap && (A.t || 0) > NHIP * 3){
                    let v = Math.min(1, ((A.t || 0) - NHIP * 3) / 10);
                    return { ang: Math.PI / 2 + (DK_LUNG[0] - Math.PI / 2) * v, px: 30 + (DK_LUNG[1] - 30) * v, py: 18 + (DK_LUNG[2] - 18) * v, nen: 1 };
                }
                let idx = lap ? (Math.floor(tt / NHIP) % 3) : Math.min(2, Math.floor(tt / NHIP));
                let u = (tt % NHIP) / NHIP;
                let tilt = [-0.34, 0.28, 0][idx];
                let span = idx === 2 ? 4.8 : 3.6;
                let phi = u < 0.16 ? -2.25 - (u / 0.16) * 0.4 : -2.65 + Math.min(1, (u - 0.16) / 0.5) * span;
                let py = [12, 26, 18][idx];
                return { ang: Math.PI / 2 + tilt, px: idx === 2 ? 36 : 28, py: py, nen: Math.cos(phi), phi: phi };
            }
            if (A.kieu === 'bzLoan'){
                let ph = A.ph || 0, pt = A.pt || 0;
                if (ph === 0 || ph === 2){
                    let u = Math.min(1, pt / 10);
                    let ang = u < 0.4 ? (-0.45 + (1.2 - -0.45) * (u / 0.4)) : 1.2;
                    let k = Math.min(1, u / 0.4);
                    return { ang, px: 20 + k * 30, py: -4 + k * 10, nen: 1 };
                }
                if (ph === 4){
                    let u = Math.min(1, pt / 10);
                    let ang = u < 0.4 ? (0.35 + (-2.45 - 0.35) * (u / 0.4)) : -2.45;
                    return { ang, px: 10, py: 6, nen: 1 };
                }
                if (ph === 1 || ph === 3) return { ang: 1.2, px: 50, py: 6, nen: 1 };
                if (ph === 5) return { ang: -2.45, px: 10, py: 6, nen: 1 };
                if (ph === 6) return { ang: -0.15, px: 18, py: -26, nen: 1 };
                let u = A._gam ? 1 : Math.min(1, pt / 8);
                return { ang: -0.15 + (Math.PI + 0.15) * u, px: 16 + u * 8, py: -26 + u * 46, nen: 1 };
            }
            if (A.kieu === 'nhayDap'){
                // khong dung keys: pha 0 gom luc · 1-2 vac kiem len dinh dau · 3 chem xuong · 4 kiem cam dat
                let ph = A.ph || 0, pt = A.pt || 0, UP = [-0.5, 26, -6];
                if (ph === 0){ let w = dkEm(Math.min(1, pt / 8), 'out');
                    return { ang: DK_LUNG[0] + (UP[0] - DK_LUNG[0]) * w, px: DK_LUNG[1] + (UP[1] - DK_LUNG[1]) * w, py: DK_LUNG[2] + (UP[2] - DK_LUNG[2]) * w, nen: 1 }; }
                if (ph <= 2) return { ang: UP[0] - (ph === 2 ? 0.25 : 0), px: UP[1], py: UP[2], nen: 1 };
                if (ph === 3){ let w = dkEm(Math.min(1, pt / 6), 'in'), a0 = UP[0] - 0.25;
                    return { ang: a0 + (1.77 - a0) * w, px: UP[1] + (31 - UP[1]) * w, py: UP[2] + (20 - UP[2]) * w, nen: 1 }; }
                return { ang: 1.77, px: 31, py: 20, nen: 1 };
            }
            let u = Math.min(1, A.t / A.T), m = A.m;
            if (m.ngang){
                // 2.5D: kiem quay quanh truc dung, phi = 0 chia thang ra truoc. ng[3] nghieng mat phang vung (am = chech len)
                let G = m.ngang, a0 = Math.PI / 2 + G[3], phi;
                let ezVung = (A.kieu && A.kieu.indexOf('bz') === 0) ? 'out' : 'in';
                if (u < G[0]) phi = -2.3 - dkEm(u / Math.max(0.001, G[0]), 'out') * 0.4;
                else if (u < G[1]) phi = -2.7 + dkEm((u - G[0]) / (G[1] - G[0]), ezVung) * 4.1;
                else phi = 1.4;
                if (u < G[2]) return { ang: a0, px: 30, py: 20, nen: Math.cos(phi), phi };
                let v = dkEm((u - G[2]) / (1 - G[2]), 'io');
                return { ang: a0 + (DK_LUNG[0] - a0) * v, px: 30 + (DK_LUNG[1] - 30) * v, py: 20 + (DK_LUNG[2] - 20) * v, nen: Math.cos(1.4) + (1 - Math.cos(1.4)) * v };
            }
            let ks = [[0, A.k0[0], A.k0[1], A.k0[2]]].concat(m.keys);
            let i = 1; while (i < ks.length - 1 && u > ks[i][0]) i++;
            let a = ks[i - 1], b = ks[i];
            let w = b[0] > a[0] ? Math.max(0, Math.min(1, (u - a[0]) / (b[0] - a[0]))) : 1;
            w = dkEm(w, b[4]);
            return { ang: a[1] + (b[1] - a[1]) * w, px: a[2] + (b[2] - a[2]) * w, py: a[3] + (b[3] - a[3]) * w, nen: 1 };
        }
// PLAYER_PART_END s4.dkPose.1

// index.html:73371 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkBan.1 EDITABLE
function dkBan(dk){ return !!(dk.A || dk.cho > 0 || dk.ult); }
// PLAYER_PART_END s4.dkBan.1

// index.html:73372 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkDungYen.1 EDITABLE
function dkDungYen(dk){ return !!((dk.A && dk.A.m.dung) || dk.kenh || dk.ult); }
// PLAYER_PART_END s4.dkDungYen.1

// index.html:73373 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkBatDau.1 EDITABLE
function dkBatDau(ng, kieu, them){
            let dk = dkCua(ng), m = DK_M[kieu];
            if (m.ton && !m.tonDu && ng.ammo < m.ton){ dk._nhanh = 0; dkChu(ng.x - 20, ng.y - 30, "HẾT THỂ LỰC", "NO STAMINA"); return false; }
            let p = dkPose(ng) || { ang: DK_LUNG[0], px: DK_LUNG[1], py: DK_LUNG[2] };
            let nhanh = dk.buff > 0 ? 0.75 : 1;
            let T = Math.max(6, Math.round(m.T * nhanh)), hit = Math.min(T - 1, Math.round(m.hit * nhanh));
            dk.A = { kieu, m, t: 0, T, hit, k0: [p.ang, p.px, p.py], set: new Set(), dir: dkDir(ng), them: them || {} };
            // tam them: J tich luc (cm) + DAI CU KIEM THACH. 4 nhat dau +5 va tam thuong; nhat 5 +7 va Impact rong hon.
            dk.A.rEx = (them && them.reach) || 0; dk.A.bonus = 0;
            if (typeof bzBat === 'function' && bzBat(ng) && (dk.tamThem || 0) > 0 && kieu !== 'bzRut') dk.A.rEx += BZ_TAM_THEM;
            // Liet Dia Tram dang cam kiem da: huy CA thanh kiem, +10 thay vi an 1 luot da thuong.
            if ((m.song || kieu === 'nhayDap' || kieu === 'ngang') && dk.da > 0){
                dk.A.daVo = true; dk.A.bonus = m.song ? 10 : (kieu === 'ngang' ? DK_NGANG_VO_BONUS : 0); dk.da = 0;   // 'quet', 'nhayDap', Dash J ('ngang') PHA kiem da (huy ca thanh kiem)
            } else if (m.dmg > 0 && dk.da > 0){
                let luot = DK_DA_N - dk.da + 1;
                dk.A.daLuot = luot;
                let vo = luot >= DK_DA_N;
                dk.A.bonus = vo ? DK_DA_VO_DMG : DK_DA_DMG;
                dk.A.rEx += vo ? DK_DA_VO_TAM : DK_DA_TAM;
                dk.da--;
            }
            if (m.ton) dkTon(ng, m.tonDu ? Math.min(m.ton, ng.ammo) : m.ton);
            if (typeof setCanBat === 'function' && setCanBat() && (kieu === 'ngang' || kieu === 'ngang2' || kieu === 'dam2' || kieu === 'bzHat' || kieu === 'bzRot' || kieu === 'bzCua')){
                dk.A.bonus = (dk.A.bonus || 0) + 2;
                dk.A.rEx = (dk.A.rEx || 0) + Math.round(((m.hop ? m.hop[1] : 160)) * 0.28);
                dk.A.setDien = 1;
            }
            ng._hoiCho = 45;

            if (m.am) dkSfx(m.am, 0.16, 'sawtooth', 0.18, m.am * 0.45);
            if (dk._nhanh && (kieu === 'chem' || kieu === 'roi' || kieu === 'dam2')){
                let muc = kieu === 'dam2' ? 3 : kieu === 'roi' ? 6 : 8;
                if (dk.A.hit > muc){
                    let cat = dk.A.hit - muc;
                    dk.A.hit = muc;
                    dk.A.T = Math.max(dk.A.hit + 4, dk.A.T - cat);
                }
            }
            dk._nhanh = 0;
            return true;
        }
// PLAYER_PART_END s4.dkBatDau.1

// index.html:73414 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkHopDon.1 EDITABLE
function dkHopDon(ng, A){
            let m = A.m, d = dkDir(ng), dmg = (A.them.dmg || m.dmg) + (A.bonus || 0) + dkCong(A);
            if (m.hop){
                let h = m.hop, duoi = m.xuong ? Math.max(h[3], dkChan(ng) + 6 - (ng.y + ng.h)) : h[3];
                dkHop(ng, h[0], h[1] + (A.rEx || 0), h[2] + (A.rEx || 0) * 0.4, duoi, dmg, A.set, o => {
                    if (m.day) dkDay(o, m.dayRa ? (((o.x + (o.w || 20) / 2) - (ng.x + ng.w / 2)) * d >= 0 ? d : -d) : d, m.day);   // dayRa: day ra XA nguoi choi (ca truoc lan sau)
                    if (m.choang && dkLaQuai(o)){                                  // CHOANG (khung) + ghim ke dich bay xuong dat: chi nhat QUET
                        if (o.stunTimer !== undefined) o.stunTimer = Math.max(o.stunTimer || 0, m.choang);
                        if (typeof venKhoa === 'function') venKhoa(o, m.choang);
                        if (m.ghimBay && dkDangBay(o)) dkGhim(o, DK_TRONG);
                    }
                    if (m.pha) dkPhaDon(o, ng);
                    if (m.parry && dkLaQuai(o) && typeof venKhoa === 'function') venKhoa(o, 14);
                });
            }
        }
// PLAYER_PART_END s4.dkHopDon.1

// index.html:73430 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkRaDon.1 EDITABLE
function dkRaDon(ng, A){
            let m = A.m, d = dkDir(ng);
            dkHopDon(ng, A);
            if (A.kieu === 'ngang' && A.daVo && !A._muiBay){ A._muiBay = 1; dkMuiDaPhong(ng, A); }     // Dash J + kiem da: phong mui da
            if (ng && ng.id === 1 && m.hop && (((A.them && A.them.dmg) || m.dmg || 0) > 0 || (A.bonus || 0) > 0)){
                ng._dtDonSeq = (ng._dtDonSeq || 0) + 1;
                ng._dtDon = { seq: ng._dtDonSeq, atk: {
                    dir: d, reach: (m.hop[1] || 70) + (A.rEx || 0),
                    hTop: (m.hop[2] || 16) + (A.rEx || 0) * 0.4, hBot: m.hop[3] || 16,
                    spin: 0, t: 12, base: Math.max(1, (A.them && A.them.dmg) || m.dmg || 1), fx: null } };
            }
            if (m.buoc) ng.x += d * m.buoc;
            if (m.hat) dkHop(ng, m.hop[0], m.hop[1], m.hop[2], m.hop[3], 0, new Set(), o => dkHatLen(o, d, m.hat, m.treo || 0));
            if (m.camKhoa) bzKhoa(ng, 90, 3, 1);
            if (m.de) bzKhoa(ng, 210, 6, 2);
            if (m.khi) bzSongMau(ng, d, 8);
            if (m.chat) bzChatNo(ng, A);
            if (m.dat || (m.xuong && ng.grounded)){
                let t = dkTG(ng, 31 + 118, 44);
                hitDat(t.x, dkChan(ng), 1, DK_MAU);
                shakeTimer = Math.max(shakeTimer || 0, 12);
            }
            if (m.song){
                let s = ng.getFormScale(), cx = ng.x + ng.w / 2;
                let da = !!A.daVo;
                if (da){
                    dkSong.push({ x: cx, x0: cx, y: dkChan(ng), d, t: 0, T: 78, v: 0, cao: 170, rong: 80, da: true, len: 18,
                        dmg: 8 + 10 + dkCong(A), hit: new Set(), ng });
                    shakeTimer = Math.max(shakeTimer || 0, 18);
                    dkChu(ng.x - 30, ng.y - 44, "CỘT ĐÁ!", "STONE CREST!");
                    dkSfx(55, 0.35, 'sawtooth', 0.28, 30);
                } else {
                    dkSong.push({ x: cx + d * 40 * s, y: dkChan(ng), d, t: 0, T: 62, v: 10.5, cao: 120, rong: 60,
                        dmg: 8 + dkCong(A), hit: new Set(), ng, cres: true, hong: (typeof bzBat === 'function' && bzBat(ng)) });
                    shakeTimer = Math.max(shakeTimer || 0, 14);
                    dkChu(ng.x - 30, ng.y - 44, "LIỆT ĐỊA TRẢM!", "EARTH-RENDER!");
                }
            }
            if (A.kieu === 'cam'){ shakeTimer = Math.max(shakeTimer || 0, 16); let t = dkTG(ng, 48, 44); hitDat(t.x, dkChan(ng), 1, [179, 136, 255]);
                                   dkVong.push({ ng, x: t.x, y: dkChan(ng) - 20, t: 0, T: A.T - A.hit, R: 260 }); }
            if (A.kieu === 'kenh'){ shakeTimer = Math.max(shakeTimer || 0, 14); let t = dkTG(ng, 48, 44); hitDat(t.x, dkChan(ng), 1, [179, 136, 255]); }
            if (A.kieu === 'da'){
                // hap thu dat da bang ma phap trong luc -> thanh dai cu kiem da
                ng.dk.da = DK_DA_N;
                let t = dkTG(ng, 48, 44), gy = dkChan(ng);
                dkHap.push(dkHapMoi(t.x, gy, A.T - A.hit));
                dkVong.push({ ng, x: t.x, y: gy - 20, t: 0, T: A.T - A.hit, R: 230 });
                hitDat(t.x, gy, 1, [179, 136, 255]);
                shakeTimer = Math.max(shakeTimer || 0, 18);
                dkChu(ng.x - 44, ng.y - 48, A.sau ? "RESET TẦNG ĐÁ!" : "ĐẠI CỰ KIẾM THẠCH!", A.sau ? "STONE STACKS RESET!" : "STONE COLOSSUS!");
                dkSfx(60, 0.6, 'sawtooth', 0.3, 32);
                if (A.sau) dkCamSau(ng, A);                                    // CAM SAU: cot da lon quanh nguoi + dot cot nho chay doc map
            }
            if (A.kieu === 'buff'){
                ng.dk.buff = DK_BUFF_T;
                dkChu(ng.x - 34, ng.y - 46, "BÁT MÔN ĐỘN GIÁP!", "EIGHT GATES!");
                dkSfx(80, 0.5, 'sawtooth', 0.28, 220); shakeTimer = Math.max(shakeTimer || 0, 18);
            }
            if (A.daLuot && A.kieu !== 'nhayDap') dkVangDa(ng, A.daLuot);
        }
// PLAYER_PART_END s4.dkRaDon.1

// index.html:73490 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkXong.1 EDITABLE
function dkXong(ng, A){
            let dk = ng.dk, m = A.m;
            if (typeof bzBat === 'function' && bzBat(ng) && A.kieu && (A.kieu.indexOf('bz') === 0 || A.kieu === 'ngang' || A.kieu === 'ngang2')){
                let p = dkPose(ng);
                if (p) dk._hetPose = { ang: p.ang, px: p.px, py: p.py, nen: p.nen == null ? 1 : p.nen, phi: p.phi };
            }
            dk.A = null;
            let het = m.het;
            if (het === 'datNeu') het = ng.grounded ? 'dat' : 'lung';
            if (het === 'cam'){ dk._camCong = dkCong(A); dk.trang = 'lung'; dkGhimTatCa(ng); dkBatDau(ng, 'nho'); return; }
            if (het === 'kenh'){ dk.kenh = true; return; }
            dk.trang = het;
            if (het === 'dat') dk.datT = DK_DAT_T;
            if (m.cho) dk.cho = Math.round(m.cho * (dk.buff > 0 ? 0.6 : 1));
            if (m.nghi){
                dk.nghi = m.nghi;
                dk.cho = 0;
                dk._bzCho = '';
                dk.bz = 0; dk.bzNhanh = ''; dk.bzBuoc = 0; dk.bzRh = 0;
                dk.jHold = false; dk.jT = 0; dk.jTier = 0;
            }
        }
// PLAYER_PART_END s4.dkXong.1

// index.html:73514 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkBocUpd.1 EDITABLE
function dkBocUpd(o){
            if (o._dkBoc) return;
            o._dkBoc = { cu: Object.prototype.hasOwnProperty.call(o, 'update') ? o.update : null };
            let goc = o.update;
            o.update = function(){ let r = goc.apply(this, arguments); dkApVT(this); return r; };
        }
// PLAYER_PART_END s4.dkBocUpd.1

// index.html:73520 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkGoBoc.1 EDITABLE
function dkGoBoc(o){
            if (!o._dkBoc) return;
            if (o._dkBoc.cu) o.update = o._dkBoc.cu; else delete o.update;
            o._dkBoc = null;
        }
// PLAYER_PART_END s4.dkGoBoc.1

// index.html:73525 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkApVT.1 EDITABLE
function dkApVT(o){
            if (o._dkHat){ dkHatAp(o); return; }
            if (o._dkNoi){
                let N = o._dkNoi;
                if (N.keo){ o.x += (N.keo.x - (o.w || 20) / 2 - o.x) * 0.12; o.y += (N.keo.y - (o.h || 20) / 2 - o.y) * 0.12; }
                else o.y = N.y0 - 56 * Math.min(1, N.t / 24) - Math.sin(N.t * 0.12) * 4;
                if (o.dy !== undefined) o.dy = 0;
                return;
            }
            if ((o._dkGhim || 0) > 0){
                let nen = dkMatDuoi(o.x + (o.w || 20) / 2, o.y + (o.h || 20)) - (o.h || 20);
                let buoc = (o._dkAp || 1) >= 2 ? 0.55 : 0.2;
                o._dkKeoK = Math.min(1, (o._dkKeoK || 0) + buoc);
                if (o.y < nen) o.y += (nen - o.y) * o._dkKeoK;
                if (o.dy !== undefined && o.dy < 0) o.dy = 0;
                if ((o._dkAp || 1) >= 2 && o.dashVx) o.dashVx *= 0.45;
            }
        }
// PLAYER_PART_END s4.dkApVT.1

// index.html:73543 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkGhim.1 EDITABLE
function dkGhim(o, T, ap){
            if (!dkLaQuai(o)) return;
            if (!((o._dkGhim || 0) > 0)) o._dkKeoK = 0;
            o._dkGhim = Math.max(o._dkGhim || 0, T);
            if ((ap || 0) > (o._dkAp || 0)) o._dkAp = ap;
            dkBocUpd(o);
        }
// PLAYER_PART_END s4.dkGhim.1

// index.html:73551 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkHatLen.1 EDITABLE
function dkHatLen(o, d, cao, treo, stun){
            if (!o || dkLaVatCan(o) || o._dkHat) return;
            if (!dkLaQuai(o) && gameState !== 'pvp') return;
            o._dkHat = { y0: o.y, cao: cao || Math.max(48, Math.min(160, o.h || 56)), t: 0, roi: false, vy: 0, d: d || 1, treo: treo || 0, stun: stun || 90 };
            o._dkGhim = 0; o.grounded = false;
            if (o.dy !== undefined) o.dy = 0;
            dkBocUpd(o);
        }
// PLAYER_PART_END s4.dkHatLen.1

// index.html:73559 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkHatAp.1 EDITABLE
function dkHatAp(o){
            let H = o._dkHat; if (!H) return;
            H.t++;
            let h = o.h || 40;
            let nen = dkMatDuoi(o.x + (o.w || 20) / 2, o.y + h + 12) - h;
            if (!H.roi){
                let u = Math.min(1, H.t / 10);
                o.y = H.y0 - H.cao * Math.sin(u * Math.PI / 2);
                if (u < 1) o.x += H.d * 0.7;
                if (u >= 1){
                    o.y = H.y0 - H.cao;
                    if ((H.treo || 0) > 0){ H.treo--; o.grounded = false; if (o.dy !== undefined) o.dy = 0; return; }
                    H.roi = true; H.t = 0; H.vy = 0.15;
                }
            } else {
                H.vy += 0.82;
                o.y += H.vy;
                if (o.y >= nen){
                    o.y = nen; o.grounded = true;
                    if (o.dy !== undefined) o.dy = 0;
                    if (o.stunTimer !== undefined) o.stunTimer = Math.max(o.stunTimer || 0, H.stun || 90);
                    venKhoa(o, H.stun || 90);
                    dkChu(o.x, o.y - 30, "CHOÁNG!", "STUN!");
                    o._dkHat = null;
                    if (!((o._dkGhim || 0) > 0) && !o._dkNoi) dkGoBoc(o);
                    return;
                }
            }
            o.grounded = false;
            if (o.dy !== undefined) o.dy = 0;
        }
// PLAYER_PART_END s4.dkHatAp.1

// index.html:73592 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkPhongAn.1 EDITABLE
function dkPhongAn(o){
            if (!dkLaQuai(o)) return;
            o._dkCam = DK_CAM_T;
            if (dkLaBoss(o)){
                dkHuyChieu(o);
                if (o.dashVx !== undefined) o.dashVx = 0;
            }
            if (typeof venKhoa === 'function') venKhoa(o, DK_CAM_T);   // dong cung 1 giay: khong ra duoc chieu moi
        }
// PLAYER_PART_END s4.dkPhongAn.1

// index.html:73602 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkCoIdle.1 EDITABLE
function dkCoIdle(o){
            let C = o.constructor; if (!C) return false;
            if (C._dkIdle === undefined){ let src = ''; try { src = String(C); } catch(e){} C._dkIdle = null;
                for (const st of ['idle', 'hovering', 'nghi', 'wait']) if (new RegExp("state\\s*=\\s*'" + st + "'").test(src)){ C._dkIdle = st; break; } }
            return C._dkIdle;
        }
// PLAYER_PART_END s4.dkCoIdle.1

// index.html:73608 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkHuyChieu.1 EDITABLE
function dkHuyChieu(o){
            if (o.state === undefined || o.dying) return;
            if (typeof o.toIdle === 'function'){ if (o.state !== 'idle') o.toIdle(DK_CAM_T); return; }
            let nghi = dkCoIdle(o);
            if (!nghi || o.state === nghi) return;
            o.state = nghi; o.subTimer = 0;
            if (o.actionTimer !== undefined) o.actionTimer = Math.max(o.actionTimer || 0, DK_CAM_T);
            if (o.y !== undefined && o.baseY !== undefined && !dkDangBay(o)) o.y = Math.min(o.y, o.baseY);
        }
// PLAYER_PART_END s4.dkHuyChieu.1

// index.html:73617 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkPhongAnTick.1 EDITABLE
function dkPhongAnTick(o){
            if (!((o._dkCam || 0) > 0)) return;
            o._dkCam--;
            if (dkLaBoss(o)) dkHuyChieu(o);    // co chieu nao lot qua trong 1 giay: huy tiep
        }
// PLAYER_PART_END s4.dkPhongAnTick.1

// index.html:73622 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkGhimTatCa.1 EDITABLE
function dkGhimTatCa(ng){
            let n = 0;
            let cong = (ng.dk && ng.dk._camCong) || 0;
            if (ng.dk) ng.dk._camCong = 0;
            for (let o of dkDs()) dkPhongAn(o);
            for (let o of dkDs()){
                if (!dkLaQuai(o) || !dkDangBay(o)) continue;
                let dmg = dkLaBoss(o) ? (((o.w || 40) * (o.h || 40) >= 12000) ? 3 : 2) : 2;
                dkDanh(o, dmg + cong); dkGhim(o, DK_GHIM_T); n++;
                hitCat(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, Math.PI / 2, true, [179, 136, 255]);
            }
            dkChu(ng.x - 30, ng.y - 46, n ? "TRỌNG ẤN!" : "TRỌNG ẤN", n ? "GRAVITY SEAL!" : "GRAVITY SEAL");
            dkSfx(55, 0.6, 'sawtooth', 0.3, 30);
            shakeTimer = Math.max(shakeTimer || 0, 20);
        }
// PLAYER_PART_END s4.dkGhimTatCa.1

// index.html:73640 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkNhayDapTick.1 EDITABLE
function dkNhayDapTick(ng, A){
            if (A.ph === undefined){ A.ph = 0; A.pt = 0; A.truoc = !ng.grounded; }
            A.pt++;
            ng.canDoubleJump = false; ng.jumpCount = 9;            // khong nhay doi / ba pha ngang
            ng.hoverTimer = 0; ng.hoverArmed = false;              // rune Lo Lung khong duoc ghi de dy
            if (A.ph === 0){
                if (A.truoc){ A.ph = 2; A.pt = 0; return; }        // da o tren khong: lo lung ngay
                if (A.pt >= 8){
                    ng.dy = -14.5; ng.grounded = false; A.ph = 1; A.pt = 0;
                    let t = dkTG(ng, 31, 44); hitDat(t.x - 20, dkChan(ng), 0, DK_MAU);
                    dkSfx(160, 0.3, 'sawtooth', 0.2, 420);
                }
            } else if (A.ph === 1){
                if ((ng.dy || 0) >= -1 || A.pt > 40){ A.ph = 2; A.pt = 0; }
            } else if (A.ph === 2){
                ng.dy = 0;
                if (A.pt >= 12){ A.ph = 3; A.pt = 0; dkSfx(500, 0.25, 'sawtooth', 0.2, 60); }
            } else if (A.ph === 3){
                ng.dy = Math.max(ng.dy || 0, 20);
                if (ng.grounded || A.pt > 90){ dkNhayDapDap(ng, A); A.ph = 4; A.pt = 0; }
            } else {
                if (A.pt >= 22) dkXong(ng, A);
            }
        }
// PLAYER_PART_END s4.dkNhayDapTick.1

// index.html:73669 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_SAU_LON.1 EDITABLE
const DK_SAU_LON = 30, DK_SAU_NHO = 15, DK_SAU_TAM = 7 * DK_CM, DK_SAU_STUN = 120, DK_SAU_NHO_STUN = 30;
// PLAYER_PART_END s4.DK_SAU_LON.1

// index.html:73670 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkCotDa.1 EDITABLE
let dkCotDa = [];
// PLAYER_PART_END s4.dkCotDa.1

// index.html:73671 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkCamSau.1 EDITABLE
function dkCamSau(ng, A){
            let cx = ng.x + ng.w / 2, gy = dkChan(ng);
            let bL = (typeof worldL === 'function') ? Math.min(worldL(), 0) : 0;
            let bR = (typeof worldR === 'function') ? Math.max(worldR(), canvas.width) : canvas.width;
            const mk = (x, big, delay, hit) => ({ x, y: gy, cx0: cx, w: big ? 38 : 28, h: big ? 138 : 74, big, delay, t: 0, T: big ? 150 : 64, hit,
                                                  jag: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()] });
            let lon = new Set();
            for (const d of [-1, 1]) for (let k = 1; k <= 3; k++) dkCotDa.push(mk(cx + d * k * (DK_SAU_TAM / 3), true, k * 2, lon));
            for (const d of [-1, 1]){
                for (let k = 1; ; k++){
                    let x = cx + d * (DK_SAU_TAM + 12 + k * 46);
                    if (x < bL + 10 || x > bR - 10) break;
                    dkCotDa.push(mk(x, false, 8 + k * 3, new Set()));
                }
            }
            shakeTimer = Math.max(shakeTimer || 0, 36);
            dkChu(cx - 46, gy - 150, "CẮM SÂU! CỘT ĐÁ!", "DEEP PLANT! PILLARS!");
            dkSfx(40, 0.8, 'sawtooth', 0.36, 20); dkSfx(160, 0.35, 'square', 0.22, 50);
        }
// PLAYER_PART_END s4.dkCamSau.1
