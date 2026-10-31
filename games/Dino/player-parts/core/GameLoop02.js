// PLAYER_FILE: GameLoop02
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: BIEN_TOC, Effect, FloatingText, PVP_ULT_NAP, R14, SFX, UNI_SWAP_CD, activeShieldWasHeld, addStyle, aiBat, aiBatP1, aiNghi, aiNghiP1, baseSpeed, battuBat, bienSauNguoi, bienVeHud, bienVeTren, birdBank, birdSpendCd, boomAiLoc, bossProjectiles, bosses, bzVeDemTren, channelShieldLocked, checkAABB, checkCollisions, checkPvPCollisions, coKhoChim, ctx, currentShieldType, cusCgVeCung, cusChKhoaKhien, cusNkPhim, cusNkVeMan, cusToaVeTren, cwVe, danteOn, dashCd, defMode, defPlayerHits, diemNhan, dino, dino2, dodgeCd, dojoMode, dojoRefillUltimates, drawAfterimages, drawBoomerangs, drawDefenseHud, drawDojoPicker, drawFireBrands, drawGrazeFlash, drawLightningEffects, drawMenuPanel, drawPets, drawPrismStacks, drawReviveOverlay, drawRuneShieldBubble, drawSporeStacksOnPlayer, drawSwordmaster, drawUI, drawWildernessHud, dsawVe, flashKind, floatingTexts, frames, gameSpeed, gameState, grazeFlashTimer, grazeX, grazeY, hasRune, highScore, hitFxTick, hitFxVe, hitstopTimer, keys, kimCoTick, lanApAnhChup, lanBoPhim2, lanChu, lanGui, lanKhach, lanNhipChu, lanNhipKhach, lanRieng2, lanVienP2, lanVoiP2, lhVeTren, mapTheme, midasVe, midasVeNut, mortarBuoc, noDmgStreak, perfectParryCd, pet2TickDash, pet2TickLua, projectiles, pulseVeThanh, pvpDeathTimer, pvpDiem, pvpGatDan, pvpQuayMat, qsTick, reviveOverlay, rgcVe, routeDaHien, routeDangChay, routeMap, score, shakeTimer, shieldCharge, stMustang, stTick, stTuDongTrenKhong, tdNeSatSuon, tdVePhu, tickBoomerangs, tickDojoQueue, tickFireBrands, tickLifesteal, tickMinionProxy, tickNoise, tickPrismStacks, tickSpore, tickSwordmaster, tickUnityUlt, trdTickSau, ultCharge, uniChamT, uniChoHoi, uniHopNapTick, unitySwapCd, unitySync, updateAfterimages, updatePets, veKhoanTren, visualEffects, voltTickTia, vuKhi2Tick, vuKhi2Ve, wildernessOn, wkgBat, wkgNguoiSau, wkgNguoiTruoc, wkgTickSau, wsChoChay, xVe
// index.html:98548 · Phạm vi: loop
function __Part0(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.89 EDITABLE
if (typeof wkgTickSau === 'function') wkgTickSau();
// PLAYER_PART_END s6.loop.IfStatement.89
}}

// index.html:98549 · Phạm vi: loop
function __Part1(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.90 EDITABLE
if (typeof trdTickSau === 'function') trdTickSau();
// PLAYER_PART_END s6.loop.IfStatement.90
}}

// index.html:98550 · Phạm vi: loop
function __Part2(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.91 EDITABLE
if (typeof bienSauNguoi === 'function') bienSauNguoi();
// PLAYER_PART_END s6.loop.IfStatement.91
}}

// index.html:98551 · Phạm vi: loop
function __Part3(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.92 EDITABLE
if (gameState === 'pvp') pvpQuayMat(false);
// PLAYER_PART_END s6.loop.IfStatement.92
}}

// index.html:98552 · Phạm vi: loop
function __Part4(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.93 EDITABLE
if (typeof tdVePhu === 'function') tdVePhu();
// PLAYER_PART_END s6.loop.IfStatement.93
}}

// index.html:98553 · Phạm vi: loop
function __Part5(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.94 EDITABLE
if (typeof wkgNguoiTruoc === 'function') wkgNguoiTruoc();
// PLAYER_PART_END s6.loop.IfStatement.94
}}

// index.html:98554 · Phạm vi: loop
function __Part6(){ while(false){
// PLAYER_PART_BEGIN s6.loop.dino.draw.1 EDITABLE
dino.draw();
// PLAYER_PART_END s6.loop.dino.draw.1
}}

// index.html:98555 · Phạm vi: loop
function __Part7(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.95 EDITABLE
if (typeof xVe === 'function') xVe();
// PLAYER_PART_END s6.loop.IfStatement.95
}}

// index.html:98556 · Phạm vi: loop
function __Part8(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.96 EDITABLE
if (dino.dk && dino.dk.ult && dino.dk.ult.bz && typeof bzVeDemTren === 'function') bzVeDemTren(dino);
// PLAYER_PART_END s6.loop.IfStatement.96
}}

// index.html:98557 · Phạm vi: loop
function __Part9(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.97 EDITABLE
if (dino.tank && dino.rfVeTank) dino.rfVeTank();
// PLAYER_PART_END s6.loop.IfStatement.97
}}

// index.html:98558 · Phạm vi: loop
function __Part10(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.98 EDITABLE
if (typeof lhVeTren === 'function') lhVeTren();
// PLAYER_PART_END s6.loop.IfStatement.98
}}

// index.html:98559 · Phạm vi: loop
function __Part11(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.99 EDITABLE
if (typeof hitFxTick === 'function'){ hitFxTick(); hitFxVe(); }
// PLAYER_PART_END s6.loop.IfStatement.99
}}

// index.html:98560 · Phạm vi: loop
function __Part12(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.100 EDITABLE
if (typeof cwVe === 'function') cwVe(dino);
// PLAYER_PART_END s6.loop.IfStatement.100
}}

// index.html:98561 · Phạm vi: loop
function __Part13(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.101 EDITABLE
if (typeof cusCgVeCung === 'function') cusCgVeCung(dino);
// PLAYER_PART_END s6.loop.IfStatement.101
}}

// index.html:98562 · Phạm vi: loop
function __Part14(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.102 EDITABLE
if (typeof rgcVe === 'function') rgcVe();
// PLAYER_PART_END s6.loop.IfStatement.102
}}

// index.html:98563 · Phạm vi: loop
function __Part15(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.103 EDITABLE
if (typeof pulseVeThanh === 'function') pulseVeThanh(dino);
// PLAYER_PART_END s6.loop.IfStatement.103
}}

// index.html:98566 · Phạm vi: loop
function __Part16(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.104 EDITABLE
if (typeof veKhoanTren === 'function') veKhoanTren();
// PLAYER_PART_END s6.loop.IfStatement.104
}}

// index.html:98567 · Phạm vi: loop
function __Part17(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.105 EDITABLE
if (typeof dsawVe === 'function') dsawVe(dino);
// PLAYER_PART_END s6.loop.IfStatement.105
}}

// index.html:98568 · Phạm vi: loop
function __Part18(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.106 EDITABLE
if (typeof btVePhu === 'function') btVePhu();
// PLAYER_PART_END s6.loop.IfStatement.106
}}

// index.html:98569 · Phạm vi: loop
function __Part19(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.107 EDITABLE
if (typeof bienVeTren === 'function') bienVeTren();
// PLAYER_PART_END s6.loop.IfStatement.107
}}

// index.html:98570 · Phạm vi: loop
function __Part20(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.108 EDITABLE
if (typeof wkgNguoiSau === 'function') wkgNguoiSau();
// PLAYER_PART_END s6.loop.IfStatement.108
}}

// index.html:98571 · Phạm vi: loop
function __Part21(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.109 EDITABLE
if (typeof midasVe === 'function') midasVe(dino);
// PLAYER_PART_END s6.loop.IfStatement.109
}}

// index.html:98572 · Phạm vi: loop
function __Part22(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.110 EDITABLE
if (typeof midasVeNut === 'function') midasVeNut();
// PLAYER_PART_END s6.loop.IfStatement.110
}}

// index.html:98573 · Phạm vi: loop
function __Part23(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.111 EDITABLE
if (typeof dino.dsVe === 'function') dino.dsVe();
// PLAYER_PART_END s6.loop.IfStatement.111
}}

// index.html:98573 · Phạm vi: loop
function __Part24(){ while(false){
// PLAYER_PART_BEGIN s6.loop.dino.drawUltAura.1 EDITABLE
dino.drawUltAura();
// PLAYER_PART_END s6.loop.dino.drawUltAura.1
}}

// index.html:98573 · Phạm vi: loop
function __Part25(){ while(false){
// PLAYER_PART_BEGIN s6.loop.dino.drawJC.1 EDITABLE
dino.drawJC();
// PLAYER_PART_END s6.loop.dino.drawJC.1
}}

// index.html:98573 · Phạm vi: loop
function __Part26(){ while(false){
// PLAYER_PART_BEGIN s6.loop.dino.drawUltBeam.1 EDITABLE
dino.drawUltBeam();
// PLAYER_PART_END s6.loop.dino.drawUltBeam.1
}}

// index.html:98573 · Phạm vi: loop
function __Part27(){ while(false){
// PLAYER_PART_BEGIN s6.loop.dino.drawClawJCircles.1 EDITABLE
dino.drawClawJCircles();
// PLAYER_PART_END s6.loop.dino.drawClawJCircles.1
}}

// index.html:98573 · Phạm vi: loop
function __Part28(){ while(false){
// PLAYER_PART_BEGIN s6.loop.dino.drawClawSwords.1 EDITABLE
dino.drawClawSwords();
// PLAYER_PART_END s6.loop.dino.drawClawSwords.1
}}

// index.html:98573 · Phạm vi: loop
function __Part29(){ while(false){
// PLAYER_PART_BEGIN s6.loop.dino.drawFireFx.1 EDITABLE
dino.drawFireFx();
// PLAYER_PART_END s6.loop.dino.drawFireFx.1
}}

// index.html:98573 · Phạm vi: loop
function __Part30(){ while(false){
// PLAYER_PART_BEGIN s6.loop.dino.drawLightningFx.1 EDITABLE
dino.drawLightningFx();
// PLAYER_PART_END s6.loop.dino.drawLightningFx.1
}}

// index.html:98573 · Phạm vi: loop
function __Part31(){ while(false){
// PLAYER_PART_BEGIN s6.loop.dino.drawPulsar.1 EDITABLE
dino.drawPulsar();
// PLAYER_PART_END s6.loop.dino.drawPulsar.1
}}

// index.html:98574 · Phạm vi: loop
function __Part32(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.112 EDITABLE
if ((dino.dashShieldTimer||0) > 0 && hasRune('headbutt')){ let dd=dino.dashDir||(dino.isFacingLeft?-1:1), cx=dd<0?dino.x-2:dino.x+dino.w+2, cy=dino.y+dino.h/2, r=dino.h*0.8;
                ctx.save(); ctx.fillStyle="rgba(64,196,255,0.22)"; ctx.strokeStyle="rgba(120,220,255,0.9)"; ctx.lineWidth=3;
                ctx.beginPath(); if (dd>0) ctx.arc(cx,cy,r,-Math.PI/2,Math.PI/2); else ctx.arc(cx,cy,r,Math.PI/2,Math.PI*1.5); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.strokeStyle="rgba(225,245,254,0.9)"; ctx.lineWidth=1.5; ctx.beginPath(); if (dd>0) ctx.arc(cx,cy,r*0.7,-Math.PI/2,Math.PI/2); else ctx.arc(cx,cy,r*0.7,Math.PI/2,Math.PI*1.5); ctx.stroke(); ctx.restore(); }
// PLAYER_PART_END s6.loop.IfStatement.112
}}

// index.html:98578 · Phạm vi: loop
function __Part33(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.113 EDITABLE
if (hasRune('pet')||hasRune('petx')||hasRune('pet2')||hasRune('pet2x')||hasRune('pet3')||hasRune('pet3x')||hasRune('pet4')||hasRune('pet4x')||hasRune('pet5')||hasRune('pet5x')||hasRune('pet6')||hasRune('pet6x')) { updatePets(); drawPets(); }
// PLAYER_PART_END s6.loop.IfStatement.113
}}

// index.html:98579 · Phạm vi: loop
function __Part34(){ while(false){
// PLAYER_PART_BEGIN s6.loop.updateAfterimages.1 EDITABLE
updateAfterimages();
// PLAYER_PART_END s6.loop.updateAfterimages.1
}}

// index.html:98579 · Phạm vi: loop
function __Part35(){ while(false){
// PLAYER_PART_BEGIN s6.loop.drawAfterimages.1 EDITABLE
drawAfterimages();
// PLAYER_PART_END s6.loop.drawAfterimages.1
}}

// index.html:98579 · Phạm vi: loop
function __Part36(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.114 EDITABLE
if (typeof kimCoTick === 'function') kimCoTick();
// PLAYER_PART_END s6.loop.IfStatement.114
}}

// index.html:98580 · Phạm vi: loop
function __Part37(){ while(false){
// PLAYER_PART_BEGIN s6.loop.tickFireBrands.1 EDITABLE
tickFireBrands();
// PLAYER_PART_END s6.loop.tickFireBrands.1
}}

// index.html:98580 · Phạm vi: loop
function __Part38(){ while(false){
// PLAYER_PART_BEGIN s6.loop.drawFireBrands.1 EDITABLE
drawFireBrands();
// PLAYER_PART_END s6.loop.drawFireBrands.1
}}

// index.html:98581 · Phạm vi: loop
function __Part39(){ while(false){
// PLAYER_PART_BEGIN s6.loop.tickPrismStacks.1 EDITABLE
tickPrismStacks();
// PLAYER_PART_END s6.loop.tickPrismStacks.1
}}

// index.html:98581 · Phạm vi: loop
function __Part40(){ while(false){
// PLAYER_PART_BEGIN s6.loop.drawPrismStacks.1 EDITABLE
drawPrismStacks();
// PLAYER_PART_END s6.loop.drawPrismStacks.1
}}

// index.html:98584 · Phạm vi: loop
function __Part41(){ while(false){
// PLAYER_PART_BEGIN s6.loop.tickBoomerangs.1 EDITABLE
tickBoomerangs();
// PLAYER_PART_END s6.loop.tickBoomerangs.1
}}

// index.html:98585 · Phạm vi: loop
function __Part42(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.115 EDITABLE
if (gameState === 'pvp' && typeof lanVoiP2 === 'function' && typeof dino2 !== 'undefined' && dino2)
                lanVoiP2(() => { boomAiLoc = dino; try { tickBoomerangs(); } finally { boomAiLoc = null; } });
// PLAYER_PART_END s6.loop.IfStatement.115
}}

// index.html:98587 · Phạm vi: loop
function __Part43(){ while(false){
// PLAYER_PART_BEGIN s6.loop.drawBoomerangs.1 EDITABLE
drawBoomerangs();
// PLAYER_PART_END s6.loop.drawBoomerangs.1
}}

// index.html:98588 · Phạm vi: loop
function __Part44(){ while(false){
// PLAYER_PART_BEGIN s6.loop.tickSwordmaster.1 EDITABLE
tickSwordmaster();
// PLAYER_PART_END s6.loop.tickSwordmaster.1
}}

// index.html:98588 · Phạm vi: loop
function __Part45(){ while(false){
// PLAYER_PART_BEGIN s6.loop.drawSwordmaster.1 EDITABLE
drawSwordmaster();
// PLAYER_PART_END s6.loop.drawSwordmaster.1
}}

// index.html:98589 · Phạm vi: loop
function __Part46(){ while(false){
// PLAYER_PART_BEGIN s6.loop.drawRuneShieldBubble.1 EDITABLE
drawRuneShieldBubble();
// PLAYER_PART_END s6.loop.drawRuneShieldBubble.1
}}

// index.html:98591 · Phạm vi: loop
function __Part47(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.116 EDITABLE
if (bosses.some(b => b.name === "ECHO STALKER")) tickNoise();
// PLAYER_PART_END s6.loop.IfStatement.116
}}

// index.html:98592 · Phạm vi: loop
function __Part48(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.117 EDITABLE
if (bosses.some(b => b.name === "SPORE CROWN")) { tickSpore(); drawSporeStacksOnPlayer(); }
// PLAYER_PART_END s6.loop.IfStatement.117
}}

// index.html:98593 · Phạm vi: loop
function __Part49(){ while(false){
// PLAYER_PART_BEGIN s6.loop.tickLifesteal.1 EDITABLE
tickLifesteal();
// PLAYER_PART_END s6.loop.tickLifesteal.1
}}

// index.html:98594 · Phạm vi: loop
function __Part50(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.118 EDITABLE
if (coKhoChim()){ if (birdSpendCd>0) birdSpendCd--; if (birdBank>0 && dino.hp<dino.maxHp && birdSpendCd<=0){ dino.hp++; birdBank--; birdSpendCd=12; floatingTexts.push(new FloatingText(dino.x, dino.y-30, "+1")); if (typeof SFX!=='undefined'&&SFX.tone) SFX.tone(760,0.08,'sine',0.12,1000); } }
// PLAYER_PART_END s6.loop.IfStatement.118
}}

// index.html:98596 · Phạm vi: loop
function __Part51(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.119 EDITABLE
if (currentShieldType === 1 && dino && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp')) {
                if (dino.shieldEnergy === undefined) dino.shieldEnergy = 100;
                if (dino.parryWindow > 0) dino.parryWindow--;
                // KHIEN CHU DONG KHONG PARRY nua. Truoc day moi lan bam lai la mo mot cua so DO
                // HOAN HAO, ma nang luong het thi tha ra roi bam lai duoc ngay -> parry vo han.
                // Gio: het nang luong la KHOA, phai hoi len 60% moi gio khien lai duoc.
                if (dino.shieldEnergy <= 0) dino.shieldLock = true;
                if (dino.shieldLock && dino.shieldEnergy >= 60) dino.shieldLock = false;
                let holding = !channelShieldLocked(dino) && keys['KeyL'] && !dino.shieldLock && dino.shieldEnergy > 0 && !dino.jcState && !dino.ultActive
                              && !(typeof cusChKhoaKhien === 'function' && cusChKhoaKhien())    // @@HE-CUSCH
                              && !(typeof wkgBat === 'function' && wkgBat());                   // @@HE-WUKONG: khien thanh XOAY CON
                if (holding) {
                    dino.meleeTimer = Math.max(dino.meleeTimer, 3);
                    dino.shieldEnergy = Math.max(0, dino.shieldEnergy - (100 / 90));
                } else {
                    // DE KHIEN C2: thanh khien chu dong hoi nhanh hon 20%
                    let _hoi = hasRune('pet3x') ? (100 / 192) : (100 / 240);
                    dino.shieldEnergy = Math.min(100, dino.shieldEnergy + _hoi);
                }
                activeShieldWasHeld = holding;
            }
// PLAYER_PART_END s6.loop.IfStatement.119
}}

// index.html:98617 · Phạm vi: loop
function __Part52(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.120 EDITABLE
if (dino.webTimer > 0) { ctx.save(); ctx.strokeStyle = "rgba(255,255,255,0.85)"; ctx.lineWidth = 1.5; let wx = dino.x + dino.w/2, wy = dino.y + dino.h/2; for (let i = 0; i < 8; i++) { let a = i / 8 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + Math.cos(a) * 34, wy + Math.sin(a) * 34); ctx.stroke(); } ctx.beginPath(); ctx.arc(wx, wy, 16, 0, Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.arc(wx, wy, 28, 0, Math.PI*2); ctx.stroke(); ctx.restore(); }
// PLAYER_PART_END s6.loop.IfStatement.120
}}

// index.html:98618 · Phạm vi: loop
function __Part53(){ while(false){
// PLAYER_PART_BEGIN s6.loop.unitySync.1 EDITABLE
unitySync();
// PLAYER_PART_END s6.loop.unitySync.1
}}

// index.html:98619 · Phạm vi: loop
function __Part54(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.121 EDITABLE
if (typeof uniHopNapTick === 'function') uniHopNapTick();
// PLAYER_PART_END s6.loop.IfStatement.121
}}

// index.html:98621 · Phạm vi: loop
function __Part55(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.122 EDITABLE
if (uniChoHoi && uniChamT <= 0){ uniChoHoi = 0; unitySwapCd = UNI_SWAP_CD; }
// PLAYER_PART_END s6.loop.IfStatement.122
}}

// index.html:98622 · Phạm vi: loop
function __Part56(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.123 EDITABLE
if (unitySwapCd > 0) unitySwapCd--;
// PLAYER_PART_END s6.loop.IfStatement.123
}}

// index.html:98623 · Phạm vi: loop
function __Part57(){ while(false){
// PLAYER_PART_BEGIN s6.loop.tickUnityUlt.1 EDITABLE
tickUnityUlt();
// PLAYER_PART_END s6.loop.tickUnityUlt.1
}}

// index.html:98624 · Phạm vi: loop
function __Part58(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.124 EDITABLE
if (dodgeCd > 0) dodgeCd--;
// PLAYER_PART_END s6.loop.IfStatement.124
}}

// index.html:98624 · Phạm vi: loop
function __Part59(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.125 EDITABLE
if (perfectParryCd > 0) perfectParryCd--;
// PLAYER_PART_END s6.loop.IfStatement.125
}}

// index.html:98624 · Phạm vi: loop
function __Part60(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.126 EDITABLE
if (dashCd > 0) dashCd--;
// PLAYER_PART_END s6.loop.IfStatement.126
}}

// index.html:98624 · Phạm vi: loop
function __Part61(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.127 EDITABLE
if (dino.dashShieldTimer > 0) dino.dashShieldTimer--;
// PLAYER_PART_END s6.loop.IfStatement.127
}}

// index.html:98625 · Phạm vi: loop
function __Part62(){ while(false){
// PLAYER_PART_BEGIN s6.loop.stTick.1 EDITABLE
stTick();
// PLAYER_PART_END s6.loop.stTick.1
}}

// index.html:98625 · Phạm vi: loop
function __Part63(){ while(false){
// PLAYER_PART_BEGIN s6.loop.stMustang.1 EDITABLE
stMustang();
// PLAYER_PART_END s6.loop.stMustang.1
}}

// index.html:98625 · Phạm vi: loop
function __Part64(){ while(false){
// PLAYER_PART_BEGIN s6.loop.stTuDongTrenKhong.1 EDITABLE
stTuDongTrenKhong();
// PLAYER_PART_END s6.loop.stTuDongTrenKhong.1
}}

// index.html:98625 · Phạm vi: loop
function __Part65(){ while(false){
// PLAYER_PART_BEGIN s6.loop.qsTick.1 EDITABLE
qsTick();
// PLAYER_PART_END s6.loop.qsTick.1
}}

// index.html:98626 · Phạm vi: loop
function __Part66(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.128 EDITABLE
if (dodgeCd <= 0 && !dino.invincible && !dino.isShielding() && !dino.jcState && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')) {
                let dcx = dino.x + dino.w / 2, dcy = dino.y + dino.h / 2, gb = { x: dino.x - 16, y: dino.y - 16, w: dino.w + 32, h: dino.h + 32 };
                for (let bp of bossProjectiles) {
                    if (checkAABB(gb, bp) && !checkAABB(dino, bp)) {
                        let rx = (bp.x + bp.w / 2) - dcx, ry = (bp.y + bp.h / 2) - dcy;
                        if (rx * bp.vx + ry * bp.vy > 0) {
                            hitstopTimer = (typeof danteOn==='function'&&danteOn()&&dino.dante?.arm===5)?0:7; grazeFlashTimer = 15; flashKind = 0; grazeX = dcx; grazeY = dcy; dodgeCd = 40;
                            if (!dino.ultActive && ultCharge < 100) ultCharge = Math.min(100, ultCharge + 4);
                            floatingTexts.push(new FloatingText(dino.x - 4, dino.y - 18, "NÉ!")); addStyle(18, 'graze');
                            if (typeof tdNeSatSuon === 'function') tdNeSatSuon();   // @@HE-TUDIA3: ne sat suon = kich Tu Dia
                            SFX.tone(1700, 0.07, 'sine', 0.18, 2500); SFX.tone(950, 0.13, 'triangle', 0.12, 1500);
                            break;
                        }
                    }
                }
            }
// PLAYER_PART_END s6.loop.IfStatement.128
}}

// index.html:98642 · Phạm vi: loop
function __Part67(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.129 EDITABLE
if (!dino.grounded && !dino.jcState && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')) {
                let feetY = dino.y + dino.h;
                for (let bp of bossProjectiles) {
                    if (bp._jumped) continue;
                    let gap = bp.y - feetY;
                    if (gap >= -6 && gap <= 60 && (bp.x + bp.w > dino.x + 4) && (bp.x < dino.x + dino.w - 4) && !checkAABB(dino, bp)) {
                        bp._jumped = true;
                        let bonus = Math.round(6 + (1 - Math.max(0, gap) / 60) * 14);
                        addStyle(bonus, 'jumpover');
                        floatingTexts.push(new FloatingText(dino.x, dino.y - 30, "NHẢY QUA! +" + bonus));
                        SFX.tone(1300, 0.06, 'triangle', 0.12, 1900);
                    }
                }
            }
// PLAYER_PART_END s6.loop.IfStatement.129
}}

// index.html:98656 · Phạm vi: loop
function __Part68(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.130 EDITABLE
if (dino.isCrouching && !dino.jcState && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')) {
                let headY = dino.y;
                for (let bp of bossProjectiles) {
                    if (bp._ducked) continue;
                    let gap = headY - (bp.y + bp.h);
                    if (gap >= -6 && gap <= 26 && (bp.x + bp.w > dino.x + 4) && (bp.x < dino.x + dino.w - 4) && !checkAABB(dino, bp)) {
                        bp._ducked = true;
                        let bonus = Math.round(6 + (1 - Math.max(0, gap) / 26) * 12);
                        addStyle(bonus, 'duck');
                        floatingTexts.push(new FloatingText(dino.x, dino.y - 18, "CÚI NÉ! +" + bonus));
                        SFX.tone && SFX.tone(1350, 0.06, 'triangle', 0.12, 1900);
                    }
                }
            }
// PLAYER_PART_END s6.loop.IfStatement.130
}}

// index.html:98670 · Phạm vi: loop
function __Part69(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.131 EDITABLE
if (hitstopTimer <= 0 && grazeFlashTimer > 0) { grazeFlashTimer--; drawGrazeFlash(); }
// PLAYER_PART_END s6.loop.IfStatement.131
}}

// index.html:98672 · Phạm vi: loop
function __Part70(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.132 EDITABLE
if (gameState === 'pvp') {
                pvpQuayMat(false);                      // quay mat TRUOC khi ra don
                lanNhipKhach();                         // @@HE-NET2: khach gui phim cua minh len
                if (aiBatP1) aiNghiP1();                // @@HE-AI: may cam luon P1 (chi de do)
                if (aiBat) aiNghi();                    // @@HE-AI: may quyet dinh phim cua P2
                else if (lanKhach()){
                    // Nguoi dang ngoi o may khach chinh la P2: lay thang ban phim tai cho,
                    // khong cho goi tin di mot vong roi ve — nhu vay hoat anh moi bam tay.
                    let m = {}; for (const k in keys) if (keys[k]) m[k] = true;
                    lanBoPhim2 = m;
                }
                if (lanRieng2.dashCd > 0) lanRieng2.dashCd--;   // @@HE-LAN: hoi luot rieng cua P2
                lanVienP2();                            // @@HE-LAN: phat keydown/keyup vien cho P2
                // KHOA CHAN. `_uFreeze` (Ky Bang Ha cua Cryo, dong bang cua he tang bang) va
                // `wsChoChay` (Whisper) chi duoc ton trong o hai vong cap nhat `enemies` va
                // `bosses`. Nguoi choi khong he kiem hai thu do, nen o PvP dong bang doi thu
                // KHONG khoa duoc gi ca — ho van chay nhay ban binh thuong trong lop bang.
                /* @@HE-P2KHOA — lop vu khi cua P2 chay TRUOC dino2.update(), dung thu tu cua P1 (venomTick, lhTick,
                   buaTick... cua P1 deu chay truoc dino.update()). Chay SAU thi moi don "bam trong cung khung" lech
                   mot nhip giua hai ben — vd Venom J -> Luot -> J: P2 ra ca luot xuyen (5) lan bung gai, P1 chi bung gai. */
                vuKhi2Tick();                           // @@HE-VUKHI2: lop vu khi cua P2
                if (dino2.hp > 0 && !(dino2._uFreeze > 0) && (typeof wsChoChay !== 'function' || wsChoChay(dino2)))
                    lanVoiP2(() => { dino2.update(); });   // @@HE-LAN: P2 chay voi bo phim rieng
                else if (dino2._uFreeze > 0) dino2._uFreeze--;
                /* Phai quay mat NGAY TRUOC KHI VE. Goi truoc update thi khong an thua:
                   update() dat lai huong nhin theo phim di chuyen va lat nguoc lai — do
                   duoc: sau pvpQuayMat P2 = ◀ dung, chay dino2.update() xong thanh ▶, roi
                   dino2.draw() ve dung cai gia tri sai do. Mach do la ly do may bai do
                   truoc cua toi deu bao "dung": chung doc gia tri sau CA khung, luc da
                   duoc lan goi thu hai sua lai roi — con hinh thi da ve xong tu truoc. */
                pvpQuayMat(false);
                dino2.draw();
                if (dino2.tank && dino2.rfVeTank) dino2.rfVeTank();
                if (typeof pulseVeThanh === 'function') pulseVeThanh(dino2);   // @@HE-PULSE-ST
                if (typeof cwVe === 'function') cwVe(dino2);      // @@HE-CUSCW
                if (typeof cusCgVeCung === 'function') cusCgVeCung(dino2);   // @@HE-CUSCG
                if (typeof dsawVe === 'function') dsawVe(dino2);  // @@HE-DSAW
                vuKhi2Ve();                                 // @@HE-VUKHI2: hinh vu khi cua P2
                // Trong luc + no cham dat cho Mua Hoa: PvP khong chay checkCollisions()
                // nen phai goi rieng, neu khong ba qua cau bay thang len troi mai mai.
                for (let _mi = projectiles.length - 1; _mi >= 0; _mi--){
                    let _mp = projectiles[_mi];
                    if (_mp && _mp.mortar && mortarBuoc(_mp, _mi)) projectiles.splice(_mi, 1);
                }
                if (!lanKhach()) checkPvPCollisions();
                /* Thanh chieu cuoi trong PvP truoc day KHONG BAO GIO day: cho nap chi ke
                   normal/boss_rush/test_boss, va no chay tren bien toan cuc `dino` nen du co
                   mo cong thi nguoi choi 2 van khong duoc gi. Do duoc: danh 120 khung ma ca
                   hai thanh deu dung 0. Nap tay cho tung nguoi o day. */
                if (!lanKhach() && frames % 60 === 0){
                    if (dino && !dino.ultActive && ultCharge < 100) ultCharge = Math.min(100, ultCharge + PVP_ULT_NAP);
                    if (dino2 && !dino2.ultActive && lanRieng2.ult < 100) lanRieng2.ult = Math.min(100, lanRieng2.ult + PVP_ULT_NAP);
                }
                pvpQuayMat(false);                      // luon quay mat vao nhau
                pvpGatDan(dino); pvpGatDan(dino2);      // @@HE-GATDAN: than giao/bua chan dan
                lanNhipChu();                           // @@HE-NET2: chu gui anh chup xuong
                lanApAnhChup();                         // @@HE-NET2: khach dap anh chup len
                // Quai nao cung co dong "dang chay thi moi giay mat 1 mau" trong update
                // cua no. Player khong co, nen Inferno danh trung nguoi choi thi burnTimer
                // duoc gan roi nam do vinh vien, khong bao gio dot ai.
                if (!lanKhach()) for (const _ng of [dino, dino2]){
                    if (_ng && _ng.burnTimer > 0){
                        _ng.burnTimer--;
                        if (_ng.burnTimer % 60 === 0) _ng.takeDamage(1);
                    }
                }
                if (!lanKhach() && pvpDeathTimer < 0 && (dino.hp <= 0 || dino2.hp <= 0)) pvpDeathTimer = 0;
                if (pvpDeathTimer >= 0) {
                    pvpDeathTimer++;
                    if (pvpDeathTimer % 4 === 1) {
                        if (dino.hp <= 0) visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + dino.h/2, 'explosion', true, 55));
                        if (dino2.hp <= 0) visualEffects.push(new Effect(dino2.x + dino2.w/2, dino2.y + dino2.h/2, 'explosion', true, 55));
                    }
                    shakeTimer = 8;
                    if (pvpDeathTimer >= 42 && !lanKhach()){
                        // Cham diem NGAY LUC KET THUC HIEP, o may chu. Neu de tinh luc ve
                        // man ket thi no cong them mot diem moi khung.
                        if (dino.hp > 0 && dino2.hp <= 0) pvpDiem[0]++;
                        else if (dino2.hp > 0 && dino.hp <= 0) pvpDiem[1]++;
                        gameState = 'pvp_end';
                        if (lanChu()) lanGui({ v: 'e', dm: pvpDiem.slice() });
                    }
                }
            } else {
                checkCollisions(); 
            }
// PLAYER_PART_END s6.loop.IfStatement.132
}}

// index.html:98766 · Phạm vi: loop
function __Part71(){ while(false){
// PLAYER_PART_BEGIN s6.loop._chaySentry.1 EDITABLE
const _chaySentry = () => {
                if (typeof dino === 'undefined' || !dino || !dino.sentries) return;
                for (let _i = dino.sentries.length - 1; _i >= 0; _i--){
                    dino.sentry = dino.sentries[_i];
                    dino._tickSentry();
                    if (!dino.sentry) dino.sentries.splice(_i, 1);
                }
                dino.sentry = null;
            };
// PLAYER_PART_END s6.loop._chaySentry.1
}}

// index.html:98775 · Phạm vi: loop
function __Part72(){ while(false){
// PLAYER_PART_BEGIN s6.loop._chaySentry.2 EDITABLE
_chaySentry();
// PLAYER_PART_END s6.loop._chaySentry.2
}}

// index.html:98776 · Phạm vi: loop
function __Part73(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.133 EDITABLE
if (gameState === 'pvp' && typeof lanVoiP2 === 'function' && typeof dino2 !== 'undefined' && dino2)
                lanVoiP2(_chaySentry);
// PLAYER_PART_END s6.loop.IfStatement.133
}}

// index.html:98782 · Phạm vi: loop
function __Part74(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.134 EDITABLE
if (!R14 && routeDangChay && dino && dino.hp <= 0){ routeDangChay = false; routeDaHien = false; routeMap = null; }
// PLAYER_PART_END s6.loop.IfStatement.134
}}

// index.html:98783 · Phạm vi: loop
function __Part75(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.135 EDITABLE
if (typeof voltTickTia === 'function') voltTickTia();
// PLAYER_PART_END s6.loop.IfStatement.135
}}

// index.html:98784 · Phạm vi: loop
function __Part76(){ while(false){
// PLAYER_PART_BEGIN s6.loop.tickMinionProxy.1 EDITABLE
tickMinionProxy();
// PLAYER_PART_END s6.loop.tickMinionProxy.1
}}

// index.html:98785 · Phạm vi: loop
function __Part77(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.136 EDITABLE
if (typeof pet2TickLua === 'function'){ pet2TickDash(); pet2TickLua(); }
// PLAYER_PART_END s6.loop.IfStatement.136
}}

// index.html:98786 · Phạm vi: loop
function __Part78(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.137 EDITABLE
if (defMode) defPlayerHits();
// PLAYER_PART_END s6.loop.IfStatement.137
}}

// index.html:98790 · Phạm vi: loop
function __Part79(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.138 EDITABLE
if (typeof cusToaVeTren === 'function') cusToaVeTren();
// PLAYER_PART_END s6.loop.IfStatement.138
}}

// index.html:98791 · Phạm vi: loop
function __Part80(){ while(false){
// PLAYER_PART_BEGIN s6.loop.drawLightningEffects.1 EDITABLE
drawLightningEffects();
// PLAYER_PART_END s6.loop.drawLightningEffects.1
}}

// index.html:98792 · Phạm vi: loop
function __Part81(){ while(false){
// PLAYER_PART_BEGIN s6.loop.ctx.restore.1 EDITABLE
ctx.restore();
// PLAYER_PART_END s6.loop.ctx.restore.1
}}

// index.html:98793 · Phạm vi: loop
function __Part82(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.139 EDITABLE
if (typeof cusNkVeMan === 'function') cusNkVeMan();
// PLAYER_PART_END s6.loop.IfStatement.139
}}

// index.html:98794 · Phạm vi: loop
function __Part83(){ while(false){
// PLAYER_PART_BEGIN s6.loop.drawUI.1 EDITABLE
drawUI();
// PLAYER_PART_END s6.loop.drawUI.1
}}

// index.html:98795 · Phạm vi: loop
function __Part84(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.140 EDITABLE
if (wildernessOn()) drawWildernessHud();
// PLAYER_PART_END s6.loop.IfStatement.140
}}

// index.html:98796 · Phạm vi: loop
function __Part85(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.141 EDITABLE
if (typeof bienVeHud === 'function') bienVeHud();
// PLAYER_PART_END s6.loop.IfStatement.141
}}

// index.html:98797 · Phạm vi: loop
function __Part86(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.142 EDITABLE
if (defMode) drawDefenseHud();
// PLAYER_PART_END s6.loop.IfStatement.142
}}

// index.html:98798 · Phạm vi: loop
function __Part87(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.143 EDITABLE
if (reviveOverlay){ drawReviveOverlay(reviveOverlay); reviveOverlay.frame++; if (reviveOverlay.frame > reviveOverlay.total) reviveOverlay = null; }
// PLAYER_PART_END s6.loop.IfStatement.143
}}

// index.html:98800 · Phạm vi: loop
function __Part88(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.144 EDITABLE
if (gameState !== 'pvp') {
                gameSpeed = gameState === 'normal' ? baseSpeed : baseSpeed + 2;   // TAM DUNG tang toc theo thoi gian
                if (defMode || wildernessOn()) gameSpeed = 0;   // Defense khong phai map chay tu dong
                // @@HE-CUSNK — doan phim BOM NGUYEN TU la mot canh phim: dung map lai.
                // Neu de map chay tiep thi sau cu no man hinh van troi va con moi van bo
                // vao giua dam khoi, nhin nhu game khong he dung lai de xem canh do.
                if (typeof cusNkPhim !== 'undefined' && cusNkPhim) gameSpeed = 0;
                if (mapTheme === 'forest') gameSpeed = Math.min(gameSpeed, 6.5); 
                if (mapTheme === 'ocean' && gameState === 'normal') gameSpeed = Math.min(gameSpeed, BIEN_TOC);   // @@HE-BIEN: boi thi troi cham
                
                // KHIEN KHI CHANNEL C2: vua vao channel -> 2 giay mien sat thuong hoan toan
                if (hasRune('chanshldx') && dino) {
                    let _ch = !!(dino.clawChannel || dino.rapidChannel || dino.pulseLaserChannel || dino.fireChannel
                              || dino.lightChannel || dino.splitChannel || dino.pulsarChannel || dino.boomChannel);
                    if (_ch && !dino._chanPrev) {
                        dino.chanInvul = 120;
                        floatingTexts.push(new FloatingText(dino.x, dino.y - 34, "BẤT KHẢ XÂM PHẠM"));
                        visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + dino.h/2, 'parry'));
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880, 0.14, 'sine', 0.18, 1200);
                    }
                    dino._chanPrev = _ch;
                    if (dino.chanInvul > 0) dino.chanInvul--;
                }
                // RUNE LA CHAN TAI TAO — chay o MOI che do (truoc day ket trong 'normal' nen chet o boss rush/test)
                if (hasRune('shield') && dino && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss' || gameState === 'pvp')) {
                    if ((dino.runeShield || 0) < 2) {
                        shieldCharge++;
                        if (shieldCharge >= 600) {                     // 10 giay -> 1 la chan, tru toi da 2
                            shieldCharge = 0; dino.runeShield = (dino.runeShield || 0) + 1;
                            floatingTexts.push(new FloatingText(dino.x, dino.y - 30, "LÁ CHẮN " + dino.runeShield + "/2"));
                            visualEffects.push(new Effect(dino.x + dino.w/2, dino.y, 'parry'));
                            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(720, 0.12, 'sine', 0.16, 1100);
                        }
                    }
                }
                if (gameState === 'normal' && !wildernessOn()) {
                    noDmgStreak++;                                     // choi cang lau khong dinh don...
                    let mult = diemNhan();
                    if (bosses.length === 0) score += 0.1 * mult;
                }
                
                // BAT TU dang deo thi KHONG ghi ky luc — xem ghi chu o @@HE-BATTU
                if (Math.floor(score) > highScore && !wildernessOn() && gameState !== 'test_boss' && !battuBat()) {
                    highScore = Math.floor(score);
                    try { localStorage.setItem("dinoBossHighScore_v106", highScore); } catch(e) {}
                }
            }
// PLAYER_PART_END s6.loop.IfStatement.144
}}

// index.html:98849 · Phạm vi: loop
function __Part89(){ while(false){
// PLAYER_PART_BEGIN s6.loop.IfStatement.145 EDITABLE
if (dojoMode) { dojoRefillUltimates(); if (dino && dino.hp < dino.maxHp) dino.hp = dino.maxHp; tickDojoQueue(); drawMenuPanel(); drawDojoPicker(); }
// PLAYER_PART_END s6.loop.IfStatement.145
}}

// index.html:98850 · Phạm vi: loop
function __Part90(){ while(false){
// PLAYER_PART_BEGIN s6.loop.ExpressionStatement.1 EDITABLE
frames++;
// PLAYER_PART_END s6.loop.ExpressionStatement.1
}}
