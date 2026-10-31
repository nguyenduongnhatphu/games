// PLAYER_FILE: EngineHooks
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CUS_DAN, DANG_NOR_LUOT, DANG_XUONG, DANG_XUONG_LUOT, Effect, FloatingText, MAP_CHUOI, MIDAS_DAN, MIDAS_PARRY, MIDAS_PARRY_HH, OCEAN_SURF, PARRY_MIN_BLOCK, PARRY_MIN_PERFECT, PARRY_PCT_BLOCK, PARRY_PCT_PERFECT, PARRY_RG_BONUS, PARRY_ULT_BLOCK, PARRY_ULT_PERFECT, Player, SFX, SM_CLONE_LIFE, ST_NHIP, _bucCache, activeLightnings, addStyle, aegisShieldDmg, afterimages, aiBat, aiBatP1, aiDoKho, aiReset, allTargets, baseSpeed, battuDem, battuNhay, bienChon, bienDT, bienKhoiTao, birdBank, birdDmgAcc, birdSpendCd, boomerangs, bossContactAttack, bossLevel, bossProjectiles, bossRushStage, bossWaitTimer, bosses, camReset, camX, canvas, checkAABB, clNhanTat, cloneGauntlet, combatStance, critStack, currentAmmoType, currentForm, cusAcDs, cusAcNo, cusAcPhan, cusCapCua, cusCgDan, cusDanBuoc, cusGb, cusKhoan, cusKvReset, cusMt, cusMtTen, cusNkPhim, cusNkTat, cusNkTatSo, cusNoBom, cusNoCd, cusNoDat, cusNoLon, cusNuke, cusPtChay, cusPtDan, cusQN, cusRgBat, cusRgDan, cusRgKBat, cusRgLuotBat, cusRgSet, cusStand, cusTLNo, cusTTCd, cusTTHom, cusTTNo, cusTTTruc, cusTanChay, cusTl, cusToaHen, cusToaHenDat, cusToaTia, cusToaVong, cusUfo, cusUfoBat, cusUfoHoiCd, cusUzA, cusUzDan, cusUzu, damageBossFromAmmo, damageBossWithFirstStrike, damagePrismBossWithRunes, danteGuardContact, dantePerfectGuard, danteRoyalShield, danteStyleState, dashCd, dashVx, deathCineActive, deathCineFrame, deathReviveLevel, defMode, defUnits, dino, dino2, dkNenY, doChieuDong, doVoVatBoss, dodgeCd, dojoMode, dragReset, dswCancel, duelMode, duelOver, duelWinner, enemies, fireBrands, flashKind, floatingTexts, forestBossQueue, forestNextChunk, forestQueueInit, forestScene, frames, freeMove, gaeChop, gaeTro, gameOver, gameSpeed, gameState, gameVictory, gauntletGate, grassField, grazeFlashTimer, grazeX, grazeY, handleEnemyDeath, hasRune, hearts, hitstopTimer, ironSilverEnd, keys, khienLuotHit, khienManh, kimCoAnh, kimCoDe, lanMang, lanRieng2, laserBlockFlag, laserEngaged, laserFireTimer, lastMoveTapDir, lastMoveTapTime, lavaFlood, lavaGeysers, lh, lhLuot, lhReset, luotMien, mapChay, mapNen, mapTheme, mayDanhDauLuot, midasCong, midasHado, midasHadoNo, midasHakiCham, mortarBuoc, nextBossScore, noDamageTaken, noDmgStreak, noPhanHach, normalBossStage, novaAcSong, novaBlast, novaBom, novaEpCd, novaMau, novaMui, novaPtGiat, obstacles, p2AmmoType, p2Form, parryX, paused, perfectParryCd, pet1Cd, pet1GuardShots, pet1Shots, pet2Cd, pet2Dash, pet2Lua, pet2OrbitMines, pet2Shots, pet3Cd, pet3CooldownReduction, pet3IdleFrames, pet3X, pet3Y, pet4Cd, pet4Charges, pet4Flash, pet4SpendCd, pet4X, pet4Y, pet5A, pet5B, pet6Active, pet6Angle, pet6Rings, pet6X, pet6Y, platforms, playerHexImpact, prismDmg, projectiles, pulsarScaledDamage, pulseSetVung, pulseSieuTrung, pvpDauMay, pvpDeathTimer, pvpDich, pvpLuat, pvpMayKho, pvpNguoi1, pvpVoBoc, qsFin, qsFlash, qsMarks, qsPerfect, qsT, quetRuneBatHopPhap, reflectToX, reflectToY, resetTimBoss, reviveOverlay, rgcDam, rgcKho, ruDayDs, score, sdtBat, sdtCd, sdtKhoan, sdtNhap, sdtVot, sdtXoe, setTan, setTia, setVet, setupWilderness, sgHitDone, sgHitSnapshot, sgLuot, shakeTimer, shieldCharge, shinGuardReset, smBlades, smClone, smSpawnBlade, spawnAfterimage, spawnTimerCactus, spawnTimerEnemy, spiderTree, sssArmed, stBat, stLuotXuong, stReset, stTieu, styReset, styleFlash, styleGrace, stylePoints, styleRankIdx, summitApproach, summitForkCd, summitLastBand, tdCd, tdCho, tdT, testBossSelection, trdReset, ttMoi, ultCharge, ultTestFill, uniArmed, uniChamT, uniChoHoi, uniGems, uniHop, uniHopO, uniMoiReset, unitySwapCd, venGiot, venTo, venVungs, visualEffects, voidBat, voidChanParry, voidPhanRa, voidTeleBatDau, volcanoApproach, volcanoNextChunk, voltBossTicks, voltDashBat, voltLuotUlt, voltTia, voltTrashTicks, wilderness, wkgHatTung, wkgLuot, wkgReset, worldL, worldR, xBat, xChoi
// index.html:89737 · Phạm vi: global
// PLAYER_PART_BEGIN s6.startGame.1 EDITABLE
function startGame(mode) {
            wilderness = null;
            doChieuDong();
            if (typeof ttMoi === 'function') ttMoi();          // @@HE-KYLUC: thong ke tran moi
            if (typeof styReset === 'function') styReset();    // @@HE-STYLISH
            if (typeof quetRuneBatHopPhap === 'function') quetRuneBatHopPhap(false);
            battuDem = 0; battuNhay = 0;                      // @@HE-BATTU: bo dem tinh theo TUNG man
            if (mode !== 'test_boss' || testBossSelection !== 99) dojoMode = false;   // roi san tap khi vao che do that
            if (typeof bienDT !== 'undefined') bienDT = false;   // @@HE-HELI
            if (typeof midasHakiCham !== 'undefined') midasHakiCham = 0;   // @@HE-HAKI
            gameState = mode; frames = 0; score = 0; gameSpeed = baseSpeed; gameOver = false; gameVictory = false; bossWaitTimer = 60; reviveOverlay = null; deathReviveLevel = 0; deathCineActive = false; deathCineFrame = 0; if (mode !== 'normal' && mode !== 'boss_rush') mapTheme = 'desert';
            // SAN TAP dat thang mapTheme/forestScene de xem thu nen, va truoc day khong co
            // buoc don nao — chon HANG NHEN roi bam AUTO RUN la vao van that voi dung canh
            // vua xem. Phai don, NHUNG KHONG DUOC DUNG VAO mapTheme: bang chon map cua Auto
            // Run dat mapTheme NGAY TRUOC khi goi startGame, dap no di la mat luon kha nang
            // chon map. (Toi da mac dung loi do o lan sua truoc.)
            if (mode === 'normal' || mode === 'boss_rush'){
                if (typeof forestScene !== 'undefined') forestScene = null;
                if (typeof spiderTree !== 'undefined') spiderTree = null;
                if (typeof grassField !== 'undefined') grassField = [];
                platforms.length = 0;
            }
            freeMove = false; dashVx = 0; lastMoveTapDir = 0; dashCd = 0; stReset(); unitySwapCd = 0; uniChamT = 0; uniChoHoi = 0; if (typeof setTia !== 'undefined'){ setTia.length = 0; setTan.length = 0; setVet.length = 0; } sdtBat = false; sdtKhoan = null; sdtVot = null; sdtNhap = []; sdtCd = 0; sdtXoe = 0; if (typeof dragReset === 'function') dragReset(); novaBom = []; if (typeof novaMau !== 'undefined'){ novaMau = []; novaMui = []; novaEpCd = 0; } cusNoBom = []; cusNoCd = 0;
            /* @@HE-CUSCH — don sach moi trang thai song lau cua Custom khi vao man moi.
               Bo sot cho nay mot lan roi: mot con UFO cua man truoc con treo lai lam Channel
               cua man sau khong bao gio khoi dong duoc, vi `cusChTick` thay `cusUfo` khac
               null la nhuong het luot cho no. */
            if (typeof cusQN !== 'undefined'){ cusQN = null; cusUfo = null; cusUfoBat = 0; cusUfoHoiCd = 0; }
            if (typeof cusNuke !== 'undefined'){ cusNuke = null; cusNkPhim = null; cusKhoan = null; cusNkTat = 0; cusNkTatSo = 0; }
            if (typeof cusRgDan !== 'undefined'){ cusRgDan.length = 0; cusRgSet.length = 0; }   // @@HE-CUSRG
            if (typeof pulseSetVung !== 'undefined') pulseSetVung.length = 0;                   // @@HE-PULSE-ST
            if (typeof cusKvReset === 'function') cusKvReset();   // @@HE-CUSKV
            if (typeof cusGb !== 'undefined') cusGb = null;          // @@HE-CUSGB
            if (typeof cusPtDan !== 'undefined'){ cusPtDan.length = 0; cusPtChay.length = 0; novaPtGiat.length = 0; }   // @@HE-CUSPT
            if (typeof cusCgDan !== 'undefined') cusCgDan.length = 0;                             // @@HE-CUSCG
            if (typeof tdT !== 'undefined'){ tdT = 0; tdCd = 0; tdCho = null; }                    // @@HE-TUDIA
            if (typeof ruDayDs !== 'undefined') ruDayDs.length = 0;                                  // @@HE-APSUAT
            if (typeof rgcKho !== 'undefined'){ rgcKho = 0; rgcDam = null; }                         // @@HE-RGC
            if (typeof cusTl !== 'undefined') cusTl = null;                                       // @@HE-CUSTL
            if (typeof cusAcNo !== 'undefined'){ cusAcNo.length = 0; cusAcPhan.length = 0; if (typeof novaAcSong !== 'undefined') novaAcSong.length = 0; for (let o of cusAcDs) if (o) o._acDay = null; cusAcDs.length = 0; }   // @@HE-CUSAC
            if (typeof cusStand !== 'undefined'){ cusStand.x = null; cusStand.don.length = 0; cusStand.cd = 0; cusStand.tich = 0; }   // @@HE-CUSHE3
            if (typeof cusUzu !== 'undefined'){ cusUzu = null; cusUzDan = [[], [], [], [], []]; cusUzA = 0; }   // @@HE-CUSUZ
            if (typeof cusMt !== 'undefined'){ cusMt = null; cusMtTen.length = 0; }   // @@HE-CUSMT
            if (typeof gaeTro !== 'undefined'){ gaeTro.length = 0; gaeChop = 0; }   // @@HE-GAEL
            if (typeof wkgReset === 'function') wkgReset();   // @@HE-WUKONG
            if (typeof trdReset === 'function') trdReset();   // @@HE-TRIDENT
            if (typeof lhReset === 'function') lhReset();     // @@HE-LUOIHAI
            if (typeof lanRieng2 !== 'undefined') lanRieng2.lh = null;   // @@HE-P2KHOA: Luoi hai cua P2
            if (typeof cusTanChay !== 'undefined') cusTanChay.length = 0;
            if (typeof cusNoLon !== 'undefined') cusNoLon.length = 0;
            if (typeof cusToaHen !== 'undefined'){ cusToaHen.length = 0; cusToaVong.length = 0; cusToaTia.length = 0; }
            if (typeof cusTTHom !== 'undefined'){ cusTTHom.length = 0; cusTTTruc = null; cusTTCd = 0; }
            khienManh = []; khienLuotHit = new Set(); qsT = 0; qsMarks = []; qsFin = null; qsPerfect = false; qsFlash = 0;
            pet1Shots.length = 0; pet1GuardShots.length = 0; pet1Cd = 0; pet2Shots.length = 0; pet2OrbitMines.length = 0; pet2Cd = 0; if(typeof pet2Lua!=="undefined"){ pet2Lua.length = 0; pet2Dash = null; } afterimages.length = 0; kimCoAnh.length = 0; birdBank = 0; birdSpendCd = 0; birdDmgAcc = 0; voltBossTicks = 0; voltTrashTicks = 0;
            pet3Cd = 600; pet3CooldownReduction = 0; pet3IdleFrames = 0; pet4Cd = 600; pet4Flash = 0; pet4Charges = 0; pet4SpendCd = 0; pet3X = 0; pet3Y = 0; pet4X = 0; pet4Y = 0;
            pet5A={x:0,y:0,cd:0,dash:null,charges:0}; pet5B={x:0,y:0,cd:180,dash:null,charges:0}; pet6Active = false; pet6Angle = 0; pet6X = 0; pet6Y = 0; pet6Rings = [];
            duelMode = false; duelOver = 0; duelWinner = null;
            obstacles.length = 0; enemies.length = 0; hearts.length = 0; projectiles.length = 0; bossProjectiles.length = 0; bosses.length = 0; boomerangs.length = 0; smBlades.length = 0; smClone = null; floatingTexts.length = 0; visualEffects.length = 0; platforms.length = 0; lavaGeysers.length = 0; forestBossQueue.length = 0; forestQueueInit = false; cloneGauntlet = false; gauntletGate = null; summitLastBand = 2; summitForkCd = 0; summitApproach = null; volcanoApproach = null; noDmgStreak = 0; pvpDeathTimer = -1; shieldCharge = 0;
            fireBrands = [];
            /* VENOM: ba mang nay truoc gio KHONG duoc don khi vao man moi. Manh co the, soi to
               va vung dich cua van truoc con nam nguyen do — sang tran sau la boss moi tu dung
               an sat thuong tu nhung manh khong con chu. Truoc day it thay vi giot cua ult chi
               song 58 khung; manh NOVA song 138 khung va co the co toi 20 cai, nen loi noi len. */
            if (typeof venGiot  !== 'undefined') venGiot.length = 0;
            if (typeof clNhanTat === 'function') clNhanTat();   // @@HE-CHANLONG
            if (typeof venTo    !== 'undefined') venTo.length = 0;
            if (typeof venVungs !== 'undefined') venVungs.length = 0;
            activeLightnings.length = 0; if(typeof voltTia!=='undefined') voltTia.length = 0; spawnTimerCactus = 60; spawnTimerEnemy = 100; noDamageTaken = true; resetTimBoss(); critStack = 0; camReset(); defMode = false; defUnits.length = 0; ultCharge = (ultTestFill || hasRune("instult") || hasRune("instultx") || dojoMode) ? 100 : 0;
            // Thanh HOP NHAT cua Unity theo dung luat cua chieu cuoi: san tap / test thi vua
            // vao da day de thu ngay MOT lan, xai xong tich lai binh thuong; vao che do choi
            // that thi bat dau tu 0.
            if (typeof uniHop !== 'undefined'){ uniHop = ultCharge >= 100 ? 100 : 0; uniHopO = 0; }
            // @@HE-AI: bat may cam P2 theo lua chon o sanh. Qua mang thi luon tat, vi ben
            // kia da la nguoi that.
            if (typeof aiBat !== 'undefined'){
                aiBat = (mode === 'pvp') && !lanMang && pvpDauMay;
                aiDoKho = pvpMayKho; aiBatP1 = false;
                if (typeof aiReset === 'function') aiReset();
            }
            if (typeof uniArmed !== 'undefined'){ uniArmed = 0; uniGems = null; }
            if (typeof uniMoiReset === 'function') uniMoiReset();   /* @@HE-UNITY2 */ paused = false; hitstopTimer = 0; dodgeCd = 0; grazeFlashTimer = 0; perfectParryCd = 0; flashKind = 0; stylePoints = 0; styleRankIdx = 0; styleFlash = 0; styleGrace = 0; sssArmed = true; laserFireTimer = 0; laserEngaged = false; laserBlockFlag = false; lavaFlood = 0;
            
            dino = new Player(1, 80, currentForm, currentAmmoType, false);
            if (mode === 'pvp') {
                dino2 = new Player(2, 660, p2Form, p2AmmoType, true);
            }
            
            if (mode === 'normal') { nextBossScore = 1000; bossLevel = 1; normalBossStage = 0; mapNen = 0;
                if (MAP_CHUOI.indexOf(mapTheme) < 0 && mapTheme !== 'wilds' && !(mapTheme === 'ocean' && bienChon)) mapTheme = 'desert';
                bienChon = false;
                mapChay = mapTheme; } 
            else { bossRushStage = 0; bossLevel = 1; }
            if (mode === 'normal' && mapTheme === 'ocean' && typeof bienKhoiTao === 'function') bienKhoiTao();   // @@HE-BIEN
            if (mode === 'normal' && mapTheme === 'forest') { platforms.push({ x: -60, w: canvas.width + 160, top: 320, h: 80 }); forestNextChunk = false; }
            if (mode === 'normal' && mapTheme === 'volcano') { platforms.push({ x: -60, w: canvas.width + 160, top: 320, h: 80, volcano: true }); volcanoNextChunk = true; }
            if (mode === 'normal' && mapTheme === 'dinhnui') { platforms.push({ x: -60, w: canvas.width + 160, top: 320, h: 80, summit: true }); summitLastBand = 2; summitForkCd = 0; dino.y = 320 - dino.h; dino.dy = 0; dino.grounded = true; dino.invincible = true; dino.invTimer = 60; }
            if (mode === 'normal' && mapTheme === 'wilds') setupWilderness();
            SFX.init(); SFX.resume();
            if (dojoMode) SFX.stopMusic(); else SFX.startMusic();   // SAN TAP: KHONG co nhac nen
        }
// PLAYER_PART_END s6.startGame.1

// index.html:89838 · Phạm vi: global
// PLAYER_PART_BEGIN s6.handleMoveTap.1 EDITABLE
function handleMoveTap(dir) {
            let now = Date.now();
            if (dir === lastMoveTapDir && (now - lastMoveTapTime) < 260) doDash();   // nhan 2 lan cung huong -> LUOT
            lastMoveTapDir = dir; lastMoveTapTime = now;
        }
// PLAYER_PART_END s6.handleMoveTap.1

// index.html:90764 · Phạm vi: global
// PLAYER_PART_BEGIN s6.doDash.1 EDITABLE
function doDash(epHuong) {
            if (dashCd > 0) return;
            if (typeof dino !== 'undefined' && dino && dino.tank) return;   // xe tang khong luot duoc
            if (!(gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp')) return;
            if (typeof dino === 'undefined' || !dino || dino.jcState || dino.webTimer > 0) return;
            let dir = epHuong || ((keys['KeyA'] || keys['ArrowLeft']) ? -1 : ((keys['KeyD'] || keys['ArrowRight']) ? 1 : (dino.isFacingLeft ? -1 : 1)));
            // SHIN TRICKSTER: neu bam phim luot DUOI DAT thi tru charge; tren khong da tinh o stTuDongTrenKhong.
            if (stBat() && !epHuong) {
                if (!dino.grounded && (keys['KeyS'] || keys['ArrowDown'])) { stLuotXuong(); return; }
                if (!stTieu()) return;
            }
            dino.dashDir = dir;
            if (hasRune('headbutt')){ dino.dashShieldTimer = (combatStance===2 ? 32 : 16); dino.meleeID++; }   // HUC DAU: khien parry khi luot (Royal Guard x2)
            if (dino.lightningFormTimer > 0) {
                voltLuotUlt(dir);                          // @@VK-VOLT
            } else {
                if (dino.ultActive) return;
                if (hasRune('voltdash')) voltDashBat(dir);
                // LUOT SET lam cu luot XA HON HAN voi MOI loai dan (22 -> 36, gan bang muc 42
                // cua cu luot trong Ult Volt). Day la ly do chinh de deo rune: co dong. Sat thuong
                // chi la phan them. Neu chi cho Volt duoc huong thi cac loai dan khac khong co
                // ly do gi bo mot o cho no.
                let _xa = hasRune('voltdash') ? 36 : 22;
                // @@HE-WUKONG — tren gay ma luot thi thu gay lai va cuoi CAN DAU VAN;
                // cui hai nhip roi luot thi de lai PHAN THAN MOI.
                if (typeof wkgLuot === 'function' && wkgLuot()){ dashCd = 26; return; }
                if (typeof voidBat === 'function' && voidBat()){
                    // @@HE-POWER VOID — DICH CHUYEN: toi thang vi tri do, KHONG co khung mien
                    // thuong. Doi lai cu luot khong con la nut thoat hiem ma la cong cu dinh vi.
                    // TREN KHONG khong dich chuyen ngang duoc — chi duoi dat. Bu lai co
                    // DICH CHUYEN XUONG (giu S roi luot khi dang bay).
                    if (!dino.grounded){
                        // @@HE-DON: `crouchKey` la bien CUC BO trong Player.update — o day no khong
                        // ton tai, nen luot tren khong voi VOID nem loi va khong bao gio dich chuyen xuong.
                        if (keys['KeyS'] || keys['ArrowDown']){
                            let _d = 320 - dino.h;
                            for (let _pf of platforms){
                                let _t = _pf.top !== undefined ? _pf.top : _pf.y;
                                if (_t > dino.y + dino.h && _t - dino.h < _d) _d = _t - dino.h;
                            }
                            voidTeleBatDau(dino.x, _d, true);
                            dashCd = 26;
                        }
                        return;
                    }
                    let _q = dir * _xa * 5.2;
                    voidTeleBatDau(Math.max(worldL(), Math.min(worldR() - dino.w, dino.x + _q)), dino.y, true);
                    dino._tdNe = frames + 20;   // @@HE-TUDIA: dich chuyen cung la mot cu ne
                    dashVx = 0;
                    dashCd = stBat() ? ST_NHIP : (combatStance === 1 ? 26 : 42);
                    if (currentForm === 0 && !stBat()) dashCd = Math.round(dashCd * DANG_NOR_LUOT);   // @@HE-DANG: NORMAL gon nhe
                    if (currentForm === DANG_XUONG) dashCd = Math.round(dashCd * DANG_XUONG_LUOT);   // BO XUONG hoi Dash nhanh hon 5%
                } else {
                dashVx = dir * _xa; if (mapTheme === 'ocean' && (dino.y + dino.h) > OCEAN_SURF + 4) dashVx *= 0.6;   // luot duoi nuoc cham hon
                if (typeof mayDanhDauLuot === 'function') mayDanhDauLuot(dir);
                dashCd = stBat() ? ST_NHIP : (combatStance === 1 ? 26 : 42); // Trickster hoi luot nhanh hon; Shin Trickster dung he charge rieng
                if (currentForm === 0 && !stBat()) dashCd = Math.round(dashCd * DANG_NOR_LUOT);   // @@HE-DANG: NORMAL gon nhe
                    if (currentForm === DANG_XUONG) dashCd = Math.round(dashCd * DANG_XUONG_LUOT);   // BO XUONG hoi Dash nhanh hon 5%
                luotMien(dino);
                if (typeof sgLuot === 'function') sgLuot(dino, dir);
                if (typeof lhLuot === 'function') lhLuot(dir);   // @@HE-LUOIHAI: J roi luot = song chan dong; luot roi J = chem ngang lien
                }
                // @@HE-CUSRG2 — dang dien tu gia toc thi luot thanh LUOT SET
                if (typeof cusRgKBat === 'function' && currentAmmoType === CUS_DAN && cusRgBat() && cusRgKBat(dino)) cusRgLuotBat(dino, dir);
                // ===== SWORDMASTER =====
                if (hasRune('swordmaster')) {
                    if (!dino.grounded) {
                        // HISUISHO: luot tren khong -> dung luoi kiem chan truoc mat
                        smSpawnBlade(dino, dir);
                        floatingTexts.push(new FloatingText(dino.x - 16, dino.y - 22, "HISUISHO"));
                    } else if (!smClone) {
                        // SOGENMU: luot duoi dat -> trieu phan than 2 giay, luot KHOA cho toi khi no tan
                        smClone = { x: dino.x, y: dino.y, w: dino.w, h: dino.h, left: dino.isFacingLeft,
                                    t: SM_CLONE_LIFE, tape: [], atk: null, lastSeq: 0,
                                    sx0: dino.x, slideT: 12, slideMax: 12, bodyHit: new Set() };
                        dashCd = 99999;
                        floatingTexts.push(new FloatingText(dino.x - 16, dino.y - 22, "SOGENMU"));
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(300, 0.18, 'sawtooth', 0.20, 620);
                    }
                }
            }
            spawnAfterimage();
            // @@HE-SHIPBO — DINOSWORD, chuoi  J -> LUOT -> J.
            // Cu luot TU NO chem, khong phai bam gi. NHUNG chi trong COMBO: phai vua bam J
            // truoc do, tuc `clawComboWindow` con mo. Luot khong co J dan truoc thi van chi
            // la mot cu luot tron.
            if (dino.id === 1 && currentAmmoType === 5 && dino.grounded
                && (dino.clawComboWindow || 0) > 0
                && !dino.isOverheated && dino.ammo > 0 && !dino.ultActive && !dino.clawUltState
                && typeof dino.shippuugaLen === 'function') dino.shippuugaLen();
        }
// PLAYER_PART_END s6.doDash.1

// index.html:92770 · Phạm vi: global
// PLAYER_PART_BEGIN s6.sanhChoUlt.1 EDITABLE
function sanhChoUlt(){ return !(gameState === 'pvp' && !pvpLuat.ult); }
// PLAYER_PART_END s6.sanhChoUlt.1

// index.html:94034 · Phạm vi: global
// PLAYER_PART_BEGIN s6.parry.1 EDITABLE
function parry(y){
            visualEffects.push(new Effect(parryX(), (y === undefined ? dino.y : y), 'parry'));
            if (typeof kimCoDe === 'function') kimCoDe();
            if (typeof shinGuardReset === 'function') shinGuardReset(false);
        }
// PLAYER_PART_END s6.parry.1

// index.html:95102 · Phạm vi: global
// PLAYER_PART_BEGIN s6.launchFromPit.1 EDITABLE
function launchFromPit(n,gravity=n.gravity){
            const left=Math.max(worldL(),camX||0),right=Math.min(worldR(),left+canvas.width),cx=n.x+n.w/2;
            const candidates=[];
            for(const p of platforms){
                if(p.solid===false||p.wall||!Number.isFinite(p.top)||!Number.isFinite(p.x)||p.w<24||p.top>Math.max(344,dkNenY()+24))continue;
                if(p.isLeaf&&(p.leafTimer||0)>35)continue;
                const lo=Math.max(left+8,p.x+8),hi=Math.min(right-8,p.x+p.w-8);
                if(hi-lo<Math.min(n.w,24))continue;
                const x=Math.max(lo+Math.min(n.w/2,(hi-lo)/2),Math.min(hi-Math.min(n.w/2,(hi-lo)/2),cx));
                const scrolling=gameState==='normal'&&['forest','volcano','dinhnui','slashcave'].includes(mapTheme)&&!bosses.length;
                const leaving=scrolling&&p.x+p.w-left<Math.max(0,gameSpeed)*75;
                const score=Math.abs(x-cx)+Math.max(0,320-p.top)*.25+(p.isLeaf?180:0)+(leaving?800:0);
                candidates.push({p,x,score});
            }
            candidates.sort((a,b)=>a.score-b.score);
            const safe=candidates[0],floor=safe?safe.p.top:dkNenY();
            n.x=Math.max(left+4,Math.min(right-n.w-4,(safe?safe.x:cx)-n.w/2));
            n.y=floor-n.h-12;n.grounded=false;n.canDoubleJump=true;n.jumpCount=0;
            n.dropTimer=0;n.dropFromTop=0;n.bodySlamArmed=n.bodySlamActive=false;n.hoverTimer=0;n.hoverArmed=false;n.mayBay=0;n.webTimer=0;
            if(n.id===1)dashVx=0;
            // Downward attacks / position-locked beams must not immediately undo the rebound.
            if(n.dante){if(typeof dswCancel==='function')dswCancel(n.dante);n.dante.attack=null;n.dante.k=null;n.dante.judgement=null;for(const state of [n.dante.sword,n.dante.balrog,n.dante.cavaliere,n.dante.cerberus])if(state){state.queue=[];state.airSlow=0;}}
            if(n.vergil){n.vergil.attack=null;n.vergil.queue=[];n.vergil.airSlow=0;n.vergil.holdJ=n.vergil.holdK=0;n.vergil.jce=null;}
            if(n.ironhaul){const p=n.ironhaul,a=p.attack;p.attack=null;p.queue=null;p.k=null;p.counter=0;p.pendingJump=null;if(a?.move.ultimate)ironSilverEnd(n);}
            if(n.sg){n.sg.action=null;n.sg.beam=null;n.sg.swordBrake=0;}
            if(n.id===1&&typeof xChoi!=='undefined'&&xChoi&&typeof xBat==='function'&&xBat()){xChoi.dac=null;xChoi.bien=null;xChoi.aS='khong';xChoi.khoaDi=0;xChoi.vy=0;}
            n.dy=-Math.sqrt(2*Math.max(.1,gravity||.65)*280);
            n._fallRecovery={platform:safe?.p||null,lastX:safe?.p.x||0,until:frames+180};
            n.invincible=true;n.invTimer=Math.max(n.invTimer||0,45);
            visualEffects.push(new Effect(n.x+n.w/2,floor,'explosion',true,18));
            return n._fallRecovery;
        }
// PLAYER_PART_END s6.launchFromPit.1

// index.html:95134 · Phạm vi: global
// PLAYER_PART_BEGIN s6.followFallRecovery.1 EDITABLE
function followFallRecovery(n){
            const r=n._fallRecovery;if(!r)return;
            if(n.grounded||n.ultActive||frames>r.until||!r.platform||!platforms.includes(r.platform)||r.platform.solid===false){n._fallRecovery=null;return;}
            // Inherit the platform's scrolling motion; A/D remains fully available in the air.
            n.x=Math.max(worldL(),Math.min(worldR()-n.w,n.x+r.platform.x-r.lastX));r.lastX=r.platform.x;
        }
// PLAYER_PART_END s6.followFallRecovery.1

// index.html:95140 · Phạm vi: global
// PLAYER_PART_BEGIN s6.coBuc.1 EDITABLE
function coBuc(){
            if (mapTheme === 'ocean') return true;   // @@HE-BIEN: bien luon dung vat ly nen/be (co khi khong co be nao tren man)
            /* Tetris: day ho nam o tetris.groundY (400) va moi khoi deu thap hon 318 luc dau. Truoc day nhanh duoi coi
               "khong co be nao cao hon 318" la ban do phang -> nguoi choi bi ghim o y 320, LO LUNG giua khong trung tren
               day ho va khong dung len duoc khoi nao cho toi khi chong khoi cao qua 318. */
            if (mapTheme === 'tetris') return true;
            if (_bucCache.n !== platforms.length){
                _bucCache.n = platforms.length;
                _bucCache.co = platforms.some(pf => pf.top < 318 && !pf.wall);
            }
            return _bucCache.co;
        }
// PLAYER_PART_END s6.coBuc.1

// index.html:97449 · Phạm vi: global
// PLAYER_PART_BEGIN s6.parryDamage.1 EDITABLE
function parryDamage(tgt, perfect){
            if (!tgt) return 0;
            let pct = perfect ? PARRY_PCT_PERFECT : PARRY_PCT_BLOCK;
            if (combatStance === 2) pct *= PARRY_RG_BONUS;
            let v = Math.round((tgt.maxHp || 40) * pct);
            return Math.max(perfect ? PARRY_MIN_PERFECT : PARRY_MIN_BLOCK, v);
        }
// PLAYER_PART_END s6.parryDamage.1

// index.html:97456 · Phạm vi: global
// PLAYER_PART_BEGIN s6.parryGainUlt.1 EDITABLE
function parryGainUlt(perfect){
            // @@HE-MIDAS-MOVE: parry cung la mot nguon nap thanh tich. Moc o day vi day la
            // cho duy nhat ca hai duong parry (PvE va PvP) deu di qua.
            if (typeof dino !== 'undefined' && dino && dino.ammoType === MIDAS_DAN
                && typeof midasCong === 'function')
                midasCong(dino, (perfect) ? MIDAS_PARRY_HH : MIDAS_PARRY, "PARRY");
            if (dino.ultActive || ultCharge >= 100) return;
            ultCharge = Math.min(100, ultCharge + (perfect ? PARRY_ULT_PERFECT : PARRY_ULT_BLOCK));
        }
// PLAYER_PART_END s6.parryGainUlt.1

// index.html:97465 · Phạm vi: global
// PLAYER_PART_BEGIN s6.checkCollisions.1 EDITABLE
function checkCollisions() {
            if (gameState === 'pvp') return; 

            let dashShield = (dino.dashShieldTimer||0) > 0 && hasRune('headbutt');
            let isShieldActive = dino.isShielding();
            let sScale = dino.getFormScale();
            let sX, sY, shieldHitbox;
            if (dashShield){ let dd = dino.dashDir || (dino.isFacingLeft?-1:1);
                sX = dd<0 ? (dino.x - 30) : (dino.x + dino.w + 6); sY = dino.y - 12;
                shieldHitbox = { x: (dd<0 ? dino.x-40 : dino.x + dino.w - 8), y: dino.y - 14, w: 48, h: dino.h + 28 };   // khien ban nguyet truoc mat khi luot
            } else {
                // Khien gio la lop giap LUC GIAC bao TRON quanh nguoi -> hitbox cung phai tron theo,
                // khong con la dai thang dung truoc mat nua (hitbox phai khop hoat anh).
                let R = Math.max(dino.w, dino.h) * 0.86 * sScale;
                let cxs = dino.x + dino.w / 2, cys = dino.y + dino.h / 2;
                sX = dino.x + (dino.isCrouching ? 48*sScale : 42*sScale); sY = dino.y - 15;   // diem hien hieu ung parry
                shieldHitbox = { x: cxs - R, y: cys - R * 0.98, w: R * 2, h: R * 1.96 };
            }
            let parryBoost = dashShield ? 1.5 : 1;   // HUC DAU: parry manh hon 50%
            let shieldDmg = Math.round((2 + dino.bulletDmg) * parryBoost); 

            for (let i = hearts.length - 1; i >= 0; i--) {
                if (checkAABB(dino, hearts[i])) {
                    if (hearts[i].big) {
                        dino.hp = dino.maxHp;
                        floatingTexts.push(new FloatingText(dino.x, dino.y - 24, "HOI DAY MAU!"));
                        visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + dino.h/2, 'explosion', true, 24));
                    } else if (dino.hp < dino.maxHp) {
                        dino.hp++;
                        floatingTexts.push(new FloatingText(dino.x, dino.y - 20, "+1 HP"));
                    } else {
                        score += 150;
                        floatingTexts.push(new FloatingText(dino.x, dino.y - 20, "+150 PTS"));
                    }
                    hearts.splice(i, 1);
                }
            }

            for (let i = obstacles.length - 1; i >= 0; i--) {
                let o = obstacles[i];
                if (dino.tank && (checkAABB(dino, o) || checkAABB({ x: dino.x + dino.w/2 - 70, y: dino.y + dino.h - 80, w: 148, h: 84 }, o))) {
                    visualEffects.push(new Effect(o.x + o.w/2, o.y + o.h/2, 'explosion', true, 14));
                    obstacles.splice(i, 1); score += 10; continue;
                }
                if (isShieldActive && checkAABB(shieldHitbox, o)) {
                    if (o.lastMeleeHit !== dino.meleeID) {
                        o.hp -= shieldDmg; o.lastMeleeHit = dino.meleeID;
                        visualEffects.push(new Effect(o.x, o.y, 'parry'));
                        if (o.hp <= 0) { obstacles.splice(i, 1); score += 10; }
                    }
                } else if (checkAABB(dino, o)) { dino.takeDamage(1); }
            }

            for (let i = enemies.length - 1; i >= 0; i--) {
                let e = enemies[i];
                if (dino.tank && !e.isArcanaRune && !e.isArcanaTotem && !e.invulnAll && (e.h || 36) <= 90 && (e.w || 36) <= 120
                    && (checkAABB(dino, e) || checkAABB({ x: dino.x + dino.w/2 - 70, y: dino.y + dino.h - 80, w: 148, h: 84 }, e))) {
                    visualEffects.push(new Effect(e.x + (e.w||20)/2, e.y + (e.h||20)/2, 'explosion', true, 14));
                    e.hp = 0; handleEnemyDeath(e); enemies.splice(i, 1); continue;
                }
                if (isShieldActive && checkAABB(shieldHitbox, e)) {
                    if (e.lastMeleeHit !== dino.meleeID) {
                        e.hp -= (e.type === 'normal' || e.type === 'red' || e.type === 'yellow') ? 2 : shieldDmg;
                        e.lastMeleeHit = dino.meleeID;
                        visualEffects.push(new Effect(e.x, e.y, 'parry'));
                        if (e.hp <= 0) { let _mn = e.type === 'minion'; handleEnemyDeath(e); enemies.splice(i, 1); SFX.shieldKill(); if (!_mn) addStyle(6, 'shieldkill'); }
                    }
                } else if (!e.isArcanaRune && !e.isArcanaTotem && !e.khongCham && checkAABB(dino, e)) { dino.takeDamage(1); }
                if (e.x + e.w < 0) { enemies.splice(i, 1); }
            }

            for (let i = 0; i < bosses.length; i++) {
                let b = bosses[i];
                if (isShieldActive && checkAABB(shieldHitbox, b) && !b.tuXuLyKhien) {   // @@HE-SPL: boss tu xu ly khien thi bo qua parry chung
                    if (b.lastMeleeHit !== dino.meleeID) {
                        let _st = b.state || '';
                        let isDashing = _st.includes('dash') || _st.includes('charging') || _st.includes('charge_go') || _st.includes('lunge') || _st.includes('rush') || _st.includes('roll_go') || _st.includes('pounce') || _st.includes('dive_go') || _st.includes('ram') || _st.includes('tackle') || _st === 'swooping' || _st === 'slam_down' || _st === 'slam_fall' || _st.includes('clone_dash');   // MOI don LAO deu parry an dmg
                        let parryDmg = isDashing ? Math.round((parryDamage(b, false) + (dino.bulletDmg||0)) * parryBoost) : 0;
                        if(typeof danteRoyalShield==='function'&&danteRoyalShield()){if(isDashing)danteGuardContact(b.dmg||b.damage||1,b);b.lastMeleeHit=dino.meleeID;continue;}
                        if (isDashing) parryGainUlt(false);   // chan don lao -> +5% chieu cuoi

                        if (b.name === "SPINOSAURUS" && (b.state === 'spin_dash_1' || b.state === 'spin_dash_2')) {
                            damageBossWithFirstStrike(b, parryDmg); b.lastMeleeHit = dino.meleeID;
                            visualEffects.push(new Effect(sX, sY + 30, 'parry')); addStyle(15, 'parry'); shakeTimer = 20;
                            if (b.state === 'spin_dash_1') b.state = 'spin_bounce_back';
                            else b.state = 'stunned_return';
                        } else if (b.name === "HELIOS REX" && (b.state === 'clone_dash_1' || b.state === 'clone_dash_2')) {
                            damageBossWithFirstStrike(b, parryDmg); b.lastMeleeHit = dino.meleeID;
                            visualEffects.push(new Effect(sX, sY + 30, 'parry')); addStyle(isDashing ? 15 : 6, 'parry'); shakeTimer = 20;
                            if (b.state === 'clone_dash_1') { b.state = 'clone_bounce_back'; } 
                            else { b.state = 'clone_return'; b.willSurpriseShoot = true; }
                        } else if (b.name === "AEGIS REX" && (b.state === 'charging' || b.state === 'charge_recoil')) {
                            damageBossWithFirstStrike(b, parryDmg); b.lastMeleeHit = dino.meleeID;
                            visualEffects.push(new Effect(sX, sY + 30, 'parry')); addStyle(6, 'parry'); shakeTimer = 14;
                        } else if (b.name === "T-REX BOSS" && b.state === 'dashing') {
                            damageBossWithFirstStrike(b, parryDmg); b.lastMeleeHit = dino.meleeID; visualEffects.push(new Effect(sX, sY + 30, 'parry')); addStyle(6, 'parry'); shakeTimer = 14;
                            b.state = 'retreat_out'; b.retDir = b.dashDir || -1;
                        } else if (b.name === "TRICERATOPS BOSS" && b.state === 'charging') {
                            damageBossWithFirstStrike(b, parryDmg); b.lastMeleeHit = dino.meleeID; visualEffects.push(new Effect(sX, sY + 30, 'parry')); addStyle(6, 'parry'); shakeTimer = 14;
                            b.state = 'charge_recoil'; b.retDir = b.chgDir || -1; b.subStateTimer = 20;
                        } else if (b.name === "SLASH BEAST" && (
                            b.state === 'charging' || b.state === 'charge_recoil' ||
                            b.state === 'pillar_dive_prep' || b.state === 'pillar_dive' ||
                            b.state === 'pillar_slam_prep' || b.state === 'pillar_slam' ||
                            b.state === 'pillar_claw_prep' || b.state === 'pillar_claw_approach' ||
                            b.state === 'pillar_claw' || b.state === 'pillar_claw_fall' ||
                            b.state === 'grab_go' || b.state === 'grab_hold' || b.state === 'grab_throw'
                        )) {
                            damageBossWithFirstStrike(b, parryDmg); b.lastMeleeHit = dino.meleeID;
                            visualEffects.push(new Effect(sX, sY + 30, 'parry'));
                            addStyle(isDashing ? 15 : 6, 'parry'); shakeTimer = 16; b.rushCount++;
                            const airReturn = (
                                b.state === 'pillar_dive_prep' || b.state === 'pillar_dive' ||
                                b.state === 'pillar_slam_prep' || b.state === 'pillar_slam' ||
                                b.state === 'pillar_claw_approach' || b.state === 'pillar_claw_fall'
                            );
                            b.state = 'returning'; b.retMode = airReturn ? 'air' : 'ground';
                            b.subTimer = 0; b.vy = airReturn ? Math.max(1.5, b.vy || 2.5) : 0;
                            b.vx = airReturn ? (b.vx || 0) : (b.vx || 0);
                        } else if (b.name === "VOLT REX") {
                            // Parry: dash xuyen qua nguoi, KHONG doi state; van gay dmg parry
                            damageBossWithFirstStrike(b, parryDmg); b.lastMeleeHit = dino.meleeID; visualEffects.push(new Effect(sX, sY + 30, 'parry')); addStyle(6, 'parry');
                        } else {
                            damageBossWithFirstStrike(b, parryDmg); b.lastMeleeHit = dino.meleeID;
                            visualEffects.push(new Effect(sX, sY + 30, 'parry')); addStyle(isDashing ? 15 : 6, 'parry');
                            
                            // Boss dang BAM TUONG hoac dang bay ma bi parry: don sach moi thu
                            // dang treo lo lung (day xich, luoi hai bay, doan bay) roi cho no
                            // ve tuong truot xuong, thay vi dung giua troi danh tiep.
                            if (b.wallT > 0 || b.fly > 0){
                                b.chain = null; b.glaive = null; b.throwArr = null;
                                if (b.blades) b.blades.length = 0;
                                b.slash = null; b.tel = null;
                                b.fly = 0;
                                b.state = 'returning'; b.subTimer = 0;
                                b.wallReturnSlide = (b.wallT <= 0);
                                b.wallReturnVy = 2.2;
                                if (b.actionTimer !== undefined) b.actionTimer = Math.max(b.actionTimer || 0, 30);
                                shakeTimer = 16;
                            }
                            else if (b.state !== 'idle' && b.state !== 'entering' && b.state !== 'returning_place' && !b.state.includes('spin') && !b.state.includes('stun') && !b.state.includes('clone_') && !b.state.includes('retreat')) {
                                b.state = (b.retState || 'returning'); if (b.actionTimer !== undefined) b.actionTimer = Math.max(b.actionTimer || 0, 30); shakeTimer = 20;
                                // Bi parry GIUA TROI (vd Triceratops dang slam_up): nhanh 'returning'/retState
                                // cua phan lon boss khong he dung toi y -> boss TREO lo lung roi danh chieu mat
                                // dat tren khong. Dung lai co che keo-ve-dat cua don hat tung (boss co trong
                                // luc rieng hoac tu bay thi wkgTickHat tu nhuong quyen).
                                if (typeof wkgHatTung === 'function' && b.baseY !== undefined && b.y < b.baseY - 1) wkgHatTung(b, 0);
                            }
                        }
                    }
                } else if (checkAABB(dino, b)) {
                    if (bossContactAttack(b)) {
                        dino.takeDamage(1); 
                    }
                }
            }

            for (let i = bossProjectiles.length - 1; i >= 0; i--) {
                // DAN CUA PHE MINH trong Defense khong duoc cham vao nguoi choi. Dan cua quan
                // BAN mang co defBen='p' nhung van di qua duong va cham chung nay nen ban vao
                // chinh nguoi choi.
                if (bossProjectiles[i].defBen === 'p') continue;
                let bpV = bossProjectiles[i];
                let _isPerfect = ((dino.meleeTimer >= (combatStance === 2 ? 38 : 23)) || dino.parryWindow > 0) && perfectParryCd <= 0 && !voidChanParry();
                if (typeof voidBat === 'function' && voidBat() && isShieldActive && !bpV.isPiercing && checkAABB(shieldHitbox, bpV)){
                    let bx = bpV.x + (bpV.w || 0) / 2, by = bpV.y + (bpV.h || 0) / 2;
                    bossProjectiles.splice(i, 1);
                    if (typeof voidPhanRa === 'function') voidPhanRa(bx, by, bpV);
                    continue;
                }
                if(typeof danteRoyalShield==='function'&&danteRoyalShield()&&checkAABB(shieldHitbox,bpV)&&(!bpV.isPiercing||dantePerfectGuard())){danteGuardContact(bpV.dmg||1,bpV);bossProjectiles.splice(i,1);continue;}
                if (isShieldActive && checkAABB(shieldHitbox, bpV) && (!bpV.isPiercing || _isPerfect)) {
                    if (_isPerfect) {
                        let tgt = null, bd = 1e9;
                        [...bosses, ...enemies].forEach(o => { let d = Math.hypot((o.x + o.w / 2) - dino.x, (o.y + o.h / 2) - dino.y); if (d < bd) { bd = d; tgt = o; } });
                        if (tgt) { tgt.hp -= parryDamage(tgt, true); if (tgt.actionTimer !== undefined) tgt.actionTimer = Math.max(tgt.actionTimer, 45); reflectToX = tgt.x + tgt.w / 2; reflectToY = tgt.y + tgt.h / 2; }
                        else { reflectToX = bpV.x; reflectToY = bpV.y; }
                        playerHexImpact(dino,sX,dino.y+20);
                        hitstopTimer = 9; grazeFlashTimer = 16; flashKind = 1; grazeX = sX; grazeY = dino.y + 20; perfectParryCd = 22;
                        parryGainUlt(true);                    // Perfect Parry -> +15% chieu cuoi
                        floatingTexts.push(new FloatingText(dino.x, dino.y - 22, "PHẢN! +" + PARRY_ULT_PERFECT + "% ULT")); addStyle(28, 'parry');
                        SFX.parry(); SFX.tone(320, 0.14, 'square', 0.22, 90);
                        shinGuardReset(true);
                    } else { visualEffects.push(new Effect(sX, bpV.y, 'parry')); addStyle(6, 'block'); }
                    bossProjectiles.splice(i, 1);
                } else if (checkAABB(bpV, dino)) {
                    if(typeof danteRoyalShield==='function'&&danteRoyalShield()&&bpV.isPiercing&&!dantePerfectGuard()){const sg=danteStyleState(dino.dante),until=sg.guardUntil;sg.guardUntil=-100;try{dino.takeDamage(bpV.dmg||1);}finally{sg.guardUntil=until;}bossProjectiles.splice(i,1);continue;}
                    if (bpV.web) { dino.takeDamage(1); dino.webTimer = 45; } else dino.takeDamage(bpV.dmg); bossProjectiles.splice(i, 1);
                }
            }
            /* @@HE-DO-VO — Hans: "vai don danh tam xa cua boss khi nguoi choi chan thi khong vo. Cac don
               nhu nam dam cua Nero, kiem cua Vergil... Don nay do kip thi vo."
               Dan THUONG (BossProjectile) da vo khi cham vung khien o tren. Nhung nhieu don tam xa la VAT
               RIENG cua tung boss (nam dam Punch Line, kiem trieu hoi, luoi hai nem, Crossblade, bay qua,
               ngoc Faust, mu Faust...) — chung chi xet cham THAN nguoi choi, nen khien di xuyen qua va vat
               cu bay tiep / nay lai danh tiep. Gio moi vat nhu vay cham vung khien la VO; Perfect Parry
               duoc thuong y nhu do dan thuong. */
            if (isShieldActive) doVoVatBoss(shieldHitbox, sX);

            for (let p = projectiles.length - 1; p >= 0; p--) {
                let proj = projectiles[p], projHit = false;
                const _sgHit = typeof sgHitSnapshot === 'function' ? sgHitSnapshot(proj) : null;
                if (proj && proj.cus && typeof cusDanBuoc === 'function') cusDanBuoc(proj);   // @@HE-CUSNC
                // MUA HOA: cau lua bay theo cung, cham dat thi NO
                if (proj.mortar && mortarBuoc(proj, p)) { projectiles.splice(p, 1); continue; }
                // MANH PHAN HACH: tu bam theo dich gan nhat trong mot khoang
                if (proj.homing > 0) {
                    proj.homing--;
                    let bt = null, bd = 99999, px0 = proj.x + proj.w/2, py0 = proj.y + proj.h/2;
                    for (let o of bosses.concat(enemies)) { if (o.invulnAll) continue;
                        let d = Math.hypot((o.x+o.w/2)-px0, (o.y+o.h/2)-py0); if (d < bd) { bd = d; bt = o; } }
                    if (bt) { let dx0 = (bt.x+bt.w/2)-px0, dy0 = (bt.y+bt.h/2)-py0, dd = Math.hypot(dx0,dy0)||1;
                        proj.speed += (dx0/dd*9 - proj.speed) * 0.22;
                        proj.vy = (proj.vy||0) + ((dy0/dd*9 - (proj.vy||0)) * 0.22); }
                }
                
                const _pulsarDmg = pulsarScaledDamage(proj);
                const _pulsarProj = (proj.pulsar || proj._fromStar) ? Object.assign(Object.create(Object.getPrototypeOf(proj)), proj, { dmg: _pulsarDmg }) : proj;
                for (let o = obstacles.length - 1; o >= 0; o--) { 
                    if (checkAABB(proj, obstacles[o]) && !proj.hitIds.has(obstacles[o])) { 
                        proj.hitIds.add(obstacles[o]); obstacles[o].hp -= prismDmg(_pulsarProj, obstacles[o]); if (proj.type === 11) obstacles[o].burnTimer = 120; projHit = true;
                        if (proj.type !== 2 && proj.pierceCount <= 0) break; 
                    } 
                }
                if (!projHit || proj.type === 2 || proj.pierceCount > 0) {
                    for (let e = enemies.length - 1; e >= 0; e--) { 
                        if (checkAABB(proj, enemies[e]) && !proj.hitIds.has(enemies[e])) { 
                            proj.hitIds.add(enemies[e]); enemies[e].hp -= prismDmg(_pulsarProj, enemies[e]); if (proj.type === 11) enemies[e].burnTimer = 120; projHit = true;
                            if (proj.type !== 2 && proj.pierceCount <= 0) break; 
                        } 
                    }
                }
                // QUAN TRIEU HOI cua boss: dung dung vong va cham nay chu khong phai mot duong rieng,
                // de moi loai dan (Inferno, Prism, Pulsar...) deu ap dung cung mot luat.
                if (!projHit || proj.type === 2 || proj.pierceCount > 0) {
                    for (let b2 of bosses){
                        if (typeof b2.minionTargets !== 'function') continue;
                        let ms2 = b2.minionTargets();
                        for (let mi = ms2.length - 1; mi >= 0; mi--){
                            let mm = ms2[mi];
                            if (!mm || mm.hp <= 0 || proj.hitIds.has(mm)) continue;
                            if (!checkAABB(proj, mm)) continue;
                            proj.hitIds.add(mm);
                            mm.hp -= prismDmg(_pulsarProj, mm);
                            if (mm.hp <= 0 && mm.dead !== undefined) mm.dead = true;
                            if (proj.type === 11 && mm.burnTimer !== undefined) mm.burnTimer = 120;
                            projHit = true;
                            if (proj.type !== 2 && proj.pierceCount <= 0) break;
                        }
                        if (projHit && proj.type !== 2 && proj.pierceCount <= 0) break;
                    }
                }
                if (!projHit || proj.type === 2 || proj.pierceCount > 0) {
                    for (let b = bosses.length - 1; b >= 0; b--) { 
                        if (checkAABB(proj, bosses[b]) && !proj.hitIds.has(bosses[b])) { 
                            if (bosses[b].headWeak && proj.y < bosses[b].y + (bosses[b].headZone || 100)) {
                                bosses[b].headHits = (bosses[b].headHits || 0) + 1;
                                if (bosses[b].headHits >= 3) {
                                    damageBossWithFirstStrike(bosses[b], 1); bosses[b].headHits = 0;
                                    visualEffects.push(new Effect(proj.x, proj.y, 'explosion'));
                                }
                            }
                            
// Clone Boss Nerf: Chặn tối đa 3 hit, xuyên và sét vượt qua thẳng khiên
                            if (bosses[b].name === "VOLT REX") {
                                if (bosses[b].invulnAll) { proj.hitIds.add(bosses[b]); }   // dang VAO -> mien nhiem
                                else {
                                    let special = (proj.type===2 || proj.type===4 || proj.type===10 || proj.type===11 || proj.pierceCount>0);   // xuyen/set/lua/ult -> KHONG ne duoc
                                    if (!special && bosses[b].dodgeCharges > 0) {
                                        proj.hitIds.add(bosses[b]); bosses[b].jitter = 6; bosses[b].dodgeCharges--; bosses[b].dodgeReCd = 90;   // NE (het 3 lan thi dinh)
                                        visualEffects.push(new Effect(bosses[b].x + bosses[b].w/2, proj.y, 'lightning_shock'));
                                    } else {
                                        proj.hitIds.add(bosses[b]); damagePrismBossWithRunes(bosses[b], _pulsarProj); if (proj.type === 11) bosses[b].burnTimer = 120; projHit = true;
                                    }
                                }
                            } else if (bosses[b].role === 'block' && bosses[b].shieldHits > 0) {
                                // KHIEN cua con VANG: lua/xuyen xuyen thang, set bi chan nhung no mat mau, thuong thi tan khien
                                if (proj.type===11 || proj.type===2 || proj.pierceCount>0){ proj.hitIds.add(bosses[b]); damageBossFromAmmo(bosses[b], prismDmg(_pulsarProj, bosses[b])); if (proj.type===11) bosses[b].burnTimer=120; projHit=true; }
                                else if (proj.type===4){ proj.hitIds.add(bosses[b]); damageBossWithFirstStrike(bosses[b], 1); visualEffects.push(new Effect(bosses[b].x+bosses[b].w/2, proj.y, 'lightning_shock')); projHit=true; }
                                else { proj.hitIds.add(bosses[b]); bosses[b].shieldHits--; if (bosses[b].shieldHits<=0){ bosses[b].shieldRegen=200; visualEffects.push(new Effect(bosses[b].x+bosses[b].w/2, bosses[b].y, 'explosion', true, 14)); } else visualEffects.push(new Effect(bosses[b].x+(bosses[b].facingLeft?0:bosses[b].w), proj.y, 'parry')); projHit=true; }
                            } else if (bosses[b].name === "AEGIS REX") {
                                proj.hitIds.add(bosses[b]);
                                if (bosses[b].invulnAll) { visualEffects.push(new Effect(bosses[b].x + bosses[b].w/2, proj.y, 'parry', false)); }
                                else if (bosses[b].shieldBrokenTimer > 0) { damageBossFromAmmo(bosses[b], prismDmg(_pulsarProj, bosses[b])); if (proj.type === 11) bosses[b].burnTimer = 120; }
                                else { bosses[b].hitShield(aegisShieldDmg(proj), bosses[b].x + (bosses[b].facingLeft ? 0 : bosses[b].w), proj.y); }
                                projHit = true;
                            } else if (bosses[b].name === "HELIOS REX" && (bosses[b].shieldTimer > 0 || bosses[b].spamShieldTimer > 0 || bosses[b].state.includes('clone_dash') || bosses[b].state === 'clone_bounce_back' || bosses[b].state === 'clone_wait') && proj.type !== 2 && proj.pierceCount <= 0) {
                                if (bosses[b].shieldHp > 0) {
                                    visualEffects.push(new Effect(bosses[b].x - 10, proj.y, 'parry', false)); 
                                    bosses[b].shieldHp--;
                                    projHit = true; 
                                } else {
                                    proj.hitIds.add(bosses[b]); damagePrismBossWithRunes(bosses[b], _pulsarProj); if (proj.type === 11) bosses[b].burnTimer = 120; projHit = true;
                                }
                            } else {
                                proj.hitIds.add(bosses[b]);
                                let _dmgMul = (bosses[b].dmgMul || 1) * ((bosses[b].name === "SIEGE GOLIATH" && bosses[b].state === 'overheat') ? 2 : 1);   // CUA SO QUA NHIET: dmg gap doi
                                damagePrismBossWithRunes(bosses[b], _pulsarProj, _dmgMul); if (proj.type === 11) bosses[b].burnTimer = 120; projHit = true;
                            }
                            if (proj.type !== 2 && proj.pierceCount <= 0) break;
                        } 
                    }
                }
                
                if (projHit) { SFX.hit(); }   // @@HE-STYLISH: diem tinh theo sat thuong o styTick
                // HOA AN: cam vao muc tieu vua trung, dem nguoc roi phat no
                if (projHit && proj.brand && !proj._branded) {
                    proj._branded = true;
                    let bt2 = null, bx2 = proj.x + proj.w/2, by2 = proj.y + proj.h/2, bd2 = 99999;
                    for (let o of bosses.concat(enemies)) { if (o.invulnAll) continue;
                        let d = Math.hypot((o.x+o.w/2)-bx2, (o.y+o.h/2)-by2); if (d < bd2) { bd2 = d; bt2 = o; } }
                    fireBrands.push({ tgt: bt2, x: bx2, y: by2, t: 0, oc: proj.oc || 0 });
                    while (fireBrands.length > 2) fireBrands.shift();
                    visualEffects.push(new Effect(bx2, by2, 'explosion', true, 22));
                }
                // PHAN HACH: cau lon trung dich -> NO LAN + vo thanh 6 manh tu tim muc tieu gan nhat
                if (projHit && proj.fission && !proj._split) noPhanHach(proj);
                if (projHit && (proj.pulseNo || proj._pulseSet)) pulseSieuTrung(proj);   // @@HE-PULSE-ST
                // AWAKENED: NOVA — dan XUYEN no o MOI lan va cham, khong doi den luc dan tan
                // Truoc day cong nay doi (proj.type === 2 || proj.pierceCount > 0) — tuc CHI dan XUYEN
                // moi no. Do duoc: Pulse / Inferno / Rapidfire / Prism ban 20 giay ra DUNG 0 lan no,
                // trong khi mo ta rune ghi "dung duoc voi MOI loai dan". Bo dieu kien do di.
                // @@HE-MIDAS-VE: chuong Hadoken cham la NO (duong PvE). Cong o day chu khong
                // trong khoi 'explshot' ben duoi, vi khoi do doi phai deo rune moi chay.
                if (projHit && proj && proj.midasHado && typeof midasHadoNo === 'function') midasHadoNo(proj);
                if (projHit && hasRune('explshot')) {
                    let _nr = (proj.type === 7 || proj.type === 8) ? 46 : 34;   // nhat chem tam xa: no to hon mot chut
                    novaBlast(proj.x + proj.w/2, proj.y + proj.h/2, _nr, 1, proj.hitIds, 0, 'explosion');
                }
                // @@HE-CUSNO — nhanh NO cua Custom: dat mot vu no CHO o cho vien dan cham
                if (projHit && proj && proj.cus && typeof cusCapCua === 'function' && cusCapCua('no') > 0)
                    cusNoDat(proj.x + proj.w/2, proj.y + proj.h/2);
                // @@HE-CUSTOA — xuyen xong thi HEN mot chum no o cach do 3cm ve phia truoc
                if (projHit && proj && proj.cusToa && typeof cusToaHenDat === 'function')
                    cusToaHenDat(proj, proj.x + proj.w/2, proj.y + proj.h/2);
                // @@HE-CUSTT — qua phao cham la NO MOT VUNG
                if (projHit && proj && proj.cusTT && !proj._cusTTNo){
                    proj._cusTTNo = 1;
                    cusTTNo(proj.x + proj.w/2, proj.y + proj.h/2, proj.dmg, proj.hitIds);
                }
                // @@HE-CUSULT — TEN LUA cham la NO NGAY (khong cho mot giay nhu nhanh NO)
                if (projHit && proj && proj.cusTL && !proj._cusTLXong){
                    proj._cusTLXong = 1;
                    cusTLNo(proj.x + proj.w/2, proj.y + proj.h/2, proj.dmg, proj.hitIds);
                }
                if (projHit && proj.type !== 2) {
                    proj.pierceCount--;
                    if (proj.pierceCount < 0) {
                        let _baseExpl = (proj.type === 3 || proj.type === 4 || proj.type === 10);
                        let _isExplAmmo = _baseExpl || proj.type === 11;   // Inferno (dan lua) cung la DAN NO
                        let _boom = hasRune('explshot');
                        if (_baseExpl || _boom) { 
                            let _isU = proj.type === 10, _rr = _isU ? 66 : 40;
                            if (!_isExplAmmo && _boom) _rr = 34;           // dan thuong + rune: no vua
                            if (_isExplAmmo && _boom) _rr *= 2;            // dan no (gom Inferno) + rune: TO GAP DOI
                            visualEffects.push(new Effect(proj.x + proj.w/2, proj.y + proj.h/2, (_isU ? 'exp_blue' : 'explosion'), true, _rr)); 
                            let aoeRect = { x: proj.x + proj.w/2 - _rr, y: proj.y + proj.h/2 - _rr, w: _rr*2, h: _rr*2 };
                            let expDmg = _isU ? 5 : (_isExplAmmo ? 2 : 1);
                            if (_isExplAmmo && _boom) expDmg *= 2;   // NOVA: cau lua charge Inferno no to hon VA gap doi dmg
                            if (gameState !== 'pvp') {
                                // MUC TIEU GOC (da an dmg truc tiep) KHONG an them dmg no.
                                // NGOAI LE: dan co dmg goc = 0 (vd ULT cua Pulse) thi toan bo sat thuong nam o vu no
                                // -> khong duoc loai tru, neu khong don do gay dung 0 dmg.
                                let _skip = (proj.dmg > 0) ? proj.hitIds : null;
                                let _ex = (o) => _skip ? _skip.has(o) : false;
                                obstacles.forEach(o => { if(!_ex(o) && checkAABB(aoeRect, o)) o.hp -= expDmg; });
                                allTargets().forEach(e => { if(bosses.indexOf(e) < 0 && !_ex(e) && checkAABB(aoeRect, e)) e.hp -= expDmg; });
                                bosses.forEach(b => { if(!_ex(b) && checkAABB(aoeRect, b)) damageBossWithFirstStrike(b, expDmg); });
                            } else {
                                let target = pvpDich(proj.owner === 2 ? dino2 : pvpNguoi1());
                                if(target && checkAABB(aoeRect, target)) {
                                    if (!target.isShielding()) pvpVoBoc(target).takeDamage(expDmg);
                                    else visualEffects.push(new Effect(target.x + (target.isFacingLeft ? target.w : 0), target.y, 'parry'));
                                }
                            }
                        }
                        projectiles.splice(p, 1);
                    }
                }
                if (typeof sgHitDone === 'function') sgHitDone(_sgHit);
            }
        }
// PLAYER_PART_END s6.checkCollisions.1
