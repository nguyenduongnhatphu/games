// PLAYER_FILE: DAIKIEM03
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: BZ_DRAIN_T, BZ_G, DK_CHAY, DK_CH_NHIP, DK_CM, DK_DAN, DK_JC_CM, DK_JC_DMG, DK_JC_K, DK_JC_MOC, DK_MAU, DK_NOVA_MOC, ammoToiDa, bzBat, bzBatDau, bzGaiVe, bzGiapSang, bzGiuPose, bzLienHoanTiep, bzNapRa, bzNhap, bzSau, bzTuThuong, camX, camY, canvas, combatStance, ctx, dangLuotHoacChop, dashVx, dino, dino2, dkApVT, dkBatDau, dkBocUpd, dkChan, dkChu, dkCua, dkDanh, dkDiaChan, dkDir, dkDs, dkDungYen, dkEm, dkGoBoc, dkHop, dkHopDon, dkLaBoss, dkLaQuai, dkMatDuoi, dkMucSan, dkNenY, dkNhayDapTick, dkNovaOn, dkPose, dkRaDon, dkSfx, dkTG, dkTieuJ, dkXong, frames, gameState, hitCat, hitDat, parry, setCanApDon, shakeTimer, venKhoa, worldCX, worldL, worldR
// index.html:74505 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzVeGiapMay.1 EDITABLE
function bzVeGiapMay(bx, by, cs, br, crouch, airborne){
            if (typeof bzBat !== 'function' || !bzBat(dino)) return;
            const G = bzGiapSang(), dy = crouch ? 8 : 0, ph = airborne ? 0 : Math.sin(frames * 0.26);
            const rd = (a) => 'rgba(255,23,68,' + a.toFixed(2) + ')';
            ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1.1;
            // ---- DUOI: 3 doan boc giap + gai + luoi dao
            for (let i = 0; i < 3; i++){
                let x = bx + 4 - i * 8, y = by + 19 + dy + i, w = 10 - i * 0.6;
                ctx.fillStyle = i % 2 ? '#17171c' : '#101013'; ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1.1;
                ctx.beginPath(); ctx.moveTo(x - 1.5, y - 1.5); ctx.lineTo(x + w + 1.5, y - 1.5); ctx.lineTo(x + w + 0.5, y + 9.5); ctx.lineTo(x - 0.5, y + 9.5); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.strokeStyle = rd(0.55 + 0.3 * G); ctx.lineWidth = 0.9; ctx.beginPath(); ctx.moveTo(x, y + 6); ctx.lineTo(x + w, y + 6); ctx.stroke();
                ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1;
                bzGaiVe(x + w * 0.55, y - 1, x + w * 0.55 - 4, y - 10 + i * 1.5, 2.8 - i * 0.3, -1.2, '#1d1d22', 0.6 * G);
            }
            bzGaiVe(bx - 15, by + 26 + dy, bx - 37, by + 22 + dy, 3.8, 2, '#1d1d22', 0.7 * G);         // luoi dao o mut duoi
            bzGaiVe(bx - 16, by + 28 + dy, bx - 30, by + 36 + dy, 2.6, -1.5, null, 0.5 * G);
            // ---- GAI LUNG tren nap than
            const H = [9, 14, 17, 15, 12, 8];
            for (let i = 0; i < 6; i++){
                let t = i / 5, x = bx + 11 + t * 25, y = by + 11.5 + dy - t * 0.6;
                bzGaiVe(x - 2.5, y + 1, x - 6 - (t > 0.5 ? 0 : 1), y - H[i], 3.4 - i * 0.1, -2, i % 2 ? '#1d1d22' : '#141418', 0.7 * G);
            }
            // ---- KHUNG NGUC DEN boc loi (loi doi sang do)
            let gt = ctx.createLinearGradient(bx + 8, by + 10 + dy, bx + 40, by + 34);
            gt.addColorStop(0, '#34343e'); gt.addColorStop(0.45, '#14141a'); gt.addColorStop(1, '#050507');
            ctx.beginPath();
            ctx.moveTo(bx + 8.5, by + 12.5 + dy); ctx.lineTo(bx + 37.5, by + 10.5 + dy); ctx.lineTo(bx + 42, by + 25); ctx.lineTo(bx + 40, by + 31);
            ctx.lineTo(bx + 23, by + 35); ctx.lineTo(bx + 9, by + 31); ctx.closePath();
            ctx.fillStyle = gt; ctx.fill(); ctx.stroke();
            ctx.lineWidth = 0.95;
            for (const v of [18, 24.5, 30]){                                                           // duong noi tam giap
                ctx.strokeStyle = '#3d3d48'; ctx.beginPath(); ctx.moveTo(bx + 9.5, by + v + dy * 0.7); ctx.lineTo(bx + 41, by + v - 1.5 + dy * 0.7); ctx.stroke();
                ctx.strokeStyle = rd(0.45 + 0.3 * G); ctx.beginPath(); ctx.moveTo(bx + 9.5, by + v + 1.2 + dy * 0.7); ctx.lineTo(bx + 40.5, by + v - 0.3 + dy * 0.7); ctx.stroke();
            }
            let cyc = by + 22 + dy * 0.2;                                                              // loi nang luong do
            ctx.fillStyle = '#16050a'; ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1.1;
            ctx.beginPath(); ctx.arc(bx + 22, cyc, 5.6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.save(); ctx.shadowBlur = 9 * G + 2; ctx.shadowColor = '#ff1744'; ctx.fillStyle = rd(0.6 + 0.4 * G);
            ctx.beginPath(); ctx.arc(bx + 22, cyc, 3.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
            ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1;
            bzGaiVe(bx + 41, by + 22 + dy * 0.3, bx + 51, by + 29, 3.2, -2, '#1d1d22', 0.6 * G);        // gai o hong truoc
            bzGaiVe(bx + 39, by + 29, bx + 46, by + 38, 2.8, -1.5, '#17171c', 0.5 * G);
            // ---- GIAP CHAN: dui + goi gai + ong chan + mui chan (theo dung nhip chan cua veDinoMay)
            const greave = (hx, st) => {
                let nen = crouch ? 7 : (airborne ? -1 : Math.max(0, st) * 5);
                let y0 = by + 20 + nen * 0.15, h0 = Math.max(3.2, 8 - nen * 0.45), h1 = Math.max(3.2, 7 - nen * 0.45), h2 = Math.max(3.2, 6 - nen * 0.45);
                let y1 = y0 + h0 - 1, y2 = y1 + h1 - 1, y3 = y2 + h2 - 1;
                let gl = ctx.createLinearGradient(hx - 8, y0, hx + 8, y3);
                gl.addColorStop(0, '#34343e'); gl.addColorStop(1, '#09090c');
                ctx.fillStyle = gl; ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 0.9;
                ctx.beginPath(); ctx.moveTo(hx - 9.5, y0 - 0.5); ctx.lineTo(hx + 9.5, y0 - 0.5); ctx.lineTo(hx + 8.5, y1 + 1.5); ctx.lineTo(hx - 8.5, y1 + 1.5); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(hx - 8, y1 + 1); ctx.lineTo(hx + 8, y1 + 1); ctx.lineTo(hx + 6.5, y3 + 0.6); ctx.lineTo(hx - 6.5, y3 + 0.6); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.strokeStyle = rd(0.5 + 0.3 * G); ctx.lineWidth = 0.9; ctx.beginPath(); ctx.moveTo(hx + 0.5, y1 + 2.5); ctx.lineTo(hx + 0.5, y3 - 0.5); ctx.stroke();
                ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 0.9;
                bzGaiVe(hx + 6.5, y1 + 0.5, hx + 17, y1 - 6, 3.4, -1.8, '#1d1d22', 0.7 * G);            // gai dau goi
                bzGaiVe(hx + 7.5, y3 + 2.4, hx + 17, y3 + 4, 2.3, 0.8, '#1d1d22', 0.5 * G);             // gai mui chan
            };
            if (!crouch){ greave(bx + 16, -ph); greave(bx + 30, ph); } else { greave(bx + 16, 1); greave(bx + 30, 1); }
            // ---- GIAP VAI nhieu lop + 3 gai (khop vai cua robot o bx+33)
            for (let i = 2; i >= 0; i--){
                let cx0 = bx + 31 - i * 1.3, cy0 = by + 16 + dy + i * 3.4, rx = 12.5 - i * 1.5, ry = 6.2 - i * 0.4;
                let g = ctx.createLinearGradient(cx0 - rx, cy0 - ry, cx0 + rx, cy0 + 2);
                g.addColorStop(0, '#3a3a46'); g.addColorStop(0.5, '#16161c'); g.addColorStop(1, '#07070a');
                ctx.beginPath(); ctx.ellipse(cx0, cy0, rx, ry, -0.2, Math.PI, 0); ctx.quadraticCurveTo(cx0 + rx * 0.2, cy0 + 3.6, cx0 - rx, cy0 + 0.6); ctx.closePath();
                ctx.fillStyle = g; ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1.1; ctx.fill(); ctx.stroke();
                ctx.save(); ctx.strokeStyle = rd(0.5 + 0.35 * G); ctx.lineWidth = 0.9;
                ctx.beginPath(); ctx.ellipse(cx0, cy0 + 0.6, rx - 1.2, ry - 0.7, -0.2, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke(); ctx.restore();
            }
            let sx = bx + 31, sy = by + 16 + dy;
            ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1.1;
            bzGaiVe(sx + 7, sy - 4.5, sx + 15, sy - 13, 3.6, -3, '#1d1d22', 0.8 * G);
            bzGaiVe(sx + 1, sy - 6, sx - 0.5, sy - 18, 3.9, 2.2, '#222229', 0.8 * G);
            bzGaiVe(sx - 7, sy - 4, sx - 15, sy - 11, 3.4, 3, '#1d1d22', 0.8 * G);
            // ---- MU SUNG: tam che dau, 2 sung + gai dinh, mat do (che mat xanh cu)
            let gh = ctx.createLinearGradient(bx + 38, by + 3 + dy, bx + 60, by + 14 + dy);
            gh.addColorStop(0, '#3a3a46'); gh.addColorStop(0.5, '#15151b'); gh.addColorStop(1, '#060608');
            ctx.beginPath();
            ctx.moveTo(bx + 37, by + 7 + dy); ctx.lineTo(bx + 41, by + 2.5 + dy); ctx.lineTo(bx + 57, by + 4.5 + dy); ctx.lineTo(bx + 61, by + 13 + dy);
            ctx.lineTo(bx + 56, by + 13.5 + dy); ctx.lineTo(bx + 41, by + 12 + dy); ctx.closePath();
            ctx.fillStyle = gh; ctx.fill(); ctx.stroke();
            ctx.save(); ctx.strokeStyle = rd(0.55 + 0.3 * G); ctx.lineWidth = 0.9;
            ctx.beginPath(); ctx.moveTo(bx + 40, by + 4.5 + dy); ctx.lineTo(bx + 58, by + 6.2 + dy); ctx.stroke(); ctx.restore();
            ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1.1;
            bzGaiVe(bx + 40.5, by + 4 + dy, bx + 24, by - 10 + dy, 3.6, -4.5, '#222229', 0.8 * G);          // sung lon cong ra sau
            bzGaiVe(bx + 45, by + 3.2 + dy, bx + 34, by - 8 + dy, 2.8, -3.2, '#1d1d22', 0.8 * G);           // sung nho
            bzGaiVe(bx + 51, by + 3.6 + dy, bx + 55, by - 5 + dy, 2.4, 1.2, '#1d1d22', 0.8 * G);            // gai dinh dau
            ctx.fillStyle = '#05080a';                                                                      // che mat xanh cu
            ctx.beginPath(); ctx.arc(bx + 50, by + 11 + dy, 3.9, 0, Math.PI * 2); ctx.fill();
            ctx.save(); ctx.shadowBlur = 7 * G + 2; ctx.shadowColor = '#ff1744'; ctx.fillStyle = BZ_G.do;
            ctx.beginPath(); ctx.moveTo(bx + 45.5, by + 9.4 + dy); ctx.lineTo(bx + 55, by + 10.2 + dy); ctx.lineTo(bx + 53, by + 12 + dy); ctx.lineTo(bx + 46.8, by + 11.6 + dy); ctx.closePath(); ctx.fill();
            ctx.restore();
            bzGaiVe(bx + 43, by + 22 + dy, bx + 40, by + 30 + dy, 2.4, 1, '#1d1d22', 0.6 * G);             // gai ham
            ctx.restore();
        }
// PLAYER_PART_END s4.bzVeGiapMay.1

// index.html:74599 · Phạm vi: global
// PLAYER_PART_BEGIN s4.veBzGiapThan.1 EDITABLE
function veBzGiapThan(bx, by, cs, br, may){
            if (typeof bzBat !== 'function' || !bzBat(dino)) return;
            if (may) return veBzGiapThanCu(bx, by, cs, br, true);
            const Y = (v, k) => by + v + cs * k + br, G = bzGiapSang();
            const qp = (p0, c, p1, t) => { let u = 1 - t; return [u*u*p0[0]+2*u*t*c[0]+t*t*p1[0], u*u*p0[1]+2*u*t*c[1]+t*t*p1[1]]; };
            const tg = (p0, c, p1, t) => { let a = qp(p0, c, p1, Math.max(0, t - 0.02)), b = qp(p0, c, p1, Math.min(1, t + 0.02)), dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
                let nx = dy / L, ny = -dx / L; if (ny > 0){ nx = -nx; ny = -ny; } return { tx: dx / L, ty: dy / L, nx, ny }; };
            ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1.1;
            // ---- DUOI: bang giap doan + gai + luoi dao o mut duoi
            let T0 = [bx + 7, by + 18 + cs * 10 + br], TC = [bx - 11, by + 15 + cs * 12], T1 = [bx - 21, by + 6 + cs * 12];
            for (const t of [0.16, 0.38, 0.6, 0.8]){
                let r = qp(T0, TC, T1, t), n = tg(T0, TC, T1, t), w = 6.2 - t * 4;
                ctx.beginPath(); ctx.moveTo(r[0] + n.nx * w, r[1] + n.ny * w); ctx.lineTo(r[0] - n.nx * w, r[1] - n.ny * w);
                ctx.lineWidth = 4.6; ctx.strokeStyle = '#000'; ctx.stroke();
                ctx.lineWidth = 3; ctx.strokeStyle = BZ_G.nua; ctx.stroke();
                ctx.lineWidth = 1; ctx.strokeStyle = BZ_G.vien;
                bzGaiVe(r[0] + n.nx * (w - 1), r[1] + n.ny * (w - 1), r[0] + n.nx * (w + 7 - t * 4) - n.tx * 3, r[1] + n.ny * (w + 7 - t * 4) - n.ty * 3, 2.4 - t, 0.8, null, 0.5 * G);
            }
            bzGaiVe(T1[0] + 3, T1[1] + 1.5, T1[0] - 13, T1[1] - 6, 3.4, 2, '#1d1d22', 0.7 * G);   // luoi dao cuoi duoi
            bzGaiVe(T1[0] + 2, T1[1] + 2, T1[0] - 8, T1[1] + 8, 2.4, -1.5, null, 0.5 * G);
            // ---- GAI LUNG: hang gai cong cao, nga ve sau
            let B0 = [bx + 6, Y(16, 11)], BC = [bx + 18, Y(8, 13)], B1 = [bx + 33, Y(15, 11)];
            const H = [9, 14, 17, 16, 13, 9];
            for (let i = 0; i < 6; i++){
                let t = 0.1 + i * 0.165, r = qp(B0, BC, B1, t), n = tg(B0, BC, B1, t), h = H[i];
                bzGaiVe(r[0] - n.tx * 3.5, r[1] - n.ty * 3.5 + 1, r[0] + n.nx * h - n.tx * 5.5, r[1] + n.ny * h - n.ty * 5.5, 3.6 - i * 0.12, -2.2, i % 2 ? '#1d1d22' : '#141418', 0.7 * G);
            }
            // ---- GIAP NGUC: to hon than ~3px, cac tam xep lop
            let g = ctx.createLinearGradient(bx + 6, Y(6, 13), bx + 38, Y(38, 5));
            g.addColorStop(0, '#34343e'); g.addColorStop(0.45, '#14141a'); g.addColorStop(1, '#050507');
            ctx.beginPath();
            ctx.moveTo(bx + 3.2, Y(16, 11));
            ctx.quadraticCurveTo(bx + 18, Y(4.8, 13), bx + 35.5, Y(13.5, 11));
            ctx.quadraticCurveTo(bx + 43, Y(24, 8), bx + 33.5, Y(33.5, 6));
            ctx.quadraticCurveTo(bx + 16, Y(39, 5), bx + 5.5, Y(29.5, 8));
            ctx.quadraticCurveTo(bx + 1.5, Y(22, 10), bx + 3.2, Y(16, 11));
            ctx.closePath(); ctx.fillStyle = g; ctx.fill(); ctx.stroke();
            ctx.lineWidth = 0.95;
            for (const [v0, v1, ky] of [[20.5, 17.5, 9.5], [26, 22.5, 8.5], [31, 28.5, 7]]){   // duong noi tam giap
                ctx.strokeStyle = '#3d3d48';
                ctx.beginPath(); ctx.moveTo(bx + 5, Y(v0 + 2, ky)); ctx.quadraticCurveTo(bx + 21, Y(v1 - 2.5, ky + 1), bx + 40.5, Y(v0 + 1, ky - 1)); ctx.stroke();
                ctx.strokeStyle = 'rgba(155,28,28,' + (0.55 + 0.3 * G).toFixed(2) + ')';
                ctx.beginPath(); ctx.moveTo(bx + 5.5, Y(v0 + 3.2, ky)); ctx.quadraticCurveTo(bx + 21, Y(v1 - 1.2, ky + 1), bx + 40, Y(v0 + 2.2, ky - 1)); ctx.stroke();
            }
            ctx.save(); ctx.shadowBlur = 8 * G + 2; ctx.shadowColor = '#ff1744';                       // loi nang luong o nguc
            ctx.fillStyle = 'rgba(255,23,68,' + (0.55 + 0.4 * G).toFixed(2) + ')'; ctx.strokeStyle = '#7a0f1e'; ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(bx + 22.5, Y(16.5, 10)); ctx.lineTo(bx + 26.2, Y(23, 9)); ctx.lineTo(bx + 22.5, Y(29.5, 8)); ctx.lineTo(bx + 18.8, Y(23, 9)); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.restore();
            ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1.1;
            bzGaiVe(bx + 35, Y(15, 11), bx + 46, Y(5, 12), 3.4, -2.5, '#1d1d22', 0.7 * G);              // 2 gai nguc huong truoc
            bzGaiVe(bx + 38, Y(20, 10), bx + 48.5, Y(14.5, 10), 2.8, -2, '#17171c', 0.6 * G);
            ctx.restore();
        }
// PLAYER_PART_END s4.veBzGiapThan.1

// index.html:74653 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzVeChan.1 EDITABLE
function bzVeChan(hx, hy, kx, ky, ax, ay, tx, ty){
            if (typeof bzBat !== 'function' || !bzBat(dino)) return;
            const G = bzGiapSang();
            ctx.save(); ctx.lineJoin = 'round'; ctx.strokeStyle = '#000'; ctx.lineWidth = 0.9;
            let g = ctx.createLinearGradient(kx - 6, ky - 4, kx + 6, ay + 3);
            g.addColorStop(0, '#34343e'); g.addColorStop(1, '#09090c'); ctx.fillStyle = g;
            ctx.beginPath(); ctx.moveTo(hx - 7, hy - 4); ctx.lineTo(hx + 7.5, hy - 3); ctx.lineTo(kx + 6.5, ky + 1.2); ctx.lineTo(kx - 6.5, ky + 1.8); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(kx - 6, ky + 1); ctx.lineTo(kx + 6, ky); ctx.lineTo(ax + 6, ay); ctx.lineTo(ax - 5, ay + 2.4); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.strokeStyle = 'rgba(255,23,68,' + (0.5 + 0.3 * G).toFixed(2) + ')'; ctx.lineWidth = 0.9;
            ctx.beginPath(); ctx.moveTo(kx + 0.5, ky + 3); ctx.lineTo(ax + 0.5, ay - 0.5); ctx.stroke();
            ctx.strokeStyle = '#000'; ctx.lineWidth = 0.9;
            bzGaiVe(kx + 2.5, ky - 0.5, kx + 13, ky - 7, 3.4, -1.8, '#1d1d22', 0.7 * G);              // gai dau goi
            ctx.fillStyle = '#121216';
            ctx.beginPath(); ctx.moveTo(ax - 5, ay - 2.5); ctx.lineTo(tx + 1.5, ty - 4); ctx.lineTo(tx + 3.5, ty + 0.5); ctx.lineTo(ax - 5.5, ay + 3.8); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.bzVeChan.1

// index.html:74669 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzVeChanNgoi.1 EDITABLE
function bzVeChanNgoi(lx, by){
            if (typeof bzBat !== 'function' || !bzBat(dino)) return;
            const G = bzGiapSang();
            ctx.save(); ctx.lineJoin = 'round'; ctx.strokeStyle = '#000'; ctx.lineWidth = 0.9; ctx.fillStyle = '#131318';
            ctx.beginPath(); ctx.moveTo(lx - 5, by + 33); ctx.lineTo(lx + 5.5, by + 33); ctx.lineTo(lx + 7, by + 44); ctx.lineTo(lx - 3, by + 44); ctx.closePath(); ctx.fill(); ctx.stroke();
            bzGaiVe(lx + 4.5, by + 36, lx + 13.5, by + 30.5, 3.2, -1.6, '#1d1d22', 0.7 * G);
            ctx.restore();
        }
// PLAYER_PART_END s4.bzVeChanNgoi.1

// index.html:74677 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzVeGiap.1 EDITABLE
function bzVeGiap(bx, by, cs, br, may){
            if (typeof bzBat !== 'function' || !bzBat(dino)) return;
            if (may) return bzVeGiapCu(bx, by, cs, br, true);
            const Y = (v, k) => by + v + cs * k + br, G = bzGiapSang();
            const Hh = (v) => by + v + cs * 13 + br, E = (v) => by + v + cs * 12 + br;
            ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1.1;
            // ---- VONG CO + gai
            ctx.fillStyle = BZ_G.nua;
            ctx.beginPath(); ctx.ellipse(bx + 33.5, Y(13.5, 11.5), 7.6, 3.4, 0.95, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.strokeStyle = 'rgba(255,23,68,' + (0.55 + 0.3 * G).toFixed(2) + ')'; ctx.lineWidth = 0.9;
            ctx.beginPath(); ctx.ellipse(bx + 33.5, Y(13.5, 11.5), 6, 2.4, 0.95, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
            ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1;
            bzGaiVe(bx + 31, Y(10, 12), bx + 24, Y(1, 12), 3, 1.8, '#1d1d22', 0.6 * G);
            // ---- GIAP VAI nhieu lop, 3 gai
            for (let i = 2; i >= 0; i--){
                let cx0 = bx + 25 - i * 1.3, cy0 = Y(16 + i * 3.6, 11.5), rx = 12.5 - i * 1.5, ry = 6.4 - i * 0.4;
                let g = ctx.createLinearGradient(cx0 - rx, cy0 - ry, cx0 + rx, cy0 + 2);
                g.addColorStop(0, '#3a3a46'); g.addColorStop(0.5, '#16161c'); g.addColorStop(1, '#07070a');
                ctx.beginPath(); ctx.ellipse(cx0, cy0, rx, ry, -0.2, Math.PI, 0); ctx.quadraticCurveTo(cx0 + rx * 0.2, cy0 + 3.6, cx0 - rx, cy0 + 0.6); ctx.closePath();
                ctx.fillStyle = g; ctx.fill(); ctx.stroke();
                ctx.save(); ctx.strokeStyle = 'rgba(255,40,70,' + (0.5 + 0.35 * G).toFixed(2) + ')'; ctx.lineWidth = 0.9;
                ctx.beginPath(); ctx.ellipse(cx0, cy0 + 0.6, rx - 1.2, ry - 0.7, -0.2, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke(); ctx.restore();
            }
            let sx = bx + 25, sy = Y(16, 11.5);
            bzGaiVe(sx + 7, sy - 4.5, sx + 15, sy - 13, 3.6, -3, '#1d1d22', 0.8 * G);
            bzGaiVe(sx + 1, sy - 6, sx - 0.5, sy - 18, 3.9, 2.2, '#222229', 0.8 * G);
            bzGaiVe(sx - 7, sy - 4, sx - 15, sy - 11, 3.4, 3, '#1d1d22', 0.8 * G);
            // ---- GIAP TAY: bao tay + gai cui chi
            let eX = bx + 30, eY = by + 26 + cs * 8, wX = bx + 37, wY = by + 28 + cs * 8;
            ctx.beginPath(); ctx.moveTo(eX - 4, eY - 2.4); ctx.lineTo(eX + 4, eY - 2.6); ctx.lineTo(wX + 3, wY - 1.4); ctx.lineTo(wX - 3, wY + 3.6); ctx.closePath();
            ctx.fillStyle = '#15151a'; ctx.fill(); ctx.stroke();
            ctx.strokeStyle = 'rgba(255,23,68,' + (0.5 + 0.3 * G).toFixed(2) + ')'; ctx.lineWidth = 0.9;
            ctx.beginPath(); ctx.moveTo(eX - 1, eY - 0.5); ctx.lineTo(wX - 0.5, wY + 1.2); ctx.stroke();
            ctx.strokeStyle = BZ_G.vien; ctx.lineWidth = 1;
            bzGaiVe(eX - 2, eY - 1, eX - 11, eY - 5, 3, 1.5, '#1d1d22', 0.7 * G);
            // ---- MU SUNG co sung + mat do (che lai mat cu)
            ctx.beginPath();
            ctx.moveTo(bx + 30, Hh(8));
            ctx.quadraticCurveTo(bx + 34, Hh(-2), bx + 44, Hh(-2.3));
            ctx.quadraticCurveTo(bx + 51.5, Hh(-0.8), bx + 54.2, E(8.2));
            ctx.lineTo(bx + 51.4, E(9.6)); ctx.lineTo(bx + 47, E(8.4));
            ctx.quadraticCurveTo(bx + 40, E(5), bx + 33.4, Hh(10.5));
            ctx.closePath();
            let gh = ctx.createLinearGradient(bx + 30, Hh(-2), bx + 52, E(10));
            gh.addColorStop(0, '#3a3a46'); gh.addColorStop(0.5, '#15151b'); gh.addColorStop(1, '#060608');
            ctx.fillStyle = gh; ctx.fill(); ctx.stroke();
            ctx.save(); ctx.strokeStyle = 'rgba(255,40,70,' + (0.55 + 0.3 * G).toFixed(2) + ')'; ctx.lineWidth = 0.9;
            ctx.beginPath(); ctx.moveTo(bx + 32.5, Hh(4)); ctx.quadraticCurveTo(bx + 42, Hh(-0.2), bx + 52, E(7.4)); ctx.stroke(); ctx.restore();
            bzGaiVe(bx + 35.5, Hh(2.5), bx + 21, Hh(-11), 3.5, -4.5, '#222229', 0.8 * G);                // sung lon cong ra sau
            bzGaiVe(bx + 39.5, Hh(0.5), bx + 29.5, Hh(-9.5), 2.7, -3.2, '#1d1d22', 0.8 * G);              // sung nho
            bzGaiVe(bx + 44.5, Hh(-1.5), bx + 48.5, Hh(-9), 2.3, 1.2, '#1d1d22', 0.8 * G);                // gai dinh
            ctx.beginPath(); ctx.moveTo(bx + 39, E(3)); ctx.lineTo(bx + 51.5, E(5)); ctx.lineTo(bx + 49, E(8)); ctx.lineTo(bx + 40.5, E(6.4)); ctx.closePath();
            ctx.fillStyle = '#0d0d10'; ctx.fill(); ctx.stroke();
            ctx.save(); ctx.shadowBlur = 7 * G + 2; ctx.shadowColor = '#ff1744';
            ctx.fillStyle = BZ_G.do;
            ctx.beginPath(); ctx.moveTo(bx + 42.2, E(6.3)); ctx.lineTo(bx + 49.4, E(6.9)); ctx.lineTo(bx + 47.8, E(8.2)); ctx.lineTo(bx + 43.2, E(7.8)); ctx.closePath(); ctx.fill();
            ctx.restore();
            bzGaiVe(bx + 38.5, E(15.5), bx + 35.5, E(22.5), 2.4, 1, '#1d1d22', 0.6 * G);                   // gai ham
            ctx.restore();
        }
// PLAYER_PART_END s4.bzVeGiap.1

// index.html:74737 · Phạm vi: global
// PLAYER_PART_BEGIN s4.veBzGiapThanCu.1 EDITABLE
function veBzGiapThanCu(bx, by, cs, br, may){
            if (typeof bzBat !== 'function' || !bzBat(dino)) return;
            ctx.save(); ctx.lineJoin = 'round';
            if (may){
                let dy = cs ? 8 : 0;
                let g = ctx.createLinearGradient(bx + 12, by + 12 + dy, bx + 34, by + 28 + dy);
                g.addColorStop(0, '#3a3a3a'); g.addColorStop(0.5, '#141414'); g.addColorStop(1, '#070707');
                ctx.fillStyle = g; ctx.strokeStyle = '#000'; ctx.lineWidth = 1.15;
                ctx.beginPath();
                ctx.moveTo(bx + 12, by + 12 + dy); ctx.lineTo(bx + 35, by + 12 + dy);
                ctx.lineTo(bx + 37, by + 26); ctx.lineTo(bx + 13, by + 27);
                ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.strokeStyle = '#b71c1c'; ctx.lineWidth = 1.1;
                ctx.beginPath(); ctx.moveTo(bx + 15, by + 17 + dy); ctx.lineTo(bx + 32, by + 17 + dy); ctx.stroke();
                ctx.restore(); return;
            }
            const Y = (v, k) => by + v + cs * k + br;
            ctx.beginPath();
            ctx.moveTo(bx + 7, Y(16, 11));
            ctx.quadraticCurveTo(bx + 18, Y(8.5, 13), bx + 33, Y(15, 11));
            ctx.quadraticCurveTo(bx + 38, Y(23, 8), bx + 31, Y(30, 6));
            ctx.quadraticCurveTo(bx + 17, Y(33, 5), bx + 9, Y(27, 8));
            ctx.quadraticCurveTo(bx + 5, Y(20, 10), bx + 7, Y(16, 11));
            ctx.closePath();
            let g = ctx.createLinearGradient(bx + 8, Y(9, 13), bx + 30, Y(32, 6));
            g.addColorStop(0, '#4a4a4a'); g.addColorStop(0.45, '#1a1a1a'); g.addColorStop(1, '#080808');
            ctx.fillStyle = g; ctx.strokeStyle = '#000'; ctx.lineWidth = 1.15;
            ctx.fill(); ctx.stroke();
            ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 1.15;
            ctx.beginPath();
            ctx.moveTo(bx + 10, Y(17, 11));
            ctx.quadraticCurveTo(bx + 19, Y(13, 12), bx + 30, Y(16.5, 11));
            ctx.stroke();
            ctx.fillStyle = '#ff1744';
            ctx.beginPath();
            ctx.moveTo(bx + 20, Y(19, 9));
            ctx.lineTo(bx + 22.4, Y(22, 8.5));
            ctx.lineTo(bx + 20, Y(25, 8));
            ctx.lineTo(bx + 17.6, Y(22, 8.5));
            ctx.closePath(); ctx.fill();
            ctx.restore();
        }
// PLAYER_PART_END s4.veBzGiapThanCu.1

// index.html:74779 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzVeGiapCu.1 EDITABLE
function bzVeGiapCu(bx, by, cs, br, may){
            if (typeof bzBat !== 'function' || !bzBat(dino)) return;
            ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
            if (may){
                let dy = cs ? 8 : 0;
                ctx.fillStyle = '#161616'; ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 1.1;
                ctx.beginPath(); ctx.arc(bx + 33, by + 13 + dy, 7.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(bx + 40, by + 6 + dy);
                ctx.quadraticCurveTo(bx + 50, by + 4 + dy, bx + 58, by + 8 + dy);
                ctx.lineTo(bx + 56, by + 14 + dy);
                ctx.quadraticCurveTo(bx + 48, by + 12 + dy, bx + 40, by + 14 + dy);
                ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.restore(); return;
            }
            let yb = cs * 12 + br, yt = cs * 13 + br;
            ctx.fillStyle = '#161616'; ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 1.05;
            ctx.beginPath();
            ctx.moveTo(bx + 32, by + 4 + yt);
            ctx.quadraticCurveTo(bx + 44, by + 0 + yt, bx + 53, by + 7 + yb);
            ctx.lineTo(bx + 50, by + 10 + yb);
            ctx.quadraticCurveTo(bx + 42, by + 5 + yt, bx + 33, by + 8 + yt);
            ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(bx + 35, by + 13 + yb);
            ctx.quadraticCurveTo(bx + 46, by + 17 + yb, bx + 53, by + 12 + yb);
            ctx.lineTo(bx + 51, by + 16 + yb);
            ctx.quadraticCurveTo(bx + 44, by + 20 + yb, bx + 34, by + 16 + yb);
            ctx.closePath(); ctx.fill(); ctx.stroke();
            let sX = bx + 27, sY = by + 19 + cs * 9;
            ctx.fillStyle = '#1c1c1c'; ctx.strokeStyle = '#424242'; ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(sX + 1, sY, 8, 6.5, -0.35, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#ff1744';
            ctx.beginPath();
            ctx.moveTo(sX + 1, sY - 6.5);
            ctx.lineTo(sX + 4, sY - 1);
            ctx.lineTo(sX - 2, sY - 1);
            ctx.closePath(); ctx.fill();
            let eX = bx + 30, eY = by + 26 + cs * 8, wX = bx + 37, wY = by + 28 + cs * 8;
            ctx.fillStyle = '#121212'; ctx.strokeStyle = '#7f1d1d'; ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(eX - 4, eY - 3);
            ctx.lineTo(eX + 4, eY - 2);
            ctx.lineTo(wX + 3, wY + 1);
            ctx.lineTo(wX - 3, wY + 5);
            ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.bzVeGiapCu.1

// index.html:74831 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkTick.1 EDITABLE
function dkTick(ng, fireKey, chargeKey, crouchKey){
            let dk = dkCua(ng);
            if (ng.id === 1 && typeof ammoToiDa === 'function'){
                let mx = ammoToiDa(DK_DAN), cu = ng.maxAmmo;
                if (cu !== mx){
                    ng.maxAmmo = mx;
                    if (ng.ammo > mx) ng.ammo = mx;
                    else if (mx > cu) ng.ammo = Math.min(mx, (ng.ammo || 0) + (mx - cu));
                }
            }
            if (bzBat(ng)){
                dk.da = 0; dk.buff = 0;
                if (dk.kenh){ dk.kenh = false; dk.ch = null; }
                if (!dk.A && dk.trang === 'dat') dk.trang = 'lung';
                if ((dk.voHan || 0) > 0){
                    ng.ammo = ng.maxAmmo; ng.isOverheated = false; ng.overheatTimer = 0;
                    if (--dk.voHan <= 0){ dk.voHan = 0; bzTuThuong(ng); }
                }
                if ((dk.tamThem || 0) > 0) dk.tamThem--;
                if (ng.id === 1 && ng.hp > 0){        // RUT MAU DINH KY: moi 20 giay mat 1 mau ("GIAP CAN")
                    dk.bzDrainT = (dk.bzDrainT || 0) + 1;
                    if (dk.bzDrainT >= BZ_DRAIN_T){ dk.bzDrainT = 0; bzTuThuong(ng); }
                }
            }
            if (dk.ult) return;
            if (dk.buff > 0){ dk.buff--; ng.ammo = ng.maxAmmo; ng.isOverheated = false; }   // BAT MON: vo han the luc
            if (dk.cho > 0) dk.cho--;
            if (dk.nghi > 0) dk.nghi--;
            // suc nhay: cham nhu Bua; dang dung yen thi khong nhay
            ng.jumpPower = (dkDungYen(dk) || (dk.A && dk.A.kieu === 'nhayDap')) ? 0 : -12.5 * (bzBat(ng) ? 1 : (dk.buff > 0 ? 0.95 : DK_CHAY));
            ng._dkNhay = true;
            if (dkDungYen(dk) && typeof dashVx !== 'undefined') dashVx = 0;   // PvP: vong cua P2 da doi dashVx sang cua P2
            // luot
            let luot = (ng.id === 1 || gameState === 'pvp') && typeof dangLuotHoacChop === 'function' && dangLuotHoacChop() && !((dk._khongLuot || 0) > frames);
            if (luot) dk.luotDu = 14; else if (dk.luotDu > 0) dk.luotDu--;
            let luotMoi = luot && !dk.luotCu; dk.luotCu = luot;
            // hoat anh
            if (dk.A){
                let A = dk.A; A.t++;
                if (A.kieu === 'nhayDap') dkNhayDapTick(ng, A);
                { let p = dkPose(ng); if (p){ (A.vet || (A.vet = [])).push(p); let n = (A.kieu && A.kieu.indexOf('bz') === 0) ? 10 : 6; if (A.vet.length > n) A.vet.shift(); } }
                if (A.m.nut && A.t === Math.round(A.m.nut * A.T / A.m.T) && ng.grounded) dkNutDat(ng, A.m.nutX);
                if (A.m.laoLuc && A.t === A.hit - 1 && typeof dashVx !== 'undefined'){
                    dashVx = dkDir(ng) * A.m.laoLuc;                       // lao xa GAP RUOI mot cu luot thuong
                    ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 16);
                }
                if (A.m.lao && A.t === 1 && typeof dashVx !== 'undefined') dashVx = dkDir(ng) * A.m.lao;
                if (A.t === A.hit){
                    dkRaDon(ng, A);
                    if (A.setDien && typeof setCanApDon === 'function') setCanApDon(ng, 180 + (A.rEx || 0));
                    if (A.kieu === 'ngang'){ dk._cach = 14; dk._cua = 32; dk._xin = 0; }
                }
                else if (A.m.keoDai && A.t > A.hit && A.t <= A.hit + A.m.keoDai) dkHopDon(ng, A);   // DAM XUYEN: hop theo nguoi suot doan lao
                if (A.m.xuong && A.t < A.hit){ ng.dy = Math.max(ng.dy || 0, 11); if (ng.grounded && A.t > 3){ A.t = A.hit - 1; } }
                if (bzBat(ng)) bzSau(ng);
                if (dk.A && A.t >= A.T) dkXong(ng, A);
            }
            if (bzBat(ng)){
                if (dk._lh){                                                   // dang chay CHEM LIEN HOAN: tu noi don, khong nhan J
                    if (dk.ult || dk.kenh) dk._lh = null;
                    else {
                        ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 4);          // BAT TU SUOT CA CHUOI (ke ca luc nghi giua cac don): da bi ep danh thi khong the bi dam
                        if (!dk.A) bzLienHoanTiep(ng);
                        dk.datDat = !!ng.grounded; return;
                    }
                }
                if (dk.bzCh){
                    if (!chargeKey){
                        dk.bzCh = false;
                        if (dk.A && dk.A.m && dk.A.m.ken){ bzGiuPose(ng); dk.A = null; dk.cho = 10; }
                    } else if (!dk.A || dk.A.kieu !== 'bzKen'){
                        dk.cho = 0;
                        bzBatDau(ng, 'bzKen');
                    }
                    dk.datDat = !!ng.grounded;
                    return;
                }
                bzNhap(ng, fireKey, luotMoi); dk.datDat = !!ng.grounded; return;
            }
            if (dk._cach > 0) dk._cach--;
            if (dk._cua > 0) dk._cua--; else dk._xin = 0;
            if (dk._doiJ && !(dk.bufJ > 0) && !dk.jHold) dk._doiJ = 0;
            // Nhay giua chem xuong hoac giua dam: don do van ra, roi nhac kiem ngay. Khong cat nhip cac don khac.
            let vuaNhay = !ng.grounded && (ng.dy || 0) < -2 && dk.datDat;
            if (vuaNhay && dk.A && (dk.A.kieu === 'chem' || dk.A.kieu === 'dam2') && dk.A.t < dk.A.T){
                let cu = dk.A, du = cu.kieu === 'dam2' ? 1 : 6;
                if (cu.t >= du && cu.t < cu.hit) dkRaDon(ng, cu);
                dk.A = null; dk.trang = 'dat'; dk.cho = 0;
                if (dkBatDau(ng, 'nhacJ')) dkChu(ng.x - 26, ng.y - 40, "BẠT SƠN!", "UPHEAVAL!");
                else { cu.t = Math.max(cu.t, cu.hit); dk.A = cu; }
            } else if (vuaNhay && !dk.A && dk.trang === 'dat'){
                dkBatDau(ng, 'nhacJ'); dkChu(ng.x - 26, ng.y - 40, "BẠT SƠN!", "UPHEAVAL!");
            }
            if (luotMoi && !ng.isOverheated && dk.A && dk.A.kieu === 'chem'){
                let cu = dk.A;
                if (cu.t >= 6 && cu.t < cu.hit) dkRaDon(ng, cu);
                dk.A = null; dk.trang = 'dat'; dk.cho = 0;
                if (!dkBatDau(ng, 'dam2')){ cu.t = Math.max(cu.t, cu.hit); dk.A = cu; }
            }
            dk.datDat = !!ng.grounded;
            if (!dk.A && dk.trang === 'dat'){
                if (luotMoi && !ng.isOverheated){ dkBatDau(ng, 'dam2'); }
                else if (--dk.datT <= 0) dkBatDau(ng, 'nho2');
            }
            // channel
            if (dk.kenh){
                if (!chargeKey){ dk.kenh = false; dk.ch = null; dkBatDau(ng, 'nho'); }
                else {
                    dk.ch = dk.ch || { t: 0 };
                    dk.ch.t++;
                    if (dk.ch.t === 20 || (dk.ch.t > 20 && (dk.ch.t - 20) % DK_CH_NHIP === 0)) dkDiaChan(ng);
                }
            }
            // J: GIU roi THA = tich luc kiem khi (0.5 / 1 / 1.5s).
            // Tha J khi KHONG giu K: chem J 12/16/20. Tha J khi DANG giu K hoac Channel: cat muc, khong chem mat.
            // Tran 120 khung (2s) van tu tha nhu cu.
            let jNay = !!fireKey, canh = jNay && !dk.jCu; dk.jCu = jNay;
            if (canh){ dk.jHold = true; dk.jT = 0; dk.jTier = 0; dk.jAn = false; dk.jDash = dk.luotDu > 0; }
            if (dk.jHold && jNay && !dk.jAn && dk.jT < 120){
                dk.jT++;
                let moc = (typeof dkNovaOn === 'function' && dkNovaOn(ng)) ? DK_NOVA_MOC : DK_JC_MOC;
                let tier = dk.jT >= moc[2] ? 3 : dk.jT >= moc[1] ? 2 : dk.jT >= moc[0] ? 1 : 0;
                if (tier > dk.jTier){
                    dk.jTier = tier;
                    dkSfx(300 + tier * 220, 0.18, 'sine', 0.2, 600 + tier * 300);
                    dkChu(ng.x - 22, ng.y - 34, "KIẾM KHÍ " + ["", "I", "II", "III"][tier], "AURA " + ["", "I", "II", "III"][tier]);
                }
                dk.bufJ = 14;
            } else if (dk.jHold && (!jNay || dk.jT >= 120)){
                let muc = (!dk.jAn && dk.jTier > 0) ? dk.jTier : 0;
                let dash = dk.jDash;
                dk.jHold = false; dk.jAn = false; dk.jTier = 0; dk.jT = 0; dk.jDash = false;
                if (chargeKey || dk.kenh){
                    // cat muc cho don K / Hut, KHONG chem J. Cham J (muc 0) khong xoa muc da cat.
                    if (muc > 0){
                        if (dk.kenh){ dk.jHut = muc; dk.jGiu = 0; }
                        else { dk.jGiu = muc; dk.jHut = 0; }
                    }
                    dk.jXa = 0; dk.bufJ = 0;
                } else {
                    if (muc > 0){ dk.jXa = muc; dk.jGiu = 0; dk.jHut = 0; }
                    else if (dk.jGiu > 0){ dk.jXa = dk.jGiu; dk.jGiu = 0; }
                    else dk.jXa = 0;
                    dk.bufJ = 14; dk.jDash = dash;
                }
            } else if (!dk.jHold && dk.bufJ > 0) dk.bufJ--;
            if (dk.jHold) return;
            // dang nap K hoac dang cam kenh: muc da cat cho don do, khong tu chem J
            if (chargeKey || dk.kenh) return;
            // Vong thu hai cua Luot J: phai doi mot nhip ngan sau nhat dau, khong ra cung luc.
            if (dk._cua > 0 && !dk._doiJ && (canh || dk.bufJ > 0) && !(dk.A && dk.A.kieu === 'ngang' && dk.A.t < dk.A.hit)) dk._xin = 1;
            if (dk._xin && dk._cach <= 0 && dk._cua > 0 && !(dk.A && dk.A.kieu !== 'ngang')){
                let them = (dk.A && dk.A.them && dk.A.them.jc) ? dk.A.them : ((dk.jXa || dk.jGiu) ? { dmg: DK_JC_DMG[(dk.jXa || dk.jGiu) - 1], reach: DK_JC_CM[(dk.jXa || dk.jGiu) - 1] * DK_CM, jc: dk.jXa || dk.jGiu } : null);
                dk.A = null; dk.cho = 0; dk._xin = 0; dk._cua = 0; dk._cach = 0;
                dk.bufJ = 0; dk.jXa = 0; dk.jGiu = 0; dk.jHut = 0; dk.jDash = false;
                if (dkBatDau(ng, 'ngang2', them)){ dkChu(ng.x - 36, ng.y - 40, "HOÀNH TẢO!", "CLEAVE!"); return; }
            }
            if (!(dk.bufJ > 0)){ if (!(dk.jGiu > 0)){ dk.jXa = 0; dk.jDash = false; } return; }
            if (dk.A || dk.cho > 0 || ng.isOverheated) return;
            if (combatStance === 2 && !ng.tank) return;
            dk.bufJ = 0;
            let jc = dk.jXa || dk.jGiu || 0, giuLuot = dk.jDash && jc > 0;
            dk.jXa = 0; dk.jGiu = 0; dk.jHut = 0; dk.jDash = false;
            let tj = jc > 0 ? { dmg: DK_JC_DMG[jc - 1], reach: DK_JC_CM[jc - 1] * DK_CM, jc } : null;
            if (dk.trang === 'dat'){
                dkBatDau(ng, ng.grounded ? 'nhac' : 'nhacN', tj);
                if (!ng.grounded) dkChu(ng.x - 20, ng.y - 34, "HỒI KIẾM!", "RECOVER!");
                return;
            }
            if ((dk.luotDu > 0 || giuLuot) && ng.ammo >= 3){
                if (dkBatDau(ng, 'ngang', tj)){ dk.luotDu = 0; dk._doiJ = 1; dkChu(ng.x - 30, ng.y - 40, "HOÀNH TẢO!", "CLEAVE!"); }
                return;
            }
            if (!ng.grounded){ dkBatDau(ng, 'roi', tj); return; }
            dkBatDau(ng, 'chem', tj);
        }
// PLAYER_PART_END s4.dkTick.1

// index.html:75007 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkNhaK.1 EDITABLE
function dkNhaK(ng){
            if (bzBat(ng)){
                // Giữ K: 5 đòn riêng (chém / xoay / bùng / đâm / loạn). Không bể máu.
                // Bể máu chỉ có ở giữ J. Đang giữ J thì không thả kép.
                // Giữ tới 3 giây thì Channel đã nhận, không thả thêm đòn.
                let dk = dkCua(ng);
                if (dk.jHold || dk.bzCh || dk.ult) return;
                let h = ng.aKeyHeldTime || 0;
                if (h >= 180) return;
                let tier = h >= 150 ? 5 : h >= 120 ? 4 : h >= 90 ? 3 : h >= 60 ? 2 : h >= 30 ? 1 : 0;
                if (tier > 0) bzNapRa(ng, tier);
                return;
            }
            let dk = dkCua(ng), h = ng.aKeyHeldTime;
            if (dk.kenh || dk.ult) return;
            if (dk.A || ng.isOverheated || ng.ammo <= 0) return;
            // 2s Dai Cu Kiem va 2.5s Bat Mon la buff: khong an Charge J, cung khong tieu muc
            let kieu = h >= 150 ? 'buff' : h >= 120 ? 'da' : h >= 90 ? 'nhayDap' : h >= 60 ? 'cam' : h >= 30 ? 'quet' : null;
            if (!kieu) return;
            let laBuff = kieu === 'buff' || kieu === 'da';
            let them = null;
            if (!laBuff){
                let tier = dkMucSan(ng);
                if (tier > 0) them = { cong: DK_JC_K[tier - 1], jc: tier };
            }
            let camSau = (kieu === 'da') && dk.da > 0;                       // van con kiem da: cam kiem SAU HON
            if (!dkBatDau(ng, kieu, them)) return;
            if (camSau && dk.A) dk.A.sau = true;
            if (them){
                dkTieuJ(ng);
                dkChu(ng.x - 8, ng.y - 56, "KIẾM KHÍ +" + them.cong, "AURA +" + them.cong);
            }
            if (kieu === 'da') dkChu(ng.x - 26, ng.y - 40, camSau ? "CẮM SÂU!" : "HẤP THỤ ĐẤT ĐÁ", camSau ? "DEEP PLANT!" : "ABSORB STONE");
            else if (kieu === 'nhayDap') dkChu(ng.x - 26, ng.y - 40, "TRỌNG LỰC TRẢM!", "GRAVITY CRASH!");
            else if (kieu === 'cam') dkChu(ng.x - 26, ng.y - 40, "CẮM KIẾM", "PLANT");
        }
// PLAYER_PART_END s4.dkNhaK.1

// index.html:75043 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkParry.1 EDITABLE
function dkParry(ng){
            let dk = ng.dk; if (!dk || !dk.A) return false;
            let A = dk.A, m = A.m, u = A.t / A.T;
            if (m.parry && u >= m.parry[0] && u <= m.parry[1]) return true;
            if (m.ngang && u >= 0.25 && u <= 0.6) return true;
            return false;
        }
// PLAYER_PART_END s4.dkParry.1

// index.html:75052 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_ULT_T.1 EDITABLE
const DK_ULT_T = 200;
// PLAYER_PART_END s4.DK_ULT_T.1

// index.html:75053 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzMucTieu.1 EDITABLE
function bzMucTieu(ng){
            let best = null, bd = 1e9, boss = null, bod = 1e9, cx = ng.x + ng.w / 2;
            for (let o of dkDs()){
                if (!dkLaQuai(o) || !(o.hp > 0)) continue;
                let d = Math.abs((o.x + (o.w || 20) / 2) - cx);
                if (dkLaBoss(o) && d < bod){ boss = o; bod = d; }
                if (d < bd){ best = o; bd = d; }
            }
            return boss || best;
        }
// PLAYER_PART_END s4.bzMucTieu.1

// index.html:75063 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzUltGiu.1 EDITABLE
function bzUltGiu(o){
            if (!o) return;
            if (o._bzKhoaX == null){ o._bzKhoaX = o.x; o._bzKhoaY = o.y; }
            o.x = o._bzKhoaX; o.y = o._bzKhoaY;
            if (o.dy !== undefined) o.dy = 0;
            if (o.vx !== undefined) o.vx = 0;
            o._uFreeze = Math.max(o._uFreeze || 0, 3);
            if (typeof venKhoa === 'function') venKhoa(o, 3);
        }
// PLAYER_PART_END s4.bzUltGiu.1

// index.html:75072 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzUltTha.1 EDITABLE
function bzUltTha(o){
            if (!o) return;
            o._bzKhoaX = null; o._bzKhoaY = null;
            o._uFreeze = 0;
        }
// PLAYER_PART_END s4.bzUltTha.1

// index.html:75077 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzUltTick.1 EDITABLE
function bzUltTick(ng, U){
            U.t++;
            ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 8);
            ng._uFreeze = Math.max(ng._uFreeze || 0, 2);
            if (ng.id === 1 && typeof dashVx !== 'undefined') dashVx = 0;
            for (let o of dkDs()){
                if (!dkLaQuai(o) || !(o.hp > 0)) continue;
                if (U.ds.indexOf(o) < 0) U.ds.push(o);
                bzUltGiu(o);
            }
            const VAO = 30, NHIP = 16, N = 7, QUET = 58;
            const chem1 = VAO + NHIP * N;
            const quet0 = chem1 + 34;
            const het = quet0 + QUET + 18;
            if (U.t < VAO){ ng._bzAn = false; return; }
            if (U.t < chem1){
                let dt = U.t - VAO, i = Math.floor(dt / NHIP), loc = dt % NHIP;
                U.n = i; U.loc = loc;
                let neo = (U.neo && U.neo.hp > 0) ? U.neo : bzMucTieu(ng);
                U.neo = neo;
                if (neo) U.ox = neo.x + (neo.w || 20) / 2;
                let ox = U.ox, dir = U.dir || 1, hw = neo ? (neo.w || 40) / 2 : 24;
                let front = ox - dir * (hw + 46), lung = ox + dir * (hw + 58), xa = ox - dir * (hw + 180);
                let kind = i % 3;
                ng._bzAn = false;
                let x;
                if (kind === 1){ ng.isFacingLeft = dir > 0; x = lung - ng.w / 2; }
                else if (kind === 2){ ng.isFacingLeft = dir < 0; x = front - ng.w / 2; }
                else {
                    ng.isFacingLeft = dir < 0;
                    let u = Math.max(0, Math.min(1, (loc - 3) / 8));
                    u = u * u * (3 - 2 * u);
                    x = (xa + (front - xa) * u) - ng.w / 2;
                }
                ng.x = Math.max(worldL(), Math.min(worldR() - ng.w, x));
                let gy = dkMatDuoi(ng.x + ng.w / 2, (neo ? neo.y + (neo.h || 40) : ng.y + ng.h) + 120);
                if (gy > -500 && gy < 8000){ ng.y = gy - ng.h; ng.grounded = true; ng.dy = 0; }
                if (loc === 6 && !U.daChem[i]){
                    U.daChem[i] = 1;
                    dkHop(ng, -80, 260, 120, 40, 10, new Set(), null);
                    dkSfx(i % 3 === 2 ? 86 : 138, 0.08, 'sawtooth', 0.12, 58);
                    shakeTimer = Math.max(shakeTimer || 0, 8);
                }
                return;
            }
            if (U.t < quet0){
                ng._bzAn = false;
                let x = (U.dir || 1) > 0 ? worldL() + 18 : worldR() - ng.w - 18;
                if (Math.abs((x + ng.w / 2) - U.ox) < 220) x = (U.dir || 1) > 0 ? worldR() - ng.w - 18 : worldL() + 18;
                ng.x = Math.max(worldL(), Math.min(worldR() - ng.w, x));
                ng.isFacingLeft = U.ox < ng.x + ng.w / 2;
                let gy = dkMatDuoi(ng.x + ng.w / 2, ng.y + ng.h + 240);
                if (gy > -500 && gy < 8000){ ng.y = gy - ng.h; ng.grounded = true; ng.dy = 0; }
                U.qx = ng.x + ng.w / 2; U.qy = ng.y + ng.h * 0.35; U.qd = ng.isFacingLeft ? -1 : 1;
                return;
            }
            if (U.t === quet0){
                ng._bzAn = false;
                U.get = { x: U.qx != null ? U.qx : ng.x + ng.w / 2, y: U.qy != null ? U.qy : ng.y + ng.h * 0.35, d: U.qd || dkDir(ng), t: 0, hit: new Set() };
                dkChu(ng.x - 36, ng.y - 56, "GETSUGA!", "GETSUGA!");
                dkSfx(64, 0.5, 'sawtooth', 0.3, 28);
                shakeTimer = Math.max(shakeTimer || 0, 24);
            }
            if (U.get){
                let G = U.get;
                let span = Math.max(480, worldR() - worldL());
                G.v = span / 58;
                G.x += G.d * G.v;
                G.t++;
                let reach = G.v + 140;
                let x0 = G.d > 0 ? G.x - 40 : G.x - reach;
                let x1 = G.d > 0 ? G.x + reach : G.x + 40;
                let top = (typeof camY === 'number' ? camY : -160) - 80;
                let bot = dkNenY() + 80;
                for (let o of dkDs()){
                    if (!dkLaQuai(o) || !(o.hp > 0) || G.hit.has(o)) continue;
                    if (o.x + (o.w || 20) < x0 || o.x > x1 || o.y > bot || o.y + (o.h || 20) < top) continue;
                    G.hit.add(o); dkDanh(o, 100);
                    if (typeof hitCat === 'function') hitCat(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, 0, true, [183, 28, 28]);
                }
                if (G.t === 60){
                    for (let o of dkDs()){
                        if (!dkLaQuai(o) || !(o.hp > 0) || G.hit.has(o)) continue;
                        G.hit.add(o); dkDanh(o, 100);
                    }
                }
            }
            if (U.t >= het){
                ng._bzAn = false; ng._uFreeze = 0;
                for (let o of U.ds) bzUltTha(o);
                ng.dk.ult = null;
            }
        }
// PLAYER_PART_END s4.bzUltTick.1

// index.html:75170 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzVeDem.1 EDITABLE
function bzVeDem(ng){
            let U = ng.dk && ng.dk.ult;
            if (!U || !U.bz) return;
            let y0 = (typeof camY === 'number' ? camY : -160) - 12;
            let a = Math.min(1, U.t / 16);
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0," + a.toFixed(3) + ")";
            ctx.fillRect(camX - 16, y0, canvas.width + 32, canvas.height + 32);
            if (U.t > 8){
                let mo = Math.min(1, (U.t - 8) / 20);
                let mx = camX + canvas.width * 0.5, my = y0 + 150;
                ctx.globalCompositeOperation = 'lighter';
                let g = ctx.createRadialGradient(mx, my, 8, mx, my, 160);
                g.addColorStop(0, "rgba(255,255,255," + (0.95 * mo).toFixed(2) + ")");
                g.addColorStop(0.32, "rgba(200,208,216," + (0.4 * mo).toFixed(2) + ")");
                g.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mx, my, 160, 0, Math.PI * 2); ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = "rgba(246,246,250," + mo.toFixed(2) + ")";
                ctx.beginPath(); ctx.arc(mx, my, 52, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = "rgba(12,12,16," + mo.toFixed(2) + ")"; ctx.lineWidth = 9;
                ctx.beginPath(); ctx.arc(mx, my, 52, 0, Math.PI * 2); ctx.stroke();
                ctx.fillStyle = "rgba(170,176,184," + (0.4 * mo).toFixed(2) + ")";
                ctx.beginPath(); ctx.arc(mx - 12, my - 8, 16, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "rgba(6,6,10," + (0.94 * mo).toFixed(2) + ")";
                let may = [[-170, -18, 130, 38], [-50, -46, 96, 28], [48, -34, 118, 34], [160, -8, 140, 42], [-110, 22, 88, 24], [96, 20, 110, 26], [0, -8, 70, 18]];
                for (let c of may){ ctx.beginPath(); ctx.ellipse(mx + c[0], my + c[1], c[2], c[3], 0, 0, Math.PI * 2); ctx.fill(); }
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.bzVeDem.1

// index.html:75200 · Phạm vi: global
// PLAYER_PART_BEGIN s4.bzVeDemTren.1 EDITABLE
function bzVeDemTren(ng){
            let U = ng.dk && ng.dk.ult;
            if (!U || !U.bz) return;
            ctx.save();
            if (U.n >= 0 && U.loc >= 5 && U.loc <= 11 && !U.get && U.t < 142){
                let al = 1 - Math.abs(U.loc - 7) / 6;
                let d = ng.isFacingLeft ? -1 : 1;
                let cx = ng.x + ng.w / 2, cy = ng.y + ng.h * 0.42;
                ctx.globalCompositeOperation = 'lighter';
                ctx.strokeStyle = "rgba(183,28,28," + (0.9 * al).toFixed(2) + ")"; ctx.lineWidth = 11; ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.arc(cx + d * 10, cy, 86, d > 0 ? -1.15 : Math.PI - 1.15, d > 0 ? 1.05 : Math.PI + 1.05);
                ctx.stroke();
                ctx.strokeStyle = "rgba(255,220,220," + (0.55 * al).toFixed(2) + ")"; ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(cx + d * 16, cy, 108, d > 0 ? -0.85 : Math.PI - 0.85, d > 0 ? 0.75 : Math.PI + 0.75);
                ctx.stroke();
            }
            if (U.get){
                let G = U.get, al = Math.max(0.2, 1 - G.t / 74);
                ctx.translate(G.x, G.y); ctx.scale(G.d || 1, 1);
                ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = "rgba(40,0,8," + (0.45 * al).toFixed(2) + ")";
                ctx.beginPath(); ctx.arc(0, 0, 220, -1.4, 1.4); ctx.arc(48, 0, 150, 1.2, -1.2, true); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "rgba(183,28,28," + al.toFixed(2) + ")"; ctx.lineWidth = 10;
                ctx.beginPath(); ctx.arc(0, 0, 220, -1.4, 1.4); ctx.stroke();
                ctx.strokeStyle = "rgba(255,255,255," + (0.75 * al).toFixed(2) + ")"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(-8, 0, 206, -1.15, 1.15); ctx.stroke();
                ctx.fillStyle = "rgba(120,0,24," + (0.22 * al).toFixed(2) + ")";
                ctx.fillRect(-20, -280, 90, 560);
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.bzVeDemTren.1

// index.html:75233 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkUltBat.1 EDITABLE
function dkUltBat(ng){
            let dk = dkCua(ng);
            if (dk.ult) return false;
            dk.A = null; dk.kenh = false; dk.ch = null; dk.bzCh = false; dk.cho = 0; dk.trang = 'lung';
            dk.jHold = false; dk.jT = 0; dk.jTier = 0;
            if (bzBat(ng)){
                let neo = bzMucTieu(ng);
                let cx = ng.x + ng.w / 2;
                let ox = neo ? neo.x + (neo.w || 20) / 2 : cx + dkDir(ng) * 140;
                dk.ult = { t: 0, bz: 1, ds: [], neo: neo, ox: ox, dir: ox >= cx ? 1 : -1, n: -1, loc: 0, daChem: {} };
                ng._bzAn = false;
                dkSfx(52, 0.85, 'sawtooth', 0.32, 36);
                dkChu(ng.x - 28, ng.y - 52, "TRĂNG ĐEN!", "BLACK MOON!");
                return true;
            }
            dk.ult = { t: 0, ds: [], da: [], nut: [], cx: worldCX(), qy: -40, kx: 0, ky: 0 };
            dkSfx(70, 0.9, 'sawtooth', 0.32, 35);
            return true;
        }
// PLAYER_PART_END s4.dkUltBat.1

// index.html:75252 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkUltTick.1 EDITABLE
function dkUltTick(ng){
            let U = ng.dk.ult;
            if (U && U.bz){ bzUltTick(ng, U); return; }
            U.t++;
            ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 12);
            ng._uFreeze = Math.max(ng._uFreeze || 0, 2);
            if (ng.id === 1 && typeof dashVx !== 'undefined') dashVx = 0;
            let tay = dkTG(ng, 31, 20);
            // MOI ke dich tren man (ke ca con moi xuat hien truoc luc dap) mat trong luc, lo lung roi bi hut vao
            if (U.t < 150) for (let o of dkDs()){
                if (U.ds.indexOf(o) >= 0) continue;
                U.ds.push(o);
                if (dkLaQuai(o)){ o._dkNoi = { t: 0, y0: o.y, x0: o.x, keo: null }; dkBocUpd(o); }
                if (U.t > 20) dkDanh(o, 30);                       // den muon sau nhat quet: van an nhat quet
            }
            if (U.t === 20){
                // PHA 1 — chem quet ca man
                for (let o of U.ds){
                    dkDanh(o, 30);
                    hitCat(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, 0, true, DK_MAU);
                }
                U.nenY = dkNenY();
                for (let i = 0; i < 9; i++) U.nut.push({ x: camX + 40 + i * (canvas.width - 80) / 8 + (Math.random() - 0.5) * 40, l: 30 + Math.random() * 40, s: Math.random() });
                shakeTimer = Math.max(shakeTimer || 0, 26);
                dkChu(ng.x - 40, ng.y - 50, "THIÊN ĐỊA NHẤT TRẢM!", "WORLD SPLITTER!");
                dkSfx(140, 0.5, 'sawtooth', 0.3, 50);
            }
            for (let o of U.ds) if (o._dkNoi){ o._dkNoi.t++; if (typeof venKhoa === 'function') venKhoa(o, 3); dkApVT(o); }
            // PHA 2 — kiem bay len giua troi
            let dinh = { x: worldCX(), y: -70 };
            if (U.t >= 36 && U.t < 70){
                let u = dkEm((U.t - 36) / 34, 'out');
                U.kx = tay.x + (dinh.x - tay.x) * u; U.ky = tay.y + (dinh.y - tay.y) * u;
            } else if (U.t >= 70 && U.t < 150){
                U.kx = dinh.x; U.ky = dinh.y + Math.sin(U.t * 0.2) * 3;
                let qua = { x: dinh.x, y: dinh.y + 96 };
                U.qy = qua.y;
                if (U.t % 4 === 0 && U.da.length < 26){
                    let bx = camX + Math.random() * canvas.width;
                    U.da.push({ x: bx, y: dkNenY() - 2, r: 4 + Math.random() * 7, a: Math.random() * 6 });
                }
                for (let r of U.da){ r.x += (qua.x - r.x) * 0.07; r.y += (qua.y - r.y) * 0.07; r.a += 0.2; }
                for (let o of U.ds) if (o._dkNoi) o._dkNoi.keo = qua;
                if (U.t % 10 === 0) dkSfx(900 + Math.random() * 600, 0.08, 'square', 0.1, 300);
            } else if (U.t >= 150 && U.t < 168){
                let u = dkEm((U.t - 150) / 18, 'in');
                U.kx = dinh.x; U.ky = dinh.y + (dkNenY() - 20 - 96 - dinh.y) * u;
                U.qy = U.ky + 96;
                let qua = { x: dinh.x, y: U.qy };
                for (let r of U.da){ r.x += (qua.x - r.x) * 0.3; r.y += (qua.y - r.y) * 0.3; }
                for (let o of U.ds) if (o._dkNoi) o._dkNoi.keo = qua;
            } else if (U.t === 168){
                for (let o of U.ds){
                    if (o.hp !== undefined && o.hp > 0) dkDanh(o, 120);
                    if (o._dkNoi){ o.x = o._dkNoi.x0; o.y = o._dkNoi.y0; o._dkNoi = null; if (!(o._dkGhim > 0)) dkGoBoc(o); }
                }
                U.no = { x: dinh.x, y: dkNenY() - 20, t: 0 };
                U.da = [];
                shakeTimer = Math.max(shakeTimer || 0, 40);
                dkChu(dinh.x - 50, 200, "THIÊN THẠCH KIẾM!", "METEOR BLADE!");
                dkSfx(40, 1.0, 'sawtooth', 0.36, 20); dkSfx(1600, 0.4, 'square', 0.14, 200);
            }
            if (U.no) U.no.t++;
            if (U.t >= DK_ULT_T){
                for (let o of U.ds) if (o._dkNoi){ o.y = o._dkNoi.y0; o._dkNoi = null; dkGoBoc(o); }
                ng.dk.ult = null;
            }
        }
// PLAYER_PART_END s4.dkUltTick.1

// index.html:75322 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkSong.1 EDITABLE
let dkSong = [], dkVong = [], dkSongTron = [], dkHen = [], dkNut = [], dkTrong = [], dkHap = [], dkDaManh = [], dkVo = [];
// PLAYER_PART_END s4.dkSong.1

// index.html:75324 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkNutDat.1 EDITABLE
function dkNutDat(ng, lx){
            let t = dkTG(ng, lx === undefined ? 31 + 116 : lx, 44), d = dkDir(ng);
            let tia = []; for (let k = 0; k < 6; k++) tia.push({ a: -Math.PI / 2 + (k - 2.5) * 0.5 + (Math.random() - 0.5) * 0.3, l: 14 + Math.random() * 18 });
            let y = dkChan(ng);
            dkNut.push({ x: t.x, y, t: 0, T: 46, tia, d });
            hitDat(t.x, y, 0, [161, 136, 127]);
            shakeTimer = Math.max(shakeTimer || 0, 7);
            dkSfx(70, 0.22, 'sawtooth', 0.22, 40);
        }
// PLAYER_PART_END s4.dkNutDat.1

// index.html:75333 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkNguoi.1 EDITABLE
function dkNguoi(){
            let ds = [];
            if (typeof dino !== 'undefined' && dino) ds.push(dino);
            if (gameState === 'pvp' && typeof dino2 !== 'undefined' && dino2) ds.push(dino2);
            return ds;
        }
// PLAYER_PART_END s4.dkNguoi.1
