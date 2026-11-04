// PLAYER_FILE: WHISPER
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CAM_TROI, Effect, FloatingText, Projectile, SFX, allTargets, canvas, ctx, dino, dsTrangThai, floatingTexts, frames, lhChoChay, projectiles, shakeTimer, ultCharge, visualEffects, vkDangKy
// index.html:54500 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WS_AN_DAI.1 EDITABLE
const WS_AN_DAI = 300;
// PLAYER_PART_END s4.WS_AN_DAI.1

// index.html:54501 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WS_KHONG_DAI.1 EDITABLE
const WS_KHONG_DAI = 60;
// PLAYER_PART_END s4.WS_KHONG_DAI.1

// index.html:54502 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WS_MIEN_DAI.1 EDITABLE
const WS_MIEN_DAI = 180;
// PLAYER_PART_END s4.WS_MIEN_DAI.1

// index.html:54503 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WS_CHAM_DAI.1 EDITABLE
const WS_CHAM_DAI = 300;
// PLAYER_PART_END s4.WS_CHAM_DAI.1

// index.html:54504 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WS_OVERHEAT.1 EDITABLE
const WS_OVERHEAT = 90;
// PLAYER_PART_END s4.WS_OVERHEAT.1

// index.html:54506 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wsCoAn.1 EDITABLE
function wsCoAn(o){ return o && (o._wsAn || 0) > 0; }
// PLAYER_PART_END s4.wsCoAn.1

// index.html:54507 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wsDanhDau.1 EDITABLE
function wsDanhDau(o){ if (o && o.hp !== undefined && !o.invulnAll) o._wsAn = WS_AN_DAI; }
// PLAYER_PART_END s4.wsDanhDau.1

// index.html:54509 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wsNoAn.1 EDITABLE
function wsNoAn(o, kieu){
            if (!wsCoAn(o)) return 0;
            o._wsAn = 0;
            visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'parry', false));
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1300, 0.1, 'square', 0.18, 1900);
            if (kieu === 'khong'){
                if ((o._wsMien || 0) > 0) return 0;          // dang mien nhiem cung hieu ung
                o._wsKhong = WS_KHONG_DAI;
                o._wsMien = WS_KHONG_DAI + WS_MIEN_DAI;
                o._uFreeze = Math.max(o._uFreeze || 0, WS_KHONG_DAI);
                o._wsOwn = 1;
                floatingTexts.push(new FloatingText(o.x + (o.w||20)/2 - 30, o.y - 28, "KHỐNG CHẾ!"));
                return 0;
            }
            return 4;
        }
// PLAYER_PART_END s4.wsNoAn.1

// index.html:54526 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wsChoChay.1 EDITABLE
function wsChoChay(o){ if (typeof lhChoChay === 'function' && !lhChoChay(o)) return false; return !(o && (o._wsCham || 0) > 0 && (frames % 5 === 0)); }
// PLAYER_PART_END s4.wsChoChay.1

// index.html:54527 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wsTick.1 EDITABLE
function wsTick(){
            if (typeof allTargets !== 'function') return;
            for (let o of ((typeof dsTrangThai === 'function') ? dsTrangThai() : allTargets())){   // @@HE-P2KHOA: PvP gom ca P1
                if (!o) continue;
                if (o._wsAn > 0) o._wsAn--;
                if (o._wsCham > 0) o._wsCham--;
                if (o._wsMien > 0) o._wsMien--;
                if (o._wsKhong > 0){
                    o._wsKhong--;
                    o._uFreeze = Math.max(o._uFreeze || 0, o._wsKhong);
                    o._wsOwn = 1;
                }
                // TU tha khoa cua chinh minh — khong phu thuoc ham tick cua he khac
                if (o._wsOwn && (o._wsKhong || 0) <= 0){
                    o._wsOwn = 0;
                    if (!(o._uJC > 0) && !(o._cryoBang > 0) && !(o._cryoUB > 0)) o._uFreeze = 0;
                }
            }
        }
// PLAYER_PART_END s4.wsTick.1

// index.html:54546 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wsTickDan.1 EDITABLE
function wsTickDan(){
            if (typeof projectiles === 'undefined') return;
            for (let i = projectiles.length - 1; i >= 0; i--){
                let p = projectiles[i];
                if (!p || !p.ws) continue;
                if (p.wsTia && p.wsMuc && p.wsMuc.hp > 0){
                    // BAM muc tieu — co dau an thi tren troi duoi dat gi cung toi duoc
                    let tx = p.wsMuc.x + (p.wsMuc.w||20)/2, ty = p.wsMuc.y + (p.wsMuc.h||20)/2;
                    let a = Math.atan2(ty - (p.y + p.h/2), tx - (p.x + p.w/2)), sp = 24;
                    p.speed = Math.cos(a) * sp; p.vy = Math.sin(a) * sp;
                }
                if (p.wsLuu){
                    p.vy = (p.vy || 0) + 0.20;
                    if ((p.y + p.h) > 318 && p.vy > 0){ p.y = 318 - p.h; p.vy = -Math.abs(p.vy) * 0.72; }   // nay tren mat dat
                    // NAY sang muc tieu ke tiep khi da trung mot con
                    if (p._wsNayCho){
                        let m = p._wsNayCho; p._wsNayCho = null;
                        // NAY sang con ke tiep bang mot cung VONG LEN chu khong bay thang
                        const G2 = 0.20, T2 = 26;
                        p.speed = ((m.x + (m.w||20)/2) - (p.x + p.w/2)) / T2;
                        p.vy = Math.max(-12, Math.min(-4, (((m.y + (m.h||20)/2) - (p.y + p.h/2)) - 0.5*G2*T2*T2) / T2));
                    }
                }
            }
        }
// PLAYER_PART_END s4.wsTickDan.1

// index.html:54571 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wsTickUlt.1 EDITABLE
function wsTickUlt(){
            let U = dino && dino.wsUlt; if (!U) return;
            U.t++;
            // 4 phat, cach nhau 2 giay: 16 / 16 / 16 / 64
            // Ban dau toi dat moc [30,150,270,390] -> phat cuoi roi o giay 6.5, ult chi dai
            // 7 giay. Nguoi choi muon dung 8 giay vi no chia het cho 4.
            const MOC = [120, 240, 360, 480], DMG = [16, 16, 16, 64];
            if (!U.sao) U.sao = [];
            if (U.phat < 4 && U.t >= MOC[U.phat]){
                let d = DMG[U.phat]; U.phat++;
                U.loe = 18;
                // HO DEN BAN MOT NGOI SAO vao tung ke dich. Sao bay toi noi moi no —
                // truoc day toi cho no tru mau tuc thi, chang thay vien dan nao ca.
                let cuoi = (U.phat === 4);
                for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    U.sao.push({ x: U.x, y: U.y, o: o, dmg: d, cuoi: cuoi, t: 0, goc: Math.random() * 6 });
                }
                shakeTimer = Math.max(shakeTimer, cuoi ? 30 : 16);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(cuoi ? 120 : 300, 0.2, 'square', 0.24, 900);
            }
            for (let i = U.sao.length - 1; i >= 0; i--){
                let sv = U.sao[i]; sv.t++; sv.goc += 0.22;
                if (!sv.o || sv.o.hp <= 0){ U.sao.splice(i, 1); continue; }
                let tx = sv.o.x + (sv.o.w||20)/2, ty = sv.o.y + (sv.o.h||20)/2;
                let dx = tx - sv.x, dy = ty - sv.y, dd = Math.hypot(dx, dy) || 1;
                let sp = sv.cuoi ? 15 : 20;
                sv.x += dx / dd * sp; sv.y += dy / dd * sp;
                if (dd < sp + 6){
                    sv.o.hp -= sv.dmg;
                    visualEffects.push(new Effect(tx, ty, 'explosion', true, sv.cuoi ? 78 : 44));
                    floatingTexts.push(new FloatingText(tx - 22, ty - 30, sv.cuoi ? "MÀN HẠ! " + sv.dmg : "" + sv.dmg));
                    shakeTimer = Math.max(shakeTimer, sv.cuoi ? 46 : 20);
                    if (typeof SFX !== 'undefined'){ if (SFX.glassBreak) SFX.glassBreak();
                        if (SFX.tone) SFX.tone(sv.cuoi ? 70 : 180, 0.35, 'sawtooth', 0.3, 40); }
                    U.sao.splice(i, 1);
                }
            }
            if (U.loe > 0) U.loe--;
            if (U.t > 540) dino.wsUlt = null;
        }
// PLAYER_PART_END s4.wsTickUlt.1

// index.html:54612 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wsVeUlt.1 EDITABLE
function wsVeUlt(){
            let U = dino && dino.wsUlt; if (!U) return;
            let mo = U.t > 500 ? (540 - U.t) / 40 : Math.min(1, U.t / 20);
            ctx.save(); ctx.globalAlpha = mo;
            // NEN VU TRU
            let g = ctx.createLinearGradient(0, 0, 0, 340);
            g.addColorStop(0, "#0B0320"); g.addColorStop(0.6, "#1A0533"); g.addColorStop(1, "#2A0A3A");
            ctx.fillStyle = g; ctx.fillRect(0, -CAM_TROI - 20, canvas.width, 340 + CAM_TROI + 20);
            ctx.fillStyle = "#FFFFFF";
            for (let k = 0; k < 110; k++){
                let sx = (k * 173 + 37) % canvas.width, sy = (k * 89 + 11) % 320;
                let tw = 0.4 + 0.6 * Math.abs(Math.sin(frames * 0.05 + k));
                ctx.globalAlpha = mo * tw * 0.9;
                ctx.fillRect(sx, sy, k % 7 ? 2 : 3, k % 7 ? 2 : 3);
            }
            // HO DEN
            ctx.globalAlpha = mo;
            let R = 46 + (U.loe > 0 ? U.loe * 1.6 : 0);
            for (let k = 5; k >= 1; k--){
                ctx.strokeStyle = "rgba(236,64,122," + (0.10 * k).toFixed(2) + ")";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.ellipse(U.x, U.y, R + k * 13, (R + k * 13) * 0.32, frames * 0.02, 0, Math.PI*2);
                ctx.stroke();
            }
            let dg = ctx.createRadialGradient(U.x, U.y, 4, U.x, U.y, R);
            dg.addColorStop(0, "#000000"); dg.addColorStop(0.72, "#3A0A2A"); dg.addColorStop(1, "rgba(236,64,122,0)");
            ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(U.x, U.y, R, 0, Math.PI*2); ctx.fill();
            ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.arc(U.x, U.y, R * 0.55, 0, Math.PI*2); ctx.stroke();
            // dem so phat con lai
            ctx.globalAlpha = mo; ctx.fillStyle = "#F48FB1"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
            ctx.fillText((4 - U.phat) + " / 4", U.x, U.y + R + 22); ctx.textAlign = "left";
            // NGOI SAO dang bay toi muc tieu
            for (let sv of (U.sao || [])){
                let sz = sv.cuoi ? 26 : 15;
                ctx.save(); ctx.translate(sv.x, sv.y); ctx.rotate(sv.goc);
                ctx.shadowBlur = 22; ctx.shadowColor = sv.cuoi ? "#FFD54F" : "#EC407A";
                ctx.fillStyle = sv.cuoi ? "#FFECB3" : "#F48FB1";
                ctx.beginPath();
                for (let k = 0; k < 10; k++){
                    let rr = (k % 2 ? sz * 0.42 : sz), a = k * Math.PI / 5 - Math.PI/2;
                    (k ? ctx.lineTo : ctx.moveTo).call(ctx, Math.cos(a) * rr, Math.sin(a) * rr);
                }
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = sv.cuoi ? "#FF6F00" : "#C2185B"; ctx.lineWidth = 2; ctx.stroke();
                ctx.restore();
                // duoi sao
                ctx.save(); ctx.globalAlpha = 0.5;
                ctx.strokeStyle = sv.cuoi ? "rgba(255,213,79,0.7)" : "rgba(236,64,122,0.7)";
                ctx.lineWidth = sz * 0.5;
                ctx.beginPath(); ctx.moveTo(sv.x, sv.y);
                ctx.lineTo(U.x + (sv.x - U.x) * 0.72, U.y + (sv.y - U.y) * 0.72);
                ctx.stroke(); ctx.restore();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.wsVeUlt.1

// index.html:54669 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wsVeDuong.1 EDITABLE
function wsVeDuong(){
            let D = dino && dino.wsDuong; if (!D) return;
            D.t--; if (D.t <= 0 || !D.o || D.o.hp <= 0){ dino.wsDuong = null; return; }
            let x2 = D.o.x + (D.o.w||20)/2, y2 = D.o.y + (D.o.h||20)/2;
            let mo = D.t / 26;
            ctx.save();
            ctx.globalAlpha = mo;
            ctx.strokeStyle = "rgba(236,64,122,0.55)"; ctx.lineWidth = 6;
            ctx.beginPath(); ctx.moveTo(D.x1, D.y1); ctx.lineTo(x2, y2); ctx.stroke();
            ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 1.6;
            ctx.setLineDash([9, 7]); ctx.lineDashOffset = -frames * 3;
            ctx.beginPath(); ctx.moveTo(D.x1, D.y1); ctx.lineTo(x2, y2); ctx.stroke();
            ctx.setLineDash([]);
            // vong ngam tren muc tieu
            ctx.strokeStyle = "#EC407A"; ctx.lineWidth = 2.5;
            let R = 20 + (1 - mo) * 10;
            ctx.beginPath(); ctx.arc(x2, y2, R, 0, Math.PI*2); ctx.stroke();
            for (let k = 0; k < 4; k++){
                let a = k * Math.PI/2 + frames * 0.05;
                ctx.beginPath();
                ctx.moveTo(x2 + Math.cos(a)*(R-6), y2 + Math.sin(a)*(R-6));
                ctx.lineTo(x2 + Math.cos(a)*(R+7), y2 + Math.sin(a)*(R+7));
                ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.wsVeDuong.1

// index.html:54695 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wsVe.1 EDITABLE
function wsVe(){
            if (typeof allTargets !== 'function') return;
            for (let o of allTargets()){
                if (!o || o.hp === undefined || o.hp <= 0) continue;
                let cx = o.x + (o.w||20)/2;
                if (wsCoAn(o)){
                    // DAU AN kieu Jhin: bong hoa bon canh xoay cham
                    ctx.save(); ctx.translate(cx, o.y - 30); ctx.rotate(frames * 0.035);
                    ctx.strokeStyle = "#EC407A"; ctx.lineWidth = 2.5;
                    ctx.shadowBlur = 10; ctx.shadowColor = "#F48FB1";
                    for (let k = 0; k < 4; k++){
                        let a = k * Math.PI/2;
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.quadraticCurveTo(Math.cos(a+0.5)*10, Math.sin(a+0.5)*10, Math.cos(a)*13, Math.sin(a)*13);
                        ctx.quadraticCurveTo(Math.cos(a-0.5)*10, Math.sin(a-0.5)*10, 0, 0);
                        ctx.stroke();
                    }
                    ctx.fillStyle = "#FFD54F"; ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI*2); ctx.fill();
                    ctx.restore();
                }
                if ((o._wsCham || 0) > 0){
                    ctx.fillStyle = "rgba(236,64,122,0.85)"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("-20% TỐC", cx, o.y - 44); ctx.textAlign = "left";
                }
            }
        }
// PLAYER_PART_END s4.wsVe.1

// index.html:54725 · Phạm vi: Player.prototype
const __Part15 = {
// PLAYER_PART_BEGIN s4.Player.prototype.wsDem.1 EDITABLE
wsDem(kieu){
                if (!this._wsDem) this._wsDem = { thuong: 0, charge: 0, channel: 0 };
                this._wsDem[kieu] = (this._wsDem[kieu] + 1) % 4;
                return this._wsDem[kieu] === 0;          // true = day la VIEN THU 4
            }
// PLAYER_PART_END s4.Player.prototype.wsDem.1
};

// index.html:54730 · Phạm vi: Player.prototype
const __Part16 = {
// PLAYER_PART_BEGIN s4.Player.prototype._wsDan.1 EDITABLE
_wsDan(x, y, dmg, spd, vy){
                let p = new Projectile(x, y, dmg, 6, vy || 0, 0, this.isFacingLeft ? -1 : 1, this.id);
                p.ws = 1;
                if (spd) p.speed = spd * (this.isFacingLeft ? -1 : 1);
                projectiles.push(p);
                return p;
            }
// PLAYER_PART_END s4.Player.prototype._wsDan.1
};

// index.html:54737 · Phạm vi: Player.prototype
const __Part17 = {
// PLAYER_PART_BEGIN s4.Player.prototype.wsHetDan.1 EDITABLE
wsHetDan(){ if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = WS_OVERHEAT; } }
// PLAYER_PART_END s4.Player.prototype.wsHetDan.1
};

// index.html:54738 · Phạm vi: Player.prototype
const __Part18 = {
// PLAYER_PART_BEGIN s4.Player.prototype.wsTruDan.1 EDITABLE
wsTruDan(){ if (this.ammo > 0){ this.ammo--; this.wsHetDan(); } }
// PLAYER_PART_END s4.Player.prototype.wsTruDan.1
};

// index.html:54740 · Phạm vi: Player.prototype
const __Part19 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireWhisper.1 EDITABLE
fireWhisper(){
                this.ammo--; this.attackCooldown = 60;      // 1 vien/giay
                let bon = this.wsDem('thuong');
                let pos = this.getShootPos();
                let p = this._wsDan(pos.x, pos.y, bon ? 8 : 4, 22);
                p.wsBon = bon ? 1 : 0; p.wsAn = 1;         // wsAn = de lai dau an
                if (bon) p.wsThieu = 0.05;                 // + 5% mau da mat
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(bon ? 340 : 900, bon ? 0.2 : 0.08, bon ? 'sawtooth' : 'square', bon ? 0.26 : 0.15, bon ? 1500 : 1500);
                this.wsHetDan();
            }
// PLAYER_PART_END s4.Player.prototype.fireWhisper.1
};

// index.html:54751 · Phạm vi: Player.prototype
const __Part20 = {
// PLAYER_PART_BEGIN s4.Player.prototype.wsLuuDan.1 EDITABLE
wsLuuDan(){
                this.wsTruDan(); this.attackCooldown = 22;
                this.wsDem('charge');
                let pos = this.getShootPos();
                // CANH GOC nem: tinh quy dao nem bong sao cho roi dung dau ke dich gan nhat.
                // Truoc day no chi bay thang ra truoc nen ban vao khong khi la chuyen thuong.
                let muc = null, gan = 1e9;
                for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    let d = Math.hypot((o.x + (o.w||20)/2) - pos.x, (o.y + (o.h||20)/2) - pos.y);
                    if (d < gan){ gan = d; muc = o; }
                }
                const G = 0.20, T = 42;                      // 42 khung bay -> cung NAY KHA CAO
                let vx = 16 * (this.isFacingLeft ? -1 : 1), vy0 = -6.5;
                if (muc){
                    let tx = muc.x + (muc.w||20)/2, ty = muc.y + (muc.h||20)/2;
                    vx = (tx - pos.x) / T;
                    vy0 = ((ty - pos.y) - 0.5 * G * T * T) / T;
                    vy0 = Math.max(-13, Math.min(-4.5, vy0));   // luon nem VONG LEN
                }
                let p = this._wsDan(pos.x, pos.y, 4, 0, vy0);
                p.speed = vx;
                p.wsLuu = 1; p.wsNay = 4; p.wsCong = 0; p.wsDaTrung = new Set();
                p.w = Math.round(p.w * 1.5); p.h = Math.round(p.h * 1.5);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(520, 0.1, 'triangle', 0.16, 900);
            }
// PLAYER_PART_END s4.Player.prototype.wsLuuDan.1
};

// index.html:54778 · Phạm vi: Player.prototype
const __Part21 = {
// PLAYER_PART_BEGIN s4.Player.prototype.wsTia.1 EDITABLE
wsTia(){
                this.wsTruDan(); this.attackCooldown = 26;
                this.wsDem('charge');
                let pos = this.getShootPos();
                let muc = null, gan = 1e9;
                for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (wsCoAn(o)){ muc = o; break; }                       // co AN -> uu tien tuyet doi
                    let d = Math.hypot((o.x + (o.w||20)/2) - pos.x, (o.y + (o.h||20)/2) - pos.y);
                    if (d < gan){ gan = d; muc = o; }
                }
                let p = this._wsDan(pos.x, pos.y, 4, 24);
                p.wsTia = 1; p.wsMuc = muc;
                if (muc) this.wsDuong = { x1: pos.x, y1: pos.y, o: muc, t: 26 };   // DUONG DAN kieu Jhin
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1400, 0.1, 'square', 0.18, 2100);
            }
// PLAYER_PART_END s4.Player.prototype.wsTia.1
};

// index.html:54795 · Phạm vi: Player.prototype
const __Part22 = {
// PLAYER_PART_BEGIN s4.Player.prototype.wsNang.1 EDITABLE
wsNang(){
                this.wsTruDan(); this.attackCooldown = 34;
                let bon = this.wsDem('charge');
                let pos = this.getShootPos();
                // Vien thu 4 an 16 chu khong phai 8 — phai xung voi cong set up 3 phat truoc.
                let p = this._wsDan(pos.x, pos.y, bon ? 32 : 8, 26);
                p.wsBon = bon ? 1 : 0; p.wsNang = 1; p.wsAn = 1;
                p.w = Math.round(p.w * 1.9); p.h = Math.round(p.h * 1.9);
                shakeTimer = Math.max(shakeTimer, bon ? 20 : 12);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(bon ? 220 : 400, 0.22, 'sawtooth', 0.28, 1300);
            }
// PLAYER_PART_END s4.Player.prototype.wsNang.1
};

// index.html:54807 · Phạm vi: Player.prototype
const __Part23 = {
// PLAYER_PART_BEGIN s4.Player.prototype.wsChannelBan.1 EDITABLE
wsChannelBan(){
                let bon = this.wsDem('channel');
                let pos = this.getShootPos();
                let p = this._wsDan(pos.x, pos.y, bon ? 8 : 4, 22);
                p.wsBon = bon ? 1 : 0; p.wsAn = 1;
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(bon ? 420 : 1000, 0.07, 'square', 0.14, 1600);
            }
// PLAYER_PART_END s4.Player.prototype.wsChannelBan.1
};

// index.html:54815 · Phạm vi: Player.prototype
const __Part24 = {
// PLAYER_PART_BEGIN s4.Player.prototype.wsTickChannel.1 EDITABLE
wsTickChannel() {
                this.wsChanT = (this.wsChanT || 0) + 1;
                // LIEN HOAN: moi giay mot CAP hai vien cach nhau 7 khung.
                // Ban dau toi rai deu 30 khung mot vien — dung 2 vien/giay nhung nhip
                // troi ra le te, khong ra chat ban lien hoan.
                // Channel KHONG dung chung thanh dan — giong moi channel khac trong game
                // (Rapidfire / Prism / Boomerang deu khong tru vien nao). Ban dau toi cho
                // no tru dan nen ban duoc 4 phat la Overheat roi tat ngang.
                // 4 vien/giay = HAI cap moi giay, moi cap hai vien cach nhau 7 khung.
                // Giu duoc chat lien hoan ma van du sat thuong.
                let _m = this.wsChanT % 60;
                if (_m === 1 || _m === 8 || _m === 31 || _m === 38) this.wsChannelBan();
            }
// PLAYER_PART_END s4.Player.prototype.wsTickChannel.1
};

// index.html:54830 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.11 EDITABLE
vkDangKy(9, {
            ten: 'WHISPER',
            theLuc: 4,
            sacToiDa: 105,
            khongHoiDan: true,          // KHONG hoi dan theo thoi gian — chi Qua Nhiet moi nap lai du 4 vien
            banJ(){
                if (this.ammo > 0) this.fireWhisper();
            },
            nhaK(){
                // ===== WHISPER — moc theo so khung GIU (maxChargeFrames = 105) =====
                //   <15f  danh thuong (2 dmg, vien 4 = 4 + 5% mau da mat)
                //   15f   LUU DAN nay 4 lan  | 45f  TIA bam dau an -> khong che
                //   75f   vien NANG 4 dmg (vien 4 = 8) + lam cham toc danh 20%
                if (this.wsChannel){ this.wsChannel = false; this.wsChanT = 0; }
                else {
                    // Cac moc CHARGE ban duoc ke ca dang Overheat — nho vay bo dem 4 vien
                    // chay lien mach, nguoi choi canh duoc vien thu 4 roi vao dau.
                    // Chi DANH THUONG moi phai cho het Overheat.
                    let _h = this.aKeyHeldTime, _sc = this.attackCooldown <= 0;
                    if (_h >= 75 && _sc)      this.wsNang();
                    else if (_h >= 45 && _sc) this.wsTia();
                    else if (_h >= 15 && _sc) this.wsLuuDan();
                    else if (_sc && this.ammo > 0 && !this.isOverheated) this.fireWhisper();
                }
            },
            channel(){
                if (!this.wsChannel){ this.wsChannel = true; this.wsChanT = 0;
                    floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, "ĐỘC TẤU!"));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(260, 0.4, 'sawtooth', 0.22, 900); }
            },
            batUlt(){
                // ===== WHISPER ULT — MAN CUOI: nen doi thanh vu tru, ho den o giua tren.
                // 4 phat cach nhau 2 giay: 16 / 16 / 16 / 64. Tong 8 giay.
                ultCharge = 0;
                this.wsUlt = { t: 0, phat: 0, x: canvas.width/2, y: 88 };
                this.aKeyHeldTime = 0; this.chargeProgress = 0;
                floatingTexts.push(new FloatingText(canvas.width/2 - 70, 130, "MÀN CUỐI!"));
                shakeTimer = Math.max(shakeTimer, 34);
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(90, 0.8, 'sawtooth', 0.32, 40); SFX.tone(1600, 0.3, 'triangle', 0.18, 2200); }
            },
            hoverSac(half){
                if (typeof this.wsTia === 'function') this.wsTia();
            }
        });
// PLAYER_PART_END s4.vkDangKy.11
