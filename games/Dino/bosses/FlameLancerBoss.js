// BOSS_FILE: FlameLancerBoss
// BOSS_SNAPSHOT: 727b7298f5725557e84ed20d1375204ce421ac8161e96654772477c0b6e53e0c
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, parryX, pickFromBag, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:206 · Dùng bởi: DragonLordBoss, EmberWolfBoss, FlameCoreBoss, FlameLancerBoss, GreatApeBoss, MagmorBoss, QuetzalBoss
// BOSS_PART_BEGIN s0.GWAVE_H.1 READ_ONLY
const GWAVE_H = 96, GWAVE_SPD = 11.5;
// BOSS_PART_END s0.GWAVE_H.1

// Nguồn: index.html:36004 · Dùng bởi: FlameLancerBoss
// BOSS_PART_BEGIN s1.FlameLancerBoss.1 EDITABLE
class FlameLancerBoss {
            constructor(level){
                this.name = "DIEM THUONG"; this.hp = 145; this.maxHp = 145;
                this.w = 54; this.h = 86; this.baseY = 320 - this.h;
                this.x = canvas.width - 220; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.actionTimer = 40; this.facingLeft = true;
                this.retState = 'idle'; this.lastSkill = ''; this.atkBag = []; this.invulnAll = false;
                this.burnTimer = 0; this.lastMeleeHit = -1;
                this.spinT = 0; this.spinCut = 0; this.blinkA = 1; this.thrustN = 0;
                this.lance = null;          // ngon thuong da phong, cam xuong dat
                this.poseAng = 0;           // goc cay thuong (dung cho moi hoat anh)
                this.poseLen = 74; this.arcFrom = 0; this.arcTo = 0; this.arcT = 0; this.aimAng = 0;
                this.cbStep = 0; this.cbT = 0;
                heatInit(this, 12);
            }
            physics(){ this.dy += 0.85; this.y += this.dy;
                if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x)); }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = Math.round(t * heatRate(this)); }
            // Goc ngam toi nguoi choi — KHONG kep ve phuong ngang, nen nhay qua dau van bi dam
            aimToP(){
                let a = Math.atan2((dino.y + dino.h/2) - this.gripY(), (dino.x + dino.w/2) - this.gripX());
                this.facingLeft = Math.cos(a) < 0;
                return a;
            }
            gripX(){ return this.cx(); }
            gripY(){ return this.y + 44; }
            // mut ngon thuong theo goc + do vuon hien tai
            tipX(){ return this.gripX() + Math.cos(this.poseAng) * this.poseLen; }
            tipY(){ return this.gripY() + Math.sin(this.poseAng) * this.poseLen; }
            // hop bao quanh CA CAY THUONG (tu tay toi mui) — dung cho ca dmg lan pha dan
            lanceBox(pad){
                let x1 = this.gripX(), y1 = this.gripY(), x2 = this.tipX(), y2 = this.tipY(), p = pad || 16;
                return { x: Math.min(x1,x2) - p, y: Math.min(y1,y2) - p, w: Math.abs(x2-x1) + p*2, h: Math.abs(y2-y1) + p*2 };
            }
            // XOAY THUONG chem nat dan cua nguoi choi
            cutBullets(r){
                for (let i = projectiles.length - 1; i >= 0; i--){
                    let pr = projectiles[i];
                    if (!pr || pr.owner !== 1) continue;
                    if (checkAABB(pr, r)){
                        visualEffects.push(new Effect(pr.x, pr.y, 'parry', this.facingLeft));
                        projectiles.splice(i, 1); this.spinCut++;
                        heatAdd(this, 2);                       // chem duoc dan thi CANG NONG
                    }
                }
            }
            update(){
                // ngon thuong da phong dang cam duoi dat
                if (this.lance){
                    this.lance.t--;
                    if (this.lance.t <= 0) this.lance = null;
                    else if (this.lance.t > 40 && checkAABB(dino, { x: this.lance.x - 16, y: 240, w: 32, h: 86 })){
                        if (!dino.isShielding()){ if (frames % 20 === 0) dino.takeDamage(1); }
                        else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                    }
                }
                if (this.state === 'entering'){ this.physics(); this.x -= 5; if (this.x < canvas.width - 230) this.toIdle(30); return; }
                if (heatTick(this)){ this.physics(); this.poseAng = 1.35; this.poseLen = 60; return; }
                this.physics();
                if (this.state === 'idle'){
                    this.faceP(); this.actionTimer--;
                    // tu the thu: thuong chech xuong phia truoc
                    this.poseAng += ((this.dir() > 0 ? -0.35 : Math.PI + 0.35) - this.poseAng) * 0.2;
                    this.poseLen += (74 - this.poseLen) * 0.2;
                    if (this.actionTimer <= 0){
                        let c = pickFromBag(this, ['spin','sweep','smash','flurry','hurl','charge','kata']);
                        heatAdd(this);
                        if (c === 'spin'){ this.state = 'spn_go'; this.subTimer = LNC_SPIN_T; this.spinCut = 0; this.spinT = 0;
                            this.spinDir = (this.cx() > canvas.width/2) ? -1 : 1; }
                        else if (c === 'sweep'){ this.state = 'swp_prep'; this.subTimer = 34; }
                        else if (c === 'smash'){ this.state = 'sms_prep'; this.subTimer = 36; }
                        else if (c === 'flurry'){ this.state = 'flr_prep'; this.subTimer = 30; this.thrustN = 2 + heatTier(this); }
                        else if (c === 'hurl'){ this.state = 'hrl_prep'; this.subTimer = 44; }
                        else if (c === 'charge'){ this.state = 'chg_prep'; this.subTimer = 40; }
                        else { this.state = 'kata'; this.cbStep = 0; this.cbT = 0; }
                    }
                    return;
                }
                // ---- XOAY THUONG: quay tit truoc mat, CHEM NAT DAN, tien cham ve phia nguoi choi ----
                if (this.state === 'spn_go'){
                    this.subTimer--; this.spinT++;
                    this.poseAng = this.spinT * (0.34 + heatTier(this) * 0.07);
                    this.poseLen = 82;
                    // CHONG CHONG DI DONG: chay gan het be ngang man trong 3 giay
                    this.x += this.spinDir * LNC_SPIN_SPD;
                    if (this.x <= 8 || this.x >= canvas.width - this.w - 8) this.spinDir *= -1;
                    this.facingLeft = this.spinDir < 0;
                    let r = this.lanceBox(20);
                    this.cutBullets(r);
                    if (checkAABB(dino, r)){ if (frames % 14 === 0) this.hurtP(1); }
                    if (this.subTimer <= 0){
                        floatingTexts.push(new FloatingText(this.x - 20, this.y - 44, "CHÉM " + this.spinCut + " ĐẠN"));
                        this.toIdle(44);
                    }
                    return;
                }
                // ================= MUA THUONG: combo 6 nhip nhu mot vo su =================
                // vung nguoc -> dap xuong -> choc (ra LUOI DAM LUA) -> xoay nua vong
                //   -> lui buoc gat -> vung ket (ra NHAT CHEM LUA)
                if (this.state === 'kata'){
                    this.cbT++;
                    let d = this.dir(), st = KATA[this.cbStep];
                    if (!st){ this.toIdle(50); return; }
                    let u = Math.min(1, this.cbT / st.t);
                    // dat tu the theo tung nhip
                    let from = st.a0 * d, to = st.a1 * d;
                    if (d < 0){ from = Math.PI - st.a0; to = Math.PI - st.a1; }
                    this.poseAng = from + (to - from) * (1 - Math.pow(1 - u, 2.2));
                    this.poseLen = st.l0 + (st.l1 - st.l0) * u;
                    this.x += d * st.mv;
                    // khung sat thuong cua cay thuong
                    if (this.cbT >= st.hit0 && this.cbT <= st.hit1){
                        if (!this.cbHit) { if (checkAABB(dino, this.lanceBox(14))) { this.hurtP(1); this.cbHit = true; } }
                    }
                    // nhip CHOC -> ban LUOI DAM LUA bay xa
                    if (st.fx === 'stab' && this.cbT === st.hit0){
                        let bp = new BossProjectile(this.tipX(), this.tipY() - 11, d * 15, 0, false, 1);
                        bp.w = 96; bp.h = 22; bp.color = "#FFF59D"; bp.spear = true;
                        bossProjectiles.push(bp);
                        visualEffects.push(new Effect(this.tipX(), this.tipY(), 'explosion', true, 26));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    // nhip KET -> ban NHAT CHEM LUA lon
                    if (st.fx === 'slash' && this.cbT === st.hit0){
                        for (let k = 0; k < (heatTier(this) === 2 ? 2 : 1); k++){
                            let bp = new BossProjectile(this.cx() + d * 50, 322 - (150 - k*30), d * (8.6 - k*1.2), 0, true, 1);
                            bp.w = 52; bp.h = 150 - k*30; bp.color = k ? "#FF8F00" : "#FFEB3B"; bp.crescent = true;
                            bossProjectiles.push(bp);
                        }
                        visualEffects.push(new Effect(this.cx() + d * 60, 250, 'explosion', true, 50));
                        shakeTimer = Math.max(shakeTimer, 24);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.cbT >= st.t){
                        this.cbStep++; this.cbT = 0; this.cbHit = false;
                        if (this.cbStep >= KATA.length) this.toIdle(56);
                        else if (KATA[this.cbStep].face) this.faceP();
                    }
                    return;
                }
                // ---- LAO DAM XUYEN: cui nguoi, lao thang QUA nguoi choi ----
                if (this.state === 'chg_prep'){ this.faceP(); this.subTimer--;
                    this.poseAng += ((this.dir() > 0 ? 0 : Math.PI) - this.poseAng) * 0.25;
                    this.poseLen += (46 - this.poseLen) * 0.22;
                    if (this.subTimer <= 0){ this.state = 'chg_go'; this.subTimer = 46; this.chgDir = this.dir();
                        this.chgHit = false; if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'chg_go'){
                    this.subTimer--;
                    this.facingLeft = this.chgDir < 0;
                    this.poseAng = this.chgDir > 0 ? 0 : Math.PI;
                    this.poseLen = 126;
                    this.x += this.chgDir * (13 + heatTier(this) * 2.5);
                    if (!this.chgHit && checkAABB(dino, this.lanceBox(10))){ this.chgHit = true; this.hurtP(1); }
                    if (this.subTimer % 5 === 0) visualEffects.push(new Effect(this.tipX(), this.tipY(), 'explosion', true, 14));
                    if (this.subTimer <= 0 || this.x <= 8 || this.x >= canvas.width - this.w - 8){
                        this.state = 'chg_end'; this.subTimer = 20;
                    }
                    return;
                }
                if (this.state === 'chg_end'){ this.subTimer--;
                    this.poseLen += (74 - this.poseLen) * 0.2;
                    if (this.subTimer <= 0) this.toIdle(44); return; }
                // ---- QUET THUONG: cung lon 180 do, tam rat rong ----
                if (this.state === 'swp_prep'){ this.faceP(); this.subTimer--;
                    this.poseAng += ((this.dir() > 0 ? -2.0 : Math.PI + 2.0) - this.poseAng) * 0.22;
                    this.poseLen += (96 - this.poseLen) * 0.2;
                    if (this.subTimer <= 0){ this.state = 'swp_go'; this.subTimer = 22; this.arcT = 0;
                        this.arcFrom = this.poseAng; this.arcTo = this.dir() > 0 ? 1.5 : Math.PI - 1.5;
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'swp_go'){
                    this.subTimer--; this.arcT++;
                    this.x += this.dir() * 4.2;                       // BUOC TOI trong luc quet
                    let u = Math.min(1, this.arcT / 16);
                    this.poseAng = this.arcFrom + (this.arcTo - this.arcFrom) * (1 - Math.pow(1 - u, 3));
                    this.poseLen = 110;
                    let r = this.lanceBox(18);
                    if (this.arcT <= 18 && checkAABB(dino, r)) this.hurtP(1);
                    // ---- SONG XUNG: nhat quet ban ra luoi lua bay XA, khong con la don tam gan ----
                    if (this.arcT === 10){
                        let d = this.dir(), n = 1 + (heatTier(this) >= 1 ? 1 : 0) + (heatTier(this) === 2 ? 1 : 0);
                        for (let k = 0; k < n; k++){
                            // Luoi CAO 175px, day dat san -> nhay MOT bac khong qua noi, phai nhay DOI
                            let hh = LNC_WAVE_H - k * 22;
                            let bp = new BossProjectile(this.cx() + d * 60, 322 - hh,
                                                        d * (LNC_WAVE_SPD - k * 0.9), 0, true, 1);
                            bp.w = 60; bp.h = hh; bp.color = k ? "#FF8F00" : "#FFEB3B"; bp.crescent = true;
                            bossProjectiles.push(bp);
                        }
                        visualEffects.push(new Effect(this.cx() + d * 70, 250, 'explosion', true, 54));
                        shakeTimer = Math.max(shakeTimer, 22);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer <= 0) this.toIdle(48);
                    return;
                }
                // ---- BO THUONG: nhay len bo xuong, no ra song xung doc san ----
                if (this.state === 'sms_prep'){ this.faceP(); this.subTimer--;
                    this.poseAng += (((this.dir() > 0 ? -1 : 1) * 2.4 - this.poseAng)) * 0.18;
                    this.poseLen += (100 - this.poseLen) * 0.2;
                    if (this.subTimer <= 0){ this.state = 'sms_air'; this.dy = -13;
                        this.smsVx = ((dino.x + dino.w/2) - this.cx()) / 30; if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'sms_air'){
                    this.x += this.smsVx;
                    this.poseAng += ((this.dir() > 0 ? 1.5 : Math.PI - 1.5) - this.poseAng) * 0.25;
                    this.poseLen = 104;
                    if (checkAABB(dino, this.lanceBox(14))) this.hurtP(1);
                    if (this.grounded){
                        visualEffects.push(new Effect(this.tipX(), 314, 'explosion', true, 50)); shakeTimer = 26;
                        if (checkAABB(dino, { x: this.cx() - 96, y: 272, w: 192, h: 54 })) this.hurtP(1);
                        for (let k = -1; k <= 1; k += 2){
                            let bp = new BossProjectile(this.cx(), 322 - GWAVE_H, k * (GWAVE_SPD + heatTier(this)), 0, true, 1);
                            bp.w = 48; bp.h = GWAVE_H; bp.color = "#FF6D00"; bp.crescent = true; bossProjectiles.push(bp);
                        }
                        this.state = 'sms_hold'; this.subTimer = 22;
                    }
                    return;
                }
                if (this.state === 'sms_hold'){ this.subTimer--; if (this.subTimer <= 0) this.toIdle(46); return; }
                // ---- LIEN DAM: dam thang, moi nhat vuon xa dan ----
                if (this.state === 'flr_prep'){ this.faceP(); this.subTimer--;
                    this.aimAng = this.aimToP();                       // NGAM lai truoc moi nhat
                    this.poseAng += (this.aimAng - this.poseAng) * 0.25;
                    this.poseLen += (52 - this.poseLen) * 0.25;
                    if (this.subTimer <= 0){ this.state = 'flr_go'; this.subTimer = 20; } return; }
                if (this.state === 'flr_go'){
                    this.subTimer--;
                    this.poseAng = this.aimAng;
                    // vuon ra roi rut ve trong mot nhip
                    let u = this.subTimer > 10 ? (20 - this.subTimer) / 10 : this.subTimer / 10;
                    this.poseLen = 52 + u * (110 + this.thrustN * 12);
                    if (this.subTimer > 6) this.x += Math.cos(this.aimAng) * LNC_THRUST_SPD;   // lao THEO HUONG NGAM
                    if (this.subTimer >= 8 && this.subTimer <= 13 && checkAABB(dino, this.lanceBox(12))) this.hurtP(1);
                    if (this.subTimer <= 0){
                        this.thrustN--;
                        if (this.thrustN > 0){ this.subTimer = 20; this.faceP(); }
                        else this.toIdle(46);
                    }
                    return;
                }
                // ---- PHONG THUONG: nem thuong cam xuong dat -> DICH CHUYEN toi do -> giat len ----
                if (this.state === 'hrl_prep'){ this.faceP(); this.subTimer--;
                    this.poseAng += ((this.dir() > 0 ? -0.9 : Math.PI + 0.9) - this.poseAng) * 0.2;
                    this.poseLen += (86 - this.poseLen) * 0.2;
                    if (this.subTimer <= 0){
                        this.lance = { x: Math.max(60, Math.min(canvas.width - 60, dino.x + dino.w/2)), t: 130, vy: 0, y: 60 };
                        this.state = 'hrl_fly'; this.subTimer = 26; this.poseLen = 0;
                        if (SFX.bossSkill) SFX.bossSkill();
                    } return; }
                if (this.state === 'hrl_fly'){
                    this.subTimer--;
                    if (this.lance && this.lance.y < 240){ this.lance.vy += 1.1; this.lance.y += this.lance.vy; }
                    if (this.lance && this.lance.y >= 240){
                        this.lance.y = 240;
                        if (this.subTimer > 12) this.subTimer = 12;
                        if (checkAABB(dino, { x: this.lance.x - 18, y: 240, w: 36, h: 86 })) this.hurtP(1);
                    }
                    if (this.subTimer <= 0){ this.state = 'hrl_warp'; this.subTimer = 30; this.blinkA = 1; }
                    return;
                }
                if (this.state === 'hrl_warp'){
                    this.subTimer--;
                    this.blinkA = this.subTimer > 15 ? (this.subTimer - 15) / 15 : (15 - this.subTimer) / 15;
                    if (this.subTimer === 15 && this.lance){       // hien ra ngay canh ngon thuong
                        this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.lance.x - this.w/2));
                        this.y = this.baseY; this.dy = 0; this.faceP();
                    }
                    if (this.subTimer <= 0){ this.state = 'hrl_rip'; this.subTimer = 26; this.poseLen = 20; this.blinkA = 1; }
                    return;
                }
                if (this.state === 'hrl_rip'){         // GIAT THUONG len: cung chem hat len tren
                    this.subTimer--;
                    let u = 1 - this.subTimer / 26;
                    this.poseAng = (this.dir() > 0 ? 1.6 : Math.PI - 1.6) + (this.dir() > 0 ? -1 : 1) * 2.5 * u;
                    this.poseLen = 20 + 96 * Math.min(1, u * 1.6);
                    if (this.subTimer >= 8 && checkAABB(dino, this.lanceBox(16))) this.hurtP(1);
                    if (this.subTimer <= 0){ this.lance = null; this.toIdle(50); }
                    return;
                }
            }
            drawLance(alpha){
                let gx = this.gripX(), gy = this.gripY(), tx = this.tipX(), ty = this.tipY();
                let t = heatTier(this), out = this.burnoutT > 0;
                let glow = out ? "#607D8B" : ["#FF9800", "#FF5722", "#FFEB3B"][t];
                let live = (this.state === 'swp_go' && this.arcT <= 18) || (this.state === 'flr_go' && this.subTimer >= 8 && this.subTimer <= 13)
                        || (this.state === 'spn_go') || (this.state === 'hrl_rip' && this.subTimer >= 8) || (this.state === 'sms_air');
                ctx.save(); ctx.globalAlpha = alpha;
                if (this.poseLen < 6){ ctx.restore(); return; }
                // can thuong
                ctx.strokeStyle = "#4E342E"; ctx.lineWidth = 7; ctx.lineCap = "round";
                ctx.beginPath(); ctx.moveTo(gx - (tx - gx) * 0.28, gy - (ty - gy) * 0.28); ctx.lineTo(tx, ty); ctx.stroke();
                // lop lua boc can
                ctx.strokeStyle = glow; ctx.lineWidth = live ? 8 : 4; ctx.globalAlpha = alpha * (live ? 0.95 : 0.6);
                ctx.beginPath(); ctx.moveTo(gx - (tx - gx) * 0.2, gy - (ty - gy) * 0.2); ctx.lineTo(tx, ty); ctx.stroke();
                ctx.globalAlpha = alpha;
                // mui thuong
                let a = Math.atan2(ty - gy, tx - gx);
                ctx.save(); ctx.translate(tx, ty); ctx.rotate(a);
                ctx.fillStyle = live ? "#FFF59D" : glow;
                ctx.beginPath(); ctx.moveTo(26, 0); ctx.lineTo(-6, -11); ctx.lineTo(-2, 0); ctx.lineTo(-6, 11); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#3E1008"; ctx.lineWidth = 2; ctx.stroke();
                ctx.restore();
                ctx.restore();
            }
            draw(){
                let x = this.x, y = this.y, t = heatTier(this), out = this.burnoutT > 0;
                // blinkA la do mo khi DICH CHUYEN, chi duoc dat lai ve 1 ben trong 'hrl_warp'.
                // Neu boss bi doi trang thai tu ben ngoai giua cu warp (bi parry, bi ngat, chuyen
                // pha...) thi blinkA ket o gan 0 va han TANG HINH vinh vien. Chot cung o day:
                // chi mo khi DANG warp, con lai luon hien ro.
                let A = (this.state === 'hrl_warp') ? this.blinkA : 1;
                if (this.state !== 'hrl_warp') this.blinkA = 1;
                // ngon thuong cam duoi dat
                if (this.lance){
                    let L = this.lance;
                    ctx.save();
                    ctx.strokeStyle = "#4E342E"; ctx.lineWidth = 7; ctx.lineCap = "round";
                    ctx.beginPath(); ctx.moveTo(L.x, L.y); ctx.lineTo(L.x, L.y + 86); ctx.stroke();
                    ctx.strokeStyle = (L.t > 40 && L.y >= 240) ? "#FFEB3B" : "#FF7043"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.moveTo(L.x, L.y); ctx.lineTo(L.x, L.y + 86); ctx.stroke();
                    if (L.y >= 240){
                        ctx.fillStyle = "rgba(255,109,0,0.35)";
                        ctx.beginPath(); ctx.ellipse(L.x, 322, 34 + Math.sin(frames*0.3)*6, 10, 0, 0, Math.PI*2); ctx.fill();
                    }
                    ctx.restore();
                }
                // ve THUONG truoc than khi chem ra phia truoc
                ctx.save(); ctx.globalAlpha = A;
                let armor = out ? "#455A64" : ["#8D6E63", "#BF360C", "#D84315"][t];
                let glow  = out ? "#607D8B" : ["#FF9800", "#FF5722", "#FFEB3B"][t];
                // ao choang
                ctx.fillStyle = glow; ctx.globalAlpha = A * 0.9;
                ctx.beginPath(); ctx.moveTo(x + 10, y + 16);
                ctx.quadraticCurveTo(x - 14 + Math.sin(frames*0.15)*6, y + 54, x + 6, y + this.h);
                ctx.lineTo(x + 30, y + this.h); ctx.lineTo(x + 30, y + 16); ctx.closePath(); ctx.fill();
                ctx.globalAlpha = A;
                // than
                ctx.fillStyle = armor; ctx.fillRect(x + 12, y + 12, 30, this.h - 16);
                ctx.strokeStyle = "#1B0F0A"; ctx.lineWidth = 3; ctx.strokeRect(x + 12, y + 12, 30, this.h - 16);
                // vai giap
                ctx.fillStyle = armor; ctx.beginPath(); ctx.ellipse(x + 12, y + 24, 12, 9, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(x + 42, y + 24, 12, 9, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
                // dau + mat na
                ctx.fillStyle = armor; ctx.beginPath(); ctx.ellipse(x + 27, y + 10, 16, 12, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
                ctx.fillStyle = glow; ctx.fillRect(x + 17, y + 7, 20, 5);
                // chum lua tren mu
                for (let k = 0; k < 3; k++){ let hh = 10 + t*5 + Math.sin(frames*0.3 + k)*4;
                    ctx.beginPath(); ctx.moveTo(x + 20 + k*7, y - 2); ctx.quadraticCurveTo(x + 23 + k*7, y - 2 - hh, x + 26 + k*7, y - 2); ctx.closePath(); ctx.fill(); }
                ctx.restore();
                this.drawLance(A);
                // ---- canh bao ----
                if (this.state === 'spn_go'){
                    ctx.strokeStyle = "rgba(255,235,59,0.5)"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.gripX(), this.gripY(), this.poseLen, 0, Math.PI*2); ctx.stroke();
                    // mui ten chi huong dang lan toi
                    ctx.fillStyle = "rgba(255,235,59,0.8)"; ctx.beginPath();
                    let ax2 = this.cx() + this.spinDir * 120;
                    ctx.moveTo(ax2, y + 30); ctx.lineTo(ax2 + this.spinDir * 22, y + 42); ctx.lineTo(ax2, y + 54); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("CHONG CHÓNG — ĐẠN VÔ DỤNG, NHẢY QUA!", this.cx(), y - 42); ctx.textAlign = "left";
                }
                if (this.state === 'kata'){
                    let st = KATA[this.cbStep] || {};
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("MÚA THƯƠNG  " + (this.cbStep + 1) + "/" + KATA.length, this.cx(), y - 42);
                    ctx.textAlign = "left";
                    if (st.fx === 'slash'){
                        ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,143,0,0.2)" : "rgba(255,143,0,0.07)";
                        let d = this.dir();
                        ctx.fillRect(d < 0 ? 0 : this.x, 322 - 150, d < 0 ? this.x : canvas.width - this.x, 150);
                    }
                    // vach nhip combo
                    for (let k = 0; k < KATA.length; k++){
                        ctx.fillStyle = k < this.cbStep ? "#FF8F00" : (k === this.cbStep ? "#FFEB3B" : "rgba(255,255,255,0.25)");
                        ctx.fillRect(this.cx() - 34 + k*12, y - 34, 9, 5);
                    }
                }
                if (this.state === 'chg_prep' || this.state === 'chg_go'){
                    let d = this.state === 'chg_go' ? this.chgDir : this.dir();
                    ctx.fillStyle = this.state === 'chg_go' ? "rgba(255,235,59,0.35)" : ((frames % 6 < 3) ? "rgba(255,87,34,0.3)" : "rgba(255,87,34,0.1)");
                    ctx.fillRect(d < 0 ? 0 : this.x, y + 30, d < 0 ? this.x : canvas.width - this.x, 30);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    if (this.state === 'chg_prep') ctx.fillText("LAO ĐÂM XUYÊN!", this.cx(), y - 42);
                    ctx.textAlign = "left";
                }
                if (this.state === 'swp_prep' || this.state === 'sms_prep'){
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(this.state === 'swp_prep' ? "QUÉT THƯƠNG!" : "BỔ THƯƠNG!", this.cx(), y - 42); ctx.textAlign = "left";
                }
                if (this.state === 'swp_prep'){
                    let d = this.dir();
                    ctx.strokeStyle = (frames % 6 < 3) ? "rgba(255,87,34,0.6)" : "rgba(255,87,34,0.2)"; ctx.lineWidth = 8;
                    ctx.beginPath(); ctx.arc(this.gripX(), this.gripY(), 110, d > 0 ? -2.0 : Math.PI + 1.5, d > 0 ? 1.5 : Math.PI + 2.0, d < 0); ctx.stroke();
                    // dai ma song xung se quet qua
                    ctx.fillStyle = (frames % 8 < 4) ? "rgba(255,143,0,0.20)" : "rgba(255,143,0,0.07)";
                    ctx.fillRect(d < 0 ? 0 : this.x, 322 - LNC_WAVE_H, d < 0 ? this.x : canvas.width - this.x, LNC_WAVE_H);
                    ctx.strokeStyle = "#FF8F00"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(0, 322 - LNC_WAVE_H); ctx.lineTo(canvas.width, 322 - LNC_WAVE_H); ctx.stroke();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("SÓNG CAO — PHẢI NHẢY ĐÔI!", canvas.width/2, 322 - LNC_WAVE_H - 6); ctx.textAlign = "left";
                }
                if (this.state === 'flr_prep' || this.state === 'flr_go'){
                    let d = this.dir();
                    ctx.fillStyle = (this.state === 'flr_go' && this.subTimer >= 8 && this.subTimer <= 13) ? "rgba(255,235,59,0.45)" : "rgba(255,87,34,0.18)";
                    ctx.fillRect(d < 0 ? x - 170 : x + this.w, y + 30, 170, 26);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("LIÊN ĐÂM x" + this.thrustN, this.cx(), y - 42); ctx.textAlign = "left";
                }
                if (this.state === 'hrl_prep'){
                    ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3; ctx.setLineDash([7,7]);
                    ctx.beginPath(); ctx.moveTo(this.cx(), this.cy()); ctx.lineTo(dino.x + dino.w/2, 250); ctx.stroke(); ctx.setLineDash([]);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("PHÓNG THƯƠNG!", this.cx(), y - 42); ctx.textAlign = "left";
                }
                if (this.state === 'hrl_warp' && this.lance){
                    ctx.strokeStyle = "rgba(255,235,59,0.8)"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.lance.x, 280, 30 + (30 - this.subTimer) * 1.6, 0, Math.PI*2); ctx.stroke();
                }
                drawHeatBar(this);
                // ctx.fillStyle = "black"; ctx.fillRect(x, y - 12, this.w, 7);
                // ctx.fillStyle = "#FF5252"; ctx.fillRect(x + 1, y - 11, (this.w - 2) * Math.max(0, this.hp / this.maxHp), 5);
            }
        }
// BOSS_PART_END s1.FlameLancerBoss.1

// Nguồn: index.html:42951 · Dùng bởi: FlameLancerBoss
// BOSS_PART_BEGIN s1.LNC_SPIN_T.1 EDITABLE
const LNC_SPIN_T = 180, LNC_SPIN_SPD = 5;
// BOSS_PART_END s1.LNC_SPIN_T.1

// Nguồn: index.html:42953 · Dùng bởi: FlameLancerBoss
// BOSS_PART_BEGIN s1.KATA.1 EDITABLE
const KATA = [
            { t: 20, a0: -2.3, a1:  0.9, l0: 70, l1: 112, mv: 3.2, hit0: 6,  hit1: 16, face: true },                 // vung nguoc
            { t: 18, a0:  0.9, a1:  1.6, l0: 112, l1: 104, mv: 1.4, hit0: 4,  hit1: 12 },                            // dap xuong
            { t: 22, a0:  1.6, a1:  0.0, l0: 60,  l1: 150, mv: 5.0, hit0: 12, hit1: 18, fx: 'stab', face: true },    // CHOC -> luoi dam lua
            { t: 20, a0:  0.0, a1: -2.6, l0: 150, l1: 96,  mv: -2.0, hit0: 4, hit1: 16 },                            // xoay nua vong
            { t: 16, a0: -2.6, a1: -1.2, l0: 96,  l1: 88,  mv: -3.4, hit0: 3, hit1: 11 },                            // lui buoc gat
            { t: 26, a0: -1.2, a1:  1.2, l0: 88,  l1: 124, mv: 4.6, hit0: 8, hit1: 20, fx: 'slash', face: true }     // VUNG KET -> nhat chem lua
        ];
// BOSS_PART_END s1.KATA.1

// Nguồn: index.html:42961 · Dùng bởi: FlameLancerBoss
// BOSS_PART_BEGIN s1.LNC_WAVE_SPD.1 EDITABLE
const LNC_WAVE_SPD = 9.5;
// BOSS_PART_END s1.LNC_WAVE_SPD.1

// Nguồn: index.html:42962 · Dùng bởi: FlameLancerBoss
// BOSS_PART_BEGIN s1.LNC_WAVE_H.1 EDITABLE
const LNC_WAVE_H = 175;
// BOSS_PART_END s1.LNC_WAVE_H.1

// Nguồn: index.html:42963 · Dùng bởi: FlameLancerBoss
// BOSS_PART_BEGIN s1.LNC_THRUST_SPD.1 EDITABLE
const LNC_THRUST_SPD = 11;
// BOSS_PART_END s1.LNC_THRUST_SPD.1

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
