// BOSS_FILE: AegisRexBoss
// BOSS_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, enemies, floatingTexts, frames, parry, pickFromBag, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:23305 · Dùng bởi: AegisRexBoss
// BOSS_PART_BEGIN s0.AegisRexBoss.1 EDITABLE
class AegisRexBoss {
            constructor(level) {
                this.hp = 120; this.maxHp = 120;
                this.w = 48 * 1.9; this.h = 44 * 1.9; this.baseX = canvas.width - 200; this.baseY = 320 - this.h;
                this.x = canvas.width; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.actionTimer = 60; this.name = "AEGIS REX"; this.retState = 'return';
                this.subTimer = 0; this.jumpCd = 0; this.facingLeft = true; this.lastSkill = ''; this.burnTimer = 0;
                this.parryCd = 0; this.parryFlash = 0; this.shieldUp = 0; this.shieldHp = 5; this.shieldMax = 5; this.shieldBrokenTimer = 0;
                this.thrShield = null; this.auras = []; this.swordWave = null; this.diveAim = null; this.shudder = 0; this.spin = 0; this.invulnAll = false;
                this.nextUlt = this.maxHp * 0.75;
                this.chargeDir = -1; this.chargeCount = 0; this.recoilDir = 1; this.chargeY = this.baseY;
                this.ultCutIdx = 0; this.jcX = 0; this.jcY = 0; this.jcR = 0;
            }
            moveToward(tx, sp) { if (this.x < tx - sp) this.x += sp; else if (this.x > tx + sp) this.x -= sp; else this.x = tx; }
            keepDist(minD, maxD, backSp, apprSp) { let dx = (dino.x + dino.w/2) - (this.x + this.w/2); if (Math.abs(dx) < minD) this.x -= Math.sign(dx || 1) * (backSp || 5); else if (maxD && Math.abs(dx) > maxD) this.x += Math.sign(dx) * (apprSp || 2.6); this.x = Math.max(30, Math.min(canvas.width - this.w - 30, this.x)); }
            makeWave(cx, dir, hp, R, spd, label) {
                let w = { x: cx - R, y: 322 - R, w: R * 2, h: R, hp: hp, maxHp: hp, R: R, dir: dir, spd: spd,
                    type: 'dinhnuiwave', lastMeleeHit: -1, burnTimer: 0, label: label || "SONG",
                    update: function() {
                        this.x += this.dir * this.spd;
                        if (this.burnTimer > 0) { this.burnTimer--; if (this.burnTimer % 60 === 0) this.hp -= 1; }
                        if (this.x < -this.w - 90 || this.x > canvas.width + 90) this.hp = 0;
                    },
                    draw: function() {
                        let ccx = this.x + this.w/2, f = Math.max(0, this.hp / this.maxHp);
                        for (let L = 0; L < 3; L++) {
                            ctx.strokeStyle = "rgba(64,196,255," + (0.85 - L * 0.22).toFixed(2) + ")";
                            ctx.lineWidth = 9 - L * 2;
                            ctx.beginPath(); ctx.arc(ccx, 322, Math.max(6, this.R - L * 11), Math.PI, Math.PI * 2); ctx.stroke();
                        }
                        ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.arc(ccx, 322, Math.max(4, this.R - 5), Math.PI, Math.PI * 2); ctx.stroke();
                        ctx.fillStyle = "black"; ctx.fillRect(ccx - 32, 322 - this.R - 20, 64, 8);
                        ctx.fillStyle = "#40C4FF"; ctx.fillRect(ccx - 31, 322 - this.R - 19, 62 * f, 6);
                        ctx.fillStyle = "#FFF"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText(this.label + " " + Math.max(0, Math.ceil(this.hp)), ccx, 322 - this.R - 24); ctx.textAlign = "left";
                    } };
                enemies.push(w); return w;
            }
            setChargePath() {
                this.chargeFromY = this.y;
                this.chargeToY = Math.min(this.baseY, Math.max(24, (dino.y + dino.h/2) - this.h/2));
                this.chargeX0 = this.x;
                this.chargeX1 = this.chargeDir < 0 ? (-this.w - 40) : (canvas.width + 40);
            }
            startNextCharge(fromSide) {
                this.chargeDir = fromSide < 0 ? 1 : -1;
                this.chargeY = Math.min(this.baseY, Math.max(24, (dino.y + dino.h/2) - this.h/2));
                this.x = fromSide < 0 ? 8 : canvas.width - this.w - 8;
                this.y = this.chargeY; this.state = 'charge_warn2'; this.subTimer = 0;
            }
            tryParry() {
                if (this.parryCd > 0 || this.shieldBrokenTimer > 0) return;
                let cx = this.x + this.w/2, cy = this.y + this.h/2;
                for (let i = projectiles.length - 1; i >= 0; i--) {
                    let p = projectiles[i], px = p.x + p.w/2, py = p.y + p.h/2, dx = px - cx;
                    if (Math.abs(dx) < 100 && Math.abs(py - cy) < 76 && (p.speed || 0) * dx < 0) {
                        let tx = dino.x + dino.w/2, ty = dino.y + dino.h/2, ddx = tx - cx, ddy = ty - cy, d = Math.hypot(ddx, ddy) || 1, sp = 8.5;
                        let bp = new BossProjectile(cx - 8, cy - 8, ddx/d*sp, ddy/d*sp, false, 1);
                        bp.reflected = true; bp.color = "#40C4FF"; bp.w = 16; bp.h = 16;
                        bossProjectiles.push(bp); projectiles.splice(i, 1);
                        this.parryCd = 90; this.shieldUp = 40; this.parryFlash = 14; this.facingLeft = dx < 0;
                        floatingTexts.push(new FloatingText(this.x, this.y - 16, "PARRY!")); if (SFX.parry) SFX.parry();
                        return;
                    }
                }
            }
            hitShield(sd, hx, hy) {
                this.shieldHp -= sd;
                visualEffects.push(new Effect(hx, hy, 'parry', false));
                if (this.shieldHp <= 0) {
                    this.shieldHp = 0; this.shieldBrokenTimer = 150; this.parryCd = 150; shakeTimer = Math.max(shakeTimer, 26);
                    for (let k = 0; k < 3; k++) visualEffects.push(new Effect(this.x + this.w/2 + (Math.random()-0.5)*40, this.y + this.h/2 + (Math.random()-0.5)*40, 'parry', false));
                    visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion', true, 30));
                    floatingTexts.push(new FloatingText(this.x - 6, this.y - 20, "VỠ KHIÊN!")); if (SFX.glassBreak) SFX.glassBreak();
                }
            }
            updateUlt() {
                shakeTimer = Math.max(shakeTimer, 5); this.y = this.baseY; this.dy = 0; this.grounded = true;
                if (this.state === 'ult_start') {
                    this.subTimer++;
                    if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x + this.w/2 - 40, this.y - 20, "PHÁN QUYẾT!")); this.x = Math.max(60, Math.min(canvas.width - this.w - 60, this.x)); }
                    this.moveToward(this.baseX, 8);
                    if (this.subTimer > 40) { this.state = 'ult_warn'; this.subTimer = 0; this.ultCutIdx = 0; this.jcX = dino.x + dino.w/2; this.jcY = dino.y + dino.h/2; this.jcR = 140; }
                }
                else if (this.state === 'ult_warn') { this.subTimer++; if (this.subTimer >= 30) { this.state = 'ult_slash'; this.subTimer = 0; shakeTimer = 20; if (SFX.glassBreak) SFX.glassBreak(); } }
                else if (this.state === 'ult_slash') {
                    this.subTimer++;
                    if (this.subTimer === 2) { let inside = Math.hypot((dino.x + dino.w/2) - this.jcX, (dino.y + dino.h/2) - this.jcY) <= this.jcR; if (inside) { if (dino.isShielding()) parry(); else dino.takeDamage(1); } }
                    if (this.subTimer > 30) { this.ultCutIdx++; if (this.ultCutIdx < 3) { this.state = 'ult_rest'; this.subTimer = 0; } else { this.state = 'ult_final_warn'; this.subTimer = 0; shakeTimer = 30; this.jcX = canvas.width/2; this.jcY = 200; this.jcR = Math.round(canvas.width/3); } }
                }
                else if (this.state === 'ult_rest') { this.subTimer++; if (this.subTimer >= 30) { this.state = 'ult_warn'; this.subTimer = 0; this.jcX = dino.x + dino.w/2; this.jcY = dino.y + dino.h/2; this.jcR = 140; } }
                else if (this.state === 'ult_final_warn') { this.subTimer++; this.jcX = canvas.width/2; this.jcY = 200; this.jcR = Math.round(canvas.width/3); if (this.subTimer >= 54) { this.state = 'ult_final_slash'; this.subTimer = 0; shakeTimer = 60; if (SFX.glassBreak) SFX.glassBreak(); } }
                else if (this.state === 'ult_final_slash') {
                    this.subTimer++; shakeTimer = 16;
                    if (this.subTimer === 3) { let inside = Math.hypot((dino.x + dino.w/2) - this.jcX, (dino.y + dino.h/2) - this.jcY) <= this.jcR; if (inside) { if (dino.isShielding()) parry(); else dino.takeDamage(2); } }
                    if (this.subTimer > 44) { this.state = 'ult_end'; this.subTimer = 0; }
                }
                else if (this.state === 'ult_end') { this.subTimer++; this.invulnAll = false; this.moveToward(this.baseX, 6); if (this.subTimer > 20) { this.state = 'idle'; this.actionTimer = 46; this.parryCd = 30; } }
            }
            draw() {
                // ===== khien dang bay =====
                if (this.thrShield) {
                    let t = this.thrShield;
                    ctx.save(); ctx.translate(t.x, t.y); ctx.rotate(t.spin);
                    ctx.fillStyle = "#0277BD"; ctx.beginPath();
                    ctx.moveTo(0, -26); ctx.lineTo(22, -12); ctx.lineTo(22, 12); ctx.lineTo(0, 28); ctx.lineTo(-22, 12); ctx.lineTo(-22, -12); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#40C4FF"; ctx.beginPath();
                    ctx.moveTo(0, -16); ctx.lineTo(13, -7); ctx.lineTo(13, 7); ctx.lineTo(0, 17); ctx.lineTo(-13, 7); ctx.lineTo(-13, -7); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#01579B"; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("KHONG CON KHIEN - DANH DI!", canvas.width/2, 40); ctx.textAlign = "left";
                }
                // ===== kiem khi 6 mau =====
                // ===== duong ngam bo nhao =====
                if (this.state === 'dive_prep' && this.diveAim) {
                    ctx.strokeStyle = this.diveAim.locked ? "#40C4FF" : "rgba(64,196,255,0.4)";
                    ctx.lineWidth = this.diveAim.locked ? 6 : 3;
                    ctx.beginPath(); ctx.moveTo(this.x + this.w/2, this.y + this.h/2);
                    ctx.lineTo(this.x + this.w/2 + this.diveAim.vx * 60, this.y + this.h/2 + this.diveAim.vy * 60); ctx.stroke();
                }
                if (this.state === 'sw_prep') {
                    let dir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    let k = 1 - this.subTimer / 50, gx = this.x + this.w/2 + dir * 46;
                    ctx.strokeStyle = "rgba(255,235,59," + (0.4 + k*0.5).toFixed(2) + ")"; ctx.lineWidth = 4 + k * 6;
                    ctx.beginPath(); ctx.moveTo(gx - dir * 16, 214); ctx.lineTo(gx + dir * 18, 308); ctx.stroke();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("KHIEN HOA KIEM!", this.x + this.w/2, this.y - 22); ctx.textAlign = "left";
                }
                let x = this.x, y = this.y, w = this.w, h = this.h, cx = x + w/2, cy = y + h/2;
                ctx.save();
                let ap = 0.12 + Math.sin(frames * 0.1) * 0.06;
                ctx.fillStyle = "rgba(0,140,255," + ap + ")"; ctx.beginPath(); ctx.arc(cx, cy, w * 0.66, 0, Math.PI*2); ctx.fill();
                let legAnim = (((!this.grounded) || this.state.indexOf('charg') >= 0) && frames % 12 < 6) ? 4 : 0;
                let BS = 1.9 / 1.5, bw = 48 * 1.5, bh = 44 * 1.5;
                ctx.save(); ctx.translate(cx, cy); ctx.scale(BS, BS); ctx.translate(-cx, -cy);
                dino.drawForm(false, cx - bw/2, cy - bh/2, legAnim, 1, this.facingLeft);
                ctx.restore();

                // ================= CHI GIAP VAI + GIAP LUNG (om sat than) =================
                let sd2 = this.facingLeft ? -1 : 1;
                let plateDk = "#1A2430", plateLt = "#4A637E";
                // giap lung
                ctx.fillStyle = plateDk;
                ctx.beginPath();
                ctx.moveTo(cx - sd2*w*0.06, cy - h*0.22); ctx.lineTo(cx - sd2*w*0.24, cy - h*0.14);
                ctx.lineTo(cx - sd2*w*0.23, cy + h*0.10); ctx.lineTo(cx - sd2*w*0.07, cy + h*0.06);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#0A121B"; ctx.lineWidth = 2; ctx.stroke();
                ctx.fillStyle = "#5C7894";                                   // 2 gai nho tren lung
                for (let k = 0; k < 2; k++) { let gx = cx - sd2*(w*0.12 + k*w*0.08), gy = cy - h*0.16 + k*h*0.10;
                    ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx - sd2*w*0.08, gy - h*0.09);
                    ctx.lineTo(gx - sd2*w*0.02, gy + h*0.04); ctx.closePath(); ctx.fill(); }
                // giap vai truoc + 3 gai
                ctx.fillStyle = plateLt;
                ctx.beginPath();
                ctx.moveTo(cx + sd2*w*0.04, cy - h*0.24); ctx.lineTo(cx + sd2*w*0.27, cy - h*0.17);
                ctx.lineTo(cx + sd2*w*0.28, cy + h*0.00); ctx.lineTo(cx + sd2*w*0.06, cy - h*0.03);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#0A121B"; ctx.lineWidth = 2; ctx.stroke();
                ctx.fillStyle = "#B9D6F2";
                for (let k = 0; k < 3; k++) {
                    let gx = cx + sd2*(w*0.08 + k*w*0.07), gy = cy - h*0.22 + k*h*0.02;
                    ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + sd2*w*0.03, gy - h*0.17);
                    ctx.lineTo(gx + sd2*w*0.07, gy + h*0.01); ctx.closePath(); ctx.fill();
                }
                // ===== VET NUT PHAT SANG (dac diem nhan dang) =====
                let cpv = 0.55 + Math.sin(frames * 0.16) * 0.3;
                ctx.save(); ctx.strokeStyle = "rgba(0,225,255," + cpv.toFixed(2) + ")"; ctx.lineWidth = 2.2;
                ctx.shadowBlur = 9; ctx.shadowColor = "#00B0FF";
                let crk = (p) => { ctx.beginPath(); ctx.moveTo(cx + p[0]*w, cy + p[1]*h);
                    for (let k = 2; k < p.length; k += 2) ctx.lineTo(cx + p[k]*w, cy + p[k+1]*h); ctx.stroke(); };
                crk([-0.10,-0.20, -0.02,-0.06, -0.12,0.04, -0.04,0.20]);
                crk([0.06,-0.16, 0.14,-0.04, 0.07,0.12]);
                crk([-0.14,0.08, -0.04,0.14, -0.09,0.28]);
                crk([sd2*0.12,-0.16, sd2*0.22,-0.10, sd2*0.16,-0.02]);
                ctx.restore();
                let ex = this.facingLeft ? cx - w * 0.24 : cx + w * 0.24, ey = cy - h * 0.24;
                ctx.save(); ctx.shadowBlur = 14; ctx.shadowColor = "#00E5FF"; ctx.fillStyle = "#DFFAFF";
                ctx.beginPath(); ctx.arc(ex, ey, 4.2, 0, Math.PI*2); ctx.fill(); ctx.restore();
                ctx.restore();
                if (this.shieldBrokenTimer > 0) { ctx.save(); ctx.globalAlpha = 0.4 + Math.sin(frames*0.4)*0.2; ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3; ctx.shadowBlur = 12; ctx.shadowColor = "#FF1744"; ctx.beginPath(); ctx.arc(cx, cy, w * 0.5, 0, Math.PI*2); ctx.stroke(); ctx.restore(); }
                else if (this.invulnAll) {                                 // chi con vong bao ve luc bat kha xam pham
                    ctx.save(); ctx.shadowBlur = 14; ctx.shadowColor = "#00B0FF";
                    ctx.strokeStyle = this.parryFlash > 0 ? "#EAFBFF" : "#40C4FF"; ctx.lineWidth = 4;
                    ctx.fillStyle = "rgba(0,180,255,0.16)";
                    ctx.beginPath(); ctx.arc(cx, cy, w * 0.62, 0, Math.PI*2);
                    ctx.fill(); ctx.stroke(); ctx.restore();
                }
                if (this.state === 'charge_warn' || this.state === 'charge_warn2') {
                    // vach bao phai TRUNG duong bay that (huc gio di CHEO)
                    let ox = this.x + this.w/2, oy = this.y + this.h/2;
                    let _tY = Math.min(this.baseY, Math.max(24, (dino.y + dino.h/2) - this.h/2));
                    let ex = (this.chargeDir < 0 ? -40 : canvas.width + 40), ey = _tY + this.h/2;
                    let ly = oy;
                    ctx.save(); ctx.strokeStyle = (frames % 8 < 4) ? "#40C4FF" : "rgba(0,180,255,0.35)"; ctx.lineWidth = 4; ctx.setLineDash([16,10]); ctx.shadowBlur = 8; ctx.shadowColor = "#00B0FF";
                    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.setLineDash([]);
                    ctx.strokeStyle = "rgba(64,196,255,0.22)"; ctx.lineWidth = this.h;
                    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke();
                    ctx.fillStyle = "#40C4FF"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("LAO KHIÊN — TRÁNH!", canvas.width/2, ly - 8); ctx.textAlign = "left"; ctx.restore();
                }
                if (this.state === 'ult_warn' || this.state === 'ult_slash') {
                    ctx.save(); ctx.strokeStyle = (frames % 8 < 4) ? "#40C4FF" : "rgba(0,180,255,0.4)"; ctx.lineWidth = 3; ctx.shadowBlur = 10; ctx.shadowColor = "#00B0FF";
                    ctx.beginPath(); ctx.arc(this.jcX, this.jcY, this.jcR, 0, Math.PI*2); ctx.stroke();
                    ctx.fillStyle = "rgba(0,150,255,0.10)"; ctx.beginPath(); ctx.arc(this.jcX, this.jcY, this.jcR, 0, Math.PI*2); ctx.fill();
                    if (this.state === 'ult_slash') {
                        ctx.strokeStyle = "#EAFBFF"; ctx.lineWidth = 2.5;
                        for (let i = 0; i < 10; i++) { if (this.subTimer >= i) { let a = i * 0.62, dx = Math.cos(a), dy = Math.sin(a), off = ((i % 5) - 2) * (this.jcR * 0.5), pxx = -dy, pyy = dx, L = this.jcR * 1.15, ox = this.jcX + pxx * off, oy = this.jcY + pyy * off; ctx.globalAlpha = Math.max(0, 1 - (this.subTimer - i) / 14); ctx.beginPath(); ctx.moveTo(ox - dx * L, oy - dy * L); ctx.lineTo(ox + dx * L, oy + dy * L); ctx.stroke(); } }
                        ctx.globalAlpha = 1;
                    }
                    ctx.fillStyle = "#40C4FF"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("TRÁNH RA!", this.jcX, this.jcY - this.jcR - 6); ctx.textAlign = "left"; ctx.restore();
                }
                if (this.state === 'ult_final_warn' || this.state === 'ult_final_slash') {
                    ctx.save();
                    ctx.fillStyle = "rgba(0,16,36," + (0.12 + Math.sin(frames * 0.3) * 0.08) + ")"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = (frames % 6 < 3) ? "#FFFFFF" : "#40C4FF"; ctx.lineWidth = 4; ctx.shadowBlur = 16; ctx.shadowColor = "#00B0FF";
                    ctx.beginPath(); ctx.arc(this.jcX, this.jcY, this.jcR, 0, Math.PI*2); ctx.stroke();
                    ctx.fillStyle = "rgba(0,150,255,0.10)"; ctx.beginPath(); ctx.arc(this.jcX, this.jcY, this.jcR, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = (frames % 12 < 6) ? "#EAFBFF" : "#40C4FF"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("PHÁN QUYẾT TẬN THẾ — RA RÌA MÀN HÌNH!", canvas.width/2, 52);
                    if (this.state === 'ult_final_slash') {
                        ctx.strokeStyle = "#fff"; ctx.lineWidth = 3;
                        for (let i = 0; i < 20; i++) { if (this.subTimer >= i) { let a = i * 0.5, dx = Math.cos(a), dy = Math.sin(a), off = ((i % 9) - 4) * 70, pxx = -dy, pyy = dx, L = 700, ox = this.jcX + pxx * off, oy = this.jcY + pyy * off * 0.5; ctx.globalAlpha = Math.max(0, 1 - (this.subTimer - i) / 20); ctx.beginPath(); ctx.moveTo(ox - dx * L, oy - dy * L); ctx.lineTo(ox + dx * L, oy + dy * L); ctx.stroke(); } }
                        ctx.globalAlpha = 1;
                    }
                    ctx.textAlign = "left"; ctx.restore();
                }
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 160, 18, 320, 14);
                ctx.fillStyle = "#40C4FF"; ctx.fillRect(canvas.width/2 - 158, 20, 316 * Math.max(0, this.hp/this.maxHp), 10);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText(this.name, canvas.width/2, 14); ctx.restore();
                if (this.invulnAll) { ctx.fillStyle = "#40C4FF"; ctx.font = "bold 10px Consolas, monospace"; ctx.fillText("BẤT KHẢ XÂM PHẠM", canvas.width/2, 44); }
                else if (this.shieldBrokenTimer > 0) { ctx.fillStyle = (frames % 12 < 6) ? "#FF5252" : "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.fillText("VỠ KHIÊN — ĐÁNH ĐI!", canvas.width/2, 44); }
                else { ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.fillRect(canvas.width/2 - 40, 37, 80, 7); ctx.fillStyle = "#40C4FF"; ctx.fillRect(canvas.width/2 - 40, 37, 80 * Math.max(0, this.shieldHp / this.shieldMax), 7); ctx.strokeStyle = "rgba(255,255,255,0.45)"; ctx.lineWidth = 1; ctx.strokeRect(canvas.width/2 - 40, 37, 80, 7); }
                ctx.textAlign = "left";
            }
            update() {
                this.dy += 0.65; this.y += this.dy;
                if (this.y >= this.baseY) { this.y = this.baseY; this.dy = 0; this.grounded = true; }
                if (this.jumpCd > 0) this.jumpCd--;
                if (this.parryCd > 0) this.parryCd--;
                if (this.shieldUp > 0) this.shieldUp--;
                if (this.parryFlash > 0) this.parryFlash--;
                if (this.shieldBrokenTimer > 0) { this.shieldBrokenTimer--; if (this.shieldBrokenTimer === 0) { this.shieldHp = this.shieldMax; floatingTexts.push(new FloatingText(this.x, this.y - 16, "KHIÊN HỒI!")); } }
                if (this.state === 'entering') { this.x -= 4; this.faceP(); if (this.x <= this.baseX) { this.x = this.baseX; this.state = 'intro'; this.subTimer = 0; } return; }
                if (this.state === 'intro') {
                    this.subTimer++; shakeTimer = 4;
                    if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x + this.w/2 - 30, this.y - 12, "AEGIS REX!")); visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion')); }
                    if (this.subTimer > 46) { this.state = 'idle'; this.actionTimer = 48; }
                    return;
                }
                if (this.state.indexOf('ult_') !== 0 && this.hp > 0 && this.hp <= this.nextUlt) {
                    this.nextUlt -= this.maxHp * 0.25; this.state = 'ult_start'; this.subTimer = 0; this.invulnAll = true; this.shieldHp = this.shieldMax; this.shieldBrokenTimer = 0; shakeTimer = 30; if (SFX.bossEntry) SFX.bossEntry();
                    return;
                }
                // ---- kiem khi 6 mau: phai ban vo, khong thi an don ----
                if (this.swordWave) {
                    let sw2 = this.swordWave;
                    if (enemies.indexOf(sw2) < 0) {                          // da bi pha bang BAT KY loai sat thuong nao
                        visualEffects.push(new Effect(sw2.x + 30, 270, 'explosion', true, 46));
                        floatingTexts.push(new FloatingText(sw2.x, 240, "VO KIEM KHI!")); this.swordWave = null;
                    } else if (sw2.x < -90 || sw2.x > canvas.width + 90) {
                        let k = enemies.indexOf(sw2); if (k >= 0) enemies.splice(k, 1); this.swordWave = null;
                    }
                }
                if (this.state.indexOf('ult_') === 0) { this.updateUlt(); return; }
                if (this.state === 'idle' || this.state === 'return' || this.state === 'charge_hold') this.tryParry();
                if (this.state === 'idle') {
                    this.faceP(); this.keepDist(240, 400, 4, 2.4); this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let pool = ['charge', 'charge', 'throw', 'slam', 'sword'].filter(k => k !== this.lastSkill);
                        let c = pickFromBag(this, pool);
                        if (c === 'throw')      { this.state = 'thr_wind'; this.subTimer = 34; this.shudder = 34; }
                        else if (c === 'slam')  { this.state = 'slam_prep'; this.subTimer = 40; }
                        else if (c === 'sword') { this.state = 'sw_prep'; this.subTimer = 50; }
                        else { this.state = 'charge_hold'; this.subTimer = 0; this.shieldUp = 200; }
                    }
                }
                // ================= NEM KHIEN: hoi khien bay la boss HO HOAN TOAN =================
                else if (this.state === 'thr_wind') {
                    this.faceP(); this.subTimer--; this.shudder = this.subTimer; shakeTimer = Math.max(shakeTimer, 3);
                    if (this.subTimer <= 0) {
                        let dir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                        this.thrShield = { x: this.x + this.w/2, y: this.y + this.h/2, dir: dir, spin: 0, back: false };
                        this.shieldHp = 0;                                  // MAT KHIEN -> ho
                        this.state = 'thr_fly'; this.subTimer = 0; if (SFX.bossSkill) SFX.bossSkill();
                        floatingTexts.push(new FloatingText(this.x, this.y - 20, "NEM KHIEN!"));
                    }
                }
                else if (this.state === 'thr_fly') {
                    this.subTimer++;
                    let t = this.thrShield; t.spin += 0.4; t.x += t.dir * 13;
                    if (checkAABB(dino, { x: t.x - 26, y: t.y - 26, w: 52, h: 52 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    for (let i = projectiles.length - 1; i >= 0; i--) {     // ban vao khien -> hat no di xa, keo dai thoi gian ho
                        let p = projectiles[i];
                        if (Math.abs((p.x + p.w/2) - t.x) < 40 && Math.abs((p.y + p.h/2) - t.y) < 40) {
                            t.x += t.dir * 46; visualEffects.push(new Effect(t.x, t.y, 'explosion', true, 16));
                            projectiles.splice(i, 1); break;
                        }
                    }
                    let edge = t.dir < 0 ? 40 : canvas.width - 40;
                    if ((t.dir < 0 && t.x <= edge) || (t.dir > 0 && t.x >= edge)) {
                        t.x = edge; this.state = 'thr_tp'; this.subTimer = 12;
                    }
                }
                else if (this.state === 'thr_tp') {
                    this.subTimer--;
                    if (this.subTimer === 6) {
                        visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion', true, 34));
                        this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.thrShield.x - this.w/2));
                        this.y = this.baseY; this.dy = 0; this.grounded = true;
                        visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion', true, 40));
                        shakeTimer = 20;
                    }
                    if (this.subTimer <= 0) { this.state = 'thr_slam'; this.subTimer = 30; this.spin = 0; }
                }
                else if (this.state === 'thr_slam') {
                    this.subTimer--; this.spin += 0.55;
                    if (this.subTimer === 8) {
                        shakeTimer = 34; if (SFX.bossExplode) SFX.bossExplode();
                        let dir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                        for (let k = 0; k < 3; k++) this.makeWave(this.x + this.w/2 - dir * k * 74, dir, 3, 76, 6.6, "SONG");
                        visualEffects.push(new Effect(this.x + this.w/2, 300, 'explosion', true, 50));
                        this.thrShield = null; this.shieldHp = this.shieldMax;   // lay lai khien
                    }
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 70; }
                }
                // ================= CHAN DIA =================
                else if (this.state === 'slam_prep') { this.faceP(); this.subTimer--; this.y -= 3.2;
                    if (this.subTimer <= 0) { this.state = 'slam_fall'; } }
                else if (this.state === 'slam_fall') {
                    this.y += 14;
                    if (this.y >= this.baseY) {
                        this.y = this.baseY; this.dy = 0; this.grounded = true; shakeTimer = 32; if (SFX.bossSkill) SFX.bossSkill();
                        let cx = this.x + this.w/2;
                        this.makeWave(cx - 40, -1, 4, 92, 7.2, "CHAN DIA");
                        this.makeWave(cx + 40,  1, 4, 92, 7.2, "CHAN DIA");
                        visualEffects.push(new Effect(cx, 308, 'explosion', true, 44));
                        this.state = 'idle'; this.actionTimer = 66;
                    }
                }
                // ================= BO NHAO CHEO CO TARGET =================
                else if (this.state === 'dive_prep') {
                    this.subTimer--; this.y += ((this.baseY - 110) - this.y) * 0.12;
                    if (this.subTimer > 16) { let cx = this.x + this.w/2, cy = this.y + this.h/2;
                        let ddx = (dino.x + dino.w/2) - cx, ddy = (dino.y + dino.h/2) - cy, dd = Math.hypot(ddx, ddy) || 1;
                        this.diveAim = { vx: ddx/dd * 17, vy: ddy/dd * 17, locked: false }; }
                    else if (this.diveAim) this.diveAim.locked = true;
                    if (this.subTimer <= 0) { this.state = 'dive_go'; this.subTimer = 60; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'dive_go') {
                    this.subTimer--; this.x += this.diveAim.vx; this.y += this.diveAim.vy;
                    this.facingLeft = this.diveAim.vx < 0;
                    if (checkAABB(dino, this)) { if (!dino.isShielding()) dino.takeDamage(1); else { parry(); this.state = 'return'; return; } }
                    if (this.y >= this.baseY) { this.y = this.baseY; this.grounded = true;
                        visualEffects.push(new Effect(this.x + this.w/2, 308, 'explosion', true, 34)); shakeTimer = 22;
                        this.state = 'idle'; this.actionTimer = 62; }
                    if (this.x < -60 || this.x > canvas.width + 60 || this.subTimer <= 0) {
                        this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x)); this.y = this.baseY;
                        this.state = 'idle'; this.actionTimer = 62; }
                }
                // ================= KHIEN HOA KIEM: song chan 6 MAU, phai ban vo =================
                else if (this.state === 'sw_prep') {
                    this.faceP(); this.subTimer--;
                    if (this.subTimer <= 0) {
                        this.state = 'sw_slash'; this.subTimer = 26; shakeTimer = 26; if (SFX.bossSkill) SFX.bossSkill();
                        let dir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                        let _w = this.makeWave(this.x + this.w/2 + dir * 46, dir, 6, 118, 4.6, "KIEM KHI");
                        this.swordWave = _w;
                        floatingTexts.push(new FloatingText(this.x, this.y - 20, "KIEM KHI! BAN VO NO!"));
                    }
                }
                else if (this.state === 'sw_slash') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 72; } }
                else if (this.state === 'charge_hold') {
                    this.faceP(); this.subTimer++;
                    if (this.subTimer < 38) {                       // dang CHON vi tri: bam theo nguoi choi
                        this.chargeY = Math.min(this.baseY, Math.max(24, (dino.y + dino.h/2) - this.h/2));
                        this.chargeDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                        let ty = this.chargeY; this.y += (ty - this.y) * 0.10; this.grounded = (this.y >= this.baseY - 1);
                    }
                    if (this.subTimer >= 50) { this.state = 'charge_warn'; this.subTimer = 0; this.chargeCount = 0;
                        this.chargeY = Math.min(this.baseY, Math.max(24, (dino.y + dino.h/2) - this.h/2));
                        this.chargeDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    }
                }
                else if (this.state === 'charge_warn') {
                    this.subTimer++; shakeTimer = 3; this.facingLeft = this.chargeDir < 0;
                    if (this.subTimer >= 45) { this.setChargePath(); this.state = 'charging'; this.subTimer = 0; shakeTimer = 12; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'charging') {
                    this.subTimer++; this.dy = 0;
                    this.x += this.chargeDir * 30;
                    let _sp = (this.chargeX1 - this.chargeX0) || 1;
                    let _t = Math.max(0, Math.min(1, (this.x - this.chargeX0) / _sp));
                    this.y = this.chargeFromY + (this.chargeToY - this.chargeFromY) * _t;      // duong CHEO thang, khong troi
                    this.grounded = (this.y >= this.baseY - 1); this.facingLeft = this.chargeDir < 0;
                    if (checkAABB(dino, this)) {
                        if (dino.isShielding()) {
                            parry(); floatingTexts.push(new FloatingText(this.x, this.y - 16, "ĐỠ!")); shakeTimer = 16;
                            this.chargeCount++;
                            if (this.chargeCount >= 4) { this.state = 'return'; }
                            else { this.startNextCharge(-this.chargeDir); }
                        } else { dino.takeDamage(1); }
                    }
                    if (this.state === 'charging' && (this.x < -this.w - 20 || this.x > canvas.width + 20)) {
                        let exitSide = this.x < 0 ? -1 : 1; this.chargeCount++;
                        if (this.chargeCount >= 4) { this.x = exitSide < 0 ? -this.w : canvas.width; this.state = 'return'; }
                        else { this.startNextCharge(exitSide); }
                    }
                }
                else if (this.state === 'charge_warn2') {
                    this.subTimer++; this.y = this.chargeY; this.dy = 0; this.facingLeft = this.chargeDir < 0; shakeTimer = 2;
                    if (this.subTimer >= 55) { this.setChargePath(); this.state = 'charging'; this.subTimer = 0; shakeTimer = 10; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'return') {
                    this.chargeY = this.baseY; this.y = this.baseY; this.dy = 0; this.grounded = true; this.moveToward(this.baseX, 10);
                    if (Math.abs(this.x - this.baseX) < 14) { this.x = this.baseX; this.state = 'idle'; this.actionTimer = 50; }
                }
            }
        }
// BOSS_PART_END s0.AegisRexBoss.1

// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24480 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GiantSpiderBoss, GreatSerpentBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MosaBoss, MountainGodBoss, PoisonMothBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, VoltCloneBoss
// BOSS_PART_BEGIN s0.hudManHinh.1 READ_ONLY
function hudManHinh(b){
            if (_tbbDaVeKhung !== frames){ _tbbDaVe.clear(); _tbbDaVeKhung = frames; }
            _tbbDaVe.add(b);
            // nhieu boss cung tu ve thanh (dau tay doi) -> thanh sau xep xuong hang duoi
            if (_tbbKhung === frames) _tbbSo++; else { _tbbSo = 0; _tbbKhung = frames; }
            let d = (typeof DPR === 'number') ? DPR : 1;
            let dy = ((typeof dojoMode !== 'undefined' && dojoMode) ? 42 : 0) + _tbbSo * 40;
            ctx.setTransform(d, 0, 0, d, 0, dy * d);
        }
// BOSS_PART_END s0.hudManHinh.1

// Nguồn: index.html:100017 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s6.BOSS_CHUNG.1 READ_ONLY
const BOSS_CHUNG = {
            cx(){ return this.x + this.w / 2; },
            cy(){ return this.y + this.h / 2; },
            gap(){ return (dino.x + dino.w / 2) - this.cx(); },
            dir(){ return this.facingLeft ? -1 : 1; },
            faceP(){ this.facingLeft = (dino.x + dino.w / 2) < this.cx(); },
            hurtP(n){
                if (!dino.isShielding()) dino.takeDamage(n);
                else parry();
            }
        };
// BOSS_PART_END s6.BOSS_CHUNG.1

// Nguồn: index.html:100028 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s6.capBoHamChung.1 READ_ONLY
(function capBoHamChung(){
            const DS = [
            PteroBoss, QuetzalBoss, TRexBoss, TriceratopsBoss,
            SpinoBoss, GodzillaBoss, CloneBoss, LavaSerpentBoss,
            GreatSerpentBoss, StormEagleBoss, PoisonMothBoss, IndominusBoss,
            GiantSpiderBoss, ForestTitanBoss, UnityCloneBoss, VergilBoss,
            DanteBoss, NeroBoss, WarBoss, DeathBoss,
            ArtoriasBoss, HoGacBoss, ClawCloneBoss, FireCloneBoss, AegisRexBoss,
            SummitDragonBoss, ArcanaRexBoss, TetrisBoss, VoltCloneBoss,
            TriDino, MosaBoss, FlameCoreBoss, FlameLancerBoss,
            EmberWolfBoss, MagmaDragoonBoss, IaiRaptorBoss, SiegeGoliathBoss,
            EchoStalkerBoss, SporeCrownBoss, ScarabLordBoss, ChronoRexBoss, YasuoBoss, Yasuo2Boss, TyrantRexBoss,
            ZeroBoss, MegaManXBoss, GaelBoss, SoulOfCinderBoss, CorruptionBoss, OctopusBoss, PontiffBoss, SpinoLordBoss, TriceratopsLordBoss, PteroLordBoss, MegalodonBoss, ThalassaBoss,
            Effect, FloatingText,
            Projectile, BossProjectile, WindBlade, Obstacle,
            Heart, Pterodactyl, Raptor, ForestShooter,
            LavaDino, SummitBat, Player, TrainingDummy
            , DilophosBoss, MagmorBoss, PillarLordBoss, IceFangBoss, VajraRexBoss, FireDragonBoss, DragonLordBoss, SlashBeastBoss, StoneRocBoss, CliffGolemBoss, MountainGodBoss, GreatApeBoss, PulsarCloneBoss
            ];
            for (const C of DS){
                if (typeof C !== 'function') continue;
                for (const k of Object.keys(BOSS_CHUNG))
                    if (!Object.prototype.hasOwnProperty.call(C.prototype, k))
                        C.prototype[k] = BOSS_CHUNG[k];
            }
        })();
// BOSS_PART_END s6.capBoHamChung.1
