// PLAYER_FILE: PlayerMovement
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DANG_RUSH_CHAY, DT_W, Effect, FloatingText, OCEAN_SURF, SFX, VG_H, VG_W, VK, ammoToiDa, asHeSoChay, asTick, battuBat, bienTuiKhi, bosses, bzBat, coBuc, combatStance, currentAmmoType, currentForm, cusNguoiDang, cusNkGiuNguoi, cutBossProjectiles, dangCua, dangMauGoc, dangMauThem, dangTick, dangTocMul, danteOn, dashVx, deathSkel, deoPhu, floatingTexts, frames, gameState, giaoLaCanChien, hasRune, ironOn, jkKep, keys, launchFromPit, mapTheme, mauPhu, mayGiuLuot, p2AmmoType, platforms, projectiles, pvpDich, resolveSolidPillars, resolveTetrisWalls, sgOn, sgRobot, sgState, stBat, tetris, vergilOn, visualEffects, vkMoc, voidBat, wildernessOn, worldL, worldR, xBat
// index.html:47340 · Phạm vi: Player
class __Part0 {
// PLAYER_PART_BEGIN s3.Player.constructor.1 EDITABLE
constructor(id, x, form, ammoType, isFacingLeft = false) {
                this.id = id; this.x = x; this.baseY = 276; this.y = 276; this.w = 40; this.h = 44; 
                this.dy = 0; this.gravity = 0.65; this.jumpPower = -12.5; this.jumpCount = 0; this.mayBay = 0; this.bodySlamArmed = false; this.bodySlamActive = false; this.bodySlamJumpCount = 0; this.hoverTimer = 0; this.hoverArmed = false; this.hoverShot = 0; this._hoverKPrev = false; 
                this.maxHp = (typeof dangMauGoc === 'function' ? dangMauGoc(form) : 5) + (typeof hasRune==="function" && hasRune("hp") ? 4 : 0) + (typeof dangMauThem === 'function' ? dangMauThem(form) : 0) + (this.id === 1 && typeof mauPhu === 'function' ? mauPhu() : 0); this.hp = this.maxHp; this.bulletDmg = 1;
                this.runeShield = 0; this.usedRevive = false; this.maxGrewOnce = false; this.channelGuardUsed = false;
                this.shieldEnergy = 100; this.parryWindow = 0; this.petShieldTimer = 0;
                this.ammoType = ammoType; this.form = form; this.kinhLop = 2; this.xuongDung = false; if (id === 1) deathSkel = null;
                this.maxAmmo = ammoToiDa(ammoType); this.ammo = this.maxAmmo;   // @@HE-THELUC   // WHISPER 4 vien   // RAPIDFIRE 10 vien | BOOMERANG 3 luoi | CRYO 6
                this.isOverheated = false; this.overheatTimer = 0; this.aKeyHeldTime = 0; 
                this.jcState = null; this.kHoldTime = 0; this.jcTimer = 0; this.jcRadius = 0; this.jcReturnX = 80; this.jcReturnY = 0; this.jcSlashes = []; this.clawChannel = false; this.clawChannelHits = 0; this.clawChannelCd = 0; this.clawJCircles = [];
                this.clawSwords = []; this.clawFlying = []; this.clawSwordCd = 0; this.crescent2 = null; this.clawGuard = 0; this.clawGuardHits = new Map();
                this.ultActive = false; this.ultAmmo = -1; this.ultTimer = 0; this.ultPrevMaxAmmo = 0; this.ultBeam = null; this.ultBeamRect = null; this.ultBolts = []; this.ultLightTargets = null; this.ultBeamTick = 0; this.ultFillMult = 1; this.webTimer = 0; this.rapidBurst = 0; this.rapidChannel = false; this.fireChannel = false; this.fireRings = []; this.fireChannelCd = 0; this.fireReactorTimer = 0; this.lightChannel = false; this.lightLinkTargets = null; this.lightZaps = []; this.lightningFormTimer = 0; this.lightningDashActive = 0; this.lightningDashHit = null; this.splitChannel = false; this.splitChannelCd = 0; this.pulsarStar = null; this.pulsarChannel = false; this.cryoChannel = false; this.cryoBaoT = 0; this.cryoBucTuong = null; this.cryoUlt = null; this.pulsarUltStar = null; this.sentry = null; this.sentries = []; this.rapidDrone = null; this.rfDroneCho = { dan: 0, laser: 0 }; this.rfChuoi = 0; this.rfNghi = 0; this.rfNgat = 0; this.tank = null; this.pulsarUlt = null; this.boomChannel = false; this.boomChanLeft = 0; this.boomChanCd = 0; this.boomOut = 0; this.boomSpin = 0; this.boomUltRide = null; this.boomUltLeft = 0; this.boomUltSmall = 0; this.boomLostPend = 0; this.boomRefillT = 0; this.boomThrowCount = 0;
                this.chargeProgress = 0; this.laserActiveTimer = 0; this.spreadCount = 1; this.pulseLaserChannel = false;
                this.meleeTimer = 0; this.meleeID = 0; this.shieldCd = 0; this.clawStrikeTimer = 0; this.clawStrikeRect = null; this.dashShieldTimer = 0; this.dashDir = 1; this.shinGuardCd = 0; this.shinFlash = 0; 
                this.invincible = false; this.invTimer = 0; this.grounded = true; 
                this.isCrouching = false; this.attackCooldown = 0;
                this.fireBreathTimer = 0; this.fireBreathLength = 240; this.laserType = 0;
                this.burnHitTimer = 0; this.burnExposure = 0; this.burnApplied = false;
                this.dropTimer = 0; this.dropFromTop = 0;
                this.isFacingLeft = isFacingLeft; this.canDoubleJump = false;
                this.clawUltState = null; this.clawUltTimer = 0; this.clawUltDestX = 0; this.clawUltStartX = 0; this.clawUltReturnX = 80; this.clawUltWorldShifted = 0; this.clawUltHitSet = new Set();
            }
// PLAYER_PART_END s3.Player.constructor.1
}

// index.html:47431 · Phạm vi: Player
class __Part1 {
// PLAYER_PART_BEGIN s3.Player.getFormScale.1 EDITABLE
getFormScale(overrideForm = -1) {
                let f = overrideForm !== -1 ? overrideForm : (this.id === 1 ? currentForm : this.form);
                if (f === 5) return 1.15 + 0.175 * (this.kinhLop === undefined ? 2 : this.kinhLop);   // Glass base matches Rush; armor layers retain their size bonus.
                if (f === 6) return 1.35; // Skeleton matches Ultimate.
            return (f === 2 || f === 3) ? 1.35 : ((f === 1 || f === 4) ? 1.15 : 1);
            }
// PLAYER_PART_END s3.Player.getFormScale.1
}

// index.html:47945 · Phạm vi: Player
class __Part2 {
// PLAYER_PART_BEGIN s3.Player.update.1 EDITABLE
update(){ let _c = cusNguoiDang; cusNguoiDang = this; try { return this._updateGoc(); } finally { cusNguoiDang = _c; } }
// PLAYER_PART_END s3.Player.update.1
}

// index.html:47946 · Phạm vi: Player
class __Part3 {
// PLAYER_PART_BEGIN s3.Player._updateGoc.1 EDITABLE
_updateGoc() {
                // @@HE-CUSNK — dang trong doan phim BOM NGUYEN TU thi nguoi choi mat dieu
                // khien hoan toan va bat tu; ca than xe do `cusNkGiuNguoi` giu.
                if (this.id === 1 && typeof cusNkGiuNguoi === 'function' && cusNkGiuNguoi(this)) return;
                this.tickClawJCircles();
                this.tickClawSwords();
                this.tickFireEffects();
                this.tickLightningEffects();
                this.tickPulsar();
                if (this.jcState) { this.updateJC(); return; }
                let sScale = this.getFormScale();
                let crouchKey = keys['KeyS'] || keys['ArrowDown'];
                let fireKey = keys['KeyJ'];
                let chargeKey = keys['KeyK'];
                if (this.id === 1 && ((typeof xBat === 'function' && xBat()) || danteOn() || (typeof vergilOn==='function'&&vergilOn()) || (typeof ironOn==='function'&&ironOn()))){ fireKey = false; chargeKey = false; }
                let shootKey = fireKey || chargeKey;

                // @@HE-LAN — MO KHOA PVP.
                // Truoc day dong nay la `this.id === 1 && gameState !== 'pvp'`, tuc khoa di
                // chuyen cho NGUOI CHOI 2 va khoa luon CA CHE DO PVP. Do duoc: o gameState
                // 'pvp', giu D 30 khung thi ca hai deu dung im 0px — che do PvP co man chon
                // do, HUD hai ben, va cham va man ket thuc, nhung khong ai di lai duoc.
                dangTick(this);   // @@HE-DANG — noi tai nho cua hinh dang
                if (this.id === 1 || gameState === 'pvp') {
                    // DI CHUYEN TU DO A/D (+ mui ten) toan game — van ban/charge/khien binh thuong
                    if (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp') {
                        if (this.webTimer > 0) { this.webTimer--; dashVx = 0; }
                        let mv = 0;
                        if (this.webTimer <= 0) { let _v = this.tank ? 3.6 : 6;   // xe tang di cham hon
                            // TAM LUAN: phan luc ghi chan — 6 -> 2 (1/3) theo chuoi ban
                            // KHONG dung checkAmmo o day: no duoc khai bao bang `let` MAI TAN
                            // duoi (dong 27706) trong cung khoi nay, nen cham vao la roi vao
                            // vung chet tam thoi va nem loi MOI KHUNG -> treo man hinh.
                            if (hasRune('trienlien') && (this.id === 1 ? currentAmmoType : p2AmmoType) === 2)
                                _v *= 1 - (2/3) * this.rfTien();
                            if (keys['KeyA'] || keys['ArrowLeft']) mv -= _v; if (keys['KeyD'] || keys['ArrowRight']) mv += _v; }
                        // SHIN TRICKSTER: tren khong LUOT THAY THE di chuyen thuong. Chi bo di chuyen
                        // khi dang thuc su luot — het charge thi tro lai dieu khien binh thuong.
                        if (typeof stBat === 'function' && stBat() && !this.grounded && Math.abs(dashVx) > 2) mv = 0;
                        if (mapTheme === 'ocean' && (this.y + this.h) > OCEAN_SURF + 4 && !(typeof bienTuiKhi === 'function' && bienTuiKhi())) mv *= 0.62;   // duoi nuoc di cham hon
                        if (hasRune('hyperspeed')) mv *= 1.5;
                        if (dangCua(this) === 1) mv *= DANG_RUSH_CHAY; mv *= dangTocMul(this);   // @@HE-DANG: RUSH nhanh chan
                        if (typeof asHeSoChay === 'function') mv *= asHeSoChay(this);   // @@HE-APSUAT: dang qua nhiet chay +50%
                        { let _vkM = vkMoc(currentAmmoType, 'heSoChay'); if (_vkM) mv = _vkM.call(this, mv); }   // @@KHOI-VK — he so chay rieng cua vu khi
                        if (this.id === 1 && this._voidTe) mv = 0;   // dang chuan bi dich chuyen: dung im
                        // VENOM moc 4: dang dung THE TAN de phong tay thi ghim chan.
                        if (this._venTan > 0){ mv = 0; dashVx = 0; }
                        if (mayGiuLuot(this)) mv = 0;
                        let hmove = mv + dashVx;
                        this.x += hmove;
                        if (mayGiuLuot(this)) {
                            let dir = Math.sign(dashVx) || (this.isFacingLeft ? -1 : 1);
                            let toc = (typeof hasRune === 'function' && hasRune('voltdash')) ? 36 : 22;
                            if (mapTheme === 'ocean' && (this.y + this.h) > OCEAN_SURF + 4) toc *= 0.6;
                            dashVx = dir * toc;
                        } else { dashVx *= 0.82; if (Math.abs(dashVx) < 0.5) dashVx = 0; }
                        if (this.x < worldL()) this.x = worldL();
                        if (this.x > worldR() - this.w) this.x = worldR() - this.w;
                        if (mapTheme==='tetris') resolveTetrisWalls(this, hmove); else resolveSolidPillars(this);
                    }
                    // LUON HUONG MAT VE BOSS (khi dang danh boss) - facing tach roi khoi huong di chuyen
                    // Chieu cuoi cua KIEM bi cong nay loai tru 'pvp' — do duoc: bam U trong
                    // PvP thi clawUltState khong bao gio duoc dat, chieu cuoi gay dung 0 sat
                    // thuong. Boomerang cung 0 nhung vi ly do khac (phai nhay len luoi).
                    if ((gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp') && !this.clawUltState) {
                        let pcx = this.x + this.w / 2;
                        /* LOI DO CHINH TOI TAO RA. Nhanh `else` o duoi ep `isFacingLeft = false`
                           khi khong co boss — do la logic cua che do chay vo tan, moi thu den tu
                           ben phai nen luon quay mat phai. San dau PvP khong co boss nao, ma o
                           vong truoc toi lai them 'pvp' vao dung cai cong nay, nen ca hai nguoi
                           choi bi ep quay mat sang phai MOI KHUNG.
                           Do la ly do sua hai vong khong an thua: toi sua huong nhin sau khi
                           update() chay, nhung HUONG BAN da duoc quyet ngay trong update() —
                           mat quay dung ma dan van bay nguoc ra sau.
                           Trong PvP thi "muc tieu" la nguoi choi kia, xu ly truoc moi thu. */
                        if (gameState === 'pvp'){
                            let _dt = (typeof pvpDich === 'function') ? pvpDich(this) : null;
                            if (_dt){
                                let dxp = (_dt.x + _dt.w / 2) - pcx;
                                if (Math.abs(dxp) > 6) this.isFacingLeft = dxp < 0;
                            }
                        } else if (this.pulsarStar && !this.pulsarStar.onBody) {
                            let dxs = this.pulsarStar.x - pcx; if (Math.abs(dxs) > 16) this.isFacingLeft = dxs < 0;
                        } else if (bosses.length > 0) {
                            let tb = null, bd = Infinity;
                            for (let bb of bosses) { let d = Math.abs((bb.x + bb.w / 2) - pcx); if (d < bd) { bd = d; tb = bb; } }
                            if (tb) { let dxb = (tb.x + tb.w / 2) - pcx; if (Math.abs(dxb) > 16) this.isFacingLeft = dxb < 0; }
                        } else {
                            // KHONG CO BOSS = dang chay map: moi thu den tu BEN PHAI -> luon quay mat phai
                            if (wildernessOn()) {
                                if (keys.KeyA || keys.ArrowLeft) this.isFacingLeft = true;
                                else if (keys.KeyD || keys.ArrowRight) this.isFacingLeft = false;
                            } else this.isFacingLeft = false;
                        }
                    }
                }

                // --- TUYET KY CLAW: lao toi - chem - lui ve (bat tu trong luc thi trien) ---
                if (this.clawUltState) { shootKey = false; fireKey = false; chargeKey = false; this.clawTickUlt(); }   // @@VK-DINOSWORD

                let doDrop = false;
                if (coBuc() && (gameState === 'normal' || gameState === 'test_boss' || gameState === 'boss_rush' || gameState === 'pvp') && this.grounded && crouchKey && this.dropTimer <= 0 && !this.tank) {
                    let curTop = this.y + this.h;
                    if (platforms.some(pf => this.x + this.w > pf.x + 5 && this.x < pf.x + pf.w - 5 && pf.top > curTop + 20 && pf.top < curTop + 150)) doDrop = true;
                    if (mapTheme === 'ocean' && Math.abs(curTop - OCEAN_SURF) < 22) doDrop = true;   // dung tren BEO: bam S de lan xuong nuoc
                }
                let _wasCrouch = this.isCrouching;
                if (crouchKey && this.grounded && !doDrop && !this.tank && !(this.id===1&&typeof ironOn==='function'&&ironOn()&&this.ironhaul?.mode===2) && !(typeof sgRobot === 'function' && sgRobot(this))) {
                    if (!this.isCrouching) this._cuiTu = frames;   // khung BAT DAU cui
                    this.isCrouching = true; this.h = 24*sScale; this.w = 48*sScale;
                }
                else { this.isCrouching = false; this.h = 44*sScale; this.w = 32*sScale; }
                if (this.isCrouching !== _wasCrouch && this.grounded) this.y += (this.isCrouching ? 20 : -20) * sScale;
                if(this.id===1&&danteOn()){this.h=this.isCrouching?40:60;this.w=DT_W;}
                if(this.id===1&&(typeof vergilOn==='function'&&vergilOn())){this.h=this.isCrouching?38:VG_H;this.w=VG_W;}
                if(this.id===1&&typeof ironOn==='function'&&ironOn()){this.w=this.ironhaul?.mode===2?86:40;this.h=this.ironhaul?.mode===2?34:this.isCrouching?48:68;}
                if (doDrop) { this.dropTimer = 16; this.dropFromTop = this.y + this.h; this.grounded = false; if (this.dy < 1) this.dy = 1; }

                // Body Slam chi bat khi dang tren khong sau it nhat lan nhay thu hai.
                // Dat toc do roi truc tiep de khong bi gioi han boi gravity/crouch thuong.
                // BODY SLAM can chuoi nhay hai nac binh thuong; o VOID nhay la dich chuyen
                // nen no khong bao gio khop. Khoa han thay vi de no chay sai.
                if (hasRune('bodyslam') && !(typeof voidBat === 'function' && voidBat())
                    && crouchKey && !this.grounded && this.jumpCount >= 2 && !this.bodySlamActive) {
                    this.bodySlamActive = true;
                    this.bodySlamArmed = true;
                    this.bodySlamJumpCount = this.jumpCount;
                    this.hoverTimer = 0;
                    this.hoverArmed = false;
                    this.dy = Math.max(this.dy, 22);
                }

                if (this.pulsarChannel) {
                    this.pulsarTickRoi(crouchKey);   // @@VK-PULSAR: dang giu sao thi roi cham
                } else {
                if ((this.mayBay || 0) > 0){
                    this.mayBay--;
                    if (hasRune('triplejump')){
                        let v = 4.4;
                        if (keys['KeyW'] || keys['Space'] || keys['ArrowUp']) this.dy = -v;
                        else if (crouchKey) this.dy = v;
                        else this.dy = 0;
                    } else {
                        this.dy = 0;
                        if (crouchKey) this.mayBay = 0;
                    }
                } else if (this.grounded){ this.hoverArmed = false; this.hoverTimer = 0; }
                if (hasRune('hover') && this.hoverArmed && this.hoverTimer <= 0 && this.dy >= 0){
                    this.hoverTimer = 120; this.hoverArmed = false; this.dy = 0;   // RUNE LO LUNG: dat dinh nhay -> dung yen 2s
                    this.hoverShot = 1;                                            // moi lan lo lung duoc 1 phat Charge mien phi
                    floatingTexts.push(new FloatingText(this.x - 16, this.y - 26, "LƠ LỬNG · CHẠM K"));
                }
                if (this.hoverTimer > 0){
                    this.hoverTimer--; this.dy = 0; if (crouchKey) this.hoverTimer = 0;
                    // Bam K (nut CHARGE) la don charge BUNG RA NGAY, khong phai giu.
                    // J van la ban thuong y nhu binh thuong — khong dong vao.
                    if (chargeKey && !this._hoverKPrev && this.hoverShot > 0 && !this.isOverheated && this.attackCooldown <= 0 && this.ammo > 0) {
                        this.hoverShot = 0;
                        this.aKeyHeldTime = 0; this.chargeProgress = 0;   // huy tich charge, don da bung roi
                        this.hoverMidCharge(this.id === 1 ? currentAmmoType : p2AmmoType);
                    }
                    this._hoverKPrev = chargeKey;
                }
                else if (mapTheme === 'ocean' && (this.y + this.h) > OCEAN_SURF + 4){ this.dy += 0.20; if (crouchKey) this.dy += 0.60; if (this.dy > 3.4) this.dy = 3.4; }   // DUOI NUOC: chim cham, nang
                else { this.dy += this.gravity * (hasRune('hyperspeed') ? 1.5 : 1); if (crouchKey && !this.grounded) this.dy += 1.0 * (hasRune('hyperspeed') ? 1.5 : 1); }
                if (coBuc() && (gameState === 'normal' || gameState === 'test_boss' || gameState === 'boss_rush' || gameState === 'pvp')) {
                    if (this.dropTimer > 0) this.dropTimer--;
                    this.y += this.dy;
                    let feet = this.y + this.h, prevFeet = feet - this.dy, landTop = Infinity, landPf = null;
                    if (this.dy >= 0) {
                        for (let pf of platforms) {
                            if (pf.isLeaf && !pf.solid) continue;
                            if (pf.pad && !pf.solid) continue;   // la beo da vo
                            if (this.dropTimer > 0 && pf.top <= this.dropFromTop + 10) continue;
                            if (this.x + this.w > pf.x + 5 && this.x < pf.x + pf.w - 5 && ((prevFeet <= pf.top + 2 && feet >= pf.top - 2) || (mapTheme!=='tetris' && feet >= pf.top - 2 && feet <= pf.top + 30) || (mapTheme==='tetris' && this.y <= pf.top + 2 && feet >= pf.top - 2 && feet <= pf.top + tetris.cell + 4)) && pf.top < landTop) { landTop = pf.top; landPf = pf; }
                        }
                    }
                    if (landTop !== Infinity) {
                        if (landPf && landPf.isLeaf && !this.grounded && this.dy > 3) landPf.leafTimer += Math.min(28, this.dy * 2.2);
                        this.y = landTop - this.h; this.dy = 0; this.grounded = true; this.canDoubleJump = false; this.triggerBodySlamImpact(); this.jumpCount = 0; this.mayBay = 0; this.bodySlamArmed = false;
                    }
                    else { this.grounded = false; if (feet > 344 && mapTheme !== 'tetris' && mapTheme !== 'ocean' && !this.tank) {
                        // FALL HAZARDS: vuc nui va dung nham deu gay 2 dmg; cac ho roi khac van theo damage mac dinh.
                        // KHIEN KHI CHANNEL C2: roi ho thi MAT trang thai channel nhung KHONG mat mau
                        let _inChan = (this.clawChannel || this.rapidChannel || this.pulseLaserChannel || this.fireChannel || this.lightChannel || this.splitChannel || this.pulsarChannel || this.boomChannel);
                        if (hasRune('chanshldx') && _inChan && this.chanInvul > 0) {   // CHI trong cua so 2 giay dau
                            if (this.pulsarStar && this.pulsarStar.onBody) this.pulsarStar = null;
                            this.clawChannel = false; this.rapidChannel = false; this.pulseLaserChannel = false; this.fireChannel = false;
                            this.lightChannel = false; this.splitChannel = false; this.pulsarChannel = false; this.boomChannel = false; this.boomChanLeft = 0;
                            projectiles.forEach(p => { if (p.bounce) p.bounce = false; });
                            this.lightLinkTargets = null; this.laserActiveTimer = 0; this.clawChannelHits = 0; this.aKeyHeldTime = 0; this.chargeProgress = 0;
                            this.chanInvul = 0;
                            floatingTexts.push(new FloatingText(this.x, this.y - 16, "THOÁT CHANNEL"));
                        }
                        else {
                            let fallDmg = (mapTheme === 'dinhnui' || mapTheme === 'volcano') ? 2 : 3;
                            let cuu = !this.invincible && this.id === 1 && typeof deoPhu === 'function' && deoPhu('vit') && frames >= (this.vitHo || 0);
                            if (cuu) { this.vitHo = frames + 600; floatingTexts.push(new FloatingText(this.x, this.y - 16, "VỊT!")); }
                            else { if (!this.invincible) this.takeDamage(fallDmg); floatingTexts.push(new FloatingText(this.x, this.y - 16, "-" + fallDmg + "!")); if (SFX.hit) SFX.hit(); }
                        }
                        launchFromPit(this);
                    } }
                    if (this.tank && mapTheme !== 'tetris' && mapTheme !== 'ocean') this.tankLeoHo();
                    // ==== VA CHAM CANH: cot dung nham la vat the dac, khong di xuyen ====
                    for (let pf of platforms) {
                        if (!pf.pillar) continue;
                        if (pf.tetris) continue;   // Tetris dung resolveTetrisWalls (luoi), khong day theo tam
                        let pTop = pf.top, pBot = pf.top + (pf.h || 80);
                        if (this.y + this.h <= pTop + 6) continue;      // dang dung tren nóc -> bo qua
                        if (this.y >= pBot) continue;
                        if (this.x + this.w <= pf.x || this.x >= pf.x + pf.w) continue;
                        let outL = pf.x - this.w, outR = pf.x + pf.w;
                        this.x = (Math.abs(this.x - outL) <= Math.abs(this.x - outR)) ? outL : outR;
                        this.x = Math.max(worldL() - 10, Math.min(worldR() - this.w + 10, this.x));
                    }
                    // TETRIS: dung DAU vao khoi -> khong nhay xuyen len tren
                    if (mapTheme==='tetris' && tetris && this.dy < 0){ let headRow=Math.floor((this.y - tetris.worldTop)/tetris.cell), lc=Math.floor((this.x+3 - tetris.fx)/tetris.cell), rc=Math.floor((this.x+this.w-3 - tetris.fx)/tetris.cell);
                        for (let cc=lc; cc<=rc; cc++){ if (cc<0||cc>=tetris.cols) continue; if (headRow>=0 && headRow<tetris.rows && tetris.grid[headRow][cc]){ this.y = tetris.worldTop + (headRow+1)*tetris.cell; this.dy = 0; break; } } }
                } else {
                    this.y += this.dy;
                    if (this.y >= 320 - this.h) { this.y = 320 - this.h; this.dy = 0; this.grounded = true; this.canDoubleJump = false; this.triggerBodySlamImpact(); this.jumpCount = 0; this.mayBay = 0; this.bodySlamArmed = false; }
                }
                }
                
                let checkAmmo = this.id === 1 ? currentAmmoType : p2AmmoType;
                let regenRate = (VK[checkAmmo] && VK[checkAmmo].nhipHoi) || 22;   // @@KHOI-VK
                if (combatStance === 1) regenRate = Math.max(5, Math.floor(regenRate / 2)); 
                
                // SHIN TRICKSTER: bat thuong VO HAN — luon day dan, khong bao gio qua nhiet
                if (hasRune('shintrick')) { this.isOverheated = false; this.overheatTimer = 0; this.ammo = this.maxAmmo; }
                if (this.id === 1 && typeof asTick === 'function') asTick(this);   // @@HE-APSUAT: vua qua nhiet -> no nhiet / cuong che xa
                if (this.isOverheated) {
                    this.overheatTimer--;
                    if (this.overheatTimer <= 0) { this.isOverheated = false; this.ammo = this.maxAmmo; if (vkMoc(checkAmmo, 'hetQuaNhiet')) vkMoc(checkAmmo, 'hetQuaNhiet').call(this);
                    }
                }
                else if (vkMoc(checkAmmo, 'hoiDan')) vkMoc(checkAmmo, 'hoiDan').call(this);   // @@KHOI-VK — vu khi tu hoi dan theo luat rieng
                /* hoiKhiGiuK: vu khi dang giu K (tru dan vao kho) van hoi dan nhu luc ngung ban (Custom) */
                else if ((!shootKey || (VK[checkAmmo] && VK[checkAmmo].hoiKhiGiuK && !fireKey))
                         && !this.ultActive && this.laserActiveTimer <= 0 && this.fireBreathTimer <= 0) {
                    // WHISPER: KHONG co hoi dan. Chi Overheat moi nap lai du 4 vien.
                    // CAN CHIEN: giu J thi het rat nhanh nhung cham tha lien tuc lai vo tan,
                    // vi hoi dan chi can !shootKey. Nay bat phai NGUNG HAN mot luc moi hoi.
                    let _khoaHoi = (typeof giaoLaCanChien === 'function') && giaoLaCanChien(checkAmmo)
                                   && (this._hoiCho || 0) > 0;
                    let _mcKhoa = !!(VK[checkAmmo] && VK[checkAmmo].khoaHoi && VK[checkAmmo].khoaHoi.call(this));   // @@KHOI-VK: vu khi tu khoa hoi dan (Custom Man Cuoi)
                    if (!(VK[checkAmmo] && VK[checkAmmo].khongHoiDan) && !_khoaHoi && !_mcKhoa && this.ammo < this.maxAmmo && frames % regenRate === 0) this.ammo += 1;
                }

                if (this._hoiCho > 0) this._hoiCho--;
                if (this._shipNoi > 0) this._shipNoi--;   // @@HE-SHIPBO: cua so noi nhat hai
                if (typeof this.dswXoayTick === 'function') this.dswXoayTick();   // @@HE-XOAYKHONG
                // @@HE-BUAUNITY: luong set phai chay DOC LAP voi loai dan dang cam. Unity xoay
                // vong ba loai dan, nen ngay sau khi phong don Hop Nhat nguoi choi co the da
                // khong con cam Bua nua — de tick trong buaTick thi luong set dung hinh giua chung.
                if (this.buaUniSet && typeof this.buaUniTick === 'function') this.buaUniTick();
                if (this.giaoUniXoay && typeof this.giaoUniTick === 'function') this.giaoUniTick();
                if (this.ammo < 0) this.ammo = 0;   // san the luc: khong bao gio am
                if (this.meleeTimer > 0) this.meleeTimer--; if (this.clawStrikeTimer > 0) this.clawStrikeTimer--; if (this.shieldCd > 0) this.shieldCd--; if (this.shinGuardCd > 0) this.shinGuardCd--;
                if (this.clawComboWindow > 0) this.clawComboWindow--;   // het cua so -> combo Zero reset ve nhat 1
                this.katanaTick();
                if (this.clawRiseWindow > 0) this.clawRiseWindow--;     // cua so bam NHAY de ra Ryuenjin
                if (this.kkCho) this.kkTick();                  // @@VK-DINOSWORD: luoi kiem khi cho nhat chem quet qua
                if (this.crescent2) this.clawTickCrescent2();   // @@VK-DINOSWORD: luoi dao thu hai cua SWORDMASTER
                // VUNG CHEM dang song: tinh lai theo vi tri HIEN TAI moi frame -> hitbox trung khop hoat anh
                if (this.swordPose) { this.swordPose.t--; if (this.swordPose.t <= 0) this.swordPose = null; }
                if (this.slashAtk) {
                    let _a = this.slashAtk, _r = this._slashRect();
                    this.clawStrikeRect = _r; this.clawStrikeTimer = 3;
                    if (_a.mika) {
                        // MIKAZUKIZAN: phan LOI (tam goc) an dmg day, phan NOI DAI chi 1 dmg.
                        // Danh loi truoc de dich dung gan luon an don manh, dich o ria moi an don nhe.
                        this._slashStrike(this._slashRect(true), _a.dmg, _a.hit);
                        this._slashStrike(_r, 2, _a.hit);   // RIA Mikazukizan: 2 dmg
                    } else {
                        this._slashStrike(_r, _a.dmg, _a.hit);
                    }
                    /* GAT DAN. Truoc day chi chem vo dan khi mang NOVA hoac rune VA CHAM DAN
                       — va ke ca luc do cung chi don `bossProjectiles`, nen trong PvP khong
                       ai pha noi dan cua doi thu. Do duoc: dat 10 vien dan dung yen ngay
                       truoc mat roi vung giao / bua / kiem, ca ba deu pha 0/10.
                       Gio GIAO va BUA gat duoc dan bang chinh than vu khi (do la ban sac cua
                       vu khi can chien co can dai), con KIEM van phai mang rune VA CHAM DAN
                       hoac Awakened Nova nhu cu. */
                    if (_a.cut) cutBossProjectiles(_r, this.id);   // KIEM: chi khi mang NOVA hoac VA CHAM DAN
                    _a.t--; if (_a.t <= 0) this.slashAtk = null;
                }
                if (this.clawDive > 0) this.clawTickDive();   // @@VK-DINOSWORD: HYOURETSUZAN dang lao xuong
                
                /* @@HE-VENOM-ULT — chieu cuoi Venom la mot trang thai BUFF chu khong phai
                   mot che do ban rieng. Truoc day no van di qua `doUltFire`, ma toan bo phan
                   CONG CHARGE (`aKeyHeldTime++`, `chargeProgress`) lai nam trong nhanh `else`
                   nay — nen suot 10 giay ult: chargeProgress = 0, khong co vong charge nao
                   hien ra, va giu K chi lap lai cu vung manh moi khung. Gio cho no chay thang
                   duong danh thuong; doi lai phai TU dem `ultTimer` vi `doUltFire` khong chay. */
                let _venUlt = (this.ultActive && !!(VK[checkAmmo] && VK[checkAmmo].ultBuff));   // @@KHOI-VK
                if (_venUlt) this.ultTimer++;
                if (this.ultActive && !_venUlt) { this.doUltFire(checkAmmo, fireKey, chargeKey); } else {
                // CRYO: cac moc o 15/45/75/105 khung, tren 105 con tich tiep toi 165 (2.75s)
                let maxChargeFrames = (VK[checkAmmo] && VK[checkAmmo].sacToiDa) ? (typeof VK[checkAmmo].sacToiDa === 'function' ? VK[checkAmmo].sacToiDa.call(this) : VK[checkAmmo].sacToiDa)   // @@KHOI-VK
                    : 90;
                let _sfxCd = this.attackCooldown, _sfxLa = this.laserActiveTimer, _sfxBr = this.fireBreathTimer;

                // K = CHARGE: tich luy khi giu (dan Rapid khong charge)
                this.ultFillMult = 1;
                // SHIN TRICKSTER cho phep charge o the Trickster (binh thuong chi Gunslinger).
                // CHANNEL van chi co o Gunslinger vi cac cong Channel deu bat buoc combatStance === 0.
                /* @@HE-TAMLUAN — TAM LUAN KHONG CO CHARGE.
                   Ba the cua Tam Luan la ba co may nuoi nhau: Trickster cam u sung (tu cam
                   khi vao the, khong bam phim), Gunslinger ban thuong khong bao gio Qua Nhiet,
                   Royal Guard hoa xe tang. Cach choi cua no la DOI THE dung luc, khong phai
                   giu phim. Truoc day rieng Gunslinger van charge duoc y het Rapidfire thuong
                   — tuc la an ca hai bo suc manh cung luc: vua khong qua nhiet vua cam them
                   duoc tru sung bang phim K, va vao duoc ca Channel goi hai drone.
                   Chan o day la chan tron: khong tich charge thi cung khong co Channel. */
                let _tamLuan = !!(VK[checkAmmo] && VK[checkAmmo].khongSac && VK[checkAmmo].khongSac.call(this));   // @@KHOI-VK (Tam Luan cua Rapidfire)
                let _canCharge = !_tamLuan
                              && ((combatStance === 0) || (combatStance === 1 && hasRune('shintrick')) || (typeof bzBat === 'function' && bzBat(this)));
                // RAPIDFIRE: charge khong dung chung he voi thanh nhiet nen Overheat khong chan.
                let _boQuaNhiet = !!(VK[checkAmmo] && VK[checkAmmo].sacBoQuaNhiet) || (typeof bzBat === 'function' && bzBat(this));   // @@KHOI-VK + Berserker van nap khi qua nhiet
                /* KATANA: J cung la mot phim charge. Dem rieng bang `katJ`, chi dem khi cu
                   bam do DA duoc `katJBam` chap nhan la mot cu tich (khong phai Dash+J hay
                   Cui+J). Tran o KAT_J_TRAN nen giu lau hon 2 giay khong an them gi. */
                { let _vkJ = vkMoc(checkAmmo, 'tichJ'); if (_vkJ) _vkJ.call(this, fireKey); }   // @@KHOI-VK — vu khi tich ca phim J (Katana)
                /* @@HE-LOLUNG3 — cham K luc lo lung da ra don rieng (hoverMidCharge). Truoc day chinh cu cham do van dem
                   charge tu khung sau va khi NHA K lai ban them don cham K cua vu khi (Luoi hai ra ca MOC -> "HỤT!").
                   Nuot cu bam do: khong dem charge cho toi khi nha K. */
                if (this._hoverNuot){ if (!chargeKey) this._hoverNuot = false; this.aKeyHeldTime = 0; this.chargeProgress = 0; }
                let _bzDangJ = typeof bzBat === 'function' && bzBat(this) && !!(this.dk && (fireKey || this.dk.jHold));
                if (chargeKey && _canCharge && !_bzDangJ && !this._hoverNuot && (_boQuaNhiet || !this.isOverheated) && this.laserActiveTimer <= 0 && this.fireBreathTimer <= 0) {
                    this.aKeyHeldTime++; this.chargeProgress = Math.min(100, (this.aKeyHeldTime / maxChargeFrames) * 100);
                    if (this.chargeProgress >= 100) { let oc = this.aKeyHeldTime - maxChargeFrames; this.ultFillMult = oc >= 300 ? 3 : 2; }
                }

                { let _vkC = vkMoc(checkAmmo, 'channel');   // @@KHOI-VK — Channel cua vu khi da vao khu
                  if (_vkC && chargeKey && combatStance === 0 && !this.isOverheated && this.aKeyHeldTime >= 180) _vkC.call(this); }
                { let _vkK = vkMoc(checkAmmo, 'giuK'); if (_vkK && chargeKey) _vkK.call(this); }   // @@KHOI-VK — moi khung dang giu K
                if (this.wsChannel) this.wsTickChannel();   // @@VK-WHISPER: DOC TAU
                if (this.cryoChannel) this.cryoTickChannel();   // @@VK-CRYO: BAO TUYET
                { let _vkC2 = vkMoc(checkAmmo, 'channelRieng'); if (_vkC2) _vkC2.call(this, chargeKey); }   // @@KHOI-VK — Channel co cong / moc rieng, tu kiem dieu kien
                if (this.boomChannel) this.boomTickChannel(chargeKey);   // @@VK-BOOMERANG

                /* @@HE-JKKEP — loai dan charge duoc CA J LAN K: nha K dung luc don J vua ra (con hoi don)
                   thi GIU don K lai toi 45 khung roi moi ra, thay vi xit mat. Vd Katana: nha J = Void Slash
                   khoa muc tieu, nha K ngay sau do van ra Round Trip / Judgement Cut End. */
                let _kCho = false;
                if (!chargeKey && this.aKeyHeldTime > 0 && jkKep(checkAmmo) && this.attackCooldown > 0 && !this.katVong){
                    this._kChoT = (this._kChoT || 0) + 1;
                    if (this._kChoT <= 45) _kCho = true;
                } else this._kChoT = 0;
                // K nha ra = ban don CHARGE theo muc
                if (!chargeKey && this.aKeyHeldTime > 0 && !_kCho && !_bzDangJ) {
                    // @@HE-HOVER-DAN — CHAM K trong luc dang lo lung = thi trien don rieng cua
                    // loai dan do, mot lan moi lan lo lung. GIU K van la charge binh thuong.
                    if (vkMoc(checkAmmo, 'nhaKTruoc')) { vkMoc(checkAmmo, 'nhaKTruoc').call(this); }   // @@KHOI-VK — nha K xu ly TRUOC Kiem Tran (DinoSaw, Custom)
                    else if (this.clawChannel) { this.launchClawSwords(true); this.clawChannel = false; this.clawChannelHits = 0; }
                    else if (vkMoc(checkAmmo, 'nhaK')) { vkMoc(checkAmmo, 'nhaK').call(this); }   // @@KHOI-VK
                    this.chargeProgress = 0; this.aKeyHeldTime = 0;
                }

                // J = BAN LIEN PHANH: don co ban, lien tuc khi giu (moi loai dan)
                // Royal Guard binh thuong khong ban J (de danh cho khien). Nhung khi dang la
                // XE TANG thi J chinh la nut ban phao — khong mo ra thi xe khong ban duoc gi.
                let _choBanJ = (combatStance !== 2) || !!this.tank || (typeof sgOn === 'function' && sgOn(this) && (sgState(this).mode !== 'pistol' || sgRobot(this)));
                // @@HE-XOAYKHONG: dang xoay tren khong thi J la nut GIU, khong duoc coi la
                // mot cu bam moi — neu khong thi vua xoay vua ra don thuong, an tut the luc
                // xuong am va cu bo cuoi cung khong bao gio duoc tinh.
                if (this.xoayKhong && !this.grounded){ /* dang xoay: bo qua don J thuong */ }
                /* jQuaHoi (@@KHOI-VK): vu khi cho cu J noi tiep vuot hang rao hoi don — Venom J -> Dash -> J
                   (dang luot xuyen), Katana Dash J -> J (cua so Rapid Slash). */
                else if (fireKey && (this.aKeyHeldTime === 0 || jkKep(checkAmmo)) && _choBanJ && !this.isOverheated && this.laserActiveTimer <= 0
                         && (this.attackCooldown <= 0 || (VK[checkAmmo] && VK[checkAmmo].jQuaHoi && VK[checkAmmo].jQuaHoi.call(this)))) {
                    if (vkMoc(checkAmmo, 'banJ')) vkMoc(checkAmmo, 'banJ').call(this);   // @@KHOI-VK
                }

                { let _vkF = vkMoc(checkAmmo, 'moiKhung'); if (_vkF) _vkF.call(this, checkAmmo, fireKey, chargeKey, crouchKey); }   // @@KHOI-VK — nhip rieng moi khung (DinoSaw, Custom)

                // Rapid charge: xa tung vien gacha toc do cao (giong ban goc), xong overheat 1s
                // Bo he rapidBurst: no dung fireRapidChannel() — ham con sinh dan DO / VANG /
                // chum 2-3 vien cua ban Rapidfire cu, lot vao giua loat ban moi.
                this.rapidBurst = 0;

                { let _vkG = vkMoc(checkAmmo, 'giuJ'); if (_vkG && fireKey) _vkG.call(this); }   // @@KHOI-VK
                if (this.id === 1 && (this.attackCooldown > _sfxCd || this.laserActiveTimer > _sfxLa || (_sfxBr === 0 && this.fireBreathTimer > 0))) SFX.shoot(checkAmmo);
                }

                if (this.laserActiveTimer > 0) this.laserActiveTimer--; 
                if (this.attackCooldown > 0) this.attackCooldown--;
                if (this.invincible) { this.invTimer--; if (this.invTimer <= 0) this.invincible = false; }

                // Khang lua: chi bi dot 1 lan neu dinh lua lien tuc >= 0.75s
                if (this.burnHitTimer > 0) {
                    this.burnHitTimer--; this.burnExposure++;
                    if (this.burnExposure >= 45 && !this.burnApplied) {
                        this.burnApplied = true;
                        if (!(this.id === 1 && typeof battuBat === 'function' && battuBat())) this.hp -= 1;
                        visualEffects.push(new Effect(this.x + this.w/2, this.y, 'explosion', true, 12));
                        this.xuLyChet();   // @@HE-CHETCHUAN
                    }
                } else { this.burnExposure = 0; this.burnApplied = false; }

                this.infTickLua();   // @@VK-INFERNO
            }
// PLAYER_PART_END s3.Player._updateGoc.1
}
