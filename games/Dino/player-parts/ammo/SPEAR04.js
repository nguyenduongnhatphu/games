// PLAYER_FILE: SPEAR04
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, GIAO_CHEO, GIAO_CS, GIAO_HAT, GIAO_HAT_CAO, GIAO_KF, GIAO_KHONG, GIAO_LUOT, GIAO_LUOT2, GIAO_NHANH, GIAO_QUAT, GIAO_QUET_R0, GIAO_TAM, GIAO_VET, GIAO_XOAY, KL, SFX, TRD_CM, TRD_HT_SC, TRD_NAC_DMG, TRD_NAC_MAX, TRD_ULT_NEM, VK, allTargets, bosses, camX, canvas, checkAABB, ctx, dangLuotHoacChop, dashVx, dealDamage, dino, enemies, floatingTexts, frames, gdCatHop, giaoCong, giaoSong, hasRune, keys, setCanBat, setCanDmg, setCanTam, setCanTia, shakeTimer, slamCong, slamLaoBat, trd, trdBat, trdHaiThanX, trdJ, trdTickDay, visualEffects, wkgBat, wkgJ, worldL, worldR
// index.html:57784 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdVeNenUlt.1 EDITABLE
function trdVeNenUlt(){
            if (!trd || !trd.ult || typeof dino === 'undefined' || !dino) return;
            let U = trd.ult, a = Math.min(1, U.t / 20) * (U.xongT ? Math.max(0, 1 - (U.t - U.xongT) / 40) : 1);
            if (a <= 0) return;
            let X0 = (typeof camX !== 'undefined' ? camX : 0) - 60, W = canvas.width + 120;
            ctx.save();
            ctx.fillStyle = "rgba(2,8,22," + (0.8 * a).toFixed(2) + ")"; ctx.fillRect(X0, -500, W, 1400);
            // SET: moi 34 khung mot tia
            let pha = U.t % 34;
            if (pha < 8){
                let sx = X0 + ((Math.floor(U.t / 34) * 377) % W);
                ctx.fillStyle = "rgba(200,230,255," + (0.18 * a * (1 - pha / 8)).toFixed(2) + ")"; ctx.fillRect(X0, -500, W, 1400);
                ctx.strokeStyle = "rgba(220,240,255," + (0.95 * a).toFixed(2) + ")"; ctx.lineWidth = 3;
                ctx.beginPath(); let y = -160, x = sx; ctx.moveTo(x, y);
                for (let k = 0; k < 9; k++){ y += 50; x += ((k * 53 + Math.floor(U.t / 34) * 17) % 60) - 30; ctx.lineTo(x, y); }
                ctx.stroke();
                ctx.strokeStyle = "rgba(129,212,250," + (0.5 * a).toFixed(2) + ")"; ctx.lineWidth = 8; ctx.stroke();
            }
            // SONG BIEN CUON TRAO o chan troi
            for (let lop = 0; lop < 3; lop++){
                let yb = 150 + lop * 45, bien = 26 - lop * 5, toc = 0.05 + lop * 0.03;
                ctx.fillStyle = ["rgba(10,40,70,", "rgba(12,60,95,", "rgba(16,85,120,"][lop] + (0.95 * a).toFixed(2) + ")";
                ctx.beginPath(); ctx.moveTo(X0, 330);
                for (let x = 0; x <= W; x += 16){
                    let y = yb + Math.sin(x * 0.012 + frames * toc + lop) * bien + Math.sin(x * 0.031 - frames * toc * 1.7) * bien * 0.4;
                    ctx.lineTo(X0 + x, y);
                }
                ctx.lineTo(X0 + W, 330); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "rgba(225,245,254," + (0.55 * a).toFixed(2) + ")"; ctx.lineWidth = 2;
                ctx.beginPath();
                for (let x = 0; x <= W; x += 16){
                    let y = yb + Math.sin(x * 0.012 + frames * toc + lop) * bien + Math.sin(x * 0.031 - frames * toc * 1.7) * bien * 0.4;
                    if (x === 0) ctx.moveTo(X0 + x, y); else ctx.lineTo(X0 + x, y);
                }
                ctx.stroke();
            }
            // MAT DAT = MAT NUOC
            let g = ctx.createLinearGradient(0, 318, 0, 520); g.addColorStop(0, "rgba(38,166,154," + (0.95 * a).toFixed(2) + ")"); g.addColorStop(1, "rgba(1,40,70," + (0.95 * a).toFixed(2) + ")");
            ctx.fillStyle = g; ctx.fillRect(X0, 318, W, 260);
            ctx.strokeStyle = "rgba(224,247,250," + (0.6 * a).toFixed(2) + ")"; ctx.lineWidth = 1.5;
            for (let r = 0; r < 5; r++){
                ctx.beginPath();
                for (let x = 0; x <= W; x += 20){ let y = 322 + r * 14 + Math.sin(x * 0.05 + frames * 0.12 + r) * 2; if (x === 0) ctx.moveTo(X0 + x, y); else ctx.lineTo(X0 + x, y); }
                ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.trdVeNenUlt.1

// index.html:57832 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickSau.1 EDITABLE
function trdTickSau(){
            if (typeof dino === 'undefined' || !dino || !trd) return;
            trdTickDay();
            if (!trdBat()) return;
            if (trd.ch){
                // @@HE-TRIDENT3: song HA DAN, cang cao ha cang nhanh; nhay de song dang len lai (toi da 5cm)
                let C = trd.ch, tran = 5 * TRD_CM;
                C.cao = Math.max(22, C.cao - (0.12 + 1.3 * Math.pow(C.cao / tran, 2)));
                let ng = dino, muc = 320 - C.cao - ng.h;
                ng.y += (muc - ng.y) * 0.25; ng.dy = 0; ng.grounded = false;
            }
        }
// PLAYER_PART_END s4.trdTickSau.1

// index.html:57846 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdVeDinhBa.1 EDITABLE
function trdVeDinhBa(x, y, goc, dai, mau, al){
            ctx.save(); ctx.globalAlpha = al === undefined ? 1 : al; ctx.translate(x, y); ctx.rotate(goc);
            ctx.strokeStyle = mau || "#C9A227"; ctx.lineWidth = 4; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(-dai * 0.4, 0); ctx.lineTo(dai * 0.72, 0); ctx.stroke();
            ctx.fillStyle = mau || "#FFD54F";
            ctx.beginPath(); ctx.moveTo(dai * 0.7, -11); ctx.quadraticCurveTo(dai * 0.66, 0, dai * 0.7, 11); ctx.lineTo(dai * 0.77, 11); ctx.lineTo(dai * 0.77, -11); ctx.closePath(); ctx.fill();
            for (const yy of [-11, 0, 11]){
                ctx.beginPath(); ctx.moveTo(dai * 0.76, yy - 3); ctx.lineTo(dai + (yy ? 0 : 10), yy); ctx.lineTo(dai * 0.76, yy + 3); ctx.closePath(); ctx.fill();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.trdVeDinhBa.1

// index.html:57858 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdVeGiao.1 EDITABLE
function trdVeGiao(x, y, goc, dai, al){
            ctx.save(); ctx.globalAlpha = al === undefined ? 1 : al; ctx.translate(x, y); ctx.rotate(goc);
            ctx.fillStyle = "#A87F12"; ctx.fillRect(-dai, -2.5, dai * 0.8, 5);
            ctx.fillStyle = "#FFD54F"; ctx.fillRect(-dai, -1, dai * 0.8, 1.5);
            ctx.fillStyle = "#26C6DA"; ctx.fillRect(-dai * 0.24, -3.5, 5, 7);
            let g = ctx.createLinearGradient(-dai * 0.2, -7, 0, 7); g.addColorStop(0, "#FFFFFF"); g.addColorStop(0.55, "#E0F7FA"); g.addColorStop(1, "#80DEEA");
            ctx.fillStyle = g; ctx.strokeStyle = "#26C6DA"; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-dai * 0.14, -7); ctx.lineTo(-dai * 0.22, -3); ctx.lineTo(-dai * 0.22, 3); ctx.lineTo(-dai * 0.14, 7); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.trdVeGiao.1

// index.html:57871 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdVeVung.1 EDITABLE
function trdVeVung(ng){
            if (!trd || !trd.vung || !trdBat()) return false;
            let V = trd.vung, u = Math.min(1, V.t / V.T), e = 1 - Math.pow(1 - u, 2);
            let phi = Math.PI * 0.95 - e * (Math.PI * 1.25);                   // sau lung -> truoc mat -> vuot qua mot chut
            if (V.k === 2) phi = -phi;                                          // nhat 2 vung NGUOC chieu
            let d = V.d, sc = ng.getFormScale(), px = ng.x + ng.w / 2 + d * 6, py = ng.y + ng.h * 0.52, R = 118 * sc;
            ng._giaoAnim = null;
            ctx.save();
            // vet elip
            ctx.strokeStyle = "rgba(236,239,241,0.55)"; ctx.lineWidth = 6; ctx.lineCap = 'round';
            ctx.beginPath();
            let a0 = V.k === 2 ? -Math.PI * 0.95 : Math.PI * 0.95;
            for (let q = 0; q <= 16; q++){
                let f = a0 + (phi - a0) * q / 16;
                let x = px + d * Math.cos(f) * R, y = py + Math.sin(f) * 14;
                if (q === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
            ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 2; ctx.stroke();
            ctx.restore();
            let c = Math.cos(phi), s2 = Math.sin(phi);
            let dai = R * Math.max(0.22, Math.abs(c)), huong = (c >= 0 ? d : -d);
            let goc = huong > 0 ? s2 * 0.12 : Math.PI - s2 * 0.12;
            trdVeDinhBa(px - Math.cos(goc) * dai * 0.2, py + s2 * 10, goc, dai * 0.95, "#FFD54F", 1);
            return true;
        }
// PLAYER_PART_END s4.trdVeVung.1

// index.html:57897 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdVe.1 EDITABLE
function trdVe(){
            if (!trd || typeof dino === 'undefined' || !dino || !trdBat()) return;
            let ng = dino;
            ctx.save();
            // COT NUOC
            for (const C of trd.cot){
                if (C.t < 0) continue;
                if (C.t <= C.bao){
                    ctx.strokeStyle = "rgba(128,222,234,0.8)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(C.x, 318, 26, 6, 0, 0, 6.28); ctx.stroke();
                } else {
                    let k = Math.min(1, (C.t - C.bao) / 5), h = 200 * k * (C.t > C.bao + 18 ? Math.max(0, 1 - (C.t - C.bao - 18) / 6) : 1);
                    let g = ctx.createLinearGradient(C.x - 26, 0, C.x + 26, 0); g.addColorStop(0, "rgba(79,195,247,0.25)"); g.addColorStop(0.5, "rgba(225,245,254,0.92)"); g.addColorStop(1, "rgba(79,195,247,0.25)");
                    ctx.fillStyle = g; ctx.fillRect(C.x - 26, 320 - h, 52, h);
                    ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.beginPath(); ctx.ellipse(C.x, 320 - h, 30, 10, 0, 0, 6.28); ctx.fill();
                }
            }
            // SONG
            for (const S of trd.song){
                let d = S.d, x = S.x, h = S.h;
                let g = ctx.createLinearGradient(0, 320 - h, 0, 320); g.addColorStop(0, "rgba(129,212,250,0.95)"); g.addColorStop(1, "rgba(2,119,189,0.95)");
                ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - d * 50, 320); ctx.quadraticCurveTo(x - d * 30, 320 - h * 0.6, x, 320 - h);
                ctx.quadraticCurveTo(x + d * 26, 320 - h - 4, x + d * 24, 320 - h + 18); ctx.quadraticCurveTo(x + d * 8, 320 - h + 8, x + d * 18, 320 - h * 0.35);
                ctx.lineTo(x + d * 26, 320); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "rgba(255,255,255,0.9)"; for (let k = 0; k < 4; k++){ ctx.beginPath(); ctx.arc(x + d * (k * 7 - 4), 320 - h, 4, 0, 6.28); ctx.fill(); }
            }
            // NGUC NUOC
            for (const N of trd.nguc){
                let o = N.o; if (!o) continue;
                let cx = o.x + (o.w || 20) / 2, w = (o.w || 20) + 30, top = o.y - 30;
                if (N.t < 0){ ctx.strokeStyle = "rgba(128,222,234,0.8)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cx, 318, w / 2, 7, 0, 0, 6.28); ctx.stroke(); continue; }
                let a = N.t > 80 ? Math.max(0, 1 - (N.t - 80) / 10) : 1;
                ctx.globalAlpha = 0.5 * a; ctx.fillStyle = "#4FC3F7"; ctx.fillRect(cx - w / 2, top, w, 320 - top);
                ctx.globalAlpha = 0.85 * a; ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = 2;
                for (let k = 0; k < 4; k++){ let yy = top + ((N.t * 3 + k * 40) % (320 - top)); ctx.beginPath(); ctx.moveTo(cx - w / 2 + 4, yy); ctx.quadraticCurveTo(cx, yy - 8, cx + w / 2 - 4, yy); ctx.stroke(); }
                ctx.globalAlpha = 1;
            }
            // HIEU UNG: giao khi dinh ba, gai lien hoan, vet xuyen, dinh ba bay len
            for (const F of trd.fx){
                let a = Math.max(0, 1 - F.t / F.T);
                if (F.loai === 'khi'){
                    let L = F.L * Math.min(1, F.t / 4 + 0.3);
                    ctx.save(); ctx.globalAlpha = 0.75 * a; ctx.translate(F.x, F.y); ctx.scale(F.d, 1);
                    ctx.fillStyle = "rgba(128,222,234,0.5)"; ctx.beginPath(); ctx.moveTo(0, -7); ctx.lineTo(L * 0.78, -5); ctx.lineTo(L * 0.78, 5); ctx.lineTo(0, 7); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "rgba(224,247,250,0.9)";
                    for (const yy of [-16, 0, 16]){ ctx.beginPath(); ctx.moveTo(L * 0.74, yy * 0.6 - 4); ctx.lineTo(L + (yy ? -8 : 10), yy); ctx.lineTo(L * 0.74, yy * 0.6 + 4); ctx.closePath(); ctx.fill(); }
                    ctx.fillRect(L * 0.72, -16, 8, 32);
                    ctx.restore();
                } else if (F.loai === 'gai'){
                    ctx.globalAlpha = a; ctx.strokeStyle = "rgba(129,212,250,0.85)"; ctx.lineWidth = 7; ctx.lineCap = 'round';
                    ctx.beginPath(); ctx.moveTo(F.x0, F.y0); ctx.lineTo(F.x1, F.y1); ctx.stroke();
                    ctx.strokeStyle = "rgba(255,255,255,0.95)"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(F.x0, F.y0); ctx.lineTo(F.x1, F.y1); ctx.stroke();
                    trdVeDinhBa(F.x1 - (F.x1 - F.x0) * 0.1, F.y1 - (F.y1 - F.y0) * 0.1, Math.atan2(F.y1 - F.y0, F.x1 - F.x0), 34, "#E0F7FA", a);
                    ctx.globalAlpha = 1;
                } else if (F.loai === 'vet'){
                    ctx.globalAlpha = 0.45 * a; ctx.fillStyle = "#80DEEA"; ctx.beginPath(); ctx.ellipse(F.x, F.y, 30 * a + 6, 8, 0, 0, 6.28); ctx.fill(); ctx.globalAlpha = 1;
                } else if (F.loai === 'nem'){
                    trdVeDinhBa(F.x, F.y - F.t * 14, -Math.PI / 2, 60, "#FFD54F", 1);
                } else if (F.loai === 'tach'){
                    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a;
                    ctx.fillStyle = "rgba(255,245,200,0.8)"; ctx.beginPath(); ctx.arc(F.x, F.y, 20 + F.t * 4, 0, 6.28); ctx.fill(); ctx.restore(); ctx.globalAlpha = 1;
                }
            }
            // DINH BA LO LUNG TREN DAU
            if (trd.noi){
                let N = trd.noi, k = Math.min(1, N.t / 26);
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = "rgba(128,222,234," + (0.25 + 0.35 * k).toFixed(2) + ")"; ctx.beginPath(); ctx.arc(N.x, N.y, 26 + 14 * k, 0, 6.28); ctx.fill();
                ctx.restore();
                trdVeDinhBa(N.x - 34, N.y + Math.sin(frames * 0.3) * 2, 0, 70, "#FFD54F", 1);
            }
            // 3 GIAO: lo lung chia mui vao muc tieu roi NEM CHEO XUONG
            for (const G of trd.giao){
                let a = G.cam ? Math.max(0, 1 - (G.t - (G.camT || 0)) / 30) : 1;
                if (G.t < 0){ ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = "rgba(255,213,79,0.35)"; ctx.beginPath(); ctx.arc(G.x, G.y, 12, 0, 6.28); ctx.fill(); ctx.restore(); }
                else if (!G.cam){ ctx.strokeStyle = "rgba(224,247,250,0.55)"; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(G.x, G.y); ctx.lineTo(G.x - G.vx * 2.5, G.y - G.vy * 2.5); ctx.stroke(); }
                trdVeGiao(G.x, G.y, G.goc, 78, a);
            }
            // CAU NUOC
            for (const C of trd.cau){
                if (C.t < 0) continue;
                ctx.fillStyle = "rgba(79,195,247,0.8)"; ctx.beginPath(); ctx.arc(C.x, C.y, 20, 0, 6.28); ctx.fill();
                ctx.fillStyle = "rgba(225,245,254,0.9)"; ctx.beginPath(); ctx.arc(C.x - 6, C.y - 6, 7, 0, 6.28); ctx.fill();
                ctx.strokeStyle = "rgba(129,212,250,0.6)"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(C.x - C.d * 20, C.y); ctx.lineTo(C.x - C.d * 60, C.y); ctx.stroke();
            }
            // CUOI SONG — CON SONG THAN cuon tron: than song dung sau lung, dinh song cuon ve truoc, nguoi choi luot tren dinh
            if (trd.ch){
                let d = ng.isFacingLeft ? -1 : 1, cx = ng.x + ng.w / 2, day = ng.y + ng.h, t = frames * 0.18;
                let X = (k) => cx + d * k;                        // toa do theo huong luot
                let kc = Math.max(0.35, Math.min(1.3, (320 - day) / 174));
                let _day = day; day = 0;                          // Y(off) = day that + off * kc
                const Yo = (off) => _day + off * kc;
                ctx.save();
                ctx.beginPath(); ctx.rect(-5000, -5000, 12000, 5000 + 322); ctx.clip();   // khong ve lan xuong duoi dat
                let g = ctx.createLinearGradient(0, Yo(-30), 0, 322); g.addColorStop(0, "#4FC3F7"); g.addColorStop(0.55, "#0288D1"); g.addColorStop(1, "#01579B");
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.moveTo(X(-230), 322);
                ctx.quadraticCurveTo(X(-170), Yo(90), X(-90), Yo(18));                                   // lung song thoai
                ctx.quadraticCurveTo(X(-30), Yo(-8), X(30), Yo(-18));                                      // dinh song ngay duoi chan
                ctx.quadraticCurveTo(X(92), Yo(-22), X(118), Yo(16));                                     // MOI SONG cuon ve truoc
                ctx.quadraticCurveTo(X(126), Yo(44), X(96), Yo(52));                                     // uon xuong
                ctx.quadraticCurveTo(X(70), Yo(50), X(74), Yo(30));                                      // cuon vao trong (ong song)
                ctx.quadraticCurveTo(X(52), Yo(70), X(70), Yo(120));                                     // mat truoc lom
                ctx.quadraticCurveTo(X(90), Yo(150), X(110), 322);
                ctx.closePath(); ctx.fill();
                // long ong song toi hon
                ctx.fillStyle = "rgba(1,50,90,0.7)";
                ctx.beginPath(); ctx.moveTo(X(74), Yo(30)); ctx.quadraticCurveTo(X(60), Yo(64), X(72), Yo(100)); ctx.quadraticCurveTo(X(88), Yo(60), X(96), Yo(50)); ctx.closePath(); ctx.fill();
                // vet sang tren than song
                ctx.strokeStyle = "rgba(225,245,254,0.55)"; ctx.lineWidth = 3;
                for (let k = 0; k < 3; k++){ ctx.beginPath(); ctx.moveTo(X(-150 + k * 40), Yo(70 + k * 8)); ctx.quadraticCurveTo(X(-80 + k * 30), Yo(30 + k * 10), X(-10 + k * 25), Yo(20 + k * 14)); ctx.stroke(); }
                // BOT TRANG tren dinh + mep moi song
                ctx.fillStyle = "rgba(255,255,255,0.95)";
                for (let k = 0; k <= 12; k++){
                    let u = k / 12, xx = -80 + u * 196, yy = u < 0.55 ? Yo(12) - u * 50 : Yo(-16) + (u - 0.55) * 60;
                    ctx.beginPath(); ctx.arc(X(xx), yy + Math.sin(t + k) * 2, 5 + (k % 3), 0, 6.28); ctx.fill();
                }
                for (let k = 0; k < 8; k++){                                                                  // bot bay ra truoc
                    let ph = (frames * 0.7 + k * 13) % 40;
                    ctx.globalAlpha = 1 - ph / 40; ctx.beginPath(); ctx.arc(X(110 + ph * 1.6), Yo(10 - ph * 0.6) + (k % 3) * 6, 3, 0, 6.28); ctx.fill();
                }
                ctx.globalAlpha = 1;
                // chan song xo bot tren mat dat
                ctx.fillStyle = "rgba(255,255,255,0.8)";
                for (let k = 0; k < 7; k++){ ctx.beginPath(); ctx.ellipse(X(-200 + k * 50), 320, 16, 4, 0, 0, 6.28); ctx.fill(); }
                ctx.restore();
            }
            // MUSOU I: tu luc loe sang
            if (trd.I && trd.I.t <= 12){
                let k = trd.I.t / 12, cx = ng.x + ng.w / 2 + trd.I.d * 30, cy = ng.y + ng.h * 0.5;
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = "rgba(255,82,82," + (0.2 + 0.5 * k).toFixed(2) + ")"; ctx.beginPath(); ctx.arc(cx, cy, 10 + 26 * k, 0, 6.28); ctx.fill();
                if (trd.I.t >= 9){ ctx.strokeStyle = "rgba(255,255,255,0.95)"; ctx.lineWidth = 2; for (let q = 0; q < 4; q++){ let a = q * Math.PI / 4; ctx.beginPath(); ctx.moveTo(cx - Math.cos(a) * 40, cy - Math.sin(a) * 40); ctx.lineTo(cx + Math.cos(a) * 40, cy + Math.sin(a) * 40); ctx.stroke(); } }
                ctx.restore();
            }
            // HAO QUANG MUSOU: vien do nhap nhay + quang nhe
            if (trd.cong > 0){
                let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2, p = 0.5 + 0.5 * Math.sin(frames * 0.35);
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = "rgba(255,60,60," + (0.08 + 0.05 * trd.cong).toFixed(2) + ")"; ctx.beginPath(); ctx.ellipse(cx, cy, ng.w * 0.9 + 10 * trd.cong, ng.h * 0.9 + 8 * trd.cong, 0, 0, 6.28); ctx.fill();
                ctx.restore();
                ctx.strokeStyle = "rgba(255,40,40," + (0.35 + 0.5 * p).toFixed(2) + ")"; ctx.lineWidth = 2 + trd.cong;
                ctx.beginPath(); ctx.ellipse(cx, cy, ng.w * 0.62, ng.h * 0.62, 0, 0, 6.28); ctx.stroke();
                for (let k = 0; k < 3 * trd.cong; k++){ let a = frames * 0.05 + k * 2.1; ctx.fillStyle = "rgba(255,120,90,0.6)"; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * ng.w * 0.8, cy + Math.sin(a * 1.3) * ng.h * 0.7 - (frames % 30), 2, 0, 6.28); ctx.fill(); }
            }
            // THANH MUSOU tren dau: 3 nac + tien do
            {
                let x0 = ng.x + ng.w / 2 - 27, y0 = ng.y - 16;
                ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.fillRect(x0 - 2, y0 - 2, 58, 10);
                for (let k = 0; k < TRD_NAC_MAX; k++){
                    ctx.fillStyle = k < trd.nac ? "#FF5252" : "rgba(255,255,255,0.18)";
                    ctx.beginPath(); ctx.moveTo(x0 + k * 19 + 8, y0 - 1); ctx.lineTo(x0 + k * 19 + 14, y0 + 3); ctx.lineTo(x0 + k * 19 + 8, y0 + 7); ctx.lineTo(x0 + k * 19 + 2, y0 + 3); ctx.closePath(); ctx.fill();
                }
                ctx.fillStyle = "#FFAB91"; ctx.fillRect(x0, y0 + 9, 54 * Math.min(1, trd.dem / TRD_NAC_DMG), 2);
                if (trd.cong > 0){ ctx.fillStyle = "#FF5252"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("MUSOU +" + trd.cong, x0 + 27, y0 - 5); ctx.textAlign = "left"; }
            }
            // CHIEU CUOI: POSEIDON (linh hon ngon giao) + ngon giao nuoc
            if (trd.ult) trdVeUlt(ng);
            ctx.restore();
        }
// PLAYER_PART_END s4.trdVe.1

// index.html:58057 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdVeUlt.1 EDITABLE
function trdVeUlt(ng){
            let U = trd.ult, a = Math.min(1, U.t / 24) * (U.xongT ? Math.max(0, 1 - (U.t - U.xongT) / 40) : 1);
            let d = U.d, bx = trdHaiThanX(U, ng), by = 320;
            // --- HAI THAN khong lo (TRD_HT_SC lan) ---
            ctx.save(); ctx.globalAlpha = 0.82 * a; ctx.translate(bx, by); ctx.scale(d * TRD_HT_SC, TRD_HT_SC);
            let g = ctx.createLinearGradient(0, -230, 0, 0); g.addColorStop(0, "rgba(178,235,242,0.95)"); g.addColorStop(1, "rgba(0,131,143,0.15)");
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.moveTo(-30, 0); ctx.quadraticCurveTo(-48, -80, -36, -150); ctx.lineTo(36, -150); ctx.quadraticCurveTo(48, -80, 30, 0); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "rgba(224,247,250,0.35)"; ctx.beginPath(); ctx.moveTo(-34, -150); ctx.lineTo(34, -150); ctx.lineTo(10, -60); ctx.closePath(); ctx.fill();   // ngua
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, -172, 22, 0, 6.28); ctx.fill();
            ctx.fillStyle = "rgba(224,247,250,0.9)";
            ctx.beginPath(); ctx.moveTo(-20, -168); ctx.quadraticCurveTo(-30 + Math.sin(frames * 0.1) * 4, -130, -8, -120); ctx.quadraticCurveTo(0, -138, 8, -120); ctx.quadraticCurveTo(30 + Math.sin(frames * 0.1) * 4, -130, 20, -168); ctx.fill();
            ctx.beginPath(); ctx.moveTo(-20, -176); ctx.quadraticCurveTo(-34 - Math.sin(frames * 0.08) * 6, -160, -40, -136); ctx.lineTo(-22, -160); ctx.fill();   // toc song bay
            ctx.fillStyle = "rgba(255,213,79,0.98)";
            ctx.beginPath(); ctx.moveTo(-18, -190); ctx.lineTo(-14, -206); ctx.lineTo(-7, -194); ctx.lineTo(0, -212); ctx.lineTo(7, -194); ctx.lineTo(14, -206); ctx.lineTo(18, -190); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "rgba(0,229,255,1)"; ctx.fillRect(-9, -176, 5, 3); ctx.fillRect(4, -176, 5, 3);
            let u = U.t < TRD_ULT_NEM ? Math.min(1, U.t / 44) : 1, goc = U.t < TRD_ULT_NEM ? -0.4 - 1.6 * u : 0.3;
            ctx.strokeStyle = "rgba(178,235,242,0.95)"; ctx.lineWidth = 12; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(24, -140); ctx.lineTo(24 + Math.cos(goc - 1.2) * 60, -140 + Math.sin(goc - 1.2) * 60); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(-24, -140); ctx.lineTo(-54, -104); ctx.stroke();
            if (U.t < TRD_ULT_NEM) trdVeDinhBa(24 + Math.cos(goc - 1.2) * 60 - 40, -140 + Math.sin(goc - 1.2) * 60, 0.25, 130, "#FFD54F", 1);   // DINH BA to theo hai than
            ctx.restore();
            // --- NGON DINH BA NUOC bay (to hon mot chut so voi luc cam) ---
            let P = U.p;
            if (P && !(U.xongT && U.t > U.xongT + 36)){
                // @@HE-TRIDENT4: goc VE = goc NEM (P.goc), khong tinh lai tu van toc (luc cay van toc nam ngang)
                let goc2 = P.goc !== undefined ? P.goc : Math.atan2(P.vy, P.vx), dai = 130 * TRD_HT_SC * 1.15;
                let camDat = P.pha !== 'bay', mo = U.xongT ? Math.max(0, 1 - (U.t - U.xongT) / 36) : 1;
                ctx.save();
                if (camDat){ ctx.beginPath(); ctx.rect(P.x - dai * 1.6, -2000, dai * 3.2, 2000 + 321); ctx.clip(); }   // phan mui duoi mat dat bi dat che
                // vet nuoc chay DOC THAN (luc bay manh, luc cam thi mo dan)
                ctx.globalAlpha = (camDat ? 0.3 : 0.5) * mo; ctx.fillStyle = "#4FC3F7";
                ctx.save(); ctx.translate(P.x, P.y); ctx.rotate(goc2);
                ctx.beginPath(); ctx.ellipse(-dai * 0.55, 0, dai * 0.7, camDat ? 18 : 30, 0, 0, 6.28); ctx.fill();
                ctx.globalAlpha = 0.85 * mo; ctx.fillStyle = "#E1F5FE";
                for (let k = 0; k < 10; k++){ ctx.beginPath(); ctx.arc(-40 - k * 28, Math.sin(frames * 0.5 + k) * (camDat ? 8 : 16), Math.max(1, 7 - k * 0.5), 0, 6.28); ctx.fill(); }
                ctx.restore();
                ctx.globalAlpha = 1;
                trdVeDinhBa(P.x - Math.cos(goc2) * dai, P.y - Math.sin(goc2) * dai, goc2, dai, "#FFD54F", mo);
                ctx.restore();
                if (camDat){
                    // mieng ho noi mui cam xuong: vong gon nuoc + dat nut
                    ctx.save(); ctx.globalAlpha = 0.8 * mo;
                    ctx.fillStyle = "#3E2723"; ctx.beginPath(); ctx.ellipse(P.x, 321, 26, 5, 0, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "#B2EBF2"; ctx.lineWidth = 2;
                    let r = 20 + ((frames * 2) % 30);
                    ctx.globalAlpha = 0.6 * mo * (1 - ((frames * 2) % 30) / 30);
                    ctx.beginPath(); ctx.ellipse(P.x, 321, r * 1.4, r * 0.25, 0, 0, 6.28); ctx.stroke();
                    ctx.restore();
                }
            }
            if (P && P.bui && P.bui.length){
                ctx.save();
                for (const b of P.bui){
                    ctx.globalAlpha = Math.max(0, 1 - b.t / b.T);
                    ctx.fillStyle = (b.r > 3.4) ? "#6D4C41" : "#E1F5FE";
                    ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.28); ctx.fill();
                }
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.trdVeUlt.1

// index.html:58121 · Phạm vi: Player.prototype
const __Part7 = {
// PLAYER_PART_BEGIN s4.Player.prototype._giaoVeDat.1 EDITABLE
_giaoVeDat(kieu, reach, life){
                if (!GIAO_KF[kieu]) kieu = 'choc';
                this._giaoAnim = { kf: GIAO_KF[kieu], t: 0, T: Math.max(14, Math.round(life * 1.7)),
                                   kieu, dir: this.isFacingLeft ? -1 : 1, vet: !!GIAO_VET[kieu] };
                if (!this.giaoVK) this.giaoVK = { ang: 0.95, ext: -20, veti: [] };
                this.giaoVK.veti.length = 0;
            }
// PLAYER_PART_END s4.Player.prototype._giaoVeDat.1
};

// index.html:58128 · Phạm vi: Player.prototype
const __Part8 = {
// PLAYER_PART_BEGIN s4.Player.prototype._giaoDanh.1 EDITABLE
_giaoDanh(dmg, life, reach, hTop, hBot, cd, kieu, spinR, ton){
                // @@HE-SLAMCAN: don DANH XUONG cua Giao la ho 'bo' (chuoi K bo xuong dat).
                if (kieu === 'bo' && typeof slamCong === 'function') dmg += slamCong();
                this.ammo = Math.max(0, this.ammo - (ton === undefined ? 1 : ton));
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 75; }
                let sc = this.getFormScale(), dir = this.isFacingLeft ? -1 : 1;
                this._beginSlash(dmg + giaoCong(), life, dir,
                                 spinR ? 0 : Math.round(reach * sc), hTop, hBot,
                                 spinR ? Math.round(spinR * sc) : 0);
                if (this.slashAtk && /choc|cheo|luot|xuyen|dam/.test(kieu || '')) this.slashAtk.dam = 1;   // @@HE-HITFX: don DAM
                this.attackCooldown = cd;          // KHUNG HOI DON — thu ham duy nhat cua Giao
                this._giaoCS = GIAO_CS;
                // AWAKENED NOVA tren Giao: cac don DAM ban them mot MUI KHI ngan phia truoc.
                // No cho them mot doan tam voi, gay 1 sat thuong, va TAN sau ~150px chu khong
                // bay mai — Giao van khong duoc phep co don tam xa that su.
                if ((kieu === 'choc' || kieu === 'choc2' || kieu === 'cheo' || kieu === 'luot')
                    && typeof hasRune === 'function' && hasRune('explshot')){
                    let _d = this.isFacingLeft ? -1 : 1;
                    let _m = (typeof this.giaoMui === 'function') ? this.giaoMui() : null;
                    giaoSong.push({ chu: this, x: _m ? _m.x : (this.x + this.w/2 + _d * 40),
                                    y: _m ? _m.y : (this.y + this.h * 0.5),
                                    dir: _d, r: 150, t: 26, t0: 26, dmg: 1,
                                    nho: 0, xuyen: 0, mui: 1, hit: new Set() });
                }
                this._giaoVeDat(kieu, Math.round((spinR || reach) * sc), life);
                if (typeof SFX !== 'undefined' && SFX.tone)
                    SFX.tone(kieu === 'xoay' ? 380 : (kieu === 'bo' ? 300 : 640),
                             kieu === 'choc' ? 0.06 : 0.13, 'square', 0.12, kieu === 'choc' ? 1400 : 900);
            }
// PLAYER_PART_END s4.Player.prototype._giaoDanh.1
};

// index.html:58159 · Phạm vi: Player.prototype
const __Part9 = {
// PLAYER_PART_BEGIN s4.Player.prototype.spearSlash.1 EDITABLE
spearSlash(){
                if (this.id === 1 && !this._wkgPhan && typeof wkgBat === 'function' && wkgBat()) return wkgJ(this);   // @@HE-WUKONG
                if (this.id === 1 && !this._wkgPhan && typeof trdBat === 'function' && trdBat() && trdJ(this)) return;   // @@HE-TRIDENT
                if (this.giaoMua || this.giaoLao || this.giaoUlt || this.giaoBoXuong) return;
                if (this.isOverheated || this.ammo <= 0) return;   // het the luc
                if ((this._giaoCS || 0) <= 0) this._giaoChuoi = 0;
                this._giaoChuoi = Math.min(6, (this._giaoChuoi || 0) + 1);
                if ((this._giaoCS || 0) > 0 && (this._giaoLuotNoi || 0) > 0){
                    this._giaoLuotNoi = 0;
                    // @@HE-SETCAN: don BOI (nhat thu hai cua chuoi Dash J J) cung mang dien
                    let _t2 = (typeof setCanTam === 'function' ? setCanTam() : 1);
                    let _R2 = Math.round(GIAO_LUOT2 * _t2);
                    this._giaoDanh(3 + (typeof setCanDmg === 'function' ? setCanDmg() : 0), 16, _R2, 16, 16, 40, 'luot');
                    if (typeof setCanBat === 'function' && setCanBat()){
                        let d2 = this.isFacingLeft ? -1 : 1;
                        let bx2 = this.x + this.w/2, by2 = this.y + this.h * 0.52;
                        setCanTia(bx2, by2, bx2 + d2 * _R2, by2, 5, 14);
                    }
                    this._giaoNhanh = 'ket'; return;
                }
                if ((this._giaoCS || 0) > 0 && (this._giaoQuatNoi || 0) > 0 && this.grounded){
                    // MOT lan bam J = choc mot phat roi choc nhanh hai phat nua.
                    this._giaoQuatNoi = 0;
                    this._giaoDanh(2, 10, GIAO_NHANH, 6, 6, 12, 'choc');   // phai co S+J truoc moi mo duoc
                    this._giaoC3 = 2; this._giaoC3T = 9; this._giaoC3Ton = 0;   // ba nhat = MOT lan bam
                    this._giaoNhanh = 'ket'; return;       // XOAY da chuyen han sang S+J -> K
                }
                if (this.grounded && dangLuotHoacChop()){ this.giaoLuot(); return; }
                if (!this.grounded){ this.giaoKhong(); return; }
                if (keys['KeyS']){ this.giaoQuat(); return; }
                this.giaoCombo();
            }
// PLAYER_PART_END s4.Player.prototype.spearSlash.1
};

// index.html:58191 · Phạm vi: Player.prototype
const __Part10 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoCombo.1 EDITABLE
giaoCombo(){
                if ((this._giaoCS || 0) <= 0) this._giaoBuoc = 0;
                let b = this._giaoBuoc || 0;
                if (b === 0)      this._giaoDanh(2, 12, GIAO_TAM[0],  8,  8, 24, 'choc');
                else if (b === 1) this._giaoDanh(2, 12, GIAO_TAM[1],  6,  6, 24, 'choc2');   // phai co nhat 1 truoc
                else              this._giaoDanh(4, 16, GIAO_TAM[2], 54, 10, 40, 'hat');           // ket chuoi, cam 40 khung
                this._giaoBuoc = (b >= 2) ? 0 : b + 1;
                this._giaoNhanh = 'ket';
                this.clawRiseWindow = 38;   // bam NHAY trong khoang nay -> HAT LEN, mo combo tren khong
            }
// PLAYER_PART_END s4.Player.prototype.giaoCombo.1
};

// index.html:58201 · Phạm vi: Player.prototype
const __Part11 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoKhong.1 EDITABLE
giaoKhong(){
                // LO LUNG: J khong con choc ngang mu nua ma choc thang vao ke dich gan nhat.
                if ((this.hoverTimer || 0) > 0){
                    let N = this.hoverNgam();
                    if (N){ this.giaoChocNgam(N); return; }
                }
                if ((this._giaoCS || 0) > 0 && this._giaoTren){
                    this._giaoTren = 0;
                    this._giaoDanh(3, 14, GIAO_CHEO, 6, 52, 20, 'cheo');
                    if (this.dy < 2.5) this.dy = 2.5;
                } else this._giaoDanh(2, 12, GIAO_KHONG, 6, 6, 22, 'choc');
                this._giaoNhanh = 'ket';
            }
// PLAYER_PART_END s4.Player.prototype.giaoKhong.1
};

// index.html:58214 · Phạm vi: Player.prototype
const __Part12 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoQuat.1 EDITABLE
giaoQuat(){
                this._giaoDanh(3, 14, GIAO_QUAT, 4, 36, 30, 'bo');
                this._giaoQuatNoi = 1; this._giaoNhanh = 'xoay';   // S+J -> K = XOAY, S+J -> J = loat 3 choc
            }
// PLAYER_PART_END s4.Player.prototype.giaoQuat.1
};

// index.html:58218 · Phạm vi: Player.prototype
const __Part13 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoLuot.1 EDITABLE
giaoLuot(){
                // @@HE-SETCAN: cu luot dam mang dien -> dam sau hon va nang tay hon
                let _tm = (typeof setCanTam === 'function' ? setCanTam() : 1);
                let _R  = Math.round(GIAO_LUOT * _tm);
                this._giaoDanh(3 + (typeof setCanDmg === 'function' ? setCanDmg() : 0), 15, _R, 20, 20, 30, 'luot');
                // LUOT + J: cu luot keo dai GAP DOI va BAT TU suot doan lao
                if (typeof dashVx !== 'undefined'){
                    let _d = this.isFacingLeft ? -1 : 1;
                    dashVx = _d * Math.max(Math.abs(dashVx) * 2.4, 30);
                }
                this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 22);
                if (typeof setCanBat === 'function' && setCanBat()){
                    // @@HE-SETFX: chi MOT tia chay doc than giao — cay giao dan dien.
                    // Khong con cu no o mui, khong con vet chay duoi dat.
                    let d = this.isFacingLeft ? -1 : 1;
                    let cx0 = this.x + this.w/2, cy0 = this.y + this.h * 0.52;
                    setCanTia(cx0, cy0, cx0 + d * _R, cy0, 5, 14);
                }
                this._giaoLuotNoi = 1; this._giaoNhanh = 'ket';
            }
// PLAYER_PART_END s4.Player.prototype.giaoLuot.1
};

// index.html:58239 · Phạm vi: Player.prototype
const __Part14 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoHat.1 EDITABLE
giaoHat(){
                this.clawRiseWindow = 0; this._giaoBuoc = 0;
                // GIU hoverArmed: combo tren khong la cach duy nhat Giao voi toi boss bay, tat
                // Lo Lung o day la lay mat dung thu no can nhat.
                this.dy = -13.5; this.grounded = false; this.canDoubleJump = false;
                this._giaoDanh(4, 16, GIAO_HAT, GIAO_HAT_CAO, 0, 24, 'hat');   // phai canh nhip nhay
                this._giaoTren = 1; this._giaoCS = 72;   // cua so dai hon de kip bat combo tren khong
                this._giaoNhanh = 'ket';
            }
// PLAYER_PART_END s4.Player.prototype.giaoHat.1
};

// index.html:58251 · Phạm vi: Player.prototype
const __Part15 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoKet.1 EDITABLE
giaoKet(){
                let k = this._giaoNhanh || 'ket';
                let n = this._giaoChuoi || 1, cap = n >= 3 ? 2 : (n === 2 ? 1 : 0);
                this._giaoNhanh = 0; this._giaoBuoc = 0; this._giaoQuatNoi = 0;
                this._giaoLuotNoi = 0; this._giaoChuoi = 0;
                if (k === 'xoay'){ this._giaoDanh(4, 18, 0, 0, 0, 42, 'xoay', GIAO_XOAY); return; }
                const KD = [3, 4, 6], KR = [140, 165, 215], KL = [16, 18, 24],
                      KC = [36, 44, 56], KS = [12, 18, 34], KK = [0.75, 1.0, 1.65];
                if (!this.grounded){
                    // TREN KHONG: khong no giua troi. Lao THANG XUONG, cham dat moi ra Impact.
                    this.giaoBoXuong = { cap };
                    this.dy = 24; this.attackCooldown = KC[cap];
                    if (typeof slamLaoBat === 'function') slamLaoBat(this);   // @@HE-SLAMLAO
                    this._giaoVeDat('bo', KR[cap], KL[cap]);
                    return;
                }
                this._giaoDanh(KD[cap], KL[cap], KR[cap], 12, 44, KC[cap], 'bo');
                shakeTimer = Math.max(shakeTimer, KS[cap]);
                this.giaoHenDap(KK[cap]);
            }
// PLAYER_PART_END s4.Player.prototype.giaoKet.1
};

// index.html:58272 · Phạm vi: Player.prototype
const __Part16 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoTickBo.1 EDITABLE
giaoTickBo(){
                let B = this.giaoBoXuong; if (!B) return;
                this.dy = Math.max(this.dy, B.dyMax || 24);   // @@HE-LOLUNG3: lo lung nham xa thi roi cham hon (dyMax)
                if (B.dyMax && !this.grounded) this.dy = Math.min(this.dy, B.dyMax);
                if (B.nhamX !== undefined && !this.grounded){
                    let d = B.nhamX - (this.x + this.w/2);
                    this.x += Math.max(-40, Math.min(40, d * 0.45));   // @@HE-LOLUNG3: truoc 13 / 0.22 -> muc tieu 300px bo hut
                    this.x = Math.max(worldL(), Math.min(worldR() - this.w, this.x));
                }
                if (!this.grounded) return;
                const KD = [4, 5, 7], KR = [150, 180, 235], KK = [0.9, 1.2, 1.8], KS = [16, 24, 40];
                this._giaoDanh(KD[B.cap], 20, KR[B.cap], 12, 48, 26, 'bo', 0, 0);
                this.giaoHenDap(KK[B.cap]);
                shakeTimer = Math.max(shakeTimer, KS[B.cap]);
                this.giaoBoXuong = null;
            }
// PLAYER_PART_END s4.Player.prototype.giaoTickBo.1
};

// index.html:58289 · Phạm vi: Player.prototype
const __Part17 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoChoc3.1 EDITABLE
giaoChoc3(){ this._giaoC3 = 3; this._giaoC3T = 1; this.attackCooldown = 10;
                         this._giaoC3Ton = 0;                    // moc charge: da tra 2 diem truoc
                         this.ammo = Math.max(0, this.ammo - 1); }
// PLAYER_PART_END s4.Player.prototype.giaoChoc3.1
};

// index.html:58293 · Phạm vi: Player.prototype
const __Part18 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoQuet.1 EDITABLE
giaoQuet(){
                let dir = this.isFacingLeft ? -1 : 1;
                // Chinh cu VUNG cung quet mot vung rat rong quanh nguoi, roi moi tha luoi khi bay di.
                this._giaoDanh(3, 16, 235, 74, 62, 34, 'quet');
                giaoSong.push({ chu: this, x: this.x + this.w/2 + dir*30, y: this.y + this.h/2, dir, r: GIAO_QUET_R0,
                                t: 46, t0: 46, dmg: 4 + giaoCong() + (hasRune('explshot') ? 1 : 0), nho: 1, hit: new Set() });
                this._giaoVeDat('quet', 120, 16);
            }
// PLAYER_PART_END s4.Player.prototype.giaoQuet.1
};

// index.html:58302 · Phạm vi: Player.prototype
const __Part19 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoMuaBatDau.1 EDITABLE
giaoMuaBatDau(){ this.giaoMua = { con: 5, t: 0 }; this.attackCooldown = 6;
                             this.ammo = Math.max(0, this.ammo - 1); }
// PLAYER_PART_END s4.Player.prototype.giaoMuaBatDau.1
};

// index.html:58305 · Phạm vi: Player.prototype
const __Part20 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoXuyen.1 EDITABLE
giaoXuyen(){
                let dir = this.isFacingLeft ? -1 : 1;
                this.giaoLao = { t: 24, dir };
                // BUFF theo yeu cau truc tiep: 9 -> 11. Chia deu +1 cho cu luot va +1 cho
                // mui thuong, de khong nua nao tu minh tro nen qua manh khi chi mot nua trung.
                this._giaoDanh(4, 24, GIAO_LUOT, 16, 16, 62, 'luot');
                this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 24);
                giaoSong.push({ chu: this, x: this.x + this.w/2, y: this.y + this.h/2, dir, r: 130, t: 60, t0: 60,
                                dmg: 7 + giaoCong() + (hasRune('explshot') ? 1 : 0), nho: 0, xuyen: 1, hit: new Set() });
            }
// PLAYER_PART_END s4.Player.prototype.giaoXuyen.1
};

// index.html:58320 · Phạm vi: Player.prototype
const __Part21 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoBatUlt.1 EDITABLE
giaoBatUlt(){
                let best = null, bd = 1e9;
                for (let o of bosses) if (o && !o.dying && !o.invulnAll && o.hp > 0){
                    let d = Math.abs(o.x - this.x); if (d < bd){ bd = d; best = o; } }
                if (!best) for (let o of enemies){
                    let d = Math.abs(o.x - this.x); if (d < bd){ bd = d; best = o; } }
                // KHONG CAN MUC TIEU: khong co ai thi van lao qua lao lai roi nhay len dap xuong.
                this.giaoUlt = { t: 0, muc: best, khong: best ? 0 : 1, neo: this.x + this.w/2 };
                return true;
            }
// PLAYER_PART_END s4.Player.prototype.giaoBatUlt.1
};

// index.html:58330 · Phạm vi: Player.prototype
const __Part22 = {
// PLAYER_PART_BEGIN s4.Player.prototype._giaoUltDam.1 EDITABLE
_giaoUltDam(o, d, cx, cy){
                if (typeof dealDamage === 'function') dealDamage(o, d, 'ammo'); else o.hp -= d;
                visualEffects.push(new Effect(cx, cy, 'explosion', true, 16));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(520, 0.07, 'square', 0.16, 1200);
            }
// PLAYER_PART_END s4.Player.prototype._giaoUltDam.1
};

// index.html:58335 · Phạm vi: Player.prototype
const __Part23 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoTickUlt.1 EDITABLE
giaoTickUlt(){
                let U = this.giaoUlt; if (!U) return;
                if (U.khong) return this.giaoTickUltMap();
                let o = U.muc;
                // Muc tieu chet giua chung thi KHONG cat chieu — chuyen sang ban khong muc tieu
                // de dien not, dung nhu mot chieu cuoi phai duoc dien tron.
                if (!o || o.hp === undefined || o.hp <= 0 || o.dying){ U.khong = 1; U.muc = null; return this.giaoTickUltMap(); }
                U.t++; U.bong = U.bong || [];
                this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 12);
                o._uFreeze = Math.max(o._uFreeze || 0, 8);      // GHIM muc tieu tai cho
                let cx = o.x + (o.w || 40)/2, cy = o.y + (o.h || 40)/2;
                const P1 = 72, P2 = 120, P3 = 152, MOI = 12;
                for (let i = U.bong.length - 1; i >= 0; i--){ if (--U.bong[i].t <= 0) U.bong.splice(i, 1); }

                if (U.t <= P1){
                    // ---- PHA 1: SAU LUOT XUYEN QUA MUC TIEU ----
                    // Than nguoi choi TAT han, chi con vet luot dai the hien toc do.
                    this._giaoAn = true;
                    let k = Math.floor((U.t - 1) / MOI), f = (U.t - 1) % MOI;
                    let d = (k % 2 === 0) ? 1 : -1, W = 230;
                    this.x = cx - this.w/2 - d * W + d * (f / (MOI - 1)) * 2 * W;
                    this.y = cy - this.h/2 + Math.sin(k * 1.7) * 30;
                    this.dy = 0; this.isFacingLeft = d < 0;
                    U.bong.push({ x: this.x + this.w/2, y: this.y + this.h/2, d, t: 11, doc: 0 });
                    if (f === Math.floor(MOI/2)) this._giaoUltDam(o, 8, cx, cy);
                } else if (U.t <= P2){
                    // ---- PHA 2: DAY MUC TIEU LEN KHONG, luot doc hai ben ----
                    this._giaoAn = true;
                    let f = U.t - P1;
                    o.y -= 3.8; cy = o.y + (o.h || 40)/2;
                    let ben = (f % 12 < 6) ? -1 : 1;
                    this.x = cx - this.w/2 + ben * 52;
                    this.y = cy - this.h/2 + ((f % 6) - 3) * 12;
                    this.dy = 0; this.isFacingLeft = ben > 0;
                    U.bong.push({ x: this.x + this.w/2, y: this.y + this.h/2, d: ben > 0 ? -1 : 1, t: 10, doc: 1 });
                    if (f % 12 === 1) this._giaoUltDam(o, 8, cx, cy);
                } else if (U.t <= P3){
                    // ---- PHA 3: HIEN LAI tren dau muc tieu, giuong giao, tich luc ----
                    this._giaoAn = false;
                    this.x = cx - this.w/2; this.y = o.y - this.h - 54; this.dy = 0;
                    this._giaoAnim = null;
                    if (!this.giaoVK) this.giaoVK = { ang: 0.95, ext: -20, veti: [] };
                    this.giaoVK.ang = -1.52; this.giaoVK.ext = 4; this.giaoVK.veti.length = 0;
                    U.nap = (U.t - P2) / (P3 - P2);
                    if (U.t === P3) U.dat = (o.baseY !== undefined ? o.baseY : 250);
                } else {
                    // ---- PHA 4: DAP GIAO VAO MUC TIEU, DONG NO XUONG DAT ----
                    // Impact KHONG no o tren troi. Nguoi choi bam theo, giao cam vao muc tieu,
                    // muc tieu bi dong thang xuong, va cu no xay ra ngay tren MAT DAT.
                    this._giaoAn = false;
                    let dat = (U.dat !== undefined) ? U.dat : (o.baseY !== undefined ? o.baseY : 250);
                    o.y = Math.min(dat, o.y + 30);
                    this.x = cx - this.w/2; this.y = o.y - this.h - 16; this.dy = 0;
                    this._giaoAnim = null;
                    this.giaoVK.ang = 1.50; this.giaoVK.ext = 50;
                    U.bong.push({ x: cx, y: o.y - 30, d: 1, t: 7, doc: 1 });
                    if (o.y >= dat){
                        let ny = o.y + (o.h || 40);
                        this._giaoUltDam(o, 40, cx, o.y + (o.h || 40) / 2);
                        this.giaoDatDap(cx, ny, 1.9);          // IMPACT MAT DAT, ban to nhat
                        for (let k = 0; k < 8; k++)
                            visualEffects.push(new Effect(cx + (Math.random()-0.5)*130, ny - Math.random()*40, 'explosion', true, 22));
                        shakeTimer = Math.max(shakeTimer, 44);
                        if (o.hp > 0 && o.maxHp && o.hp <= o.maxHp * 0.25){
                            o.hp = 0;
                            floatingTexts.push(new FloatingText(cx - 44, ny - 74, "XỬ TỬ!"));
                        }
                        o._uFreeze = 0;
                        this.giaoUlt = null; this.attackCooldown = 26;
                        this.invTimer = Math.max(this.invTimer || 0, 34);
                    }
                }
            }
// PLAYER_PART_END s4.Player.prototype.giaoTickUlt.1
};

// index.html:58409 · Phạm vi: Player.prototype
const __Part24 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoVeUlt.1 EDITABLE
giaoVeUlt(){
                let U = this.giaoUlt;
                if (U && U.bong) for (let b of U.bong){
                    let a = b.t / 11;
                    ctx.save(); ctx.globalAlpha = 0.20 + 0.62 * a;
                    ctx.translate(b.x, b.y);
                    if (b.doc){
                        let g = ctx.createLinearGradient(0, -66, 0, 66);
                        g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(0.5, "#ECEFF1");
                        g.addColorStop(1, "rgba(255,255,255,0)");
                        ctx.fillStyle = g; ctx.fillRect(-4.5, -66, 9, 132);
                    } else {
                        let g = ctx.createLinearGradient(-b.d * 118, 0, b.d * 26, 0);
                        g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(0.7, "#ECEFF1");
                        g.addColorStop(1, "#FFFFFF");
                        ctx.fillStyle = g;
                        ctx.beginPath();
                        ctx.moveTo(-b.d * 118, -3); ctx.lineTo(b.d * 26, -9);
                        ctx.lineTo(b.d * 26, 9);  ctx.lineTo(-b.d * 118, 3);
                        ctx.closePath(); ctx.fill();
                    }
                    ctx.restore(); ctx.globalAlpha = 1;
                }
                if (U && U.nap > 0){
                    let r = 16 + 44 * U.nap;
                    ctx.save(); ctx.globalAlpha = 0.30 + 0.45 * U.nap;
                    ctx.strokeStyle = "#ECEFF1"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.x + this.w/2, this.y + this.h*0.2, r, 0, Math.PI*2); ctx.stroke();
                    ctx.globalAlpha = 0.5;
                    for (let i = 0; i < 6; i++){
                        let a2 = i * Math.PI/3 + frames * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(this.x + this.w/2 + Math.cos(a2)*r, this.y + this.h*0.2 + Math.sin(a2)*r);
                        ctx.lineTo(this.x + this.w/2 + Math.cos(a2)*(r+16), this.y + this.h*0.2 + Math.sin(a2)*(r+16));
                        ctx.stroke();
                    }
                    ctx.restore(); ctx.globalAlpha = 1;
                }
                if (this.giaoNo){
                    let N = this.giaoNo, u = 1 - N.t / 26;
                    ctx.save(); ctx.globalAlpha = Math.max(0, 1 - u);
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 6 * (1 - u) + 1;
                    ctx.beginPath(); ctx.arc(N.x, N.y, 20 + 150 * u, 0, Math.PI*2); ctx.stroke();
                    ctx.strokeStyle = "#B0BEC5"; ctx.lineWidth = 3;
                    for (let i = 0; i < 10; i++){
                        let a2 = i * Math.PI/5 + 0.3;
                        ctx.beginPath();
                        ctx.moveTo(N.x + Math.cos(a2)*(24 + 120*u), N.y + Math.sin(a2)*(16 + 70*u));
                        ctx.lineTo(N.x + Math.cos(a2)*(50 + 190*u), N.y + Math.sin(a2)*(30 + 110*u));
                        ctx.stroke();
                    }
                    ctx.restore(); ctx.globalAlpha = 1;
                    if (--N.t <= 0) this.giaoNo = null;
                }
            }
// PLAYER_PART_END s4.Player.prototype.giaoVeUlt.1
};

// index.html:58465 · Phạm vi: Player.prototype
const __Part25 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoMui.1 EDITABLE
giaoMui(){
                let VK = this.giaoVK; if (!VK) return null;
                let dir = this._giaoAnim ? this._giaoAnim.dir : (this.isFacingLeft ? -1 : 1);
                let sc = this.getFormScale(), L = 118 * sc, Rt = L * 0.66 + 40 * sc;
                let px = this.x + this.w/2 + dir * (12 + VK.ext * sc);
                let py = this.y + this.h * 0.52;
                return { x: px + dir * Math.cos(VK.ang) * Rt, y: py + Math.sin(VK.ang) * Rt };
            }
// PLAYER_PART_END s4.Player.prototype.giaoMui.1
};

// index.html:58475 · Phạm vi: Player.prototype
const __Part26 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoHenDap.1 EDITABLE
giaoHenDap(k){ this._giaoDapCho = { k, cho: 26 }; }
// PLAYER_PART_END s4.Player.prototype.giaoHenDap.1
};

// index.html:58476 · Phạm vi: Player.prototype
const __Part27 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoTickHenDap.1 EDITABLE
giaoTickHenDap(){
                let C = this._giaoDapCho; if (!C) return;
                C.cho--;
                let VK = this.giaoVK;
                if ((VK && VK.ang >= 1.05) || C.cho <= 0){
                    let m = this.giaoMui();
                    this.giaoDatDap(m ? m.x : this.x + this.w/2, this.y + this.h, C.k);
                    this._giaoDapCho = null;
                }
            }
// PLAYER_PART_END s4.Player.prototype.giaoTickHenDap.1
};

// index.html:58487 · Phạm vi: Player.prototype
const __Part28 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoLuiDam.1 EDITABLE
giaoLuiDam(){
                let dir = this.isFacingLeft ? -1 : 1;
                this.giaoLui = { t: 14, dir };
                this._giaoDanh(2, 14, GIAO_TAM[1], 8, 8, 30, 'choc');   // de bam, doi lai co mien thuong
                this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 14);
                this._giaoNhanh = 'ket';
            }
// PLAYER_PART_END s4.Player.prototype.giaoLuiDam.1
};

// index.html:58497 · Phạm vi: Player.prototype
const __Part29 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoTickUltMap.1 EDITABLE
giaoTickUltMap(){
                let U = this.giaoUlt; U.t++;
                this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 12);
                U.bong = U.bong || [];
                for (let i = U.bong.length - 1; i >= 0; i--) if (--U.bong[i].t <= 0) U.bong.splice(i, 1);
                if (typeof allTargets === 'function')
                    allTargets().forEach(o => { if (o && o._giaoUltCd > 0) o._giaoUltCd--; });
                const P1 = 60, P2 = 90, MOI = 12, DAT = 320;
                if (U.t <= P1){
                    this._giaoAn = true;                       // tat than, chi con vet luot
                    let k = Math.floor((U.t - 1) / MOI), f = (U.t - 1) % MOI;
                    let d = (k % 2 === 0) ? 1 : -1;
                    // Chi lao trong MOT VUNG quanh cho dung (rong bang ban goc co muc tieu),
                    // khong quet ca ban do — lao ra tan ria man la de chet oan luc quay lai.
                    const VUNG = 230;
                    // `neo` truoc day CHOT tai cho bam chieu — ca chuoi lao deu quanh mot
                    // diem chet, doi thu chi can buoc ra khoi vung 230px la mien nhiem.
                    // Gio nguoi choi lai duoc trong suot qua trinh lao, cham hon di bo.
                    // 3px/khung x 60 khung = 180px, trong khi cu lao von da quet +-230px —
                    // lai ma khong ai nhin ra la co lai. Nang len 5px va cho lai tiep ca o
                    // pha bay len, nen tong quang lai duoc gap doi va thay ro tren man hinh.
                    if (U.neo === undefined) U.neo = this.x + this.w/2;
                    this.giaoUltLai(U);
                    let neo = U.neo;
                    // Neo trong KHUNG NHIN hien tai, khong phai trong man hinh goc
                    let _nL = (typeof camX === 'number' ? camX : 0) + VUNG + 30;
                    let _nR = (typeof camX === 'number' ? camX : 0) + canvas.width - VUNG - 30;
                    neo = Math.max(_nL, Math.min(_nR, neo));
                    let xa = neo - d * VUNG - this.w/2, xb = neo + d * VUNG - this.w/2;
                    this.x = xa + (xb - xa) * (f / (MOI - 1));
                    this.y = 176 + Math.sin(k * 1.9) * 38; this.dy = 0;
                    this.isFacingLeft = d < 0;
                    U.bong.push({ x: this.x + this.w/2, y: this.y + this.h/2, d, t: 11, doc: 0 });
                    this.giaoUltQuetNgang(8);
                } else if (U.t <= P2){
                    this._giaoAn = false;                      // hien lai, bay len giuong giao
                    if (U.neo === undefined) U.neo = this.x + this.w/2;
                    this.giaoUltLai(U);            // van lai duoc trong luc bay len
                    let neo2 = U.neo;
                    this.x = Math.max(20, Math.min(canvas.width - this.w - 20, neo2 - this.w/2));
                    this.y = Math.max(24, this.y - 6); this.dy = 0;
                    this._giaoAnim = null;
                    if (!this.giaoVK) this.giaoVK = { ang: 0.95, ext: -20, veti: [] };
                    this.giaoVK.ang = -1.52; this.giaoVK.ext = 4; this.giaoVK.veti.length = 0;
                    U.nap = (U.t - P1) / (P2 - P1);
                } else {
                    this._giaoAn = false;                      // BO THANG XUONG DAT
                    this.y += 24; this.dy = 0;
                    this.giaoVK.ang = 1.50; this.giaoVK.ext = 50;
                    U.bong.push({ x: this.x + this.w/2, y: this.y + this.h, d: 1, t: 6, doc: 1 });
                    if (this.y + this.h >= DAT){
                        this.y = DAT - this.h;
                        let cx = this.x + this.w/2, ny = this.y + this.h, R = 230;
                        let rect = { x: cx - R, y: ny - 170, w: R * 2, h: 210 };
                        if (typeof allTargets === 'function') for (let o of allTargets()){
                            if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                            if (!checkAABB(rect, o)) continue;
                            this._giaoUltDam(o, 40, o.x + (o.w||20)/2, o.y + (o.h||20)/2);
                            if (o.maxHp && o.hp > 0 && o.hp <= o.maxHp * 0.25) o.hp = 0;   // XU TU
                        }
                        this.giaoDatDap(cx, ny, 1.9);
                        for (let k = 0; k < 10; k++)
                            visualEffects.push(new Effect(cx + (Math.random()-0.5)*210, ny - Math.random()*54, 'explosion', true, 24));
                        shakeTimer = Math.max(shakeTimer, 44);
                        this.giaoUlt = null; this.attackCooldown = 26;
                        this.invTimer = Math.max(this.invTimer || 0, 34);
                    }
                }
            }
// PLAYER_PART_END s4.Player.prototype.giaoTickUltMap.1
};

// index.html:58569 · Phạm vi: Player.prototype
const __Part30 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoUltLai.1 EDITABLE
giaoUltLai(U){
                let _tr = !!(keys['KeyA'] || keys['ArrowLeft']), _ph = !!(keys['KeyD'] || keys['ArrowRight']);
                if (_tr === _ph) return;
                U.neo += (_ph ? 1 : -1) * 5;
                let _L = (typeof worldL === 'function') ? worldL() : 0;
                let _R = (typeof worldR === 'function') ? worldR() : canvas.width;
                U.neo = Math.max(_L + 60, Math.min(_R - 60, U.neo));
            }
// PLAYER_PART_END s4.Player.prototype.giaoUltLai.1
};

// index.html:58577 · Phạm vi: Player.prototype
const __Part31 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoUltQuetNgang.1 EDITABLE
giaoUltQuetNgang(d){
                let cx = this.x + this.w/2, cy = this.y + this.h/2;
                let rect = { x: cx - 115, y: cy - 62, w: 230, h: 124 };
                if (this.id === 1 && typeof gdCatHop === 'function') gdCatHop(rect);   // @@HE-GATDAN
                if (typeof allTargets !== 'function') return;
                for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if ((o._giaoUltCd || 0) > 0 || !checkAABB(rect, o)) continue;
                    o._giaoUltCd = 11;
                    this._giaoUltDam(o, d, o.x + (o.w||20)/2, o.y + (o.h||20)/2);
                }
            }
// PLAYER_PART_END s4.Player.prototype.giaoUltQuetNgang.1
};

// index.html:58591 · Phạm vi: Player.prototype
const __Part32 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoDonXoayNgam.1 EDITABLE
giaoDonXoayNgam(dmg, life, R, ton){
                this.ammo = Math.max(0, this.ammo - (ton === undefined ? 1 : ton));
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 75; }
                let sc = this.getFormScale();
                this._beginSlash(dmg + giaoCong(), life, this.isFacingLeft ? -1 : 1, 0, 0, 0, Math.round(R * sc));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(380, 0.08, 'square', 0.10, 900);
            }
// PLAYER_PART_END s4.Player.prototype.giaoDonXoayNgam.1
};

// index.html:58600 · Phạm vi: Player.prototype
const __Part33 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoChocNgam.1 EDITABLE
giaoChocNgam(N){
                let sc = this.getFormScale(), R = Math.round(GIAO_KHONG * sc);
                this.ammo = Math.max(0, this.ammo - 1);
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 75; }
                let dir = this.isFacingLeft ? -1 : 1;
                let dmg = 2 + giaoCong() + (hasRune('explshot') ? 1 : 0);
                this._meleeHits = new Set();
                this.slashSeq = (this.slashSeq || 0) + 1;
                this.slashAtk = { dmg, t: 12, t0: 12, dir, reach: R, hTop: 0, hBot: 0, spin: 0,
                                  goc: N.g, tam: R, hit: new Set(),
                                  cut: hasRune('explshot'), mika: 0, seq: this.slashSeq, base: dmg, fx: null };
                this.attackCooldown = 22; this._giaoCS = GIAO_CS; this._giaoNhanh = 'ket';
                let ang = dir > 0 ? N.g : (Math.PI - N.g);
                this._giaoAnim = { kf: [ {t:0, ang, ext: -32}, {t:0.22, ang, ext: 54},
                                         {t:0.50, ang, ext: 34}, {t:1, ang: 0.9, ext: -18} ],
                                   t: 0, T: 22, kieu: 'choc', dir, vet: false };
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(700, 0.06, 'square', 0.13, 1500);
            }
// PLAYER_PART_END s4.Player.prototype.giaoChocNgam.1
};
