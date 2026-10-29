// BOSS_FILE: EmberWolfBoss
// BOSS_SNAPSHOT: 727b7298f5725557e84ed20d1375204ce421ac8161e96654772477c0b6e53e0c
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, parryX, pickFromBag, shakeTimer, visualEffects
// Nguồn: index.html:206 · Dùng bởi: DragonLordBoss, EmberWolfBoss, FlameCoreBoss, FlameLancerBoss, GreatApeBoss, MagmorBoss, QuetzalBoss
// BOSS_PART_BEGIN s0.GWAVE_H.1 READ_ONLY
const GWAVE_H = 96, GWAVE_SPD = 11.5;
// BOSS_PART_END s0.GWAVE_H.1

// Nguồn: index.html:37100 · Dùng bởi: EmberWolfBoss
// BOSS_PART_BEGIN s1.EmberWolfBoss.1 EDITABLE
class EmberWolfBoss {
            constructor(level){
                this.name = "HOA LANG"; this.hp = 150; this.maxHp = 150;
                this.w = 104; this.h = 62; this.baseY = 320 - this.h;
                this.x = canvas.width - 200; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.actionTimer = 40; this.facingLeft = true;
                this.retState = 'idle'; this.lastSkill = ''; this.atkBag = []; this.invulnAll = false;
                this.burnTimer = 0; this.lastMeleeHit = -1;
                this.comboN = 0; this.trail = []; this.howlT = 0;
                this.lunge = 0; this.jaw = 0; this.clawSide = 1; this.gait = 0; this.crouch = 0; this.spin = 0; this.burstFx = 0; this.burstR = 120;
                heatInit(this, 13);
            }
            physics(){ this.dy += 0.85; this.y += this.dy;
                if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x)); }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = Math.round(t * heatRate(this)); }
            gapToP(){ return (dino.x + dino.w/2) - this.cx(); }
            // NO BUNG quanh soi: chi kich hoat khi nhiet da len moc cao -> chieu duoc NANG CAP
            canBurst(){ return heatTier(this) >= 1 && this.burnoutT <= 0; }   // tu moc nhiet 1 da no
            burst(R, dmg){
                R = Math.round(R * (heatTier(this) === 2 ? 1.9 : 1.5));      // TO HON HAN
                let cx0 = this.cx(), cy0 = this.cy();
                if (checkAABB(dino, { x: cx0 - R, y: cy0 - R, w: R*2, h: R*2 })) this.hurtP(dmg || 1);
                visualEffects.push(new Effect(cx0, cy0, 'explosion', true, R));
                for (let k = 0; k < 9; k++)
                    visualEffects.push(new Effect(cx0 + Math.cos(k*0.7)*R*0.72, cy0 + Math.sin(k*0.7)*R*0.72, 'explosion', true, R*0.4));
                this.burstFx = 22; this.burstR = R; shakeTimer = Math.max(shakeTimer, 32);
                if (SFX.bossExplode) SFX.bossExplode();
            }
            // BAO TRUOC vong no: goi trong pha nap de nguoi choi kip lui ra
            drawBurstWarn(R){
                if (!this.canBurst()) return;
                R = Math.round(R * (heatTier(this) === 2 ? 1.9 : 1.5));
                ctx.save();
                ctx.globalAlpha = 0.16 + 0.2 * Math.abs(Math.sin(frames * 0.3));
                ctx.fillStyle = "#FF6D00"; ctx.beginPath(); ctx.arc(this.cx(), this.cy(), R, 0, Math.PI*2); ctx.fill();
                ctx.globalAlpha = 0.85;
                ctx.strokeStyle = (frames % 8 < 4) ? "#FFEB3B" : "#FF3D00"; ctx.lineWidth = 4;
                ctx.setLineDash([12, 9]);
                ctx.beginPath(); ctx.arc(this.cx(), this.cy(), R, 0, Math.PI*2); ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
            }
            // vung MOM: don can nam ngay truoc mat, tam NGAN
            jawRect(){ let d = this.dir(); return { x: d < 0 ? this.x - 56 : this.x + this.w - 6, y: this.y + 6, w: 62, h: 44 }; }
            update(){
                this.gait += (this.state === 'stalk' ? 0.22 : 0.1);
                for (let i = this.trail.length - 1; i >= 0; i--){
                    let f = this.trail[i]; f.t--;
                    if (f.t <= 0){ this.trail.splice(i,1); continue; }
                    if (f.t > 30 && checkAABB(dino, { x: f.x - 20, y: 290, w: 40, h: 36 })){
                        if (!dino.isShielding()){ if (frames % 18 === 0) dino.takeDamage(1); }
                        else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                    }
                }
                if (this.jaw > 0) this.jaw--;
                if (this.burstFx > 0) this.burstFx--;
                if (this.state === 'entering'){ this.physics(); this.x -= 5; if (this.x < canvas.width - 240) this.toIdle(26); return; }
                if (heatTick(this)){ this.physics(); this.crouch = Math.min(16, this.crouch + 1); return; }
                this.crouch = Math.max(0, this.crouch - 1);
                this.physics();
                if (this.state === 'idle'){
                    this.faceP(); this.actionTimer--;
                    if (this.actionTimer <= 0){
                        let far = Math.abs(this.gapToP()) > 260;
                        // O XA thi PHAI ap sat truoc — thu du khong bao gio ban tu xa
                        let c = far ? pickFromBag(this, ['stalk','moon']) : pickFromBag(this, ['maul','rend','leap','howl','flip','moon','stalk']);
                        heatAdd(this, far ? 4 : undefined);
                        if (c === 'stalk'){ this.state = 'stalk'; this.subTimer = 60; }
                        else if (c === 'maul'){ this.state = 'ml_prep'; this.subTimer = Math.round(20 * heatRate(this)); this.comboN = 2 + heatTier(this); }
                        else if (c === 'rend'){ this.state = 'rn_prep'; this.subTimer = 22; this.comboN = 3 + heatTier(this); this.clawSide = 1; }
                        else if (c === 'leap'){ this.state = 'lp_prep'; this.subTimer = 26; }
                        else if (c === 'flip'){ this.state = 'fl_rake'; this.subTimer = 26; this.spin = 0; }
                        else if (c === 'moon'){ this.state = 'mn_prep'; this.subTimer = 30; this.spin = 0; }
                        else { this.state = 'howl_go'; this.subTimer = 64; this.howlT = 0; }
                    }
                    return;
                }
                // ---- RINH: chay sat dat ve phia nguoi choi, KHONG gay dmg, de vao tam can ----
                if (this.state === 'stalk'){
                    this.subTimer--; this.faceP();
                    let g = this.gapToP();
                    this.x += Math.sign(g) * (5.2 + heatTier(this) * 1.4);
                    if (Math.abs(g) < 150 || this.subTimer <= 0) this.toIdle(10);
                    return;
                }
                // ---- VO CAN: chuoi lao NGAN 130px moi nhip, moi nhip mot cu ngoam ----
                if (this.state === 'ml_prep'){ this.faceP(); this.subTimer--; this.crouch = Math.min(10, this.crouch + 2);
                    if (this.subTimer <= 0){ this.state = 'ml_go'; this.subTimer = 15; this.lunge = this.dir(); this.crouch = 0;
                        if (SFX.bossSkill) SFX.bossSkill(); } return; }
                if (this.state === 'ml_go'){
                    this.subTimer--;
                    this.x += this.lunge * 9.5;                       // NGAN: 15 frame x 9,5 = ~140px
                    if (heatTier(this) >= 1 && this.subTimer % 6 === 0) this.trail.push({ x: this.cx(), t: 80 });
                    if (this.subTimer === 8){ this.jaw = 10; if (checkAABB(dino, this.jawRect())) this.hurtP(1); }
                    if (this.subTimer <= 0){
                        this.comboN--;
                        if (this.comboN > 0){ this.state = 'ml_prep'; this.subTimer = 10; }
                        else { if (this.canBurst()) this.burst(96, 1); this.toIdle(40); }   // NANG CAP: cu chot NO tung
                    }
                    return;
                }
                // ---- XE: dung yen tai cho, vut vuot trai-phai lien tuc (ap sat) ----
                if (this.state === 'rn_prep'){ this.faceP(); this.subTimer--;
                    if (this.subTimer <= 0){ this.state = 'rn_go'; this.subTimer = 14; } return; }
                if (this.state === 'rn_go'){
                    this.subTimer--;
                    let g = this.gapToP();
                    if (Math.abs(g) > 90) this.x += Math.sign(g) * 3.4;    // bam sat, khong cho thoat
                    if (this.subTimer === 7){
                        let d = this.dir();
                        let r = { x: d < 0 ? this.x - 74 : this.x + this.w - 10, y: this.y - 6 + (this.clawSide > 0 ? 0 : 26), w: 84, h: 40 };
                        if (checkAABB(dino, r)) this.hurtP(1);
                        visualEffects.push(new Effect(d < 0 ? this.x - 30 : this.x + this.w + 30, this.y + 20 + (this.clawSide > 0 ? 0 : 24), 'parry', d < 0));
                        this.clawSide *= -1;
                    }
                    if (this.subTimer <= 0){
                        this.comboN--;
                        if (this.comboN > 0) this.subTimer = 14;
                        else { if (this.canBurst()) this.burst(86, 1); this.toIdle(42); }
                    }
                    return;
                }
                // ---- PHONG: nhay cau vong ngan dap xuong ----
                if (this.state === 'lp_prep'){ this.faceP(); this.subTimer--; this.crouch = Math.min(14, this.crouch + 2);
                    if (this.subTimer <= 0){ this.state = 'lp_air'; this.dy = -13; this.crouch = 0;
                        this.lpVx = Math.max(-9, Math.min(9, this.gapToP() / 28)); if (SFX.bossSkill) SFX.bossSkill(); } return; }
                if (this.state === 'lp_air'){
                    this.x += this.lpVx;
                    if (checkAABB(dino, this)) this.hurtP(1);
                    if (this.grounded){
                        visualEffects.push(new Effect(this.cx(), 316, 'explosion', true, 64)); shakeTimer = 30;
                        for (let k = -2; k <= 2; k++) visualEffects.push(new Effect(this.cx() + k * 56, 308, 'explosion', true, 30));
                        if (checkAABB(dino, { x: this.cx() - 150, y: 250, w: 300, h: 76 })) this.hurtP(1);
                        for (let k = -1; k <= 1; k += 2){
                            let bp = new BossProjectile(this.cx(), 322 - GWAVE_H, k * GWAVE_SPD, 0, true, 1);
                            bp.w = 46; bp.h = GWAVE_H; bp.color = "#FF7043"; bp.crescent = true; bossProjectiles.push(bp);
                        }
                        this.trail.push({ x: this.cx(), t: 90 });
                        if (this.canBurst()){
                            this.trail.push({ x: this.cx() - 60, t: 80 }); this.trail.push({ x: this.cx() + 60, t: 80 });
                            this.burst(130, 1);                                  // NANG CAP: no lan ca vung
                        }
                        this.state = 'lp_land'; this.subTimer = 16;
                    }
                    return;
                }
                if (this.state === 'lp_land'){ this.subTimer--; if (this.subTimer <= 0) this.toIdle(38); return; }
                // ---- NGUYET TRAM: nhay len XOAY MOT VONG roi bo LUOI DAO BAN NGUYET cheo xuong ----
                if (this.state === 'mn_prep'){ this.faceP(); this.subTimer--; this.crouch = Math.min(14, this.crouch + 2);
                    if (this.subTimer <= 0){ this.state = 'mn_air'; this.dy = -15; this.crouch = 0; this.spin = 0;
                        if (SFX.bossSkill) SFX.bossSkill(); } return; }
                if (this.state === 'mn_air'){
                    this.spin += 0.34;
                    this.x -= this.dir() * 1.6;                       // hoi giat lui khi xoay
                    if (this.dy > -2){                                 // toi dinh -> CHEM
                        // LOI CU: kep goc ve [0.25, PI-0.25] lam moi goc AM (nguoi choi o tren) bi ep ve 0.25
                        //          => luoi luon bay SANG PHAI du boss quay trai. Gio ep theo TRUC DOC,
                        //          giu nguyen dau cua truc ngang nen huong bay luon dung.
                        let ddx = (dino.x + dino.w/2) - this.cx();
                        let ddy = (dino.y + dino.h/2) - this.cy();
                        if (Math.abs(ddx) < 40) ddx = (this.facingLeft ? -40 : 40);
                        if (ddy < 60) ddy = 60;                        // luon chem CHEO XUONG
                        let ang = Math.atan2(ddy, ddx);
                        let sp = 8.4, n = heatTier(this) >= 1 ? 2 : 1;
                        for (let k = 0; k < n; k++){
                            let aa = ang + (k - (n-1)/2) * 0.22;
                            let bp = new BossProjectile(this.cx(), this.cy(), Math.cos(aa)*sp, Math.sin(aa)*sp, false, 1);
                            bp.w = 46; bp.h = 150; bp.color = "#FFEB3B"; bp.crescent = true; bossProjectiles.push(bp);
                        }
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 52));
                        shakeTimer = Math.max(shakeTimer, 24);
                        if (SFX.bossExplode) SFX.bossExplode();
                        this.state = 'mn_fall'; this.subTimer = 40;
                    }
                    return;
                }
                if (this.state === 'mn_fall'){
                    this.spin += 0.2; this.subTimer--;
                    if (this.grounded){ this.spin = 0; if (this.canBurst()) this.burst(80, 1); this.toIdle(44); }
                    else if (this.subTimer <= 0){ this.spin = 0; this.toIdle(44); }
                    return;
                }
                // ---- LON NGUOC: vua CAO ve truoc vua LUI xa, roi CHUONG hoa cau lon ----
                if (this.state === 'fl_rake'){
                    this.subTimer--; this.spin += 0.42;
                    let d = this.dir();
                    this.x -= d * 7.5;                                  // LUI ra xa nguoi choi
                    this.dy = Math.min(this.dy, -3.2);                  // nay len trong luc lon
                    if (this.subTimer === 18 || this.subTimer === 10){  // hai nhat cao ve PHIA TRUOC
                        let r = { x: d < 0 ? this.x - 96 : this.x + this.w - 6, y: this.y - 8, w: 100, h: 62 };
                        if (checkAABB(dino, r)) this.hurtP(1);
                        visualEffects.push(new Effect(d < 0 ? this.x - 40 : this.x + this.w + 40, this.y + 22, 'parry', d < 0));
                    }
                    if (this.subTimer <= 0){ this.spin = 0; this.state = 'fl_charge'; this.subTimer = 44; }
                    return;
                }
                if (this.state === 'fl_charge'){
                    this.subTimer--; this.faceP();
                    if (this.subTimer <= 0){
                        let a = Math.atan2((dino.y + dino.h/2) - (this.y + 26), (dino.x + dino.w/2) - this.cx());
                        let sp = 10.5, n = 1 + (heatTier(this) >= 1 ? 2 : 0);
                        for (let k = 0; k < n; k++){
                            let aa = a + (k - (n-1)/2) * 0.2;
                            let bp = new BossProjectile(this.cx(), this.y + 26, Math.cos(aa)*sp, Math.sin(aa)*sp, false, 1);
                            bp.w = 48; bp.h = 48; bp.color = "#FF6D00"; bp.comet = true; bossProjectiles.push(bp);
                        }
                        visualEffects.push(new Effect(this.cx(), this.y + 26, 'explosion', true, 44));
                        shakeTimer = Math.max(shakeTimer, 18); if (SFX.bossExplode) SFX.bossExplode();
                        if (this.canBurst()) this.burst(90, 1);                  // NANG CAP: no giat lui quanh minh
                        this.toIdle(48);
                    }
                    return;
                }
                // ---- GAM: tu dot de nap nhiet ----
                if (this.state === 'howl_go'){
                    this.subTimer--; this.howlT++;
                    if (this.subTimer % 10 === 0) heatAdd(this, 6);
                    if (this.subTimer % 12 === 0) visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 18));
                    if (this.subTimer <= 0) this.toIdle(26);
                    return;
                }
            }
            draw(){
                let x = this.x, y = this.y + this.crouch, t = heatTier(this), out = this.burnoutT > 0;
                for (let f of this.trail){
                    let a = Math.min(1, f.t / 30);
                    ctx.save(); ctx.globalAlpha = a * (f.t > 30 ? 0.9 : 0.4);
                    ctx.fillStyle = f.t > 30 ? "#FF6D00" : "#3E2723";
                    ctx.beginPath(); ctx.ellipse(f.x, 316, 20, 7, 0, 0, Math.PI*2); ctx.fill();
                    if (f.t > 30){ ctx.fillStyle = "#FFEB3B";
                        ctx.beginPath(); ctx.moveTo(f.x - 7, 316); ctx.quadraticCurveTo(f.x, 302 - Math.sin(frames*0.4 + f.x)*5, f.x + 7, 316); ctx.closePath(); ctx.fill(); }
                    ctx.restore();
                }
                let fur  = out ? "#37474F" : ["#4E342E", "#5D2A15", "#7B2412"][t];
                let furD = out ? "#263238" : ["#2E1A12", "#3E1008", "#4E1008"][t];
                let mane = out ? "#78909C" : ["#FF7043", "#FF5722", "#FFEB3B"][t];
                ctx.save();
                if (this.state === 'ml_go'){ ctx.globalAlpha = 0.3;
                    for (let k = 1; k <= 3; k++){ ctx.fillStyle = furD;
                        ctx.beginPath(); ctx.ellipse(this.cx() - this.lunge*k*20, y + 34, 44, 18, 0, 0, Math.PI*2); ctx.fill(); }
                    ctx.globalAlpha = 1; }
                ctx.translate(x + this.w/2, y + this.h/2);
                if (this.spin) ctx.rotate(this.spin * (this.facingLeft ? 1 : -1));   // LON NGUOC: xoay ca than
                ctx.scale(this.facingLeft ? 1 : -1, 1); ctx.translate(-(x + this.w/2), -(y + this.h/2));
                // ----- CHAN SAU -----
                for (let k = 0; k < 2; k++){
                    let sw = Math.sin(this.gait + k*2.6) * (this.state === 'ml_go' ? 12 : 5);
                    ctx.fillStyle = furD;
                    ctx.beginPath(); ctx.moveTo(x + 70 + k*10, y + 34);
                    ctx.quadraticCurveTo(x + 84 + k*10 + sw, y + 46, x + 76 + k*10 + sw, y + 60); 
                    ctx.lineTo(x + 66 + k*10 + sw, y + 60); ctx.quadraticCurveTo(x + 72 + k*10, y + 46, x + 62 + k*10, y + 36);
                    ctx.closePath(); ctx.fill();
                }
                // ----- THAN: lung vong cung, bung thon -----
                ctx.fillStyle = fur;
                ctx.beginPath();
                ctx.moveTo(x + 16, y + 30);
                ctx.quadraticCurveTo(x + 30, y + 12, x + 56, y + 14);      // lung truoc
                ctx.quadraticCurveTo(x + 82, y + 16, x + 94, y + 30);      // hong
                ctx.quadraticCurveTo(x + 86, y + 48, x + 56, y + 46);      // bung
                ctx.quadraticCurveTo(x + 30, y + 44, x + 16, y + 30);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#150A05"; ctx.lineWidth = 3; ctx.stroke();
                // ----- CHAN TRUOC -----
                for (let k = 0; k < 2; k++){
                    let sw = Math.sin(this.gait + 1.4 + k*2.6) * (this.state === 'ml_go' ? 13 : 5);
                    ctx.fillStyle = k ? furD : fur;
                    ctx.beginPath(); ctx.moveTo(x + 24 + k*9, y + 34);
                    ctx.quadraticCurveTo(x + 20 + k*9 + sw, y + 48, x + 26 + k*9 + sw, y + 60);
                    ctx.lineTo(x + 36 + k*9 + sw, y + 60); ctx.quadraticCurveTo(x + 32 + k*9, y + 46, x + 36 + k*9, y + 34);
                    ctx.closePath(); ctx.fill(); ctx.stroke();
                    // vuot
                    ctx.strokeStyle = "#FFCCBC"; ctx.lineWidth = 2;
                    for (let c2 = 0; c2 < 3; c2++){ ctx.beginPath();
                        ctx.moveTo(x + 26 + k*9 + sw + c2*4, y + 60); ctx.lineTo(x + 22 + k*9 + sw + c2*4, y + 66); ctx.stroke(); }
                    ctx.strokeStyle = "#150A05"; ctx.lineWidth = 3;
                }
                // ----- BOM LUA CHAY DOC SONG LUNG -----
                for (let k = 0; k < 9; k++){
                    let mx = x + 22 + k*8, hgt = (out ? 4 : 10 + t*8) + Math.sin(frames*0.34 + k*0.7)*5;
                    ctx.fillStyle = k % 2 ? mane : "#FF8A65";
                    ctx.beginPath(); ctx.moveTo(mx - 6, y + 18);
                    ctx.quadraticCurveTo(mx - 2, y + 18 - hgt, mx + 3, y + 18 - hgt*0.4);
                    ctx.quadraticCurveTo(mx + 5, y + 18 - hgt*0.2, mx + 6, y + 18);
                    ctx.closePath(); ctx.fill();
                }
                // ----- CO + DAU -----
                ctx.fillStyle = fur;
                ctx.beginPath(); ctx.moveTo(x + 22, y + 24); ctx.quadraticCurveTo(x + 10, y + 20, x + 2, y + 26);
                ctx.quadraticCurveTo(x + 10, y + 40, x + 24, y + 38); ctx.closePath(); ctx.fill(); ctx.stroke();
                // so
                ctx.beginPath(); ctx.ellipse(x + 8, y + 28, 17, 13, -0.18, 0, Math.PI*2); ctx.fill(); ctx.stroke();
                // TAI nhon
                ctx.fillStyle = furD;
                ctx.beginPath(); ctx.moveTo(x + 12, y + 18); ctx.lineTo(x + 6, y + 2); ctx.lineTo(x + 22, y + 14); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(x + 22, y + 16); ctx.lineTo(x + 20, y + 0); ctx.lineTo(x + 32, y + 14); ctx.closePath(); ctx.fill(); ctx.stroke();
                // MOM: ha ra khi can
                let jw = this.jaw > 0 ? 13 : 3;
                ctx.fillStyle = fur;
                ctx.beginPath(); ctx.moveTo(x + 2, y + 24); ctx.lineTo(x - 22, y + 24 - jw*0.5); ctx.lineTo(x - 4, y + 30); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(x + 2, y + 32); ctx.lineTo(x - 20, y + 34 + jw); ctx.lineTo(x - 2, y + 36); ctx.closePath(); ctx.fill(); ctx.stroke();
                // rang nanh
                ctx.fillStyle = "#FFF3E0";
                for (let k = 0; k < 3; k++){
                    ctx.beginPath(); ctx.moveTo(x - 4 - k*6, y + 26); ctx.lineTo(x - 7 - k*6, y + 33); ctx.lineTo(x - 1 - k*6, y + 28); ctx.closePath(); ctx.fill();
                    ctx.beginPath(); ctx.moveTo(x - 3 - k*6, y + 34 + jw*0.7); ctx.lineTo(x - 6 - k*6, y + 28 + jw*0.7); ctx.lineTo(x - 0 - k*6, y + 32 + jw*0.7); ctx.closePath(); ctx.fill();
                }
                // hong lua trong mom
                if (this.jaw > 0){ ctx.fillStyle = "#FFEB3B"; ctx.globalAlpha = 0.8;
                    ctx.beginPath(); ctx.ellipse(x - 8, y + 30, 10, 5 + jw*0.4, 0, 0, Math.PI*2); ctx.fill(); ctx.globalAlpha = 1; }
                // MAT
                ctx.fillStyle = out ? "#37474F" : "#FFEB3B";
                ctx.beginPath(); ctx.moveTo(x + 2, y + 22); ctx.lineTo(x + 14, y + 20); ctx.lineTo(x + 12, y + 26); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#000"; ctx.fillRect(x + 7, y + 22, 4, 2);
                // ----- DUOI lua -----
                ctx.strokeStyle = mane; ctx.lineWidth = 7; ctx.lineCap = "round";
                ctx.beginPath(); ctx.moveTo(x + 94, y + 28);
                ctx.quadraticCurveTo(x + 116, y + 16 + Math.sin(frames*0.2)*9, x + 130, y + Math.sin(frames*0.2)*6);
                ctx.stroke();
                ctx.strokeStyle = "#FFEB3B"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(x + 100, y + 24); ctx.quadraticCurveTo(x + 118, y + 14, x + 128, y + 2); ctx.stroke();
                ctx.restore();
                // ---- canh bao ----
                if (this.state === 'ml_prep') this.drawBurstWarn(96);
                if (this.state === 'rn_prep') this.drawBurstWarn(86);
                if (this.state === 'lp_prep') this.drawBurstWarn(130);
                if (this.state === 'fl_charge') this.drawBurstWarn(90);
                if (this.state === 'mn_prep'){
                    ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3; ctx.setLineDash([9,9]);
                    ctx.beginPath(); ctx.moveTo(this.cx(), this.cy() - 60); ctx.lineTo(dino.x + dino.w/2, dino.y + dino.h/2); ctx.stroke(); ctx.setLineDash([]);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("NGUYỆT TRẢM — LƯỠI ĐAO CHÉO!", this.cx(), this.y - 40); ctx.textAlign = "left";
                }
                if (this.state === 'ml_prep'){
                    let d = this.dir();
                    ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,87,34,0.32)" : "rgba(255,87,34,0.12)";
                    ctx.fillRect(d < 0 ? this.x - 150 : this.x + this.w, this.y + 6, 150, this.h - 10);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("VỒ CẮN x" + this.comboN, this.cx(), this.y - 40); ctx.textAlign = "left";
                }
                if (this.state === 'rn_prep' || this.state === 'rn_go'){
                    let d = this.dir();
                    ctx.fillStyle = "rgba(255,87,34,0.24)";
                    ctx.fillRect(d < 0 ? this.x - 84 : this.x + this.w - 10, this.y - 6, 84, 66);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("XÉ x" + this.comboN, this.cx(), this.y - 40); ctx.textAlign = "left";
                }
                if (this.state === 'lp_prep'){
                    ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3; ctx.setLineDash([7,7]);
                    ctx.beginPath(); ctx.moveTo(this.cx(), this.cy()); ctx.lineTo(dino.x + dino.w/2, 302); ctx.stroke(); ctx.setLineDash([]);
                    ctx.fillStyle = "rgba(255,87,34,0.2)"; ctx.fillRect(dino.x + dino.w/2 - 150, 250, 300, 76);
                    ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3; ctx.strokeRect(dino.x + dino.w/2 - 150, 250, 300, 76);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("NHẢY NỔ CẢ KHU!", this.cx(), this.y - 40); ctx.textAlign = "left";
                }
                if (this.state === 'fl_rake'){
                    let d = this.dir();
                    ctx.fillStyle = "rgba(255,87,34,0.28)";
                    ctx.fillRect(d < 0 ? this.x - 96 : this.x + this.w - 6, this.y - 8, 100, 62);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("LỘN NGƯỢC — CÀO!", this.cx(), this.y - 40); ctx.textAlign = "left";
                }
                if (this.state === 'fl_charge'){
                    let k = 1 - this.subTimer / 44;
                    ctx.fillStyle = "rgba(255,109,0," + (0.35 + 0.5*k).toFixed(2) + ")";
                    ctx.beginPath(); ctx.arc(this.cx(), this.y + 26, 10 + 30*k, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFF9C4";
                    ctx.beginPath(); ctx.arc(this.cx(), this.y + 26, 5 + 14*k, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3; ctx.setLineDash([9,9]);
                    ctx.beginPath(); ctx.moveTo(this.cx(), this.y + 26); ctx.lineTo(dino.x + dino.w/2, dino.y + dino.h/2); ctx.stroke(); ctx.setLineDash([]);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("CHƯỞNG HOẢ CẦU!", this.cx(), this.y - 40); ctx.textAlign = "left";
                }
                if (this.state === 'stalk'){
                    ctx.fillStyle = "#FF8A65"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("ĐANG ÁP SÁT...", this.cx(), this.y - 40); ctx.textAlign = "left";
                }
                if (this.state === 'howl_go'){
                    ctx.strokeStyle = "rgba(255,152,0," + (0.3 + 0.4*Math.abs(Math.sin(frames*0.2))) + ")"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 40 + (this.howlT % 40), 0, Math.PI*2); ctx.stroke();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("GẦM — TỰ ĐỐT!", this.cx(), this.y - 40); ctx.textAlign = "left";
                }
                if (this.burstFx > 0){
                    let k = this.burstFx / 22, R = this.burstR || 120;
                    ctx.save(); ctx.globalAlpha = k;
                    ctx.fillStyle = "rgba(255,109,0,0.35)";
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), R * (1 - k*0.5), 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#FFEB3B"; ctx.lineWidth = 6 + 8*k;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), R * (1 - k) + 20, 0, Math.PI*2); ctx.stroke();
                    ctx.strokeStyle = "#FF3D00"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), R * (1 - k) + 46, 0, Math.PI*2); ctx.stroke();
                    ctx.restore();
                }
                if (this.canBurst()){
                    ctx.save(); ctx.globalAlpha = 0.35 + 0.3*Math.abs(Math.sin(frames*0.22));
                    ctx.strokeStyle = "#FFEB3B"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 78, 0, Math.PI*2); ctx.stroke();
                    ctx.restore();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("CUỒNG NỘ — ĐÒN CÓ NỔ LAN", this.cx(), this.y - 52); ctx.textAlign = "left";
                }
                drawHeatBar(this);
                // ctx.fillStyle = "black"; ctx.fillRect(this.x, this.y - 12, this.w, 7);
                // ctx.fillStyle = "#FF5252"; ctx.fillRect(this.x + 1, this.y - 11, (this.w - 2) * Math.max(0, this.hp / this.maxHp), 5);
            }
        }
// BOSS_PART_END s1.EmberWolfBoss.1

// Nguồn: index.html:42969 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.HEAT_MAX.1 READ_ONLY
const HEAT_MAX = 100, HEAT_DECAY = 0.16, HEAT_BURNOUT = 170;
// BOSS_PART_END s1.HEAT_MAX.1

// Nguồn: index.html:42970 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatInit.1 READ_ONLY
function heatInit(b, gain) { b.heat = 0; b.heatGain = gain; b.burnoutT = 0; b.dmgMul = 1; }
// BOSS_PART_END s1.heatInit.1

// Nguồn: index.html:42971 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatTier.1 READ_ONLY
function heatTier(b) { return b.heat >= 75 ? 2 : (b.heat >= 40 ? 1 : 0); }
// BOSS_PART_END s1.heatTier.1

// Nguồn: index.html:42973 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatRate.1 READ_ONLY
function heatRate(b) { return [1, 0.78, 0.58][heatTier(b)]; }
// BOSS_PART_END s1.heatRate.1

// Nguồn: index.html:42974 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatAdd.1 READ_ONLY
function heatAdd(b, n) {
            if (b.burnoutT > 0) return;
            b.heat = Math.min(HEAT_MAX, b.heat + (n === undefined ? b.heatGain : n));
            if (b.heat >= HEAT_MAX) heatBurnout(b);
        }
// BOSS_PART_END s1.heatAdd.1

// Nguồn: index.html:42979 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatBurnout.1 READ_ONLY
function heatBurnout(b) {
            b.heat = 0; b.burnoutT = HEAT_BURNOUT; b.dmgMul = 2;
            b.state = 'burnout'; b.subTimer = 0;
            floatingTexts.push(new FloatingText(b.x - 20, b.y - 30, "BÙNG CHÁY... TÀN!"));
            visualEffects.push(new Effect(b.x + b.w / 2, b.y + b.h / 2, 'explosion', true, 70));
            shakeTimer = Math.max(shakeTimer, 30);
            if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
        }
// BOSS_PART_END s1.heatBurnout.1

// Nguồn: index.html:42988 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatTick.1 READ_ONLY
function heatTick(b) {
            if (b.burnoutT > 0) {
                b.burnoutT--;
                if (b.burnoutT <= 0) {
                    b.dmgMul = 1; b.state = 'idle'; b.actionTimer = 24;
                    floatingTexts.push(new FloatingText(b.x - 14, b.y - 30, "CHÁY LẠI!"));
                    visualEffects.push(new Effect(b.x + b.w / 2, b.y + b.h / 2, 'explosion', true, 44));
                }
                return true;
            }
            if (b.heat > 0) b.heat = Math.max(0, b.heat - HEAT_DECAY);
            return false;
        }
// BOSS_PART_END s1.heatTick.1

// Nguồn: index.html:43001 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.drawHeatBar.1 READ_ONLY
function drawHeatBar(b) {
            let w = 96, x = b.x + b.w / 2 - w / 2, y = b.y - 26;
            let t = heatTier(b), col = b.burnoutT > 0 ? "#546E7A" : ["#FF9800", "#FF5722", "#FFEB3B"][t];
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(x, y, w, 7);
            if (b.burnoutT > 0) {
                ctx.fillStyle = "#455A64"; ctx.fillRect(x, y, w * (b.burnoutT / HEAT_BURNOUT), 7);
                ctx.fillStyle = "#90A4AE"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText("TÀN — SƠ HỞ! x2 DMG", b.x + b.w / 2, y - 4);
            } else {
                ctx.fillStyle = col; ctx.fillRect(x, y, w * (b.heat / HEAT_MAX), 7);
                if (t === 2) { ctx.strokeStyle = (frames % 8 < 4) ? "#FFEB3B" : "#FF5722"; ctx.lineWidth = 2; ctx.strokeRect(x - 1, y - 1, w + 2, 9); }
            }
            ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, 7);
            for (let m of [40, 75]) { ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.fillRect(x + w * m / 100, y - 2, 1, 11); }
            ctx.textAlign = "left"; ctx.restore();
        }
// BOSS_PART_END s1.drawHeatBar.1

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
