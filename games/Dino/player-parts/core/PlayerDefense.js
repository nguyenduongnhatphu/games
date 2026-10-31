// PLAYER_FILE: PlayerDefense
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DANG_XUONG, Effect, FloatingText, MIDAS_DAN, SFX, battuBat, battuDem, battuNhay, currentAmmoType, cusChAnDon, cusKvKhien, cusVoiNg, danCuaNg, dangCua, dangVayChan, deathCineActive, deathCineFrame, deathReviveLevel, deathSkel, dino, dtCongNo, floatingTexts, frames, gameOver, gameState, hasRune, kinhAnDon, lhCongNo, midasAnDon, midasVang, noDamageTaken, noDmgStreak, p2AmmoType, parry, sgRobotAbsorb, shakeTimer, shieldCharge, smBlades, stylePoints, tdNeTrung, tlBat, ultCharge, visualEffects, vkMoc, wkgBat, wkgHao, wkgSpin, xBat, xChoi
// index.html:47418 · Phạm vi: Player
class __Part0 {
// PLAYER_PART_BEGIN s3.Player.isShielding.1 EDITABLE
isShielding() {
                // TAM LUAN: khien tay bi khoa o MOI THE — khong thi Gunslinger chiu thiet
                // mot minh trong khi hai the kia van dung duoc.
                if (typeof tlBat === 'function' && tlBat() && this.id === 1) return false;
                if (this.meleeTimer > 0 || (this.dashShieldTimer||0) > 0) return true;
                if (typeof smBlades !== 'undefined') { for (let bl of smBlades) if (bl.owner === this && bl.t > 0) return true; }
                // XOAY CON (khien cua Nhu Y Kim Co Bong): banh xe gay quay kin 360 do. Truoc day no chi xoa DAN
                // trong ban kinh, con moi don CAN CHIEN / song dat / cot troi tu duoi len cua boss van hoi
                // isShielding() -> false nen xuyen thang qua. Dang xoay thi do duoc moi huong.
                if (this.id === 1 && typeof wkgSpin !== 'undefined' && wkgSpin && typeof wkgBat === 'function' && wkgBat()) return true;
                return false;
            }
// PLAYER_PART_END s3.Player.isShielding.1
}

// index.html:47875 · Phạm vi: Player
class __Part1 {
// PLAYER_PART_BEGIN s3.Player.endUlt.1 EDITABLE
endUlt() {
                { let _vkE = vkMoc(this.ultAmmo, 'hetUlt'); if (_vkE) _vkE.call(this); }   // @@KHOI-VK
                this.ultActive = false; this.ultAmmo = -1; this.ultBeam = null; this.ultBeamRect = null; this.ultLightTargets = null; this.ultBolts = []; ultCharge = 0;
                if (this.boomUltRide) { this.boomUltRide.mounted = false; this.boomUltRide.state = 'slam'; this.boomUltRide.slamT = 0; }
                this.boomUltRide = null; this.boomUltLeft = 0; this.boomUltSmall = 0;
            }
// PLAYER_PART_END s3.Player.endUlt.1
}

// index.html:48591 · Phạm vi: Player
class __Part2 {
// PLAYER_PART_BEGIN s3.Player.takeDamage.1 EDITABLE
takeDamage(amount = 1) {
                this._giaoDong = 0; this._giaoDongT = 0;   // an don la DUT dong chay combo
                if (this.id === 1 && typeof dtCongNo === 'function') dtCongNo(18);   // an don thi NO day nhanh
                if (this.id === 1 && typeof lhCongNo === 'function') lhCongNo(18);   // @@HE-LUOIHAI
                { let _vkD = vkMoc((typeof danCuaNg === 'function') ? danCuaNg(this) : currentAmmoType, 'anDon'); if (_vkD && _vkD.call(this)) return; }   // @@HE-P2KHOA: dan cua NGUOI AN DON   // @@KHOI-VK — vu khi chan / phan ung khi AN DON (Bua: parry)
                /* @@HE-BATTU — rune BẤT TỬ (dung de XEM don cua boss, khong phai de choi).
                   Dat chan o DAY chu khong o cho tru mau, va co y DE CHO don van "trung":
                   Hans can biet don nao cham vao minh va cham bao nhieu lan, nen viec can lam
                   khong phai la lam don truot ma la DEM no roi hoan lai mau. Moi lan cham van
                   hien mot nhan MIỄN va tang bo dem tren HUD.
                   Dat TRUOC `this.invincible` vi i-frame se nuot mat nhung lan cham lien tiep —
                   dung cai ma nguoi xem can thay o nhung don danh nhieu nhip nhu Dap hay Combo 5. */
                if (this.id === 1 && typeof battuBat === 'function' && battuBat()){
                    battuDem++;
                    battuNhay = 12;
                    floatingTexts.push(new FloatingText(this.x - 10, this.y - 30, "MIỄN"));
                    visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'parry'));
                    return;
                }
                if (this.invincible){ if (this.id === 1 && typeof tdNeTrung === 'function') tdNeTrung(this); return; }   // @@HE-TUDIA2
                if (this.id === 1 && typeof xBat === 'function' && xBat() && typeof xChoi !== 'undefined' && xChoi && xChoi.giap === 'ultimate') return;
                if (this.id === 1 && typeof xBat === 'function' && xBat() && typeof xChoi !== 'undefined' && xChoi && xChoi.giap === 'gaea' && amount > 1) amount = Math.max(1, Math.round(amount * 0.5));
                if (typeof sgRobotAbsorb === 'function' && sgRobotAbsorb(this,amount)) return;
                if (dangVayChan(this)) return;   // @@HE-DANG: BEYOND — vay chan tron mot don: don trung luc dang ne (khung bat tu) = ne hoan hao
                /* @@HE-CUSKV — du 6 thanh kiem tren lung thi ket khien chan tron don.
                   @@HE-KVCHAN — Hans: "Kiem vu co that su chan duoc don lao toi cua Boss khong? ...
                   No luon UU TIEN chan truoc cac loai khac. Va khi chan ke dich cho nhan 1 chut dmg (4)".
                   Truoc day kiem thuan dung SAU giap xe tang / khien pet / khien Channel / la chan rune,
                   nen may lop do nuot don truoc. Gio no dung NGAY sau i-frame, truoc moi lop khac. */
                if ((this.id === 1 || gameState === 'pvp') && typeof cusKvKhien === 'function' && cusVoiNg(this, () => cusKvKhien(this))) return;   // @@HE-PVPCUS
                /* @@HE-DSAW — QUY CUA: mau VAN mat (de con co cai ma tra lai), nhung khong bao
                   gio xuong duoi 1. Hans khong noi ro chet duoc hay khong; toi chon khong,
                   vi voi 5 mau goc thi mot don chi mang trong 10 giay lao vao la rat de, va
                   khi do "tra lai toan bo mau da mat" se khong bao gio co dip xay ra. */
                /* @@HE-DSAW — MUA CUA: an don la NGAT, dung luat Channel cua ca game (Qua
                   Nhiet, Bom Nguyen Tu cung vay). Day la cai gia duy nhat cua Channel nay
                   sau khi Hans bo viec tat may giua chung. */
                if (this.dsawMua){
                    this.dsawMua = 0; this._dsawMuaDa = 0; this._dsawMuaKhoa = 1;
                    floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, "NGẮT!"));
                }
                if (this.dsawQuy){
                    let _mat = Math.min(amount, Math.max(0, this.hp - 1));
                    if (_mat <= 0){
                        this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 30);
                        visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'parry'));
                        return;
                    }
                    amount = _mat;
                }
                // TAM LUAN: trung don la dut mach ban, giong bi ngat Channel
                if (hasRune('trienlien') && (this.id === 1 ? currentAmmoType : p2AmmoType) === 2){
                    this.rfNgat = 45; this.rfChuoi = 0; this.rfNhiet = 0;
                    floatingTexts.push(new FloatingText(this.x - 24, this.y - 30, "ĐỨT MẠCH!"));
                }
                // XE TANG: giap an don thay nguoi choi. Het giap thi xe NO va nguoi choi an 1 dmg.
                if (this.tank && this.tank.giap > 0){
                    /* PHAN VUOT QUA GIAP PHAI DI TIEP VAO MAU (chi o PvP).
                       Truoc day nhanh nay `return` vo dieu kien, nghia la giap nuot TRON mot
                       don du don do lon co nao. Do duoc: MIDAS tich 300 dam vao nguoi dang
                       ngoi xe tang thi doi thu mat dung 1 mau — 299 con lai bien mat. Voi mot
                       vu khi ma ca loi choi la don mot cu that nang thi do la xoa so.
                       O PvE giu nguyen: quai va boss danh lien tuc, cho tran qua thi xe tang
                       khong con la xe tang nua. */
                    let _du = (gameState === 'pvp') ? Math.max(0, amount - this.tank.giap) : 0;
                    this.tank.giap -= amount;
                    // I-FRAME sau moi lan tru giap. Thieu cai nay thi va cham lien tuc (xuong
                    // rong, than boss) tru mot diem MOI KHUNG — 10 giap bay trong 10 khung.
                    this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 60);
                    visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'parry', false));
                    shakeTimer = Math.max(shakeTimer, 14);
                    floatingTexts.push(new FloatingText(this.x - 16, this.y - 26, "GIÁP " + Math.max(0, this.tank.giap)));
                    if (this.tank.giap <= 0) this.rfNoTank();
                    if (_du <= 0) return;
                    amount = _du;          // di tiep xuong duong tru mau binh thuong
                }
                if (this.petShieldTimer > 0) { visualEffects.push(new Effect(this.x + (this.isFacingLeft ? 0 : this.w), this.y + 12, 'parry')); if (typeof SFX !== 'undefined' && SFX.parry) SFX.parry(); return; }
                // KHIEN KHI CHANNEL C2: 2 giay dau cua channel mien sat thuong -> khong the bi ngat
                if (this.chanInvul > 0) { visualEffects.push(new Effect(this.x + this.w/2, this.y + 12, 'parry')); if (typeof SFX !== 'undefined' && SFX.parry) SFX.parry(); return; }
                // RUNE la chan (tai tao / khoi dau / ho than): hap thu tron 1 don bat ke lon nho
                if ((this.runeShield || 0) > 0) {
                    this.runeShield--; this.invincible = true; this.invTimer = 60;
                    visualEffects.push(new Effect(this.x + this.w, this.y, 'parry'));
                    floatingTexts.push(new FloatingText(this.x, this.y - 20, "LÁ CHẮN!")); shakeTimer = 10; return;
                }
                // RAPIDFIRE: bi ngat channel thi KHONG mat so dan da tich — xa het ra thanh loat burst

                // TU LUC Claws: trung don thi NHA DON NGAY o moc dang co, roi VE TRANG THAI THUONG.
                // Phai xoa aKeyHeldTime, neu khong thi con giu K la frame sau tu vao lai channel day muc.
                if (this.clawChannel) {
                    this.launchClawSwords(false);   // bi danh -> ban het, KHONG giu kiem ve
                    this.clawChannel = false; this.clawChannelHits = 0;
                    this.aKeyHeldTime = 0; this.chargeProgress = 0; this.attackCooldown = 20;
                }
                if (this.cryoChannel || this.clawChannel || this.rapidChannel || this.pulseLaserChannel || this.fireChannel || this.lightChannel || this.splitChannel || this.pulsarChannel || this.boomChannel) this.ngatMoiChannel();
                /* @@HE-CANPVP — KHUNG MIEN THUONG NGAN HON TRONG PVP.
                   80 khung = 1,33 giay bat tu sau moi lan trung don. Con so do tinh cho
                   PvE, de khong bi bay quai vay chet. Do vao PvP thi no bop chet toan bo
                   thiet ke sat thuong: MOI don, du la mot cu cham nhe hay mot chieu charge
                   3 giay ban ra 10 manh, deu chi an dung MOT nhip. Do duoc: ca 12 loai dan
                   x 4 kieu ra don deu ra "(1h)". Vi vay don nao manh cung chi con 1-2 dmg,
                   con don yeu ma trung mot phat sach thi lai bang duoc chung — dung nhu
                   "don manh chi gay 1 dmg, don khong manh lai gay nhieu".
                   Trong PvP rut xuong con du de mot chieu nhieu doan an duoc vai nhip,
                   nhung van chan duoc kieu ap sat bam lien tuc. */
                /* @@HE-CUANHIP — TRONG PVP DUNG HAN MUC NHIP, KHONG DUNG BAT TU CUNG.
                   Bat tu cung sau moi lan trung don co mot hau qua tinh vi: don nao ban
                   ra NHIEU manh cung chi an duoc dung MOT nhip, nen chieu cang dat cang
                   thiet. Do tung moc giu phim moi thay: cua Cryo, moc 20 khung (khoi bang)
                   an 3 dmg, con moc 50 khung (khoi GAI, ban ra ca chum manh) cung chi 3 —
                   bo cong charge gap hai ma khong hon gi. Kiem, Giao, Bua, Whisper deu co
                   cho nghich tuong tu.
                   Doi thanh: trong moi cua so dai bang NHIP cua vu khi dang danh, muc tieu
                   an duoc toi da PVP_CUA nhip. Chieu mot phat van la mot phat, con chieu
                   ban chum thi an duoc may nhip — dung nhu no duoc thiet ke. Spam van bi
                   chan vi het han muc la thoi.                                          */
                if (gameState === 'pvp'){
                    /* @@HE-KHONGMIEN — TRONG PVP KHONG CO BAT TU SAU KHI TRUNG DON.
                       Truoc day toi dung mot he "nhip": trung don xong thi bat tu mot khoang,
                       do dai rieng theo tung vu khi. No de lai hai di chung nang.
                       Mot: no chia vu khi thanh hai giong choi hai luat khac nhau — loai
                       danh mot nhip nang (Volt, Whisper) hau nhu khong bi siet, con loai
                       danh day nhip nhe (Rapidfire, Inferno) bi siet gap bay tam lan, ma
                       toi lai can bang ca hai bang cung mot bo so.
                       Hai: chong len tran 1/3, tran chieu cuoi, luat chum, luat loat — nam
                       he cung tac dong vao mot con so, doi mot cho thi khong doan noi cai gi
                       chay di dau.
                       Gio bo han. Bat tu trong PvP CHI den tu khien va tu cu luot. Can bang
                       chuyen ve mot num duy nhat la he so, va bu lai bang cach nang mau toi
                       da len (100-1000) de sung ban day khong xoa so nguoi choi trong mot
                       nhip may.                                                            */
                    cusVoiNg(this, () => cusChAnDon(this));          // @@HE-CUSCH — an don THAT SU moi ngat Channel (@@HE-PVPCUS: dung trang thai cua CHINH nguoi an don)
                    if (typeof wkgHao !== 'undefined' && this.id === 1) wkgHao = 0;   // @@HE-WUKONG
                    let _t0 = this.hp; this._lanAnDon = frames;   // @@HE-TUDIA
                    this.hp -= amount;
                    if (typeof midasAnDon === 'function') midasAnDon(this, _t0 - this.hp);
                    if (this.hp <= 0 && _t0 >= this.maxHp * 0.999 && typeof midasVang === 'function'
                        && typeof dino !== 'undefined' && dino && dino !== this && dino.ammoType === MIDAS_DAN)
                        midasVang(this, dino);
                    shakeTimer = 15;
                } else {
                    cusVoiNg(this, () => cusChAnDon(this));          // @@HE-CUSCH / @@HE-PVPCUS
                    if (typeof wkgHao !== 'undefined' && this.id === 1) wkgHao = 0;   // @@HE-WUKONG
                    if (this.id === 1 && typeof kinhAnDon === 'function'){ let _kr = kinhAnDon(this, amount); if (_kr <= 0) return; amount = _kr; }   // THUY TINH: mau ao hap thu truoc, khong tinh la mat mau
                    let _mT = this.hp; this._lanAnDon = frames;   // @@HE-TUDIA
                    this.hp -= amount; this.invincible = true; this.invTimer = 80;
                    midasAnDon(this, _mT - this.hp);            // @@HE-MIDAS (PvE: 1 mau = +10)
                }
                shakeTimer = 15;
                noDamageTaken = false; noDmgStreak = 0; stylePoints *= 0.45; 
                shieldCharge = Math.max(0, shieldCharge - 300);   // trung don LUI 5 giay tien do la chan, khong xoa sach
                this.xuLyChet();
            }
// PLAYER_PART_END s3.Player.takeDamage.1
}

// index.html:48747 · Phạm vi: Player
class __Part3 {
// PLAYER_PART_BEGIN s3.Player.xuLyChet.1 EDITABLE
xuLyChet(){
                if (this.hp <= 0 && gameState !== 'pvp') {
                    if (this.id === 1 && !deathCineActive) {
                        this.hp = 0; deathCineActive = true; deathCineFrame = 0; this.invincible = true; this.invTimer = 99999;
                        this.clawUltState = null; this.jcState = null;
                        // Muc 3 = CHI MANG C2: song lai voi DUNG 1 MAU — chinh la trang thai rune nay
                        // manh nhat (100% chi mang). Rune 2 o chiem ca hai o nen khong the deo chung
                        // Hoi Sinh, khong co chuyen hai lan hoi sinh chong nhau.
                        deathReviveLevel = this.usedRevive ? 0 : (hasRune('revivex') ? 2 : (hasRune('revive') ? 1 : (hasRune('critstrikex') ? 3 : 0)));
                        // BO XUONG: hoi sinh SAU CUNG — chi khi khong con rune hoi sinh nao (deathReviveLevel === 0) va chua dung lan nao
                        deathSkel = (this.id === 1 && dangCua(this) === DANG_XUONG && !this.xuongDung && deathReviveLevel === 0) ? { born: frames } : null;
                        if (typeof SFX !== 'undefined') { SFX.stopMusic && SFX.stopMusic(); SFX.tone && SFX.tone(80, 0.7, 'sine', 0.35, 150); }
                    } else if (this.id !== 1) { gameOver = true; }
                }
            }
// PLAYER_PART_END s3.Player.xuLyChet.1
}
