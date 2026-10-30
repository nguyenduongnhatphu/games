// BOSS_FILE: CliffGolemBoss
// BOSS_SNAPSHOT: 2b36ae4c51fabb54b8d0e06c3164b8f6c2ef05a8c767bbd93c893e9900521e3e
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, pickFromBag, platforms, projectiles, shakeTimer, troiSinh, troiVy, visualEffects
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

// Nguồn: index.html:33073 · Dùng bởi: CliffGolemBoss
// BOSS_PART_BEGIN s0.CliffGolemBoss.1 EDITABLE
class CliffGolemBoss {
            constructor(level) {
                this.hp = 75; this.maxHp = 75;
                this.w = 90; this.h = 150;
                this.side = 1;                                   // 1 = bam vach phai
                this.x = canvas.width - 60; this.y = 120;
                this.state = 'entering'; this.retState = 'idle'; this.name = "CU THACH";
                this.actionTimer = 90; this.subTimer = 0; this.facingLeft = true; this.lastSkill = '';
                this.armX = 0; this.armY = 0; this.held = null; this.jointHits = 0;
                this.thrown = []; this.punchY = 0; this.rumble = 0;
                this.burnTimer = 0; this.lastMeleeHit = -1;
            }
            rocks() { return platforms.filter(p => p.summit); }
            armAnchor() { return { x: this.side > 0 ? canvas.width - 30 : 30, y: this.y + 40 }; }
            update() {
                if (this.rumble > 0) this.rumble--;
                if (this.state === 'entering') { this.subTimer++; if (this.subTimer > 30) { this.state = 'intro'; this.subTimer = 0; } return; }
                if (this.state === 'intro') { this.subTimer++; if (this.subTimer === 1) { floatingTexts.push(new FloatingText(canvas.width/2 - 60, 90, "CU THACH!")); if (SFX.bossEntry) SFX.bossEntry(); shakeTimer = 34; } if (this.subTimer > 50) { this.state = 'idle'; this.actionTimer = 70; } return; }
                this.facingLeft = this.side > 0;

                // mom da bi nem
                for (let i = this.thrown.length - 1; i >= 0; i--) {
                    let t = this.thrown[i]; t.vy += 0.3; t.x += t.vx; t.y += t.vy;
                    if (checkAABB(dino, { x: t.x - 36, y: t.y - 20, w: 72, h: 40 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (t.y >= t.landY) {
                        visualEffects.push(new Effect(t.x, t.landY, 'explosion', true, 32)); shakeTimer = 18;
                        if (platforms.filter(p => p.summit).length < 7)
                            platforms.push({ x: t.x - 62, w: 124, top: Math.max(150, Math.min(305, t.landY)), h: 18, summit: true });
                        this.thrown.splice(i, 1);
                    }
                }

                if (this.state === 'idle') {
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let pool = ['rip', 'punch', 'sweep', 'clap', 'swap'].filter(k => k !== this.lastSkill);
                        let c = pickFromBag(this, pool);
                        if (c === 'rip') {
                            let R = this.rocks().filter(p => p.x > 80 && p.x + p.w < canvas.width - 80);
                            if (R.length && platforms.filter(p => p.summit).length > 3) {
                                this.held = R[Math.floor(Math.random() * R.length)];
                                this.state = 'rip_prep'; this.subTimer = 60; this.jointHits = 0;
                                this.armX = this.held.x + this.held.w/2; this.armY = this.held.top;
                            } else { this.actionTimer = 40; }
                        }
                        else if (c === 'punch') { this.state = 'punch_prep'; this.subTimer = 55;
                            this.punchY = Math.max(150, Math.min(300, dino.y + dino.h/2)); }
                        else if (c === 'clap') { this.state = 'clap_prep'; this.subTimer = 64; this.clapX = Math.max(120, Math.min(canvas.width - 120, dino.x + dino.w/2)); }
                        else if (c === 'swap') { this.state = 'swap_go'; this.subTimer = 70; }
                        else { this.state = 'sweep_prep'; this.subTimer = 60; }
                    }
                }
                // === BOC MOM DA ===
                else if (this.state === 'rip_prep') {
                    this.subTimer--; this.rumble = 3;
                    let p = this.held;
                    if (!p || platforms.indexOf(p) < 0) { this.held = null; this.state = 'idle'; this.actionTimer = 50; return; }
                    this.armX += ((p.x + p.w/2) - this.armX) * 0.14;
                    this.armY += ((p.top - 12) - this.armY) * 0.14;
                    // BAN KHOP TAY -> no danh roi, mom da thanh platform moi tai cho
                    for (let i = projectiles.length - 1; i >= 0; i--) {
                        let pr = projectiles[i];
                        if (pr._golemJoint) continue;
                        let joint = { x: this.armX - 34, y: this.armY - 46, w: 68, h: 62 };
                        if (checkAABB(pr, joint)) {
                            pr._golemJoint = true; this.jointHits++;
                            visualEffects.push(new Effect(pr.x, pr.y, 'explosion', true, 18));
                            floatingTexts.push(new FloatingText(this.armX - 20, this.armY - 60, "KHOP " + this.jointHits + "/3"));
                            if (this.jointHits >= 3) {
                                floatingTexts.push(new FloatingText(this.armX - 40, this.armY - 76, "LAM ROI! DUOC BE MOI!"));
                                visualEffects.push(new Effect(this.armX, this.armY, 'explosion', true, 40));
                                this.held = null; this.state = 'idle'; this.actionTimer = 46; return;
                            }
                            break;
                        }
                    }
                    if (this.subTimer <= 0) {
                        let k = platforms.indexOf(p);
                        if (k >= 0) platforms.splice(k, 1);
                        this.state = 'rip_throw'; this.subTimer = 30;
                        this.ripX = p.x + p.w/2; this.ripY = p.top;
                    }
                }
                else if (this.state === 'rip_throw') {
                    this.subTimer--; this.armY -= 3;
                    if (this.subTimer <= 0) {
                        let tx = dino.x + dino.w/2;
                        this.thrown.push({ x: this.armX, y: this.armY, vx: (tx - this.armX) / 46, vy: -5, landY: 300, mark: tx });
                        if (SFX.bossSkill) SFX.bossSkill(); shakeTimer = 20;
                        this.state = 'idle'; this.actionTimer = 66;
                    }
                }
                // === DAM XUYEN MOT TANG ===
                else if (this.state === 'punch_prep') { this.subTimer--; this.rumble = 2;
                    if (this.subTimer <= 0) { this.state = 'punch_go'; this.subTimer = 40; this.armX = this.side > 0 ? canvas.width + 40 : -40; this.armY = this.punchY; shakeTimer = 26; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'punch_go') {
                    this.subTimer--; this.armX -= this.side * 26;
                    if (checkAABB(dino, { x: this.armX - 48, y: this.armY - 34, w: 96, h: 68 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (this.armX < -120 || this.armX > canvas.width + 120 || this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 64; }
                }
                // === HAI TAY CHOP LAI ===
                else if (this.state === 'clap_prep') { this.subTimer--; this.rumble = 2;
                    if (this.subTimer <= 0) { this.state = 'clap_go'; this.subTimer = 30; this.clapL = -60; this.clapR = canvas.width + 60; shakeTimer = 26; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'clap_go') {
                    this.subTimer--;
                    this.clapL += (this.clapX - 70 - this.clapL) * 0.26;
                    this.clapR += (this.clapX + 70 - this.clapR) * 0.26;
                    if (this.subTimer === 12) { shakeTimer = 40;
                        if (checkAABB(dino, { x: this.clapX - 92, y: 150, w: 184, h: 176 })) { if (!dino.isShielding()) dino.takeDamage(2); else parry(); }
                        visualEffects.push(new Effect(this.clapX, 250, 'explosion', true, 56)); }
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 78; }
                }
                // === DOI BEN VACH (kem da rung roi) ===
                else if (this.state === 'swap_go') {
                    this.subTimer--; this.rumble = 3;
                    if (this.subTimer === 40) { this.side = -this.side;
                        this.x = this.side > 0 ? canvas.width - 60 : 60; shakeTimer = 34;
                        floatingTexts.push(new FloatingText(canvas.width/2 - 60, 90, "DOI BEN VACH!")); }
                    if (this.subTimer > 40 && frames % 10 === 0) {
                        let rx = 80 + Math.random() * (canvas.width - 160);
                        this.thrown.push({ x: rx, y: troiSinh(), vx: 0, vy: troiVy(2, -30), landY: 300, mark: rx, small: true });
                    }
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 70; }
                }
                // === QUET TAY DOC VACH (ep roi khoi tang cao nhat) ===
                else if (this.state === 'sweep_prep') { this.subTimer--; this.rumble = 2;
                    if (this.subTimer <= 0) { this.state = 'sweep_go'; this.subTimer = 56; this.armY = 130; shakeTimer = 22; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'sweep_go') {
                    this.subTimer--; this.armY += 3.4;
                    if (checkAABB(dino, { x: 0, y: this.armY - 26, w: canvas.width, h: 52 })) { if (!dino.isShielding()) { if (frames % 16 === 0) dino.takeDamage(1); } else parry(); }
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 70; }
                }
            }
            draw() {
                let a = this.armAnchor(), ox = this.rumble > 0 ? (Math.random()-0.5)*5 : 0;
                let breathe = Math.sin(frames * 0.045) * 3;   // nhip tho
                let bx = this.side > 0 ? canvas.width - 58 : -50;
                // ---- than golem: xep tu nhieu khoi da ----
                let blocks = [[0,-52,108,58],[8,4,92,54],[0,56,108,60],[14,114,84,52]];
                for (let k = 0; k < blocks.length; k++) {
                    let B = blocks[k];
                    ctx.fillStyle = k % 2 ? "#3B4A54" : "#45565F";
                    let by2 = this.y + B[1] + breathe * (1 - k * 0.25);
                    ctx.fillRect(bx + ox + B[0], by2, B[2], B[3]);
                    ctx.strokeStyle = "#141C21"; ctx.lineWidth = 4;
                    ctx.strokeRect(bx + ox + B[0], by2, B[2], B[3]);
                    ctx.fillStyle = "rgba(120,144,156,0.35)";
                    ctx.fillRect(bx + ox + B[0] + 8, this.y + B[1] + breathe * (1 - k * 0.25) + 6, B[2] - 16, 6);
                }
                ctx.fillStyle = "#33691E";
                for (let k = 0; k < 4; k++) ctx.fillRect(bx + ox + 14 + (k%2)*44, this.y - 34 + k*46, 30, 8);
                // vai nhon huong vao map
                ctx.fillStyle = "#54697A";
                ctx.beginPath();
                ctx.moveTo(bx + ox + (this.side > 0 ? 4 : 104), this.y - 40);
                ctx.lineTo(bx + ox + (this.side > 0 ? -40 : 148), this.y + 6);
                ctx.lineTo(bx + ox + (this.side > 0 ? 10 : 98), this.y + 40); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#141C21"; ctx.lineWidth = 3; ctx.stroke();
                // mat do phat sang
                let ex0 = bx + ox + (this.side > 0 ? 18 : 66), ey0 = this.y - 24;
                ctx.save(); ctx.shadowBlur = 14; ctx.shadowColor = "#FF7043";
                ctx.fillStyle = "#FF7043"; ctx.fillRect(ex0, ey0, 22, 10); ctx.restore();
                ctx.fillStyle = "#FFCCBC"; ctx.fillRect(ex0 + 4, ey0 + 2, 7, 6);

                if (this.state === 'clap_prep') { let k = 1 - this.subTimer / 64;
                    ctx.fillStyle = "rgba(255,23,68," + (0.1 + k*0.3).toFixed(2) + ")"; ctx.fillRect(this.clapX - 92, 150, 184, 176);
                    ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 4; ctx.strokeRect(this.clapX - 92, 150, 184, 176);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("HAI TAY CHOP - RA KHOI!", this.clapX, 142); ctx.textAlign = "left"; }
                if (this.state === 'clap_go') {
                    for (const hx of [this.clapL, this.clapR]) {
                        ctx.fillStyle = "#4A5D69"; ctx.fillRect(hx - 44, 176, 88, 130);
                        ctx.fillStyle = "#3B4A54"; ctx.fillRect(hx - 34, 190, 68, 46);
                        ctx.strokeStyle = "#141C21"; ctx.lineWidth = 4; ctx.strokeRect(hx - 44, 176, 88, 130); }
                }
                if (this.state === 'swap_go') { ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("DA RUNG! COI CHUNG TREN DAU", canvas.width/2, 70); ctx.textAlign = "left"; }
                if (this.state === 'punch_prep') { ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,87,34,0.32)" : "transparent"; ctx.fillRect(0, this.punchY - 34, canvas.width, 68);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("DAM XUYEN - DOI TANG!", canvas.width/2, this.punchY - 42); ctx.textAlign = "left"; }
                if (this.state === 'sweep_prep') { ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,87,34,0.26)" : "transparent"; ctx.fillRect(0, 110, canvas.width, 60);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("QUET TU TREN XUONG!", canvas.width/2, 100); ctx.textAlign = "left"; }

                // ---- tay da PHAN DOT ----
                let drawArm = (tx, ty, seg) => {
                    let n = 7;
                    for (let k = 0; k <= n; k++) {
                        let t = k / n;
                        let mx = a.x + (tx - a.x) * t, my = a.y + (ty - a.y) * t - Math.sin(t * Math.PI) * 34;
                        let sz = seg * (1 - t * 0.34);
                        ctx.fillStyle = k % 2 ? "#3B4A54" : "#4A5D69";
                        ctx.fillRect(mx - sz/2, my - sz/2, sz, sz);
                        ctx.strokeStyle = "#141C21"; ctx.lineWidth = 3;
                        ctx.strokeRect(mx - sz/2, my - sz/2, sz, sz);
                    }
                    ctx.fillStyle = "#54697A"; ctx.fillRect(tx - seg*0.62, ty - seg*0.5, seg*1.24, seg);
                    ctx.strokeStyle = "#141C21"; ctx.lineWidth = 4; ctx.strokeRect(tx - seg*0.62, ty - seg*0.5, seg*1.24, seg);
                    ctx.fillStyle = "#3B4A54";
                    for (let f = 0; f < 3; f++) ctx.fillRect(tx - seg*0.5 + f*seg*0.42, ty + seg*0.46, seg*0.3, seg*0.5);
                };
                if (this.state === 'rip_prep' || this.state === 'rip_throw') {
                    drawArm(this.armX, this.armY, 38);
                    ctx.strokeStyle = (frames % 8 < 4) ? "#FFEB3B" : "rgba(255,235,59,0.35)"; ctx.lineWidth = 3;
                    ctx.strokeRect(this.armX - 34, this.armY - 46, 68, 62);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("BAN KHOP TAY " + this.jointHits + "/3", this.armX, this.armY - 54); ctx.textAlign = "left";
                    if (this.state === 'rip_throw') {                       // mom da bi nhac len theo tay
                        ctx.fillStyle = "#5D4037"; ctx.fillRect(this.armX - 60, this.armY + 16, 120, 30);
                        ctx.strokeStyle = "#2E1A12"; ctx.lineWidth = 3; ctx.strokeRect(this.armX - 60, this.armY + 16, 120, 30); }
                }
                if (this.state === 'punch_go') drawArm(this.armX, this.armY, 42);
                if (this.state === 'sweep_go') {
                    ctx.fillStyle = "rgba(59,74,84,0.9)"; ctx.fillRect(0, this.armY - 26, canvas.width, 52);
                    ctx.fillStyle = "#54697A"; ctx.fillRect(0, this.armY - 12, canvas.width, 24);
                    ctx.strokeStyle = "#141C21"; ctx.lineWidth = 3; ctx.strokeRect(0, this.armY - 26, canvas.width, 52);
                }
                for (let t of this.thrown) {
                    let hs = t.small ? 0.5 : 1;
                    ctx.fillStyle = "rgba(0,0,0,0.35)"; ctx.beginPath();
                    ctx.ellipse(t.mark || t.x, 312, 52 * hs, 12 * hs, 0, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#8D6E63"; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#5D4037"; ctx.fillRect(t.x - 60*hs, t.y - 18*hs, 120*hs, 36*hs);
                    ctx.fillStyle = "#795548"; ctx.fillRect(t.x - 60*hs, t.y - 18*hs, 120*hs, 10*hs);
                    ctx.strokeStyle = "#2E1A12"; ctx.lineWidth = 3; ctx.strokeRect(t.x - 60*hs, t.y - 18*hs, 120*hs, 36*hs);
                }
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 150, 14, 300, 11);
                ctx.fillStyle = "#90A4AE"; ctx.fillRect(canvas.width/2 - 149, 15, 298 * Math.max(0, this.hp / this.maxHp), 9);
                ctx.fillStyle = "white"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + "  " + Math.max(0, Math.ceil(this.hp)) + "/" + this.maxHp, canvas.width/2, 34); ctx.textAlign = "left"; ctx.restore();
            }
}
// BOSS_PART_END s0.CliffGolemBoss.1

// Nguồn: index.html:99958 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:99969 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
