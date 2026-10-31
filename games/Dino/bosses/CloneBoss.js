// BOSS_FILE: CloneBoss
// BOSS_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossKeepDist, bossProjectiles, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, parryX, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:2650 · Dùng bởi: CloneBoss
// BOSS_PART_BEGIN s0.CloneBoss.1 EDITABLE
class CloneBoss {
            constructor(level) {
                this.hp = 100; 
                this.maxHp = this.hp; this.enraged = false; this.w = 48*1.5; this.h = 44*1.5; 
                this.baseX = canvas.width - 160; this.baseY = 320 - this.h;
                this.x = canvas.width; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.actionTimer = 60; this.name = "HELIOS REX";
                this.retState = 'idle';   // parry chung ep state -> khong co nhanh 'returning' thi boss dung im vinh vien
                this.shieldTimer = 0; this.laserTimer = 0; this.chargeTimer = 0; this.chargeType = 3; this.maxChargeTimer = 90;
                this.jumpCooldown = 0; this.lastMeleeHit = -1; this.subTimer = 0; this.lastSkill = ''; this.burnTimer = 0;
                this.spamShieldTimer = 0; this.spamShieldCd = 0;
                this.oDir = -1; this.dashDir = -1; this.skillIdx = 0; this.laserDir = -1;
                this.willSurpriseShoot = false;
                this.shieldHp = 3; // Nerf khiên: Chỉ chịu được 3 hit[cite: 1]
            }
            draw() {
                let x = this.x, y = this.y; ctx.save();
                
                if (this.enraged) { ctx.fillStyle = "rgba(255,0,40," + (0.12 + Math.sin(frames * 0.2) * 0.05) + ")"; ctx.beginPath(); ctx.arc(x + this.w/2, y + this.h/2, 46, 0, Math.PI*2); ctx.fill(); }
                let isShielding = (this.shieldTimer > 0 || this.spamShieldTimer > 0 || this.state.includes('clone_dash') || this.state === 'clone_bounce_back' || this.state === 'clone_wait') && this.shieldHp > 0;
                let dir = this.state.includes('clone_dash') ? this.dashDir : this.oDir;
                if (isShielding) {
                    let shx = dir === -1 ? x - 15 : x + this.w;
                    ctx.fillStyle = "rgba(255, 0, 0, 0.4)"; ctx.fillRect(shx, y - 10, 15, 75*1.5);
                    ctx.strokeStyle = "rgba(255, 0, 0, 0.9)"; ctx.lineWidth = 3; ctx.strokeRect(shx, y - 10, 15, 75*1.5);
                }
                
                let legAnim = (!this.grounded || this.state.includes('clone_dash')) && frames % 12 < 6 ? 4 : 0;
                dino.drawForm(false, x, y, legAnim, 3, dir === -1); 
                
                let bx = dir === -1 ? (x + this.w - (42*1.5 + 15)) : (x + 42*1.5 + 15); 
                let by = y + 12*1.5 - 25;

                if (this.chargeTimer > 0) {
                    let prog = 100 - (this.chargeTimer / this.maxChargeTimer * 100);
                    ctx.strokeStyle = prog >= 62.5 ? "#FFEB3B" : (prog >= 25 ? "#FF5722" : "#00E5FF"); 
                    ctx.lineWidth = 3 + (prog/25); 
                    ctx.beginPath(); ctx.arc(bx, by, 10 + (prog/4), 0, Math.PI*2); ctx.stroke();
                }
                ctx.restore();

                if (this.laserTimer > 0) {
                    let ld = this.laserDir || -1;
                    let lx = ld < 0 ? this.x - 15 : this.x + this.w + 15; let ly = this.y + 12*1.5;
                    let endX = ld < 0 ? 0 : canvas.width;
                    if (dino.isShielding() && ly >= dino.y - 15 && ly <= dino.y + dino.h + 15) { endX = ld < 0 ? dino.x + dino.w : dino.x; }
                    let rx = Math.min(lx, endX), rw = Math.abs(lx - endX);
                    ctx.fillStyle = "rgba(255, 23, 68, 0.5)"; ctx.fillRect(rx, ly - 24, rw, 48);
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; ctx.fillRect(rx, ly - 8, rw, 16);
                    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"; ctx.beginPath(); ctx.arc(lx, ly, 22, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "rgba(255, 23, 68, 0.7)"; ctx.beginPath(); ctx.arc(lx, ly, 16, 0, Math.PI*2); ctx.fill();
                }

                // ctx.fillStyle = "black"; ctx.fillRect(x, y - 20, this.w, 8); ctx.fillStyle = "#D32F2F"; ctx.fillRect(x + 1, y - 19, (this.w - 2) * (this.hp / this.maxHp), 6);
            }
            update() {
                this.dy += 0.65; this.y += this.dy;
                if (this.y >= this.baseY) { this.y = this.baseY; this.dy = 0; this.grounded = true; }
                if (this.jumpCooldown > 0) this.jumpCooldown--;
                if (this.shieldTimer > 0) this.shieldTimer--;
                if (!this.enraged && this.hp <= this.maxHp * 0.3) { this.enraged = true; floatingTexts.push(new FloatingText(this.x, this.y - 20, "CUONG NO!")); visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion')); shakeTimer = 24; }

                if (this.spamShieldCd > 0) this.spamShieldCd--;
                if (this.spamShieldTimer > 0) this.spamShieldTimer--;

                if (this.state !== 'entering' && this.state !== 'dying' && projectiles.length >= 3 && this.spamShieldCd <= 0 && this.spamShieldTimer <= 0) {
                    this.spamShieldTimer = 90; this.spamShieldCd = 270; this.shieldHp = 3;
                }

                if (this.state === 'entering') { 
                    this.x -= 3; 
                    if (this.x <= this.baseX) { this.state = 'roaring'; this.subTimer = 0; } 
                }
                else if (this.state === 'roaring') {
                    this.subTimer++; shakeTimer = 5;
                    if (this.subTimer === 1) {
                        floatingTexts.push(new FloatingText(this.x + this.w/2 - 20, this.y - 10, "ROAR!!!"));
                        visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion'));
                    }
                    if (this.subTimer > 60) { this.state = 'idle'; this.actionTimer = 60; this.subTimer = 0; }
                }
                else if (this.state === 'idle') {
                    this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    if (dino.chargeProgress > 30 && this.shieldTimer <= 0) { this.shieldTimer = 60; this.shieldHp = 3; }
                    if (dino.laserActiveTimer > 0 && this.jumpCooldown <= 0) { this.dy = -15; this.grounded = false; this.jumpCooldown = 60; }
                    bossKeepDist(this, 300, 560, 6, 4);
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let seq = ['shooting', 'shield_dash', 'laser_charge']; let sk = seq[(this.skillIdx || 0) % seq.length]; this.skillIdx = ((this.skillIdx || 0) + 1) % seq.length;
                        if (sk === 'shooting') { this.state = 'shooting'; this.subTimer = 0; }
                        else if (sk === 'shield_dash') { this.state = 'clone_dash_1'; this.subTimer = 0; this.willSurpriseShoot = false; this.shieldHp = 3; this.dashDir = this.oDir; }
                        else {
                            this.state = 'laser_charge';
                            let randCharge = Math.random();
                            if (randCharge < 0.33) { this.chargeType = 1; this.chargeTimer = 45; }
                            else if (randCharge < 0.66) { this.chargeType = 2; this.chargeTimer = 75; }
                            else { this.chargeType = 3; this.chargeTimer = 90; }
                            this.maxChargeTimer = this.chargeTimer;
                        }
                    }
                }
                else if (this.state === 'shooting') {
                    this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    if (!dino.grounded && this.grounded && this.jumpCooldown <= 0 && Math.random() > 0.4) { this.dy = -12.5; this.grounded = false; this.jumpCooldown = 60; }
                    let sx = this.oDir < 0 ? this.x - 10 : this.x + this.w + 10, sy = this.y + 20;
                    let tx = dino.x + dino.w/2, ty = dino.y + dino.h/2, ddx = tx - sx, ddy = ty - sy, dd = Math.hypot(ddx, ddy) || 1;
                    if (this.enraged) {
                        if (this.subTimer % 26 === 0 && this.subTimer <= 84) {
                            let _v = Math.floor(this.subTimer / 26);
                            if (_v % 2 === 0) { let sp = 15; let pp = new BossProjectile(sx, sy, ddx/dd*sp, ddy/dd*sp, false, 2); pp.w = 36; pp.h = 18; pp.isPiercing = true; pp.color = "#FFEB3B"; bossProjectiles.push(pp); }   // tia XUYEN chi ban loat CHAN (2 lan thay vi 6)
                            let ang = Math.atan2(ddy, ddx);
                            for (let k = -1; k <= 1; k++) { let a2 = ang + k * 0.42; let bp = new BossProjectile(sx, sy, Math.cos(a2)*13, Math.sin(a2)*13, false, 1); bp.color = "#FF1744"; bossProjectiles.push(bp); }   // toa RONG hon -> co khe ne
                        }
                    } else {
                        if (this.subTimer % 20 === 0 && this.subTimer <= 80) { let sp = 12; bossProjectiles.push(new BossProjectile(sx, sy, ddx/dd*sp, ddy/dd*sp, false, 1)); }
                    }
                    this.subTimer++;
                    if (this.subTimer >= 100) { this.state = 'idle'; this.actionTimer = 60; }
                }
                else if (this.state === 'clone_dash_1') {
                    if (!dino.grounded && this.grounded && this.jumpCooldown <= 0) { this.dy = dino.jumpPower; this.grounded = false; this.jumpCooldown = 60; }
                    this.x += 15 * this.dashDir;
                    if ((this.dashDir < 0 && this.x < -this.w) || (this.dashDir > 0 && this.x > canvas.width)) { this.state = 'clone_return'; }
                }
                else if (this.state === 'clone_bounce_back') {
                    this.x -= 15 * this.dashDir;
                    let backEdge = this.dashDir < 0 ? canvas.width - this.w - 40 : 40;
                    if ((this.dashDir < 0 && this.x >= backEdge) || (this.dashDir > 0 && this.x <= backEdge)) { this.x = backEdge; this.state = 'clone_wait'; this.subTimer = 30; }
                }
                else if (this.state === 'clone_wait') {
                    this.subTimer--;
                    if (this.subTimer <= 0) { this.dashDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1; this.state = 'clone_dash_2'; }
                }
                else if (this.state === 'clone_dash_2') {
                    if (!dino.grounded && this.grounded && this.jumpCooldown <= 0) { this.dy = dino.jumpPower; this.grounded = false; this.jumpCooldown = 60; }
                    this.x += 18 * this.dashDir;
                    if ((this.dashDir < 0 && this.x < -this.w) || (this.dashDir > 0 && this.x > canvas.width)) { this.state = 'clone_return'; }
                }
                else if (this.state === 'clone_return') {
                    this.x -= 15 * this.dashDir;
                    let target = this.dashDir < 0 ? canvas.width - this.w - 60 : 60;
                    let done = (this.dashDir < 0 && this.x >= target) || (this.dashDir > 0 && this.x <= target);
                    if (done) {
                        this.x = target; this.state = 'idle'; this.actionTimer = 60;
                        this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                        if (this.willSurpriseShoot) {
                            let sx = this.oDir < 0 ? this.x - 10 : this.x + this.w + 10, sy = this.y + 20;
                            let tx = dino.x + dino.w/2, ty = dino.y + dino.h/2, ddx = tx - sx, ddy = ty - sy, dd = Math.hypot(ddx, ddy) || 1;
                            bossProjectiles.push(new BossProjectile(sx, sy, ddx/dd*15, ddy/dd*15, false, 1));
                            this.willSurpriseShoot = false;
                        }
                    }
                }
                else if (this.state === 'laser_charge') {
                    this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    if (!dino.grounded && this.grounded && this.jumpCooldown <= 0) { this.dy = dino.jumpPower; this.grounded = false; this.jumpCooldown = 60; }
                    this.chargeTimer--;
                    if (this.chargeTimer <= 0) {
                        let sx = this.oDir < 0 ? this.x - 10 : this.x + this.w + 10, sy = this.y + 20;
                        let tx = dino.x + dino.w/2, ty = dino.y + dino.h/2, ddx = tx - sx, ddy = ty - sy, dd = Math.hypot(ddx, ddy) || 1;
                        if (this.chargeType === 1) {
                            let sp = 15; let p = new BossProjectile(sx, sy, ddx/dd*sp, ddy/dd*sp, false, 2); p.w = 36; p.h = 18; bossProjectiles.push(p);
                            this.state = 'idle'; this.actionTimer = 60;
                        } else if (this.chargeType === 2) {
                            let sp = 20; let p = new BossProjectile(sx, sy, ddx/dd*sp, ddy/dd*sp, false, 2); p.w = 36; p.h = 18; p.isPiercing = true; bossProjectiles.push(p);
                            this.state = 'idle'; this.actionTimer = 60;
                        } else {
                            this.laserDir = this.oDir; this.state = 'laser_fire'; this.laserTimer = 60;
                        }
                    }
                }
                else if (this.state === 'laser_fire') {
                    this.laserTimer--;
                    if (this.laserTimer === 59 || this.laserTimer === 29) { 
                        let ly = this.y + 12*1.5;
                        let laserRect = (this.laserDir < 0) ? { x: 0, y: ly - 40, w: this.x - 15, h: 80 } : { x: this.x + this.w + 15, y: ly - 40, w: canvas.width - (this.x + this.w + 15), h: 80 };
                        if (checkAABB(dino, laserRect)) {
                            if (dino.isShielding()) { visualEffects.push(new Effect(parryX(), dino.y, 'parry')); }
                            else { dino.takeDamage(1); }
                        }
                    }
                    if (this.laserTimer <= 0) { this.state = 'idle'; this.actionTimer = 90; }
                }
            }
        }
// BOSS_PART_END s0.CloneBoss.1

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
