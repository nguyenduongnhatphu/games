// PLAYER_FILE: CUSTOM08
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CM, CUSNO_CHO, CUS_DAN, CUS_MC_BANG, CUS_MC_NAP, CUS_NONG, CUS_QD_TOCBAN, CUS_TACH_GOC, CUS_TL_BAN, CUS_TL_DMG, CUS_TL_LEN, CUS_TL_SO, CUS_TL_TOC, CUS_TOA_CM_CAP, CUS_TOA_SO, CUS_TOA_XUYEN, CUS_TOC, CUS_TOCDO, CUS_TT_BAN, CUS_UFO_VAO, CUS_ULT_DRONE, CUS_ULT_KHO, CUS_VIEN_H, CUS_VIEN_W, CUS_XA_TOC, FloatingText, LT, Projectile, SFX, allTargets, camX, camY, canvas, checkAABB, ctx, currentAmmoType, cusBvNo, cusCapCua, cusHelixBat, cusKvBat, cusMcBat, cusNoBom, cusPtBat, cusQdBat, cusQdHoi, cusQdR, cusSHGop, cusToaBat, cusToaNo, cusUfo, cusUltCap, cusUltChon, cusVkNo, cusXaToc, dashVx, dealDamage, dino, floatingTexts, frames, gameState, hoverAiming, keys, projectiles, pvpMucCua, shakeTimer, ultCharge, worldL, worldR
// index.html:68573 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusVeTanChay.1 EDITABLE
function cusVeTanChay(mx, my, mw, mh, u){
            {
                let m = { x: mx, y: my, w: mw, h: mh };
                ctx.save();
                // than sun tu tren xuong, be ra o chan
                let hh = m.h * (1 - u), ww = m.w * (1 + 0.9 * u);
                let yy = m.y + m.h - hh;
                let g = ctx.createLinearGradient(0, yy, 0, m.y + m.h);
                g.addColorStop(0,   "rgba(255,255,255," + (0.98 * (1 - u * 0.5)).toFixed(2) + ")");
                g.addColorStop(0.4, "rgba(255,167,38," + (0.95 * (1 - u * 0.3)).toFixed(2) + ")");
                g.addColorStop(1,   "rgba(140,30,8,0.95)");
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.moveTo(m.x + m.w/2 - ww/2, m.y + m.h);
                ctx.lineTo(m.x + m.w/2 - (m.w/2) * (1 - u * 0.4), yy);
                ctx.lineTo(m.x + m.w/2 + (m.w/2) * (1 - u * 0.4), yy);
                ctx.lineTo(m.x + m.w/2 + ww/2, m.y + m.h);
                ctx.closePath(); ctx.fill();
                // vien tham — tren nen sa mac cam thi khong co vien nay la vung chay chim nghim
                ctx.strokeStyle = "rgba(78,18,10,0.85)"; ctx.lineWidth = 2;
                ctx.stroke();
                // giot chay xuong
                ctx.fillStyle = "rgba(255,112,67,0.85)";
                for (let k = 0; k < 3; k++){
                    let gx = m.x + m.w * (0.25 + 0.25 * k);
                    let gy = yy + (m.h * 0.3 + k * 6) + u * m.h * 0.7;
                    if (gy < m.y + m.h) { ctx.beginPath(); ctx.ellipse(gx, gy, 2.5, 5, 0, 0, 6.28); ctx.fill(); }
                }
                // hoi boc
                ctx.globalAlpha = 0.45 * (1 - u);
                ctx.fillStyle = "#ECEFF1";
                for (let k = 0; k < 3; k++)
                    { ctx.beginPath(); ctx.arc(m.x + m.w * (0.3 + 0.2 * k), yy - u * 30 - k * 8, 6 - u * 3, 0, 6.28); ctx.fill(); }
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.cusVeTanChay.1

// index.html:68611 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUfoVeHutBoss.1 EDITABLE
function cusUfoVeHutBoss(b, u){
            let tx = cusUfo ? cusUfo.x : (b.x + b.w/2);
            let ty = cusUfo ? cusUfo.y + 8 : -40;
            let hx = (b.x + b.w/2) + (tx - (b.x + b.w/2)) * u;
            let hy = (b.y + b.h/2) + (ty - (b.y + b.h/2)) * u;
            let nhun = Math.sin(u * Math.PI * 3) * (1 - u);
            let sw = b.w * (1 - u) * (1 + 0.8 * nhun);
            let sh = b.h * (1 - u) * (1 - 0.45 * nhun);
            ctx.save();
            ctx.globalAlpha = 1 - u * 0.25;
            ctx.fillStyle = "#C62828";
            ctx.beginPath(); ctx.ellipse(hx, hy, Math.max(0.5, sw/2), Math.max(0.5, sh/2), u * 2.4, 0, 6.28); ctx.fill();
            ctx.strokeStyle = "rgba(124,252,160,0.85)"; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.ellipse(hx, hy, Math.max(0.5, sw/2), Math.max(0.5, sh/2), u * 2.4, 0, 6.28); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.cusUfoVeHutBoss.1

// index.html:68628 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUfoVe.1 EDITABLE
function cusUfoVe(){
            let U = cusUfo; if (!U) return;
            let vao = Math.min(1, U.vao / CUS_UFO_VAO);
            let cx = U.x, cy = U.y;
            ctx.save();
            // luong hut xuong muc tieu
            if (U.muc && vao >= 1){
                let ty = U.muc.y + (U.muc.h || 20) * 0.5, tw = (U.muc.w || 30) * 0.8 + 16;
                let g = ctx.createLinearGradient(0, cy, 0, ty);
                g.addColorStop(0, "rgba(124,252,160,0.55)");
                g.addColorStop(1, "rgba(124,252,160,0.12)");
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.moveTo(cx - 16, cy + 6); ctx.lineTo(cx + 16, cy + 6);
                ctx.lineTo(cx + tw, ty); ctx.lineTo(cx - tw, ty);
                ctx.closePath(); ctx.fill();
                // vach sang chay nguoc len trong luong
                ctx.strokeStyle = "rgba(200,255,210,0.55)"; ctx.lineWidth = 2;
                for (let k = 0; k < 4; k++){
                    let ph = ((frames * 0.03 + k * 0.25) % 1);
                    let yy = ty - (ty - cy) * ph, ww = tw * (1 - ph) + 14 * ph;
                    ctx.beginPath(); ctx.moveTo(cx - ww, yy); ctx.lineTo(cx + ww, yy); ctx.stroke();
                }
            }
            // xac bi bop meo hut len
            if (U.hut){
                let h = U.hut, hu = h.t / h.tong;
                let hx = h.x + h.w/2 + ((cx - (h.x + h.w/2)) * hu);
                let hy = h.y + h.h/2 + ((cy + 8 - (h.y + h.h/2)) * hu);
                let sw = h.w * (1 - hu) * (1 + 0.9 * Math.sin(hu * Math.PI * 3) * (1 - hu));
                let sh = h.h * (1 - hu) * (1 - 0.5 * Math.sin(hu * Math.PI * 3) * (1 - hu));
                ctx.globalAlpha = 1 - hu * 0.3;
                ctx.fillStyle = "#C62828";
                ctx.beginPath(); ctx.ellipse(hx, hy, Math.max(0.5, sw/2), Math.max(0.5, sh/2), hu * 2.2, 0, 6.28); ctx.fill();
                ctx.strokeStyle = "rgba(124,252,160,0.8)"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.ellipse(hx, hy, Math.max(0.5, sw/2), Math.max(0.5, sh/2), hu * 2.2, 0, 6.28); ctx.stroke();
                ctx.globalAlpha = 1;
            }
            // than dia bay
            let by = cy - (1 - vao) * 40;
            ctx.fillStyle = "rgba(0,0,0,0.25)";
            ctx.beginPath(); ctx.ellipse(cx, by + 8, 34, 8, 0, 0, 6.28); ctx.fill();
            ctx.fillStyle = "#455A64";
            ctx.beginPath(); ctx.ellipse(cx, by, 38, 12, 0, 0, 6.28); ctx.fill();
            ctx.fillStyle = "#78909C";
            ctx.beginPath(); ctx.ellipse(cx, by - 3, 30, 9, 0, 0, 6.28); ctx.fill();
            let gv = ctx.createRadialGradient(cx - 4, by - 12, 2, cx, by - 8, 18);
            gv.addColorStop(0, "rgba(225,255,235,0.95)"); gv.addColorStop(1, "rgba(102,187,106,0.85)");
            ctx.fillStyle = gv;
            ctx.beginPath(); ctx.ellipse(cx, by - 8, 17, 12, 0, Math.PI, 0); ctx.fill();
            for (let k = 0; k < 5; k++){
                let a = (k / 5) * Math.PI * 2 + frames * 0.08;
                ctx.fillStyle = (Math.sin(frames * 0.2 + k) > 0) ? "#B9F6CA" : "#00E676";
                ctx.beginPath(); ctx.arc(cx + Math.cos(a) * 30, by + 3 + Math.sin(a) * 3, 3, 0, 6.28); ctx.fill();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cusUfoVe.1

// index.html:68685 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTTNo.1 EDITABLE
function cusTTNo(x, y, dmg, tru){
            cusNoLonDat(x, y, CUS_TT_BAN, "255,213,79");
            shakeTimer = Math.max(shakeTimer, 24);
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(90, 0.40, 'sawtooth', 0.34, 36); SFX.tone(320, 0.14, 'square', 0.18, 90); }
            if (gameState === 'pvp' || typeof allTargets !== 'function') return;
            let R = { x: x - CUS_TT_BAN, y: y - CUS_TT_BAN, w: CUS_TT_BAN * 2, h: CUS_TT_BAN * 2 };
            for (let o of allTargets()){
                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                if (tru && tru.has && tru.has(o)) continue;
                if (!checkAABB(R, o)) continue;
                if (typeof dealDamage === 'function') dealDamage(o, dmg, 'flat'); else o.hp -= dmg;
            }
        }
// PLAYER_PART_END s4.cusTTNo.1

// index.html:68707 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusToaHen.1 EDITABLE
let cusToaHen = [], cusToaVong = [], cusToaTia = [];
// PLAYER_PART_END s4.cusToaHen.1

// index.html:68708 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusToaHenDat.1 EDITABLE
function cusToaHenDat(proj, x, y){
            if (!proj) return;
            let _cm = CUS_TOA_CM_CAP[Math.max(0, Math.min(3, cusCapCua('toa')))];
            let tam = Math.max(40, canvas.width * (_cm / 23));
            let vx = proj.speed || CUS_TOCDO, vy = proj.vy || 0;
            let toc = Math.max(1, Math.hypot(vx, vy));
            cusToaHen.push({ x: x + vx / toc * tam, y: y + vy / toc * tam,
                             t: Math.round(tam / toc),
                             so: proj.cusToaSo || CUS_TOA_SO, dmg: proj.dmg || 1,
                             lot: proj.cusLot, owner: proj.owner || 1 });
        }
// PLAYER_PART_END s4.cusToaHenDat.1

// index.html:68719 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusToaHenTick.1 EDITABLE
function cusToaHenTick(){
            for (let i = cusToaHen.length - 1; i >= 0; i--){
                let h = cusToaHen[i];
                if (--h.t > 0) continue;
                cusToaNo({ cusToaSo: h.so, dmg: h.dmg, cusLot: h.lot, owner: h.owner }, h.x, h.y);
                cusToaHen.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.cusToaHenTick.1

// index.html:68727 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusToaVe.1 EDITABLE
function cusToaVe(){
            // dau cham bao truoc cho chum sap no — de nguoi choi doc duoc no se roi o dau
            for (let h of cusToaHen){
                ctx.save();
                ctx.globalAlpha = 0.55;
                ctx.fillStyle = "#FFF176";
                ctx.beginPath(); ctx.arc(h.x, h.y, 3, 0, 6.28); ctx.fill();
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.cusToaVe.1

// index.html:68747 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusToaVeTren.1 EDITABLE
function cusToaVeTren(){
            if (typeof projectiles !== 'undefined')
                for (let q of projectiles) if (q && q._cusToaCon) { try { q.draw(); } catch(e){} }
            for (let i = cusToaTia.length - 1; i >= 0; i--){
                let T = cusToaTia[i]; T.t++;
                if (T.t > T.tong){ cusToaTia.splice(i, 1); continue; }
                let u = T.t / T.tong, mo = 1 - u;
                ctx.save();
                ctx.lineCap = 'round';
                for (let a of T.goc){
                    let c = Math.cos(a), sn = Math.sin(a);
                    let r0 = T.dai * (u * 0.85), r1 = T.dai * (0.18 + u * 1.0);
                    ctx.globalAlpha = mo * 0.9;
                    ctx.strokeStyle = "#FFF176"; ctx.lineWidth = 4 * mo + 1;
                    ctx.beginPath(); ctx.moveTo(T.x + c*r0, T.y + sn*r0); ctx.lineTo(T.x + c*r1, T.y + sn*r1); ctx.stroke();
                    ctx.globalAlpha = mo;
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 2 * mo;
                    ctx.beginPath(); ctx.moveTo(T.x + c*r0, T.y + sn*r0); ctx.lineTo(T.x + c*r1, T.y + sn*r1); ctx.stroke();
                    ctx.globalAlpha = mo * 0.95;
                    ctx.fillStyle = "#FFFDE7";
                    ctx.beginPath(); ctx.arc(T.x + c*r1, T.y + sn*r1, 3 * mo + 1.2, 0, 6.28); ctx.fill();
                }
                ctx.restore();
            }
            for (let i = cusToaVong.length - 1; i >= 0; i--){
                let v = cusToaVong[i]; v.t++;
                if (v.t > v.tong){ cusToaVong.splice(i, 1); continue; }
                let u = v.t / v.tong, mo = 1 - u;
                ctx.save();
                ctx.globalAlpha = mo;
                ctx.strokeStyle = "#FFF176"; ctx.lineWidth = 3 * mo + 1;
                ctx.beginPath(); ctx.arc(v.x, v.y, v.r * (0.15 + 0.85 * u), 0, 6.28); ctx.stroke();
                ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 1.5 * mo;
                ctx.beginPath(); ctx.arc(v.x, v.y, v.r * (0.10 + 0.60 * u), 0, 6.28); ctx.stroke();
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.cusToaVeTren.1

// index.html:68788 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTLTim.1 EDITABLE
function cusTLTim(p){
            if (typeof allTargets !== 'function') return null;
            let cx = p.x + p.w/2, cy = p.y + p.h/2, tot = null, gan = 1e9;
            for (let o of allTargets()){
                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                let d = Math.hypot((o.x + (o.w||20)/2) - cx, (o.y + (o.h||20)/2) - cy);
                if (d < gan){ gan = d; tot = o; }
            }
            return tot;
        }
// PLAYER_PART_END s4.cusTLTim.1

// index.html:68801 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNoLon.1 EDITABLE
let cusNoLon = [];
// PLAYER_PART_END s4.cusNoLon.1

// index.html:68802 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNoLonDat.1 EDITABLE
function cusNoLonDat(x, y, r, mau){
            cusNoLon.push({ x: x, y: y, r: r, t: 0, tong: 26, mau: mau || "255,183,77" });
        }
// PLAYER_PART_END s4.cusNoLonDat.1

// index.html:68805 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNoLonVe.1 EDITABLE
function cusNoLonVe(){
            for (let i = cusNoLon.length - 1; i >= 0; i--){
                let b = cusNoLon[i]; b.t++;
                if (b.t > b.tong){ cusNoLon.splice(i, 1); continue; }
                let u = b.t / b.tong, mo = 1 - u;
                ctx.save();
                /* THU TU VE QUAN TRONG: khoi truoc, lua sau, vanh xung kich tren cung.
                   Lan dau toi ve lua roi moi ve khoi de len — qua cau lua bi dam khoi xam
                   phu kin, chup ra chi thay mot dam bui chu khong thay vu no. */
                ctx.globalAlpha = mo * 0.5;
                for (let k = 0; k < 5; k++){
                    let a = (k / 5) * Math.PI * 2 + b.t * 0.05;
                    let rr = b.r * (0.25 + 0.55 * u);
                    ctx.fillStyle = "rgba(62,55,50,0.8)";
                    ctx.beginPath();
                    ctx.arc(b.x + Math.cos(a) * rr, b.y + Math.sin(a) * rr - u * b.r * 0.35,
                            b.r * (0.30 - 0.12 * u), 0, 6.28);
                    ctx.fill();
                }
                // qua cau lua — sang rat manh o dau, tat nhanh
                let sang = Math.max(0, 1 - u * 1.5);
                let rl = b.r * (0.45 + 0.65 * u);
                ctx.globalAlpha = 1;
                let g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, rl);
                g.addColorStop(0,    "rgba(255,255,255," + (0.98 * sang).toFixed(2) + ")");
                g.addColorStop(0.30, "rgba(255,241,118," + (0.95 * sang).toFixed(2) + ")");
                g.addColorStop(0.58, "rgba(" + b.mau + "," + (0.85 * mo).toFixed(2) + ")");
                g.addColorStop(0.82, "rgba(230,74,25," + (0.55 * mo).toFixed(2) + ")");
                g.addColorStop(1,    "rgba(120,60,20,0)");
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(b.x, b.y, rl, 0, 6.28); ctx.fill();
                // vanh xung kich lan ra ngoai cung
                ctx.globalAlpha = mo * 0.95;
                ctx.strokeStyle = "rgba(255,255,255,0.95)"; ctx.lineWidth = 7 * mo + 1;
                ctx.beginPath(); ctx.arc(b.x, b.y, b.r * (0.2 + 1.2 * u), 0, 6.28); ctx.stroke();
                ctx.strokeStyle = "rgba(255,204,128,0.8)"; ctx.lineWidth = 3 * mo + 1;
                ctx.beginPath(); ctx.arc(b.x, b.y, b.r * (0.2 + 1.2 * u) * 0.86, 0, 6.28); ctx.stroke();
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.cusNoLonVe.1

// index.html:68845 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTLNo.1 EDITABLE
function cusTLNo(x, y, dmg, tru){
            cusNoLonDat(x, y, CUS_TL_BAN, "255,183,77");
            shakeTimer = Math.max(shakeTimer, 34);
            if (typeof SFX !== 'undefined' && SFX.tone){
                SFX.tone(70, 0.55, 'sawtooth', 0.36, 30); SFX.tone(180, 0.30, 'square', 0.22, 60);
                SFX.tone(1400, 0.10, 'triangle', 0.12, 300);
            }
            if (gameState === 'pvp' || typeof allTargets !== 'function') return;
            let R = { x: x - CUS_TL_BAN, y: y - CUS_TL_BAN, w: CUS_TL_BAN * 2, h: CUS_TL_BAN * 2 };
            for (let o of allTargets()){
                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                if (tru && tru.has && tru.has(o)) continue;   // muc tieu an truc tiep roi thi thoi
                if (!checkAABB(R, o)) continue;
                if (typeof dealDamage === 'function') dealDamage(o, dmg, 'flat'); else o.hp -= dmg;
            }
        }
// PLAYER_PART_END s4.cusTLNo.1

// index.html:68864 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusDroneTao.1 EDITABLE
function cusDroneTao(ng, loai, tran){
            if (!ng) return null;
            if (!ng.rapidDrone) ng.rapidDrone = [];
            if (ng.rapidDrone.some(d => d.loai === loai && !d.roi)) return null;
            let d = (loai === 'laser')
                ? { loai:'laser', x: ng.x + 90, y: -40, cd: 0, goc: 0, quet: null, luot: 0, huongDau: 1, roi: 0 }
                : { loai:'dan',   x: ng.x - 90, y: -40, cd: 0, goc: 0, ban: 0, roi: 0 };
            if (tran) d.tran = tran;
            d.cusVinh = (loai === 'laser') ? 1 : 0;
            ng.rapidDrone.push(d);
            return d;
        }
// PLAYER_PART_END s4.cusDroneTao.1

// index.html:68876 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUltTick.1 EDITABLE
function cusUltTick(){
            if (typeof cusBomTick === 'function') cusBomTick();   // @@HE-CUSBOM
            if (typeof dino === 'undefined' || !dino || dino.hp <= 0) return;
            if (currentAmmoType !== CUS_DAN || gameState === 'pvp') return;
            if (cusUltChon !== 'drone' || cusUltCap() < 1) return;
            if (typeof cusKvBat === 'function' && cusKvBat()) return;   // @@HE-CUSKV: chieu cuoi bi khoa
            if (typeof cusPtBat === 'function' && cusPtBat()) return;   // @@HE-CUSTL: chieu cuoi bi khoa
            /* "1 Drone Laser thuong truc, co ngay tu dau moi tran": no khong phai thu bam
               ra ma la thu LUON O DO. Nen cho no o day chu khong o luc bam U. */
            if (!dino.rapidDrone) dino.rapidDrone = [];
            let L = dino.rapidDrone.find(d => d.loai === 'laser');
            if (!L) cusDroneTao(dino, 'laser', 0);
            else if (L.cusVinh && L.tan){ L.tan = 0; L.tanQuet = 0; L.roi = 0; }   // khong bi "tan cuoc" cuon di
        }
// PLAYER_PART_END s4.cusUltTick.1

// index.html:68890 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUltNo.1 EDITABLE
function cusUltNo(ng){
            // @@HE-CUSKV — lap KIEM VU thi chieu cuoi bi ep thanh VAN KIEM QUY TONG
            if (typeof cusKvBat === 'function' && cusKvBat()){
                if (!cusVkNo(ng)) return false;
                ultCharge = 0; ng.aKeyHeldTime = 0; ng.chargeProgress = 0;
                return true;
            }
            // @@HE-CUSTL — lap PHI TIEU thi chieu cuoi bi ep thanh BAO VU LE HOA CHAM
            if (typeof cusPtBat === 'function' && cusPtBat()){
                if (!cusBvNo(ng)) return false;
                ultCharge = 0; ng.aKeyHeldTime = 0; ng.chargeProgress = 0;
                return true;
            }
            let cap = cusUltCap();
            if (!cusUltChon || cap <= 0){
                floatingTexts.push(new FloatingText(ng.x - 56, ng.y - 34, LT("CHƯA CHỌN CHIÊU CUỐI","NO ULTIMATE PICKED")));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(170, 0.11, 'square', 0.15, 100);
                return false;
            }
            if (cusUltChon === 'drone' && cap < 2){
                /* Cap 1 cua DRONE khong co nut bam — con laser da o tren troi san roi. Bao
                   ro thay vi nuot thanh no cua nguoi choi mot cach im lang. */
                floatingTexts.push(new FloatingText(ng.x - 66, ng.y - 34, LT("DRONE LASER ĐÃ THƯỜNG TRỰC","LASER DRONE ALWAYS ON")));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(520, 0.10, 'triangle', 0.14, 760);
                return false;                                  // KHONG tieu thanh no
            }
            if (cusUltChon === 'kho'){
                let n = CUS_ULT_KHO[cap];
                ng.cusKho = (ng.cusKho || 0) + n;
                ng.isOverheated = false; ng.overheatTimer = 0;
                floatingTexts.push(new FloatingText(ng.x - 44, ng.y - 34, "KHO ĐẠN! +" + n));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(300, 0.25, 'square', 0.24, 900); SFX.tone(900, 0.18, 'sawtooth', 0.16, 1500); }
            } else if (cusUltChon === 'tenlua'){
                ng.cusTL = CUS_TL_SO;
                floatingTexts.push(new FloatingText(ng.x - 52, ng.y - 34, "TÊN LỬA! " + CUS_TL_SO + " × " + CUS_TL_DMG[cap]));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(160, 0.30, 'sawtooth', 0.28, 70); SFX.tone(1100, 0.14, 'square', 0.14, 1700); }
            } else if (cusUltChon === 'bom'){
                if (cusBom) return false;
                cusBomBat(ng, cap);
            } else {
                let n = CUS_ULT_DRONE[cap];
                cusDroneTao(ng, 'dan', n);
                floatingTexts.push(new FloatingText(ng.x - 56, ng.y - 34, "DRONE SÚNG MÁY! " + n));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(700, 0.20, 'square', 0.20, 1200); SFX.tone(1300, 0.16, 'sawtooth', 0.14, 1900); }
            }
            ultCharge = 0;
            ng.aKeyHeldTime = 0; ng.chargeProgress = 0;
            shakeTimer = Math.max(shakeTimer, 20);
            return true;
        }
// PLAYER_PART_END s4.cusUltNo.1

// index.html:68944 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_BOM_MO.1 EDITABLE
const CUS_BOM_MO = 24, CUS_BOM_SO = 3, CUS_BOM_BUOC = 3;
// PLAYER_PART_END s4.CUS_BOM_MO.1

// index.html:68945 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_BOM_DMG.1 EDITABLE
const CUS_BOM_DMG = [0, 25, 30, 33];
// PLAYER_PART_END s4.CUS_BOM_DMG.1

// index.html:68946 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_BOM_RCM.1 EDITABLE
const CUS_BOM_RCM = [0, 4, 5, 6];
// PLAYER_PART_END s4.CUS_BOM_RCM.1

// index.html:68947 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_BOM_SC.1 EDITABLE
const CUS_BOM_SC  = [0, 1.15, 1.4, 1.7];
// PLAYER_PART_END s4.CUS_BOM_SC.1

// index.html:68948 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_BOM_VY.1 EDITABLE
const CUS_BOM_VY = 4, CUS_BOM_TOC = 8, CUS_BOM_HAN = 480, CUS_BOM_EP = 16;
// PLAYER_PART_END s4.CUS_BOM_VY.1

// index.html:68949 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBom.1 EDITABLE
let cusBom = null;
// PLAYER_PART_END s4.cusBom.1

// index.html:68950 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBomCm.1 EDITABLE
function cusBomCm(){ return (typeof CM === 'number') ? CM : (canvas.width / 23); }
// PLAYER_PART_END s4.cusBomCm.1

// index.html:68951 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBomDat.1 EDITABLE
function cusBomDat(){ return 320; }
// PLAYER_PART_END s4.cusBomDat.1

// index.html:68952 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBomCap.1 EDITABLE
function cusBomCap(S){ return Math.max(1, Math.min(3, (S && S.cap) || 1)); }
// PLAYER_PART_END s4.cusBomCap.1

// index.html:68953 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBomTren.1 EDITABLE
function cusBomTren(){
            let top = (typeof camY === 'number' ? camY : -160) - 80;
            return Math.min(top, cusBomDat() - 420);
        }
// PLAYER_PART_END s4.cusBomTren.1

// index.html:68957 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBomKhoang.1 EDITABLE
function cusBomKhoang(o, x, y){
            let x0 = o.x, y0 = o.y, x1 = o.x + (o.w || 20), y1 = o.y + (o.h || 20);
            let px = Math.max(x0, Math.min(x, x1)), py = Math.max(y0, Math.min(y, y1));
            return Math.hypot(px - x, py - y);
        }
// PLAYER_PART_END s4.cusBomKhoang.1

// index.html:68962 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBomBat.1 EDITABLE
function cusBomBat(ng, cap){
            cusBom = { ng: ng, pha: 'mo', t: 0, x: ng.x + ng.w / 2, con: CUS_BOM_SO, roi: [], no: [],
                       jCu: true, khoaJ: true, ep: 0, tha: 0, cap: Math.max(1, Math.min(3, cap || 1)) };
            ng._cusBom = 1; ng._cusBomAn = 0; ng._cusBomMo = 1;
            ng.cusCh = 0;
            floatingTexts.push(new FloatingText(ng.x - 36, ng.y - 40, LT("THẢ BOM", "BOMB DROP")));
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(180, 0.22, 'sawtooth', 0.18, 90);
        }
// PLAYER_PART_END s4.cusBomBat.1

// index.html:68970 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBomTha.1 EDITABLE
function cusBomTha(S){
            if (!S || S.con <= 0) return;
            let y0 = cusBomTren();
            S.roi.push({ x: S.x, y: y0, y0: y0, dat: cusBomDat(), sc: CUS_BOM_SC[cusBomCap(S)] });
            S.con--;
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(240, 0.08, 'square', 0.12, 180);
            if (S.con <= 0 && S.pha === 'ngam'){ S.pha = 've'; S.t = 0; }
        }
// PLAYER_PART_END s4.cusBomTha.1

// index.html:68978 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBomNo.1 EDITABLE
function cusBomNo(S, x, y){
            let cm = cusBomCm(), cap = cusBomCap(S);
            let Rcm = CUS_BOM_RCM[cap], R = Rcm * cm, tam = CUS_BOM_DMG[cap];
            let ds = [];
            if (gameState === 'pvp' && typeof pvpMucCua === 'function') ds = pvpMucCua(S.ng);
            else if (typeof allTargets === 'function') ds = allTargets();
            for (let o of ds){
                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                let d = cusBomKhoang(o, x, y);
                if (d > R) continue;
                let buoc = Math.min(Rcm, Math.floor(d / cm + 1e-4));
                let dmg = tam - CUS_BOM_BUOC * buoc;
                if (dmg <= 0) continue;
                if (typeof dealDamage === 'function') dealDamage(o, dmg, 'flat'); else o.hp -= dmg;
                floatingTexts.push(new FloatingText(o.x, o.y - 18, String(dmg)));
            }
            S.no.push({ x: x, y: y, t: 0, R: R });
            shakeTimer = Math.max(shakeTimer || 0, 14);
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(70, 0.28, 'sawtooth', 0.3, 40); SFX.tone(140, 0.16, 'square', 0.16, 80); }
        }
// PLAYER_PART_END s4.cusBomNo.1

// index.html:68998 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBomNha.1 EDITABLE
function cusBomNha(ng){
            if (!ng) return;
            ng._cusBom = 0; ng._cusBomAn = 0; ng._cusBomMo = 1;
            ng._uFreeze = 0;
            ng.invTimer = Math.max(ng.invTimer || 0, 24);
            ng.invincible = true;
        }
// PLAYER_PART_END s4.cusBomNha.1

// index.html:69005 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBomTick.1 EDITABLE
function cusBomTick(){
            let S = cusBom; if (!S) return;
            let ng = S.ng;
            if (!ng || ng.hp === undefined || ng.hp <= 0){ if (ng) cusBomNha(ng); cusBom = null; return; }
            S.t++;
            ng._cusBom = 1;
            ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 8);
            if (!S.tha) ng._uFreeze = 2;
            if (typeof dashVx !== 'undefined' && ng.id === 1) dashVx = 0;
            if (S.pha === 'mo'){
                ng._cusBomAn = 0;
                ng._cusBomMo = Math.max(0, 1 - S.t / CUS_BOM_MO);
                if (S.t >= CUS_BOM_MO){ S.pha = 'ngam'; S.t = 0; ng._cusBomAn = 1; ng._cusBomMo = 0; S.khoaJ = !!keys['KeyJ']; }
            } else if (S.pha === 'ngam'){
                ng._cusBomAn = 1; ng._cusBomMo = 0;
                let trai = !!(keys['KeyA'] || keys['ArrowLeft']), phai = !!(keys['KeyD'] || keys['ArrowRight']);
                if (trai !== phai) S.x += (phai ? 1 : -1) * CUS_BOM_TOC;
                let viewL = (typeof camX === 'number' ? camX : 0) + 28;
                let viewR = (typeof camX === 'number' ? camX : 0) + canvas.width - 28;
                let mapL = (typeof worldL === 'function' ? worldL() : 0) + 16;
                let mapR = (typeof worldR === 'function' ? worldR() : canvas.width) - 16;
                S.x = Math.max(Math.max(viewL, mapL), Math.min(Math.min(viewR, mapR), S.x));
                let j = !!keys['KeyJ'];
                if (S.khoaJ){ if (!j) S.khoaJ = false; }
                else if (j && !S.jCu && S.ep <= 0) cusBomTha(S);
                S.jCu = j;
                if (S.t >= CUS_BOM_HAN && S.con > 0){
                    if (S.ep <= 0){ cusBomTha(S); S.ep = CUS_BOM_EP; }
                    else S.ep--;
                }
            } else if (S.pha === 've'){
                ng._cusBomAn = 0;
                ng._cusBomMo = Math.min(1, S.t / CUS_BOM_MO);
                if (S.t >= CUS_BOM_MO){ cusBomNha(ng); S.tha = 1; }
            }
            for (let i = S.roi.length - 1; i >= 0; i--){
                let b = S.roi[i];
                b.y += CUS_BOM_VY;
                if (b.y >= b.dat){ cusBomNo(S, b.x, b.dat); S.roi.splice(i, 1); }
            }
            for (let i = S.no.length - 1; i >= 0; i--) if (++S.no[i].t > 18) S.no.splice(i, 1);
            if (S.tha && S.roi.length === 0 && S.no.length === 0) cusBom = null;
            cusBomVe(S);
        }
// PLAYER_PART_END s4.cusBomTick.1

// index.html:69049 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBomVeQua.1 EDITABLE
function cusBomVeQua(x, y, sc){
            ctx.save();
            ctx.translate(x, y); ctx.scale(sc, sc);
            ctx.fillStyle = "#37474F";
            ctx.beginPath(); ctx.moveTo(-14, -6); ctx.lineTo(-26, -22); ctx.lineTo(-6, -12); ctx.fill();
            ctx.beginPath(); ctx.moveTo(14, -6); ctx.lineTo(26, -22); ctx.lineTo(6, -12); ctx.fill();
            ctx.fillStyle = "#263238";
            ctx.beginPath(); ctx.ellipse(0, 4, 16, 24, 0, 0, 6.28); ctx.fill();
            ctx.fillStyle = "#FF6D00";
            ctx.fillRect(-16, 0, 32, 9);
            ctx.fillStyle = "#546E7A";
            ctx.beginPath(); ctx.moveTo(-10, 22); ctx.lineTo(0, 40); ctx.lineTo(10, 22); ctx.fill();
            ctx.strokeStyle = "#FFAB40"; ctx.lineWidth = 2.4;
            ctx.beginPath(); ctx.moveTo(2, -16); ctx.quadraticCurveTo(14, -30, 6, -40); ctx.stroke();
            ctx.fillStyle = "#FFD54F";
            ctx.beginPath(); ctx.arc(6, -40, 4, 0, 6.28); ctx.fill();
            ctx.restore();
        }
// PLAYER_PART_END s4.cusBomVeQua.1

// index.html:69067 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBomVe.1 EDITABLE
function cusBomVe(S){
            if (!S) return;
            let cm = cusBomCm(), cap = cusBomCap(S), R = CUS_BOM_RCM[cap] * cm, y = cusBomDat();
            if (S.pha === 'ngam'){
                ctx.save();
                ctx.strokeStyle = "rgba(255,145,40,0.85)"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(S.x, y, R, 0, 6.28); ctx.stroke();
                ctx.strokeStyle = "rgba(255,145,40,0.22)";
                for (let i = 1; i < CUS_BOM_RCM[cap]; i++){ ctx.beginPath(); ctx.arc(S.x, y, i * cm, 0, 6.28); ctx.stroke(); }
                ctx.fillStyle = "rgba(255,80,20,0.2)";
                ctx.beginPath(); ctx.arc(S.x, y, cm, 0, 6.28); ctx.fill();
                ctx.fillStyle = "#FFCC80"; ctx.font = "bold 13px Consolas, monospace";
                ctx.fillText("BOM " + S.con, S.x - 22, y - R - 8);
                ctx.restore();
            }
            for (let b of S.roi){
                let cao = Math.max(1, b.dat - b.y0);
                let u = Math.max(0, Math.min(1, 1 - (b.dat - b.y) / cao));
                let sc = b.sc || 1;
                ctx.save();
                ctx.fillStyle = "rgba(0,0,0," + (0.15 + 0.35 * u).toFixed(2) + ")";
                ctx.beginPath(); ctx.ellipse(b.x, b.dat - 2, (14 + 18 * u) * sc, (5 + 3 * u) * sc, 0, 0, 6.28); ctx.fill();
                ctx.strokeStyle = "rgba(255,180,70,0.45)"; ctx.setLineDash([4, 6]);
                ctx.beginPath(); ctx.moveTo(b.x, b.y + 20 * sc); ctx.lineTo(b.x, b.dat); ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
                cusBomVeQua(b.x, b.y, sc);
            }
            for (let n of S.no){
                let p = n.t / 18;
                ctx.save(); ctx.globalAlpha = Math.max(0, 1 - p);
                ctx.strokeStyle = "#FF6D00"; ctx.lineWidth = 6;
                ctx.beginPath(); ctx.arc(n.x, n.y, n.R * (0.3 + 0.7 * p), 0, 6.28); ctx.stroke();
                ctx.fillStyle = "rgba(255,87,34,0.22)";
                ctx.beginPath(); ctx.arc(n.x, n.y, n.R * (0.15 + 0.45 * p), 0, 6.28); ctx.fill();
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.cusBomVe.1

// index.html:69106 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNoVe.1 EDITABLE
function cusNoVe(){
            for (let b of cusNoBom){
                let p = 1 - b.t / CUSNO_CHO;
                ctx.save();
                ctx.strokeStyle = "rgba(144,164,174," + (0.30 + 0.45 * p).toFixed(2) + ")"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(b.x, b.y, b.r * (0.40 + 0.60 * p), 0, 6.28); ctx.stroke();
                ctx.fillStyle = "rgba(176,190,197," + (0.06 + 0.14 * p).toFixed(2) + ")";
                ctx.beginPath(); ctx.arc(b.x, b.y, b.r * (0.40 + 0.60 * p), 0, 6.28); ctx.fill();
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.cusNoVe.1

// index.html:69120 · Phạm vi: Player.prototype
const __Part36 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusBan.1 EDITABLE
cusBan(kho){
                // @@HE-CUSULT — dang con luot TEN LUA thi phat nay ra ten lua thay vi dan.
                if ((this.cusTL || 0) > 0){ this.cusBanTenLua(kho); return; }
                if (typeof cusSHGop === 'function' && cusSHGop()){ this.cusBanGhep(kho); return; }   // @@HE-SONGHE: hai nang luc mot phat
                if (cusToaBat()){ this.cusBanToa(kho, CUS_TOA_SO); return; }   // @@HE-CUSTOA
                if (cusHelixBat()){ this.cusBanHelix(kho); return; }            // @@HE-CUSHX
                if (cusQdBat()){ this.cusBanQuyDao(kho); return; }              // @@HE-CUSQD
                let pos = this.getShootPos();
                let _d = (pos.dir < 0 ? -1 : 1);
                let _tt = (typeof cusCapCua === 'function') ? cusCapCua('tachtia') : 0;
                let _xa = (typeof cusCapCua === 'function') ? cusCapCua('tamxa') : 0;
                /* TACH TIA cap 3: trong 1/3 ban do thi ba vien CHUM lai thanh mot phat
                   cong don. Khong to hon ve con so — nhung mot cu duy nhat thi khong the
                   trung mot phan, va do moi la thu dang gia o cu ly do. */
                let _gan = 1e9;
                if (_tt >= 3 && typeof allTargets === 'function')
                    for (let o of allTargets()){
                        if (!o || o.hp === undefined || o.hp <= 0 || o.invulnAll) continue;
                        /* @@HE-TACH3 — Hans: "tach tia doi khi khong tach tia". Truoc day do khoang cach
                           toi muc tieu GAN NHAT o BAT KY PHIA NAO — ke dich / chuong ngai SAU LUNG trong
                           1/3 map cung lam ca chum dan phia truoc bi chum lai. Gio chi tinh muc tieu
                           o PHIA TRUOC mui sung. */
                        let _dx = ((o.x + (o.w||20)/2) - pos.x) * _d;
                        if (_dx < -((o.w||20)/2)) continue;
                        _gan = Math.min(_gan, Math.max(0, _dx));
                    }
                let _chum = (_tt >= 3 && _gan < canvas.width / 3);
                let _goc = (_tt <= 0 || _chum) ? [0]
                         : (_tt === 1 ? [-CUS_TACH_GOC, CUS_TACH_GOC]
                                      : [-CUS_TACH_GOC, 0, CUS_TACH_GOC]);
                let _dmg = _chum ? this.bulletDmg * 3 : this.bulletDmg;
                let _sc = (typeof this.getFormScale === 'function') ? this.getFormScale() : 1;
                /* @@HE-CUSNC — MOI LOAT BAN MOT MA SO.
                   Hieu ung phai tinh MOT LAN moi PHAT BAN chu khong phai moi vien (neu
                   khong thi TACH TIA ba vien = toc tich stack gap ba). Ban dau toi gan co
                   `cusHE` cho vien THU NHAT cua chum — va do la mot cai bay: vien thu nhat
                   la vien NGOAI CUNG, tuc dung cai vien hay truot nhat. Do duoc: BANG can
                   toi ~35 vien moi dong bang thay vi 5, con DOT gan nhu khong bao gio dinh.
                   Gio ca chum mang chung mot ma; muc tieu nho ma cua loat vua an, nen vien
                   NAO cham truoc cung duoc — dung mot lan, va khong bao gio hut. */
                this.cusLot = (this.cusLot || 0) + 1;
                // @@HE-CUSMC — vien thu may trong bang 4 vien (tinh TRUOC khi tru dan)
                let _mc = (!kho && cusMcBat()) ? { thu: Math.max(1, Math.min(CUS_MC_BANG, CUS_MC_BANG - this.ammo + 1)), sac: !!this.cusMcSac } : null;
                for (let _i = 0; _i < _goc.length; _i++){
                    let p = new Projectile(pos.x, pos.y - 2, _dmg, 5, 0, 0, pos.dir, this.id);
                    p.speed = _d * CUS_TOCDO; p.vy = CUS_TOCDO * Math.tan(_goc[_i]);
                    p.cus = 1; p.cusLot = this.cusLot;
                    // vien to hon mac dinh cua type 5 — de nhin thay duong dan
                    p.w = CUS_VIEN_W * _sc; p.h = CUS_VIEN_H * _sc;
                    if (_chum){ p.w *= 1.6; p.h *= 1.6; p._cusChum = 1; }   // @@HE-TACH3: phat chum to ra cho de nhan
                    if (_mc){ p.cusMc = _mc; let k = _mc.thu >= 4 ? (_mc.sac ? 2.1 : 1.8) : (_mc.sac ? 1.3 : 1);   // @@HE-CUSMC
                        let cx = p.x + p.w / 2, cy = p.y + p.h / 2; p.w *= k; p.h *= k; p.x = cx - p.w / 2; p.y = cy - p.h / 2; }
                    if (_xa > 0){ p.pierceCount = 2; p._cusXa = 1; p._cusDi = 0; p._cusW0 = p.w; p._cusH0 = p.h; }
                    projectiles.push(p);
                }
                if (kho){
                    this.cusKho = Math.max(0, (this.cusKho || 0) - 1);
                    this.cusCd = 60 / ((typeof cusXaToc === 'function') ? cusXaToc() : CUS_XA_TOC);
                } else {
                    this.ammo--;
                    this.cusCd = 60 / CUS_TOC;
                    if (this.ammo <= 0){
                        this.ammo = 0;
                        this.isOverheated = true; this.overheatTimer = _mc ? CUS_MC_NAP : CUS_NONG;   // @@HE-CUSMC: 1 giay nap lai ca bang
                        if (_mc) floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, _mc.sac ? "HẠ RÈM!" : "NẠP BĂNG"));
                    }
                }
                this.attackCooldown = 2;                  // chi de hoat anh/SFX, khong phai nhip ban
            }
// PLAYER_PART_END s4.Player.prototype.cusBan.1
};

// index.html:69194 · Phạm vi: Player.prototype
const __Part37 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusBanGhep.1 EDITABLE
cusBanGhep(kho){
                let pos = this.getShootPos();
                let _d = (pos.dir < 0 ? -1 : 1);
                let _sc = (typeof this.getFormScale === 'function') ? this.getFormScale() : 1;
                let _tt = cusCapCua('tachtia'), _xa = cusCapCua('tamxa');
                let _toa = cusToaBat(), _hx = cusHelixBat(), _qd = cusQdBat();
                let _gan = 1e9;
                if (_tt >= 3 && !_qd && typeof allTargets === 'function')
                    for (let o of allTargets()){
                        if (!o || o.hp === undefined || o.hp <= 0 || o.invulnAll) continue;
                        let _dx = ((o.x + (o.w||20)/2) - pos.x) * _d;
                        if (_dx < -((o.w||20)/2)) continue;
                        _gan = Math.min(_gan, Math.max(0, _dx));
                    }
                let _chum = (_tt >= 3 && _gan < canvas.width / 3);
                let _goc = (_tt <= 0 || _chum) ? [0] : (_tt === 1 ? [-CUS_TACH_GOC, CUS_TACH_GOC] : [-CUS_TACH_GOC, 0, CUS_TACH_GOC]);
                let _cap = _hx ? 2 : 1;
                this.cusLot = (this.cusLot || 0) + 1;
                if (_qd){
                    // QUY DAO + nhanh khac: moi huong / moi vien xoan la them mot ngoi sao vao vong
                    if (!this.cusQd) this.cusQd = [];
                    let R = cusQdR(), n = _goc.length * _cap;
                    for (let i = 0; i < n; i++){
                        let g = (this.cusQdGoc || 0) + i * (Math.PI * 2 / n);
                        this.cusQd.push({ goc: g, r: R, lao: null, vet: [], x: this.x + this.w/2 + Math.cos(g) * R, y: this.y + this.h/2 + Math.sin(g) * R,
                                          t: 0, quay: Math.random() * 6.28, cui: 0, khoa: 0 });
                    }
                    if (kho){ this.cusKho = Math.max(0, (this.cusKho || 0) - 1); this.cusCd = 60 / ((typeof cusXaToc === 'function') ? cusXaToc() : CUS_XA_TOC); }
                    else { this.ammo = Math.max(0, this.ammo - 1); this.cusCd = 60 / CUS_QD_TOCBAN; }
                    this.attackCooldown = 2;
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880, 0.05, 'triangle', 0.10, 1320);
                    return;
                }
                let _mc = (!kho && cusMcBat()) ? { thu: Math.max(1, Math.min(CUS_MC_BANG, CUS_MC_BANG - this.ammo + 1)), sac: !!this.cusMcSac } : null;
                let _dmg = _chum ? this.bulletDmg * 3 : this.bulletDmg;
                let _xu = _toa ? (CUS_TOA_XUYEN[cusCapCua('toa')] || 1) : 1;
                for (let g of _goc) for (let k = 0; k < _cap; k++){
                    let p = new Projectile(pos.x, pos.y - 2, _dmg, 5, 0, 0, pos.dir, this.id);
                    p.speed = _d * CUS_TOCDO; p.vy = CUS_TOCDO * Math.tan(g);
                    p.cus = 1; p.cusLot = this.cusLot;
                    p.w = CUS_VIEN_W * _sc * (_hx ? 0.82 : 1); p.h = CUS_VIEN_H * _sc;
                    if (_chum){ p.w *= 1.6; p.h *= 1.6; p._cusChum = 1; }
                    if (_hx){
                        p._cusHx = 1; p._cusHxPha = k * Math.PI; p._cusHxT = 0; p._cusHxY0 = p.y;
                        p._cusHxVy = p.vy; p.vy = 0;                 // xoan quanh mot truc NGHIENG theo huong tach tia
                        p._cusHxW0 = p.w; p._cusHxH0 = p.h;
                    }
                    if (_toa){ p.cusToa = 1; p.cusToaSo = CUS_TOA_SO; p._cusToaChinh = 1; p.pierceCount = Math.max(p.pierceCount || 0, _xu - 1); }
                    if (_mc){ p.cusMc = _mc; let km = _mc.thu >= 4 ? (_mc.sac ? 2.1 : 1.8) : (_mc.sac ? 1.3 : 1);
                        let cx = p.x + p.w / 2, cy = p.y + p.h / 2; p.w *= km; p.h *= km; p.x = cx - p.w / 2; p.y = cy - p.h / 2;
                        if (_hx){ p._cusHxW0 = p.w; p._cusHxH0 = p.h; p._cusHxY0 = p.y; } }
                    if (_xa > 0){ p.pierceCount = Math.max(p.pierceCount || 0, 2); p._cusXa = 1; p._cusDi = 0; p._cusW0 = p.w; p._cusH0 = p.h; }
                    projectiles.push(p);
                }
                if (kho){
                    this.cusKho = Math.max(0, (this.cusKho || 0) - 1);
                    this.cusCd = 60 / ((typeof cusXaToc === 'function') ? cusXaToc() : CUS_XA_TOC);
                } else {
                    this.ammo--;
                    this.cusCd = 60 / CUS_TOC;
                    if (this.ammo <= 0){
                        this.ammo = 0; this.isOverheated = true; this.overheatTimer = _mc ? CUS_MC_NAP : CUS_NONG;
                        if (_mc) floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, _mc.sac ? "HẠ RÈM!" : "NẠP BĂNG"));
                    }
                }
                this.attackCooldown = 2;
            }
// PLAYER_PART_END s4.Player.prototype.cusBanGhep.1
};

// index.html:69264 · Phạm vi: Player.prototype
const __Part38 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusBanTo.1 EDITABLE
cusBanTo(){
                let pos = this.getShootPos(), _d = (pos.dir < 0 ? -1 : 1), _sc = this.getFormScale();
                this.cusLot = (this.cusLot || 0) + 1;
                let p = new Projectile(pos.x, pos.y - 2, (this.bulletDmg || 1) * 1.5, 5, 0, 0, pos.dir, this.id);
                p.speed = _d * CUS_TOCDO; p.vy = 0; p.cus = 1; p.cusLot = this.cusLot; p._cusTo = 1;
                p.w = CUS_VIEN_W * _sc * 2.2; p.h = CUS_VIEN_H * _sc * 2.2; p.y = pos.y - p.h / 2;
                if (typeof hoverAiming === 'function' && hoverAiming() && this.id === 1){   // @@HE-LOLUNG3: lo lung -> bay thang vao muc tieu
                    let N = this.hoverNgam();
                    if (N){ let g = Math.atan2(N.ty - pos.y, N.tx - pos.x); p.speed = Math.cos(g) * CUS_TOCDO; p.vy = Math.sin(g) * CUS_TOCDO; }
                }
                if ((typeof cusCapCua === 'function') && cusCapCua('tamxa') > 0) p.pierceCount = 2;
                projectiles.push(p);
                this.attackCooldown = Math.max(this.attackCooldown || 0, 8);
                floatingTexts.push(new FloatingText(this.x - 14, this.y - 34, "×1.5"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(420, 0.12, 'square', 0.16, 900);
            }
// PLAYER_PART_END s4.Player.prototype.cusBanTo.1
};

// index.html:69285 · Phạm vi: Player.prototype
const __Part39 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusBanTenLua.1 EDITABLE
cusBanTenLua(kho){
                let pos = this.getShootPos();
                let _d = (pos.dir < 0 ? -1 : 1);
                let _sc = (typeof this.getFormScale === 'function') ? this.getFormScale() : 1;
                let dmg = CUS_TL_DMG[cusUltCap()] || CUS_TL_DMG[1];
                this.cusLot = (this.cusLot || 0) + 1;
                let p = new Projectile(pos.x, pos.y - 4, dmg, 5, 0, 0, pos.dir, this.id);
                p.speed = _d * CUS_TL_TOC; p.vy = CUS_TL_LEN;
                p.cus = 1; p.cusTL = 1; p.cusLot = this.cusLot;
                p.w = 36 * _sc; p.h = 15 * _sc;
                projectiles.push(p);
                this.cusTL = Math.max(0, (this.cusTL || 0) - 1);
                if (kho){ this.cusKho = Math.max(0, (this.cusKho || 0) - 1); }
                else {
                    this.ammo--;
                    if (this.ammo <= 0){ this.ammo = 0; this.isOverheated = true; this.overheatTimer = CUS_NONG; }
                }
                this.cusCd = 20;                          // ten lua nang: nhip ban cham han
                this.attackCooldown = 6;
                shakeTimer = Math.max(shakeTimer, 8);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(220, 0.16, 'sawtooth', 0.22, 90);
            }
// PLAYER_PART_END s4.Player.prototype.cusBanTenLua.1
};

// index.html:69309 · Phạm vi: Player.prototype
const __Part40 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusBanToa.1 EDITABLE
cusBanToa(kho, so){
                let pos = this.getShootPos();
                let _d = (pos.dir < 0 ? -1 : 1);
                let _sc = (typeof this.getFormScale === 'function') ? this.getFormScale() : 1;
                let _xu = CUS_TOA_XUYEN[cusCapCua('toa')] || 1;
                let _lon = (so > CUS_TOA_SO);
                this.cusLot = (this.cusLot || 0) + 1;
                let p = new Projectile(pos.x, pos.y - 2, this.bulletDmg, 5, 0, 0, pos.dir, this.id);
                p.speed = _d * CUS_TOCDO; p.vy = 0;
                p.cus = 1; p.cusLot = this.cusLot;
                p.cusToa = 1; p.cusToaSo = so || CUS_TOA_SO; p._cusToaChinh = 1;
                p.pierceCount = Math.max(0, _xu - 1);
                p.w = CUS_VIEN_W * _sc * (_lon ? 1.5 : 1);
                p.h = CUS_VIEN_H * _sc * (_lon ? 1.6 : 1);
                projectiles.push(p);
                if (kho){
                    this.cusKho = Math.max(0, (this.cusKho || 0) - 1);
                    this.cusCd = 60 / ((typeof cusXaToc === 'function') ? cusXaToc() : CUS_XA_TOC);
                } else if (!_lon){
                    this.ammo--;
                    this.cusCd = 60 / CUS_TOC;
                    if (this.ammo <= 0){ this.ammo = 0; this.isOverheated = true; this.overheatTimer = CUS_NONG; }
                }
                this.attackCooldown = 2;
            }
// PLAYER_PART_END s4.Player.prototype.cusBanToa.1
};

// index.html:69338 · Phạm vi: Player.prototype
const __Part41 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusBanHelix.1 EDITABLE
cusBanHelix(kho){
                let pos = this.getShootPos();
                let _d = (pos.dir < 0 ? -1 : 1);
                let _sc = (typeof this.getFormScale === 'function') ? this.getFormScale() : 1;
                this.cusLot = (this.cusLot || 0) + 1;
                for (let k = 0; k < 2; k++){
                    let p = new Projectile(pos.x, pos.y - 2, this.bulletDmg, 5, 0, 0, pos.dir, this.id);
                    p.speed = _d * CUS_TOCDO; p.vy = 0;
                    p.cus = 1; p.cusLot = this.cusLot;
                    p._cusHx = 1; p._cusHxPha = k * Math.PI; p._cusHxT = 0; p._cusHxY0 = p.y;
                    p._cusHxW0 = CUS_VIEN_W * _sc * 0.82; p._cusHxH0 = CUS_VIEN_H * _sc;
                    p.w = p._cusHxW0; p.h = p._cusHxH0;
                    projectiles.push(p);
                }
                if (kho){
                    this.cusKho = Math.max(0, (this.cusKho || 0) - 1);
                    this.cusCd = 60 / ((typeof cusXaToc === 'function') ? cusXaToc() : CUS_XA_TOC);
                } else {
                    this.ammo--;
                    this.cusCd = 60 / CUS_TOC;
                    if (this.ammo <= 0){ this.ammo = 0; this.isOverheated = true; this.overheatTimer = CUS_NONG; }
                }
                this.attackCooldown = 2;
            }
// PLAYER_PART_END s4.Player.prototype.cusBanHelix.1
};

// index.html:69371 · Phạm vi: Player.prototype
const __Part42 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusBanQuyDao.1 EDITABLE
cusBanQuyDao(kho){
                if (!this.cusQd) this.cusQd = [];
                let R = cusQdR(), g = (this.cusQdGoc || 0);
                this.cusQd.push({ goc: g, r: R, lao: null, vet: [],
                                  x: this.x + this.w/2 + Math.cos(g) * R,
                                  y: this.y + this.h/2 + Math.sin(g) * R,
                                  t: 0, quay: Math.random() * 6.28, cui: 0, khoa: 0 });
                if (kho){
                    this.cusKho = Math.max(0, (this.cusKho || 0) - 1);
                    this.cusCd = 60 / ((typeof cusXaToc === 'function') ? cusXaToc() : CUS_XA_TOC);
                } else {
                    this.ammo = Math.max(0, this.ammo - 1);
                    this.cusCd = 60 / CUS_QD_TOCBAN;
                }
                this.attackCooldown = 2;
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880, 0.05, 'triangle', 0.10, 1320);
            }
// PLAYER_PART_END s4.Player.prototype.cusBanQuyDao.1
};

// index.html:69390 · Phạm vi: Player.prototype
const __Part43 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusQdNapDan.1 EDITABLE
cusQdNapDan(){
                this.isOverheated = false; this.overheatTimer = 0;
                if (this.ammo < this.maxAmmo){
                    this.cusQdNap = (this.cusQdNap || 0) + 1;
                    if (this.cusQdNap >= cusQdHoi()){
                        this.cusQdNap = 0;
                        this.ammo = Math.min(this.maxAmmo, this.ammo + 1);
                    }
                } else this.cusQdNap = 0;
            }
// PLAYER_PART_END s4.Player.prototype.cusQdNapDan.1
};
