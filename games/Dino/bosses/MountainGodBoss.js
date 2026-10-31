// BOSS_FILE: MountainGodBoss
// BOSS_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, pickFromBag, platforms, shakeTimer, visualEffects
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

// Nguồn: index.html:33305 · Dùng bởi: MountainGodBoss
// BOSS_PART_BEGIN s0.MG_THROW_HOLD.1 EDITABLE
const MG_THROW_HOLD = 40, MG_THROW_SPD = 8.5;
// BOSS_PART_END s0.MG_THROW_HOLD.1

// Nguồn: index.html:33306 · Dùng bởi: MountainGodBoss
// BOSS_PART_BEGIN s0.MG_ERUPT_T.1 EDITABLE
const MG_ERUPT_T = 200, MG_ERUPT_RATE = 16;
// BOSS_PART_END s0.MG_ERUPT_T.1

// Nguồn: index.html:33307 · Dùng bởi: MountainGodBoss
// BOSS_PART_BEGIN s0.MG_METEOR_FALL.1 EDITABLE
const MG_METEOR_FALL = 72;
// BOSS_PART_END s0.MG_METEOR_FALL.1

// Nguồn: index.html:33308 · Dùng bởi: MountainGodBoss
// BOSS_PART_BEGIN s0.MG_SPIKE_T.1 EDITABLE
const MG_SPIKE_T = 300;
// BOSS_PART_END s0.MG_SPIKE_T.1

// Nguồn: index.html:33309 · Dùng bởi: MountainGodBoss
// BOSS_PART_BEGIN s0.MG_CRACK_T.1 EDITABLE
const MG_CRACK_T = 300, MG_CRACK_FUSE = 60;
// BOSS_PART_END s0.MG_CRACK_T.1

// Nguồn: index.html:33310 · Dùng bởi: MountainGodBoss
// BOSS_PART_BEGIN s0.MountainGodBoss.1 EDITABLE
class MountainGodBoss {
            constructor(level) {
                this.hp = 250; this.maxHp = 250;
                this.tier = 'colossal';
                this.headWeak = true; this.headZone = 130; this.headMarkX = 150; this.headMarkY = 62; this.headHits = 0;
                this.w = 300; this.h = 260; this.x = canvas.width/2 - 150; this.y = 60;
                this.state = 'entering'; this.retState = 'idle'; this.name = "THIEN TRU SON THAN";
                this.actionTimer = 110; this.subTimer = 0; this.facingLeft = false; this.lastSkill = '';
                this.tilt = 0; this.tiltDir = 1; this.rage = false;
                this.meteors = []; this.spikeT = 0; this.spikeP = null; this.crackT = 0; this.crackGone = [];
                this.eruptMode = 'center'; this.eruptBand = [0, canvas.width];
                this.slapXs = []; this.slapY = 326;
                this.riseOff = 0; this.eye = 0; this.shards = []; this.thrown = null;
                this.burnTimer = 0; this.lastMeleeHit = -1;
            }
            getDmg() { return 1; }
            rocks() { return platforms.filter(p => p.summit); }
            update() {
                this.eye += 0.06;
                if (this.state === 'entering') { this.subTimer++; if (this.subTimer > 30) { this.state = 'intro'; this.subTimer = 0; } return; }
                if (this.state === 'intro') { this.subTimer++;
                    if (this.subTimer === 1) { floatingTexts.push(new FloatingText(canvas.width/2 - 110, 120, "THIEN TRU SON THAN!")); if (SFX.bossEntry) SFX.bossEntry(); shakeTimer = 60; }
                    if (this.subTimer > 60) { this.state = 'idle'; this.actionTimer = 90; } return; }

                // ---- GIAI DOAN 2: dung day, ca dau truong troi xuong -> phai leo len ----
                if (!this.rage && this.hp <= this.maxHp * 0.5) {
                    this.rage = true; shakeTimer = 60;
                    floatingTexts.push(new FloatingText(canvas.width/2 - 90, 140, "NUI DUNG DAY! LEO LEN!"));
                    if (SFX.bossEntry) SFX.bossEntry();
                }
                if (this.rage) {
                    for (let p of this.rocks()) { p.top += 0.34; }              // dat troi xuong -> nguoi choi phai leo
                    if (dino.grounded) dino.y += 0.34;
                    for (let p of this.rocks()) {
                        if (p.top > 340) {                                        // mom da tut khoi man -> moc lai o tren
                            p.top = 130 + Math.random() * 40;
                            p.x = 60 + Math.random() * (canvas.width - 260);
                            visualEffects.push(new Effect(p.x + p.w/2, p.top, 'explosion', true, 22));
                        }
                    }
                }
                // ---- ban tay bi siet: moc lai sau 3 giay ----
                if (this.gripSaved) { this.gripSaved.t--;
                    if (this.gripSaved.t <= 0) {
                        platforms.push({ x: this.gripSaved.x, w: this.gripSaved.w, top: this.gripSaved.top, h: 18, summit: true });
                        visualEffects.push(new Effect(this.gripSaved.x + this.gripSaved.w/2, this.gripSaved.top, 'explosion', true, 26));
                        this.gripSaved = null; } }
                // ---- THIEN THACH cua PHUN TRAO ----
                for (let i = this.meteors.length - 1; i >= 0; i--) {
                    let mt = this.meteors[i]; mt.t++;
                    mt.vy += 0.19; mt.x += mt.vx; mt.y += mt.vy;
                    if (checkAABB(dino, { x: mt.x - 18, y: mt.y - 18, w: 36, h: 36 })) {
                        if (!dino.isShielding()) dino.takeDamage(1); else parry();
                        visualEffects.push(new Effect(mt.x, mt.y, 'explosion', true, 26)); this.meteors.splice(i, 1); continue;
                    }
                    if (mt.y > 316) { visualEffects.push(new Effect(mt.x, 312, 'explosion', true, 30)); this.meteors.splice(i, 1); continue; }
                    if (mt.t > 400) this.meteors.splice(i, 1);
                }
                // ---- HOA GAI: dung tren mom da trong luc nay la bi dam ----
                if (this.spikeT > 0) {
                    this.spikeT--;
                    let p = this.spikeP;
                    if (!p || platforms.indexOf(p) < 0) { this.spikeT = 0; this.spikeP = null; }
                    else if (dino.grounded && Math.abs((dino.y + dino.h) - p.top) < 10 && dino.x + dino.w > p.x && dino.x < p.x + p.w) {
                        if (!dino.isShielding()) { if (frames % 18 === 0) dino.takeDamage(1); } else parry();
                    }
                    if (this.spikeT <= 0) this.spikeP = null;
                }
                // ---- RAN NUT: dam vao mom da -> 1 giay sau no VO, het gio thi moc lai ----
                if (this.crackT > 0) {
                    this.crackT--;
                    for (let i = this.rocks().length - 1; i >= 0; i--) {
                        let p = this.rocks()[i];
                        let on = dino.grounded && Math.abs((dino.y + dino.h) - p.top) < 10 && dino.x + dino.w > p.x && dino.x < p.x + p.w;
                        if (on && !p.fuse) p.fuse = MG_CRACK_FUSE;
                        if (p.fuse > 0) {
                            p.fuse--;
                            if (p.fuse <= 0) {
                                let k = platforms.indexOf(p);
                                if (k >= 0 && platforms.filter(q => q.summit).length > 2) {
                                    this.crackGone.push({ x: p.x, w: p.w, top: p.top });
                                    platforms.splice(k, 1);
                                    visualEffects.push(new Effect(p.x + p.w/2, p.top, 'explosion', true, 30)); shakeTimer = 18;
                                }
                            }
                        }
                    }
                    if (this.crackT <= 0) {   // da cung lai -> moc lai het
                        for (let g of this.crackGone) {
                            platforms.push({ x: g.x, w: g.w, top: g.top, h: 18, summit: true });
                            visualEffects.push(new Effect(g.x + g.w/2, g.top, 'explosion', true, 24));
                        }
                        this.crackGone.length = 0;
                        for (let p of this.rocks()) p.fuse = 0;
                    }
                }
                // ---- manh da van ----
                for (let i = this.shards.length - 1; i >= 0; i--) {
                    let s2 = this.shards[i]; s2.vy += 0.3; s2.x += s2.vx; s2.y += s2.vy; s2.life--;
                    if (checkAABB(dino, { x: s2.x - 14, y: s2.y - 14, w: 28, h: 28 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); this.shards.splice(i, 1); continue; }
                    if (s2.life <= 0 || s2.y > 420) this.shards.splice(i, 1);
                }
                // ---- may mu ----

                if (this.state === 'idle') {
                    this.tilt *= 0.9; this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        // Truyen NGUYEN pool: pickFromBag tu lo viec khong lap va tranh trung chieu truoc.
                        // (truoc day .filter(lastSkill) lam danh sach doi lien tuc -> tui bi dung lai moi luot = random)
                        let c = pickFromBag(this, ['shiver', 'slap', 'shard', 'grip', 'throw', 'erupt', 'spike', 'crack']);
                        if (c === 'shiver') { this.state = 'shiver_prep'; this.subTimer = 70; this.tiltDir = Math.random() < 0.5 ? 1 : -1; }
                        else if (c === 'slap') { this.state = 'slap_prep'; this.subTimer = 66;
                            // 1 hoac 2 BAN TAY. Doi luc dap thang len MOT BE DA thay vi mat dat.
                            let px = Math.max(80, Math.min(canvas.width - 80, dino.x + dino.w/2));
                            this.slapXs = [px];
                            this.slapY = 326;
                            let rs = this.rocks();
                            let onP = rs.find(p => dino.grounded && Math.abs((dino.y + dino.h) - p.top) < 10 && dino.x + dino.w > p.x && dino.x < p.x + p.w);
                            if (onP && Math.random() < 0.55) { this.slapXs = [onP.x + onP.w/2]; this.slapY = onP.top + 6; }
                            if (Math.random() < 0.45) {          // BAN TAY THU HAI chan duong chay
                                let side = px < canvas.width/2 ? 1 : -1;
                                this.slapXs.push(Math.max(80, Math.min(canvas.width - 80, px + side * (230 + Math.random() * 120))));
                            } }
                        else if (c === 'grip') {
                            let R2 = this.rocks(); this.gripP = R2[Math.floor(Math.random() * R2.length)] || null;
                            if (this.gripP) { this.state = 'grip_prep'; this.subTimer = 70; } else { this.actionTimer = 40; } }
                        else if (c === 'erupt') { this.state = 'erupt_prep'; this.subTimer = 74;
                            // Cot lua LUON phun tu dinh dau boss. Chi doi HUONG NGHIENG cua da lua:
                            //   'left'  -> do sang trai, chua trong nua PHAI
                            //   'right' -> do sang phai, chua trong nua TRAI
                            //   'center'-> do vao giua, chua trong CA HAI mep
                            // Du bi pha het be do thi duoi dat VAN con dai an toan de chay toi.
                            let m2 = ['left', 'right', 'center'][Math.floor(Math.random() * 3)];
                            this.eruptMode = m2;
                            let W2 = canvas.width;
                            this.eruptBand = m2 === 'left'  ? [50, W2 * 0.46]
                                           : m2 === 'right' ? [W2 * 0.54, W2 - 50]
                                                            : [W2 * 0.30, W2 * 0.70]; }
                        else if (c === 'spike') { this.state = 'spike_prep'; this.subTimer = 62;
                            // CHI MOT be moc gai — uu tien chinh cai nguoi choi dang dung
                            let rs = this.rocks();
                            this.spikeP = rs.find(p => dino.grounded && Math.abs((dino.y + dino.h) - p.top) < 10 && dino.x + dino.w > p.x && dino.x < p.x + p.w)
                                       || rs[Math.floor(Math.random() * rs.length)] || null; }
                        else if (c === 'crack') { this.state = 'crack_prep'; this.subTimer = 58; }
                        else if (c === 'throw') { this.state = 'throw_prep'; this.subTimer = 46; }
                        else { this.state = 'shard_prep'; this.subTimer = 60; }
                    }
                }
                // ================= PHUN TRAO: cot lua len troi -> thien thach roi loan xa =================
                else if (this.state === 'erupt_prep') { this.subTimer--; shakeTimer = Math.max(shakeTimer, 6);
                    if (this.subTimer <= 0) { this.state = 'erupt_go'; this.subTimer = MG_ERUPT_T; shakeTimer = 56; if (SFX.bossExplode) SFX.bossExplode(); } }
                else if (this.state === 'erupt_go') {
                    this.subTimer--;
                    // cot lua chi la nguon; thien thach moi la thu gay sat thuong
                    if (this.subTimer % MG_ERUPT_RATE === 0 && this.subTimer > 40) {
                        let vx0 = this.x + this.w / 2, lo = this.eruptBand[0], hi = this.eruptBand[1];
                        for (let k = 0; k < 3; k++) {
                            // diem HA CANH chia deu trong dai, roi suy nguoc ra van toc ngang
                            let land = lo + (k + 0.5) * (hi - lo) / 3 + (Math.random() - 0.5) * 40;
                            this.meteors.push({ x: vx0, y: 40, vx: (land - vx0) / MG_METEOR_FALL,
                                                vy: -3, t: 0, land: land });
                        }
                    }
                    if (this.subTimer <= 0 && this.meteors.length === 0) { this.state = 'idle'; this.actionTimer = 80; }
                    if (this.subTimer <= -180) { this.state = 'idle'; this.actionTimer = 80; }
                }
                // ================= HOA GAI: mom da moc gai trong 5 giay =================
                else if (this.state === 'spike_prep') { this.subTimer--;
                    if (this.subTimer <= 0) { this.spikeT = MG_SPIKE_T; this.state = 'idle'; this.actionTimer = 90; if (SFX.bossSkill) SFX.bossSkill(); } }
                // ================= RAN NUT: mom da nut, dam vao la 1 giay sau VO =================
                else if (this.state === 'crack_prep') { this.subTimer--;
                    if (this.subTimer <= 0) {
                        this.crackT = MG_CRACK_T;
                        for (let p of this.rocks()) p.fuse = 0;
                        this.state = 'idle'; this.actionTimer = MG_CRACK_T + 30; if (SFX.bossSkill) SFX.bossSkill();
                    } }
                // ================= NEM MOM DA: bung mot mom da len roi NEM vao nguoi choi =================
                else if (this.state === 'throw_prep') {
                    this.subTimer--;
                    if (this.subTimer <= 0) {
                        let rs = this.rocks();
                        if (rs.length > 3) {
                            let p = rs[Math.floor(Math.random() * rs.length)];
                            let k = platforms.indexOf(p);
                            if (k >= 0) {
                                this.thrown = { x: p.x + p.w/2, y: p.top, w: p.w, vx: 0, vy: 0, t: MG_THROW_HOLD, phase: 'up' };
                                platforms.splice(k, 1);
                                visualEffects.push(new Effect(p.x + p.w/2, p.top, 'explosion', true, 30)); shakeTimer = 26;
                            }
                        }
                        this.state = 'throw_go'; this.subTimer = 200;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                }
                else if (this.state === 'throw_go') {
                    this.subTimer--;
                    let t = this.thrown;
                    if (!t) { this.state = 'idle'; this.actionTimer = 76; }
                    else {
                        if (t.phase === 'up') {
                            t.y -= 4.2; t.t--;
                            if (t.t <= 0) {                       // ngam roi phong
                                let ddx = (dino.x + dino.w/2) - t.x, ddy = (dino.y + dino.h/2) - t.y, dd = Math.hypot(ddx, ddy) || 1;
                                t.vx = ddx / dd * MG_THROW_SPD; t.vy = ddy / dd * MG_THROW_SPD; t.phase = 'fly';
                            }
                        } else {
                            t.x += t.vx; t.y += t.vy;
                            if (checkAABB(dino, { x: t.x - t.w/2, y: t.y - 16, w: t.w, h: 32 })) {
                                if (!dino.isShielding()) dino.takeDamage(2); else parry();
                                visualEffects.push(new Effect(t.x, t.y, 'explosion', true, 44)); this.thrown = null;
                            } else if (t.y > 330 || t.x < -80 || t.x > canvas.width + 80) {
                                visualEffects.push(new Effect(Math.max(20, Math.min(canvas.width - 20, t.x)), 312, 'explosion', true, 40));
                                shakeTimer = 24;
                                for (let k = 0; k < 4; k++) this.shards.push({ x: t.x, y: 300, vx: (k - 1.5) * 3.6, vy: -5.5, life: 140 });
                                this.thrown = null;
                            }
                        }
                        if (this.subTimer <= 0 || !this.thrown) { this.thrown = null; this.state = 'idle'; this.actionTimer = 76; }
                    }
                }
                // === RUNG MINH: nghieng ca nguoi, mom da lech -> truot ===
                else if (this.state === 'shiver_prep') { this.subTimer--; shakeTimer = Math.max(shakeTimer, 5);
                    if (this.subTimer <= 0) { this.state = 'shiver_go'; this.subTimer = 90; shakeTimer = 40; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'shiver_go') {
                    this.subTimer--; this.tilt = Math.min(1, this.tilt + 0.06);
                    shakeTimer = Math.max(shakeTimer, 8);
                    if (dino.grounded) { dino.x += this.tiltDir * 2.6 * this.tilt;   // truot theo huong nghieng
                        dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x)); }
                    // DA LAN theo dung huong nghieng: bi truot ve phia nao thi da doi o phia do
                    if (this.subTimer % 18 === 0) {
                        let ex = this.tiltDir > 0 ? canvas.width - 40 - Math.random() * 200 : 40 + Math.random() * 200;
                        this.shards.push({ x: ex, y: 90, vx: -this.tiltDir * 2.2, vy: 3.4, life: 190 });
                    }
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 78; }
                }
                // === VO TAY: dap len chinh cho ban dung ===
                else if (this.state === 'slap_prep') { this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'slap_fall'; this.subTimer = 40; shakeTimer = 30; } }
                else if (this.state === 'slap_fall') {
                    this.subTimer--;
                    if (this.subTimer === 22) {
                        shakeTimer = 46; if (SFX.bossExplode) SFX.bossExplode();
                        let hitAny2 = false;
                        for (let sx of this.slapXs) {
                            if (!hitAny2 && checkAABB(dino, { x: sx - 90, y: this.slapY - 206, w: 180, h: 220 })) {
                                hitAny2 = true;
                                if (!dino.isShielding()) dino.takeDamage(2); else parry();
                            }
                            visualEffects.push(new Effect(sx, this.slapY - 66, 'explosion', true, 56));
                            for (let k = 0; k < 4; k++) this.shards.push({ x: sx, y: this.slapY - 76, vx: (k - 1.5) * 3.4, vy: -6, life: 130 });
                        }
                    }
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 82; }
                }
                // === SIET BAN TAY: mom da do GAP LAI, bien mat 3 giay ===
                else if (this.state === 'grip_prep') {
                    this.subTimer--;
                    let p = this.gripP;
                    if (!p || platforms.indexOf(p) < 0) { this.gripP = null; this.state = 'idle'; this.actionTimer = 50; return; }
                    if (this.subTimer <= 0) {
                        let k = platforms.indexOf(p);
                        if (k >= 0 && platforms.filter(q => q.summit).length > 3) {
                            this.gripSaved = { x: p.x, w: p.w, top: p.top, t: 190 };
                            platforms.splice(k, 1); shakeTimer = 24;
                            visualEffects.push(new Effect(p.x + p.w/2, p.top, 'explosion', true, 30));
                        }
                        this.gripP = null; this.state = 'idle'; this.actionTimer = 66;
                    }
                }
                // === VUN DA BAY ===
                else if (this.state === 'shard_prep') { this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 70; if (SFX.bossSkill) SFX.bossSkill();
                        let cx0 = this.x + this.w/2, cy0 = this.y + 60;
                        let ddx = (dino.x + dino.w/2) - cx0, ddy = (dino.y + dino.h/2) - cy0;
                        for (let k = -2; k <= 2; k++) { let ang = Math.atan2(ddy, ddx) + k * 0.2;
                            this.shards.push({ x: cx0, y: cy0, vx: Math.cos(ang) * 7, vy: Math.sin(ang) * 7 - 1, life: 200 }); } } }
            }
            draw() {
                let x = this.x, y = this.y + this.riseOff, cx = x + this.w/2;
                let tl = this.tilt * this.tiltDir * 0.05;
                let R = this.rocks().slice().sort((a,b)=>a.top-b.top);

                // ===== PHUN TRAO: cot lua + thien thach =====
                if (this.state === 'erupt_prep' || this.state === 'erupt_go') {
                    let go = this.state === 'erupt_go';
                    ctx.save();
                    let vx0 = this.x + this.w / 2, topY = this.y + 30;
                    let lo = this.eruptBand[0], hi = this.eruptBand[1];
                    // DAI NGUY HIEM duoi dat: cho biet da lua se do ve phia nao
                    let k = go ? 1 : (1 - this.subTimer / 74);
                    ctx.fillStyle = go ? "rgba(255,87,34,0.34)" : "rgba(255,87,34," + (0.08 + 0.26 * k).toFixed(2) + ")";
                    ctx.fillRect(lo, 300, hi - lo, 26);
                    ctx.strokeStyle = "#FF3D00"; ctx.lineWidth = 3; ctx.strokeRect(lo, 300, hi - lo, 26);
                    // dai AN TOAN: vien xanh, luon con it nhat mot ben de chay toi
                    ctx.strokeStyle = "rgba(105,240,174,0.85)"; ctx.lineWidth = 3;
                    if (lo > 30) { ctx.beginPath(); ctx.moveTo(6, 313); ctx.lineTo(lo - 8, 313); ctx.stroke(); }
                    if (hi < canvas.width - 30) { ctx.beginPath(); ctx.moveTo(hi + 8, 313); ctx.lineTo(canvas.width - 6, 313); ctx.stroke(); }
                    // COT LUA phun tu DINH DAU boss
                    if (go && this.subTimer > 40) {
                        let g = ctx.createLinearGradient(0, topY, 0, 0);
                        g.addColorStop(0, "rgba(255,235,59,0.95)"); g.addColorStop(0.5, "rgba(255,111,0,0.8)"); g.addColorStop(1, "rgba(255,87,34,0.15)");
                        ctx.fillStyle = g;
                        let ww = 48 + Math.sin(frames * 0.4) * 12;
                        ctx.beginPath(); ctx.moveTo(vx0 - ww, topY);
                        ctx.quadraticCurveTo(vx0 - ww * 0.5, topY * 0.4, vx0 - 14, -30);
                        ctx.lineTo(vx0 + 14, -30);
                        ctx.quadraticCurveTo(vx0 + ww * 0.5, topY * 0.4, vx0 + ww, topY);
                        ctx.closePath(); ctx.fill();
                    } else if (!go) {
                        ctx.fillStyle = "rgba(255,235,59," + (0.25 + 0.6 * k).toFixed(2) + ")";
                        ctx.beginPath(); ctx.arc(vx0, topY, 12 + 26 * k, 0, Math.PI*2); ctx.fill();
                    }
                    if (!go) {
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText(this.eruptMode === 'center' ? "PHUN TRÀO — NÉ RA HAI BÊN!"
                                   : this.eruptMode === 'left'   ? "PHUN TRÀO — CHẠY SANG PHẢI!"
                                                                 : "PHUN TRÀO — CHẠY SANG TRÁI!", canvas.width/2, 100);
                        ctx.textAlign = "left";
                    }
                    ctx.restore();
                }
                for (let mt of this.meteors) {
                    ctx.save();
                    ctx.strokeStyle = "rgba(255,87,34,0.5)"; ctx.lineWidth = 6;
                    ctx.beginPath(); ctx.moveTo(mt.x - mt.vx * 3, mt.y - mt.vy * 3); ctx.lineTo(mt.x, mt.y); ctx.stroke();
                    ctx.fillStyle = "#5D4037";
                    ctx.beginPath(); ctx.arc(mt.x, mt.y, 16, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FF6D00";
                    ctx.beginPath(); ctx.arc(mt.x, mt.y, 9, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFEB3B";
                    ctx.beginPath(); ctx.arc(mt.x - 3, mt.y - 3, 4, 0, Math.PI*2); ctx.fill();
                    ctx.restore();
                }
                // ===== HOA GAI / RAN NUT tren mom da =====
                if (this.spikeT > 0 || this.state === 'spike_prep') {
                    let live = this.spikeT > 0;
                    for (let p of this.rocks()) {
                        ctx.fillStyle = live ? "#B0BEC5" : "rgba(255,82,82,0.5)";
                        for (let k = 0; k * 18 < p.w; k++) {
                            let sx4 = p.x + 6 + k * 18, hgt = live ? 16 : 8;
                            ctx.beginPath(); ctx.moveTo(sx4, p.top); ctx.lineTo(sx4 + 7, p.top - hgt); ctx.lineTo(sx4 + 14, p.top); ctx.closePath(); ctx.fill();
                        }
                        if (live) { ctx.strokeStyle = "#ECEFF1"; ctx.lineWidth = 2; ctx.strokeRect(p.x, p.top - 2, p.w, 4); }
                    }
                    ctx.fillStyle = "#FF5252"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(live ? "MỎM ĐÁ HOÁ GAI — XUỐNG ĐẤT!" : "SẮP MỌC GAI!", canvas.width/2, 112); ctx.textAlign = "left";
                }
                if (this.crackT > 0 || this.state === 'crack_prep') {
                    for (let p of this.rocks()) {
                        let f = p.fuse || 0;
                        ctx.strokeStyle = f > 0 ? ((frames % 6 < 3) ? "#FF1744" : "#FF8A65") : "rgba(120,144,156,0.9)";
                        ctx.lineWidth = f > 0 ? 3 : 2;
                        for (let k = 0; k < 3; k++) {
                            let cx4 = p.x + p.w * (0.2 + k * 0.3);
                            ctx.beginPath(); ctx.moveTo(cx4, p.top); ctx.lineTo(cx4 + 8, p.top + 9); ctx.lineTo(cx4 - 4, p.top + 16); ctx.stroke();
                        }
                        if (f > 0) {   // vach dem toi luc vo
                            ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(p.x, p.top - 9, p.w, 5);
                            ctx.fillStyle = "#FF1744"; ctx.fillRect(p.x, p.top - 9, p.w * (1 - f / MG_CRACK_FUSE), 5);
                        }
                    }
                    ctx.fillStyle = "#FFAB91"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(this.crackT > 0 ? ("ĐÁ RẠN NỨT — " + Math.ceil(this.crackT / 60) + "s") : "ĐÁ SẮP RẠN!", canvas.width/2, 112);
                    ctx.textAlign = "left";
                }
                // ===== MOM DA BI NEM =====
                if (this.thrown) {
                    let t = this.thrown;
                    ctx.save();
                    if (t.phase === 'up') {   // dang bung len + ngam
                        ctx.strokeStyle = (frames % 8 < 4) ? "#FF5252" : "rgba(255,82,82,0.3)"; ctx.lineWidth = 3;
                        ctx.setLineDash([8, 8]);
                        ctx.beginPath(); ctx.moveTo(t.x, t.y); ctx.lineTo(dino.x + dino.w/2, dino.y + dino.h/2); ctx.stroke();
                        ctx.setLineDash([]);
                    }
                    ctx.fillStyle = "#6D4C41";
                    ctx.beginPath(); ctx.moveTo(t.x - t.w/2, t.y + 14); ctx.lineTo(t.x - t.w/3, t.y - 16);
                    ctx.lineTo(t.x + t.w/3, t.y - 14); ctx.lineTo(t.x + t.w/2, t.y + 16); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#3E2723"; ctx.lineWidth = 3; ctx.stroke();
                    ctx.strokeStyle = "#A1887F"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(t.x - t.w/4, t.y - 6); ctx.lineTo(t.x + t.w/5, t.y + 6); ctx.stroke();
                    ctx.restore();
                }


                // ================= THAN NUI =================
                ctx.save(); ctx.translate(cx, y + this.h); ctx.rotate(tl); ctx.translate(-cx, -(y + this.h));
                // khoi nui nhieu lop da
                let body = [[x - 90, y + this.h + 80], [x + 30, y + 132], [x + 92, y + 64],
                            [x + 208, y + 64], [x + 270, y + 132], [x + 390, y + this.h + 80]];
                ctx.fillStyle = "#2F3D46"; ctx.beginPath();
                ctx.moveTo(body[0][0], body[0][1]); for (let p of body.slice(1)) ctx.lineTo(p[0], p[1]); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#3D4E59"; ctx.beginPath();                       // lop sang phia truoc
                ctx.moveTo(x + 30, y + 132); ctx.lineTo(x + 92, y + 64); ctx.lineTo(x + 150, y + 64);
                ctx.lineTo(x + 130, y + this.h + 80); ctx.lineTo(x - 40, y + this.h + 80); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "rgba(144,164,174,0.5)"; ctx.lineWidth = 2;     // via da ngang
                for (let k = 0; k < 6; k++) { ctx.beginPath();
                    ctx.moveTo(x - 60 + k*12, y + 150 + k*22); ctx.lineTo(x + 360 - k*14, y + 150 + k*22); ctx.stroke(); }
                ctx.fillStyle = "#33691E";                                         // reu
                for (let k = 0; k < 7; k++) ctx.fillRect(x - 30 + k*58, y + 146 + (k%3)*26, 34, 9);
                // dau
                ctx.fillStyle = "#4A5D69"; ctx.beginPath();
                ctx.moveTo(x + 100, y + 68); ctx.lineTo(x + 128, y + 8);
                ctx.lineTo(x + 172, y + 8); ctx.lineTo(x + 200, y + 68); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#1C262B"; ctx.lineWidth = 4; ctx.stroke();
                ctx.fillStyle = "#26333B";                                          // hoc mat
                ctx.fillRect(x + 120, y + 28, 26, 16); ctx.fillRect(x + 154, y + 28, 26, 16);
                let eg = 0.5 + 0.5 * Math.sin(this.eye * 2.2);
                ctx.save(); ctx.shadowBlur = 14; ctx.shadowColor = "#FFEB3B";
                ctx.fillStyle = "rgba(255,235,59," + eg.toFixed(2) + ")";
                ctx.fillRect(x + 124, y + 32, 18, 9); ctx.fillRect(x + 158, y + 32, 18, 9); ctx.restore();
                ctx.fillStyle = "#1C262B";                                          // mieng khe nut
                ctx.beginPath(); ctx.moveTo(x + 116, y + 56); ctx.lineTo(x + 150, y + 62); ctx.lineTo(x + 184, y + 56);
                ctx.lineTo(x + 150, y + 52); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#26333B";                                          // sung
                ctx.beginPath(); ctx.moveTo(x + 112, y + 16); ctx.quadraticCurveTo(x + 58, y - 46, x + 96, y - 58);
                ctx.quadraticCurveTo(x + 92, y - 16, x + 134, y + 6); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(x + 188, y + 16); ctx.quadraticCurveTo(x + 242, y - 46, x + 204, y - 58);
                ctx.quadraticCurveTo(x + 208, y - 16, x + 166, y + 6); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#1C262B"; ctx.lineWidth = 4; ctx.beginPath();
                ctx.moveTo(body[0][0], body[0][1]); for (let p of body.slice(1)) ctx.lineTo(p[0], p[1]); ctx.stroke();
                ctx.restore();

                // ===== CAC MOM DA CHINH LA THAN NO: noi tay/vai vao than =====
                for (let k = 0; k < R.length; k++) {
                    let p = R[k];
                    let ax = cx + (p.x + p.w/2 < cx ? -70 : 70), ay = y + 150 + k * 12;
                    ctx.strokeStyle = "#39474F"; ctx.lineWidth = 26; ctx.lineCap = "round";
                    ctx.beginPath(); ctx.moveTo(ax, ay);
                    ctx.quadraticCurveTo((ax + p.x + p.w/2) / 2, (ay + p.top) / 2 - 16, p.x + p.w/2, p.top + 8); ctx.stroke();
                    ctx.strokeStyle = "#4A5D69"; ctx.lineWidth = 14;
                    ctx.beginPath(); ctx.moveTo(ax, ay);
                    ctx.quadraticCurveTo((ax + p.x + p.w/2) / 2, (ay + p.top) / 2 - 16, p.x + p.w/2, p.top + 8); ctx.stroke();
                    // ban tay xoe ra lam mat dung
                    ctx.fillStyle = "#54697A"; ctx.fillRect(p.x - 6, p.top - 4, p.w + 12, 22);
                    ctx.fillStyle = "#3D4E59"; ctx.fillRect(p.x - 6, p.top + 12, p.w + 12, 8);
                    ctx.strokeStyle = "#1C262B"; ctx.lineWidth = 3; ctx.strokeRect(p.x - 6, p.top - 4, p.w + 12, 22);
                    ctx.fillStyle = "#54697A";                                       // ngon tay
                    for (let f = 0; f < 4; f++) ctx.fillRect(p.x + 6 + f * (p.w - 20) / 3, p.top - 16, 13, 16);
                    ctx.fillStyle = "#2E7D32";
                    for (let f = 0; f < 3; f++) ctx.fillRect(p.x + 12 + f * 40, p.top - 7, 18, 5);
                }

                if (this.state === 'grip_prep' && this.gripP) { let k = 1 - this.subTimer / 70, p = this.gripP;
                    ctx.fillStyle = "rgba(255,23,68," + (0.15 + k*0.4).toFixed(2) + ")"; ctx.fillRect(p.x - 8, p.top - 20, p.w + 16, 40);
                    ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 4; ctx.strokeRect(p.x - 8, p.top - 20, p.w + 16, 40);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("SIET TAY - RA KHOI!", p.x + p.w/2, p.top - 28); ctx.textAlign = "left"; }
                if (this.gripSaved) { ctx.strokeStyle = "rgba(120,144,156,0.4)"; ctx.setLineDash([7,7]); ctx.lineWidth = 2;
                    ctx.strokeRect(this.gripSaved.x, this.gripSaved.top, this.gripSaved.w, 18); ctx.setLineDash([]);
                    ctx.fillStyle = "rgba(144,164,174,0.6)"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(Math.ceil(this.gripSaved.t/60)+"s", this.gripSaved.x + this.gripSaved.w/2, this.gripSaved.top + 13); ctx.textAlign = "left"; }
                if (this.state === 'slap_prep') { let k = 1 - this.subTimer / 66, ty = this.slapY - 206;
                    for (let sx of this.slapXs) {
                        ctx.fillStyle = "rgba(255,23,68," + (0.10 + k*0.3).toFixed(2) + ")"; ctx.fillRect(sx - 90, ty, 180, 220);
                        ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 4; ctx.strokeRect(sx - 90, ty, 180, 220);
                        ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.beginPath();
                        ctx.ellipse(sx, this.slapY + 4, Math.max(10, 40 + k*60), Math.max(5, 10 + k*10), 0, 0, Math.PI*2); ctx.fill();
                    }
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(this.slapXs.length > 1 ? "HAI BÀN TAY ĐẬP XUỐNG!" : "BÀN TAY ĐẬP XUỐNG!", canvas.width/2, ty - 8);
                    ctx.textAlign = "left"; }
                if (this.state === 'shiver_prep' || this.state === 'shiver_go') {
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(this.tiltDir > 0 ? "NGHIENG PHAI - TRUOT!" : "NGHIENG TRAI - TRUOT!", canvas.width/2, 60); ctx.textAlign = "left";
                    if (this.state === 'shiver_go') { ctx.strokeStyle = "rgba(255,235,59,0.6)"; ctx.lineWidth = 4;
                        for (let k = 0; k < 5; k++) { let ay2 = 150 + k * 40;
                            ctx.beginPath(); ctx.moveTo(canvas.width/2, ay2); ctx.lineTo(canvas.width/2 + this.tiltDir * 60, ay2 + 8); ctx.stroke(); } } }

                if (this.state === 'slap_fall') {
                    let k = 1 - this.subTimer / 40, hy = -90 + k * (this.slapY + 4);
                    for (let si = 0; si < this.slapXs.length; si++) {
                        let sx = this.slapXs[si], mirH = si % 2 ? -1 : 1;
                        ctx.save(); ctx.translate(sx, 0); ctx.scale(mirH, 1); ctx.translate(-sx, 0);
                        ctx.fillStyle = "#39474F"; ctx.fillRect(sx - 84, hy, 168, 96);
                        ctx.fillStyle = "#54697A"; ctx.fillRect(sx - 66, hy + 14, 132, 44);
                        ctx.strokeStyle = "#1C262B"; ctx.lineWidth = 4; ctx.strokeRect(sx - 84, hy, 168, 96);
                        ctx.fillStyle = "#39474F";
                        for (let k2 = 0; k2 < 4; k2++) { ctx.fillRect(sx - 74 + k2*40, hy + 94, 28, 40);
                            ctx.strokeRect(sx - 74 + k2*40, hy + 94, 28, 40); }
                        // co tay noi len troi -> nhin ra la BAN TAY cua nui, khong phai khoi da roi
                        ctx.fillStyle = "#2F3D46"; ctx.fillRect(sx - 40, hy - 120, 80, 126);
                        ctx.strokeRect(sx - 40, hy - 120, 80, 126);
                        ctx.restore();
                    }
                }
                for (let s2 of this.shards) {
                    ctx.fillStyle = "#78909C"; ctx.beginPath();
                    ctx.moveTo(s2.x - 13, s2.y); ctx.lineTo(s2.x - 4, s2.y - 13); ctx.lineTo(s2.x + 12, s2.y - 5);
                    ctx.lineTo(s2.x + 6, s2.y + 12); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#263238"; ctx.lineWidth = 2; ctx.stroke();
                }
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 200, 12, 400, 14);
                ctx.fillStyle = this.rage ? "#FF5252" : "#90A4AE";
                ctx.fillRect(canvas.width/2 - 199, 13, 398 * Math.max(0, this.hp / this.maxHp), 12);
                ctx.fillStyle = "white"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + "  " + Math.max(0, Math.ceil(this.hp)) + "/" + this.maxHp + (this.rage ? "  [DUNG DAY]" : ""), canvas.width/2, 36);
                ctx.textAlign = "left"; ctx.restore();
            }
}
// BOSS_PART_END s0.MountainGodBoss.1

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
