// PLAYER_FILE: DAIKIEM04
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: BZ_J_CM, BZ_TAM_THEM, DK_CM, DK_DA_MANH_DMG, DK_DA_TAM, DK_JC_CM, DK_TRONG, DK_TRUNG_KEO, DK_TRUNG_R, Effect, bossProjectiles, bosses, bzBat, bzBeTick, bzCatDan, bzTuThuong, bzVeBe, canvas, ctx, dino, dkApVT, dkBat, dkBeMau, dkChan, dkCotDa, dkCotDaDanh, dkCua, dkDaManh, dkDangBay, dkDanh, dkDay, dkDs, dkEm, dkGhim, dkGoBoc, dkHap, dkHatLen, dkHen, dkLaBoss, dkLaQuai, dkMatDuoi, dkMuiBay, dkMuiBayHit, dkMuiDa, dkNguoi, dkNovaOn, dkNut, dkPhongAnTick, dkPose, dkSong, dkSongTron, dkTG, dkTrong, dkUltTick, dkVeUlt, dkVo, dkVong, enemies, frames, gdCatHop, hitCat, hitDat, venKhoa, visualEffects, worldL, worldR
// index.html:75339 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkChung.1 EDITABLE
function dkChung(){
            for (let ng of dkNguoi()){
                if (!ng.dk) continue;
                if (ng.dk.ult) dkUltTick(ng);
                if (!dkBat(ng)){
                    // doi vu khi: tra suc nhay, cat moi trang thai dang do
                    if (ng._dkNhay){ ng.jumpPower = -12.5; ng._dkNhay = false; }
                    if (!ng.dk.ult){
                        if ((ng.dk.voHan || 0) > 0){ ng.dk.voHan = 0; bzTuThuong(ng); }
                        ng.dk.A = null; ng.dk.kenh = false; ng.dk.bzCh = false; ng.dk.ch = null; ng.dk.trang = 'lung'; ng.dk.buff = 0; ng.dk.da = 0; ng.dk.jHold = false; ng.dk.jXa = 0; ng.dk.jDash = false; ng.dk.jGiu = 0; ng.dk.jHut = 0; ng.dk.jAn = false;
                        ng._bzAn = false;
                    }
                }
            }
            // song xung kich
            for (let i = dkSong.length - 1; i >= 0; i--){
                let S = dkSong[i]; S.t++;
                let x0, x1, y0;
                if (S.bzKhi){
                    S.x += S.d * S.v;
                    let dist = Math.abs(S.x - (S.x0 || S.x));
                    let buoc = (S.buoc || 2) * DK_CM;
                    let dmg = (S.dmg0 || 5) - Math.floor(dist / Math.max(1, buoc));
                    let lon = !!S.bzLon;
                    if (dmg <= 0 || S.t > (lon ? 52 : 36)){ dkSong.splice(i, 1); continue; }
                    S.dmg = dmg;
                    let rw = lon ? 52 : 24, rh = lon ? 44 : 22;
                    x0 = S.x - rw; x1 = S.x + rw; y0 = S.y - rh;
                    for (let o of dkDs()){
                        if (S.hit.has(o)) continue;
                        if (o.x + (o.w || 20) < x0 || o.x > x1 || o.y + (o.h || 20) < y0 || o.y > S.y + rh) continue;
                        S.hit.add(o); dkDanh(o, dmg);
                        if (typeof hitCat === 'function') hitCat(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, -S.d * 0.3, dmg >= 4, [183, 28, 28]);
                    }
                    if (typeof gdCatHop === 'function') gdCatHop({ x: x0, y: y0, w: rw * 2, h: rh * 2 });
                    continue;
                }
                if (S.da){
                    let g = Math.min(1, S.t / 50);
                    S.len = 16 + g * 680;
                    S.cao = 40 + g * 140;
                    let reach = S.len;
                    x0 = S.d > 0 ? S.x0 - 8 : S.x0 - reach;
                    x1 = S.d > 0 ? S.x0 + reach : S.x0 + 8;
                    y0 = S.y - S.cao;
                    for (let o of dkDs()){
                        if (S.hit.has(o)) continue;
                        if (o.x + (o.w || 20) < x0 || o.x > x1 || o.y + (o.h || 20) < y0 || o.y > S.y + 10) continue;
                        S.hit.add(o); dkDanh(o, S.dmg); dkHatLen(o, S.d);
                        hitCat(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, -S.d * 0.8, true, [179, 136, 255]);
                    }
                } else {
                    S.x += S.d * S.v;
                    x0 = S.x - S.rong / 2; x1 = S.x + S.rong / 2; y0 = S.y - S.cao;
                    for (let o of dkDs()){
                        if (S.hit.has(o)) continue;
                        if (o.x + (o.w || 20) < x0 || o.x > x1 || o.y + (o.h || 20) < y0 || o.y > S.y + 10) continue;
                        S.hit.add(o); dkDanh(o, S.dmg);
                        if (!S.cres){                                                  // song ban nguyet (K 0.5s) CHI gay sat thuong; day lui / choang / ghim la cua nhat quet
                            dkDay(o, S.d, 16);
                            if (dkLaQuai(o) && !S.mau){
                                if (o.stunTimer !== undefined) o.stunTimer = Math.max(o.stunTimer || 0, 18);
                                if (typeof venKhoa === 'function') venKhoa(o, 18);
                            }
                            if (dkLaQuai(o) && dkDangBay(o) && !S.mau) dkGhim(o, DK_TRONG);
                        }
                        hitCat(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, -S.d * 0.8, true, [179, 136, 255]);
                    }
                }
                if (typeof gdCatHop === 'function') gdCatHop({ x: x0, y: y0, w: x1 - x0, h: S.cao });
                if (S.mau) bzCatDan({ x: x0, y: y0, w: x1 - x0, h: S.cao });
                if (S.t >= S.T) dkSong.splice(i, 1);
            }
            for (let i = dkVong.length - 1; i >= 0; i--) if (++dkVong[i].t >= dkVong[i].T) dkVong.splice(i, 1);
            for (let i = dkSongTron.length - 1; i >= 0; i--) if (++dkSongTron[i].t >= dkSongTron[i].T) dkSongTron.splice(i, 1);
            for (let i = dkNut.length - 1; i >= 0; i--) if (++dkNut[i].t >= dkNut[i].T) dkNut.splice(i, 1);
            for (let i = dkMuiDa.length - 1; i >= 0; i--) if (++dkMuiDa[i].t >= dkMuiDa[i].T) dkMuiDa.splice(i, 1);
            for (let i = dkCotDa.length - 1; i >= 0; i--){                    // COT DA (cam sau): gay sat thuong luc trong len, chan dan ke dich khi dang dung
                let P = dkCotDa[i]; P.t++;
                if (P.t === P.delay + 1) dkCotDaDanh(P);
                if (P.t > P.delay + 2 && P.t < P.T - 16 && typeof bossProjectiles !== 'undefined'){
                    for (let k = bossProjectiles.length - 1; k >= 0; k--){
                        let bp = bossProjectiles[k]; if (!bp) continue;
                        let bw = bp.w || 10, bh = bp.h || 10;
                        if (bp.x < P.x + P.w / 2 && bp.x + bw > P.x - P.w / 2 && bp.y < P.y && bp.y + bh > P.y - P.h){
                            visualEffects.push(new Effect(bp.x, bp.y, 'parry')); bossProjectiles.splice(k, 1);
                        }
                    }
                }
                if (P.t >= P.T) dkCotDa.splice(i, 1);
            }
            for (let i = dkMuiBay.length - 1; i >= 0; i--){
                let M = dkMuiBay[i]; M.t++; M.x += M.vx; M.y += M.vy; dkMuiBayHit(M);
                // bay thang ra khoi map roi moi bien mat (khong con gioi han tam)
                let bR = (typeof worldR === 'function' ? Math.max(worldR(), canvas.width) : canvas.width) + 140;
                let bL = (typeof worldL === 'function' ? Math.min(worldL(), 0) : 0) - 140;
                if (M.t >= M.T || M.x < bL || M.x > bR || M.y < -260 || M.y > canvas.height + 160) dkMuiBay.splice(i, 1);
            }
            for (let i = dkVo.length - 1; i >= 0; i--) if (++dkVo[i].t >= dkVo[i].T) dkVo.splice(i, 1);
            // VUNG TRUNG TRONG LUC: 0.5 giay keo moi ke dich xung quanh vao tam (boss bi keo yeu hon)
            for (let i = dkTrong.length - 1; i >= 0; i--){
                let Z = dkTrong[i]; Z.t++;
                for (let o of dkDs()){
                    if (!dkLaQuai(o) || o._dkNoi) continue;
                    let dx = Z.x - (o.x + (o.w || 20) / 2);
                    if (Math.abs(dx) > Z.R || Math.abs((o.y + (o.h || 20) / 2) - Z.y) > 260) continue;
                    o.x += dx * DK_TRUNG_KEO * (dkLaBoss(o) ? 0.45 : 1);
                    o.x = Math.max(worldL() - (o.w || 20) * 0.5, Math.min(worldR() - (o.w || 20) * 0.5, o.x));
                }
                if (Z.t >= Z.T) dkTrong.splice(i, 1);
            }
            for (let i = dkHap.length - 1; i >= 0; i--) if (++dkHap[i].t >= dkHap[i].T) dkHap.splice(i, 1);
            dkDaManhTick();
            if (typeof dino !== 'undefined' && dino && dkBeMau.length) bzBeTick(dino);
            // channel: ke bay bi keo xuong, CHAM DAT thi them mot dot sat thuong
            for (let i = dkHen.length - 1; i >= 0; i--){ let H = dkHen[i]; if (--H.t <= 0){ if (H.o.hp > 0){ dkDanh(H.o, H.dmg); hitDat(H.o.x + (H.o.w || 20) / 2, H.o.y + (H.o.h || 20), 1, [179, 136, 255]); } dkHen.splice(i, 1); } }
            // ghim: dem nguoc + ap vi tri (con bi khoa _uFreeze khong goi update)
            if (typeof bosses !== 'undefined') for (let o of bosses.concat(enemies)){
                dkPhongAnTick(o);
                if ((o._dkGhim || 0) > 0){
                    o._dkGhim--; dkApVT(o);
                    if (o._dkGhim <= 0 && !o._dkNoi){ o._dkAp = 0; dkGoBoc(o); }
                }
            }
            dkVe();
        }
// PLAYER_PART_END s4.dkChung.1

// index.html:75469 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeKiem.1 EDITABLE
function dkVeKiem(phat, nl, da){
            // luoi dai 108 (80 x 1.35), ca thanh to x1.2; chuoi + chan ve ve trong he x1.2, goc luoi o y = -14.4
            const L = 108, W = 10.8, B = -14.4;
            if (phat){ ctx.shadowBlur = 14; ctx.shadowColor = phat; }
            ctx.save(); ctx.scale(1.2, 1.2);
            // num
            ctx.fillStyle = "#9E9E9E"; ctx.strokeStyle = "#37474F"; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.arc(0, 13, 3.8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            // chuoi quan da
            ctx.fillStyle = "#6D4C41"; ctx.fillRect(-2.6, -6, 5.2, 16); ctx.strokeRect(-2.6, -6, 5.2, 16);
            ctx.strokeStyle = "#3E2723"; ctx.lineWidth = 1;
            for (let k = 0; k < 5; k++){ ctx.beginPath(); ctx.moveTo(-2.6, -5 + k * 3.2); ctx.lineTo(2.6, -3.4 + k * 3.2); ctx.stroke(); }
            // chan ve khoi vuong
            ctx.fillStyle = "#8D9AA5"; ctx.strokeStyle = "#263238"; ctx.lineWidth = 1.3;
            ctx.fillRect(-13, -10.5, 26, 5); ctx.strokeRect(-13, -10.5, 26, 5);
            ctx.fillStyle = "#B0BEC5"; ctx.fillRect(-4.5, -12, 9, 7.5); ctx.strokeRect(-4.5, -12, 9, 7.5);
            ctx.restore();
            // luoi
            let g = ctx.createLinearGradient(-W / 2, 0, W / 2, 0);
            g.addColorStop(0, "#ECEFF1"); g.addColorStop(0.45, "#CFD8DC"); g.addColorStop(0.55, "#B0BEC5"); g.addColorStop(1, "#78909C");
            ctx.fillStyle = g; ctx.strokeStyle = "#37474F"; ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(-W / 2, B); ctx.lineTo(-W / 2, B - L + 16); ctx.lineTo(0, B - L); ctx.lineTo(W / 2, B - L + 16); ctx.lineTo(W / 2, B);
            ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.shadowBlur = 0;
            // ranh mau
            ctx.strokeStyle = "#607D8B"; ctx.lineWidth = 1.8;
            ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(0, B - 3); ctx.lineTo(0, B - L + 26); ctx.stroke();
            ctx.strokeStyle = "rgba(255,255,255,0.7)"; ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(-W / 2 + 1, B - 1); ctx.lineTo(-W / 2 + 1, B - L + 17); ctx.stroke();
            let f = (typeof frames !== 'undefined' ? frames : 0);
            if (da) dkVeDa(f);
            if (nl) dkVeNangLuong(nl, f);
        }
// PLAYER_PART_END s4.dkVeKiem.1

// index.html:75504 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_DA_J.1 EDITABLE
const DK_DA_J = [0.9, 0.2, 0.7, 0.35, 0.8, 0.1, 0.6, 0.45, 0.95, 0.3, 0.75, 0.15];
// PLAYER_PART_END s4.DK_DA_J.1

// index.html:75505 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeDa.1 EDITABLE
function dkVeDa(f){
            const y0 = -4, y1 = -122.4 - DK_DA_TAM * 0.9, n = 6, W0 = 17, W1 = 5;
            ctx.save(); ctx.lineJoin = 'round';
            let g = ctx.createLinearGradient(-W0, 0, W0, 0);
            g.addColorStop(0, "#6f6a73"); g.addColorStop(0.5, "#9a948c"); g.addColorStop(1, "#4c4752");
            ctx.fillStyle = g; ctx.strokeStyle = "#2a2230"; ctx.lineWidth = 1.6;
            ctx.shadowBlur = 10; ctx.shadowColor = "#B388FF";
            ctx.beginPath();
            for (let k = 0; k <= n; k++){
                let u = k / n, y = y0 + (y1 - y0) * u, w = W0 + (W1 - W0) * u, j = (DK_DA_J[k] - 0.5) * 6;
                if (k === 0) ctx.moveTo(-w + j, y); else ctx.lineTo(-w + j, y);
            }
            ctx.lineTo(0, y1 - 14);
            for (let k = n; k >= 0; k--){
                let u = k / n, y = y0 + (y1 - y0) * u, w = W0 + (W1 - W0) * u, j = (DK_DA_J[k + 5] - 0.5) * 6;
                ctx.lineTo(w + j, y);
            }
            ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.shadowBlur = 8; ctx.strokeStyle = "rgba(179,136,255," + (0.8 + 0.2 * Math.sin(f * 0.15)).toFixed(2) + ")"; ctx.lineWidth = 1.7;
            ctx.beginPath(); ctx.moveTo(-3, -8); ctx.lineTo(3, -40); ctx.lineTo(-5, -70); ctx.lineTo(2, -104); ctx.lineTo(-1, -140); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(3, -40); ctx.lineTo(10, -52); ctx.lineTo(9, -70); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(-8, -60); ctx.lineTo(-3, -72); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(2, -104); ctx.lineTo(8, -118); ctx.lineTo(7, -132); ctx.stroke();
            ctx.shadowBlur = 0; ctx.fillStyle = "#8d867f"; ctx.strokeStyle = "#B388FF"; ctx.lineWidth = 1;
            for (let k = 0; k < 3; k++){
                let yy = -50 - k * 38, xx = (k % 2 ? 24 : -24) + Math.sin(f * 0.08 + k * 2) * 3, s = 4 + (k % 2);
                ctx.fillRect(xx - s, yy - s, s * 2, s * 2); ctx.strokeRect(xx - s, yy - s, s * 2, s * 2);
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.dkVeDa.1

// index.html:75536 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeNangLuong.1 EDITABLE
function dkVeNangLuong(nl, f){
            const COL = [null, [128, 222, 234], [179, 136, 255], [255, 241, 118]];
            let c = COL[nl]; if (!c) return;
            let ext = DK_JC_CM[nl - 1] * DK_CM, y0 = -2, y1 = -122.4 - ext, w = 11 + nl * 6;
            let pul = 0.6 + 0.4 * Math.sin(f * 0.35), rgb = c.join(',');
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            ctx.shadowBlur = 18 + nl * 6; ctx.shadowColor = "rgb(" + rgb + ")";
            ctx.fillStyle = "rgba(" + rgb + "," + (0.22 + 0.1 * pul).toFixed(2) + ")";
            ctx.beginPath(); ctx.moveTo(-w * 0.55, y0); ctx.lineTo(-w, -40); ctx.lineTo(-w * 0.8, y1 + 30); ctx.lineTo(0, y1 - 18);
            ctx.lineTo(w * 0.8, y1 + 30); ctx.lineTo(w, -40); ctx.lineTo(w * 0.55, y0); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "rgba(255,255,255," + (0.6 * pul).toFixed(2) + ")"; ctx.lineWidth = 1.6; ctx.stroke();
            ctx.shadowBlur = 0; ctx.fillStyle = "rgba(255,255,255," + (0.35 * pul).toFixed(2) + ")";
            ctx.fillRect(-2, y1 + 10, 4, -y1 - 14);
            ctx.restore();
        }
// PLAYER_PART_END s4.dkVeNangLuong.1

// index.html:75552 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkNangLuong.1 EDITABLE
function dkNangLuong(dk){
            if (dk.A && dk.A.them && dk.A.them.jc) return dk.A.them.jc;
            if (dk.jHold && dk.jTier > 0 && !dk.jAn) return dk.jTier;
            if (dk.jHut > 0) return dk.jHut;
            if (dk.jGiu > 0) return dk.jGiu;
            if (dk.jXa > 0) return dk.jXa;
            if (typeof dkNovaOn === 'function' && dkNovaOn()) return 1;
            return 0;
        }
// PLAYER_PART_END s4.dkNangLuong.1

// index.html:75561 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkPhat.1 EDITABLE
function dkPhat(dk){
            if (dk._bzSac) return "#FF1744";
            if (dk._bzNgat) return "#FF8A80";
            if (dk.buff > 0) return "#FF1744";
            if (dk.kenh || (dk.A && (dk.A.kieu === 'cam' || dk.A.kieu === 'kenh'))) return "#B388FF";
            return null;
        }
// PLAYER_PART_END s4.dkPhat.1

// index.html:75570 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeSuongDo.1 EDITABLE
function dkVeSuongDo(ext, day){
            let y0 = -4, y1 = -122.4 - (ext || 0);
            let f = (typeof frames !== 'undefined' ? frames : 0);
            let pul = 0.62 + 0.38 * Math.sin(f * 0.32);
            let w = day ? 18 : 14;
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            let g = ctx.createLinearGradient(0, y0, 0, y1);
            g.addColorStop(0, "rgba(90,0,0,0)");
            g.addColorStop(0.18, "rgba(183,28,28," + (0.22 + 0.16 * pul).toFixed(2) + ")");
            g.addColorStop(0.72, "rgba(220,40,40," + (0.28 + 0.22 * pul).toFixed(2) + ")");
            g.addColorStop(1, "rgba(255,160,160," + (0.08 * pul).toFixed(2) + ")");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.moveTo(-w * 0.7, y0); ctx.lineTo(-w, y0 - 40); ctx.lineTo(-w * 0.55, y1 + 28); ctx.lineTo(0, y1 - 10);
            ctx.lineTo(w * 0.55, y1 + 28); ctx.lineTo(w, y0 - 40); ctx.lineTo(w * 0.7, y0); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "rgba(255,220,220," + (0.45 * pul).toFixed(2) + ")"; ctx.lineWidth = day ? 1.8 : 1.2;
            ctx.stroke();
            ctx.strokeStyle = "rgba(255,40,48," + (0.35 + 0.3 * pul).toFixed(2) + ")"; ctx.lineWidth = 2;
            for (let k = 0; k < 3; k++){
                let ox = Math.sin(f * 0.18 + k * 2.1) * (day ? 7 : 5);
                ctx.beginPath(); ctx.moveTo(ox, y0 - 6);
                ctx.quadraticCurveTo(ox + (k - 1) * 6, (y0 + y1) * 0.5, ox * 0.25, y1 + 6);
                ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.dkVeSuongDo.1

// index.html:75598 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeTrenNguoi.1 EDITABLE
function dkVeTrenNguoi(ng, x, y){
            let dk = dkCua(ng), p = dkPose(ng);
            if (!p) return;
            ctx.save();
            ctx.translate(x + p.px, y + p.py);
            ctx.rotate(p.ang);
            if (p.nen !== 1) ctx.scale(1, Math.abs(p.nen) < 0.12 ? (p.nen < 0 ? -0.12 : 0.12) : p.nen);
            dkVeKiem(dkPhat(dk), bzBat(ng) ? 0 : dkNangLuong(dk), !bzBat(ng) && (dk.da > 0 || !!(dk.A && (dk.A.daLuot || dk.A.daVo))));
            if (bzBat(ng)){
                let Ad = dk.A;
                if ((dk.tamThem || 0) > 0) dkVeSuongDo(BZ_TAM_THEM, false);
                else if (Ad && Ad.kieu === 'bzChat') dkVeSuongDo((Ad.them && Ad.them.reach) || 30, true);
                else if (dk.jHold && (dk.jTier || 0) >= 1 && !Ad) dkVeSuongDo(BZ_J_CM[(dk.jTier || 1) - 1] * DK_CM, true);
            }
            ctx.restore();
            // vet chem
            let A = dk.A;
            if (A && A.kieu === 'bzCua' && !A._slam){
                let a = Math.min(1, A.t / 6);
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.translate(x + 28, y + 6);
                ctx.strokeStyle = "rgba(255,40,40," + (0.22 + a * 0.5).toFixed(2) + ")";
                ctx.lineWidth = 3 + a * 7;
                ctx.beginPath(); ctx.arc(0, 0, 70 + a * 26, 0, Math.PI * 2); ctx.stroke();
                ctx.strokeStyle = "rgba(255,210,210," + (0.28 * a).toFixed(2) + ")";
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(0, 0, 92 + a * 18, A._ang || 0, (A._ang || 0) + Math.PI * 1.4); ctx.stroke();
                ctx.restore();
            }
            if (A && (A.kieu === 'bzVong' || A.kieu === 'bzKen') && (A.kieu === 'bzKen' || A.t <= 54)){
                const NHIP = 18;
                let idx = A.kieu === 'bzKen' ? (Math.floor(Math.max(0, A.t - 1) / NHIP) % 3) : Math.min(2, Math.floor(Math.max(0, A.t - 1) / NHIP));
                let lech = [-12, 16, 0][idx], nghieng = [-0.28, 0.22, 0][idx];
                let rx = idx === 2 ? 132 : 84, ry = idx === 2 ? 9 : 15;
                let mauV = (dk.tamThem || 0) > 0;
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.translate(x + 30, y + 16 + lech);
                ctx.strokeStyle = mauV ? ("rgba(183,28,28," + (idx === 2 ? "0.85" : "0.6") + ")") : ("rgba(255,214,214," + (idx === 2 ? "0.7" : "0.45") + ")");
                ctx.lineWidth = idx === 2 ? 8 : 5;
                ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, nghieng, Math.PI * 0.8, Math.PI * 2.2); ctx.stroke();
                ctx.restore();
            }
            if (A && A.kieu === 'quet') dkVeQuetBanNguyet(ng, A, x, y, p);      // CHARGE MOC 1: vet ban nguyet quet tu duoi len
            if (A && A.kieu === 'bzLH5') dkVeKhoan(ng, A, x, y, p);             // CHARGE 2.5s: aura + mui khoan
            let bzVet = A && A.kieu && A.kieu.indexOf('bz') === 0;
            let mauCat = bzBat(ng) && ((dk.tamThem || 0) > 0 || (A && A.kieu === 'bzRut'));
            if (A && A.t >= A.hit - (bzVet ? 8 : 4) && A.t <= A.hit + (bzVet ? 6 : 5) && A.m.dmg > 0){
                let a = 1 - Math.abs(A.t - A.hit) / 6;
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.strokeStyle = mauCat ? ("rgba(183,28,28," + (0.9 * a).toFixed(2) + ")") : ("rgba(225,235,255," + (0.75 * a).toFixed(2) + ")");
                ctx.lineCap = 'round';
                ctx.translate(x + 30, y + 8);
                if (A.kieu === 'bzRut'){
                    ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-6, 8); ctx.lineTo(188, 8); ctx.stroke();
                } else if (A.m.ngang){
                    let rong = A.kieu === 'ngang2' ? 220 : 150, mong = A.kieu === 'ngang2' ? 12 : 22;
                    ctx.lineWidth = A.kieu === 'ngang2' ? 11 : 9; ctx.beginPath(); ctx.ellipse(0, 6, rong, mong, A.m.ngang[3], Math.PI * 0.9, Math.PI * 2.1); ctx.stroke();
                } else if (A.kieu === 'dam' || A.kieu === 'dam2'){
                    ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(10, 14); ctx.lineTo(160, 14); ctx.stroke();
                } else if (A.kieu !== 'quet' && A.vet && A.vet.length > 1){
                    // vet cung theo goc kiem 5 khung gan nhat, quanh tay cam
                    let q = A.vet[A.vet.length - 1], a0 = A.vet[0].ang - Math.PI / 2, a1 = q.ang - Math.PI / 2;
                    ctx.translate(q.px - 30, q.py - 8);
                    if (Math.abs(a1 - a0) > 0.05){
                        ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(0, 0, 100, Math.min(a0, a1), Math.max(a0, a1)); ctx.stroke();
                        ctx.lineWidth = 4; ctx.strokeStyle = mauCat ? ("rgba(255,80,80," + (0.7 * a).toFixed(2) + ")") : ("rgba(179,136,255," + (0.6 * a).toFixed(2) + ")");
                        ctx.beginPath(); ctx.arc(0, 0, 118, Math.min(a0, a1), Math.max(a0, a1)); ctx.stroke();
                    }
                }
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.dkVeTrenNguoi.1

// index.html:75670 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVe.1 EDITABLE
function dkVe(){
            bzVeBe();
            // hao quang bat mon + ghim
            for (let ng of dkNguoi()){
                let dk = ng.dk; if (!dk || !dkBat(ng)) continue;
                if (dk.buff > 0){
                    let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2, f = (typeof frames !== 'undefined' ? frames : 0);
                    ctx.save(); ctx.globalCompositeOperation = 'lighter';
                    let g = ctx.createRadialGradient(cx, cy, 6, cx, cy, ng.h * 1.2);
                    g.addColorStop(0, "rgba(255,23,68,0.35)"); g.addColorStop(1, "rgba(255,23,68,0)");
                    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, ng.h * 1.2, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = "rgba(255,82,82,0.7)"; ctx.lineWidth = 2.5;
                    for (let i = 0; i < 7; i++){
                        let xx = cx + (i - 3) * 9, hh = 26 + Math.abs(Math.sin(f * 0.3 + i * 1.7)) * 30;
                        ctx.beginPath(); ctx.moveTo(xx, ng.y + ng.h); ctx.quadraticCurveTo(xx + Math.sin(f * 0.2 + i) * 8, ng.y + ng.h - hh * 0.6, xx, ng.y + ng.h - hh - 10); ctx.stroke();
                    }
                    ctx.restore();
                }
                if ((dk.voHan || 0) > 0 && bzBat(ng)){
                    let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2, f = (typeof frames !== 'undefined' ? frames : 0);
                    let gap = dk.voHan < 60;
                    ctx.save(); ctx.globalCompositeOperation = 'lighter';
                    ctx.strokeStyle = gap ? "rgba(255,23,68,0.9)" : "rgba(255,82,82,0.75)";
                    ctx.lineWidth = gap ? 3 : 2;
                    let r = ng.h * (0.85 + 0.08 * Math.sin(f * 0.35));
                    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
                    ctx.restore();
                }
                if (dk.kenh){
                    let t = dkTG(ng, 48, 30), f = (typeof frames !== 'undefined' ? frames : 0);
                    ctx.save(); ctx.globalCompositeOperation = 'lighter';
                    ctx.strokeStyle = "rgba(179,136,255,0.5)"; ctx.lineWidth = 3;
                    let u = ((f % 30) / 30);
                    ctx.beginPath(); ctx.ellipse(t.x, dkChan(ng), 30 + u * 40, 6 + u * 6, 0, 0, Math.PI * 2); ctx.stroke();
                    ctx.restore();
                }
            }
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            // vong tim co vao kiem
            for (const V of dkVong){
                let u = V.t / V.T, R = V.R * (1 - u) + 10;
                ctx.strokeStyle = "rgba(179,136,255," + (0.35 + 0.5 * u).toFixed(2) + ")"; ctx.lineWidth = 3 + 5 * u;
                ctx.beginPath(); ctx.arc(V.x, V.y - 20, R, 0, Math.PI * 2); ctx.stroke();
                ctx.strokeStyle = "rgba(224,204,255," + (0.3 * u).toFixed(2) + ")"; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.arc(V.x, V.y - 20, R * 1.15, 0, Math.PI * 2); ctx.stroke();
            }
            // song: kiem khi (theo moc J) hoac cot da
            for (const S of dkSong) dkVeSong(S);
            ctx.globalCompositeOperation = 'source-over';
            for (const N of dkNut){
                let a = 1 - N.t / N.T;
                ctx.strokeStyle = "rgba(62,39,35," + (0.85 * a).toFixed(2) + ")"; ctx.lineWidth = 2.2;
                for (const r of N.tia){
                    ctx.beginPath(); ctx.moveTo(N.x, N.y + 1);
                    let x = N.x, y = N.y + 1;
                    for (let s = 1; s <= 3; s++){ x += Math.cos(r.a) * r.l / 3 * 1.6 + (s % 2 ? 2 : -2); y = N.y + 1 + Math.abs(Math.sin(r.a)) * r.l * 0.18 * s; ctx.lineTo(x, y); }
                    ctx.stroke();
                }
                ctx.fillStyle = "rgba(141,110,99," + (0.7 * a).toFixed(2) + ")";
                for (let k = 0; k < 5; k++){ let u = N.t / N.T; ctx.fillRect(N.x + (k - 2) * 7 * (1 + u * 2), N.y - 4 - 18 * u * (1 + (k % 2)), 4, 4); }
            }
            ctx.globalCompositeOperation = 'lighter';
            // dia chan (channel)
            for (const Q of dkSongTron){
                let u = Q.t / Q.T, R = Q.R * dkEm(u, 'out'), a = 1 - u;
                ctx.strokeStyle = "rgba(179,136,255," + (0.8 * a).toFixed(2) + ")"; ctx.lineWidth = 5;
                ctx.beginPath(); ctx.ellipse(Q.x, Q.y, R, 10 + R * 0.04, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.fillStyle = "rgba(141,110,99," + (0.6 * a).toFixed(2) + ")";
                for (let k = -4; k <= 4; k++){ if (!k) continue; let xx = Q.x + k * R / 4.5; ctx.fillRect(xx - 3, Q.y - 8 - 10 * a, 6, 8); }
            }
            ctx.restore();
            // ke bi ghim: xich tim keo xuong dat
            if (typeof bosses !== 'undefined') for (let o of bosses.concat(enemies)){
                if (!((o._dkGhim || 0) > 0)) continue;
                let cx = o.x + (o.w || 20) / 2, gy = dkMatDuoi(cx, o.y + (o.h || 20)) + 2;
                let nang = (o._dkAp || 1) >= 2;
                ctx.save(); ctx.strokeStyle = nang ? "rgba(210,140,255,0.9)" : "rgba(179,136,255,0.75)"; ctx.lineWidth = nang ? 3.4 : 2; ctx.setLineDash([5, 4]);
                ctx.beginPath(); ctx.moveTo(cx - 8, o.y + (o.h || 20)); ctx.lineTo(cx - 14, gy); ctx.moveTo(cx + 8, o.y + (o.h || 20)); ctx.lineTo(cx + 14, gy); ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillStyle = "rgba(124,77,255,0.55)"; ctx.beginPath(); ctx.ellipse(cx, gy, (o.w || 20) * 0.6, 5, 0, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            }
            dkVeThem();
            // chieu cuoi
            for (let ng of dkNguoi()) if (ng.dk && ng.dk.ult) dkVeUlt(ng, ng.dk.ult);
        }
// PLAYER_PART_END s4.dkVe.1

// index.html:75757 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkDaManhTick.1 EDITABLE
function dkDaManhTick(){
            for (let i = dkDaManh.length - 1; i >= 0; i--){
                let r = dkDaManh[i];
                r.t++;
                if (!r.lan) r.vy += 0.48;
                r.x += r.vx;
                if (!r.lan) r.y += r.vy;
                r.rot += r.lan ? r.vx * 0.14 : r.vr;
                let nen = dkMatDuoi(r.x, r.y + r.s + 4);
                if (r.y + r.s >= nen - 1){
                    r.y = nen - r.s;
                    if (!r.lan && r.vy > 1.6){
                        r.vy = -r.vy * 0.34;
                        r.vx *= 0.88;
                    } else {
                        r.vy = 0; r.lan = true;
                        r.vx *= 0.975;
                    }
                } else if (r.lan){
                    r.lan = false; r.vy = 0.8;
                }
                let x0 = r.x - r.s, y0 = r.y - r.s, x1 = r.x + r.s, y1 = r.y + r.s + (r.lan ? 8 : 2);
                for (let o of dkDs()){
                    if (!o || r.hit.has(o) || !(o.hp > 0)) continue;
                    let ow = o.w || 20, oh = o.h || 20;
                    if (o.x + ow < x0 || o.x > x1 || o.y + oh < y0 || o.y > y1) continue;
                    r.hit.add(o);
                    dkDanh(o, r.dmg || DK_DA_MANH_DMG);
                    dkDay(o, Math.sign(r.vx) || 1, r.lon ? 16 : 8);
                    if (typeof hitCat === 'function') hitCat(o.x + ow / 2, Math.min(o.y + oh, r.y), Math.sign(r.vx) || 1, false, [141, 110, 99]);
                }
                let het = r.t > 168 || (r.lan && Math.abs(r.vx) < 0.42) || r.x < worldL() - 60 || r.x > worldR() + 60 || r.y > nen + 240;
                if (het) dkDaManh.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.dkDaManhTick.1

// index.html:75792 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeSong.1 EDITABLE
function dkVeSong(S){
            if (S.bzKhi){
                let lon = !!S.bzLon;
                let dmg = S.dmg || 0;
                let a = Math.max(0, Math.min(1, dmg / (lon ? 4 : 2)));
                let R = lon ? 54 : 26;
                ctx.save();
                ctx.translate(S.x, S.y);
                ctx.scale(S.d, 1);
                ctx.globalAlpha = 0.35 + 0.65 * a;
                ctx.strokeStyle = "rgba(255,210,210," + (0.8 * a).toFixed(2) + ")";
                ctx.lineWidth = (lon ? 5 : 3) + a * 3;
                ctx.beginPath();
                ctx.arc(0, 0, R, -1.15, 1.15);
                ctx.stroke();
                ctx.strokeStyle = "rgba(183,28,28," + (0.85 * a).toFixed(2) + ")";
                ctx.lineWidth = lon ? 12 : 6;
                ctx.beginPath();
                ctx.arc(lon ? 8 : 4, 0, lon ? 36 : 18, -0.95, 0.95);
                ctx.stroke();
                ctx.restore();
                return;
            }
            if (S.da){
                let life = S.t / S.T;
                let a = life < 0.8 ? 1 : Math.max(0, (1 - life) / 0.2);
                ctx.save();
                ctx.globalCompositeOperation = 'source-over';
                ctx.translate(S.x0, S.y);
                ctx.scale(S.d, 1);
                dkVeCotDa(S.len || 20, a);
                ctx.restore();
                return;
            }
            if (S.cres){ dkVeSongBanNguyet(S); return; }
            // hieu ung goc: nua vang trang tim dung tren mat dat
            let a = 1 - S.t / S.T;
            let mau = !!S.mau;
            ctx.save();
            ctx.translate(S.x, S.y);
            ctx.scale(S.d, 1);
            let g = ctx.createLinearGradient(-S.rong, 0, S.rong * 0.6, 0);
            g.addColorStop(0, mau ? "rgba(183,28,28,0)" : "rgba(179,136,255,0)");
            g.addColorStop(1, mau ? "rgba(255,80,80," + (0.9 * a).toFixed(2) + ")" : "rgba(224,210,255," + (0.85 * a).toFixed(2) + ")");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.moveTo(-S.rong * 0.6, 0);
            ctx.quadraticCurveTo(S.rong * 0.9, -S.cao * 0.4, -S.rong * 0.1, -S.cao);
            ctx.quadraticCurveTo(S.rong * 0.35, -S.cao * 0.45, -S.rong * 0.2, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
// PLAYER_PART_END s4.dkVeSong.1

// index.html:75850 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DK_QUET_PHI.1 EDITABLE
const DK_QUET_PHI = 5.0832;
// PLAYER_PART_END s4.DK_QUET_PHI.1

// index.html:75851 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkMauBN.1 EDITABLE
function dkMauBN(hong){
            return hong ? { c: [255, 70, 70], w: [255, 225, 225] } : { c: [190, 160, 255], w: [240, 245, 255] };
        }
// PLAYER_PART_END s4.dkMauBN.1

// index.html:75855 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeKhoan.1 EDITABLE
function dkVeKhoan(ng, A, x, y, p){
            if (!p || !A) return;
            let t = A.t, hit = A.hit, kd = A.m.keoDai || 12, f = (typeof frames !== 'undefined' ? frames : 0);
            let pre = Math.min(1, t / hit);
            let grow = t >= hit ? Math.min(1, (t - hit + 1) / 3) : 0;
            let fade = t > hit + kd ? Math.max(0, 1 - (t - hit - kd) / 8) : 1;
            if (fade <= 0) return;
            const LB = 118, BASE = -26;
            ctx.save();
            ctx.translate(x + p.px, y + p.py); ctx.rotate(p.ang);
            ctx.globalCompositeOperation = 'lighter';
            ctx.save(); ctx.translate(0, -(LB * 0.5 + 8)); ctx.scale(0.42, 1);                // AURA NHE: elip keo doc theo luoi
            let ar = (LB * 0.62) * (0.7 + 0.3 * pre), al = (0.25 + 0.35 * pre) * fade * (1 - 0.35 * grow);
            let ga = ctx.createRadialGradient(0, 0, 4, 0, 0, ar);
            ga.addColorStop(0, 'rgba(255,120,120,' + (0.5 * al).toFixed(2) + ')');
            ga.addColorStop(0.55, 'rgba(230,30,55,' + (0.55 * al).toFixed(2) + ')');
            ga.addColorStop(1, 'rgba(120,0,20,0)');
            ctx.fillStyle = ga; ctx.beginPath(); ctx.arc(0, 0, ar, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
            if (t < hit){                                                                      // hat nang luong hoi tu vao luoi
                ctx.fillStyle = 'rgba(255,200,200,' + (0.8 * fade).toFixed(2) + ')';
                for (let i = 0; i < 9; i++){
                    let ph = ((f * 0.07) + i / 9) % 1, ang = i * 2.4 + f * 0.05, r = (1 - ph) * 34;
                    ctx.fillRect(Math.cos(ang) * r - 1.5, -LB * (0.25 + 0.7 * ph) - 1.5, 3, 3);
                }
            }
            if (grow > 0){                                                                     // MUI KHOAN
                let tip = LB + 12 + 62 * grow, Wb = 27 * (0.6 + 0.4 * grow);
                let gx = ctx.createLinearGradient(-Wb, 0, Wb, 0);
                gx.addColorStop(0, 'rgba(24,2,6,' + (0.95 * fade).toFixed(2) + ')');
                gx.addColorStop(0.5, 'rgba(190,24,40,' + (0.97 * fade).toFixed(2) + ')');
                gx.addColorStop(1, 'rgba(18,2,5,' + (0.95 * fade).toFixed(2) + ')');
                ctx.globalCompositeOperation = 'source-over';                                  // than khoan ve mau thuong (do sam) de khong chay trang tren nen sang
                ctx.shadowBlur = 18; ctx.shadowColor = 'rgba(255,40,60,0.9)';
                ctx.fillStyle = gx;
                ctx.beginPath(); ctx.moveTo(-Wb, BASE); ctx.quadraticCurveTo(-Wb * 0.55, -tip * 0.55, 0, -tip); ctx.quadraticCurveTo(Wb * 0.55, -tip * 0.55, Wb, BASE); ctx.closePath(); ctx.fill();
                ctx.shadowBlur = 0; ctx.lineCap = 'round';
                ctx.globalCompositeOperation = 'lighter';
                for (let i = 0; i < 7; i++){                                                   // van xoan oc cuon doc than khoan
                    let s = ((i / 7) + f * 0.09) % 1, yy = BASE - s * (tip - BASE), w = Wb * Math.pow(1 - s, 0.85);
                    ctx.strokeStyle = 'rgba(255,235,235,' + ((0.85 - 0.5 * s) * fade).toFixed(2) + ')'; ctx.lineWidth = 2.4 - s * 1.2;
                    ctx.beginPath(); ctx.moveTo(-w, yy); ctx.quadraticCurveTo(0, yy - 9 * (1 - s * 0.6), w, yy); ctx.stroke();
                }
                ctx.strokeStyle = 'rgba(255,255,255,' + (0.7 * fade).toFixed(2) + ')'; ctx.lineWidth = 1.6;
                ctx.beginPath(); ctx.moveTo(-Wb, BASE); ctx.quadraticCurveTo(-Wb * 0.55, -tip * 0.55, 0, -tip); ctx.quadraticCurveTo(Wb * 0.55, -tip * 0.55, Wb, BASE); ctx.stroke();
                let gt = ctx.createRadialGradient(0, -tip, 0, 0, -tip, 16);
                gt.addColorStop(0, 'rgba(255,255,255,' + (0.95 * fade).toFixed(2) + ')'); gt.addColorStop(1, 'rgba(255,60,80,0)');
                ctx.fillStyle = gt; ctx.beginPath(); ctx.arc(0, -tip, 16, 0, Math.PI * 2); ctx.fill();
                for (let i = 0; i < 5; i++){                                                   // vet toc do phia sau
                    let yy = 14 + i * 12, w = 10 + i * 5;
                    ctx.strokeStyle = 'rgba(255,90,100,' + ((0.45 - i * 0.08) * fade).toFixed(2) + ')'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(-w, yy); ctx.lineTo(-w * 0.2, yy + 10); ctx.moveTo(w, yy); ctx.lineTo(w * 0.2, yy + 10); ctx.stroke();
                }
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.dkVeKhoan.1

// index.html:75911 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeQuetBanNguyet.1 EDITABLE
function dkVeQuetBanNguyet(ng, A, x, y, p){
            if (!p || !A) return;
            let phi = Math.max(0, Math.min(DK_QUET_PHI, -1.9 - p.ang));
            if (phi < 0.35) return;                                     // kiem chua bat dau vung
            if (A._qHet === undefined && phi >= DK_QUET_PHI - 0.012) A._qHet = A.t;
            let fade = A._qHet === undefined ? 0 : Math.min(1, (A.t - A._qHet) / 9);
            if (fade >= 1) return;
            const TRAIL = 2.7, R = 118, TH = 30;                        // do dai vet (rad) · ban kinh mep ngoai · do day toi da
            let head = phi, tail = Math.max(0.35, head - TRAIL * (1 - fade));
            if (head - tail < 0.12) return;
            let col = dkMauBN(bzBat(ng)), C = col.c, W = col.w;
            let al = (1 - fade) * (0.55 + 0.45 * Math.min(1, (phi - 0.35) / 1.2));
            let f0 = (typeof frames !== 'undefined' ? frames : 0);
            ctx.save();
            ctx.translate(x + p.px, y + p.py);
            ctx.globalCompositeOperation = 'lighter';
            const N = 28, out = [], inn = [];
            for (let k = 0; k <= N; k++){
                let f = k / N, ph = tail + (head - tail) * f;
                let a = (-1.9 - ph) - Math.PI / 2;                        // goc tren canvas cua mui kiem (kiem huong len = -90 do)
                let th = TH * Math.pow(Math.sin(Math.PI * Math.min(1, f * 0.94 + 0.03)), 0.85);   // nhon - day - nhon
                let ro = R + th * 0.3, ri = ro - th;
                out.push([Math.cos(a) * ro, Math.sin(a) * ro]);
                inn.push([Math.cos(a) * ri, Math.sin(a) * ri]);
            }
            let g = ctx.createRadialGradient(0, 0, R - TH, 0, 0, R + TH * 0.45);
            g.addColorStop(0, "rgba(" + C + ",0)");
            g.addColorStop(0.5, "rgba(" + C + "," + (0.55 * al).toFixed(2) + ")");
            g.addColorStop(0.9, "rgba(" + W + "," + (0.95 * al).toFixed(2) + ")");
            g.addColorStop(1, "rgba(" + W + "," + (0.2 * al).toFixed(2) + ")");
            ctx.shadowBlur = 14; ctx.shadowColor = "rgba(" + C + ",0.9)";
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.moveTo(out[0][0], out[0][1]);
            for (let k = 1; k <= N; k++) ctx.lineTo(out[k][0], out[k][1]);
            for (let k = N; k >= 0; k--) ctx.lineTo(inn[k][0], inn[k][1]);
            ctx.closePath(); ctx.fill();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = "rgba(" + W + "," + (0.9 * al).toFixed(2) + ")"; ctx.lineWidth = 2.4; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(out[0][0], out[0][1]); for (let k = 1; k <= N; k++) ctx.lineTo(out[k][0], out[k][1]); ctx.stroke();
            ctx.strokeStyle = "rgba(" + C + "," + (0.4 * al).toFixed(2) + ")"; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(inn[2][0], inn[2][1]); for (let k = 3; k <= N - 2; k++) ctx.lineTo(inn[k][0], inn[k][1]); ctx.stroke();
            ctx.fillStyle = "rgba(" + W + "," + (0.75 * al).toFixed(2) + ")";            // tia sang bat ra mep ngoai
            for (let i = 0; i < 7; i++){
                let k = Math.round((i + 0.5) / 7 * N), r = 6 + 8 * (0.5 + 0.5 * Math.sin(f0 * 0.7 + i * 2.1));
                let ax = out[k][0], ay = out[k][1], m = Math.hypot(ax, ay) || 1;
                ctx.fillRect(ax + ax / m * r - 1.5, ay + ay / m * r - 1.5, 3, 3);
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.dkVeQuetBanNguyet.1

// index.html:75960 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeSongBanNguyet.1 EDITABLE
function dkVeSongBanNguyet(S){
            let life = S.t / S.T, a = Math.max(0, Math.min(1, (1 - life) * 1.7));
            if (a <= 0) return;
            let grow = Math.min(1, 0.5 + S.t / 9 * 0.5);                    // moi ra thi nho, lon dan nhu vua duoc vung len
            let cao = S.cao * grow, rong = S.rong * (0.7 + 0.3 * grow);
            let col = dkMauBN(!!S.mau || !!S.hong), C = col.c, W = col.w;
            ctx.save();
            ctx.translate(S.x, S.y); ctx.scale(S.d, 1);
            ctx.globalCompositeOperation = 'lighter';
            for (let k = 3; k >= 0; k--){                                   // k = 0 la ban nguyet chinh, k > 0 la anh du mo phia sau
                let al = a * (k === 0 ? 1 : 0.3 / k), sc = 1 - k * 0.12, H = cao * sc, Wd = rong * sc;
                ctx.save();
                ctx.translate(-k * 16, 0);
                ctx.transform(1, 0, -0.16, 1, 0, 0);                         // nghieng: dau tren huong ve phia truoc
                let g = ctx.createLinearGradient(0, 0, Wd * 1.15, 0);
                g.addColorStop(0, "rgba(" + C + ",0)");
                g.addColorStop(0.45, "rgba(" + C + "," + (0.55 * al).toFixed(2) + ")");
                g.addColorStop(1, "rgba(" + W + "," + (0.95 * al).toFixed(2) + ")");
                ctx.shadowBlur = k === 0 ? 16 : 6; ctx.shadowColor = "rgba(" + C + ",0.9)";
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(Wd * 1.3, -H * 0.1, Wd * 1.3, -H * 0.9, 0, -H);      // mep ngoai phong ra phia truoc
                ctx.bezierCurveTo(Wd * 0.45, -H * 0.8, Wd * 0.45, -H * 0.2, 0, 0);     // mep trong khuyet vao
                ctx.closePath(); ctx.fill();
                ctx.shadowBlur = 0;
                if (k === 0){
                    ctx.strokeStyle = "rgba(" + W + "," + (0.9 * al).toFixed(2) + ")"; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
                    ctx.beginPath(); ctx.moveTo(0, 0);
                    ctx.bezierCurveTo(Wd * 1.3, -H * 0.1, Wd * 1.3, -H * 0.9, 0, -H); ctx.stroke();
                    ctx.fillStyle = "rgba(" + W + "," + (0.9 * al).toFixed(2) + ")";
                    ctx.beginPath(); ctx.arc(0, -H, 3.2, 0, Math.PI * 2); ctx.arc(0, 0, 3.2, 0, Math.PI * 2); ctx.fill();
                }
                ctx.restore();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.dkVeSongBanNguyet.1

// index.html:75998 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeCotDa.1 EDITABLE
function dkVeCotDa(len, a){
            ctx.globalAlpha = 0.4 + 0.6 * a;
            ctx.fillStyle = '#120e0c';
            ctx.beginPath();
            ctx.moveTo(-8, 3);
            let crack = Math.max(2, Math.ceil(len / 12));
            for (let i = 0; i <= crack; i++) ctx.lineTo(-8 + i * 12, i % 2 ? 9 : -2);
            ctx.lineTo(len + 8, 6);
            ctx.lineTo(-8, 14);
            ctx.fill();
            let n = Math.max(8, Math.floor(len / 16));
            for (let i = 0; i < n; i++){
                let t = n === 1 ? 1 : i / (n - 1);
                let x = t * len;
                let h = 18 + t * 130;
                let bw = 7 + t * 20;
                let lean = 6 + t * 36;
                ctx.beginPath();
                ctx.moveTo(x, 3);
                ctx.lineTo(x + bw, 3);
                ctx.lineTo(x + bw * 0.35 + lean, -h);
                ctx.closePath();
                let g = ctx.createLinearGradient(x, 0, x + lean, -h);
                g.addColorStop(0, '#3c3733');
                g.addColorStop(0.45, '#cfc6ba');
                g.addColorStop(1, '#6e665e');
                ctx.fillStyle = g;
                ctx.fill();
                ctx.strokeStyle = '#161210';
                ctx.lineWidth = 1.3;
                ctx.stroke();
                if (t > 0.2){
                    ctx.strokeStyle = '#9a78e0';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(x + bw * 0.4, -4);
                    ctx.lineTo(x + bw * 0.3 + lean * 0.65, -h * 0.72);
                    ctx.stroke();
                }
            }
            ctx.globalAlpha = 1;
        }
// PLAYER_PART_END s4.dkVeCotDa.1

// index.html:76040 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeDaManh.1 EDITABLE
function dkVeDaManh(){
            for (const r of dkDaManh){
                ctx.save();
                ctx.translate(r.x, r.y); ctx.rotate(r.rot);
                if (r.lon){
                    let L = r.len || 48, W = r.wid || 16;
                    ctx.shadowBlur = 16; ctx.shadowColor = "rgba(179,136,255,0.95)";
                    let g = ctx.createLinearGradient(-W, 0, W, 0);
                    g.addColorStop(0, "#6f6a73"); g.addColorStop(0.48, "#c4bdb3"); g.addColorStop(1, "#3e3844");
                    ctx.fillStyle = g; ctx.strokeStyle = "#241c2c"; ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(-W * 0.85, L * 0.42);
                    ctx.lineTo(-W * 0.25, -L * 0.05);
                    ctx.lineTo(-W * 0.7, -L * 0.28);
                    ctx.lineTo(0, -L * 0.52);
                    ctx.lineTo(W * 0.72, -L * 0.18);
                    ctx.lineTo(W * 0.28, L * 0.16);
                    ctx.lineTo(W * 0.9, L * 0.46);
                    ctx.closePath(); ctx.fill(); ctx.stroke();
                    ctx.strokeStyle = "#B388FF"; ctx.lineWidth = 1.7;
                    ctx.beginPath(); ctx.moveTo(-W * 0.15, L * 0.28); ctx.lineTo(W * 0.08, -L * 0.02); ctx.lineTo(-W * 0.12, -L * 0.4); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(W * 0.1, -L * 0.08); ctx.lineTo(W * 0.45, L * 0.12); ctx.stroke();
                } else {
                    ctx.shadowBlur = 7; ctx.shadowColor = "rgba(179,136,255,0.75)";
                    ctx.fillStyle = "#8d867f"; ctx.strokeStyle = "#B388FF"; ctx.lineWidth = 1.3;
                    ctx.beginPath();
                    ctx.moveTo(-r.s, -r.s * 0.35); ctx.lineTo(-r.s * 0.2, -r.s); ctx.lineTo(r.s * 0.85, -r.s * 0.45);
                    ctx.lineTo(r.s, r.s * 0.4); ctx.lineTo(r.s * 0.15, r.s * 0.85); ctx.lineTo(-r.s * 0.8, r.s * 0.35);
                    ctx.closePath(); ctx.fill(); ctx.stroke();
                }
                ctx.restore();
                if (r.lan && Math.abs(r.vx) > 0.7){
                    ctx.fillStyle = "rgba(141,110,99,0.4)";
                    ctx.fillRect(r.x - r.vx * 1.6 - 2, r.y + r.s - 3, r.lon ? 10 : 5, 2);
                }
            }
        }
// PLAYER_PART_END s4.dkVeDaManh.1

// index.html:76077 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeThem.1 EDITABLE
function dkVeThem(){
            let f = (typeof frames !== 'undefined' ? frames : 0);
            // COT DA (cam sau): cot lon quanh nguoi + dot cot nho chay doc map; trong len nhanh, dung, roi chim xuong
            for (const P of dkCotDa){
                let t = P.t - P.delay; if (t < 1) continue;
                let left = P.T - P.delay - t, up = Math.min(1, t / 6), sink = left < 16 ? Math.max(0, left / 16) : 1;
                let H = P.h * (1 - Math.pow(1 - up, 3)) * sink; if (H < 3) continue;
                let W = P.w, j = P.jag;
                ctx.save(); ctx.translate(P.x, P.y);
                ctx.fillStyle = 'rgba(120,112,104,' + (0.45 * sink).toFixed(2) + ')';                      // bui + vet nut o chan cot
                ctx.beginPath(); ctx.ellipse(0, 2, W * 1.1, 5, 0, 0, Math.PI * 2); ctx.fill();
                let g = ctx.createLinearGradient(-W / 2, 0, W / 2, 0);
                g.addColorStop(0, '#a39d94'); g.addColorStop(0.5, '#7a7570'); g.addColorStop(1, '#4a454c');
                ctx.fillStyle = g; ctx.strokeStyle = '#2a2230'; ctx.lineWidth = P.big ? 2 : 1.4; ctx.lineJoin = 'round';
                ctx.beginPath();
                ctx.moveTo(-W / 2 - 2, 4);
                ctx.lineTo(-W / 2 + (j[0] - 0.5) * 5, -H * 0.5);
                ctx.lineTo(-W * 0.38, -H * 0.86 - j[1] * 6);
                ctx.lineTo((j[2] - 0.5) * 8, -H - j[3] * 8);
                ctx.lineTo(W * 0.38, -H * 0.82 - j[4] * 6);
                ctx.lineTo(W / 2 + (j[5] - 0.5) * 5, -H * 0.45);
                ctx.lineTo(W / 2 + 2, 4);
                ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.strokeStyle = 'rgba(42,34,48,0.75)'; ctx.lineWidth = 1.2;                              // vach da xep tang
                for (const f of [0.22, 0.5, 0.74]){ ctx.beginPath(); ctx.moveTo(-W / 2 + 2, -H * f); ctx.lineTo(W / 2 - 2, -H * f + (j[1] - 0.5) * 6); ctx.stroke(); }
                ctx.save(); ctx.shadowBlur = 8; ctx.shadowColor = '#B388FF'; ctx.strokeStyle = 'rgba(179,136,255,' + (0.9 * sink).toFixed(2) + ')'; ctx.lineWidth = P.big ? 2 : 1.4;
                ctx.beginPath(); ctx.moveTo(-1, -2); ctx.lineTo(W * 0.12, -H * 0.3); ctx.lineTo(-W * 0.1, -H * 0.55); ctx.lineTo(W * 0.08, -H * 0.82); ctx.stroke();
                ctx.restore();
                ctx.restore();
            }
            // MUI DA PHONG RA (Dash J + kiem da): 4 mui da nhon bay choe ve phia truoc, de lai vet mo
            for (const M of dkMuiBay){
                let a = Math.min(1, (M.T - M.t) / 5), dirA = M.d > 0 ? M.ang : Math.PI - M.ang;
                for (let k = 3; k >= 0; k--){
                    ctx.save();
                    ctx.translate(M.x - M.vx * k * 0.9, M.y - M.vy * k * 0.9); ctx.rotate(dirA);
                    ctx.globalAlpha = a * (k === 0 ? 1 : 0.28 / k);
                    let g = ctx.createLinearGradient(0, -5, 0, 5); g.addColorStop(0, '#a39d94'); g.addColorStop(1, '#4a454c');
                    ctx.fillStyle = g; ctx.strokeStyle = '#2a2230'; ctx.lineWidth = 1.2; ctx.lineJoin = 'round';
                    ctx.beginPath(); ctx.moveTo(26, 0); ctx.lineTo(4, -5.5); ctx.lineTo(-10, -3.2); ctx.lineTo(-14, 0); ctx.lineTo(-10, 3.2); ctx.lineTo(4, 5.5); ctx.closePath(); ctx.fill(); ctx.stroke();
                    if (k === 0){
                        ctx.shadowBlur = 6; ctx.shadowColor = '#B388FF'; ctx.strokeStyle = 'rgba(179,136,255,0.95)'; ctx.lineWidth = 1.3;
                        ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(0, -1.5); ctx.lineTo(8, 0.5); ctx.stroke();
                    }
                    ctx.restore();
                }
            }
            // MUI DA NHON (pha kiem da): trong len tu mat dat tu tam ra ngoai, dung 1 luc roi chim xuong
            for (const M of dkMuiDa){
                let t = M.t - M.delay; if (t < 0) continue;
                let up = Math.min(1, t / 5), out = M.T - M.delay, fade = t > out - 12 ? Math.max(0, (out - t) / 12) : 1;
                let H = M.h * (1 - Math.pow(1 - up, 3)), W = M.w;
                if (H < 2) continue;
                ctx.save(); ctx.translate(M.x, M.y); ctx.globalAlpha = fade;
                ctx.fillStyle = 'rgba(120,112,104,' + (0.5 * fade).toFixed(2) + ')';                      // bui o chan mui da
                ctx.beginPath(); ctx.ellipse(0, 1, W * 0.9, 4, 0, 0, Math.PI * 2); ctx.fill();
                ctx.transform(1, 0, -M.lean, 1, 0, 0);
                let g = ctx.createLinearGradient(-W / 2, 0, W / 2, 0);
                g.addColorStop(0, '#a39d94'); g.addColorStop(0.55, '#7a7570'); g.addColorStop(1, '#4a454c');
                ctx.fillStyle = g; ctx.strokeStyle = '#2a2230'; ctx.lineWidth = 1.4; ctx.lineJoin = 'round';
                ctx.beginPath(); ctx.moveTo(-W / 2, 2); ctx.lineTo(-W * 0.34, -H * 0.5); ctx.lineTo(-W * 0.12, -H * 0.58); ctx.lineTo(0, -H);
                ctx.lineTo(W * 0.16, -H * 0.55); ctx.lineTo(W * 0.36, -H * 0.42); ctx.lineTo(W / 2, 2); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.save(); ctx.shadowBlur = 7; ctx.shadowColor = '#B388FF'; ctx.strokeStyle = 'rgba(179,136,255,' + (0.9 * fade).toFixed(2) + ')'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(-1, -2); ctx.lineTo(3, -H * 0.3); ctx.lineTo(-2, -H * 0.55); ctx.lineTo(1, -H * 0.8); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(3, -H * 0.3); ctx.lineTo(W * 0.25, -H * 0.4); ctx.stroke();
                ctx.restore();
                ctx.restore();
            }
            // vong bao cho dap (TRONG LUC TRAM): di theo nguoi choi khi bam A / D
            for (let ng of dkNguoi()){
                let dk = ng.dk, A = dk && dk.A;
                if (!A || A.kieu !== 'nhayDap' || !dkBat(ng) || (A.ph || 0) < 1 || A.ph > 3) continue;
                let cx = ng.x + ng.w / 2, gy = dkMatDuoi(cx, ng.y + ng.h), R = DK_TRUNG_R + (A.rEx || 0) * 0.5, a = A.ph === 1 ? 0.35 : 0.7;
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.strokeStyle = "rgba(179,136,255," + a.toFixed(2) + ")"; ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.ellipse(cx, gy, R, R * 0.14, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.strokeStyle = "rgba(224,204,255," + (a * 0.8).toFixed(2) + ")"; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.ellipse(cx, gy, R * 0.45, R * 0.07, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.fillStyle = "rgba(224,204,255," + a.toFixed(2) + ")";
                for (let k = 0; k < 8; k++){ let an = f * 0.05 + k * Math.PI / 4; ctx.fillRect(cx + Math.cos(an) * R * 0.78 - 2, gy + Math.sin(an) * R * 0.11 - 2, 4, 4); }
                if (A.ph === 3){
                    ctx.strokeStyle = "rgba(224,204,255,0.5)"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(cx - 8, ng.y - 40); ctx.lineTo(cx - 8, ng.y); ctx.moveTo(cx + 8, ng.y - 50); ctx.lineTo(cx + 8, ng.y - 6); ctx.stroke();
                }
                ctx.restore();
            }
            // vung trung trong luc: long chao toi, cac vong co dan vao tam
            for (const Z of dkTrong){
                let u = Z.t / Z.T, a = 1 - u * u;
                ctx.save();
                let g = ctx.createRadialGradient(Z.x, Z.y, 4, Z.x, Z.y, Z.R);
                g.addColorStop(0, "rgba(10,4,24," + (0.85 * a).toFixed(2) + ")"); g.addColorStop(0.6, "rgba(45,20,90," + (0.45 * a).toFixed(2) + ")"); g.addColorStop(1, "rgba(80,40,140,0)");
                ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(Z.x, Z.y, Z.R, Z.R * 0.16, 0, 0, Math.PI * 2); ctx.fill();
                ctx.globalCompositeOperation = 'lighter';
                for (let k = 0; k < 4; k++){
                    let v = (u * 2.2 + k / 4) % 1, r = Z.R * (1 - v);
                    ctx.strokeStyle = "rgba(179,136,255," + (0.7 * (1 - v) * a).toFixed(2) + ")"; ctx.lineWidth = 2 + 2 * v;
                    ctx.beginPath(); ctx.ellipse(Z.x, Z.y, r, r * 0.16, 0, 0, Math.PI * 2); ctx.stroke();
                }
                let rr = Z.R * 0.5;
                ctx.strokeStyle = "rgba(224,204,255," + (0.8 * a).toFixed(2) + ")"; ctx.lineWidth = 1.6;
                ctx.beginPath(); ctx.ellipse(Z.x, Z.y, rr, rr * 0.16, 0, 0, Math.PI * 2); ctx.stroke();
                for (let k = 0; k < 6; k++){
                    let an = u * 6 + k * Math.PI / 3;
                    ctx.beginPath(); ctx.moveTo(Z.x + Math.cos(an) * rr, Z.y + Math.sin(an) * rr * 0.16);
                    ctx.lineTo(Z.x + Math.cos(an + 0.5) * rr * 0.6, Z.y + Math.sin(an + 0.5) * rr * 0.16 * 0.6); ctx.stroke();
                }
                ctx.restore();
            }
            // da bay vao kiem (K 2s)
            for (const H of dkHap){
                let u = H.t / H.T;
                for (const r of H.rocks){
                    let v = Math.max(0, Math.min(1, (u - r.d) / (1 - r.d))), e = v * v * (3 - 2 * v);
                    let x = r.x + (H.x - r.x) * e, y = r.y + (H.ty - r.y) * e - Math.sin(Math.PI * e) * 34, s = r.s * (1 - 0.55 * e);
                    ctx.save(); ctx.translate(x, y); ctx.rotate(r.a + u * 8);
                    ctx.fillStyle = "#8d867f"; ctx.strokeStyle = "#B388FF"; ctx.lineWidth = 1.2;
                    ctx.fillRect(-s, -s * 0.8, s * 2, s * 1.6); ctx.strokeRect(-s, -s * 0.8, s * 2, s * 1.6);
                    ctx.restore();
                }
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = "rgba(179,136,255," + (0.5 * Math.sin(Math.PI * Math.min(1, u))).toFixed(2) + ")";
                ctx.beginPath(); ctx.arc(H.x, H.ty, 10 + 26 * u, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            }
            ctx.save(); ctx.globalCompositeOperation = 'source-over';
            for (const V of dkVo){
                let u = V.t / V.T, a = Math.max(0, 1 - u), R = V.R * (0.28 + 0.85 * u);
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = "rgba(255,236,214," + (0.55 * a * a).toFixed(2) + ")";
                ctx.beginPath(); ctx.arc(V.x, V.y, 22 + 48 * (1 - u), 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = "rgba(179,136,255," + (0.95 * a).toFixed(2) + ")"; ctx.lineWidth = 3 + 8 * a;
                ctx.beginPath(); ctx.arc(V.x, V.y, R, 0, Math.PI * 2); ctx.stroke();
                ctx.strokeStyle = "rgba(255,255,255," + (0.75 * a).toFixed(2) + ")"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(V.x, V.y, R * 0.62, 0, Math.PI * 2); ctx.stroke();
                ctx.restore();
            }
            dkVeDaManh();
            ctx.restore();
        }
// PLAYER_PART_END s4.dkVeThem.1
