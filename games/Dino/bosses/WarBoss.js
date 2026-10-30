// BOSS_FILE: WarBoss
// BOSS_SNAPSHOT: 36782d91d2329d9857af74607927116e9ca394bac5cc7f15d33431859a55fe63
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MINION_HP, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, aaHeSo, aaUp, bossProjectiles, bossVaoTam, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, minionBox, parry, pickFromBag, platforms, projectiles, shakeTimer, troiSinh, troiVy, visualEffects
// Nguồn: index.html:11458 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WarBoss.1 EDITABLE
class WarBoss {
            constructor(level){
                this.name = "WAR"; this.hp = 165; this.maxHp = 165;   // @@HE-WAR-DS1B: 150 -> 165
                this.w = WR_W; this.h = WR_H; this.baseY = 320 - this.h;
                this.x = canvas.width - 220; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.actionTimer = 54; this.facingLeft = true;
                this.retState = 'idle'; this.lastSkill = ''; this.atkBag = []; this.invulnAll = false;
                this.burnTimer = 0; this.lastMeleeHit = -1; this.phase = 1; this._bag = null;
                this.arm = 'sword'; this.armR = 0; this.armL = 0; this.wing = 0;
                this.slash = null; this.tel = null; this.combo = 0; this.dashV = 0; this.walk = 0;
                this.chain = null; this.blades = []; this.waves = []; this.spirits = [];
                this.stone = 0; this.immo = 0; this.geyser = null; this.ruin = null;
                this.cross = []; this._chainSwung = 0; this._swingAt = 0;
                this.dmgMul = 1; this._hb = false;
            }
            minionTargets(){ return this.spirits.filter(s => !s.dead && (s.hp === undefined || s.hp > 0)).map(s => minionBox(s, 26, 26, MINION_HP, true, true)); }
            spd(){ return this.phase === 2 ? 1.25 : (this.immo > 0 ? 1.15 : 1); }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = Math.max(6, Math.round(t / this.spd())); this.arm = 'sword'; this.armR = 0; this.armL = 0; }
            physics(){
                this.dy += 0.7; this.y += this.dy; this.x += this.dashV; this.dashV *= 0.86;
                if (Math.abs(this.dashV) < 0.4) this.dashV = 0;
                let land = 320;
                for (let pf of platforms){
                    if (pf.top >= 320) continue;
                    if (this.x + this.w > pf.x + 8 && this.x < pf.x + pf.w - 8 && this.dy >= 0 &&
                        (this.y + this.h) <= pf.top + 16 && (this.y + this.h) >= pf.top - 20) land = Math.min(land, pf.top);
                }
                if (this.y + this.h >= land){ this.y = land - this.h; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x));
            }
            warn(reach, up, t){ this.tel = { dir: this.dir(), reach: reach, up: up, t: t, max: t }; }
            doSlash(reach, up, life, dmg){ let _k=aaHeSo(this); reach*=_k; up=aaUp(this,up); this.slash = { t: life, dir: this.dir(), reach: reach, up: up, hit: false, dmg: dmg || 1 }; }
            slashRect(){
                let a = this.slash; if (!a) return { x:0,y:0,w:0,h:0 };
                return a.dir < 0 ? { x: this.x - a.reach, y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 }
                                 : { x: this.x + this.w, y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 };
            }
            // ---- SONG XUNG KICH chay doc san ----
            wave(dir, spd, h2, dmg){
                let w = new BossProjectile(this.cx() + dir*30, 322 - h2, dir * spd, 0, true, dmg || 1);
                w.w = 46; w.h = h2; w.color = "#FF8A50"; w.crescent = true; w.isPiercing = true;
                bossProjectiles.push(w);
            }
            // ---- LUOI KIEM KHONG LO MOC TU DAT (Blade Geyser) ----
            tickBlades(){
                for (let i = this.blades.length - 1; i >= 0; i--){
                    let b = this.blades[i]; b.t--;
                    let bH = b.h || 145;
                    if (b.t === 0 && checkAABB(dino, { x: b.x - 22, y: 320 - bH, w: 44, h: bH + 4 })) this.hurtP(1);
                    if (b.t < -30) this.blades.splice(i, 1);
                }
            }
            // ---- CROSSBLADE: nem di, NAY 3 chang o vach/san roi BAY VE tay ----
            tickCross(){
                for (let i = this.cross.length - 1; i >= 0; i--){
                    let c = this.cross[i]; c.life--; c.spin += 0.42;
                    if (c.hit > 0) c.hit--;
                    if (c.back){
                        let a = Math.atan2(this.cy() - c.y, this.cx() - c.x);
                        c.vx += (Math.cos(a)*13 - c.vx) * 0.22; c.vy += (Math.sin(a)*13 - c.vy) * 0.22;
                        c.x += c.vx; c.y += c.vy;
                        if (Math.abs(c.x - this.cx()) < 26 && Math.abs(c.y - this.cy()) < 26) c.dead = true;
                    } else {
                        c.x += c.vx; c.y += c.vy;
                        let bounced = false;
                        if (c.x < 16){ c.x = 16; c.vx = Math.abs(c.vx); bounced = true; }
                        if (c.x > canvas.width - 16){ c.x = canvas.width - 16; c.vx = -Math.abs(c.vx); bounced = true; }
                        if (c.y > 308){ c.y = 308; c.vy = -Math.abs(c.vy); bounced = true; }
                        if (c.y < 24){ c.y = 24; c.vy = Math.abs(c.vy); bounced = true; }
                        if (bounced){
                            c.bnc--; visualEffects.push(new Effect(c.x, c.y, 'explosion', true, 14));
                            if (c.bnc <= 0) c.back = true;
                            else {
                                let a = Math.atan2((dino.y + dino.h/2) - c.y, (dino.x + dino.w/2) - c.x);
                                let sp = Math.sqrt(c.vx*c.vx + c.vy*c.vy);
                                c.vx = Math.cos(a)*sp; c.vy = Math.sin(a)*sp;
                            }
                        }
                    }
                    let box = { x: c.x-14, y: c.y-14, w: 28, h: 28 };
                    for (let pi = projectiles.length - 1; pi >= 0; pi--){
                        let pr = projectiles[pi]; if (!pr || pr.owner !== 1) continue;
                        if (!checkAABB(pr, box)) continue;
                        c.dead = true; visualEffects.push(new Effect(c.x, c.y, 'explosion', true, 16));
                        if (!(pr.type === 2 || (pr.pierceCount||0) > 0)) projectiles.splice(pi, 1);
                        break;
                    }
                    if (!c.dead && c.hit <= 0 && checkAABB(dino, box)){ c.hit = 40; this.hurtP(1); }
                    if (c.dead || c.life <= 0) this.cross.splice(i, 1);
                }
            }
            // ---- HON MA BENH DICH (Affliction) ----
            tickSpirits(){
                for (let i = this.spirits.length - 1; i >= 0; i--){
                    let s = this.spirits[i]; s.life--;
                    let a = Math.atan2((dino.y + dino.h/2) - s.y, (dino.x + dino.w/2) - s.x);
                    s.vx += (Math.cos(a)*3.1 - s.vx) * 0.05; s.vy += (Math.sin(a)*3.1 - s.vy) * 0.05;
                    s.x += s.vx; s.y += s.vy; s.w2 += 0.16;
                    for (let pi = projectiles.length - 1; pi >= 0; pi--){
                        let pr = projectiles[pi]; if (!pr || pr.owner !== 1) continue;
                        if (!checkAABB(pr, { x: s.x-14, y: s.y-14, w: 28, h: 28 })) continue;
                        s.dead = true; visualEffects.push(new Effect(s.x, s.y, 'explosion', true, 12));
                        if (!(pr.type === 2 || (pr.pierceCount||0) > 0)) projectiles.splice(pi, 1);
                        break;
                    }
                    if (!s.dead && checkAABB(dino, { x: s.x-13, y: s.y-13, w: 26, h: 26 })){ s.dead = true; this.hurtP(1); visualEffects.push(new Effect(s.x, s.y, 'explosion', true, 14)); }
                    if (s.dead || s.life <= 0) this.spirits.splice(i, 1);
                }
            }
            // ---- XICH VUC THAM (Abyssal Chain) ----
            tickChain(){
                let c = this.chain; if (!c) return;
                if (c.st === 'out'){
                    c.len += WR_CHAIN_SPD;
                    let hx = this.cx() + c.dir * c.len, hy = this.cy();
                    if (!c.hit && checkAABB(dino, { x: hx - 18, y: hy - 20, w: 36, h: 40 })){
                        c.hit = true; c.st = 'pull'; c.len = Math.abs((dino.x + dino.w/2) - this.cx());
                        floatingTexts.push(new FloatingText(dino.x - 24, dino.y - 30, "ABYSSAL CHAIN!"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (c.len > WR_CHAIN_MAX) c.st = 'back';
                } else if (c.st === 'pull'){
                    c.len -= 17;
                    let tx = this.cx() + c.dir * Math.max(58, c.len) - dino.w/2;
                    dino.x += (tx - dino.x) * 0.42;
                    if (dino.dy > 0) dino.dy *= 0.5;
                    if (c.len <= 60) c.st = 'back';
                } else {
                    c.len -= 26;
                    if (c.len <= 0) this.chain = null;
                }
            }
            // ======================= PHA 2: CHAOS FORM =======================
            startPhase2(){
                this.phase = 2; this.hp = 120; this.maxHp = 120; this.invulnAll = true;
                this.name = "WAR — CHAOS FORM";
                this.state = 'chaos_wake'; this.subTimer = 0; this._bag = null; this.atkBag = [];
                this.w = 96; this.h = 120; this.baseY = 320 - this.h; this.y = this.baseY; this.dy = 0; this.dashV = 0;
                this.slash = null; this.tel = null; this.chain = null; this.ruin = null; this.geyser = null;
                this.blades.length = 0; this.spirits.length = 0; this.cross.length = 0; this.stone = 0; this.immo = 0;
                bossProjectiles.length = 0;
                floatingTexts.push(new FloatingText(this.cx() - 110, 130, "CHAOS FORM!"));
                shakeTimer = 96; if (SFX.bossEntry) SFX.bossEntry();
            }
            update(){
                if (this.state === 'entering'){ this.physics(); this.x -= 4; if (this.x < canvas.width - 250) this.toIdle(40); return; }
                if (this.tel){ this.tel.t--; if (this.tel.t <= 0) this.tel = null; }
                if (this.slash){ this.slash.t--; if (this.slash.t <= 0) this.slash = null; }
                if (this.stone > 0){ this.stone--; this.dmgMul = 0.5; } else this.dmgMul = 1;
                if (this.immo > 0){
                    this.immo--;
                    let dx = (dino.x + dino.w/2) - this.cx(), dy2 = (dino.y + dino.h/2) - this.cy();
                    if (Math.sqrt(dx*dx + dy2*dy2) < 96 && frames % 24 === 0) this.hurtP(1);
                }
                this.wing += 0.07;
                this.tickBlades(); this.tickSpirits(); this.tickChain(); this.tickCross();
                this.physics();
                if (this.slash){
                    let r = this.slashRect();
                    if (!this.slash.hit && checkAABB(dino, r)){ this.slash.hit = true; this.hurtP(this.slash.dmg); }
                }
                // RUIN: phi ngua ngang man
                if (this.ruin){
                    let R2 = this.ruin; R2.t++;
                    this.x += R2.v; this.walk += Math.abs(R2.v);
                    if (frames % 3 === 0) visualEffects.push(new Effect(this.cx() - Math.sign(R2.v)*30, this.y + this.h - 6, 'explosion', true, 14));
                    if (!R2.hit && checkAABB(dino, { x: this.x - 10, y: this.y, w: this.w + 20, h: this.h })){ R2.hit = true; this.hurtP(1); }
                    if (this.x <= 10 || this.x >= canvas.width - this.w - 10){
                        R2.lap--; R2.hit = false; R2.v = -R2.v; this.facingLeft = R2.v < 0;
                        if (R2.lap <= 0) this.ruin = null;
                    }
                }
                if (this.phase === 2) return this.updateChaos();
                if (this.state === 'idle'){
                    this.faceP();
                    { let tr = this.x; bossVaoTam(this, 60, 130, 6.4); this.walk += Math.abs(this.x - tr); }
                    this.actionTimer--;
                    if (this.actionTimer <= 0) this.pickSkill();
                    return;
                }
                this.runSkill();
            }
            pickSkill(){
                let ad = Math.abs(this.gap()), near = ad < 190;
                let c = near ? pickFromBag(this, ['w_combo','w_tremor','w_earth','w_geyser','w_immo','w_combo'])
                             : pickFromBag(this, ['w_chain','w_cross','w_mercy','w_ruin','w_afflict','w_chain']);
                if (c === 'w_immo' && this.immo > 0) c = 'w_stone';
                if (Math.random() < 0.16 && this.stone <= 0) c = 'w_stone';
                this.state = c; this.subTimer = 0; this.combo = 0; this.faceP();
            }
            runSkill(){
                let st = this.state, sp = this.spd(); this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;
                if (st === 'w_combo'){
                    this.arm = 'sword';
                    let warns = [10, 40, 74], hits = [26, 56, 96];
                    if (this.subTimer < 100 && Math.floor(this.subTimer) % 2 === 0){
                        let g = this.gap(); if (Math.abs(g) > 96) this.x += Math.sign(g) * 2.4;
                    }
                    for (let k = 0; k < 3; k++){
                        if (T(warns[k])){ this.faceP(); this.warn(k === 2 ? 168 : 132, k === 2 ? 40 : 22, hits[k]-warns[k]); this.armR = -2.1; }
                        if (T(hits[k])){
                            this.faceP(); let big = k === 2;
                            this.armR = big ? -0.2 : -0.6;
                            this.doSlash(big ? 168 : 132, big ? 40 : 22, big ? 20 : 14, big ? 2 : 1);
                            this.dashV = this.dir() * (big ? 12 : 7);
                            if (big){ shakeTimer = 30; this.wave(this.dir(), 9, 70, 1); if (SFX.bossExplode) SFX.bossExplode(); }
                            else if (SFX.tone) SFX.tone(260, 0.09, 'square', 0.14, 150);
                        }
                    }
                    if (this.subTimer > 118) this.toIdle(36);
                    return;
                }
                if (st === 'w_tremor'){
                    this.arm = 'gauntlet';
                    if (T(8)){ this.faceP(); this.armR = -2.3; }
                    if (this.subTimer > 8 && this.subTimer < 46 && frames % 4 === 0)
                        visualEffects.push(new Effect(this.cx() + this.dir()*24, this.y + 40, 'explosion', true, 10));
                    if (T(46)){ this.warn(150, 10, 16); }
                    if (T(62)){
                        this.armR = 0.5; shakeTimer = 42;
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 78));
                        this.wave(-1, 10.5, 84, 1); this.wave(1, 10.5, 84, 1);
                        if (checkAABB(dino, { x: this.cx()-118, y: this.baseY-16, w: 236, h: this.h+20 })) this.hurtP(2);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 96) this.toIdle(42);
                    return;
                }
                if (st === 'w_earth'){
                    this.arm = 'gauntlet';
                    if (T(10)) this.faceP();
                    let beats = [24, 46, 68, 92];
                    for (let k = 0; k < 4; k++) if (T(beats[k])){
                        this.armR = (k % 2) ? 0.4 : -1.9;
                        shakeTimer = Math.max(shakeTimer, 22);
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 44 + k*8));
                        this.wave(-1, 8 + k*0.8, 60 + k*10, 1); this.wave(1, 8 + k*0.8, 60 + k*10, 1);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 118) this.toIdle(44);
                    return;
                }
                if (st === 'w_immo'){
                    if (T(20)){
                        this.immo = 540;
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 104));
                        shakeTimer = 26;
                        floatingTexts.push(new FloatingText(this.x - 20, this.y - 34, "IMMOLATION"));
                    }
                    if (this.subTimer > 40) this.toIdle(20);
                    return;
                }
                if (st === 'w_stone'){
                    if (T(18)){
                        this.stone = 420;
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 60));
                        floatingTexts.push(new FloatingText(this.x - 18, this.y - 34, "STONESKIN"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 36) this.toIdle(18);
                    return;
                }
                if (st === 'w_chain'){
                    if (T(14)){ this.faceP(); this.armL = -1.5; }
                    if (T(30)){ this.chain = { st: 'out', len: 30, dir: this.dir(), hit: false }; if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.chain && this.chain.st === 'pull' && this._chainSwung === 0 && this.chain.len <= 96){
                        this._chainSwung = 1; this.arm = 'sword'; this.faceP();
                        this.warn(140, 30, 18); this._swingAt = this.subTimer + 18;
                    }
                    if (this._chainSwung === 1 && this.subTimer >= this._swingAt){
                        this._chainSwung = 2; this.arm = 'sword'; this.armR = -0.4;
                        this.doSlash(140, 30, 16, 1); this.dashV = this.dir() * 8; shakeTimer = 22;
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 130){ this.chain = null; this._chainSwung = 0; this.toIdle(40); }
                    return;
                }
                if (st === 'w_cross'){
                    this.arm = 'crossblade';
                    if (T(16)) this.faceP();
                    if (T(30) || T(52)){
                        let ang = Math.atan2((dino.y + dino.h/2) - this.cy(), (dino.x + dino.w/2) - this.cx());
                        this.cross.push({ x: this.cx(), y: this.cy(), vx: Math.cos(ang)*11.5, vy: Math.sin(ang)*11.5,
                                          bnc: 3, back: false, spin: 0, life: 320, hit: 0, dead: false });
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 80) this.toIdle(38);
                    return;
                }
                if (st === 'w_mercy'){
                    this.arm = 'mercy';
                    if (T(12)){ this.faceP(); this.armR = -1.5; }
                    if (this.subTimer > 18 && this.subTimer < 70 && Math.floor(this.subTimer) % 10 === 0){
                        this.faceP();
                        let a = Math.atan2((dino.y + dino.h/2) - (this.y + 30), (dino.x + dino.w/2) - this.cx());
                        let bp = new BossProjectile(this.cx() + this.dir()*24, this.y + 30, Math.cos(a)*16, Math.sin(a)*16, false, 1);
                        bp.w = 14; bp.h = 7; bp.color = "#FFD54F"; bp.frail = true; bossProjectiles.push(bp);
                        if (SFX.tone) SFX.tone(920, 0.04, 'square', 0.09, 500);
                    }
                    if (this.subTimer > 84) this.toIdle(34);
                    return;
                }
                if (st === 'w_afflict'){
                    if (T(22)){
                        for (let k = 0; k < 4; k++)
                            this.spirits.push({ x: this.cx() + (k-1.5)*26, y: this.cy() - 20, vx: 0, vy: -2, w2: k, life: 420, dead: false });
                        floatingTexts.push(new FloatingText(this.x - 16, this.y - 34, "AFFLICTION"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 50) this.toIdle(38);
                    return;
                }
                if (st === 'w_ruin'){
                    if (T(16)){ this.faceP(); floatingTexts.push(new FloatingText(this.x - 14, this.y - 34, "RUIN!")); }
                    if (this.subTimer > 16 && this.subTimer < 52 && frames % 5 === 0)
                        visualEffects.push(new Effect(this.cx(), this.y + this.h - 6, 'explosion', true, 14));
                    if (T(52)){ this.ruin = { v: this.dir()*14, lap: 2, hit: false, t: 0 }; shakeTimer = 30; if (SFX.bossExplode) SFX.bossExplode(); }
                    if (this.subTimer > 52 && !this.ruin) this.toIdle(46);
                    if (this.subTimer > 260){ this.ruin = null; this.toIdle(46); }
                    return;
                }
                this.toIdle(38);
            }
            // ======================= PHA 2 =======================
            updateChaos(){
                if (this.state === 'chaos_wake'){
                    this.subTimer++;
                    if (this.subTimer % 5 === 0) visualEffects.push(new Effect(this.cx()+(Math.random()-0.5)*130, this.cy()+(Math.random()-0.5)*130, 'explosion', true, 30));
                    if (this.subTimer > 100){ this.invulnAll = false; this.toIdle(26); }
                    return;
                }
                if (this.state === 'idle'){
                    this.faceP();
                    { let tr = this.x; bossVaoTam(this, 72, 132, 6.6); this.walk += Math.abs(this.x - tr); }
                    this.actionTimer--;
                    if (this.actionTimer <= 0){
                        this.state = pickFromBag(this, ['c_claw','c_nova','c_slam','c_roar','c_rain','c_claw']);
                        this.subTimer = 0; this.faceP();
                    }
                    return;
                }
                this.runChaos();
            }
            runChaos(){
                let st = this.state, sp = 1.25; this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;
                if (st === 'c_claw'){
                    let warns = [8, 40], hits = [24, 58];
                    for (let k = 0; k < 2; k++){
                        if (T(warns[k])){ this.faceP(); this.warn(150, 40, hits[k]-warns[k]); this.armR = 0.9; }
                        if (T(hits[k])){
                            this.faceP(); this.armR = -0.4;
                            this.doSlash(150, 40, 16, 1);
                            this.dashV = this.dir() * 11; shakeTimer = 24;
                            if (SFX.bossSkill) SFX.bossSkill();
                        }
                    }
                    if (this.subTimer > 82) this.toIdle(30);
                    return;
                }
                if (st === 'c_nova'){
                    if (T(20)) floatingTexts.push(new FloatingText(this.x - 20, this.y - 40, "CHAOS NOVA"));
                    let rings = [34, 58, 82];
                    for (let k = 0; k < 3; k++) if (T(rings[k])){
                        let R = 96 + k*46;
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, R));
                        let dx = (dino.x+dino.w/2)-this.cx(), dy2 = (dino.y+dino.h/2)-this.cy();
                        let dist = Math.sqrt(dx*dx+dy2*dy2);
                        if (dist < R && dist > R - 60) this.hurtP(1);
                        shakeTimer = Math.max(shakeTimer, 20);
                    }
                    if (this.subTimer > 108) this.toIdle(38);
                    return;
                }
                if (st === 'c_slam'){
                    if (T(10)){ this.faceP(); this.dy = -17; this.grounded = false; this.dashV = Math.sign(this.gap()) * 9; }
                    if (this.subTimer > 20 && this.grounded && !this._hb){
                        this._hb = true; shakeTimer = 56;
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 116));
                        this.wave(-1, 12, 96, 1); this.wave(1, 12, 96, 1);
                        for (let s2 = -1; s2 <= 1; s2 += 2) for (let k = 1; k <= 3; k++)
                            this.blades.push({ x: this.cx() + s2 * k * 96, t: 10 + k*8, h: 165, tilt: s2 * 0.16 });
                        if (checkAABB(dino, { x: this.cx()-140, y: this.baseY-20, w: 280, h: this.h+26 })) this.hurtP(2);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 84){ this._hb = false; this.toIdle(40); }
                    return;
                }
                if (st === 'c_roar'){
                    if (T(16)) floatingTexts.push(new FloatingText(this.cx() - 90, 132, "LÊN BỆ CAO!"));
                    if (T(74)){
                        shakeTimer = 70;
                        for (let k = 0; k < 14; k++)
                            visualEffects.push(new Effect(60 + k*70, 316, 'explosion', true, 36));
                        if ((dino.y + dino.h) > 300) this.hurtP(2);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 104) this.toIdle(44);
                    return;
                }
                if (st === 'c_rain'){
                    if (this.subTimer > 20 && this.subTimer < 108 && Math.floor(this.subTimer) % 10 === 0){
                        let mx = 40 + Math.random() * (canvas.width - 80);
                        let bp = new BossProjectile(mx, troiSinh(), (Math.random()-0.5)*2.4, troiVy(8, -30), false, 1);
                        bp.w = 30; bp.h = 30; bp.color = "#FF6D00"; bp.comet = true; bossProjectiles.push(bp);
                    }
                    if (this.subTimer > 126) this.toIdle(38);
                    return;
                }
                this.toIdle(36);
            }
            draw(){
                let chaos = this.phase === 2;
                // --- VUNG AN PHEP DUOI DAT CUA BLADE GEYSER ---
                if (this.geyser){
                    let g2 = this.geyser, k = Math.min(1, g2.t / 30);
                    ctx.save();
                    // Vong an phep rung ruc tren mat dat
                    ctx.globalAlpha = Math.max(0, 0.85 * (1 - k * 0.7));
                    let rg = ctx.createRadialGradient(g2.x, 318, 12, g2.x, 318, WR_GEY_W / 2);
                    rg.addColorStop(0, '#FFEA00'); rg.addColorStop(0.5, '#FF3D00'); rg.addColorStop(1, 'rgba(183,28,28,0)');
                    ctx.fillStyle = rg;
                    ctx.beginPath(); ctx.ellipse(g2.x, 318, WR_GEY_W / 2, 14, 0, 0, 6.28); ctx.fill();
                    // Cot hao quang boc len
                    ctx.globalAlpha = Math.max(0, 0.28 * (1 - k));
                    ctx.fillStyle = "#FF6D00";
                    ctx.fillRect(g2.x - WR_GEY_W/2, this.baseY - WR_GEY_UP, WR_GEY_W, this.h + WR_GEY_UP + 10);
                    ctx.restore();
                }

                // --- RUNG DAI KIEM CHAOSEATER KHONG LO DAM TU LONG DAT LEN (BLADE GEYSER NANG CAP) ---
                for (let b of this.blades){
                    let maxH = b.h || 155, tilt = b.tilt || 0;
                    if (b.t > 0){
                        // Vết nứt dung nham cảnh báo trên mặt đất trước khi kiếm đâm lên
                        let k = Math.max(0, Math.min(1, 1 - b.t / 22));
                        ctx.save();
                        ctx.globalAlpha = 0.35 + 0.55 * k;
                        ctx.fillStyle = "#FF3D00";
                        ctx.beginPath(); ctx.ellipse(b.x, 319, 24 * k + 6, 6, 0, 0, 6.28); ctx.fill();
                        ctx.strokeStyle = "#FFEA00"; ctx.lineWidth = 2;
                        ctx.beginPath(); ctx.moveTo(b.x - 16 * k, 319); ctx.lineTo(b.x, 319 - 28 * k); ctx.lineTo(b.x + 16 * k, 319); ctx.stroke();
                        ctx.restore();
                    } else {
                        // Thanh Đại Kiếm Chaoseater Khổng Lồ trồi vọt lên từ mặt đất kèm đất đá & lửa!
                        let progress = Math.min(1, (-b.t + 2) / 5);
                        let fade = Math.max(0, 1 + b.t / 30);
                        let curH = maxH * progress;
                        ctx.save();
                        ctx.globalAlpha = fade;
                        ctx.translate(b.x, 322);
                        ctx.rotate(tilt);

                        // Hao quang lua boc quanh than kiem
                        ctx.shadowColor = "#FF3D00"; ctx.shadowBlur = 14;
                        ctx.fillStyle = "rgba(255, 87, 34, 0.35)";
                        ctx.beginPath();
                        ctx.moveTo(-18, 0); ctx.lineTo(-14, -curH * 0.85); ctx.lineTo(0, -curH - 14);
                        ctx.lineTo(14, -curH * 0.85); ctx.lineTo(18, 0);
                        ctx.closePath(); ctx.fill();

                        // Than luoi kiem Chaoseater co gai rang cua
                        ctx.fillStyle = "#37474F";
                        ctx.beginPath();
                        ctx.moveTo(-13, 0);
                        ctx.lineTo(-15, -curH * 0.35); ctx.lineTo(-9, -curH * 0.42);
                        ctx.lineTo(-14, -curH * 0.68); ctx.lineTo(-8, -curH * 0.74);
                        ctx.lineTo(0, -curH); // Mui kiem sac nhon
                        ctx.lineTo(12, -curH * 0.78);
                        ctx.lineTo(13, 0);
                        ctx.closePath(); ctx.fill();

                        // Canh sac phat sang trang-vang
                        ctx.fillStyle = "#ECEFF1";
                        ctx.beginPath();
                        ctx.moveTo(2, 0); ctx.lineTo(0, -curH); ctx.lineTo(12, -curH * 0.78); ctx.lineTo(11, 0);
                        ctx.closePath(); ctx.fill();

                        // Ranh mau do + Hoa van Rune chay giua than kiem
                        ctx.fillStyle = "#FF3D00";
                        ctx.fillRect(-4, -curH * 0.78, 5, curH * 0.72);
                        ctx.fillStyle = "#FFEA00";
                        for (let r = 0; r < 3; r++){
                            ctx.fillRect(-3, -curH * (0.22 + r * 0.22), 3, 5);
                        }

                        // Đất đá vỡ ở gốc kiếm
                        ctx.rotate(-tilt);
                        ctx.fillStyle = "#3E2723";
                        ctx.beginPath(); ctx.moveTo(-20, 2); ctx.lineTo(-10, -14); ctx.lineTo(0, -4); ctx.lineTo(12, -16); ctx.lineTo(22, 2); ctx.closePath(); ctx.fill();
                        ctx.restore();
                    }
                }

                // --- CROSSBLADE dang bay (4 canh sac lem boc lua) ---
                for (let c of this.cross){
                    ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(c.spin);
                    ctx.shadowColor = "#FF6D00"; ctx.shadowBlur = 10;
                    ctx.fillStyle = c.back ? "#B0BEC5" : "#ECEFF1";
                    for (let k = 0; k < 4; k++){
                        ctx.save(); ctx.rotate(k * 1.57);
                        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-6, -22); ctx.lineTo(2, -17); ctx.lineTo(7, -22); ctx.closePath(); ctx.fill();
                        ctx.restore();
                    }
                    ctx.fillStyle = "#FF3D00"; ctx.beginPath(); ctx.arc(0, 0, 6, 0, 6.28); ctx.fill();
                    ctx.restore();
                }

                // --- Hon ma benh dich (Affliction) ---
                for (let s of this.spirits){
                    ctx.save();
                    ctx.globalAlpha = 0.65 + 0.25*Math.sin(s.w2);
                    ctx.shadowColor = "#76FF03"; ctx.shadowBlur = 10;
                    ctx.fillStyle = "#7CB342";
                    ctx.beginPath(); ctx.arc(s.x, s.y, 13, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#1B5E20";
                    ctx.beginPath(); ctx.arc(s.x - 4, s.y - 3, 3, 0, 6.28); ctx.arc(s.x + 4, s.y - 3, 3, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 0.35;
                    ctx.fillStyle = "#AED581";
                    ctx.beginPath(); ctx.arc(s.x - s.vx*3, s.y - s.vy*3, 9, 0, 6.28); ctx.fill();
                    ctx.restore();
                }

                // --- XICH VUC THAM (Abyssal Chain) ---
                if (this.chain){
                    let c = this.chain, ox = this.cx(), oy = this.cy();
                    let hx = ox + c.dir * c.len;
                    ctx.save();
                    ctx.shadowColor = "#00E5FF"; ctx.shadowBlur = 8;
                    ctx.strokeStyle = "#455A64"; ctx.lineWidth = 5;
                    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(hx, oy); ctx.stroke();
                    ctx.fillStyle = "#90A4AE";
                    for (let q = 0; q < Math.floor(c.len / 20); q++)
                        ctx.fillRect(ox + c.dir*q*20 - 4, oy - (q%2 ? 5 : 3), 9, q%2 ? 10 : 6);
                    // Mui lao moc câu Abyssal
                    ctx.fillStyle = "#00E5FF";
                    ctx.beginPath();
                    ctx.moveTo(hx + c.dir*20, oy); ctx.lineTo(hx - c.dir*8, oy - 14);
                    ctx.lineTo(hx - c.dir*3, oy); ctx.lineTo(hx - c.dir*8, oy + 14); ctx.closePath(); ctx.fill();
                    ctx.restore();
                }

                // --- STONESKIN / IMMOLATION ---
                if (this.stone > 0){
                    ctx.save();
                    ctx.globalAlpha = 0.34; ctx.fillStyle = "#795548";
                    ctx.fillRect(this.x - 5, this.y - 5, this.w + 10, this.h + 10);
                    ctx.globalAlpha = 0.9; ctx.strokeStyle = "#A1887F"; ctx.lineWidth = 3;
                    ctx.strokeRect(this.x - 5, this.y - 5, this.w + 10, this.h + 10);
                    ctx.restore();
                    ctx.fillStyle = "#D7CCC8"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("STONESKIN — DMG ×0.5", this.cx(), this.y - 32); ctx.textAlign = "left";
                }
                if (this.immo > 0){
                    ctx.save();
                    let pl = 0.5 + 0.5*Math.sin(frames*0.2);
                    ctx.globalAlpha = 0.16 + 0.12*pl; ctx.fillStyle = "#FF3D00";
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 96, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 0.85; ctx.strokeStyle = "#FFC107"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 96, 0, 6.28); ctx.stroke();
                    ctx.restore();
                }

                // --- BAO NHAT CHEM ---
                if (this.tel){
                    let t = this.tel, k = 1 - t.t/t.max;
                    let cxT = t.dir < 0 ? this.x : this.x + this.w, cyT = this.y + this.h/2;
                    ctx.save();
                    ctx.globalAlpha = 0.30 + 0.45*k;
                    ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3; ctx.lineCap = "round";
                    ctx.setLineDash([8, 7]); ctx.lineDashOffset = -frames*0.8;
                    ctx.beginPath(); ctx.arc(cxT, cyT, t.reach, t.dir<0 ? Math.PI-0.95 : -0.95, t.dir<0 ? Math.PI+0.95 : 0.95, false); ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.globalAlpha = 0.85; ctx.strokeStyle = "#FFCDD2"; ctx.lineWidth = 5;
                    let a0 = t.dir<0 ? Math.PI-0.95 : -0.95, a1 = t.dir<0 ? Math.PI+0.95 : 0.95;
                    ctx.beginPath(); ctx.arc(cxT, cyT, t.reach, a0, a0+(a1-a0)*k, false); ctx.stroke();
                    ctx.restore();
                }

                // --- THAN WAR ---
                if (chaos) drawChaosWar(this, this.x, this.y); else drawWarBody(this, this.x, this.y);

                // --- VET CHEM UY LUC CUA CHAOSEATER (Rực lửa cam-đỏ đậm chất Darksiders) ---
                if (this.slash){
                    let a = this.slash, cxS = a.dir < 0 ? this.x : this.x + this.w;
                    ctx.save();
                    ctx.globalAlpha = Math.min(1, a.t / 9);
                    ctx.shadowColor = "#FF3D00"; ctx.shadowBlur = 16;
                    ctx.strokeStyle = chaos ? "#FFEA00" : "#FF6D00"; ctx.lineWidth = 11; ctx.lineCap = "round";
                    for (let k = 0; k < 3; k++){
                        ctx.beginPath();
                        ctx.arc(cxS, this.y + this.h/2, Math.max(12, a.reach - k*20), a.dir<0 ? Math.PI-0.95 : -0.95, a.dir<0 ? Math.PI+0.95 : 0.95, false);
                        ctx.stroke();
                    }
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.arc(cxS, this.y + this.h/2, Math.max(12, a.reach - 4), a.dir<0 ? Math.PI-0.95 : -0.95, a.dir<0 ? Math.PI+0.95 : 0.95, false);
                    ctx.stroke();
                    ctx.restore();
                }

                // --- Thanh mau HUD ---
                ctx.fillStyle = chaos ? "#FFC107" : "#EF9A9A"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(chaos ? "CHAOS FORM" : (this.harv > 0 ? "THE HARVESTER" : "CHAOSEATER"), this.cx(), this.y - 18);
                drawTopBossBar(this, chaos ? "#FF6D00" : "#B71C1C", chaos ? "WAR — CHAOS FORM" : ("WAR — " + (this.harv > 0 ? "THE HARVESTER" : "REDIDER OF THE APOCALYPSE")));
                ctx.textAlign = "left";
            }
        }
// BOSS_PART_END s0.WarBoss.1

// Nguồn: index.html:12070 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_GAN.1 EDITABLE
const WR_GAN = [
            ['w_combo','w_tremor'], ['w_combo','w_harv'], ['w_rise','w_combo'], ['w_combo','w_song'], ['w_slice','w_tremor'],
            ['w_combo','w_geyser'], ['w_tremor','w_combo'], ['w_horn','w_combo'], ['w_cyclone','w_song'], ['w_harv'], ['w_combo','w_slice']
        ];
// BOSS_PART_END s0.WR_GAN.1

// Nguồn: index.html:12074 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_TIEP.1 EDITABLE
const WR_TIEP = [
            ['w_dash','w_combo'], ['w_chain','w_combo'], ['w_cross','w_dash','w_combo'], ['w_song','w_dash'], ['w_void','w_combo'],
            ['w_harv'], ['w_cross','w_chain','w_combo'], ['w_geyser','w_combo'], ['w_dash','w_tremor']
        ];
// BOSS_PART_END s0.WR_TIEP.1

// Nguồn: index.html:12078 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_XA.1 EDITABLE
const WR_XA = [
            ['w_chain','w_combo'], ['w_cross','w_void','w_combo'], ['w_ruin'], ['w_song','w_cross'], ['w_void','w_slice'],
            ['w_dash','w_combo'], ['w_cross','w_chain','w_combo'], ['w_song','w_dash','w_combo']
        ];
// BOSS_PART_END s0.WR_XA.1

// Nguồn: index.html:12082 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_KHONG.1 EDITABLE
const WR_KHONG = [['w_geyser'], ['w_cross','w_dash'], ['w_horn','w_combo'], ['w_rise'], ['w_cyclone'], ['w_chain','w_combo']];
// BOSS_PART_END s0.WR_KHONG.1

// Nguồn: index.html:12083 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_HV_GAN.1 EDITABLE
const WR_HV_GAN = [['h_combo','h_quet'], ['h_combo','h_len'], ['h_quet','h_combo'], ['h_combo','h_combo'], ['h_len','h_combo']];
// BOSS_PART_END s0.WR_HV_GAN.1

// Nguồn: index.html:12084 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_HV_XA.1 EDITABLE
const WR_HV_XA  = [['h_nem','h_luot','h_combo'], ['h_luot','h_combo'], ['h_luot','h_quet'], ['h_nem','h_luot']];
// BOSS_PART_END s0.WR_HV_XA.1

// Nguồn: index.html:12085 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_HV_KHONG.1 EDITABLE
const WR_HV_KHONG = [['h_len','h_combo'], ['h_nem'], ['h_quet']];
// BOSS_PART_END s0.WR_HV_KHONG.1

// Nguồn: index.html:12086 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_CH_GAN.1 EDITABLE
const WR_CH_GAN = [['c_sweep','c_cleave'], ['c_sweep','c_slam'], ['c_cleave','c_sweep'], ['c_sweep','c_nova'], ['c_nova','c_sweep'], ['c_sweep','c_roar']];
// BOSS_PART_END s0.WR_CH_GAN.1

// Nguồn: index.html:12087 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_CH_XA.1 EDITABLE
const WR_CH_XA  = [['c_slam','c_sweep'], ['c_rain','c_slam'], ['c_cleave','c_sweep'], ['c_rain','c_cleave'], ['c_roar','c_slam']];
// BOSS_PART_END s0.WR_CH_XA.1

// Nguồn: index.html:12088 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_CD.1 EDITABLE
const WR_CD = { w_ruin: 720, w_geyser: 300, w_horn: 300, w_void: 200, w_cross: 110, w_chain: 110, w_harv: 1200, w_cyclone: 160,
                        w_tremor: 170, w_rise: 150, w_song: 140, c_rain: 420, c_roar: 600, c_nova: 320, c_slam: 220 };
// BOSS_PART_END s0.WR_CD.1

// Nguồn: index.html:12090 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_VK_GAN.1 EDITABLE
const WR_VK_GAN = ['w_tremor', 'w_horn', 'w_song', 'w_geyser', 'w_harv'], WR_VK_XA = ['w_chain', 'w_cross', 'w_void', 'w_song'];
// BOSS_PART_END s0.WR_VK_GAN.1

// Nguồn: index.html:12091 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_HV_THOI.1 EDITABLE
const WR_HV_THOI = 600;
// BOSS_PART_END s0.WR_HV_THOI.1

// Nguồn: index.html:12092 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_MOI.1 EDITABLE
const WR_MOI = { w_combo: 1, w_slice: 1, w_rise: 1, w_cyclone: 1, w_dash: 1, w_tremor: 1, w_harv: 1, w_horn: 1, w_void: 1, w_block: 1, w_counter: 1,
                         w_geyser: 1, w_song: 1, h_combo: 1, h_quet: 1, h_nem: 1, h_len: 1, h_luot: 1 };
// BOSS_PART_END s0.WR_MOI.1

// Nguồn: index.html:12094 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_RUN_CU.1 EDITABLE
const WR_RUN_CU = WarBoss.prototype.runSkill, WR_UPD_CU = WarBoss.prototype.update, WR_UCH_CU = WarBoss.prototype.updateChaos,
              WR_RCH_CU = WarBoss.prototype.runChaos, WR_DRAW_CU = WarBoss.prototype.draw, WR_P2_CU = WarBoss.prototype.startPhase2;
// BOSS_PART_END s0.WR_RUN_CU.1

// Nguồn: index.html:12096 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WarBoss.prototype.aiRieng.1 EDITABLE
WarBoss.prototype.aiRieng = true;
// BOSS_PART_END s0.WarBoss.prototype.aiRieng.1

// Nguồn: index.html:12098 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.Object.assign.WarBoss.prototype.1 EDITABLE
Object.assign(WarBoss.prototype, {
            wrKhoi(){
                if (this._wrOk) return; this._wrOk = true;
                this.cd = {}; this.chuoi = []; this.noiThem = 0; this.trungLuc = -999; this.trungMove = '';
                this.dmgLog = []; this.breakCd = 150; this.wrathCd = 360; this.fire = []; this.pillars = [];
                this.horn = null; this.portal = null; this.an = false; this.spin = 0; this.armTo = null; this.telO = null; this.quet = null;
                this.harv = 0; this._ganNoi = false;
            },
            hurtP(n){
                if (dino.isShielding()){ parry(); return; }
                let h = dino.hp; dino.takeDamage(n);
                if (dino.hp < h){ this.trungLuc = frames; this.trungMove = this.state; }
            },
            toIdle(t){
                this.wrKhoi();
                let st = this.state;
                this.state = 'idle'; this.subTimer = 0; this.arm = this.harv > 0 ? 'scythe' : 'sword'; this.armR = 0; this.armL = 0;
                this.armTo = null; this.spin = 0; this.telO = null; this._chainSwung = 0; this._bay = false;
                if (this.phase === 1) this.wrNoi(st);
                if (this.chuoi.length && this.hp > 0){
                    this.actionTimer = this._ganNoi ? 2 : Math.max(4, Math.round(12 / this.spd())); this._ganNoi = false; return;
                }
                this.noiThem = 0;
                this.actionTimer = Math.max(8, Math.round(t / this.spd()));
            },
            wrNoi(st){
                let trung = (frames - (this.trungLuc || -999)) < 50 && this.trungMove === st;
                if (st === 'w_rise' && this._len){ this._len = false; this.chuoi.unshift('w_cyclone'); this._ganNoi = true; this._noiC = 'w_cyclone'; return; }
                if (!trung || (this.noiThem || 0) >= 1) return;
                let ke = null;
                if (st === 'w_combo') ke = Math.random() < 0.5 ? 'w_rise' : 'w_slice';
                else if (st === 'w_dash') ke = 'w_combo';
                else if (st === 'w_counter'){ let ds = ['w_tremor', 'w_horn', 'w_harv', 'w_song'].filter(v => this.wrDung(v)); ke = ds.length && Math.random() < 0.7 ? ds[Math.floor(Math.random() * ds.length)] : 'w_combo'; }
                else if (st === 'h_combo') ke = 'h_len';
                else if (st === 'h_luot') ke = 'h_combo';
                if (ke && this.harv > 0 && ke.startsWith('w_')) ke = 'h_combo';
                if (ke && this.chuoi[0] !== ke){ this.chuoi.unshift(ke); this.noiThem = 1; this._noiC = ke; }
            },
            wrDung(c){ return !((this.cd[c] || 0) > 0); },
            pickSkill(){
                this.wrKhoi();
                let c = null, kc = Math.abs(this.gap()), tren = !dino.grounded && (dino.y + dino.h) < 282;
                if (this.harv > 0 && this.chuoi.length && this.chuoi[0].startsWith('w_') && this.chuoi[0] !== 'w_harv') this.chuoi = [];
                if (this.harv <= 0 && this.chuoi.length && this.chuoi[0].startsWith('h_')) this.chuoi = [];
                if (this.chuoi.length) c = this.chuoi.shift();
                else if (this.harv > 0){
                    let bo = (tren && kc < 240) ? WR_HV_KHONG : kc > 200 ? WR_HV_XA : WR_HV_GAN;
                    this.chuoi = bo[Math.floor(Math.random() * bo.length)].slice(); c = this.chuoi.shift();
                }
                else {
                    if (this.wrathCd <= 0 && Math.random() < 0.55){
                        let w = [];
                        if (this.immo <= 0) w.push('w_immo');
                        if (this.stone <= 0 && this.hp < this.maxHp * 0.9) w.push('w_stone', 'w_stone');
                        if (this.spirits.length < 2 && kc > 150) w.push('w_afflict');
                        if (w.length){ c = w[Math.floor(Math.random() * w.length)]; this.wrathCd = 360; this.chuoi = [kc < 170 ? 'w_tremor' : 'w_chain']; }
                    }
                    if (!c){
                        let bo = (tren && kc < 260) ? WR_KHONG : kc > 330 ? WR_XA : kc > 170 ? WR_TIEP : WR_GAN;
                        let ch = bo[Math.floor(Math.random() * bo.length)];
                        if (ch[0] === this._chDau) ch = bo[Math.floor(Math.random() * bo.length)];
                        this._chDau = ch[0];
                        this.chuoi = ch.slice(); c = this.chuoi.shift();
                    }
                }
                let noi = this._noiC === c; this._noiC = null;
                if (!noi && !this.wrDung(c)){
                    let ds = (kc < 170 ? WR_VK_GAN : WR_VK_XA).filter(v => this.wrDung(v) && v !== c);
                    c = ds.length ? ds[Math.floor(Math.random() * ds.length)] : (kc < 170 ? 'w_combo' : 'w_dash');
                }
                if (c === 'w_immo' && this.immo > 0) c = 'w_combo';
                if (c === 'w_stone' && this.stone > 0) c = 'w_combo';
                if (c === 'w_harv' && this.harv > 0) c = 'h_combo';
                if (WR_CD[c] && !noi) this.cd[c] = WR_CD[c];
                this.state = c; this.subTimer = 0; this.combo = 0; this.faceP();
            },
            wrChonChaos(){
                let c = null, kc = Math.abs(this.gap());
                if (this.chuoi.length) c = this.chuoi.shift();
                else {
                    let bo = kc > 300 ? WR_CH_XA : WR_CH_GAN;
                    let ch = bo[Math.floor(Math.random() * bo.length)];
                    if (ch[0] === this._chDau) ch = bo[Math.floor(Math.random() * bo.length)];
                    this._chDau = ch[0];
                    this.chuoi = ch.slice(); c = this.chuoi.shift();
                }
                if (!this.wrDung(c)) c = kc > 260 ? 'c_cleave' : 'c_sweep';
                if (WR_CD[c]) this.cd[c] = WR_CD[c];
                this.state = c; this.subTimer = 0; this._hb = false; this.faceP();
            },
            update(){
                this.wrKhoi();
                this.wrTick();
                WR_UPD_CU.call(this);
            },
            wrTick(){
                for (const k in this.cd) if (this.cd[k] > 0) this.cd[k]--;
                if (this.harv > 0 && --this.harv === 0){
                    if (this.state === 'idle') this.arm = 'sword';
                    if (this.phase === 1) floatingTexts.push(new FloatingText(this.x - 14, this.y - 34, 'CHAOSEATER'));
                }
                if (this.wrathCd > 0) this.wrathCd--;
                if (this.breakCd > 0) this.breakCd--;
                if (this.armTo != null) this.armR += (this.armTo - this.armR) * 0.3;
                if (this.telO && --this.telO.t <= 0) this.telO = null;
                let pcx = dino.x + dino.w / 2, pcy = dino.y + dino.h / 2;
                if (this.horn){
                    let h = this.horn; h.r += 9;
                    let dx = pcx - h.x, dy = pcy - h.y, d = Math.sqrt(dx * dx + dy * dy);
                    if (!h.hit && Math.abs(d - h.r) < 24){ h.hit = true; let sh = dino.isShielding(); this.hurtP(1); this._day = { v: (dx < 0 ? -1 : 1) * (sh ? 6 : 11), t: 10 }; }
                    for (let pi = projectiles.length - 1; pi >= 0; pi--){
                        let pr = projectiles[pi]; if (!pr || pr.owner !== 1) continue;
                        let qx = pr.x + (pr.w || 0) / 2 - h.x, qy = pr.y + (pr.h || 0) / 2 - h.y;
                        if (Math.abs(Math.sqrt(qx * qx + qy * qy) - h.r) < 26){ visualEffects.push(new Effect(pr.x, pr.y, 'explosion', true, 10)); projectiles.splice(pi, 1); }
                    }
                    if (h.r > h.max) this.horn = null;
                }
                if (this._day){
                    dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x + this._day.v)); this._day.v *= 0.85;
                    if (--this._day.t <= 0) this._day = null;
                }
                if (this.quet){
                    let q = this.quet; q.t--;
                    let dx = pcx - this.cx(), dy = pcy - this.cy();
                    if (!q.hit && dx * dx + dy * dy < WR_LIEM_R * WR_LIEM_R){ q.hit = true; this.hurtP(1); }
                    if (q.t <= 0) this.quet = null;
                }
                for (let i = this.pillars.length - 1; i >= 0; i--){
                    let p = this.pillars[i];
                    if (p.t > 0){
                        if (--p.t === 0){ shakeTimer = Math.max(shakeTimer, 10); visualEffects.push(new Effect(p.x, 316, 'explosion', true, 30)); if (SFX.tone) SFX.tone(120, 0.08, 'sawtooth', 0.10, 60); }
                        continue;
                    }
                    p.life--;
                    if (!p.hit && checkAABB(dino, { x: p.x - 22, y: 320 - WR_COT_H, w: 44, h: WR_COT_H })){ p.hit = true; this.hurtP(1); }
                    if (p.life <= 0) this.pillars.splice(i, 1);
                }
                for (let i = this.fire.length - 1; i >= 0; i--){
                    let f = this.fire[i]; f.t--;
                    if (f.t % 30 === 0 && checkAABB(dino, { x: f.x - f.w / 2, y: 298, w: f.w, h: 24 })) this.hurtP(1);
                    if (f.t <= 0) this.fire.splice(i, 1);
                }
                if (this.portal && ++this.portal.t > 80) this.portal = null;
                if (this.ruin && this.state !== 'w_ruin') this.ruin = null;
                if (this.ruin){
                    this.arm = 'mercy'; this.facingLeft = this.ruin.v < 0;
                    let d = this.ruin.v < 0 ? -1 : 1, sx = this.cx() + d * 20, sy = this.y - 8;
                    let dx = pcx - sx, dy = pcy - sy;
                    if (dx * d > 30){
                        let a = Math.atan2(dy, dx * d);
                        this.armR = Math.max(-2.6, Math.min(-0.5, a - Math.PI / 2));
                        if (frames % 16 === 0){
                            let wa = Math.atan2(dy, dx);
                            let bp = new BossProjectile(sx + Math.cos(wa) * 44 - 6, sy + Math.sin(wa) * 44 - 3, Math.cos(wa) * 14, Math.sin(wa) * 14, false, 1);
                            bp.w = 12; bp.h = 6; bp.color = '#FFD54F'; bp.frail = true; bossProjectiles.push(bp);
                            visualEffects.push(new Effect(sx + Math.cos(wa) * 44, sy + Math.sin(wa) * 44, 'explosion', true, 8));
                            if (SFX.tone) SFX.tone(880, 0.04, 'square', 0.09, 420);
                        }
                    } else this.armR = -1.5;
                }
                let mat = (this._hpTruoc == null ? this.hp : this._hpTruoc) - this.hp; this._hpTruoc = this.hp;
                if (mat > 0) this.dmgLog.push({ f: frames, d: mat });
                while (this.dmgLog.length && frames - this.dmgLog[0].f > 48) this.dmgLog.shift();
                if (this.phase === 1 && !this.invulnAll && this.breakCd <= 0 && !this.ruin && !this.an && this.grounded){
                    let ranh = this.state === 'idle' || (this.state === 'w_combo' && this.subTimer < 30) || this.state === 'w_cross' || (this.state === 'w_dash' && this.subTimer < 14);
                    let tong = 0; for (const e of this.dmgLog) tong += e.d;
                    if (ranh && tong >= 4) this.batChan();
                }
            },
            batChan(){
                this.slash = null; this.tel = null; this.chain = null; this._chainSwung = 0; this.geyser = null; this.telO = null;
                this.state = 'w_block'; this.subTimer = 0; this.faceP(); this.arm = 'block'; this.armTo = null; this.armR = -1.25;
                this.breakCd = 380; this.dmgLog.length = 0; this.daChan = 0;
                this.chuoi = ['w_counter']; this.noiThem = 0;
                floatingTexts.push(new FloatingText(this.x - 8, this.y - 34, 'BLOCK!'));
                if (SFX.tone) SFX.tone(700, 0.05, 'square', 0.10, 400);
            },
            anDon(){
                if (this.phase !== 1 || this.state !== 'w_block' || this.subTimer < 2) return false;
                if (frames - (this._chanKhung || -9) > 3){
                    this._chanKhung = frames; this.daChan = (this.daChan || 0) + 1;
                    visualEffects.push(new Effect(this.cx() + this.dir() * 26, this.cy() - 10, 'parry', this.dir() < 0));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1400, 0.04, 'square', 0.09, 900);
                }
                return true;
            },
            runSkill(){
                if (!WR_MOI[this.state]) return WR_RUN_CU.call(this);
                this.wrChay();
            },
            wrChay(){
                let st = this.state, sp = this.spd() * (this.state.startsWith('h_') ? 1.2 : 1); this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;
                let du = (n) => this.dir() * n;
                // ===== BLOCK =====
                if (st === 'w_block'){
                    this.arm = 'block'; this.armR = -1.25; this.dashV = 0;
                    if (this.subTimer > 30) this.toIdle(4);
                    return;
                }
                // ===== COUNTER =====
                if (st === 'w_counter'){
                    this.arm = 'sword';
                    if (T(2)){ this.faceP(); this.warn(150, 36, 8); this.armTo = -2.4; }
                    if (T(10)){
                        this.armTo = null; this.armR = -0.15; this.doSlash(150, 36, 12, 1); this.dashV = du(12);
                        shakeTimer = Math.max(shakeTimer, 16);
                        floatingTexts.push(new FloatingText(this.x - 12, this.y - 34, 'RETALIATION!'));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (T(14) && this.trungMove === 'w_counter' && frames - this.trungLuc < 6) this._day = { v: du(10), t: 10 };
                    if (this.subTimer > 36) this.toIdle(22);
                    return;
                }
                // ===== COMBO CHAOSEATER 4 NHAT NANG =====
                if (st === 'w_combo'){
                    this.arm = 'sword';
                    const H = [14, 29, 45, 68], W = [8, 8, 10, 16], R = [122, 122, 130, 154], U = [18, 18, 38, 44];
                    const A0 = [-2.3, -0.2, 0.5, -2.7], A1 = [-0.3, -2.1, -2.5, -0.05];
                    if (this.subTimer < 62){ let g = this.gap(); if (Math.abs(g) > 84) this.x += Math.sign(g) * 2.8 * sp; }
                    for (let k = 0; k < 4; k++){
                        if (T(H[k] - W[k])){ this.faceP(); this.warn(R[k], U[k], W[k]); this.armTo = A0[k]; }
                        if (T(H[k])){
                            this.faceP(); this.armTo = null; this.armR = A1[k];
                            let big = k === 3;
                            this.doSlash(R[k], U[k], big ? 14 : 9, big ? 2 : 1);
                            this.dashV = du(big ? 11 : 5.5);
                            if (big){
                                shakeTimer = Math.max(shakeTimer, 28);
                                visualEffects.push(new Effect(this.cx() + du(70), 318, 'explosion', true, 48));
                                this.wave(this.dir(), 9, 60, 1);
                                if (SFX.bossExplode) SFX.bossExplode();
                            } else if (SFX.tone) SFX.tone(260 - k * 30, 0.08, 'square', 0.13, 140);
                        }
                    }
                    if (this.subTimer > 84) this.toIdle(30);
                    return;
                }
                // ===== SLICE AND DICE =====
                if (st === 'w_slice'){
                    this.arm = 'sword';
                    if (T(3)){ this.faceP(); this.warn(116, 24, 18); this.armTo = -1.9; floatingTexts.push(new FloatingText(this.x - 20, this.y - 34, 'SLICE & DICE')); }
                    if (this.subTimer >= 21 && this.subTimer < 58){
                        let nh = Math.floor(this.subTimer / 5);
                        if (nh !== Math.floor((this.subTimer - sp) / 5)){ this.armTo = null; this.armR = nh % 2 ? -2.3 : -0.1; this.dashV = du(3.6); if (SFX.tone) SFX.tone(420 + (nh % 3) * 60, 0.03, 'square', 0.07, 260); }
                    }
                    if (T(21) || T(33) || T(45)){ this.faceP(); this.doSlash(116, 24, 8, 1); }
                    if (T(60)){ this.faceP(); this.warn(146, 42, 12); this.armTo = -2.6; }
                    if (T(72)){
                        this.armTo = null; this.armR = -0.1; this.doSlash(146, 42, 12, 1); this.dashV = du(10);
                        shakeTimer = Math.max(shakeTimer, 18); if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 92) this.toIdle(30);
                    return;
                }
                // ===== RISING BLADE =====
                if (st === 'w_rise'){
                    this.arm = 'sword';
                    if (T(3)){ this.faceP(); this.warn(104, 96, 13); this.armTo = 0.6; this._len = false; }
                    if (T(16)){
                        this.armTo = null; this.armR = -2.8; this.doSlash(108, 100, 12, 1); this.dashV = du(4);
                        if (SFX.tone) SFX.tone(240, 0.1, 'sawtooth', 0.12, 520);
                    }
                    if (T(21) && this.trungMove === 'w_rise' && frames - this.trungLuc < 7){
                        dino.dy = -13; dino.grounded = false; this._len = true;
                        floatingTexts.push(new FloatingText(this.x - 18, this.y - 34, 'RISING STRIKE!'));
                        this.toIdle(2); return;
                    }
                    if (this.subTimer > 40) this.toIdle(28);
                    return;
                }
                // ===== [NÂNG CẤP] SAWBLADE CYCLONE: Nhảy lên xoay thanh Chaoseater thành bánh xe cưa lửa 360 độ rồi bổ sầm xuống =====
                if (st === 'w_cyclone'){
                    this.arm = 'sword';
                    if (T(2)){
                        this.faceP(); this.armTo = -1.6;
                        this.dy = -14; this.grounded = false; this._bay = true;
                        floatingTexts.push(new FloatingText(this.x - 18, this.y - 34, 'SAWBLADE CYCLONE!'));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this._bay){
                        // Thanh Chaoseater quay 360 độ mượt mà quanh thân War (không còn giật lật mặt trái-phải)
                        this.spin = (this.spin || 0) + 0.48 * sp;
                        this.armTo = null; this.armR = -1.5;
                        let g = this.gap(); if (Math.abs(g) > 16) this.x += Math.sign(g) * 4.0 * sp;
                        let dx = pcxOf() - this.cx(), dy = (dino.y + dino.h / 2) - this.cy();
                        if (dx * dx + dy * dy < WR_XOAY_R * WR_XOAY_R && frames - (this._xoayHit || -99) > 18){
                            this._xoayHit = frames; this.hurtP(1);
                            visualEffects.push(new Effect(pcxOf(), dino.y + dino.h/2, 'explosion', true, 18));
                        }
                        if (frames % 5 === 0){
                            let sa = this.spin;
                            visualEffects.push(new Effect(this.cx() + Math.cos(sa)*76, this.cy() + Math.sin(sa)*76, 'explosion', true, 12));
                            if (SFX.tone) SFX.tone(320, 0.04, 'sawtooth', 0.07, 190);
                        }
                        if (T(32)) this.dy = Math.max(this.dy, 16); // Bổ thẳng từ trên không xuống
                        if (this.subTimer > 10 && this.grounded){
                            this._bay = false; this.spin = 0; this.faceP(); this.armR = 0.1;
                            this.doSlash(138, 34, 14, 1);
                            shakeTimer = Math.max(shakeTimer, 24);
                            visualEffects.push(new Effect(this.cx() + du(46), this.y + this.h, 'explosion', true, 54));
                            this.wave(this.dir(), 9.5, 62, 1);
                            if (SFX.bossExplode) SFX.bossExplode();
                            this.subTimer = Math.max(this.subTimer, 60);
                        }
                    }
                    if (this.subTimer > 84){ this._bay = false; this.spin = 0; this.toIdle(30); }
                    return;
                }
                // ===== HARBINGER DASH (Lao đâm đại kiếm) =====
                if (st === 'w_dash'){
                    this.arm = 'sword';
                    if (T(2)){ this.faceP(); this.warn(104, 14, 14); this.armTo = 0.9; floatingTexts.push(new FloatingText(this.x - 16, this.y - 34, 'HARBINGER!')); }
                    if (T(16)){ this.dashV = du(28); this.armTo = null; this.armR = -0.47; this._dashHit = false; if (SFX.tone) SFX.tone(180, 0.1, 'sawtooth', 0.12, 90); }
                    if (this.subTimer >= 16 && this.subTimer < 32){
                        this.armR = -0.47;
                        if (frames % 2 === 0) visualEffects.push(new Effect(this.cx() - du(20), this.y + this.h - 8, 'explosion', true, 12));
                        let hop = { x: this.dir() > 0 ? this.x + this.w - 6 : this.x - 88, y: this.y + 16, w: 94, h: 48 };
                        if (!this._dashHit && (checkAABB(dino, hop) || checkAABB(dino, this))){ this._dashHit = true; this.hurtP(1); }
                    }
                    if (this.subTimer > 44) this.toIdle(16);
                    return;
                }
                // ===== [NÂNG CẤP] BLADE GEYSER: Nhảy cao lộn vòng, CẮM NGẬP CHAOSEATER xuống đất -> Rừng đại kiếm khổng lồ đâm vọt lên =====
                if (st === 'w_geyser'){
                    this.arm = 'sword';
                    if (T(3)){
                        this.faceP(); this.armTo = 0.6;
                        floatingTexts.push(new FloatingText(this.x - 24, this.y - 36, 'BLADE GEYSER!'));
                    }
                    if (T(14)){
                        this.dy = -15.5; this.grounded = false; this._bay = true; this.geyser = null;
                        let g = this.gap(); this.dashV = Math.sign(g) * Math.min(11, Math.abs(g) / 10);
                        if (SFX.tone) SFX.tone(200, 0.2, 'sawtooth', 0.12, 600);
                    }
                    if (this._bay){
                        if (this.subTimer < 32){
                            this.spin = (this.spin || 0) + 0.52 * sp;
                            this.armR = -1.55;
                        }
                        if (T(32)){
                            // Chổng ngược mũi kiếm Chaoseater thẳng đứng xuống mặt đất và lao sầm xuống!
                            this.faceP(); this.dy = 21; this.armTo = null; this.armR = 0.95; this.spin = 0;
                        }
                        if (this.subTimer > 18 && this.grounded){
                            this._bay = false; this.armR = 0.95;
                            shakeTimer = Math.max(shakeTimer, 50);
                            this.geyser = { t: 0, x: this.cx() };
                            this._geyNo = this.subTimer + 8;
                            // Triệu hồi 11 thanh đại kiếm Chaoseater khổng lồ đâm chéo từ tâm ra 2 bên
                            for (let k = -5; k <= 5; k++){
                                let distRatio = 1 - Math.abs(k) * 0.08;
                                this.blades.push({
                                    x: this.cx() + k * (WR_GEY_W / 10.5),
                                    t: 4 + Math.abs(k) * 2,
                                    h: Math.round(170 * distRatio),
                                    tilt: k * 0.055 // Các thanh kiếm tỏa hình rẻ quạt cực ngầu
                                });
                            }
                            visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 88));
                            if (SFX.bossExplode) SFX.bossExplode();
                        }
                    }
                    if (this._geyNo && this.subTimer >= this._geyNo){
                        this._geyNo = 0;
                        let r = { x: this.geyser.x - WR_GEY_W / 2, y: this.baseY - WR_GEY_UP, w: WR_GEY_W, h: this.h + WR_GEY_UP + 10 };
                        if (checkAABB(dino, r)) this.hurtP(2);
                    }
                    if (this.geyser) this.geyser.t++;
                    if ((this.geyser && this.geyser.t > 44) || this.subTimer > 130){
                        this.geyser = null; this._geyNo = 0; this._bay = false; this.toIdle(40);
                    }
                    return;
                }
                // ===== TITAN FLAME WAVE (Bổ kiếm sóng kích lửa) =====
                if (st === 'w_song'){
                    this.arm = 'sword';
                    if (T(3)){ this.faceP(); this.warn(124, 42, 20); this.armTo = -2.8; floatingTexts.push(new FloatingText(this.x - 18, this.y - 34, 'TITAN CLEAVE!')); }
                    if (T(24)){
                        this.armTo = null; this.armR = 0.25; this.doSlash(124, 42, 12, 1);
                        shakeTimer = Math.max(shakeTimer, 30);
                        visualEffects.push(new Effect(this.cx() + du(80), 316, 'explosion', true, 54));
                        let bp = new BossProjectile(this.cx() + du(70) - 20, 320 - 92, du(9.8), 0, true, 1);
                        bp.w = 42; bp.h = 92; bp.isPiercing = true; bp.color = '#FF5252'; bp.veRieng = veSongKiem;
                        bossProjectiles.push(bp);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 52) this.toIdle(28);
                    return;
                }
                // ===== HARVESTER =====
                if (st === 'w_harv'){
                    this.arm = 'scythe';
                    if (T(3)){
                        this.harv = WR_HV_THOI; this.armTo = -2.6; this.chuoi = [];
                        floatingTexts.push(new FloatingText(this.x - 14, this.y - 34, 'THE HARVESTER!'));
                        visualEffects.push(new Effect(this.cx() + du(20), this.y + 30, 'explosion', true, 26));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 22) this.toIdle(6);
                    return;
                }
                if (st === 'h_combo'){
                    this.arm = 'scythe';
                    const H = [9, 18, 27, 40];
                    let g = this.gap(); if (Math.abs(g) > 70 && this.subTimer < 36) this.x += Math.sign(g) * 3.4 * sp;
                    for (let k = 0; k < 4; k++){
                        if (T(H[k] - 7)){ this.faceP(); this.warn(k === 3 ? 120 : 100, k === 3 ? 30 : 18, 7); this.armTo = k % 2 ? 0.4 : -2.6; }
                        if (T(H[k])){
                            this.faceP(); this.armTo = null; this.armR = k % 2 ? -2.4 : 0.1;
                            this.doSlash(k === 3 ? 120 : 100, k === 3 ? 30 : 18, 8, 1); this.dashV = du(k === 3 ? 8 : 4);
                            if (SFX.tone) SFX.tone(600 - k * 50, 0.05, 'square', 0.1, 280);
                        }
                    }
                    if (this.subTimer > 54) this.toIdle(20);
                    return;
                }
                if (st === 'h_quet'){
                    this.arm = 'scythe';
                    if (T(3)){ this.faceP(); this.telO = { r: WR_LIEM_R, t: 14, max: 14 }; this.armTo = -2.7; }
                    if (T(17) || T(33)){
                        this.armTo = null; this.armR = 0.3; this.quet = { t: 8, hit: false };
                        this.facingLeft = !this.facingLeft;
                        if (SFX.tone) SFX.tone(520, 0.06, 'sawtooth', 0.1, 240);
                    }
                    if (T(22)){ this.armTo = -2.7; }
                    if (this.subTimer > 50) this.toIdle(22);
                    return;
                }
                if (st === 'h_nem'){
                    this.arm = 'scythe';
                    if (T(3)){ this.faceP(); this.armTo = -2.6; this.warn(60, 10, 12); }
                    if (T(15)){
                        this.faceP(); this.armTo = null; this.armR = -1.4;
                        let a = Math.atan2((dino.y + dino.h / 2) - this.cy(), pcxOf() - this.cx());
                        let bp = new BossProjectile(this.cx() + du(30) - 22, this.cy() - 30, Math.cos(a) * 10, Math.sin(a) * 10, false, 1);
                        bp.w = 44; bp.h = 44; bp.isPiercing = true; bp.frail = true; bp.color = '#B0BEC5'; bp.veRieng = veLiemBay;
                        bossProjectiles.push(bp);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 36) this.toIdle(18);
                    return;
                }
                if (st === 'h_len'){
                    this.arm = 'scythe';
                    if (T(3)){ this.faceP(); this.warn(100, 116, 10); this.armTo = 0.5; }
                    if (T(13)){ this.armTo = null; this.armR = -2.9; this.doSlash(104, 118, 10, 1); this.dashV = du(3); if (SFX.tone) SFX.tone(300, 0.08, 'sawtooth', 0.1, 700); }
                    if (this.subTimer > 36) this.toIdle(20);
                    return;
                }
                if (st === 'h_luot'){
                    this.arm = 'scythe';
                    if (T(3)){ this.faceP(); this.warn(80, 20, 9); this.armTo = 0.6; }
                    if (T(12)){ this.dashV = du(22); this._dashHit = false; }
                    if (this.subTimer >= 12 && this.subTimer < 26){
                        this.armR = -1.5 + Math.sin(this.subTimer) * 1.2;
                        if (!this._dashHit && checkAABB(dino, { x: this.x - 30, y: this.y + 10, w: this.w + 60, h: this.h - 10 })){ this._dashHit = true; this.hurtP(1); }
                    }
                    if (this.subTimer > 34) this.toIdle(12);
                    return;
                }
                // ===== TREMOR GAUNTLET =====
                if (st === 'w_tremor'){
                    this.arm = 'gauntlet';
                    if (T(3)){ this.faceP(); this.armTo = 0.9; floatingTexts.push(new FloatingText(this.x - 26, this.y - 34, 'TREMOR GAUNTLET!')); }
                    if (this.subTimer > 4 && this.subTimer < 48 && frames % 4 === 0)
                        visualEffects.push(new Effect(this.cx() + du(22), this.y + 56, 'explosion', true, 8 + this.subTimer * 0.2));
                    if (T(40)){ this.faceP(); this.warn(110, 26, 12); }
                    if (T(52)){ this.armTo = null; this.armR = -1.6; this.dashV = du(18); this.doSlash(100, 26, 10, 2); if (SFX.bossSkill) SFX.bossSkill(); }
                    if (T(60)){
                        this.armR = -0.6; shakeTimer = Math.max(shakeTimer, 40);
                        visualEffects.push(new Effect(this.cx() + du(60), this.y + this.h, 'explosion', true, 80));
                        this.wave(-1, 10.5, 76, 1); this.wave(1, 10.5, 76, 1);
                        if (dino.grounded && checkAABB(dino, { x: this.cx() - 120, y: this.baseY - 10, w: 240, h: this.h + 14 })) this.hurtP(1);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 92) this.toIdle(34);
                    return;
                }
                // ===== EARTHCALLER =====
                if (st === 'w_horn'){
                    this.arm = 'horn'; this.armR = -2.5;
                    if (T(3)){ this.faceP(); floatingTexts.push(new FloatingText(this.x - 20, this.y - 34, 'EARTHCALLER!')); this.telO = { r: 60, t: 22, max: 22 }; }
                    if (T(26)){
                        this.horn = { x: this.cx(), y: this.cy(), r: 30, max: 320, hit: false };
                        shakeTimer = Math.max(shakeTimer, 24);
                        if (SFX.tone){ SFX.tone(110, 0.5, 'sawtooth', 0.14, 90); SFX.tone(165, 0.5, 'square', 0.08, 140); }
                    }
                    if (this.subTimer > 58) this.toIdle(24);
                    return;
                }
                // ===== VOIDWALKER =====
                if (st === 'w_void'){
                    if (T(3)){ this.faceP(); this.arm = 'void'; this.armTo = -1.5; }
                    if (T(14)){
                        let pc = pcxOf(), s = pc > this.cx() ? 1 : -1;
                        let bx = Math.max(40, Math.min(canvas.width - 40, pc + s * 80));
                        this.portal = { ax: this.cx(), bx: bx, t: 0 };
                        if (SFX.tone) SFX.tone(640, 0.12, 'sine', 0.1, 1200);
                    }
                    if (T(26) && this.portal){ this.an = true; this.invulnAll = true; this.slash = null; this.tel = null; }
                    if (T(42) && this.portal){
                        this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.portal.bx - this.w / 2));
                        this.y = this.baseY; this.dy = 0; this.an = false; this.invulnAll = false; this.faceP(); this.arm = 'sword';
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 24));
                    }
                    if (this.subTimer > 50){ this.an = false; this.invulnAll = false; this.toIdle(6); }
                    return;
                }
                this.toIdle(30);
            },
            updateChaos(){
                if (this.state === 'chaos_wake') return WR_UCH_CU.call(this);
                if (this.state === 'idle'){
                    this.faceP();
                    { let tr = this.x; bossVaoTam(this, 80, 150, 6.6); this.walk += Math.abs(this.x - tr); }
                    this.actionTimer--;
                    if (this.actionTimer <= 0) this.wrChonChaos();
                    return;
                }
                this.runChaos();
            },
            runChaos(){
                if (this.state !== 'c_sweep' && this.state !== 'c_cleave') return WR_RCH_CU.call(this);
                let st = this.state, sp = this.spd(); this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;
                let du = (n) => this.dir() * n;
                if (st === 'c_sweep'){
                    const H = [18, 42, 72], W = [12, 12, 18], R = [170, 170, 210], U = [48, 48, 70];
                    const A0 = [-2.4, 0.4, -2.8], A1 = [0.2, -2.3, 0.1];
                    if (this.subTimer < 64){ let g = this.gap(); if (Math.abs(g) > 110) this.x += Math.sign(g) * 3 * sp; }
                    for (let k = 0; k < 3; k++){
                        if (T(H[k] - W[k])){ this.faceP(); this.warn(R[k], U[k], W[k]); this.armTo = A0[k]; }
                        if (T(H[k])){
                            this.faceP(); this.armTo = null; this.armR = A1[k];
                            let big = k === 2;
                            this.doSlash(R[k], U[k], 14, big ? 2 : 1); this.dashV = du(big ? 12 : 7);
                            shakeTimer = Math.max(shakeTimer, big ? 30 : 18);
                            if (big){
                                for (let q = 0; q < 2; q++) this.fire.push({ x: this.cx() + du(90 + q * 90), w: 88, t: 150 });
                                visualEffects.push(new Effect(this.cx() + du(120), 314, 'explosion', true, 60));
                                if (SFX.bossExplode) SFX.bossExplode();
                            } else if (SFX.bossSkill) SFX.bossSkill();
                        }
                    }
                    if (this.subTimer > 96) this.toIdle(26);
                    return;
                }
                if (st === 'c_cleave'){
                    if (T(4)){ this.faceP(); this.armTo = -2.9; this.warn(150, 60, 22); }
                    if (T(26)){
                        this.armTo = null; this.armR = 0.15; this.doSlash(150, 60, 12, 2);
                        shakeTimer = Math.max(shakeTimer, 40);
                        visualEffects.push(new Effect(this.cx() + du(80), 316, 'explosion', true, 70));
                        for (let i = 1; i <= 7; i++){
                            let px = this.cx() + du(70 + i * 70);
                            if (px < 10 || px > canvas.width - 10) break;
                            this.pillars.push({ x: px, t: 8 + i * 7, life: 24, hit: false });
                        }
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 74) this.toIdle(30);
                    return;
                }
            },
            startPhase2(){
                WR_P2_CU.call(this);
                this.wrKhoi();
                this.chuoi = []; this.noiThem = 0; this.fire.length = 0; this.pillars.length = 0; this.horn = null; this.portal = null;
                this.an = false; this.spin = 0; this.armTo = null; this.telO = null; this.quet = null; this._bay = false; this._quake = false; this._day = null;
                this.harv = 0; this._geyNo = 0; this._len = false;
                this.arm = 'sword'; this.armR = 0;
            },
            draw(){
                this.wrKhoi();
                this.wrVeDuoi();
                if (this.ruin){ this.y -= 34; WR_DRAW_CU.call(this); this.y += 34; veRuin(this); }
                else WR_DRAW_CU.call(this);
                this.wrVeTren();
            },
            wrVeDuoi(){
                ctx.save();
                if (this.portal){
                    let P = this.portal, k = Math.min(1, P.t / 10) * (P.t > 64 ? Math.max(0, (80 - P.t) / 16) : 1);
                    for (const [px, mau] of [[P.ax, '#40C4FF'], [P.bx, '#FF9100']]){
                        ctx.globalAlpha = 0.9 * k; ctx.strokeStyle = mau; ctx.lineWidth = 5;
                        ctx.beginPath(); ctx.ellipse(px, 272, 22 * k, 48, 0, 0, 6.28); ctx.stroke();
                        ctx.globalAlpha = 0.3 * k; ctx.fillStyle = mau;
                        ctx.beginPath(); ctx.ellipse(px, 272, 20 * k, 45, 0, 0, 6.28); ctx.fill();
                    }
                }
                for (const f of this.fire){
                    let a = Math.min(1, f.t / 30);
                    ctx.globalAlpha = 0.35 * a; ctx.fillStyle = '#FF3D00';
                    ctx.beginPath(); ctx.ellipse(f.x, 318, f.w / 2, 7, 0, 0, 6.28); ctx.fill();
                    for (let k = 0; k < 6; k++){
                        let fx = f.x - f.w / 2 + 8 + k * (f.w - 16) / 5, hh = (14 + 9 * Math.sin(frames * 0.35 + k * 2 + f.x)) * a;
                        ctx.globalAlpha = 0.8 * a; ctx.fillStyle = k % 2 ? '#FF6D00' : '#FFC107';
                        ctx.beginPath(); ctx.moveTo(fx - 6, 320); ctx.lineTo(fx, 320 - hh); ctx.lineTo(fx + 6, 320); ctx.closePath(); ctx.fill();
                    }
                }
                for (const p of this.pillars){
                    if (p.t > 0){
                        ctx.globalAlpha = 0.3 + 0.4 * (1 - Math.min(1, p.t / 30)); ctx.fillStyle = '#FF6D00';
                        ctx.beginPath(); ctx.ellipse(p.x, 318, 22, 6, 0, 0, 6.28); ctx.fill();
                    }
                }
                if (this.state === 'w_geyser' && this._bay){
                    let gx = this.cx();
                    ctx.globalAlpha = 0.24 + 0.16 * Math.sin(frames * 0.4); ctx.fillStyle = '#FF3D00';
                    ctx.fillRect(gx - WR_GEY_W / 2, 310, WR_GEY_W, 12);
                    ctx.globalAlpha = 0.85; ctx.strokeStyle = '#FFEA00'; ctx.lineWidth = 2.5; ctx.setLineDash([8, 6]);
                    ctx.strokeRect(gx - WR_GEY_W / 2, 310, WR_GEY_W, 12); ctx.setLineDash([]);
                }
                if (this.telO){
                    let t = this.telO, k = 1 - t.t / t.max;
                    ctx.globalAlpha = 0.3 + 0.5 * k; ctx.strokeStyle = this.state === 'w_horn' ? '#FFE082' : '#FF5252'; ctx.lineWidth = 3;
                    ctx.setLineDash([8, 7]); ctx.lineDashOffset = -frames * 0.8;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), t.r, 0, 6.28); ctx.stroke(); ctx.setLineDash([]);
                    ctx.globalAlpha = 0.8; ctx.strokeStyle = '#FFCDD2'; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), t.r, -Math.PI / 2, -Math.PI / 2 + 6.28 * k); ctx.stroke();
                }
                ctx.restore();
            },
            // LOP TREN THAN: Cột lửa, BÁNH XE CƯA CHAOSEATER 360 ĐỘ (Sawblade Cyclone), Vòng tù và, Quét liềm
            wrVeTren(){
                ctx.save();
                for (const p of this.pillars){
                    if (p.t > 0) continue;
                    let a = Math.min(1, p.life / 10), hh = WR_COT_H * Math.min(1, (24 - p.life + 2) / 5);
                    let g = ctx.createLinearGradient(0, 320 - hh, 0, 320);
                    g.addColorStop(0, 'rgba(255,235,59,0)'); g.addColorStop(0.3, 'rgba(255,152,0,0.9)'); g.addColorStop(1, 'rgba(255,61,0,0.95)');
                    ctx.globalAlpha = a; ctx.fillStyle = g;
                    ctx.beginPath(); ctx.moveTo(p.x - 22, 320); ctx.quadraticCurveTo(p.x - 26, 320 - hh * 0.5, p.x + 4 * Math.sin(frames * 0.5 + p.x), 320 - hh);
                    ctx.quadraticCurveTo(p.x + 26, 320 - hh * 0.5, p.x + 22, 320); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = 'rgba(255,248,225,0.8)'; ctx.fillRect(p.x - 5, 320 - hh * 0.8, 10, hh * 0.8);
                }

                if (this.state === 'w_dash' && this.subTimer >= 16 && this.subTimer < 32){
                    let d = this.dir(), ty = this.y + 40;
                    ctx.globalAlpha = 0.65; ctx.strokeStyle = '#FFAB91'; ctx.lineWidth = 2.5;
                    for (let k = 0; k < 5; k++){ let yy = this.y + 20 + k * 12; ctx.beginPath(); ctx.moveTo(this.cx() - d * 30, yy); ctx.lineTo(this.cx() - d * (85 + k * 10), yy); ctx.stroke(); }
                    ctx.globalAlpha = 0.95; ctx.fillStyle = '#FFEA00';
                    ctx.beginPath(); ctx.arc(this.cx() + d * 104, ty, 6 + 3 * Math.sin(frames), 0, 6.28); ctx.fill();
                }

                // ===== HIỆU ỨNG BÁNH XE CƯA CHAOSEATER 360 ĐỘ TRÊN KHÔNG (SAWBLADE CYCLONE & BLADE GEYSER SPIN) =====
                if ((this.state === 'w_cyclone' || this.state === 'w_geyser') && this.spin > 0){
                    ctx.save();
                    ctx.translate(this.cx(), this.cy());
                    // 1. Vòng xoáy lưỡi cưa lửa đỏ-vàng bao quanh
                    for (let k = 0; k < 4; k++){
                        let ang = this.spin + k * (Math.PI / 2);
                        ctx.globalAlpha = 0.65 - k * 0.12;
                        ctx.strokeStyle = (k % 2 === 0) ? '#FF3D00' : '#FFD54F';
                        ctx.lineWidth = 12 - k * 2;
                        ctx.lineCap = 'round';
                        ctx.beginPath();
                        ctx.arc(0, 0, WR_XOAY_R - 8 - k * 8, ang, ang + 1.85);
                        ctx.stroke();
                    }
                    // 2. Vành răng cưa ánh thép bên ngoài
                    ctx.globalAlpha = 0.85;
                    ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 3.5;
                    ctx.beginPath(); ctx.arc(0, 0, WR_XOAY_R - 4, this.spin, this.spin + 2.5); ctx.stroke();
                    ctx.beginPath(); ctx.arc(0, 0, WR_XOAY_R - 4, this.spin + Math.PI, this.spin + Math.PI + 2.5); ctx.stroke();

                    // 3. Vẽ trực tiếp thanh đại kiếm Chaoseater đang quay tít 360 độ quanh tâm người War (+ 1 bóng mờ đối xứng)
                    for (let bIdx = 0; bIdx < 2; bIdx++){
                        ctx.save();
                        ctx.globalAlpha = bIdx === 0 ? 1 : 0.45;
                        ctx.rotate(this.spin + bIdx * Math.PI);
                        ctx.translate(0, -10);
                        veChaoseater(94, 19, true);
                        ctx.restore();
                    }
                    ctx.restore();
                }
                ctx.restore();

                ctx.save();
                if (this.quet){
                    let k = 1 - this.quet.t / 8;
                    ctx.globalAlpha = 0.8 * (1 - k * 0.6); ctx.strokeStyle = '#B388FF'; ctx.lineWidth = 12;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), WR_LIEM_R - 10, -Math.PI / 2, -Math.PI / 2 + 6.28 * Math.min(1, k * 1.4)); ctx.stroke();
                    ctx.globalAlpha *= 0.6; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), WR_LIEM_R - 2, -Math.PI / 2, -Math.PI / 2 + 6.28 * Math.min(1, k * 1.4)); ctx.stroke();
                }
                if (this.horn){
                    let h = this.horn, a = Math.max(0, 1 - h.r / h.max);
                    ctx.globalAlpha = 0.85 * a; ctx.strokeStyle = '#FFD54F'; ctx.lineWidth = 9;
                    ctx.beginPath(); ctx.arc(h.x, h.y, h.r, 0, 6.28); ctx.stroke();
                    ctx.globalAlpha = 0.45 * a; ctx.strokeStyle = '#FF6D00'; ctx.lineWidth = 20;
                    ctx.beginPath(); ctx.arc(h.x, h.y, Math.max(1, h.r - 14), 0, 6.28); ctx.stroke();
                }
                if (this.state === 'w_block' && this.phase === 1){
                    let px = this.cx() + this.dir() * 30;
                    ctx.globalAlpha = 0.4 + 0.25 * Math.sin(frames * 0.5); ctx.strokeStyle = '#FFAB40'; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.arc(px - this.dir() * 16, this.cy() - 6, 46, this.dir() > 0 ? -1.1 : Math.PI - 1.1, this.dir() > 0 ? 1.1 : Math.PI + 1.1); ctx.stroke();
                }
                ctx.restore();
            }
        });
// BOSS_PART_END s0.Object.assign.WarBoss.prototype.1

// Nguồn: index.html:12802 · Dùng bởi: DeathBoss, WarBoss
// BOSS_PART_BEGIN s0.pcxOf.1 READ_ONLY
function pcxOf(){ return dino.x + dino.w / 2; }
// BOSS_PART_END s0.pcxOf.1

// Nguồn: index.html:12805 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.veSongKiem.1 EDITABLE
function veSongKiem(p){
            let d = p.vx < 0 ? -1 : 1, bx = p.x + p.w / 2, gy = p.y + p.h;
            ctx.save(); ctx.translate(bx, gy); ctx.scale(d, 1);
            ctx.shadowColor = '#FF3D00'; ctx.shadowBlur = 12;
            ctx.globalAlpha = 0.35; ctx.fillStyle = '#FF1744';
            ctx.beginPath(); ctx.moveTo(-42, 0); ctx.quadraticCurveTo(-10, -p.h * 0.9, 20, -p.h); ctx.quadraticCurveTo(8, -p.h * 0.5, 24, 0); ctx.closePath(); ctx.fill();
            ctx.globalAlpha = 0.95; ctx.fillStyle = '#FF6D00';
            ctx.beginPath(); ctx.moveTo(-14, 0); ctx.quadraticCurveTo(0, -p.h * 0.8, 18, -p.h * 0.96); ctx.quadraticCurveTo(10, -p.h * 0.45, 22, 0); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#FFF8E1';
            ctx.beginPath(); ctx.moveTo(6, 0); ctx.quadraticCurveTo(10, -p.h * 0.6, 16, -p.h * 0.9); ctx.quadraticCurveTo(14, -p.h * 0.4, 19, 0); ctx.closePath(); ctx.fill();
            for (let k = 0; k < 3; k++){ ctx.globalAlpha = 0.6; ctx.fillStyle = '#FFEA00'; ctx.fillRect(-30 - k * 14, -6 - (frames * 3 + k * 7) % 16, 6, 6); }
            ctx.restore();
        }
// BOSS_PART_END s0.veSongKiem.1

// Nguồn: index.html:12820 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.veLiemBay.1 EDITABLE
function veLiemBay(p){
            let cx = p.x + p.w / 2, cy = p.y + p.h / 2;
            ctx.save(); ctx.translate(cx, cy); ctx.rotate(frames * 0.45 * (p.vx < 0 ? -1 : 1));
            ctx.shadowColor = '#B388FF'; ctx.shadowBlur = 12;
            ctx.globalAlpha = 0.3; ctx.fillStyle = '#B388FF'; ctx.beginPath(); ctx.arc(0, 0, 26, 0, 6.28); ctx.fill();
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#3B2A1E'; ctx.fillRect(-2.5, -22, 5, 44);
            ctx.fillStyle = '#CFD8DC';
            ctx.beginPath(); ctx.moveTo(0, -22); ctx.quadraticCurveTo(28, -28, 32, -4); ctx.quadraticCurveTo(18, -16, 2, -14); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(0, 22); ctx.quadraticCurveTo(-28, 28, -32, 4); ctx.quadraticCurveTo(-18, 16, -2, 14); ctx.closePath(); ctx.fill();
            ctx.restore();
        }
// BOSS_PART_END s0.veLiemBay.1

// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24489 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, IronhaulBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0.drawTopBossBar.1 READ_ONLY
function drawTopBossBar(b, col, label, sub, hang){
            /* Khong truyen `hang` (boss TU ve thanh mau) ma trong cung mot khung co hai con
               cung goi thi thanh thu hai phai TU xuong hang duoi, khong de len nhau. */
            if (_tbbKhung === frames) _tbbSo++; else { _tbbSo = 0; _tbbKhung = frames; }
            /* Tap phai co DAU KHUNG rieng. Neu chi xoa o day thi khung nao KHONG con nao tu ve
               thanh mau se khong xoa gi ca, va tap giu nguyen ten boss cua khung truoc — con
               boss thuong bi coi la "da co thanh roi" mai mai, thanh ra mat sach thanh mau. */
            if (_tbbDaVeKhung !== frames){ _tbbDaVe.clear(); _tbbDaVeKhung = frames; }
            _tbbDaVe.add(b);
            let W = 340, x0 = canvas.width/2 - W/2, H = sub ? 30 : 17;
            /* SAN TAP co mot hang nut chiem tron dai y = 10..46, ve thanh mau len do la bi
               che khuat. Chi trong san tap moi day thanh xuong duoi hang nut do. */
            let _dinh = (typeof dojoMode !== 'undefined' && dojoMode) ? 52 : 10;
            let Y = _dinh + ((hang === undefined ? _tbbSo : hang)) * 34;
            ctx.save();
            /* Thanh mau la HUD, phai nam yen o dinh man hinh. Truoc day no duoc ve BEN TRONG
               phep dich camera, ma camY khoi dau la -CAM_TROI (160) — nen thanh mau tut hn
               160px xuong giua khung hinh, va o cac map camera cuon doc (bien, tetris) no con
               truot theo camera. Tra ve dung toa do MAN HINH. */
            if (typeof DPR === 'number') ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            ctx.fillStyle = "rgba(0,0,0,0.74)"; ctx.fillRect(x0 - 4, Y, W + 8, H);
            ctx.strokeStyle = "rgba(255,255,255,0.20)"; ctx.lineWidth = 1; ctx.strokeRect(x0 - 4, Y, W + 8, H);
            ctx.fillStyle = "rgba(255,255,255,0.13)"; ctx.fillRect(x0, Y + 4, W, 10);
            ctx.fillStyle = col; ctx.fillRect(x0, Y + 4, W * Math.max(0, Math.min(1, b.hp / b.maxHp)), 10);
            if (sub){
                ctx.fillStyle = "rgba(255,255,255,0.13)"; ctx.fillRect(x0, Y + 17, W, 7);
                ctx.fillStyle = sub.col; ctx.fillRect(x0, Y + 17, W * Math.max(0, Math.min(1, sub.v)), 7);
                ctx.fillStyle = "#0A0C10"; ctx.font = "bold 8px Consolas, monospace"; ctx.textAlign = "left";
                ctx.fillText(sub.name, x0 + 4, Y + 23.5);
            }
            ctx.fillStyle = "white"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
            ctx.fillText(label + "   " + Math.max(0, Math.ceil(b.hp)) + " / " + b.maxHp, canvas.width/2, Y + H + 12);
            ctx.textAlign = "left"; ctx.restore();
        }
// BOSS_PART_END s0.drawTopBossBar.1

// Nguồn: index.html:25788 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_W.1 EDITABLE
const WR_W = 64, WR_H = 92;
// BOSS_PART_END s0.WR_W.1

// Nguồn: index.html:25789 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_CHAIN_SPD.1 EDITABLE
const WR_CHAIN_SPD = 21, WR_CHAIN_MAX = 420;
// BOSS_PART_END s0.WR_CHAIN_SPD.1

// Nguồn: index.html:25790 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_GEY_W.1 EDITABLE
const WR_GEY_W = 320, WR_GEY_UP = 190;
// BOSS_PART_END s0.WR_GEY_W.1

// Nguồn: index.html:25791 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.WR_XOAY_R.1 EDITABLE
const WR_XOAY_R = 104, WR_LIEM_R = 128, WR_COT_H = 155;
// BOSS_PART_END s0.WR_XOAY_R.1

// Nguồn: index.html:25878 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.veChaoseater.1 EDITABLE
function veChaoseater(len, rong, lua){
            let w = rong / 2;
            // Chuoi kiem boc da + Qua dam dau lau dong
            ctx.fillStyle = '#2B1F1D'; ctx.fillRect(-3.5, 0, 7, 19);
            ctx.fillStyle = '#9E7B42'; ctx.fillRect(-4, 5, 8, 2.2); ctx.fillRect(-4, 11, 8, 2.2);
            ctx.fillStyle = '#D4AF37';
            ctx.beginPath(); ctx.moveTo(-5, 19); ctx.lineTo(5, 19); ctx.lineTo(0, 26); ctx.closePath(); ctx.fill();

            // Ho thu (Crossguard) — Dau quy co sung vang uon cong
            ctx.fillStyle = '#382E32';
            ctx.beginPath();
            ctx.moveTo(-w * 2.1, -2); ctx.lineTo(-w * 1.3, -10);
            ctx.lineTo(w * 1.3, -10); ctx.lineTo(w * 2.1, -2);
            ctx.lineTo(w * 1.1, 4); ctx.lineTo(-w * 1.1, 4);
            ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#D4AF37';
            ctx.beginPath(); ctx.moveTo(-w * 1.9, -3); ctx.lineTo(-w * 2.8, -15); ctx.lineTo(-w * 1.3, -9); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(w * 1.9, -3); ctx.lineTo(w * 2.8, -15); ctx.lineTo(w * 1.3, -9); ctx.closePath(); ctx.fill();
            // Mat quy phat sang tren ho thu
            ctx.fillStyle = lua ? '#FFEA00' : '#FF1744';
            ctx.fillRect(-4, -7, 3, 2.5); ctx.fillRect(1, -7, 3, 2.5);

            // Neu la Chaos Blade (Pha 2) hoac Immolation -> Lua boc ruc ro doc luoi kiem
            if (lua){
                ctx.save(); ctx.globalAlpha = 0.65;
                for (let k = 0; k < 8; k++){
                    let yy = -len * (0.10 + k * 0.11), hh = 11 + 8 * Math.sin(frames * 0.35 + k * 1.7);
                    ctx.fillStyle = k % 2 ? '#FF3D00' : '#FFC107';
                    ctx.beginPath(); ctx.moveTo(-w - 2, yy + 7); ctx.lineTo(-w - hh, yy - 4); ctx.lineTo(-w - 1, yy - 9); ctx.closePath(); ctx.fill();
                    ctx.beginPath(); ctx.moveTo(w + 2, yy + 7); ctx.lineTo(w + hh, yy - 4); ctx.lineTo(w + 1, yy - 9); ctx.closePath(); ctx.fill();
                }
                ctx.restore();
            }

            // Than luoi kiem Chaoseater to ban, song lung rang cua bac thang, mui cheo sac lem
            ctx.fillStyle = lua ? '#240E08' : '#454D54';
            ctx.beginPath();
            ctx.moveTo(-w * 1.05, -8);
            ctx.lineTo(w * 1.1, -8);
            ctx.lineTo(w * 1.05, -len * 0.80);
            ctx.lineTo(w * 0.35, -len * 1.03); // Dinh nhon Chaoseater
            ctx.lineTo(-w * 0.65, -len * 0.94);
            ctx.lineTo(-w * 0.25, -len * 0.86);
            for (let s = 0.80; s > 0.18; s -= 0.14){
                ctx.lineTo(-w * 1.25, -len * s);
                ctx.lineTo(-w * 0.95, -len * (s - 0.07));
            }
            ctx.lineTo(-w * 1.05, -8);
            ctx.closePath(); ctx.fill();

            // Mep luoi kiem mai bac sang loang (hoac nung cam)
            ctx.fillStyle = lua ? '#FF9100' : '#CFD8DC';
            ctx.beginPath();
            ctx.moveTo(w * 0.45, -8);
            ctx.lineTo(w * 1.1, -8);
            ctx.lineTo(w * 1.05, -len * 0.80);
            ctx.lineTo(w * 0.35, -len * 1.03);
            ctx.lineTo(w * 0.40, -len * 0.80);
            ctx.closePath(); ctx.fill();

            // Ranh huyet nguyet + 3 KHUON MAT DAU LAU THONG KHO khac doc than kiem (net dac trung nhat cua Chaoseater)
            ctx.fillStyle = lua ? '#FF6D00' : '#6E1414';
            ctx.fillRect(-w * 0.42, -len * 0.82, w * 0.68, len * 0.72);
            for (let sk = 0; sk < 3; sk++){
                let sy = -len * (0.24 + sk * 0.24);
                ctx.fillStyle = lua ? '#FFE082' : '#90A4AE';
                ctx.beginPath(); ctx.arc(-w * 0.08, sy, w * 0.32, 0, 6.28); ctx.fill();
                ctx.fillStyle = lua ? '#FF3D00' : '#FF1744'; // Hoc mat dau lau phat sang
                ctx.fillRect(-w * 0.26, sy - 2, 2.2, 2.2);
                ctx.fillRect(0, sy - 2, 2.2, 2.2);
            }
        }
// BOSS_PART_END s0.veChaoseater.1

// Nguồn: index.html:25952 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.veVaiDong.1 EDITABLE
function veVaiDong(px, py, r, mau, coSung){
            // Lop giap duoi
            ctx.fillStyle = '#2B221E';
            ctx.beginPath(); ctx.ellipse(px, py + 4, r * 1.08, r * 0.75, 0, Math.PI, 0); ctx.fill();
            // Vom giap chinh
            ctx.fillStyle = mau;
            ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.86, 0, Math.PI, 0);
            ctx.lineTo(px + r * 0.94, py + r * 0.52);
            ctx.lineTo(px - r * 0.94, py + r * 0.52);
            ctx.closePath(); ctx.fill();
            ctx.fillStyle = 'rgba(0,0,0,0.32)'; ctx.fillRect(px - r * 0.92, py + r * 0.14, r * 1.84, r * 0.38);
            // Vien vang co dai
            ctx.strokeStyle = '#D4AF37'; ctx.lineWidth = 2.4;
            ctx.beginPath(); ctx.ellipse(px, py, r, r * 0.86, 0, Math.PI, 0); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(px - r * 0.92, py + r * 0.14); ctx.lineTo(px + r * 0.92, py + r * 0.14); ctx.stroke();
            // Gai / Sung tren giap vai truoc (Pauldron Skull)
            if (coSung){
                ctx.fillStyle = '#CFD8DC';
                ctx.beginPath(); ctx.moveTo(px + r * 0.3, py - r * 0.5); ctx.lineTo(px + r * 1.15, py - r * 1.05); ctx.lineTo(px + r * 0.75, py - r * 0.15); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#FF5722'; ctx.beginPath(); ctx.arc(px + r * 0.2, py - r * 0.2, 2.5, 0, 6.28); ctx.fill();
            }
            ctx.fillStyle = '#FFE082';
            for (let k = -1; k <= 1; k++){ ctx.beginPath(); ctx.arc(px + k * r * 0.52, py - r * 0.35 + Math.abs(k) * 2, 1.8, 0, 6.28); ctx.fill(); }
        }
// BOSS_PART_END s0.veVaiDong.1

// Nguồn: index.html:25977 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.drawWarBody.1 EDITABLE
function drawWarBody(b, x, y){
            if (b.an) return;                                        // dang di qua cong Voidwalker
            let dr = b.facingLeft ? -1 : 1, c = x + WR_W / 2;
            let tho = Math.sin(frames * 0.06) * 1.3, sw = Math.sin(frames * 0.055) * 2.8;
            let buoc = b.state === 'idle' ? Math.sin((b.walk || 0) * 0.09) * 3.2 : 0;
            let hasImmo = (b.immo || 0) > 0;

            ctx.save();
            ctx.translate(c, y); ctx.scale(dr, 1); ctx.translate(-c, -y);

            // 1. Chaoseater deo cheo sau lung khi dang cam vu khi phu
            if (b.arm !== 'sword' && b.arm !== 'block'){
                ctx.save(); ctx.translate(c - 8, y + 56); ctx.rotate(-0.5); veChaoseater(78, 16, hasImmo); ctx.restore();
            }

            // 2. Ao choang do tham Ky Si Khai Huyen (2 lop rach ta toi)
            ctx.fillStyle = '#4A080A';
            ctx.beginPath(); ctx.moveTo(c - 22, y + 18);
            ctx.quadraticCurveTo(c - 44 - sw * 1.3, y + 48, c - 40 - sw * 1.8, y + 86);
            for (let k = 0; k < 5; k++) ctx.lineTo(c - 34 - sw * 1.5 + k * 8, y + (k % 2 ? 77 : 89));
            ctx.lineTo(c + 2, y + 60); ctx.lineTo(c + 4, y + 20); ctx.closePath(); ctx.fill();

            ctx.fillStyle = '#7A1115';
            ctx.beginPath(); ctx.moveTo(c - 18, y + 20);
            ctx.quadraticCurveTo(c - 34 - sw, y + 46, c - 30 - sw * 1.4, y + 82);
            ctx.lineTo(c - 8, y + 76); ctx.lineTo(c, y + 22); ctx.closePath(); ctx.fill();

            // 3. Mai toc bac dai day dan bay sau lung
            ctx.fillStyle = '#CFD8DC';
            ctx.beginPath(); ctx.moveTo(c - 4, y + 2); ctx.quadraticCurveTo(c - 26 - sw, y + 14, c - 33 - sw * 1.6, y + 44);
            ctx.lineTo(c - 23 - sw, y + 36); ctx.lineTo(c - 27 - sw * 1.3, y + 52); ctx.lineTo(c - 14, y + 30); ctx.lineTo(c - 1, y + 14); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = '#90A4AE'; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(c - 7, y + 9); ctx.quadraticCurveTo(c - 20 - sw, y + 22, c - 25 - sw * 1.3, y + 42); ctx.stroke();

            // 4. TAY SAU — BỌC GĂNG SẮT KHỔNG LỒ ĐỎ-ĐỒNG (War's Left Demon Gauntlet)
            ctx.save(); ctx.translate(c - 16, y + 28); ctx.rotate(b.armL || 0.22);
            ctx.fillStyle = '#2B2630'; ctx.fillRect(-7, 0, 14, 15);
            // Gang sat khong lo boc vuot thep
            ctx.fillStyle = '#8E1B1B'; ctx.fillRect(-9, 12, 18, 16);
            ctx.fillStyle = '#C9A55B'; ctx.fillRect(-9, 12, 18, 3); ctx.fillRect(-7, 21, 14, 3);
            ctx.fillStyle = '#CFD8DC';
            for (let k = -1; k <= 1; k++){
                ctx.beginPath(); ctx.moveTo(k * 5 - 2, 28); ctx.lineTo(k * 6, 34); ctx.lineTo(k * 5 + 2, 28); ctx.closePath(); ctx.fill();
            }
            ctx.restore();

            // 5. CHAN GIAP HANG NANG: Giap goi Dau Lau, Ung sat khong lo
            let chan = (dx, lech, mau) => {
                ctx.fillStyle = mau; ctx.fillRect(c + dx, y + 59 + lech, 15, 26 - lech);
                // Op goi dau lau vang dong
                ctx.fillStyle = '#8D6E3C'; ctx.fillRect(c + dx - 2, y + 61 + lech, 19, 9);
                ctx.fillStyle = '#FFD54F'; ctx.fillRect(c + dx + 3, y + 63 + lech, 9, 3);
                // Ung thep day
                ctx.fillStyle = '#18151C'; ctx.fillRect(c + dx - 3, y + 84, 22, 8);
                ctx.fillStyle = '#544D5C'; ctx.fillRect(c + dx - 3, y + 84, 22, 2.5);
            };
            chan(-18, Math.max(0, buoc), '#242029'); chan(3, Math.max(0, -buoc), '#342F3B');

            // 6. Vat kho do va xich treo ngang hong
            ctx.fillStyle = '#9E1515';
            ctx.beginPath(); ctx.moveTo(c - 10, y + 56); ctx.lineTo(c + 13, y + 56); ctx.lineTo(c + 10 + sw * 0.4, y + 82);
            ctx.lineTo(c + 3, y + 75); ctx.lineTo(c - 5 + sw * 0.4, y + 84); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = '#D4AF37'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(c - 8, y + 57); ctx.lineTo(c - 4 + sw * 0.3, y + 80); ctx.stroke();

            // 7. THAN GIAP NGUC DO SO + AN KY HOI DONG RUC LUA
            let g = ctx.createLinearGradient(0, y + 20, 0, y + 60);
            g.addColorStop(0, '#524C5A'); g.addColorStop(1, '#1E1B24');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.moveTo(c - 22, y + 21 + tho); ctx.lineTo(c + 24, y + 21 + tho); ctx.lineTo(c + 19, y + 58); ctx.lineTo(c - 18, y + 58); ctx.closePath(); ctx.fill();
            // Nep giap dong chu V
            ctx.strokeStyle = '#C9A55B'; ctx.lineWidth = 2.4;
            ctx.beginPath(); ctx.moveTo(c - 16, y + 25 + tho); ctx.lineTo(c + 2, y + 46); ctx.lineTo(c + 20, y + 25 + tho); ctx.stroke();
            // Dau an Hoi Dong (phat sang cam-vang)
            ctx.save(); ctx.globalAlpha = 0.7 + 0.3 * Math.sin(frames * 0.12);
            ctx.shadowColor = '#FF6D00'; ctx.shadowBlur = 10;
            ctx.fillStyle = '#FF9100';
            ctx.beginPath(); ctx.moveTo(c + 2, y + 28); ctx.lineTo(c + 8, y + 36); ctx.lineTo(c + 2, y + 44); ctx.lineTo(c - 4, y + 36); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#FFF8E1'; ctx.fillRect(c + 1, y + 33, 2.5, 6);
            ctx.restore();

            // Dai lung giap + Khoa Dau Lau Khai Huyen
            ctx.fillStyle = '#3B2818'; ctx.fillRect(c - 20, y + 51, 40, 8);
            ctx.fillStyle = '#D4AF37';
            ctx.beginPath(); ctx.arc(c + 1, y + 55, 6.5, 0, 6.28); ctx.fill();
            ctx.fillStyle = '#1E1410'; ctx.fillRect(c - 2, y + 53, 2.2, 2.5); ctx.fillRect(c + 2, y + 53, 2.2, 2.5);

            // 8. MU TRUM DO THAM (War's Iconic Red Hood) + KHUON MAT LANH LUNG MAT PHAT SANG TRANG-XANH
            ctx.fillStyle = '#A61717';
            ctx.beginPath(); ctx.moveTo(c - 16, y + 25); ctx.quadraticCurveTo(c - 19, y + 2, c - 4, y - 8);
            ctx.quadraticCurveTo(c + 12, y - 9, c + 17, y + 8); ctx.lineTo(c + 16, y + 25); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#6E0D0D';
            ctx.beginPath(); ctx.moveTo(c - 16, y + 25); ctx.quadraticCurveTo(c - 19, y + 2, c - 4, y - 8); ctx.lineTo(c - 6, y + 2); ctx.quadraticCurveTo(c - 12, y + 10, c - 9, y + 25); ctx.closePath(); ctx.fill();
            // Vien vang mep mu trum
            ctx.strokeStyle = '#D4AF37'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(c - 4, y - 7); ctx.quadraticCurveTo(c + 11, y - 7, c + 16, y + 8); ctx.stroke();

            // Khuon mat trong bong mu + vet seo + đôi mắt phát sáng trắng băng
            ctx.fillStyle = '#140E0C';
            ctx.beginPath(); ctx.moveTo(c - 2, y + 3); ctx.quadraticCurveTo(c + 7, y, c + 14, y + 7); ctx.lineTo(c + 13, y + 21); ctx.lineTo(c - 1, y + 21); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#9E948C'; ctx.fillRect(c + 3, y + 6, 11, 11);
            ctx.fillStyle = '#6E655E'; ctx.fillRect(c + 3, y + 14, 11, 3);
            ctx.fillStyle = '#ECEFF1'; ctx.fillRect(c - 1, y + 5, 4, 18); ctx.fillRect(c + 12, y + 13, 3, 9);
            ctx.save(); ctx.fillStyle = '#FFFFFF'; ctx.shadowColor = '#40C4FF'; ctx.shadowBlur = 9;
            ctx.fillRect(c + 5.5, y + 9, 6.5, 2.5); ctx.restore();

            // 9. VAI GIAP KHONG LO BAT DOI XUNG
            veVaiDong(c - 16, y + 26, 13, '#634D2B', false);
            ctx.fillStyle = '#9E1717'; ctx.fillRect(c - 8, y + 19, 18, 7); // Khan choang co do
            veVaiDong(c + 21, y + 29, 16.5, '#96743E', true);

            // 10. TAY TRUOC + VU KHI DANG CAM
            let ar = b.armR || 0;
            if (b.arm === 'horn'){          // EARTHCALLER: Tu va Rong Co Dai
                ctx.save(); ctx.translate(c + 12, y + 14);
                ctx.fillStyle = '#E0CFA9';
                ctx.beginPath(); ctx.moveTo(0, -2); ctx.quadraticCurveTo(18, -5, 32, -20); ctx.lineTo(40, -11); ctx.quadraticCurveTo(20, 7, 0, 3); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#C9A55B'; ctx.fillRect(10, -6, 3.5, 9); ctx.fillRect(21, -13, 3.5, 10);
                ctx.fillStyle = '#FF6D00'; ctx.beginPath(); ctx.ellipse(36, -15, 4.5, 7.5, 0.8, 0, 6.28); ctx.fill();
                ctx.restore();
            }

            ctx.save(); ctx.translate(c + 20, y + 31); ctx.rotate(ar);
            ctx.fillStyle = '#34303A'; ctx.fillRect(-6.5, 0, 13, 24);
            ctx.fillStyle = '#96743E'; ctx.fillRect(-7.5, 12, 15, 12);
            ctx.fillStyle = '#FFD54F'; ctx.fillRect(-7.5, 12, 15, 2.5);
            ctx.translate(0, 26);

            // Neu dang xoay kiem Sawblade Cyclone tren khong -> an thanh kiem tren tay (de ve vong kiem xoay 360 o wrVeTren)
            if (b.state === 'w_cyclone' && b.spin > 0){
                ctx.fillStyle = '#4A3A2A'; ctx.fillRect(-6, -3, 12, 8);
            } else if (b.state === 'w_geyser' && !b._bay && b.geyser){
                // Dang CAM NGAP KIEM XUONG DAT trong chieu Blade Geyser!
                ctx.save();
                ctx.rotate(-ar); // Giu kiem thang dung cam xuong mat dat
                ctx.translate(-8, -18);
                ctx.rotate(Math.PI);
                veChaoseater(88, 18, true);
                ctx.restore();
                ctx.fillStyle = '#4A3A2A'; ctx.fillRect(-6, -3, 12, 8);
            } else if (b.arm === 'sword' || b.arm === 'block'){
                ctx.save(); ctx.rotate(Math.PI - 1.1); veChaoseater(88, 18, hasImmo); ctx.restore();
                ctx.fillStyle = '#4A3A2A'; ctx.fillRect(-6, -3, 12, 8);
            } else if (b.arm === 'gauntlet'){      // TREMOR GAUNTLET — Gang TayChan Dong boc tinh the xanh/cam
                let nap = b.state === 'w_tremor' && b.subTimer < 50 ? Math.min(1, b.subTimer / 40) : 0.35;
                ctx.fillStyle = '#4E342E'; ctx.fillRect(-13, -6, 26, 26);
                ctx.fillStyle = '#90A4AE'; ctx.fillRect(-11, -3, 22, 8);
                ctx.fillStyle = '#263238'; for (let k = 0; k < 3; k++) ctx.fillRect(-12 + k * 8.5, 16, 6.5, 8);
                ctx.save(); ctx.globalAlpha = 0.55 + 0.45 * nap;
                ctx.fillStyle = '#00E5FF'; ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 6 + 12 * nap;
                ctx.fillRect(-9, 6, 18, 6);
                ctx.restore();
            } else if (b.arm === 'crossblade'){
                ctx.save(); ctx.rotate(frames * 0.38);
                ctx.fillStyle = '#CFD8DC';
                for (let k = 0; k < 4; k++){
                    ctx.save(); ctx.rotate(k * 1.57);
                    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-5, -21); ctx.lineTo(2, -16); ctx.lineTo(6, -21); ctx.closePath(); ctx.fill();
                    ctx.restore();
                }
                ctx.fillStyle = '#FF6D00'; ctx.beginPath(); ctx.arc(0, 0, 5, 0, 6.28); ctx.fill();
                ctx.restore();
            } else if (b.arm === 'mercy'){         // MERCY — Khau Dai Bac 4 Nong cua Strife
                ctx.fillStyle = '#3E3A40'; ctx.fillRect(-5, -2, 10, 12);
                ctx.fillStyle = '#8D6E3C'; ctx.fillRect(-6.5, 8, 13, 24);
                ctx.fillStyle = '#FFD54F'; ctx.fillRect(-4.5, 28, 9, 4);
                ctx.fillStyle = '#2B2224'; ctx.fillRect(-2.5, 32, 5, 4);
            } else if (b.arm === 'scythe'){        // THE HARVESTER — Luoi Hai Tu Than
                ctx.save(); ctx.rotate(Math.PI - 1.1);
                ctx.fillStyle = '#4E342E'; ctx.fillRect(-3, -64, 6, 82);
                ctx.fillStyle = '#D4AF37'; ctx.fillRect(-4, -66, 8, 6);
                ctx.shadowColor = '#B388FF'; ctx.shadowBlur = 10;
                ctx.fillStyle = '#B0BEC5';
                ctx.beginPath(); ctx.moveTo(0, -64); ctx.quadraticCurveTo(40, -72, 52, -40); ctx.quadraticCurveTo(32, -56, 2, -52); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath(); ctx.moveTo(22, -65); ctx.quadraticCurveTo(44, -65, 52, -40); ctx.lineTo(45, -48); ctx.closePath(); ctx.fill();
                ctx.restore();
                ctx.fillStyle = '#4A3A2A'; ctx.fillRect(-6, -3, 12, 8);
            } else if (b.arm === 'void'){          // VOIDWALKER
                ctx.fillStyle = '#263238'; ctx.fillRect(-9, -4, 18, 14);
                ctx.save(); ctx.fillStyle = (frames >> 3) % 2 ? '#40C4FF' : '#FF9100'; ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 12;
                ctx.beginPath(); ctx.arc(0, 12, 6, 0, 6.28); ctx.fill(); ctx.restore();
            } else {
                ctx.fillStyle = '#4A3A2A'; ctx.fillRect(-6, -3, 12, 8);
            }
            ctx.restore();
            ctx.restore();
        }
// BOSS_PART_END s0.drawWarBody.1

// Nguồn: index.html:26167 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.drawChaosWar.1 EDITABLE
function drawChaosWar(b, x, y){
            let dr = b.facingLeft ? -1 : 1, W = 96, H = 120, c = x + W / 2;
            let tho = Math.sin(frames * 0.07) * 1.8, wf = Math.sin(b.wing || 0);
            ctx.save();
            ctx.translate(c, y); ctx.scale(dr, 1); ctx.translate(-c, -y);

            // 1. DOI CANH DOI LUA KHONG LO SAU LUNG (Chaos Fiend Wings)
            for (let s = -1; s <= 1; s += 2){
                let vaiX = c - s * 8, vaiY = y + 32;
                let khopX = c + s * (-48 - 8 * wf), khopY = y - 18 - 10 * wf;
                let mut1 = { x: c + s * (-94 - 10 * wf), y: y - 4 - 12 * wf };
                let mut2 = { x: c + s * (-88 - 6 * wf), y: y + 40 - 5 * wf };
                let mut3 = { x: c + s * (-58 - 4 * wf), y: y + 76 };

                let wg = ctx.createLinearGradient(vaiX, vaiY, mut1.x, mut3.y);
                wg.addColorStop(0, 'rgba(42, 16, 12, 0.92)');
                wg.addColorStop(0.6, 'rgba(183, 28, 28, 0.78)');
                wg.addColorStop(1, 'rgba(255, 145, 0, 0.65)');
                ctx.fillStyle = wg;
                ctx.beginPath();
                ctx.moveTo(vaiX, vaiY); ctx.lineTo(khopX, khopY);
                ctx.lineTo(mut1.x, mut1.y);
                ctx.quadraticCurveTo((mut1.x + mut2.x)/2 + s*8, (mut1.y + mut2.y)/2, mut2.x, mut2.y);
                ctx.quadraticCurveTo((mut2.x + mut3.x)/2 + s*6, (mut2.y + mut3.y)/2, mut3.x, mut3.y);
                ctx.lineTo(c - s * 16, y + 66);
                ctx.closePath(); ctx.fill();

                ctx.strokeStyle = '#FF6D00'; ctx.lineWidth = 2; ctx.stroke();
                ctx.strokeStyle = '#1B0D0A'; ctx.lineWidth = 5; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.moveTo(vaiX, vaiY); ctx.lineTo(khopX, khopY); ctx.lineTo(mut1.x, mut1.y); ctx.stroke();
            }

            // 2. Lua dia nguc boc quanh than
            ctx.save();
            for (let k = 0; k < 11; k++){
                let fx = c - 50 + k * 10, hh = 34 + 16 * Math.sin(frames * 0.21 + k * 1.7);
                ctx.globalAlpha = 0.30; ctx.fillStyle = k % 2 ? '#FF6D00' : '#FFC107';
                ctx.beginPath(); ctx.moveTo(fx - 9, y + 70); ctx.lineTo(fx + 2 * Math.sin(frames * 0.3 + k), y + 20 - hh); ctx.lineTo(fx + 9, y + 70); ctx.closePath(); ctx.fill();
            }
            ctx.restore();

            // 3. Chan da dung nham
            let chan = (dx, mau) => {
                ctx.fillStyle = mau; ctx.fillRect(c + dx, y + 80, 22, 32);
                ctx.fillStyle = '#0E0908'; ctx.fillRect(c + dx - 4, y + H - 9, 30, 9);
                ctx.strokeStyle = '#FF6D00'; ctx.lineWidth = 2.2;
                ctx.beginPath(); ctx.moveTo(c + dx + 6, y + 84); ctx.lineTo(c + dx + 12, y + 96); ctx.lineTo(c + dx + 8, y + 108); ctx.stroke();
            };
            chan(-28, '#1C1411'); chan(4, '#2A1D18');

            // 4. Tay sau co vuot lua
            ctx.save(); ctx.translate(c - 24, y + 40); ctx.rotate(b.armL || 0.2);
            ctx.fillStyle = '#1F1613'; ctx.fillRect(-9, 0, 18, 34);
            ctx.strokeStyle = '#FF6D00'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-3, 6); ctx.lineTo(3, 18); ctx.lineTo(-2, 30); ctx.stroke();
            ctx.fillStyle = '#FFB300'; for (let k = 0; k < 3; k++){ ctx.beginPath(); ctx.moveTo(-8 + k * 7, 33); ctx.lineTo(-5 + k * 7, 45); ctx.lineTo(-2 + k * 7, 33); ctx.closePath(); ctx.fill(); }
            ctx.restore();

            // 5. Than da voi khe dung nham ruc sang
            let g = ctx.createLinearGradient(0, y + 26, 0, y + 84);
            g.addColorStop(0, '#2E211C'); g.addColorStop(1, '#120B09');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.moveTo(c - 32, y + 28 + tho); ctx.lineTo(c + 34, y + 28 + tho); ctx.lineTo(c + 26, y + 84); ctx.lineTo(c - 26, y + 84); ctx.closePath(); ctx.fill();
            let pl = 0.65 + 0.35 * Math.sin(frames * 0.15);
            ctx.save(); ctx.globalAlpha = pl; ctx.strokeStyle = '#FF9100'; ctx.lineWidth = 3.2; ctx.lineJoin = 'round';
            ctx.beginPath(); ctx.moveTo(c - 18, y + 34); ctx.lineTo(c - 6, y + 50); ctx.lineTo(c - 16, y + 66); ctx.lineTo(c - 8, y + 80); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(c + 20, y + 36); ctx.lineTo(c + 8, y + 52); ctx.lineTo(c + 18, y + 70); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(c - 6, y + 50); ctx.lineTo(c + 8, y + 52); ctx.stroke();
            let rg = ctx.createRadialGradient(c + 1, y + 50, 2, c + 1, y + 50, 18);
            rg.addColorStop(0, '#FFF8E1'); rg.addColorStop(0.4, '#FFC107'); rg.addColorStop(1, 'rgba(255,109,0,0)');
            ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(c + 1, y + 50, 18, 0, 6.28); ctx.fill();
            ctx.restore();

            // 6. Vai da gai + lua tren vai
            for (let s2 = -1; s2 <= 1; s2 += 2){
                let px = c + s2 * 30, big = s2 > 0 ? 1.15 : 1;
                ctx.fillStyle = s2 > 0 ? '#3A2A23' : '#241915';
                ctx.beginPath(); ctx.ellipse(px, y + 30, 20 * big, 15 * big, 0, Math.PI, 0); ctx.lineTo(px + 18 * big, y + 40); ctx.lineTo(px - 18 * big, y + 40); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#120B09';
                for (let k = -1; k <= 1; k++){ ctx.beginPath(); ctx.moveTo(px + k * 11 - 4, y + 22); ctx.lineTo(px + k * 14, y + 2 - (k === 0 ? 8 : 0)); ctx.lineTo(px + k * 11 + 4, y + 22); ctx.closePath(); ctx.fill(); }
                ctx.save(); ctx.globalAlpha = 0.7; ctx.fillStyle = '#FF6D00';
                ctx.beginPath(); ctx.moveTo(px - 12, y + 20); ctx.lineTo(px + 3 * Math.sin(frames * 0.4 + s2), y - 2 - 6 * Math.sin(frames * 0.25 + s2)); ctx.lineTo(px + 12, y + 20); ctx.closePath(); ctx.fill();
                ctx.restore();
            }

            // 7. Dau quy: bom lua boc len, sung cong lon, mat sang trang
            ctx.save();
            for (let k = 0; k < 6; k++){
                let hh = 22 + 12 * Math.sin(frames * 0.27 + k * 1.3);
                ctx.fillStyle = k % 2 ? 'rgba(255,193,7,0.85)' : 'rgba(255,87,34,0.85)';
                ctx.beginPath(); ctx.moveTo(c - 14 + k * 5, y + 8); ctx.lineTo(c - 20 + k * 4 - 6, y - hh); ctx.lineTo(c - 6 + k * 5, y + 6); ctx.closePath(); ctx.fill();
            }
            ctx.restore();
            ctx.fillStyle = '#261A16';
            ctx.beginPath(); ctx.moveTo(c - 15, y + 28); ctx.lineTo(c + 17, y + 28); ctx.lineTo(c + 17, y + 6); ctx.lineTo(c + 4, y - 2); ctx.lineTo(c - 13, y + 4); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#0E0908';
            ctx.beginPath(); ctx.moveTo(c - 8, y + 4); ctx.quadraticCurveTo(c - 30, y - 6, c - 36, y - 32); ctx.quadraticCurveTo(c - 22, y - 12, c - 2, y - 1); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(c + 10, y + 2); ctx.quadraticCurveTo(c + 30, y - 8, c + 32, y - 34); ctx.quadraticCurveTo(c + 22, y - 12, c + 4, y - 3); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#FF6D00'; ctx.beginPath(); ctx.arc(c - 36, y - 32, 3, 0, 6.28); ctx.arc(c + 32, y - 34, 3, 0, 6.28); ctx.fill();
            ctx.save(); ctx.fillStyle = '#FFFDE7'; ctx.shadowColor = '#FFC107'; ctx.shadowBlur = 10;
            ctx.fillRect(c + 5, y + 10, 10, 3); ctx.fillRect(c - 6, y + 10, 7, 3); ctx.restore();
            ctx.fillStyle = '#FF3D00'; ctx.fillRect(c + 1, y + 19, 14, 3);
            ctx.fillStyle = '#FFC107'; ctx.fillRect(c + 3, y + 20, 2, 2); ctx.fillRect(c + 8, y + 20, 2, 2);

            // 8. Tay truoc + CHAOSEATER LUA KHONG LO
            ctx.save(); ctx.translate(c + 26, y + 40); ctx.rotate(b.armR || 0);
            ctx.fillStyle = '#2A1D18'; ctx.fillRect(-10, 0, 20, 34);
            ctx.strokeStyle = '#FF6D00'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-3, 6); ctx.lineTo(4, 18); ctx.lineTo(-2, 30); ctx.stroke();
            ctx.translate(0, 36);
            ctx.save(); ctx.rotate(Math.PI - 1.25); ctx.scale(1.25, 1.25); veChaoseater(104, 20, true); ctx.restore();
            ctx.fillStyle = '#1F1613'; ctx.fillRect(-9, -4, 18, 10);
            ctx.restore();
            ctx.restore();
        }
// BOSS_PART_END s0.drawChaosWar.1

// Nguồn: index.html:26282 · Dùng bởi: WarBoss
// BOSS_PART_BEGIN s0.veRuin.1 EDITABLE
function veRuin(b){
            let R = b.ruin, dr = R ? Math.sign(R.v || 1) : b.dir(), cx = b.cx(), gy = b.y + b.h, ph = (b.walk || 0) * 0.11;
            ctx.save(); ctx.translate(cx, gy); ctx.scale(dr, 1);
            ctx.lineCap = 'round';
            const CH = [-30, -20, 18, 28];
            for (let k = 0; k < 4; k++){
                let s = Math.sin(ph + k * 1.6) * 12;
                ctx.strokeStyle = k % 2 ? '#141216' : '#1E1B22'; ctx.lineWidth = 6.5;
                ctx.beginPath(); ctx.moveTo(CH[k], -32); ctx.lineTo(CH[k] + s * 0.5, -16); ctx.lineTo(CH[k] + s, -3); ctx.stroke();
                // Mong ngua boc lua dia nguc
                ctx.fillStyle = (frames + k * 3) % 8 < 4 ? '#FF3D00' : '#FFC107';
                ctx.beginPath(); ctx.arc(CH[k] + s, -3, 5.5, 0, 6.28); ctx.fill();
            }
            // Duoi lua
            ctx.save(); ctx.globalAlpha = 0.85;
            for (let k = 0; k < 5; k++){
                ctx.fillStyle = k % 2 ? '#FF3D00' : '#FFC107';
                ctx.beginPath(); ctx.moveTo(-38, -44); ctx.lineTo(-66 - k * 6, -46 + k * 6 + 4 * Math.sin(frames * 0.4 + k)); ctx.lineTo(-38, -36); ctx.closePath(); ctx.fill();
            }
            ctx.restore();
            // Than chien ma hac am + giap nguc dong
            ctx.fillStyle = '#16141A'; ctx.beginPath(); ctx.ellipse(0, -40, 44, 16, 0, 0, 6.28); ctx.fill();
            ctx.fillStyle = '#8E1515'; ctx.fillRect(-16, -56, 28, 10);
            ctx.fillStyle = '#D4AF37'; ctx.fillRect(-16, -48, 28, 3);
            // Co + Dau chien ma boc thiet giap
            ctx.fillStyle = '#16141A';
            ctx.beginPath(); ctx.moveTo(24, -50); ctx.lineTo(42, -78); ctx.lineTo(62, -73); ctx.lineTo(64, -62); ctx.lineTo(46, -58); ctx.lineTo(38, -38); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#C9A55B'; ctx.beginPath(); ctx.moveTo(44, -76); ctx.lineTo(62, -72); ctx.lineTo(63, -63); ctx.lineTo(50, -64); ctx.closePath(); ctx.fill();
            ctx.save(); ctx.fillStyle = '#FFEA00'; ctx.shadowColor = '#FF3D00'; ctx.shadowBlur = 10; ctx.fillRect(49, -72, 4.5, 3); ctx.restore();
            // Bom lua
            ctx.save(); ctx.globalAlpha = 0.9;
            for (let k = 0; k < 6; k++){
                ctx.fillStyle = k % 2 ? '#FF3D00' : '#FFC107';
                let bx = 26 + k * 4, by = -52 - k * 5;
                ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx - 14 - 4 * Math.sin(frames * 0.5 + k), by - 9); ctx.lineTo(bx + 4, by - 4); ctx.closePath(); ctx.fill();
            }
            ctx.restore();
            ctx.restore();
        }
// BOSS_PART_END s0.veRuin.1

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
