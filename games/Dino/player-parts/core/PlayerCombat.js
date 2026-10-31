// PLAYER_FILE: PlayerCombat
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CM, Effect, FloatingText, PVP_ULT_KHUNG, SFX, VK, allTargets, bosses, checkAABB, currentAmmoType, cusNguoiDang, damageBossWithFirstStrike, dealDamage, doChieuThu, dswAngle, dswBladeCol, enemies, floatingTexts, frames, gameState, gdCatHop, giaoLaCanChien, giaoSong, hasRune, hitCat, hitDam, hitDiem, katBat, katUltMo, obstacles, p2AmmoType, projectiles, pvpDich, pvpVoBoc, qsBatDau, qsFin, qsKet, qsT, rfTanCuoc, score, shakeTimer, slamCanBat, tlBat, ultCharge, visualEffects, vkMoc
// index.html:47440 · Phạm vi: Player
class __Part0 {
// PLAYER_PART_BEGIN s3.Player.ngatMoiChannel.1 EDITABLE
ngatMoiChannel(){
                if (this.pulsarChannel && this.pulsarStar && this.pulsarStar.onBody) this.pulsarStar = null;
                this.cryoChannel = false; this.cryoBaoT = 0; this.clawChannel = false;
                this.rapidChannel = false; this.rfDroneCho = { dan: 0, laser: 0 };
                if (this.rapidDrone) for (let _d of this.rapidDrone) rfTanCuoc(_d);
                this.pulseLaserChannel = false; this.fireChannel = false;
                this.lightChannel = false; this.splitChannel = false;
                this.pulsarChannel = false; this.boomChannel = false; this.boomChanLeft = 0;
                projectiles.forEach(p => { if (p.bounce) p.bounce = false; });
                this.lightLinkTargets = null; this.laserActiveTimer = 0; this.clawChannelHits = 0;
                this.aKeyHeldTime = 0; this.chargeProgress = 0;
                floatingTexts.push(new FloatingText(this.x, this.y - 20, "NGAT CHANNEL!"));
            }
// PLAYER_PART_END s3.Player.ngatMoiChannel.1
}

// index.html:47453 · Phạm vi: Player
class __Part1 {
// PLAYER_PART_BEGIN s3.Player.getShootPos.1 EDITABLE
getShootPos(overrideForm = -1) {
                let sScale = this.getFormScale(overrideForm);
                // NONG SUNG LECH: quay phai thi nong nam +41px so voi tam than, quay trai
                // chi -31px. Lech 10px nay lam nguoi dung BEN PHAI (phai quay trai de ban)
                // luon ban hut hon: do Prism J thi ben trai 2 vien cham = 4 dmg, ben phai
                // 1 vien cham = 2 dmg. O PvP hai nguoi luon quay vao nhau nen no thanh mot
                // loi thiet vi tri co dinh. Chi soi guong o PvP de khong dong vao che do PvE.
                let _voi = (this.isCrouching ? 52*sScale : 42*sScale) + 15;
                let ringX = this.isFacingLeft
                    ? (gameState === 'pvp' ? this.x + this.w - _voi : this.x - 15*sScale)
                    : this.x + _voi;
                let ringY = this.y + (this.isCrouching ? 16*sScale : 12*sScale);
                return { x: ringX, y: ringY, scale: sScale, dir: this.isFacingLeft ? -1 : 1 };
            }
// PLAYER_PART_END s3.Player.getShootPos.1
}

// index.html:47820 · Phạm vi: Player
class __Part2 {
// PLAYER_PART_BEGIN s3.Player.tryUltimate.1 EDITABLE
tryUltimate(){ let _c = cusNguoiDang; cusNguoiDang = this; try { return this._tryUltGoc(); } finally { cusNguoiDang = _c; } }
// PLAYER_PART_END s3.Player.tryUltimate.1
}

// index.html:47821 · Phạm vi: Player
class __Part3 {
// PLAYER_PART_BEGIN s3.Player._tryUltGoc.1 EDITABLE
_tryUltGoc() {
                { let _vkR = vkMoc(this.ammoType, 'batUltRieng'); if (_vkR){ _vkR.call(this); return; } }   // @@KHOI-VK — chieu cuoi rieng, dung truoc moi cong chung (Midas)
                // PvP: phai NAP DAY moi bam duoc, va moi lan bat duoc danh so de con
                // chan tong sat thuong cua rieng lan do (xem PVP_ULT_TRAN).
                if (gameState === 'pvp'){
                    if (this.ultActive) return;
                    if ((typeof ultCharge === 'undefined' ? 0 : ultCharge) < 100){
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(150, 0.10, 'square', 0.14, 90);
                        return;
                    }
                    this._ultLan = (this._ultLan || 0) + 1;
                    this._ultHan = frames + PVP_ULT_KHUNG;
                }
                // SHIN TRICKSTER: doi lay ban khong gioi han + Charge o the Trickster,
                // nguoi choi mat CA Channel LAN Ult. Trickster von da co DPS cao va phan than
                // hut aggro nen khong con can them mot don bung nua.
                if (hasRune('shintrick')){
                    // QUICKSILVER: bam lan nua trong luc dang bat = ket som
                    if (qsT > 0) { qsKet(); return; }
                    if (qsFin) return;
                    if (!qsBatDau() && typeof SFX !== 'undefined' && SFX.tone) SFX.tone(150, 0.12, 'square', 0.16, 90);
                    return;
                }
                // TRUOC DAY: Unity chiem luon o chieu cuoi — bam U ra don HOP NHAT thay vi
                // chieu cuoi rieng cua loai dan. Ma Hop Nhat von khong hanh xu nhu mot chieu
                // cuoi, no giong mot ky nang hon, va doi lai thi nguoi choi mat sach chieu
                // cuoi cua ca ba loai dan mang theo — do la ly do Unity yeu.
                // Gio Hop Nhat tach ra thanh KY NANG RIENG bam phim Y, con U trong lai dung
                // nghia: chieu cuoi cua loai dan dang cam.
                if (this.ultActive || this.jcState || ultCharge < 100 || this.fireReactorTimer > 0 || this.lightningFormTimer > 0) return;
                // KATANA: chieu cuoi bi khoa cho toi khi dat hang Style S
                if (katBat(this.id === 1 ? currentAmmoType : p2AmmoType) && !katUltMo()){
                    floatingTexts.push(new FloatingText(this.x - 44, this.y - 34, "KHOÁ — CẦN HẠNG S"));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(200, 0.12, 'square', 0.16, 140);
                    return;
                }
                // TAM LUAN: chieu cuoi bi khoa o CA BA THE. Ba the DA chua san toan bo bo
                // ky nang lan chieu cuoi (Royal Guard chinh la xe tang), nen mo them ult nua la
                // phat khong. Truoc day chi chan the 0: bam U o Trickster/Royal Guard van no ult
                // xe tang goc, ma ult goc co dong combatStance = 0 -> nem nguoi choi ve
                // Gunslinger kem xe tang, nhin nhu "dung duoc ult o Gunslinger".
                if (typeof tlBat === 'function' && tlBat()){
                    floatingTexts.push(new FloatingText(this.x - 30, this.y - 30, "CHIÊU CUỐI BỊ KHOÁ"));
                    return;
                }
                let ammo = currentAmmoType;
                let _vkU = vkMoc(ammo, 'batUlt');       // @@KHOI-VK
                if (_vkU) _vkU.call(this);
                else {
                    this.ultActive = true; this.ultAmmo = ammo; this.ultTimer = 0;
                    this.aKeyHeldTime = 0; this.chargeProgress = 0; this.isOverheated = false;
                    SFX.tone(660, 0.2, 'sawtooth', 0.25, 990); SFX.tone(990, 0.35, 'square', 0.15, 1320);
                }
            }
// PLAYER_PART_END s3.Player._tryUltGoc.1
}

// index.html:47881 · Phạm vi: Player
class __Part4 {
// PLAYER_PART_BEGIN s3.Player.doUltFire.1 EDITABLE
doUltFire(ammo, fireKey, chargeKey) {
                if (VK[ammo] && VK[ammo].ultBuff) return;   // @@KHOI-VK: chieu cuoi dang BUFF (Venom) khong di qua day
                this.ultTimer++;
                { let _vkT = vkMoc(ammo, 'ultTick'); if (_vkT){ _vkT.call(this, ammo, fireKey, chargeKey); return; } }   // @@KHOI-VK
                this.endUlt();
            }
// PLAYER_PART_END s3.Player.doUltFire.1
}

// index.html:47904 · Phạm vi: Player
class __Part5 {
// PLAYER_PART_BEGIN s3.Player.triggerBodySlamImpact.1 EDITABLE
triggerBodySlamImpact() {
                if (!this.bodySlamActive) return;

                // Thuoc do CHUAN: man choi rong 1000px = 23 cm  ->  1 cm = CM px (~43.5).
                // Ban cu quy 1cm = 20px nen ban kinh nho hon mot nua so voi mo ta.
                const tripleSlam = this.bodySlamJumpCount >= 3;
                let slamRadius = tripleSlam ? CM * 4 : CM * 2;
                if (typeof slamCanBat === 'function' && slamCanBat() && VK[currentAmmoType] && VK[currentAmmoType].slamTo) slamRadius *= VK[currentAmmoType].slamTo;   // @@KHOI-VK: vu khi nang (Bua, Luoi hai) dap rong hon
                const slamDamage = tripleSlam ? 6 : 3;
                const impactX = this.x + this.w / 2;
                const impactY = this.y + this.h;
                const withinImpactRadius = (target) => {
                    const nearestX = Math.max(target.x, Math.min(impactX, target.x + target.w));
                    const nearestY = Math.max(target.y, Math.min(impactY, target.y + target.h));
                    return Math.hypot(nearestX - impactX, nearestY - impactY) <= slamRadius;
                };

                allTargets().forEach(o => { if (bosses.indexOf(o) < 0 && withinImpactRadius(o)) {
                    o.hp -= slamDamage; if (o.hp <= 0 && o.dead !== undefined) o.dead = true; } });
                bosses.forEach(boss => {
                    if (!boss.invulnAll && withinImpactRadius(boss)) damageBossWithFirstStrike(boss, slamDamage);
                });
                visualEffects.push(new Effect(impactX, impactY, 'body_slam_shockwave', true, slamRadius));
                floatingTexts.push(new FloatingText(impactX - (tripleSlam ? 34 : 18), impactY - 20, tripleSlam ? 'MEGA SLAM! -6' : 'BODY SLAM! -3'));
                if (typeof slamCanBat === 'function' && slamCanBat() && this.id === 1)
                    this.slamCanDuoi(impactX, impactY, tripleSlam);
                this.invincible = true;
                this.invTimer = Math.max(this.invTimer, 15); // 0.25s at 60 FPS
                this.bodySlamActive = false;
                this.bodySlamArmed = false;
                this.bodySlamJumpCount = 0;
                this._slamLao = 0;
                shakeTimer = Math.max(shakeTimer, 8);
            }
// PLAYER_PART_END s3.Player.triggerBodySlamImpact.1
}

// index.html:47940 · Phạm vi: Player
class __Part6 {
// PLAYER_PART_BEGIN s3.Player.slamCanDuoi.1 EDITABLE
slamCanDuoi(ix, iy, to){
                if (vkMoc(currentAmmoType, 'slamDuoi')) vkMoc(currentAmmoType, 'slamDuoi').call(this, ix, iy, to);   // @@KHOI-VK
            }
// PLAYER_PART_END s3.Player.slamCanDuoi.1
}

// index.html:48350 · Phạm vi: Player
class __Part7 {
// PLAYER_PART_BEGIN s3.Player.meleeStrike.1 EDITABLE
meleeStrike(rect, dmg) {
                let hitAny = false;
                if (this.id === 1 && typeof gdCatHop === 'function') gdCatHop(rect);   // @@HE-GATDAN
                if (this.id === 1 && typeof doChieuThu === 'function') doChieuThu(rect, rect, dmg);   // @@HE-DOCHIEU
                this._meleeHits = new Set();   // ghi lai muc tieu dinh don GOC (cho AWAKENED: NOVA)
                if (gameState === 'pvp') {
                    let target = pvpDich(this);
                    if (target && checkAABB(rect, target)) {
                        if (target.isShielding()) visualEffects.push(new Effect(target.x + (target.isFacingLeft ? target.w : 0), target.y, 'parry'));
                        else { pvpVoBoc(target).takeDamage(dmg); hitAny = true; this._meleeHits.add(target); }
                    }
                } else {
                    obstacles.forEach(o => { if (checkAABB(rect, o)) { o.hp -= dmg; hitAny = true; this._meleeHits.add(o); } });
                    let _hd = this.isFacingLeft ? -1 : 1, _hf = (o2) => { if (typeof hitCat === 'function'){ let _p = hitDiem(o2, _hd, rect.y + rect.h / 2); hitCat(_p.x, _p.y, _hd * -0.5, dmg >= 5); } };   // @@HE-HITFX
                    allTargets().forEach(en => { if (bosses.indexOf(en) < 0 && checkAABB(rect, en)) {
                    en.hp -= dmg; hitAny = true; this._meleeHits.add(en); _hf(en);
                    if (en.hp <= 0 && en.dead !== undefined) en.dead = true; } });
                    bosses.forEach(b => {
                        if (checkAABB(rect, b)) {
                            this._meleeHits.add(b);
                            if (b.invulnAll) { visualEffects.push(new Effect(b.x + b.w/2, b.y, 'parry', false)); }
                            else if (b.name === "AEGIS REX") { if (b.shieldBrokenTimer > 0) { damageBossWithFirstStrike(b, dmg); hitAny = true; } else { b.hitShield(3, b.x + b.w/2, b.y + b.h/2); } }
                            else if (b.name === "HELIOS REX" && (b.shieldTimer > 0 || b.spamShieldTimer > 0 || b.state.includes('clone_dash') || b.state === 'clone_bounce_back' || b.state === 'clone_wait') && b.shieldHp > 0) {
                                visualEffects.push(new Effect(b.x - 10, b.y + 20, 'parry', false)); b.shieldHp--;
                            } else { damageBossWithFirstStrike(b, dmg); hitAny = true; _hf(b); }
                        }
                    });
                }
                if (hitAny && gameState !== 'pvp') score += 1;
                // STYLE: meleeStrike la duong dmg can chien THU HAI (nen dat, chem bo, chuoi
                // giao, cac don dap dat cua bua). Truoc gio no khong he cong Style — chi
                // _slashStrike moi cong — nen mot nua so don danh khong len hang.
                // @@HE-STYLISH: diem gio tinh theo SAT THUONG o styTick — khong cong theo tung cu cham nua
                
                return hitAny;
            }
// PLAYER_PART_END s3.Player.meleeStrike.1
}

// index.html:48413 · Phạm vi: Player
class __Part8 {
// PLAYER_PART_BEGIN s3.Player.swordSwing.1 EDITABLE
swordSwing(kind, life, tail) {
                let from = (typeof dswAngle === 'function') ? dswAngle(this.swordPose || null) : null;
                this.swordPose = { kind: kind, t0: life + (tail || 9), t: life + (tail || 9), from: from };
            }
// PLAYER_PART_END s3.Player.swordSwing.1
}

// index.html:48423 · Phạm vi: Player
class __Part9 {
// PLAYER_PART_BEGIN s3.Player.hoverNgam.1 EDITABLE
hoverNgam(){
                let best = null, bd = 1e9, cx = this.x + this.w/2, cy = this.y + this.h/2;
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    let d = Math.hypot((o.x + (o.w||20)/2) - cx, (o.y + (o.h||20)/2) - cy);
                    if (d < bd){ bd = d; best = o; }
                }
                if (!best) return null;
                let tx = best.x + (best.w||20)/2, ty = best.y + (best.h||20)/2;
                return { o: best, g: Math.atan2(ty - cy, tx - cx), tx, ty };
            }
// PLAYER_PART_END s3.Player.hoverNgam.1
}

// index.html:48435 · Phạm vi: Player
class __Part10 {
// PLAYER_PART_BEGIN s3.Player._beginSlash.1 EDITABLE
_beginSlash(dmg, life, dir, reach, hTop, hBot, spinR) {
                this._meleeHits = new Set();
                // Danh la KHOA hoi dan 45 khung. Ngung han moi bat dau hoi lai.
                if (typeof giaoLaCanChien === 'function' && giaoLaCanChien(currentAmmoType)) this._hoiCho = 45;
                // AWAKENED NOVA tren KIEM: moi nhat chem ban ra mot KIEM KHI 1 dmg. To ban hon
                // giao khi cua Giao nhung bay NGAN hon — Kiem van la vu khi cua su chinh xac,
                // khong phai vu khi tam xa.
                if (currentAmmoType === 5 && this.id === 1 && typeof hasRune === 'function' && hasRune('explshot')
                    && typeof giaoSong !== 'undefined'){
                    let _dk = this.isFacingLeft ? -1 : 1;
                    giaoSong.push({ chu: this, x: this.x + this.w/2 + _dk * 30, y: this.y + this.h * 0.48,
                                    dir: _dk, r: 190, t: 13, t0: 13, dmg: 1,
                                    nho: 0, xuyen: 0, kiem: 1, hit: new Set() });
                }
                // AWAKENED: NOVA voi Claws = nhat chem duoc cuong hoa: +1 dmg va chem duoc dan.
                // CHEM DAN chi co khi mang NOVA hoac VA CHAM DAN — Claws tran KHONG chem dan duoc nua.
                // Bua: Nova thanh TIA SET. Giao: Nova thanh GIAO KHI. Ca hai deu KHONG cong
                // thang +1 nua — phan cong them phai den tu thu nhin thay duoc.
                let _n = hasRune('explshot') && currentAmmoType !== 11 && currentAmmoType !== 10 && currentAmmoType !== 5;
                // SWORDMASTER — MIKAZUKIZAN: noi them mot doan luoi trang khuyet vao moi nhat chem.
                let _sm = hasRune('swordmaster');
                let _ext = _sm ? Math.round(reach * 0.35 + 22) : 0;
                this.slashSeq = (this.slashSeq || 0) + 1;
                if (this._fxLast) {
                    this.swordSwing(this._fxLast.kind, life, Math.max(11, Math.round(life * 1.6)));
                    // Vet chem dung CHUNG doi tuong pose voi cay kiem -> hai hoat anh khong the truot nhip.
                    // Mau vet chem lay theo mau luoi kiem dang cam.
                    if (this._fxE) for (let _e of this._fxE) {
                        _e.pose = this.swordPose;
                        _e.life = this.swordPose.t0 + 2;
                        _e.swordCol = (typeof dswBladeCol === 'function') ? dswBladeCol() : null;
                    }
                    this._fxE = null;
                }
                this.slashAtk = { dmg: dmg + (_n ? 1 : 0), t: life, dir, reach: reach + _ext, hTop, hBot, spin: spinR ? spinR + (_sm ? 22 : 0) : 0,
                                  hit: new Set(), cut: (_n || hasRune('bulletclash') || _sm), mika: _ext,
                                  seq: this.slashSeq, base: dmg, fx: this._fxLast || null, t0: life };
            }
// PLAYER_PART_END s3.Player._beginSlash.1
}

// index.html:48474 · Phạm vi: Player
class __Part11 {
// PLAYER_PART_BEGIN s3.Player._slashRect.1 EDITABLE
_slashRect(coreOnly) {
                let a = this.slashAtk; if (!a) return null;
                // CHOC THEO GOC — dung khi Giao dam cheo vao muc tieu luc lo lung. Bao lay ca
                // doan tu than nguoi den mui giao thay vi mot hop nam ngang.
                if (a.goc !== undefined){
                    let cx = this.x + this.w/2, cy = this.y + this.h/2;
                    let tx = cx + Math.cos(a.goc) * a.tam, ty = cy + Math.sin(a.goc) * a.tam;
                    let x0 = Math.min(cx, tx) - 20, x1 = Math.max(cx, tx) + 20;
                    let y0 = Math.min(cy, ty) - 22, y1 = Math.max(cy, ty) + 22;
                    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
                }
                let ext = coreOnly ? (a.mika || 0) : 0;
                if (a.spin) { let R = a.spin - (coreOnly ? 22 : 0); let cx = this.x + this.w/2, cy = this.y + this.h/2; return { x: cx - R, y: cy - R, w: R*2, h: R*2 }; }
                let reach = Math.max(8, a.reach - ext);
                return a.dir === 1 ? { x: this.x + this.w - 5, y: this.y - a.hTop, w: reach, h: this.h + a.hTop + a.hBot }
                                   : { x: this.x + 5 - reach, y: this.y - a.hTop, w: reach, h: this.h + a.hTop + a.hBot };
            }
// PLAYER_PART_END s3.Player._slashRect.1
}

// index.html:48491 · Phạm vi: Player
class __Part12 {
// PLAYER_PART_BEGIN s3.Player._slashStrike.1 EDITABLE
_slashStrike(rect, dmg, hitSet) {
                let hitAny = false;
                if (this.id === 1 && typeof gdCatHop === 'function') gdCatHop(rect);   // @@HE-GATDAN
                // @@HE-WUKONGPHAN — phan than danh bang BO DON GIAO goc (2/2/4...), nhung
                // Hans dat muc cua no la 1 cho don thuong va 2 cho don manh. Ep o day, mot
                // cho duy nhat, thay vi sua tung don cua Giao.
                if (this._wkgPhan) dmg = (dmg >= 4) ? 2 : 1;
                if (gameState === 'pvp') {
                    let target = pvpDich(this);
                    if (target && !hitSet.has(target) && checkAABB(rect, target)) {
                        hitSet.add(target); this._meleeHits.add(target);
                        if (target.isShielding()) visualEffects.push(new Effect(target.x + (target.isFacingLeft ? target.w : 0), target.y, 'parry'));
                        else { pvpVoBoc(target).takeDamage(dmg); hitAny = true; }
                    }
                    return hitAny;
                }
                let apply = (o, isBoss) => {
                    if (hitSet.has(o) || !checkAABB(rect, o)) return;
                    hitSet.add(o); this._meleeHits.add(o);
                    if (isBoss) {
                        if (o.invulnAll) { visualEffects.push(new Effect(o.x + o.w/2, o.y, 'parry', false)); return; }
                        if (o.name === "AEGIS REX") { if (o.shieldBrokenTimer > 0) { o.hp -= dmg; hitAny = true; } else o.hitShield(3, o.x + o.w/2, o.y + o.h/2); return; }
                        if (o.name === "HELIOS REX" && (o.shieldTimer > 0 || o.spamShieldTimer > 0 || o.state.includes('clone_dash') || o.state === 'clone_bounce_back' || o.state === 'clone_wait') && o.shieldHp > 0) {
                            visualEffects.push(new Effect(o.x - 10, o.y + 20, 'parry', false)); o.shieldHp--; return;
                        }
                    }
                    // Truoc day tru mau thang: DinoSword khong bao giờ chi mang duoc.
                    // Do 300 lan voi rune Chi Manh 25%: toan ra 4, khong mot lan nao ra 8.
                    if (typeof dealDamage === 'function') dealDamage(o, dmg, 'ammo');
                    else o.hp -= dmg;
                    hitAny = true;
                    // @@HE-HITFX: vet CAT / vet DAM tren than muc tieu, mau theo vu khi (khong phai vu no)
                    if (typeof hitCat === 'function' && !this._wkgPhan){
                        let _A = this.slashAtk, _d = (_A && _A.dir) || (this.isFacingLeft ? -1 : 1);
                        let _p = hitDiem(o, _d, rect.y + rect.h / 2), _to = dmg >= 5;
                        if (_A && _A.dam) hitDam(_p.x, _p.y, _d, _to);
                        else if (_A && _A.spin) hitCat(_p.x, _p.y, (Math.random() - 0.5) * 0.5, _to);
                        else {
                            // @@HE-KIEMNGANG: vet cat NAM THEO HUONG NHAT KIEM — bo doc thi vet doc cheo,
                            // chem ngang thi vet nam ngang, chem hat thi vet cheo nguoc len
                            let _k = (this.id === 1 ? currentAmmoType : this.ammoType) === 5 && _A && _A.fx ? _A.fx.kind : null, _r = (Math.random() - 0.5);
                            let _g = !_k ? _d * (-0.5 + _r * 0.5)
                                   : (_k === 'z_horz' || _k === 'z_dash' || _k === 'z_thrust') ? _d * _r * 0.2
                                   : (_k === 'z_rise') ? -_d * (1.05 + _r * 0.3)
                                   : _d * (1.05 + _r * 0.3);
                            hitCat(_p.x, _p.y, _g, _to);
                        }
                    }
                    { let _vkT = vkMoc(currentAmmoType, 'trungCan'); if (_vkT) _vkT.call(this, o); }   // @@KHOI-VK — moi don can chien TRUNG DICH
                    // STYLE: duong CAN CHIEN truoc gio khong he cong diem — chi nhanh dan bay
                    // (projHit) moi goi addStyle. Ba vu khi can chien vi the danh mai khong len hang.
                    // @@HE-STYLISH: diem tinh theo sat thuong o styTick
                };
                obstacles.forEach(o => apply(o, false));
                enemies.forEach(o => apply(o, false));
                bosses.forEach(o => apply(o, true));
                if (hitAny) score += 1;
                return hitAny;
            }
// PLAYER_PART_END s3.Player._slashStrike.1
}

// index.html:48551 · Phạm vi: Player
class __Part13 {
// PLAYER_PART_BEGIN s3.Player.hoverMidCharge.1 EDITABLE
hoverMidCharge(ammo) {
                let half = 45;   // ~muc giua cua thanh charge
                // LUON quay ve ke dich gan nhat truoc khi ra don
                let _Ng = this.hoverNgam();
                if (_Ng) this.isFacingLeft = _Ng.tx < (this.x + this.w/2);
                floatingTexts.push(new FloatingText(this.x - 10, this.y - 40, "BẮN NHANH!"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(760, 0.09, 'square', 0.16, 1250);
                this._hoverNuot = true;                 // @@HE-LOLUNG3: nuot cu nha K ngay sau
                let _vkH = vkMoc(ammo, 'hoverSac');     // @@KHOI-VK
                if (_vkH) _vkH.call(this, half);
            }
// PLAYER_PART_END s3.Player.hoverMidCharge.1
}
