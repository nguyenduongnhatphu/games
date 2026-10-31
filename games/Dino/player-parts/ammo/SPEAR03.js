// PLAYER_FILE: SPEAR03
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CAM_TROI, Effect, FloatingText, GIAO_CS, POWERS, SFX, TRD_POWER, WKG_MAU_CO, WKG_MAU_CO2, WKG_MAU_CO3, bosses, camX, canvas, combatStance, ctx, currentAmmoType, currentForm, currentPower, dangLuotHoacChop, dashVx, dealDamage, defMode, defUnits, dino, enemies, floatingTexts, frames, gameState, gdCatHop, giaoLay, hasRune, hitCat, hitDam, hitDiem, keys, pvpDich, pvpVoBoc, shakeTimer, slamLaoBat, venKhoa, visualEffects, wkgBat, wkgBuff, wkgDat, wkgFx, wkgHatTung, wkgLoc, wkgMay, wkgMoi, wkgNac, wkgPhan, wkgSet, wkgSpin, wkgUlt, wkgVeCon, wkgVong, worldL, worldR
// index.html:56843 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgVeMay.1 EDITABLE
function wkgVeMay(x, y, w, al){
            ctx.save(); ctx.globalAlpha = al === undefined ? 1 : al;
            ctx.fillStyle = "rgba(214,164,60,0.42)";
            ctx.beginPath(); ctx.ellipse(x, y + 13, w * 0.54, w * 0.17, 0, 0, 6.28); ctx.fill();
            for (let [dx, dy, r] of [[-w*0.34, 4, w*0.26], [0, -3, w*0.35], [w*0.34, 4, w*0.26],
                                     [-w*0.15, 9, w*0.23], [w*0.17, 9, w*0.23]]){
                let g = ctx.createRadialGradient(x + dx, y + dy - r*0.3, r*0.2, x + dx, y + dy, r);
                g.addColorStop(0, "#FFF8E0"); g.addColorStop(1, "#E7D296");
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.ellipse(x + dx, y + dy, r, r * 0.68, 0, 0, 6.28); ctx.fill();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.wkgVeMay.1

// index.html:56859 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgVeBong.1 EDITABLE
function wkgVeBong(x, y, trai, al, P, nhan){
            let d = trai ? -1 : 1;
            let cx = x + dino.w/2, cy = y + dino.h * 0.42;
            let a = -0.18;                                   // the thu
            ctx.save();
            ctx.globalAlpha = 0.22 * al; ctx.fillStyle = "#FFD76A";
            ctx.beginPath(); ctx.ellipse(cx, y + dino.h/2, 30, 28, 0, 0, 6.28); ctx.fill();
            ctx.globalAlpha = al;
            try { dino.drawForm(false, x, y, (frames % 12 < 6) ? 4 : 0, currentForm, trai); } catch(e){}
            let L = 132, piv = 0.08;
            let ux = Math.cos(a) * d, uy = Math.sin(a);
            wkgVeCon(cx - ux * L * piv, cy - uy * L * piv, 0.2,
                     cx + ux * L * (1 - piv), cy + uy * L * (1 - piv), 0.2, 10, 0);
            ctx.globalAlpha = 1;
            if (nhan){
                ctx.fillStyle = "#FFF0B0"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(nhan, cx, y - 6); ctx.textAlign = "left";
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.wkgVeBong.1

// index.html:56880 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgVeFx.1 EDITABLE
function wkgVeFx(){
            for (let F of wkgFx){
                if (F.dat){
                    if (F.t < (F.tre || 0)) continue;
                    let u = (F.t - (F.tre||0)) / Math.max(1, F.T - (F.tre||0)), al = 1 - u;
                    ctx.save();
                    // VET RAN tren nen dat
                    ctx.globalAlpha = al * 0.75; ctx.strokeStyle = "#6B5433"; ctx.lineWidth = 3;
                    let W = (F.manh >= 2 ? 46 : 32) * (0.4 + u * 1.1);
                    ctx.beginPath();
                    ctx.moveTo(F.x - W, F.y + 4); ctx.lineTo(F.x - W*0.4, F.y - 3);
                    ctx.lineTo(F.x + W*0.3, F.y + 3); ctx.lineTo(F.x + W, F.y - 2); ctx.stroke();
                    // BUI bat len hai ben
                    ctx.globalAlpha = al * 0.34; ctx.fillStyle = "#C9B48A";
                    for (let v = -1; v <= 1; v += 2){
                        ctx.beginPath();
                        ctx.ellipse(F.x + v * W * (0.5 + u * 0.9), F.y - u * 16, 10 + u * 20, 6 + u * 13, 0, 0, 6.28);
                        ctx.fill();
                    }
                    // DAT DA van len
                    ctx.globalAlpha = al;
                    ctx.fillStyle = "#8A6E46";
                    for (let m of F.manhVun){
                        ctx.beginPath(); ctx.arc(F.x + m.x, F.y + m.y, m.r, 0, 6.28); ctx.fill();
                    }
                    ctx.globalAlpha = al * 0.9; ctx.fillStyle = "#FFE9A8";
                    ctx.beginPath(); ctx.ellipse(F.x, F.y, W * 0.5 * (1 - u), 4 * (1 - u), 0, 0, 6.28); ctx.fill();
                    ctx.restore();
                    continue;
                }
                let u = F.t / F.T, al = 1 - u;
                let R = (F.manh >= 2 ? 96 : 54) * (0.25 + u * 1.15);
                ctx.save();
                ctx.globalAlpha = al * 0.75;
                ctx.strokeStyle = F.mau; ctx.lineWidth = (F.manh >= 2 ? 6 : 4) * (1 - u * 0.7);
                ctx.beginPath(); ctx.ellipse(F.x, F.y, R, R * 0.40, 0, 0, 6.28); ctx.stroke();
                ctx.globalAlpha = al * 0.9; ctx.strokeStyle = "#FFF6D6"; ctx.lineWidth = 2;
                let n = F.manh >= 2 ? 9 : 6;
                for (let q = 0; q < n; q++){
                    let a = (q / n) * 6.283 + F.T * 0.7;
                    let r0 = R * 0.5, r1 = R * (0.9 + (q % 3) * 0.16);
                    ctx.beginPath();
                    ctx.moveTo(F.x + Math.cos(a) * r0, F.y + Math.sin(a) * r0 * 0.42);
                    ctx.lineTo(F.x + Math.cos(a) * r1, F.y + Math.sin(a) * r1 * 0.42);
                    ctx.stroke();
                }
                if (F.manh >= 2){
                    ctx.globalAlpha = al * 0.30; ctx.fillStyle = "#C9B48A";
                    for (let q = 0; q < 5; q++){
                        let a = (q / 5) * 3.1416 + 3.1416;
                        ctx.beginPath();
                        ctx.arc(F.x + Math.cos(a) * R * 0.8, F.y + Math.sin(a) * R * 0.2 - u * 16,
                                11 + u * 16, 0, 6.28); ctx.fill();
                    }
                }
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.wkgVeFx.1

// index.html:56940 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgVePhan.1 EDITABLE
function wkgVePhan(P){
            ctx.save();
            ctx.globalAlpha = 0.24; ctx.fillStyle = "#FFD76A";
            ctx.beginPath(); ctx.ellipse(P.x + P.w/2, P.y + P.h/2, 32, 29, 0, 0, 6.28); ctx.fill();
            ctx.globalAlpha = 0.86;
            try { P.drawForm(false, P.x, P.y, (frames % 12 < 6) ? 4 : 0, currentForm, P.isFacingLeft); } catch(e){}
            ctx.globalAlpha = 1;
            // giaoVe() thoat som voi phan than nen `giaoVK` khong duoc cap nhat — doc thang
            // tu bang keyframe cua Giao va tu dem khung, neu khong ca dam dung im mot goc.
            let A = P._giaoAnim, ang = 0.14, ext = -30;
            if (A){
                A.t++;
                let st = giaoLay(A.kf, Math.min(1, A.t / A.T), A.kieu === 'xoay');
                ang = st.ang; ext = st.ext;
                if (A.t >= A.T) P._giaoAnim = null;
            }
            let d = (A ? A.dir : (P.isFacingLeft ? -1 : 1));
            let L = 132, cx = P.x + P.w/2 + d * (10 + ext * 0.8), cy = P.y + P.h * 0.44;
            let ux = Math.cos(ang) * d, uy = Math.sin(ang);
            wkgVeCon(cx - ux * L * 0.10, cy - uy * L * 0.10, 0.2,
                     cx + ux * L * 0.90, cy + uy * L * 0.90, 0.2, 10, 0);
            ctx.restore();
        }
// PLAYER_PART_END s4.wkgVePhan.1

// index.html:56963 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgVe.1 EDITABLE
function wkgVe(){
            if (typeof dino === 'undefined' || !dino || !wkgBat()) return;
            ctx.save();
            wkgVeFx();
            // --- CAN DAU VAN duoi chan ---
            if (wkgMay){
                let x = dino.x + dino.w/2, y = dino.y + dino.h + 8 + Math.sin(wkgMay.bob) * 3;
                wkgVeMay(x, y, 76, Math.min(1, wkgMay.t / 24));
            }
            // --- VONG CHONG YEU ---
            for (let V of wkgVong){
                let al = Math.min(1, V.t / 30) * 0.9;
                ctx.globalAlpha = al;
                ctx.strokeStyle = "#FFC246"; ctx.lineWidth = 4;
                ctx.beginPath(); ctx.ellipse(V.x, V.y, V.r, V.r * 0.30, 0, 0, 6.28); ctx.stroke();
                ctx.globalAlpha = al * 0.20; ctx.fillStyle = "#FFB000";
                ctx.beginPath(); ctx.ellipse(V.x, V.y, V.r, V.r * 0.30, 0, 0, 6.28); ctx.fill();
                ctx.globalAlpha = al * 0.55; ctx.strokeStyle = "#FFF0B0"; ctx.lineWidth = 2;
                for (let q = 0; q < 10; q++){
                    let a = (q / 10) * 6.28 + V.nhip * 0.02;
                    ctx.beginPath();
                    ctx.moveTo(V.x + Math.cos(a) * V.r * 0.84, V.y + Math.sin(a) * V.r * 0.25);
                    ctx.lineTo(V.x + Math.cos(a) * V.r, V.y + Math.sin(a) * V.r * 0.30);
                    ctx.stroke();
                }
                ctx.globalAlpha = 1;
            }
            // --- CAN DAU VAN TREN TROI GIANG SET ---
            if (wkgSet){
                let x = wkgSet.x, y = wkgSet.y;
                wkgVeMay(x, y, 128, Math.min(1, wkgSet.t / 24));
                ctx.globalAlpha = 0.35; ctx.strokeStyle = "#9AD8FF"; ctx.lineWidth = 2;
                for (let q = 0; q < 4; q++){
                    let ox = x + (q - 1.5) * 44;
                    ctx.beginPath(); ctx.moveTo(ox, y + 18); ctx.lineTo(ox + Math.sin(frames * 0.3 + q) * 10, y + 54); ctx.stroke();
                }
                ctx.globalAlpha = 1;
            }
            // --- SET va LOC ---
            for (let X of wkgLoc){
                if (X.tia){
                    let al = Math.min(1, X.t / 6);
                    ctx.globalAlpha = al;
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 7;
                    let _tu = (X.tu === undefined ? -CAM_TROI : X.tu);
                    ctx.beginPath(); ctx.moveTo(X.x, _tu);
                    for (let s2 = _tu; s2 < X.y; s2 += 30) ctx.lineTo(X.x + (Math.random()-0.5) * 14, s2);
                    ctx.lineTo(X.x, X.y); ctx.stroke();
                    ctx.strokeStyle = "#9AD8FF"; ctx.lineWidth = 3; ctx.stroke();
                    ctx.globalAlpha = al * 0.35; ctx.fillStyle = "#BFE6FF";
                    ctx.beginPath(); ctx.arc(X.x, X.y, X.R, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 1;
                    continue;
                }
                let al = Math.min(1, X.t / 24);
                ctx.globalAlpha = al * 0.85;
                for (let q = 0; q < 9; q++){
                    let u = q / 9;
                    let w = 20 + u * 78, yy = X.y + 96 - u * 190;
                    ctx.strokeStyle = "rgba(206,178,120," + (0.85 - u * 0.5) + ")";
                    ctx.lineWidth = 3 + u * 3;
                    ctx.beginPath();
                    ctx.ellipse(X.x + Math.sin(frames * 0.26 + q) * 7, yy, w, w * 0.26, 0, 0, 6.28);
                    ctx.stroke();
                }
                ctx.globalAlpha = al * 0.20; ctx.fillStyle = "#D8C79A";
                ctx.beginPath();
                ctx.moveTo(X.x - 22, X.y + 96); ctx.lineTo(X.x + 22, X.y + 96);
                ctx.lineTo(X.x + 98, X.y - 94); ctx.lineTo(X.x - 98, X.y - 94); ctx.closePath(); ctx.fill();
                // DAN BI CUON — xoay tron va troi len trong long loc
                if (X.dan) for (let D of X.dan){
                    let yy = X.y + 96 - Math.min(190, D.cao);
                    let xx = X.x + Math.cos(D.a) * D.r;
                    ctx.globalAlpha = al * Math.max(0, 1 - D.cao / 210);
                    ctx.fillStyle = D.mau;
                    ctx.fillRect(xx - D.w/2, yy - D.h/2, D.w, D.h);
                    ctx.globalAlpha = al * 0.35; ctx.fillStyle = "#FFF3D0";
                    ctx.fillRect(xx - D.w/2 - 1, yy - D.h/2 - 1, D.w + 2, D.h + 2);
                }
                ctx.globalAlpha = 1;
            }
            // --- PHAN THAN ---
            if (wkgMoi) wkgVeBong(wkgMoi.x, wkgMoi.y, wkgMoi.trai, 0.68, null, "MỒI");
            for (let Q of wkgPhan) if (Q && Q.ng) wkgVePhan(Q.ng);
            // --- XOAY CON: quang chan dan ---
            if (wkgSpin){
                let x = dino.x + dino.w/2, y = dino.y + dino.h/2, R = 128;
                // Vanh chan dan, khong phai mot dia dac: giua trong, chi sang len o RIA — do
                // moi la cho cay gay quet qua. Ban dac truoc do lam nhoe ca canh nen phia sau.
                let rg = ctx.createRadialGradient(x, y, R * 0.55, x, y, R);
                rg.addColorStop(0, "rgba(255,215,106,0)");
                rg.addColorStop(0.82, "rgba(255,215,106,0.13)");
                rg.addColorStop(1, "rgba(255,233,168,0.34)");
                ctx.fillStyle = rg;
                ctx.beginPath(); ctx.arc(x, y, R, 0, 6.28); ctx.fill();
                ctx.globalAlpha = 0.55; ctx.strokeStyle = "#FFE9A8"; ctx.lineWidth = 1.6;
                ctx.beginPath(); ctx.arc(x, y, R, 0, 6.28); ctx.stroke();
                ctx.setLineDash([9, 13]);
                ctx.globalAlpha = 0.42; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(x, y, R * 0.86, frames * 0.12, frames * 0.12 + 6.28); ctx.stroke();
                ctx.setLineDash([]);
                ctx.globalAlpha = 1;
                ctx.fillStyle = "#FFF0B0"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText("CHẶN " + wkgSpin.chan, x, y - R - 8); ctx.textAlign = "left";
            }
            // --- CHIEU CUOI: NHU Y KIM CO BONG ---
            if (wkgUlt){
                let U = wkgUlt, t = U.t;
                if (t < 74){
                    let u = t / 74;
                    let x = dino.x + dino.w/2 + (U.x - (dino.x + dino.w/2)) * u * 0.5;
                    let y = dino.y - 40 - u * 300;
                    let L = 80 + u * 150, pha = t * 0.24;
                    let ux = Math.cos(pha), uy = Math.sin(pha), z = Math.cos(pha * 0.7);
                    ctx.save(); ctx.globalAlpha = 0.30; ctx.strokeStyle = "#FFD76A"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(x, y, L * 0.55, 0, 6.28); ctx.stroke(); ctx.restore();
                    wkgVeCon(x - ux * L, y - uy * L, -z, x + ux * L, y + uy * L, z, 15 + u * 22, 3);
                } else {
                    let u = Math.min(1, (t - 74) / 22);
                    let w = 70 + u * 340, x = U.x;
                    let dy = (t < 96) ? (-CAM_TROI - 240 + ((t - 74) / 22) * (wkgDat() + CAM_TROI + 240)) : 0;
                    let y0 = -CAM_TROI - 300 + Math.max(0, dy);
                    ctx.save();
                    ctx.globalAlpha = 0.88;
                    let g = ctx.createLinearGradient(x - w/2, 0, x + w/2, 0);
                    g.addColorStop(0, "#1B0F0A"); g.addColorStop(0.14, "#4A2A1B");
                    g.addColorStop(0.42, "#8A5230"); g.addColorStop(0.56, "#C08A52");
                    g.addColorStop(0.78, "#4A2A1B"); g.addColorStop(1, "#1B0F0A");
                    ctx.fillStyle = g; ctx.fillRect(x - w/2, y0, w, 1500);
                    // CO VANG KIM o day cay gay
                    let gg = ctx.createLinearGradient(x - w/2, 0, x + w/2, 0);
                    gg.addColorStop(0, WKG_MAU_CO3); gg.addColorStop(0.4, WKG_MAU_CO2);
                    gg.addColorStop(0.6, WKG_MAU_CO); gg.addColorStop(1, WKG_MAU_CO3);
                    ctx.fillStyle = gg; ctx.fillRect(x - w/2, y0, w, 96);
                    ctx.strokeStyle = "#3A2A08"; ctx.lineWidth = 3;
                    for (let q = 1; q <= 3; q++) { ctx.beginPath(); ctx.moveTo(x - w/2, y0 + q*24); ctx.lineTo(x + w/2, y0 + q*24); ctx.stroke(); }
                    // KHAC CHIM va VET NUT doc than — khong co may cai nay thi cot chi la mot
                    // dai mau nau, khong ai doc ra day la mot KHUC cua cay gay.
                    ctx.globalAlpha = 0.35; ctx.strokeStyle = "#1B0F0A"; ctx.lineWidth = 2;
                    for (let q = 1; q < 8; q++){
                        let px = x - w/2 + w * (q / 8);
                        ctx.beginPath(); ctx.moveTo(px, y0); ctx.lineTo(px, y0 + 1500); ctx.stroke();
                    }
                    ctx.globalAlpha = 0.5; ctx.strokeStyle = "#0E0805"; ctx.lineWidth = 3;
                    for (let q = 0; q < 6; q++){
                        let yy = y0 + 150 + q * 210;
                        ctx.beginPath(); ctx.moveTo(x - w*0.34, yy);
                        ctx.lineTo(x - w*0.10, yy + 40); ctx.lineTo(x + w*0.18, yy + 22);
                        ctx.lineTo(x + w*0.40, yy + 64); ctx.stroke();
                    }
                    ctx.globalAlpha = 0.9;
                    ctx.strokeStyle = "#1B0F0A"; ctx.lineWidth = 5;
                    ctx.strokeRect(x - w/2, y0, w, 1500);
                    ctx.restore();
                }
            }
            /* --- NAC 3: QUANG quanh nguoi choi ---
               Ban truoc dung cam sang (255,150,70) alpha 0.13 — tren nen CAT CAM cua sa mac
               thi no la cung mot mau voi nen, Hans bao dung la "cha thay gi". Day la lan thu
               tu cung mot bai hoc: tren nen cam, mau am nhat BIEN MAT; phai co mot lop THAM
               (do tham gan den) lam duong vien thi hinh moi cat ra khoi nen, roi moi den lop
               sang. Them mot vong tan lua bay len cho no dong day. */
            if (wkgNac() >= 3){
                let nh = 0.5 + 0.5 * Math.sin(frames * 0.13);
                let cx = dino.x + dino.w/2, cy = dino.y + dino.h/2;
                let RX = dino.w * 1.5, RY = dino.h * 1.15;
                ctx.save();
                // 1) lop THAM — thu lam ca cai quang tach ra khoi nen cat
                ctx.globalAlpha = 0.50;
                let rg0 = ctx.createRadialGradient(cx, cy, RX * 0.45, cx, cy, RX * 1.22);
                rg0.addColorStop(0, "rgba(60,8,4,0)");
                rg0.addColorStop(0.62, "rgba(74,10,6,0.55)");
                rg0.addColorStop(1, "rgba(30,4,2,0)");
                ctx.fillStyle = rg0;
                ctx.beginPath(); ctx.ellipse(cx, cy, RX * 1.22, RY * 1.22, 0, 0, 6.28); ctx.fill();
                // 2) than quang do ruc
                ctx.globalAlpha = 0.58;
                let rg = ctx.createRadialGradient(cx, cy, RX * 0.30, cx, cy, RX);
                rg.addColorStop(0, "rgba(255,236,180,0.10)");
                rg.addColorStop(0.55, "rgba(255,96,32,0.40)");
                rg.addColorStop(1, "rgba(150,20,10,0)");
                ctx.fillStyle = rg;
                ctx.beginPath(); ctx.ellipse(cx, cy, RX, RY, 0, 0, 6.28); ctx.fill();
                // 3) hai vien: mot tham ben ngoai, mot sang ben trong
                ctx.globalAlpha = 0.9;
                ctx.strokeStyle = "#3A0805"; ctx.lineWidth = 4.5;
                ctx.beginPath(); ctx.ellipse(cx, cy, RX * (0.92 + nh * 0.06), RY * (0.92 + nh * 0.06), 0, 0, 6.28); ctx.stroke();
                ctx.strokeStyle = "#FFD27A"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.ellipse(cx, cy, RX * (0.92 + nh * 0.06), RY * (0.92 + nh * 0.06), 0, 0, 6.28); ctx.stroke();
                // 4) tan lua bay len
                for (let q = 0; q < 6; q++){
                    let a = (q / 6) * 6.283 + frames * 0.035;
                    let r = RX * (0.62 + 0.30 * Math.sin(frames * 0.06 + q * 1.7));
                    let px = cx + Math.cos(a) * r, py = cy + Math.sin(a) * r * 0.72 - ((frames * 0.9 + q * 22) % 40) * 0.55;
                    ctx.globalAlpha = 0.85;
                    ctx.fillStyle = "#2A0603";
                    ctx.beginPath(); ctx.arc(px, py, 3.4, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#FFC048";
                    ctx.beginPath(); ctx.arc(px, py, 2, 0, 6.28); ctx.fill();
                }
                ctx.restore();
                ctx.globalAlpha = 1;
            }
            // --- HAO QUANG DO sau chieu cuoi ---
            if (wkgBuff > 0){
                ctx.globalAlpha = 0.28 + 0.10 * Math.sin(frames * 0.2);
                ctx.strokeStyle = "#FF4A34"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.ellipse(dino.x + dino.w/2, dino.y + dino.h/2, dino.w * 1.3, dino.h * 0.85, 0, 0, 6.28); ctx.stroke();
                ctx.globalAlpha = 1;
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.wkgVe.1

// index.html:57198 · Phạm vi: global
// PLAYER_PART_BEGIN s4.TRD_CM.1 EDITABLE
const TRD_CM = 43.4;
// PLAYER_PART_END s4.TRD_CM.1

// index.html:57199 · Phạm vi: global
// PLAYER_PART_BEGIN s4.TRD_TIERS.1 EDITABLE
const TRD_TIERS = [[30, "#80DEEA"], [60, "#26C6DA"], [90, "#4DD0E1"], [105, "#00ACC1"], [135, "#B2EBF2"], [150, "#E0F7FA"]];
// PLAYER_PART_END s4.TRD_TIERS.1

// index.html:57200 · Phạm vi: global
// PLAYER_PART_BEGIN s4.TRD_I_CD.1 EDITABLE
const TRD_I_CD = 90, TRD_HAO_T = 600, TRD_NAC_DMG = 20, TRD_NAC_MAX = 3;
// PLAYER_PART_END s4.TRD_I_CD.1

// index.html:57201 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trd.1 EDITABLE
let trd = null, trdPowerCu = -1;
// PLAYER_PART_END s4.trd.1

// index.html:57202 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdMoi.1 EDITABLE
function trdMoi(){
            return { chuoi: '', chuoiT: 0, cong: 0, congT: 0, nac: 0, dem: 0, hpCu: new Map(),
                     I: null, Icd: 0, fx: [], cot: [], song: [], giao: [], cau: [], nguc: [], lien: null,
                     ch: null, ult: null, day: [], viec: null, tayKhong: 0, xien: [] };
        }
// PLAYER_PART_END s4.trdMoi.1

// index.html:57207 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdBat.1 EDITABLE
function trdBat(){ return typeof hasRune === 'function' && hasRune('trident') && currentAmmoType === 10; }
// PLAYER_PART_END s4.trdBat.1

// index.html:57208 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdReset.1 EDITABLE
function trdReset(){ trd = trdMoi(); }
// PLAYER_PART_END s4.trdReset.1

// index.html:57209 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdCong.1 EDITABLE
function trdCong(){ return (trd && trdBat()) ? trd.cong : 0; }
// PLAYER_PART_END s4.trdCong.1

// index.html:57210 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdDongBo.1 EDITABLE
function trdDongBo(){
            if (typeof POWERS === 'undefined' || typeof TRD_POWER === 'undefined') return;
            if (!trd) trd = trdMoi();
            if (trdBat()){
                if (currentPower !== TRD_POWER){ trdPowerCu = currentPower; currentPower = TRD_POWER; }
                combatStance = 0;
            } else if (currentPower === TRD_POWER){
                currentPower = (trdPowerCu >= 0 && trdPowerCu !== TRD_POWER) ? trdPowerCu : 0;
                trdPowerCu = -1; trdReset();
            }
        }
// PLAYER_PART_END s4.trdDongBo.1

// index.html:57222 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdDs.1 EDITABLE
function trdDs(){
            let ds = [];
            if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
            if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
            if (typeof defMode !== 'undefined' && defMode && typeof defUnits !== 'undefined')
                for (let u of defUnits) if (u.ben === 'e' && u.hp > 0) ds.push(u);
            return ds.filter(o => o && o.hp !== undefined && o.hp > 0 && !o.dying && !o.invulnAll);
        }
// PLAYER_PART_END s4.trdDs.1

// index.html:57230 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdDanhVat.1 EDITABLE
function trdDanhVat(o, dmg){
            if (!o) return;
            if (typeof dealDamage === 'function') dealDamage(o, dmg + trdCong(), 'flat'); else o.hp -= dmg + trdCong();
        }
// PLAYER_PART_END s4.trdDanhVat.1

// index.html:57235 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdHop.1 EDITABLE
function trdHop(x0, y0, x1, y1, dmg, hit, fn){
            let n = 0;
            if (typeof gdCatHop === 'function') gdCatHop({ x: Math.min(x0, x1), y: y0, w: Math.abs(x1 - x0), h: y1 - y0 });   // @@HE-GATDAN
            for (let o of trdDs()){
                if (hit && hit.has(o)) continue;
                if (o.x + (o.w || 20) < x0 || o.x > x1 || o.y + (o.h || 20) < y0 || o.y > y1) continue;
                if (hit) hit.add(o);
                if (dmg > 0) trdDanhVat(o, dmg);
                if (dmg > 0 && typeof hitCat === 'function'){ let _d = (typeof dino !== 'undefined' && dino && dino.isFacingLeft) ? -1 : 1, _p = hitDiem(o, _d, (y0 + y1) / 2); hitCat(_p.x, _p.y, _d * -0.35, dmg >= 5); }   // @@HE-HITFX
                if (fn) fn(o);
                n++;
            }
            if (gameState === 'pvp' && typeof pvpDich === 'function'){
                let d2 = pvpDich(dino);
                if (d2 && !(hit && hit.has(d2)) && d2.x + d2.w >= x0 && d2.x <= x1 && d2.y + d2.h >= y0 && d2.y <= y1){
                    if (hit) hit.add(d2);
                    if (dmg > 0) (typeof pvpVoBoc === 'function' ? pvpVoBoc(d2) : d2).takeDamage(dmg + trdCong());
                    n++;
                }
            }
            return n;
        }
// PLAYER_PART_END s4.trdHop.1

// index.html:57258 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdDoan.1 EDITABLE
function trdDoan(x0, y0, x1, y1, r, dmg, hit){
            let n = 0;
            for (let o of trdDs()){
                if (hit && hit.has(o)) continue;
                let cham = false;
                for (let s = 0; s <= 1.0001; s += 0.1){
                    let px = x0 + (x1 - x0) * s, py = y0 + (y1 - y0) * s;
                    if (px > o.x - r && px < o.x + (o.w || 20) + r && py > o.y - r && py < o.y + (o.h || 20) + r){ cham = true; break; }
                }
                if (!cham) continue;
                if (hit) hit.add(o);
                trdDanhVat(o, dmg); n++;
                if (typeof hitDam === 'function'){ let _d = x1 >= x0 ? 1 : -1, _p = hitDiem(o, _d); hitDam(_p.x, _p.y, _d, dmg >= 5); }   // @@HE-HITFX
            }
            return n;
        }
// PLAYER_PART_END s4.trdDoan.1

// index.html:57274 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdGan.1 EDITABLE
function trdGan(ng, soLuong){
            let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2;
            return trdDs().map(o => ({ o, d: Math.hypot(o.x + (o.w || 20) / 2 - cx, o.y + (o.h || 20) / 2 - cy) }))
                          .sort((a, b) => a.d - b.d).slice(0, soLuong || 1).map(e => e.o);
        }
// PLAYER_PART_END s4.trdGan.1

// index.html:57280 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdDay.1 EDITABLE
function trdDay(o, v, T){
            if (!o || !trd) return;
            trd.day = trd.day.filter(d => d.o !== o);
            trd.day.push({ o, v, t: T, tuong: false });
        }
// PLAYER_PART_END s4.trdDay.1

// index.html:57285 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickDay.1 EDITABLE
function trdTickDay(){
            if (!trd) return;
            for (let i = trd.day.length - 1; i >= 0; i--){
                let D = trd.day[i]; D.t--;
                let o = D.o;
                if (!o || o.hp === undefined || o.hp <= 0 || o.dying){ trd.day.splice(i, 1); continue; }
                o.x += D.v; D.v *= 0.9;
                let L = (typeof worldL === 'function' ? worldL() : 0), R = (typeof worldR === 'function' ? worldR() : canvas.width);
                if (o.x <= L + 2 || o.x + (o.w || 20) >= R - 2){
                    o.x = Math.max(L + 2, Math.min(R - 2 - (o.w || 20), o.x));
                    if (!D.tuong){
                        D.tuong = true; trdDanhVat(o, 1);
                        floatingTexts.push(new FloatingText(o.x + (o.w || 20) / 2 - 30, o.y - 20, "ĐẬP TƯỜNG +1"));
                        shakeTimer = Math.max(shakeTimer || 0, 12);
                        visualEffects.push(new Effect(D.v < 0 ? o.x : o.x + (o.w || 20), o.y + (o.h || 20) / 2, 'explosion', true, 30));
                    }
                    trd.day.splice(i, 1); continue;
                }
                if (D.t <= 0 || Math.abs(D.v) < 0.5) trd.day.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.trdTickDay.1

// index.html:57306 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdFx.1 EDITABLE
function trdFx(o){ if (trd) trd.fx.push(o); }
// PLAYER_PART_END s4.trdFx.1

// index.html:57313 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdBoNhanhGiao.1 EDITABLE
function trdBoNhanhGiao(ng){ ng._giaoLuotNoi = 0; ng._giaoQuatNoi = 0; ng._giaoNhanh = 0; }
// PLAYER_PART_END s4.trdBoNhanhGiao.1

// index.html:57316 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdJ.1 EDITABLE
function trdJ(ng){
            if (!trd) trd = trdMoi();
            if (trd.ult || trd.ch || trd.I) return true;
            if (!ng.grounded) return false;
            if (keys['KeyS'] || keys['ArrowDown']) return false;
            if (typeof dangLuotHoacChop === 'function' && dangLuotHoacChop()) return false;
            if ((ng._giaoCS || 0) > 0 && ((ng._giaoLuotNoi || 0) > 0 || (ng._giaoQuatNoi || 0) > 0)) return false;
            if (ng.giaoMua || ng.giaoLao || ng.giaoUlt || ng.giaoBoXuong || trd.viec) return true;
            if (ng.isOverheated || ng.ammo <= 0) return true;
            trdBoNhanhGiao(ng);
            if (trd.chuoiT <= 0 || /K/.test(trd.chuoi) || trd.chuoi.length >= 4) trd.chuoi = '';
            trd.chuoi += 'J'; trd.chuoiT = GIAO_CS;
            let n = trd.chuoi.length;
            if (n <= 2){
                // @@HE-TRIDENT3: VUNG NGANG kieu GAY — quay quanh truc dung, quet ca vong quanh nguoi
                ng._giaoDanh(2, 14, 0, 30, 20, 20, 'trdvung', 140);            // VUNG NGANG — 2
                trd.vung = { t: 0, T: 16, d: ng.isFacingLeft ? -1 : 1, k: n };
            } else if (n === 3){
                ng._giaoDanh(4, 12, 200, 8, 8, 22, 'choc');                   // CHOC — 4, xien muc tieu tren luoi
                let d = ng.isFacingLeft ? -1 : 1, cx = ng.x + ng.w / 2;
                trd.xien = [];
                trdHop(Math.min(cx, cx + d * 210), ng.y - 10, Math.max(cx, cx + d * 210), ng.y + ng.h + 10, 0, null, o => trd.xien.push(o));
            } else {
                ng._giaoDanh(4, 12, 210, 8, 8, 30, 'choc2');                  // CHOC lan hai — 4, het chuoi
            }
            ng._giaoNhanh = 0;
            ng.clawRiseWindow = 38;                                           // NHAY ngay sau J van ra HAT LEN cua Giao
            return true;
        }
// PLAYER_PART_END s4.trdJ.1

// index.html:57347 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdK.1 EDITABLE
function trdK(ng, hg, og){
            if (!trd) trd = trdMoi();
            if (trd.ch){ trdChNha(ng); return true; }
            if (trd.ult || trd.I || trd.viec) return true;
            // --- K boi vao chuoi J ---
            if (hg < 15 && trd.chuoiT > 0 && trd.chuoi && ng.grounded && !ng.isOverheated && ng.ammo > 0){
                let s = trd.chuoi, d = ng.isFacingLeft ? -1 : 1;
                trdBoNhanhGiao(ng);
                if (s === 'J'){                                                 // J K : XOAY NGUOI HAT TUNG
                    ng._giaoDanh(4, 18, 160, 80, 24, 24, 'hat');
                    let cx = ng.x + ng.w / 2;
                    trd.hat = [];
                    trdHop(Math.min(cx - 50, cx + d * 170), ng.y - 70, Math.max(cx + 50, cx + d * 170), ng.y + ng.h + 10, 0, null,
                           o => { trd.hat.push(o); if (typeof wkgHatTung === 'function') wkgHatTung(o, 120); });
                    floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 34, "HẤT TUNG!"));
                    trd.chuoi = 'JK'; trd.chuoiT = GIAO_CS; return true;
                }
                if (s === 'JK'){                                                // J K K : NHAY LEN CHEM XUONG
                    ng.dy = -13; ng.grounded = false;
                    trd.viec = { loai: 'chemxuong', t: 0, d };
                    trd.chuoi = ''; return true;
                }
                if (s === 'JJ'){                                                // J J K : DAM XUYEN vut ra sau lung
                    ng.ammo = Math.max(0, ng.ammo - 1);
                    ng._giaoVeDat('luot', 220, 14);
                    trd.viec = { loai: 'xuyen', t: 0, d, hit: new Set() };
                    ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 16);
                    trd.chuoi = 'JJK'; trd.chuoiT = GIAO_CS; return true;
                }
                if (s === 'JJK'){                                               // J J K K : DAM XUYEN NGUOC LAI lan nua
                    let m = trdGan(ng, 1)[0];
                    if (m) ng.isFacingLeft = (m.x + (m.w || 20) / 2) < (ng.x + ng.w / 2);
                    let d2 = ng.isFacingLeft ? -1 : 1;
                    ng.ammo = Math.max(0, ng.ammo - 1);
                    ng._giaoVeDat('luot', 220, 14);
                    trd.viec = { loai: 'xuyen', t: 0, d: d2, hit: new Set(), lan: 2 };
                    ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 16);
                    trd.chuoi = ''; return true;
                }
                if (s === 'JJJ'){                                               // J J J K : NHAC LEN roi VUNG HAT BAY
                    ng.ammo = Math.max(0, ng.ammo - 1);
                    ng._giaoVeDat('hat', 180, 14);
                    trd.viec = { loai: 'hat', t: 0, d, muc: trd.xien.slice() };
                    trd.chuoi = ''; return true;
                }
            }
            if (!ng.grounded) return false;                                     // tren khong: van la Giao
            if (hg < 15 && (keys['KeyS'] || keys['ArrowDown'])) return false;   // S + K cua Giao
            if (hg < 15 && (ng._giaoCS || 0) > 0 && ng._giaoNhanh && !trd.chuoi) return false;   // nhanh rieng cua Giao (cui J / luot J)
            trd.chuoi = '';
            trdBoNhanhGiao(ng);
            if (!og) return true;
            let d = ng.isFacingLeft ? -1 : 1, cx = ng.x + ng.w / 2, cy = ng.y + ng.h * 0.52;
            if (hg < 30){                                                       // CHAM K: choc + GIAO KHI hinh dinh ba
                ng._giaoDanh(4, 14, 250, 10, 10, 24, 'choc');
                trdFx({ loai: 'khi', x: cx + d * 30, y: cy, d, t: 0, T: 16, L: 250 * ng.getFormScale() });
                return true;
            }
            if (hg < 60){                                                       // CHOC LIEN HOAN
                let n = Math.min(5, 3 + Math.floor((hg - 30) / 10));
                trd.lien = { n, k: 0, t: 0, d, ds: [] };
                ng.ammo = Math.max(0, ng.ammo - 1); ng.attackCooldown = 6 * n + 10;
                floatingTexts.push(new FloatingText(ng.x - 26, ng.y - 34, "LIÊN HOÀN THƯƠNG!"));
                return true;
            }
            if (hg < 105){                                                      // VUNG LEN + COT NUOC (+ DAM + SONG)
                ng._giaoDanh(3, 16, 170, 60, 20, 34, 'hat');
                let n = Math.min(5, 3 + Math.floor((hg - 60) / 15));
                for (let i = 0; i < n; i++)
                    trd.cot.push({ x: cx + d * (90 + i * 72), t: -i * 6, bao: 10, hit: new Set() });
                if (hg >= 90) trd.viec = { loai: 'damsong', t: 0, d };
                floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 34, hg >= 90 ? "CỘT NƯỚC · SÓNG!" : "CỘT NƯỚC!"));
                return true;
            }
            if (hg < 150){                                                      // NEM DINH BA — TACH 3 GIAO
                ng.ammo = Math.max(0, ng.ammo - 1); ng.attackCooldown = 40;
                trd.tayKhong = 110;                                             // @@HE-TRIDENT3: bo cu vung thua — dinh ba bay thang len
                // DINH BA LO LUNG TREN DAU roi TACH 3, moi mui NEM CHEO XUONG (xem trdTickNoi)
                trd.noi = { x: cx, y: ng.y - 40, t: 0, d, cau: hg >= 135, ds: trdGan(ng, 3) };
                floatingTexts.push(new FloatingText(ng.x - 24, ng.y - 34, hg >= 135 ? "TAM XOA · THỦY CẦU!" : "TAM XOA GIÁNG!"));
                return true;
            }
            // 2.5–3s : NGUC NUOC duoi chan ke dich
            ng.ammo = Math.max(0, ng.ammo - 1); ng.attackCooldown = 34;
            ng._giaoVeDat('hat', 180, 16);
            let ds = trdGan(ng, 3);
            if (!ds.length) ds = [];
            for (let o of ds) trd.nguc.push({ o, t: -12, hit: 0 });
            floatingTexts.push(new FloatingText(ng.x - 24, ng.y - 34, "THỦY LAO!"));
            return true;
        }
// PLAYER_PART_END s4.trdK.1

// index.html:57440 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdChBat.1 EDITABLE
function trdChBat(ng){
            if (!trd) trd = trdMoi();
            if (trd.ch) return;
            trd.ch = { t: 0, cd: new Map(), cao: 4 * TRD_CM };
            floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 36, "CƯỠI SÓNG!"));
        }
// PLAYER_PART_END s4.trdChBat.1

// index.html:57446 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdChNha.1 EDITABLE
function trdChNha(ng){ if (trd) trd.ch = null; }
// PLAYER_PART_END s4.trdChNha.1

// index.html:57448 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdNhay.1 EDITABLE
function trdNhay(){
            if (!trd || !trd.ch || !trdBat()) return false;
            trd.ch.cao = Math.min(5 * TRD_CM, trd.ch.cao + 80);
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(420, 0.1, 'sine', 0.14, 700);
            return true;
        }
// PLAYER_PART_END s4.trdNhay.1

// index.html:57456 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdPhimIO.1 EDITABLE
function trdPhimIO(code){
            if (!trd) trd = trdMoi();
            let ng = dino; if (!ng) return;
            if (code === 'KeyI'){
                if (trd.I || trd.Icd > 0 || trd.ult || trd.ch) return;
                trd.I = { t: 0, d: ng.isFacingLeft ? -1 : 1, hit: new Set(), x0: ng.x };
                return;
            }
            // O — hao quang
            if (trd.nac <= 0){ floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 30, "CHƯA ĐỦ NẤC")); return; }
            if (trd.cong >= TRD_NAC_MAX){ trd.congT = TRD_HAO_T; floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 30, "MUSOU TỐI ĐA")); return; }
            trd.nac--; trd.cong++; trd.congT = TRD_HAO_T;
            floatingTexts.push(new FloatingText(ng.x - 26, ng.y - 38, "MUSOU +" + trd.cong));
            shakeTimer = Math.max(shakeTimer || 0, 8);
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(220 + trd.cong * 90, 0.2, 'sawtooth', 0.2, 600);
        }
// PLAYER_PART_END s4.trdPhimIO.1

// index.html:57474 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdUltBat.1 EDITABLE
function trdUltBat(ng){
            if (!trd) trd = trdMoi();
            if (trd.ult) return false;
            trd.ch = null;
            trd.ult = { t: 0, d: ng.isFacingLeft ? -1 : 1, x: ng.x + ng.w / 2, p: null };
            ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 170);
            return true;
        }
// PLAYER_PART_END s4.trdUltBat.1

// index.html:57484 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTick.1 EDITABLE
function trdTick(){
            if (typeof dino === 'undefined' || !dino) return;
            if (!trd) trd = trdMoi();
            if (!trdBat()){ if (trd.ch || trd.ult || trd.cong) trdReset(); return; }
            let ng = dino;
            if (trd.chuoiT > 0) trd.chuoiT--; else trd.chuoi = '';
            if (trd.Icd > 0) trd.Icd--;
            if (trd.vung && ++trd.vung.t > trd.vung.T) trd.vung = null;
            if (trd.tayKhong > 0) trd.tayKhong--;
            if (trd.congT > 0){ trd.congT--; if (trd.congT <= 0){ trd.cong = 0; floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 30, "HẾT MUSOU")); } }
            // THANH MUSOU: do sat thuong gay ra bang MAU mat cua moi muc tieu
            let moi = new Map();
            for (let o of trdDs()){
                let cu = trd.hpCu.get(o);
                if (cu !== undefined && o.hp < cu && cu - o.hp < 400) trd.dem += cu - o.hp;
                moi.set(o, o.hp);
            }
            trd.hpCu = moi;
            while (trd.dem >= TRD_NAC_DMG && trd.nac < TRD_NAC_MAX){
                trd.dem -= TRD_NAC_DMG; trd.nac++;
                floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 44, "NẤC MUSOU " + trd.nac));
            }
            if (trd.nac >= TRD_NAC_MAX) trd.dem = Math.min(trd.dem, TRD_NAC_DMG);
            trdTickI(ng); trdTickViec(ng); trdTickLien(ng); trdTickCot(); trdTickSong();
            trdTickNoi(ng); trdTickGiao(); trdTickCau(); trdTickNguc(); trdTickCh(ng); trdTickUlt(ng);
            for (let i = trd.fx.length - 1; i >= 0; i--){ trd.fx[i].t++; if (trd.fx[i].t > trd.fx[i].T) trd.fx.splice(i, 1); }
        }
// PLAYER_PART_END s4.trdTick.1

// index.html:57511 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickI.1 EDITABLE
function trdTickI(ng){
            let I = trd.I; if (!I) return;
            I.t++;
            ng.attackCooldown = Math.max(ng.attackCooldown || 0, 2);
            if (I.t <= 12){ dashVx = 0; return; }                               // TU LUC 0.2 giay
            if (I.t === 13){ ng._giaoVeDat('luot', 240, 12); I.x0 = ng.x + ng.w / 2; if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1200, 0.12, 'sawtooth', 0.18, 300); }
            if (I.t <= 24){
                ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 4);   // BAT TU luc dam
                dashVx = I.d * 22;
                let cx = ng.x + ng.w / 2, tip = cx + I.d * 70 * ng.getFormScale();
                trdHop(Math.min(I.x0, tip), ng.y - 6, Math.max(I.x0, tip), ng.y + ng.h + 6, 6, I.hit);
                return;
            }
            if (I.t > 30){ trd.I = null; trd.Icd = TRD_I_CD; dashVx = 0; }   // du van toc cu dam khong duoc tinh la LUOT (-> don luot cua Giao)
        }
// PLAYER_PART_END s4.trdTickI.1

// index.html:57526 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickViec.1 EDITABLE
function trdTickViec(ng){
            let V = trd.viec; if (!V) return;
            V.t++;
            if (V.loai === 'chemxuong'){
                let m = trd.hat && trd.hat[0];
                if (m && m.hp > 0) ng.x += Math.max(-8, Math.min(8, (m.x + (m.w || 20) / 2) - (ng.x + ng.w / 2) - V.d * 30) * 0.2);
                if (V.t === 12){
                    ng._giaoDanh(4, 16, 170, 30, 90, 24, 'bo');
                    ng.dy = Math.max(ng.dy, 10);
                    if (typeof slamLaoBat === 'function') slamLaoBat(ng);   // @@HE-SLAMLAO
                    for (let o of (trd.hat || [])) if (o && o._wkgHat) o._wkgHat.v = 14;   // ep roi nhanh
                    floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 34, "TRẢM ĐỊA!"));
                }
                if (V.t > 12 && ng.grounded){ shakeTimer = Math.max(shakeTimer || 0, 14); visualEffects.push(new Effect(ng.x + ng.w / 2 + V.d * 60, 314, 'explosion', true, 34)); trd.viec = null; }
                else if (V.t > 60) trd.viec = null;
                return;
            }
            if (V.loai === 'xuyen'){
                if (V.t <= 11){
                    ng.x = Math.max(worldL(), Math.min(worldR() - ng.w, ng.x + V.d * 22));
                    ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 4);
                    trdHop(ng.x - 40 + Math.min(0, V.d) * 70, ng.y - 6, ng.x + ng.w + 40 + Math.max(0, V.d) * 70, ng.y + ng.h + 6, 4, V.hit);
                    if (V.t % 2 === 0) trdFx({ loai: 'vet', x: ng.x + ng.w / 2, y: ng.y + ng.h * 0.5, t: 0, T: 12 });
                    ng.attackCooldown = Math.max(ng.attackCooldown || 0, 4);
                    return;
                }
                if (V.t === 12){ ng.isFacingLeft = V.d > 0; floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 34, V.lan === 2 ? "HỒI XUYÊN!" : "XUYÊN TÂM!")); }
                if (V.t > 16) trd.viec = null;
                return;
            }
            if (V.loai === 'hat'){
                // giu ke dich tren luoi, NHAC nhe len, roi VUNG MANH hat bay
                let tip = ng.x + ng.w / 2 + V.d * 150;
                if (V.t < 14){
                    for (let o of V.muc) if (o && o.hp > 0){ o.x += (tip - (o.x + (o.w || 20) / 2)) * 0.25; if (V.t === 2 && typeof wkgHatTung === 'function') wkgHatTung(o, 40); }
                    return;
                }
                if (V.t === 14){
                    ng._giaoVeDat('trdvung', 200, 14);
                    let ds = V.muc.filter(o => o && o.hp > 0);
                    if (!ds.length){ let cx = ng.x + ng.w / 2; trdHop(Math.min(cx, cx + V.d * 190), ng.y - 30, Math.max(cx, cx + V.d * 190), ng.y + ng.h + 10, 0, null, o => ds.push(o)); }
                    for (let o of ds){ trdDanhVat(o, 4); trdDay(o, V.d * 24, 30); }
                    floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 34, "HẤT BAY!"));
                    shakeTimer = Math.max(shakeTimer || 0, 10);
                }
                if (V.t > 24) trd.viec = null;
                return;
            }
            if (V.loai === 'damsong'){
                if (V.t === 30){
                    ng._giaoDanh(4, 14, 200, 10, 10, 26, 'choc', 0, 0);
                    trd.song.push({ x: ng.x + ng.w / 2 + V.d * 60, d: V.d, t: 0, h: 30, hit: new Set() });
                }
                if (V.t > 34) trd.viec = null;
            }
        }
// PLAYER_PART_END s4.trdTickViec.1

// index.html:57582 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickLien.1 EDITABLE
function trdTickLien(ng){
            let L = trd.lien; if (!L) return;
            L.t++;
            if (L.t % 5 === 1 && L.k < L.n){
                let goc = (L.k % 2 ? 1 : -1) * (0.12 + 0.1 * Math.floor(L.k / 2)) + (L.k === 0 ? 0.12 : 0);
                let cx = ng.x + ng.w / 2 + L.d * 24, cy = ng.y + ng.h * 0.5, dai = 230 * ng.getFormScale();
                let ex = cx + L.d * Math.cos(goc) * dai, ey = cy + Math.sin(goc) * dai;
                trdDoan(cx, cy, ex, ey, 8, 3, new Set());
                trdFx({ loai: 'gai', x0: cx, y0: cy, x1: ex, y1: ey, t: 0, T: 10 });
                ng._giaoVeDat(L.k % 2 ? 'choc2' : 'choc', 200, 5);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900 + L.k * 60, 0.04, 'square', 0.1, 1500);
                L.k++;
            }
            if (L.k >= L.n && L.t > L.n * 5 + 6) trd.lien = null;
        }
// PLAYER_PART_END s4.trdTickLien.1

// index.html:57597 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickCot.1 EDITABLE
function trdTickCot(){
            for (let i = trd.cot.length - 1; i >= 0; i--){
                let C = trd.cot[i]; C.t++;
                if (C.t > C.bao && C.t <= C.bao + 18) trdHop(C.x - 26, 320 - 200, C.x + 26, 330, 3, C.hit);
                if (C.t === C.bao + 1) shakeTimer = Math.max(shakeTimer || 0, 4);
                if (C.t > C.bao + 24) trd.cot.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.trdTickCot.1

// index.html:57605 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickSong.1 EDITABLE
function trdTickSong(){
            for (let i = trd.song.length - 1; i >= 0; i--){
                let S = trd.song[i]; S.t++;
                S.x += S.d * 7; S.h = Math.min(110, 30 + S.t * 1.6);
                trdHop(S.x - 30, 320 - S.h, S.x + 30, 330, 3, S.hit, o => trdDay(o, S.d * 8, 14));
                if (S.t > 60 || S.x < worldL() - 60 || S.x > worldR() + 60) trd.song.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.trdTickSong.1

// index.html:57614 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickNoi.1 EDITABLE
function trdTickNoi(ng){
            let N = trd.noi; if (!N) return;
            N.t++;
            N.x += ((ng.x + ng.w / 2) - N.x) * 0.2;
            N.y += ((ng.y - 110) - N.y) * 0.18;
            if (N.t === 26){
                for (let i = 0; i < 3; i++){
                    let o = N.ds.length ? N.ds[i % N.ds.length] : null;
                    trd.giao.push({ o, x: N.x + (i - 1) * 46, y: N.y - 6 - Math.abs(i - 1) * 8, t: -4 - i * 7, vx: 0, vy: 0, hit: false, cam: false,
                                    fx: N.x + N.d * (170 + i * 80), fy: 312, goc: Math.PI / 2, hs: new Set() });
                }
                trdFx({ loai: 'tach', x: N.x, y: N.y, t: 0, T: 14 });
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1300, 0.1, 'triangle', 0.14, 600);
                if (N.cau) trd.cau.push({ x: ng.x + ng.w / 2 + N.d * 24, y: ng.y + ng.h * 0.5, d: N.d, t: -12, hit: false });   // CHUONG thuy cau
                trd.noi = null;
            }
        }
// PLAYER_PART_END s4.trdTickNoi.1

// index.html:57631 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickGiao.1 EDITABLE
function trdTickGiao(){
            for (let i = trd.giao.length - 1; i >= 0; i--){
                let G = trd.giao[i]; G.t++;
                let tx = G.fx, ty = G.fy;
                if (G.o && G.o.hp > 0){ tx = G.o.x + (G.o.w || 20) / 2; ty = G.o.y + (G.o.h || 20) * 0.45; }
                if (G.t < 0){ G.goc = Math.atan2(ty - G.y, tx - G.x); continue; }       // lo lung, mui chia vao muc tieu
                if (G.t === 0){                                                          // NEM CHEO XUONG
                    let dx = tx - G.x, dy = Math.max(40, ty - G.y), l = Math.hypot(dx, dy) || 1;
                    G.vx = dx / l * 24; G.vy = dy / l * 24; G.goc = Math.atan2(G.vy, G.vx);
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900, 0.06, 'sawtooth', 0.12, 300);
                }
                if (!G.cam){
                    G.x += G.vx; G.y += G.vy;
                    let tipX = G.x + Math.cos(G.goc) * 30, tipY = G.y + Math.sin(G.goc) * 30;
                    if (!G.hit && trdHop(tipX - 22, tipY - 22, tipX + 22, tipY + 22, 6, G.hs)){
                        G.hit = true; G.cam = true;
                        visualEffects.push(new Effect(tipX, tipY, 'explosion', true, 28));
                        shakeTimer = Math.max(shakeTimer || 0, 8);
                    } else if (tipY >= 316 || G.t > 60){
                        G.cam = true; G.camT = G.t;
                        visualEffects.push(new Effect(tipX, 314, 'explosion', true, 20));
                    }
                    if (G.cam) G.camT = G.t;
                }
                if (G.cam && G.t > (G.camT || 0) + 30) trd.giao.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.trdTickGiao.1

// index.html:57658 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickCau.1 EDITABLE
function trdTickCau(){
            for (let i = trd.cau.length - 1; i >= 0; i--){
                let C = trd.cau[i]; C.t++;
                if (C.t < 0) continue;
                C.x += C.d * 11;
                if (!C.hit){
                    let n = trdHop(C.x - 22, C.y - 22, C.x + 22, C.y + 22, 5, null);
                    if (n){ C.hit = true; visualEffects.push(new Effect(C.x, C.y, 'explosion', true, 40)); }
                }
                if (C.hit || C.x < worldL() - 40 || C.x > worldR() + 40) trd.cau.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.trdTickCau.1

// index.html:57670 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickNguc.1 EDITABLE
function trdTickNguc(){
            for (let i = trd.nguc.length - 1; i >= 0; i--){
                let N = trd.nguc[i]; N.t++;
                let o = N.o;
                if (!o || o.hp === undefined || o.hp <= 0 || o.dying){ trd.nguc.splice(i, 1); continue; }
                if (N.t === 0 && typeof venKhoa === 'function') venKhoa(o, 90);         // khoa 1.5 giay
                if (N.t >= 0 && N.t % 30 === 0 && N.hit < 3){ N.hit++; trdDanhVat(o, 2); }
                if (N.t > 90) trd.nguc.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.trdTickNguc.1

// index.html:57680 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickCh.1 EDITABLE
function trdTickCh(ng){
            let C = trd.ch; if (!C) return;
            C.t++;
            if (!keys['KeyK']){ trd.ch = null; return; }
            let cx = ng.x + ng.w / 2, day = ng.y + ng.h;
            for (let o of trdDs()){
                let _d = ng.isFacingLeft ? -1 : 1, _x0 = Math.min(cx - _d * 220, cx + _d * 120), _x1 = Math.max(cx - _d * 220, cx + _d * 120);
                if (o.x + (o.w || 20) < _x0 || o.x > _x1 || o.y + (o.h || 20) < day - 10) continue;
                let cd = C.cd.get(o) || 0;
                if (frames - cd < 30) continue;
                C.cd.set(o, frames); trdDanhVat(o, 4);
            }
        }
// PLAYER_PART_END s4.trdTickCh.1

// index.html:57696 · Phạm vi: global
// PLAYER_PART_BEGIN s4.TRD_HT_SC.1 EDITABLE
const TRD_HT_SC = 2.1, TRD_ULT_NEM = 60, TRD_ULT_DAT = 316;
// PLAYER_PART_END s4.TRD_HT_SC.1

// index.html:57698 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdUltBui.1 EDITABLE
function trdUltBui(P, d, n){
            if (!P.bui) P.bui = [];
            for (let i = 0; i < n && P.bui.length < 90; i++)
                P.bui.push({ x: P.x + (Math.random() - 0.5) * 16, y: 318, vx: -d * (1 + Math.random() * 4), vy: -3 - Math.random() * 6, t: 0, T: 22 + Math.random() * 14, r: 2 + Math.random() * 3 });
        }
// PLAYER_PART_END s4.trdUltBui.1

// index.html:57703 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdUltBuiTick.1 EDITABLE
function trdUltBuiTick(P){
            for (let i = P.bui.length - 1; i >= 0; i--){
                let b = P.bui[i]; b.x += b.vx; b.y += b.vy; b.vy += 0.45; b.t++;
                if (b.t >= b.T || b.y > 324) P.bui.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.trdUltBuiTick.1

// index.html:57710 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdHaiThanX.1 EDITABLE
function trdHaiThanX(U, ng){
            let c0 = (typeof camX !== 'undefined' ? camX : 0);
            return Math.max(c0 + 130, Math.min(c0 + canvas.width - 130, ng.x + ng.w / 2 - U.d * 90));
        }
// PLAYER_PART_END s4.trdHaiThanX.1

// index.html:57714 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTayHaiThan.1 EDITABLE
function trdTayHaiThan(U, ng){
            let bx = trdHaiThanX(U, ng), u = U.t < TRD_ULT_NEM ? Math.min(1, U.t / 44) : 1;
            let goc = U.t < TRD_ULT_NEM ? -0.4 - 1.6 * u : 0.3;
            let lx = 24 + Math.cos(goc - 1.2) * 60, ly = -140 + Math.sin(goc - 1.2) * 60;
            return { x: bx + U.d * lx * TRD_HT_SC, y: 320 + ly * TRD_HT_SC, goc };
        }
// PLAYER_PART_END s4.trdTayHaiThan.1

// index.html:57720 · Phạm vi: global
// PLAYER_PART_BEGIN s4.trdTickUlt.1 EDITABLE
function trdTickUlt(ng){
            let U = trd.ult; if (!U) return;
            U.t++;
            ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 10);
            ng.attackCooldown = Math.max(ng.attackCooldown || 0, 4);
            dashVx = 0;
            if (U.t % 34 === 12) shakeTimer = Math.max(shakeTimer || 0, 8);           // sam
            if (U.t === TRD_ULT_NEM){
                let H = trdTayHaiThan(U, ng);
                let ds = trdDs().filter(o => ((o.x + (o.w || 20) / 2) - (ng.x + ng.w / 2)) * U.d > -20);
                if (!ds.length) ds = trdDs();
                ds.sort((p, q) => Math.abs(p.x - ng.x) - Math.abs(q.x - ng.x));
                let m = ds[0], tx = m ? m.x + (m.w || 20) / 2 : ng.x + ng.w / 2 + U.d * 420, ty = m ? m.y + (m.h || 20) * 0.5 : 300;
                let dx = tx - H.x, dy = Math.max(60, ty - H.y), l = Math.hypot(dx, dy) || 1;
                U.p = { x: H.x, y: H.y, vx: dx / l * 30, vy: dy / l * 30, pha: 'bay', hit: new Set(), dinh: null, goc: Math.atan2(dy, dx), huong: dx < 0 ? -1 : 1 };   // huong: CAY theo dung chieu mui dang chi (muc tieu co the o sau lung)
                shakeTimer = Math.max(shakeTimer || 0, 26);
                floatingTexts.push(new FloatingText(ng.x - 40, ng.y - 50, "HẢI THẦN PHÓNG THƯƠNG!"));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(140, 0.6, 'sawtooth', 0.3, 60); SFX.tone(1800, 0.3, 'triangle', 0.18, 900); }
            }
            let P = U.p;
            if (P && !P.xong){
                P.x += P.vx; P.y += P.vy;
                let L = worldL(), R = worldR();
                let tipX = P.x, tipY = P.y;
                for (let o of trdDs()){
                    if (P.hit.has(o)) continue;
                    if (tipX < o.x - 40 || tipX > o.x + (o.w || 20) + 40 || tipY < o.y - 40 || tipY > o.y + (o.h || 20) + 40) continue;
                    P.hit.add(o);
                    if (!P.dinh && bosses.indexOf(o) >= 0) P.dinh = o; else { trdDanhVat(o, 100); if (typeof venKhoa === 'function') venKhoa(o, 120); }
                }
                /* @@HE-TRIDENT4 — Hans: "cam cheo dung huong no dam thay vi tao mot Effect moi nam ngang".
                   Ngon dinh ba GIU NGUYEN GOC NEM (P.goc) tu dau toi cuoi: xuyen muc tieu, mang no di
                   tiep theo duong cheo toi khi mui cam xuong dat, roi CAY (mui van cam duoi dat, than
                   van nghieng cheo) keo muc tieu toi cuoi map va cam lai o do — khong xoay nam ngang. */
                if (P.pha === 'bay' && P.y >= TRD_ULT_DAT){
                    P.pha = 'truot'; P.y = TRD_ULT_DAT; P.vx = P.huong * 26; P.vy = 0;
                    visualEffects.push(new Effect(P.x, P.y, 'explosion', true, 60));
                    shakeTimer = Math.max(shakeTimer || 0, 20);
                }
                if (P.pha === 'truot' && frames % 2 === 0) trdUltBui(P, P.huong, 3);
                if (P.dinh && P.dinh.hp > 0){
                    P.dinh.x = P.huong > 0 ? Math.min(R - (P.dinh.w || 20) - 4, P.x - (P.dinh.w || 20) * 0.3) : Math.max(L + 4, P.x - (P.dinh.w || 20) * 0.7);
                    // muc tieu bi XIEN tren mui: di theo mui ca chieu doc (ke ca boss bay bi keo xuong dat)
                    let hh = P.dinh.h || 40; P.dinh.y = Math.min(320 - hh, P.y - hh * 0.6);
                }
                if (P.x > R - 10 || P.x < L + 10){
                    P.xong = true; P.x = Math.max(L + 10, Math.min(R - 10, P.x));   // con tren khong thi GHIM vao mep map ngay tai do (khong dich y)
                    if (P.dinh){ trdDanhVat(P.dinh, 100); if (typeof venKhoa === 'function') venKhoa(P.dinh, 120); floatingTexts.push(new FloatingText(P.x - 40, P.y - 60, "GHIM!")); }
                    shakeTimer = Math.max(shakeTimer || 0, 40);
                    // no toe DOC THEO THAN dinh ba (nguoc huong nem), khong con mot hang ngang
                    for (let q = 0; q < 5; q++) visualEffects.push(new Effect(P.x - Math.cos(P.goc) * q * 34, P.y - Math.sin(P.goc) * q * 34, 'explosion', true, 60));
                    if (P.pha === 'truot') trdUltBui(P, P.huong, 14);
                    U.xongT = U.t;
                }
                if (P.bui) trdUltBuiTick(P);
            }
            if (U.xongT && U.t > U.xongT + 40) trd.ult = null;
            if (U.t > 280) trd.ult = null;
        }
// PLAYER_PART_END s4.trdTickUlt.1
