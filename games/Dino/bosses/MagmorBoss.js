// BOSS_FILE: MagmorBoss
// BOSS_SNAPSHOT: 36782d91d2329d9857af74607927116e9ca394bac5cc7f15d33431859a55fe63
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, pickFromBag, platforms, projectiles, shakeTimer, troiSinh, troiVy, visualEffects
// Nguồn: index.html:206 · Dùng bởi: DragonLordBoss, EmberWolfBoss, FlameCoreBoss, FlameLancerBoss, GreatApeBoss, MagmorBoss, QuetzalBoss
// BOSS_PART_BEGIN s0.GWAVE_H.1 READ_ONLY
const GWAVE_H = 96, GWAVE_SPD = 11.5;
// BOSS_PART_END s0.GWAVE_H.1

// Nguồn: index.html:27287 · Dùng bởi: MagmorBoss
// BOSS_PART_BEGIN s0.MagmorBoss.1 EDITABLE
class MagmorBoss {
            constructor(level) {
                this.hp = 125; this.maxHp = 125;
                this.w = 116; this.h = 146; this.baseY = 320 - 146;
                this.x = canvas.width - 300; this.y = this.baseY;
                this.state = 'entering'; this.retState = 'idle'; this.name = "MAGMOR";
                this.actionTimer = 90; this.subTimer = 0; this.facingLeft = true; this.lastSkill = '';
                this.coreSlot = 0; this.coreHp = 5; this.coreMax = 5; this.coreMove = 300;
                this.tiles = []; this.rocks = []; this.rockMarks = []; this.columns = [];
                this.pourSide = 0; this.glow = 0; this.armRaise = 0; this.aim = null;
                this.jumpFrom = 0; this.jumpTo = 0; this.stunTimer = 0;
                this.burnTimer = 0; this.lastMeleeHit = -1;
            }
            corePos() { const S = [[0.50, 0.32], [0.74, 0.20], [0.32, 0.56]]; let s = S[this.coreSlot]; return { cx: this.x + this.w * s[0], cy: this.y + this.h * s[1] }; }
            coreRect() { let p = this.corePos(); return { x: p.cx - 17, y: p.cy - 17, w: 34, h: 34 }; }
            blowTile(t, why) {
                let k = platforms.indexOf(t.pf); if (k >= 0) platforms.splice(k, 1);
                let cx = t.pf.x + t.pf.w/2;
                this.columns.push({ x: cx, t: 46 });
                visualEffects.push(new Effect(cx, t.pf.top, 'explosion', true, 34));
                shakeTimer = Math.max(shakeTimer, 12);
                let idx = this.tiles.indexOf(t); if (idx >= 0) this.tiles.splice(idx, 1);
            }
            update() {
                this.glow += 0.06;
                if (this.state === 'entering') { this.x -= 5; if (this.x <= canvas.width - 320) { this.state = 'intro'; this.subTimer = 0; } return; }
                if (this.state === 'intro') { this.subTimer++; if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x, this.y - 40, "MAGMOR!")); if (SFX.bossEntry) SFX.bossEntry(); } if (this.subTimer > 44) { this.state = 'idle'; this.actionTimer = 60; } return; }
                if (this.state !== 'jump_up' && this.state !== 'jump_fall') this.facingLeft = (dino.x + dino.w/2) < (this.x + this.w/2);

                // ---- LOI: ban 5 phat la vo ----
                if (this.coreHp > 0 && this.state !== 'stunned') {
                    let cr = this.coreRect();
                    for (let p = projectiles.length - 1; p >= 0; p--) {
                        let pr = projectiles[p];
                        if (pr._magCore) continue;
                        if (checkAABB(pr, cr)) {
                            pr._magCore = true; this.coreHp--;
                            visualEffects.push(new Effect(cr.x + 17, cr.y + 17, 'explosion', true, 18));
                            floatingTexts.push(new FloatingText(cr.x, cr.y - 20, "LOI " + Math.max(0, this.coreHp) + "/5"));
                            if (this.coreHp <= 0) {
                                this.state = 'core_break'; this.subTimer = 66; shakeTimer = 22;
                                floatingTexts.push(new FloatingText(this.x, this.y - 44, "LOI VO!"));
                            }
                            break;
                        }
                    }
                    this.coreMove--;
                    if (this.coreMove <= 0) { this.coreMove = 300; this.coreSlot = (this.coreSlot + 1) % 3; }
                }
                // ---- O DA: 6 giay tu no, dung 2 giay cung no ----
                for (let i = this.tiles.length - 1; i >= 0; i--) {
                    let t = this.tiles[i]; t.life--;
                    let on = dino.grounded && Math.abs((dino.y + dino.h) - t.pf.top) < 8 && dino.x + dino.w > t.pf.x && dino.x < t.pf.x + t.pf.w;
                    if (on) t.stand++; else t.stand = Math.max(0, t.stand - 2);
                    if (t.unstable && on) { this.blowTile(t, 'unstable'); continue; }
                    if (t.stand >= 120 || t.life <= 0) { this.blowTile(t, 'time'); continue; }
                }
                // ---- cot lua tu o no ----
                for (let i = this.columns.length - 1; i >= 0; i--) {
                    let c = this.columns[i]; c.t--;
                    if (c.t <= 0) { this.columns.splice(i, 1); continue; }
                    if (checkAABB(dino, { x: c.x - 26, y: 250 - 150, w: 52, h: 220 })) { if (!dino.isShielding()) { if (frames % 18 === 0) dino.takeDamage(1); } else parry(); }
                }

                // ==== VO LOI -> nhay toi cho nguoi choi -> no -> CHOANG ====
                if (this.state === 'core_break') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'jump_up'; this.subTimer = 24; this.jumpFrom = this.x; this.jumpTo = Math.max(20, Math.min(canvas.width - this.w - 20, dino.x + dino.w/2 - this.w/2)); } return; }
                if (this.state === 'jump_up') { this.subTimer--; this.y -= 7; this.x += (this.jumpTo - this.x) * 0.16; if (this.subTimer <= 0) this.state = 'jump_fall'; return; }
                if (this.state === 'jump_fall') {
                    this.y += 13; this.x += (this.jumpTo - this.x) * 0.22;
                    if (this.y >= this.baseY) {
                        this.y = this.baseY; shakeTimer = 34; if (SFX.bossExplode) SFX.bossExplode();
                        let cx = this.x + this.w/2;
                        for (let k = 0; k < 6; k++) visualEffects.push(new Effect(cx + (Math.random()-0.5)*180, 300 - Math.random()*70, 'explosion', true, 30));
                        if (checkAABB(dino, { x: cx - 110, y: 200, w: 220, h: 130 })) { if (!dino.isShielding()) dino.takeDamage(2); else parry(); }
                        this.state = 'stunned'; this.stunTimer = 200;
                        floatingTexts.push(new FloatingText(this.x, this.y - 44, "CHOANG! DANH DI!"));
                    }
                    return;
                }
                if (this.state === 'stunned') {
                    this.stunTimer--;
                    if (this.stunTimer <= 0) { this.coreHp = this.coreMax; this.coreSlot = Math.floor(Math.random()*3); this.coreMove = 300; this.state = 'idle'; this.actionTimer = 50; }
                    return;
                }

                if (this.state === 'idle') {
                    this.armRaise *= 0.85;
                    let dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    if (Math.abs(dx) > 330) this.x += Math.sign(dx) * 1.6;
                    else if (Math.abs(dx) < 160) this.x -= Math.sign(dx || 1) * 1.8;
                    this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x));
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let pool = ['bolt', 'tile', 'punch', 'destab', 'pour'];
                        if (this.tiles.length === 0) pool = pool.filter(s => s !== 'destab');
                        let c = pickFromBag(this, pool);
                        if (c === 'bolt') {                       // NHANH + CHEO + TARGET, pham vi nho
                            this.state = 'bolt_prep'; this.subTimer = 30;
                            let cp = this.corePos(), ddx = (dino.x + dino.w/2) - cp.cx, ddy = (dino.y + dino.h/2) - cp.cy, d = Math.hypot(ddx, ddy) || 1;
                            this.aim = { x: cp.cx, y: cp.cy, vx: ddx/d, vy: ddy/d };
                        }
                        else if (c === 'tile') { this.state = 'tile_prep'; this.subTimer = 45;
                            let cols = [110, 300, 500, 700, 880].sort(() => Math.random() - 0.5); this.rockMarks = cols.slice(0, 3).sort((a,b)=>a-b); }
                        else if (c === 'punch') { this.state = 'punch_prep'; this.subTimer = 40; }
                        else if (c === 'destab') { this.state = 'destab_prep'; this.subTimer = 40; }
                        else { this.state = 'pour_prep'; this.subTimer = 90; this.pourSide = (dino.x + dino.w/2) < canvas.width/2 ? -1 : 1; }
                    }
                }
                // === DAN NHAM CHEO (nhanh, nho, co target) ===
                else if (this.state === 'bolt_prep') { this.armRaise = Math.min(1, this.armRaise + 0.08); this.subTimer--;
                    if (this.subTimer > 18) { let cp = this.corePos(), ddx = (dino.x + dino.w/2) - cp.cx, ddy = (dino.y + dino.h/2) - cp.cy, d = Math.hypot(ddx, ddy) || 1; this.aim = { x: cp.cx, y: cp.cy, vx: ddx/d, vy: ddy/d, locked: false }; }
                    else if (this.aim) this.aim.locked = true;
                    if (this.subTimer <= 0) {
                    this.state = 'bolt_fire'; this.subTimer = 12; if (SFX.bossSkill) SFX.bossSkill();
                    let a = this.aim, sp = 9.2;
                    let bp = new BossProjectile(a.x - 9, a.y - 9, a.vx * sp, a.vy * sp, false, 1); bp.fire = true; bp.w = 18; bp.h = 18; bossProjectiles.push(bp);
                } }
                else if (this.state === 'bolt_fire') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 56; } }
                // === NEM O DA ===
                else if (this.state === 'tile_prep') { this.armRaise = Math.min(1, this.armRaise + 0.05); this.subTimer--; if (this.subTimer <= 0) {
                    this.state = 'tile_fire'; this.subTimer = 110; if (SFX.bossSkill) SFX.bossSkill();
                    for (let m of this.rockMarks) this.rocks.push({ x: m, y: troiSinh(), vy: troiVy(4.2, -60) });
                } }
                else if (this.state === 'tile_fire') {
                    this.armRaise *= 0.9; this.subTimer--;
                    for (let i = this.rocks.length - 1; i >= 0; i--) {
                        let r = this.rocks[i]; r.vy = Math.min(11, r.vy + 0.3); r.y += r.vy;
                        if (checkAABB(dino, { x: r.x - 32, y: r.y - 32, w: 64, h: 64 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                        if (r.y >= 250) {
                            let pf = { x: r.x - 46, w: 92, top: 250, h: 70, volcano: true, magmor: true };
                            platforms.push(pf); this.tiles.push({ pf: pf, life: 360, stand: 0, unstable: false });
                            visualEffects.push(new Effect(r.x, 290, 'explosion', true, 24)); shakeTimer = Math.max(shakeTimer, 10);
                            this.rocks.splice(i, 1);
                        }
                    }
                    if (this.subTimer <= 0 && this.rocks.length === 0) { this.state = 'idle'; this.actionTimer = 60; }
                }
                // === DAM SAN (nho, nhanh) ===
                else if (this.state === 'punch_prep') { this.armRaise = Math.min(1, this.armRaise + 0.07); this.subTimer--; if (this.subTimer <= 0) {
                    this.state = 'punch_fire'; this.subTimer = 14; shakeTimer = 24; if (SFX.bossSkill) SFX.bossSkill();
                    let cx = this.x + this.w/2;
                    let w1 = new BossProjectile(cx - 30, 322 - GWAVE_H, -GWAVE_SPD, 0, true, 1); w1.w = 44; w1.h = GWAVE_H; w1.color = "#FF7043"; w1.crescent = true;
                    let w2 = new BossProjectile(cx + 6, 322 - GWAVE_H, GWAVE_SPD, 0, true, 1); w2.w = 44; w2.h = GWAVE_H; w2.color = "#FF7043"; w2.crescent = true;
                    bossProjectiles.push(w1, w2);
                    if (dino.grounded && Math.abs((dino.x + dino.w/2) - cx) < 74) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    visualEffects.push(new Effect(cx, 312, 'explosion', true, 32));
                } }
                else if (this.state === 'punch_fire') { this.armRaise *= 0.8; this.subTimer--; if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 60; } }
                // === BAN LAM O DA BAT ON ===
                else if (this.state === 'destab_prep') { this.armRaise = Math.min(1, this.armRaise + 0.06); this.subTimer--; if (this.subTimer <= 0) {
                    this.state = 'destab_fire'; this.subTimer = 20; if (SFX.bossSkill) SFX.bossSkill();
                    for (let t of this.tiles) { t.unstable = true; visualEffects.push(new Effect(t.pf.x + t.pf.w/2, t.pf.top, 'explosion', true, 14)); }
                } }
                else if (this.state === 'destab_fire') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 58; } }
                // === TRUT DUNG NHAM (cham -> phu NUA SAN) ===
                else if (this.state === 'pour_prep') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'pour_fire'; this.subTimer = 150; shakeTimer = 14; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'pour_fire') {
                    this.subTimer--;
                    let onSide = this.pourSide < 0 ? (dino.x + dino.w/2) < canvas.width/2 : (dino.x + dino.w/2) >= canvas.width/2;
                    if (onSide && (dino.y + dino.h) > 300 && frames % 20 === 0) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (frames % 6 === 0) visualEffects.push(new Effect((this.pourSide < 0 ? 0 : canvas.width/2) + Math.random() * canvas.width/2, 316, 'explosion', true, 12));
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 64; }
                }
            }
            draw() {
                let cx = this.x + this.w/2, sd = this.facingLeft ? -1 : 1;
                if (this.state === 'pour_prep' || this.state === 'pour_fire') {
                    let hx = this.pourSide < 0 ? 0 : canvas.width/2;
                    let a = this.state === 'pour_prep' ? 0.16 + 0.12 * Math.sin(frames * 0.25) : 0.42;
                    ctx.fillStyle = "rgba(255,87,34," + a.toFixed(3) + ")"; ctx.fillRect(hx, 250, canvas.width/2, 70);
                    ctx.fillStyle = this.state === 'pour_fire' ? "#FF5722" : "rgba(255,152,0,0.6)"; ctx.fillRect(hx, 306, canvas.width/2, 14);
                }
                // duong ngam cheo
                if (this.state === 'bolt_prep' && this.aim) {
                    let a = this.aim, L = 1400;
                    ctx.strokeStyle = a.locked ? "#FF1744" : "rgba(255,152,0,0.45)"; ctx.lineWidth = a.locked ? 6 : 3;
                    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + a.vx * L, a.y + a.vy * L); ctx.stroke();
                }
                if (this.state === 'tile_prep') for (let m of this.rockMarks) {
                    let k = 1 - this.subTimer / 45;
                    ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.beginPath(); ctx.ellipse(m, 316, Math.max(6, 22 + k * 22), Math.max(3, 6 + k * 5), 0, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#FF7043"; ctx.lineWidth = 2; ctx.stroke();
                }
                if (this.state === 'punch_prep') { let k = 1 - this.subTimer / 40, r = Math.max(8, 22 + k * 56);
                    ctx.strokeStyle = "rgba(255,87,34," + (0.4 + k * 0.5).toFixed(2) + ")"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.ellipse(cx, 314, r, Math.max(4, r * 0.22), 0, 0, Math.PI*2); ctx.stroke(); }
                if (this.state === 'core_break') {
                    let k = 1 - this.subTimer / 66;
                    ctx.strokeStyle = "rgba(255,82,82," + (0.4 + k * 0.5).toFixed(2) + ")"; ctx.lineWidth = 5;
                    ctx.beginPath(); ctx.ellipse(cx, 314, Math.max(10, 30 + k * 90), Math.max(6, 10 + k * 16), 0, 0, Math.PI*2); ctx.stroke();
                    ctx.fillStyle = "#FF5252"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("SAP LAO TOI! TRANH RA!", canvas.width/2, 42); ctx.textAlign = "left";
                }
                if (this.state === 'jump_up' || this.state === 'jump_fall') {
                    ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.beginPath(); ctx.ellipse(this.jumpTo + this.w/2, 316, 70, 12, 0, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3; ctx.stroke();
                }
                // o da: dem nguoc + trang thai bat on
                for (let t of this.tiles) {
                    let p = t.pf, danger = t.unstable || t.stand > 70 || t.life < 90;
                    ctx.fillStyle = danger ? "#B71C1C" : "#4E342E"; ctx.fillRect(p.x, p.top, p.w, 26);
                    ctx.fillStyle = t.unstable ? "#FF5252" : "#FF7043";
                    for (let i = 0; i < 4; i++) ctx.fillRect(p.x + 8 + i * 22, p.top + 6, 6, 14);
                    ctx.strokeStyle = danger ? "#FF5252" : "#1B0000"; ctx.lineWidth = 3; ctx.strokeRect(p.x, p.top, p.w, 26);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(t.unstable ? "BAT ON!" : Math.ceil(Math.min(t.life, 120 - t.stand) / 60) + "s", p.x + p.w/2, p.top - 6);
                    ctx.textAlign = "left";
                }
                for (let c of this.columns) {
                    let hh = 150 * Math.min(1, c.t / 12);
                    ctx.fillStyle = "#FF5722"; ctx.fillRect(c.x - 24, 250 - hh, 48, hh + 70);
                    ctx.fillStyle = "#FFEB3B"; ctx.fillRect(c.x - 11, 250 - hh, 22, hh + 70);
                }
                for (let r of this.rocks) {
                    ctx.fillStyle = "#3E2723"; ctx.fillRect(r.x - 30, r.y - 30, 60, 60);
                    ctx.fillStyle = "#FF7043"; ctx.fillRect(r.x - 20, r.y - 16, 11, 28);
                    ctx.strokeStyle = "#1B0000"; ctx.lineWidth = 3; ctx.strokeRect(r.x - 30, r.y - 30, 60, 60);
                }
                // than
                let sh = this.state === 'stunned' ? (Math.random()-0.5) * 5 : 0;
                ctx.fillStyle = this.state === 'stunned' ? "#4E342E" : "#2B1B17";
                ctx.fillRect(this.x + 16 + sh, this.y + 40, this.w - 32, 66);
                ctx.fillRect(this.x + 24 + sh, this.y + 104, 30, 42);
                ctx.fillRect(this.x + this.w - 54 + sh, this.y + 104, 30, 42);
                ctx.fillRect(this.x + 30 + sd * 6 + sh, this.y + 8, 56, 40);
                let ar = this.armRaise;
                ctx.save(); ctx.translate(cx + sd * 44, this.y + 52); ctx.rotate(sd * (-0.4 - ar * 1.1));
                ctx.fillStyle = "#2B1B17"; ctx.fillRect(-14, 0, 28, 66);
                ctx.fillStyle = ar > 0.4 ? "#FFB300" : "#5D2A1B"; ctx.fillRect(-20, 56, 40, 30);
                ctx.strokeStyle = "#120806"; ctx.lineWidth = 3; ctx.strokeRect(-20, 56, 40, 30); ctx.restore();
                ctx.strokeStyle = "#FF6D00"; ctx.lineWidth = 3;
                for (let i = 0; i < 6; i++) { let yy = this.y + 46 + i * 11, ww = 20 + ((i * 37) % 44);
                    ctx.globalAlpha = 0.5 + 0.35 * Math.sin(this.glow + i);
                    ctx.beginPath(); ctx.moveTo(this.x + 22 + (i % 3) * 12, yy); ctx.lineTo(this.x + 22 + (i % 3) * 12 + ww, yy + 6); ctx.stroke(); }
                ctx.globalAlpha = 1;
                ctx.strokeStyle = "#0D0503"; ctx.lineWidth = 3;
                ctx.strokeRect(this.x + 16 + sh, this.y + 40, this.w - 32, 66);
                ctx.fillStyle = "#FFD54F"; ctx.fillRect(this.x + 44 + sd * 6 + sh, this.y + 22, 12, 8); ctx.fillRect(this.x + 62 + sd * 6 + sh, this.y + 22, 12, 8);
                // LOI
                if (this.coreHp > 0) {
                    let c = this.corePos(), pulse = 3 * Math.sin(this.glow * 2.4);
                    ctx.fillStyle = "#FFEB3B"; ctx.beginPath(); ctx.arc(c.cx, c.cy, Math.max(5, 15 + pulse), 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#FF3D00"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(c.cx, c.cy, Math.max(7, 21 + pulse), 0, Math.PI*2); ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(this.coreHp + "/5", c.cx, c.cy + 4); ctx.textAlign = "left";
                }
                if (this.state === 'stunned') { ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("CHOANG - DANH DI!", cx, this.y - 42); ctx.textAlign = "left"; }
                // ctx.fillStyle = "black"; ctx.fillRect(this.x, this.y - 26, this.w, 9);
                // ctx.fillStyle = "#FF7043"; ctx.fillRect(this.x + 1, this.y - 25, (this.w - 2) * Math.max(0, this.hp / this.maxHp), 7);
                ctx.fillStyle = "white"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + "  " + Math.max(0, Math.ceil(this.hp)) + "/" + this.maxHp, this.x + this.w/2, this.y - 30); ctx.textAlign = "left";
            }
}
// BOSS_PART_END s0.MagmorBoss.1

// Nguồn: index.html:99835 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:99846 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
