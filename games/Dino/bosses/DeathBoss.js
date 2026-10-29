// BOSS_FILE: DeathBoss
// BOSS_SNAPSHOT: 727b7298f5725557e84ed20d1375204ce421ac8161e96654772477c0b6e53e0c
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, String, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, aaHeSo, aaUp, bossProjectiles, bossVaoTam, canvas, checkAABB, ctx, dashVx, dino, dojoMode, floatingTexts, frames, keoBiChan, keoTuLao, minionBox, parry, platforms, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:12802 · Dùng bởi: DeathBoss, WarBoss
// BOSS_PART_BEGIN s0.pcxOf.1 READ_ONLY
function pcxOf(){ return dino.x + dino.w / 2; }
// BOSS_PART_END s0.pcxOf.1

// Nguồn: index.html:12833 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.DeathBoss.1 EDITABLE
class DeathBoss {
            constructor(level){
                this.name = "DEATH"; this.hp = 170; this.maxHp = 170;
                this.w = DT_W2; this.h = DT_H2; this.baseY = 320 - this.h;
                this.x = canvas.width - 220; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.actionTimer = 46; this.facingLeft = true;
                this.retState = 'idle'; this.lastSkill = ''; this.atkBag = []; this.invulnAll = false;
                this.burnTimer = 0; this.lastMeleeHit = -1; this.phase = 1; this.stage = 1; this._bag = null;
                this.arm = 'scythe'; this.armR = 0; this.armL = 0; this.wing = 0;
                this.slash = null; this.tel = null; this.combo = 0; this.dashV = 0; this.walk = 0;
                this.wallSide = 0; this.wallT = 0; this.wallReturnSlide = false; this.wallReturnVy = 0; this.ghosts = [];
                this.crows = []; this.thrown = []; this.reaps = []; this.souls = [];
                this.split = null; this.twin = null; this.splitDone = false;
                this.chain = null; this.gate = null; this.ultX = 0;
                this._pc = 0; this._pcAt = 0; this._pc0 = 0; this._ac = 0; this._ac0 = 0;
                this.cd = {}; this.appar = null; this._rd = 0;
                this.undead = []; this.aegis = 0; this.aegisHits = 0;
                this.fly = 0; this.hover = 0; this._hb = false;
                this.aiRieng = true; this.chuoi = []; this.noiThem = 0; this.trungLuc = -999; this.neCd = 90; this.breakCd = 120; this.dmgLog = [];
                this.feathers = []; // Hiệu ứng lông quạ đen bay tản mát khi lướt Ghost Step
            }
            minionTargets(){ return this.undead.filter(u => !u.dead && u.hp > 0)
                                 .map(u => minionBox(u, 30, 44, 3, true, false, 320 - 44)); }
            spd(){ return this.stage === 2 ? 1.02 : (this.stage === 3 ? 1.72 : 1); }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0;
                       if (this.stage !== 2) this.fly = 0;
                       this._aam = null;
                       this.actionTimer = Math.max(8, Math.round(t * DTH_TEMPO / this.spd()));
                       this.arm = 'scythe'; this.armR = 0; this.armL = 0; }
            ghost(){
                if (this.ghosts.length >= 5) this.ghosts.shift();
                this.ghosts.push({ x: this.x, y: this.y, left: this.facingLeft, arm: this.arm, armR: this.armVe !== undefined && this.stage === 2 ? this.armVe : this.armR,
                                   qn: this.quayNgang, luoi: this.luoi, t: 14 });
                // Sinh thêm lông quạ đen huyền ảo khi tạo tàn ảnh
                if (this.feathers && this.feathers.length < 18 && Math.random() < 0.65){
                    this.feathers.push({
                        x: this.cx() + (Math.random() - 0.5) * 28,
                        y: this.cy() + (Math.random() - 0.5) * 40,
                        vx: (Math.random() - 0.5) * 2.2,
                        vy: -0.6 - Math.random() * 1.4,
                        ang: Math.random() * 6.28,
                        t: 26
                    });
                }
            }
            physics(){
                if (this.wallT > 0 || this.fly > 0){ this.dy = 0; this.grounded = false; }
                else {
                    this.dy += 0.66; this.y += this.dy;
                    let land = 320;
                    for (let pf of platforms){
                        if (pf.top >= 320 || pf.wall) continue;
                        if (this.x + this.w > pf.x + 6 && this.x < pf.x + pf.w - 6 && this.dy >= 0 &&
                            (this.y + this.h) <= pf.top + 16 && (this.y + this.h) >= pf.top - 20) land = Math.min(land, pf.top);
                    }
                    if (this.y + this.h >= land){ this.y = land - this.h; this.dy = 0; this.grounded = true; } else this.grounded = false;
                }
                this.x += this.dashV; this.dashV *= 0.87;
                if (Math.abs(this.dashV) < 0.4) this.dashV = 0;
                this.x = Math.max(58, Math.min(canvas.width - this.w - 58, this.x));
            }
            canUse(id){ return !((this.cd[id] || 0) > 0); }
            paySkill(id){ if (DTH_CD[id]) this.cd[id] = DTH_CD[id]; }
            pickFrom(pool, fallback){
                pool = pool.filter(id => this.canUse(id));
                if (!pool.length) return fallback;
                if (pool.length > 1){ let f = pool.filter(x => x !== this.lastSkill); if (f.length) pool = f; }
                let c = pool[Math.floor(Math.random() * pool.length)];
                this.lastSkill = c; this.paySkill(c);
                if (c === 'p_orbit') this.cd['p_reap']  = Math.max(this.cd['p_reap']  || 0, DTH_LOCK_PAIR);
                if (c === 'p_reap')  this.cd['p_orbit'] = Math.max(this.cd['p_orbit'] || 0, DTH_LOCK_PAIR);
                return c;
            }
            tickCd(){ for (let k in this.cd) if (this.cd[k] > 0) this.cd[k]--; }
            summonReaper(kind, x, y, dir){
                this.appar = { kind: kind, x: x, y: y, dir: dir || this.dir(), t: 0 };
                shakeTimer = Math.max(shakeTimer, 18);
                if (SFX.bossSkill) SFX.bossSkill();
            }
            tickAppar(){
                let a = this.appar; if (!a) return;
                a.t++;
                if (a.kind === 'slash'){
                    if (a.t === 20){
                        let r = a.dir < 0 ? { x: a.x - DTH_APPAR_R, y: a.y - 74, w: DTH_APPAR_R, h: 168 }
                                          : { x: a.x, y: a.y - 74, w: DTH_APPAR_R, h: 168 };
                        if (checkAABB(dino, r)) this.hurtP(1);
                        shakeTimer = 30;
                        visualEffects.push(new Effect(a.x + a.dir * DTH_APPAR_R * 0.6, a.y, 'explosion', true, 54));
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (a.t > 46) this.appar = null;
                } else {
                    a.x += (this.cx() - a.x) * 0.2;
                    if (a.t > 16 && a.t < 66 && a.t % 8 === 1){
                        if (dthQuetNgang(a.x, DTH_SPIN_RX - 8)) this.hurtP(1);
                        if (SFX.tone) SFX.tone(380, 0.05, 'square', 0.10, 180);
                    }
                    if (a.t > 80) this.appar = null;
                }
            }
            drawAppar(){
                let a = this.appar; if (!a) return;
                ctx.save();
                if (a.kind === 'slash'){
                    let k = Math.min(1, a.t / 20);
                    ctx.globalAlpha = a.t < 20 ? (0.24 + 0.38*k) : Math.max(0, 0.60 * (1 - (a.t-20)/26));
                    let bx = a.x + a.dir * DTH_APPAR_R * 0.42 - 46;
                    drawReaperDeath({ facingLeft: a.dir < 0, armR: a.t < 20 ? -1.9 + k*1.4 : -0.3, wing: this.wing },
                                    bx, a.y - 92);
                    if (a.t < 20){
                        ctx.globalAlpha = 0.30 + 0.45*k;
                        ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 3; ctx.setLineDash([9,7]); ctx.lineDashOffset = -frames;
                        ctx.strokeRect(a.dir < 0 ? a.x - DTH_APPAR_R : a.x, a.y - 74, DTH_APPAR_R, 168);
                        ctx.setLineDash([]);
                    } else {
                        ctx.globalAlpha = Math.max(0, 1 - (a.t-20)/22);
                        ctx.shadowColor = "#00E676"; ctx.shadowBlur = 14;
                        ctx.strokeStyle = "#E8F5E9"; ctx.lineWidth = 9; ctx.lineCap = "round";
                        for (let q = 0; q < 3; q++){
                            ctx.beginPath();
                            ctx.arc(a.x, a.y, DTH_APPAR_R - q*24, a.dir<0 ? Math.PI-0.9 : -0.9, a.dir<0 ? Math.PI+0.9 : 0.9, false);
                            ctx.stroke();
                        }
                    }
                } else {
                    let k = Math.min(1, a.t / 16), dBang = 320 - (DTH_NGANG_TREN + DTH_NGANG_DUOI) / 2;
                    ctx.globalAlpha = a.t < 16 ? 0.35 + 0.35*k : Math.max(0, 0.75 * (1 - Math.max(0, a.t-66)/14));
                    drawReaperDeath({ facingLeft: this.facingLeft, armR: 1.1, wing: this.wing,
                                      quayNgang: a.t < 16 ? 0 : (a.t - 16) * 0.42, loeT: a.t < 16 ? 16 - a.t : 0 },
                                    a.x - 46, dBang - 62);
                    ctx.globalAlpha = a.t < 16 ? 0.3 + 0.4 * k : 0.25;
                    ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 2; ctx.setLineDash([10, 7]);
                    ctx.strokeRect(a.x - DTH_SPIN_RX + 8, 320 - DTH_NGANG_TREN, (DTH_SPIN_RX - 8) * 2, DTH_NGANG_TREN - DTH_NGANG_DUOI);
                    ctx.setLineDash([]);
                }
                ctx.restore();
            }
            warn(reach, up, t){ this.tel = { dir: this.dir(), reach: reach, up: up, t: t, max: t }; }
            doSlash(reach, up, life, dmg){ let _k=aaHeSo(this); reach*=_k; up=aaUp(this,up); this.slash = { t: life, dir: this.dir(), reach: reach, up: up, hit: false, dmg: dmg || 1 }; }
            slashRect(){
                let a = this.slash; if (!a) return { x:0,y:0,w:0,h:0 };
                return a.dir < 0 ? { x: this.x - a.reach, y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 }
                                 : { x: this.x + this.w, y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 };
            }
            toWall(side){
                this.wallSide = side;
                this.wallReturnSlide = false; this.wallReturnVy = 0;
                this.x = side < 0 ? 62 : canvas.width - this.w - 62;
                this.y = DTH_WALL_Y; this.dy = 0; this.wallT = 1;
                this.facingLeft = side > 0;
                for (let k = 0; k < 4; k++) this.ghost();
                if (SFX.tone) SFX.tone(760, 0.10, 'sine', 0.12, 300);
            }
            tickCrows(){
                for (let i = this.crows.length - 1; i >= 0; i--){
                    let c = this.crows[i]; c.life--; c.w2 += 0.3;
                    let a = Math.atan2((dino.y + dino.h/2) - c.y, (dino.x + dino.w/2) - c.x);
                    c.vx += (Math.cos(a)*6.4 - c.vx) * 0.06; c.vy += (Math.sin(a)*6.4 - c.vy) * 0.06;
                    c.x += c.vx + Math.cos(c.w2)*1.6; c.y += c.vy + Math.sin(c.w2*1.3)*1.6;
                    for (let pi = projectiles.length - 1; pi >= 0; pi--){
                        let pr = projectiles[pi]; if (!pr || pr.owner !== 1) continue;
                        if (!checkAABB(pr, { x: c.x-12, y: c.y-10, w: 24, h: 20 })) continue;
                        c.dead = true; visualEffects.push(new Effect(c.x, c.y, 'explosion', true, 12));
                        if (!(pr.type === 2 || (pr.pierceCount||0) > 0)) projectiles.splice(pi, 1);
                        break;
                    }
                    if (!c.dead && checkAABB(dino, { x: c.x-11, y: c.y-9, w: 22, h: 18 })){ c.dead = true; this.hurtP(1); }
                    if (c.dead || c.life <= 0) this.crows.splice(i, 1);
                }
            }
            tickThrown(){
                for (let i = this.thrown.length - 1; i >= 0; i--){
                    let t = this.thrown[i]; t.spin += 0.55; t.life--;
                    if (!t.back){
                        t.x += t.vx; t.y += t.vy;
                        if (t.life < t.max - 34) t.back = true;
                    } else {
                        let a = Math.atan2(this.cy() - t.y, this.cx() - t.x);
                        t.vx += (Math.cos(a)*16 - t.vx) * 0.20; t.vy += (Math.sin(a)*16 - t.vy) * 0.20;
                        t.x += t.vx; t.y += t.vy;
                        if (Math.abs(t.x - this.cx()) < 30 && Math.abs(t.y - this.cy()) < 30) t.dead = true;
                    }
                    if (t.hitCd > 0) t.hitCd--;
                    if (t.hitCd <= 0 && checkAABB(dino, { x: t.x-20, y: t.y-20, w: 40, h: 40 })){ t.hitCd = 40; this.hurtP(1); }
                    if (t.dead || t.life <= 0) this.thrown.splice(i, 1);
                }
            }
            tickReaps(){
                for (let i = this.reaps.length - 1; i >= 0; i--){
                    let r = this.reaps[i]; r.t--;
                    if (r.t === 0){
                        if (checkAABB(dino, { x: r.x - 46, y: 120, w: 92, h: 210 })) this.hurtP(2);
                        visualEffects.push(new Effect(r.x, 300, 'explosion', true, 62));
                        shakeTimer = Math.max(shakeTimer, 24);
                    }
                    if (r.t < -20) this.reaps.splice(i, 1);
                }
            }
            tickSouls(){
                for (let i = this.souls.length - 1; i >= 0; i--){
                    let s = this.souls[i]; s.life--; s.w2 += 0.16;
                    let a = Math.atan2((dino.y + dino.h/2) - s.y, (dino.x + dino.w/2) - s.x);
                    s.vx += (Math.cos(a)*3.4 - s.vx) * 0.045; s.vy += (Math.sin(a)*3.4 - s.vy) * 0.045;
                    s.x += s.vx; s.y += s.vy;
                    for (let pi = projectiles.length - 1; pi >= 0; pi--){
                        let pr = projectiles[pi]; if (!pr || pr.owner !== 1) continue;
                        if (!checkAABB(pr, { x: s.x-13, y: s.y-13, w: 26, h: 26 })) continue;
                        s.dead = true; visualEffects.push(new Effect(s.x, s.y, 'explosion', true, 14));
                        if (!(pr.type === 2 || (pr.pierceCount||0) > 0)) projectiles.splice(pi, 1);
                        break;
                    }
                    if (!s.dead && checkAABB(dino, { x: s.x-12, y: s.y-12, w: 24, h: 24 })){ s.dead = true; this.hurtP(1); }
                    if (s.dead || s.life <= 0) this.souls.splice(i, 1);
                }
            }
            // ======================= PHA 2: REAPER FORM =======================
            startPhase2(){
                if (this.stage === 2) return this.startStage3();
                this.stage = 2; this.hp = 120; this.maxHp = 120; this.invulnAll = true;
                this.name = "DEATH — REAPER FORM";
                this.state = 'reap_wake'; this.subTimer = 0; this._bag = null; this.atkBag = [];
                this.w = 92; this.h = 108; this.baseY = 320 - this.h;
                this.wallT = 0; this.wallSide = 0; this.slash = null; this.tel = null;
                this.crows.length = 0; this.thrown.length = 0;
                bossProjectiles.length = 0;
                this.y = 150; this.dy = 0; this.fly = 99999; this.hover = this.baseY - 6; this.rSong = []; this.rpS = {};
                floatingTexts.push(new FloatingText(this.cx() - 110, 130, "REAPER FORM!"));
                shakeTimer = 96; if (SFX.bossEntry) SFX.bossEntry();
            }
            update(){
                if (this.state === 'entering'){ this.physics(); this.x -= 4; if (this.x < canvas.width - 250) this.toIdle(36); return; }
                for (let i = this.ghosts.length - 1; i >= 0; i--){ this.ghosts[i].t--; if (this.ghosts[i].t <= 0) this.ghosts.splice(i, 1); }
                for (let i = (this.feathers || []).length - 1; i >= 0; i--){
                    let f = this.feathers[i]; f.x += f.vx; f.y += f.vy; f.ang += 0.08;
                    if (--f.t <= 0) this.feathers.splice(i, 1);
                }
                if (this.tel){ this.tel.t--; if (this.tel.t <= 0) this.tel = null; }
                if (this.slash){ this.slash.t--; if (this.slash.t <= 0) this.slash = null; }
                this.wing += 0.08;
                this.tickCd(); this.tickAppar(); this.tickUndead();
                this.tickCrows(); this.tickThrown(); this.tickReaps(); this.tickSouls();
                this.physics();
                if (this.slash){
                    let r = this.slashRect();
                    if (!this.slash.hit && checkAABB(dino, r)){ this.slash.hit = true; this.hurtP(this.slash.dmg); }
                }
                if (this.split){ this.splitStep(); return; }
                if (this.stage !== 2 && this.aiRieng){
                    if (this.d2Tick()) return;
                    if (String(this.state).startsWith('d2_')){ this.d2Chay(); return; }
                }
                if (this.state === 'aa_moc' || this.state === 'w_airpull'){
                    if (this.stage === 2){ this.state = 'r_nhay'; this.subTimer = 0; this._aam = null; this.rpS = {}; }
                    else { this.tickChain(); this.aaMocTick(); return; }
                }
                if (this.stage === 1 && !this.splitDone && this.hp <= this.maxHp * 0.35 && this.state === 'idle'){
                    this.split = { t: 0, gate: 0, gateT: 0 }; this.state = 'splitting'; return;
                }
                if (this.stage === 2) return this.updateReaper();
                if (this.stage === 3) return this.updateReturned();
                if (this.state === 'idle'){
                    this.faceP();
                    { let tr = this.x; bossVaoTam(this, 64, 124, 6.0); this.walk += Math.abs(this.x - tr); }
                    this.actionTimer--;
                    if (this.actionTimer <= 0) this.pickSkill();
                    return;
                }
                this.runSkill();
            }
            danhXaTiep(near){
                return !near || (this._daCan && Math.random() < 0.85);
            }
            pickSkill(){
                if (this.aiRieng){ this.d2Chon(); return; }
                let ad = Math.abs(this.gap()), near = ad < 170;
                let dungXa = this.danhXaTiep(near);
                let c = dungXa
                    ? this.pickFrom(['e_glaive','e_crow','e_wall','e_throw','e_wallrain','e_tele'], 'e_combo')
                    : this.pickFrom(['e_claw','e_harvest','e_mace','e_tele','e_claw'], 'e_combo');
                this._daCan = !dungXa;
                this.state = c; this.subTimer = 0; this.combo = 0; this.faceP();
            }
            runSkill(){
                if (this.state === 'returning') {
                    this.invulnAll = false;
                    this.subTimer += 1;

                    if (this.wallT > 0) {
                        const wallX = this.wallSide < 0 ? 62 : canvas.width - this.w - 62;
                        this.x += Math.sign(wallX - this.x) * Math.min(8, Math.abs(wallX - this.x));
                        this.x = wallX;
                        this.y = DTH_WALL_Y;
                        this.dy = 0;

                        if (this.subTimer >= 24) {
                            this.wallT = 0;
                            this.wallReturnSlide = true;
                            this.wallReturnVy = 2.2;
                            this.subTimer = 0;
                        }
                        return;
                    }

                    if (this.wallReturnSlide) {
                        this.x = this.wallSide < 0 ? 62 : canvas.width - this.w - 62;
                        this.y += this.wallReturnVy;
                        this.wallReturnVy = Math.min(10, this.wallReturnVy + 0.55);
                        if (this.y >= this.baseY) {
                            this.y = this.baseY;
                            this.dy = 0;
                            this.wallReturnSlide = false;
                            this.wallSide = 0;
                            this.subTimer = 0;
                            this.toIdle(34);
                        }
                        return;
                    }

                    const px = dino.x + dino.w / 2;
                    const away = this.cx() >= px ? 1 : -1;
                    this.x += away * 4.2;
                    this.x = Math.max(58, Math.min(canvas.width - this.w - 58, this.x));
                    if (this.subTimer >= 28) this.toIdle(34);
                    return;
                }

                let st = this.state, sp = this.spd(); this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;
                // ============ CAP LUOI HAI: COMBO 5 NHAT ============
                if (st === 'e_combo'){
                    this.arm = 'scythe';
                    let warns = [6, 24, 42, 60, 82], hits = [16, 34, 52, 70, 98];
                    if (this.subTimer < 100 && Math.floor(this.subTimer) % 2 === 0){
                        let g = this.gap(); if (Math.abs(g) > 74) this.x += Math.sign(g) * 3.0;
                    }
                    for (let k = 0; k < 5; k++){
                        if (T(warns[k])){ this.faceP(); this.warn(k === 4 ? 130 : 92, k === 4 ? 34 : 18, hits[k]-warns[k]); }
                        if (T(hits[k])){
                            this.faceP(); let big = k === 4;
                            this.armR = (k % 2) ? -1.5 : -0.4; this.armL = (k % 2) ? -0.4 : -1.5;
                            this.doSlash(big ? 130 : 92, big ? 34 : 18, big ? 16 : 10, 1);
                            this.dashV = this.dir() * (big ? 10 : 5);
                            if (big){ shakeTimer = 24; this.summonReaper('slash', this.cx(), this.cy()); }
                            else if (SFX.tone) SFX.tone(520 - k*40, 0.06, 'square', 0.11, 260);
                        }
                    }
                    if (this.subTimer > 128) this.toIdle(30);
                    return;
                }
                // ============ VU KHI PHU: VUOT ============
                if (st === 'e_claw'){
                    this.arm = 'claw';
                    let hits = [10, 20, 30, 44];
                    if (T(4)){ this.faceP(); this.warn(72, 16, 6); }
                    for (let k = 0; k < 4; k++) if (T(hits[k])){
                        this.faceP();
                        this.armR = (k%2) ? -1.9 : -0.5; this.armL = (k%2) ? -0.5 : -1.9;
                        this.doSlash(k === 3 ? 92 : 72, k === 3 ? 26 : 14, 8, 1);
                        this.dashV = this.dir() * (k === 3 ? 11 : 6);
                        if (SFX.tone) SFX.tone(760 - k*60, 0.04, 'square', 0.09, 400);
                    }
                    if (this.subTimer > 64) this.toIdle(26);
                    return;
                }
                // ============ VU KHI PHU: LUOI NEM ============
                if (st === 'e_glaive'){
                    this.arm = 'claw';
                    if (T(16)){ this.faceP(); this.armR = -1.5; }
                    if (T(30)){
                        let d2 = this.dir();
                        let bp = new BossProjectile(this.cx() + d2*24, this.y + 26, 14 * d2, 0, false, 1);
                        bp.w = 34; bp.h = 34; bp.color = "#C8CEDA"; bp.crescent = true; bp.isPiercing = true;
                        bossProjectiles.push(bp);
                        let bp2 = new BossProjectile(this.cx() + d2*24, this.y + 52, 14 * d2, 0, false, 1);
                        bp2.w = 34; bp2.h = 34; bp2.color = "#C8CEDA"; bp2.crescent = true; bp2.isPiercing = true;
                        bossProjectiles.push(bp2);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 60) this.toIdle(32);
                    return;
                }
                // ============ HARVEST ============
                if (st === 'e_harvest'){
                    this.arm = 'scythe';
                    if (T(10)) this.summonReaper('spin', this.cx(), this.cy());
                    if (this.subTimer > 10 && this.subTimer < 84){
                        this.armR += (-2.3 - this.armR) * 0.2; this.armL += (-2.3 - this.armL) * 0.2;
                        if (this.subTimer > 26) this.x += this.dir() * 1.0;
                    }
                    if (this.subTimer > 100) this.toIdle(34);
                    return;
                }
                // ============ CHUY HẠNG NẶNG (HEAVY MACE SLAM) ============
                if (st === 'e_mace'){
                    this.arm = 'mace';
                    if (T(10)){ this.faceP(); this.armR = -2.4; floatingTexts.push(new FloatingText(this.x - 18, this.y - 34, "HEAVY GLAIVE")); }
                    if (T(44)){ this.warn(120, 16, 20); }
                    if (T(64)){
                        this.armR = 0.6; shakeTimer = 34;
                        this.doSlash(120, 16, 16, 1);
                        visualEffects.push(new Effect(this.cx() + this.dir()*54, this.y + this.h, 'explosion', true, 62));
                        for (let s2 = -1; s2 <= 1; s2 += 2){
                            let w = new BossProjectile(this.cx() + s2*30, 322 - 74, s2 * 9.5, 0, true, 1);
                            w.w = 42; w.h = 74; w.color = "#69F0AE"; w.crescent = true; w.isPiercing = true;
                            bossProjectiles.push(w);
                        }
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 96) this.toIdle(40);
                    return;
                }
                // ============ TELEPORT SLASH ============
                if (st === 'e_tele'){
                    if (T(10)){ for (let k = 0; k < 4; k++) this.ghost();
                        let s2 = (dino.x + dino.w/2) < canvas.width/2 ? 1 : -1;
                        this.teleTo = Math.max(62, Math.min(canvas.width - this.w - 62, dino.x + dino.w/2 + s2*70 - this.w/2));
                        if (SFX.tone) SFX.tone(1200, 0.08, 'sine', 0.12, 380);
                    }
                    if (this.teleTo != null){
                        let dx = this.teleTo - this.x;
                        this.y = this.baseY; this.dy = 0;
                        if (Math.abs(dx) <= 30){ this.x = this.teleTo; this.teleTo = null; this.faceP();
                            for (let k = 0; k < 3; k++) this.ghost(); }
                        else { this.x += Math.sign(dx) * 30; this.ghost(); this.faceP(); }
                    }
                    if (T(38)){ this.warn(104, 24, 16); this.faceP(); }
                    if (T(54)){ this.armR = -1.6; this.doSlash(104, 24, 14, 1); this.dashV = this.dir()*9; }
                    if (this.subTimer > 76){ this.teleTo = null; this.toIdle(26); }
                    return;
                }
                // ============ NEM LUOI HAI ============
                if (st === 'e_throw'){
                    this.arm = 'scythe';
                    if (T(14)) this.faceP();
                    if (T(26) || T(40)){
                        let k = this.subTimer < 34 ? -1 : 1;
                        let a = Math.atan2((dino.y + dino.h/2) - this.cy(), (dino.x + dino.w/2) - this.cx()) + k*0.14;
                        this.thrown.push({ x: this.cx(), y: this.cy(), vx: Math.cos(a)*13, vy: Math.sin(a)*13,
                                           spin: 0, life: 96, max: 96, back: false, hitCd: 0, dead: false });
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 70) this.toIdle(34);
                    return;
                }
                // ============ MURDER: bay qua ============
                if (st === 'e_crow'){
                    if (T(22)){
                        for (let k = 0; k < 7; k++){
                            let a = -1.2 + k * 0.4;
                            this.crows.push({ x: this.cx(), y: this.cy() - 10, vx: Math.cos(a)*5, vy: Math.sin(a)*5,
                                              w2: k, life: 300, dead: false });
                        }
                        floatingTexts.push(new FloatingText(this.x - 16, this.y - 34, "MURDER OF CROWS"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 50) this.toIdle(34);
                    return;
                }
                // ============ TREO TUONG roi BO XUONG ============
                if (st === 'e_wall'){
                    if (T(8)){
                        let s2 = (dino.x + dino.w/2) < canvas.width/2 ? -1 : 1;
                        this.toWall(s2);
                        floatingTexts.push(new FloatingText(this.x - 10, this.y - 26, "SHADOW LEAP"));
                    }
                    if (this.subTimer > 8 && this.subTimer < 62){
                        this.y = DTH_WALL_Y + Math.sin(this.subTimer * 0.09) * 14;
                        this.faceP();
                    }
                    if (T(62)){
                        this.wallT = 0;
                        this.dashV = -this.wallSide * 15; this.dy = 6;
                        this.arm = 'scythe'; this.armR = -2.2;
                        this.doSlash(112, 40, 26, 1);
                        for (let k = 0; k < 5; k++) this.ghost();
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 62 && this.grounded && !this._hb){
                        this._hb = true; shakeTimer = 30;
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 58));
                        if (checkAABB(dino, { x: this.cx()-88, y: this.baseY-14, w: 176, h: this.h+18 })) this.hurtP(1);
                    }
                    if (this.subTimer > 104){ this._hb = false; this.wallT = 0; this.toIdle(34); }
                    return;
                }
                // ============ TREO TUONG roi RAI LUOI HAI XUONG ============
                if (st === 'e_wallrain'){
                    if (T(8)){
                        let s2 = (dino.x + dino.w/2) < canvas.width/2 ? 1 : -1;
                        this.toWall(s2);
                    }
                    if (this.subTimer > 8 && this.subTimer < 116){
                        this.y = DTH_WALL_Y + Math.sin(this.subTimer * 0.07) * 18;
                        this.faceP();
                        if (Math.floor(this.subTimer) % 16 === 0){
                            let a = Math.atan2((dino.y + dino.h/2) - this.cy(), (dino.x + dino.w/2) - this.cx());
                            this.thrown.push({ x: this.cx(), y: this.cy(), vx: Math.cos(a)*12, vy: Math.sin(a)*12,
                                               spin: 0, life: 90, max: 90, back: false, hitCd: 0, dead: false });
                        }
                    }
                    if (T(116)){ this.wallT = 0; this.dy = 4; }
                    if (this.subTimer > 138){ this.wallT = 0; this.toIdle(36); }
                    return;
                }
                this.toIdle(34);
            }
            // ======================= PHA 2: REAPER FORM =======================
            rpDat(){ return this.baseY - 6 + Math.sin(frames * 0.06) * 3; }
            rpChon(){
                let g = Math.abs(this.gap()), cao = (dino.y + dino.h) < 272, W;
                if (cao) W = { r_nhay: 4, r_moc: 3, r_combo: g < 170 ? 2 : 0 };
                else if (g < 170) W = { r_combo: 5, r_harv: 2, r_bo: 2, r_moc: 1 };
                else if (g < 340) W = { r_luot: 3, r_moc: 3, r_harv: 2, r_bo: 1, r_nhay: 1 };
                else W = { r_luot: 3, r_nhay: 3, r_moc: 1, p_reap: 2 };
                let ds = [], tong = 0;
                for (const k in W) if (W[k] > 0 && this.canUse(k) && k !== this.lastSkill){ ds.push([k, W[k]]); tong += W[k]; }
                if (!tong) return this.canUse('r_combo') || g >= 170 ? (g < 170 ? 'r_combo' : 'r_luot') : 'r_luot';
                let r = Math.random() * tong, c = ds[0][0];
                for (const [k, w] of ds){ r -= w; if (r <= 0){ c = k; break; } }
                this.lastSkill = c; if (RP_CD[c]) this.cd[c] = RP_CD[c];
                return c;
            }
            rpTickSong(){
                if (!this.rSong) this.rSong = [];
                for (let i = this.rSong.length - 1; i >= 0; i--){
                    let s = this.rSong[i]; s.t++; s.x += s.v;
                    if (!s.hit && checkAABB(dino, { x: s.x - 16, y: 320 - 40, w: 32, h: 40 })){ s.hit = 1; this.hurtP(1); }
                    if (s.t > 70 || s.x < 40 || s.x > canvas.width - 40) this.rSong.splice(i, 1);
                }
            }
            updateReaper(){
                this.rpTickSong();
                if (this.state === 'reap_wake'){
                    this.subTimer++;
                    this.y += (this.rpDat() - this.y) * 0.05;
                    if (this.subTimer % 4 === 0) this.ghost();
                    if (this.subTimer % 6 === 0) visualEffects.push(new Effect(this.cx()+(Math.random()-0.5)*120, this.cy()+(Math.random()-0.5)*120, 'explosion', true, 26));
                    if (this.subTimer > 100){ this.invulnAll = false; this.toIdle(30); }
                    return;
                }
                if (this.state !== 'r_nhay') this.y += (this.rpDat() - this.y) * 0.12;
                this.armVe = (this.armVe === undefined ? this.armR : this.armVe) + (this.armR - (this.armVe === undefined ? this.armR : this.armVe)) * 0.38;
                this.luoi = (this.state === 'r_combo' && this.subTimer > 50) ? 'dai' : (LUOI_THEO_CHIEU[this.state] || 'thuong');
                if (this.loeT > 0) this.loeT--;
                if (this.state !== 'r_harv') this.quayNgang = null;
                if (this.state === 'idle'){
                    this.faceP();
                    let g = this.gap(), ag = Math.abs(g);
                    if (ag > 140) this.x += Math.sign(g) * Math.min(3.0, (ag - 140) * 0.05);
                    else if (ag < 80) this.x -= Math.sign(g || 1) * 1.6;
                    this.actionTimer--;
                    if (this.actionTimer <= 0){ this.state = this.rpChon(); this.subTimer = 0; this.faceP(); this.rpS = {}; }
                    return;
                }
                this.runReaper();
            }
            runReaper(){
                let st = this.state, sp = 1; this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n, S = this.rpS || (this.rpS = {});
                if (st === 'r_combo'){
                    const N = [18, 40, 66];
                    if (T(1)){ this.faceP(); this.warn(150, 30, 17); this.armR = -2.0; }
                    if (T(N[0])){ this.faceP(); this.armR = 0.9; this.dashV = this.dir() * 6; this.doSlash(150, 30, 8, 1); if (SFX.tone) SFX.tone(260, 0.12, 'sawtooth', 0.16, 120); }
                    if (T(N[0] + 8)){ this.warn(140, 90, 14); this.armR = 1.4; }
                    if (T(N[1])){ this.faceP(); this.armR = -2.3; this.dashV = this.dir() * 5; this.doSlash(140, 90, 8, 1); for (let k = 0; k < 3; k++) this.ghost(); if (SFX.tone) SFX.tone(330, 0.12, 'sawtooth', 0.16, 160); }
                    if (T(N[1] + 8)){ this.warn(180, 20, 18); this.armR = -2.8; }
                    if (T(N[2])){
                        this.faceP(); this.armR = 1.3; this.dashV = this.dir() * 4; this.doSlash(180, 20, 9, 1);
                        shakeTimer = Math.max(shakeTimer, 16);
                        visualEffects.push(new Effect(this.cx() + this.dir() * 120, 310, 'explosion', true, 40));
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > N[2] + 22) this.toIdle(50);
                    return;
                }
                if (st === 'r_harv'){
                    if (T(1)){ floatingTexts.push(new FloatingText(this.cx() - 40, this.y - 20, "HARVEST")); this.faceP(); this.loeT = 16; }
                    if (this.subTimer < 16){ this.armR = 1.1; return; }
                    if (this.subTimer < 88){
                        this.quayNgang = (this.quayNgang || 0) + 0.42;
                        let g = this.gap(); this.x += Math.sign(g) * Math.min(2.6, Math.abs(g) * 0.05);
                        if (Math.floor(this.subTimer) % 5 === 0) this.ghost();
                        if (T(24) || T(48) || T(72)){
                            if (dthQuetNgang(this.cx(), 150)) this.hurtP(1);
                            if (SFX.tone) SFX.tone(420, 0.06, 'square', 0.12, 200);
                        }
                        return;
                    }
                    this.quayNgang = null; this.armR = 0;
                    if (this.subTimer > 106) this.toIdle(54);
                    return;
                }
                if (st === 'r_luot'){
                    if (T(1)){ this.faceP(); this.armR = -1.8; S.dir = this.dir(); }
                    if (this.subTimer < 22){ this.tel = { dir: S.dir, reach: 260, up: 20, t: 2, max: 2 }; return; }
                    if (T(22)){ this.dashV = S.dir * 19; this.armR = 1.1; this.doSlash(120, 30, 14, 1); if (SFX.bossExplode) SFX.bossExplode(); }
                    if (this.subTimer < 40 && Math.floor(this.subTimer) % 2 === 0) this.ghost();
                    if (this.subTimer > 58){ this.armR = 0; this.toIdle(46); }
                    return;
                }
                if (st === 'r_moc'){
                    if (T(1)){ this.faceP(); this.armR = -2.4; S.dir = this.dir(); floatingTexts.push(new FloatingText(this.cx() - 50, this.y - 20, "DEATHGRIP")); }
                    if (this.subTimer < 20){ this.tel = { dir: S.dir, reach: 270, up: 0, t: 2, max: 2 }; return; }
                    if (T(20)){
                        this.armR = 0.6;
                        let box = S.dir < 0 ? { x: this.x - 270, y: this.y + 20, w: 270, h: 56 } : { x: this.x + this.w, y: this.y + 20, w: 270, h: 56 };
                        S.moc = { t: 0, x: this.cx() + S.dir * 270 };
                        if (checkAABB(dino, box) && !dino.isShielding()){ this.hurtP(1); S.keo = 1; }
                        else if (checkAABB(dino, box)) this.hurtP(1);
                    }
                    if (S.moc) S.moc.t++;
                    if (S.keo && this.subTimer < 38){
                        let tx = this.cx() + S.dir * 70 - dino.w / 2;
                        dino.x += (tx - dino.x) * 0.3; if ('dy' in dino){ dino.dy = Math.max(dino.dy, 0); }
                    }
                    if (this.subTimer > 40){
                        S.moc = null;
                        if (S.keo){ this.state = 'r_combo'; this.subTimer = 8; this.rpS = {}; return; }
                        this.armR = 0; this.toIdle(44);
                    }
                    return;
                }
                if (st === 'r_bo'){
                    if (T(1)){ this.faceP(); floatingTexts.push(new FloatingText(this.cx() - 40, this.y - 20, "PHÁN XỬ")); }
                    if (this.subTimer < 34){ this.armR += (-3.0 - this.armR) * 0.15; this.tel = { dir: this.dir(), reach: 190, up: 10, t: 2, max: 2 }; return; }
                    if (T(34)){
                        this.armR = 1.5; this.doSlash(190, 10, 8, 1); shakeTimer = Math.max(shakeTimer, 22);
                        let x0 = this.cx() + this.dir() * 150;
                        for (const v of [-6, 6]) this.rSong.push({ x: x0, v: v, t: 0, hit: 0 });
                        visualEffects.push(new Effect(x0, 305, 'explosion', true, 60));
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 66){ this.armR = 0; this.toIdle(52); }
                    return;
                }
                if (st === 'r_nhay'){
                    if (T(1)){ this.faceP(); S.x0 = this.x; S.y0 = this.y; S.tx = Math.max(62, Math.min(canvas.width - this.w - 62, dino.x + dino.w / 2 - this.w / 2)); }
                    if (this.subTimer < 14){ this.y = S.y0 + this.subTimer * 1.2; this.armR = -2.6; return; }
                    if (this.subTimer < 20) S.tx = Math.max(62, Math.min(canvas.width - this.w - 62, dino.x + dino.w / 2 - this.w / 2));
                    if (this.subTimer <= 48){
                        let u = (this.subTimer - 14) / 34;
                        this.x = S.x0 + (S.tx - S.x0) * u;
                        this.y = S.y0 - Math.sin(u * Math.PI) * 150;
                        if (Math.floor(this.subTimer) % 3 === 0) this.ghost();
                        this.tel = { dir: this.dir(), reach: 0, up: 0, t: 2, max: 2 };
                        if (T(48)){
                            this.y = this.rpDat(); this.armR = 1.4; shakeTimer = Math.max(shakeTimer, 26);
                            let box = { x: this.cx() - 110, y: 320 - 70, w: 220, h: 70 };
                            if (checkAABB(dino, box)) this.hurtP(1);
                            visualEffects.push(new Effect(this.cx(), 310, 'explosion', true, 70));
                            if (SFX.bossExplode) SFX.bossExplode();
                        }
                        return;
                    }
                    if (this.subTimer > 72){ this.armR = 0; this.toIdle(48); }
                    return;
                }
                if (st === 'p_reap'){
                    if (T(12)) floatingTexts.push(new FloatingText(this.cx()-70, 132, "TỬ THẦN GIÁNG"));
                    this.armR = -2.6;
                    let go = [24, 54];
                    for (let k = 0; k < 2; k++) if (T(go[k])){
                        this.reaps.push({ x: Math.max(90, Math.min(canvas.width - 90, dino.x + dino.w / 2)), t: 44 });
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 110){ this.armR = 0; this.toIdle(50); }
                    return;
                }
                this.toIdle(34);
            }
            // ================= PHAN TACH LINH HON (Soul Splitter) =================
            splitStep(){
                let sp = this.split; if (!sp) return;
                sp.t++;
                let LX = 86, RX = canvas.width - this.w - 86;
                if (sp.t === 1){
                    this.x = LX; this.y = this.baseY; this.dy = 0; this.dashV = 0;
                    this.twin = { x: RX, y: this.baseY, left: true, armR: 0, arm: 'scythe', slash: null, t: 0 };
                    this.invulnAll = true;
                    floatingTexts.push(new FloatingText(canvas.width/2 - 110, 128, "SOUL SPLITTER"));
                    shakeTimer = 60; if (SFX.bossEntry) SFX.bossEntry();
                    for (let k = 0; k < 6; k++) this.ghost();
                }
                if (sp.t < 56) return;
                let cyc = sp.t - 56, per = 64;
                let round = Math.floor(cyc / per);
                if (round >= 4){
                    if (!sp.gate){
                        sp.gate = 1; sp.gateT = 0;
                        floatingTexts.push(new FloatingText(this.twin.x - 40, this.twin.y - 40, "CỔNG TƯƠNG LAI"));
                        if (SFX.bossEntry) SFX.bossEntry();
                    }
                    sp.gateT++;
                    if (sp.gateT > 70){
                        this.twin = null; this.split = null; this.splitDone = true;
                        this.invulnAll = false; this.toIdle(40);
                    }
                    return;
                }
                let k2 = cyc % per;
                let fromLeft = (round % 2 === 0);
                let A = fromLeft ? this : this.twin;
                let dir2 = fromLeft ? 1 : -1;
                if (k2 === 6){
                    sp.kind = ['slash','throw','crow','glaive','reaper'][round % 5];
                    A.armR = -1.8;
                    if (sp.kind === 'slash') this.warnAt(A.x + (fromLeft ? this.w : 0), A.y + this.h/2, dir2, 150, 20);
                }
                if (k2 === 24) this.twinAttack(A, sp.kind, dir2);
                if (A.dashV){ A.x += A.dashV; A.dashV *= 0.9; if (Math.abs(A.dashV) < 0.5) A.dashV = 0; }
                A.x = Math.max(58, Math.min(canvas.width - this.w - 58, A.x));
                for (let B2 of [this, this.twin]){
                    if (!B2 || !B2.slash) continue;
                    B2.slash.t--;
                    let a = B2.slash;
                    let r = a.dir < 0 ? { x: B2.x - a.reach, y: B2.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 }
                                      : { x: B2.x + this.w, y: B2.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 };
                    if (!a.hit && checkAABB(dino, r)){ a.hit = true; this.hurtP(1); }
                    if (a.t <= 0) B2.slash = null;
                }
                let idle2 = fromLeft ? this.twin : this;
                if (idle2){ let want = fromLeft ? RX : LX; idle2.x += (want - idle2.x) * 0.06; }
            }
            twinAttack(A, kind, dir2){
                let cx0 = A.x + this.w/2, cy0 = A.y + this.h/2;
                if (kind === 'slash'){
                    A.dashV = dir2 * 24; A.armR = -0.4;
                    A.slash = { t: 22, dir: dir2, reach: 150, up: 26, hit: false, dmg: 1 };
                    for (let q = 0; q < 4; q++) this.ghostOf(A);
                    if (SFX.bossExplode) SFX.bossExplode();
                } else if (kind === 'throw'){
                    for (let q = -1; q <= 1; q += 2){
                        let a = Math.atan2((dino.y + dino.h/2) - cy0, (dino.x + dino.w/2) - cx0) + q*0.16;
                        this.thrown.push({ x: cx0, y: cy0, vx: Math.cos(a)*13, vy: Math.sin(a)*13,
                                           spin: 0, life: 96, max: 96, back: false, hitCd: 0, dead: false });
                    }
                    if (SFX.bossSkill) SFX.bossSkill();
                } else if (kind === 'crow'){
                    for (let q = 0; q < 5; q++){
                        let a = -1.0 + q * 0.5;
                        this.crows.push({ x: cx0, y: cy0 - 10, vx: Math.cos(a)*5*dir2, vy: Math.sin(a)*5,
                                          w2: q, life: 280, dead: false });
                    }
                    if (SFX.bossSkill) SFX.bossSkill();
                } else if (kind === 'glaive'){
                    for (let q = 0; q < 2; q++){
                        let bp = new BossProjectile(cx0 + dir2*24, A.y + 26 + q*26, 14 * dir2, 0, false, 1);
                        bp.w = 34; bp.h = 34; bp.color = "#C8CEDA"; bp.crescent = true; bp.isPiercing = true;
                        bossProjectiles.push(bp);
                    }
                    if (SFX.bossSkill) SFX.bossSkill();
                } else {
                    this.summonReaper('slash', cx0, cy0, dir2);
                }
            }
            tickUndead(){
                for (let i = this.undead.length - 1; i >= 0; i--){
                    let u = this.undead[i]; u.t++;
                    if (u.rise > 0){ u.rise--; continue; }
                    let g = (dino.x + dino.w/2) - u.x;
                    u.x += Math.sign(g) * 1.5;
                    if (u.hitCd > 0) u.hitCd--;
                    let box = { x: u.x - 15, y: 320 - 44, w: 30, h: 44 };
                    for (let pi = projectiles.length - 1; pi >= 0; pi--){
                        let pr = projectiles[pi]; if (!pr || pr.owner !== 1) continue;
                        if (!checkAABB(pr, box)) continue;
                        u.hp--; visualEffects.push(new Effect(u.x, 300, 'explosion', true, 12));
                        if (!(pr.type === 2 || (pr.pierceCount||0) > 0)) projectiles.splice(pi, 1);
                        break;
                    }
                    if (u.hitCd <= 0 && checkAABB(dino, box)){ u.hitCd = 50; this.hurtP(1); }
                    if (u.hp <= 0 || u.t > 900){
                        visualEffects.push(new Effect(u.x, 300, 'explosion', true, 22));
                        this.undead.splice(i, 1);
                    }
                }
            }
            ghostOf(A){
                if (this.ghosts.length >= 6) this.ghosts.shift();
                this.ghosts.push({ x: A.x, y: A.y, left: (A.dashV || 0) < 0, arm: 'scythe', armR: A.armR || 0, t: 14 });
            }
            warnAt(x, y, dir, reach, up){ this.tel = { dir: dir, reach: reach, up: up, t: 18, max: 18, ax: x, ay: y }; }
            // ================= CHANG 3: QUAY VE TU CONG TUONG LAI =================
            startStage3(){
                this.stage = 3; this.phase = 2;
                this.hp = 130; this.maxHp = 130; this.invulnAll = true;
                this.name = "DEATH — KẺ TRỞ VỀ";
                this.w = DT_W2; this.h = DT_H2; this.baseY = 320 - this.h;
                this.state = 'gate_in'; this.subTimer = 0; this._bag = null; this.atkBag = [];
                this.fly = 0; this.wallT = 0; this.slash = null; this.tel = null; this.chain = null;
                this.crows.length = 0; this.thrown.length = 0; this.souls.length = 0; this.reaps.length = 0;
                this.undead.length = 0; this.aegis = 0;
                bossProjectiles.length = 0;
                this.gate = { x: canvas.width/2, t: 0 };
                this.x = canvas.width/2 - this.w/2; this.y = this.baseY; this.dy = 0;
                floatingTexts.push(new FloatingText(canvas.width/2 - 130, 126, "CỔNG THỜI GIAN MỞ RA"));
                shakeTimer = 110; if (SFX.bossEntry) SFX.bossEntry();
            }
            tickChain(){
                let c = this.chain; if (!c) return;
                if (c.st === 'out'){
                    c.len += 26;
                    let hx = this.cx() + c.dir * c.len, hy = this.cy() + c.vy * c.len;
                    if (!c.hit && checkAABB(dino, { x: hx - 34, y: hy - 34, w: 68, h: 68 })){
                        c.hit = true; c.st = 'pull';
                        c.tuLao = keoBiChan();
                        floatingTexts.push(new FloatingText(dino.x - 24, dino.y - 30,
                            c.tuLao ? "CHẶN ĐƯỢC!" : "DEATHGRIP!"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (c.len > 460) c.st = 'back';
                } else if (c.st === 'pull'){
                    c.len -= 22;
                    if (keoBiChan()) c.tuLao = true;
                    if (c.tuLao){ keoTuLao(this, c, c.len); }
                    else {
                        let tx = this.cx() + c.dir * Math.max(52, c.len) - dino.w/2;
                        let ty = this.cy() + c.vy * Math.max(52, c.len) - dino.h/2;
                        dino.x += (tx - dino.x) * 0.40;
                        if (c.air){ dino.y += (ty - dino.y) * 0.40; dino.dy = 0; dino.grounded = false; }
                        else if (dino.dy > 0) dino.dy *= 0.5;
                    }
                    if (c.len <= 56) c.st = 'back';
                } else { c.len -= 30; if (c.len <= 0) this.chain = null; }
            }
            updateReturned(){
                if (this.gate){ this.gate.t++; if (this.gate.t > 150) this.gate = null; }
                this.tickChain();
                if (this.state === 'gate_in'){
                    this.subTimer++;
                    if (this.subTimer === 1){
                        dino.hp = dino.maxHp;
                        floatingTexts.push(new FloatingText(dino.x - 46, dino.y - 44, "ĐƯỢC HỒI ĐẦY MÁU"));
                        if (SFX.heal) SFX.heal();
                    }
                    if (this.subTimer % 5 === 0) visualEffects.push(new Effect(canvas.width/2 + (Math.random()-0.5)*110, 200 + (Math.random()-0.5)*140, 'explosion', true, 26));
                    if (this.subTimer > 108){ this.invulnAll = false; this.toIdle(28); }
                    return;
                }
                if (this.state === 'idle'){
                    this.faceP();
                    let g = this.gap(), ad = Math.abs(g);
                    if (ad > 130){ this.x += Math.sign(g) * 3.2; this.walk += 3.2; }
                    this.actionTimer--;
                    if (this.actionTimer <= 0 && this.aiRieng){ this.d2Chon(); return; }
                    if (this.actionTimer <= 0){
                        let ad2 = Math.abs(this.gap());
                        let dungXa3 = this.danhXaTiep(ad2 < 190);
                        this.state = dungXa3
                            ? this.pickFrom(['w_pull','w_airpull','w_redeem','w_exhume','w_ult',
                                             'e_glaive','e_throw','e_crow','e_wall','e_wallrain','e_tele'], 'w_combo')
                            : this.pickFrom(['w_frenzy','w_launch','w_pull','w_aegis','w_ult',
                                             'e_claw','e_harvest','e_mace','e_tele'], 'w_combo');
                        this._daCan = !dungXa3;
                        this.subTimer = 0; this.faceP();
                    }
                    return;
                }
                if (this.state.charAt(0) === 'e') return this.runSkill();
                this.runReturned();
            }
            aaMocTick(){
                if (this.subTimer === 0 || !this._aam){
                    this._aam = { pha: 'nhun', t: 0, i: 0, hit: 0 };
                    this.fly = 0; this.chain = null; this.faceP();
                    floatingTexts.push(new FloatingText(this.x - 16, this.y - 34, "DEATHGRIP!"));
                    if (SFX.bossSkill) SFX.bossSkill();
                }
                let A = this._aam; A.t++; this.subTimer += 1.15;
                let het = () => { this.fly = 0; this.chain = null; this._aam = null; this.toIdle(30); };

                if (A.pha === 'nhun'){
                    this.armR = -0.4;
                    if (A.t >= 10){ A.pha = 'len'; A.t = 0; this.dy = -13.5; this.grounded = false; this.faceP(); }
                    return;
                }
                if (A.pha === 'len'){
                    this.armL = -1.5;
                    if (this.dy >= -1.5 || A.t > 30){
                        this.faceP(); this.fly = 1;
                        let vy = ((dino.y + dino.h/2) - this.cy()) / 420;
                        this.chain = { st: 'out', len: 30, dir: this.dir(), vy: vy, hit: false, air: true };
                        A.pha = 'moc'; A.t = 0;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    return;
                }
                if (A.pha === 'moc'){
                    let c = this.chain;
                    if (c && c.st === 'pull' && !c.tuLao && c.len <= 120){ A.pha = 'combo'; A.t = 0; A.i = 0; return; }
                    if (!c || c.tuLao || A.t > 62){
                        if (!c || !c.hit) floatingTexts.push(new FloatingText(this.x - 8, this.y - 30, "HỤT!"));
                        A.pha = 'ha'; A.t = 0; this.fly = 0;
                    }
                    return;
                }
                if (A.pha === 'combo'){
                    this.fly = 1;
                    const NHIP = 13, SO = 5;
                    if (A.i < SO && A.t % NHIP === 1){
                        let k = A.i; this.faceP();
                        this.armR = (k % 2) ? -0.6 : -1.9;
                        this.doSlash(k === SO - 1 ? 126 : 98, k === SO - 1 ? 34 : 24, k === SO - 1 ? 15 : 10, 1);
                        if (k === 1 || k === 3){
                            let dx = this.cx() - (dino.x + dino.w / 2);
                            dino.x += Math.max(-70, Math.min(70, dx * 0.75));
                            dino.dy = -2; dino.grounded = false;
                            floatingTexts.push(new FloatingText(this.x - 14, this.y - 28, "KÉO LẠI!"));
                        }
                        if (checkAABB(dino, this.slashRect())){ dino.dy = -3; dino.grounded = false; A.hit++; }
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 16));
                        if (k === SO - 1){ shakeTimer = Math.max(shakeTimer, 22); this.summonReaper('slash', this.cx(), this.cy()); }
                        A.i++;
                    }
                    if (A.i >= SO && A.t > SO * NHIP + 8){ A.pha = 'ha'; A.t = 0; this.fly = 0; this.dy = 13; }
                    else if (A.t > SO * NHIP + 60){ A.pha = 'ha'; A.t = 0; this.fly = 0; }
                    return;
                }
                if (A.pha === 'ha'){
                    this.fly = 0;
                    let g = (dino.x + dino.w / 2) - this.cx();
                    if (Math.abs(g) > 46) this.x += Math.sign(g) * Math.min(6.5, Math.abs(g) * 0.16);
                    if (this.grounded){
                        shakeTimer = Math.max(shakeTimer, 12);
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 24));
                        return het();
                    }
                    if (A.t > 130) return het();
                    return;
                }
                het();
            }
            runReturned(){
                let st = this.state, sp = 1.15; this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;
                if (st === 'w_pull'){
                    if (T(12)){ this.faceP(); this.armL = -1.4; }
                    if (T(26)){ this.chain = { st: 'out', len: 30, dir: this.dir(), vy: 0, hit: false, air: false }; }
                    if (this.chain && this.chain.st === 'pull' && this.chain.len <= 90 && !this._pc){
                        this._pc = 1; this.faceP(); this.warn(120, 26, 16); this._pcAt = this.subTimer + 16;
                    }
                    let hits = [0, 16, 34];
                    if (this._pc === 1 && this.subTimer >= this._pcAt){ this._pc = 2; this._pc0 = this.subTimer; }
                    if (this._pc === 2){
                        for (let k = 0; k < 3; k++) if (T(this._pc0 + hits[k])){
                            this.faceP(); this.armR = (k%2) ? -0.5 : -1.6;
                            this.doSlash(k === 2 ? 130 : 100, k === 2 ? 32 : 18, k === 2 ? 16 : 11, 1);
                            this.dashV = this.dir() * (k === 2 ? 9 : 4);
                            if (k === 2){ shakeTimer = 24; this.summonReaper('slash', this.cx(), this.cy()); }
                        }
                    }
                    if (!this._pc && this.subTimer > 40 && !this.chain){ this.toIdle(20); return; }
                    if (this.subTimer > 130){ this.chain = null; this._pc = 0; this.toIdle(38); }
                    return;
                }
                if (st === 'w_launch'){
                    if (T(10)){ this.faceP(); this.warn(104, 22, 18); }
                    if (T(28)){
                        this.armR = -1.7; this.doSlash(104, 22, 12, 1); this.dashV = this.dir()*6;
                    }
                    if (T(42)){
                        this.faceP(); this.armR = -2.4;
                        this.doSlash(96, 58, 14, 1);
                        let r = this.slashRect();
                        if (checkAABB(dino, r)){ dino.dy = -13; dino.grounded = false;
                            floatingTexts.push(new FloatingText(dino.x - 18, dino.y - 30, "HẤT TUNG!")); }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (T(58)){ this.dy = -13; this.grounded = false; }
                    let air = [72, 86, 100];
                    for (let k = 0; k < 3; k++) if (T(air[k])){
                        this.faceP(); this.armR = (k%2) ? -0.6 : -1.8;
                        this.doSlash(102, 40, 11, 1);
                        this.dashV = this.dir() * 5;
                    }
                    if (T(116)){ this.dy = 16; this.armR = -2.2; this.doSlash(110, 24, 16, 1); this.summonReaper('slash', this.cx(), this.cy()); }
                    if (this.subTimer > 118 && this.grounded && !this._hb){
                        this._hb = true; shakeTimer = 30;
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 60));
                        if (checkAABB(dino, { x: this.cx()-92, y: this.baseY-14, w: 184, h: this.h+18 })) this.hurtP(1);
                    }
                    if (this.subTimer > 146){ this._hb = false; this.toIdle(40); }
                    return;
                }
                if (st === 'w_combo'){
                    let warns = [6, 26, 48], hits = [16, 38, 64];
                    if (this.subTimer < 70 && Math.floor(this.subTimer) % 2 === 0){
                        let g = this.gap(); if (Math.abs(g) > 78) this.x += Math.sign(g) * 3.4;
                    }
                    for (let k = 0; k < 3; k++){
                        if (T(warns[k])){ this.faceP(); this.warn(k===2?134:98, k===2?32:20, hits[k]-warns[k]); }
                        if (T(hits[k])){
                            this.faceP(); this.armR = (k%2) ? -0.5 : -1.7;
                            this.doSlash(k===2?134:98, k===2?32:20, k===2?16:11, 1);
                            this.dashV = this.dir() * (k===2?10:5);
                            if (k===2){ shakeTimer = 24; this.summonReaper('slash', this.cx(), this.cy()); }
                        }
                    }
                    if (this.subTimer > 86) this.toIdle(32);
                    return;
                }
                if (st === 'w_redeem'){
                    if (T(6)){
                        this.faceP();
                        let s2 = (dino.x + dino.w/2) < canvas.width/2 ? 1 : -1;
                        if (Math.random() < 0.5){ this.toWall(s2); this._rd = 1; }
                        else { this.dy = -16; this.grounded = false; this._rd = 2; }
                        this.arm = 'gun';
                        floatingTexts.push(new FloatingText(this.x - 24, this.y - 30, "REDEMPTION"));
                    }
                    if (this._rd === 1 && this.subTimer > 6 && this.subTimer < 96)
                        this.y = DTH_WALL_Y + Math.sin(this.subTimer * 0.08) * 12;
                    if (this.subTimer > 18 && this.subTimer < 92 && Math.floor(this.subTimer) % 9 === 0){
                        this.faceP(); this.armR = -1.4;
                        let a = Math.atan2((dino.y + dino.h/2) - (this.y + 26), (dino.x + dino.w/2) - this.cx());
                        a += (Math.random() - 0.5) * 0.10;
                        let bp = new BossProjectile(this.cx(), this.y + 26, Math.cos(a)*17, Math.sin(a)*17, false, 1);
                        bp.w = 14; bp.h = 7; bp.color = "#69F0AE"; bp.frail = true; bossProjectiles.push(bp);
                        visualEffects.push(new Effect(this.cx() + Math.cos(a)*22, this.y + 26 + Math.sin(a)*22, 'explosion', true, 8));
                        if (SFX.tone) SFX.tone(980, 0.035, 'square', 0.07, 520);
                    }
                    if (T(96)){ this.wallT = 0; this._rd = 0; this.dy = 3; }
                    if (this.subTimer > 118){ this.wallT = 0; this._rd = 0; this.toIdle(34); }
                    return;
                }
                if (st === 'w_frenzy'){
                    if (T(6)) floatingTexts.push(new FloatingText(this.x - 14, this.y - 32, "HARBINGER FRENZY"));
                    let hits = [12, 22, 32, 42, 52, 64, 82];
                    if (this.subTimer < 86 && Math.floor(this.subTimer) % 2 === 0){
                        let g = this.gap(); if (Math.abs(g) > 70) this.x += Math.sign(g) * 4.2;
                    }
                    for (let k = 0; k < 7; k++) if (T(hits[k])){
                        this.faceP(); let big = k === 6;
                        this.arm = (k % 2) ? 'claw' : 'scythe';
                        this.armR = (k % 2) ? -1.9 : -0.5; this.armL = (k % 2) ? -0.5 : -1.9;
                        this.doSlash(big ? 132 : 88, big ? 32 : 16, big ? 15 : 8, 1);
                        this.dashV = this.dir() * (big ? 10 : 4);
                        if (big){ shakeTimer = 26; this.summonReaper('slash', this.cx(), this.cy()); }
                        else if (SFX.tone) SFX.tone(700 - k*50, 0.04, 'square', 0.09, 340);
                    }
                    if (this.subTimer > 104) this.toIdle(34);
                    return;
                }
                if (st === 'w_exhume'){
                    if (T(20)){
                        for (let k = 0; k < 3; k++){
                            let ux = Math.max(90, Math.min(canvas.width - 90, (dino.x + dino.w/2) + (k-1)*130));
                            this.undead.push({ x: ux, y: 320, rise: 34, hp: 3, t: 0, hitCd: 0, dead: false });
                        }
                        floatingTexts.push(new FloatingText(this.x - 18, this.y - 32, "EXHUME"));
                        shakeTimer = 22; if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 52) this.toIdle(34);
                    return;
                }
                if (st === 'w_aegis'){
                    if (T(8)){ this.aegis = 96; this.aegisHits = 0;
                        floatingTexts.push(new FloatingText(this.x - 22, this.y - 32, "AEGIS GUARD")); }
                    if (this.aegis > 0){
                        this.aegis--;
                        let g = this.gap(); this.x += Math.sign(g) * 2.0; this.walk += 2.0;
                        this.armL = -1.2; this.faceP();
                        let d = this.dir();
                        let r = { x: d < 0 ? this.x - 48 : this.x + this.w - 4, y: this.y - 14, w: 52, h: this.h + 26 };
                        for (let i2 = projectiles.length - 1; i2 >= 0; i2--){
                            let pr = projectiles[i2]; if (!pr || pr.owner !== 1) continue;
                            if (!checkAABB(pr, r)) continue;
                            if (typeof dashVx !== 'undefined' && Math.abs(dashVx) > 1) continue;
                            visualEffects.push(new Effect(pr.x, pr.y, 'parry', d < 0));
                            projectiles.splice(i2, 1); this.aegisHits++;
                        }
                        if (this.aegis === 0){
                            if (this.aegisHits >= 3){
                                this.dashV = this.dir() * 16;
                                this.doSlash(140, 30, 18, 1);
                                this.summonReaper('slash', this.cx(), this.cy());
                                floatingTexts.push(new FloatingText(this.x - 22, this.y - 34, "PHẢN ĐÒN!"));
                            }
                            this.toIdle(30);
                        }
                    }
                    if (this.subTimer > 130){ this.aegis = 0; this.toIdle(30); }
                    return;
                }
                if (st === 'w_ult'){
                    if (T(10)){
                        this.ultX = dino.x + dino.w/2;
                        floatingTexts.push(new FloatingText(canvas.width/2 - 100, 126, "TỬ THẦN PHÁN QUYẾT"));
                        if (SFX.bossEntry) SFX.bossEntry();
                    }
                    if (this.subTimer > 10 && this.subTimer < 86 && Math.floor(this.subTimer) % 3 === 0)
                        visualEffects.push(new Effect(this.ultX + (Math.random()-0.5)*180, 120 + Math.random()*160, 'explosion', true, 18));
                    if (T(86)){
                        for (let k = 0; k < 16; k++)
                            visualEffects.push(new Effect(this.ultX + (Math.random()-0.5)*230, 110 + Math.random()*200, 'explosion', true, 30 + Math.random()*26));
                        if (checkAABB(dino, { x: this.ultX - 118, y: 90, w: 236, h: 240 })) this.hurtP(2);
                        shakeTimer = 66; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 118) this.toIdle(48);
                    return;
                }
                this.toIdle(36);
            }
            draw(){
                let reaper = this.stage === 2;
                // --- Lông quạ đen bay tản mát khi lướt Ghost Step ---
                if (this.feathers && this.feathers.length){
                    ctx.save();
                    for (let f of this.feathers){
                        ctx.save();
                        ctx.globalAlpha = Math.min(1, f.t / 14) * 0.85;
                        ctx.translate(f.x, f.y); ctx.rotate(f.ang);
                        ctx.fillStyle = "#11131A";
                        ctx.beginPath(); ctx.ellipse(0, 0, 5.5, 1.8, 0, 0, 6.28); ctx.fill();
                        ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 0.7;
                        ctx.beginPath(); ctx.moveTo(-4, 0); ctx.lineTo(4, 0); ctx.stroke();
                        ctx.restore();
                    }
                    ctx.restore();
                }
                // --- Lưỡi hái Tử Thần bổ xuống từ không trung ---
                for (let r of this.reaps){
                    ctx.save();
                    if (r.t > 0){
                        let k = 1 - r.t / 44;
                        ctx.globalAlpha = 0.16 + 0.34*k;
                        ctx.fillStyle = "#69F0AE"; ctx.fillRect(r.x - 46, 120, 92, 206);
                        ctx.globalAlpha = 0.95; ctx.strokeStyle = (frames % 6 < 3) ? "#FFFFFF" : "#A5D6A7";
                        ctx.lineWidth = 3; ctx.strokeRect(r.x - 46, 120, 92, 206);
                        ctx.strokeStyle = "#E8EEF6"; ctx.lineWidth = 6; ctx.lineCap = "round";
                        ctx.beginPath(); ctx.arc(r.x, 120 - 60 + 200*k, 54, -0.3, 1.9); ctx.stroke();
                    } else {
                        let k = Math.max(0, 1 + r.t/20);
                        ctx.globalAlpha = k;
                        ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 8; ctx.lineCap = "round";
                        ctx.beginPath(); ctx.arc(r.x, 300, 60, Math.PI, 0); ctx.stroke();
                    }
                    ctx.restore();
                }
                // --- SÓNG HỒN CỦA PHÁN XỬ (Reaper) ---
                for (let s of (this.rSong || [])){
                    ctx.save(); ctx.globalAlpha = Math.max(0.2, 1 - s.t / 70);
                    ctx.shadowColor = "#00E676"; ctx.shadowBlur = 10;
                    ctx.fillStyle = "#69F0AE"; ctx.beginPath(); ctx.moveTo(s.x - 18, 320); ctx.quadraticCurveTo(s.x, 320 - 56, s.x + 18, 320); ctx.fill();
                    ctx.fillStyle = "#E8F5E9"; ctx.beginPath(); ctx.moveTo(s.x - 8, 320); ctx.quadraticCurveTo(s.x, 320 - 32, s.x + 8, 320); ctx.fill();
                    ctx.restore();
                }
                // --- BÀN TAY TỬ THẦN DEATHGRIP (Reaper Phase) ---
                if (this.stage === 2 && this.state === 'r_moc' && this.rpS && this.rpS.moc){
                    let d = this.rpS.dir, x1 = this.cx() + d * 30, y1 = this.y + 48, x2 = this.rpS.keo ? dino.x + dino.w / 2 : this.rpS.moc.x, y2 = this.rpS.keo ? dino.y + dino.h / 2 : y1;
                    ctx.save();
                    ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 3.5; ctx.setLineDash([8, 5]);
                    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]);
                    // Bàn tay xương khổng lồ ở đầu dây
                    ctx.translate(x2, y2); ctx.scale(d, 1);
                    ctx.fillStyle = "#69F0AE"; ctx.beginPath(); ctx.arc(0, 0, 8, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "#E8F5E9"; ctx.lineWidth = 2.5;
                    for (let g = -1; g <= 1; g++){
                        ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(10, g * 8, 18, g * 12); ctx.stroke();
                    }
                    ctx.restore();
                }
                // --- XÁC SỐNG GHOUL (Exhume) ---
                for (let u of this.undead){
                    let r = u.rise > 0 ? (1 - u.rise/34) : 1, H = 44 * r;
                    ctx.save();
                    if (u.rise > 0){
                        ctx.globalAlpha = 0.65; ctx.fillStyle = "#00E676";
                        ctx.beginPath(); ctx.ellipse(u.x, 318, 22, 6, 0, 0, 6.28); ctx.fill();
                    }
                    ctx.globalAlpha = 1;
                    // Xuong suon & giap rach cua Ghoul
                    ctx.fillStyle = "#263238"; ctx.fillRect(u.x - 10, 320 - H, 20, H);
                    ctx.strokeStyle = "#90A4AE"; ctx.lineWidth = 1.5;
                    for (let rb = 0; rb < 3; rb++){
                        let ry = 320 - H + 16 + rb * 6;
                        if (ry < 318){ ctx.beginPath(); ctx.moveTo(u.x - 7, ry); ctx.lineTo(u.x + 7, ry); ctx.stroke(); }
                    }
                    // Dau lau Ghoul + Mat xanh Necro
                    ctx.fillStyle = "#B0BEC5";
                    ctx.beginPath(); ctx.arc(u.x, 320 - H + 8, 8.5, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#0A0C10"; ctx.fillRect(u.x - 5, 320 - H + 6, 3.5, 3.5); ctx.fillRect(u.x + 2, 320 - H + 6, 3.5, 3.5);
                    ctx.fillStyle = "#69F0AE"; ctx.fillRect(u.x - 4, 320 - H + 7, 2, 2); ctx.fillRect(u.x + 2.5, 320 - H + 7, 2, 2);
                    // Tay xuong vuon ra
                    ctx.strokeStyle = "#B0BEC5"; ctx.lineWidth = 3; ctx.lineCap = "round";
                    ctx.beginPath(); ctx.moveTo(u.x - 10, 320 - H + 20); ctx.lineTo(u.x - 21, 320 - H + 12 + Math.sin(u.t*0.2)*4);
                    ctx.moveTo(u.x + 10, 320 - H + 20); ctx.lineTo(u.x + 21, 320 - H + 12 - Math.sin(u.t*0.2)*4); ctx.stroke();
                    for (let k = 0; k < 3; k++){
                        ctx.fillStyle = k < u.hp ? "#69F0AE" : "rgba(255,255,255,0.18)";
                        ctx.fillRect(u.x - 9 + k*7, 320 - H - 8, 5, 3);
                    }
                    ctx.restore();
                }
                // --- KHIEN AEGIS GUARD (Hào quang xương xoay tròn) ---
                if (this.aegis > 0){
                    let d = this.dir(), gx = d < 0 ? this.x - 48 : this.x + this.w - 4;
                    ctx.save();
                    ctx.globalAlpha = 0.26 + 0.18*Math.abs(Math.sin(frames*0.2));
                    ctx.fillStyle = "#69F0AE"; ctx.fillRect(gx, this.y - 14, 52, this.h + 26);
                    ctx.globalAlpha = 0.95; ctx.strokeStyle = "#E8F5E9"; ctx.lineWidth = 3;
                    ctx.strokeRect(gx, this.y - 14, 52, this.h + 26);
                    // 3 manh giap xuong bay quanh nguoi Death
                    for (let b = 0; b < 3; b++){
                        let ba = frames * 0.15 + b * 2.09;
                        let bx = this.cx() + Math.cos(ba) * 34, by = this.cy() + Math.sin(ba) * 22;
                        ctx.fillStyle = "#CFD8DC";
                        ctx.beginPath(); ctx.moveTo(bx, by - 7); ctx.lineTo(bx + 5, by); ctx.lineTo(bx, by + 7); ctx.lineTo(bx - 5, by); ctx.closePath(); ctx.fill();
                    }
                    ctx.restore();
                    ctx.fillStyle = "#A5D6A7"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("AEGIS — LƯỚT XUYÊN QUA!", this.cx(), this.y - 26); ctx.textAlign = "left";
                }
                // --- ĐÀN QUẠ DUST & MURDER OF CROWS ---
                for (let c of this.crows){
                    ctx.save(); ctx.translate(c.x, c.y);
                    let fl = Math.sin(c.w2) * 0.65;
                    ctx.shadowColor = "#00E676"; ctx.shadowBlur = 6;
                    ctx.fillStyle = "#0F131A";
                    ctx.beginPath(); ctx.ellipse(0, 0, 9, 5, 0, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "#1E2636"; ctx.lineWidth = 3.2; ctx.lineCap = "round";
                    ctx.beginPath(); ctx.moveTo(-2, -1); ctx.lineTo(-13, -7 - fl*7);
                    ctx.moveTo(-2, -1); ctx.lineTo(-13, 5 + fl*7); ctx.stroke();
                    ctx.fillStyle = "#69F0AE"; ctx.fillRect(4, -2, 3.5, 2.2);
                    ctx.restore();
                }
                // --- CẦU LINH HỒN ---
                for (let s of this.souls){
                    ctx.save(); ctx.globalAlpha = 0.55 + 0.3*Math.sin(s.w2);
                    ctx.fillStyle = "#69F0AE";
                    ctx.beginPath(); ctx.arc(s.x, s.y, 12, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#E8F5E9"; ctx.beginPath(); ctx.arc(s.x, s.y, 5, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 0.3;
                    ctx.beginPath(); ctx.arc(s.x - s.vx*3, s.y - s.vy*3, 8, 0, 6.28); ctx.fill();
                    ctx.restore();
                }
                // --- LƯỠI HÁI NÉM ĐANG XOAY TÍT ---
                for (let t of this.thrown){
                    ctx.save(); ctx.translate(t.x, t.y); ctx.rotate(t.spin);
                    ctx.shadowColor = "#69F0AE"; ctx.shadowBlur = 10;
                    ctx.fillStyle = "#3E3A34"; ctx.fillRect(-2.5, -14, 5, 28);
                    ctx.strokeStyle = "#ECEFF1"; ctx.lineWidth = 5.5; ctx.lineCap = "round";
                    ctx.beginPath(); ctx.arc(0, -12, 19, -0.3, 1.9); ctx.stroke();
                    ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.arc(0, -12, 21, -0.25, 1.85); ctx.stroke();
                    ctx.restore();
                }
                // --- TÀN ẢNH BÓNG MA ---
                for (let g of this.ghosts){
                    ctx.save(); ctx.globalAlpha = (g.t/14) * 0.38;
                    let gm = { facingLeft: g.left, arm: g.arm, armR: g.armR, armL: 0, wing: this.wing, quayNgang: g.qn, luoi: g.luoi, stage: this.stage };
                    if (reaper) drawReaperDeath(gm, g.x, g.y); else drawDeathBody(gm, g.x, g.y);
                    ctx.restore();
                }
                // --- BÁO NHÁT CHÉM ---
                if (this.tel){
                    let t = this.tel, k = 1 - t.t/t.max;
                    let cxT = t.dir < 0 ? this.x : this.x + this.w, cyT = this.y + this.h/2;
                    ctx.save();
                    ctx.globalAlpha = 0.30 + 0.45*k;
                    ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 3; ctx.lineCap = "round";
                    ctx.setLineDash([8, 7]); ctx.lineDashOffset = -frames*0.8;
                    ctx.beginPath(); ctx.arc(cxT, cyT, t.reach, t.dir<0 ? Math.PI-0.95 : -0.95, t.dir<0 ? Math.PI+0.95 : 0.95, false); ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.globalAlpha = 0.85; ctx.strokeStyle = "#E8F5E9"; ctx.lineWidth = 5;
                    let a0 = t.dir<0 ? Math.PI-0.95 : -0.95, a1 = t.dir<0 ? Math.PI+0.95 : 0.95;
                    ctx.beginPath(); ctx.arc(cxT, cyT, t.reach, a0, a0+(a1-a0)*k, false); ctx.stroke();
                    ctx.restore();
                }
                // --- CỔNG THỜI GIAN (Chặng 3) ---
                if (this.gate){
                    let g2 = this.gate, k = Math.min(1, g2.t / 40), fade = g2.t > 110 ? (1 - (g2.t-110)/40) : 1;
                    ctx.save(); ctx.globalAlpha = Math.max(0, 0.55 * fade);
                    let gg = ctx.createLinearGradient(g2.x - 90, 0, g2.x + 90, 0);
                    gg.addColorStop(0, "rgba(124,255,158,0)"); gg.addColorStop(0.5, "#69F0AE"); gg.addColorStop(1, "rgba(124,255,158,0)");
                    ctx.fillStyle = gg; ctx.fillRect(g2.x - 90*k, 40, 180*k, 286);
                    ctx.globalAlpha = Math.max(0, 0.9 * fade);
                    ctx.strokeStyle = "#E8F5E9"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.ellipse(g2.x, 183, 74*k, 143*k, 0, 0, 6.28); ctx.stroke();
                    ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 2;
                    for (let q = 0; q < 5; q++){
                        let rr = (1 - ((g2.t*0.02 + q*0.2) % 1));
                        ctx.globalAlpha = Math.max(0, rr * 0.5 * fade);
                        ctx.beginPath(); ctx.ellipse(g2.x, 183, 74*rr, 143*rr, 0, 0, 6.28); ctx.stroke();
                    }
                    ctx.restore();
                }
                // --- CỔNG CỦA BẢN THỂ RỜI ĐI ---
                if (this.split && this.split.gate && this.twin){
                    let k = Math.min(1, this.split.gateT / 34);
                    ctx.save(); ctx.globalAlpha = 0.65;
                    ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.ellipse(this.twin.x + this.w/2, this.twin.y + this.h/2, 44*k, 84*k, 0, 0, 6.28); ctx.stroke();
                    ctx.globalAlpha = 0.30; ctx.fillStyle = "#69F0AE";
                    ctx.beginPath(); ctx.ellipse(this.twin.x + this.w/2, this.twin.y + this.h/2, 40*k, 80*k, 0, 0, 6.28); ctx.fill();
                    ctx.restore();
                    ctx.fillStyle = "#A5D6A7"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("ĐI VỀ TƯƠNG LAI", this.twin.x + this.w/2, this.twin.y - 16); ctx.textAlign = "left";
                }
                // --- BÀN TAY XƯƠNG QUỶ DEATHGRIP KÉO NGƯỜI CHƠI ---
                if (this.chain){
                    let c = this.chain, ox = this.cx(), oy = this.cy();
                    let hx = ox + c.dir * c.len, hy = oy + (c.vy || 0) * c.len;
                    ctx.save();
                    ctx.shadowColor = "#00E676"; ctx.shadowBlur = 10;
                    ctx.strokeStyle = "#37474F"; ctx.lineWidth = 5;
                    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(hx, hy); ctx.stroke();
                    ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(hx, hy); ctx.stroke();
                    let n2 = Math.max(1, Math.floor(c.len / 22));
                    for (let q = 0; q < n2; q++){
                        let t2 = q / n2;
                        ctx.fillStyle = "#B0BEC5";
                        ctx.fillRect(ox + (hx-ox)*t2 - 3, oy + (hy-oy)*t2 - 3, 6, 6);
                    }
                    // Bàn tay vuốt xương khổng lồ ở đầu dây Deathgrip
                    let ang = Math.atan2(hy - oy, hx - ox);
                    ctx.translate(hx, hy); ctx.rotate(ang);
                    ctx.fillStyle = "#B388FF"; ctx.beginPath(); ctx.arc(0, 0, 7, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 2.8; ctx.lineCap = "round";
                    let open = c.st === 'out' ? 0.85 : 0.25;
                    for (let g = -1.5; g <= 1.5; g += 1){
                        ctx.beginPath(); ctx.moveTo(-2, 0);
                        ctx.quadraticCurveTo(8, g * open * 8, 17, g * open * 13);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // --- BẢN THỂ THỨ HAI (Soul Splitter) ---
                if (this.twin){
                    ctx.save(); ctx.globalAlpha = 0.85;
                    drawDeathBody({ facingLeft: this.twin.left, arm: 'scythe', armR: this.twin.armR, armL: 0, stage: 3 }, this.twin.x, this.twin.y);
                    ctx.restore();
                    if (this.twin.slash){
                        let a = this.twin.slash, cxS = a.dir < 0 ? this.twin.x : this.twin.x + this.w;
                        ctx.save(); ctx.globalAlpha = Math.min(1, a.t/9);
                        ctx.strokeStyle = "#E8F5E9"; ctx.lineWidth = 6; ctx.lineCap = "round";
                        for (let k = 0; k < 3; k++){
                            ctx.beginPath();
                            ctx.arc(cxS, this.twin.y + this.h/2, Math.max(10, a.reach - k*18), a.dir<0 ? Math.PI-0.95 : -0.95, a.dir<0 ? Math.PI+0.95 : 0.95, false);
                            ctx.stroke();
                        }
                        ctx.restore();
                    }
                }
                this.drawAppar();
                if (this.d2Ve) this.d2Ve(false);

                // --- VẼ THÂN DEATH / REAPER ---
                if (reaper){
                    let dinh = drawReaperDeath(this, this.x, this.y);
                    if (!this.vetLuoi) this.vetLuoi = [];
                    let V = this.vetLuoi, cuoi = V[V.length - 1];
                    if (dinh && cuoi && Math.hypot(dinh.x - cuoi.x, dinh.y - cuoi.y) > 90){ V.length = 0; cuoi = null; }
                    if (dinh && (!cuoi || Math.hypot(dinh.x - cuoi.x, dinh.y - cuoi.y) > 3)){
                        let nhanh = cuoi && Math.hypot(dinh.x - cuoi.x, dinh.y - cuoi.y) > 9;
                        if (nhanh || (cuoi && cuoi.t > 0)) V.push({ x: dinh.x, y: dinh.y, t: 12 });
                        else { V.length = 0; V.push({ x: dinh.x, y: dinh.y, t: 0 }); }
                    }
                    for (const p of V) if (p.t > 0) p.t--;
                    while (V.length > 1 && V[0].t <= 0 && V[1].t <= 0) V.shift();
                    ctx.save(); ctx.lineCap = "round";
                    for (let i = 1; i < V.length; i++){
                        let a = V[i].t / 12; if (a <= 0) continue;
                        ctx.strokeStyle = "rgba(105,240,174," + (0.78 * a).toFixed(2) + ")"; ctx.lineWidth = 3 + 9 * a;
                        ctx.beginPath(); ctx.moveTo(V[i - 1].x, V[i - 1].y); ctx.lineTo(V[i].x, V[i].y); ctx.stroke();
                        ctx.strokeStyle = "rgba(240,255,244," + (0.85 * a).toFixed(2) + ")"; ctx.lineWidth = 1.5 + 2 * a;
                        ctx.beginPath(); ctx.moveTo(V[i - 1].x, V[i - 1].y); ctx.lineTo(V[i].x, V[i].y); ctx.stroke();
                    }
                    ctx.restore();
                } else drawDeathBody(this, this.x, this.y);

                if (this.d2Ve) this.d2Ve(true);

                // --- DÂY BÁM TƯỜNG ---
                if (this.wallT > 0){
                    ctx.save(); ctx.globalAlpha = 0.55;
                    ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 2.5;
                    let wx = this.wallSide < 0 ? 56 : canvas.width - 56;
                    ctx.beginPath(); ctx.moveTo(wx, this.cy()); ctx.lineTo(this.cx(), this.cy()); ctx.stroke();
                    ctx.restore();
                    ctx.fillStyle = "#A5D6A7"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("TRÊN TƯỜNG — ĐẠN THẲNG KHÔNG TỚI", this.cx(), this.y - 20); ctx.textAlign = "left";
                }

                // --- VỆT CHÉM 2 MÀU NECRO GREEN & ABYSSAL PURPLE ---
                if (this.slash){
                    let a = this.slash, cxS = a.dir < 0 ? this.x : this.x + this.w;
                    ctx.save(); ctx.globalAlpha = Math.min(1, a.t/9);
                    ctx.shadowColor = this.stage === 3 ? "#E040FB" : "#00E676"; ctx.shadowBlur = 14;
                    ctx.strokeStyle = reaper ? "rgba(105,240,174,0.9)" : (this.stage === 3 ? "#CE93D8" : "#E8F5E9");
                    ctx.lineWidth = reaper ? 10 : 7; ctx.lineCap = "round";
                    for (let k = 0; k < 3; k++){
                        ctx.beginPath();
                        ctx.arc(cxS, this.y + this.h/2, Math.max(10, a.reach - k*18), a.dir<0 ? Math.PI-0.95 : -0.95, a.dir<0 ? Math.PI+0.95 : 0.95, false);
                        ctx.stroke();
                    }
                    ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.arc(cxS, this.y + this.h/2, Math.max(12, a.reach + 4), a.dir<0 ? Math.PI-0.95 : -0.95, a.dir<0 ? Math.PI+0.95 : 0.95, false);
                    ctx.stroke();
                    ctx.restore();
                }

                // --- THANH MÁU HUD ---
                ctx.fillStyle = reaper ? "#69F0AE" : "#CFD8DC"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(reaper ? "REAPER FORM" : (this.stage === 3 ? "ABYSSAL RIDER" : "HARVESTER"), this.cx(), this.y - 18);
                let _dl = this.stage === 3 ? "KẺ TRỞ VỀ" : (reaper ? "REAPER FORM" : "PALE RIDER");
                drawTopBossBar(this, reaper ? "#00E676" : (this.stage === 3 ? "#B388FF" : "#78909C"), "DEATH — " + _dl);
                ctx.textAlign = "left";
            }
        }
// BOSS_PART_END s0.DeathBoss.1

// Nguồn: index.html:14248 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.D2_GAN.1 EDITABLE
const D2_GAN = [
            ['d2_combo','e_mace'], ['d2_xoay','d2_combo'], ['d2_hat'], ['d2_bo','e_claw'],
            ['e_tele','d2_combo'], ['d2_combo','d2_lan'], ['e_claw','d2_bo'], ['e_harvest','d2_xoay'], ['d2_hat','d2_combo'],
            ['d2_flip','d2_combo']
        ];
// BOSS_PART_END s0.D2_GAN.1

// Nguồn: index.html:14253 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.D2_TIEP.1 EDITABLE
const D2_TIEP = [
            ['e_tele','d2_hat'], ['d2_nhay','d2_combo'], ['d2_lan','e_tele','d2_combo'], ['e_glaive','e_tele','d2_bo'],
            ['e_crow','e_tele','d2_xoay'], ['e_throw','d2_nhay'], ['d2_flip','d2_bo']
        ];
// BOSS_PART_END s0.D2_TIEP.1

// Nguồn: index.html:14257 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.D2_XA.1 EDITABLE
const D2_XA = [
            ['d2_lan','e_tele','d2_combo'], ['e_crow','d2_nhay'], ['e_tele','d2_xoay'], ['e_throw','e_tele','d2_combo'], ['e_glaive','d2_lan']
        ];
// BOSS_PART_END s0.D2_XA.1

// Nguồn: index.html:14260 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.D2_KHONG.1 EDITABLE
const D2_KHONG = [['d2_nhay'], ['d2_hat'], ['d2_flip'], ['e_crow','e_throw'], ['d2_lan'], ['e_glaive','e_harvest']];
// BOSS_PART_END s0.D2_KHONG.1

// Nguồn: index.html:14261 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.D2_GAN3.1 EDITABLE
const D2_GAN3 = [['w_frenzy','d2_combo'], ['w_pull','d2_bo'], ['w_launch','d2_nhay'], ['d2_xoay','w_aegis'], ['d2_combo','e_claw','w_frenzy'], ['d2_hat','w_frenzy'], ['d2_flip','w_frenzy']];
// BOSS_PART_END s0.D2_GAN3.1

// Nguồn: index.html:14262 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.D2_XA3.1 EDITABLE
const D2_XA3  = [['w_exhume','e_tele','d2_combo'], ['w_pull','d2_xoay'], ['w_redeem','d2_lan'], ['w_ult'], ['e_crow','w_pull','d2_bo']];
// BOSS_PART_END s0.D2_XA3.1

// Nguồn: index.html:14263 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.D2_CD.1 EDITABLE
const D2_CD = { d2_xoay: 150, d2_bo: 120, d2_hat: 110, d2_nhay: 150, d2_lan: 200, d2_flip: 140 };
// BOSS_PART_END s0.D2_CD.1

// Nguồn: index.html:14265 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.Object.assign.DeathBoss.prototype.1 EDITABLE
Object.assign(DeathBoss.prototype, {
            hurtP(n){
                if (dino.isShielding()){ parry(); return; }
                let h = dino.hp; dino.takeDamage(n);
                if (dino.hp < h){ this.trungLuc = frames; this.trungMove = this.state; }
            },
            toIdle(t){
                let st = this.state;
                this.state = 'idle'; this.subTimer = 0;
                if (this.stage !== 2) this.fly = 0;
                this._aam = null; this.lanG = 0;
                this.arm = 'scythe'; this.armR = 0; this.armL = 0;
                if (this.stage !== 2) this.d2Noi(st);
                if (this.stage !== 2 && this.chuoi && this.chuoi.length && this.hp > 0){
                    this.actionTimer = Math.max(4, Math.round(6 / this.spd())); return;
                }
                this.noiThem = 0;
                this.actionTimer = Math.max(8, Math.round(t * 1.0 / this.spd()));
            },
            d2Noi(st){
                if (!this.chuoi) this.chuoi = [];
                let trung = (frames - (this.trungLuc || -999)) < 50 && this.trungMove === st;
                if (!trung || (this.noiThem || 0) >= 1) return;
                let ke = null;
                if (st === 'd2_combo' || st === 'e_claw') ke = Math.random() < 0.5 ? 'd2_hat' : 'e_mace';
                else if (st === 'e_tele' || st === 'd2_lan' || st === 'd2_loc' || st === 'd2_flip') ke = 'd2_combo';
                else if (st === 'd2_xoay') ke = 'd2_hat';
                if (ke && this.chuoi[0] !== ke){ this.chuoi.unshift(ke); this.noiThem = 1; }
            },
            d2Chon(){
                let c = null;
                if (this.chuoi && this.chuoi.length) c = this.chuoi.shift();
                else {
                    let kc = Math.abs(this.gap()), tren = !dino.grounded && (dino.y + dino.h) < 290;
                    let bo;
                    if (tren && kc < 240) bo = D2_KHONG;
                    else if (this.stage === 3 && Math.random() < 0.45) bo = kc > 200 ? D2_XA3 : D2_GAN3;
                    else if (kc > 330) bo = D2_XA;
                    else if (kc > 170) bo = D2_TIEP;
                    else bo = D2_GAN;
                    this.chuoi = bo[Math.floor(Math.random() * bo.length)].slice();
                    c = this.chuoi.shift();
                }
                if (!this.canUse(c)) c = 'd2_combo';
                else { this.paySkill(c); if (D2_CD[c]) this.cd[c] = D2_CD[c]; }
                this.state = c; this.subTimer = 0; this.combo = 0; this.faceP();
            },
            d2Tick(){
                this.d2Hieu();
                if (this.neCd > 0) this.neCd--;
                if (this.breakCd > 0) this.breakCd--;
                if (this.neT > 0 && --this.neT === 0 && this._neKhoa){ this.invulnAll = false; this._neKhoa = false; }
                let mat = (this._hpTruoc == null ? this.hp : this._hpTruoc) - this.hp; this._hpTruoc = this.hp;
                if (!this.dmgLog) this.dmgLog = [];
                if (mat > 0) this.dmgLog.push({ f: frames, d: mat });
                while (this.dmgLog.length && frames - this.dmgLog[0].f > 48) this.dmgLog.shift();
                if (this.invulnAll || this.state === 'd2_ne' || this.state === 'entering' || this.state === 'gate_in' || this.split || this.wallT > 0 || this.fly > 0) return false;
                let ranh = this.state === 'idle' || /^(d2_combo|e_claw|e_throw|e_crow|e_glaive)$/.test(this.state);
                let tong = 0; for (const e of this.dmgLog) tong += e.d;
                if (tong >= 4 && this.breakCd <= 0 && ranh){
                    this.breakCd = this.stage === 3 ? 130 : 170; this.dmgLog.length = 0;
                    floatingTexts.push(new FloatingText(this.x - 20, this.y - 40, 'KHÔNG ĐƯỢC ĐÂU'));
                    this.batNe(true); return true;
                }
                if (this.neCd <= 0 && (this.state === 'idle' || this.state === 'd2_combo')){
                    let cx = this.cx(), cy = this.cy();
                    for (const pr of projectiles){
                        if (!pr || pr.owner !== 1) continue;
                        let px = pr.x + (pr.w || 0) / 2, py = pr.y + (pr.h || 0) / 2, vx = pr.vx || pr.speed || 0;
                        if (!((px < cx && vx > 0) || (px > cx && vx < 0)) || Math.abs(px - cx) > 140 || Math.abs(py - cy) > 70) continue;
                        this.neCd = this.stage === 3 ? 80 : 100;
                        if (Math.random() < 0.6){ this.batNe(Math.abs(this.gap()) < 260); return true; }
                        break;
                    }
                }
                return false;
            },
            batNe(xuyen){
                this.slash = null; this.tel = null; this.chain = null;
                this.state = 'd2_ne'; this.subTimer = 0; this.faceP();
                let pcx = dino.x + dino.w / 2, s = this.cx() < pcx ? 1 : -1;
                this.neTo = xuyen ? Math.max(62, Math.min(canvas.width - this.w - 62, pcx + s * 70 - this.w / 2))
                                  : Math.max(62, Math.min(canvas.width - this.w - 62, this.x - s * 150));
                this.invulnAll = true; this._neKhoa = true; this.neT = 16;
                for (let k = 0; k < 4; k++) this.ghost();
                if (SFX.tone) SFX.tone(1100, 0.06, 'sine', 0.10, 360);
                this.chuoi = xuyen ? ['d2_combo'] : [Math.random() < 0.6 ? 'd2_loc' : 'e_tele'];
            },
            d2TienTo(n, T){
                const H = [10, 19, 28];
                let g = this.gap(); if (Math.abs(g) > 70 && this.subTimer < H[n - 1]) this.x += Math.sign(g) * 3.4;
                for (let k = 0; k < n; k++){
                    if (T(H[k] - 7)){ this.faceP(); this.warn(88, 16, 7); }
                    if (T(H[k])){
                        this.faceP(); this.armR = (k % 2) ? -1.5 : -0.4; this.armL = (k % 2) ? -0.4 : -1.5;
                        this.doSlash(88, 16, 8, 1); this.dashV = this.dir() * 4;
                        if (SFX.tone) SFX.tone(560 - k * 40, 0.05, 'square', 0.10, 260);
                    }
                }
                return H[n - 1];
            },
            d2Ngat(tu, den, T){
                if (this.subTimer > tu && this.subTimer < den){ this.ngat = 1; this.dashV *= 0.7; this.armR += (-2.2 - this.armR) * 0.15; this.armL += (-2.2 - this.armL) * 0.15; }
                if (T(den)){ this.ngat = 0; this.arm = 'dai'; this.ghepFx = 14; if (SFX.tone) SFX.tone(1300, 0.08, 'sine', 0.10, 700); }
            },
            d2Hieu(){
                if (this.ghepFx > 0) this.ghepFx--;
                if (!this.hon) this.hon = [];
                for (let i = this.hon.length - 1; i >= 0; i--){
                    let o = this.hon[i];
                    if (o.t > 0){ o.t--; if (o.t === 0 && SFX.tone) SFX.tone(420, 0.05, 'sine', 0.08, 900); continue; }
                    o.life--;
                    let hop = o.cot ? { x: o.x - 30, y: 320 - 250, w: 60, h: 250 } : { x: o.x - 20, y: 320 - 110, w: 40, h: 110 };
                    if (!o.hit && o.life > 4 && checkAABB(dino, hop)){ o.hit = true; this.hurtP(1); }
                    if (o.life <= 0) this.hon.splice(i, 1);
                }
                let L = this.locBay;
                if (L){
                    L.t++; L.spin += 0.5;
                    if (L.pha === 0){ L.x += L.vx; L.y += L.vy; L.vx *= 0.955; L.vy *= 0.955; if (L.t > 26) L.pha = 1; }
                    else if (L.pha === 1){ L.y += Math.sin(L.t * 0.2) * 0.6; if (L.t > 70) L.pha = 2; }
                    else {
                        let a = Math.atan2(this.cy() - L.y, this.cx() - L.x);
                        L.x += Math.cos(a) * 14; L.y += Math.sin(a) * 14;
                        if (Math.abs(L.x - this.cx()) < 24 && Math.abs(L.y - this.cy()) < 30) this.locBay = null;
                    }
                    if (this.locBay){
                        L.x = Math.max(20, Math.min(canvas.width - 20, L.x)); L.y = Math.max(40, Math.min(300, L.y));
                        let dx = pcxOf() - L.x, dy = (dino.y + dino.h / 2) - L.y;
                        if (dx * dx + dy * dy < 46 * 46 && frames - (L.hitF || -99) > 14){ L.hitF = frames; this.hurtP(1); }
                        if (L.t > 160) this.locBay = null;
                    }
                }
                if (this.vongDam){ let v = this.vongDam; v.r += 10; if (v.r > 230) this.vongDam = null; }
            },
            d2Nhanh(st, T, sp){
                const du = (n) => this.dir() * n;
                // ===== [CHIÊU MỚI CHUẨN DS2] FLIP SAW (d2_flip): Nhào lộn cối xay song liềm trên không trung =====
                if (st === 'd2_flip'){
                    this.arm = 'dai';
                    if (T(2)){
                        this.faceP(); this.warn(98, 42, 14);
                        this.ghepFx = 12;
                        floatingTexts.push(new FloatingText(this.x - 16, this.y - 34, 'FLIP SAW'));
                    }
                    if (T(16)){
                        this.faceP();
                        this.dy = -12.5; this.grounded = false;
                        this.dashV = du(12);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer >= 16 && this.subTimer < 42){
                        this.lanG = (this.lanG || 0) + 0.45 * sp * (this.facingLeft ? -1 : 1);
                        this.armR += 0.6 * sp;
                        if (frames % 3 === 0) this.ghost();
                        if (T(22) || T(32)){
                            this.doSlash(96, 46, 8, 1);
                            if (SFX.tone) SFX.tone(620, 0.05, 'sawtooth', 0.10, 320);
                        }
                    }
                    if (T(42)){
                        this.lanG = 0; this.faceP();
                        this.armR = -0.3;
                        this.doSlash(112, 24, 12, 1);
                        shakeTimer = Math.max(shakeTimer, 16);
                        visualEffects.push(new Effect(this.cx() + du(46), 316, 'explosion', true, 32));
                    }
                    if (this.subTimer > 58){ this.lanG = 0; this.toIdle(22); }
                    return true;
                }
                // ===== 1 nhat · NGAT · WHIRLWIND =====
                if (st === 'd2_xoay'){
                    this.arm = this.subTimer < 30 ? 'scythe' : 'dai';
                    let cuoi = this.d2TienTo(1, T); this.d2Ngat(cuoi + 2, 30, T);
                    if (T(30)){ this.faceP(); floatingTexts.push(new FloatingText(this.x - 20, this.y - 34, 'WHIRLWIND')); }
                    if (this.subTimer > 34 && this.subTimer < 84){
                        this.xoayG = (this.xoayG || 0) + 0.55 * sp; this.armR = this.xoayG; this.armL = this.xoayG + 3.14;
                        let g = this.gap(); if (Math.abs(g) > 10) this.x += Math.sign(g) * 2.6 * sp;
                        let dx = pcxOf() - this.cx(), dy = (dino.y + dino.h / 2) - this.cy();
                        if (Math.abs(dx) < 220 && !dino.isShielding()) dino.x -= Math.sign(dx) * 1.4;
                        if ((dx / 110) * (dx / 110) + (dy / 66) * (dy / 66) < 1 && frames - (this._xoayHit || -99) > 16){ this._xoayHit = frames; this.hurtP(1); }
                        if (frames % 3 === 0) this.ghost();
                    }
                    if (this.subTimer > 98){ this.xoayG = 0; this.toIdle(22); }
                    return true;
                }
                // ===== 2 nhat · NGAT · HAT TUNG + COT HON =====
                if (st === 'd2_hat'){
                    this.arm = this.subTimer < 34 ? 'scythe' : 'dai';
                    let cuoi = this.d2TienTo(2, T); this.d2Ngat(cuoi + 2, 34, T);
                    if (T(34)){ this.faceP(); this.warn(98, 110, 10); this.armR = 0.5; }
                    if (T(44)){
                        this.armR = -2.9; this.doSlash(100, 112, 12, 1); this.dashV = du(4);
                        this.hon.push({ cot: true, x: this.cx() + du(70), t: 4, life: 26, hit: false });
                        if (SFX.tone) SFX.tone(260, 0.12, 'sawtooth', 0.12, 780);
                    }
                    if (T(50) && this.trungMove === 'd2_hat' && frames - this.trungLuc < 8 && !dino.isShielding()){
                        dino.dy = -12.5; dino.grounded = false;
                        floatingTexts.push(new FloatingText(this.x - 14, this.y - 34, 'REAPING'));
                        this.chuoi.unshift('d2_nhay'); this.noiThem = 1; this._nhayGap = true;
                    }
                    if (this.subTimer > 66) this.toIdle(this._nhayGap ? 2 : 22);
                    return true;
                }
                // ===== 3 nhat · NGAT · SOUL CLEAVE =====
                if (st === 'd2_bo'){
                    this.arm = this.subTimer < 44 ? 'scythe' : 'dai';
                    let cuoi = this.d2TienTo(3, T); this.d2Ngat(cuoi + 2, 44, T);
                    if (T(44)){ this.faceP(); this.warn(120, 40, 14); this.armR = -2.8; }
                    if (T(58)){
                        this.armR = -0.5; this.doSlash(120, 40, 12, 1); this.dashV = du(7);
                        shakeTimer = Math.max(shakeTimer, 22);
                        visualEffects.push(new Effect(this.cx() + du(60), 316, 'explosion', true, 40));
                        for (let i = 0; i < 6; i++){
                            let x = this.cx() + du(80 + i * 58);
                            if (x < 20 || x > canvas.width - 20) break;
                            this.hon.push({ cot: false, x: x, t: 4 + i * 5, life: 22, hit: false, dir: this.dir() });
                        }
                        floatingTexts.push(new FloatingText(this.x - 20, this.y - 34, 'SOUL CLEAVE'));
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 84) this.toIdle(24);
                    return true;
                }
                // ===== NHAY: bay toi, chem xoay tren khong, DAM XUONG =====
                if (st === 'd2_nhay'){
                    if (T(3)){ this.faceP(); this.arm = 'dai'; this.armR = 0.6; this._bay = false; }
                    if (T(10)){
                        let g = this.gap();
                        this.dy = this._nhayGap ? -14 : -15; this.grounded = false; this._bay = true;
                        this.dashV = Math.sign(g) * Math.min(this._nhayGap ? 6 : 10, Math.abs(g) / 12);
                        for (let k = 0; k < 3; k++) this.ghost();
                    }
                    if (this._bay){
                        this.arm = 'dai';
                        if (this.subTimer < 30){ this.armR = this.subTimer * 0.6; if (T(22)){ this.faceP(); this.doSlash(88, 46, 8, 1); } }
                        if (T(30)){ this.faceP(); this.dy = 19; this.armR = 1.2; this.dashV = 0; floatingTexts.push(new FloatingText(this.x - 4, this.y - 30, 'GUILLOTINE!')); }
                        if (this.subTimer > 30 && frames % 2 === 0) this.ghost();
                        if (this.subTimer > 14 && this.grounded){
                            this._bay = false; this._nhayGap = false;
                            shakeTimer = Math.max(shakeTimer, 28);
                            visualEffects.push(new Effect(this.cx(), this.y + this.h, 'explosion', true, 60));
                            this.vongDam = { x: this.cx(), r: 10 };
                            for (let s2 = -1; s2 <= 1; s2 += 2){
                                let w = new BossProjectile(this.cx() + s2 * 24, 322 - 46, s2 * 10, 0, true, 1);
                                w.w = 36; w.h = 46; w.color = '#69F0AE'; w.crescent = true; w.isPiercing = true;
                                bossProjectiles.push(w);
                            }
                            if ((dino.y + dino.h) > 280 && Math.abs(pcxOf() - this.cx()) < 90) this.hurtP(1);
                            if (SFX.bossExplode) SFX.bossExplode();
                            this.subTimer = Math.max(this.subTimer, 70);
                        }
                    }
                    if (this.subTimer > 90){ this._bay = false; this._nhayGap = false; this.toIdle(24); }
                    return true;
                }
                // ===== LAN (bat tu) roi PHONG LUOI GHEP XOAY =====
                if (st === 'd2_lan'){
                    if (T(2)){
                        this.faceP(); this.arm = 'scythe'; let kc = Math.abs(this.gap());
                        this.lanHuong = (kc < 180 ? -1 : 1) * Math.sign(this.gap() || 1);
                        this.invulnAll = true; this._neKhoa = true; this.neT = 20;
                        if (SFX.tone) SFX.tone(900, 0.05, 'sine', 0.08, 300);
                    }
                    if (this.subTimer > 2 && this.subTimer < 18){ this.x += this.lanHuong * 9 * sp; this.lanG = (this.lanG || 0) + 0.55 * this.lanHuong * (this.facingLeft ? -1 : 1); if (frames % 2 === 0) this.ghost(); }
                    if (T(18)){ this.lanG = 0; this.state = 'd2_loc'; this.subTimer = 0; this.faceP(); }
                    return true;
                }
                if (st === 'd2_loc'){
                    this.lanG = 0;
                    if (T(2)){ this.faceP(); this.arm = 'dai'; this.armR = -2.6; this.ghepFx = 12; }
                    if (T(14)){
                        this.faceP(); this.armR = -1.2; this.arm = 'tay';
                        let a = Math.atan2((dino.y + dino.h / 2) - this.cy(), pcxOf() - this.cx());
                        this.locBay = { x: this.cx(), y: this.cy(), vx: Math.cos(a) * 15, vy: Math.sin(a) * 15, t: 0, pha: 0, spin: 0 };
                        floatingTexts.push(new FloatingText(this.x - 10, this.y - 34, 'SCYTHE STORM'));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 14 && this.locBay) this.arm = 'tay';
                    if ((this.subTimer > 20 && !this.locBay) || this.subTimer > 170){ this.locBay = null; this.toIdle(16); }
                    return true;
                }
                return false;
            },
            d2Ve(sau){
                if (this.stage === 2 || this.split){ this.hon = []; this.locBay = null; this.vongDam = null; if (this.arm === 'dai' || this.arm === 'tay') this.arm = 'scythe'; }
                if (!this.hon) return;
                ctx.save();
                if (!sau){
                    for (const o of this.hon){
                        if (o.t > 0){
                            ctx.globalAlpha = 0.25 + 0.35 * Math.sin(frames * 0.5); ctx.fillStyle = '#69F0AE';
                            ctx.beginPath(); ctx.ellipse(o.x, 318, o.cot ? 30 : 18, 5, 0, 0, 6.28); ctx.fill();
                            continue;
                        }
                        let k = Math.min(1, (o.cot ? 26 : 22) - o.life + 1) / 4, a = Math.min(1, o.life / 8);
                        k = Math.min(1, k);
                        if (o.cot){
                            let hh = 250 * k, g = ctx.createLinearGradient(0, 320 - hh, 0, 320);
                            g.addColorStop(0, 'rgba(105,240,174,0)'); g.addColorStop(0.4, 'rgba(105,240,174,0.58)'); g.addColorStop(1, 'rgba(27,94,32,0.85)');
                            ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fillRect(o.x - 28, 320 - hh, 56, hh);
                            ctx.fillStyle = 'rgba(230,255,236,0.75)';
                            for (let q = 0; q < 5; q++){ let yy = 320 - ((frames * 7 + q * 50) % Math.max(1, hh)); ctx.beginPath(); ctx.arc(o.x + Math.sin(q * 2 + frames * 0.2) * 12, yy, 4, 0, 6.28); ctx.fill(); }
                        } else {
                            let hh = 108 * k; ctx.globalAlpha = 0.88 * a;
                            ctx.save(); ctx.translate(o.x, 320); ctx.scale(o.dir || 1, 1);
                            ctx.shadowColor = '#00E676'; ctx.shadowBlur = 10;
                            ctx.fillStyle = '#1B5E20'; ctx.fillRect(-2.5, -hh, 5, hh);
                            ctx.fillStyle = 'rgba(200,255,214,0.92)';
                            ctx.beginPath(); ctx.moveTo(0, -hh); ctx.quadraticCurveTo(32, -hh - 12, 40, -hh + 26); ctx.quadraticCurveTo(24, -hh + 8, 0, -hh + 8); ctx.closePath(); ctx.fill();
                            ctx.strokeStyle = '#69F0AE'; ctx.lineWidth = 2; ctx.stroke();
                            ctx.restore();
                        }
                    }
                    if (this.vongDam){
                        let v = this.vongDam; ctx.globalAlpha = Math.max(0, 1 - v.r / 230); ctx.strokeStyle = '#69F0AE'; ctx.lineWidth = 4;
                        ctx.beginPath(); ctx.ellipse(v.x, 318, v.r, v.r * 0.18, 0, 0, 6.28); ctx.stroke();
                    }
                } else {
                    if (this.state === 'd2_xoay' && this.subTimer > 34 && this.subTimer < 84){
                        let cx = this.cx(), cy = this.cy();
                        for (let q = 0; q < 4; q++){
                            ctx.globalAlpha = 0.48 - q * 0.08; ctx.strokeStyle = q % 2 ? '#69F0AE' : '#B388FF'; ctx.lineWidth = 4.5 - q * 0.6;
                            let a0 = (this.xoayG || 0) * 1.3 + q * 1.6;
                            ctx.beginPath(); ctx.ellipse(cx, cy + 6 - q * 8, 112 - q * 16, 26 + q * 6, 0, a0, a0 + 3.6); ctx.stroke();
                        }
                    }
                    if (this.state === 'd2_flip' && this.subTimer >= 16 && this.subTimer < 42){
                        ctx.save(); ctx.translate(this.cx(), this.cy());
                        ctx.globalAlpha = 0.65;
                        ctx.strokeStyle = '#69F0AE'; ctx.lineWidth = 6;
                        ctx.beginPath(); ctx.arc(0, 0, 56, frames * 0.6, frames * 0.6 + 4.2); ctx.stroke();
                        ctx.strokeStyle = '#B388FF'; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.arc(0, 0, 44, -frames * 0.6, -frames * 0.6 + 4.2); ctx.stroke();
                        ctx.restore();
                    }
                    if (this.ngat){
                        ctx.globalAlpha = 0.5 + 0.5 * Math.sin(frames * 0.6); ctx.fillStyle = '#69F0AE';
                        ctx.beginPath(); ctx.arc(this.cx() + this.dir() * 10, this.y + 4, 6, 0, 6.28); ctx.fill();
                        ctx.fillStyle = '#E8F5E9'; ctx.font = 'bold 12px Consolas, monospace'; ctx.textAlign = 'center';
                        ctx.fillText('…', this.cx(), this.y - 10); ctx.textAlign = 'left';
                    }
                    if (this.ghepFx > 0){
                        ctx.globalAlpha = this.ghepFx / 14; ctx.strokeStyle = '#E8F5E9'; ctx.lineWidth = 2;
                        let r = 30 - this.ghepFx;
                        for (let q = 0; q < 6; q++){ let a = q * 1.047 + frames * 0.1; ctx.beginPath(); ctx.moveTo(this.cx() + Math.cos(a) * 6, this.cy() + Math.sin(a) * 6); ctx.lineTo(this.cx() + Math.cos(a) * r, this.cy() + Math.sin(a) * r); ctx.stroke(); }
                    }
                    let L = this.locBay;
                    if (L){
                        ctx.globalAlpha = 0.25; ctx.fillStyle = '#69F0AE'; ctx.beginPath(); ctx.arc(L.x, L.y, 46, 0, 6.28); ctx.fill();
                        ctx.globalAlpha = 0.65; ctx.strokeStyle = '#E8F5E9'; ctx.lineWidth = 2.2;
                        for (let q = 0; q < 2; q++){ ctx.beginPath(); ctx.arc(L.x, L.y, 40 - q * 10, L.spin + q, L.spin + q + 2.4); ctx.stroke(); }
                        ctx.globalAlpha = 1; ctx.save(); ctx.translate(L.x, L.y); ctx.rotate(L.spin); veLuoiGhep(1.05); ctx.restore();
                    }
                }
                ctx.restore();
            },
            d2Chay(){
                let st = this.state, sp = this.spd(); this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;
                if (st === 'd2_ne'){
                    let dx = this.neTo - this.x; this.y = this.baseY; this.dy = 0;
                    if (Math.abs(dx) > 26){ this.x += Math.sign(dx) * 26; this.ghost(); }
                    else this.x = this.neTo;
                    if (this.subTimer > 14){ this.faceP(); this.toIdle(4); }
                    return;
                }
                if (this.d2Nhanh(st, T, sp)) return;
                if (st === 'd2_combo'){
                    this.arm = this.subTimer >= 34 ? 'dai' : 'scythe';
                    if (T(34)){ this.ghepFx = 12; this.armR = -2.6; }
                    let hits = [10, 19, 28, 42];
                    let g = this.gap(); if (Math.abs(g) > 70 && this.subTimer < 40) this.x += Math.sign(g) * 3.4;
                    for (let k = 0; k < 4; k++){
                        if (T(hits[k] - 7)){ this.faceP(); this.warn(k === 3 ? 112 : 88, k === 3 ? 28 : 16, 7); }
                        if (T(hits[k])){
                            this.faceP(); let big = k === 3;
                            this.armR = (k % 2) ? -1.5 : -0.4; this.armL = (k % 2) ? -0.4 : -1.5;
                            if (big){ this.arm = 'dai'; this.armR = -0.3; }
                            this.doSlash(big ? 112 : 88, big ? 28 : 16, big ? 12 : 8, 1);
                            this.dashV = this.dir() * (big ? 9 : 4);
                            if (big){ shakeTimer = Math.max(shakeTimer, 12); this.summonReaper('slash', this.cx(), this.cy()); }
                            if (SFX.tone) SFX.tone(560 - k * 40, 0.05, 'square', 0.10, 260);
                        }
                    }
                    if (this.subTimer > 56) this.toIdle(20);
                    return;
                }
                if (st === 'd2_launch'){
                    this.arm = 'scythe';
                    if (T(3)){ this.faceP(); this.warn(96, 80, 12); this.armR = 0.8; }
                    if (T(15)){
                        this.doSlash(98, 84, 12, 1); this.armR = -2.4;
                        floatingTexts.push(new FloatingText(this.x - 14, this.y - 34, 'REAPING'));
                        this._grip = checkAABB(dino, this.slashRect()) && !dino.isShielding();
                        if (this._grip){ dino.dy = -12; dino.grounded = false; }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this._grip && T(32)){
                        floatingTexts.push(new FloatingText(this.x - 16, this.y - 40, 'DEATHGRIP'));
                        dino.x += ((this.cx() + this.dir() * 40 - dino.w / 2) - dino.x) * 0.8;
                        dino.dy = 16; this._gripDap = true;
                    }
                    if (this._gripDap && dino.grounded){
                        this._gripDap = false; shakeTimer = Math.max(shakeTimer, 18);
                        visualEffects.push(new Effect(dino.x + dino.w / 2, dino.y + dino.h, 'explosion', true, 40));
                        this.hurtP(1);
                    }
                    if (this.subTimer > 52){ this._grip = false; this._gripDap = false; this.toIdle(20); }
                    return;
                }
                this.toIdle(20);
            }
        });
// BOSS_PART_END s0.Object.assign.DeathBoss.prototype.1

// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24489 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:26327 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.DT_W2.1 EDITABLE
const DT_W2 = 46, DT_H2 = 74;
// BOSS_PART_END s0.DT_W2.1

// Nguồn: index.html:26328 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.DTH_WALL_Y.1 EDITABLE
const DTH_WALL_Y = 96;
// BOSS_PART_END s0.DTH_WALL_Y.1

// Nguồn: index.html:26329 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.DTH_TEMPO.1 EDITABLE
const DTH_TEMPO = 1.22;
// BOSS_PART_END s0.DTH_TEMPO.1

// Nguồn: index.html:26330 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.DTH_APPAR_R.1 EDITABLE
const DTH_APPAR_R = 210;
// BOSS_PART_END s0.DTH_APPAR_R.1

// Nguồn: index.html:26331 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.DTH_SPIN_RX.1 EDITABLE
const DTH_SPIN_RX = 178, DTH_SPIN_RY = 56;
// BOSS_PART_END s0.DTH_SPIN_RX.1

// Nguồn: index.html:26332 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.DTH_NGANG_TREN.1 EDITABLE
const DTH_NGANG_TREN = 66, DTH_NGANG_DUOI = 30;
// BOSS_PART_END s0.DTH_NGANG_TREN.1

// Nguồn: index.html:26333 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.LUOI_THEO_CHIEU.1 EDITABLE
const LUOI_THEO_CHIEU = { r_bo: 'dai', r_nhay: 'dai', p_reap: 'dai', r_luot: 'luot', r_moc: 'moc' };
// BOSS_PART_END s0.LUOI_THEO_CHIEU.1

// Nguồn: index.html:26335 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.dthQuetNgang.1 READ_ONLY
function dthQuetNgang(cx, nuaRong, dat){
            if (typeof dino === 'undefined' || !dino || dino.isCrouching) return false;
            let d = dat || 320;
            return dino.x + dino.w > cx - nuaRong && dino.x < cx + nuaRong
                && dino.y + dino.h > d - DTH_NGANG_TREN && dino.y < d - DTH_NGANG_DUOI;
        }
// BOSS_PART_END s0.dthQuetNgang.1

// Nguồn: index.html:26341 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.DTH_CD.1 EDITABLE
const DTH_CD = { p_sweep:120, p_reap:300, p_soul:180, p_dive:150, p_orbit:340,
                         e_harvest:200, e_mace:130, e_tele:110, e_throw:120, e_crow:230, e_wall:190,
                         e_wallrain:250, e_glaive:120, e_claw:90,
                         w_pull:110, w_launch:130, w_airpull:150, w_ult:330, w_redeem:120,
                         w_frenzy:150, w_exhume:260, w_aegis:200 };
// BOSS_PART_END s0.DTH_CD.1

// Nguồn: index.html:26346 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.DTH_LOCK_PAIR.1 EDITABLE
const DTH_LOCK_PAIR = 320;
// BOSS_PART_END s0.DTH_LOCK_PAIR.1

// Nguồn: index.html:26347 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.RP_CD.1 READ_ONLY
const RP_CD = { r_combo: 70, r_harv: 260, r_luot: 150, r_moc: 220, r_bo: 200, r_nhay: 200, p_reap: 540 };
// BOSS_PART_END s0.RP_CD.1

// Nguồn: index.html:26443 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.veLuoiGhep.1 EDITABLE
function veLuoiGhep(k){
            // Truc can xuong cot song + Khop dau lau giua can
            ctx.fillStyle = '#2D2926'; ctx.fillRect(-3 * k, -52 * k, 6 * k, 80 * k);
            ctx.fillStyle = '#B0BEC5';
            for (let i = -2; i <= 2; i++) ctx.fillRect(-3.8 * k, i * 14 * k, 7.6 * k, 3 * k);
            // Loi ngoc Necro giua khop ghep
            ctx.save();
            ctx.shadowColor = '#00E676'; ctx.shadowBlur = 10;
            ctx.fillStyle = '#69F0AE';
            ctx.beginPath(); ctx.arc(0, 0, 5.5 * k, 0, 6.28); ctx.fill();
            ctx.restore();

            // Luoi hai chinh khong lo o dau tren (Cong vuot sac lem + Rang cua xuong)
            let bg1 = ctx.createLinearGradient(0, -52 * k, 64 * k, -24 * k);
            bg1.addColorStop(0, '#78909C'); bg1.addColorStop(0.5, '#ECEFF1'); bg1.addColorStop(1, '#B0BEC5');
            ctx.fillStyle = bg1;
            ctx.beginPath();
            ctx.moveTo(-2 * k, -50 * k);
            ctx.quadraticCurveTo(44 * k, -68 * k, 64 * k, -24 * k);
            ctx.quadraticCurveTo(40 * k, -48 * k, 2 * k, -38 * k);
            ctx.closePath(); ctx.fill();
            // Vien nang luong Necro xanh luc doc mep sac
            ctx.strokeStyle = '#69F0AE'; ctx.lineWidth = 2 * k;
            ctx.beginPath(); ctx.moveTo(4 * k, -52 * k); ctx.quadraticCurveTo(46 * k, -68 * k, 64 * k, -24 * k); ctx.stroke();

            // Luoi hai đối xứng ở đầu dưới
            ctx.fillStyle = '#CFD8DC';
            ctx.beginPath();
            ctx.moveTo(2 * k, 26 * k);
            ctx.quadraticCurveTo(-28 * k, 36 * k, -38 * k, 10 * k);
            ctx.quadraticCurveTo(-18 * k, 22 * k, -2 * k, 18 * k);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = '#B388FF'; ctx.lineWidth = 1.6 * k;
            ctx.beginPath(); ctx.moveTo(0, 27 * k); ctx.quadraticCurveTo(-28 * k, 36 * k, -38 * k, 10 * k); ctx.stroke();
        }
// BOSS_PART_END s0.veLuoiGhep.1

// Nguồn: index.html:26480 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.drawDeathBody.1 EDITABLE
function drawDeathBody(b, x, y){
            let dr = b.facingLeft ? -1 : 1, cxb = x + DT_W2/2;
            let isStage3 = b.stage === 3;
            let glowCol = isStage3 ? "#E040FB" : "#69F0AE";

            ctx.save();
            if (b.lanG){
                ctx.translate(cxb, y + DT_H2 * 0.55);
                ctx.rotate(b.lanG);
                ctx.scale(0.84, 0.84);
                ctx.translate(-cxb, -(y + DT_H2 * 0.55));
            }
            ctx.translate(cxb, y); ctx.scale(dr, 1); ctx.translate(-cxb, -y);
            let sway = Math.sin(frames * 0.065) * 2.2 + (b.dashV ? -Math.abs(b.dashV) * 0.35 : 0);
            let walkCycle = Math.sin((b.walk || 0) * 0.14) * 2.8;

            // 1. TÀ VẢI CHOÀNG HÔNG RÁCH TẢ TƠI BAY PHẤP PHỚI PHÍA SAU
            ctx.fillStyle = isStage3 ? "#1F122B" : "#1C222D";
            ctx.beginPath();
            ctx.moveTo(cxb - 10, y + 40);
            ctx.quadraticCurveTo(cxb - 34 - sway*2.2, y + 54, cxb - 28 - sway*3.2, y + DT_H2 - 2);
            for (let k = 0; k < 4; k++){
                ctx.lineTo(cxb - 22 - sway*2 + k*6, y + DT_H2 - (k%2 ? 14 : 2));
            }
            ctx.lineTo(cxb + 4, y + 42);
            ctx.closePath(); ctx.fill();

            // 2. BỜM TÓC ĐEN DÀI XÕA RỐI BAY SAU LƯNG (Đặc trưng nhất của Death DS2)
            ctx.fillStyle = "#11131A";
            ctx.beginPath();
            ctx.moveTo(cxb - 4, y + 4);
            ctx.quadraticCurveTo(cxb - 26 - sway * 1.8, y + 12, cxb - 32 - sway * 2.5, y + 36);
            ctx.lineTo(cxb - 22 - sway * 1.5, y + 30);
            ctx.lineTo(cxb - 26 - sway * 2.0, y + 44);
            ctx.lineTo(cxb - 14 - sway, y + 28);
            ctx.lineTo(cxb - 2, y + 16);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#2C3242"; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(cxb - 6, y + 8); ctx.quadraticCurveTo(cxb - 20 - sway*1.5, y + 18, cxb - 25 - sway*2, y + 34); ctx.stroke();

            // 3. CHÂN GIÁP ABYSSAL + ỦNG SẮT ĐẦU LÂU
            ctx.fillStyle = "#262C3A";
            ctx.fillRect(cxb - 12, y + 46, 9.5, 26 + walkCycle * 0.25);
            ctx.fillRect(cxb + 2.5, y + 46, 9.5, 26 - walkCycle * 0.25);
            // Giap goi dau lau bac
            ctx.fillStyle = "#78909C";
            ctx.fillRect(cxb - 11, y + 51, 7.5, 5); ctx.fillRect(cxb + 3.5, y + 51, 7.5, 5);
            // Giay ung thep nhon
            ctx.fillStyle = "#12151C";
            ctx.fillRect(cxb - 15, y + DT_H2 - 6, 13, 6); ctx.fillRect(cxb + 2, y + DT_H2 - 6, 13, 6);

            // 4. THẮT LƯNG ĐẦU LÂU CỔ ĐẠI & KHỐ VẢI TÍM THAN
            ctx.fillStyle = isStage3 ? "#381B4A" : "#252B3B";
            ctx.beginPath();
            ctx.moveTo(cxb - 10, y + 44); ctx.lineTo(cxb + 10, y + 44);
            ctx.lineTo(cxb + 6 + sway*0.4, y + 65); ctx.lineTo(cxb, y + 58); ctx.lineTo(cxb - 6 + sway*0.4, y + 66);
            ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#3E352F"; ctx.fillRect(cxb - 12, y + 42, 24, 4.5);
            ctx.fillStyle = "#CFD8DC"; ctx.beginPath(); ctx.arc(cxb, y + 44, 4, 0, 6.28); ctx.fill(); // Khoa dau lau

            // 5. THÂN TRÊN TRẦN SĂN CHẮC MÀU XÁM TÍM TÁI CỦA NEPHILIM + LÕI TÍM GIỮA NGỰC
            let tg = ctx.createLinearGradient(0, y + 18, 0, y + 44);
            tg.addColorStop(0, "#7E869C"); tg.addColorStop(1, "#4E5568");
            ctx.fillStyle = tg;
            ctx.beginPath();
            ctx.moveTo(cxb - 13, y + 18); ctx.lineTo(cxb + 13, y + 18);
            ctx.lineTo(cxb + 9, y + 43); ctx.lineTo(cxb - 9, y + 43);
            ctx.closePath(); ctx.fill();
            // Duong co nguc & co bung Nephilim sắc nét
            ctx.strokeStyle = "#343A4A"; ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cxb - 9, y + 25); ctx.lineTo(cxb - 1, y + 27);
            ctx.moveTo(cxb + 9, y + 25); ctx.lineTo(cxb + 1, y + 27);
            ctx.moveTo(cxb, y + 26); ctx.lineTo(cxb, y + 41);
            ctx.moveTo(cxb - 6, y + 32); ctx.lineTo(cxb + 6, y + 32);
            ctx.moveTo(cxb - 5, y + 37); ctx.lineTo(cxb + 5, y + 37);
            ctx.stroke();
            // Vet seo Nephilim phat sang tim/xanh giua nguc
            ctx.save();
            ctx.shadowColor = glowCol; ctx.shadowBlur = 8;
            ctx.fillStyle = glowCol;
            ctx.beginPath(); ctx.moveTo(cxb, y + 22); ctx.lineTo(cxb + 3, y + 26); ctx.lineTo(cxb, y + 30); ctx.lineTo(cxb - 3, y + 26); ctx.closePath(); ctx.fill();
            ctx.restore();

            // 6. GIÁP VAI BẤT ĐỐI XỨNG (Vai phải bọc xương sừng khổng lồ, vai trái gọn)
            ctx.fillStyle = "#454D5E";
            ctx.beginPath(); ctx.moveTo(cxb - 12, y + 16); ctx.lineTo(cxb - 24, y + 11); ctx.lineTo(cxb - 19, y + 25); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#90A4AE"; // Giap vai xuong dau lau ben phai
            ctx.beginPath();
            ctx.moveTo(cxb + 10, y + 15); ctx.lineTo(cxb + 28, y + 7);
            ctx.lineTo(cxb + 25, y + 22); ctx.lineTo(cxb + 14, y + 26);
            ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#263238"; ctx.beginPath(); ctx.arc(cxb + 18, y + 18, 2.2, 0, 6.28); ctx.fill();

            // 7. HAI CÁNH TAY GẦY GÒ SĂN CHẮC + GĂNG TAY XƯƠNG THÉP (Bracers)
            let ar = b.armR || 0, al = b.armL || 0;
            // Tay sau (trai)
            ctx.save(); ctx.translate(cxb - 14, y + 22); ctx.rotate(al);
            ctx.fillStyle = "#6C748A"; ctx.fillRect(-3.5, 0, 7, 12);
            ctx.fillStyle = "#262C3A"; ctx.fillRect(-4, 11, 8, 10); // Gang tay thep
            ctx.fillStyle = "#90A4AE"; ctx.fillRect(-4.5, 11, 9, 2.5);
            ctx.restore();
            // Tay truoc (phai)
            ctx.save(); ctx.translate(cxb + 14, y + 22); ctx.rotate(ar);
            ctx.fillStyle = "#7E869C"; ctx.fillRect(-3.5, 0, 7, 12);
            ctx.fillStyle = "#262C3A"; ctx.fillRect(-4, 11, 8, 10);
            ctx.fillStyle = "#90A4AE"; ctx.fillRect(-4.5, 11, 9, 2.5);
            ctx.restore();

            // 8. ĐẦU: MẶT NẠ HỘP SỌ CỔ ĐẠI (Iconic Bone Mask) + TÓC ĐEN XÕA HAI BÊN + MẮT SÁNG RỰC
            // Lop toc den dinh dau
            ctx.fillStyle = "#11131A";
            ctx.beginPath();
            ctx.moveTo(cxb - 11, y + 18); ctx.lineTo(cxb - 12, y + 4);
            ctx.lineTo(cxb - 6, y - 3); ctx.lineTo(cxb + 6, y - 3);
            ctx.lineTo(cxb + 11, y + 4); ctx.lineTo(cxb + 10, y + 16);
            ctx.closePath(); ctx.fill();

            // Mat na Xuong trang nga voi go ma cao & ham rang khac chim
            let mg = ctx.createLinearGradient(cxb - 8, y + 2, cxb + 8, y + 20);
            mg.addColorStop(0, "#ECEFF1"); mg.addColorStop(0.6, "#CFD8DC"); mg.addColorStop(1, "#90A4AE");
            ctx.fillStyle = mg;
            ctx.beginPath();
            ctx.moveTo(cxb - 7.5, y + 3); ctx.lineTo(cxb + 7.5, y + 3);
            ctx.lineTo(cxb + 8.5, y + 11); ctx.lineTo(cxb + 5.5, y + 18);
            ctx.lineTo(cxb + 1, y + 21); ctx.lineTo(cxb - 5.5, y + 18);
            ctx.lineTo(cxb - 8.5, y + 11);
            ctx.closePath(); ctx.fill();
            // Cac vach rang xuong doc ham mat na
            ctx.strokeStyle = "#455A64"; ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(cxb - 3, y + 16); ctx.lineTo(cxb - 3, y + 20);
            ctx.moveTo(cxb, y + 16); ctx.lineTo(cxb, y + 21);
            ctx.moveTo(cxb + 3, y + 16); ctx.lineTo(cxb + 3, y + 20);
            ctx.stroke();

            // Hai hoc mat den sau + Đôi mắt Tử Thần phát sáng rực rỡ
            ctx.fillStyle = "#090B10";
            ctx.beginPath(); ctx.moveTo(cxb - 6.5, y + 8); ctx.lineTo(cxb - 1, y + 10); ctx.lineTo(cxb - 6, y + 12.5); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cxb + 6.5, y + 8); ctx.lineTo(cxb + 1, y + 10); ctx.lineTo(cxb + 6, y + 12.5); ctx.closePath(); ctx.fill();
            ctx.save();
            ctx.fillStyle = glowCol; ctx.shadowColor = glowCol; ctx.shadowBlur = 9;
            ctx.fillRect(cxb - 5.5, y + 9.2, 3.5, 2.2);
            ctx.fillRect(cxb + 2, y + 9.2, 3.5, 2.2);
            ctx.restore();

            // Hai lon toc den dai xoa xuong hai ben ma
            ctx.fillStyle = "#11131A";
            ctx.beginPath(); ctx.moveTo(cxb - 9, y + 4); ctx.lineTo(cxb - 6, y + 6); ctx.lineTo(cxb - 8, y + 22); ctx.lineTo(cxb - 11, y + 19); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cxb + 9, y + 4); ctx.lineTo(cxb + 6.5, y + 6); ctx.lineTo(cxb + 8.5, y + 21); ctx.lineTo(cxb + 11, y + 18); ctx.closePath(); ctx.fill();

            // 9. VŨ KHÍ ĐANG CẦM (Búa Chùy Hạng Nặng / Súng Redemption / Vuốt / Đại Liềm Ghép / Song Liềm Harvester)
            if (b.arm === 'mace'){
                ctx.save();
                ctx.translate(cxb + 14 + Math.sin(ar)*22, y + 22 + Math.cos(ar)*22); ctx.rotate(ar - 0.9);
                ctx.fillStyle = "#3E2723"; ctx.fillRect(-3, -10, 6, 38);
                ctx.fillStyle = "#D4AF37"; ctx.fillRect(-4, -10, 8, 4);
                // Dau bua chien khong lo boc gai va loi nang luong xanh
                ctx.fillStyle = "#37474F";
                ctx.beginPath(); ctx.arc(0, -24, 15, 0, 6.28); ctx.fill();
                ctx.fillStyle = "#90A4AE";
                for (let k = 0; k < 6; k++){
                    let a2 = k * 1.047;
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(a2)*12, -24 + Math.sin(a2)*12);
                    ctx.lineTo(Math.cos(a2)*22, -24 + Math.sin(a2)*22);
                    ctx.lineTo(Math.cos(a2+0.42)*12, -24 + Math.sin(a2+0.42)*12);
                    ctx.closePath(); ctx.fill();
                }
                ctx.fillStyle = glowCol; ctx.beginPath(); ctx.arc(0, -24, 5, 0, 6.28); ctx.fill();
                ctx.restore();
            } else if (b.arm === 'gun'){
                // Súng lục thiên thần REDEMPTION của Strife
                for (let s2 = -1; s2 <= 1; s2 += 2){
                    let aa = (s2 > 0 ? (b.armR||0) : (b.armL||0));
                    ctx.save();
                    ctx.translate(cxb + s2*14 + Math.sin(aa)*20, y + 22 + Math.cos(aa)*20); ctx.rotate(aa - 1.0);
                    ctx.fillStyle = "#263238"; ctx.fillRect(-3.5, -24, 7, 20);
                    ctx.fillStyle = "#ECEFF1"; ctx.fillRect(-2.5, -23, 4, 16);
                    ctx.fillStyle = "#FFD54F"; ctx.fillRect(-1, -24, 2, 14);
                    ctx.fillStyle = "#4E342E"; ctx.fillRect(-4, -5, 8, 9);
                    ctx.restore();
                }
            } else if (b.arm === 'claw'){
                // Vuot Necromancer sắc lẹm phát sáng
                for (let s2 = -1; s2 <= 1; s2 += 2){
                    let aa = (s2 > 0 ? (b.armR||0) : (b.armL||0));
                    ctx.save();
                    ctx.translate(cxb + s2*14 + Math.sin(aa)*20, y + 22 + Math.cos(aa)*20);
                    ctx.rotate(aa + (s2 > 0 ? -0.4 : 0.4));
                    ctx.fillStyle = "#263238"; ctx.fillRect(-6, -4, 12, 12);
                    ctx.shadowColor = glowCol; ctx.shadowBlur = 8;
                    ctx.fillStyle = "#ECEFF1";
                    for (let k = 0; k < 3; k++){
                        ctx.beginPath();
                        ctx.moveTo(-5 + k*5, 6); ctx.lineTo(-3 + k*5, 29); ctx.lineTo(0 + k*5, 6);
                        ctx.closePath(); ctx.fill();
                    }
                    ctx.restore();
                }
            } else if (b.arm === 'dai'){       // HAI LƯỠI HÁI GHÉP THÀNH ĐẠI LIỀM
                ctx.save();
                ctx.translate(cxb + 14 - Math.sin(ar) * 22, y + 22 + Math.cos(ar) * 22); ctx.rotate(ar + Math.PI);
                veLuoiGhep(1.06);
                ctx.restore();
            } else if (b.arm === 'tay'){       // Đã phóng đại liềm đi
            } else {
                // CẶP SONG LIỀM HARVESTER (Twin Scythes): Lưỡi thép cong sắc lẹm + Đầu lâu ở khớp + Viền sáng Necro
                for (let s2 = -1; s2 <= 1; s2 += 2){
                    let aa = (s2 > 0 ? ar : al);
                    ctx.save();
                    ctx.translate(cxb + s2*14 + Math.sin(aa)*21, y + 22 + Math.cos(aa)*21);
                    ctx.rotate(aa + (s2 > 0 ? -0.55 : 0.55));
                    // Can xuong den
                    ctx.fillStyle = "#2D2926"; ctx.fillRect(-2.5, -10, 5, 34);
                    ctx.fillStyle = "#B0BEC5"; ctx.beginPath(); ctx.arc(0, -10, 4.5, 0, 6.28); ctx.fill();
                    // Luoi hai cong vuot sac ben
                    ctx.fillStyle = "#CFD8DC";
                    ctx.beginPath();
                    ctx.moveTo(0, -12);
                    ctx.quadraticCurveTo(28, -22, 34, 8);
                    ctx.quadraticCurveTo(20, -6, 2, -5);
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = glowCol; ctx.lineWidth = 1.8;
                    ctx.beginPath(); ctx.moveTo(2, -13); ctx.quadraticCurveTo(29, -22, 34, 8); ctx.stroke();
                    ctx.restore();
                }
            }
            ctx.restore();
        }
// BOSS_PART_END s0.drawDeathBody.1

// Nguồn: index.html:26712 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.RP_TIM.1 READ_ONLY
let RP_TIM = false, RP_ALPHA = 1;
// BOSS_PART_END s0.RP_TIM.1

// Nguồn: index.html:26713 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.drawReaperDeath.1 READ_ONLY
function drawReaperDeath(b, x, y){
            let dr = b.facingLeft ? -1 : 1, W = 92, H = 108, cxb = x + W/2;
            let t = frames * 0.08, gio = Math.sin(t);
            let mainGlow = RP_TIM ? "#CE93D8" : "#69F0AE";

            ctx.save();
            ctx.translate(cxb, y); ctx.scale(dr, 1); ctx.translate(-cxb, -y);

            // 1. Hào quang linh hồn Tử Thần
            ctx.globalAlpha = 0.16 * RP_ALPHA; ctx.fillStyle = mainGlow;
            ctx.beginPath(); ctx.ellipse(cxb, y + H*0.55, W*0.54, H*0.58, 0, 0, 6.28); ctx.fill();

            // 2. ĐÔI CÁNH KHÓI LINH HỒN ĐEN RÁCH TẢ TƠI (Ethereal Wraith Wings)
            ctx.globalAlpha = 0.68 * RP_ALPHA;
            for (let s = -1; s <= 1; s += 2){
                ctx.fillStyle = RP_TIM ? "#1A0B2E" : "#0A0E17";
                ctx.beginPath();
                ctx.moveTo(cxb - s * 6, y + 24);
                ctx.quadraticCurveTo(cxb - s * (58 + gio * 6), y - 16 - gio * 8, cxb - s * (78 + gio * 8), y + 18);
                ctx.quadraticCurveTo(cxb - s * 54, y + 36, cxb - s * (68 + gio * 5), y + 58);
                ctx.quadraticCurveTo(cxb - s * 38, y + 52, cxb - s * 14, y + 48);
                ctx.closePath(); ctx.fill();

                ctx.strokeStyle = mainGlow; ctx.lineWidth = 1.6;
                ctx.beginPath();
                ctx.moveTo(cxb - s * 8, y + 24);
                ctx.quadraticCurveTo(cxb - s * (54 + gio * 6), y - 12 - gio * 8, cxb - s * (76 + gio * 8), y + 18);
                ctx.stroke();
            }
            ctx.globalAlpha = RP_ALPHA;

            // 3. ÁO CHOÀNG RÁCH PHÍA SAU (Tua vải bay theo gió âm giới)
            ctx.fillStyle = RP_TIM ? "#190C26" : "#0B0E14";
            ctx.beginPath();
            ctx.moveTo(cxb - 22, y + 26);
            ctx.quadraticCurveTo(cxb - 42, y + 70, cxb - 38 - gio * 4, y + H + 4);
            for (let k = 0; k <= 6; k++){
                let px = cxb - 38 + k * 12.5 - gio * 4 * (1 - k / 6), py = y + H + 4 + (k % 2 ? -15 : 7) + Math.sin(t * 1.6 + k) * 4;
                ctx.lineTo(px, py);
            }
            ctx.quadraticCurveTo(cxb + 36, y + 70, cxb + 22, y + 26);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = RP_TIM ? "#190C26" : "#0B0E14"; ctx.lineWidth = 3; ctx.lineCap = "round";
            for (let k = 0; k < 4; k++){
                let bx = cxb - 28 + k * 16;
                ctx.beginPath(); ctx.moveTo(bx, y + H - 4);
                ctx.quadraticCurveTo(bx - 6 - gio * 6, y + H + 12, bx - 12 - gio * 10, y + H + 20 + (k % 2) * 6); ctx.stroke();
            }

            // 4. LỒNG NGỰC XƯƠNG SƯỜN HỞ + LÕI LỬA LINH HỒN
            ctx.fillStyle = "#06070B";
            ctx.beginPath(); ctx.moveTo(cxb - 14, y + 30); ctx.lineTo(cxb + 14, y + 30); ctx.lineTo(cxb + 9, y + 70); ctx.lineTo(cxb - 9, y + 70); ctx.closePath(); ctx.fill();
            // Loi linh hon dap theo nhip tim
            ctx.fillStyle = (RP_TIM ? "rgba(224,64,251," : "rgba(0,230,118,") + "0.42)";
            ctx.beginPath(); ctx.arc(cxb, y + 48, 6 + Math.sin(t * 2.2) * 1.8, 0, 6.28); ctx.fill();
            // Cot song & xuong suon trang nga
            ctx.strokeStyle = "#C8C2B0"; ctx.lineWidth = 2.4;
            ctx.beginPath(); ctx.moveTo(cxb, y + 32); ctx.lineTo(cxb, y + 70); ctx.stroke();
            for (let k = 0; k < 5; k++){
                let yy = y + 36 + k * 6.5, r = 11.5 - k * 1.1;
                ctx.beginPath(); ctx.moveTo(cxb, yy); ctx.quadraticCurveTo(cxb - r, yy + 1, cxb - r + 1, yy + 5); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(cxb, yy); ctx.quadraticCurveTo(cxb + r, yy + 1, cxb + r - 1, yy + 5); ctx.stroke();
            }
            ctx.fillStyle = "#151821";
            ctx.beginPath(); ctx.moveTo(cxb - 23, y + 28); ctx.lineTo(cxb - 12, y + 30); ctx.lineTo(cxb - 9, y + 72); ctx.lineTo(cxb - 25, y + 80); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cxb + 23, y + 28); ctx.lineTo(cxb + 12, y + 30); ctx.lineTo(cxb + 9, y + 72); ctx.lineTo(cxb + 25, y + 80); ctx.closePath(); ctx.fill();

            // 5. ĐẠI LIỀM TỬ THẦN KHỔNG LỒ
            let ngang = (b.quayNgang !== undefined && b.quayNgang !== null);
            let goc = (b.armVe !== undefined ? b.armVe : (b.armR || 0)) - 0.5, px0 = cxb + 24, py0 = y + 56;
            let ca = Math.cos(goc), sa = Math.sin(goc);
            let quay = (lx, ly) => ({ x: px0 + lx * ca - ly * sa, y: py0 + lx * sa + ly * ca });
            let tay1 = quay(0, 0), tay2 = quay(0, -28);
            let luoi = b.luoi || 'thuong', dinh = null;
            if (ngang){
                let th = b.quayNgang, cy0 = y + 62, c = Math.cos(th), s = Math.sin(th);
                tay1 = { x: cxb + c * 12, y: cy0 }; tay2 = { x: cxb - c * 12, y: cy0 + 2 };
                b._ngang = { th: th, cy0: cy0, c: c, s: s };
                if (s < 0) veLuoiNgang(cxb, cy0, c, s);
            }
            veTayXuong(cxb - 14, y + 32, tay2.x, tay2.y, -1);
            if (!b.khongLuoi && !ngang){
                ctx.save();
                ctx.translate(px0, py0); ctx.rotate(goc);
                // Can xuong cot song khong lo
                ctx.fillStyle = "#23201C"; ctx.fillRect(-3.8, -104, 7.6, 166);
                ctx.fillStyle = "#C8C2B0"; for (const yy of [-75, -45, -15, 15, 40]) ctx.fillRect(-4.8, yy, 9.6, 3.5);
                ctx.save();
                ctx.translate(0, -100);
                if (luoi === 'dai') ctx.scale(1.35, 1.35);
                else if (luoi === 'luot'){ ctx.rotate(0.55); ctx.scale(0.9, 1.05); }
                else if (luoi === 'moc') ctx.scale(0.72, 1.28);
                ctx.translate(0, 100);
                if (b.nguoc) ctx.scale(-1, 1);

                let lg = ctx.createLinearGradient(0, -110, 110, -20);
                lg.addColorStop(0, "#546E7A"); lg.addColorStop(0.5, "#ECEFF1"); lg.addColorStop(1, "#90A4AE");
                ctx.fillStyle = lg;
                ctx.beginPath();
                ctx.moveTo(-4, -108);
                ctx.quadraticCurveTo(72, -130, 120, -44);
                ctx.quadraticCurveTo(124, -28, 114, -10);
                if (luoi === 'moc'){ ctx.quadraticCurveTo(104, 4, 90, 2); ctx.quadraticCurveTo(104, -8, 100, -22); }
                ctx.quadraticCurveTo(96, -60, 40, -84);
                ctx.quadraticCurveTo(16, -90, -4, -86);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#263238"; ctx.lineWidth = 1.5; ctx.stroke();
                ctx.strokeStyle = luoi === 'dai' ? (RP_TIM?"rgba(224,64,251,":"rgba(105,240,174,")+"0.95)" : (RP_TIM?"rgba(186,104,200,":"rgba(105,240,174,")+"0.85)";
                ctx.lineWidth = luoi === 'dai' ? 3.8 : 2.2;
                ctx.beginPath(); ctx.moveTo(112, -12); ctx.quadraticCurveTo(95, -58, 40, -82); ctx.stroke();

                if (b.loeT > 0){
                    ctx.save(); ctx.globalCompositeOperation = 'lighter';
                    let k = Math.min(1, b.loeT / 10);
                    ctx.fillStyle = (RP_TIM?"rgba(206,147,216,":"rgba(105,240,174,")+"" + (0.55 * k).toFixed(2) + ")";
                    ctx.beginPath(); ctx.arc(70, -60, 34 + (1 - k) * 18, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = (RP_TIM?"rgba(243,229,245,":"rgba(230,255,235,")+"" + k.toFixed(2) + ")"; ctx.lineWidth = 2;
                    for (let q = 0; q < 4; q++){ let a = q * Math.PI / 4 + frames * 0.2; ctx.beginPath(); ctx.moveTo(70 - Math.cos(a) * 40, -60 - Math.sin(a) * 40); ctx.lineTo(70 + Math.cos(a) * 40, -60 + Math.sin(a) * 40); ctx.stroke(); }
                    ctx.restore();
                }
                ctx.restore();
                // Khop dau lau giua luoi hai khong lo
                ctx.fillStyle = "#C8C2B0"; ctx.beginPath(); ctx.arc(0, -98, 9, 0, 6.28); ctx.fill();
                ctx.fillStyle = mainGlow; ctx.fillRect(-4, -100, 3, 3); ctx.fillRect(2, -100, 3, 3);
                ctx.restore();
                let sc = luoi === 'dai' ? 1.35 : 1, tl = { x: (b.nguoc ? -112 : 112) * sc, y: -100 + 90 * sc };
                let rx = tl.x * ca - tl.y * sa, ry = tl.x * sa + tl.y * ca;
                dinh = { x: cxb + dr * ((px0 - cxb) + rx), y: py0 + ry };
            }
            if (ngang && b.loeT > 0){
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = (RP_TIM?"rgba(206,147,216,":"rgba(105,240,174,")+"" + (0.5 * Math.min(1, b.loeT / 10)).toFixed(2) + ")";
                ctx.beginPath(); ctx.ellipse(cxb, y + 62, 90, 18, 0, 0, 6.28); ctx.fill(); ctx.restore();
            }

            // 6. MŨ TRÙM TỬ THẦN SÂU HUN HÚT + GAI XƯƠNG VAI
            ctx.fillStyle = "#B0A896";
            for (let s2 of [-1, 1]){
                ctx.beginPath(); ctx.moveTo(cxb + s2 * 18, y + 28); ctx.lineTo(cxb + s2 * 36, y + 14); ctx.lineTo(cxb + s2 * 26, y + 36); ctx.closePath(); ctx.fill();
            }
            ctx.fillStyle = RP_TIM ? "#221231" : "#10131B";
            ctx.beginPath();
            ctx.moveTo(cxb - 25, y + 36);
            ctx.quadraticCurveTo(cxb - 27, y + 2, cxb - 2, y - 12);
            ctx.quadraticCurveTo(cxb + 23, y + 2, cxb + 25, y + 34);
            ctx.quadraticCurveTo(cxb, y + 28, cxb - 25, y + 36); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#020203";
            ctx.beginPath(); ctx.ellipse(cxb + 4, y + 18, 11.5, 13.5, 0.1, 0, 6.28); ctx.fill();
            ctx.strokeStyle = "#262B38"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.ellipse(cxb + 4, y + 18, 12.5, 14.5, 0.1, -2.4, 0.9); ctx.stroke();

            if (ngang && b._ngang.s >= 0) veLuoiNgang(cxb, b._ngang.cy0, b._ngang.c, b._ngang.s);
            veTayXuong(cxb + 14, y + 32, tay1.x, tay1.y, 1);
            ctx.restore();
            return dinh;
        }
// BOSS_PART_END s0.drawReaperDeath.1

// Nguồn: index.html:26870 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.veLuoiNgang.1 EDITABLE
function veLuoiNgang(cxb, cy0, c, s){
            ctx.save();
            ctx.strokeStyle = (RP_TIM?"rgba(206,147,216,":"rgba(105,240,174,")+"0.48)"; ctx.lineWidth = 8; ctx.lineCap = "round";
            let th = Math.atan2(s, c);
            ctx.beginPath(); ctx.ellipse(cxb, cy0, 152, 16, 0, th - 1.5, th); ctx.stroke();
            ctx.strokeStyle = (RP_TIM?"rgba(243,229,245,":"rgba(230,255,235,")+"0.65)"; ctx.lineWidth = 2.2;
            ctx.beginPath(); ctx.ellipse(cxb, cy0, 152, 16, 0, th - 0.8, th); ctx.stroke();
            let ex = cxb + c * 80, ey = cy0 + s * 9;
            ctx.strokeStyle = "#23201C"; ctx.lineWidth = 6;
            ctx.beginPath(); ctx.moveTo(cxb - c * 50, cy0 - s * 6); ctx.lineTo(ex, ey); ctx.stroke();
            let tx = cxb + c * 152, ty = cy0 + s * 16;
            ctx.fillStyle = "#ECEFF1"; ctx.strokeStyle = "#2A2D33"; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(ex, ey - 8);
            ctx.quadraticCurveTo(cxb + c * 125, cy0 + s * 12 - 20, tx, ty);
            ctx.quadraticCurveTo(cxb + c * 118, cy0 + s * 12 - 6, ex, ey + 4);
            ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.strokeStyle = (RP_TIM?"rgba(186,104,200,":"rgba(105,240,174,")+"0.95)"; ctx.lineWidth = 2.2;
            ctx.beginPath(); ctx.moveTo(ex, ey + 3); ctx.quadraticCurveTo(cxb + c * 118, cy0 + s * 12 - 6, tx, ty); ctx.stroke();
            ctx.restore();
        }
// BOSS_PART_END s0.veLuoiNgang.1

// Nguồn: index.html:26891 · Dùng bởi: DeathBoss
// BOSS_PART_BEGIN s0.veTayXuong.1 EDITABLE
function veTayXuong(vx, vy, hx, hy, s){
            let mx = (vx + hx) / 2 + s * 4, my = Math.max(vy, hy) + 10;
            ctx.strokeStyle = "#171A22"; ctx.lineWidth = 9; ctx.lineCap = "round";
            ctx.beginPath(); ctx.moveTo(vx, vy); ctx.lineTo((vx + mx) / 2, (vy + my) / 2); ctx.stroke();
            ctx.strokeStyle = "#C8C2B0"; ctx.lineWidth = 3.4;
            ctx.beginPath(); ctx.moveTo(vx, vy + 4); ctx.lineTo(mx, my); ctx.lineTo(hx, hy); ctx.stroke();
            ctx.fillStyle = "#E0D8C8"; ctx.beginPath(); ctx.arc(mx, my, 2.8, 0, 6.28); ctx.fill();
            ctx.strokeStyle = "#E0D8C8"; ctx.lineWidth = 1.7;
            for (let k = 0; k < 4; k++){ let a = -0.9 + k * 0.6; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + Math.cos(a) * 6.5, hy + Math.sin(a) * 6.5); ctx.stroke(); }
        }
// BOSS_PART_END s0.veTayXuong.1

// Nguồn: index.html:98807 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:98818 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
