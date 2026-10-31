// PLAYER_FILE: KeyboardInput
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CAM_TROI, FloatingText, MIDAS_DAN, MIDAS_DENJIN, MIDAS_DENJIN_CD, MIDAS_DENJIN_CUA, MIDAS_DENJIN_GO, MIDAS_OVERHEAT, MIDAS_XA_GO, OCEAN_SURF, SFX, ST_LEN, apexActive, apexInputEvent, battuGo, battuMa, battuXacNhan, battuXoa, bienTuiKhi, boomNhayUlt, channelShieldLocked, combatStance, currentAmmoType, currentShieldType, dangCua, dangNhayMul, danteKey, danteOn, danteRelease, dashVx, defGoiQuan, defMode, dino, doDash, dragonBat, dtNhanPhim, floatingTexts, frames, gameOver, gameState, gameVictory, handleMoveTap, hasRune, keys, lanCuA, lanCuB, lanGhiPhimVua, lanKhach, lanUiHien, lanUiMoDong, lhBat, lhNhay, lhPhimIO, mapTheme, midasCong, midasCua, midasDam, midasDamDat, midasDamThuong, midasDamXa, midasFx, midasGhi, midasHado, midasHasho, midasKame, midasKhop, midasLuotDam, midasNhayDap, midasShoryu, midasThienTruy, previewDino, pvpDiem, pvpLuat, pvpSan, sanhApLuat, sanhChoUlt, sanhChuPhat, sdtGhiNhap, sgJump, sgOn, shakeTimer, shieldCdNguoiChoi, stBat, stLuotLen, startGame, trdBat, trdNhay, trdPhimIO, uniArmed, uniHopBat, unityFire, unitySwap, voidBat, voidTeleBatDau, vxThu, wkgKhien, wkgNhay, xAnPhim, xArmorKey, xArmorMenu, xBat, xNhaK
// index.html:90855 · Phạm vi: global
// PLAYER_PART_BEGIN s6.window.addEventListener.1 EDITABLE
window.addEventListener('keydown', e => { 
            if(xArmorMenu){xArmorKey(e);return;} 
            SFX.init(); SFX.resume();
            /* @@HE-BATTU — bang ma nuot TOAN BO ban phim khi dang mo. Phai dat o dau ham:
               phia duoi con cho bat 'KeyM' tat tieng va hang loat phim choi khac, go so ma lai
               bat nham nhung cai do thi bang ma thanh mot cai bay. */
            if (typeof battuMa !== 'undefined' && battuMa){
                if (e.key >= '0' && e.key <= '9') battuGo(e.key);
                else if (e.code === 'Backspace' || e.code === 'Delete') battuXoa();
                else if (e.code === 'Enter' || e.code === 'NumpadEnter') battuXacNhan();
                else if (e.code === 'Escape') battuMa = null;
                e.preventDefault(); return;
            }
            if(apexActive(dino)&&['KeyA','KeyD','KeyW','KeyS','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space','KeyJ','KeyK','KeyL','KeyU','KeyI','KeyO','KeyQ','KeyE','KeyR','KeyY','ShiftLeft','ShiftRight'].includes(e.code)){if(!e.repeat)apexInputEvent(e.code,true);keys[e.code]=true;e.preventDefault();return;}
            if (e.code === 'KeyM') { SFX.toggle(); }
            // @@HE-DEFENSE2 — goi quan: 1 CHAN | 2 BAN | 3 PTERO DO
            if (typeof defMode !== 'undefined' && defMode && !e.repeat){
                if (e.code === 'Digit1') defGoiQuan('chan');
                if (e.code === 'Digit2') defGoiQuan('ban');
                if (e.code === 'Digit3') defGoiQuan('do');
            }
            // NGUOI DA CHET VAN RA DON DUOC. Do duoc: P2 cam MIDAS, mau con 1, tich san
            // mot cu dam 200. P1 ban mot phat ha no — P2 ve 0 mau nhung cu dam VAN RA, P1
            // mat 100 mau va tran thanh HOA. Nguoi ra don truoc dang le phai thang.
            // Trong vong doi vai thi `dino` chinh la nguoi dang duoc xet, nen mot cong chan
            // o day lo duoc ca hai ben.
            if (gameState === 'pvp' && typeof dino !== 'undefined' && dino && dino.hp <= 0
                && ['KeyJ','KeyK','KeyL','KeyU','KeyY','ShiftLeft','ShiftRight'].indexOf(e.code) >= 0) return;
            if (danteKey(e.code, e.repeat)) { e.preventDefault(); return; }
            if (typeof xAnPhim === 'function' && xAnPhim(e.code, e.repeat)) return;
            // @@HE-MIDAS-MOVE — ghi nhip HUONG vao bo dem lenh (tuong doi voi huong mat)
            if (!e.repeat && typeof dino !== 'undefined' && dino && dino.ammoType === MIDAS_DAN
                && ['KeyA','KeyD','ArrowLeft','ArrowRight','KeyS','ArrowDown','KeyW','ArrowUp','Space'].indexOf(e.code) >= 0){
                if (e.code === 'KeyW' || e.code === 'ArrowUp' || e.code === 'Space') midasGhi(dino, 'len');
                else if (e.code === 'KeyS' || e.code === 'ArrowDown') midasGhi(dino, 'xuong');
                else {
                    let _d = (e.code === 'KeyA' || e.code === 'ArrowLeft') ? -1 : 1;
                    midasGhi(dino, _d === (dino.isFacingLeft ? -1 : 1) ? 'tien' : 'lui');
                }
            }
            // @@HE-MIDAS-MOVE — DENJIN CHARGE: go XUONG hai nhip lien tiep thi nap thang 5
            // vao thanh tich, hoi 3 giay. Day la duong tang sat thuong CHU DONG, khac han
            // noi tai von bat nguoi choi dung im an don moi co diem.
            if ((e.code === 'KeyS' || e.code === 'ArrowDown') && !e.repeat && typeof dino !== 'undefined'
                && dino && dino.ammoType === MIDAS_DAN
                && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp')){
                let _D = midasCua(dino);
                if (_D){
                    if ((frames - (_D.goXuong || -999)) <= MIDAS_DENJIN_GO && (_D.denjinCd || 0) <= 0){
                        _D.denjinCd = MIDAS_DENJIN_CD;
                        _D.goXuong = -999;
                        midasCong(dino, MIDAS_DENJIN, "DENJIN");
                        _D.denjinCua = MIDAS_DENJIN_CUA;     // @@HE-MIDAS-DENJIN: mo cua so 2 giay
                        midasFx(dino, 'denjin');
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880, 0.16, 'sawtooth', 0.22, 2200);
                    } else _D.goXuong = frames;
                }
            }
            if (e.code === 'KeyU' && e.repeat && typeof sgOn === 'function' && sgOn(dino)) return;
            if (e.code === 'KeyU' && typeof dino !== 'undefined' && dino && sanhChoUlt()){
                if (!(typeof vxThu === 'function' && !e.repeat && vxThu(dino))) dino.tryUltimate();   // @@HE-VANXA: S + U = van xa khan cap
            }
            if (e.code === 'KeyY' && typeof dino !== 'undefined' && dino && sanhChoUlt() && typeof uniHopBat === 'function'){
                if (!uniHopBat() && typeof SFX !== 'undefined' && SFX.tone) SFX.tone(150, 0.12, 'square', 0.16, 90);
            }
            // @@HE-MIDAS — dao phim: J xa, K tich. K khong lam gi luc bam (no duoc doc moi
            // khung trong midasTick); con J ra don ngay va chan het duong ban thuong.
            // @@HE-MIDAS-MOVE — ghi lai luc BAT DAU giu K de phan biet CHAM voi GIU.
            if (e.code === 'KeyK' && !e.repeat && typeof dino !== 'undefined' && dino
                && dino.ammoType === MIDAS_DAN){
                let _K = midasCua(dino); if (_K) _K.kT = frames;
            }
            if (e.code === 'KeyJ' && !e.repeat && typeof dino !== 'undefined' && dino
                && dino.ammoType === MIDAS_DAN
                && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp')){
                // Xet LENH truoc. Thu tu quan trong: lenh DAI xet truoc lenh NGAN — neu khong
                // thi "Len Len Xuong Dam" se bi "Xuong Dam" tren khong nuot mat, vi hai lenh
                // deu ket thuc bang Xuong + J va deu xay ra khi dang o tren khong.
                if (!dino.grounded){
                    if (midasKhop(dino, ['len','len','xuong'])){ midasGhi(dino,'J'); if (midasNhayDap(dino))  return; }
                    if (midasKhop(dino, ['xuong']))            { midasGhi(dino,'J'); if (midasThienTruy(dino)) return; }
                }
                // Dang LUOT ma bam J -> don mo man voi xa
                if (Math.abs(dashVx) > 0.1){ midasGhi(dino,'J'); if (midasLuotDam(dino)) return; }
                if      (midasKhop(dino, ['lui','xuong','tien'])){ midasGhi(dino,'J'); if (midasKame(dino)) return; }
                else if (midasKhop(dino, ['lui','tien']))  { midasGhi(dino,'J'); if (midasHado(dino))  return; }
                else if (midasKhop(dino, ['xuong','tien'])){ midasGhi(dino,'J'); if (midasHasho(dino)) return; }
                else if (midasKhop(dino, ['J','tien']))    { midasGhi(dino,'J'); if (midasDamXa(dino)) return; }
                if (dino.grounded && (keys['KeyS'] || keys['ArrowDown'])){ midasGhi(dino, 'J'); if (midasDamDat(dino)) return; }
                midasGhi(dino, 'J');
                dino.clawRiseWindow = 38;      // mo cua so bam NHAY -> SHORYUKEN
                // J gio LUON la dam thuong; cu dam manh da chuyen sang NHA phim K.
                midasDamThuong(dino);
                return;
            }
            if ((e.code === 'KeyJ' || e.code === 'KeyK') && !e.repeat && uniArmed > 0 &&
                (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss'
                 || gameState === 'pvp')) unityFire();
            if ((e.code === 'KeyQ' || e.code === 'KeyE') && !e.repeat &&
                (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss'
                 || gameState === 'pvp')) unitySwap(e.code === 'KeyE' ? 1 : -1);
            // PHIM RONG: I hay O deu duoc. Du dieu kien len SHIN thi ca hai deu di thang
            // len SDT; chua du thi ca hai cung bat DRAGON TRIGGER thuong.
            if ((e.code === 'KeyI' || e.code === 'KeyO') && typeof lhBat === 'function' && lhBat() && !e.repeat
                && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')){ lhPhimIO(); return; }   // @@HE-LUOIHAI: DEATH
            if ((e.code === 'KeyI' || e.code === 'KeyO') && typeof trdBat === 'function' && trdBat() && !e.repeat
                && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')){ trdPhimIO(e.code); return; }   // @@HE-TRIDENT: MUSOU
            if ((e.code === 'KeyI' || e.code === 'KeyO') && typeof dragonBat === 'function' && dragonBat()
                && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')){ dtNhanPhim(); return; }
            // Trong PvP truoc day khong doi the duoc: cong nay khong ke 'pvp', ma I/O la
            // cach duy nhat de doi the giua tran. Ai vao voi the nao la ket cung the do
            // ca van — dung canh "bi khoa o Trickster". Nguoi choi 2 cung goi duoc dong
            // nay vi phim cua no duoc phat lai trong lanVoiP2, luc do `combatStance` da
            // duoc trao thanh the rieng cua no.
            if ((e.code === 'KeyI' || e.code === 'KeyO') && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss') && !e.repeat) {
                combatStance = (combatStance + (e.code === 'KeyI' ? 1 : 2)) % 3;
                if (gameState !== 'pvp') localStorage.setItem("dino_stance", combatStance);
                if (typeof dino !== 'undefined' && dino) { dino.chargeProgress = 0; dino.aKeyHeldTime = 0; }
                shakeTimer = Math.max(shakeTimer, 6); if (typeof SFX !== 'undefined') SFX.tone && SFX.tone(480 + combatStance * 140, 0.08, 'square', 0.16, 700);
            }
            if (['Space', 'Enter'].includes(e.code) && gameState === 'pvp_end') {
                if (lanKhach()) return;                       // tran dau van do chu phong dieu khien
                if (pvpDiem[0] >= pvpLuat.hiep || pvpDiem[1] >= pvpLuat.hiep){
                    pvpSan = [false, false];                  // vao lai sanh, hai ben bam san sang lai
                    gameState = 'pvp_setup'; sanhChuPhat();
                } else {
                    lanCuA = {}; lanCuB = {}; startGame('pvp'); sanhApLuat();
                }
                return;
            }
            if (['Space', 'Enter'].includes(e.code) && (gameOver || gameVictory)) {
                gameState = 'menu'; gameOver = false; gameVictory = false; SFX.stopMusic();
                return;
            }
            // @@HE-SDT: ghi chuoi LEN/XUONG de bat ↓↓ (dam dat) va ↑↑↓ (vot len - dap xuong)
            if (!e.repeat && typeof sdtGhiNhap === 'function'){
                if (e.code === 'KeyW' || e.code === 'ArrowUp' || e.code === 'Space') sdtGhiNhap('L');
                else if (e.code === 'KeyS' || e.code === 'ArrowDown') sdtGhiNhap('X');
            }
            if (['Space', 'KeyW', 'KeyS', 'KeyJ', 'KeyK', 'KeyL', 'KeyA', 'KeyD', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
            // Man ghep phong co o nhap that. Neu khong chan thi go ma vao do se
            // dong thoi lam nhan vat nhay/ban lung tung o duoi.
            if (lanUiHien){ if (e.code === 'Escape') lanUiMoDong(false); return; }
            keys[e.code] = true;
            if(apexActive(dino)){e.preventDefault();return;}
            // MAY KHACH chi la mot cai tay cam: phim duoc ghi lai roi gui sang may
            // chu, con moi phan ung deu do may chu quyet. Neu de doan duoi chay tiep
            // thi ngay tai may khach se no ra hieu ung luot/nhay cua RIENG no — thu
            // ma may chu khong he biet — nhap nhay roi bi anh chup xoa di ngay khung sau.
            if (typeof lanKhach === 'function' && lanKhach() && gameState === 'pvp' && !e._may){ lanGhiPhimVua(e.code); return; }
            
            // XE TANG: khong nhay, khong luot — doi lai co 10 giap.
            // TAM LUAN: VAN nhay hai bac binh thuong, chi bi giat nguoc moi cu nhay.
            // Bo them cai mat nhay doi thi cam vao nang ne qua so voi thu nhan lai duoc.
            if (['Space', 'KeyW'].includes(e.code) && dino && hasRune('trienlien') && currentAmmoType === 2){
                dashVx += (dino.isFacingLeft ? 1 : -1) * 9;                 // giat nguoc
            }
            if ((e.code === 'KeyS' || e.code === 'ArrowDown') && dino && !e.repeat && dino.grounded && !dino.tank) dino._cuiTu = frames;
            if (['Space', 'KeyW'].includes(e.code) && !(dino && dino.tank)) {
                if ((gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp') && dino.webTimer <= 0) {
                    if (typeof sgJump === 'function' && sgOn(dino) && (e.repeat || sgJump(dino))) { }
                    else if (mapTheme === 'ocean' && (dino.y + dino.h) > OCEAN_SURF + 4 && !(typeof bienTuiKhi === 'function' && bienTuiKhi())) {   // BOI: dap nuoc len; gan mat nuoc thi bat cao de dap len la beo
                        let _near = (dino.y + dino.h) - OCEAN_SURF < 70;
                        dino.dy = (hasRune('hyperspeed') ? 1.5 : 1) * (_near ? -11.5 : -6.4); dino.grounded = false; dino.canDoubleJump = true; dino.jumpCount = 1; SFX.jump();
                    }
                    // @@HE-LUOIHAI: J roi NHAY trong cua so combo = CHEM HAT LEN (khong nhay)
                    else if (typeof lhNhay === 'function' && lhNhay()) { }
                    // RYUENJIN: dang o duoi dat, vua chem xong trong 0.5s -> bam NHAY thanh cu chem hat len
                    else if (currentAmmoType === 10 && dino.grounded && (dino.clawRiseWindow || 0) > 0 && !dino.ultActive) { dino.giaoHat(); }
                    // @@HE-VENOM: dang co vung dich ma NHAY len -> troi, nhac, dap xuong
                    /* @@HE-VENOM — NHAY co ba nghia, xet theo thu tu:
                       1. dang co vung dich  -> troi, nhac, dap xuong
                       2. vua quat xong      -> CHEM HAT (day la "J len" trong ban thiet ke;
                          khong the dat vao phim W vi W chinh la phim nhay)
                       3. con lai            -> nhay binh thuong */
                    else if (currentAmmoType === 13 && dino.grounded && (dino.clawRiseWindow || 0) > 0
                             && !dino.isOverheated && dino.ammo > 0 && dino.venChemHat){ dino.venChemHat(); }
                    // @@HE-MIDAS-MOVE — SHORYUKEN: vua dam xong, bam NHAY trong cua so.
                    else if (dino.ammoType === MIDAS_DAN && dino.grounded && (dino.clawRiseWindow || 0) > 0
                             && !dino.ultActive && midasShoryu(dino)) { /* da ra don */ }
                    else if (currentAmmoType === 5 && dino.grounded && (dino.clawRiseWindow || 0) > 0 && !dino.isOverheated && dino.ammo > 0 && !dino.ultActive) { dino.ryuenjin(); }
                    // ===== BOOMERANG ULT: NHAY de treo len luoi lon / NHAY tiep de cam luoi xuong =====
                    else if (dino.ultActive && dino.ultAmmo === 7 && dino.boomUltRide) boomNhayUlt();   // @@VK-BOOMERANG
                    // @@HE-WUKONG — LAP CON: nhay la cam gay xuong dat roi dung len ngon.
                    else if (typeof wkgNhay === 'function' && wkgNhay()) { /* da nuot cu nhay */ }
                    else if (typeof trdNhay === 'function' && trdNhay()) { /* @@HE-TRIDENT3: song dang cao */ }
                    // @@HE-POWER VOID: nhay cung la DICH CHUYEN — chop thang len, khong bay
                    // CHI cu nhay DAU TIEN tu mat dat la dich chuyen. Len khong roi thi nhay
                    // binh thuong, khong thi chuoi chop lien tuc trong rat can.
                    else if (typeof voidBat === 'function' && voidBat() && dino.grounded) {
                        let _len = 150 * (hasRune('hyperspeed') ? 1.4 : 1);
                        voidTeleBatDau(dino.x, Math.max(-CAM_TROI + 10, dino.y - _len));
                        dino.grounded = false; dino.canDoubleJump = true; dino.jumpCount = 1;
                        dino.hoverArmed = true;
                    }
                    else if (dino.grounded) { let _may = typeof dangCua === 'function' && dangCua(dino) === 4; let _da = (frames - (dino._cuiTu || -999)) < 30; dino.dy = dino.jumpPower * (hasRune('hyperspeed') ? 1.5 : 1) * (_may ? 1.4 : 1) * (_da ? 1.22 : 1) * dangNhayMul(dino); dino.grounded = false; dino.canDoubleJump = !_may; dino.jumpCount = 1; dino.mayBay = 0; dino.bodySlamArmed = false; dino.bodySlamActive = false; dino.bodySlamJumpCount = 0; dino.hoverArmed = true; if (_da && dino.dy < 0) floatingTexts.push(new FloatingText(dino.x, dino.y - 28, "LẤY ĐÀ!")); SFX.jump(); }
                    else if (dino.hoverTimer > 0) { dino.hoverTimer = 0; dino.hoverArmed = false; dino.dy = dino.jumpPower * 0.85 * dangNhayMul(dino); dino.canDoubleJump = false; SFX.jump(); }
                    else if (currentAmmoType === 13 && !dino.grounded && !dino._venDuDung && !dino.canDoubleJump && dino.venDu) { dino.venDu(); }
                    else if (typeof dangCua === 'function' && dangCua(dino) === 4 && (dino.jumpCount || 0) === 1 && !(dino.mayBay > 0)) { dino.mayBay = 120; dino.dy = 0; dino.canDoubleJump = false; dino.jumpCount = 2; SFX.jump(); }
                    else if (typeof dangCua === 'function' && dangCua(dino) === 4) { }
                    else if (dino.canDoubleJump || (hasRune('triplejump') && dino.jumpCount < 3)) { dino.dy = stBat() ? ST_LEN : (dino.jumpPower * (hasRune('hyperspeed') ? 1.5 : 1) * 0.85); if (stBat()) stLuotLen(); dino.canDoubleJump = false; dino.jumpCount = (dino.jumpCount || 1) + 1; dino.hoverArmed = false; SFX.jump(); }
                } else if (gameState === 'custom_menu') {
                    if (previewDino.grounded) { previewDino.dy = dino.jumpPower; previewDino.grounded = false; }
                }
            }
            if (['KeyA', 'ArrowLeft'].includes(e.code)) {
                if ((gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp') && !e.repeat && !e.fromStick) handleMoveTap(-1);
            }
            if (['KeyD', 'ArrowRight'].includes(e.code)) {
                if ((gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp') && !e.repeat && !e.fromStick) handleMoveTap(1);
            }
            if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && !e.repeat) doDash();
            if (e.code === 'KeyL') {
                if (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp') {
                    if (typeof wkgKhien === 'function' && wkgKhien()) { /* @@HE-WUKONG: khien thanh XOAY CON */ }
                    else if (!channelShieldLocked(dino) && currentShieldType === 0 && dino.shieldCd <= 0 && dino.meleeTimer <= 0 && (hasRune('chanshld') || hasRune('chanshldx') || (!dino.clawChannel && !dino.rapidChannel && !dino.pulseLaserChannel && !dino.fireChannel && !dino.lightChannel && !dino.splitChannel && !dino.pulsarChannel && !dino.cusCh))) { dino.meleeTimer = (combatStance === 2) ? 45 : 30; dino.shieldCd = shieldCdNguoiChoi(); dino.meleeID++; }
                } else if (gameState === 'custom_menu') {
                    if (previewDino.shieldTimer <= 0) { previewDino.shieldTimer = 30; }
                }
            }
        });
// PLAYER_PART_END s6.window.addEventListener.1

// index.html:91076 · Phạm vi: global
// PLAYER_PART_BEGIN s6.window.addEventListener.2 EDITABLE
window.addEventListener('keyup', e => {
            if(xArmorMenu){keys[e.code]=false;e.preventDefault();return;}
            if (lanUiHien) return;
            if(apexActive(dino)){apexInputEvent(e.code,false);keys[e.code]=false;return;}
            if(e.code==='KeyK' && danteOn())danteRelease();
            if (e.code === 'KeyK' && typeof xNhaK === 'function' && typeof xBat === 'function' && xBat()) xNhaK();
            // @@HE-MIDAS-MOVE — NHA K LA DAM GIAI PHONG. Giu K van la tich nhu cu; buong tay
            // ra thi tung cu dam manh roi Overheat. Truoc day cu dam manh nam chung phim J
            // voi dam thuong, nen khong the vua giu don vua ra don nhe.
            if (e.code === 'KeyK' && typeof dino !== 'undefined' && dino
                && dino.ammoType === MIDAS_DAN && !dino.ultActive && dino.hp > 0
                && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp')){
                /* CHAM K la XA, GIU K roi nha thi KHONG xa — giu nguyen thanh tich.
                   Neu nha tay lan nao cung tung don thi khong the ngung tich giua chung de
                   di lai hay ne, ma MIDAS lai la loai phai tich lau. */
                let _M = midasCua(dino);
                if (_M && (frames - (_M.kT || -999)) <= MIDAS_XA_GO
                    && _M.dmg >= 1 && midasDam(dino, 1) !== false){
                    dino.isOverheated = true; dino.overheatTimer = MIDAS_OVERHEAT;
                }
            }
            keys[e.code] = false;
        });
// PLAYER_PART_END s6.window.addEventListener.2
