// BOSS_FILE: UnityCloneBoss
// BOSS_SNAPSHOT: c46ab032a6cbf762cde49e8ab251e6d69cdda9d15fe744f89765bcb84b9046a7
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dashVx, dino, dojoMode, floatingTexts, frames, parry, parryX, pickFromBag, platforms, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:4807 · Dùng bởi: UnityCloneBoss
// BOSS_PART_BEGIN s0.UnityCloneBoss.1 EDITABLE
class UnityCloneBoss {
            constructor(level){
                this.name = "UNITY CLONE"; this.hp = 105; this.maxHp = 105;
                this.w = 36 * UC_S; this.h = 44 * UC_S; this.baseY = 320 - this.h;
                this.x = canvas.width - 180; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.actionTimer = 46; this.facingLeft = true;
                this.retState = 'idle'; this.lastSkill = ''; this.atkBag = []; this.invulnAll = false;
                this.burnTimer = 0; this.lastMeleeHit = -1;
                this.ai = 3; this.cycle = []; this.switchT = UC_SWITCH; this.hpAtSwitch = this.hp;
                this.guard = 0; this.guardCd = 0; this.guardHits = 0;
                this.dashV = 0; this.dashCd = 0; this.chargeT = 0; this.jumpCd = 0;
                this.burst = 0; this.burstCd = 0; this.slash = null; this.combo = 0; this.morph = 0;
                this.walk = 0; this.strafe = 1; this.strafeT = 0; this.trail = [];
                this.flame = []; this.brand = null; this._wall = null; this._breathL = 0; this._rwGap = -1;
                this._breathTilt = 0; this._wallT0 = 0; this._lastHole = -1; this._bag = null; this.tel = null;
                this.post = null; this.moveT = 0; this.armR = 0; this.drawn = false;
                this.ultUsed = false; this.ultAura = 0; this.ultBeam = null; this.ultZone = null;
                this.ultShots = 0; this.ultShotCd = 0; this._ultTel = null; this._leapTo = 0;
                this.burstA = 0; this.burstSw = 0;
            }
            A(){ return UC_AMMO[this.ai]; }
            nextAmmo(){
                if (!this.cycle.length){
                    this.cycle = [0,1,2,3];
                    for (let i = 3; i > 0; i--){ let j = Math.floor(Math.random()*(i+1)); let t=this.cycle[i]; this.cycle[i]=this.cycle[j]; this.cycle[j]=t; }
                    if (this.cycle[0] === this.ai){ let t=this.cycle[0]; this.cycle[0]=this.cycle[1]; this.cycle[1]=t; }
                }
                return this.cycle.shift();
            }
            physics(){
                this.dy += UC_GRAV; this.y += this.dy; this.x += this.dashV; this.dashV *= 0.88;
                if (Math.abs(this.dashV) < 0.4) this.dashV = 0;
                let land = 320, wasAir = !this.grounded;
                for (let pf of platforms){
                    if (pf.top >= 320) continue;
                    if (this.x + this.w > pf.x + 6 && this.x < pf.x + pf.w - 6 && this.dy >= 0 &&
                        (this.y + this.h) <= pf.top + 16 && (this.y + this.h) >= pf.top - 20) land = Math.min(land, pf.top);
                }
                if (this.y + this.h >= land){
                    this.y = land - this.h; this.dy = 0;
                    if (wasAir) for (let k = 0; k < 4; k++) this.trail.push({ x: this.cx()+(Math.random()-0.5)*22, y: this.y+this.h, vx:(Math.random()-0.5)*2, vy:-1, t: 12 });
                    this.grounded = true;
                } else this.grounded = false;
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x));
                if (this.jumpCd > 0) this.jumpCd--;
                for (let i = this.trail.length-1; i>=0; i--){ let t=this.trail[i]; t.x+=t.vx; t.y+=t.vy; t.t--; if (t.t<=0) this.trail.splice(i,1); }
                for (let i = this.flame.length-1; i>=0; i--){ let f=this.flame[i]; f.x+=f.vx; f.y+=f.vy; f.vy-=0.06; f.t--; if (f.t<=0) this.flame.splice(i,1); }
            }
            // AURA LUA (chieu cuoi Inferno): ra don don hon, di nhanh hon -> ep sat nguoi choi
            rage(){ return this.ultAura > 0 ? 0.58 : 1; }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = Math.max(4, Math.round(t * this.rage() * UC_TEMPO)); }
            gunX(){ return this.dir() < 0 ? this.x - 4 : this.x + this.w + 4; }
            gunY(){ return this.y + 22; }
            shoot(vx, vy, w, h, col, dmg){
                let bp = new BossProjectile(this.gunX(), this.gunY(), vx, vy, false, dmg || 1);
                bp.w = w; bp.h = h; bp.color = col; bossProjectiles.push(bp);
                return bp;
            }
            tryJump(){
                if (!this.grounded || this.jumpCd > 0) return false;
                this.dy = UC_JUMP; this.jumpCd = 34; this.grounded = false; return true;
            }
            tickGuard(){
                if (this.guardCd > 0) this.guardCd--;
                if (this.guard <= 0) return;
                this.guard--;
                let d = this.dir();
                let r = { x: d < 0 ? this.x - 46 : this.x + this.w - 4, y: this.y - 14, w: 50, h: this.h + 26 };
                for (let i = projectiles.length - 1; i >= 0; i--){
                    let pr = projectiles[i];
                    if (!pr || pr.owner !== 1) continue;
                    if (!checkAABB(pr, r)) continue;
                    if (typeof dashVx !== 'undefined' && Math.abs(dashVx) > 1) continue;
                    visualEffects.push(new Effect(pr.x, pr.y, 'parry', d < 0));
                    projectiles.splice(i, 1); this.guardHits++;
                }
            }
            // ===== CHIEN THUAT VI TRI: chon mot "CHOT" tren san/be roi DI TOI, khong bam tung buoc =====
            postSpots(){
                // Truoc day MOI BE chi cho DUNG MOT chot (diem giua), va mat dat chi co 3 chot.
                // Ket qua: Unity khong bao gio dung duoc cho ngay tren dau nguoi choi, va vi hai
                // chot dat o hai ben nen no cu nhay qua nhay lai o hai muc thap.
                // Gio RAI NHIEU DIEM doc moi be va doc mat dat -> chon duoc cho that su hop ly.
                let out = [];
                for (let pf of platforms){
                    if (pf.top >= 320) continue;
                    let n = Math.max(1, Math.round(pf.w / 80));
                    for (let k = 0; k <= n; k++) out.push({ x: pf.x + 12 + (pf.w - 24) * k / n, y: pf.top });
                }
                for (let k = 0; k <= 7; k++) out.push({ x: 80 + (canvas.width - 160) * k / 7, y: 320 });
                return out;
            }
            pickPost(){
                let px = dino.x + dino.w/2, want = this.A().range, best = null, bs = -1e9;
                for (let s of this.postSpots()){
                    let sc = -Math.abs(Math.abs(s.x - px) - want) * 0.9;      // giu dung tam cua dang dan
                    if (s.y < 320) sc += (this.A().id === 5 ? -30 : 55);      // sung thich be cao, kiem thich mat dat
                    if (s.y < 320 && Math.abs(s.x - px) < 150) sc += 35;      // be NGAY TREN DAU nguoi choi thi cang thich
                    if (Math.abs(s.x - this.cx()) < 90) sc -= 90;             // KHONG dung lai cho cu
                    if (Math.sign(s.x - px) !== Math.sign(this.cx() - px)) sc += 30;   // thich doi ben
                    sc += Math.random() * 55;
                    if (sc > bs){ bs = sc; best = s; }
                }
                return best;
            }
            // di toi chot: chay ngang, tu nhay len khi be nam phia tren
            gotoPost(){
                let p = this.post; if (!p) return true;
                let dx = p.x - this.cx();
                let sp = UC_RUN * (this.A().id === 5 ? 2.0 : 1.65) * (this.grounded ? 1 : 0.62) * (this.ultAura > 0 ? 1.4 : 1);
                if (Math.abs(dx) > 8){ this.x += Math.sign(dx) * sp; this.walk += sp; }
                // nhay som hon (190 thay vi 130) va nhay CA khi dang dung duoi be can toi
                if (p.y < 320 && this.grounded && this.jumpCd <= 0 && Math.abs(dx) < 190) this.tryJump();
                if (p.y < 320 && !this.grounded && Math.abs(dx) > 20) this.x += Math.sign(dx) * 1.8;   // lai trong khong de bat be
                if (p.y >= 320 && !this.grounded && this.y + this.h < 300 && Math.abs(dx) < 40){ /* roi xuong tu nhien */ }
                let arrived = Math.abs(dx) < 26 && this.grounded && Math.abs((this.y + this.h) - p.y) < 26;
                return arrived;
            }
            // giu the: khong dung im, dao qua dao lai quanh chot
            holdPost(){
                this.strafeT--;
                if (this.strafeT <= 0){ this.strafe = -this.strafe; this.strafeT = 34 + Math.floor(Math.random()*40); }
                // RIPPER la dang CAN CHIEN: giu the bang cach bam sat nguoi choi, khong bam chot
                if (this.A().id === 5 || this.ultAura > 0){
                    let g = this.gap(), lim = this.ultAura > 0 ? 96 : 74;
                    if (Math.abs(g) > lim){ let sp2 = UC_RUN * (this.ultAura > 0 ? 1.15 : 0.95); this.x += Math.sign(g) * sp2; this.walk += sp2; return; }
                }
                let p = this.post;
                let lim = p ? 62 : 40, off = p ? (this.cx() - p.x) : 0;
                if (Math.abs(off) > lim) this.strafe = -Math.sign(off);
                let sp = UC_RUN * 0.62;
                this.x += this.strafe * sp; this.walk += sp;
            }
            update(){
                if (this.state === 'entering'){ this.physics(); this.x -= 5; if (this.x < canvas.width - 200) this.toIdle(24); return; }
                this.tickGuard();
                if (this.dashCd > 0) this.dashCd--;
                if (this.slash){
                    if (this.slash.pre > 0) this.slash.pre--;
                    else { this.slash.t--; if (this.slash.t <= 0) this.slash = null; }
                }
                if (this.tel){ this.tel.t--; if (this.tel.t <= 0) this.tel = null; }
                if (this.brand){ this.brand.t--; if (this.brand.t <= 0) this.brand = null; }
                this.switchT--;
                if (this.state !== 'morphing' && (this.switchT <= 0 || this.hpAtSwitch - this.hp >= 22)){
                    this.state = 'morphing'; this.subTimer = 40; this.morph = 40;
                    this.guard = 0; this.burst = 0; this.slash = null; this.chargeT = 0; this._wall = null; this._breathL = 0;
                    return;
                }
                if (this.state === 'morphing'){
                    this.physics(); this.subTimer--; this.morph = this.subTimer;
                    if (this.subTimer <= 0){
                        this.ai = this.nextAmmo(); this.switchT = UC_SWITCH; this.hpAtSwitch = this.hp; this.atkBag = []; this._bag = null;
                        this.ultUsed = false; this.post = this.pickPost();   // dang moi = mot luot chieu cuoi moi
                        floatingTexts.push(new FloatingText(this.x - 26, this.y - 34, "ĐỔI ĐẠN: " + this.A().name));
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 46));
                        if (SFX.bossSkill) SFX.bossSkill();
                        this.toIdle(18);
                    }
                    return;
                }
                this.physics();
                this.tickAura(); this.tickBeam(); this.tickZone();
                if (this.burst > 0){
                    this.burstCd--;
                    if (this.burstCd <= 0){
                        this.burstCd = 7; this.burst--;
                        // KHOA huong tu dau loat roi QUET deu -> doc duoc, ne duoc
                        this.burstA = (this.burstA || 0) + (this.burstSw || 0);
                        let a = this.burstA + (Math.random() - 0.5) * 0.05;
                        this.shoot(Math.cos(a)*12.5, Math.sin(a)*12.5, 18, 8, "#B2FF59", 1);
                        if (SFX.tone) SFX.tone(760, 0.03, 'square', 0.06, 520);
                    }
                }
                if (this.slash && !this.slash.pre){
                    let a = this.slash, r = this.slashRect();
                    if (!a.hit && checkAABB(dino, r)){ a.hit = true; this.hurtP(1); }
                }
                // ---- CHIEU CUOI: duoi 25% mau, moi dang dung duoc 1 lan ----
                if (this.state === 'idle' && !this.ultUsed && this.hp <= this.maxHp * UC_ULT_HP){ this.startUlt(); return; }
                if (this.state === 'idle'){
                    this.faceP();
                    let ad = Math.abs(this.gap()), rip = this.A().id === 5;
                    // RIPPER: cach xa thi LAO VAO, day la dang can chien
                    if (rip && ad > 190 && this.dashCd <= 0 && this.grounded){
                        let sg = Math.sign(this.gap());
                        this.dashV = sg * 21; this.dashCd = 52;
                        for (let k = 0; k < 5; k++) this.trail.push({ x: this.cx(), y: this.cy()+(Math.random()-0.5)*24, vx:-sg*2, vy:0, t: 14 });
                        this.state = 'dashing'; this.subTimer = 15; return;
                    }
                    this.holdPost();
                    this.actionTimer--;
                    if (this.actionTimer <= 0) this.pickSkill();
                    return;
                }
                // ---- DOI CHOT: chay toi chot moi roi moi danh tiep ----
                if (this.state === 'move'){
                    this.faceP(); this.moveT--;
                    if (this.gotoPost() || this.moveT <= 0){ this.post = this.post || this.pickPost(); this.toIdle(6); }
                    return;
                }
                if (this.state === 'dashing'){ this.subTimer--; if (this.subTimer <= 0) this.toIdle(6); return; }
                if (this.state.charAt(0) === 'u' && this.state.charAt(1) === '_'){ this.runUlt(); return; }
                this.runSkill();
            }
            // BAO TRUOC nhat chem: ve san cung se quet, dem nguoc t/max
            warn(reach, up, t){ this.tel = { dir: this.dir(), reach: reach, up: up, t: t, max: t }; }
            slashRect(){
                let a = this.slash; if (!a) return { x:0,y:0,w:0,h:0 };
                return a.dir < 0 ? { x: this.x - a.reach, y: this.y - a.up, w: a.reach, h: this.h + a.up + 14 }
                                 : { x: this.x + this.w, y: this.y - a.up, w: a.reach, h: this.h + a.up + 14 };
            }
            pickSkill(){
                let id = this.A().id, ad = Math.abs(this.gap()), near = ad < 165, c;
                // sau moi don co the DOI CHOT -> hai ben lien tuc phai gianh vi tri
                if (Math.random() < (this.A().id === 5 ? 0.10 : 0.21)){
                    this.post = this.pickPost(); this.state = 'move'; this.moveT = 62; this.subTimer = 0; return;
                }
                if (id === 0)      c = pickFromBag(this, near ? ['p_charge','guard','p_tap'] : ['p_tap','p_fission','p_charge','guard']);
                else if (id === 1) c = pickFromBag(this, near ? ['f_breath','f_wall','f_ball'] : ['f_ball','f_brand','f_wall']);
                else if (id === 2) c = pickFromBag(this, near ? ['r_burst','r_hop','guard']   : ['r_wall','r_hop','r_burst']);
                else               c = pickFromBag(this, near ? ['k_combo','k_cres','k_rise'] : ['k_dash','k_cres','k_combo']);
                if (c === 'guard' && this.guardCd > 0) c = (id === 0 ? 'p_tap' : 'r_wall');
                this.state = c; this.subTimer = 0; this.combo = 0;
                if (c === 'guard'){ this.guard = UC_GUARD_T; this.guardCd = UC_GUARD_CD; this.guardHits = 0; }
                this.faceP();
            }
            puff(x, y, n, spread, col){
                for (let k = 0; k < n; k++)
                    this.flame.push({ x: x, y: y, vx: (Math.random()-0.5)*spread, vy: (Math.random()-0.5)*spread*0.6,
                                      r: 5 + Math.random()*9, t: 14 + Math.floor(Math.random()*12), c: col });
            }
            // ============================ CHIEU CUOI THEO TUNG DANG ============================
            // Mo khoa khi con duoi 25% mau. Moi lan doi dan duoc dung MOT lan.
            ultName(){ return ['LAZER QUÉT 270°','HỎA VŨ — AURA LỬA','NGŨ LIÊN XẠ','ĐOẠN VỰC TRẢM'][this.ai]; }
            startUlt(){
                this.ultUsed = true;
                this.state = ['u_pulse','u_inf','u_rapid','u_ripper'][this.ai];
                this.subTimer = 0; this.guard = 0; this.burst = 0; this.slash = null; this.tel = null;
                floatingTexts.push(new FloatingText(this.cx() - 90, this.y - 46, "◆ " + this.ultName() + " ◆"));
                shakeTimer = Math.max(shakeTimer, 26);
                if (SFX.bossEntry) SFX.bossEntry();
            }
            // ---- AURA LUA: ep sat, cham la chay ----
            tickAura(){
                if (this.ultAura <= 0) return;
                this.ultAura--;
                if (frames % 3 === 0)
                    this.puff(this.cx() + (Math.random()-0.5)*UC_AURA_R*1.5, this.cy() + (Math.random()-0.5)*UC_AURA_R*1.2,
                              1, 3, Math.random() < 0.5 ? "#FFC107" : "#FF5722");
                let dx = (dino.x + dino.w/2) - this.cx(), dy = (dino.y + dino.h/2) - this.cy();
                if (Math.sqrt(dx*dx + dy*dy) < UC_AURA_R && frames % 22 === 0) this.hurtP(1);
            }
            // ---- LAZER QUET: tia tu chan boss, quet 270 do ----
            tickBeam(){
                let b = this.ultBeam; if (!b) return;
                if (b.t > 0){ b.t--; return; }
                b.a += b.sw;
                if (Math.abs(b.a - b.a0) >= UC_BEAM_ARC){ this.ultBeam = null; return; }
                if (b.hit > 0){ b.hit--; return; }
                let ox = this.cx(), oy = this.y + this.h - 4;
                let px = dino.x + dino.w/2, py = dino.y + dino.h/2;
                let vx = Math.cos(b.a), vy = Math.sin(b.a);
                let t = (px - ox) * vx + (py - oy) * vy;
                if (t < 0) return;
                let qx = ox + vx * t, qy = oy + vy * t;
                if (Math.sqrt((px-qx)*(px-qx) + (py-qy)*(py-qy)) < 28){ this.hurtP(2); b.hit = 40; }
            }
            // ---- VUNG CHEM 1/2 MAP ----
            tickZone(){
                let z = this.ultZone; if (!z) return;
                z.t--;
                if (z.t === 0){
                    visualEffects.push(new Effect(z.x + z.w/2, 210, 'explosion', true, 120));
                    for (let k = 0; k < 10; k++)
                        visualEffects.push(new Effect(z.x + Math.random()*z.w, 110 + Math.random()*210, 'explosion', true, 26));
                    if (checkAABB(dino, { x: z.x, y: 60, w: z.w, h: 270 })) this.hurtP(3);
                    shakeTimer = 52; if (SFX.bossExplode) SFX.bossExplode();
                }
                if (z.t < -22) this.ultZone = null;
            }
            runUlt(){
                let st = this.state; this.subTimer++;
                // ===== PULSE: tu lua 2 giay roi QUET 270 DO tu duoi dat len =====
                if (st === 'u_pulse'){
                    this.chargeT = Math.min(this.subTimer, 120);
                    if (this.subTimer < 120){
                        this.faceP();
                        if (frames % 3 === 0) this.trail.push({ x: this.cx()+(Math.random()-0.5)*70, y: this.y+this.h, vx:0, vy:-2.2, t: 16 });
                        return;
                    }
                    if (this.subTimer === 120){
                        // bat dau tu phia NGUOI CHOI roi quet vong qua ben kia
                        let side = (dino.x + dino.w/2) < this.cx() ? -1 : 1;
                        let a0 = side > 0 ? 0.55 : Math.PI - 0.55;           // cham dat phia nguoi choi
                        this.ultBeam = { a: a0, a0: a0, sw: -side * (UC_BEAM_ARC / UC_BEAM_T), t: 0, hit: 0 };
                        shakeTimer = 40; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (!this.ultBeam && this.subTimer > 126){ this.chargeT = 0; this.toIdle(52); }
                    if (this.subTimer > 300){ this.ultBeam = null; this.chargeT = 0; this.toIdle(52); }
                    return;
                }
                // ===== INFERNO: khoac AURA LUA roi danh don hon =====
                if (st === 'u_inf'){
                    if (this.subTimer === 26){
                        this.ultAura = UC_AURA_T;
                        this.puff(this.cx(), this.cy(), 34, 11, "#FF5722");
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 88));
                        shakeTimer = 30;
                    }
                    if (this.subTimer > 46) this.toIdle(14);      // vao the tan cong ngay
                    return;
                }
                // ===== RAPIDFIRE: 5 phat, moi phat cach 1,25 giay, nham cho nguoi choi DANG dung =====
                if (st === 'u_rapid'){
                    if (this.subTimer === 1){ this.ultShots = 5; this.ultShotCd = 40; }
                    this.ultShotCd--;
                    if (this.ultShotCd === 26){                    // 0,43 giay bao truoc
                        this.faceP();
                        this._ultTel = { x: dino.x + dino.w/2, y: dino.y + dino.h/2, t: 26, max: 26 };
                    }
                    if (this._ultTel) this._ultTel.t--;
                    if (this.ultShotCd <= 0 && this.ultShots > 0){
                        this.ultShots--; this.ultShotCd = UC_R5_GAP;
                        let tg = this._ultTel || { x: dino.x + dino.w/2, y: dino.y + dino.h/2 };
                        let a = Math.atan2(tg.y - this.gunY(), tg.x - this.gunX());
                        // 5 VIEN DAN GOC cua Rapidfire, khoa huong tu luc ban, khong doi huong nua
                        for (let q = 0; q < 5; q++){
                            let aa = a + (q - 2) * 0.055;
                            let bp = new BossProjectile(this.gunX(), this.gunY(), Math.cos(aa)*15, Math.sin(aa)*15, false, 1);
                            bp.w = 18; bp.h = 8; bp.color = "#B2FF59"; bp.frail = true;
                            bossProjectiles.push(bp);
                        }
                        this._ultTel = null;
                        shakeTimer = Math.max(shakeTimer, 14);
                        if (SFX.bossSkill) SFX.bossSkill();
                        // giua cac phat thi DOI CHO
                        this.post = this.pickPost();
                    }
                    if (this.ultShots > 0 && this.ultShotCd > 30) this.gotoPost();
                    if (this.ultShots <= 0 && this.ultShotCd < 20){ this._ultTel = null; this.toIdle(40); }
                    return;
                }
                // ===== RIPPER: khoanh nua ban do (trai / giua / phai) roi CHEM, 3 dmg =====
                if (st === 'u_ripper'){
                    if (this.subTimer === 16){
                        let W = canvas.width * (12/23), px = dino.x + dino.w/2;
                        // chon o CHUA nguoi choi -> ep phai chay sang mien khac
                        let opts = [0, (canvas.width - W)/2, canvas.width - W];
                        let pick = opts[0], bestD = 1e9;
                        for (let o of opts){ let d = Math.abs((o + W/2) - px); if (d < bestD){ bestD = d; pick = o; } }
                        this.ultZone = { x: pick, w: W, t: UC_ZONE_T, max: UC_ZONE_T };
                        this.drawn = true; this.armR = -1.6;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (!this.ultZone && this.subTimer > 30) this.toIdle(54);
                    if (this.subTimer > 200){ this.ultZone = null; this.toIdle(54); }
                    return;
                }
                this.toIdle(40);
            }
            runSkill(){
                let d = this.dir(), st = this.state; this.subTimer++;
                if (st === 'p_tap'){
                    if (this.subTimer === 8) this.faceP();
                    if (this.subTimer % 18 === 0){ let bp = this.shoot(12 * this.dir(), 0, 16, 8, "#4DD0E1", 1); bp.frail = true; if (SFX.tone) SFX.tone(640, 0.05, 'square', 0.08, 380); }
                    if (this.subTimer > 56) this.toIdle(26);
                    return;
                }
                if (st === 'p_charge'){
                    this.chargeT = this.subTimer;
                    if (this.subTimer === 52){
                        let bp = this.shoot(14 * d, 0, 34, 20, "#00E5FF", 1); bp.isPiercing = true;
                        shakeTimer = Math.max(shakeTimer, 12); if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 70){ this.chargeT = 0; this.toIdle(30); }
                    return;
                }
                if (st === 'p_fission'){
                    this.chargeT = this.subTimer;
                    if (this.subTimer === 70){ this.shoot(11 * d, 0, 30, 30, "#00E5FF", 1); shakeTimer = Math.max(shakeTimer, 16); }
                    if (this.subTimer === 96){
                        let ex = Math.max(70, Math.min(canvas.width - 70, this.cx() + d * 290));
                        for (let k = 0; k < 8; k++){
                            let a = (k / 8) * Math.PI * 2;
                            let bp = new BossProjectile(ex, 240, Math.cos(a)*5.6, Math.sin(a)*5.6, false, 1);
                            bp.w = 14; bp.h = 14; bp.color = "#B2EBF2"; bossProjectiles.push(bp);
                        }
                        visualEffects.push(new Effect(ex, 240, 'explosion', true, 54));
                    }
                    if (this.subTimer > 112){ this.chargeT = 0; this.toIdle(40); }
                    return;
                }
                if (st === 'f_breath'){
                    if (this.subTimer < 22) this.faceP();
                    if (this.subTimer > 22 && this.subTimer < 112){
                        this.x += this.dir() * 2.3;
                        let grow = Math.min(1, (this.subTimer - 22) / 24), L = 110 + 210 * grow;
                        this._breathL = L;
                        // QUET LEN XUONG: dung yen mot cho khong con thoat duoc
                        this._breathTilt = Math.sin((this.subTimer - 22) * 0.075) * 46 * grow;
                        let ox = d < 0 ? this.x - 6 : this.x + this.w + 6;
                        let far = Math.random();
                        this.puff(ox + d * far * L, this.gunY() + this._breathTilt * far + (Math.random()-0.5) * (20 + 46*grow),
                                  2, 3, Math.random() < 0.4 ? "#FFEB3B" : "#FF6D00");
                        let ty = this.gunY() + this._breathTilt;
                        let r = { x: d < 0 ? this.x - L : this.x + this.w, y: Math.min(this.gunY(), ty) - 16, w: L, h: Math.abs(ty - this.gunY()) + 52 };
                        if (checkAABB(dino, r)){
                            if (!dino.isShielding()){ if (frames % 14 === 0) dino.takeDamage(1); }
                            else if (frames % 14 === 0) visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                        }
                    }
                    if (this.subTimer > 126){ this._breathL = 0; this._breathTilt = 0; this.toIdle(42); }
                    return;
                }
                if (st === 'f_ball'){
                    if (this.subTimer === 12) this.faceP();
                    // 3 qua rai theo 3 LAN co dinh (cao / giua / thap) — chay toi lan trong la thoat
                    if (this.subTimer === 26 || this.subTimer === 46 || this.subTimer === 66){
                        let k = (this.subTimer - 26) / 20, dd = this.dir();
                        let bp = new BossProjectile(this.gunX(), this.gunY() + [-26, 0, 22][k], 10 * dd, [-2.2, 0, 2.2][k], false, 1);
                        bp.w = 30; bp.h = 30; bp.color = "#FF6D00"; bp.comet = true; bp.frail = true;
                        bossProjectiles.push(bp);
                        this.puff(this.gunX(), this.gunY(), 6, 4, "#FF6D00");
                        if (SFX.tone) SFX.tone(240, 0.10, 'sawtooth', 0.12, 120);
                    }
                    if (this.subTimer > 84) this.toIdle(28);
                    return;
                }
                if (st === 'f_brand'){
                    this.chargeT = this.subTimer;
                    if (this.subTimer === 44){
                        let ex = Math.max(70, Math.min(canvas.width - 70, dino.x + dino.w/2));
                        this.brand = { x: ex, t: 66, max: 66 };
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer === 106){
                        let ex = this.brand ? this.brand.x : this.cx();
                        visualEffects.push(new Effect(ex, 286, 'explosion', true, 92));
                        this.puff(ex, 300, 26, 9, "#FF3D00");
                        for (let k = 0; k < 14; k++) this.flame.push({ x: ex + (Math.random()-0.5)*150, y: 316, vx:(Math.random()-0.5)*3, vy:-3-Math.random()*3, r: 8+Math.random()*10, t: 24, c:"#FFC107" });
                        if (checkAABB(dino, { x: ex - 92, y: 200, w: 184, h: 130 })) this.hurtP(1);
                        this.brand = null; shakeTimer = 30;
                    }
                    if (this.subTimer > 122){ this.chargeT = 0; this.toIdle(34); }
                    return;
                }
                if (st === 'f_wall'){
                    if (this.subTimer === 26 || this.subTimer === 92){
                        this._wall = []; let hole = 1 + Math.floor(Math.random()*3);
                        if (this.subTimer === 92 && this._lastHole !== undefined){ while (hole === this._lastHole) hole = 1 + Math.floor(Math.random()*3); }
                        this._lastHole = hole; this._wallT0 = this.subTimer;
                        for (let k = 0; k < 5; k++){ if (k === hole) continue; this._wall.push(90 + k * 200); }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this._wall && frames % 3 === 0)
                        for (let wx of this._wall) this.puff(wx + (Math.random()-0.5)*40, 316, 1, 2, "#FF9800");
                    if (this._wall && this.subTimer === this._wallT0 + 40){
                        for (let wx of this._wall){
                            this.puff(wx, 300, 12, 6, "#FF5722");
                            if (checkAABB(dino, { x: wx - 34, y: 178, w: 68, h: 148 })) this.hurtP(1);
                        }
                        shakeTimer = 20;
                    }
                    if (this._wall && this.subTimer >= this._wallT0 + 56) this._wall = null;
                    if (this.subTimer > 152){ this._wall = null; this.toIdle(40); }
                    return;
                }
                if (st === 'r_burst'){
                    if (this.subTimer === 14) this.faceP();
                    if (this.subTimer === 22){
                        this.burst = 7; this.burstCd = 0;
                        this.burstA = Math.atan2((dino.y + dino.h/2) - this.gunY(), (dino.x + dino.w/2) - this.gunX());
                        this.burstA -= (Math.random() < 0.5 ? 1 : -1) * 0.20;      // bat dau lech mot ben
                        this.burstSw = (this.burstA < 0 ? 1 : -1) * 0.045;          // roi quet nguoc lai
                    }
                    if (this.subTimer > 34 && this.burst <= 0) this.toIdle(32);
                    if (this.subTimer > 160) this.toIdle(30);
                    return;
                }
                if (st === 'r_hop'){
                    // NHAY 2 BAC BANG QUA MAP: bac 1 bat len, bac 2 vua nhay vua RAI DAN XUONG,
                    // ha canh o be xa ben kia -> vua doi vi tri vua ep nguoi choi roi cho.
                    if (this.subTimer === 6){
                        this.faceP();
                        let far = null, bd = -1;
                        for (let s of this.postSpots()){
                            let d = Math.abs(s.x - (dino.x + dino.w/2)) + (s.y < 320 ? 60 : 0);
                            if (d > bd){ bd = d; far = s; }
                        }
                        this._leapTo = far ? far.x : (this.cx() < canvas.width/2 ? canvas.width - 120 : 120);
                        this.tryJump();
                        floatingTexts.push(new FloatingText(this.x - 20, this.y - 32, "NHẢY CHUYỂN BỆ!"));
                    }
                    if (this.subTimer > 6 && this.subTimer < 62){
                        let dx = this._leapTo - this.cx();
                        this.x += Math.sign(dx) * Math.min(6.4, Math.abs(dx) * 0.09);
                        this.walk += 3;
                    }
                    if (this.subTimer === 26){                   // BAC 2: bat cao them roi rai dan
                        this.dy = UC_JUMP * 0.92; this.grounded = false;
                        for (let k = -4; k <= 4; k++){
                            if (k === 0) continue;               // KHE AN TOAN ngay duoi chan
                            let a = Math.PI/2 + k * 0.19;
                            let bp = new BossProjectile(this.cx(), this.y + this.h, Math.cos(a)*10.5, Math.sin(a)*10.5, false, 1);
                            bp.w = 16; bp.h = 8; bp.color = "#B2FF59"; bp.frail = true; bossProjectiles.push(bp);
                        }
                        for (let k = 0; k < 6; k++) this.trail.push({ x: this.cx()+(Math.random()-0.5)*30, y: this.y+this.h, vx:0, vy:2, t: 14 });
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 40 && this.grounded) this.toIdle(26);
                    if (this.subTimer > 96) this.toIdle(26);
                    return;
                }
                if (st === 'r_wall'){
                    // DAN CHAN: buc tuong dan 5 tang bay ngang, luon chua DUNG 1 TANG de chui qua
                    if (this.subTimer === 6){ this.faceP(); this._rwGap = Math.floor(Math.random()*5); }
                    if (this.subTimer === 30 || this.subTimer === 62){
                        if (this.subTimer === 62){ let g2 = this._rwGap; while (g2 === this._rwGap) g2 = Math.floor(Math.random()*5); this._rwGap = g2; }
                        let dd = this.dir();
                        for (let k = 0; k < 5; k++){
                            if (k === this._rwGap) continue;
                            let bp = new BossProjectile(this.gunX(), 122 + k * 42, 9.5 * dd, 0, false, 1);
                            bp.w = 20; bp.h = 10; bp.color = "#CCFF90"; bp.frail = true; bossProjectiles.push(bp);
                        }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 96){ this._rwGap = -1; this.toIdle(30); }
                    return;
                }
                if (st === 'k_combo'){
                    let warns = [6, 28, 54], hits = [16, 38, 64];
                    if (this.subTimer < 70 && this.subTimer % 2 === 0){ let g = this.gap(); if (Math.abs(g) > 44) this.x += Math.sign(g) * 2.6; }
                    let wi = warns.indexOf(this.subTimer);
                    if (wi >= 0){ this.faceP(); this.warn(wi === 2 ? 106 : 84, wi === 2 ? 24 : 15, 10); }
                    if (hits.indexOf(this.subTimer) >= 0){
                        this.combo++; let big = this.combo === 3; this.faceP();
                        this.slash = { t: big ? 16 : 11, dir: this.dir(), reach: big ? 106 : 84, up: big ? 24 : 15, hit: false, big: big };
                        this.dashV = this.dir() * (big ? 7 : 4.2);
                        if (SFX.tone) SFX.tone(big ? 320 : 520, 0.07, 'square', 0.12, 200);
                        if (big && SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 82) this.toIdle(26);
                    return;
                }
                if (st === 'k_cres'){
                    if (this.subTimer < 16) this.faceP();
                    if (this.subTimer === 16){ this.faceP(); this.warn(96, 20, 14); }
                    if (this.subTimer === 30){
                        this.slash = { t: 14, dir: this.dir(), reach: 96, up: 20, hit: false, big: true };
                        let bp = this.shoot(13.5 * this.dir(), 0, 26, 66, "#E0F7FA", 1); bp.isPiercing = true; bp.crescent = true;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 56) this.toIdle(28);
                    return;
                }
                if (st === 'k_dash'){
                    if (this.subTimer < 22) this.faceP();
                    if (this.subTimer === 22){
                        let dd = this.dir();
                        this.dashV = dd * 21; this.slash = { t: 22, dir: dd, reach: 100, up: 20, hit: false, big: true };
                        for (let k = 0; k < 7; k++) this.trail.push({ x: this.cx(), y: this.cy()+(Math.random()-0.5)*28, vx:-dd*2.4, vy:0, t: 16 });
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 54) this.toIdle(28);
                    return;
                }
                if (st === 'k_rise'){
                    if (this.subTimer < 10) this.faceP();
                    if (this.subTimer === 10){ this.faceP(); this.warn(88, 58, 14); }
                    if (this.subTimer === 24){ let dd = this.dir(); this.dy = -14; this.grounded = false; this.dashV = dd * 5; this.slash = { t: 18, dir: dd, reach: 88, up: 58, hit: false, big: true }; if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.subTimer === 48){ this.warn(92, 10, 8); }
                    if (this.subTimer === 56){ this.dy = 15; this.slash = { t: 16, dir: this.tel ? this.tel.dir : d, reach: 92, up: 10, hit: false, big: true }; }
                    if (this.subTimer > 60 && this.grounded){
                        for (let k = 0; k < 8; k++) this.trail.push({ x: this.cx()+(Math.random()-0.5)*60, y: this.y+this.h, vx:(Math.random()-0.5)*4, vy:-2, t: 14 });
                        shakeTimer = Math.max(shakeTimer, 14); this.toIdle(24);
                    }
                    if (this.subTimer > 96) this.toIdle(24);
                    return;
                }
                if (st === 'guard'){
                    let g = this.gap();
                    this.x += Math.sign(g) * 2.2; this.walk += 2.2;
                    if (this.guard <= 0){
                        if (this.guardHits >= 3){
                            this.warn(92, 20, 9);
                            this.slash = { t: 14, dir: this.dir(), reach: 92, up: 20, hit: false, big: true, pre: 9 };
                            floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, "PHẢN CÔNG!"));
                        }
                        this.toIdle(22);
                    }
                    return;
                }
                this.toIdle(24);
            }
            draw(){
                let A = this.A(), x = this.x, y = this.y, d = this.dir();
                for (let f of this.flame){
                    ctx.save(); ctx.globalAlpha = Math.max(0, f.t / 26);
                    ctx.fillStyle = f.c; ctx.beginPath(); ctx.arc(f.x, f.y, f.r * (f.t/26 + 0.35), 0, 6.28); ctx.fill();
                    ctx.restore();
                }
                for (let t of this.trail){
                    ctx.save(); ctx.globalAlpha = t.t / 20; ctx.fillStyle = A.col;
                    ctx.fillRect(t.x - 2, t.y - 2, 4, 4); ctx.restore();
                }
                if (this._breathL > 0 && this.state === 'f_breath'){
                    let L = this._breathL;
                    ctx.save(); ctx.globalAlpha = 0.55;
                    let ox = d < 0 ? this.x : this.x + this.w, oy = this.gunY();
                    let gg = ctx.createLinearGradient(ox, 0, ox + d*L, 0);
                    gg.addColorStop(0, "#FFF59D"); gg.addColorStop(0.4, "#FF9800"); gg.addColorStop(1, "rgba(255,61,0,0)");
                    ctx.fillStyle = gg;
                    ctx.beginPath();
                    let tl = this._breathTilt || 0;
                    ctx.moveTo(ox, oy - 10); ctx.lineTo(ox + d*L, oy + tl - this.h*0.62); ctx.lineTo(ox + d*L, oy + tl + this.h*0.72); ctx.lineTo(ox, oy + 12);
                    ctx.closePath(); ctx.fill(); ctx.restore();
                }
                if (this._wall){
                    let e = this.subTimer - (this._wallT0 || 0);
                    for (let wx of this._wall){
                        if (e <= 40){
                            let k = Math.min(1, Math.max(0, e / 40));
                            ctx.fillStyle = "rgba(255,87,34," + (0.16 + 0.30*k).toFixed(2) + ")";
                            ctx.fillRect(wx - 34, 178, 68, 148);
                            ctx.strokeStyle = "#FF9800"; ctx.lineWidth = 2; ctx.strokeRect(wx - 34, 178, 68, 148);
                        } else if (e < 56){
                            let a = 1 - (e - 40) / 16;
                            ctx.fillStyle = "rgba(255,193,7," + a.toFixed(2) + ")"; ctx.fillRect(wx - 30, 178, 60, 148);
                            ctx.fillStyle = "rgba(255,245,157," + a.toFixed(2) + ")"; ctx.fillRect(wx - 12, 178, 24, 148);
                        }
                    }
                }
                if (this.brand){
                    let b = this.brand, k = 1 - b.t / b.max, pul = (frames % 8 < 4);
                    ctx.save();
                    ctx.globalAlpha = 0.30 + 0.35 * k;
                    ctx.fillStyle = pul ? "#FF3D00" : "#FF6D00";
                    ctx.beginPath(); ctx.ellipse(b.x, 318, 92, 16, 0, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 1; ctx.strokeStyle = "#FFEB3B"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.ellipse(b.x, 318, 92 * (1 - k), 16 * (1 - k), 0, 0, 6.28); ctx.stroke();
                    for (let r2 = 0; r2 < 3; r2++){
                        let ay = 318 - ((frames * 3 + r2 * 40) % 110);
                        ctx.globalAlpha = 0.5; ctx.fillStyle = "#FF9800";
                        ctx.beginPath(); ctx.arc(b.x + (r2-1) * 44, ay, 6, 0, 6.28); ctx.fill();
                    }
                    ctx.restore();
                }
                // ---- VUNG CHEM 1/2 BAN DO (chieu cuoi RIPPER) ----
                if (this.ultZone){
                    let z = this.ultZone;
                    ctx.save();
                    if (z.t > 0){
                        let k = 1 - z.t / z.max;
                        ctx.globalAlpha = 0.13 + 0.30 * k;
                        ctx.fillStyle = "#ECEFF1"; ctx.fillRect(z.x, 60, z.w, 270);
                        ctx.globalAlpha = 0.95;
                        ctx.strokeStyle = (frames % 6 < 3) ? "#FFFFFF" : "#B0BEC5"; ctx.lineWidth = 4;
                        ctx.strokeRect(z.x, 60, z.w, 270);
                        ctx.strokeStyle = "rgba(255,255,255," + (0.20 + 0.55*k).toFixed(2) + ")"; ctx.lineWidth = 2;
                        for (let i2 = -2; i2 <= 6; i2++){
                            ctx.beginPath();
                            ctx.moveTo(z.x + i2 * 60 - 120 * k, 60); ctx.lineTo(z.x + i2 * 60 + 120 * k, 330); ctx.stroke();
                        }
                        ctx.fillStyle = "#FFF"; ctx.font = "bold 15px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("ĐOẠN VỰC TRẢM  " + (z.t / 60).toFixed(1) + "″", z.x + z.w/2, 92);
                        ctx.textAlign = "left";
                    } else {
                        let k = Math.max(0, 1 + z.t / 22);
                        ctx.globalAlpha = k;
                        ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 7; ctx.lineCap = "round";
                        for (let i2 = 0; i2 < 7; i2++){
                            ctx.beginPath();
                            ctx.moveTo(z.x - 40 + i2 * (z.w/6), 46); ctx.lineTo(z.x + 40 + i2 * (z.w/6), 344); ctx.stroke();
                        }
                    }
                    ctx.restore();
                }
                // ---- LAZER QUET 270 DO (chieu cuoi PULSE) ----
                if (this.ultBeam){
                    let b2 = this.ultBeam, ox = this.cx(), oy = this.y + this.h - 4;
                    ctx.save();
                    ctx.shadowColor = "#00E5FF"; ctx.shadowBlur = 16;
                    ctx.strokeStyle = "#80DEEA"; ctx.lineWidth = 26; ctx.lineCap = "round";
                    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + Math.cos(b2.a)*1200, oy + Math.sin(b2.a)*1200); ctx.stroke();
                    ctx.shadowBlur = 0;
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 10;
                    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + Math.cos(b2.a)*1200, oy + Math.sin(b2.a)*1200); ctx.stroke();
                    ctx.globalAlpha = 0.28; ctx.strokeStyle = "#00E5FF"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(ox, oy, 150, Math.min(b2.a0, b2.a), Math.max(b2.a0, b2.a)); ctx.stroke();
                    ctx.restore();
                }
                // ---- vach bao NGU LIEN XA (chieu cuoi RAPIDFIRE) ----
                if (this._ultTel){
                    let t2 = this._ultTel, k = 1 - t2.t / t2.max;
                    ctx.save();
                    ctx.globalAlpha = 0.35 + 0.5 * k;
                    ctx.strokeStyle = "#CCFF90"; ctx.lineWidth = 2 + 3 * k; ctx.setLineDash([9, 7]); ctx.lineDashOffset = -frames * 1.4;
                    ctx.beginPath(); ctx.moveTo(this.gunX(), this.gunY()); ctx.lineTo(t2.x, t2.y); ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.globalAlpha = 0.9; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(t2.x, t2.y, 10 + 16 * (1 - k), 0, 6.28); ctx.stroke();
                    ctx.restore();
                }
                // ---- AURA LUA (chieu cuoi INFERNO) ----
                if (this.ultAura > 0){
                    ctx.save();
                    let pl = 0.5 + 0.5 * Math.sin(frames * 0.18);
                    ctx.globalAlpha = 0.16 + 0.12 * pl;
                    ctx.fillStyle = "#FF5722";
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), UC_AURA_R, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 0.85; ctx.strokeStyle = "#FFC107"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), UC_AURA_R, 0, 6.28); ctx.stroke();
                    ctx.globalAlpha = 0.55; ctx.strokeStyle = "#FF3D00"; ctx.lineWidth = 2;
                    for (let k = 0; k < 8; k++){
                        let a2 = frames * 0.05 + k * 0.785, r1 = UC_AURA_R - 12 - 8 * pl;
                        ctx.beginPath();
                        ctx.moveTo(this.cx() + Math.cos(a2)*r1, this.cy() + Math.sin(a2)*r1);
                        ctx.lineTo(this.cx() + Math.cos(a2)*(UC_AURA_R + 6), this.cy() + Math.sin(a2)*(UC_AURA_R + 6));
                        ctx.stroke();
                    }
                    ctx.restore();
                    ctx.fillStyle = "#FFAB40"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("HỎA VŨ " + Math.ceil(this.ultAura / 60) + "″", this.cx(), this.y - 46); ctx.textAlign = "left";
                }
                let legAnim = (!this.grounded) ? 4 : (((this.walk % 26) < 13) ? 4 : 0);
                let pal = { bd: A.dark, hd: A.col, dk: "#0A0A0A", lt: A.col, foot: "#000000",
                            spk: A.col, out: "#000000", rim: A.col, eye: "#FFFFFF", pup: A.dark, aura: null, crest: 3 };
                ctx.save();
                ctx.globalAlpha = this.morph > 0 ? (0.35 + 0.65 * Math.abs(Math.sin(this.morph * 0.4))) : 1;
                ctx.translate(x, y); ctx.scale(UC_S, UC_S); ctx.translate(-x, -y);
                if (typeof dino !== 'undefined' && dino && dino.drawForm) dino.drawForm(false, x, y, legAnim, 1, this.facingLeft, pal);
                else { ctx.fillStyle = A.dark; ctx.fillRect(x, y, 48, 44); }
                ctx.restore();
                if (this.guard > 0){
                    let gx = d < 0 ? this.x - 46 : this.x + this.w - 4;
                    ctx.save();
                    ctx.globalAlpha = 0.26 + 0.2 * Math.abs(Math.sin(frames * 0.2));
                    ctx.fillStyle = A.col; ctx.fillRect(gx, this.y - 14, 50, this.h + 26);
                    ctx.globalAlpha = 0.95; ctx.strokeStyle = A.col; ctx.lineWidth = 3;
                    ctx.strokeRect(gx, this.y - 14, 50, this.h + 26);
                    for (let k = 0; k < 3; k++){
                        ctx.beginPath();
                        ctx.moveTo(gx + 25, this.y - 10 + k * 24); ctx.lineTo(gx + 46, this.y + 2 + k * 24);
                        ctx.lineTo(gx + 25, this.y + 14 + k * 24); ctx.lineTo(gx + 4, this.y + 2 + k * 24);
                        ctx.closePath(); ctx.stroke();
                    }
                    ctx.restore();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("ĐỠ — LƯỚT XUYÊN QUA!", this.cx(), y - 40); ctx.textAlign = "left";
                }
                if (this.tel){
                    let t = this.tel, k = 1 - t.t / t.max;       // 0 -> 1 khi sap chem
                    let cxT = t.dir < 0 ? this.x : this.x + this.w, cyT = this.y + this.h/2;
                    ctx.save();
                    ctx.globalAlpha = 0.30 + 0.45 * k;
                    ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 2.5; ctx.lineCap = "round";
                    ctx.setLineDash([7, 6]); ctx.lineDashOffset = -frames * 0.8;
                    ctx.beginPath();
                    ctx.arc(cxT, cyT, t.reach, t.dir < 0 ? Math.PI - 0.95 : -0.95, t.dir < 0 ? Math.PI + 0.95 : 0.95, false);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    // cung "nap day" tu tren xuong theo dung nhip cham
                    ctx.globalAlpha = 0.85;
                    ctx.strokeStyle = "#FFCDD2"; ctx.lineWidth = 4;
                    let a0 = t.dir < 0 ? Math.PI - 0.95 : -0.95, a1 = t.dir < 0 ? Math.PI + 0.95 : 0.95;
                    ctx.beginPath(); ctx.arc(cxT, cyT, t.reach, a0, a0 + (a1 - a0) * k, false); ctx.stroke();
                    ctx.restore();
                }
                if (this.slash && !this.slash.pre){
                    let r = this.slashRect(), a = this.slash;
                    ctx.save();
                    ctx.globalAlpha = Math.min(1, a.t / 8);
                    ctx.strokeStyle = a.big ? "#FFFFFF" : "#B0BEC5"; ctx.lineWidth = a.big ? 7 : 4; ctx.lineCap = "round";
                    let cxS = a.dir < 0 ? r.x + r.w : r.x, R = a.reach;
                    for (let k = 0; k < 3; k++){
                        ctx.beginPath();
                        ctx.arc(cxS, this.y + this.h/2, Math.max(6, R - k * 14), a.dir < 0 ? Math.PI - 0.95 : -0.95, a.dir < 0 ? Math.PI + 0.95 : 0.95, false);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                if (this.chargeT > 0){
                    let ult = (this.state === 'u_pulse');
                    let k = Math.min(1, this.chargeT / (ult ? 120 : 60));
                    let ox = ult ? this.cx() : this.gunX(), oy = ult ? (this.y + this.h - 4) : this.gunY();
                    ctx.save();
                    ctx.strokeStyle = A.col; ctx.lineWidth = 2 + (ult ? 8 : 4) * k;
                    ctx.beginPath(); ctx.arc(ox, oy, 8 + (ult ? 60 : 22) * k, 0, Math.PI*2); ctx.stroke();
                    if (ult){
                        ctx.globalAlpha = 0.5 + 0.4 * k; ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 2;
                        for (let q = 0; q < 8; q++){
                            let a3 = frames * 0.08 + q * 0.785, r2 = 90 - 70 * k;
                            ctx.beginPath();
                            ctx.moveTo(ox + Math.cos(a3)*r2, oy + Math.sin(a3)*r2 * 0.55);
                            ctx.lineTo(ox + Math.cos(a3)*(r2*0.4), oy + Math.sin(a3)*(r2*0.4) * 0.55);
                            ctx.stroke();
                        }
                        ctx.globalAlpha = 1; ctx.fillStyle = "#00E5FF"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("TỤ LAZER " + Math.round(k * 100) + "%", this.cx(), this.y - 46); ctx.textAlign = "left";
                    }
                    ctx.restore();
                }
                if (this.state === 'k_dash' && this.subTimer < 22){
                    ctx.fillStyle = (frames % 6 < 3) ? "rgba(236,239,241,0.30)" : "rgba(236,239,241,0.10)";
                    ctx.fillRect(d < 0 ? this.x - 320 : this.x + this.w, this.y - 10, 320, this.h + 20);
                }
                ctx.save(); ctx.textAlign = "center";
                ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(this.cx() - 52, y - 34, 104, 15);
                ctx.strokeStyle = A.col; ctx.lineWidth = 2; ctx.strokeRect(this.cx() - 52, y - 34, 104, 15);
                ctx.fillStyle = A.col; ctx.font = "bold 10px Consolas, monospace";
                ctx.fillText(A.name, this.cx(), y - 23);
                drawTopBossBar(this, A.col, "UNITY CLONE — " + A.name);
                ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.fillRect(this.cx() - 52, y - 20, 104, 3);
                ctx.fillStyle = A.col; ctx.fillRect(this.cx() - 52, y - 20, 104 * Math.max(0, this.switchT / UC_SWITCH), 3);
                ctx.textAlign = "left"; ctx.restore();
                // ctx.fillStyle = "black"; ctx.fillRect(x, y - 12, this.w, 7);
                // ctx.fillStyle = "#FF5252"; ctx.fillRect(x + 1, y - 11, (this.w - 2) * Math.max(0, this.hp / this.maxHp), 5);
            }
        }
// BOSS_PART_END s0.UnityCloneBoss.1

// Nguồn: index.html:24178 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24189 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24206 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:24245 · Dùng bởi: UnityCloneBoss
// BOSS_PART_BEGIN s0.UC_S.1 EDITABLE
const UC_S = 1.3;
// BOSS_PART_END s0.UC_S.1

// Nguồn: index.html:24246 · Dùng bởi: UnityCloneBoss
// BOSS_PART_BEGIN s0.UC_AMMO.1 EDITABLE
const UC_AMMO = [
            { id: 0, name: 'PULSE',     col: '#00BCD4', dark: '#00666F', range: 300 },
            { id: 1, name: 'INFERNO',   col: '#FF5722', dark: '#7F2100', range: 190 },
            { id: 2, name: 'RAPIDFIRE', col: '#76FF03', dark: '#33691E', range: 260 },
            { id: 5, name: 'DINOSWORD', col: '#ECEFF1', dark: '#546E7A', range: 60  }
        ];
// BOSS_PART_END s0.UC_AMMO.1

// Nguồn: index.html:24252 · Dùng bởi: UnityCloneBoss
// BOSS_PART_BEGIN s0.UC_SWITCH.1 EDITABLE
const UC_SWITCH = 430;
// BOSS_PART_END s0.UC_SWITCH.1

// Nguồn: index.html:24253 · Dùng bởi: UnityCloneBoss
// BOSS_PART_BEGIN s0.UC_GUARD_T.1 EDITABLE
const UC_GUARD_T = 70, UC_GUARD_CD = 150;
// BOSS_PART_END s0.UC_GUARD_T.1

// Nguồn: index.html:24254 · Dùng bởi: UnityCloneBoss
// BOSS_PART_BEGIN s0.UC_RUN.1 EDITABLE
const UC_RUN = 3.4, UC_JUMP = -12.5, UC_GRAV = 0.65;
// BOSS_PART_END s0.UC_RUN.1

// Nguồn: index.html:24256 · Dùng bởi: UnityCloneBoss
// BOSS_PART_BEGIN s0.UC_ULT_HP.1 EDITABLE
const UC_ULT_HP = 0.25;
// BOSS_PART_END s0.UC_ULT_HP.1

// Nguồn: index.html:24257 · Dùng bởi: UnityCloneBoss
// BOSS_PART_BEGIN s0.UC_TEMPO.1 EDITABLE
const UC_TEMPO = 0.68;
// BOSS_PART_END s0.UC_TEMPO.1

// Nguồn: index.html:24258 · Dùng bởi: UnityCloneBoss
// BOSS_PART_BEGIN s0.UC_BEAM_ARC.1 EDITABLE
const UC_BEAM_ARC = 270 * Math.PI / 180, UC_BEAM_T = 168;
// BOSS_PART_END s0.UC_BEAM_ARC.1

// Nguồn: index.html:24259 · Dùng bởi: UnityCloneBoss
// BOSS_PART_BEGIN s0.UC_AURA_R.1 EDITABLE
const UC_AURA_R = 116, UC_AURA_T = 720;
// BOSS_PART_END s0.UC_AURA_R.1

// Nguồn: index.html:24260 · Dùng bởi: UnityCloneBoss
// BOSS_PART_BEGIN s0.UC_R5_GAP.1 EDITABLE
const UC_R5_GAP = 75;
// BOSS_PART_END s0.UC_R5_GAP.1

// Nguồn: index.html:24261 · Dùng bởi: UnityCloneBoss
// BOSS_PART_BEGIN s0.UC_ZONE_T.1 EDITABLE
const UC_ZONE_T = 120;
// BOSS_PART_END s0.UC_ZONE_T.1

// Nguồn: index.html:98512 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:98523 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
