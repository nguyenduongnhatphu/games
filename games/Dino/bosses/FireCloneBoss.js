// BOSS_FILE: FireCloneBoss
// BOSS_SNAPSHOT: c46ab032a6cbf762cde49e8ab251e6d69cdda9d15fe744f89765bcb84b9046a7
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, doChieuBatDau, doChieuLay, doChieuMo, dojoMode, floatingTexts, frames, lavaFlood, parry, pickFromBag, platforms, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:22587 · Dùng bởi: FireCloneBoss
// BOSS_PART_BEGIN s0.FireCloneBoss.1 EDITABLE
class FireCloneBoss {
            constructor(level) {
                this.hp = 100; this.maxHp = 100;
                this.w = 48 * 1.5; this.h = 44 * 1.5; this.baseX = canvas.width - 200; this.baseY = 320 - this.h;
                this.x = canvas.width; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.actionTimer = 60; this.name = "VULCAN REX"; this.retState = 'idle';
                this.subTimer = 0; this.shotCount = 0; this.jumpCd = 0; this.lastMeleeHit = -1;
                this.lastSkill = ''; this.burnTimer = 0; this.facingLeft = true;
                this.chargeTimer = 0; this.chargeVariant = 0; this.ignited = false;
                this.groundFires = []; this.meteors = []; this.pillars = []; this.laserTimer = 0; this.laserAngle = 0; this.beamClashX = 0; this.beamDir = -1; this.beamMouthX = 0; this.beamMouthY = 0; this.lavaLockX = 0; this.lavaTeleOn = false; this.lavaEruptOn = false; this.usedSuperNova = false; this.novaX = 0; this.novaY = 0; this.novaR = 30; this.snCount = 0; this.snPhase = ''; this.snSideDir = -1;
            }
            moveToward(tx, sp) { if (this.x < tx - sp) this.x += sp; else if (this.x > tx + sp) this.x -= sp; else this.x = tx; }
            tryJump(pow) { if (this.grounded && this.jumpCd <= 0) { this.dy = pow || -13; this.grounded = false; this.jumpCd = 45; } }
            keepDist(minD, maxD, backSp, apprSp) { let dx = (dino.x + dino.w/2) - (this.x + this.w/2); if (Math.abs(dx) < minD) this.x -= Math.sign(dx || 1) * (backSp || 5); else if (maxD && Math.abs(dx) > maxD) this.x += Math.sign(dx) * (apprSp || 2.6); this.x = Math.max(30, Math.min(canvas.width - this.w - 30, this.x)); }
            addGroundFire(cx, w, life) { this.groundFires.push({ x: cx - w/2, w: w, life: life }); }
            spawnFireball(speed) {
                let sx = this.x + this.w/2, sy = this.y + 20;
                let dx = (dino.x + dino.w/2) - sx, dy = (dino.y + dino.h/2) - sy, d = Math.hypot(dx, dy) || 1;
                let bp = new BossProjectile(sx - 12, sy - 12, dx/d*speed, dy/d*speed, false, 1);
                bp.fire = true; bp.w = 24; bp.h = 24;
                bossProjectiles.push(bp); SFX.bossSkill && SFX.bossSkill();
            }
            draw() {
                let x = this.x, y = this.y; ctx.save();
                // GROUND FIRES
                this.groundFires.forEach(gf => {
                    let a = Math.min(1, gf.life / 30);
                    for (let i = 0; i < gf.w / 10; i++) {
                        let fx = gf.x + i * 10 + (frames % 6), fh = 14 + Math.sin(frames * 0.5 + i) * 6;
                        ctx.fillStyle = "rgba(255,87,34," + (0.5 * a) + ")"; ctx.fillRect(fx, 320 - fh - 4, 8, fh + 4);
                        ctx.fillStyle = "rgba(255,193,7," + (0.6 * a) + ")"; ctx.fillRect(fx + 1, 320 - fh * 0.6 - 4, 5, fh * 0.6);
                    }
                });
                // METEORS
                this.meteors.forEach(m => {
                    ctx.save();
                    ctx.fillStyle = "rgba(255,87,34,0.5)"; ctx.beginPath(); ctx.arc(m.x, m.y - 14, 10, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FF6D00"; ctx.beginPath(); ctx.arc(m.x, m.y, 14, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFC107"; ctx.beginPath(); ctx.arc(m.x, m.y, 8, 0, Math.PI*2); ctx.fill();
                    ctx.restore();
                });
                // fire aura
                let ap = (this.ignited ? 0.22 : 0.12) + Math.sin(frames * 0.2) * 0.06;
                ctx.fillStyle = "rgba(255,90,0," + ap + ")"; ctx.beginPath(); ctx.arc(x + this.w/2, y + this.h/2, this.ignited ? 60 : 50, 0, Math.PI*2); ctx.fill();
                // rising flames off the body
                ctx.fillStyle = "rgba(255,120,20,0.6)";
                let nf = this.ignited ? 8 : 5;
                for (let i = 0; i < nf; i++) { let fx = x + 6 + (this.w - 12) * i / (nf - 1), fh = 12 + Math.sin(frames * 0.4 + i * 1.3) * 8; ctx.beginPath(); ctx.moveTo(fx - 4, y + 6); ctx.quadraticCurveTo(fx, y - fh, fx + 4, y + 6); ctx.fill(); }
                let legAnim = ((!this.grounded || this.state.includes('breath') || this.state.includes('rush')) && frames % 12 < 6) ? 4 : 0;
                dino.drawForm(false, x, y, legAnim, 3, this.facingLeft);
                // fiery eyes overlay
                ctx.fillStyle = (frames % 30 < 22) ? "#FFEB3B" : "#FF6D00";
                let ex = this.facingLeft ? x + 14 : x + this.w - 22; ctx.fillRect(ex, y + 16, 8, 6);
                ctx.restore();

                // charge ring
                if (this.state === 'charge_up' && this.chargeTimer > 0) {
                    let p = 100 - (this.chargeTimer / this.chargeMax * 100);
                    ctx.strokeStyle = "#FF9800"; ctx.lineWidth = 3 + p / 25; ctx.shadowBlur = 10; ctx.shadowColor = "#FF6D00";
                    ctx.beginPath(); ctx.arc(x + this.w/2, y + this.h/2, 12 + p / 4, 0, Math.PI*2); ctx.stroke(); ctx.shadowBlur = 0;
                }
                // FIRE BREATH cone
                if (this.state === 'breath') {
                    let mx = this.facingLeft ? x + 6 : x + this.w - 6, my = y + 22;
                    let reach = 168 * Math.min(1, this.subTimer / 8);
                    let ang = this.breathAng === undefined ? (this.facingLeft ? Math.PI : 0) : this.breathAng;
                    ctx.save(); ctx.translate(mx, my); ctx.rotate(ang);
                    for (let lyr = 0; lyr < 3; lyr++) {
                        ctx.fillStyle = ["rgba(255,87,34,0.5)", "rgba(255,152,0,0.55)", "rgba(255,235,59,0.5)"][lyr];
                        let spread = (34 - lyr * 9) + Math.sin(frames * 0.6) * 4;
                        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(reach, -spread); ctx.lineTo(reach, spread); ctx.closePath(); ctx.fill();
                    }
                    ctx.restore();
                }
                // FIRE PILLARS
                if (this.state === 'pillars_prep') {
                    this.pillars.forEach(px => { ctx.strokeStyle = (frames % 8 < 4) ? "#FF1744" : "rgba(255,23,68,0.3)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - 16, 315); ctx.lineTo(px + 16, 315); ctx.stroke(); ctx.fillStyle = "rgba(255,87,34,0.12)"; ctx.fillRect(px - 16, 60, 32, 260); });
                }
                if (this.state === 'pillars_fire') {
                    let grow = Math.min(1, (30 - Math.abs(this.subTimer - 30)) / 14);
                    this.pillars.forEach(px => {
                        let ph = 260 * grow;
                        ctx.fillStyle = "rgba(255,87,34,0.75)"; ctx.fillRect(px - 15, 320 - ph, 30, ph);
                        ctx.fillStyle = "rgba(255,193,7,0.85)"; ctx.fillRect(px - 9, 320 - ph, 18, ph);
                        ctx.fillStyle = "rgba(255,245,157,0.9)"; ctx.fillRect(px - 4, 320 - ph, 8, ph);
                    });
                }
                // FIRE LASER
                if (this.state === 'laser_fire' && this.laserTimer > 42) {   // PHA NGAM: chi vach dut, chua sat thuong
                    let mx = this.facingLeft ? x + 6 : x + this.w - 6, my = y + 22;
                    let ca = Math.cos(this.laserAngle || 0), sa = Math.sin(this.laserAngle || 0), L = 1500;
                    ctx.save(); ctx.strokeStyle = "rgba(255,82,82,0.9)"; ctx.lineWidth = 3; ctx.setLineDash([12, 8]);
                    ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + ca * L, my + sa * L); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
                }
                if (this.state === 'laser_fire' && this.laserTimer > 0 && this.laserTimer <= 42) {
                    let mx = this.facingLeft ? x + 6 : x + this.w - 6, my = y + 22;
                    let ca = Math.cos(this.laserAngle || 0), sa = Math.sin(this.laserAngle || 0), L = 1500;
                    let ex = mx + ca * L, ey = my + sa * L;
                    ctx.save(); ctx.lineCap = "round";
                    ctx.strokeStyle = "rgba(255,60,0,0.5)"; ctx.lineWidth = 44; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(ex, ey); ctx.stroke();
                    ctx.strokeStyle = "rgba(255,193,7,0.85)"; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(ex, ey); ctx.stroke();
                    ctx.strokeStyle = "rgba(255,255,255,0.85)"; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(ex, ey); ctx.stroke();
                    ctx.restore();
                    ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.beginPath(); ctx.arc(mx, my, 20, 0, Math.PI*2); ctx.fill();
                }

                // LAVA COLUMN
                if (this.state === 'lava_hold' && (this.lavaTeleOn || this.lavaEruptOn)) {
                    let lx = this.lavaLockX;
                    if (this.lavaTeleOn) { ctx.strokeStyle = (frames % 6 < 3) ? "#FF1744" : "rgba(255,23,68,0.3)"; ctx.lineWidth = 3; ctx.strokeRect(lx - 70, 0, 140, 320); ctx.fillStyle = "rgba(255,60,0,0.12)"; ctx.fillRect(lx - 70, 0, 140, 320); }
                    if (this.lavaEruptOn) {
                        ctx.fillStyle = "rgba(255,60,0,0.85)"; ctx.fillRect(lx - 62, 0, 124, 320);
                        ctx.fillStyle = "rgba(255,152,0,0.9)"; ctx.fillRect(lx - 40, 0, 80, 320);
                        ctx.fillStyle = "rgba(255,235,59,0.95)"; ctx.fillRect(lx - 16, 0, 32, 320);
                        ctx.fillStyle = "rgba(255,193,7,0.8)"; for (let i = 0; i < 6; i++) { let a2 = frames * 0.2 + i; ctx.beginPath(); ctx.arc(lx + Math.cos(a2) * 40, 14 + Math.sin(a2) * 10, 8, 0, Math.PI*2); ctx.fill(); }
                    }
                }
                if (this.state === 'beam_charge') {
                    let mx2 = this.facingLeft ? x + 6 : x + this.w - 6, my2 = y + 22, p = 100 - (this.chargeTimer / this.chargeMax * 100);
                    ctx.fillStyle = "rgba(255,120,0,0.5)"; ctx.beginPath(); ctx.arc(mx2, my2, 8 + p / 5, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFEB3B"; ctx.beginPath(); ctx.arc(mx2, my2, 4 + p / 12, 0, Math.PI*2); ctx.fill();
                }
                if (this.state === 'beam_clash') {
                    let mouthX = this.beamMouthX, mouthY = this.beamMouthY, cx2 = this.beamClashX;
                    let x1 = Math.min(mouthX, cx2), bw = Math.abs(cx2 - mouthX);
                    ctx.fillStyle = "rgba(255,60,0,0.55)"; ctx.fillRect(x1, mouthY - 26, bw, 52);
                    ctx.fillStyle = "rgba(255,152,0,0.72)"; ctx.fillRect(x1, mouthY - 16, bw, 32);
                    ctx.fillStyle = "rgba(255,235,59,0.9)"; ctx.fillRect(x1, mouthY - 7, bw, 14);
                    let orbR = 26 + Math.sin(frames * 0.5) * 4;
                    ctx.fillStyle = "rgba(255,120,0,0.5)"; ctx.beginPath(); ctx.arc(cx2, mouthY, orbR + 6, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFEB3B"; ctx.beginPath(); ctx.arc(cx2, mouthY, orbR * 0.6, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFFFFF"; ctx.beginPath(); ctx.arc(cx2, mouthY, orbR * 0.3, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = (frames % 20 < 10) ? "#FF1744" : "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("BẮN ĐỂ ĐẨY LÙI!", cx2, mouthY - orbR - 10); ctx.textAlign = "left";
                }
                if (this.state === 'nova_warn' || this.state === 'nova_dash') {
                    ctx.strokeStyle = (frames % 8 < 4) ? "#FF6D00" : "rgba(255,109,0,0.4)"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.novaX, this.novaY, this.novaR, 0, Math.PI*2); ctx.stroke();
                    ctx.fillStyle = "rgba(255,87,34,0.14)"; ctx.beginPath(); ctx.arc(this.novaX, this.novaY, this.novaR, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FF6D00"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("TRÁNH RA!", this.novaX, this.novaY - this.novaR - 6); ctx.textAlign = "left";
                }
                if (this.state === 'sn_side' && this.snPhase === 'warn') {
                    let ox = this.snSideDir === -1 ? 24 : canvas.width - 24, R = canvas.width * 0.66;
                    ctx.fillStyle = (frames % 8 < 4) ? "rgba(255,60,0,0.32)" : "rgba(255,60,0,0.14)"; ctx.beginPath(); ctx.arc(ox, 220, R, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 4; ctx.stroke();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 22px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("SUPER NOVA!", canvas.width/2, 58); ctx.font = "bold 11px Consolas, monospace"; ctx.fillText("Chạy sang phía kia!", canvas.width/2, 76); ctx.textAlign = "left";
                }
                if (this.state === 'sn_meteor' && this.snPhase === 'warn') {
                    ctx.strokeStyle = (frames % 8 < 4) ? "#FF1744" : "rgba(255,23,68,0.4)"; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(canvas.width/2, 300, canvas.width * 0.33, 0, Math.PI*2); ctx.stroke();
                    ctx.fillStyle = "rgba(255,60,0,0.14)"; ctx.beginPath(); ctx.arc(canvas.width/2, 300, canvas.width * 0.33, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("THIÊN THẠCH! CHẠY RA MÉP MÀN HÌNH!", canvas.width/2, 88); ctx.textAlign = "left";
                }
                if (this.state === 'sn_meteor' && this.snPhase === 'fall') {
                    let mcx = x + this.w/2, mcy = y + this.h/2;
                    ctx.fillStyle = "rgba(255,120,20,0.4)"; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.arc(mcx, mcy - i * 32, 44 - i * 5, 0, Math.PI*2); ctx.fill(); }
                    ctx.fillStyle = "rgba(255,87,34,0.55)"; ctx.beginPath(); ctx.arc(mcx, mcy, 72, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FF6D00"; ctx.beginPath(); ctx.arc(mcx, mcy, 48, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFC107"; ctx.beginPath(); ctx.arc(mcx, mcy, 26, 0, Math.PI*2); ctx.fill();
                }
                if (this.state === 'sn_countdown') {
                    let sec = Math.max(0, Math.ceil((300 - this.subTimer) / 60));
                    ctx.fillStyle = "rgba(120,0,0," + (0.08 + Math.sin(frames*0.3)*0.06) + ")"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = (frames % 12 < 6) ? "#FF1744" : "#FFEB3B"; ctx.font = "bold 16px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("PHUN TRÀO SAU " + sec + "s — HẠ GỤC NGAY!", canvas.width/2, 56);
                    ctx.font = "bold 11px Consolas, monospace"; ctx.fillStyle = "#fff"; ctx.fillText("Không hạ kịp = CHẾT", canvas.width/2, 74); ctx.textAlign = "left";
                }
                if (this.state === 'sn_erupt') { ctx.fillStyle = "rgba(255,100,0," + Math.max(0, 0.75 - this.subTimer/40) + ")"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
                // HP BAR + name
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 160, 18, 320, 14);
                ctx.fillStyle = "#FF6D00"; ctx.fillRect(canvas.width/2 - 158, 20, 316 * Math.max(0, this.hp/this.maxHp), 10);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText(this.name + (this.ignited ? " 🔥" : ""), canvas.width/2, 14); ctx.textAlign = "left"; ctx.restore();
            }
            update() {
                this.dy += 0.65; this.y += this.dy;
                if (this.y >= this.baseY) { this.y = this.baseY; this.dy = 0; this.grounded = true; }
                if (this.jumpCd > 0) this.jumpCd--;
                let spd = this.ignited ? 1.35 : 1;

                // ground fires burn (tam thap -> tren la an toan)
                for (let gf of this.groundFires) { gf.life--; if (frames % 18 === 0 && dino.grounded && dino.y + dino.h >= 300 && checkAABB(dino, { x: gf.x, y: 300, w: gf.w, h: 26 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); } }
                this.groundFires = this.groundFires.filter(g => g.life > 0);
                // meteors fall
                for (let i = this.meteors.length - 1; i >= 0; i--) {
                    let m = this.meteors[i]; m.y += m.vy; m.vy += 0.35;
                    if (checkAABB(dino, { x: m.x - 14, y: m.y - 14, w: 28, h: 28 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); m.y = 999; }
                    if (m.y >= 306) { visualEffects.push(new Effect(m.x, 308, 'explosion', true, 20)); this.addGroundFire(m.x, 60, 120); shakeTimer = 8; this.meteors.splice(i, 1); }
                }

                if (this.state === 'dying') { this.subTimer++; if (this.subTimer === 20) visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion')); return; }
                if (this.state === 'entering') { this.x -= 4; this.faceP(); if (this.x <= this.baseX) { this.x = this.baseX; this.state = 'intro'; this.subTimer = 0; } return; }
                else if (this.state === 'intro') {
                    this.subTimer++; shakeTimer = 4;
                    if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x + this.w/2 - 30, this.y - 12, "VULCAN REX!")); visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion')); }
                    if (this.subTimer > 46) { this.state = 'idle'; this.actionTimer = 42; }
                }
                else if (this.state === 'idle') {
                    this.faceP();
                    if (this.hp <= this.maxHp * 0.3 && !this.usedSuperNova) { this.usedSuperNova = true; this.state = 'sn_start'; this.subTimer = 0; this.snCount = 0; return; }
                    if (!this.ignited && this.hp <= this.maxHp * 0.25) {
                        this.ignited = true; shakeTimer = 30; floatingTexts.push(new FloatingText(this.x, this.y - 22, "BỐC CHÁY!"));
                        visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion', true, 40));
                        for (let k = -2; k <= 2; k++) this.addGroundFire(this.x + this.w/2 + k * 90, 60, 100);   // fire nova
                        for (let k = 0; k < 3; k++) this.meteors.push({ x: 120 + k * 240 + Math.random()*60, y: -30 - k * 40, vy: 4 });
                        SFX.bossEntry && SFX.bossEntry();
                    }
                    this.keepDist(270, 380, 5 * spd, 2.6 * spd);
                    if (!dino.grounded && Math.random() < 0.05) this.tryJump(-12);
                    this.actionTimer -= spd;
                    if (this.actionTimer <= 0) {
                        let chosen = pickFromBag(this, ['barrage', 'pillars', 'charge', 'lavaflood', 'beamclash', 'nova']);   // TUI CHIEU
                        if (chosen === 'barrage') { this.state = 'barrage'; this.subTimer = 0; this.shotCount = 0; }
                        else if (chosen === 'pillars') { this.state = 'pillars_prep'; this.subTimer = 0; let cols = [120,300,480,660]; cols.sort(()=>Math.random()-0.5); this.pillars = [cols[0],cols[1],cols[2]].sort((a,b)=>a-b); }
                        else if (chosen === 'lavaflood') { this.state = platforms.some(p => p.stone) ? 'lava_prep' : 'barrage'; this.subTimer = 0; }
                        else if (chosen === 'beamclash') { this.state = 'beam_charge'; this.subTimer = 0; this.chargeTimer = 62; this.chargeMax = 62; }
                        else if (chosen === 'nova') { this.state = 'nova_warn'; this.subTimer = 0; this.novaX = dino.x + dino.w/2; this.novaY = dino.y + dino.h/2; this.novaR = 30; }
                        else { this.state = 'charge_up'; this.chargeVariant = Math.random() < 0.5 ? 0 : 1; this.chargeTimer = 55; this.chargeMax = 55; }
                    }
                }
                // BARRAGE: fireballs, jump-follow
                else if (this.state === 'barrage') {
                    this.faceP();
                    this.keepDist(210);
                    if (!dino.grounded && this.grounded && this.jumpCd <= 0) this.tryJump(-12.5);
                    let gap = this.ignited ? 12 : 16;
                    if (this.subTimer % gap === 0 && this.shotCount < 5) { this.spawnFireball(this.ignited ? 9.5 : 8); this.shotCount++; }
                    this.subTimer++;
                    if (this.shotCount >= 5 && this.subTimer % gap === 0) { this.state = 'idle'; this.actionTimer = 46; }
                }
                // BREATH: run in then flame cone
                else if (this.state === 'breath_in') {
                    this.faceP(); this.subTimer++;
                    let tx = dino.x + (dino.x < this.x ? dino.w + 90 : -this.w - 90);
                    this.moveToward(tx, 9 * spd);
                    if (!dino.grounded && this.grounded && this.jumpCd <= 0) this.tryJump(dino.jumpPower);
                    if (Math.abs((this.x + this.w/2) - (dino.x + dino.w/2)) < 190 || this.subTimer > 55) { this.state = 'breath'; this.subTimer = 0; shakeTimer = 6; }
                }
                else if (this.state === 'breath') {
                    this.subTimer++; this.faceP();
                    // CHEO: nguoi choi tren cot da cao thi luong lua chech len theo
                    let ox = this.facingLeft ? this.x + 6 : this.x + this.w - 6, oy = this.y + 22;
                    if (this.subTimer <= 8) {
                        let sd2 = this.facingLeft ? -1 : 1;
                        let fwd = ((dino.x + dino.w/2) - ox) * sd2, vert = (dino.y + dino.h/2) - oy;
                        let up = Math.atan2(vert, Math.max(40, fwd));       // goc chech so voi huong mat
                        up = Math.max(-1.05, Math.min(1.05, up));           // toi da +-60 do
                        this.breathAng = this.facingLeft ? (Math.PI - up) : up;
                    }
                    if (this.breathAng === undefined) this.breathAng = this.facingLeft ? Math.PI : 0;
                    let hitCone = false;
                    for (let tt = 24; tt <= 168; tt += 18) {
                        let px = ox + Math.cos(this.breathAng) * tt, py = oy + Math.sin(this.breathAng) * tt;
                        if (checkAABB(dino, { x: px - 32, y: py - 32, w: 64, h: 64 })) { hitCone = true; break; }
                    }
                    if (this.subTimer > 8 && hitCone) { if (!dino.isShielding()) { if (frames % 12 === 0) dino.takeDamage(1); } else parry(); }
                    if (this.subTimer % 10 === 0) this.addGroundFire(this.facingLeft ? this.x - 40 - Math.random()*80 : this.x + this.w + 40 + Math.random()*80, 40, 70);
                    if (this.subTimer > (this.ignited ? 52 : 40)) { this.state = 'idle'; this.actionTimer = 44; }
                }
                // PILLARS
                else if (this.state === 'pillars_prep') { this.subTimer++; if (this.subTimer > 40) { this.state = 'pillars_fire'; this.subTimer = 0; shakeTimer = 20; } }
                else if (this.state === 'pillars_fire') {
                    this.subTimer++;
                    if (this.subTimer < 46) { let ph = 260 * Math.min(1, (30 - Math.abs(this.subTimer - 30)) / 14);
                        this.pillars.forEach(px => { if (checkAABB(dino, { x: px - 20, y: 320 - ph, w: 40, h: ph })) { if (!dino.isShielding()) { if (frames % 10 === 0) dino.takeDamage(1); } else parry(); } }); }
                    if (this.subTimer === 44) this.pillars.forEach(px => this.addGroundFire(px, 40, 60));
                    if (this.subTimer > 52) { this.state = 'idle'; this.actionTimer = 46; }
                }
                // CHARGE -> laser or meteor volley
                else if (this.state === 'charge_up') {
                    this.faceP(); this.keepDist(210); this.chargeTimer -= spd;
                    if (!dino.grounded && this.grounded && this.jumpCd <= 0 && Math.random() < 0.06) this.tryJump(-12);
                    if (this.chargeTimer <= 0) {
                        if (this.chargeVariant === 0) { this.state = 'laser_fire'; this.laserTimer = 58; this.laserAngle = Math.atan2((dino.y + dino.h/2) - (this.y + 22), (dino.x + dino.w/2) - (this.facingLeft ? this.x + 6 : this.x + this.w - 6)); shakeTimer = 14; }
                        else {
                            this.state = 'meteor_fire'; this.subTimer = 0; shakeTimer = 14;
                            let n = this.ignited ? 5 : 3;
                            for (let k = 0; k < n; k++) this.meteors.push({ x: 90 + k * (620/(n-1)) + Math.random()*40, y: -30 - k * 30, vy: 4 });
                        }
                    }
                }
                else if (this.state === 'laser_fire') {
                    this.laserTimer--;
                    let mx = this.facingLeft ? this.x + 6 : this.x + this.w - 6, my = this.y + 22;
                    let tgt = Math.atan2((dino.y + dino.h/2) - my, (dino.x + dino.w/2) - mx), d = tgt - this.laserAngle;
                    while (d > Math.PI) d -= Math.PI*2; while (d < -Math.PI) d += Math.PI*2;
                    let aiming = this.laserTimer > 42;                       // 16f dau chi NGAM, khong sat thuong
                    let rate = aiming ? 0.06 : 0.007;                        // ban roi thi gan nhu khong bam nua
                    this.laserAngle += Math.max(-rate, Math.min(rate, d));
                    if (!aiming && this.laserTimer > 6) { let ca = Math.cos(this.laserAngle), sa = Math.sin(this.laserAngle), rx = (dino.x + dino.w/2) - mx, ry = (dino.y + dino.h/2) - my, along = rx*ca + ry*sa, perp = Math.abs(-rx*sa + ry*ca); if (along > 0 && perp < 26) { if (!dino.isShielding()) { if (frames % 10 === 0) dino.takeDamage(1); } else parry(); } }
                    if (this.laserTimer <= 0) { this.state = 'idle'; this.actionTimer = 50; }
                }
                else if (this.state === 'meteor_fire') {
                    this.subTimer++;
                    if (this.subTimer > 40 && this.meteors.length === 0) { this.state = 'idle'; this.actionTimer = 48; }
                    if (this.subTimer > 150) { this.state = 'idle'; this.actionTimer = 48; }
                }
                // LAVA FLOOD (nham tran mat dat -> len buc da ne)
                else if (this.state === 'lava_prep') {
                    this.subTimer++; shakeTimer = Math.max(shakeTimer, 4);
                    if (this.subTimer === 1) floatingTexts.push(new FloatingText(this.x - 30, this.y - 24, "DUNG NHAM TRÀO! LÊN BỤC!"));
                    if (this.subTimer > 44) { this.state = 'lava_rise'; }
                }
                else if (this.state === 'lava_rise') {
                    lavaFlood = Math.min(1, lavaFlood + 0.05);
                    if (lavaFlood > 0.4 && dino.grounded && dino.y + dino.h >= 300 && frames % 12 === 0) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (lavaFlood >= 1) { this.state = 'lava_hold'; this.subTimer = 0; this.lavaLockX = 0; }
                }
                else if (this.state === 'lava_hold') {
                    this.subTimer++;
                    if (dino.grounded && dino.y + dino.h >= 300 && frames % 12 === 0) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    let LC = [200, 500, 800];
                    if (this.subTimer === 1) { this.lavaOrder = [0, 1, 2].sort(() => Math.random() - 0.5); }
                    this.lavaTeleOn = false; this.lavaEruptOn = false; this.lavaLockX = 0;
                    let start = 24, per = 64;
                    for (let k = 0; k < 3; k++) {
                        let w0 = start + k * per, e0 = w0 + 26, e1 = e0 + 34;
                        if (this.subTimer >= w0 && this.subTimer < e0) { this.lavaTeleOn = true; this.lavaLockX = LC[this.lavaOrder ? this.lavaOrder[k] : k]; }
                        else if (this.subTimer >= e0 && this.subTimer <= e1) { this.lavaEruptOn = true; this.lavaLockX = LC[this.lavaOrder ? this.lavaOrder[k] : k]; }
                    }
                    if (this.lavaEruptOn) { if (Math.abs((dino.x + dino.w/2) - this.lavaLockX) < 66) { if (!dino.isShielding()) { if (frames % 8 === 0) dino.takeDamage(1); } else parry(); } if (this.subTimer % 6 === 0) shakeTimer = 6; }
                    if (this.subTimer > start + 3 * per + 16) { this.state = 'lava_recede'; this.lavaTeleOn = false; this.lavaEruptOn = false; }
                }
                else if (this.state === 'lava_recede') {
                    lavaFlood = Math.max(0, lavaFlood - 0.055);
                    if (lavaFlood <= 0) { this.state = 'idle'; this.actionTimer = 64; }
                }
                // BEAM CLASH (do chuong - ban de day lui)
                else if (this.state === 'beam_charge') {
                    this.faceP(); this.moveToward((dino.x + dino.w/2 < 400) ? 560 : 40, 5 * spd); this.chargeTimer -= spd; shakeTimer = Math.max(shakeTimer, 5);
                    if (this.subTimer === undefined) this.subTimer = 0;
                    if (this.chargeTimer <= 0) {
                        this.state = 'beam_clash'; this.subTimer = 0;
                        this.beamDir = this.facingLeft ? -1 : 1;
                        this.beamMouthX = this.facingLeft ? this.x + 6 : this.x + this.w - 6;
                        this.beamMouthY = Math.max(40, Math.min(306, dino.y + dino.h/2));   // NHAM theo do cao nguoi choi -> dung tren buc cao van do suc / van bi trung
                        this.beamClashX = this.beamMouthX + this.beamDir * 44; doChieuBatDau(this);
                        shakeTimer = 18;
                    }
                }
                else if (this.state === 'beam_clash') {
                    this.subTimer++;
                    let dir = this.beamDir, mouthX = this.beamMouthX, mouthY = this.beamMouthY;
                    this.beamClashX += dir * (this.ignited ? 2.8 : 2.2);
                    for (let i = projectiles.length - 1; i >= 0; i--) {
                        let p = projectiles[i];
                        if (p.owner !== undefined && p.owner !== 1) continue;
                        if (Math.abs((p.x + p.w/2) - this.beamClashX) < 64 && Math.abs((p.y + p.h/2) - mouthY) < 60) {
                            // Use the same pressure as non-projectile attacks below.
                            this.beamClashX -= dir * (34 + (p.dmg || 1) * 3) * 3;
                            visualEffects.push(new Effect(this.beamClashX, mouthY, 'explosion', true, 10));
                            projectiles.splice(i, 1);
                        }
                    }
                    {   // @@HE-DOCHIEU: vu khi khong phai vien dan cung day duoc
                        doChieuMo(this.beamClashX - 64, mouthY - 60, 128, 120, this);
                        for (let _d of doChieuLay(this)){
                            // Cung quy tac luc day cho dan, can chien, laser va cua.
                            this.beamClashX -= dir * (34 + _d * 3) * 3;
                            visualEffects.push(new Effect(this.beamClashX, mouthY, 'explosion', true, 12));
                        }
                    }
                    let atY = (dino.y + dino.h > mouthY - 34 && dino.y < mouthY + 34);
                    let reached = dir < 0 ? (this.beamClashX <= dino.x + dino.w) : (this.beamClashX >= dino.x);
                    if (reached && atY) { if (!dino.isShielding()) dino.takeDamage(2); else parry(); visualEffects.push(new Effect(dino.x + dino.w/2, mouthY, 'explosion', true, 30)); this.state = 'idle'; this.actionTimer = 60; }
                    else if (dir < 0 ? (this.beamClashX >= mouthX) : (this.beamClashX <= mouthX)) { this.hp -= 8; shakeTimer = 30; visualEffects.push(new Effect(mouthX, mouthY, 'explosion', true, 46)); visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion', true, 44)); this.hp -= 5; floatingTexts.push(new FloatingText(this.x, this.y - 20, "ĐẨY BẬT! NỔ -5")); this.state = 'idle'; this.actionTimer = 72; }
                    else if (this.subTimer > 300) { this.state = 'idle'; this.actionTimer = 60; }
                }
                // NOVA (thuong): canh bao vong tron -> luot toi -> no
                else if (this.state === 'nova_warn') {
                    this.subTimer++; if (this.novaR < 120) this.novaR += 5;
                    this.faceP(); this.moveToward((this.novaX < 400) ? 640 : 40, 3 * spd);
                    if (this.subTimer > 50) { this.state = 'nova_dash'; this.subTimer = 0; }
                }
                else if (this.state === 'nova_dash') {
                    this.subTimer++;
                    let tx = this.novaX - this.w/2, ty = this.novaY - this.h/2;
                    this.x += Math.sign(tx - this.x) * 22;
                    this.dy = 0; this.y += (ty - this.y) * 0.28; if (Math.abs(this.y - this.baseY) > 4) this.grounded = false;
                    if ((Math.abs(this.x - tx) < 26 && Math.abs(this.y - ty) < 34) || this.subTimer > 44) { this.state = 'nova_boom'; this.subTimer = 0; this.x = Math.max(0, Math.min(canvas.width - this.w, tx)); shakeTimer = 20; visualEffects.push(new Effect(this.novaX, this.novaY, 'explosion', true, this.novaR)); }
                }
                else if (this.state === 'nova_boom') {
                    this.subTimer++;
                    if (this.subTimer < 20 && Math.hypot((dino.x + dino.w/2) - this.novaX, (dino.y + dino.h/2) - this.novaY) < this.novaR) { if (!dino.isShielding()) { if (frames % 8 === 0) dino.takeDamage(2); } else parry(); }
                    if (this.subTimer > 26) { this.state = 'idle'; this.actionTimer = 54; }
                }
                // SUPER NOVA (chieu cuoi, <30% mau, 1 lan)
                else if (this.state === 'sn_start') {
                    this.subTimer++; shakeTimer = Math.max(shakeTimer, 8);
                    if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x - 20, this.y - 24, "SUPER NOVA!!!")); this.ignited = true; SFX.bossEntry && SFX.bossEntry(); }
                    if (this.subTimer > 32) { this.state = 'sn_side'; this.subTimer = 0; this.snPhase = 'out'; this.snSideDir = -1; }
                }
                else if (this.state === 'sn_side') {
                    if (this.snPhase === 'out') {
                        this.subTimer++; this.dy = 0; this.x += this.snSideDir * 44;
                        if (this.x < -this.w - 30 || this.x > canvas.width + 30 || this.subTimer > 22) { this.snPhase = 'warn'; this.subTimer = 0; }
                    } else if (this.snPhase === 'warn') {
                        this.subTimer++; this.dy = 0;
                        if (this.subTimer > 118) { this.snPhase = 'boom'; this.subTimer = 0; this.x = this.snSideDir === -1 ? 8 : canvas.width - this.w - 8; this.y = this.baseY; shakeTimer = 42; visualEffects.push(new Effect(this.snSideDir === -1 ? 24 : canvas.width - 24, 220, 'explosion', true, 130)); }
                    } else {
                        this.subTimer++;
                        let ox = this.snSideDir === -1 ? 24 : canvas.width - 24, R = canvas.width * 0.66;
                        if (this.subTimer < 24 && this.subTimer % 2 === 0) { let prog = this.subTimer / 24; let ex = ox - this.snSideDir * prog * R; visualEffects.push(new Effect(ex + (Math.random()-0.5)*70, 150 + Math.random()*160, 'explosion', true, 55 + Math.random()*40)); }
                        if (this.subTimer < 22 && Math.abs((dino.x + dino.w/2) - ox) < R) { if (!dino.isShielding()) { if (frames % 7 === 0) dino.takeDamage(2); } else parry(); }
                        if (this.subTimer % 4 === 0) shakeTimer = 10;
                        if (this.subTimer > 26) { this.snCount++; if (this.snCount < 4) { this.snPhase = 'out'; this.subTimer = 0; this.snSideDir = -this.snSideDir; } else { this.state = 'sn_stun1'; this.subTimer = 0; } }
                    }
                }
                else if (this.state === 'sn_stun1') { this.subTimer++; if (this.subTimer > 120) { this.state = 'sn_meteor'; this.subTimer = 0; this.snPhase = 'up'; } }
                else if (this.state === 'sn_meteor') {
                    if (this.snPhase === 'up') { this.subTimer++; this.y = this.baseY - this.subTimer * 26; this.dy = 0; this.grounded = false; if (this.y < -this.h - 10 || this.subTimer > 16) { this.snPhase = 'warn'; this.subTimer = 0; this.x = canvas.width/2 - this.w/2; this.y = -this.h; } }
                    else if (this.snPhase === 'warn') { this.subTimer++; this.y = -this.h; this.dy = 0; if (this.subTimer > 86) { this.snPhase = 'fall'; this.subTimer = 0; this.dy = 12; } }
                    else {
                        this.subTimer++;
                        if (this.grounded || this.y >= this.baseY) {
                            this.y = this.baseY; this.grounded = true; this.dy = 0; shakeTimer = 42;
                            visualEffects.push(new Effect(canvas.width/2, 300, 'explosion', true, canvas.width * 0.34));
                            for (let k = 0; k < 7; k++) visualEffects.push(new Effect(canvas.width/2 + (k - 3) * 78, 260 + Math.random()*56, 'explosion', true, 48 + Math.random()*34));
                            if (Math.abs((dino.x + dino.w/2) - canvas.width/2) < canvas.width * 0.33) { if (!dino.isShielding()) dino.takeDamage(99); else parry(); }
                            this.state = 'sn_stun2'; this.subTimer = 0;
                        }
                    }
                }
                else if (this.state === 'sn_stun2') { this.subTimer++; if (this.subTimer > 120) { this.state = 'sn_countdown'; this.subTimer = 0; } }
                else if (this.state === 'sn_countdown') {
                    this.subTimer++; if (this.subTimer > 210) shakeTimer = Math.max(shakeTimer, 12);
                    if (this.subTimer > 300) { this.state = 'sn_erupt'; this.subTimer = 0; shakeTimer = 60; }
                }
                else if (this.state === 'sn_erupt') {
                    this.subTimer++;
                    if (this.subTimer === 2) { visualEffects.push(new Effect(canvas.width/2, 200, 'explosion', true, canvas.width)); dino.takeDamage(99); }
                    if (this.subTimer < 34 && this.subTimer % 3 === 0) for (let k = 0; k < 4; k++) visualEffects.push(new Effect(Math.random()*canvas.width, Math.random()*320, 'explosion', true, 60 + Math.random()*55));
                    if (this.subTimer > 40) { this.state = 'idle'; this.actionTimer = 60; }
                }

            }
        }
// BOSS_PART_END s0.FireCloneBoss.1

// Nguồn: index.html:24178 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24189 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24197 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GiantSpiderBoss, GreatSerpentBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MosaBoss, MountainGodBoss, PoisonMothBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, VoltCloneBoss
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

// Nguồn: index.html:98512 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:98523 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
