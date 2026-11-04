// PLAYER_FILE: PULSE
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, Projectile, SFX, allTargets, bossProjectiles, bosses, checkAABB, ctx, currentAmmoType, damageBossFromAmmo, damageBossWithFirstStrike, dealDamage, dino, dino2, doChieuThu, floatingTexts, frames, gameState, infVeVan, obstacles, overchargeT, p2AmmoType, projectiles, pvpDich, pvpNguoi1, pvpVoBoc, shakeTimer, ultCharge, visualEffects, vkDangKy, worldL, worldR
// index.html:48864 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PULSE_NL_NAP.1 EDITABLE
const PULSE_NL_NAP  = { thuong: 2, cuoi: 4, to: 4, xuyen: 6 };
// PLAYER_PART_END s4.PULSE_NL_NAP.1

// index.html:48865 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PULSE_NL_TON.1 EDITABLE
const PULSE_NL_TON  = { thuong: 5, to: 10, xuyen: 10, toa: 20 };
// PLAYER_PART_END s4.PULSE_NL_TON.1

// index.html:48867 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PULSE_NL_HS.1 EDITABLE
let PULSE_NL_HS = 2;
// PLAYER_PART_END s4.PULSE_NL_HS.1

// index.html:48870 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PULSE_SAC_THEM.1 EDITABLE
var PULSE_SAC_THEM = 1;
// PLAYER_PART_END s4.PULSE_SAC_THEM.1

// index.html:48871 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PULSE_LZ_TON.1 EDITABLE
const PULSE_LZ_TON  = 20;
// PLAYER_PART_END s4.PULSE_LZ_TON.1

// index.html:48872 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PULSE_SET_DAI.1 EDITABLE
const PULSE_SET_DAI = 240;
// PLAYER_PART_END s4.PULSE_SET_DAI.1

// index.html:48873 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PULSE_SET_NHIP.1 EDITABLE
const PULSE_SET_NHIP = 30;
// PLAYER_PART_END s4.PULSE_SET_NHIP.1

// index.html:48874 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PULSE_SET_MAX.1 EDITABLE
const PULSE_SET_MAX = 10;
// PLAYER_PART_END s4.PULSE_SET_MAX.1

// index.html:48875 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseSetVung.1 EDITABLE
let pulseSetVung = [];
// PLAYER_PART_END s4.pulseSetVung.1

// index.html:48876 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseNap.1 EDITABLE
function pulseNap(ng, loai){
            if (!ng || ng.pulseTang) return;
            let g = loai === 'toa' ? 10 + Math.floor(Math.random() * 3) : (PULSE_NL_NAP[loai] || 0);
            g *= PULSE_NL_HS;   // @@HE-PULSE-ST2
            ng.pulseNL = Math.min(100, (ng.pulseNL || 0) + g);
            if (g > 0 && (ng._pulseQuet == null || frames - ng._pulseQuet > PULSE_QUET)) ng._pulseQuet = frames;   // @@HE-PULSE-VE: quet mach
            if (ng.pulseNL >= 100){
                ng.pulseTang = true;
                floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 40, "SIÊU TẢI!"));
                visualEffects.push(new Effect(ng.x + ng.w / 2, ng.y + ng.h / 2, 'lightning_shock', true, 44));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(660, 0.14, 'square', 0.18, 1320); SFX.tone(1320, 0.2, 'sawtooth', 0.12, 1980); }
            }
        }
// PLAYER_PART_END s4.pulseNap.1

// index.html:48890 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseDung.1 EDITABLE
function pulseDung(ng, loai){
            if (!ng || !ng.pulseTang) return false;
            ng.pulseNL = Math.max(0, (ng.pulseNL || 0) - (PULSE_NL_TON[loai] || 0));
            if (ng.pulseNL <= 0 && !ng.pulseLaserChannel) ng.pulseTang = false;
            return true;
        }
// PLAYER_PART_END s4.pulseDung.1

// index.html:48896 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseCuongHoa.1 EDITABLE
function pulseCuongHoa(n0, loai){
            for (let i = n0; i < projectiles.length; i++){
                let p = projectiles[i]; if (!p) continue;
                p.pulseSieu = loai;
                let cx = p.x + p.w / 2, cy = p.y + p.h / 2;
                if (loai === 'thuong'){ p.w *= 1.35; p.h *= 1.6; }
                else if (loai === 'to'){ p.w *= 1.35; p.h *= 1.35; p.pulseNo = 2; }
                else if (loai === 'xuyen'){ p.w *= 2.3; p.h *= 0.55; p.speed *= 1.5; }
                p.x = cx - p.w / 2; p.y = cy - p.h / 2;
            }
        }
// PLAYER_PART_END s4.pulseCuongHoa.1

// index.html:48907 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseVienCuoi.1 EDITABLE
function pulseVienCuoi(n0, st){
            for (let i = n0; i < projectiles.length; i++){
                let p = projectiles[i]; if (!p) continue;
                let cx = p.x + p.w / 2, cy = p.y + p.h / 2;
                p.pulseSieu = st ? 'cuoiST' : 'cuoi';
                p.w *= st ? 2.1 : 1.6; p.h *= st ? 2.5 : 1.9;
                p.pierceCount = st ? 99 : 1;                  // thuong: xuyen 1 than · Sieu Tai: xuyen tat ca
                p.x = cx - p.w / 2; p.y = cy - p.h / 2;
            }
        }
// PLAYER_PART_END s4.pulseVienCuoi.1

// index.html:48917 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseVungDanh.1 EDITABLE
function pulseVungDanh(x, y, R, dmg, owner){
            let ar = { x: x - R, y: y - R, w: R * 2, h: R * 2 };
            if (gameState === 'pvp'){
                let dt = (typeof pvpDich === 'function') ? pvpDich(owner === 2 ? dino2 : pvpNguoi1()) : null;
                if (dt && checkAABB(ar, dt) && !dt.isShielding()) pvpVoBoc(dt).takeDamage(dmg);
                return;
            }
            obstacles.forEach(o => { if (checkAABB(ar, o)) o.hp -= dmg; });
            allTargets().forEach(e => { if (bosses.indexOf(e) < 0 && checkAABB(ar, e)) e.hp -= dmg; });
            bosses.forEach(b => { if (!b.invulnAll && checkAABB(ar, b)) damageBossWithFirstStrike(b, dmg); });
        }
// PLAYER_PART_END s4.pulseVungDanh.1

// index.html:48928 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseSetDat.1 EDITABLE
function pulseSetDat(x, y, r, owner){
            pulseSetVung.push({ x: x, y: y, r: r, t: 0, owner: owner || 1, pha: Math.random() * 9 });
            while (pulseSetVung.length > PULSE_SET_MAX) pulseSetVung.shift();
        }
// PLAYER_PART_END s4.pulseSetDat.1

// index.html:48933 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseSieuTrung.1 EDITABLE
function pulseSieuTrung(proj){
            if (!proj) return;
            let cx = proj.x + proj.w / 2, cy = proj.y + proj.h / 2;
            if (proj.pulseNo && !proj._pnDa){
                proj._pnDa = 1;
                visualEffects.push(new Effect(cx, cy, 'exp_blue', true, 40));   // Hans: no cua dan to van XANH
                pulseVungDanh(cx, cy, 46, proj.pulseNo, proj.owner);
            }
            if (proj._pulseSet && !proj._psDa){ proj._psDa = 1; pulseSetDat(cx, cy, 42, proj.owner); }
        }
// PLAYER_PART_END s4.pulseSieuTrung.1

// index.html:48943 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseSetTick.1 EDITABLE
function pulseSetTick(){
            for (let ng of [typeof dino !== 'undefined' ? dino : null, typeof dino2 !== 'undefined' ? dino2 : null]){
                if (!ng) continue;
                // laser Sieu Tai: 20 nang luong / giay, het van giu tia
                if (ng.pulseLaserChannel && ng.pulseLaserSieu) ng.pulseNL = Math.max(0, (ng.pulseNL || 0) - PULSE_LZ_TON / 60);
                if (ng.pulseTang && (ng.pulseNL || 0) <= 0 && !ng.pulseLaserChannel){ ng.pulseTang = false; ng.pulseLaserSieu = false; }
                if (ng.ammoType !== 0 && ng.pulseTang){ ng.pulseTang = false; ng.pulseNL = 0; }   // doi dan thi mat
            }
            for (let i = pulseSetVung.length - 1; i >= 0; i--){
                let V = pulseSetVung[i];
                if (++V.t > PULSE_SET_DAI){ pulseSetVung.splice(i, 1); continue; }
                const trong = o => {
                    let ox = Math.max(o.x, Math.min(V.x, o.x + (o.w || 20))), oy = Math.max(o.y, Math.min(V.y, o.y + (o.h || 20)));
                    return Math.hypot(ox - V.x, oy - V.y) <= V.r;
                };
                if (gameState === 'pvp'){
                    let dt = (typeof pvpDich === 'function') ? pvpDich(V.owner === 2 ? dino2 : pvpNguoi1()) : null;
                    if (dt && trong(dt) && frames - (dt._pulseSetT || -999) >= PULSE_SET_NHIP){
                        dt._pulseSetT = frames;
                        if (!dt.isShielding()) pvpVoBoc(dt).takeDamage(1);
                        visualEffects.push(new Effect(dt.x + dt.w / 2, dt.y + dt.h / 2, 'lightning_shock', true, 20));
                    }
                    continue;
                }
                for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0 || !trong(o)) continue;
                    if (frames - (o._pulseSetT || -999) < PULSE_SET_NHIP) continue;
                    o._pulseSetT = frames;
                    if (bosses.indexOf(o) >= 0) dealDamage(o, 1, 'flat'); else { o.hp -= 1; if (o.hp <= 0 && o.dead !== undefined) o.dead = true; }
                    visualEffects.push(new Effect(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, 'lightning_shock', true, 20));
                }
            }
        }
// PLAYER_PART_END s4.pulseSetTick.1

// index.html:48976 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseSetVe.1 EDITABLE
function pulseSetVe(){
            for (let V of pulseSetVung){
                let a = Math.min(1, (PULSE_SET_DAI - V.t) / 40);
                ctx.save();
                ctx.globalAlpha = 0.16 * a; ctx.fillStyle = "#4FC3F7";
                ctx.beginPath(); ctx.arc(V.x, V.y, V.r, 0, 6.28); ctx.fill();
                ctx.globalAlpha = 0.85 * a; ctx.lineWidth = 2;
                for (let k = 0; k < 3; k++){
                    ctx.strokeStyle = k ? "#81D4FA" : "#FFFFFF";
                    let g = V.pha + frames * 0.35 + k * 2.1, x = V.x + Math.cos(g) * V.r * 0.2, y = V.y + Math.sin(g) * V.r * 0.2;
                    ctx.beginPath(); ctx.moveTo(x, y);
                    for (let j = 1; j <= 4; j++){
                        let gg = g + j * 0.5 + Math.sin(frames * 0.9 + j + k) * 0.6, rr = V.r * (0.2 + 0.2 * j);
                        ctx.lineTo(V.x + Math.cos(gg) * rr, V.y + Math.sin(gg) * rr);
                    }
                    ctx.stroke();
                }
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.pulseSetVe.1

// index.html:49006 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseVeLiem.1 EDITABLE
function pulseVeLiem(Lx, Hy, mau){
            let cT = mau.c || "#00E5FF", cG = mau.b || "#4DD0E1", cS = mau.a || "#7C83FD";
            let R = Hy * 0.56, ox = -Hy * 0.22;
            ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            // quang
            ctx.fillStyle = mau.quang || "rgba(0,229,255,0.20)";
            ctx.beginPath(); ctx.ellipse(-Hy * 0.05, 0, Hy * 0.62, Hy * 0.55, 0, 0, 6.28); ctx.fill();
            // sau: duoi dien rang cua
            ctx.globalAlpha = 0.85; ctx.strokeStyle = cS; ctx.lineWidth = Math.max(1, Hy * 0.10);
            ctx.beginPath();
            for (let i = 0; i <= 6; i++){
                let y = -Hy * 0.36 + i * Hy * 0.12, x = -Hy * (i % 2 ? 0.78 : 0.56) + (Math.random() - 0.5) * Hy * 0.08;
                if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
            }
            ctx.stroke(); ctx.globalAlpha = 1;
            // giua: cung mong
            ctx.strokeStyle = cG; ctx.globalAlpha = 0.35; ctx.lineWidth = Hy * 0.30;
            ctx.beginPath(); ctx.arc(ox - Hy * 0.26, 0, R * 0.9, -1.0, 1.0); ctx.stroke();
            ctx.globalAlpha = 1; ctx.lineWidth = Hy * 0.12;
            ctx.beginPath(); ctx.arc(ox - Hy * 0.26, 0, R * 0.9, -1.0, 1.0); ctx.stroke();
            // truoc: cung sang day
            ctx.strokeStyle = cT; ctx.globalAlpha = 0.35; ctx.lineWidth = Hy * 0.42;
            ctx.beginPath(); ctx.arc(ox, 0, R, -1.15, 1.15); ctx.stroke();
            ctx.globalAlpha = 1; ctx.lineWidth = Hy * 0.20;
            ctx.beginPath(); ctx.arc(ox, 0, R, -1.15, 1.15); ctx.stroke();
            ctx.strokeStyle = mau.vien || "#E0FFFF"; ctx.lineWidth = Math.max(1, Hy * (mau.sang ? 0.09 : 0.06));
            ctx.beginPath(); ctx.arc(ox, 0, R, -0.95, 0.95); ctx.stroke();
            if (mau.sang){ ctx.fillStyle = "#FFFFFF"; ctx.beginPath(); ctx.arc(ox + R * 0.62, 0, Hy * 0.09, 0, 6.28); ctx.fill(); }
            ctx.restore();
        }
// PLAYER_PART_END s4.pulseVeLiem.1

// index.html:49036 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseVeVien.1 EDITABLE
function pulseVeVien(p){
            let cx = p.x + p.w / 2, cy = p.y + p.h / 2, L = p.pulseSieu;
            ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.atan2(p.vy || 0, p.speed || 1));
            let w = p.w, h = p.h;
            if (L === 'xuyen'){
                /* @@HE-PULSE-KHOAN — Hans: "vien xuyen hinh dang tong the chac giong mot MUI KHOAN
                   NHIEU LOP hon (Sieu Tai) thay vi trong nhu cai muong". Mui nhon ve phia truoc, ba
                   lop khoan chong nhau nho dan ve mui, ranh xoan chay lien tuc, vet nang luong keo sau. */
                let H = Math.max(h * 2.2, w * 0.42), X0 = -w / 2, X1 = w / 2;
                // vet keo sau
                ctx.fillStyle = "rgba(61,90,254,0.22)"; ctx.fillRect(X0 - w * 0.5, -H * 0.28, w * 0.9, H * 0.56);
                ctx.fillStyle = "rgba(140,158,255,0.45)"; ctx.fillRect(X0 - w * 0.3, -H * 0.1, w * 0.7, H * 0.2);
                // quang
                ctx.fillStyle = "rgba(61,90,254,0.25)";
                ctx.beginPath(); ctx.ellipse(w * 0.05, 0, w * 0.62, H * 0.75, 0, 0, 6.28); ctx.fill();
                // ba lop khoan: moi lop la mot hinh non, lop sau to nhat
                const LOP = [[X0, X0 + w * 0.55, 0.5, "#1A237E", "#303F9F"], [X0 + w * 0.28, X0 + w * 0.8, 0.38, "#283593", "#3D5AFE"], [X0 + w * 0.55, X1, 0.26, "#3949AB", "#8C9EFF"]];
                for (let [a, b, r, c1, c2] of LOP){
                    ctx.fillStyle = c1;
                    ctx.beginPath(); ctx.moveTo(a, -H * r); ctx.lineTo(b, 0); ctx.lineTo(a, H * r); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = c2;
                    ctx.beginPath(); ctx.moveTo(a + (b - a) * 0.12, -H * r * 0.55); ctx.lineTo(b - (b - a) * 0.05, 0); ctx.lineTo(a + (b - a) * 0.12, 0); ctx.closePath(); ctx.fill();
                }
                // ranh xoan chay doc mui
                ctx.strokeStyle = "rgba(232,234,255,0.9)"; ctx.lineWidth = Math.max(1, H * 0.06);
                for (let k = 0; k < 4; k++){
                    let u = ((frames * 0.12 + k / 4) % 1), x = X0 + (X1 - X0) * u, rr = H * 0.5 * (1 - u) + 0.5;
                    ctx.beginPath(); ctx.moveTo(x - H * 0.10, -rr); ctx.lineTo(x + H * 0.10, rr); ctx.stroke();
                }
                ctx.fillStyle = "#FFFFFF"; ctx.beginPath(); ctx.arc(X1 - 1, 0, Math.max(1, H * 0.07), 0, 6.28); ctx.fill();
            } else {
                // thuong: song nho · Sieu Tai / vien cuoi / dan to: to hon, co quang va vet sang
                let Lx = w * 1.05, Hy = Math.max(h, w * 0.95);
                let manh = !!L;
                if (manh){
                    ctx.fillStyle = L === 'cuoiST' ? "rgba(129,212,250,0.35)" : "rgba(79,195,247,0.28)";
                    ctx.beginPath(); ctx.ellipse(Lx * 0.08, 0, Lx * 0.8, Hy * 0.72, 0, 0, 6.28); ctx.fill();
                }
                if (L === 'cuoiST'){   // bong song thu hai phia sau
                    ctx.save(); ctx.globalAlpha = 0.45; ctx.translate(-Lx * 0.45, 0);
                    pulseVeLiem(Lx * 0.85, Hy * 0.85, {}); ctx.restore();
                }
                let mau = (L === 'to' || L === 'cuoiST') ? { a: "#536DFE", b: "#0288D1", c: "#00B0FF", sang: true, quang: "rgba(0,176,255,0.28)" }
                        : (manh ? { sang: true, quang: "rgba(0,229,255,0.30)" } : {});
                if (L === 'cuoi' || L === 'cuoiST') mau.vien = "#FFFFFF";
                pulseVeLiem(Lx, Hy, mau);
                if (L === 'to'){ ctx.strokeStyle = "#B3E5FC"; ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.arc(0, 0, Math.max(Lx, Hy) / 2 + 3 + Math.sin(frames * 0.5) * 2, 0, 6.28); ctx.stroke(); }
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.pulseVeVien.1

// index.html:49095 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PULSE_QUET.1 EDITABLE
const PULSE_QUET = 24;
// PLAYER_PART_END s4.PULSE_QUET.1

// index.html:49096 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PULSE_MACH.1 EDITABLE
const PULSE_MACH = [
            [[-14,10],[-2,14],[6,15],[10,12],[22,12],[28,14],[32,7],[40,7]],   // duoi -> lung -> co -> dau
            [[36,11],[44,11],[44,14]],                                         // ham
            [[8,20],[16,20],[20,24],[28,24]],                                  // suon
            [[20,27],[20,34],[17,38],[17,42]],                                 // chan sau
            [[28,27],[29,35],[29,41]],                                         // chan truoc
            [[31,26],[36,28],[40,30]]                                          // tay
        ];
// PLAYER_PART_END s4.PULSE_MACH.1

// index.html:49104 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PULSE_THAN.1 EDITABLE
const PULSE_THAN = [[-21,6],[5,14],[17,9],[29,11],[31,2],[45,1],[52,7],[52,18],[40,19],[35,21],[42,28],[41,33],[32,31],
                            [32,43],[25,43],[24,36],[21,37],[19,44],[12,44],[15,34],[7,30],[-21,9]];
// PLAYER_PART_END s4.PULSE_THAN.1

// index.html:49106 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseVeMach.1 EDITABLE
function pulseVeMach(ng){
            if (!ng || ng.ammoType !== 0 || (ng.hp !== undefined && ng.hp <= 0)) return;
            let tang = !!ng.pulseTang, q = (ng._pulseQuet == null) ? 999 : frames - ng._pulseQuet;
            if (!tang && q > PULSE_QUET) return;
            let sx = ng.w / 32, sy = ng.h / 44, lat = !!ng.isFacingLeft;
            const P = (x, y) => [ng.x + (lat ? 32 - x : x) * sx, ng.y + y * sy];
            ctx.save();
            ctx.beginPath();
            PULSE_THAN.forEach((d, i) => { let [X, Y] = P(d[0], d[1]); if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); });
            ctx.closePath(); ctx.clip();
            let quetY = -2 + q / PULSE_QUET * 48;                  // vach quet (toa do than)
            const doSang = y => tang ? 1 : (y > quetY ? 0 : Math.max(0, 1 - (quetY - y) / 16));
            ctx.lineCap = 'square';
            for (let L of PULSE_MACH){
                for (let i = 1; i < L.length; i++){
                    let a = doSang((L[i - 1][1] + L[i][1]) / 2); if (a <= 0) continue;
                    let [x1, y1] = P(L[i - 1][0], L[i - 1][1]), [x2, y2] = P(L[i][0], L[i][1]);
                    ctx.globalAlpha = 0.55 * a; ctx.strokeStyle = "#01579B"; ctx.lineWidth = 3 * sx;
                    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
                    ctx.globalAlpha = a; ctx.strokeStyle = "#29B6F6"; ctx.lineWidth = 1.3 * sx;
                    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
                }
                ctx.fillStyle = "#4FC3F7";
                for (let d of L){ let a = doSang(d[1]); if (a <= 0) continue; let [X, Y] = P(d[0], d[1]);
                    ctx.globalAlpha = a; ctx.fillRect(X - 1.2 * sx, Y - 1.2 * sx, 2.4 * sx, 2.4 * sx); }
            }
            ctx.globalAlpha = 1;
            if (!tang){
                // vach quet chay tu tren xuong
                let Y = ng.y + quetY * sy;
                ctx.fillStyle = "rgba(79,195,247,0.30)"; ctx.fillRect(ng.x - 24 * sx, Y - 2.5, ng.w + 48 * sx, 5);
                ctx.fillStyle = "#81D4FA"; ctx.fillRect(ng.x - 24 * sx, Y - 0.75, ng.w + 48 * sx, 1.5);
            } else {
                // day: vach trang ngan chay doc theo mach
                ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 1.4 * sx;
                PULSE_MACH.forEach((L, li) => {
                    let dai = [], tong = 0;
                    for (let i = 1; i < L.length; i++){ let d = Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]); dai.push(d); tong += d; }
                    const diem = v => { for (let i = 0; i < dai.length; i++){ if (v <= dai[i]){ let t = v / dai[i];
                        return [L[i][0] + (L[i + 1][0] - L[i][0]) * t, L[i][1] + (L[i + 1][1] - L[i][1]) * t]; } v -= dai[i]; } return L[L.length - 1]; };
                    for (let k = 0; k < 2; k++){
                        let vt = (frames * 0.7 + k * tong / 2 + li * 5) % tong;
                        let a1 = diem(vt), a2 = diem(Math.max(0, vt - 3));
                        let [x1, y1] = P(a1[0], a1[1]), [x2, y2] = P(a2[0], a2[1]);
                        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
                    }
                });
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.pulseVeMach.1

// index.html:49156 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulseVeThanh.1 EDITABLE
function pulseVeThanh(ng){
            infVeVan(ng);   // @@HE-INF-NHIET
            if (!ng || ng.ammoType !== 0 || (ng.hp !== undefined && ng.hp <= 0)) return;
            pulseVeMach(ng);   // @@HE-PULSE-VE
            let v = Math.max(0, Math.min(100, ng.pulseNL || 0)) / 100;
            if (v <= 0 && !ng.pulseTang) return;
            let w = 44, x = ng.x + ng.w / 2 - w / 2, y = ng.y - 14;
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(x - 1, y - 1, w + 2, 6);
            if (ng.pulseTang){
                let nh = 0.65 + 0.35 * Math.sin(frames * 0.3);
                ctx.fillStyle = "rgba(255,213,79," + nh + ")"; ctx.fillRect(x, y, w * v, 4);
                ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = 'center'; ctx.fillStyle = "#FFE082";
                ctx.fillText("SIÊU TẢI", x + w / 2, y - 3);
            } else { ctx.fillStyle = "#4FC3F7"; ctx.fillRect(x, y, w * v, 4); }
            ctx.restore();
        }
// PLAYER_PART_END s4.pulseVeThanh.1

// index.html:49173 · Phạm vi: global
// PLAYER_PART_BEGIN s4.noPhanHach.1 EDITABLE
function noPhanHach(proj){
            proj._split = true;
            let fx0 = proj.x + proj.w/2, fy0 = proj.y + proj.h/2;
            let _oc = proj.oc || 0;
            let BIG = !!proj.ultBig, RAD = BIG ? 118 : (52 + Math.round(24 * _oc));
            let CORE = BIG ? 8 : (2 + Math.round(4 * _oc) + PULSE_SAC_THEM);   // @@HE-PULSE-SAC
            let NF   = BIG ? 8 : (3 + Math.round(3 * _oc));
            let FD   = BIG ? 3 : 1 + PULSE_SAC_THEM;                              // @@HE-PULSE-SAC
            let _ps = (proj.pulseSieu === 'toa');                       // @@HE-PULSE-ST
            if (_ps){ CORE += 2; pulseSetDat(fx0, fy0, 64, proj.owner); }
            visualEffects.push(new Effect(fx0, fy0, BIG ? 'exp_blue' : 'explosion', true, BIG ? 96 : 58));
            if (BIG) visualEffects.push(new Effect(fx0, fy0, 'explosion', true, 62));
            shakeTimer = Math.max(shakeTimer, BIG ? 34 : 16);
            /* Cu NO LOI (CORE = 2-6 tuy do nap) truoc day bi bo hoan toan trong PvP: ca
               khoi duoi day boc trong `gameState !== 'pvp'`. Vi vay qua cau phan hach —
               don nap lau nhat cua Pulse — chi con 2 sat thuong va cham cong may manh, ra
               dung 4 dmg trong khi cac dan khac danh hon 10. Cho no no len nguoi choi. */
            if (gameState === 'pvp'){
                let _ar = { x: fx0 - RAD, y: fy0 - RAD, w: RAD*2, h: RAD*2 };
                let _dt = (typeof pvpDich === 'function') ? pvpDich(proj.owner === 2 ? dino2 : pvpNguoi1()) : null;
                if (_dt && checkAABB(_ar, _dt) && !_dt.isShielding()) pvpVoBoc(_dt).takeDamage(CORE);
            }
            if (gameState !== 'pvp') {
                let ar = { x: fx0 - RAD, y: fy0 - RAD, w: RAD*2, h: RAD*2 };
                obstacles.forEach(o => { if (checkAABB(ar, o)) o.hp -= CORE; });
                allTargets().forEach(e => { if (bosses.indexOf(e) < 0 && checkAABB(ar, e)) e.hp -= CORE; });
                bosses.forEach(b => { if (!b.invulnAll && checkAABB(ar, b)) damageBossWithFirstStrike(b, CORE); });
            }
            for (let k = 0; k < NF; k++) {
                let a = (k / NF) * Math.PI * 2 + Math.random() * 0.4, sp = 7.5;
                let fp = new Projectile(fx0, fy0, FD, 0, 0, 0, proj.dir, proj.owner);
                fp.speed = Math.cos(a) * sp; fp.vy = Math.sin(a) * sp; fp.homing = 26; fp._reso = true;
                if (_ps) fp._pulseSet = true;                           // @@HE-PULSE-ST: manh trung thi de vung set
                projectiles.push(fp);
            }
            if (typeof SFX !== 'undefined' && SFX.glassBreak) SFX.glassBreak();
        }
// PLAYER_PART_END s4.noPhanHach.1

// index.html:49212 · Phạm vi: Player.prototype
const __Part26 = {
// PLAYER_PART_BEGIN s4.Player.prototype.firePulseBasic.1 EDITABLE
firePulseBasic() { 
                const inf = false && (this.id===1 ? currentAmmoType===0 : p2AmmoType===0);
                if (!inf) this.ammo--; this.attackCooldown = 12; let pos = this.getShootPos();
                let dir = inf ? pos.dir + (Math.random()*6 - 3) * Math.PI/180 : pos.dir;
                /* @@HE-PULSE-CUOI — Hans: "Vien cuoi cung trong chuoi truoc khi qua nhiet se to va manh
                   hon cac vien binh thuong. Gay 2 dmg va xuyen qua ke dich. Vien nay hoi 4 diem cho sieu
                   tai. ... khi Sieu Tai se to va manh hon nua gay 4 dmg xuyen qua toan bo ke dich, cost
                   van nhu vien thuong." */
                // Vien 1-5 cung co 20% hoa VIEN LON (vien 6 thi luon la vien lon).
                let _cuoi = !inf && (this.ammo <= 0 || Math.random() < 0.2);
                let _n0 = projectiles.length, _st = pulseDung(this, 'thuong');   // @@HE-PULSE-ST
                let _dm = _cuoi ? (_st ? 4 : 2) : (_st ? Math.max(2, this.bulletDmg + 1) : this.bulletDmg);
                this.createSpread(pos.x, pos.y - (6*pos.scale)/2, _dm, 0, dir, inf); 
                if (_cuoi) pulseVienCuoi(_n0, _st);
                else if (_st) pulseCuongHoa(_n0, 'thuong');
                else for (let _i = _n0; _i < projectiles.length; _i++) if (projectiles[_i]) projectiles[_i].pulseDan = 1;   // @@HE-PULSE-DAN
                if (!_st) pulseNap(this, _cuoi ? 'cuoi' : 'thuong');
                if (!inf && this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; } 
            }
// PLAYER_PART_END s4.Player.prototype.firePulseBasic.1
};

// index.html:49232 · Phạm vi: Player.prototype
const __Part27 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireBigBullet.1 EDITABLE
fireBigBullet() { 
                this.ammo--; this.attackCooldown = 15; let pos = this.getShootPos();
                let _n0 = projectiles.length, _st = pulseDung(this, 'to');       // @@HE-PULSE-ST
                this.createSpread(pos.x, pos.y - (6*pos.scale)/2, this.bulletDmg * 2 + PULSE_SAC_THEM, 1, pos.dir, false, 1);   // @@HE-PULSE-SAC 
                if (_st) pulseCuongHoa(_n0, 'to'); else pulseNap(this, 'to');
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; } 
            }
// PLAYER_PART_END s4.Player.prototype.fireBigBullet.1
};

// index.html:49242 · Phạm vi: Player.prototype
const __Part28 = {
// PLAYER_PART_BEGIN s4.Player.prototype.firePiercingBullet.1 EDITABLE
firePiercingBullet() { 
                this.ammo--; this.attackCooldown = 20; let pos = this.getShootPos();
                let _n0 = projectiles.length, _st = pulseDung(this, 'xuyen');    // @@HE-PULSE-ST
                this.createSpread(pos.x, pos.y - (6*pos.scale)/2, this.bulletDmg * 3 + PULSE_SAC_THEM + (_st ? 2 : 0), 2, pos.dir, false, 1);   // @@HE-PULSE-SAC 
                if (_st) pulseCuongHoa(_n0, 'xuyen'); else pulseNap(this, 'xuyen');
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; } 
            }
// PLAYER_PART_END s4.Player.prototype.firePiercingBullet.1
};

// index.html:49250 · Phạm vi: Player.prototype
const __Part29 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireFission.1 EDITABLE
fireFission() {
                this.ammo--; this.attackCooldown = 26;
                let pos = this.getShootPos();
                let oc = overchargeT(this.aKeyHeldTime, 90);
                /* PHAN HACH la MOT qua cau. No da co san co che TACH: cham dich thi
                   noPhanHach() cho no no ra va vo thanh 3-6 manh tu tim muc tieu.
                   Toi tung them hai vien ria ban ra ngay tu dau — sai han y do: nguoi choi
                   thay ba vien bay song song thay vi mot qua cau tach ra khi toi gan. Da bo. */
                let p = new Projectile(pos.x, pos.y - (6*pos.scale)/2, 2 + PULSE_SAC_THEM, 2, 0, 0, pos.dir, this.id);   // @@HE-PULSE-SAC
                p.fission = true; p.oc = oc;
                if (pulseDung(this, 'toa')) p.pulseSieu = 'toa'; else pulseNap(this, 'toa');   // @@HE-PULSE-ST
                let sc2 = 1.6 + 0.9 * oc;
                p.w = Math.round(p.w * sc2); p.h = Math.round(p.h * sc2);
                projectiles.push(p);
                floatingTexts.push(new FloatingText(this.x, this.y - 26, "PHÂN HẠCH " + Math.round(oc * 100) + "%"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(300, 0.20, 'sawtooth', 0.22, 1200);
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.fireFission.1
};

// index.html:49274 · Phạm vi: Player.prototype
const __Part30 = {
// PLAYER_PART_BEGIN s4.Player.prototype.createSpread.1 EDITABLE
createSpread(x, y, dmg, type, dir, endlessSpread = false, soVien) {
                let n = Math.max(1, soVien || this.spreadCount || 1);
                for (let i = 0; i < n; i++) {
                    let offset = (i - (n - 1) / 2) * 14;
                    let q = new Projectile(x, y + offset, dmg, type, 0, 0, dir, this.id, endlessSpread);
                    if (n > 1) q.vy = (i - (n - 1) / 2) * 0.55;   // toa hinh quat, khong phai ban song song
                    projectiles.push(q);
                }
            }
// PLAYER_PART_END s4.Player.prototype.createSpread.1
};

// index.html:49283 · Phạm vi: Player.prototype
const __Part31 = {
// PLAYER_PART_BEGIN s4.Player.prototype.pulseVeLaser.1 EDITABLE
pulseVeLaser(pos) {
                // Lazer phai keo den bien THE GIOI. Truoc day dung bien MAN HINH nen
                // khi di qua nua sau ban do, tia bi cat ngan va — voi huong ngam trai —
                // no ve tu x=0 (dau ban do) nen nhin nhu nguoi choi ban nguoc ra sau.
                let w = pos.dir === 1 ? (worldR() - pos.x) : (pos.x - worldL());
                let startX = pos.dir === 1 ? pos.x : worldL();

                if (this.laserType === 1) { 
                    ctx.fillStyle = "rgba(255, 23, 68, 0.5)"; ctx.fillRect(startX, pos.y - 24, w, 48);
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; ctx.fillRect(startX, pos.y - 8, w, 16);
                    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"; ctx.beginPath(); ctx.arc(pos.x, pos.y, 22, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "rgba(255, 23, 68, 0.7)"; ctx.beginPath(); ctx.arc(pos.x, pos.y, 16, 0, Math.PI*2); ctx.fill();

                    let laserDmgToDeal = 0;
                    if (this.laserActiveTimer % 30 === 0) laserDmgToDeal = 1;

                    if (laserDmgToDeal > 0) { 
                        let laserRect = { x: startX, y: pos.y - 40, w: w, h: 80 };
                        if (this.id === 1 && typeof doChieuThu === 'function') doChieuThu('lz' + this.id, laserRect, laserDmgToDeal, 12);   // @@HE-DOCHIEU: tia laser cung do chieu
                        if (gameState === 'pvp') {
                            let target = pvpDich(this);
                            if (checkAABB(laserRect, target)) {
                                if (target.isShielding()) {
                                    visualEffects.push(new Effect(target.x + (target.isFacingLeft ? target.w : 0), target.y, 'parry'));
                                } else {
                                    target.takeDamage(laserDmgToDeal); target.burnHitTimer = 40;
                                }
                            }
                        } else {
                            // Quet TOAN BO muc tieu, ke ca quan trieu hoi cua boss va quan che do Defense.
                            allTargets().forEach(o => {
                                if (!checkAABB(laserRect, o) || o.invulnAll) return;
                                if (bosses.indexOf(o) >= 0) damageBossFromAmmo(o, laserDmgToDeal);
                                else o.hp -= laserDmgToDeal;
                                if (o.burnTimer !== undefined) o.burnTimer = 180;
                                if (o.hp <= 0 && o.dead !== undefined) o.dead = true;
                            });
                        }
                    }
                } else { 
                    // ===== LASER LAM MOI: 3 nac day dan, nhieu lop, hat sang hut vao mieng phong =====
                    let st = this.pulseLaserChannel ? (this.pulseLaserNac || 0) : 2;
                    let HW = [22, 34, 50][st];
                    let g3 = ctx.createLinearGradient(0, pos.y - HW, 0, pos.y + HW);
                    g3.addColorStop(0, "rgba(0,188,212,0.05)"); g3.addColorStop(0.28, "rgba(0,229,255,0.55)");
                    g3.addColorStop(0.5, "rgba(230,255,255,0.98)"); g3.addColorStop(0.72, "rgba(0,229,255,0.55)");
                    g3.addColorStop(1, "rgba(0,188,212,0.05)");
                    ctx.fillStyle = g3; ctx.fillRect(startX, pos.y - HW, w, HW * 2);
                    ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fillRect(startX, pos.y - HW * 0.20, w, HW * 0.40);
                    for (let k = 0; k < 7; k++) { let sx3 = (pos.dir === 1 ? (frames * 30 + k * 150) % (w + 120) + startX : startX + w - ((frames * 30 + k * 150) % (w + 120)));
                        ctx.fillStyle = "rgba(178,235,242,0.65)"; ctx.fillRect(sx3, pos.y - HW * 0.6, 46, HW * 1.2); }
                    // hat sang bi hut vao mieng phong
                    for (let k = 0; k < 6; k++) { let ph = ((frames * 5 + k * 30) % 60) / 60, rr = 70 * (1 - ph), aa = k * 1.05 + frames * 0.05;
                        ctx.fillStyle = "rgba(0,229,255," + (1 - ph) + ")";
                        ctx.fillRect(pos.x + Math.cos(aa) * rr - 2, pos.y + Math.sin(aa) * rr - 2, 4, 4); }
                    ctx.fillStyle = "rgba(0,229,255,0.85)"; ctx.beginPath(); ctx.arc(pos.x, pos.y, HW * 0.9 + Math.sin(frames * 0.4) * 4, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.beginPath(); ctx.arc(pos.x, pos.y, HW * 0.45, 0, 6.28); ctx.fill();

                    let laserDmgToDeal = 0;
                    if (this.pulseLaserChannel) { if (frames % 15 === 0) laserDmgToDeal = [2, 3, 4][st] + PULSE_SAC_THEM; }   // 8 -> 12 -> 16 dmg/s (@@HE-PULSE-SAC: +1 moi nhip -> 12 / 16 / 20)
                    else if (this.laserActiveTimer % 15 === 0) laserDmgToDeal = 2;

                    if (laserDmgToDeal > 0) { 
                        let laserRect = { x: startX, y: pos.y - 40, w: w, h: 80 };
                        if (this.id === 1 && typeof doChieuThu === 'function') doChieuThu('lz' + this.id, laserRect, laserDmgToDeal, 12);   // @@HE-DOCHIEU: tia laser cung do chieu
                        if (gameState === 'pvp') {
                            let target = pvpDich(this);
                            if (checkAABB(laserRect, target)) {
                                if (target.isShielding()) {
                                    visualEffects.push(new Effect(target.x + (target.isFacingLeft ? target.w : 0), target.y, 'parry'));
                                } else {
                                    target.takeDamage(laserDmgToDeal);
                                }
                            }
                        } else {
                            obstacles.forEach(o => { if(checkAABB(laserRect, o)) { o.hp -= laserDmgToDeal * 2; } });
                            allTargets().forEach(e => { if (bosses.indexOf(e) < 0 && checkAABB(laserRect, e)) e.hp -= laserDmgToDeal; });
                            bosses.forEach(b => { if(checkAABB(laserRect, b) && !b.invulnAll) { damageBossFromAmmo(b, laserDmgToDeal); } });
                        }
                    }
                }
            }
// PLAYER_PART_END s4.Player.prototype.pulseVeLaser.1
};

// index.html:49367 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.2 EDITABLE
vkDangKy(0, {
            ten: 'PULSE', mauUlt: '#2979FF',
            sacToiDa: 90,              // so khung tich K cho day vong (maxChargeFrames)
            mauHudUlt: '#00B0FF',         // mau thanh chieu cuoi tren HUD khi dang chay
            banJ(){
                if (this.ammo > 0) this.firePulseBasic();
            },
            nhaK(){
                if (this.pulseLaserChannel) {
                    /* TIA LASER: tha ra la HET, khong nha them gi.
                       Truoc day toi cho no ban THEM mot cu phan hach khi ngat tia, voi ly
                       do "giu lau khong duoc thiet". Nhung nhu vay tia laser thanh mot cu
                       charge co phan thuong kem — nguoi choi an ca tia LAN cu phan hach,
                       do duoc 15 sat thuong trong mot lan bam. Tia da la phan thuong cua
                       viec giu lau roi. */
                    this.pulseLaserChannel = false; this.pulseLaserNac = 0; this.pulseLaserT = 0;
                    this.isOverheated = true; this.overheatTimer = 90;
                    if (this.pulseLaserSieu){ this.pulseLaserSieu = false; if ((this.pulseNL || 0) <= 0) this.pulseTang = false; }   // @@HE-PULSE-ST
                }
                else if (this.chargeProgress >= 100) this.fireFission();
                else if (this.chargeProgress >= 62.5 && this.ammo > 0 && !this.isOverheated && this.attackCooldown <= 0) this.firePiercingBullet();
                else if (this.chargeProgress >= 25 && this.ammo > 0 && !this.isOverheated && this.attackCooldown <= 0) this.fireBigBullet();
                else if (this.ammo > 0 && !this.isOverheated && this.attackCooldown <= 0) this.firePulseBasic();
            },
            channel(){
                if (!this.pulseLaserChannel) { this.pulseLaserChannel = true; this.laserType = 0; this.pulseLaserNac = 0; this.pulseLaserT = 0;
                    // @@HE-PULSE-ST: dang Sieu Tai thi vao thang QUA TAI 3
                    if (this.pulseTang){ this.pulseLaserSieu = true; this.pulseLaserNac = 2; this.pulseLaserT = 150; shakeTimer = Math.max(shakeTimer, 18);
                        floatingTexts.push(new FloatingText(this.x, this.y - 30, "QUÁ TẢI 3 — SIÊU TẢI")); } }
                // LASER QUA TAI: giu cang lau tia cang DAY va cang dau (3 nac)
                this.pulseLaserT++;
                let ns = this.pulseLaserT >= 150 ? 2 : this.pulseLaserT >= 70 ? 1 : 0;
                if (ns > this.pulseLaserNac) { this.pulseLaserNac = ns; shakeTimer = Math.max(shakeTimer, 16);
                    floatingTexts.push(new FloatingText(this.x, this.y - 30, "QUÁ TẢI " + (ns+1)));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(300 + ns*180, 0.18, 'sawtooth', 0.20, 900); }
            },
            batUlt(){
                // chieu cuoi dang "cam": ultActive, ultTick lo phan ban (J = vien phan hach, giu K = tia MEGA)
                this.ultActive = true; this.ultAmmo = 0; this.ultTimer = 0;
                this.aKeyHeldTime = 0; this.chargeProgress = 0; this.isOverheated = false;
                SFX.tone(660, 0.2, 'sawtooth', 0.25, 990); SFX.tone(990, 0.35, 'square', 0.15, 1320);
            },
            ultTick(ammo, fireKey, chargeKey){
                if (chargeKey && ultCharge > 0) {
                    this.ultBeam = ammo;
                    if (this.ultTimer % 2 === 0) ultCharge = Math.max(0, ultCharge - 1);   // tia ngan lai: ~3.3 giay thay vi 10
                    // TIA MEGA: nap 30 frame roi BUNG to dan, cao gap 3 va dmg gap 4 so voi ban cu
                    this.ultBeamT = (this.ultBeamT || 0) + 1;
                    let grow = Math.min(1, this.ultBeamT / 30);
                    let pos = this.getShootPos(), beamH = 60 + 120 * grow;
                    // LAZER quet den bien THE GIOI, khong phai bien man hinh.
                    let beamRect = { x: pos.dir === 1 ? pos.x : worldL(),
                                     y: pos.y - beamH / 2,
                                     w: pos.dir === 1 ? (worldR() - pos.x) : (pos.x - worldL()), h: beamH };
                    this.ultBeamRect = beamRect; this.ultBeamGrow = grow;
                    if (this.ultBeamTick <= 0) {
                        let bd = 2 + Math.round(4 * grow);   // 2 -> 6 moi nhip (~12 -> 36 dmg/s)
                        if (this.id === 1 && typeof doChieuThu === 'function') doChieuThu('ultbeam', beamRect, bd, 8);   // @@HE-DOCHIEU
                        allTargets().forEach(o => { if (checkAABB(beamRect, o) && !o.invulnAll) { o.hp -= bd; if (ammo === 1) o.burnTimer = 90; } });
                        // pha sach dan boss trong duong tia
                        for (let i = bossProjectiles.length - 1; i >= 0; i--) { let bp = bossProjectiles[i];
                            if (checkAABB(beamRect, bp)) { visualEffects.push(new Effect(bp.x, bp.y, 'parry')); bossProjectiles.splice(i, 1); } }
                        shakeTimer = Math.max(shakeTimer, 10);
                        this.ultBeamTick = 10;
                    }
                    this.ultBeamTick--;
                    if (ultCharge <= 0) this.endUlt();
                } else {
                    this.ultBeam = null; this.ultBeamRect = null; this.ultBeamTick = 0; this.ultBeamT = 0;
                    if (fireKey && this.attackCooldown <= 0 && ultCharge > 0) {
                        this.attackCooldown = 12;
                        let pos = this.getShootPos();
                        /* PULSE: 25 -> DUNG 4 phat moi lan ult (truoc day 34 nen chi ra 3).
                           Inferno (ammo 1) khong bao gio chay vao day — chieu cuoi cua no la
                           Atomic Reactor, khong bat `ultActive` — nhung van tach so ra cho ro. */
                        ultCharge = Math.max(0, ultCharge - (ammo === 0 ? 25 : 34));
                        let last = ultCharge <= 0;                  // TINH SAU khi tru, neu khong ult khong bao gio ket thuc
                        // PULSE ULT: vien nang, no lan CUC LON + tu vo thanh manh (dung cau truc PHAN HACH)
                        if (ammo === 0) { let up = new Projectile(pos.x, pos.y - 8, 0, 10, 0, 0, pos.dir, this.id); up.fission = true; up.ultBig = true; projectiles.push(up); }
                        else projectiles.push(new Projectile(pos.x, pos.y - 8, 4, 11, 0, 999, pos.dir, this.id));
                        SFX.shoot(ammo);
                        if (last) this.endUlt();
                    }
                }
                return;
            },
            veUlt(){
                if ((this.ultBeam === 0 || this.ultBeam === 1) && this.ultBeamRect) {
                    let r = this.ultBeamRect, hot = this.ultBeam === 1;
                    let cy2 = r.y + r.h / 2, g4 = ctx.createLinearGradient(0, r.y, 0, r.y + r.h);
                    let cA = hot ? "255,87,34" : "0,188,212", cB = hot ? "255,193,7" : "0,229,255";
                    ctx.save(); ctx.globalCompositeOperation = 'lighter';
                    g4.addColorStop(0, "rgba(" + cA + ",0.05)"); g4.addColorStop(0.22, "rgba(" + cA + ",0.45)");
                    g4.addColorStop(0.42, "rgba(" + cB + ",0.90)"); g4.addColorStop(0.5, "rgba(255,255,255,1)");
                    g4.addColorStop(0.58, "rgba(" + cB + ",0.90)"); g4.addColorStop(0.78, "rgba(" + cA + ",0.45)");
                    g4.addColorStop(1, "rgba(" + cA + ",0.05)");
                    ctx.fillStyle = g4; ctx.fillRect(r.x, r.y, r.w, r.h);
                    // song xung chay doc than tia
                    for (let k = 0; k < 9; k++) { let sx = (frames * 34 + k * 130) % (r.w + 160) - 80;
                        let hh = r.h * (0.55 + 0.25 * Math.sin(frames * 0.3 + k));
                        ctx.fillStyle = "rgba(255,255,255,0.30)"; ctx.fillRect(r.x + sx, cy2 - hh/2, 60, hh); }
                    ctx.fillStyle = "rgba(255,255,255,0.98)"; ctx.fillRect(r.x, cy2 - r.h * 0.09, r.w, r.h * 0.18);
                    // mieng phong: quang sang + vong xung bung ra
                    let mxp = this.isFacingLeft ? r.x + r.w : r.x;
                    ctx.fillStyle = "rgba(" + cB + ",0.85)"; ctx.beginPath(); ctx.arc(mxp, cy2, r.h * 0.62 + Math.sin(frames * 0.5) * 6, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.beginPath(); ctx.arc(mxp, cy2, r.h * 0.30, 0, 6.28); ctx.fill();
                    for (let k = 0; k < 3; k++) { let ph = ((frames * 4 + k * 20) % 60) / 60;
                        ctx.strokeStyle = "rgba(" + cB + "," + (1 - ph) + ")"; ctx.lineWidth = 4;
                        ctx.beginPath(); ctx.arc(mxp, cy2, r.h * 0.5 + ph * 90, 0, 6.28); ctx.stroke(); }
                    ctx.restore(); ctx.globalAlpha = 1;
                }
            },
            hoverSac(half){
                this.firePiercingBullet();                       // moc 2 (xuyen), khong phai moc 1
            }
        });
// PLAYER_PART_END s4.vkDangKy.2
