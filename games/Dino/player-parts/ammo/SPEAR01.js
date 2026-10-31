// PLAYER_FILE: SPEAR01
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CAM_TROI, DK_DAN, DSAW_DAN, Effect, FloatingText, LH_DAN, MIDAS_DAN, POWERS, SFX, WKG_POWER, bosses, canvas, checkAABB, combatStance, ctx, currentAmmoType, currentPower, dangLuotHoacChop, dashVx, dealDamage, defMode, defUnits, dino, dsawNovaMau, enemies, floatingTexts, frames, gameState, gdCatHop, gdCatTron, hasRune, keys, midasVang, pvpDich, pvpVoBoc, shakeTimer, slamLaoBat, trdCong, visualEffects, wkgAnim, wkgDatTu, wkgDatVang, wkgFx, wkgLay, wkgPhanTao, wkgTamTu, wkgTickCon, wkgTickFx, wkgTickLoc, wkgTickMay, wkgTickMoi, wkgTickPhan, wkgTickSet, wkgTickSpin, wkgTickUlt, wkgTickVong, wkgVaCham, wkgVet, worldL, worldR
// index.html:54896 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_TAM.1 EDITABLE
const GIAO_TAM = [105, 150, 189];
// PLAYER_PART_END s4.GIAO_TAM.1

// index.html:54897 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_HAT.1 EDITABLE
const GIAO_HAT = 189, GIAO_HAT_CAO = 114;
// PLAYER_PART_END s4.GIAO_HAT.1

// index.html:54898 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_KHONG.1 EDITABLE
const GIAO_KHONG = 150;
// PLAYER_PART_END s4.GIAO_KHONG.1

// index.html:54899 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_CHEO.1 EDITABLE
const GIAO_CHEO = 165;
// PLAYER_PART_END s4.GIAO_CHEO.1

// index.html:54900 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_QUAT.1 EDITABLE
const GIAO_QUAT = 180;
// PLAYER_PART_END s4.GIAO_QUAT.1

// index.html:54901 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_NHANH.1 EDITABLE
const GIAO_NHANH = 105;
// PLAYER_PART_END s4.GIAO_NHANH.1

// index.html:54902 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_LUOT.1 EDITABLE
const GIAO_LUOT = 210, GIAO_LUOT2 = 260;
// PLAYER_PART_END s4.GIAO_LUOT.1

// index.html:54903 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_KET.1 EDITABLE
const GIAO_KET = 165, GIAO_XOAY = 156;
// PLAYER_PART_END s4.GIAO_KET.1

// index.html:54905 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_CS.1 EDITABLE
const GIAO_CS = 52;
// PLAYER_PART_END s4.GIAO_CS.1

// index.html:54906 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_C3_TAM.1 EDITABLE
const GIAO_C3_TAM = 174;
// PLAYER_PART_END s4.GIAO_C3_TAM.1

// index.html:54907 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_QUET_R0.1 EDITABLE
const GIAO_QUET_R0 = 430;
// PLAYER_PART_END s4.GIAO_QUET_R0.1

// index.html:54908 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_MUA_R.1 EDITABLE
const GIAO_MUA_R = 156;
// PLAYER_PART_END s4.GIAO_MUA_R.1

// index.html:54909 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_DONG_MAX.1 EDITABLE
const GIAO_DONG_MAX = 12, GIAO_DONG_HET = 90;
// PLAYER_PART_END s4.GIAO_DONG_MAX.1

// index.html:54919 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_KF.1 EDITABLE
const GIAO_KF = {
            // Tu the cam giao: mui CHIA VE TRUOC gan nhu ngang, tay rut ve sau lay da.
            idle:  [ {t:0, ang:  0.14, ext: -34} ],
            choc:  [ {t:0, ang:  0.34, ext: -34}, {t:0.20, ang: -0.05, ext:  50},
                     {t:0.44, ang:  0.00, ext:  30}, {t:1, ang: 0.16, ext: -32} ],
            choc2: [ {t:0, ang: -0.30, ext: -38}, {t:0.22, ang:  0.07, ext:  56},
                     {t:0.48, ang:  0.03, ext:  34}, {t:1, ang: 0.18, ext: -32} ],
            // VUNG LEN — quet mot cung tu duoi ra sau, vong len qua dau
            hat:   [ {t:0, ang:  1.45, ext:  -6}, {t:0.16, ang:  1.10, ext:  20},
                     {t:0.46, ang: -0.30, ext:  44}, {t:0.70, ang: -1.35, ext:  34},
                     {t:1, ang: -0.95, ext:  -8} ],
            // BO XUONG — nguoc lai: tu tren dau vong xuong dat
            bo:    [ {t:0, ang: -1.55, ext:  -4}, {t:0.18, ang: -1.15, ext:  22},
                     {t:0.50, ang:  0.35, ext:  48}, {t:0.72, ang:  1.38, ext:  36},
                     {t:1, ang:  1.05, ext: -10} ],
            cheo:  [ {t:0, ang: -0.55, ext: -28}, {t:0.24, ang:  0.78, ext:  52},
                     {t:0.52, ang:  0.74, ext:  34}, {t:1, ang: 0.95, ext: -16} ],
            // QUET NGANG — cung vung RAT RONG (gan 160 do), do day lon. Day la don bao quat.
            quet:  [ {t:0.00, a:-0.12, b:-2.50, len:1.00, gx:-26, gy: 2, piv:0.07, ngh:-0.22},
                     {t:0.30, a:-0.20, b:-2.18, len:1.08, gx:-34, gy: 2, piv:0.07, ngh:-0.30, e:'cham'},
                     {t:0.42, a:-0.21, b:-2.12, len:1.10, gx:-34, gy: 2, piv:0.07, ngh:-0.32, e:'giu'},
                     {t:0.54, a:-0.06, b:-0.55, len:1.28, gx:  4, gy: 0, piv:0.07, ngh: 0.06, e:'nhanh'},
                     {t:0.62, a: 0.20, b: 0.56, len:1.40, gx: 26, gy:-2, piv:0.07, ngh: 0.30, e:'nhanh'},
                     {t:0.72, a: 0.22, b: 0.72, len:1.40, gx: 26, gy:-2, piv:0.07, ngh: 0.32, e:'giu'},
                     {t:1.00, a:-0.12, b: 2.20, len:1.00, gx:-20, gy: 2, piv:0.07, ngh: 0.02, e:'cham'} ],
            // XOAY: dung TRON mot vong 360 do va chay TOC DO DEU (khong easing), neu khong
            // no quay gan het roi cham dan rat gia. Goc ket = goc dau + 2PI de khong bi keo nguoc.
            xoay:  [ {t:0.00, a:-1.57, b: 0.00, len:1.14, gx: 0, gy:0, piv:0.07, ngh:-0.12},
                     {t:0.25, a: 0.00, b: 0.30, len:1.18, gx: 8, gy:0, piv:0.07, ngh: 0.06, e:'phang'},
                     {t:0.50, a: 1.57, b: 0.00, len:1.20, gx: 4, gy:0, piv:0.07, ngh: 0.12, e:'phang'},
                     {t:0.75, a: 3.14, b:-0.30, len:1.18, gx:-8, gy:0, piv:0.07, ngh:-0.06, e:'phang'},
                     {t:1.00, a: 4.71, b: 0.00, len:1.14, gx: 0, gy:0, piv:0.07, ngh:-0.12, e:'phang'} ],
            luot:  [ {t:0, ang:  0.00, ext:  26}, {t:0.14, ang: 0, ext: 66},
                     {t:0.82, ang:  0.00, ext:  66}, {t:1, ang: 0.5, ext: -12} ],
            // @@HE-TRIDENT — VUNG NGANG cua dinh ba (dung khuon ang/ext; 'quet' la khuon rieng cua Ngo Khong)
            trdvung: [ {t:0, ang: -2.30, ext: -30}, {t:0.30, ang: -1.10, ext: 6}, {t:0.55, ang: 0.05, ext: 44},
                       {t:0.75, ang: 0.35, ext: 30}, {t:1, ang: 0.16, ext: -24} ]
        };
// PLAYER_PART_END s4.GIAO_KF.1

// index.html:54957 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_VET.1 EDITABLE
const GIAO_VET = { hat:1, bo:1, quet:1, xoay:1, cheo:1, luot:1, choc:0, choc2:0, trdvung:1 };
// PLAYER_PART_END s4.GIAO_VET.1

// index.html:54964 · Phạm vi: global
// PLAYER_PART_BEGIN s4.giaoEase.1 EDITABLE
function giaoEase(u){ return 1 - Math.pow(1 - u, 3); }
// PLAYER_PART_END s4.giaoEase.1

// index.html:54965 · Phạm vi: global
// PLAYER_PART_BEGIN s4.giaoLay.1 EDITABLE
function giaoLay(kf, u, thang){
            /* Hai don 'quet' / 'xoay' cua bang GIAO_KF da doi sang khung 3D cua cay gay (a, b, len, gx...). Doc no bang
               cong thuc {ang, ext} cu thi ra NaN -> ctx.translate(NaN) bi bo qua va CAY GIAO VE LOI RA MEP TRAI man hinh
               (Hans: "Spear doi khi mat cai Spear o tren khong"). Quy doi khung 3D ve goc 2D tren man hinh. */
            if (kf[0].ang === undefined && kf[0].a !== undefined && typeof wkgLay === 'function'){
                let T = wkgLay(kf, u), cb = Math.cos(T.b || 0);
                if (Math.abs(cb) < 0.17) cb = cb < 0 ? -0.17 : 0.17;
                let ca = Math.cos(T.a || 0), sa = Math.sin(T.a || 0);
                // giu goc lien tuc (khong nhay qua lai +-pi) de don xoay quay tron dung mot vong
                let ang = Math.atan2(sa, ca * cb);
                ang += Math.PI * 2 * Math.round(((T.a || 0) - ang) / (Math.PI * 2));
                return { ang, ext: (T.gx || 0) * 1.2 };
            }
            if (u <= kf[0].t) return { ang: kf[0].ang, ext: kf[0].ext };
            for (let i = 1; i < kf.length; i++){
                if (u <= kf[i].t){
                    let a = kf[i-1], b = kf[i];
                    let _u = (b.t - a.t) < 1e-6 ? 1 : (u - a.t) / (b.t - a.t);
                    let w = thang ? _u : giaoEase(_u);
                    return { ang: a.ang + (b.ang - a.ang) * w, ext: a.ext + (b.ext - a.ext) * w };
                }
            }
            let z = kf[kf.length-1]; return { ang: z.ang, ext: z.ext };
        }
// PLAYER_PART_END s4.giaoLay.1

// index.html:54990 · Phạm vi: global
// PLAYER_PART_BEGIN s4.giaoTickSong.1 EDITABLE
function giaoTickSong(){
            if (_songKhungCu === frames) return;
            _songKhungCu = frames;
            return giaoTickSongThat();
        }
// PLAYER_PART_END s4.giaoTickSong.1

// index.html:54996 · Phạm vi: global
// PLAYER_PART_BEGIN s4.giaoTickSongThat.1 EDITABLE
function giaoTickSongThat(){
            for (let i = giaoSong.length - 1; i >= 0; i--){
                let w = giaoSong[i];
                w.t--; w.x += w.dir * (w.xuyen ? 15 : (w.mui ? 11 : 11));
                let p = 1 - (w.t / w.t0);
                // nho = luoi quet: BAN KINH va SAT THUONG deu tut theo quang duong da bay.
                let R = w.nho ? Math.max(30, w.r * (1 - 0.80 * p)) : w.r * 0.55;
                let dmg = w.nho ? Math.max(1, Math.round(w.dmg * (1 - 0.5 * p))) : w.dmg;
                // MIDAS: duoi moc MIDAS_KHONG_GIAM thi song yeu dan theo tung phan ba man hinh.
                if (w.midas && w.giam){
                    let diDuoc = Math.abs(w.x - (w.x0 !== undefined ? w.x0 : w.x));
                    let buoc = Math.floor(diDuoc / Math.max(1, canvas.width / 3));
                    dmg = Math.max(1, Math.round(w.dmg * Math.max(0, 1 - buoc / 3)));
                }
                w._R = R;
                let rect = { x: w.x - R/2, y: w.y - R/2, w: R, h: R };
                let ds = [];
                for (let o of bosses) if (o && !o.dying && !o.invulnAll) ds.push(o);
                for (let o of enemies) ds.push(o);
                // Danh sach trung don chi co bosses va enemies. Nguoi choi khong nam trong
                // hai mang do, nen o PvP MOI luoi giao deu bay xuyen qua doi thu ma khong
                // cham gi: don Xuyen (moc 105f) dang le 4 (cu luot) + 7 (mui thuong) = 11,
                // do duoc dung 4 — phan 7 cua luoi mat sach. Don Quet (moc 45f) cung vay.
                // Lay muc tieu theo CHU cua luoi de luoi cua P2 khong quay lai danh P2.
                if (gameState === 'pvp' && w.chu && typeof pvpDich === 'function'){
                    let _k = pvpDich(w.chu);
                    if (_k && _k.hp > 0 && !(_k.isShielding && _k.isShielding()))
                        ds.push(typeof pvpVoBoc === 'function' ? pvpVoBoc(_k) : _k);
                }
                if (typeof gdCatHop === 'function' && !(w.chu && w.chu.id !== 1)) gdCatHop(rect);   // @@HE-GATDAN
                for (let o of ds){
                    if (w.hit.has(o) || !checkAABB(rect, o)) continue;
                    w.hit.add(o);
                    if (typeof dealDamage === 'function') dealDamage(o, dmg, 'ammo'); else o.hp -= dmg;
                    if (w.cua && w.chu && typeof dsawNovaMau === 'function') dsawNovaMau(w.chu, o);   // @@HE-NOVA3
                    // Cu dam MIDAS ha guc thi khong nga tai cho ma BAY RA KHOI MAN HINH.
                    if (w.midas && o.hp <= 0 && !o._bayXa && typeof midasVang === 'function')
                        midasVang(o, w.chu);
                    // @@HE-STYLISH: diem tinh theo sat thuong o styTick

                    if (typeof dino !== 'undefined' && dino){
                        dino._giaoDong = Math.min(GIAO_DONG_MAX, (dino._giaoDong || 0) + 1);
                        dino._giaoDongT = GIAO_DONG_HET;
                    }
                    visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 12));
                    // Luoi khi KHONG tat khi trung dich nua: chem trung ke dich sat mat van phai
                    // con nhat chem bay tiep. Moi muc tieu chi an mot lan (w.hit).
                }
                // @@HE-DEFENSE: ban do rong hon man hinh, lay bien theo THE GIOI. Truoc day
                // luoi khi sinh ra ngoai [0, 900] la bi xoa ngay lap tuc.
                if (w.t <= 0 || w.x < worldL() - 90 || w.x > worldR() + 90) giaoSong.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.giaoTickSongThat.1

// index.html:55050 · Phạm vi: global
// PLAYER_PART_BEGIN s4.giaoVeSong.1 EDITABLE
function giaoVeSong(){
            for (let w of giaoSong){
                let R = w._R || w.r, al = Math.max(0.18, w.t / w.t0);
                ctx.save(); ctx.translate(w.x, w.y); ctx.scale(w.dir, 1);
                if (w.kiem){
                    // KIEM KHI cua Nova — trang khuyet day, to hon giao khi nhung bay ngan hon.
                    let Ro = R * 0.70, Ri = R * 0.34, a0 = -1.00, a1 = 1.00;
                    ctx.globalAlpha = Math.max(0.30, al) * 0.95;
                    ctx.beginPath();
                    ctx.arc(0, 0, Ro, a0, a1);
                    ctx.arc(0, 0, Ri, a1, a0, true);
                    ctx.closePath();
                    let gk = ctx.createRadialGradient(0, 0, Math.max(1, Ri), 0, 0, Math.max(2, Ro));
                    gk.addColorStop(0,    "rgba(179,136,255,0.05)");
                    gk.addColorStop(0.6,  "rgba(209,196,233,0.55)");
                    gk.addColorStop(1,    "rgba(255,255,255,0.98)");
                    ctx.fillStyle = gk; ctx.fill();
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 3.5;
                    ctx.beginPath(); ctx.arc(0, 0, Ro, a0, a1); ctx.stroke();
                    ctx.strokeStyle = "rgba(255,255,255,0.70)"; ctx.lineWidth = 2.2;
                    for (let sd = -1; sd <= 1; sd += 2){
                        ctx.beginPath();
                        ctx.moveTo(Math.cos(sd * a1) * Ro, Math.sin(sd * a1) * Ro);
                        ctx.lineTo(Math.cos(sd * (a1 + 0.26)) * (Ro * 1.14), Math.sin(sd * (a1 + 0.26)) * (Ro * 1.14));
                        ctx.stroke();
                    }
                } else if (w.mui){
                    // GIAO KHI — mot cay giao thu nho bang gio: duoi keo dai, than, roi mui la.
                    let L2 = R * 1.15, W2 = R * 0.30;
                    ctx.globalAlpha = Math.max(0.35, al);
                    // duoi gio keo ve sau
                    let g3 = ctx.createLinearGradient(-L2, 0, L2 * 0.2, 0);
                    g3.addColorStop(0, "rgba(207,216,220,0)");
                    g3.addColorStop(1, "rgba(236,239,241,0.75)");
                    ctx.fillStyle = g3;
                    ctx.beginPath();
                    ctx.moveTo(-L2, 0); ctx.lineTo(L2 * 0.2, -W2 * 0.30);
                    ctx.lineTo(L2 * 0.2, W2 * 0.30); ctx.closePath(); ctx.fill();
                    // than giao
                    ctx.strokeStyle = "rgba(236,239,241,0.95)"; ctx.lineWidth = Math.max(2.5, R * 0.055);
                    ctx.lineCap = 'round';
                    ctx.beginPath(); ctx.moveTo(-L2 * 0.42, 0); ctx.lineTo(L2 * 0.55, 0); ctx.stroke();
                    // MUI LA o dau
                    ctx.beginPath();
                    ctx.moveTo(L2 * 0.98, 0); ctx.lineTo(L2 * 0.55, -W2);
                    ctx.lineTo(L2 * 0.44, 0);  ctx.lineTo(L2 * 0.55, W2);
                    ctx.closePath();
                    let g4 = ctx.createLinearGradient(L2 * 0.44, -W2, L2 * 0.98, W2);
                    g4.addColorStop(0, "#FFFFFF"); g4.addColorStop(1, "#B0BEC5");
                    ctx.fillStyle = g4; ctx.fill();
                    ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 1.6; ctx.stroke();
                    // hai vach gio hai ben
                    ctx.strokeStyle = "rgba(255,255,255,0.45)"; ctx.lineWidth = 1.8;
                    for (let k = -1; k <= 1; k += 2){
                        ctx.beginPath();
                        ctx.moveTo(L2 * 0.30, k * W2 * 0.72);
                        ctx.lineTo(-L2 * 0.62, k * W2 * 1.05); ctx.stroke();
                    }
                } else if (w.xuyen){
                    // MUI THUONG XE GIO — mot mui nhon dai xuyen thang
                    ctx.globalAlpha = al;
                    let L = R * 0.9, W = R * 0.20;
                    let g = ctx.createLinearGradient(-L * 0.8, 0, L, 0);
                    g.addColorStop(0, "rgba(207,216,220,0)");
                    g.addColorStop(0.7, "rgba(236,239,241,0.85)");
                    g.addColorStop(1, "#FFFFFF");
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.moveTo(L, 0); ctx.lineTo(L * 0.45, -W); ctx.lineTo(-L * 0.8, -W * 0.22);
                    ctx.lineTo(-L * 0.8, W * 0.22); ctx.lineTo(L * 0.45, W);
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 2.5;
                    ctx.beginPath(); ctx.moveTo(-L * 0.7, 0); ctx.lineTo(L * 0.92, 0); ctx.stroke();
                } else {
                    // LUOI KHI — TRANG KHUYET day, mep truoc sang trang, duoi vut nhon
                    let Ro = R * 0.62, Ri = R * 0.28, a0 = -1.12, a1 = 1.12;
                    ctx.globalAlpha = al * 0.92;
                    ctx.beginPath();
                    ctx.arc(0, 0, Ro, a0, a1);
                    ctx.arc(0, 0, Ri, a1, a0, true);
                    ctx.closePath();
                    let g = ctx.createRadialGradient(0, 0, Math.max(1, Ri), 0, 0, Math.max(2, Ro));
                    g.addColorStop(0,    "rgba(144,164,174,0.06)");
                    g.addColorStop(0.55, "rgba(207,216,220,0.48)");
                    g.addColorStop(0.88, "rgba(236,239,241,0.88)");
                    g.addColorStop(1,    "rgba(255,255,255,0.98)");
                    ctx.fillStyle = g; ctx.fill();
                    ctx.globalAlpha = al;
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.arc(0, 0, Ro, a0, a1); ctx.stroke();
                    // hai dau trang khuyet vut nhon ra ngoai
                    ctx.strokeStyle = "rgba(255,255,255,0.75)"; ctx.lineWidth = 2.5;
                    for (let sd = -1; sd <= 1; sd += 2){
                        ctx.beginPath();
                        ctx.moveTo(Math.cos(sd * a1) * Ro, Math.sin(sd * a1) * Ro);
                        ctx.lineTo(Math.cos(sd * (a1 + 0.30)) * (Ro * 1.16), Math.sin(sd * (a1 + 0.30)) * (Ro * 1.16));
                        ctx.stroke();
                    }
                    // van khi chay doc trong long luoi
                    ctx.globalAlpha = al * 0.5; ctx.strokeStyle = "#ECEFF1"; ctx.lineWidth = 1.6;
                    for (let i = -2; i <= 2; i++){
                        let aa = i * 0.42;
                        ctx.beginPath();
                        ctx.arc(0, 0, Ro * (0.70 + (i % 2 ? 0.10 : 0.16)), aa - 0.16, aa + 0.16);
                        ctx.stroke();
                    }
                }
                ctx.restore(); ctx.globalAlpha = 1;
            }
        }
// PLAYER_PART_END s4.giaoVeSong.1

// index.html:55161 · Phạm vi: global
// PLAYER_PART_BEGIN s4.giaoCong.1 EDITABLE
function giaoCong(){ return Math.min(3, Math.floor(((typeof dino !== 'undefined' && dino && dino._giaoDong) || 0) / 4))
                                    + (typeof trdCong === 'function' ? trdCong() : 0); }
// PLAYER_PART_END s4.giaoCong.1

// index.html:55163 · Phạm vi: global
// PLAYER_PART_BEGIN s4.giaoLaCanChien.1 EDITABLE
function giaoLaCanChien(a){ return a === 5 || a === 10 || a === 11 || a === MIDAS_DAN || a === DSAW_DAN || a === LH_DAN || a === DK_DAN; }
// PLAYER_PART_END s4.giaoLaCanChien.1

// index.html:55165 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_UNI_T.1 EDITABLE
const GIAO_UNI_T    = 156;
// PLAYER_PART_END s4.GIAO_UNI_T.1

// index.html:55166 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_UNI_NHIP.1 EDITABLE
const GIAO_UNI_NHIP = 22;
// PLAYER_PART_END s4.GIAO_UNI_NHIP.1

// index.html:55167 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_UNI_DMG.1 EDITABLE
const GIAO_UNI_DMG  = 3;
// PLAYER_PART_END s4.GIAO_UNI_DMG.1

// index.html:55168 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_UNI_DMG_LUA.1 EDITABLE
const GIAO_UNI_DMG_LUA = 5;
// PLAYER_PART_END s4.GIAO_UNI_DMG_LUA.1

// index.html:55169 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_UNI_R0.1 EDITABLE
const GIAO_UNI_R0   = 96;
// PLAYER_PART_END s4.GIAO_UNI_R0.1

// index.html:55170 · Phạm vi: global
// PLAYER_PART_BEGIN s4.GIAO_UNI_R1.1 EDITABLE
const GIAO_UNI_R1   = 208;
// PLAYER_PART_END s4.GIAO_UNI_R1.1

// index.html:55171 · Phạm vi: global
// PLAYER_PART_BEGIN s4.giaoSong.1 EDITABLE
let giaoSong = [];
// PLAYER_PART_END s4.giaoSong.1

// index.html:55175 · Phạm vi: global
// PLAYER_PART_BEGIN s4._songKhungCu.1 EDITABLE
let _songKhungCu = -1;
// PLAYER_PART_END s4._songKhungCu.1

// index.html:55194 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_CAO.1 EDITABLE
const WKG_CAO   = 120;
// PLAYER_PART_END s4.WKG_CAO.1

// index.html:55195 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_NAC.1 EDITABLE
const WKG_NAC   = 3;
// PLAYER_PART_END s4.WKG_NAC.1

// index.html:55197 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_GIU.1 EDITABLE
const WKG_GIU   = 120;
// PLAYER_PART_END s4.WKG_GIU.1

// index.html:55198 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_HA.1 EDITABLE
const WKG_HA    = 26;
// PLAYER_PART_END s4.WKG_HA.1

// index.html:55199 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_MAY_T.1 EDITABLE
const WKG_MAY_T = 300;
// PLAYER_PART_END s4.WKG_MAY_T.1

// index.html:55200 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_MAY_CD.1 EDITABLE
const WKG_MAY_CD= 60;
// PLAYER_PART_END s4.WKG_MAY_CD.1

// index.html:55201 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_SPIN_T.1 EDITABLE
const WKG_SPIN_T= 120;
// PLAYER_PART_END s4.WKG_SPIN_T.1

// index.html:55202 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_SPIN_CD.1 EDITABLE
const WKG_SPIN_CD=120;
// PLAYER_PART_END s4.WKG_SPIN_CD.1

// index.html:55203 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_MOI_CD.1 EDITABLE
const WKG_MOI_CD= 180;
// PLAYER_PART_END s4.WKG_MOI_CD.1

// index.html:55204 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_VONG_T.1 EDITABLE
const WKG_VONG_T= 180;
// PLAYER_PART_END s4.WKG_VONG_T.1

// index.html:55205 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_ULT_BUFF.1 EDITABLE
const WKG_ULT_BUFF = 600;
// PLAYER_PART_END s4.WKG_ULT_BUFF.1

// index.html:55206 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_CM.1 EDITABLE
const WKG_CM    = 43.4;
// PLAYER_PART_END s4.WKG_CM.1

// index.html:55208 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgCon.1 EDITABLE
let wkgCon = null, wkgMay = null, wkgSpin = null, wkgSpinCd = 0, wkgSpinCua = 0;
// PLAYER_PART_END s4.wkgCon.1

// index.html:55209 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgMoi.1 EDITABLE
let wkgMoi = null, wkgMoiCd = 0, wkgPhan = [], wkgVong = [], wkgSet = null, wkgLoc = [];
// PLAYER_PART_END s4.wkgMoi.1

// index.html:55210 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgChan.1 EDITABLE
let wkgChan = null, wkgBuff = 0, wkgHao = 0, wkgUlt = null, wkgThu = 0;
// PLAYER_PART_END s4.wkgChan.1

// index.html:55211 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgJThuong.1 EDITABLE
let wkgJThuong = 0, wkgPowerCu = -1, wkgBaoBan = 0;
// PLAYER_PART_END s4.wkgJThuong.1

// index.html:55212 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgSTruoc.1 EDITABLE
let wkgSTruoc = false, wkgSLan = -99, wkgCuiDem = 0;
// PLAYER_PART_END s4.wkgSTruoc.1

// index.html:55214 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgBat.1 EDITABLE
function wkgBat(){
            return typeof hasRune === 'function' && hasRune('wukong') && currentAmmoType === 10;
        }
// PLAYER_PART_END s4.wkgBat.1

// index.html:55217 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgReset.1 EDITABLE
function wkgReset(){
            wkgCon = null; wkgMay = null; wkgSpin = null; wkgSpinCd = 0; wkgSpinCua = 0;
            wkgMoi = null; wkgMoiCd = 0; wkgPhan.length = 0; wkgVong.length = 0;
            wkgSet = null; wkgLoc.length = 0; wkgChan = null; wkgBuff = 0; wkgHao = 0;
            wkgUlt = null; wkgThu = 0; wkgJThuong = 0; wkgCuiDem = 0; wkgBaoBan = 0;
            if (typeof dino !== 'undefined' && dino){ dino._wkgDap = null; dino._wkgLoc = null; dino._wkgK = 0; dino._wkgJD = null; dino._wkgRoi = null; }
            if (typeof wkgAnim !== 'undefined'){ wkgAnim = null; wkgVet.length = 0; wkgFx.length = 0; }
        }
// PLAYER_PART_END s4.wkgReset.1

// index.html:55227 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgDongBo.1 EDITABLE
function wkgDongBo(){
            if (typeof POWERS === 'undefined') return;
            let co = wkgBat();
            if (co){
                if (currentPower !== WKG_POWER){ wkgPowerCu = currentPower; currentPower = WKG_POWER; }
                combatStance = 0;                 // khoa GUNSLINGER — dung y Hans: chi hien thi khac
            } else if (currentPower === WKG_POWER){
                currentPower = (wkgPowerCu >= 0 && wkgPowerCu !== WKG_POWER) ? wkgPowerCu : 0;
                wkgPowerCu = -1; wkgReset();
            }
        }
// PLAYER_PART_END s4.wkgDongBo.1

// index.html:55238 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgDat.1 EDITABLE
function wkgDat(){ return 320; }
// PLAYER_PART_END s4.wkgDat.1

// index.html:55252 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_NAC_DON.1 EDITABLE
const WKG_NAC_DON = 4, WKG_NAC_MAX = 3;
// PLAYER_PART_END s4.WKG_NAC_DON.1

// index.html:55253 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgNac.1 EDITABLE
function wkgNac(){ return Math.min(WKG_NAC_MAX, Math.floor((wkgHao || 0) / WKG_NAC_DON)); }
// PLAYER_PART_END s4.wkgNac.1

// index.html:55254 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgCong.1 EDITABLE
function wkgCong(){ return (wkgBuff > 0 ? 1 : 0) + wkgNac(); }
// PLAYER_PART_END s4.wkgCong.1

// index.html:55255 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgDanh.1 EDITABLE
function wkgDanh(ng, o){
            if (!ng) return;
            let ton = (o.ton === undefined) ? 1 : o.ton;
            ng.ammo = Math.max(0, ng.ammo - ton);
            if (ng.ammo <= 0){ ng.isOverheated = true; ng.overheatTimer = 75; }
            let sc = ng.getFormScale(), dir = ng.isFacingLeft ? -1 : 1;
            // @@HE-WUKONGVE — NOI DAI hop theo dung cay gay dang ve. Khong bao gio rut ngan.
            let _r = Math.round((o.reach || 100) * sc), _t = o.hTop || 12, _b = o.hBot || 12;
            if (!o.spinR){
                let _tu = wkgTamTu(o.kf || 'quet', sc);
                if (_tu){ _r = Math.max(_r, _tu.reach); _t = Math.max(_t, _tu.hTop); _b = Math.max(_b, _tu.hBot); }
            }
            ng._beginSlash((o.dmg || 1) + wkgCong(), o.life || 12, dir,
                           o.spinR ? 0 : _r, _t, _b,
                           o.spinR ? Math.round(o.spinR * sc) : 0);
            ng.attackCooldown = (o.cd === undefined) ? 16 : o.cd;
            if (ng.slashAtk && o.kf === 'choc') ng.slashAtk.dam = 1;   // @@HE-HITFX: gay vuon dai DAM
            ng._giaoCS = GIAO_CS;
            // @@HE-WUKONGVE — he tu the RIENG, khong muon lai keyframe cua Giao nua:
            // bang cua Giao chi co GOC trong mat phang man hinh nen moi don deu thanh mot
            // banh xe quay, dung cai Hans khong muon.
            let _ten = o.kf || 'quet';
            // Thoi luong hoat anh phai BANG NHIP RA DON. Ban truoc lay life*2 nen mot don combo
            // hoi 11 khung lai co hoat anh 22 khung — nhat sau cat ngang nhat truoc, khong nhat
            // nao ve xong ca, va do chinh la ly do nhin nhu khong co hoat anh gi.
            wkgDatTu(_ten, Math.max(9, ((o.cd === undefined) ? 16 : o.cd) + 5), o.k || 0);
            // VA CHAM: no ngay o dau gay chu khong o chan nguoi choi
            let _tam = (o.spinR ? 0 : (o.reach || 100) * 0.82) * sc;
            wkgVaCham(ng.x + ng.w/2 + dir * _tam, ng.y + ng.h * (o.kf === 'kich' || o.kf === 'bo' ? 0.96 : 0.5),
                      (o.dmg || 1) >= 4 ? 2 : 1);
            if (typeof SFX !== 'undefined' && SFX.tone)
                SFX.tone(_ten === 'choc' ? 760 : 420, 0.10, 'square', 0.12, _ten === 'choc' ? 1500 : 880);
        }
// PLAYER_PART_END s4.wkgDanh.1

// index.html:55289 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgNoTai.1 EDITABLE
function wkgNoTai(x, y, R, dmg, ghi){
            if (typeof gdCatTron === 'function') gdCatTron(x, y, R);   // @@HE-GATDAN
            let ds = [];
            if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
            if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
            if (typeof defMode !== 'undefined' && defMode && typeof defUnits !== 'undefined')
                for (let u of defUnits) if (u.ben === 'e' && u.hp > 0) ds.push(u);
            let n = 0;
            for (let o of ds){
                if (!o || o.hp === undefined || o.hp <= 0 || o.dying || o.invulnAll) continue;
                let ox = o.x + (o.w || 20)/2, oy = o.y + (o.h || 20)/2;
                if (Math.hypot(ox - x, oy - y) > R) continue;
                if (typeof dealDamage === 'function') dealDamage(o, dmg + wkgCong(), 'flat');
                n++;
            }
            if (gameState === 'pvp' && typeof pvpDich === 'function'){
                let d2 = pvpDich(dino);
                if (d2 && Math.hypot((d2.x + d2.w/2) - x, (d2.y + d2.h/2) - y) <= R){
                    (typeof pvpVoBoc === 'function' ? pvpVoBoc(d2) : d2).takeDamage(dmg + wkgCong()); n++;
                }
            }
            if (ghi && n) floatingTexts.push(new FloatingText(x - 24, y - 30, ghi));
            return n;
        }
// PLAYER_PART_END s4.wkgNoTai.1

// index.html:55317 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgNoHop.1 EDITABLE
function wkgNoHop(ng, dai, cao, dmg, ghi){
            let d = ng.isFacingLeft ? -1 : 1;
            let cx = ng.x + ng.w/2;
            let x0 = Math.min(cx - 40, cx + d * dai), x1 = Math.max(cx + 40, cx + d * dai);
            let y0 = Math.max(-CAM_TROI, wkgDat() - cao), y1 = wkgDat() + 12;
            let ds = [];
            if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
            if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
            if (typeof defMode !== 'undefined' && defMode && typeof defUnits !== 'undefined')
                for (let u of defUnits) if (u.ben === 'e' && u.hp > 0) ds.push(u);
            let n = 0;
            for (let o of ds){
                if (!o || o.hp === undefined || o.hp <= 0 || o.dying || o.invulnAll) continue;
                if (o.x + (o.w||20) < x0 || o.x > x1) continue;
                if (o.y + (o.h||20) < y0 || o.y > y1) continue;
                if (typeof dealDamage === 'function') dealDamage(o, dmg + wkgCong(), 'flat');
                n++;
            }
            if (gameState === 'pvp' && typeof pvpDich === 'function'){
                let d2 = pvpDich(ng);
                if (d2 && d2.x + d2.w >= x0 && d2.x <= x1 && d2.y + d2.h >= y0 && d2.y <= y1){
                    (typeof pvpVoBoc === 'function' ? pvpVoBoc(d2) : d2).takeDamage(dmg + wkgCong()); n++;
                }
            }
            if (ghi && n) floatingTexts.push(new FloatingText(cx - 24, ng.y - 30, ghi));
            return n;
        }
// PLAYER_PART_END s4.wkgNoHop.1

// index.html:55344 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgMucGan.1 EDITABLE
function wkgMucGan(ng){
            let best = null, bd = 1e9, cx = ng.x + ng.w/2, cy = ng.y + ng.h/2;
            let ds = [];
            if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
            if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
            for (let o of ds){
                if (!o || o.hp === undefined || o.hp <= 0 || o.dying || o.invulnAll) continue;
                let d = Math.hypot((o.x + (o.w||20)/2) - cx, (o.y + (o.h||20)/2) - cy);
                if (d < bd){ bd = d; best = o; }
            }
            return best;
        }
// PLAYER_PART_END s4.wkgMucGan.1

// index.html:55360 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgNhay.1 EDITABLE
function wkgNhay(){
            if (!wkgBat() || !dino) return false;
            if (wkgUlt || dino.ultActive) return false;
            /* Tren may bam NHAY = NHAY XUONG. Rot nhanh, gay keo dai quet phia duoi, ai dinh
               phai an 5. Truoc day nut nhay o day khong lam gi ca — nguoi choi bi ket tren may
               het 5 giay moi xuong duoc. */
            if (wkgMay){
                wkgMay = null;
                dino.dy = 15; dino.grounded = false;
                dino._wkgRoi = { t: 0, hit: new Set() };
                if (typeof slamLaoBat === 'function') slamLaoBat(dino);   // @@HE-SLAMLAO
                wkgDatTu('bo', 30, 0);
                floatingTexts.push(new FloatingText(dino.x - 20, dino.y - 30, "TRỤY CÔN!"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(260, 0.16, 'sawtooth', 0.20, 700);
                return true;
            }
            /* NHAY DA TRA VE BINH THUONG. LAP CON chuyen sang phim K (xem wkgLapCon), nen o
               day nut nhay chi con hai viec: nhay xuong khi dang cuoi may, va NHA COT roi nhay
               that khi dang dung tren ngon cot. */
            if (wkgCon){
                wkgCon = null;                             // tut khoi cot roi nhay nhu thuong
                return false;
            }
            return false;
        }
// PLAYER_PART_END s4.wkgNhay.1

// index.html:55387 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgLapCon.1 EDITABLE
function wkgLapCon(ng){
            if (wkgCon){
                if (wkgCon.danh) return true;
                if (wkgCon.nac < WKG_NAC){
                    wkgCon.nac++;
                    wkgCon.dich = wkgCon.nac * WKG_CAO;
                    wkgCon.t = 0; wkgCon.ha = 0;
                    floatingTexts.push(new FloatingText(ng.x - 18, ng.y - 30, "LẬP CÔN " + wkgCon.nac));
                    if (typeof SFX !== 'undefined' && SFX.jump) SFX.jump();
                }
                return true;
            }
            if (!ng.grounded) return false;
            wkgCon = { nac: 1, cao: 0, dich: WKG_CAO, t: 0, ha: 0, x: ng.x };
            ng.dy = 0; ng.grounded = false;
            floatingTexts.push(new FloatingText(ng.x - 14, ng.y - 30, "LẬP CÔN"));
            if (typeof SFX !== 'undefined' && SFX.jump) SFX.jump();
            return true;
        }
// PLAYER_PART_END s4.wkgLapCon.1

// index.html:55408 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgLuot.1 EDITABLE
function wkgLuot(){
            if (!wkgBat() || !dino) return false;
            if (wkgUlt || dino.ultActive) return false;
            // cui hai nhip roi luot = PHAN THAN MOI
            if (dino.grounded && wkgCuiDem >= 2 && (keys['KeyS'] || keys['ArrowDown'])){
                wkgCuiDem = 0;
                if (wkgMoiCd <= 0){
                    wkgMoi = { x: dino.x, y: dino.y, w: dino.w, h: dino.h, hp: 1, t: 0,
                               trai: dino.isFacingLeft, go: 0 };
                    wkgMoiCd = WKG_MOI_CD;
                    floatingTexts.push(new FloatingText(dino.x - 24, dino.y - 34, "THÂN NGOẠI THÂN!"));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900, 0.10, 'triangle', 0.14, 1500);
                }
                return true;
            }
            /* J -> LUOT: don nay chua he duoc lam. Hans: "xoay gay roi luot toi nhay len
               1 chut vung gay dap vao ke dich, don vung gay 3 dmg". Chi mo trong CUA SO NOI
               DON sau mot nhat J, neu khong thi luot van la luot. */
            if (!wkgCon && !wkgMay && dino.grounded && !dino._wkgJD
                && (dino._giaoCS || 0) > 0 && (dino._giaoChuoi || 0) > 0){
                dino._wkgJD = { t: 0, T: 40, dir: dino.isFacingLeft ? -1 : 1 };
                floatingTexts.push(new FloatingText(dino.x - 16, dino.y - 32, "TOÀN CÔN!"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(500, 0.10, 'square', 0.13, 900);
                return true;
            }
            if (wkgCon){
                wkgCon = null;
                wkgMay = { t: WKG_MAY_T, cd: 0, bob: 0 };
                dino.dy = 0; dino.grounded = false;
                floatingTexts.push(new FloatingText(dino.x - 28, dino.y - 34, "CÂN ĐẨU VÂN!"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(520, 0.22, 'sine', 0.18, 1100);
                return true;
            }
            return false;
        }
// PLAYER_PART_END s4.wkgLuot.1

// index.html:55454 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_KHONG_HUY.1 EDITABLE
const WKG_KHONG_HUY = ['kich', 'bo', 'choc', 'quet', 'xoay', 'luot'];
// PLAYER_PART_END s4.WKG_KHONG_HUY.1

// index.html:55455 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgRanhTay.1 EDITABLE
function wkgRanhTay(){
            if (!dino) return false;
            // CUOI MAY thi gay dang THU LAI, tay khong ban gi — van do duoc.
            if (wkgCon || wkgUlt) return false;                            // dung cot / ult
            if (dino._wkgRoi || dino._wkgJD || dino._wkgDap) return false; // truy con / toan con / dap dau
            if (dino._wkgLoc) return false;                               // dang giua chuoi loc con
            if (wkgThu > 0) return false;                                 // dang thu gay ve
            if (wkgAnim && WKG_KHONG_HUY.indexOf(wkgAnim.ten) >= 0) return false;
            return true;
        }
// PLAYER_PART_END s4.wkgRanhTay.1

// index.html:55465 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgKhien.1 EDITABLE
function wkgKhien(){
            if (!wkgBat() || !dino) return false;
            if (!wkgRanhTay()){
                if ((wkgBaoBan || 0) <= 0){
                    wkgBaoBan = 40;
                    floatingTexts.push(new FloatingText(dino.x - 26, dino.y - 34, "ĐANG BẬN GẬY!"));
                }
                return true;                                              // van nuot phim L
            }
            if (wkgSpinCd <= 0 && !wkgSpin && !dino.ultActive && !wkgUlt){
                wkgSpin = { t: WKG_SPIN_T, chan: 0, nhip: 0 };
                wkgAnim = null;                                           // huy hoat anh dang chay
                floatingTexts.push(new FloatingText(dino.x - 12, dino.y - 32, "XOAY CÔN!"));
            }
            return true;      // luon NUOT phim L: khien thuong bi khoa hoan toan
        }
// PLAYER_PART_END s4.wkgKhien.1

// index.html:55483 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgJ.1 EDITABLE
function wkgJ(ng){
            if (!ng || ng.isOverheated || ng.ammo <= 0) return;
            if (wkgUlt) return;
            wkgJThuong = 40;
            // --- dang dung tren gay: NHAC GAY LEN, XOAY HAI VONG, GIANG XUONG ---
            if (wkgCon){
                if (wkgCon.danh) return;
                wkgCon.danh = { t: 0, T: 90 };            // 1.5 giay
                floatingTexts.push(new FloatingText(ng.x - 16, ng.y - 30, "KÍCH CÔN!"));
                return;
            }
            /* Dang cuoi may: SET DANH THANG XUONG DUOI DAM MAY. Ban truoc no tu tim ke dich
               gan nhat bat ke o dau — tuc nguoi choi bay mot noi ma set danh mot noi, khong
               con ly do gi de lai bay cho dung. Nay tia danh thang tu day may xuong dat, va
               chi trung nhung gi dang DUNG DUOI do. */
            if (wkgMay){
                if (wkgMay.cd > 0) return;
                wkgMay.cd = WKG_MAY_CD;
                let tx = ng.x + ng.w/2;
                wkgSetTia(tx, wkgDat() - 22, 4, 1.5 * WKG_CM, ng.y + ng.h + 10);
                return;
            }
            // --- vua Spin xong: don ket phong gay ---
            if (wkgSpinCua > 0){
                let bonus = wkgSpinBonus(wkgSpinCua_chan);
                wkgSpinCua = 0;
                ng.dy = -7; ng.grounded = false;
                wkgDanh(ng, { dmg: 3 + bonus, life: 16, reach: 250, hTop: 20, hBot: 20, cd: 26, kf: 'choc' });
                floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 32, "PHÓNG CÔN +" + bonus));
                return;
            }
            // --- tren khong: J danh CHUOI KICH CON y nhu duoi dat (roi tu nhien, khong lo lung).
            //     Cu LAO TOI DAP DAU truoc day cua J tren khong gio nam o phim K (xem wkgK). ---
            // --- cui J: CHOC CON, phong than gay dam ve truoc ---
            if (ng.grounded && (keys['KeyS'] || keys['ArrowDown'])){
                wkgDanh(ng, { dmg: 3, life: 14, reach: 300, hTop: 8, hBot: 8, cd: 20, kf: 'choc' });
                wkgThu = 10;                                 // phai thu gay ve moi di duoc
                return;
            }
            // --- luot + J: lao toi dam ---
            if (typeof dangLuotHoacChop === 'function' && dangLuotHoacChop()){
                wkgDanh(ng, { dmg: 3, life: 16, reach: 250, hTop: 14, hBot: 14, cd: 22, kf: 'luot' });
                return;
            }
            // --- CHUOI KICH CON: 4 nhat vung NGANG + 1 nhat ket nhay len giang xuong ---
            if ((ng._giaoCS || 0) <= 0) ng._giaoChuoi = 0;
            ng._giaoChuoi = Math.min(5, (ng._giaoChuoi || 0) + 1);
            let k = ng._giaoChuoi;
            if (k >= 5){
                ng.dy = -6; ng.grounded = false;
                wkgDanh(ng, { dmg: 4, life: 18, reach: 205, hTop: 26, hBot: 40, cd: 30, kf: 'kich' });
                ng._giaoChuoi = 0;      // chuoi ve dau, nhung CHONG HAO QUANG thi GIU
                return;
            }
            // Nhip 11 khung nhanh den muc bon nhat dau dinh vao nhau. 16 khung van la chuoi
            // nhanh nhat trong ca game nhung MOI NHAT deu ve xong duoc mot vong quet.
            wkgDanh(ng, { dmg: 2, life: 13, reach: 0, hTop: 22, hBot: 22, cd: 16, kf: 'vuhoa',
                          spinR: 128, k: k });
        }
// PLAYER_PART_END s4.wkgJ.1

// index.html:55544 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgK.1 EDITABLE
function wkgK(ng, hg, og){
            if (!ng) return;
            if (wkgUlt) return;
            if (wkgChan){ wkgChanNha(ng); return; }
            wkgJThuong = 0;
            /* CHAM K NGAY SAU MOT DON J — dat TRUOC hang rao hoi don, dung nhu `giaoKet` cua
               Giao goc. Do duoc: de sau hang rao thi mot nhat J (hoi don 16 khung) nuot luon cu
               K ke tiep, chuoi J -> K -> K khong bao gio chay toi ve thu hai — cam giac y het
               dang phai GIU K. */
            if (hg < 15 && (ng._giaoCS || 0) > 0 && (ng._giaoChuoi || 0) > 0 && ng.grounded){
                if ((ng._wkgK || 0) === 0){
                    ng._wkgK = 1;
                    dashVx = (ng.isFacingLeft ? 1 : -1) * 11;      // lui lai mot chut
                    wkgDanh(ng, { dmg: 4, life: 18, reach: 280, hTop: 18, hBot: 18, cd: 26, kf: 'quet' });
                    return;
                }
                if (ng._wkgK === 1){
                    ng._wkgK = 2;
                    // cam gay xuong, dua nguoi len roi vung xuong -> tam danh rong hon
                    // "chong cay gay len cao roi cam lay chinh cay gay do xoay va danh xuong"
                    // Cot phai CAO hon han: cu K truoc do da lui nguoi choi lai, do duoc
                    // khoang cach toi muc tieu nhay tu 120 len 179px trong khi tam vung chi
                    // 150 — don nay truot sach du hoat anh vung qua dau doi thu.
                    wkgCon = { nac: 2, cao: 230, dich: 230, t: WKG_GIU - 46, ha: 0, x: ng.x,
                               danh: { t: 0, T: 66 }, dmgEp: 4 };
                    ng.dy = 0; ng.grounded = false;
                    return;
                }
            }
            if (!og) return;
            // --- tren khong, CHAM K ---
            if (!ng.grounded && !wkgCon && !wkgMay && hg < 15){
                // Xuong + K: keo dai gay BO XUONG
                if (keys['KeyS'] || keys['ArrowDown']){
                    wkgDanh(ng, { dmg: 4, life: 16, reach: 230, hTop: 10, hBot: 52, cd: 26, kf: 'bo' });
                    return;
                }
                // K: DAP DAU — LAO TOI trong 9 khung roi bat lui 5cm, mien thuong suot doan lao
                if (ng._wkgDap || !og) return;
                let m = wkgMucGan(ng);
                ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 26);
                ng._wkgDap = { t: 0, T: 9, muc: m, xong: 0 };
                ng.attackCooldown = 22;
                return;
            }
            ng._wkgK = 0;
            /* CHAM K = LAP CON. Doi cho voi nut nhay, va BO han don dam gay ve truoc: cui J da
               lam dung viec do roi, giu ca hai la thua mot phim. */
            if (hg < 30){
                if (wkgLapCon(ng)) return;
                return;
            }
            // --- MOC 1 (0.5-1 giay): VONG CHONG YEU ---
            if (hg < 60){
                let cx = ng.x + ng.w/2, cy = wkgDat() - 6;
                wkgDanh(ng, { dmg: 3, life: 20, reach: 0, hTop: 26, hBot: 26, cd: 30, kf: 'xoay',
                              spinR: 3 * WKG_CM });
                wkgVong.push({ x: cx, y: cy, r: 3 * WKG_CM, t: WKG_VONG_T, nhip: 0 });
                floatingTexts.push(new FloatingText(ng.x - 26, ng.y - 34, "VÒNG CHỐNG YÊU"));
                return;
            }
            // --- MOC 2 (1-2 giay): TRIEU CAN DAU VAN GIANG SET ---
            if (hg < 120){
                let dai = (hg < 90) ? 180 : 240;                   // 3 giay / 4 giay
                if (wkgSet) wkgSet.t = Math.max(wkgSet.t, dai);
                else wkgSet = { t: dai, nhip: 0, x: ng.x + ng.w/2, y: ng.y - 150 };
                ng.ammo = Math.max(0, ng.ammo - 1);
                ng.attackCooldown = 26;
                floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 34, "CÂN ĐẨU VÂN GỌI SÉT"));
                return;
            }
            // --- MOC 3 (2-3 giay): BA VONG XOAY ROI DAY LOC ---
            wkgDanh(ng, { dmg: 4, life: 14, reach: 0, hTop: 28, hBot: 28, cd: 8, kf: 'xoay',
                          spinR: 168, ton: 1 });
            ng._wkgLoc = { i: 0, t: 0 };
            floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 34, "LỐC CÔN!"));
        }
// PLAYER_PART_END s4.wkgK.1

// index.html:55623 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgSpinCua_chan.1 EDITABLE
let wkgSpinCua_chan = 0;
// PLAYER_PART_END s4.wkgSpinCua_chan.1

// index.html:55624 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgSpinBonus.1 EDITABLE
function wkgSpinBonus(n){ return n >= 7 ? 3 : (n >= 4 ? 2 : (n >= 1 ? 1 : 0)); }
// PLAYER_PART_END s4.wkgSpinBonus.1

// index.html:55627 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgSetTia.1 EDITABLE
function wkgSetTia(x, y, dmg, R, tuY){
            wkgLoc.push({ tia: 1, x: x, y: y, t: 14, R: R, tu: (tuY === undefined ? -CAM_TROI : tuY) });
            wkgNoTai(x, y, R, dmg, null);
            shakeTimer = Math.max(shakeTimer || 0, 10);
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1500, 0.08, 'square', 0.16, 400);
        }
// PLAYER_PART_END s4.wkgSetTia.1

// index.html:55635 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgChanBat.1 EDITABLE
function wkgChanBat(ng){
            if (wkgChan) return;
            wkgChan = { t: 0 };
            for (let i = 0; i < 2; i++) wkgThemPhan(ng, i);
            floatingTexts.push(new FloatingText(ng.x - 34, ng.y - 36, "THÂN NGOẠI HOÁ THÂN!"));
        }
// PLAYER_PART_END s4.wkgChanBat.1

// index.html:55641 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgThemPhan.1 EDITABLE
function wkgThemPhan(ng, i){
            if (wkgPhan.length >= 6) return;
            let Q = wkgPhanTao(ng, i);
            if (Q) wkgPhan.push(Q);
        }
// PLAYER_PART_END s4.wkgThemPhan.1

// index.html:55646 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgChanNha.1 EDITABLE
function wkgChanNha(ng){
            wkgChan = null; wkgPhan.length = 0;
            wkgDanh(ng, { dmg: 4, life: 20, reach: 0, hTop: 30, hBot: 30, cd: 30, kf: 'xoay',
                          spinR: 180 });
        }
// PLAYER_PART_END s4.wkgChanNha.1

// index.html:55653 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgUltBat.1 EDITABLE
function wkgUltBat(ng){
            wkgUlt = { t: 0, x: ng.x + ng.w/2, no: 0 };
            ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 150);
            return true;
        }
// PLAYER_PART_END s4.wkgUltBat.1

// index.html:55660 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTick.1 EDITABLE
function wkgTick(){
            if (typeof dino === 'undefined' || !dino) return;
            if (!wkgBat()){ if (wkgCon || wkgMay || wkgChan || wkgPhan.length) wkgReset(); return; }
            
            if (wkgJThuong > 0) wkgJThuong--;
            if (wkgBaoBan > 0) wkgBaoBan--;
            if (wkgBuff > 0) wkgBuff--;
            if (wkgThu > 0) wkgThu--;
            if (wkgMoiCd > 0) wkgMoiCd--;
            if (wkgSpinCd > 0) wkgSpinCd--;
            if (wkgSpinCua > 0) wkgSpinCua--;
            // dem hai nhip CUI de mo phan than moi
            let sNay = !!(keys['KeyS'] || keys['ArrowDown']);
            if (sNay && !wkgSTruoc){
                wkgCuiDem = (frames - wkgSLan < 26) ? 2 : 1;
                wkgSLan = frames;
            }
            wkgSTruoc = sNay;
            if (frames - wkgSLan > 40) wkgCuiDem = 0;
            // hao quang do: trung don ma chua an don thi tich
            // MOT don trung = MOT lan dem, du don do quet trung may muc tieu.
            if ((dino._wkgTrung || 0) > 0){
                let _nac = wkgNac();
                wkgHao = Math.min(WKG_NAC_DON * WKG_NAC_MAX, wkgHao + 1);
                dino._wkgTrung = 0;
                if (wkgNac() > _nac)
                    floatingTexts.push(new FloatingText(dino.x - 24, dino.y - 40, "HÀO QUANG " + wkgNac()));
            }

            wkgTickFx();
            wkgTickRoi();
            wkgTickJD();
            wkgTickDap();
            wkgTickCon();
            wkgTickMay();
            wkgTickSpin();
            wkgTickMoi();
            wkgTickPhan();
            wkgTickVong();
            wkgTickSet();
            wkgTickLoc();
            wkgTickUlt();
        }
// PLAYER_PART_END s4.wkgTick.1

// index.html:55708 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickRoi.1 EDITABLE
function wkgTickRoi(){
            let R = dino._wkgRoi; if (!R) return;
            R.t++;
            dino.invincible = true; dino.invTimer = Math.max(dino.invTimer || 0, 10);
            if (dino.dy < 13) dino.dy = 13;
            let d = dino.isFacingLeft ? -1 : 1;
            let cx = dino.x + dino.w/2, cy = dino.y + dino.h;
            let L = 150;
            // hop quet: tu than nguoi keo xuong va cheo ve truoc dung bang than gay
            let x0 = Math.min(cx - 34, cx + d * L), x1 = Math.max(cx + 34, cx + d * L);
            let y0 = dino.y - 10, y1 = cy + L * 0.72;
            let ds = [];
            if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
            if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
            for (let o of ds){
                if (!o || o.hp === undefined || o.hp <= 0 || o.dying || o.invulnAll) continue;
                if (R.hit.has(o)) continue;
                if (o.x + (o.w||20) < x0 || o.x > x1 || o.y + (o.h||20) < y0 || o.y > y1) continue;
                R.hit.add(o);
                if (typeof dealDamage === 'function') dealDamage(o, 5 + wkgCong(), 'flat');
                wkgVaCham(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 2);
                dino._wkgTrung = (dino._wkgTrung || 0) + 1;
            }
            if (gameState === 'pvp' && typeof pvpDich === 'function'){
                let d2 = pvpDich(dino);
                if (d2 && !R.hit.has(d2) && d2.x + d2.w >= x0 && d2.x <= x1 && d2.y + d2.h >= y0 && d2.y <= y1){
                    R.hit.add(d2);
                    (typeof pvpVoBoc === 'function' ? pvpVoBoc(d2) : d2).takeDamage(5 + wkgCong());
                }
            }
            if (dino.grounded || R.t > 90){
                if (dino.grounded){
                    wkgDatVang(cx, 120, d, 2);
                    shakeTimer = Math.max(shakeTimer || 0, 18);
                }
                dino._wkgRoi = null;
            }
        }
// PLAYER_PART_END s4.wkgTickRoi.1

// index.html:55746 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickJD.1 EDITABLE
function wkgTickJD(){
            let J = dino._wkgJD; if (!J) return;
            J.t++;
            if (J.t === 2){                        // CU VUNG mo dau — an don that
                dino.isFacingLeft = J.dir < 0;
                wkgDanh(dino, { dmg: 3, life: 12, reach: 190, hTop: 20, hBot: 20, cd: 6, kf: 'quet' });
            }
            if (J.t === 14){                       // LAO TOI va nhun len mot chut
                dashVx = J.dir * 26;
                dino.dy = -7.2; dino.grounded = false;
                dino.invincible = true; dino.invTimer = Math.max(dino.invTimer || 0, 14);
            }
            if (J.t === 26){                       // CU DAP ket
                dino.isFacingLeft = J.dir < 0;
                wkgDanh(dino, { dmg: 4, life: 16, reach: 200, hTop: 24, hBot: 44, cd: 24, kf: 'kich', ton: 0 });
            }
            if (J.t >= J.T) dino._wkgJD = null;
        }
// PLAYER_PART_END s4.wkgTickJD.1

// index.html:55764 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickDap.1 EDITABLE
function wkgTickDap(){
            let D = dino._wkgDap; if (!D) return;
            D.t++;
            let m = D.muc;
            if (m && (m.hp === undefined || m.hp > 0) && !m.dying){
                let mx = m.x + (m.w||20)/2, my = (m.y || 0) - dino.h - 4;
                let cx = dino.x + dino.w/2;
                dino.isFacingLeft = mx < cx;
                let dx = mx - cx - (dino.isFacingLeft ? -26 : 26);
                dino.x += Math.max(-26, Math.min(26, dx));
                dino.y += Math.max(-22, Math.min(22, my - dino.y));
                dino.dy = 0; dino.grounded = false;
            }
            if (D.t >= D.T && !D.xong){
                D.xong = 1;
                wkgDanh(dino, { dmg: 2, life: 12, reach: 104, hTop: 8, hBot: 40, cd: 18, kf: 'bo' });
                dino._wkgTrung = (dino._wkgTrung || 0) + 1;
                dashVx = (dino.isFacingLeft ? 1 : -1) * 16;     // bat lui ~5cm
                dino.dy = -6.5;
                if (typeof visualEffects !== 'undefined')
                    visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + dino.h, 'explosion', true, 22));
            }
            if (D.t >= D.T + 4) dino._wkgDap = null;
        }
// PLAYER_PART_END s4.wkgTickDap.1
