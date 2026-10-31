// PLAYER_FILE: VENOM01
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: FloatingText, LT, SFX, allTargets, checkAABB, ctx, dangLuotHoacChop, dealDamage, dino, floatingTexts, frames, gdCatHop, keys, setCanApDon, setCanDmg, setCanTam, shakeTimer, slamLaoBat
// index.html:61896 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_VUNG_DMG.1 EDITABLE
const VEN_VUNG_DMG = 4;
// PLAYER_PART_END s4.VEN_VUNG_DMG.1

// index.html:61897 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_TAM.1 EDITABLE
const VEN_TAM = [130, 165, 200];
// PLAYER_PART_END s4.VEN_TAM.1

// index.html:61898 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_TAM_XIEN.1 EDITABLE
const VEN_TAM_XIEN = 250;
// PLAYER_PART_END s4.VEN_TAM_XIEN.1

// index.html:61899 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_DMG.1 EDITABLE
const VEN_DMG = [3, 3, 5];
// PLAYER_PART_END s4.VEN_DMG.1

// index.html:61900 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_HAT_TAM.1 EDITABLE
const VEN_HAT_TAM = 150, VEN_HAT_DMG = 4;
// PLAYER_PART_END s4.VEN_HAT_TAM.1

// index.html:61901 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_KHONG_R.1 EDITABLE
const VEN_KHONG_R = 150, VEN_KHONG_DMG = 3;
// PLAYER_PART_END s4.VEN_KHONG_R.1

// index.html:61902 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_CHE_DMG.1 EDITABLE
const VEN_CHE_DMG = 5, VEN_CHE_CHAN = 2;
// PLAYER_PART_END s4.VEN_CHE_DMG.1

// index.html:61903 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_LAO_DMG.1 EDITABLE
const VEN_LAO_DMG = 6, VEN_LAO_R = 130;
// PLAYER_PART_END s4.VEN_LAO_DMG.1

// index.html:61904 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_LUOT_DMG.1 EDITABLE
const VEN_LUOT_DMG = 5, VEN_LUOT_TAM = 190;
// PLAYER_PART_END s4.VEN_LUOT_DMG.1

// index.html:61905 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_XUYEN_DMG.1 EDITABLE
const VEN_XUYEN_DMG = 4, VEN_XUYEN_XA = 55;
// PLAYER_PART_END s4.VEN_XUYEN_DMG.1

// index.html:61906 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_VUNG_R0.1 EDITABLE
const VEN_VUNG_R0 = 90, VEN_VUNG_THEM = 45, VEN_VUNG_MAX = 225;
// PLAYER_PART_END s4.VEN_VUNG_R0.1

// index.html:61907 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_VUNG_SONG.1 EDITABLE
const VEN_VUNG_SONG = 240, VEN_GAI_DMG = 4;
// PLAYER_PART_END s4.VEN_VUNG_SONG.1

// index.html:61908 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_TANG_MAX.1 EDITABLE
const VEN_TANG_MAX = 4, VEN_TANG_SONG = 300;
// PLAYER_PART_END s4.VEN_TANG_MAX.1

// index.html:61914 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_TROI_T.1 EDITABLE
const VEN_TROI_T = 75, VEN_TROI_MIEN = 600;
// PLAYER_PART_END s4.VEN_TROI_T.1

// index.html:61917 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_C2_DMG.1 EDITABLE
const VEN_C2_DMG = 12, VEN_C2_SO = 1, VEN_C2_TAM = 285;
// PLAYER_PART_END s4.VEN_C2_DMG.1

// index.html:61918 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_C3_DMG.1 EDITABLE
const VEN_C3_DMG = 6, VEN_C3_R = 200;
// PLAYER_PART_END s4.VEN_C3_DMG.1

// index.html:61923 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_C4_TAM.1 EDITABLE
const VEN_C4_TAM = 300, VEN_C4_DMG = 10, VEN_C4_TUONG = 4;
// PLAYER_PART_END s4.VEN_C4_TAM.1

// index.html:61924 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_C4_TAN.1 EDITABLE
const VEN_C4_TAN = 16, VEN_C4_LAO = 26;
// PLAYER_PART_END s4.VEN_C4_TAN.1

// index.html:61928 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_CH_DMG.1 EDITABLE
const VEN_CH_DMG = 5, VEN_CH_NHIP = 25, VEN_CH_TAM = 110;
// PLAYER_PART_END s4.VEN_CH_DMG.1

// index.html:61943 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_GAI_NHAM_X.1 EDITABLE
const VEN_GAI_NHAM_X = 118;
// PLAYER_PART_END s4.VEN_GAI_NHAM_X.1

// index.html:61944 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_GAI_LECH.1 EDITABLE
const VEN_GAI_LECH = 34;
// PLAYER_PART_END s4.VEN_GAI_LECH.1

// index.html:61945 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_GAI_CHO.1 EDITABLE
const VEN_GAI_CHO = [[-10, -22, -2.85, -14],   // TREN — nham cao
                             [  2,   2, -2.35,  -6],   // TREN — nham cao
                             [ -8,  26, -1.70,  34],   // duoi — nham giua
                             [  6,  48, -1.20,  34]];
// PLAYER_PART_END s4.VEN_GAI_CHO.1

// index.html:61949 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_GAI_MOC.1 EDITABLE
const VEN_GAI_MOC = 30;
// PLAYER_PART_END s4.VEN_GAI_MOC.1

// index.html:61950 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_DU_XA.1 EDITABLE
const VEN_DU_XA = 150, VEN_DU_KHUNG = 26;
// PLAYER_PART_END s4.VEN_DU_XA.1

// index.html:61951 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_ULT_KHUNG.1 EDITABLE
const VEN_ULT_KHUNG = 600, VEN_ULT_TAM = 1.30, VEN_ULT_CONG = 2;
// PLAYER_PART_END s4.VEN_ULT_KHUNG.1

// index.html:61952 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_GIOT_CHO.1 EDITABLE
const VEN_GIOT_CHO = 40, VEN_GIOT_DMG = 4, VEN_GIOT_BK = 260;
// PLAYER_PART_END s4.VEN_GIOT_CHO.1

// index.html:61961 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_NOVA_CHO.1 EDITABLE
const VEN_NOVA_CHO = 120;
// PLAYER_PART_END s4.VEN_NOVA_CHO.1

// index.html:61962 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_NOVA_DMG.1 EDITABLE
const VEN_NOVA_DMG = 2;
// PLAYER_PART_END s4.VEN_NOVA_DMG.1

// index.html:61963 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_GIOT_MAX.1 EDITABLE
const VEN_GIOT_MAX = 20;
// PLAYER_PART_END s4.VEN_GIOT_MAX.1

// index.html:61964 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venVungs.1 EDITABLE
let venVungs = [];
// PLAYER_PART_END s4.venVungs.1

// index.html:61975 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venDanHoi.1 EDITABLE
function venDanHoi(k){
            if (k <= 0 || k >= 1) return 0;
            if (k < 0.34) return 1.15 * Math.pow(k / 0.34, 0.5);
            let u = (k - 0.34) / 0.66;
            return 1.15 * (1 - u) * (1 + 0.30 * Math.sin(u * 11));
        }
// PLAYER_PART_END s4.venDanHoi.1

// index.html:61982 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venVeVoi.1 EDITABLE
function venVeVoi(x, y, ang, dai, k, day){
            let L = dai * venDanHoi(k);
            if (L < 3) return;
            const n = 9;
            /* PHONG RA thi THANG VA NHON — mot cai gai dam ra khong the vua bay vua ngo
               nguay. Chi khi THU VE no moi uon luon roi cuon vao than. Truoc day `song` la
               (1 - thu*0.5) tuc luc phong ra la luc lac manh nhat: nguoc han. */
            let thu = k > 0.34 ? (k - 0.34) / 0.66 : 0;      // 0..1 pha thu ve
            let cuon = thu * thu * 2.3;                       // cang thu cang cuon
            let song = thu;                                   // phong ra: 0 (thang tap)
            ctx.save();
            ctx.translate(x, y); ctx.rotate(ang);
            let px = 0, py = 0, g = 0, xs = [], ys = [], ws = [];
            for (let i = 0; i <= n; i++){
                let t = i / n;
                xs.push(px); ys.push(py);
                ws.push(day * (1 - t) * (1 - t * 0.42));
                g += cuon / n + Math.sin(t * 3.4 + frames * 0.3) * 0.12 * song;
                px += (L / n) * Math.cos(g); py += (L / n) * Math.sin(g);
            }
            // hai bien vuong goc voi huong tung dot
            let tren = [], duoi = [];
            for (let i = 0; i <= n; i++){
                let gx = (i < n ? xs[i+1] - xs[i] : xs[i] - xs[i-1]);
                let gy = (i < n ? ys[i+1] - ys[i] : ys[i] - ys[i-1]);
                let dl = Math.hypot(gx, gy) || 1, nx = -gy/dl, ny = gx/dl;
                tren.push([xs[i] + nx*ws[i], ys[i] + ny*ws[i]]);
                duoi.push([xs[i] - nx*ws[i], ys[i] - ny*ws[i]]);
            }
            let mx = xs[n] + (xs[n]-xs[n-1]) * 1.6, my = ys[n] + (ys[n]-ys[n-1]) * 1.6;
            ctx.beginPath();
            for (let i = 0; i <= n; i++) i ? ctx.lineTo(tren[i][0], tren[i][1]) : ctx.moveTo(tren[0][0], tren[0][1]);
            ctx.lineTo(mx, my);                                                // MUI NHON
            for (let i = n; i >= 0; i--) ctx.lineTo(duoi[i][0], duoi[i][1]);
            ctx.closePath();
            ctx.fillStyle = '#08080B'; ctx.globalAlpha = 0.97; ctx.fill();
            ctx.strokeStyle = '#26262E'; ctx.lineWidth = 1.4; ctx.stroke();
            ctx.globalAlpha = 0.55; ctx.strokeStyle = '#D8D8E4'; ctx.lineWidth = 1.2;
            ctx.beginPath();
            for (let i = 0; i <= n; i++) i ? ctx.lineTo(xs[i], ys[i]) : ctx.moveTo(0, 0);
            ctx.lineTo(mx, my); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.venVeVoi.1

// index.html:62026 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venVeGio.1 EDITABLE
function venVeGio(cx, cy, a0, a, dai, k){
            let mo = Math.max(0, 1 - k * 1.35); if (mo <= 0.02) return;
            ctx.save(); ctx.lineCap = 'round';
            for (let i = 0; i < 3; i++){
                let r = dai * (0.62 + i * 0.19);
                ctx.globalAlpha = mo * (0.34 - i * 0.07);
                ctx.strokeStyle = '#E6E6F2'; ctx.lineWidth = 2.6 - i * 0.6;
                ctx.beginPath();
                ctx.arc(cx, cy, r, Math.min(a0, a) + 0.08 * i, Math.max(a0, a) - 0.05 * i);
                ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.venVeGio.1

// index.html:62040 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venVeRoi.1 EDITABLE
function venVeRoi(cx, cy, a0, a, dai, k, day){
            let L = dai * Math.min(1, 0.35 + k * 2.2) * (k > 0.7 ? (1 - (k - 0.7) / 0.3) : 1);
            if (L < 4) return;
            const n = 12;
            let tre = Math.max(0, 1 - k * 1.6);            // cuoi nhat thi ngon duoi kip
            let xs = [], ys = [], ws = [];
            for (let i = 0; i <= n; i++){
                let t = i / n;
                let g = a - (a - a0) * Math.pow(t, 1.5) * tre + Math.sin(t * 4 + frames * 0.35) * 0.05;
                let r = L * t;
                xs.push(cx + r * Math.cos(g)); ys.push(cy + r * Math.sin(g));
                ws.push(day * (1 - t * 0.92) * (1 - t * 0.3) + 0.6);
            }
            let tren = [], duoi = [];
            for (let i = 0; i <= n; i++){
                let gx = (i < n ? xs[i+1] - xs[i] : xs[i] - xs[i-1]);
                let gy = (i < n ? ys[i+1] - ys[i] : ys[i] - ys[i-1]);
                let dl = Math.hypot(gx, gy) || 1, nx = -gy/dl, ny = gx/dl;
                tren.push([xs[i] + nx*ws[i], ys[i] + ny*ws[i]]);
                duoi.push([xs[i] - nx*ws[i], ys[i] - ny*ws[i]]);
            }
            let mx = xs[n] + (xs[n]-xs[n-1]) * 2.0, my = ys[n] + (ys[n]-ys[n-1]) * 2.0;
            ctx.save();
            ctx.beginPath();
            for (let i = 0; i <= n; i++) i ? ctx.lineTo(tren[i][0], tren[i][1]) : ctx.moveTo(tren[0][0], tren[0][1]);
            ctx.lineTo(mx, my);
            for (let i = n; i >= 0; i--) ctx.lineTo(duoi[i][0], duoi[i][1]);
            ctx.closePath();
            ctx.fillStyle = '#08080B'; ctx.globalAlpha = 0.97; ctx.fill();
            ctx.strokeStyle = '#26262E'; ctx.lineWidth = 1.4; ctx.stroke();
            ctx.globalAlpha = 0.5; ctx.strokeStyle = '#D8D8E4'; ctx.lineWidth = 1.2;
            ctx.beginPath();
            for (let i = 0; i <= n; i++) i ? ctx.lineTo(xs[i], ys[i]) : ctx.moveTo(xs[0], ys[0]);
            ctx.lineTo(mx, my); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.venVeRoi.1

// index.html:62077 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venDaoBan.1 EDITABLE
function venDaoBan(ctx, S){
            // ban dao ve trong he da xoay san; truc dai chay theo +x
            const n = 30; let bL = S, W = bL * VEN_DAO_W;
            /* Truc dai cua luoi chay theo +x = DUNG huong cua mut roi. Ban truoc goc bat dau
               la -PI/2 nen than luoi moc vuong goc ra khoi mut, cong them phep xoay +PI/2 o
               ham goi nua -> luoi bay han ra khoi roi, nhin nhu hai vat the roi nhau. */
            let sx = [], sy = [], nx = [], ny = [], px = -bL * 0.06, py = 0;
            let gg = 0.20;
            for (let i = 0; i <= n; i++){
                let t = i / n;
                sx.push(px); sy.push(py);
                let gn = gg - Math.PI/2; nx.push(Math.cos(gn)); ny.push(Math.sin(gn));
                gg -= (VEN_DAO_CONG / n) * (1 + VEN_DAO_HOOK * t * t * 2);
                px += (bL / n) * Math.cos(gg); py += (bL / n) * Math.sin(gg);
            }
            const PH = 0.28, mu = Math.log(0.5) / Math.log(PH);
            let wo = [], wi = [];
            for (let i = 0; i <= n; i++){
                let t = i / n;
                let f = Math.pow(Math.sin(Math.PI * Math.pow(t, mu)), 0.78);
                wo.push(W * f); wi.push(W * 0.055 * f);
            }
            ctx.beginPath();
            ctx.moveTo(sx[0] + nx[0]*wo[0], sy[0] + ny[0]*wo[0]);
            for (let i = 1; i <= n; i++) ctx.lineTo(sx[i] + nx[i]*wo[i], sy[i] + ny[i]*wo[i]);
            for (let i = n; i >= 0; i--) ctx.lineTo(sx[i] - nx[i]*wi[i], sy[i] - ny[i]*wi[i]);
            ctx.closePath();
            ctx.fillStyle = '#08080B'; ctx.globalAlpha = 0.98; ctx.fill();
            ctx.strokeStyle = '#2A2A33'; ctx.lineWidth = 1.4; ctx.stroke();
            ctx.globalAlpha = 0.30; ctx.strokeStyle = '#C8C8D6'; ctx.lineWidth = 1.1;
            for (let v = 1; v <= 3; v++){
                ctx.beginPath();
                for (let i = 0; i <= n; i++){
                    let o = wo[i] * (v / 4.3), X = sx[i] + nx[i]*o, Y = sy[i] + ny[i]*o;
                    i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
                }
                ctx.stroke();
            }
            ctx.globalAlpha = 0.90; ctx.strokeStyle = '#F2F2FA'; ctx.lineWidth = 1.8;
            ctx.beginPath();
            for (let i = 0; i <= n; i++){
                let X = sx[i] - nx[i]*wi[i], Y = sy[i] - ny[i]*wi[i];
                i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
            }
            ctx.stroke(); ctx.globalAlpha = 1;
        }
// PLAYER_PART_END s4.venDaoBan.1

// index.html:62124 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venRoiMut.1 EDITABLE
function venRoiMut(cx, cy, a0, a, dai, k){
            let L = dai * Math.min(1, 0.35 + k * 2.2) * (k > 0.7 ? (1 - (k - 0.7) / 0.3) : 1);
            const n = 12;
            let tre = Math.max(0, 1 - k * 1.6);
            let gg = t => a - (a - a0) * Math.pow(t, 1.5) * tre + Math.sin(t * 4 + frames * 0.35) * 0.05;
            let g1 = gg(1), g0 = gg((n - 1) / n);
            let x1 = cx + L * Math.cos(g1), y1 = cy + L * Math.sin(g1);
            let x0 = cx + L * ((n - 1) / n) * Math.cos(g0), y0 = cy + L * ((n - 1) / n) * Math.sin(g0);
            return [x1, y1, Math.atan2(y1 - y0, x1 - x0), L];
        }
// PLAYER_PART_END s4.venRoiMut.1

// index.html:62135 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venVeDao.1 EDITABLE
function venVeDao(cx, cy, a0, a, dai, k, day){
            let R = dai * 0.62;
            venVeRoi(cx, cy, a0, a, R, k, day);              // than roi: y het don J
            let m = venRoiMut(cx, cy, a0, a, R, k);
            if (m[3] < 5) return;
            ctx.save();
            // Noi TIEP TUYEN voi mut roi: luoi la phan ngon cua chinh cai roi, khong phai
            // mot manh gan vuong goc.
            ctx.translate(m[0], m[1]); ctx.rotate(m[2]);
            venDaoBan(ctx, dai * 0.34 * Math.min(1, k * 3.2));
            ctx.restore();
        }
// PLAYER_PART_END s4.venVeDao.1

// index.html:62149 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venMocDam.1 EDITABLE
function venMocDam(k){
            if (k <= 0 || k >= 1) return 0;
            if (k < 0.30) return Math.pow(k / 0.30, 0.45);
            if (k < 0.55) return 1;
            return Math.pow(1 - (k - 0.55) / 0.45, 1.5);
        }
// PLAYER_PART_END s4.venMocDam.1

// index.html:62157 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venVeMoc.1 EDITABLE
function venVeMoc(bx, by, dir, goc, huong, Rh, Lg0, k, day){
            let g0 = venMocDam(k);
            if (g0 <= 0.01) return;
            /* Ve toan bo trong he "quay mat sang PHAI" roi lat guong bang scale(dir,1). Ban
               truoc toi cong goc bang tay: goc dau 2.39 rad + quay them 2.89 = 5.28 rad, tuc
               huong cuoi la CHECH LEN TROI — dung y bao cao "no choc len troi". Lam kieu nay
               thi huong cuoi bi RANG BUOC bang 0 = thang ve phia truoc, khong lech duoc. */
            const nm = 8;
            let a0 = goc, tong = huong - a0;    // moi gai ket thuc o mot HUONG DAM rieng
            let mx = [], my = [], px = 0, py = 0;
            for (let i = 0; i <= nm; i++){
                mx.push(px); my.push(py);
                let a = a0 + tong * (i / nm);
                px += (Rh / nm) * Math.cos(a); py += (Rh / nm) * Math.sin(a);
            }
            let Lg = Lg0 * g0;
            let rut = (k > 0.55) ? (k - 0.55) / 0.45 : 0;
            ctx.save(); ctx.translate(bx, by); ctx.scale(dir, 1);
            ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            ctx.strokeStyle = '#08080B'; ctx.lineWidth = day * 1.7;
            ctx.beginPath();
            for (let i = 0; i <= nm; i++) i ? ctx.lineTo(mx[i], my[i]) : ctx.moveTo(mx[0], my[0]);
            ctx.stroke();
            ctx.strokeStyle = '#26262E'; ctx.lineWidth = 1.2; ctx.stroke();
            if (Lg > 3){
                const ng = 6;
                let gx = [], gy = [], gw = [], cx0 = mx[nm], cy0 = my[nm], ga = huong;
                for (let i = 0; i <= ng; i++){
                    let t = i / ng;
                    gx.push(cx0); gy.push(cy0); gw.push(day * (1 - t) * 1.05 + 0.35);
                    ga += rut * rut * 0.34;                  // chi cong khi RUT VE
                    cx0 += (Lg / ng) * Math.cos(ga); cy0 += (Lg / ng) * Math.sin(ga);
                }
                let tr = [], du = [];
                for (let i = 0; i <= ng; i++){
                    let dxs = (i < ng ? gx[i+1]-gx[i] : gx[i]-gx[i-1]);
                    let dys = (i < ng ? gy[i+1]-gy[i] : gy[i]-gy[i-1]);
                    let dl = Math.hypot(dxs, dys) || 1;
                    tr.push([gx[i] - dys/dl*gw[i], gy[i] + dxs/dl*gw[i]]);
                    du.push([gx[i] + dys/dl*gw[i], gy[i] - dxs/dl*gw[i]]);
                }
                let tx = gx[ng] + (gx[ng]-gx[ng-1]) * 1.5, ty = gy[ng] + (gy[ng]-gy[ng-1]) * 1.5;
                ctx.beginPath();
                for (let i = 0; i <= ng; i++) i ? ctx.lineTo(tr[i][0], tr[i][1]) : ctx.moveTo(tr[0][0], tr[0][1]);
                ctx.lineTo(tx, ty);
                for (let i = ng; i >= 0; i--) ctx.lineTo(du[i][0], du[i][1]);
                ctx.closePath();
                ctx.fillStyle = '#08080B'; ctx.globalAlpha = 0.98; ctx.fill();
                ctx.strokeStyle = '#2A2A33'; ctx.lineWidth = 1.2; ctx.stroke();
                ctx.globalAlpha = 0.45; ctx.strokeStyle = '#D8D8E4'; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(gx[0], gy[0]); ctx.lineTo(tx, ty); ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.venVeMoc.1

// index.html:62212 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venVeToa.1 EDITABLE
function venVeToa(cx, cy, so, dai, k, day, lech0){
            for (let i = 0; i < so; i++){
                let a = (i / so) * Math.PI * 2 + (lech0 || 0) + Math.sin(frames * 0.1 + i) * 0.06;
                venVeVoi(cx, cy, a, dai * (0.82 + 0.18 * Math.sin(i * 2.3)), k, day);
            }
        }
// PLAYER_PART_END s4.venVeToa.1

// index.html:62219 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venTickTo.1 EDITABLE
function venTickTo(){
            for (let i = venTo.length - 1; i >= 0; i--){
                let T = venTo[i]; T.t++; T.x += T.dir * VEN_TO_TOC;
                if (typeof gdCatHop === 'function' && !(T.chu && T.chu.id !== 1)) gdCatHop({ x: T.x - 8, y: T.y - 8, w: 16, h: 16 });   // @@HE-GATDAN
                if (!T.hit && typeof allTargets === 'function'){
                    let u = Math.min(1, Math.abs(T.x - T.x0) / VEN_TO_XA);
                    let r = 8 + 12 * u;
                    for (let o of allTargets()){
                        if (!o || o.hp === undefined || o.hp <= 0 || o === T.chu) continue;
                        if (!checkAABB({ x: T.x - r, y: T.y - r, w: r * 2, h: r * 2 }, o)) continue;
                        // KHONG gay sat thuong: mo ta goc chi noi "phong to vao ke dich va
                        // lam cham toc do va toc danh". Con so 1 sat thuong la thu toi tu them.
                        T.hit = 1; venCongTang(o.__goc || o);
                        break;
                    }
                }
                if (T.hit || Math.abs(T.x - T.x0) > VEN_TO_XA) venTo.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.venTickTo.1

// index.html:62242 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venNovaGiot.1 EDITABLE
function venNovaGiot(x){
            if (typeof venGiot === 'undefined') return;
            // Khong chong hai manh len cung mot cho: lech nhe cho de nhin ra la nhieu manh.
            let _x = x + (Math.random() * 26 - 13);
            venGiot.push({ x: _x, y: 316, t: 0, den: null,
                           cho: VEN_NOVA_CHO, dmg: VEN_NOVA_DMG, neo: 1 });
            while (venGiot.length > VEN_GIOT_MAX) venGiot.shift();
        }
// PLAYER_PART_END s4.venNovaGiot.1

// index.html:62250 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venTickGiot.1 EDITABLE
function venTickGiot(){
            for (let i = venGiot.length - 1; i >= 0; i--){
                let g = venGiot[i]; g.t++;
                let _cho = g.cho || VEN_GIOT_CHO, _dmg = g.dmg || VEN_GIOT_DMG;
                // `neo` = manh Nova, cam re tai cho. Chi giot cua ult moi bi hut ve theo chu.
                if (!g.neo && typeof dino !== 'undefined' && dino){
                    let d = Math.hypot(g.x - (dino.x + dino.w/2), g.y - (dino.y + dino.h/2));
                    if (d > VEN_GIOT_BK){ venGiot.splice(i, 1); continue; }   // xa vat chu thi bi hut ve
                }
                if (g.t === _cho){
                    let muc = null, bd = 1e9;
                    if (typeof allTargets === 'function') for (let o of allTargets()){
                        if (!o || o.hp === undefined || o.hp <= 0) continue;
                        let dd = Math.hypot((o.x + (o.w||20)/2) - g.x, (o.y + (o.h||20)/2) - g.y);
                        if (dd < bd){ bd = dd; muc = o; }
                    }
                    if (muc && bd < 200){
                        if (typeof dealDamage === 'function') dealDamage(muc, _dmg, 'ammo');
                        else muc.hp -= _dmg;
                        g.den = { x: muc.x + (muc.w||20)/2, y: muc.y + (muc.h||20)/2 };
                    }
                }
                if (g.t > _cho + 18) venGiot.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.venTickGiot.1

// index.html:62276 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venKhoa.1 EDITABLE
function venKhoa(o, khung){
            if (!o) return;
            o._uFreeze = Math.max(o._uFreeze || 0, khung);
            if (o.actionTimer !== undefined) o.actionTimer = Math.max(o.actionTimer || 0, khung);
        }
// PLAYER_PART_END s4.venKhoa.1

// index.html:62282 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venCongTang.1 EDITABLE
function venCongTang(o){
            if (!o || o.hp === undefined || o.hp <= 0) return;
            if ((o._venMien || 0) > 0) return;
            o._venT = Math.min(VEN_TANG_MAX, (o._venT || 0) + 1);
            o._venTT = VEN_TANG_SONG;
            if (typeof floatingTexts !== 'undefined')
                floatingTexts.push(new FloatingText(o.x, o.y - 26, "TƠ " + o._venT + "/" + VEN_TANG_MAX));
            if (o._venT >= VEN_TANG_MAX){
                o._venT = 0; o._venTT = 0; o._venMien = VEN_TROI_MIEN;
                o._venKen = VEN_TROI_T;          // boc kin trong mot cai KEN DEN
                venKhoa(o, VEN_TROI_T);
                floatingTexts.push(new FloatingText(o.x - 10, o.y - 40, "TRÓI!"));
                shakeTimer = Math.max(shakeTimer, 18);
            }
        }
// PLAYER_PART_END s4.venCongTang.1

// index.html:62298 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venVeMang.1 EDITABLE
function venVeMang(o, tang, ken){
            let x = o.x, y = o.y, w = o.w || 20, h = o.h || 20;
            ctx.save();
            if (ken > 0){
                let k = Math.min(1, (VEN_TROI_T - ken) / 12);
                ctx.globalAlpha = 0.88 * k; ctx.fillStyle = '#08080B';
                ctx.beginPath();
                ctx.ellipse(x + w/2, y + h/2, w * 0.72, h * 0.62, 0, 0, 6.28); ctx.fill();
                ctx.globalAlpha = 0.5 * k; ctx.strokeStyle = '#D8D8E4'; ctx.lineWidth = 1.1;
                for (let i = 0; i < 7; i++){
                    let a = (i / 7) * Math.PI * 2;
                    ctx.beginPath();
                    ctx.moveTo(x + w/2, y + h/2);
                    ctx.lineTo(x + w/2 + Math.cos(a) * w * 0.72, y + h/2 + Math.sin(a) * h * 0.62);
                    ctx.stroke();
                }
                for (let r = 1; r <= 3; r++){
                    ctx.beginPath();
                    ctx.ellipse(x + w/2, y + h/2, w*0.72*r/3, h*0.62*r/3, 0, 0, 6.28); ctx.stroke();
                }
            } else if (tang > 0){
                ctx.globalAlpha = 0.28 + tang * 0.16; ctx.strokeStyle = '#101015'; ctx.lineWidth = 2;
                for (let i = 0; i < tang * 3; i++){
                    let a = (i / (tang * 3)) * Math.PI * 2 + i;
                    ctx.beginPath();
                    ctx.moveTo(x + w/2 + Math.cos(a) * w * 0.55, y + h/2 + Math.sin(a) * h * 0.5);
                    ctx.lineTo(x + w/2 - Math.cos(a + 1.1) * w * 0.55, y + h/2 - Math.sin(a + 1.1) * h * 0.5);
                    ctx.stroke();
                }
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.venVeMang.1

// index.html:62331 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venVeMangTatCa.1 EDITABLE
function venVeMangTatCa(){
            if (typeof allTargets !== 'function') return;
            for (let o of allTargets()){
                if (!o || o.hp === undefined || o.hp <= 0) continue;
                let g = o.__goc || o;
                if ((g._venT || 0) > 0 || (g._venKen || 0) > 0) venVeMang(o, g._venT || 0, g._venKen || 0);
            }
        }
// PLAYER_PART_END s4.venVeMangTatCa.1

// index.html:62340 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venTickTang.1 EDITABLE
function venTickTang(){
            if (typeof allTargets !== 'function') return;
            for (let o of allTargets()){
                if (!o) continue;
                let g = o.__goc || o;
                if ((g._venKen || 0) > 0) g._venKen--;
                if ((g._venMien || 0) > 0) g._venMien--;
                if (!(g._venT > 0)) continue;
                if (--g._venTT <= 0){ g._venT = 0; continue; }
                // BOP TOC DANH: moi tang lam dong ho hanh dong cua muc tieu troi cham lai
                if (o.actionTimer !== undefined && (frames % 10) < g._venT) o.actionTimer++;
                if (o.attackCooldown !== undefined && (frames % 10) < g._venT) o.attackCooldown++;
            }
        }
// PLAYER_PART_END s4.venTickTang.1

// index.html:62355 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venTickVung.1 EDITABLE
function venTickVung(){
            venTickTang();
            venTickTo();
            venTickGiot();
            for (let i = venVungs.length - 1; i >= 0; i--){
                let v = venVungs[i]; v.t++;
                if (v.no){
                    v.no++;
                    /* HAI LOI KET KHAC HAN NHAU:
                       - DUNG LEN  -> gai moc len tu vung, gay sat thuong mot lan.
                       - NHAY LEN  -> TROI, NHAC BONG khoi mat dat, roi DAP XUONG. Truoc day
                         toi lam ca hai giong nhau (chi tru mau + khoa) nen cu nhay "khong an
                         thua" — thieu han phan nhac len va dap xuong. */
        // (da xoa: code chet, khong con duong nao chay toi)
                    if (v.no === 8 && typeof allTargets === 'function'){
                        for (let o of allTargets()){
                            if (!o || o.hp === undefined || o.hp <= 0) continue;
                            if (Math.abs((o.x + (o.w || 20) / 2) - v.x) > v.r) continue;
                            o.hp -= VEN_GAI_DMG;
                            // gai dam len thi HAT ke dich len theo
                            if (o.dy !== undefined && o.grounded !== undefined){ o.dy = -12.5; o.grounded = false; }
                            else { let g = o.__goc || o; g._mdDay = { vx: 0, vy: -9, y0: o.y, t: 0 }; }
                        }
                    }
                    if (v.no > 30) venVungs.splice(i, 1);
                    continue;
                }
                if (v.t > VEN_VUNG_SONG) venVungs.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.venTickVung.1

// index.html:62386 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venVeVung.1 EDITABLE
function venVeVung(){
            for (const v of venVungs){
                let k = v.no ? Math.min(1, v.no / 10) : 1;
                ctx.save();
                ctx.globalAlpha = 0.42 * (1 - v.t / VEN_VUNG_SONG) + 0.18;
                ctx.fillStyle = '#0A0A0E';
                ctx.beginPath(); ctx.ellipse(v.x, 318, v.r, 9, 0, 0, 6.28); ctx.fill();
                ctx.globalAlpha = 0.6; ctx.strokeStyle = '#4A4A56'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.ellipse(v.x, 318, v.r, 9, 0, 0, 6.28); ctx.stroke();
                if (v.no){                                   // gai moc len tu vung
                    ctx.globalAlpha = 0.95; ctx.fillStyle = '#111116';
                    for (let g = -v.r; g <= v.r; g += 26){
                        let cao = (34 + Math.abs(Math.sin(g)) * 26) * k;
                        ctx.beginPath();
                        ctx.moveTo(v.x + g - 7, 320); ctx.lineTo(v.x + g, 320 - cao);
                        ctx.lineTo(v.x + g + 7, 320); ctx.closePath(); ctx.fill();
                    }
                }
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.venVeVung.1

// index.html:62421 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_DAO_CONG.1 EDITABLE
const VEN_DAO_CONG = 0.95, VEN_DAO_HOOK = 0.62, VEN_DAO_W = 0.29;
// PLAYER_PART_END s4.VEN_DAO_CONG.1

// index.html:62433 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VEN_TO_XA.1 EDITABLE
const VEN_TO_XA = 560, VEN_TO_TOC = 11;
// PLAYER_PART_END s4.VEN_TO_XA.1

// index.html:62434 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venTo.1 EDITABLE
let venTo = [];
// PLAYER_PART_END s4.venTo.1

// index.html:62435 · Phạm vi: global
// PLAYER_PART_BEGIN s4.venGiot.1 EDITABLE
let venGiot = [];
// PLAYER_PART_END s4.venGiot.1

// index.html:62455 · Phạm vi: Player.prototype
const __Part54 = {
// PLAYER_PART_BEGIN s4.Player.prototype._venDanh.1 EDITABLE
_venDanh(dmg, life, reach, hTop, hBot, cd, ton, fx){
                // CHIEU CUOI: co the bung phat -> moi don DAI HON va NANG HON
                if (this.ultActive && this.ultAmmo === 13){
                    reach = Math.round(reach * VEN_ULT_TAM);
                    if (dmg > 0) dmg += VEN_ULT_CONG;
                    let dr = this.isFacingLeft ? -1 : 1;
                    // Te bao roi XUONG DAT chu khong lo lung tren khong.
                    venGiot.push({ x: this.x + this.w/2 + dr * reach * 0.6, y: 316, t: 0, den: null });
                    while (venGiot.length > VEN_GIOT_MAX) venGiot.shift();
                }
                this.ammo = Math.max(0, this.ammo - (ton === undefined ? 1 : ton));
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 70; }
                let sc = this.getFormScale(), dir = this.isFacingLeft ? -1 : 1;
                this._beginSlash(dmg, life, dir, Math.round(reach * sc), hTop, hBot, 0);
                // Kieu hoat anh do TUNG DON quyet dinh: co don la VUNG (quat roi), co don la
                // DAM XUYEN (xuc tu phong thang). Mac dinh la dam.
                let _R = Math.round(reach * sc), _g0 = dir > 0 ? 0 : Math.PI;
                if (fx && fx.k === 'dao')
                    this.venFx('dao', { a0: _g0 + fx.a0 * dir, a1: _g0 + fx.a1 * dir,
                                        dai: _R, day: fx.day || 9, T: fx.T || 20 });
                else if (fx && fx.k === 'vung')
                    this.venFx('vung', { a0: _g0 + fx.a0 * dir, a1: _g0 + fx.a1 * dir,
                                         dai: _R, day: fx.day || 11, T: fx.T || 20 });
                else if (fx && fx.k === 'chum')
                    for (let q = -1; q <= 1; q++)
                        this.venFx('voi', { ang: _g0 + q * 0.26, dai: _R * (q ? 0.85 : 1), day: 7, T: 18 });
                else
                    this.venFx('voi', { ang: _g0, dai: _R, day: fx && fx.day || 9, T: 18 });
                this.attackCooldown = cd;
                /* CUA SO NOI CHUOI phai DAI HON hoi don, khong thi khong bao gio noi duoc.
                   Ban dau ca hai deu ~25 khung: vua het hoi don de bam tiep thi cua so cung
                   vua dong, nen nhat nao cung tinh la nhat 1 — do duoc chuoi ra 3+3+3 = 9
                   thay vi 3+3+5 = 11. */
                this._venCS = 45;                    // cua so noi chuoi
                /* Chi mo cua so J -> Dash khi cu J nay ra luc DANG DUNG DAT, khong phai luc
                   dang luot. Neu khong thi don Dash -> J cung mo cua so, va nguoi choi bi keo
                   truot them mot doan nua — dung nhu bao cao "sao Dash J cung luot". */
                if (!(typeof dangLuotHoacChop === 'function' && dangLuotHoacChop()))
                    this._venLuotCho = frames;
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(520, 0.08, 'sawtooth', 0.16, 900);
            }
// PLAYER_PART_END s4.Player.prototype._venDanh.1
};

// index.html:62496 · Phạm vi: Player.prototype
const __Part55 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venomSlash.1 EDITABLE
venomSlash(){
                /* J -> Dash -> J : dang trong cu luot xuyen ma bam J = phong gai MOI HUONG.
                   Xet TRUOC hang rao hoi don, vi cu J mo ra cua so luot con dinh 24-34 khung
                   hoi don — de sau thi gan nhu khong bao gio bam kip. */
                if (this._venXuyen && !this.isOverheated && this.ammo > 0){
                    /* Phai dong luon cua so `_venLuotCho`, khong thi `venomTick` thay dashVx
                       van > 2 va lap tuc lap lai mot cu luot xuyen moi (hit Set moi = danh
                       trung lan hai). Do duoc: 3 + 4 = 7 thay vi 3. */
                    this.venBungGai(); this._venXuyen = null; this._venLuotCho = -999;
                    this.attackCooldown = Math.max(this.attackCooldown, 20);
                    return;
                }
                if (this.isOverheated || this.ammo <= 0 || this.attackCooldown > 0) return;
                if (this.grounded && dangLuotHoacChop()){ this.venLuotDam(); return; }
                if (!this.grounded){
                    if (keys['KeyS']) this.venCheXuong();
                    else if (this.y + this.h < 320 - 120) this.venLaoXuong();
                    else this.venBungGai();
                    return;
                }
                if (this.isCrouching || keys['KeyS']){ this.venVungThem(); return; }
                this.venCombo();
            }
// PLAYER_PART_END s4.Player.prototype.venomSlash.1
};

// index.html:62519 · Phạm vi: Player.prototype
const __Part56 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venCombo.1 EDITABLE
venCombo(){
                if ((this._venCS || 0) <= 0) this._venBuoc = 0;
                let b = this._venBuoc || 0;
                // J1 VUNG XUONG · J2 VUNG LEN · J3 thu xuc tu ve roi DAM XUYEN, tam xa hon vung.
                /* Nhat 1 VUNG XUONG, nhat 2 VUNG LEN. Trong game dang chay nguoc lai nen
                   dao chieu hai cung quet o day. */
                if (b === 0)      this._venDanh(VEN_DMG[0], 12, VEN_TAM[0], 10, 26, 24, 1, { k:'vung', a0:0.95, a1:-1.25, day:12 });
                else if (b === 1) this._venDanh(VEN_DMG[1], 12, VEN_TAM[1], 26, 10, 23, 1, { k:'vung', a0:-1.25, a1:0.95, day:12 });
                else              this._venDanh(VEN_DMG[2], 16, VEN_TAM_XIEN, 12, 12, 34, 1, { k:'dam', day:10 });
                this._venBuoc = (b >= 2) ? 0 : b + 1;
                this.clawRiseWindow = 38;
            }
// PLAYER_PART_END s4.Player.prototype.venCombo.1
};

// index.html:62531 · Phạm vi: Player.prototype
const __Part57 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venChemHat.1 EDITABLE
venChemHat(){
                // PHAI BAY LEN theo cu chem, khong phai dung duoi dat chem len troi.
                this.dy = -12.5; this.grounded = false; this.canDoubleJump = true;
                this._venDanh(VEN_HAT_DMG, 16, VEN_HAT_TAM, 46, 8, 30);
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.hp === undefined || o.hp <= 0) continue;
                    if (Math.abs((o.x + (o.w||20)/2) - (this.x + this.w/2)) > VEN_HAT_TAM) continue;
                    if (o.dy !== undefined && o.grounded !== undefined){ o.dy = -13; o.grounded = false; }
                }
                floatingTexts.push(new FloatingText(this.x - 14, this.y - 28, "HẤT"));
            }
// PLAYER_PART_END s4.Player.prototype.venChemHat.1
};

// index.html:62542 · Phạm vi: Player.prototype
const __Part58 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venBungGai.1 EDITABLE
venBungGai(){                       // J tren khong: gai bung MOI PHIA
                this._venDanh(0, 1, 1, 0, 0, 26, 1);
                let cx = this.x + this.w/2, cy = this.y + this.h/2;
                /* Do toi MEP hop cham chu khong toi TAM. Do duoc: dang o tren khong, tam cach
                   tam 122px trong khi ban kinh 120 — hut dung 2px va ra 0 sat thuong, du nguoi
                   choi nhin thay gai bung ngay canh muc tieu. Cung cai bay tam-toi-tam da mac
                   voi don hat cua MIDAS. */
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.hp === undefined || o.hp <= 0) continue;
                    let ox = Math.max(o.x, Math.min(cx, o.x + (o.w || 20)));
                    let oy = Math.max(o.y, Math.min(cy, o.y + (o.h || 20)));
                    if (Math.hypot(ox - cx, oy - cy) < VEN_KHONG_R) o.hp -= VEN_KHONG_DMG;
                }
                this.venFx('toa', { dai: VEN_KHONG_R, so: 11, day: 6, T: 26 });
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(300, 0.14, 'sawtooth', 0.22, 700);
            }
// PLAYER_PART_END s4.Player.prototype.venBungGai.1
};

// index.html:62558 · Phạm vi: Player.prototype
const __Part59 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venCheXuong.1 EDITABLE
venCheXuong(){                      // xuong + J tren khong: che thang xuong
                // Chem xuong cung la dang LUOI DAO, cung mot nang luc voi moc 2.
                this._venDanh(VEN_CHE_DMG, 14, 110, 6, 70, 28, 1, { k:'dao', a0:-0.35, a1:1.45, day:10 });
                if (this.dy < 6) this.dy = 6;
            }
// PLAYER_PART_END s4.Player.prototype.venCheXuong.1
};

// index.html:62563 · Phạm vi: Player.prototype
const __Part60 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venLaoXuong.1 EDITABLE
venLaoXuong(){                      // J tu tren CAO: lao xuong no gai
                this._venDanh(0, 1, 1, 0, 0, 30, 1);
                this.dy = 19; this._venLao = 1;
                if (typeof slamLaoBat === 'function') slamLaoBat(this);   // @@HE-SLAMLAO
                floatingTexts.push(new FloatingText(this.x - 20, this.y - 28, "LAO XUỐNG"));
            }
// PLAYER_PART_END s4.Player.prototype.venLaoXuong.1
};

// index.html:62569 · Phạm vi: Player.prototype
const __Part61 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venLuotDam.1 EDITABLE
venLuotDam(){                       // Dash -> J: moc gai ve phia truoc
                this._venDanh(VEN_LUOT_DMG + (typeof setCanDmg === 'function' ? setCanDmg() : 0), 16, VEN_LUOT_TAM * (typeof setCanTam === 'function' ? setCanTam() : 1), 30, 30, 30, 1, { k:'chum' });
                if (typeof this.setNhuomLuoi === 'function') this.setNhuomLuoi();
                if (typeof setCanApDon === 'function') setCanApDon(this, VEN_LUOT_TAM);
                floatingTexts.push(new FloatingText(this.x - 16, this.y - 28, "GAI"));
            }
// PLAYER_PART_END s4.Player.prototype.venLuotDam.1
};

// index.html:62575 · Phạm vi: Player.prototype
const __Part62 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venVungThem.1 EDITABLE
venVungThem(){                      // cui + J: tao / no rong vung dich
                let cx = this.x + this.w / 2;
                let v = venVungs.find(z => z.chu === this && !z.no && Math.abs(z.x - cx) < 140);
                if (!v){ v = { x: cx, r: VEN_VUNG_R0, t: 0, chu: this, no: 0, kieu: '' }; venVungs.push(v); }
                else v.r = Math.min(VEN_VUNG_MAX, v.r + VEN_VUNG_THEM);
                // KHONG co don choc o day — cui + J chi LAN RONG cai vong duoi chan.
                this.attackCooldown = 22;
                this.ammo = Math.max(0, this.ammo - 1);
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 70; }
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(220, 0.12, 'sine', 0.18, 120);
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.hp === undefined || o.hp <= 0) continue;
                    if (Math.abs((o.x + (o.w||20)/2) - v.x) < v.r && o._venCham === undefined) o._venCham = 1;
                }
            }
// PLAYER_PART_END s4.Player.prototype.venVungThem.1
};

// index.html:62591 · Phạm vi: Player.prototype
const __Part63 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venVungKet.1 EDITABLE
venVungKet(kieu){
                let cx = this.x + this.w / 2;
                let v = venVungs.find(z => z.chu === this && !z.no && Math.abs(z.x - cx) < 240);
                if (!v) return false;
                v.no = 1; v.kieu = kieu;
                shakeTimer = Math.max(shakeTimer, kieu === 'troi' ? 22 : 16);
                floatingTexts.push(new FloatingText(v.x - 26, 250, kieu === 'troi' ? "TRÓI!" : "GAI MỌC!"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(kieu === 'troi' ? 180 : 420, 0.2, 'sawtooth', 0.24, 500);
                return true;
            }
// PLAYER_PART_END s4.Player.prototype.venVungKet.1
};

// index.html:62607 · Phạm vi: Player.prototype
const __Part64 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venVungManh.1 EDITABLE
venVungManh(){
                if (this.isOverheated || this.ammo <= 0 || this.attackCooldown > 0) return;
                // PHONG XUC TU DAM XUYEN — khong phai vung. Manh hon danh thuong 1.
                this._venDanh(VEN_VUNG_DMG, 14, VEN_TAM_XIEN, 14, 14, 30, 1, { k:'dam', day:11 });
            }
// PLAYER_PART_END s4.Player.prototype.venVungManh.1
};

// index.html:62616 · Phạm vi: Player.prototype
const __Part65 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venChemLoLung.1 EDITABLE
venChemLoLung(){
                if (this.isOverheated || this.ammo <= 0) return;
                let N = this.hoverNgam(), reach = 170, hBot = 90;
                if (N && N.o){
                    let o = N.o, cx = this.x + this.w / 2;
                    this.isFacingLeft = N.tx < cx;
                    let ngang = Math.max(0, Math.max(o.x - cx, cx - (o.x + (o.w || 20))));
                    reach = Math.max(130, Math.min(380, ngang + (o.w || 20) * 0.5 + 40));
                    hBot = Math.max(70, Math.min(260, (o.y + (o.h || 20)) - (this.y + this.h) + 10));
                }
                this._venDanh(VEN_VUNG_DMG + 1, 18, reach, 24, hBot, 30, 1, { k:'dao', a0:-1.0, a1:1.35, day:18, T:26 });
                shakeTimer = Math.max(shakeTimer, 10);
                floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, LT("CHÉM LỚN!", "BIG SLASH!")));
            }
// PLAYER_PART_END s4.Player.prototype.venChemLoLung.1
};

// index.html:62630 · Phạm vi: Player.prototype
const __Part66 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venBanTo.1 EDITABLE
venBanTo(){
                let dir = this.isFacingLeft ? -1 : 1, cx = this.x + this.w/2;
                this.attackCooldown = 34; this.ammo = Math.max(0, this.ammo - 1);
                venTo.push({ x: cx + dir*20, y: this.y + this.h*0.45, x0: cx + dir*20,
                             dir: dir, chu: this, t: 0, hit: 0 });
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(700, 0.1, 'sine', 0.16, 1400);
            }
// PLAYER_PART_END s4.Player.prototype.venBanTo.1
};

// index.html:62637 · Phạm vi: Player.prototype
const __Part67 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venChem4.1 EDITABLE
venChem4(){                    // MOC 2 — bon nhat lien tiep truoc mat
                this._venC2 = { n: 0, t: 0 };
                this.attackCooldown = 46; this.ammo = Math.max(0, this.ammo - 1);
                floatingTexts.push(new FloatingText(this.x - 16, this.y - 28, "XÉ!"));
            }
// PLAYER_PART_END s4.Player.prototype.venChem4.1
};

// index.html:62642 · Phạm vi: Player.prototype
const __Part68 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venGaiQuanh.1 EDITABLE
venGaiQuanh(){                 // MOC 3 — gai moc dai ra tu than, moi phia
                this.attackCooldown = 42; this.ammo = Math.max(0, this.ammo - 2);
                let cx = this.x + this.w/2, cy = this.y + this.h/2;
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.hp === undefined || o.hp <= 0) continue;
                    let ox = Math.max(o.x, Math.min(cx, o.x + (o.w||20)));
                    let oy = Math.max(o.y, Math.min(cy, o.y + (o.h||20)));
                    if (Math.hypot(ox-cx, oy-cy) < VEN_C3_R) o.hp -= VEN_C3_DMG;
                }
                this.venFx('toa', { dai: VEN_C3_R, so: 14, day: 8, T: 34 });
                shakeTimer = Math.max(shakeTimer, 20);
                floatingTexts.push(new FloatingText(this.x - 24, this.y - 34, "BÙNG GAI"));
            }
// PLAYER_PART_END s4.Player.prototype.venGaiQuanh.1
};

// index.html:62662 · Phạm vi: Player.prototype
const __Part69 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venTom.1 EDITABLE
venTom(){
                let dir = this.isFacingLeft ? -1 : 1;
                this.ammo = Math.max(0, this.ammo - 2);
                this._venTom = { o: null, t: 0, dir: dir, pha: 'tan' };
                this._venTan = VEN_C4_TAN;            // ghim chan trong luc dung the tan
                this.attackCooldown = VEN_C4_TAN + 6;
                floatingTexts.push(new FloatingText(this.x - 24, this.y - 34, "THẾ TẤN"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(150, 0.16, 'sawtooth', 0.20, 90);
            }
// PLAYER_PART_END s4.Player.prototype.venTom.1
};

// index.html:62672 · Phạm vi: Player.prototype
const __Part70 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venTomBat.1 EDITABLE
venTomBat(dir){
                let mep = dir > 0 ? (this.x + this.w) : this.x;
                let gan = null, dGan = 1e9;
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.hp === undefined || o.hp <= 0) continue;
                    let ol = o.x, orr = o.x + (o.w||20);
                    let d = dir > 0 ? (ol - mep) : (mep - orr);
                    if (d < -20 || d > VEN_C4_TAM) continue;
                    if (Math.abs((o.y + (o.h||20)/2) - (this.y + this.h/2)) > 78) continue;
                    if (d < dGan){ dGan = d; gan = o; }
                }
                return gan;
            }
// PLAYER_PART_END s4.Player.prototype.venTomBat.1
};

// index.html:62685 · Phạm vi: Player.prototype
const __Part71 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venDu.1 EDITABLE
venDu(){                       // nhay thu 3 = DU TO, khong phai nhay
                let dir = keys['KeyA'] ? -1 : (keys['KeyD'] ? 1 : (this.isFacingLeft ? -1 : 1));
                this._venDuDung = 1; this._venDuT = VEN_DU_KHUNG; this._venDuDir = dir;
                this.dy = -11.5; this.grounded = false;
                floatingTexts.push(new FloatingText(this.x - 10, this.y - 26, "ĐU"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880, 0.12, 'sine', 0.16, 1800);
            }
// PLAYER_PART_END s4.Player.prototype.venDu.1
};
