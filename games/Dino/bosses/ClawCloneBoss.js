// BOSS_FILE: ClawCloneBoss
// BOSS_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, pickFromBag, shakeTimer, visualEffects
// Nguồn: index.html:22647 · Dùng bởi: ClawCloneBoss
// BOSS_PART_BEGIN s0.ClawCloneBoss.1 EDITABLE
class ClawCloneBoss {
            constructor(level) {
                this.hp = 100; this.maxHp = 100;
                this.w = 48 * 1.5; this.h = 44 * 1.5; this.baseX = canvas.width - 200; this.baseY = 320 - this.h;
                this.x = canvas.width; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.actionTimer = 60; this.name = "EREBUS REX"; this.retState = 'dash_back';
                this.subTimer = 0; this.shotCount = 0; this.jumpCd = 0; this.lastMeleeHit = -1;
                this.lastSkill = ''; this.burnTimer = 0; this.facingLeft = true;
                this.chargeTimer = 0; this.chargeMax = 1; this.chargeVariant = 0;
                this.jcX = 0; this.jcY = 0; this.jcR = 0; this.usedDesperation = false; this.slashPhase = 0;
            }
            moveToward(tx, sp) { if (this.x < tx - sp) this.x += sp; else if (this.x > tx + sp) this.x -= sp; else this.x = tx; }
            tryJump(pow) { if (this.grounded && this.jumpCd <= 0) { this.dy = pow || -13; this.grounded = false; this.jumpCd = 45; } }
            keepDist(minD, maxD, backSp, apprSp) { let dx = (dino.x + dino.w/2) - (this.x + this.w/2); if (Math.abs(dx) < minD) this.x -= Math.sign(dx || 1) * (backSp || 5); else if (maxD && Math.abs(dx) > maxD) this.x += Math.sign(dx) * (apprSp || 2.6); this.x = Math.max(30, Math.min(canvas.width - this.w - 30, this.x)); }
            spawnBlade(speed) {
                let sx = this.x + this.w/2, sy = this.y + 24;
                let dx = (dino.x + dino.w/2) - sx, dy = (dino.y + dino.h/2) - sy, d = Math.hypot(dx, dy) || 1;
                let bp = new BossProjectile(sx - 13, sy - 13, dx/d*speed, dy/d*speed, false, 1);
                bp.clawBlade = true; bp.w = 26; bp.h = 26; bp.ang = Math.atan2(dy, dx); bp.color = "#FF1744";
                bossProjectiles.push(bp); SFX.bossSkill && SFX.bossSkill();
            }
            draw() {
                let x = this.x, y = this.y; ctx.save();
                // dark aura
                let ap = 0.12 + Math.sin(frames * 0.15) * 0.05;
                ctx.fillStyle = "rgba(180,0,40," + ap + ")"; ctx.beginPath(); ctx.arc(x + this.w/2, y + this.h/2, 52, 0, Math.PI*2); ctx.fill();
                let legAnim = ((!this.grounded || this.state.includes('rush') || this.state.includes('dash') || this.state.includes('center')) && frames % 12 < 6) ? 4 : 0;
                dino.drawForm(false, x, y, legAnim, 3, this.facingLeft);
                // glowing claws on the front hand
                let cd = this.facingLeft ? -1 : 1;
                let clawX = this.facingLeft ? x + 12 : x + this.w - 12, clawY = y + 40;
                let flare = this.state.includes('rush') || this.state.includes('dash') || this.state.includes('charge');
                ctx.save(); ctx.strokeStyle = flare ? "#FFFFFF" : "#FF1744"; ctx.lineWidth = flare ? 4 : 3; ctx.shadowBlur = 10; ctx.shadowColor = "#FF1744";
                for (let k = -1; k <= 1; k++) {
                    ctx.beginPath(); ctx.moveTo(clawX, clawY + k * 6);
                    ctx.quadraticCurveTo(clawX + cd * 18, clawY + k * 10 - 4, clawX + cd * 30, clawY + k * 14 - 10); ctx.stroke();
                }
                ctx.restore();
                ctx.restore();

                // charge ring
                if (this.chargeTimer > 0 && this.state === 'charge_up') {
                    let prog = 100 - (this.chargeTimer / this.chargeMax * 100);
                    ctx.strokeStyle = prog >= 62.5 ? "#FFEB3B" : (prog >= 25 ? "#FF5722" : "#00E5FF");
                    ctx.lineWidth = 3 + prog / 25;
                    ctx.beginPath(); ctx.arc(x + this.w/2, y + this.h/2, 12 + prog/4, 0, Math.PI*2); ctx.stroke();
                }
                // fake-ult warning circle
                if (this.state === 'fakeult_warn') {
                    let gr = this.jcR;
                    ctx.strokeStyle = (frames % 8 < 4) ? "#FF1744" : "rgba(255,23,68,0.4)"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.jcX, this.jcY, gr, 0, Math.PI*2); ctx.stroke();
                    ctx.fillStyle = "rgba(255,23,68,0.10)"; ctx.beginPath(); ctx.arc(this.jcX, this.jcY, gr, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FF1744"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("TRÁNH RA!", this.jcX, this.jcY - gr - 6); ctx.textAlign = "left";
                }
                if (this.state === 'fakeult_slash') {
                    ctx.save(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 2.5; ctx.shadowBlur = 8; ctx.shadowColor = "#FF1744";
                    for (let i = 0; i < 9; i++) { if (this.subTimer >= i * 2) {
                        let a = i * 0.7, dx = Math.cos(a), dy = Math.sin(a), off = ((i % 5) - 2) * (this.jcR * 0.5), px = -dy, py = dx, L = this.jcR * 1.2;
                        let ox = this.jcX + px * off, oy = this.jcY + py * off; ctx.globalAlpha = Math.max(0, 1 - (this.subTimer - i*2) / 18);
                        ctx.beginPath(); ctx.moveTo(ox - dx * L, oy - dy * L); ctx.lineTo(ox + dx * L, oy + dy * L); ctx.stroke();
                    } }
                    ctx.restore(); ctx.globalAlpha = 1;
                    ctx.strokeStyle = "rgba(255,23,68,0.5)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(this.jcX, this.jcY, this.jcR, 0, Math.PI*2); ctx.stroke();
                }
                // DESPERATION real Judgement Cut
                if (this.state === 'desp_charge') {
                    ctx.fillStyle = "rgba(40,0,10," + (0.15 + Math.sin(frames * 0.3) * 0.1) + ")"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                    let gr = 40 + (180 - this.subTimer) * 1.2;
                    ctx.strokeStyle = (frames % 6 < 3) ? "#FFFFFF" : "#FF1744"; ctx.lineWidth = 4; ctx.shadowBlur = 14; ctx.shadowColor = "#FF1744";
                    ctx.beginPath(); ctx.arc(x + this.w/2, y + this.h/2, gr, 0, Math.PI*2); ctx.stroke(); ctx.shadowBlur = 0;
                    ctx.fillStyle = (frames % 12 < 6) ? "#FFEB3B" : "#FF1744"; ctx.font = "bold 15px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("PHẢN CÔNG TỬ THẦN — HẠ GỤC NGAY!", canvas.width/2, 60);
                    ctx.font = "bold 11px Consolas, monospace"; ctx.fillStyle = "#fff";
                    ctx.fillText("Còn " + Math.ceil(this.subTimer/60) + "s — hoặc dùng khiên!", canvas.width/2, 78); ctx.textAlign = "left";
                }
                if (this.state === 'desp_slash') {
                    ctx.fillStyle = "rgba(255,255,255," + Math.max(0, 0.5 - this.subTimer/40) + ")"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.save(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 3; ctx.shadowBlur = 10; ctx.shadowColor = "#FF1744";
                    for (let i = 0; i < 22; i++) { if (this.subTimer >= i) {
                        let a = i * 0.5, dx = Math.cos(a), dy = Math.sin(a), off = ((i % 9) - 4) * 90, px = -dy, py = dx, L = 900;
                        let ox = canvas.width/2 + px * off, oy = 200 + py * off * 0.4; ctx.globalAlpha = Math.max(0, 1 - (this.subTimer - i) / 22);
                        ctx.beginPath(); ctx.moveTo(ox - dx * L, oy - dy * L); ctx.lineTo(ox + dx * L, oy + dy * L); ctx.stroke();
                    } }
                    ctx.restore(); ctx.globalAlpha = 1;
                }
                // rush slash arc
                if (this.state === 'rush_slash' && this.subTimer < 12) {
                    let sd = this.facingLeft ? -1 : 1;
                    ctx.save(); ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 5; ctx.shadowBlur = 10; ctx.shadowColor = "#FF1744"; ctx.globalAlpha = Math.max(0, 1 - this.subTimer/12);
                    ctx.beginPath(); ctx.arc(this.x + this.w/2 + sd * 20, this.y + this.h/2, 56, sd < 0 ? Math.PI*0.6 : -Math.PI*0.4, sd < 0 ? Math.PI*1.4 : Math.PI*0.4); ctx.stroke();
                    ctx.restore(); ctx.globalAlpha = 1;
                }

                // HP BAR + name
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 160, 18, 320, 14);
                ctx.fillStyle = "#FF1744"; ctx.fillRect(canvas.width/2 - 158, 20, 316 * Math.max(0, this.hp/this.maxHp), 10);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText(this.name, canvas.width/2, 14); ctx.textAlign = "left"; ctx.restore();
            }
            update() {
                // physics
                this.dy += 0.65; this.y += this.dy;
                if (this.y >= this.baseY) { this.y = this.baseY; this.dy = 0; this.grounded = true; }
                if (this.jumpCd > 0) this.jumpCd--;

                if (this.state === 'dying') {
                    this.subTimer++; if (this.subTimer === 20) { visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion')); }
                    return;
                }
                if (this.state === 'entering') { this.x -= 4; this.faceP(); if (this.x <= this.baseX) { this.x = this.baseX; this.state = 'intro'; this.subTimer = 0; } return; }
                else if (this.state === 'intro') {
                    this.subTimer++; shakeTimer = 4;
                    if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x + this.w/2 - 30, this.y - 12, "EREBUS REX!")); visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion')); }
                    if (this.subTimer > 46) { this.state = 'idle'; this.actionTimer = 42; }
                }
                else if (this.state === 'idle') {
                    this.faceP();
                    // desperation trigger (once)
                    if (this.hp <= this.maxHp * 0.2 && !this.usedDesperation) { this.state = 'desp_charge'; this.subTimer = 180; SFX.bossEntry && SFX.bossEntry(); return; }
                    // free roam: keep a comfortable distance, hop toward player
                    this.keepDist(270, 380, 5, 2.6);
                    if (!dino.grounded && Math.random() < 0.05) this.tryJump(-12);
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let skills = ['barrage', 'rush', 'charge', 'fakeult'];
                        let chosen = pickFromBag(this, skills);   // TUI CHIEU: dung het roi moi lap
                        if (chosen === 'barrage') { this.state = 'barrage'; this.subTimer = 0; this.shotCount = 0; }
                        else if (chosen === 'rush') { this.state = 'rush_in'; this.subTimer = 0; }
                        else if (chosen === 'fakeult') { this.state = 'fakeult_warn'; this.subTimer = 0; this.jcX = dino.x + dino.w/2; this.jcY = dino.y + dino.h/2; this.jcR = 30; }
                        else {
                            this.state = 'charge_up'; this.chargeVariant = Math.random() < 0.5 ? 0 : 1;
                            this.chargeTimer = this.chargeVariant === 0 ? 55 : 80; this.chargeMax = this.chargeTimer;
                        }
                    }
                }
                // ---- BARRAGE: 5 blades, jump-follow, last 2 from center ----
                else if (this.state === 'barrage') {
                    this.faceP();
                    this.keepDist(210);
                    if (!dino.grounded && this.grounded && this.jumpCd <= 0) this.tryJump(-12.5);
                    if (this.subTimer % 16 === 0 && this.shotCount < 3) { this.spawnBlade(9); this.shotCount++; }
                    this.subTimer++;
                    if (this.shotCount >= 3 && this.subTimer % 16 === 0) { this.state = 'barrage_center'; }
                }
                else if (this.state === 'barrage_center') {
                    this.faceP(); this.moveToward(400 - this.w/2, 9);
                    if (!dino.grounded && this.grounded && this.jumpCd <= 0 && Math.random() < 0.1) this.tryJump(-12);
                    if (Math.abs(this.x - (400 - this.w/2)) < 12) { this.x = 400 - this.w/2; this.state = 'barrage_finish'; this.subTimer = 0; }
                }
                else if (this.state === 'barrage_finish') {
                    this.faceP();
                    if (this.subTimer % 10 === 0 && this.shotCount < 5) { this.spawnBlade(11); this.shotCount++; }
                    this.subTimer++;
                    if (this.shotCount >= 5 && this.subTimer > 14) { this.state = 'idle'; this.actionTimer = 46; }
                }
                // ---- RUSH: run in and claw ----
                else if (this.state === 'rush_in') {
                    this.faceP(); this.subTimer++;
                    let tx = dino.x + (dino.x < this.x ? dino.w + 30 : -this.w - 30);
                    this.moveToward(tx, 11);
                    if (!dino.grounded && this.grounded && this.jumpCd <= 0) this.tryJump(dino.jumpPower);
                    if (Math.abs((this.x + this.w/2) - (dino.x + dino.w/2)) < 74 || this.subTimer > 60) { this.state = 'rush_slash'; this.subTimer = 0; shakeTimer = 8; }
                }
                else if (this.state === 'rush_slash') {
                    this.subTimer++;
                    let sd = this.facingLeft ? -1 : 1;
                    let slashRect = { x: this.x + this.w/2 + (sd < 0 ? -80 : 0), y: this.y - 6, w: 80, h: this.h + 12 };
                    if (this.subTimer < 12 && checkAABB(dino, slashRect)) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (this.subTimer > 22) { this.state = 'idle'; this.actionTimer = 40; }
                }
                // ---- CHARGE: piercing blade OR max-charge dash slash ----
                else if (this.state === 'charge_up') {
                    this.faceP(); this.keepDist(210); this.chargeTimer--;
                    if (!dino.grounded && this.grounded && this.jumpCd <= 0 && Math.random() < 0.06) this.tryJump(-12);
                    if (this.chargeTimer <= 0) {
                        if (this.chargeVariant === 0) {
                            // Charge Piercing: fast piercing blade toward player
                            let sx = this.x + this.w/2, sy = this.y + 24;
                            let dx = (dino.x + dino.w/2) - sx, dy = (dino.y + dino.h/2) - sy, d = Math.hypot(dx, dy) || 1;
                            let bp = new BossProjectile(sx - 15, sy - 11, dx/d*15, dy/d*15, false, 2);
                            bp.clawBlade = true; bp.w = 30; bp.h = 22; bp.ang = Math.atan2(dy, dx); bp.color = "#FFEB3B"; bp.isPiercing = true;
                            bossProjectiles.push(bp);
                            this.state = 'idle'; this.actionTimer = 42;
                        } else {
                            this.state = 'dash_slash'; this.subTimer = 0; this.dashDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1; shakeTimer = 10;
                        }
                    }
                }
                else if (this.state === 'dash_slash') {
                    this.subTimer++; this.x += this.dashDir * 20;
                    if (checkAABB(dino, this)) { if (!dino.isShielding()) dino.takeDamage(2); else parry(); }
                    if (this.x < -this.w || this.x > canvas.width || this.subTimer > 40) { this.state = 'dash_back'; }
                }
                else if (this.state === 'dash_back') {
                    this.moveToward(this.baseX, 10); if (Math.abs(this.x - this.baseX) < 12) { this.x = this.baseX; this.state = 'idle'; this.actionTimer = 46; }
                }
                // ---- FAKE ULT: warning circle -> mini judgement cut ----
                else if (this.state === 'fakeult_warn') {
                    this.subTimer++; if (this.jcR < 120) this.jcR += 4;
                    this.faceP(); this.moveToward((dino.x + dino.w/2 < canvas.width/2) ? canvas.width - 160 : 120, 3);
                    if (this.subTimer >= 60) { this.state = 'fakeult_slash'; this.subTimer = 0; shakeTimer = 20; }
                }
                else if (this.state === 'fakeult_slash') {
                    this.subTimer++; shakeTimer = 8;
                    let inside = Math.hypot((dino.x + dino.w/2) - this.jcX, (dino.y + dino.h/2) - this.jcY) <= this.jcR;
                    if (inside && this.subTimer < 34) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (this.subTimer > 40) { this.state = 'idle'; this.actionTimer = 48; }
                }
                // ---- DESPERATION: 3s charge -> full-screen JC (5 dmg) unless killed/parried ----
                else if (this.state === 'desp_charge') {
                    this.subTimer--; shakeTimer = 6;
                    this.moveToward(this.baseX, 2);
                    if (this.subTimer <= 0) { this.state = 'desp_slash'; this.subTimer = 0; this.usedDesperation = true; shakeTimer = 60; SFX.glassBreak && SFX.glassBreak(); }
                }
                else if (this.state === 'desp_slash') {
                    this.subTimer++;
                    if (this.subTimer === 2) { if (dino.isShielding()) { parry(); floatingTexts.push(new FloatingText(dino.x, dino.y - 20, "ĐỠ ĐƯỢC!")); } else dino.takeDamage(99); }
                    if (this.subTimer > 42) { this.state = 'idle'; this.actionTimer = 60; }
                }
            }
        }
// BOSS_PART_END s0.ClawCloneBoss.1

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

// Nguồn: index.html:100013 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:100024 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
