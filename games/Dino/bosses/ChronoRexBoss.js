// BOSS_FILE: ChronoRexBoss
// BOSS_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dashVx, dino, dojoMode, floatingTexts, frames, parry, projectiles, shakeTimer, visualEffects
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

// Nguồn: index.html:40535 · Dùng bởi: ChronoRexBoss
// BOSS_PART_BEGIN s1.ChronoRexBoss.1 EDITABLE
class ChronoRexBoss {
            constructor(level){
                this.name = "CHRONO REX"; this.hp = 120; this.maxHp = 120;
                this.w = 74; this.h = 88; this.baseY = 320 - this.h;
                this.x = canvas.width - 250; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.step = 0; this.facingLeft = true;
                this.lastSkill = ''; this.atkBag = []; this.invulnAll = false; this.burnTimer = 0; this.rage = false;
                this.retState = 'idle'; this.actionTimer = 44; this.lastMeleeHit = -1;
                this.echoes = [];        // DON LAP LAI sau 90 khung
                this.fields = [];        // vung THOI GIAN CHAM
                this.orbs = [];          // dan dung giua khong roi tang toc
                this.anchor = null;      // moc thoi gian (ban vo de chan hoi mau)
                this.atkCount = 0; this.prevPx = 0; this.stun = 0;
            }
            physics(){ this.dy += 0.85; this.y += this.dy;
                if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x)); }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = t;
                this.atkCount++;
                if (this.atkCount >= 3 && !this.anchor){ this.atkCount = 0; this.state = 'rew_start'; this.subTimer = 0; } }
            echo(kind, data){ this.echoes.push({ t: 150, kind: kind, d: data }); }   // 2.5 giay sau moi lap lai (co bao truoc)
            fireHand(dir, hi){   // KIM DONG HO quet: hi=true tam dung (ngoi), false sat dat (nhay)
                this.hands = this.hands || [];
                this.hands.push({ x: dir > 0 ? -40 : canvas.width + 40, dir: dir, hi: hi, hit: false, ghost: false });
            }
            fireHandGhost(dir, hi){ this.hands = this.hands || [];
                this.hands.push({ x: dir > 0 ? -40 : canvas.width + 40, dir: dir, hi: hi, hit: false, ghost: true }); }
            spawnOrb(gx, gy, ghost){
                let dx = (dino.x + dino.w/2) - gx, dy = (dino.y + dino.h/2) - gy, d = Math.hypot(dx, dy) || 1;
                this.orbs.push({ x: gx, y: gy, vx: dx/d * 4.4, vy: dy/d * 4.4, t: 0, ghost: !!ghost, hit: false });   // phong ra CHAM, thay ro
            }
            clashTargets(){   // DAN THOI GIAN: 3 mau, ban vo duoc
                let self = this, out = [];
                for (let o of this.orbs) out.push({ o: o, hp: 3, pierce: false,
                    box: { x: o.x - 14, y: o.y - 14, w: 28, h: 28 },
                    kill: function(){ let k = self.orbs.indexOf(o); if (k >= 0) self.orbs.splice(k, 1); } });
                return out;
            }
            pickAttack(){
                if (!this.atkBag || !this.atkBag.length){
                    this.atkBag = ['hand','orb','field','hand','orb'];
                    for (let i = this.atkBag.length-1; i>0; i--){ let j = Math.floor(Math.random()*(i+1)); let t=this.atkBag[i]; this.atkBag[i]=this.atkBag[j]; this.atkBag[j]=t; }
                    if (this.atkBag[0] === this.lastSkill && this.atkBag.length > 1){ let t=this.atkBag[0]; this.atkBag[0]=this.atkBag[1]; this.atkBag[1]=t; }
                }
                let c = this.atkBag.shift(); this.lastSkill = c; this.step = 0; this.subTimer = 0;
                if (c === 'hand') this.state = 'hand_warn';
                else if (c === 'orb') this.state = 'orb_warn';
                else this.state = 'field_warn';
            }
            update(){
                if (this.burnTimer > 0){ this.burnTimer--; if (this.burnTimer % 60 === 0) this.hp -= 1; }
                this.rage = this.hp <= this.maxHp * 0.35;
                const CR = ['entering','idle','hand_warn','hand_go','orb_warn','orb_go','field_warn','field_go','field_strike','rew_start','rew_channel','rew_done','stunned'];
                if (CR.indexOf(this.state) < 0){ this.y = this.baseY; this.dy = 0; this.toIdle(30); }
                if (this.state === 'idle' && !(this.actionTimer >= 0)) this.actionTimer = 30;
                this.subTimer++;
                this.hands = this.hands || [];
                // ---- DON LAP LAI (echo) ----
                for (let i = this.echoes.length - 1; i >= 0; i--){ let e = this.echoes[i]; e.t--;
                    if (e.t <= 0){
                        if (e.kind === 'hand') this.fireHandGhost(e.d.dir, e.d.hi);
                        else if (e.kind === 'orb') this.spawnOrb(e.d.x, e.d.y, true);
                        else if (e.kind === 'field') this.fields.push({ x: e.d.x, t: 200, ghost: true });
                        this.echoes.splice(i, 1);
                    } }
                // ---- kim dong ho quet ----
                for (let i = this.hands.length - 1; i >= 0; i--){ let hd = this.hands[i];
                    hd.x += hd.dir * (this.rage ? 13 : 10.5);
                    if (!hd.hit){
                        if (hd.hi){ if (!dino.isCrouching && Math.abs((dino.x + dino.w/2) - hd.x) < 34 && (dino.y + dino.h) > 250){ this.hurtP(1); hd.hit = true; } }
                        else { if (Math.abs((dino.x + dino.w/2) - hd.x) < 34 && (dino.y + dino.h) > 292){ this.hurtP(1); hd.hit = true; } }
                    }
                    if (hd.x < -70 || hd.x > canvas.width + 70) this.hands.splice(i, 1); }
                // ---- dan thoi gian: bay -> DUNG GIUA KHONG 1s -> lao nhanh ----
                for (let i = this.orbs.length - 1; i >= 0; i--){ let o = this.orbs[i]; o.t++;
                    if (o.t < 40){ o.x += o.vx; o.y += o.vy; }
                    else if (o.t < 120){ if (o.t === 96){ let dx = (dino.x + dino.w/2) - o.x, dy = (dino.y + dino.h/2) - o.y, d = Math.hypot(dx,dy)||1; o.ax = dx/d; o.ay = dy/d; } }   // KHOA HUONG 0.4s truoc khi lao
                    else { if (o.t === 120){ o.vx = (o.ax || 0) * 8.6; o.vy = (o.ay || 0) * 8.6; }
                        o.x += o.vx; o.y += o.vy; }
                    if (!o.hit && checkAABB(dino, { x: o.x - 14, y: o.y - 14, w: 28, h: 28 })){ this.hurtP(1); o.hit = true; this.orbs.splice(i,1); continue; }
                    if (o.x < -60 || o.x > canvas.width + 60 || o.y > 340 || o.y < -60 || o.t > 220) this.orbs.splice(i, 1); }
                // ---- vung thoi gian cham: di chuyen cham 1 nua ----
                let inField = false;
                for (let i = this.fields.length - 1; i >= 0; i--){ let f = this.fields[i]; f.t--;
                    if (Math.abs((dino.x + dino.w/2) - f.x) < 78) inField = true;
                    if (f.t <= 0) this.fields.splice(i, 1); }
                // LUOT (Shift) van thoat duoc — di bo thi bi ghim lai
                let _dashing = (typeof dashVx !== 'undefined') && Math.abs(dashVx) > 1;
                if (inField && !_dashing) dino.x = this.prevPx + (dino.x - this.prevPx) * 0.34;
                this.prevPx = dino.x;
                this.inField = inField;
                // ---- moc thoi gian ----
                if (this.anchor){
                    let a = this.anchor;
                    for (let p = projectiles.length - 1; p >= 0; p--){
                        let pr = projectiles[p];
                        if (pr._chAnchor) continue;
                        if (checkAABB(pr, { x: a.x - 20, y: a.y - 26, w: 40, h: 52 })){
                            pr._chAnchor = true; a.hp--; projectiles.splice(p, 1);
                            visualEffects.push(new Effect(a.x, a.y, 'explosion', true, 18));
                            floatingTexts.push(new FloatingText(a.x - 24, a.y - 34, "MỐC " + Math.max(0,a.hp) + "/3"));
                            if (a.hp <= 0){ this.anchor = null; this.state = 'stunned'; this.stun = 170; this.subTimer = 0;
                                shakeTimer = 26; floatingTexts.push(new FloatingText(this.x, this.y - 30, "PHÁ MỐC! CHOÁNG!")); }
                            break;
                        } } }

                if (this.state === 'entering'){ this.physics(); this.faceP(); if (this.subTimer > 40) this.toIdle(38); return; }
                if (this.state === 'stunned'){ this.physics(); this.stun--; this.invulnAll = false;
                    if (this.stun <= 0){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = 30; } return; }
                if (this.state === 'idle'){ this.physics(); this.faceP();
                    let d = (dino.x + dino.w/2) - this.cx();
                    if (Math.abs(d) > 250) this.x += Math.sign(d) * 2.4; else if (Math.abs(d) < 110) this.x -= Math.sign(d) * 2.0;
                    this.actionTimer--; if (this.actionTimer <= 0) this.pickAttack(); return; }
                // ===== KIM DONG HO: mot quet TAM DUNG (ngoi) + mot quet SAT DAT (nhay) =====
                if (this.state === 'hand_warn'){ this.physics(); this.faceP();
                    if (this.subTimer === 1){ this.handHi = Math.random() < 0.5; this.handDir = (dino.x + dino.w/2) < canvas.width/2 ? 1 : -1; }
                    if (this.subTimer > 46){ this.state = 'hand_go'; this.subTimer = 0;
                        this.fireHand(this.handDir, this.handHi); this.echo('hand', { dir: this.handDir, hi: !this.handHi });   // ECHO doi tang!
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'hand_go'){ this.physics(); if (this.subTimer > 40) this.toIdle(this.rage ? 40 : 56); return; }
                // ===== DAN THOI GIAN =====
                if (this.state === 'orb_warn'){ this.physics(); this.faceP();
                    if (this.subTimer > 52){ this.state = 'orb_go'; this.subTimer = 0; this.step = 0; } return; }
                if (this.state === 'orb_go'){ this.physics();
                    let n = this.rage ? 3 : 2;
                    if (this.subTimer % 26 === 1 && this.step < n){ this.step++;
                        let gx = this.cx(), gy = this.cy() - 10;
                        this.spawnOrb(gx, gy, false); this.echo('orb', { x: gx, y: gy });
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.subTimer > n*26 + 40) this.toIdle(this.rage ? 56 : 76);
                    return; }
                // ===== VUNG THOI GIAN CHAM =====
                if (this.state === 'field_warn'){ this.physics(); this.faceP();
                    if (this.subTimer > 40){ this.state = 'field_go'; this.subTimer = 0;
                        let fx = dino.x + dino.w/2;
                        this.strikeX = fx;
                        this.fields.push({ x: fx, t: 190, ghost: false }); this.echo('field', { x: Math.max(70, Math.min(canvas.width-70, fx + (Math.random()<0.5?-220:220))) });
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'field_go'){ this.physics();
                    if (this.subTimer > 16){ this.state = 'field_strike'; this.subTimer = 0; }   // NOI TIEP ngay: don ket lieu vao giua vung
                    return; }
                if (this.state === 'field_strike'){   // KIM DIET giang xuong tam vung cham -> phai LUOT ra khoi vung
                    this.physics(); this.x += ((this.strikeX - this.w/2) - this.x) * 0.05;
                    if (this.subTimer === (this.rage ? 44 : 58)){
                        shakeTimer = 30; if (SFX.bossSkill) SFX.bossSkill();
                        visualEffects.push(new Effect(this.strikeX, 240, 'explosion', true, 52));
                        if (Math.abs((dino.x + dino.w/2) - this.strikeX) < 72) this.hurtP(2);
                    }
                    if (this.subTimer > (this.rage ? 74 : 88)) this.toIdle(this.rage ? 46 : 64);
                    return; }
                // ===== TUA LAI: dat MOC — ban vo 3 phat de chan, khong thi no HOI MAU =====
                if (this.state === 'rew_start'){ this.physics();
                    if (this.subTimer === 1){ this.anchor = { x: Math.max(80, Math.min(canvas.width-80, this.cx())), y: 262, hp: 3 };
                        this.rewX = this.x; this.rewY = this.y;
                        floatingTexts.push(new FloatingText(this.x, this.y - 30, "TUA LAI! PHÁ MỐC!")); shakeTimer = 22; }
                    if (this.subTimer > 26){ this.state = 'rew_channel'; this.subTimer = 0; } return; }
                if (this.state === 'rew_channel'){ this.physics(); this.invulnAll = false;
                    this.x += ((this.anchor ? this.anchor.x - this.w/2 : this.x) - this.x) * 0.02;
                    if (!this.anchor) return;                                   // moc bi pha -> da chuyen sang 'stunned'
                    if (this.subTimer > (this.rage ? 200 : 240)){ this.state = 'rew_done'; this.subTimer = 0;
                        this.hp = Math.min(this.maxHp, this.hp + 14); this.x = this.rewX; this.y = this.rewY;
                        this.anchor = null; shakeTimer = 30;
                        floatingTexts.push(new FloatingText(this.x, this.y - 30, "TUA LẠI THÀNH CÔNG +14")); }
                    return; }
                if (this.state === 'rew_done'){ this.physics(); if (this.subTimer > 30) { this.state='idle'; this.subTimer=0; this.actionTimer=36; } return; }
            }
            drawBody(){
                let x = this.x, y = this.y, w = this.w, h = this.h;
                ctx.save();
                if (this.facingLeft){ ctx.translate(x + w/2, 0); ctx.scale(-1, 1); ctx.translate(-(x + w/2), 0); }
                const DK = "#2b2350", MD = "#4a3b7d", LT = "#7e68b8", GOLD = "#FFD54F", GEM = "#CE93D8";
                ctx.fillStyle = DK; ctx.beginPath(); ctx.moveTo(x + 12, y + h*0.56);
                ctx.quadraticCurveTo(x - 30, y + h*0.42, x - 40, y + h*0.10); ctx.quadraticCurveTo(x - 10, y + h*0.66, x + 16, y + h*0.70); ctx.closePath(); ctx.fill();
                ctx.fillStyle = MD; ctx.fillRect(x + 14, y + h*0.62, 16, h*0.38); ctx.fillRect(x + 40, y + h*0.62, 16, h*0.38);
                ctx.fillStyle = DK; ctx.fillRect(x + 10, y + h - 8, 26, 8); ctx.fillRect(x + 36, y + h - 8, 26, 8);
                ctx.fillStyle = MD; ctx.fillRect(x + 10, y + h*0.28, w - 18, h*0.36);
                ctx.fillStyle = LT; ctx.fillRect(x + 16, y + h*0.32, w - 30, h*0.12);
                // mat dong ho tren nguc
                ctx.fillStyle = GOLD; ctx.beginPath(); ctx.arc(x + w*0.46, y + h*0.46, 15, 0, 6.28); ctx.fill();
                ctx.fillStyle = "#1b1838"; ctx.beginPath(); ctx.arc(x + w*0.46, y + h*0.46, 11, 0, 6.28); ctx.fill();
                ctx.strokeStyle = GEM; ctx.lineWidth = 2;
                let aa = frames*0.08;
                ctx.beginPath(); ctx.moveTo(x + w*0.46, y + h*0.46); ctx.lineTo(x + w*0.46 + Math.cos(aa)*8, y + h*0.46 + Math.sin(aa)*8); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(x + w*0.46, y + h*0.46); ctx.lineTo(x + w*0.46 + Math.cos(aa*0.2)*5, y + h*0.46 + Math.sin(aa*0.2)*5); ctx.stroke();
                // dau + sung banh rang
                ctx.fillStyle = MD; ctx.fillRect(x + 18, y + 6, w - 30, h*0.24);
                ctx.fillStyle = GOLD;
                for (let i = 0; i < 5; i++){ let sx = x + 20 + i*11; ctx.beginPath(); ctx.moveTo(sx, y + 6); ctx.lineTo(sx + 5, y - 10); ctx.lineTo(sx + 10, y + 6); ctx.closePath(); ctx.fill(); }
                ctx.fillStyle = GEM; ctx.shadowBlur = 10; ctx.shadowColor = "#CE93D8";
                ctx.beginPath(); ctx.ellipse(x + w - 22, y + h*0.14, 6, 4.5, 0, 0, 6.28); ctx.fill(); ctx.shadowBlur = 0;
                ctx.fillStyle = DK; ctx.fillRect(x + w - 24, y + h*0.21, 20, 9);
                ctx.restore();
            }
            draw(){
                // BAO TRUOC DON LAP (1 giay cuoi): hien ro se lap lai cai gi va o tang nao
                for (let e of this.echoes){
                    if (e.t > 60) continue;
                    let k = 1 - e.t/60;
                    ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(canvas.width/2 - 150, 62, 300, 26);
                    ctx.fillStyle = "rgba(206,147,216,0.85)"; ctx.fillRect(canvas.width/2 - 148, 82, 296*k, 4);
                    let txt = e.kind === 'hand' ? (e.d.hi ? "ĐÒN LẶP: KIM TẦM ĐỨNG — NGỒI (S)!" : "ĐÒN LẶP: KIM SÁT ĐẤT — NHẢY!")
                            : (e.kind === 'orb' ? "ĐÒN LẶP: ĐẠN THỜI GIAN" : "ĐÒN LẶP: VÙNG CHẬM");
                    ctx.fillStyle = (frames % 12 < 6) ? "#FFEB3B" : "#CE93D8"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(txt, canvas.width/2, 79); ctx.textAlign = "left";
                    if (e.kind === 'hand'){   // to san vung se bi quet
                        let yTop = e.d.hi ? 250 : 292, hgt = e.d.hi ? 44 : 28;
                        ctx.fillStyle = "rgba(206,147,216,0.18)"; ctx.fillRect(0, yTop, canvas.width, hgt);
                        ctx.strokeStyle = "rgba(206,147,216,0.7)"; ctx.lineWidth = 2; ctx.setLineDash([7,7]);
                        ctx.strokeRect(1, yTop+1, canvas.width-2, hgt-2); ctx.setLineDash([]); }
                    break;
                }
                // vung thoi gian cham
                for (let f of this.fields){
                    ctx.fillStyle = f.ghost ? "rgba(206,147,216,0.16)" : "rgba(126,104,184,0.22)";
                    ctx.fillRect(f.x - 78, 40, 156, 280);
                    ctx.strokeStyle = f.ghost ? "rgba(206,147,216,0.6)" : "rgba(179,157,219,0.8)"; ctx.lineWidth = 2;
                    ctx.setLineDash([6, 6]); ctx.strokeRect(f.x - 78, 40, 156, 280); ctx.setLineDash([]);
                    ctx.fillStyle = "#CE93D8"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("CHẬM", f.x, 56); ctx.textAlign = "left";
                }
                if (this.inField){
                    ctx.fillStyle = (frames % 14 < 7) ? "#FFEB3B" : "#CE93D8"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("BỊ GHIM CHẬM — LƯỚT (SHIFT) ĐỂ THOÁT!", canvas.width/2, 108); ctx.textAlign = "left";
                }
                if (this.state === 'field_strike'){
                    let lim = this.rage ? 44 : 58, k = Math.min(1, this.subTimer / lim);
                    if (this.subTimer < lim){
                        ctx.fillStyle = "rgba(255,23,68," + (0.16 + 0.30*Math.abs(Math.sin(frames*0.45))).toFixed(2) + ")";
                        ctx.fillRect(this.strikeX - 72, 40, 144, 280);
                        ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 3; ctx.strokeRect(this.strikeX - 72, 40, 144, 280);
                        ctx.fillStyle = "rgba(255,213,79,0.9)"; ctx.fillRect(this.strikeX - 8, 40, 16, 280 * k);
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("KIM DIỆT — RA KHỎI VÙNG CHẬM!", this.strikeX, 34); ctx.textAlign = "left";
                    } else if (this.subTimer < lim + 16){
                        ctx.fillStyle = "rgba(255,255,255," + (1 - (this.subTimer-lim)/16).toFixed(2) + ")";
                        ctx.fillRect(this.strikeX - 72, 40, 144, 280);
                    }
                }
                // kim dong ho
                for (let hd of this.hands){
                    let yTop = hd.hi ? 250 : 292, hgt = hd.hi ? 44 : 28;
                    ctx.fillStyle = hd.ghost ? "rgba(206,147,216,0.5)" : "rgba(255,213,79,0.75)";
                    ctx.fillRect(hd.x - hd.dir*54, yTop, 54, hgt);
                    ctx.fillStyle = hd.ghost ? "#CE93D8" : "#FFD54F"; ctx.fillRect(hd.x - 5, yTop, 10, hgt);
                }
                // dan thoi gian
                for (let o of this.orbs){
                    let frozen = (o.t >= 40 && o.t < 120);
                    ctx.fillStyle = o.ghost ? "rgba(206,147,216,0.55)" : "rgba(255,213,79,0.85)";
                    ctx.beginPath(); ctx.arc(o.x, o.y, 13, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(o.x, o.y, 6, 0, 6.28); ctx.fill();
                    if (frozen){ ctx.strokeStyle = o.ghost ? "#CE93D8" : "#FFD54F"; ctx.lineWidth = 2;
                        ctx.beginPath(); ctx.arc(o.x, o.y, 20 + Math.sin(frames*0.3)*3, 0, 6.28); ctx.stroke();
                        if (o.t >= 96 && o.ax !== undefined){   // TIA NGAM 0.4s truoc khi lao
                            ctx.strokeStyle = (frames % 8 < 4) ? "#FF1744" : "rgba(255,23,68,0.35)"; ctx.lineWidth = 3;
                            ctx.setLineDash([9, 7]); ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(o.x + o.ax*300, o.y + o.ay*300); ctx.stroke(); ctx.setLineDash([]); } }
                }
                // moc thoi gian
                if (this.anchor){ let a = this.anchor;
                    ctx.fillStyle = "rgba(255,213,79," + (0.35 + 0.25*Math.abs(Math.sin(frames*0.2))).toFixed(2) + ")";
                    ctx.beginPath(); ctx.moveTo(a.x, a.y - 28); ctx.lineTo(a.x + 18, a.y); ctx.lineTo(a.x, a.y + 28); ctx.lineTo(a.x - 18, a.y); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 3; ctx.stroke();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("MỐC " + a.hp + "/3 — BẮN VỠ!", a.x, a.y - 38); ctx.textAlign = "left";
                    ctx.strokeStyle = "rgba(255,213,79,0.5)"; ctx.lineWidth = 2; ctx.setLineDash([5,5]);
                    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(this.cx(), this.cy()); ctx.stroke(); ctx.setLineDash([]);
                }
                if (this.state === 'rew_channel'){
                    let k = Math.min(1, this.subTimer / (this.rage ? 200 : 240));
                    ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(canvas.width/2 - 130, 44, 260, 14);
                    ctx.fillStyle = "#CE93D8"; ctx.fillRect(canvas.width/2 - 128, 46, 256*k, 10);
                    ctx.fillStyle = "#fff"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("ĐANG TUA LẠI — PHÁ MỐC ĐỂ CHẶN!", canvas.width/2, 40); ctx.textAlign = "left";
                }
                if (this.state === 'orb_warn'){   // NAP DAN: hien du so qua sap ban + dem nguoc
                    let n = this.rage ? 3 : 2, k = Math.min(1, this.subTimer / 52);
                    for (let i = 0; i < n; i++){
                        let a2 = frames*0.09 + i * (6.28/n), r = 46 - k*18;
                        let ox = this.cx() + Math.cos(a2)*r, oy = this.cy() - 10 + Math.sin(a2)*r*0.6;
                        ctx.fillStyle = "rgba(255,213,79," + (0.35 + 0.5*k).toFixed(2) + ")";
                        ctx.beginPath(); ctx.arc(ox, oy, 6 + k*7, 0, 6.28); ctx.fill();
                        ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 1.5; ctx.stroke();
                    }
                    ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(canvas.width/2 - 120, 44, 240, 20);
                    ctx.fillStyle = "#FFD54F"; ctx.fillRect(canvas.width/2 - 118, 60, 236*k, 3);
                    ctx.fillStyle = (frames % 12 < 6) ? "#FFEB3B" : "#FFD54F"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("NẠP " + n + " ĐẠN THỜI GIAN!", canvas.width/2, 58); ctx.textAlign = "left";
                }
                if (this.state === 'hand_warn'){
                    let a = (0.2 + 0.3*Math.abs(Math.sin(frames*0.4))).toFixed(2);
                    let yTop = this.handHi ? 250 : 292, hgt = this.handHi ? 44 : 28;
                    ctx.fillStyle = "rgba(255,213,79," + a + ")"; ctx.fillRect(0, yTop, canvas.width, hgt);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(this.handHi ? "KIM TẦM ĐỨNG — NGỒI (S)!  … RỒI ĐỔI TẦNG!" : "KIM SÁT ĐẤT — NHẢY!  … RỒI ĐỔI TẦNG!", canvas.width/2, yTop - 10); ctx.textAlign = "left";
                }
                if (this.state === 'stunned'){
                    ctx.fillStyle = (frames % 14 < 7) ? "#FFEB3B" : "#CE93D8"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("CHOÁNG — ĐÁNH ĐI!", canvas.width/2, this.y - 18); ctx.textAlign = "left";
                }
                this.drawBody();
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 160, 6, 320, 12);
                ctx.fillStyle = this.rage ? "#FF1744" : "#9575CD"; ctx.fillRect(canvas.width/2 - 158, 8, 316 * Math.max(0, this.hp/this.maxHp), 8);
                ctx.fillStyle = "white"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + "  ⏱ ĐÒN LẶP LẠI SAU 1.5s" + (this.rage ? "  · CUỒNG NỘ" : ""), canvas.width/2, 32); ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s1.ChronoRexBoss.1

// Nguồn: index.html:100017 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:100028 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
