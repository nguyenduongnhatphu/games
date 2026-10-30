// BOSS_FILE: IaiRaptorBoss
// BOSS_SNAPSHOT: 90b44e51b8a8c0ad12fba495a59e199c399e173aab86fbee147786ba09666942
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, CAM_TROI, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, projectiles, shakeTimer, visualEffects
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

// Nguồn: index.html:39432 · Dùng bởi: IaiRaptorBoss
// BOSS_PART_BEGIN s1.IaiRaptorBoss.1 EDITABLE
class IaiRaptorBoss {
            constructor(level){
                this.name = "IAI RAPTOR"; this.hp = 112; this.maxHp = 112;   // than nho (56x80) -> khong nen trau
                this.w = 56; this.h = 80; this.baseY = 320 - this.h;
                this.x = canvas.width - 230; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.step = 0; this.facingLeft = true;
                this.lastSkill = ''; this.atkBag = []; this.invulnAll = false; this.burnTimer = 0; this.rage = false;
                this.retState = 'idle'; this.actionTimer = 40; this.lastMeleeHit = -1;
                this.iai = null; this.waveHi = null; this.waveLo = null; this.clones = []; this.counterFlash = 0;
            }
            physics(){ this.dy += 0.85; this.y += this.dy;
                if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x)); }
            clashTargets(){   // KIEM KHI: to vua -> 3 mau
                let self = this, out = [];
                if (this.waveHi) out.push({ o: this.waveHi, hp: 3, pierce: false,
                    box: { x: this.waveHi.x - 16, y: 250, w: 32, h: 38 },
                    kill: function(){ self.waveHi = null; } });
                if (this.waveLo) out.push({ o: this.waveLo, hp: 3, pierce: false,
                    box: { x: this.waveLo.x - 16, y: 294, w: 32, h: 26 },
                    kill: function(){ self.waveLo = null; } });
                return out;
            }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = t; }
            pickAttack(){
                if (!this.atkBag || !this.atkBag.length){
                    this.atkBag = ['iai','cross','stance','mirage','chain','cross','chain'];
                    for (let i = this.atkBag.length-1; i>0; i--){ let j = Math.floor(Math.random()*(i+1)); let t = this.atkBag[i]; this.atkBag[i]=this.atkBag[j]; this.atkBag[j]=t; }
                    if (this.atkBag[0] === this.lastSkill && this.atkBag.length > 1){ let t=this.atkBag[0]; this.atkBag[0]=this.atkBag[1]; this.atkBag[1]=t; }
                }
                let c = this.atkBag.shift(); this.lastSkill = c; this.step = 0; this.subTimer = 0;
                if (c === 'iai') { this.state = 'iai_warn'; this.iaiPass = 0; }
                else if (c === 'cross') this.state = 'cross_warn';
                else if (c === 'stance') this.state = 'stance';
                else if (c === 'chain') { this.state = 'chain_warn'; this.chainN = 0; }
                else this.state = 'mirage_warn';
            }
            update(){
                if (this.burnTimer > 0){ this.burnTimer--; if (this.burnTimer % 60 === 0) this.hp -= 1; }
                this.rage = this.hp <= this.maxHp * 0.35;
                const IR = ['entering','idle','iai_warn','iai_go','cross_warn','cross_go','stance','stance_punish','mirage_warn','mirage_go','chain_warn','chain_go','chain_pause','chain_rise'];
                if (IR.indexOf(this.state) < 0){ this.iai = null; this.clones = []; this.y = this.baseY; this.dy = 0; this.toIdle(30); }
                if (this.state === 'idle' && !(this.actionTimer >= 0)) this.actionTimer = 30;
                if (this.counterFlash > 0) this.counterFlash--;
                this.subTimer++;
                // ---- 2 luong kiem khi (cao: NGOI | thap: NHAY) ----
                if (this.waveHi){ let w = this.waveHi; w.x += w.dir * 10.5;
                    if (!w.hit && !dino.isCrouching && Math.abs((dino.x + dino.w/2) - w.x) < 34 && (dino.y + dino.h) > 250){ this.hurtP(1); w.hit = true; }
                    if (w.x < -60 || w.x > canvas.width + 60) this.waveHi = null; }
                if (this.waveLo){ let w = this.waveLo; w.x += w.dir * 10.5;
                    if (!w.hit && Math.abs((dino.x + dino.w/2) - w.x) < 34 && (dino.y + dino.h) > 292){ this.hurtP(1); w.hit = true; }
                    if (w.x < -60 || w.x > canvas.width + 60) this.waveLo = null; }

                if (this.state === 'entering'){ this.physics(); this.faceP(); if (this.subTimer > 40) this.toIdle(36); return; }
                if (this.state === 'idle'){ this.physics(); this.faceP();
                    let d = (dino.x + dino.w/2) - this.cx();
                    if (Math.abs(d) > 250) this.x += Math.sign(d) * 2.6; else if (Math.abs(d) < 100) this.x -= Math.sign(d) * 2.0;
                    this.actionTimer--; if (this.actionTimer <= 0) this.pickAttack(); return; }
                // ===== IAI: rut kiem lao xuyen — DO duoc (parry an dmg lon) hoac LUOT xuyen =====
                if (this.state === 'iai_warn'){ this.physics(); this.faceP();
                    if (this.subTimer > (this.rage ? 30 : 46)){
                        this.state = 'iai_go'; this.subTimer = 0;
                        this.iai = { dir: (dino.x + dino.w/2) < this.cx() ? -1 : 1, hit: false };
                        this.facingLeft = this.iai.dir < 0; if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'iai_go'){
                    this.y = this.baseY; this.dy = 0;
                    this.x += this.iai.dir * (this.rage ? 26 : 22);
                    if (!this.iai.hit && checkAABB(dino, { x: this.x, y: this.y + 8, w: this.w, h: this.h - 12 })){ this.hurtP(1); this.iai.hit = true; }
                    if (this.x < -this.w - 30 || this.x > canvas.width + 30){
                        this.iaiPass++;
                        if (this.iaiPass >= (this.rage ? 2 : 1)){ this.iai = null; this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x)); this.toIdle(40); }
                        else { this.x = this.iai.dir > 0 ? canvas.width + 20 : -this.w - 20; this.iai.dir = -this.iai.dir; this.iai.hit = false; this.facingLeft = this.iai.dir < 0; }   // vao lai DUNG BEN vua ra roi quet nguoc
                    }
                    return; }
                // ===== CHEM CHU THAP: luong CAO (ngoi) roi luong THAP (nhay) =====
                if (this.state === 'cross_warn'){ this.physics(); this.faceP();
                    if (this.subTimer > 44){ this.state = 'cross_go'; this.subTimer = 0; this.step = 0; if (SFX.bossSkill) SFX.bossSkill(); } return; }
                if (this.state === 'cross_go'){ this.physics();
                    let sd = this.facingLeft ? -1 : 1;
                    if (this.subTimer === 1){ this.waveHi = { x: this.cx(), dir: sd, hit: false }; }
                    if (this.subTimer === (this.rage ? 26 : 38)){ this.waveLo = { x: this.cx(), dir: sd, hit: false }; }
                    if (this.subTimer > 70) this.toIdle(this.rage ? 30 : 48);
                    return; }
                // ===== THE PHAN DON: DUNG BAN! ban vao la bi phan don =====
                if (this.state === 'stance'){ this.physics(); this.faceP();
                    for (let i = projectiles.length - 1; i >= 0; i--){
                        let p = projectiles[i];
                        if (checkAABB(p, this)){
                            projectiles.splice(i, 1);
                            this.counterFlash = 14; shakeTimer = 18;
                            visualEffects.push(new Effect(this.cx(), this.cy(), 'parry'));
                            floatingTexts.push(new FloatingText(this.x, this.y - 24, "PHAN DON!"));
                            this.state = 'stance_punish'; this.subTimer = 0;
                            this.iai = { dir: (dino.x + dino.w/2) < this.cx() ? -1 : 1, hit: false };
                            this.facingLeft = this.iai.dir < 0;
                            break;
                        }
                    }
                    if (this.subTimer > (this.rage ? 100 : 120)) this.toIdle(30);
                    return; }
                if (this.state === 'stance_punish'){   // lao toi trung phat (van DO duoc)
                    this.y = this.baseY; this.dy = 0;
                    this.x += this.iai.dir * 24;
                    if (!this.iai.hit && checkAABB(dino, { x: this.x, y: this.y + 8, w: this.w, h: this.h - 12 })){ this.hurtP(1); this.iai.hit = true; }
                    if (this.subTimer > 34 || this.x < -this.w - 20 || this.x > canvas.width + 20){
                        this.iai = null; this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x)); this.toIdle(44); }
                    return; }
                // ===== TAM LIEN TRAM: 3 nhat lien tiep theo nhip; nhat CUOI la doc bai (nhay = an chem dung) =====
                if (this.state === 'chain_warn'){ this.physics(); this.faceP();
                    if (this.subTimer > 40){ this.state = 'chain_go'; this.subTimer = 0;
                        this.iai = { dir: (dino.x + dino.w/2) < this.cx() ? -1 : 1, hit: false }; this.facingLeft = this.iai.dir < 0;
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'chain_go'){
                    this.y = this.baseY; this.dy = 0;
                    this.x += this.iai.dir * (this.rage ? 25 : 21);
                    if (!this.iai.hit && checkAABB(dino, { x: this.x, y: this.y + 8, w: this.w, h: this.h - 12 })){ this.hurtP(1); this.iai.hit = true; }
                    if (this.x < -this.w - 26 || this.x > canvas.width + 26){
                        this.chainN++;
                        if (this.chainN >= 3){ this.iai = null; this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x)); this.toIdle(46); }
                        else { this.state = 'chain_pause'; this.subTimer = 0; }
                    }
                    return; }
                if (this.state === 'chain_pause'){
                    if (this.subTimer > (this.rage ? 12 : 18)){
                        let sd = (dino.x + dino.w/2) < canvas.width/2 ? 1 : -1;   // vao lai tu phia doi dien nguoi choi
                        this.x = sd > 0 ? -this.w - 16 : canvas.width + 16;
                        this.y = this.baseY; this.facingLeft = sd < 0;
                        if (this.chainN === 2 && !dino.grounded){   // NHAT CUOI: doc bai — dang nhay thi chem dung
                            this.state = 'chain_rise'; this.subTimer = 0; this.x = Math.max(20, Math.min(canvas.width - this.w - 20, dino.x + dino.w/2 - this.w/2));
                            this.dy = -18; this.grounded = false; shakeTimer = 16;
                        } else { this.state = 'chain_go'; this.subTimer = 0; this.iai = { dir: sd, hit: false }; }
                    }
                    return; }
                if (this.state === 'chain_rise'){   // chem dung tri viec nhay — van DO duoc
                    this.physics();
                    let box = { x: this.x - 10, y: this.y - 28, w: this.w + 20, h: this.h + 32 };
                    if (checkAABB(dino, box)) this.hurtP(1);
                    if (this.grounded && this.subTimer > 20){ this.iai = null; shakeTimer = 16; this.toIdle(48); }
                    return; }
                // ===== PHAN THAN: 3 bong lao toi, chi bong SANG la that =====
                if (this.state === 'mirage_warn'){ this.physics(); this.faceP();
                    if (this.subTimer === 1){
                        let sd = (dino.x + dino.w/2) < this.cx() ? -1 : 1;
                        let ys = [this.baseY - 74, this.baseY - 34, this.baseY];
                        let realIdx = Math.floor(Math.random() * 3);
                        this.clones = ys.map((yy, i) => ({ x: sd < 0 ? canvas.width + 40 + i*26 : -this.w - 40 - i*26, y: yy, dir: sd, real: i === realIdx, hit: false }));
                    }
                    if (this.subTimer > 50){ this.state = 'mirage_go'; this.subTimer = 0; if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'mirage_go'){
                    let done = true;
                    for (let c of this.clones){
                        c.x += c.dir * (this.rage ? 21 : 17);
                        if (c.x > -120 && c.x < canvas.width + 120) done = false;
                        if (c.real && !c.hit && checkAABB(dino, { x: c.x, y: c.y + 8, w: this.w, h: this.h - 12 })){ this.hurtP(1); c.hit = true; }
                    }
                    if (done || this.subTimer > 130){ this.clones = []; this.toIdle(this.rage ? 32 : 50); }
                    return; }
            }
            drawBody(x, y, ghost){
                let w = this.w, h = this.h;
                ctx.save();
                if (ghost) ctx.globalAlpha = 0.42;
                if (this.facingLeft){ ctx.translate(x + w/2, 0); ctx.scale(-1, 1); ctx.translate(-(x + w/2), 0); }
                const DK = "#1f3d33", MD = "#2f6b52", LT = "#4f9c74", BLADE = "#E8F5E9", TRIM = "#FFD54F";
                ctx.fillStyle = DK; ctx.beginPath(); ctx.moveTo(x + 8, y + h*0.52);
                ctx.quadraticCurveTo(x - 26, y + h*0.44, x - 36, y + h*0.16); ctx.quadraticCurveTo(x - 12, y + h*0.62, x + 12, y + h*0.66); ctx.closePath(); ctx.fill();
                ctx.fillStyle = MD; ctx.fillRect(x + 12, y + h*0.60, 15, h*0.40); ctx.fillRect(x + 32, y + h*0.60, 15, h*0.40);
                ctx.fillStyle = DK; ctx.fillRect(x + 8, y + h - 7, 24, 7); ctx.fillRect(x + 30, y + h - 7, 24, 7);
                ctx.fillStyle = MD; ctx.fillRect(x + 10, y + h*0.28, w - 16, h*0.34);
                ctx.fillStyle = LT; ctx.fillRect(x + 16, y + h*0.32, w - 28, h*0.12);
                ctx.fillStyle = TRIM; ctx.fillRect(x + 10, y + h*0.56, w - 16, 5);
                ctx.fillStyle = MD; ctx.fillRect(x + 14, y + 4, w - 24, h*0.24);
                ctx.fillStyle = DK; ctx.beginPath(); ctx.moveTo(x + 18, y + 6); ctx.lineTo(x + 4, y - 14); ctx.lineTo(x + 30, y + 2); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FFEB3B"; ctx.beginPath(); ctx.ellipse(x + w - 20, y + h*0.13, 5.5, 4, 0, 0, 6.28); ctx.fill();
                ctx.fillStyle = DK; ctx.fillRect(x + w - 20, y + h*0.20, 18, 8);
                // KIEM
                let drawn = (this.state === 'iai_go' || this.state === 'stance_punish' || this.state === 'mirage_go' || this.state === 'cross_go');
                ctx.fillStyle = BLADE;
                if (drawn){ ctx.fillRect(x + w - 6, y + h*0.30, 62, 5); ctx.fillStyle = TRIM; ctx.fillRect(x + w - 12, y + h*0.28, 12, 9); }
                else { ctx.save(); ctx.translate(x + 16, y + h*0.58); ctx.rotate(0.42); ctx.fillRect(-6, 0, 52, 5); ctx.restore(); }
                ctx.restore(); ctx.globalAlpha = 1;
            }
            draw(){
                // luong kiem khi
                if (this.waveHi){ let w = this.waveHi;
                    ctx.fillStyle = "rgba(178,235,242,0.75)"; ctx.beginPath();
                    ctx.moveTo(w.x - w.dir*30, 250); ctx.lineTo(w.x, 244); ctx.lineTo(w.x, 288); ctx.lineTo(w.x - w.dir*30, 292); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#E0F7FA"; ctx.fillRect(w.x - 4, 250, 8, 38); }
                if (this.waveLo){ let w = this.waveLo;
                    ctx.fillStyle = "rgba(178,235,242,0.75)"; ctx.beginPath();
                    ctx.moveTo(w.x - w.dir*30, 294); ctx.lineTo(w.x, 290); ctx.lineTo(w.x, 320); ctx.lineTo(w.x - w.dir*30, 320); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#E0F7FA"; ctx.fillRect(w.x - 4, 294, 8, 26); }
                // canh bao
                if (this.state === 'iai_warn'){
                    let a = (0.2 + 0.3*Math.abs(Math.sin(frames*0.4))).toFixed(2);
                    ctx.fillStyle = "rgba(255,64,64," + a + ")"; ctx.fillRect(0, this.y + 8, canvas.width, this.h - 12);
                    ctx.strokeStyle = "rgba(255,120,120,0.9)"; ctx.lineWidth = 2; ctx.strokeRect(1, this.y + 9, canvas.width - 2, this.h - 14);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("RÚT KIẾM — ĐỠ (L) HOẶC LƯỚT (SHIFT)!", canvas.width/2, this.y - 6); ctx.textAlign = "left";
                }
                if (this.state === 'cross_warn'){
                    let a = (0.16 + 0.24*Math.abs(Math.sin(frames*0.4))).toFixed(2);
                    ctx.fillStyle = "rgba(0,229,255," + a + ")"; ctx.fillRect(0, 250, canvas.width, 38);
                    ctx.fillStyle = "rgba(255,193,7," + a + ")"; ctx.fillRect(0, 294, canvas.width, 26);
                    ctx.fillStyle = "#E0F7FA"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("CAO → NGỒI (S),  RỒI THẤP → NHẢY!", canvas.width/2, 240); ctx.textAlign = "left";
                }
                if (this.state === 'stance'){
                    let a = (0.35 + 0.35*Math.abs(Math.sin(frames*0.25))).toFixed(2);
                    ctx.strokeStyle = "rgba(255,214,0," + a + ")"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 46 + Math.sin(frames*0.2)*5, 0, 6.28); ctx.stroke();
                    ctx.fillStyle = (frames % 16 < 8) ? "#FFEB3B" : "#FF8A80"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("THẾ PHẢN ĐÒN — ĐỪNG BẮN!", canvas.width/2, this.y - 14); ctx.textAlign = "left";
                }
                if (this.counterFlash > 0){ ctx.fillStyle = "rgba(255,255,255," + (this.counterFlash/14*0.35).toFixed(2) + ")"; ctx.fillRect(0, -CAM_TROI - 20, canvas.width, 320 + CAM_TROI + 20); }
                if (this.state === 'mirage_warn'){
                    ctx.fillStyle = "#B39DDB"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("PHÂN THÂN — CHỈ BÓNG SÁNG LÀ THẬT!", canvas.width/2, 60); ctx.textAlign = "left";
                }
                if (this.state === 'chain_warn' || this.state === 'chain_pause'){
                    let a = (0.18 + 0.28*Math.abs(Math.sin(frames*0.45))).toFixed(2);
                    ctx.fillStyle = "rgba(255,64,64," + a + ")"; ctx.fillRect(0, this.baseY + 8, canvas.width, this.h - 12);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("TAM LIÊN TRẢM " + Math.min(3, this.chainN + 1) + "/3 — NHÁT CUỐI ĐỌC BÀI!", canvas.width/2, this.baseY - 8); ctx.textAlign = "left";
                }
                if (this.state === 'chain_rise'){
                    ctx.fillStyle = "rgba(0,229,255,0.6)";
                    for (let k = 0; k < 5; k++){ ctx.beginPath(); ctx.arc(this.cx() + (Math.random()-0.5)*20, this.y + this.h + 8 + k*15, 13 - k*2, 0, 6.28); ctx.fill(); }
                }
                // than + phan than
                if (this.state === 'mirage_go' || this.state === 'mirage_warn'){
                    for (let c of this.clones){
                        if (c.real){ ctx.save(); ctx.shadowBlur = 16; ctx.shadowColor = "#FFEB3B"; this.drawBody(c.x, c.y, false); ctx.restore();
                            ctx.strokeStyle = "rgba(255,235,59,0.9)"; ctx.lineWidth = 2; ctx.strokeRect(c.x - 3, c.y + 5, this.w + 6, this.h - 6); }
                        else this.drawBody(c.x, c.y, true);
                    }
                    if (this.state === 'mirage_warn') this.drawBody(this.x, this.y, false);
                } else this.drawBody(this.x, this.y, false);
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 160, 6, 320, 12);
                ctx.fillStyle = this.rage ? "#FF1744" : "#26A69A"; ctx.fillRect(canvas.width/2 - 158, 8, 316 * Math.max(0, this.hp/this.maxHp), 8);
                ctx.fillStyle = "white"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + (this.rage ? "  ⚔ CUỒNG NỘ" : ""), canvas.width/2, 32); ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s1.IaiRaptorBoss.1

// Nguồn: index.html:100009 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:100020 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
