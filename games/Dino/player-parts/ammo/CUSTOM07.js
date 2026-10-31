// PLAYER_FILE: CUSTOM07
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: BIEN_DAY, CUS_NK_DEM, CUS_QN_CM, CUS_QN_NONG, Effect, FloatingText, LT, NK_CHUI, NK_CUA, NK_KHOAN, NK_LEN, NK_NO, NK_RA, NK_TAULEN, NK_THA, SFX, allTargets, bossProjectiles, camX, camY, canvas, checkAABB, ctx, cusChDanh, cusGb, cusGbNha, cusKhoan, cusNkPhim, cusNkTat, cusNkTatSo, cusNkVeMayKhoan, cusNoLonDat, cusNuke, cusPvpDanh, cusQN, cusQNDanh, cusTanChay, cusTl, cusTlNha, cusUfo, cusUfoVe, cusVeTanChay, dino, floatingTexts, frames, gameState, hasRune, mapTheme, pvpDich, shakeTimer, visualEffects
// index.html:67620 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkVeTau.1 EDITABLE
function cusNkVeTau(P, u){
            /* TAU ME. Ban dau toi ve mot hinh thang rong 1500 — chup ra thi hai canh xien
               deu nam TRONG man hinh, nen no doc ra la "mot tam van den nghieng" chu khong
               phai mot con tau. Sua: than tau rong 3600 de hai canh xien luon o NGOAI man,
               nguoi choi chi thay mot DAY TAU phang chay het be ngang — dung y "chi de lo ra
               mot phan". Chi tiet (o vuong, gan doc, den chay, khoang lom) la thu duy nhat
               noi cho nguoi xem biet vat nay to den muc nao. */
            let W = 3600, H = 540;
            let y0 = -1100 + (1 - Math.pow(1 - u, 3)) * 640;    // -1100 -> -460 => day tau -560 -> 80
            let day = y0 + H;
            let x = P.x;
            ctx.save();
            // bong do xuong mat dat: bao het be ngang, cang xuong cang dam
            ctx.globalAlpha = 0.42 * u;
            ctx.fillStyle = "#000000";
            ctx.fillRect(x - W/2, P.dat - 8, W, 10);
            ctx.globalAlpha = 0.18 * u;
            ctx.fillRect(x - W/2, day, W, P.dat - day);
            ctx.globalAlpha = 1;
            // than tau
            let g = ctx.createLinearGradient(0, y0, 0, day);
            g.addColorStop(0, "#1B2428"); g.addColorStop(0.7, "#37474F"); g.addColorStop(1, "#101A1E");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.moveTo(x - W/2, y0); ctx.lineTo(x + W/2, y0);
            ctx.lineTo(x + W/2 - 260, day); ctx.lineTo(x - W/2 + 260, day);
            ctx.closePath(); ctx.fill();
            // gan doc: cot chiu luc chay tu tren xuong day
            ctx.fillStyle = "rgba(0,0,0,0.30)";
            for (let i = -14; i <= 14; i++){
                let gx = x + i * 132;
                ctx.fillRect(gx - 13, day - 210, 26, 210);
            }
            // o vuong / tam op
            ctx.strokeStyle = "rgba(144,180,196,0.22)"; ctx.lineWidth = 2;
            for (let r = 1; r <= 4; r++){
                let yy = day - r * 48;
                ctx.beginPath(); ctx.moveTo(x - W/2 + 40, yy); ctx.lineTo(x + W/2 - 40, yy); ctx.stroke();
            }
            // dai canh bao vang-den sat mep day
            for (let i = -30; i <= 30; i++){
                ctx.fillStyle = (i % 2 === 0) ? "#FBC02D" : "#212121";
                ctx.fillRect(x + i * 60, day - 34, 60, 9);
            }
            // mep day va den chay
            ctx.fillStyle = "#0A1114"; ctx.fillRect(x - W/2, day - 12, W, 12);
            for (let i = -16; i <= 16; i++){
                let bx = x + i * 116, nh = 0.35 + 0.65 * Math.pow(Math.sin(P.t * 0.11 + i * 0.7), 2);
                ctx.fillStyle = "rgba(255,214,79," + nh.toFixed(2) + ")";
                ctx.beginPath(); ctx.arc(bx, day - 6, 5, 0, 6.28); ctx.fill();
                ctx.fillStyle = "rgba(255,214,79," + (nh * 0.22).toFixed(2) + ")";
                ctx.beginPath(); ctx.arc(bx, day - 6, 17, 0, 6.28); ctx.fill();
            }
            // dong co: quang xanh hat xuong o hai ben xa
            for (let i of [-9, -5, 5, 9]){
                let ex = x + i * 150;
                let ge = ctx.createLinearGradient(0, day, 0, day + 120);
                ge.addColorStop(0, "rgba(79,195,247,0.42)"); ge.addColorStop(1, "rgba(79,195,247,0)");
                ctx.fillStyle = ge;
                ctx.beginPath(); ctx.moveTo(ex - 26, day); ctx.lineTo(ex + 26, day);
                ctx.lineTo(ex + 54, day + 120); ctx.lineTo(ex - 54, day + 120); ctx.closePath(); ctx.fill();
            }
            /* CUA KHOANG: mot hoc lom han vao than tau, hai canh truot sang hai ben. */
            let mo = Math.max(0, Math.min(1, (P.t - NK_CUA) / 54));
            let hw = 118, sau = 44;
            ctx.fillStyle = "#05090B";
            ctx.fillRect(x - hw, day - sau, hw * 2, sau);
            if (mo > 0){
                let gl = ctx.createLinearGradient(0, day - sau, 0, day);
                gl.addColorStop(0, "rgba(255,183,77," + (0.85 * mo).toFixed(2) + ")");
                gl.addColorStop(1, "rgba(255,112,67," + (0.30 * mo).toFixed(2) + ")");
                ctx.fillStyle = gl;
                ctx.fillRect(x - hw + 8, day - sau + 6, hw * 2 - 16, sau - 6);
                // luong sang hat xuong dat
                let gs2 = ctx.createLinearGradient(0, day, 0, P.dat);
                gs2.addColorStop(0, "rgba(255,183,77," + (0.28 * mo).toFixed(2) + ")");
                gs2.addColorStop(1, "rgba(255,183,77,0)");
                ctx.fillStyle = gs2;
                ctx.beginPath(); ctx.moveTo(x - hw, day); ctx.lineTo(x + hw, day);
                ctx.lineTo(x + hw + 70, P.dat); ctx.lineTo(x - hw - 70, P.dat); ctx.closePath(); ctx.fill();
            }
            // hai canh cua
            for (let s2 of [-1, 1]){
                let cx0 = (s2 < 0) ? (x - hw - mo * hw) : (x + mo * hw);
                let gc = ctx.createLinearGradient(0, day - sau, 0, day);
                gc.addColorStop(0, "#607D8B"); gc.addColorStop(1, "#37474F");
                ctx.fillStyle = gc; ctx.fillRect(cx0, day - sau, hw, sau);
                ctx.strokeStyle = "#0D1518"; ctx.lineWidth = 3; ctx.strokeRect(cx0, day - sau, hw, sau);
                // van chevron tren canh cua
                ctx.fillStyle = "rgba(255,214,79,0.55)";
                for (let k = 0; k < 3; k++){
                    let px0 = cx0 + 16 + k * 34;
                    ctx.beginPath();
                    ctx.moveTo(px0, day - sau + 10); ctx.lineTo(px0 + 14, day - sau/2);
                    ctx.lineTo(px0, day - 10); ctx.lineTo(px0 + 5, day - sau/2);
                    ctx.closePath(); ctx.fill();
                }
            }
            ctx.restore();
            return day;
        }
// PLAYER_PART_END s4.cusNkVeTau.1

// index.html:67721 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkVeBom.1 EDITABLE
function cusNkVeBom(x, y, t){
            /* Ban dau qua bom co canh duoi va dau tron o tren — tuc no roi BANG DUOI, nguoc
               han voi moi qua bom that. Nay: mui nhon CAM XUONG, canh duoi o TREN, va to
               gap doi cho ra dang mot qua bom nguyen tu chu khong phai mot vien dan. */
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.sin(t * 0.07) * 0.06);
            let R = 30, H = 52;
            // vet gio rit phia sau (o TREN, vi no dang roi xuong)
            ctx.strokeStyle = "rgba(255,255,255,0.20)"; ctx.lineWidth = 3;
            for (let i = -1; i <= 1; i++){
                ctx.beginPath();
                ctx.moveTo(i * 15, -H * 1.75);
                ctx.lineTo(i * 15, -H * 1.75 - 34 - ((t * 3 + i * 11) % 26));
                ctx.stroke();
            }
            // CANH DUOI o tren cung
            ctx.fillStyle = "#455A64"; ctx.strokeStyle = "#1C262B"; ctx.lineWidth = 2;
            for (let d of [-1, 1]){
                ctx.beginPath();
                ctx.moveTo(d * R * 0.62, -H * 0.92);
                ctx.lineTo(d * R * 1.22, -H * 1.58);
                ctx.lineTo(d * R * 0.30, -H * 1.58);
                ctx.lineTo(d * R * 0.22, -H * 0.98);
                ctx.closePath(); ctx.fill(); ctx.stroke();
            }
            ctx.fillStyle = "#546E7A";
            ctx.beginPath();
            ctx.moveTo(-7, -H * 0.95); ctx.lineTo(-7, -H * 1.62);
            ctx.lineTo(7, -H * 1.62); ctx.lineTo(7, -H * 0.95);
            ctx.closePath(); ctx.fill(); ctx.stroke();
            // vanh dai noi canh voi than
            ctx.fillStyle = "#37474F";
            ctx.fillRect(-R * 0.66, -H * 1.02, R * 1.32, 9);
            ctx.strokeRect(-R * 0.66, -H * 1.02, R * 1.32, 9);
            // THAN: dinh tron, suon thang, mui nhon huong XUONG
            let g = ctx.createLinearGradient(-R, 0, R, 0);
            g.addColorStop(0, "#2E3B41"); g.addColorStop(0.40, "#B0BEC5");
            g.addColorStop(0.62, "#90A4AE"); g.addColorStop(1, "#37474F");
            ctx.beginPath();
            ctx.moveTo(-R, -H * 0.50);
            ctx.lineTo(-R, H * 0.18);
            ctx.quadraticCurveTo(-R * 0.94, H * 0.80, 0, H + 30);
            ctx.quadraticCurveTo(R * 0.94, H * 0.80, R, H * 0.18);
            ctx.lineTo(R, -H * 0.50);
            ctx.quadraticCurveTo(R * 0.86, -H * 0.98, 0, -H * 0.98);
            ctx.quadraticCurveTo(-R * 0.86, -H * 0.98, -R, -H * 0.50);
            ctx.closePath();
            ctx.fillStyle = g; ctx.fill();
            ctx.strokeStyle = "#141A1D"; ctx.lineWidth = 3; ctx.stroke();
            // hai dai do canh bao
            ctx.fillStyle = "#E53935";
            ctx.fillRect(-R * 0.99, -H * 0.30, R * 1.98, 12);
            ctx.fillRect(-R * 0.99, -H * 0.02, R * 1.98, 7);
            // bien phong xa tren than
            ctx.fillStyle = "#FFD54F";
            ctx.beginPath(); ctx.arc(-R * 0.12, H * 0.30, 3.6, 0, 6.28); ctx.fill();
            for (let a = 0; a < 3; a++){
                ctx.beginPath();
                ctx.arc(-R * 0.12, H * 0.30, 12, a * 2.094 - 0.5, a * 2.094 + 0.5);
                ctx.arc(-R * 0.12, H * 0.30, 5.2, a * 2.094 + 0.5, a * 2.094 - 0.5, true);
                ctx.closePath(); ctx.fill();
            }
            // dinh tan doc than + anh sang doc suon trai
            ctx.fillStyle = "rgba(0,0,0,0.35)";
            for (let i = 0; i < 5; i++) ctx.fillRect(R * 0.52, -H * 0.62 + i * 15, 4, 4);
            ctx.globalAlpha = 0.30; ctx.fillStyle = "#FFFFFF";
            ctx.beginPath(); ctx.ellipse(-R * 0.42, -H * 0.10, 5, H * 0.52, 0, 0, 6.28); ctx.fill();
            ctx.globalAlpha = 1;
            ctx.restore();
        }
// PLAYER_PART_END s4.cusNkVeBom.1

// index.html:67793 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkVe.1 EDITABLE
function cusNkVe(){
            if (cusKhoan) cusNkVeMayKhoan(cusKhoan.x, cusKhoan.y, cusKhoan.t, 1.35);
            let P = cusNkPhim; if (!P) return;
            let t = P.t;
            // ---- may khoan cua nguoi choi ----
            if (t >= NK_KHOAN && t < NK_RA){
                /* Ban dau toi cho no lun ngay tu khung dau: chup ra chi thay mot manh kim
                   loai 9px roi mat hut, khong ai kip nhan ra do la cai may khoan. Gio no
                   DUNG TREN MAT DAT 34 khung cho mui khoan quay da roi moi lun. */
                let sau;                                  // 0 = con nguyen tren mat dat, 1 = mat hut
                if (t < NK_KHOAN + 34) sau = 0;
                else if (t < NK_CHUI) sau = Math.min(1, (t - NK_KHOAN - 34) / (NK_CHUI - NK_KHOAN - 34));
                else if (t < NK_LEN) sau = 1;
                else sau = Math.max(0, 1 - (t - NK_LEN) / (NK_RA - NK_LEN));
                /* Luc `sau = 0` phai thay CA cai may — ke ca mui khoan — nam tren mat dat.
                   Ban truoc toi de goc may ngay tai duong dat, ma phan duoi duong dat thi bi
                   cat, nen mui non bien mat sach: chup ra chi con mot cai ONG BO co nap,
                   khong ai doc ra do la may khoan. Gio dat mui cham dat roi moi lun. */
                let LK = 34 * 1.35;
                let ky = (P.dat - LK) + sau * (LK + 74);
                ctx.save();
                ctx.beginPath(); ctx.rect(-4000, -4000, 9000, 4000 + P.dat + 4); ctx.clip();   // khong ve phan duoi dat
                cusNkVeMayKhoan(P.nguoiX + 16, ky, t, 1.35);
                ctx.restore();
                // DAT VAN LEN — hat cat that, khong dung Effect('explosion'): quả cầu lửa cam
                // doc ra la mot vu no, trong khi day chi la dang khoan dat.
                if (!P.bui) P.bui = [];
                if (sau > 0 && sau < 1 && t % 2 === 0)
                    for (let q = 0; q < 3; q++)
                        P.bui.push({ x: P.nguoiX + 16 + (Math.random()-0.5)*26, y: P.dat - 2,
                                     vx: (Math.random()-0.5)*4.6, vy: -2.2 - Math.random()*3.4,
                                     t: 0, s: 2 + Math.random()*3 });
                if (P.bui) for (let q = P.bui.length - 1; q >= 0; q--){
                    let b = P.bui[q]; b.t++; b.x += b.vx; b.y += b.vy; b.vy += 0.30;
                    if (b.y > P.dat || b.t > 70){ P.bui.splice(q, 1); continue; }
                    ctx.fillStyle = (b.t % 3 === 0) ? "#8D6E63" : "#A1887F";
                    ctx.fillRect(b.x, b.y, b.s, b.s);
                }
                // mieng ho
                ctx.save();
                ctx.fillStyle = "#3E2723";
                ctx.beginPath(); ctx.ellipse(P.nguoiX + 16, P.dat, 26, 7, 0, 0, 6.28); ctx.fill();
                ctx.restore();
            }
            // ---- tau me ----
            if (t < NK_TAULEN + 120){
                let u = Math.min(1, t / 120);
                if (t > NK_TAULEN) u = Math.max(0, 1 - (t - NK_TAULEN) / 120);
                if (u > 0){ P._dayTau = cusNkVeTau(P, u); }
            }
            // ---- qua bom roi ----
            if (t >= NK_THA && t < NK_NO){
                let u = (t - NK_THA) / (NK_NO - NK_THA);
                let y0 = (P._dayTau || 120) - 10;
                let by = y0 + (P.dat - 84 - y0) * (u * u);   // +84 = tu tam ra toi mui bom
                cusNkVeBom(P.x, by, t);
            }
            // ---- vu no + nam may ----
            if (P.no){
                let e = t - NK_NO;
                ctx.save();
                // qua cau lua
                if (e < 60){
                    let r = 40 + e * 16;
                    let g = ctx.createRadialGradient(P.x, P.dat - 40, 0, P.x, P.dat - 40, r);
                    g.addColorStop(0, "rgba(255,255,255,0.95)");
                    g.addColorStop(0.35, "rgba(255,213,79,0.85)");
                    g.addColorStop(0.7, "rgba(255,87,34,0.55)");
                    g.addColorStop(1, "rgba(120,30,10,0)");
                    ctx.fillStyle = g;
                    ctx.beginPath(); ctx.arc(P.x, P.dat - 40, r, 0, 6.28); ctx.fill();
                }
                // cot khoi + nam may boc len
                let k = Math.min(1, e / 150);
                let capY = P.dat - 60 - k * 300;
                // phai tan HET truoc khi doan phim ket thuc, neu khong no bien mat dot ngot
                // dung khung tra lai quyen dieu khien.
                ctx.globalAlpha = 0.88 * Math.max(0, 1 - Math.max(0, (e - 66) / 96));
                ctx.fillStyle = "#6D4C41";
                ctx.beginPath();
                ctx.moveTo(P.x - 34, P.dat);
                ctx.lineTo(P.x - 22 - k * 14, capY + 40);
                ctx.lineTo(P.x + 22 + k * 14, capY + 40);
                ctx.lineTo(P.x + 34, P.dat);
                ctx.closePath(); ctx.fill();
                let cr = 40 + k * 130;
                let g2 = ctx.createRadialGradient(P.x, capY, cr * 0.2, P.x, capY, cr);
                g2.addColorStop(0, "rgba(255,204,128,0.95)");
                g2.addColorStop(0.5, "rgba(141,110,99,0.9)");
                g2.addColorStop(1, "rgba(62,39,35,0.55)");
                ctx.fillStyle = g2;
                ctx.beginPath(); ctx.ellipse(P.x, capY, cr, cr * 0.62, 0, 0, 6.28); ctx.fill();
                // vanh soc ngang
                ctx.strokeStyle = "rgba(255,224,178,0.35)"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.ellipse(P.x, capY + cr * 0.45, cr * 1.15, cr * 0.20, 0, 0, 6.28); ctx.stroke();
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.cusNkVe.1

// index.html:67897 · Phạm vi: global
// PLAYER_PART_BEGIN s4.NK_SEG.1 EDITABLE
const NK_SEG = {
            0:'abcdef', 1:'bc', 2:'abged', 3:'abgcd', 4:'fgbc',
            5:'afgcd', 6:'afgecd', 7:'abc', 8:'abcdefg', 9:'abcdfg'
        };
// PLAYER_PART_END s4.NK_SEG.1

// index.html:67901 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkThanhNgang.1 EDITABLE
function cusNkThanhNgang(x, y, L, t){
            ctx.beginPath();
            ctx.moveTo(x, y); ctx.lineTo(x + t*0.55, y - t/2); ctx.lineTo(x + L - t*0.55, y - t/2);
            ctx.lineTo(x + L, y); ctx.lineTo(x + L - t*0.55, y + t/2); ctx.lineTo(x + t*0.55, y + t/2);
            ctx.closePath(); ctx.fill();
        }
// PLAYER_PART_END s4.cusNkThanhNgang.1

// index.html:67907 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkThanhDoc.1 EDITABLE
function cusNkThanhDoc(x, y, L, t){
            ctx.beginPath();
            ctx.moveTo(x, y); ctx.lineTo(x + t/2, y + t*0.55); ctx.lineTo(x + t/2, y + L - t*0.55);
            ctx.lineTo(x, y + L); ctx.lineTo(x - t/2, y + L - t*0.55); ctx.lineTo(x - t/2, y + t*0.55);
            ctx.closePath(); ctx.fill();
        }
// PLAYER_PART_END s4.cusNkThanhDoc.1

// index.html:67913 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkVeSo.1 EDITABLE
function cusNkVeSo(x, y, W, H, so, mau, mo){
            let t = Math.max(4, W * 0.20), k = t * 0.62, n = (so === null) ? '' : (NK_SEG[so] || '');
            const co = (c) => n.indexOf(c) >= 0;
            const dat = (c) => {
                ctx.globalAlpha = co(c) ? mo : mo * 0.10;
                ctx.fillStyle = co(c) ? mau : "#1A1D20";
            };
            ctx.save();
            ctx.shadowColor = mau; ctx.shadowBlur = 0;
            dat('a'); if (co('a')) ctx.shadowBlur = 16; cusNkThanhNgang(x + k, y, W - k*2, t);
            ctx.shadowBlur = 0;
            dat('g'); if (co('g')) ctx.shadowBlur = 16; cusNkThanhNgang(x + k, y + H/2, W - k*2, t);
            ctx.shadowBlur = 0;
            dat('d'); if (co('d')) ctx.shadowBlur = 16; cusNkThanhNgang(x + k, y + H, W - k*2, t);
            ctx.shadowBlur = 0;
            dat('f'); if (co('f')) ctx.shadowBlur = 16; cusNkThanhDoc(x, y + k, H/2 - k*2, t);
            ctx.shadowBlur = 0;
            dat('b'); if (co('b')) ctx.shadowBlur = 16; cusNkThanhDoc(x + W, y + k, H/2 - k*2, t);
            ctx.shadowBlur = 0;
            dat('e'); if (co('e')) ctx.shadowBlur = 16; cusNkThanhDoc(x, y + H/2 + k, H/2 - k*2, t);
            ctx.shadowBlur = 0;
            dat('c'); if (co('c')) ctx.shadowBlur = 16; cusNkThanhDoc(x + W, y + H/2 + k, H/2 - k*2, t);
            ctx.restore();
        }
// PLAYER_PART_END s4.cusNkVeSo.1

// index.html:67937 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkVeDem.1 EDITABLE
function cusNkVeDem(){
            let N = (typeof cusNuke !== 'undefined') ? cusNuke : null;
            let tat = (typeof cusNkTat !== 'undefined') ? cusNkTat : 0;
            if (!N && tat <= 0) return;
            let giay = N ? Math.max(0, CUS_NK_DEM - N.t) / 60 : (cusNkTatSo || 0);
            let s10 = Math.floor(giay / 10) % 10, s1 = Math.floor(giay) % 10, sp = Math.floor(giay * 10) % 10;
            let gap = N ? Math.min(1, N.t / 14) : (tat / 22);          // hien dan ra / mo dan di
            let huy = !N;
            let nguy = !huy && giay <= 3.001;
            let mau = huy ? "#FF1744" : (nguy ? "#FF3D00" : "#FFB300");
            // nhip GIAT mot cai moi giay — dong ho may nhay so chu khong truot
            let nhay = N ? Math.max(0, 1 - (N.t % 60) / 9) : 0;
            let sc = 1 + nhay * 0.055;

            let W = 330, H = 168;
            let cx = canvas.width / 2, cy = 212;
            ctx.save();
            ctx.globalAlpha = gap;
            ctx.translate(cx, cy); ctx.scale(sc, sc); ctx.translate(-cx, -cy);
            let bx = cx - W/2, by = cy - H/2;
            // vo may: tam thep co vat mep
            let gv = ctx.createLinearGradient(0, by, 0, by + H);
            gv.addColorStop(0, "#455A64"); gv.addColorStop(0.10, "#263238");
            gv.addColorStop(0.92, "#1A2227"); gv.addColorStop(1, "#0C1114");
            ctx.fillStyle = gv;
            ctx.beginPath(); ctx.rect(bx, by, W, H); ctx.fill();
            ctx.strokeStyle = "#0A0E10"; ctx.lineWidth = 4; ctx.strokeRect(bx, by, W, H);
            ctx.strokeStyle = "rgba(176,190,197,0.35)"; ctx.lineWidth = 1.5;
            ctx.strokeRect(bx + 4, by + 4, W - 8, H - 8);
            // dinh tan bon goc
            for (let dx of [14, W - 14]) for (let dy of [14, H - 14]){
                ctx.fillStyle = "#78909C";
                ctx.beginPath(); ctx.arc(bx + dx, by + dy, 4.5, 0, 6.28); ctx.fill();
                ctx.fillStyle = "#2E3B41";
                ctx.beginPath(); ctx.arc(bx + dx, by + dy, 2, 0, 6.28); ctx.fill();
            }
            // dai canh bao vang-den o mep tren
            for (let i = 0; i < 13; i++){
                ctx.fillStyle = (i % 2 === 0) ? (nguy || huy ? "#FF3D00" : "#FBC02D") : "#141A1D";
                ctx.fillRect(bx + 28 + i * 21, by + 9, 21, 7);
            }
            // mat kinh den
            let mx = bx + 30, my = by + 30, mw = W - 60, mh = H - 62;
            ctx.fillStyle = "#0A0D0F"; ctx.fillRect(mx, my, mw, mh);
            ctx.strokeStyle = "#000"; ctx.lineWidth = 2; ctx.strokeRect(mx, my, mw, mh);
            // ba chu so: hai so GIAY to + mot so PHAN MUOI nho
            let DW = 46, DH = 76;
            let x0 = mx + 26, y0 = my + 14;
            cusNkVeSo(x0,           y0, DW, DH, s10, mau, 1);
            cusNkVeSo(x0 + DW + 34, y0, DW, DH, s1,  mau, 1);
            // dau cham ngan cach, nhap theo nhip giay
            ctx.globalAlpha = 0.35 + 0.65 * (N ? Math.pow(Math.sin(N.t * 0.105), 2) : 0);
            ctx.fillStyle = mau;
            ctx.beginPath(); ctx.arc(x0 + DW*2 + 52, y0 + DH + 2, 5, 0, 6.28); ctx.fill();
            ctx.globalAlpha = 1;
            cusNkVeSo(x0 + DW*2 + 66, y0 + DH*0.34, DW*0.60, DH*0.62, sp, mau, 0.92);
            // thanh 10 o vuong dem so giay da tieu
            let tieu = 10 - Math.ceil(giay - 0.0001);
            for (let i = 0; i < 10; i++){
                let sx = mx + 10 + i * ((mw - 20) / 10), sw = (mw - 20) / 10 - 4;
                ctx.fillStyle = (i < tieu) ? mau : "rgba(255,255,255,0.09)";
                ctx.globalAlpha = (i < tieu) ? 0.85 : 1;
                ctx.fillRect(sx, my + mh - 12, sw, 6);
            }
            ctx.globalAlpha = 1;
            // vach quet ngang tren mat kinh
            ctx.globalAlpha = 0.16;
            ctx.fillStyle = "#000";
            for (let yy = my; yy < my + mh; yy += 4) ctx.fillRect(mx, yy, mw, 2);
            ctx.globalAlpha = 1;
            // hai bien phong xa hai ben
            ctx.fillStyle = huy ? "#FF1744" : (nguy ? "#FF3D00" : "#FFB300");
            ctx.globalAlpha = 0.85;
            for (let s2 of [-1, 1]){
                let tx = cx + s2 * (W/2 - 17), ty = by + H - 18;
                ctx.save(); ctx.translate(tx, ty);
                ctx.beginPath(); ctx.arc(0, 0, 3.2, 0, 6.28); ctx.fill();
                for (let a = 0; a < 3; a++){
                    ctx.beginPath();
                    ctx.arc(0, 0, 10.5, a * 2.094 - 0.52 + (N ? N.t * 0.02 : 0), a * 2.094 + 0.52 + (N ? N.t * 0.02 : 0));
                    ctx.arc(0, 0, 4.6, a * 2.094 + 0.52 + (N ? N.t * 0.02 : 0), a * 2.094 - 0.52 + (N ? N.t * 0.02 : 0), true);
                    ctx.closePath(); ctx.fill();
                }
                ctx.restore();
            }
            ctx.globalAlpha = 1;
            // dong chu nho duoi day vo may
            ctx.textAlign = "center";
            ctx.font = "bold 11px Consolas, monospace";
            ctx.fillStyle = huy ? "#FF8A80" : "rgba(176,190,197,0.75)";
            ctx.fillText(huy ? LT("ĐÃ HUỶ","ABORTED") : LT("BOM NGUYÊN TỬ — ĐANG DẪN BẮN","NUKE — GUIDANCE LOCKED"),
                         cx, by + H - 14);
            ctx.textAlign = "left";
            ctx.restore();
        }
// PLAYER_PART_END s4.cusNkVeDem.1

// index.html:68033 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkVeMan.1 EDITABLE
function cusNkVeMan(){
            cusNkVeDem();
            let P = cusNkPhim; if (!P || !P.chop) return;
            let e = P.chop;
            let a = e <= 4 ? 1 : Math.max(0, 1 - (e - 4) / 46);
            if (a <= 0) return;
            ctx.save();
            ctx.globalAlpha = a; ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }
// PLAYER_PART_END s4.cusNkVeMan.1

// index.html:68052 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_MT_NHIP.1 EDITABLE
const CUS_MT_NHIP = 60;
// PLAYER_PART_END s4.CUS_MT_NHIP.1

// index.html:68053 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_MT_THEM.1 EDITABLE
const CUS_MT_THEM = 4;
// PLAYER_PART_END s4.CUS_MT_THEM.1

// index.html:68054 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_MT_TRAN.1 EDITABLE
const CUS_MT_TRAN = 80;
// PLAYER_PART_END s4.CUS_MT_TRAN.1

// index.html:68055 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_MT_DMG.1 EDITABLE
const CUS_MT_DMG  = 2;
// PLAYER_PART_END s4.CUS_MT_DMG.1

// index.html:68059 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_MT_MOC.1 EDITABLE
const CUS_MT_MOC  = 20;
// PLAYER_PART_END s4.CUS_MT_MOC.1

// index.html:68060 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_MT_GIAM.1 EDITABLE
const CUS_MT_GIAM = 6;
// PLAYER_PART_END s4.CUS_MT_GIAM.1

// index.html:68061 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_MT_MIN.1 EDITABLE
const CUS_MT_MIN  = 6;
// PLAYER_PART_END s4.CUS_MT_MIN.1

// index.html:68062 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMt.1 EDITABLE
let cusMt = null;
// PLAYER_PART_END s4.cusMt.1

// index.html:68063 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMtTen.1 EDITABLE
let cusMtTen = [];
// PLAYER_PART_END s4.cusMtTen.1

// index.html:68064 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMtVao.1 EDITABLE
function cusMtVao(ng){
            cusMt = { t: 0, dot: 0, giu: true, nhip: CUS_MT_NHIP };
            floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 34, LT("MƯA TÊN!", "ARROW RAIN!")));
            cusMtDot();
        }
// PLAYER_PART_END s4.cusMtVao.1

// index.html:68069 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMtBay.1 EDITABLE
function cusMtBay(){ let n = 0; for (let a of cusMtTen) if (!a.cam) n++; return n; }
// PLAYER_PART_END s4.cusMtBay.1

// index.html:68070 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMtDot.1 EDITABLE
function cusMtDot(){
            let M = cusMt; if (!M) return;
            M.dot++;
            let muon = CUS_MT_THEM * M.dot, cho = Math.max(0, CUS_MT_TRAN - cusMtBay()), n = Math.min(muon, cho);
            let x0 = (typeof camX === 'number') ? camX : 0, y0 = (typeof camY === 'number') ? camY : 0;
            let W = canvas.width;
            for (let i = 0; i < n; i++){
                // rai DEU ngang man (chia o roi lech ngau nhien trong o) de khong don cuc
                let x = x0 + (i + Math.random()) * (W / n);
                let vx = (Math.random() - 0.5) * 5;                    // nghieng / cheo mot chut
                let vy = 9 + Math.random() * 3;
                cusMtTen.push({ x: x - vx * 30, y: y0 - 30 - Math.random() * 140, vx: vx, vy: vy, cam: 0, trung: false });
            }
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900, 0.08, 'triangle', 0.08, 500);
        }
// PLAYER_PART_END s4.cusMtDot.1

// index.html:68085 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMtGiu.1 EDITABLE
function cusMtGiu(ng){   // goi moi khung dang giu K
            let M = cusMt; if (!M || !M.giu) return;
            M.t++;
            if (M.t >= M.nhip){
                M.t = 0; cusMtDot();
                if (CUS_MT_THEM * M.dot >= CUS_MT_MOC) M.nhip = Math.max(CUS_MT_MIN, M.nhip - CUS_MT_GIAM);
            }
        }
// PLAYER_PART_END s4.cusMtGiu.1

// index.html:68093 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMtNha.1 EDITABLE
function cusMtNha(){ if (cusMt){ cusMt.giu = false; cusMt = null; } }
// PLAYER_PART_END s4.cusMtNha.1

// index.html:68094 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMtTick.1 EDITABLE
function cusMtTick(){
            if (!cusMtTen.length) return;
            let ds = null;
            let day = (typeof mapTheme !== 'undefined' && mapTheme === 'ocean' && typeof BIEN_DAY !== 'undefined') ? BIEN_DAY : 320;
            let duoi = ((typeof camY === 'number') ? camY : 0) + canvas.height + 60;
            for (let i = cusMtTen.length - 1; i >= 0; i--){
                let a = cusMtTen[i];
                if (a.cam){ if (++a.cam > 40) cusMtTen.splice(i, 1); continue; }
                let x0 = a.x, y0 = a.y;
                a.x += a.vx; a.y += a.vy; a.vy = Math.min(16, a.vy + 0.12);
                // mui ten: va cham theo DOAN vua bay (khong lot qua con nho khi roi nhanh)
                if (ds === null){
                    if (gameState === 'pvp'){ let d = (typeof pvpDich === 'function' && typeof dino !== 'undefined') ? pvpDich(dino) : null; ds = d ? [d] : []; }
                    else ds = (typeof allTargets === 'function') ? allTargets() : [];
                }
                let hop = { x: Math.min(x0, a.x) - 3, y: Math.min(y0, a.y), w: Math.abs(a.x - x0) + 6, h: Math.abs(a.y - y0) + 4 };
                let trung = null;
                for (let o of ds){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (checkAABB(hop, o)){ trung = o; break; }
                }
                if (trung){
                    cusChDanh(trung, CUS_MT_DMG);   // @@HE-CUSCHHU
                    visualEffects.push(new Effect(a.x, a.y, 'parry'));
                    cusMtTen.splice(i, 1); continue;
                }
                if (a.y >= day){ a.y = day; a.cam = 1; continue; }         // cam xuong dat
                if (a.y > duoi) cusMtTen.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.cusMtTick.1

// index.html:68124 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMtVe.1 EDITABLE
function cusMtVe(){
            if (!cusMtTen.length) return;
            ctx.save();
            for (let a of cusMtTen){
                let goc = Math.atan2(a.vy, a.vx);
                ctx.save(); ctx.translate(a.x, a.y); ctx.rotate(goc);
                if (a.cam) ctx.globalAlpha = Math.max(0, 1 - a.cam / 40);
                else { ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-30, 0); ctx.stroke(); }
                ctx.strokeStyle = "#6D4C41"; ctx.lineWidth = 2.2;
                ctx.beginPath(); ctx.moveTo(-28, 0); ctx.lineTo(a.cam ? -4 : 0, 0); ctx.stroke();       // than ten (cam dat thi lut mot doan)
                if (!a.cam){
                    ctx.fillStyle = "#B0BEC5"; ctx.beginPath(); ctx.moveTo(0, -3.5); ctx.lineTo(8, 0); ctx.lineTo(0, 3.5); ctx.closePath(); ctx.fill();
                }
                ctx.fillStyle = "#E53935";
                ctx.beginPath(); ctx.moveTo(-28, 0); ctx.lineTo(-34, -4); ctx.lineTo(-24, 0); ctx.lineTo(-34, 4); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FAFAFA"; ctx.fillRect(-26, -1, 4, 2);
                ctx.restore();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cusMtVe.1

// index.html:68165 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_VAO.1 EDITABLE
const CUS_UZ_VAO   = 300;
// PLAYER_PART_END s4.CUS_UZ_VAO.1

// index.html:68166 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_THA.1 EDITABLE
const CUS_UZ_THA   = 120;
// PLAYER_PART_END s4.CUS_UZ_THA.1

// index.html:68167 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_NO.1 EDITABLE
const CUS_UZ_NO    = CUS_UZ_VAO + CUS_UZ_THA;
// PLAYER_PART_END s4.CUS_UZ_NO.1

// index.html:68168 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_TAY.1 EDITABLE
const CUS_UZ_TAY   = 5;
// PLAYER_PART_END s4.CUS_UZ_TAY.1

// index.html:68169 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_DMG.1 EDITABLE
const CUS_UZ_DMG   = 2;
// PLAYER_PART_END s4.CUS_UZ_DMG.1

// index.html:68170 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_CACH.1 EDITABLE
const CUS_UZ_CACH  = 2;
// PLAYER_PART_END s4.CUS_UZ_CACH.1

// index.html:68171 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_TOC.1 EDITABLE
const CUS_UZ_TOC   = 2;
// PLAYER_PART_END s4.CUS_UZ_TOC.1

// index.html:68172 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_QUAY.1 EDITABLE
const CUS_UZ_QUAY  = 3.2;
// PLAYER_PART_END s4.CUS_UZ_QUAY.1

// index.html:68173 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_CHAM.1 EDITABLE
const CUS_UZ_CHAM  = 0.45;
// PLAYER_PART_END s4.CUS_UZ_CHAM.1

// index.html:68174 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_CUON.1 EDITABLE
const CUS_UZ_CUON  = -0.55;
// PLAYER_PART_END s4.CUS_UZ_CUON.1

// index.html:68181 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_THEM.1 EDITABLE
const CUS_UZ_THEM  = 600;
// PLAYER_PART_END s4.CUS_UZ_THEM.1

// index.html:68182 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_HUT.1 EDITABLE
const CUS_UZ_HUT   = CUS_UZ_VAO;
// PLAYER_PART_END s4.CUS_UZ_HUT.1

// index.html:68183 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_UZ_HUTR.1 EDITABLE
const CUS_UZ_HUTR  = 34;
// PLAYER_PART_END s4.CUS_UZ_HUTR.1

// index.html:68184 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzu.1 EDITABLE
let cusUzu = null;
// PLAYER_PART_END s4.cusUzu.1

// index.html:68185 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzDan.1 EDITABLE
let cusUzDan = [[], [], [], [], []];
// PLAYER_PART_END s4.cusUzDan.1

// index.html:68186 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzA.1 EDITABLE
let cusUzA = 0;
// PLAYER_PART_END s4.cusUzA.1

// index.html:68187 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzBang.1 EDITABLE
let cusUzBang = null;
// PLAYER_PART_END s4.cusUzBang.1

// index.html:68188 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzCm.1 EDITABLE
function cusUzCm(){ return canvas.width / 23; }
// PLAYER_PART_END s4.cusUzCm.1

// index.html:68189 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzTam.1 EDITABLE
function cusUzTam(){
            return { x: ((typeof camX === 'number') ? camX : 0) + canvas.width / 2,
                     y: ((typeof camY === 'number') ? camY : 0) + canvas.height / 2 };
        }
// PLAYER_PART_END s4.cusUzTam.1

// index.html:68193 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzRmax.1 EDITABLE
function cusUzRmax(){ return Math.hypot(canvas.width / 2, canvas.height / 2) + 40; }
// PLAYER_PART_END s4.cusUzRmax.1

// index.html:68194 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzK.1 EDITABLE
function cusUzK(){ return CUS_UZ_CUON / cusUzCm(); }
// PLAYER_PART_END s4.cusUzK.1

// index.html:68195 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzViTri.1 EDITABLE
function cusUzViTri(k, r, T){
            let g = k * Math.PI * 2 / CUS_UZ_TAY + cusUzA + cusUzK() * r;
            return { x: T.x + Math.cos(g) * r, y: T.y + Math.sin(g) * r };
        }
// PLAYER_PART_END s4.cusUzViTri.1

// index.html:68200 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzLapBang.1 EDITABLE
function cusUzLapBang(){
            let k = Math.abs(cusUzK()), R = cusUzRmax() + 60, bang = [0], s = 0;
            for (let r = 4; r <= R; r += 4){ s += 4 * Math.sqrt(1 + (k * (r - 2)) * (k * (r - 2))); bang.push(s); }
            cusUzBang = bang; return bang;
        }
// PLAYER_PART_END s4.cusUzLapBang.1

// index.html:68205 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzRTuCung.1 EDITABLE
function cusUzRTuCung(u){
            let b = cusUzBang || cusUzLapBang();
            if (u <= 0) return 0;
            let lo = 0, hi = b.length - 1;
            if (u >= b[hi]) return hi * 4;
            while (hi - lo > 1){ let m = (lo + hi) >> 1; if (b[m] < u) lo = m; else hi = m; }
            return (lo + (u - b[lo]) / Math.max(1e-6, b[hi] - b[lo])) * 4;
        }
// PLAYER_PART_END s4.cusUzRTuCung.1

// index.html:68213 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzCungTong.1 EDITABLE
function cusUzCungTong(){ let b = cusUzBang || cusUzLapBang(); return b[Math.floor((cusUzRmax() + 30) / 4)]; }
// PLAYER_PART_END s4.cusUzCungTong.1

// index.html:68215 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzVao.1 EDITABLE
function cusUzVao(ng){
            cusUzBang = null;
            let _L = cusUzCungTong(), _nhip = Math.max(2, Math.round(CUS_UZ_CACH * cusUzCm() / (_L / CUS_UZ_VAO)));
            cusUzu = { t: 0, giu: true, pha: 'nap', mo: 0, vao: [], an: 0, tha: 0, tat: 0,
                       tong: CUS_UZ_TAY * (Math.floor((CUS_UZ_THA - 1) / _nhip) + 1),
                       cach: CUS_UZ_CACH, con: 0, nuot: 0 };
            floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 34, "UZUMAKI..."));
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(110, 0.5, 'sine', 0.16, 70);
        }
// PLAYER_PART_END s4.cusUzVao.1

// index.html:68225 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzGiu.1 EDITABLE
function cusUzGiu(ng){
            let U = cusUzu; if (!U || !U.giu) return;
            U.t++;
            if (U.pha === 'nap'){
                // tha dan den o dau ngoai cua canh, cach nhau 2cm doc canh
                let L = cusUzCungTong(), toc = L / CUS_UZ_VAO;
                let nhip = Math.max(2, Math.round(CUS_UZ_CACH * cusUzCm() / toc));
                if (U.t <= CUS_UZ_THA && (U.t - 1) % nhip === 0)
                    for (let k = 0; k < CUS_UZ_TAY; k++) U.vao.push({ k: k, u: L, toc: toc });
                if (U.t % 60 === 0 && typeof SFX !== 'undefined' && SFX.tone)
                    SFX.tone(70 + U.t / 6, 0.35, 'sine', 0.12, 55 + U.t / 6);
                if (U.t >= CUS_UZ_NO) cusUzBung(ng);
            }
        }
// PLAYER_PART_END s4.cusUzGiu.1

// index.html:68239 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzBung.1 EDITABLE
function cusUzBung(ng){
            let U = cusUzu; U.pha = 'xa'; U.vao.length = 0; U.bung = 0;
            let T = cusUzTam();
            floatingTexts.push(new FloatingText(T.x - 50, T.y - 70, U.giu ? "UZUMAKI!" : "UZUMAKI " + Math.round(U.ti * 100) + "%"));
            shakeTimer = Math.max(shakeTimer, 24);
            if (typeof SFX !== 'undefined' && SFX.tone){
                SFX.tone(55, 0.8, 'sawtooth', 0.30, 30); SFX.tone(660, 0.5, 'sine', 0.18, 1800);
                SFX.tone(990, 0.4, 'triangle', 0.14, 2600);
            }
        }
// PLAYER_PART_END s4.cusUzBung.1

// index.html:68250 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzNha.1 EDITABLE
function cusUzNha(){
            let U = cusUzu; if (!U) return;
            U.giu = false;
            if (U.pha === 'nap' && U.an > 0){
                // @@HE-CUSUZ2 — tich chua du: bung theo ti le so vien da vao tam
                let ti = Math.min(1, U.an / Math.max(1, U.tong));
                U.ti = ti;
                U.con = Math.max(60, Math.round(CUS_UZ_THEM * ti));
                U.cach = CUS_UZ_CACH / Math.max(0.3, ti);
                U.an = U.tong;           // mat xoay sang du
                cusUzBung(null);
            } else if (U.pha === 'nap'){
                U.pha = 'huy'; U.tat = 30;
                if (typeof dino !== 'undefined' && dino) floatingTexts.push(new FloatingText(dino.x - 20, dino.y - 34, "TAN..."));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(140, 0.25, 'sine', 0.12, 60);
            } else if (U.pha === 'xa'){ U.con = CUS_UZ_THEM; }   // @@HE-CUSUZ2: tu phun them 10 giay
        }
// PLAYER_PART_END s4.cusUzNha.1

// index.html:68267 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzMucTieu.1 EDITABLE
function cusUzMucTieu(){
            if (gameState === 'pvp'){
                let d = (typeof pvpDich === 'function' && typeof dino !== 'undefined') ? pvpDich(dino) : null;
                return d ? [d] : [];
            }
            return (typeof allTargets === 'function') ? allTargets() : [];
        }
// PLAYER_PART_END s4.cusUzMucTieu.1

// index.html:68274 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzTrung.1 EDITABLE
function cusUzTrung(o, x, y, rr){
            let w = o.w || 24, h = o.h || 24;
            let nx = Math.max(o.x, Math.min(x, o.x + w)), ny = Math.max(o.y, Math.min(y, o.y + h));
            return (nx - x) * (nx - x) + (ny - y) * (ny - y) <= rr * rr;
        }
// PLAYER_PART_END s4.cusUzTrung.1

// index.html:68280 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzTick.1 EDITABLE
function cusUzTick(){
            let U = cusUzu;
            let dangXa = U && U.pha === 'xa';
            let conDan = false;
            for (let a of cusUzDan) if (a.length){ conDan = true; break; }
            if (!U && !conDan) return;
            // goc quay: cham luc nap, nhanh luc bung (va giu nhanh khi dan con bay)
            let quay = (U && (U.pha === 'nap' || U.pha === 'huy')) ? CUS_UZ_CHAM : CUS_UZ_QUAY;
            if (U && U.pha === 'xa' && (U.bung || 0) < 40){ U.bung++; quay = CUS_UZ_CHAM + (CUS_UZ_QUAY - CUS_UZ_CHAM) * U.bung / 40; }
            cusUzA += quay / 60;
            let T = cusUzTam(), cm = cusUzCm(), Rmax = cusUzRmax();
            if (U){
                if (U.pha === 'nap' || U.pha === 'xa') U.mo = Math.min(1, U.mo + 1 / 30);
                // dan den tien vao tam
                for (let i = U.vao.length - 1; i >= 0; i--){
                    let d = U.vao[i];
                    if (U.pha === 'nap') d.u -= d.toc;
                    if (d.u <= 0){ U.vao.splice(i, 1); U.an++; }
                }
                if (U.pha === 'xa' && !U.giu){
                    U.con--;
                    if (U.con <= 0){ U.pha = 'tat'; U.tat = 45; }
                }
                // @@HE-CUSUZ2 — 2 giay cuoi luc tich: hut dan boss vao tam
                if (U.pha === 'nap' && U.t >= CUS_UZ_HUT && typeof bossProjectiles !== 'undefined'){
                    let luc = Math.min(1, (U.t - CUS_UZ_HUT) / 30);
                    for (let i = bossProjectiles.length - 1; i >= 0; i--){
                        let q = bossProjectiles[i]; if (!q) continue;
                        let w = q.w || 0, h = q.h || 0;
                        if (w > 140 || h > 140) continue;          // tia / cot lua dai: khong phai vien dan
                        let qx = q.x + w / 2, qy = q.y + h / 2, dx = T.x - qx, dy = T.y - qy, d = Math.hypot(dx, dy) || 1;
                        if (d < CUS_UZ_HUTR){
                            bossProjectiles.splice(i, 1); U.nuot++;
                            if (typeof SFX !== 'undefined' && SFX.tone && U.nuot % 3 === 1) SFX.tone(300, 0.06, 'sine', 0.08, 90);
                            continue;
                        }
                        // keo vao + xoay theo chieu hoa van
                        let sp = (4 + 9 * luc) * Math.min(1, 0.4 + d / 300);
                        let vx = dx / d * sp - dy / d * sp * 0.55, vy = dy / d * sp + dx / d * sp * 0.55;
                        q.x += vx; q.y += vy; q.vx = vx; q.vy = vy;
                        q._uzHut = 1;
                    }
                }
                if (U.pha === 'huy' || U.pha === 'tat'){
                    U.tat--;
                    U.mo = Math.max(0, U.mo - 1 / 30);
                    if (U.tat <= 0){ cusUzu = null; U = null; }
                }
            }
            let v = CUS_UZ_TOC * cm / 60, r0 = cm * 0.9, cach = ((U && U.cach) || CUS_UZ_CACH) * cm;
            let ds = null;
            for (let k = 0; k < CUS_UZ_TAY; k++){
                let arr = cusUzDan[k];
                for (let b of arr){ b.px = b.x; b.py = b.y; b.r += v; }
                // phat vien moi o dau mang khi vien moi nhat da di du 2cm
                if (dangXa && (!arr.length || arr[0].r >= r0 + cach)){
                    arr.unshift({ r: r0, song: true, h: Math.random() * 60, n: 0 });
                }
                // chen vao cho canh bi keo gian
                for (let i = 0; i < arr.length - 1; i++){
                    let a = arr[i], b = arr[i + 1];
                    let pa = cusUzViTri(k, a.r, T), pb = cusUzViTri(k, b.r, T);
                    if (Math.hypot(pa.x - pb.x, pa.y - pb.y) > cach * 1.25 && (b.r - a.r) > 3){
                        arr.splice(i + 1, 0, { r: (a.r + b.r) / 2, song: a.song && b.song, h: (a.h + b.h) / 2, n: 0, px: null });
                        i++;
                    }
                }
                while (arr.length && arr[arr.length - 1].r > Rmax) arr.pop();
                // cap nhat vi tri + va cham
                for (let b of arr){
                    let p = cusUzViTri(k, b.r, T); b.x = p.x; b.y = p.y; b.n++;
                    if (!b.song) continue;
                    if (ds === null) ds = cusUzMucTieu();
                    for (let o of ds){
                        if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                        let hit = cusUzTrung(o, b.x, b.y, 7);
                        if (!hit && b.px != null) hit = cusUzTrung(o, (b.x + b.px) / 2, (b.y + b.py) / 2, 7);
                        if (!hit) continue;
                        b.song = false;
                        cusChDanh(o, CUS_UZ_DMG);   // @@HE-CUSCHHU
                        break;
                    }
                }
            }
        }
// PLAYER_PART_END s4.cusUzTick.1

// index.html:68365 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUzVe.1 EDITABLE
function cusUzVe(){
            let U = cusUzu;
            let conDan = false;
            for (let a of cusUzDan) if (a.length){ conDan = true; break; }
            if (!U && !conDan) return;
            let T = cusUzTam(), cm = cusUzCm(), Rmax = cusUzRmax();
            ctx.save();
            // ---- VONG XOAY DEN ----
            if (U && U.mo > 0){
                let mo = U.mo;
                /* Moi canh ve thanh MOT DAI LIEN (da giac hai mep) thon dan ra ngoai. Ban dau toi
                   ve tung doan ngan co dau tron: cac dau tron chong len nhau thanh mot chuoi hat. */
                let mo2 = (U.pha === 'xa' || U.pha === 'tat') ? mo * 0.45 : mo;
                for (let lop = 0; lop < 2; lop++){
                    for (let k = 0; k < CUS_UZ_TAY; k++){
                        let trai = [], phai = [];
                        for (let r = 2; r <= Rmax + 40; r += 8){
                            let p = cusUzViTri(k, r, T), q = cusUzViTri(k, r + 4, T);
                            let dx = q.x - p.x, dy = q.y - p.y, l = Math.hypot(dx, dy) || 1;
                            let u = Math.min(1, r / Rmax);
                            let w = (lop === 0 ? 7 : 2.5) + 22 * (1 - u) * Math.min(1, r / 30);
                            trai.push([p.x - dy / l * w / 2, p.y + dx / l * w / 2]);
                            phai.push([p.x + dy / l * w / 2, p.y - dx / l * w / 2]);
                        }
                        let gr = ctx.createRadialGradient(T.x, T.y, 0, T.x, T.y, Rmax);
                        if (lop === 0){
                            gr.addColorStop(0, "rgba(120,60,170," + (0.30 * mo2) + ")");
                            gr.addColorStop(1, "rgba(120,60,170," + (0.08 * mo2) + ")");
                        } else {
                            gr.addColorStop(0, "rgba(6,2,12," + (0.80 * mo2) + ")");
                            gr.addColorStop(1, "rgba(6,2,12," + (0.30 * mo2) + ")");
                        }
                        ctx.fillStyle = gr;
                        ctx.beginPath(); ctx.moveTo(trai[0][0], trai[0][1]);
                        for (let i = 1; i < trai.length; i++) ctx.lineTo(trai[i][0], trai[i][1]);
                        for (let i = phai.length - 1; i >= 0; i--) ctx.lineTo(phai[i][0], phai[i][1]);
                        ctx.closePath(); ctx.fill();
                    }
                }
                // mat xoay: nap thi toi dan theo so dan da an, bung thi sang ruc
                let an = U.pha === 'xa' || U.pha === 'tat' ? 1 : Math.min(1, U.an / (CUS_UZ_TAY * 11));
                let R0 = cm * (0.8 + 0.9 * an);
                let g = ctx.createRadialGradient(T.x, T.y, 0, T.x, T.y, R0 * 1.8);
                if (U.pha === 'xa' || U.pha === 'tat'){
                    let hue = (frames * 6) % 360;
                    g.addColorStop(0, "rgba(255,255,255," + mo + ")");
                    g.addColorStop(0.35, "hsla(" + hue + ",100%,65%," + (0.8 * mo) + ")");
                    g.addColorStop(1, "hsla(" + ((hue + 120) % 360) + ",100%,50%,0)");
                } else {
                    g.addColorStop(0, "rgba(0,0,0," + (0.9 * mo) + ")");
                    g.addColorStop(0.55, "rgba(30,10,50," + ((0.4 + 0.4 * an) * mo) + ")");
                    g.addColorStop(1, "rgba(60,20,90,0)");
                }
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(T.x, T.y, R0 * 1.8, 0, Math.PI * 2); ctx.fill();
                // dan den mo dang bo vao
                for (let d of U.vao){
                    let r = cusUzRTuCung(d.u); if (r > Rmax + 20) continue;
                    let p = cusUzViTri(d.k, r, T);
                    let a = (U.pha === 'huy') ? (U.tat / 30) : 1;
                    ctx.fillStyle = "rgba(20,12,30," + (0.55 * a) + ")";
                    ctx.beginPath(); ctx.arc(p.x, p.y, 6.5, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "rgba(90,70,110," + (0.35 * a) + ")";
                    ctx.beginPath(); ctx.arc(p.x - 1.5, p.y - 1.5, 2.5, 0, Math.PI * 2); ctx.fill();
                }
            }
            // ---- DAN CAU VONG ----
            ctx.globalCompositeOperation = 'lighter';
            for (let k = 0; k < CUS_UZ_TAY; k++){
                for (let b of cusUzDan[k]){
                    if (!b.song || b.x === undefined) continue;
                    let hue = (b.r / cm * 34 + k * 72 + b.h) % 360;
                    let vao = Math.min(1, b.n / 8);
                    ctx.fillStyle = "hsla(" + hue + ",100%,60%," + (0.28 * vao) + ")";
                    ctx.beginPath(); ctx.arc(b.x, b.y, 11, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "hsla(" + hue + ",100%,70%," + (0.95 * vao) + ")";
                    ctx.beginPath(); ctx.arc(b.x, b.y, 5.5, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "rgba(255,255,255," + (0.8 * vao) + ")";
                    ctx.beginPath(); ctx.arc(b.x, b.y, 2, 0, Math.PI * 2); ctx.fill();
                }
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cusUzVe.1

// index.html:68450 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusChNha.1 EDITABLE
function cusChNha(ng){
            if (cusGb && cusGb.giu){ cusGbNha(); return; }         // @@HE-CUSGB
            if (cusTl && cusTl.giu){ cusTlNha(ng); return; }        // @@HE-CUSTL: nha K / an don = GIAT DAY
            if (cusMt && cusMt.giu){ cusMtNha(); return; }         // @@HE-CUSMT
            if (cusUzu && cusUzu.giu){ cusUzNha(); return; }       // @@HE-CUSUZ
            /* BOM NGUYEN TU: ngat giua chung thi KHONG TAC DONG GI. Khong no nua vong,
               khong hoi chieu, khong den bu — dung nhu Hans dat. */
            if (cusNuke){
                // GIU LAI so dang hien luc bi ngat. De no tu tut ve 00.0 thi bang doc ra la
                // "dem xong roi" — nguoc han y nghia, vi vua bi huy giua chung.
                cusNkTatSo = Math.max(0, (CUS_NK_DEM - cusNuke.t) / 60);
                cusNuke = null; cusNkTat = 22;      // bang doi sang do "DA HUY" roi mo dan di
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(150, 0.20, 'square', 0.16, 70);
                return;
            }
            if (cusUfo){ cusUfo.roi = 1; cusUfo = null; return; }
            if (!cusQN) return;
            let muc = cusQN.muc, ban = cusQN.ban || CUS_QN_CM;
            let cx = ng.x + ng.w/2, cy = ng.y + ng.h/2;
            cusQN = null;
            cusNoLonDat(cx, cy, Math.max(150, canvas.width * (ban / 23) * 1.25), "255,138,60");
            shakeTimer = Math.max(shakeTimer, 40);
            floatingTexts.push(new FloatingText(cx - 60, cy - 60, "GIẢI NHIỆT! " + muc));
            if (typeof SFX !== 'undefined' && SFX.tone){
                SFX.tone(60, 0.7, 'sawtooth', 0.38, 28); SFX.tone(240, 0.35, 'square', 0.22, 70);
            }
            if (gameState === 'pvp'){
                let dich = (typeof pvpDich === 'function') ? pvpDich(ng) : null;
                let R = Math.max(40, canvas.width * (ban / 23));
                if (dich && Math.hypot((dich.x + dich.w/2) - cx, (dich.y + dich.h/2) - cy) <= R){ if (typeof cusPvpDanh === 'function') cusPvpDanh(ng, dich, muc); else dich.takeDamage(muc); }   // @@HE-P2KHOA
            } else if (typeof allTargets === 'function'){
                cusQNDanh(allTargets().slice(), muc);
            }
            ng.isOverheated = true; ng.overheatTimer = CUS_QN_NONG;
            ng.aKeyHeldTime = 0; ng.chargeProgress = 0;
        }
// PLAYER_PART_END s4.cusChNha.1

// index.html:68495 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusChAnDon.1 EDITABLE
function cusChAnDon(ng){
            if (!ng) return;
            // @@HE-PVPCUS — P2 (PvP) chi co Channel cua Phi Tieu / Kiem Vu la trang thai rieng; Channel Custom con lai van la cua P1
            if (ng.id !== 1 && gameState !== 'pvp') return;   // @@HE-P2KHOA: P2 (PvP) gio co ca Channel Custom rieng
            if (typeof cusQN === 'undefined') return;
            if (!cusQN && !cusUfo && !cusNuke && !(cusUzu && cusUzu.giu) && !(cusGb && cusGb.giu) && !(cusMt && cusMt.giu) && !(cusTl && cusTl.giu)) return;
            floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 46, "NGẮT CHANNEL!"));
            cusChNgat(ng);
        }
// PLAYER_PART_END s4.cusChAnDon.1

// index.html:68509 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusChKhoaKhien.1 EDITABLE
function cusChKhoaKhien(){
            if (typeof dino === 'undefined' || !dino || !dino.cusCh) return false;
            if (typeof hasRune === 'function' && (hasRune('chanshld') || hasRune('chanshldx'))) return false;
            return true;
        }
// PLAYER_PART_END s4.cusChKhoaKhien.1

// index.html:68514 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusChNgat.1 EDITABLE
function cusChNgat(ng){
            if (!ng) return;
            ng.cusCh = 0;
            cusChNha(ng);
            ng.aKeyHeldTime = 0; ng.chargeProgress = 0;
        }
// PLAYER_PART_END s4.cusChNgat.1

// index.html:68520 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQNVe.1 EDITABLE
function cusQNVe(){
            // quang nhiet quanh nguoi choi
            if (cusQN && typeof dino !== 'undefined' && dino){
                let R = Math.max(40, canvas.width * ((cusQN.ban || CUS_QN_CM) / 23));
                let cx = dino.x + dino.w/2, cy = dino.y + dino.h/2;
                let u = Math.min(1, cusQN.muc / Math.max(1, cusQN.moc));
                let nh = 0.5 + 0.5 * Math.sin(frames * 0.3);
                ctx.save();
                /* Ban dau toi ve quang nhiet bang cam nhat tren nen sa mac cung mau cam —
                   chup ra gan nhu khong thay gi, dung cai loi da mac voi ngon lua xanh cua
                   Midas. Tren nen cam thi mau DAM VA THAM moi cat duoc hinh ra khoi nen, con
                   mau sang chi dung de vien mep. */
                // vet chay tren mat dat
                ctx.globalAlpha = 0.25 + 0.35 * u;
                ctx.fillStyle = "#4E342E";
                ctx.beginPath(); ctx.ellipse(cx, 318, R * 0.92, R * 0.16, 0, 0, 6.28); ctx.fill();
                ctx.globalAlpha = 1;
                // than truong nhiet
                let g = ctx.createRadialGradient(cx, cy, R * 0.10, cx, cy, R);
                g.addColorStop(0,    "rgba(255,255,255," + (0.16 + 0.34 * u).toFixed(2) + ")");
                g.addColorStop(0.45, "rgba(255,87,34,"   + (0.22 + 0.38 * u).toFixed(2) + ")");
                g.addColorStop(0.85, "rgba(183,28,28,"   + (0.30 + 0.40 * u).toFixed(2) + ")");
                g.addColorStop(1,    "rgba(120,20,20,0)");
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.28); ctx.fill();
                // vien: mot vong THAM ben ngoai, mot vong TRANG NONG ben trong
                ctx.strokeStyle = "rgba(127,20,15," + (0.65 + 0.30 * nh).toFixed(2) + ")";
                ctx.lineWidth = 4 + 3 * u;
                ctx.beginPath(); ctx.arc(cx, cy, R * (0.96 + 0.04 * nh), 0, 6.28); ctx.stroke();
                ctx.strokeStyle = "rgba(255,241,118," + (0.55 + 0.35 * nh).toFixed(2) + ")";
                ctx.lineWidth = 1.5 + 1.5 * u;
                ctx.beginPath(); ctx.arc(cx, cy, R * (0.90 + 0.04 * nh), 0, 6.28); ctx.stroke();
                // hoi boc len tu nguoi choi
                for (let k = 0; k < 5; k++){
                    let ph = ((frames * 0.02 + k * 0.2) % 1);
                    ctx.globalAlpha = (1 - ph) * 0.65;
                    ctx.fillStyle = k % 2 ? "#FFE0B2" : "#FF8A65";
                    ctx.beginPath(); ctx.arc(cx + Math.sin(frames * 0.1 + k * 2) * 12, cy - 20 - ph * 56, 6 - 4 * ph, 0, 6.28); ctx.fill();
                }
                ctx.globalAlpha = 1;
                ctx.font = "bold 20px Consolas, monospace"; ctx.textAlign = "center";
                ctx.lineWidth = 4; ctx.strokeStyle = "#3E1010";
                ctx.strokeText("\u2668 " + cusQN.muc, cx, dino.y - 28);
                ctx.fillStyle = "#FFD54F";
                ctx.fillText("\u2668 " + cusQN.muc, cx, dino.y - 28);
                ctx.textAlign = "left";
                ctx.restore();
            }
            // xac quai dang tan chay
            for (let i = cusTanChay.length - 1; i >= 0; i--){
                let m = cusTanChay[i]; m.t++;
                if (m.t > m.tong){ cusTanChay.splice(i, 1); continue; }
                cusVeTanChay(m.x, m.y, m.w, m.h, m.t / m.tong);
            }
            cusUfoVe();
        }
// PLAYER_PART_END s4.cusQNVe.1
