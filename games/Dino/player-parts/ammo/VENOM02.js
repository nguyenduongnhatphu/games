// PLAYER_FILE: VENOM02
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, SFX, VEN_C2_DMG, VEN_C2_SO, VEN_C2_TAM, VEN_C4_DMG, VEN_C4_LAO, VEN_C4_TAM, VEN_C4_TAN, VEN_C4_TUONG, VEN_CHE_CHAN, VEN_CH_DMG, VEN_CH_NHIP, VEN_CH_TAM, VEN_DU_KHUNG, VEN_DU_XA, VEN_GAI_CHO, VEN_GAI_LECH, VEN_GAI_MOC, VEN_GAI_NHAM_X, VEN_GIOT_CHO, VEN_LAO_DMG, VEN_LAO_R, VEN_TO_XA, VEN_ULT_KHUNG, VEN_XUYEN_DMG, VEN_XUYEN_XA, allTargets, bamXuongKhong, checkAABB, combatStance, ctx, dashVx, floatingTexts, frames, gdCatHop, hasRune, keys, setCanApDon, setCanDmg, shakeTimer, venGiot, venKhoa, venNovaGiot, venTickVung, venTo, venVeDao, venVeGio, venVeMangTatCa, venVeMoc, venVeRoi, venVeToa, venVeVoi, venVeVung, visualEffects, vkDangKy
// index.html:62692 · Phạm vi: Player.prototype
const __Part0 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venomTick.1 EDITABLE
venomTick(){
                /* @@HE-VENOM-ULT2 — trong ult, Venom la loai dan DUY NHAT van di duong danh
                   thuong (xem @@HE-VENOM-ULT), nen no cung la loai duy nhat con TIEU DAN khi
                   bat ult. Ma dong 28912 lai tat hoi dan suot `ultActive`. Ket qua do duoc:
                   spam J trong ult -> het dan o khung 123 (~2 giay) roi OVERHEAT, tam 8 giay
                   con lai cua ult J va K deu khong ra don. Cac loai khac khong dinh vi
                   `doUltFire` cua chung khong dung dan.
                   Cac ult khac cung khong ton dan, nen day la san bang chu khong phai buff. */
                if (this.ultActive && this.ultAmmo === 13){
                    this.ammo = this.maxAmmo;
                    if (this.isOverheated){ this.isOverheated = false; this.overheatTimer = 0; }
                }
                venTickVung();
                if (this.grounded){ this._venDuDung = 0; }
                if (this._venDuT > 0){ this._venDuT--; this.x += this._venDuDir * (VEN_DU_XA / VEN_DU_KHUNG); }
                /* J -> DASH: vua quat xong ma luot thi thanh cu LUOT XUYEN. Truoc day dai
                   340px, do thuc te ra 454px — xa qua, mat kiem soat. Gio chi nhinh hon cu
                   luot thuong mot chut; cai lam no dang gia la don J tiep theo (J Dash J)
                   bung gai moi huong, khong phai quang duong. */
                if (!this._venXuyen && (frames - (this._venLuotCho || -999)) <= 24
                    && typeof dashVx !== 'undefined' && Math.abs(dashVx) > 2){
                    this._venXuyen = { t: 0, hit: new Set(), dir: dashVx > 0 ? 1 : -1 };
                }
                if (this._venXuyen){
                    let X = this._venXuyen; X.t++;
                    this.x += X.dir * (VEN_XUYEN_XA / 28 - Math.abs(dashVx) * 0.15);
                    let hop = { x: this.x - 6, y: this.y, w: this.w + 12, h: this.h };
                    if (this.id === 1 && typeof gdCatHop === 'function') gdCatHop(hop);   // @@HE-GATDAN
                    if (X.t === 1 && typeof setCanApDon === 'function') setCanApDon(this, 150);
                    let _set = (typeof setCanDmg === 'function') ? setCanDmg() : 0;
                    if (typeof allTargets === 'function') for (let o of allTargets()){
                        if (!o || o.hp === undefined || o.hp <= 0) continue;
                        let g = o.__goc || o;
                        if (X.hit.has(g) || !checkAABB(hop, o)) continue;
                        X.hit.add(g); o.hp -= VEN_XUYEN_DMG + _set;
                    }
                    if (X.t > 28) this._venXuyen = null;
                }
                // CHIEU CUOI het gio
                // `doUltFire` da tu tang ultTimer moi khung, o day chi xet han.
                if (this.ultActive && this.ultAmmo === 13 && this.ultTimer > VEN_ULT_KHUNG) this.endUlt();
                // MOC 2: nha bon nhat, moi nhat cach nhau 9 khung
                if (this._venC2){
                    let C = this._venC2; C.t++;
                    if (C.t % 9 === 0){
                        let dir = this.isFacingLeft ? -1 : 1, sc = this.getFormScale();
                        this._beginSlash(VEN_C2_DMG, 10, dir, Math.round(VEN_C2_TAM*sc), 20, 20, 0);
                        // MOT cu chat: mot luoi vuot to, quet mot cung dai.
                        let g0 = dir > 0 ? 0 : Math.PI;
                        /* Quet tu tren cao XUONG QUA MAT DAT. a1 = +0.70 rad (40 do duoi
                           ngang): goc phat don o y=289, tam 285 -> mui dao ket o y=473, tuc
                           SAU duoi dat 153px. Da thu 1.30 (74 do) thi mui xuong toi y=564,
                           qua nua nhat nam duoi dat, khong con nhin thay gi. */
                        /* KHONG dat x/y: de trong thi `venVeFx` lay tam than NGAY LUC VE, nen
                           goc roi luon dinh vao nguoi choi. Dong bang toa do luc phat don thi
                           nguoi choi buoc mot buoc la cai roi lo lung giua troi. */
                        this.venFx('dao', { a0: g0 - 1.30 * dir, a1: g0 + 0.70 * dir,
                                            dai: Math.round(VEN_C2_TAM*sc), day: 11, T: 34 });
                        if (++C.n >= VEN_C2_SO) this._venC2 = null;
                    }
                }
                // MOC 4: giu 20 khung roi lao toi dap muc tieu vao tuong
                if (this._venTom){
                    let T = this._venTom; T.t++;
                    if (T.pha === 'tan'){
                        // tay dang vuon ra. Chi bat o DUNG khung cuoi, khi tay da du dai.
                        if (T.t >= VEN_C4_TAN){
                            T.o = this.venTomBat(T.dir);
                            if (!T.o){
                                this.attackCooldown = 35;    // hut: don manh nhat phai co gia
                                floatingTexts.push(new FloatingText(this.x - 16, this.y - 28, "HỤT!"));
                                this._venTom = null;
                            } else {
                                T.pha = 'keo'; T.t = 0;
                                venKhoa(T.o, VEN_C4_LAO + 24);
                                this.attackCooldown = VEN_C4_LAO + 14;
                                floatingTexts.push(new FloatingText(this.x - 20, this.y - 34, "TÓM!"));
                                shakeTimer = Math.max(shakeTimer, 14);
                                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(300, 0.10, 'square', 0.18, 620);
                            }
                        }
                    } else {
                        let o = T.o;
                        if (!o || o.hp === undefined || o.hp <= 0){ this._venTom = null; }
                        else {
                            venKhoa(o, 10);
                            // THU TAY VE = tu keo minh bay toi cho no. Do MEP toi MEP.
                            let mep = T.dir > 0 ? (this.x + this.w) : this.x;
                            let khe = T.dir > 0 ? (o.x - mep) : (mep - (o.x + (o.w||20)));
                            if (khe > 22 && T.t < VEN_C4_LAO){
                                this.x += T.dir * Math.min(26, Math.max(9, khe * 0.34));
                                if (!bamXuongKhong(this)) this.dy = Math.min(this.dy, 0.5);
                            } else {
                                // DAP MOT PHAT. Tong 14 = dung tran can chien, y nhu ban cu
                                // (10 + 4) chi khac la khong con phu thuoc vao cai tuong.
                                o.hp -= VEN_C4_DMG + VEN_C4_TUONG;
                                venKhoa(o, 34);
                                if (o.dy !== undefined && o.grounded !== undefined){ o.dy = -7; o.grounded = false; }
                                o.x += T.dir * 26;
                                visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 46));
                                shakeTimer = Math.max(shakeTimer, 30);
                                floatingTexts.push(new FloatingText(o.x - 16, o.y - 40, "ĐẠP!"));
                                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(110, 0.22, 'square', 0.26, 60);
                                this._venTom = null;
                            }
                        }
                    }
                }
                if (this._venTan > 0) this._venTan--;
                // CHANNEL: bon gai sau lung choc lien tuc
                if (this.venChan){
                    // dong ho rieng cua tung xuc tu: moc ra truoc, sau do choc lap vo han
                    for (const G of (this._venGai || [])){
                        G.t++;
                        if (G.moc < 1) G.moc = Math.min(1, G.moc + 1/14);
                        // Moi vong dam moi boc lai mot do lech: van huong ve diem hoi tu
                        // nhung chia len hoac xuong mot chut, khong cu the mai mot cho.
                        if (G.t >= 0 && G.t % VEN_CH_NHIP === 0)
                            G.lech = (Math.random() * 2 - 1) * VEN_GAI_LECH;
                    }
                    if ((this._venChT = (this._venChT || 0) + 1) % VEN_CH_NHIP === 0){
                        let dir = this.isFacingLeft ? -1 : 1, sc = this.getFormScale();
                        this._beginSlash(VEN_CH_DMG, 8, dir, Math.round(VEN_CH_TAM*sc), 26, 26, 0);
                        // Khong sinh fx moi nua — bon xuc tu da co san, xem `_venGai`.
                        this.ammo = Math.max(0, this.ammo - 0.2);
                        if (this.ammo <= 0){ this.venChan = 0; this._venGai = null; this.isOverheated = true; this.overheatTimer = 70; }
                    }
                }
                if (this._venTo){ this._venTo.t++; if (this._venTo.t > 12) this._venTo = null; }
                if (this._venFx) for (let i = this._venFx.length - 1; i >= 0; i--)
                    if (++this._venFx[i].t > this._venFx[i].T) this._venFx.splice(i, 1);
                /* DUNG LEN thi vung no thanh GAI. Bat bang canh chuyen trang thai cui->dung
                   chu khong bat su kien nha phim: nguoi choi co the roi tu the cui bang nhieu
                   duong (bi day, het cho cui), va moi duong deu phai ket vung. */
                let cui = !!this.isCrouching;
                if (this._venCuiCu && !cui && this.venVungKet('gai')){
                    // Ban than cung bat len de noi combo tren khong — dung mo ta goc.
                    this.dy = -12; this.grounded = false; this.canDoubleJump = true;
                }
                this._venCuiCu = cui;
                if (this._venCS > 0) this._venCS--;
                // che xuong / lao xuong: cham dat thi tao chan
                if ((this._venChan || this._venLao) && this.grounded){
                    let cx = this.x + this.w/2, manh = this._venLao ? 1 : 0;
                    let R = manh ? VEN_LAO_R : 90, D = manh ? VEN_LAO_DMG : VEN_CHE_CHAN;
                    if (typeof allTargets === 'function') for (let o of allTargets()){
                        if (!o || o.hp === undefined || o.hp <= 0) continue;
                        if (Math.abs((o.x + (o.w||20)/2) - cx) < R) o.hp -= D;
                    }
                    this.venFx('toa', { x: cx, y: 306, dai: R, so: 12, day: 7, T: 30, lech: 0.2 });
                    shakeTimer = Math.max(shakeTimer, manh ? 24 : 14);
                    this._venChan = 0; this._venLao = 0;
                }
            }
// PLAYER_PART_END s4.Player.prototype.venomTick.1
};

// index.html:62848 · Phạm vi: Player.prototype
const __Part1 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venVeRoi.1 EDITABLE
venVeRoi(){
                let A = null; if (!A) return;
                let k = A.t / A.T, cx = this.x + this.w/2, cy = this.y + this.h*0.45;
                let vuon = Math.sin(Math.min(1, k * 1.35) * Math.PI) * A.reach;   // vuon ra roi thu ve
                ctx.save();
                ctx.lineCap = 'round';
                // than roi: mot duong cong quat tu tay ra
                for (let lop = 0; lop < 2; lop++){
                    ctx.globalAlpha = lop ? 0.95 : 0.35;
                    ctx.strokeStyle = lop ? '#7E57C2' : '#4A148C';
                    ctx.lineWidth = lop ? 5 : 11;
                    ctx.beginPath();
                    ctx.moveTo(cx, cy);
                    let cong = (1 - k) * 46 - 14;
                    ctx.quadraticCurveTo(cx + A.dir * vuon * 0.55, cy - cong,
                                         cx + A.dir * vuon, cy + cong * 0.35);
                    ctx.stroke();
                }
                // dau roi: mot chum gai nho
                let hx = cx + A.dir * vuon, hy = cy + ((1 - k) * 46 - 14) * 0.35;
                ctx.globalAlpha = 0.95; ctx.fillStyle = '#CE93D8';
                for (let g = 0; g < 3; g++){
                    let a = -0.6 + g * 0.6;
                    ctx.beginPath();
                    ctx.moveTo(hx, hy);
                    ctx.lineTo(hx + A.dir * Math.cos(a) * 22, hy + Math.sin(a) * 22);
                    ctx.lineTo(hx + A.dir * Math.cos(a) * 8, hy + Math.sin(a) * 8 + 6);
                    ctx.closePath(); ctx.fill();
                }
                ctx.restore();
            }
// PLAYER_PART_END s4.Player.prototype.venVeRoi.1
};

// index.html:62879 · Phạm vi: Player.prototype
const __Part2 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venFx.1 EDITABLE
venFx(kieu, o){
                if (!this._venFx) this._venFx = [];
                this._venFx.push(Object.assign({ kieu: kieu, t: 0, T: 20, day: 7 }, o));
                while (this._venFx.length > 10) this._venFx.shift();
            }
// PLAYER_PART_END s4.Player.prototype.venFx.1
};

// index.html:62884 · Phạm vi: Player.prototype
const __Part3 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venVeFx.1 EDITABLE
venVeFx(){
                if (!this._venFx) return;
                let cx = this.x + this.w/2, cy = this.y + this.h*0.45;
                for (const f of this._venFx){
                    let k = f.t / f.T;
                    if (f.kieu === 'vung'){
                        /* VUNG = QUAT ROI. Truoc day o day to mot mang den 22% sau nhat quat
                           — nhin ra vet muc chu khong ra gio. Bo han, thay bang VET LUOT GIO
                           (may cung mo dan) va ve than roi bang `venVeRoi` de no oan theo,
                           ngon lai phia sau goc chu khong cung don nhu luoi kiem. */
                        let q = Math.min(1, k * 1.5);
                        let a = f.a0 + (f.a1 - f.a0) * (q * q * (3 - 2 * q));
                        venVeGio(f.x != null ? f.x : cx, f.y != null ? f.y : cy, f.a0, a, f.dai, k);
                        venVeRoi(f.x != null ? f.x : cx, f.y != null ? f.y : cy, f.a0, a, f.dai, k,
                                 (f.day || 11) * 1.35);
                    }
                    else if (f.kieu === 'dao'){
                        let q = Math.min(1, k * 1.5);
                        let a = f.a0 + (f.a1 - f.a0) * (q * q * (3 - 2 * q));
                        venVeGio(f.x != null ? f.x : cx, f.y != null ? f.y : cy, f.a0, a, f.dai, k);
                        venVeDao(f.x != null ? f.x : cx, f.y != null ? f.y : cy, f.a0, a, f.dai, k, f.day || 9);
                    }
                    else if (f.kieu === 'moc'){
                        // gai lung: goc moc tu SAU LUNG, uon cong dam ra truoc
                        venVeMoc(f.x != null ? f.x : cx, f.y != null ? f.y : cy, f.dir, f.dai, k, f.day, f.lech || 0, f.dam);
                    }
                    else if (f.kieu === 'voi') venVeVoi(f.x != null ? f.x : cx, f.y != null ? f.y : cy, f.ang, f.dai, k, f.day);
                    else if (f.kieu === 'toa') venVeToa(f.x != null ? f.x : cx, f.y != null ? f.y : cy, f.so || 10, f.dai, k, f.day, f.lech);
                }
            }
// PLAYER_PART_END s4.Player.prototype.venVeFx.1
};

// index.html:62914 · Phạm vi: Player.prototype
const __Part4 = {
// PLAYER_PART_BEGIN s4.Player.prototype.venomVe.1 EDITABLE
venomVe(){
                venVeVung();
                venVeMangTatCa();
                this.venVeFx();
                let cx = this.x + this.w/2, cy = this.y + this.h*0.45;
                // ---- soi to dang bay (moc 1): noi lien voi than nguoi choi ----
                for (const T of venTo){
                    if (T.chu !== this) continue;
                    ctx.save();
                    ctx.strokeStyle = '#1A1A20'; ctx.lineWidth = 2.6; ctx.globalAlpha = 0.9;
                    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(T.x, T.y); ctx.stroke();
                    ctx.globalAlpha = 0.45;
                    for (let z = 1; z < 6; z++){
                        let px = cx + (T.x - cx) * (z/6), py = cy + (T.y - cy) * (z/6);
                        ctx.beginPath(); ctx.arc(px, py, 2.4, 0, 6.28); ctx.stroke();
                    }
                    ctx.globalAlpha = 0.95; ctx.fillStyle = '#0B0B0F';
                    ctx.beginPath(); ctx.arc(T.x, T.y, 6, 0, 6.28); ctx.fill();
                    let u = Math.min(1, Math.abs(T.x - T.x0) / VEN_TO_XA);
                    if (u > 0.35){
                        let mo = (u - 0.35) / 0.65;
                        ctx.globalAlpha = 0.75 * mo; ctx.strokeStyle = '#2A2A32'; ctx.lineWidth = 1.3;
                        let goc = T.dir > 0 ? 0 : Math.PI, n = 5, L = 8 + 26 * mo;
                        for (let i = 0; i < n; i++){
                            let a = goc + (i / (n - 1) - 0.5) * 1.15;
                            ctx.beginPath(); ctx.moveTo(T.x, T.y);
                            ctx.lineTo(T.x + Math.cos(a) * L, T.y + Math.sin(a) * L); ctx.stroke();
                        }
                        ctx.beginPath();
                        for (let i = 0; i < n; i++){
                            let a = goc + (i / (n - 1) - 0.5) * 1.15;
                            let px = T.x + Math.cos(a) * L * 0.62, py = T.y + Math.sin(a) * L * 0.62;
                            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                        }
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // ---- gai lung khi Channel ----
                if (this.venChan && this._venGai){
                    /* Bon xuc tu CO SAN, khong ve lai tu dau moi nhip. Moi con:
                         `moc` 0->1  moc ra khoi lung (chi mot lan, luc bat Channel)
                         `t`         dong ho chay vong VEN_CH_NHIP -> lap lai dong tac choc
                       Nho vay nhin ra la BON CON XUC TU DANG CHOC LIEN TUC, chu khong phai
                       bon hinh anh thay nhau xuat hien. */
                    let d = this.isFacingLeft ? -1 : 1;
                    for (const G of this._venGai){
                        if (G.t < 0) continue;
                        let k = (G.t % VEN_CH_NHIP) / VEN_CH_NHIP;
                        /* Gai dam CHECH thi tam NGANG cua no ngan lai theo cos(huong) — do
                           duoc con dam len tren chi voi toi 72px trong khi hop trung don la
                           110. Bu lai bang cach keo dai chinh no, de bon mui deu cham mot
                           vong tron chu khong phai mot duong thang dung. */
                        let _tx = VEN_GAI_NHAM_X - G.dx, _ty = G.nham + (G.lech || 0) - G.dy;
                        let _h = Math.atan2(_ty, _tx);
                        let _Lg = Math.max(40, Math.hypot(_tx, _ty) - VEN_GAI_MOC * 0.35);
                        venVeMoc(cx + d * G.dx, this.y + G.dy, d, G.goc, _h,
                                 VEN_GAI_MOC, _Lg * (0.30 + 0.70 * G.moc), k, 8);
                    }
                }
                // ---- hai tay tom (moc 4) ----
                if (this._venTom){
                    let T = this._venTom, d = T.dir;
                    let tx, ty;
                    if (T.pha === 'tan'){
                        // tay dang VUON RA: dai dan toi het tam, hoi rung o dau
                        let k = Math.min(1, T.t / VEN_C4_TAN);
                        let L = VEN_C4_TAM * (k * k * (3 - 2 * k));
                        tx = cx + d * L; ty = cy + Math.sin(frames * 0.9) * 2;
                    } else {
                        let o = T.o;
                        tx = o.x + (o.w||20)/2; ty = o.y + (o.h||20)/2;
                    }
                    /* MOT tay thoi. Nhin ngang thi hai tay chong len nhau thanh mot mang den
                       day, khong doc ra la tay — bo mot cai la ro han. */
                    ctx.save(); ctx.lineCap = 'round';
                    let vy = cy - 4;
                    ctx.strokeStyle = '#0A0A0E'; ctx.lineWidth = 15;
                    ctx.beginPath(); ctx.moveTo(cx, vy); ctx.lineTo(tx, ty); ctx.stroke();
                    ctx.strokeStyle = '#26262E'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(cx, vy); ctx.lineTo(tx, ty); ctx.stroke();
                    ctx.globalAlpha = 0.5; ctx.strokeStyle = '#D8D8E4'; ctx.lineWidth = 1.3;
                    ctx.beginPath(); ctx.moveTo(cx, vy - 3); ctx.lineTo(tx, ty - 3); ctx.stroke();
                    ctx.globalAlpha = 1; ctx.fillStyle = '#08080B';
                    ctx.beginPath(); ctx.arc(tx, ty, 11, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = '#D8D8E4'; ctx.lineWidth = 1.2; ctx.stroke();
                    ctx.restore();
                }
                /* BAO MOC CHARGE. Truoc day khong co gi bao ca nen khong biet dang o moc nao —
                   ma bon moc cua Venom lam bon viec khac han nhau. */
                if (keys['KeyK'] && !this.venChan && this.attackCooldown <= 0){
                    const MOC = [[25,'1 · TƠ'],[60,'2 · XÉ'],[100,'3 · TOẢ GAI'],[145,'4 · TÓM'],[185,'CHANNEL']];
                    let h = this.aKeyHeldTime || 0, ten = null, so = 0;
                    for (let i = 0; i < MOC.length; i++) if (h >= MOC[i][0]){ ten = MOC[i][1]; so = i + 1; }
                    let bx = cx - 34, by = this.y - 30;
                    ctx.save();
                    ctx.fillStyle = 'rgba(0,0,0,0.72)'; ctx.fillRect(bx, by, 68, 13);
                    // thanh tien do toi moc ke tiep
                    let ke = MOC.find(m => h < m[0]);
                    let t0 = so ? MOC[so-1][0] : 0, t1 = ke ? ke[0] : MOC[MOC.length-1][0];
                    let p = ke ? Math.max(0, Math.min(1, (h - t0) / (t1 - t0))) : 1;
                    ctx.fillStyle = '#26262E'; ctx.fillRect(bx, by + 10, 68, 3);
                    ctx.fillStyle = '#D8D8E4'; ctx.fillRect(bx, by + 10, 68 * p, 3);
                    ctx.fillStyle = ten ? '#FFFFFF' : '#8A8A96';
                    ctx.font = 'bold 9px Consolas, monospace'; ctx.textAlign = 'center';
                    ctx.fillText(ten || 'GIỮ K...', cx, by + 8);
                    ctx.textAlign = 'left';
                    ctx.restore();
                }
                // ---- hao quang khi bat chieu cuoi ----
                if (this.ultActive && this.ultAmmo === 13){
                    ctx.save(); ctx.globalAlpha = 0.28 + Math.sin(frames*0.2)*0.1;
                    ctx.fillStyle = '#08080B';
                    ctx.beginPath(); ctx.ellipse(cx, this.y + this.h*0.5, this.w*0.95, this.h*0.62, 0, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 0.9; ctx.fillStyle = '#101015';
                    for (let g = 0; g < 8; g++){          // gai moc quanh nguoi
                        let a = (g/8)*Math.PI*2 + frames*0.04;
                        let r1 = this.w*0.5, r2 = r1 + 16 + Math.sin(frames*0.3+g)*5;
                        ctx.beginPath();
                        ctx.moveTo(cx + Math.cos(a)*r1, this.y+this.h*0.5 + Math.sin(a)*r1*1.2);
                        ctx.lineTo(cx + Math.cos(a)*r2, this.y+this.h*0.5 + Math.sin(a)*r2*1.2);
                        ctx.lineTo(cx + Math.cos(a+0.22)*r1, this.y+this.h*0.5 + Math.sin(a+0.22)*r1*1.2);
                        ctx.closePath(); ctx.fill();
                    }
                    ctx.restore();
                }
                /* TE BAO — nam BAM DUOI DAT, phinh dan roi moc mot xuc tu DAM LEN muc tieu
                   gan nhat. Truoc day toi ve chung lo lung giua khong trung, sai han. */
                for (const g of venGiot){
                    let _c = g.cho || VEN_GIOT_CHO;
                    let k = Math.min(1, g.t / _c);
                    ctx.save();
                    ctx.globalAlpha = 0.9; ctx.fillStyle = '#08080B';
                    ctx.beginPath();
                    ctx.ellipse(g.x, 318, 9 + k * 7, 4 + k * 3, 0, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 0.4; ctx.strokeStyle = '#D8D8E4'; ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.ellipse(g.x, 318, 9 + k * 7, 4 + k * 3, 0, 0, 6.28); ctx.stroke();
                    ctx.restore();
                    if (g.den && g.t >= _c){                    // moc xuc tu dam len muc tieu
                        let dx = g.den.x - g.x, dy = g.den.y - 316;
                        let kk = Math.min(1, (g.t - _c) / 16);
                        venVeVoi(g.x, 316, Math.atan2(dy, dx), Math.hypot(dx, dy), kk, 6);
                    }
                }
            }
// PLAYER_PART_END s4.Player.prototype.venomVe.1
};

// index.html:63070 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.15 EDITABLE
vkDangKy(13, {
            ten: 'VENOM',
            // @@HE-LOLUNG2 — rune LO LUNG: nha K giua khong (xem hoverMidCharge)
            hoverSac(half){ this.attackCooldown = 0; this.venChemLoLung(); },   // @@HE-LOLUNG3
            sacToiDa: 185,
            ultBuff: true,              // chieu cuoi la trang thai: `update` tu dem ultTimer, doUltFire bo qua
            /* NGOAI LE VENOM: J -> Dash -> J. Cu J mo cua so luot van con dinh 24-34
               khung hoi don, nen hang rao `attackCooldown <= 0` o day nuot luon cu J thu
               hai va don bung gai khong bao gio ra. Dang luot xuyen thi cho qua. */
            jQuaHoi(){ return !!this._venXuyen; },
            banJ(){
                this.venomSlash();
            },
            nhaK(){
                /* ===== VENOM — BON MOC ===== (so o day la so THAT, dung bo cu 35/75/120/170)
                    <25f  cham K: phong xuc tu DAM XUYEN, tam 250
                     25f  ban to: 0 dmg + 1 tang (4 tang -> ken + troi)
                     60f  bon nhat lien tiep truoc mat
                    100f  gai moc dai ra tu than, moi phia
                    145f  hai tay bat -> dap muc tieu vao tuong (phai trung moi an)
                    185f  Channel gai lung
                   Bon moc nay phai khop voi `chargeMoc(13)` va `CHARGE_TIERS[13]`. */
                let _hv = this.aKeyHeldTime, _ov = this.attackCooldown <= 0 && !this.isOverheated && this.ammo > 0;
                if (this.venChan){ this.venChan = 0; this._venChT = 0; this._venGai = null; }
                else if (_hv >= 145 && _ov) this.venTom();
                else if (_hv >= 100 && _ov) this.venGaiQuanh();
                else if (_hv >= 60  && _ov) this.venChem4();
                else if (_hv >= 25  && _ov) this.venBanTo();
                else if (_ov) this.venVungManh();
            },
            // @@HE-VENOM — giu K qua moc cuoi (170f) thi vao CHANNEL: bon gai sau lung
            // choc lien tuc. Truoc do toi viet phan nhip cua channel ma QUEN dong bat nay,
            // nen `venChan` khong bao gio duoc gan — do duoc channel ra dung 0 sat thuong.
            channelRieng(chargeKey){
                if (chargeKey && combatStance === 0 && this.aKeyHeldTime >= 185) {
                    if (!this.venChan){ this.venChan = 1; this._venChT = 0;
                        /* Bon xuc tu duoc TAO MOT LAN o day roi ton tai suot Channel; moi
                           khung chung chi chay tiep chu ky choc cua rieng minh. Ban truoc
                           moi nhip lai `venFx` bon cai MOI — nen khong bao gio thay mot con
                           xuc tu nao "dang choc", chi thay cai nay hien ra thay cho cai kia. */
                        /* Bon goc moc RAI KHAP THAN — vai, lung tren, lung duoi, hong — moi
                           con mot goc vuon rieng. Ban truoc xep thang mot cot cach nhau 11px
                           tai cung mot x: ra hang rao, khong ra Venom. */
                        this._venGai = VEN_GAI_CHO.map((v, g) => ({ dx: v[0], dy: v[1], goc: v[2],
                                                                    nham: v[3], t: -g * 6, moc: 0,
                                                                    lech: (Math.random()*2-1) * VEN_GAI_LECH }));
                        floatingTexts.push(new FloatingText(this.x - 22, this.y - 34, "GAI LƯNG")); }
                }
            },
            trungCan(o){
                // @@HE-VENOM-NOVA — moi don can chien TRUNG DICH de lai mot manh co the.
                // Dat o CHO KE DICH DUNG chu khong phai chan nguoi choi, vi gai se moc
                // len tu do. Chay ke ca khi dang trong chieu cuoi.
                if (this.id === 1 && typeof hasRune === 'function'
                    && hasRune('explshot') && typeof venNovaGiot === 'function')
                    venNovaGiot(o.x + (o.w || 20) / 2);
            }
        });
// PLAYER_PART_END s4.vkDangKy.15
