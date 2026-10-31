// PLAYER_FILE: CUSTOM09
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CUS_AC_HOI, CUS_AC_NAC, CUS_BANG, CUS_CG_FULL, CUS_CG_HOI, CUS_CG_XUYEN, CUS_KHO_NAP, CUS_KHO_TRAN, CUS_KV_HOP_DAU, CUS_KV_HOP_NHIP, CUS_KV_LUNG, CUS_KV_SINH, CUS_LZ_HOI, CUS_LZ_HOIDAN, CUS_LZ_KHOANG, CUS_LZ_KMAX, CUS_LZ_KNAP, CUS_LZ_TU, CUS_MC_SAC, CUS_MT_THEM, CUS_MT_TRAN, CUS_PT_HOI, CUS_PT_KMOC, CUS_PT_NAP, CUS_PT_NHIP, CUS_PT_TRAN, CUS_RG_HOI, CUS_RG_KHET, CUS_RG_KLEN, CUS_RG_KR, CUS_RG_KRO, CUS_TL_DMG, CUS_TOA_CHARGE, CUS_TOA_SO, CUS_TT_DMG, CUS_TT_TRAN, CUS_UFO_BAT, CUS_UZ_NO, CW_BINH, CW_CUI_CUA, CW_CUI_SO, CW_DMG, CW_NAP_TOC, CW_NHIP, CW_RO_VANG, CW_RO_XANH, CW_VANG_DAI, CW_VANG_NHIP, CW_XANH_CHO, CW_XANH_DMG, CW_XANH_KHOA, CW_XANH_LEN, CW_XANH_NANG, Effect, FloatingText, KV_DAN, LT, PT_DAN, Projectile, SFX, allTargets, canvas, checkAABB, ctx, cusAcBan, cusAcBat, cusAcNacTu, cusBangDan, cusCapCua, cusCgBan, cusCgBat, cusCgDmg, cusCgMau, cusCgMax, cusChBat, cusChCap, cusChMoc, cusChNha, cusChTick, cusChVao, cusCwBat, cusKhoKhung, cusKhoTran, cusKv, cusKvBan, cusKvBat, cusKvHopNem, cusKvLay, cusKvLoLung, cusKvSoLung, cusKvThem, cusKvTranCam, cusKvTranPhong, cusKvVanPhong, cusLap, cusLapDung, cusLaserBan, cusLaserBat, cusMcBat, cusMt, cusMtBay, cusNuke, cusPtBat, cusPtCanKim, cusPtChay, cusPtDps, cusPtGoc, cusPtLoLung, cusPtNem, cusPtRut, cusPvpDanh, cusQdBat, cusRgBan, cusRgBat, cusRgDmg, cusRgKBat, cusRgKDmg, cusRgKHeSo, cusRgN, cusRgRoNhip, cusRgRoR, cusRgTiaSet, cusRgTick, cusTTBat, cusTl, cusToaBat, cusUfoBat, cusUfoHoiCd, cusUltCap, cusUltNo, cusUzu, cwDanh, cwTimCham, dangLuotHoacChop, dealDamage, dino, doChieuThu, floatingTexts, frames, gameState, jkKep, keys, projectiles, pvpDich, shakeTimer, venKhoa, visualEffects, vkDangKy
// index.html:69403 · Phạm vi: Player.prototype
const __Part0 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cwTick.1 EDITABLE
cwTick(banKey, chargeKey, crouchKey){
                if (this.cwBinh === undefined) this.cwBinh = CW_BINH;
                // thanh dan tren HUD = so GIAY xang con lai
                this.maxAmmo = Math.round(CW_BINH / 60);
                this.ammo = Math.ceil(this.cwBinh / 60);
                this.isOverheated = !!this.cwNong; this.overheatTimer = 0;

                /* ---- DANG BI KHOA TRONG DON CUA XANH ----
                   Khoa ca hai ben: ke dich khong cua duoc, nguoi choi cung khong lam gi khac
                   duoc. Nguoi choi DI XUYEN QUA than ke dich trong hai giay do — do la phan
                   "dam xuyen" Hans ta — nhung cu dam xuyen nay chi bat dau SAU KHI da cua
                   trung, khong bao gio keo nguoi choi lai gan.                              */
                if (this.cwKhoa){
                    let K = this.cwKhoa, o = K.muc;
                    if (!o || o.hp === undefined || o.hp <= 0 || o.invulnAll || K.t >= CW_XANH_KHOA){
                        if (o && K.yDat !== undefined && o.hp > 0) o.y = K.yDat;   // tha xuong lai
                        this.cwKhoa = null; this.cwBinh = 0; this.cwNong = 1; this.cwGiu = 0;
                        return;
                    }
                    K.t++;
                    if (typeof venKhoa === 'function') venKhoa(o, 10);
                    let can = Math.floor(K.t * CW_XANH_DMG / CW_XANH_KHOA);
                    while (K.da < can){
                        K.da++;
                        if (typeof dealDamage === 'function') dealDamage(o, 1, 'ammo'); else o.hp -= 1;
                        visualEffects.push(new Effect(o.x + (o.w||20)/2 + (Math.random()-0.5)*26,
                                                      o.y + (o.h||20)/2 + (Math.random()-0.5)*26,
                                                      'explosion', true, 12));
                    }
                    /* NHAC MUC TIEU LEN. Nguoi choi dung yen — chi con boss roi khoi mat dat.
                       Phai ghi de `y` MOI KHUNG (khong chi dat mot lan) vi trong luong cua no
                       van chay: dung mot lan thi no roi xuong lai ngay khung sau. Cung bai hoc
                       da hoc o doan TREO TREN KHONG cua Gwyn. */
                    let u = Math.min(1, K.t / CW_XANH_LEN);
                    o.y = K.yDat - CW_XANH_NANG * (u * (2 - u));      // len nhanh roi cham dan
                    if (o.dy !== undefined) o.dy = 0;
                    if (o.grounded !== undefined) o.grounded = false;
                    shakeTimer = Math.max(shakeTimer, 6);
                    if (K.t % 6 === 0 && typeof SFX !== 'undefined' && SFX.tone)
                        SFX.tone(150, 0.06, 'sawtooth', 0.16, 80);
                    return;
                }

                /* ---- NGHI THUC NAP XANG: cui ba cai lien tiep la DE MAY ----
                   Hans (lượt 4): "sau khi cui 3 lan thi TU SAC LAI do MAY DA NO, khong can giu
                   nut sau do nua." Nen ba cai cui la toan bo nghi thuc; xong roi nguoi choi
                   chay nhay thoai mai, binh tu day.
                   Van co mot cai gia: may chi bom xang khi KHONG cua. Giu J trong luc dang sac
                   thi hai chieu triet tieu nhau (dot 1 khung, bom 1 khung) — tuc muon day binh
                   thi phai chiu ngung cua, dung cai y "may no thi no tu sac" ma khong bien
                   nhanh nay thanh xang vo han. */
                let cui = !!this.isCrouching;
                if (cui && !this._cwCuiCu){
                    if (frames - (this.cwCuiCuoi || -999) <= CW_CUI_CUA) this.cwCuiDem = (this.cwCuiDem || 0) + 1;
                    else this.cwCuiDem = 1;
                    this.cwCuiCuoi = frames;
                    if (this.cwCuiDem >= CW_CUI_SO && !this.cwNapSan && this.cwBinh < CW_BINH){
                        this.cwNapSan = 1; this.cwCuiDem = 0;
                        floatingTexts.push(new FloatingText(this.x - 26, this.y - 26, "ĐỀ MÁY!"));
                        shakeTimer = Math.max(shakeTimer, 10);
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(220, 0.14, 'sawtooth', 0.22, 520);
                    }
                }
                this._cwCuiCu = cui;
                /* CAP 3: may luon no — xang TU HOI nhu mot loai dan thuong: ngung cua 0.5 giay
                   (vua qua nhiet thi 1.5 giay) la tu bom, khong can cui. */
                let _cwCap = (typeof cusCapCua === 'function') ? cusCapCua('chainsaw') : 1;
                if (_cwCap >= 3){
                    this.cwNghi = banKey ? 0 : (this.cwNghi || 0) + 1;
                    if (!this.cwNapSan && this.cwBinh < CW_BINH && this.cwNghi >= (this.cwNong ? 90 : 30)) this.cwNapSan = 1;
                }
                if (this.cwNapSan){
                    if (this.cwBinh >= CW_BINH){ this.cwNapSan = 0; }
                    else if (!banKey){
                        this.cwBinh = Math.min(CW_BINH, this.cwBinh + CW_NAP_TOC * (_cwCap >= 2 ? 2 : 1));   // cap 2+: cho xang con mot nua
                        if (this.cwBinh > 0) this.cwNong = 0;
                        if (frames % 7 === 0 && typeof SFX !== 'undefined' && SFX.tone)
                            SFX.tone(90 + (this.cwBinh / CW_BINH) * 60, 0.05, 'square', 0.07, 120);
                        if (frames % 5 === 0)
                            visualEffects.push(new Effect(this.x + this.w/2 + (Math.random()-0.5)*20,
                                                          this.y + this.h * 0.5, 'explosion', true, 5));
                    }
                }

                /* ---- RO CUA: giu K. Khong ton xang — ro la ro, chua cua gi ca. ---- */
                if (chargeKey && !this.cwHieu){
                    this.cwRo = (this.cwRo || 0) + 1;
                    if (this.cwRo % 5 === 0 && typeof SFX !== 'undefined' && SFX.tone)
                        SFX.tone(120 + Math.min(1, this.cwRo / CW_RO_XANH) * 220, 0.05, 'sawtooth', 0.10, 200);
                } else if ((this.cwRo || 0) > 0){
                    let r = this.cwRo; this.cwRo = 0;
                    this.cwMau = (r >= CW_RO_XANH) ? 'xanh' : (r >= CW_RO_VANG ? 'vang' : null);
                    if (this.cwMau){
                        floatingTexts.push(new FloatingText(this.x - 30, this.y - 30,
                            this.cwMau === 'xanh' ? "CƯA XANH!" : "CƯA VÀNG!"));
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(this.cwMau === 'xanh' ? 640 : 420, 0.18, 'square', 0.18, 900);
                    }
                }

                /* ---- HIEU UNG DANG CHAY ---- */
                if (this.cwHieu){
                    this.cwHieu.t--;
                    if (this.cwHieu.t <= 0){
                        // "Cua sau khi dung Charge se qua nhiet NGAY" — ke ca cua xanh cua hut.
                        this.cwHieu = null; this.cwBinh = 0; this.cwNong = 1; this.cwGiu = 0;
                        floatingTexts.push(new FloatingText(this.x - 34, this.y - 26, "QUÁ NHIỆT!"));
                        return;
                    }
                }

                /* ---- GIU J: DOT XANG VA CUA ---- */
                if (banKey && !this.cwNong && this.cwBinh > 0){
                    // J la nut KICH HOAT mau da chot luc ro
                    if (this.cwMau && !this.cwHieu){
                        this.cwHieu = (this.cwMau === 'vang')
                            ? { loai: 'vang', t: CW_VANG_DAI }
                            : { loai: 'xanh', t: CW_XANH_CHO };
                        this.cwMau = null;
                        shakeTimer = Math.max(shakeTimer, 14);
                    }
                    this.cwBinh--; this.cwGiu = (this.cwGiu || 0) + 1;
                    // cua XANH: moi khung deu do cham, de cu cham la dinh ngay
                    if (this.cwHieu && this.cwHieu.loai === 'xanh'){
                        let o = cwTimCham(this);
                        if (o){
                            this.cwKhoa = { muc: o, t: 0, da: 0, yDat: o.y };
                            this.cwHieu = null;
                            if (typeof venKhoa === 'function') venKhoa(o, CW_XANH_KHOA + 12);
                            floatingTexts.push(new FloatingText(o.x - 20, o.y - 32, "ĐÂM XUYÊN!"));
                            shakeTimer = Math.max(shakeTimer, 22);
                            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(90, 0.30, 'sawtooth', 0.30, 60); }
                            return;
                        }
                    }
                    let nhip = (this.cwHieu && this.cwHieu.loai === 'vang') ? CW_VANG_NHIP : CW_NHIP;
                    this.cwNhip = (this.cwNhip || 0) + 1;
                    if (this.cwNhip >= nhip){ this.cwNhip = 0; cwDanh(this, CW_DMG); }
                    if (frames % 4 === 0 && typeof SFX !== 'undefined' && SFX.tone)
                        SFX.tone(200, 0.04, 'sawtooth', 0.07, 150);
                    if (this.cwBinh <= 0){
                        this.cwBinh = 0; this.cwNong = 1; this.cwGiu = 0; this.cwHieu = null;
                        floatingTexts.push(new FloatingText(this.x - 30, this.y - 26, "HẾT XĂNG!"));
                    }
                } else {
                    // buong J la tam cua tut han ve 3cm — do la cai gia that su cua nhanh nay
                    this.cwGiu = 0; this.cwNhip = 0;
                }
            }
// PLAYER_PART_END s4.Player.prototype.cwTick.1
};

// index.html:69553 · Phạm vi: Player.prototype
const __Part1 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusBanPhao.1 EDITABLE
cusBanPhao(){
                let cap = cusCapCua('supply');
                let pos = this.getShootPos();
                let _d = (pos.dir < 0 ? -1 : 1);
                let _sc = (typeof this.getFormScale === 'function') ? this.getFormScale() : 1;
                this.cusLot = (this.cusLot || 0) + 1;
                let p = new Projectile(pos.x, pos.y - 4, CUS_TT_DMG, 5, 0, 0, pos.dir, this.id);
                p.speed = _d * (cap >= 3 ? 13 : 10); p.vy = 0;
                p.cus = 1; p.cusLot = this.cusLot; p.cusTT = 1; p.cusTTCap = cap;
                p.w = (cap >= 3 ? 62 : 40) * _sc; p.h = (cap >= 3 ? 26 : 18) * _sc;
                if (cap >= 3) p.pierceCount = 999;
                projectiles.push(p);
                this.attackCooldown = 10;
                shakeTimer = Math.max(shakeTimer, 14);
                floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, cap >= 3 ? "ĐẠI PHÁO!" : "PHÁO!"));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(130, 0.22, 'sawtooth', 0.30, 60); SFX.tone(600, 0.10, 'square', 0.16, 240); }
            }
// PLAYER_PART_END s4.Player.prototype.cusBanPhao.1
};

// index.html:69571 · Phạm vi: Player.prototype
const __Part2 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusKvTickNg.1 EDITABLE
cusKvTickNg(banKey, giuK){
                this.isOverheated = false; this.overheatTimer = 0; this.ammo = this.maxAmmo;
                /* @@HE-KVHOP — phim J:
                     cham J            -> phong 1 thanh (nhu cu)
                     GIU J             -> HOP KIEM: 0.2 giay dau gom thanh thu nhat, roi cu 0.25 giay them mot thanh (toi da 6), nha la nem
                     LUOT + J          -> VAN KIEM PHONG: ca lung xoe quat
                     XUONG + J         -> KIEM TRAN: cam ca hang kiem lam tuong; bam J lan nua la ca hang lao di */
                let _jMoi = banKey && !this._kvJCu; this._kvJCu = !!banKey;
                if (_jMoi){
                    if (cusKv.tran){ cusKvTranPhong(this); }
                    else if (typeof dangLuotHoacChop === 'function' && dangLuotHoacChop()) cusKvVanPhong(this);
                    else if (this.grounded && (keys['KeyS'] || keys['ArrowDown'])) cusKvTranCam(this);
                    else if (cusKvSoLung() > 0) this._kvHop = { t: 0, n: 0 };
                    else floatingTexts.push(new FloatingText(this.x - 26, this.y - 34, LT("HẾT KIẾM", "NO SWORDS")));
                }
                if (this._kvHop){
                    let H = this._kvHop;
                    if (banKey){
                        H.t++;
                        if (H.n < CUS_KV_LUNG && (H.t === CUS_KV_HOP_DAU || (H.t > CUS_KV_HOP_DAU && (H.t - CUS_KV_HOP_DAU) % CUS_KV_HOP_NHIP === 0))){
                            if (cusKvLay() >= 0){ H.n++;
                                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900 + H.n * 160, 0.06, 'triangle', 0.12, 1400 + H.n * 200); }
                        }
                    } else {
                        this._kvHop = null;
                        if (H.n <= 0) cusKvBan(this);           // cham J: mot thanh
                        else cusKvHopNem(this, H.n);
                    }
                }
                if (giuK){
                    cusKv.sinh++;
                    if (cusKv.sinh % CUS_KV_SINH === 0){
                        cusKvThem(this);
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1800 + Math.min(20, cusKv.du) * 30, 0.05, 'triangle', 0.10, 2600);
                    }
                } else cusKv.sinh = 0;
                if (cusKv.cd > 0) cusKv.cd--;
            }
// PLAYER_PART_END s4.Player.prototype.cusKvTickNg.1
};

// index.html:69610 · Phạm vi: Player.prototype
const __Part3 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusAcTickNg.1 EDITABLE
cusAcTickNg(banKey){
                this.isOverheated = false; this.overheatTimer = 0;
                if (this.ammo < 1){ this.cusAcHoi = (this.cusAcHoi || 0) + 1; if (this.cusAcHoi >= CUS_AC_HOI){ this.ammo = 1; this.cusAcHoi = 0; } }
                else this.cusAcHoi = 0;
                // bao nac sac khi dang giu K
                let g = this.aKeyHeldTime || 0;
                for (let i = 1; i < CUS_AC_NAC.length; i++) if (g === CUS_AC_NAC[i].t && this.id === 1){
                    floatingTexts.push(new FloatingText(this.x - 6, this.y - 30, "×" + i));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(300 + i * 120, 0.06, 'sine', 0.10, 500 + i * 150);
                }
                if (banKey && this.ammo > 0){ this.ammo = 0; this.cusAcHoi = 0; cusAcBan(this, 0); }
            }
// PLAYER_PART_END s4.Player.prototype.cusAcTickNg.1
};

// index.html:69624 · Phạm vi: Player.prototype
const __Part4 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusCgTickNg.1 EDITABLE
cusCgTickNg(banKey, giuK){
                this.isOverheated = false; this.overheatTimer = 0; this.ammo = this.maxAmmo;
                if ((this.cusCgHoi || 0) > 0) this.cusCgHoi--;
                if (giuK && !this._cusCgPhimK){
                    let n = this.cusCgTen || 1;
                    if (n < cusCgMax()){
                        this.cusCgTen = n + 1;
                        floatingTexts.push(new FloatingText(this.x - 14, this.y - 30, "+1 " + LT("TÊN", "ARROW") + " (" + this.cusCgTen + ")"));
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900 + 120 * n, 0.05, 'triangle', 0.10, 1300);
                    }
                }
                this._cusCgPhimK = !!giuK;
                if (banKey){
                    if (!this.cusCgKeo && (this.cusCgHoi || 0) <= 0){ this.cusCgKeo = true; this.cusCgT = 0; }
                    if (this.cusCgKeo){
                        this.cusCgT++;
                        if ((this.cusCgT === 30 || this.cusCgT === 45 || this.cusCgT === 60) && typeof SFX !== 'undefined' && SFX.tone)
                            SFX.tone(300 + this.cusCgT * 12, 0.07, 'square', 0.10, 500 + this.cusCgT * 14);   // tieng day cang theo nac
                    }
                    return;
                }
                if (this.cusCgKeo){
                    cusCgBan(this, this.cusCgT);
                    this.cusCgKeo = false; this.cusCgT = 0; this.cusCgHoi = CUS_CG_HOI; this.cusCgTen = 1;
                }
            }
// PLAYER_PART_END s4.Player.prototype.cusCgTickNg.1
};

// index.html:69650 · Phạm vi: Player.prototype
const __Part5 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusPtTickNg.1 EDITABLE
cusPtTickNg(banKey){
                // @@HE-PTRUT — Xuong + J: rut kim (khong ton kim trong bang, rut duoc ca luc dang nap)
                let _jMoi = banKey && !this._ptJCu; this._ptJCu = !!banKey;
                if (_jMoi && (keys['KeyS'] || keys['ArrowDown']) && cusPtRut(this)){ this.cusPtCd = CUS_PT_NHIP * 2; return; }
                /* @@HE-CUSPT2 — nem ca 2 kim thi QUA NHIET nhe 1.5 giay (chinh la luc nap lai ca hai). */
                if (this.ammo <= 0){
                    this.cusPtNap = (this.cusPtNap || 0) + 1;
                    this.isOverheated = true; this.overheatTimer = Math.max(1, CUS_PT_NAP - this.cusPtNap);
                    if (this.cusPtNap >= CUS_PT_NAP){ this.ammo = this.maxAmmo; this.cusPtNap = 0; this.cusPtHoi = 0; this.isOverheated = false; this.overheatTimer = 0; }
                    return;
                }
                this.isOverheated = false; this.overheatTimer = 0;
                if (this.ammo < this.maxAmmo){
                    this.cusPtHoi = (this.cusPtHoi || 0) + 1;
                    if (this.cusPtHoi >= CUS_PT_HOI){ this.ammo++; this.cusPtHoi = 0; }
                } else { this.cusPtHoi = 0; this.cusPtNap = 0; }
                if (this.cusPtCd > 0) this.cusPtCd--;
                if (banKey && (this.cusPtCd || 0) <= 0 && this.ammo > 0){
                    this.ammo--; this.cusPtCd = CUS_PT_NHIP;
                    cusPtNem(this, 0);
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(2200, 0.04, 'triangle', 0.10, 3200);
                }
            }
// PLAYER_PART_END s4.Player.prototype.cusPtTickNg.1
};

// index.html:69674 · Phạm vi: Player.prototype
const __Part6 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusRgKTick.1 EDITABLE
cusRgKTick(giuK){
                if (!giuK){ this.cusRgK = null; }
                else if (!this.cusRgK) this.cusRgK = { t: 0, giam: 0, ro: 0 };
                let K = this.cusRgK;
                if (K && K.t < CUS_RG_KHET){
                    K.t++;
                    if (K.giam > 0) K.giam--;
                    if (K.t === CUS_RG_KLEN) floatingTexts.push(new FloatingText(this.x - 10, this.y - 36, "×3"));
                    if (K.t === CUS_RG_KHET && typeof SFX !== 'undefined' && SFX.tone) SFX.tone(600, 0.15, 'sine', 0.10, 200);
                    // dien quanh nguoi giat ke dich lai gan
                    if (++K.ro >= CUS_RG_KRO){
                        K.ro = 0;
                        let R = canvas.width / 23 * CUS_RG_KR, cx = this.x + this.w / 2, cy = this.y + this.h / 2;
                        let ds = (gameState === 'pvp') ? [((typeof pvpDich === 'function') ? pvpDich(this) : null)]
                                                       : ((typeof allTargets === 'function') ? allTargets() : []);
                        for (let o of ds){
                            if (!o || o === this || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                            let nx = Math.max(o.x, Math.min(cx, o.x + (o.w||20))), ny = Math.max(o.y, Math.min(cy, o.y + (o.h||20)));
                            if (Math.hypot(nx - cx, ny - cy) > R) continue;
                            if (gameState === 'pvp'){ if (typeof cusPvpDanh === 'function') cusPvpDanh(this, o, 1); else if (o.takeDamage) o.takeDamage(1); }   // @@HE-P2KHOA
                            else if (typeof dealDamage === 'function') dealDamage(o, 1, 'flat'); else o.hp -= 1;
                            cusRgTiaSet(cx, cy, nx, ny, 14, 8);
                        }
                    }
                }
                // cu luot set dang chay
                let L = this.cusRgLuot;
                if (L && L.t > 0){
                    L.t--;
                    let cx = this.x + this.w / 2, cy = this.y + this.h / 2;
                    // vet set noi tu cho bat dau luot toi cho dang dung: cang manh cang nhieu soi
                    for (let k = 0; k < 1 + Math.floor(L.dmg / 3); k++)
                        cusRgTiaSet(L.sx, L.sy + (Math.random() - 0.5) * 20, cx, cy + (Math.random() - 0.5) * 20, 6 + L.dmg * 2, 6);
                    L.x = cx; L.y = cy;
                    let hb = { x: this.x - 10, y: this.y - 6, w: this.w + 20, h: this.h + 12 };
                    if (this.id === 1 && typeof doChieuThu === 'function') doChieuThu(L, hb, L.dmg);   // @@HE-DOCHIEU: cu luot set cung do chieu
                    let ds = (gameState === 'pvp') ? [((typeof pvpDich === 'function') ? pvpDich(this) : null)]
                                                   : ((typeof allTargets === 'function') ? allTargets() : []);
                    for (let o of ds){
                        if (!o || o === this || L.hit.has(o) || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                        if (!checkAABB(hb, o)) continue;
                        L.hit.add(o);
                        if (gameState === 'pvp'){ if (typeof cusPvpDanh === 'function') cusPvpDanh(this, o, L.dmg); else if (o.takeDamage) o.takeDamage(L.dmg); }   // @@HE-P2KHOA
                        else if (typeof dealDamage === 'function') dealDamage(o, L.dmg, 'ammo'); else o.hp -= L.dmg;
                        visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'lightning_shock', true, 20 + L.dmg * 3));
                    }
                    if (L.t <= 0) this.cusRgLuot = null;
                }
            }
// PLAYER_PART_END s4.Player.prototype.cusRgKTick.1
};

// index.html:69724 · Phạm vi: Player.prototype
const __Part7 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusRgTick.1 EDITABLE
cusRgTick(banKey){
                this.isOverheated = false; this.overheatTimer = 0; this.ammo = this.maxAmmo;
                if ((this.cusRgHoi || 0) > 0){ this.cusRgHoi--; if (!this.cusRgGiu) return; }
                if (banKey && !this.cusRgGiu && (this.cusRgHoi || 0) <= 0){
                    this.cusRgGiu = true; this.cusRgT = 0; this.cusRgRoT = 0;
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1800, 0.08, 'triangle', 0.14, 2600);   // tieng tung dong xu
                }
                if (!this.cusRgGiu) return;
                if (banKey){
                    let truoc = cusRgN(this.cusRgT);
                    this.cusRgT++;
                    let n = cusRgN(this.cusRgT);
                    if (n > truoc){
                        floatingTexts.push(new FloatingText(this.x - 10, this.y - 36, "×" + n + "  (" + cusRgDmg(n) + ")"));
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(500 + 120 * Math.min(n, 10), 0.14, 'sawtooth', 0.14, 900 + 160 * Math.min(n, 10));
                    }
                    // tu nac 2: dien ro phong vao ke dich o gan, 1 sat thuong moi 20 khung
                    if (n >= 2 && ++this.cusRgRoT >= cusRgRoNhip(n)){
                        this.cusRgRoT = 0;
                        let R = cusRgRoR(n), cx = this.x + this.w / 2, cy = this.y + this.h / 2;
                        let ds = (gameState === 'pvp') ? [((typeof pvpDich === 'function') ? pvpDich(this) : null)]
                                                       : ((typeof allTargets === 'function') ? allTargets() : []);
                        for (let o of ds){
                            if (!o || o === this || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                            let nx = Math.max(o.x, Math.min(cx, o.x + (o.w||20))), ny = Math.max(o.y, Math.min(cy, o.y + (o.h||20)));
                            if (Math.hypot(nx - cx, ny - cy) > R) continue;
                            if (gameState === 'pvp'){ if (typeof cusPvpDanh === 'function') cusPvpDanh(this, o, 1); else if (o.takeDamage) o.takeDamage(1); }   // @@HE-P2KHOA
                            else if (typeof dealDamage === 'function') dealDamage(o, 1, 'flat'); else o.hp -= 1;
                            cusRgTiaSet(cx, cy, nx, ny, 16, 9);
                        }
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(3000, 0.04, 'square', 0.06, 1200);
                    }
                    return;
                }
                // nha J
                let n = cusRgN(this.cusRgT);
                this.cusRgGiu = false; this.cusRgT = 0;
                if (n >= 1){ cusRgBan(this, n); this.cusRgHoi = CUS_RG_HOI; }
                else floatingTexts.push(new FloatingText(this.x - 10, this.y - 30, "XỊT"));
            }
// PLAYER_PART_END s4.Player.prototype.cusRgTick.1
};

// index.html:69767 · Phạm vi: Player.prototype
const __Part8 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cusLaserTick.1 EDITABLE
cusLaserTick(banKey){
                // khong qua nhiet, chi hoi dan 0.5 giay mot vien
                this.isOverheated = false; this.overheatTimer = 0;
                if (this.ammo < this.maxAmmo){
                    this.cusLzNap = (this.cusLzNap || 0) + 1;
                    if (this.cusLzNap >= CUS_LZ_HOIDAN){ this.cusLzNap = 0; this.ammo = Math.min(this.maxAmmo, this.ammo + 1); }
                } else this.cusLzNap = 0;
                if (this.cusLzHoi > 0) this.cusLzHoi--;
                if (!banKey){ this.cusLzTu = 0; return; }
                if (this.cusLzHoi > 0) return;
                if ((this.cusLzKho || 0) > 0){          // tia da tich san: xa NGAY
                    this.cusLzKho--; cusLaserBan(this);
                    this.cusLzHoi = CUS_LZ_KHOANG; this.cusLzTu = 0; return;
                }
                if (this.ammo <= 0){ this.cusLzTu = 0; return; }
                this.cusLzTu = (this.cusLzTu || 0) + 1;
                if (this.cusLzTu >= CUS_LZ_TU){
                    this.cusLzTu = 0; this.ammo--;
                    cusLaserBan(this); this.cusLzHoi = CUS_LZ_HOI;
                }
            }
// PLAYER_PART_END s4.Player.prototype.cusLaserTick.1
};

// index.html:69790 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VK_CUSTOM.1 EDITABLE
const VK_CUSTOM = {
            sacBoQuaNhiet: true,        // Kho tru cua Charge ban duoc CA TRONG luc qua nhiet
            // @@HE-LOLUNG2 — rune LO LUNG: Phi Tieu 4 kim chui xuong · Kiem Vu mot KIEM LON 12 (ton 2) · Custom MOT VIEN TO x1.5
            hoverSac(half){
                if (typeof cusPtBat === 'function' && cusPtBat()) return cusPtLoLung(this);
                if (typeof cusKvBat === 'function' && cusKvBat()) return cusKvLoLung(this);
                return this.cusBanTo();
            },
            /* @@HE-CUSTOM: giu K de TRU DAN thi sung van nguoi di nhu luc ngung ban.
               Do la ly do Charge cua Custom vua la don danh vua la cach xu ly qua
               nhiet — cua so lam nguoi khong bi phi. */
            hoiKhiGiuK: true,
            nhaKTruoc(){
                if (cusTTBat()){
                    /* @@HE-CUSTT — khoa han Charge: khong tru kho, khong ban gi. Phim K
                       da duoc xu ly o tren theo canh len. */
                }
                else if (cusLaserBat()){
                    /* @@HE-CUSLZ — Charge KHONG tach tia ra ba: no TICH SAN tia de ban
                       tuc thi. Giu 100 khung duoc mot tia (toi da 3) — 5 giay cho ba tia,
                       so voi 6 giay neu ban tay tung cai. Nhanh hon mot chut, nhung cai
                       mua that su la QUYEN CHON LUC XA: ba tia lien tiep cach nhau 0.2
                       giay, khong con mot giay tu nao o giua. */
                    let them = Math.min(CUS_LZ_KMAX, Math.floor(this.aKeyHeldTime / CUS_LZ_KNAP));
                    if (them > 0){
                        this.cusLzKho = Math.min(CUS_LZ_KMAX, (this.cusLzKho || 0) + them);
                        floatingTexts.push(new FloatingText(this.x - 30, this.y - 30, "TÍCH " + this.cusLzKho + " TIA"));
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1400, 0.12, 'sawtooth', 0.18, 2200);
                    }
                }
                else if (cusKvBat()){
                    /* @@HE-CUSKV — K da sinh kiem trong luc giu; nha K khong lam gi them. */
                }
                else if (typeof cusAcBat === 'function' && cusAcBat()){
                    // @@HE-CUSAC — nha K: phat phao da sac (0.75 / 1.5 / 2 / 3 giay)
                    let lv = cusAcNacTu(this.aKeyHeldTime);
                    if (lv > 0){ cusAcBan(this, lv); this.ammo = 0; this.cusAcHoi = 0; }
                }
                else if (cusCgBat()){
                    /* @@HE-CUSCG — K la phim BAM dat mui ten (bat canh len o cusCgTickNg). Nha K khong lam gi. */
                }
                else if (cusPtBat()){
                    // @@HE-CUSPT — nha K: phong 2 / 4 / 6 / 8 kim hinh quat
                    let nac = Math.min(4, Math.floor(this.aKeyHeldTime / CUS_PT_KMOC));
                    if (nac > 0){
                        let n = nac * 2, b = cusPtGoc();
                        for (let i = 0; i < n; i++) cusPtNem(this, (i - (n - 1) / 2) * b, true);
                        floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, n + " KIM"));
                        if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(2600, 0.08, 'triangle', 0.14, 3600); SFX.tone(1800, 0.06, 'triangle', 0.10, 2800); }
                    }
                }
                else if (cusRgBat()){
                    /* @@HE-CUSRG2 — K khong con tich san nac (Hans: "tru la viec cua J"). K la
                       DIEN TU GIA TOC: xem cusRgKTick. Nha K khong ban gi ca. */
                }
                else if (cusToaBat()){
                    /* @@HE-CUSTOA — Charge ra DUNG MOT vien, nhung vien do toa 10 / 14 / 18
                       tuy giu 1, 2 hay 3 giay. Khong dinh gi toi cap cua nhanh: cap chi
                       quyet dinh no xuyen duoc bao nhieu than. */
                    if (this.aKeyHeldTime >= 60){
                        let muc = Math.max(0, Math.min(2, Math.floor(this.aKeyHeldTime / 60) - 1));
                        this.cusBanToa(false, CUS_TOA_CHARGE[muc]);
                        floatingTexts.push(new FloatingText(this.x - 30, this.y - 30, "TOẢ " + CUS_TOA_CHARGE[muc]));
                    }
                }
                else if (cusMcBat()){
                    // @@HE-CUSMC — charge khong tru dan: NAP ca bang dang cam
                    if (this.aKeyHeldTime >= CUS_MC_SAC && !this.cusMcSac && !this.isOverheated){
                        this.cusMcSac = true;
                        floatingTexts.push(new FloatingText(this.x - 34, this.y - 30, "BĂNG ĐÃ NẠP"));
                        visualEffects.push(new Effect(this.x + this.w / 2, this.y + this.h / 2, 'parry', false));
                        if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(420, 0.10, 'square', 0.16, 840); SFX.tone(840, 0.14, 'triangle', 0.12, 1260); }
                    }
                }
                else {
                    // @@HE-CUSTOM — chot so dan da tru vao kho. Khong ban ra ngay: kho
                    // nam do cho toi khi nguoi choi tu bam J xa.
                    let them = Math.floor(this.aKeyHeldTime / (60 / CUS_KHO_NAP));
                    if (them > 0){
                        let _tran = (typeof cusKhoTran === 'function') ? cusKhoTran() : CUS_KHO_TRAN;
                        this.cusKho = Math.min(_tran, (this.cusKho || 0) + them);
                        floatingTexts.push(new FloatingText(this.x - 28, this.y - 30,
                            "KHO " + this.cusKho + " VIÊN"));
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(520, 0.10, 'square', 0.16, 900);
                    }
                }
            },
            /* @@HE-CUSTOM — nhip ban RIENG, khong di qua hang rao `attackCooldown`
               chung. Ly do: Custom can hai toc do khac nhau (6 va 9 vien/giay) va ca
               hai deu la so le so voi bo dem khung nguyen, nen dung mot dong ho float
               rieng thi con so ra dung tuyet doi. Kho tru cua Charge ban duoc CA TRONG
               luc qua nhiet — do la toan bo y nghia cua no. */
            moiKhung(checkAmmo, fireKey, chargeKey, crouchKey){
                /* @@HE-CUSNC — tran bang dan lay theo nhanh BANG DAN, tinh lai MOI KHUNG
                   thay vi gan mot lan luc tao nhan vat. Nho vay doi nang cap giua chung
                   (trong Customize hay o mot nut thuong cua Route) an ngay lap tuc, khong
                   phai cho vao tran moi. */
                let _cmx = (typeof cusBangDan === 'function') ? cusBangDan() : CUS_BANG;
                if (this.maxAmmo !== _cmx){
                    this.maxAmmo = _cmx;
                    if (this.ammo > _cmx) this.ammo = _cmx;
                }
                if (this.cusCd > 0) this.cusCd--;
                if (cusQdBat()) this.cusQdNapDan();          // @@HE-CUSQD — khong qua nhiet
                let _cOk = (fireKey && (this.aKeyHeldTime === 0 || jkKep(checkAmmo)) && this.laserActiveTimer <= 0 && !this.jcState);   // @@HE-JKKEP
                /* @@HE-CUSCW — CHAINSAW nuot han nhip ban: khong co vien nao ra ca, va no
                   con phai chay CA KHI KHONG BAM GI (de dem nhip cui nap xang va dem thoi
                   gian ro cua). Nen no dung truoc moi nhanh khac va khong di qua `_cOk`. */
                if (cusCwBat()) this.cwTick(_cOk, chargeKey, crouchKey);
                // @@HE-CUSLZ — LASER thay han nhip ban: giu J de tu, khong ban tung phat.
                else if (cusLaserBat()) this.cusLaserTick(_cOk);
                else if (cusRgBat()){ this.cusRgTick(_cOk); if (this.id === 1 || gameState === 'pvp') this.cusRgKTick(!!chargeKey); }   // @@HE-CUSRG · @@HE-P2KHOA: P2 cung co K
                else if (cusPtBat()) this.cusPtTickNg(_cOk);        // @@HE-CUSPT
                else if (cusCgBat()) this.cusCgTickNg(_cOk, !!chargeKey);   // @@HE-CUSCG
                else if (cusAcBat()) this.cusAcTickNg(_cOk);        // @@HE-CUSAC
                else if (cusKvBat()){ if (this.id === 1 || gameState === 'pvp') this.cusKvTickNg(_cOk, !!chargeKey); }   // @@HE-CUSKV / @@HE-PVPCUS: P2 cung dung duoc
                else if (_cOk && (this.cusCd || 0) <= 0){
                    if ((this.cusKho || 0) > 0) this.cusBan(true);
                    else if (!this.isOverheated && this.ammo > 0) this.cusBan(false);
                }
                /* @@HE-CUSTT — K khong con la phim GIU de charge ma la phim BAM de ban
                   phao. Phai bat theo canh len cua phim, neu khong thi giu K mot giay se
                   ban het sach kho phao.
                   KHONG xoa `aKeyHeldTime` nua: Channel can dong ho do de dem moc, va
                   GIU K con dung de goi truc thang som hon. */
                if (cusTTBat()){
                    if (chargeKey && !this._cusTTPhim && (this.cusTTNap || 0) > 0
                        && this.attackCooldown <= 0 && !this.jcState){
                        this.cusTTNap--; this.cusBanPhao();
                    }
                    this._cusTTPhim = !!chargeKey;
                }
                // @@HE-CUSCH — vao/ra Channel. Giu K qua moc thi mo; nha K la dong va NHA DON.
                if ((this.id === 1 || (gameState === 'pvp' && (cusLapDung() !== cusLap || cusLap.ch !== 'nuke'))) && cusChBat()){   // @@HE-PVPCUS · @@HE-P2KHOA: P2 co Channel Custom (tru Bom Nguyen Tu)
                    // RAILGUN: giu CA J (len nac) LAN K (dien tu gia toc) thi KHONG mo Channel —
                    // vua tich phat ban vua chay nhanh vua Channel thi qua ba dao.
                    let _rgKep = cusRgBat() && fireKey;
                    if (chargeKey && this.aKeyHeldTime >= cusChMoc() && (this.cusCh || !_rgKep)){
                        if (!this.cusCh){ this.cusCh = 1; cusChVao(this); }
                        cusChTick(this);
                    } else if (this.cusCh){
                        this.cusCh = 0; cusChNha(this);
                    }
                } else if (this.cusCh){ this.cusCh = 0; cusChNha(this); }
            },
            batUlt(){
                // @@HE-CUSULT — Custom khong dung `ultActive`: ca ba chieu cuoi cua no
                // deu la thu do vao mot bo dem roi tu chay, khong co trang thai "dang
                // trong chieu cuoi" nao ca. `cusUltNo` tu lo viec xoa thanh no.
                cusUltNo(this);
            },
            /* @@HE-CUSTOM — KHO TRU DAN cua Charge la mot bo dem RIENG, khong nam
               trong bang dan, nen phai co cho hien rieng: giu K ba giay ma khong thay
               gi thay doi tren HUD thi nguoi choi khong biet minh vua duoc cai gi. */
            veHudThem(){
                ctx.font = "bold 12px Consolas, monospace";
                if (cusLaserBat()){
                    // @@HE-CUSLZ — kho tru khong con nghia gi voi LASER; cho hien so TIA tich san
                    let _t = dino.cusLzKho || 0;
                    ctx.fillStyle = _t > 0 ? "#FFD54F" : "#546E7A";
                    ctx.fillText("TIA " + _t + "/" + CUS_LZ_KMAX, 200, 64);
                } else if (cusKvBat()){
                    // @@HE-CUSKV — so kiem tren lung / tren cao
                    let _l = cusKvSoLung();
                    ctx.fillStyle = _l > 0 ? "#80DEEA" : "#546E7A";
                    ctx.fillText("KIẾM " + _l + "/6" + (cusKv.du > 0 ? " +" + cusKv.du : ""), 200, 64);
                    if (_l >= 6){ ctx.fillStyle = "#B2EBF2"; ctx.fillText("◈ KHIÊN", 200, 80); }
                } else if (cusAcBat()){
                    // @@HE-CUSAC — vien phao / dang hoi + nac sac
                    ctx.fillStyle = dino.ammo > 0 ? "#B3E5FC" : "#546E7A";
                    ctx.fillText(dino.ammo > 0 ? LT("PHÁO 1/1", "CANNON 1/1") : LT("NẠP ", "RELOAD ") + ((CUS_AC_HOI - (dino.cusAcHoi || 0)) / 60).toFixed(1) + "s", 200, 64);
                    let _lv = cusAcNacTu(dino.aKeyHeldTime || 0);
                    if (_lv > 0){ let _N = CUS_AC_NAC[_lv]; ctx.fillStyle = "#E1F5FE";
                        ctx.fillText("×" + _lv + " · " + _N.dmg + " dmg · " + (_N.R > 0 ? _N.R + "cm" : LT("toàn map", "whole map")), 200, 80); }
                } else if (cusCgBat()){
                    // @@HE-CUSCG — so mui tren day + nac dang keo
                    let _n = dino.cusCgTen || 1, _t = dino.cusCgKeo ? (dino.cusCgT || 0) : 0;
                    ctx.fillStyle = "#FFE0B2";
                    ctx.fillText("➶ " + _n + "/" + cusCgMax() + " · ∞", 200, 64);
                    if (dino.cusCgKeo){ ctx.fillStyle = cusCgMau(cusCgDmg(_t));
                        ctx.fillText(LT("KÉO ", "DRAW ") + cusCgDmg(_t) + " dmg" + (_t >= CUS_CG_XUYEN ? LT(" · XUYÊN", " · PIERCE") : (_t >= CUS_CG_FULL ? LT(" · hết map", " · full map") : "")), 200, 80); }
                } else if (cusPtBat()){
                    // @@HE-CUSPT — dang nap kim / muc tieu chay mau nang nhat
                    let _m = 0; for (let o of cusPtChay) if (o._cusMau && o._cusMau.n > _m) _m = o._cusMau.n;
                    let _dm = cusPtDps(_m);
                    ctx.fillStyle = "#CFD8DC";
                    if (dino.ammo > 0) ctx.fillText("KIM " + dino.ammo + "/2", 200, 64);   // can thi thanh QUA NHIET chung da bao
                    if (_m > 0){ ctx.fillStyle = "#FF5252";
                        ctx.fillText("🩸 " + _dm + "/s" + (_dm < CUS_PT_TRAN ? " · " + _m + "/" + cusPtCanKim(_dm + 1) + " kim" : " · TRẦN"), 200, 80); }
                } else if (cusRgBat()){
                    // @@HE-CUSRG — nac dang tich (hoac tich san bang K)
                    let _n = dino.cusRgGiu ? cusRgN(dino.cusRgT) : 0;
                    ctx.fillStyle = _n > 0 ? "#4FC3F7" : "#546E7A";
                    ctx.fillText("RAIL ×" + _n + (_n > 0 ? " = " + cusRgDmg(_n) : ""), 200, 64);
                    if (cusRgKBat(dino)){
                        ctx.fillStyle = "#FFEE58";
                        ctx.fillText("⚡ ×" + cusRgKHeSo(dino).toFixed(1) + " · LƯỚT " + cusRgKDmg(dino), 200, 80);
                    }
                } else if (cusToaBat()){
                    ctx.fillStyle = "#546E7A";
                    ctx.fillText("TOẢ ×" + CUS_TOA_SO, 200, 64);
                } else if (cusTTBat()){
                    // @@HE-CUSTT — kho tru khong ton tai voi nhanh nay; hien so vien PHAO
                    let _ph = dino.cusTTNap || 0;
                    ctx.fillStyle = _ph > 0 ? "#FFD54F" : "#546E7A";
                    ctx.fillText("PHÁO " + _ph + "/" + CUS_TT_TRAN, 200, 64);
                } else if (cusCwBat()){
                    /* @@HE-CUSCW — khong co kho tru. Cho nay hien SO GIAY XANG con lai va,
                       khi da ro xong, MAU CUA dang cho bam J — neu khong thi nguoi choi ro
                       du ba giay xong khong con cach nao biet minh dang cam cai gi. */
                    let _x = ((dino.cwBinh === undefined ? CW_BINH : dino.cwBinh) / 60);
                    ctx.fillStyle = dino.cwNong ? "#FF5252" : (_x > 3 ? "#8BC34A" : "#FFB74D");
                    ctx.fillText("XĂNG " + _x.toFixed(1) + "s", 200, 64);
                    if (dino.cwMau){
                        ctx.fillStyle = dino.cwMau === 'xanh' ? "#66BB6A" : "#FFD54F";
                        ctx.fillText(dino.cwMau === 'xanh' ? "● XANH — BẤM J" : "● VÀNG — BẤM J", 274, 64);
                    } else if (dino.cwHieu){
                        ctx.fillStyle = dino.cwHieu.loai === 'xanh' ? "#66BB6A" : "#FFD54F";
                        ctx.fillText(dino.cwHieu.loai === 'xanh' ? "XUYÊN " + (dino.cwHieu.t/60).toFixed(1) + "s"
                                                                 : "VÀNG " + (dino.cwHieu.t/60).toFixed(1) + "s", 274, 64);
                    }
                } else {
                let _k = dino.cusKho || 0;
                ctx.fillStyle = _k > 0 ? "#4DD0E1" : "#546E7A";
                ctx.fillText("KHO " + _k + "/" + ((typeof cusKhoTran === 'function') ? cusKhoTran() : CUS_KHO_TRAN), 200, 64);
                }
                // @@HE-CUSULT — con bao nhieu phat TEN LUA. Khong hien thi thi nguoi choi
                // khong biet phat nao con la ten lua, ma ba phat do la ca chieu cuoi.
                if ((dino.cusTL || 0) > 0){
                    ctx.fillStyle = "#FF7043";
                    ctx.fillText("🚀 " + dino.cusTL + " × " + (CUS_TL_DMG[cusUltCap()] || 0), 288, 64);
                }
                // @@HE-CUSNK — dong ho dem nguoc. Khong hien thi thi nguoi choi khong
                // biet con bao lau nen khong biet co dang co giu tiep hay khong.
                if (cusLap.ch === 'nuke' && cusChCap('nuke') > 0
                    && !(typeof cusNuke !== 'undefined' && cusNuke)){
                    ctx.fillStyle = "#546E7A";
                    ctx.fillText("☢ 10s", 288, 64);   // dang dem thi bang giua man lo, o day tat di
                }
                // @@HE-CUSTL — so day dang giang
                if (typeof cusPtBat === 'function' && cusPtBat() && typeof cusTl !== 'undefined' && cusTl && cusTl.pha === 'giang'){
                    ctx.fillStyle = "#ECEFF1";
                    ctx.fillText("🕸 " + cusTl.day.length + LT(" dây", " threads") + (cusTl.tuGiat > 0 ? " · " + (cusTl.tuGiat / 60).toFixed(1) + "s" : ""), 288, 64);
                }
                // @@HE-CUSMT — dot hien tai / so ten dang roi
                if (cusLap.ch === 'muaten' && cusChCap('muaten') > 0 && typeof cusMt !== 'undefined'){
                    ctx.fillStyle = (cusMt && cusMt.giu) ? "#FFCC80" : "#546E7A";
                    ctx.fillText("🏹 " + ((cusMt && cusMt.giu) ? ("×" + Math.min(CUS_MT_TRAN, CUS_MT_THEM * cusMt.dot) + " · " + (cusMt.nhip / 60).toFixed(1) + "s · " + cusMtBay() + "/" + CUS_MT_TRAN) : "3s"), 288, 64);
                }
                // @@HE-CUSUZ — nhac con bao lau moi bung
                if (cusLap.ch === 'uzumaki' && cusChCap('uzumaki') > 0 && typeof cusUzu !== 'undefined'){
                    if (cusUzu && cusUzu.giu && cusUzu.pha === 'nap'){
                        ctx.fillStyle = "#B388FF";
                        ctx.fillText("🌀 " + Math.ceil((CUS_UZ_NO - cusUzu.t) / 60) + "s", 288, 64);
                    } else if (cusUzu && cusUzu.pha === 'xa'){ ctx.fillStyle = "#FF80AB"; ctx.fillText(cusUzu.giu ? "🌀 !!!" : "🌀 " + Math.ceil(cusUzu.con / 60) + "s", 288, 64); }
                    else { ctx.fillStyle = "#546E7A"; ctx.fillText("🌀 10s", 288, 64); }
                }
                // @@HE-CUSUFO — bo dem bat muc tieu (du 10 thi hoi 1 mau)
                if (cusLap.ch === 'ufo' && cusChCap('ufo') > 0){
                    ctx.fillStyle = cusUfoHoiCd > 0 ? "#546E7A" : "#66BB6A";
                    ctx.fillText("🛸 " + cusUfoBat + "/" + CUS_UFO_BAT
                                 + (cusUfoHoiCd > 0 ? (" (" + Math.ceil(cusUfoHoiCd / 60) + "s)") : ""), 288, 64);
                }
                ctx.font = "bold 15px Consolas, monospace";
            }
        };
// PLAYER_PART_END s4.VK_CUSTOM.1

// index.html:70056 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.16 EDITABLE
vkDangKy(14, Object.assign({}, VK_CUSTOM, {
            ten: 'CUSTOM',
            sacToiDa(){ return (typeof cusKhoKhung === 'function') ? cusKhoKhung() : 180; },
            // @@HE-JKKEP: Custom LASER (J tu tia / K tich san tia), Custom RAILGUN (J len nac / K dien tu gia toc)
            jkKep(){ return typeof cusLaserBat === 'function' && (cusLaserBat() || (typeof cusRgBat === 'function' && cusRgBat()) || (typeof cusCgBat === 'function' && cusCgBat())); },   // CUNG: vua keo J vua bam K dat ten
            /* @@HE-CUSCW — CHAINSAW lay han phim K lam nut RO CUA va co vanh bao rieng
               doi mau do/vang/xanh. De vong charge chung chay chong len thi nguoi choi
               thay mot vong XANH LO to tuong trong luc dang ro den mau VANG — hai tin
               hieu mau khac nhau cho cung mot hanh dong. Tat han vong chung o day. */
            anVongSac(){ return typeof cusCwBat === 'function' && (cusCwBat() || cusRgBat() || cusCgBat()); },
            // @@HE-CUSRG2: dang giu K (dien tu gia toc) thi chay theo he so rieng
            heSoChay(mv){
                if ((this.id === 1 || gameState === 'pvp') && this.cusRgK && typeof cusRgKHeSo === 'function' && cusRgBat()) mv *= cusRgKHeSo(this);   // @@HE-CUSRG2 · @@HE-P2KHOA
                return mv;
            },
            // @@HE-CUSMC: nap xong bang moi thi het charge
            hetQuaNhiet(){
                if (this.cusMcSac){ this.cusMcSac = false; }   // @@HE-CUSMC: nap xong bang moi thi het charge
            },
            // @@HE-CUSMC: Man Cuoi khong tu hoi dan
            khoaHoi(){ return typeof cusMcBat === 'function' && cusMcBat(); }
        }));
// PLAYER_PART_END s4.vkDangKy.16

// index.html:70078 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.17 EDITABLE
vkDangKy(PT_DAN, Object.assign({}, VK_CUSTOM, { ten: 'PHI TIEU', sacToiDa: 180 }));
// PLAYER_PART_END s4.vkDangKy.17

// index.html:70079 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.18 EDITABLE
vkDangKy(KV_DAN, Object.assign({}, VK_CUSTOM, { ten: 'KIEM VU',  sacToiDa: 180 }));
// PLAYER_PART_END s4.vkDangKy.18
