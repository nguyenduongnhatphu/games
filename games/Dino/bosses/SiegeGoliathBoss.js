// BOSS_FILE: SiegeGoliathBoss
// BOSS_SNAPSHOT: 36782d91d2329d9857af74607927116e9ca394bac5cc7f15d33431859a55fe63
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, shakeTimer, visualEffects
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

// Nguồn: index.html:39507 · Dùng bởi: SiegeGoliathBoss
// BOSS_PART_BEGIN s1.SiegeGoliathBoss.1 EDITABLE
class SiegeGoliathBoss {
            constructor(level){
                this.name = "SIEGE GOLIATH"; this.hp = 150; this.maxHp = 150;
                this.w = 96; this.h = 92; this.baseY = 320 - this.h;
                this.x = canvas.width - 250; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.step = 0; this.facingLeft = true;
                this.lastSkill = ''; this.atkBag = []; this.invulnAll = false; this.burnTimer = 0; this.rage = false;
                this.retState = 'idle'; this.actionTimer = 44; this.lastMeleeHit = -1;
                this.heat = 0; this.overheat = 0; this.shells = []; this.waves = []; this.beamY = 0; this.chg = null; this.vac = null;
                this.beamPillars = []; this.chgPass = 0;
            }
            physics(){ this.dy += 0.9; this.y += this.dy;
                if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x)); }
            clashTargets(){   // DAN COI: to vua -> 3 mau
                let self = this, out = [];
                for (let s of this.shells) out.push({ o: s, hp: 3, pierce: false,
                    box: { x: s.x - 11, y: s.y - 11, w: 22, h: 22 },
                    kill: function(){ let k = self.shells.indexOf(s); if (k >= 0) self.shells.splice(k, 1); } });
                return out;
            }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = t;
                this.heat++; if (this.heat >= 3){ this.heat = 0; this.state = 'overheat'; this.overheat = 150; this.subTimer = 0;
                    floatingTexts.push(new FloatingText(this.x, this.y - 26, "QUA NHIET!")); shakeTimer = 20; } }
            pickAttack(){
                if (!this.atkBag || !this.atkBag.length){
                    this.atkBag = ['charge','mortar','slam','beam','vacuum'];
                    for (let i = this.atkBag.length-1; i>0; i--){ let j = Math.floor(Math.random()*(i+1)); let t=this.atkBag[i]; this.atkBag[i]=this.atkBag[j]; this.atkBag[j]=t; }
                    if (this.atkBag[0] === this.lastSkill && this.atkBag.length > 1){ let t=this.atkBag[0]; this.atkBag[0]=this.atkBag[1]; this.atkBag[1]=t; }
                }
                let c = this.atkBag.shift(); this.lastSkill = c; this.step = 0; this.subTimer = 0;
                if (c === 'charge') this.state = 'chg_warn';
                else if (c === 'mortar') this.state = 'mortar_go';
                else if (c === 'slam') this.state = 'slam_prep';
                else if (c === 'beam') { this.state = 'beam_prep'; this.beamDir = (dino.x + dino.w/2) < this.cx() ? -1 : 1; }
                else this.state = 'vac_go';
            }
            update(){
                if (this.burnTimer > 0){ this.burnTimer--; if (this.burnTimer % 60 === 0) this.hp -= 1; }
                this.rage = this.hp <= this.maxHp * 0.35;
                const SG = ['entering','idle','overheat','chg_warn','chg_go','mortar_go','slam_prep','slam_hit','beam_prep','beam_go','vac_go','vac_blast'];
                if (SG.indexOf(this.state) < 0){ this.chg = null; this.vac = null; this.y = this.baseY; this.dy = 0; this.state = 'idle'; this.subTimer = 0; this.actionTimer = 34; }
                if (this.state === 'idle' && !(this.actionTimer >= 0)) this.actionTimer = 34;
                this.subTimer++;
                // dan coi
                for (let i = this.shells.length - 1; i >= 0; i--){ let s = this.shells[i]; s.t++;
                    s.x += s.vx; s.vy += 0.42; s.y += s.vy;
                    if (s.y >= 306){ visualEffects.push(new Effect(s.x, 312, 'explosion', true, 26)); shakeTimer = Math.max(shakeTimer, 10);
                        if (Math.abs((dino.x + dino.w/2) - s.x) < 34 && (dino.y + dino.h) > 276) this.hurtP(1);   // ban kinh HEP -> phai tranh dung cho
                        this.shells.splice(i, 1); continue; }
                    if (s.x < -60 || s.x > canvas.width + 60) this.shells.splice(i, 1); }
                // song chan dong: NHANH + CAO hon -> phai nhay dung nhip
                for (let i = this.waves.length - 1; i >= 0; i--){ let w = this.waves[i]; w.x += w.dir * 14.5;
                    if (!w.hit && Math.abs((dino.x + dino.w/2) - w.x) < 40 && (dino.y + dino.h) > 232){ this.hurtP(1); w.hit = true; }
                    if (w.x < -60 || w.x > canvas.width + 60) this.waves.splice(i, 1); }
                // cot lazer doc: ep phai DI CHUYEN trong luc dang ngoi
                for (let i = this.beamPillars.length - 1; i >= 0; i--){ let p = this.beamPillars[i]; p.t++;
                    if (p.t > 24 && p.t < 40 && !p.hit && Math.abs((dino.x + dino.w/2) - p.x) < 28){ this.hurtP(1); p.hit = true; }
                    if (p.t > 46) this.beamPillars.splice(i, 1); }

                if (this.state === 'entering'){ this.physics(); this.faceP(); if (this.subTimer > 44) this.toIdle(40); return; }
                if (this.state === 'overheat'){   // CUA SO THUONG: dung im, an dmg gap doi
                    this.physics(); this.overheat--;
                    if (this.overheat <= 0){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = 30; }
                    return; }
                if (this.state === 'idle'){ this.physics(); this.faceP();
                    let d = (dino.x + dino.w/2) - this.cx();
                    if (Math.abs(d) > 270) this.x += Math.sign(d) * 2.0; else if (Math.abs(d) < 110) this.x -= Math.sign(d) * 1.6;
                    this.actionTimer--; if (this.actionTimer <= 0) this.pickAttack(); return; }
                // ===== HUC VAI: DO duoc (parry gay dmg) hoac LUOT xuyen =====
                if (this.state === 'chg_warn'){ this.physics(); this.faceP();
                    if (this.subTimer > (this.rage ? 30 : 42)){ this.state = 'chg_go'; this.subTimer = 0; this.chgPass = 0;
                        this.chg = { dir: (dino.x + dino.w/2) < this.cx() ? -1 : 1, hit: false }; this.facingLeft = this.chg.dir < 0;
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'chg_go'){ this.y = this.baseY; this.dy = 0;
                    this.x += this.chg.dir * (this.rage ? 24 : 20);
                    if (!this.chg.hit && checkAABB(dino, this)){ this.hurtP(1); this.chg.hit = true; }
                    if (this.x < -this.w - 20 || this.x > canvas.width + 20){
                        this.chgPass++;
                        if (this.chgPass >= (this.rage ? 3 : 2)){   // DOI TUONG bat lai -> phai xu ly nhieu luot
                            this.chg = null; this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x)); this.toIdle(44); }
                        else { this.x = this.chg.dir > 0 ? canvas.width + 16 : -this.w - 16; this.chg.dir = -this.chg.dir; this.chg.hit = false; this.facingLeft = this.chg.dir < 0; shakeTimer = 16; }   // bat tuong: vao lai DUNG BEN vua ra
                    }
                    return; }
                // ===== PHAO COI: dan roi theo vong cung, co dau danh dau =====
                if (this.state === 'mortar_go'){ this.physics(); this.faceP();
                    let n = this.rage ? 6 : 4;
                    if (this.subTimer % 17 === 1 && this.step < n){ this.step++;
                        // qua CUOI roi dung cho ban dang dung -> phai di chuyen that su
                        let tx = (this.step === n) ? (dino.x + dino.w/2) : (dino.x + dino.w/2 + (Math.random()*2-1)*110);
                        tx = Math.max(50, Math.min(canvas.width - 50, tx));
                        let sx = this.cx(), flight = 44;
                        this.shells.push({ x: sx, y: this.y + 10, vx: (tx - sx)/flight, vy: -9.2, t: 0, tx: tx });
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.subTimer > n*17 + 40) this.toIdle(this.rage ? 28 : 42);
                    return; }
                // ===== DAM DAT -> 2 SONG (NHAY) =====
                if (this.state === 'slam_prep'){ this.physics(); this.faceP();
                    if (this.subTimer > (this.rage ? 30 : 44)){ this.state = 'slam_hit'; this.subTimer = 0; shakeTimer = 28;
                        visualEffects.push(new Effect(this.cx(), 314, 'explosion', true, 40));
                        this.waves.push({ x: this.cx() - 24, dir: -1, hit: false }, { x: this.cx() + 24, dir: 1, hit: false });
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'slam_hit'){ this.physics(); if (this.subTimer > 26) this.toIdle(this.rage ? 28 : 44); return; }
                // ===== LAZER QUET TAM DUNG (NGOI) =====
                if (this.state === 'beam_prep'){ this.physics(); this.faceP();
                    if (this.subTimer > 46){ this.state = 'beam_go'; this.subTimer = 0; this.beamX = this.beamDir < 0 ? canvas.width + 40 : -40; if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'beam_go'){ this.physics();
                    this.beamX += this.beamDir * (this.rage ? 9 : 6.6);
                    if (!dino.isCrouching && Math.abs((dino.x + dino.w/2) - this.beamX) < 46 && (dino.y + dino.h) > 250){
                        if (frames % 16 === 0) this.hurtP(1); }
                    // COT DOC dinh ky: cham nhung ngoi im mot cho la an don -> phai vua ngoi vua di chuyen
                    if (this.subTimer % (this.rage ? 30 : 42) === 20) this.beamPillars.push({ x: this.beamX + this.beamDir * 120, t: 0, hit: false });
                    if (this.beamX < -80 || this.beamX > canvas.width + 80) this.toIdle(this.rage ? 30 : 48);
                    return; }
                // ===== HUT + BAN GAN: LUOT (Shift) de thoat =====
                if (this.state === 'vac_go'){ this.physics(); this.faceP();
                    if (!this.vac) this.vac = { t: 0 };
                    this.vac.t++;
                    let mx = this.facingLeft ? this.x : this.x + this.w;
                    let dx = mx - (dino.x + dino.w/2);
                    if (this.vac.t < 72){ dino.x += Math.sign(dx) * 6.9;   // HUT MANH hon toc do chay -> BAT BUOC phai luot
                        dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x));
                        if (frames % 4 === 0) visualEffects.push(new Effect(mx + (Math.random()-0.5)*80, this.cy() + (Math.random()-0.5)*60, 'explosion', true, 7)); }
                    else { this.state = 'vac_blast'; this.subTimer = 0; shakeTimer = 26; if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'vac_blast'){ this.physics();
                    let sd = this.facingLeft ? -1 : 1, len = 190;
                    if (this.subTimer === 4){
                        let box = { x: sd < 0 ? this.x - len : this.x + this.w, y: this.y + 10, w: len, h: this.h - 16 };
                        if (checkAABB(dino, box)) this.hurtP(2);
                        visualEffects.push(new Effect(this.cx() + sd*90, this.cy(), 'explosion', true, 48)); }
                    if (this.subTimer > 34){ this.vac = null; this.toIdle(this.rage ? 30 : 50); }
                    return; }
            }
            drawBody(){
                let x = this.x, y = this.y, w = this.w, h = this.h;
                let hot = this.state === 'overheat';
                ctx.save();
                if (this.facingLeft){ ctx.translate(x + w/2, 0); ctx.scale(-1, 1); ctx.translate(-(x + w/2), 0); }
                const DK = "#2b323b", MD = "#4a5563", LT = "#697687", CORE = hot ? "#FF3D00" : "#455A64", TRIM = "#FFB300";
                ctx.fillStyle = DK; ctx.fillRect(x + 8, y + h*0.66, 30, h*0.34); ctx.fillRect(x + w - 40, y + h*0.66, 30, h*0.34);
                ctx.fillStyle = MD; ctx.fillRect(x + 4, y + h - 12, 40, 12); ctx.fillRect(x + w - 46, y + h - 12, 40, 12);
                ctx.fillStyle = MD; ctx.fillRect(x + 6, y + h*0.26, w - 12, h*0.42);
                ctx.fillStyle = LT; ctx.fillRect(x + 12, y + h*0.30, w - 24, h*0.10);
                ctx.fillStyle = CORE; if (hot) { ctx.shadowBlur = 18; ctx.shadowColor = "#FF6D00"; }
                ctx.beginPath(); ctx.arc(x + w*0.5, y + h*0.48, 16, 0, 6.28); ctx.fill(); ctx.shadowBlur = 0;
                ctx.strokeStyle = TRIM; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x + w*0.5, y + h*0.48, 16, 0, 6.28); ctx.stroke();
                ctx.fillStyle = DK; ctx.fillRect(x - 6, y + h*0.24, 26, 34); ctx.fillRect(x + w - 20, y + h*0.24, 26, 34);
                ctx.fillStyle = MD; ctx.fillRect(x + w - 14, y + h*0.34, 34, 18);
                ctx.fillStyle = DK; ctx.fillRect(x + w*0.3, y + 6, w*0.44, h*0.22);
                ctx.fillStyle = hot ? "#FF7043" : "#FF5252"; ctx.fillRect(x + w*0.42, y + 14, w*0.26, 7);
                ctx.fillStyle = "#263238"; for (let i = 0; i < 3; i++) ctx.fillRect(x + w*0.30 + i*13, y - 8, 8, 14);
                if (hot){ ctx.fillStyle = "rgba(255,109,0,0.35)"; for (let k = 0; k < 4; k++){ ctx.beginPath(); ctx.arc(x + w*0.3 + k*13, y - 16 - (frames*2 + k*10)%22, 6, 0, 6.28); ctx.fill(); } }
                ctx.restore();
            }
            draw(){
                for (let s of this.shells){
                    ctx.strokeStyle = "rgba(255,64,64,0.85)"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.ellipse(s.tx, 312, 40, 11, 0, 0, 6.28); ctx.stroke();
                    ctx.fillStyle = "rgba(255,87,34,0.25)"; ctx.beginPath(); ctx.ellipse(s.tx, 312, 40, 11, 0, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#546E7A"; ctx.beginPath(); ctx.arc(s.x, s.y, 11, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#FF6D00"; ctx.beginPath(); ctx.arc(s.x, s.y, 5, 0, 6.28); ctx.fill();
                }
                for (let w of this.waves){
                    ctx.fillStyle = "rgba(120,144,156,0.8)"; ctx.beginPath(); ctx.moveTo(w.x - 34, 320);
                    ctx.quadraticCurveTo(w.x, 320 - 74, w.x + 34, 320); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "rgba(255,179,0,0.7)"; ctx.beginPath(); ctx.moveTo(w.x - 16, 320);
                    ctx.quadraticCurveTo(w.x, 320 - 40, w.x + 16, 320); ctx.closePath(); ctx.fill();
                }
                if (this.state === 'chg_warn'){
                    let a = (0.2 + 0.3*Math.abs(Math.sin(frames*0.4))).toFixed(2);
                    ctx.fillStyle = "rgba(255,64,64," + a + ")"; ctx.fillRect(0, this.y, canvas.width, this.h);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("HÚC VAI — ĐỠ (L) HOẶC LƯỚT (SHIFT)!", canvas.width/2, this.y - 8); ctx.textAlign = "left";
                }
                if (this.state === 'slam_prep'){
                    ctx.fillStyle = "rgba(255,179,0," + (0.15 + 0.25*Math.abs(Math.sin(frames*0.4))).toFixed(2) + ")";
                    ctx.fillRect(0, 250, canvas.width, 70);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("SÓNG CHẤN ĐỘNG — NHẢY!", canvas.width/2, 242); ctx.textAlign = "left";
                }
                if (this.state === 'beam_prep'){
                    let a = (0.18 + 0.3*Math.abs(Math.sin(frames*0.4))).toFixed(2);
                    ctx.fillStyle = "rgba(255,23,68," + a + ")"; ctx.fillRect(0, 250, canvas.width, 44);
                    ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 2; ctx.strokeRect(1, 251, canvas.width-2, 42);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("LAZER TẦM ĐỨNG — NGỒI XUỐNG (S)!", canvas.width/2, 242); ctx.textAlign = "left";
                }
                if (this.state === 'beam_go'){
                    ctx.fillStyle = "rgba(255,23,68,0.55)"; ctx.fillRect(this.beamX - 46, 250, 92, 44);
                    ctx.fillStyle = "rgba(255,235,238,0.9)"; ctx.fillRect(this.beamX - 16, 250, 32, 44);
                    ctx.strokeStyle = "rgba(255,82,82,0.9)"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(this.cx(), this.y + this.h*0.42); ctx.lineTo(this.beamX, 272); ctx.stroke();
                }
                for (let p of this.beamPillars){
                    if (p.t <= 24){ let a = (0.2 + 0.35*Math.abs(Math.sin(frames*0.5))).toFixed(2);
                        ctx.fillStyle = "rgba(255,193,7," + a + ")"; ctx.fillRect(p.x - 28, 40, 56, 280);
                        ctx.strokeStyle = "rgba(255,193,7,0.9)"; ctx.lineWidth = 2;
                        ctx.beginPath(); ctx.ellipse(p.x, 312, 26, 8, 0, 0, 6.28); ctx.stroke(); }
                    else if (p.t < 40){ ctx.fillStyle = "rgba(255,23,68,0.6)"; ctx.fillRect(p.x - 28, 40, 56, 280);
                        ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.fillRect(p.x - 10, 40, 20, 280); }
                }
                if (this.state === 'vac_go'){
                    let mx = this.facingLeft ? this.x : this.x + this.w;
                    ctx.strokeStyle = "rgba(255,179,0,0.6)"; ctx.lineWidth = 2;
                    for (let k = 0; k < 9; k++){ let r = 60 + ((frames*4 + k*34) % 190);
                        ctx.beginPath(); ctx.arc(mx, this.cy(), r, this.facingLeft ? 2.2 : -0.95, this.facingLeft ? 4.1 : 0.95); ctx.stroke(); }
                    ctx.fillStyle = (frames % 14 < 7) ? "#FF5252" : "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("ĐANG HÚT — LƯỚT (SHIFT) ĐỂ THOÁT!", canvas.width/2, this.y - 14); ctx.textAlign = "left";
                }
                if (this.state === 'vac_blast' && this.subTimer < 20){
                    let sd = this.facingLeft ? -1 : 1, len = 190, mx = this.facingLeft ? this.x : this.x + this.w;
                    ctx.fillStyle = "rgba(255,109,0,0.65)"; ctx.fillRect(sd < 0 ? mx - len : mx, this.y + 10, len, this.h - 16);
                    ctx.fillStyle = "rgba(255,245,157,0.9)"; ctx.fillRect(sd < 0 ? mx - len : mx, this.y + this.h*0.34, len, 22);
                }
                this.drawBody();
                if (this.state === 'overheat'){
                    ctx.fillStyle = (frames % 14 < 7) ? "#FFEB3B" : "#FF6D00"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("QUÁ NHIỆT — ĐÁNH MẠNH VÀO LÕI!", canvas.width/2, this.y - 16); ctx.textAlign = "left";
                    ctx.strokeStyle = "rgba(255,109,0,0.8)"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.cx(), this.y + this.h*0.48, 26 + Math.sin(frames*0.3)*5, 0, 6.28); ctx.stroke();
                }
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 160, 6, 320, 12);
                ctx.fillStyle = this.rage ? "#FF1744" : "#78909C"; ctx.fillRect(canvas.width/2 - 158, 8, 316 * Math.max(0, this.hp/this.maxHp), 8);
                ctx.fillStyle = "white"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + (this.state === 'overheat' ? "  ● SƠ HỞ" : (this.rage ? "  ⚙ CUỒNG NỘ" : "")), canvas.width/2, 32); ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s1.SiegeGoliathBoss.1

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
