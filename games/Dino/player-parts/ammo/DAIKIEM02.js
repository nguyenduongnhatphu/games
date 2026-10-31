// PLAYER_FILE: DAIKIEM02
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: BZ_GIU, BZ_HOI, BZ_LIEN, BZ_NGAT, BZ_TAM_T, DK_CM, DK_DAP_DMG, DK_DAP_JC, DK_DAP_VO_CAO, DK_DAP_VO_DMG, DK_DAP_VO_R, DK_JC_HUT, DK_M, DK_MAU, DK_MUI_BAY_DMG, DK_MUI_GAN, DK_SAU_LON, DK_SAU_NHO, DK_SAU_NHO_STUN, DK_SAU_STUN, DK_TRUNG_R, DK_TRUNG_T, Effect, SFX, bossProjectiles, bosses, bzBat, bzBeMo, checkAABB, combatStance, ctx, dashVx, dino, dkBatDau, dkChan, dkChu, dkCua, dkDangBay, dkDanh, dkDay, dkDir, dkDs, dkGhim, dkGoBoc, dkHatLen, dkHen, dkHop, dkLaBoss, dkLaQuai, dkLaVatCan, dkMatDuoi, dkMucSan, dkNut, dkPose, dkRaDon, dkSfx, dkSong, dkSongTron, dkTG, dkTieuJ, dkTon, dkTrong, dkVangDa, frames, gameState, hitCat, hitDat, keys, shakeTimer, venKhoa, visualEffects, worldL, worldR
// index.html:73694 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkCotDaDanh.1 EDITABLE
function dkCotDaDanh(P){
            for (let o of dkDs()){
                if (!o || !(o.hp > 0) || P.hit.has(o) || dkLaVatCan(o) || o.invulnAll || !dkLaQuai(o)) continue;
                let ow = o.w || 20, oh = o.h || 20, hw = P.w / 2 + 6;
                if (!(o.x < P.x + hw && o.x + ow > P.x - hw && o.y + oh > P.y - P.h && o.y < P.y + 24)) continue;
                P.hit.add(o);
                dkDanh(o, P.big ? DK_SAU_LON : DK_SAU_NHO);
                let dir = (o.x + ow / 2 >= P.cx0) ? 1 : -1;
                if (P.big) dkHatLen(o, dir, 170, 6, DK_SAU_STUN); else dkHatLen(o, dir, 64, 0, DK_SAU_NHO_STUN);
                hitDat(o.x + ow / 2, P.y - 18, dir > 0 ? 1 : 0, [141, 134, 127]);
            }
            hitDat(P.x, P.y, 0, [141, 134, 127]);
            if (P.big){ shakeTimer = Math.max(shakeTimer || 0, 14); dkSfx(70 + Math.random() * 30, 0.2, 'sawtooth', 0.18, 30); }
        }
// PLAYER_PART_END s4.dkCotDaDanh.1

// index.html:73708 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkMuiDa.1 EDITABLE
let dkMuiDa = [];
// PLAYER_PART_END s4.dkMuiDa.1

// index.html:73709 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkMuiBay.1 EDITABLE
let dkMuiBay = [];
// PLAYER_PART_END s4.dkMuiBay.1

// index.html:73710 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkDapJc.1 EDITABLE
function dkDapJc(A){ let jc = (A && A.them && A.them.jc) || 0; return jc > 0 ? DK_DAP_JC[Math.min(jc, DK_DAP_JC.length) - 1] : 0; }
// PLAYER_PART_END s4.dkDapJc.1

// index.html:73711 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkMuiDaPhong.1 EDITABLE
function dkMuiDaPhong(ng, A){
            let d = dkDir(ng), s = ng.getFormScale ? ng.getFormScale() : 1;
            let x0 = ng.x + ng.w / 2 + d * 46 * s, y0 = ng.y + ng.h * 0.55, gan = new Set();
            for (let o of dkDs()){                                            // ke dich SAT (<= 4cm tu diem phong): dinh ca 4 mui
                if (!o || !(o.hp > 0) || dkLaVatCan(o) || o.invulnAll || !dkLaQuai(o)) continue;
                let ow = o.w || 20, ex = d > 0 ? o.x - x0 : x0 - (o.x + ow);
                let vy = Math.abs((o.y + (o.h || 20) / 2) - y0);
                if (ex <= DK_MUI_GAN && ex > -ow - 12 && vy <= (o.h || 20) / 2 + 26) gan.add(o);
            }
            [[-0.26, 1], [-0.09, 0], [0.09, 0], [0.26, 1]].forEach(([ang, ngoai], idx) =>      // 2 cheo len (goc am), 2 cheo xuong; tua nhe, khong bay thang
                dkMuiBay.push({ x: x0, y: y0, vx: Math.cos(ang) * 13 * d, vy: Math.sin(ang) * 13, ang, d, t: 0, T: 220, ngoai, idx, gan, hit: new Set(), ng }));
            hitDat(x0, y0, d > 0 ? 1 : 0, [141, 134, 127]);
            dkChu(ng.x - 22, ng.y - 44, "ĐÁ VỠ! MŨI ĐÁ!", "STONE BREAK!");
            dkSfx(90, 0.4, 'sawtooth', 0.26, 40); dkSfx(260, 0.15, 'square', 0.16, 80);
        }
// PLAYER_PART_END s4.dkMuiDaPhong.1

// index.html:73726 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkMuiBayHit.1 EDITABLE
function dkMuiBayHit(M){
            for (let o of dkDs()){
                if (!o || !(o.hp > 0) || M.hit.has(o) || dkLaVatCan(o) || o.invulnAll || !dkLaQuai(o)) continue;
                let hit = false;
                if (M.gan.has(o)) hit = M.t >= 1 + M.idx;                            // sat: ca 4 mui deu dinh (so le 1 khung)
                else if (!M.ngoai){                                                   // xa: chi 2 mui giua, theo duong bay
                    let ow = o.w || 20, oh = o.h || 20;
                    hit = M.x > o.x - 14 && M.x < o.x + ow + 14 && M.y > o.y - 8 && M.y < o.y + oh + 8;
                }
                if (hit){ M.hit.add(o); dkDanh(o, DK_MUI_BAY_DMG); hitDat(o.x + (o.w || 20) / 2, M.y, M.d > 0 ? 1 : 0, [179, 136, 255]); }
            }
        }
// PLAYER_PART_END s4.dkMuiBayHit.1

// index.html:73738 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkNhayDapVoDa.1 EDITABLE
function dkNhayDapVoDa(ng, A, cx, gy){
            let R = DK_DAP_VO_R * (ng.getFormScale ? Math.max(1, ng.getFormScale() * 0.9) : 1);
            let dmgVo = DK_DAP_VO_DMG + dkDapJc(A);                                                  // 50 / 55 / 60 / 65 theo Charge J
            dkHop(ng, -R, R, 170, 18, dmgVo, A.set, o => {
                if (dkLaVatCan(o) || o.invulnAll) return;
                if (!dkLaQuai(o) && gameState !== 'pvp') return;
                dkHatLen(o, (o.x + (o.w || 20) / 2 >= cx) ? 1 : -1, DK_DAP_VO_CAO, 8);
                dkChu(o.x, o.y - 24, "MŨI ĐÁ!", "STONE SPIKE!");
            });
            for (let i = -5; i <= 5; i++){
                dkMuiDa.push({ x: cx + i * (R / 5.2), y: gy, h: 74 + Math.random() * 36 - Math.abs(i) * 3, w: 24 + Math.random() * 8,
                               lean: Math.sign(i) * 0.18, delay: Math.abs(i) * 2, t: 0, T: 50 });
            }
            hitDat(cx - 50, gy, 0, [141, 134, 127]); hitDat(cx + 50, gy, 1, [141, 134, 127]); hitDat(cx, gy, 1, [179, 136, 255]);
            shakeTimer = Math.max(shakeTimer || 0, 40);
            dkChu(cx - 40, gy - 118, "ĐÁ VỠ! MŨI ĐÁ!", "STONE BREAK!");
            dkSfx(50, 0.7, 'sawtooth', 0.34, 22); dkSfx(180, 0.3, 'square', 0.2, 60);
        }
// PLAYER_PART_END s4.dkNhayDapVoDa.1

// index.html:73756 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkNhayDapDap.1 EDITABLE
function dkNhayDapDap(ng, A){
            let cx = ng.x + ng.w / 2, gy = dkChan(ng), rEx = A.rEx || 0;
            let R = 130 + rEx, dmg = (A.them.dmg || DK_DAP_DMG) + (A.bonus || 0) + dkDapJc(A);
            if (A.daVo) dkNhayDapVoDa(ng, A, cx, gy);                          // dang cam kiem da: PHA kiem da -> mui da nhon hat tung
            else dkHop(ng, -R, R, 120, 14, dmg, A.set, o => {
                if (dkLaVatCan(o) || o.invulnAll) return;
                if (!dkLaQuai(o) && gameState !== 'pvp') return;
                o._uFreeze = Math.max(o._uFreeze || 0, 60);
                dkChu(o.x, o.y - 24, "CHOÁNG!", "STUN!");
            });
            if (A.daLuot) dkVangDa(ng, A.daLuot);
            dkTrong.push({ x: cx, y: gy, t: 0, T: DK_TRUNG_T, R: DK_TRUNG_R + rEx * 0.5 });
            for (let k = -1; k <= 1; k += 2){
                let tia = []; for (let q = 0; q < 6; q++) tia.push({ a: -Math.PI / 2 + (q - 2.5) * 0.5 + (Math.random() - 0.5) * 0.3, l: 14 + Math.random() * 18 });
                dkNut.push({ x: cx + k * 26, y: gy, t: 0, T: 46, tia, d: k });
            }
            hitDat(cx - 40, gy, 0, DK_MAU); hitDat(cx + 40, gy, 1, DK_MAU); hitDat(cx, gy, 1, [179, 136, 255]);
            shakeTimer = Math.max(shakeTimer || 0, 28);
            dkChu(cx - 44, gy - 96, "VÙNG TRŨNG TRỌNG LỰC!", "GRAVITY WELL!");
            dkSfx(45, 0.7, 'sawtooth', 0.34, 24); dkSfx(120, 0.25, 'square', 0.16, 40);
        }
// PLAYER_PART_END s4.dkNhayDapDap.1

// index.html:73778 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkHapMoi.1 EDITABLE
function dkHapMoi(x, gy, T){
            let rocks = [];
            for (let i = 0; i < 18; i++) rocks.push({ x: x + (Math.random() - 0.5) * 360, y: gy - 3 - Math.random() * 6, s: 3 + Math.random() * 4, a: Math.random() * 6, d: Math.random() * 0.45 });
            return { x, ty: gy - 70, t: 0, T: Math.max(20, T), rocks };
        }
// PLAYER_PART_END s4.dkHapMoi.1

// index.html:73784 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkDiaChan.1 EDITABLE
function dkDiaChan(ng){
            let t = dkTG(ng, 48, 44);
            let plus = 0;
            if (ng.dk && ng.dk.kenh){
                let tier = dkMucSan(ng);
                if (tier > 0){
                    plus = DK_JC_HUT[tier - 1] || 0;
                    dkTieuJ(ng);
                    dkChu(ng.x - 18, ng.y - 52, "HÚT +" + plus, "PULL +" + plus);
                }
            }
            dkSongTron.push({ x: t.x, y: dkChan(ng), t: 0, T: 40, R: 520 });
            for (let o of dkDs()){
                if (!dkLaQuai(o) && gameState !== 'pvp') continue;
                if (dkLaQuai(o) && dkDangBay(o)){
                    // ke dang bay: an 10 NGAY, bi keo xuong, cham dat thi them mot dot 1-3
                    let dmg = dkLaBoss(o) ? (((o.w || 40) * (o.h || 40) >= 12000) ? 3 : 2) : 1;
                    dkDanh(o, 10 + plus); o._wsCham = Math.max(o._wsCham || 0, 60); dkGhim(o, 30);
                    dkHen.push({ o, t: 7, dmg });
                    hitCat(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, Math.PI / 2, true, [179, 136, 255]);
                } else {
                    if (Math.abs((o.x + (o.w || 20) / 2) - t.x) > 520) continue;
                    dkDanh(o, 10 + plus); o._wsCham = Math.max(o._wsCham || 0, 60);
                    hitDat(o.x + (o.w || 20) / 2, o.y + (o.h || 20), 0, [179, 136, 255]);
                }
            }
            shakeTimer = Math.max(shakeTimer || 0, 18);
            dkSfx(50, 0.5, 'sawtooth', 0.3, 28);
        }
// PLAYER_PART_END s4.dkDiaChan.1

// index.html:73815 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkBeMau.1 EDITABLE
let dkBeMau = [];
// PLAYER_PART_END s4.dkBeMau.1

// index.html:73816 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzReset.1 EDITABLE
function bzReset(dk){ dk.bz = 0; dk.bzNhanh = ''; dk.bzBuoc = 0; dk.bzRh = 0; dk._bzCho = ''; dk._hetPose = null; }
// PLAYER_PART_END s4.bzReset.1

// index.html:73817 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzGiuPose.1 EDITABLE
function bzGiuPose(ng){
            let dk = ng && ng.dk; if (!dk || !dk.A) return;
            let p = dkPose(ng);
            if (p) dk._hetPose = { ang: p.ang, px: p.px, py: p.py, nen: p.nen == null ? 1 : p.nen, phi: p.phi };
        }
// PLAYER_PART_END s4.bzGiuPose.1

// index.html:73822 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzTen.1 EDITABLE
function bzTen(kieu){
            return { bzXuong: 'CHÉM!', bzLen: 'HẤT!', bzXoay: 'XOAY!', bzDam: 'ĐÂM!', bzXuyen: 'XUYÊN!',
                     bzDamN: 'ĐÂM!', bzLenN: 'HẤT NHẢY!', bzBo: 'BỔ!', bzCam: 'CẮM!', bzDe: 'CẮM SÂU!',
                     bzKhi: 'KIẾM KHÍ!', bzHat: 'HẤT LƯỚT!', bzRot: 'BỔ!', bzCua: 'CƯA!', bzChat: 'CHẶT MÁU!',
                     bzRut: 'ĐÂM!', bzVong: 'XOAY!', bzLoan: 'LOẠN!', bzKen: 'KIẾM KHÍ!', bzLH1: 'CHÉM XUỐNG!', bzLH2: 'CHÉM LÊN!', bzLH3: 'CHÉM NGANG!', bzLH4: 'ĐÂM TỚI!', bzLH5: 'KHOAN!' }[kieu] || '';
        }
// PLAYER_PART_END s4.bzTen.1

// index.html:73828 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzBatDau.1 EDITABLE
function bzBatDau(ng, kieu, them){
            let dk = dkCua(ng);
            dk.da = 0;
            let ok = dkBatDau(ng, kieu, them);
            if (!ok) return false;
            dk.bzRh = 0; dk.da = 0;
            let ten = bzTen(kieu);
            if (ten) dkChu(ng.x - 28, ng.y - 36, ten, ten);
            return true;
        }
// PLAYER_PART_END s4.bzBatDau.1

// index.html:73838 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzKhoa.1 EDITABLE
function bzKhoa(ng, T, them, ap){
            for (let o of dkDs()){
                if (!dkLaQuai(o)) continue;
                dkGhim(o, T, ap || 1);
                if (dkLaBoss(o)){ if (typeof venKhoa === 'function') venKhoa(o, T); o._uFreeze = Math.max(o._uFreeze || 0, Math.min(T, 60)); }
                if (them > 0){
                    dkDanh(o, them);
                    if (typeof hitCat === 'function') hitCat(o.x + (o.w || 20) / 2, o.y + (o.h || 20) * 0.5, Math.PI / 2, them >= 6, [124, 77, 255]);
                }
            }
            shakeTimer = Math.max(shakeTimer || 0, (ap || 1) >= 2 ? 20 : 14);
        }
// PLAYER_PART_END s4.bzKhoa.1

// index.html:73850 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzSongMau.1 EDITABLE
function bzSongMau(ng, d, dmg){
            let s = ng.getFormScale(), cx = ng.x + ng.w / 2;
            dkSong.push({ x: cx + d * 36 * s, y: dkChan(ng), d, t: 0, T: 84, v: 8.5, cao: 210, rong: 120,
                dmg, hit: new Set(), ng, mau: true });
            shakeTimer = Math.max(shakeTimer || 0, 16);
        }
// PLAYER_PART_END s4.bzSongMau.1

// index.html:73856 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzCatDan.1 EDITABLE
function bzCatDan(r){
            if (!r) return 0;
            let n = 0;
            if (typeof bossProjectiles !== 'undefined'){
                for (let i = bossProjectiles.length - 1; i >= 0; i--){
                    let bp = bossProjectiles[i]; if (!bp) continue;
                    if (!checkAABB(r, { x: bp.x, y: bp.y, w: bp.w || 16, h: bp.h || 16 })) continue;
                    visualEffects.push(new Effect(bp.x + (bp.w || 16) / 2, bp.y + (bp.h || 16) / 2, 'parry', false));
                    bossProjectiles.splice(i, 1); n++;
                }
            }
            // dan rieng cua boss (luoi, kiem khi, dan coi...) — chat mau pha sach, khong can rune Va Cham Dan
            if (typeof bosses !== 'undefined'){
                for (let b of bosses){
                    if (!b || typeof b.clashTargets !== 'function') continue;
                    let ds; try { ds = b.clashTargets() || []; } catch(e){ continue; }
                    for (let t of ds){
                        if (!t || !t.o || t.o._clashDead || !t.box || !checkAABB(r, t.box)) continue;
                        t.o._clashDead = true; if (t.kill) t.kill();
                        visualEffects.push(new Effect(t.box.x + t.box.w / 2, t.box.y + t.box.h / 2, 'parry', false));
                        n++;
                    }
                }
            }
            if (n && typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1400, 0.04, 'square', 0.08, 700);
            return n;
        }
// PLAYER_PART_END s4.bzCatDan.1

// index.html:73886 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BZ_DRAIN_T.1 EDITABLE
const BZ_DRAIN_T = 20 * 60, BZ_HUT_DMG = 30;
// PLAYER_PART_END s4.BZ_DRAIN_T.1

// index.html:73887 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzHutDmg.1 EDITABLE
function bzHutDmg(dmg){
            if (!(dmg > 0) || typeof dino === 'undefined' || !dino) return;
            let ng = dino;
            if (!bzBat(ng) || !(ng.hp > 0)) return;
            let dk = dkCua(ng);
            dk.bzTich = (dk.bzTich || 0) + dmg;
            while (dk.bzTich >= BZ_HUT_DMG){
                dk.bzTich -= BZ_HUT_DMG;
                if (ng.hp < ng.maxHp){
                    ng.hp++;
                    dkChu(ng.x - 24, ng.y - 34, "HÚT MÁU +1", "LIFESTEAL +1");
                    if (typeof SFX !== 'undefined' && SFX.heal) SFX.heal();
                }
            }
            if (ng.hp >= ng.maxHp) dk.bzTich = Math.min(dk.bzTich, BZ_HUT_DMG - 1);   // day mau thi khong tich tru
        }
// PLAYER_PART_END s4.bzHutDmg.1

// index.html:73903 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzTuThuong.1 EDITABLE
function bzTuThuong(ng){
            if (!ng || ng.hp <= 0) return;
            ng._matBo = (ng._matBo || 0) + 1;
            ng.hp -= 1;
            dkChu(ng.x - 16, ng.y - 48, "GIÁP CẮN!", "ARMOR BITE!");
            if (ng.hp <= 0 && typeof ng.xuLyChet === 'function') ng.xuLyChet();
        }
// PLAYER_PART_END s4.bzTuThuong.1

// index.html:73910 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzChatNo.1 EDITABLE
function bzChatNo(ng, A){
            let d = dkDir(ng), tier = (A.them && A.them.tier) || 1;
            let reach = 168 + (A.rEx || 0);
            let s = ng.getFormScale(), cx = ng.x + ng.w / 2;
            let x0 = cx, x1 = cx + d * reach * s;
            if (x0 > x1){ let t = x0; x0 = x1; x1 = t; }
            let box = { x: x0, y: ng.y - 40, w: x1 - x0, h: dkChan(ng) - (ng.y - 40) + 8 };
            bzCatDan(box);
            for (let o of dkDs()){
                if (!dkLaQuai(o)) continue;
                if (o.x + (o.w || 20) < x0 || o.x > x1) continue;
                o._uFreeze = Math.max(o._uFreeze || 0, 60);
                if (o.stunTimer !== undefined) o.stunTimer = Math.max(o.stunTimer || 0, 60);
                if (typeof venKhoa === 'function') venKhoa(o, 60);
                dkChu(o.x, o.y - 24, "CHOÁNG!", "STUN!");
            }
            for (let o of dkDs()) if (dkLaQuai(o) && dkDangBay(o)) dkGhim(o, 50);
            let gy = dkChan(ng);
            let giua = (x0 + x1) / 2;
            if (A.them && A.them.be){
                bzBeMo(ng, tier, giua);
                bzTuThuong(ng);
            }
            hitDat((x0 + x1) / 2, gy, 1, [183, 28, 28]);
            shakeTimer = Math.max(shakeTimer || 0, 18);
        }
// PLAYER_PART_END s4.bzChatNo.1

// index.html:73936 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzBeTick.1 EDITABLE
function bzBeTick(ng){
            for (let i = dkBeMau.length - 1; i >= 0; i--){
                let B = dkBeMau[i]; B.t++;
                if (B.t >= B.T){ dkBeMau.splice(i, 1); continue; }
                let hx = ng.x + ng.w / 2, chan = ng.y + ng.h;
                let trongX = Math.abs(hx - B.x) < B.w / 2 + ng.w * 0.25;
                let trongY = Math.abs(chan - B.y) < 80 || (!!ng.grounded && Math.abs(chan - B.y) < 160);
                let tren = bzBat(ng) && trongX && trongY && ng.hp > 0;
                if (tren){
                    B.hoi++;
                    let moc = BZ_HOI[Math.max(0, Math.min(BZ_HOI.length - 1, (B.tier || 1) - 1))] || 600;
                    if (B.hoi >= moc){
                        B.hoi = 0;
                        if (ng.hp < ng.maxHp){
                            ng.hp++;
                            dkChu(ng.x - 8, ng.y - 30, "+1", "+1");
                            if (typeof SFX !== 'undefined' && SFX.heal) SFX.heal();
                        }
                    }
                }
                if (B.t % 60 === 0){
                    for (let o of dkDs()){
                        if (!dkLaQuai(o) || o.hp <= 0) continue;
                        let ox = o.x + (o.w || 20) / 2, oy = o.y + (o.h || 20);
                        if (Math.abs(ox - B.x) > B.w / 2 + 8 || Math.abs(oy - B.y) > 36) continue;
                        if (o._bzDot === frames) continue;
                        o._bzDot = frames;
                        dkDanh(o, 1);
                    }
                }
            }
        }
// PLAYER_PART_END s4.bzBeTick.1

// index.html:73968 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzVeBe.1 EDITABLE
function bzVeBe(){
            for (const B of dkBeMau){
                let a = B.t > B.T - 40 ? (B.T - B.t) / 40 : 1;
                let rx = B.w / 2, ry = B.w <= 120 ? 8 : Math.min(26, 8 + (B.w - 106) / 48);
                ctx.save();
                ctx.fillStyle = "rgba(120,8,12," + (0.55 * a).toFixed(2) + ")";
                ctx.beginPath(); ctx.ellipse(B.x, B.y - 2, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "rgba(198,40,40," + (0.35 * a).toFixed(2) + ")";
                ctx.beginPath(); ctx.ellipse(B.x, B.y - 3, Math.max(8, rx - 8), Math.max(3, ry * 0.45), 0, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.bzVeBe.1

// index.html:73980 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzThuc.1 EDITABLE
function bzThuc(ng, kieu){
            let dk = ng.dk;
            if (dk.A || dk.cho > 0 || ng.isOverheated) return;
            if (combatStance === 2 && !ng.tank) return;
            let nhanh = dk.bzNhanh || '', buoc = dk.bzBuoc || 0, bz = dk.bz || 0;
            if (kieu === 'moi'){ bzReset(dk); nhanh = ''; buoc = 0; bz = 0; }
            if (nhanh === 'dam'){
                let seq = ['bzDamN', 'bzLenN', 'bzBo'];
                if (buoc >= seq.length){ bzReset(dk); nhanh = ''; bz = 0; }
                else if (bzBatDau(ng, seq[buoc])){ dk.bzBuoc = buoc + 1; return; }
                else return;
            }
            if (nhanh === 'cam'){
                let seq = ['bzCam', 'bzDe'];
                if (buoc >= seq.length){ bzReset(dk); nhanh = ''; bz = 0; }
                else if (bzBatDau(ng, seq[buoc])){ dk.bzBuoc = buoc + 1; return; }
                else return;
            }
            if (nhanh === 'khi'){ bzReset(dk); return; }
            if (kieu === 'cuaTap'){
                if (bzBatDau(ng, 'bzRot')){ dk.bzNhanh = ''; dk.bz = 0; dk.bzBuoc = 0; }
                return;
            }
            if (kieu === 'cuaGiu'){
                if (bzBatDau(ng, 'bzCua')){ dk.bzNhanh = 'cua'; dk.bzBuoc = 1; }
                return;
            }
            if (nhanh === 'cua'){
                if (buoc <= 0){
                    // bam thuong = bo xuong. Chi dung 'cuaGiu' moi ra cua.
                    let mo = kieu === 'cuaGiu' ? 'bzCua' : 'bzRot';
                    if (bzBatDau(ng, mo)){
                        if (mo === 'bzCua') dk.bzBuoc = 1;
                        else { dk.bzNhanh = ''; dk.bz = 0; dk.bzBuoc = 0; }
                    }
                    return;
                }
                bzReset(dk); nhanh = ''; bz = 0; kieu = 'moi';
            }
            if (kieu === 'ngat' && !nhanh){
                if (bz === 1 && bzBatDau(ng, 'bzDamN')){ dk.bzNhanh = 'dam'; dk.bzBuoc = 1; return; }
                if (bz === 2 && bzBatDau(ng, 'bzCam')){ dk.bzNhanh = 'cam'; dk.bzBuoc = 1; return; }
                if (bz === 3 && bzBatDau(ng, 'bzKhi')){ dk.bzNhanh = 'khi'; dk.bzBuoc = 1; return; }
            }
            let seq = ['bzXuong', 'bzLen', 'bzXoay', 'bzDam', 'bzXuyen'];
            let i = (kieu === 'moi' || bz >= seq.length) ? 0 : bz;
            if (bzBatDau(ng, seq[i])){ dk.bz = i + 1; dk.bzNhanh = ''; dk.bzBuoc = 0; }
        }
// PLAYER_PART_END s4.bzThuc.1

// index.html:74028 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzDash.1 EDITABLE
function bzDash(ng){
            let dk = ng.dk;
            if ((dk.bzNhanh || '') !== '' || dk.bz !== 1) return false;
            if (dk.A && dk.A.kieu !== 'bzXuong') return false;
            if (!dk.A && dk.bzRh > BZ_NGAT) return false;
            if (dk.A && dk.A.t < dk.A.hit) dkRaDon(ng, dk.A);
            bzGiuPose(ng);
            dk.A = null; dk.cho = 0; dk._bzCho = '';
            dk.bzNhanh = 'cua'; dk.bzBuoc = 0;
            bzBatDau(ng, 'bzHat');
            // dang giu J luc luot: do la don thu 3, dem lai tu luc luot. Bam moi van vao _cuaChon o bzNhap.
            if (dk.jHold || dk.jCu){
                dk._cuaChon = 1; dk._cuaGiu = 0;
                dk.jHold = false; dk.jT = 0; dk.jTier = 0; dk._bzSac = 0;
            }
            return true;
        }
// PLAYER_PART_END s4.bzDash.1

// index.html:74045 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzNgatGiua.1 EDITABLE
function bzNgatGiua(ng){
            let dk = ng.dk;
            if (dk.A && dk.A.kieu && dk.A.kieu.indexOf('bz') === 0 && dk.A.t < dk.A.hit) dkRaDon(ng, dk.A);
            bzGiuPose(ng);
            dk.A = null; dk.cho = 0;
            let giu = dk._hetPose;
            bzReset(dk);
            dk._hetPose = giu;
        }
// PLAYER_PART_END s4.bzNgatGiua.1

// index.html:74054 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzNapRa.1 EDITABLE
function bzNapRa(ng, tier){
            if (tier === 1){
                bzNgatGiua(ng);
                if (!bzBatDau(ng, 'quet')) return;
                dkChu(ng.x - 44, ng.y - 48, "KIẾM KHÍ!", "SWORD QI!");
                return;
            }
            if (tier === 2){ bzVongRa(ng); return; }
            if (tier === 3){ bzNoLuc(ng); return; }
            if (tier === 4){ bzRutRa(ng); return; }
            if (tier === 5){ bzLoanRa(ng); return; }
        }
// PLAYER_PART_END s4.bzNapRa.1

// index.html:74066 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzChatRa.1 EDITABLE
function bzChatRa(ng, dmg, cm, poolTier, tenVi, tenEn){
            bzNgatGiua(ng);
            let them = { dmg: dmg, reach: cm * DK_CM, tier: poolTier, jc: poolTier };
            if (!bzBatDau(ng, 'bzChat', them)) return;
            dkChu(ng.x - 34, ng.y - 52, tenVi, tenEn);
        }
// PLAYER_PART_END s4.bzChatRa.1

// index.html:74072 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BZ_J_DMG.1 EDITABLE
const BZ_J_DMG = [12, 14, 16, 18, 20], BZ_J_CM = [3, 6, 10, 15, 22];
// PLAYER_PART_END s4.BZ_J_DMG.1

// index.html:74073 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzChemJ.1 EDITABLE
function bzChemJ(ng, tier){
            let t = Math.max(1, Math.min(5, tier || 1));
            bzNgatGiua(ng);
            let them = { dmg: BZ_J_DMG[t - 1], reach: BZ_J_CM[t - 1] * DK_CM, tier: t, be: 1 };
            if (!bzBatDau(ng, 'bzChat', them)) return;
            dkChu(ng.x - 40, ng.y - 52, t >= 5 ? "CHÉM MẠNH!" : "CHẶT MÁU!", t >= 5 ? "HEAVY SLASH!" : "BLOOD SLASH!");
        }
// PLAYER_PART_END s4.bzChemJ.1

// index.html:74080 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzVongRa.1 EDITABLE
function bzVongRa(ng){
            bzNgatGiua(ng);
            if (!bzBatDau(ng, 'bzVong')) return;
            ng.dk.A._ang = 0.2;
        }
// PLAYER_PART_END s4.bzVongRa.1

// index.html:74086 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BZ_LH_SEQ.1 EDITABLE
const BZ_LH_SEQ = ['bzLH1', 'bzLH2', 'bzLH3', 'bzLH4', 'bzLH5'];
// PLAYER_PART_END s4.BZ_LH_SEQ.1

// index.html:74087 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzLienHoanTiep.1 EDITABLE
function bzLienHoanTiep(ng){
            let dk = ng.dk, L = dk._lh;
            if (!L) return;
            L.t++;
            if (!(ng.hp > 0)){ dk._lh = null; return; }                     // chet thi thoi (mat mau do rut mau dinh ky KHONG ngat chuoi)
            if (L.t > 420 || L.i >= BZ_LH_SEQ.length){                      // het chuoi: them chut bat tu de thoat don an toan
                dk._lh = null; ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 10); return;
            }
            if (dk.A || (dk.cho || 0) > 0) return;
            if (!bzBatDau(ng, BZ_LH_SEQ[L.i++])) dk._lh = null;
        }
// PLAYER_PART_END s4.bzLienHoanTiep.1

// index.html:74100 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BZ_LH_HP_MIN.1 EDITABLE
const BZ_LH_HP_MIN = 4, BZ_LH_HP_COST = 3;
// PLAYER_PART_END s4.BZ_LH_HP_MIN.1

// index.html:74101 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzTuThuongN.1 EDITABLE
function bzTuThuongN(ng, n){
            if (!ng || ng.hp <= 0) return;
            ng._matBo = (ng._matBo || 0) + n;                              // mat mau do giap cua Berserker khong tinh vao huy chuong khong bi thuong
            ng.hp -= n;
            dkChu(ng.x - 22, ng.y - 62, "TỐN " + n + " MÁU!", "-" + n + " HP!");
            if (ng.hp <= 0 && typeof ng.xuLyChet === 'function') ng.xuLyChet();
        }
// PLAYER_PART_END s4.bzTuThuongN.1

// index.html:74108 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzLoanRa.1 EDITABLE
function bzLoanRa(ng){
            if (ng.hp < BZ_LH_HP_MIN){                                      // chua du mau: khong ra don, khong mat gi
                dkChu(ng.x - 44, ng.y - 48, "CẦN ≥ " + BZ_LH_HP_MIN + " MÁU!", "NEED " + BZ_LH_HP_MIN + "+ HP!");
                dkSfx(110, 0.12, 'square', 0.1, 50);
                return;
            }
            bzNgatGiua(ng);
            ng.dk._lh = { i: 0, t: 0, hp: ng.hp };
            bzLienHoanTiep(ng);
            if (!ng.dk.A){ ng.dk._lh = null; return; }                      // khong du the luc -> khong ra don, khong mat mau
            bzTuThuongN(ng, BZ_LH_HP_COST);
        }
// PLAYER_PART_END s4.bzLoanRa.1

// index.html:74120 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzNoLuc.1 EDITABLE
function bzNoLuc(ng){
            let dk = ng.dk;
            dk.voHan = 300;
            ng.ammo = ng.maxAmmo; ng.isOverheated = false; ng.overheatTimer = 0;
            dkChu(ng.x - 36, ng.y - 50, "BÙNG NỔ!", "BURST!");
            dkSfx(88, 0.32, 'sawtooth', 0.24, 200);
            shakeTimer = Math.max(shakeTimer || 0, 14);
        }
// PLAYER_PART_END s4.bzNoLuc.1

// index.html:74128 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzPhongKhi.1 EDITABLE
function bzPhongKhi(ng, idx){
            let lon = idx === 2, d = dkDir(ng), s = ng.getFormScale();
            let goc = idx === 2 ? 4 : 2;
            let x = ng.x + ng.w / 2 + d * (lon ? 40 : 28) * s;
            let y = ng.y + ng.h * 0.42;
            dkSong.push({ x: x, x0: x, y: y, d: d, t: 0, T: lon ? 64 : 40, v: lon ? 8 : 6.5,
                cao: lon ? 56 : 28, rong: lon ? 70 : 34,
                bzKhi: 1, bzLon: lon ? 1 : 0, dmg0: goc, buoc: lon ? 3 : 2,
                dmg: goc, hit: new Set(), ng: ng });
        }
// PLAYER_PART_END s4.bzPhongKhi.1

// index.html:74138 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzKenBat.1 EDITABLE
function bzKenBat(ng){
            let dk = dkCua(ng);
            if (dk.bzCh || dk.ult || dk.A || dk.jHold) return false;
            if (!((dk.voHan || 0) > 0) && ng.ammo < 1){
                if ((dk._kenBao || 0) <= 0){ dkChu(ng.x - 20, ng.y - 30, "HẾT THỂ LỰC", "NO STAMINA"); dk._kenBao = 45; }
                return false;
            }
            if (!bzBatDau(ng, 'bzKen')) return false;
            dk.bzCh = true;
            dkTon(ng, 1);
            return true;
        }
// PLAYER_PART_END s4.bzKenBat.1

// index.html:74150 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BZ_NAP.1 EDITABLE
const BZ_NAP = ["", "KHÍ", "XOAY", "BÙNG", "ĐÂM", "LIÊN HOÀN"];
// PLAYER_PART_END s4.BZ_NAP.1

// index.html:74151 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BZ_NAP_EN.1 EDITABLE
const BZ_NAP_EN = ["", "QI", "SPIN", "BURST", "THRUST", "FLURRY"];
// PLAYER_PART_END s4.BZ_NAP_EN.1

// index.html:74152 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzHoanh.1 EDITABLE
function bzHoanh(ng, kieu){
            let dk = ng.dk;
            if (kieu === 'ngang' && ng.ammo < (DK_M.ngang.ton || 3) && !((dk.voHan || 0) > 0)){
                dk._bzLuot = 0;
                dkChu(ng.x - 20, ng.y - 30, "HẾT THỂ LỰC", "NO STAMINA");
                return false;
            }
            if (dk.A && dk.A.kieu && dk.A.kieu.indexOf('bz') === 0 && dk.A.t < dk.A.hit) dkRaDon(ng, dk.A);
            dk.A = null; dk.cho = 0; dk._bzCho = ''; dk._hetPose = null; dk._bzLuot = 0;
            dk.bz = 0; dk.bzNhanh = ''; dk.bzBuoc = 0; dk.bzRh = 0;
            dk.jHold = false; dk.jT = 0; dk.jTier = 0; dk._bzSac = 0;
            if (!bzBatDau(ng, kieu)) return false;
            dk.luotDu = 0;
            dkChu(ng.x - 36, ng.y - 40, "HOÀNH TẢO!", "CLEAVE!");
            return true;
        }
// PLAYER_PART_END s4.bzHoanh.1

// index.html:74168 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzRutRa.1 EDITABLE
function bzRutRa(ng){
            bzNgatGiua(ng);
            if (!bzBatDau(ng, 'bzRut')) return;
            dkChu(ng.x - 28, ng.y - 48, "ĐÂM!", "THRUST!");
        }
// PLAYER_PART_END s4.bzRutRa.1

// index.html:74173 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzNhap.1 EDITABLE
function bzNhap(ng, fireKey, luotMoi){
            let dk = ng.dk;
            if (dk.ult) return;
            if ((dk.nghi || 0) > 0){
                dk.jCu = !!fireKey;
                dk.jHold = false; dk.jT = 0; dk.jTier = 0; dk._bzSac = 0; dk._bzCho = '';
                return;
            }
            dk._bzSac = 0; dk._bzNgat = 0;
            if (!dk.A){
                if ((dk.bz || 0) > 0 && !dk.jHold) dk.bzRh = (dk.bzRh || 0) + 1;
                if (dk.bzRh > BZ_NGAT && !dk._bzCho) bzReset(dk);
            }
            let cuaNgat = !dk.A && !dk.jHold && (dk.bzNhanh || '') === '' && dk.bz >= 1 && dk.bz <= 3 && dk.bzRh > BZ_LIEN && dk.bzRh <= BZ_NGAT;
            dk._bzNgat = cuaNgat ? 1 : 0;
            if (luotMoi && bzDash(ng)) return;
            let jNay = !!fireKey, canh = jNay && !dk.jCu; dk.jCu = jNay;
            let cuaCho = (dk.bzNhanh === 'cua' && (dk.bzBuoc || 0) === 0);
            if (dk._cuaChon && dk.bzNhanh !== 'cua'){ dk._cuaChon = 0; dk._cuaGiu = 0; }
            if ((dk._cach || 0) > 0) dk._cach--;
            if ((dk._cua || 0) > 0) dk._cua--; else dk._xin = 0;
            if (canh && cuaCho && !dk.jHold){ dk._cuaChon = 1; dk._cuaGiu = 0; dk._bzLuot = 0; }
            if (dk._cuaChon && !dk.jHold){
                if (jNay){
                    dk._cuaGiu = (dk._cuaGiu || 0) + 1;
                    if (dk._cuaGiu >= BZ_GIU){
                        dk._cuaChon = 0; dk._cuaGiu = 0;
                        if (dk.A || dk.cho > 0) dk._bzCho = 'cuaGiu';
                        else bzThuc(ng, 'cuaGiu');
                    }
                    return;
                }
                dk._cuaChon = 0; dk._cuaGiu = 0;
                if (dk.A || dk.cho > 0) dk._bzCho = 'cuaTap';
                else bzThuc(ng, 'cuaTap');
                return;
            }
            // nhat ngang thu 2 chi khi CHAM, khong duoc cat charge dang giu
            if (canh && !dk.jHold && (dk._cua || 0) > 0 && !(dk.A && dk.A.kieu === 'ngang' && dk.A.t < dk.A.hit)) dk._xin = 1;
            if (dk._xin && !dk.jHold && (dk._cach || 0) <= 0 && (dk._cua || 0) > 0 && !(dk.A && dk.A.kieu !== 'ngang')){
                dk._xin = 0; dk._cua = 0; dk._cach = 0;
                bzHoanh(ng, 'ngang2');
                return;
            }
            // Giữ J = nạp. Không chỉ bắt cạnh phím: nếu jHold bị xóa giữa lúc vẫn đang giữ thì bật lại.
            // Cửa sổ J-Dash-J (_cuaChon) đã return phía trên, không đụng vào cưa/bổ.
            if (jNay){
                if (!dk.jHold){
                    dk.jHold = true; dk.jT = 0; dk.jTier = 0;
                    dk._bzLuot = ((dk.luotDu || 0) > 0 && !cuaCho) ? 1 : 0;
                    dk._bzNhip = dk.A ? 'lien' : ((dk.bz || 0) > 0 && dk.bzRh <= BZ_LIEN ? 'lien' : ((dk.bz || 0) > 0 && dk.bzRh <= BZ_NGAT ? 'ngat' : 'moi'));
                }
                if (dk.jT < 150) dk.jT++;
                let tier = dk.jT >= 150 ? 5 : dk.jT >= 120 ? 4 : dk.jT >= 90 ? 3 : dk.jT >= 60 ? 2 : dk.jT >= 30 ? 1 : 0;
                if (tier > dk.jTier){
                    dk.jTier = tier;
                    dkSfx(160 + tier * 55, 0.1, 'sawtooth', 0.15, 80 + tier * 30);
                    dkChu(ng.x - 22, ng.y - 34, "CHÉM " + tier, "SLASH " + tier);
                }
                dk._bzSac = tier;
            } else if (dk.jHold){
                let tier = dk.jT >= 150 ? 5 : dk.jT >= 120 ? 4 : dk.jT >= 90 ? 3 : dk.jT >= 60 ? 2 : dk.jT >= 30 ? 1 : 0;
                let nhip = dk._bzNhip || 'moi', luot = dk._bzLuot;
                dk.jHold = false; dk.jT = 0; dk.jTier = 0; dk._bzSac = 0; dk._bzLuot = 0;
                ng.aKeyHeldTime = 0; ng.chargeProgress = 0;
                if (tier === 0 && luot){ bzHoanh(ng, 'ngang'); return; }
                if (tier > 0){ bzChemJ(ng, tier); return; }
                if (dk.A || dk.cho > 0) dk._bzCho = nhip;
                else bzThuc(ng, nhip);
            }
            if (!dk.A && dk.cho <= 0 && dk._bzCho){
                let n = dk._bzCho; dk._bzCho = '';
                if ((dk.bzNhanh === 'cua') && (dk.bzBuoc || 0) === 0 && n !== 'cuaGiu') n = 'cuaTap';
                bzThuc(ng, n);
            }
        }
// PLAYER_PART_END s4.bzNhap.1

// index.html:74249 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzSau.1 EDITABLE
function bzSau(ng){
            let dk = ng.dk, A = dk.A;
            if (!A) return;
            let d = dkDir(ng);
            if (A.m.tien && A.t >= 1 && A.t < A.hit - 1){                      // CHEM LIEN HOAN: di toi mot chut roi moi chem
                ng.x += d * A.m.tien / Math.max(1, A.hit - 2);
                ng.x = Math.max(worldL(), Math.min(worldR() - ng.w, ng.x));
            }
            if (A.m.luiSau && A.t === A.hit + 2){                              // chem ngang xong LUI NGAN
                if (typeof dashVx !== 'undefined') dashVx = -d * A.m.luiSau;
                ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 8);
                dk._khongLuot = frames + 50; dk.luotDu = 0;
            }
            if (A.m.khoan){                                                    // don cuoi: gom luc (lui nhe) -> MUI KHOAN lao xuyen
                if (A.t === 2) ng.x -= d * 8;
                if (A.t === A.hit){
                    ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 26);
                    if (typeof dashVx !== 'undefined') dashVx = d * 24;
                    dk._khongLuot = frames + 70; dk.luotDu = 0;
                    shakeTimer = Math.max(shakeTimer || 0, 14);
                    dkSfx(70, 0.35, 'sawtooth', 0.28, 360);
                }
                if (A.t < A.hit && A.t % 5 === 0) dkSfx(180 + A.t * 9, 0.06, 'sine', 0.08, 40);
            }
            if (A.m.xuyen){
                if (A.t === 2) ng.x -= d * 16;
                if (A.t === A.hit){
                    ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 22);
                    if (typeof dashVx !== 'undefined') dashVx = d * 20;
                }
            }
            if (A.m.nhay && A.t >= A.hit){
                ng.grounded = false;
                if (A.m.nhayV){ if (A.t === A.hit && (ng.dy || 0) > A.m.nhayV) ng.dy = A.m.nhayV; }
                else if ((ng.dy || 0) > -7) ng.dy = -8;
            }
            if (A.m.rot && !A._rotNo){
                if (A.t === 1){
                    let cx = ng.x + ng.w / 2;
                    for (let o of dkDs()){
                        if (!dkLaQuai(o)) continue;
                        let ox = o.x + (o.w || 20) / 2;
                        if (o._dkHat || (dkDangBay(o) && Math.abs(ox - cx) < 280)) o._bzAp = 1;
                    }
                }
                for (let o of dkDs()){
                    if (!o._bzAp || !o._dkHat) continue;
                    o._dkHat.treo = 0; o._dkHat.roi = true;
                    o._dkHat.vy = Math.max(o._dkHat.vy || 0, 16);
                }
                if (!ng.grounded){ if ((ng.dy || 0) < 18) ng.dy = 18; }
                else if (A.t > 2){
                    A._rotNo = A.t;
                    for (let o of dkDs()){
                        if (!o._bzAp) continue;
                        let h = o.h || 20, nen = dkMatDuoi(o.x + (o.w || 20) / 2, o.y + h + 8) - h;
                        o.y = nen; o.grounded = true;
                        if (o.dy !== undefined) o.dy = 0;
                        o._dkHat = null;
                        if (!((o._dkGhim || 0) > 0) && !o._dkNoi) dkGoBoc(o);
                    }
                    dkHop(ng, -50, 180, 80, 20, 8, new Set(), null);
                    for (let o of dkDs()){
                        if (!o._bzAp) continue;
                        dkDanh(o, 2);
                        o._bzAp = 0;
                        if (typeof hitCat === 'function') hitCat(o.x + (o.w || 20) / 2, o.y + (o.h || 20), Math.PI / 2, false, [183, 28, 28]);
                    }
                    hitDat(ng.x + ng.w / 2 + d * 28, dkChan(ng), 1, [183, 28, 28]);
                    dkChu(ng.x - 16, ng.y - 36, "BỔ!", "SLAM!");
                    shakeTimer = Math.max(shakeTimer || 0, 16);
                    dkSfx(60, 0.22, 'sawtooth', 0.2, 42);
                }
            } else if (A.m.rot && A._rotNo && A.t >= A._rotNo + 14){
                bzGiuPose(ng);
                dk.A = null; dk.cho = 12; dk.bz = 0; dk.bzNhanh = ''; dk.bzBuoc = 0;
            }
            if (A.m.cua){
                // cua chay suot luc con tren khong. Hat cang cao thi xoay cang lau, cham dat moi bo.
                if (!A._slam){
                    let u = Math.min(1, A.t / 6);
                    let w = 0.3 + u * u * 1.75;
                    A._ang = (A._ang == null ? 0.2 : A._ang) + w;
                    if (A.t >= 8 && A.t % 4 === 0) dkHop(ng, -110, 130, 200, 36, 2, null, null);
                    if (!ng.grounded || (ng.dy || 0) < -0.4) A._daBay = 1;
                    let san = A.t >= 16;
                    let cham = A._daBay && ng.grounded && (ng.dy || 0) >= 0 && A.t > 18;
                    let khongBay = !A._daBay && A.t >= 34;
                    if (san && (cham || khongBay || A.t >= 96)){
                        A._slam = A.t;
                        let a = A._ang, to = 1.95;
                        while (to <= a + 0.35) to += Math.PI * 2;
                        A._slamFrom = a; A._slamTo = to;
                    }
                } else if (A.t === A._slam + 7){
                    dkHop(ng, -40, 176, 110, 22, 8, new Set(), o => dkDay(o, d, 12));
                    hitDat(ng.x + ng.w / 2 + d * 36, dkChan(ng), 1, [183, 28, 28]);
                    dkChu(ng.x - 16, ng.y - 36, "BỔ!", "SLAM!");
                    shakeTimer = Math.max(shakeTimer || 0, 18);
                    dkSfx(55, 0.26, 'sawtooth', 0.22, 36);
                } else if (A.t >= A._slam + 16){
                    bzGiuPose(ng);
                    dk.A = null; dk.cho = 12; dk.bzBuoc = 1;
                }
            }
            if (A.m.rut && !A._rut && A.t === 36){
                A._rut = 1;
                dkHop(ng, -12, 140, 16, 4, 4, new Set(), null);
                // BUFF chi co khi mui DAM (khung 20) da trung it nhat 1 ke dich. Dam hut thi rut kiem ve khong buff.
                let trung = false;
                if (A.set) for (const o of A.set){ if (dkLaQuai(o)){ trung = true; break; } }
                if (trung){
                    dk.tamThem = BZ_TAM_T;
                    dkChu(ng.x - 34, ng.y - 46, "RÚT! TẦM +5", "DRAW! REACH +5");
                    dkSfx(190, 0.12, 'square', 0.14, 80);
                } else {
                    dkChu(ng.x - 34, ng.y - 46, "ĐÂM TRƯỢT! KHÔNG BUFF", "MISSED! NO BUFF");
                    dkSfx(110, 0.1, 'square', 0.1, 50);
                }
            }
            if (A.m.vong){
                const NHIP = 18;
                if (A.t >= 1 && A.t <= NHIP * 3){
                    let loc = (A.t - 1) % NHIP;
                    let idx = Math.floor((A.t - 1) / NHIP);
                    if (loc >= 4 && loc <= 12){
                        let big = idx === 2;
                        let sau = big ? -56 : -32, truoc = big ? 148 : 90;
                        let tren = idx === 0 ? 34 : (idx === 1 ? 6 : 18);
                        let duoi = idx === 1 ? 20 : 8;
                        let ss = ng.getFormScale(), cx = ng.x + ng.w / 2;
                        let x0 = cx + d * sau * ss, x1 = cx + d * truoc * ss;
                        if (x0 > x1){ let tmp = x0; x0 = x1; x1 = tmp; }
                        let y0 = ng.y - (tren + 8) * ss, y1 = ng.y + ng.h + duoi;
                        bzCatDan({ x: x0, y: y0, w: x1 - x0, h: y1 - y0 });
                        if (loc === 8){
                            dkHop(ng, sau, truoc, tren, duoi, big ? 5 : 2, null, null);
                            dkChu(ng.x + 8, ng.y - 48 - idx * 6, String(idx + 1), String(idx + 1));
                            dkSfx(big ? 96 : 150, 0.07, 'sawtooth', 0.12, 70);
                        }
                    }
                }
                if (A.t >= NHIP * 3 + 12){
                    bzGiuPose(ng);
                    dk.A = null; dk.cho = 12; dk.bz = 0; dk.bzNhanh = ''; dk.bzBuoc = 0;
                }
            }
            if (A.m.ken){
                const NHIP = 18;
                if (A.t >= 1){
                    let loc = (A.t - 1) % NHIP;
                    let idx = Math.floor((A.t - 1) / NHIP) % 3;
                    if (loc >= 4 && loc <= 12){
                        let big = idx === 2;
                        let sau = big ? -56 : -32, truoc = big ? 148 : 90;
                        let tren = idx === 0 ? 34 : (idx === 1 ? 6 : 18);
                        let duoi = idx === 1 ? 20 : 8;
                        let ss = ng.getFormScale(), cx = ng.x + ng.w / 2;
                        let x0 = cx + d * sau * ss, x1 = cx + d * truoc * ss;
                        if (x0 > x1){ let tmp = x0; x0 = x1; x1 = tmp; }
                        let y0 = ng.y - (tren + 8) * ss, y1 = ng.y + ng.h + duoi;
                        bzCatDan({ x: x0, y: y0, w: x1 - x0, h: y1 - y0 });
                        if (loc === 8){
                            dkHop(ng, sau, truoc, tren, duoi, big ? 5 : 3, null, null);
                            bzPhongKhi(ng, idx);
                            dkSfx(big ? 88 : 150, 0.07, 'sawtooth', 0.12, 70);
                        }
                    }
                }
            }
            if (A.m.loan){
                if (A.ph == null){ A.ph = 0; A.pt = 0; if (!A._dir) A._dir = d; }
                let dir0 = A._dir || d;
                ng.isFacingLeft = dir0 < 0;
                A.pt = (A.pt || 0) + 1;
                let ph = A.ph;
                let kep = (tr) => { if (ng.x < worldL()) ng.x = worldL(); if (ng.x > worldR() - ng.w) ng.x = worldR() - ng.w; if (tr && typeof dashVx !== 'undefined') dashVx = 0; };
                let lai = () => { if ((ng.invTimer || 0) <= 2){ ng.invincible = false; ng.invTimer = 0; } };
                let banh = () => ((typeof keys !== 'undefined' && (keys['KeyA'] || keys['ArrowLeft'])) ? -1 : 0) + ((typeof keys !== 'undefined' && (keys['KeyD'] || keys['ArrowRight'])) ? 1 : 0);
                if (ph === 0 || ph === 2 || ph === 4){
                    ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 2);
                    ng.x += (ph === 4 ? -dir0 : dir0) * 14;
                    kep(true);
                    if (A.pt === 4){
                        if (ph === 4) dkHop(ng, -168, 28, 72, 18, 6, new Set(), null);
                        else dkHop(ng, -18, 156, 72, 18, 6, new Set(), null);
                        dkSfx(ph === 4 ? 120 : 168, 0.08, 'sawtooth', 0.14, 80);
                    }
                    if (A.pt >= 10){ A.ph++; A.pt = 0; }
                } else if (ph === 1 || ph === 3 || ph === 5){
                    lai();
                    if (A.pt >= 12){ A.ph++; A.pt = 0; }
                } else if (ph === 6){
                    lai();
                    if (A.pt === 1){ ng.grounded = false; if ((ng.dy || 0) > -18) ng.dy = -18; if (typeof dashVx !== 'undefined') dashVx = 0; }
                    ng.x += banh() * 3.4; kep(false);
                    if (((ng.dy || 0) > 0 && A.pt > 10) || A.pt > 48){ A.ph = 7; A.pt = 0; }
                } else if (ph === 7){
                    lai();
                    ng.x += banh() * 3.4; kep(false);
                    if (!ng.grounded && (ng.dy || 0) < 18) ng.dy = 18;
                    if (!A._gam && ng.grounded && A.pt > 2){
                        A._gam = A.pt;
                        let set = new Set();
                        dkHop(ng, -36, 36, 24, 30, 10, set, null);
                        if (set.size){
                            for (let o of set) dkDanh(o, 6);
                            let cx = ng.x + ng.w / 2, best = null, bd = 1e9;
                            for (let o of set){
                                if (!dkLaQuai(o)) continue;
                                let ox = o.x + (o.w || 20) / 2, ad = Math.abs(ox - cx);
                                let lim = Math.max(14, (o.w || 20) * 0.28);
                                if (ad <= lim && ad < bd){ best = o; bd = ad; }
                            }
                            if (best){
                                if (ng.hp > 0 && ng.hp < ng.maxHp){ ng.hp++; dkChu(ng.x - 18, ng.y - 52, "HÚT +1", "DRAIN +1"); }
                                else dkChu(ng.x - 12, ng.y - 52, "HÚT", "DRAIN");
                                if (typeof hitCat === 'function') hitCat(best.x + (best.w || 20) / 2, best.y + (best.h || 20) * 0.45, Math.PI / 2, true, [255, 82, 82]);
                            }
                        }
                        hitDat(ng.x + ng.w / 2, dkChan(ng), 1, [183, 28, 28]);
                        dkChu(ng.x - 16, ng.y - 36, "GĂM!", "PLANT!");
                        shakeTimer = Math.max(shakeTimer || 0, 16);
                        dkSfx(58, 0.22, 'sawtooth', 0.2, 40);
                    }
                    if ((A._gam && A.pt > A._gam + 14) || (!A._gam && A.pt > 90)){
                        bzGiuPose(ng);
                        dk.A = null; dk.cho = 14; dk.bz = 0; dk.bzNhanh = ''; dk.bzBuoc = 0;
                    }
                }
            }
        }
// PLAYER_PART_END s4.bzSau.1

// index.html:74484 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzGaiVe.1 EDITABLE
function bzGaiVe(x, y, tx, ty, hw, cong, fill, ve){
            let dx = tx - x, dy = ty - y, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
            let mx = (x + tx) / 2 + nx * cong, my = (y + ty) / 2 + ny * cong;
            ctx.beginPath();
            ctx.moveTo(x + nx * hw, y + ny * hw);
            ctx.quadraticCurveTo(mx + nx * hw * 0.35, my + ny * hw * 0.35, tx, ty);
            ctx.quadraticCurveTo(mx - nx * hw * 0.35, my - ny * hw * 0.35, x - nx * hw, y - ny * hw);
            ctx.closePath();
            ctx.fillStyle = fill || '#17171c'; ctx.fill(); ctx.stroke();
            if (ve){                                                           // soc do phat sang chay doc gai
                ctx.save(); ctx.strokeStyle = 'rgba(255,40,70,' + ve.toFixed(2) + ')'; ctx.lineWidth = 0.8;
                ctx.beginPath(); ctx.moveTo(x + dx * 0.12, y + dy * 0.12); ctx.quadraticCurveTo(mx, my, x + dx * 0.78, y + dy * 0.78); ctx.stroke();
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.bzGaiVe.1

// index.html:74499 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzGiapSang.1 EDITABLE
function bzGiapSang(){
            let dk = (typeof dino !== 'undefined' && dino && dino.dk) ? dino.dk : {};
            let pul = 0.65 + 0.35 * Math.sin((typeof frames !== 'undefined' ? frames : 0) * 0.12);
            return ((dk.voHan || 0) > 0 ? 1 : ((dk.tamThem || 0) > 0 ? 0.85 : 0.55)) * pul;
        }
// PLAYER_PART_END s4.bzGiapSang.1

// index.html:74504 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BZ_G.1 EDITABLE
const BZ_G = { den: '#101013', nua: '#1c1c22', sang: '#2f2f38', vien: '#000', do: '#ff1744', domau: '#9b1c1c' };
// PLAYER_PART_END s4.BZ_G.1
