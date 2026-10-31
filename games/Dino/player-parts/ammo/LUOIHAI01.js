// PLAYER_FILE: LUOIHAI01
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: FloatingText, LH_DAN, LH_POWER, LT, POWERS, SFX, bosses, canvas, combatStance, ctx, currentAmmoType, currentPower, dealDamage, dino, floatingTexts, frames, gameState, gdCatHop, hitCat, hitDat, keys, lanDangChay2, lanLhP1, lanRieng2, lhDapDa, lhTheoDanh, novaCo, pvpDoiThu, pvpVoBoc, setCanApDon, setCanBat, setCanDmg, setCanTam, shakeTimer, slamLaoBat, trdDs, uniHas, unityOn, venKhoa, wkgHatTung, worldL, worldR
// index.html:71001 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_CM.1 EDITABLE
const LH_CM = 43.4;
// PLAYER_PART_END s4.LH_CM.1

// index.html:71002 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_TIERS.1 EDITABLE
const LH_TIERS = [[30, "#CE93D8"], [60, "#AB47BC"], [90, "#8E24AA"], [135, "#E1BEE7"]];
// PLAYER_PART_END s4.LH_TIERS.1

// index.html:71003 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_LIEN.1 EDITABLE
const LH_LIEN = 10, LH_NGAT = 45;
// PLAYER_PART_END s4.LH_LIEN.1

// index.html:71004 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_HOI.1 EDITABLE
const LH_HOI = 15;
// PLAYER_PART_END s4.LH_HOI.1

// index.html:71005 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_NO_MAX.1 EDITABLE
const LH_NO_MAX = 100, LH_BIEN_T = 600;
// PLAYER_PART_END s4.LH_NO_MAX.1

// index.html:71006 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_CHAM_MAX.1 EDITABLE
const LH_CHAM_MAX = 0.4;
// PLAYER_PART_END s4.LH_CHAM_MAX.1

// index.html:71007 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_STY_DPS.1 EDITABLE
const LH_STY_DPS = 5.5;
// PLAYER_PART_END s4.LH_STY_DPS.1

// index.html:71008 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lh.1 EDITABLE
let lh = null, lhPowerCu = -1;
// PLAYER_PART_END s4.lh.1

// index.html:71009 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhMoi.1 EDITABLE
function lhMoi(){
            return { chuoi: '', dang: null, hoi: 0, rh: 999, bufJ: 0, bufKieu: 'lien', jCu: false, bufLen: false,
                     khong: 0, luotDu: 0, luotBuoc: 0, luotCu: false, hien: [], nem: null, song: [], cheo: [],
                     khien: null, vet: [], hon: [], xac: [], bong: [], ch: null, ult: null, no: 0, bien: 0, bienT: 0,
                     keo: null, vetLuoi: [], vetGoc: [], ang: -1.95, ngatMo: false, danh: 0,
                     fx: [], hoi2: [], theo: null, styLoai: null, styT: -999, phi: 0 };
        }
// PLAYER_PART_END s4.lhMoi.1

// index.html:71016 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhBat.1 EDITABLE
function lhBat(){ return currentAmmoType === LH_DAN; }
// PLAYER_PART_END s4.lhBat.1

// index.html:71022 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhLaChu.1 EDITABLE
function lhLaChu(ng){ return !!ng && (ng.id === 1 || (ng.id === 2 && gameState === 'pvp')); }
// PLAYER_PART_END s4.lhLaChu.1

// index.html:71024 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhCua.1 EDITABLE
function lhCua(ng){
            if (gameState === 'pvp' && ng && typeof lanRieng2 !== 'undefined'){
                if (ng.id === 2) return lanDangChay2 ? lh : (lanRieng2.lh || null);
                if (lanDangChay2) return lanLhP1;
            }
            return lh;
        }
// PLAYER_PART_END s4.lhCua.1

// index.html:71031 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_TEN_PVP.1 EDITABLE
const LH_TEN_PVP = 240;
// PLAYER_PART_END s4.LH_TEN_PVP.1

// index.html:71032 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhReset.1 EDITABLE
function lhReset(){ lh = lhMoi(); }
// PLAYER_PART_END s4.lhReset.1

// index.html:71033 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhDongBo.1 EDITABLE
function lhDongBo(){
            if (typeof POWERS === 'undefined' || typeof LH_POWER === 'undefined') return;
            if (!lh) lh = lhMoi();
            if (lhBat()){
                if (currentPower !== LH_POWER){ lhPowerCu = currentPower; currentPower = LH_POWER; }
                combatStance = 0;
            } else if (currentPower === LH_POWER){
                currentPower = (lhPowerCu >= 0 && lhPowerCu !== LH_POWER) ? lhPowerCu : 0;
                // @@HE-UNITY3: Luoi hai trong bo ba Unity -> doi di van GIU thanh No (truoc day ve 0 moi lan doi)
                let _no = (typeof unityOn === 'function' && unityOn() && typeof uniHas === 'function' && uniHas(LH_DAN) && lh) ? lh.no : 0;
                lhPowerCu = -1; lhReset(); lh.no = _no;
            }
        }
// PLAYER_PART_END s4.lhDongBo.1

// index.html:71046 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhDir.1 EDITABLE
function lhDir(ng){ return ng.isFacingLeft ? -1 : 1; }
// PLAYER_PART_END s4.lhDir.1

// index.html:71047 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTam.1 EDITABLE
function lhTam(){ return lh && lh.bien === 2 ? 1.3 : 1; }
// PLAYER_PART_END s4.lhTam.1

// index.html:71048 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhNhanhT.1 EDITABLE
function lhNhanhT(T){ return lh && lh.bien >= 1 ? Math.max(4, Math.round(T * 0.85)) : T; }
// PLAYER_PART_END s4.lhNhanhT.1

// index.html:71049 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhNhanhHoi.1 EDITABLE
function lhNhanhHoi(R){ return lh ? Math.round(R * (lh.bien === 2 ? 0.45 : lh.bien === 1 ? 0.6 : 1)) : R; }
// PLAYER_PART_END s4.lhNhanhHoi.1

// index.html:71050 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhDat.1 EDITABLE
function lhDat(){ return 320; }
// PLAYER_PART_END s4.lhDat.1

// index.html:71052 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhDs.1 EDITABLE
function lhDs(){
            let ds = (typeof trdDs === 'function') ? trdDs() : [];
            // @@HE-P2KHOA: PvP — doi thu cua nguoi dang chay vong, boc qua pvpVoBoc (he so / tran / nap ult PvP)
            if (gameState === 'pvp' && typeof pvpDoiThu === 'function' && typeof pvpVoBoc === 'function'){
                let o = pvpDoiThu(), v = o ? pvpVoBoc(o) : null;
                if (v && !v.invulnAll && v.hp > 0) ds.unshift(v);
            }
            return ds;
        }
// PLAYER_PART_END s4.lhDs.1

// index.html:71061 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhDanh.1 EDITABLE
function lhDanh(o, dmg, kieu){
            if (!o || o.hp === undefined || o.hp <= 0) return;
            let d = dmg + (lh && lh.bien === 2 ? 1 : 0);
            if (typeof dealDamage === 'function') dealDamage(o, d, kieu || 'ammo'); else o.hp -= d;
            if (lh){ lh.danh++; if (lh.bien === 0) lh.no = Math.min(LH_NO_MAX, lh.no + 2); }
        }
// PLAYER_PART_END s4.lhDanh.1

// index.html:71068 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhHop.1 EDITABLE
function lhHop(x0, y0, x1, y1, dmg, hit, fn){
            if (x0 > x1){ let t = x0; x0 = x1; x1 = t; }
            if (lhVungNguoi) lhTrangGom(x0, y0, x1, y1, dmg);   // @@HE-NOVA3/4: gom hop chem cua nguoi choi -> nhat chem tim bay ra
            if (typeof gdCatHop === 'function') gdCatHop({ x: x0, y: y0, w: x1 - x0, h: y1 - y0 });   // @@HE-GATDAN
            let n = 0;
            for (let o of lhDs()){
                if (hit && hit.has(o)) continue;
                if (o.x + (o.w || 20) < x0 || o.x > x1 || o.y + (o.h || 20) < y0 || o.y > y1) continue;
                if (hit) hit.add(o);
                if (dmg > 0) lhDanh(o, dmg);
                if (fn) fn(o);
                lhImpact(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, lhFxGoc, dmg >= 5);
                n++;
            }
            return n;
        }
// PLAYER_PART_END s4.lhHop.1

// index.html:71085 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhHopNguoi.1 EDITABLE
function lhHopNguoi(ng, sau, truoc, tren, duoi, dmg, hit, fn){
            let d = lhDir(ng), k = lhTam() * ng.getFormScale(), cx = ng.x + ng.w / 2;
            return lhHop(cx + d * sau * k, ng.y - tren * k, cx + d * truoc * k, ng.y + ng.h + duoi, dmg, hit, fn);
        }
// PLAYER_PART_END s4.lhHopNguoi.1

// index.html:71089 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTon.1 EDITABLE
function lhTon(ng, n){
            if (lh && lh.bien === 2) return;                     // @@HE-LHDAN: Than Chet Giang The khong ton the luc
            ng.ammo = Math.max(0, ng.ammo - n);
            if (ng.ammo <= 0){ ng.isOverheated = true; ng.overheatTimer = 75; }
        }
// PLAYER_PART_END s4.lhTon.1

// index.html:71094 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhSfx.1 EDITABLE
function lhSfx(f, d, kieu, v, f2){ if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(f, d, kieu, v, f2); }
// PLAYER_PART_END s4.lhSfx.1

// index.html:71095 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhChu.1 EDITABLE
function lhChu(x, y, vi, en){ floatingTexts.push(new FloatingText(x, y, LT(vi, en))); }
// PLAYER_PART_END s4.lhChu.1

// index.html:71101 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVung.1 EDITABLE
function lhVung(ng, m){
            let T = lhNhanhT(m.T), hit = Math.min(T - 1, Math.max(1, Math.round(m.hit * T / m.T)));
            lh.dang = { m, t: 0, T, hit, hitSet: new Set(), dir: lhDir(ng) };
            lh.hoi = 0; lh.rh = 0;
            if (m.ton) lhTon(ng, m.ton);
            ng._hoiCho = 45;                     // nhu moi vu khi can chien: danh la khoa hoi the luc 45 khung
            ng.attackCooldown = Math.max(ng.attackCooldown || 0, T + lhNhanhHoi(m.hoi || LH_HOI));
            lh.vetLuoi = []; if (lh.vetGoc) lh.vetGoc.length = 0;
            if (m.bat) m.bat(ng);
            if (m.sty) lhStyDat(m.sty);
            // @@HE-LUOIHAI2: dang HIEN THAN -> than chet theo sau DANH HO moi nhat (tre mot nhip)
            if (lh.bien >= 1 && !m.moc) lhTheoDanh(ng, m);
            lhSfx(m.am || 180, 0.12, 'sawtooth', 0.2, (m.am || 180) * 0.4);
        }
// PLAYER_PART_END s4.lhVung.1

// index.html:71115 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhStyDat.1 EDITABLE
function lhStyDat(loai){ if (lh){ lh.styLoai = loai; lh.styT = frames; } }
// PLAYER_PART_END s4.lhStyDat.1

// index.html:71118 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhStyLoai.1 EDITABLE
function lhStyLoai(){
            if (!lh || !lhBat() || !lh.styLoai) return null;
            let conSong = lh.hien.length || lh.song.length || lh.cheo.length || lh.hon.length || lh.nem || lh.khien || lh.ch || lh.hoi2.length;
            if (frames - lh.styT > 90 && !conSong) return null;
            return lh.styLoai;
        }
// PLAYER_PART_END s4.lhStyLoai.1

// index.html:71124 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhRanh.1 EDITABLE
function lhRanh(){ return lh && !lh.dang && lh.hoi <= 0 && !lh.nem && !lh.khien && !lh.ch && !lh.ult && !lh.keo; }
// PLAYER_PART_END s4.lhRanh.1

// index.html:71125 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhBan.1 EDITABLE
function lhBan(){ return lh && (lh.dang || lh.hoi > 0); }
// PLAYER_PART_END s4.lhBan.1

// index.html:71133 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_NGANG_TOI.1 EDITABLE
const LH_NGANG_TOI = [2.7, -0.9], LH_NGANG_LUI = [-2.7, 0.9];
// PLAYER_PART_END s4.LH_NGANG_TOI.1

// index.html:71137 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_LUOT_TAM.1 EDITABLE
const LH_LUOT_TAM = 175, LH_LUOT_DAI = LH_LUOT_TAM / (66 * 0.98);
// PLAYER_PART_END s4.LH_LUOT_TAM.1

// index.html:71138 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_M.1 EDITABLE
const LH_M = {
            // duoi dat
            j1:  { T: 12, hit: 5,  hoi: LH_HOI, ton: 1, a0: -2.3, a1: 1.05, am: 190, sty: 'j',
                   fn: (ng, D) => lhHopNguoi(ng, -10, 112, 44, 6, 3, D.hitSet) },
            // chem NGANG nhung NGUOC: quet ngang tu phia xa ve, luoi lat ngua len
            j2:  { T: 12, hit: 6,  hoi: LH_HOI, ton: 1, ngang: LH_NGANG_LUI, nguoc: 1, am: 210, sty: 'j',
                   fn: (ng, D) => lhHopNguoi(ng, -64, 132, 30, 8, 3, D.hitSet) },
            j3:  { T: 20, hit: 12, hoi: 22, ton: 1, a0: -2.7, a1: 1.3, am: 120, ket: true, sty: 'j',
                   fn: (ng, D) => { lhHopNguoi(ng, -10, 158, 70, 10, 6, D.hitSet); shakeTimer = Math.max(shakeTimer || 0, 10); lhImpactDat(ng, 118, 1); } },
            p1:  { T: 18, hit: 12, hoi: 12, ton: 1, a0: -2.0, a1: -2.0 + Math.PI * 2 + 3.0, am: 240, xoay: 1, sty: 'lh_ngat',
                   fn: (ng, D) => lhHopNguoi(ng, -112, 112, 50, 6, 4, D.hitSet) },
            nem: { T: 16, hit: 13, hoi: 10, ton: 1, a0: -2.0, a1: -2.0 + Math.PI * 2 + 0.2, am: 300, xoay: 1, ket: true, sty: 'lh_ngat',
                   fn: (ng) => lhNemBat(ng) },
            // J J . J: than chet TAM XOAY — xoay ngang (5) · xoay vong chem xuong (6) · xoay nguoc chem len (7) + song 4
            hien2:{ T: 10, hit: 4, hoi: 16, ton: 1, a0: -1.2, a1: -2.2, am: 110, ket: true, sty: 'lh_ngat',
                   fn: (ng) => lhHienBat(ng, 'xoay3', 5) },
            // NHAY LEN chem hat len (nguoc): nguoi choi bat len cung muc tieu
            len: { T: 14, hit: 5,  hoi: 8, ton: 1, a0: 1.4, a1: -2.6, nguoc: 1, am: 260, sty: 'khong', treo: 1,
                   fn: (ng, D) => lhHopNguoi(ng, -14, 108, 100, 8, 3, D.hitSet, o => { if (typeof wkgHatTung === 'function' && !o.invulnAll) wkgHatTung(o, 155, 12, 0.28); }) },
            // tu tren khong CHEM MANH DAP XUONG
            dap: { T: 18, hit: 9, hoi: 20, ton: 1, a0: -2.8, a1: 1.45, am: 100, ket: true, sty: 'khong',
                   bat: (ng) => { ng.dy = Math.max(ng.dy || 0, 12); if (typeof slamLaoBat === 'function') slamLaoBat(ng); },   // @@HE-SLAMLAO
                   fn: (ng, D) => { let d = lhDir(ng), cx = ng.x + ng.w / 2, k = lhTam();
                                    lhHop(cx - d * 14, ng.y - 50 * k, cx + d * 140 * k, lhDat() + 6, 5, D.hitSet);
                                    shakeTimer = Math.max(shakeTimer || 0, 14); lhImpactDat(ng, 96, 1); } },
            hienbo:{ T: 10, hit: 4, hoi: 16, ton: 1, a0: -1.2, a1: -2.4, am: 110, ket: true, sty: 'lh_ngat',
                   fn: (ng) => lhHienBat(ng, 'bo', 5) },
            // tren khong J J . J: than chet hien ra CHEM HAT LEN (4), nguoi choi duoc bat len mot doan de noi combo
            hienhat:{ T: 10, hit: 3, hoi: 6, ton: 1, a0: 1.3, a1: -2.4, nguoc: 1, am: 120, treo: 1, sty: 'lh_ngat',
                   bat: (ng) => { ng.dy = Math.min(ng.dy || 0, -8.5); },
                   fn: (ng) => lhHienBat(ng, 'hat', 4) },
            // luot J J J: chem NGANG lien tuc, doi chieu moi nhat — luoi hai VUON DAI (dai 1.6) nen nhat chem dai han nhat thuong
            l1:  { T: 9, hit: 4, hoi: 6, ton: 1, ngang: LH_NGANG_TOI, dai: LH_LUOT_DAI, luoiK: 1.4, am: 280, sty: 'luot',
                   fn: (ng, D) => lhHopNguoi(ng, -90, LH_LUOT_TAM * (typeof setCanTam === 'function' ? setCanTam() : 1), 44, 8, 4 + (typeof setCanDmg === 'function' ? setCanDmg() : 0), D.hitSet) },
            l2:  { T: 9, hit: 4, hoi: 6, ton: 1, ngang: LH_NGANG_LUI, dai: LH_LUOT_DAI, luoiK: 1.4, nguoc: 1, am: 300, sty: 'luot',
                   fn: (ng, D) => lhHopNguoi(ng, -90, LH_LUOT_TAM * (typeof setCanTam === 'function' ? setCanTam() : 1), 44, 8, 4 + (typeof setCanDmg === 'function' ? setCanDmg() : 0), D.hitSet) },
            // J roi LUOT: chem tu duoi len (nguoc) phong song chan dong
            songluot:{ T: 14, hit: 7, hoi: 14, ton: 1, a0: 1.4, a1: -2.4, nguoc: 1, am: 140, ket: true, sty: 'luot',
                   fn: (ng) => { let st = typeof setCanBat === 'function' && setCanBat(); lhSongBat(ng, st ? Math.round(260 * 1.28) : 260, 5 + (st ? 2 : 0)); if (st && typeof setCanApDon === 'function') setCanApDon(ng, 220); } },
            // cui J: mot VONG NGANG tron sat dat
            cui: { T: 16, hit: 8, hoi: 16, ton: 1, ngang: [Math.PI, -Math.PI], thap: 1, am: 230, ket: true, sty: 'lh_cui',
                   fn: (ng, D) => lhHopNguoi(ng, -152, 152, 4, 8, 3, D.hitSet) },
            // tren khong: hat len (nguoc) · NGANG · chem xuong
            k1:  { T: 10, hit: 4, hoi: 6, ton: 1, a0: 1.3, a1: -2.3, nguoc: 1, am: 260, treo: 1, sty: 'khong',
                   fn: (ng, D) => lhHopNguoi(ng, -20, 108, 70, 20, 3, D.hitSet) },
            k2:  { T: 10, hit: 5, hoi: 6, ton: 1, ngang: LH_NGANG_TOI, am: 230, treo: 1, sty: 'khong',
                   fn: (ng, D) => lhHopNguoi(ng, -60, 128, 36, 26, 3, D.hitSet) },
            k3:  { T: 14, hit: 7, hoi: 14, ton: 1, a0: -2.6, a1: 1.5, am: 120, ket: true, sty: 'khong',
                   fn: (ng, D) => { lhHopNguoi(ng, -20, 124, 30, 70, 6, D.hitSet); ng.dy = Math.max(ng.dy || 0, 9); } },
            // K cham: moc keo
            keo: { T: 22, hit: 8, hoi: 8, ton: 0, a0: -0.3, a1: -0.3, am: 520, moc: 1, sty: 'kngan',
                   fn: (ng) => lhKeoBat(ng) }
        };
// PLAYER_PART_END s4.LH_M.1

// index.html:71192 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_M.jk.1 EDITABLE
LH_M.jk = { T: 14, hit: 5, hoi: 10, ton: 1, ngang: LH_NGANG_TOI, am: 250, ket: true, sty: 'kngan',
                    fn: (ng, D) => lhHopNguoi(ng, -40, 140, 36, 8, 3, D.hitSet),
                    sau: { 12: (ng, D) => lhDapDa(ng, D) } };
// PLAYER_PART_END s4.LH_M.jk.1

// index.html:71196 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_TIM.1 EDITABLE
const LH_TIM = [186, 104, 200];
// PLAYER_PART_END s4.LH_TIM.1

// index.html:71197 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhFxGoc.1 EDITABLE
let lhFxGoc = 0.5;
// PLAYER_PART_END s4.lhFxGoc.1

// index.html:71198 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhImpact.1 EDITABLE
function lhImpact(x, y, goc, to){ hitCat(x, y, goc, to, LH_TIM); }
// PLAYER_PART_END s4.lhImpact.1

// index.html:71199 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhImpactDat.1 EDITABLE
function lhImpactDat(ng, xa, to){
            let d = lhDir(ng), cx = ng.x + ng.w / 2 + d * xa * lhTam();
            hitDat(cx, ng.grounded ? ng.y + ng.h : lhDat(), to, LH_TIM);
        }
// PLAYER_PART_END s4.lhImpactDat.1

// index.html:71205 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickJ.1 EDITABLE
function lhTickJ(ng){
            let jNay = !!keys['KeyJ'];
            if (jNay && !lh.jCu && lh.nem && lhNemThu()){ lh.jCu = jNay; return; }   // J khi luoi hai dang xoay = thu som
            if (jNay && !lh.jCu){
                // canh phim: dang chem / thu hoi -> LIEN; ranh roi thi xet khoang cach tu luc het thu hoi
                // bam trong luc dang chem / thu hoi: GIU hang toi khi ranh (nhat sau ra ngay khi het thu hoi)
                lh.bufJ = lhBan() ? 60 : 12;
                let _lien = ng.grounded ? LH_LIEN : 6;                  // tren khong: nhip "dung" mo som hon mot chut
                lh.bufKieu = lhBan() ? 'lien' : (lh.rh <= _lien ? 'lien' : (lh.rh <= LH_NGAT ? 'ngat' : 'moi'));
            }
            lh.jCu = jNay;
            if (lh.bufJ > 0) lh.bufJ--;
            // cua so DUNG dang mo -> loe tim tren luoi hai (bao cho nguoi choi biet)
            lh.ngatMo = lhRanh() && lh.chuoi !== '' && !/[3tbs]$/.test(lh.chuoi) && !/^kh/.test(lh.chuoi) && lh.rh > (ng.grounded ? LH_LIEN : 6) && lh.rh <= LH_NGAT
                        && (ng.grounded || lh.khong >= 2 || /^[kc]?$/.test(''));
            if (lh.bufDa > 0){                                       // @@HE-LHDAP: J K da xep hang
                lh.bufDa--;
                if (!lh.dang && lhDapDuoc(ng)){ lhDapBat(ng); return; }
                if (!lh.dang && !lhDapDuoc(ng)) lh.bufDa = 0;
            }
            if (!lhRanh()) return;
            if (lh.rh > LH_NGAT && !(lh.luotDu > 0)){ lh.chuoi = ''; lh.khong = 0; lh.luotBuoc = 0; }
            if (lh.bufDap > 0){
                lh.bufDap--;
                if (lhRanh() && !ng.grounded && !ng.isOverheated && ng.ammo > 0){ lh.bufDap = 0; lh.chuoi = 's'; lh.khong = 0; lhVung(ng, LH_M.dap); return; }
            }
            // "LEN" (phim nhay) da xep hang trong luc dang chem
            if (lh.bufLen){
                lh.bufLen = false;
                if (!ng.isOverheated && ng.ammo > 0 && ng.grounded){ lhLenBat(ng); return; }
            }
            // GIU J: vua het thu hoi thi di tiep nhip LIEN; da nghi lau (het qua nhiet...) thi bat dau chuoi moi.
            // Giu phim khong bao gio ra nhanh "dung mot nhip" — nhip dung phai la mot cu BAM co chu y.
            let bam = lh.bufJ > 0, giu = jNay && !bam;
            if (!bam && !giu) return;
            let kieu = bam ? lh.bufKieu : (lh.rh <= LH_LIEN ? 'lien' : 'moi');
            lh.bufJ = 0;
            if (ng.isOverheated || ng.ammo <= 0) return;
            lhThucJ(ng, kieu);
        }
// PLAYER_PART_END s4.lhTickJ.1

// index.html:71245 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhThucJ.1 EDITABLE
function lhThucJ(ng, kieu){
            let crouch = keys['KeyS'] || keys['ArrowDown'];
            // TREN KHONG: hat len · ngang · chem xuong. (J lên = nhat hat len dau tien; K sau do moi la DAP XUONG)
            // @@HE-LUOIHAI3 — Hans: "tren troi combo J J roi dung mot khoang ngan J tiep se tao ra hien than than
            // chet chem hat ke dich len 4 dmg va nguoi choi duoc nhay len mot doan ngan de tiep tuc combo"
            if (!ng.grounded){
                let b = (kieu === 'moi') ? 0 : lh.khong;
                if (kieu === 'ngat' && b >= 2){ lh.khong = 0; lh.chuoi = 'kh'; lhVung(ng, LH_M.hienhat); return; }
                if (b >= 3) b = 0;
                lhVung(ng, [LH_M.k1, LH_M.k2, LH_M.k3][b]);
                lh.khong = b + 1; lh.chuoi = 'k' + lh.khong;
                return;
            }
            lh.khong = 0;
            // @@HE-LHTHU — J ngay sau khi BAT luoi hai: chem XUONG, than chet hien ra chem LEN tao song xung kich
            if (lh.thuF && frames - lh.thuF <= LH_THU_CUA && !crouch){
                lh.thuF = 0;
                lh.chuoi = '3';                                   // ket chuoi: J sau do bat dau chuoi moi
                lhVung(ng, LH_M.j1);
                lhHienBat(ng, 'lenSong', LH_THU_DMG);
                lhChu(ng.x - 30, ng.y - 40, "TỬ THẦN THĂNG!", "REAPER RISE!");
                return;
            }
            // CUI J: mot vong ngang dai; dang hien than thi than chet chem them (ton 2)
            if (crouch){
                lh.chuoi = 'c';
                lhVung(ng, LH_M.cui);
                if (lh.bien >= 1){ lhTon(ng, 1); lhHienBat(ng, 'ngang', 5, true); }
                return;
            }
            // LUOT J J J
            if (lh.luotDu > 0){
                let b = lh.luotBuoc % 3;
                lhVung(ng, b === 1 ? LH_M.l2 : LH_M.l1);
                lh.luotBuoc = b + 1; lh.chuoi = lh.luotBuoc >= 3 ? 's' : '';
                lh.luotDu = lh.luotBuoc >= 3 ? 0 : 22;
                if (lh.luotBuoc >= 3) lh.luotBuoc = 0;
                return;
            }
            let s = (kieu === 'moi') ? '' : lh.chuoi;
            if (s === '1'){
                if (kieu === 'ngat'){ lh.chuoi = 'p'; lhVung(ng, LH_M.p1); }
                else { lh.chuoi = '2'; lhVung(ng, LH_M.j2); }
            } else if (s === '2'){
                if (kieu === 'ngat'){ lh.chuoi = 'b'; lhVung(ng, LH_M.hien2); }
                else { lh.chuoi = '3'; lhVung(ng, LH_M.j3); }
            } else if (s === 'p'){
                lh.chuoi = 't'; lhVung(ng, LH_M.nem);
            } else {
                lh.chuoi = '1'; lhVung(ng, LH_M.j1);
            }
        }
// PLAYER_PART_END s4.lhThucJ.1

// index.html:71298 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhNhay.1 EDITABLE
function lhNhay(){
            if (!lhBat() || !lh || typeof dino === 'undefined' || !dino || !dino.grounded) return false;
            if (lh.chuoi !== '1' || lh.nem || lh.khien || lh.ch || lh.ult) return false;
            if (!(lhBan() || lh.rh <= LH_NGAT)) return false;
            if (dino.isOverheated || dino.ammo <= 0) return false;
            if (lhRanh()) lhLenBat(dino);
            else lh.bufLen = true;
            return true;
        }
// PLAYER_PART_END s4.lhNhay.1

// index.html:71308 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhLenBat.1 EDITABLE
function lhLenBat(ng){
            lh.chuoi = 'u'; lh.khong = 1;                        // dem la nhat tren khong dau tien
            ng.dy = (ng.jumpPower || -12.5) * 1.08; ng.grounded = false; ng.canDoubleJump = true; ng.jumpCount = 1;
            lhVung(ng, LH_M.len);
        }
// PLAYER_PART_END s4.lhLenBat.1

// index.html:71314 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhLuot.1 EDITABLE
function lhLuot(dir){
            if (!lhBat() || !lh || typeof dino === 'undefined' || !dino) return;
            if (dino.grounded && lh.chuoi !== '' && !/[k]/.test(lh.chuoi) && !lh.nem && !lh.khien && !lh.ch && !lh.ult
                && (lhBan() || lh.rh <= LH_NGAT) && !dino.isOverheated && dino.ammo > 0){
                lh.dang = null; lh.hoi = 0;
                lh.chuoi = 's'; lhVung(dino, LH_M.songluot);
                return;
            }
            lh.luotDu = 30; lh.luotBuoc = 0;
        }
// PLAYER_PART_END s4.lhLuot.1

// index.html:71330 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_NEM_TOC.1 EDITABLE
const LH_NEM_TOC = 24, LH_NEM_KEO = 10;
// PLAYER_PART_END s4.LH_NEM_TOC.1

// index.html:71331 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_THU_HOI.1 EDITABLE
const LH_THU_HOI = 2, LH_THU_CUA = 50, LH_THU_DMG = 4, LH_THU_SONG = 4;
// PLAYER_PART_END s4.LH_THU_HOI.1

// index.html:71332 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhNemBat.1 EDITABLE
function lhNemBat(ng){
            let d = lhDir(ng), x0 = ng.x + ng.w / 2 + d * 20;
            lh.nem = { x: x0, y: ng.y + ng.h * 0.4, x1: ng.x + ng.w / 2 + d * 5 * LH_CM, t: 0, T: 60, pha: 'di', goc: 0,
                       hit: new Set(), choang: new Set(), moc: new Set(), d };
            lhSfx(420, 0.3, 'triangle', 0.16, 900);
        }
// PLAYER_PART_END s4.lhNemBat.1

// index.html:71339 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhNemMoc.1 EDITABLE
function lhNemMoc(N){
            for (let o of lhDs()){
                if (o.x + (o.w || 20) < N.x - 62 || o.x > N.x + 62 || o.y + (o.h || 20) < N.y - 62 || o.y > N.y + 62) continue;
                if (o.invulnAll || N.moc.has(o)) continue;
                N.moc.add(o);
                if (!N.choang.has(o)){ N.choang.add(o); if (typeof venKhoa === 'function') venKhoa(o, 30); }
            }
        }
// PLAYER_PART_END s4.lhNemMoc.1

// index.html:71348 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhNemKeo.1 EDITABLE
function lhNemKeo(N, giu){
            for (let o of N.moc){
                if (!o || o.hp === undefined || o.hp <= 0){ N.moc.delete(o); continue; }
                let ox = o.x + (o.w || 20) / 2, dx = N.x - ox;
                o.x += Math.max(-LH_NEM_KEO, Math.min(LH_NEM_KEO, dx * 0.35));
                if (typeof worldL === 'function') o.x = Math.max(worldL(), Math.min(worldR() - (o.w || 20), o.x));
                if (bosses.indexOf(o) < 0){      // quai nho: keo ca theo chieu doc
                    let oy = o.y + (o.h || 20) / 2; o.y += Math.max(-LH_NEM_KEO, Math.min(LH_NEM_KEO, (N.y - oy) * 0.35));
                }
                if (typeof venKhoa === 'function') venKhoa(o, giu);
            }
        }
// PLAYER_PART_END s4.lhNemKeo.1

// index.html:71360 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhNemThu.1 EDITABLE
function lhNemThu(){                     // J lan nua khi dang xoay: thu luoi hai som, KHONG ngat khong che
            let N = lh && lh.nem; if (!N || N.pha !== 'xoay') return false;
            let con = Math.max(0, N.T - N.t);
            for (let o of N.moc) if (o && o.hp > 0 && typeof venKhoa === 'function') venKhoa(o, con + 20);
            N.pha = 've'; N.moc.clear();
            lhSfx(700, 0.1, 'triangle', 0.12, 400);
            return true;
        }
// PLAYER_PART_END s4.lhNemThu.1

// index.html:71368 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickNem.1 EDITABLE
function lhTickNem(ng){
            let N = lh.nem; if (!N) return;
            N.t++; N.goc += 0.55;
            if (N.pha === 'di'){
                N.t = 0;                                             // thoi gian xoay chi tinh tu luc toi noi
                let dx = N.x1 - N.x, st = Math.sign(dx) * Math.min(Math.abs(dx), LH_NEM_TOC);
                // quet tung doan nho de khong lot con nao o GIUA duong bay
                for (let k = 0; k < 3; k++){ N.x += st / 3; lhNemMoc(N); }
                lhNemKeo(N, 30);
                if (Math.abs(N.x1 - N.x) < 1){ N.x = N.x1; N.pha = 'xoay'; N.t = 1; }
                return;
            }
            if (N.pha === 'xoay'){
                lhNemMoc(N);
                lhNemKeo(N, 20);
                if (N.t % 15 === 1){
                    N.hit = new Set();
                    lhHop(N.x - 62, N.y - 62, N.x + 62, N.y + 62, 2, N.hit, o => {
                        if (!N.choang.has(o)){ N.choang.add(o); if (typeof venKhoa === 'function') venKhoa(o, 30); }
                    });
                    lhSfx(600 + (N.t % 30) * 8, 0.05, 'square', 0.08, 900);
                }
                if (N.t >= N.T){ N.pha = 've'; N.moc.clear(); }
            } else {
                let tx = ng.x + ng.w / 2, ty = ng.y + ng.h * 0.4, dx = tx - N.x, dy = ty - N.y, l = Math.hypot(dx, dy);
                if (l < 22){
                    lh.nem = null;
                    // @@HE-LHTHU — Hans: "J-JJ thu luoi hai ve se hoi 2 dan. Don J trong thoi gian ngan tiep theo se chem
                    // luoi hai xuong va than chet hien ra chem luoi hai len tao song xung kich."
                    let _mx = ng.maxAmmo || 5;
                    ng.ammo = Math.min(_mx, (ng.ammo || 0) + LH_THU_HOI);
                    if (ng.ammo > 0 && ng.isOverheated){ ng.isOverheated = false; ng.overheatTimer = 0; }
                    lh.thuF = frames;
                    lhChu(ng.x - 22, ng.y - 26, "BẮT! +" + LH_THU_HOI, "CATCH! +" + LH_THU_HOI);
                    return;
                }
                N.x += dx / l * 16; N.y += dy / l * 16;
            }
        }
// PLAYER_PART_END s4.lhTickNem.1

// index.html:71410 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_X3_NHIP.1 EDITABLE
const LH_X3_NHIP = [22, 44, 64];
// PLAYER_PART_END s4.LH_X3_NHIP.1

// index.html:71411 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_X3_SONG.1 EDITABLE
const LH_X3_SONG = 4, LH_X3_XA = 0.85;
// PLAYER_PART_END s4.LH_X3_SONG.1

// index.html:71412 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhHienBat.1 EDITABLE
function lhHienBat(ng, kieu, dmg, cui){
            let d = lhDir(ng), cx = ng.x + ng.w / 2;
            let H = { kieu, dmg, d, x: cx - d * 46, y: ng.y + ng.h, t: 0, T: 40, hitAt: [22], hit: new Set(), cui: !!cui, dx: 0 };
            if (kieu === 'bo'){ H.T = 44; H.hitAt = [26]; H.x = cx - d * 30; }
            if (kieu === 'doc'){ H.T = 26; H.hitAt = [14]; H.x = cx - d * 34; }
            if (kieu === 'jjj'){ H.T = 46; H.hitAt = [12, 24, 36]; H.x = cx; H.dx = d * 3.6; }
            if (kieu === 'hat'){ H.T = 30; H.hitAt = [11]; H.x = cx + d * 6; H.y = ng.y + ng.h + 34; }
            if (kieu === 'lenSong'){ H.T = 36; H.hitAt = [18]; H.x = cx + d * 10; }   // @@HE-LHTHU: doi nhat chem xuong cua nguoi choi xong roi moi vut len
            /* @@HE-LUOIHAI4 — Hans: "Combo J J - J cua Liem dang phe qua. Khi dung Combo do Than chet xoay ngang, xoay vong
               chem xuong va xoay vong nguoc lai chem len tao ra mot dot song nang luong manh hon so voi nguoi choi. Don do gay
               them 1 va 2 dmg so voi don chem ngang va song nang luong gay 4 dmg ra xa gan ca man hinh."
               Ba nhat: NGANG `dmg` · XUONG `dmg + 1` · LEN `dmg + 2`, moi nhat tinh trung rieng. Nhat LEN phong SONG TO
               (4 dmg, bay ~85% be ngang man hinh, cao va rong gap ruoi song cua nguoi choi). */
            if (kieu === 'xoay3'){ H.T = 88; H.hitAt = [LH_X3_NHIP[0], LH_X3_NHIP[1], LH_X3_NHIP[2]]; H.dmgs = [dmg, dmg + 1, dmg + 2]; }
            if (cui){ H.T = 30; H.hitAt = [16]; }
            if (typeof worldL === 'function' && kieu !== 'jjj') H.x = Math.max(worldL() + 40, Math.min(worldR() - 40, H.x));   // sat mep map: dung trong khung hinh
            lh.hien.push(H);
            lhSfx(90, 0.4, 'sawtooth', 0.22, 50);
            return H;
        }
// PLAYER_PART_END s4.lhHienBat.1

// index.html:71432 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickHien.1 EDITABLE
function lhTickHien(){
            for (let i = lh.hien.length - 1; i >= 0; i--){
                let H = lh.hien[i]; H.t++;
                H.x += H.dx;
                if (typeof worldL === 'function') H.x = Math.max(worldL() - 20, Math.min(worldR() + 20, H.x));
                if (H.hitAt.indexOf(H.t) >= 0){
                    let k = lhTam(), cx = H.x, d = H.d;
                    if (H.kieu === 'jjj' || H.kieu === 'xoay3') H.hit = new Set();
                    if (H.kieu === 'xoay3'){
                        let n = H.hitAt.indexOf(H.t), dm = H.dmgs[n];
                        if (n === 0) lhHop(cx - d * 90 * k, H.y - 76 * k, cx + d * 250 * k, H.y + 6, dm, H.hit);              // xoay NGANG
                        else if (n === 1){ lhHop(cx - d * 40 * k, H.y - 170 * k, cx + d * 240 * k, H.y + 10, dm, H.hit);      // xoay vong CHEM XUONG
                                           lhImpactDat({ x: cx - 20, w: 40, y: H.y - 44, h: 44, grounded: true, isFacingLeft: d < 0 }, 120, 1); }
                        else {
                            lhHop(cx - d * 40 * k, H.y - 190 * k, cx + d * 240 * k, H.y + 10, dm, H.hit,                          // xoay NGUOC CHEM LEN
                                  o => { if (typeof wkgHatTung === 'function' && !o.invulnAll) wkgHatTung(o, 90); });
                            let W = (typeof canvas !== 'undefined' && canvas.width) ? canvas.width : 1000;
                            lhSongTao(cx + d * 40, H.y, d, W * LH_X3_XA, LH_X3_SONG, 1.5, 15);
                            shakeTimer = Math.max(shakeTimer || 0, 18);
                        }
                    }
                    else if (H.kieu === 'ngang') lhHop(cx - d * (H.cui ? 250 : 90) * k, H.y - 76 * k, cx + d * (H.cui ? 250 : 250) * k, H.y + 6, H.dmg, H.hit);
                    else if (H.kieu === 'bo') lhHop(cx + d * 20, H.y - 150 * k, cx + d * 260 * k, H.y + 10, H.dmg, H.hit);
                    else if (H.kieu === 'doc') lhHop(cx + d * 10, H.y - 130 * k, cx + d * 170 * k, H.y + 8, H.dmg, H.hit);
                    else if (H.kieu === 'jjj') lhHop(cx - d * 20, H.y - 90 * k, cx + d * 140 * k, H.y + 6, H.dmg, H.hit);
                    else if (H.kieu === 'lenSong'){                    // @@HE-LHTHU
                        lhHop(cx - d * 30, H.y - 190 * k, cx + d * 200 * k, H.y + 10, H.dmg, H.hit,
                              o => { if (typeof wkgHatTung === 'function' && !o.invulnAll) wkgHatTung(o, 80); });
                        let W = (typeof canvas !== 'undefined' && canvas.width) ? canvas.width : 1000;
                        lhSongTao(cx + d * 40, H.y, d, W * 0.7, LH_THU_SONG, 1.3, 14);
                        shakeTimer = Math.max(shakeTimer || 0, 16);
                    }
                    else if (H.kieu === 'hat') lhHop(cx - d * 20, H.y - 180 * k, cx + d * 170 * k, H.y + 10, H.dmg, H.hit,
                                                     o => { if (typeof wkgHatTung === 'function' && !o.invulnAll) wkgHatTung(o, 100); });
                    shakeTimer = Math.max(shakeTimer || 0, H.kieu === 'bo' ? 14 : 8);
                    lhSfx(150, 0.2, 'sawtooth', 0.22, 60);
                }
                if (H.t >= H.T) lh.hien.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.lhTickHien.1

// index.html:71474 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhSongBat.1 EDITABLE
function lhSongBat(ng, xa, dmg){
            let d = lhDir(ng), k = lhTam();
            lh.song.push({ x: ng.x + ng.w / 2 + d * 30, x0: ng.x + ng.w / 2, y: ng.y + ng.h, d, v: 10, xa: xa * k, cao: 74 * k,
                           dmg, hit: new Set(), t: 0 });
            shakeTimer = Math.max(shakeTimer || 0, 10);
            lhSfx(70, 0.45, 'sawtooth', 0.28, 200);
        }
// PLAYER_PART_END s4.lhSongBat.1

// index.html:71482 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhSongTao.1 EDITABLE
function lhSongTao(x, y, d, xa, dmg, to, v){
            let k = lhTam();
            lh.song.push({ x, x0: x, y, d, v: v || 10, xa, cao: 74 * k * to, rong: 150 * to, to: 1,
                           dmg, hit: new Set(), t: 0 });
            lhSfx(55, 0.6, 'sawtooth', 0.32, 260); lhSfx(420, 0.3, 'triangle', 0.16, 1200);
        }
// PLAYER_PART_END s4.lhSongTao.1

// index.html:71488 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickSong.1 EDITABLE
function lhTickSong(){
            for (let i = lh.song.length - 1; i >= 0; i--){
                let S = lh.song[i]; S.t++;
                S.x += S.d * S.v;
                let lon = Math.min(1, S.t / 8), h = S.cao * lon;
                lhHop(S.x - S.d * (S.rong || 150), S.y - h, S.x + S.d * 10, S.y + 4, S.dmg, S.hit);
                if (Math.abs(S.x - S.x0) >= S.xa || S.t > (S.to ? 120 : 90)) S.het = (S.het || 0) + 1;
                if (S.het > 10) lh.song.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.lhTickSong.1

// index.html:71500 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhCheoBat.1 EDITABLE
function lhCheoBat(ng){
            let d = lhDir(ng);
            lh.cheo.push({ x: ng.x + ng.w / 2 + d * 60, y: ng.y + ng.h * 0.35, d, t: 0, T: 52, hit: new Set(), dmg: 3 });
            lhSfx(900, 0.3, 'triangle', 0.2, 300);
        }
// PLAYER_PART_END s4.lhCheoBat.1

// index.html:71505 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickCheo.1 EDITABLE
function lhTickCheo(){
            for (let i = lh.cheo.length - 1; i >= 0; i--){
                let C = lh.cheo[i]; C.t++; C.x += C.d * 11;
                let R = 46 * lhTam();
                lhHop(C.x - R, C.y - R, C.x + R, C.y + R, C.dmg, C.hit);
                if (C.t >= C.T || (typeof worldR === 'function' && (C.x < worldL() - 80 || C.x > worldR() + 80))) lh.cheo.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.lhTickCheo.1

// index.html:71525 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVungNguoi.1 EDITABLE
let lhVungNguoi = false;
// PLAYER_PART_END s4.lhVungNguoi.1

// index.html:71539 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_TRANG_TOC.1 EDITABLE
const LH_TRANG_TOC = 12, LH_TRANG_XA = 220, LH_TRANG_DMG = 1, LH_TRANG_TAN = 8;
// PLAYER_PART_END s4.LH_TRANG_TOC.1

// index.html:71540 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTrangHop.1 EDITABLE
let lhTrangHop = null;
// PLAYER_PART_END s4.lhTrangHop.1

// index.html:71541 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTrangGom.1 EDITABLE
function lhTrangGom(x0, y0, x1, y1, dmg){
            let H = lhTrangHop;
            if (!H){ lhTrangHop = { x0, y0, x1, y1, dmg: dmg || 0 }; return; }
            H.x0 = Math.min(H.x0, x0); H.y0 = Math.min(H.y0, y0); H.x1 = Math.max(H.x1, x1); H.y1 = Math.max(H.y1, y1);
            H.dmg = Math.max(H.dmg, dmg || 0);
        }
// PLAYER_PART_END s4.lhTrangGom.1

// index.html:71547 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTrangBan.1 EDITABLE
function lhTrangBan(ng, H, D){
            let m = (D && D.m) || {}, d = (D && D.dir) || lhDir(ng);
            let ngang = !!m.ngang, manh = H.dmg >= 5 || !!m.ket, k = manh ? 1.45 : 1;
            let bw = H.x1 - H.x0, bh = H.y1 - H.y0, V;
            if (ngang){
                let ry = Math.max(14, Math.min(26, bh * 0.22)) * k, ro = Math.max(56, Math.min(96, bw * 0.45)) * k;
                V = { ngang: 1, ry, ro, ri: ro * 0.5, rot: 0, y: m.thap ? H.y1 - ry - 4 : H.y0 + bh * 0.55 };
            } else {
                let ry = Math.max(26, Math.min(64, bh / 2 + 6)) * k;
                let rot = m.xoay ? 0 : ((m.nguoc || (m.a1 !== undefined && m.a0 !== undefined && m.a1 < m.a0)) ? -0.28 : 0.28);
                V = { ngang: 0, ry, ro: ry * 0.62, ri: ry * 0.24, rot, y: (H.y0 + H.y1) / 2 };
            }
            let x = ng.x + ng.w / 2 + d * Math.min(60, Math.max(24, Math.abs((d > 0 ? H.x1 : H.x0) - (ng.x + ng.w / 2)) * 0.5)) - d * V.ro * 0.4;
            Object.assign(V, { x, x0: x, d, t: 0, het: 0, manh, xa: LH_TRANG_XA * lhTam(), hit: new Set() });
            let T = lh.trang || (lh.trang = []);
            if (T.length > 10) T.shift();
            T.push(V);
            lhSfx(manh ? 380 : 560, manh ? 0.14 : 0.08, 'triangle', manh ? 0.14 : 0.10, 1400);
        }
// PLAYER_PART_END s4.lhTrangBan.1

// index.html:71566 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickTrang.1 EDITABLE
function lhTickTrang(){
            let T = lh.trang; if (!T || !T.length) return;
            for (let i = T.length - 1; i >= 0; i--){
                let V = T[i]; V.t++;
                if (V.het){ if (++V.het > LH_TRANG_TAN) T.splice(i, 1); continue; }
                if (V.vx !== undefined){ V.x += V.vx; V.y += V.vy; }   // @@HE-LOLUNG3: nhat bay xien
                else V.x += V.d * (V.toc || LH_TRANG_TOC);
                // hop an: tu lung cung trong toi mui cung ngoai; nghieng thi nong them chut chieu doc
                let ry = V.ry + Math.abs(V.rot) * V.ro;
                if (V.vx !== undefined) lhHop(V.x - V.ro * 0.7, V.y - V.ry * 0.8, V.x + V.ro * 0.7, V.y + V.ry * 0.8, V.dmg || LH_TRANG_DMG, V.hit);
                else lhHop(V.x + V.d * (V.ri * 0.2 - 10), V.y - ry, V.x + V.d * V.ro, V.y + ry, V.dmg || LH_TRANG_DMG, V.hit);
                let _di = V.y0 !== undefined ? Math.hypot(V.x - V.x0, V.y - V.y0) : Math.abs(V.x - V.x0);
                if (V.vx !== undefined && typeof lhDat === 'function' && V.y > lhDat() + 40) V.het = 1;   // cam xuong dat thi tan
                if (_di >= V.xa || (typeof worldL === 'function' && (V.x < worldL() - 60 || V.x > worldR() + 60))) V.het = 1;
            }
        }
// PLAYER_PART_END s4.lhTickTrang.1

// index.html:71582 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeTrang.1 EDITABLE
function lhVeTrang(V){
            let a = V.het ? Math.max(0, 1 - V.het / LH_TRANG_TAN) : Math.min(1, 0.45 + V.t * 0.18);
            let u = Math.min(1, (V.y0 !== undefined ? Math.hypot(V.x - V.x0, V.y - V.y0) : Math.abs(V.x - V.x0)) / V.xa);
            ctx.save();
            ctx.translate(V.x, V.y); ctx.scale(V.d, 1); ctx.rotate(V.rot);
            let hinh = (ox, s) => {
                ctx.beginPath();
                ctx.ellipse(ox, 0, V.ro * s, V.ry * s, 0, -Math.PI / 2, Math.PI / 2);
                ctx.ellipse(ox, 0, V.ri * s, V.ry * s, 0, Math.PI / 2, -Math.PI / 2, true);
                ctx.closePath();
            };
            for (let s = 2; s >= 1; s--){                       // bong mo keo phia sau
                ctx.globalAlpha = a * (0.14 + 0.08 * (2 - s)) * (1 - u * 0.5);
                ctx.fillStyle = "#7B1FA2"; hinh(-s * (V.ngang ? 18 : 13), 1 - s * 0.05); ctx.fill();
            }
            ctx.globalAlpha = a * 0.95;
            let g = ctx.createLinearGradient(V.ri * 0.5, 0, V.ro, 0);
            g.addColorStop(0, "rgba(106,27,154,0.55)"); g.addColorStop(0.55, "rgba(171,71,188,0.9)"); g.addColorStop(1, "rgba(243,229,245,1)");
            ctx.fillStyle = g; hinh(0, 1); ctx.fill();
            ctx.strokeStyle = "rgba(243,229,245," + (0.9 * a).toFixed(2) + ")"; ctx.lineWidth = V.manh ? 3 : 2;
            ctx.beginPath(); ctx.ellipse(0, 0, V.ro, V.ry, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke();
            if (V.manh){                                          // don manh: quang sang hong bao ngoai
                ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a * 0.35;
                ctx.strokeStyle = "#EA80FC"; ctx.lineWidth = 7;
                ctx.beginPath(); ctx.ellipse(0, 0, V.ro * 1.05, V.ry * 1.05, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeTrang.1

// index.html:71610 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTayBat.1 EDITABLE
function lhTayBat(ng){
            let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2, xa = 8 * LH_CM * lhTam();
            let best = null, bd = 1e9;
            for (let o of lhDs()){
                let gan = Math.max(0, Math.max(o.x - cx, cx - (o.x + (o.w || 20))));   // toi MEP gan, ca hai phia
                let oy = o.y + (o.h || 20) / 2;
                if (gan > xa || Math.abs(oy - cy) > 120 + (o.h || 20) / 2) continue;
                if (gan < bd){ bd = gan; best = o; }
            }
            if (!best){ lhChu(cx - 20, ng.y - 24, "HỤT!", "MISS!"); return; }
            let ox = best.x + (best.w || 20) / 2;
            ng.isFacingLeft = ox < cx;
            let d = lhDir(ng);
            /* @@HE-NOVA4 — Hans: "Tay linh hon khong hien thi". Truoc day tay moc ngay khung dau (dai san), keo lien
               va ve DUOI nguoi choi — lao toi boss thi canh tay co lai con vai px, gan nhu khong thay. Gio chia pha:
               VUON (LH_TAY_VUON khung): ban tay tim bay tu vai toi muc tieu, chua ai di chuyen; CHUP: 1 sat thuong;
               roi moi KEO con nho ve / nguoi choi LAO toi con to. Ve o lhVeTren (tren nguoi choi). */
            let to = (typeof bosses !== 'undefined' && bosses.indexOf(best) >= 0) || (best.w || 20) > 90 || (best.h || 20) > 110;
            if (!to){
                if (typeof venKhoa === 'function') venKhoa(best, 30 + LH_TAY_VUON);
                let den = d > 0 ? (cx + 26) : (cx - 26 - (best.w || 20));
                lh.keo = { o: best, t: 0, T: 10, T2: 18, vx: (den - best.x) / 10, tay: 1, vuon: LH_TAY_VUON };
            } else {
                lh.keo = { o: best, t: 0, T: 12, T2: 20, vx: 0, laoCho: 1, tay: 1, vuon: LH_TAY_VUON };
                ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 14 + LH_TAY_VUON);
            }
            lhChu(best.x, best.y - 22, "TAY LINH HỒN!", "SOUL HAND!");
            shakeTimer = Math.max(shakeTimer || 0, 8);
            lhSfx(260, 0.14, 'sawtooth', 0.14, 700);
        }
// PLAYER_PART_END s4.lhTayBat.1

// index.html:71640 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_TAY_VUON.1 EDITABLE
const LH_TAY_VUON = 7;
// PLAYER_PART_END s4.LH_TAY_VUON.1

// index.html:71642 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeTay.1 EDITABLE
function lhVeTay(ng, K){ return lhVeTay2(ng, K); }
// PLAYER_PART_END s4.lhVeTay.1

// index.html:71643 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeTayCu.1 EDITABLE
function lhVeTayCu(ng, K){
            let o = K.o; if (!o) return;
            let d = lhDir(ng), sx = ng.x + ng.w / 2 + d * 14, sy = ng.y + ng.h * 0.4;
            let tx = d > 0 ? o.x + 4 : o.x + (o.w || 20) - 4, ty = o.y + (o.h || 20) * 0.45;
            let a = K.t <= K.T ? 1 : Math.max(0, 1 - (K.t - K.T) / ((K.T2 || K.T) - K.T));
            let dai = Math.hypot(tx - sx, ty - sy), goc = Math.atan2(ty - sy, tx - sx);
            ctx.save();
            ctx.translate(sx, sy); ctx.rotate(goc);
            for (let k = 0; k < 3; k++){                                   // than tay: ba lop khoi tim luon song
                ctx.globalAlpha = a * (0.35 + 0.2 * k);
                ctx.strokeStyle = k === 0 ? "#4A148C" : (k === 1 ? "#8E24AA" : "#E1BEE7"); ctx.lineWidth = 14 - k * 5;
                ctx.beginPath(); ctx.moveTo(0, 0);
                for (let s = 1; s <= 8; s++){ let u = s / 8; ctx.lineTo(dai * u, Math.sin(frames * 0.35 + u * 7 + k) * 4 * (1 - u * 0.6)); }
                ctx.stroke();
            }
            ctx.globalAlpha = a * 0.95; ctx.fillStyle = "#8E24AA";            // ban tay
            ctx.beginPath(); ctx.arc(dai, 0, 9, 0, 6.28); ctx.fill();
            ctx.strokeStyle = "#F3E5F5"; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
            for (let k = 0; k < 4; k++){
                let g = -0.9 + k * 0.6;
                ctx.beginPath(); ctx.moveTo(dai + Math.cos(g) * 7, Math.sin(g) * 7);
                ctx.quadraticCurveTo(dai + Math.cos(g) * 16, Math.sin(g) * 16, dai + Math.cos(g * 0.6) * 20, Math.sin(g) * 12 + 4 * Math.sign(g || 1));
                ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeTayCu.1

// index.html:71672 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeXuong.1 EDITABLE
function lhVeXuong(x1, y1, x2, y2, w){
            // mot doan xuong: than + hai dau loi (dau xuong)
            ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
            let g = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(g) * w * 0.55, ny = Math.cos(g) * w * 0.55;
            for (const [x, y] of [[x1, y1], [x2, y2]]){
                ctx.beginPath(); ctx.arc(x + nx, y + ny, w * 0.62, 0, 6.28); ctx.arc(x - nx, y - ny, w * 0.62, 0, 6.28); ctx.fill();
            }
        }
// PLAYER_PART_END s4.lhVeXuong.1

// index.html:71680 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeTay2.1 EDITABLE
function lhVeTay2(ng, K){
            let o = K.o; if (!o) return;
            let d = lhDir(ng), sx = ng.x + ng.w / 2 + d * 14, sy = ng.y + ng.h * 0.4;
            let tx = d > 0 ? o.x + 6 : o.x + (o.w || 20) - 6, ty = o.y + Math.min((o.h || 20) * 0.45, 70);
            let V = K.vuon || 0, p = K.t - V, T2 = K.T2 || K.T;
            let u = V ? Math.min(1, K.t / V) : 1, chup = p >= 0;
            let hx = sx + (tx - sx) * u, hy = sy + (ty - sy) * u;
            let a = p <= K.T ? 1 : Math.max(0, 1 - (p - K.T) / Math.max(1, T2 - K.T));
            let dai = Math.max(1, Math.hypot(hx - sx, hy - sy)), goc = Math.atan2(hy - sy, hx - sx);
            ctx.save();
            ctx.translate(sx, sy); ctx.rotate(goc);
            ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            let cx = dai - 16;                                       // co tay
            let kx = cx * 0.46, ky = -Math.min(22, dai * 0.08) * (1 - 0.4 * u) + Math.sin(frames * 0.5) * 1.5;   // khuyu gap len
            // hon ma tim bao ngoai
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            ctx.globalAlpha = a * 0.28; ctx.strokeStyle = "#AB47BC"; ctx.lineWidth = 24;
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(kx, ky); ctx.lineTo(cx, 0); ctx.lineTo(dai, 0); ctx.stroke();
            ctx.globalAlpha = a * 0.22; ctx.fillStyle = "#EA80FC"; ctx.beginPath(); ctx.arc(dai, 0, 22, 0, 6.28); ctx.fill();
            ctx.restore();
            // xuong: mau nga, vien tim sam
            let ve = (fn) => {
                ctx.globalAlpha = a; ctx.strokeStyle = "#4A148C"; ctx.fillStyle = "#4A148C"; fn(2.5);
                ctx.strokeStyle = "#F5F0E1"; ctx.fillStyle = "#F5F0E1"; fn(0);
            };
            ve(v => {
                lhVeXuong(0, 0, kx, ky, 6 + v);                                  // xuong canh tay tren
                lhVeXuong(kx, ky - 2.5, cx, -2.5, 3.6 + v);                     // xuong quay
                lhVeXuong(kx, ky + 2.5, cx, 2.5, 3.2 + v);                      // xuong tru
            });
            ctx.globalAlpha = a; ctx.fillStyle = "#F5F0E1"; ctx.strokeStyle = "#4A148C"; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(kx, ky, 5.5, 0, 6.28); ctx.fill(); ctx.stroke();   // khop khuyu
            // ban tay xuong: dot co tay + 4 ngon, moi ngon 3 dot
            for (let k = 0; k < 3; k++){ ctx.beginPath(); ctx.arc(cx + 5 + k * 3.5, (k - 1) * 4, 3, 0, 6.28); ctx.fill(); ctx.stroke(); }
            for (let k = 0; k < 4; k++){
                let g0 = (-0.75 + k * 0.5) * (chup ? 0.55 : 1.1);       // huong ngon
                let cong = chup ? 0.75 : 0.18;                            // quap vao khi chup
                let x = cx + 12, y = (k - 1.5) * 4, g = g0;
                let dots = [9, 7, 5];
                ve(v => {
                    let X = x, Y = y, G = g;
                    for (let s = 0; s < 3; s++){
                        let L = dots[s] * (chup ? 0.9 : 1.15), X2 = X + Math.cos(G) * L, Y2 = Y + Math.sin(G) * L;
                        lhVeXuong(X, Y, X2, Y2, 2 + v * 0.8);
                        X = X2; Y = Y2; G += cong * (k < 2 ? 1 : -1) * (chup ? 1 : 0.4) + (chup ? 0 : 0);
                        if (chup) G = G - Math.sign(g0 || 0.01) * cong;   // cup vao long ban tay
                    }
                });
            }
            if (!chup){                                              // vet bay cua ban tay
                ctx.globalCompositeOperation = 'lighter';
                for (let k = 1; k <= 3; k++){ ctx.globalAlpha = 0.22 / k; ctx.fillStyle = "#EA80FC"; ctx.beginPath(); ctx.arc(dai - k * 14, 0, 11 - k * 2, 0, 6.28); ctx.fill(); }
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeTay2.1

// index.html:71735 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhKeoBat.1 EDITABLE
function lhKeoBat(ng){
            if (typeof novaCo === 'function' && novaCo(ng)) return lhTayBat(ng);   // @@HE-NOVA2
            let d = lhDir(ng), cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2, xa = 4 * LH_CM * lhTam();
            let best = null, bd = 1e9;
            for (let o of lhDs()){
                let ox = o.x + (o.w || 20) / 2, oy = o.y + (o.h || 20) / 2;
                let gan = d > 0 ? o.x - cx : cx - (o.x + (o.w || 20));     // khoang cach toi MEP gan
                if (gan > xa || (d > 0 ? o.x + (o.w || 20) < cx : o.x > cx)) continue;
                if (Math.abs(oy - cy) > 70 + (o.h || 20) / 2) continue;
                if (gan < bd){ bd = gan; best = o; }
            }
            if (!best){ lhChu(cx - 20, ng.y - 24, "HỤT!", "MISS!"); return; }
            lhDanh(best, 1);
            if (typeof venKhoa === 'function') venKhoa(best, 30);
            let den = d > 0 ? (cx + 26) : (cx - 26 - (best.w || 20));   // vi tri mep gan dung ngay truoc mat
            let quang = den - best.x;
            if (bosses.indexOf(best) >= 0) quang = Math.max(-110, Math.min(110, quang));   // boss to: chi keo mot doan
            lh.keo = { o: best, t: 0, T: 10, vx: quang / 10 };
            lhChu(best.x, best.y - 22, "MÓC!", "HOOKED!");
            shakeTimer = Math.max(shakeTimer || 0, 8);
        }
// PLAYER_PART_END s4.lhKeoBat.1

// index.html:71756 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickKeo.1 EDITABLE
function lhTickKeo(){
            let K = lh.keo; if (!K) return;
            K.t++;
            let o = K.o, p = K.t - (K.vuon || 0);   // @@HE-NOVA4: p = khung ke tu luc ban tay CHUP (tay thuong: vuon 0)
            if (K.vuon && p === 0 && o && o.hp > 0){                 // CHUP
                lhDanh(o, 1);
                lhImpact(o.x + (o.w || 20) / 2, o.y + Math.min((o.h || 20) * 0.45, 70), 0.3, true);
                shakeTimer = Math.max(shakeTimer || 0, 8);
                lhSfx(180, 0.12, 'sawtooth', 0.16, 90);
            }
            if (K.laoCho && p === 1 && o && typeof dino !== 'undefined' && dino){   // tinh duong lao LUC CHUP (nguoi choi co the da xe dich)
                let dd = lhDir(dino), den = dd > 0 ? o.x - dino.w - 6 : o.x + (o.w || 20) + 6;
                K.lao = (den - dino.x) / K.T; K.laoCho = 0;
            }
            if (p >= 1 && p <= K.T){
                if (o && o.hp > 0 && K.vx){
                    o.x += K.vx;
                    if (typeof worldL === 'function') o.x = Math.max(worldL(), Math.min(worldR() - (o.w || 20), o.x));
                }
                // @@HE-NOVA2: Tay linh hon voi con to — NGUOI CHOI lao toi, toi noi moi khong che 0.5 giay
                if (K.lao && typeof dino !== 'undefined' && dino){
                    dino.x += K.lao; dino.dy = Math.min(dino.dy || 0, 0);
                    if (typeof worldL === 'function') dino.x = Math.max(worldL(), Math.min(worldR() - dino.w, dino.x));
                    if (p === K.T && o && o.hp > 0 && typeof venKhoa === 'function'){ venKhoa(o, 30); lhImpact(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, 0.3, true); }
                }
            }
            if (p >= (K.T2 || K.T)) lh.keo = null;
        }
// PLAYER_PART_END s4.lhTickKeo.1

// index.html:71794 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_DAP_DMG.1 EDITABLE
const LH_DAP_DMG = 2, LH_DAP_LUI = 34;
// PLAYER_PART_END s4.LH_DAP_DMG.1

// index.html:71795 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhDapDuoc.1 EDITABLE
function lhDapDuoc(ng){
            return !!ng && ng.grounded && lh && /^[123pbtc]$/.test(lh.chuoi) && (lhBan() || lh.rh <= LH_NGAT)
                && !lh.nem && !lh.khien && !lh.ch && !lh.ult && !lh.keo && !ng.isOverheated && ng.ammo > 0;
        }
// PLAYER_PART_END s4.lhDapDuoc.1

// index.html:71799 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhDapBat.1 EDITABLE
function lhDapBat(ng){
            lh.dang = null; lh.hoi = 0; lh.bufDa = 0; lh.bufJ = 0;
            lh.chuoi = 'd';
            lhVung(ng, LH_M.jk);
        }
// PLAYER_PART_END s4.lhDapBat.1
