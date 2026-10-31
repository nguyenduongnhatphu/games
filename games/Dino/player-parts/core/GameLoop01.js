// PLAYER_FILE: GameLoop01
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: AA_CHIEU, AIVO_BOSS, DPR, DT_NO_MAX, Effect, FloatingText, KL, LH_NO_MAX, OCEAN_SURF, QS_BAY, R14, SFX, _chamKhung, aaTick, addStyle, aiPhanUngNhay, aiQuetInput, aivoGan, allTargets, ammoToiDa, apexOn, battuLuoi, bienDayHT, bossDuelUpdate, bossProjRaNgoai, bossProjectiles, bossSfxActive, bossSfxPrevBP, bossUpdateWithTaunt, bosses, bzVeDem, camX, camY, canvas, chongKhong, cloneGauntlet, combatStance, cryoTick, cryoVe, cryoVeBaoTuyet, cryoVeUlt, ctx, currentAmmoType, cusAcTick, cusAcVe, cusCgTick, cusCgVe, cusChDem, cusGbTick, cusGbVe, cusKvTick, cusKvVe, cusLaserVe, cusMtTick, cusMtVe, cusNkTick, cusNkVe, cusNoLonVe, cusNoTick, cusNoVe, cusPtTick, cusPtVe, cusQNVe, cusQdTick, cusQdVe, cusRgTick, cusRgVe, cusStandTick, cusStandVe, cusTTTick, cusTTVe, cusTlTick, cusTlVe, cusToaHenTick, cusToaVe, cusUfoVeHutBoss, cusUltTick, cusUzTick, cusUzVe, cusVeTanChay, danteTick, deathCineActive, defManHinh, defMode, defTick, dino, dino2, dkChung, dojoMode, dojoRefillUltimates, dragDanTick, dragonBat, drawBrSelect, drawColossalTag, drawCornerWarnRing, drawCustomMenu, drawDefHud, drawDefThang, drawDefense, drawDuelHud, drawDuelTune, drawEnvironment, drawGauntletGate, drawGrazeFlash, drawLightningEffects, drawMapSelect, drawPauseMenu, drawPvPSetup, drawRoute, drawSelfTest, drawSoBoss, drawTestMenu, drawUnityUlt, dtNo, dtT, dtTick, dtVe, duelMode, duelOver, duelProjectileTick, duelWinner, enemies, floatingTexts, frames, gameOver, gameState, gameVictory, gauntletGate, giaoSong, giaoTickSong, giaoVeSong, grazeFlashTimer, handleEnemyDeath, hasRune, hearts, hitstopTimer, installFirstStrikeHooks, katBat, keys, khienLuotTick, khienVeManh, klDuocGhi, klLuu, lanBoPhim1, lanKhach, lanNhipTrangThai, lanVienP1, lanVoiP2, lanVoiPhim, laserBlockFlag, laserEngageHp, laserEngaged, laserFireTimer, laserSlamFlag, lh, lhDongBo, lhTick, lhVe, mapTheme, midasHakiCham, midasTick, midasTickVang, midasTickVangTatCa, midasVeHakiVien, novaMoiTick, novaMoiVe, novaTickBom, novaVeBom, obstacles, oceanCamY, paused, platforms, processBossDefeat, projRaNgoai, projectiles, pulseSetTick, pulseSetVe, pvpDiem, pvpLuat, pvpRuneCanh, qsChoDichChay, qsDungGio, qsVe, qsVeDao, r14KetThuc, r14SauTran, r14Ve, rgcTick, ruDayTick, runDeathCinematic, score, sdtTick, sdtTickSau, setCanTickFx, setCanVeFx, shakeTimer, spawnEntities, sssArmed, startDojo, styTick, styleFlash, styleGrace, stylePoints, styleRankIdx, styleRankNow, tdTick, testBossSelection, tetrisCamY, tickTimBoss, tlBat, tlTick, tlVe, trdDongBo, trdTick, trdVe, trdVeNenUlt, ttTick, ttTran, ttVeTongKet, ultCharge, uniChamT, updateBulletClash, updateLeafPlatforms, updateOceanPads, veThanhMauConThieu, veVienCham, vhhChoChay, vhhVe, visualEffects, voidBat, voidCongTick, voidPhanTick, voidTeleBatDau, voidTeleTick, voidVeCong, voidVeVet, voltVeTia, wildernessOn, wildernessTick, wkgDongBo, wkgTick, wkgVe, worldL, worldR, wsChoChay, wsTick, wsTickDan, wsTickUlt, wsVe, wsVeDuong, wsVeUlt, xArmorClose, xArmorDraw, xArmorMenu, xBat, xChoi, xDongBo, xTick
// index.html:98048 · Phạm vi: loop
function __Part0(){ while(false){
// PLAYER_PART_BEGIN s6.loop.ctx.setTransform.1 EDITABLE
ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
// PLAYER_PART_END s6.loop.ctx.setTransform.1
}}

// index.html:98049 · Phạm vi: loop
function __Part1(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.1 EDITABLE
if(xArmorMenu){if(!xBat()||!xChoi||gameOver||gameVictory)xArmorClose();else{xArmorDraw();return;}}
// PLAYER_PART_END s6.loop.IfStatement.1
}}

// index.html:98050 · Phạm vi: loop
function __Part2(){ while(false){
// PLAYER_PART_BEGIN s6.loop.installFirstStrikeHooks.1 EDITABLE
installFirstStrikeHooks();
// PLAYER_PART_END s6.loop.installFirstStrikeHooks.1
}}

// index.html:98051 · Phạm vi: loop
function __Part3(){ while(false){
// PLAYER_PART_BEGIN s6.loop.lanNhipTrangThai.1 EDITABLE
lanNhipTrangThai();
// PLAYER_PART_END s6.loop.lanNhipTrangThai.1
}}

// index.html:98052 · Phạm vi: loop
function __Part4(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.2 EDITABLE
if (typeof pvpRuneCanh === 'function') pvpRuneCanh();
// PLAYER_PART_END s6.loop.IfStatement.2
}}

// index.html:98053 · Phạm vi: loop
function __Part5(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.3 EDITABLE
if (gameState === 'menu' && R14) r14KetThuc();
// PLAYER_PART_END s6.loop.IfStatement.3
}}

// index.html:98054 · Phạm vi: loop
function __Part6(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.4 EDITABLE
if (gameState === 'menu') { startDojo(); return; }
// PLAYER_PART_END s6.loop.IfStatement.4
}}

// index.html:98055 · Phạm vi: loop
function __Part7(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.5 EDITABLE
if (gameState === 'map_select') { drawMapSelect(); return; }
// PLAYER_PART_END s6.loop.IfStatement.5
}}

// index.html:98056 · Phạm vi: loop
function __Part8(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.6 EDITABLE
if (gameState === 'br_select') { drawBrSelect(); return; }
// PLAYER_PART_END s6.loop.IfStatement.6
}}

// index.html:98057 · Phạm vi: loop
function __Part9(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.7 EDITABLE
if (gameState === 'custom_menu') { drawCustomMenu(); frames++; drawLightningEffects(); return; }
// PLAYER_PART_END s6.loop.IfStatement.7
}}

// index.html:98058 · Phạm vi: loop
function __Part10(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.8 EDITABLE
if (gameState === 'test_menu') { drawTestMenu(); return; }
// PLAYER_PART_END s6.loop.IfStatement.8
}}

// index.html:98059 · Phạm vi: loop
function __Part11(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.9 EDITABLE
if (gameState === 'route') { if (R14) r14Ve(); else drawRoute(); return; }
// PLAYER_PART_END s6.loop.IfStatement.9
}}

// index.html:98060 · Phạm vi: loop
function __Part12(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.10 EDITABLE
if (gameState === 'duel_tune') { drawDuelTune(); return; }
// PLAYER_PART_END s6.loop.IfStatement.10
}}

// index.html:98061 · Phạm vi: loop
function __Part13(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.11 EDITABLE
if (gameState === 'selftest') { drawSelfTest(); return; }
// PLAYER_PART_END s6.loop.IfStatement.11
}}

// index.html:98062 · Phạm vi: loop
function __Part14(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.12 EDITABLE
if (gameState === 'soboss') { drawSoBoss(); return; }
// PLAYER_PART_END s6.loop.IfStatement.12
}}

// index.html:98063 · Phạm vi: loop
function __Part15(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.13 EDITABLE
if (gameState === 'pvp_setup') { drawPvPSetup(); return; }
// PLAYER_PART_END s6.loop.IfStatement.13
}}

// index.html:98065 · Phạm vi: loop
function __Part16(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.14 EDITABLE
if(typeof dino!=='undefined'&&dino&&dino.apex&&dino.apex.isCinematic()&&apexOn()&&['normal','boss_rush','test_boss'].includes(gameState)){if(paused)drawPauseMenu();else dino.apex.cinematicFrame();return;}
// PLAYER_PART_END s6.loop.IfStatement.14
}}

// index.html:98069 · Phạm vi: loop
function __Part17(){ while(false){
// PLAYER_PART_BEGIN s6.loop.battuLuoi.1 EDITABLE
battuLuoi();
// PLAYER_PART_END s6.loop.battuLuoi.1
}}

// index.html:98072 · Phạm vi: loop
function __Part18(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.15 EDITABLE
if (!gameOver && !deathCineActive && typeof dino !== 'undefined' && dino && dino.hp <= 0
                && (gameState === 'normal' || gameState === 'test_boss' || gameState === 'boss_rush') && !(typeof defMode !== 'undefined' && defMode)) dino.xuLyChet();
// PLAYER_PART_END s6.loop.IfStatement.15
}}

// index.html:98074 · Phạm vi: loop
function __Part19(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.16 EDITABLE
if (deathCineActive) { runDeathCinematic(); return; }
// PLAYER_PART_END s6.loop.IfStatement.16
}}

// index.html:98075 · Phạm vi: loop
function __Part20(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.17 EDITABLE
if (gameOver && typeof r14SauTran === 'function' && r14SauTran()) return;
// PLAYER_PART_END s6.loop.IfStatement.17
}}

// index.html:98077 · Phạm vi: loop
function __Part21(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.18 EDITABLE
if (gameOver) { SFX.stopMusic(); ttVeTongKet(false); ctx.textAlign = "left"; return; }
// PLAYER_PART_END s6.loop.IfStatement.18
}}

// index.html:98078 · Phạm vi: loop
function __Part22(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.19 EDITABLE
if (gameVictory) {
                SFX.stopMusic();
                if (!ttTran || !ttTran.daGhiCamp){ if (ttTran) ttTran.daGhiCamp = true; if (gameState === 'normal' && klDuocGhi()){ KL.camp.thang = (KL.camp.thang || 0) + 1; klLuu(); } }
                ttVeTongKet(true); ctx.textAlign = "left"; return;
            }
// PLAYER_PART_END s6.loop.IfStatement.19
}}

// index.html:98083 · Phạm vi: loop
function __Part23(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.20 EDITABLE
if (gameState === 'pvp_end') {
                ctx.fillStyle = "rgba(0,0,0,0.88)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.textAlign = "center";
                let xong = pvpDiem[0] >= pvpLuat.hiep || pvpDiem[1] >= pvpLuat.hiep;
                let ai = dino.hp > 0 ? 1 : (dino2.hp > 0 ? 2 : 0);
                ctx.font = "bold 42px Consolas, monospace";
                ctx.fillStyle = ai === 1 ? "#4CAF50" : (ai === 2 ? "#E53935" : "#FFEB3B");
                ctx.fillText(xong ? (ai === 1 ? "NGƯỜI CHƠI 1 THẮNG CHUNG CUỘC" : ai === 2 ? "NGƯỜI CHƠI 2 THẮNG CHUNG CUỘC" : "HOÀ")
                                  : (ai === 1 ? "NGƯỜI CHƠI 1 THẮNG HIỆP" : ai === 2 ? "NGƯỜI CHƠI 2 THẮNG HIỆP" : "HIỆP HOÀ"),
                             canvas.width / 2, canvas.height / 2 - 46);
                ctx.font = "bold 30px Consolas, monospace"; ctx.fillStyle = "#FFD54F";
                ctx.fillText(pvpDiem[0] + "  –  " + pvpDiem[1], canvas.width / 2, canvas.height / 2 + 4);
                ctx.font = "13px Consolas, monospace"; ctx.fillStyle = "#90A4AE";
                ctx.fillText("thắng " + pvpLuat.hiep + " hiệp là vô địch", canvas.width / 2, canvas.height / 2 + 30);
                ctx.font = "16px Consolas, monospace"; ctx.fillStyle = "white";
                ctx.fillText(lanKhach() ? "Chờ chủ phòng…"
                           : (xong ? "SPACE — về sảnh chờ" : "SPACE — đánh hiệp tiếp"),
                             canvas.width / 2, canvas.height / 2 + 66);
                return;
            }
// PLAYER_PART_END s6.loop.IfStatement.20
}}

// index.html:98104 · Phạm vi: loop
function __Part24(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.21 EDITABLE
if (paused) { drawPauseMenu(); return; }
// PLAYER_PART_END s6.loop.IfStatement.21
}}

// index.html:98105 · Phạm vi: loop
function __Part25(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.22 EDITABLE
if (hitstopTimer > 0) { hitstopTimer--; if (grazeFlashTimer > 0) grazeFlashTimer--; drawGrazeFlash(); return; }
// PLAYER_PART_END s6.loop.IfStatement.22
}}

// index.html:98106 · Phạm vi: loop
function __Part26(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.23 EDITABLE
if (typeof ttTick === 'function') ttTick();
// PLAYER_PART_END s6.loop.IfStatement.23
}}

// index.html:98107 · Phạm vi: loop
function __Part27(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.24 EDITABLE
if (typeof styTick === 'function') styTick();
// PLAYER_PART_END s6.loop.IfStatement.24
}}

// index.html:98112 · Phạm vi: loop
function __Part28(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.25 EDITABLE
if (uniChamT > 0){
                uniChamT--;
                if (uniChamT % 2 === 1){ veVienCham(); return; }
                _chamKhung = true;
            } else if (midasHakiCham > 0){                 // @@HE-HAKI: gong chieu cuoi Midas — the gioi chay nua toc
                midasHakiCham--;
                if (midasHakiCham % 2 === 1){ midasVeHakiVien(); return; }
                _chamKhung = true;
            } else _chamKhung = false;
// PLAYER_PART_END s6.loop.IfStatement.25
}}

// index.html:98121 · Phạm vi: loop
function __Part29(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.26 EDITABLE
if (wildernessOn()) wildernessTick();
// PLAYER_PART_END s6.loop.IfStatement.26
}}

// index.html:98122 · Phạm vi: loop
function __Part30(){ while(false){
// PLAYER_PART_BEGIN s6.loop.ctx.save.1 EDITABLE
ctx.save();
// PLAYER_PART_END s6.loop.ctx.save.1
}}

// index.html:98123 · Phạm vi: loop
function __Part31(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.27 EDITABLE
if (shakeTimer > 0) { ctx.translate((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8); shakeTimer--; }
// PLAYER_PART_END s6.loop.IfStatement.27
}}

// index.html:98124 · Phạm vi: loop
function __Part32(){ while(false){
// PLAYER_PART_BEGIN s6.loop.ctx.clearRect.1 EDITABLE
ctx.clearRect(0, 0, canvas.width, canvas.height);
// PLAYER_PART_END s6.loop.ctx.clearRect.1
}}

// index.html:98125 · Phạm vi: loop
function __Part33(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.28 EDITABLE
if (mapTheme === 'ocean' && typeof oceanCamY === 'number') ctx.translate(0, oceanCamY);
// PLAYER_PART_END s6.loop.IfStatement.28
}}

// index.html:98127 · Phạm vi: loop
function __Part34(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.29 EDITABLE
if (camX !== 0 || camY !== 0) ctx.translate(-camX, -camY);
// PLAYER_PART_END s6.loop.IfStatement.29
}}

// index.html:98128 · Phạm vi: loop
function __Part35(){ while(false){
// PLAYER_PART_BEGIN s6.loop.drawEnvironment.1 EDITABLE
drawEnvironment();
// PLAYER_PART_END s6.loop.drawEnvironment.1
}}

// index.html:98129 · Phạm vi: loop
function __Part36(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.30 EDITABLE
if (typeof bzVeDem === 'function' && typeof dino !== 'undefined' && dino && dino.dk && dino.dk.ult && dino.dk.ult.bz) bzVeDem(dino);
// PLAYER_PART_END s6.loop.IfStatement.30
}}

// index.html:98130 · Phạm vi: loop
function __Part37(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.31 EDITABLE
if (typeof trdVeNenUlt === 'function') trdVeNenUlt();
// PLAYER_PART_END s6.loop.IfStatement.31
}}

// index.html:98131 · Phạm vi: loop
function __Part38(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.32 EDITABLE
if (mapTheme === 'tetris' && typeof tetrisCamY === 'number') ctx.translate(0, tetrisCamY);
// PLAYER_PART_END s6.loop.IfStatement.32
}}

// index.html:98132 · Phạm vi: loop
function __Part39(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.33 EDITABLE
if (cloneGauntlet && gauntletGate) drawGauntletGate();
// PLAYER_PART_END s6.loop.IfStatement.33
}}

// index.html:98133 · Phạm vi: loop
function __Part40(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.34 EDITABLE
if (defMode) { defTick(); drawDefense(); }
// PLAYER_PART_END s6.loop.IfStatement.34
}}

// index.html:98134 · Phạm vi: loop
function __Part41(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.35 EDITABLE
if (defMode) drawDefHud();
// PLAYER_PART_END s6.loop.IfStatement.35
}}

// index.html:98135 · Phạm vi: loop
function __Part42(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.36 EDITABLE
if (defMode && defManHinh === 1) drawDefThang();
// PLAYER_PART_END s6.loop.IfStatement.36
}}

// index.html:98138 · Phạm vi: loop
function __Part43(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.37 EDITABLE
if (typeof voltVeTia === 'function') voltVeTia();
// PLAYER_PART_END s6.loop.IfStatement.37
}}

// index.html:98140 · Phạm vi: loop
function __Part44(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.38 EDITABLE
if (gameState !== 'pvp') {
                spawnEntities();

                // LAP NGUOC. Truoc day dung forEach + splice(i,1): khi xoa phan tu i thi phan tu
                // ke tiep don len vi tri i nhung forEach van tang chi so -> BO SOT DUNG MOT NUA.
                // Thu nghiem: mang [1,2,3,4] chi tham duoc 1 va 3.
                for (let i = obstacles.length - 1; i >= 0; i--) {
                    let obs = obstacles[i];
                    if (qsChoDichChay()) obs.update();
                    obs.draw();
                    if (obs.burnTimer > 0) { obs.burnTimer--; if (obs.burnTimer % 60 === 0) { obs.hp -= 1; visualEffects.push(new Effect(obs.x + obs.w/2, obs.y + obs.h/2, 'explosion', true, 10)); } }
                    if (obs.hp <= 0) { obstacles.splice(i, 1); score += 10; }
                    else if (obs.x + obs.w < 0) obstacles.splice(i, 1);
                }
                for (let i = enemies.length - 1; i >= 0; i--) {
                    let en = enemies[i];
                    if (!(en._uFreeze > 0) && qsChoDichChay() && wsChoChay(en) && vhhChoChay(en)) en.update();   // @@HE-VOHAHAN
                    en.draw();
                    if (en.burnTimer > 0) { en.burnTimer--; if (en.burnTimer % 60 === 0) { en.hp -= 1; visualEffects.push(new Effect(en.x + en.w/2, en.y + en.h/2, 'explosion', true, 10)); } }
                    if (en.hp <= 0) { handleEnemyDeath(en); enemies.splice(i, 1); }
                    else if (en.x + en.w < 0) enemies.splice(i, 1);
                }
                for (let i = hearts.length - 1; i >= 0; i--) { let h = hearts[i]; h.update(); h.draw(); if (h.x + h.w < 0) hearts.splice(i, 1); }
                for (let i = bossProjectiles.length - 1; i >= 0; i--) { let bp = bossProjectiles[i]; if (qsChoDichChay() && vhhChoChay(bp)) bp.update(); bp.draw(); if (bossProjRaNgoai(bp)) bossProjectiles.splice(i, 1); }
                updateBulletClash();
                tickTimBoss();
                if (typeof vhhVe === 'function') vhhVe();   // @@HE-VOHAHAN
                if (typeof tdTick === 'function') tdTick();   // @@HE-TUDIA
                if (typeof ruDayTick === 'function') ruDayTick();   // @@HE-APSUAT / @@HE-VANXA: day lui
                if (typeof rgcTick === 'function') rgcTick();        // @@HE-RGC
            }
// PLAYER_PART_END s6.loop.IfStatement.38
}}

// index.html:98174 · Phạm vi: loop
function __Part45(){ while(false){
// PLAYER_PART_BEGIN s6.loop.ForStatement.1 EDITABLE
for (let i = projectiles.length - 1; i >= 0; i--) { let proj = projectiles[i];
                // QUICKSILVER: dan bay QS_BAY khung roi DUNG LAI GIUA KHONG TRUNG nhu dao cua DIO.
                // Het chieu, thoi gian chay lai -> tat ca cung bay tiep mot luc.
                let treo = false;
                if (qsDungGio()){ proj._qsAge = (proj._qsAge || 0) + 1; if (proj._qsAge > QS_BAY) treo = true; }
                else proj._qsAge = 0;
                if (!treo) proj.update();
                if (!proj._cusToaCon) proj.draw();   // @@HE-CUSTOA: vien con de `cusToaVeTren` ve
                if (treo) qsVeDao(proj);
                if (projRaNgoai(proj)) projectiles.splice(i, 1); }
// PLAYER_PART_END s6.loop.ForStatement.1
}}

// index.html:98185 · Phạm vi: loop
function __Part46(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.39 EDITABLE
if (duelMode && dino){ dino.invincible = true; if (dino.invTimer < 30) dino.invTimer = 30; }
// PLAYER_PART_END s6.loop.IfStatement.39
}}

// index.html:98186 · Phạm vi: loop
function __Part47(){ while(false){
// PLAYER_PART_BEGIN s6.loop.novaTickBom.1 EDITABLE
novaTickBom();
// PLAYER_PART_END s6.loop.novaTickBom.1
}}

// index.html:98186 · Phạm vi: loop
function __Part48(){ while(false){
// PLAYER_PART_BEGIN s6.loop.novaVeBom.1 EDITABLE
novaVeBom();
// PLAYER_PART_END s6.loop.novaVeBom.1
}}

// index.html:98186 · Phạm vi: loop
function __Part49(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.40 EDITABLE
if (typeof novaMoiTick === 'function'){ novaMoiTick(); novaMoiVe(); }
// PLAYER_PART_END s6.loop.IfStatement.40
}}

// index.html:98187 · Phạm vi: loop
function __Part50(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusNoTick.1 EDITABLE
cusNoTick();
// PLAYER_PART_END s6.loop.cusNoTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part51(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusUltTick.1 EDITABLE
cusUltTick();
// PLAYER_PART_END s6.loop.cusUltTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part52(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusNoVe.1 EDITABLE
cusNoVe();
// PLAYER_PART_END s6.loop.cusNoVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part53(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusLaserVe.1 EDITABLE
cusLaserVe();
// PLAYER_PART_END s6.loop.cusLaserVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part54(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusRgTick.1 EDITABLE
cusRgTick();
// PLAYER_PART_END s6.loop.cusRgTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part55(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusRgVe.1 EDITABLE
cusRgVe();
// PLAYER_PART_END s6.loop.cusRgVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part56(){ while(false){
// PLAYER_PART_BEGIN s6.loop.pulseSetTick.1 EDITABLE
pulseSetTick();
// PLAYER_PART_END s6.loop.pulseSetTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part57(){ while(false){
// PLAYER_PART_BEGIN s6.loop.pulseSetVe.1 EDITABLE
pulseSetVe();
// PLAYER_PART_END s6.loop.pulseSetVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part58(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusPtTick.1 EDITABLE
cusPtTick();
// PLAYER_PART_END s6.loop.cusPtTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part59(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusPtVe.1 EDITABLE
cusPtVe();
// PLAYER_PART_END s6.loop.cusPtVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part60(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusCgTick.1 EDITABLE
cusCgTick();
// PLAYER_PART_END s6.loop.cusCgTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part61(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusCgVe.1 EDITABLE
cusCgVe();
// PLAYER_PART_END s6.loop.cusCgVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part62(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusTlTick.1 EDITABLE
cusTlTick();
// PLAYER_PART_END s6.loop.cusTlTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part63(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusTlVe.1 EDITABLE
cusTlVe();
// PLAYER_PART_END s6.loop.cusTlVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part64(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusAcTick.1 EDITABLE
cusAcTick();
// PLAYER_PART_END s6.loop.cusAcTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part65(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusAcVe.1 EDITABLE
cusAcVe();
// PLAYER_PART_END s6.loop.cusAcVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part66(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusKvTick.1 EDITABLE
cusKvTick();
// PLAYER_PART_END s6.loop.cusKvTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part67(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusGbTick.1 EDITABLE
cusGbTick();
// PLAYER_PART_END s6.loop.cusGbTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part68(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusGbVe.1 EDITABLE
cusGbVe();
// PLAYER_PART_END s6.loop.cusGbVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part69(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusKvVe.1 EDITABLE
cusKvVe();
// PLAYER_PART_END s6.loop.cusKvVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part70(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusStandTick.1 EDITABLE
cusStandTick();
// PLAYER_PART_END s6.loop.cusStandTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part71(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusStandVe.1 EDITABLE
cusStandVe();
// PLAYER_PART_END s6.loop.cusStandVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part72(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusQdTick.1 EDITABLE
cusQdTick();
// PLAYER_PART_END s6.loop.cusQdTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part73(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusQdVe.1 EDITABLE
cusQdVe();
// PLAYER_PART_END s6.loop.cusQdVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part74(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusToaHenTick.1 EDITABLE
cusToaHenTick();
// PLAYER_PART_END s6.loop.cusToaHenTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part75(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusToaVe.1 EDITABLE
cusToaVe();
// PLAYER_PART_END s6.loop.cusToaVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part76(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusTTTick.1 EDITABLE
cusTTTick();
// PLAYER_PART_END s6.loop.cusTTTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part77(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusTTVe.1 EDITABLE
cusTTVe();
// PLAYER_PART_END s6.loop.cusTTVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part78(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusChDem.1 EDITABLE
cusChDem();
// PLAYER_PART_END s6.loop.cusChDem.1
}}

// index.html:98187 · Phạm vi: loop
function __Part79(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusQNVe.1 EDITABLE
cusQNVe();
// PLAYER_PART_END s6.loop.cusQNVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part80(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusNkTick.1 EDITABLE
cusNkTick();
// PLAYER_PART_END s6.loop.cusNkTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part81(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusNkVe.1 EDITABLE
cusNkVe();
// PLAYER_PART_END s6.loop.cusNkVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part82(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusUzTick.1 EDITABLE
cusUzTick();
// PLAYER_PART_END s6.loop.cusUzTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part83(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusUzVe.1 EDITABLE
cusUzVe();
// PLAYER_PART_END s6.loop.cusUzVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part84(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusMtTick.1 EDITABLE
cusMtTick();
// PLAYER_PART_END s6.loop.cusMtTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part85(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusMtVe.1 EDITABLE
cusMtVe();
// PLAYER_PART_END s6.loop.cusMtVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part86(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cusNoLonVe.1 EDITABLE
cusNoLonVe();
// PLAYER_PART_END s6.loop.cusNoLonVe.1
}}

// index.html:98187 · Phạm vi: loop
function __Part87(){ while(false){
// PLAYER_PART_BEGIN s6.loop.khienLuotTick.1 EDITABLE
khienLuotTick();
// PLAYER_PART_END s6.loop.khienLuotTick.1
}}

// index.html:98187 · Phạm vi: loop
function __Part88(){ while(false){
// PLAYER_PART_BEGIN s6.loop.khienVeManh.1 EDITABLE
khienVeManh();
// PLAYER_PART_END s6.loop.khienVeManh.1
}}

// index.html:98188 · Phạm vi: loop
function __Part89(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cryoTick.1 EDITABLE
cryoTick();
// PLAYER_PART_END s6.loop.cryoTick.1
}}

// index.html:98188 · Phạm vi: loop
function __Part90(){ while(false){
// PLAYER_PART_BEGIN s6.loop.cryoVe.1 EDITABLE
cryoVe();
// PLAYER_PART_END s6.loop.cryoVe.1
}}

// index.html:98188 · Phạm vi: loop
function __Part91(){ while(false){
// PLAYER_PART_BEGIN s6.loop.wsTick.1 EDITABLE
wsTick();
// PLAYER_PART_END s6.loop.wsTick.1
}}

// index.html:98188 · Phạm vi: loop
function __Part92(){ while(false){
// PLAYER_PART_BEGIN s6.loop.wsTickDan.1 EDITABLE
wsTickDan();
// PLAYER_PART_END s6.loop.wsTickDan.1
}}

// index.html:98188 · Phạm vi: loop
function __Part93(){ while(false){
// PLAYER_PART_BEGIN s6.loop.wsVe.1 EDITABLE
wsVe();
// PLAYER_PART_END s6.loop.wsVe.1
}}

// index.html:98188 · Phạm vi: loop
function __Part94(){ while(false){
// PLAYER_PART_BEGIN s6.loop.wsVeDuong.1 EDITABLE
wsVeDuong();
// PLAYER_PART_END s6.loop.wsVeDuong.1
}}

// index.html:98189 · Phạm vi: loop
function __Part95(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.41 EDITABLE
if (typeof tlTick === 'function'){ tlTick(); tlVe(); }
// PLAYER_PART_END s6.loop.IfStatement.41
}}

// index.html:98190 · Phạm vi: loop
function __Part96(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.42 EDITABLE
if (typeof voidBat === 'function' && (voidBat() || dragonBat())) combatStance = 0;
// PLAYER_PART_END s6.loop.IfStatement.42
}}

// index.html:98191 · Phạm vi: loop
function __Part97(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.43 EDITABLE
if (typeof wkgDongBo === 'function'){ wkgDongBo(); wkgTick(); wkgVe(); }
// PLAYER_PART_END s6.loop.IfStatement.43
}}

// index.html:98192 · Phạm vi: loop
function __Part98(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.44 EDITABLE
if (typeof trdDongBo === 'function'){ trdDongBo(); trdTick(); trdVe(); }
// PLAYER_PART_END s6.loop.IfStatement.44
}}

// index.html:98193 · Phạm vi: loop
function __Part99(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.45 EDITABLE
if (typeof lhDongBo === 'function'){ lhDongBo(); lhTick(); lhVe(); }
// PLAYER_PART_END s6.loop.IfStatement.45
}}

// index.html:98194 · Phạm vi: loop
function __Part100(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.46 EDITABLE
if (typeof xDongBo === 'function') xDongBo();
// PLAYER_PART_END s6.loop.IfStatement.46
}}

// index.html:98195 · Phạm vi: loop
function __Part101(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.47 EDITABLE
if (typeof dkChung === 'function') dkChung();
// PLAYER_PART_END s6.loop.IfStatement.47
}}

// index.html:98196 · Phạm vi: loop
function __Part102(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.48 EDITABLE
if (typeof dino !== 'undefined' && dino && (currentAmmoType === 5 || currentAmmoType === 10 || currentAmmoType === 11) && !dino.ultActive){   // @@HE-THELUC
                let _mx = ammoToiDa(currentAmmoType);
                if (dino.maxAmmo !== _mx){ dino.maxAmmo = _mx; if (dino.ammo > _mx) dino.ammo = _mx; }
            }
// PLAYER_PART_END s6.loop.IfStatement.48
}}

// index.html:98201 · Phạm vi: loop
function __Part103(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.49 EDITABLE
if (typeof dojoMode !== 'undefined' && dojoMode){
                if (typeof dtNo !== 'undefined' && dtT <= 0) dtNo = DT_NO_MAX;
                if (typeof lh !== 'undefined' && lh && lh.bien === 0) lh.no = LH_NO_MAX;   // @@HE-LUOIHAI
                dojoRefillUltimates();
            }
// PLAYER_PART_END s6.loop.IfStatement.49
}}

// index.html:98206 · Phạm vi: loop
function __Part104(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.50 EDITABLE
if (typeof dtTick === 'function'){ dtTick(); }
// PLAYER_PART_END s6.loop.IfStatement.50
}}

// index.html:98207 · Phạm vi: loop
function __Part105(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.51 EDITABLE
if (typeof sdtTick === 'function') sdtTick();
// PLAYER_PART_END s6.loop.IfStatement.51
}}

// index.html:98208 · Phạm vi: loop
function __Part106(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.52 EDITABLE
if (typeof dragDanTick === 'function') dragDanTick();
// PLAYER_PART_END s6.loop.IfStatement.52
}}

// index.html:98209 · Phạm vi: loop
function __Part107(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.53 EDITABLE
if (typeof setCanTickFx === 'function'){ setCanTickFx(); setCanVeFx(); }
// PLAYER_PART_END s6.loop.IfStatement.53
}}

// index.html:98210 · Phạm vi: loop
function __Part108(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.54 EDITABLE
if (typeof dtVe === 'function') dtVe();
// PLAYER_PART_END s6.loop.IfStatement.54
}}

// index.html:98211 · Phạm vi: loop
function __Part109(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.55 EDITABLE
if (typeof allTargets === 'function') allTargets().forEach(o => { if (o && o._dtCd > 0) o._dtCd--; });
// PLAYER_PART_END s6.loop.IfStatement.55
}}

// index.html:98213 · Phạm vi: loop
function __Part110(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.56 EDITABLE
if (typeof voidBat === 'function' && voidBat() && dino && !dino.grounded && !dino._voidTe
                && (keys['KeyS'] || keys['ArrowDown']) && !dino.jcState && !dino.ultActive
                && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')){
                let _d = 320 - dino.h;
                for (let _pf of platforms){
                    let _t = _pf.top !== undefined ? _pf.top : _pf.y;
                    if (_t > dino.y + dino.h && _t - dino.h < _d) _d = _t - dino.h;
                }
                if (_d > dino.y + 4) voidTeleBatDau(dino.x, _d);
            }
// PLAYER_PART_END s6.loop.IfStatement.56
}}

// index.html:98223 · Phạm vi: loop
function __Part111(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.57 EDITABLE
if (typeof voidTeleTick === 'function'){ voidTeleTick(); voidVeVet(); }
// PLAYER_PART_END s6.loop.IfStatement.57
}}

// index.html:98224 · Phạm vi: loop
function __Part112(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.58 EDITABLE
if (typeof voidPhanTick === 'function') voidPhanTick();
// PLAYER_PART_END s6.loop.IfStatement.58
}}

// index.html:98225 · Phạm vi: loop
function __Part113(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.59 EDITABLE
if (typeof voidCongTick === 'function'){ voidCongTick(); voidVeCong(); }
// PLAYER_PART_END s6.loop.IfStatement.59
}}

// index.html:98226 · Phạm vi: loop
function __Part114(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.60 EDITABLE
if (dino && dino.hoverTick) dino.hoverTick();
// PLAYER_PART_END s6.loop.IfStatement.60
}}

// index.html:98234 · Phạm vi: loop
function __Part115(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.61 EDITABLE
if (gameState === 'pvp' && typeof lanVoiP2 === 'function' && typeof dino2 !== 'undefined' && dino2)
                lanVoiP2(() => {
                    /* CHAY HAI LUOT. Khoi nay toi them vao de vá cho P2, nhung `vuKhi2Tick()`
                       DA lam gan het nhung viec do roi — nen P2 duoc goi nhip HAI LAN moi khung.
                       Do duoc: trong 60 khung, `rfTick` chay 60 lan cho P1 nhung 120 lan cho P2,
                       tuc sung may cua P2 ban gap doi toc do dang le. Lo ra khi tim xem tai sao
                       drone cua P2 duoc ve 421 lan con cua P1 chi 80.
                       Gio khoi nay chi giu DUNG hai thu ma `vuKhi2Tick` khong co:
                         - xe tang (nhip VA hinh) — phai nam o day, cung cho voi duong cua P1,
                           vi day la giai doan VE; dat trong vuKhi2Tick se lech phep bien camera
                           dung nhu loi cau lua Dragon lech 160px.
                         - chieu cuoi Whisper.                                                */
                    if (dino && dino.tank && dino.rfTickTank){
                        if (!(typeof tlBat === 'function' && tlBat())) combatStance = 0;
                        dino.rfTickTank();
                    }
                    if (dino && dino.wsUlt){ wsTickUlt(); wsVeUlt(); }
                    // @@HE-PVPCUS — luoi Thien La, Kiem Vu, Vuong Kho, Van Kiem cua P2 (bo trang thai rieng)
                    cusTlTick(); cusTlVe(); cusKvTick(); cusGbTick(); cusGbVe(); cusKvVe();
                    // @@HE-P2KHOA — Channel Custom cua P2 (bo rieng): dong ho UFO, Qua Nhiet / UFO, Uzumaki, Mua Ten
                    cusChDem(); cusQNVe(); cusUzTick(); cusUzVe(); cusMtTick(); cusMtVe();
                });
// PLAYER_PART_END s6.loop.IfStatement.61
}}

// index.html:98256 · Phạm vi: loop
function __Part116(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.62 EDITABLE
if (dino) { midasTick(dino); midasTickVang(dino); }
// PLAYER_PART_END s6.loop.IfStatement.62
}}

// index.html:98257 · Phạm vi: loop
function __Part117(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.63 EDITABLE
if (typeof midasTickVangTatCa === 'function') midasTickVangTatCa();
// PLAYER_PART_END s6.loop.IfStatement.63
}}

// index.html:98258 · Phạm vi: loop
function __Part118(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.64 EDITABLE
if (dino && currentAmmoType === 5 && dino.dswVeNap) dino.dswVeNap();
// PLAYER_PART_END s6.loop.IfStatement.64
}}

// index.html:98259 · Phạm vi: loop
function __Part119(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.65 EDITABLE
if (dino && currentAmmoType === 10 && dino.giaoTick) dino.giaoTick();
// PLAYER_PART_END s6.loop.IfStatement.65
}}

// index.html:98260 · Phạm vi: loop
function __Part120(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.66 EDITABLE
if (dino && currentAmmoType === 13 && dino.venomTick){ dino.venomTick(); dino.venomVe(); }
// PLAYER_PART_END s6.loop.IfStatement.66
}}

// index.html:98261 · Phạm vi: loop
function __Part121(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.67 EDITABLE
if (dino && typeof katBat === 'function' && katBat(currentAmmoType) && dino.katanaVe) dino.katanaVe();
// PLAYER_PART_END s6.loop.IfStatement.67
}}

// index.html:98262 · Phạm vi: loop
function __Part122(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.68 EDITABLE
if (dino && currentAmmoType === 11 && dino.buaTick) dino.buaTick();
// PLAYER_PART_END s6.loop.IfStatement.68
}}

// index.html:98265 · Phạm vi: loop
function __Part123(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.69 EDITABLE
if (typeof giaoSong !== 'undefined' && giaoSong.length && currentAmmoType !== 10){
                giaoTickSong(); giaoVeSong();
            }
// PLAYER_PART_END s6.loop.IfStatement.69
}}

// index.html:98268 · Phạm vi: loop
function __Part124(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.70 EDITABLE
if (dino && dino.rfTick){ dino.rfTick(); if (dino.rapidDrone){ dino.rfTickDrone(); dino.rfVeDrone(); } if (dino.tank){ if (!(typeof tlBat === 'function' && tlBat())) combatStance = 0; dino.rfTickTank(); } }
// PLAYER_PART_END s6.loop.IfStatement.70
}}

// index.html:98269 · Phạm vi: loop
function __Part125(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.71 EDITABLE
if (dino && dino.wsUlt){ wsTickUlt(); }
// PLAYER_PART_END s6.loop.IfStatement.71
}}

// index.html:98270 · Phạm vi: loop
function __Part126(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.72 EDITABLE
if (dino && dino.cryoBucTuong){ dino.cryoTickTuong(); dino.cryoVeTuong(); }
// PLAYER_PART_END s6.loop.IfStatement.72
}}

// index.html:98271 · Phạm vi: loop
function __Part127(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.73 EDITABLE
if (dino && dino.cryoChannel) cryoVeBaoTuyet();
// PLAYER_PART_END s6.loop.IfStatement.73
}}

// index.html:98272 · Phạm vi: loop
function __Part128(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.74 EDITABLE
if (dino && dino.wsUlt) wsVeUlt();
// PLAYER_PART_END s6.loop.IfStatement.74
}}

// index.html:98273 · Phạm vi: loop
function __Part129(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.75 EDITABLE
if (dino && dino.cryoUlt){ dino.cryoUlt.t++; cryoVeUlt(dino.cryoUlt.t, dino.cryoUlt.x); if (dino.cryoUlt.t > 200) dino.cryoUlt = null; }
// PLAYER_PART_END s6.loop.IfStatement.75
}}

// index.html:98274 · Phạm vi: loop
function __Part130(){ while(false){
// PLAYER_PART_BEGIN s6.loop.drawUnityUlt.1 EDITABLE
drawUnityUlt();
// PLAYER_PART_END s6.loop.drawUnityUlt.1
}}

// index.html:98274 · Phạm vi: loop
function __Part131(){ while(false){
// PLAYER_PART_BEGIN s6.loop.qsVe.1 EDITABLE
qsVe();
// PLAYER_PART_END s6.loop.qsVe.1
}}

// index.html:98275 · Phạm vi: loop
function __Part132(){ while(false){
// PLAYER_PART_BEGIN s6.loop.ForStatement.2 EDITABLE
for (let i = visualEffects.length - 1; i >= 0; i--) { visualEffects[i].update(); visualEffects[i].draw(); if (visualEffects[i].timer >= (visualEffects[i].life || 30)) visualEffects.splice(i, 1); }
// PLAYER_PART_END s6.loop.ForStatement.2
}}

// index.html:98276 · Phạm vi: loop
function __Part133(){ while(false){
// PLAYER_PART_BEGIN s6.loop.ForStatement.3 EDITABLE
for (let i = floatingTexts.length - 1; i >= 0; i--) { let ft = floatingTexts[i]; ft.update(); ft.draw(); if (ft.life <= 0) floatingTexts.splice(i, 1); }
// PLAYER_PART_END s6.loop.ForStatement.3
}}

// index.html:98278 · Phạm vi: loop
function __Part134(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.76 EDITABLE
if (gameState !== 'pvp') {
                if (bosses.length === 2) {
                    let b1 = bosses[0]; let b2 = bosses[1];
                    let isTRex = (b1.name === "T-REX BOSS" || b2.name === "T-REX BOSS");
                    let isPtero = (b1.name === "PTERO BOSS" || b2.name === "PTERO BOSS");

                    if (isTRex && isPtero) {
                        let t = b1.name === "T-REX BOSS" ? b1 : b2;
                        let p = b1.name === "PTERO BOSS" ? b1 : b2;
                        
                        if (t.isComboActive === undefined) { t.isComboActive = false; t.comboStep = 0; }

                        // ==== HOP KICH T-REX + PTERO ====
                        // Loi cu 1: dieu kien vao doi "t.actionTimer <= 0", nhung T-Rex dem timer ve 0
                        //   roi CHON CHIEU MOI ngay trong cung khung do, nen o cho nay no khong bao gio
                        //   bang 0 -> ca khoi nay la CODE CHET, chua tung chay mot lan nao.
                        // Loi cu 2: khoa bang 999 khung (16.6 giay). Ptero.update() early-return theo
                        //   actionTimer nen no dong bang HOAN TOAN dung luc dang phai ra chieu.
                        // Gio: khoa con DANG CHO bang so nho lap lai moi khung, KHONG BAO GIO khoa con
                        //   dang ra chieu, va co chot an toan de combo khong the treo.
                        if (t.comboCd === undefined) { t.comboCd = 240; t.comboGuard = 0; }
                        if (t.comboCd > 0) t.comboCd--;
                        t.comboGuard = t.isComboActive ? t.comboGuard + 1 : 0;

                        if (t.state === 'idle' && p.state === 'hovering' && p.actionTimer <= 0 && !t.isComboActive && t.comboCd <= 0) {
                            let rand = Math.random();
                            if (rand < 0.15) {
                                t.isComboActive = true; t.comboStep = 1; t.comboGuard = 0;
                                floatingTexts.push(new FloatingText(canvas.width/2 - 120, 120, "⚠️ LƯU Ý: COMBO HỢP KÍCH! ⚠️"));
                            } else if (rand < 0.5) {
                                t.state = 'dashing'; p.state = 'hovering'; p.actionTimer = 30; t.actionTimer = 120; t.comboCd = 180;
                            } else {
                                t.state = 'shooting'; t.shotsFired = 0; t.shotDelay = 0; p.state = 'hovering'; p.actionTimer = 30; t.actionTimer = 120; t.comboCd = 180;
                            }
                        }

                        if (t.isComboActive) {
                            if (t.comboStep === 1) {
                                // Ptero trieu hoi. actionTimer PHAI = 0, neu khong no dung im.
                                p.state = 'summon_adds'; p.subTimer = 0; p.summons = 0; p.actionTimer = 0;
                                t.state = 'idle'; t.comboStep = 2;
                            } else if (t.comboStep === 2) {
                                t.actionTimer = Math.max(t.actionTimer, 20);   // T-Rex cho, khoa ngan lap lai
                                if (p.state === 'hovering') {
                                    t.state = Math.random() > 0.5 ? 'dashing' : 'shooting';
                                    t.shotsFired = 0; t.shotDelay = 0; t.actionTimer = 0; t.comboStep = 3;
                                }
                            } else if (t.comboStep === 3) {
                                p.actionTimer = Math.max(p.actionTimer, 20);   // Ptero cho
                                if (t.state === 'idle') { p.state = 'swooping'; p.actionTimer = 0; t.comboStep = 4; }
                            } else if (t.comboStep === 4) {
                                t.actionTimer = Math.max(t.actionTimer, 20);
                                if (p.state === 'returning' || p.state === 'hovering') {
                                    t.isComboActive = false; t.comboStep = 0;
                                    t.actionTimer = 90; p.actionTimer = 90; t.comboCd = 420;
                                }
                            }
                            // CHOT AN TOAN: combo khong duoc phep keo qua 12 giay
                            if (t.comboGuard > 720) {
                                t.isComboActive = false; t.comboStep = 0;
                                t.actionTimer = 60; p.actionTimer = 60; t.comboCd = 420;
                            }
                        } else {
                            if (t.state === 'dashing' && t.x < canvas.width - 200 && p.state === 'hovering') p.state = 'swooping';
                            if (t.state === 'shooting' && t.shotsFired === 2 && t.shotDelay <= 10 && p.state === 'hovering') p.state = 'swooping';
                        }
                    } else if (!duelMode) {
                        // LUAT NHUONG LUOT: khi HAI BOSS cung danh MOT NGUOI CHOI thi con nay
                        // ra chieu, con kia phai cho — neu khong nguoi choi khong the do noi.
                        // NHUNG trong tran BOSS DAU BOSS thi luat nay pha nat tran dau:
                        // con dang chuyen dang ('sdt_wake' / 'stagein') van bi tinh la "dang ra chieu",
                        // nen doi thu bi ghim o idle suot ca man bien hinh. Con nao ra chieu day hon
                        // thi khoa mom con kia gan nhu ca tran. Vi vay: bo qua khi dang dau tay doi.
                        let isB1Acting = b1.state !== 'idle' && b1.state !== 'entering' && b1.state !== 'returning_place' && b1.state !== 'hovering';
                        let isB2Acting = b2.state !== 'idle' && b2.state !== 'entering' && b2.state !== 'returning_place' && b2.state !== 'hovering';
                        if (isB1Acting && !isB2Acting) b2.actionTimer = Math.max(b2.actionTimer, 30);
                        else if (isB2Acting && !isB1Acting) b1.actionTimer = Math.max(b1.actionTimer, 30);
                    }
                }
                
                aiQuetInput();   // @@HE-DOCINPUT: quet MOT lan moi khung, truoc khi cac boss doc
                if (bosses.length > 0 && !bossSfxActive) { bossSfxActive = true; SFX.bossEntry(); }
                if (bosses.length === 0) bossSfxActive = false;
                if (bossProjectiles.length > bossSfxPrevBP) SFX.bossSkill();
                bossSfxPrevBP = bossProjectiles.length;
                bosses.forEach((b, _bi) => {
                    // @@HE-CHONGKHONG — mo cua so cho MOI boss tai mot cho duy nhat, thay vi
                    // phai gan tay vao idle cua tung con (truoc day chi 7 con duoc noi, nen ca
                    // tier A va B khong he co chong khong).
                    if (typeof b.combatTick === 'function') b.combatTick();
                    aivoGan(b);                // @@HE-AIVO — boc ham chon chieu, lam mot lan
                    aiPhanUngNhay(b);          // @@HE-DOCINPUT — doc dung khung bam nhay
                    if (b.grounded) b._aiHop = false;   // cham dat lai thi duoc bat lan sau
                    chongKhong(b);
                    aaTick(b);
                    // dang trong chuoi chong khong -> boss chi bay len, khong chay AI thuong
                    if (b.aaSeq){ if (typeof b.physics === 'function') b.physics(); else { b.dy += 0.66; b.y += b.dy; } }
                    else if (b.aaCombo){ /* dang combo tren khong: aaComboTick tu lo */ }
                    else if (!b.dying && !(b._uFreeze > 0) && qsChoDichChay() && wsChoChay(b) && vhhChoChay(b)){   // @@HE-VOHAHAN
                        if (duelMode && bosses.length >= 2) bossDuelUpdate(b, bosses[(_bi + 1) % bosses.length]);
                        else bossUpdateWithTaunt(b);   // TAN ANH hut aggro | UNITY-Ripper: dang bi KHOA thi dung im
                    }
                    // @@HE-CHONGKHONG — GHIM: giu boss quanh cho no da chon khi dang ra don
                    // chong khong. Cho phep lao ngan (nhu cu luot cua Clone) chu khong duoc duoi.
                    // BAT O DAY thay vi o tung duong tung don: bat ky luc nao boss VAO mot don
                    // trong bang chong khong MA DANG O TREN KHONG thi ghim ngay, khong can biet
                    // duong nao da phong no ra.
                    {
                        let _ds = (typeof AA_CHIEU !== 'undefined' && AA_CHIEU[testBossSelection]) || null;
                        let _dsv = (typeof AIVO_BOSS !== 'undefined' && AIVO_BOSS[testBossSelection]) ? AIVO_BOSS[testBossSelection].khong : null;
                        if (b.state !== b._aaStPrev){
                            let laAA = (_ds && _ds.indexOf(b.state) >= 0) || (_dsv && _dsv.indexOf(b.state) >= 0);
                            // KHONG doi phai dang o tren khong: cac don hat tung (d_launch...)
                            // BAT DAU tu mat dat roi moi boc len, nen dieu kien "dang bay" lam
                            // Dante khong bao gio duoc ghim (do duoc: 0 khung ghim, troi 329px).
                            // Da la don trong bang chong khong thi ghim ngay tu khung vao don.
                            // @@HE-BO-AA: vai `khong` gio la chieu duoi dat binh thuong (E cua Yasuo, xich War...)
                            // -> KHONG ghim nua, ghim 78px lam cu luot E chi di duoc 78px.
                            // if (laAA) aaDatNeo(b);
                            b._aaStPrev = b.state;
                        }
                    }
                    if (b.aaNeoT > 0){
                        b.aaNeoT--;
                        // Don BO XUONG duoc lao xa hon han — no von la don chup tu tren cao, ghim
                        // ngan qua thi thanh vo duyen. Cac don khac giu ban kinh nho.
                        // aa_moc / w_airpull: pha ha canh phai di toi duoc cho nguoi choi dung,
                        // 78px thi khong bao gio toi noi -> cho cung ban kinh voi cac don bo xuong.
                        const NEO_R = /helm|dive|dap|sgale|hr_dive|pl_dive|aa_moc|w_airpull/i.test(String(b.state)) ? 260 : 78;
                        if (b.x > b.aaNeo + NEO_R) b.x = b.aaNeo + NEO_R;
                        if (b.x < b.aaNeo - NEO_R) b.x = b.aaNeo - NEO_R;
                        if (b.grounded && b.aaNeoT < 80) b.aaNeoT = 0;
                    }
                    // @@HE-RAMAP — CHAN RA KHOI MAP. Dante tung bay han ra ngoai khi lao xuong.
                    // KHONG duoc ghim CUNG: nhieu don la LAO XUYEN MAN (Bo Cap claw_go, ...) va
                    // chi tinh la "da qua mot luot" khi x < -w-20 hoac x > width+20. Ghim cung o
                    // -20 / width-w+20 lam hai moc do KHONG BAO GIO dung -> boss lao mai tai mep,
                    // dung im vinh vien (do duoc: Bo Cap ket claw_go 866 khung o x=-20).
                    // Nen dung LUOI AN TOAN CO GIO: cho ra ngoai tam RAMAP_TG khung roi moi keo ve.
                    {
                        const RAMAP_TG = 45, RAMAP_XA = 1200;
                        let _bw = b.w || 40;
                        // @@HE-DEFENSE: bien phai lay theo THE GIOI. Dung canvas.width thi o che do
                        // thu thanh (ban do 2.5 man hinh) moi con boss deu bi keo ve man dau tien.
                        let _wL = (typeof worldL === 'function') ? worldL() : 0;
                        let _wR = (typeof worldR === 'function') ? worldR() : canvas.width;
                        let _ng = (b.x < _wL - _bw - 40) || (b.x > _wR + 40);
                        b._ngoaiT = _ng ? (b._ngoaiT || 0) + 1 : 0;
                        if (b._ngoaiT > RAMAP_TG || b.x < _wL - _bw - RAMAP_XA || b.x > _wR + RAMAP_XA){
                            b._ngoaiT = 0;
                            if (b.x < _wL - 20) b.x = _wL - 20;
                            if (b.x > _wR - _bw + 20) b.x = _wR - _bw + 20;
                        }
                    }
                    /* @@HE-CUSTAN / @@HE-CUSUFO — boss chet bang Channel co HOAT ANH RIENG,
                       dung cach `midasVang` lam voi cu dam vang: danh dau len cai xac roi doi
                       duong ve, chu khong ve hinh boss binh thuong nua. */
                    if (b.dying && b._cusTan && typeof cusVeTanChay === 'function')
                        cusVeTanChay(b.x, b.y, b.w, b.h, Math.min(1, b.deathTimer / 72));
                    else if (b.dying && b._cusHut && typeof cusUfoVeHutBoss === 'function')
                        cusUfoVeHutBoss(b, Math.min(1, b.deathTimer / 56));
                    else b.draw();
                    if (b.cornerWarn > 0) drawCornerWarnRing(b);   // vong canh bao 1 giay truoc cu lao khi bi don goc
                    if (b.tier === 'colossal' && !b.dying) drawColossalTag(b);
                    if (b.burnTimer > 0) { b.burnTimer--; if (b.burnTimer % 60 === 0) { b.hp -= 1; visualEffects.push(new Effect(b.x + b.w/2, b.y + b.h/2, 'explosion', true, 10)); } }
                });
                // @@HE-THANHMAU — phai chay SAU vong tren: luc nay moi biet con nao da tu ve
                // thanh mau rieng de khong bu chong them mot thanh nua.
                if (typeof veThanhMauConThieu === 'function') veThanhMauConThieu();
                
                for (let i = bosses.length - 1; i >= 0; i--) {
                    let b = bosses[i];
                    // Boss NHIEU PHA: het mau pha 1 thi KHONG chet, tu chuyen sang pha ke tiep
                    if (b.hp <= 0 && !b.dying && b.phase === 1 && !b.sdtUltXong && typeof b.startPhase2 === 'function') { b.startPhase2(); }
                    /* @@HE-SDTULT-XONG — Hans: "dung xong chieu cuoi thi phai tro ve dang nguoi". Truoc day
                       nguoi choi don het mau pha SDT ngay trong luc chieu cuoi dang chay (hoac mot phat nhay
                       qua moc 25%) -> boss chet o dang quy, khong bao gio thay canh tro ve. Gio chieu cuoi
                       BAT BUOC chay het: mau khong xuong duoi 1 cho toi khi tro ve dang nguoi. */
                    if (b.hp <= 0 && !b.dying && b.phase === 2 && !b.sdtUltXong && typeof b.suBatDau === 'function'){
                        b.hp = 1; if (!b.suSt) b.suBatDau();
                    }
                    if (b.hp <= 0 && !b.dying) { b.dying = true; b.deathTimer = 0; SFX.bossExplode(); }
                    if (b.dying) {
                        b.deathTimer++;
                        if (b._cusTan){
                            // TAN CHAY: khong no, chi sun xuong. Dai hon mot chut cho du thay.
                            if (b.deathTimer % 10 === 1) visualEffects.push(new Effect(b.x + b.w/2, b.y + b.h, 'explosion', true, 12));
                            if (b.deathTimer >= 72) processBossDefeat(i);
                        } else if (b._cusHut){
                            if (b.deathTimer >= 56) processBossDefeat(i);
                        } else {
                            let big = Math.max(b.w, b.h);                 // boss cang to -> no cang lon
                            if (b.deathTimer % 4 === 1) visualEffects.push(new Effect(b.x + Math.random() * b.w, b.y + Math.random() * b.h, 'explosion', true, 34 + big * 0.5));
                            shakeTimer = 8;
                            if (b.deathTimer >= 48) processBossDefeat(i);   // no xong moi qua man thang
                        }
                    }
                }
                // --- STYLISH: ne / chan don nguy hiem cua boss (Lazer + dam dat) - song sot khong mat mau -> tinh diem ---
                {
                    let hzKind = -1;
                    for (let b of bosses) { let st = b.state || '';
                        if (st === 'beam_fire' || st === 'back_laser_fire' || st === 'laser_fire' || st === 'gs_laser' || st === 'dil_quake') { hzKind = 0; break; }
                        if (st === 'stomp_fire' || st === 'tail_fire') { hzKind = 1; break; }
                    }
                    if (hzKind >= 0) { laserFireTimer = 5; if (hzKind === 1) laserSlamFlag = true; }
                    if (laserFireTimer > 0) {
                        laserFireTimer--;
                        if (!laserEngaged) { laserEngaged = true; laserEngageHp = dino.hp; laserBlockFlag = false; laserSlamFlag = (hzKind === 1); }
                        if (dino.isShielding()) laserBlockFlag = true;
                    } else if (laserEngaged) {
                        laserEngaged = false;
                        if (dino.hp >= laserEngageHp && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')) {
                            if (laserSlamFlag) { addStyle(16, 'slamdodge'); floatingTexts.push(new FloatingText(dino.x - 16, dino.y - 26, "NÉ DẬM ĐẤT!")); }
                            else { addStyle(laserBlockFlag ? 22 : 15, laserBlockFlag ? 'laserblock' : 'laserdodge'); floatingTexts.push(new FloatingText(dino.x - 12, dino.y - 26, laserBlockFlag ? "CHẶN LAZER!" : "NÉ LAZER!")); }
                            SFX.tone && SFX.tone(1500, 0.07, 'sine', 0.16, 2200); SFX.tone && SFX.tone(900, 0.11, 'triangle', 0.1, 1400);
                        }
                    }
                }
            }
// PLAYER_PART_END s6.loop.IfStatement.76
}}

// index.html:98499 · Phạm vi: loop
function __Part135(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.77 EDITABLE
if (duelMode){
                duelProjectileTick();
                if (!duelWinner && bosses.length === 1 && !bosses[0].dying) duelWinner = bosses[0].name;
                if (duelWinner) duelOver++;
                drawDuelHud();
            }
// PLAYER_PART_END s6.loop.IfStatement.77
}}

// index.html:98505 · Phạm vi: loop
function __Part136(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.78 EDITABLE
if (styleGrace > 0) styleGrace--; else if (stylePoints > 0) stylePoints = Math.max(0, stylePoints - 0.12);
// PLAYER_PART_END s6.loop.IfStatement.78
}}

// index.html:98506 · Phạm vi: loop
function __Part137(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.79 EDITABLE
if (styleFlash > 0) styleFlash--;
// PLAYER_PART_END s6.loop.IfStatement.79
}}

// index.html:98507 · Phạm vi: loop
function __Part138(){ while(false){
// PLAYER_PART_BEGIN s6.loop.BlockStatement.1 EDITABLE
{ let _sr = styleRankNow(); if (_sr > styleRankIdx) { styleFlash = 40; SFX.tone(560 + _sr * 90, 0.09, 'square', 0.15, 900 + _sr * 130); SFX.tone(880 + _sr * 100, 0.13, 'square', 0.1, 1400);
                if (_sr === 6 && sssArmed && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')) {
                    sssArmed = false;
                    if (dino.hp < dino.maxHp) { dino.hp = Math.min(dino.maxHp, dino.hp + 1); floatingTexts.push(new FloatingText(dino.x - 14, dino.y - 34, "SSS! +1 HP")); visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + dino.h/2, 'explosion', true, 24)); }
                    else { ultCharge = Math.min(100, ultCharge + 10); floatingTexts.push(new FloatingText(dino.x - 24, dino.y - 34, "SSS! +10% CHIÊU")); }
                    SFX.tone && SFX.tone(680, 0.12, 'sine', 0.25, 1500); SFX.tone && SFX.tone(1020, 0.16, 'sine', 0.22, 2000); shakeTimer = 14;
                }
              } styleRankIdx = _sr; if (styleRankIdx <= 3) sssArmed = true; }
// PLAYER_PART_END s6.loop.BlockStatement.1
}}

// index.html:98515 · Phạm vi: loop
function __Part139(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.80 EDITABLE
if (dino && !dino.ultActive && !dino.jcState && ultCharge < 100 && frames % 60 === 0 && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')) ultCharge = Math.min(100, ultCharge + ((dino.ultFillMult || 1) + (styleRankIdx >= 5 ? 2 : styleRankIdx >= 3 ? 1 : 0)) * (hasRune("instultx") ? 1.5 : 1));
// PLAYER_PART_END s6.loop.IfStatement.80
}}

// index.html:98516 · Phạm vi: loop
function __Part140(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.81 EDITABLE
if (mapTheme === 'forest' && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')) updateLeafPlatforms();
// PLAYER_PART_END s6.loop.IfStatement.81
}}

// index.html:98517 · Phạm vi: loop
function __Part141(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.82 EDITABLE
if (mapTheme === 'ocean' && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')) {
                updateOceanPads();
                let _onPad = (dino.y + dino.h) <= OCEAN_SURF + 14;
                let _t = _onPad ? 34 : Math.max(-(bienDayHT() - 342), Math.min(34, 214 - dino.y));   // len beo: cuon LEN; lan sau: cuon XUONG
                if(!dino.apex?.isLiveUltimate())oceanCamY += (_t - oceanCamY) * 0.10;
            }
// PLAYER_PART_END s6.loop.IfStatement.82
}}

// index.html:98523 · Phạm vi: loop
function __Part142(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.83 EDITABLE
if (typeof dino.dsTick === 'function') dino.dsTick();
// PLAYER_PART_END s6.loop.IfStatement.83
}}

// index.html:98535 · Phạm vi: loop
function __Part143(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.84 EDITABLE
if (typeof lanKhach === 'function' && lanKhach() && gameState === 'pvp'){
                lanVienP1();
                if (!(dino._uFreeze > 0) && (typeof wsChoChay !== 'function' || wsChoChay(dino)))
                    lanVoiPhim(lanBoPhim1, () => dino.update());
                else if (dino._uFreeze > 0) dino._uFreeze--;
            } else if (!(dino._uFreeze > 0) && (typeof wsChoChay !== 'function' || wsChoChay(dino)))
                dino.update();
            else if (dino._uFreeze > 0) dino._uFreeze--;
// PLAYER_PART_END s6.loop.IfStatement.84
}}

// index.html:98543 · Phạm vi: loop
function __Part144(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.85 EDITABLE
if (typeof xTick === 'function') xTick();
// PLAYER_PART_END s6.loop.IfStatement.85
}}

// index.html:98544 · Phạm vi: loop
function __Part145(){ while(false){
// PLAYER_PART_BEGIN s6.loop.danteTick.1 EDITABLE
danteTick();
// PLAYER_PART_END s6.loop.danteTick.1
}}

// index.html:98545 · Phạm vi: loop
function __Part146(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.86 EDITABLE
if (dino) dino._xAn = typeof xBat === 'function' && xBat();
// PLAYER_PART_END s6.loop.IfStatement.86
}}

// index.html:98546 · Phạm vi: loop
function __Part147(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.87 EDITABLE
if (dino.ammo < 0) dino.ammo = 0;
// PLAYER_PART_END s6.loop.IfStatement.87
}}

// index.html:98547 · Phạm vi: loop
function __Part148(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.88 EDITABLE
if (typeof sdtTickSau === 'function') sdtTickSau();
// PLAYER_PART_END s6.loop.IfStatement.88
}}
