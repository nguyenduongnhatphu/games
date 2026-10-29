// BOSS_FILE: VajraRexBoss
// BOSS_SNAPSHOT: 727b7298f5725557e84ed20d1375204ce421ac8161e96654772477c0b6e53e0c
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, pickFromBag, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:28119 · Dùng bởi: VajraRexBoss
// BOSS_PART_BEGIN s0.VajraRexBoss.1 EDITABLE
class VajraRexBoss {
            constructor(level) {
                this.hp = 125; this.maxHp = 125;
                this.w = 96; this.h = 92; this.baseY = 320 - 92;
                this.x = canvas.width - 260; this.y = this.baseY;
                this.state = 'entering'; this.retState = 'idle'; this.name = "KIM CANG REX";
                this.actionTimer = 70; this.subTimer = 0; this.facingLeft = true; this.lastSkill = '';
                this.comboStep = 0; this.comboParried = 0; this.armFlash = 0; this.dashV = 0;
                this.blades = []; this.ring = null; this.diveTo = 0; this.vy = 0;
                this.stagger = 0; this.echo = null; this.echoSpawned = false; this.aura = 0;
                this.burnTimer = 0; this.lastMeleeHit = -1;
            }
            hitBox() { let sd = this.facingLeft ? -1 : 1; return { x: this.x + (sd < 0 ? -78 : this.w - 6), y: this.y - 14, w: 84, h: this.h + 30 }; }
            update() {
                this.aura += 0.08;
                if (this.state === 'entering') { this.x -= 6; if (this.x <= canvas.width - 280) { this.state = 'intro'; this.subTimer = 0; } return; }
                if (this.state === 'intro') { this.subTimer++; if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x, this.y - 40, "KIM CANG REX!")); if (SFX.bossEntry) SFX.bossEntry(); } if (this.subTimer > 44) { this.state = 'idle'; this.actionTimer = 50; } return; }
                if (this.state !== 'dive_go') this.facingLeft = (dino.x + dino.w/2) < (this.x + this.w/2);
                if (this.armFlash > 0) this.armFlash--;

                // ---- kiem khi CHEO, nay dat 1 lan ----
                for (let i = this.blades.length - 1; i >= 0; i--) {
                    let b = this.blades[i]; b.x += b.vx; b.y += b.vy; b.vy += 0.16;
                    if (b.y > 306 && b.bounce > 0) { b.y = 306; b.vy = -Math.abs(b.vy) * 0.85; b.bounce--; visualEffects.push(new Effect(b.x, 312, 'explosion', true, 14)); }
                    if (checkAABB(dino, { x: b.x - 16, y: b.y - 16, w: 32, h: 32 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); this.blades.splice(i, 1); continue; }
                    if (b.x < -60 || b.x > canvas.width + 60 || b.y > 400) this.blades.splice(i, 1);
                }
                // ---- SONG XUNG KICH BAN CAU (cham + rat to) ----
                if (this.ring) {
                    this.ring.r += 9;
                    let inner = this.ring.r - 46;
                    let feet = dino.y + dino.h, dx = Math.abs((dino.x + dino.w/2) - this.ring.x);
                    if (feet > 292 && dx < this.ring.r && dx > inner) { if (!dino.isShielding()) { if (frames % 14 === 0) dino.takeDamage(1); } else parry(); }
                    if (this.ring.r > canvas.width) this.ring = null;
                }
                // ---- tan anh ----
                if (!this.echoSpawned && this.hp <= this.maxHp * 0.5) {
                    this.echoSpawned = true;
                    let side = (dino.x + dino.w/2) < canvas.width/2 ? 1 : -1;
                    this.echo = { x: side > 0 ? canvas.width - 180 : 120, y: this.baseY, hp: 3, cd: 110 };
                    floatingTexts.push(new FloatingText(this.x, this.y - 44, "TAN ANH!"));
                }
                if (this.echo) {
                    let e = this.echo;
                    let want = (dino.x + dino.w/2) < canvas.width/2 ? canvas.width - 180 : 120;
                    e.x += (want - e.x) * 0.014; e.cd--;
                    if (e.cd <= 0) { e.cd = 130;
                        let ddx = (dino.x + dino.w/2) - e.x, ddy = (dino.y + dino.h/2) - (e.y + 40), d = Math.hypot(ddx, ddy) || 1;
                        let bp = new BossProjectile(e.x, e.y + 34, ddx/d * 5.4, ddy/d * 5.4, false, 1); bp.w = 18; bp.h = 18; bossProjectiles.push(bp); }
                    for (let p = projectiles.length - 1; p >= 0; p--) {
                        let pr = projectiles[p];
                        if (pr._vjEcho) continue;
                        if (checkAABB(pr, { x: e.x - 26, y: e.y, w: 52, h: 92 })) {
                            pr._vjEcho = true; e.hp -= 1; visualEffects.push(new Effect(pr.x, pr.y, 'explosion', true, 14));
                            if (e.hp <= 0) { visualEffects.push(new Effect(e.x, e.y + 40, 'explosion', true, 32)); this.echo = null; }
                            break;
                        }
                    }
                }

                if (this.state === 'idle') {
                    let dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    if (Math.abs(dx) > 250) this.x += Math.sign(dx) * 3.6;
                    else if (Math.abs(dx) < 110) this.x -= Math.sign(dx || 1) * 3.0;
                    this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x));
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let pool = ['combo', 'blade', 'dive', 'ring'];
                        let c = pickFromBag(this, pool);
                        if (c === 'combo') { this.state = 'combo_prep'; this.subTimer = 30; this.comboStep = 1; this.comboParried = 0; }
                        else if (c === 'blade') { this.state = 'blade_prep'; this.subTimer = 32; }
                        else if (c === 'dive') { this.state = 'dive_prep'; this.subTimer = 45; this.diveTo = Math.max(60, Math.min(canvas.width - 160, dino.x + dino.w/2 - this.w/2)); }
                        else { this.state = 'ring_prep'; this.subTimer = 90; }
                    }
                }
                // === COMBO 3 NHAT NHANH ===
                else if (this.state === 'combo_prep') {
                    this.subTimer--; this.armFlash = 3;
                    let dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    if (Math.abs(dx) > 130) this.x += Math.sign(dx) * 4.2;
                    if (this.subTimer <= 0) { this.state = 'combo_hit'; this.subTimer = 12; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'combo_hit') {
                    this.subTimer--;
                    if (this.subTimer === 11) { let sd = this.facingLeft ? -1 : 1; this.dashV = sd * 9; }
                    if (this.dashV) { this.x += this.dashV; this.dashV *= 0.72; if (Math.abs(this.dashV) < 0.6) this.dashV = 0;
                        this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x)); }
                    if (this.subTimer === 9) {
                        let hb = this.hitBox();
                        if (checkAABB(dino, hb)) {
                            if (dino.isShielding()) { parry(); this.comboParried++; floatingTexts.push(new FloatingText(dino.x, dino.y - 20, "PARRY " + this.comboParried + "/3")); }
                            else dino.takeDamage(1);
                        }
                        visualEffects.push(new Effect(hb.x + hb.w/2, hb.y + hb.h/2, 'explosion', true, 20));
                    }
                    if (this.subTimer <= 0) {
                        this.comboStep++;
                        if (this.comboStep > 3) {
                            if (this.comboParried >= 3) { this.state = 'stagger'; this.stagger = 180; floatingTexts.push(new FloatingText(this.x, this.y - 44, "HOAN HAO! CHOANG!")); shakeTimer = 22; }
                            else { this.state = 'idle'; this.actionTimer = 54; }
                        } else { this.state = 'combo_prep'; this.subTimer = this.comboParried > 0 ? 32 : 26; }
                    }
                }
                else if (this.state === 'stagger') { this.stagger--; if (this.stagger <= 0) { this.state = 'idle'; this.actionTimer = 44; } }
                // === KIEM KHI CHEO ===
                else if (this.state === 'blade_prep') { this.subTimer--; this.armFlash = 2;
                    if (this.subTimer > 14) { let cxx = this.x + this.w/2, cyy = this.y + 30; this.aim = { x: cxx, y: cyy, ang: Math.atan2((dino.y + dino.h/2) - cyy, (dino.x + dino.w/2) - cxx), locked: false }; }
                    else if (this.aim) this.aim.locked = true;
                    if (this.subTimer <= 0) {
                    this.state = 'blade_fire'; this.subTimer = 16; if (SFX.bossSkill) SFX.bossSkill();
                    let cxx = this.x + this.w/2, cyy = this.y + 30, base = this.aim ? this.aim.ang : 0;
                    for (let k = -1; k <= 1; k++) {
                        let ang = base + k * 0.30;
                        this.blades.push({ x: cxx, y: cyy, vx: Math.cos(ang) * 7.2, vy: Math.sin(ang) * 7.2, bounce: 1 });
                    }
                } }
                else if (this.state === 'blade_fire') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 50; } }
                // === BO NHAO CHEO CO TARGET ===
                else if (this.state === 'dive_prep') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'dive_go'; this.vy = -14; } }
                else if (this.state === 'dive_go') {
                    this.vy += 0.85; this.y += this.vy; this.x += (this.diveTo - this.x) * 0.17;
                    if (this.vy > 0 && this.y >= this.baseY) {
                        this.y = this.baseY; this.vy = 0; shakeTimer = 26; if (SFX.bossSkill) SFX.bossSkill();
                        let cxx = this.x + this.w/2;
                        if (checkAABB(dino, { x: cxx - 90, y: 210, w: 180, h: 118 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                        visualEffects.push(new Effect(cxx, 312, 'explosion', true, 40));
                        this.blades.push({ x: cxx - 30, y: 300, vx: -6.6, vy: -2.4, bounce: 1 }, { x: cxx + 30, y: 300, vx: 6.6, vy: -2.4, bounce: 1 });
                        this.state = 'idle'; this.actionTimer = 56;
                    }
                }
                // === SONG XUNG KICH KHONG LO (cham nhat, to nhat) ===
                else if (this.state === 'ring_prep') { this.subTimer--; if (this.subTimer <= 0) {
                    this.state = 'ring_go'; this.subTimer = 90; shakeTimer = 40; if (SFX.bossSkill) SFX.bossSkill();
                    this.ring = { x: this.x + this.w/2, r: 40 };
                } }
                else if (this.state === 'ring_go') { this.subTimer--; if (this.subTimer <= 0 || !this.ring) { this.state = 'idle'; this.actionTimer = 60; } }
            }
            draw() {
                let cx = this.x + this.w/2, sd = this.facingLeft ? -1 : 1;
                if (this.state === 'dive_prep' || this.state === 'dive_go') {
                    let k = this.state === 'dive_prep' ? 1 - this.subTimer / 45 : 1;
                    ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.beginPath(); ctx.ellipse(this.diveTo + this.w/2, 316, Math.max(8, 40 + k * 50), Math.max(4, 9 + k * 7), 0, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 3; ctx.stroke();
                }
                if (this.state === 'ring_prep') {
                    let k = 1 - this.subTimer / 90;
                    ctx.strokeStyle = "rgba(255,213,79," + (0.3 + k * 0.6).toFixed(2) + ")"; ctx.lineWidth = 5;
                    ctx.beginPath(); ctx.ellipse(cx, 312, Math.max(10, 40 + k * 420), Math.max(6, 14 + k * 60), 0, 0, Math.PI*2); ctx.stroke();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("SONG XUNG KICH! NHAY LEN BE DA!", canvas.width/2, 44); ctx.textAlign = "left";
                }
                if (this.ring) {
                    for (let s = -1; s <= 1; s += 2) {
                        let rx = this.ring.x + s * this.ring.r;
                        ctx.fillStyle = "rgba(255,213,79,0.85)"; ctx.fillRect(rx - 22, 250, 44, 70);
                        ctx.fillStyle = "#FFF59D"; ctx.fillRect(rx - 9, 250, 18, 70);
                    }
                }
                for (let b of this.blades) {
                    ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx));
                    ctx.fillStyle = "#FFD54F"; ctx.fillRect(-20, -7, 40, 14);
                    ctx.fillStyle = "#FFF59D"; ctx.fillRect(-20, -3, 40, 6);
                    ctx.strokeStyle = "#F57F17"; ctx.lineWidth = 2; ctx.strokeRect(-20, -7, 40, 14); ctx.restore();
                }
                if (this.echo) {
                    let e = this.echo;
                    ctx.globalAlpha = 0.55; ctx.fillStyle = "#9575CD";
                    ctx.fillRect(e.x - 26, e.y + 20, 52, 52); ctx.fillRect(e.x - 14, e.y - 2, 40, 30); ctx.globalAlpha = 1;
                    ctx.strokeStyle = "#B39DDB"; ctx.lineWidth = 2; ctx.strokeRect(e.x - 26, e.y + 20, 52, 52);
                    ctx.fillStyle = "#FFF"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("TAN ANH " + e.hp, e.x, e.y - 10); ctx.textAlign = "left";
                }
                if (this.state === 'blade_prep' && this.aim) {
                    ctx.strokeStyle = this.aim.locked ? "#FFEB3B" : "rgba(255,213,79,0.4)"; ctx.lineWidth = this.aim.locked ? 6 : 3;
                    for (let k = -1; k <= 1; k++) { let ang = this.aim.ang + k * 0.30;
                        ctx.beginPath(); ctx.moveTo(this.aim.x, this.aim.y); ctx.lineTo(this.aim.x + Math.cos(ang) * 900, this.aim.y + Math.sin(ang) * 900); ctx.stroke(); }
                }
                if (this.state === 'combo_prep') {
                    let hb = this.hitBox(), a = 0.2 + 0.35 * (1 - this.subTimer / 40);
                    ctx.fillStyle = "rgba(255,235,59," + a.toFixed(2) + ")"; ctx.fillRect(hb.x, hb.y, hb.w, hb.h);
                    ctx.strokeStyle = "#FFEB3B"; ctx.lineWidth = 3; ctx.strokeRect(hb.x, hb.y, hb.w, hb.h);
                    ctx.fillStyle = "#FFF"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("NHAT " + this.comboStep + "/3", cx, this.y - 42); ctx.textAlign = "left";
                }
                if (this.state === 'combo_hit' && this.subTimer > 7) { let hb = this.hitBox(); ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.fillRect(hb.x, hb.y, hb.w, hb.h); }
                ctx.fillStyle = "#455A64"; ctx.fillRect(this.x + 10, this.y + 26, this.w - 20, 46);
                ctx.fillStyle = "#546E7A"; ctx.fillRect(this.x + (sd < 0 ? -12 : this.w - 30), this.y + 4, 42, 32);
                ctx.fillStyle = "#455A64"; ctx.fillRect(this.x + 18, this.y + 70, 18, 22); ctx.fillRect(this.x + this.w - 36, this.y + 70, 18, 22);
                ctx.save(); ctx.translate(cx + sd * 40, this.y + 40); ctx.rotate(sd * (this.state === 'combo_hit' ? 0.9 : -0.5));
                ctx.fillStyle = this.armFlash > 0 ? "#FFF59D" : "#546E7A"; ctx.fillRect(-11, 0, 22, 46);
                ctx.fillStyle = this.armFlash > 0 ? "#FFFFFF" : "#37474F"; ctx.fillRect(-16, 40, 32, 22);
                ctx.strokeStyle = "#1C262B"; ctx.lineWidth = 2; ctx.strokeRect(-16, 40, 32, 22); ctx.restore();
                ctx.fillStyle = "#FFD54F"; ctx.fillRect(this.x + 10, this.y + 48, this.w - 20, 8);
                ctx.strokeStyle = "rgba(255,213,79," + (0.35 + 0.25 * Math.sin(this.aura)).toFixed(2) + ")"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(cx, this.y + 20, Math.max(10, 30 + 3 * Math.sin(this.aura)), 0, Math.PI*2); ctx.stroke();
                ctx.strokeStyle = "#1C262B"; ctx.lineWidth = 3;
                ctx.strokeRect(this.x + 10, this.y + 26, this.w - 20, 46);
                ctx.strokeRect(this.x + (sd < 0 ? -12 : this.w - 30), this.y + 4, 42, 32);
                ctx.fillStyle = this.state === 'stagger' ? "#FFEB3B" : "#FF5252";
                ctx.fillRect(this.x + (sd < 0 ? -4 : this.w - 22), this.y + 14, 12, 8);
                if (this.state === 'stagger') { ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("CHOANG - DANH DI!", cx, this.y - 42); ctx.textAlign = "left"; }
                // ctx.fillStyle = "black"; ctx.fillRect(this.x, this.y - 26, this.w, 9);
                // ctx.fillStyle = "#FFD54F"; ctx.fillRect(this.x + 1, this.y - 25, (this.w - 2) * Math.max(0, this.hp / this.maxHp), 7);
                ctx.fillStyle = "white"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + "  " + Math.max(0, Math.ceil(this.hp)) + "/" + this.maxHp, this.x + this.w/2, this.y - 30); ctx.textAlign = "left";
            }
}
// BOSS_PART_END s0.VajraRexBoss.1

// Nguồn: index.html:98807 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:98818 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
