// BOSS_FILE: DanteBoss
// BOSS_SNAPSHOT: 3cf4652cd737d36361a15b25712b9a3ff21a9a13bbe8337913bcf233f06c6a1d
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, Array, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, Error, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LT, LavaDino, LavaSerpentBoss, MINION_HP, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, aaBanKem, aaHeSo, aaUp, bossProjectiles, camX, camY, canvas, checkAABB, chongKhong, ctx, danteSwordMove, dashVx, dino, dkNenY, dojoMode, dswBladeTouches, floatingTexts, frames, hitstopTimer, mapTheme, minionBox, parry, pickFromBag, platforms, projectiles, sgSegmentBox, shakeTimer, troiSinh, troiVy, veCanhKhoan, visualEffects, wildernessOn, worldL, worldR
// Nguồn: index.html:6917 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DanteBoss.1 EDITABLE
class DanteBoss {
            constructor(level){
                this.name = "DANTE"; this.hp = 134; this.maxHp = 134;
                this.w = DT_W; this.h = DT_H; this.baseY = 320 - this.h;
                this.x = canvas.width - 200; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.actionTimer = 50; this.facingLeft = true;
                this.retState = 'idle'; this.lastSkill = ''; this.atkBag = []; this.invulnAll = false;
                this.burnTimer = 0; this.lastMeleeHit = -1; this.phase = 1; this._bag = null;
                this.dtStage = 1; this.chain = 0; this.chuoi = []; this.styleFx = 0; this.phantoms = []; this.tauntCd = 240; this.tauntHp = 0; this.jabs = 0;
                this.arms = 0; this.cycle = []; this.switchT = DT_SWITCH; this.hpAtSwitch = this.hp;
                this.armR = 0; this.armL = 0; this.drawn = false; this.cerb = 0;
                this.slash = null; this.tel = null; this.combo = 0; this.morph = 0;
                this.dashV = 0; this.ghosts = []; this.walk = 0;
                this.rg = 0; this.rgCd = 0; this.rgCharge = 0; this.rgDiem = 100;    // ROYAL GUARD
                this.bike = null; this.hat = null; this.spikes = []; this.orbs = [];
                this.swords = []; this.fly = 0; this.hover = 0; this.wing = 0; this.beam = null;
                this._hb = false; this._dv = false; this._qt = 0; this._qy = 0;
                // @@HE-DANTE-DMC — tu lo AI combo, STYLE RANK, hit-confirm
                this.aiRieng = true; this.styleP = 0; this.trickCd = 90; this.trungLuc = -999; this.trungMove = '';
                this.noiThem = 0; this.breakCd = 120; this.dmgLog = []; this._hpTruoc = this.hp; this.neT = 0; this.gunT = 0;
                // Hieu ung bo sung cho chieu moi (Real Impact pillar, Revolver spin, Demolition)
                this._riPillar = 0; this._revSpin = 0; this._demoZones = [];
            }
            A(){ return DT_ARMS[this.arms]; }
            spd(){ if (this.suYeu > 0) return 0.5;
                   let g = this.phase === 2 ? 1.2 : (this.dtStage >= 2 ? 1.07 : 0.95);
                   return g * (1 + 0.035 * this.hang()); }
            enterDT(){
                this.dtStage = 2; this.state = 'dt_wake'; this.subTimer = 0;
                this.name = "DANTE — DEVIL TRIGGER";
                this.invulnAll = true; this.slash = null; this.rg = 0; this.bike = null; this.tel = null;
                this.switchT = DT_SWITCH; this.hpAtSwitch = this.hp; this._bag = null;
                shakeTimer = Math.max(shakeTimer, 22);
                floatingTexts.push(new FloatingText(this.x - 44, this.y - 40, "DEVIL TRIGGER!"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(150, 0.5, 'sawtooth', 0.30, 60);
            }

            // ===== STYLE SWITCH =====
            toIdle(t){
                this.dmcNoi(this.state);      // @@HE-DANTE-DMC: HIT-CONFIRM
                if (this.chuoi && this.chuoi.length && this.hp > 0 && this.state !== 'morphing'){
                    this.slash = null; this.tel = null;
                    this.state = 'idle'; this.subTimer = 0;
                    this.actionTimer = Math.max(4, Math.round(7 / this.spd()));
                    return;
                }
                this.noiThem = 0;
                t *= 1.2;
                if (this.dtStage >= 2 && this.phase === 1) t *= 0.72;
                this.state = 'idle'; this.subTimer = 0; this.actionTimer = Math.round(t / this.spd());
                this.drawn = false; this.armR = 0; this.armL = 0;
            }
            summonSwords(n){
                for (let k = 0; k < n; k++){
                    let hx = this.cx() + (k - (n-1)/2) * 26, hy = this.y - 20 - (k % 2) * 12;
                    this.swords.push({ x: hx, y: hy, hx: hx, hy: hy, k: k, ang: 0, t: 0,
                                       wait: 30 + k * 9, fired: false, dead: false, life: 340 });
                }
            }
            minionTargets(){
                return this.swords.filter(sw => !sw.dead && (sw.hp === undefined || sw.hp > 0))
                                  .map(sw => minionBox(sw, 26, 26, MINION_HP, true, true));
            }
            blink(nx, ny){
                for (let k = 0; k < 3; k++) this.ghost();
                this.x = Math.max(8, Math.min(canvas.width - this.w - 8, nx));
                this.y = Math.min(this.baseY, ny === undefined ? this.baseY : ny);
                this.dy = 0; this.dashV = 0; this.faceP();
                visualEffects.push(new Effect(this.cx(), this.cy(), 'parry', false));
                if (SFX.tone) SFX.tone(1350, 0.06, 'sine', 0.09, 420);
            }
            addPhantom(px, py, huong, cho, ox, oy){
                this.phantoms.push({ x: px, y: py, dir: huong, t: cho, warn: cho, hit: false,
                                     ox: ox || 0, oy: oy || 0 });
            }
            tickPhantoms(){
                if (!this.phantoms) return;
                for (let i = this.phantoms.length - 1; i >= 0; i--){
                    let ph = this.phantoms[i];
                    if (ph.t > ph.warn * 0.45){
                        let tx = dino.x + dino.w/2 + ph.ox, ty = dino.y + dino.h/2 + ph.oy;
                        ph.x += (tx - ph.x) * 0.22; ph.y += (ty - ph.y) * 0.22;
                    }
                    ph.t -= this.spd();
                    if (ph.t <= 0){
                        if (!ph.hit){
                            ph.hit = true;
                            let r = { x: ph.dir < 0 ? ph.x - 96 : ph.x, y: ph.y - 34, w: 96, h: 84 };
                            if (checkAABB(dino, r)) this.hurtP(1);
                            visualEffects.push(new Effect(ph.x + ph.dir*40, ph.y + 8, 'z_horz', ph.dir < 0, 78));
                            if (SFX.tone) SFX.tone(900, 0.06, 'square', 0.10, 500);
                        }
                        if (ph.t < -10) this.phantoms.splice(i, 1);
                    }
                }
            }
            drawPhantoms(){
                if (!this.phantoms) return;
                for (let ph of this.phantoms){
                    if (ph.t <= 0) continue;
                    let k = 1 - ph.t / ph.warn;
                    ctx.save();
                    ctx.globalAlpha = 0.20 + 0.45 * k;
                    ctx.strokeStyle = "#E040FB"; ctx.lineWidth = 2;
                    ctx.setLineDash([5, 4]);
                    ctx.strokeRect(ph.dir < 0 ? ph.x - 96 : ph.x, ph.y - 34, 96, 84);
                    ctx.setLineDash([]);
                    ctx.globalAlpha = 0.15 + 0.40 * k;
                    ctx.fillStyle = "#CE93D8";
                    ctx.save();
                    ctx.translate(ph.x + ph.dir * 46, ph.y + 8);
                    ctx.rotate(ph.dir * (-0.9 + k * 1.5));
                    ctx.fillRect(-3, -40, 6, 74);
                    ctx.restore();
                    ctx.restore();
                }
            }
            ghost(){ if (this.ghosts.length >= 5) this.ghosts.shift();
                     this.ghosts.push({ x: this.x, y: this.y, left: this.facingLeft, drawn: this.drawn, armR: this.armR, arms: this.arms, t: 14 }); }
            gunX(){ return this.dir() < 0 ? this.x - 4 : this.x + this.w + 4; }
            gunY(){ return this.y + 22; }
            shoot(vx, vy, w, h, col, dmg){
                let bp = new BossProjectile(this.gunX(), this.gunY(), vx, vy, false, dmg || 1);
                bp.w = w; bp.h = h; bp.color = col;
                if ((this.state || '').charAt(0) === 'g') bp.frail = true;
                bossProjectiles.push(bp);
                return bp;
            }
            physics(){
                if (this.fly > 0){ this.fly--; this.y += (this.hover - this.y) * 0.09; this.dy = 0; this.grounded = false; }
                else {
                    this.dy += 0.64; this.y += this.dy;
                    if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; } else this.grounded = false;
                }
                this.x += this.dashV; this.dashV *= 0.87;
                if (Math.abs(this.dashV) < 0.4) this.dashV = 0;
                this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
            }
            warn(reach, up, t){ this.tel = { dir: this.dir(), reach: reach, up: up, t: t, max: t }; }
            doSlash(reach, up, life, dmg){
                { let _k = aaHeSo(this); reach *= _k; up = aaUp(this, up); }   // @@HE-CHONGKHONG
                this.slash = { t: life, dir: this.dir(), reach: reach, up: up, hit: false, dmg: dmg || 1 };
                this.drawn = true;
            }
            slashRect(){
                let a = this.slash; if (!a) return { x:0,y:0,w:0,h:0 };
                return a.dir < 0 ? { x: this.x - a.reach, y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 }
                                 : { x: this.x + this.w, y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 };
            }
            tauntWords(){
                const W = ["Nào, tới đi!", "Chán quá...", "Chỉ có thế thôi à?",
                           "Cho cậu một nhịp đấy.", "Nhảy đi chứ!", "Xem này.", "Jackpot!"];
                return W[Math.floor(Math.random() * W.length)];
            }
            nextArm(){
                if (!this.cycle.length){
                    this.cycle = [0,0,1,2,3,4,5];
                    for (let i = this.cycle.length-1; i > 0; i--){ let j = Math.floor(Math.random()*(i+1)); let t=this.cycle[i]; this.cycle[i]=this.cycle[j]; this.cycle[j]=t; }
                    if (this.cycle[0] === this.arms){ let t=this.cycle[0]; this.cycle[0]=this.cycle[1]; this.cycle[1]=t; }
                }
                return this.cycle.shift();
            }
            // ---- ROYAL GUARD ----
            tickRoyal(){
                if (this.rgCd > 0) this.rgCd--;
                if (this.rg <= 0){ this.rgDiem = Math.min(100, this.rgDiem + 0.45); return; }
                this.rgDiem -= 0.8;
                if (this.rgDiem <= 0){
                    this.rgDiem = 0; this.rg = 1;
                    floatingTexts.push(new FloatingText(this.x-26, this.y-30, 'VỠ THẾ!'));
                }
                this.rg--;
                let d = this.dir();
                let box = { x: d < 0 ? this.x - 52 : this.x + this.w - 4, y: this.y - 16, w: 56, h: this.h + 30 };
                for (let i = projectiles.length - 1; i >= 0; i--){
                    let pr = projectiles[i]; if (!pr || pr.owner !== 1) continue;
                    if (!checkAABB(pr, box)) continue;
                    if (typeof dashVx !== 'undefined' && Math.abs(dashVx) > 1) continue;
                    this.rgCharge = Math.min(10, this.rgCharge + 1);
                    this.rgDiem = Math.max(0, this.rgDiem - 5);
                    visualEffects.push(new Effect(pr.x, pr.y, 'parry', d < 0));
                    projectiles.splice(i, 1);
                }
            }
            royalRelease(){
                let R = 90 + this.rgCharge * 15;
                visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, R));
                floatingTexts.push(new FloatingText(this.x - 24, this.y - 34, "RELEASE!"));
                shakeTimer = Math.max(shakeTimer, 20 + this.rgCharge * 3);
                let dx = (dino.x + dino.w/2) - this.cx(), dy = (dino.y + dino.h/2) - this.cy();
                if (Math.sqrt(dx*dx + dy*dy) < R) this.hurtP(this.rgCharge >= 6 ? 2 : 1);
                this.rgCharge = 0;
                if (SFX.bossExplode) SFX.bossExplode();
            }
            // ---- GAI BANG King Cerberus ----
            tickSpikes(){
                for (let i = this.spikes.length - 1; i >= 0; i--){
                    let s = this.spikes[i]; s.t--;
                    if (s.t === 0){
                        if (checkAABB(dino, { x: s.x - 20, y: 320 - 74, w: 40, h: 78 })) this.hurtP(1);
                        visualEffects.push(new Effect(s.x, 300, 'explosion', true, 20));
                    }
                    if (s.t < -26) this.spikes.splice(i, 1);
                }
            }
            // ---- MU DR. FAUST va NGOC DO (bao gom ca sieu cau Red Hot Night) ----
            tickHat(){
                if (this.hat){
                    let h = this.hat; h.t++;
                    if (h.back){ let a = Math.atan2(this.cy() - h.y, this.cx() - h.x); h.x += Math.cos(a)*12; h.y += Math.sin(a)*12;
                                 if (Math.abs(h.x - this.cx()) < 24 && Math.abs(h.y - this.cy()) < 24) this.hat = null; }
                    else { h.x += h.vx; h.y += h.vy; h.vy += 0.12; if (h.t > 42) h.back = true; }
                    if (this.hat && checkAABB(dino, { x: h.x - 20, y: h.y - 12, w: 40, h: 24 })){ this.hurtP(1); this.hat.back = true; }
                    if (this.hat) this.hat.spin = (this.hat.spin || 0) + 0.4;
                }
                for (let i = this.orbs.length - 1; i >= 0; i--){
                    let o = this.orbs[i]; o.t--;
                    if (o.t > 0) continue;
                    if (!o.roi){ o.roi = true; o.y = ((typeof camY === 'number') ? camY : 0) - 30; }
                    let r = o.big ? 24 : 12;
                    o.y += o.big ? 9.5 : 13;
                    if (!o.hit && checkAABB(dino, { x: o.x - r, y: o.y - r, w: r*2, h: r*2 })){ o.hit = true; this.hurtP(1); }
                    if (o.y > 332){
                        if (o.big){
                            visualEffects.push(new Effect(o.x, 315, 'explosion', true, 48));
                            shakeTimer = Math.max(shakeTimer, 14);
                            if (!o.hit && checkAABB(dino, { x: o.x - 42, y: 268, w: 84, h: 54 })) this.hurtP(1);
                            if (SFX.bossExplode) SFX.bossExplode();
                        } else {
                            visualEffects.push(new Effect(o.x, 318, 'explosion', true, 16));
                        }
                        this.orbs.splice(i, 1);
                    }
                }
            }
            // ---- KIEM LINH HON (pha 2) ----
            tickSwords(){
                for (let i = this.swords.length - 1; i >= 0; i--){
                    let s = this.swords[i]; s.t++; s.life--;
                    if (!s.fired){
                        s.x = s.hx + Math.sin(frames*0.13 + s.k) * 4; s.y = s.hy;
                        if (s.t > s.wait){ s.fired = true;
                            let a = Math.atan2((dino.y + dino.h/2) - s.y, (dino.x + dino.w/2) - s.x);
                            s.vx = Math.cos(a)*12; s.vy = Math.sin(a)*12; s.ang = a; }
                    } else { s.x += s.vx; s.y += s.vy; }
                    let box = { x: s.x - 13, y: s.y - 13, w: 26, h: 26 };
                    for (let pi = projectiles.length - 1; pi >= 0; pi--){
                        let pr = projectiles[pi]; if (!pr || pr.owner !== 1) continue;
                        if (!checkAABB(pr, box)) continue;
                        s.dead = true; visualEffects.push(new Effect(s.x, s.y, 'explosion', true, 12));
                        if (!(pr.type === 2 || (pr.pierceCount||0) > 0)) projectiles.splice(pi, 1);
                        break;
                    }
                    if (!s.dead && checkAABB(dino, box)){ s.dead = true; this.hurtP(1); visualEffects.push(new Effect(s.x, s.y, 'explosion', true, 10)); }
                    if (s.dead || s.life <= 0 || s.x < -60 || s.x > canvas.width+60 || s.y > 380 || s.y < -80) this.swords.splice(i, 1);
                }
            }
            // ======================= PHA 2 — SIN DEVIL TRIGGER =======================
            startPhase2(){
                this.phase = 2; this.hp = 90; this.maxHp = 90; this.invulnAll = true;
                this.suW = this.w; this.suH = this.h; this.suTenGoc = "DANTE";   // de con TRO VE dang nguoi (@@HE-SDTULT)
                this.name = "DANTE — SIN DEVIL TRIGGER"; this.dtStage = 3;
                this.state = 'sdt_wake'; this.subTimer = 0; this._bag = null; this.atkBag = [];
                this.w = 66; this.h = 88; this.baseY = 320 - this.h; this.y = this.baseY; this.dy = 0; this.dashV = 0;
                this.slash = null; this.tel = null; this.bike = null; this.hat = null;
                this.spikes.length = 0; this.orbs.length = 0; this.swords.length = 0; this._demoZones = [];
                this.rg = 0; this.rgCharge = 0; this.chuoi = []; this.rgDiem = 100; bossProjectiles.length = 0;
                this.hover = this.baseY - 50; this.wing = 0;
                this.swordRefill = 200;
                floatingTexts.push(new FloatingText(this.cx() - 130, 130, "SIN DEVIL TRIGGER!"));
                shakeTimer = 90; if (SFX.bossEntry) SFX.bossEntry();
            }
            update(){
                if (this.state === 'entering'){ this.physics(); this.x -= 4; if (this.x < canvas.width - 220) this.toIdle(34); return; }
                // ---- CHANG 2: DEVIL TRIGGER o 55% mau cua thanh dau ----
                if (this.phase === 1 && this.dtStage === 1 && this.hp <= this.maxHp * 0.55) { this.enterDT(); return; }
                if (this.state === 'dt_wake'){
                    this.subTimer++; this.physics();
                    if (this.subTimer % 7 === 0) this.ghost();
                    if (this.subTimer % 9 === 0) visualEffects.push(new Effect(this.cx()+(Math.random()-0.5)*90, this.cy()+(Math.random()-0.5)*90, 'explosion', true, 22));
                    if (this.subTimer > 62){ this.invulnAll = false; this.toIdle(18); }
                    return;
                }
                for (let i = this.ghosts.length - 1; i >= 0; i--){ this.ghosts[i].t--; if (this.ghosts[i].t <= 0) this.ghosts.splice(i, 1); }
                if (this._riPillar > 0) this._riPillar--;
                if (this.tauntCd > 0) this.tauntCd--;
                if (this.dmcTick()) return;    // @@HE-DANTE-DMC
                this.tickPhantoms();
                if (this.tel){ this.tel.t--; if (this.tel.t <= 0) this.tel = null; }
                if (this.slash){ this.slash.t--; if (this.slash.t <= 0){ this.slash = null; this.drawn = false; } }
                this.tickRoyal(); this.tickSpikes(); this.tickHat(); this.tickSwords();
                if (this.phase === 2){ this.updateSDT(); return; }
                if (this.sdtUltXong) this.suTickPhu();
                // ---- DOI DEVIL ARM ----
                this.switchT--;
                if (this.state !== 'morphing' && (this.switchT <= 0 || this.hpAtSwitch - this.hp >= 24)){
                    this.state = 'morphing'; this.subTimer = 24; this.morph = 24;
                    this.rg = 0; this.bike = null; this.slash = null; this.tel = null;
                    return;
                }
                if (this.state === 'morphing'){
                    this.physics(); this.subTimer--; this.morph = this.subTimer;
                    if (this.subTimer <= 0){
                        this.arms = this.nextArm(); this.switchT = DT_SWITCH; this.hpAtSwitch = this.hp; this._bag = null;
                        floatingTexts.push(new FloatingText(this.x - 40, this.y - 34, this.A().n));
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 42));
                        if (SFX.bossSkill) SFX.bossSkill();
                        this.toIdle(16);
                    }
                    return;
                }
                this.physics();
                if (this.slash){
                    let r = this.slashRect();
                    if (!this.slash.hit && checkAABB(dino, r)){ this.slash.hit = true; this.hurtP(this.slash.dmg); }
                }
                // ---- CAVALIERE dang lao ----
                if (this.bike){
                    let b = this.bike; b.t++;
                    this.x += b.v; this.walk += Math.abs(b.v);
                    if (frames % 3 === 0) visualEffects.push(new Effect(this.cx() - Math.sign(b.v)*22, this.y + this.h - 6, 'explosion', true, 12));
                    if (!b.hit && checkAABB(dino, { x: this.x - 8, y: this.y, w: this.w + 16, h: this.h })){ b.hit = true; this.hurtP(1); }
                    if (this.x <= 10 || this.x >= canvas.width - this.w - 10){
                        b.lap--; b.hit = false; b.v = -b.v; this.facingLeft = b.v < 0;
                        if (b.lap <= 0) this.bike = null;
                    }
                }
                if (this.state === 'idle'){
                    this.faceP();
                    let g = this.gap(), ad = Math.abs(g), want = (this.arms === 4 || this.arms === 5) ? 150 : 80;
                    if (ad > want + 50){ this.x += Math.sign(g) * 3.4; this.walk += 3.4; }
                    else if (ad < want - 50){ this.x -= Math.sign(g) * 1.8; this.walk += 1.8; }
                    this.actionTimer--;
                    if (this.actionTimer <= 0) this.pickSkill();
                    return;
                }
                this.runSkill();
            }
            pickSkill(noiChuoi){
                if (!noiChuoi && this.chuoi && this.chuoi.length){
                    this.raChieu(this.chuoi.shift());
                    return;
                }
                if (this.tauntCd <= 0 && Math.random() < 0.16 && Math.abs(this.gap()) < 300){
                    this.tauntCd = 540; this.tauntHp = this.hp;
                    this.chuoi = []; this.raChieu('d_taunt'); return;
                }
                if (this.rgCd <= 0 && this.rgDiem >= 40 && Math.abs(this.gap()) < 210 && Math.random() < 0.14){
                    this.chuoi = []; this.raChieu('royal'); return;
                }
                if (!dino.grounded && (dino.y + dino.h) < 300 && Math.random() < 0.75){
                    let ck = DT_COMBO_KHONG[Math.floor(Math.random()*DT_COMBO_KHONG.length)].slice();
                    if (Math.abs(this.gap()) > 300) ck.unshift('d_bike'); else if (Math.abs(this.gap()) > 120) ck.unshift('d_dash');
                    this.chuoi = ck; this.raChieu(this.chuoi.shift()); return;
                }
                {
                    let kc = Math.abs(this.gap());
                    if (this.aiPha === undefined) this.aiPha = 'tiepcan';
                    let pha;
                    if (!dino.grounded && (dino.y + dino.h) < 300 && kc < 210) pha = 'khong';
                    else if (kc > 340) pha = 'xa';
                    else if (this.aiPha === 'can') pha = 'xa';
                    else if (this.aiPha === 'xa') pha = 'tiepcan';
                    else if (this.aiPha === 'tiepcan') pha = 'can';
                    else pha = (kc > 130) ? 'tiepcan' : 'can';
                    this.aiPha = pha;
                    if (pha === 'xa'){
                        this.chuoi = [DT_XA[Math.floor(Math.random()*DT_XA.length)]];
                        if (kc > 340) this.chuoi.push(DT_XA[Math.floor(Math.random()*DT_XA.length)]);
                        this.raChieu(this.chuoi.shift()); return;
                    }
                    if (pha === 'tiepcan'){
                        let cb = [DT_TIEPCAN[Math.floor(Math.random()*DT_TIEPCAN.length)]]
                                 .concat(DT_COMBO_GAN[Math.floor(Math.random()*DT_COMBO_GAN.length)]);
                        if (cb[1] !== 'd_comboA' && Math.random() < 0.35) cb.splice(1, 0, 'd_comboA');
                        this.chuoi = cb; this.raChieu(this.chuoi.shift()); return;
                    }
                }
                let xa = Math.abs(this.gap()) > 230;
                if (Math.random() < 0.16) xa = !xa;
                let bo = xa ? DT_COMBO_XA : DT_COMBO_GAN;
                let tp = pickFromBag(this, bo.map((_,k)=>k), xa ? 'CX' : 'CG');
                let cb = bo[tp].slice();
                let pNoi = this.phase === 2 ? 0.42 : (this.dtStage >= 2 ? 0.26 : 0.12);
                if (Math.random() < pNoi){
                    let bo2 = Math.random() < 0.5 ? DT_COMBO_GAN : DT_COMBO_XA;
                    cb = cb.concat(bo2[Math.floor(Math.random()*bo2.length)]);
                }
                if (Math.random() < (this.phase === 2 ? 0.34 : 0.22))
                    cb.unshift(DT_STANCE[Math.floor(Math.random()*DT_STANCE.length)]);
                let kc = Math.abs(this.gap());
                if (!xa && kc > 130){
                    if (kc > 320)      cb.unshift('d_bike');
                    else if (kc > 210) cb.unshift('d_dash');
                    else               cb.unshift(Math.random() < 0.5 ? 'd_stinger' : 'd_dash');
                }
                if (xa && Math.abs(this.gap()) < 150) cb.unshift('d_back');
                this.chuoi = cb;
                this.raChieu(this.chuoi.shift());
            }
            raChieu(c){
                let vk = DT_ARM_OF[c];
                if (vk !== undefined && vk !== this.arms && this.phase === 1){
                    this.arms = vk; this._bag = null; this.styleFx = 14;
                    this.switchT = DT_SWITCH; this.hpAtSwitch = this.hp;
                    floatingTexts.push(new FloatingText(this.x - 24, this.y - 26, this.A().n));
                    visualEffects.push(new Effect(this.cx(), this.cy(), 'parry', false));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900, 0.05, 'square', 0.10, 600);
                }
                if (c === 'd_jab') this.jabs = (this.dtStage >= 2 || this.phase === 2) ? 2 : 1;
                this.styleP = Math.min(720, this.styleP + 8);
                this.state = c; this.subTimer = 0; this.combo = 0; this.faceP();
                if (c === 'royal'){ this.rg = Math.min(62, Math.round(this.rgDiem*0.62)); this.rgCd = 330; this.rgCharge = 0; }
            }
            runSkill(){
                let d = this.dir(), st = this.state, sp = this.spd(); this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;
                if (DT_CAN.indexOf(st) >= 0){
                    let g = this.gap(), ad = Math.abs(g);
                    if (ad > 52) this.x += Math.sign(g) * Math.min(4.2, 1.2 + (ad - 52) / 26);
                    if (this.subTimer < 14) this.faceP();
                }
                if (this.dmcChieu(st, T)) return;    // @@HE-DANTE-DMC
                // ================= DEVIL SWORD DANTE =================
                if (st === 'd_stinger'){          // STINGER: buoc len roi DAM XUYEN
                    if (T(8)){ this.faceP(); this.warn(120, 8, 20); this.drawn = true; this.armR = -1.4; }
                    if (T(28)){ this.dashV = this.dir() * 26; this.doSlash(120, 8, 18); for (let k=0;k<4;k++) this.ghost();
                                if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.subTimer > 30 && this.subTimer < 50 && Math.floor(this.subTimer)%3===0) this.ghost();
                    if (this.subTimer > 62) this.toIdle(24);
                    return;
                }
                // [CHIEU MOI] DRIVE & OVERDRIVE: 3 luong kiem khi do ruc bay xuyen san
                if (st === 'd_drive'){
                    if (T(4)){
                        this.faceP(); this.drawn = true; this.armR = -2.2;
                        floatingTexts.push(new FloatingText(this.x - 20, this.y - 34, "OVERDRIVE!"));
                    }
                    let shots = [18, 34, 52];
                    for (let k = 0; k < 3; k++) if (T(shots[k])){
                        this.faceP();
                        this.armR = (k % 2 === 0) ? 0.9 : -1.9;
                        this.doSlash(86, 16, 8, 1);
                        let vy = (k === 1) ? -1.2 : 0;
                        let bp = new BossProjectile(this.cx() + this.dir() * 22, this.y + 4, (13 + k * 2) * this.dir(), vy, false, 1);
                        bp.w = 28; bp.h = 56; bp.color = (k === 2) ? "#FF1744" : "#FF5252";
                        bp.crescent = true; bp.isPiercing = true;
                        bossProjectiles.push(bp);
                        if (k === 2) shakeTimer = Math.max(shakeTimer, 14);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 72) this.toIdle(24);
                    return;
                }
                if (st === 'd_dash'){             // TRICKSTER LIEN HOAN
                    if (T(1)){ this.faceP(); this.drawn = true; this.arms = 0; }
                    for (let k = 0; k < 3; k++) if (T(2 + k*11)){
                        let muon = (dino.x + dino.w/2) - this.dir()*(96 - k*20) - this.w/2;
                        this.trickTo = Math.max(8, Math.min(canvas.width-this.w-8, muon));
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900+k*160, 0.04, 'square', 0.09, 700);
                    }
                    if (this.trickTo != null){
                        let dx = this.trickTo - this.x;
                        if (Math.abs(dx) <= 40){ this.x = this.trickTo; this.trickTo = null;
                            visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 20)); }
                        else { this.x += Math.sign(dx) * 40; this.ghost(); this.faceP(); }
                    }
                    if (this.subTimer > 36){ this.trickTo = null; this.toIdle(4); }
                    return;
                }
                if (st === 'd_bike'){             // XE CAVALIERE tiep can
                    if (T(1)){ this.faceP(); this.arms = 2; this.drawn = true;
                        floatingTexts.push(new FloatingText(this.x-26, this.y-30, "CAVALIERE!"));
                        if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode(); }
                    if (this.subTimer > 8 && this.subTimer < 44){
                        let muon = (dino.x + dino.w/2) - this.dir()*72 - this.w/2;
                        let dx2 = muon - this.x;
                        this.x += Math.sign(dx2) * Math.min(Math.abs(dx2), 26);
                        this.walk += 26;
                        if (Math.floor(this.subTimer)%2===0)
                            visualEffects.push(new Effect(this.cx()-d*30, this.y+this.h-6, 'explosion', true, 15));
                        if (!this._bkHit && checkAABB(dino, {x:this.x-6,y:this.y,w:this.w+12,h:this.h})){
                            this._bkHit = true; this.hurtP(1); dino.dy = -7;
                        }
                        if (Math.abs(dx2) < 8) this.subTimer = Math.max(this.subTimer, 44);
                    }
                    if (this.subTimer > 46){ this._bkHit = false; this.faceP(); this.toIdle(5); }
                    return;
                }
                if (st === 'd_back'){             // LUI RA
                    if (T(1)){ this.faceP(); }
                    if (this.subTimer > 4 && this.subTimer < 26){
                        this.x -= this.dir()*11;
                        this.x = Math.max(8, Math.min(canvas.width-this.w-8, this.x));
                        if (Math.floor(this.subTimer)%3===0)
                            visualEffects.push(new Effect(this.cx()+d*16, this.cy(), 'explosion', true, 9));
                    }
                    if (this.subTimer > 28){ this.faceP(); this.toIdle(6); }
                    return;
                }
                if (st === 'd_shred'){            // SHREDDER: xoay kiem truoc mat, CAT DUOC DAN
                    if (T(1)){ this.faceP(); this.drawn = true; this.shred = 0; this._shredCd = 0;
                        floatingTexts.push(new FloatingText(this.x-22, this.y-30, "SHREDDER")); }
                    if (this.subTimer > 12 && this.subTimer < 84){
                        this.shred = (this.shred || 0) + 0.62;
                        let r = { x: d<0 ? this.x-72 : this.x+this.w-8, y: this.y+2, w: 80, h: this.h-6 };
                        for (let i = projectiles.length-1; i >= 0; i--){
                            let pr = projectiles[i]; if (!pr || pr.owner !== 1) continue;
                            if (!checkAABB(pr, r)) continue;
                            projectiles.splice(i,1);
                            visualEffects.push(new Effect(pr.x, pr.y, 'parry', d<0));
                            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1500, 0.03, 'square', 0.07, 900);
                        }
                        if (this._shredCd > 0) this._shredCd--;
                        else if (checkAABB(dino, r)){ this.hurtP(1); this._shredCd = 16; }
                        if (Math.floor(this.subTimer) % 6 === 0)
                            visualEffects.push(new Effect(this.cx()+d*46, this.y+this.h/2+(Math.random()-0.5)*30, 'explosion', true, 12));
                    }
                    if (this.subTimer > 96){ this.shred = 0; this.toIdle(30); }
                    return;
                }
                if (st === 'd_million'){          // MILLION STAB
                    if (T(10)){ this.faceP(); this.warn(126, 6, 16); this.stab = 0; }
                    if (this.subTimer > 26 && this.subTimer < 74){
                        this.drawn = true;
                        let ph = (this.subTimer - 26) % 5 / 5;
                        this.stab = 1 - Math.abs(ph*2 - 1);
                        this.armR = -0.06;
                        if (Math.floor(this.subTimer) % 5 === 0){
                            let r = { x: d<0 ? this.x-126 : this.x+this.w, y: this.y+18, w: 126, h: 22 };
                            if (checkAABB(dino, r)) this.hurtP(1);
                            this.stabFx = (this.stabFx || []);
                            let soMui = 3 + Math.floor(Math.random()*3);
                            for (let m = 0; m < soMui; m++){
                                let lech = (m - (soMui-1)/2);
                                this.stabFx.push({ t: 8, dir: d,
                                    y: this.y + 26 + lech*7 + (Math.random()-0.5)*4,
                                    goc: lech * 0.055,
                                    dai: 104 + Math.random()*30 - Math.abs(lech)*8 });
                            }
                            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1700, 0.02, 'square', 0.045, 1400);
                        }
                    }
                    if (T(78)){ this.dashV = this.dir()*10; this.doSlash(140, 14, 16); shakeTimer = 18; this.stab = 1; }
                    if (this.subTimer > 100){ this.stab = 0; this.toIdle(28); }
                    return;
                }
                if (st === 'd_helm'){             // HELM BREAKER
                    if (T(6)){ this.fly = 90; this.hover = this.baseY - 130; this.x += (this.gap()) * 0.5; this.drawn = true; this.armR = -2.5; }
                    if (T(44)){ this.fly = 0; this.dy = 21; this.faceP(); this.warn(60, 6, 12); }
                    if (this.subTimer > 44 && this.grounded && !this._hb){
                        this._hb = true; shakeTimer = 28;
                        this.doSlash(72, 8, 14);
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 44));
                        if (checkAABB(dino, { x: this.cx()-86, y: this.baseY-12, w: 172, h: this.h+16 })) this.hurtP(1);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 76){ this._hb = false; this.toIdle(28); }
                    return;
                }
                if (st === 'd_round'){            // ROUND TRIP
                    if (T(14)){
                        this.faceP();
                        let vy = Math.max(-4, Math.min(4, ((dino.y + dino.h/2) - (this.y + 34)) / 26));
                        let bp = this.shoot(9 * this.dir(), vy, 26, 66, "#FF5252", 1);
                        bp.crescent = true; bp.isPiercing = true;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (T(56)){
                        let by = Math.max(20, Math.min(300, dino.y + dino.h/2 - 33));
                        let bp = new BossProjectile(this.dir()<0 ? -30 : canvas.width+10, by, 12 * -this.dir(), 0, false, 1);
                        bp.w = 26; bp.h = 66; bp.color = "#FF5252"; bp.crescent = true; bp.isPiercing = true;
                        bossProjectiles.push(bp);
                    }
                    if (this.subTimer > 78) this.toIdle(28);
                    return;
                }
                if (st === 'd_jab'){
                    if (T(6)){ this.faceP(); this.warn(72, 6, 12); this.drawn = true; this.armR = -1.3; }
                    if (T(18)){ this.dashV = this.dir() * 15; this.doSlash(76, 6, 9, 1); this.ghost();
                                if (SFX.tone) SFX.tone(700, 0.05, 'square', 0.12, 900); }
                    if (this.subTimer > 30){
                        if ((this.jabs || 0) > 0){ this.jabs--; this.subTimer = 0; this.faceP(); return; }
                        this.toIdle(16);
                    }
                    return;
                }
                if (st === 'd_trick'){
                    let moc = [10, 42, 74];
                    for (let k = 0; k < 3; k++) if (T(moc[k])){
                        this.faceP();
                        let s2 = (k % 2 === 0) ? -1 : 1, xa = 92 - k * 14;
                        this.trickTo = Math.max(8, Math.min(canvas.width - this.w - 8,
                                        dino.x + dino.w/2 - this.w/2 + s2 * xa));
                        this.warn(84, 16, 12);
                    }
                    if (this.trickTo != null){
                        let dx = this.trickTo - this.x;
                        if (Math.abs(dx) <= 34){ this.x = this.trickTo; this.trickTo = null; }
                        else { this.x += Math.sign(dx) * 34; this.ghost(); this.faceP(); }
                    }
                    for (let k = 0; k < 3; k++) if (T(moc[k] + 20)){
                        this.doSlash(88, 16, 10, 1);
                        if (SFX.tone) SFX.tone(820 + k*90, 0.05, 'square', 0.12, 700);
                    }
                    if (this.subTimer > 122){ this.trickTo = null; this.toIdle(24); }
                    return;
                }
                if (st === 'd_launch'){
                    if (T(8)){  this.faceP(); this.warn(84, 12, 12); this.drawn = true; }
                    if (T(20)){ this.doSlash(88, 12, 9, 1); this.dashV = this.dir() * 9; }
                    if (T(34)){ this.warn(84, 12, 10); }
                    if (T(46)){ this.doSlash(88, 14, 9, 1); this.dashV = this.dir() * 7; }
                    if (T(60)){ this.faceP(); this.warn(96, 76, 16); }
                    if (T(78)){
                        this.doSlash(96, 76, 12, 1);
                        floatingTexts.push(new FloatingText(this.x - 20, this.y - 34, "HIGH TIME!"));
                        let r = this.slashRect();
                        if (checkAABB(dino, r) && dino.grounded){ dino.dy = -13; dino.grounded = false; dino.canDoubleJump = false; }
                        this.dy = -12; this.grounded = false;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (T(104)){ this.dy = 17; this.warn(104, 20, 12); }
                    if (T(122)){ this.doSlash(104, 20, 12, 1); shakeTimer = Math.max(shakeTimer, 12); }
                    if (this.subTimer > 146){ this.dy = 0; this.toIdle(30); }
                    return;
                }
                if (st === 'd_phantom'){
                    if (T(12)){
                        this.drawn = true; this.armL = -1.5;
                        floatingTexts.push(new FloatingText(this.x - 30, this.y - 32, "PHANTOM EDGE"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    let px = dino.x + dino.w/2, py = dino.y + dino.h/2;
                    if (T(22)) this.addPhantom(px - 60, py, 1, 34, -60, 0);
                    if (T(34)) this.addPhantom(px + 60, py, -1, 34, 60, 0);
                    if (T(46)) this.addPhantom(px, py - 34, this.dir(), 38, 0, -34);
                    if (this.dtStage >= 2 && T(58)) this.addPhantom(px, py + 26, -this.dir(), 34, 0, 26);
                    if (this.subTimer > 96) this.toIdle(26);
                    return;
                }
                if (st === 'd_taunt'){
                    if (T(10)){
                        this.drawn = false; this.armR = -2.0;
                        floatingTexts.push(new FloatingText(this.x - 22, this.y - 36, this.tauntWords()));
                        if (SFX.tone) SFX.tone(520, 0.12, 'triangle', 0.14, 760);
                    }
                    if (T(40)) this.armL = -1.2;
                    if (this.subTimer > 74){
                        if (this.hp >= this.tauntHp) this.chain = Math.min(3, (this.chain || 0) + 1);
                        this.toIdle(14);
                    }
                    return;
                }
                // ================= BALROG =================
                if (st === 'b_rush'){
                    if (T(10)){ this.faceP(); this.warn(76, 10, 18); this.drawn = true; }
                    if (T(28)){ this.dashV = this.dir()*20; for (let k=0;k<4;k++) this.ghost(); }
                    let hits = [30, 44, 58, 74];
                    for (let k = 0; k < 4; k++) if (T(hits[k])){
                        this.armR = (k%2 ? -0.5 : -1.2); this.faceP();
                        this.doSlash(k===3 ? 96 : 70, k===3 ? 22 : 10, 10);
                        for (let q=0;q<3;q++) visualEffects.push(new Effect(this.cx()+this.dir()*(40+q*16), this.y+22+(Math.random()-0.5)*20, 'explosion', true, 12));
                        if (k===3){ shakeTimer = 22; if (SFX.bossExplode) SFX.bossExplode(); }
                    }
                    if (this.subTimer > 92) this.toIdle(28);
                    return;
                }
                if (st === 'b_kick'){
                    if (T(12)){ this.faceP(); this.warn(70, 20, 22); }
                    if (T(34)){
                        this.armR = -0.9; this.drawn = true;
                        let bp = new BossProjectile(this.cx() + this.dir()*24, 320 - 96, 10 * this.dir(), 0, false, 1);
                        bp.w = 44; bp.h = 96; bp.color = "#FF6D00"; bp.fire = true; bp.isPiercing = true;
                        bossProjectiles.push(bp);
                        shakeTimer = 20; if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 66) this.toIdle(30);
                    return;
                }
                if (st === 'b_ignite'){
                    if (T(16)){ floatingTexts.push(new FloatingText(this.x-30, this.y-32, "BALROG: IGNITION")); this._ring = null; this._ringHit = -1; }
                    let rings = [30, 52, 74];
                    for (let k = 0; k < 3; k++){
                        let R = 78 + k*36;
                        if (T(rings[k])){
                            visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, R));
                            shakeTimer = Math.max(shakeTimer, 14);
                            this._ring = { R: R, t: 7, k: k };
                        }
                    }
                    if (this._ring && this._ring.t > 0){
                        this._ring.t--;
                        let dx = (dino.x+dino.w/2)-this.cx(), dy = (dino.y+dino.h/2)-this.cy();
                        let dist = Math.sqrt(dx*dx+dy*dy);
                        if (this._ringHit !== this._ring.k && dist < this._ring.R + 14 && dist > this._ring.R - 74){
                            this._ringHit = this._ring.k; this.hurtP(1);
                        }
                    }
                    if (this.subTimer > 96) this.toIdle(32);
                    return;
                }
                // [CHIEU MOI] REAL IMPACT: Thuong cau quyen huy diet + cot lua boc len troi
                if (st === 'b_realimpact'){
                    if (T(4)){
                        this.faceP(); this.drawn = true; this.armR = 1.25;
                        this.warn(94, 110, 22);
                        floatingTexts.push(new FloatingText(this.x - 28, this.y - 36, "REAL IMPACT!"));
                        if (SFX.tone) SFX.tone(240, 0.25, 'sawtooth', 0.22, 120);
                    }
                    if (this.subTimer > 4 && this.subTimer < 24 && Math.floor(this.subTimer) % 3 === 0){
                        visualEffects.push(new Effect(this.cx() + this.dir()*16, this.y + this.h - 8, 'explosion', true, 14));
                    }
                    if (T(26)){
                        this.faceP();
                        this.dashV = this.dir() * 14;
                        this.dy = -14.5; this.grounded = false;
                        this.armR = -2.6;
                        this.doSlash(94, 110, 16, 2);
                        this._riPillar = 20; this._riX = this.cx() + this.dir() * 44;
                        shakeTimer = Math.max(shakeTimer, 30);
                        for (let k = 0; k < 4; k++)
                            visualEffects.push(new Effect(this._riX, this.baseY + 20 - k * 34, 'explosion', true, 32 - k * 4));
                        let r = this.slashRect();
                        if (checkAABB(dino, r) && !dino.isShielding()){ dino.dy = -15; dino.grounded = false; }
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 64) this.toIdle(28);
                    return;
                }
                // ================= CAVALIERE =================
                if (st === 'c_charge'){
                    if (T(10)){ this.faceP(); this.drawn = true; floatingTexts.push(new FloatingText(this.x-26, this.y-32, "CAVALIERE!")); }
                    if (this.subTimer > 10 && this.subTimer < 40 && Math.floor(this.subTimer)%4===0)
                        visualEffects.push(new Effect(this.cx()-this.dir()*20, this.y+this.h-8, 'explosion', true, 10));
                    if (T(40)){ this.bike = { v: this.dir()*15, lap: 2, hit: false, t: 0 }; shakeTimer = 24; if (SFX.bossExplode) SFX.bossExplode(); }
                    if (this.subTimer > 40 && !this.bike) this.toIdle(34);
                    if (this.subTimer > 210) { this.bike = null; this.toIdle(34); }
                    return;
                }
                if (st === 'c_wheel'){
                    if (T(12)){ this.faceP(); this.warn(96, 30, 20); this.drawn = true; this._wheelCd = 0; }
                    if (this.subTimer > 32 && this.subTimer < 92){
                        this.x += this.dir() * 3.1;
                        let r = { x: d<0 ? this.x-96 : this.x+this.w, y: this.y-20, w: 96, h: this.h+26 };
                        if (this._wheelCd > 0) this._wheelCd--;
                        else if (checkAABB(dino, r)){ this.hurtP(1); this._wheelCd = 24; }
                        if (Math.floor(this.subTimer) % 8 === 0)
                            visualEffects.push(new Effect(this.cx()+this.dir()*58, this.y+26, 'explosion', true, 16));
                    }
                    if (this.subTimer > 100) this.toIdle(30);
                    return;
                }
                // ================= KING CERBERUS =================
                if (st === 'k_ice'){
                    if (T(10)){ this.cerb = 2; this.drawn = true; this.armR = -1.1; }
                    if (T(26)){
                        let hole = 1 + Math.floor(Math.random()*4);
                        for (let k = 0; k < 6; k++){ if (k === hole) continue;
                            this.spikes.push({ x: 80 + k * ((canvas.width-160)/5), t: 34 + k*3 }); }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 90) this.toIdle(30);
                    return;
                }
                if (st === 'k_bolt'){
                    if (T(10)){ this.cerb = 1; this.drawn = true; }
                    if (this.subTimer > 24 && this.subTimer < 76){
                        this.armR = this.subTimer * 0.42;
                        if (Math.floor(this.subTimer) % 9 === 0){
                            for (let k = 0; k < 3; k++){
                                let a = Math.atan2((dino.y+dino.h/2)-this.gunY(), (dino.x+dino.w/2)-this.gunX()) + (k-1)*0.42;
                                let bp = this.shoot(Math.cos(a)*13, Math.sin(a)*13, 26, 34, "#FFEB3B", 1);
                                bp.sonic = true;
                            }
                        }
                    }
                    if (this.subTimer > 94) this.toIdle(30);
                    return;
                }
                if (st === 'k_fire'){
                    if (T(12)){ this.cerb = 0; this.drawn = true; this.faceP(); this.warn(100, 26, 24); }
                    if (T(36)){
                        this.armR = -1.7; this.doSlash(100, 26, 16);
                        for (let s = -1; s <= 1; s += 2){
                            let bp = new BossProjectile(this.cx() + s*26, 320 - 88, 9.5 * s, 0, false, 1);
                            bp.w = 40; bp.h = 88; bp.color = "#FF5722"; bp.fire = true; bp.isPiercing = true;
                            bossProjectiles.push(bp);
                        }
                        shakeTimer = 22; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 70) this.toIdle(30);
                    return;
                }
                // [CHIEU MOI] REVOLVER: Xoay con tam khuc thanh banh xe bang-dien lao ve phia truoc
                if (st === 'k_revolver'){
                    if (T(4)){
                        this.cerb = 2; this.drawn = true; this.faceP();
                        this.warn(84, 24, 14);
                        this._revCd = 0;
                        floatingTexts.push(new FloatingText(this.x - 24, this.y - 32, "REVOLVER!"));
                    }
                    if (T(18)){ this.dy = -9; this.grounded = false; this.dashV = this.dir() * 16; }
                    if (this.subTimer >= 18 && this.subTimer < 58){
                        this._revSpin = (this._revSpin || 0) + 0.7;
                        this.armR = this._revSpin;
                        this.x += this.dir() * 5.2;
                        let r = { x: this.cx() - 48, y: this.y - 12, w: 96, h: this.h + 20 };
                        if (this._revCd > 0) this._revCd--;
                        else if (checkAABB(dino, r)){ this.hurtP(1); this._revCd = 16; }
                        if (Math.floor(this.subTimer) % 5 === 0)
                            visualEffects.push(new Effect(this.cx() + this.dir()*30, this.cy(), 'parry', d < 0));
                    }
                    if (T(58)){
                        this._revSpin = 0;
                        this.spikes.push({ x: Math.max(40, Math.min(canvas.width - 40, this.cx() + this.dir() * 68)), t: 16 });
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 72){ this._revSpin = 0; this.toIdle(22); }
                    return;
                }
                // ================= EBONY & IVORY / COYOTE-A =================
                if (st === 'g_ei'){
                    if (T(8)){ this.drawn = true; this.armR = -1.55; }
                    if (this.subTimer > 14 && this.subTimer < 86 && Math.floor(this.subTimer) % 8 === 0){
                        this.faceP();
                        this.x -= this.dir() * 1.4;
                        let a = Math.atan2((dino.y+dino.h/2)-this.gunY(), (dino.x+dino.w/2)-this.gunX()) + (Math.random()-0.5)*0.10;
                        this.shoot(Math.cos(a)*15, Math.sin(a)*15, 14, 7, "#FFF176", 1);
                        if (SFX.tone) SFX.tone(880, 0.03, 'square', 0.06, 600);
                    }
                    if (this.subTimer > 100) this.toIdle(26);
                    return;
                }
                // [CHIEU MOI] TWOSOME TIME / HONEYCOMB FIRE: Đứng tấn xạ kích tốc độ siêu thanh
                if (st === 'g_twosome'){
                    if (T(6)){
                        this.drawn = true; this.faceP();
                        this.armR = -1.55; this.armL = -1.45;
                        floatingTexts.push(new FloatingText(this.x - 32, this.y - 32, "HONEYCOMB FIRE!"));
                    }
                    if (this.subTimer > 14 && this.subTimer < 66 && Math.floor(this.subTimer) % 4 === 0){
                        this.faceP();
                        let a = Math.atan2((dino.y+dino.h/2)-this.gunY(), (dino.x+dino.w/2)-this.gunX()) + (Math.random()-0.5)*0.16;
                        let col = (Math.floor(this.subTimer / 4) % 2 === 0) ? "#FFF176" : "#80D8FF";
                        this.shoot(Math.cos(a)*16.5, Math.sin(a)*16.5, 15, 6, col, 1);
                        visualEffects.push(new Effect(this.gunX(), this.gunY(), 'explosion', true, 8));
                        if (SFX.tone) SFX.tone(980, 0.02, 'square', 0.05, 720);
                    }
                    if (this.subTimer > 76) this.toIdle(22);
                    return;
                }
                if (st === 'g_coyote'){
                    if (T(14)){ this.drawn = true; this.armR = -1.4; this.faceP(); }
                    if (T(34) || T(64)){
                        let base = Math.atan2((dino.y+dino.h/2)-this.gunY(), (dino.x+dino.w/2)-this.gunX());
                        for (let k = -2; k <= 2; k++) this.shoot(Math.cos(base+k*0.13)*13, Math.sin(base+k*0.13)*13, 12, 12, "#FFAB40", 1);
                        this.dashV = -this.dir() * 6;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 88) this.toIdle(30);
                    return;
                }
                if (st === 'g_rain'){
                    if (T(6)){ this.fly = 130; this.hover = this.baseY - 120; this.drawn = true; }
                    if (this.subTimer > 26 && this.subTimer < 116 && Math.floor(this.subTimer) % 5 === 0){
                        this.armR = frames * 0.5;
                        let dx = (dino.x + dino.w/2) - this.cx(), dy = (dino.y + dino.h/2) - (this.y + this.h);
                        let a = Math.atan2(dy, dx) + (Math.random()-0.5)*0.42;
                        let bp = new BossProjectile(this.cx(), this.y + this.h, Math.cos(a)*11, Math.sin(a)*11, false, 1);
                        bp.w = 12; bp.h = 12; bp.color = "#FFF176"; bp.frail = true; bossProjectiles.push(bp);
                    }
                    if (this.subTimer > 120){ this.fly = 0; }
                    if (this.subTimer > 142) this.toIdle(30);
                    return;
                }
                // ================= DR. FAUST =================
                if (st === 'f_hat'){
                    if (T(16)){
                        this.drawn = true; this.faceP();
                        let a = Math.atan2((dino.y+dino.h/2)-this.cy(), (dino.x+dino.w/2)-this.cx());
                        this.hat = { x: this.cx(), y: this.cy(), vx: Math.cos(a)*11, vy: Math.sin(a)*8 - 1.5, t: 0, back: false, spin: 0 };
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 30 && !this.hat) this.toIdle(28);
                    if (this.subTimer > 150){ this.hat = null; this.toIdle(28); }
                    return;
                }
                if (st === 'f_orb'){
                    if (T(18)){
                        this.drawn = true; this.armL = -1.6;
                        let px = dino.x + dino.w/2;
                        for (let k = 0; k < 5; k++)
                            this.orbs.push({ x: Math.max(30, Math.min(canvas.width-30, px + (k-2)*34 + (Math.random()-0.5)*16)),
                                             y: -20, t: 22 + k*5, hit: false });
                        for (let k = 0; k < 3; k++)
                            this.orbs.push({ x: Math.max(30, Math.min(canvas.width-30, px + (k-1)*150)),
                                             y: -20, t: 48 + k*9, hit: false });
                        floatingTexts.push(new FloatingText(this.x-30, this.y-32, "DR. FAUST"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 110) this.toIdle(30);
                    return;
                }
                // [CHIEU MOI] RED HOT NIGHT: Triệu hồi 3 Siêu Cầu Red Orb khổng lồ phát nổ diện rộng
                if (st === 'f_redhot'){
                    if (T(10)){
                        this.drawn = true; this.armR = -2.3; this.armL = -2.1;
                        floatingTexts.push(new FloatingText(this.x - 36, this.y - 36, "RED HOT NIGHT!"));
                        let px = dino.x + dino.w / 2;
                        for (let k = 0; k < 3; k++){
                            let ox = Math.max(60, Math.min(canvas.width - 60, px + (k - 1) * 145));
                            this.orbs.push({ x: ox, y: -30, t: 32 + k * 14, hit: false, big: true });
                        }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 92) this.toIdle(28);
                    return;
                }
                // ================= ROYAL GUARD =================
                if (st === 'royal'){
                    let g = this.gap();
                    this.x += Math.sign(g) * 1.6; this.walk += 1.6;
                    this.armL = -1.1; this.armR = -0.5;
                    if (this.rg <= 0){
                        if (this.rgCharge > 0) this.royalRelease();
                        this.toIdle(26);
                    }
                    return;
                }
                this.toIdle(28);
            }
            // ======================= PHA 2: SIN DEVIL TRIGGER =======================
            updateSDT(){
                this.suTickPhu();
                if (this.sdtUltTick()) return;      // @@HE-SDTULT
                this.tickRoyal();
                if (this.state === 'sd_drill' || (this._sdtDrill && this.state === 'recovery')) { this.runSinDrill(); return; }
                this.wing += 0.07;
                if (this.state === 'sdt_wake'){
                    this.subTimer++;
                    this.y += ((this.baseY - 30) - this.y) * 0.06; this.dy = 0;
                    if (this.subTimer % 9 === 0) this.ghost();
                    if (this.subTimer % 8 === 0) visualEffects.push(new Effect(this.cx()+(Math.random()-0.5)*100, this.cy()+(Math.random()-0.5)*100, 'explosion', true, 24));
                    if (this.subTimer > 96){ this.invulnAll = false; this.toIdle(24); }
                    return;
                }
                this.physics();
                if (this.slash){
                    let r = this.slashRect();
                    if (!this.slash.hit && checkAABB(dino, r)){ this.slash.hit = true; this.hurtP(this.slash.dmg); }
                }
                if (this.beam){
                    let b = this.beam; b.t--;
                    if (b.t <= 0){
                        b.a += b.sw;
                        if (Math.abs(b.a - b.a0) > b.arc){ this.beam = null; }
                        else {
                            let ex = this.cx() + Math.cos(b.a)*900, ey = this.cy() + Math.sin(b.a)*900;
                            let px = dino.x+dino.w/2, py = dino.y+dino.h/2;
                            let vx = ex-this.cx(), vy = ey-this.cy(), L = Math.sqrt(vx*vx+vy*vy);
                            let t2 = Math.max(0, ((px-this.cx())*vx + (py-this.cy())*vy) / (L*L));
                            let qx = this.cx()+vx*t2, qy = this.cy()+vy*t2;
                            if (Math.sqrt((px-qx)*(px-qx)+(py-qy)*(py-qy)) < 26 && frames % 12 === 0) this.hurtP(1);
                        }
                    }
                }
                if (this.state === 'idle'){
                    this.faceP();
                    let g = this.gap();
                    if (Math.abs(g) > 96) this.x += Math.sign(g) * 4.6;
                    if (frames % 6 === 0) this.ghost();
                    this.actionTimer--;
                    if (this.actionTimer <= 0){
                        if (chongKhong(this, ['sd_launch','sd_dance'], 190, 170)) return;   // @@HE-CHONGKHONG
                        this.state = pickFromBag(this, ['sd_dance','sd_trick','sd_launch','sd_drill','sd_trick','sd_rush',
                                                        'sd_quad','sd_beam','sd_meteor','sd_luce','sd_swords','sd_royal']);
                        if (!this._sinDrillSeen) this.state = 'sd_drill';
                        else if (this.state === 'sd_drill' && frames < (this._sinDrillReady || 0)) this.state = 'sd_dance';
                        this.subTimer = 0; this.faceP();
                    }
                    return;
                }
                if (this.state === 'd_trickev'){
                    this.subTimer += 1.2; if (this.subTimer % 3 < 1.2) this.ghost();
                    if (this.subTimer > 16){ this.dashV *= 0.5; this.toIdle(10); }
                    return;
                }
                this.runSDT();
            }
            runSDT(){
                if (this.swordRefill > 0) this.swordRefill--;
                else if (this.swords.length === 0){ this.summonSwords(4); this.swordRefill = 300; }
                let st = this.state, sp = 1.2; this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;
                if (st === 'sd_swords'){
                    if (T(10)){
                        this.summonSwords(6);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 34) this.toIdle(14);
                    return;
                }
                if (st === 'sd_trick'){
                    let moc = [8, 30, 52, 74];
                    for (let k = 0; k < 4; k++) if (T(moc[k])){
                        this.faceP();
                        let s2 = (k % 2 === 0) ? -1 : 1, xa = 84 - k * 12;
                        this.trickTo = Math.max(8, Math.min(canvas.width - this.w - 8,
                                        dino.x + dino.w/2 - this.w/2 + s2 * xa));
                        this.warn(96, 24, 10);
                    }
                    if (this.trickTo != null){
                        let dx = this.trickTo - this.x;
                        if (Math.abs(dx) <= 38){ this.x = this.trickTo; this.trickTo = null; }
                        else { this.x += Math.sign(dx) * 38; this.ghost(); this.faceP(); }
                    }
                    for (let k = 0; k < 4; k++) if (T(moc[k] + 20)){
                        this.doSlash(100, 24, 9, 1);
                        if (SFX.tone) SFX.tone(880 + k*70, 0.05, 'square', 0.13, 700);
                    }
                    if (this.subTimer > 104){ this.trickTo = null; this.toIdle(18); }
                    return;
                }
                if (st === 'sd_launch'){
                    if (T(6)){  this.faceP(); this.warn(104, 84, 14); this.drawn = true; }
                    if (T(22)){
                        this.doSlash(104, 84, 12, 1);
                        floatingTexts.push(new FloatingText(this.x - 24, this.y - 36, "HIGH TIME!"));
                        let r = this.slashRect();
                        if (checkAABB(dino, r) && dino.grounded){ dino.dy = -14; dino.grounded = false; dino.canDoubleJump = false; }
                        this.fly = 90; this.hover = this.baseY - 96;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    let m2 = [42, 62, 82];
                    for (let k = 0; k < 3; k++){
                        if (T(m2[k] - 10)){ this.faceP(); this.x += (dino.x - this.x) * 0.4; this.warn(96, 40, 10); }
                        if (T(m2[k])) this.doSlash(96, 40, 9, 1);
                    }
                    if (T(100)){ this.fly = 0; this.dy = 19; this.warn(120, 24, 14); }
                    if (T(120)){ this.doSlash(120, 24, 14, 1); shakeTimer = Math.max(shakeTimer, 16);
                                 visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 52)); }
                    if (this.subTimer > 142){ this.dy = 0; this.toIdle(24); }
                    return;
                }
                if (st === 'sd_rush'){
                    let moc = [8, 28, 48, 68, 88];
                    for (let k = 0; k < 5; k++){
                        if (T(moc[k] - 6)){ this.faceP(); this.warn(84, 10, 6); }
                        if (T(moc[k])){
                            this.dashV = this.dir() * 19; this.doSlash(88, 10, 8, 1); this.ghost();
                            if (SFX.tone) SFX.tone(660 + k*40, 0.04, 'square', 0.11, 900);
                        }
                    }
                    if (this.subTimer > 112) this.toIdle(20);
                    return;
                }
                if (st === 'sd_dance'){
                    let warns = [8, 26, 44, 62, 80, 100], hits = [16, 34, 52, 70, 88, 112];
                    for (let k = 0; k < 6; k++){
                        if (T(warns[k])){ this.faceP(); this.warn(k===5 ? 130 : 96, k===5 ? 30 : 16, hits[k]-warns[k]); }
                        if (T(hits[k])){
                            this.faceP(); let big = k === 5;
                            this.armR = big ? -1.8 : (k%2 ? -0.6 : -1.3);
                            this.doSlash(big ? 130 : 96, big ? 30 : 16, big ? 18 : 11, 1);
                            this.dashV = this.dir() * (big ? 10 : 5.5);
                            if (big){ shakeTimer = 26; if (SFX.bossExplode) SFX.bossExplode(); }
                            else if (SFX.tone) SFX.tone(420, 0.06, 'square', 0.10, 240);
                        }
                    }
                    if (this.subTimer > 134) this.toIdle(30);
                    return;
                }
                if (st === 'sd_quad'){
                    if (T(10)) floatingTexts.push(new FloatingText(this.cx()-90, 130, "QUADRUPLE S!"));
                    let ys = [286, 244, 200, 262], go = [30, 54, 78, 102];
                    for (let k = 0; k < 4; k++){
                        if (T(go[k] - 22)){ this._qy = ys[k]; this._qt = 22; }
                        if (T(go[k])){
                            let dd = (dino.x + dino.w/2) < canvas.width/2 ? 1 : -1;
                            let bp = new BossProjectile(dd < 0 ? canvas.width+20 : -40, ys[k]-22, 21*dd, 0, false, 1);
                            bp.w = 74; bp.h = 26; bp.color = "#FFC107"; bp.isPiercing = true; bp.spear = true;
                            bossProjectiles.push(bp);
                            shakeTimer = Math.max(shakeTimer, 16);
                        }
                    }
                    if (this._qt > 0) this._qt--;
                    if (this.subTimer > 128) this.toIdle(34);
                    return;
                }
                if (st === 'sd_beam'){
                    if (T(14)){
                        this.drawn = true; this.armR = -1.4;
                        let a0 = Math.atan2((dino.y+dino.h/2)-this.cy(), (dino.x+dino.w/2)-this.cx());
                        let sw = (Math.random() < 0.5 ? 1 : -1) * 0.016;
                        this.beam = { a: a0 - sw*30, a0: a0 - sw*30, sw: sw, arc: 1.15, t: 44 };
                        floatingTexts.push(new FloatingText(this.cx()-70, this.y-40, "NÉ THEO VÒNG CUNG!"));
                        if (SFX.bossEntry) SFX.bossEntry();
                    }
                    if (this.subTimer > 60 && !this.beam) this.toIdle(36);
                    if (this.subTimer > 190){ this.beam = null; this.toIdle(36); }
                    return;
                }
                if (st === 'sd_meteor'){
                    if (T(4)){ this.fly = 150; this.hover = this.baseY - 90; }
                    if (this.subTimer > 24 && this.subTimer < 110 && Math.floor(this.subTimer) % 9 === 0){
                        let mx = 40 + Math.random() * (canvas.width - 80);
                        let bp = new BossProjectile(mx, troiSinh(), (Math.random()-0.5)*3, troiVy(8.5, -30), false, 1);
                        bp.w = 30; bp.h = 30; bp.color = "#FF6D00"; bp.comet = true; bossProjectiles.push(bp);
                    }
                    if (this.subTimer > 130){ this.fly = 0; this.toIdle(34); }
                    return;
                }
                // [CHIEU MOI SDT] THE LUCE & DEMOLITION: Ban chuoi dan anh sang tu canh roi kich no trong truong
                if (st === 'sd_luce'){
                    if (T(4)){
                        this.fly = 120; this.hover = this.baseY - 95;
                        this._demoZones = [];
                        floatingTexts.push(new FloatingText(this.cx() - 65, this.y - 36, "THE LUCE!"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 16 && this.subTimer < 68 && Math.floor(this.subTimer) % 8 === 0){
                        this.faceP();
                        let sx = this.cx() + (Math.random() - 0.5) * 60, sy = this.y + 10;
                        let a = Math.atan2((dino.y + dino.h/2) - sy, (dino.x + dino.w/2) - sx) + (Math.random() - 0.5) * 0.14;
                        let bp = new BossProjectile(sx, sy, Math.cos(a) * 15, Math.sin(a) * 15, false, 1);
                        bp.w = 18; bp.h = 10; bp.color = "#FFAB00"; bp.sonic = true;
                        bossProjectiles.push(bp);
                    }
                    if (T(72)){
                        let px = dino.x + dino.w / 2;
                        this._demoZones = [
                            { x: Math.max(60, Math.min(canvas.width - 60, px - 55)), t: 26 },
                            { x: Math.max(60, Math.min(canvas.width - 60, px + 55)), t: 26 }
                        ];
                        floatingTexts.push(new FloatingText(this.cx() - 65, this.y - 36, "DEMOLITION!"));
                    }
                    if (this._demoZones && this._demoZones.length){
                        for (let i = this._demoZones.length - 1; i >= 0; i--){
                            let z = this._demoZones[i]; z.t -= sp;
                            if (z.t <= 0){
                                visualEffects.push(new Effect(z.x, 285, 'explosion', true, 60));
                                shakeTimer = Math.max(shakeTimer, 26);
                                if (checkAABB(dino, { x: z.x - 46, y: 210, w: 92, h: 110 })) this.hurtP(1);
                                if (SFX.bossExplode) SFX.bossExplode();
                                this._demoZones.splice(i, 1);
                            }
                        }
                    }
                    if (this.subTimer > 116){ this.fly = 0; this._demoZones = []; this.toIdle(30); }
                    return;
                }
                if (st === 'sd_royal'){
                    if (T(4)){ this.rg = Math.max(40, Math.min(110, Math.round(this.rgDiem*1.1))); this.rgCd = 300; this.rgCharge = 0; this.armL = -1.2; }
                    let g = this.gap();
                    this.x += Math.sign(g) * 2.0;
                    if (this.subTimer > 6 && this.rg <= 0){
                        this.rgCharge = Math.max(3, this.rgCharge);
                        this.royalRelease();
                        this.toIdle(32);
                    }
                    return;
                }
                this.toIdle(30);
            }
            _sword(s, col){
                ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.ang || 0);
                ctx.shadowColor = col; ctx.shadowBlur = 10; ctx.fillStyle = col;
                ctx.beginPath(); ctx.moveTo(17, 0); ctx.lineTo(2, -5); ctx.lineTo(-13, -3); ctx.lineTo(-13, 3); ctx.lineTo(2, 5); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FFFFFF";
                ctx.beginPath(); ctx.moveTo(16, 0); ctx.lineTo(2, -1.8); ctx.lineTo(-11, -1); ctx.lineTo(-11, 1); ctx.lineTo(2, 1.8); ctx.closePath(); ctx.fill();
                ctx.restore();
            }
            draw(){
                if (this.suVe) this.suVe();      // chieu cuoi SDT + kiem anh + dau KIET SUC
                let A = this.A(), sdt = this.phase === 2;
                let col = sdt ? "#FFC107" : A.c;
                if (this.dtStage === 2 && this.phase === 1 && frames % 4 === 0) this.ghost();
                this.drawPhantoms();
                if (this.styleFx > 0){
                    this.styleFx--;
                    let k = this.styleFx / 14;
                    ctx.save();
                    ctx.globalAlpha = 0.55 * k;
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 30 + (1-k) * 52, 0, 6.28); ctx.stroke();
                    ctx.globalAlpha = 0.85 * k;
                    ctx.fillStyle = col; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("STYLE!", this.cx(), this.y - 40 - (1-k) * 16);
                    ctx.restore();
                }
                // --- Cot lua Real Impact ---
                if (this._riPillar > 0){
                    let k = this._riPillar / 20, px = this._riX || this.cx();
                    ctx.save();
                    ctx.globalAlpha = 0.75 * k;
                    let pg = ctx.createLinearGradient(px - 36, 0, px + 36, 0);
                    pg.addColorStop(0, "rgba(255,61,0,0)"); pg.addColorStop(0.5, "#FFAB00"); pg.addColorStop(1, "rgba(255,61,0,0)");
                    ctx.fillStyle = pg; ctx.fillRect(px - 36, 150, 72, 170);
                    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(px - 10 * k, 160, 20 * k, 160);
                    ctx.restore();
                }
                // --- Vong xoay bang-dien Revolver (King Cerberus) ---
                if (this._revSpin && this.state === 'k_revolver'){
                    ctx.save();
                    ctx.translate(this.cx() + this.dir() * 10, this.cy());
                    ctx.rotate(this._revSpin);
                    ctx.strokeStyle = "#00E5FF"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.arc(0, 0, 42, 0, 4.5); ctx.stroke();
                    ctx.strokeStyle = "#FFEA00"; ctx.lineWidth = 2.5;
                    ctx.beginPath(); ctx.arc(0, 0, 32, 1.5, 5.8); ctx.stroke();
                    ctx.restore();
                }
                // --- Vung trong truong Demolition (SDT) ---
                if (this._demoZones && this._demoZones.length){
                    for (let z of this._demoZones){
                        let k = 1 - Math.max(0, z.t) / 26;
                        ctx.save();
                        ctx.globalAlpha = 0.25 + 0.55 * k;
                        ctx.strokeStyle = "#FF6D00"; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.ellipse(z.x, 316, 46 * (1 - k * 0.25), 12, 0, 0, 6.28); ctx.stroke();
                        ctx.fillStyle = "rgba(255, 23, 68, 0.28)";
                        ctx.fillRect(z.x - 36 * k, 210, 72 * k, 110);
                        ctx.restore();
                    }
                }
                // --- coc bang King Cerberus ---
                for (let s of this.spikes){
                    if (s.t > 0){
                        let k = Math.max(0, Math.min(1, 1 - s.t/34));
                        ctx.save(); ctx.globalAlpha = 0.25 + 0.4*k;
                        ctx.fillStyle = "#40C4FF"; ctx.beginPath();
                        ctx.ellipse(s.x, 318, 22, 7, 0, 0, 6.28); ctx.fill(); ctx.restore();
                    } else {
                        let g2 = Math.min(1, (-s.t + 4) / 8), H2 = 74 * Math.min(1, g2 * 2);
                        ctx.save(); ctx.globalAlpha = Math.max(0, 1 + s.t/26);
                        ctx.fillStyle = "#81D4FA";
                        ctx.beginPath(); ctx.moveTo(s.x - 18, 322); ctx.lineTo(s.x, 322 - H2); ctx.lineTo(s.x + 18, 322); ctx.closePath(); ctx.fill();
                        ctx.fillStyle = "#E1F5FE";
                        ctx.beginPath(); ctx.moveTo(s.x - 7, 322); ctx.lineTo(s.x, 322 - H2*0.9); ctx.lineTo(s.x + 6, 322); ctx.closePath(); ctx.fill();
                        ctx.restore();
                    }
                }
                // --- ngoc do Dr. Faust (thuong + Red Hot Night big orb) ---
                for (let o of this.orbs){
                    let rad = o.big ? 22 : 11;
                    if (o.t > 0){
                        ctx.save(); ctx.globalAlpha = 0.55; ctx.strokeStyle = o.big ? "#FF1744" : "#EF5350"; ctx.lineWidth = o.big ? 3.5 : 2;
                        ctx.setLineDash([6,6]); ctx.lineDashOffset = -frames;
                        let _top = ((typeof camY === 'number') ? camY : 0);
                        ctx.beginPath(); ctx.moveTo(o.x, _top); ctx.lineTo(o.x, 320); ctx.stroke(); ctx.setLineDash([]);
                        ctx.globalAlpha = 0.85; ctx.fillStyle = "#FF1744"; ctx.beginPath(); ctx.moveTo(o.x - 7, _top + 4); ctx.lineTo(o.x + 7, _top + 4); ctx.lineTo(o.x, _top + 14); ctx.closePath(); ctx.fill();
                        ctx.globalAlpha = 0.4; ctx.beginPath(); ctx.ellipse(o.x, 318, o.big ? 36 : 14, o.big ? 7 : 4, 0, 0, 6.28); ctx.fill();
                        ctx.restore();
                    } else {
                        ctx.save(); ctx.shadowColor = "#FF1744"; ctx.shadowBlur = o.big ? 20 : 12;
                        ctx.fillStyle = o.big ? "#D50000" : "#E53935";
                        ctx.beginPath();
                        for (let k = 0; k < 6; k++){ let a = k*1.047 + frames*0.05;
                            let px = o.x + Math.cos(a)*rad, py = o.y + Math.sin(a)*(rad*1.18);
                            if (k===0) ctx.moveTo(px,py); else ctx.lineTo(px,py); }
                        ctx.closePath(); ctx.fill();
                        if (o.big){
                            ctx.fillStyle = "#FFCDD2";
                            ctx.beginPath(); ctx.arc(o.x, o.y, 8, 0, 6.28); ctx.fill();
                        }
                        ctx.restore();
                    }
                }
                // --- mu Dr. Faust ---
                if (this.hat){
                    let h = this.hat;
                    ctx.save(); ctx.translate(h.x, h.y); ctx.rotate(h.spin || 0);
                    ctx.shadowColor = "#FF1744"; ctx.shadowBlur = 14;
                    ctx.fillStyle = "#B71C1C";
                    ctx.beginPath(); ctx.moveTo(-19, 6); ctx.lineTo(19, 6); ctx.lineTo(5, -26); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#4A0E0E"; ctx.fillRect(-21, 3, 42, 5);
                    ctx.restore();
                }
                // --- kiem linh hon ---
                for (let s of this.swords) this._sword(s, s.fired ? "#FFF176" : col);
                // --- tia kiem SDT ---
                if (this.beam){
                    let b = this.beam;
                    ctx.save();
                    if (b.t > 0){
                        ctx.globalAlpha = 0.30 + 0.4 * (1 - b.t/44);
                        ctx.strokeStyle = "#FFC107"; ctx.lineWidth = 3; ctx.setLineDash([10,8]);
                        for (let q = -1; q <= 1; q += 2){
                            ctx.beginPath(); ctx.moveTo(this.cx(), this.cy());
                            ctx.lineTo(this.cx()+Math.cos(b.a0 + q*b.arc)*900, this.cy()+Math.sin(b.a0 + q*b.arc)*900); ctx.stroke();
                        }
                        ctx.setLineDash([]);
                    } else {
                        ctx.shadowColor = "#FFC107"; ctx.shadowBlur = 22;
                        ctx.strokeStyle = "#FFF59D"; ctx.lineWidth = 22; ctx.lineCap = "round";
                        ctx.beginPath(); ctx.moveTo(this.cx(), this.cy());
                        ctx.lineTo(this.cx()+Math.cos(b.a)*900, this.cy()+Math.sin(b.a)*900); ctx.stroke();
                        ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 9;
                        ctx.beginPath(); ctx.moveTo(this.cx(), this.cy());
                        ctx.lineTo(this.cx()+Math.cos(b.a)*900, this.cy()+Math.sin(b.a)*900); ctx.stroke();
                    }
                    ctx.restore();
                }
                // --- vach bao QUADRUPLE S ---
                if (this._qt > 0){
                    let k = 1 - this._qt / 22;
                    ctx.save();
                    ctx.globalAlpha = 0.16 + 0.34 * k;
                    ctx.fillStyle = "#FFC107"; ctx.fillRect(0, this._qy - 24, canvas.width, 48);
                    ctx.globalAlpha = 0.95; ctx.strokeStyle = (frames % 6 < 3) ? "#FFFFFF" : "#FFC107"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(0, this._qy - 24); ctx.lineTo(canvas.width, this._qy - 24);
                    ctx.moveTo(0, this._qy + 24); ctx.lineTo(canvas.width, this._qy + 24); ctx.stroke();
                    ctx.restore();
                }
                // --- anh mo ---
                for (let g of this.ghosts){
                    ctx.save(); ctx.globalAlpha = (g.t/14) * 0.40;
                    let gm = { facingLeft: g.left, drawn: g.drawn, armR: g.armR, armL: 0, arms: g.arms, wing: this.wing, cerb: this.cerb };
                    if (sdt) drawSdtDante(gm, g.x, g.y); else { drawDanteBody(gm, g.x, g.y); if (this.dtStage === 2) drawDtOverlay(gm, g.x, g.y); }
                    ctx.restore();
                }
                // --- KHIEN ROYAL GUARD ---
                if (this.rg > 0){
                    let d = this.dir(), gx = d < 0 ? this.x - 52 : this.x + this.w - 4;
                    ctx.save();
                    ctx.globalAlpha = 0.24 + 0.18*Math.abs(Math.sin(frames*0.2));
                    ctx.fillStyle = "#4FC3F7"; ctx.fillRect(gx, this.y - 16, 56, this.h + 30);
                    ctx.globalAlpha = 0.95; ctx.strokeStyle = "#B3E5FC"; ctx.lineWidth = 3;
                    ctx.strokeRect(gx, this.y - 16, 56, this.h + 30);
                    ctx.restore();
                    ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(this.cx()-34, this.y-30, 68, 7);
                    ctx.fillStyle = this.rgCharge >= 6 ? "#FF1744" : "#FFD54F";
                    ctx.fillRect(this.cx()-33, this.y-29, 66 * (this.rgCharge/10), 5);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("ROYAL GUARD — LƯỚT XUYÊN QUA!", this.cx(), this.y - 36); ctx.textAlign = "left";
                }
                // --- BAO NHAT CHEM ---
                if (this.tel){
                    let t = this.tel, k = 1 - t.t/t.max;
                    let cxT = t.dir < 0 ? this.x : this.x + this.w, cyT = this.y + this.h/2;
                    ctx.save();
                    ctx.globalAlpha = 0.28 + 0.45*k;
                    ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 2.5; ctx.lineCap = "round";
                    ctx.setLineDash([7,6]); ctx.lineDashOffset = -frames*0.8;
                    ctx.beginPath(); ctx.arc(cxT, cyT, t.reach, t.dir<0 ? Math.PI-0.9 : -0.9, t.dir<0 ? Math.PI+0.9 : 0.9, false); ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.globalAlpha = 0.85; ctx.strokeStyle = "#FFCDD2"; ctx.lineWidth = 4;
                    let a0 = t.dir<0 ? Math.PI-0.9 : -0.9, a1 = t.dir<0 ? Math.PI+0.9 : 0.9;
                    ctx.beginPath(); ctx.arc(cxT, cyT, t.reach, a0, a0+(a1-a0)*k, false); ctx.stroke();
                    ctx.restore();
                }
                // --- THAN DANTE ---
                ctx.save();
                if (this.morph > 0) ctx.globalAlpha = 0.4 + 0.6*Math.abs(Math.sin(this.morph*0.4));
                // ===== MILLION STAB: vet dam =====
                if (this.stabFx && this.stabFx.length){
                    ctx.save(); ctx.lineCap = 'round';
                    for (let i = this.stabFx.length-1; i >= 0; i--){
                        let F = this.stabFx[i]; F.t--;
                        let mo = F.t/8, x0 = this.cx(), gc = F.goc || 0;
                        let L = F.dai*(1.15-mo*0.15);
                        let ex = x0 + F.dir*L*Math.cos(gc), ey = F.y + L*Math.sin(gc)*F.dir;
                        let sx = x0 + F.dir*14*Math.cos(gc), sy = F.y + 14*Math.sin(gc)*F.dir;
                        ctx.globalAlpha = 0.8*mo;
                        ctx.strokeStyle = '#ECEFF1'; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
                        ctx.globalAlpha = 0.45*mo; ctx.strokeStyle = '#E53935'; ctx.lineWidth = 1.4;
                        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
                        ctx.globalAlpha = 0.95*mo; ctx.fillStyle = '#FFFFFF';
                        let nx = Math.cos(gc)*F.dir, ny = Math.sin(gc)*F.dir;
                        ctx.beginPath();
                        ctx.moveTo(ex + nx*9, ey + ny*9);
                        ctx.lineTo(ex - nx*6 + ny*4.5, ey - ny*6 - nx*4.5);
                        ctx.lineTo(ex - nx*6 - ny*4.5, ey - ny*6 + nx*4.5);
                        ctx.fill();
                        if (F.t <= 0) this.stabFx.splice(i,1);
                    }
                    ctx.restore();
                }
                // ===== SHREDDER: vong kiem xoay truoc mat =====
                if (this.shred > 0 && this.state !== 'd_shred') this.shred = 0;
                if (this.stab > 0 && this.state !== 'd_million') this.stab = 0;
                if (this.shred > 0){
                    let dd = this.dir(), sx = this.cx() + dd*40, sy = this.y + this.h/2;
                    ctx.save();
                    for (let k = 0; k < 3; k++){
                        let a2 = this.shred + k*(Math.PI*2/3);
                        ctx.globalAlpha = 0.30 + 0.25*Math.abs(Math.sin(a2));
                        ctx.strokeStyle = '#ECEFF1'; ctx.lineWidth = 6; ctx.lineCap = 'round';
                        ctx.beginPath();
                        ctx.moveTo(sx - Math.cos(a2)*36, sy - Math.sin(a2)*30);
                        ctx.lineTo(sx + Math.cos(a2)*36, sy + Math.sin(a2)*30);
                        ctx.stroke();
                    }
                    ctx.globalAlpha = 0.5; ctx.strokeStyle = '#E53935'; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.ellipse(sx, sy, 38, 32, 0, 0, Math.PI*2); ctx.stroke();
                    ctx.globalAlpha = 0.22; ctx.fillStyle = '#B0BEC5';
                    ctx.beginPath(); ctx.ellipse(sx, sy, 34, 28, 0, 0, Math.PI*2); ctx.fill();
                    ctx.restore();
                }
                // ===== CAVALIERE: VE HAN CHIEC XE =====
                if (this.bike || this.state === 'c_wheel'){
                    let dd = this.dir(), bx = this.cx(), by = this.y + this.h;
                    let quay = (this.bike ? frames*0.9 : (this.subTimer||0)*0.8);
                    ctx.save(); ctx.translate(bx, 0); ctx.scale(dd, 1); ctx.translate(-bx, 0);
                    ctx.fillStyle = '#37474F'; ctx.fillRect(bx-30, by-40, 60, 22);
                    ctx.fillStyle = '#546E7A'; ctx.fillRect(bx-26, by-37, 52, 10);
                    ctx.fillStyle = '#B0BEC5'; ctx.fillRect(bx-22, by-35, 20, 5);
                    ctx.fillStyle = '#263238'; ctx.fillRect(bx-40, by-30, 14, 8);
                    if (this.bike){
                        ctx.globalAlpha = 0.6 + 0.3*Math.sin(frames*0.6);
                        ctx.fillStyle = '#FF7043';
                        ctx.beginPath(); ctx.moveTo(bx-40, by-30); ctx.lineTo(bx-72, by-26); ctx.lineTo(bx-40, by-22); ctx.fill();
                        ctx.globalAlpha = 1;
                    }
                    ctx.strokeStyle = '#90A4AE'; ctx.lineWidth = 5; ctx.lineCap='round';
                    ctx.beginPath(); ctx.moveTo(bx+22, by-38); ctx.lineTo(bx+36, by-58); ctx.stroke();
                    ctx.fillStyle = '#263238'; ctx.fillRect(bx+30, by-62, 14, 6);
                    for (let s2 = -1; s2 <= 1; s2 += 2){
                        let wx = bx + s2*26, R = 21;
                        ctx.save(); ctx.translate(wx, by-20); ctx.rotate(quay*s2);
                        ctx.fillStyle = '#263238';
                        ctx.beginPath(); ctx.arc(0,0,R,0,Math.PI*2); ctx.fill();
                        ctx.fillStyle = '#CFD8DC';
                        for (let k2 = 0; k2 < 10; k2++){
                            let a2 = k2*Math.PI/5;
                            ctx.save(); ctx.rotate(a2);
                            ctx.beginPath(); ctx.moveTo(-4, -R-7); ctx.lineTo(4, -R-7); ctx.lineTo(0, -R+3); ctx.fill();
                            ctx.restore();
                        }
                        ctx.fillStyle = '#455A64';
                        ctx.beginPath(); ctx.arc(0,0,R-7,0,Math.PI*2); ctx.fill();
                        ctx.fillStyle = '#FF3D00';
                        ctx.beginPath(); ctx.arc(0,0,4,0,Math.PI*2); ctx.fill();
                        ctx.restore();
                        if (this.bike && frames % 4 === 0)
                            visualEffects.push(new Effect(wx, by-2, 'explosion', true, 9));
                    }
                    ctx.restore();
                }
                if (sdt) drawSdtDante(this, this.x, this.y); else { drawDanteBody(this, this.x, this.y); if (this.dtStage === 2) drawDtOverlay(this, this.x, this.y); }
                ctx.restore();
                // --- vet chem ---
                if (this.slash){
                    let a = this.slash, cxS = a.dir < 0 ? this.x : this.x + this.w;
                    ctx.save(); ctx.globalAlpha = Math.min(1, a.t/8);
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 6; ctx.lineCap = "round";
                    ctx.shadowColor = col; ctx.shadowBlur = 12;
                    for (let k = 0; k < 3; k++){
                        ctx.beginPath();
                        ctx.arc(cxS, this.y + this.h/2, Math.max(8, a.reach - k*16), a.dir<0 ? Math.PI-0.9 : -0.9, a.dir<0 ? Math.PI+0.9 : 0.9, false);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // --- bang VU KHI + dong ho doi vu khi ---
                if (!sdt){
                    ctx.save(); ctx.textAlign = "center";
                    ctx.fillStyle = "rgba(0,0,0,0.62)"; ctx.fillRect(this.cx()-72, this.y-52, 144, 15);
                    ctx.strokeStyle = A.c; ctx.lineWidth = 2; ctx.strokeRect(this.cx()-72, this.y-52, 144, 15);
                    ctx.fillStyle = A.c; ctx.font = "bold 10px Consolas, monospace";
                    ctx.fillText(A.n, this.cx(), this.y-41);
                    ctx.fillStyle = "rgba(255,255,255,0.22)"; ctx.fillRect(this.cx()-72, this.y-38, 144, 3);
                    ctx.fillStyle = A.c; ctx.fillRect(this.cx()-72, this.y-38, 144*Math.max(0, this.switchT/DT_SWITCH), 3);
                    ctx.textAlign = "left"; ctx.restore();
                }
                ctx.fillStyle = sdt ? "#FFC107" : "#EF9A9A"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(sdt ? "SIN DEVIL TRIGGER" : (this.dtStage === 2 ? "DEVIL TRIGGER" : "DEVIL ARMS"), this.cx(), this.y - 18);
                drawTopBossBar(this, sdt ? "#FFC107" : (this.dtStage === 2 ? "#FF1744" : "#E53935"),
                               sdt ? "DANTE — SIN DEVIL TRIGGER" : ((this.dtStage === 2 ? "DANTE ⯈ DEVIL TRIGGER — " : "DANTE — ") + A.n));
                ctx.textAlign = "left";
                this.dmcVeHang();      // @@HE-DANTE-DMC
            }
        }
// BOSS_PART_END s0.DanteBoss.1

// Nguồn: index.html:8394 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DMC_HANG.1 EDITABLE
const DMC_HANG = [
            { k: 'D',   t: 'DISMAL',      c: '#90A4AE' },
            { k: 'C',   t: 'CRAZY',       c: '#81C784' },
            { k: 'B',   t: 'BADASS',      c: '#4FC3F7' },
            { k: 'A',   t: 'APOCALYPTIC', c: '#FFD54F' },
            { k: 'S',   t: 'SAVAGE!',     c: '#FF9800' },
            { k: 'SS',  t: 'SICK SKILLS!!', c: '#FF5252' },
            { k: 'SSS', t: "SMOKIN' SEXY STYLE!!!", c: '#E040FB' }
        ];
// BOSS_PART_END s0.DMC_HANG.1

// Nguồn: index.html:8403 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DMC_NOI_SAU.1 EDITABLE
const DMC_NOI_SAU = 50;
// BOSS_PART_END s0.DMC_NOI_SAU.1

// Nguồn: index.html:8404 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.Object.assign.DanteBoss.prototype.1 EDITABLE
Object.assign(DanteBoss.prototype, {
            hang(){ return Math.max(0, Math.min(6, Math.floor((this.styleP || 0) / 100))); },
            buocToi(v){ let khe = Math.abs(this.gap()) - (this.w + dino.w) / 2 - 30; return Math.max(0, Math.min(v, khe / 6)); },
            hurtP(n){
                if (dino.isShielding()){ parry(); this.styleP = Math.max(0, (this.styleP || 0) - 60); return; }
                let h = dino.hp;
                dino.takeDamage(n);
                if (dino.hp < h){
                    this.trungLuc = frames; this.trungMove = this.state;
                    this.styleP = Math.min(720, (this.styleP || 0) + 70);
                    if (this._dayLui){ let d = this.dir(); dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x + d * this._dayLui)); }
                }
            },
            dmcTick(){
                if (!this.suSt && !this.invulnAll) aaBanKem(this);      // @@HE-AA-RIENG
                if (this.trickCd > 0) this.trickCd--;
                if (this.breakCd > 0) this.breakCd--;
                if (this.neT > 0){ this.neT--; if (this.neT === 0 && this._neKhoa){ this.invulnAll = false; this._neKhoa = false; } }
                let mat = (this._hpTruoc || this.hp) - this.hp;
                if (this.maxHp !== this._maxTruoc){ mat = 0; this._maxTruoc = this.maxHp; }
                this._hpTruoc = this.hp;
                if (mat > 0){ this.styleP = Math.max(0, (this.styleP || 0) - mat * 4); this.dmgLog.push({ f: frames, d: mat }); }
                while (this.dmgLog.length && frames - this.dmgLog[0].f > 45) this.dmgLog.shift();
                if (this.state === 'idle') this.styleP = Math.max(0, this.styleP - 0.3);
                else this.styleP = Math.max(0, this.styleP - 0.12);
                if (this.state === 'd_trickev') return false;
                let ranh = this.state === 'idle' || this.state === 'd_gun' || this.state === 'd_taunt' || this.state === 'royal';
                if (this.invulnAll || this.state === 'morphing' || this.state === 'entering' || this.suSt || this.suYeu > 0) return false;
                // --- PHA COMBO ---
                let tong = 0; for (const e of this.dmgLog) tong += e.d;
                if (tong >= 6 && this.breakCd <= 0 && (ranh || /jab|comboA|million|shred|trick|dash|back/.test(this.state))){
                    this.breakCd = this.dtStage >= 2 ? 150 : 210; this.dmgLog.length = 0;
                    if (this.rgDiem >= 30 && Math.random() < 0.55){
                        this.rgCharge = Math.max(this.rgCharge, 3); this.royalRelease(); this.rgDiem -= 30;
                        floatingTexts.push(new FloatingText(this.x - 30, this.y - 46, "ROYAL RELEASE!"));
                        this.styleP = Math.min(720, this.styleP + 40);
                        this.batNe(-1); return true;
                    }
                    this.batNe(-1); return true;
                }
                // --- TRICKSTER NE DAN ---
                if (this.trickCd <= 0 && (ranh || this.state === 'idle')){
                    let cx = this.cx(), cy = this.cy();
                    for (const pr of projectiles){
                        if (!pr || pr.owner !== 1) continue;
                        let px = pr.x + (pr.w || 0) / 2, py = pr.y + (pr.h || 0) / 2, vx = pr.vx || pr.speed || 0;
                        let toi = (px < cx && vx > 0) || (px > cx && vx < 0);
                        if (!toi || Math.abs(px - cx) > 150 || Math.abs(py - cy) > 70) continue;
                        this.trickCd = Math.max(40, (this.dtStage >= 2 ? 95 : 130) - this.hang() * 8);
                        if (Math.random() < 0.40 + this.hang() * 0.06){ this.batNe(1, py); return true; }
                        break;
                    }
                }
                // --- E&I bat cham luc di bo o xa ---
                if (this.state === 'idle' && this.phase === 1 && !this.meleePriority && Math.abs(this.gap()) > 230){
                    if (++this.gunT >= 34){
                        this.gunT = 0; this.faceP();
                        let a = Math.atan2((dino.y + dino.h/2) - this.gunY(), (dino.x + dino.w/2) - this.gunX());
                        let bp = this.shoot(Math.cos(a) * 14, Math.sin(a) * 14, 12, 6, "#FFF176", 1); bp.frail = true;
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880, 0.03, 'square', 0.05, 600);
                    }
                } else this.gunT = 0;
                return false;
            },
            batNe(huong, dy){
                this.slash = null; this.tel = null; this.bike = null; this.rg = 0; this.fly = 0;
                this.state = 'd_trickev'; this.subTimer = 0; this.neHuong = huong;
                this.faceP();
                let caoDan = dy != null && dy > this.y + this.h * 0.45;
                if (huong > 0 && caoDan && this.grounded){ this.dy = -11; this.grounded = false; this.dashV = this.dir() * 12; }
                else this.dashV = this.dir() * (huong > 0 ? 20 : -22);
                if (huong < 0 && this.grounded){ this.dy = -7; this.grounded = false; }
                this.invulnAll = true; this._neKhoa = true; this.neT = 12;
                for (let k = 0; k < 4; k++) this.ghost();
                floatingTexts.push(new FloatingText(this.x - 24, this.y - 30, "TRICKSTER!"));
                this.styleP = Math.min(720, this.styleP + 35);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1350, 0.06, 'sine', 0.09, 420);
                if (this.phase === 1)
                    this.chuoi = huong > 0 ? [Math.random() < 0.5 ? 'd_stinger' : 'd_comboA'] :
                                 (Math.random() < 0.5 ? ['d_gun'] : ['d_stinger']);
            },
            dmcNoi(st){
                if (!st || this.phase !== 1 || this.hp <= 0) return;
                if (!this.chuoi) this.chuoi = [];
                let trung = (frames - this.trungLuc) < DMC_NOI_SAU && this.trungMove === st;
                let toiDa = this.hang() >= 4 ? 2 : 1;
                if (trung && this.noiThem < toiDa){
                    let ke = null;
                    if (st === 'd_hightime' || st === 'd_launch' || (!dino.grounded && dino.y + dino.h < 280)) ke = 'd_air';
                    else if (st === 'd_comboA' || st === 'd_jab' || st === 'd_stinger' || st === 'b_rush' || st === 'd_trick' || st === 'k_revolver'){
                        let ds = ['d_hightime', 'd_million', 'd_comboA', 'd_stinger', 'b_realimpact'].filter(x => x !== st);
                        ke = ds[Math.floor(Math.random() * ds.length)];
                    } else if (st === 'd_air') ke = Math.random() < 0.5 ? 'd_air' : 'd_gun';
                    if (ke && this.chuoi[0] !== ke){
                        this.chuoi.unshift(ke); this.noiThem++;
                        floatingTexts.push(new FloatingText(this.x - 14, this.y - 58, "COMBO!"));
                    }
                } else if (!trung && /^(d_comboA|d_jab|d_stinger|b_rush|d_million)$/.test(st) && Math.abs(this.gap()) > 150
                           && this.chuoi[0] !== 'd_gun' && Math.random() < 0.4){
                    this.chuoi.unshift('d_gun');
                }
            },
            dmcChieu(st, T){
                let d = this.dir();
                this._ketDon = false; this._dayLui = 0;
                if (st === 'd_trickev'){
                    if (this.subTimer % 3 < this.spd()) this.ghost();
                    if (this.subTimer > 16){ this.dashV *= 0.5; this.toIdle(6); }
                    return true;
                }
                if (st === 'd_comboA'){
                    if (T(2)){  this.faceP(); this.warn(86, 10, 10); this.drawn = true; this.armR = -1.6; }
                    if (T(12)){ this.doSlash(88, 10, 8, 1); this.dashV = this.dir() * this.buocToi(8); this.armR = 0.7;
                                if (SFX.tone) SFX.tone(760, 0.04, 'square', 0.10, 900); }
                    if (T(17)){ this.faceP(); this.warn(90, 12, 8); this.armR = -1.2; }
                    if (T(25)){ this.doSlash(92, 12, 8, 1); this.dashV = this.dir() * this.buocToi(8); this.armR = 0.9;
                                if (SFX.tone) SFX.tone(840, 0.04, 'square', 0.10, 900); }
                    if (T(31)){ this.faceP(); this.warn(108, 18, 12); this.armR = -2.1; }
                    if (T(43)){ this.doSlash(110, 18, 10, 1); this.slash.ket = true; this.dashV = this.dir() * this.buocToi(13); this.armR = 1.1;
                                shakeTimer = Math.max(shakeTimer, 10); if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.slash && this.slash.ket){ this._ketDon = true; this._dayLui = 46; }
                    if (this.subTimer > 58) this.toIdle(18);
                    return true;
                }
                if (st === 'd_hightime'){
                    if (T(3)){  this.faceP(); this.warn(96, 80, 12); this.drawn = true; this.armR = 1.0; }
                    if (T(15)){
                        this.doSlash(98, 82, 12, 1); this.armR = -2.4;
                        floatingTexts.push(new FloatingText(this.x - 20, this.y - 34, "HIGH TIME!"));
                        let r = this.slashRect();
                        if (checkAABB(dino, r) && !dino.isShielding()){ dino.dy = -13.5; dino.grounded = false; dino.canDoubleJump = false;
                            this.dy = -12.5; this.grounded = false; }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 30) this.toIdle(14);
                    return true;
                }
                if (st === 'd_air'){
                    if (T(1)){
                        this.faceP(); this.drawn = true; this._airKet = Math.random() < 0.55 ? 'helm' : 'gun'; this._hb = false;
                        if (this.grounded){ this.dy = -13; this.grounded = false; }
                        let g = this.gap(); this.dashV = Math.sign(g) * Math.min(14, Math.abs(g) / 7);
                    }
                    if (T(10)){ this.fly = 34; this.hover = Math.max(40, Math.min(this.baseY - 30, dino.y + dino.h / 2 - this.h / 2)); }
                    if (this.subTimer > 10 && this.subTimer < 40){
                        let g = this.gap(); if (Math.abs(g) > 44) this.x += Math.sign(g) * 3.2;
                        this.hover = Math.max(40, Math.min(this.baseY - 30, dino.y + dino.h / 2 - this.h / 2));
                    }
                    if (T(12)){ this.faceP(); this.warn(84, 30, 8); this.armR = -1.8; }
                    if (T(20)){ this.doSlash(86, 34, 8, 1); this.armR = 0.9; if (SFX.tone) SFX.tone(900, 0.04, 'square', 0.10, 1000); }
                    if (T(26)){ this.faceP(); this.warn(86, 30, 8); this.armR = -1.6; }
                    if (T(34)){ this.doSlash(88, 34, 8, 1); this.armR = 1.2; if (SFX.tone) SFX.tone(980, 0.04, 'square', 0.10, 1000);
                                if (this.slash && checkAABB(dino, this.slashRect()) && !dino.grounded) dino.dy = Math.min(dino.dy, -6); }
                    if (this._airKet === 'helm'){
                        if (T(42)){ this.fly = 0; this.faceP(); this.armR = -2.5; this.warn(66, 6, 10); this.dy = 4; }
                        if (T(50)){ this.dy = 21; this.x += this.gap() * 0.25; }
                        if (this.subTimer > 50 && this.grounded && !this._hb){
                            this._hb = true; shakeTimer = Math.max(shakeTimer, 24);
                            this.doSlash(72, 8, 12); this.slash.ket = true;
                            visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 40));
                            this._ketDon = true;
                            if (checkAABB(dino, { x: this.cx() - 80, y: this.baseY - 12, w: 160, h: this.h + 16 })) this.hurtP(1);
                            if (SFX.bossSkill) SFX.bossSkill();
                        }
                    } else {
                        if (this.subTimer > 40 && this.subTimer < 62 && Math.floor(this.subTimer) % 5 === 0 && Math.floor(this.subTimer - this.spd()) % 5 !== 0){
                            this.armR = -1.55; this.faceP();
                            let a = Math.atan2((dino.y + dino.h/2) - this.gunY(), (dino.x + dino.w/2) - this.gunX()) + (Math.random() - 0.5) * 0.12;
                            let bp = this.shoot(Math.cos(a) * 14, Math.sin(a) * 14, 12, 6, "#FFF176", 1); bp.frail = true;
                            if (SFX.tone) SFX.tone(880, 0.03, 'square', 0.06, 600);
                        }
                        if (T(62)) this.fly = 0;
                    }
                    if (this.subTimer > 58 && this.grounded){ this._hb = false; this.toIdle(16); }
                    if (this.subTimer > 120){ this._hb = false; this.fly = 0; this.toIdle(16); }
                    return true;
                }
                if (st === 'd_gun'){
                    if (T(2)){ this.faceP(); this.drawn = false; this.armR = -1.55; }
                    for (let k = 0; k < 4; k++) if (T(6 + k * 4)){
                        this.faceP();
                        let a = Math.atan2((dino.y + dino.h/2) - this.gunY(), (dino.x + dino.w/2) - this.gunX()) + (Math.random() - 0.5) * 0.10;
                        let bp = this.shoot(Math.cos(a) * 15, Math.sin(a) * 15, 13, 6, "#FFF176", 1); bp.frail = true;
                        this.dashV = -this.dir() * 2.5;
                        if (SFX.tone) SFX.tone(880 + k * 40, 0.03, 'square', 0.06, 600);
                    }
                    if (this.subTimer > 26) this.toIdle(10);
                    return true;
                }
                if (st === 'd_stinger' || st === 'd_helm' || st === 'b_realimpact') this._ketDon = true;
                return false;
            },
            dmcVeHang(){
                if (this.dying || !(this.hp > 0)) return;
                let h = this.hang(), H = DMC_HANG[h], du = (this.styleP % 100) / 100;
                if (h === 6) du = Math.min(1, (this.styleP - 600) / 120);
                ctx.save();
                let dp = (typeof DPR === 'number') ? DPR : 1, dy0 = (typeof dojoMode !== 'undefined' && dojoMode) ? 42 : 0;
                ctx.setTransform(dp, 0, 0, dp, 0, dy0 * dp);
                let x = canvas.width / 2 + 186, y = 10;
                let rung = (this.styleP > 0 && frames - this.trungLuc < 10) ? (Math.random() - 0.5) * 3 : 0;
                ctx.globalAlpha = this.styleP < 1 ? 0.35 : 1;
                ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(x - 4, y, 104, 34);
                ctx.fillStyle = H.c; ctx.font = "bold italic 24px Consolas, monospace"; ctx.textAlign = "left";
                ctx.fillText(H.k, x + rung, y + 23);
                ctx.font = "bold 8px Consolas, monospace";
                ctx.fillText(H.t.length > 13 ? H.t.slice(0, 13) : H.t, x + 42, y + 13);
                ctx.fillStyle = "rgba(255,255,255,0.18)"; ctx.fillRect(x + 42, y + 19, 54, 5);
                ctx.fillStyle = H.c; ctx.fillRect(x + 42, y + 19, 54 * Math.max(0, Math.min(1, du)), 5);
                ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 7px Consolas, monospace";
                ctx.fillText("STYLE", x + 42, y + 31);
                ctx.restore();
            }
        });
// BOSS_PART_END s0.Object.assign.DanteBoss.prototype.1

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

// Nguồn: index.html:25126 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_W.1 READ_ONLY
const DT_W = 40, DT_H = 60;
// BOSS_PART_END s0.DT_W.1

// Nguồn: index.html:25127 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_ARMS.1 READ_ONLY
const DT_ARMS = [
            { n: 'DEVIL SWORD DANTE', c: '#E53935', d: '#7F0000' },
            { n: 'BALROG',            c: '#FF6D00', d: '#7F2100' },
            { n: 'CAVALIERE',         c: '#B0BEC5', d: '#37474F' },
            { n: 'KING CERBERUS',     c: '#4FC3F7', d: '#01579B' },
            { n: 'EBONY & IVORY',     c: '#FFD54F', d: '#795548' },
            { n: 'DR. FAUST',         c: '#EF5350', d: '#B71C1C' }
        ];
// BOSS_PART_END s0.DT_ARMS.1

// Nguồn: index.html:25135 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_SWITCH.1 READ_ONLY
const DT_SWITCH = 460;
// BOSS_PART_END s0.DT_SWITCH.1

// Nguồn: index.html:25138 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_ARM_OF.1 EDITABLE
const DT_ARM_OF = {
            d_stinger:0, d_launch:0, d_million:0, d_shred:0, d_helm:0, d_round:0, d_dash:0, d_back:0, d_drive:0, d_bike:2,
            b_rush:1, b_kick:1, b_ignite:1, b_realimpact:1,
            c_charge:2, c_wheel:2,
            k_ice:3, k_bolt:3, k_fire:3, k_revolver:3,
            g_ei:4, g_coyote:4, g_rain:4, g_twosome:4,
            f_hat:5, f_orb:5, f_redhot:5,
            d_comboA:0, d_hightime:0, d_air:0, d_gun:4           // @@HE-DANTE-DMC
        };
// BOSS_PART_END s0.DT_ARM_OF.1

// Nguồn: index.html:25149 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_COMBO_KHONG.1 EDITABLE
const DT_COMBO_KHONG = [
            ['d_hightime','d_gun'],
            ['g_coyote','d_hightime'],
            ['d_round','g_ei'],
            ['k_bolt','d_hightime'],
            ['g_ei','d_round'],
            ['d_gun','d_hightime','g_coyote'],
            ['k_revolver','d_hightime','d_gun']
        ];
// BOSS_PART_END s0.DT_COMBO_KHONG.1

// Nguồn: index.html:25160 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_COMBO_GAN.1 EDITABLE
const DT_COMBO_GAN = [
            // @@HE-DANTE-DMC — combo REBELLION/DSD + Style Switch
            ['d_comboA','d_hightime'],
            ['d_comboA','d_stinger','d_million'],
            ['d_comboA','d_gun','d_comboA','d_helm'],
            ['d_comboA','d_drive'],                        // 3 nhat -> Drive & Overdrive
            ['d_jab','d_comboA','d_hightime'],
            ['d_comboA','b_rush','b_realimpact'],          // doi Balrog -> Real Impact ket lieu
            ['d_stinger','d_comboA','d_hightime'],
            ['d_comboA','k_revolver','k_fire'],            // doi Cerberus xoay bang roi quat lua
            ['d_stinger','d_million','d_helm'],
            ['d_launch','d_shred','d_helm'],
            ['d_trick','d_stinger','d_million'],
            ['d_jab','d_launch','d_shred'],
            ['d_stinger','b_rush','b_ignite'],
            ['b_rush','b_kick','b_realimpact'],            // combo Balrog full
            ['k_revolver','k_ice','k_bolt'],               // combo Cerberus 3 he
            ['d_shred','c_wheel'],
            ['k_ice','k_fire','k_bolt'],
            ['d_phantom','d_million','d_round'],
            ['c_wheel','d_helm'],
            ['d_launch','g_coyote'],
            ['b_kick','d_stinger','d_shred'],
            ['k_fire','d_shred'],
            ['f_hat','b_rush','b_realimpact'],
            ['d_helm','k_ice','k_bolt'],
            ['g_rain','d_helm'],
            // GAN roi LUI RA ban: doi cu ly ngay giua chuoi
            ['d_stinger','d_million','d_back','g_twosome','g_coyote'],
            ['b_rush','b_kick','d_back','f_redhot'],
            ['d_launch','d_helm','d_back','d_drive'],
            ['k_revolver','k_fire','d_back','g_coyote']
        ];
// BOSS_PART_END s0.DT_COMBO_GAN.1

// Nguồn: index.html:25195 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_COMBO_XA.1 EDITABLE
const DT_COMBO_XA = [
            ['g_ei','g_coyote'],
            ['g_twosome','d_drive'],
            ['g_rain','g_ei'],
            ['f_orb','f_hat'],
            ['f_redhot','g_twosome'],
            ['d_drive','d_trick','d_stinger'],
            ['d_round','d_trick','d_stinger'],
            ['c_charge','c_wheel'],
            ['k_ice','k_bolt'],
            ['f_orb','d_trick','d_million'],
            ['g_coyote','d_trick','d_launch'],
            ['d_round','g_twosome'],
            ['c_charge','b_ignite'],
            ['g_rain','g_coyote'],
            ['f_hat','g_ei'],
            ['f_redhot','k_bolt'],
            ['g_rain','f_orb'],
            ['f_hat','c_charge'],
            ['k_fire','f_orb'],
            ['b_ignite','g_rain']
        ];
// BOSS_PART_END s0.DT_COMBO_XA.1

// Nguồn: index.html:25218 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_STANCE.1 EDITABLE
const DT_STANCE = ['d_jab','d_trick','d_phantom'];
// BOSS_PART_END s0.DT_STANCE.1

// Nguồn: index.html:25220 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_TIEPCAN.1 EDITABLE
const DT_TIEPCAN = ['d_bike','d_dash','d_stinger','b_rush','k_revolver'];
// BOSS_PART_END s0.DT_TIEPCAN.1

// Nguồn: index.html:25221 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_CAN.1 EDITABLE
const DT_CAN     = ['d_million','d_shred','d_round','b_kick','b_ignite','b_realimpact',
                            'c_charge','c_wheel','k_ice','k_bolt','k_fire','k_revolver','d_jab','d_comboA'];
// BOSS_PART_END s0.DT_CAN.1

// Nguồn: index.html:25223 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.DT_XA.1 EDITABLE
const DT_XA      = ['g_ei','g_coyote','g_rain','g_twosome','f_hat','f_orb','f_redhot','d_drive'];
// BOSS_PART_END s0.DT_XA.1

// Nguồn: index.html:25298 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.drawDanteBody.1 EDITABLE
function drawDanteBody(b, x, y){
            let dr = b.facingLeft ? -1 : 1, cxb = x + DT_W/2;
            let arm = (b.arms !== undefined) ? b.arms : 0, A = DT_ARMS[arm] || DT_ARMS[0];
            let walkCycle = Math.sin((b.walk || 0) * 0.18) * 3.5;
            let sway = Math.sin(frames * 0.065) * 2.2 + (b.dashV ? -Math.abs(b.dashV) * 0.45 : 0);

            ctx.save();
            ctx.translate(cxb,y+32);ctx.scale(dr*(b._swordTurn===undefined?1:b._swordTurn),1);ctx.rotate(b._swordLean||0);ctx.translate(-cxb,-y-32);

            // 1. KIEM DEVIL SWORD DANTE SAU LUNG (khi chua rut hoac dang cam vu khi khac)
            if (!b._swordCustom && (!b.drawn || (arm !== 0 && arm !== 2))){
                ctx.save(); ctx.translate(cxb - 6, y + 18); ctx.rotate(0.48);
                // Luoi kiem to ban xam den + khe do giua than
                ctx.fillStyle = "#263238";
                ctx.beginPath(); ctx.moveTo(-5, -34); ctx.lineTo(5, -34); ctx.lineTo(3, 18); ctx.lineTo(0, 26); ctx.lineTo(-3, 18); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#E53935"; ctx.fillRect(-1, -30, 2, 42);
                // Ho thu xuong quy
                ctx.fillStyle = "#455A64";
                ctx.beginPath(); ctx.moveTo(-9, -32); ctx.lineTo(9, -32); ctx.lineTo(5, -37); ctx.lineTo(-5, -37); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#3E2723"; ctx.fillRect(-2.5, -45, 5, 9);
                ctx.restore();
            }

            // 2. TA AO KHOAC DO BAY PHAP PHOI (2 lop vat ao rach bui bam)
            ctx.fillStyle = "#5F0909";
            ctx.beginPath();
            ctx.moveTo(cxb - 12, y + 24);
            ctx.quadraticCurveTo(cxb - 34 + sway * 2.2, y + 42, cxb - 30 + sway * 3.2, y + DT_H - 1);
            ctx.lineTo(cxb - 18 + sway * 2, y + DT_H - 6);
            ctx.lineTo(cxb - 10 + sway * 1.5, y + DT_H);
            ctx.lineTo(cxb - 1, y + DT_H - 5);
            ctx.lineTo(cxb - 2, y + 24);
            ctx.closePath(); ctx.fill();

            ctx.fillStyle = "#8E1414";
            ctx.beginPath();
            ctx.moveTo(cxb - 11, y + 26);
            ctx.quadraticCurveTo(cxb - 25 + sway * 1.6, y + 43, cxb - 21 + sway * 2.4, y + DT_H - 3);
            ctx.lineTo(cxb - 4, y + DT_H - 6);
            ctx.lineTo(cxb - 3, y + 26);
            ctx.closePath(); ctx.fill();

            // The boss kick string uses two articulated legs instead of an extra overlay leg.
            if(b._closeKick){
                const t=b._closeKick.t,high=b._closeKick.high;
                const legs=[{kx:cxb-7,ky:y+49,fx:cxb-7,fy:y+59},{kx:cxb+7+t*18,ky:y+48-t*15,fx:cxb+9+t*(high?32:50),fy:y+59-t*(high?47:27)}];
                ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
                for(const leg of legs){ctx.strokeStyle='#21212b';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(cxb+(leg===legs[0]?-5:5),y+40);ctx.lineTo(leg.kx,leg.ky);ctx.lineTo(leg.fx,leg.fy);ctx.stroke();ctx.fillStyle='#373746';ctx.fillRect(leg.kx-3,leg.ky-2,6,4);ctx.fillStyle='#ff6d00';ctx.fillRect(leg.fx-4,leg.fy-6,12,8);ctx.fillStyle='#ffd54f';ctx.fillRect(leg.fx-2,leg.fy-5,8,2);}
                ctx.restore();
            }else{
            // 3. CHAN + GIAY BOOTS + GIAP CHAN BALROG (neu dang cam Balrog)
            let lOff = (!b.grounded) ? -3 : walkCycle, rOff = (!b.grounded) ? 2 : -walkCycle;
            // Quan da den
            ctx.fillStyle = "#21212B";
            ctx.fillRect(cxb - 10, y + 40, 8, 15 + lOff * 0.3);
            ctx.fillRect(cxb + 2, y + 40, 8, 15 + rOff * 0.3);
            // Giap goi
            ctx.fillStyle = "#373746";
            ctx.fillRect(cxb - 9, y + 44, 6, 4); ctx.fillRect(cxb + 3, y + 44, 6, 4);
            // Giay Boots (neu arm === 1 Balrog thi boc giap lua cam)
            if (arm === 1){
                ctx.fillStyle = "#FF6D00";
                ctx.fillRect(cxb - 12, y + DT_H - 9, 11, 9);
                ctx.fillRect(cxb + 1, y + DT_H - 9, 11, 9);
                ctx.fillStyle = "#FFD54F";
                ctx.fillRect(cxb - 10, y + DT_H - 7, 7, 3);
                ctx.fillRect(cxb + 3, y + DT_H - 7, 7, 3);
            } else {
                ctx.fillStyle = "#121217";
                ctx.fillRect(cxb - 12, y + DT_H - 6, 11, 6);
                ctx.fillRect(cxb + 1, y + DT_H - 6, 11, 6);
                ctx.fillStyle = "#78909C"; // khoa giay bac
                ctx.fillRect(cxb - 5, y + DT_H - 5, 3, 2);
                ctx.fillRect(cxb + 8, y + DT_H - 5, 3, 2);
            }

            }

            // 4. THAN AO TRONG (Henley den xam + day dai nguc + that lung)
            ctx.fillStyle = "#1A1B24"; ctx.fillRect(cxb - 9, y + 15, 18, 27);
            // Nep ao & co V
            ctx.fillStyle = "#2C2E3B"; ctx.fillRect(cxb - 4, y + 16, 8, 24);
            ctx.fillStyle = "#D7B18A";
            ctx.beginPath(); ctx.moveTo(cxb - 3, y + 15); ctx.lineTo(cxb + 3, y + 15); ctx.lineTo(cxb, y + 20); ctx.closePath(); ctx.fill();
            // Day dai cheo nguc
            ctx.strokeStyle = "#3E2723"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cxb - 8, y + 16); ctx.lineTo(cxb + 8, y + 34); ctx.stroke();
            ctx.fillStyle = "#CFD8DC"; ctx.fillRect(cxb - 2, y + 23, 4, 4); // Khoa bac giua nguc
            // That lung
            ctx.fillStyle = "#3E2723"; ctx.fillRect(cxb - 10, y + 39, 20, 3);
            ctx.fillStyle = "#FFD54F"; ctx.fillRect(cxb - 2, y + 38.5, 5, 4);

            // 5. AO KHOAC DO TRENCHCOAT (Ve ao + Co ao dung + Cầu vai)
            ctx.fillStyle = "#B71C1C";
            // Ve trai
            ctx.beginPath();
            ctx.moveTo(cxb - 13, y + 14); ctx.lineTo(cxb - 5, y + 15);
            ctx.lineTo(cxb - 6, y + 45); ctx.lineTo(cxb - 15, y + 45);
            ctx.closePath(); ctx.fill();
            // Ve phai
            ctx.beginPath();
            ctx.moveTo(cxb + 5, y + 15); ctx.lineTo(cxb + 13, y + 14);
            ctx.lineTo(cxb + 15, y + 45); ctx.lineTo(cxb + 6, y + 45);
            ctx.closePath(); ctx.fill();
            // Vien ve ao sang + cuc ao bac
            ctx.fillStyle = "#E53935";
            ctx.fillRect(cxb - 7, y + 16, 2, 26); ctx.fillRect(cxb + 5, y + 16, 2, 26);
            ctx.fillStyle = "#ECEFF1";
            for (let k = 0; k < 3; k++){
                ctx.fillRect(cxb - 9, y + 20 + k * 7, 1.5, 1.5);
                ctx.fillRect(cxb + 7.5, y + 20 + k * 7, 1.5, 1.5);
            }
            // Co ao dung + Cau vai
            ctx.fillStyle = "#C62828";
            ctx.beginPath();
            ctx.moveTo(cxb - 12, y + 16); ctx.lineTo(cxb - 9, y + 9); ctx.lineTo(cxb + 9, y + 9); ctx.lineTo(cxb + 12, y + 16);
            ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#D32F2F"; ctx.fillRect(cxb - 16, y + 13, 32, 5);
            ctx.fillStyle = "#FFCDD2"; ctx.fillRect(cxb - 15, y + 13, 8, 1.5); ctx.fillRect(cxb + 7, y + 13, 8, 1.5);

            // KHAN QUANG ANH SANG DO DR. FAUST (khi cam Dr. Faust)
            if (arm === 5){
                ctx.save();
                ctx.shadowColor = "#FF1744"; ctx.shadowBlur = 10;
                ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 4; ctx.lineCap = "round";
                ctx.beginPath();
                ctx.moveTo(cxb - 8, y + 15);
                ctx.quadraticCurveTo(cxb + 2, y + 20, cxb + 10, y + 15);
                ctx.quadraticCurveTo(cxb - 22 + sway * 3, y + 26, cxb - 34 + sway * 4, y + 42);
                ctx.stroke();
                ctx.restore();
            }

            // 6. TAY TRAI (Tay sau)
            let ar = b.armR || 0, al = b.armL || 0;
            if (b.stab > 0) ar = -1.55 + (Math.random() - 0.5) * 0.25;
            ctx.save(); ctx.translate(cxb - 13, y + 19); ctx.rotate(al);
            ctx.fillStyle = "#8E1B1B"; ctx.fillRect(-3.5, 0, 7, 13);
            ctx.fillStyle = "#263238"; ctx.fillRect(-4, 11, 8, 3); // xam co tay
            ctx.fillStyle = (arm === 1) ? "#FF6D00" : "#1C1C24"; ctx.fillRect(-3.5, 14, 7, 5); // gang tay
            // Neu dang ban Ebony & Ivory -> tay trai cam khau Ebony (den)
            if (b.drawn && arm === 4){
                ctx.translate(0, 17); ctx.rotate(-1.1);
                ctx.fillStyle = "#212121"; ctx.fillRect(-2.5, -14, 5, 13);
                ctx.fillStyle = "#FFD54F"; ctx.fillRect(-1.5, -13, 2, 10);
            }
            ctx.restore();

            // 7. DAU + KHUON MAT + TOC BAC DANTE DMC5
            // Khuon mat + rau lam ram nhe o cam
            ctx.fillStyle = "#E8C9A0"; ctx.fillRect(cxb - 7, y + 2, 14, 13);
            ctx.fillStyle = "#C5A37E"; ctx.fillRect(cxb - 6, y + 12, 12, 3); // bong cam / rau
            // Mat xanh bang lanh lung + long may
            ctx.fillStyle = "#B0BEC5"; ctx.fillRect(cxb - 6, y + 6, 4, 1.2); ctx.fillRect(cxb + 1, y + 6, 5, 1.2);
            ctx.fillStyle = "#29B6F6"; ctx.fillRect(cxb + 1.5, y + 7.5, 4, 2.2); ctx.fillRect(cxb - 5.5, y + 7.5, 3, 2.2);
            ctx.fillStyle = "#FFFFFF"; ctx.fillRect(cxb + 3, y + 7.5, 1.5, 1.2);
            // Toc bac nhieu lop ru xuong + bay theo gio
            let hairSway = sway * 0.45;
            ctx.fillStyle = "#CFD8DC"; // lop toc bong duoi
            ctx.beginPath();
            ctx.moveTo(cxb - 11, y + 11); ctx.lineTo(cxb - 12 + hairSway, y + 2);
            ctx.lineTo(cxb - 7 + hairSway, y - 5); ctx.lineTo(cxb + 2, y - 6);
            ctx.lineTo(cxb + 10, y - 2); ctx.lineTo(cxb + 11, y + 8);
            ctx.closePath(); ctx.fill();

            ctx.fillStyle = "#F5F7FA"; // lop toc sang tren + mai che tran
            ctx.beginPath();
            ctx.moveTo(cxb - 9, y + 8);
            ctx.lineTo(cxb - 10 + hairSway, y - 2);
            ctx.lineTo(cxb - 4 + hairSway, y - 7);
            ctx.lineTo(cxb + 1, y - 3);
            ctx.lineTo(cxb + 5, y - 7);
            ctx.lineTo(cxb + 10, y - 2);
            ctx.lineTo(cxb + 9, y + 7);
            ctx.lineTo(cxb + 6, y + 4);
            ctx.lineTo(cxb + 3, y + 9); // lon toc mai ru giua mat
            ctx.lineTo(cxb, y + 4);
            ctx.lineTo(cxb - 4, y + 8);
            ctx.closePath(); ctx.fill();

            // Neu cam Dr. Faust -> Doi mu cao boi phu thuy tren dau (khi mu khong bay di)
            if (arm === 5 && !b.hat){
                ctx.save(); ctx.translate(cxb, y - 1);
                ctx.fillStyle = "#3E0A0A"; ctx.fillRect(-15, 0, 30, 3.5);
                ctx.fillStyle = "#8E1414";
                ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(10, 0); ctx.lineTo(6, -11); ctx.lineTo(-4, -9); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FF1744"; ctx.fillRect(-9, -2.5, 18, 2);
                ctx.restore();
            }

            // 8. TAY PHAI (Tay truoc) + VU KHI CHI TIET
            let stabOffset = (b.stab || 0) * 10;
            if(!b._swordCustom){
            ctx.save(); ctx.translate(cxb + 12 + stabOffset, y + 19); ctx.rotate(ar);
            ctx.fillStyle = "#A31515"; ctx.fillRect(-3.5, 0, 7, 13);
            ctx.fillStyle = "#263238"; ctx.fillRect(-4, 11, 8, 3);
            ctx.fillStyle = (arm === 1) ? "#FF6D00" : "#1C1C24"; ctx.fillRect(-3.5, 14, 7, 5);

            if (b.drawn){
                ctx.save();
                ctx.translate(0, 17); ctx.rotate(-1.05);
                ctx.shadowColor = A.c; ctx.shadowBlur = 12;

                if (arm === 0){                                   // [0] DEVIL SWORD DANTE — Dai kiem huyet quy
                    // Chuoi kiem + Ho thu xuong so
                    ctx.fillStyle = "#263238"; ctx.fillRect(-2.5, 0, 5, 12);
                    ctx.fillStyle = "#B71C1C"; ctx.beginPath(); ctx.arc(0, 13, 3.5, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#37474F";
                    ctx.beginPath();
                    ctx.moveTo(-11, -5); ctx.lineTo(-3, 2); ctx.lineTo(3, 2); ctx.lineTo(11, -5);
                    ctx.lineTo(6, -9); ctx.lineTo(-6, -9); ctx.closePath(); ctx.fill();
                    // Luoi kiem to ban + khe nang luong do ruc
                    ctx.fillStyle = "#90A4AE";
                    ctx.beginPath();
                    ctx.moveTo(-6, -8); ctx.lineTo(-8, -28); ctx.lineTo(-5.5, -56);
                    ctx.lineTo(0, -68);
                    ctx.lineTo(5.5, -56); ctx.lineTo(8, -28); ctx.lineTo(6, -8);
                    ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#263238";
                    ctx.beginPath(); ctx.moveTo(-3.5, -8); ctx.lineTo(0, -62); ctx.lineTo(3.5, -8); ctx.closePath(); ctx.fill();
                    // Mach lua do giua than kiem
                    ctx.fillStyle = "#FF1744"; ctx.fillRect(-1.5, -58, 3, 50);
                    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(-0.6, -54, 1.2, 44);
                } else if (arm === 1){                            // [1] BALROG — Gang tay giap quy boc lua
                    ctx.fillStyle = "#263238";
                    ctx.beginPath(); ctx.moveTo(-8, -16); ctx.lineTo(8, -16); ctx.lineTo(10, 4); ctx.lineTo(-10, 4); ctx.closePath(); ctx.fill();
                    // Cac ranh dung nham phat sang
                    ctx.fillStyle = "#FF6D00"; ctx.fillRect(-7, -13, 14, 4); ctx.fillRect(-6, -6, 12, 3);
                    ctx.fillStyle = "#FFD54F"; ctx.fillRect(-5, -12, 10, 2);
                    for (let k = 0; k < 5; k++){
                        ctx.fillStyle = k % 2 ? "#FFEA00" : "#FF3D00";
                        ctx.beginPath(); ctx.arc((Math.random() - 0.5) * 16, -16 - Math.random() * 14, 2.5 + Math.random()*2, 0, 6.28); ctx.fill();
                    }
                } else if (arm === 2){                            // [2] CAVALIERE — Banh xe rang cua doi
                    ctx.fillStyle = "#37474F"; ctx.fillRect(-6, -36, 12, 36);
                    ctx.fillStyle = "#FF6D00"; ctx.fillRect(-2, -32, 4, 24);
                    ctx.save(); ctx.translate(0, -42); ctx.rotate(frames * 0.55);
                    ctx.fillStyle = "#263238"; ctx.beginPath(); ctx.arc(0, 0, 15, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "#ECEFF1"; ctx.lineWidth = 2.5;
                    for (let k = 0; k < 8; k++){
                        let a2 = k * 0.785;
                        ctx.beginPath(); ctx.moveTo(Math.cos(a2)*9, Math.sin(a2)*9); ctx.lineTo(Math.cos(a2)*18, Math.sin(a2)*18); ctx.stroke();
                    }
                    ctx.strokeStyle = "#40C4FF"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.arc(0, 0, 11, 0, 6.28); ctx.stroke();
                    ctx.restore();
                } else if (arm === 3){                            // [3] KING CERBERUS — Con tam khuc 3 he
                    let cCol = ["#FF5722", "#FFEA00", "#00E5FF"][(b.cerb || 0) % 3];
                    ctx.shadowColor = cCol;
                    // Khuc 1 (cam tay)
                    ctx.strokeStyle = "#37474F"; ctx.lineWidth = 6; ctx.lineCap = "round";
                    ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(0, -24); ctx.stroke();
                    ctx.strokeStyle = cCol; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(0, 2); ctx.lineTo(0, -22); ctx.stroke();
                    // Day xich nang luong noi 2 khuc kia
                    let swing = Math.sin(frames * 0.35) * 10;
                    ctx.strokeStyle = "#FFF"; ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.moveTo(0, -24); ctx.lineTo(8 + swing, -46); ctx.moveTo(0, -24); ctx.lineTo(-8 - swing*0.7, -42); ctx.stroke();
                    ctx.strokeStyle = cCol; ctx.lineWidth = 5;
                    ctx.beginPath(); ctx.moveTo(3 + swing*0.4, -30); ctx.lineTo(12 + swing, -52); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(-3 - swing*0.3, -28); ctx.lineTo(-11 - swing*0.8, -48); ctx.stroke();
                } else if (arm === 4){                            // [4] EBONY & IVORY — Khau Ivory trang bac
                    ctx.fillStyle = "#CFD8DC"; ctx.fillRect(-3, -22, 6, 18);
                    ctx.fillStyle = "#5D4037"; ctx.fillRect(-3, -6, 5, 8);
                    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(-2, -21, 3, 15);
                    ctx.fillStyle = "#FFD54F"; ctx.fillRect(-1, -22, 2, 3);
                } else {                                          // [5] DR. FAUST — Vong xoay Red Orb tren tay
                    ctx.fillStyle = "#B71C1C";
                    ctx.beginPath(); ctx.moveTo(-16, 0); ctx.lineTo(16, 0); ctx.lineTo(4, -28); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#3E0A0A"; ctx.fillRect(-18, -3, 36, 4);
                    for (let k = 0; k < 3; k++){
                        let oa = frames * 0.18 + k * 2.09;
                        ctx.fillStyle = "#FF1744";
                        ctx.beginPath(); ctx.arc(Math.cos(oa)*14, -14 + Math.sin(oa)*6, 3, 0, 6.28); ctx.fill();
                    }
                }
                ctx.restore();
            }
            ctx.restore();
            }
            ctx.restore();
        }
// BOSS_PART_END s0.drawDanteBody.1

// Nguồn: index.html:25582 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s0.drawDtOverlay.1 EDITABLE
function drawDtOverlay(b, x, y){
            let dr = b.facingLeft ? -1 : 1, W = 52, H = 76, cxb = x + W/2;
            let pu = 0.5 + 0.5 * Math.sin(frames * 0.14);
            ctx.save();
            ctx.translate(cxb, y); ctx.scale(dr, 1); ctx.translate(-cxb, -y);
            // Canh quy do den xoè sau lung
            ctx.globalAlpha = 0.62 + 0.18 * pu;
            for (let lay = 0; lay < 2; lay++){
                ctx.fillStyle = lay === 0 ? "#4A0707" : "#D50000";
                let e = lay === 0 ? 7 : 0;
                for (let sg = -1; sg <= 1; sg += 2){
                    ctx.beginPath();
                    ctx.moveTo(cxb, y + 20 - e);
                    ctx.quadraticCurveTo(cxb + sg*(44 + e + pu*7), y - 10 - e, cxb + sg*(28 + e), y + 48 + e);
                    ctx.quadraticCurveTo(cxb + sg*(18 + e), y + 26, cxb, y + 20 - e);
                    ctx.fill();
                }
            }
            // Lop giap nang luong do phu len than
            ctx.globalAlpha = 0.32 + 0.12 * pu;
            ctx.fillStyle = "#FF1744";
            ctx.fillRect(x + 12, y + 14, W - 24, H - 30);
            ctx.beginPath(); ctx.ellipse(cxb, y + 12, 13, 14, 0, 0, 6.28); ctx.fill();
            // Sung quy
            ctx.globalAlpha = 0.95;
            ctx.fillStyle = "#260E0C"; ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 1.2;
            for (let sg = -1; sg <= 1; sg += 2){
                ctx.beginPath();
                ctx.moveTo(cxb + sg*7, y + 4);
                ctx.quadraticCurveTo(cxb + sg*20, y - 7, cxb + sg*16, y - 18);
                ctx.quadraticCurveTo(cxb + sg*11, y - 6, cxb + sg*4, y + 3);
                ctx.closePath(); ctx.fill(); ctx.stroke();
            }
            // Mat sang ruc + vet keo sang
            ctx.globalAlpha = 0.9 + 0.1 * pu;
            ctx.fillStyle = "#FFEA00";
            ctx.fillRect(cxb - 8, y + 8, 6, 3); ctx.fillRect(cxb + 3, y + 8, 6, 3);
            // Tia dien do cam chay quanh nguoi
            ctx.strokeStyle = "#FF9100"; ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let k = 0; k < 3; k++){
                let lx = cxb + (Math.random() - 0.5) * 32, ly = y + 10 + Math.random() * 50;
                ctx.moveTo(lx, ly); ctx.lineTo(lx + (Math.random() - 0.5) * 14, ly - 12);
            }
            ctx.stroke();
            ctx.restore();
        }
// BOSS_PART_END s0.drawDtOverlay.1

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

// Nguồn: index.html:35125 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s1.resolveSolidPillars.1 READ_ONLY
function resolveSolidPillars(ent) {
            if (mapTheme !== 'volcano' && mapTheme !== 'tetris' && !wildernessOn()) return;
            for (let pf of platforms) {
                if (!pf.pillar) continue;
                if (ent.x + ent.w <= pf.x || ent.x >= pf.x + pf.w) continue;
                if (ent.y + ent.h <= pf.top + (mapTheme==='tetris'?6:30)) continue;
                if (ent.y >= pf.top + pf.h) continue;
                if ((ent.x + ent.w / 2) < (pf.x + pf.w / 2)) ent.x = pf.x - ent.w;
                else ent.x = pf.x + pf.w;
            }
            if (ent.x < 0) ent.x = 0;
            if (ent.x > worldR() - ent.w) ent.x = worldR() - ent.w;
        }
// BOSS_PART_END s1.resolveSolidPillars.1

// Nguồn: index.html:35139 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s1.resolveTetrisWalls.1 READ_ONLY
function resolveTetrisWalls(ent, dx){
            if (mapTheme !== 'tetris' || !tetris) return; let T=tetris;
            let topR=Math.floor((ent.y+2 - T.worldTop)/T.cell), botR=Math.floor((ent.y+ent.h-2 - T.worldTop)/T.cell);
            if (dx>0){ let ec=Math.floor((ent.x+ent.w - T.fx)/T.cell);
                for (let r=topR;r<=botR;r++){ if (r>=0&&r<T.rows&&ec>=0&&ec<T.cols&&T.grid[r][ec]){ ent.x=T.fx+ec*T.cell-ent.w-0.01; break; } } }
            else if (dx<0){ let ec=Math.floor((ent.x - T.fx)/T.cell);
                for (let r=topR;r<=botR;r++){ if (r>=0&&r<T.rows&&ec>=0&&ec<T.cols&&T.grid[r][ec]){ ent.x=T.fx+(ec+1)*T.cell+0.01; break; } } }
            if (ent.x<0) ent.x=0; if (ent.x>canvas.width-ent.w) ent.x=canvas.width-ent.w;
        }
// BOSS_PART_END s1.resolveTetrisWalls.1

// Nguồn: index.html:35150 · Dùng bởi: DanteBoss, TetrisBoss
// BOSS_PART_BEGIN s1.tetris.1 READ_ONLY
let tetris = null, tetrisCamY = 0;
// BOSS_PART_END s1.tetris.1

// Nguồn: index.html:98108 · Dùng bởi: DanteBoss, VergilBoss
// BOSS_PART_BEGIN s6.SDTU_DON.1 READ_ONLY
const SDTU_DON = 70, SDTU_TUNG = 340, SDTU_CAN = 70, SDTU_YEU = 380;
// BOSS_PART_END s6.SDTU_DON.1

// Nguồn: index.html:98109 · Dùng bởi: DanteBoss, VergilBoss
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

// Nguồn: index.html:98667 · Dùng bởi: DanteBoss, VergilBoss
// BOSS_PART_BEGIN s6.capSdtUlt.1 READ_ONLY
(function capSdtUlt(){
            for (const C of [typeof VergilBoss !== 'undefined' ? VergilBoss : null,
                             typeof DanteBoss  !== 'undefined' ? DanteBoss  : null]){
                if (typeof C !== 'function') continue;
                for (const k of Object.keys(SDT_ULT)) C.prototype[k] = SDT_ULT[k];
            }
        })();
// BOSS_PART_END s6.capSdtUlt.1

// Nguồn: index.html:99250 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:99261 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:105972 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s12.DSW_MOVES.1 READ_ONLY
const DSW_MOVES={
 a1:{name:'COMBO A · DOWN',T:20,wind:4,end:13,damage:3,pose:'down',advance:5},
 a2:{name:'COMBO A · UP',T:20,wind:4,end:13,damage:3,pose:'up',advance:6},
 a3:{name:'COMBO A · SPIN CLEAVE',T:28,wind:6,end:20,damage:3,pose:'spin',push:10,advance:10},
 bspin:{name:'COMBO B · DOUBLE SPIN',T:34,wind:4,end:28,damage:3,pose:'spin',hits:[8,21],advance:8},
 bstab:{name:'COMBO B · MILLION STAB',T:32,wind:2,end:28,damage:1,pose:'stab',count:6},
 thrust:{name:'POWER THRUST',T:28,wind:10,end:19,damage:5,pose:'thrust',push:19,red:true,advance:14},
 air1:{name:'AERIAL · DOWN',T:18,wind:3,end:11,damage:3,pose:'down'},
 air2:{name:'AERIAL · UP',T:18,wind:3,end:11,damage:3,pose:'up'},
 air3:{name:'AERIAL · CROSS',T:20,wind:4,end:14,damage:3,pose:'cross'},
 air4:{name:'AERIAL · SMASH',T:25,wind:7,end:16,damage:5,pose:'down',slam:true,red:true},
 high:{name:'HIGH TIME',T:26,wind:5,end:16,damage:5,pose:'up',launch:true,red:true},
 helm:{name:'HELM BREAKER',T:24,wind:5,end:17,damage:5,pose:'down',slam:true,red:true},
 stinger:{name:'STINGER',T:24,wind:5,end:16,damage:5,pose:'thrust',push:13,red:true},
 million:{name:'MILLION STAB',T:30,wind:0,end:29,damage:1,pose:'stab',count:6},
 prop:{name:'PROP',T:26,wind:4,end:19,damage:3,pose:'prop',launch:'prop',red:true},
 shred:{name:'SHREDDER',T:28,wind:0,end:26,damage:3,pose:'shred',hits:[4,13,22],hold:true,red:true},
 drive:{name:'DRIVE',T:26,wind:7,end:18,damage:3,pose:'up',waves:1,red:true},
 overdrive:{name:'OVERDRIVE',T:44,wind:7,end:30,damage:3,pose:'up',waves:3,red:true},
 round:{name:'ROUND TRIP',T:22,wind:5,end:13,damage:0,pose:'cross',round:true,red:true},
 retreat_round:{name:'ROUND TRIP · BACKSTEP',T:28,wind:6,end:18,damage:0,pose:'cross',round:true,red:true},
 dhit:{name:'DANCE MACABRE · RAM',T:16,wind:3,end:10,damage:5,pose:'ram',advance:10,red:true},
 ddown:{name:'DANCE MACABRE · DOWN',T:18,wind:3,end:11,damage:3,pose:'down',advance:6},
 dup:{name:'DANCE MACABRE · UP',T:18,wind:3,end:11,damage:3,pose:'up',advance:6},
 dcross:{name:'DANCE MACABRE · CROSS',T:20,wind:4,end:13,damage:3,pose:'cross',advance:6},
 dspin:{name:'DANCE MACABRE · SPIN',T:24,wind:4,end:18,damage:3,pose:'spin',advance:8},
 dstab:{name:'DANCE MACABRE · 12 STABS',T:60,wind:0,end:59,damage:1,pose:'stab',count:12,red:true},
 dwave1:{name:'DANCE MACABRE · DRIVE I',T:22,wind:4,end:13,damage:3,pose:'up',waves:1,red:true},
 dwave2:{name:'DANCE MACABRE · DRIVE II',T:22,wind:4,end:13,damage:3,pose:'up',waves:1,red:true},
 dfinish:{name:'DANCE MACABRE · FINISH',T:40,wind:20,end:31,damage:5,pose:'cross',push:24,wall:true,red:true,advance:16}
};
// BOSS_PART_END s12.DSW_MOVES.1

// Nguồn: index.html:106311 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s12.dswPose.1 READ_ONLY
function dswPose(n,a,age){
 const dir=a?a.dir:(n.isFacingLeft?-1:1),m=a||{};
 const progress=a?Math.max(0,Math.min(1,(age-m.wind)/Math.max(1,m.end-m.wind))):0;
 // Hàm nội suy bậc 3 có độ văng (Ease-out cubic) tạo lực chém thật
 const eased=1-Math.pow(1-progress,3);
 const windRatio=a&&m.wind>0?Math.min(1,age/m.wind):1;

 // Tọa độ vai chuẩn trên cơ thể Dante
 const ox=n.x+n.w/2, oy=n.y;
 let angle=0.55, hx=13, hy=25, len=78, flat=1, thrustCone=0, spinbuzz=false;

 if(!a){
  // Tư thế cầm kiếm nghỉ (Idle) tự nhiên bên hông phải
  const breath=Math.sin(frames*0.07)*1.2;
  angle=0.68; hx=12; hy=27+breath; len=74;
 } else {
  switch(m.pose){
   case 'down': // Chém bổ từ trên đỉnh đầu xuống
    if(age<=m.wind){
     angle=-2.35-0.25*windRatio; hx=4-4*windRatio; hy=12-3*windRatio;
    }else{
     angle=-2.6+3.65*eased;
     hx=10+12*Math.sin(eased*Math.PI);
     hy=12+20*eased;
    }
    break;

   case 'up': // Chém vớt ngược từ dưới đất lên trời (Combo A2 / High Time / Drive)
    if(age<=m.wind){
     angle=1.55+0.2*windRatio; hx=6; hy=36;
    }else{
     angle=1.75-3.65*eased;
     hx=10+12*Math.sin(eased*Math.PI);
     hy=36-22*eased;
    }
    break;

   case 'cross': // Chém vắt ngang ngực (Aerial 3 / Dance Macabre Finish)
    if(age<=m.wind){
     angle=-2.65; hx=2; hy=24; flat=0.45;
    }else{
     angle=-2.65+5.1*eased;
     hx=8+14*Math.sin(eased*Math.PI);
     hy=24; flat=0.36;
    }
    break;

   case 'spin': { // Xoay người chém vòng tròn 360 / 720 độ
    const loops=(m.id==='bspin')?2:1;
    angle=-2.5+Math.PI*2*loops*eased;
    hx=10+10*Math.cos(angle);
    hy=25+4*Math.sin(angle);
    flat=0.42;
    break;
   }

   case 'prop': // Xoay kiếm cối xay thẳng đứng trước ngực hất địch lên
   case 'shred': {
    const spd=(m.pose==='shred')?0.85:0.58;
    angle=-(age-m.wind)*spd;
    hx=22; hy=23; len=70; spinbuzz=true;
    break;
   }

   case 'stab': { // Million Stab: Đâm siêu tốc nhiều mũi ở các góc quạt nhỏ
    const count=m.count||6, span=(m.id==='dstab')?60:30;
    const phase=((age*count)/span)%1;
    const jab=Math.sin(phase*Math.PI);
    const fan=Math.sin(age*2.3)*0.16;
    angle=fan;
    hx=8+16*jab; // Cổ tay chỉ vươn trong tầm giải phẫu học (tối đa 24px!)
    hy=24+Math.sin(age*1.9)*4;
    len=78+16*jab;
    thrustCone=jab;
    break;
   }

   case 'thrust': { // Stinger & Power Thrust: Thu kiếm lấy đà rồi phóng mũi giáo đỏ rực!
    if(age<=m.wind){
     angle=0.08; hx=-4*windRatio; hy=26; len=74;
    }else{
     const punch=Math.sin(eased*Math.PI*0.85);
     angle=0;
     hx=22*punch; // Tay duỗi thẳng tự nhiên (22px), KHÔNG kéo giãn tay!
     hy=24;
     len=94;
     thrustCone=punch;
    }
    break;
   }

   case 'ram': // Dance Macabre nhịp 1: Húc vai cận chiến
    angle=2.2; hx=14; hy=24; len=72;
    break;
  }
 }

 if(m.id==='helm'&&m.airWait>3&&!n.grounded){
  angle=1.22; hx=18; hy=22; len=88;
 }
 if(m.red)len+=8;

 const wx=ox+dir*hx, wy=oy+hy;
 return {
  x:wx, y:wy,
  tx:wx+dir*Math.cos(angle)*len,
  ty:wy+Math.sin(angle)*len*flat,
  angle, flat, len, dir, ox, oy,
  red:!!m.red, thrustCone, spinbuzz, pose:m.pose||''
 };
}
// BOSS_PART_END s12.dswPose.1

// Nguồn: index.html:106691 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s12.dswPaintBlade.1 READ_ONLY
function dswPaintBlade(x,y,angle,len=78,red=false,flat=1){
 ctx.save();
 ctx.translate(x,y);
 ctx.scale(1,flat);
 ctx.rotate(angle);

 // 1. Chuôi kiếm & Quả đấm đầu lâu đỏ
 ctx.fillStyle='#1B1F26';
 ctx.fillRect(-16,-2.8,16,5.6);
 ctx.fillStyle='#C62828';
 ctx.fillRect(-13,-1.8,10,3.6);
 ctx.fillStyle='#FFD54F';
 ctx.beginPath();ctx.arc(-17,0,3.2,0,Math.PI*2);ctx.fill();

 // 2. Hộ thủ xương quỷ (Awakened Skull Guard)
 ctx.fillStyle='#37474F';
 ctx.beginPath();
 ctx.moveTo(-2,-13);ctx.lineTo(9,-8);ctx.lineTo(11,0);
 ctx.lineTo(9,8);ctx.lineTo(-2,13);ctx.lineTo(2,0);
 ctx.closePath();ctx.fill();
 ctx.fillStyle='#FF1744';
 ctx.fillRect(3,-4,2.5,2);ctx.fillRect(3,2,2.5,2);

 // 3. Thân lưỡi kiếm Devil Sword Dante (2 nhánh gai thần + khe dung nham đỏ ở giữa)
 ctx.shadowColor='#FF1744';
 ctx.shadowBlur=red?22:8;

 // Lớp hào quang lưỡi kiếm khi phát sáng đỏ (High Time / Stinger / Helm Breaker / Overdrive)
 if(red){
  ctx.fillStyle='rgba(255, 23, 68, 0.32)';
  ctx.beginPath();
  ctx.moveTo(6,-11);ctx.lineTo(len*0.75,-12);ctx.lineTo(len+12,0);
  ctx.lineTo(len*0.75,12);ctx.lineTo(6,11);
  ctx.closePath();ctx.fill();
 }

 // Lưỡi thép bạc vát cạnh sắc lẹm
 const bg=ctx.createLinearGradient(6,0,len,0);
 bg.addColorStop(0,red?'#FF5252':'#90A4AE');
 bg.addColorStop(0.55,red?'#FF8A80':'#ECEFF1');
 bg.addColorStop(1,'#FFFFFF');
 ctx.fillStyle=bg;
 ctx.beginPath();
 ctx.moveTo(6,-6.5);
 ctx.lineTo(len*0.28,-8.5);
 ctx.lineTo(len*0.34,-6);
 ctx.lineTo(len*0.76,-7.5);
 ctx.lineTo(len,0);
 ctx.lineTo(len*0.76,7.5);
 ctx.lineTo(len*0.34,6);
 ctx.lineTo(len*0.28,8.5);
 ctx.lineTo(6,6.5);
 ctx.closePath();ctx.fill();

 // Sống kiếm đen xám
 ctx.fillStyle='#263238';
 ctx.beginPath();
 ctx.moveTo(8,-3.8);ctx.lineTo(len-10,0);ctx.lineTo(8,3.8);
 ctx.closePath();ctx.fill();

 // Mạch dung nham huyết quỷ phát sáng dọc tâm kiếm
 ctx.strokeStyle=red?'#FFF8E1':'#FF1744';
 ctx.lineWidth=red?3.2:2.2;
 ctx.beginPath();ctx.moveTo(9,0);ctx.lineTo(len-8,0);ctx.stroke();

 ctx.restore();
}
// BOSS_PART_END s12.dswPaintBlade.1

// Nguồn: index.html:106769 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s12.dswPaintArmIK.1 READ_ONLY
function dswPaintArmIK(sx,sy,wx,wy,dir){
 const dx=wx-sx, dy=wy-sy;
 const dist=Math.min(28,Math.hypot(dx,dy));
 const baseAng=Math.atan2(dy,dx);
 // Tính khớp khuỷu tay cong tự nhiên xuống dưới
 const bend=Math.sqrt(Math.max(0,15*15-(dist*0.5)*(dist*0.5)))*0.55;
 const ex=sx+dx*0.5-dir*Math.sin(baseAng)*bend*0.35;
 const ey=sy+dy*0.5+Math.abs(Math.cos(baseAng))*bend+3;

 ctx.save();
 ctx.lineCap='round';ctx.lineJoin='round';
 // Bóng áo khoác ngoài
 ctx.strokeStyle='#5F0909';ctx.lineWidth=9.5;
 ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(ex,ey);ctx.lineTo(wx,wy);ctx.stroke();
 // Tay áo khoác đỏ Trenchcoat
 ctx.strokeStyle='#B71C1C';ctx.lineWidth=7;
 ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(ex,ey);ctx.lineTo(wx,wy);ctx.stroke();
 // Đai cổ tay bạc
 ctx.fillStyle='#CFD8DC';
 ctx.beginPath();ctx.arc(wx-dx*0.12,wy-dy*0.12,3.6,0,Math.PI*2);ctx.fill();
 // Bàn tay đeo găng da đen nắm đốc kiếm
 ctx.fillStyle='#1C1C24';
 ctx.beginPath();ctx.arc(wx,wy,4.5,0,Math.PI*2);ctx.fill();
 ctx.restore();
}
// BOSS_PART_END s12.dswPaintArmIK.1

// Nguồn: index.html:106939 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s12.BLR_MOVES.1 READ_ONLY
const BLR_MOVES = {
 flydragon1:{name:'FLY DRAGON · RUSH PUNCH',T:28,wind:5,cancel:20,end:18,damage:4,pose:'magmaFin',hits:[8],heat:1,fire:true},
 flydragon2:{name:'FLY DRAGON · RISING FINISH',T:30,wind:6,cancel:24,end:20,damage:6,pose:'upper',hits:[9],launch:true,heat:1.5,fire:true},
 // 1. COMBO A CHUẨN BALROG DMC5 (Nhấp J -> J -> J -> J):
 // Nhịp 1: Đấm thẳng 1-2 (Jab & Straight) bước vào
 j1: { name: 'BLOW COMBO · ONE-TWO JAB',   T: 20, wind: 2, cancel: 10, end: 15, damage: 1.5, pose: 'oneTwo',   hits: [3, 8],  advance: 7,  heat: 1 },
 // Nhịp 2: Lắc vai đấm móc sườn (Liver Hook) gom mục tiêu
 j2: { name: 'BLOW COMBO · LIVER HOOK',    T: 20, wind: 3, cancel: 10, end: 15, damage: 2.5, pose: 'bodyHook', hits: [5],     advance: 8,  heat: 1.5 },
 // Nhịp 3: Đấm xoáy ốc + Quay lưng tạt quyền (Corkscrew & Backfist - 2 hits)
 j3: { name: 'BLOW COMBO · CORKSCREW SPIN',T: 24, wind: 3, cancel: 14, end: 19, damage: 2.0, pose: 'corkspin', hits: [5, 11], advance: 9,  heat: 1.5, fire: true },
 // Nhịp 4: Siêu Trọng Quyền nổ lửa đẩy văng (Magma Straight Finisher)
 j4: { name: 'BLOW COMBO · MAGMA STRAIGHT',T: 28, wind: 6, cancel: 18, end: 20, damage: 5.0, pose: 'magmaFin', hits: [8],     advance: 13, push: 15, heat: 2, fire: true },

 // 2. GIỮ J (Hold J): Đấm liên hoàn máy khâu (Light Blow) -> Kết bằng Heavy Jolt
 rjab:  { name: 'LIGHT BLOW · RAPID JAB', T: 24, wind: 0, cancel: 20, end: 23, damage: 0.5, pose: 'rjab', count: 6, heat: 0.45 },
 hjolt: { name: 'HEAVY JOLT',             T: 24, wind: 5, cancel: 16, end: 15, damage: 5,   pose: 'magmaFin', hits: [6], advance: 14, push: 18, heat: 2, fire: true },

 // 3. COMBO B (Nhấp K -> K -> K): Vũ điệu Capoeira
 k1: { name: 'KICK · BREAK SPIRAL I',  T: 24, wind: 3, cancel: 15, end: 19, damage: 2, pose: 'capo', hits: [6, 14], advance: 6, heat: 2 },
 k2: { name: 'KICK · BREAK SPIRAL II', T: 24, wind: 3, cancel: 15, end: 19, damage: 2, pose: 'capo', hits: [6, 14], advance: 7, heat: 2, fire: true },
 k3: { name: 'KICK · AXE HEEL DROP',   T: 28, wind: 7, cancel: 20, end: 18, damage: 5, pose: 'heel', hits: [9],    advance: 9, launch: 'prop', heat: 2, fire: true },

 // 4. ĐÒN LƯỚT & ĐẶC BIỆT (Dash J / J->Jump / Cúi K / Cúi J)
 mdragon: { name: 'MINIMUM DRAGON',       T: 19, wind: 3, cancel: 10, end: 13, damage: 4, pose: 'magmaFin', hits: [5], advance: 13, stunOnly: 28, heat: 2, fire: true },
 updraft: { name: 'UPDRAFT UPPERCUT',     T: 24, wind: 3, cancel: 13, end: 16, damage: 4, pose: 'upper',    hits: [5], launch: true, heat: 2, fire: true },
 fwave:   { name: 'IGNITION SPIRAL WAVE', T: 26, wind: 5, cancel: 16, end: 19, damage: 4, pose: 'waveK',    hits: [6], wave: true, heat: 2, fire: true },
 bantam:  { name: 'BANTAM REVENGE',       T: 26, wind: 0, cancel: 22, end: 22, damage: 0, pose: 'guard',    guard: true },
 bcounter:{ name: 'BANTAM COUNTER',       T: 22, wind: 3, cancel: 14, end: 14, damage: 4, pose: 'magmaFin', hits: [5], advance: 12, push: 14, fire: true },
 rimpact: { name: 'REAL IMPACT',          T: 52, wind: 8, cancel: 46, end: 40, damage: 3, pose: 'rimpact',  fire: true },

 // 5. PYROMANIA (Dash + K liên tục)
 pyro1: { name: 'PYROMANIA · RUSH',    T: 42, wind: 2, cancel: 36, end: 38, damage: 2, pose: 'pyro',      hits: [5, 11, 17, 23, 29, 35], advance: 5, heat: 1, fire: true },
 pyro2: { name: 'PYROMANIA · CYCLONE', T: 24, wind: 3, cancel: 18, end: 18, damage: 4, pose: 'tatsumaki', hits: [6, 14], launch: 'prop', fire: true },
 pyro3: { name: 'PYROMANIA · FINISH',  T: 32, wind: 11,cancel: 26, end: 21, damage: 5, pose: 'sidekick',  hits: [13], advance: 14, push: 24, wall: true, fire: true },

 // 6. TRÊN KHÔNG (Air JJJ & Flint Wheel Air K)
 airj1: { name: 'AIR BLOW · ONE-TWO',   T: 16, wind: 2, cancel: 9,  end: 12, damage: 2, pose: 'oneTwo',   hits: [3, 8], heat: 1 },
 airj2: { name: 'AIR BLOW · HOOK',      T: 16, wind: 2, cancel: 9,  end: 12, damage: 2, pose: 'bodyHook', hits: [5],    heat: 1 },
 airj3: { name: 'AIR DOUBLE HAMMER',    T: 22, wind: 5, cancel: 16, end: 16, damage: 4, pose: 'slam2',    hits: [7],    slam: true, heat: 2, fire: true },
 fwheel:{ name: 'FLINT WHEEL',          T: 30, wind: 3, cancel: 26, end: 26, damage: 1, pose: 'wheel',    fire: true }
};
// BOSS_PART_END s12.BLR_MOVES.1

// Nguồn: index.html:107515 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s12.blrPaintFistArm.1 READ_ONLY
function blrPaintFistArm(sx, sy, fx, fy, dir, ignited, isPunching = false){
 const dx = fx - sx, dy = fy - sy;
 const ex = sx + dx * 0.42 - dir * 5, ey = sy + dy * 0.42 + 6;
 const fistR = isPunching ? 10.5 : 7.0;
 ctx.save();
 ctx.lineCap = 'round'; ctx.lineJoin = 'round';
 ctx.strokeStyle = '#8E1414'; ctx.lineWidth = 8.5;
 ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
 ctx.shadowColor = '#FF6D00'; ctx.shadowBlur = isPunching ? 24 : (ignited ? 16 : 6);
 ctx.strokeStyle = '#263238'; ctx.lineWidth = isPunching ? 11.5 : 9.5;
 ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(fx, fy); ctx.stroke();
 ctx.strokeStyle = (ignited || isPunching) ? '#FFEA00' : '#FF6D00';
 ctx.lineWidth = isPunching ? 4.8 : 3.4;
 ctx.beginPath(); ctx.moveTo(ex + dx * 0.1, ey + dy * 0.1); ctx.lineTo(fx, fy); ctx.stroke();
 ctx.fillStyle = (ignited || isPunching) ? '#FF6D00' : '#37474F';
 ctx.beginPath(); ctx.arc(fx, fy, fistR, 0, Math.PI * 2); ctx.fill();
 ctx.fillStyle = '#FFF8E1';
 ctx.beginPath(); ctx.arc(fx + dir * 2.5, fy - 1, fistR * 0.45, 0, Math.PI * 2); ctx.fill();
 ctx.restore();
}
// BOSS_PART_END s12.blrPaintFistArm.1

// Nguồn: index.html:107815 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s12.CAV_MOVES.1 READ_ONLY
const CAV_MOVES = {
 // 1. COMBO A (J -> J -> J): Nghiền cưa đa nhịp gom mục tiêu (có thể rẽ nhánh sang K bất kỳ lúc nào)
 j1: { name: 'CAVALIERE · CROSSED IGNITION', T: 26, wind: 4, cancel: 18, end: 22, damage: 1.0, pose: 'crossSaw', hits: [5, 9, 13, 17], advance: 6, pullIn: true },
 j2: { name: 'CAVALIERE · DUAL GRINDER',     T: 28, wind: 3, cancel: 20, end: 24, damage: 1.0, pose: 'grindSaw', hits: [4, 8, 12, 16, 20], advance: 8, drag: true },
 j3: { name: 'CAVALIERE · HIGHSIDE SLAM',    T: 32, wind: 7, cancel: 24, end: 26, damage: 5.0, pose: 'slamSaw',  hits: [10], advance: 10, push: 14, spark: true },

 // 2. HẤT TUNG & KHÔNG CHIẾN (Cúi + J = Wheelie Jump bay lên cùng địch -> Air J / Air K)
 wheelie:  { name: 'WHEELIE JUMP',           T: 28, wind: 3, cancel: 18, end: 22, damage: 1.5, pose: 'bikeUp',   hits: [4, 9, 14], launchWithMe: true, bikeMode: true },
 airgrind: { name: 'AIR SAW GRINDER',        T: 28, wind: 2, cancel: 21, end: 24, damage: 1.0, pose: 'airSaw',   hits: [3, 7, 11, 15, 19], holdAir: true },
 airslam:  { name: 'MOTORBIKE CRASH SLAM',   T: 30, wind: 4, cancel: 24, end: 26, damage: 5.0, pose: 'bikeSlam', slam: true, bikeMode: true, spark: true },

 // 3. COMBO B — LÁI MÔ-TÔ CÀN QUÉT (K -> K -> K hoặc Dash + K): Ủi kéo lê -> Drift 360 -> Phóng xe nổ
 k1_rush:  { name: 'FULL THROTTLE · RUSH',   T: 30, wind: 3, cancel: 22, end: 26, damage: 1.2, pose: 'bikeRide', hits: [4, 9, 14, 19], bikeMode: true, carry: true },
 k2_drift: { name: 'CROSSLINE · DONUT DRIFT',T: 30, wind: 2, cancel: 22, end: 26, damage: 1.2, pose: 'bikeDrift',hits: [4, 10, 16, 22], bikeMode: true, pullCenter: true, spark: true },
 k3_redline:{name: 'REDLINE · BIKE LAUNCH',  T: 32, wind: 6, cancel: 24, end: 26, damage: 6.0, pose: 'throwBike',hits: [8], launchBike: true, spark: true },

 // 4. DASH + J & CÚI + K (Idling Shield Grind)
 dashsaw:  { name: 'SLIPSTREAM SAW LUNGE',   T: 24, wind: 3, cancel: 16, end: 20, damage: 1.2, pose: 'grindSaw', hits: [4, 9, 14], advance: 14, drag: true },
 idling:   { name: 'IDLING · ELECTRIC GRIND',T: 34, wind: 3, cancel: 26, end: 30, damage: 1.0, pose: 'idling',   hits: [5, 11, 17, 23, 28], pullIn: true, spark: true }
};
// BOSS_PART_END s12.CAV_MOVES.1

// Nguồn: index.html:108204 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s12.cavPaintGiantSaw.1 READ_ONLY
function cavPaintGiantSaw(x, y, angle, spin, dir, sparkGlow = false){
 ctx.save();
 ctx.translate(x, y);
 ctx.scale(dir, 1);
 ctx.rotate(angle);

 // Khung sườn xe & Phuộc thủy lực hạng nặng (dài 52px, bản rộng 16px)
 ctx.fillStyle = '#263238';
 ctx.beginPath();
 ctx.moveTo(-10, -8); ctx.lineTo(36, -11);
 ctx.lineTo(42, 7);   ctx.lineTo(-10, 8);
 ctx.closePath(); ctx.fill();

 // Ốp giáp bạc & Ống xả đôi phát sáng cam
 ctx.fillStyle = '#78909C';
 ctx.fillRect(-4, -6, 30, 5);
 ctx.fillStyle = sparkGlow ? '#00E5FF' : '#FF6D00';
 ctx.fillRect(2, 1, 24, 4);

 // BÁNH XE RĂNG CƯA KHỔNG LỒ Ở ĐẦU MÚT (Bán kính R = 19px, đường kính 38px + 10 đại răng cưa!)
 const wx = 38, wy = 0, R = 19;
 ctx.save();
 ctx.translate(wx, wy);
 ctx.rotate(spin);

 // Hào quang điện xanh / lửa cam quanh bánh răng cưa
 ctx.shadowColor = sparkGlow ? '#00E5FF' : '#FF3D00';
 ctx.shadowBlur = 14;

 // 10 Lưỡi răng cưa thép sắc lẹm phóng đại
 ctx.fillStyle = '#ECEFF1';
 for(let k = 0; k < 10; k++){
  ctx.save();
  ctx.rotate(k * Math.PI / 5);
  ctx.beginPath();
  ctx.moveTo(-4.5, -R + 2);
  ctx.lineTo(0, -R - 8.5); // Mũi răng cưa vươn ra tới bán kính 27.5px!
  ctx.lineTo(5.5, -R + 2);
  ctx.closePath(); ctx.fill();
  ctx.restore();
 }

 // Lốp mô-tô đen dày & Vành mâm kim loại
 ctx.fillStyle = '#1C262B';
 ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill();
 ctx.strokeStyle = sparkGlow ? '#00E5FF' : '#40C4FF';
 ctx.lineWidth = 2.8;
 ctx.beginPath(); ctx.arc(0, 0, R - 4.5, 0, Math.PI * 2); ctx.stroke();

 // Nan hoa chữ X & Trục tâm bánh xe rực lửa
 ctx.strokeStyle = '#B0BEC5'; ctx.lineWidth = 3;
 for(let k = 0; k < 4; k++){
  const a2 = k * Math.PI / 2;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a2)*(R-5), Math.sin(a2)*(R-5)); ctx.stroke();
 }
 ctx.fillStyle = '#FF3D00';
 ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill();
 ctx.restore();

 // Tay cầm bọc giáp cho Dante nắm
 ctx.fillStyle = '#1C1C24';
 ctx.beginPath(); ctx.arc(0, 0, 5.5, 0, Math.PI * 2); ctx.fill();
 ctx.restore();
}
// BOSS_PART_END s12.cavPaintGiantSaw.1

// Nguồn: index.html:108270 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s12.cavPaintFullBike.1 READ_ONLY
function cavPaintFullBike(bx, by, dir, spin, tilt = 0, driftScale = 1){
 ctx.save();
 ctx.translate(bx, by - 22);
 ctx.scale(dir * driftScale, 1);
 ctx.rotate(tilt);

 // Luồng lửa phản lực phụt ra từ ống xả đôi phía sau
 ctx.save();
 ctx.shadowColor = '#FF3D00'; ctx.shadowBlur = 18;
 ctx.fillStyle = frames % 4 < 2 ? '#FF3D00' : '#FFEA00';
 ctx.beginPath();
 ctx.moveTo(-36, -6); ctx.lineTo(-78 - Math.random()*18, -12); ctx.lineTo(-36, 2);
 ctx.closePath(); ctx.fill();
 ctx.restore();

 // Hai Bánh Xe Răng Cưa Khổng Lồ Trước & Sau (R = 22px, tổng chiều dài xe ~105px!)
 for(const s2 of [-1, 1]){
  const wx = s2 * 32, wy = 4, R = 22;
  ctx.save();
  ctx.translate(wx, wy);
  ctx.rotate(spin);
  ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 14;
  ctx.fillStyle = '#ECEFF1';
  for(let k = 0; k < 10; k++){
   ctx.save(); ctx.rotate(k * Math.PI / 5);
   ctx.beginPath(); ctx.moveTo(-5, -R + 2); ctx.lineTo(0, -R - 8); ctx.lineTo(5.5, -R + 2); ctx.closePath(); ctx.fill();
   ctx.restore();
  }
  ctx.fillStyle = '#1C262B';
  ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(0, 0, R - 5, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#FF3D00';
  ctx.beginPath(); ctx.arc(0, 0, 5.5, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
 }

 // Khung sườn mô-tô bọc thép, Bình xăng đầu quỷ & Đèn pha chữ X xanh sáng rực
 ctx.fillStyle = '#263238';
 ctx.beginPath();
 ctx.moveTo(-36, -4); ctx.lineTo(-14, -22); ctx.lineTo(26, -24);
 ctx.lineTo(38, 2);   ctx.lineTo(-32, 6);
 ctx.closePath(); ctx.fill();

 ctx.fillStyle = '#78909C';
 ctx.beginPath();
 ctx.moveTo(-10, -20); ctx.lineTo(22, -22); ctx.lineTo(14, -8); ctx.lineTo(-14, -8);
 ctx.closePath(); ctx.fill();

 // Ống xả lửa cam dọc thân máy
 ctx.fillStyle = '#FF6D00';
 ctx.fillRect(-28, -4, 42, 5);

 // Tay lái & Đầu đèn pha ánh sáng xanh Cavaliere
 ctx.strokeStyle = '#CFD8DC'; ctx.lineWidth = 4.5; ctx.lineCap = 'round';
 ctx.beginPath(); ctx.moveTo(18, -20); ctx.lineTo(28, -36); ctx.stroke();
 ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 16;
 ctx.fillStyle = '#00E5FF';
 ctx.beginPath(); ctx.moveTo(26, -26); ctx.lineTo(42, -20); ctx.lineTo(28, -12); ctx.closePath(); ctx.fill();

 ctx.restore();
}
// BOSS_PART_END s12.cavPaintFullBike.1

// Nguồn: index.html:108432 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s12.KCB_MOVES.1 READ_ONLY
const KCB_MOVES = {
 // 1. COMBO A (J -> J -> J -> J): Vụt chéo -> Quét ngang -> Chọc gậy lửa 3 phát -> Bổ đập nổ băng
 j1: { name: 'CERBERUS · ICE WHIP SLASH',   T: 17, wind: 3, cancel: 10, end: 13, damage: 2.0, elem: 'ice',  pose: 'slashDown', hits: [5],          advance: 6, pullIn: true },
 j2: { name: 'CERBERUS · FROST SWEEP',      T: 18, wind: 3, cancel: 11, end: 14, damage: 2.0, elem: 'ice',  pose: 'sweepSide', hits: [5],          advance: 7, pullIn: true },
 j3: { name: 'CERBERUS · TRIPLE STAFFPOKE', T: 24, wind: 2, cancel: 18, end: 21, damage: 1.2, elem: 'fire', pose: 'multiPoke', hits: [4, 10, 16],  advance: 8, drag: true },
 j4: { name: 'CERBERUS · GLACIER SMASH',    T: 28, wind: 7, cancel: 20, end: 22, damage: 5.0, elem: 'ice',  pose: 'boSlam',    hits: [9],          advance: 10, push: 14, iceSpike: true },

 // 2. COMBO B (K -> K -> K): Quất Roi Sét Tầm Xa -> Chống Sào Song Phi -> Đập Nổ Hot Stuff
 k1: { name: 'LONG BARREL · THUNDER WHIP',  T: 22, wind: 4, cancel: 14, end: 18, damage: 3.0, elem: 'bolt', pose: 'whip',      hits: [6],          whipGround: true },
 k2: { name: 'ROCK BACK · POLE VAULT KICK', T: 24, wind: 4, cancel: 16, end: 20, damage: 3.5, elem: 'fire', pose: 'poleVault', hits: [7, 13],      advance: 12, drag: true },
 k3: { name: 'HOT STUFF · MAGMA SLAM',      T: 28, wind: 7, cancel: 20, end: 22, damage: 5.0, elem: 'fire', pose: 'boSlam',    hits: [9],          advance: 10, push: 15, fireWave: true },

 // 3. GIỮ K (Hold K): PERCUSSION & THUNDER CLAP (Đập côn gọi 3 cột thiên lôi)
 clap: { name: 'PERCUSSION · THUNDER CLAP', T: 32, wind: 8, cancel: 24, end: 26, damage: 4.0, elem: 'bolt', pose: 'boSlam',    hits: [10],         thunderStorm: true },

 // 4. CHIÊU CHỌC GẬY & ĐẶC BIỆT (Cúi J = Chọc gậy hất tung / Dash J = Đâm trường côn / Dash K = Revolver / Cúi K = Ice Age)
 Kautilya: { name: 'POLE THRUST · RISING STAFF', T: 24, wind: 4, cancel: 14, end: 18, damage: 4.0, elem: 'fire', pose: 'pokeUp',    hits: [6],     launchWithMe: true },
 pole:     { name: 'FLAME SPEAR · STAFF LUNGE',  T: 22, wind: 3, cancel: 14, end: 18, damage: 3.5, elem: 'fire', pose: 'pokeFront', hits: [5, 11], advance: 16, drag: true },
 revolver: { name: 'REVOLVER · ICE WHEEL',       T: 28, wind: 2, cancel: 22, end: 25, damage: 1.2, elem: 'ice',  pose: 'revolver',  hits: [4, 9, 14, 19, 23], advance: 12, drag: true },
 revslam:  { name: 'CRYSTAL · GLACIER SPIKE',    T: 26, wind: 5, cancel: 18, end: 20, damage: 4.5, elem: 'ice',  pose: 'boSlam',    hits: [7],     launch: true, iceSpike: true },
 iceage:   { name: 'ICE AGE · FROST BARRIER',    T: 32, wind: 2, cancel: 24, end: 28, damage: 1.2, elem: 'ice',  pose: 'iceAge',    hits: [4, 9, 14, 19, 24], shieldIce: true },

 // 5. KHÔNG CHIẾN (Air J = Phóng Sét Giật Kéo Lên / Air K = Múa Tam Khúc Trên Không)
 airwhip:  { name: 'AIR THUNDER GRAPPLE',        T: 22, wind: 3, cancel: 13, end: 18, damage: 3.0, elem: 'bolt', pose: 'airWhip',   hits: [5],     whipAirPull: true },
 airdance: { name: 'AERIAL TRI-SECTION DANCE',   T: 28, wind: 2, cancel: 22, end: 25, damage: 1.2, elem: 'tri',  pose: 'airDance',  hits: [3, 7, 11, 15, 19, 23], holdAir: true }
};
// BOSS_PART_END s12.KCB_MOVES.1

// Nguồn: index.html:108967 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s12.kcbPaintBoStaff.1 READ_ONLY
function kcbPaintBoStaff(len, glowCol = '#FF6D00'){
 ctx.save();
 ctx.shadowColor = glowCol; ctx.shadowBlur = 16;
 // Thân gậy sắt đen dài
 ctx.fillStyle = '#263238';
 ctx.fillRect(-len * 0.35, -3.5, len, 7);
 // Đai kim loại khắc dọc thân gậy
 ctx.fillStyle = '#90A4AE';
 ctx.fillRect(-len * 0.1, -4, 6, 8);
 ctx.fillRect(len * 0.25, -4, 6, 8);
 // Hai đầu gậy bọc lõi dung nham rực lửa
 ctx.fillStyle = glowCol;
 ctx.fillRect(-len * 0.38, -5.5, 22, 11);
 ctx.fillRect(len * 0.65 - 18, -5.5, 26, 11);
 ctx.fillStyle = '#FFF8E1';
 ctx.fillRect(-len * 0.35, -2.5, 14, 5);
 ctx.fillRect(len * 0.65 - 14, -2.5, 18, 5);
 ctx.restore();
}
// BOSS_PART_END s12.kcbPaintBoStaff.1

// Nguồn: index.html:109966 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s15.danteSwordPose.1 READ_ONLY
function danteSwordPose(n,sword,stroke=sword.stroke){
 const i=sword.i,count=sword.count;
 const spread=i-(count-1)/2;
 const kind=sword.move.kind;
 const ox=sword.origin?.x??(n.x+n.w/2);
 const oy=sword.origin?.y??n.y;
 const dir=sword.dir;

 // Vị trí treo mặc định sau vai Dante (Xếp hình cánh chim Awakened DSD)
 const wingX=-24-Math.abs(spread)*8-(i%2)*6;
 const wingY=12+spread*10;

 // 1. KHI CHƯA PHÓNG (Đang xếp đội hình chờ tới lượt chém)
 if(stroke<=0){
  const hover=Math.sin(frames*0.18+i*1.2)*2.5;
  const angle=-0.35+spread*0.18;
  const len=66,flat=0.85;
  const x=ox+dir*wingX,y=oy+wingY+hover;
  return {x,y,angle,len,flat,tx:x+dir*Math.cos(angle)*len,ty:y+Math.sin(angle)*len*flat,drillSpin:0};
 }

 // 2. KIỂU 'DRILL' (STINGER / POWER THRUST): Các đầu mũi kiếm chụm khít lại ở mũi kiếm chính tạo thành MŨI KHOAN XOÁY!
 if(kind==='drill'){
  const dur=14;
  const p=Math.max(0,Math.min(1,stroke/dur));
  const thrustEase=Math.sin(p*Math.PI*0.88);
  const spin=stroke*0.85+(i*Math.PI*2/Math.max(1,count));
  const bladeLength=78;

  // Điểm hội tụ của tất cả các đầu mũi kiếm nằm xa phía trước mũi kiếm của Dante (136px!)
  const focalX=52+86*thrustEase;
  const focalY=25;

  // Phần chuôi kiếm xòe ra thành vòng tròn và quay tít quanh trục đâm tạo hình nón Mũi Khoan 3D
  const coneRadius=(18-6*thrustEase)*(count>1?1:0.4);
  const hiltsSpreadY=Math.sin(spin)*coneRadius;
  const hiltsSpreadX=Math.cos(spin)*6;

  const tx=ox+dir*focalX;
  const ty=oy+focalY+Math.sin(spin)*2.5; // Đầu mũi kiếm chụm sát nhau xoáy nhẹ
  const hx=tx-dir*(bladeLength-hiltsSpreadX);
  const hy=ty+hiltsSpreadY;
  const flat=0.55+0.35*Math.abs(Math.cos(spin));
  // Match the rendered tip to the collision tip after the perspective transform.
  const dx=(tx-hx)*dir,dy=(ty-hy)/flat;
  const angle=Math.atan2(dy,dx),len=Math.hypot(dx,dy);

  return {x:hx,y:hy,angle,len,flat,tx,ty,drillSpin:spin,isDrill:true,focalX:tx,focalY:ty,coneR:coneRadius};
 }

 // 3. KIỂU 'FAN' (MILLION STAB): Phóng vọt ra xa tới 120px và chĩa ra nhiều hướng hình rẻ quạt!
 if(kind==='fan'){
  const dur=11;
  const p=Math.max(0,Math.min(1,stroke/dur));
  // Hàm lao vọt ra cực nhanh rồi thu nhẹ về
  const jab=Math.sin(p*Math.PI);
  const fanAng=spread*0.24+(sword.fanJitter||0);
  const reach=18+98*jab; // Vươn xa hơn hẳn vũ khí thường!
  const len=74,flat=0.72;

  const x=ox+dir*(wingX*(1-jab)+Math.cos(fanAng)*reach);
  const y=oy+wingY*(1-jab*0.6)+24*jab+Math.sin(fanAng)*reach*0.85;
  return {x,y,angle:fanAng,len,flat,tx:x+dir*Math.cos(fanAng)*len,ty:y+Math.sin(fanAng)*len*flat,isFan:true};
 }

 // 4. KIỂU 'CUT' & 'RISE' (CHÉM LẦN LƯỢT TỪNG THANH):
 // Mỗi thanh kiếm bay vòng từ sau lưng ra phía trước và quét một đường vòng cung cực rộng & mượt!
 const dur=12;
 const p=Math.max(0,Math.min(1,stroke/dur));
 // Nội suy Ease-In-Out mượt mà cho quỹ đạo vung kiếm
 const ease=p<0.5?(2*p*p):(1-Math.pow(-2*p+2,2)/2);
 const arcSin=Math.sin(p*Math.PI);

 // Đan xen hướng chém của từng thanh kiếm (Thanh 1 chém bổ xuống, Thanh 2 chém vớt lên, Thanh 3 chém ngang...)
 const rising=(kind==='rise')?(i%2===0):(i%2===1);
 const vert=rising?-1:1;

 // Tầm vươn ra phía trước xa hơn vũ khí chính (chuôi kiếm bay ra tới +68px, cộng thêm lưỡi kiếm dài 74px = tầm 142px!)
 const reachX=wingX*(1-arcSin)+68*arcSin;
 const centerY=24+spread*5;
 const sweepY=centerY-vert*34*Math.cos(ease*Math.PI);

 // Góc xoay lưỡi kiếm quét trọn một cung 210 độ tạo vệt lụa tròn trịa
 const startAng=vert*2.25+spread*0.1;
 const endAng=-vert*1.65+spread*0.1;
 const angle=startAng+(endAng-startAng)*ease;

 const len=74;
 // Độ nghiêng mặt phẳng chém (3D perspective) khác nhau cho mỗi thanh kiếm để nhìn rõ từng đường kiếm tách biệt
 const flat=(i%3===2)?0.48:0.88;
 const x=ox+dir*reachX;
 const y=oy+sweepY;

 return {x,y,angle,len,flat,tx:x+dir*Math.cos(angle)*len,ty:y+Math.sin(angle)*len*flat};
}
// BOSS_PART_END s15.danteSwordPose.1

// Nguồn: index.html:110191 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s15.danteDrawSword.1 READ_ONLY
function danteDrawSword(sword){
 const alpha=sword.alpha;
 if(alpha<=0.02)return;
 ctx.save();
 ctx.lineCap='round';ctx.lineJoin='round';

 // 1. VẼ VỆT LỤA KIẾM KHÍ (RIBBON SLASH TRAIL) MƯỢT MÀ CỦA TỪNG LƯỠI KIẾM
 if(sword.trail.length>=2){
  for(let i=1;i<sword.trail.length;i++){
   const prev=sword.trail[i-1],v=sword.trail[i];
   const fade=Math.max(0,1-(sword.age-v.age)/4.5);
   // Dải lụa đỏ huyết ngọc từ giữa thân kiếm ra tới mũi kiếm
   ctx.globalAlpha=alpha*fade*0.28;
   ctx.fillStyle='#ff1744';
   ctx.beginPath();
   ctx.moveTo(prev.x+(prev.tx-prev.x)*0.35,prev.y+(prev.ty-prev.y)*0.35);
   ctx.lineTo(prev.tx,prev.ty);
   ctx.lineTo(v.tx,v.ty);
   ctx.lineTo(v.x+(v.tx-v.x)*0.35,v.y+(v.ty-v.y)*0.35);
   ctx.closePath();ctx.fill();

   // Đường viền mũi kiếm sáng trắng-hồng sắc lẹm để nhìn rõ thứ tự từng nhát chém
   ctx.globalAlpha=alpha*fade*0.85;
   ctx.strokeStyle='#ff80ab';
   ctx.lineWidth=3.2*fade;
   ctx.beginPath();ctx.moveTo(prev.tx,prev.ty);ctx.lineTo(v.tx,v.ty);ctx.stroke();

   ctx.strokeStyle='#ffffff';
   ctx.lineWidth=1.2*fade;
   ctx.beginPath();ctx.moveTo(prev.tx,prev.ty);ctx.lineTo(v.tx,v.ty);ctx.stroke();
  }
 }

 // 2. HIỆU ỨNG MŨI KHOAN XOÁY ỐC (SPIRAL DRILL RINGS) KHI DÙNG STINGER / THRUST
 if(sword.isDrill&&sword.phase==='slash'&&sword.i===0){
  ctx.save();
  ctx.globalAlpha=alpha*0.85;
  ctx.shadowColor='#ff1744';ctx.shadowBlur=16;
  // Các vòng xoắn ốc đỏ-trắng cuộn quanh đầu mũi khoan
  for(let r=0;r<3;r++){
   const rx=sword.focalX-sword.dir*(12+r*18);
   const ry=sword.focalY;
   const radY=Math.max(3,(sword.coneR||14)*(1-r*0.22)+4);
   ctx.strokeStyle=r===0?'#ffffff':'#ff1744';
   ctx.lineWidth=r===0?2.5:3.5;
   ctx.beginPath();
   ctx.ellipse(rx,ry,5,radY,0,sword.drillSpin+r,sword.drillSpin+r+Math.PI*1.35);
   ctx.stroke();
  }
  // Mũi nhọn ánh sáng xuyên phá ở đỉnh mũi khoan
  ctx.fillStyle='#ffffff';
  ctx.beginPath();
  ctx.moveTo(sword.focalX+sword.dir*18,sword.focalY);
  ctx.lineTo(sword.focalX-sword.dir*10,sword.focalY-7);
  ctx.lineTo(sword.focalX-sword.dir*10,sword.focalY+7);
  ctx.closePath();ctx.fill();
  ctx.restore();
 }

 // 3. HIỆU ỨNG TIA ĐÂM RẺ QUẠT (FAN STAB SPARK) KHI DÙNG MILLION STAB
 if(sword.isFan&&sword.phase==='slash'&&sword.stroke>=3&&sword.stroke<=8){
  ctx.save();
  ctx.globalAlpha=alpha*0.75;
  ctx.strokeStyle='#ffffff';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(sword.x,sword.y);ctx.lineTo(sword.tx+sword.dir*12,sword.ty);ctx.stroke();
  ctx.restore();
 }

 // 4. VẼ THANH KIẾM NĂNG LƯỢNG SUMMONED SWORD (Thiết kế chuẩn Mirage Blade của Dante)
 ctx.globalAlpha=alpha*0.92;
 ctx.translate(sword.x,sword.y);
 ctx.scale(sword.dir,sword.flat);
 ctx.rotate(sword.angle);
 ctx.shadowColor='#ff1744';ctx.shadowBlur=12;

 // Thân lưỡi kiếm năng lượng đỏ bán trong suốt có gai ngạnh
 ctx.fillStyle='#ff1744';
 ctx.beginPath();
 ctx.moveTo(2,-4.5);
 ctx.lineTo(18,-7);
 ctx.lineTo(14,-3.5);
 ctx.lineTo(sword.len-16,-5.5);
 ctx.lineTo(sword.len,0);
 ctx.lineTo(sword.len-16,5.5);
 ctx.lineTo(14,3.5);
 ctx.lineTo(18,7);
 ctx.lineTo(2,4.5);
 ctx.closePath();ctx.fill();

 // Lõi ánh sáng trắng hồng rực rỡ chạy dọc sống kiếm
 ctx.fillStyle='#ffe4ec';
 ctx.beginPath();
 ctx.moveTo(6,-1.8);
 ctx.lineTo(sword.len-4,0);
 ctx.lineTo(6,1.8);
 ctx.closePath();ctx.fill();

 // Hộ thủ cánh dơi quỷ & Chuôi kiếm năng lượng
 ctx.fillStyle='#d50032';
 ctx.beginPath();
 ctx.moveTo(-2,-11);ctx.lineTo(5,-3);ctx.lineTo(5,3);ctx.lineTo(-2,11);ctx.lineTo(-5,0);
 ctx.closePath();ctx.fill();
 ctx.fillRect(-14,-2,12,4);

 ctx.restore();
}
// BOSS_PART_END s15.danteDrawSword.1

// Nguồn: index.html:110399 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s16.DANTE_SIN_DRILL.1 READ_ONLY
const DANTE_SIN_DRILL={length:150,radius:48,rear:27,palette:{bd:'#24080c',dk:'#110507',lt:'#9a1b21',out:'#ff5722',rim:'#ffc400',eye:'#ffe0b2'}};
// BOSS_PART_END s16.DANTE_SIN_DRILL.1

// Nguồn: index.html:110400 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s16.danteDrawSinDrill.1 READ_ONLY
function danteDrawSinDrill(cx,cy,dir,age){veCanhKhoan(cx,cy,dir<0?Math.PI:0,age,DANTE_SIN_DRILL.palette);}
// BOSS_PART_END s16.danteDrawSinDrill.1

// Nguồn: index.html:110401 · Ngữ cảnh người chơi
// BOSS_PART_BEGIN s16.danteSinDrillBox.1 READ_ONLY
function danteSinDrillBox(fromX,toX,cy,dir){
 const {length,radius,rear}=DANTE_SIN_DRILL;
 return {x:Math.min(fromX,toX)-(dir<0?length:rear),y:cy-radius,w:Math.abs(toX-fromX)+length+rear,h:radius*2};
}
// BOSS_PART_END s16.danteSinDrillBox.1

// Nguồn: index.html:110638 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DANTE_BOSS_MELEE.1 EDITABLE
const DANTE_BOSS_MELEE = {
    // 1. DEVIL SWORD DANTE (Arm 0)
    dsd_a: {
        arm: 0, table: 'DSW', label: 'DSD · COMBO A',
        moves: ['a1', 'a2', 'a3']
    },
    dsd_b: {
        arm: 0, table: 'DSW', label: 'DSD · COMBO B',
        moves: ['a1', 'bspin', 'bstab', 'thrust']
    },
    dsd_prop_shred: {
        arm: 0, table: 'DSW', label: 'DSD · PROP & SHREDDER',
        moves: ['a1', 'prop', 'shred', 'drive']
    },
    dance: {
        arm: 0, table: 'DSW', label: 'DANCE MACABRE',
        moves: ['dhit', 'ddown', 'dup', 'dcross', 'dspin', 'dstab', 'dwave1', 'dwave2', 'dfinish']
    },

    // 2. BALROG — BLOW & KICK MODE (Arm 1)
    balrog_a: {
        arm: 1, table: 'BLR', label: 'BALROG · BOXING COMBO A',
        moves: ['j1', 'j2', 'j3', 'j4']
    },
    balrog_b: {
        arm: 1, table: 'BLR', label: 'BALROG · CAPOEIRA COMBO B',
        moves: ['k1', 'k2', 'k3', 'fwave']
    },
    balrog_rush: {
        arm: 1, table: 'BLR', label: 'BALROG · RAPID BLOW & JOLT',
        moves: ['mdragon', 'j1', 'rjab', 'hjolt']
    },
    balrog_pyro: {
        arm: 1, table: 'BLR', label: 'BALROG · PYROMANIA',
        moves: ['pyro1', 'pyro2', 'pyro3']
    },

    // 3. CAVALIERE — DUAL GIANT SAWS & FULL THROTTLE (Arm 2)
    cavaliere_a: {
        arm: 2, table: 'CAV', label: 'CAVALIERE · SAW GRINDER A',
        moves: ['j1', 'j2', 'j3']
    },
    cavaliere_b: {
        arm: 2, table: 'CAV', label: 'CAVALIERE · FULL THROTTLE DRIFT',
        moves: ['k1_rush', 'k2_drift', 'k3_redline']
    },
    cavaliere_gear: {
        arm: 2, table: 'CAV', label: 'CAVALIERE · GEARSHIFT COMBO',
        moves: ['dashsaw', 'j1', 'k1_rush', 'k2_drift']
    },

    // 4. KING CERBERUS — TRI-ELEMENT NUNCHAKU & BO STAFF (Arm 3)
    cerberus_a: {
        arm: 3, table: 'KCB', label: 'CERBERUS · TRI-STAFF COMBO A',
        moves: ['j1', 'j2', 'j3', 'j4']
    },
    cerberus_b: {
        arm: 3, table: 'KCB', label: 'CERBERUS · POLE VAULT COMBO B',
        moves: ['k1', 'k2', 'k3']
    },
    cerberus_storm: {
        arm: 3, table: 'KCB', label: 'CERBERUS · REVOLVER & THUNDER',
        moves: ['pole', 'revolver', 'revslam', 'clap']
    }
};
// BOSS_PART_END s17.DANTE_BOSS_MELEE.1

// Nguồn: index.html:110704 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.meleePriority.1 EDITABLE
DanteBoss.prototype.meleePriority = true;
// BOSS_PART_END s17.DanteBoss.prototype.meleePriority.1

// Nguồn: index.html:110709 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.startSinDrill.1 EDITABLE
DanteBoss.prototype.startSinDrill = function() {
    if (this.phase !== 2 || this.suSt || this.hp <= 0) return false;
    this.cancelCloseCombo(); this.cancelSinDrill(); this.faceP();
    const lane = Math.max(90, Math.min(dkNenY() - DANTE_SIN_DRILL.radius, dino.y + dino.h / 2));
    this._sdtDrill = {phase:'wind',tick:0,age:0,dir:this.dir(),lane,pass:0,hit:false,trail:[]};
    this._sinDrillSeen = true; this._sinDrillReady = frames + 480;
    this.state = 'sd_drill'; this.subTimer = 0; this.dashV = this.dy = this.fly = 0;
    this.beam = this.bike = this.slash = this.tel = this.hat = null;
    this.rg = 0; this.swords.length = 0; this._dayLui = 0;
    floatingTexts.push(new FloatingText(this.cx() - 65, this.y - 42, 'SIN DRILL · 2 PASSES'));
    if (SFX.tone) SFX.tone(160,.3,'sawtooth',.1,700);
    return true;
};
// BOSS_PART_END s17.DanteBoss.prototype.startSinDrill.1

// Nguồn: index.html:110722 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.cancelSinDrill.1 EDITABLE
DanteBoss.prototype.cancelSinDrill = function() {
    if (!this._sdtDrill) return;
    this._sdtDrill = null;
    this.x = Math.max(worldL() + 8, Math.min(worldR() - this.w - 8, this.x));
    this.y = Math.min(this.baseY, this.y);
};
// BOSS_PART_END s17.DanteBoss.prototype.cancelSinDrill.1

// Nguồn: index.html:110728 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.runSinDrill.1 EDITABLE
DanteBoss.prototype.runSinDrill = function() {
    if (!this._sdtDrill && !this.startSinDrill()) return;
    const f = this._sdtDrill; f.tick++; f.age++; this.subTimer++;
    const {length,rear}=DANTE_SIN_DRILL;
    const entry = f.dir > 0 ? worldL()-length-24 : worldR()+length+24;
    const exit = f.dir > 0 ? worldR()+rear+24 : worldL()-rear-24;
    f.trail=f.trail.filter(g=>--g.t>0);
    if (f.phase === 'wind' || f.phase === 'gap') {
        if (f.phase === 'wind') {this.y+=(f.lane-this.h/2-this.y)*.2;this.dy=0;}
        if (f.tick >= (f.phase === 'wind' ? 28 : 18)) {
            this.x=entry-this.w/2;this.y=f.lane-this.h/2;
            f.phase='dash';f.tick=0;f.hit=false;f.trail=[];
            if (SFX.tone) SFX.tone(100,.2,'sawtooth',.12,950);
        }
        return;
    }
    if (f.phase === 'dash') {
        const old=this.cx(),next=f.dir>0?Math.min(exit,old+26):Math.max(exit,old-26);
        this.x=next-this.w/2;this.y=f.lane-this.h/2;this.dy=this.dashV=0;this.facingLeft=f.dir<0;
        if (f.tick%2===0) f.trail.push({x:old,y:f.lane,t:8,dir:f.dir});
        if (!f.hit && checkAABB(dino,danteSinDrillBox(old,next,f.lane,f.dir))) {f.hit=true;this._dayLui=0;this.hurtP(1);}
        if (next === exit) {
            f.pass++;f.tick=0;
            if (f.pass < 2) f.phase='gap';
            else {
                f.phase='recover';this.state='recovery';f.trail=[];
                this.x=f.dir>0?worldR()-this.w-24:worldL()+24;
                this.y=this.baseY;this.dy=0;this.grounded=true;
            }
        }
        return;
    }
    if (f.phase === 'recover' && f.tick >= 36) {this.cancelSinDrill();this.toIdle(28);}
};
// BOSS_PART_END s17.DanteBoss.prototype.runSinDrill.1

// Nguồn: index.html:110762 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.bossDrillClearBase.1 EDITABLE
const bossDrillClearBase = DanteBoss.prototype.suDon;
// BOSS_PART_END s17.bossDrillClearBase.1

// Nguồn: index.html:110763 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.suDon.1 EDITABLE
DanteBoss.prototype.suDon = function(...args) {this.cancelSinDrill();return bossDrillClearBase.apply(this,args);};
// BOSS_PART_END s17.DanteBoss.prototype.suDon.1

// Nguồn: index.html:110765 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.danteDrawBossSinDrill.1 EDITABLE
function danteDrawBossSinDrill(boss) {
    const f=boss._sdtDrill;if(!f)return;
    ctx.save();
    if (f.phase === 'wind' || f.phase === 'gap') {
        const duration=f.phase==='wind'?28:18,k=f.tick/duration;
        ctx.fillStyle='rgba(255,87,34,'+(.06+.12*k)+')';
        ctx.fillRect(worldL(),f.lane-48,worldR()-worldL(),96);
        ctx.lineWidth=2;ctx.strokeStyle='#ffb74d';ctx.setLineDash([10,9]);
        ctx.beginPath();ctx.moveTo(worldL(),f.lane);ctx.lineTo(worldR(),f.lane);ctx.stroke();ctx.setLineDash([]);
        for(let x=worldL()+30;x<worldR();x+=100){ctx.beginPath();ctx.moveTo(x-f.dir*10,f.lane-10);ctx.lineTo(x+f.dir*10,f.lane);ctx.lineTo(x-f.dir*10,f.lane+10);ctx.stroke();}
    }
    for(const g of f.trail){ctx.globalAlpha=g.t/8*.2;ctx.fillStyle='#ff5722';ctx.beginPath();ctx.moveTo(g.x-g.dir*27,g.y-42);ctx.lineTo(g.x+g.dir*150,g.y);ctx.lineTo(g.x-g.dir*27,g.y+42);ctx.closePath();ctx.fill();}
    ctx.restore();
}
// BOSS_PART_END s17.danteDrawBossSinDrill.1

// Nguồn: index.html:110780 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.danteBossLookupMove.1 EDITABLE
function danteBossLookupMove(table, id) {
    if (table === 'DSW' && typeof DSW_MOVES !== 'undefined') return DSW_MOVES[id];
    if (table === 'BLR' && typeof BLR_MOVES !== 'undefined') return BLR_MOVES[id];
    if (table === 'CAV' && typeof CAV_MOVES !== 'undefined') return CAV_MOVES[id];
    if (table === 'KCB' && typeof KCB_MOVES !== 'undefined') return KCB_MOVES[id];
    return null;
}
// BOSS_PART_END s17.danteBossLookupMove.1

// Nguồn: index.html:110788 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.danteBossGetStepMove.1 EDITABLE
function danteBossGetStepMove(f, idx = f.index) {
    const id = f.pattern.moves[idx];
    const src = danteBossLookupMove(f.pattern.table, id);
    if (!src) throw new Error('Unknown Dante boss move: ' + f.pattern.table + '.' + id);
    const wind = Math.max(2, src.wind ?? 4);
    const end = Math.max(wind + 3, src.end ?? 16);
    const T = Math.max(end + 2, src.T ?? 22);
    // Chuyển đòn ngay tại frame cancel/end để nối combo liền mạch như người chơi!
    const cancel = Math.max(end - 1, Math.min(T - 2, src.cancel ?? (end + 2)));
    return {
        ...src,
        id,
        table: f.pattern.table,
        dir: f.dir,
        wind,
        end,
        T,
        cancel,
        pose: src.pose || 'down',
        advance: src.advance ?? 6,
        red: !!src.red || idx === f.pattern.moves.length - 1
    };
}
// BOSS_PART_END s17.danteBossGetStepMove.1

// Nguồn: index.html:110812 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.danteBossMeleePool.1 EDITABLE
function danteBossMeleePool(arm) {
    return Object.keys(DANTE_BOSS_MELEE).filter(id => DANTE_BOSS_MELEE[id].arm === arm);
}
// BOSS_PART_END s17.danteBossMeleePool.1

// Nguồn: index.html:110817 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.danteBossEnsureFx.1 EDITABLE
function danteBossEnsureFx(boss) {
    if (!boss._comboFx) {
        boss._comboFx = {
            sparks: [],
            punchArcs: [],
            cerbArcs: [],
            thrownBike: null,
            whipLine: null,
            phantomSwords: [],
            spin: 0
        };
    }
    return boss._comboFx;
}
// BOSS_PART_END s17.danteBossEnsureFx.1

// Nguồn: index.html:110833 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.danteBossSpawnPhantomSwords.1 EDITABLE
function danteBossSpawnPhantomSwords(boss, f, m) {
    if (boss.suYeu > 0) return;
    if (boss.dtStage < 2 && boss.hang() < 2) return;
    const fx = danteBossEnsureFx(boss);
    const count = boss.dtStage >= 2 ? 3 : 2;
    // Shared j3/j4 IDs have different meanings for each weapon.
    const move = danteSwordMove({ ...m, sword: m.table === 'DSW', balrog: m.table === 'BLR', cavaliere: m.table === 'CAV', cerberus: m.table === 'KCB' });
    const kind = move?.kind || 'cut';

    fx.phantomSwords = [];
    for (let i = 0; i < count; i++) {
        fx.phantomSwords.push({
            i, count, dir: f.dir, kind,
            delay: kind === 'drill' ? 0 : i * 3,
            age: 0, stroke: 0, launched: false, hit: false,
            origin: { x: boss.cx(), y: boss.y },
            trail: []
        });
    }
}
// BOSS_PART_END s17.danteBossSpawnPhantomSwords.1

// Nguồn: index.html:110854 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.startCloseCombo.1 EDITABLE
DanteBoss.prototype.startCloseCombo = function(id, trick = true) {
    const pattern = DANTE_BOSS_MELEE[id];
    if (!pattern || this.phase !== 1 || this.suSt || this.hp <= 0 || !this.grounded) return false;

    this.cancelCloseCombo();
    this.arms = pattern.arm;
    this.chuoi = [];
    this.slash = this.tel = this.bike = null;
    this.rg = 0; this.fly = 0; this.dashV = 0;
    this._ketDon = false; this._dayLui = 0; this.trickTo = null;
    this.faceP();

    const dir = this.dir();
    const idealDist = pattern.arm === 3 ? 88 : (pattern.arm === 1 ? 62 : 76);
    const goal = Math.max(worldL() + 8, Math.min(worldR() - this.w - 8, dino.x + dino.w / 2 - dir * idealDist - this.w / 2));
    const approachEnd = trick ? Math.max(18, 10 + Math.ceil(Math.abs(goal - this.x) / 22)) : 6;

    this._closeCombo = {
        id, pattern,
        state: 'd_comboA_close',
        phase: trick ? 'approach' : 'ready',
        tick: 0,
        index: 0,
        dir, goal, approachEnd,
        trail: [],
        hitMap: new Set(),
        prevX: this.x
    };

    this.state = 'd_comboA_close';
    this.subTimer = 0;
    this._closeReady = frames + 28;
    // A long Dance must finish before the ordinary timed weapon switch.
    const planned = pattern.moves.reduce((sum, _, i) => {
        const m = danteBossGetStepMove(this._closeCombo, i);
        return sum + (i < pattern.moves.length - 1 ? m.cancel : m.T);
    }, 0) + approachEnd + 60;
    this.switchT = Math.max(this.switchT, Math.ceil(planned / (this.suYeu > 0 ? this.spd() : 1)));
    this.hpAtSwitch = this.hp;
    this.drawn = true;
    this._swordCustom = true;
    danteBossEnsureFx(this);

    floatingTexts.push(new FloatingText(this.x - 54, this.y - 42, (trick ? 'TRICKSTER → ' : '') + pattern.label));
    return true;
};
// BOSS_PART_END s17.DanteBoss.prototype.startCloseCombo.1

// Nguồn: index.html:110901 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.cancelCloseCombo.1 EDITABLE
DanteBoss.prototype.cancelCloseCombo = function() {
    if (this.slash?._closeCombo) this.slash = null;
    this._closeCombo = null;
    this._closePose = null;
    this._closeMove = null;
    this._closeKick = null;
    this._swordCustom = false;
    this._swordLean = 0;
    this._swordLunge = 0;
    this._swordTurn = 1;
    this.armR = this.armL = 0;
    this._comboFx = null;
};
// BOSS_PART_END s17.DanteBoss.prototype.cancelCloseCombo.1

// Nguồn: index.html:110915 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.closeComboRecover.1 EDITABLE
DanteBoss.prototype.closeComboRecover = function() {
    const f = this._closeCombo;
    if (!f) return;
    f.phase = 'recover';
    f.tick = 0;
    this.state = 'recovery';
    this.slash = this.tel = null;
    this.dashV = 0;
    this._closePose = null;
    this._closeMove = null;
    this._closeKick = null;
    this._swordCustom = false;
    this.armR = this.armL = 0;
    this._swordLean = 0;
    this._swordLunge = 0;
    this._swordTurn = 1;
};
// BOSS_PART_END s17.DanteBoss.prototype.closeComboRecover.1

// Nguồn: index.html:110934 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.danteBossExecuteHit.1 EDITABLE
function danteBossExecuteHit(boss, f, m, hitIndex) {
    const fx = danteBossEnsureFx(boss);
    const cx = boss.cx(), cy = boss.cy(), dir = f.dir;

    // 1. DEVIL SWORD DANTE (DSW)
    if (m.table === 'DSW') {
        if (m.waves) {
            const bp = new BossProjectile(cx + dir * 24, boss.y + 8, dir * 13.5, 0, false, 1);
            bp.w = 28; bp.h = 56; bp.color = '#FF1744'; bp.crescent = true; bp.isPiercing = true;
            bossProjectiles.push(bp);
            if (SFX.bossSkill) SFX.bossSkill();
            return;
        }
        if (m.pose === 'stab') {
            fx.sparks.push({
                x: cx + dir * 18,
                y: boss.y + 26 + (Math.random() - 0.5) * 20,
                dir, len: 82 + Math.random() * 26,
                ang: (Math.random() - 0.5) * 0.18,
                t: 6, max: 6
            });
        }
        // DSD damage comes exclusively from the visible blade sweep below.
        // A second front rectangle would double-hit and reach outside the sword.
        if (SFX.tone) SFX.tone(m.pose === 'stab' ? 1450 : 780, 0.04, 'square', 0.08, 900);
    }

    // 2. BALROG (BLR)
    else if (m.table === 'BLR') {
        boss._dayLui = 0;
        let arcType = m.pose;
        if (m.pose === 'oneTwo') arcType = (hitIndex === 0) ? 'jabL' : 'crossR';
        if (m.pose === 'corkspin') arcType = (hitIndex === 0) ? 'upper' : 'spinBack';
        fx.punchArcs.push({ type: arcType, dir, fire: !!m.fire || boss.dtStage >= 2, t: 9, max: 9 });

        if (m.id === 'fwave') {
            const bp = new BossProjectile(cx + dir * 24, 320 - 84, dir * 11.5, 0, false, 1);
            bp.w = 42; bp.h = 84; bp.color = '#FF6D00'; bp.fire = true; bp.isPiercing = true;
            bossProjectiles.push(bp);
            visualEffects.push(new Effect(cx + dir * 28, boss.y + boss.h - 8, 'explosion', true, 28));
        }

        const is360 = m.pose === 'capo' || m.pose === 'tatsumaki';
        const reach = is360 ? 92 : (m.pose === 'magmaFin' ? 98 : 86);
        const box = {
            x: is360 ? cx - reach : (dir < 0 ? boss.x - reach + 8 : boss.x + boss.w - 8),
            y: boss.y - 12,
            w: is360 ? reach * 2 : reach,
            h: boss.h + 20
        };
        if (checkAABB(dino, box)) {
            boss._dayLui = m.push ? 24 : 4;
            boss.hurtP(1);
            visualEffects.push(new Effect(dino.x + dino.w / 2, dino.y + dino.h / 2, 'explosion', true, 20));
        }
        if (SFX.tone) SFX.tone(240 + (hitIndex % 3) * 55, 0.05, 'sawtooth', 0.10, 120);
    }

    // 3. CAVALIERE (CAV)
    else if (m.table === 'CAV') {
        boss._dayLui = 0;
        if (m.launchBike) {
            fx.thrownBike = { x: cx + dir * 32, y: boss.y + boss.h, dir, vx: dir * 15, t: 0, hit: false };
            if (SFX.bossExplode) SFX.bossExplode();
        }
        const isAround = m.pose === 'bikeDrift' || m.pose === 'airSaw';
        const reach = 106;
        const box = {
            x: isAround ? cx - reach : (dir < 0 ? boss.x - reach + 10 : boss.x + boss.w - 10),
            y: boss.y - 14,
            w: isAround ? reach * 2 : reach,
            h: boss.h + 24
        };
        if (checkAABB(dino, box)) {
            boss._dayLui = m.push ? 22 : 6;
            boss.hurtP(1);
            visualEffects.push(new Effect(dino.x + dino.w / 2, dino.y + dino.h / 2, 'parry', dir < 0));
        }
        if (SFX.tone) SFX.tone(145 + (hitIndex % 3) * 35, 0.05, 'sawtooth', 0.12, 95);
    }

    // 4. KING CERBERUS (KCB)
    else if (m.table === 'KCB') {
        boss._dayLui = 0;
        boss.cerb = m.elem === 'fire' ? 0 : (m.elem === 'bolt' ? 1 : 2);
        if (['slashDown', 'sweepSide', 'multiPoke', 'pokeFront', 'pokeUp', 'boSlam'].includes(m.pose)) {
            fx.cerbArcs.push({ pose: m.pose, dir, sub: hitIndex, t: 9, max: 9 });
        }
        if (m.whipGround) {
            const endX = cx + dir * 185, endY = cy;
            fx.whipLine = { x1: cx + dir * 14, y1: cy - 4, x2: endX, y2: endY, t: 10, max: 10 };
            const boxW = { x: dir < 0 ? cx - 185 : cx, y: boss.y - 16, w: 185, h: boss.h + 28 };
            if (checkAABB(dino, boxW)) boss.hurtP(1);
            if (SFX.tone) SFX.tone(920, 0.06, 'sawtooth', 0.14, 420);
            return;
        }
        if (m.iceSpike && hitIndex === 0) {
            for (let k = 1; k <= 3; k++) {
                const sx = Math.max(40, Math.min(canvas.width - 40, cx + dir * (42 + k * 38)));
                boss.spikes.push({ x: sx, t: 14 + k * 3 });
            }
        }
        if (m.thunderStorm && hitIndex === 0) {
            for (let k = 1; k <= 3; k++) {
                const bx = Math.max(40, Math.min(canvas.width - 40, cx + dir * (48 + k * 60)));
                visualEffects.push(new Effect(bx, 290, 'lightning_shock', true, 36));
                if (checkAABB(dino, { x: bx - 22, y: 120, w: 44, h: 200 })) boss.hurtP(1);
            }
            if (SFX.bossExplode) SFX.bossExplode();
        }
        const is360 = ['airDance', 'iceAge', 'revolver'].includes(m.pose);
        const reach = ['multiPoke', 'pokeFront', 'pokeUp', 'boSlam'].includes(m.pose) ? 120 : 98;
        const box = {
            x: is360 ? cx - reach : (dir < 0 ? boss.x - reach + 10 : boss.x + boss.w - 10),
            y: boss.y - 14,
            w: is360 ? reach * 2 : reach,
            h: boss.h + 24
        };
        if (checkAABB(dino, box)) {
            boss._dayLui = m.push ? 22 : 5;
            boss.hurtP(1);
        }
        if (SFX.tone) SFX.tone(m.elem === 'bolt' ? 780 : (m.elem === 'fire' ? 190 : 520), 0.05, 'triangle', 0.11, 220);
    }
}
// BOSS_PART_END s17.danteBossExecuteHit.1

// Nguồn: index.html:111060 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.runCloseCombo.1 EDITABLE
DanteBoss.prototype.runCloseCombo = function() {
    const f = this._closeCombo;
    if (!f) return;
    const rate = this.suYeu > 0 ? this.spd() : 1;
    f.clock = (f.clock || 0) + rate;
    if (f.clock < 1) return;
    f.clock--;
    const fx = danteBossEnsureFx(this);
    fx.spin += 0.62;
    this.subTimer++;

    // Cập nhật các hiệu ứng hạt & mô-tô phóng đi
    f.trail = f.trail.filter(v => --v.t > 0);
    fx.sparks = fx.sparks.filter(sp => --sp.t > 0);
    fx.punchArcs = fx.punchArcs.filter(pa => --pa.t > 0);
    fx.cerbArcs = fx.cerbArcs.filter(ca => --ca.t > 0);
    if (fx.whipLine && --fx.whipLine.t <= 0) fx.whipLine = null;

    if (fx.thrownBike) {
        const tb = fx.thrownBike;
        tb.x += tb.vx; tb.t++;
        if (!tb.hit && checkAABB(dino, { x: tb.x - 46, y: tb.y - 52, w: 92, h: 52 })) {
            tb.hit = true;
            this._dayLui = 0;
            this.hurtP(1);
            visualEffects.push(new Effect(tb.x, tb.y - 22, 'explosion', true, 44));
        }
        if (tb.t > 38 || tb.x < -60 || tb.x > canvas.width + 60) fx.thrownBike = null;
    }

    // 1. PHA TIẾP CẬN (TRICKSTER DASH)
    if (f.phase === 'approach') {
        f.tick++;
        this._swordCustom = false;
        if (f.tick === 1) {
            this.styleFx = 14;
            this.warn(96, 12, Math.ceil(10/rate));
            if (SFX.tone) SFX.tone(1250, 0.05, 'sine', 0.08, 500);
        }
        if (f.tick >= 8 && f.tick <= f.approachEnd - 2) {
            const idealDist = this.arms === 3 ? 88 : (this.arms === 1 ? 62 : 76);
            f.goal = Math.max(worldL() + 8, Math.min(worldR() - this.w - 8, dino.x + dino.w / 2 - this.dir() * idealDist - this.w / 2));
            const old = this.x;
            this.x += Math.sign(f.goal - this.x) * Math.min(22, Math.abs(f.goal - this.x));
            if (mapTheme === 'tetris') resolveTetrisWalls(this, this.x - old);
            else resolveSolidPillars(this);
            this.x = Math.max(worldL() + 8, Math.min(worldR() - this.w - 8, this.x));
            if (f.tick % 2 === 0) this.ghost();
        }
        if (f.tick >= f.approachEnd) {
            this.tel = null;
            f.phase = 'ready';
            f.tick = 0;
            f.hitMap.clear();
            this._swordCustom = true;
        }
        return;
    }

    // Give the whole string a readable startup, then retain Gemini's continuous
    // player-table timings inside it instead of adding pauses to every strike.
    if (f.phase === 'ready') {
        f.tick++;
        if (f.tick === 1) {
            this.faceP(); f.dir = this.dir();
            this.warn(this.arms === 3 ? 150 : 110, 20, Math.ceil(12/rate));
        }
        if (f.tick >= 12) { this.tel = null; f.phase = 'step'; f.tick = 0; }
        return;
    }

    // 2. PHA HỒI CHIÊU (NGẮN & MƯỢT NHƯ PLAYER)
    if (f.phase === 'recover') {
        f.tick++;
        if (f.tick >= 24) {
            this.cancelCloseCombo();
            this._closeReady = frames + 10;
            this.chuoi = [];
            this.noiThem = 0;
            this.toIdle(12);
        }
        return;
    }

    // 3. PHA THỰC THI TỪNG NHỊP TRONG CHUỖI COMBO (KHÔNG DELAY GIỮA CÁC ĐÒN!)
    const prevTick = f.tick;
    f.tick++;
    const m = danteBossGetStepMove(f);
    this._closeMove = m;

    // Khởi tạo ở frame đầu tiên của mỗi nhịp đòn
    if (f.tick === 1) {
        // Nếu người chơi chạy quá xa ngoài tầm với thì cho phép lướt đuổi theo hoặc ngắt chuỗi hợp lý
        if (Math.abs(this.gap()) > 290 || Math.abs(dino.y - this.y) > 170) {
            this.closeComboRecover();
            return;
        }
        if (f.index > 0) this.faceP();
        f.dir = this.dir();
        f.hitMap.clear();
        this.drawn = true;
        this._swordCustom = true;
        this._dayLui = 0;
        this.warn(m.whipGround ? 185 : 110, m.launch ? 38 : 14, Math.ceil(m.wind/rate));
        danteBossSpawnPhantomSwords(this, f, m);
    }

    this.facingLeft = f.dir < 0;

    // Bước tiến (Micro-step / Advance) đúng nhịp vung vũ khí giống người chơi
    if (f.tick === m.wind + 1 && this.grounded) {
        const gap = Math.abs(this.gap());
        const stepVel = gap > 46 ? m.advance : m.advance * 0.35;
        this.dashV = f.dir * stepVel * rate;
    }
    // Duy trì trượt tiến cho các đòn lướt xe / xoay côn / đấm rush
    if ((m.id === 'k1_rush' || m.id === 'dashsaw' || m.id === 'revolver' || m.id === 'pole' || m.id === 'pyro1') && f.tick >= m.wind && f.tick <= m.end) {
        const old = this.x;
        this.x = Math.max(worldL() + 8, Math.min(worldR() - this.w - 8, this.x + f.dir * 4.5));
        if (mapTheme === 'tetris') resolveTetrisWalls(this, this.x - old);
        else resolveSolidPillars(this);
    }

    // Xử lý phát đòn theo đúng chuẩn cấu trúc move của Player:
    // A. Đòn đâm/đấm liên hoàn theo `count` (Million Stab, Dance 12 Stabs, Rapid Jab)
    if (m.count) {
        const span = m.id === 'dstab' ? 56 : (m.end - m.wind);
        const k = Math.floor((f.tick - m.wind - 1) * m.count / Math.max(1, span));
        const oldK = Math.floor((prevTick - m.wind - 1) * m.count / Math.max(1, span));
        if (k >= 0 && k < m.count && k !== oldK) {
            danteBossExecuteHit(this, f, m, k);
        }
    }
    // B. Đòn đa nhịp theo mảng `hits` (Double Spin, Shredder, Balrog Combo A/B, Cavaliere, Cerberus)
    else if (m.hits && m.hits.length) {
        const hIdx = m.hits.indexOf(f.tick);
        if (hIdx >= 0) {
            m.subIdx = hIdx;
            danteBossExecuteHit(this, f, m, hIdx);
        }
    }
    // C. Đòn chém đơn / phóng sóng kiếm của DSD
    else {
        if (f.tick === m.wind + (m.waves ? 1 : 2)) {
            danteBossExecuteHit(this, f, m, 0);
        }
    }

    // Tính toán Pose cánh tay, nghiêng người (_swordLean), chồm tới (_swordLunge), xoay thân (_swordTurn)
    const progress = Math.max(0, Math.min(1, (f.tick - m.wind) / Math.max(1, m.end - m.wind)));
    const swingSin = Math.sin(progress * Math.PI);

    // Chân đá Cước Balrog / Chống sào đá Cerberus
    if (f.pattern.table === 'BLR' && ['capo', 'heel', 'waveK', 'tatsumaki', 'sidekick'].includes(m.pose)) {
        this._closeKick = { t: swingSin, high: m.pose === 'heel' || m.pose === 'sidekick' };
    } else if (f.pattern.table === 'KCB' && m.pose === 'poleVault') {
        this._closeKick = { t: swingSin, high: true };
    } else {
        this._closeKick = null;
    }

    if (['spin', 'capo', 'tatsumaki', 'corkspin', 'bikeDrift', 'airDance', 'iceAge'].includes(m.pose)) {
        const loops = m.id === 'bspin' ? 2 : 1;
        this._swordTurn = Math.cos(progress * Math.PI * 2 * loops);
        this._swordLean = 0.22 * swingSin;
        this._swordLunge = 6 * swingSin;
    } else if (['thrust', 'stab', 'ram', 'magmaFin', 'pokeFront', 'multiPoke'].includes(m.pose)) {
        this._swordTurn = 1;
        this._swordLean = 0.28 * swingSin;
        this._swordLunge = 11 * swingSin;
    } else if (['up', 'upper', 'pokeUp', 'bikeUp'].includes(m.pose)) {
        this._swordTurn = 1;
        this._swordLean = -0.18 * swingSin;
        this._swordLunge = 6 * swingSin;
    } else {
        this._swordTurn = 1;
        this._swordLean = 0.16 * swingSin;
        this._swordLunge = 5 * swingSin;
    }

    // Cập nhật Pose kiếm `dswPose` và vệt lụa kiếm khí (Slash Trail)
    if (typeof dswPose === 'function') {
        this._closePose = dswPose(this, m, f.tick);
        if (f.tick > m.wind && f.tick <= m.end) {
            for (let sample = 1; sample <= 3; sample++) {
                const subAge = f.tick - 1 + sample / 3;
                const v = dswPose(this, m, subAge);
                v.t = 8;
                // Kiểm tra lưỡi kiếm DSD thật quét trúng người chơi
                const hitIndex = m.count ? Math.floor((f.tick - m.wind - 1) * m.count / (m.id === 'dstab' ? 56 : m.end - m.wind)) : m.hits ? m.hits.filter(t => t <= f.tick).length - 1 : 0;
                const hitKey = 'blade:' + hitIndex;
                if (m.table === 'DSW' && !m.waves && hitIndex >= 0 && hitIndex < (m.count || m.hits?.length || 1) && !f.hitMap.has(hitKey) && typeof dswBladeTouches === 'function') {
                    const shift = (f.prevX - this.x) * (1 - sample / 3);
                    const hitPose = { ...v, x: v.x + shift, tx: v.tx + shift };
                    if (dswBladeTouches(dino, hitPose, 13)) {
                        f.hitMap.add(hitKey);
                        this._dayLui = m.push ? Math.min(28, m.push) : 6;
                        const hp = dino.hp;
                        this.hurtP(1);
                        if (dino.hp < hp && m.launch && dino.grounded) { dino.dy = -9.5; dino.grounded = false; }
                    }
                }
                f.trail.push(v);
            }
            if (f.trail.length > 24) f.trail.splice(0, f.trail.length - 24);
        }
    }
    f.prevX = this.x;

    // Cập nhật Kiếm Ảo Ảnh (Phantom Swords) bay kèm đòn đánh của Boss
    if (fx.phantomSwords.length && typeof danteSwordPose === 'function') {
        for (const sw of fx.phantomSwords) {
            sw.age++;
            if (!sw.launched && f.tick >= m.wind + sw.delay) {
                sw.launched = true;
                sw.origin = { x: this.cx(), y: this.y };
            } else if (sw.launched && sw.kind === 'drill') {
                sw.origin = { x: this.cx(), y: this.y };
            }
            if (sw.launched) sw.stroke++;
            sw.phase = !sw.launched ? 'formation' : (sw.stroke <= 12 ? 'slash' : 'dissolve');
            sw.alpha = Math.min(1, (sw.age + 1) / 3) * Math.max(0, 1 - Math.max(0, sw.stroke - 12) / 4);
            const pose = danteSwordPose(this, { ...sw, move: { kind: sw.kind } }, sw.stroke);
            Object.assign(sw, pose);
            if (sw.phase === 'slash') {
                sw.trail.push({ x: sw.x, y: sw.y, tx: sw.tx, ty: sw.ty, age: sw.age });
                if (!sw.hit && typeof sgSegmentBox === 'function' && sgSegmentBox(sw.x, sw.y, sw.tx, sw.ty, dino, 10) !== null) {
                    sw.hit = true;
                    this.hurtP(1);
                }
            }
            sw.trail = sw.trail.filter(v => sw.age - v.age < 4.5);
        }
        fx.phantomSwords = fx.phantomSwords.filter(sw => sw.stroke < 16);
    }

    // CHUYỂN SANG ĐÒN TIẾP THEO TRONG CHUỖI NGAY TẠI FRAME CANCEL (MƯỢT NHƯ PLAYER!)
    const stepLimit = (f.index < f.pattern.moves.length - 1) ? m.cancel : m.T;
    if (f.tick >= stepLimit) {
        f.index++;
        f.tick = 0;
        if (f.index >= f.pattern.moves.length) {
            this.closeComboRecover();
            return;
        }
    }
};
// BOSS_PART_END s17.DanteBoss.prototype.runCloseCombo.1

// Nguồn: index.html:111311 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.bossClosePickBase.1 EDITABLE
const bossClosePickBase = DanteBoss.prototype.pickSkill;
// BOSS_PART_END s17.bossClosePickBase.1

// Nguồn: index.html:111312 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.pickSkill.1 EDITABLE
DanteBoss.prototype.pickSkill = function(noiChuoi) {
    if (this.phase !== 1 || this.suSt || this.hp <= 0 || !this.grounded) {
        return bossClosePickBase.call(this, noiChuoi);
    }
    if (this.chuoi?.[0]?.startsWith('close:')) {
        this.raChieu(this.chuoi.shift());
        return;
    }
    this.chuoi = [];
    if (frames < (this._closeReady || 0)) {
        this.actionTimer = Math.min(10, this._closeReady - frames);
        return;
    }
    const gap = Math.abs(this.gap());
    // Cứ sau 2-3 chuỗi combo cận chiến thì điểm xuyết 1 đòn tầm xa (Drive / E&I / Coyote-A)
    if ((this._closeStreak || 0) >= 3 && gap < 320) {
        this._closeStreak = 0;
        const ranged = ['d_drive', 'g_twosome', 'g_coyote', 'f_hat'];
        this.raChieu(ranged[(this._closeRanged || 0) % ranged.length]);
        this._closeRanged = (this._closeRanged || 0) + 1;
        return;
    }
    if (!dino.grounded && Math.abs(dino.y - this.y) > 140) {
        this.chuoi = ['d_air'];
        this.raChieu('d_hightime');
        return;
    }
    // Danh sách xoay vòng đầy đủ Combo A, Combo B, Dance Macabre và các vũ khí
    const deck = [
        'dsd_a', 'dsd_b', 'dance',
        'balrog_a', 'balrog_b', 'balrog_rush',
        'cerberus_a', 'cerberus_b', 'cerberus_storm',
        'cavaliere_a', 'cavaliere_b', 'dsd_prop_shred', 'balrog_pyro', 'cavaliere_gear'
    ];
    const id = deck[(this._closeCursor || 0) % deck.length];
    this._closeCursor = (this._closeCursor || 0) + 1;
    if (this.startCloseCombo(id, gap > 105)) {
        this._closeStreak = (this._closeStreak || 0) + 1;
        return;
    }
    return bossClosePickBase.call(this, noiChuoi);
};
// BOSS_PART_END s17.DanteBoss.prototype.pickSkill.1

// Nguồn: index.html:111355 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.bossCloseStartBase.1 EDITABLE
const bossCloseStartBase = DanteBoss.prototype.raChieu;
// BOSS_PART_END s17.bossCloseStartBase.1

// Nguồn: index.html:111356 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.raChieu.1 EDITABLE
DanteBoss.prototype.raChieu = function(id) {
    if (id === 'd_comboA' && this.phase === 1 && this.grounded) {
        const dsdPool = ['dsd_a', 'dsd_b', 'dance'];
        const pick = dsdPool[Math.floor(Math.random() * dsdPool.length)];
        if (this.startCloseCombo(pick, Math.abs(this.gap()) > 120)) return;
    }
    if (id.startsWith('close:') && DANTE_BOSS_MELEE[id.slice(6)]) {
        if (this.startCloseCombo(id.slice(6), false)) return;
    }
    return bossCloseStartBase.call(this, id);
};
// BOSS_PART_END s17.DanteBoss.prototype.raChieu.1

// Nguồn: index.html:111368 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.bossCloseEvadeBase.1 EDITABLE
const bossCloseEvadeBase = DanteBoss.prototype.batNe;
// BOSS_PART_END s17.bossCloseEvadeBase.1

// Nguồn: index.html:111369 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.batNe.1 EDITABLE
DanteBoss.prototype.batNe = function(direction, ...args) {
    bossCloseEvadeBase.call(this, direction, ...args);
    const pool = danteBossMeleePool(this.arms);
    if (direction > 0 && this.phase === 1 && frames >= (this._closeReady || 0) && pool.length && Math.random() < 0.65) {
        this.chuoi = ['close:' + pool[Math.floor(Math.random() * pool.length)]];
    }
};
// BOSS_PART_END s17.DanteBoss.prototype.batNe.1

// Nguồn: index.html:111377 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.bossCloseRunBase.1 EDITABLE
const bossCloseRunBase = DanteBoss.prototype.runSkill;
// BOSS_PART_END s17.bossCloseRunBase.1

// Nguồn: index.html:111378 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.runSkill.1 EDITABLE
DanteBoss.prototype.runSkill = function() {
    if (this._closeCombo && (this.state === this._closeCombo.state || this.state === 'recovery')) {
        return this.runCloseCombo();
    }
    return bossCloseRunBase.call(this);
};
// BOSS_PART_END s17.DanteBoss.prototype.runSkill.1

// Nguồn: index.html:111385 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.bossCloseChainBase.1 EDITABLE
const bossCloseChainBase = DanteBoss.prototype.dmcNoi;
// BOSS_PART_END s17.bossCloseChainBase.1

// Nguồn: index.html:111386 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.dmcNoi.1 EDITABLE
DanteBoss.prototype.dmcNoi = function(...args) {
    if (this._closeCombo) return;
    return bossCloseChainBase.apply(this, args);
};
// BOSS_PART_END s17.DanteBoss.prototype.dmcNoi.1

// Nguồn: index.html:111391 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.bossCloseUpdateBase.1 EDITABLE
const bossCloseUpdateBase = DanteBoss.prototype.update;
// BOSS_PART_END s17.bossCloseUpdateBase.1

// Nguồn: index.html:111392 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.update.1 EDITABLE
DanteBoss.prototype.update = function(...args) {
    if (this._sdtDrill && (this.phase !== 2 || this.hp <= 0 || this.suSt || !['sd_drill','recovery'].includes(this.state))) this.cancelSinDrill();
    if (this._closeCombo && (this.phase !== 1 || this.hp <= 0 || this.suSt || ![this._closeCombo.state, 'recovery'].includes(this.state))) {
        this.cancelCloseCombo();
    }
    const result = bossCloseUpdateBase.apply(this, args);
    if (this._sdtDrill && (this.phase !== 2 || this.hp <= 0 || this.suSt || !['sd_drill','recovery'].includes(this.state))) this.cancelSinDrill();
    if (this._closeCombo && (this.phase !== 1 || this.hp <= 0 || this.suSt || ![this._closeCombo.state, 'recovery'].includes(this.state))) {
        this.cancelCloseCombo();
    }
    return result;
};
// BOSS_PART_END s17.DanteBoss.prototype.update.1

// Nguồn: index.html:111406 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.bossCloseDrawBase.1 EDITABLE
const bossCloseDrawBase = DanteBoss.prototype.draw;
// BOSS_PART_END s17.bossCloseDrawBase.1

// Nguồn: index.html:111407 · Dùng bởi: DanteBoss
// BOSS_PART_BEGIN s17.DanteBoss.prototype.draw.1 EDITABLE
DanteBoss.prototype.draw = function() {
    bossCloseDrawBase.call(this);
    danteDrawBossSinDrill(this);
    const f = this._closeCombo, v = this._closePose, m = this._closeMove, fx = this._comboFx;
    // Redline keeps travelling during recovery: its damaging bike stays visible.
    if (f && fx?.thrownBike) cavPaintFullBike(fx.thrownBike.x, fx.thrownBike.y, fx.thrownBike.dir, fx.spin * 1.4, -0.1, 1);
    if (!f || !v || !m || f.phase === 'recover' || f.phase === 'approach') return;

    const cx = this.cx(), cy = this.cy(), dir = f.dir;
    const sx = cx + dir * 9 + (this._swordLunge || 0) * dir * 0.5, sy = this.y + 21;

    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';

    // 0. Vẽ Kiếm Ảo Ảnh (Swordmaster Phantom Swords) của Boss
    if (fx && fx.phantomSwords.length && typeof danteDrawSword === 'function') {
        for (const sw of fx.phantomSwords) danteDrawSword(sw);
    }

    // 1. DEVIL SWORD DANTE (Arm 0): Vệt lụa đỏ 2 lớp + Cưa Shredder + Tia Million Stab + Mũi Giáo Stinger
    if (this.arms === 0) {
        for (let i = 1; i < f.trail.length; i++) {
            const u = f.trail[i - 1], w = f.trail[i];
            const alpha = (w.t / 8) * 0.45;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = w.red ? '#FF1744' : '#FF5252';
            ctx.beginPath();
            ctx.moveTo(u.x + (u.tx - u.x) * 0.45, u.y + (u.ty - u.y) * 0.45);
            ctx.lineTo(u.tx, u.ty); ctx.lineTo(w.tx, w.ty);
            ctx.lineTo(w.x + (w.tx - w.x) * 0.45, w.y + (w.ty - w.y) * 0.45);
            ctx.closePath(); ctx.fill();

            ctx.globalAlpha = alpha * 1.25;
            ctx.strokeStyle = w.red ? '#FFF8E1' : '#FFCDD2';
            ctx.lineWidth = 2.4;
            ctx.beginPath(); ctx.moveTo(u.tx, u.ty); ctx.lineTo(w.tx, w.ty); ctx.stroke();
        }
        ctx.globalAlpha = 1;

        if (v.spinbuzz && ['prop', 'shred'].includes(m.id)) {
            ctx.save();
            ctx.translate(v.x + dir * 24, v.y - 6);
            for (let k = 0; k < 3; k++) {
                const sa = v.angle + k * (Math.PI * 2 / 3);
                ctx.globalAlpha = 0.45;
                ctx.strokeStyle = k % 2 === 0 ? '#FF1744' : '#FFFFFF';
                ctx.lineWidth = 6 - k;
                ctx.beginPath(); ctx.arc(0, 0, 54 - k * 8, sa, sa + 1.7); ctx.stroke();
            }
            ctx.restore();
        }

        for (const sp of fx?.sparks || []) {
            const ratio = sp.t / sp.max;
            ctx.save();
            ctx.globalAlpha = ratio;
            ctx.translate(sp.x, sp.y); ctx.rotate(sp.ang);
            ctx.shadowColor = '#FF1744'; ctx.shadowBlur = 12;
            const ex = sp.dir * sp.len;
            ctx.strokeStyle = '#FF1744'; ctx.lineWidth = 4 * ratio;
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(ex, 0); ctx.stroke();
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.moveTo(ex + sp.dir * 14, 0);
            ctx.lineTo(ex - sp.dir * 6, -4.5 * ratio);
            ctx.lineTo(ex - sp.dir * 6, 4.5 * ratio);
            ctx.closePath(); ctx.fill();
            ctx.restore();
        }

        ctx.save();
        ctx.translate(v.x, v.y); ctx.scale(dir, 1);
        dswPaintBlade(0, 0, v.angle, v.len, v.red, v.flat);
        if (v.thrustCone > 0.15 && v.pose === 'thrust') {
            const c = v.thrustCone;
            ctx.rotate(v.angle);
            ctx.globalAlpha = 0.85 * c;
            const grad = ctx.createLinearGradient(20, 0, v.len + 55, 0);
            grad.addColorStop(0, 'rgba(255, 23, 68, 0.05)');
            grad.addColorStop(0.5, 'rgba(255, 23, 68, 0.75)');
            grad.addColorStop(1, '#FFFFFF');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.moveTo(22, -16 * c); ctx.lineTo(v.len + 52 * c, 0);
            ctx.lineTo(22, 16 * c); ctx.lineTo(38, 0);
            ctx.closePath(); ctx.fill();
        }
        ctx.restore();
        dswPaintArmIK(sx, sy, v.x, v.y, dir);
    }

    // 2. BALROG (Arm 1): Đôi găng tay Boxing 1-2 Jab, Liver Hook, Corkscrew, Magma Straight & Vệt Lửa
    else if (this.arms === 1) {
        const ign = this.dtStage >= 2 || !!m.fire;
        for (const pa of fx?.punchArcs || []) {
            const k = pa.t / pa.max;
            ctx.save();
            ctx.translate(cx, cy - 4); ctx.scale(pa.dir, 1);
            ctx.globalAlpha = k * 0.9;
            ctx.shadowColor = '#FF6D00'; ctx.shadowBlur = 16;
            const colOuter = pa.fire ? '#FF3D00' : '#FF9100';
            if (pa.type === 'jabL' || pa.type === 'crossR' || pa.type === 'magmaFin') {
                const reach = (pa.type === 'magmaFin' ? 84 : (pa.type === 'crossR' ? 66 : 54)) * (1.15 - 0.15 * k);
                const yOff = pa.type === 'jabL' ? -6 : (pa.type === 'crossR' ? 3 : 0);
                const thick = pa.type === 'magmaFin' ? 17 : 11;
                ctx.fillStyle = colOuter;
                ctx.beginPath();
                ctx.moveTo(8, yOff - thick * k); ctx.lineTo(reach, yOff - 5 * k);
                ctx.arc(reach, yOff, (thick + 2) * k, -Math.PI / 2, Math.PI / 2);
                ctx.lineTo(8, yOff + thick * k); ctx.closePath(); ctx.fill();
            } else {
                ctx.strokeStyle = colOuter; ctx.lineWidth = 14 * k;
                ctx.beginPath(); ctx.ellipse(12, 2, 64, 22, 0, -1.2, 1.15); ctx.stroke();
            }
            ctx.restore();
        }

        const pr = Math.max(0, Math.min(1, (f.tick - m.wind) / Math.max(1, m.end - m.wind)));
        const punch = Math.sin(pr * Math.PI);
        let rx = cx + dir * 15, ry = this.y + 18;
        let lx = cx + dir * 20, ly = this.y + 19;
        let rPunch = false, lPunch = false;

        if (m.pose === 'oneTwo') {
            if (f.tick < 7) {
                const p1 = Math.sin(Math.min(1, f.tick / 6) * Math.PI);
                lx = cx + dir * (16 + 34 * p1); ly = this.y + 17; lPunch = p1 > 0.2;
            } else {
                const p2 = Math.sin(Math.min(1, (f.tick - 6) / 8) * Math.PI);
                rx = cx + dir * (14 + 40 * p2); ry = this.y + 19; rPunch = p2 > 0.2;
            }
        } else if (m.pose === 'bodyHook') {
            rx = cx + dir * (10 + 42 * punch); ry = this.y + 27 - 6 * punch; rPunch = punch > 0.2;
        } else if (m.pose === 'corkspin') {
            if (f.tick < 9) {
                lx = cx + dir * (16 + 22 * punch); ly = this.y + 32 - 24 * pr; lPunch = true;
            } else {
                rx = cx + dir * (14 + 44 * punch); ry = this.y + 18; rPunch = true;
            }
        } else if (m.pose === 'magmaFin') {
            rx = cx + dir * (f.tick <= m.wind ? -10 : 12 + 48 * punch); ry = this.y + 19; rPunch = true;
        } else if (m.pose === 'rjab') {
            const alt = Math.sin(f.tick * 1.55);
            rx = cx + dir * (22 + 24 * Math.max(0, alt)); ry = this.y + 19;
            lx = cx + dir * (22 + 24 * Math.max(0, -alt)); ly = this.y + 23;
            rPunch = alt > 0; lPunch = alt < 0;
        }
        blrPaintFistArm(cx - dir * 6, this.y + 20, lx, ly, dir, ign, lPunch);
        blrPaintFistArm(cx + dir * 8, this.y + 20, rx, ry, dir, ign, rPunch);
    }

    // 3. CAVALIERE (Arm 2): Song Đại Cưa Máy hoặc Hợp Thể Siêu Mô-tô Drift
    else if (this.arms === 2) {
        const spin = fx ? fx.spin : frames * 0.65;
        if (m.bikeMode && typeof cavPaintFullBike === 'function') {
            const driftScale = m.pose === 'bikeDrift' ? (Math.cos((f.tick / m.T) * Math.PI * 2) || 0.2) : 1;
            cavPaintFullBike(cx, this.y + this.h, dir, spin, 0, driftScale);
        } else {
            const pr = Math.max(0, Math.min(1, (f.tick - m.wind) / Math.max(1, m.end - m.wind)));
            const swing = Math.sin(pr * Math.PI);
            let angL = 0.45, angR = 0.25, offLX = -10, offLY = 20, offRX = 10, offRY = 22;
            if (m.pose === 'crossSaw') {
                angL = -0.75 + 1.35 * swing; offLX = 6 + 14 * swing; offLY = 16;
                angR = 0.75 - 1.35 * swing;  offRX = 12 + 16 * swing; offRY = 24;
            } else if (m.pose === 'grindSaw') {
                angL = -0.12; offLX = 18; offLY = 16;
                angR = 0.12;  offRX = 24; offRY = 26;
            } else if (m.pose === 'slamSaw') {
                angL = f.tick < 10 ? -1.6 : 0.45;
                angR = f.tick < 10 ? -1.45 : 0.55;
                offLX = 18; offRX = 24;
            }
            cavPaintGiantSaw(cx + dir * offLX, this.y + offLY, angL, spin, dir, true);
            cavPaintGiantSaw(cx + dir * offRX, this.y + offRY, angR, spin, dir, true);
        }
    }

    // 4. KING CERBERUS (Arm 3): Vụt Côn Băng, Chọc Trường Côn Lửa, Chống Sào Đá, Múa Tam Khúc & Roi Sét
    else if (this.arms === 3) {
        const spin = fx ? fx.spin : frames * 0.55;
        if (fx?.whipLine) {
            const wl = fx.whipLine, k = wl.t / wl.max;
            ctx.save();
            ctx.globalAlpha = k;
            ctx.strokeStyle = '#E040FB'; ctx.lineWidth = 6 * k;
            ctx.beginPath(); ctx.moveTo(wl.x1, wl.y1); ctx.lineTo((wl.x1 + wl.x2) / 2, wl.y1 - 12); ctx.lineTo(wl.x2, wl.y2); ctx.stroke();
            ctx.strokeStyle = '#FFFDE7'; ctx.lineWidth = 2.5 * k; ctx.stroke();
            ctx.restore();
        }
        for (const ar of fx?.cerbArcs || []) {
            const k = ar.t / ar.max;
            ctx.save();
            ctx.translate(cx, cy - 2); ctx.scale(ar.dir, 1);
            ctx.globalAlpha = k * 0.88;
            if (ar.pose === 'slashDown' || ar.pose === 'sweepSide') {
                ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 13 * k;
                ctx.beginPath(); ctx.arc(12, 0, 68, -1.25, 0.95); ctx.stroke();
            } else if (ar.pose === 'multiPoke' || ar.pose === 'pokeFront') {
                const yOff = ar.pose === 'multiPoke' ? (ar.sub - 1) * 7 : 0;
                ctx.fillStyle = '#FF6D00';
                ctx.beginPath(); ctx.moveTo(12, yOff - 10 * k); ctx.lineTo(114, yOff); ctx.lineTo(12, yOff + 10 * k); ctx.closePath(); ctx.fill();
            } else if (ar.pose === 'boSlam') {
                ctx.strokeStyle = '#FF6D00'; ctx.lineWidth = 14 * k;
                ctx.beginPath(); ctx.arc(16, 4, 80, -1.4, 0.45); ctx.stroke();
            }
            ctx.restore();
        }

        const pr = Math.max(0, Math.min(1, (f.tick - m.wind) / Math.max(1, m.end - m.wind)));
        if (['airDance', 'iceAge', 'revolver'].includes(m.pose)) {
            ctx.save();
            ctx.translate(cx + dir * 12, cy);
            const cols = ['#00E5FF', '#FF6D00', '#E040FB'];
            for (let k = 0; k < 3; k++) {
                const ang = spin * 1.4 + k * (Math.PI * 2 / 3);
                ctx.strokeStyle = cols[k]; ctx.lineWidth = 6;
                ctx.beginPath(); ctx.arc(0, 0, 56 - k * 4, ang - 1.2, ang); ctx.stroke();
            }
            ctx.restore();
        } else if (['pokeUp', 'pokeFront', 'multiPoke'].includes(m.pose)) {
            const pitch = m.pose === 'pokeUp' ? -0.78 : (m.pose === 'multiPoke' ? ((m.subIdx || 0) - 1) * 0.14 : 0);
            const thrust = f.tick <= m.wind ? -12 : 42 * Math.sin(pr * Math.PI);
            ctx.save();
            ctx.translate(sx, sy + 2); ctx.scale(dir, 1); ctx.rotate(pitch); ctx.translate(thrust, 0);
            kcbPaintBoStaff(116, '#FF6D00');
            ctx.restore();
        } else if (m.pose === 'poleVault') {
            ctx.save();
            ctx.translate(cx + dir * 24, this.y + this.h - 46);
            ctx.rotate(Math.PI / 2 + dir * 0.12);
            kcbPaintBoStaff(104, '#FF6D00');
            ctx.restore();
        } else {
            const col = m.elem === 'bolt' ? '#E040FB' : (m.elem === 'fire' ? '#FF6D00' : '#00E5FF');
            dswPaintArmIK(sx, sy, v.x, v.y, dir);
            ctx.save();
            ctx.translate(v.x, v.y); ctx.scale(dir, 1); ctx.rotate(v.angle);
            kcbPaintBoStaff(118, col);
            ctx.restore();
        }
    }

    ctx.restore();
};
// BOSS_PART_END s17.DanteBoss.prototype.draw.1
