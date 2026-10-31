// PLAYER_FILE: DINOSWORD03
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CRESCENT_GAP, DSW_ARC, Effect, FloatingText, KAT_J_TRAN, Projectile, SFX, allTargets, clawSwordCap, clawSwordTick, ctx, cutBossProjectiles, dashVx, drawDinoSwordArt, dswAngleCat, dswBladeCol, dswHexRGB, dswTier, floatingTexts, frames, gameState, giaoSong, hasRune, jkKep, katBat, katDrive, katJBam, katJCE, katNhaChannel, katNhaJ, katRoundTrip, katStinger, keys, projectiles, pvpDich, setCanBat, setCanDmg, setCanTam, shakeTimer, slamCong, ultCharge, visualEffects, vkDangKy, worldL, worldR
// index.html:52818 · Phạm vi: Player.prototype
const __Part0 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsVe.1 EDITABLE
dsVe(){
                let L = this.dsLao; if (!L) return;
                // ================= NHAT CHEM KIEM SI =================
                // Hai thanh phan tach bach, theo dung cach VFX game van lam:
                //   RIBBON TRAIL — dai lua bam theo nhan vat trong luc luot, VUOT NHON ve duoi
                //   DISK-SLASH   — toi diem thi CAT ROI ra, thanh mot vang trang doc lap,
                //                  no bung nhe roi tat. Truoc day toi de ribbon dinh mai vao
                //                  nhan vat nen Swordmaster luot ve keo theo ca vet — rat ky.
                const veLua = (pts, dam, mau) => {
                    if (pts.length < 2) return;
                    ctx.beginPath();
                    for (let k = 0; k < pts.length; k++){
                        let t = k / (pts.length - 1), w = dam * t * t;
                        ctx.lineTo(pts[k].x, pts[k].y - w);
                    }
                    for (let k = pts.length - 1; k >= 0; k--){
                        let t = k / (pts.length - 1), w = dam * t * t;
                        ctx.lineTo(pts[k].x, pts[k].y + w);
                    }
                    ctx.closePath(); ctx.fillStyle = mau; ctx.fill();
                };
                // ---- RIBBON: chi ton tai trong luc dang luot ----
                if ((L.pha === 'lao' || L.pha === 've') && L.rib && L.rib.length > 1){
                    ctx.save();
                    veLua(L.rib, 15, 'rgba(10,20,34,0.55)');       // khoi toi phia sau
                    veLua(L.rib, 10, 'rgba(120,220,255,0.75)');    // vien xanh
                    veLua(L.rib,  4.5, 'rgba(255,255,255,0.98)');  // loi trang
                    ctx.restore();
                }
                // ---- VET KIEM cua don LUOT: mong, thang, goc loan xa ----
                // KHONG dung hinh luoi liem cua chem mat trang: hai chieu ma cung mot hinh
                // thi don luot trong nhu dan mot dong luoi dao chong len nhau.
                if (L.cat) for (let i = L.cat.length - 1; i >= 0; i--){
                    let c = L.cat[i]; c.t++;
                    if (c.t < 0) continue;
                    let p2 = c.t / c.doi;
                    let a = Math.max(0, 1 - p2 * p2);
                    let D = c.dai * (0.55 + 0.45 * Math.min(1, p2 * 3));   // bung ra nhanh roi dung
                    ctx.save();
                    ctx.translate(c.x, c.y);
                    ctx.rotate(c.goc);
                    // DAY bam theo CHIEU DAI: vet cang dai cang day, khong thi vet to nhin
                    // van manh nhu vet nho. Mau an theo mau luoi kiem dang cam.
                    let _bc = (typeof dswBladeCol === 'function') ? dswBladeCol() : '#BA68C8';
                    let _br = (typeof dswHexRGB === 'function') ? dswHexRGB(_bc) : '186,104,200';
                    let day1 = Math.max(6, D * 0.062), day2 = day1 * 0.40;
                    ctx.shadowBlur = 14; ctx.shadowColor = _bc;
                    // Vet mong: phinh nhe o giua, NHON o hai dau
                    const vet = (day, mau) => {
                        ctx.beginPath();
                        ctx.moveTo(-D / 2, 0);
                        ctx.quadraticCurveTo(0, -day, D / 2, 0);
                        ctx.quadraticCurveTo(0,  day, -D / 2, 0);
                        ctx.closePath(); ctx.fillStyle = mau; ctx.fill();
                    };
                    vet(day1, 'rgba(' + _br + ',' + (a * 0.50).toFixed(2) + ')');
                    vet(day2, 'rgba(255,255,255,' + a.toFixed(2) + ')');
                    ctx.restore();
                    if (c.t > c.doi) L.cat.splice(i, 1);
                }
                // ---- cac nhat chem loan xa tren quang duong (don ket) ----
                for (let i = L.vet.length - 1; i >= 0; i--){
                    let v = L.vet[i]; v.t++;
                    if (v.t < 0) continue;
                    let a2 = Math.max(0, 1 - v.t / 16);
                    let D = (v.dai !== undefined ? v.dai : 30) * (1 + v.t * 0.05);
                    let g = (v.goc !== undefined) ? v.goc : (v.dir < 0 ? -1.16 : 1.16);
                    ctx.save(); ctx.lineCap = 'round'; ctx.translate(v.x, v.y); ctx.rotate(g);
                    const ve = (w, m) => { ctx.strokeStyle = m; ctx.lineWidth = w;
                        ctx.beginPath(); ctx.moveTo(0, -D); ctx.lineTo(0, D); ctx.stroke(); };
                    ve(3.4, 'rgba(10,20,34,' + (a2*0.55).toFixed(2) + ')');
                    ve(1.8, 'rgba(120,220,255,' + (a2*0.85).toFixed(2) + ')');
                    ve(0.8, 'rgba(255,255,255,' + a2.toFixed(2) + ')');
                    ctx.restore();
                    if (v.t > 16) L.vet.splice(i, 1);
                }
            }
// PLAYER_PART_END s4.Player.prototype.dsVe.1
};

// index.html:52895 · Phạm vi: Player.prototype
const __Part1 = {
// PLAYER_PART_BEGIN s4.Player.prototype.clawHeavy.1 EDITABLE
clawHeavy() {
                this.ammo--; this.attackCooldown = 30;
                this.clawCombo = 0; this.clawComboWindow = 0; this.clawRiseWindow = 0;
                let sScale = this.getFormScale(), dir = this.isFacingLeft ? -1 : 1;
                // TRA VE DUNG KICH THUOC GOC. Toi da phong len 250 roi 190, ca hai deu qua to.
                let reach = 150 * sScale, hTop = 40, hBot = 30;
                this._slashFx('z_big', dir === -1, 152 * sScale);
                this._beginSlash(5, 16, dir, reach, hTop, hBot, 0);
                shakeTimer = Math.max(shakeTimer, 8);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(220, 0.20, 'square', 0.22, 150);
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.clawHeavy.1
};

// index.html:52910 · Phạm vi: Player.prototype
const __Part2 = {
// PLAYER_PART_BEGIN s4.Player.prototype.shippuuga.1 EDITABLE
shippuuga() {
                this.ammo--; this.attackCooldown = 24;
                this.clawCombo = 0; this.clawComboWindow = 0; this.clawRiseWindow = 0;
                let sScale = this.getFormScale(), dir = this.isFacingLeft ? -1 : 1;
                dashVx = 13 * dir;                       // day tiep cu lao ve phia truoc
                // @@HE-SETCAN: tam voi rong ra la vi SAM SET bao quanh luoi lam nhat chem no to.
                let ts = (typeof setCanTam === 'function' ? setCanTam() : 1);
                let reach = 150 * sScale * ts, hTop = 6, hBot = 6;
                this._slashFx('z_dash', dir === -1, 96 * sScale * ts);
                this.setNhuomLuoi();
                this._beginSlash(3 + (typeof setCanDmg === 'function' ? setCanDmg() : 0), 15, dir, reach, hTop, hBot, 0);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(560, 0.13, 'square', 0.18, 1400);
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.shippuuga.1
};

// index.html:52926 · Phạm vi: Player.prototype
const __Part3 = {
// PLAYER_PART_BEGIN s4.Player.prototype.shippuugaLen.1 EDITABLE
shippuugaLen() {
                this.ammo--; this.attackCooldown = 18;
                this.clawCombo = 0; this.clawComboWindow = 0; this.clawRiseWindow = 0;
                let sScale = this.getFormScale(), dir = this.isFacingLeft ? -1 : 1;
                // KHONG dat lai dashVx: don nay duoc goi TU TRONG cu luot, cu luot da co van
                // toc rieng (22, hoac 36 khi deo Luot Set). Dat 13 o day la HAM cu luot lai.
                let ts = (typeof setCanTam === 'function' ? setCanTam() : 1);
                let reach = 150 * sScale * ts, hTop = 40, hBot = 2;   // no ra phia TREN
                this._slashFx('z_rise', dir === -1, 104 * sScale * ts);
                this.setNhuomLuoi();
                this._beginSlash(3 + (typeof setCanDmg === 'function' ? setCanDmg() : 0), 15, dir, reach, hTop, hBot, 0);
                this._shipNoi = 26;                       // cua so bam J de noi nhat CHEM TAM XA
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(680, 0.12, 'square', 0.18, 1600);
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.shippuugaLen.1
};

// index.html:52942 · Phạm vi: Player.prototype
const __Part4 = {
// PLAYER_PART_BEGIN s4.Player.prototype.shippuugaBo.1 EDITABLE
shippuugaBo() {
                this.ammo--; this.attackCooldown = 28;
                this._shipNoi = 0;
                let sScale = this.getFormScale(), dir = this.isFacingLeft ? -1 : 1;
                let ts = (typeof setCanTam === 'function' ? setCanTam() : 1);
                let _st = (typeof setCanBat === 'function' && setCanBat());
                // BO XUONG — noi tiep nhip da hat len o nhat mot, no ra phia DUOI.
                this._slashFx('z_big', dir === -1, 118 * sScale * ts);
                this.setNhuomLuoi();
                this._beginSlash(4 + (typeof setCanDmg === 'function' ? setCanDmg() : 0), 16, dir,
                                 132 * sScale * ts, 4, 34, 0);
                if (typeof giaoSong !== 'undefined'){
                    giaoSong.push({ chu: this, x: this.x + this.w/2 + dir * 34, y: this.y + this.h * 0.52,
                                    dir: dir, r: (_st ? 340 : 260) * sScale,
                                    t: _st ? 26 : 22, t0: _st ? 26 : 22,
                                    dmg: (_st ? 7 : 5) + (hasRune('explshot') ? 1 : 0),
                                    nho: 0, xuyen: 1, kiem: 1, set: _st, hit: new Set() });
                }
                shakeTimer = Math.max(shakeTimer, 10);
                floatingTexts.push(new FloatingText(this.x - 30, this.y - 30, _st ? "LÔI PHONG" : "LIỆT PHONG"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(760, 0.14, 'square', 0.20, 1800);
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.shippuugaBo.1
};

// index.html:52967 · Phạm vi: Player.prototype
const __Part5 = {
// PLAYER_PART_BEGIN s4.Player.prototype.setNhuomLuoi.1 EDITABLE
setNhuomLuoi(){
                if (!(typeof setCanBat === 'function' && setCanBat())) return;
                if (this._fxE) for (let e of this._fxE) e.tint = 'set';
            }
// PLAYER_PART_END s4.Player.prototype.setNhuomLuoi.1
};

// index.html:52971 · Phạm vi: Player.prototype
const __Part6 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireCrescent.1 EDITABLE
fireCrescent(big, pierce, dmg, nguoc) {
                this.ammo--; this.attackCooldown = big ? 25 : 18;
                /* DINOSWORD: nhat KIEM KHI la mot cu BO XUONG manh va dut khoat (nhanh, khong
                   lung lang), co vet chem ro rang; luoi khi KHONG bay ra ngay luc bam ma doi toi
                   khi luoi kiem quet qua phia truoc — nhin la thay chinh nhat chem phong no ra. */
                let _k = nguoc ? 'z_kk2' : 'z_kk', _sc = this.getFormScale();
                this._slashFx(_k, this.isFacingLeft, (big ? 116 : 96) * _sc);
                this.swordSwing(_k, big ? 9 : 8, 12);
                if (this._fxE){ for (let _e of this._fxE){ _e.pose = this.swordPose; _e.life = this.swordPose.t0 + 2;
                    _e.swordCol = (typeof dswBladeCol === 'function') ? dswBladeCol() : null; } this._fxE = null; }
                shakeTimer = Math.max(shakeTimer, big ? 7 : 4);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(big ? 520 : 680, 0.07, 'sawtooth', 0.14, big ? 160 : 220);
                if (this.kkCho) this._kkBan(this.kkCho);          // nhat truoc chua kip ra thi cho ra luon
                this.kkCho = { t: 0, big: big, pierce: pierce, dmg: dmg, pose: this.swordPose };
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.fireCrescent.1
};

// index.html:52988 · Phạm vi: Player.prototype
const __Part7 = {
// PLAYER_PART_BEGIN s4.Player.prototype.kkTick.1 EDITABLE
kkTick(){
                let C = this.kkCho; C.t++;
                let qua = false;
                if (this.swordPose === C.pose && typeof dswAngleCat === 'function'){
                    let a = dswAngleCat(this.swordPose), A = DSW_ARC[C.pose.kind];
                    qua = A[1] > A[0] ? a >= 1.35 : a <= 1.75;
                } else qua = true;
                if (qua || C.t >= 6) this._kkBan(C);
            }
// PLAYER_PART_END s4.Player.prototype.kkTick.1
};

// index.html:52997 · Phạm vi: Player.prototype
const __Part8 = {
// PLAYER_PART_BEGIN s4.Player.prototype._kkBan.1 EDITABLE
_kkBan(C){
                this.kkCho = null;
                let big = C.big, pierce = C.pierce, dmg = C.dmg;
                let pos = this.getShootPos();
                let p = new Projectile(pos.x, pos.y, dmg, big ? 8 : 7, 0, pierce, pos.dir, this.id);
                p.critOk = 1;                       // kiem khi cung phai chi mang duoc
                // KIEM KHI ra doi NHO roi NO RA rat nhanh trong khi bay — do moi la hinh
                // dang cua no, khong phai mot mieng to san tu dau.
                //   moc 1: sinh 33 x 70,  no x2.6 -> 86 x 182
                //   moc 2: sinh 62 x 112, no x3.0 -> 186 x 336
                p.w = Math.round(p.w * (big ? 2.2 : 1.5));
                p.h = Math.round(p.h * (big ? 1.8 : 1.4));
                p._cresNo = big ? 2.0 : 1.6;      // he so no them theo quang duong bay
                p._cresCol = (typeof dswBladeCol === 'function') ? dswBladeCol() : '#B388FF';
                p.y -= p.h / 2;
                projectiles.push(p);
                // SWORDMASTER: luoi dao thu HAI theo sau, cach luoi truoc CRESCENT_GAP px.
                // Hen gio theo toc do that cua vien dan nen khoang cach luon dung.
                if (hasRune('swordmaster')) {
                    let sp = Math.abs(p.speed) || 14;
                    // Colonel ban BA vong cung -> luoi dau + 2 luoi theo sau.
                    this.crescent2 = { t: Math.max(1, Math.round(CRESCENT_GAP / sp)), big: big, pierce: pierce, dmg: dmg, con: 1 };
                }
            }
// PLAYER_PART_END s4.Player.prototype._kkBan.1
};

// index.html:53021 · Phạm vi: Player.prototype
const __Part9 = {
// PLAYER_PART_BEGIN s4.Player.prototype.startClawUltimate.1 EDITABLE
startClawUltimate() {
                this.ammo = Math.max(0, this.ammo - 2); this.attackCooldown = 40;
                this.clawUltState = 'run'; this.clawUltTimer = 0; this.clawUltPass = 1;
                this.invincible = true; this.invTimer = 90;
                this.clawUltStartX = this.x;
                this.clawUltReturnX = this.x; // vi tri se lui ve sau khi chem
                this.clawUltWorldShifted = 0;
                let dirMul = this.isFacingLeft ? -1 : 1;
                // Chot MOT dich co dinh ngay luc bam (khong bam theo boss di chuyen sau do).
                // Dich la boss/enemy gan nhat phia truoc; neu khong co thi luot mot doan co dinh.
                let tgt = null, minD = 99999;
                let pool = gameState === 'pvp' ? [pvpDich(this)].filter(Boolean) : allTargets();
                pool.forEach(t => { let d = (t.x + t.w/2 - (this.x + this.w/2)) * dirMul; if (d > 10 && d < minD) { minD = d; tgt = t; } });
                let destX = tgt ? (this.isFacingLeft ? tgt.x + tgt.w + 40 : tgt.x - this.w - 40) : (this.x + dirMul * 260);
                // Kep trong man hinh
                destX = Math.max(worldL(), Math.min(worldR() - this.w, destX));
                this.clawUltDestX = destX;
                this.clawUltHitSet = new Set(); // moi vat chi dinh 1 lan trong suot cu luot
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.startClawUltimate.1
};

// index.html:53042 · Phạm vi: Player.prototype
const __Part10 = {
// PLAYER_PART_BEGIN s4.Player.prototype.clawTickCrescent2.1 EDITABLE
clawTickCrescent2() {
                this.crescent2.t--;
                if (this.crescent2.t <= 0) {
                    let c2 = this.crescent2; this.crescent2 = null;
                    let pos2 = this.getShootPos();
                    let p2 = new Projectile(pos2.x, pos2.y, c2.dmg, c2.big ? 8 : 7, 0, c2.pierce, pos2.dir, this.id);
                    p2.critOk = 1;
                    // Truoc day luoi thu hai KHONG duoc phong to o moc big -> Swordmaster ban
                    // ra mot luoi to mot luoi be. Gio dong bo voi luoi dau.
                    if (c2.big){ p2.w = Math.round(p2.w * 2.2); p2.h = Math.round(p2.h * 2.4); }
                    p2.y -= p2.h / 2;
                    // Colonel tung BA vong cung -> xep hang luoi tiep theo neu con.
                    if (c2.con > 0){
                        let sp2 = Math.abs(p2.speed) || 14;
                        this.crescent2 = { t: Math.max(1, Math.round(CRESCENT_GAP / sp2)),
                                           big: c2.big, pierce: c2.pierce, dmg: c2.dmg, con: c2.con - 1 };
                    }
                    projectiles.push(p2);
                    // KHONG goi _slashFx o day: no ve hoat anh chem TREN NGUOI CHOI,
                    // trong nhu nhan vat tu dong vung them mot nhat nua. Chi loe sang tai cho luoi ra.
                    visualEffects.push(new Effect(pos2.x, pos2.y - p2.h / 2, 'parry', pos2.dir === -1));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(700, 0.08, 'square', 0.14, 1100);
                }
            }
// PLAYER_PART_END s4.Player.prototype.clawTickCrescent2.1
};

// index.html:53067 · Phạm vi: Player.prototype
const __Part11 = {
// PLAYER_PART_BEGIN s4.Player.prototype.clawTickDive.1 EDITABLE
clawTickDive() {
                this.clawDive--;
                if (this.dy < 15) this.dy = 15;
                let _dr = { x: this.x - 6, y: this.y + this.h - 12, w: this.w + 12, h: 34 };
                this.clawStrikeRect = _dr; this.clawStrikeTimer = 3;
                let _nb = hasRune('explshot') ? 1 : 0;
                if (this.clawDive % 8 === 0) this.meleeStrike(_dr, 1 + _nb + (typeof slamCong === 'function' ? slamCong() : 0));
                if (hasRune('explshot') || hasRune('bulletclash')) cutBossProjectiles(_dr);
                if (this.grounded) {
                    this.clawDive = 0;
                    let _sc = this.getFormScale(), _R = 76 * _sc;
                    let _sr = { x: this.x + this.w/2 - _R, y: this.y + this.h - 28, w: _R*2, h: 36 };
                    visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h, 'explosion', true, 26));
                    this.meleeStrike(_sr, 3 + _nb + (typeof slamCong === 'function' ? slamCong() : 0));   // no dat khi tiep dat = don manh
                    shakeTimer = Math.max(shakeTimer, 10);
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(160, 0.22, 'sawtooth', 0.24, 90);
                }
            }
// PLAYER_PART_END s4.Player.prototype.clawTickDive.1
};

// index.html:53086 · Phạm vi: Player.prototype
const __Part12 = {
// PLAYER_PART_BEGIN s4.Player.prototype.clawTickUlt.1 EDITABLE
clawTickUlt() {
                this.invincible = true; if (this.invTimer < 12) this.invTimer = 12;
                let dirC = this.isFacingLeft ? -1 : 1;
                if (this.clawUltState === 'run') {
                    // VUA DI VUA CHEM: tien deu ve phia truoc, ra 3 nhat bang HOAT ANH MOI (z_*)
                    this.clawUltTimer++;
                    this.x += dirC * 7.5;
                    let stepIdx = [1, 21, 41].indexOf(this.clawUltTimer);
                    if (stepIdx >= 0) {
                        let sc = this.getFormScale(), big = (stepIdx === 2);
                        let kind = stepIdx === 0 ? 'z_vert' : stepIdx === 1 ? 'z_horz' : 'z_big';
                        this._slashFx(kind, dirC === -1, (big ? 158 : 124) * sc);
                        this._beginSlash(big ? 5 : 4, big ? 18 : 14, dirC, (big ? 152 : 120) * sc, big ? 34 : 22, big ? 24 : 14, 0);
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(big ? 240 : 560, big ? 0.18 : 0.08, 'square', big ? 0.22 : 0.14, big ? 160 : 950);
                        if (big) shakeTimer = Math.max(shakeTimer, 14);
                    }
                    if (this.clawUltTimer >= 60) { this.clawUltState = 'freefall'; this.clawUltTimer = 30; }
                } else if (this.clawUltState === 'slash') {
                    this.clawUltTimer--;
                    if (this.clawUltTimer <= 0) {
                        // LIEN TUC CHEM VE PHIA TRUOC: chon dich moi va lao tiep, KHONG lui ve.
                        this.clawUltPass = (this.clawUltPass || 1) + 1;
                        if (this.clawUltPass <= 3) {
                            let poolU = gameState === 'pvp' ? [pvpDich(this)].filter(Boolean) : allTargets();
                            let tgtU = null, minDU = 99999;
                            poolU.forEach(t => { let d = Math.abs((t.x + t.w/2) - (this.x + this.w/2)); if (d < minDU) { minDU = d; tgtU = t; } });
                            let nd;
                            if (tgtU) { let side = (tgtU.x + tgtU.w/2) < (this.x + this.w/2) ? 1 : -1; nd = tgtU.x + tgtU.w/2 + side * (this.w + 46); }
                            else nd = this.x + (this.isFacingLeft ? -220 : 220);
                            this.clawUltDestX = Math.max(worldL(), Math.min(worldR() - this.w, nd));
                            this.isFacingLeft = this.clawUltDestX < this.x;
                            this.clawUltStartX = this.x; this.clawUltHitSet = new Set();
                            this.clawUltState = 'dash';
                        } else { this.clawUltState = 'freefall'; this.clawUltTimer = 30; }   // 0.5s BAT TU de tu do lui ve
                    }
                // (da xoa: code chet, khong con duong nao chay toi)
                } else if (this.clawUltState === 'freefall') {
                    // Het chuoi chem: THA TU DO nhung con 0.5 giay bat tu, nguoi choi tu quyet lui hay o lai
                    this.clawUltTimer--;
                    let mvU = ((keys['KeyD'] || keys['ArrowRight']) ? 1 : 0) - ((keys['KeyA'] || keys['ArrowLeft']) ? 1 : 0);
                    this.x += mvU * 7;
                    if (this.clawUltTimer <= 0) { this.clawUltState = null; this.clawUltPass = 0; this.invTimer = Math.max(this.invTimer, 10); }
                }
                if (this.x < worldL()) this.x = worldL();
                if (this.x > worldR() - this.w) this.x = worldR() - this.w;
            }
// PLAYER_PART_END s4.Player.prototype.clawTickUlt.1
};

// index.html:53134 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.7 EDITABLE
vkDangKy(5, {
            ten: 'DINOSWORD',
            sacToiDa: 120,
            theLuc(){ return (typeof hasRune === 'function' && hasRune('swordmaster')) ? 10 : 8; },
            jkKep(){ return typeof katBat === 'function' && katBat(5); },   // KATANA: J va K cung tich duoc
            /* Cua so Dash J -> J cua Katana cung phai vuot qua hang rao hoi don: cu
               Rapid Slash dat cooldown 10, nen bam J thu hai trong 10 khung do bi
               nuot va don hat tung khong bao gio ra. */
            jQuaHoi(){
                if (katBat(5)) return (this.katRapidCS || 0) > 0;
                /* @@HE-CUINOI — CUI + J tu no hoi cham (32 khung), nhung DUNG DAY chem ngay sau do thi nhat
                   moi ra NHANH (tu khung 8 toi 40 sau cu cui) — chem sat dat roi dung len noi thang vao combo. */
                let d = frames - (this._cuiNoiF || -999);
                return this.grounded && d >= 8 && d <= 40 && !(keys['KeyS'] || keys['ArrowDown']);
            },
            // cay kiem ve tren tay khung long (drawDinoSwordArt o muc 1-2)
            veTrenNguoi(x, y, P){
                if (typeof drawDinoSwordArt === 'function')
                    drawDinoSwordArt(x, y, P, this.swordPose || null, this.id === 1 ? dswTier() : 0);
            },
            // vong sac: tia chop trang toa quanh than + vong mau theo nac
            veVongSac(_ringT, _rCol){
                let ccx = this.x + this.w/2, ccy = this.y + this.h/2;
                let boltCount = Math.floor(this.chargeProgress / 12) + 2;
                ctx.strokeStyle = "rgba(255,255,255,0.95)"; ctx.lineWidth = 2;
                for (let bi = 0; bi < boltCount; bi++) {
                    ctx.beginPath(); ctx.moveTo(ccx, ccy);
                    let bAng = Math.random() * Math.PI * 2; let bLen = 8 + (this.chargeProgress/6) + Math.random() * 8;
                    ctx.lineTo(ccx + Math.cos(bAng)*bLen, ccy + Math.sin(bAng)*bLen); ctx.stroke();
                }
                ctx.strokeStyle = _rCol; ctx.lineWidth = 2 + _ringT * 4;
                ctx.beginPath(); ctx.arc(ccx, ccy, 8 + _ringT * 26, 0, Math.PI*2); ctx.stroke();
            },
            banJ(){
                if (katBat(5)) katJBam(this); else this.clawSlash();
            },
            // KATANA: J la phim tich (Battousai) — dem moi khung, nha ra thi chem
            tichJ(fireKey){
                if (!katBat(5)) return;
                if (fireKey){ if (this.katJ > 0) this.katJ = Math.min(KAT_J_TRAN, this.katJ + 1); }
                else { this.katJSan = 1;                      // nha phim = nap lai mot cu bam moi
                       if (this.katJ > 0){ katNhaJ(this, this.katJ); this.katJ = 0; } }
            },
            nhaK(){
                // ===== DINOSWORD — SAU NAC theo thoi gian GIU (maxChargeFrames = 120) =====
                //   <15f  chem thuong | 15f chem manh | 30f KIEM KHI 4 dmg
                //   60f   KIEM KHI TO 5 dmg | 90f ult vuot (3 nhat + luot + 90f i-frame)
                //   120f  LAO XUYEN (5 dmg cu luot + 5 dmg don ket doc quang duong)
                let _h = this.aKeyHeldTime, _ok = this.ammo > 0 && !this.isOverheated && this.attackCooldown <= 0;
                if (katBat(5)){
                    // KATANA doi ca nam moc sang bo chieu Vergil
                    if (this.katVong) katNhaChannel(this);
                    else if (_h >= 120 && _ok) katJCE(this);
                    else if (_h >= 90  && _ok) katStinger(this, true);
                    else if (_h >= 60  && _ok) katRoundTrip(this);
                    else if (_h >= 30  && _ok) katDrive(this);
                    else if (_ok)              katStinger(this, false);
                }
                else if (_h >= 120 && !this.isOverheated && this.attackCooldown <= 0 && !this.clawUltState) this.dsLaoXuyen();
                else if (_h >= 90 && !this.isOverheated && this.attackCooldown <= 0 && !this.clawUltState) this.startClawUltimate();
                else if (_h >= 60  && _ok) this.fireCrescent(true,  999, 5);   // MOC 2: luoi TO
                else if (_h >= 30  && _ok) this.fireCrescent(false, 999, 4);   // MOC 1: luoi thuong
                else if (_h >= 15  && _ok) this.clawHeavy();
                else if (_ok) this.clawSlash();
            },
            channel(){
                if (katBat(5)){
                    if (!this.katVong){ this.katVong = { t: 0, n: 1 };
                        floatingTexts.push(new FloatingText(this.x - 26, this.y - 34, "KIẾM VÒNG")); }
                } else {
                    if (!this.clawChannel) { this.clawChannel = true; this.clawSwordCd = 0;
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(180, 0.2, 'sawtooth', 0.16, 90); }
                    // KIEM TRAN: trieu them 1 thanh moi nhip. SWORDMASTER: 30 thanh / 10 frame,
                    // thuong: 20 thanh / 15 frame — ca hai deu day sau 300 frame.
                    let _cap = clawSwordCap(), _tick = clawSwordTick();
                    if (this.clawSwordCd > 0) this.clawSwordCd--;
                    if (this.clawSwordCd <= 0 && this.clawSwords.length < _cap) { this.addClawSword(); this.clawSwordCd = _tick; }
                    if (this.clawSwords.length >= _cap && frames % 8 < 4) shakeTimer = Math.max(shakeTimer, 3);
                }
            },
            batUlt(){
                ultCharge = 0;
                this.jcState = 'shake'; this.jcTimer = 0; this.jcRadius = 0;
                this.jcReturnX = this.x; this.jcReturnY = this.y;
                this.aKeyHeldTime = 0; this.chargeProgress = 0;
                this.invincible = true; this.invTimer = 99999;
                SFX.muteAll = true; SFX.stopMusic();
            },
            // Body Slam: hai luoi kiem khi chay ngang hai ben tu cho cham dat
            slamDuoi(ix, iy, to){
                let sc = this.getFormScale();
                // KIEM — hai luoi kiem khi chay ngang hai ben tu cho cham dat
                for (let d = -1; d <= 1; d += 2){
                    giaoSong.push({ chu: this, x: ix + d * 26, y: iy - 26, dir: d,
                                    r: (to ? 210 : 168) * sc, t: to ? 22 : 18, t0: to ? 22 : 18,
                                    dmg: to ? 4 : 3, nho: 0, xuyen: 0, kiem: 1, hit: new Set() });
                }
                floatingTexts.push(new FloatingText(ix - 40, iy - 42, "KIẾM CHẤN"));
            },
            hoverSac(half){
                this.fireCrescent(false, 999, 4);                // KIEM KHI loai NHO
            }
        });
// PLAYER_PART_END s4.vkDangKy.7
