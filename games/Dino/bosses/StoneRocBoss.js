// BOSS_FILE: StoneRocBoss
// BOSS_SNAPSHOT: 39483d797c15c5e35e37a5b630ae4f295f939302db706fe13262c4e699541a28
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, pickFromBag, platforms, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:32788 · Dùng bởi: StoneRocBoss
// BOSS_PART_BEGIN s0.StoneRocBoss.1 EDITABLE
class StoneRocBoss {
            constructor(level) {
                this.hp = 75; this.maxHp = 75;
                this.w = 122; this.h = 62; this.x = canvas.width + 40; this.y = 90;
                this.state = 'entering'; this.retState = 'roam'; this.name = "THACH UNG";
                this.actionTimer = 80; this.subTimer = 0; this.facingLeft = true; this.lastSkill = '';
                this.wing = 0; this.bob = 0; this.perch = null; this.perchT = 0; this.wingHits = 0;
                this.grabbed = false; this.grabT = 0; this.grabHits = 0; this.feathers = []; this.fallen = [];
                this.burnTimer = 0; this.lastMeleeHit = -1;
            }
            rocks() { return platforms.filter(p => p.summit); }
            update() {
                this.wing += 0.3; this.bob += 0.06;
                if (this.state === 'entering') { this.x -= 6; if (this.x <= canvas.width - 250) { this.state = 'intro'; this.subTimer = 0; } return; }
                if (this.state === 'intro') { this.subTimer++; if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x, this.y - 40, "THACH UNG!")); if (SFX.bossEntry) SFX.bossEntry(); } if (this.subTimer > 44) { this.state = 'roam'; this.actionTimer = 60; } return; }
                if (!this.grabbed) this.facingLeft = (dino.x + dino.w/2) < (this.x + this.w/2);

                // long da bay cheo
                for (let i = this.feathers.length - 1; i >= 0; i--) {
                    let f = this.feathers[i]; f.x += f.vx; f.y += f.vy; f.vy += 0.06;
                    if (checkAABB(dino, { x: f.x - 12, y: f.y - 12, w: 24, h: 24 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); this.feathers.splice(i, 1); continue; }
                    if (f.y > 420 || f.x < -60 || f.x > canvas.width + 60) this.feathers.splice(i, 1);
                }
                // mom da moc lai
                for (let i = this.fallen.length - 1; i >= 0; i--) {
                    let fp = this.fallen[i]; fp.t--;
                    if (fp.t <= 0) { platforms.push({ x: fp.x, w: fp.w, top: fp.top, h: 18, summit: true });
                        visualEffects.push(new Effect(fp.x + fp.w/2, fp.top, 'explosion', true, 22)); this.fallen.splice(i, 1); }
                }

                if (this.state === 'roam') {
                    let ty = 100 + Math.sin(this.bob) * 22; this.y += (ty - this.y) * 0.07;
                    let dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    if (Math.abs(dx) < 230) this.x -= Math.sign(dx || 1) * 2.6;
                    else if (Math.abs(dx) > 420) this.x += Math.sign(dx) * 3.0;
                    this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x));
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let pool = ['perch', 'grab', 'feather', 'gust', 'bomb'].filter(k => k !== this.lastSkill);
                        let c = pickFromBag(this, pool);
                        if (c === 'gust') { this.state = 'gust_prep'; this.subTimer = 44; this.gustDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1; }
                        else if (c === 'bomb') { this.state = 'bomb_warn'; this.subTimer = 50; this.bombX = dino.x + dino.w/2; }
                        else if (c === 'perch') {
                            let R = this.rocks().filter(p => !(dino.grounded && Math.abs((dino.y + dino.h) - p.top) < 8 && dino.x + dino.w > p.x && dino.x < p.x + p.w));
                            if (!R.length) R = this.rocks();
                            this.perch = R[Math.floor(Math.random() * R.length)] || null;
                            if (this.perch) { this.state = 'perch_go'; this.subTimer = 50; this.wingHits = 0; } else { this.actionTimer = 40; }
                        }
                        else if (c === 'grab') { this.state = 'grab_prep'; this.subTimer = 40; }
                        else { this.state = 'feather_prep'; this.subTimer = 38; }
                    }
                }
                // === QUAT CANH: gio day dat nguoi choi + da vun roi ===
                else if (this.state === 'gust_prep') { this.subTimer--; this.y += ((90) - this.y) * 0.10;
                    if (this.subTimer <= 0) { this.state = 'gust_go'; this.subTimer = 96; shakeTimer = 14; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'gust_go') {
                    this.subTimer--;
                    if (!dino.isShielding()) { dino.x += this.gustDir * 2.4; dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x)); }
                    // MOT DOT LONG VU (dung lai long vu goc: co trong luong, tu roi xuong)
                    if (this.subTimer === 70) {
                        let cx2 = this.x + this.w/2, cy2 = this.y + this.h/2;
                        let ddx = (dino.x + dino.w/2) - cx2, ddy = (dino.y + dino.h/2) - cy2;
                        let ba = Math.atan2(ddy, ddx);
                        for (let k = -2; k <= 2; k++) { let ang = ba + k * 0.16;
                            this.feathers.push({ x: cx2, y: cy2, vx: Math.cos(ang) * 7.4, vy: Math.sin(ang) * 7.4 }); }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer <= 0) { this.state = 'roam'; this.actionTimer = 56; }
                }
                // === BO NHAO THANG DUNG: bao vi tri roi lao xuong, no soc ===
                else if (this.state === 'bomb_warn') {
                    this.subTimer--;
                    if (this.subTimer > 22) this.bombX = dino.x + dino.w/2;
                    this.x += ((this.bombX - this.w/2) - this.x) * 0.14;
                    this.y += ((70) - this.y) * 0.10;
                    if (this.subTimer <= 0) { this.state = 'bomb_go'; this.vy = 0; }
                }
                else if (this.state === 'bomb_go') {
                    this.vy = (this.vy || 0) + 1.6; this.y += this.vy;
                    if (checkAABB(dino, this)) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    let land = 300;
                    for (let p of this.rocks()) if (this.x + this.w > p.x && this.x < p.x + p.w && p.top - this.h < land && this.y + this.h <= p.top + 26) land = p.top - this.h;
                    if (this.y >= land) {
                        this.y = land; this.vy = 0; shakeTimer = 26;
                        visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h, 'explosion', true, 42));
                        if (checkAABB(dino, { x: this.x - 60, y: this.y + this.h - 30, w: this.w + 120, h: 54 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                        this.state = 'roam'; this.actionTimer = 62;
                    }
                    if (this.y > 430) { this.y = 100; this.vy = 0; this.state = 'roam'; this.actionTimer = 62; }
                }
                // === DAU LEN MOM DA -> MOM NUT ROI SAP ===
                else if (this.state === 'perch_go') {
                    this.subTimer--;
                    let p = this.perch;
                    if (!p || platforms.indexOf(p) < 0) { this.state = 'roam'; this.actionTimer = 50; return; }
                    this.x += ((p.x + p.w/2 - this.w/2) - this.x) * 0.12;
                    this.y += ((p.top - this.h) - this.y) * 0.12;
                    if (this.subTimer <= 0) { this.state = 'perch_sit'; this.perchT = 130; this.y = p.top - this.h; shakeTimer = 12; }
                }
                else if (this.state === 'perch_sit') {
                    let p = this.perch;
                    if (!p || platforms.indexOf(p) < 0) { this.state = 'roam'; this.actionTimer = 50; return; }
                    this.perchT--; p.crackT = this.perchT;
                    this.x = p.x + p.w/2 - this.w/2; this.y = p.top - this.h;
                    if (frames % 8 === 0) shakeTimer = Math.max(shakeTimer, 4);
                    // ban vao CANH de duoi no bay som
                    for (let i = projectiles.length - 1; i >= 0; i--) {
                        let pr = projectiles[i];
                        if (pr._rocWing) continue;
                        let wingBox = { x: this.x - 30, y: this.y - 6, w: this.w + 60, h: 34 };
                        if (checkAABB(pr, wingBox)) {
                            pr._rocWing = true; this.wingHits++;
                            visualEffects.push(new Effect(pr.x, pr.y, 'explosion', true, 16));
                            floatingTexts.push(new FloatingText(this.x, this.y - 20, "CANH " + this.wingHits + "/4"));
                            if (this.wingHits >= 4) { p.crackT = 0; floatingTexts.push(new FloatingText(this.x, this.y - 34, "DUOI DUOC!")); this.state = 'roam'; this.actionTimer = 46; return; }
                            break;
                        }
                    }
                    if (this.perchT <= 0) {          // mom da SAP
                        let k = platforms.indexOf(p);
                        if (k >= 0 && platforms.filter(q => q.summit).length > 3) {
                            this.fallen.push({ x: p.x, w: p.w, top: p.top, t: 420 });
                            platforms.splice(k, 1); shakeTimer = 26;
                            visualEffects.push(new Effect(p.x + p.w/2, p.top, 'explosion', true, 36));
                        }
                        p.crackT = 0; this.perch = null; this.state = 'roam'; this.actionTimer = 50;
                    }
                }
                // === QUAP VA THA ===
                else if (this.state === 'grab_prep') {
                    this.subTimer--;
                    this.y += ((dino.y - 40) - this.y) * 0.10;
                    let dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    this.x += Math.sign(dx) * 2.2;
                    if (this.subTimer <= 0) { this.state = 'grab_go'; this.subTimer = 50; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'grab_go') {
                    this.subTimer--;
                    let dx = (dino.x + dino.w/2) - (this.x + this.w/2), dy = (dino.y + dino.h/2) - (this.y + this.h/2);
                    let dd = Math.hypot(dx, dy) || 1; this.x += dx/dd * 13; this.y += dy/dd * 13;
                    if (checkAABB(dino, this)) {
                        if (dino.isShielding()) { parry(); this.state = 'roam'; this.actionTimer = 60; return; }
                        this.grabbed = true; this.grabT = 150; this.grabHits = 0; this.state = 'grab_up'; this.grabHp = this.hp; this.grabCd = 0;
                        floatingTexts.push(new FloatingText(dino.x, dino.y - 26, "BI QUAP! BAN DE THOAT!"));
                    }
                    if (this.subTimer <= 0) { this.state = 'roam'; this.actionTimer = 56; }
                }
                else if (this.state === 'grab_up') {
                    // MOI nguon sat thuong deu tinh la mot nhip thoat (dan, lua, chem, set, ultimate...)
                    if (this.hp < this.grabHp) {
                        let dd = this.grabHp - this.hp;
                        this.hp = this.grabHp;
                        if (this.grabCd <= 0) {
                            this.grabHits += Math.min(3, Math.max(1, Math.ceil(dd)));   // don manh thi thoat nhanh hon
                            this.grabCd = 10;
                            visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h, 'explosion', true, 18));
                            floatingTexts.push(new FloatingText(this.x, this.y - 20, "THOAT " + this.grabHits + "/3"));
                            if (this.grabHits >= 3) { this.grabbed = false; dino.dy = -4; this.state = 'roam'; this.actionTimer = 60;
                                visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h, 'explosion', true, 30));
                                floatingTexts.push(new FloatingText(dino.x, dino.y - 24, "THOAT!")); return; }
                        }
                    }
                    this.hp = this.grabHp;
                    if (this.grabCd > 0) this.grabCd--;
                    this.grabT--; this.y -= 2.4; if (this.y < 30) this.y = 30;
                    dino.x = this.x + this.w/2 - dino.w/2; dino.y = this.y + this.h * 0.58; dino.dy = 0; dino.grounded = false;
                    if (this.grabT <= 0) { this.grabbed = false; dino.dy = 2; this.state = 'roam'; this.actionTimer = 60;
                        floatingTexts.push(new FloatingText(dino.x, dino.y - 20, "BI THA!")); }
                }
                // === LONG DA BAY CHEO ===
                else if (this.state === 'feather_prep') { this.subTimer--; if (this.subTimer <= 0) {
                    this.state = 'feather_fire'; this.subTimer = 16; if (SFX.bossSkill) SFX.bossSkill();
                    let cx = this.x + this.w/2, cy = this.y + this.h/2;
                    let ddx = (dino.x + dino.w/2) - cx, ddy = (dino.y + dino.h/2) - cy;
                    for (let k = -2; k <= 2; k++) { let ang = Math.atan2(ddy, ddx) + k * 0.16;
                        this.feathers.push({ x: cx, y: cy, vx: Math.cos(ang) * 7.4, vy: Math.sin(ang) * 7.4 }); } } }
                else if (this.state === 'feather_fire') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'roam'; this.actionTimer = 58; } }
            }
            draw() {
                let cx = this.x + this.w/2, cy = this.y + this.h/2, sd = this.facingLeft ? 1 : -1;
                // CANH BAO: quat canh (gio dat)
                if (this.state === 'gust_prep' || this.state === 'gust_go') {
                    ctx.strokeStyle = "rgba(207,216,220,0.55)"; ctx.lineWidth = 2;
                    for (let i = 0; i < 8; i++) {
                        let gy = 70 + i * 32, gx = ((frames * 8 * this.gustDir) % canvas.width + canvas.width) % canvas.width;
                        ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + this.gustDir * 56, gy + 4); ctx.stroke();
                    }
                    if (this.state === 'gust_prep') { ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("QUẠT CÁNH — GIÓ ĐẨY DẠT + LÔNG VŨ!", canvas.width/2, 46); ctx.textAlign = "left";
                        let a = (0.3 + 0.35 * Math.abs(Math.sin(frames * 0.4))).toFixed(2);
                        ctx.strokeStyle = "rgba(207,216,220," + a + ")"; ctx.lineWidth = 2;
                        let sx = this.x + this.w/2, sy = this.y + this.h * 0.6;
                        let ba = Math.atan2((dino.y + dino.h/2) - sy, (dino.x + dino.w/2) - sx);
                        for (let k = -1; k <= 1; k++) { let ang = ba + k * 0.34;
                            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(ang) * 240, sy + Math.sin(ang) * 240); ctx.stroke(); } }
                }
                // CANH BAO: bo nhao thang dung
                if (this.state === 'bomb_warn') {
                    let a = (0.25 + 0.35 * Math.abs(Math.sin(frames * 0.4))).toFixed(2);
                    ctx.fillStyle = "rgba(255,64,64," + a + ")"; ctx.fillRect(this.bombX - 44, 0, 88, 320);
                    ctx.fillStyle = "#FF1744"; ctx.font = "bold 26px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("!", this.bombX, 150); ctx.textAlign = "left";
                }
                // ---- mom da dang bi dau: VONG XUONG + nut theo 3 giai doan ----
                for (let p of this.rocks()) {
                    if (!p.crackT || p.crackT <= 0) continue;
                    let k = 1 - p.crackT / 130, stage = k < 0.34 ? 1 : k < 0.7 ? 2 : 3;
                    ctx.save(); ctx.translate(p.x + p.w/2, p.top); ctx.rotate(Math.sin(frames*0.4) * 0.006 * stage);
                    ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.fillRect(-p.w/2, k * 5, p.w, 16);   // vong xuong duoi suc nang
                    ctx.restore();
                    ctx.strokeStyle = ["", "rgba(255,193,7,0.7)", "rgba(255,112,67,0.85)", "#FF1744"][stage];
                    ctx.lineWidth = 1.6 + stage * 1.3;
                    for (let c = 0; c < stage + 2; c++) { let bx = p.x + 12 + c * (p.w - 24) / (stage + 1);
                        ctx.beginPath(); ctx.moveTo(bx, p.top);
                        ctx.lineTo(bx + 8 - c * 3, p.top + 10 + k * 12);
                        ctx.lineTo(bx - 4 + c * 2, p.top + 20 + k * 14); ctx.stroke(); }
                    if (stage >= 2 && frames % 6 < 3) {                                          // bui da roi
                        ctx.fillStyle = "rgba(120,144,156,0.7)";
                        for (let c = 0; c < 3; c++) ctx.fillRect(p.x + 20 + c * 46, p.top + 22 + (frames * 2 + c * 9) % 26, 4, 7);
                    }
                    ctx.fillStyle = stage === 3 ? "#FF1744" : "#FFB300"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("SAP " + Math.ceil(p.crackT / 60) + "s - BAN CANH!", p.x + p.w/2, p.top + 42); ctx.textAlign = "left";
                }
                for (let fp of this.fallen) { ctx.strokeStyle = "rgba(120,144,156,0.4)"; ctx.setLineDash([7,7]); ctx.lineWidth = 2; ctx.strokeRect(fp.x, fp.top, fp.w, 18); ctx.setLineDash([]);
                    ctx.fillStyle = "rgba(120,144,156,0.5)"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(Math.ceil(fp.t/60)+"s", fp.x + fp.w/2, fp.top + 14); ctx.textAlign = "left"; }
                for (let f of this.feathers) {
                    ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(Math.atan2(f.vy, f.vx));
                    ctx.fillStyle = "#78909C"; ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(3, -7); ctx.lineTo(16, 0); ctx.lineTo(3, 7); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#CFD8DC"; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-13, 0); ctx.lineTo(14, 0); ctx.stroke();
                    ctx.strokeStyle = "#263238"; ctx.lineWidth = 2; ctx.beginPath();
                    ctx.moveTo(-15, 0); ctx.lineTo(3, -7); ctx.lineTo(16, 0); ctx.lineTo(3, 7); ctx.closePath(); ctx.stroke(); ctx.restore();
                }
                // ---- than chim da ----
                ctx.save(); ctx.translate(cx, cy); ctx.scale(sd, 1);
                let flap = Math.sin(this.wing), sit = (this.state === 'perch_sit');
                if (sit) flap = -0.55;
                // canh: 3 lop long
                for (let L = 0; L < 3; L++) {
                    ctx.fillStyle = ["#37474F", "#546E7A", "#78909C"][L];
                    ctx.beginPath(); ctx.moveTo(4 - L*3, -4);
                    ctx.quadraticCurveTo(-30 - L*6, -44 - flap*20 + L*8, -84 - L*8, -26 - flap*16 + L*12);
                    ctx.quadraticCurveTo(-52, -4 + L*5, -58 + L*4, 20 + L*3);
                    ctx.quadraticCurveTo(-30, 6, -14, 20); ctx.closePath(); ctx.fill();
                }
                ctx.strokeStyle = "#1C262B"; ctx.lineWidth = 2;
                for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(2, -2);
                    ctx.quadraticCurveTo(-34 - k*10, -28 - flap*14 + k*9, -76 + k*13, -20 - flap*12 + k*13); ctx.stroke(); }
                // duoi xoe
                ctx.fillStyle = "#607D8B";
                for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(28, -2);
                    ctx.lineTo(84 + Math.abs(k)*-8, 6 + k * 20); ctx.lineTo(30, 8); ctx.closePath(); ctx.fill(); }
                ctx.fillStyle = "#78909C"; ctx.beginPath(); ctx.ellipse(0, 0, 44, 21, 0, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = "#455A64"; ctx.beginPath(); ctx.ellipse(-2, 8, 37, 11, 0, 0, Math.PI*2); ctx.fill();
                ctx.strokeStyle = "#1C262B"; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, 44, 21, 0, 0, Math.PI*2); ctx.stroke();
                ctx.fillStyle = "#90A4AE"; ctx.beginPath();                          // co
                ctx.moveTo(-30, -6); ctx.quadraticCurveTo(-54, -24, -68, -18);
                ctx.quadraticCurveTo(-52, -4, -30, 9); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#546E7A"; ctx.beginPath();                          // mao dau
                ctx.moveTo(-62, -22); ctx.lineTo(-46, -44); ctx.lineTo(-40, -18); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#CFD8DC"; ctx.beginPath();                          // mo
                ctx.moveTo(-64, -14); ctx.lineTo(-98, -3); ctx.lineTo(-62, 5); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#1C262B"; ctx.lineWidth = 2; ctx.stroke();
                ctx.save(); ctx.shadowBlur = 10; ctx.shadowColor = "#FFB300";
                ctx.fillStyle = "#FFD54F"; ctx.beginPath(); ctx.arc(-58, -15, 4.6, 0, Math.PI*2); ctx.fill(); ctx.restore();
                ctx.fillStyle = "#455A64";                                            // vuot
                for (let k = 0; k < 2; k++) { ctx.beginPath();
                    ctx.moveTo(-8 + k*24, 17); ctx.lineTo(-16 + k*24, 38); ctx.lineTo(2 + k*24, 33); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#1C262B"; ctx.lineWidth = 2; ctx.stroke(); }
                ctx.restore();
                // ---- nguoi choi bi quap: ve mong vuot khep lai ----
                if (this.state === 'grab_up') {
                    ctx.strokeStyle = "#455A64"; ctx.lineWidth = 7; ctx.lineCap = "round";
                    for (let k = -1; k <= 1; k++) { ctx.beginPath();
                        ctx.moveTo(cx + k * 14, this.y + this.h - 6);
                        ctx.quadraticCurveTo(cx + k * 26, dino.y + 8, cx + k * 10, dino.y + 30); ctx.stroke(); }
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("BAN DE THOAT " + this.grabHits + "/3", cx, dino.y - 16); ctx.textAlign = "left";
                }
                // ctx.fillStyle = "black"; ctx.fillRect(this.x, this.y - 30, this.w, 9);
                // ctx.fillStyle = "#90A4AE"; ctx.fillRect(this.x + 1, this.y - 29, (this.w - 2) * Math.max(0, this.hp / this.maxHp), 7);
                ctx.fillStyle = "white"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + "  " + Math.max(0, Math.ceil(this.hp)) + "/" + this.maxHp, cx, this.y - 34); ctx.textAlign = "left";
            }
}
// BOSS_PART_END s0.StoneRocBoss.1

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
