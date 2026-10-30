// BOSS_FILE: FireDragonBoss
// BOSS_SNAPSHOT: 36782d91d2329d9857af74607927116e9ca394bac5cc7f15d33431859a55fe63
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, pickFromBag, shakeTimer, troiSinh, troiVy, visualEffects, worldL, worldR
// Nguồn: index.html:28326 · Dùng bởi: FireDragonBoss
// BOSS_PART_BEGIN s0.FireDragonBoss.1 EDITABLE
class FireDragonBoss {
            constructor(level) {
                this.hp = 75; this.maxHp = 75;
                this.w = 126; this.h = 56; this.x = canvas.width + 40; this.y = 110;
                this.state = 'entering'; this.retState = 'roam'; this.name = "HOA LONG";
                this.actionTimer = 90; this.subTimer = 0; this.facingLeft = true; this.lastSkill = '';
                this.wing = 0; this.bob = 0; this.aim = null; this.trail = []; this.marks = [];
                this.markX = 0; this.markLock = false; this.dashY = 0; this.dashVx = 0; this.tailFx = 0;
                this.burnTimer = 0; this.lastMeleeHit = -1;
            }
            rest(n) { this.state = 'rest'; this.subTimer = n; }
            update() {
                this.wing += 0.3; this.bob += 0.06; if (this.tailFx > 0) this.tailFx--;
                if (this.state === 'entering') { this.x -= 6; if (this.x <= canvas.width - 250) { this.state = 'intro'; this.subTimer = 0; } return; }
                if (this.state === 'intro') { this.subTimer++; if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x, this.y - 40, "HOA LONG!")); if (SFX.bossEntry) SFX.bossEntry(); } if (this.subTimer > 44) { this.state = 'roam'; this.actionTimer = 70; } return; }
                if (this.state !== 'dash_go' && this.state !== 'sky_fall') this.facingLeft = (dino.x + dino.w/2) < (this.x + this.w/2);

                for (let i = this.trail.length - 1; i >= 0; i--) {
                    let t = this.trail[i]; t.life--;
                    if (t.life <= 0) { this.trail.splice(i, 1); continue; }
                    if (checkAABB(dino, { x: t.x - 24, y: t.y - 22, w: 48, h: 56 })) { if (!dino.isShielding()) { if (frames % 18 === 0) dino.takeDamage(1); } else parry(); }
                }
                // ---- NGHI: bay lo lung, khong tan cong ----
                if (this.state === 'rest') {
                    this.subTimer--;
                    let ty = 100 + Math.sin(this.bob) * 24; this.y += (ty - this.y) * 0.06;
                    let dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    if (Math.abs(dx) < 250) this.x -= Math.sign(dx || 1) * 1.6;
                    this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x));
                    if (this.subTimer <= 0) { this.state = 'roam'; this.actionTimer = 24; }
                    return;
                }
                if (this.state === 'roam') {
                    let ty = 105 + Math.sin(this.bob) * 26; this.y += (ty - this.y) * 0.07;
                    let dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    if (Math.abs(dx) < 240) this.x -= Math.sign(dx || 1) * 2.6;
                    else if (Math.abs(dx) > 430) this.x += Math.sign(dx) * 3.0;
                    this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x));
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let pool = ['dash', 'sky', 'ball', 'claw', 'rain', 'tail'];
                        let c = pickFromBag(this, pool);
                        if (c === 'dash') { this.state = 'dash_prep'; this.subTimer = 42; this.dashY = Math.max(90, Math.min(276, dino.y + dino.h/2 - this.h/2)); }
                        else if (c === 'sky') { this.state = 'sky_up'; this.subTimer = 62; this.markX = dino.x + dino.w/2; this.markLock = false; }
                        else if (c === 'ball') { this.state = 'ball_prep'; this.subTimer = 32; }
                        else if (c === 'rain') { this.state = 'rain_prep'; this.subTimer = 56;
                            this.marks = [110, 290, 470, 650, 830].sort(() => Math.random() - 0.5).slice(0, 4).sort((a,b)=>a-b); }
                        else if (c === 'tail') { this.state = 'tail_prep'; this.subTimer = 44; this.dashY = 250; }
                        else { this.state = 'claw_prep'; this.subTimer = 36; this.dashY = Math.max(90, Math.min(286, dino.y + dino.h/2 - this.h/2)); }
                    }
                }
                else if (this.state === 'dash_prep') {
                    this.subTimer--; this.y += (this.dashY - this.y) * 0.14;
                    let side = (dino.x + dino.w/2) < canvas.width/2 ? canvas.width - this.w - 10 : 10;
                    this.x += (side - this.x) * 0.10;
                    if (this.subTimer <= 0) { this.state = 'dash_go'; this.dashVx = (this.x > canvas.width/2) ? -13 : 13; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'dash_go') {
                    this.x += this.dashVx;
                    if (frames % 4 === 0) this.trail.push({ x: this.x + this.w/2, y: this.y + this.h - 4, life: 60 });
                    if (checkAABB(dino, { x: this.x, y: this.y, w: this.w, h: this.h + 30 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (this.x < -150 || this.x > canvas.width + 150) { this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x)); this.rest(80); }
                }
                else if (this.state === 'sky_up') {
                    this.subTimer--; this.y -= 8;
                    let rate = this.subTimer > 30 ? 0.18 : 0.012;
                    this.markX += ((dino.x + dino.w/2) - this.markX) * rate;
                    if (this.subTimer <= 30) this.markLock = true;
                    if (this.subTimer <= 0) { this.state = 'sky_fall'; this.x = this.markX - this.w/2; this.y = -90; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'sky_fall') {
                    this.y += 17;
                    if (this.y >= 320 - this.h) {
                        this.y = 320 - this.h; shakeTimer = 30;
                        visualEffects.push(new Effect(this.markX, 300, 'explosion', true, 46));
                        for (let k = 0; k < 4; k++) visualEffects.push(new Effect(this.markX + (Math.random()-0.5)*130, 300 - Math.random()*50, 'explosion', true, 22));
                        if (checkAABB(dino, { x: this.markX - 80, y: 238, w: 160, h: 92 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                        this.state = 'sky_rise'; this.subTimer = 26;
                    }
                }
                else if (this.state === 'sky_rise') { this.subTimer--; this.y -= 5; if (this.subTimer <= 0) { this.markLock = false; this.rest(70); } }
                else if (this.state === 'ball_prep') {
                    this.subTimer--;
                    if (this.subTimer > 14) { let cx = this.x + this.w/2, cy = this.y + this.h/2;
                        let ddx = (dino.x + dino.w/2) - cx, ddy = (dino.y + dino.h/2) - cy, dd = Math.hypot(ddx, ddy) || 1;
                        this.aim = { x: cx, y: cy, vx: ddx/dd, vy: ddy/dd, locked: false }; }
                    else if (this.aim) this.aim.locked = true;
                    if (this.subTimer <= 0) { this.state = 'ball_fire'; this.subTimer = 14; if (SFX.bossSkill) SFX.bossSkill();
                        let a = this.aim, sp = 9;
                        for (let k = -1; k <= 1; k++) { let ang = Math.atan2(a.vy, a.vx) + k * 0.22;
                            let bp = new BossProjectile(a.x - 9, a.y - 9, Math.cos(ang)*sp, Math.sin(ang)*sp, false, 1); bp.fire = true; bp.w = 18; bp.h = 18; bossProjectiles.push(bp); } }
                }
                else if (this.state === 'ball_fire') { this.subTimer--; if (this.subTimer <= 0) this.rest(60); }
                // === MUA LUA: danh dau 4 cot roi tha cau lua ===
                else if (this.state === 'rain_prep') { this.subTimer--; this.y += ((70) - this.y) * 0.07;
                    if (this.subTimer <= 0) { this.state = 'rain_fire'; this.subTimer = 90; if (SFX.bossSkill) SFX.bossSkill();
                        for (let m of this.marks) { let bp = new BossProjectile(m - 11, troiSinh(), 0, troiVy(5.2, -30), false, 1); bp.fire = true; bp.w = 22; bp.h = 22; bossProjectiles.push(bp); } } }
                else if (this.state === 'rain_fire') { this.subTimer--; if (this.subTimer <= 0) this.rest(66); }
                // === QUET DUOI LUA: bay sat dat, de lai vet lua dai ===
                else if (this.state === 'tail_prep') { this.subTimer--; this.y += (this.dashY - this.y) * 0.12;
                    if (this.subTimer <= 0) { this.state = 'tail_go'; this.subTimer = 70; this.dashVx = (dino.x + dino.w/2) < (this.x + this.w/2) ? -9 : 9; this.tailFx = 70; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'tail_go') {
                    this.x += this.dashVx; this.subTimer--;
                    if (frames % 5 === 0) this.trail.push({ x: this.x + this.w/2, y: 292, life: 110 });
                    if (checkAABB(dino, { x: this.x - 20, y: this.y, w: this.w + 40, h: this.h + 20 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (this.subTimer <= 0 || this.x < -130 || this.x > canvas.width + 130) { this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x)); this.rest(78); }
                }
                else if (this.state === 'claw_prep') { this.subTimer--; this.y += (this.dashY - this.y) * 0.12; if (this.subTimer <= 0) { this.state = 'claw_go'; this.subTimer = 40; this.dashVx = (dino.x + dino.w/2) < (this.x + this.w/2) ? -12 : 12; } }
                else if (this.state === 'claw_go') {
                    this.x += this.dashVx; this.subTimer--;
                    if (checkAABB(dino, this)) { if (!dino.isShielding()) dino.takeDamage(1); else { parry(); this.rest(80); return; } }
                    if (this.subTimer <= 0 || this.x < -20 || this.x > canvas.width + 20) { this.x = Math.max(worldL(), Math.min(worldR() - this.w, this.x)); this.rest(62); }   // dung o mep man, khong bien mat roi hien lai
                }
            }
            draw() {
                let cx = this.x + this.w/2, cy = this.y + this.h/2, sd = this.facingLeft ? 1 : -1;   // tao hinh ve quay trai san
                for (let t of this.trail) {
                    let a = Math.min(1, t.life / 40);
                    ctx.fillStyle = "rgba(255,87,34," + (0.3 + a * 0.45).toFixed(2) + ")";
                    ctx.beginPath(); ctx.ellipse(t.x, t.y + 10, 26, 30, 0, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "rgba(255,235,59," + (0.4 * a).toFixed(2) + ")";
                    ctx.beginPath(); ctx.ellipse(t.x, t.y + 8, 12, 22, 0, 0, Math.PI*2); ctx.fill();
                }
                if (this.state === 'dash_prep') {
                    ctx.fillStyle = "rgba(255,87,34,0.18)"; ctx.fillRect(0, this.dashY - 6, canvas.width, this.h + 36);
                    ctx.strokeStyle = "#FF7043"; ctx.lineWidth = 2; ctx.strokeRect(0, this.dashY - 6, canvas.width, this.h + 36);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("LAO PHUN LUA - DOI TANG!", canvas.width/2, this.dashY - 14); ctx.textAlign = "left";
                }
                if (this.state === 'rain_prep') for (let m of this.marks) {
                    let k = 1 - this.subTimer / 56;
                    ctx.strokeStyle = "rgba(255,87,34," + (0.35 + k*0.5).toFixed(2) + ")"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(m, 0); ctx.lineTo(m, 320); ctx.stroke();
                    ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.beginPath(); ctx.ellipse(m, 314, 24, 7, 0, 0, Math.PI*2); ctx.fill();
                }
                if (this.state === 'tail_prep') { ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,87,34,0.3)" : "transparent"; ctx.fillRect(0, 276, canvas.width, 48); }
                if (this.state === 'sky_up' || this.state === 'sky_fall') {
                    let r = this.markLock ? 64 : 46 + 8 * Math.sin(frames * 0.4);
                    ctx.strokeStyle = this.markLock ? "#FF1744" : "rgba(255,152,0,0.8)"; ctx.lineWidth = this.markLock ? 6 : 3;
                    ctx.beginPath(); ctx.ellipse(this.markX, 312, Math.max(10, r), Math.max(5, r*0.3), 0, 0, Math.PI*2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(this.markX, 200); ctx.lineTo(this.markX, 320); ctx.stroke();
                    ctx.fillStyle = this.markLock ? "#FF1744" : "#FFB300"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(this.markLock ? "DA KHOA!" : "PHI LONG TAI THIEN", this.markX, 190); ctx.textAlign = "left";
                }
                if (this.state === 'ball_prep' && this.aim) {
                    let a = this.aim;
                    ctx.strokeStyle = a.locked ? "#FF3D00" : "rgba(255,152,0,0.45)"; ctx.lineWidth = a.locked ? 6 : 3;
                    for (let k = -1; k <= 1; k++) { let ang = Math.atan2(a.vy, a.vx) + k * 0.22;
                        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + Math.cos(ang)*900, a.y + Math.sin(ang)*900); ctx.stroke(); }
                }

                // ================= TAO HINH RONG =================
                ctx.save(); ctx.translate(cx, cy); ctx.scale(sd, 1);
                let flap = Math.sin(this.wing);
                // --- canh sau (mang doi) ---
                ctx.fillStyle = "#5D0000";
                ctx.beginPath(); ctx.moveTo(6, -4);
                ctx.quadraticCurveTo(-26, -52 - flap*20, -78, -34 - flap*16);
                ctx.quadraticCurveTo(-52, -10, -60, 16);
                ctx.quadraticCurveTo(-34, 4, -18, 18);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#2E0000"; ctx.lineWidth = 2;
                for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(4, -2); ctx.quadraticCurveTo(-30 - k*10, -34 - flap*14 + k*10, -66 + k*14, -26 - flap*12 + k*16); ctx.stroke(); }
                // --- duoi cong thon dan ---
                ctx.fillStyle = "#B71C1C";
                ctx.beginPath(); ctx.moveTo(24, -6);
                ctx.quadraticCurveTo(64, -2, 86, 16);
                ctx.quadraticCurveTo(66, 8, 22, 8); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FF7043";
                ctx.beginPath(); ctx.moveTo(84, 14); ctx.lineTo(102, 2); ctx.lineTo(90, 24); ctx.closePath(); ctx.fill();
                // --- than ---
                ctx.fillStyle = "#C62828";
                ctx.beginPath(); ctx.ellipse(0, 0, 46, 20, 0, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = "#8E0000";
                ctx.beginPath(); ctx.ellipse(-2, 6, 40, 12, 0, 0, Math.PI*2); ctx.fill();
                // --- vay lung ---
                ctx.fillStyle = "#FF8A65";
                for (let i = -3; i <= 3; i++) { let bx = i * 13;
                    ctx.beginPath(); ctx.moveTo(bx - 6, -16); ctx.lineTo(bx, -30); ctx.lineTo(bx + 6, -16); ctx.closePath(); ctx.fill(); }
                // --- vay than ---
                ctx.strokeStyle = "rgba(255,138,101,0.5)"; ctx.lineWidth = 1.5;
                for (let r = -2; r <= 2; r++) for (let c2 = -2; c2 <= 2; c2++) {
                    ctx.beginPath(); ctx.arc(c2 * 16 - 4, r * 7, 6, Math.PI, 0); ctx.stroke(); }
                // --- chan vuot ---
                ctx.fillStyle = "#8E0000";
                ctx.beginPath(); ctx.moveTo(-10, 14); ctx.quadraticCurveTo(-18, 30, -8, 34); ctx.quadraticCurveTo(-4, 24, 0, 16); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(16, 14); ctx.quadraticCurveTo(10, 30, 20, 34); ctx.quadraticCurveTo(24, 24, 26, 16); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#FFCCBC"; ctx.lineWidth = 2;
                for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-10 + k*3, 33); ctx.lineTo(-14 + k*4, 40); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(18 + k*3, 33); ctx.lineTo(14 + k*4, 40); ctx.stroke(); }
                // --- co + dau ---
                ctx.fillStyle = "#C62828";
                ctx.beginPath(); ctx.moveTo(-34, -6); ctx.quadraticCurveTo(-56, -22, -70, -18);
                ctx.quadraticCurveTo(-58, -6, -34, 8); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#B71C1C";
                ctx.beginPath(); ctx.moveTo(-62, -22); ctx.quadraticCurveTo(-92, -22, -98, -8);
                ctx.quadraticCurveTo(-84, 2, -62, -2); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#8E0000";                                   // sung
                ctx.beginPath(); ctx.moveTo(-70, -20); ctx.lineTo(-78, -40); ctx.lineTo(-62, -22); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(-60, -18); ctx.lineTo(-64, -36); ctx.lineTo(-52, -20); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FFEB3B";                                   // mat
                ctx.beginPath(); ctx.ellipse(-80, -12, 6, 4, 0, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = "#000"; ctx.fillRect(-82, -14, 2, 5);
                ctx.fillStyle = "#FFCCBC";                                   // rang
                for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-92 + k*8, -2); ctx.lineTo(-89 + k*8, 5); ctx.lineTo(-86 + k*8, -2); ctx.closePath(); ctx.fill(); }
                // --- lua o mieng khi lao/phun ---
                if (this.state === 'dash_go' || this.state === 'tail_go' || this.state === 'claw_go') {
                    ctx.fillStyle = "rgba(255,152,0,0.75)";
                    ctx.beginPath(); ctx.moveTo(-96, -8); ctx.quadraticCurveTo(-150, -22, -186, 4); ctx.quadraticCurveTo(-146, 20, -96, 10); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "rgba(255,235,59,0.8)";
                    ctx.beginPath(); ctx.moveTo(-96, -2); ctx.quadraticCurveTo(-136, -8, -160, 4); ctx.quadraticCurveTo(-132, 12, -96, 6); ctx.closePath(); ctx.fill();
                }
                // --- canh truoc ---
                ctx.fillStyle = "#E53935";
                ctx.beginPath(); ctx.moveTo(2, -6);
                ctx.quadraticCurveTo(-18, -64 - flap*26, -60, -50 - flap*22);
                ctx.quadraticCurveTo(-36, -18, -44, 8);
                ctx.quadraticCurveTo(-22, -2, -6, 14);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#7F0000"; ctx.lineWidth = 2.5;
                ctx.stroke();
                for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(0, -4); ctx.quadraticCurveTo(-22 - k*8, -44 - flap*18 + k*12, -52 + k*12, -40 - flap*16 + k*16); ctx.stroke(); }
                ctx.restore();

                // ctx.fillStyle = "black"; ctx.fillRect(this.x, this.y - 30, this.w, 9);
                // ctx.fillStyle = "#FF5252"; ctx.fillRect(this.x + 1, this.y - 29, (this.w - 2) * Math.max(0, this.hp / this.maxHp), 7);
                ctx.fillStyle = "white"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + "  " + Math.max(0, Math.ceil(this.hp)) + "/" + this.maxHp, cx, this.y - 34); ctx.textAlign = "left";
            }
}
// BOSS_PART_END s0.FireDragonBoss.1

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
