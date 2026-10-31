// PLAYER_FILE: MJOLNIR01
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, LT, PVP_HS, Player, SFX, allTargets, bamXuongKhong, camX, canvas, checkAABB, ctx, currentAmmoType, danCuaNg, dangLuotHoacChop, dashVx, dealDamage, dino, floatingTexts, frames, gameState, gdCatHop, giaoSong, hasRune, keys, lhBat, obstacles, pvpDich, pvpKeDanh, pvpVoBoc, shakeTimer, slamCong, slamLaoBat, visualEffects, worldL, worldR
// index.html:59133 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_TAM.1 EDITABLE
const BUA_TAM   = [128, 150, 178];
// PLAYER_PART_END s4.BUA_TAM.1

// index.html:59134 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_KHUNG.1 EDITABLE
const BUA_KHUNG = 10;
// PLAYER_PART_END s4.BUA_KHUNG.1

// index.html:59135 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_XOAY_F.1 EDITABLE
const BUA_XOAY_F = 15;
// PLAYER_PART_END s4.BUA_XOAY_F.1

// index.html:59136 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_LAI.1 EDITABLE
const BUA_LAI   = 15;
// PLAYER_PART_END s4.BUA_LAI.1

// index.html:59137 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_CHAM.1 EDITABLE
const BUA_CHAM  = 0.85, BUA_NHANH = 1.20;
// PLAYER_PART_END s4.BUA_CHAM.1

// index.html:59140 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_TIEN.1 EDITABLE
const BUA_TIEN  = 87;
// PLAYER_PART_END s4.BUA_TIEN.1

// index.html:59142 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_UNI_BUOC.1 EDITABLE
const BUA_UNI_BUOC = 72;
// PLAYER_PART_END s4.BUA_UNI_BUOC.1

// index.html:59143 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_UNI_R.1 EDITABLE
const BUA_UNI_R    = 52;
// PLAYER_PART_END s4.BUA_UNI_R.1

// index.html:59144 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_UNI_DMG.1 EDITABLE
const BUA_UNI_DMG  = 3;
// PLAYER_PART_END s4.BUA_UNI_DMG.1

// index.html:59145 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_UNI_TRE.1 EDITABLE
const BUA_UNI_TRE  = 2;
// PLAYER_PART_END s4.BUA_UNI_TRE.1

// index.html:59146 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_UNI_MAX.1 EDITABLE
const BUA_UNI_MAX  = 22;
// PLAYER_PART_END s4.BUA_UNI_MAX.1

// index.html:59147 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_ROI_IFRAME.1 EDITABLE
const BUA_ROI_IFRAME = 22;
// PLAYER_PART_END s4.BUA_ROI_IFRAME.1

// index.html:59148 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_CAO.1 EDITABLE
const BUA_CAO   = 9;
// PLAYER_PART_END s4.BUA_CAO.1

// index.html:59149 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_TRUOC.1 EDITABLE
const BUA_TRUOC = 26;
// PLAYER_PART_END s4.BUA_TRUOC.1

// index.html:59150 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_CUADASH.1 EDITABLE
const BUA_CUADASH = 36;
// PLAYER_PART_END s4.BUA_CUADASH.1

// index.html:59151 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_NEM_TOC.1 EDITABLE
const BUA_NEM_TOC = 18, BUA_VE_TOC = 15;
// PLAYER_PART_END s4.BUA_NEM_TOC.1

// index.html:59152 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_GIAT.1 EDITABLE
const BUA_GIAT = 30, BUA_GIAT_KHONG = 76;
// PLAYER_PART_END s4.BUA_GIAT.1

// index.html:59153 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_PARRY_TOC.1 EDITABLE
const BUA_PARRY_TOC = 0.34;
// PLAYER_PART_END s4.BUA_PARRY_TOC.1

// index.html:59154 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_CHAN_MAX.1 EDITABLE
const BUA_CHAN_MAX = 0.62;
// PLAYER_PART_END s4.BUA_CHAN_MAX.1

// index.html:59155 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_SET_CHOANG.1 EDITABLE
const BUA_SET_CHOANG = 30;
// PLAYER_PART_END s4.BUA_SET_CHOANG.1

// index.html:59161 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_NEM_TAM.1 EDITABLE
const BUA_NEM_TAM = [280, 520];
// PLAYER_PART_END s4.BUA_NEM_TAM.1

// index.html:59162 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_ZEUS_DMG.1 EDITABLE
const BUA_ZEUS_DMG = 4, BUA_ZEUS_TOC = 20, BUA_ZEUS_MOC = [30, 90];
// PLAYER_PART_END s4.BUA_ZEUS_DMG.1

// index.html:59163 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_TIERS_TAY.1 EDITABLE
const BUA_TIERS_TAY = [[30, "#FFF59D"], [90, "#FFEE58"]];
// PLAYER_PART_END s4.BUA_TIERS_TAY.1

// index.html:59164 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BUA_DIA_DMG.1 EDITABLE
const BUA_DIA_DMG = 5, BUA_DIA_SONG = 3;
// PLAYER_PART_END s4.BUA_DIA_DMG.1

// index.html:59166 · Phạm vi: global
// PLAYER_PART_BEGIN s4.buaMat.1 EDITABLE
function buaMat(){ return currentAmmoType === 11 && (typeof dino !== 'undefined') && dino && !!dino.buaBay; }
// PLAYER_PART_END s4.buaMat.1

// index.html:59167 · Phạm vi: global
// PLAYER_PART_BEGIN s4.buaHeSo.1 EDITABLE
function buaHeSo(){ if (typeof lhBat === 'function' && lhBat()) return 1; return buaMat() ? BUA_NHANH : (currentAmmoType === 11 ? BUA_CHAM : 1); }
// PLAYER_PART_END s4.buaHeSo.1

// index.html:59172 · Phạm vi: global
// PLAYER_PART_BEGIN s4.buaNguoi.1 EDITABLE
function buaNguoi(ng){ return !!ng && (ng.id === 1 || (ng.id === 2 && gameState === 'pvp')); }
// PLAYER_PART_END s4.buaNguoi.1

// index.html:59173 · Phạm vi: global
// PLAYER_PART_BEGIN s4.buaParryOk.1 EDITABLE
function buaParryOk(ng){
            if (ng === undefined) ng = (typeof dino !== 'undefined') ? dino : null;
            if (!ng) return false;
            if (((typeof danCuaNg === 'function') ? danCuaNg(ng) : currentAmmoType) !== 11) return false;   // (Luoi hai 18 tu roi ra o day)
            if (ng.buaBay) return false;
            if (ng.buaChan && (ng.buaChan.toc || 0) >= BUA_PARRY_TOC) return true;
            return (ng.aKeyHeldTime || 0) >= 120;
        }
// PLAYER_PART_END s4.buaParryOk.1

// index.html:59184 · Phạm vi: Player.prototype
const __Part28 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaCoBua.1 EDITABLE
buaCoBua(){ return !this.buaBay; }
// PLAYER_PART_END s4.Player.prototype.buaCoBua.1
};

// index.html:59188 · Phạm vi: Player.prototype
const __Part29 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaDau.1 EDITABLE
buaDau(){
                let sc = this.getFormScale(), dir = this.isFacingLeft ? -1 : 1;
                let V = this.buaVK || { ang: 0.9, ext: 0 };
                let R = 40 * sc;
                let px = this.x + this.w/2 + dir * (BUA_TRUOC + (V.ext || 0) * sc);
                let py = this.y + this.h * 0.24 - BUA_CAO;   // vai, nhich len roi ha lai (xem BUA_CAO)
                return { x: px + dir * Math.cos(V.ang) * R, y: py + Math.sin(V.ang) * R };
            }
// PLAYER_PART_END s4.Player.prototype.buaDau.1
};

// index.html:59196 · Phạm vi: Player.prototype
const __Part30 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaHenNo.1 EDITABLE
buaHenNo(k, dmgVung){ this._buaNoCho = { k, dmg: dmgVung || 0, cho: 30 }; }
// PLAYER_PART_END s4.Player.prototype.buaHenNo.1
};

// index.html:59197 · Phạm vi: Player.prototype
const __Part31 = {
// PLAYER_PART_BEGIN s4.Player.prototype._buaDanh.1 EDITABLE
_buaDanh(dmg, life, reach, hTop, hBot, cd, kieu, ton, ngay){
                this.ammo = Math.max(0, this.ammo - (ton === undefined ? 1 : ton));
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 75; }
                let sc = this.getFormScale(), dir = this.isFacingLeft ? -1 : 1;
                // HOAN hitbox toi khung cay bua that su bo xuong. Truoc day hitbox sinh ngay
                // khung dau nen ke dich mat mau TRUOC khi bua cham dat — nhin nhu loi hoat anh.
                if (ngay) this._beginSlash(dmg, life, dir, Math.round(reach * sc), hTop, hBot, 0);
                else this._buaHit = { dmg, life, reach, hTop, hBot };
                this.attackCooldown = cd;
                this.buaCS = 46;
                if (!this.buaVK) this.buaVK = { ang: 0.9, ext: -14, veti: [] };
                this._buaAnim = { kieu, t: 0, T: Math.max(12, Math.round(life * 1.5)), dir };
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(150, 0.16, 'sawtooth', 0.24, 70);
            }
// PLAYER_PART_END s4.Player.prototype._buaDanh.1
};

// index.html:59211 · Phạm vi: Player.prototype
const __Part32 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaSlash.1 EDITABLE
buaSlash(){
                if (this.buaUlt || (this.buaKhung || 0) > 0 || this.buaXoay || this.buaTien || this.buaLao) return;
                if (!this.buaCoBua()) return;                 // dang nem di: khong danh duoc gi
                if (this.isOverheated || this.ammo <= 0) return;
                // Cua so rong: van bam duoc trong 18 khung SAU cu luot, khong bat thao tac
                // phai nhanh den muc phi ly.
                if (this.grounded && (this._buaLuotDu || 0) > 0){ this.buaLaoNhay(); return; }
                if (!this.grounded){ this.buaNhay(); return; }
                // @@HE-BUA2 — XUONG + J: DIA CHAN
                if (keys['KeyS'] || keys['ArrowDown']){
                    this._buaDanh(BUA_DIA_DMG, 14, BUA_TAM[0], 10, 40, 30, 'nen');
                    this.buaKhung = BUA_KHUNG + 4; this.buaBuoc = 0; this.buaCS = 0;
                    this._buaDiaCho = 11;                       // song chay ra dung luc dau bua cham dat
                    floatingTexts.push(new FloatingText(this.x - 26, this.y - 34, LT("ĐỊA CHẤN!", "QUAKE!")));
                    this.buaCho = BUA_LAI;
                    return;
                }
                if ((this.buaCS || 0) <= 0) this.buaBuoc = 0;
                let b = this.buaBuoc || 0;
                if (b === 0){
                    this._buaDanh(4, 14, BUA_TAM[0], 18, 34, 24, 'nen');
                    this.buaKhung = BUA_KHUNG; this.buaBuoc = 1;
                    this.buaHenNo(1.0, 0);
                } else if (b === 1){
                    this._buaDanh(4, 14, BUA_TAM[1], 40, 18, 24, 'nhac');
                    this.buaKhung = BUA_KHUNG; this.buaBuoc = 2;
                } else {
                    // Nhat ba: XOAY mot vong 15 khung roi moi nen — it khung sau don nhung
                    // phai chiu ca doan xoay, tra gia bang thoi gian chu khong bang do cung.
                    this.buaXoay = { t: 0 }; this.buaBuoc = 0;
                    this.ammo = Math.max(0, this.ammo - 1);
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(300, 0.22, 'square', 0.16, 900);
                }
                this.clawRiseWindow = 34;                     // bam NHAY -> combo len khong
                this.buaCS = 46; this.buaCho = BUA_LAI;       // bam mot lan roi thoi -> cho 15 khung
            }
// PLAYER_PART_END s4.Player.prototype.buaSlash.1
};

// index.html:59248 · Phạm vi: Player.prototype
const __Part33 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaNhay.1 EDITABLE
buaNhay(){
                if (this.buaRoi) return;
                // @@HE-BUA — IFRAME NHE cho cu bo tren khong.
                // Don nay 9 sat thuong, ton 2 the luc, va khoa nguyen quang duong roi: bam la
                // cam chac roi thang xuong, khong be huong, khong huy duoc. Diem yeu lo den
                // muc di map voi Bua thanh cuc hinh — thay quai o duoi ma khong dam bo.
                // Cho 22 khung mien thuong (nhe hon Long Khoan cua SDT giu lien tuc, va ngan
                // hon i-frame cu luot 16-24 khung mot chut): du de xuyen qua mot don, khong
                // du de bo bua vao giua mot loat.
                this.invincible = true;
                this.invTimer = Math.max(this.invTimer || 0, BUA_ROI_IFRAME);
                this.buaRoi = { cham: 0 };
                this._buaDanh(9 + (typeof slamCong === 'function' ? slamCong() : 0), 900, BUA_TAM[1], 16, 66, 8, 'roi', 2, 1);
                // Hitbox song toi khi cham dat, nhung HOAT ANH phai ngan — neu de T theo life
                // (900 x 1.5 = 1350 khung) thi cay bua gan nhu dung yen, khong thay vung gi ca.
                this._buaAnim = { kieu: 'roi', t: 0, T: 16, dir: this.isFacingLeft ? -1 : 1 };
                this.dy = Math.max(this.dy, 7);
                if (typeof slamLaoBat === 'function') slamLaoBat(this);   // @@HE-SLAMLAO
            }
// PLAYER_PART_END s4.Player.prototype.buaNhay.1
};

// index.html:59268 · Phạm vi: Player.prototype
const __Part34 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaKet.1 EDITABLE
buaKet(){
                if (!this.buaCoBua() || this.buaUlt) return;
                if ((this.buaCS || 0) <= 0 && (this.buaKK || 0) <= 0) return;
                this.buaTien = { t: 0, dir: this.isFacingLeft ? -1 : 1, dx: 0 };
                this.buaKK = (this.buaKK === undefined || this.buaKK <= 0) ? 2 : this.buaKK - 1;
                this.ammo = Math.max(0, this.ammo - 1);
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 75; }
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(260, 0.20, 'square', 0.18, 800);
            }
// PLAYER_PART_END s4.Player.prototype.buaKet.1
};

// index.html:59278 · Phạm vi: Player.prototype
const __Part35 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaNen.1 EDITABLE
buaNen(dmg, reach, k, kieu){
                this._buaDanh(dmg, 16, reach, 24, 40, 26, kieu || 'nen');
                this.buaHenNo(k || 1.2, 0);
                shakeTimer = Math.max(shakeTimer, 14 + Math.round(8 * (k || 1)));
            }
// PLAYER_PART_END s4.Player.prototype.buaNen.1
};

// index.html:59284 · Phạm vi: Player.prototype
const __Part36 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaNem.1 EDITABLE
buaNem(dmg, veLai, tam){
                if (this.buaBay) return;
                // Ba moc nem 5 / 8 / 12 la so ban dat, nhung he so PvP cua Bua la 0.53 nen
                // ra man hinh chi con 3 / 4 / 6. Chia nguoc he so de con so hien ra dung
                // bang so thiet ke; sam set di kem van giu nguyen nhu cu.
                if (gameState === 'pvp') dmg = dmg / (PVP_HS[11] || 1) + 1e-6;
                let dir = this.isFacingLeft ? -1 : 1;
                this.buaBay = { x: this.x + this.w/2 + dir * 26, y: this.y + this.h * 0.42, x0: this.x + this.w/2, tam: tam || 0,
                                vx: dir * BUA_NEM_TOC, vy: 0, dmg,
                                pha: 'di', t: 0, hit: new Set(), veLai: !!veLai, set: 0,
                                goc: dir > 0 ? 0 : Math.PI };
                // Dong tac nem: tu VAC VAI vut thang ve truoc. Truoc day khong co hoat anh nao
                // nen cay bua dang chia xuong dat bong bien mat roi vong nguoc len — rat ky.
                if (!this.buaVK) this.buaVK = { ang: 0.9, ext: -14, veti: [] };
                this._buaAnim = { kieu: 'nem', t: 0, T: 13, dir };
                this.attackCooldown = 16;
                this.ammo = Math.max(0, this.ammo - 1);
                floatingTexts.push(new FloatingText(this.x - 20, this.y - 34, veLai ? "NÉM · GỌI VỀ" : "NÉM BÚA"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(200, 0.22, 'sawtooth', 0.26, 900);
            }
// PLAYER_PART_END s4.Player.prototype.buaNem.1
};

// index.html:59313 · Phạm vi: Player.prototype
const __Part37 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaDiaSong.1 EDITABLE
buaDiaSong(){
                let d0 = this.buaDau(), sc = this.getFormScale(), cx = d0.x, songT = 30;
                for (const d of [-1, 1]){
                    giaoSong.push({ chu: this, chuId: this.id, x: cx, y: this.y + this.h * 0.72, dir: d,
                                    t: songT, t0: songT, r: Math.round(64 * sc), dmg: BUA_DIA_SONG, xuyen: 1, kiem: 0,
                                    x0: cx, giam: 1, mau: '#FFEE58', hit: new Set() });
                }
                if (typeof this.giaoDatDap === 'function') this.giaoDatDap(cx, this.y + this.h, 1.4);
                shakeTimer = Math.max(shakeTimer, 18);
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(70, 0.35, 'sawtooth', 0.28, 35); SFX.tone(1800, 0.08, 'square', 0.12, 500); }
            }
// PLAYER_PART_END s4.Player.prototype.buaDiaSong.1
};

// index.html:59325 · Phạm vi: Player.prototype
const __Part38 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaZeusNem.1 EDITABLE
buaZeusNem(n){
                if (!this.buaZeus) this.buaZeus = [];
                let cx = this.x + this.w / 2, cy = this.y - 18, dir = this.isFacingLeft ? -1 : 1;
                let ds = (gameState === 'pvp') ? [((typeof pvpDich === 'function') ? pvpDich(this) : null)].filter(Boolean)
                                               : ((typeof allTargets === 'function') ? allTargets() : []);
                ds = ds.filter(o => o && o !== this && o.hp > 0 && !o.invulnAll && (typeof obstacles === 'undefined' || obstacles.indexOf(o) < 0));
                ds.sort((a, b) => Math.abs(a.x - cx) - Math.abs(b.x - cx));
                for (let i = 0; i < n; i++){
                    let m = ds.length ? ds[i % ds.length] : null;
                    let tx = m ? m.x + (m.w||20) / 2 : cx + dir * 400, ty = m ? m.y + (m.h||20) / 2 : 300;
                    let g = Math.atan2(ty - cy, tx - cx) + (i - (n - 1) / 2) * 0.09;
                    this.buaZeus.push({ x: cx - dir * 6, y: cy - i * 6, vx: Math.cos(g) * BUA_ZEUS_TOC, vy: Math.sin(g) * BUA_ZEUS_TOC,
                                        t: 0, tre: i * 6, muc: m, xong: 0 });
                }
                this.ammo = Math.max(0, this.ammo - 1);
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 75; }
                this.attackCooldown = 18;
                this._buaZeusTay = 14;                          // gio tay len cao
                floatingTexts.push(new FloatingText(this.x - 20, this.y - 40, "ZEUS ×" + n));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(2600, 0.10, 'square', 0.16, 900); SFX.tone(140, 0.25, 'sawtooth', 0.18, 60); }
            }
// PLAYER_PART_END s4.Player.prototype.buaZeusNem.1
};

// index.html:59346 · Phạm vi: Player.prototype
const __Part39 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaZeusTick.1 EDITABLE
buaZeusTick(){
                if (this._buaZeusTay > 0) this._buaZeusTay--;
                for (let i = this.buaZeus.length - 1; i >= 0; i--){
                    let Z = this.buaZeus[i]; Z.t++;
                    if (Z.xong){ if (++Z.xong > 12) this.buaZeus.splice(i, 1); continue; }
                    if (Z.t <= Z.tre){ Z.x = this.x + this.w / 2 - (this.isFacingLeft ? -6 : 6); Z.y = this.y - 18 - i * 6; continue; }
                    // hoi be lai ve muc tieu
                    if (Z.muc && Z.muc.hp > 0){
                        let mx = Z.muc.x + (Z.muc.w||20) / 2, my = Z.muc.y + (Z.muc.h||20) / 2;
                        let a = Math.atan2(my - Z.y, mx - Z.x), v = Math.hypot(Z.vx, Z.vy), a0 = Math.atan2(Z.vy, Z.vx);
                        let da = ((a - a0 + Math.PI * 3) % (Math.PI * 2)) - Math.PI; a0 += Math.max(-0.12, Math.min(0.12, da));
                        Z.vx = Math.cos(a0) * v; Z.vy = Math.sin(a0) * v;
                    }
                    let x0 = Z.x, y0 = Z.y; Z.x += Z.vx; Z.y += Z.vy;
                    let hop = { x: Math.min(x0, Z.x) - 8, y: Math.min(y0, Z.y) - 8, w: Math.abs(Z.x - x0) + 16, h: Math.abs(Z.y - y0) + 16 };
                    let ds = (gameState === 'pvp') ? [((typeof pvpDich === 'function') ? pvpDich(this) : null)] : ((typeof allTargets === 'function') ? allTargets() : []);
                    for (let o of ds){
                        if (!o || o === this || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                        if (!checkAABB(hop, o)) continue;
                        if (gameState === 'pvp' && typeof pvpVoBoc === 'function') pvpVoBoc(o).takeDamage(BUA_ZEUS_DMG);
                        else if (typeof dealDamage === 'function') dealDamage(o, BUA_ZEUS_DMG, 'ammo'); else o.hp -= BUA_ZEUS_DMG;
                        visualEffects.push(new Effect(Z.x, Z.y, 'lightning_shock', true, 30));
                        this.buaTia = { x: Z.x, y: Z.y, R: 50, t: 12 };
                        shakeTimer = Math.max(shakeTimer, 8);
                        Z.xong = 1; break;
                    }
                    if (!Z.xong && (Z.y > 330 || Z.t > 80 || Z.x < worldL() - 60 || Z.x > worldR() + 60)){
                        Z.xong = 1; visualEffects.push(new Effect(Z.x, Math.min(Z.y, 320), 'lightning_shock', true, 20));
                    }
                }
            }
// PLAYER_PART_END s4.Player.prototype.buaZeusTick.1
};

// index.html:59377 · Phạm vi: Player.prototype
const __Part40 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaZeusVe.1 EDITABLE
buaZeusVe(){
                if (!this.buaZeus || !this.buaZeus.length) return;
                ctx.save(); ctx.lineCap = 'round';
                for (let Z of this.buaZeus){
                    if (Z.xong) continue;
                    let v = Math.hypot(Z.vx, Z.vy) || 1, ux = Z.vx / v, uy = Z.vy / v, L = 46;
                    ctx.globalAlpha = 0.35; ctx.strokeStyle = '#FFF59D'; ctx.lineWidth = 9;
                    ctx.beginPath(); ctx.moveTo(Z.x - ux * L, Z.y - uy * L); ctx.lineTo(Z.x, Z.y); ctx.stroke();
                    ctx.globalAlpha = 1;
                    this.buaVeTia(Z.x - ux * L, Z.y - uy * L, Z.x + ux * 6, Z.y + uy * 6, 2.6, frames * 0.3 + Z.tre);
                }
                ctx.restore();
            }
// PLAYER_PART_END s4.Player.prototype.buaZeusVe.1
};

// index.html:59390 · Phạm vi: Player.prototype
const __Part41 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaSet.1 EDITABLE
buaSet(x, y, R, dmg){
                if (Player._buaSetDangChay) return;
                Player._buaSetDangChay = true;
                try { return this._buaSetThat(x, y, R, dmg); }
                finally { Player._buaSetDangChay = false; }
            }
// PLAYER_PART_END s4.Player.prototype.buaSet.1
};

// index.html:59396 · Phạm vi: Player.prototype
const __Part42 = {
// PLAYER_PART_BEGIN s4.Player.prototype._buaSetThat.1 EDITABLE
_buaSetThat(x, y, R, dmg){
                let rect = { x: x - R, y: y - R, w: R*2, h: R*2 };
                if (this.id === 1 && typeof gdCatHop === 'function') gdCatHop(rect);   // @@HE-GATDAN
                /* @@HE-P2KHOA — trong PvP set co the no NGOAI ngu canh cua nguoi goi (P2 parry luc dang o vong P1):
                   allTargets() khi do tra ve CHINH nguoi goi. Lay dung doi thu cua `this` va ghi cong cho `this`. */
                let _ds = (typeof allTargets === 'function') ? allTargets() : [];
                let _pvpKe = null, _datKe = false;
                if (gameState === 'pvp' && typeof pvpDich === 'function' && typeof pvpVoBoc === 'function'){
                    _ds = _ds.filter(o => o !== this && o !== this._vo);
                    let _d = pvpDich(this); if (_d && _ds.indexOf(_d._vo) < 0) _ds.unshift(pvpVoBoc(_d));
                    _pvpKe = pvpKeDanh; pvpKeDanh = this; _datKe = true;
                }
                try {
                for (let o of _ds){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (!checkAABB(rect, o)) continue;
                    if (typeof dealDamage === 'function') dealDamage(o, dmg, 'ammo'); else o.hp -= dmg;
                    o._uFreeze = Math.max(o._uFreeze || 0, BUA_SET_CHOANG);
                    visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'lightning_shock', true, 26));
                }
                } finally { if (_datKe) pvpKeDanh = _pvpKe; }
                this.buaTia = { x, y, R, t: 16 };
                shakeTimer = Math.max(shakeTimer, 20);
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(2200, 0.10, 'square', 0.20, 400); SFX.tone(90, 0.30, 'sawtooth', 0.26, 40); }
            }
// PLAYER_PART_END s4.Player.prototype._buaSetThat.1
};

// index.html:59422 · Phạm vi: Player.prototype
const __Part43 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaLaoNhay.1 EDITABLE
buaLaoNhay(){
                let dir = this.isFacingLeft ? -1 : 1;
                this.buaLao = { pha: 'len', t: 0, dir };
                this.dy = -11.5; this.grounded = false;
                if (typeof slamLaoBat === 'function') slamLaoBat(this);   // @@HE-SLAMLAO: bat len roi dap
                this.ammo = Math.max(0, this.ammo - 1);
                this._buaAnim = null;      // KHONG vung o day — chi gio bua ve truoc va ha dan
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(330, 0.12, 'square', 0.16, 950);
            }
// PLAYER_PART_END s4.Player.prototype.buaLaoNhay.1
};

// index.html:59432 · Phạm vi: Player.prototype
const __Part44 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaXoayLao.1 EDITABLE
buaXoayLao(){
                let dir = this.isFacingLeft ? -1 : 1;
                this.buaLao = { pha: 'toi', t: 0, dir };
                this.ammo = Math.max(0, this.ammo - 1);
                this._buaAnim = null;
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(280, 0.16, 'sawtooth', 0.18, 780);
            }
// PLAYER_PART_END s4.Player.prototype.buaXoayLao.1
};

// index.html:59439 · Phạm vi: Player.prototype
const __Part45 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaLaoDap.1 EDITABLE
buaLaoDap(dir){
                this.buaLao = null;
                this.buaNen(8, BUA_TAM[2], 1.8, 'nen');
                this.buaKhung = 10;
                // SAM SET phai toa ra SAU cu dap, khong phai truoc. Hen lai cho toi dung khung
                // hitbox bung ra (78% cu vung) roi moi giang.
                // NOVA mo DUNG bo hieu ung cua Luot Set tren Bua, khong phai mot bien the khac.
                if (typeof hasRune === 'function' && (hasRune('voltdash') || hasRune('explshot')))
                    this._buaSetSau = dir;
            }
// PLAYER_PART_END s4.Player.prototype.buaLaoDap.1
};

// index.html:59451 · Phạm vi: Player.prototype
const __Part46 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaSetTroi.1 EDITABLE
buaSetTroi(){
                let d = this.buaDau();
                let px = d.x, ny = this.y + this.h;
                let tia = (this.buaNo && this.buaNo.tia) ? this.buaNo.tia : [];
                tia.push({ x: px, y: ny - 4, t: 14, seed: Math.random() });
                this.buaNo = { t: Math.max(this.buaNo ? this.buaNo.t : 0, 18), tia };
                let R = 40, rect = { x: px - R, y: ny - 170, w: R * 2, h: 186 };
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (!checkAABB(rect, o)) continue;
                    if (typeof dealDamage === 'function') dealDamage(o, 1, 'ammo'); else o.hp -= 1;
                    visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'lightning_shock', true, 20));
                }
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(2400, 0.07, 'square', 0.14, 700);
            }
// PLAYER_PART_END s4.Player.prototype.buaSetTroi.1
};

// index.html:59467 · Phạm vi: Player.prototype
const __Part47 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaNoNem.1 EDITABLE
buaNoNem(k){
                let d = this.buaDau();
                this.giaoDatDap(this.x + this.w/2 + (this.isFacingLeft ? -1 : 1) * 24,
                                this.y + this.h, k);
                this.buaSet(d.x, d.y, 96, 2);
                shakeTimer = Math.max(shakeTimer, 22);
            }
// PLAYER_PART_END s4.Player.prototype.buaNoNem.1
};

// index.html:59474 · Phạm vi: Player.prototype
const __Part48 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaSetHang.1 EDITABLE
buaSetHang(dir){
                const XA = 304;                         // 7cm = 7 * 43.5
                let x0 = this.x + this.w/2, ny = this.y + this.h;
                let tia = (this.buaNo && this.buaNo.tia) ? this.buaNo.tia : [];
                let daAn = new Set();
                for (let i = 0; i < 10; i++){
                    let px = x0 + dir * (26 + i * (XA - 26) / 9);
                    tia.push({ x: px, y: ny - 4, t: 16 + i * 2, seed: Math.random() });
                    let R = 44, rect = { x: px - R, y: ny - 160, w: R * 2, h: 180 };
                    if (typeof allTargets === 'function') for (let o of allTargets()){
                        if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                        if (daAn.has(o) || !checkAABB(rect, o)) continue;
                        daAn.add(o);
                        // Tia set chi 1 dmg: no la HIEU UNG. Cu luot goc van giu nguyen 3 dmg.
                        if (typeof dealDamage === 'function') dealDamage(o, 1, 'ammo'); else o.hp -= 1;
                        o._uFreeze = Math.max(o._uFreeze || 0, 20);
                        visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'lightning_shock', true, 26));
                    }
                }
                this.buaNo = { t: 40, tia };
                shakeTimer = Math.max(shakeTimer, 30);
                floatingTexts.push(new FloatingText(this.x - 30, this.y - 44, "SẤM GIÁNG!"));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(2600, 0.12, 'square', 0.20, 500); SFX.tone(80, 0.34, 'sawtooth', 0.26, 40); }
            }
// PLAYER_PART_END s4.Player.prototype.buaSetHang.1
};

// index.html:59498 · Phạm vi: Player.prototype
const __Part49 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaBatChannel.1 EDITABLE
buaBatChannel(){ if (this.buaCoBua()) this.buaChan = { toc: 0.08, t: 0, nghi: 0 }; }
// PLAYER_PART_END s4.Player.prototype.buaBatChannel.1
};

// index.html:59499 · Phạm vi: Player.prototype
const __Part50 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaNhaChannel.1 EDITABLE
buaNhaChannel(){
                let C = this.buaChan; this.buaChan = null;
                if (!C || !this.buaCoBua()) return;
                let manh = Math.max(0.15, C.toc / BUA_CHAN_MAX);
                // Duong cong cu dinh o 11 khi xoay het toc. Ban dat moc Channel la 18,
                // nen keo ca duong cong len theo ty le 18/11 — giu nguyen hinh dang, chi
                // doi diem cuoi. Chi o PvP.
                this.buaNem(gameState === 'pvp'
                    ? Math.round((4 + 7 * manh) * 18 / 11)
                    : Math.round(4 + 7 * manh), true);
                if (this.buaBay) this.buaBay.set = 1;         // keo theo sam set khi bay
                this.buaNoNem(1.4 + 1.1 * manh);              // Impact TO, to dan theo toc xoay
                this.buaSet(this.x + this.w/2, this.y + this.h/2, 150 + 130 * manh, 3);
                floatingTexts.push(new FloatingText(this.x - 30, this.y - 40, "SẤM SÉT!"));
            }
// PLAYER_PART_END s4.Player.prototype.buaNhaChannel.1
};

// index.html:59515 · Phạm vi: Player.prototype
const __Part51 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaTick.1 EDITABLE
buaTick(){
                if (this.id === 1 && typeof lhBat === 'function' && lhBat()){ this.jumpPower = -12.5; return; }   // @@HE-LUOIHAI: luoi hai tu lo (lhTick / lhVe)
                // CHI chieu cuoi moi duoc chiem quyen cap nhat. Truoc day buaNo (tia set cua
                // Nova / hang sam) cung lot vao day, nen moi cu vung deu lam Bua DUNG HET
                // cap nhat trong ~18 khung — nhin y het bi don may.
                if (this.buaUlt){ this.buaTickUlt(); this.buaVe(); this.buaVeUlt(); this.giaoVeDap(); return; }
                if (this.buaCS > 0) this.buaCS--;
                if (this.buaCho > 0) this.buaCho--;
                if (this.buaKK > 0 && (this.buaCS || 0) <= 0) this.buaKK = 0;
                if (this.buaTia && --this.buaTia.t <= 0) this.buaTia = null;
                if (this.buaKhung > 0){ this.buaKhung--; if (!bamXuongKhong(this)) this.dy = Math.min(this.dy, 0.6); }
                if (this._buaAnim && !(this.buaKhung > 0 && this._buaAnim.t / this._buaAnim.T >= 0.72)
                    && ++this._buaAnim.t >= this._buaAnim.T){
                    this._buaAnim = null;
                    // Quay TIEP theo chieu vung ve tu the vac vai, thay vi lerp NGUOC lai qua
                    // ca cung vua chem — do la thu trong nhu "vung them mot lan nua".
                    if (this.buaVK) while (this.buaVK.ang > -2.55) this.buaVK.ang -= Math.PI * 2;
                }
                // toc do va suc nhay doi theo viec CO hay KHONG co bua trong tay
                this.jumpPower = -12.5 * buaHeSo();

                // ---- Impact hen gio: no khi DAU BUA that su cham xuong ----
                // ---- Ra hitbox dung khung bua cham dat ----
                if (this._buaHit){
                    let A1 = this._buaAnim;
                    if (!A1 || (A1.t / A1.T) >= 0.78){
                        let H = this._buaHit; this._buaHit = null;
                        let sc1 = this.getFormScale();
                        this._beginSlash(H.dmg, H.life, this.isFacingLeft ? -1 : 1,
                                         Math.round(H.reach * sc1), H.hTop, H.hBot, 0);
                        if (typeof hasRune === 'function' && hasRune('explshot')) this.buaSetTroi();
                        if (this._buaSetSau !== undefined && this._buaSetSau !== null){
                            this.buaSetHang(this._buaSetSau); this._buaSetSau = null;
                        }
                    }
                }
                if (this._buaNoCho){
                    let C = this._buaNoCho; C.cho--;
                    let A0 = this._buaAnim;
                    // No khi cu vung DA DI GAN HET duong, tuc dung luc dau bua cham dat.
                    // Truoc day cho theo GOC nen co don khong bao gio du goc -> khong thay Impact.
                    if (!A0 || (A0.t / A0.T) >= 0.78 || C.cho <= 0){
                        let d = this.buaDau();
                        // Dung MAT DAT (chan nguoi choi) chu khong phai do cao dau bua.
                        // Ban truoc dung Math.min nen no luon chon diem CAO HON -> no giua khong.
                        this.giaoDatDap(d.x, this.grounded ? (this.y + this.h) : Math.max(d.y, this.y + this.h), C.k);
                        if (C.dmg > 0) this.buaSet(d.x, this.y + this.h, 90, C.dmg);
                        this._buaNoCho = null;
                    }
                }
                // ---- Nhat ba: XOAY 15 khung roi NEN ----
                if (this.buaXoay){
                    this.buaXoay.t++;
                    if (!this.buaVK) this.buaVK = { ang: 0.9, ext: -14, veti: [] };
                    this.buaVK.ang += 0.42; this.buaVK.ext = 10;
                    if (this.buaXoay.t >= BUA_XOAY_F){
                        this.buaXoay = null;
                        this.buaNen(8, BUA_TAM[2], 1.7, 'nen');
                        this.buaKhung = 4;                    // it khung sau don
                    }
                }
                // ---- J K: xoay, tien toi 2cm roi nen ----
                if (this.buaTien){
                    let P = this.buaTien; P.t++;
                    if (!this.buaVK) this.buaVK = { ang: 0.9, ext: -14, veti: [] };
                    this.buaVK.ang += 0.40; this.buaVK.ext = 12;
                    if (P.t <= 14){
                        let b = BUA_TIEN / 14;
                        this.x = Math.max(worldL(), Math.min(worldR() - this.w, this.x + P.dir * b));
                    } else {
                        this.buaTien = null;
                        this.buaNen(6, BUA_TAM[1], 1.4, 'nen');
                        this.buaCS = 46;
                        if ((this.buaKK || 0) <= 0) this.buaKhung = 8;
                    }
                }
                // ---- J roi DASH: bat canh len cua cu luot trong cua so noi don ----
                {
                    let dangLuot = dangLuotHoacChop();
                    if (dangLuot) this._buaLuotDu = BUA_CUADASH;
                    else if (this._buaLuotDu > 0) this._buaLuotDu--;
                    if (dangLuot && !this._buaLuotTruoc && (this.buaCS || 0) > 0
                        && !this.buaLao && !this.buaRoi && this.buaCoBua()
                        && !this.isOverheated && this.ammo > 0) this.buaXoayLao();
                    this._buaLuotTruoc = dangLuot;
                }
                // ---- Hai combo luot ----
                if (this.buaLao){
                    let Z = this.buaLao; Z.t++;
                    if (Z.pha === 'len'){
                        this.x = Math.max(worldL(), Math.min(worldR() - this.w, this.x + Z.dir * 4.6));
                        // KHONG quo gi trong luc lao — dang nao cuoi cu lao cung phai vung mot
                        // nhat, quo them o day chi thanh hai cu vung dinh nhau. Giu the vac.
                        this._buaAnim = null;
                        if ((this.grounded && Z.t > 8) || Z.t > 70) this.buaLaoDap(Z.dir);
                    } else {
                        if (!this.buaVK) this.buaVK = { ang: 0.9, ext: -10, veti: [] };
                        this._buaAnim = null;
                        // @@HE-BUA2 — J roi DASH: bua XOAY vong trong suot cu lao, quet trung ai o canh
                        this.buaVK.ang += Z.dir * 0.62; this.buaVK.ext += (6 - this.buaVK.ext) * 0.3;
                        if (Z.t % 5 === 0){
                            let sc = this.getFormScale(), cx = this.x + this.w / 2, cy = this.y + this.h / 2, R = 62 * sc;
                            if (this.meleeStrike({ x: cx - R, y: cy - R, w: R * 2, h: R * 2 }, 1)) shakeTimer = Math.max(shakeTimer, 4);
                        }
                        // LUOT SET khong buff toc do hay tam luot — no la HIEU UNG SAC BUA
                        // truoc cu dap. Tia set day dan tren dau bua trong suot cu lao.
                        if (typeof hasRune === 'function' && (hasRune('voltdash') || hasRune('explshot'))){
                            let d3 = this.buaDau(), q3 = Math.min(1, Z.t / 15);
                            ctx.save(); ctx.globalAlpha = 0.5 + 0.45 * q3; ctx.lineCap = 'round';
                            for (let i = 0; i < 2 + Math.round(q3 * 4); i++){
                                let a3 = frames * 0.6 + i * 1.4;
                                this.buaVeTia(d3.x + Math.cos(a3) * 7, d3.y + Math.sin(a3) * 7,
                                              d3.x + Math.cos(a3) * (16 + 26 * q3),
                                              d3.y + Math.sin(a3) * (16 + 26 * q3), 1.6 + 1.6 * q3, i * 0.5 + frames * 0.02);
                            }
                            ctx.restore(); ctx.globalAlpha = 1;
                        }
                        this.x = Math.max(worldL(), Math.min(worldR() - this.w, this.x + Z.dir * 7));
                        if (Z.t >= 15) this.buaLaoDap(Z.dir);
                    }
                }
                // ---- Don nhay: giu tu the toi khi cham dat roi mo Impact ----
                if (this.buaRoi){
                    if (this.grounded){
                        let d = this.buaDau();
                        this.giaoDatDap(d.x, this.y + this.h, 1.5);
                        shakeTimer = Math.max(shakeTimer, 24);
                        this.slashAtk = null; this.buaRoi = null;
                        this.buaKhung = 20;                   // khung 20 khung sau khi tiep dat
                    } else this.dy = Math.max(this.dy, 7);
                }
                // ---- CHANNEL: xoay nhanh dan ----
                // MAT BUA thi khong tich luc duoc — khong co bua thi sac cai gi.
                // @@HE-BUA2: MAT BUA van tich duoc — de nem set kieu Zeus
                if (this.buaZeus && this.buaZeus.length) this.buaZeusTick();
                if (this._buaDiaCho > 0 && --this._buaDiaCho === 0) this.buaDiaSong();
                if (this.buaChan){
                    let C = this.buaChan; C.t++;
                    if (C.nghi > 0) C.nghi--;
                    else C.toc = Math.min(BUA_CHAN_MAX, C.toc + 0.0042);
                    if (!this.buaVK) this.buaVK = { ang: 0.9, ext: -14, veti: [] };
                    this.buaVK.ang += C.toc; this.buaVK.ext = 8 + 16 * (C.toc / BUA_CHAN_MAX);
                    if (this.buaVK.ang > Math.PI * 2) this.buaVK.ang -= Math.PI * 2;
                    // SAM SET quanh bua, day dan theo toc xoay
                    {
                        let q = C.toc / BUA_CHAN_MAX, d4 = this.buaDau();
                        ctx.save(); ctx.globalAlpha = 0.35 + 0.5 * q; ctx.lineCap = 'round';
                        for (let i = 0; i < 1 + Math.round(q * 4); i++){
                            let a4 = frames * 0.7 + i * 1.6;
                            this.buaVeTia(d4.x, d4.y,
                                          d4.x + Math.cos(a4) * (14 + 34 * q),
                                          d4.y + Math.sin(a4) * (14 + 34 * q), 1.5 + 1.8 * q, i * 0.6 + frames * 0.02);
                        }
                        ctx.restore(); ctx.globalAlpha = 1;
                    }
                    let nhip = Math.max(8, Math.round(26 - 26 * (C.toc / BUA_CHAN_MAX)));
                    if (C.t % nhip === 0){
                        let R = Math.round(104 * this.getFormScale());   // nho hon tam kiem
                        this._meleeHits = new Set();
                        this._beginSlash(gameState === 'pvp' ? (5 / (PVP_HS[11] || 1) + 1e-6) : 2,
                                         10, this.isFacingLeft ? -1 : 1, 0, 0, 0, R);
                    }
                    // GIA THE LUC tinh theo THOI GIAN, khong theo nhip danh. Neu tru moi nhip
                    // thi xoay cang nhanh cang ton, chua kip du toc de Parry da het the luc.
                    if (C.t % 30 === 0){
                        this.ammo = Math.max(0, this.ammo - 1);
                        if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 75; this.buaNhaChannel(); }
                    }
                }
                // ---- BUA DANG BAY: di, roi VE, bat duoc thi giat lui ----
                if (this.buaBay){
                    let B = this.buaBay; B.t++; B.goc += 0.55;
                    if (B.pha === 'di'){
                        B.x += B.vx; B.y += B.vy;      // bay NGANG, khong rot xuong giua chung
                        if (B.set && B.t % 7 === 0) this.buaSet(B.x, B.y, 74, 2);
                        let _mL = (typeof camX === 'number' ? camX : 0) - 60;
                        let _mR = (typeof camX === 'number' ? camX : 0) + canvas.width + 60;
                        if (B.tam && Math.abs(B.x - B.x0) >= B.tam){ B.pha = 've'; B.hit = new Set(); }   // @@HE-BUA2: tam ngan -> quay ve som
                        else if (B.x < _mL || B.x > _mR){
                            // BAY HAN RA NGOAI 2 GIAY roi moi quay ve — trang thai mat bua phai
                            // that su thay duoc, khong phai nhay ra roi ve ngay.
                            B.pha = 'ngoai'; B.ngoai = 120;
                        } else if (B.t > 60){ B.pha = B.veLai ? 've' : 'cho'; if (B.pha === 've') B.hit = new Set(); }
                    } else if (B.pha === 'ngoai'){
                        B.ngoai--;
                        if (B.ngoai <= 0){ B.pha = 've'; B.hit = new Set(); }   // reset de luot VE con an duoc
                    } else if (B.pha === 'cho'){
                        B.vy += 0.5; B.y += B.vy;
                        if (B.y > 320){ B.y = 320; B.vy = 0; B.cho = (B.cho || 0) + 1;
                            if (B.cho > 40){ B.pha = 've'; B.hit = new Set(); } }   // nam dat roi tu ve
                    } else {
                        let dx = (this.x + this.w/2) - B.x, dy = (this.y + this.h/2) - B.y;
                        let dd = Math.max(1, Math.hypot(dx, dy));
                        B.x += dx / dd * BUA_VE_TOC; B.y += dy / dd * BUA_VE_TOC;
                        if (dd < 26){
                            // BAT DUOC: giat lui — tren khong giat manh hon han
                            let g = this.grounded ? BUA_GIAT : BUA_GIAT_KHONG;
                            let hg = this.isFacingLeft ? 1 : -1;
                            this.x = Math.max(worldL(), Math.min(worldR() - this.w, this.x + hg * g * 0.34));
                            if (typeof dashVx !== 'undefined') dashVx = hg * (this.grounded ? 5 : 11);
                            if (!this.grounded) this.dy = Math.min(this.dy, -3);
                            this.buaBay = null; this.attackCooldown = 12;
                            floatingTexts.push(new FloatingText(this.x - 14, this.y - 30, "BẮT!"));
                            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(420, 0.10, 'square', 0.18, 1100);
                        }
                    }
                    if (this.buaBay){
                        let R = 34, rect = { x: B.x - R, y: B.y - R, w: R*2, h: R*2 };
                        if (this.id === 1 && typeof gdCatHop === 'function') gdCatHop(rect);   // @@HE-GATDAN
                        let d2 = (B.pha === 've') ? Math.max(1, Math.round(B.dmg * 0.35)) : B.dmg;
                        if (typeof allTargets === 'function') for (let o of allTargets()){
                            if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                            if (B.hit.has(o) || !checkAABB(rect, o)) continue;
                            B.hit.add(o);
                            if (typeof dealDamage === 'function') dealDamage(o, d2, 'ammo'); else o.hp -= d2;
                            visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 20));
                        }
                    }
                }
                this.buaVe();
                this.buaZeusVe();   // @@HE-BUA2
                this.buaVeUlt();
                this.giaoVeDap();   // Impact dung chung he voi Giao — PHAI goi o day moi thay
            }
// PLAYER_PART_END s4.Player.prototype.buaTick.1
};

// index.html:59740 · Phạm vi: Player.prototype
const __Part52 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaBiDanh.1 EDITABLE
buaBiDanh(){
                if (((typeof danCuaNg === 'function') ? danCuaNg(this) : currentAmmoType) !== 11 || !this.buaBay) return;   // @@HE-P2KHOA
                this.buaBay.pha = 've'; this.buaBay.veLai = true;
                floatingTexts.push(new FloatingText(this.x - 26, this.y - 40, "BÚA VỀ TAY!"));
            }
// PLAYER_PART_END s4.Player.prototype.buaBiDanh.1
};

// index.html:59746 · Phạm vi: Player.prototype
const __Part53 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaVe.1 EDITABLE
buaVe(){
                if (!this.buaVK) this.buaVK = { ang: 0.9, ext: -14, veti: [] };
                let V = this.buaVK, A = this._buaAnim;
                let dir = A ? A.dir : (this.isFacingLeft ? -1 : 1);
                if (A){
                    let u = Math.min(1, A.t / A.T);
                    // VAT LY: cham luc lay da, NHANH DAN ve cuoi — ease-IN chu khong ease-out.
                    // Bua phai xuong toi DAY dung khung hitbox bung ra (u = 0.78) roi GIU im
                    // o do. Truoc day w = u^3 nen o 0.78 bua moi di duoc 47% duong — dmg da
                    // gay ma bua con lo lung giua khong.
                    let w = Math.min(1, u / 0.78); w = w * w * w;
                    // Bat dau tu tu the VAC VAI (-2.15) chu khong tu mot goc bat ky, nen khong
                    // con canh nhay coc tu vai ra giua khong.
                    let K = { nen:  [-2.55,  1.42], nhac: [ 1.36, -2.40],
                              roi:  [-2.20,  1.55], nem:  [-2.55,  0.02] }[A.kieu] || [-2.55, 1.42];
                    V.ang = K[0] + (K[1] - K[0]) * w;
                    V.ext = -12 + 26 * Math.sin(Math.PI * u);   // giu bua BAM NGUOI, khong choi ra xa
                    // KHUNG KHUNG dong bang CA hoat anh — dung y nghia hitstop, thay vi de cay
                    // bua chay het roi treo lo lung giua khong trong luc nguoi choi bi dinh chan.
                    if ((this.buaKhung || 0) > 0 && u >= 0.72) A.t--;
                } else if (!this.buaChan && !this.buaXoay && !this.buaTien && !(this.buaLao && this.buaLao.pha === 'toi')){
                    // TU THE VAC VAI: dau bua gac ra sau vai, san sang bo tu tren xuong.
                    // Luon di theo duong NGAN NHAT ve tu the vac vai
                    let _d = -2.55 - V.ang;
                    while (_d >  Math.PI) _d -= Math.PI * 2;
                    while (_d < -Math.PI) _d += Math.PI * 2;
                    V.ang += _d * 0.20; V.ext += (-10 - V.ext) * 0.18;
                }
                // VET VUNG — dai ruy bang bam theo DAU BUA qua 12 khung gan nhat
                if (!V.veti) V.veti = [];
                if ((A && A.kieu !== 'nem') || this.buaChan || this.buaXoay || this.buaTien || (this.buaLao && this.buaLao.pha === 'toi')){
                    let d0 = this.buaDau();
                    let sc0 = this.getFormScale();
                    let px0 = this.x + this.w/2 + dir * (10 + V.ext * sc0), py0 = this.y + this.h * 0.5;
                    V.veti.push({ x: d0.x, y: d0.y,
                                  ix: px0 + (d0.x - px0) * 0.42, iy: py0 + (d0.y - py0) * 0.42 });
                    if (V.veti.length > 7) V.veti.shift();
                } else if (V.veti.length) V.veti.shift();
                if (V.veti.length > 1){
                    ctx.save();
                    for (let i = 1; i < V.veti.length; i++){
                        let a1 = V.veti[i-1], b1 = V.veti[i], q = i / V.veti.length;
                        ctx.globalAlpha = 0.08 + 0.46 * q * q;
                        ctx.fillStyle = "#ECEFF1";
                        ctx.beginPath();
                        ctx.moveTo(a1.x, a1.y); ctx.lineTo(b1.x, b1.y);
                        ctx.lineTo(b1.ix, b1.iy); ctx.lineTo(a1.ix, a1.iy);
                        ctx.closePath(); ctx.fill();
                    }
                    ctx.globalAlpha = 0.9; ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 2.4;
                    ctx.beginPath(); ctx.moveTo(V.veti[0].x, V.veti[0].y);
                    for (let i = 1; i < V.veti.length; i++) ctx.lineTo(V.veti[i].x, V.veti[i].y);
                    ctx.stroke(); ctx.restore(); ctx.globalAlpha = 1;
                }
                if (!this.buaBay) this.buaVeThan(dir, V);
                // ---- SAM SET KHI TICH LUC: cang giu lau set cang day, va co vach moc ----
                if (!this.buaBay && (this.aKeyHeldTime || 0) > 0 && !this.buaUlt){
                    let h = this.aKeyHeldTime, nap = Math.min(1, h / 180);
                    const MOC = [15, 30, 60, 120];
                    let bac = 0; for (let i = 0; i < MOC.length; i++) if (h >= MOC[i]) bac = i + 1;
                    if (bac !== (this._buaMoc || 0)){
                        this._buaMoc = bac;
                        if (bac > 0){ this._buaLoe = 12;
                            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(500 + bac * 240, 0.05, 'square', 0.10, 1800); }
                    }
                    let d = this.buaDau();
                    ctx.save(); ctx.lineCap = 'round';
                    // tia set nhay quanh dau bua, so tia va do dai tang theo do tich
                    let soTia = 1 + Math.round(nap * 5);
                    ctx.globalAlpha = 0.45 + 0.5 * nap;
                    for (let i = 0; i < soTia; i++){
                        let a2 = frames * 0.55 + i * (6.283 / soTia);
                        let r1 = 6 + 4 * nap, r2 = 14 + 30 * nap;
                        this.buaVeTia(d.x + Math.cos(a2) * r1, d.y + Math.sin(a2) * r1,
                                      d.x + Math.cos(a2) * r2, d.y + Math.sin(a2) * r2,
                                      1.4 + 1.6 * nap, i * 0.41 + frames * 0.02);
                    }
                    // quang sang bao quanh dau bua
                    ctx.globalAlpha = 0.20 + 0.35 * nap;
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 1.5 + 2.5 * nap;
                    ctx.beginPath(); ctx.arc(d.x, d.y, 10 + 12 * nap, 0, Math.PI * 2); ctx.stroke();
                    // bon vach moc charge, sang dan
                    ctx.globalAlpha = 1;
                    for (let i = 0; i < MOC.length; i++){
                        let on = h >= MOC[i];
                        ctx.fillStyle = on ? "#FFFFFF" : "rgba(255,255,255,0.20)";
                        ctx.fillRect(this.x + this.w/2 - 18 + i * 10, this.y - 20, 7, on ? 6 : 4);
                    }
                    if (this._buaLoe > 0){
                        let u2 = this._buaLoe / 12;
                        ctx.globalAlpha = u2 * 0.85; ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 3 * u2 + 1;
                        ctx.beginPath(); ctx.arc(d.x, d.y, 14 + 44 * (1 - u2), 0, Math.PI * 2); ctx.stroke();
                        this._buaLoe--;
                    }
                    ctx.restore(); ctx.globalAlpha = 1;
                } else if ((this.aKeyHeldTime || 0) <= 0) this._buaMoc = 0;
                // bua dang bay
                if (this.buaBay){
                    let B = this.buaBay;
                    ctx.save(); ctx.translate(B.x, B.y); ctx.rotate(B.goc);
                    this.buaHinh(1);
                    ctx.restore();
                    if (B.set && B.x > -20 && B.x < canvas.width + 20){
                        // Ve bang TIA GAY KHUC trang nhu moi cho khac, khong phai vai net mo.
                        ctx.save(); ctx.lineCap = 'round';
                        ctx.globalAlpha = 0.30; ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.arc(B.x, B.y, 26, 0, Math.PI * 2); ctx.stroke();
                        ctx.globalAlpha = 0.85;
                        for (let i = 0; i < 7; i++){
                            let a2 = frames * 0.42 + i * 0.9;
                            let rr = 40 + 26 * Math.abs(Math.sin(frames * 0.3 + i));
                            this.buaVeTia(B.x + Math.cos(a2) * 10, B.y + Math.sin(a2) * 10,
                                          B.x + Math.cos(a2) * rr, B.y + Math.sin(a2) * rr,
                                          2.2, i * 0.7 + frames * 0.02);
                        }
                        let hb = B.vx >= 0 ? -1 : 1;   // duoi set keo LAI PHIA SAU cu nem
                        for (let i = -1; i <= 1; i += 2)
                            this.buaVeTia(B.x, B.y, B.x + hb * 96, B.y + i * 40, 2.4, i * 0.9 + frames * 0.03);
                        ctx.restore(); ctx.globalAlpha = 1;
                    }
                }
                // vong sam set khi goi sam
                if (this.buaTia){
                    let T2 = this.buaTia, u = 1 - T2.t / 16;
                    ctx.save(); ctx.globalAlpha = Math.max(0, 1 - u);
                    ctx.strokeStyle = "#FFF59D"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(T2.x, T2.y, T2.R * (0.4 + 0.7 * u), 0, Math.PI*2); ctx.stroke();
                    for (let i = 0; i < 8; i++){
                        let a2 = i * 0.785 + 0.2;
                        ctx.beginPath();
                        ctx.moveTo(T2.x + Math.cos(a2) * T2.R * 0.3, T2.y + Math.sin(a2) * T2.R * 0.3);
                        ctx.lineTo(T2.x + Math.cos(a2 + 0.25) * T2.R * (0.9 + 0.5 * u),
                                   T2.y + Math.sin(a2 + 0.25) * T2.R * (0.9 + 0.5 * u));
                        ctx.stroke();
                    }
                    ctx.restore(); ctx.globalAlpha = 1;
                }
                // vong toc do cua Channel
                if (this.buaChan){
                    let q = this.buaChan.toc / BUA_CHAN_MAX;
                    ctx.save(); ctx.globalAlpha = 0.25 + 0.5 * q;
                    ctx.strokeStyle = buaParryOk(this) ? "#FFF176" : "#90A4AE";
                    ctx.lineWidth = 2 + 4 * q;
                    ctx.beginPath(); ctx.arc(this.x + this.w/2, this.y + this.h/2, 104 * this.getFormScale(), 0, Math.PI*2 * (0.15 + 0.85*q));
                    ctx.stroke(); ctx.restore(); ctx.globalAlpha = 1;
                }
            }
// PLAYER_PART_END s4.Player.prototype.buaVe.1
};

// index.html:59893 · Phạm vi: Player.prototype
const __Part54 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaVeThan.1 EDITABLE
buaVeThan(dir, V){
                let sc = this.getFormScale();
                let px = this.x + this.w/2 + dir * (BUA_TRUOC + V.ext * sc), py = this.y + this.h * 0.24 - BUA_CAO;
                ctx.save(); ctx.translate(px, py); ctx.scale(dir, 1); ctx.rotate(V.ang);
                this.buaHinh(sc);
                ctx.restore();
            }
// PLAYER_PART_END s4.Player.prototype.buaVeThan.1
};

// index.html:59903 · Phạm vi: Player.prototype
const __Part55 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaHinh.1 EDITABLE
buaHinh(sc){
                const L = 62 * sc, HW = 26 * sc, HH = 17 * sc, hx = 27 * sc;
                // can
                let g = ctx.createLinearGradient(0, -3 * sc, 0, 3 * sc);
                g.addColorStop(0, "#6D4C41"); g.addColorStop(0.5, "#4E342E"); g.addColorStop(1, "#3E2723");
                ctx.fillStyle = g; ctx.fillRect(-L * 0.30, -3 * sc, L * 0.78, 6 * sc);
                // quan da o tay cam
                ctx.fillStyle = "#8D6E63";
                for (let i = 0; i < 4; i++) ctx.fillRect(-L * 0.26 + i * 5 * sc, -3.4 * sc, 2.6 * sc, 6.8 * sc);
                // vong day o duoi can
                ctx.strokeStyle = "#A1887F"; ctx.lineWidth = 1.6 * sc;
                ctx.beginPath(); ctx.arc(-L * 0.34, 0, 3.4 * sc, 0, Math.PI * 2); ctx.stroke();
                // co bua
                ctx.fillStyle = "#78909C"; ctx.fillRect(hx - 5 * sc, -6 * sc, 6 * sc, 12 * sc);
                // dau bua — vat goc hai dau cho ra khoi vuong lun
                let v = 5 * sc;
                let g2 = ctx.createLinearGradient(hx, -HH, hx + HW, HH);
                g2.addColorStop(0, "#F5F7F8"); g2.addColorStop(0.42, "#CFD8DC");
                g2.addColorStop(0.75, "#90A4AE"); g2.addColorStop(1, "#546E7A");
                ctx.beginPath();
                ctx.moveTo(hx, -HH + v); ctx.lineTo(hx + v, -HH);
                ctx.lineTo(hx + HW - v, -HH); ctx.lineTo(hx + HW, -HH + v);
                ctx.lineTo(hx + HW, HH - v); ctx.lineTo(hx + HW - v, HH);
                ctx.lineTo(hx + v, HH); ctx.lineTo(hx, HH - v);
                ctx.closePath();
                ctx.fillStyle = g2; ctx.fill();
                ctx.strokeStyle = "#37474F"; ctx.lineWidth = 1.8 * sc; ctx.stroke();
                // hai dai kim loai vat ngang dau bua
                ctx.fillStyle = "rgba(69,90,100,0.75)";
                ctx.fillRect(hx + HW * 0.16, -HH, 2.6 * sc, HH * 2);
                ctx.fillRect(hx + HW * 0.78, -HH, 2.6 * sc, HH * 2);
                // rune khac giua mat bua
                ctx.strokeStyle = "#FFECB3"; ctx.lineWidth = 1.8 * sc; ctx.lineCap = 'round';
                let mx = hx + HW * 0.47;
                ctx.beginPath();
                ctx.moveTo(mx, -HH * 0.52); ctx.lineTo(mx, HH * 0.52);
                ctx.moveTo(mx - HH * 0.28, -HH * 0.52); ctx.lineTo(mx + HH * 0.30, -HH * 0.16);
                ctx.stroke();
                // anh sang o mep tren
                ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.lineWidth = 1.4 * sc;
                ctx.beginPath(); ctx.moveTo(hx + v, -HH + 1.4 * sc); ctx.lineTo(hx + HW - v, -HH + 1.4 * sc); ctx.stroke();
            }
// PLAYER_PART_END s4.Player.prototype.buaHinh.1
};

// index.html:59948 · Phạm vi: Player.prototype
const __Part56 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaBatUlt.1 EDITABLE
buaBatUlt(){
                // `neo` = diem se bo xuong. Truoc day chieu cuoi Bua LUON keo nguoi choi ve
                // worldCX() roi bo xuong giua san — dung o dau bam cung roi xuong giua, nen
                // cho phep di chuyen cung vo nghia. Gio no la mot diem NGUOI CHOI LAI DUOC
                // trong luc dang o tren khong.
                this.buaUlt = { t: 0, tia: [], neo: this.x + this.w/2 };
                if (!this.buaVK) this.buaVK = { ang: 0.9, ext: -14, veti: [] };
                return true;
            }
// PLAYER_PART_END s4.Player.prototype.buaBatUlt.1
};
