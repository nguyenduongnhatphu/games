// BOSS_FILE: DragonLordBoss
// BOSS_SNAPSHOT: 2b36ae4c51fabb54b8d0e06c3164b8f6c2ef05a8c767bbd93c893e9900521e3e
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, pickFromBag, shakeTimer, troiSinh, visualEffects
// Nguồn: index.html:206 · Dùng bởi: DragonLordBoss, EmberWolfBoss, FlameCoreBoss, FlameLancerBoss, GreatApeBoss, MagmorBoss, QuetzalBoss
// BOSS_PART_BEGIN s0.GWAVE_H.1 READ_ONLY
const GWAVE_H = 96, GWAVE_SPD = 11.5;
// BOSS_PART_END s0.GWAVE_H.1

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

// Nguồn: index.html:28560 · Dùng bởi: DragonLordBoss
// BOSS_PART_BEGIN s0.DL_BREATH_MIN.1 EDITABLE
const DL_BREATH_MIN = 1, DL_BREATH_MAX = 3, DL_BREATH_RUN = 760, DL_BREATH_POW = 2.6;
// BOSS_PART_END s0.DL_BREATH_MIN.1

// Nguồn: index.html:28561 · Dùng bởi: DragonLordBoss
// BOSS_PART_BEGIN s0.DL_SLAM_WARN.1 EDITABLE
const DL_SLAM_WARN = 45;
// BOSS_PART_END s0.DL_SLAM_WARN.1

// Nguồn: index.html:28562 · Dùng bởi: DragonLordBoss
// BOSS_PART_BEGIN s0.DL_SLAM_STEP.1 EDITABLE
const DL_SLAM_STEP = 190;
// BOSS_PART_END s0.DL_SLAM_STEP.1

// Nguồn: index.html:28563 · Dùng bởi: DragonLordBoss
// BOSS_PART_BEGIN s0.DL_RAIN_COLS.1 EDITABLE
const DL_RAIN_COLS = 9, DL_RAIN_SAFE = 3, DL_RAIN_GAP = 46;
// BOSS_PART_END s0.DL_RAIN_COLS.1

// Nguồn: index.html:28564 · Dùng bởi: DragonLordBoss
// BOSS_PART_BEGIN s0.DL_FLAME_T.1 EDITABLE
const DL_FLAME_T = 132;
// BOSS_PART_END s0.DL_FLAME_T.1

// Nguồn: index.html:28565 · Dùng bởi: DragonLordBoss
// BOSS_PART_BEGIN s0.DL_INH_PULL.1 EDITABLE
const DL_INH_PULL = 100;
// BOSS_PART_END s0.DL_INH_PULL.1

// Nguồn: index.html:28566 · Dùng bởi: DragonLordBoss
// BOSS_PART_BEGIN s0.DL_RING_T.1 EDITABLE
const DL_RING_T = 120, DL_RING_GAP = 130;
// BOSS_PART_END s0.DL_RING_T.1

// Nguồn: index.html:28567 · Dùng bởi: DragonLordBoss
// BOSS_PART_BEGIN s0.DL_RING_SLAM.1 EDITABLE
const DL_RING_SLAM = 76, DL_RING_HIT = 24;
// BOSS_PART_END s0.DL_RING_SLAM.1

// Nguồn: index.html:28568 · Dùng bởi: DragonLordBoss
// BOSS_PART_BEGIN s0.DL_RAIN_FALL.1 EDITABLE
const DL_RAIN_FALL = 72, DL_RAIN_SKEW = 300;
// BOSS_PART_END s0.DL_RAIN_FALL.1

// Nguồn: index.html:28569 · Dùng bởi: DragonLordBoss
// BOSS_PART_BEGIN s0.DragonLordBoss.1 EDITABLE
class DragonLordBoss {
            constructor(level) {
                this.hp = 250; this.maxHp = 250;
                this.tier = 'colossal';
                this.headWeak = true; this.headZone = 120; this.headMarkX = 16; this.headMarkY = 56; this.headHits = 0;
                this.w = 236; this.h = 250;
                this.baseX = canvas.width - 262; this.baseY = 74;         // lui vao dung nham, van thay tron dau
                this.x = canvas.width + 60; this.y = this.baseY;
                this.state = 'entering'; this.retState = 'idle'; this.name = "HAC LONG VUONG";
                this.actionTimer = 110; this.subTimer = 0; this.lastSkill = '';
                this.armUp = 0; this.armSwing = 0; this.rocks = []; this.shards = []; this.column = null; this.gust = 0;
                this.flameX = 0; this.flamePools = []; this.ringL = 0; this.ringR = 0; this.inhT = 0;
                this.eyeGlow = 0; this.riseY = 0; this.slamX = 0; this.orbs = []; this.rakeX = null;
                this.burnTimer = 0; this.lastMeleeHit = -1;
            }
            // MUA CAU DUNG NHAM: chia man thanh 9 cot, moi dot bo trong DL_RAIN_SAFE cot LIEN NHAU
            // -> luon ton tai mot khoang rong ~330px de chay qua, khong bao gio bit kin duong.
            makeRainPlan() {
                let cw = canvas.width / DL_RAIN_COLS, plan = [], prevGap = -9;
                for (let w = 0; w < 3; w++) {
                    let gap;
                    do { gap = Math.floor(Math.random() * (DL_RAIN_COLS - DL_RAIN_SAFE + 1)); }
                    while (Math.abs(gap - prevGap) < 2);
                    prevGap = gap;
                    let xs = [];
                    for (let c = 0; c < DL_RAIN_COLS; c++) {
                        if (c >= gap && c < gap + DL_RAIN_SAFE) continue;
                        xs.push(Math.round((c + 0.5) * cw + (Math.random() - 0.5) * 18));
                    }
                    plan.push(xs);
                }
                return plan;
            }
            getDmg() { return 1; }
            // Nam dam LUON di ve phia nguoi choi, nhung moi nhip chi nhich toi da DL_SLAM_STEP px
            // -> 3 nhip la mot chuoi "duoi theo": chay xa duoc, nhung phai chay lien tuc.
            nextSlamX(first) {
                let want = dino.x + dino.w / 2;
                let from = first ? (this.x + this.w / 2) : this.slamX;
                let d = want - from;
                if (Math.abs(d) > DL_SLAM_STEP) d = Math.sign(d) * DL_SLAM_STEP;
                return Math.max(90, Math.min(canvas.width - 90, from + d));
            }
            // Vi tri MOM rong (mom dai chia ve ben trai)
            mouth() { let yy = this.y - this.riseY; return { x: this.x + 96 - 96, y: yy + 46 + 10 }; }
            tickFlamePools() {
                for (let i = this.flamePools.length - 1; i >= 0; i--) {
                    let f = this.flamePools[i]; f.t--;
                    if (f.t <= 0) { this.flamePools.splice(i, 1); continue; }
                    if (f.t > 46 && checkAABB(dino, { x: f.x - 26, y: 288, w: 52, h: 38 })) {
                        if (!dino.isShielding()) { if (frames % 16 === 0) dino.takeDamage(1); } else parry();
                    }
                }
            }
            wave(cx, dir, dmg) {
                let w = new BossProjectile(cx, 322 - GWAVE_H, dir * (GWAVE_SPD + 1), 0, true, dmg || 1);
                w.w = 48; w.h = GWAVE_H; w.color = "#FF5722"; w.crescent = true; bossProjectiles.push(w);
            }
            update() {
                this.eyeGlow += 0.07; if (this.armSwing > 0) this.armSwing--;
                this.tickFlamePools();
                if (this.state === 'entering') { this.x -= 5; if (this.x <= this.baseX) { this.x = this.baseX; this.state = 'intro'; this.subTimer = 0; } return; }
                if (this.state === 'intro') { this.subTimer++; if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x - 60, 120, "HAC LONG VUONG!")); if (SFX.bossEntry) SFX.bossEntry(); shakeTimer = 50; } if (this.subTimer > 60) { this.state = 'idle'; this.actionTimer = 80; } return; }

                for (let i = this.rocks.length - 1; i >= 0; i--) {
                    let r = this.rocks[i]; r.vy += 0.34; r.y += r.vy; r.x += r.vx;
                    // da dang BAY khong gay sat thuong - chi cho roi xuong dat moi no (bong da bao truoc)
                    if (r.y >= 294) { shakeTimer = Math.max(shakeTimer, 20);
                        visualEffects.push(new Effect(r.x, 300, 'explosion', true, 44));
                        for (let k = 0; k < 3; k++) this.shards.push({ x: r.x, y: 290, vx: (k - 1) * 2.6, vy: -6.5, life: 90 });
                        this.rocks.splice(i, 1); }
                }
                for (let i = this.shards.length - 1; i >= 0; i--) {
                    let s2 = this.shards[i]; s2.vy += 0.35; s2.y += s2.vy; s2.x += s2.vx; s2.life--;
                    if (s2.y > 300) { visualEffects.push(new Effect(s2.x, 300, 'explosion', true, 16)); this.shards.splice(i, 1); continue; }   // cham dat la tat, khong nay lung tung
                    if (checkAABB(dino, { x: s2.x - 13, y: s2.y - 13, w: 26, h: 26 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); this.shards.splice(i, 1); continue; }
                    if (s2.life <= 0) this.shards.splice(i, 1);
                }
                for (let i = this.orbs.length - 1; i >= 0; i--) {
                    let o = this.orbs[i]; if (!o.noG) o.vy += 0.22; o.x += o.vx; o.y += o.vy;
                    let _or = o.small ? 13 : 22;
                    if (checkAABB(dino, { x: o.x - _or, y: o.y - _or, w: _or*2, h: _or*2 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); this.orbs.splice(i, 1); continue; }
                    if (o.y > 300) { visualEffects.push(new Effect(o.x, 300, 'explosion', true, o.small ? 16 : 30)); if (!o.small) this.wave(o.x - 30, -1); this.orbs.splice(i, 1); continue; }
                    if (o.x < -60 || o.x > canvas.width + 60) this.orbs.splice(i, 1);
                }
                if (this.column) {
                    this.column.t--;
                    if (this.column.t <= 0) this.column = null;
                    else if (this.column.t < 150 && checkAABB(dino, { x: this.column.x - 84, y: 60, w: 168, h: 262 })) {
                        if (!dino.isShielding()) { if (frames % 14 === 0) dino.takeDamage(1); } else parry(); }
                }
                if (this.gust > 0) { this.gust--;
                    let dir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    dino.x += dir * 3.6; dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x)); }

                if (this.state === 'idle') {
                    this.armUp *= 0.9; this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let pool = ['slam', 'bodyslam', 'rocks', 'column', 'breath', 'rake', 'orbs', 'flame', 'inhale', 'ring'];
                        let c = pickFromBag(this, pool);
                        if (c === 'slam') { this.state = 'slam_prep'; this.subTimer = DL_SLAM_WARN; this.slamStep = 0; this.slamX = this.nextSlamX(true); }
                        else if (c === 'bodyslam') { this.state = 'body_prep'; this.subTimer = 85; }
                        else if (c === 'rocks') { this.state = 'rocks_prep'; this.subTimer = 62;
                            this.rockMarks = [250, 380, 510].sort(() => Math.random() - 0.5).slice(0, 2); }
                        else if (c === 'column') { this.state = 'col_prep'; this.subTimer = 80; this.colX = 74; }
                        else if (c === 'breath') { this.state = 'breath_prep'; this.subTimer = 58; this.breathBand = 292; }
                        else if (c === 'orbs') { this.state = 'orb_prep'; this.subTimer = 62; this.rainPlan = this.makeRainPlan(); this.rainWave = 0; this.rainCd = 0; }
                        else if (c === 'flame') { this.state = 'flame_prep'; this.subTimer = 66; this.flameX = canvas.width + 40; }
                        else if (c === 'inhale') { this.state = 'inh_prep'; this.subTimer = 40; }
                        else if (c === 'ring') { this.state = 'ring_prep'; this.subTimer = 54; this.ringL = -60; this.ringR = canvas.width + 60; }
                        else { this.state = 'rake_prep'; this.subTimer = 52; }
                    }
                }
                // === DAP TAY: dap dung cho nguoi choi + song lua ca 2 ben ===
                else if (this.state === 'slam_prep') { this.armUp = Math.min(1, this.armUp + (this.slamStep ? 0.06 : 0.028)); this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'slam_fire'; this.subTimer = 20; shakeTimer = 34; this.armSwing = 14; if (SFX.bossSkill) SFX.bossSkill();
                        if (checkAABB(dino, { x: this.slamX - 86, y: 210, w: 172, h: 116 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                        visualEffects.push(new Effect(this.slamX, 300, 'explosion', true, 56));
                        // Chi NHIP CHOT (nhip 3) moi tach san phun song lua 2 ben — 2 nhip dau chi la dmg vung
                        if (this.slamStep === 2) { this.wave(this.slamX - 110, -1); this.wave(this.slamX + 80, 1); } } }
                else if (this.state === 'slam_fire') { this.armUp *= 0.72; this.subTimer--;
                    if (this.subTimer <= 0) {
                        // DAP LIEN HOAN 3 NHIP: trai -> phai -> CHOT ngay cho nguoi choi dang dung
                        this.slamStep = (this.slamStep || 0) + 1;
                        if (this.slamStep < 3) {
                            this.slamX = this.nextSlamX(false);
                            this.state = 'slam_prep'; this.subTimer = DL_SLAM_WARN;
                        } else { this.slamStep = 0; this.state = 'idle'; this.actionTimer = 74; }
                    } }
                // === LAO CA THAN DAP HET BAN DO ===
                else if (this.state === 'body_prep') { this.subTimer--; this.riseY = Math.min(120, this.riseY + 1.6);
                    if (this.subTimer <= 0) { this.state = 'body_fall'; this.subTimer = 50; shakeTimer = 60; if (SFX.bossExplode) SFX.bossExplode(); } }
                else if (this.state === 'body_fall') {
                    this.subTimer--; this.riseY = Math.max(-40, this.riseY - 9);
                    // Bui dat bung len NGAY khi cua so sat thuong mo (truoc day no o frame 24, tuc TRE 2 frame)
                    if (this.subTimer === 26) {
                        for (let k = 0; k < 9; k++) visualEffects.push(new Effect(40 + k * 115, 302 - Math.random()*26, 'explosion', true, 36));
                        shakeTimer = Math.max(shakeTimer, 40);
                    }
                    if (this.subTimer <= 26 && this.subTimer >= 18) {
                        if (checkAABB(dino, { x: 0, y: 282, w: canvas.width, h: 44 })) { if (!dino.isShielding()) { if (frames % 8 === 0) dino.takeDamage(2); } else parry(); }
                    }
                    if (this.subTimer === 24) {
                        for (let k = 0; k < 7; k++) visualEffects.push(new Effect(60 + k * 140, 300 - Math.random()*40, 'explosion', true, 40));
                        this.wave(canvas.width - 120, -1, 1); this.wave(canvas.width - 200, -1, 1);
                        shakeTimer = 60;
                    }
                    if (this.subTimer <= 0) { this.state = 'body_back'; this.subTimer = 40; }
                }
                else if (this.state === 'body_back') { this.subTimer--; this.riseY = Math.max(0, this.riseY - 1); if (this.subTimer <= 0) { this.riseY = 0; this.state = 'idle'; this.actionTimer = 80; } }
                // === NEM DA ===
                else if (this.state === 'rocks_prep') { this.armUp = Math.min(1, this.armUp + 0.024); this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'rocks_fire'; this.subTimer = 150; this.armSwing = 12; if (SFX.bossSkill) SFX.bossSkill();
                        for (let m of this.rockMarks) this.rocks.push({ x: this.x + 20, y: 160, vx: (m - (this.x + 20)) / 60, vy: -7 }); } }
                else if (this.state === 'rocks_fire') { this.armUp *= 0.92; this.subTimer--; if (this.subTimer <= 0 && this.rocks.length === 0) { this.state = 'idle'; this.actionTimer = 74; } }
                // === CAU DUNG NHAM: roi xuong no ra song lua 2 ben ===
                else if (this.state === 'orb_prep') { this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'orb_fire'; this.subTimer = 240; this.rainCd = 0; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'orb_fire') {
                    this.subTimer--; this.rainCd--;
                    if (this.rainCd <= 0 && this.rainWave < this.rainPlan.length) {
                        for (let px of this.rainPlan[this.rainWave]) {
                            // Diem ROI da duoc tinh san (co chua duong chay). Diem XUAT PHAT lech ngau nhien
                            // -> qua cau bay CHEO nhieu goc khac nhau, nhin loan nhung ha canh van dung cho.
                            let sx = Math.max(-40, Math.min(canvas.width + 40, px + (Math.random() - 0.5) * 2 * DL_RAIN_SKEW));
                            this.orbs.push({ x: sx, y: troiSinh(), vx: (px - sx) / DL_RAIN_FALL, vy: (330 - troiSinh() - 30) / DL_RAIN_FALL, small: true, noG: true });
                        }
                        this.rainWave++; this.rainCd = DL_RAIN_GAP;
                        shakeTimer = Math.max(shakeTimer, 8);
                    }
                    if (this.rainWave >= this.rainPlan.length && this.orbs.length === 0) { this.state = 'idle'; this.actionTimer = 70; }
                    if (this.subTimer <= 0 && this.orbs.length === 0) { this.state = 'idle'; this.actionTimer = 70; }
                }
                // === COT DUNG NHAM + QUAT CANH ===
                else if (this.state === 'col_prep') { this.armUp = Math.min(1, this.armUp + 0.03); this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'col_fire'; this.subTimer = 200; shakeTimer = 40; if (SFX.bossSkill) SFX.bossSkill();
                        if (!(this.colX > 0)) this.colX = 74;
                        this.column = { x: this.colX, t: 200 }; this.gust = 150;
                        floatingTexts.push(new FloatingText(dino.x, dino.y - 30, "CHAY VE PHIA RONG!")); } }
                else if (this.state === 'col_fire') { this.armUp *= 0.9; this.subTimer--; if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 80; } }
                // === PHUN LUA QUET ===
                else if (this.state === 'breath_prep') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'breath_fire'; this.subTimer = 200; this.breathX = this.x + 10; this.breathX0 = this.breathX; this.breathG = DL_BREATH_MIN; this.breathHit = false; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'breath_fire') {
                    this.subTimer--; this.breathX -= 5.6;                                  // SONG LUA bay toi, nhay doi qua duoc
                    // CAO DAN theo quang duong da di: cuoi man cao GAP 3 -> phai né tu som
                    this.breathG = DL_BREATH_MIN + (DL_BREATH_MAX - DL_BREATH_MIN) * Math.pow(Math.max(0, Math.min(1, (this.breathX0 - this.breathX) / DL_BREATH_RUN)), DL_BREATH_POW);
                    if (!this.breathHit && checkAABB(dino, { x: this.breathX - 42, y: this.breathBand + 32 - 84 * this.breathG, w: 84, h: 84 * this.breathG })) { this.breathHit = true; if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (frames % 6 === 0) visualEffects.push(new Effect(this.breathX, this.breathBand, 'explosion', true, 14));
                    if (this.breathX < -70 || this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 70; }
                }
                // === CAO NGANG CA BAN DO ===
                // ================= PHUN LUA QUET SAN (phai -> trai, lua ra tu MOM) =================
                else if (this.state === 'flame_prep') { this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'flame_go'; this.subTimer = DL_FLAME_T; this.flameX = canvas.width + 40; shakeTimer = 26; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'flame_go') {
                    this.subTimer--;
                    this.flameX -= (canvas.width + 140) / DL_FLAME_T;
                    let m = this.mouth();
                    // tia lua = doan thang tu MOM toi diem quet tren san
                    let dxf = this.flameX - m.x, dyf = 320 - m.y, df = Math.hypot(dxf, dyf) || 1;
                    let ux = dxf / df, uy = dyf / df;
                    let pxq = dino.x + dino.w / 2 - m.x, pyq = dino.y + dino.h / 2 - m.y;
                    let along = pxq * ux + pyq * uy, perp = Math.abs(-pxq * uy + pyq * ux);
                    if (along > 0 && along < df + 30 && perp < 30) {
                        if (!dino.isShielding()) { if (frames % 12 === 0) dino.takeDamage(1); } else parry();
                    }
                    // vung chay con lai tren san
                    if (frames % 5 === 0) this.flamePools.push({ x: this.flameX, t: 70 });
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 80; }
                }
                // ================= NUOT CHUNG: hut nguoi choi vao mom roi DOP =================
                else if (this.state === 'inh_prep') { this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'inh_pull'; this.subTimer = DL_INH_PULL; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'inh_pull') {
                    this.subTimer--;
                    let m = this.mouth(), pcx2 = dino.x + dino.w / 2;
                    let d = m.x - pcx2, s2 = Math.sign(d);
                    // luc hut manh dan; nguoi choi chay 6px/f nen VAN thoat duoc neu chay dung huong
                    let pull = 1.4 + 2.6 * (1 - this.subTimer / DL_INH_PULL);
                    if (Math.abs(d) > 40) { dino.x += s2 * pull; dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x)); }
                    if (this.subTimer <= 0) { this.state = 'inh_bite'; this.subTimer = 26; shakeTimer = 34; }
                }
                else if (this.state === 'inh_bite') {
                    this.subTimer--;
                    if (this.subTimer === 20) {
                        let m = this.mouth();
                        if (checkAABB(dino, { x: m.x - 150, y: m.y - 60, w: 172, h: 150 })) {
                            if (!dino.isShielding()) dino.takeDamage(2); else parry();
                        }
                        visualEffects.push(new Effect(m.x - 60, m.y + 20, 'explosion', true, 54));
                    }
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 86; }
                }
                // ================= VONG VAY LUA: hai bien lua ep vao giua roi DAP CHINH GIUA =================
                else if (this.state === 'ring_prep') { this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'ring_close'; this.subTimer = DL_RING_T; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'ring_close') {
                    this.subTimer--;
                    let k = 1 - this.subTimer / DL_RING_T;
                    this.ringL = -60 + (canvas.width / 2 - DL_RING_GAP) * k;
                    this.ringR = canvas.width + 60 - (canvas.width / 2 - DL_RING_GAP) * k;
                    if (dino.x < this.ringL || dino.x + dino.w > this.ringR) {
                        if (!dino.isShielding()) { if (frames % 14 === 0) dino.takeDamage(1); } else parry();
                    }
                    if (this.subTimer <= 0) { this.state = 'ring_slam'; this.subTimer = DL_RING_SLAM; shakeTimer = 46; }
                }
                else if (this.state === 'ring_slam') {
                    this.subTimer--;
                    if (this.subTimer === DL_RING_HIT) {
                        let mid = canvas.width / 2;
                        if (checkAABB(dino, { x: mid - DL_RING_GAP - 20, y: 180, w: (DL_RING_GAP + 20) * 2, h: 146 })) {
                            if (!dino.isShielding()) dino.takeDamage(2); else parry();
                        }
                        for (let k = 0; k < 6; k++) visualEffects.push(new Effect(mid - 120 + k * 48, 292, 'explosion', true, 44));
                    }
                    if (this.subTimer <= 0) { this.ringL = -60; this.ringR = canvas.width + 60; this.state = 'idle'; this.actionTimer = 88; }
                }
                else if (this.state === 'rake_prep') { this.armUp = Math.min(1, this.armUp + 0.03); this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'rake_go'; this.subTimer = 26; this.armSwing = 26; shakeTimer = 30; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'rake_go') {
                    this.armUp *= 0.8; this.subTimer--;
                    if (this.subTimer > 8 && checkAABB(dino, { x: this.x - 340, y: 262, w: 356, h: 64 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (this.subTimer === 20) { visualEffects.push(new Effect(this.x - 170, 300, 'explosion', true, 50)); this.wave(this.x - 350, -1); }
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 72; }
                }
            }
            draw() {
                let x = this.x, y = this.y - this.riseY, cx = x + this.w/2;
                if (this.column) {
                    let warn = this.column.t >= 150;
                    ctx.fillStyle = warn ? "rgba(255,87,34,0.28)" : "rgba(255,87,34,0.85)";
                    ctx.fillRect(this.column.x - 84, 60, 168, 262);
                    if (!warn) { ctx.fillStyle = "#FFEB3B"; ctx.fillRect(this.column.x - 40, 60, 80, 262); }
                    ctx.strokeStyle = "#FF3D00"; ctx.lineWidth = 3; ctx.strokeRect(this.column.x - 84, 60, 168, 262);
                }
                if (this.gust > 0) {
                    ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 3;
                    for (let i = 0; i < 9; i++) { let gy = 110 + i * 24, gx = (frames * 10 + i * 90) % (canvas.width + 220) - 110;
                        ctx.beginPath(); ctx.moveTo(this.x - gx, gy); ctx.lineTo(this.x - gx - 70, gy); ctx.stroke(); }
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("GIO DAY! CHAY VE PHIA RONG!", canvas.width/2, 46); ctx.textAlign = "left";
                }
                if (this.state === 'slam_prep') { let k = 1 - this.subTimer / 52;
                    ctx.fillStyle = "rgba(255,23,68," + (0.12 + k*0.3).toFixed(2) + ")"; ctx.fillRect(this.slamX - 86, 210, 172, 116);
                    ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 3; ctx.strokeRect(this.slamX - 86, 210, 172, 116); }
                // BANG SAN CHET: hien suot ca pha nap LAN pha roi, khong tat giua chung.
                // Truoc day bang chi ve o 'body_prep' nen doi sang 'body_fall' la bien mat,
                // roi 24 frame sau sat thuong moi giang xuong -> nguoi choi an don tu man hinh trong tron.
                if (this.state === 'body_fall' && this.subTimer <= 30) {
                    // VET CHAM TOAN SAN: song xung chay ra tu giua, nut san doc mat dat
                    let t3 = Math.max(0, Math.min(1, (30 - this.subTimer) / 22));
                    ctx.save();
                    ctx.strokeStyle = "rgba(255,87,34," + (1 - t3).toFixed(2) + ")"; ctx.lineWidth = 8 - 5 * t3;
                    ctx.beginPath(); ctx.ellipse(cx, 310, 60 + t3 * 620, 14 + t3 * 26, 0, 0, Math.PI*2); ctx.stroke();
                    ctx.strokeStyle = "rgba(255,235,59," + (0.85 - t3).toFixed(2) + ")"; ctx.lineWidth = 4;
                    for (let k = 0; k < 12; k++) {
                        let px2 = cx + (k - 5.5) * 88 * (0.35 + t3);
                        ctx.beginPath(); ctx.moveTo(px2, 322); ctx.lineTo(px2 + (k % 2 ? 14 : -14), 296 - t3 * 20); ctx.stroke();
                    }
                    ctx.restore();
                }
                if (this.state === 'body_prep' || this.state === 'body_fall') {
                    let live = this.state === 'body_fall' && this.subTimer <= 26 && this.subTimer >= 18;
                    let k = this.state === 'body_prep' ? (1 - this.subTimer / 85) : 1;
                    ctx.fillStyle = live ? "rgba(255,235,59,0.55)"
                                         : "rgba(255,23,68," + (0.10 + k*0.32).toFixed(2) + ")";
                    ctx.fillRect(0, 282, canvas.width, 44);
                    ctx.strokeStyle = live ? "#FFEB3B" : "#FF1744"; ctx.lineWidth = live ? 6 : 4;
                    ctx.strokeRect(0, 282, canvas.width, 44);
                    if (!live) {
                        // vach dem nguoc: bao con bao lau nua thi sap
                        let togo = this.state === 'body_prep' ? this.subTimer + 24 : Math.max(0, this.subTimer - 26);
                        let p = 1 - Math.max(0, Math.min(1, togo / 109));
                        ctx.fillStyle = "#FF1744"; ctx.fillRect(0, 276, canvas.width * p, 5);
                    }
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 16px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(live ? "SÀN ĐANG CHẾT!" : "ĐẬP CẢ BẢN ĐỒ - NHẢY LÊN!", canvas.width/2, 236);
                    ctx.textAlign = "left";
                }
                if (this.state === 'rake_prep' || this.state === 'rake_go') {
                    let hit = this.state === 'rake_go' && this.subTimer > 8;
                    ctx.fillStyle = hit ? "rgba(255,87,34,0.55)" : ((frames % 6 < 3) ? "rgba(255,87,34,0.3)" : "transparent");
                    ctx.fillRect(this.x - 340, 262, 356, 64);
                    ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3; ctx.strokeRect(this.x - 340, 262, 356, 64);
                    if (!hit) { ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("CAO VUNG RONG - LUI RA XA!", this.x - 162, 252); ctx.textAlign = "left"; }
                    if (hit) { ctx.strokeStyle = "#FFCCBC"; ctx.lineWidth = 6;
                        for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(this.x - 20 - k*84, 268); ctx.lineTo(this.x - 60 - k*84, 322); ctx.stroke(); } }
                }
                // ===== VUNG CHAY con lai sau khi lua quet qua =====
                for (let f of this.flamePools) {
                    let a = Math.min(1, f.t / 30), live = f.t > 46;
                    ctx.save(); ctx.globalAlpha = a * (live ? 0.95 : 0.55);
                    ctx.fillStyle = live ? "#FF6D00" : "#5D2A00";
                    ctx.beginPath(); ctx.ellipse(f.x, 314, 26, 8, 0, 0, Math.PI*2); ctx.fill();
                    if (live) for (let k = 0; k < 3; k++) {
                        let fh = 16 + Math.sin(frames * 0.4 + f.x + k) * 8;
                        ctx.fillStyle = k === 1 ? "#FFEB3B" : "#FF9800";
                        ctx.beginPath(); ctx.moveTo(f.x - 14 + k * 14, 314);
                        ctx.quadraticCurveTo(f.x - 8 + k * 14, 314 - fh, f.x - 2 + k * 14, 314); ctx.closePath(); ctx.fill();
                    }
                    ctx.restore();
                }
                // ===== PHUN LUA QUET SAN =====
                if (this.state === 'flame_prep' || this.state === 'flame_go') {
                    let m = this.mouth();
                    if (this.state === 'flame_prep') {
                        let k = 1 - this.subTimer / 66;
                        ctx.fillStyle = "rgba(255,87,34," + (0.10 + 0.28 * k).toFixed(2) + ")";
                        ctx.fillRect(0, 288, canvas.width, 38);
                        ctx.strokeStyle = "#FF3D00"; ctx.lineWidth = 3; ctx.strokeRect(0, 288, canvas.width, 38);
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 15px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("PHUN LỬA QUÉT SÀN — LÊN CAO!", canvas.width/2, 268); ctx.textAlign = "left";
                        // mom tich lua
                        ctx.fillStyle = "rgba(255,235,59," + (0.3 + 0.6 * k).toFixed(2) + ")";
                        ctx.beginPath(); ctx.arc(m.x, m.y, 10 + 22 * k, 0, Math.PI*2); ctx.fill();
                    } else {
                        let tipx = this.flameX, tipy = 320;
                        let ang = Math.atan2(tipy - m.y, tipx - m.x), len = Math.hypot(tipx - m.x, tipy - m.y);
                        ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(ang);
                        // 3 lop: vien cam -> than cam sang -> loi trang vang, mep gon song
                        let lay = [[34, "rgba(255,87,34,0.55)"], [22, "rgba(255,152,0,0.85)"], [11, "#FFF59D"]];
                        for (let [hw, col] of lay) {
                            ctx.fillStyle = col;
                            ctx.beginPath(); ctx.moveTo(0, -6);
                            for (let t = 0; t <= 12; t++) {
                                let u = t / 12, wob = Math.sin(frames * 0.5 + t * 1.3) * hw * 0.22 * u;
                                ctx.lineTo(len * u, -hw * (0.25 + 0.75 * u) + wob);
                            }
                            for (let t = 12; t >= 0; t--) {
                                let u = t / 12, wob = Math.sin(frames * 0.5 + t * 1.3 + 2) * hw * 0.22 * u;
                                ctx.lineTo(len * u, hw * (0.25 + 0.75 * u) + wob);
                            }
                            ctx.closePath(); ctx.fill();
                        }
                        ctx.restore();
                        // luoi lua bung ra tai diem cham san
                        ctx.fillStyle = "rgba(255,235,59,0.9)";
                        ctx.beginPath(); ctx.ellipse(tipx, 314, 40, 13, 0, 0, Math.PI*2); ctx.fill();
                        ctx.fillStyle = "rgba(255,87,34,0.6)";
                        ctx.beginPath(); ctx.ellipse(tipx, 314, 66, 20, 0, 0, Math.PI*2); ctx.fill();
                    }
                }
                // ===== NUOT CHUNG =====
                if (this.state === 'inh_prep' || this.state === 'inh_pull' || this.state === 'inh_bite') {
                    let m = this.mouth();
                    if (this.state !== 'inh_bite') {
                        let k = this.state === 'inh_pull' ? (1 - this.subTimer / DL_INH_PULL) : (1 - this.subTimer / 40);
                        // xoay hut: cac vach chay ve phia mom
                        ctx.save(); ctx.strokeStyle = "rgba(255,152,0,0.75)"; ctx.lineWidth = 3;
                        for (let i = 0; i < 8; i++) {
                            let ph = ((frames * 0.03 + i / 8) % 1), rr = 300 * (1 - ph);
                            ctx.globalAlpha = ph;
                            // mom quay sang TRAI -> cung hut phai nam ben trai (quanh goc PI), truoc day ve ben phai
                            ctx.beginPath(); ctx.arc(m.x, m.y + 10, rr, Math.PI - 0.9, Math.PI + 0.9); ctx.stroke();
                        }
                        ctx.restore();
                        ctx.fillStyle = "rgba(0,0,0,0.75)";
                        ctx.beginPath(); ctx.ellipse(m.x - 10, m.y + 10, 22 + 26 * k, 30 + 22 * k, 0, 0, Math.PI*2); ctx.fill();
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("HÚT VÀO — CHẠY RA XA!", m.x, m.y - 66); ctx.textAlign = "left";
                    } else if (this.subTimer > 14) {
                        ctx.fillStyle = "rgba(255,23,68,0.5)"; ctx.fillRect(m.x - 150, m.y - 60, 172, 150);
                        ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 4; ctx.strokeRect(m.x - 150, m.y - 60, 172, 150);
                    }
                }
                // ===== VONG VAY LUA =====
                if (this.state === 'ring_prep' || this.state === 'ring_close' || this.state === 'ring_slam') {
                    let mid = canvas.width / 2;
                    if (this.state !== 'ring_prep') {
                        for (let [bx, bw] of [[0, Math.max(0, this.ringL)], [Math.min(canvas.width, this.ringR), canvas.width - this.ringR]]) {
                            if (bw <= 0) continue;
                            ctx.fillStyle = "rgba(255,87,34,0.55)"; ctx.fillRect(bx, 120, bw, 206);
                            ctx.fillStyle = "rgba(255,235,59,0.5)";
                            for (let k = 0; k < Math.ceil(bw / 26); k++) {
                                let fx3 = bx + k * 26 + 13, fh = 26 + Math.sin(frames * 0.35 + k) * 12;
                                ctx.beginPath(); ctx.moveTo(fx3 - 11, 326);
                                ctx.quadraticCurveTo(fx3, 326 - fh - 26, fx3 + 11, 326); ctx.closePath(); ctx.fill();
                            }
                        }
                    }
                    if (this.state === 'ring_slam') {
                        let live = this.subTimer <= DL_RING_HIT && this.subTimer > DL_RING_HIT - 8;
                        ctx.fillStyle = live ? "rgba(255,235,59,0.6)" : "rgba(255,23,68,0.34)";
                        ctx.fillRect(mid - DL_RING_GAP - 20, 180, (DL_RING_GAP + 20) * 2, 146);
                        ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 4;
                        ctx.strokeRect(mid - DL_RING_GAP - 20, 180, (DL_RING_GAP + 20) * 2, 146);
                        if (!live && this.subTimer > DL_RING_HIT) {   // vach dem nguoc toi luc dap
                            let p2 = 1 - (this.subTimer - DL_RING_HIT) / (DL_RING_SLAM - DL_RING_HIT);
                            ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(mid - DL_RING_GAP - 20, 172, (DL_RING_GAP + 20) * 2, 6);
                            ctx.fillStyle = "#FFEB3B"; ctx.fillRect(mid - DL_RING_GAP - 20, 172, (DL_RING_GAP + 20) * 2 * p2, 6);
                        }
                    }
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(this.state === 'ring_slam' ? "ĐẬP GIỮA!" : "VÒNG VÂY LỬA — VÀO GIỮA!", mid, 156);
                    ctx.textAlign = "left";
                }
                if (this.state === 'breath_prep') {
                    ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,87,34,0.3)" : "transparent"; ctx.fillRect(0, this.breathBand - 34, canvas.width, 66);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("SONG LUA - NHAY DOI QUA!", canvas.width/2, this.breathBand - 42); ctx.textAlign = "left";
                }
                if (this.state === 'breath_fire') {
                    let bx = this.breathX, g = this.breathG || DL_BREATH_MIN, base = this.breathBand + 32;
                    ctx.save();
                    ctx.translate(bx, base); ctx.scale(1, g); ctx.translate(-bx, -base);
                    ctx.fillStyle = "rgba(255,87,34,0.85)";
                    ctx.beginPath(); ctx.moveTo(bx - 42, base);
                    ctx.quadraticCurveTo(bx - 20, this.breathBand - 40, bx + 16, this.breathBand - 30);
                    ctx.quadraticCurveTo(bx + 46, this.breathBand + 4, bx + 42, base); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#FFEB3B";
                    ctx.beginPath(); ctx.moveTo(bx - 22, base);
                    ctx.quadraticCurveTo(bx - 8, this.breathBand - 16, bx + 12, this.breathBand - 12);
                    ctx.quadraticCurveTo(bx + 26, this.breathBand + 8, bx + 22, base); ctx.closePath(); ctx.fill();
                    ctx.restore();
                    // vach do cao hien tai: nhin la biet con nhay qua noi khong
                    ctx.strokeStyle = "rgba(255,235,59,0.75)"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(bx - 54, base - 84 * g); ctx.lineTo(bx + 54, base - 84 * g); ctx.stroke();
                    if (g > 2) { ctx.fillStyle = "#FF5252"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("QUÁ CAO!", bx, base - 84 * g - 8); ctx.textAlign = "left"; }
                }
                if (this.state === 'rocks_prep') for (let m of (this.rockMarks || [])) {
                    ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.beginPath(); ctx.ellipse(m, 314, 36, 10, 0, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#FF7043"; ctx.lineWidth = 2; ctx.stroke(); }
                for (let r of this.rocks) {
                    ctx.fillStyle = "#1A1A1A";
                    ctx.beginPath(); ctx.moveTo(r.x - 34, r.y - 8); ctx.lineTo(r.x - 18, r.y - 34); ctx.lineTo(r.x + 16, r.y - 32);
                    ctx.lineTo(r.x + 34, r.y - 4); ctx.lineTo(r.x + 14, r.y + 30); ctx.lineTo(r.x - 20, r.y + 28); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#FF5722"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(r.x - 20, r.y - 12); ctx.lineTo(r.x - 2, r.y + 6); ctx.lineTo(r.x + 18, r.y - 6); ctx.stroke();
                }
                for (let s2 of this.shards) {
                    ctx.fillStyle = "#FF6D00"; ctx.beginPath(); ctx.arc(s2.x, s2.y, 11, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFF176"; ctx.beginPath(); ctx.arc(s2.x, s2.y, 5, 0, Math.PI*2); ctx.fill();
                }
                for (let o of this.orbs) {
                    let R2 = o.small ? 13 : 22;
                    if (o.small) {   // duoi lua keo theo cho de thay tu tren cao
                        ctx.strokeStyle = "rgba(255,87,34,0.45)"; ctx.lineWidth = 5;
                        ctx.beginPath(); ctx.moveTo(o.x, o.y - 26); ctx.lineTo(o.x, o.y); ctx.stroke();
                    }
                    ctx.fillStyle = "rgba(255,87,34,0.9)"; ctx.beginPath(); ctx.arc(o.x, o.y, R2, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFEB3B"; ctx.beginPath(); ctx.arc(o.x, o.y, R2 * 0.5, 0, Math.PI*2); ctx.fill();
                }

                // ================= TAO HINH RONG CHUA (long nhan co bap) =================
                let eg = 0.55 + 0.45 * Math.sin(this.eyeGlow * 2.2);
                let hx = x + 96, hy = y + 46;                      // tam dau
                let shY = y + 118;                                  // vai
                // --- CANH LON RACH TA TOI (sau lung) ---
                ctx.fillStyle = "#171717";
                ctx.beginPath(); ctx.moveTo(x + 70, shY);
                ctx.quadraticCurveTo(x - 90, y + 6, x - 214, y + 54);
                ctx.quadraticCurveTo(x - 120, y + 66, x - 96, y + 158);
                ctx.quadraticCurveTo(x - 52, y + 92, x + 34, y + 150); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(x + 180, shY);
                ctx.quadraticCurveTo(x + 336, y + 6, x + 452, y + 54);
                ctx.quadraticCurveTo(x + 360, y + 66, x + 340, y + 158);
                ctx.quadraticCurveTo(x + 296, y + 92, x + 214, y + 150); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#0A0A0A"; ctx.lineWidth = 3;
                for (let k = 0; k < 3; k++) {
                    ctx.beginPath(); ctx.moveTo(x + 74, shY); ctx.quadraticCurveTo(x - 40 - k*40, y + 30 + k*28, x - 180 + k*46, y + 56 + k*36); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(x + 176, shY); ctx.quadraticCurveTo(x + 290 + k*40, y + 30 + k*28, x + 420 - k*46, y + 56 + k*36); ctx.stroke();
                }
                // --- THAN NGUOI CO BAP ---
                ctx.fillStyle = "#121212";
                ctx.beginPath();
                ctx.moveTo(x + 46, shY + 8);                                  // vai trai
                ctx.quadraticCurveTo(x + 70, y + 96, x + 118, y + 96);        // co
                ctx.quadraticCurveTo(x + 166, y + 96, x + 190, shY + 8);      // vai phai
                ctx.quadraticCurveTo(x + 206, y + 186, x + 178, y + 258);     // suon phai
                ctx.quadraticCurveTo(x + 118, y + 276, x + 58, y + 258);      // bung
                ctx.quadraticCurveTo(x + 30, y + 186, x + 46, shY + 8); ctx.closePath(); ctx.fill();
                // co bap nguc + bung
                ctx.strokeStyle = "#2A2A2A"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(x + 118, y + 132); ctx.lineTo(x + 118, y + 250); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(x + 58, y + 150); ctx.quadraticCurveTo(x + 118, y + 172, x + 178, y + 150); ctx.stroke();
                for (let k = 0; k < 3; k++) { ctx.beginPath();
                    ctx.moveTo(x + 74, y + 186 + k*24); ctx.quadraticCurveTo(x + 118, y + 196 + k*24, x + 162, y + 186 + k*24); ctx.stroke(); }
                // khe nham chay
                ctx.strokeStyle = "rgba(255,87,34,0.8)"; ctx.lineWidth = 4;
                ctx.beginPath(); ctx.moveTo(x + 62, y + 140); ctx.quadraticCurveTo(x + 86, y + 196, x + 66, y + 256); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(x + 172, y + 140); ctx.quadraticCurveTo(x + 150, y + 196, x + 170, y + 256); ctx.stroke();
                // --- CO + DAU RONG (thay tron) ---
                ctx.fillStyle = "#151515";
                ctx.beginPath(); ctx.moveTo(x + 96, y + 100);
                ctx.quadraticCurveTo(x + 86, y + 70, x + 100, y + 52);
                ctx.quadraticCurveTo(x + 136, y + 46, x + 142, y + 100); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#181818";                                     // so
                ctx.beginPath(); ctx.ellipse(hx + 18, hy, 46, 30, -0.12, 0, Math.PI*2); ctx.fill();
                ctx.beginPath();                                               // mom dai chia ve trai
                ctx.moveTo(hx - 12, hy - 12); ctx.quadraticCurveTo(hx - 76, hy - 8, hx - 96, hy + 12);
                ctx.quadraticCurveTo(hx - 60, hy + 30, hx - 6, hy + 22); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FFCCBC";                                     // rang
                for (let k = 0; k < 5; k++) { let tx = hx - 88 + k * 18;
                    ctx.beginPath(); ctx.moveTo(tx, hy + 16); ctx.lineTo(tx + 5, hy + 30); ctx.lineTo(tx + 10, hy + 15); ctx.closePath(); ctx.fill(); }
                ctx.fillStyle = "#0C0C0C";                                     // sung vuot ve sau
                for (let k = 0; k < 3; k++) { ctx.beginPath();
                    ctx.moveTo(hx + 16 + k*12, hy - 22);
                    ctx.quadraticCurveTo(hx + 60 + k*16, hy - 54 - k*8, hx + 96 + k*14, hy - 40 - k*10);
                    ctx.quadraticCurveTo(hx + 56 + k*14, hy - 34 - k*4, hx + 26 + k*12, hy - 16); ctx.closePath(); ctx.fill(); }
                ctx.fillStyle = "rgba(255,23,68," + eg.toFixed(2) + ")";       // mat do
                ctx.beginPath(); ctx.ellipse(hx - 16, hy - 6, 13, 8, -0.25, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(hx + 14, hy - 12, 13, 8, -0.25, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = "#FFF"; ctx.fillRect(hx - 20, hy - 9, 5, 6); ctx.fillRect(hx + 10, hy - 15, 5, 6);
                // ================= HAI CANH TAY: giang song song, moi tay MOT BO CHIEU =================
                //   TAY TRAI  (phia nguoi choi) : DAP LIEN HOAN + CAO      -> danh xuong / quet ngang
                //   TAY PHAI                    : NEM DA + MUA CAU         -> gio len troi
                let shYA = shY + 6;
                let armSpec = (side) => {
                    // goc goc: hai tay xoe ra hai ben, SONG SONG voi nhau
                    // Tip x = shx - sin(ang)*L  ->  muon XOE RA NGOAI thi tay trai can goc DUONG,
                    // tay phai can goc AM. (truoc day dat nguoc nen hai nam dam chum vao nhau)
                    let ang = -side * 0.26, len = 1, hot = false, aim = null;
                    if (side < 0) {                                  // ---- TAY TRAI ----
                        if (this.state === 'slam_prep') { ang = -side * (0.26 + 1.05 * this.armUp); hot = this.armUp > 0.4; }
                        else if (this.state === 'slam_fire') aim = { x: this.slamX, y: 296 };
                        else if (this.state === 'rake_prep') { ang = -side * (0.26 + 1.15 * this.armUp); hot = true; }
                        else if (this.state === 'rake_go') aim = { x: this.x - 150, y: 292 };
                    } else {                                         // ---- TAY PHAI ----
                        if (this.state === 'rocks_prep') { ang = -side * (0.26 + 1.5 * this.armUp); hot = this.armUp > 0.4; }
                        else if (this.state === 'rocks_fire' && this.subTimer > 120) aim = { x: cx + 150, y: y - 40 };
                        else if (this.state === 'orb_prep') { ang = -side * (0.26 + 1.5 * Math.min(1, (62 - this.subTimer) / 40)); hot = true; }
                        else if (this.state === 'orb_fire') aim = { x: cx + 190, y: y - 60 };
                    }
                    return { ang, len, hot, aim };
                };
                for (let side of [1, -1]) {                          // ve tay PHAI truoc (o xa hon), tay TRAI de len tren
                    let sp = armSpec(side);
                    let shx = side < 0 ? x + 44 : x + 192, shy = shYA;
                    let ang = sp.ang, len = sp.len, hot = sp.hot;
                    if (sp.aim) {
                        let dx2 = sp.aim.x - shx, dy2 = sp.aim.y - shy, d2 = Math.hypot(dx2, dy2);
                        ang = Math.atan2(dy2, dx2) - Math.PI / 2;
                        len = Math.max(0.85, Math.min(2.4, d2 / 176));
                        hot = true;
                    }
                    // --- than tay ---
                    let mir = side < 0 ? 1 : -1;   // hinh tay ve KHONG doi xung -> tay phai phai lat lai
                    ctx.save(); ctx.translate(shx, shy); ctx.rotate(ang); ctx.scale(mir, len);
                    ctx.fillStyle = "#141414";
                    ctx.beginPath(); ctx.moveTo(-24, 0);
                    ctx.quadraticCurveTo(-46, 84, -22, 156); ctx.quadraticCurveTo(14, 148, 24, 0); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#2A2A2A"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(-14, 24); ctx.quadraticCurveTo(2, 46, -10, 72); ctx.stroke();
                    ctx.strokeStyle = "#000"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(-24, 0); ctx.quadraticCurveTo(-46, 84, -22, 156); ctx.stroke();
                    ctx.restore();
                    // --- nam dam: dat o MUT tay, khong bi keo dan theo scale ---
                    let _L = 162 * len;
                    let fx2 = shx - Math.sin(ang) * _L, fy2 = shy + Math.cos(ang) * _L;
                    ctx.save(); ctx.translate(fx2, fy2); ctx.rotate(ang); ctx.scale(mir, 1);
                    ctx.fillStyle = hot ? "#FF5252" : "#1A1A1A";
                    ctx.beginPath(); ctx.ellipse(0, 0, 34, 25, 0, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#000"; ctx.lineWidth = 3; ctx.stroke();
                    ctx.strokeStyle = "#FFCCBC"; ctx.lineWidth = 4;
                    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-24 + k*16, 14); ctx.lineTo(-32 + k*18, 44); ctx.stroke(); }
                    ctx.restore();
                }
                // --- VET CHAM khi nam dam trai giang xuong san ---
                if (this.state === 'slam_fire') {
                    let t2 = 1 - this.subTimer / 20;
                    ctx.save();
                    ctx.strokeStyle = "rgba(255,87,34," + (1 - t2).toFixed(2) + ")"; ctx.lineWidth = 7 - 4 * t2;
                    ctx.beginPath(); ctx.ellipse(this.slamX, 308, 40 + t2 * 130, 12 + t2 * 30, 0, 0, Math.PI*2); ctx.stroke();
                    ctx.strokeStyle = "rgba(255,235,59," + (0.8 - t2).toFixed(2) + ")"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.ellipse(this.slamX, 308, 20 + t2 * 70, 7 + t2 * 16, 0, 0, Math.PI*2); ctx.stroke();
                    ctx.strokeStyle = "rgba(255,87,34," + (0.9 - t2).toFixed(2) + ")"; ctx.lineWidth = 3;
                    for (let k = 0; k < 5; k++) {
                        let dxk = (k - 2) * 34 * (0.5 + t2);
                        ctx.beginPath(); ctx.moveTo(this.slamX, 316); ctx.lineTo(this.slamX + dxk, 316 - 10 - Math.abs(k - 2) * 4); ctx.stroke();
                    }
                    ctx.restore();
                }
                // vien than
                ctx.strokeStyle = "#000"; ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(x + 46, shY + 8);
                ctx.quadraticCurveTo(x + 70, y + 96, x + 118, y + 96);
                ctx.quadraticCurveTo(x + 166, y + 96, x + 190, shY + 8);
                ctx.quadraticCurveTo(x + 206, y + 186, x + 178, y + 258);
                ctx.quadraticCurveTo(x + 118, y + 276, x + 58, y + 258);
                ctx.quadraticCurveTo(x + 30, y + 186, x + 46, shY + 8); ctx.stroke();
                // (dai dung nham do map tu ve, boss khong ve them)
                // thanh mau tren dinh man
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 200, 12, 400, 14);
                ctx.fillStyle = "#FF1744"; ctx.fillRect(canvas.width/2 - 199, 13, 398 * Math.max(0, this.hp / this.maxHp), 12);
                ctx.fillStyle = "white"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + "  " + Math.max(0, Math.ceil(this.hp)) + "/" + this.maxHp, canvas.width/2, 36); ctx.textAlign = "left"; ctx.restore();
            }
}
// BOSS_PART_END s0.DragonLordBoss.1

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
