// BOSS_FILE: VergilBoss
// BOSS_SNAPSHOT: beba2bbb918dbf33475490c993ed1556c7f85c4568f316c2be580c4161e1acfd
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, Array, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LT, LavaDino, LavaSerpentBoss, MINION_HP, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, aaBanKem, aaHeSo, aaUp, bossProjectiles, camX, camY, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, hitstopTimer, minionBox, parry, pickFromBag, projectiles, shakeTimer, veCanhKhoan, visualEffects
// Nguồn: index.html:5628 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.VergilBoss.1 EDITABLE
class VergilBoss {
            constructor(level){
                this.name = "VERGIL"; this.hp = 130; this.maxHp = 130;
                this.w = VG_W; this.h = VG_H; this.baseY = 320 - this.h;
                this.x = canvas.width - 200; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.actionTimer = 50; this.facingLeft = true;
                this.retState = 'idle'; this.lastSkill = ''; this.atkBag = []; this.invulnAll = false;
                this.burnTimer = 0; this.lastMeleeHit = -1; this.stage = 1; this.phase = 1; this._bag = null;
                this.armR = 0; this.armL = 0; this.drawn = false;
                this.warpT = 0; this.ghosts = []; this.swords = []; this.cuts = [];
                this.slash = null; this.tel = null; this.combo = 0; this.jce = null;
                this.hist = []; this.dop = null; this.dopEv = []; this.spiral = 0;
                this.dashV = 0; this.aura = 0; this.trailT = 0; this._hb = false; this._dv = false;
                this.fly = 0; this.wing = 0; this.dim = null; this.dome = null; this.rain = []; this.fams = []; this.hover = 0;
                // @@HE-VERGIL-DMC5
                this.aiRieng = true; this.chuoi = []; this.tapTrung = 0; this.trickCd = 90; this.jceCd = 0; this.noiThem = 0; this.trungLuc = -999;
                // Bien hieu ung phu cho cac chieu moi (Void Slash, Hell on Earth, Mirage Edge)
                this._voidFx = null; this._hoeRing = null; this.mirageWep = false;
            }
            spd(){ if (this.suYeu > 0) return 0.5; return (this.stage === 3 ? 1.3 : 1) * (1 + 0.04 * (this.tapTrungNac ? this.tapTrungNac() : 0)); }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = Math.round(t / this.spd()); this.drawn = false; this.mirageWep = false; this.armR = 0; this.armL = 0; }
            physics(){
                this.dy += 0.62; this.y += this.dy; this.x += this.dashV; this.dashV *= 0.86;
                if (Math.abs(this.dashV) < 0.4) this.dashV = 0;
                if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
            }
            ghost(){ if (this.ghosts.length >= 5) this.ghosts.shift();
                     this.ghosts.push({ x: this.x, y: this.y, left: this.facingLeft, drawn: this.drawn, armR: this.armR, beo: this.beo, mirageWep: this.mirageWep, t: 16 }); }
            // ---- WARP ----
            warpTo(nx, ny){
                this.ghost(); this.ghost();
                this.x = Math.max(8, Math.min(canvas.width - this.w - 8, nx));
                this.y = Math.min(this.baseY, ny);
                this.dy = 0; this.faceP(); this.warpT = VG_WARP;
                if (SFX.tone) SFX.tone(1200, 0.07, 'sine', 0.10, 380);
            }
            warpNearP(side){
                let s = side || ((Math.random() < 0.5) ? -1 : 1);
                this.warpTo(dino.x + dino.w/2 + s * 74 - this.w/2, this.baseY);
            }
            // ---- SUMMONED SWORDS ----
            addSword(x, y, ang, mode){
                this.swords.push({ x: x, y: y, ang: ang, t: 0, mode: mode, vx: 0, vy: 0, fired: false, dead: false, life: 300 });
            }
            tickSwords(){
                for (let i = this.swords.length - 1; i >= 0; i--){
                    let s = this.swords[i]; s.t++; s.life--;
                    if (s.mode === 'orbit'){
                        s.ang += 0.055 * this.spd();
                        s.x = this.cx() + Math.cos(s.ang) * s.r; s.y = this.cy() + Math.sin(s.ang) * s.r;
                    } else if (s.mode === 'ring'){
                        if (!s.fired){
                            s.x = s.tx + Math.cos(s.ang) * s.r; s.y = s.ty + Math.sin(s.ang) * s.r;
                            if (s.t > s.wait){ s.fired = true; let a = Math.atan2(s.ty - s.y, s.tx - s.x); s.vx = Math.cos(a)*13; s.vy = Math.sin(a)*13; }
                        } else { s.x += s.vx; s.y += s.vy; }
                    } else if (s.mode === 'heavyrain'){
                        // Heavy Rain Blades: lo lung tren dau nguoi choi roi cam thang xuong
                        if (!s.fired){
                            s.x = s.hx; s.y = s.hy + Math.sin(frames * 0.2 + s.t) * 2;
                            s.ang = Math.PI / 2;
                            if (s.t > s.wait){ s.fired = true; s.vx = 0; s.vy = 16; }
                        } else { s.y += s.vy; }
                    } else {
                        if (!s.fired){
                            s.x = s.hx + Math.sin(frames*0.14 + s.ang) * 3; s.y = s.hy;
                            if (s.t > s.wait){
                                s.fired = true;
                                let a = Math.atan2((dino.y + dino.h/2) - s.y, (dino.x + dino.w/2) - s.x);
                                s.vx = Math.cos(a)*11.5; s.vy = Math.sin(a)*11.5; s.ang = a;
                            }
                        } else { s.x += s.vx; s.y += s.vy; }
                    }
                    if (s.fired && s.mode !== 'heavyrain') s.ang = Math.atan2(s.vy, s.vx);
                    // NGUOI CHOI BAN VO DUOC
                    let box = { x: s.x - VG_SWORD_R, y: s.y - VG_SWORD_R, w: VG_SWORD_R*2, h: VG_SWORD_R*2 };
                    for (let pi = projectiles.length - 1; pi >= 0; pi--){
                        let pr = projectiles[pi]; if (!pr || pr.owner !== 1) continue;
                        if (!checkAABB(pr, box)) continue;
                        s.dead = true;
                        visualEffects.push(new Effect(s.x, s.y, 'explosion', true, 12));
                        if (!(pr.type === 2 || (pr.pierceCount||0) > 0)) projectiles.splice(pi, 1);
                        break;
                    }
                    if (!s.dead && checkAABB(dino, box)){ s.dead = true; this.hurtP(1); visualEffects.push(new Effect(s.x, s.y, 'explosion', true, 10)); }
                    if (s.dead || s.life <= 0 || s.x < -60 || s.x > canvas.width + 60 || s.y > 340 || s.y < -80){
                        if (s.mode === 'heavyrain' && s.y > 320) visualEffects.push(new Effect(s.x, 318, 'explosion', true, 12));
                        this.swords.splice(i, 1);
                    }
                }
            }
            minionTargets(){
                let ra = [];
                for (let f of this.fams) if (f.hp > 0) ra.push(minionBox(f, 26, 26, MINION_HP, true, true));
                let R2 = (typeof VG_SWORD_R !== 'undefined') ? VG_SWORD_R : 13;
                for (let sw of this.swords) if (!sw.dead && (sw.hp === undefined || sw.hp > 0))
                    ra.push(minionBox(sw, R2*2, R2*2, MINION_HP, true, true));
                return ra;
            }
            addCut(x, y, r, warn, dmg){ this.cuts.push({ x: x, y: y, r: r, t: warn, warn: warn, dmg: dmg || 1, hit: false, boom: 0 }); }
            tickCuts(){
                for (let i = this.cuts.length - 1; i >= 0; i--){
                    let c = this.cuts[i];
                    if (c.t > 0){ c.t--; if (c.t === 0){
                        c.boom = 20; shakeTimer = Math.max(shakeTimer, 18);
                        if (SFX.bossSkill) SFX.bossSkill();
                        let dx = (dino.x + dino.w/2) - c.x, dy = (dino.y + dino.h/2) - c.y;
                        if (Math.sqrt(dx*dx + dy*dy) < c.r) this.hurtP(c.dmg);
                    } }
                    else { c.boom--; if (c.boom <= 0) this.cuts.splice(i, 1); }
                }
            }
            slashRect(){
                let a = this.slash; if (!a) return { x:0,y:0,w:0,h:0 };
                return a.dir < 0 ? { x: this.x - a.reach, y: this.y + 6 - a.up, w: a.reach, h: this.h + a.up - 6 }
                                 : { x: this.x + this.w, y: this.y + 6 - a.up, w: a.reach, h: this.h + a.up - 6 };
            }
            warn(reach, up, t){ this.tel = { dir: this.dir(), reach: reach, up: up, t: t, max: t }; }
            doSlash(reach, up, life){
                let _k = aaHeSo(this); reach *= _k; up = aaUp(this, up);   // @@HE-CHONGKHONG
                this.slash = { t: life, dir: this.dir(), reach: reach, up: up, hit: false };
                this.drawn = true;
                this.pushDop('slash', { reach: reach, up: up, life: life, dir: this.dir() });
            }
            // ---- DOPPELGANGER ----
            pushDop(kind, data){ if (this.stage >= 2 && this.dop) this.dopEv.push({ t: VG_DOP_LAG, kind: kind, d: data || {} }); }
            tickDop(){
                if (!this.dop) return;
                let h = this.hist[Math.max(0, this.hist.length - 1 - VG_DOP_LAG)];
                if (h){ this.dop.x = canvas.width - h.x - this.w; this.dop.y = h.y; this.dop.left = !h.left; this.dop.drawn = h.drawn; this.dop.armR = -h.armR; }
                if(typeof this.syncAttackerDoppelganger==='function')this.syncAttackerDoppelganger();
                if (this.dop.slash){ this.dop.slash.t--; if (this.dop.slash.t <= 0) this.dop.slash = null; }
                if (this.dop.slash){
                    let a = this.dop.slash;
                    let r = a.dir < 0 ? { x: this.dop.x - a.reach, y: this.dop.y + 6 - a.up, w: a.reach, h: this.h + a.up - 6 }
                                      : { x: this.dop.x + this.w, y: this.dop.y + 6 - a.up, w: a.reach, h: this.h + a.up - 6 };
                    if (!a.hit && checkAABB(dino, r)){ a.hit = true; this.hurtP(1); }
                }
                for (let i = this.dopEv.length - 1; i >= 0; i--){
                    let e = this.dopEv[i]; e.t--;
                    if (e.t > 0) continue;
                    this.dopEv.splice(i, 1);
                    if (e.kind === 'slash'){
                        this.dop.slash = { t: e.d.life, dir: this.phase===1&&typeof this.syncAttackerDoppelganger==='function'?(this.dop.left?-1:1):-e.d.dir, reach: e.d.reach, up: e.d.up, hit: false };
                    } else if (e.kind === 'swords'){
                        let n = e.d.n || 3;
                        for (let k = 0; k < n; k++){
                            let sx = this.dop.x + this.w/2 + (k - (n-1)/2) * 20;
                            this.addSword(sx, this.dop.y - 16, 0, 'shoulder');
                            let s = this.swords[this.swords.length-1]; s.hx = sx; s.hy = this.dop.y - 16; s.wait = 26;
                        }
                    } else if (e.kind === 'cut'){
                        this.addCut(canvas.width - e.d.x, e.d.y, e.d.r, 26, 1);
                    }
                }
            }
            enterStage(n){
                this.stage = n; this.invulnAll = true; this.state = 'stagein'; this.subTimer = 0;
                this.swords.length = 0; this.cuts.length = 0; this.slash = null; this.tel = null; this.jce = null;
                bossProjectiles.length = 0; shakeTimer = 60;
                if (n === 2){
                    this.dop = { x: canvas.width - this.x - this.w, y: this.y, left: !this.facingLeft, drawn: false, armR: 0, slash: null };
                    this.name = "VERGIL — DOPPELGANGER";
                    floatingTexts.push(new FloatingText(this.cx() - 80, 140, "DOPPELGANGER!"));
                } else {
                    this.name = "VERGIL — DEVIL TRIGGER";
                    floatingTexts.push(new FloatingText(this.cx() - 90, 140, "DEVIL TRIGGER!"));
                }
                if (SFX.bossEntry) SFX.bossEntry();
            }
            update(){
                if (this.state === 'entering'){ this.physics(); this.x -= 4; if (this.x < canvas.width - 220) this.toIdle(34); return; }
                this.hist.push({ x: this.x, y: this.y, left: this.facingLeft, drawn: this.drawn, armR: this.armR });
                if (this.hist.length > VG_DOP_LAG + 6) this.hist.shift();
                if (this._voidFx){ this._voidFx.t--; if (this._voidFx.t <= 0) this._voidFx = null; }
                if (this._hoeRing){ this._hoeRing.t--; if (this._hoeRing.t <= 0) this._hoeRing = null; }
                if (this.phase === 2){ this.updateSDT(); return; }
                if (this.sdtUltXong) this.suTickPhu();
                for (let i = this.ghosts.length - 1; i >= 0; i--){ this.ghosts[i].t--; if (this.ghosts[i].t <= 0) this.ghosts.splice(i, 1); }
                if (this.warpT > 0) this.warpT--;
                if (this.tel){ this.tel.t--; if (this.tel.t <= 0) this.tel = null; }
                if (this.slash){ this.slash.t--; if (this.slash.t <= 0){ this.slash = null; this.drawn = false; } }
                if (this.stage === 3) this.aura = Math.min(1, this.aura + 0.05);
                if (this._neKhoa > 0 && --this._neKhoa === 0) this.invulnAll = false;
                this.vgTick();
                this.tickSwords(); this.tickCuts(); this.tickDop();
                if (this.state !== 'phasein' && !this.sdtUltXong){
                    if (this.stage === 1 && this.hp <= this.maxHp * 0.65) { this.enterStage(2); return; }
                    if (this.stage === 2 && this.hp <= this.maxHp * 0.30) { this.enterStage(3); return; }
                }
                if (this.state === 'stagein'){
                    this.subTimer++; this.physics();
                    if (this.subTimer % 10 === 0) this.ghost();
                    if (this.subTimer > 70){ this.invulnAll = false; this.toIdle(20); }
                    return;
                }
                this.physics();
                if (this.slash){
                    let r = this.slashRect();
                    if (!this.slash.hit && checkAABB(dino, r)){ this.slash.hit = true; this.hurtP(1); }
                }
                if (this.spiral > 0){ this.spiral--; if (this.spiral === 0) for (let i = this.swords.length-1; i>=0; i--) if (this.swords[i].mode === 'orbit') this.swords.splice(i,1); }
                if (this.state === 'idle'){
                    this.faceP();
                    let g = this.gap(), ad = Math.abs(g);
                    if (ad > 130 && this.grounded) this.x += Math.sign(g) * 1.5 * this.spd();
                    else if (ad < 60 && this.grounded) this.x -= Math.sign(g) * 1.2;
                    this.actionTimer--;
                    if (this.actionTimer <= 0) this.pickSkill();
                    return;
                }
                this.runSkill();
            }
            pickSkill(){
                let list;
                if (this.stage === 1)      list = ['v_swords','v_rapid','v_combo','v_jcut','v_helm','v_void','v_kick13'];
                else if (this.stage === 2) list = ['v_swords','v_rapid','v_combo','v_jcut','v_helm','v_storm','v_spiral','v_void','v_heavyrain','v_miragecombo'];
                else                       list = ['v_swords','v_rapid','v_combo','v_jcut','v_helm','v_storm','v_jce','v_hellon','v_rapid'];
                this.state = pickFromBag(this, list);
                this.subTimer = 0; this.combo = 0;
            }
            runSkill(){
                let st = this.state, sp = this.spd(); this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;
                if (this.vgChieu(st, T)) return;      // @@HE-VERGIL-DMC5
                // ===== SUMMONED SWORDS =====
                if (st === 'v_swords'){
                    if (T(6)){ this.faceP(); this.armL = -0.8; }
                    if (T(18)){
                        let n = this.stage === 3 ? 6 : 4;
                        for (let k = 0; k < n; k++){
                            let hx = this.cx() + (k - (n-1)/2) * 21, hy = this.y - 18 - (k % 2) * 10;
                            this.addSword(hx, hy, k, 'shoulder');
                            let s = this.swords[this.swords.length-1]; s.hx = hx; s.hy = hy; s.wait = 30 + k * 7;
                        }
                        this.pushDop('swords', { n: 3 });
                        if (SFX.tone) SFX.tone(1500, 0.08, 'triangle', 0.10, 900);
                    }
                    if (this.subTimer > 74) this.toIdle(30);
                    return;
                }
                // ===== STORM SWORDS =====
                if (st === 'v_storm'){
                    if (T(10)) this.faceP();
                    if (T(24)){
                        let tx = dino.x + dino.w/2, ty = dino.y + dino.h/2, n = this.stage === 3 ? 8 : 6;
                        for (let k = 0; k < n; k++){
                            this.addSword(0, 0, (k / n) * Math.PI * 2, 'ring');
                            let s = this.swords[this.swords.length-1];
                            s.tx = tx; s.ty = ty; s.r = 128; s.wait = 62;
                        }
                        floatingTexts.push(new FloatingText(tx - 56, ty - 60, "BẮN VỠ KIẾM!"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 96) this.toIdle(34);
                    return;
                }
                // ===== SPIRAL SWORDS =====
                if (st === 'v_spiral'){
                    if (T(14)){
                        for (let k = 0; k < 5; k++){
                            this.addSword(0, 0, (k/5)*Math.PI*2, 'orbit');
                            this.swords[this.swords.length-1].r = 62;
                        }
                        this.spiral = 260;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 40) this.toIdle(26);
                    return;
                }
                // ===== RAPID SLASH =====
                if (st === 'v_rapid'){
                    if (T(4)){ this.faceP(); let s = (dino.x + dino.w/2) < canvas.width/2 ? 1 : -1;
                               this.warpTo(dino.x + dino.w/2 + s * 210 - this.w/2, this.baseY); }
                    if (T(24)){ this.faceP(); this.warn(300, 12, 16); }
                    if (T(40)){
                        this.drawn = true; this.armR = -0.6;
                        this.dashV = this.dir() * 30;
                        this.doSlash(74, 14, 20);
                        for (let k = 0; k < 4; k++) this.ghost();
                        if (this.tapTrungNac() >= 3)
                            for (let k = 1; k <= 3; k++) this.addCut(this.cx() + this.dir() * k * 70, this.cy(), 44, 30 + k * 6, 1);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 40 && this.subTimer < 62 && Math.floor(this.subTimer) % 3 === 0) this.ghost();
                    if (this.subTimer > 70) this.toIdle(28);
                    return;
                }
                // ===== YAMATO COMBO =====
                if (st === 'v_combo'){
                    if (T(4)) this.warpNearP(this.gap() > 0 ? -1 : 1);
                    let warns = [20, 42, 68], hits = [30, 52, 82];
                    for (let k = 0; k < 3; k++){
                        if (T(warns[k])){ this.faceP(); this.warn(k === 2 ? 96 : 72, k === 2 ? 26 : 12, hits[k]-warns[k]); }
                        if (T(hits[k])){
                            this.faceP(); this.combo++;
                            let big = k === 2;
                            this.armR = big ? -1.5 : -0.5;
                            this.doSlash(big ? 96 : 72, big ? 26 : 12, big ? 16 : 11);
                            this.dashV = this.dir() * (big ? 8 : 5);
                            if (SFX.tone) SFX.tone(big ? 300 : 560, 0.07, 'square', 0.12, 200);
                        }
                    }
                    if (this.subTimer > 100) this.toIdle(30);
                    return;
                }
                // ===== HELM BREAKER =====
                if (st === 'v_helm'){
                    if (T(4)){ this.warpTo(dino.x + dino.w/2 - this.w/2, this.baseY - 150); this.dy = 0; this.drawn = true; this.armR = -2.4; }
                    if (this.subTimer > 4 && this.subTimer < 34){ this.dy = 0; this.y = this.baseY - 150; }
                    if (T(34)){ this.warn(30, 0, 12); }
                    if (T(46)){ this.dy = 22; }
                    if (this.subTimer > 46 && this.grounded && !this._hb){
                        this._hb = true; shakeTimer = 26;
                        this.doSlash(64, 10, 14);
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 40));
                        if (checkAABB(dino, { x: this.cx() - 78, y: this.baseY - 10, w: 156, h: this.h + 14 })) this.hurtP(1);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 74){ this._hb = false; this.toIdle(30); }
                    return;
                }
                // ===== JUDGEMENT CUT =====
                if (st === 'v_jcut'){
                    if (T(6)){ this.faceP(); this.armL = -1.2; }
                    if (T(20)){
                        let n = this.stage === 3 ? 3 : 1;
                        for (let k = 0; k < n; k++){
                            let jx = dino.x + dino.w/2 + (k === 0 ? 0 : (Math.random()-0.5) * 150);
                            let jy = dino.y + dino.h/2 + (k === 0 ? 0 : (Math.random()-0.5) * 60);
                            let jj = this.tapTrungNac() >= 3;
                            this.addCut(jx, jy, jj ? 92 : 74, (jj ? 26 : 34) + k * 16, 1);
                            if (k === 0) this.pushDop('cut', { x: jx, y: jy, r: 74 });
                        }
                        if (SFX.tone) SFX.tone(1800, 0.10, 'sine', 0.12, 500);
                    }
                    if (this.subTimer > (this.stage === 3 ? 92 : 62)) this.toIdle(30);
                    return;
                }
                // ===== JUDGEMENT CUT END (pha 3) =====
                if (st === 'v_jce'){
                    if (T(4)){
                        this.faceP();
                        let jx = dino.x + dino.w/2;
                        this.jce = { x: Math.max(150, Math.min(canvas.width - 150, jx)), t: 96, max: 96 };
                        floatingTexts.push(new FloatingText(this.cx() - 110, 132, "JUDGEMENT CUT END!"));
                        if (SFX.bossEntry) SFX.bossEntry();
                    }
                    if (this.jce){
                        this.jce.t--;
                        this.armL = -1.4 - Math.sin(this.subTimer * 0.2) * 0.2;
                        if (this.jce.t <= 0){
                            let jx = this.jce.x;
                            for (let k = 0; k < 14; k++)
                                visualEffects.push(new Effect(jx + (Math.random()-0.5)*250, 150 + Math.random()*170, 'explosion', true, 24 + Math.random()*26));
                            if (checkAABB(dino, { x: jx - 140, y: 90, w: 280, h: 240 })) this.hurtP(2);
                            shakeTimer = 55; this.jce = null;
                            if (SFX.bossExplode) SFX.bossExplode();
                        }
                    }
                    if (this.subTimer > 128) this.toIdle(46);
                    return;
                }
                this.toIdle(30);
            }
            // ======================= PHA 2 — SIN DEVIL TRIGGER =======================
            startPhase2(){
                this.phase = 2; this.stage = 3;
                this.hp = 95; this.maxHp = 95; this.invulnAll = true;
                this.suW = this.w; this.suH = this.h; this.suTenGoc = "VERGIL";
                this.name = "VERGIL — SIN DEVIL TRIGGER";
                this.state = 'sdt_wake'; this.subTimer = 0; this._bag = null; this.atkBag = [];
                this.w = 64; this.h = 86; this.baseY = 320 - this.h;
                this.y = this.baseY; this.dy = 0; this.dashV = 0;
                this.swords.length = 0; this.cuts.length = 0; this.slash = null; this.tel = null; this.jce = null;
                bossProjectiles.length = 0;
                this.fly = 0; this.wing = 0; this.dim = null; this.dome = null; this.rain = []; this.fams = [];
                this.aura = 1; this.hover = this.baseY - 70;
                this.dop = { x: canvas.width - this.x - this.w, y: this.y, left: !this.facingLeft, drawn: false, armR: 0, slash: null };
                floatingTexts.push(new FloatingText(this.cx() - 130, 130, "SIN DEVIL TRIGGER!"));
                shakeTimer = 90; if (SFX.bossEntry) SFX.bossEntry();
            }
            flyTo(ty, k){
                this.y += (ty - this.y) * (k || 0.08);
                this.dy = 0; this.grounded = false;
            }
            updateSDT(){
                this.suTickPhu();
                if (this.sdtUltTick()) return;
                this.wing += 0.08;
                if (this.tel){ this.tel.t--; if (this.tel.t <= 0) this.tel = null; }
                if (this.slash){ this.slash.t--; if (this.slash.t <= 0){ this.slash = null; this.drawn = false; } }
                for (let i = this.ghosts.length - 1; i >= 0; i--){ this.ghosts[i].t--; if (this.ghosts[i].t <= 0) this.ghosts.splice(i, 1); }
                if (this.warpT > 0) this.warpT--;
                this.tickSwords(); this.tickCuts(); this.tickSdtDop();
                this.tickRain(); this.tickFams();
                if (this.state === 'sdt_wake'){
                    this.subTimer++;
                    this.flyTo(this.baseY - 40, 0.06);
                    if (this.subTimer % 9 === 0) this.ghost();
                    if (this.subTimer % 9 === 0) visualEffects.push(new Effect(this.cx() + (Math.random()-0.5)*90, this.cy() + (Math.random()-0.5)*90, 'explosion', true, 22));
                    if (this.subTimer > 96){ this.invulnAll = false; this.toIdle(24); }
                    return;
                }
                if (this.fly > 0){ this.fly--; this.flyTo(this.hover, 0.09); }
                else {
                    this.dy += 0.6; this.y += this.dy;
                    if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; } else this.grounded = false;
                }
                this.x += this.dashV; this.dashV *= 0.9; if (Math.abs(this.dashV) < 0.4) this.dashV = 0;
                this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
                if (this.slash){
                    let r = this.slashRect();
                    if (!this.slash.hit && checkAABB(dino, r)){ this.slash.hit = true; this.hurtP(1); }
                }
                if (this.state === 'idle'){
                    this.faceP();
                    let g = this.gap();
                    if (Math.abs(g) > 150) this.x += Math.sign(g) * 2.1;
                    this.actionTimer--;
                    if (this.actionTimer <= 0){
                        this.state = pickFromBag(this, ['s_dim','s_rain','s_dome','s_dive','s_grand','s_worldv','s_storm2','s_hellon','s_barrage']);
                        this.subTimer = 0;
                    }
                    return;
                }
                this.runSDT();
            }
            tickSdtDop(){
                if (!this.dop) return;
                let h = this.hist[Math.max(0, this.hist.length - 1 - VG_DOP_LAG)];
                if (h){ this.dop.x = canvas.width - h.x - this.w; this.dop.y = h.y; this.dop.left = !h.left; this.dop.drawn = h.drawn; this.dop.armR = -h.armR; }
                if (this.dop.slash){ this.dop.slash.t--; if (this.dop.slash.t <= 0) this.dop.slash = null; }
                if (this.dop.slash){
                    let a = this.dop.slash;
                    let r = a.dir < 0 ? { x: this.dop.x - a.reach, y: this.dop.y + 6 - a.up, w: a.reach, h: this.h + a.up - 6 }
                                      : { x: this.dop.x + this.w, y: this.dop.y + 6 - a.up, w: a.reach, h: this.h + a.up - 6 };
                    if (!a.hit && checkAABB(dino, r)){ a.hit = true; this.hurtP(1); }
                }
                for (let i = this.dopEv.length - 1; i >= 0; i--){
                    let e = this.dopEv[i]; e.t--;
                    if (e.t > 0) continue;
                    this.dopEv.splice(i, 1);
                    if (e.kind === 'slash') this.dop.slash = { t: e.d.life, dir: -e.d.dir, reach: e.d.reach, up: e.d.up, hit: false };
                    else if (e.kind === 'cut') this.addCut(canvas.width - e.d.x, e.d.y, e.d.r, 26, 1);
                    else if (e.kind === 'swords'){
                        for (let k = 0; k < (e.d.n||3); k++){
                            let sx = this.dop.x + this.w/2 + (k-1)*22;
                            this.addSword(sx, this.dop.y - 16, 0, 'shoulder');
                            let s2 = this.swords[this.swords.length-1]; s2.hx = sx; s2.hy = this.dop.y - 16; s2.wait = 26;
                        }
                    }
                }
            }
            tickRain(){
                for (let i = this.rain.length - 1; i >= 0; i--){
                    let r = this.rain[i]; r.t--;
                    if (r.t > 0) continue;
                    r.y += 17;
                    if (!r.hit && checkAABB(dino, { x: r.x - 13, y: r.y - 26, w: 26, h: 52 })){ r.hit = true; this.hurtP(1); }
                    if (r.y > 340){
                        visualEffects.push(new Effect(r.x, 318, 'explosion', true, 18));
                        this.rain.splice(i, 1);
                    }
                }
            }
            tickFams(){
                for (let i = this.fams.length - 1; i >= 0; i--){
                    let f = this.fams[i]; f.life--; f.a += 0.045;
                    f.x = this.cx() + Math.cos(f.a) * f.r; f.y = this.cy() + Math.sin(f.a) * f.r * 0.55;
                    f.cd--;
                    if (f.cd <= 0){
                        f.cd = 62;
                        let ang = Math.atan2((dino.y + dino.h/2) - f.y, (dino.x + dino.w/2) - f.x);
                        let bp = new BossProjectile(f.x, f.y, Math.cos(ang)*8, Math.sin(ang)*8, false, 1);
                        bp.w = 16; bp.h = 16; bp.color = "#B388FF"; bossProjectiles.push(bp);
                    }
                    for (let pi = projectiles.length - 1; pi >= 0; pi--){
                        let pr = projectiles[pi]; if (!pr || pr.owner !== 1) continue;
                        if (!checkAABB(pr, { x: f.x-14, y: f.y-14, w: 28, h: 28 })) continue;
                        f.hp--; if (!(pr.type === 2 || (pr.pierceCount||0) > 0)) projectiles.splice(pi, 1);
                        visualEffects.push(new Effect(f.x, f.y, 'explosion', true, 10)); break;
                    }
                    if (f.life <= 0 || f.hp <= 0){ visualEffects.push(new Effect(f.x, f.y, 'explosion', true, 20)); this.fams.splice(i, 1); }
                }
            }
            runSDT(){
                let st = this.state, sp = 1.15; this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;
                // ===== DIMENSION SLASH =====
                if (st === 's_dim'){
                    if (T(6)){
                        this.fly = 200; this.faceP();
                        let band = Math.random() < 0.5 ? 'low' : 'high';
                        this.dim = { band: band, y: band === 'low' ? 286 : 214, t: 72, max: 72, dir: (dino.x + dino.w/2) < this.cx() ? -1 : 1, go: false, hit: false };
                        this.hover = this.dim.y - this.h/2;
                        floatingTexts.push(new FloatingText(this.cx() - 100, 128, band === 'low' ? "NHẢY QUA!" : "XUỐNG THẤP!"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.dim){
                        this.dim.t--;
                        if (this.dim.t <= 0 && !this.dim.go){
                            this.dim.go = true; this.x = this.dim.dir < 0 ? canvas.width + 40 : -80;
                            this.facingLeft = this.dim.dir < 0; this.drawn = true; shakeTimer = 40;
                            if (SFX.bossExplode) SFX.bossExplode();
                        }
                        if (this.dim.go){
                            this.x += this.dim.dir * 34; this.ghost();
                            let r = { x: 0, y: this.dim.y - 34, w: canvas.width, h: 68 };
                            let px = dino.x + dino.w/2;
                            if (!this.dim.hit && Math.abs(px - this.cx()) < 90 && checkAABB(dino, r)){ this.dim.hit = true; this.hurtP(2); }
                            if (this.x < -140 || this.x > canvas.width + 100){ this.dim = null; this.x = Math.max(60, Math.min(canvas.width-140, dino.x)); this.drawn = false; }
                        }
                    }
                    if (this.subTimer > 130){ this.dim = null; this.fly = 0; this.toIdle(34); }
                    return;
                }
                // ===== JUDGEMENT CUT END (pha 2) =====
                if (st === 's_dome'){
                    if (T(6)){
                        this.fly = 220;
                        this.hover = this.baseY - 90;
                        let jx = Math.max(190, Math.min(canvas.width - 190, dino.x + dino.w/2));
                        this.dome = { x: jx, r: 185, t: 110, max: 110 };
                        floatingTexts.push(new FloatingText(this.cx() - 120, 126, "JUDGEMENT CUT END!"));
                        if (SFX.bossEntry) SFX.bossEntry();
                    }
                    if (this.dome){
                        this.dome.t--;
                        if (this.dome.t <= 0){
                            let jx = this.dome.x;
                            for (let k = 0; k < 20; k++)
                                visualEffects.push(new Effect(jx + (Math.random()-0.5)*330, 130 + Math.random()*190, 'explosion', true, 26 + Math.random()*30));
                            let dx = (dino.x + dino.w/2) - jx, dy2 = (dino.y + dino.h/2) - 320;
                            if (Math.sqrt(dx*dx + dy2*dy2) < 185) this.hurtP(2);
                            shakeTimer = 70; this.dome = null;
                            if (SFX.bossExplode) SFX.bossExplode();
                        }
                    }
                    if (this.subTimer > 150){ this.dome = null; this.fly = 0; this.toIdle(44); }
                    return;
                }
                // ===== BLISTERING SWORDS =====
                if (st === 's_rain'){
                    if (T(4)){ this.fly = 150; this.hover = this.baseY - 76; }
                    if (T(26)){
                        let slots = 11, holes = [1 + Math.floor(Math.random()*4), 6 + Math.floor(Math.random()*4)];
                        for (let k = 0; k < slots; k++){
                            if (holes.indexOf(k) >= 0) continue;
                            this.rain.push({ x: 50 + k * ((canvas.width - 100) / (slots - 1)), y: -30, t: 30 + k * 4, hit: false });
                        }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 118){ this.fly = 0; this.toIdle(36); }
                    return;
                }
                // ===== SPECTRAL DIVE =====
                if (st === 's_dive'){
                    if (T(4)){ this.fly = 90; this.hover = this.baseY - 130; this._dv = false; }
                    if (this.subTimer > 10 && this.subTimer < 56){ this.faceP(); let g = this.gap(); this.x += Math.sign(g) * Math.min(4, Math.abs(g) * 0.05); }
                    if (T(56)){
                        this.fly = 0; this.faceP();
                        let g = this.gap();
                        this.dashV = Math.sign(g || 1) * 17; this.dy = 15;
                        this.drawn = true; this.doSlash(88, 22, 26);
                        for (let k = 0; k < 5; k++) this.ghost();
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 60 && this.grounded && !this._dv){
                        this._dv = true; shakeTimer = 34;
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 54));
                        if (checkAABB(dino, { x: this.cx() - 110, y: this.baseY - 20, w: 220, h: this.h + 24 })) this.hurtP(1);
                    }
                    if (this.subTimer > 92){ this._dv = false; this.toIdle(34); }
                    return;
                }
                // ===== GRAND CRESCENT =====
                if (st === 's_grand'){
                    if (T(8)){ this.faceP(); this.warn(150, 40, 26); }
                    if (T(34)){
                        this.drawn = true; this.armR = -1.6;
                        let d2 = this.dir();
                        let bp = new BossProjectile(this.cx() + d2*30, 320 - 96, 9.5 * d2, 0, false, 1);
                        bp.w = 54; bp.h = 96; bp.color = "#B388FF"; bp.crescent = true; bp.isPiercing = true;
                        bossProjectiles.push(bp);
                        this.doSlash(150, 40, 18);
                        shakeTimer = 30; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 76) this.toIdle(34);
                    return;
                }
                // ===== WORLD OF V =====
                if (st === 's_worldv'){
                    if (T(20)){
                        for (let k = 0; k < 3; k++)
                            this.fams.push({ x: this.cx(), y: this.cy(), a: (k/3)*Math.PI*2, r: 86, cd: 30 + k*20, life: 420, hp: 2 });
                        floatingTexts.push(new FloatingText(this.cx() - 70, this.y - 40, "WORLD OF V"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 54) this.toIdle(30);
                    return;
                }
                // ===== STORM SWORDS ban SDT =====
                if (st === 's_storm2'){
                    if (T(8)) this.faceP();
                    if (T(24) || T(56)){
                        let lay = this.subTimer < 40 ? 0 : 1;
                        let tx = dino.x + dino.w/2, ty = dino.y + dino.h/2, n = 8;
                        for (let k = 0; k < n; k++){
                            this.addSword(0, 0, (k/n)*Math.PI*2 + lay*0.4, 'ring');
                            let s2 = this.swords[this.swords.length-1];
                            s2.tx = tx; s2.ty = ty; s2.r = 150 - lay*30; s2.wait = 66;
                        }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 140) this.toIdle(38);
                    return;
                }
                // ===== [CHIEU MOI SDT] HELL ON EARTH (SDT) — Dam vo mat dat bung cot nang luong va song xung kich =====
                if (st === 's_hellon'){
                    if (T(4)){
                        this.warpTo(dino.x + dino.w/2 - this.w/2, this.baseY - 90);
                        this.fly = 30; this.hover = this.baseY - 90;
                        this.armR = -2.4;
                        floatingTexts.push(new FloatingText(this.cx() - 75, this.y - 34, "HELL ON EARTH!"));
                        if (SFX.bossEntry) SFX.bossEntry();
                    }
                    if (T(28)){ this.fly = 0; this.dy = 22; }
                    if (this.subTimer > 28 && this.grounded && !this._hoeHit){
                        this._hoeHit = true;
                        shakeTimer = 46;
                        this._hoeRing = { x: this.cx(), t: 24, max: 24 };
                        for (let k = 0; k < 8; k++)
                            visualEffects.push(new Effect(this.cx() + (k - 3.5) * 36, 305 - (k % 2) * 35, 'explosion', true, 40));
                        for (let s = -1; s <= 1; s += 2){
                            let bp = new BossProjectile(this.cx() + s * 28, 320 - 84, 11 * s, 0, false, 1);
                            bp.w = 42; bp.h = 84; bp.color = "#00E5FF"; bp.fire = true; bp.isPiercing = true;
                            bossProjectiles.push(bp);
                        }
                        let dx = Math.abs((dino.x + dino.w/2) - this.cx());
                        if (dx < 145 && dino.y + dino.h > 220) this.hurtP(2);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 68){ this._hoeHit = false; this.toIdle(34); }
                    return;
                }
                // ===== [CHIEU MOI SDT] MIRAGE BARRAGE — Bay lo lung phong lien hoan 8 thanh kiem + 2 Judgement Cut =====
                if (st === 's_barrage'){
                    if (T(4)){
                        this.fly = 95; this.hover = this.baseY - 85;
                        floatingTexts.push(new FloatingText(this.cx() - 75, this.y - 34, "MIRAGE BARRAGE!"));
                    }
                    if (this.subTimer > 14 && this.subTimer < 70 && Math.floor(this.subTimer) % 7 === 0){
                        this.faceP();
                        let sx = this.cx() + (Math.random() - 0.5) * 70, sy = this.y - 10 + (Math.random() - 0.5) * 30;
                        this.addSword(sx, sy, 0, 'shoulder');
                        let sw = this.swords[this.swords.length - 1];
                        sw.hx = sx; sw.hy = sy; sw.wait = 12;
                        if (SFX.tone) SFX.tone(1550, 0.04, 'triangle', 0.08, 950);
                    }
                    if (T(72)){
                        this.addCut(dino.x + dino.w/2, dino.y + dino.h/2, 82, 26, 1);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 105){ this.fly = 0; this.toIdle(32); }
                    return;
                }
                this.toIdle(30);
            }
            // ---- ve mot thanh SUMMONED SWORD (nâng cấp hình dáng thanh kiếm ảo ảnh) ----
            _sword(s, col){
                ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.ang);
                ctx.shadowColor = col; ctx.shadowBlur = 10;
                ctx.fillStyle = col;
                ctx.beginPath();
                ctx.moveTo(18, 0); ctx.lineTo(3, -4.5); ctx.lineTo(-4, -2);
                ctx.lineTo(-10, -5); ctx.lineTo(-8, -1.5); ctx.lineTo(-15, 0);
                ctx.lineTo(-8, 1.5); ctx.lineTo(-10, 5); ctx.lineTo(-4, 2);
                ctx.lineTo(3, 4.5);
                ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FFFFFF";
                ctx.beginPath(); ctx.moveTo(16, 0); ctx.lineTo(2, -1.6); ctx.lineTo(-11, 0); ctx.lineTo(2, 1.6); ctx.closePath(); ctx.fill();
                ctx.restore();
            }
            draw(){
                if (this.suVe) this.suVe();      // chieu cuoi SDT + kiem anh + dau KIET SUC
                let dt = this.stage === 3, col = dt ? "#B388FF" : "#40C4FF";

                // --- Hieu ung vet nut khong gian VOID SLASH ---
                if (this._voidFx){
                    let vf = this._voidFx, k = vf.t / vf.max;
                    ctx.save();
                    ctx.translate(vf.x, vf.y);
                    ctx.globalAlpha = Math.min(1, k * 1.3);
                    ctx.fillStyle = "rgba(18, 10, 42, 0.78)";
                    ctx.beginPath(); ctx.ellipse(0, 0, 52 * (1.1 - k * 0.2), 40 * k, 0, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "#00E5FF"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.ellipse(0, 0, 52 * (1.1 - k * 0.2), 40 * k, 0, 0, 6.28); ctx.stroke();
                    // Cac duong nut kinh vo trong khong gian
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 1.8;
                    for (let i = 0; i < 5; i++){
                        let a = i * 1.25 + 0.3;
                        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 48, Math.sin(a) * 34); ctx.stroke();
                    }
                    ctx.restore();
                }

                // --- Hieu ung cot no HELL ON EARTH ---
                if (this._hoeRing){
                    let hr = this._hoeRing, k = hr.t / hr.max;
                    ctx.save();
                    ctx.globalAlpha = 0.75 * k;
                    let hg = ctx.createLinearGradient(hr.x - 110, 0, hr.x + 110, 0);
                    hg.addColorStop(0, "rgba(0, 229, 255, 0)");
                    hg.addColorStop(0.5, "rgba(124, 77, 255, 0.85)");
                    hg.addColorStop(1, "rgba(0, 229, 255, 0)");
                    ctx.fillStyle = hg;
                    ctx.fillRect(hr.x - 110 * (1.2 - k * 0.3), 120, 220 * (1.2 - k * 0.3), 200);
                    ctx.strokeStyle = "#E0F7FA"; ctx.lineWidth = 4 * k;
                    ctx.beginPath(); ctx.arc(hr.x, 316, 145 * (1 - k * 0.5), Math.PI, 0); ctx.stroke();
                    ctx.restore();
                }

                // --- vung JUDGEMENT CUT END ---
                if (this.jce){
                    let k = 1 - this.jce.t / this.jce.max;
                    ctx.save();
                    ctx.globalAlpha = 0.14 + 0.26 * k;
                    ctx.fillStyle = "#7C4DFF"; ctx.fillRect(this.jce.x - 140, 90, 280, 240);
                    ctx.globalAlpha = 0.9; ctx.strokeStyle = (frames % 8 < 4) ? "#FFFFFF" : "#B388FF";
                    ctx.lineWidth = 3; ctx.strokeRect(this.jce.x - 140, 90, 280, 240);
                    ctx.strokeStyle = "rgba(255,255,255," + (0.25 + 0.45*k).toFixed(2) + ")"; ctx.lineWidth = 2;
                    for (let i = -3; i <= 3; i++){
                        ctx.beginPath(); ctx.moveTo(this.jce.x - 140, 210 + i * 40 - 60*k); ctx.lineTo(this.jce.x + 140, 210 + i * 40 + 60*k); ctx.stroke();
                    }
                    ctx.fillStyle = "#FFF"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(Math.ceil(this.jce.t / 60) + "″", this.jce.x, 116); ctx.textAlign = "left";
                    ctx.restore();
                }
                // --- vung Judgement Cut ---
                for (let c of this.cuts){
                    ctx.save();
                    if (c.t > 0){
                        let k = 1 - c.t / c.warn;
                        ctx.globalAlpha = 0.20 + 0.35 * k;
                        ctx.strokeStyle = dt ? "#B388FF" : "#40C4FF"; ctx.lineWidth = 2.5;
                        ctx.setLineDash([8, 7]); ctx.lineDashOffset = -frames;
                        ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, 6.28); ctx.stroke(); ctx.setLineDash([]);
                        ctx.globalAlpha = 0.85; ctx.lineWidth = 3.5;
                        ctx.beginPath(); ctx.arc(c.x, c.y, c.r * (0.25 + 0.75*k), 0, 6.28); ctx.stroke();
                    } else {
                        let k = c.boom / 20;
                        ctx.globalAlpha = k;
                        ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 3;
                        for (let i = 0; i < 6; i++){
                            let a = (i / 6) * Math.PI + frames * 0.02, R = c.r * (1.15 - 0.15*k);
                            ctx.beginPath();
                            ctx.moveTo(c.x - Math.cos(a)*R, c.y - Math.sin(a)*R);
                            ctx.lineTo(c.x + Math.cos(a)*R, c.y + Math.sin(a)*R); ctx.stroke();
                        }
                        ctx.globalAlpha = k * 0.5; ctx.fillStyle = dt ? "#B388FF" : "#40C4FF";
                        ctx.beginPath(); ctx.arc(c.x, c.y, c.r * (1 - k) * 1.2, 0, 6.28); ctx.fill();
                    }
                    ctx.restore();
                }
                // --- kiem trieu hoi ---
                for (let s of this.swords) this._sword(s, s.fired ? "#E1F5FE" : col);
                // --- anh mo khi warp ---
                for (let g of this.ghosts){
                    ctx.save(); ctx.globalAlpha = (g.t / 16) * 0.42;
                    let gm = { facingLeft: g.left, stage: this.stage, drawn: g.drawn, armR: g.armR, armL: 0, wing: this.wing, beo: g.beo, mirageWep: g.mirageWep, isDop: true };
                    if (this.phase === 2) drawSinVergil(gm, g.x, g.y); else drawVergilBody(gm, g.x, g.y);
                    ctx.restore();
                }
                // --- PHAN THAN (Doppelganger) ruc sang mau lam linh hon ---
                if (this.dop){
                    ctx.save(); ctx.globalAlpha = 0.68;
                    let dm = { facingLeft: this.dop.left, stage: this.stage, drawn: this.dop.drawn, armR: this.dop.armR, armL: 0, wing: this.wing, isDop: true };
                    if (this.phase === 2) drawSinVergil(dm, this.dop.x, this.dop.y); else drawVergilBody(dm, this.dop.x, this.dop.y);
                    ctx.restore();
                    if (this.dop.slash){
                        let a = this.dop.slash, cxS = a.dir < 0 ? this.dop.x : this.dop.x + this.w;
                        ctx.save(); ctx.globalAlpha = Math.min(1, a.t / 8);
                        ctx.strokeStyle = "#00E5FF"; ctx.lineWidth = 6; ctx.lineCap = "round";
                        for (let k = 0; k < 2; k++){
                            ctx.beginPath();
                            ctx.arc(cxS, this.dop.y + this.h/2, Math.max(8, a.reach - k*16), a.dir < 0 ? Math.PI-0.9 : -0.9, a.dir < 0 ? Math.PI+0.9 : 0.9, false);
                            ctx.stroke();
                        }
                        ctx.restore();
                    }
                }
                // --- HAO QUANG DEVIL TRIGGER ---
                if (dt && this.aura > 0){
                    ctx.save();
                    ctx.globalAlpha = 0.24 * this.aura * (0.75 + 0.25*Math.sin(frames*0.16));
                    ctx.fillStyle = "#00B0FF";
                    ctx.beginPath(); ctx.ellipse(this.cx(), this.cy(), 46, 56, 0, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 0.42 * this.aura;
                    ctx.strokeStyle = "#80D8FF"; ctx.lineWidth = 3;
                    for (let s2 = -1; s2 <= 1; s2 += 2){
                        ctx.beginPath();
                        ctx.moveTo(this.cx(), this.y + 16);
                        ctx.quadraticCurveTo(this.cx() + s2*54, this.y - 20 + Math.sin(frames*0.1)*5, this.cx() + s2*32, this.y + 44);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // --- BAO NHAT CHEM ---
                if (this.tel){
                    let t = this.tel, k = 1 - t.t / t.max;
                    let cxT = t.dir < 0 ? this.x : this.x + this.w, cyT = this.y + this.h/2;
                    ctx.save();
                    ctx.globalAlpha = 0.28 + 0.45 * k;
                    ctx.strokeStyle = "#40C4FF"; ctx.lineWidth = 2.5; ctx.lineCap = "round";
                    ctx.setLineDash([7, 6]); ctx.lineDashOffset = -frames * 0.8;
                    ctx.beginPath(); ctx.arc(cxT, cyT, t.reach, t.dir < 0 ? Math.PI-0.9 : -0.9, t.dir < 0 ? Math.PI+0.9 : 0.9, false); ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.globalAlpha = 0.85; ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = 4;
                    let a0 = t.dir < 0 ? Math.PI-0.9 : -0.9, a1 = t.dir < 0 ? Math.PI+0.9 : 0.9;
                    ctx.beginPath(); ctx.arc(cxT, cyT, t.reach, a0, a0 + (a1-a0)*k, false); ctx.stroke();
                    ctx.restore();
                }
                // --- MUA KIEM (pha 2) ---
                for (let r of this.rain){
                    if (r.t > 0){
                        let k = Math.max(0, Math.min(1, 1 - r.t / 40));
                        ctx.save(); ctx.globalAlpha = 0.30 + 0.4*k;
                        ctx.strokeStyle = "#B388FF"; ctx.lineWidth = 2; ctx.setLineDash([6,6]); ctx.lineDashOffset = -frames;
                        ctx.beginPath(); ctx.moveTo(r.x, 0); ctx.lineTo(r.x, 320); ctx.stroke(); ctx.setLineDash([]);
                        ctx.restore();
                    } else this._sword({ x: r.x, y: r.y, ang: Math.PI/2 }, "#E1F5FE");
                }
                // --- GIA DONG (World of V) ---
                for (let f of this.fams){
                    ctx.save(); ctx.shadowColor = "#B388FF"; ctx.shadowBlur = 14;
                    ctx.fillStyle = "#4527A0"; ctx.beginPath(); ctx.arc(f.x, f.y, 13, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#D1C4E9"; ctx.beginPath(); ctx.arc(f.x, f.y, 6, 0, 6.28); ctx.fill();
                    ctx.restore();
                    ctx.fillStyle = "#FF5252";
                    for (let k = 0; k < 2; k++){ ctx.globalAlpha = k < f.hp ? 1 : 0.2; ctx.fillRect(f.x - 8 + k*9, f.y - 20, 7, 3); }
                    ctx.globalAlpha = 1;
                }
                // --- DAI DIMENSION SLASH ---
                if (this.dim && !this.dim.go){
                    let k = 1 - this.dim.t / this.dim.max;
                    ctx.save();
                    ctx.globalAlpha = 0.12 + 0.30 * k;
                    ctx.fillStyle = "#7C4DFF"; ctx.fillRect(0, this.dim.y - 34, canvas.width, 68);
                    ctx.globalAlpha = 0.95; ctx.strokeStyle = (frames % 6 < 3) ? "#FFFFFF" : "#B388FF"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(0, this.dim.y - 34); ctx.lineTo(canvas.width, this.dim.y - 34);
                    ctx.moveTo(0, this.dim.y + 34); ctx.lineTo(canvas.width, this.dim.y + 34); ctx.stroke();
                    ctx.restore();
                }
                // --- VOM JUDGEMENT CUT END (pha 2) ---
                if (this.dome){
                    let k = 1 - this.dome.t / this.dome.max;
                    ctx.save();
                    ctx.globalAlpha = 0.13 + 0.27 * k;
                    ctx.fillStyle = "#7C4DFF";
                    ctx.beginPath(); ctx.arc(this.dome.x, 320, this.dome.r, Math.PI, 0); ctx.fill();
                    ctx.globalAlpha = 0.95; ctx.strokeStyle = (frames % 8 < 4) ? "#FFFFFF" : "#B388FF"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.dome.x, 320, this.dome.r, Math.PI, 0); ctx.stroke();
                    ctx.strokeStyle = "rgba(255,255,255," + (0.2 + 0.5*k).toFixed(2) + ")"; ctx.lineWidth = 2;
                    for (let i = 1; i < 7; i++){
                        let a = Math.PI + (i/7) * Math.PI;
                        ctx.beginPath(); ctx.moveTo(this.dome.x, 320);
                        ctx.lineTo(this.dome.x + Math.cos(a)*this.dome.r*k, 320 + Math.sin(a)*this.dome.r*k); ctx.stroke();
                    }
                    ctx.fillStyle = "#FFF"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(Math.ceil(this.dome.t / 60) + "″", this.dome.x, 168); ctx.textAlign = "left";
                    ctx.restore();
                }
                // --- THAN VERGIL ---
                if (this.warpT > 0){ ctx.save(); ctx.globalAlpha = 1 - this.warpT / VG_WARP; }
                if (this.phase === 2) drawSinVergil(this, this.x, this.y);
                else drawVergilBody(this, this.x, this.y);
                if (this.warpT > 0) ctx.restore();
                // --- vet chem ---
                if (this.slash){
                    let a = this.slash, cxS = a.dir < 0 ? this.x : this.x + this.w;
                    ctx.save(); ctx.globalAlpha = Math.min(1, a.t / 8);
                    ctx.strokeStyle = a.mirage ? "#00E5FF" : (a.beo ? "#E1F5FE" : "#FFFFFF"); ctx.lineWidth = 6; ctx.lineCap = "round";
                    ctx.shadowColor = a.mirage ? "#00B0FF" : col; ctx.shadowBlur = 12;
                    for (let k = 0; k < 3; k++){
                        ctx.beginPath();
                        ctx.arc(cxS, this.y + this.h/2, Math.max(8, a.reach - k*16), a.dir < 0 ? Math.PI-0.9 : -0.9, a.dir < 0 ? Math.PI+0.9 : 0.9, false);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // --- thanh mau + moc chuyen pha ---
                ctx.fillStyle = dt ? "#B388FF" : "#90CAF9"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                let _vl = this.phase === 2 ? "SIN DEVIL TRIGGER" : (dt ? "DEVIL TRIGGER" : (this.stage === 2 ? "DOPPELGANGER" : "DARK SLAYER"));
                ctx.fillText(_vl, this.cx(), this.y - 18);
                drawTopBossBar(this, dt ? "#B388FF" : "#29B6F6", "VERGIL — " + _vl);
                ctx.textAlign = "left";
                this.vgVeTapTrung();      // @@HE-VERGIL-DMC5
                // BEOWULF: gang/giay phat sang
                if (this.beo && this.phase === 1){
                    ctx.save(); ctx.globalAlpha = 0.55 + 0.3 * Math.sin(frames * 0.5);
                    ctx.fillStyle = "#E1F5FE"; ctx.shadowColor = "#40C4FF"; ctx.shadowBlur = 12;
                    let hx = this.cx() + this.dir() * 14;
                    ctx.beginPath(); ctx.arc(hx, this.y + 30, 5, 0, 6.28); ctx.fill();
                    ctx.beginPath(); ctx.arc(this.cx() - 6, this.y + this.h - 3, 5, 0, 6.28); ctx.arc(this.cx() + 8, this.y + this.h - 3, 5, 0, 6.28); ctx.fill();
                    ctx.restore();
                }
                // YAMATO GUARD: vo kiem chan truoc mat
                if (this.state === 'v_block' && this.phase === 1){
                    ctx.save(); let gx = this.cx() + this.dir() * 22;
                    ctx.strokeStyle = "#90CAF9"; ctx.lineWidth = 4; ctx.globalAlpha = 0.9;
                    ctx.beginPath(); ctx.moveTo(gx, this.y - 4); ctx.lineTo(gx + this.dir() * 4, this.y + this.h - 6); ctx.stroke();
                    ctx.globalAlpha = 0.25 + 0.15 * Math.sin(frames * 0.3); ctx.fillStyle = "#40C4FF";
                    ctx.fillRect(this.dir() < 0 ? this.x - 26 : this.x + this.w - 4, this.y - 8, 30, this.h + 10);
                    ctx.globalAlpha = 1; ctx.fillStyle = "#E3F2FD"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("YAMATO GUARD — ĐỪNG ĐÁNH!", this.cx(), this.y - 30); ctx.textAlign = "left";
                    ctx.restore();
                }
            }
        }
// BOSS_PART_END s0.VergilBoss.1

// Nguồn: index.html:6550 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.VG_CB_GAN.1 EDITABLE
const VG_CB_GAN = [
            ['v_combo','v_upper'],
            ['v_combo','v_lunar'],
            ['v_lunar','v_deep'],
            ['v_combo','v_trick','v_combo'],
            ['v_deep','v_upper'],
            ['v_combo','v_jcut'],
            ['v_void','v_combo','v_jcut'],                 // Void Slash giu chan -> Yamato Combo -> Judgement Cut
            ['v_kick13','v_lunar'],                        // Lien hoan cuoc Beowulf
            ['v_miragecombo','v_deep']                     // Song kiem Mirage Edge + Deep Stinger
        ];
// BOSS_PART_END s0.VG_CB_GAN.1

// Nguồn: index.html:6561 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.VG_CB_TIEP.1 EDITABLE
const VG_CB_TIEP = [
            ['v_rapid','v_combo'],
            ['v_trick','v_combo','v_upper'],
            ['v_deep','v_lunar'],
            ['v_trick','v_lunar','v_combo'],
            ['v_rapid','v_jcut'],
            ['v_trick','v_void','v_kick13'],               // Dich chuyen ap sat -> Void Slash -> Kick 13
            ['v_miragecombo','v_jcut']
        ];
// BOSS_PART_END s0.VG_CB_TIEP.1

// Nguồn: index.html:6570 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.VG_CB_XA.1 EDITABLE
const VG_CB_XA = [
            ['v_jcut','v_jcut','v_rapid'],
            ['v_swords','v_rapid','v_combo'],
            ['v_jcut','v_trick','v_combo'],
            ['v_swords','v_deep'],
            ['v_heavyrain','v_rapid','v_combo'],           // Mua kiem dinh dau -> lao vao chem
            ['v_heavyrain','v_void','v_jcut']
        ];
// BOSS_PART_END s0.VG_CB_XA.1

// Nguồn: index.html:6578 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.VG_CB_XA2.1 EDITABLE
const VG_CB_XA2 = [
            ['v_storm','v_jcut'],
            ['v_spiral','v_rapid','v_combo'],
            ['v_storm','v_trick','v_combo'],
            ['v_heavyrain','v_storm','v_deep']
        ];
// BOSS_PART_END s0.VG_CB_XA2.1

// Nguồn: index.html:6584 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.VG_CB_KHONG.1 EDITABLE
const VG_CB_KHONG = [['v_upper','v_jcut'], ['v_jcut','v_swords'], ['v_swords','v_upper'], ['v_jcut','v_jcut'], ['v_kick13','v_jcut']];
// BOSS_PART_END s0.VG_CB_KHONG.1

// Nguồn: index.html:6586 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.Object.assign.VergilBoss.prototype.1 EDITABLE
Object.assign(VergilBoss.prototype, {
            tapTrungNac(){ return Math.max(0, Math.min(3, Math.floor((this.tapTrung || 0) / 100))); },
            hurtP(n){
                if (dino.isShielding()){ parry(); this.tapTrung = Math.max(0, (this.tapTrung || 0) - 50); return; }
                let h = dino.hp; dino.takeDamage(n);
                if (dino.hp < h){ this.trungLuc = frames; this.trungMove = this.state; this.tapTrung = Math.min(330, (this.tapTrung || 0) + 60); }
            },
            anDon(){
                if (this.phase !== 1 || this.state !== 'v_block' || this.subTimer < 4) return false;
                if (frames - (this._chanKhung || -9) > 2){
                    this.daChan = (this.daChan || 0) + 1; this._chanKhung = frames;
                    visualEffects.push(new Effect(this.cx() + this.dir() * 22, this.cy(), 'parry', this.dir() < 0));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1500, 0.05, 'square', 0.10, 900);
                    this.tapTrung = Math.min(330, (this.tapTrung || 0) + 25);
                }
                return true;
            },
            toIdle(t){
                if (this.phase !== 1) this.chuoi = [];
                this.vgNoi(this.state);
                this.state = 'idle'; this.subTimer = 0; this.drawn = false; this.mirageWep = false; this.armR = 0; this.armL = 0;
                if (this.chuoi && this.chuoi.length && this.hp > 0){ this.actionTimer = Math.max(4, Math.round(7 / this.spd())); return; }
                this.noiThem = 0;
                this.actionTimer = Math.round(t * 1.1 / this.spd());
            },
            vgNoi(st){
                if (!st || this.phase !== 1) return;
                if (!this.chuoi) this.chuoi = [];
                let trung = (frames - (this.trungLuc || -999)) < 50 && this.trungMove === st;
                if (!trung || (this.noiThem || 0) >= (this.tapTrungNac() >= 2 ? 2 : 1)) return;
                let ke = null;
                if (st === 'v_upper' || st === 'v_kick13') ke = 'v_aerial';
                else if (st === 'v_void') ke = 'v_jcut';
                else if (st === 'v_combo' || st === 'v_deep' || st === 'v_rapid' || st === 'v_miragecombo') ke = Math.random() < 0.55 ? 'v_upper' : 'v_jcut';
                else if (st === 'v_lunar') ke = 'v_deep';
                if (ke && this.chuoi[0] !== ke){ this.chuoi.unshift(ke); this.noiThem = (this.noiThem || 0) + 1; }
            },
            pickSkill(){
                this.subTimer = 0; this.combo = 0;
                if (this.chuoi && this.chuoi.length){ this.batChieu(this.chuoi.shift()); return; }
                let kc = Math.abs(this.gap()), tren = !dino.grounded && (dino.y + dino.h) < 290;
                let bo;
                if (tren && kc < 220) bo = VG_CB_KHONG;
                else if (this.stage === 3 && (this.jceCd || 0) <= 0 && Math.random() < 0.24){
                    this.jceCd = 780; this.chuoi = [];
                    this.batChieu(Math.random() < 0.5 ? 'v_jce' : 'v_hellon');
                    return;
                }
                else if (kc > 320) bo = (this.stage >= 2 && Math.random() < 0.45) ? VG_CB_XA2 : VG_CB_XA;
                else if (kc > 140) bo = Math.random() < 0.3 ? VG_CB_XA : VG_CB_TIEP;
                else {
                    if (Math.random() < 0.12){ this.chuoi = ['v_counter']; this.batChieu('v_block'); return; }
                    bo = VG_CB_GAN;
                }
                this.chuoi = bo[Math.floor(Math.random() * bo.length)].slice();
                if (this.stage >= 2 && Math.random() < 0.25) this.chuoi.push(this.stage === 3 ? 'v_jcut' : 'v_swords');
                this.batChieu(this.chuoi.shift());
            },
            batChieu(c){
                this.state = c; this.subTimer = 0; this.combo = 0; this.faceP();
                if (c === 'v_block') this.daChan = 0;
                this.tapTrung = Math.min(330, (this.tapTrung || 0) + 6);
            },
            vgTick(){
                if (!this.suSt && !this.invulnAll) aaBanKem(this);      // @@HE-AA-RIENG
                if (this.jceCd > 0) this.jceCd--;
                if (this.trickCd > 0) this.trickCd--;
                let mat = (this._hpTruoc == null ? this.hp : this._hpTruoc) - this.hp; this._hpTruoc = this.hp;
                if (mat > 0) this.tapTrung = Math.max(0, (this.tapTrung || 0) - mat * 5);
                else if (this.state === 'idle') this.tapTrung = Math.min(330, (this.tapTrung || 0) + 0.25);
                if (this.state === 'stagein' || this.invulnAll || this.suSt || this.suYeu > 0) return false;
                if (this.state === 'v_block' && (this.daChan || 0) >= 3 && this.subTimer > 6){ this.toIdle(4); return false; }
                // TRICK NE DAN
                if ((this.trickCd || 0) <= 0 && (this.state === 'idle' || this.state === 'v_swords')){
                    let cx = this.cx(), cy = this.cy();
                    for (const pr of projectiles){
                        if (!pr || pr.owner !== 1) continue;
                        let px = pr.x + (pr.w || 0) / 2, py = pr.y + (pr.h || 0) / 2, vx = pr.vx || pr.speed || 0;
                        if (!((px < cx && vx > 0) || (px > cx && vx < 0)) || Math.abs(px - cx) > 150 || Math.abs(py - cy) > 70) continue;
                        this.trickCd = 150 - this.tapTrungNac() * 15;
                        if (Math.random() < 0.35 + this.tapTrungNac() * 0.1){
                            this.chuoi = [Math.random() < 0.5 ? 'v_combo' : 'v_kick13'];
                            this.batChieu('v_trick'); this._neDan = true;
                            floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, "TRICK!"));
                            return false;
                        }
                        break;
                    }
                }
                return false;
            },
            // ----- chieu moi & nang cap -----
            vgChieu(st, T){
                let d = this.dir();
                if (st === 'v_trick' || st === 'v_trickup'){
                    if (T(2)){
                        let pcx = dino.x + dino.w / 2, s = this.cx() < pcx ? 1 : -1;
                        if (st === 'v_trickup') this.warpTo(pcx - this.w / 2 - s * 30, Math.max(40, dino.y - 70));
                        else this.warpTo(pcx + s * 70 - this.w / 2, this.baseY);
                        if (st === 'v_trickup'){ this.dy = -2; }
                        if (this._neDan){ this.invulnAll = true; this._neKhoa = 10; this._neDan = false; }
                    }
                    if (this.subTimer > 12) this.toIdle(6);
                    return true;
                }
                // [CHIEU MOI] VOID SLASH — Chem rach khong gian phia truoc, lam cham & hat nhe nguoi choi
                if (st === 'v_void'){
                    if (T(4)){
                        this.faceP(); this.drawn = false; this.armR = 0.8; this.armL = -0.6;
                        this.warn(118, 36, 16);
                        floatingTexts.push(new FloatingText(this.x - 24, this.y - 34, "VOID SLASH!"));
                    }
                    if (T(20)){
                        this.faceP(); this.drawn = true; this.armR = -1.9;
                        this.doSlash(118, 36, 14);
                        let vx = this.cx() + this.dir() * 64, vy = this.cy() - 4;
                        this._voidFx = { x: vx, y: vy, t: 26, max: 26 };
                        if (checkAABB(dino, this.slashRect()) && !dino.isShielding()){
                            dino.dy = -5; dino.grounded = false;
                        }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 42) this.toIdle(18);
                    return true;
                }
                // [CHIEU MOI] KICK 13 (Beowulf) — Lao toi da xoay 4 cuoc anh sang roi hat tung Rising Sun
                if (st === 'v_kick13'){
                    this.beo = true;
                    if (T(4)){
                        this.faceP(); this.warn(84, 24, 12);
                        floatingTexts.push(new FloatingText(this.x - 22, this.y - 34, "KICK 13!"));
                    }
                    let hits = [16, 26, 36, 48];
                    for (let k = 0; k < 4; k++) if (T(hits[k])){
                        this.faceP();
                        let last = (k === 3);
                        this.dashV = this.dir() * (last ? 12 : 9);
                        this.doSlash(last ? 92 : 76, last ? 68 : 20, 9);
                        this.slash.beo = true;
                        if (last){
                            this.dy = -10; this.grounded = false;
                            if (checkAABB(dino, this.slashRect()) && !dino.isShielding()){ dino.dy = -12.5; dino.grounded = false; }
                        }
                        visualEffects.push(new Effect(this.cx() + this.dir() * 36, this.cy() - (last ? 16 : 0), 'parry', this.dir() < 0));
                        if (SFX.tone) SFX.tone(320 + k * 90, 0.06, 'square', 0.12, 180);
                    }
                    if (this.subTimer > 68){ this.beo = false; this.toIdle(20); }
                    return true;
                }
                // [CHIEU MOI] HEAVY RAIN BLADES — Trieu hoi 7 kiem ao anh treo tren dau nguoi choi roi roi xuong
                if (st === 'v_heavyrain'){
                    if (T(6)){
                        this.faceP(); this.armL = -1.6;
                        floatingTexts.push(new FloatingText(this.x - 36, this.y - 34, "HEAVY RAIN BLADES!"));
                    }
                    if (T(18)){
                        let px = dino.x + dino.w / 2;
                        for (let k = -3; k <= 3; k++){
                            let sx = Math.max(36, Math.min(canvas.width - 36, px + k * 34));
                            this.addSword(sx, 68, Math.PI / 2, 'heavyrain');
                            let sw = this.swords[this.swords.length - 1];
                            sw.hx = sx; sw.hy = 68; sw.wait = 22 + Math.abs(k) * 5;
                        }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 42) this.toIdle(18);
                    return true;
                }
                // [CHIEU MOI] MIRAGE EDGE COMBO B — Song kiem Yamato & Mirage Edge chem lien hoan 4 nhat
                if (st === 'v_miragecombo'){
                    this.mirageWep = true;
                    if (T(4)){
                        this.faceP(); this.drawn = true; this.warn(94, 24, 12);
                        floatingTexts.push(new FloatingText(this.x - 28, this.y - 34, "MIRAGE EDGE!"));
                    }
                    let hits = [16, 28, 40, 54];
                    for (let k = 0; k < 4; k++) if (T(hits[k])){
                        this.faceP();
                        this.armR = (k % 2 === 0) ? -1.7 : 0.9;
                        this.dashV = this.dir() * (k === 3 ? 14 : 8);
                        this.doSlash(k === 3 ? 112 : 88, 26, 9);
                        this.slash.mirage = true;
                        this.ghost();
                        if (SFX.tone) SFX.tone(680 + k * 80, 0.05, 'sawtooth', 0.11, 420);
                    }
                    if (this.subTimer > 70){ this.mirageWep = false; this.toIdle(22); }
                    return true;
                }
                // [CHIEU MOI] HELL ON EARTH (Pha 1 Stage 3) — Dam vo mat dat tao cot no nang luong
                if (st === 'v_hellon'){
                    this.beo = true;
                    if (T(4)){
                        this.warpNearP(this.gap() > 0 ? -1 : 1);
                        this.faceP(); this.dy = -9; this.grounded = false;
                        this.warn(135, 80, 26);
                        floatingTexts.push(new FloatingText(this.cx() - 65, this.y - 38, "HELL ON EARTH!"));
                        if (SFX.bossEntry) SFX.bossEntry();
                    }
                    if (this.subTimer > 6 && this.subTimer < 28){ this.dy = 0; this.y += (this.baseY - 45 - this.y) * 0.2; }
                    if (T(28)){ this.dy = 20; }
                    if (this.subTimer > 28 && this.grounded && !this._hoeHit){
                        this._hoeHit = true;
                        shakeTimer = 42;
                        this._hoeRing = { x: this.cx(), t: 22, max: 22 };
                        for (let k = 0; k < 6; k++)
                            visualEffects.push(new Effect(this.cx() + (k - 2.5) * 40, 305, 'explosion', true, 36));
                        for (let s = -1; s <= 1; s += 2){
                            let bp = new BossProjectile(this.cx() + s * 24, 320 - 80, 10 * s, 0, false, 1);
                            bp.w = 38; bp.h = 80; bp.color = "#40C4FF"; bp.fire = true; bp.isPiercing = true;
                            bossProjectiles.push(bp);
                        }
                        if (Math.abs((dino.x + dino.w/2) - this.cx()) < 135 && dino.y + dino.h > 230) this.hurtP(2);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 64){ this._hoeHit = false; this.beo = false; this.toIdle(32); }
                    return true;
                }
                if (st === 'v_upper'){             // UPPER SLASH
                    if (T(3)){ this.faceP(); this.warn(92, 80, 12); this.drawn = true; this.armR = 0.9; }
                    if (T(15)){
                        this.doSlash(94, 82, 12); this.armR = -2.4;
                        floatingTexts.push(new FloatingText(this.x - 22, this.y - 34, "UPPER SLASH"));
                        if (checkAABB(dino, this.slashRect()) && !dino.isShielding()){
                            dino.dy = -13.5; dino.grounded = false; dino.canDoubleJump = false;
                            this.dy = -12.5; this.grounded = false;
                        }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 30) this.toIdle(14);
                    return true;
                }
                if (st === 'v_aerial'){            // AERIAL RAVE -> HELM SPLITTER
                    if (T(1)){ this.faceP(); this.drawn = true; this._hb = false;
                        if (this.grounded){ this.dy = -13; this.grounded = false; }
                        let g = this.gap(); this.dashV = Math.sign(g) * Math.min(14, Math.abs(g) / 7); }
                    if (this.subTimer > 10 && this.subTimer < 40){
                        let hy = Math.max(40, Math.min(this.baseY - 30, dino.y + dino.h / 2 - this.h / 2));
                        this.dy = 0; this.y += (hy - this.y) * 0.25;
                        let g = this.gap(); if (Math.abs(g) > 44) this.x += Math.sign(g) * 3;
                    }
                    if (T(12)){ this.faceP(); this.warn(80, 30, 8); this.armR = -1.8; }
                    if (T(20)){ this.doSlash(84, 34, 8); this.armR = 0.9; if (SFX.tone) SFX.tone(700, 0.05, 'square', 0.10, 400); }
                    if (T(26)){ this.faceP(); this.warn(82, 30, 8); this.armR = -1.6; }
                    if (T(34)){ this.doSlash(86, 34, 8); this.armR = 1.2; if (SFX.tone) SFX.tone(760, 0.05, 'square', 0.10, 400);
                                if (checkAABB(dino, this.slashRect()) && !dino.grounded) dino.dy = Math.min(dino.dy, -6); }
                    if (T(42)){ this.faceP(); this.armR = -2.5; this.warn(62, 6, 10);
                                floatingTexts.push(new FloatingText(this.x - 26, this.y - 34, "HELM SPLITTER")); }
                    if (T(50)){ this.dy = 22; this.x += this.gap() * 0.25; }
                    if (this.subTimer > 50 && this.grounded && !this._hb){
                        this._hb = true; shakeTimer = Math.max(shakeTimer, 24);
                        this.doSlash(64, 10, 12);
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 40));
                        if (checkAABB(dino, { x: this.cx() - 78, y: this.baseY - 10, w: 156, h: this.h + 14 })) this.hurtP(1);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 58 && this.grounded){ this._hb = false; this.toIdle(18); }
                    if (this.subTimer > 120){ this._hb = false; this.toIdle(18); }
                    return true;
                }
                if (st === 'v_deep'){              // MIRAGE BLADE — DEEP STINGER
                    this.mirageWep = true;
                    if (T(6)){ this.faceP(); this.warn(150, 8, 18); this.drawn = true; this.armR = -1.4;
                               floatingTexts.push(new FloatingText(this.x - 24, this.y - 34, "DEEP STINGER")); }
                    if (T(24)){ this.dashV = this.dir() * 28; this.doSlash(150, 8, 14); this.slash.mirage = true;
                                for (let k = 0; k < 4; k++) this.ghost(); if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.subTimer > 24 && this.subTimer < 40 && Math.floor(this.subTimer) % 3 === 0) this.ghost();
                    if (this.subTimer > 50){ this.mirageWep = false; this.toIdle(22); }
                    return true;
                }
                if (st === 'v_lunar'){             // BEOWULF: LUNAR PHASE -> STARFALL
                    this.beo = true;
                    if (T(4)){ this.faceP(); this.warn(70, 36, 14); floatingTexts.push(new FloatingText(this.x - 24, this.y - 34, "LUNAR PHASE")); }
                    if (T(18)){ this.doSlash(74, 36, 10); this.slash.beo = true; this.dashV = this.dir() * 8; this.dy = -7; this.grounded = false;
                                if (SFX.tone) SFX.tone(220, 0.08, 'square', 0.14, 120); }
                    if (T(30)){ this.faceP(); this.warn(78, 30, 10); }
                    if (T(40)){ this.doSlash(80, 30, 10); this.slash.beo = true; this.dashV = this.dir() * 8;
                                if (SFX.tone) SFX.tone(260, 0.08, 'square', 0.14, 120); }
                    if (T(50)){ this.faceP(); this.dy = -13; this.grounded = false; this.dashV = Math.sign(this.gap()) * 4; }
                    if (T(64)){ this.faceP(); floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, "STARFALL"));
                                this.dashV = this.dir() * 13; this.dy = 15; this._sf = true; }
                    if (this._sf && this.subTimer > 64){
                        if (!this._sfHit && checkAABB(dino, { x: this.x - 10, y: this.y, w: this.w + 20, h: this.h + 10 })){ this._sfHit = true; this.hurtP(1); }
                        if (this.grounded){
                            this._sf = false; shakeTimer = Math.max(shakeTimer, 20);
                            visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 46));
                            if (!this._sfHit && checkAABB(dino, { x: this.cx() - 70, y: this.baseY - 6, w: 140, h: this.h + 10 })) this.hurtP(1);
                            if (SFX.bossExplode) SFX.bossExplode();
                        }
                    }
                    if (this.subTimer > 96 && this.grounded){ this.beo = false; this._sfHit = false; this._sf = false; this.toIdle(24); }
                    if (this.subTimer > 150){ this.beo = false; this._sfHit = false; this._sf = false; this.toIdle(24); }
                    return true;
                }
                if (st === 'v_block'){             // YAMATO GUARD
                    this.faceP(); this.drawn = false; this.armL = -1.0; this.armR = -0.3;
                    if (this.subTimer > 62) this.toIdle(10);
                    return true;
                }
                if (st === 'v_counter'){           // PHAN DON: iai tuc thi
                    if (T(2)){ this.faceP(); this.warn(100, 20, 8); }
                    if (T(10)){ this.doSlash(104, 22, 12); this.dashV = this.dir() * 10; shakeTimer = Math.max(shakeTimer, 10);
                                if (SFX.bossSkill) SFX.bossSkill();
                                if ((this.daChan || 0) > 0) this.addCut(dino.x + dino.w / 2, dino.y + dino.h / 2, 70, 28, 1); }
                    if (this.subTimer > 30){ this.daChan = 0; this.toIdle(20); }
                    return true;
                }
                if (st !== 'v_lunar' && st !== 'v_kick13' && st !== 'v_hellon') this.beo = false;
                return false;
            },
            // ----- thanh CONCENTRATION (canh phai thanh mau) -----
            vgVeTapTrung(){
                if (this.phase !== 1 || this.dying || !(this.hp > 0)) return;
                let v = this.tapTrung || 0, n = this.tapTrungNac();
                ctx.save();
                let dp = (typeof DPR === 'number') ? DPR : 1, dy0 = (typeof dojoMode !== 'undefined' && dojoMode) ? 42 : 0;
                ctx.setTransform(dp, 0, 0, dp, 0, dy0 * dp);
                let x = canvas.width / 2 + 186, y = 10;
                ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(x - 4, y, 110, 30);
                ctx.fillStyle = "#90CAF9"; ctx.font = "bold 8px Consolas, monospace"; ctx.textAlign = "left";
                ctx.fillText("CONCENTRATION", x, y + 10);
                for (let k = 0; k < 3; k++){
                    let bx = x + k * 34, f = Math.max(0, Math.min(1, (v - k * 100) / 100));
                    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fillRect(bx, y + 15, 31, 8);
                    ctx.fillStyle = n >= 3 ? ((frames % 20 < 10) ? "#E1F5FE" : "#40C4FF") : "#40C4FF";
                    ctx.fillRect(bx, y + 15, 31 * f, 8);
                }
                ctx.restore();
            }
        });
// BOSS_PART_END s0.Object.assign.VergilBoss.prototype.1

// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24489 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, IronhaulBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:24699 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.VG_W.1 READ_ONLY
const VG_W = 38, VG_H = 58;
// BOSS_PART_END s0.VG_W.1

// Nguồn: index.html:24700 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.VG_WARP.1 EDITABLE
const VG_WARP = 16;
// BOSS_PART_END s0.VG_WARP.1

// Nguồn: index.html:24701 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.VG_SWORD_R.1 EDITABLE
const VG_SWORD_R = 13;
// BOSS_PART_END s0.VG_SWORD_R.1

// Nguồn: index.html:24702 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.VG_DOP_LAG.1 EDITABLE
const VG_DOP_LAG = 30;
// BOSS_PART_END s0.VG_DOP_LAG.1

// Nguồn: index.html:24778 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s0.drawVergilBody.1 READ_ONLY
function drawVergilBody(b, x, y){
            let dr = b.facingLeft ? -1 : 1, dt = b.stage === 3;
            let cxb = x + VG_W/2;
            ctx.save();
            ctx.translate(cxb, y); ctx.scale(dr, 1); ctx.translate(-cxb, -y);
            let sway = Math.sin(frames * 0.065) * 2.0 + (b.dashV ? -Math.abs(b.dashV) * 0.4 : 0);

            // Bang mau DMC5 Vergil: Xanh den sam / Hai quan + Vien Vang Bac + Áo gile trong
            let coat  = b.isDop ? "#1B3B6F" : (dt ? "#1E1442" : "#162038");
            let coatD = b.isDop ? "#0F2347" : (dt ? "#100926" : "#0C1222");
            let trim  = b.isDop ? "#80D8FF" : (dt ? "#B388FF" : "#4FC3F7");
            let gold  = b.isDop ? "#B3E5FC" : (dt ? "#E040FB" : "#FFD54F");

            // 1. TA AO KHOAC DARK SLAYER (xẻ tà đôi bay phấp phới + hoa văn viền)
            ctx.fillStyle = coatD;
            ctx.beginPath();
            ctx.moveTo(cxb - 12, y + 24);
            ctx.quadraticCurveTo(cxb - 32 - sway*2.2, y + 43, cxb - 26 - sway*3.2, y + VG_H - 1);
            ctx.lineTo(cxb - 14 - sway*2, y + VG_H - 6);
            ctx.lineTo(cxb - 7 - sway*1.2, y + VG_H);
            ctx.lineTo(cxb - 1, y + VG_H - 5);
            ctx.lineTo(cxb - 2, y + 24);
            ctx.closePath(); ctx.fill();

            ctx.fillStyle = coat;
            ctx.beginPath();
            ctx.moveTo(cxb - 10, y + 26);
            ctx.quadraticCurveTo(cxb - 23 - sway*1.6, y + 42, cxb - 19 - sway*2.4, y + VG_H - 3);
            ctx.lineTo(cxb - 3, y + VG_H - 6);
            ctx.lineTo(cxb - 3, y + 26);
            ctx.closePath(); ctx.fill();
            // Duong vien bac doc ta ao sau
            ctx.strokeStyle = trim; ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.moveTo(cxb - 10, y + 27);
            ctx.quadraticCurveTo(cxb - 21 - sway*1.5, y + 42, cxb - 17 - sway*2.2, y + VG_H - 4);
            ctx.stroke();

            // 2. CHAN + BOOTS CAO CO (+ Giáp chân Beowulf nếu đang bật b.beo)
            ctx.fillStyle = "#101320";
            ctx.fillRect(cxb - 9, y + 40, 7, 18); ctx.fillRect(cxb + 1, y + 40, 7, 18);
            if (b.beo){
                // Giap chan anh sang Beowulf
                ctx.fillStyle = "#B3E5FC";
                ctx.fillRect(cxb - 11, y + 44, 9, 14); ctx.fillRect(cxb + 1, y + 44, 9, 14);
                ctx.fillStyle = "#00E5FF";
                ctx.fillRect(cxb - 10, y + 46, 7, 3); ctx.fillRect(cxb + 2, y + 46, 7, 3);
            } else {
                ctx.fillStyle = "#080A12";
                ctx.fillRect(cxb - 11, y + VG_H - 9, 10, 9); ctx.fillRect(cxb + 1, y + VG_H - 9, 10, 9);
                ctx.fillStyle = gold; // Khoa giay vang
                ctx.fillRect(cxb - 5, y + VG_H - 7, 3, 2); ctx.fillRect(cxb + 7, y + VG_H - 7, 3, 2);
            }

            // 3. THAN AO GILE DEN + AO KHOAC NGOAI + KHAN CO XANH
            ctx.fillStyle = "#0E101A"; ctx.fillRect(cxb - 8, y + 15, 16, 26);
            // That lung + khoa bac
            ctx.fillStyle = "#1C2230"; ctx.fillRect(cxb - 10, y + 38, 20, 3);
            ctx.fillStyle = gold; ctx.fillRect(cxb - 2, y + 37.5, 5, 4);

            // Hai ve ao khoac xanh den
            ctx.fillStyle = coat;
            ctx.beginPath();
            ctx.moveTo(cxb - 12, y + 14); ctx.lineTo(cxb - 4, y + 15);
            ctx.lineTo(cxb - 5, y + 44); ctx.lineTo(cxb - 14, y + 44);
            ctx.closePath(); ctx.fill();
            ctx.beginPath();
            ctx.moveTo(cxb + 4, y + 15); ctx.lineTo(cxb + 12, y + 14);
            ctx.lineTo(cxb + 14, y + 44); ctx.lineTo(cxb + 5, y + 44);
            ctx.closePath(); ctx.fill();

            // Vien hoa van xanh-vang doc nep ao
            ctx.fillStyle = trim;
            ctx.fillRect(cxb - 5.5, y + 15, 1.8, 28); ctx.fillRect(cxb + 3.8, y + 15, 1.8, 28);
            ctx.fillStyle = gold;
            for (let k = 0; k < 3; k++){
                ctx.fillRect(cxb - 8, y + 19 + k * 6, 2, 1.5);
                ctx.fillRect(cxb + 6, y + 19 + k * 6, 2, 1.5);
            }

            // Khan co xanh lam (Ascot) + Co ao dung cao
            ctx.fillStyle = "#0288D1";
            ctx.beginPath(); ctx.moveTo(cxb - 4, y + 14); ctx.lineTo(cxb + 4, y + 14); ctx.lineTo(cxb, y + 23); ctx.closePath(); ctx.fill();
            ctx.fillStyle = coat;
            ctx.beginPath();
            ctx.moveTo(cxb - 11, y + 16); ctx.lineTo(cxb - 9, y + 8); ctx.lineTo(cxb + 9, y + 8); ctx.lineTo(cxb + 11, y + 16);
            ctx.closePath(); ctx.fill();

            // Cau vai vien vang
            ctx.fillStyle = coat; ctx.fillRect(cxb - 15, y + 13, 30, 5);
            ctx.fillStyle = gold; ctx.fillRect(cxb - 15, y + 13, 9, 1.8); ctx.fillRect(cxb + 6, y + 13, 9, 1.8);

            // 4. TAY TRAI + VO KIEM YAMATO (SAYA) LUON CAM TREN TAY TRAI
            let ar = b.armR || 0, al = b.armL || 0;
            ctx.save(); ctx.translate(cxb - 12, y + 19); ctx.rotate(al);
            ctx.fillStyle = coatD; ctx.fillRect(-3.5, 0, 7, 14);
            ctx.fillStyle = trim; ctx.fillRect(-3.8, 11, 7.6, 2.5); // vien co tay
            ctx.fillStyle = b.beo ? "#B3E5FC" : "#141824"; ctx.fillRect(-3.5, 13.5, 7, 5); // gang tay

            // VO KIEM SAYA DEN + DAY SAGEO VANG
            ctx.save();
            ctx.translate(0, 15); ctx.rotate(b.drawn ? -0.35 : -0.45);
            ctx.fillStyle = "#0D101A"; ctx.fillRect(-2.5, -6, 5, 46);
            ctx.fillStyle = gold; ctx.fillRect(-3, 2, 6, 3); ctx.fillRect(-2.5, 36, 5, 4); // Kurikata & Kojiri vang
            // Neu CHUA rut kiem -> chuoi kiem Yamato (Tsuka) trang quan day den nam trong vo
            if (!b.drawn){
                ctx.fillStyle = gold; ctx.fillRect(-5.5, -8, 11, 2.5); // Tsuba (ho thu)
                ctx.fillStyle = "#ECEFF1"; ctx.fillRect(-2.2, -20, 4.4, 12);
                ctx.fillStyle = "#263238";
                for (let k = 0; k < 3; k++) ctx.fillRect(-2.2, -19 + k * 4, 4.4, 1.8);
            }
            ctx.restore();
            ctx.restore();

            // 5. DAU + TOC BAC VUOT NGUOC DAC TRUNG VERGIL
            ctx.fillStyle = b.isDop ? "#90CAF9" : "#E3C9A5"; ctx.fillRect(cxb - 7, y + 2, 14, 13);
            ctx.fillStyle = b.isDop ? "#64B5F6" : "#C4A882"; ctx.fillRect(cxb - 6, y + 12, 12, 3);
            // Mat lanh lung sắc bén
            ctx.fillStyle = dt ? "#FF1744" : (b.isDop ? "#E1F5FE" : "#29B6F6");
            ctx.fillRect(cxb + 1.5, y + 7.5, 4, 2.2); ctx.fillRect(cxb - 5.5, y + 7.5, 3, 2.2);
            ctx.fillStyle = "#FFFFFF"; ctx.fillRect(cxb + 3, y + 7.5, 1.5, 1.2);
            // Mái tóc bạc vuốt ngược từng lọn sắc nhọn ra sau
            ctx.fillStyle = dt ? "#B388FF" : "#CFD8DC";
            ctx.beginPath();
            ctx.moveTo(cxb - 9, y + 9); ctx.lineTo(cxb - 13, y + 1);
            ctx.lineTo(cxb - 11, y - 5); ctx.lineTo(cxb - 4, y - 8);
            ctx.lineTo(cxb + 6, y - 7); ctx.lineTo(cxb + 10, y + 5);
            ctx.closePath(); ctx.fill();

            ctx.fillStyle = dt ? "#EDE7F6" : "#F8FAFC";
            ctx.beginPath();
            ctx.moveTo(cxb - 8, y + 6);
            ctx.lineTo(cxb + 9, y + 5);
            ctx.lineTo(cxb + 13, y - 3);
            ctx.lineTo(cxb + 5, y - 1);
            ctx.lineTo(cxb + 8, y - 7);
            ctx.lineTo(cxb - 1, y - 2);
            ctx.lineTo(cxb + 1, y - 8);
            ctx.lineTo(cxb - 7, y - 2);
            ctx.lineTo(cxb - 12, y - 5);
            ctx.lineTo(cxb - 9, y + 2);
            ctx.closePath(); ctx.fill();

            // 6. TAY PHAI + VU KHI DANG CAM (YAMATO / BEOWULF / MIRAGE EDGE)
            ctx.save(); ctx.translate(cxb + 11, y + 19); ctx.rotate(ar);
            ctx.fillStyle = coat; ctx.fillRect(-3.5, 0, 7, 14);
            ctx.fillStyle = trim; ctx.fillRect(-3.8, 11, 7.6, 2.5);
            ctx.fillStyle = b.beo ? "#B3E5FC" : "#141824"; ctx.fillRect(-3.5, 13.5, 7, 5);

            if (b.beo){
                // GANG TAY ANH SANG BEOWULF
                ctx.save();
                ctx.shadowColor = "#00E5FF"; ctx.shadowBlur = 14;
                ctx.fillStyle = "#E1F5FE";
                ctx.beginPath(); ctx.moveTo(-6, 10); ctx.lineTo(6, 10); ctx.lineTo(8, 22); ctx.lineTo(0, 26); ctx.lineTo(-8, 22); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#00B0FF"; ctx.fillRect(-4, 13, 8, 4);
                ctx.restore();
            } else if (b.drawn){
                ctx.save();
                ctx.translate(0, 17); ctx.rotate(-1.05);
                if (b.mirageWep){
                    // MIRAGE EDGE — Dai kiem linh hon xanh ngoc
                    ctx.shadowColor = "#00E5FF"; ctx.shadowBlur = 16;
                    ctx.fillStyle = "#00B0FF";
                    ctx.beginPath(); ctx.moveTo(-6, -4); ctx.lineTo(-7, -46); ctx.lineTo(0, -64); ctx.lineTo(7, -46); ctx.lineTo(6, -4); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#E0F7FA";
                    ctx.beginPath(); ctx.moveTo(-3, -6); ctx.lineTo(0, -58); ctx.lineTo(3, -6); ctx.closePath(); ctx.fill();
                } else {
                    // THANH KATANA YAMATO — Luoi cong tinh xao + Hamon sang ruc
                    ctx.shadowColor = dt ? "#B388FF" : "#40C4FF"; ctx.shadowBlur = 12;
                    // Chuoi kiem (Tsuka) + Ho thu (Tsuba) vang
                    ctx.fillStyle = "#ECEFF1"; ctx.fillRect(-2, 0, 4, 12);
                    ctx.fillStyle = "#263238"; ctx.fillRect(-2, 3, 4, 2); ctx.fillRect(-2, 8, 4, 2);
                    ctx.fillStyle = gold; ctx.fillRect(-6, -2, 12, 2.5);
                    // Luoi kiem Katana hoi cong
                    let bg = ctx.createLinearGradient(0, -2, 0, -60);
                    bg.addColorStop(0, "#FFFFFF");
                    bg.addColorStop(0.6, dt ? "#D1C4E9" : "#E1F5FE");
                    bg.addColorStop(1, dt ? "#9575CD" : "#4FC3F7");
                    ctx.fillStyle = bg;
                    ctx.beginPath();
                    ctx.moveTo(-2, -2);
                    ctx.quadraticCurveTo(-3.5, -30, -1, -60);
                    ctx.lineTo(2.5, -55);
                    ctx.quadraticCurveTo(1.5, -28, 2, -2);
                    ctx.closePath(); ctx.fill();
                }
                ctx.restore();
            }
            ctx.restore();
            ctx.restore();
        }
// BOSS_PART_END s0.drawVergilBody.1

// Nguồn: index.html:24972 · Dùng bởi: DanteBoss, VergilBoss
// BOSS_PART_BEGIN s0.drawSinVergil.1 READ_ONLY
function drawSinVergil(b, x, y){
            let dr = b.facingLeft ? -1 : 1, W = 64, H = 86, cxb = x + W/2;
            let wf = Math.sin((b.wing || 0)), nh = 0.65 + 0.35 * Math.sin(frames * 0.16);
            const DEN = "#090614", THAN = "#140E29", GIAP = "#261C4A", VIEN = "#3F2E78", XANH = "#00E5FF", LAM = "#40C4FF", TIM = "#7C4DFF";

            ctx.save();
            ctx.translate(cxb, y); ctx.scale(dr, 1); ctx.translate(-cxb, -y);

            // ---------- HAO QUANG TRONG TRUONG DUOI CHAN ----------
            let ag = ctx.createRadialGradient(cxb, y + 42, 6, cxb, y + 42, 64);
            ag.addColorStop(0, "rgba(0, 229, 255, " + (0.30 * nh).toFixed(2) + ")");
            ag.addColorStop(0.5, "rgba(124, 77, 255, 0.16)");
            ag.addColorStop(1, "rgba(12, 8, 28, 0)");
            ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(cxb, y + 42, 64, 0, 6.28); ctx.fill();

            // ---------- DOI CANH NANG LUONG THIEN THANH (4 dải cánh ánh sáng) ----------
            for (let s = -1; s <= 1; s += 2){
                let vai = { x: cxb - 5 * s, y: y + 22 };
                let khop = { x: cxb + s * (-38 - 6 * wf), y: y - 16 - 10 * wf };
                let dinh = [
                    { x: cxb + s * (-78 - 9 * wf), y: y - 6 - 12 * wf },
                    { x: cxb + s * (-84 - 7 * wf), y: y + 28 - 6 * wf },
                    { x: cxb + s * (-62 - 4 * wf), y: y + 64 }
                ];
                let wg = ctx.createLinearGradient(vai.x, vai.y, dinh[0].x, dinh[2].y);
                wg.addColorStop(0, "rgba(26, 18, 64, 0.92)");
                wg.addColorStop(0.6, "rgba(63, 81, 181, 0.78)");
                wg.addColorStop(1, "rgba(0, 229, 255, 0.65)");
                ctx.fillStyle = wg;
                ctx.beginPath(); ctx.moveTo(vai.x, vai.y); ctx.lineTo(khop.x, khop.y);
                for (let k = 0; k < 3; k++){
                    let d0 = dinh[k], d1 = dinh[k + 1] || { x: cxb - s * 14, y: y + 56 };
                    ctx.lineTo(d0.x, d0.y);
                    ctx.quadraticCurveTo((d0.x + d1.x) / 2 + s * 6, (d0.y + d1.y) / 2 - 6, d1.x, d1.y);
                }
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "rgba(0, 229, 255, " + (0.75 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.8; ctx.stroke();

                // Xuong canh den + tia nang luong
                ctx.strokeStyle = DEN; ctx.lineWidth = 4; ctx.lineCap = "round";
                ctx.beginPath(); ctx.moveTo(vai.x, vai.y); ctx.lineTo(khop.x, khop.y); ctx.stroke();
                ctx.strokeStyle = LAM; ctx.lineWidth = 2;
                for (const d0 of dinh){ ctx.beginPath(); ctx.moveTo(khop.x, khop.y); ctx.lineTo(d0.x, d0.y); ctx.stroke(); }
            }

            // ---------- TA AO QUY & DUOI QUY ----------
            ctx.fillStyle = THAN;
            ctx.beginPath();
            ctx.moveTo(cxb - 15, y + 40);
            ctx.quadraticCurveTo(cxb - 48, y + 68, cxb - 34, y + H);
            ctx.lineTo(cxb + 2, y + H - 4); ctx.lineTo(cxb + 2, y + 40);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = XANH; ctx.lineWidth = 1.4;
            ctx.beginPath(); ctx.moveTo(cxb - 14, y + 42); ctx.quadraticCurveTo(cxb - 40, y + 66, cxb - 30, y + H - 2); ctx.stroke();

            // ---------- CHAN QUY ----------
            for (let s = -1; s <= 1; s += 2){
                let hx = cxb + s * 9;
                ctx.fillStyle = THAN;
                ctx.beginPath(); ctx.moveTo(hx - 7, y + 56); ctx.lineTo(hx + 7, y + 56); ctx.lineTo(hx + 9 + s * 2, y + 70);
                ctx.lineTo(hx + 5, y + H - 3); ctx.lineTo(hx - 5, y + H - 3); ctx.lineTo(hx - 7, y + 68); ctx.closePath(); ctx.fill();
                ctx.fillStyle = GIAP; ctx.fillRect(hx - 5, y + 59, 10, 6);
                ctx.strokeStyle = "rgba(0,229,255," + (0.8 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.3;
                ctx.beginPath(); ctx.moveTo(hx, y + 65); ctx.lineTo(hx + s * 2, y + 79); ctx.stroke();
            }

            // ---------- THAN GIAP VAY RONG + LOI LINH HON XANH ----------
            ctx.fillStyle = THAN;
            ctx.beginPath(); ctx.moveTo(cxb - 21, y + 18); ctx.lineTo(cxb + 21, y + 18); ctx.lineTo(cxb + 16, y + 42);
            ctx.lineTo(cxb + 11, y + 58); ctx.lineTo(cxb - 11, y + 58); ctx.lineTo(cxb - 16, y + 42); ctx.closePath(); ctx.fill();

            ctx.fillStyle = GIAP;
            ctx.beginPath(); ctx.moveTo(cxb - 18, y + 20); ctx.lineTo(cxb - 3, y + 22); ctx.lineTo(cxb - 5, y + 36); ctx.lineTo(cxb - 15, y + 33); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cxb + 18, y + 20); ctx.lineTo(cxb + 3, y + 22); ctx.lineTo(cxb + 5, y + 36); ctx.lineTo(cxb + 15, y + 33); ctx.closePath(); ctx.fill();

            // Mach nang luong xanh lam tren nguc
            ctx.strokeStyle = "rgba(0, 229, 255, " + (0.9 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(cxb, y + 34); ctx.lineTo(cxb - 6, y + 45); ctx.lineTo(cxb - 3, y + 55);
            ctx.moveTo(cxb, y + 34); ctx.lineTo(cxb + 6, y + 45); ctx.lineTo(cxb + 3, y + 55);
            ctx.moveTo(cxb - 12, y + 24); ctx.lineTo(cxb - 15, y + 35);
            ctx.moveTo(cxb + 12, y + 24); ctx.lineTo(cxb + 15, y + 35);
            ctx.stroke();

            // Loi nguc SDT xanh ngoc bích
            ctx.fillStyle = "rgba(0, 229, 255, " + (0.45 * nh).toFixed(2) + ")"; ctx.beginPath(); ctx.arc(cxb, y + 29, 9, 0, 6.28); ctx.fill();
            ctx.fillStyle = "#E0F7FA"; ctx.beginPath(); ctx.moveTo(cxb, y + 23); ctx.lineTo(cxb + 4.5, y + 29); ctx.lineTo(cxb, y + 35); ctx.lineTo(cxb - 4.5, y + 29); ctx.closePath(); ctx.fill();

            // ---------- VAI GAI QUY + ONG KHOI NANG LUONG XANH ----------
            for (let s = -1; s <= 1; s += 2){
                ctx.fillStyle = VIEN;
                ctx.beginPath(); ctx.moveTo(cxb + s * 12, y + 14); ctx.quadraticCurveTo(cxb + s * 30, y + 10, cxb + s * 28, y + 26); ctx.lineTo(cxb + s * 15, y + 24); ctx.closePath(); ctx.fill();
                ctx.fillStyle = XANH;
                ctx.beginPath(); ctx.moveTo(cxb + s * 22, y + 14); ctx.lineTo(cxb + s * 35, y + 2); ctx.lineTo(cxb + s * 26, y + 18); ctx.closePath(); ctx.fill();
            }

            // ---------- TAY SAU + LUOI KIEM PHU ----------
            ctx.save(); ctx.translate(cxb - 20, y + 26); ctx.rotate(b.armL || 0.25);
            ctx.fillStyle = THAN; ctx.fillRect(-4, 0, 8, 24); ctx.fillStyle = GIAP; ctx.fillRect(-5, 10, 10, 6);
            ctx.fillStyle = XANH; ctx.beginPath(); ctx.moveTo(-3, 20); ctx.lineTo(0, 38); ctx.lineTo(3, 20); ctx.closePath(); ctx.fill();
            ctx.restore();

            // ---------- DAU QUY VERGIL: VUONG MIEN SUNG DOI + LUOI ANH SANG XANH ----------
            ctx.fillStyle = THAN;
            ctx.beginPath(); ctx.moveTo(cxb - 9, y + 16); ctx.lineTo(cxb - 10, y + 1); ctx.lineTo(cxb + 10, y + 1); ctx.lineTo(cxb + 12, y + 9); ctx.lineTo(cxb + 4, y + 18); ctx.closePath(); ctx.fill();
            // Hai sung vuong mien uon cong vut len va ra sau
            for (let k = 0; k < 2; k++){
                let o = k * 5;
                ctx.fillStyle = k ? GIAP : VIEN;
                ctx.beginPath();
                ctx.moveTo(cxb - 3 + o, y);
                ctx.quadraticCurveTo(cxb - 16 + o, y - 20, cxb - 34 + o, y - 24);
                ctx.quadraticCurveTo(cxb - 18 + o, y - 10, cxb - 6 + o, y + 3);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = XANH; ctx.lineWidth = 1.3;
                ctx.beginPath(); ctx.moveTo(cxb - 3 + o, y); ctx.quadraticCurveTo(cxb - 16 + o, y - 20, cxb - 34 + o, y - 24); ctx.stroke();
            }
            // Lua linh hon xanh chay nguoc tu dau
            let gio = Math.sin(frames * 0.14) * 3;
            ctx.fillStyle = "rgba(0, 229, 255, 0.75)";
            ctx.beginPath(); ctx.moveTo(cxb - 2, y - 2); ctx.quadraticCurveTo(cxb - 20, y - 6 + gio, cxb - 30, y + 5 + gio);
            ctx.lineTo(cxb - 10, y + 10); ctx.closePath(); ctx.fill();
            // Mat sang ruc
            ctx.fillStyle = "#FF1744"; ctx.fillRect(cxb + 2, y + 6, 8, 2.5);
            ctx.fillStyle = "#FFFFFF"; ctx.fillRect(cxb + 6, y + 6.5, 2.5, 1.5);

            // ---------- TAY TRUOC + THANH YAMATO NANG LUONG KHONG LO ----------
            let ar = b.armR || 0;
            ctx.save(); ctx.translate(cxb + 20, y + 26); ctx.rotate(ar);
            ctx.fillStyle = THAN; ctx.fillRect(-4, 0, 9, 24); ctx.fillStyle = VIEN; ctx.fillRect(-5, 9, 11, 6);
            if (b.drawn){
                ctx.translate(0, 24); ctx.rotate(-1.0);
                ctx.shadowColor = XANH; ctx.shadowBlur = 18;
                // Hao quang luoi kiem SDT
                ctx.fillStyle = "rgba(0, 229, 255, 0.28)"; ctx.fillRect(-8, -104, 16, 98);
                let g2 = ctx.createLinearGradient(0, 0, 0, -102);
                g2.addColorStop(0, "#FFFFFF"); g2.addColorStop(0.5, "#80D8FF"); g2.addColorStop(1, "#7C4DFF");
                ctx.fillStyle = g2;
                ctx.beginPath();
                ctx.moveTo(-4.5, -4); ctx.lineTo(-5.5, -86); ctx.lineTo(0, -106);
                ctx.lineTo(5.5, -86); ctx.lineTo(4.5, -4);
                ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FFFFFF"; ctx.fillRect(-1.2, -96, 2.4, 88);
            } else {
                ctx.fillStyle = XANH; ctx.beginPath(); ctx.moveTo(-3, 22); ctx.lineTo(0, 38); ctx.lineTo(4, 22); ctx.closePath(); ctx.fill();
            }
            ctx.restore();
            ctx.restore();
        }
// BOSS_PART_END s0.drawSinVergil.1

// Nguồn: index.html:25631 · Dùng bởi: DanteBoss, VergilBoss
// BOSS_PART_BEGIN s0.drawSdtDante.1 READ_ONLY
function drawSdtDante(b, x, y){
            if (b._sdtDrill?.phase === 'dash') { danteDrawSinDrill(x + 33, y + 44, b._sdtDrill.dir, b._sdtDrill.age); return; }
            if (b._sdtDrill?.phase === 'gap') return;
            let dr = b.facingLeft ? -1 : 1, W = 66, H = 88, cxb = x + W/2;
            const DEN = "#110507", THAN = "#24080C", DO = "#5E0F16", DO2 = "#9A1B21", NHAM = "#FF6D00", VANG = "#FFC400", TOC = "#EEF1F4";
            let wf = Math.sin(b.wing || 0), nh = 0.65 + 0.35 * Math.sin(frames * 0.16);
            ctx.save();
            ctx.translate(cxb, y); ctx.scale(dr, 1); ctx.translate(-cxb, -y);

            // ---------- HAO QUANG LUA DIA NGUC DUOI CHAN ----------
            let ag = ctx.createRadialGradient(cxb, y + 42, 6, cxb, y + 42, 64);
            ag.addColorStop(0, "rgba(255, 109, 0, " + (0.32 * nh).toFixed(2) + ")");
            ag.addColorStop(1, "rgba(255, 23, 68, 0)");
            ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(cxb, y + 42, 64, 0, 6.28); ctx.fill();

            // ---------- DOI CANH QUY 4 NHANH KHONG LO ----------
            for (let s = -1; s <= 1; s += 2){
                let vai = { x: cxb - 6 * s, y: y + 24 };
                let khop = { x: cxb + s * (-38 - 7 * wf), y: y - 18 - 11 * wf };
                let dinh = [
                    { x: cxb + s * (-78 - 9 * wf), y: y - 8 - 14 * wf },
                    { x: cxb + s * (-84 - 7 * wf), y: y + 28 - 6 * wf },
                    { x: cxb + s * (-64 - 4 * wf), y: y + 66 }
                ];
                // Mang canh ruc lua
                let wg = ctx.createLinearGradient(vai.x, vai.y, dinh[0].x, dinh[2].y);
                wg.addColorStop(0, "rgba(95, 10, 18, 0.94)");
                wg.addColorStop(0.7, "rgba(45, 5, 10, 0.88)");
                wg.addColorStop(1, "rgba(255, 109, 0, 0.55)");
                ctx.fillStyle = wg;
                ctx.beginPath(); ctx.moveTo(vai.x, vai.y); ctx.lineTo(khop.x, khop.y);
                for (let k = 0; k < 3; k++){
                    let d0 = dinh[k], d1 = dinh[k + 1] || { x: cxb - s * 14, y: y + 58 };
                    ctx.lineTo(d0.x, d0.y);
                    ctx.quadraticCurveTo((d0.x + d1.x) / 2 + s * 6, (d0.y + d1.y) / 2 - 6, d1.x, d1.y);
                }
                ctx.closePath(); ctx.fill();
                // Vien sang mep mang
                ctx.strokeStyle = "rgba(255,145,0," + (0.7 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.8; ctx.stroke();
                // Xuong canh den + ranh nham
                ctx.strokeStyle = DEN; ctx.lineWidth = 4.5; ctx.lineCap = "round";
                ctx.beginPath(); ctx.moveTo(vai.x, vai.y); ctx.lineTo(khop.x, khop.y); ctx.stroke();
                ctx.lineWidth = 2.8;
                for (const d0 of dinh){ ctx.beginPath(); ctx.moveTo(khop.x, khop.y); ctx.lineTo(d0.x, d0.y); ctx.stroke(); }
                // Vuot vang o khop canh
                ctx.fillStyle = VANG;
                ctx.beginPath(); ctx.moveTo(khop.x, khop.y); ctx.lineTo(khop.x - s * 4, khop.y - 11); ctx.lineTo(khop.x + s * 3, khop.y - 1); ctx.closePath(); ctx.fill();
            }

            // ---------- DUOI GAI QUY ----------
            ctx.strokeStyle = THAN; ctx.lineWidth = 6.5; ctx.lineCap = "round";
            let dq = Math.sin(frames * 0.09) * 6;
            ctx.beginPath(); ctx.moveTo(cxb - 6, y + 58); ctx.quadraticCurveTo(cxb - 38, y + 72 + dq, cxb - 54, y + 56 + dq); ctx.stroke();
            ctx.fillStyle = NHAM;
            ctx.beginPath(); ctx.moveTo(cxb - 54, y + 56 + dq); ctx.lineTo(cxb - 66, y + 48 + dq); ctx.lineTo(cxb - 56, y + 63 + dq); ctx.closePath(); ctx.fill();

            // ---------- CHAN QUY ----------
            for (let s = -1; s <= 1; s += 2){
                let hx = cxb + s * 9;
                ctx.fillStyle = THAN;
                ctx.beginPath(); ctx.moveTo(hx - 7, y + 56); ctx.lineTo(hx + 7, y + 56); ctx.lineTo(hx + 9 + s * 2, y + 70);
                ctx.lineTo(hx + 3, y + 80); ctx.lineTo(hx + 6, y + H - 3); ctx.lineTo(hx - 4, y + H - 3); ctx.lineTo(hx - 6, y + 78); ctx.lineTo(hx - 8, y + 68); ctx.closePath(); ctx.fill();
                ctx.fillStyle = DO2; ctx.fillRect(hx - 5, y + 60, 10, 6);
                ctx.fillStyle = DEN;
                ctx.beginPath(); ctx.moveTo(hx - 6, y + H - 4); ctx.lineTo(hx + 13, y + H - 2); ctx.lineTo(hx - 6, y + H + 1); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "rgba(255,145,0," + (0.85 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(hx - 2, y + 65); ctx.lineTo(hx + 2, y + 73); ctx.lineTo(hx - 1, y + 81); ctx.stroke();
            }

            // ---------- THAN QUY + LOI NANG LUONG NGUC ----------
            ctx.fillStyle = THAN;
            ctx.beginPath(); ctx.moveTo(cxb - 22, y + 18); ctx.lineTo(cxb + 22, y + 18); ctx.lineTo(cxb + 16, y + 42);
            ctx.lineTo(cxb + 11, y + 58); ctx.lineTo(cxb - 11, y + 58); ctx.lineTo(cxb - 16, y + 42); ctx.closePath(); ctx.fill();
            // Giap nguc vay rong
            ctx.fillStyle = DO;
            ctx.beginPath(); ctx.moveTo(cxb - 18, y + 20); ctx.lineTo(cxb - 3, y + 22); ctx.lineTo(cxb - 5, y + 36); ctx.lineTo(cxb - 15, y + 33); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cxb + 18, y + 20); ctx.lineTo(cxb + 3, y + 22); ctx.lineTo(cxb + 5, y + 36); ctx.lineTo(cxb + 15, y + 33); ctx.closePath(); ctx.fill();
            for (let k = 0; k < 3; k++){ ctx.fillStyle = k % 2 ? DO : DO2; ctx.fillRect(cxb - 8, y + 40 + k * 5, 16 - k * 2, 3.2); }
            // Khe dung nham ruc sang
            ctx.strokeStyle = "rgba(255,145,0," + (0.9 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(cxb, y + 34); ctx.lineTo(cxb - 6, y + 44); ctx.lineTo(cxb - 3, y + 54);
            ctx.moveTo(cxb, y + 34); ctx.lineTo(cxb + 7, y + 43); ctx.lineTo(cxb + 4, y + 52);
            ctx.moveTo(cxb - 12, y + 24); ctx.lineTo(cxb - 16, y + 34);
            ctx.moveTo(cxb + 12, y + 24); ctx.lineTo(cxb + 16, y + 34);
            ctx.stroke();
            // Loi sang Sin Devil Trigger giua nguc
            ctx.fillStyle = "rgba(255,109,0," + (0.45 * nh).toFixed(2) + ")"; ctx.beginPath(); ctx.arc(cxb, y + 30, 10, 0, 6.28); ctx.fill();
            ctx.fillStyle = VANG; ctx.beginPath(); ctx.moveTo(cxb, y + 23); ctx.lineTo(cxb + 5, y + 30); ctx.lineTo(cxb, y + 37); ctx.lineTo(cxb - 5, y + 30); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#FFFFFF"; ctx.fillRect(cxb - 1.5, y + 28.5, 3, 3);

            // ---------- VAI GAI ----------
            for (let s = -1; s <= 1; s += 2){
                ctx.fillStyle = DO2;
                ctx.beginPath(); ctx.moveTo(cxb + s * 12, y + 14); ctx.quadraticCurveTo(cxb + s * 30, y + 11, cxb + s * 28, y + 26); ctx.lineTo(cxb + s * 16, y + 24); ctx.closePath(); ctx.fill();
                ctx.fillStyle = DEN;
                ctx.beginPath(); ctx.moveTo(cxb + s * 22, y + 14); ctx.lineTo(cxb + s * 36, y + 3); ctx.lineTo(cxb + s * 26, y + 18); ctx.closePath(); ctx.fill();
            }

            // ---------- TAY SAU ----------
            ctx.save(); ctx.translate(cxb - 21, y + 26); ctx.rotate(b.armL || 0.25);
            ctx.fillStyle = THAN; ctx.fillRect(-4, 0, 8, 24); ctx.fillStyle = DO; ctx.fillRect(-5, 10, 10, 6);
            ctx.fillStyle = NHAM; ctx.beginPath(); ctx.moveTo(-4, 24); ctx.lineTo(0, 33); ctx.lineTo(4, 24); ctx.closePath(); ctx.fill();
            ctx.restore();

            // ---------- DAU QUY: BOM TOC TRANG + SUNG DAI CONG VUT ----------
            let gio = Math.sin(frames * 0.12) * 2.5;
            ctx.fillStyle = TOC;
            ctx.beginPath(); ctx.moveTo(cxb - 2, y - 2); ctx.quadraticCurveTo(cxb - 22, y - 5 + gio, cxb - 33, y + 6 + gio);
            ctx.lineTo(cxb - 24, y + 8 + gio); ctx.lineTo(cxb - 34, y + 16 + gio); ctx.quadraticCurveTo(cxb - 16, y + 14, cxb - 6, y + 12); ctx.closePath(); ctx.fill();
            ctx.fillStyle = THAN;
            ctx.beginPath(); ctx.moveTo(cxb - 9, y + 16); ctx.lineTo(cxb - 10, y + 2); ctx.lineTo(cxb - 2, y - 4); ctx.lineTo(cxb + 8, y - 2);
            ctx.lineTo(cxb + 13, y + 6); ctx.lineTo(cxb + 9, y + 12); ctx.lineTo(cxb + 3, y + 18); ctx.closePath(); ctx.fill();
            ctx.fillStyle = DO2; ctx.beginPath(); ctx.moveTo(cxb + 3, y + 12); ctx.lineTo(cxb + 13, y + 7); ctx.lineTo(cxb + 9, y + 14); ctx.closePath(); ctx.fill();
            for (let k = 0; k < 2; k++){
                let o = k * 5;
                ctx.fillStyle = k ? DEN : "#3B1418";
                ctx.beginPath(); ctx.moveTo(cxb - 2 + o, y - 1); ctx.quadraticCurveTo(cxb - 20 + o, y - 22, cxb - 40 + o, y - 25);
                ctx.quadraticCurveTo(cxb - 22 + o, y - 12, cxb - 6 + o, y + 3); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = k ? "rgba(255,145,0," + (0.85 * nh).toFixed(2) + ")" : DO2; ctx.lineWidth = 1.4;
                ctx.beginPath(); ctx.moveTo(cxb - 2 + o, y - 1); ctx.quadraticCurveTo(cxb - 20 + o, y - 22, cxb - 40 + o, y - 25); ctx.stroke();
            }
            ctx.fillStyle = VANG; ctx.beginPath(); ctx.moveTo(cxb + 3, y + 6); ctx.lineTo(cxb + 12, y + 4); ctx.lineTo(cxb + 10, y + 7); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#FFF"; ctx.fillRect(cxb + 8, y + 5, 2, 1.5);

            // ---------- TAY TRUOC + DEVIL SWORD DANTE AWAKENED (Mở tách đôi lưỡi kiếm) ----------
            ctx.save(); ctx.translate(cxb + 21, y + 26); ctx.rotate(b.armR || 0);
            ctx.fillStyle = THAN; ctx.fillRect(-4, 0, 9, 24); ctx.fillStyle = DO2; ctx.fillRect(-5, 9, 11, 6);
            ctx.strokeStyle = "rgba(255,145,0," + (0.85 * nh).toFixed(2) + ")"; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(0, 3); ctx.lineTo(2, 20); ctx.stroke();
            if (b.drawn){
                ctx.translate(0, 26); ctx.rotate(-1.0);
                ctx.fillStyle = "#1B0A0A"; ctx.fillRect(-3, -2, 6, 14);
                ctx.fillStyle = DO2; ctx.beginPath(); ctx.moveTo(-12, -2); ctx.lineTo(12, -2); ctx.lineTo(7, -11); ctx.lineTo(-7, -11); ctx.closePath(); ctx.fill();
                ctx.fillStyle = VANG; ctx.fillRect(-3.5, -8, 2.5, 2.5); ctx.fillRect(1, -8, 2.5, 2.5);
                // Hao quang luoi kiem
                ctx.fillStyle = "rgba(255,61,0,0.34)"; ctx.fillRect(-10, -108, 20, 100);
                // Hai nhanh luoi kiem mo tach + Loi nang luong o giua
                ctx.fillStyle = "#1A0A0C";
                ctx.beginPath();
                ctx.moveTo(-7, -10); ctx.lineTo(-8, -88); ctx.lineTo(0, -108);
                ctx.lineTo(8, -88); ctx.lineTo(7, -10); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#FF3D00"; ctx.lineWidth = 2.2; ctx.stroke();
                ctx.fillStyle = "#FFAB00"; ctx.fillRect(-2, -96, 4, 82);
                ctx.fillStyle = "#FFFFFF"; ctx.fillRect(-0.8, -92, 1.6, 74);
            } else {
                ctx.fillStyle = NHAM; ctx.beginPath(); ctx.moveTo(-4, 24); ctx.lineTo(0, 33); ctx.lineTo(5, 24); ctx.closePath(); ctx.fill();
            }
            ctx.restore();
            ctx.restore();
        }
// BOSS_PART_END s0.drawSdtDante.1

// Nguồn: index.html:98282 · Dùng bởi: DanteBoss, VergilBoss
// BOSS_PART_BEGIN s6.SDTU_DON.1 READ_ONLY
const SDTU_DON = 70, SDTU_TUNG = 340, SDTU_CAN = 70, SDTU_YEU = 380;
// BOSS_PART_END s6.SDTU_DON.1

// Nguồn: index.html:98283 · Dùng bởi: DanteBoss, VergilBoss
// BOSS_PART_BEGIN s6.SDT_ULT.1 READ_ONLY
const SDT_ULT = {
            sdtUltNen(){ return !this.sdtUltXong && this.hp <= this.maxHp * 0.25; },
            // tra ve true neu dang trong chuoi chieu cuoi -> ham update goc phai dung lai
            sdtUltTick(){
                if (this.sdtUltNen() && !this.suSt){ this.suBatDau(); }
                if (!this.suSt) return false;
                this.suChay();
                return true;
            },
            // Cat ngang mot chieu dang chay se bo lai tan du: `beam` cua Dante co vong cap nhat
            // nam trong updateSDT, bi bo qua thi no dung yen mai ma phan VE van chay -> hien ra
            // mot "soi day vang" khong bao gio tat. Don sach moi thu tam thoi o day.
            suDon(){
                for (const k of ['beam','bike','hat','slash','tel','chain','glaive','throwArr'])
                    if (this[k] !== undefined) this[k] = null;
                for (const k of ['spikes','orbs','cuts','rain'])
                    if (Array.isArray(this[k])) this[k].length = 0;
                this.fly = 0;
            },
            suBatDau(){
                this.suSt = 'don'; this.suT = 0;
                this.suHit = {}; this.suCung = []; this.suMoc = 0; this.suVung = null; this.suCau = [];
                this.suDon();
                this.suTen = (this.name.indexOf('VERGIL') >= 0) ? 'JUDGEMENT CUT END' : 'JUDGEMENT';
                this.suPhim = [];
                floatingTexts.push(new FloatingText(this.cx() - 120, 118, this.suTen + '!'));
                shakeTimer = Math.max(shakeTimer, 40);
                if (SFX.bossEntry) SFX.bossEntry();
            },
            // dinh doat sat thuong: CHI khien hoac luot bat tu moi chan duoc
            suGiang(dmg){
                let chan = (typeof dino.isShielding === 'function' && dino.isShielding()) || dino.invincible || (dino.dashInvul > 0);
                if (chan){
                    visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + 14, 'parry', false));
                    floatingTexts.push(new FloatingText(dino.x - 20, dino.y - 34, 'CHẶN!'));
                    if (SFX.parry) SFX.parry();
                    return false;
                }
                dino.takeDamage(dmg);
                return true;
            },
            suChay(){
                this.suT++;
                let vg = this.suTen === 'JUDGEMENT CUT END';
                this.suTickBong();
                // ---------- DON LUC ----------
                if (this.suSt === 'don'){
                    this.invulnAll = false;      // KHONG bat tu: nguoi choi van danh duoc suot combo
                    if (this.y !== undefined && this.baseY !== undefined) this.y += ((this.baseY - 30) - this.y) * 0.08;
                    if (this.suT % 6 === 0){
                        let a = Math.random() * Math.PI * 2, r = 120 - this.suT * 0.6;
                        visualEffects.push(new Effect(this.cx() + Math.cos(a)*r, this.cy() + Math.sin(a)*r, 'explosion', true, 16));
                    }
                    if (this.suT % 22 === 0 && SFX.tone) SFX.tone(90 + this.suT, 0.18, 'sawtooth', 0.20, 60);
                    if (this.suT > SDTU_DON){ this.suSt = 'tung'; this.suT = 0; this.suDanh = false; }
                    return;
                }
                // ---------- TUNG CHIEU ----------
                if (this.suSt === 'tung'){
                    /* @@HE-SDTULT-XONG — LOI GOC cua "dung xong chieu cuoi van o dang quy": moc ket thuc
                       (suT > SDTU_TUNG) nam O CUOI nhanh nay, ma don ket (t >= 200/224) goi donKet roi
                       `return` truoc khi toi do -> chieu cuoi KHONG BAO GIO ket thuc, boss ket o dang SDT
                       den het tran. Kiem tra ket thuc ngay dau nhanh. */
                    if (this.suT > (vg ? SDTU_TUNG + 12 : SDTU_TUNG + 60)){ this.suSt = 'can'; this.suT = 0; this.suBong = []; return; }
                    // KHONG BAT TU. Nguoi choi danh duoc, ngat duoc, va quan trong nhat: NE DUOC.
                    // Day la mot COMBO gom cac don RIENG BIET co vi tri ro rang, khong phai mot
                    // tran mua phu kin man hinh. Ne sach ca combo -> van giu Perfect Victory.
                    this.invulnAll = false;
                    let t = this.suT, d = this.dir();
                    const B = (n) => t === n;
                    // hop danh mot nhip, chi an mot lan
                    const danh = (rect, key, hat) => {
                        if (this.suHit[key]) return;
                        if (checkAABB(dino, rect)){ this.suHit[key] = 1; this.suGiang(1); if (hat) dino.dy = hat; }
                    };
                    const cung = (reach, up) => { this.suCung.push({ t: 10, max: 10, dir: d, reach: reach, up: up || 0, x: this.cx(), y: this.cy() }); };

                    if (vg){
                        // ===== VERGIL: RAPID SLASH -> JUDGEMENT CUT -> UPPER SLASH -> AERIAL RAVE -> HELM BREAKER
                        if (B(1)){ this.suNhan('RAPID SLASH'); this.suMoc = dino.x + dino.w/2; this.suTu = this.cx(); }
                        if (t >= 20 && t <= 34){                       // luot xuyen qua
                            this.x += ((this.suMoc - this.w/2) - this.x) * 0.34;
                            if (t % 3 === 0) visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 16));
                            danh({x:this.x-20,y:this.y,w:this.w+40,h:this.h}, 'rs');
                            if (t === 22) cung(78, 10);
                        }
                        // @@HE-SDTULT-AP: Rapid Slash de lai MOT DAY vet cat doc duong luot
                        if (B(34)) for (let k = 1; k <= 4; k++){
                            let px = this.suTu + (this.cx() - this.suTu) * k / 4;
                            this.suPhim.push({ x: px, y: this.baseY + this.h/2 - 10, t: 26 + k*4, max: 26 + k*4, R: 40, cho: 16 + k*4 });
                        }
                        if (B(40)){ this.suNhan('JUDGEMENT CUT');
                            for (let k = 0; k < 3; k++){          // BA VUNG co vong bao 22 khung -> ne ra duoc
                                let px = dino.x + dino.w/2 + (k-1)*70;
                                this.suPhim.push({ x: px, y: 210, t: 30, max: 30, R: 56, cho: 22 });
                            } }
                        if (B(58)){                                // DOT HAI: bam theo cho nguoi choi vua ne toi
                            for (let k = 0; k < 2; k++){
                                let px = dino.x + dino.w/2 + (k ? 60 : -60), py = dino.y + dino.h/2 - 10;
                                this.suPhim.push({ x: px, y: py, t: 30, max: 30, R: 60, cho: 20 });
                            } }
                        if (B(74)){ this.suNhan('UPPER SLASH'); cung(72, 40);
                            this.suTaoBong({ x: dino.x + dino.w/2 + d * 50, y: dino.y + dino.h/2, dir: -d, reach: 90, up: 50, cho: 12, kieu: 'hat' }); }
                        if (t >= 74 && t <= 86) danh({x:d>0?this.x+this.w-8:this.x-70,y:this.y-26,w:78,h:this.h+26}, 'up', -12);
                        if (B(92)){ this.dy = -12; this.grounded = false; }
                        if (t >= 100 && t <= 142 && t % 14 === 0){ cung(70, 20);
                            danh({x:d>0?this.x+this.w-8:this.x-70,y:this.y-10,w:78,h:this.h+20}, 'ar'+t);
                            // PHAN THAN chem GONG tu phia ben kia nguoi choi
                            this.suTaoBong({ x: dino.x + dino.w/2 + d * 60, y: dino.y + dino.h/2, dir: -d, reach: 96, up: 20, cho: 10, kieu: 'chem' }); }
                        if (t >= 200) { this.donKet(t - 200, true); return; }
                        if (B(150)){ this.suNhan('HELM BREAKER'); this.dy = 17; }
                        if (t >= 150 && t <= 176){
                            danh({x:this.x-16,y:this.y,w:this.w+32,h:this.h+30}, 'hb');
                            if (this.y >= this.baseY && !this.suHit.no){
                                this.suHit.no = 1; this.y = this.baseY; this.dy = 0;
                                visualEffects.push(new Effect(this.cx(), this.y+this.h, 'body_slam_shockwave', true, 96));
                                shakeTimer = Math.max(shakeTimer, 30);
                                if (Math.abs((dino.x+dino.w/2)-this.cx()) < 88 && dino.grounded) this.suGiang(1);
                                for (let k = -1; k <= 1; k += 2) for (let q = 1; q <= 2; q++)     // vong cat lan ra hai ben
                                    this.suPhim.push({ x: this.cx() + k * q * 110, y: this.baseY + this.h/2 - 6, t: 22 + q*8, max: 22 + q*8, R: 48, cho: 10 + q*8 });
                            }
                        }
                    } else {
                        // ===== DANTE: STINGER -> MILLION STAB -> HIGH TIME -> AERIAL RAVE -> HELM BREAKER
                        if (B(1)) this.suNhan('STINGER');
                        // @@HE-SDTULT-AP — Hans: "chem va DONG THOI tao ra cac nhat chem cua Swordmaster chem
                        // theo o tam xa hon". Moi nhip deu keo theo BONG KIEM (anh Dante mo) danh xa hon.
                        if (B(20)) for (let q = 1; q <= 2; q++)
                            this.suTaoBong({ x: this.cx() + d * (70 + q * 120), y: this.cy() + 6, dir: d, reach: 150, up: 0, cho: 6 + q * 7, kieu: 'dam' });
                        if (t >= 18 && t <= 34){
                            // Lao TOI TAN NOI chu khong di mot van toc co dinh: o xa 500px thi
                            // 13px/khung x 16 khung chi duoc 208px, combo se danh vao khong khi.
                            let muon = (dino.x + dino.w/2) - d*70 - this.w/2;
                            this.x += (muon - this.x) * 0.30 + d * 4;
                            this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
                            if (t % 3 === 0) visualEffects.push(new Effect(this.cx()-d*20, this.cy(), 'explosion', true, 14));
                            danh({x:d>0?this.x+this.w-10:this.x-56,y:this.y+10,w:66,h:this.h-16}, 'st');
                        }
                        if (B(42)) this.suNhan('MILLION STAB');
                        if (t >= 46 && t <= 90 && t % 8 === 2)          // bong kiem dam xa, lech do cao
                            this.suTaoBong({ x: this.cx() + d * (110 + Math.random() * 130), y: this.cy() + 6 + (Math.random() - 0.5) * 60,
                                             dir: d, reach: 130, up: 0, cho: 7, kieu: 'dam' });
                        if (t >= 42 && t <= 92 && t % 4 === 0){        // dam lien tuc, hinh non HEP phia truoc
                            cung(66, 6);
                            visualEffects.push(new Effect(this.cx()+d*54, this.cy()+6, 'explosion', true, 14));
                            danh({x:d>0?this.x+this.w-6:this.x-64,y:this.y+14,w:70,h:34}, 'ms'+Math.floor(t/16));
                            if (SFX.tone) SFX.tone(900, 0.02, 'square', 0.06, 700);
                        }
                        if (B(100)){ this.suNhan('HIGH TIME'); cung(74, 44);
                            for (let q = 1; q <= 2; q++) this.suTaoBong({ x: this.cx() + d * (40 + q * 95), y: this.cy(), dir: d, reach: 100, up: 60, cho: 5 + q * 6, kieu: 'hat' }); }
                        if (t >= 100 && t <= 112) danh({x:d>0?this.x+this.w-8:this.x-72,y:this.y-28,w:80,h:this.h+28}, 'ht', -12);
                        if (B(118)){ this.dy = -12; this.grounded = false; }
                        if (t >= 126 && t <= 168 && t % 14 === 0){ cung(70, 20);
                            danh({x:d>0?this.x+this.w-8:this.x-70,y:this.y-10,w:78,h:this.h+20}, 'ar'+t);
                            // bong kiem chem NGAY CHO nguoi choi dang lo lung, tu phia sau lung
                            this.suTaoBong({ x: dino.x + dino.w/2 + d * 50, y: dino.y + dino.h/2, dir: -d, reach: 100, up: 24, cho: 10, kieu: 'chem' }); }
                        if (t >= 224) { this.donKet(t - 224, false); return; }
                        if (B(176)){ this.suNhan('HELM BREAKER'); this.dy = 17; }
                        if (t >= 176 && t <= 202){
                            danh({x:this.x-16,y:this.y,w:this.w+32,h:this.h+30}, 'hb');
                            if (this.y >= this.baseY && !this.suHit.no){
                                this.suHit.no = 1; this.y = this.baseY; this.dy = 0;
                                visualEffects.push(new Effect(this.cx(), this.y+this.h, 'body_slam_shockwave', true, 96));
                                shakeTimer = Math.max(shakeTimer, 30);
                                if (Math.abs((dino.x+dino.w/2)-this.cx()) < 88 && dino.grounded) this.suGiang(1);
                                for (let k = -1; k <= 1; k += 2){                  // song lua chay doc san hai phia (nhay qua)
                                    let bp = new BossProjectile(this.cx() + k * 40 - 18, 320 - 46, k * 9, 0, true, 1);
                                    bp.w = 36; bp.h = 46; bp.color = '#FF3D00'; bp.fire = true; bossProjectiles.push(bp);
                                    for (let q = 1; q <= 2; q++) this.suTaoBong({ x: this.cx() + k * q * 150, y: this.baseY + this.h/2, dir: k, reach: 90, up: 40, cho: 8 + q * 8, kieu: 'dap' });
                                }
                            }
                        }
                    }
                    // trong luc bay: tu roi
                    if (!this.grounded || this.y < this.baseY){
                        this.dy += 0.55; this.y += this.dy;
                        if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; }
                    }
                    this.faceP();
                    return;
                }
                // ---------- CAN LUC -> TRO VE DANG NGUOI ----------
                if (this.suSt === 'can'){
                    this.invulnAll = false;
                    if (this.suT === 1){
                        floatingTexts.push(new FloatingText(this.cx() - 70, this.y - 40, 'CẠN SỨC QUỶ'));
                        if (SFX.tone) SFX.tone(70, 0.7, 'sawtooth', 0.24, 40);
                    }
                    if (this.suT % 7 === 0) visualEffects.push(new Effect(this.cx() + (Math.random()-0.5)*70, this.cy() + (Math.random()-0.5)*70, 'explosion', true, 20));
                    if (this.y !== undefined && this.baseY !== undefined) this.y += (this.baseY - this.y) * 0.16;
                    if (this.suT > SDTU_CAN) this.suVeNguoi();
                    return;
                }
            },
            // ===== BONG KIEM (Swordmaster / phan than) — @@HE-SDTULT-AP =====
            // Mot nhat chem ANH hien ra o tam xa, bao truoc `cho` khung (vien mo) roi chem that.
            suTaoBong(o){
                if (!this.suBong) this.suBong = [];
                o.x = Math.max(20, Math.min(canvas.width - 20, o.x));
                o.max = o.cho; o.t = o.cho + 12; o.key = 'b' + (this._bongId = (this._bongId || 0) + 1);
                this.suBong.push(o);
            },
            suBongRect(o){
                if (o.kieu === 'dam') return o.dir > 0 ? { x: o.x - 20, y: o.y - 14, w: o.reach, h: 28 } : { x: o.x - o.reach + 20, y: o.y - 14, w: o.reach, h: 28 };
                if (o.kieu === 'dap') return { x: o.x - o.reach/2, y: o.y - 30 - o.up, w: o.reach, h: 60 + o.up };
                return { x: o.x - o.reach/2, y: o.y - 34 - o.up, w: o.reach, h: 68 + o.up };
            },
            suTickBong(){
                if (!this.suBong || !this.suBong.length) return;
                for (let i = this.suBong.length - 1; i >= 0; i--){
                    let o = this.suBong[i]; o.t--; o.cho--;
                    if (o.cho === 0){
                        if (checkAABB(dino, this.suBongRect(o))){ if (this.suGiang(1) && o.kieu === 'hat'){ dino.dy = -12; dino.grounded = false; } }
                        visualEffects.push(new Effect(o.x, o.y, 'explosion', true, o.kieu === 'dap' ? 34 : 18));
                        if (o.kieu === 'dap') shakeTimer = Math.max(shakeTimer, 10);
                        if (SFX.tone) SFX.tone(o.kieu === 'dam' ? 1500 : 700, 0.03, 'square', 0.07, 500);
                    }
                    if (o.t <= 0) this.suBong.splice(i, 1);
                }
            },
            suVeBong(){
                if (!this.suBong || !this.suBong.length) return;
                let vg = this.suTen === 'JUDGEMENT CUT END', mau = vg ? '#81D4FA' : '#FF6E40';
                for (const o of this.suBong){
                    ctx.save();
                    if (o.cho > 0){                                 // bao truoc: vien net dut + bong mo dang hien ra
                        let k = 1 - o.cho / o.max, r = this.suBongRect(o);
                        ctx.globalAlpha = 0.25 + 0.45 * k; ctx.strokeStyle = mau; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
                        ctx.strokeRect(r.x, r.y, r.w, r.h); ctx.setLineDash([]);
                        ctx.globalAlpha = 0.12 + 0.28 * k;
                        let gm = { facingLeft: o.dir < 0, drawn: true, armR: -1.2 + k * 1.6, armL: 0, wing: this.wing || 0, stage: 3, w: this.w, h: this.h, arms: 0 };
                        let gx = o.x - (vg ? 32 : 33) - o.dir * 30, gy = o.y - 46;
                        if (vg) drawSinVergil(gm, gx, gy); else drawSdtDante(gm, gx, gy);
                    } else {                                          // CHEM: cung sang lon
                        let a = Math.max(0, o.t / 12);
                        ctx.globalAlpha = a; ctx.strokeStyle = '#FFFFFF'; ctx.lineCap = 'round';
                        ctx.shadowColor = mau; ctx.shadowBlur = 14;
                        if (o.kieu === 'dam'){
                            let r = this.suBongRect(o);
                            ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(r.x, o.y); ctx.lineTo(r.x + r.w, o.y); ctx.stroke();
                            ctx.strokeStyle = mau; ctx.lineWidth = 2;
                            for (let q = -1; q <= 1; q++){ ctx.beginPath(); ctx.moveTo(r.x + 10, o.y + q * 7); ctx.lineTo(r.x + r.w - 10, o.y + q * 9); ctx.stroke(); }
                        } else {
                            let R = o.reach * 0.62, a0 = o.kieu === 'hat' ? -2.4 : (o.dir > 0 ? -1.0 : Math.PI - 1.0);
                            let a1 = o.kieu === 'hat' ? -0.7 : (o.dir > 0 ? 1.0 : Math.PI + 1.0);
                            if (o.kieu === 'dap'){ a0 = 0.15; a1 = Math.PI - 0.15; }
                            for (let q = 0; q < 3; q++){
                                ctx.lineWidth = 6 - q * 2; ctx.strokeStyle = q === 0 ? '#FFFFFF' : mau;
                                ctx.beginPath(); ctx.arc(o.x, o.y, R - q * 10, a0, a1, o.dir < 0 && o.kieu !== 'hat' && o.kieu !== 'dap'); ctx.stroke();
                            }
                        }
                    }
                    ctx.restore();
                }
            },
            suNhan(ten){
                floatingTexts.push(new FloatingText(this.cx()-34, this.y-34, ten));
                if (SFX.tone) SFX.tone(520, 0.06, 'square', 0.10, 300);
            },
            suVeNguoi(){
                this.suSt = null; this.sdtUltXong = true;
                this.invulnAll = false;
                this.suDon();
                this.suYeu = SDTU_YEU;                       // khoang YEU cho nguoi choi danh tra
                // Tro ve dang nguoi that su: phase 1 -> ca phan VE lan bo chieu deu quay lai
                this.phase = 1;
                if (this.suW !== undefined){ this.w = this.suW; this.h = this.suH; this.baseY = 320 - this.h; }
                // @@HE-SDTULT-XONG: bo HET dau vet dang quy — Vergil mat hao quang DT + phan than,
                // Dante mat vong Devil Trigger. Ca hai ve dung dang nguoi thuong, dang KIET SUC.
                if (this.name.indexOf('VERGIL') >= 0){ this.stage = 1; this.aura = 0; this.dop = null; this.dopEv = []; this.chuoi = []; }
                if (Array.isArray(this.fams)) this.fams.length = 0;
                if (Array.isArray(this.swords)) this.swords.length = 0;
                this.dim = null; this.dome = null; this.wing = 0; this.hover = 0; this.suBong = []; this.suVung = null; this.suCau = [];
                this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.name = this.suTenGoc || this.name.split(' —')[0];
                this.state = 'idle'; this.subTimer = 0; this.actionTimer = 90; this._bag = null; this.atkBag = [];
                this.fly = 0; this.slash = null; this.tel = null;
                bossProjectiles.length = 0;
                floatingTexts.push(new FloatingText(this.cx() - 60, this.y - 34, 'TRỞ VỀ DẠNG NGƯỜI'));
                visualEffects.push(new Effect(this.cx(), this.cy(), 'charge_wave', true, 2.2));
                shakeTimer = Math.max(shakeTimer, 30);
            },
            // dem lui khoang yeu + tick kiem anh; goi moi khung ke ca sau khi da ve dang nguoi
            suTickPhu(){
                if (this.suYeu > 0) this.suYeu--;
                if (!this.suPhim || !this.suPhim.length) return;
                for (let i = this.suPhim.length - 1; i >= 0; i--){
                    let ph = this.suPhim[i]; ph.t--;
                    if (ph.vx) ph.x += ph.vx;
                    if (ph.hoi){                                   // kiem anh don ve phia nguoi choi
                        let tx = dino.x + dino.w/2, ty = dino.y + dino.h/2;
                        ph.ang = Math.atan2(ty - ph.y, tx - ph.x);
                        let sp = 2.6 + (1 - ph.t/ph.max) * 9.0;
                        ph.x += Math.cos(ph.ang) * sp; ph.y += Math.sin(ph.ang) * sp;
                    }
                    // No khi CHAM duoc nguoi choi, hoac khi het doi, hoac khi nhat ket kich hoat.
                    // Truoc day chi kiem tra dung MOT khung o giua doi -> vet bay toi noi thi da
                    // qua thoi diem kiem tra, ca chieu cuoi chi giang don duoc 1-4 lan.
                    if (ph.cho !== undefined){
                        // VUNG BAO TRUOC: hien vong tron, dem nguoc, HET gio moi no.
                        // Nguoi choi thay truoc va di ra khoi vung la khong dinh gi.
                        ph.cho--;
                        if (ph.cho === 0){
                            let R = ph.R || 56;
                            if (Math.hypot((dino.x+dino.w/2)-ph.x, (dino.y+dino.h/2)-ph.y) < R) this.suGiang(1);
                            visualEffects.push(new Effect(ph.x, ph.y, 'explosion', true, R));
                            shakeTimer = Math.max(shakeTimer, 14);
                            if (SFX.tone) SFX.tone(1300, 0.06, 'square', 0.10, 500);
                        }
                    }
                    if (ph.t <= 0) this.suPhim.splice(i, 1);
                }
            },
            // ================= DON KET (@@HE-SDTULT-AP) =================
            // Hans: "cam giac ve do AP BUC cua 2 chieu cuoi khong to lam".
            // VERGIL — JUDGEMENT CUT END that: tra Yamato vao vo, CA MAN HINH toi sam lai, hang chuc
            //   duong cat xe ngang doc khap noi, lang mot nhip, roi tieng "CACH" dong vo — ca man hinh
            //   vo nhu kinh. Khong co cho nao an toan: phai GIO KHIEN (parry) hoac LUOT dung nhip "cach".
            // DANTE — SIN DEVIL TRIGGER: bay len giua troi, goi mot RUNG KIEM TOI (Sin Swords) — moi thanh
            //   khoa vao cho nguoi choi dung luc no hien ra — roi phong xuong tung loat; cuoi cung dap xuong
            //   san tao hai lan song lua (nhay qua). Dung yen la an ca rung kiem: phai CHAY.
            donKet(t, vg){
                const B = (n) => t === n;
                if (B(0)){
                    this.suNhan(vg ? 'JUDGEMENT CUT END' : 'JUDGEMENT');
                    this.suVung = vg ? { toan: true, pha: 'khoa', vet: [], manh: [] } : { mua: true, pha: 'khoa', kiem: [] };
                    this.suCau = [];
                    this.dy = 0; this.grounded = true;
                    if (vg) this.y = this.baseY;
                    if (SFX.tone) SFX.tone(300, 0.25, 'sine', 0.16, 120);
                    shakeTimer = Math.max(shakeTimer, 16);
                }
                let V = this.suVung; if (!V) return;
                this.faceP();
                if (vg){
                    // 1. tra kiem, man hinh toi dan
                    if (t < 26){ this.drawn = false; V.pha = 'khoa'; return; }
                    // 2. loat rut: duong cat xe KHAP man hinh + qua cau cat
                    if (t < 80){
                        V.pha = 'rut';
                        for (let q = 0; q < 2; q++){
                            let cx = 40 + Math.random() * (canvas.width - 80), cy = 40 + Math.random() * 280, a = Math.random() * Math.PI, L = 260 + Math.random() * 420;
                            V.vet.push({ x1: cx - Math.cos(a) * L / 2, y1: cy - Math.sin(a) * L / 2, x2: cx + Math.cos(a) * L / 2, y2: cy + Math.sin(a) * L / 2, t: 0 });
                        }
                        if (t % 3 === 1) this.suCau.push({ x: 40 + Math.random() * (canvas.width - 80), y: 30 + Math.random() * 290, R: 14 + Math.random() * 18, ang: Math.random() * Math.PI * 2, t: 0 });
                        if (t % 2 === 0 && SFX.tone) SFX.tone(1400 + Math.random() * 600, 0.02, 'square', 0.04, 900);
                        return;
                    }
                    // 3. lang — man hinh gan nhu den
                    if (t < 104){ V.pha = 'lang'; return; }
                    // 4. "CACH" — ca man hinh vo
                    if (t === 104){
                        V.pha = 'no'; V.no = 40;
                        hitstopTimer = Math.max(hitstopTimer || 0, 10);
                        shakeTimer = Math.max(shakeTimer, 70);
                        if (SFX.tone) SFX.tone(2400, 0.08, 'square', 0.22, 400);
                        if (SFX.bossExplode) SFX.bossExplode();
                        for (let k = 0; k < 60; k++) V.manh.push({ x: Math.random() * canvas.width, y: Math.random() * 330, vx: (Math.random() - 0.5) * 6, vy: -2 + Math.random() * 3,
                                                                   s: 6 + Math.random() * 16, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.3 });
                        for (let c of this.suCau) visualEffects.push(new Effect(c.x, c.y, 'explosion', true, 30));
                        this.suGiang(2);                     // khong co cho an toan: parry / luot dung nhip
                    }
                    if (V.no > 0){ V.no--; for (const m of V.manh){ m.x += m.vx; m.y += m.vy; m.vy += 0.25; m.r += m.vr; }
                                   if (V.no === 0){ this.suVung = null; this.suCau = []; } }
                    return;
                }
                // ===== DANTE — RUNG KIEM =====
                let hy = this.baseY - 130;
                if (V.pha !== 'dap' && V.pha !== 'xong'){ this.y += (hy - this.y) * 0.12; this.dy = 0; this.grounded = false; this.drawn = true; this.armR = -2.2; }
                if (t >= 8 && t < 62){
                    V.pha = 'goi';
                    if (t % 3 === 0){
                        let tx = dino.x + dino.w/2 + (Math.random() - 0.5) * 60, ty = Math.min(312, dino.y + dino.h/2 + (Math.random() - 0.5) * 30);
                        let sx = Math.max(30, Math.min(canvas.width - 30, tx + (Math.random() - 0.5) * 520)), sy = 10 + Math.random() * 110;
                        V.kiem.push({ x: sx, y: sy, tx: tx, ty: ty, pha: 'treo', t: 0, key: 'k' + V.kiem.length });
                        if (SFX.tone) SFX.tone(700 + Math.random() * 300, 0.03, 'sawtooth', 0.05, 300);
                    }
                    return;
                }
                if (t < 74){ V.pha = 'lang'; return; }
                if (t < 150){
                    V.pha = 'ban';
                    let i = Math.floor((t - 74) / 3);
                    if ((t - 74) % 3 === 0 && V.kiem[i] && V.kiem[i].pha === 'treo'){
                        let k = V.kiem[i], a = Math.atan2(k.ty - k.y, k.tx - k.x); k.vx = Math.cos(a) * 20; k.vy = Math.sin(a) * 20; k.pha = 'bay';
                    }
                }
                for (const k of V.kiem){
                    if (k.pha !== 'bay') continue;
                    k.x += k.vx; k.y += k.vy;
                    if (k.y >= k.ty || k.y >= 318){
                        k.pha = 'no'; k.t = 14;
                        visualEffects.push(new Effect(k.x, k.y, 'explosion', true, 34));
                        if (Math.hypot((dino.x + dino.w/2) - k.x, (dino.y + dino.h/2) - k.y) < 38) this.suGiang(1);
                        shakeTimer = Math.max(shakeTimer, 6);
                    }
                }
                for (const k of V.kiem) if (k.pha === 'no' && --k.t <= 0) k.pha = 'het';
                if (t === 150){ V.pha = 'dap'; this.dy = 24; this.suNhan('DEVIL TRIGGER!'); }
                if (V.pha === 'dap'){
                    this.y += this.dy;
                    if (this.y >= this.baseY){
                        this.y = this.baseY; this.dy = 0; this.grounded = true; V.pha = 'xong'; V.no = 24;
                        shakeTimer = Math.max(shakeTimer, 50); hitstopTimer = Math.max(hitstopTimer || 0, 6);
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'body_slam_shockwave', true, 140));
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'lightning_burst', true, 3.2));
                        if (Math.abs((dino.x + dino.w/2) - this.cx()) < 100 && dino.y + dino.h > 270) this.suGiang(1);
                        for (let s2 = -1; s2 <= 1; s2 += 2) for (let q = 0; q < 2; q++){      // HAI lan song lua moi ben — nhay qua
                            let bp = new BossProjectile(this.cx() + s2 * (30 + q * 60) - 20, 320 - 52, s2 * (10 - q * 2.5), 0, true, 1);
                            bp.w = 40; bp.h = 52; bp.color = '#FF3D00'; bp.fire = true; bossProjectiles.push(bp);
                        }
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                }
                if (V.pha === 'xong' && V.no > 0 && --V.no === 0){ this.suVung = null; }
            },
            veDonKet(){
                let V = this.suVung; if (!V) return;
                if (V.toan){
                    // man toi phu CA KHUNG NHIN (ke ca vung camera keo len)
                    let x0 = ((typeof camX === 'number') ? camX : 0) - 40, y0 = ((typeof camY === 'number') ? camY : 0) - 40;
                    let toi = V.pha === 'khoa' ? 0.35 : V.pha === 'rut' ? 0.55 : V.pha === 'lang' ? 0.82 : Math.max(0, V.no / 40) * 0.6;
                    ctx.save();
                    ctx.fillStyle = '#02040A'; ctx.globalAlpha = toi; ctx.fillRect(x0, y0, canvas.width + 80, canvas.height + 80);
                    if (V.pha === 'no' && V.no > 30){ ctx.globalAlpha = (V.no - 30) / 10; ctx.fillStyle = '#E1F5FE'; ctx.fillRect(x0, y0, canvas.width + 80, canvas.height + 80); }
                    // duong cat
                    ctx.lineCap = 'round';
                    for (const v of V.vet){
                        v.t++;
                        let a = V.pha === 'no' ? Math.max(0, V.no / 40) : Math.min(1, v.t / 4) * (V.pha === 'lang' ? 0.55 + 0.45 * Math.sin(frames * 0.8) : 0.85);
                        ctx.globalAlpha = a; ctx.strokeStyle = '#E1F5FE'; ctx.lineWidth = V.pha === 'no' ? 3 : 1.6;
                        ctx.beginPath(); ctx.moveTo(v.x1, v.y1); ctx.lineTo(v.x2, v.y2); ctx.stroke();
                    }
                    for (const c of this.suCau || []){
                        c.t++; ctx.globalAlpha = (V.pha === 'no' ? 0.3 : 0.85) * Math.min(1, c.t / 6);
                        ctx.strokeStyle = '#81D4FA'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(c.x, c.y, c.R, 0, 6.28); ctx.stroke();
                    }
                    // manh kinh vo
                    if (V.pha === 'no') for (const m of V.manh){
                        ctx.globalAlpha = Math.max(0, V.no / 40); ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.r);
                        ctx.fillStyle = 'rgba(179,229,252,0.55)'; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(-m.s/2, -m.s/3); ctx.lineTo(m.s/2, -m.s/2); ctx.lineTo(m.s/3, m.s/2); ctx.closePath(); ctx.fill(); ctx.stroke();
                        ctx.restore();
                    }
                    if (V.pha === 'lang'){
                        ctx.globalAlpha = 1; ctx.fillStyle = '#E1F5FE'; ctx.font = 'bold 16px Consolas, monospace'; ctx.textAlign = 'center';
                        ctx.fillText(LT('— PARRY HOẶC LƯỚT ĐÚNG LÚC "CẠCH" —', '— PARRY OR DASH ON THE "CLICK" —'), canvas.width / 2, 120);
                        ctx.textAlign = 'left';
                    }
                    ctx.restore();
                    return;
                }
                if (V.mua){
                    ctx.save();
                    let x0 = ((typeof camX === 'number') ? camX : 0) - 40, y0 = ((typeof camY === 'number') ? camY : 0) - 40;
                    ctx.globalAlpha = V.pha === 'xong' ? 0.2 : 0.32; ctx.fillStyle = '#1A0000'; ctx.fillRect(x0, y0, canvas.width + 80, canvas.height + 80);
                    for (const k of V.kiem){
                        if (k.pha === 'het') continue;
                        if (k.pha === 'treo'){
                            ctx.globalAlpha = V.pha === 'lang' ? 0.5 + 0.4 * Math.sin(frames * 0.8) : 0.35;
                            ctx.strokeStyle = '#FF1744'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 6]);
                            ctx.beginPath(); ctx.moveTo(k.x, k.y); ctx.lineTo(k.tx, k.ty); ctx.stroke(); ctx.setLineDash([]);
                            ctx.globalAlpha = 0.45; ctx.beginPath(); ctx.arc(k.tx, k.ty, 12, 0, 6.28); ctx.stroke();
                        }
                        if (k.pha === 'no'){
                            ctx.globalAlpha = k.t / 14; ctx.fillStyle = '#FF6E40'; ctx.beginPath(); ctx.arc(k.x, k.y, 38 * (1 - k.t / 14) + 8, 0, 6.28); ctx.fill();
                            continue;
                        }
                        // thanh kiem toi: luoi den, vien do rực
                        let a = k.pha === 'bay' ? Math.atan2(k.vy, k.vx) : Math.atan2(k.ty - k.y, k.tx - k.x);
                        ctx.globalAlpha = 1; ctx.save(); ctx.translate(k.x, k.y); ctx.rotate(a);
                        ctx.shadowColor = '#FF3D00'; ctx.shadowBlur = 10;
                        ctx.fillStyle = '#1A0505'; ctx.beginPath(); ctx.moveTo(22, 0); ctx.lineTo(-10, -5); ctx.lineTo(-10, 5); ctx.closePath(); ctx.fill();
                        ctx.strokeStyle = '#FF5722'; ctx.lineWidth = 1.5; ctx.stroke();
                        ctx.fillStyle = '#FFAB40'; ctx.fillRect(-16, -7, 5, 14); ctx.fillStyle = '#5D1010'; ctx.fillRect(-24, -2, 9, 4);
                        ctx.restore();
                    }
                    ctx.restore();
                }
            },
            suTickCung(){
                if (!this.suCung) return;
                for (let i = this.suCung.length - 1; i >= 0; i--) if (--this.suCung[i].t <= 0) this.suCung.splice(i, 1);
            },
            suVe(){
                this.suTickCung();
                this.veDonKet();
                this.suVeBong();
                if (this.suCung) for (let a of this.suCung){
                    let cxS = a.dir < 0 ? a.x - 8 : a.x + 8, cyS = a.y - a.up*0.4;
                    ctx.save(); ctx.globalAlpha = Math.min(1, a.t/(a.max*0.5));
                    ctx.strokeStyle = this.suTen === 'JUDGEMENT CUT END' ? '#81D4FA' : '#FFAB91';
                    ctx.lineWidth = 5; ctx.lineCap = 'round';
                    let mo = 1 - a.t/a.max, bd = 1.0;
                    for (let k = 0; k < 3; k++){
                        let R = Math.max(10, a.reach - k*16) * (0.7 + 0.35*mo);
                        ctx.beginPath();
                        ctx.arc(cxS, cyS, R, a.dir<0?Math.PI-bd:-bd, a.dir<0?Math.PI+bd:bd, false);
                        ctx.stroke();
                    }
                    ctx.globalAlpha *= 0.55; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.arc(cxS, cyS, a.reach*(0.7+0.35*mo), a.dir<0?Math.PI-bd:-bd, a.dir<0?Math.PI+bd:bd, false); ctx.stroke();
                    ctx.restore();
                }
                if (this.suSt === 'don'){
                    let t = this.suT / SDTU_DON;
                    ctx.save(); ctx.globalAlpha = 0.30 * t; ctx.fillStyle = '#000'; ctx.fillRect(0,0,canvas.width,canvas.height);
                    ctx.globalAlpha = 0.5 + 0.4*Math.sin(frames*0.4);
                    ctx.strokeStyle = this.suTen === 'JUDGEMENT CUT END' ? '#4FC3F7' : '#FF7043';
                    ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 150*(1-t)+26, 0, Math.PI*2); ctx.stroke();
                    ctx.globalAlpha = 1; ctx.fillStyle = '#FFF'; ctx.font = 'bold 22px Consolas, monospace'; ctx.textAlign = 'center';
                    ctx.fillText(this.suTen, canvas.width/2, 74);
                    ctx.font = 'bold 12px Consolas, monospace'; ctx.fillStyle = '#FFCC80';
                    ctx.fillText('GIƠ KHIÊN HOẶC LƯỚT NÉ', canvas.width/2, 94);
                    ctx.textAlign = 'left'; ctx.restore();
                }
                if (this.suPhim) for (let ph of this.suPhim){
                    if (ph.cho !== undefined){
                        let t2 = Math.min(1, Math.max(0, ph.cho)/22), R = ph.R || 56;
                        ctx.save();
                        ctx.globalAlpha = 0.30; ctx.fillStyle = '#4FC3F7';
                        ctx.beginPath(); ctx.arc(ph.x, ph.y, R, 0, Math.PI*2); ctx.fill();
                        ctx.globalAlpha = 0.95; ctx.strokeStyle = '#E1F5FE'; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.arc(ph.x, ph.y, R*(0.25+0.75*(1-t2)), 0, Math.PI*2); ctx.stroke();
                        ctx.restore();
                        continue;
                    }
                    let a = Math.min(1, ph.t/ph.max*1.6);
                    ctx.save(); ctx.globalAlpha = a;
                    if (ph.kiem){
                        ctx.translate(ph.x, ph.y); ctx.rotate(ph.ang + frames*0.2);
                        ctx.strokeStyle = '#FFAB91'; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.moveTo(-22,0); ctx.lineTo(22,0); ctx.stroke();
                        ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 1.5;
                        ctx.beginPath(); ctx.moveTo(-14,-4); ctx.lineTo(-14,4); ctx.stroke();
                    } else {
                        ctx.strokeStyle = '#4FC3F7'; ctx.lineWidth = 3;
                        let R = (ph.R||46) * (0.35 + (1-ph.t/ph.max)*0.75);
                        ctx.beginPath(); ctx.arc(ph.x, ph.y, R, 0, Math.PI*2); ctx.stroke();
                        ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 2;
                        for (let g = 0; g < 3; g++){
                            let aa = g*Math.PI/3 + frames*0.1;
                            ctx.beginPath(); ctx.moveTo(ph.x-Math.cos(aa)*R, ph.y-Math.sin(aa)*R);
                            ctx.lineTo(ph.x+Math.cos(aa)*R, ph.y+Math.sin(aa)*R); ctx.stroke();
                        }
                    }
                    ctx.restore();
                }
                if (this.suYeu > 0){
                    ctx.save(); ctx.globalAlpha = 0.25 + 0.15*Math.sin(frames*0.2);
                    ctx.strokeStyle = '#90A4AE'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 40, 0, Math.PI*2); ctx.stroke();
                    ctx.globalAlpha = 0.9; ctx.fillStyle = '#B0BEC5'; ctx.font = 'bold 9px Consolas, monospace'; ctx.textAlign = 'center';
                    ctx.fillText('KIỆT SỨC', this.cx(), this.y - 30); ctx.textAlign = 'left';
                    ctx.restore();
                }
            }
        };
// BOSS_PART_END s6.SDT_ULT.1

// Nguồn: index.html:98841 · Dùng bởi: DanteBoss, VergilBoss
// BOSS_PART_BEGIN s6.capSdtUlt.1 READ_ONLY
(function capSdtUlt(){
            for (const C of [typeof VergilBoss !== 'undefined' ? VergilBoss : null,
                             typeof DanteBoss  !== 'undefined' ? DanteBoss  : null]){
                if (typeof C !== 'function') continue;
                for (const k of Object.keys(SDT_ULT)) C.prototype[k] = SDT_ULT[k];
            }
        })();
// BOSS_PART_END s6.capSdtUlt.1

// Nguồn: index.html:99424 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:99435 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:110573 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s16.DANTE_SIN_DRILL.1 READ_ONLY
const DANTE_SIN_DRILL={length:150,radius:48,rear:27,palette:{bd:'#24080c',dk:'#110507',lt:'#9a1b21',out:'#ff5722',rim:'#ffc400',eye:'#ffe0b2'}};
// BOSS_PART_END s16.DANTE_SIN_DRILL.1

// Nguồn: index.html:110574 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s16.danteDrawSinDrill.1 READ_ONLY
function danteDrawSinDrill(cx,cy,dir,age){veCanhKhoan(cx,cy,dir<0?Math.PI:0,age,DANTE_SIN_DRILL.palette);}
// BOSS_PART_END s16.danteDrawSinDrill.1

// Nguồn: index.html:111882 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s18.YMT_MOVES.1 READ_ONLY
const YMT_MOVES = {
    // 1. YAMATO COMBO A (J -> J -> J -> J): Thuần sát thương & tốc độ, không gây stun khóa cứng
    a1: { name: 'YAMATO COMBO A · IAI DRAW',     T: 18, wind: 3, cancel: 10, end: 13, damage: 2.8, pose: 'iaiSlash',  hits: [4],         advance: 6,  conc: 12 },
    a2: { name: 'YAMATO COMBO A · REVERSE CUT',  T: 18, wind: 3, cancel: 10, end: 13, damage: 2.8, pose: 'revSlash',  hits: [4],         advance: 6,  conc: 12 },
    a3: { name: 'YAMATO COMBO A · SAYA STRIKE',  T: 20, wind: 3, cancel: 12, end: 15, damage: 2.2, pose: 'sayaBash',  hits: [4, 9],      advance: 8,  conc: 15 },
    a4: { name: 'YAMATO COMBO A · VOID CLEAVE',  T: 32, wind: 6, cancel: 22, end: 20, damage: 5.5, pose: 'wideIai',   hits: [8],         advance: 12, conc: 28, sheatheAt: 22 },

    // 2. YAMATO COMBO C (J -> J -> Đợi nhịp -> J): Chém bão táp sát thương thuần
    c_flurry: { name: 'YAMATO COMBO C · MILLENNIUM SLASH', T: 42, wind: 2, cancel: 34, end: 36, damage: 1.1, pose: 'flurry', count: 9, advance: 4, conc: 25 },
    c_finish: { name: 'YAMATO COMBO C · DIMENSION REND',   T: 34, wind: 7, cancel: 24, end: 22, damage: 6.0, pose: 'wideIai', hits: [9], advance: 14, conc: 35, sheatheAt: 24 },

    // 3. UPPER SLASH (Cúi + J): CÓ KHỐNG CHẾ HẤT TUNG (Chịu khóa `ccKey: 'upper'` 2 giây!)
    upper1: { name: 'UPPER SLASH · RISING IAI',    T: 24, wind: 4, cancel: 14, end: 17, damage: 4.2, pose: 'upperIai', hits: [6], ccKey: 'upper', launch: true, advance: 6, conc: 18, sheatheAt: 18 },
    upper2: { name: 'UPPER SLASH II · ASCENSION',  T: 26, wind: 3, cancel: 16, end: 19, damage: 4.5, pose: 'upperIai', hits: [5], ccKey: 'upper', launchWithMe: true, advance: 8, conc: 22 },

    // 4. AERIAL RAVE (Trên không J): Chỉ giữ nhẹ khi mục tiêu đang ở sẵn trên không
    air1:  { name: 'AERIAL RAVE A · SKY DRAW',     T: 17, wind: 3, cancel: 10, end: 13, damage: 2.8, pose: 'iaiSlash', hits: [4], airJuggle: true, conc: 12 },
    air2:  { name: 'AERIAL RAVE A · SKY REVERSE',  T: 17, wind: 3, cancel: 10, end: 13, damage: 2.8, pose: 'revSlash', hits: [4], airJuggle: true, conc: 12 },
    air3:  { name: 'AERIAL RAVE A · MOON CLEAVE',  T: 24, wind: 5, cancel: 16, end: 18, damage: 5.0, pose: 'downIai',  hits: [7], conc: 20, sheatheAt: 18 },
    airb1: { name: 'AERIAL RAVE B · SPIRAL RISE',  T: 22, wind: 3, cancel: 15, end: 18, damage: 2.4, pose: 'spinUp',   hits: [4, 10], airJuggle: true, conc: 18 },
    airb2: { name: 'AERIAL RAVE B · ECLIPSE DROP', T: 26, wind: 5, cancel: 18, end: 20, damage: 5.5, pose: 'downIai',  hits: [7], ccKey: 'slam', slam: true, conc: 24 },

    // 5. KỸ NĂNG NÚT K THUẦN YAMATO (Rapid Slash / Rising Star / Void Slash / Helm Breaker):
    rapid:   { name: 'RAPID SLASH',                 T: 28, wind: 3, cancel: 20, end: 22, damage: 1.5, pose: 'rapid',    hits: [4, 8, 12, 16, 20], advance: 20, crossThrough: true, conc: 22, sheatheAt: 21 },
    rstar:   { name: 'RISING STAR',                 T: 32, wind: 3, cancel: 24, end: 26, damage: 1.8, pose: 'spinUp',   hits: [4, 9, 14, 19], ccKey: 'rstar', launchWithMe: true, advance: 12, conc: 28 },
    vslash:  { name: 'VOID SLASH · SPACE SHATTER',  T: 32, wind: 7, cancel: 22, end: 22, damage: 4.8, pose: 'voidArc',  hits: [9], ccKey: 'void', pullIn: true, slowBubble: true, conc: 25, sheatheAt: 23 },
    helm:    { name: 'AERIAL CLEAVE · HELM BREAKER',T: 26, wind: 4, cancel: 18, end: 20, damage: 5.5, pose: 'helm',     ccKey: 'slam', slam: true, conc: 20, sheatheAt: 19 },

    // 6. JUDGEMENT CUT & PERFECT JUDGEMENT CUT (Tầm xa — Gây sát thương thuần, không khóa cứng vô hạn):
    jcut:    { name: 'JUDGEMENT CUT',               T: 24, wind: 4, cancel: 14, end: 18, damage: 4.5, pose: 'jcutPose', isJCut: true, perfect: false, conc: 20, sheatheAt: 13 },
    pjcut:   { name: 'PERFECT JUDGEMENT CUT!',      T: 20, wind: 2, cancel: 10, end: 15, damage: 7.2, pose: 'jcutPose', isJCut: true, perfect: true,  conc: 35, sheatheAt: 9 },

    // =========================================================================
    // 7. NHÁNH PHÍM O — MIRAGE BLADE MELEE (KẾT HỢP CẬN CHIẾN CÙNG J HOẶC K)
    // =========================================================================
    m_combo1:  { name: 'MIRAGE EDGE · TWIN SLASH I',   T: 18, wind: 3, cancel: 10, end: 14, damage: 3.0, pose: 'mirage1',   hits: [4, 9],       advance: 8,  mirageMelee: true, conc: 14 },
    m_combo2:  { name: 'MIRAGE EDGE · TWIN VORTEX II', T: 20, wind: 3, cancel: 12, end: 16, damage: 3.2, pose: 'mirage2',   hits: [4, 10],      advance: 9,  mirageMelee: true, conc: 16 },
    m_combo3:  { name: 'MIRAGE EDGE · CROSS REND III', T: 26, wind: 5, cancel: 18, end: 20, damage: 5.8, pose: 'mirageFin', hits: [7, 13],      advance: 12, mirageMelee: true, conc: 24, sheatheAt: 20 },
    m_stinger: { name: 'MIRAGE EDGE · DEEP STINGER',   T: 30, wind: 4, cancel: 22, end: 25, damage: 1.6, pose: 'mStinger',  hits: [5, 9, 13, 17, 21], advance: 22, mirageMelee: true, ccKey: 'mstinger', stunOnly: 24, conc: 26 },
    m_round:   { name: 'MIRAGE EDGE · ROUND TRIP',     T: 24, wind: 5, cancel: 15, end: 18, damage: 2.5, pose: 'mirageFin', hits: [7],          mirageMelee: true, spawnRoundTrip: true, conc: 18 },
    m_high:    { name: 'MIRAGE EDGE · SPIRAL LAUNCH',  T: 24, wind: 4, cancel: 14, end: 18, damage: 4.4, pose: 'upperIai',  hits: [6],          mirageMelee: true, ccKey: 'upper', launchWithMe: true, conc: 20 }
};
// BOSS_PART_END s18.YMT_MOVES.1

// Nguồn: index.html:112358 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s18.ymtPose.1 READ_ONLY
function ymtPose(n, v, a, age) {
    const dir = a ? a.dir : (n.isFacingLeft ? -1 : 1);
    const ox = n.x + n.w / 2, oy = n.y;
    let sayaX = -10, sayaY = 28, sayaAng = -0.38;
    let hx = -6, hy = 25, angle = -0.38, len = 82, flat = 1, drawn = false, mirageBlade = false;
    // Tọa độ tay trái cầm Mirage Edge khi kích hoạt O + J/K
    let mhx = -12, mhy = 22, mAngle = 0.55;

    if (!a) {
        const breath = Math.sin(frames * 0.06) * 1.0;
        sayaY += breath; hy += breath;
        drawn = false;
        mirageBlade = v.mirageStance > 0;
        if (mirageBlade) { mhx = -14; mhy = 20 + breath; mAngle = 2.35; }
    } else {
        const pr = Math.max(0, Math.min(1, (age - a.wind) / Math.max(1, a.end - a.wind)));
        const ease = 1 - Math.pow(1 - pr, 3);
        drawn = age >= a.wind && !a.sheathed;
        mirageBlade = !!a.mirageMelee || v.mirageStance > 0;

        switch (a.pose) {
            case 'iaiSlash':
                if (age < a.wind) {
                    drawn = false; hx = -8; hy = 26;
                } else {
                    angle = 2.15 - 3.65 * ease;
                    hx = -4 + 22 * Math.sin(ease * Math.PI * 0.85);
                    hy = 25 - 8 * ease;
                    flat = 0.52;
                }
                break;

            case 'revSlash':
                angle = -1.65 + 3.45 * ease;
                hx = 18 - 14 * ease;
                hy = 20 + 8 * ease;
                flat = 0.48;
                break;

            case 'sayaBash':
                if (age < 7) {
                    drawn = false; sayaX = 16; sayaY = 22; sayaAng = 0.15;
                } else {
                    drawn = true;
                    angle = -2.4 + 4.2 * ease;
                    hx = 16; hy = 22; flat = 0.42;
                }
                break;

            case 'wideIai':
            case 'voidArc':
                if (age < a.wind) {
                    drawn = false; hx = -10; hy = 26;
                } else if (age <= a.end) {
                    angle = 2.35 - 4.5 * ease;
                    hx = 20 * Math.sin(ease * Math.PI * 0.75);
                    hy = 22;
                    len = 96; flat = 0.38;
                } else {
                    drawn = !a.sheathed;
                    angle = -0.38; hx = -6; hy = 25;
                }
                break;

            case 'upperIai':
                angle = 1.85 - 3.75 * ease;
                hx = 14 * Math.sin(ease * Math.PI);
                hy = 34 - 22 * ease;
                len = 88;
                if (mirageBlade) { mAngle = 2.1 - 3.9 * ease; mhx = 18 * Math.sin(ease * Math.PI); mhy = 30 - 20 * ease; }
                break;

            case 'downIai':
            case 'helm':
                angle = -2.35 + 3.55 * ease;
                hx = 14; hy = 14 + 18 * ease;
                len = 88;
                break;

            case 'flurry': {
                const spd = age * 1.45;
                angle = Math.sin(spd) * 1.35;
                hx = 16 + Math.cos(spd * 1.3) * 8;
                hy = 22 + Math.sin(spd * 0.9) * 6;
                len = 88; flat = 0.55;
                break;
            }

            case 'rapid':
                angle = Math.sin(age * 1.2) * 1.1;
                hx = 18; hy = 24; len = 90; flat = 0.45;
                break;

            case 'spinUp':
                angle = -2.2 + Math.PI * 2 * 2 * ease;
                hx = 12 * Math.cos(angle);
                hy = 20 + 6 * Math.sin(angle);
                len = 86; flat = 0.45;
                break;

            case 'jcutPose':
                drawn = age >= a.wind && age <= a.wind + 3;
                angle = -0.25; hx = -4; hy = 24; len = 84;
                break;

            // --- CÁC POSE SONG KIẾM YAMATO + MIRAGE EDGE (NHÁNH PHÍM O) ---
            case 'mirage1':
                angle = -2.2 + 3.8 * ease;
                hx = 14 * Math.sin(ease * Math.PI); hy = 20;
                mAngle = 2.2 - 3.8 * ease;
                mhx = 18 * Math.sin(ease * Math.PI); mhy = 24;
                flat = 0.48;
                break;

            case 'mirage2':
                angle = -2.5 + Math.PI * 2 * ease;
                mAngle = angle + Math.PI;
                hx = 14 * Math.cos(angle); hy = 22;
                mhx = 14 * Math.cos(mAngle); mhy = 24;
                flat = 0.42;
                break;

            case 'mirageFin':
                angle = -2.4 + 4.1 * ease;
                mAngle = 2.4 - 4.1 * ease;
                hx = 20 * Math.sin(ease * Math.PI); hy = 20;
                mhx = 20 * Math.sin(ease * Math.PI); mhy = 26;
                len = 92; flat = 0.40;
                break;

            case 'mStinger': { // Deep Stinger: 2 thanh kiếm chụm mũi xoay khoan về phía trước!
                const spin = age * 0.95;
                angle = Math.sin(spin) * 0.18;
                mAngle = -Math.sin(spin) * 0.18;
                hx = 22; hy = 22 + Math.cos(spin) * 4;
                mhx = 24; mhy = 22 - Math.cos(spin) * 4;
                len = 96; flat = 0.65;
                break;
            }
        }
    }

    const wx = ox + dir * hx, wy = oy + hy;
    const mwx = ox + dir * mhx, mwy = oy + mhy;
    return {
        x: wx, y: wy,
        tx: wx + dir * Math.cos(angle) * len,
        ty: wy + Math.sin(angle) * len * flat,
        mx: mwx, my: mwy,
        mtx: mwx + dir * Math.cos(mAngle) * (len * 0.96),
        mty: mwy + Math.sin(mAngle) * (len * 0.96) * flat,
        mAngle,
        sayaX: ox + dir * sayaX, sayaY: oy + sayaY, sayaAng,
        angle, len, flat, dir, drawn, mirageBlade
    };
}
// BOSS_PART_END s18.ymtPose.1

// Nguồn: index.html:113324 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s18.vgDrawKatana.1 READ_ONLY
function vgDrawKatana(x, y, angle, len = 84, flat = 1, isSdt = false) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, flat);
    ctx.rotate(angle);

    ctx.fillStyle = '#ECEFF1';
    ctx.fillRect(-15, -2.2, 14, 4.4);
    ctx.fillStyle = '#263238';
    for (let k = 0; k < 3; k++) ctx.fillRect(-14 + k * 4.2, -2.2, 2, 4.4);
    ctx.fillStyle = '#FFD54F';
    ctx.fillRect(-2, -6.5, 3, 13);

    ctx.shadowColor = isSdt ? '#B388FF' : '#00E5FF';
    ctx.shadowBlur = isSdt ? 18 : 12;
    const grad = ctx.createLinearGradient(0, 0, len, 0);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.55, isSdt ? '#D1C4E9' : '#B3E5FC');
    grad.addColorStop(1, isSdt ? '#7C4DFF' : '#00E5FF');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(1, -2.5);
    ctx.quadraticCurveTo(len * 0.55, -4.5, len, -1.2);
    ctx.lineTo(len - 5, 2.5);
    ctx.quadraticCurveTo(len * 0.5, 0.8, 1, 2.2);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(2, -1.2);
    ctx.quadraticCurveTo(len * 0.55, -2.8, len - 2, -0.8);
    ctx.stroke();

    ctx.restore();
}
// BOSS_PART_END s18.vgDrawKatana.1

// Nguồn: index.html:113363 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s18.vgDrawMirageEdgeBlade.1 READ_ONLY
function vgDrawMirageEdgeBlade(x, y, angle, len = 80, flat = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, flat);
    ctx.rotate(angle);
    ctx.globalAlpha = 0.85;
    ctx.shadowColor = '#00E5FF';
    ctx.shadowBlur = 14;

    ctx.fillStyle = '#00E5FF';
    ctx.beginPath();
    ctx.moveTo(-10, -2.5);
    ctx.lineTo(4, -8);
    ctx.lineTo(len * 0.72, -5.5);
    ctx.lineTo(len, 0);
    ctx.lineTo(len * 0.72, 5.5);
    ctx.lineTo(4, 8);
    ctx.lineTo(-10, 2.5);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#E0F7FA';
    ctx.beginPath();
    ctx.moveTo(4, -2.2);
    ctx.lineTo(len - 6, 0);
    ctx.lineTo(4, 2.2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
// BOSS_PART_END s18.vgDrawMirageEdgeBlade.1

// Nguồn: index.html:113823 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.VERGIL_BOSS_STRINGS.1 EDITABLE
const VERGIL_BOSS_STRINGS = {
    // 1. YAMATO COMBO A (4 nhịp rút kiếm chuẩn + Tra kiếm lóe sáng ở cuối)
    ymt_combo_a: {
        label: 'YAMATO · COMBO A',
        warpIn: true,
        sheathePause: 30,
        moves: ['a1', 'a2', 'a3', 'a4']
    },
    // 2. YAMATO COMBO C (2 nhát mở màn -> Ngừng 1 nhịp ngắn -> Chém bão táp Millennium Slash -> Dimension Rend)
    ymt_combo_c: {
        label: 'YAMATO · COMBO C (FLURRY)',
        warpIn: true,
        sheathePause: 36,
        moves: ['a1', 'a2', 'c_flurry', 'c_finish']
    },
    // 3. MIRAGE EDGE TWIN COMBO (Song kiếm Yamato + Mirage Edge chém xoáy liên hoàn)
    mirage_twin: {
        label: 'YAMATO & MIRAGE EDGE · TWIN COMBO',
        warpIn: true,
        sheathePause: 30,
        moves: ['m_combo1', 'm_combo2', 'm_combo3']
    },
    // 4. MIRAGE DEEP STINGER & ROUND TRIP (Khoan song kiếm rồi ném kiếm xoay tại chỗ và lùi ra)
    mirage_press: {
        label: 'MIRAGE EDGE · DEEP STINGER & ROUND TRIP',
        warpIn: false,
        sheathePause: 34,
        retreatAfter: true,
        moves: ['m_stinger', 'm_round']
    },
    // 5. RAPID SLASH -> RISING STAR -> ECLIPSE DROP (Lướt xuyên qua -> Xoay kiếm bay lên -> Bổ xuống)
    rapid_rising: {
        label: 'YAMATO · RAPID SLASH ⯈ RISING STAR',
        warpIn: false,
        sheathePause: 34,
        moves: ['rapid', 'rstar', 'airb2']
    },
    // 6. UPPER SLASH -> AERIAL RAVE B (Chém hất lên -> Bay theo chém 2 nhát -> Bổ Helm Breaker)
    aerial_rave: {
        label: 'YAMATO · UPPER SLASH ⯈ AERIAL RAVE',
        warpIn: true,
        sheathePause: 32,
        moves: ['upper2', 'air1', 'air2', 'helm']
    },
    // 7. VOID SLASH -> PERFECT JUDGEMENT CUT (Chém nứt không gian làm chậm -> Lùi nhẹ cắt cầu không gian)
    void_jcut: {
        label: 'YAMATO · VOID SLASH ⯈ JUDGEMENT CUT',
        warpIn: true,
        sheathePause: 34,
        retreatAfter: true,
        moves: ['vslash', 'pjcut']
    },
    // 8. TRIPLE PERFECT JUDGEMENT CUT (Đứng từ xa rút kiếm cắt 3 quả cầu không gian liên tiếp — không lao vào dí!)
    triple_jcut: {
        label: 'YAMATO · TRIPLE JUDGEMENT CUT',
        warpIn: false,
        sheathePause: 38,
        moves: ['jcut', 'pjcut', 'pjcut']
    }
};
// BOSS_PART_END s19.VERGIL_BOSS_STRINGS.1

// Nguồn: index.html:113885 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.VG_BOSS_FALLBACK_MOVES.1 EDITABLE
const VG_BOSS_FALLBACK_MOVES = {
    a1:       { T: 20, wind: 5,  cancel: 12, end: 15, pose: 'iaiSlash',  hits: [6],             advance: 5 },
    a2:       { T: 20, wind: 5,  cancel: 12, end: 15, pose: 'revSlash',  hits: [6],             advance: 5 },
    a3:       { T: 22, wind: 5,  cancel: 14, end: 17, pose: 'sayaBash',  hits: [6, 11],         advance: 7 },
    a4:       { T: 34, wind: 8,  cancel: 24, end: 22, pose: 'wideIai',   hits: [10],            advance: 10, sheatheAt: 24 },
    c_flurry: { T: 44, wind: 6,  cancel: 36, end: 38, pose: 'flurry',    count: 7,              advance: 3 },
    c_finish: { T: 36, wind: 9,  cancel: 26, end: 24, pose: 'wideIai',   hits: [11],            advance: 12, sheatheAt: 26 },
    upper1:   { T: 26, wind: 6,  cancel: 16, end: 19, pose: 'upperIai',  hits: [8],             advance: 6,  launch: true, sheatheAt: 20 },
    upper2:   { T: 28, wind: 6,  cancel: 18, end: 21, pose: 'upperIai',  hits: [8],             advance: 7,  launchWithMe: true },
    air1:     { T: 19, wind: 4,  cancel: 12, end: 15, pose: 'iaiSlash',  hits: [6] },
    air2:     { T: 19, wind: 4,  cancel: 12, end: 15, pose: 'revSlash',  hits: [6] },
    airb2:    { T: 28, wind: 7,  cancel: 20, end: 22, pose: 'downIai',   hits: [9],             slam: true },
    rapid:    { T: 30, wind: 6,  cancel: 22, end: 24, pose: 'rapid',     hits: [7, 11, 15, 19], advance: 16, sheatheAt: 23 },
    rstar:    { T: 34, wind: 5,  cancel: 26, end: 28, pose: 'spinUp',    hits: [6, 12, 18, 23],advance: 10, launchWithMe: true },
    vslash:   { T: 34, wind: 9,  cancel: 24, end: 24, pose: 'voidArc',   hits: [11],            slowBubble: true, sheatheAt: 25 },
    helm:     { T: 28, wind: 6,  cancel: 20, end: 22, pose: 'helm',      slam: true,            sheatheAt: 21 },
    jcut:     { T: 26, wind: 7,  cancel: 16, end: 20, pose: 'jcutPose',  isJCut: true, perfect: false, sheatheAt: 15 },
    pjcut:    { T: 22, wind: 5,  cancel: 13, end: 17, pose: 'jcutPose',  isJCut: true, perfect: true,  sheatheAt: 12 },
    m_combo1: { T: 20, wind: 5,  cancel: 12, end: 16, pose: 'mirage1',   hits: [6, 11],         advance: 7,  mirageMelee: true },
    m_combo2: { T: 22, wind: 5,  cancel: 14, end: 18, pose: 'mirage2',   hits: [6, 12],         advance: 8,  mirageMelee: true },
    m_combo3: { T: 28, wind: 7,  cancel: 20, end: 22, pose: 'mirageFin', hits: [9, 15],         advance: 10, mirageMelee: true, sheatheAt: 22 },
    m_stinger:{ T: 32, wind: 7,  cancel: 24, end: 27, pose: 'mStinger',  hits: [8, 12, 16, 20, 24], advance: 16, mirageMelee: true },
    m_round:  { T: 26, wind: 7,  cancel: 18, end: 20, pose: 'mirageFin', hits: [9],             mirageMelee: true, spawnRoundTrip: true }
};
// BOSS_PART_END s19.VG_BOSS_FALLBACK_MOVES.1

// Nguồn: index.html:113910 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.vgBossGetMoveDef.1 EDITABLE
function vgBossGetMoveDef(id) {
    const base = (typeof YMT_MOVES !== 'undefined' && YMT_MOVES[id]) ? YMT_MOVES[id] : (VG_BOSS_FALLBACK_MOVES[id] || VG_BOSS_FALLBACK_MOVES.a1);
    // Cho Boss thêm 2-3 frame windup nhẹ so với Player để người chơi kịp nhìn phản xạ & Parry!
    const wind = Math.max(4, (base.wind || 4) + 2);
    const end = Math.max(wind + 4, (base.end || 14) + 2);
    const T = Math.max(end + 3, (base.T || 20) + 3);
    const cancel = Math.max(end - 1, Math.min(T - 2, (base.cancel || end) + 2));
    const delay=wind-(base.wind||4);
    return { ...base, id, wind, end, T, cancel,
        hits:base.hits?.map(t=>t+delay),
        sheatheAt:base.sheatheAt===undefined?undefined:base.sheatheAt+delay };
}
// BOSS_PART_END s19.vgBossGetMoveDef.1

// Nguồn: index.html:113923 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.vgBossEnsureFx.1 EDITABLE
function vgBossEnsureFx(boss) {
    if (!boss._atkFx) {
        boss._atkFx = {
            slashTrail: [],
            mirageTrail: [],
            roundSword: null,
            sheatheSpark: 0,
            sparks: []
        };
    }
    return boss._atkFx;
}
// BOSS_PART_END s19.vgBossEnsureFx.1

// Nguồn: index.html:113937 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.vgBossComputePose.1 EDITABLE
function vgBossComputePose(boss, m, age, dir) {
    if (typeof ymtPose === 'function') {
        return ymtPose(boss, { mirageStance: m.mirageMelee ? 10 : 0 }, { ...m, dir, sheathed: age >= (m.sheatheAt || 999) }, age);
    }
    const ox = boss.cx(), oy = boss.y;
    const pr = Math.max(0, Math.min(1, (age - m.wind) / Math.max(1, m.end - m.wind)));
    const ease = 1 - Math.pow(1 - pr, 3);
    const drawn = age >= m.wind && age < (m.sheatheAt || 999);
    let angle = 2.1 - 3.6 * ease, mAngle = -2.1 + 3.6 * ease;
    let hx = 14 * Math.sin(ease * Math.PI), hy = 22, len = 86, flat = 0.48;
    if (m.pose === 'upperIai' || m.pose === 'spinUp') { angle = 1.8 - 3.7 * ease; flat = 0.85; }
    else if (m.pose === 'downIai' || m.pose === 'helm') { angle = -2.3 + 3.5 * ease; flat = 0.9; }
    else if (m.pose === 'jcutPose') { drawn = age >= m.wind && age <= m.wind + 3; angle = -0.3; hx = -4; }
    const wx = ox + dir * hx, wy = oy + hy;
    const mwx = ox + dir * (hx - 4), mwy = oy + hy + 2;
    return {
        x: wx, y: wy,
        tx: wx + dir * Math.cos(angle) * len,
        ty: wy + Math.sin(angle) * len * flat,
        mx: mwx, my: mwy,
        mtx: mwx + dir * Math.cos(mAngle) * (len * 0.94),
        mty: mwy + Math.sin(mAngle) * (len * 0.94) * flat,
        mAngle,
        sayaX: ox - dir * 10, sayaY: oy + 28,
        angle, len, flat, dir, drawn,
        mirageBlade: !!m.mirageMelee
    };
}
// BOSS_PART_END s19.vgBossComputePose.1

// Nguồn: index.html:113967 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.VergilBoss.prototype.startAttackerString.1 EDITABLE
VergilBoss.prototype.startAttackerString = function(strId) {
    const pattern = VERGIL_BOSS_STRINGS[strId];
    if (!pattern || this.phase !== 1 || this.suSt || this.suYeu || this.hp <= 0) return false;

    this.cancelAttackerString();
    this.chuoi = [];
    this.slash = null; this.tel = null; this.beo = false;
    this.faceP();

    const dir = this.dir();
    const gap = Math.abs(this.gap());
    // Chỉ dịch chuyển áp sát nếu chuỗi yêu cầu `warpIn` VÀ khoảng cách đang ở xa (> 115px)
    // Không warp liên tục sát mặt khiến người chơi không kịp trở tay!
    const needWarp = pattern.warpIn && gap > 115;

    this._atkString = {
        id: strId,
        pattern,
        phase: needWarp ? 'warp_in' : 'step',
        tick: 0,
        index: 0,
        dir,
        hitDone: new Set(),
        sheatheWait: pattern.sheathePause || 30
    };

    this.state = 'v_attacker_str';
    this.subTimer = 0;
    vgBossEnsureFx(this);
    floatingTexts.push(new FloatingText(this.x - 42, this.y - 38, pattern.label));
    return true;
};
// BOSS_PART_END s19.VergilBoss.prototype.startAttackerString.1

// Nguồn: index.html:114000 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.VergilBoss.prototype.cancelAttackerString.1 EDITABLE
VergilBoss.prototype.cancelAttackerString = function() {
    this._atkString = null;
    this._atkPose = null;
    this._atkMove = null;
    this.mirageWep = false;
    this.drawn = false;
    this.armR = 0; this.armL = 0;
    if (this._atkFx) {
        this._atkFx.slashTrail = [];
        this._atkFx.mirageTrail = [];
    }
};
// BOSS_PART_END s19.VergilBoss.prototype.cancelAttackerString.1

// Nguồn: index.html:114014 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.vgBossTriggerStepHit.1 EDITABLE
function vgBossTriggerStepHit(boss, st, m, hitIdx) {
    const fx = vgBossEnsureFx(boss);
    const cx = boss.cx(), cy = boss.cy(), dir = st.dir;

    // 1. Nếu là đòn ném đại kiếm xoay Mirage Edge Round Trip:
    if (m.spawnRoundTrip) {
        fx.roundSword = {
            x: cx + dir * 34, y: cy,
            tx: dino.x + dino.w / 2, ty: dino.y + dino.h / 2,
            t: 0, life: 95, hitCd: 0
        };
        if (SFX.bossSkill) SFX.bossSkill();
        return;
    }

    // 2. Nếu là Judgement Cut / Perfect Judgement Cut:
    if (m.isJCut) {
        const jx = dino.x + dino.w / 2 + (hitIdx > 0 ? (Math.random() - 0.5) * 90 : 0);
        const jy = dino.y + dino.h / 2 + (hitIdx > 0 ? (Math.random() - 0.5) * 36 : 0);
        // Thời gian báo đòn 24-28 frame để người chơi kịp lướt hoặc nhảy thoát khỏi quả cầu!
        boss.addCut(jx, jy, m.perfect ? 76 : 64, m.perfect ? 24 : 28, 1);
        boss.pushDop('cut', { x: jx, y: jy, r: 64 });
        if (SFX.tone) SFX.tone(m.perfect ? 1850 : 1500, 0.08, 'sine', 0.11, 520);
        return;
    }

    // 3. Nếu là Void Slash (Chém nứt không gian phía trước):
    if (m.slowBubble && hitIdx === 0) {
        boss._voidFx = { x: cx + dir * 66, y: cy - 4, t: 32, max: 32 };
        if (SFX.bossSkill) SFX.bossSkill();
    }

    // 4. Các đòn chém cận chiến Yamato & Mirage Edge:
    const isAround = m.pose === 'spinUp' || m.pose === 'rapid' || m.pose === 'mirage2';
    const reach = (m.pose === 'wideIai' || m.pose === 'voidArc' || m.pose === 'mStinger') ? 112 : (m.mirageMelee ? 100 : 92);
    const up = (m.launch || m.launchWithMe || m.pose === 'upperIai') ? 44 : 14;

    boss.doSlash(reach, up, 9);
    if (m.mirageMelee && boss.slash) boss.slash.mirage = true;

    const box = {
        x: isAround ? (cx - reach * 0.8) : (dir < 0 ? boss.x - reach + 8 : boss.x + boss.w - 8),
        y: boss.y - up,
        w: isAround ? reach * 1.6 : reach,
        h: boss.h + up + 12
    };

    if(boss.slash)boss.slash.attackerBox={x:box.x-boss.x,y:box.y-boss.y,w:box.w,h:box.h};
    if (checkAABB(dino, box)) {
        if(boss.slash)boss.slash.hit=true;
        const before=dino.hp;
        boss.hurtP(1);
        // Chỉ hất nhẹ người chơi ở nhát Upper Slash nếu người chơi không bật khiên
        if (dino.hp<before && (m.launch || m.launchWithMe) && !dino.isShielding() && dino.grounded) {
            dino.dy = -10.5;
            dino.grounded = false;
        }
        fx.sparks.push({
            x: dino.x + dino.w / 2, y: dino.y + dino.h / 2,
            ang: (Math.random() - 0.5) * 1.6, len: 38, t: 7, max: 7
        });
    }

    if (SFX.tone) {
        SFX.tone(m.mirageMelee ? 740 : (580 + (hitIdx % 3) * 90), 0.04, 'triangle', 0.09, 300);
    }
}
// BOSS_PART_END s19.vgBossTriggerStepHit.1

// Nguồn: index.html:114082 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.VergilBoss.prototype.runAttackerString.1 EDITABLE
VergilBoss.prototype.runAttackerString = function() {
    const st = this._atkString;
    if (!st) return;
    const fx = vgBossEnsureFx(this);
    const sp = this.spd();
    this.subTimer += sp;

    // 1. PHA DỊCH CHUYỂN ÁP SÁT ĐẦU CHUỖI (WARP IN — Có báo trước 14 frame cho người chơi chuẩn bị!)
    if (st.phase === 'warp_in') {
        st.tick++;
        if (st.tick === 2) {
            const side = (dino.x + dino.w / 2) < canvas.width / 2 ? 1 : -1;
            const targetX = dino.x + dino.w / 2 + side * 78 - this.w / 2;
            this.warpTo(targetX, this.baseY);
            this.warn(90, 16, 14);
        }
        if (st.tick >= 16) {
            this.tel = null;
            this.faceP();
            st.dir = this.dir();
            st.phase = 'step';
            st.tick = 0;
        }
        return;
    }

    // 2. PHA TRA KIẾM VÀO VỎ CUỐI CHUỖI (SHEATHE RECOVERY — Khoảng nghỉ quý giá cho người chơi!)
    if (st.phase === 'sheathe') {
        st.tick++;
        this.drawn = false;
        this.mirageWep = false;
        this._atkPose = null;
        if (st.tick === 2) {
            fx.sheatheSpark = 14;
            this.tapTrung = Math.min(330, (this.tapTrung || 0) + 22);
            if (SFX.tone) SFX.tone(1820, 0.05, 'sine', 0.08, 1400);
            // Nếu chuỗi có cờ `retreatAfter` -> Boss lùi nhẹ biến ảnh Trick Down ra xa nhường khoảng trống!
            if (st.pattern.retreatAfter && Math.abs(this.gap()) < 140) {
                this.dashV = -this.dir() * 14;
                this.ghost();
            }
        }
        if (st.tick >= st.sheatheWait) {
            this.cancelAttackerString();
            // Đặt cooldown trước khi được phép tung chuỗi cận chiến tiếp theo (xen kẽ đi bộ / bắn kiếm xa)
            this._nextMeleeStr = frames + (this.stage === 3 ? 45 : 70);
            this.toIdle(26);
        }
        return;
    }

    // 3. PHA THỰC THI TỪNG NHỊP TRONG CHUỖI COMBO
    const prevTick = st.tick;
    st.tick++;
    const moveId = st.pattern.moves[st.index];
    const m = vgBossGetMoveDef(moveId);
    this._atkMove = m;

    if (st.tick === 1) {
        // Nếu người chơi đã chạy thoát ra quá xa (> 310px) giữa chừng và đây là đòn cận chiến -> Dừng chuỗi chuyển sang tra kiếm luôn, KHÔNG lướt đuổi theo tới cùng!
        if (!m.isJCut && !m.spawnRoundTrip && Math.abs(this.gap()) > 310 && st.index > 0) {
            st.phase = 'sheathe';
            st.tick = 0;
            return;
        }
        this.faceP();
        st.dir = this.dir();
        st.hitDone.clear();
        this.mirageWep = !!m.mirageMelee;

        // Báo đòn (Telegraph) ngắn ở các nhịp khởi đầu hoặc nhịp kết lớn
        if (st.index === 0 || m.pose === 'wideIai' || m.pose === 'voidArc') {
            this.warn(96, 18, m.wind);
        }

        // Nhảy lên không cùng mục tiêu nếu là Upper Slash II hoặc Rising Star
        if (m.launchWithMe && this.grounded) {
            this.dy = -10.8;
            this.grounded = false;
        }
    }

    this.facingLeft = st.dir < 0;

    // Giữ độ cao vừa phải khi đang chém Aerial Rave trên không
    if ((m.id === 'air1' || m.id === 'air2') && !this.grounded) {
        this.dy = Math.min(this.dy, 0.35);
    }

    // Bước tiến (Micro-advance) vừa phải, không dí sát rạt vào người chơi
    if (m.advance && st.tick === m.wind + 1 && this.grounded) {
        const gap = Math.abs(this.gap());
        const stepSpeed = gap > 64 ? m.advance * 0.85 : m.advance * 0.25;
        this.dashV = st.dir * stepSpeed;
    }
    if ((m.id === 'rapid' || m.id === 'm_stinger') && st.tick >= m.wind && st.tick <= m.end) {
        this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x + st.dir * 5.8));
        if (st.tick % 3 === 0) this.ghost();
    }

    // Xử lý Helm Breaker / Eclipse Drop bổ từ trên không xuống đất
    if (m.slam) {
        if (st.tick === m.wind) this.dy = 18;
        if (this.grounded && st.tick >= m.wind && !st.hitDone.has('slam')) {
            st.hitDone.add('slam');
            vgBossTriggerStepHit(this, st, m, 0);
            shakeTimer = Math.max(shakeTimer, 18);
            visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 36));
            st.index++;
            st.tick = 0;
            if (st.index >= st.pattern.moves.length) {
                st.phase = 'sheathe';
            }
            return;
        }
    }
    // Đòn chém bão táp theo `count` (Combo C Flurry)
    else if (m.count) {
        const span = Math.max(1, m.end - m.wind);
        const k = Math.floor((st.tick - m.wind - 1) * m.count / span);
        const oldK = Math.floor((prevTick - m.wind - 1) * m.count / span);
        if (k >= 0 && k < m.count && k !== oldK) {
            vgBossTriggerStepHit(this, st, m, k);
        }
    }
    // Đòn đánh theo mảng `hits`
    else if (m.hits && m.hits.length) {
        const idx = m.hits.indexOf(st.tick);
        if (idx >= 0) {
            vgBossTriggerStepHit(this, st, m, idx);
        }
    }
    // Judgement Cut tầm xa
    else if (m.isJCut && st.tick === m.wind + 1) {
        vgBossTriggerStepHit(this, st, m, st.index);
    }

    // Cập nhật Pose thanh Yamato & Vệt Lụa Kiếm Khí
    const pose = vgBossComputePose(this, m, st.tick, st.dir);
    this._atkPose = pose;
    this.drawn = pose.drawn;
    this.armR = pose.drawn ? (pose.angle - 0.5) : 0.15;
    this.armL = pose.mirageBlade ? (pose.mAngle - 0.4) : -0.25;

    if (pose.drawn && !m.isJCut && st.tick >= m.wind && st.tick <= m.end) {
        for (let s = 1; s <= 2; s++) {
            const subPose = vgBossComputePose(this, m, st.tick - 1 + s / 2, st.dir);
            fx.slashTrail.push({ ...subPose, t: 7, max: 7 });
            if (m.mirageMelee) {
                fx.mirageTrail.push({ x: subPose.mx, y: subPose.my, tx: subPose.mtx, ty: subPose.mty, t: 7, max: 7 });
            }
        }
        if (fx.slashTrail.length > 18) fx.slashTrail.splice(0, fx.slashTrail.length - 18);
        if (fx.mirageTrail.length > 18) fx.mirageTrail.splice(0, fx.mirageTrail.length - 18);
    }

    if (m.sheatheAt && st.tick === m.sheatheAt) {
        fx.sheatheSpark = 12;
    }

    // Chuyển sang đòn tiếp theo tại frame `cancel`, hoặc sang pha `sheathe` ở cuối chuỗi
    const limit = (st.index < st.pattern.moves.length - 1) ? m.cancel : m.T;
    if (st.tick >= limit) {
        st.index++;
        st.tick = 0;
        if (st.index >= st.pattern.moves.length) {
            st.phase = 'sheathe';
        }
    }
};
// BOSS_PART_END s19.VergilBoss.prototype.runAttackerString.1

// Nguồn: index.html:114256 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.vgBossOrigPick.1 EDITABLE
const vgBossOrigPick = VergilBoss.prototype.pickSkill;
// BOSS_PART_END s19.vgBossOrigPick.1

// Nguồn: index.html:114257 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.VergilBoss.prototype.pickSkill.1 EDITABLE
VergilBoss.prototype.pickSkill = function() {
    if (this.phase !== 1 || this.suSt || this.suYeu || this.hp <= 0) {
        return vgBossOrigPick.call(this);
    }

    // Nếu vừa mới tung xong một chuỗi cận chiến (hoặc đã đánh 2 chuỗi liên tiếp),
    // Boss sẽ ưu tiên dùng kỹ năng tầm xa (Summoned Swords / Storm / Heavy Rain / Judgement Cut)
    // để người chơi có khoảng trống thở thay vì bị dí sát mặt liên tục!
    const gap = Math.abs(this.gap());
    const meleeLocked = frames < (this._nextMeleeStr || 0) || (this._meleeStreak || 0) >= 2;

    if (meleeLocked) {
        this._meleeStreak = 0;
        this.chuoi = [];
        const rangedPool = this.stage >= 2
            ? ['v_swords', 'v_storm', 'v_heavyrain', 'v_jcut', 'v_spiral']
            : ['v_swords', 'v_jcut', 'v_void'];
        const pickR = rangedPool[(this._rangedCursor || 0) % rangedPool.length];
        this._rangedCursor = (this._rangedCursor || 0) + 1;
        this.batChieu(pickR);
        return;
    }

    // Ở khoảng cách xa (> 250px): 50% tỉ lệ đứng từ xa cắt Triple Judgement Cut hoặc phóng Mirage Press, 50% mới áp sát
    let deck;
    if (gap > 250) {
        deck = ['triple_jcut', 'rapid_rising', 'mirage_press', 'ymt_combo_a'];
    } else if (!dino.grounded && dino.y + dino.h < 285) {
        deck = ['aerial_rave', 'void_jcut'];
    } else {
        deck = [
            'ymt_combo_a',
            'mirage_twin',
            'ymt_combo_c',
            'rapid_rising',
            'void_jcut',
            'aerial_rave',
            'mirage_press'
        ];
    }

    const strId = deck[(this._strCursor || 0) % deck.length];
    this._strCursor = (this._strCursor || 0) + 1;

    if (this.startAttackerString(strId)) {
        this._meleeStreak = (this._meleeStreak || 0) + 1;
        return;
    }
    return vgBossOrigPick.call(this);
};
// BOSS_PART_END s19.VergilBoss.prototype.pickSkill.1

// Nguồn: index.html:114308 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.vgBossOrigRun.1 EDITABLE
const vgBossOrigRun = VergilBoss.prototype.runSkill;
// BOSS_PART_END s19.vgBossOrigRun.1

// Nguồn: index.html:114309 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.VergilBoss.prototype.runSkill.1 EDITABLE
VergilBoss.prototype.runSkill = function() {
    if (this._atkString && this.state === 'v_attacker_str') {
        return this.runAttackerString();
    }
    return vgBossOrigRun.call(this);
};
// BOSS_PART_END s19.VergilBoss.prototype.runSkill.1

// Nguồn: index.html:114316 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.vgBossOrigUpdate.1 EDITABLE
const vgBossOrigUpdate = VergilBoss.prototype.update;
// BOSS_PART_END s19.vgBossOrigUpdate.1

// Nguồn: index.html:114317 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.VergilBoss.prototype.update.1 EDITABLE
VergilBoss.prototype.update = function(...args) {
    if (this._atkString && (this.phase !== 1 || this.hp <= 0 || this.suSt || this.state !== 'v_attacker_str')) {
        this.cancelAttackerString();
    }
    // Cập nhật hiệu ứng phụ (Vệt kiếm, Đại kiếm xoay Round Trip của Boss)
    if (this._atkFx) {
        const fx = this._atkFx;
        if (fx.sheatheSpark > 0) fx.sheatheSpark--;
        fx.slashTrail = fx.slashTrail.filter(st => --st.t > 0);
        fx.mirageTrail = fx.mirageTrail.filter(mt => --mt.t > 0);
        fx.sparks = fx.sparks.filter(sp => --sp.t > 0);

        if(fx.roundSword&&(this.phase!==1||this.hp<=0||this.suSt))fx.roundSword=null;
        if (fx.roundSword) {
            const rs = fx.roundSword;
            rs.t++; rs.life--;
            rs.tx = dino.x + dino.w / 2;
            rs.ty = dino.y + dino.h / 2;
            rs.x += (rs.tx - rs.x) * 0.12;
            rs.y += (rs.ty - rs.y) * 0.12;
            if (rs.hitCd > 0) rs.hitCd--;
            else if (checkAABB(dino, { x: rs.x - 36, y: rs.y - 36, w: 72, h: 72 })) {
                rs.hitCd = 22;
                this.hurtP(1);
            }
            if (rs.life <= 0 || this.phase !== 1 || this.hp <= 0) fx.roundSword = null;
        }
    }

    const res = vgBossOrigUpdate.apply(this, args);
    if(this._atkString&&this.state!=='v_attacker_str')this.cancelAttackerString();
    return res;
};
// BOSS_PART_END s19.VergilBoss.prototype.update.1

// Nguồn: index.html:114354 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.vgBossOrigDraw.1 EDITABLE
const vgBossOrigDraw = VergilBoss.prototype.draw;
// BOSS_PART_END s19.vgBossOrigDraw.1

// Nguồn: index.html:114355 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.VergilBoss.prototype.draw.1 EDITABLE
VergilBoss.prototype.draw = function() {
    // Tạm thời làm nhẹ các vùng tím (jce, dome, dim, cuts, _voidFx) trước khi gọi draw gốc
    // để không bao giờ che khuất tầm nhìn của người chơi!
    const savedCuts = this.cuts;
    const savedVoid = this._voidFx;
    const savedJce  = this.jce;
    const savedDome = this.dome;
    const savedDim  = this.dim;

    const posed=this.phase===1&&this.state==='v_attacker_str'&&this._atkPose;
    const savedDrawn=this.drawn,savedMirage=this.mirageWep,savedSlash=this.slash;
    this.cuts = [];
    this._voidFx = null;
    this.jce = null;
    this.dome = null;
    this.dim = null;

    try {
        if(posed){this.drawn=false;this.mirageWep=false;this.slash=null;}
        vgBossOrigDraw.call(this);
    } finally {
        this.cuts=savedCuts;this._voidFx=savedVoid;this.jce=savedJce;
        this.dome=savedDome;this.dim=savedDim;
        this.drawn=savedDrawn;this.mirageWep=savedMirage;
        this.slash=savedSlash;
    }

    const dt = this.stage === 3;
    ctx.save();

    // 1. Vẽ Vết Nứt Không Gian VOID SLASH (Trong suốt, thanh mảnh)
    if (this._voidFx) {
        const vf = this._voidFx, k = vf.t / vf.max;
        ctx.save();
        ctx.translate(vf.x, vf.y);
        ctx.globalAlpha = k * 0.48;
        ctx.fillStyle = 'rgba(0, 176, 255, 0.08)';
        ctx.beginPath(); ctx.ellipse(0, 0, 52, 36, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 1.8;
        ctx.setLineDash([6, 5]);
        ctx.beginPath(); ctx.ellipse(0, 0, 52, 36, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
    }

    // 2. Vẽ Quả Cầu JUDGEMENT CUT của Boss (Trong suốt, rõ ranh giới né đòn)
    for (const c of this.cuts) {
        ctx.save();
        if (c.t > 0) {
            const k = 1 - c.t / c.warn;
            ctx.globalAlpha = 0.28 + 0.42 * k;
            ctx.strokeStyle = dt ? '#B388FF' : '#40C4FF';
            ctx.lineWidth = 2.0;
            ctx.setLineDash([6, 6]); ctx.lineDashOffset = -frames;
            ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 0.55;
            ctx.beginPath(); ctx.arc(c.x, c.y, c.r * (0.2 + 0.8 * k), 0, Math.PI * 2); ctx.stroke();
        } else {
            const k = c.boom / 20;
            ctx.globalAlpha = k * 0.78;
            ctx.fillStyle = 'rgba(64, 196, 255, 0.07)';
            ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2.0 * k;
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI + frames * 0.02, R = c.r * (1.12 - 0.1 * k);
                ctx.beginPath();
                ctx.moveTo(c.x - Math.cos(a) * R, c.y - Math.sin(a) * R);
                ctx.lineTo(c.x + Math.cos(a) * R, c.y + Math.sin(a) * R);
                ctx.stroke();
            }
        }
        ctx.restore();
    }

    // 3. Vẽ Vùng JUDGEMENT CUT END / DOME / DIMENSION SLASH của Boss (Làm trong suốt 85% để nhìn rõ đường thoát!)
    if (this.jce) {
        const k = 1 - this.jce.t / this.jce.max;
        ctx.save();
        ctx.fillStyle = 'rgba(124, 77, 255, 0.08)';
        ctx.fillRect(this.jce.x - 140, 90, 280, 240);
        ctx.globalAlpha = 0.75;
        ctx.strokeStyle = (frames % 8 < 4) ? '#FFFFFF' : '#80D8FF';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(this.jce.x - 140, 90, 280, 240);
        ctx.fillStyle = '#E1F5FE'; ctx.font = 'bold 12px Consolas, monospace'; ctx.textAlign = 'center';
        ctx.fillText('JCE · ' + Math.ceil(this.jce.t / 60) + 's', this.jce.x, 112);
        ctx.restore();
    }
    if (this.dome) {
        const k = 1 - this.dome.t / this.dome.max;
        ctx.save();
        ctx.fillStyle = 'rgba(124, 77, 255, 0.08)';
        ctx.beginPath(); ctx.arc(this.dome.x, 320, this.dome.r, Math.PI, 0); ctx.fill();
        ctx.globalAlpha = 0.75;
        ctx.strokeStyle = (frames % 8 < 4) ? '#FFFFFF' : '#80D8FF';
        ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.arc(this.dome.x, 320, this.dome.r, Math.PI, 0); ctx.stroke();
        ctx.restore();
    }
    if (this.dim && !this.dim.go) {
        ctx.save();
        ctx.fillStyle = 'rgba(124, 77, 255, 0.09)';
        ctx.fillRect(0, this.dim.y - 34, canvas.width, 68);
        ctx.strokeStyle = '#80D8FF'; ctx.lineWidth = 2.0;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        ctx.moveTo(0, this.dim.y - 34); ctx.lineTo(canvas.width, this.dim.y - 34);
        ctx.moveTo(0, this.dim.y + 34); ctx.lineTo(canvas.width, this.dim.y + 34);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
    }

    // 4. Vẽ Dải Lụa Kiếm Khí Yamato, Mirage Edge & Ngôi Sao Tra Kiếm của Boss
    const fx = this._atkFx;
    if (fx) {
        for (let i = 1; i < fx.slashTrail.length; i++) {
            const u = fx.slashTrail[i - 1], w = fx.slashTrail[i];
            const alpha = (w.t / w.max) * 0.36;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = dt ? '#7C4DFF' : '#00B0FF';
            ctx.beginPath();
            ctx.moveTo(u.x + (u.tx - u.x) * 0.45, u.y + (u.ty - u.y) * 0.45);
            ctx.lineTo(u.tx, u.ty); ctx.lineTo(w.tx, w.ty);
            ctx.lineTo(w.x + (w.tx - w.x) * 0.45, w.y + (w.ty - w.y) * 0.45);
            ctx.closePath(); ctx.fill();

            ctx.globalAlpha = alpha * 1.5;
            ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2.0;
            ctx.beginPath(); ctx.moveTo(u.tx, u.ty); ctx.lineTo(w.tx, w.ty); ctx.stroke();
        }
        for (let i = 1; i < fx.mirageTrail.length; i++) {
            const u = fx.mirageTrail[i - 1], w = fx.mirageTrail[i];
            const alpha = (w.t / w.max) * 0.34;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#00E5FF';
            ctx.beginPath();
            ctx.moveTo(u.x + (u.tx - u.x) * 0.45, u.y + (u.ty - u.y) * 0.45);
            ctx.lineTo(u.tx, u.ty); ctx.lineTo(w.tx, w.ty);
            ctx.lineTo(w.x + (w.tx - w.x) * 0.45, w.y + (w.ty - w.y) * 0.45);
            ctx.closePath(); ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Đại kiếm xoay Round Trip của Boss
        if (fx.roundSword) {
            const rs = fx.roundSword;
            ctx.save();
            ctx.translate(rs.x, rs.y);
            ctx.globalAlpha = 0.55;
            ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.arc(0, 0, 38, rs.t * 0.45, rs.t * 0.45 + 4.2); ctx.stroke();
            if (typeof vgDrawMirageEdgeBlade === 'function') {
                vgDrawMirageEdgeBlade(0, 0, rs.t * 0.55, 58, 1);
            }
            ctx.restore();
        }

        // Ngôi sao 4 cánh lóe sáng ở hông trái khi Boss Vergil tra kiếm vào vỏ (Báo hiệu cho người chơi đây là lúc phản công!)
        if (fx.sheatheSpark > 0) {
            const sx = this.cx() - this.dir() * 10, sy = this.y + 24;
            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(frames * 0.25);
            ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 14;
            ctx.fillStyle = '#00E5FF';
            for (let k = 0; k < 2; k++) {
                ctx.rotate(Math.PI / 2);
                ctx.beginPath();
                ctx.moveTo(-15, 0); ctx.lineTo(0, -3);
                ctx.lineTo(15, 0);  ctx.lineTo(0, 3);
                ctx.closePath(); ctx.fill();
            }
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath(); ctx.arc(0, 0, 3.5, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        }
    }


    if(posed){
        const v=this._atkPose;
        if(v.mirageBlade&&typeof vgDrawMirageEdgeBlade==='function'){
            ctx.save();ctx.translate(v.mx,v.my);ctx.scale(v.dir,1);
            vgDrawMirageEdgeBlade(0,0,v.mAngle,v.len*.94,v.flat);ctx.restore();
        }
        if(v.drawn&&typeof vgDrawKatana==='function'){
            ctx.save();ctx.translate(v.x,v.y);ctx.scale(v.dir,1);
            vgDrawKatana(0,0,v.angle,v.len,v.flat,dt);ctx.restore();
        }
    }
    ctx.restore();
};
// BOSS_PART_END s19.VergilBoss.prototype.draw.1

// Nguồn: index.html:114550 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.vgBossSlashRectBase.1 EDITABLE
const vgBossSlashRectBase=VergilBoss.prototype.slashRect;
// BOSS_PART_END s19.vgBossSlashRectBase.1

// Nguồn: index.html:114551 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.VergilBoss.prototype.slashRect.1 EDITABLE
VergilBoss.prototype.slashRect=function(){
    const r=this.slash?.attackerBox;
    return r?{x:this.x+r.x,y:this.y+r.y,w:r.w,h:r.h}:vgBossSlashRectBase.call(this);
};
// BOSS_PART_END s19.VergilBoss.prototype.slashRect.1

// Nguồn: index.html:114555 · Dùng bởi: VergilBoss
// BOSS_PART_BEGIN s19.VergilBoss.prototype.syncAttackerDoppelganger.1 EDITABLE
VergilBoss.prototype.syncAttackerDoppelganger=function(){
    if(!this.dop||this.phase!==1)return;
    const dir=this.dir();
    this.dop.x=Math.max(16,Math.min(canvas.width-this.w-16,this.x-dir*84));
    this.dop.y=this.y-12;this.dop.left=this.facingLeft;
};
// BOSS_PART_END s19.VergilBoss.prototype.syncAttackerDoppelganger.1
