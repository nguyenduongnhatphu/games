// PLAYER_FILE: DINOSWORD01
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: FloatingText, SFX, allTargets, ctx, currentAmmoType, currentForm, dangLuotHoacChop, floatingTexts, frames, hasRune, keys, shakeTimer, unityOn, unityPal, venKhoa
// index.html:51195 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSW_REST.1 EDITABLE
const DSW_REST = -1.05;
// PLAYER_PART_END s4.DSW_REST.1

// index.html:51196 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSW_ARC.1 EDITABLE
const DSW_ARC = {
            z_vert: [-0.08,  2.12],   // chem DOC: bo tu tren dau xuong truoc mat
            z_horz: [ 1.57,  1.57],   // chem NGANG: ve bang DSW_NGANG (2.5D), so nay chi de du phong
            z_big:  [-0.70,  2.80],   // CHEM TO 2 tay: vong tu SAU LUNG qua dinh dau xuong truoc mat
            z_spin: [-1.57,  6.91],   // KUUENZAN: xoay tron mot vong
            z_rise: [ 2.87, -0.38],   // RYUENJIN: chem hat nguoc len
            z_dive: [ 1.27,  3.32],   // HYOURETSUZAN: chuc luoi thang xuong
            z_dash: [ 0.72,  2.42],   // SHIPPUUGA: dam ngang ve phia truoc
            z_far:  [-0.28,  2.55],   // NHAT CHEM XA (Lao Xuyen): bo dai roi thu ve
            /* KIEM KHI (fireCrescent): gio kiem cao qua dau roi BO THANG xuong truoc mat — mot nhat
               manh, dut khoat; luoi khi bay ra dung luc luoi kiem quet qua phia truoc. */
            z_kk:   [-0.95,  2.75],
            z_kk2:  [ 2.60, -0.45],   // nhat thu hai cua DRIVE: hat nguoc len (hai nhat thanh hinh chu V)
            /* DAM THANG. Goc kiem = goc effect + pi/2, nen luoi chi THANG VE TRUOC la ~1.57.
               Cung nay gan nhu dung yen quanh do -> cay kiem giu ngang va DAM, thay vi quet
               mot vong. Truoc day Stinger muon 'z_dash' (cung [0.72, 2.42]) nen luoi vong
               qua dau: nhin ra "choc len troi". */
            z_thrust: [1.44, 1.66]
        };
// PLAYER_PART_END s4.DSW_ARC.1

// index.html:51218 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswEase.1 EDITABLE
const dswEase = (u) => u * u * (3 - 2 * u);
// PLAYER_PART_END s4.dswEase.1

// index.html:51219 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSW_LAY_NHANH.1 EDITABLE
const DSW_LAY_NHANH = 0.25, DSW_THU_CHAM = 0.6;
// PLAYER_PART_END s4.DSW_LAY_NHANH.1

// index.html:51222 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswEaseRa.1 EDITABLE
const dswEaseRa = (u) => 1 - Math.pow(1 - u, 2.2);
// PLAYER_PART_END s4.dswEaseRa.1

// index.html:51223 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswTravel.1 EDITABLE
function dswTravel(pose){
            let A = DSW_ARC[pose.kind] || DSW_ARC.z_vert;
            let fr = (pose.from == null) ? DSW_REST : pose.from;
            return [A, fr, Math.abs(A[0] - fr), Math.abs(A[1] - A[0]), Math.abs(DSW_REST - A[1])];
        }
// PLAYER_PART_END s4.dswTravel.1

// index.html:51229 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswRun.1 EDITABLE
function dswRun(pose){
            let [A, fr, d0, d1, d2] = dswTravel(pose);
            let tot = d0 + d1 + d2;
            let pr = Math.max(0, Math.min(1, 1 - pose.t / pose.t0));
            /* @@HE-KIEMNGANG: LAY DA chi duoc 25% (thu kiem 60%) thoi gian theo quang duong cua no. Truoc day moi
               radian deu an thoi gian nhu nhau, nen nhat to (lay da tu truoc mat vong ra sau lung)
               mat ca chuc khung moi toi luc chem — sat thuong da ra tu lau ma luoi con dang gio len. */
            const K = DSW_LAY_NHANH, K2 = DSW_THU_CHAM, s = dswEaseRa(pr) * (d0 * K + d1 + d2 * K2);
            let e = s < d0 * K ? s / K : (s < d0 * K + d1 ? d0 + (s - d0 * K) : d0 + d1 + (s - d0 * K - d1) / K2);
            return [A, fr, d0, d1, d2, tot, Math.min(tot, e)];
        }
// PLAYER_PART_END s4.dswRun.1

// index.html:51242 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswDam.1 EDITABLE
function dswDam(pose){
            let pr = Math.max(0, Math.min(1, 1 - pose.t / pose.t0)), F = Math.PI / 2;
            let dx = pr < 0.18 ? -12 * dswEase(pr / 0.18)
                   : pr < 0.38 ? -12 + 46 * (1 - Math.pow(1 - (pr - 0.18) / 0.20, 3))
                   : pr < 0.70 ? 34 : 34 * (1 - dswEase((pr - 0.70) / 0.30));
            let ang = pr < 0.70 ? F : F + (DSW_REST - F) * dswEase((pr - 0.70) / 0.30);
            let trail = (pr >= 0.18 && pr < 0.55) ? 1 : (pr < 0.70 && pr >= 0.55 ? 1 - (pr - 0.55) / 0.15 : 0);
            return { ang, dx, trail, grip: pr < 0.70 ? 1 : 1 - (pr - 0.70) / 0.30 };
        }
// PLAYER_PART_END s4.dswDam.1

// index.html:51252 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswAngle.1 EDITABLE
function dswAngle(pose){
            if (!pose || !pose.t0) return DSW_REST;
            if (pose.kind === 'z_thrust') return dswDam(pose).ang;
            if (typeof DSW_NGANG !== 'undefined' && DSW_NGANG[pose.kind]) return dswNgangPha(pose).ang;
            let [A, fr, d0, d1, d2, tot, e] = dswRun(pose);
            if (tot < 0.001) return DSW_REST;
            if (e <= d0) return fr + (A[0] - fr) * (d0 > 0 ? e / d0 : 1);
            e -= d0;
            if (e <= d1) return A[0] + (A[1] - A[0]) * (d1 > 0 ? e / d1 : 1);
            e -= d1;
            return A[1] + (DSW_REST - A[1]) * (d2 > 0 ? e / d2 : 1);
        }
// PLAYER_PART_END s4.dswAngle.1

// index.html:51271 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSW_NGANG.1 EDITABLE
const DSW_NGANG = { z_horz: [2.55, -0.5] };
// PLAYER_PART_END s4.DSW_NGANG.1

// index.html:51272 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSW_NGANG_RY.1 EDITABLE
const DSW_NGANG_RY = 0.24;
// PLAYER_PART_END s4.DSW_NGANG_RY.1

// index.html:51273 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSW_NGANG_LAY.1 EDITABLE
const DSW_NGANG_LAY = 0.06, DSW_NGANG_HET = 0.32;
// PLAYER_PART_END s4.DSW_NGANG_LAY.1

// index.html:51274 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswNgangDiem.1 EDITABLE
function dswNgangDiem(phi){
            let x = Math.cos(phi), y = Math.sin(phi) * DSW_NGANG_RY;
            return { ang: Math.atan2(y, x) + Math.PI / 2, len: Math.hypot(x, y) };
        }
// PLAYER_PART_END s4.dswNgangDiem.1

// index.html:51278 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswNgangPha.1 EDITABLE
function dswNgangPha(pose){
            if (!pose || !pose.t0 || !DSW_NGANG[pose.kind]) return null;
            let N = DSW_NGANG[pose.kind], pr = Math.max(0, Math.min(1, 1 - pose.t / pose.t0));
            let fr = (pose.from == null) ? DSW_REST : pose.from;
            let A = dswNgangDiem(N[0]), B = dswNgangDiem(N[1]);
            // chon vong goc gan 'fr' nhat de lay da khong quay nguoc ca vong
            while (A.ang - fr > Math.PI) A.ang -= Math.PI * 2;
            while (fr - A.ang > Math.PI) A.ang += Math.PI * 2;
            if (pr < DSW_NGANG_LAY){
                let k = dswEase(pr / DSW_NGANG_LAY);
                return { ang: fr + (A.ang - fr) * k, len: 1 + (A.len - 1) * k, quet: false, phi: N[0], phi0: N[0], phi1: N[1], pr };
            }
            if (pr < DSW_NGANG_HET){
                let u = (pr - DSW_NGANG_LAY) / (DSW_NGANG_HET - DSW_NGANG_LAY), e = 1 - Math.pow(1 - u, 3);
                let phi = N[0] + (N[1] - N[0]) * e, D = dswNgangDiem(phi);
                while (D.ang - A.ang > Math.PI) D.ang -= Math.PI * 2;
                while (A.ang - D.ang > Math.PI) D.ang += Math.PI * 2;
                return { ang: D.ang, len: D.len, quet: true, phi, phi0: N[0], phi1: N[1], pr };
            }
            let k = dswEase((pr - DSW_NGANG_HET) / (1 - DSW_NGANG_HET));
            let bA = B.ang; while (bA - DSW_REST > Math.PI) bA -= Math.PI * 2; while (DSW_REST - bA > Math.PI) bA += Math.PI * 2;
            return { ang: bA + (DSW_REST - bA) * k, len: B.len + (1 - B.len) * k, quet: false, phi: N[1], phi0: N[0], phi1: N[1], pr };
        }
// PLAYER_PART_END s4.dswNgangPha.1

// index.html:51303 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswAngleCat.1 EDITABLE
function dswAngleCat(pose){
            if (!pose || !pose.t0) return DSW_REST;
            if (pose.kind === 'z_thrust') return Math.PI / 2;
            let [A, fr, d0, d1, d2, tot, e] = dswRun(pose);
            if (e <= d0) return A[0];
            if (e >= d0 + d1) return A[1];
            return A[0] + (A[1] - A[0]) * (d1 > 0 ? (e - d0) / d1 : 1);
        }
// PLAYER_PART_END s4.dswAngleCat.1

// index.html:51312 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswGrip.1 EDITABLE
function dswGrip(pose){
            if (!pose || !pose.t0) return 0;
            if (pose.kind === 'z_thrust') return dswDam(pose).grip;
            { let G = dswNgangPha(pose); if (G) return G.pr < DSW_NGANG_HET ? Math.min(1, G.pr / DSW_NGANG_LAY) : Math.max(0, 1 - (G.pr - DSW_NGANG_HET) / (1 - DSW_NGANG_HET)); }
            let [, , d0, d1, d2, tot, e] = dswRun(pose);
            if (tot < 0.001) return 0;
            if (e < d0) return d0 > 0 ? e / d0 : 1;
            if (e < d0 + d1) return 1;
            return d2 > 0 ? Math.max(0, 1 - (e - d0 - d1) / d2) : 0;
        }
// PLAYER_PART_END s4.dswGrip.1

// index.html:51323 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswTrail.1 EDITABLE
function dswTrail(pose){
            if (!pose || !pose.t0) return 0;
            if (pose.kind === 'z_thrust') return dswDam(pose).trail;
            let [, , d0, d1, d2, tot, e] = dswRun(pose);
            if (tot < 0.001) return 0;
            /* @@HE-KIEMNGANG: pha LAY DA khong de vet. Truoc day vet hien tu 55% quang lay da, ma
               nhat truoc ket thuc o phia truoc/duoi thi lay da la mot cu VUNG NGUOC LEN qua dau —
               vet cua no chinh la cai "chem len" Hans thay giua cac nhat. */
            if (e < d0) return d0 > 0 ? Math.max(0, (e / d0 - 0.85) / 0.15) : 1;
            if (e < d0 + d1) return 1;
            return d2 > 0 ? Math.max(0, 1 - (e - d0 - d1) / (d2 * 0.40)) : 0;
        }
// PLAYER_PART_END s4.dswTrail.1

// index.html:51338 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSW_RIM.1 EDITABLE
const DSW_RIM = ["#FFB59A", "#9EE1FF", "#FF6E6E", "#D89CFF"];
// PLAYER_PART_END s4.DSW_RIM.1

// index.html:51339 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSW_GOLD.1 EDITABLE
const DSW_GOLD = "#FFD54F", DSW_GOLD_LT = "#FFF3C4", DSW_GOLD_DK = "#4A3208";
// PLAYER_PART_END s4.DSW_GOLD.1

// index.html:51340 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswHexRGB.1 EDITABLE
function dswHexRGB(h){
            if (!h || h[0] !== '#') return "220,228,236";
            let v = parseInt(h.slice(1), 16);
            return ((v >> 16) & 255) + "," + ((v >> 8) & 255) + "," + (v & 255);
        }
// PLAYER_PART_END s4.dswHexRGB.1

// index.html:51346 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswTier.1 EDITABLE
function dswTier(){
            if (typeof hasRune !== 'function') return 0;
            /* KATANA phai la MOT TIER cua chinh cay kiem goc. Truoc day toi ve them mot cay
               katana rieng o lop khac — cay kiem goc van ve de len, thanh ra hai cay chong
               nhau va cay cua toi thi be xiu. */
            if (hasRune('katana')) return 3;
            if (hasRune('swordmaster')) return 2;
            if (hasRune('explshot')) return 1;
            return 0;
        }
// PLAYER_PART_END s4.dswTier.1

// index.html:51356 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dswBladeCol.1 EDITABLE
function dswBladeCol(){
            if (dswTier() > 0) return DSW_GOLD;
            if (typeof unityOn === 'function' && unityOn() && typeof unityPal === 'function'){
                let q = unityPal(currentAmmoType); if (q && q.rim) return q.rim;
            }
            return DSW_RIM[currentForm] || DSW_RIM[0];
        }
// PLAYER_PART_END s4.dswBladeCol.1

// index.html:51371 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSW_XOAY_NHIP.1 EDITABLE
const DSW_XOAY_NHIP = 4;
// PLAYER_PART_END s4.DSW_XOAY_NHIP.1

// index.html:51372 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSW_XOAY_DAI.1 EDITABLE
const DSW_XOAY_DAI  = 18;
// PLAYER_PART_END s4.DSW_XOAY_DAI.1

// index.html:51375 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSW_XOAY_GOC.1 EDITABLE
const DSW_XOAY_GOC  = 6;
// PLAYER_PART_END s4.DSW_XOAY_GOC.1

// index.html:51376 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSW_XOAY_TRAN.1 EDITABLE
const DSW_XOAY_TRAN = 10;
// PLAYER_PART_END s4.DSW_XOAY_TRAN.1

// index.html:51377 · Phạm vi: global
// PLAYER_PART_BEGIN s4.drawDinoSwordArt.1 EDITABLE
function drawDinoSwordArt(bx, by, P, pose, tier){
            let ang = dswAngle(pose), w = dswGrip(pose);
            let px = bx + 29 + 4 * w, py = by + 17 + 3 * w;
            if (pose && pose.t0 && pose.kind === 'z_thrust') px += dswDam(pose).dx;   // DAM: ca canh tay day kiem toi
            tier = tier || 0;
            ctx.save();
            ctx.translate(px, py); ctx.rotate(ang);
            { let G = dswNgangPha(pose); if (G && G.len < 0.999) ctx.scale(1, Math.max(0.12, G.len)); }   // @@HE-KIEMNGANG: luoi chi vao man hinh thi co lai

            if (tier === 3){
                // ===== KATANA THAT — mot canh, CONG (sori) ve phia song, ban luoi deu tu habaki toi mui,
                // mui KISSAKI vat goc co duong yokote, tsuba tron nho, chuoi dai quan day kieu hishigami =====
                /* @@HE-KATNGUOC — Hans: "Katana bi nguoc". Luoi quay THEO CHIEU KIM DONG HO khi chem (goc tang),
                   nen phia DAN DAU la x+ cua he toa do luoi. Ban truoc canh cat nam o x- (phia sau) va song o x+
                   (phia truoc): chem bang song kiem, con luc gac vai thi canh cat ty len vai. Lat guong lai. */
                ctx.scale(-1, 1);
                const L = 72, W = 3.6, SORI = 5.2, B0 = -8;          // chieu dai luoi, be ngang, do cong, goc luoi
                const cong = (u) => SORI * u * u;                     // do lech ve phia SONG (x+) theo chieu dai
                // tsuka dai (hai tay cam) quan day cheo + samegawa
                ctx.fillStyle = "#EDE7D9"; ctx.fillRect(-2.9, -1, 5.8, 21);
                ctx.fillStyle = "#15161E";
                for (let k = 0; k < 6; k++){
                    ctx.beginPath(); ctx.moveTo(-2.9, k * 3.4); ctx.lineTo(2.9, 1.7 + k * 3.4); ctx.lineTo(2.9, 3.2 + k * 3.4); ctx.lineTo(-2.9, 1.5 + k * 3.4); ctx.closePath(); ctx.fill();
                    ctx.beginPath(); ctx.moveTo(2.9, k * 3.4); ctx.lineTo(-2.9, 1.7 + k * 3.4); ctx.lineTo(-2.9, 3.2 + k * 3.4); ctx.lineTo(2.9, 1.5 + k * 3.4); ctx.closePath(); ctx.fill();
                }
                ctx.fillStyle = "#B8952B"; ctx.fillRect(-3.3, 19.5, 6.6, 3);            // kashira
                ctx.fillRect(-3.1, -1.8, 6.2, 1.6);                                       // fuchi
                // tsuba tron nho + seppa + habaki
                ctx.fillStyle = "#23262E"; ctx.strokeStyle = "#B8952B"; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.ellipse(0, -3.2, 7.2, 2.6, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
                ctx.fillStyle = "#D4B24C"; ctx.fillRect(-W * 0.5 - 0.6, -8.4, W + 1.2, 4.6);   // habaki
                // THAN LUOI: song (x+) va canh cat (x-) chay song song, cong dan ve phia song
                let spine = [], edge = [], N = 14, uY = L - 9;     // doan than chinh truoc kissaki
                for (let i = 0; i <= N; i++){
                    let u = i / N, y = B0 - u * (uY + B0), c = cong(u * uY / L);
                    spine.push([W * 0.5 + c, y]); edge.push([-W * 0.5 + c, y]);
                }
                let tipC = cong(1), yk = B0 - (uY + B0);            // duong yokote
                let tip = [W * 0.5 + tipC - 0.4, -L];                // mui nam lech ve phia SONG
                let gk = ctx.createLinearGradient(-W, 0, W, 0);
                gk.addColorStop(0, "#FFFFFF"); gk.addColorStop(0.38, "#E3EBF2"); gk.addColorStop(0.62, "#B9C7D3"); gk.addColorStop(1, "#7E90A0");
                ctx.beginPath();
                ctx.moveTo(edge[0][0], edge[0][1]);
                for (let i = 1; i <= N; i++) ctx.lineTo(edge[i][0], edge[i][1]);
                ctx.quadraticCurveTo(-W * 0.5 + tipC + 0.6, yk - 6, tip[0], tip[1]);   // fukura cong ra mui
                ctx.lineTo(spine[N][0], spine[N][1]);
                for (let i = N - 1; i >= 0; i--) ctx.lineTo(spine[i][0], spine[i][1]);
                ctx.closePath();
                ctx.fillStyle = gk; ctx.fill();
                ctx.strokeStyle = "#5E7182"; ctx.lineWidth = 0.9; ctx.stroke();
                // hamon (song ram) chay doc canh cat
                ctx.strokeStyle = "#FFFFFF"; ctx.globalAlpha = 0.9; ctx.lineWidth = 1.1;
                ctx.beginPath(); ctx.moveTo(edge[0][0] + 1.1, edge[0][1]);
                for (let i = 1; i <= N; i++) ctx.lineTo(edge[i][0] + 1.1 + (i % 2 ? 0.55 : 0), edge[i][1]);
                ctx.stroke();
                // shinogi (song noi) + yokote
                ctx.globalAlpha = 0.6; ctx.strokeStyle = "#F2F7FB"; ctx.lineWidth = 0.8;
                ctx.beginPath(); ctx.moveTo(spine[0][0] - 1.3, spine[0][1]);
                for (let i = 1; i <= N; i++) ctx.lineTo(spine[i][0] - 1.3, spine[i][1]);
                ctx.lineTo(-W * 0.5 + tipC + 0.8, yk); ctx.stroke();
                ctx.globalAlpha = 1;
            } else if (tier === 2){
                // ===== SWORDMASTER — truong kiem: luoi dai, thon, chan kiem hinh canh, chuoi boc vang =====
                let L = 66;
                ctx.fillStyle = DSW_GOLD; ctx.strokeStyle = DSW_GOLD_DK; ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, -4); ctx.lineTo(-13, -10); ctx.lineTo(-16, -4); ctx.lineTo(-8, -1);
                ctx.lineTo(8, -1); ctx.lineTo(16, -4); ctx.lineTo(13, -10); ctx.closePath();
                ctx.fill(); ctx.stroke();
                ctx.fillStyle = "#1E2430"; ctx.fillRect(-2.6, -2, 5.2, 14);
                ctx.fillStyle = DSW_GOLD_LT;
                for (let k = 0; k < 3; k++) ctx.fillRect(-2.6, 1 + k * 4, 5.2, 1.4);
                ctx.fillStyle = DSW_GOLD; ctx.beginPath(); ctx.arc(0, 14, 3.4, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = DSW_GOLD_LT; ctx.beginPath(); ctx.arc(-0.8, 13.2, 1.3, 0, Math.PI * 2); ctx.fill();
                let g2 = ctx.createLinearGradient(0, -4, 0, -L);
                g2.addColorStop(0, "#FFFDF2"); g2.addColorStop(0.5, "#E6DCC0"); g2.addColorStop(1, DSW_GOLD);
                ctx.beginPath();
                ctx.moveTo(-4.2, -4); ctx.lineTo(4.2, -4);
                ctx.lineTo(3.4, -34); ctx.lineTo(4.4, -40); ctx.lineTo(2.9, -52);
                ctx.lineTo(0, -L); ctx.lineTo(-2.9, -52); ctx.lineTo(-4.4, -40); ctx.lineTo(-3.4, -34);
                ctx.closePath();
                ctx.fillStyle = g2; ctx.fill();
                ctx.fillStyle = DSW_GOLD_LT; ctx.fillRect(-1.1, -56, 2.2, 48);
                ctx.strokeStyle = "#2A2314"; ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(-4.2, -4); ctx.lineTo(4.2, -4);
                ctx.lineTo(3.4, -34); ctx.lineTo(4.4, -40); ctx.lineTo(2.9, -52);
                ctx.lineTo(0, -L); ctx.lineTo(-2.9, -52); ctx.lineTo(-4.4, -40); ctx.lineTo(-3.4, -34);
                ctx.closePath(); ctx.stroke();
                ctx.strokeStyle = DSW_GOLD; ctx.lineWidth = 0.8; ctx.globalAlpha = 0.85;
                ctx.beginPath(); ctx.moveTo(-2.4, -10); ctx.lineTo(-2.0, -46); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(2.4, -10); ctx.lineTo(2.0, -46); ctx.stroke();
                ctx.globalAlpha = 1;
            } else if (tier === 1){
                // ===== NOVA — dai kiem ban to, luoi toi mau, ranh giua nung do nhu than =====
                let L = 55;
                ctx.fillStyle = "#2A2318"; ctx.fillRect(-3, -2, 6, 13);
                ctx.fillStyle = DSW_GOLD; ctx.strokeStyle = DSW_GOLD_DK; ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(-11, -6); ctx.lineTo(11, -6); ctx.lineTo(13, -1); ctx.lineTo(-13, -1);
                ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.fillStyle = "#3E2723"; ctx.fillRect(-2.5, 9, 5, 5);
                let g1 = ctx.createLinearGradient(0, -5, 0, -L);
                g1.addColorStop(0, "#6B6257"); g1.addColorStop(0.5, "#4A423A"); g1.addColorStop(1, "#2E2822");
                ctx.beginPath();
                ctx.moveTo(-5.6, -5); ctx.lineTo(5.6, -5);
                ctx.lineTo(5.2, -22); ctx.lineTo(7.0, -26); ctx.lineTo(4.8, -30);
                ctx.lineTo(5.0, -40); ctx.lineTo(6.6, -43); ctx.lineTo(4.2, -46);
                ctx.lineTo(0, -L); ctx.lineTo(-4.6, -44); ctx.closePath();
                ctx.fillStyle = g1; ctx.fill();
                ctx.strokeStyle = "#12100C"; ctx.lineWidth = 1; ctx.stroke();
                let hb = 0.72 + 0.28 * Math.sin(frames * 0.16);
                ctx.globalAlpha = hb;
                ctx.fillStyle = DSW_GOLD; ctx.fillRect(-1.6, -44, 3.2, 37);
                ctx.fillStyle = DSW_GOLD_LT; ctx.fillRect(-0.7, -42, 1.4, 33);
                ctx.globalAlpha = 1;
            } else {
                // ===== KIEM THUONG — thep sang, ranh giua an theo mau bo giap cua dang dang mang =====
                ctx.fillStyle = "#2A2F3A"; ctx.fillRect(-2.5, -2, 5, 13);
                ctx.fillStyle = P.spk || "#8A93A6"; ctx.fillRect(-9, -5, 18, 4);
                ctx.fillStyle = "#5D4037"; ctx.fillRect(-2, 9, 4, 4);
                let g = ctx.createLinearGradient(0, -5, 0, -52);
                g.addColorStop(0, "#F5F7FA"); g.addColorStop(0.55, "#B8C2D4");
                g.addColorStop(1, P.rim || "#7C88A8");
                ctx.beginPath();
                ctx.moveTo(-4.5, -5); ctx.lineTo(4.5, -5);
                ctx.lineTo(3.8, -43); ctx.lineTo(0, -53); ctx.lineTo(-3.8, -43);
                ctx.closePath();
                ctx.fillStyle = g; ctx.fill();
                ctx.fillStyle = P.lt || "#9FD8FF"; ctx.fillRect(-1.2, -41, 2.4, 33);
                ctx.strokeStyle = P.out || "#0A0C12"; ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(-4.5, -5); ctx.lineTo(4.5, -5);
                ctx.lineTo(3.8, -43); ctx.lineTo(0, -53); ctx.lineTo(-3.8, -43);
                ctx.closePath(); ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.drawDinoSwordArt.1

// index.html:51518 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CRESCENT_GAP.1 EDITABLE
const CRESCENT_GAP = 190;
// PLAYER_PART_END s4.CRESCENT_GAP.1

// index.html:51519 · Phạm vi: global
// PLAYER_PART_BEGIN s4.clawSwordCap.1 EDITABLE
function clawSwordCap(){ return hasRune('swordmaster') ? 30 : 20; }
// PLAYER_PART_END s4.clawSwordCap.1

// index.html:51520 · Phạm vi: global
// PLAYER_PART_BEGIN s4.clawSwordTick.1 EDITABLE
function clawSwordTick(){ return hasRune('swordmaster') ? 10 : 15; }
// PLAYER_PART_END s4.clawSwordTick.1

// index.html:51528 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_ID.1 EDITABLE
const KAT_ID = 'katana';
// PLAYER_PART_END s4.KAT_ID.1

// index.html:51529 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katBat.1 EDITABLE
function katBat(dan){
            if (typeof hasRune !== 'function' || !hasRune(KAT_ID)) return false;
            return dan === 5;
        }
// PLAYER_PART_END s4.katBat.1

// index.html:51534 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_J1.1 EDITABLE
const KAT_J1 = 15, KAT_J2 = 75, KAT_J3 = 105, KAT_J_TRAN = 120;
// PLAYER_PART_END s4.KAT_J1.1

// index.html:51535 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_TAM0.1 EDITABLE
const KAT_TAM0 = 120, KAT_TAM_THEM = 38;
// PLAYER_PART_END s4.KAT_TAM0.1

// index.html:51539 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_CHEM_THUONG.1 EDITABLE
const KAT_CHEM_THUONG = 3, KAT_DMG0 = 4, KAT_DMG1 = 6;
// PLAYER_PART_END s4.KAT_CHEM_THUONG.1

// index.html:51541 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_LOAN_SO.1 EDITABLE
const KAT_LOAN_SO = 6, KAT_LOAN_DMG = 1, KAT_LOAN_VOT = -9, KAT_LOAN_CHO = 16;
// PLAYER_PART_END s4.KAT_LOAN_SO.1

// index.html:51542 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_VOID_KHUNG.1 EDITABLE
const KAT_VOID_KHUNG = 120, KAT_VOID_HUT = 90;
// PLAYER_PART_END s4.KAT_VOID_KHUNG.1

// index.html:51543 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_JC_DMG.1 EDITABLE
const KAT_JC_DMG = 2, KAT_JC_CD = 12;
// PLAYER_PART_END s4.KAT_JC_DMG.1

// index.html:51544 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_JC_TAM.1 EDITABLE
const KAT_JC_TAM = 320, KAT_JC_R = 62;
// PLAYER_PART_END s4.KAT_JC_TAM.1

// index.html:51545 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_JC_TOC.1 EDITABLE
const KAT_JC_TOC = 15, KAT_JC_DAT = 312;
// PLAYER_PART_END s4.KAT_JC_TOC.1

// index.html:51546 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_RAPID_DMG.1 EDITABLE
const KAT_RAPID_DMG = 2, KAT_RAPID_SO = 6, KAT_RAPID_XA = 210, KAT_LUOT_CHO = 22;
// PLAYER_PART_END s4.KAT_RAPID_DMG.1

// index.html:51547 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_HAT_DMG.1 EDITABLE
const KAT_HAT_DMG = 4, KAT_HAT_KHUNG = 120;
// PLAYER_PART_END s4.KAT_HAT_DMG.1

// index.html:51548 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_HAT_LEN.1 EDITABLE
const KAT_HAT_LEN = 24, KAT_HAT_TOC = 5;
// PLAYER_PART_END s4.KAT_HAT_LEN.1

// index.html:51550 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_C1_DMG.1 EDITABLE
const KAT_C1_DMG = 4,  KAT_C1_XA = 150, KAT_C1_LUOT = 118;
// PLAYER_PART_END s4.KAT_C1_DMG.1

// index.html:51551 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_C2_DMG.1 EDITABLE
const KAT_C2_DMG = 4,  KAT_C2_SO = 2;
// PLAYER_PART_END s4.KAT_C2_DMG.1

// index.html:51552 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_C3_NHIP.1 EDITABLE
const KAT_C3_NHIP = 30, KAT_C3_DMG = 1, KAT_C3_TONG = 10;
// PLAYER_PART_END s4.KAT_C3_NHIP.1

// index.html:51556 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_C4_KHUNG.1 EDITABLE
const KAT_C4_KHUNG = 180, KAT_C4_DMG = 3, KAT_C4_LAN = 2;
// PLAYER_PART_END s4.KAT_C4_KHUNG.1

// index.html:51557 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_C4_KET_DMG.1 EDITABLE
const KAT_C4_KET_DMG = 5, KAT_C4_KET_R = 150;
// PLAYER_PART_END s4.KAT_C4_KET_DMG.1

// index.html:51558 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_C5_DMG.1 EDITABLE
const KAT_C5_DMG = 10, KAT_C5_R = 230, KAT_C5_IF = 70;
// PLAYER_PART_END s4.KAT_C5_DMG.1

// index.html:51559 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_CH_MAX.1 EDITABLE
const KAT_CH_MAX = 5, KAT_CH_DMG = 1, KAT_CH_BAN = 4;
// PLAYER_PART_END s4.KAT_CH_MAX.1

// index.html:51560 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_ULT_HANG.1 EDITABLE
const KAT_ULT_HANG = 4;
// PLAYER_PART_END s4.KAT_ULT_HANG.1

// index.html:51562 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katMuc.1 EDITABLE
function katMuc(){ return (typeof allTargets === 'function') ? allTargets() : []; }
// PLAYER_PART_END s4.katMuc.1

// index.html:51566 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katFx.1 EDITABLE
function katFx(p, kind, R){
            // Chi goi hoat anh nhat chem GOC. Cay kiem do `drawDinoSwordArt` ve va da bam
            // dung goc cua vet chem, khong duoc ve chong them cay thu hai.
            if (typeof p._slashFx === 'function') p._slashFx(kind, p.isFacingLeft, R);
        }
// PLAYER_PART_END s4.katFx.1

// index.html:51572 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katVeLuoi.1 EDITABLE
function katVeLuoi(x, y, ang, dai, sc){
            ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
            let L = dai, W = 3.4 * sc;
            ctx.beginPath();
            ctx.moveTo(0, -W);
            ctx.quadraticCurveTo(L * 0.62, -W * 1.35, L, -W * 0.30);   // song
            ctx.lineTo(L * 1.06, 0);                                    // kissaki
            ctx.quadraticCurveTo(L * 0.60, W * 0.70, 0, W);             // luoi
            ctx.closePath();
            ctx.fillStyle = '#EDF3F8'; ctx.fill();
            ctx.strokeStyle = '#9AA7B2'; ctx.lineWidth = 1; ctx.stroke();
            ctx.strokeStyle = '#FFFFFF'; ctx.globalAlpha = 0.9; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(2, W * 0.35);
            ctx.quadraticCurveTo(L * 0.60, W * 0.30, L * 1.02, 0); ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#37474F'; ctx.fillRect(-3 * sc, -6 * sc, 3 * sc, 12 * sc);      // tsuba
            ctx.fillStyle = '#1B1B22'; ctx.fillRect(-16 * sc, -2.4 * sc, 13 * sc, 4.8 * sc); // tsuka
            ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 1;
            for (let i = 0; i < 4; i++){
                ctx.beginPath(); ctx.moveTo(-15 * sc + i * 3 * sc, -2.4 * sc);
                ctx.lineTo(-13 * sc + i * 3 * sc, 2.4 * sc); ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.katVeLuoi.1

// index.html:51596 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katTrung.1 EDITABLE
function katTrung(p, tam, cao, dmg, moi){
            let dir = p.isFacingLeft ? -1 : 1, mep = dir > 0 ? (p.x + p.w) : p.x, n = 0;
            for (const o of katMuc()){
                if (!o || o.hp === undefined || o.hp <= 0) continue;
                let d = dir > 0 ? (o.x - mep) : (mep - (o.x + (o.w||20)));
                if (d < -30 || d > tam) continue;
                if (Math.abs((o.y + (o.h||20)/2) - (p.y + p.h/2)) > cao) continue;
                o.hp -= dmg; n++;
                if (moi) moi(o);
            }
            return n;
        }
// PLAYER_PART_END s4.katTrung.1

// index.html:51611 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katVeCat.1 EDITABLE
function katVeCat(p, x, y, r, ang){
            if (!p.katCat) p.katCat = [];
            p.katCat.push({ x: x, y: y, r: r, t: 0, T: 16, ang: ang });
            while (p.katCat.length > 40) p.katCat.shift();
        }
// PLAYER_PART_END s4.katVeCat.1

// index.html:51617 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katVeChargeJ.1 EDITABLE
function katVeChargeJ(p){
            if (!(p.katJ > 0)) return;
            let cx = p.x + p.w/2, cy = p.y - 26, R = 22;
            let k = Math.min(1, p.katJ / KAT_J_TRAN);
            let mau = p.katJ >= KAT_J_TRAN ? '#FF5252' : (p.katJ >= KAT_J2 ? '#FFD54F' : '#8BE9FF');
            ctx.save();
            ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.lineWidth = 7;
            ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.stroke();
            ctx.strokeStyle = mau; ctx.lineWidth = 5;
            ctx.shadowBlur = 10; ctx.shadowColor = mau;
            ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI/2, -Math.PI/2 + Math.PI*2*k); ctx.stroke();
            ctx.shadowBlur = 0;
            for (const m of [KAT_J1, KAT_J2, KAT_J_TRAN]){   // @@HE-MOCCHARGE2: vach 105 khong doi don nao -> bo
                let ang = -Math.PI/2 + Math.PI*2*(m / KAT_J_TRAN), qua = p.katJ >= m;
                ctx.strokeStyle = qua ? '#FFFFFF' : 'rgba(0,0,0,0.7)'; ctx.lineWidth = qua ? 3 : 2;
                ctx.beginPath();
                ctx.moveTo(cx + Math.cos(ang)*(R-6), cy + Math.sin(ang)*(R-6));
                ctx.lineTo(cx + Math.cos(ang)*(R+6), cy + Math.sin(ang)*(R+6));
                ctx.stroke();
            }
            if (p.katJ >= KAT_J_TRAN){
                ctx.fillStyle = '#FF5252'; ctx.font = 'bold 10px Consolas, monospace'; ctx.textAlign = 'center';
                ctx.fillText('VOID', cx, cy - R - 6); ctx.textAlign = 'left';
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.katVeChargeJ.1

// index.html:51645 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katVeMoc.1 EDITABLE
function katVeMoc(p){
            if (p.katRT){
                let T = p.katRT;
                ctx.save(); ctx.globalAlpha = 0.95; ctx.shadowBlur = 10; ctx.shadowColor = '#B3E5FC';
                // Cay kiem nem ra phai TO — bang co cay kiem tren tay, khong phai mot cai gai.
                katVeLuoi(T.x, T.y, T.t * 0.55, 52, 1.75);
                ctx.globalAlpha = 0.22; ctx.strokeStyle = '#B3E5FC'; ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.arc(T.x, T.y, 50, 0, Math.PI*2); ctx.stroke();
                ctx.restore();
            }
            if (p.katBong){
                ctx.save();
                for (let i = p.katBong.length - 1; i >= 0; i--){
                    let B = p.katBong[i], k = B.t / 22;
                    ctx.globalAlpha = Math.max(0, 0.85 - k);
                    katVeLuoi(B.x, B.y, B.a + Math.PI/2, 34, 1.1);
                    ctx.strokeStyle = '#8BE9FF'; ctx.lineWidth = 2; ctx.globalAlpha = Math.max(0, 0.6 - k);
                    ctx.beginPath();
                    ctx.moveTo(B.x - Math.cos(B.a)*46, B.y - Math.sin(B.a)*46);
                    ctx.lineTo(B.x + Math.cos(B.a)*46, B.y + Math.sin(B.a)*46);
                    ctx.stroke();
                    if (++B.t > 22) p.katBong.splice(i, 1);
                }
                ctx.restore();
                if (!p.katBong.length) p.katBong = null;
            }
            // (mui khoan Deep Stinger duoc ve o lop TREN — xem `veKhoanTren`)
        }
// PLAYER_PART_END s4.katVeMoc.1

// index.html:51674 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katVeVongNo.1 EDITABLE
function katVeVongNo(p){
            if (!p.katVongNo || !p.katVongNo.length) return;
            ctx.save();
            for (let i = p.katVongNo.length - 1; i >= 0; i--){
                let V = p.katVongNo[i], k = V.t / V.T;
                let R = KAT_JC_R * (0.55 + 0.75 * k);
                ctx.globalAlpha = Math.max(0, 0.9 - k);
                ctx.strokeStyle = '#4FC3F7'; ctx.lineWidth = 3.5 * (1 - k) + 1;
                ctx.shadowBlur = 14; ctx.shadowColor = '#4FC3F7';
                ctx.beginPath(); ctx.arc(V.x, V.y, R, 0, Math.PI*2); ctx.stroke();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = Math.max(0, 0.45 - k * 0.45);
                ctx.strokeStyle = '#E1F5FE'; ctx.lineWidth = 1.4;
                ctx.beginPath(); ctx.arc(V.x, V.y, R * 0.72, 0, Math.PI*2); ctx.stroke();
                if (++V.t > V.T) p.katVongNo.splice(i, 1);
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.katVeVongNo.1

// index.html:51692 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katVeTia.1 EDITABLE
function katVeTia(p){
            if (!p.katTia || !p.katTia.length) return;
            ctx.save(); ctx.lineCap = 'round';
            for (const T of p.katTia){
                ctx.globalAlpha = 0.85;
                ctx.strokeStyle = '#4FC3F7'; ctx.lineWidth = 5;
                ctx.shadowBlur = 12; ctx.shadowColor = '#4FC3F7';
                ctx.beginPath(); ctx.moveTo(T.x - T.dir * 34, T.y); ctx.lineTo(T.x + T.dir * 12, T.y); ctx.stroke();
                ctx.shadowBlur = 0;
                ctx.strokeStyle = '#E1F5FE'; ctx.lineWidth = 1.8;
                ctx.beginPath(); ctx.moveTo(T.x - T.dir * 28, T.y); ctx.lineTo(T.x + T.dir * 10, T.y); ctx.stroke();
                ctx.globalAlpha = 0.30; ctx.strokeStyle = '#4FC3F7'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(T.x - T.dir * 62, T.y); ctx.lineTo(T.x - T.dir * 30, T.y); ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.katVeTia.1

// index.html:51708 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katVeTat.1 EDITABLE
function katVeTat(p){
            if (!p.katCat || !p.katCat.length) return;
            ctx.save(); ctx.lineCap = 'round';
            for (let i = p.katCat.length - 1; i >= 0; i--){
                let c = p.katCat[i];
                let k = c.t / c.T;
                ctx.globalAlpha = Math.max(0, 1 - k);
                ctx.strokeStyle = '#8BE9FF'; ctx.lineWidth = 2.6;
                ctx.beginPath();
                ctx.moveTo(c.x - Math.cos(c.ang)*c.r, c.y - Math.sin(c.ang)*c.r);
                ctx.lineTo(c.x + Math.cos(c.ang)*c.r, c.y + Math.sin(c.ang)*c.r);
                ctx.stroke();
                ctx.globalAlpha = Math.max(0, 0.5 - k*0.5); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1.1;
                ctx.stroke();
                if (++c.t > c.T) p.katCat.splice(i, 1);
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.katVeTat.1

// index.html:51726 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katVeVong.1 EDITABLE
function katVeVong(p){
            if (p.katPhong && p.katPhong.length){
                ctx.save();
                for (const S of p.katPhong){
                    if (S.t <= 0) continue;
                    ctx.globalAlpha = S.pha === 'vang' ? Math.max(0, 1 - S.t / 32) : 0.95;
                    ctx.shadowBlur = 8; ctx.shadowColor = '#B3E5FC';
                    katVeLuoi(S.x - Math.cos(S.a) * 20, S.y - Math.sin(S.a) * 20, S.a, 30, 0.9);
                }
                ctx.restore();
            }
            if (!p.katVong) return;
            let V = p.katVong, cx = p.x + p.w/2, cy = p.y + p.h/2;
            ctx.save();
            for (let i = 0; i < V.n; i++){
                let a = V.t * 0.11 + i * (Math.PI*2 / Math.max(1, V.n));
                let sx = cx + Math.cos(a)*76, sy = cy + Math.sin(a)*60;
                ctx.save(); ctx.globalAlpha = 0.95; ctx.shadowBlur = 8; ctx.shadowColor = '#B3E5FC';
                katVeLuoi(sx, sy, a + Math.PI/2, 26, 0.85);
                ctx.restore();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.katVeVong.1

// index.html:51751 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katJBam.1 EDITABLE
function katJBam(p){
            /* Duong J o tang nhap phim chay MOI KHUNG khi con giu (dieu kien la `fireKey`,
               khong phai canh len). Binh thuong `attackCooldown` chan lai, nhung cu TICH thi
               khong dat hoi don nao — nen no bi goi lai 50 lan/giay va `katJ` bi dat lai ve 1
               mai mai: do duoc katJ = 1 suot 50 khung. Dang tich roi thi thoi. */
            if (p.katJ > 0) return;
            if (p.katKhoan || (p._katNuotJ || 0) > 0) return;   // Deep Stinger dang chay / vua ket som bang J
            /* DASH -> J giu nguyen don chem co san cua Kiem (Shippuuga). J THU HAI ngay sau
               do moi la cu chem LEN hat tung. Rapid Slash la J -> DASH, xu ly trong `katTick`.
               Ban truoc toi lam nguoc: Dash -> J thanh Rapid Slash, mat luon don goc. */
            /* Dang giua cu Rapid Slash thi KHONG duoc chen don khac vao. Truoc day
               `katRapid` mo cua so J2 ngay luc bat dau, ma phim J thi van dang giu, nen
               ngay khung sau da nhay sang Rising Star — do duoc z_dash 0 lan, tuc Rapid
               Slash chua kip ra mot nhat nao. Cua so J2 gio mo khi Rapid Slash KET THUC. */
            if (p.katRapid) return;
            if ((p.katRapidCS || 0) > 0 && (p.katRapidGiu || p.katJSan)){
                p.katJSan = 0; katHatTung(p); return;
            }
            /* MOI don DUOI DAY phai la mot cu BAM MOI (`katJSan`). Duong J o tang nhap phim
               chay MOI KHUNG khi con giu, nen khong chot lai thi giu J trong luc luot se goi
               `clawSlash` 50 lan/giay — mot phat het sach 6 vien dan. */
            if (typeof dangLuotHoacChop === 'function' && p.grounded && dangLuotHoacChop()){
                if (!p.katJSan) return;
                p.katJSan = 0;
                p.clawSlash(); p.katRapidCS = 34; p.katRapidGiu = 0; return;
            }
            /* KATANA chi thay nhung gi ban thiet ke rieng cho no. Con lai VAN LA DINOSWORD:
               tren khong bam J = KUUENZAN, S + J tren khong = HYOURETSUZAN, va cua so bam
               NHAY sau nhat chem = RYUENJIN. Ban truoc tren khong toi cho roi thang xuong
               nhanh "tich J", nen mat sach bo don khong cua Kiem. */
            if (!p.grounded){ if (!p.katJSan) return; p.katJSan = 0; p.clawSlash(); return; }
            if (p.isCrouching || keys['KeyS']){ if (!p.katJSan) return; p.katJSan = 0; katJudgeNho(p); return; }
            if (p.isOverheated || p.ammo <= 0) return;
            p.katJ = 1;                                  // bat dau tich, nha ra moi chem
            p.katLuotCho = KAT_LUOT_CHO;                 // bam J roi luot ngay = Rapid Slash
        }
// PLAYER_PART_END s4.katJBam.1

// index.html:51787 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katNhaJ.1 EDITABLE
function katNhaJ(p, n){
            if (p.isOverheated || p.ammo <= 0) return;
            p.ammo = Math.max(0, p.ammo - 1);
            let dir = p.isFacingLeft ? -1 : 1;
            let h = Math.min(n, KAT_J_TRAN);
            if (h >= KAT_J_TRAN){
                // VOID SLASH — chem ngang roi bat dong muc tieu 2 giay
                let tam = KAT_TAM0 + KAT_TAM_THEM;
                katFx(p, 'z_horz', tam);        // Void Slash la nhat chem NGANG
                p._beginSlash(KAT_CHEM_THUONG, 14, dir, tam, 26, 26, 0);
                /* "cleaving the air itself and DRAWING ENEMIES TOWARD YOU" — ngoai bat dong
                   thi no con HUT muc tieu ve phia minh. Truoc toi chi lam phan bat dong. */
                let _mx = p.x + p.w/2;
                let dinh = katTrung(p, tam, 60, 0, o => {
                    if (typeof venKhoa === 'function') venKhoa(o, KAT_VOID_KHUNG);
                    let ox = o.x + (o.w||20)/2;
                    o.x += Math.sign(_mx - ox) * Math.min(KAT_VOID_HUT, Math.abs(_mx - ox) - 40);
                });
                p.attackCooldown = 26;
                floatingTexts.push(new FloatingText(p.x - 26, p.y - 34, "VOID SLASH"));
                shakeTimer = Math.max(shakeTimer, 24);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(180, 0.30, 'sawtooth', 0.26, 70);
                return dinh;
            }
            if (h >= KAT_J2){
                // 1.25-1.75s — LUOT LEN, chem mot nhat, roi chem loan xa quanh nguoi
                let tam = KAT_TAM0 + KAT_TAM_THEM;
                p.dy = KAT_LOAN_VOT; p.grounded = false; p.canDoubleJump = true;
                katFx(p, 'z_horz', tam);        // moc 2: LUOT LEN roi chem NGANG
                p._beginSlash(KAT_CHEM_THUONG, 12, dir, tam, 34, 24, 0);
                // "chem mot phat ngang roi THU KIEM VE, sau do tu dung vo van nhat chem"
                p.katLoan = { t: 0, n: 0, cho: KAT_LOAN_CHO };
                p.attackCooldown = 30;
                floatingTexts.push(new FloatingText(p.x - 24, p.y - 34, "BATTOUSAI!"));
                return;
            }
            p.katLuotCho = KAT_LUOT_CHO;                 // nha J roi luot ngay cung tinh
            if (h < KAT_J1){
                /* CHAM J = nhat chem thuong, va HAI nhat lien nhau la XUONG roi LEN. */
                if ((p.katCS || 0) <= 0) p.katBuoc = 0;
                let xuong = (p.katBuoc || 0) === 0;
                katFx(p, 'z_horz', KAT_TAM0);   // Hans: J charge LUON la vung NGANG
                p._beginSlash(KAT_CHEM_THUONG, 10, dir, KAT_TAM0, 22, 22, 0);
                p.katBuoc = xuong ? 1 : 0; p.katCS = 40;
                p.clawRiseWindow = 38;          // van mo cua so NHAY -> RYUENJIN cua Kiem
                p.attackCooldown = 14;
                return;
            }
            // 0.25-1.25s — chem don, ngang, nhanh. Tam va sat thuong len dan theo thoi gian.
            let k = Math.max(0, Math.min(1, (h - KAT_J1) / (KAT_J2 - KAT_J1)));
            let tam = Math.round(KAT_TAM0 + KAT_TAM_THEM * k);
            let dmg = Math.round(KAT_DMG0 + (KAT_DMG1 - KAT_DMG0) * k);
            katFx(p, 'z_horz', tam);        // Battousai: chem don, ngang, nhanh
            p._beginSlash(dmg, 10, dir, tam, 22, 22, 0);
            p.clawRiseWindow = 38;
            p.attackCooldown = 14;
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(760, 0.07, 'square', 0.15, 1500);
        }
// PLAYER_PART_END s4.katNhaJ.1

// index.html:51845 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katJudgeNho.1 EDITABLE
function katJudgeNho(p){
            if ((p.katJcCd || 0) > 0 || p.isOverheated || p.ammo <= 0) return;
            p.katJcCd = KAT_JC_CD;
            p.ammo = Math.max(0, p.ammo - 0.5);
            /* Judgement Cut khong no ngay: no PHONG MOT DUONG KIEM XANH chay sat mat dat,
               cham vao ke dich moi bung ra thanh vung meo khong gian. */
            let dir = p.isFacingLeft ? -1 : 1;
            if (!p.katTia) p.katTia = [];
            p.katTia.push({ x: p.x + p.w/2 + dir * 20, y: KAT_JC_DAT, dir: dir, t: 0 });
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1200, 0.05, 'square', 0.10, 2000);
        }
// PLAYER_PART_END s4.katJudgeNho.1

// index.html:51857 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katRapid.1 EDITABLE
function katRapid(p){
            if (p.katRapid || p.isOverheated || p.ammo <= 0) return;
            p.ammo = Math.max(0, p.ammo - 1);
            let dir = p.isFacingLeft ? -1 : 1;
            p.katRapid = { t: 0, n: 0, dir: dir, x0: p.x, hit: new Set() };
            p.attackCooldown = 10;
            floatingTexts.push(new FloatingText(p.x - 24, p.y - 30, "RAPID SLASH"));
        }
// PLAYER_PART_END s4.katRapid.1

// index.html:51865 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katHatTung.1 EDITABLE
function katHatTung(p){
            if (p.katTreo > 0) return;
            p.katRapidCS = 0; p.katRapid = null;
            let dir = p.isFacingLeft ? -1 : 1;
            katFx(p, 'z_rise', 140);        // Rising Star: chem HAT LEN
            p._beginSlash(KAT_HAT_DMG, 14, dir, 140, 50, 10, 0);
            /* Rising Star: "Ascend while attacking, lifting them off the ground" — mot cu
               XOAY LEN keo ca minh lan doi phuong len, khong phai mot cu nhun mot cai. */
            p.dy = -11; p.grounded = false; p.canDoubleJump = true;
            p.katTreo = KAT_HAT_KHUNG; p.katLen = 26;
            /* `venKhoa` dong bang muc tieu (`_uFreeze`) nen dat `dy = -12` khong an thua:
               no bi khoa nen khong roi ma cung khong bay. Phai TU NANG `y` suot pha hat. */
            katTrung(p, 140, 70, 0, o => {
                if (o.dy !== undefined && o.grounded !== undefined){ o.dy = -12; o.grounded = false; }
                if (typeof venKhoa === 'function') venKhoa(o, KAT_HAT_KHUNG);
                o._katTreo = KAT_HAT_KHUNG; o._katLen = KAT_HAT_LEN;
            });
            p.attackCooldown = 18;
            floatingTexts.push(new FloatingText(p.x - 20, p.y - 34, "HẤT TUNG!"));
            shakeTimer = Math.max(shakeTimer, 16);
        }
// PLAYER_PART_END s4.katHatTung.1

// index.html:51887 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katStinger.1 EDITABLE
function katStinger(p, sau){
            if (p.isOverheated || p.ammo <= 0) return;
            p.ammo = Math.max(0, p.ammo - 1);
            let dir = p.isFacingLeft ? -1 : 1;
            if (sau){ p.katKhoan = { t: 0, dir: dir, hit: {}, jCu: !!keys['KeyJ'], kCu: !!keys['KeyK'] }; p.attackCooldown = 20;
                      floatingTexts.push(new FloatingText(p.x - 28, p.y - 34, "DEEP STINGER")); return; }
            /* Stinger la mot cu DAM: luot xa hon han (46 -> 118px), va kiem khi ban ra la
               mot MUI DAM det chu khong phai vet quet cong. */
            p.x += dir * KAT_C1_LUOT;
            katFx(p, 'z_thrust', KAT_C1_XA);
            p._beginSlash(KAT_C1_DMG, 12, dir, KAT_C1_XA, 12, 12, 0);
            if (p.slashAtk) p.slashAtk.dam = 1;   // @@HE-HITFX: don DAM
            p.attackCooldown = 22;
            floatingTexts.push(new FloatingText(p.x - 18, p.y - 30, "STINGER"));
        }
// PLAYER_PART_END s4.katStinger.1

// index.html:51902 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katDrive.1 EDITABLE
function katDrive(p){
            if (p.isOverheated || p.ammo <= 0) return;
            p.ammo = Math.max(0, p.ammo - 1);
            p.katDrive = { t: 0, n: 0 };
            p.attackCooldown = 26;
            floatingTexts.push(new FloatingText(p.x - 16, p.y - 30, "DRIVE"));
        }
// PLAYER_PART_END s4.katDrive.1

// index.html:51909 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katRoundTrip.1 EDITABLE
function katRoundTrip(p){
            if (p.isOverheated || p.ammo <= 0) return;
            p.ammo = Math.max(0, p.ammo - 1);
            let m = null, d0 = 1e9, cx = p.x + p.w/2;
            for (const o of katMuc()){
                if (!o || o.hp === undefined || o.hp <= 0) continue;
                let d = Math.abs((o.x + (o.w||20)/2) - cx);
                if (d < d0){ d0 = d; m = o; }
            }
            if (!m){ p.attackCooldown = 20; floatingTexts.push(new FloatingText(p.x - 14, p.y - 30, "HỤT!")); return; }
            /* "Throw the sword like a boomerang" — bay RA, xoay tai cho, roi QUAY VE tay.
               Ban truoc toi cam thang no o vi tri dich, khong he bay va khong he ve. */
            let dir = p.isFacingLeft ? -1 : 1;
            p.katRT = { o: m, t: 0, tong: 0, pha: 'bay', dir: dir,
                        x: p.x + p.w/2, y: p.y + p.h/2,
                        tx: m.x + (m.w||20)/2, ty: m.y + (m.h||20)/2, cd: 0 };
            p.attackCooldown = 24;
            floatingTexts.push(new FloatingText(p.x - 24, p.y - 34, "ROUND TRIP"));
        }
// PLAYER_PART_END s4.katRoundTrip.1

// index.html:51928 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katJCE.1 EDITABLE
function katJCE(p){
            if (p.isOverheated || p.ammo <= 0) return;
            p.ammo = Math.max(0, p.ammo - 2);
            /* "Slash your foes with such speed that you APPEAR AT MULTIPLE PLACES AT ONCE" —
               nhay chop quanh muc tieu, moi diem mot nhat, roi dung lai. */
            let dir = p.isFacingLeft ? -1 : 1;
            let tx = p.x + p.w/2 + dir * 90, ty = p.y + p.h/2, dg = 1e9;
            for (const o of katMuc()){
                if (!o || o.hp === undefined || o.hp <= 0) continue;
                let ox = o.x + (o.w||20)/2, oy = o.y + (o.h||20)/2;
                let d = Math.hypot(ox - (p.x+p.w/2), oy - (p.y+p.h/2));
                if (d < dg){ dg = d; tx = ox; ty = oy; }
            }
            p.katBong = [];
            for (let i = 0; i < 5; i++){
                let a = -Math.PI/2 + i * (Math.PI*2/5);
                p.katBong.push({ x: tx + Math.cos(a) * 96, y: ty + Math.sin(a) * 62, t: 0, a: a });
            }
            p.x = tx - p.w/2 - dir * 40; p.y = ty - p.h/2;
            p.invulnTimer = Math.max(p.invulnTimer || 0, KAT_C5_IF);
            let cx = tx, cy = ty;
            for (const o of katMuc()){
                if (!o || o.hp === undefined || o.hp <= 0) continue;
                let ox = Math.max(o.x, Math.min(cx, o.x + (o.w||20)));
                let oy = Math.max(o.y, Math.min(cy, o.y + (o.h||20)));
                if (Math.hypot(ox-cx, oy-cy) < KAT_C5_R) o.hp -= KAT_C5_DMG;
            }
            katFx(p, 'z_spin', KAT_C5_R * 0.7);
            for (let i = 0; i < 14; i++)
                katVeCat(p, cx + (Math.random()-0.5)*KAT_C5_R*1.6, cy + (Math.random()-0.5)*KAT_C5_R*1.2,
                         30 + Math.random()*50, Math.random()*Math.PI);
            p.attackCooldown = 40;
            shakeTimer = Math.max(shakeTimer, 34);
            floatingTexts.push(new FloatingText(p.x - 40, p.y - 40, "JUDGEMENT CUT END"));
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(140, 0.35, 'sawtooth', 0.28, 60); SFX.tone(1400, 0.2, 'square', 0.14, 2400); }
        }
// PLAYER_PART_END s4.katJCE.1
