// BOSS_FILE: FlameCoreBoss
// BOSS_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, CAM_TROI, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, parryX, pickFromBag, shakeTimer, visualEffects
// Nguồn: index.html:206 · Dùng bởi: DragonLordBoss, EmberWolfBoss, FlameCoreBoss, FlameLancerBoss, GreatApeBoss, MagmorBoss, QuetzalBoss
// BOSS_PART_BEGIN s0.GWAVE_H.1 READ_ONLY
const GWAVE_H = 96, GWAVE_SPD = 11.5;
// BOSS_PART_END s0.GWAVE_H.1

// Nguồn: index.html:36531 · Dùng bởi: FlameCoreBoss
// BOSS_PART_BEGIN s1.FlameCoreBoss.1 EDITABLE
class FlameCoreBoss {
            constructor(level){
                this.name = "HOA TAM"; this.hp = 65; this.maxHp = 65;      // PHA 1 (nhe hon)
                this.phase = 1; this.p2Max = 110;                           // PHA 2 day hon                            // PHA 2 co thanh mau RIENG
                this.w = 66; this.h = 66;
                this.x = canvas.width/2 - 33; this.y = -80;
                this.hoverY = 120; this.state = 'entering'; this.subTimer = 0; this.actionTimer = 44;
                this.facingLeft = true; this.retState = 'idle'; this.lastSkill = ''; this.atkBag = [];
                this.invulnAll = false; this.burnTimer = 0; this.lastMeleeHit = -1;
                this.orbA = 0; this.beamX = 0; this.rainGap = null;
                this.plates = []; this.armSw = 0; this.stomp = 0; this.rubble = [];
                heatInit(this, 14);
            }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = Math.round(t * heatRate(this)); }
            orbCount(){ return 3 + heatTier(this) * 3; }
            // ===== CHUYEN PHA: hut dat da quanh san -> hoa GOLEM DUNG NHAM =====
            startPhase2(){
                this.phase = 2; this.state = 'morph'; this.subTimer = 130;
                this.hp = this.p2Max; this.maxHp = this.p2Max;
                this.invulnAll = true; this.burnoutT = 0; this.dmgMul = 1; this.heat = 0; this.heatGain = 11;
                this.name = "NHAM THACH GOLEM";
                this.rubble = [];
                for (let k = 0; k < 22; k++){
                    let a = Math.random() * Math.PI * 2, r = 150 + Math.random() * 180;
                    this.rubble.push({ x: this.cx() + Math.cos(a) * r, y: 300 - Math.random() * 40, a: a, r: r, s: 8 + Math.random() * 12 });
                }
                bossProjectiles.length = 0;
                floatingTexts.push(new FloatingText(this.cx() - 90, 150, "HÚT ĐẤT ĐÁ — HOÁ THÂN!"));
                shakeTimer = 70; if (SFX.bossEntry) SFX.bossEntry();
            }
            update(){
                if (this.phase === 1 && this.hp <= 0 && this.state !== 'morph'){ this.startPhase2(); return; }
                // ---- pha chuyen hinh ----
                if (this.state === 'morph'){
                    this.subTimer--;
                    this.y += ((320 - 150) - this.y) * 0.06;
                    for (let r of this.rubble){ r.r *= 0.93; r.a += 0.14;
                        r.x = this.cx() + Math.cos(r.a) * r.r; r.y = this.cy() + Math.sin(r.a) * r.r * 0.7; }
                    if (this.subTimer % 8 === 0) shakeTimer = Math.max(shakeTimer, 12);
                    if (this.subTimer <= 0){
                        this.w = 130; this.h = 150; this.x = this.cx() - 65; this.y = 320 - this.h;
                        this.invulnAll = false; this.rubble = [];
                        this.plates = [0,1,2,3,4,5];
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 90));
                        shakeTimer = 60; this.toIdle(30);
                    }
                    return;
                }
                if (this.phase === 3) return this.updateDoom();
                if (this.phase === 2) return this.updateGolem();
                // ================= PHA 1: LOI BAY =================
                this.orbA += 0.045 + heatTier(this) * 0.022;
                if (this.state === 'entering'){ this.y += 5; if (this.y >= this.hoverY){ this.y = this.hoverY; this.toIdle(30); } return; }
                if (heatTick(this)){ this.y = Math.min(320 - this.h, this.y + 6); return; }
                if (this.y > this.hoverY) this.y -= 3;
                let n = this.orbCount(), R = 62 + heatTier(this) * 16;
                for (let k = 0; k < n; k++){
                    let a = this.orbA + k * (Math.PI * 2 / n);
                    let ox = this.cx() + Math.cos(a) * R, oy = this.cy() + Math.sin(a) * R;
                    if (checkAABB(dino, { x: ox - 12, y: oy - 12, w: 24, h: 24 })){
                        if (!dino.isShielding()){ if (frames % 22 === 0) dino.takeDamage(1); }
                        else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                    }
                }
                if (this.state === 'idle'){
                    this.faceP();
                    this.x += Math.max(-2.4, Math.min(2.4, ((dino.x + dino.w/2) - this.cx()) * 0.03));
                    this.y += Math.sin(frames * 0.05) * 0.6;
                    this.actionTimer--;
                    if (this.actionTimer <= 0){
                        let c = pickFromBag(this, ['burst','beam','dive','rain','sweep']);
                        heatAdd(this);
                        if (c === 'burst'){ this.state = 'bst_prep'; this.subTimer = 36; }
                        else if (c === 'beam'){ this.state = 'bem_prep'; this.subTimer = 54; this.beamX = dino.x + dino.w/2; }
                        else if (c === 'dive'){ this.state = 'div_prep'; this.subTimer = 34; }
                        else if (c === 'rain'){ this.state = 'rai_prep'; this.subTimer = 46; }
                        else { this.state = 'swp_prep'; this.subTimer = 58;
                            this.swpA = (dino.x + dino.w/2) < this.cx() ? Math.PI - 0.5 : 0.5;
                            this.swpDir = (dino.x + dino.w/2) < this.cx() ? -1 : 1; }
                    }
                    return;
                }
                // ---- LAZER XOAY: tia dai quet ca man nhu hai dang ----
                if (this.state === 'swp_prep'){ this.subTimer--;
                    if (this.subTimer <= 0){ this.state = 'swp_go'; this.subTimer = FC_SWEEP_T; if (SFX.bossSkill) SFX.bossSkill(); } return; }
                if (this.state === 'swp_go'){
                    this.subTimer--;
                    this.swpA += this.swpDir * (FC_SWEEP_ARC / FC_SWEEP_T);
                    let ca = Math.cos(this.swpA), sa = Math.sin(this.swpA);
                    let rx = (dino.x + dino.w/2) - this.cx(), ry = (dino.y + dino.h/2) - this.cy();
                    let along = rx*ca + ry*sa, perp = Math.abs(-rx*sa + ry*ca);
                    if (along > 0 && perp < 22){
                        if (!dino.isShielding()){ if (frames % 14 === 0) dino.takeDamage(1); }
                        else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                    }
                    if (this.subTimer <= 0) this.toIdle(58);
                    return;
                }
                if (this.state === 'bst_prep'){ this.subTimer--;
                    if (this.subTimer <= 0){
                        let n2 = this.orbCount(), R2 = 62 + heatTier(this) * 16;
                        for (let k = 0; k < n2; k++){
                            let a = this.orbA + k * (Math.PI * 2 / n2), sp = 5.6;
                            let bp = new BossProjectile(this.cx() + Math.cos(a)*R2, this.cy() + Math.sin(a)*R2, Math.cos(a)*sp, Math.sin(a)*sp, false, 1);
                            bp.w = 18; bp.h = 18; bp.color = "#FF6D00"; bossProjectiles.push(bp);
                        }
                        shakeTimer = Math.max(shakeTimer, 14); if (SFX.bossSkill) SFX.bossSkill();
                        this.toIdle(56);
                    } return; }
                if (this.state === 'bem_prep'){ this.subTimer--;
                    if (this.subTimer <= 0){ this.state = 'bem_go'; this.subTimer = 60;
                        this.beamDir = (dino.x + dino.w/2) < this.beamX ? -1 : 1; if (SFX.bossSkill) SFX.bossSkill(); } return; }
                if (this.state === 'bem_go'){
                    this.subTimer--;
                    this.beamX += this.beamDir * (2.2 + heatTier(this) * 1.1);
                    this.beamX = Math.max(30, Math.min(canvas.width - 30, this.beamX));
                    this.x += Math.max(-4, Math.min(4, (this.beamX - this.cx()) * 0.2));
                    if (checkAABB(dino, { x: this.beamX - 20, y: this.cy(), w: 40, h: 330 })){
                        if (!dino.isShielding()){ if (frames % 14 === 0) dino.takeDamage(1); }
                        else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                    }
                    if (this.subTimer <= 0) this.toIdle(60);
                    return;
                }
                if (this.state === 'div_prep'){ this.subTimer--; this.y -= 1.6;
                    if (this.subTimer <= 0){ this.state = 'div_go'; this.divX = dino.x + dino.w/2; this.subTimer = 90; if (SFX.bossSkill) SFX.bossSkill(); } return; }
                if (this.state === 'div_go'){
                    this.subTimer--;
                    let dx2 = this.divX - this.cx(), dy2 = (320 - this.h) - this.y;
                    this.x += Math.max(-9, Math.min(9, dx2 * 0.14));
                    this.y += Math.min(13, Math.max(3, dy2 * 0.16));
                    if (checkAABB(dino, this)) this.hurtP(1);
                    if (this.y >= 320 - this.h - 4){
                        visualEffects.push(new Effect(this.cx(), 312, 'explosion', true, 56)); shakeTimer = 26;
                        if (checkAABB(dino, { x: this.cx() - 96, y: 270, w: 192, h: 56 })) this.hurtP(1);
                        for (let k = -1; k <= 1; k += 2){
                            let bp = new BossProjectile(this.cx(), 322 - GWAVE_H, k * GWAVE_SPD, 0, true, 1);
                            bp.w = 46; bp.h = GWAVE_H; bp.color = "#FF6D00"; bp.crescent = true; bossProjectiles.push(bp);
                        }
                        this.state = 'div_up'; this.subTimer = 40;
                    }
                    if (this.subTimer <= 0) this.state = 'div_up';
                    return;
                }
                if (this.state === 'div_up'){ this.subTimer--; this.y -= 4;
                    if (this.y <= this.hoverY){ this.y = this.hoverY; this.toIdle(50); }
                    else if (this.subTimer <= 0){ this.y += (this.hoverY - this.y) * 0.14; if (Math.abs(this.y - this.hoverY) < 5){ this.y = this.hoverY; this.toIdle(50); } } return; }
                if (this.state === 'rai_prep'){ this.subTimer--;
                    if (this.subTimer <= 0){ this.state = 'rai_go'; this.subTimer = 120;
                        let gap = 120 + Math.random() * (canvas.width - 400);
                        this.rainGap = [gap, gap + 200];
                        if (SFX.bossSkill) SFX.bossSkill(); } return; }
                if (this.state === 'rai_go'){
                    this.subTimer--;
                    if (this.subTimer % (16 - heatTier(this) * 3) === 0){
                        let px2, tries = 0;
                        do { px2 = 40 + Math.random() * (canvas.width - 80); tries++; }
                        while (tries < 10 && px2 > this.rainGap[0] && px2 < this.rainGap[1]);
                        let bp = new BossProjectile(px2, 20, 0, 3.4, false, 1); bp.w = 14; bp.h = 22; bp.color = "#FFA726"; bossProjectiles.push(bp);
                    }
                    if (this.subTimer <= 0) this.toIdle(54);
                    return;
                }
            }
            // ================= PHA 2: GOLEM DUNG NHAM =================
            startPhase3(){
                this.phase = 3; this.state = 'shatter'; this.subTimer = 70;
                this.w = 66; this.h = 66; this.x = this.cx() - 33; this.y = 320 - 66;
                this.invulnAll = true; this.burnoutT = 0; this.dmgMul = 1; this.plates = [];
                this.name = "HOA TAM — TAN LUC";
                this.doomT = FC_DOOM;
                bossProjectiles.length = 0;
                floatingTexts.push(new FloatingText(canvas.width/2 - 130, 130, "GIÁP VỠ! DỒN SỨC CUỐI — 10 GIÂY!"));
                visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 110));
                shakeTimer = 80; if (SFX.bossExplode) SFX.bossExplode();
            }
            updateGolem(){
                // GIAP VO o duoi 25% mau -> tro lai dang LOI, bat dong ho tu huy
                if (this.phase === 2 && this.hp <= this.maxHp * 0.20){ this.startPhase3(); return; }
                if (this.armSw > 0) this.armSw--;
                if (this.stomp > 0) this.stomp--;
                // giap da BONG RA theo mau mat -> cang gan chet cang lo loi, cang nhanh
                let lost = 1 - this.hp / this.maxHp;
                let want = 6 - Math.floor(lost * 6);
                while (this.plates.length > want){
                    let px3 = this.cx() + (Math.random() - 0.5) * this.w;
                    visualEffects.push(new Effect(px3, this.cy(), 'explosion', true, 26));
                    this.plates.pop(); shakeTimer = Math.max(shakeTimer, 12);
                }
                if (heatTick(this)) return;
                if (this.state === 'idle'){
                    this.faceP(); this.actionTimer--;
                    // Golem DI BO cham chap ve phia nguoi choi
                    let g = (dino.x + dino.w/2) - this.cx();
                    if (Math.abs(g) > 120) this.x += Math.sign(g) * (0.9 + (6 - this.plates.length) * 0.22);
                    this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x));
                    if (this.actionTimer <= 0){
                        let c = pickFromBag(this, ['fist','hurl','quake','vent','roll','core','slam','geyser']);
                        heatAdd(this);
                        if (c === 'fist'){ this.state = 'gf_prep'; this.subTimer = 36; this.fistX = dino.x + dino.w/2; }
                        else if (c === 'hurl'){ this.state = 'gh_prep'; this.subTimer = 40; }
                        else if (c === 'quake'){ this.state = 'gq_prep'; this.subTimer = 50; }
                        else if (c === 'vent'){ this.state = 'gv_prep'; this.subTimer = 46; }
                        else if (c === 'roll'){ this.state = 'gr_prep'; this.subTimer = 46;
                            this.rollDir = (dino.x + dino.w/2) < this.cx() ? -1 : 1; this.rollT = 0; }
                        else if (c === 'core'){ this.state = 'gc_prep'; this.subTimer = 62;
                            this.coreA = (dino.x + dino.w/2) < this.cx() ? Math.PI - 0.4 : 0.4;
                            this.coreDir = (dino.x + dino.w/2) < this.cx() ? -1 : 1; }
                        else if (c === 'slam'){ this.state = 'gs_prep'; this.subTimer = 40; this.slamN = 3; }
                        else { this.state = 'gg_prep'; this.subTimer = 46;
                            this.gzX = []; let base = 90;
                            for (let k = 0; k < 5; k++) this.gzX.push(base + k * ((canvas.width - 180) / 4)); }
                    }
                    return;
                }
                // --- DAM: nam dam khong lo giang xuong ---
                if (this.state === 'gf_prep'){ this.subTimer--;
                    if (this.subTimer <= 0){ this.state = 'gf_hit'; this.subTimer = 26; this.armSw = 26; shakeTimer = 30; if (SFX.bossSkill) SFX.bossSkill(); } return; }
                if (this.state === 'gf_hit'){
                    this.subTimer--;
                    if (this.subTimer === 18){
                        if (checkAABB(dino, { x: this.fistX - 78, y: 220, w: 156, h: 106 })) this.hurtP(2);
                        visualEffects.push(new Effect(this.fistX, 306, 'explosion', true, 56));
                        for (let k = -1; k <= 1; k += 2){
                            let bp = new BossProjectile(this.fistX, 322 - GWAVE_H, k * GWAVE_SPD, 0, true, 1);
                            bp.w = 48; bp.h = GWAVE_H; bp.color = "#FF6D00"; bp.crescent = true; bossProjectiles.push(bp);
                        }
                    }
                    if (this.subTimer <= 0) this.toIdle(34);
                    return;
                }
                // --- NEM DA: bung mot tang da tren nguoi nem di ---
                if (this.state === 'gh_prep'){ this.subTimer--;
                    if (this.subTimer <= 0){
                        let ang = Math.atan2((dino.y + dino.h/2) - this.cy(), (dino.x + dino.w/2) - this.cx());
                        for (let k = -1; k <= 1; k++){
                            let a = ang + k * 0.16, sp = 8;
                            let bp = new BossProjectile(this.cx(), this.cy() - 20, Math.cos(a)*sp, Math.sin(a)*sp, false, 1);
                            bp.w = 30; bp.h = 30; bp.color = "#6D4C41"; bp.rock = true; bossProjectiles.push(bp);
                        }
                        if (SFX.bossSkill) SFX.bossSkill(); this.toIdle(32);
                    } return; }
                // --- GIAM CHAN: song xung chay ca hai ben ---
                if (this.state === 'gq_prep'){ this.subTimer--;
                    if (this.subTimer <= 0){ this.state = 'gq_hit'; this.subTimer = 24; this.stomp = 24; shakeTimer = 50; if (SFX.bossExplode) SFX.bossExplode(); } return; }
                if (this.state === 'gq_hit'){
                    this.subTimer--;
                    if (this.subTimer === 16){
                        if (dino.grounded && checkAABB(dino, { x: 0, y: 296, w: canvas.width, h: 30 })) this.hurtP(1);
                        for (let k = 0; k < 8; k++) visualEffects.push(new Effect(60 + k * 120, 312, 'explosion', true, 30));
                    }
                    if (this.subTimer <= 0) this.toIdle(36);
                    return;
                }
                // --- PHUN KHE: cac khe nut tren nguoi phun cot lua tai cho ---
                if (this.state === 'gv_prep'){ this.subTimer--;
                    if (this.subTimer <= 0){ this.state = 'gv_go'; this.subTimer = 70;
                        this.ventX = [this.cx() - 200, this.cx(), this.cx() + 200].map(v => Math.max(50, Math.min(canvas.width - 50, v)));
                        if (SFX.bossSkill) SFX.bossSkill(); } return; }
                if (this.state === 'gv_go'){
                    this.subTimer--;
                    if (this.subTimer < 46){
                        for (let vx of this.ventX){
                            if (checkAABB(dino, { x: vx - 26, y: 180, w: 52, h: 146 })){
                                if (!dino.isShielding()){ if (frames % 16 === 0) dino.takeDamage(1); }
                                else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                            }
                        }
                    }
                    if (this.subTimer <= 0) this.toIdle(56);
                    return;
                }
                // --- LAN NGUOI: cuon thanh tang da lan het man roi dung day ---
                if (this.state === 'gr_prep'){ this.subTimer--; this.crouchG = Math.min(30, (this.crouchG || 0) + 1);
                    if (this.subTimer <= 0){ this.state = 'gr_go'; this.subTimer = 130; shakeTimer = 40; if (SFX.bossExplode) SFX.bossExplode(); } return; }
                if (this.state === 'gr_go'){
                    this.subTimer--; this.rollT += 0.3;
                    this.x += this.rollDir * (9 + heatTier(this) * 2);
                    if (this.x <= 6 || this.x >= canvas.width - this.w - 6){ this.rollDir *= -1; shakeTimer = 30; }
                    this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x));
                    if (checkAABB(dino, { x: this.x + 10, y: 320 - 110, w: this.w - 20, h: 110 })) this.hurtP(2);
                    if (this.subTimer % 7 === 0) visualEffects.push(new Effect(this.cx(), 314, 'explosion', true, 22));
                    if (this.subTimer <= 0){ this.crouchG = 0; this.toIdle(60); }
                    return;
                }
                // --- DAP LIEN HOAN: 3 cu dam DUOI THEO nguoi choi ---
                if (this.state === 'gs_prep'){ this.subTimer--; this.fistX = dino.x + dino.w/2;
                    if (this.subTimer <= 0){ this.state = 'gs_hit'; this.subTimer = 22; this.armSw = 22; shakeTimer = 26; } return; }
                if (this.state === 'gs_hit'){
                    this.subTimer--;
                    if (this.subTimer === 14){
                        if (checkAABB(dino, { x: this.fistX - 70, y: 232, w: 140, h: 94 })) this.hurtP(1);
                        visualEffects.push(new Effect(this.fistX, 306, 'explosion', true, 48));
                        shakeTimer = Math.max(shakeTimer, 22);
                    }
                    if (this.subTimer <= 0){
                        this.slamN--;
                        if (this.slamN > 0){ this.state = 'gs_prep'; this.subTimer = 26; }
                        else this.toIdle(40);
                    }
                    return;
                }
                // --- MACH NHAM: 5 cot lua phun len lan luot tu mot dau sang dau kia ---
                if (this.state === 'gg_prep'){ this.subTimer--;
                    if (this.subTimer <= 0){ this.state = 'gg_go'; this.subTimer = 96; this.gzI = 0;
                        this.gzDir = (dino.x + dino.w/2) < canvas.width/2 ? 1 : -1;
                        if (SFX.bossExplode) SFX.bossExplode(); } return; }
                if (this.state === 'gg_go'){
                    this.subTimer--;
                    let step = Math.floor((96 - this.subTimer) / 16);
                    this.gzI = Math.min(4, step);
                    let idx = this.gzDir > 0 ? this.gzI : (4 - this.gzI);
                    let vx = this.gzX[idx];
                    if ((96 - this.subTimer) % 16 > 5 && checkAABB(dino, { x: vx - 34, y: 150, w: 68, h: 176 })){
                        if (!dino.isShielding()){ if (frames % 14 === 0) dino.takeDamage(1); }
                        else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                    }
                    if (this.subTimer <= 0) this.toIdle(40);
                    return;
                }
                // --- MO LOI: nguc tach ra, LOI HOA TAM ban lazer quet ---
                if (this.state === 'gc_prep'){ this.subTimer--;
                    if (this.subTimer <= 0){ this.state = 'gc_go'; this.subTimer = FC_SWEEP_T; if (SFX.bossSkill) SFX.bossSkill(); } return; }
                if (this.state === 'gc_go'){
                    this.subTimer--;
                    this.coreA += this.coreDir * (FC_SWEEP_ARC / FC_SWEEP_T);
                    let ox = this.cx(), oy = this.y + 66;
                    let ca = Math.cos(this.coreA), sa = Math.sin(this.coreA);
                    let rx = (dino.x + dino.w/2) - ox, ry = (dino.y + dino.h/2) - oy;
                    let along = rx*ca + ry*sa, perp = Math.abs(-rx*sa + ry*ca);
                    if (along > 0 && perp < 26){
                        if (!dino.isShielding()){ if (frames % 12 === 0) dino.takeDamage(1); }
                        else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                    }
                    if (this.subTimer <= 0) this.toIdle(62);
                    return;
                }
            }
            draw(){
                if (this.phase === 3) return this.drawDoom();
                if (this.phase === 2 || this.state === 'morph') return this.drawGolem();
                let t = heatTier(this), out = this.burnoutT > 0, cx0 = this.cx(), cy0 = this.cy();
                let core = out ? "#455A64" : ["#FF7043", "#FF5722", "#FFEB3B"][t];
                let rim  = out ? "#263238" : ["#BF360C", "#D84315", "#FF6D00"][t];
                ctx.save();
                let g = ctx.createRadialGradient(cx0, cy0, 8, cx0, cy0, 90 + t * 20);
                g.addColorStop(0, out ? "rgba(69,90,100,0.5)" : "rgba(255,111,0,0.55)");
                g.addColorStop(1, "rgba(255,87,34,0)");
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx0, cy0, 90 + t * 20, 0, Math.PI*2); ctx.fill();
                ctx.restore();
                if (!out){
                    let n = this.orbCount(), R = 62 + t * 16;
                    for (let k = 0; k < n; k++){
                        let a = this.orbA + k * (Math.PI * 2 / n);
                        let ox = cx0 + Math.cos(a)*R, oy = cy0 + Math.sin(a)*R;
                        ctx.fillStyle = rim; ctx.beginPath(); ctx.arc(ox, oy, 11, 0, Math.PI*2); ctx.fill();
                        ctx.fillStyle = core; ctx.beginPath(); ctx.arc(ox, oy, 6, 0, Math.PI*2); ctx.fill();
                    }
                }
                ctx.save();
                ctx.fillStyle = rim; ctx.beginPath();
                for (let k = 0; k < 8; k++){
                    let a = this.orbA * 0.6 + k * (Math.PI/4), rr = (k % 2 ? 22 : 34) + Math.sin(frames*0.3 + k)*3;
                    let px3 = cx0 + Math.cos(a)*rr, py3 = cy0 + Math.sin(a)*rr;
                    if (k === 0) ctx.moveTo(px3, py3); else ctx.lineTo(px3, py3);
                }
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#1B0F0A"; ctx.lineWidth = 3; ctx.stroke();
                ctx.fillStyle = core; ctx.beginPath(); ctx.arc(cx0, cy0, 16 + Math.sin(frames*0.25)*3, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = out ? "#90A4AE" : "#FFF9C4"; ctx.beginPath(); ctx.arc(cx0, cy0, 7, 0, Math.PI*2); ctx.fill();
                ctx.restore();
                if (this.state === 'bem_prep' || this.state === 'bem_go'){
                    let live = this.state === 'bem_go';
                    ctx.fillStyle = live ? "rgba(255,235,59,0.55)" : ((frames % 6 < 3) ? "rgba(255,87,34,0.28)" : "rgba(255,87,34,0.1)");
                    ctx.fillRect(this.beamX - 20, cy0, 40, 330 - cy0);
                    ctx.strokeStyle = "#FF3D00"; ctx.lineWidth = 3; ctx.strokeRect(this.beamX - 20, cy0, 40, 330 - cy0);
                    if (live){ ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.fillRect(this.beamX - 7, cy0, 14, 330 - cy0); }
                }
                if (this.state === 'swp_prep' || this.state === 'swp_go'){
                    this.drawSweepBeam(cx0, cy0, this.swpA, this.state === 'swp_prep');
                    if (this.state === 'swp_prep'){
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("LAZER QUÉT — CHẠY THEO TIA!", canvas.width/2, 60); ctx.textAlign = "left";
                    }
                }
                if (this.state === 'bst_prep'){
                    let k = 1 - this.subTimer / 36;
                    ctx.strokeStyle = "rgba(255,109,0," + (0.3 + 0.5*k) + ")"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(cx0, cy0, (62 + t*16) * (1 + k*0.4), 0, Math.PI*2); ctx.stroke();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("BUNG " + this.orbCount() + " ĐẠN!", cx0, this.y - 34); ctx.textAlign = "left";
                }
                if (this.state === 'div_prep'){
                    ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3; ctx.setLineDash([7,7]);
                    ctx.beginPath(); ctx.moveTo(cx0, cy0); ctx.lineTo(dino.x + dino.w/2, 300); ctx.stroke(); ctx.setLineDash([]);
                }
                if (this.state === 'rai_go' && this.rainGap){
                    ctx.strokeStyle = "rgba(105,240,174,0.85)"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(this.rainGap[0], 314); ctx.lineTo(this.rainGap[1], 314); ctx.stroke();
                }
                drawHeatBar(this);
                this.drawHpBar(1);
            }
            updateDoom(){
                if (this.state === 'shatter'){
                    this.subTimer--;
                    this.y -= 1.2;
                    if (this.subTimer % 6 === 0) visualEffects.push(new Effect(this.cx() + (Math.random()-0.5)*120, this.cy() + (Math.random()-0.5)*80, 'explosion', true, 28));
                    if (this.subTimer <= 0){ this.invulnAll = false; this.state = 'doom'; this.subTimer = 0; }
                    return;
                }
                // ---- DONG HO TU HUY ----
                this.doomT--;
                this.orbA += 0.11;
                this.y += ((150) - this.y) * 0.05;
                this.x += Math.max(-3.2, Math.min(3.2, ((dino.x + dino.w/2) - this.cx()) * 0.04));
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x));
                if (this.doomT <= 0){
                    // NO TOAN MAN 5 dmg
                    if (!dino.isShielding()) dino.takeDamage(5);
                    else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                    for (let k = 0; k < 18; k++)
                        visualEffects.push(new Effect(Math.random()*canvas.width, 60 + Math.random()*260, 'explosion', true, 60));
                    shakeTimer = 90; this.hp = 0;
                    floatingTexts.push(new FloatingText(canvas.width/2 - 70, 150, "TỰ HUỶ! -5 MÁU"));
                    if (SFX.bossExplode) SFX.bossExplode();
                    return;
                }
                // cang gan gio no cang ban day
                this.subTimer++;
                let rate = this.doomT > FC_DOOM*0.6 ? 26 : (this.doomT > FC_DOOM*0.3 ? 18 : 11);
                if (this.subTimer % rate === 0){
                    let n = this.doomT > FC_DOOM*0.5 ? 6 : 10;
                    for (let k = 0; k < n; k++){
                        let a = this.orbA + k * (Math.PI*2/n), sp = 4.6;
                        let bp = new BossProjectile(this.cx(), this.cy(), Math.cos(a)*sp, Math.sin(a)*sp, false, 1);
                        bp.w = 16; bp.h = 16; bp.color = "#FF1744"; bossProjectiles.push(bp);
                    }
                }
                if (this.subTimer % 90 === 0) shakeTimer = Math.max(shakeTimer, 20);
            }
            drawDoom(){
                let cx0 = this.cx(), cy0 = this.cy();
                let k = 1 - this.doomT / FC_DOOM;
                let fast = 0.12 + k * 0.5;
                let hot = (Math.sin(frames * fast) > 0);
                if (this.state === 'shatter'){
                    ctx.fillStyle = "#FF6D00"; ctx.beginPath(); ctx.arc(cx0, cy0, 30, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFF9C4"; ctx.beginPath(); ctx.arc(cx0, cy0, 14, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 15px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("GIÁP VỠ — DỒN SỨC CUỐI!", canvas.width/2, 120); ctx.textAlign = "left";
                    return;
                }
                // quang do lan ca man khi sap no
                ctx.save();
                ctx.globalAlpha = 0.06 + 0.22 * k * (hot ? 1 : 0.3);
                ctx.fillStyle = "#FF1744"; ctx.fillRect(0, -CAM_TROI - 20, canvas.width, 330 + CAM_TROI + 20);
                ctx.restore();
                ctx.save();
                let g = ctx.createRadialGradient(cx0, cy0, 10, cx0, cy0, 120 + k*90);
                g.addColorStop(0, hot ? "rgba(255,23,68,0.85)" : "rgba(255,109,0,0.6)");
                g.addColorStop(1, "rgba(255,23,68,0)");
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx0, cy0, 120 + k*90, 0, Math.PI*2); ctx.fill();
                ctx.restore();
                ctx.fillStyle = hot ? "#FF1744" : "#B71C1C"; ctx.beginPath();
                for (let i = 0; i < 8; i++){
                    let a = this.orbA * 0.7 + i * (Math.PI/4), rr = (i % 2 ? 24 : 38) + Math.sin(frames*0.5 + i)*4;
                    let px = cx0 + Math.cos(a)*rr, py = cy0 + Math.sin(a)*rr;
                    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                }
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#3E1008"; ctx.lineWidth = 3; ctx.stroke();
                ctx.fillStyle = hot ? "#FFF9C4" : "#FFEB3B";
                ctx.beginPath(); ctx.arc(cx0, cy0, 18 + Math.sin(frames*0.5)*4, 0, Math.PI*2); ctx.fill();
                // DONG HO DEM NGUOC
                let secs = Math.ceil(this.doomT / 60);
                ctx.save(); ctx.textAlign = "center";
                ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(canvas.width/2 - 130, 24, 260, 34);
                ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 3; ctx.strokeRect(canvas.width/2 - 130, 24, 260, 34);
                ctx.fillStyle = "#FF1744"; ctx.fillRect(canvas.width/2 - 127, 27, 254 * (this.doomT / FC_DOOM), 28);
                ctx.fillStyle = "#FFF"; ctx.font = "bold 17px Consolas, monospace";
                ctx.fillText("TỰ HUỶ TOÀN MÀN: " + secs + "s", canvas.width/2, 47);
                ctx.textAlign = "left"; ctx.restore();
                // ctx.fillStyle = "black"; ctx.fillRect(this.x, this.y - 12, this.w, 7);
                // ctx.fillStyle = "#FF1744"; ctx.fillRect(this.x + 1, this.y - 11, (this.w - 2) * Math.max(0, this.hp / this.maxHp), 5);
            }
            drawSweepBeam(ox, oy, ang, prep){
                let L = 1200, ex = ox + Math.cos(ang) * L, ey = oy + Math.sin(ang) * L;
                ctx.save();
                if (prep){
                    ctx.strokeStyle = (frames % 6 < 3) ? "rgba(255,82,82,0.8)" : "rgba(255,82,82,0.25)";
                    ctx.lineWidth = 3; ctx.setLineDash([12,10]);
                    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.setLineDash([]);
                } else {
                    ctx.strokeStyle = "rgba(255,87,34,0.55)"; ctx.lineWidth = 46; ctx.lineCap = "round";
                    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke();
                    ctx.strokeStyle = "rgba(255,167,38,0.9)"; ctx.lineWidth = 26;
                    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke();
                    ctx.strokeStyle = "#FFF9C4"; ctx.lineWidth = 11;
                    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke();
                    ctx.fillStyle = "rgba(255,249,196,0.9)";
                    ctx.beginPath(); ctx.arc(ox, oy, 20 + Math.sin(frames*0.5)*4, 0, Math.PI*2); ctx.fill();
                }
                ctx.restore();
            }
            drawHpBar(ph){
                let x = this.x, y = this.y - 12, w = this.w;
                ctx.fillStyle = "black"; ctx.fillRect(x, y, w, 7);
                ctx.fillStyle = ph === 2 ? "#FF6D00" : "#FF5252";
                ctx.fillRect(x + 1, y + 1, (w - 2) * Math.max(0, this.hp / this.maxHp), 5);
                ctx.fillStyle = ph === 2 ? "#FFCC80" : "#90A4AE"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(ph === 2 ? "PHA 2 — GOLEM" : "PHA 1 — LÕI", x + w/2, y - 2); ctx.textAlign = "left";
            }
            drawGolem(){
                let x = this.x, y = this.y, t = heatTier(this), out = this.burnoutT > 0;
                if (this.state === 'morph'){
                    for (let r of this.rubble){
                        ctx.fillStyle = "#5D4037";
                        ctx.beginPath(); ctx.arc(r.x, r.y, r.s, 0, Math.PI*2); ctx.fill();
                        ctx.strokeStyle = "#FF6D00"; ctx.lineWidth = 2; ctx.stroke();
                    }
                    ctx.fillStyle = "#FF6D00"; ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 26 + Math.sin(frames*0.5)*6, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFF9C4"; ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 12, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 15px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("HÚT ĐẤT ĐÁ — HOÁ THÂN!", canvas.width/2, 120); ctx.textAlign = "left";
                    return;
                }
                let rock = out ? "#37474F" : "#4E342E", crack = out ? "#546E7A" : ["#FF6D00", "#FF8F00", "#FFEB3B"][t];
                let rolling = (this.state === 'gr_go');
                ctx.save(); if (rolling) ctx.globalAlpha = 0;
                ctx.translate(x + this.w/2, 0); ctx.scale(this.facingLeft ? 1 : -1, 1); ctx.translate(-(x + this.w/2), 0);
                // chan
                ctx.fillStyle = rock;
                for (let k = 0; k < 2; k++){ ctx.fillRect(x + 18 + k*58, y + 96, 40, 54); ctx.strokeStyle = "#1B0F0A"; ctx.lineWidth = 4; ctx.strokeRect(x + 18 + k*58, y + 96, 40, 54); }
                // than
                ctx.fillStyle = rock;
                ctx.beginPath(); ctx.moveTo(x + 8, y + 100); ctx.lineTo(x + 20, y + 30);
                ctx.lineTo(x + 110, y + 30); ctx.lineTo(x + 122, y + 100); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#1B0F0A"; ctx.lineWidth = 4; ctx.stroke();
                // khe nham chay tren than — cang it giap cang sang
                let glowN = 6 - this.plates.length;
                ctx.strokeStyle = crack; ctx.lineWidth = 3 + glowN;
                for (let k = 0; k < 3; k++){
                    ctx.beginPath(); ctx.moveTo(x + 30 + k*30, y + 34);
                    ctx.lineTo(x + 42 + k*30, y + 62); ctx.lineTo(x + 28 + k*30, y + 96); ctx.stroke();
                }
                // giap da con lai
                ctx.fillStyle = "#6D4C41";
                for (let i = 0; i < this.plates.length; i++){
                    let px3 = x + 14 + (this.plates[i] % 3) * 36, py3 = y + 34 + Math.floor(this.plates[i] / 3) * 36;
                    ctx.fillRect(px3, py3, 30, 28); ctx.strokeStyle = "#3E2723"; ctx.lineWidth = 3; ctx.strokeRect(px3, py3, 30, 28);
                }
                // dau: LOI HOA TAM nam trong long nguc golem
                ctx.fillStyle = rock; ctx.beginPath(); ctx.ellipse(x + 65, y + 18, 34, 22, 0, 0, Math.PI*2); ctx.fill();
                ctx.strokeStyle = "#1B0F0A"; ctx.lineWidth = 4; ctx.stroke();
                ctx.fillStyle = out ? "#546E7A" : "#FFEB3B";
                ctx.beginPath(); ctx.arc(x + 52, y + 16, 6, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 78, y + 16, 6, 0, Math.PI*2); ctx.fill();
                // loi lua giua nguc
                ctx.fillStyle = crack; ctx.beginPath(); ctx.arc(x + 65, y + 66, 15 + Math.sin(frames*0.28)*3, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = "#FFF9C4"; ctx.beginPath(); ctx.arc(x + 65, y + 66, 7, 0, Math.PI*2); ctx.fill();
                // canh tay: nam dam giang xuong khi dam
                let armY = this.armSw > 0 ? (26 - this.armSw) * 5 : 0;
                ctx.fillStyle = rock;
                ctx.fillRect(x - 14, y + 40 + armY*0.4, 28, 60); ctx.strokeRect(x - 14, y + 40 + armY*0.4, 28, 60);
                ctx.fillRect(x + 116, y + 40, 28, 60); ctx.strokeRect(x + 116, y + 40, 28, 60);
                ctx.restore();
                // nam dam khong lo dang giang xuong
                if (this.state === 'gf_prep' || this.state === 'gf_hit'){
                    let k = this.state === 'gf_prep' ? (1 - this.subTimer / 44) : 1;
                    let fy = this.state === 'gf_prep' ? (40 + k * 60) : (240 - Math.max(0, this.subTimer - 18) * 8);
                    ctx.fillStyle = "#5D4037"; ctx.fillRect(this.fistX - 44, fy, 88, 62);
                    ctx.strokeStyle = "#1B0F0A"; ctx.lineWidth = 4; ctx.strokeRect(this.fistX - 44, fy, 88, 62);
                    ctx.fillStyle = crack; ctx.fillRect(this.fistX - 34, fy + 46, 68, 8);
                    ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,23,68,0.34)" : "rgba(255,23,68,0.14)";
                    ctx.fillRect(this.fistX - 78, 220, 156, 106);
                    ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 3; ctx.strokeRect(this.fistX - 78, 220, 156, 106);
                }
                if (this.state === 'gr_prep' || this.state === 'gr_go'){
                    if (this.state === 'gr_go'){
                        ctx.save();
                        ctx.translate(this.cx(), 320 - 56); ctx.rotate(this.rollT);
                        ctx.fillStyle = "#4E342E"; ctx.beginPath(); ctx.arc(0, 0, 56, 0, Math.PI*2); ctx.fill();
                        ctx.strokeStyle = "#1B0F0A"; ctx.lineWidth = 5; ctx.stroke();
                        ctx.strokeStyle = crack; ctx.lineWidth = 6;
                        for (let k = 0; k < 4; k++){ ctx.beginPath();
                            ctx.moveTo(Math.cos(k*1.57)*20, Math.sin(k*1.57)*20);
                            ctx.lineTo(Math.cos(k*1.57)*52, Math.sin(k*1.57)*52); ctx.stroke(); }
                        ctx.fillStyle = crack; ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI*2); ctx.fill();
                        ctx.restore();
                        ctx.fillStyle = "rgba(255,235,59,0.7)"; ctx.beginPath();
                        let ax3 = this.cx() + this.rollDir * 90;
                        ctx.moveTo(ax3, 250); ctx.lineTo(ax3 + this.rollDir * 26, 266); ctx.lineTo(ax3, 282); ctx.closePath(); ctx.fill();
                    } else {
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("CUỘN NGƯỜI — LĂN CẢ MÀN!", canvas.width/2, 150); ctx.textAlign = "left";
                    }
                }
                if (this.state === 'gc_prep' || this.state === 'gc_go'){
                    this.drawSweepBeam(this.cx(), this.y + 66, this.coreA, this.state === 'gc_prep');
                    if (this.state === 'gc_prep'){
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("MỞ LÕI — LAZER QUÉT!", canvas.width/2, 60); ctx.textAlign = "left";
                    }
                }
                if (this.state === 'gs_prep' || this.state === 'gs_hit'){
                    let live = this.state === 'gs_hit' && this.subTimer <= 14;
                    ctx.fillStyle = live ? "rgba(255,235,59,0.5)" : ((frames % 6 < 3) ? "rgba(255,23,68,0.3)" : "rgba(255,23,68,0.12)");
                    ctx.fillRect(this.fistX - 70, 232, 140, 94);
                    ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 3; ctx.strokeRect(this.fistX - 70, 232, 140, 94);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("ĐẬP LIÊN HOÀN x" + this.slamN, canvas.width/2, 150); ctx.textAlign = "left";
                }
                if (this.state === 'gg_prep' || this.state === 'gg_go'){
                    let xs = this.gzX || [];
                    if (this.state === 'gg_go'){
                        let idx = this.gzDir > 0 ? this.gzI : (4 - this.gzI);
                        let ph = (96 - this.subTimer) % 16;
                        for (let i = 0; i < xs.length; i++){
                            if (i !== idx) continue;
                            if (ph > 5){
                                let g3 = ctx.createLinearGradient(0, 326, 0, 150);
                                g3.addColorStop(0, "rgba(255,235,59,0.95)"); g3.addColorStop(1, "rgba(255,87,34,0.12)");
                                ctx.fillStyle = g3; ctx.fillRect(xs[i] - 34, 150, 68, 176);
                            } else {
                                ctx.fillStyle = "rgba(255,87,34,0.34)"; ctx.fillRect(xs[i] - 34, 300, 68, 26);
                            }
                        }
                        // cho ke tiep
                        let nx = this.gzDir > 0 ? Math.min(4, this.gzI + 1) : Math.max(0, 4 - this.gzI - 1);
                        ctx.strokeStyle = "rgba(255,87,34,0.7)"; ctx.lineWidth = 2;
                        ctx.strokeRect(xs[nx] - 34, 300, 68, 26);
                    } else {
                        for (let vx of xs){ ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,87,34,0.24)" : "rgba(255,87,34,0.08)";
                            ctx.fillRect(vx - 34, 300, 68, 26); }
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("MẠCH NHAM — 5 CỘT LẦN LƯỢT!", canvas.width/2, 150); ctx.textAlign = "left";
                    }
                }
                if (this.state === 'gq_prep' || this.state === 'gq_hit'){
                    let live = this.state === 'gq_hit' && this.subTimer <= 16;
                    ctx.fillStyle = live ? "rgba(255,235,59,0.5)" : "rgba(255,87,34,0.22)";
                    ctx.fillRect(0, 296, canvas.width, 30);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("GIẬM CHÂN — NHẢY LÊN!", canvas.width/2, 288); ctx.textAlign = "left";
                }
                if (this.state === 'gv_prep' || this.state === 'gv_go'){
                    let live = this.state === 'gv_go' && this.subTimer < 46;
                    let vxs = this.ventX || [];
                    for (let vx of vxs){
                        if (live){
                            let g2 = ctx.createLinearGradient(0, 326, 0, 180);
                            g2.addColorStop(0, "rgba(255,235,59,0.95)"); g2.addColorStop(1, "rgba(255,87,34,0.1)");
                            ctx.fillStyle = g2; ctx.fillRect(vx - 26, 180, 52, 146);
                        } else {
                            ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,87,34,0.3)" : "rgba(255,87,34,0.12)";
                            ctx.fillRect(vx - 26, 296, 52, 30);
                        }
                    }
                }
                drawHeatBar(this);
                this.drawHpBar(2);
            }
        }
// BOSS_PART_END s1.FlameCoreBoss.1

// Nguồn: index.html:44140 · Dùng bởi: FlameCoreBoss
// BOSS_PART_BEGIN s1.FC_SWEEP_T.1 EDITABLE
const FC_SWEEP_T = 132, FC_SWEEP_ARC = 150 * Math.PI / 180;
// BOSS_PART_END s1.FC_SWEEP_T.1

// Nguồn: index.html:44141 · Dùng bởi: FlameCoreBoss
// BOSS_PART_BEGIN s1.FC_DOOM.1 EDITABLE
const FC_DOOM = 600;
// BOSS_PART_END s1.FC_DOOM.1

// Nguồn: index.html:44161 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.HEAT_MAX.1 READ_ONLY
const HEAT_MAX = 100, HEAT_DECAY = 0.16, HEAT_BURNOUT = 170;
// BOSS_PART_END s1.HEAT_MAX.1

// Nguồn: index.html:44162 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatInit.1 READ_ONLY
function heatInit(b, gain) { b.heat = 0; b.heatGain = gain; b.burnoutT = 0; b.dmgMul = 1; }
// BOSS_PART_END s1.heatInit.1

// Nguồn: index.html:44163 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatTier.1 READ_ONLY
function heatTier(b) { return b.heat >= 75 ? 2 : (b.heat >= 40 ? 1 : 0); }
// BOSS_PART_END s1.heatTier.1

// Nguồn: index.html:44165 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatRate.1 READ_ONLY
function heatRate(b) { return [1, 0.78, 0.58][heatTier(b)]; }
// BOSS_PART_END s1.heatRate.1

// Nguồn: index.html:44166 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
// BOSS_PART_BEGIN s1.heatAdd.1 READ_ONLY
function heatAdd(b, n) {
            if (b.burnoutT > 0) return;
            b.heat = Math.min(HEAT_MAX, b.heat + (n === undefined ? b.heatGain : n));
            if (b.heat >= HEAT_MAX) heatBurnout(b);
        }
// BOSS_PART_END s1.heatAdd.1

// Nguồn: index.html:44171 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
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

// Nguồn: index.html:44180 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
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

// Nguồn: index.html:44193 · Dùng bởi: EmberWolfBoss, FlameCoreBoss, FlameLancerBoss
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
