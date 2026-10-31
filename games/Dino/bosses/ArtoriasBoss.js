// BOSS_FILE: ArtoriasBoss
// BOSS_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, aaHeSo, aaUp, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, nhipXa, parry, platforms, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:14680 · Dùng bởi: ArtoriasBoss
// BOSS_PART_BEGIN s0.ArtoriasBoss.1 EDITABLE
class ArtoriasBoss {
            constructor(level){
                this.name = "KNIGHT ARTORIAS"; this.hp = 190; this.maxHp = 190;
                this.w = ART_W; this.h = ART_H; this.baseY = 320 - this.h;
                this.x = canvas.width - 220; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.actionTimer = 44; this.facingLeft = true;
                this.retState = 'idle'; this.lastSkill = ''; this.atkBag = []; this.invulnAll = false;
                this.burnTimer = 0; this.lastMeleeHit = -1; this.phase = 2; this._bag = null;
                this.armR = 0.25; this.swordAngle = -1.05;
                this.crouch = 0; this.lean = 0.14; this.flipAngle = 0;
                this.dashV = 0; this.walk = 0;
                this.slash = null; this.tel = null; this.ghosts = []; this.cd = {};
                this.buffed = false; this.buffTries = 0; this.buffHp = 0; this.buffT = 0;
                this.somer = 0; this.burst = null; this._hb = false; this.stagger = 0;
                this.wisps = [];       // Đạn linh hồn Vực Thẳm bay chậm truy kích (Nightreign Homing Wisps)
                this.sludgePools = []; // Vũng bùn Vực Thẳm ngắn hạn trên mặt đất
                this.howlWaves = [];   // Vòng sóng âm khi Artorias hú vang
            }
            spd(){ return this.buffed ? 1.38 : 1.10; }
            resetPose(){
                this.armR = 0.25;
                this.swordAngle = -1.05;
                this.crouch = 0;
                this.lean = 0.14;
                this.flipAngle = 0;
            }
            toIdle(t){
                this.state = 'idle'; this.subTimer = 0;
                this.actionTimer = Math.max(10, Math.round(t * ART_TEMPO / this.spd()));
                this.resetPose();
            }
            ghost(){
                if (this.ghosts.length >= 6) this.ghosts.shift();
                this.ghosts.push({
                    x: this.x, y: this.y, left: this.facingLeft,
                    armR: this.armR, swordAngle: this.swordAngle,
                    crouch: this.crouch, lean: this.lean, flipAngle: this.flipAngle,
                    buffed: this.buffed, t: 13
                });
            }
            physics(){
                this.dy += 0.7; this.y += this.dy;
                let land = 320;
                for (let pf of platforms){
                    if (pf.top >= 320) continue;
                    if (this.x + this.w > pf.x + 6 && this.x < pf.x + pf.w - 6 && this.dy >= 0 &&
                        (this.y + this.h) <= pf.top + 16 && (this.y + this.h) >= pf.top - 20) land = Math.min(land, pf.top);
                }
                if (this.y + this.h >= land){ this.y = land - this.h; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x += this.dashV; this.dashV *= 0.86;
                if (Math.abs(this.dashV) < 0.4) this.dashV = 0;
                this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
            }
            warn(reach, up, t){ this.tel = { dir: this.dir(), reach: reach, up: up, t: t, max: t }; }
            doSlash(reach, up, life, dmg){
                let _k = aaHeSo(this); reach *= _k; up = aaUp(this, up);
                this.slash = { t: life, dir: this.dir(), reach: reach, up: up, hit: false, dmg: dmg || 1 };
            }
            slashRect(){
                let a = this.slash; if (!a) return { x:0,y:0,w:0,h:0 };
                return a.dir < 0 ? { x: this.x - a.reach, y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 }
                                 : { x: this.x + this.w, y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 };
            }
            canUse(id){ return !((this.cd[id] || 0) > 0); }
            pickFrom(pool, fb){
                pool = pool.filter(id => this.canUse(id));
                if (!pool.length) return fb;
                if (pool.length > 1){ let f = pool.filter(x => x !== this.lastSkill); if (f.length) pool = f; }
                let c = pool[Math.floor(Math.random() * pool.length)];
                this.lastSkill = c; if (ART_CD[c]) this.cd[c] = ART_CD[c];
                return c;
            }
            // Triệu hồi các đốm linh hồn Vực Thẳm bay chậm truy kích (Đặc trưng của Artorias trong Nightreign)
            spawnAbyssWisps(count){
                for (let k = 0; k < count; k++){
                    let ang = -Math.PI * 0.85 + (k / Math.max(1, count - 1)) * Math.PI * 0.7;
                    this.wisps.push({
                        x: this.cx() + Math.cos(ang) * 28,
                        y: this.cy() - 18 + Math.sin(ang) * 22,
                        vx: Math.cos(ang) * 3.5,
                        vy: Math.sin(ang) * 3.5 - 1.5,
                        t: 0, life: 175
                    });
                }
            }
            tickWisps(){
                for (let i = this.wisps.length - 1; i >= 0; i--){
                    let w = this.wisps[i]; w.t++; w.life--;
                    // Sau 18 frame bay tỏa ra, đốm lửa đen từ từ uốn hướng về phía người chơi (tốc độ vừa phải để dễ né hoặc bắn vỡ)
                    if (w.t > 18 && w.t < 120){
                        let tx = dino.x + dino.w/2, ty = dino.y + dino.h/2;
                        let dx = tx - w.x, dy = ty - w.y, d = Math.hypot(dx, dy) || 1;
                        w.vx += (dx / d) * 0.22; w.vy += (dy / d) * 0.22;
                        let sp = Math.hypot(w.vx, w.vy);
                        if (sp > 4.6){ w.vx = (w.vx / sp) * 4.6; w.vy = (w.vy / sp) * 4.6; }
                    }
                    w.x += w.vx; w.y += w.vy;
                    // Người chơi có thể bắn đạn phá vỡ đốm lửa Vực Thẳm
                    let box = { x: w.x - 10, y: w.y - 10, w: 20, h: 20 };
                    let broken = false;
                    if (typeof projectiles !== 'undefined'){
                        for (let pi = projectiles.length - 1; pi >= 0; pi--){
                            let pr = projectiles[pi]; if (!pr || pr.owner !== 1) continue;
                            if (checkAABB(pr, box)){
                                broken = true;
                                visualEffects.push(new Effect(w.x, w.y, 'explosion', true, 12));
                                if (!(pr.type === 2 || (pr.pierceCount||0) > 0)) projectiles.splice(pi, 1);
                                break;
                            }
                        }
                    }
                    if (!broken && checkAABB(dino, box)){
                        broken = true; this.hurtP(1);
                        visualEffects.push(new Effect(w.x, w.y, 'explosion', true, 14));
                    }
                    if (broken || w.life <= 0 || w.y > 325 || w.x < -40 || w.x > canvas.width + 40){
                        this.wisps.splice(i, 1);
                    }
                }
                for (let i = this.howlWaves.length - 1; i >= 0; i--){
                    let hw = this.howlWaves[i]; hw.r += 9; hw.t--;
                    if (hw.t <= 0) this.howlWaves.splice(i, 1);
                }
            }
            tickVong(){
                let v = this.vong; if (!v) return;
                v.r += v.sp;
                let dx = (dino.x + dino.w/2) - v.x, dy = (dino.y + dino.h) - v.y;
                let d = Math.sqrt(dx*dx + dy*dy);
                if (!v.hit && Math.abs(d - v.r) < ART_VONG_DAY/2){ v.hit = true; this.hurtP(1); }
                if (v.r > v.max) this.vong = null;
            }
            tickDau(){
                if (!this.dau || !this.dau.length) return;
                for (let i = this.dau.length - 1; i >= 0; i--){
                    let m = this.dau[i];
                    if (m.no > 0){ m.no--; if (m.no <= 0) this.dau.splice(i, 1); continue; }
                    m.t--;
                    if (m.t <= 0){
                        m.no = 20;
                        let r = { x: m.x - 46, y: 320 - 190, w: 92, h: 190 };
                        if (checkAABB(dino, r)) this.hurtP(1);
                        visualEffects.push(new Effect(m.x, 300, 'explosion', true, 26));
                        shakeTimer = Math.max(shakeTimer, 16);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                }
            }
            veVongDau(){
                let v = this.vong;
                if (v){
                    ctx.save();
                    ctx.globalAlpha = 0.50 * Math.max(0, 1 - v.r / v.max);
                    ctx.strokeStyle = this.buffed ? "#B388FF" : "#7E57C2";
                    ctx.lineWidth = ART_VONG_DAY * 0.45;
                    ctx.beginPath(); ctx.ellipse(v.x, v.y, v.r, v.r * 0.34, 0, Math.PI, 0); ctx.stroke();
                    ctx.globalAlpha = 0.85; ctx.strokeStyle = "#EDE7F6"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.ellipse(v.x, v.y, v.r, v.r * 0.34, 0, Math.PI, 0); ctx.stroke();
                    ctx.restore(); ctx.globalAlpha = 1;
                }
                if (this.dau) for (let m of this.dau){
                    ctx.save();
                    if (m.no > 0){
                        let u = m.no / 20;
                        ctx.globalAlpha = 0.78 * u;
                        let g = ctx.createLinearGradient(0, 320 - 190, 0, 320);
                        g.addColorStop(0, "rgba(179,136,255,0)"); g.addColorStop(0.5, "rgba(126,87,194,0.85)");
                        g.addColorStop(1, "rgba(237,231,246,0.95)");
                        ctx.fillStyle = g; ctx.fillRect(m.x - 46, 320 - 190, 92, 190);
                    } else {
                        let u = 1 - m.t / ART_DAU_CHO;
                        ctx.globalAlpha = 0.28 + 0.45 * u;
                        ctx.strokeStyle = "#B388FF"; ctx.lineWidth = 2.5;
                        ctx.beginPath(); ctx.ellipse(m.x, 318, 46 * (0.4 + 0.6 * u), 13, 0, 0, 6.28); ctx.stroke();
                        ctx.fillStyle = "rgba(126,87,194,0.25)";
                        ctx.beginPath(); ctx.ellipse(m.x, 318, 46 * (0.4 + 0.6 * u), 13, 0, 0, 6.28); ctx.fill();
                    }
                    ctx.restore(); ctx.globalAlpha = 1;
                }
                // Vẽ sóng âm tiếng hú sói (Wolf Howl Rings)
                for (let hw of this.howlWaves){
                    ctx.save();
                    ctx.globalAlpha = (hw.t / 18) * 0.65;
                    ctx.strokeStyle = "#B388FF"; ctx.lineWidth = 2.5;
                    ctx.beginPath(); ctx.arc(hw.x, hw.y, hw.r, 0, 6.28); ctx.stroke();
                    ctx.restore();
                }
                // Vẽ đốm linh hồn Vực Thẳm (Homing Abyss Wisps)
                for (let w of this.wisps){
                    ctx.save();
                    ctx.fillStyle = "#311B92";
                    ctx.beginPath(); ctx.arc(w.x, w.y, 8, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "#B388FF"; ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.fillStyle = "#EDE7F6";
                    ctx.beginPath(); ctx.arc(w.x - w.vx * 0.4, w.y - w.vy * 0.4, 3, 0, 6.28); ctx.fill();
                    ctx.restore();
                }
            }
            tickBurst(){
                let b = this.burst; if (!b) return;
                b.r += b.sp; b.sp *= 0.965;
                let dx = (dino.x + dino.w/2) - b.x, dy = (dino.y + dino.h/2) - b.y;
                let d = Math.sqrt(dx*dx + dy*dy);
                if (!b.hit && d < b.r && d > b.r - 46){ b.hit = true; this.hurtP(b.dmg || 1); }
                if (b.r > b.max) this.burst = null;
            }
            update(){
                if (this.state === 'entering'){
                    this.physics(); this.x -= 4; this.walk += 4;
                    if (this.x < canvas.width - 250) this.toIdle(34);
                    return;
                }
                for (let i = this.ghosts.length - 1; i >= 0; i--){ this.ghosts[i].t--; if (this.ghosts[i].t <= 0) this.ghosts.splice(i, 1); }
                if (this.tel){ this.tel.t--; if (this.tel.t <= 0) this.tel = null; }
                if (this.slash){ this.slash.t--; if (this.slash.t <= 0) this.slash = null; }
                for (let k in this.cd) if (this.cd[k] > 0) this.cd[k]--;
                if (this.stagger > 0){
                    this.stagger--;
                    this.crouch = 12; this.lean = 0.35; this.armR = 0.8; this.swordAngle = 0.4; // Tư thế quỳ gối chống kiếm khi bị choáng!
                    this.physics();
                    if (this.stagger === 0) this.toIdle(22);
                    return;
                }
                this.tickBurst(); this.tickVong(); this.tickDau(); this.tickWisps();
                this.physics();
                if (this.slash){
                    let r = this.slashRect();
                    if (!this.slash.hit && checkAABB(dino, r)){ this.slash.hit = true; this.hurtP(this.slash.dmg); }
                }
                // ---- CÚ BUFF VỰC THẲM (WRATH OF THE ABYSS): Thử tối đa 2 lần ở 75% và 40% máu ----
                if (!this.buffed && this.state === 'idle' &&
                    ((this.buffTries === 0 && this.hp <= this.maxHp * 0.75) ||
                     (this.buffTries === 1 && this.hp <= this.maxHp * 0.40))){
                    this.buffTries++; this.state = 'a_buff'; this.subTimer = 0;
                    this.buffHp = this.hp; this.buffT = 0;
                    // Nhảy lùi nhẹ về khoảng cách an toàn trước khi tụ lực chuẩn Dark Souls
                    let away = -this.dir();
                    this.dashV = away * 12;
                    return;
                }
                if (this.state === 'idle'){
                    this.faceP();
                    this.resetPose();
                    let g = this.gap(), ad = Math.abs(g);
                    if (ad > 96){ let sp = ad > 280 ? 3.2 : 2.3; this.x += Math.sign(g) * sp * this.spd(); this.walk += sp; }
                    else if (ad < 54){ this.x -= Math.sign(g) * 1.3; this.walk += 1.3; }
                    this.actionTimer--;
                    if (this.actionTimer <= 0) this.pickSkill();
                    return;
                }
                this.runSkill();
            }
            pickSkill(){
                let ad = Math.abs(this.gap()), near = ad < 175;
                if (ad < 90 && this.canUse('a_sludge')){
                    this.state = 'a_sludge'; this.subTimer = 0; this.cd['a_sludge'] = ART_CD['a_sludge']; return;
                }
                let poolN = ['a_combo','a_sweep','a_smash','a_howl','a_spin','a_vuot','a_dau'];
                let poolF = ['a_lunge','a_lunge','a_howl','a_bay','a_truot','a_vuot','a_flip','a_vong','a_dau'];
                if (this.buffed){
                    poolN.push('a_flip','a_burstk','a_dash','a_vong');
                    poolF.push('a_dash','a_dash','a_flip','a_burstk','a_bay','a_truot');
                }
                this.state = this.pickFrom(nhipXa(this, near) ? poolF : poolN, 'a_combo');
                this.subTimer = 0; this.faceP();
            }
            runSkill(){
                let st = this.state, sp = this.spd(); this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;

                // =========================================================================
                // 1. WRATH OF THE ABYSS (TỤ BÓNG TỐI — NGẮT DỄ DÀNG VỚI 30 SÁT THƯƠNG!)
                // Tư thế: Cắm mũi đại kiếm xuống đất trước mặt, khom lưng rút năng lượng Vực Thẳm
                // =========================================================================
                if (st === 'a_buff'){
                    this.buffT++;
                    this.crouch = 8;
                    this.lean = 0.22 + Math.sin(this.subTimer * 0.25) * 0.04;
                    this.armR = 0.55;
                    this.swordAngle = 0.38; // Mũi kiếm cắm chéo xuống đất

                    if (T(1)){
                        floatingTexts.push(new FloatingText(this.cx() - 96, 130, "TỤ VỰC THẲM — TẤN CÔNG ĐỂ NGẮT!"));
                        if (SFX.tone) SFX.tone(180, 0.35, 'sawtooth', 0.16, 90);
                    }
                    // Chỉ cần gây đủ 30 sát thương trong 3.1 giây -> PHÁ VỠ THẾ TỤ LỰC & GÂY CHOÁNG LỚN!
                    if (this.buffHp - this.hp >= ART_BUFF_HP){
                        this.stagger = 110; // Choáng gần 2 giây để người chơi thoải mái dồn sát thương
                        this.state = 'staggered';
                        floatingTexts.push(new FloatingText(this.cx() - 74, this.y - 36, "PHÁ VỠ VỰC THẲM! CHOÁNG!"));
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'parry', this.facingLeft));
                        shakeTimer = 28;
                        return;
                    }
                    // Nếu người chơi không ngắt -> Nổ vòm Vực Thẳm + Phóng 3 đốm lửa truy kích chậm (Nightreign)
                    if (this.subTimer > ART_BUFF_T){
                        this.buffed = true;
                        this.name = "ARTORIAS THE ABYSSWALKER";
                        this.burst = { x: this.cx(), y: this.cy(), r: 20, sp: 12, max: 280, hit: false, dmg: 1 };
                        this.spawnAbyssWisps(3);
                        floatingTexts.push(new FloatingText(this.cx() - 88, 132, "WRATH OF THE ABYSS!"));
                        shakeTimer = 64; if (SFX.bossEntry) SFX.bossEntry();
                        this.toIdle(32);
                    }
                    return;
                }

                // =========================================================================
                // 2. [MỚI - CHUẨN NIGHTREIGN] WOLF HOWL SLASH / SPIN (`a_howl`)
                // Artorias ngửa đầu hú vang như sói (Howl telegraph), sau đó:
                // - Nếu ở xa: Lao chớp nhoáng tới chém ngang 1 nhát cực rộng.
                // - Nếu ở gần: Xoay vung đại kiếm 2 vòng quanh thân rồi khựng lại 1 giây!
                // =========================================================================
                if (st === 'a_howl'){
                    if (T(1)){
                        this.faceP();
                        this._howlMode = Math.abs(this.gap()) > 155 ? 'dash' : 'spin';
                        floatingTexts.push(new FloatingText(this.cx() - 64, this.y - 36, "TIẾNG HÚ VỰC THẲM!"));
                        if (SFX.tone) SFX.tone(240, 0.35, 'sawtooth', 0.18, 420);
                    }
                    // Pha 1 (1 -> 28f): Ngửa đầu hú vang, phát ra các vòng sóng âm tím cảnh báo rõ ràng
                    if (this.subTimer < 28){
                        this.crouch = 6;
                        this.lean = -0.22; // Ngửa đầu và ngực lên trời hú
                        this.armR = 0.85;
                        this.swordAngle = 0.15;
                        if (Math.floor(this.subTimer) % 8 === 0){
                            this.howlWaves.push({ x: this.cx(), y: this.y + 12, r: 16, t: 18 });
                        }
                        if (T(16)){
                            this.warn(this._howlMode === 'dash' ? 190 : 148, 30, 12);
                        }
                        return;
                    }
                    // Pha 2A: Lao vọt tới chém ngang (Dash Horizontal Slash)
                    if (this._howlMode === 'dash'){
                        if (T(28)){
                            this.faceP();
                            this.crouch = 4; this.lean = 0.32;
                            this.armR = -1.8; this.swordAngle = -0.35;
                            this.dashV = this.dir() * (this.buffed ? 29 : 25);
                        }
                        if (T(36)){
                            this.armR = 0.65; this.swordAngle = -1.2;
                            this.doSlash(154, 28, 16, 1);
                            for (let k = 0; k < 4; k++) this.ghost();
                            shakeTimer = Math.max(shakeTimer, 20);
                            if (SFX.bossSkill) SFX.bossSkill();
                        }
                        if (this.subTimer > 66) this.toIdle(32);
                        return;
                    }
                    // Pha 2B: Xoay đại kiếm quanh người rồi đứng khựng 1 giây mở sơ hở (Spinning Slash + Recovery)
                    if (this.subTimer >= 28 && this.subTimer < 64){
                        this.lean = 0.18;
                        this.armR = (this.subTimer - 28) * 0.52;
                        this.swordAngle = -0.2;
                        this.x += this.dir() * 2.4;
                        if (Math.floor(this.subTimer) % 8 === 0){
                            this.doSlash(145, 32, 7, 1);
                            visualEffects.push(new Effect(this.cx() + this.dir() * 60, this.cy(), 'explosion', true, 16));
                            if (SFX.tone) SFX.tone(360, 0.05, 'square', 0.11, 200);
                        }
                    }
                    if (this.subTimer >= 64){
                        // Nhịp khựng 1 giây sau khi xoay đúng theo cơ chế Nightreign
                        this.crouch = 8; this.lean = 0.28; this.armR = 0.5;
                    }
                    if (this.subTimer > 88) this.toIdle(34);
                    return;
                }

                // =========================================================================
                // 3. COMBO 3 NHÁT ĐẠI KIẾM (Vung 1 tay nặng nề, nhịp vung kiếm khớp 100% với hitbox)
                // =========================================================================
                if (st === 'a_combo'){
                    let warns = [6, 30, 56], hits = [16, 40, 74];
                    if (this.subTimer < 74 && Math.floor(this.subTimer) % 2 === 0){
                        let g = this.gap(); if (Math.abs(g) > 84) this.x += Math.sign(g) * 2.8;
                    }
                    // Diễn hoạt cánh tay vung kiếm liên tục giữa lúc lấy đà và lúc bổ xuống
                    if (this.subTimer < 16){
                        this.armR = -2.1; this.swordAngle = -0.6; this.lean = 0.05;
                    } else if (this.subTimer < 30){
                        this.armR = 0.55; this.swordAngle = -1.1; this.lean = 0.26;
                    } else if (this.subTimer < 40){
                        this.armR = 1.1; this.swordAngle = -0.4; this.lean = 0.12;
                    } else if (this.subTimer < 56){
                        this.armR = -1.85; this.swordAngle = -0.8; this.lean = 0.22;
                    } else if (this.subTimer < 74){
                        this.armR = -2.55; this.swordAngle = -0.5; this.lean = -0.08; this.crouch = 4;
                    } else {
                        this.armR = 0.65; this.swordAngle = -1.25; this.lean = 0.34; this.crouch = 6;
                    }
                    for (let k = 0; k < 3; k++){
                        if (T(warns[k])){ this.faceP(); this.warn(k===2?142:106, k===2?36:22, hits[k]-warns[k]); }
                        if (T(hits[k])){
                            this.faceP(); let big = k === 2;
                            this.doSlash(big ? 142 : 106, big ? 36 : 22, big ? 15 : 10, 1);
                            this.dashV = this.dir() * (big ? 9 : 5);
                            if (big){
                                shakeTimer = 24;
                                visualEffects.push(new Effect(this.cx() + this.dir() * 64, this.y + this.h, 'explosion', true, 26));
                            } else if (SFX.tone) SFX.tone(420 - k*50, 0.06, 'square', 0.11, 220);
                        }
                    }
                    if (this.subTimer > 94) this.toIdle(30);
                    return;
                }

                // =========================================================================
                // 4. QUÉT NGANG RỘNG (WIDE GREATSWORD SWEEP)
                // =========================================================================
                if (st === 'a_sweep'){
                    if (T(8)){
                        this.faceP();
                        this.crouch = 6; this.lean = -0.05;
                        this.armR = -2.35; this.swordAngle = -0.55;
                        this.warn(158, 30, 24);
                    }
                    if (T(32)){
                        this.lean = 0.34; this.crouch = 4;
                        this.armR = 0.68; this.swordAngle = -1.2;
                        this.doSlash(158, 30, 18, 1);
                        this.dashV = this.dir() * 8; shakeTimer = 22;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 62) this.toIdle(30);
                    return;
                }

                // =========================================================================
                // 5. BỔ THẲNG XUỐNG + SÓNG XUNG KÍCH VỰC THẲM (OVERHEAD ABYSSAL SMASH)
                // =========================================================================
                if (st === 'a_smash'){
                    if (T(6)){
                        this.faceP();
                        this.lean = -0.15; this.armR = -2.65; this.swordAngle = -0.45;
                        this.warn(124, 46, 26);
                    }
                    if (T(32)){
                        this.lean = 0.36; this.crouch = 8;
                        this.armR = 0.55; this.swordAngle = -1.3;
                        shakeTimer = 38;
                        this.doSlash(124, 46, 16, 1);
                        visualEffects.push(new Effect(this.cx() + this.dir()*54, this.y + this.h, 'explosion', true, 56));
                        for (let s2 = -1; s2 <= 1; s2 += 2){
                            let w = new BossProjectile(this.cx() + s2*26, 322 - 66, s2 * 9, 0, true, 1);
                            w.w = 40; w.h = 66; w.color = this.buffed ? "#B388FF" : "#9AA6C4";
                            w.crescent = true; w.isPiercing = true; bossProjectiles.push(w);
                        }
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 68) this.toIdle(34);
                    return;
                }

                // =========================================================================
                // 6. [CHUẨN NIGHTREIGN] CROUCHING STINGER LUNGE (`a_lunge`)
                // Trước khi lao đâm, Artorias hạ rạp người xuống sát đất như sói rình mồi
                // và chĩa thẳng mũi đại kiếm ngang về phía người chơi!
                // =========================================================================
                if (st === 'a_lunge'){
                    if (T(6)){
                        this.faceP();
                        this.warn(190, 14, 26);
                    }
                    if (this.subTimer < 32){
                        // Tư thế ngồi rạp xuống đất lấy đà (Crouch Telegraph)
                        let p = Math.min(1, this.subTimer / 26);
                        this.crouch = 15 * p;
                        this.lean = 0.38 * p;
                        this.armR = -1.45;
                        this.swordAngle = -0.05; // Mũi kiếm chĩa ngang thẳng về phía trước!
                        return;
                    }
                    if (T(32)){
                        this.crouch = 6; this.lean = 0.42;
                        this.dashV = this.dir() * 28;
                        this.armR = -1.52; this.swordAngle = 0.0; // Duỗi thẳng tay và kiếm thành 1 đường thẳng đâm xuyên!
                        this.doSlash(190, 14, 22, 1);
                        for (let k = 0; k < 4; k++) this.ghost();
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 34 && this.subTimer < 58 && Math.floor(this.subTimer) % 3 === 0) this.ghost();
                    if (this.subTimer > 72) this.toIdle(32);
                    return;
                }

                // =========================================================================
                // 7. LĂN NÉ / NHẢY LÙI SÓI (WOLF BACKSTEP / ROLL)
                // =========================================================================
                if (st === 'a_roll'){
                    if (T(4)){
                        this.faceP();
                        let away = -Math.sign(this.gap()) || 1;
                        if (Math.abs(this.gap()) > 220) away = Math.sign(this.gap());
                        this.dashV = away * 19;
                        this.crouch = 12;
                        for (let k = 0; k < 4; k++) this.ghost();
                    }
                    if (this.subTimer > 4 && this.subTimer < 26){
                        this.flipAngle = (this.subTimer - 4) / 22 * Math.PI * 2 * (this.dashV * this.dir() > 0 ? 1 : -1);
                        if (Math.floor(this.subTimer) % 3 === 0) this.ghost();
                    }
                    if (this.subTimer > 32) this.toIdle(12);
                    return;
                }

                // =========================================================================
                // 8. ABYSS SLUDGE: Vung tay hất bùn đen Vực Thẳm khi người chơi áp quá sát
                // =========================================================================
                if (st === 'a_sludge'){
                    if (T(6)){
                        this.faceP();
                        this.crouch = 8; this.lean = -0.12; this.armR = 0.8;
                    }
                    if (T(20)){
                        let d = this.dir();
                        this.lean = 0.28; this.armR = -1.6;
                        for (let k = 0; k < 5; k++){
                            let a = Math.PI * (0.15 + k * 0.16);
                            let bp = new BossProjectile(this.cx(), this.y + this.h - 18, Math.cos(a)*d*7.5, -Math.abs(Math.sin(a))*6.5, false, 1);
                            bp.w = 18; bp.h = 18; bp.color = "#4527A0"; bp.rock = true; bossProjectiles.push(bp);
                        }
                        visualEffects.push(new Effect(this.cx(), this.y + this.h - 10, 'explosion', true, 36));
                        floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, "ABYSS SLUDGE!"));
                    }
                    if (this.subTimer > 48) this.toIdle(26);
                    return;
                }

                // =========================================================================
                // 9. [ĐẶC TRƯNG NHẤT CỦA ARTORIAS] SOMERSAULT LION'S CLAW SLAM (`a_flip`)
                // Nhảy vọt lên không, xoay lộn nhào toàn bộ cơ thể 360 độ (`flipAngle`)
                // rồi đập sầm đại kiếm xuống vị trí người chơi (Lặp 2 lần ở Phase 1, 3 lần khi đã Buff!)
                // =========================================================================
                if (st === 'a_flip'){
                    let maxFlips = this.buffed ? 3 : 2;
                    let cyc = 46, n = Math.floor(this.subTimer / cyc), k2 = this.subTimer % cyc;
                    if (n < maxFlips){
                        // Nhịp 1 (0 -> 6f): Ngồi rạp lấy đà chuẩn bị bật nhảy
                        if (k2 < 6){
                            this.faceP();
                            this.crouch = 12; this.lean = 0.25; this.flipAngle = 0;
                            this.armR = -2.4; this.swordAngle = -0.5;
                        }
                        // Nhịp 2 (Frame 6): Bật nhảy lên cao và bắt đầu lộn vòng trên không!
                        if (k2 >= 6 && k2 - sp < 6){
                            this.faceP();
                            this.crouch = 0;
                            this.dy = -14.2; this.grounded = false;
                            let g = this.gap();
                            this.dashV = this.dir() * Math.min(13, Math.max(6, Math.abs(g) * 0.055));
                            this.warn(128, 52, 18);
                        }
                        // Trong khi đang ở trên không (6 -> 25f): Xoay lộn nhào cả cơ thể 1 vòng 360 độ!
                        if (k2 >= 6 && k2 < 25){
                            let spinProg = (k2 - 6) / 19;
                            this.flipAngle = spinProg * Math.PI * 2;
                            this.armR = -2.2; this.swordAngle = -0.3;
                            if (Math.floor(k2) % 3 === 0) this.ghost();
                        }
                        // Nhịp 3 (Frame 25): Đập thẳng đại kiếm xuống mặt sàn tạo chấn động!
                        if (k2 >= 25 && k2 - sp < 25){
                            this.flipAngle = 0;
                            this.crouch = 8; this.lean = 0.38;
                            this.dy = 17;
                            this.armR = 0.55; this.swordAngle = -1.25;
                            this.doSlash(128, 52, 16, 1);
                            shakeTimer = 26;
                            visualEffects.push(new Effect(this.cx() + this.dir() * 52, this.y + this.h, 'explosion', true, 44));
                            if (SFX.bossSkill) SFX.bossSkill();
                        }
                    }
                    if (this.subTimer > cyc * maxFlips + 14) this.toIdle(38);
                    return;
                }

                // =========================================================================
                // 10. XOAY KIẾM QUÉT VÒNG TRÒN (WHIRLWIND SPIN SLASH)
                // =========================================================================
                if (st === 'a_spin'){
                    let reps = this.buffed ? 2 : 1, cyc = 56;
                    if (T(8)){
                        this.faceP();
                        this.crouch = 6; this.armR = -2.2;
                        this.warn(150, 34, 20);
                    }
                    let n = Math.floor(Math.max(0, this.subTimer - 28) / cyc), k2 = (this.subTimer - 28) % cyc;
                    if (this.subTimer > 28 && n < reps){
                        if (k2 < 40){
                            this.armR = (this.subTimer - 28) * 0.46;
                            this.swordAngle = -0.25;
                            this.x += this.dir() * 2.0;
                            if (Math.floor(this.subTimer) % 9 === 0){
                                let dx = ((dino.x + dino.w/2) - this.cx()) / 150;
                                let dy = ((dino.y + dino.h/2) - this.cy()) / 58;
                                if (dx*dx + dy*dy < 1) this.hurtP(1);
                                visualEffects.push(new Effect(this.cx() + Math.cos(this.armR)*110, this.cy() + Math.sin(this.armR)*42, 'explosion', true, 16));
                            }
                        } else if (k2 < 44) this.faceP();
                    }
                    if (this.subTimer > 28 + cyc * reps + 16) this.toIdle(34);
                    return;
                }

                // =========================================================================
                // 11. SKYWARD ABYSSAL LEAP (`a_bay` — Nhảy vọt lên trời cao rồi cắm thẳng kiếm xuống)
                // =========================================================================
                if (st === 'a_bay'){
                    if (T(1)){
                        this.faceP();
                        this.crouch = 14; this.lean = 0.28;
                        this.bayDich = dino.x + dino.w/2;
                    }
                    if (T(12)){
                        this.crouch = 0; this.lean = -0.15;
                        this.dy = -16.2; this.grounded = false;
                        this.armR = -2.5; this.swordAngle = -0.4;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 12 && !this.grounded){
                        let dx = this.bayDich - this.cx();
                        this.x += Math.max(-13, Math.min(13, dx * 0.16));
                        this.ghost();
                        if (this.dy > 0){
                            this.lean = 0.35;
                            this.armR = 0.25; this.swordAngle = -1.35; // Chĩa mũi kiếm xuống đất khi lao xuống!
                            this.dy = Math.min(this.dy + 0.5, 17);
                        }
                    }
                    if (this.subTimer > 20 && this.grounded){
                        this.crouch = 10; this.lean = 0.38;
                        this.armR = 0.55; this.swordAngle = -1.25;
                        this.doSlash(124, 38, 22, 1);
                        visualEffects.push(new Effect(this.cx() + this.dir() * 42, this.y + this.h, 'explosion', true, 42));
                        shakeTimer = Math.max(shakeTimer, 26);
                        if (SFX.bossExplode) SFX.bossExplode();
                        this.toIdle(this.buffed ? 24 : 32); return;
                    }
                    if (this.subTimer > 120) this.toIdle(26);
                    return;
                }

                // =========================================================================
                // 12. DRAGGING UPPERCUT SLIDE (`a_truot` — Kéo lê đại kiếm cày mặt đất rồi vớt ngược lên!)
                // =========================================================================
                if (st === 'a_truot'){
                    if (T(1)){
                        this.faceP();
                        this.crouch = 10; this.lean = 0.32;
                        this.armR = 0.95; this.swordAngle = 0.25; // Hạ mũi kiếm kéo lê phía sau lưng trên mặt đất!
                    }
                    if (T(13)){
                        this.dashV = this.dir() * (this.buffed ? 29 : 24);
                        this._truotHit = false;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 13 && this.subTimer < 36){
                        this.ghost();
                        if (Math.floor(this.subTimer) % 3 === 0){
                            visualEffects.push(new Effect(this.cx() - this.dir() * 32, this.y + this.h - 4, 'explosion', true, 12));
                        }
                        let r = { x: this.cx() - 42, y: this.y + this.h - 44, w: 84, h: 44 };
                        if (!this._truotHit && checkAABB(dino, r)){ this._truotHit = true; this.hurtP(1); }
                    }
                    // Nhịp kết (Frame 36): Hất vớt đại kiếm từ dưới đất lên trời!
                    if (T(36)){
                        this.crouch = 0; this.lean = -0.12;
                        this.armR = -2.25; this.swordAngle = -0.65;
                        this.doSlash(118, 56, 14, 1);
                        if (SFX.tone) SFX.tone(520, 0.07, 'sawtooth', 0.12, 280);
                    }
                    if (this.subTimer > 54) this.toIdle(this.buffed ? 20 : 28);
                    return;
                }

                // =========================================================================
                // 13. CROSS-UP SLASH (`a_vuot` — Lướt vượt qua lưng người chơi rồi quay ngoắt lại chém)
                // =========================================================================
                if (st === 'a_vuot'){
                    if (T(1)){
                        this.faceP();
                        this.crouch = 10; this.lean = 0.34;
                        this.armR = 0.7; this.swordAngle = 0.1;
                    }
                    if (T(15)){
                        this.dashV = this.dir() * 27; this._vuotHit = false;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 15 && this.subTimer < 40){
                        this.ghost();
                        let r = { x: this.x - 10, y: this.y, w: this.w + 20, h: this.h };
                        if (!this._vuotHit && checkAABB(dino, r)){ this._vuotHit = true; this.hurtP(1); }
                    }
                    if (T(44)){
                        this.faceP(); this.dashV = 0;
                        this.crouch = 4; this.lean = -0.05;
                        this.armR = -2.1; this.swordAngle = -0.5;
                        this.warn(136, 30, 14);
                    }
                    if (T(58)){
                        this.lean = 0.32;
                        this.armR = 0.55; this.swordAngle = -1.2;
                        this.doSlash(136, 30, 18, 1);
                        shakeTimer = Math.max(shakeTimer, 18);
                    }
                    if (this.subTimer > 76) this.toIdle(this.buffed ? 22 : 28);
                    return;
                }

                // =========================================================================
                // 14. VÒNG VỰC THẲM & DẤU VỰC THẲM (NIGHTREIGN ARENA CONTROL)
                // =========================================================================
                if (st === 'a_vong'){
                    if (T(1)){
                        this.faceP();
                        this.crouch = 8; this.armR = -2.2;
                        floatingTexts.push(new FloatingText(this.cx() - 70, 132, "VÒNG VỰC THẲM"));
                    }
                    if (T(28)){
                        this.armR = 0.55; this.swordAngle = -1.25;
                        this.vong = { x: this.cx(), y: 320, r: 30, sp: this.buffed ? 4.5 : 3.6,
                                      max: this.buffed ? 620 : 480, hit: false };
                        shakeTimer = 24; if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 60) this.toIdle(this.buffed ? 24 : 34);
                    return;
                }
                if (st === 'a_dau'){
                    if (T(1)){
                        this.faceP();
                        this.armR = -1.9;
                        this.dau = this.dau || [];
                        let so = this.buffed ? 3 : 1;
                        for (let k = 0; k < so; k++)
                            this.dau.push({ x: dino.x + dino.w/2 + (k - (so-1)/2) * 96, t: ART_DAU_CHO + k * 16, no: 0 });
                        floatingTexts.push(new FloatingText(this.cx() - 56, 132, "DẤU VỰC THẲM"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > (this.buffed ? 40 : 48)) this.toIdle(this.buffed ? 22 : 30);
                    return;
                }

                // =========================================================================
                // 15. NỔ VỰC THẲM KÈM LINH HỒN TRUY KÍCH (`a_burstk`)
                // =========================================================================
                if (st === 'a_burstk'){
                    this.crouch = 8; this.lean = 0.25; this.armR = 0.5; this.swordAngle = 0.35;
                    if (T(14)) floatingTexts.push(new FloatingText(this.x - 26, this.y - 34, "Hắc Ám Bùng Nổ!"));
                    if (T(38)){
                        this.lean = -0.15; this.armR = -2.1;
                        this.burst = { x: this.cx(), y: this.cy(), r: 18, sp: 11, max: 250, hit: false, dmg: 1 };
                        this.spawnAbyssWisps(2);
                        shakeTimer = 34; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 74) this.toIdle(36);
                    return;
                }

                // =========================================================================
                // 16. [CHUẨN PHASE 2 NIGHTREIGN] ABYSSAL DASH FLURRY (`a_dash`)
                // Lướt nhanh và tung liên tiếp 3 nhát chém đại kiếm tốc độ cao,
                // sau đó ĐỨNG KHỰNG THỞ 1 GIÂY (Immobilized Recovery Window) để người chơi phản công!
                // =========================================================================
                if (st === 'a_dash'){
                    if (T(6)){
                        this.faceP();
                        this.crouch = 12; this.lean = 0.35;
                        this.armR = -2.2; this.warn(220, 28, 20);
                        floatingTexts.push(new FloatingText(this.cx() - 68, this.y - 36, "LIÊN TRẢM VỰC THẲM!"));
                    }
                    let slashes = [26, 42, 58];
                    for (let k = 0; k < 3; k++){
                        if (T(slashes[k])){
                            this.faceP();
                            this.crouch = 4; this.lean = 0.34;
                            this.armR = (k % 2 === 0) ? 0.65 : -2.1;
                            this.swordAngle = (k % 2 === 0) ? -1.2 : -0.5;
                            this.dashV = this.dir() * (k === 0 ? 26 : 16);
                            this.doSlash(148, 30, 12, 1);
                            for (let g = 0; g < 3; g++) this.ghost();
                            if (SFX.bossSkill) SFX.bossSkill();
                        }
                    }
                    // Từ frame 68 đến 104: Artorias chống kiếm đứng khựng 1 giây (Opening cho người chơi phạt!)
                    if (this.subTimer >= 68){
                        this.crouch = 10; this.lean = 0.32;
                        this.armR = 0.6; this.swordAngle = 0.35;
                    }
                    if (this.subTimer > 104) this.toIdle(38);
                    return;
                }

                this.toIdle(32);
            }
            draw(){
                this.veVongDau();
                // --- vòng nổ Vực Thẳm ---
                if (this.burst){
                    let b = this.burst, k = 1 - b.r / b.max;
                    ctx.save();
                    ctx.globalAlpha = 0.26 * k + 0.08;
                    ctx.strokeStyle = "#7C4DFF"; ctx.lineWidth = 20;
                    ctx.beginPath(); ctx.arc(b.x, b.y, Math.max(1, b.r), 0, 6.28); ctx.stroke();
                    ctx.globalAlpha = 0.82 * k;
                    ctx.strokeStyle = "#EDE7F6"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.arc(b.x, b.y, Math.max(1, b.r), 0, 6.28); ctx.stroke();
                    ctx.restore();
                }
                // --- tàn ảnh khi lướt / lộn vòng ---
                for (let g of this.ghosts){
                    ctx.save(); ctx.globalAlpha = (g.t / 13) * 0.34;
                    drawArtoriasBody({
                        facingLeft: g.left, armR: g.armR, swordAngle: g.swordAngle,
                        crouch: g.crouch, lean: g.lean, flipAngle: g.flipAngle,
                        buffed: g.buffed
                    }, g.x, g.y);
                    ctx.restore();
                }
                // --- hiệu ứng đang tụ bóng tối (WRATH OF THE ABYSS) ---
                if (this.state === 'a_buff'){
                    let k = Math.min(1, this.subTimer / ART_BUFF_T);
                    ctx.save();
                    ctx.globalAlpha = 0.16 + 0.26 * k;
                    ctx.fillStyle = "#311B92";
                    ctx.beginPath(); ctx.ellipse(this.cx(), this.cy(), 38 + 62*k, 48 + 64*k, 0, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 0.85;
                    ctx.strokeStyle = "#B388FF"; ctx.lineWidth = 2.8;
                    for (let q = 0; q < 7; q++){
                        let a = frames*0.05 + q*0.9, r = (95 + 55*k) * (1 - ((frames*0.012 + q*0.14) % 1));
                        ctx.beginPath();
                        ctx.moveTo(this.cx() + Math.cos(a)*r, this.cy() + Math.sin(a)*r*0.9);
                        ctx.lineTo(this.cx() + Math.cos(a)*r*0.55, this.cy() + Math.sin(a)*r*0.5); ctx.stroke();
                    }
                    ctx.restore();
                    // Thanh tiến độ NGẮT (Hiển thị rõ ràng phần trăm sát thương đã gây ra / 30 HP)
                    let W = 200, x0 = this.cx() - W/2, prog = Math.min(1, (this.buffHp - this.hp) / ART_BUFF_HP);
                    ctx.fillStyle = "rgba(0,0,0,0.75)"; ctx.fillRect(x0, this.y - 42, W, 10);
                    ctx.fillStyle = "#7C4DFF"; ctx.fillRect(x0, this.y - 42, W * (this.subTimer / ART_BUFF_T), 10);
                    ctx.fillStyle = "#00E676"; ctx.fillRect(x0, this.y - 42, W * prog, 5);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("NGẮT: " + Math.min(ART_BUFF_HP, Math.floor(Math.max(0, this.buffHp-this.hp))) + "/" + ART_BUFF_HP + " · " + Math.round(prog*100) + "%", this.cx(), this.y - 46);
                    ctx.textAlign = "left";
                }
                if (this.stagger > 0){
                    ctx.fillStyle = "#00E676"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("VỠ THẾ VỰC THẲM — TẤN CÔNG NGAY!", this.cx(), this.y - 30);
                    ctx.textAlign = "left";
                }
                // --- báo nhát chém (Telegraph Arc) ---
                if (this.tel){
                    let t = this.tel, k = 1 - t.t/t.max;
                    let cxT = t.dir < 0 ? this.x : this.x + this.w, cyT = this.y + this.h/2;
                    ctx.save();
                    ctx.globalAlpha = 0.26 + 0.42*k;
                    ctx.strokeStyle = this.buffed ? "#B388FF" : "#FF5252"; ctx.lineWidth = 2.8; ctx.lineCap = "round";
                    ctx.setLineDash([8, 7]); ctx.lineDashOffset = -frames*0.8;
                    ctx.beginPath(); ctx.arc(cxT, cyT, t.reach, t.dir<0 ? Math.PI-0.95 : -0.95, t.dir<0 ? Math.PI+0.95 : 0.95, false); ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.globalAlpha = 0.85; ctx.strokeStyle = "#EDE7F6"; ctx.lineWidth = 4.5;
                    let a0 = t.dir<0 ? Math.PI-0.95 : -0.95, a1 = t.dir<0 ? Math.PI+0.95 : 0.95;
                    ctx.beginPath(); ctx.arc(cxT, cyT, t.reach, a0, a0+(a1-a0)*k, false); ctx.stroke();
                    ctx.restore();
                }
                // --- thân Knight Artorias ---
                drawArtoriasBody(this, this.x, this.y);
                // --- vệt chém Đại Kiếm Sói & Hắc Ám Vực Thẳm ---
                if (this.slash){
                    let a = this.slash, cxS = a.dir < 0 ? this.x : this.x + this.w;
                    ctx.save(); ctx.globalAlpha = Math.min(1, a.t/9);
                    ctx.strokeStyle = this.buffed ? "#D1C4E9" : "#ECEFF1"; ctx.lineWidth = 7; ctx.lineCap = "round";
                    for (let k = 0; k < 3; k++){
                        ctx.beginPath();
                        ctx.arc(cxS, this.y + this.h/2, Math.max(10, a.reach - k*18), a.dir<0 ? Math.PI-0.95 : -0.95, a.dir<0 ? Math.PI+0.95 : 0.95, false);
                        ctx.stroke();
                    }
                    ctx.strokeStyle = this.buffed ? "#7C4DFF" : "#546E7A"; ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(cxS, this.y + this.h/2, Math.max(12, a.reach + 5), a.dir<0 ? Math.PI-0.95 : -0.95, a.dir<0 ? Math.PI+0.95 : 0.95, false);
                    ctx.stroke();
                    ctx.restore();
                }
                // --- tên & thanh máu HUD ---
                ctx.fillStyle = this.buffed ? "#B388FF" : "#CFD8DC"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.buffed ? "ABYSSWALKER ARTORIAS" : "KNIGHT ARTORIAS", this.cx(), this.y - 18);
                ctx.textAlign = "left";
                drawTopBossBar(this, this.buffed ? "#7C4DFF" : "#78909C",
                               this.buffed ? "KNIGHT ARTORIAS — WRATH OF THE ABYSS" : "KNIGHT ARTORIAS (THE FORSAKEN HOLLOWS)");
            }
        }
// BOSS_PART_END s0.ArtoriasBoss.1

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

// Nguồn: index.html:26903 · Dùng bởi: ArtoriasBoss
// BOSS_PART_BEGIN s0.ART_W.1 EDITABLE
const ART_W = 52, ART_H = 84;
// BOSS_PART_END s0.ART_W.1

// Nguồn: index.html:26906 · Dùng bởi: ArtoriasBoss
// BOSS_PART_BEGIN s0.ART_BUFF_HP.1 EDITABLE
const ART_BUFF_HP = 30;
// BOSS_PART_END s0.ART_BUFF_HP.1

// Nguồn: index.html:26907 · Dùng bởi: ArtoriasBoss
// BOSS_PART_BEGIN s0.ART_BUFF_T.1 EDITABLE
const ART_BUFF_T  = 185;
// BOSS_PART_END s0.ART_BUFF_T.1

// Nguồn: index.html:26908 · Dùng bởi: ArtoriasBoss
// BOSS_PART_BEGIN s0.ART_VONG_DAY.1 EDITABLE
const ART_VONG_DAY = 52;
// BOSS_PART_END s0.ART_VONG_DAY.1

// Nguồn: index.html:26909 · Dùng bởi: ArtoriasBoss
// BOSS_PART_BEGIN s0.ART_DAU_CHO.1 EDITABLE
const ART_DAU_CHO  = 66;
// BOSS_PART_END s0.ART_DAU_CHO.1

// Nguồn: index.html:26910 · Dùng bởi: ArtoriasBoss
// BOSS_PART_BEGIN s0.ART_TEMPO.1 EDITABLE
const ART_TEMPO    = 2.15;
// BOSS_PART_END s0.ART_TEMPO.1

// Nguồn: index.html:26911 · Dùng bởi: ArtoriasBoss
// BOSS_PART_BEGIN s0.ART_CD.1 EDITABLE
const ART_CD = {
            a_combo: 70, a_sweep: 115, a_smash: 145, a_lunge: 135, a_roll: 85, a_sludge: 240,
            a_flip: 210, a_spin: 185, a_burstk: 260, a_dash: 200, a_vong: 220, a_dau: 180,
            a_bay: 165, a_truot: 125, a_vuot: 145, a_howl: 175
        };
// BOSS_PART_END s0.ART_CD.1

// Nguồn: index.html:27008 · Dùng bởi: ArtoriasBoss
// BOSS_PART_BEGIN s0.drawArtoriasBody.1 EDITABLE
function drawArtoriasBody(b, x, y){
            let dr = b.facingLeft ? -1 : 1, cxb = x + ART_W/2, buff = !!b.buffed;
            let crouch = b.crouch || 0;               // Độ hạ thấp trọng tâm khi ngồi rạp chuẩn bị Lunge / Leap
            let lean = b.lean || 0.14;                // Độ chồm người về phía trước kiểu sói săn mồi
            let flipAngle = b.flipAngle || 0;         // Góc xoay lộn nhào toàn thân trên không (Somersault)
            let walkCycle = Math.sin((b.walk || 0) * 0.18) * 4.5;
            let sway = Math.sin(frames * 0.06) * 2.2 + (b.dashV ? -Math.abs(b.dashV) * 0.35 : 0);

            ctx.save();
            // Dịch tâm xoay vào giữa thân để hỗ trợ xoay lộn vòng Somersault 360 độ mượt mà!
            ctx.translate(cxb, y + ART_H * 0.48 + crouch * 0.5);
            ctx.scale(dr, 1);
            ctx.rotate(lean + flipAngle);
            ctx.translate(-cxb, -(y + ART_H * 0.48));

            // 1. HÀO QUANG LỬA ĐEN VỰC THẲM (ABYSSAL DARKFLAME AURA) KHI ĐÃ BUFF HOẶC ĐANG GỒNG
            if (buff || b.state === 'a_buff'){
                let pu = 0.5 + 0.5 * Math.sin(frames * 0.16);
                ctx.save();
                ctx.globalAlpha = buff ? (0.22 + 0.10 * pu) : 0.16;
                ctx.fillStyle = "#1A0933";
                ctx.beginPath(); ctx.ellipse(cxb, y + 42, 34 + pu * 6, 46 + pu * 6, 0, 0, 6.28); ctx.fill();
                // Các lưỡi lửa đen-tím bốc lên từ vai và lưng
                for (let k = 0; k < 5; k++){
                    let fx = cxb - 18 + k * 9 + Math.sin(frames * 0.14 + k) * 4;
                    let fh = 18 + ((k * 13) % 16) + pu * 10;
                    ctx.fillStyle = k % 2 === 0 ? "rgba(124, 77, 255, 0.38)" : "rgba(49, 27, 146, 0.52)";
                    ctx.beginPath();
                    ctx.moveTo(fx - 6, y + 48);
                    ctx.quadraticCurveTo(fx, y + 48 - fh, fx + 4, y + 48 - fh - 8);
                    ctx.lineTo(fx + 6, y + 48);
                    ctx.closePath(); ctx.fill();
                }
                ctx.restore();
            }

            // 2. TÀ ÁO CHOÀNG XANH HOÀNG GIA RÁCH TẢ TƠI (TATTERED ROYAL BLUE CAPE)
            // Phần trên màu xanh chàm đậm của hiệp sĩ Artorias, phần đuôi rách nát nhuốm bùn đen Vực Thẳm
            let capeGrad = ctx.createLinearGradient(cxb - 10, y + 18, cxb - 36, y + ART_H);
            capeGrad.addColorStop(0, buff ? "#1A237E" : "#1E3A5F");
            capeGrad.addColorStop(0.6, buff ? "#121036" : "#152642");
            capeGrad.addColorStop(1, "#080912");
            ctx.fillStyle = capeGrad;
            ctx.beginPath();
            ctx.moveTo(cxb - 10, y + 18);
            ctx.quadraticCurveTo(cxb - 34 - sway * 1.8, y + 42, cxb - 38 - sway * 2.8, y + ART_H - 4);
            // Các tua rách nham nhở ở gấu áo choàng
            ctx.lineTo(cxb - 28 - sway * 2.2, y + ART_H - 18);
            ctx.lineTo(cxb - 22 - sway * 2.0, y + ART_H - 2);
            ctx.lineTo(cxb - 14 - sway * 1.5, y + ART_H - 16);
            ctx.lineTo(cxb - 8 - sway * 1.0, y + ART_H - 3);
            ctx.lineTo(cxb - 2, y + ART_H - 14);
            ctx.lineTo(cxb + 2, y + 22);
            ctx.closePath(); ctx.fill();
            // Viền bạc mờ dọc mép áo choàng
            ctx.strokeStyle = buff ? "#7C4DFF" : "#4A6984"; ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(cxb - 10, y + 19);
            ctx.quadraticCurveTo(cxb - 32 - sway * 1.8, y + 42, cxb - 36 - sway * 2.6, y + ART_H - 6);
            ctx.stroke();

            // 3. ĐÔI CHÂN GIÁP THON DÀI (LEGGINGS OF ARTORIAS — Thon mảnh đúng thiết kế gốc)
            let lLeg = (!b.grounded) ? -4 : walkCycle;
            let rLeg = (!b.grounded) ? 3 : -walkCycle;
            // Chân sau (trái)
            ctx.fillStyle = "#232A3B";
            ctx.beginPath();
            ctx.moveTo(cxb - 11, y + 48); ctx.lineTo(cxb - 3, y + 48);
            ctx.lineTo(cxb - 5 + lLeg * 0.5, y + ART_H - 6 - crouch * 0.4);
            ctx.lineTo(cxb - 12 + lLeg * 0.5, y + ART_H - 6 - crouch * 0.4);
            ctx.closePath(); ctx.fill();
            // Chân trước (phải)
            ctx.fillStyle = "#323C52";
            ctx.beginPath();
            ctx.moveTo(cxb + 2, y + 48); ctx.lineTo(cxb + 11, y + 48);
            ctx.lineTo(cxb + 13 + rLeg * 0.5, y + ART_H - 6 - crouch * 0.4);
            ctx.lineTo(cxb + 5 + rLeg * 0.5, y + ART_H - 6 - crouch * 0.4);
            ctx.closePath(); ctx.fill();
            // Giáp đầu gối sắc nhọn (Pointed Knee Poleyn)
            ctx.fillStyle = "#687796";
            ctx.beginPath(); ctx.moveTo(cxb - 11, y + 60); ctx.lineTo(cxb - 5, y + 57); ctx.lineTo(cxb - 7, y + 65); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cxb + 4, y + 60); ctx.lineTo(cxb + 13, y + 57); ctx.lineTo(cxb + 10, y + 65); ctx.closePath(); ctx.fill();
            // Bàn chân giáp mũi nhọn (Sabatons)
            ctx.fillStyle = "#1A202C";
            ctx.beginPath(); ctx.moveTo(cxb - 13 + lLeg * 0.5, y + ART_H - 7 - crouch * 0.4); ctx.lineTo(cxb - 1 + lLeg * 0.5, y + ART_H - 2 - crouch * 0.4); ctx.lineTo(cxb - 13 + lLeg * 0.5, y + ART_H - 1 - crouch * 0.4); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cxb + 4 + rLeg * 0.5, y + ART_H - 7 - crouch * 0.4); ctx.lineTo(cxb + 18 + rLeg * 0.5, y + ART_H - 2 - crouch * 0.4); ctx.lineTo(cxb + 4 + rLeg * 0.5, y + ART_H - 1 - crouch * 0.4); ctx.closePath(); ctx.fill();

            // 4. VÁY GIÁP HÔNG & DẢI VẢI XANH RÁCH QUẤN EO (FAULD & WAIST CLOTH)
            ctx.fillStyle = "#1B2E4B";
            ctx.beginPath();
            ctx.moveTo(cxb - 13, y + 43); ctx.lineTo(cxb + 13, y + 43);
            ctx.lineTo(cxb + 15, y + 58); ctx.lineTo(cxb + 4, y + 52);
            ctx.lineTo(cxb - 2, y + 60); ctx.lineTo(cxb - 15, y + 55);
            ctx.closePath(); ctx.fill();
            // Thắt lưng kim loại chạm bạc
            ctx.fillStyle = "#4A5670"; ctx.fillRect(cxb - 14, y + 41, 28, 4);
            ctx.fillStyle = "#8C9EFF"; ctx.fillRect(cxb - 3, y + 40, 6, 6);

            // 5. THÂN GIÁP NGỰC HIỆP SĨ SÓI (SILVER-DARK CUIRASS & BLUE MANTLE)
            let torsoGrad = ctx.createLinearGradient(cxb - 15, y + 18, cxb + 15, y + 44);
            torsoGrad.addColorStop(0, "#6E7F9E");
            torsoGrad.addColorStop(0.5, "#3E4A63");
            torsoGrad.addColorStop(1, "#1F2637");
            ctx.fillStyle = torsoGrad;
            ctx.beginPath();
            ctx.moveTo(cxb - 15, y + 18); ctx.lineTo(cxb + 16, y + 18);
            ctx.lineTo(cxb + 13, y + 42); ctx.lineTo(cxb - 13, y + 42);
            ctx.closePath(); ctx.fill();
            // Các đường gân giáp xương sườn bạc sáng
            ctx.strokeStyle = "#8FA0BF"; ctx.lineWidth = 1.3;
            for (let k = 0; k < 3; k++){
                ctx.beginPath();
                ctx.moveTo(cxb - 11, y + 25 + k * 5);
                ctx.lineTo(cxb + 2, y + 28 + k * 5);
                ctx.lineTo(cxb + 12, y + 24 + k * 5);
                ctx.stroke();
            }
            // Khăn choàng xanh trùm qua vai và ngực (Iconic Blue Hooded Mantle Scarf)
            ctx.fillStyle = buff ? "#283593" : "#1E4678";
            ctx.beginPath();
            ctx.moveTo(cxb - 16, y + 15); ctx.lineTo(cxb + 16, y + 15);
            ctx.lineTo(cxb + 12, y + 27); ctx.lineTo(cxb + 2, y + 31);
            ctx.lineTo(cxb - 14, y + 25);
            ctx.closePath(); ctx.fill();

            // 6. CÁNH TAY TRÁI BỊ GÃY TRẬT KHỚP VAI (SHATTERED LEFT ARM — Đung đưa vô lực!)
            // Vai trái bị sụp thấp hơn vai phải, cánh tay buông thõng lắc lư theo quán tính
            let limpSwing = 0.22 + Math.sin(frames * 0.08) * 0.08 - (b.dashV || 0) * 0.025;
            ctx.save();
            ctx.translate(cxb - 14, y + 22);
            ctx.rotate(limpSwing);
            // Giáp vai trái bị vỡ nứt
            ctx.fillStyle = "#4A5670";
            ctx.beginPath(); ctx.moveTo(-7, -4); ctx.lineTo(5, -2); ctx.lineTo(4, 7); ctx.lineTo(-8, 6); ctx.closePath(); ctx.fill();
            // Bắp tay & cẳng tay trái gãy buông thõng dài xuống ngang đùi
            ctx.fillStyle = "#2A3244"; ctx.fillRect(-3.5, 4, 7, 16);
            ctx.fillStyle = "#3E4A63"; ctx.fillRect(-3, 19, 6, 15);
            // Các dải vải liệm/băng quấn quanh cánh tay gãy
            ctx.fillStyle = "#7E8C9F";
            for (let k = 0; k < 3; k++) ctx.fillRect(-3.8, 8 + k * 7, 7.6, 2.5);
            // Bàn tay sắt trái rủ xuống vô lực + Khói đen Vực Thẳm rỉ ra từ vết gãy
            ctx.fillStyle = "#4A5670";
            ctx.beginPath(); ctx.moveTo(-3, 34); ctx.lineTo(3, 34); ctx.lineTo(1, 41); ctx.lineTo(-2, 40); ctx.closePath(); ctx.fill();
            ctx.restore();

            // 7. MŨ TRỤ MỎ CHIM SÓI ARTORIAS & BỜM LÔNG XANH DƯƠNG ĐẬM (WOLF HELM & BLUE PLUME)
            // Bờm lông xanh dương khổng lồ (Iconic Flowing Blue Wolf Mane) tung bay từ đỉnh mũ trụ!
            let plumeGrad = ctx.createLinearGradient(cxb, y - 8, cxb - 36, y + 18);
            plumeGrad.addColorStop(0, buff ? "#536DFE" : "#2962FF");
            plumeGrad.addColorStop(0.55, buff ? "#311B92" : "#1565C0");
            plumeGrad.addColorStop(1, "#090D1A");
            ctx.fillStyle = plumeGrad;
            ctx.beginPath();
            ctx.moveTo(cxb + 2, y - 5);
            ctx.quadraticCurveTo(cxb - 18 - sway * 1.5, y - 14, cxb - 36 - sway * 2.5, y + 6);
            ctx.lineTo(cxb - 26 - sway * 2.0, y + 9);
            ctx.lineTo(cxb - 34 - sway * 2.2, y + 18);
            ctx.lineTo(cxb - 20 - sway * 1.5, y + 16);
            ctx.lineTo(cxb - 24 - sway * 1.2, y + 24);
            ctx.quadraticCurveTo(cxb - 10, y + 18, cxb - 4, y + 6);
            ctx.closePath(); ctx.fill();

            // Thân mũ trụ bạc góc cạnh có chóp đỉnh nhọn và tấm che mặt vát nhọn như mỏ chim/mõm sói
            ctx.fillStyle = "#6E7F9E";
            ctx.beginPath();
            ctx.moveTo(cxb - 8, y + 16);
            ctx.lineTo(cxb - 9, y + 4);
            ctx.lineTo(cxb + 1, y - 6);   // Đỉnh mũ nhọn uốn về trước
            ctx.lineTo(cxb + 8, y + 2);
            ctx.lineTo(cxb + 14, y + 11); // Phần mũi mũ nhọn vươn ra trước (Beaked Visor)
            ctx.lineTo(cxb + 5, y + 18);
            ctx.closePath(); ctx.fill();

            // Hốc mắt tối đen sâu thẳm của Artorias (Bị Vực Thẳm nuốt chửng)
            ctx.fillStyle = "#06070C";
            ctx.beginPath();
            ctx.moveTo(cxb - 3, y + 7); ctx.lineTo(cxb + 11, y + 9);
            ctx.lineTo(cxb + 6, y + 13); ctx.lineTo(cxb - 4, y + 11);
            ctx.closePath(); ctx.fill();
            // Ánh sáng tím/đỏ của Vực Thẳm lóe lên từ trong khe mũ trụ khi Buff hoặc Hú
            if (buff || b.state === 'a_howl' || b.state === 'a_buff'){
                ctx.fillStyle = b.state === 'a_howl' ? "#E040FB" : "#B388FF";
                ctx.fillRect(cxb + 2, y + 9, 6, 2.2);
            }
            // Gờ sống mũi bạc sáng trên mũ trụ
            ctx.strokeStyle = "#B0BEC5"; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(cxb + 1, y - 5); ctx.lineTo(cxb + 13, y + 11); ctx.stroke();

            // 8. CÁNH TAY PHẢI CẦM ĐẠI KIẾM SÓI (GREATSWORD OF ARTORIAS — 1 TAY UY LỰC)
            let ar = b.armR || 0;
            ctx.save();
            ctx.translate(cxb + 11, y + 22);
            ctx.rotate(ar);

            // Giáp vai phải lớn xếp lớp (Pauldron)
            ctx.fillStyle = "#5C6B8A";
            ctx.beginPath();
            ctx.moveTo(-7, -6); ctx.lineTo(10, -4); ctx.lineTo(12, 8); ctx.lineTo(-6, 7);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#90A4AE"; ctx.lineWidth = 1.2; ctx.stroke();

            // Bắp tay & Găng sắt phải nắm chuôi kiếm
            ctx.fillStyle = "#323C52"; ctx.fillRect(-4, 4, 8, 16);
            ctx.fillStyle = "#6E7F9E"; ctx.fillRect(-4.5, 18, 9, 8);

            // ==== THANH ĐẠI KIẾM CỦA ARTORIAS (WOLF KNIGHT'S GREATSWORD) ====
            ctx.save();
            ctx.translate(0, 23);
            ctx.rotate((b.swordAngle !== undefined) ? b.swordAngle : -1.05);

            // Chuôi kiếm dài & Quả đấm đuôi kiếm (Pommel) hình thoi bạc
            ctx.fillStyle = "#263238"; ctx.fillRect(-2.5, 0, 5, 15);
            ctx.fillStyle = "#78909C";
            ctx.beginPath(); ctx.moveTo(0, 21); ctx.lineTo(-5, 16); ctx.lineTo(0, 12); ctx.lineTo(5, 16); ctx.closePath(); ctx.fill();

            // Hộ thủ (Crossguard) dày có 2 vòng khuyết đối xứng hình số 8 đặc trưng của Greatsword of Artorias!
            ctx.fillStyle = "#546E7A";
            ctx.beginPath();
            ctx.moveTo(-16, -2); ctx.lineTo(-13, -8); ctx.lineTo(13, -8); ctx.lineTo(16, -2);
            ctx.lineTo(11, 1); ctx.lineTo(-11, 1);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#B0BEC5"; ctx.lineWidth = 1.3; ctx.stroke();
            // Hai lỗ khuyết tròn trên hộ thủ
            ctx.fillStyle = "#101522";
            ctx.beginPath(); ctx.arc(-7, -4, 2.2, 0, 6.28); ctx.arc(7, -4, 2.2, 0, 6.28); ctx.fill();

            // Phần gốc lưỡi kiếm to bản (Ricasso) có hoa văn khắc chìm
            ctx.fillStyle = "#455A64";
            ctx.fillRect(-7.5, -24, 15, 16);
            ctx.strokeStyle = "#90A4AE"; ctx.lineWidth = 1.1;
            ctx.strokeRect(-5.5, -22, 11, 12);

            // Lưỡi Đại Kiếm dài to bản bị Vực Thẳm ăn mòn (Cursed Greatsword Blade)
            let bladeGrad = ctx.createLinearGradient(0, -24, 0, -108);
            if (buff){
                bladeGrad.addColorStop(0, "#D1C4E9");
                bladeGrad.addColorStop(0.5, "#7E57C2");
                bladeGrad.addColorStop(1, "#311B92");
            } else {
                bladeGrad.addColorStop(0, "#CFD8DC");
                bladeGrad.addColorStop(0.55, "#78909C");
                bladeGrad.addColorStop(1, "#37474F");
            }
            ctx.fillStyle = bladeGrad;
            ctx.beginPath();
            ctx.moveTo(-7, -24);
            ctx.lineTo(-6.2, -88);
            ctx.lineTo(0, -108); // Mũi đại kiếm vươn dài uy lực
            ctx.lineTo(6.2, -88);
            ctx.lineTo(7, -24);
            ctx.closePath(); ctx.fill();

            // Viền lưỡi kiếm sắc sáng
            ctx.strokeStyle = buff ? "#EDE7F6" : "#ECEFF1";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Rãnh máu đen / Vết ăn mòn Vực Thẳm dọc giữa thân kiếm
            ctx.fillStyle = buff ? "#1A0933" : "#1C2430";
            ctx.fillRect(-2.2, -92, 4.4, 68);
            if (buff){
                ctx.fillStyle = "#B388FF";
                ctx.fillRect(-0.8, -88, 1.6, 60);
            }
            ctx.restore();
            ctx.restore();

            ctx.restore();
        }
// BOSS_PART_END s0.drawArtoriasBody.1

// Nguồn: index.html:100013 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:100024 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
