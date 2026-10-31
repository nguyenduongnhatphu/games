// BOSS_FILE: GreatApeBoss
// BOSS_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, pickFromBag, platforms, shakeTimer, visualEffects
// Nguồn: index.html:206 · Dùng bởi: DragonLordBoss, EmberWolfBoss, FlameCoreBoss, FlameLancerBoss, GreatApeBoss, MagmorBoss, QuetzalBoss
// BOSS_PART_BEGIN s0.GWAVE_H.1 READ_ONLY
const GWAVE_H = 96, GWAVE_SPD = 11.5;
// BOSS_PART_END s0.GWAVE_H.1

// Nguồn: index.html:33814 · Dùng bởi: GreatApeBoss
// BOSS_PART_BEGIN s0.GreatApeBoss.1 EDITABLE
class GreatApeBoss {
            constructor(level) {
                this.hp = 130; this.maxHp = 130;
                this.w = 150; this.h = 104; this.baseY = 320 - 104;
                this.treeX = 810; this.treeTopY = 96;                 // than cay
                this.x = canvas.width + 40; this.y = this.baseY;
                this.state = 'entering'; this.retState = 'tree_idle'; this.name = "CU VIEN";
                this.actionTimer = 90; this.subTimer = 0; this.facingLeft = true; this.lastSkill = '';
                this.treeDmg = 0; this.treeHp = 0; this.gndCount = 0; this.stunT = 0;
                this.fruits = []; this.debris = []; this.armUp = 0; this.beat = 0;
                this.diveX = 0; this.diveLock = false; this.rollVx = 0; this.leafBanT = 0; this.sway = 0;
                this.burnTimer = 0; this.lastMeleeHit = -1;
            }
            leaves() { return platforms.filter(p => p.isLeaf); }
            onTree() { return this.state === 'tree_idle' || this.state === 'tree_lob' || this.state === 'tree_shake' || this.state === 'tree_dive_prep'; }
            // nem chuan: tinh quy dao sao cho roi dung cho nguoi choi sau T frame
            lob(sx, sy, tx, ty, T, g) {
                let vx = (tx - sx) / T, vy = (ty - sy - 0.5 * g * T * T) / T;
                return { vx: vx, vy: vy };
            }
            update() {
                this.sway += 0.04;
                if (this.state === 'entering') { this.x -= 6; if (this.x <= this.treeX - 40) { this.state = 'climb_up'; this.subTimer = 40; } return; }
                if (this.state === 'climb_up') {
                    this.subTimer--;
                    this.x += ((this.treeX - this.w/2 + 10) - this.x) * 0.16;
                    this.y += ((this.treeTopY) - this.y) * 0.16;
                    if (this.subTimer <= 0) { this.x = this.treeX - this.w/2 + 10; this.y = this.treeTopY;
                        this.state = 'tree_idle'; this.actionTimer = 60; this.treeDmg = 0; this.treeHp = this.hp;
                        floatingTexts.push(new FloatingText(this.x - 30, this.y - 30, "LEN CAY! TREO LEN LA MA BAN!")); }
                    return;
                }
                if (this.state !== 'roll_go' && this.state !== 'dive_go') this.facingLeft = (dino.x + dino.w/2) < (this.x + this.w/2);

                // ---- cam la ----
                if (this.leafBanT > 0) { this.leafBanT--;
                    for (let p of this.leaves()) if (p.solid) { p.solid = false; p.leafCd = this.leafBanT; p.fallY = 0; } }
                // ---- qua nem ----
                for (let i = this.fruits.length - 1; i >= 0; i--) {
                    let f = this.fruits[i]; f.vy += 0.3; f.x += f.vx; f.y += f.vy;
                    if (checkAABB(dino, { x: f.x - 17, y: f.y - 17, w: 34, h: 34 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry();
                        visualEffects.push(new Effect(f.x, f.y, 'explosion', true, 20)); this.fruits.splice(i, 1); continue; }
                    if (f.y > 306) { visualEffects.push(new Effect(f.x, 306, 'explosion', true, 22));
                        if (Math.abs((dino.x + dino.w/2) - f.x) < 46 && dino.grounded) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                        this.fruits.splice(i, 1); continue; }
                    if (f.x < -70 || f.x > canvas.width + 70) this.fruits.splice(i, 1);
                }
                for (let i = this.debris.length - 1; i >= 0; i--) {
                    let d2 = this.debris[i]; d2.y += d2.vy; d2.x += Math.sin(d2.y * 0.05) * 1.5;
                    if (checkAABB(dino, { x: d2.x - 14, y: d2.y - 10, w: 28, h: 20 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); this.debris.splice(i, 1); continue; }
                    if (d2.y > 330) this.debris.splice(i, 1);
                }
                if (this.stunT > 0) { this.stunT--; if (this.stunT <= 0) { this.state = 'gnd_idle'; this.actionTimer = 40; } return; }

                // ============ TREN CAY: an du 5 sat thuong thi ROT ============
                if (this.onTree()) {
                    if (this.hp < this.treeHp) { this.treeDmg += (this.treeHp - this.hp); this.treeHp = this.hp;
                        floatingTexts.push(new FloatingText(this.x, this.y - 16, "BAM CAY " + Math.min(5, Math.round(this.treeDmg)) + "/5")); }
                    if (this.treeDmg >= 5) {
                        this.state = 'tree_drop'; this.subTimer = 0; this.treeDmg = 0; shakeTimer = 20;
                        floatingTexts.push(new FloatingText(this.x, this.y - 30, "ROT XUONG!"));
                        this.fruits.length = 0; return;
                    }
                }
                if (this.state === 'tree_idle') {
                    this.x = this.treeX - this.w/2 + 10 + Math.sin(this.sway) * 8;
                    this.y = this.treeTopY + Math.sin(this.sway * 1.3) * 5;
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let pool = ['lob', 'shake', 'dive'].filter(k => k !== this.lastSkill);
                        let c = pickFromBag(this, pool);
                        if (c === 'lob') { this.state = 'tree_lob'; this.subTimer = 40; }
                        else if (c === 'shake') { this.state = 'tree_shake'; this.subTimer = 50; }
                        else { this.state = 'tree_dive_prep'; this.subTimer = 55; this.diveX = dino.x + dino.w/2; this.diveLock = false; }
                    }
                }
                // --- nem qua (quy dao chuan, roi dung cho nguoi choi) ---
                else if (this.state === 'tree_lob') {
                    this.armUp = Math.min(1, this.armUp + 0.05); this.subTimer--;
                    if (this.subTimer <= 0) {
                        let sx = this.x + this.w/2, sy = this.y + 30;
                        for (let k = 0; k < 3; k++) {
                            let tx = dino.x + dino.w/2 + (k - 1) * 70, ty = dino.y + dino.h - 6;
                            let v = this.lob(sx, sy, tx, ty, 62 + k * 6, 0.3);
                            this.fruits.push({ x: sx, y: sy, vx: v.vx, vy: v.vy });
                        }
                        if (SFX.bossSkill) SFX.bossSkill();
                        this.state = 'tree_idle'; this.actionTimer = 56; this.armUp = 0;
                    }
                }
                // --- rung cay: la rung + cam la 3 giay ---
                else if (this.state === 'tree_shake') {
                    this.subTimer--; shakeTimer = Math.max(shakeTimer, 6);
                    this.x = this.treeX - this.w/2 + 10 + Math.sin(frames * 0.6) * 14;
                    if (this.subTimer === 1) {
                        this.leafBanT = 180;
                        for (let k = 0; k < 10; k++) this.debris.push({ x: 180 + Math.random() * (canvas.width - 260), y: -20 - Math.random() * 80, vy: 3.4 + Math.random() * 2 });
                        floatingTexts.push(new FloatingText(canvas.width/2 - 80, 130, "RUNG CAY! LA RUNG 3 GIAY"));
                        if (SFX.bossEntry) SFX.bossEntry();
                    }
                    if (this.subTimer <= 0) { this.state = 'tree_idle'; this.actionTimer = 62; }
                }
                // --- LAO XUONG: khoa muc tieu roi bo nhao ---
                else if (this.state === 'tree_dive_prep') {
                    this.subTimer--;
                    if (this.subTimer > 22) this.diveX = dino.x + dino.w/2; else this.diveLock = true;
                    if (this.subTimer <= 0) { this.state = 'dive_go'; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'dive_go') {
                    this.x += ((this.diveX - this.w/2) - this.x) * 0.16;
                    this.y += 15;
                    this.facingLeft = true;
                    if (checkAABB(dino, this)) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (this.y >= this.baseY) {
                        this.y = this.baseY; shakeTimer = 34;
                        visualEffects.push(new Effect(this.x + this.w/2, 312, 'explosion', true, 50));
                        if (checkAABB(dino, { x: this.x - 40, y: 240, w: this.w + 80, h: 88 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                        this.state = 'dive_roll'; this.rollVx = -13;
                    }
                }
                // --- lan sang trai roi vong ve phai trèo len lai ---
                else if (this.state === 'dive_roll') {
                    this.x += this.rollVx; this.y = this.baseY + 16;
                    if (checkAABB(dino, { x: this.x + 8, y: this.y, w: this.w - 16, h: this.h - 16 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (this.x < -this.w - 30) { this.state = 'dive_return'; this.x = canvas.width + 40; }
                }
                else if (this.state === 'dive_return') {
                    this.x -= 9; this.y = this.baseY;
                    if (this.x <= this.treeX - 40) { this.state = 'climb_up'; this.subTimer = 40; }
                }
                // ============ ROT XUONG DAT ============
                else if (this.state === 'tree_drop') {
                    this.y += 14;
                    if (this.y >= this.baseY) { this.y = this.baseY; shakeTimer = 36;
                        visualEffects.push(new Effect(this.x + this.w/2, 312, 'explosion', true, 52));
                        this.stunT = 90; this.gndCount = 0; this.state = 'gnd_stun';
                        floatingTexts.push(new FloatingText(this.x, this.y - 26, "CHOANG! DANH DI!")); }
                }
                else if (this.state === 'gnd_stun') { this.stunT--; if (this.stunT <= 0) { this.state = 'gnd_idle'; this.actionTimer = 40; } }
                // ============ DUOI DAT: 3 chieu roi treo len lai ============
                else if (this.state === 'gnd_idle') {
                    this.armUp *= 0.88; this.beat *= 0.85;
                    let dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    if (Math.abs(dx) > 260) this.x += Math.sign(dx) * 2.6;
                    else if (Math.abs(dx) < 120) this.x -= Math.sign(dx || 1) * 2.2;
                    this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x));
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        if (this.gndCount >= 3) { this.state = 'gnd_back'; return; }
                        this.gndCount++;
                        let pool = ['pound', 'roar', 'roll', 'pounce'].filter(k => k !== this.lastSkill);
                        let c = pickFromBag(this, pool);
                        if (c === 'pound') { this.state = 'gnd_pound_prep'; this.subTimer = 46; }
                        else if (c === 'roar') { this.state = 'gnd_roar_prep'; this.subTimer = 42; }
                        else if (c === 'pounce') { this.state = 'gnd_pounce_prep'; this.subTimer = 40; this.diveX = dino.x + dino.w/2; }
                        else { this.state = 'gnd_roll_prep'; this.subTimer = 38; }
                    }
                }
                else if (this.state === 'gnd_back') { this.x += ((this.treeX - 40) - this.x) * 0.09;
                    if (Math.abs(this.x - (this.treeX - 40)) < 12) { this.state = 'climb_up'; this.subTimer = 40; } }
                else if (this.state === 'gnd_pound_prep') { this.armUp = Math.min(1, this.armUp + 0.04); this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'gnd_pound_fire'; this.subTimer = 18; shakeTimer = 34; if (SFX.bossSkill) SFX.bossSkill();
                        let cx = this.x + this.w/2;
                        let w1 = new BossProjectile(cx - 36, 322 - GWAVE_H, -GWAVE_SPD, 0, true, 1); w1.w = 44; w1.h = GWAVE_H; w1.color = "#8D6E63"; w1.crescent = true;
                        let w2 = new BossProjectile(cx + 6, 322 - GWAVE_H, GWAVE_SPD, 0, true, 1); w2.w = 44; w2.h = GWAVE_H; w2.color = "#8D6E63"; w2.crescent = true;
                        bossProjectiles.push(w1, w2);
                        visualEffects.push(new Effect(cx, 310, 'explosion', true, 44)); } }
                else if (this.state === 'gnd_pound_fire') { this.armUp *= 0.8; this.subTimer--; if (this.subTimer <= 0) { this.state = 'gnd_idle'; this.actionTimer = 54; } }
                else if (this.state === 'gnd_roar_prep') { this.beat = 1; this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'gnd_roar_fire'; this.subTimer = 36; shakeTimer = 42; if (SFX.bossEntry) SFX.bossEntry();
                        this.leafBanT = 150;
                        for (let k = 0; k < 8; k++) this.debris.push({ x: 120 + Math.random() * (canvas.width - 200), y: -20 - Math.random() * 80, vy: 3.6 }); } }
                else if (this.state === 'gnd_roar_fire') {
                    this.subTimer--; this.beat = Math.max(0, this.beat - 0.024);
                    let dir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    if (this.subTimer > 18) { dino.x += dir * 4.6; dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x)); }
                    if (this.subTimer === 30 && Math.abs((dino.x + dino.w/2) - (this.x + this.w/2)) < 150) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (this.subTimer <= 0) { this.state = 'gnd_idle'; this.actionTimer = 56; }
                }
                else if (this.state === 'gnd_pounce_prep') { this.subTimer--; if (this.subTimer > 14) this.diveX = dino.x + dino.w/2;
                    if (this.subTimer <= 0) { this.state = 'gnd_pounce_go'; this.subTimer = 40; this.pvy = -13; } }
                else if (this.state === 'gnd_pounce_go') {
                    this.subTimer--; this.pvy += 0.8; this.y += this.pvy; this.x += ((this.diveX - this.w/2) - this.x) * 0.16;
                    if (checkAABB(dino, this)) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (this.pvy > 0 && this.y >= this.baseY) { this.y = this.baseY; shakeTimer = 26;
                        visualEffects.push(new Effect(this.x + this.w/2, 312, 'explosion', true, 36));
                        this.state = 'gnd_idle'; this.actionTimer = 54; }
                }
                else if (this.state === 'gnd_roll_prep') { this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'roll_go'; this.rollVx = (dino.x + dino.w/2) < (this.x + this.w/2) ? -12 : 12; shakeTimer = 20; } }
                else if (this.state === 'roll_go') {
                    this.x += this.rollVx; this.y = this.baseY + 16;
                    if (checkAABB(dino, { x: this.x + 8, y: this.y, w: this.w - 16, h: this.h - 16 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (this.x < -this.w - 20 || this.x > canvas.width + 20) {
                        this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x)); this.y = this.baseY;
                        this.state = 'gnd_idle'; this.actionTimer = 56; }
                }
            }
            draw() {
                let x = this.x, y = this.y, cx = x + this.w/2, sd = this.facingLeft ? -1 : 1;
                // ================= CAY LON =================
                let tx0 = this.treeX, sway = Math.sin(this.sway) * 4 + (this.state === 'tree_shake' ? Math.sin(frames * 0.6) * 10 : 0);
                ctx.fillStyle = "#3E2723";                                   // than cay
                ctx.beginPath(); ctx.moveTo(tx0 - 34, 322);
                ctx.quadraticCurveTo(tx0 - 22, 210, tx0 - 26 + sway, 96);
                ctx.lineTo(tx0 + 30 + sway, 96); ctx.quadraticCurveTo(tx0 + 26, 210, tx0 + 40, 322); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#2E1A12"; ctx.lineWidth = 3;
                for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(tx0 - 20 + k*13, 316); ctx.quadraticCurveTo(tx0 - 14 + k*13, 210, tx0 - 16 + k*11 + sway, 104); ctx.stroke(); }
                ctx.fillStyle = "#4E342E";                                   // re noi
                ctx.beginPath(); ctx.moveTo(tx0 - 34, 322); ctx.quadraticCurveTo(tx0 - 90, 306, tx0 - 120, 322); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(tx0 + 40, 322); ctx.quadraticCurveTo(tx0 + 92, 306, tx0 + 120, 322); ctx.closePath(); ctx.fill();
                // canh vuon qua giua map
                ctx.strokeStyle = "#3E2723"; ctx.lineWidth = 16; ctx.lineCap = "round";
                ctx.beginPath(); ctx.moveTo(tx0 + sway, 120); ctx.quadraticCurveTo(tx0 - 180, 92, tx0 - 400 + sway*0.5, 118); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(tx0 + sway, 150); ctx.quadraticCurveTo(tx0 - 130, 140, tx0 - 300 + sway*0.5, 168); ctx.stroke();
                // tan la
                ctx.fillStyle = "#1B5E20";
                for (const [ox, oy, r] of [[0,-4,110],[-150,10,96],[-300,22,86],[-410,44,64],[90,26,74]]) {
                    ctx.beginPath(); ctx.ellipse(tx0 + ox + sway * 0.6, 96 + oy, r, r * 0.62, 0, 0, Math.PI*2); ctx.fill(); }
                ctx.fillStyle = "#2E7D32";
                for (const [ox, oy, r] of [[-30,-24,80],[-180,-12,66],[-320,4,56],[60,0,52]]) {
                    ctx.beginPath(); ctx.ellipse(tx0 + ox + sway * 0.6, 96 + oy, r, r * 0.58, 0, 0, Math.PI*2); ctx.fill(); }
                ctx.fillStyle = "rgba(102,187,106,0.55)";
                for (const [ox, oy, r] of [[-70,-44,44],[-230,-30,36],[20,-34,34]]) {
                    ctx.beginPath(); ctx.ellipse(tx0 + ox + sway * 0.6, 96 + oy, r, r * 0.5, 0, 0, Math.PI*2); ctx.fill(); }

                for (let d2 of this.debris) {
                    ctx.save(); ctx.translate(d2.x, d2.y); ctx.rotate(d2.y * 0.03);
                    ctx.fillStyle = "#558B2F"; ctx.beginPath(); ctx.ellipse(0, 0, 15, 8, 0, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#33691E"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.stroke(); ctx.restore();
                }
                for (let f of this.fruits) {
                    ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.beginPath(); ctx.ellipse(f.x, 314, 22, 6, 0, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#6D4C41"; ctx.beginPath(); ctx.arc(f.x, f.y, 16, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#8D6E63"; ctx.beginPath(); ctx.arc(f.x - 5, f.y - 5, 6, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#3E2723"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(f.x, f.y, 16, 0, Math.PI*2); ctx.stroke();
                }
                if (this.state === 'tree_dive_prep') {
                    let r = this.diveLock ? 66 : 46 + 8 * Math.sin(frames * 0.4);
                    ctx.strokeStyle = this.diveLock ? "#FF1744" : "rgba(255,193,7,0.75)"; ctx.lineWidth = this.diveLock ? 6 : 3;
                    ctx.beginPath(); ctx.ellipse(this.diveX, 314, Math.max(10, r), Math.max(5, r*0.28), 0, 0, Math.PI*2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(this.diveX, 160); ctx.lineTo(this.diveX, 320); ctx.stroke();
                    ctx.fillStyle = this.diveLock ? "#FF1744" : "#FFC107"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(this.diveLock ? "DA KHOA - LAO XUONG!" : "DANG NGAM...", this.diveX, 150); ctx.textAlign = "left";
                }
                if (this.state === 'gnd_pound_prep') { let k = 1 - this.subTimer / 46, r = Math.max(8, 26 + k * 58);
                    ctx.strokeStyle = "rgba(109,76,65," + (0.4 + k*0.5).toFixed(2) + ")"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.ellipse(cx, 314, r, Math.max(4, r*0.22), 0, 0, Math.PI*2); ctx.stroke(); }
                if (this.state === 'gnd_pounce_prep') {
                    ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.beginPath(); ctx.ellipse(this.diveX, 314, 48, 11, 0, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#FFC107"; ctx.lineWidth = 3; ctx.stroke(); }
                if (this.state === 'gnd_roll_prep') { ctx.fillStyle = (frames % 6 < 3) ? "rgba(109,76,65,0.32)" : "transparent"; ctx.fillRect(0, 288, canvas.width, 40); }

                // ================= THAN VUON =================
                let roll = (this.state === 'roll_go' || this.state === 'dive_roll');
                ctx.save();
                if (roll) { ctx.translate(cx, y + this.h/2); ctx.rotate(frames * 0.32 * Math.sign(this.rollVx || -1)); ctx.translate(-cx, -(y + this.h/2)); }
                let sh = this.stunT > 0 ? (Math.random()-0.5)*5 : 0;
                let ar = this.armUp, sw = this.beat > 0.1 ? Math.sin(frames * 0.7) * 12 : 0;
                let hang = this.onTree();
                // ===== THIET KE: bo dang TRON VO. Dung dang khi dot that:
                // vai xuoi RONG hon hong, may go nhon (mao dinh so), tay dai chong dot ngon,
                // chan ngan gap (ban cu KHONG CO chan), lung bac (silverback), vien long xu.
                const AOUT = "#241209", AFUR = "#3E2723", ABODY = "#4E342E", ACHEST = "#6D4C41";
                let aRoar = this.state.indexOf('roar') >= 0;

                // --- CHAN NGAN GAP (ve truoc de nam sau than) ---
                ctx.fillStyle = AFUR;
                for (let lg = -1; lg <= 1; lg += 2) {
                    let lx = cx + sh + lg * 27;
                    ctx.beginPath();
                    ctx.moveTo(lx - 17, y + 74); ctx.quadraticCurveTo(lx - 23, y + 94, lx - 19, y + 104);
                    ctx.lineTo(lx + 19, y + 104); ctx.quadraticCurveTo(lx + 21, y + 90, lx + 15, y + 74);
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = AOUT; ctx.lineWidth = 3; ctx.stroke();
                    // ban chan + ngon
                    ctx.fillStyle = "#5D4037";
                    ctx.beginPath(); ctx.ellipse(lx + lg * 4, y + 101, 22, 8, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "#8D6E63";
                    for (let t = -1; t <= 1; t++) { ctx.beginPath(); ctx.arc(lx + lg * 10 + t * 7, y + 100, 3.2, 0, Math.PI * 2); ctx.fill(); }
                    ctx.fillStyle = AFUR;
                }

                // --- TAY DAI: bap tay + cang tay + NAM DAM CHONG DOT NGON ---
                for (let sg = -1; sg <= 1; sg += 2) {
                    let px = (sg < 0) ? (x + 28 + sh) : (x + this.w - 28 + sh);
                    let rot = hang ? (sg * 2.3) : (sg * (0.5 + ar * 1.1) - sg * sw * 0.02);
                    ctx.save(); ctx.translate(px, y + 36); ctx.rotate(rot); ctx.scale(sg, 1);
                    // Tong chieu dai tay = 68px tinh tu vai (y+36) -> nam dam cham dung mat dat (y+104).
                    // bap tay tren (day o vai, thon o khuyu)
                    ctx.fillStyle = AFUR;
                    ctx.beginPath();
                    ctx.moveTo(-20, -6); ctx.quadraticCurveTo(-26, 16, -16, 34);
                    ctx.lineTo(14, 33); ctx.quadraticCurveTo(21, 14, 18, -6); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = AOUT; ctx.lineWidth = 3; ctx.stroke();
                    // cang tay
                    ctx.fillStyle = ABODY;
                    ctx.beginPath();
                    ctx.moveTo(-16, 31); ctx.quadraticCurveTo(-21, 44, -15, 56);
                    ctx.lineTo(13, 56); ctx.quadraticCurveTo(17, 44, 14, 31); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = AOUT; ctx.lineWidth = 3; ctx.stroke();
                    // NAM DAM: chong bang DOT NGON, khong phai qua bong
                    ctx.fillStyle = "#5D4037";
                    ctx.beginPath();
                    ctx.moveTo(-17, 54); ctx.quadraticCurveTo(-23, 63, -14, 68);
                    ctx.quadraticCurveTo(2, 72, 15, 67); ctx.quadraticCurveTo(19, 61, 14, 54); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = AOUT; ctx.lineWidth = 3; ctx.stroke();
                    ctx.fillStyle = "#8D6E63";
                    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(-11 + k * 8, 66, 4, Math.PI, 0); ctx.fill(); }
                    ctx.restore();
                }

                // --- THAN: VAI XUOI RONG, HONG THON ---
                ctx.fillStyle = ABODY;
                ctx.beginPath();
                ctx.moveTo(x + 20 + sh, y + 44);
                ctx.quadraticCurveTo(x + 30 + sh, y + 14, x + 58 + sh, y + 16);     // vai trai
                ctx.quadraticCurveTo(cx + sh, y + 6, x + this.w - 58 + sh, y + 16);  // gay
                ctx.quadraticCurveTo(x + this.w - 30 + sh, y + 14, x + this.w - 20 + sh, y + 44);
                ctx.quadraticCurveTo(x + this.w - 32 + sh, y + 78, x + this.w - 48 + sh, y + 94);
                ctx.lineTo(x + 48 + sh, y + 94);
                ctx.quadraticCurveTo(x + 32 + sh, y + 78, x + 20 + sh, y + 44);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = AOUT; ctx.lineWidth = 4; ctx.stroke();
                // LUNG BAC (silverback)
                ctx.fillStyle = "rgba(158,158,158,0.32)";
                ctx.beginPath();
                ctx.moveTo(x + 34 + sh, y + 30); ctx.quadraticCurveTo(cx + sh, y + 16, x + this.w - 34 + sh, y + 30);
                ctx.quadraticCurveTo(x + this.w - 40 + sh, y + 56, x + this.w - 48 + sh, y + 62);
                ctx.lineTo(x + 48 + sh, y + 62);
                ctx.quadraticCurveTo(x + 40 + sh, y + 56, x + 34 + sh, y + 30); ctx.closePath(); ctx.fill();
                // NGUC (cho chieu dam nguc)
                let beatSc = 1 + (this.beat > 0.1 ? Math.abs(Math.sin(frames * 0.7)) * 0.12 : 0);
                ctx.fillStyle = ACHEST;
                ctx.beginPath(); ctx.ellipse(cx + sh, y + 58, 34 * beatSc, 27 * beatSc, 0, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = "rgba(36,18,9,0.45)"; ctx.lineWidth = 2; ctx.stroke();
                // co bung
                ctx.strokeStyle = "rgba(36,18,9,0.30)"; ctx.lineWidth = 2;
                for (let k = 0; k < 3; k++) { ctx.beginPath();
                    ctx.moveTo(cx - 22 + sh, y + 50 + k * 11); ctx.quadraticCurveTo(cx + sh, y + 55 + k * 11, cx + 22 + sh, y + 50 + k * 11); ctx.stroke(); }
                // vien long xu quanh vai
                ctx.strokeStyle = AFUR; ctx.lineWidth = 3; ctx.lineCap = "round";
                for (let k = 0; k < 16; k++) {
                    let t2 = k / 15, ax2 = x + 20 + sh + t2 * (this.w - 40);
                    let ay2 = y + 44 - Math.sin(t2 * Math.PI) * 30;
                    ctx.beginPath(); ctx.moveTo(ax2, ay2);
                    ctx.lineTo(ax2 + (t2 - 0.5) * 8, ay2 - 7 - (k % 3) * 3); ctx.stroke();
                }
                ctx.lineCap = "butt";

                // --- DAU: MAO DINH SO + GO MAY NANG ---
                let hx2 = cx + sd * 6 + sh, hy2 = y + 18;
                ctx.fillStyle = AFUR;
                ctx.beginPath();
                ctx.moveTo(hx2 - 32, hy2 + 12);
                ctx.quadraticCurveTo(hx2 - 30, hy2 - 18, hx2 - 4, hy2 - 24);
                ctx.quadraticCurveTo(hx2 + 2, hy2 - 34, hx2 + 8, hy2 - 24);       // mao dinh so nhon
                ctx.quadraticCurveTo(hx2 + 30, hy2 - 16, hx2 + 32, hy2 + 10);
                ctx.quadraticCurveTo(hx2 + 20, hy2 + 30, hx2 - 2, hy2 + 30);
                ctx.quadraticCurveTo(hx2 - 24, hy2 + 28, hx2 - 32, hy2 + 12);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = AOUT; ctx.lineWidth = 3; ctx.stroke();
                // go may nang, day = dac trung khi dot
                ctx.fillStyle = "#2E1A12";
                ctx.beginPath();
                ctx.moveTo(hx2 - 26, hy2 - 4); ctx.quadraticCurveTo(hx2, hy2 - 14, hx2 + 26, hy2 - 4);
                ctx.lineTo(hx2 + 24, hy2 + 4); ctx.quadraticCurveTo(hx2, hy2 - 5, hx2 - 24, hy2 + 4);
                ctx.closePath(); ctx.fill();
                // mom nho ra truoc
                ctx.fillStyle = "#8D6E63";
                ctx.beginPath(); ctx.ellipse(hx2 + sd * 9, hy2 + 15, 21, 13, 0, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = AOUT; ctx.lineWidth = 2.5; ctx.stroke();
                // mui bet
                ctx.fillStyle = "#3E2723";
                ctx.beginPath(); ctx.ellipse(hx2 + sd * 12, hy2 + 11, 7, 4, 0, 0, Math.PI * 2); ctx.fill();
                // MAT sau hoc, giu chat pixel
                for (let sg = -1; sg <= 1; sg += 2) {
                    let ex = hx2 + sd * 2 + sg * 9;
                    ctx.fillStyle = "#FFF8E1"; ctx.fillRect(ex - 4, hy2 + 1, 8, 6);
                    ctx.fillStyle = aRoar ? "#FF7043" : "#FFB300"; ctx.fillRect(ex - 3, hy2 + 2, 6, 4);
                    ctx.fillStyle = "black"; ctx.fillRect(ex - 1, hy2 + 3, 2, 2);
                }
                // mieng gam
                if (aRoar) {
                    ctx.fillStyle = "#1B0000";
                    ctx.beginPath(); ctx.ellipse(hx2 + sd * 10, hy2 + 20, 14, 10, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "#FFFFFF";
                    for (let t2 = 0; t2 < 4; t2++) { ctx.beginPath();
                        ctx.moveTo(hx2 + sd * 10 - 10 + t2 * 6, hy2 + 12);
                        ctx.lineTo(hx2 + sd * 10 - 7 + t2 * 6, hy2 + 19);
                        ctx.lineTo(hx2 + sd * 10 - 4 + t2 * 6, hy2 + 12); ctx.closePath(); ctx.fill(); }
                } else {
                    ctx.strokeStyle = "#3E2723"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(hx2 + sd * 2, hy2 + 20);
                    ctx.quadraticCurveTo(hx2 + sd * 10, hy2 + 23, hx2 + sd * 17, hy2 + 19); ctx.stroke();
                }
                ctx.restore();

                if (this.onTree()) {
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("BAM CAY " + Math.min(5, Math.round(this.treeDmg)) + "/5 DE NO ROT", cx, y - 30); ctx.textAlign = "left";
                }
                if (this.stunT > 0) { ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("CHOANG - DANH DI!", cx, y - 26); ctx.textAlign = "left"; }
                if (this.leafBanT > 0) { ctx.fillStyle = "#FF8A65"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("LA RUNG HET: " + Math.ceil(this.leafBanT/60) + "s", canvas.width/2, 150); ctx.textAlign = "left"; }
                // ctx.fillStyle = "black"; ctx.fillRect(x + 8, y - 20, this.w - 16, 10);
                // ctx.fillStyle = "#8D6E63"; ctx.fillRect(x + 9, y - 19, (this.w - 18) * Math.max(0, this.hp / this.maxHp), 8);
                ctx.fillStyle = "white"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + "  " + Math.max(0, Math.ceil(this.hp)) + "/" + this.maxHp, cx, y - 24); ctx.textAlign = "left";
            }
}
// BOSS_PART_END s0.GreatApeBoss.1

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
