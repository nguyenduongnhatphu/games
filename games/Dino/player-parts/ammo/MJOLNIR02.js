// PLAYER_FILE: MJOLNIR02
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: BUA_NEM_TAM, BUA_TAM, BUA_UNI_BUOC, BUA_UNI_DMG, BUA_UNI_MAX, BUA_UNI_R, BUA_UNI_TRE, BUA_ZEUS_MOC, CAM_TROI, Effect, FloatingText, SFX, allTargets, buaHeSo, buaNguoi, buaParryOk, canvas, checkAABB, combatStance, ctx, cutBossProjectiles, dealDamage, floatingTexts, frames, keys, shakeTimer, ultCharge, visualEffects, vkDangKy, worldL, worldR
// index.html:59965 · Phạm vi: Player.prototype
const __Part0 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaUniBatSet.1 EDITABLE
buaUniBatSet(){
                let dir = this.isFacingLeft ? -1 : 1;
                let x0 = this.x + this.w/2;
                let mep = dir > 0 ? worldR() : worldL();
                let n = Math.max(4, Math.min(BUA_UNI_MAX, Math.floor(Math.abs(mep - x0) / BUA_UNI_BUOC)));
                this.buaUniSet = { x0: x0, dir: dir, i: 0, n: n, cho: 0, tia: [] };
                shakeTimer = Math.max(shakeTimer, 30);
                floatingTexts.push(new FloatingText(this.x - 52, this.y - 52, "THIÊN LÔI QUÁN ĐỊA!"));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(2800, 0.16, 'square', 0.22, 400); SFX.tone(70, 0.5, 'sawtooth', 0.30, 34); }
            }
// PLAYER_PART_END s4.Player.prototype.buaUniBatSet.1
};

// index.html:59975 · Phạm vi: Player.prototype
const __Part1 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaUniTick.1 EDITABLE
buaUniTick(){
                let U = this.buaUniSet; if (!U) return;
                for (let i = U.tia.length - 1; i >= 0; i--) if (--U.tia[i].t <= 0) U.tia.splice(i, 1);
                if (U.i >= U.n){ if (!U.tia.length) this.buaUniSet = null; return; }
                if (U.cho > 0){ U.cho--; return; }
                U.cho = BUA_UNI_TRE;
                let px = U.x0 + U.dir * (BUA_UNI_BUOC * (U.i + 1));
                U.i++;
                U.tia.push({ x: px, t: 20, seed: Math.random() });
                let R = BUA_UNI_R;
                let rect = { x: px - R, y: -CAM_TROI - 40, w: R * 2, h: 380 + CAM_TROI };
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (!checkAABB(rect, o)) continue;
                    if (typeof dealDamage === 'function') dealDamage(o, BUA_UNI_DMG, 'ammo'); else o.hp -= BUA_UNI_DMG;
                    visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'lightning_shock', true, 26));
                }
                if (typeof cutBossProjectiles === 'function') cutBossProjectiles(rect);
                if (U.i % 3 === 1 && typeof SFX !== 'undefined' && SFX.tone) SFX.tone(2200, 0.06, 'square', 0.12, 700);
                shakeTimer = Math.max(shakeTimer, 12);
            }
// PLAYER_PART_END s4.Player.prototype.buaUniTick.1
};

// index.html:59996 · Phạm vi: Player.prototype
const __Part2 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaUniVe.1 EDITABLE
buaUniVe(){
                let U = this.buaUniSet; if (!U || !U.tia.length) return;
                for (let t of U.tia){
                    let a = t.t / 20;
                    ctx.save();
                    ctx.globalAlpha = 0.30 + 0.55 * a;
                    ctx.lineCap = 'round';
                    this.buaVeTia(t.x, -CAM_TROI - 40, t.x, 320, 4 + 5 * a, t.seed);
                    ctx.globalAlpha = 0.45 * a;
                    ctx.fillStyle = "#E1F5FE";
                    ctx.beginPath(); ctx.ellipse(t.x, 320, BUA_UNI_R * a, 16 * a, 0, Math.PI, 0); ctx.fill();
                    ctx.restore(); ctx.globalAlpha = 1;
                }
            }
// PLAYER_PART_END s4.Player.prototype.buaUniVe.1
};

// index.html:60011 · Phạm vi: Player.prototype
const __Part3 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaVeTia.1 EDITABLE
buaVeTia(x1, y1, x2, y2, day, seed){
                let n = 6, px = x1, py = y1;
                ctx.beginPath(); ctx.moveTo(x1, y1);
                for (let i = 1; i <= n; i++){
                    let q = i / n;
                    let mx = x1 + (x2 - x1) * q, my = y1 + (y2 - y1) * q;
                    let l = (i === n) ? 0 : (Math.sin(seed * 12.9 + i * 7.3) * 0.5) * 34;
                    let dx = -(y2 - y1), dy = (x2 - x1), dd = Math.max(1, Math.hypot(dx, dy));
                    px = mx + dx / dd * l; py = my + dy / dd * l;
                    ctx.lineTo(px, py);
                }
                ctx.lineWidth = day + 3; ctx.strokeStyle = "rgba(255,255,255,0.30)"; ctx.stroke();
                ctx.lineWidth = day;     ctx.strokeStyle = "#FFFFFF"; ctx.stroke();
            }
// PLAYER_PART_END s4.Player.prototype.buaVeTia.1
};

// index.html:60031 · Phạm vi: Player.prototype
const __Part4 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaTickUlt.1 EDITABLE
buaTickUlt(){
                let U = this.buaUlt; if (!U) return;
                U.t++;
                // LAI DIEM BO trong luc dang tren khong. Nhanh hon di bo mot chut vi day la
                // luc chon cho dap, khong phai luc di chuyen.
                if (U.neo === undefined) U.neo = this.x + this.w/2;
                {
                    let _tr = !!(keys['KeyA'] || keys['ArrowLeft']), _ph = !!(keys['KeyD'] || keys['ArrowRight']);
                    if (_tr !== _ph){
                        U.neo += (_ph ? 1 : -1) * 7;
                        let _L = (typeof worldL === 'function') ? worldL() : 0;
                        let _R = (typeof worldR === 'function') ? worldR() : canvas.width;
                        U.neo = Math.max(_L + 60, Math.min(_R - 60, U.neo));
                    }
                }
                this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 16);
                const P1 = 54, P2 = 78, P3 = 108, P4 = 128;
                if (U.t <= P1){
                    // --- GIO BUA, SET GIAT XUONG ---
                    this.dy = 0; this._buaAnim = null;
                    this.buaVK.ang = -1.57; this.buaVK.ext = 2;
                    let d = this.buaDau();
                    // NHIEU tia hon han: moi 2 khung mot tia, va toa lech quanh dau bua
                    if (U.t % 2 === 1) for (let i = 0; i < 3; i++)
                        U.tia.push({ x: d.x + (Math.random() - 0.5) * 90, y: d.y, t: 12, seed: Math.random() });
                    if (U.t === P1){
                        this.buaSet(this.x + this.w/2, this.y + this.h/2, 480, 30);
                        shakeTimer = Math.max(shakeTimer, 32);
                    }
                } else if (U.t <= P2){
                    // --- SAM SET PHU KHAP NGUOI ---
                    this.dy = 0; U.phu = 1;
                } else if (U.t <= P3){
                    // --- NHAY VOT LEN, set keo o PHIA DUOI ---
                    U.phu = 0;
                    let q = (U.t - P2) / (P3 - P2);
                    this.y = (250) - 330 * (1 - Math.pow(1 - q, 2));
                    this.dy = 0;
                    this.buaVK.ang = -1.45; this.buaVK.ext = 10;
                    U.keo = 1;
                } else if (U.t <= P4){
                    // --- GIU O DINH, ngam giua man ---
                    U.keo = 0;
                    this.x += (U.neo - this.w/2 - this.x) * 0.35;
                    this.y = -80; this.dy = 0;
                    this.buaVK.ang = -1.10; this.buaVK.ext = 6;
                } else if (this.y + this.h < 320){
                    // --- LAO THANG XUONG ---
                    this.x = U.neo - this.w/2;
                    this.y += 30; this.dy = 0;
                    this.buaVK.ang = 1.52; this.buaVK.ext = 48;
                    U.keo = 2;
                    if (U.t % 2 === 0) U.tia.push({ x: this.x + this.w/2, y: this.y - 40, t: 7, seed: Math.random() });
                } else {
                    // --- CHAM DAT: NO SET LAN RA HAI BEN ---
                    let cx = U.neo, ny = 320;
                    this.y = ny - this.h;
                    if (typeof allTargets === 'function') for (let o of allTargets()){
                        if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                        let ox = o.x + (o.w||20)/2;
                        let q = Math.min(1, Math.abs(ox - cx) / (canvas.width/2));
                        let dmg = Math.round(120 - 60 * q);
                        if (typeof dealDamage === 'function') dealDamage(o, dmg, 'ammo'); else o.hp -= dmg;
                        visualEffects.push(new Effect(ox, o.y + (o.h||20)/2, 'lightning_shock', true, 32));
                    }
                    this.giaoDatDap(cx, ny, 2.2);
                    for (let k = 0; k < 12; k++){
                        let sd = k % 2 ? 1 : -1, r = 60 + (k / 12) * canvas.width * 0.48;
                        U.tia.push({ x: cx, y: ny - 6, x2: cx + sd * r, y2: ny - 6 - Math.random() * 70,
                                     t: 22, seed: Math.random(), ngang: 1 });
                    }
                    for (let k = 0; k < 12; k++)
                        visualEffects.push(new Effect(cx + (Math.random()-0.5)*canvas.width*0.9, ny - Math.random()*90, 'explosion', true, 28));
                    shakeTimer = Math.max(shakeTimer, 56);
                    this.buaNo = { t: 26, tia: U.tia };
                    this.buaUlt = null; this.attackCooldown = 26;
                    this.invTimer = Math.max(this.invTimer || 0, 44);
                }
            }
// PLAYER_PART_END s4.Player.prototype.buaTickUlt.1
};

// index.html:60110 · Phạm vi: Player.prototype
const __Part5 = {
// PLAYER_PART_BEGIN s4.Player.prototype.buaVeUlt.1 EDITABLE
buaVeUlt(){
                let U = this.buaUlt, tia = U ? U.tia : (this.buaNo ? this.buaNo.tia : null);
                ctx.save(); ctx.lineCap = 'round';
                if (tia) for (let i = tia.length - 1; i >= 0; i--){
                    let T2 = tia[i]; T2.t--;
                    if (T2.t <= 0){ tia.splice(i, 1); continue; }
                    ctx.globalAlpha = Math.min(1, T2.t / 8);
                    if (T2.ngang) this.buaVeTia(T2.x, T2.y, T2.x2, T2.y2, 3.5, T2.seed);
                    else this.buaVeTia(T2.x, -20, T2.x, T2.y, 3.5, T2.seed);
                }
                if (U && U.phu){
                    // sam set phu khap nguoi
                    let cx = this.x + this.w/2, cy = this.y + this.h/2;
                    ctx.globalAlpha = 0.9;
                    for (let i = 0; i < 6; i++){
                        let a1 = frames * 0.5 + i * 1.05;
                        this.buaVeTia(cx + Math.cos(a1) * 10, cy + Math.sin(a1) * 12,
                                      cx + Math.cos(a1) * 40, cy + Math.sin(a1) * 44, 2.2, i * 0.37 + frames * 0.01);
                    }
                }
                if (U && U.keo){
                    // duoi set keo dai — di LEN thi keo o duoi, lao XUONG thi keo o tren
                    let cx = this.x + this.w/2, cy = this.y + this.h/2, h = (U.keo === 1) ? 1 : -1;
                    ctx.globalAlpha = 0.85;
                    for (let i = 0; i < 3; i++)
                        this.buaVeTia(cx + (i - 1) * 12, cy + h * 20, cx + (i - 1) * 26, cy + h * (120 + i * 34),
                                      3, i * 0.7 + frames * 0.02);
                }
                ctx.restore(); ctx.globalAlpha = 1;
                if (this.buaNo && --this.buaNo.t <= 0) this.buaNo = null;
            }
// PLAYER_PART_END s4.Player.prototype.buaVeUlt.1
};

// index.html:60143 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.13 EDITABLE
vkDangKy(11, {
            ten: 'MJOLNIR',
            // @@HE-LOLUNG2 — rune LO LUNG: nha K giua khong (xem hoverMidCharge)
            // Hans: "Bua nem bua o moc cao nhat duoi Channel (mat bua la trang thai khong tot nen phai la moc manh de bu)"
            hoverSac(half){
                if (!this.buaCoBua() || this.buaLao) return;
                this.buaNem(12, true); if (this.buaBay) this.buaBay.set = 1; this.buaNoNem(1.6);
            },
            theLuc: 5,
            sacToiDa: 180,
            // BUA la vu khi cua suc nang: cu dap cua no phu rong hon han
            slamTo: 1.45,
            banJ(){
                if (!(this.buaCho > 0)) this.buaSlash();
            },
            nhaK(){
                // ===== MJOLNIR — BON MOC, toi da 180f (3 giay) =====
                //  15f nen manh (chi 8 khung khung) | 30f NEM BUA | 60f NEM + SAM SET
                //  120f NEM co GOI VE — va tu moc nay tro di mo duoc PARRY
                let _hb = this.aKeyHeldTime, _ob = this.attackCooldown <= 0 && !this.isOverheated && this.ammo > 0;
                if (this.buaChan){ this.buaNhaChannel(); }
                // CHAM K ngay sau J phai ra LIEN — don ket duoc HUY khung hoi don.
                // Truoc day no ket sau chot attackCooldown nen phai bam J K K moi ra.
                else if (_hb < 15 && (this.buaCS || 0) > 0 && !this.isOverheated && this.ammo > 0
                         && this.buaCoBua() && !this.buaLao){ this.buaKet(); }
                else if (!this.buaCoBua()){
                    // @@HE-BUA2 — MAT BUA: nem set kieu Zeus. Duoi moc dau thi khong co gi.
                    if (!this.isOverheated && this.ammo > 0 && _hb >= BUA_ZEUS_MOC[0])
                        this.buaZeusNem(_hb >= BUA_ZEUS_MOC[1] ? 2 : 1);
                }
                // @@HE-BUA2: tam bay theo moc — 280 / 520 / het man; sat thuong 4 / 7 / 12
                else if (_hb >= 120 && _ob){ this.buaNem(12, true); if (this.buaBay) this.buaBay.set = 1; this.buaNoNem(1.6); }
                else if (_hb >= 60  && _ob){ this.buaNem(7, false, BUA_NEM_TAM[1]); if (this.buaBay) this.buaBay.set = 1; this.buaNoNem(1.4); }
                else if (_hb >= 30  && _ob){ this.buaNem(4, false, BUA_NEM_TAM[0]); }
                else if (_hb >= 15  && _ob){ this.buaNen(7, BUA_TAM[1], 1.5); this.buaKhung = 8; }
                else if (_ob){ this.buaKet(); }        // CHAM K = don xoay tien toi (du phong)
            },
            channelRieng(chargeKey){
                if (chargeKey && combatStance === 0 && this.aKeyHeldTime >= 180) {
                    if (!this.buaCoBua()){                       // @@HE-BUA2: mat bua -> Channel = 3 tia set
                        if (!this.isOverheated && this.ammo > 0) this.buaZeusNem(3);
                        this.aKeyHeldTime = 0; this.chargeProgress = 0;
                        return;
                    }
                    if (!this.buaChan) this.buaBatChannel();
                }
            },
            batUlt(){
                if (this.buaBay){ floatingTexts.push(new FloatingText(this.x - 40, this.y - 30, "CẦN CÓ BÚA")); }
                else {
                    this.buaBatUlt(); ultCharge = 0;
                    this.aKeyHeldTime = 0; this.chargeProgress = 0;
                    floatingTexts.push(new FloatingText(this.x - 40, this.y - 34, "MJÖLNIR!"));
                    shakeTimer = Math.max(shakeTimer, 26);
                    if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(90, 0.5, 'sawtooth', 0.3, 40); SFX.tone(2400, 0.2, 'square', 0.18, 500); }
                }
            },
            // Body Slam: goi mot tia set giang thang xuong diem cham
            slamDuoi(ix, iy, to){
                // BUA — goi mot tia set giang thang xuong diem cham
                if (typeof this.buaSet === 'function') this.buaSet(ix, iy, to ? 120 : 92, to ? 6 : 4);
                shakeTimer = Math.max(shakeTimer, to ? 26 : 18);
                floatingTexts.push(new FloatingText(ix - 40, iy - 42, "LÔI CHÙY"));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(2400, 0.10, 'square', 0.18, 600); SFX.tone(80, 0.30, 'sawtooth', 0.26, 40); }
            },
            // cam bua cham, mat bua nhanh; khung khung thi dinh chan
            heSoChay(mv){
                if (buaNguoi(this)){       // @@HE-BUA · @@HE-P2KHOA: P2 cung chay cham khi cam bua
                    mv *= buaHeSo();
                    if ((this.buaKhung || 0) > 0 || this.buaXoay) mv = 0;   // KHUNG KHUNG: dinh chan
                }
                return mv;
            },
            anDon(){
                // @@HE-BUA — PARRY bang bua: phai DU TOC. Charge tu moc 2-3 giay, hoac Channel
                // dang xoay du nhanh. Parry xong thi TAT charge ngay; con Channel thi khong tat
                // nhung tut het toc, phai giu lai ~3 giay moi du de parry lan nua.
                if (buaNguoi(this) && buaParryOk(this)){   // @@HE-P2KHOA: P2 cung parry duoc
                    visualEffects.push(new Effect(this.x + (this.isFacingLeft ? 0 : this.w), this.y, 'parry', this.isFacingLeft));
                    floatingTexts.push(new FloatingText(this.x - 20, this.y - 34, "PARRY!"));
                    let d = this.buaDau();
                    this.buaSet(d.x, d.y, 120, 3);
                    if (this.buaChan){ this.buaChan.toc = 0.06; this.buaChan.nghi = 0; }
                    else { this.aKeyHeldTime = 0; this.chargeProgress = 0; }
                    this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 26);
                    return true;
                }
                if (buaNguoi(this) && this.buaBay) this.buaBiDanh();
                return false;
            }
        });
// PLAYER_PART_END s4.vkDangKy.13
