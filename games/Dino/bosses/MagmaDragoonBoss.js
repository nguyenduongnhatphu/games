// BOSS_FILE: MagmaDragoonBoss
// BOSS_SNAPSHOT: 9124d003c3ce72e4e4fcae863db4e13cdfe06607527a4558945ab0774010859b
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, frames, parry, shakeTimer, visualEffects
// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24480 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GiantSpiderBoss, GreatSerpentBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MosaBoss, MountainGodBoss, PoisonMothBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, VoltCloneBoss
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

// Nguồn: index.html:37509 · Dùng bởi: MagmaDragoonBoss
// BOSS_PART_BEGIN s1.MagmaDragoonBoss.1 EDITABLE
class MagmaDragoonBoss {
            constructor(level){
                this.name = "MAGMA DRAGOON"; this.hp = 140; this.maxHp = 140;
                this.w = 62; this.h = 84; this.baseY = 320 - this.h;
                this.x = canvas.width - 230; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.step = 0; this.facingLeft = true;
                this.lastSkill = ''; this.atkBag = []; this.invulnAll = false; this.burnTimer = 0; this.rage = false;
                this.knee = null; this.waves = []; this.drops = []; this.breathT = 0; this.lastMeleeHit = -1;
                this.retState = 'idle'; this.actionTimer = 36;
            }
            physics(){ this.dy += 0.85; this.y += this.dy;
                if (this.y >= this.baseY) { this.y = this.baseY; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x)); }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = t; }
            pickAttack(){
                if (!this.atkBag || !this.atkBag.length){
                    this.atkBag = ['fireball','knee','shoryu','quake','ceiling','breath'];
                    for (let i = this.atkBag.length - 1; i > 0; i--){ let j = Math.floor(Math.random()*(i+1)); let t = this.atkBag[i]; this.atkBag[i] = this.atkBag[j]; this.atkBag[j] = t; }
                    if (this.atkBag[0] === this.lastSkill && this.atkBag.length > 1){ let t = this.atkBag[0]; this.atkBag[0] = this.atkBag[1]; this.atkBag[1] = t; }
                }
                let c = this.atkBag.shift(); this.lastSkill = c; this.step = 0; this.subTimer = 0;
                if (c === 'fireball') this.state = 'fire_prep';
                else if (c === 'knee') { this.state = 'knee_warn'; this.kneePass = 0; }
                else if (c === 'shoryu') this.state = 'sho_prep';
                else if (c === 'quake') this.state = 'quake_prep';
                else if (c === 'ceiling') this.state = 'ceil_up';
                else this.state = 'breath_prep';
            }
            update(){
                if (this.burnTimer > 0){ this.burnTimer--; if (this.burnTimer % 60 === 0) this.hp -= 1; }
                this.rage = this.hp <= this.maxHp * 0.35;
                // CHONG DO: parry/hieu ung ngoai co the ep sang state la ('returning'...) -> tra ve idle
                const MD_STATES = ['entering','idle','fire_prep','fire_go','knee_warn','knee_go','sho_prep','sho_read','sho_punch','sho_upper','quake_prep','quake_hit','ceil_up','ceil_hang','ceil_down','breath_prep','breath_go'];
                if (MD_STATES.indexOf(this.state) < 0){ this.knee = null; this.y = this.baseY; this.dy = 0; this.toIdle(30); }
                if (this.state === 'idle' && !(this.actionTimer >= 0)) this.actionTimer = 30;
                this.subTimer++;
                // ---- song lua chay tren san ----
                for (let i = this.waves.length - 1; i >= 0; i--){ let w = this.waves[i]; w.x += w.dir * 12.5;   // NHANH hon
                    // song CAO hon: phai nhay du cao moi thoat (khong chi can roi khoi mat dat)
                    if (!w.hit && Math.abs((dino.x + dino.w/2) - w.x) < 40 && (dino.y + dino.h) > 236){ this.hurtP(1); w.hit = true; }
                    if (w.x < -60 || w.x > canvas.width + 60) this.waves.splice(i, 1); }
                // ---- da lua roi tu tran ----
                for (let i = this.drops.length - 1; i >= 0; i--){ let d = this.drops[i]; d.t++;
                    if (d.t > 30){ d.y += 8.4;
                        if (!d.hit && checkAABB(dino, { x: d.x - 16, y: d.y - 16, w: 32, h: 32 })){ this.hurtP(1); d.hit = true; this.drops.splice(i, 1); continue; }
                        if (d.y > 320){ visualEffects.push(new Effect(d.x, 314, 'explosion', true, 22)); this.drops.splice(i, 1); } } }

                if (this.state === 'entering'){ this.physics(); this.faceP(); if (this.subTimer > 40) this.toIdle(36); return; }
                if (this.state === 'idle'){
                    this.physics(); this.faceP();
                    let d = (dino.x + dino.w/2) - this.cx();
                    if (Math.abs(d) > 240) this.x += Math.sign(d) * 2.4;
                    else if (Math.abs(d) < 90) this.x -= Math.sign(d) * 1.8;
                    this.actionTimer--; if (this.actionTimer <= 0) this.pickAttack();
                    return;
                }
                // ===== CAU LUA (Hadouken) =====
                if (this.state === 'fire_prep'){ this.physics(); this.faceP();
                    if (this.subTimer > (this.rage ? 26 : 38)){ this.state = 'fire_go'; this.subTimer = 0; this.step = 0; } return; }
                if (this.state === 'fire_go'){ this.physics();
                    let n = this.rage ? 2 : 1;                       // thuong 1 qua, cuong no 2 qua
                    if (this.subTimer % 18 === 1 && this.step < n){ this.step++;
                        let sd = this.facingLeft ? -1 : 1, mx = this.facingLeft ? this.x - 30 : this.x + this.w + 4;
                        let bp = new BossProjectile(mx, this.y + 16, sd * 12.5, 0, false, 1);   // TO hon + NHANH hon
                        bp.w = 34; bp.h = 34; bp.fire = true; bp.color = "#FF6D00"; bossProjectiles.push(bp);
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.subTimer > n * 18 + 20) this.toIdle(this.rage ? 26 : 44);
                    return; }
                // ===== HUC DAU GOI: NGOI XUONG la thoat, dung yen thi an don =====
                if (this.state === 'knee_warn'){ this.physics(); this.faceP();
                    if (this.subTimer > (this.rage ? 30 : 44)){
                        this.state = 'knee_go'; this.subTimer = 0;
                        this.knee = { dir: (dino.x + dino.w/2) < this.cx() ? -1 : 1, hit: false };
                        this.facingLeft = this.knee.dir < 0; if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'knee_go'){
                    this.y = this.baseY - 8; this.dy = 0; this.grounded = false;
                    this.x += this.knee.dir * (this.rage ? 20 : 17);
                    // HITBOX o TAM DUNG. NGOI = mien hoan toan (moi dang deu dung, ke ca dang to 1.35x); nhay cung thoat
                    let box = { x: this.x, y: 248, w: this.w, h: 48 };
                    if (!this.knee.hit && !dino.isCrouching && checkAABB(dino, box)){ this.hurtP(1); this.knee.hit = true; }
                    if (this.x < -this.w - 30 || this.x > canvas.width + 30){
                        this.kneePass++;
                        if (this.kneePass >= (this.rage ? 3 : 2)){ this.knee = null; this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x)); this.y = this.baseY; this.toIdle(40); }
                        else { this.x = this.knee.dir > 0 ? canvas.width + 20 : -this.w - 20; this.knee.dir = -this.knee.dir; this.knee.hit = false; this.facingLeft = this.knee.dir < 0; }   // vao lai DUNG BEN vua ra roi quet nguoc
                    }
                    return; }
                // ===== DON BAT BAI: LAO TOI KHOA VI TRI -> doc nguoi choi -> DAM XA hoac THANG LONG QUYEN =====
                if (this.state === 'sho_prep'){   // lao nhanh toi ap sat nguoi choi
                    this.physics(); this.faceP();
                    let d = (dino.x + dino.w/2) - this.cx();
                    if (Math.abs(d) > 132) this.x += Math.sign(d) * 13;
                    else { this.state = 'sho_read'; this.subTimer = 0; }
                    if (this.subTimer > 60){ this.state = 'sho_read'; this.subTimer = 0; }
                    return; }
                if (this.state === 'sho_read'){   // KHOA VI TRI, doc chuyen dong: nhay -> tri; o dat/lui/do -> dam xa
                    this.physics(); this.faceP();
                    if (this.subTimer > (this.rage ? 22 : 30)){
                        if (!dino.grounded){ this.state = 'sho_upper'; this.subTimer = 0; this.dy = -18.5; this.grounded = false; shakeTimer = 18; if (SFX.bossSkill) SFX.bossSkill(); }
                        else { this.state = 'sho_punch'; this.subTimer = 0; this.punchHit = false; if (SFX.bossSkill) SFX.bossSkill(); }
                    }
                    return; }
                if (this.state === 'sho_punch'){   // DAM THANG XA (tam gan bang luong lua)
                    this.physics();
                    let sd = this.facingLeft ? -1 : 1, reach = Math.min(250, this.subTimer * 22);
                    let box = { x: sd < 0 ? this.x - reach : this.x + this.w, y: this.y + 20, w: reach, h: 40 };
                    if (!this.punchHit && checkAABB(dino, box)){ this.hurtP(1); this.punchHit = true; }
                    if (this.subTimer > 36) this.toIdle(this.rage ? 28 : 44);
                    return; }
                if (this.state === 'sho_upper'){   // THANG LONG QUYEN tri viec nhay — VAN DO DUOC tren khong
                    this.physics(); this.x += (this.facingLeft ? -3.2 : 3.2);
                    let box = { x: this.x - 12, y: this.y - 30, w: this.w + 24, h: this.h + 34 };
                    if (checkAABB(dino, box)) this.hurtP(1);
                    if (this.grounded && this.subTimer > 20){ shakeTimer = 18; visualEffects.push(new Effect(this.cx(), 314, 'explosion', true, 26)); this.toIdle(this.rage ? 30 : 48); }
                    return; }
                // ===== DAM DAT -> 2 SONG LUA (nhay de thoat) =====
                if (this.state === 'quake_prep'){ this.physics(); this.faceP();
                    if (this.subTimer > (this.rage ? 30 : 42)){ this.state = 'quake_hit'; this.subTimer = 0;
                        shakeTimer = 26; if (SFX.bossSkill) SFX.bossSkill();
                        visualEffects.push(new Effect(this.cx(), 314, 'explosion', true, 34));
                        this.waves.push({ x: this.cx() - 20, dir: -1, hit: false }, { x: this.cx() + 20, dir: 1, hit: false }); }
                    return; }
                if (this.state === 'quake_hit'){ this.physics(); if (this.subTimer > 26) this.toIdle(this.rage ? 28 : 46); return; }
                // ===== BAM TRAN -> THA DA LUA =====
                if (this.state === 'ceil_up'){ this.y -= 11; this.dy = 0; this.grounded = false; this.faceP();
                    if (this.y <= 40){ this.y = 40; this.state = 'ceil_hang'; this.subTimer = 0; this.step = 0; } return; }
                if (this.state === 'ceil_hang'){
                    this.x += ((dino.x + dino.w/2 - this.w/2) - this.x) * 0.03;
                    let gap = this.rage ? 20 : 28;
                    if (this.subTimer % gap === 1 && this.step < (this.rage ? 6 : 4)){ this.step++;
                        this.drops.push({ x: Math.max(40, Math.min(canvas.width - 40, dino.x + dino.w/2 + (Math.random()*2-1)*120)), y: 62, t: 0, hit: false }); }
                    if (this.subTimer > (this.rage ? 150 : 170)){ this.state = 'ceil_down'; this.subTimer = 0; }
                    return; }
                if (this.state === 'ceil_down'){ this.physics();
                    if (this.grounded){ shakeTimer = 20; visualEffects.push(new Effect(this.cx(), 314, 'explosion', true, 26)); this.toIdle(this.rage ? 28 : 46); } return; }
                // ===== PHUN LUA =====
                if (this.state === 'breath_prep'){ this.physics(); this.faceP();
                    if (this.subTimer > 40){ this.state = 'breath_go'; this.subTimer = 0; if (SFX.bossSkill) SFX.bossSkill(); } return; }
                if (this.state === 'breath_go'){ this.physics();
                    let sd = this.facingLeft ? -1 : 1;
                    let len = Math.min(this.rage ? 560 : 460, this.subTimer * 34);   // NGON LUA VUON DAI ra kieu Mega Man
                    let box = { x: sd < 0 ? this.x - len : this.x + this.w, y: this.y + 14, w: len, h: 54 };
                    if (checkAABB(dino, box)){ if (frames % 18 === 0) this.hurtP(1); }
                    if (this.subTimer > (this.rage ? 110 : 92)) this.toIdle(this.rage ? 30 : 50);
                    return; }
            }
            drawBody(){
                let x = this.x, y = this.y, w = this.w, h = this.h;
                let crouch = (this.state === 'sho_read' || this.state === 'quake_prep') ? 10 : 0;
                let kneeUp = (this.state === 'knee_go');
                ctx.save();
                if (this.facingLeft){ ctx.translate(x + w/2, 0); ctx.scale(-1, 1); ctx.translate(-(x + w/2), 0); }
                const DK = "#7F1D0E", MD = "#C62828", LT = "#FF7043", HORN = "#FFCC80", BELT = "#37474F";
                // duoi
                ctx.fillStyle = DK; ctx.beginPath(); ctx.moveTo(x + 10, y + h*0.62 + crouch);
                ctx.quadraticCurveTo(x - 28, y + h*0.72 + crouch, x - 34, y + h*0.40); ctx.quadraticCurveTo(x - 14, y + h*0.76 + crouch, x + 14, y + h*0.74 + crouch); ctx.closePath(); ctx.fill();
                // chan
                ctx.fillStyle = MD;
                if (kneeUp){ ctx.fillRect(x + 10, y + h*0.60, 18, h*0.24); ctx.save(); ctx.translate(x + 40, y + h*0.62); ctx.rotate(-0.5); ctx.fillRect(-9, 0, 20, h*0.30); ctx.restore(); }
                else { ctx.fillRect(x + 10, y + h*0.62 + crouch, 17, h*0.38 - crouch); ctx.fillRect(x + 34, y + h*0.62 + crouch, 17, h*0.38 - crouch); }
                ctx.fillStyle = DK; ctx.fillRect(x + 6, y + h - 8, 26, 8); ctx.fillRect(x + 32, y + h - 8, 26, 8);
                // than + dai
                ctx.fillStyle = MD; ctx.fillRect(x + 8, y + h*0.30 + crouch, w - 14, h*0.34);
                ctx.fillStyle = LT; ctx.fillRect(x + 14, y + h*0.34 + crouch, w - 28, h*0.14);
                ctx.fillStyle = BELT; ctx.fillRect(x + 8, y + h*0.60 + crouch, w - 14, 7);
                // vai + tay
                ctx.fillStyle = DK; ctx.beginPath(); ctx.arc(x + 12, y + h*0.34 + crouch, 12, 0, 6.28); ctx.fill();
                ctx.beginPath(); ctx.arc(x + w - 8, y + h*0.34 + crouch, 12, 0, 6.28); ctx.fill();
                ctx.fillStyle = MD;
                if (this.state === 'sho_upper'){ ctx.save(); ctx.translate(x + w - 10, y + h*0.34); ctx.rotate(-1.15); ctx.fillRect(-8, -6, 16, 40); ctx.restore(); }
                else if (this.state === 'sho_punch'){ ctx.fillRect(x + w - 14, y + h*0.30 + crouch, 34, 14); }
                else if (this.state === 'fire_go' || this.state === 'fire_prep'){ ctx.fillRect(x + w - 14, y + h*0.36 + crouch, 26, 14); }
                else if (this.state === 'quake_prep' || this.state === 'quake_hit'){ ctx.fillRect(x + w - 16, y + h*0.44 + crouch, 18, 26); }
                else { ctx.fillRect(x + w - 14, y + h*0.36 + crouch, 15, 28); ctx.fillRect(x + 4, y + h*0.36 + crouch, 15, 28); }
                // dau rong + sung
                ctx.fillStyle = MD; ctx.fillRect(x + 16, y + 6 + crouch, w - 26, h*0.26);
                ctx.fillStyle = LT; ctx.fillRect(x + 22, y + 12 + crouch, w - 36, 8);
                ctx.fillStyle = HORN;
                ctx.beginPath(); ctx.moveTo(x + 20, y + 8 + crouch); ctx.lineTo(x + 6, y - 12 + crouch); ctx.lineTo(x + 26, y + 4 + crouch); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(x + w - 16, y + 8 + crouch); ctx.lineTo(x + w - 2, y - 12 + crouch); ctx.lineTo(x + w - 22, y + 4 + crouch); ctx.closePath(); ctx.fill();
                // mom
                ctx.fillStyle = DK; ctx.fillRect(x + w - 20, y + h*0.16 + crouch, 20, 12);
                ctx.fillStyle = "#FFF3E0"; for (let i = 0; i < 3; i++){ ctx.beginPath(); ctx.moveTo(x + w - 18 + i*6, y + h*0.16 + 12 + crouch); ctx.lineTo(x + w - 15 + i*6, y + h*0.16 + 18 + crouch); ctx.lineTo(x + w - 12 + i*6, y + h*0.16 + 12 + crouch); ctx.closePath(); ctx.fill(); }
                // mat sang
                ctx.fillStyle = "#FFEB3B"; ctx.shadowBlur = 8; ctx.shadowColor = "#FF9100";
                ctx.beginPath(); ctx.ellipse(x + w - 24, y + h*0.13 + crouch, 6, 4.5, 0, 0, 6.28); ctx.fill(); ctx.shadowBlur = 0;
                ctx.restore();
            }
            draw(){
                // song lua
                for (let w of this.waves){
                    ctx.fillStyle = "rgba(255,87,34,0.7)"; ctx.beginPath(); ctx.moveTo(w.x - 38, 320);
                    ctx.quadraticCurveTo(w.x, 320 - 92 - Math.sin(frames*0.4)*8, w.x + 38, 320); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "rgba(255,152,0,0.8)"; ctx.beginPath(); ctx.moveTo(w.x - 24, 320);
                    ctx.quadraticCurveTo(w.x, 320 - 64, w.x + 24, 320); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "rgba(255,235,59,0.9)"; ctx.beginPath(); ctx.moveTo(w.x - 12, 320);
                    ctx.quadraticCurveTo(w.x, 320 - 36, w.x + 12, 320); ctx.closePath(); ctx.fill();
                }
                // da lua tu tran
                for (let d of this.drops){
                    if (d.t <= 30){ let a = (0.25 + 0.4*Math.abs(Math.sin(frames*0.4))).toFixed(2);
                        ctx.fillStyle = "rgba(255,64,64," + a + ")"; ctx.fillRect(d.x - 18, 34, 36, 286);
                        ctx.strokeStyle = "rgba(255,193,7,0.9)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(d.x, 312, 22, 7, 0, 0, 6.28); ctx.stroke(); }
                    else { ctx.fillStyle = "#FF6D00"; ctx.beginPath(); ctx.arc(d.x, d.y, 15, 0, 6.28); ctx.fill();
                        ctx.fillStyle = "#FFC107"; ctx.beginPath(); ctx.arc(d.x, d.y, 9, 0, 6.28); ctx.fill();
                        ctx.fillStyle = "rgba(255,193,7,0.5)"; ctx.beginPath(); ctx.arc(d.x, d.y - 16, 7, 0, 6.28); ctx.fill(); }
                }
                // CANH BAO huc dau goi: dai o TAM DUNG + nhac NGOI XUONG
                if (this.state === 'knee_warn'){
                    let a = (0.2 + 0.3*Math.abs(Math.sin(frames*0.4))).toFixed(2);
                    ctx.fillStyle = "rgba(255,64,64," + a + ")"; ctx.fillRect(0, 262, canvas.width, 31);
                    ctx.strokeStyle = "rgba(255,120,120,0.9)"; ctx.lineWidth = 2; ctx.strokeRect(1, 263, canvas.width - 2, 29);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("HÚC ĐẦU GỐI — NGỒI XUỐNG (S)!", canvas.width/2, 252); ctx.textAlign = "left";
                }
                if (this.state === 'knee_go'){
                    ctx.fillStyle = "rgba(255,109,0,0.45)";
                    ctx.fillRect(this.x - this.knee.dir * 60, 262, 60, 31);
                    ctx.fillStyle = "rgba(255,235,59,0.55)";
                    for (let k = 0; k < 4; k++){ ctx.fillRect(this.x - this.knee.dir * (24 + k*22), 268 + (k%2)*8, 16, 6); }
                }
                // CANH BAO dam dat
                if (this.state === 'quake_prep'){
                    ctx.fillStyle = "rgba(255,87,34," + (0.15 + 0.25*Math.abs(Math.sin(frames*0.4))).toFixed(2) + ")";
                    ctx.fillRect(0, 294, canvas.width, 26);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("SÓNG LỬA MẶT ĐẤT — NHẢY!", canvas.width/2, 288); ctx.textAlign = "left";
                }
                // DON BAT BAI: lao toi -> khoa vi tri -> DAM XA hoac THANG LONG QUYEN
                if (this.state === 'sho_prep'){
                    ctx.strokeStyle = "rgba(255,193,7,0.7)"; ctx.lineWidth = 3; ctx.setLineDash([8, 6]);
                    ctx.beginPath(); ctx.moveTo(this.cx(), this.cy()); ctx.lineTo(dino.x + dino.w/2, dino.y + dino.h/2); ctx.stroke(); ctx.setLineDash([]);
                }
                if (this.state === 'sho_read'){
                    ctx.strokeStyle = (frames % 10 < 5) ? "#FF1744" : "#FFEB3B"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 34 + this.subTimer * 0.6, 0, 6.28); ctx.stroke();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("ĐANG ĐỌC BÀI — NHẢY LÀ ĂN THĂNG LONG!", canvas.width/2, 250); ctx.textAlign = "left";
                }
                if (this.state === 'sho_punch'){
                    let sd2 = this.facingLeft ? -1 : 1, reach = Math.min(250, this.subTimer * 22);
                    let px = sd2 < 0 ? this.x - reach : this.x + this.w;
                    ctx.fillStyle = "rgba(255,109,0,0.55)"; ctx.fillRect(px, this.y + 20, reach, 40);
                    ctx.fillStyle = "rgba(255,235,59,0.85)"; ctx.fillRect(px, this.y + 30, reach, 18);
                    ctx.fillStyle = "#FFCC80"; ctx.fillRect(sd2 < 0 ? px : px + reach - 26, this.y + 18, 26, 44);
                }
                if (this.state === 'sho_upper'){
                    ctx.fillStyle = "rgba(255,109,0,0.6)";
                    for (let k = 0; k < 6; k++){ ctx.beginPath(); ctx.arc(this.cx() + (Math.random()-0.5)*24, this.y + this.h + 10 + k*16, 16 - k*2, 0, 6.28); ctx.fill(); }
                    ctx.fillStyle = "rgba(255,235,59,0.8)"; ctx.beginPath(); ctx.arc(this.cx() + (this.facingLeft ? -18 : 18), this.y - 6, 16, 0, 6.28); ctx.fill();
                }
                // PHUN LUA
                if (this.state === 'breath_prep'){
                    // CANH BAO NHAP NHAY DO 0.5 giay cuoi truoc khi phun
                    if (this.subTimer > 10){
                        let sd3 = this.facingLeft ? -1 : 1, mx3 = this.facingLeft ? this.x : this.x + this.w;
                        let plen = this.rage ? 560 : 460;
                        let on = (frames % 8 < 4);
                        ctx.fillStyle = on ? "rgba(255,23,68,0.42)" : "rgba(255,23,68,0.14)";
                        ctx.fillRect(sd3 < 0 ? mx3 - plen : mx3, this.y + 14, plen, 54);
                        ctx.strokeStyle = on ? "#FF1744" : "rgba(255,23,68,0.45)"; ctx.lineWidth = 3;
                        ctx.strokeRect(sd3 < 0 ? mx3 - plen : mx3, this.y + 14, plen, 54);
                        ctx.fillStyle = on ? "#FFEB3B" : "#FF8A80"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("CHƯỞNG LỬA!", mx3 + sd3 * (plen/2), this.y + 6); ctx.textAlign = "left";
                    }
                    ctx.fillStyle = "rgba(255,193,7,0.6)"; ctx.beginPath();
                    ctx.arc(this.facingLeft ? this.x - 4 : this.x + this.w + 4, this.y + 24, 6 + (this.subTimer%20)*0.4, 0, 6.28); ctx.fill();
                }
                if (this.state === 'breath_go'){
                    let sd = this.facingLeft ? -1 : 1, mx = this.facingLeft ? this.x : this.x + this.w;
                    let len = Math.min(this.rage ? 560 : 460, this.subTimer * 34);
                    ctx.fillStyle = "rgba(255,87,34,0.55)"; ctx.fillRect(sd < 0 ? mx - len : mx, this.y + 14, len, 54);
                    ctx.fillStyle = "rgba(255,152,0,0.72)"; ctx.fillRect(sd < 0 ? mx - len : mx, this.y + 22, len, 38);
                    ctx.fillStyle = "rgba(255,235,59,0.85)"; ctx.fillRect(sd < 0 ? mx - len : mx, this.y + 32, len, 18);
                    ctx.fillStyle = "rgba(255,245,157,0.9)";
                    for (let k = 0; k < 14; k++){ let fx = mx + sd * (18 + k*34 + (frames*6)%34);
                        if (Math.abs(fx - mx) > len) continue;
                        ctx.beginPath(); ctx.arc(fx, this.y + 41 + Math.sin(frames*0.4 + k)*9, 11 - k*0.4, 0, 6.28); ctx.fill(); }
                }
                this.drawBody();
                // HP bar
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 160, 6, 320, 12);
                ctx.fillStyle = this.rage ? "#FF1744" : "#FF6D00"; ctx.fillRect(canvas.width/2 - 158, 8, 316 * Math.max(0, this.hp/this.maxHp), 8);
                ctx.fillStyle = "white"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + (this.rage ? "  🔥 CUỒNG NỘ" : ""), canvas.width/2, 32); ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s1.MagmaDragoonBoss.1

// Nguồn: index.html:98795 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:98806 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
