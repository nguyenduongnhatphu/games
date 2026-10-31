// PLAYER_FILE: Customization
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: AI_KHO, AMMO_NAMES, APEX_SKINS, CUS_DAN, CX, HUD_HANG, LANG, LH_POWER, LT, PHU_KIEN, POWERS, RNAME, RUNES, RUNE_LUP, ST_HOI, ST_MAX, TRD_POWER, VK, WKG_POWER, X_N_DANG, _ammoKhung, _ammoLupBtn, _chamKhung, _cusNCBtn, afterimages, afterimgCd, aiBat, aiDoKho, ammoColors, ammoPicker, ammoXem, apexColor, apexOn, apexRoleText, battuBat, battuDem, battuMa, battuNhay, birdBank, birdDmgAcc, canvas, coKhoChim, combatStance, ctx, currentAmmoType, currentForm, currentLang, currentPower, currentShieldType, cusMoTaDan, cusNCPicker, danteOn, dashCd, diemNhan, dino, dino2, dragonBat, drawAmmoChiTiet, drawAmmoPicker, drawBattuMa, drawCusNCPicker, drawHinhThai, drawRuneChiTiet, drawRunePicker, drawStyleRank, drawUnityHud, drawUnityRowsMerged, formAmmoSummary, frames, gameState, hasRune, highScore, hinhThaiMo, hudChu, hudHangDragon, hudHangSau, hudHangUnity, ironOn, kinhVeHud, lanRieng2, lhDongBo, lifestealNeed, mouseX, mouseY, nutThuVe, phuKien, previewDino, previewEnemies, pvpThanhMau, pvpThanhUlt, qsDangBat, qsDemDao, qsFin, qsMarks, qsT, runeDongKhoa, runeIcon, runeMerged, runePicker, runeSlots, runeTomHay, runeXem, score, sgHud, sgOn, sgRobot, shieldCdNguoiChoi, shieldCharge, stBat, stCharge, stFreeAir, stHoi, stKhoa, ultCharge, uniVeThanhHop, unityOn, unityRowsMerged, veNutLup, veVienCham, vergilOn, vkMoc, voidBat, vxVeVach, wrapText, xBat, xDongBo, xFormIdx, xFormOn, xHudOn, xHudVe, xHudVuKhi
// index.html:76467 · Phạm vi: global
// PLAYER_PART_BEGIN s5.resetPreview.1 EDITABLE
function resetPreview() {
            previewEnemies = [];
            previewDino.chargeProgress = 0; previewDino.laserActiveTimer = 0; previewDino.fireBreathTimer = 0; previewDino.shieldTimer = 0;
            previewDino.y = 316; previewDino.dy = 0; previewDino.grounded = true;
            previewDino.clawSlashTimer = 0; previewDino.clawSlashBig = false; previewDino.clawUlt = false; previewDino._ultDashX = undefined;
        }
// PLAYER_PART_END s5.resetPreview.1

// index.html:76559 · Phạm vi: global
// PLAYER_PART_BEGIN s5.drawUI.1 EDITABLE
function drawUI() {
            if (gameState === 'pvp') {
                /* @@HE-THANHMAU — THANH MAU DANG SO, KHONG PHAI DANG O.
                   Truoc day moi diem mau ve mot o rong 16px (P1) hoac mot trai tim
                   rong 20px (P2). Voi luat phong 5 mau thi nhin duoc; len 50 mau la
                   50 x 16 = 800px, thanh mot vach do keo gan het be ngang man hinh,
                   con P2 thi 50 x 20 = 1000px, tran ra ngoai. Bay gio be ngang thanh
                   la CO DINH, chi phan da to doi theo ti le, va co so ben canh de
                   biet chinh xac con bao nhieu. */
                ctx.textAlign = "left";
                pvpThanhMau(20, 22, 250, 18, dino, "#4CAF50", false);
                // P1 truoc gio khong co hang DAN trong PvP, chi P2 co — nhin lech han.
                ctx.font = "bold 15px Consolas, monospace"; ctx.textAlign = "left";
                hudChu(LANG[currentLang].ammo, 20, 76);
                if (dino.isOverheated){ ctx.fillStyle = "red"; ctx.fillText(LANG[currentLang].reloading, 90, 76); }
                else for (let i = 0; i < dino.maxAmmo; i++){
                    ctx.fillStyle = i < dino.ammo ? ammoColors[dino.ammoType] : "rgba(0,0,0,0.3)";
                    ctx.fillRect(90 + i * 16, 64, 12, 12);
                }
                hudChu(LANG[currentLang].shield, 20, 96);
                ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(90, 86, 90, 10);
                ctx.fillStyle = dino.shieldCd <= 0 ? "#00FF00" : "#FFC107";
                ctx.fillRect(90, 86, Math.max(0, 90 * (1 - dino.shieldCd / shieldCdNguoiChoi())), 10);
                pvpThanhUlt(20, 132, 250, 12, ultCharge, dino.ultActive, false);
                if (typeof unityOn === 'function' && unityOn()) uniVeThanhHop(20, 160, 250, 9, false);
                // Dang cam gi va dang o the nao — truoc gio khong hien, nen giua tran
                // khong ai biet minh vua doi sang the gi.
                ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "left";
                hudChu(AMMO_NAMES[dino.ammoType], 20, 114);

                // P2
                ctx.textAlign = "right";
                pvpThanhMau(canvas.width - 270, 22, 250, 18, dino2, "#E53935", true);
                // Hang DAN cu o y=65, ma ten "P2" duoi thanh mau nam o y=55 va cung
                // can le phai — hai chu dam vao nhau. Day ca cum xuong cho khop voi P1.
                ctx.font = "bold 15px Consolas, monospace"; ctx.textAlign = "right";
                hudChu(LANG[currentLang].ammo, canvas.width - 20, 76);
                if (dino2.isOverheated) { ctx.fillStyle = "red"; ctx.fillText(LANG[currentLang].reloading, canvas.width - 80, 76); }
                else {
                    for (let i = 0; i < dino2.maxAmmo; i++) {
                        ctx.fillStyle = i < dino2.ammo ? ammoColors[dino2.ammoType] : "rgba(0,0,0,0.3)";
                        ctx.fillRect(canvas.width - 92 - (dino2.maxAmmo - 1 - i) * 16, 64, 12, 12);
                    }
                }
                ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "right";
                hudChu(AMMO_NAMES[dino2.ammoType], canvas.width - 20, 114);
                ctx.font = "bold 15px Consolas, monospace"; ctx.textAlign = "right";
                hudChu(LANG[currentLang].shield, canvas.width - 20, 96);
                ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(canvas.width - 180, 86, 90, 10);
                ctx.fillStyle = dino2.shieldCd <= 0 ? "#00FF00" : "#FFC107";
                ctx.fillRect(canvas.width - 180 + (dino2.shieldCd * 90 / 90), 86, Math.max(0, 90 - (dino2.shieldCd * 90 / 90)), 10);
                pvpThanhUlt(canvas.width - 270, 132, 250, 12, lanRieng2.ult, dino2.ultActive, true);
                // Nhan bao dang danh voi may. Truoc do toi gan no canh dau ban dung — ma cho
                // do la man SANH chu khong phai trong tran, nen vao danh khong thay gi.
                if (typeof aiBat !== 'undefined' && aiBat){
                    ctx.fillStyle = "#4DB6AC"; ctx.font = "bold 11px Consolas, monospace";
                    ctx.textAlign = "right";
                    ctx.fillText("MÁY — " + AI_KHO[aiDoKho].ten, canvas.width - 20, 100);
                    ctx.textAlign = "left";
                }
                nutThuVe();                                   // @@HE-NUTTHU

                ctx.textAlign = "left";
            } else {
                ctx.fillStyle = "black"; ctx.font = "bold 18px Consolas, monospace"; let scoreStr = Math.floor(score).toString().padStart(5, '0'); let hiStr = highScore.toString().padStart(5, '0');
                hudChu(`HI ${hiStr}  ${scoreStr}`, canvas.width - 200, 35); hudChu(LANG[currentLang].hp, 20, 35);
                let _m = diemNhan(); if (_m > 1.05) { ctx.fillStyle = _m >= 4 ? "#FFEB3B" : "#4CAF50"; ctx.font = "bold 13px Consolas, monospace"; ctx.fillText("STREAK x" + _m.toFixed(1), canvas.width - 200, 52); }
                /* @@HE-BATTU — nhan BAT TU + bo dem so lan trung. Dat ngay canh thanh mau vi do
                   la cho nguoi choi nhin khi muon biet "vua roi co dinh khong": thanh mau khong
                   doi nua, nen bo dem nay thay no lam viec bao hieu. */
                if (typeof battuBat === 'function' && battuBat()){
                    ctx.save();
                    ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "left";
                    ctx.fillStyle = battuNhay > 0 ? "#FFF176" : "#78909C";
                    ctx.fillText("\u221E BẤT TỬ · THỬ NGHIỆM", 20, 52);
                    ctx.fillStyle = battuNhay > 0 ? "#FFF176" : "#B0BEC5";
                    ctx.fillText("ĐÃ TRÚNG " + battuDem, 208, 52);
                    ctx.restore();
                }
                ctx.fillStyle = "#E53935"; ctx.font = "bold 20px Consolas, monospace"; ctx.fillText("\u2665", 60, 35); ctx.fillStyle = dino.hp <= 1 ? "#FF5252" : "white"; ctx.font = "bold 18px Consolas, monospace"; ctx.fillText(Math.max(0,Math.ceil(dino.hp)) + "/" + dino.maxHp, 60 + 22, 34); { let _sh = dino.runeShield || 0; if (_sh > 0) { ctx.fillStyle = "#4FC3F7"; ctx.font = "16px Consolas, monospace"; ctx.fillText("\u2748".repeat(_sh), 60 + 78, 34); } } if (coKhoChim()) { ctx.fillStyle = "#FF7043"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "left"; ctx.fillText(birdBank + "\uD83D\uDC26", 205, 34); } ctx.font = "bold 20px Consolas, monospace";

                ctx.font = "bold 15px Consolas, monospace";
                if (typeof kinhVeHud === 'function') kinhVeHud();      // THUY TINH: 2 lop mau ao
                let _xH = (typeof xHudOn === 'function') && xHudOn();   // dang la X: hang DAN thanh hang VU KHI cua X
                if (_xH) xHudVuKhi(); else hudChu(LANG[currentLang].ammo, 20, 65);
                if (_xH) { /* HUD vu khi X da ve o tren */ }
                else if (vkMoc(currentAmmoType, 'veHudDan')) vkMoc(currentAmmoType, 'veHudDan').call(dino);   // @@KHOI-VK
                else if (dino.isOverheated) { ctx.fillStyle = "red"; ctx.fillText(LANG[currentLang].reloading, 80, 65); } 
                else { 
                    if (dino.maxAmmo > 12) { ctx.fillStyle = ammoColors[dino.ammoType]; ctx.font = "bold 18px Consolas, monospace"; ctx.fillText(dino.ammo + "", 84, 66); ctx.fillStyle = "#fff"; ctx.font = "bold 12px Consolas, monospace"; ctx.fillText("VIÊN", 118, 65); }
                    else for (let i = 0; i < dino.maxAmmo; i++) { 
                        ctx.fillStyle = i < dino.ammo ? ammoColors[dino.ammoType] : "rgba(0,0,0,0.3)"; 
                        ctx.fillRect(80 + i * 16, 53, 12, 12); 
                    } 
                }

                { let _vkH2 = vkMoc(currentAmmoType, 'veHudThem'); if (_vkH2 && !_xH) _vkH2.call(dino); }   // @@KHOI-VK — o HUD phu duoi bang dan (DinoSaw, Custom)

                hudChu(LANG[currentLang].shield, 20, 85);
                ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(90, 75, 90, 10);
                if (currentShieldType === 1){
                    // Khien chu dong: thanh NANG LUONG. Do = dang khoa, chua gio lai duoc.
                    let e = (dino.shieldEnergy === undefined ? 100 : dino.shieldEnergy);
                    ctx.fillStyle = dino.shieldLock ? "#EF5350" : (e > 40 ? "#69F0AE" : "#FFC107");
                    ctx.fillRect(90, 75, Math.max(0, 90 * e / 100), 10);
                    if (dino.shieldLock){
                        ctx.fillStyle = "#EF5350"; ctx.font = "bold 9px Consolas, monospace";
                        ctx.fillText(LT("KIỆT","OUT"), 186, 84);
                        ctx.font = "bold 15px Consolas, monospace";
                    }
                } else {
                    ctx.fillStyle = dino.shieldCd <= 0 ? "#00FF00" : "#FFC107";
                    ctx.fillRect(90, 75, Math.max(0, 90 * (1 - dino.shieldCd / shieldCdNguoiChoi())), 10);
                }

                let ultNames = ["OVERCHARGE", "ATOMIC CORE", "OVERDRIVE", "PRISM NOVA", "THUNDER GOD", "JUDGEMENT CUT", "SUPERNOVA"];
                let uE = dino.ultActive ? (dino.ultAmmo === 2 ? (dino.ammo / Math.max(1, dino.maxAmmo) * 100) : ultCharge) : ultCharge;
                let timedUlt = dino.fireReactorTimer > 0 || dino.lightningFormTimer > 0;
                let uFull = ultCharge >= 100 && !dino.ultActive && !timedUlt;
                if (typeof sgOn === 'function' && sgOn(dino)){ const r=sgRobot(dino);uFull=!r&&ultCharge>=100;uE=r?r.time/1200*100:ultCharge;ultNames[20]=r?'ROBOT '+Math.ceil(r.time/60)+'s':'ROBOT'; }
                ctx.font = "bold 11px Consolas, monospace";
                hudChu(hasRune('shintrick') ? (qsFin ? "QUICKSILVER — KẾT" : (qsT > 0 ? ("QUICKSILVER " + (qsT/60).toFixed(1) + "s · " + qsMarks.length + " VẾT · " + qsDemDao() + " DAO") : "QUICKSILVER")) : (ultNames[currentAmmoType] || LANG[currentLang].ult_word), 20, 104);
                if (_chamKhung && typeof veVienCham === 'function') veVienCham();   // @@HE-DOICHAM
                ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(120, 95, 120, 11);
                ctx.fillStyle = hasRune('shintrick') ? (qsDangBat() ? "#4DD0E1" : (ultCharge >= 100 ? "#00E5FF" : "#546E7A")) : ((dino.ultActive ? ((VK[dino.ultAmmo] && VK[dino.ultAmmo].mauHudUlt) || "#FFEB3B") : (timedUlt ? (dino.fireReactorTimer > 0 ? "#FF5722" : "#00E5FF") : (uFull ? (frames % 20 < 10 ? "#FFEB3B" : "#FF9800") : "#9C27B0"))));
                ctx.fillRect(120, 95, 120 * Math.min(100, uE) / 100, 11);
                ctx.strokeStyle = "black"; ctx.lineWidth = 1; ctx.strokeRect(120, 95, 120, 11);
                if (typeof vxVeVach === 'function') vxVeVach(120, 95, 120, 11);   // @@HE-VANXA: 4 vach 25%
                // ===== @@HE-HUDHANG — CON TRO HANG =====
                // Truoc day moi cum HUD deu chot cung mot toa do y (124 / 131 / 156...), nen
                // cu them mot cum moi — thanh NO cua Dragon, hai o dan cua Unity — la co hai
                // thu de len nhau. Gio dung mot con tro chay: cum nao co hien thi mo. Them
                // cum moi thi chi can lay hang tu con tro nay.
                // -- UNITY: hai o dan doi bang Q/E --
                if (unityOn()) drawUnityHud(120, hudHangUnity() + 12);
                // Thanh HOP NHAT. Truoc day toi chi gan no vao HUD cua PvP, nen o che do
                // danh quai nguoi choi khong thay gi ca: khong biet nap toi dau, khong biet
                // bao gio bam duoc Y — nhin y het nhu ky nang chua ton tai.
                if (unityOn() && typeof uniVeThanhHop === 'function')
                    uniVeThanhHop(120, hudHangUnity() + 20, 120, 9, false);
                // -- THE: chi con y nghia o Power CO BAN (Void/Dragon deu ep ve Gunslinger).
                //    Thanh NO cua Dragon chiem dung hang nay khi choi Power Rong.
                if (!(typeof voidBat === 'function' && (voidBat() || dragonBat() || (typeof xHudOn === 'function' && xBat())))){
                  let ty = hudHangDragon();
                  let SN = LANG[currentLang].stances, SC = ["#FF8F00", "#00ACC1", "#7E57C2"];
                  ctx.fillStyle = SC[combatStance]; ctx.font = "bold 13px Consolas, monospace"; ctx.fillText("◆ " + SN[combatStance], 20, ty + 12);
                  ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.font = "9px Consolas, monospace"; ctx.fillText("[I]→ [O]←", 168, ty + 12);
                }
                let hudY = hudHangSau();
                if (stBat()) {
                  // SHIN TRICKSTER: 3 o charge thay cho mot thanh hoi
                  ctx.font = "bold 11px Consolas, monospace"; hudChu(LANG[currentLang].dash, 20, hudY + 9);
                  for (let i = 0; i < ST_MAX; i++) {
                      let ox = 120 + i * 42, day = i < stCharge;
                      ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(ox, hudY, 36, 9);
                      if (day) { ctx.fillStyle = "#00E5FF"; ctx.fillRect(ox, hudY, 36, 9); }
                      else if (stKhoa <= 0 && i === stCharge) { ctx.fillStyle = "#00838F"; ctx.fillRect(ox, hudY, 36 * (1 - Math.max(0, stHoi) / ST_HOI), 9); }
                      ctx.strokeStyle = "black"; ctx.lineWidth = 1; ctx.strokeRect(ox, hudY, 36, 9);
                  }
                  if (stKhoa > 0) { ctx.fillStyle = "#FF7043"; ctx.font = "bold 9px Consolas, monospace"; ctx.fillText("KHOÁ " + (stKhoa / 60).toFixed(1) + "s", 250, hudY + 8); }
                  else if (stFreeAir && !dino.grounded) { ctx.fillStyle = "#FFD54F"; ctx.font = "bold 9px Consolas, monospace"; ctx.fillText("MIỄN PHÍ", 250, hudY + 8); }
                  hudY += HUD_HANG;
                }
                else { let dMax = combatStance === 1 ? 26 : 42, dReady = dashCd <= 0;
                  ctx.font = "bold 11px Consolas, monospace"; hudChu(LANG[currentLang].dash, 20, hudY + 9);
                  ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(120, hudY, 120, 9);
                  ctx.fillStyle = dReady ? "#00E5FF" : "#546E7A"; ctx.fillRect(120, hudY, 120 * (1 - Math.max(0, dashCd) / dMax), 9);
                  ctx.strokeStyle = "black"; ctx.lineWidth = 1; ctx.strokeRect(120, hudY, 120, 9);
                  ctx.fillStyle = dReady ? "#00BCD4" : "#78909C"; ctx.font = "bold 9px Consolas, monospace"; ctx.fillText(dReady ? LANG[currentLang].ready : "...", 246, hudY + 8);
                  hudY += HUD_HANG; }
                // ==== THANH NANG LUONG cua cac RUNE tu dong ====
                { let ry = hudY;
                  if (_xH) ry = xHudVe(ry);   // vung Rune / Power trong cua X: NANG LUONG + GIAP + thoi gian
                  if (hasRune('shield')) {
                      let p = Math.max(0, Math.min(1, shieldCharge / 600)), sn = dino.runeShield || 0;
                      ctx.font = "bold 11px Consolas, monospace"; hudChu("LÁ CHẮN", 20, ry + 9);
                      ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(120, ry, 120, 9);
                      ctx.fillStyle = "#4FC3F7"; ctx.fillRect(120, ry, 120 * p, 9);
                      ctx.strokeStyle = "black"; ctx.lineWidth = 1; ctx.strokeRect(120, ry, 120, 9);
                      ctx.fillStyle = "#0277BD"; ctx.font = "bold 9px Consolas, monospace"; ctx.fillText(sn + "/2", 246, ry + 8);
                      ry += 18;
                  }
                  if (hasRune('redbird')) {
                      let _lsN = lifestealNeed();
                      let p = Math.max(0, Math.min(1, birdDmgAcc / _lsN));
                      ctx.font = "bold 11px Consolas, monospace"; hudChu("HÚT MÁU", 20, ry + 9);
                      ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(120, ry, 120, 9);
                      ctx.fillStyle = "#EF5350"; ctx.fillRect(120, ry, 120 * p, 9);
                      ctx.strokeStyle = "black"; ctx.lineWidth = 1; ctx.strokeRect(120, ry, 120, 9);
                      ctx.fillStyle = "#B71C1C"; ctx.font = "bold 9px Consolas, monospace";
                      ctx.fillText("[" + Math.floor(birdDmgAcc) + "/" + _lsN + "]", 246, ry + 8);
                      ry += 18;
                  }
                  if (hasRune('afterimg') || combatStance === 1) {
                      let p = afterimages.length > 0 ? 1 : Math.max(0, Math.min(1, 1 - afterimgCd / 300));
                      ctx.font = "bold 11px Consolas, monospace"; hudChu("TÀN ẢNH", 20, ry + 9);
                      ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(120, ry, 120, 9);
                      ctx.fillStyle = afterimages.length > 0 ? "#B39DDB" : "#7E57C2"; ctx.fillRect(120, ry, 120 * p, 9);
                      ctx.strokeStyle = "black"; ctx.lineWidth = 1; ctx.strokeRect(120, ry, 120, 9);
                      ctx.fillStyle = "#4527A0"; ctx.font = "bold 9px Consolas, monospace";
                      ctx.fillText(afterimages.length > 0 ? "ĐANG CÓ" : (p >= 1 ? LANG[currentLang].ready : "..."), 246, ry + 8);
                  }
                    if (typeof sgOn === 'function' && sgOn(dino)) sgHud(dino,ry+((hasRune('afterimg')||combatStance===1)?18:0)+4);
                }
                if (timedUlt) { ctx.fillStyle = "#000"; ctx.font = "bold 11px Consolas, monospace"; ctx.fillText(Math.ceil((dino.fireReactorTimer + dino.lightningFormTimer) / 60) + "s", 250, 105); }
                else if (uFull && !dino.jcState) { ctx.fillStyle = frames % 20 < 10 ? "#D50000" : "#000"; ctx.font = "bold 12px Consolas, monospace"; ctx.fillText(LANG[currentLang].press_u, 246, 105); }
                else if (dino.ultFillMult > 1 && !dino.ultActive) { ctx.fillStyle = "#FFD600"; ctx.font = "bold 12px Consolas, monospace"; ctx.fillText(LANG[currentLang].charge_x + dino.ultFillMult, 250, 105); }
                else if (dino.ultActive) { ctx.fillStyle = "#000"; ctx.font = "bold 10px Consolas, monospace"; ctx.fillText("ULT!", 246, 105); }

                let _mb = mouseX >= canvas.width - 94 && mouseX <= canvas.width - 10 && mouseY >= 6 && mouseY <= 30;
                ctx.fillStyle = _mb ? "#616161" : "rgba(66,66,66,0.92)"; ctx.fillRect(canvas.width - 94, 6, 84, 24);
                ctx.strokeStyle = "rgba(255,255,255,0.6)"; ctx.lineWidth = 1; ctx.strokeRect(canvas.width - 94, 6, 84, 24);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("❚❚ MENU", canvas.width - 52, 22);
                drawStyleRank();

                ctx.textAlign = "left";
            }
        }
// PLAYER_PART_END s5.drawUI.1

// index.html:77139 · Phạm vi: global
// PLAYER_PART_BEGIN s5.drawCustomMenu.1 EDITABLE
function drawCustomMenu() {
            if (typeof lhDongBo === 'function') lhDongBo();   // @@HE-LHDAN: chon Luoi hai o day thi bang Power khoa ngay sang DEATH
            if (typeof xDongBo === 'function') xDongBo();     // X la mot DANG: Power tu khoa sang X
            const _xK = ((typeof xFormOn === 'function') && xFormOn()) || apexOn();   // Dang X: Power / Rune / Dan bi khoa
            ctx.fillStyle = "#120c06"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#00E5FF"; ctx.font = "bold 24px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("CUSTOMIZE YOUR DINO", CX, 32);

            const forms = ["NORMAL", "RUSH", "ULTIMATE", "BEYOND", "MÁY MÓC", LT("THỦY TINH", "GLASS"), LT("BỘ XƯƠNG", "SKELETON"), "X", "APEX", "DANTE", "VERGIL", "IRONHAUL"];
            const formDesc = currentLang==="en"
                ? ["Small and nimble — 5 HP. Passive: dash recovers 15% faster.",
                   "Agile, blue spikes — 5 HP. Passive: run 6% faster.",
                   "Big, dark, aura — 6 HP (bigger body, easier to hit). Passive: the aura burns small monsters standing close, 1 damage a second (not bosses).",
                   "Peak: horns + scales — 6 HP (bigger body). Passive: 25s without being hit grows a SCALE that blocks one hit (max 1).",
                   "A machine — 5 HP. Higher jump, no double jump. Second jump hovers for 2 seconds; with triple jump you can move up and down. Rocket is built in. With the ROCKET accessory, a dash keeps going while you hold a direction.",
                   "Mega Man X — Power, Runes, Ammo locked. 10 HP. J shoots, K charges, I / O swap weapon, Q / E pauses to choose armor or return to base X. Armor drains 1 energy/s; Ultimate drains 5/s. Base X regenerates 1/s; hits also restore energy. Gaea: hold J for rapid short-range shots; max charge in 0.2s."]
                : ["Nhỏ gọn — 5 máu. Nội tại: hồi lướt nhanh hơn 15%.",
                   "Nhanh nhẹn, gai xanh — 5 máu. Nội tại: chạy nhanh hơn 6%.",
                   "To, tối màu, hào quang — 6 máu (người to hơn, dễ trúng đòn hơn). Nội tại: hào quang đốt quái thường đứng sát 1 sát thương mỗi giây (không tính boss).",
                   "Đỉnh cao, sừng + vảy — 6 máu (người to hơn). Nội tại: 25 giây không dính đòn thì mọc một lớp VẢY chặn trọn một đòn (tối đa 1).",
                   "Thân máy — 5 máu. Nhảy cao, không nhảy đôi. Nhảy lần hai thì lơ lửng 2 giây; có nhảy ba bậc thì lên xuống được. Tên lửa gắn sẵn. Đeo TÊN LỬA: giữ hướng khi lướt thì trượt tới khi thả.",
                   "Mega Man X — khóa Power, Rune, Đạn. 10 máu. J bắn, K nạp, I / O đổi hệ, Q / E tạm dừng để chọn giáp hoặc về X thường. Giáp hao 1 năng lượng/s, Ultimate hao 5/s. X thường hồi 1/s; đánh trúng cũng hồi. Gaea giữ J bắn liên tục tầm gần, nạp đầy trong 0,2s."];
            const ammos = AMMO_NAMES;
            const ammoDesc = currentLang==="en" ? ["The Charge specialist. Hold longer and it keeps evolving — heavy round, piercing round, then a fission burst. Tap-firing is just filler.","The all-rounder. Almost everything splashes, so it clears packs and chews through bosses alike, and what it touches keeps burning.","Infinite ammo, but every shot starts wide. Keep the trigger down and the spread walks inward — thirty rounds in it is a purple laser firing twice as fast.","The strange one. Shards split, bounce and pierce, and the longer you stay on one target the harder it detonates. Learn it to use it.","Crowd king. Bolts leap from one enemy to the next, so the bigger the swarm the better. One-on-one with a boss it runs dry.","A close-range swordsman. There is a whole combo system hidden in your jump, dash and direction keys — go find it yourself.","You do not shoot enemies, you feed a star. It swallows every bullet near it and spits them back out in all directions, multiplied.","Throw it, then catch it yourself. A clean catch hurls it straight back into their face; a miss leaves you empty-handed.","Pure control. Every shot stacks frost; five stacks freeze. Then choose: leave them frozen, or shatter the ice for a burst.","Four rounds, no reload. The fourth is always the loudest — it executes on what they have already lost. Every hit leaves a mark for the rest of the kit.", "A melee weapon. J and K chain into each other like a Musou combo. Reach is 1.5x the sword but it has no ranged attack at all, so its answer to flying bosses is the air combo.", "A heavy melee weapon. Carrying it slows you to 85%; throwing it puts you at 120% but leaves you unable to attack. Every move has uncancellable recovery, and slams land where the hammer head hits.","J J J = right-left-right. Hold K to bank damage (lost health and parries add to it), release K to spend it all. HIDDEN INPUTS (Fwd = facing): Back Fwd J Hadoken · Down Fwd J Hashogeki · Back Down Fwd J Kamehameha (needs 50) · J then Jump Shoryuken · J Fwd J long jab · Down J ground punch · Dash J lunge · Down Down Denjin · In air: Down J Heaven Drop, Up Up Down J Stomp. Magnifier: numbers.","Mid-range melee. Web slows and binds to force an opening, then whip strings, spike bursts and a grab-slam pour everything into that opening.","The unfinished gun — the weakest in the roster, by design. Six rounds a second, and emptying its six-round magazine overheats it on the spot. Holding K banks rounds into a separate store that fires half again as fast and ignores heat.","A chainsaw swung like a sword — and swinging a chainsaw is a terrible way to use one, so the slashes are pathetic. Everything lives on the engine: release K (or Dash+J to pull-start) and the whole moveset changes tier by tier while fuel lasts; landing hits keeps it running. Down+J plows forward, holding J with the engine on grinds into the target.","Thin needles that pierce once. Every hit adds a PERMANENT bleed stack — the longer the fight, the harder it bleeds. K fans out needles (point-blank pins twice as deep); Down+J rips every needle out for instant damage. The Channel strings a net across the map, the ultimate is a storm of needles.","No ammo until you make it: hold K to forge swords on your back. Tap J throws one, HOLD J fuses 1–6 into one strike (up to a Heaven Sword), Dash+J fans them all, Down+J plants a sword wall. Swords block bullets on their own (and glow, adding damage to a fusion); six make a shield. Channel opens the Gate of Treasure, the ultimate drops ten thousand swords.","Death's scythe. Cuts land fast but recover SLOWLY, and every combo branches on RHYTHM: press straight on, or pause a beat (the blade flashes purple) and press. Holding it locks the Power to DEATH — hits build rage, I/O calls the Reaper to fight at your side.","A huge two-handed greatsword, 3 stamina. Swings start slow then crash down; after a chop the blade STAYS IN THE GROUND until you heave it back up (that lift is a cut too). Long reach, heavy feet. Charge it for a rising cleave, a gravity-sealing plant, a leaping gravity crash or a giant stone blade; hold J to wrap the blade in energy for a heavier cut."] : ["Vua của đòn Charge. Giữ càng lâu càng biến hoá: viên to, viên xuyên, rồi vỡ thành chùm mảnh. Bắn thường chỉ để cầm chừng.","Đa dụng nhất bảng. Gần như đòn nào cũng nổ lan nên vừa dọn bầy vừa gặm boss, và thứ gì dính lửa cũng cháy tiếp một lúc.","Vô hạn đạn, nhưng bắn phát nào cũng tản. Giữ liên tục thì đạn khép dần vào giữa — đủ ba mươi viên nó thành tia laser tím, nhịp bắn nhanh gấp đôi.","Loại lắt léo nhất. Đạn tách, nảy, xuyên, và càng bám riết một mục tiêu thì đòn nổ càng đau. Phải hiểu cơ chế mới xài được.","Ông vua dọn bầy. Sét tự nhảy từ con này sang con khác, càng đông càng lời. Nhưng tay đôi với boss thì hụt hơi.","Kiếm sĩ cận chiến. Có nguyên một hệ combo giấu trong nút nhảy, nút lướt và hướng bấm — tự tìm ra mới vui.","Bạn không bắn kẻ địch, bạn nuôi một ngôi sao. Sao hút mọi viên đạn quanh nó rồi bắn trả gấp bội ra khắp hướng.","Ném đi rồi phải tự bắt. Bắt gọn thì lưỡi bay ngược vào mặt kẻ địch, hụt thì trắng tay ngồi chờ. Càng liều càng lãi.","Thuần khống chế. Mỗi phát cộng một tầng băng, đủ 5 tầng thì đóng băng. Rồi tự chọn: để yên mà khống, hay đập vỡ lấy sát thương.","Bốn viên, không nạp lại. Viên thứ tư luôn là viên to nhất — nó ăn theo lượng máu đối thủ đã mất. Mỗi phát trúng để lại một dấu ấn cho các đòn sau.", "Vũ khí cận chiến. J và K nối nhau thành combo kiểu Musou. Tầm đánh gấp rưỡi Kiếm nhưng hoàn toàn không có đòn tầm xa, nên cách với tới boss bay là combo trên không.", "Vũ khí cận chiến hạng nặng. Cầm búa thì chạy nhảy còn 85%, ném búa đi thì lên 120% nhưng không đánh được gì. Mọi đòn đều có khung khựng không huỷ, và cú nện nổ ngay chỗ đầu búa chạm đất.","J J J đấm phải-trái-phải. Giữ K tích sát thương (mất máu, đỡ đòn cũng cộng), nhả K xả hết. LỆNH ẨN (Tiến = hướng mặt): Lùi Tiến J Hadoken · Xuống Tiến J Hashogeki · Lùi Xuống Tiến J Kamehameha (cần 50) · J rồi Nhảy Shoryuken · J Tiến J đấm vói · Xuống J nện đất · Lướt J lao đấm · Xuống Xuống Denjin · Trên không: Xuống J Thiên Truy, Lên Lên Xuống J Nhảy Đạp. Kính lúp: số liệu.","Cận chiến tầm trung. Tơ làm chậm rồi trói để mở khoảng trống, sau đó chuỗi quất, gai bung và cú tóm-đạp dồn hết vào khoảng trống đó.","Khẩu chưa xong — yếu nhất bảng, và đó là chủ ý. 6 viên mỗi giây, cạn băng 6 viên là quá nhiệt ngay. Giữ K trữ đạn vào một kho riêng; xả kho thì bắn nhanh gấp rưỡi và không sợ nóng.","Cưa máy vung như kiếm — mà vung cưa thì phế thật, nên nhát chém chỉ 1 sát thương. Tất cả nằm ở động cơ: nhả K (hoặc Lướt+J giật dây đề) là nổ máy, cả bộ đòn đổi nấc theo thời gian giữ, chạy chừng nào còn xăng — cưa trúng thì máy chạy lâu hơn. Xuống+J cày đất lao tới, giữ J khi nổ máy là nghiến vào mục tiêu.","Kim mảnh xuyên một lần. Mỗi mũi trúng cộng một vết CHẢY MÁU VĨNH VIỄN — trận càng dài máu chảy càng nhiều. K phóng quạt kim (sát mặt thì ghim sâu gấp đôi); Xuống+J rút hết kim lấy sát thương ngay. Channel giăng lưới dây kín map, chiêu cuối là cơn mưa kim.","Không có đạn cho tới khi tự rèn: giữ K sinh kiếm sau lưng. Chạm J ném một thanh, GIỮ J gộp 1–6 thanh thành một đòn (tới Thiên Kiếm), Lướt+J xoè quạt cả lưng, Xuống+J cắm tường kiếm. Kiếm tự chặn đạn (và phát sáng, cộng sát thương khi gộp); đủ sáu thanh thành khiên. Channel mở Vương Khố, chiêu cuối là Vạn Kiếm Quy Tông.","Lưỡi hái của thần chết. Chém ra rất nhanh nhưng THU HỒI CHẬM, và combo nào cũng rẽ nhánh theo NHỊP: bấm liền, hay dừng một nhịp (lưỡi loé tím) rồi bấm. Cầm nó thì Power khoá sang DEATH — đánh trúng tích nộ, I/O gọi thần chết ra đánh cùng.","Đại kiếm hai tay, 3 thể lực. Vung chậm lúc đầu rồi giáng xuống cực nhanh; chém xong kiếm NẰM DƯỚI ĐẤT tới khi nhấc lên (nhát nhấc cũng là một đòn chém). Tầm xa, chân nặng. Charge để chém quét, cắm kiếm khoá kẻ bay, nhảy đáp trọng lực hay hoá đại cự kiếm đá; giữ J để bọc kiếm năng lượng chém nặng hơn."];
            ammoDesc.push(currentLang === 'en' ? 'Dual six-round pistols. Dash fans cover 60°. K: twin shot / 3-damage piercing fusion / instant 5-damage mini rail at 0.25s / 0.5s. Q/E cycle pistols / gunblades / cannon. J attacks; gunblades chain 4 / 4 / 6 damage. U: 20-second Robot, 10 armour HP, J plasma, K blade, hold U for 20 missiles. Independent loading: up to 30 pistol damage and 30 sword damage. Sword K: two advancing spins; air K dives.' : 'Hai súng, mỗi khẩu 6 viên. Combo lướt tỏa 60°. K: bắn kép / hợp nhất xuyên 3 sát thương / mini rail tức thời 5 sát thương, mốc 0.25s / 0.5s. Q/E đổi Song súng / Song kiếm / Đại bác. J đánh; kiếm nối 4 / 4 / 6 sát thương. U: Robot 20 giây, 10 giáp, J Plasma, K kiếm, giữ U phóng 20 tên lửa. Nạp độc lập: súng 30 và kiếm 30. K kiếm: hai đòn xoay; trên không bổ xuống.');
            const SHIELDS = currentLang==="en" ? ["PARRY","ACTIVE SHIELD"] : ["ĐỠ ĐÒN", "KHIÊN CHỦ ĐỘNG"];
            const shieldDesc = currentLang==="en" ? ["Time it right: block 1 hit + parry counter.","Hold up to 1.5s, 4s cooldown. Trade-off: no parry."] : ["Bấm đúng lúc: chặn 1 đòn + phản đòn (parry).", "Giữ tối đa 1,5s, sạc 4s. Đổi lại: mất phản đòn."];

            function panel(x, y, w, h, title, tc) {
                ctx.fillStyle = "rgba(255,255,255,0.03)"; ctx.fillRect(x, y, w, h);
                ctx.strokeStyle = "rgba(255,255,255,0.10)"; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
                ctx.fillStyle = tc; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "left"; ctx.fillText(title, x + 12, y + 19);
            }
            function selRow(cy, label, value, valColor, desc, descH) {
                ctx.fillStyle = "white"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "left"; ctx.fillText(label, 340, cy + 19);
                let hl = mouseX >= 430 && mouseX <= 456 && mouseY >= cy && mouseY <= cy + 28;
                let hr = mouseX >= 636 && mouseX <= 662 && mouseY >= cy && mouseY <= cy + 28;
                ctx.fillStyle = hl ? "#FFD54F" : "#FFC107"; ctx.fillRect(430, cy, 26, 28); ctx.textAlign = "center"; ctx.fillStyle = "black"; ctx.fillText("<", 443, cy + 19);
                ctx.fillStyle = hr ? "#FFD54F" : "#FFC107"; ctx.fillRect(636, cy, 26, 28); ctx.fillStyle = "black"; ctx.fillText(">", 649, cy + 19);
                ctx.fillStyle = valColor; ctx.font = "bold 15px Consolas, monospace"; ctx.fillText(value, 546, cy + 19);
                ctx.fillStyle = "#90A4AE"; ctx.font = "11px Consolas, monospace"; ctx.textAlign = "left";
                ctx.save(); ctx.beginPath(); ctx.rect(336, cy + 32, 330, descH || 104); ctx.clip();
                if (descH === 30) formAmmoSummary(desc,340,cy+44,320,13);
                else if (desc && desc.length > 300){ ctx.font = "10px Consolas, monospace"; wrapText(desc, 340, cy + 44, 322, 12); }   // mo ta dai (Midas + lenh an): chu nho de vua khung
                else wrapText(desc, 340, cy + 46, 320, 14);
                ctx.restore();
            }

            // ===== BACK (goc phai tren) =====
            let bBack = mouseX >= 890 && mouseX <= 985 && mouseY >= 8 && mouseY <= 32;
            ctx.fillStyle = bBack ? "#757575" : "#424242"; ctx.fillRect(890, 8, 95, 24); ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("← BACK", 937, 25);

            // ===== TRAI: STANCE =====
            panel(12, 44, 300, 490, LT("POWER — NĂNG LỰC","POWER"), "#B388FF");
            /* @@HE-WUKONG — muc `runeMo` KHONG duoc liet ke o day. Hai ly do: no khong phai
               thu bam tay chon duoc (rune tu bat), va bang chi vua ba the — the thu tu roi
               xuong y = 684 trong khi man chi cao 560, tuc la nam han ngoai man hinh. */
            for (let i2 = 0; i2 < POWERS.length; i2++) {
                let P = POWERS[i2];
                if (P.runeMo) continue;
                let y = 76 + i2 * 152, sel = currentPower === i2;
                let hov = mouseX >= 24 && mouseX <= 300 && mouseY >= y && mouseY <= y + 142;
                ctx.fillStyle = sel ? "rgba(255,255,255,0.10)" : (hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)");
                ctx.fillRect(24, y, 276, 142);
                ctx.strokeStyle = sel ? P.mau : "rgba(255,255,255,0.12)"; ctx.lineWidth = sel ? 2 : 1;
                ctx.strokeRect(24, y, 276, 142);
                ctx.fillStyle = P.mau; ctx.font = "bold 15px Consolas, monospace"; ctx.textAlign = "left";
                ctx.fillText(LT(P.ten, P.tenEn), 36, y + 26);
                if (sel) { ctx.fillStyle = P.mau; ctx.font = "10px Consolas, monospace"; ctx.textAlign = "right";
                           ctx.fillText(LT("● ĐANG CHỌN","● SELECTED"), 290, y + 26); ctx.textAlign = "left"; }
                ctx.fillStyle = "#B0BEC5"; ctx.font = "11px Consolas, monospace";
                ctx.save(); ctx.beginPath(); ctx.rect(30, y + 34, 262, 104); ctx.clip();
                wrapText(LT(P.mo, P.moEn), 36, y + 48, 250, 14);
                ctx.restore();
            }
            // @@HE-WUKONG — rune dang bat thi phu kin bang Power bang mot tam KHOA, de nguoi
            // choi thay ngay vi sao khong bam doi duoc chu khong phai bam mai khong an.
            if ((typeof WKG_POWER !== 'undefined' && currentPower === WKG_POWER) || (typeof TRD_POWER !== 'undefined' && currentPower === TRD_POWER) || (typeof LH_POWER !== 'undefined' && currentPower === LH_POWER)){
                let _trdK = (typeof TRD_POWER !== 'undefined' && currentPower === TRD_POWER);   // @@HE-TRIDENT
                let _lhK = (typeof LH_POWER !== 'undefined' && currentPower === LH_POWER);      // @@HE-LUOIHAI
                ctx.globalAlpha = 1;
                ctx.fillStyle = "#0A0A0E"; ctx.fillRect(24, 76, 276, 452);   // DAC han, khong de the cu loi qua
                ctx.strokeStyle = "#D6A43C"; ctx.lineWidth = 2; ctx.strokeRect(24, 76, 276, 452);
                ctx.fillStyle = "#D6A43C"; ctx.font = "bold 17px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(_lhK ? "DEATH" : _trdK ? "MUSOU" : "SON WUKONG", 162, 250);
                // wrapText ve theo textAlign dang bat. Dang de "center" ma goi no thi moi dong
                // bi can giua QUANH x = 38, tuc chay HAN RA NGOAI mep trai cua bang. Phai tra
                // ve "left" TRUOC khi goi, khong phai sau.
                ctx.textAlign = "left";
                ctx.fillStyle = "#B0BEC5"; ctx.font = "11px Consolas, monospace";
                wrapText(_lhK ? LT("Đang cầm LƯỠI HÁI nên Power khoá sang DEATH. Đổi vũ khí khác thì Power cũ trở lại.", "Holding the REAPER SCYTHE locks the Power to DEATH. Switch weapons to get your Power back.") : _trdK ? LT("Rune TRIDENT đang khoá Power sang MUSOU. Tháo rune ra thì Power cũ trở lại.",
                                    "The TRIDENT rune locks the Power to MUSOU. Unequip it to get your Power back.")
                               : LT("Rune SON WUKONG đang khoá Power. Tháo rune ra thì Power cũ trở lại.",
                            "The SON WUKONG rune locks the Power. Unequip it to get your Power back."),
                         38, 280, 248, 15);
            }
            if (_xK){
                ctx.globalAlpha = 1;
                ctx.fillStyle = "#0A0E14"; ctx.fillRect(24, 76, 276, 452);
                ctx.strokeStyle = "#42A5F5"; ctx.lineWidth = 2; ctx.strokeRect(24, 76, 276, 452);
                ctx.fillStyle = "#42A5F5"; ctx.font = "bold 40px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("X", 162, 240);
                ctx.font = "bold 14px Consolas, monospace"; ctx.fillText(LT("POWER BỊ KHOÁ", "POWER LOCKED"), 162, 272);
                ctx.textAlign = "left"; ctx.fillStyle = "#B0BEC5"; ctx.font = "11px Consolas, monospace";
                wrapText(LT("Đang ở Dạng X nên Power khoá sang X. Đổi sang Dạng khác thì Power cũ trở lại.",
                            "Form X locks the Power. Pick another Form to get your Power back."), 38, 300, 248, 15);
            }
            // ===== GIUA: TRANG BI (Dang / Dan / Khien) =====
            panel(324, 44, 352, 490, LT("TRANG BỊ","LOADOUT"), "#4FC3F7");
            if (formDesc.length === 6) formDesc.splice(5, 0,
                LT("Thủy tinh — 3 máu + 2 lớp MÁU ẢO (mất máu ảo không tính là mất máu, không hồi lại được). Còn đủ máu ảo thì to bằng ULTIMATE, mỗi lớp mất thì vỡ bớt mảnh kính và nhỏ dần tới bằng NORMAL. Hết máu ảo: +5% tốc độ chạy và nhảy.",
                   "Glass — 3 HP + 2 layers of VIRTUAL HP (losing virtual HP does not count as losing HP and cannot be restored). With both layers it is Ultimate-sized; each layer lost shatters outer glass and shrinks it down to Normal. With no virtual HP left: +5% run and jump speed."),
                LT("Bộ xương — 4 máu. Core đỏ luôn nằm trong ngực. Chết lần đầu: xương bung ra rơi vãi, Core lơ lửng kéo các mảnh lên ghép lại rồi hồi sinh với máu tối đa còn 2 (hồi sinh sau cùng, sau mọi rune hồi sinh). +5% tốc độ chạy, nhảy cao hơn, hồi Dash nhanh hơn.",
                   "Skeleton — 4 HP. A red Core always sits in its chest. First death: the bones burst apart, the Core floats up and pulls them back together, reviving you with max HP reduced to 2 (the very last revive, after every revive rune). +5% run speed, higher jump, faster Dash recharge."));
            formDesc.push(LT("Apex — 8 HP. Claws, nhảy đôi, bật tường và bám mép. Năm biến thể có chiêu cuối riêng. Khóa Power, Rune và phụ kiện.","Apex — 8 HP. Claws, double jump, wall kick and ledge grab. Five variants with their own ultimates. Power, Runes and accessories locked."));
            formDesc.push(LT("Dante — 10 HP. J combo, K đặc biệt (giữ 1s cường hóa), Q/E đổi 6 vũ khí; I/O đổi thế. U: Devil Trigger 10s, +2 sát thương/hit, hồi 1 HP/2s. Khóa Power, Rune và phụ kiện.","Dante — 10 HP. J combo; K special (charge 1s); Q/E six weapons; I/O styles. U: 10-second Devil Trigger, +2 damage/hit, heal 1 HP/2s. Power, Runes and accessories locked."));
            formDesc.push(LT("Vergil — 10 HP. J/K: Yamato; I: kiếm tầm xa; O: song kiếm. Q/E đổi đội hình. Shift dịch chuyển. U: SDT → JCE. Khóa Power, Rune, phụ kiện.", "Vergil — 10 HP. J/K: Yamato; I: ranged blades; O: dual blades. Q/E: formation. Shift: Trick. U: SDT → JCE. Equipment locked."));
            formDesc.push(LT("Ironhaul — 10 HP. Q/E đổi robot/xe. J ×5; J/K nối Dash, Jump, cúi. U: giáp trắng 12s → U: Aegis Breaker.","Ironhaul — 10 HP. Q/E: robot/truck. J ×5; J/K → dash/jump/down branches. U: 12s Silver Aegis; U again: finisher."));
            { let _fi = (typeof xFormIdx === 'function') ? xFormIdx() : currentForm;
              selRow(86,  LT("DẠNG","FORM"), forms[_fi], _fi === X_N_DANG - 1 ? "#42A5F5" : "#ECEFF1", formDesc[_fi], 66); }
            { let _pk = PHU_KIEN[phuKien];
              if(danteOn()||(typeof vergilOn==='function'&&vergilOn())||(typeof ironOn==='function'&&ironOn())) selRow(190, LT("PHỤ KIỆN","ACCESSORY"), LT("KHÓA","LOCKED"), "#90A4AE", "",18); else if(apexOn()) selRow(190, LT("BIẾN THỂ","VARIANT"), APEX_SKINS[apexColor].name, APEX_SKINS[apexColor].energyGlow, (apexColor===4?LT('Leo trụ → đứng 1s → K: 20 sát thương/2s','Climb shrine → stand 1s → K: 20 damage/2s'):apexRoleText()),18); else selRow(190, LT("PHỤ KIỆN","ACCESSORY"), LT(_pk.ten, _pk.tenEn), phuKien ? "#FFD54F" : "#90A4AE", LT(_pk.mo || "", _pk.moEn || ""), 18); }
            // @@HE-DANUNITY — deo UNITY thi o DAN bi KHOA.
            // Unity chay unitySync() moi khung, ep currentAmmoType ve dung o dang chon trong
            // ba o cua no. Nghia la loai dan chon o day bi NUOT IM LANG: chon Giao, vao tran
            // hoa Pulse, va khong co gi bao. Khoa han o nay lai va chi thang sang bang ba o
            // cua Unity thi khong con ai bi lua nua.
            let _uniKhoaDan = ((typeof unityOn === 'function') && unityOn()) || _xK;
            if (_uniKhoaDan){
                ctx.fillStyle = "white"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "left";
                ctx.fillText(LT("ĐẠN","AMMO"), 340, 257);
                ctx.strokeStyle = "rgba(0,229,255,0.45)"; ctx.lineWidth = 1;
                ctx.strokeRect(466.5, 238.5, 163, 27);
                ctx.fillStyle = "rgba(0,229,255,0.10)"; ctx.fillRect(467, 239, 162, 26);
                ctx.fillStyle = "#00E5FF"; ctx.font = "bold 15px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText((typeof ironOn==='function'&&ironOn()) ? "IRONHAUL" : (typeof vergilOn==='function'&&vergilOn()) ? "VERGIL" : danteOn() ? "DANTE" : apexOn() ? "CLAWS" : _xK ? "X" : "UNITY", 548, 257);
                ctx.fillStyle = "rgba(255,255,255,0.10)"; ctx.fillRect(430, 238, 26, 28); ctx.fillRect(636, 238, 26, 28);
                ctx.fillStyle = "#546E7A"; ctx.font = "bold 15px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText("🔒", 443, 257); ctx.fillText("🔒", 649, 257);
                ctx.fillStyle = "#90A4AE"; ctx.font = "11px Consolas, monospace"; ctx.textAlign = "left";
                ctx.save(); ctx.beginPath(); ctx.rect(336, 270, 330, 36); ctx.clip();
                formAmmoSummary((typeof ironOn==='function'&&ironOn()) ? LT('Q/E đổi robot/xe. Giáp trắng là chiêu cuối: U khi đầy 100%.','Q/E: robot/truck. White armour is the ultimate: U at 100%.') : (typeof vergilOn==='function'&&vergilOn()) ? LT("Q/E đổi đội hình. I: kiếm tầm xa; O: bật/tắt song kiếm, nối J/K.","Q/E cycle formations. I: ranged blades; O: toggle melee stance, then J/K.") : danteOn() ? LT("Bộ vũ khí riêng của Dante. Q/E đổi vũ khí trong trận.","Dante weapon set. Q/E cycle weapons in battle.") : apexOn() ? LT("J: cào; J → Nhảy: xoay đuôi hất tung. Giữ J: cắn / cưa lưng. Dash → J: xoay đuôi. J → Dash: xoay tử thần; J tiếp: kết nổ. K: đạn nhỏ, cầu xoáy, Laser. U: chiêu cuối riêng theo biến thể.","J: claw / hold: bite or aerial saw. Dash → J: tail spin. J → Dash: death roll; press J during roll: explosive finale. K: small shot, charged orb, laser. U: variant ultimate.") : _xK ? LT("Đang ở Dạng X nên đạn bị khoá. X có hệ vũ khí riêng: đổi hệ bằng I / O ngay trong trận.",
                                  "Form X is active so ammo is locked. X has its own weapons: swap them with I / O in battle.")
                            : LT("Đang đeo UNITY nên ô này bị khoá. Ba loại đạn của bạn chọn ở bảng UNITY bên phải, và trong trận đổi giữa chúng bằng Q / E.",
                            "UNITY is equipped so this row is locked. Pick your three types in the UNITY panel on the right and swap between them with Q / E in battle."),
                         340, 284, 320, 14);
                ctx.restore();
            } else
            selRow(238, LT("ĐẠN","AMMO"), "", ammoColors[currentAmmoType],
                   (currentAmmoType === CUS_DAN && typeof cusMoTaDan === 'function') ? cusMoTaDan() : ammoDesc[currentAmmoType], 30);
            // KHUNG bam de mo BANG CHON DAN — hai mui ten < > van giu de doi nhanh nhu cu
            _ammoKhung = _uniKhoaDan ? { x: -999, y: -999, w: 0, h: 0 } : { x: 466, y: 238, w: 164, h: 28 };
            if (!_uniKhoaDan) {
                let hk = mouseX >= _ammoKhung.x && mouseX <= _ammoKhung.x + _ammoKhung.w
                      && mouseY >= _ammoKhung.y && mouseY <= _ammoKhung.y + _ammoKhung.h;
                ctx.strokeStyle = hk ? ammoColors[currentAmmoType] : "rgba(255,255,255,0.28)";
                ctx.lineWidth = hk ? 2 : 1;
                ctx.strokeRect(_ammoKhung.x + 0.5, _ammoKhung.y + 0.5, _ammoKhung.w - 1, _ammoKhung.h - 1);
                // NEN TOI dac (khong phai lop trang mo) de chu noi han len
                ctx.fillStyle = hk ? "rgba(20,30,40,0.96)" : "rgba(12,18,24,0.94)";
                ctx.fillRect(_ammoKhung.x + 1, _ammoKhung.y + 1, _ammoKhung.w - 2, _ammoKhung.h - 2);
                ctx.save();
                ctx.shadowBlur = 8; ctx.shadowColor = ammoColors[currentAmmoType];
                ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 15px Consolas, monospace";
                ctx.textAlign = "center";
                ctx.fillText(ammos[currentAmmoType], _ammoKhung.x + _ammoKhung.w/2 - 5, _ammoKhung.y + 19);
                ctx.restore();
                ctx.fillStyle = hk ? "#FFFFFF" : "rgba(255,255,255,0.55)"; ctx.font = "9px Consolas, monospace";
                ctx.fillText("▾", _ammoKhung.x + _ammoKhung.w - 12, _ammoKhung.y + 21);
                ctx.textAlign = "left";
            }
            // NUT KINH LUP -> mo bang CHI TIET DAN (dat ngay sau nhan "DAN")
            _ammoLupBtn = _uniKhoaDan ? { x: -999, y: -999 } : { x: 392, y: 240 };
            if (!_uniKhoaDan) veNutLup(_ammoLupBtn.x, _ammoLupBtn.y,
                     mouseX >= _ammoLupBtn.x && mouseX <= _ammoLupBtn.x + RUNE_LUP &&
                     mouseY >= _ammoLupBtn.y && mouseY <= _ammoLupBtn.y + RUNE_LUP);
            /* @@HE-CUSNC — nut mo bang NANG CAP. Chi hien khi dang cam Custom, va nam
               ngay duoi o mo ta dan nen khong doi bo cuc san co cua ba hang Dang/Dan/Khien. */
            _cusNCBtn = null;
            if (currentAmmoType === CUS_DAN && !_uniKhoaDan){
                // Keep the upgrade button below the shared Form sample.
                let _by = 366;
                _cusNCBtn = { x: 340, y: _by, w: 320, h: 20 };
                let _hv = mouseX >= _cusNCBtn.x && mouseX <= _cusNCBtn.x + _cusNCBtn.w
                       && mouseY >= _cusNCBtn.y && mouseY <= _cusNCBtn.y + _cusNCBtn.h;
                ctx.fillStyle = _hv ? "rgba(144,164,174,0.30)" : "rgba(144,164,174,0.14)";
                ctx.fillRect(_cusNCBtn.x, _cusNCBtn.y, _cusNCBtn.w, _cusNCBtn.h);
                ctx.strokeStyle = _hv ? "#B0BEC5" : "rgba(176,190,197,0.5)"; ctx.lineWidth = 1;
                ctx.strokeRect(_cusNCBtn.x + 0.5, _cusNCBtn.y + 0.5, _cusNCBtn.w - 1, _cusNCBtn.h - 1);
                ctx.fillStyle = "#ECEFF1"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "left";
                /* Truoc day nut nay in ca ba ten nhanh lan ten chieu cuoi — tran ra ngoai
                   khung 320px. Gio doan mo ta ngay tren da liet ke du roi, nen nut chi can
                   noi no mo cai gi. */
                ctx.fillText("⚙ " + LT("MỞ BẢNG NÂNG CẤP & CHIÊU CUỐI", "OPEN UPGRADES & ULTIMATE"),
                             _cusNCBtn.x + 8, _cusNCBtn.y + 14);
            }
            selRow(390, LT("KHIÊN","SHIELD"), SHIELDS[currentShieldType], currentShieldType === 1 ? "#69F0AE" : "#FFB74D", shieldDesc[currentShieldType]);
            if (currentShieldType === 1) { ctx.fillStyle = "#263238"; ctx.fillRect(340, 466, 320, 7); ctx.fillStyle = "#69F0AE"; ctx.fillRect(340, 466, 320 * (0.55 + 0.45 * Math.sin(frames * 0.06)), 7); }

            // ===== PHAI: RUNE =====
            panel(688, 44, 300, 490, LT("RUNE — TỐI ĐA 2","RUNES — MAX 2"), "#B388FF");
            // Rune 2 O chiem CA HAI o -> ve MOT khung duy nhat thay vi 2 khung chong len nhau
            if (runeMerged()) {
                let has = runeSlots[0], rr = RUNES.find(x => x.id === has);
                let y = 78, H = 440;
                let hov = mouseX >= 700 && mouseX <= 976 && mouseY >= y && mouseY <= y + H;
                ctx.fillStyle = "rgba(255,143,0,0.10)"; ctx.fillRect(700, y, 276, H);
                ctx.strokeStyle = hov ? "#FFB74D" : "#FF8F00"; ctx.lineWidth = 3; ctx.strokeRect(700, y, 276, H);
                // ---- BA HANG xep thanh cot: [logo + ten] / [so o + doc quyen] / [mo ta] ----
                const _L = 700, _R = 976, _CXr = (_L + _R) / 2;
                const H1 = 54, H2 = 44;                       // chieu cao hang 1 va hang 2
                let _khoa = runeDongKhoa(rr);
                let _vach = (yy) => { ctx.strokeStyle = "rgba(255,143,0,0.30)"; ctx.lineWidth = 1;
                                      ctx.beginPath(); ctx.moveTo(_L + 12, yy); ctx.lineTo(_R - 12, yy); ctx.stroke(); };
                // HANG 1 — logo BEN CANH ten, ca cum can giua
                ctx.fillStyle = "rgba(255,143,0,0.07)"; ctx.fillRect(_L + 2, y + 2, 272, H1 - 2);
                const _M = _L + 16;                            // le trai dung chung cho ca ba hang
                ctx.textAlign = "left";
                ctx.font = "26px Consolas, monospace"; ctx.fillStyle = "#FFF"; ctx.fillText(runeIcon(has), _M, y + 36);
                ctx.font = "bold 17px Consolas, monospace"; ctx.fillStyle = "#FFECB3"; ctx.fillText(RNAME(rr), _M + 34, y + 35);
                _vach(y + H1);
                // HANG 2 — so o + doc quyen
                ctx.font = "bold 11px Consolas, monospace"; ctx.fillStyle = "#FF8F00";
                ctx.fillText(LT("2 Ô","2 SLOTS"), _M, y + H1 + (_khoa ? 17 : 26));
                if (_khoa){ ctx.font = "bold 12px Consolas, monospace"; ctx.fillStyle = "#FF5252";
                            ctx.fillText(_khoa, _M, y + H1 + 35); }
                _vach(y + H1 + H2);
                // HANG 3 — mo ta
                ctx.textAlign = "left";
                let _uRows = (has === 'unity') ? unityRowsMerged() : null;
                let _dTop = y + H1 + H2 + 8, _dBot = _uRows ? (_uRows.titleY - 22) : (y + H - 26);
                ctx.save();
                ctx.beginPath(); ctx.rect(_L + 6, _dTop, 264, Math.max(20, _dBot - _dTop)); ctx.clip();
                ctx.fillStyle = "#CFD8DC"; ctx.font = "12px Consolas, monospace";
                wrapText(runeTomHay(rr), _M, _dTop + 14, 248, 16);
                ctx.restore();
                ctx.textAlign = "center"; ctx.font = "bold 10px Consolas, monospace";
                ctx.fillStyle = hov ? "#00E5FF" : "rgba(0,229,255,0.55)";
                ctx.fillText(LT("BẤM ĐỂ XEM CHI TIẾT","CLICK FOR FULL DETAILS"), _CXr, y + H - 10);
                ctx.textAlign = "left";
                drawUnityRowsMerged();
            } else
            for (let sl = 0; sl < 2; sl++) {
                let y = 78 + sl * 222, has = runeSlots[sl], hov = mouseX >= 700 && mouseX <= 976 && mouseY >= y && mouseY <= y + 210;
                ctx.fillStyle = has ? "rgba(102,187,106,0.12)" : (hov ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)"); ctx.fillRect(700, y, 276, 210);
                ctx.strokeStyle = has ? "#66BB6A" : (hov ? "#00E5FF" : "rgba(255,255,255,0.12)"); ctx.lineWidth = 2; ctx.strokeRect(700, y, 276, 210);
                ctx.textAlign = "center"; ctx.font = "30px Consolas, monospace"; ctx.fillStyle = has ? "#FFF" : "#546E7A"; if (!has) ctx.fillText("+", 838, y + 40);
                if (has) {
                    let rr = RUNES.find(x => x.id === has);
                    // ---- BA HANG: [logo + ten] / [so o + doc quyen] / [mo ta] ----
                    const _L1 = 700, _R1 = 976, _C1 = 838, _h1 = 38, _h2 = 34;
                    let _k1 = runeDongKhoa(rr);
                    let _v1 = (yy) => { ctx.strokeStyle = "rgba(102,187,106,0.30)"; ctx.lineWidth = 1;
                                        ctx.beginPath(); ctx.moveTo(_L1 + 12, yy); ctx.lineTo(_R1 - 12, yy); ctx.stroke(); };
                    ctx.fillStyle = "rgba(102,187,106,0.07)"; ctx.fillRect(_L1 + 2, y + 2, 272, _h1 - 2);
                    const _M1 = _L1 + 16;
                    ctx.textAlign = "left";
                    ctx.font = "21px Consolas, monospace"; ctx.fillStyle = "#FFF"; ctx.fillText(runeIcon(has), _M1, y + 27);
                    ctx.font = "bold 14px Consolas, monospace"; ctx.fillStyle = "#FFECB3"; ctx.fillText(RNAME(rr), _M1 + 28, y + 26);
                    _v1(y + _h1);
                    ctx.font = "bold 10px Consolas, monospace"; ctx.fillStyle = "#66BB6A";
                    ctx.fillText(((rr && rr.cost) || 1) + LT(" Ô", " SLOT"), _M1, y + _h1 + (_k1 ? 13 : 20));
                    if (_k1){ ctx.font = "bold 11px Consolas, monospace"; ctx.fillStyle = "#FF5252";
                              ctx.fillText(_k1, _M1, y + _h1 + 28); }
                    _v1(y + _h1 + _h2);
                    ctx.textAlign = "left";
                    ctx.save();
                    ctx.beginPath(); ctx.rect(_L1 + 6, y + _h1 + _h2 + 4, 264, 196 - _h1 - _h2); ctx.clip();
                    ctx.fillStyle = "#CFD8DC"; ctx.font = "12px Consolas, monospace";
                    wrapText(runeTomHay(rr), _M1, y + _h1 + _h2 + 18, 248, 15);
                    ctx.restore();
                    ctx.textAlign = "center"; ctx.font = "bold 9px Consolas, monospace";
                    ctx.fillStyle = hov ? "#00E5FF" : "rgba(0,229,255,0.5)";
                    ctx.fillText(LT("BẤM ĐỂ XEM CHI TIẾT","CLICK FOR DETAILS"), _C1, y + 202);
                    ctx.textAlign = "left";
                } else { ctx.textAlign = "left"; ctx.fillStyle = "#78909C"; ctx.font = "12px Consolas, monospace"; ctx.fillText(LT("Ô "+(sl+1)+" — trống","Slot "+(sl+1)+" — empty"), 760, y + 32); ctx.fillStyle = "#546E7A"; ctx.font = "10px Consolas, monospace"; ctx.fillText(LT("bấm để chọn rune","click to pick a rune"), 760, y + 52); }
            }

            if (_xK){
                ctx.globalAlpha = 1;
                ctx.fillStyle = "rgba(10,14,20,0.97)"; ctx.fillRect(700, 78, 276, 440);
                ctx.strokeStyle = "#42A5F5"; ctx.lineWidth = 2; ctx.strokeRect(700, 78, 276, 440);
                ctx.fillStyle = "#42A5F5"; ctx.font = "bold 40px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("X", 838, 240);
                ctx.font = "bold 14px Consolas, monospace"; ctx.fillText(LT("RUNE BỊ KHOÁ", "RUNES LOCKED"), 838, 272);
                ctx.textAlign = "left"; ctx.fillStyle = "#B0BEC5"; ctx.font = "11px Consolas, monospace";
                wrapText(LT("Đang ở Dạng X nên Rune không hoạt động. Đổi sang Dạng khác để dùng lại Rune đã đeo.",
                            "Form X disables Runes. Pick another Form to use your equipped Runes again."), 714, 300, 248, 15);
                ctx.textAlign = "left";
            }
            if (runePicker !== null) drawRunePicker();
            if (battuMa) drawBattuMa();          // @@HE-BATTU — bang ma phu len tren picker
            if (runeXem) drawRuneChiTiet();
            if (ammoPicker) drawAmmoPicker();
            if (ammoPicker && hinhThaiMo !== null) drawHinhThai();
            if (cusNCPicker) drawCusNCPicker();   // @@HE-CUSNC
            if (ammoXem !== null) drawAmmoChiTiet();
            // BO khung Preview va popup xem truoc Channel/Ult: SAN TAP o Menu da the hien truc tiep va chinh xac hon
        }
// PLAYER_PART_END s5.drawCustomMenu.1
