// BOSS_FILE: GaelBoss
// BOSS_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, CAM_TROI, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, aaHeSo, aaUp, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, nhipXa, parry, platforms, shakeTimer, visualEffects
// Nguồn: index.html:15601 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_W.1 EDITABLE
const GAE_W = 50, GAE_H = 78;
// BOSS_PART_END s0.GAE_W.1

// Nguồn: index.html:15602 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_W2.1 EDITABLE
const GAE_W2 = 54, GAE_H2 = 92;
// BOSS_PART_END s0.GAE_W2.1

// Nguồn: index.html:15619 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_TEMPO.1 EDITABLE
const GAE_TEMPO = 1.30;
// BOSS_PART_END s0.GAE_TEMPO.1

// Nguồn: index.html:15620 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_HP.1 READ_ONLY
const GAE_HP = [0, 80, 76, 70];
// BOSS_PART_END s0.GAE_HP.1

// Nguồn: index.html:15632 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_CB.1 EDITABLE
const GAE_CB = { g_combo:1, g_quet:1, g_keo:1, g_lao:1, g_nhay:1, g_quay:1 };
// BOSS_PART_END s0.GAE_CB.1

// Nguồn: index.html:15633 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_CD.1 READ_ONLY
const GAE_CD = {
            g_combo:38,  g_keo:78,  g_lao:70,  g_ao:84,  g_nhay:78, g_quet:62,
            g_quay:82,   g_banlen:96,
            g_mau:98,    g_song:84, g_xung:110, g_bay:98, g_no:96,  g_echo:90,
            g_set:124,   g_loan:98, g_xoay:98, g_corona:124, g_dich:140,
            g_vuot:96,   g_hon:150
        };
// BOSS_PART_END s0.GAE_CD.1

// Nguồn: index.html:15652 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_DASH0.1 EDITABLE
const GAE_DASH0   = 20;
// BOSS_PART_END s0.GAE_DASH0.1

// Nguồn: index.html:15653 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_QUAY_R.1 READ_ONLY
const GAE_QUAY_R  = 150;
// BOSS_PART_END s0.GAE_QUAY_R.1

// Nguồn: index.html:15654 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_AO_TRE.1 EDITABLE
const GAE_AO_TRE  = 6;
// BOSS_PART_END s0.GAE_AO_TRE.1

// Nguồn: index.html:15655 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_AO_THEM.1 EDITABLE
const GAE_AO_THEM = 34;
// BOSS_PART_END s0.GAE_AO_THEM.1

// Nguồn: index.html:15656 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_HON_SO.1 EDITABLE
const GAE_HON_SO  = 5;
// BOSS_PART_END s0.GAE_HON_SO.1

// Nguồn: index.html:15657 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_HON_DUOI.1 EDITABLE
const GAE_HON_DUOI= 120;
// BOSS_PART_END s0.GAE_HON_DUOI.1

// Nguồn: index.html:15658 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_HON_CHUI.1 EDITABLE
const GAE_HON_CHUI= 20;
// BOSS_PART_END s0.GAE_HON_CHUI.1

// Nguồn: index.html:15659 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_HON_SET.1 EDITABLE
const GAE_HON_SET = 26;
// BOSS_PART_END s0.GAE_HON_SET.1

// Nguồn: index.html:15660 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_COR_SO.1 EDITABLE
const GAE_COR_SO  = 3;
// BOSS_PART_END s0.GAE_COR_SO.1

// Nguồn: index.html:15661 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_NO_SO.1 EDITABLE
const GAE_NO_SO   = 5;
// BOSS_PART_END s0.GAE_NO_SO.1

// Nguồn: index.html:15662 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_NO_NHIP.1 EDITABLE
const GAE_NO_NHIP = 8;
// BOSS_PART_END s0.GAE_NO_NHIP.1

// Nguồn: index.html:15663 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_ECHO_CHO.1 EDITABLE
const GAE_ECHO_CHO= 30;
// BOSS_PART_END s0.GAE_ECHO_CHO.1

// Nguồn: index.html:15664 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_CORONA_XA.1 EDITABLE
const GAE_CORONA_XA = 430;
// BOSS_PART_END s0.GAE_CORONA_XA.1

// Nguồn: index.html:15667 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_PHA.1 READ_ONLY
const GAE_PHA = { g_combo:1, g_quet:1, g_keo:1, g_lao:1, g_nhay:1, g_quay:1,
                          g_banlen:1,
                          g_ao:2, g_song:2, g_mau:2, g_xung:2, g_bay:2, g_no:2, g_echo:2,
                          g_corona:2, g_dich:2, g_vuot:2,
                          g_set:3, g_loan:3, g_xoay:3, g_hon:3 };
// BOSS_PART_END s0.GAE_PHA.1

// Nguồn: index.html:15683 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_CHUOI_MAX.1 EDITABLE
const GAE_CHUOI_MAX = 5;
// BOSS_PART_END s0.GAE_CHUOI_MAX.1

// Nguồn: index.html:15698 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_NOI.1 EDITABLE
const GAE_NOI = {
            // --- bo co ban: pha 1 noi vong quanh, tu pha 2 thi BAN GIAO cho chieu dac trung ---
            g_combo:  { p: 0.82, ds:  ['g_vuot','g_quet','g_lao','g_quay'],
                                 ds2: ['g_vuot','g_echo','g_no','g_corona','g_song','g_xung','g_bay'],
                                 ds3: ['g_vuot','g_hon','g_set','g_loan','g_corona','g_echo','g_xoay'] },
            g_quet:   { p: 0.85, ds:  ['g_vuot','g_combo','g_lao','g_keo'],
                                 ds2: ['g_ao','g_vuot','g_echo','g_song'],
                                 ds3: ['g_loan','g_xoay','g_vuot','g_ao'] },
            g_keo:    { p: 0.78, ds:  ['g_vuot','g_combo','g_nhay','g_quet'],
                                 ds2: ['g_song','g_vuot','g_mau','g_bay'],
                                 ds3: ['g_set','g_vuot','g_mau','g_loan'] },
            g_lao:    { p: 0.85, ds:  ['g_vuot','g_combo','g_quet','g_quay'],
                                 ds2: ['g_vuot','g_echo','g_ao','g_no','g_song'],
                                 ds3: ['g_vuot','g_loan','g_hon','g_echo','g_xoay'] },
            g_nhay:   { p: 0.75, ds:  ['g_combo','g_quet','g_lao'],
                                 ds2: ['g_ao','g_song','g_no'],
                                 ds3: ['g_xoay','g_loan','g_set'] },
            g_quay:   { p: 0.85, ds:  ['g_combo','g_lao','g_keo'],
                                 ds2: ['g_echo','g_ao','g_corona'],
                                 ds3: ['g_hon','g_loan','g_corona'] },
            // --- chieu DE LAI THU TREN SAN -> noi sang don AP SAT (ne hai tang) ---
            g_corona: { p: 0.95, ds: ['g_dich','g_dich','g_vuot'] },
            g_dich:   { p: 1.00, ds: ['g_vuot','g_combo','g_quay','g_keo'] },
            g_hon:    { p: 0.90, ds: ['g_corona','g_dich','g_vuot'] },
            g_set:    { p: 0.85, ds: ['g_vuot','g_lao','g_corona','g_dich'] },
            g_no:     { p: 0.80, ds: ['g_lao','g_xung','g_vuot'] },
            g_echo:   { p: 0.82, ds:  ['g_vuot','g_no','g_combo'],
                                 ds2: ['g_vuot','g_no','g_corona'],
                                 ds3: ['g_hon','g_vuot','g_corona','g_loan'] },
            g_ao:     { p: 0.82, ds:  ['g_echo','g_vuot','g_corona','g_no'],
                                 ds3: ['g_hon','g_loan','g_vuot','g_corona'] },
            g_song:   { p: 0.75, ds: ['g_lao','g_xung','g_corona'] },
            g_mau:    { p: 0.75, ds: ['g_corona','g_combo','g_set'] },
            g_xung:   { p: 0.80, ds: ['g_echo','g_quay','g_combo'] },
            g_bay:    { p: 0.75, ds: ['g_no','g_corona','g_lao'] },
            g_loan:   { p: 0.85, ds: ['g_echo','g_vuot','g_hon'] },
            g_xoay:   { p: 0.80, ds: ['g_combo','g_keo','g_set'] },
            g_vuot:   { p: 0.88, ds: ['g_echo','g_ao','g_quay','g_combo'] },
            g_banlen: { p: 0.70, ds: ['g_lao','g_combo','g_xung'] }
        };
// BOSS_PART_END s0.GAE_NOI.1

// Nguồn: index.html:15738 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_SET_SO.1 EDITABLE
const GAE_SET_SO   = 5;
// BOSS_PART_END s0.GAE_SET_SO.1

// Nguồn: index.html:15739 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_SET_CHO.1 EDITABLE
const GAE_SET_CHO  = 74;
// BOSS_PART_END s0.GAE_SET_CHO.1

// Nguồn: index.html:15740 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_SET_RONG.1 EDITABLE
const GAE_SET_RONG = 42;
// BOSS_PART_END s0.GAE_SET_RONG.1

// Nguồn: index.html:15741 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GAE_MAU_CHO.1 EDITABLE
const GAE_MAU_CHO  = 56;
// BOSS_PART_END s0.GAE_MAU_CHO.1

// Nguồn: index.html:15743 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.gaeChop.1 READ_ONLY
let gaeChop = 0;
// BOSS_PART_END s0.gaeChop.1

// Nguồn: index.html:15846 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.gaeDrawCapeWhip.1 EDITABLE
function gaeDrawCapeWhip(b, W, H, capH, do_, xoe){
            let whip = b.capeWhip || 0;          // 0..1: độ quất roi theo nhát chém
            let wAng = b.capeAngle !== undefined ? b.capeAngle : -0.35;
            let wave = frames * 0.11 + (b.walk || 0) * 0.08;
            let stageScale = b.stage >= 3 ? 1.34 : (b.stage >= 2 ? 1.18 : 1.0);
            let activeReach = (42 + 122 * Math.max(xoe, whip)) * stageScale;

            // 1. KHI ÁO CHOÀNG ĐANG THU HOẶC PHẤT PHƠ SAU LƯNG (Lớp nền rách tả tơi)
            ctx.save();
            let baseSway = Math.sin(wave) * 8 - (b.dashV || 0) * 1.4;
            let gc = ctx.createLinearGradient(0, -capH, -W * 1.2, 0);
            gc.addColorStop(0, do_ ? "#5C1014" : "#3E1F1C");
            gc.addColorStop(0.55, do_ ? "#8E1B20" : "#542924");
            gc.addColorStop(1, "#160A0B");
            ctx.fillStyle = gc;
            ctx.beginPath();
            ctx.moveTo(-4, -capH * 0.94);
            ctx.quadraticCurveTo(-W * 0.88 + baseSway * 0.5, -capH * 0.72, -W * 1.22 + baseSway, -capH * 0.16);
            for (let i = 0; i <= 6; i++){
                let u = i / 6;
                let px = -W * 1.22 + baseSway + (W * 1.22 - baseSway + 8) * u;
                let py = -capH * 0.16 + Math.sin(u * 8 + wave) * 5 + (i % 2 ? 13 : 2);
                ctx.lineTo(px, py);
            }
            ctx.lineTo(8, -capH * 0.58);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = do_ ? "#B71C1C" : "#241210";
            ctx.lineWidth = 1.8;
            ctx.stroke();
            ctx.restore();

            // 2. KỸ THUẬT ROI ÁO CHOÀNG (WHIP-CAPE): Khi Gael vung kiếm hoặc quất áo (`xoe > 0.02` hoặc `whip > 0.02`)
            // Hai dải cánh áo choàng hóa thành 2 chiếc roi khổng lồ uốn sóng hình chữ S phóng vọt ra phía trước
            // theo đúng góc vung kiếm `wAng`, dẫn đầu bằng đầu roi sắc nhọn như lưỡi hái!
            let power = Math.max(xoe, whip);
            if (power > 0.02){
                ctx.save();
                for (let wing = 0; wing < 2; wing++){
                    let len = activeReach * (wing === 0 ? 1.0 : 0.82);
                    let ang = wAng + (wing === 0 ? -0.14 : 0.22) + Math.sin(wave + wing * 2) * 0.06;
                    let sx = -2, sy = -capH * (wing === 0 ? 0.78 : 0.64);
                    // Quỹ đạo uốn lượn như roi quất (S-curve whip)
                    let midR = len * 0.54;
                    let whipSnap = Math.sin(power * Math.PI) * 26 * (wing === 0 ? -1 : 1);
                    let cx1 = sx + Math.cos(ang - 0.35) * midR;
                    let cy1 = sy + Math.sin(ang - 0.35) * midR * 0.65 + whipSnap;
                    let tx = sx + Math.cos(ang) * len;
                    let ty = sy + Math.sin(ang) * len * 0.55;

                    let wg = ctx.createLinearGradient(sx, sy, tx, ty);
                    wg.addColorStop(0, do_ ? "#4A0B0E" : "#3A1D1A");
                    wg.addColorStop(0.5, do_ ? "#B71C1C" : "#7B2D26");
                    wg.addColorStop(0.88, do_ ? "#FF5252" : "#A14A3E");
                    wg.addColorStop(1, "rgba(255, 82, 82, 0.15)");

                    ctx.globalAlpha = (wing === 0 ? 0.88 : 0.68) * Math.min(1, power * 1.3);
                    ctx.fillStyle = wg;
                    ctx.beginPath();
                    ctx.moveTo(sx, sy - 8);
                    ctx.quadraticCurveTo(cx1, cy1 - 22 * power, tx, ty);
                    // Mép dưới của dải roi áo choàng có gai vải rách sắc lẹm như lưỡi cưa
                    for (let k = 4; k >= 1; k--){
                        let u = k / 5;
                        let bx = sx + (tx - sx) * u + (cx1 - (sx + tx) * 0.5) * 0.4 * (1 - Math.abs(u - 0.5) * 2);
                        let by = sy + (ty - sy) * u + 16 * power + (k % 2 ? 12 : 3) * power;
                        ctx.lineTo(bx, by);
                    }
                    ctx.lineTo(sx, sy + 10);
                    ctx.closePath();
                    ctx.fill();

                    // Đường gân roi huyết hồn sáng rực chạy dọc sống áo choàng (báo hiệu rõ quỹ đạo quất roi!)
                    ctx.strokeStyle = do_ ? "#FF8A80" : "#E6CEB5";
                    ctx.lineWidth = wing === 0 ? 2.8 : 1.8;
                    ctx.beginPath();
                    ctx.moveTo(sx, sy);
                    ctx.quadraticCurveTo(cx1, cy1 - 10 * power, tx, ty);
                    ctx.stroke();

                    // Vệt xé gió hình bán nguyệt ở chóp roi áo choàng khi quất căngสุด (`power > 0.55`)
                    if (power > 0.55 && wing === 0){
                        ctx.strokeStyle = do_ ? "#FFCDD2" : "#FFF3E0";
                        ctx.lineWidth = 3.2 * power;
                        ctx.beginPath();
                        ctx.arc(tx - 18, ty, 24 * power, ang - 0.85, ang + 0.85);
                        ctx.stroke();
                    }
                }
                ctx.restore();
            }
}
// BOSS_PART_END s0.gaeDrawCapeWhip.1

// Nguồn: index.html:15939 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.drawGaelBody.1 EDITABLE
function drawGaelBody(b, x, y){
            let d = b.facingLeft ? -1 : 1;
            let W = b.w, H = b.h;
            let cx0 = x + W / 2, chan = y + H;
            let khom = b.crouchLean !== undefined ? b.crouchLean : ((b.stage === 1) ? 0.32 : 0.08);
            let do_ = (b.stage >= 2);
            let somer = b.flipAngle || 0; // Góc lộn nhào trên không (Acrobatic Somersault)

            ctx.save();
            ctx.translate(cx0, chan);
            ctx.scale(d, 1);

            // ---- QUẦNG MÁU HỒN TỐI DƯỚI CHÂN (Pha 2-3) ----
            if (do_ && b.grounded !== false){
                let nh = 0.30 + 0.18 * Math.sin(frames * 0.09);
                let gq = ctx.createRadialGradient(0, -6, 2, 0, -6, 62);
                gq.addColorStop(0, "rgba(183,28,28," + (0.48 * nh + 0.2).toFixed(2) + ")");
                gq.addColorStop(1, "rgba(183,28,28,0)");
                ctx.fillStyle = gq;
                ctx.beginPath(); ctx.ellipse(0, -6, 62, 20, 0, 0, 6.28); ctx.fill();
            }
            // ---- BÓNG ĐỔ MẶT ĐẤT ----
            ctx.fillStyle = "rgba(0,0,0,0.42)";
            ctx.beginPath(); ctx.ellipse(0, -2, W * 0.62, 7, 0, 0, 6.28); ctx.fill();

            // ---- ĐÒN ĐÂM THẲNG XUỐNG ĐẤT ----
            if (b.damXuong === 2){
                ctx.save();
                ctx.globalAlpha = 0.9;
                let gd = ctx.createLinearGradient(0, -H * 0.9, 0, 6);
                gd.addColorStop(0, "rgba(255,255,255,0)");
                gd.addColorStop(0.55, "#FFE0B2");
                gd.addColorStop(1, "#FF5252");
                ctx.fillStyle = gd;
                ctx.beginPath();
                ctx.moveTo(-7, -H * 0.9); ctx.lineTo(7, -H * 0.9);
                ctx.lineTo(14, 6); ctx.lineTo(-14, 6); ctx.closePath(); ctx.fill();
                ctx.globalAlpha = 0.75;
                ctx.strokeStyle = "#FFCC80"; ctx.lineWidth = 2.4;
                for (let i = 0; i < 5; i++){
                    let a = -0.32 + i * 0.16, L2 = 34 + (i % 2) * 16;
                    ctx.beginPath(); ctx.moveTo(0, 2);
                    ctx.lineTo(Math.sin(a) * L2 * 2.4, 2 + Math.cos(a) * 3 + (i % 2 ? 4 : 1));
                    ctx.stroke();
                }
                ctx.restore();
            }

            let xoe = b.aoDai || 0;
            let capH = H * (0.86 - khom * 0.10);

            // ---- BÁO TRƯỚC CỦA ĐÒN XOAY TRÒN ----
            if (b.quayBao){
                let u = Math.min(1, b.quayBao.t / b.quayBao.tong);
                ctx.save();
                ctx.globalAlpha = 0.35 + 0.5 * u;
                ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3 + 4 * u;
                ctx.setLineDash([16, 11]); ctx.lineDashOffset = -frames * 1.2;
                ctx.beginPath(); ctx.ellipse(0, -H * 0.44, GAE_QUAY_R * u, GAE_QUAY_R * 0.46 * u, 0, 0, 6.28);
                ctx.stroke(); ctx.setLineDash([]);
                ctx.globalAlpha = 0.14 * u;
                ctx.fillStyle = "#FF5252";
                ctx.beginPath(); ctx.ellipse(0, -H * 0.44, GAE_QUAY_R * u, GAE_QUAY_R * 0.46 * u, 0, 0, 6.28);
                ctx.fill();
                ctx.restore();
            }

            // ---- ÁO CHOÀNG XOAY THÀNH CƠN LỐC ĐỎ TRÒN QUANH THÂN ----
            if (b.quay){
                ctx.save();
                let R2 = GAE_QUAY_R * (0.88 + 0.12 * Math.min(1, xoe));
                for (let k = 0; k < 3; k++){
                    let a = b.quay * 1.0 + k * 2.09;
                    ctx.globalAlpha = 0.36 - k * 0.07;
                    let gq2 = ctx.createRadialGradient(0, -H * 0.44, 10, 0, -H * 0.44, R2);
                    gq2.addColorStop(0, do_ ? "rgba(183,28,28,0.80)" : "rgba(120,42,36,0.75)");
                    gq2.addColorStop(1, "rgba(120,20,24,0)");
                    ctx.fillStyle = gq2;
                    ctx.beginPath();
                    ctx.ellipse(0, -H * 0.44, R2, R2 * 0.46, a * 0.25, a % 6.28, (a % 6.28) + 2.4);
                    ctx.lineTo(0, -H * 0.44); ctx.closePath(); ctx.fill();
                }
                ctx.globalAlpha = 0.78;
                ctx.strokeStyle = do_ ? "#FF8A80" : "#E6CEB5"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.ellipse(0, -H * 0.44, R2, R2 * 0.46, 0, 0, 6.28); ctx.stroke();
                ctx.restore();
            }

            // ==== XOAY LỘN VÒNG TOÀN THÂN TRÊN KHÔNG (`somer`) ====
            ctx.save();
            if (somer !== 0){
                ctx.translate(0, -H * 0.52);
                ctx.rotate(somer);
                ctx.translate(0, H * 0.52);
            }

            // ---- VIỀN SÁNG NỔI BẬT TRÊN NỀN TỐI ----
            ctx.save();
            ctx.globalAlpha = 0.48;
            ctx.fillStyle = do_ ? "#FF8A80" : "#E8D5C0";
            ctx.beginPath();
            ctx.moveTo(-W * 0.48, 0);
            ctx.quadraticCurveTo(-W * 0.44, -H * 0.62, -6, -H * 0.98);
            ctx.quadraticCurveTo(W * 0.30, -H * 1.02, W * 0.42, -H * 0.52);
            ctx.lineTo(W * 0.44, 0);
            ctx.closePath(); ctx.fill();
            ctx.restore();

            // ---- VẼ ÁO CHOÀNG ROI HUYẾT HỒN (WHIP-CAPE) ----
            gaeDrawCapeWhip(b, W, H, capH, do_, xoe);

            // ---- ĐÔI CHÂN GIÁP XÀ CẠP SẮT & BĂNG QUẤN (SLAVE KNIGHT LEGGINGS) ----
            let buoc = Math.sin((b.walk || 0) * 0.22) * 5.5;
            let lOff = (b.grounded === false) ? -4 : -buoc * 0.4;
            let rOff = (b.grounded === false) ? 4 : buoc * 0.4;
            ctx.fillStyle = "#2B221E";
            ctx.fillRect(-13 + lOff, -H * 0.40, 10, H * 0.40 - 1);
            ctx.fillRect(3 + rOff, -H * 0.40, 10, H * 0.40 - 1);
            // Giáp ống chân & đầu gối sắt rỉ sét
            ctx.fillStyle = "#4E4641";
            ctx.fillRect(-13.5 + lOff, -H * 0.28, 11, H * 0.20);
            ctx.fillRect(2.5 + rOff, -H * 0.28, 11, H * 0.20);
            ctx.fillStyle = "#736860";
            ctx.beginPath(); ctx.moveTo(-13 + lOff, -H * 0.28); ctx.lineTo(-8 + lOff, -H * 0.34); ctx.lineTo(-3 + lOff, -H * 0.28); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(3 + rOff, -H * 0.28); ctx.lineTo(8 + rOff, -H * 0.34); ctx.lineTo(13 + rOff, -H * 0.28); ctx.closePath(); ctx.fill();
            // Giày sắt
            ctx.fillStyle = "#1E1715";
            ctx.fillRect(-15 + lOff, -7, 15, 7);
            ctx.fillRect(1 + rOff, -7, 15, 7);

            // ---- THÂN TRÊN: GIÁP HIỆP SĨ NÔ LỆ + LỖ HỔNG DARKSIGN RỈ MÁU GIỮA NGỰC ----
            ctx.save();
            ctx.translate(0, -H * 0.40);
            ctx.rotate(khom);
            let tH = H * 0.44;
            // Khối giáp ngực thép tối màu bị ăn mòn
            let gt = ctx.createLinearGradient(-16, -tH, 16, 0);
            gt.addColorStop(0, "#5C524B"); gt.addColorStop(0.5, "#38302C"); gt.addColorStop(1, "#1D1816");
            ctx.fillStyle = gt;
            ctx.beginPath();
            ctx.moveTo(-15, 0); ctx.lineTo(-14, -tH * 0.92);
            ctx.quadraticCurveTo(0, -tH * 1.08, 15, -tH * 0.88);
            ctx.lineTo(16, 0); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#1A1210"; ctx.lineWidth = 2; ctx.stroke();

            // LỖ HỔNG HỒN TỐI GIỮA NGỰC (THE DARK SOUL / DARKSIGN CAVITY)
            ctx.fillStyle = "#080405";
            ctx.beginPath(); ctx.arc(3, -tH * 0.56, 6.5, 0, 6.28); ctx.fill();
            ctx.strokeStyle = do_ ? "#FF1744" : "#8D6E63";
            ctx.lineWidth = do_ ? 2.4 : 1.5;
            ctx.beginPath(); ctx.arc(3, -tH * 0.56, 6.8 + (do_ ? Math.sin(frames * 0.2) * 1.2 : 0), 0, 6.28); ctx.stroke();

            // Khăn quàng đỏ sẫm quấn quanh vai và cổ (Slave Knight Red Hooded Mantle)
            ctx.fillStyle = do_ ? "#7F1418" : "#5D1D1E";
            ctx.beginPath();
            ctx.moveTo(-16, -tH * 0.94); ctx.lineTo(16, -tH * 0.90);
            ctx.lineTo(14, -tH * 0.64); ctx.lineTo(-14, -tH * 0.68);
            ctx.closePath(); ctx.fill();

            // Đai lưng da & khóa sắt
            ctx.fillStyle = "#4A3A31"; ctx.fillRect(-15, -tH * 0.26, 31, 5);
            ctx.fillStyle = "#8A7566"; ctx.fillRect(-3, -tH * 0.30, 8, 10);

            // ---- ĐẦU: MŨ TRÙM ĐỎ NHỌN (RED POINTED SLAVE HOOD) + BỘ RÂU BẠC DÀI CỦA LÃO GAEL ----
            ctx.save();
            ctx.translate(3, -tH * 0.94);

            // Bộ râu bạc dài rủ xuống trước ngực đặc trưng của Uncle Gael!
            let beardSway = Math.sin(frames * 0.09) * 2.5;
            ctx.fillStyle = "#CFD8DC";
            ctx.beginPath();
            ctx.moveTo(2, 2);
            ctx.quadraticCurveTo(13, 8, 11 + beardSway, 22);
            ctx.lineTo(5 + beardSway * 0.6, 18);
            ctx.lineTo(1 + beardSway * 0.4, 23);
            ctx.quadraticCurveTo(-3, 12, -2, 3);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#90A4AE"; ctx.lineWidth = 1; ctx.stroke();

            // Mũ trùm đầu vải đỏ sẫm có chóp nhọn cong về phía sau
            ctx.fillStyle = do_ ? "#8E1B20" : "#681E20";
            ctx.beginPath();
            ctx.moveTo(-13, 6);
            ctx.quadraticCurveTo(-16, -12, -22 - beardSway * 0.8, -19); // Chóp mũ nhọn dài của Slave Hood
            ctx.quadraticCurveTo(-4, -18, 8, -14);
            ctx.quadraticCurveTo(16, -10, 15, 4);
            ctx.quadraticCurveTo(4, 9, -13, 6);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#240B0C"; ctx.lineWidth = 1.8; ctx.stroke();

            // Hốc mặt tối & Đôi mắt rực sáng của Gael
            ctx.fillStyle = "#0A0607";
            ctx.beginPath(); ctx.ellipse(5, -2, 8.5, 6, 0, 0, 6.28); ctx.fill();
            let sang = do_ ? "#FF1744" : "#FFCC80";
            ctx.fillStyle = sang;
            ctx.globalAlpha = 0.8 + 0.2 * Math.sin(frames * 0.16);
            ctx.fillRect(3, -4, 3.2, 2.5); ctx.fillRect(9, -4, 3.2, 2.5);
            ctx.globalAlpha = 1;
            ctx.restore();
            ctx.restore();

            // ---- NỎ LIÊN THANH LẮP Ở CẲNG TAY TRÁI (REPEATING CROSSBOW) ----
            // Hỗ trợ xoay góc bắn chúi xuống đất (`noGoc`) khi Gael đang lộn vòng trên đầu người chơi!
            if (b.noTay){
                ctx.save();
                ctx.translate(14, -H * 0.50);
                ctx.rotate(b.noGoc || 0);
                // Hộp băng đạn gỗ-sắt phía trên nỏ (Repeating Magazine)
                ctx.fillStyle = "#4A352B"; ctx.fillRect(-6, -11, 26, 6);
                ctx.strokeStyle = "#8A7566"; ctx.lineWidth = 1.2; ctx.strokeRect(-6, -11, 26, 6);
                // Thân nỏ sắt
                ctx.fillStyle = "#3A2C25"; ctx.fillRect(-9, -5, 42, 10);
                ctx.strokeStyle = "#1A1210"; ctx.lineWidth = 1.8; ctx.strokeRect(-9, -5, 42, 10);
                // Cánh cung thép đôi
                ctx.strokeStyle = "#B0A497"; ctx.lineWidth = 4; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.moveTo(24, -20); ctx.lineTo(24, 20); ctx.stroke();
                ctx.strokeStyle = "#ECE3D6"; ctx.lineWidth = 1.6;
                ctx.beginPath(); ctx.moveTo(24, -20); ctx.lineTo(4, 0); ctx.lineTo(24, 20); ctx.stroke();
                // Mũi tên lửa/máu đang nạp sẵn
                ctx.fillStyle = "#FF5252";
                ctx.beginPath(); ctx.arc(46, 0, 3.6, 0, 6.28); ctx.fill();
                ctx.restore();
            }

            // ---- THANH ĐẠI KIẾM HÀNH QUYẾT GÃY MẺ (GAEL'S GREATSWORD) ----
            ctx.save();
            ctx.translate(6, -H * 0.52);
            ctx.rotate((b.armR || 0) + (b.quay || 0));
            let L = 94, BW = 12;
            // Chuôi kiếm dài quấn vải bạc màu
            ctx.fillStyle = "#2B211D"; ctx.fillRect(-16, -4, 20, 8);
            ctx.strokeStyle = "#8D7B6D"; ctx.lineWidth = 2;
            for (let i = 0; i < 4; i++){ ctx.beginPath(); ctx.moveTo(-14 + i * 5, -4); ctx.lineTo(-12 + i * 5, 4); ctx.stroke(); }
            // Chắn kiếm chữ thập rỉ sét
            ctx.fillStyle = "#8A7566"; ctx.fillRect(0, -10, 7, 20);
            // Lưỡi đại kiếm hành quyết (Đầu kiếm bị gãy cụt phẳng lì, thân kiếm sứt mẻ nhiều chỗ)
            let gl = ctx.createLinearGradient(0, -BW/2, 0, BW/2);
            gl.addColorStop(0, "#B9AFA4"); gl.addColorStop(0.45, "#E6E0D6"); gl.addColorStop(1, "#6E655B");
            ctx.fillStyle = gl;
            ctx.beginPath();
            ctx.moveTo(7, -BW/2);
            ctx.lineTo(L * 0.42, -BW/2); ctx.lineTo(L * 0.46, -BW/2 + 3.5);     // Vết sứt mẻ sâu 1
            ctx.lineTo(L * 0.50, -BW/2);
            ctx.lineTo(L * 0.76, -BW/2); ctx.lineTo(L * 0.80, -BW/2 + 3);       // Vết sứt mẻ 2
            ctx.lineTo(L * 0.96, -BW/2 + 0.5);
            ctx.lineTo(L, -BW * 0.32);                                           // Đầu kiếm gãy cụt vát chéo đặc trưng của Executioner's Greatsword
            ctx.lineTo(L - 3, BW * 0.38);
            ctx.lineTo(L * 0.68, BW/2); ctx.lineTo(L * 0.63, BW/2 - 3.5);       // Vết mẻ mặt dưới
            ctx.lineTo(L * 0.58, BW/2);
            ctx.lineTo(7, BW/2);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#3E3832"; ctx.lineWidth = 1.6; ctx.stroke();
            // Rãnh máu đen dọc thân kiếm
            ctx.fillStyle = do_ ? "#5C1014" : "#3E3832";
            ctx.fillRect(12, -2, L - 22, 4);

            // PHA 3: Sét đỏ Hồn Tối chạy dọc lưỡi kiếm
            if (b.stage >= 3){
                ctx.save();
                ctx.globalAlpha = 0.6 + 0.4 * Math.sin(frames * 0.3);
                ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 2.4; ctx.lineCap = 'round';
                for (let k = 0; k < 3; k++){
                    ctx.beginPath();
                    let x0 = 12 + k * 26;
                    ctx.moveTo(x0, 0);
                    for (let i = 1; i <= 4; i++)
                        ctx.lineTo(x0 + i * 6, (i % 2 ? -1 : 1) * (4 + Math.random() * 4));
                    ctx.stroke();
                }
                ctx.globalAlpha = 0.28; ctx.strokeStyle = "#FFCDD2"; ctx.lineWidth = 6;
                ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(L - 4, 0); ctx.stroke();
                ctx.restore();
            } else if (do_){
                ctx.save();
                ctx.globalAlpha = 0.55;
                ctx.strokeStyle = "#B71C1C"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(10, 1); ctx.lineTo(L - 8, 1); ctx.stroke();
                ctx.restore();
            }
            ctx.restore();

            ctx.restore(); // end somer flip
            ctx.restore();
        }
// BOSS_PART_END s0.drawGaelBody.1

// Nguồn: index.html:16224 · Dùng bởi: GaelBoss
// BOSS_PART_BEGIN s0.GaelBoss.1 EDITABLE
class GaelBoss {
            constructor(level){
                this.name = "SLAVE KNIGHT GAEL";
                this.stage = 1; this.phase = 1;          // giu phase=1 toi chang cuoi (cach cua DEATH)
                this.hp = GAE_HP[1]; this.maxHp = GAE_HP[1];
                this.w = GAE_W; this.h = GAE_H; this.baseY = 320 - this.h;
                this.x = canvas.width - 210; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.actionTimer = 48; this.facingLeft = true;
                this.retState = 'idle'; this.lastSkill = ''; this.atkBag = []; this.invulnAll = false;
                this.burnTimer = 0; this.lastMeleeHit = -1; this._bag = null;
                this.armR = 0; this.dashV = 0; this.walk = 0; this.cd = {};
                this.slash = null; this.tel = null; this.ghosts = [];
                this.mau = []; this.set = []; this.vong = null; this.veto = [];
                this.stagger = 0; this.noCuoi = false;
                this.chuoi = [];            // to hop dang cho
                this.chuoiDem = 0;          // da noi bao nhieu don trong chuoi hien tai
                this.echo = null;           // don vong cua ao choang
                this.hop = [];              // cac hop sat thuong phu (ao choang ho tro)
                this.hon = [];              // oan hon chui ra tu than
                this.cor = [];              // cac dia Way of White Corona
                this.aoDai = 0;             // 0..1 — do xoe cua ao choang khi no lam vu khi
                this.noTay = 0;             // >0 = dang cam no lien hoan
                this.an = 0;                // >0 = dang trong luc dich chuyen (khong ve than)
                this.damXuong = 0;          // 1 = gio kiem len, 2 = da cam xuong dat
                this.quay = 0;              // goc xoay cua don XOAY NGUOI CHEM
                this.quayBao = null;        // vong bao truoc cua don xoay
                this.treoT = 0;             // nguoi choi da o tren khong lien tuc bao lau
                this.capeWhip = 0;          // 0..1: do quat roi cua ao choang theo nhat kiem
                this.capeAngle = -0.35;     // goc phong cua roi ao choang
                this.flipAngle = 0;         // goc xoay lon nhao tren khong (360 somersault)
                this.noGoc = 0;             // goc chuc mui no xuong dat khi lon qua dau
                this.crouchLean = undefined;// do gap nguoi linh hoat theo tung chieu
                this.whipTrails = [];       // vet lua do cua roi ao choang tren khong trung
            }
            resetCapePose(){
                this.capeWhip = 0; this.capeAngle = -0.35; this.flipAngle = 0;
                this.noGoc = 0; this.crouchLean = undefined; this.aoDai = 0; this.noTay = 0;
                this.damXuong = 0; this.quay = 0; this.quayBao = null;
                this._daVuot = false; this._vuotLandT = 0;
                this._daKet = false; this._ketT = 0; this._ketKieu = null; this._ketX = undefined;
            }
            spd(){ return this.stage === 1 ? 1.16 : (this.stage === 2 ? 1.34 : 1.62); }
            /* GIUA CHUOI thi gan nhu KHONG nghi: 5 khung roi vao don ke, tuc la nguoi choi
               thay mot mach chem lien tuc chu khong thay hai don roi rac. Het chuoi moi nghi
               that — va do la cua so phan don DUY NHAT cua nguoi choi, nen no phai con. */
            toIdle(t){
                /* MOC NOI CHUOI DUY NHAT. Truoc day `datNoi` duoc goi tay o BAY chieu, nen 12
                   chieu con lai khong bao gio noi duoc gi — do la ly do thuc su cua cai Hans
                   che ("chem 1 cai roi nghi"), chu khong phai vi khoang nghi dai. Moi chieu
                   deu ket thuc bang toIdle, nen dat moc o day thi khong chieu nao sot.
                   `GAE_NOI` khong co muc cho 'entering', 'g_hoi2', 'g_hoi3' va 'g_cuoi' nen
                   may cai do tu dong khong noi — dung y: chuyen pha va don ket khong duoc noi. */
                if (GAE_NOI[this.state]) this.datNoi(this.state);
                this.state = 'idle'; this.subTimer = 0; this.armR = 0;
                this.resetCapePose();
                if (this.chuoi && this.chuoi.length){ this.actionTimer = Math.max(3, Math.round(5 / this.spd())); return; }
                this.chuoiDem = 0;   // chuoi da het -> bo dem ve 0 cho luot sau
                this.actionTimer = Math.max(6, Math.round(t * GAE_TEMPO / this.spd()));
            }
            // Dat mot don NOI sau chieu vua danh, theo bang GAE_NOI
            datNoi(id){
                let n = GAE_NOI[id]; if (!n || !this.chuoi) return;
                // da du GAE_CHUOI_MAX don lien tiep -> cat chuoi, buoc Gael nghi that mot nhip
                if ((this.chuoiDem || 0) >= GAE_CHUOI_MAX) return;
                if (Math.random() > n.p) return;
                let ds = ((this.stage >= 3 && n.ds3) || (this.stage >= 2 && n.ds2) || n.ds)
                            .filter(x => (GAE_PHA[x] || 1) <= this.stage);
                if (!ds.length) return;
                this.chuoi.push(ds[Math.floor(Math.random() * ds.length)]);
                this.chuoiDem = (this.chuoiDem || 0) + 1;
            }
            ghost(){ if (this.ghosts.length >= 6) this.ghosts.shift();
                     this.ghosts.push({ x: this.x, y: this.y, left: this.facingLeft, armR: this.armR,
                                        flipAngle: this.flipAngle, capeWhip: this.capeWhip, capeAngle: this.capeAngle,
                                        stage: this.stage, w: this.w, h: this.h, walk: this.walk, t: 14 }); }
            physics(){
                this.dy += 0.72; this.y += this.dy;
                let land = 320;
                for (let pf of platforms){
                    if (pf.top >= 320 || pf.wall) continue;
                    if (this.x + this.w > pf.x + 6 && this.x < pf.x + pf.w - 6 && this.dy >= 0 &&
                        (this.y + this.h) <= pf.top + 16 && (this.y + this.h) >= pf.top - 20) land = Math.min(land, pf.top);
                }
                if (this.y + this.h >= land){ this.y = land - this.h; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x += this.dashV; this.dashV *= 0.87;
                if (Math.abs(this.dashV) < 0.4) this.dashV = 0;
                this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
            }
            warn(reach, up, t){ this.tel = { dir: this.dir(), reach: reach, up: up, t: t, max: t }; }
            doSlash(reach, up, life){
                let _k = aaHeSo(this); reach *= _k; up = aaUp(this, up);
                this.slash = { t: life, dir: this.dir(), reach: reach, up: up, hit: false };
            }
            slashRect(){
                let a = this.slash; if (!a) return { x:0, y:0, w:0, h:0 };
                return a.dir < 0 ? { x: this.x - a.reach, y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 }
                                 : { x: this.x + this.w,  y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 };
            }
            /* Hoi chieu THUC TE = hoi chieu goc nhan he so theo pha. Tu pha 2: bo co ban keo
               dai gap 1.9 lan (pha 3: 2.4 lan), cac chieu dac trung rut con 0.78 lan. Chi can
               mot ham nay la ca hai duong chon chieu (`pickFrom` cua lop va hang doi `chuoi`)
               deu doi theo, khong cho nao lech duoc. */
            cdCua(id){
                let c = GAE_CD[id] || 0; if (!c) return 0;
                if (this.stage >= 2)
                    c = Math.round(c * (GAE_CB[id] ? (this.stage === 3 ? 2.4 : 1.9) : 0.78));
                return c;
            }
            canUse(id){ return !((this.cd[id] || 0) > 0); }
            pickFrom(pool, fb){
                pool = pool.filter(id => this.canUse(id));
                if (!pool.length) return fb;
                if (pool.length > 1){ let f = pool.filter(x => x !== this.lastSkill); if (f.length) pool = f; }
                let c = pool[Math.floor(Math.random() * pool.length)];
                this.lastSkill = c; if (GAE_CD[c]) this.cd[c] = this.cdCua(c);
                return c;
            }
            // @@HE-AIVO doc ham nay de khong cho pha truoc ra chieu cua pha sau
            aiLocChieu(id){
                // dang giua to hop thi NHUONG han luot chon cho `pickSkill` (no se rut chuoi)
                if (this.chuoi && this.chuoi.length) return false;
                return (GAE_PHA[id] || 1) <= this.stage && this.canUse(id);
            }
            // ---------- MACH MAU PHUN LEN TU DAT ----------
            /* Moi diem danh dau phai NHO THOI GIAN CHO CUA CHINH NO. Ban dau toi chia cho
               hang so GAE_MAU_CHO trong duong ve, ma cac diem lai duoc dat voi cho khac nhau
               (`cho + k*12`) — diem nao cho lau hon hang so thi u ra AM, ban kinh am, va
               canvas nem IndexSizeError lam treo ca khung. */
            datMau(x, cho){ let c = cho || GAE_MAU_CHO; this.mau.push({ x: x, t: c, tong: c, no: 0, hit: false }); }
            tickMau(){
                for (let i = this.mau.length - 1; i >= 0; i--){
                    let m = this.mau[i];
                    if (m.no > 0){
                        m.no--;
                        if (!m.hit){
                            let r = { x: m.x - 26, y: 320 - 116, w: 52, h: 116 };
                            if (checkAABB(dino, r)){ m.hit = true; this.hurtP(1); }
                        }
                        if (m.no <= 0) this.mau.splice(i, 1);
                        continue;
                    }
                    m.t--;
                    if (m.t <= 0){
                        m.no = 26;
                        visualEffects.push(new Effect(m.x, 300, 'explosion', true, 22));
                        shakeTimer = Math.max(shakeTimer, 12);
                        if (SFX.tone) SFX.tone(120, 0.14, 'sawtooth', 0.16, 60);
                    }
                }
            }
            // ---------- MUA SET MAU (pha 3) ----------
            datSet(x, cho){ let c = cho || GAE_SET_CHO; this.set.push({ x: x, t: c, tong: c, no: 0, hit: false }); }
            tickSet(){
                for (let i = this.set.length - 1; i >= 0; i--){
                    let s = this.set[i];
                    if (s.no > 0){
                        s.no--;
                        if (!s.hit){
                            let r = { x: s.x - GAE_SET_RONG, y: -CAM_TROI, w: GAE_SET_RONG * 2, h: 320 + CAM_TROI };
                            if (checkAABB(dino, r)){ s.hit = true; this.hurtP(1); }
                        }
                        if (s.no <= 0) this.set.splice(i, 1);
                        continue;
                    }
                    s.t--;
                    if (s.t <= 0){
                        s.no = 20; gaeChop = 22;
                        visualEffects.push(new Effect(s.x, 298, 'explosion', true, 30));
                        shakeTimer = Math.max(shakeTimer, 18);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                }
            }
            // ---------- VONG XUNG LAN RA TREN MAT DAT ----------
            tickVong(){
                let v = this.vong; if (!v) return;
                v.r += v.sp;
                let dx = Math.abs((dino.x + dino.w/2) - v.x);
                let day = 40;
                if (!v.hit && Math.abs(dx - v.r) < day/2 && (dino.y + dino.h) > 250){ v.hit = true; this.hurtP(1); }
                if (v.r > v.max) this.vong = null;
            }
            /* ---------- HOP SAT THUONG PHU: AO CHOANG HO TRO ----------
               Hans: "co 2 lan dmg moi phat chem do ao choang ho tro". Nen moi nhat kiem deu
               keo theo MOT HOP THU HAI, cham sau GAE_AO_TRE khung va voi dai hon luoi kiem
               GAE_AO_THEM px. Day la HAI LAN CHAM RIENG BIET, moi lan dung 1 sat thuong va
               moi lan chi cham mot lan — khong phai mot don 2 dmg (@@LUAT-BOSS L7). Trong
               thuc te co khung mien thuong nen phan lon chi an mot; cai no doi that su la
               TAM DANH (dai hon 34px) va mot nhip cham thu hai de phat nguoi lao vao som. */
            /* Hans: "don danh bang AO CHOANG cua 2 phase sau cung kha la to."
               Nen tam voi them cua ao choang len theo pha: 34 / 54 / 74 px. Pha 1 giu nguyen
               vi Hans da noi pha 1 du kho roi. */
            aoThem(){ return GAE_AO_THEM + (this.stage - 1) * 20; }
            /* Va cac don AO CHOANG NANG thi de lai LINH HON. Hans: "tao ra linh hon o mot vai
               don manh." Chi tu pha 2, va co tran so oan hon dang song de khong thanh bay. */
            honTheoAo(){
                if (this.stage < 2) return;
                this.trieuHon(this.stage === 3 ? 3 : 2);
            }
            themHopAo(reach, up, life){
                let d = this.dir(), R = reach + this.aoThem(), U = up + 10;
                let r = d < 0 ? { x: this.x - R, y: this.y + 4 - U, w: R, h: this.h + U - 4 }
                              : { x: this.x + this.w, y: this.y + 4 - U, w: R, h: this.h + U - 4 };
                let wAng = (this.armR || 0) < -1.0 ? -0.45 : ((this.armR || 0) > 0.3 ? 0.28 : -0.15);
                this.capeWhip = 1.0;
                this.capeAngle = wAng;
                this.hop.push({ x: r.x, y: r.y, w: r.w, h: r.h, cho: GAE_AO_TRE,
                                t: life || 12, tong: life || 12, hit: false,
                                dir: d, ox: this.cx(), oy: this.y + this.h * 0.44, reach: R, wAng: wAng });
            }
            tickHop(){
                for (let i = this.hop.length - 1; i >= 0; i--){
                    let h = this.hop[i];
                    if (h.cho > 0){ h.cho--; continue; }
                    h.t--;
                    if (!h.hit && checkAABB(dino, h)){ h.hit = true; this.hurtP(1); }
                    if (h.t <= 0) this.hop.splice(i, 1);
                }
            }
            /* ---------- OAN HON ----------
               Hans: "Gael cung co the trieu hoi vo so oan hon tu co the, cac oan hon nay di
               nguoi choi mot luc va TU CHUI XUONG DAT sau 2 giay roi DE LAI MOT TIA SET tai
               cho chung nam xuong." Hai tang de doa: doan dui, va cai dat NHO CHO ban vua
               dung. Ne duoc ca hai vi oan hon bay cham va cho chui xuong duoc danh dau. */
            trieuHon(n){
                if (this.hon.length >= 11) return;   // tran: khong de oan hon phu kin san
                for (let k = 0; k < n; k++){
                    this.hon.push({ x: this.cx() + (Math.random() - 0.5) * 40,
                                    y: this.y + this.h * 0.4 + (Math.random() - 0.5) * 30,
                                    t: 0, pha: 'ra', hit: false,
                                    lech: (k - (n - 1) / 2) * 26,
                                    nhip: Math.random() * 6.28 });
                }
            }
            tickHon(){
                for (let i = this.hon.length - 1; i >= 0; i--){
                    let o = this.hon[i]; o.t++; o.nhip += 0.14;
                    if (o.pha === 'ra'){
                        o.y -= 1.1;
                        if (o.t > 22){ o.pha = 'duoi'; o.t = 0; }
                    } else if (o.pha === 'duoi'){
                        let dx = (dino.x + dino.w/2 + o.lech) - o.x;
                        o.x += Math.max(-2.9, Math.min(2.9, dx * 0.055));
                        let dy = (dino.y + dino.h * 0.4) - o.y;
                        o.y += Math.max(-1.9, Math.min(1.9, dy * 0.05)) + Math.sin(o.nhip) * 0.6;
                        let r = { x: o.x - 14, y: o.y - 16, w: 28, h: 32 };
                        if (!o.hit && checkAABB(dino, r)){ o.hit = true; this.hurtP(1); }
                        if (o.t > GAE_HON_DUOI){ o.pha = 'chui'; o.t = 0; o.dat = o.x; }
                    } else if (o.pha === 'chui'){
                        o.y += (320 - 10 - o.y) * 0.22;
                        if (o.t > GAE_HON_CHUI){
                            /* LECH NHIP theo tung con. Ca nam con chui xuong cung luc nen neu
                               set cung giang cung luc thi do la mot BUC TUONG 5 cot rong hon
                               400px giang mot phat — doc ra la khong ne duoc. Cho con o ngoai
                               giang muon hon mot chut de no thanh mot dot quet lan ra, van du
                               de doa ma van con duong chay. */
                            this.datSet(o.dat, GAE_HON_SET + Math.abs(o.lech) * 0.5);
                            this.hon.splice(i, 1);
                        }
                    }
                }
            }
            // ---------- DON VONG CUA AO CHOANG ----------
            /* Ao choang KHONG phai do trang tri. Nhat quat dau la mot hop sat thuong that,
               va no de lai mot cai BONG dung tai cho: GAE_ECHO_CHO khung sau, cai bong do
               NO them mot lan nua o dung vi tri cu. Nguoi choi ne duoc nhat dau roi lao vao
               ngay se an dung don thu hai — do la cai "Echo Attack". Bong hien RO dan nen
               van doc duoc va van ne duoc (@@LUAT-BOSS L5). */
            tickEcho(){
                let e = this.echo; if (!e) return;
                e.t--;
                if (e.t <= 0){
                    if (e.no === 0){
                        e.no = 14;
                        visualEffects.push(new Effect(e.x + e.w/2, e.y + e.h/2, 'explosion', e.dir < 0, 26));
                        shakeTimer = Math.max(shakeTimer, 16);
                        if (SFX.bossExplode) SFX.bossExplode();
                        if (!e.hit && checkAABB(dino, e)){ e.hit = true; this.hurtP(1); }
                        e.t = 14;
                    } else { this.echo = null; }
                }
            }
            /* ---------- WAY OF WHITE CORONA ----------
               Ban dau toi lam MOT dia lan sat mat dat. Sai hai cho:
                 - Hans: WOWC goc "nem ra NHIEU dan", khong phai mot.
                 - Va trong game nay mot dia sat dat thi chi can nhay mot cai la qua — no
                   khong con la de doa. Nen o day no "NHAM TOI CHIEU CAO THAY VI NGANG":
                   GAE_COR_SO dia xep chong theo CHIEU DOC, phu tu mat dat len qua dau nguoi
                   choi, va giua chung co KHE HO de van ne duoc (@@LUAT-BOSS L5).
               Moi dia bay ra roi QUAY VE tay Gael, an ca luot di lan luot ve. */
            /* Hans: "WOWC thi no LUON QUAY VE GAEL bat ke ong co dich chuyen ra sau lung
               nguoi choi, nhu vay don nay cang kho ne hon va dung hon voi Gael goc."
               Truoc day luot ve chi la DAO DAU van toc: dia bay nguoc lai theo dung duong cu,
               nen Gael dich chuyen sang ben kia la dia bay ra xa han — vua sai bang goc, vua
               tu huy cai bay gong kim. Gio moi khung luot ve deu tinh lai huong theo VI TRI
               HIEN TAI cua Gael, nen dia doi chieu giua duong va di XUYEN QUA cho nguoi choi
               vua nup. */
            tickCorona(){
                for (let i = this.cor.length - 1; i >= 0; i--){
                    let c = this.cor[i];
                    c.t++; c.goc += 0.42;
                    if (!c.ve && c.di > GAE_CORONA_XA){ c.ve = true; c.spVe = Math.abs(c.vx) * 0.92; }
                    if (c.ve){
                        c.spVe = Math.min(10.5, (c.spVe || 5) + 0.06);
                        let dx = this.cx() - c.x;
                        c.vx = (Math.abs(dx) < 2 ? 0 : Math.sign(dx)) * c.spVe;
                    }
                    c.x += c.vx; c.di += Math.abs(c.vx);
                    let r = { x: c.x - 26, y: c.y - 26, w: 52, h: 52 };
                    let khoa = c.ve ? 'hitVe' : 'hitDi';
                    if (!c[khoa] && checkAABB(dino, r)){ c[khoa] = true; this.hurtP(1); }
                    if (c.t > 260 || c.x < -90 || c.x > canvas.width + 90) this.cor.splice(i, 1);
                    else if (c.ve && Math.abs(c.x - this.cx()) < 28) this.cor.splice(i, 1);
                }
            }
            // ---------- VET MAU GAEL DE LAI KHI LAO ----------
            tickVet(){
                for (let i = this.veto.length - 1; i >= 0; i--){
                    let v = this.veto[i]; v.t--;
                    if (v.t <= 0) this.veto.splice(i, 1);
                }
            }
            // ================= CHUYEN PHA =================
            startPhase2(){
                if (this.stage === 2) return this.startStage3();
                this.stage = 2; this.hp = GAE_HP[2]; this.maxHp = GAE_HP[2];
                this.invulnAll = true;
                this.name = "GAEL — MÁU CỦA HỒN TỐI";
                this.w = GAE_W2; this.h = GAE_H2; this.baseY = 320 - this.h;
                this.y = this.baseY; this.dy = 0; this.dashV = 0;
                this.state = 'g_hoi2'; this.subTimer = 0; this._bag = null; this.atkBag = [];
                this.slash = null; this.tel = null; this.cd = {};
                this.mau.length = 0; this.set.length = 0; this.vong = null;
                this.chuoi.length = 0; this.echo = null; this.cor.length = 0;
                this.hop.length = 0; this.hon.length = 0;
                this.resetCapePose(); this.an = 0;
                this.y = this.baseY; this.dy = 0; this.dashV = 0; this.grounded = true;
                bossProjectiles.length = 0;
                floatingTexts.push(new FloatingText(this.cx() - 110, 128, "HỒN TỐI TRỖI DẬY"));
                shakeTimer = 70; if (SFX.bossEntry) SFX.bossEntry();
            }
            startStage3(){
                this.stage = 3; this.phase = 2;          // tu day het mau la chet that
                this.hp = GAE_HP[3]; this.maxHp = GAE_HP[3];
                this.invulnAll = true;
                this.name = "GAEL — BÃO CỦA HỒN TỐI";
                this.state = 'g_hoi3'; this.subTimer = 0; this._bag = null; this.atkBag = [];
                this.slash = null; this.tel = null; this.cd = {};
                this.mau.length = 0; this.set.length = 0; this.vong = null;
                this.chuoi.length = 0; this.echo = null; this.cor.length = 0;
                this.hop.length = 0; this.hon.length = 0;
                this.resetCapePose(); this.an = 0;
                this.y = this.baseY; this.dy = 0; this.dashV = 0; this.grounded = true;
                bossProjectiles.length = 0;
                floatingTexts.push(new FloatingText(this.cx() - 120, 128, "MÁU CỦA HỒN TỐI SÔI LÊN"));
                shakeTimer = 90; gaeChop = 40; if (SFX.bossEntry) SFX.bossEntry();
            }
            // ================= VONG CAP NHAT =================
            update(){
                if (this.state === 'entering'){
                    this.physics(); this.x -= 4;
                    if (this.x < canvas.width - 250) this.toIdle(24);
                    return;
                }
                for (let i = this.ghosts.length - 1; i >= 0; i--){ this.ghosts[i].t--; if (this.ghosts[i].t <= 0) this.ghosts.splice(i, 1); }
                if (this.tel){ this.tel.t--; if (this.tel.t <= 0) this.tel = null; }
                if (this.slash){ this.slash.t--; if (this.slash.t <= 0) this.slash = null; }
                for (let k in this.cd) if (this.cd[k] > 0) this.cd[k]--;
                this.tickMau(); this.tickSet(); this.tickVong(); this.tickVet();
                this.tickEcho(); this.tickCorona(); this.tickHop(); this.tickHon();
                if (this.capeWhip > 0) this.capeWhip = Math.max(0, this.capeWhip - 0.055);
                if (this.stagger > 0){ this.stagger--; this.physics(); if (this.stagger === 0) this.toIdle(18); return; }
                this.physics();
                if (this.slash){
                    let r = this.slashRect();
                    if (!this.slash.hit && checkAABB(dino, r)){ this.slash.hit = true; this.hurtP(1); }
                }
                /* NO CUOI: duoi 25% mau o PHA 3, mot lan duy nhat. Bao truoc 70 khung va
                   vong lan ra tu tu nen van ne duoc bang cach chay ra xa hoac nhay qua —
                   @@LUAT-BOSS L5. */
                if (this.stage === 3 && !this.noCuoi && this.state === 'idle' && this.hp <= this.maxHp * 0.25){
                    this.noCuoi = true; this.state = 'g_cuoi'; this.subTimer = 0; return;
                }
                /* Dem so khung nguoi choi TREO tren khong (khong cham dat VA thuc su cao hon
                   Gael). Day la thu thay cho toan bo he chong khong cu: Gael khong nhay len
                   nua, han chi DEM, va treo lau qua thi an mot loat dan doc. */
                if (typeof dino !== 'undefined' && dino && !dino.grounded &&
                    (this.y + this.h) - (dino.y + dino.h) > 40)
                    this.treoT++;
                else this.treoT = Math.max(0, this.treoT - 3);
                /* "Neu o do QUA LAU" — 66 khung (hon mot giay) tren khong lien tuc thi loat
                   dan doc duoc uu tien truoc moi thu khac. Nhay binh thuong (~40 khung) khong
                   bao gio cham nguong nay, nen day khong phai hinh phat cho viec nhay.

                   Cho dat quan trong: phai o DAY, trong `update`, cung cho voi `g_cuoi` —
                   KHONG phai trong `pickSkill`. Vi `aivoGan` boc thang len `pickSkill` nen moi
                   thu viet trong do deu co the bi tang AI vo chen truoc. Da vap dung loi nay
                   mot lan voi phan chan pha (xem muc 2 cua tai lieu), do lan nay bang cach
                   cho nguoi choi treo 315 khung: bo o `pickSkill` thi chieu KHONG BAO GIO ra. */
                if (this.state === 'idle' && this.treoT > 66 && this.canUse('g_banlen') && !this.dying){
                    this.state = 'g_banlen'; this.subTimer = 0; this.faceP();
                    this.lastSkill = 'g_banlen'; this.cd['g_banlen'] = this.cdCua('g_banlen');
                    return;
                }
                if (this.state === 'idle'){
                    this.faceP();
                    let g = this.gap(), ad = Math.abs(g);
                    let di = this.stage === 1 ? 2.2 : (this.stage === 2 ? 2.8 : 3.2);
                    if (ad > 104){ let sp = ad > 300 ? di * 1.45 : di; this.x += Math.sign(g) * sp; this.walk += sp; }
                    else if (ad < 56){ this.x -= Math.sign(g) * 1.4; this.walk += 1.4; }
                    this.actionTimer--;
                    if (this.actionTimer <= 0) this.pickSkill();
                    return;
                }
                this.runSkill();
            }
            pickSkill(){
                if (this.chuoi && this.chuoi.length){
                    this.state = this.chuoi.shift(); this.subTimer = 0; this.faceP();
                    if (GAE_CD[this.state]) this.cd[this.state] = this.cdCua(this.state);
                    return;
                }
                let ad = Math.abs(this.gap()), near = ad < 180;
                let poolN = ['g_combo','g_quet','g_keo','g_nhay','g_quay'];
                let poolF = ['g_lao','g_lao','g_keo','g_nhay'];
                if (this.stage >= 2){
                    poolN.push('g_ao','g_song','g_bay','g_echo','g_vuot');
                    poolF.push('g_xung','g_mau','g_bay','g_song','g_no','g_corona','g_dich');
                }
                if (this.stage >= 3){
                    poolN.push('g_loan','g_xoay','g_set','g_echo','g_dich','g_hon','g_vuot');
                    poolF.push('g_set','g_loan','g_xung','g_xoay','g_corona','g_no','g_dich','g_hon');
                }
                this.state = this.pickFrom(nhipXa(this, near) ? poolF : poolN, 'g_combo');   // @@HE-NHIPXA
                this.subTimer = 0; this.faceP();
            }
            runSkill(){
                let st = this.state, sp = this.spd(); this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;

                // ============ CHUYEN PHA 1 -> 2: UONG HON TOI ============
                if (st === 'g_hoi2'){
                    this.invulnAll = true;
                    if (T(2)) floatingTexts.push(new FloatingText(this.cx() - 96, 156, "\"Ashen one...\""));
                    if (this.subTimer > 30 && Math.floor(this.subTimer) % 7 === 0)
                        visualEffects.push(new Effect(this.cx() + (Math.random()-0.5)*50, this.y + this.h - Math.random()*40, 'explosion', true, 12));
                    if (T(96)){ shakeTimer = 60; if (SFX.bossExplode) SFX.bossExplode(); }
                    if (T(120)){
                        // vong xung bao truoc RO, lan cham -> ne duoc
                        this.vong = { x: this.cx(), r: 10, sp: 5.2, max: 460, hit: false };
                        for (let k = -2; k <= 2; k++) this.datMau(this.cx() + k * 96, 34 + Math.abs(k) * 10);
                    }
                    if (this.subTimer > 160){ this.invulnAll = false; this.toIdle(19); }
                    return;
                }
                // ============ CHUYEN PHA 2 -> 3: SET DO GIANG XUONG ============
                if (st === 'g_hoi3'){
                    this.invulnAll = true;
                    if (T(2)) floatingTexts.push(new FloatingText(this.cx() - 80, 156, "\"...let us go together.\""));
                    if (Math.floor(this.subTimer) % 16 === 0){ gaeChop = 16; shakeTimer = Math.max(shakeTimer, 10); }
                    if (T(84)){
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 44));
                        shakeTimer = 72; gaeChop = 36;
                        for (let k = 0; k < GAE_SET_SO; k++)
                            this.datSet(90 + k * ((canvas.width - 180) / (GAE_SET_SO - 1)), GAE_SET_CHO + k * 9);
                    }
                    if (this.subTimer > 150){ this.invulnAll = false; this.toIdle(19); }
                    return;
                }
                // ============ COMBO BA NHAT ============
                /* ============ COMBO — SAU NHAT DOI HUONG, KET BANG DON DAM XUONG ============
                   Hans: "khong phai cu di ve mot huong ma di xen ke MOI HUONG 2 DON roi quay
                   ve huong con lai chem 2 don, va ket thuc voi mot DON DAM XUONG… Gael chem
                   loan xa trai phai tum lum chu khong cung danh ve mot huong, bu lai han LAO
                   VUT theo huong danh kha xa. Dieu nay kho doan hon neu bi ep goc."

                   Nen combo chia thanh BA CAP, moi cap hai nhat, va CAP SAU quay nguoc huong
                   voi cap truoc:
                       nhat 1-2 -> huong A   |   nhat 3-4 -> huong B   |   nhat 5-6 -> huong A
                   Huong A chot MOT LAN o nhat dau (theo vi tri nguoi choi luc do) roi khong
                   bam nguoi choi nua. Do la cho quan trong: neu moi nhat deu `faceP()` thi
                   Gael luon quay ve phia nguoi choi va combo tro lai thanh mot chieu — chinh
                   la cai Hans che. Bo bam huong di thi han bang qua nguoi choi roi vut nguoc
                   lai, va nguoi choi khong con doan duoc nhat ke den tu ben nao.

                   Lao xa hon han: dashV 20 -> 30 (truoc la 13 -> 19). Cong voi viec doi huong,
                   bi ep goc gio nguy hiem that su — han co the vut qua nguoi, doi chieu, va
                   nhat quay lai den tu phia tuong. */
                if (st === 'g_combo'){
                    let bao  = [4, 22, 40, 56, 72, 88];
                    let cham = [14, 32, 50, 66, 82, 98];
                    /* Giua hai nhat, neu nguoi choi da chay ra qua xa thi van BUOC theo. */
                    if (this.subTimer < 100 && Math.floor(this.subTimer) % 2 === 0){
                        let g = this.gap(); if (Math.abs(g) > 92) this.x += Math.sign(g) * 4.4;
                    }
                    for (let k = 0; k < 6; k++){
                        /* HUONG CHOT MOT LAN MOI CAP, theo vi tri nguoi choi luc BAT DAU CAP.
                           Ban dau toi lam cung nhac: cap 0 huong A, cap 1 huong NGUOC LAI, cap
                           2 huong A — ep doi chieu ma khong nhin nguoi choi dang o dau. Do lai
                           thi Gael de hon HAN ban truoc. Cach dung: MOI CAP nhin lai nguoi choi
                           MOT lan. Vi cu lao (150-300px) gan nhu luon dua han VUOT QUA nguoi
                           choi, "nhin lai" tu no thanh "quay nguoc lai" — dung cai hinh Hans
                           mo ta (hai don mot huong roi quay ve huong con lai), nhung khong bao
                           gio chem hut vao khong khi. */
                        if (k % 2 === 0 && T(bao[k] - 2)){ this.faceP(); this._comboD = this.dir(); }
                        let dd = this._comboD || 1;
                        if (T(bao[k])){
                            this.facingLeft = (dd < 0);
                            this.warn(106 + k * 8, 18 + k * 3, cham[k] - bao[k]);
                            /* CU LAO DI TRUOC LUOI KIEM, khong phai sau. Ban dau toi dat
                               `dashV` o khung CHAM: nhat kiem vung ra tu cho han DANG dung roi
                               cu lao moi keo han di — tuc la cu lao thanh doan ket thuc, khong
                               dua han toi dau ca. Dat o khung BAO thi han lao truoc, luoi kiem
                               cham o CUOI duong lao — dung hinh mot cu "lao toi ma chem".

                               NHUNG lao mot luong CO DINH thi hong theo huong nguoc lai: nguoi
                               choi dang dung sat ngay do ma han van vut di 150-300px thi luoi
                               kiem cham o cho trong, nguoi choi o lai phia sau lung. Do duoc:
                               combo danh vao mot bia dung yen sat ben chuyen tu 15 lan cham
                               xuong 0. Nen do dai cu lao phai TINH THEO KHOANG CACH:

                                 dashV *= 0.87 moi khung, nen sau 10 khung (bao -> cham) han di
                                 duoc 5.77 * v. Muon luoi kiem cham khi con cach nguoi choi ~60px
                                 thi v = (khoang cach - 60) / 5.77, va kep trong tran GAE_DASH0.

                               Ket qua dung y Hans: nguoi choi o XA thi cu lao chay het tran —
                               "lao vut theo huong danh kha xa"; nguoi choi dung sat thi han chi
                               buoc mot nhip roi chem. Va vi tong quang duong (7.7*v) van dai hon
                               doan toi luc cham (5.77*v), cu lao xa VAN dua han vuot qua nguoi
                               choi — nen cap sau van quay nguoc lai. */
                            let gg = this.gap();
                            let toi = (gg * dd > 0) ? Math.abs(gg) : 0;   // nguoi choi co nam ve phia lao khong
                            let vmax = (GAE_DASH0 + (k >> 1) * 5) * ((k % 2) ? 0.55 : 1);
                            this.dashV = dd * Math.max(4, Math.min(vmax, Math.max(0, toi - 60) / 5.77));
                        }
                        if (T(cham[k])){
                            this.facingLeft = (dd < 0);
                            this.armR = (k % 2) ? -0.5 : -1.9;
                            this.doSlash(106 + k * 8, 18 + k * 3, 10);
                            this.themHopAo(106 + k * 8, 18 + k * 3, 10);
                            this.aoDai = 0.45;
                            if (SFX.tone) SFX.tone(400 - k * 26, 0.06, 'square', 0.11, 210);
                        }
                    }
                    if (this.subTimer > 100) this.aoDai = Math.max(0, this.aoDai - 0.05);
                    /* ---- DON KET: BA KIEU KHAC NHAU ----
                       Hans: "trong combo co ket thuc bang NHIEU CACH nhu nhay len dam xuong
                       hay nhay qua dau nguoi choi ban dan."
                       Kieu duoc boc o khung 1, nen ca combo phia truoc nhin giong het nhau va
                       nguoi choi khong doan duoc doan ket cho toi luc han bat len:
                         'dam'  — nhay len roi DAM THANG XUONG (hop hep va sau)
                         'vuot' — nhay VUOT QUA dau roi ban ba mui CHUC XUONG
                         'ao'   — QUAT AO CHOANG mot vong rat rong, bung ra linh hon (chi pha 2-3)
                       Ba kieu doi hoi ba cach ne khac nhau: 'dam' phai roi khoi cho, 'vuot'
                       phai tranh ben kia, 'ao' phai ra ngoai tam — nen doan ket la mot cau hoi
                       that su chu khong phai mot dong tac hoc thuoc. */
                    if (T(1)){
                        let kieu = (this.stage >= 2) ? ['dam','vuot','ao'] : ['dam','vuot'];
                        this._ketKieu = kieu[Math.floor(Math.random() * kieu.length)];
                    }
                    let kk = this._ketKieu || 'dam';

                    // ======== KIEU 'dam' — NHAY LEN ROI DAM THANG XUONG ========
                    if (kk === 'dam'){
                        if (T(110)){
                            this.faceP(); this._ketX = dino.x + dino.w/2;
                            this.dy = -16.5; this.grounded = false; this.armR = -2.9;
                            this.damXuong = 1;                 // giai doan GIO KIEM LEN
                            this.warn(40, 20, 34);
                        }
                        /* Chot lai toa do MOT LAN NUA o khung 124, giua khong trung. Bao truoc
                           da bat tu khung 110 nen nguoi choi van co 12 khung de roi khoi cho —
                           nhung khong the chi chay deu sang mot ben de thoat nhu truoc. */
                        if (T(124) && !this.grounded) this._ketX = dino.x + dino.w/2;
                        if (this.subTimer > 110 && !this.grounded && this._ketX !== undefined){
                            let dx = this._ketX - this.cx();
                            this.x += Math.max(-13, Math.min(13, dx * 0.16));
                            if (Math.floor(this.subTimer) % 3 === 0) this.ghost();
                        }
                        if (this.subTimer > 118 && this.grounded && !this._daKet){
                            this._daKet = true; this._ketT = this.subTimer; this.armR = 1.55;
                            this.damXuong = 2;                 // giai doan DA CAM XUONG DAT
                            this.hop.push({ x: this.cx() - 46, y: this.y + this.h - 86,
                                            w: 92, h: 116, cho: 0, t: 12, tong: 12, hit: false });
                            this.vong = { x: this.cx(), r: 8, sp: 7.6, max: 300, hit: false };
                            visualEffects.push(new Effect(this.cx(), 306, 'explosion', true, 30));
                            shakeTimer = 34; if (SFX.bossExplode) SFX.bossExplode();
                        }
                    }
                    // ======== KIEU 'vuot' — LON VONG QUA DAU BAN NO XUONG + XOAY KIEM & ROI AO CHOANG ========
                    else if (kk === 'vuot'){
                        if (T(106)){
                            this.faceP();
                            this.crouchLean = 0.36;
                            this.armR = 0.75;
                            this.noTay = 1;
                            this.noGoc = 0.65;
                            this.warn(96, 22, 12);
                        }
                        if (T(116)){
                            this.faceP();
                            let g = this.gap();
                            this.dy = -17.8; this.grounded = false;
                            this.dashV = Math.sign(g || 1) * 15.5;      // Bật vọt qua đầu người chơi
                            this.capeWhip = 0.9;
                            this.capeAngle = -0.55;
                            if (SFX.bossSkill) SFX.bossSkill();
                        }
                        if (this.subTimer > 116 && !this.grounded){
                            // Xoay lộn vòng 360 độ trên không trung + Hướng mũi nỏ chúi thẳng vào người chơi bên dưới!
                            let airProg = Math.min(1, (this.subTimer - 116) / 34);
                            this.flipAngle = airProg * Math.PI * 2;
                            this.aoDai = 0.85;
                            this.capeWhip = 0.95;
                            this.capeAngle = -0.7 + Math.sin(airProg * Math.PI * 2) * 0.4;
                            let dxP = (dino.x + dino.w/2) - this.cx(), dyP = (dino.y + dino.h/2) - this.cy();
                            this.noGoc = Math.atan2(dyP, dxP * this.dir()) - this.flipAngle;
                            if (Math.floor(this.subTimer) % 3 === 0) this.ghost();
                            this.dashV *= 0.985;
                        }
                        // Xả 4 mũi nỏ liên thanh từ trên đỉnh đầu xuống đất trong lúc đang lộn vòng!
                        for (let q = 0; q < 4; q++){
                            if (T(126 + q * 5) && !this.grounded){
                                let px = dino.x + dino.w/2, py = dino.y + dino.h/2;
                                let ox = this.cx(), oy = this.y + this.h * 0.55;
                                let ang = Math.atan2(py - oy, px - ox) + (q - 1.5) * 0.14;
                                let spdB = 9.2;
                                let pr = new BossProjectile(ox, oy, Math.cos(ang) * spdB, Math.max(4.8, Math.sin(ang) * spdB), false, 1);
                                pr.frail = true; bossProjectiles.push(pr);
                                visualEffects.push(new Effect(ox, oy, 'explosion', this.facingLeft, 9));
                                if (SFX.tone) SFX.tone(740 - q * 35, 0.04, 'square', 0.10, 380);
                            }
                        }
                        // Ngay khi chạm đất phía bên kia: Quay ngoắt lại XOAY NGƯỜI CHÉM + QUẤT ROI ÁO CHOÀNG 360 ĐỘ!
                        if (this.subTimer > 128 && this.grounded && !this._daKet){
                            this._daKet = true; this._ketT = this.subTimer;
                            this.noTay = 0; this.noGoc = 0; this.flipAngle = 0;
                            this.faceP();
                            this.aoDai = 1.0; this.capeWhip = 1.0; this.capeAngle = 0.15;
                            this.armR = 0.85;
                            this.doSlash(144, 38, 16);
                            this.themHopAo(144, 38, 16);
                            this.hop.push({ x: this.cx() - 138, y: this.y - 20, w: 276, h: this.h + 28,
                                            cho: 0, t: 10, tong: 10, hit: false,
                                            dir: this.dir(), ox: this.cx(), oy: this.y + this.h * 0.44, reach: 138, wAng: 0.1 });
                            this.honTheoAo();
                            visualEffects.push(new Effect(this.cx(), 310, 'explosion', true, 28));
                            shakeTimer = 28;
                            if (SFX.bossExplode) SFX.bossExplode();
                        }
                        if (this._daKet && this.subTimer <= (this._ketT || 0) + 18){
                            this.quay += 0.52 * sp;
                        } else if (this._daKet){
                            this.quay = 0;
                        }
                    }
                    // ======== KIEU 'ao' — QUAT AO CHOANG RONG, BUNG RA LINH HON (pha 2-3) ========
                    else {
                        if (T(104)){
                            this.faceP(); this.armR = -2.5; this.aoDai = 0.5;
                            this.warn(150 + this.aoThem(), 46, 30);
                        }
                        if (this.subTimer > 104 && this.subTimer < 134)
                            this.aoDai = Math.min(1, this.aoDai + 0.05);
                        if (T(134)){
                            this.armR = 1.0; this.aoDai = 1;
                            this.doSlash(150, 46, 16);
                            this.themHopAo(150, 46, 16);     // ao choang voi them 54-74px nua
                            this.dashV = this.dir() * 9;
                            this.honTheoAo();                // bung ra linh hon
                            shakeTimer = 30; if (SFX.bossSkill) SFX.bossSkill();
                            this._daKet = true; this._ketT = this.subTimer;
                        }
                        if (this.subTimer > 140) this.aoDai = Math.max(0, this.aoDai - 0.05);
                    }

                    /* Ket combo khi doan ket da xong, khong phai theo mot moc thoi gian co dinh.
                       Da vap: cat duoi combo xuong khung 148 cho gon thi don DAM XUONG khong bao
                       gio cham dat kip — han bat len o khung 110, roi tu do mat ~50 khung, nen
                       combo tu ket thuc giua khong trung va hop sat thuong bi bo han (do ra 0 lan
                       cham). Moc la "doan ket xong roi + 26 khung"; moc thoi gian chi la luoi
                       an toan. */
                    if ((this._daKet && this.subTimer > (this._ketT || 0) + 26) || this.subTimer > 300){
                        this._daKet = false; this._ketX = undefined; this.damXuong = 0;
                        this.noTay = 0; this._ketKieu = null;
                        this.toIdle(30);
                    }
                    return;
                }
                /* ============ XOAY NGUOI CHEM — DON CAN CHIEN RONG NHAT ============
                   Hans: "Gael co chieu XOAY NGUOI CHEM voi don xoay va AO CHOANG CUNG XOAY
                   THEO gay dmg VONG TRON 2 LAN, day la don can chien rong nhat cua Gael."

                   Hai thu phai dung cho no khac han moi don khac:
                     - VONG TRON: khong co huong. Moi don khac cua Gael deu la mot hop ve mot
                       phia, nen lui ra dung phia sau lung han la thoat. Don nay khong.
                       Ban kinh GAE_QUAY_R = 150 do tu TAM than — rong hon ca nhat dai nhat
                       cua combo (146 tinh tu mep), va an ca HAI ben cung luc.
                     - HAI LAN: hai vong xoay o khung 26 va 46. Vong dau danh bat nguoi choi
                       ra, vong sau don cho ai vua lao vao lai.
                   Vi khong co huong nen bao truoc cung khong the la mot hop: dung mot VONG
                   TRON lon dan (`quayBao`), thu duy nhat doc duoc "rong toi day" truoc khi
                   no cham (@@LUAT-BOSS L5). */
                if (st === 'g_quay'){
                    if (T(4)){
                        this.faceP(); this.armR = -2.2; this.aoDai = 0.4;
                        this.quayBao = { t: 0, tong: 22 };
                        if (SFX.tone) SFX.tone(150, 0.2, 'sawtooth', 0.12, 70);
                    }
                    if (this.subTimer > 4 && this.subTimer < 26)
                        this.aoDai = Math.min(1, this.aoDai + 0.045);
                    if (this.quayBao) this.quayBao.t++;
                    // hai vong xoay
                    for (let k = 0; k < 2; k++){
                        if (T(26 + k * 20)){
                            this.quayBao = null;
                            this.aoDai = 1;
                            this.hop.push({ x: this.cx() - GAE_QUAY_R, y: this.y - 26,
                                            w: GAE_QUAY_R * 2, h: this.h + 34,
                                            cho: 0, t: 9, tong: 9, hit: false });
                            if (k === 1) this.honTheoAo();   // vong thu hai bung ra linh hon
                            visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 26));
                            shakeTimer = Math.max(shakeTimer, 20);
                            if (SFX.tone) SFX.tone(330 - k * 60, 0.09, 'square', 0.13, 180);
                        }
                    }
                    if (this.subTimer > 22 && this.subTimer < 62){
                        this.quay += 0.42 * sp;                 // luoi kiem quet tron
                        let g = this.gap();
                        if (Math.abs(g) > 40) this.x += Math.sign(g) * 1.9;   // xoay ma van tien
                    }
                    if (this.subTimer > 62) this.aoDai = Math.max(0, this.aoDai - 0.06);
                    if (this.subTimer > 78){ this.quay = 0; this.toIdle(28); }
                    return;
                }
                /* ============ BAN LEN — tra loi cho nguoi choi TREO TREN KHONG ============
                   Hans: "bo vu Anti Air di vi khong co tac dung may, cho Gael KHO CHIU O VI
                   TRI DUNG la duoc. Nguoi choi o tren cao thi thay vi nhay len thi Gael BAN
                   LEN neu o do qua lau, va BAN GAT HON BINH THUONG la duoc."

                   Nen day khong phai mot don chong khong (khong nhay, khong dam theo). No la
                   mot don PHAT: dung yen tren dat, di theo BONG cua nguoi choi, va ban doc len
                   gat hon loat no thuong — 8 mui thay vi 5, nhip 5 khung thay vi 8.
                   Van la mui `frail` nen ban vo duoc: nguoi choi tren khong khong bi tuoc
                   quyen phan khang, chi bi ep phai xuong dat. */
                if (st === 'g_banlen'){
                    if (T(4)){ this.faceP(); this.noTay = 1; this.armR = -1.15; }
                    // di theo BONG nguoi choi — day la phan "kho chiu o vi tri dung"
                    if (this.subTimer > 4 && this.subTimer < 62){
                        let g = this.gap();
                        if (Math.abs(g) > 16) this.x += Math.sign(g) * 3.1 * this.spd();
                    }
                    for (let k = 0; k < 8; k++){
                        if (T(18 + k * 5)){
                            let px = dino.x + dino.w/2, py = dino.y + dino.h/2;
                            let ox = this.cx(), oy = this.y + this.h * 0.35;
                            let dx = px - ox, dy = py - oy, L = Math.hypot(dx, dy) || 1;
                            let V = 9.2;
                            let pr = new BossProjectile(ox, oy, dx / L * V, dy / L * V, false, 1);
                            pr.frail = true;
                            bossProjectiles.push(pr);
                            this.armR = (k % 2) ? -1.0 : -1.3;
                            if (SFX.tone) SFX.tone(760 - k * 22, 0.035, 'square', 0.09, 400);
                        }
                    }
                    if (this.subTimer > 66){ this.noTay = 0; this.treoT = 0; this.toIdle(24); }
                    return;
                }
                /* ============ NHAY QUA DAU BAN NO XUONG ============
                   Hans: "co nhung pha nhay len de ban no trong combo luon (nhay qua dau nguoi
                   choi ban no xuong)". Han vot len, bay VUOT QUA nguoi choi, va o dinh vong
                   cung thi ban ba mui CHUC XUONG. Dap dat o phia ben kia — doi ben han, va
                   nguoi choi mat cai lung vua quay. */
                /* ============ COMBO DAC TRUNG: LUOT CHEM -> LON VONG QUA DAU BAN NO XUONG -> XOAY KIEM & ROI AO CHOANG ============
                   1) Nhip 1 (Khung 1 -> 24): Gael ha thap trong tam LUOT VUT TOI CHEM NGANG + QUAT ROI AO CHOANG.
                   2) Nhip 2 (Khung 25 -> 60): Dung da chem bat nhay LON VONG 360 DO QUA DAU nguoi choi,
                      rut no lien thanh ban 4 mui CHUC THANG XUONG DAT ngay trong luc dang xoay tren khong!
                   3) Nhip 3 (Khi cham dat -> Khung 96): Dap dat o phia sau lung nguoi choi, lap tuc XOAY TRON
                      DAI KIEM ket hop ROI AO CHOANG quet rong ca hai ben! */
                if (st === 'g_vuot'){
                    // --- NHIP 1: LUOT CHEM MO MAN ---
                    if (T(2)){
                        this.faceP();
                        this.crouchLean = 0.38;
                        this.armR = -2.1;
                        this.aoDai = 0.45;
                        this.warn(132, 24, 12);
                        let g = Math.abs(this.gap());
                        this.dashV = this.dir() * Math.max(14, Math.min(26, (g - 40) / 4.5));
                    }
                    if (T(14)){
                        this.faceP();
                        this.armR = 0.65;
                        this.capeWhip = 1.0; this.capeAngle = -0.25; this.aoDai = 0.85;
                        this.doSlash(132, 24, 10);
                        this.themHopAo(132, 24, 10);
                        this.dashV = this.dir() * 10;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    // --- NHIP 2: BAT NHAY XOAY LON VONG QUA DAU & BAN NO CHUC XUONG ---
                    if (T(25)){
                        this.faceP();
                        this._daVuot = false;
                        this.noTay = 1;
                        this.noGoc = 0.65;
                        let g = this.gap();
                        let jumpDir = Math.sign(g || this.dir());
                        this.dy = -17.6; this.grounded = false;
                        // Đảm bảo vận tốc ngang đủ lớn để lộn hẳn qua đầu người chơi sang phía bên kia!
                        let distNeed = Math.max(145, Math.min(270, Math.abs(g) + 95));
                        this.dashV = jumpDir * (distNeed / 10.5);
                        if (SFX.tone) SFX.tone(320, 0.08, 'sawtooth', 0.12, 180);
                    }
                    if (this.subTimer > 25 && !this.grounded){
                        let airProg = Math.min(1, (this.subTimer - 25) / 34);
                        this.flipAngle = airProg * Math.PI * 2;   // Xoay lộn vòng 360 độ trên không!
                        this.aoDai = 0.9;
                        this.capeWhip = 0.95;
                        this.capeAngle = -0.65 + Math.sin(airProg * Math.PI * 2) * 0.45;
                        let dxP = (dino.x + dino.w/2) - this.cx(), dyP = (dino.y + dino.h/2) - this.cy();
                        this.noGoc = Math.atan2(dyP, dxP * this.dir()) - this.flipAngle;
                        if (Math.floor(this.subTimer) % 3 === 0) this.ghost();
                        this.dashV *= 0.986;
                    }
                    // Bắn 4 mũi nỏ liên thanh chúi xuống đầu người chơi khi đang bay ngang qua đỉnh!
                    for (let k = 0; k < 4; k++){
                        if (T(34 + k * 5) && !this.grounded){
                            let px = dino.x + dino.w/2, py = dino.y + dino.h/2;
                            let ox = this.cx(), oy = this.y + this.h * 0.55;
                            let ang = Math.atan2(py - oy, px - ox) + (k - 1.5) * 0.14;
                            let spdB = 9.4;
                            let p = new BossProjectile(ox, oy, Math.cos(ang) * spdB, Math.max(4.8, Math.sin(ang) * spdB), false, 1);
                            p.frail = true;
                            bossProjectiles.push(p);
                            visualEffects.push(new Effect(ox, oy, 'explosion', this.facingLeft, 9));
                            if (SFX.tone) SFX.tone(740 - k * 35, 0.04, 'square', 0.10, 380);
                        }
                    }
                    // --- NHIP 3: DAP DAT XOAY TRON DAI KIEM & ROI AO CHOANG ---
                    if (this.subTimer > 38 && this.grounded && !this._daVuot){
                        this._daVuot = true;
                        this._vuotLandT = this.subTimer;
                        this.noTay = 0; this.noGoc = 0; this.flipAngle = 0;
                        this.faceP();
                        this.crouchLean = 0.28;
                        this.aoDai = 1.0; this.capeWhip = 1.0; this.capeAngle = 0.12;
                        this.armR = -2.2;
                        this.dashV = this.dir() * 9;
                        this.doSlash(142, 36, 16);
                        this.themHopAo(142, 36, 16);
                        // Quét vòng tròn bằng cả lưỡi kiếm lẫn roi áo choàng khi vừa chạm đất
                        this.hop.push({ x: this.cx() - 138, y: this.y - 22, w: 276, h: this.h + 30,
                                        cho: 0, t: 10, tong: 10, hit: false,
                                        dir: this.dir(), ox: this.cx(), oy: this.y + this.h * 0.44, reach: 138, wAng: 0.1 });
                        this.honTheoAo();
                        visualEffects.push(new Effect(this.cx(), 310, 'explosion', true, 28));
                        shakeTimer = 24;
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this._daVuot){
                        let dtLand = this.subTimer - (this._vuotLandT || this.subTimer);
                        if (dtLand < 18){
                            this.quay += 0.54 * sp;
                            this.aoDai = 1.0;
                        } else {
                            this.quay = 0;
                            this.aoDai = Math.max(0, this.aoDai - 0.08);
                        }
                        if (dtLand > 28){
                            this._daVuot = false; this.noTay = 0; this.quay = 0;
                            this.toIdle(20);
                            return;
                        }
                    }
                    // Safety timeout must include real airtime at the faster phase-3 clock.
                    if (this.subTimer > 200){
                        this._daVuot = false; this.noTay = 0; this.quay = 0;
                        this.toIdle(20);
                    }
                    return;
                }
                /* ============ TRIEU OAN HON ============ */
                if (st === 'g_hon'){
                    if (T(6)){ this.faceP(); this.armR = -1.4; this.aoDai = 0.5; }
                    if (T(30)){
                        this.trieuHon(GAE_HON_SO);
                        this.aoDai = 1; shakeTimer = 26;
                        floatingTexts.push(new FloatingText(this.cx() - 70, 142, "OAN HỒN TRỖI DẬY"));
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', this.facingLeft, 34));
                        if (SFX.bossEntry) SFX.bossEntry();
                    }
                    if (this.subTimer > 34) this.aoDai = Math.max(0, this.aoDai - 0.05);
                    if (this.subTimer > 76){ this.toIdle(24); }
                    return;
                }
                // ============ KEO KIEM: le luoi tren dat roi hat nguoc len ============
                if (st === 'g_keo'){
                    if (T(4)){ this.faceP(); this.armR = 0.55; }
                    // le kiem: han BUOC TOI cham, toe tia lua tren mat dat
                    if (this.subTimer > 6 && this.subTimer < 52){
                        let g = this.gap(); if (Math.abs(g) > 70) this.x += Math.sign(g) * 2.1;
                        if (Math.floor(this.subTimer) % 4 === 0)
                            visualEffects.push(new Effect(this.cx() + this.dir() * 46, 314, 'explosion', this.facingLeft, 9));
                    }
                    if (T(48)){ this.warn(168, 44, 26); }
                    if (T(74)){
                        this.armR = -2.5;
                        this.doSlash(168, 44, 18);
                        this.dashV = this.dir() * 8; shakeTimer = 26;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 96) this.toIdle(24);
                    return;
                }
                // ============ QUET THAP: chi trung khi DANG DUNG DAT ============
                if (st === 'g_quet'){
                    if (T(8)){ this.faceP(); this.armR = -2.0; this.warn(140, -14, 22); }
                    if (T(30)){
                        this.armR = 0.7;
                        this.doSlash(140, -14, 16);
                        this.dashV = this.dir() * 6;
                        if (SFX.tone) SFX.tone(240, 0.10, 'sawtooth', 0.14, 120);
                    }
                    if (this.subTimer > 58) this.toIdle(19);
                    return;
                }
                // ============ LAO: mot cu phong dai tu xa ============
                if (st === 'g_lao'){
                    if (T(6)){ this.faceP(); this.armR = 0.9; }
                    if (T(28)){ this.warn(126, 16, 20); }
                    if (T(48)){
                        this.armR = -1.2;
                        this.dashV = this.dir() * 30;      // Gael goc gan nhu truot ca san
                        this.doSlash(126, 16, 22);
                        this.themHopAo(126, 16, 20);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 30 && this.subTimer < 70 && Math.floor(this.subTimer) % 3 === 0) this.ghost();
                    if (this.subTimer > 84) this.toIdle(22);
                    return;
                }
                // ============ NHAY BO: don chong khong ============
                if (st === 'g_nhay'){
                    if (T(6)){ this.faceP(); this.armR = -1.0; }
                    if (T(18)){ this.dy = -15.5; this.grounded = false; this.dashV = this.dir() * 5; }
                    if (this.subTimer > 18 && !this.grounded){
                        let g = this.gap(); if (Math.abs(g) > 40) this.x += Math.sign(g) * 2.6;
                        this.armR = -2.6;
                    }
                    if (this.subTimer > 26 && this.grounded && !this._daBo){
                        this._daBo = true;
                        this.armR = 0.4;
                        this.doSlash(132, 52, 16);
                        this.vong = { x: this.cx(), r: 8, sp: 7.0, max: 250, hit: false };
                        shakeTimer = 28; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 72){ this._daBo = false; this.toIdle(22); }
                    return;
                }
                // ============ XOAY AO CHOANG: quet CA HAI BEN ============
                if (st === 'g_ao'){
                    if (T(8)){ this.armR = -2.6; this.warn(120, 26, 26); }
                    if (T(34) || T(46)){
                        this.facingLeft = T(34) ? this.facingLeft : !this.facingLeft;
                        this.armR = (this.armR < 0) ? 0.8 : -2.4;
                        this.aoDai = 0.8;
                        this.doSlash(120, 26, 12);
                        this.themHopAo(120, 26, 12);
                        if (SFX.tone) SFX.tone(330, 0.07, 'square', 0.12, 180);
                    }
                    if (T(46)) this.honTheoAo();
                    if (this.subTimer > 52) this.aoDai = Math.max(0, this.aoDai - 0.06);
                    if (this.subTimer > 70) this.toIdle(20);
                    return;
                }
                // ============ SONG BO: hai nhat bo + song xung chay doc san ============
                if (st === 'g_song'){
                    if (T(8)){ this.faceP(); this.armR = -2.5; this.warn(128, 40, 26); }
                    if (T(34)){
                        this.armR = 0.5; this.doSlash(128, 40, 14);
                        this.dashV = this.dir() * 7; shakeTimer = 20;
                    }
                    if (T(54)){ this.faceP(); this.armR = -2.7; this.warn(140, 46, 24); }
                    if (T(78)){
                        this.armR = 0.8; this.doSlash(140, 46, 16);
                        shakeTimer = 30; if (SFX.bossExplode) SFX.bossExplode();
                        // song chan chay doc mat dat — ban vo duoc
                        for (let s2 of [-1, 1]){
                            let p = new BossProjectile(this.cx() + s2 * 30, 320 - 58, s2 * 6.2, 0, true, 1);
                            p.frail = true; p.gaelSong = 1;
                            bossProjectiles.push(p);
                        }
                    }
                    if (this.subTimer > 104) this.toIdle(24);
                    return;
                }
                // ============ MACH MAU: ba mach phun doc theo huong nguoi choi ============
                if (st === 'g_mau'){
                    if (T(6)){ this.faceP(); this.armR = -1.6; }
                    if (T(26)){
                        this.armR = 0.9; shakeTimer = 18;
                        if (SFX.bossSkill) SFX.bossSkill();
                        let d = this.dir();
                        let x0 = this.cx() + d * 90;
                        for (let k = 0; k < 4; k++) this.datMau(x0 + d * k * 108, GAE_MAU_CHO + k * 12);
                        // mot mach roi DUNG CHO nguoi choi dang dung — bao truoc lau nhat
                        this.datMau(dino.x + dino.w/2, GAE_MAU_CHO + 40);
                    }
                    if (this.subTimer > 70) this.toIdle(24);
                    return;
                }
                // ============ XUNG PHONG: chay het chieu ngang man ============
                if (st === 'g_xung'){
                    if (T(6)){ this.faceP(); this.armR = 0.6; }
                    if (T(34)){ this.warn(118, 20, 18); }
                    if (T(52)){ this.armR = -1.0; this.dashV = this.dir() * 26; this.doSlash(118, 20, 40);
                                if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.subTimer > 52 && this.subTimer < 106){
                        this.dashV = this.dir() * 17;
                        if (Math.floor(this.subTimer) % 3 === 0){
                            this.ghost();
                            this.veto.push({ x: this.cx(), t: 26 });
                        }
                        if (this.slash) this.slash.t = 8;    // giu vung chem song suot cu chay
                    }
                    if (T(106)){ this.dashV = this.dir() * 4; }
                    if (this.subTimer > 130) this.toIdle(26);
                    return;
                }
                // ============ BAY LEN RO NGUOC: don chong khong tam cao ============
                if (st === 'g_bay'){
                    if (T(6)){ this.faceP(); this.armR = 0.8; }
                    if (T(20)){ this.dy = -18.5; this.grounded = false; }
                    if (this.subTimer > 20 && !this.grounded){
                        let g = this.gap(); if (Math.abs(g) > 30) this.x += Math.sign(g) * 3.4;
                        this.armR = -2.8;
                        if (Math.floor(this.subTimer) % 4 === 0) this.ghost();
                    }
                    if (this.subTimer > 28 && this.grounded && !this._daBay){
                        this._daBay = true; this.armR = 0.6;
                        this.doSlash(150, 70, 18);
                        this.vong = { x: this.cx(), r: 8, sp: 8.4, max: 340, hit: false };
                        for (let k of [-1, 1]) this.datMau(this.cx() + k * 120, 30);
                        shakeTimer = 34; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 86){ this._daBay = false; this.toIdle(24); }
                    return;
                }
                // ============ NO LIEN HOAN — vu khi doc quyen cua Gael ============
                /* Gael KHONG phai boss thuan can chien. Day la khau no lien hoan cua han:
                   dung chan, nang no, ban mot loat GAE_NO_SO mui theo nhip GAE_NO_NHIP, vua
                   ban vua LUI dan — han danh nhu mot nguoi linh chu khong nhu mot con thu.
                   Mui no BAN VO DUOC (`frail`) nen van con duong go (@@LUAT-BOSS L5). */
                if (st === 'g_no'){
                    if (T(4)){ this.faceP(); this.noTay = 1; this.armR = 0.35; }
                    if (T(18)){ this.warn(0, 0, 14); }          // nhip nang no
                    for (let k = 0; k < GAE_NO_SO; k++){
                        if (T(32 + k * GAE_NO_NHIP)){
                            this.faceP();
                            let d = this.dir();
                            let y0 = this.y + this.h * 0.42 + (k % 3 - 1) * 9;
                            let p = new BossProjectile(this.cx() + d * 26, y0, d * 9.4, (k % 3 - 1) * 0.55, false, 1);
                            p.frail = true;
                            bossProjectiles.push(p);
                            this.x -= d * 3.2;                   // vua ban vua lui
                            if (SFX.tone) SFX.tone(760 - k * 30, 0.04, 'square', 0.10, 400);
                        }
                    }
                    if (this.subTimer > 32 + GAE_NO_SO * GAE_NO_NHIP + 20){
                        this.noTay = 0; this.toIdle(22);
                    }
                    return;
                }
                // ============ AO CHOANG — DON VONG (Echo Attack) ============
                if (st === 'g_echo'){
                    if (T(6)){ this.faceP(); this.aoDai = 0.35; this.warn(152, 32, 26); }
                    if (this.subTimer > 6 && this.subTimer < 34) this.aoDai = Math.min(1, this.aoDai + 0.05);
                    if (T(34)){
                        this.armR = 0.9; this.aoDai = 1;
                        this.doSlash(152, 32, 14);
                        this.dashV = this.dir() * 5;
                        shakeTimer = 18;
                        if (SFX.bossSkill) SFX.bossSkill();
                        // DE LAI BONG tai dung cho vua quat
                        let d = this.dir();
                        let r = d < 0 ? { x: this.x - 152, y: this.y + 4 - 32, w: 152, h: this.h + 32 - 4 }
                                      : { x: this.x + this.w, y: this.y + 4 - 32, w: 152, h: this.h + 32 - 4 };
                        this.echo = { x: r.x, y: r.y, w: r.w, h: r.h, dir: d,
                                      t: GAE_ECHO_CHO, tong: GAE_ECHO_CHO, no: 0, hit: false };
                        this.honTheoAo();      // nhat quat nang -> bung ra linh hon
                    }
                    if (this.subTimer > 30) this.aoDai = Math.max(0, this.aoDai - 0.06);
                    if (this.subTimer > 64){ this.toIdle(20); }
                    return;
                }
                // ============ WAY OF WHITE CORONA (pha 3) ============
                if (st === 'g_corona'){
                    if (T(6)){ this.faceP(); this.armR = -2.7; this.warn(0, 0, 30); }
                    if (T(36)){
                        this.armR = 0.2;
                        let d = this.dir();
                        // xep chong theo CHIEU CAO: sat dat / ngang nguoi / tren dau
                        for (let k = 0; k < GAE_COR_SO; k++){
                            this.cor.push({ x: this.cx() + d * 40, y: 320 - 44 - k * 62,
                                            vx: d * (7.4 - k * 0.5), di: 0, ve: false,
                                            goc: k * 0.8, t: 0, hitDi: false, hitVe: false });
                        }
                        shakeTimer = 20;
                        floatingTexts.push(new FloatingText(this.cx() - 92, 146, "WAY OF WHITE CORONA"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 78){ this.toIdle(22); }
                    return;
                }
                // ============ DICH CHUYEN ============
                /* @@LUAT-BOSS L6: dich chuyen KHONG duoc danh ngay. Nen cu nay tu no KHONG
                   gay sat thuong, va sau khi hien lai con 26 khung dung im CO BAO TRUOC roi
                   moi vao don noi — don noi luon duoc dat san trong `chuoi`. */
                if (st === 'g_dich'){
                    if (T(4)){ this.aoDai = 0.6; if (SFX.tone) SFX.tone(220, 0.16, 'sine', 0.14, 90); }
                    if (this.subTimer > 4 && this.subTimer < 20) this.aoDai = Math.min(1, this.aoDai + 0.08);
                    if (T(20)){
                        this.an = 1; this.invulnAll = true;
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', this.facingLeft, 28));
                    }
                    if (T(44)){
                        /* GONG KIM: neu dia Corona VAN CON DANG BAY thi hien lai o phia
                           NGUOC voi huong dia dang quay ve — nguoi choi bi ep giua hai thu.
                           Khong co dia thi ve luat cu: hien o phia con nhieu cho hon. */
                        let px = dino.x + dino.w/2;
                        let ben = (px < canvas.width/2) ? 1 : -1;
                        if (this.cor.length){
                            let c = this.cor[0];
                            ben = (c.x > px) ? -1 : 1;      // dia o ben nao thi Gael sang ben kia
                        }
                        this.x = Math.max(20, Math.min(canvas.width - this.w - 20, px + ben * 150 - this.w/2));
                        this.y = this.baseY; this.dy = 0; this.dashV = 0;
                        this.an = 0; this.invulnAll = false; this.faceP();
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', this.facingLeft, 28));
                        this.warn(0, 0, 26);                    // dung im co bao truoc
                        shakeTimer = 14;
                        if (SFX.bossEntry) SFX.bossEntry();
                    }
                    if (this.subTimer > 44) this.aoDai = Math.max(0, this.aoDai - 0.07);
                    if (this.subTimer > 72){ this.toIdle(16); }
                    return;
                }
                // ============ MUA SET MAU (pha 3) ============
                if (st === 'g_set'){
                    if (T(4)){ this.faceP(); this.armR = -2.9; }
                    if (T(30)){
                        shakeTimer = 26; gaeChop = 26;
                        if (SFX.bossSkill) SFX.bossSkill();
                        floatingTexts.push(new FloatingText(this.cx() - 74, 140, "MƯA SÉT MÁU"));
                        /* Nam cot, cach deu 168px, vung chet moi cot rong 84px — luon con
                           hanh lang giua hai cot de dung. Diem bat dau lech theo vi tri
                           nguoi choi nen khong hoc thuoc duoc. */
                        let lech = ((dino.x + dino.w/2) % 168) - 84;
                        for (let k = 0; k < GAE_SET_SO; k++)
                            this.datSet(70 + lech + k * 168, GAE_SET_CHO + k * 11);
                    }
                    if (T(56)){ this.armR = 0.5; }
                    if (this.subTimer > 96) this.toIdle(27);
                    return;
                }
                // ============ VU DIEU CUONG LOAN: nam nhat lien tiep (pha 3) ============
                if (st === 'g_loan'){
                    let bao = [6, 26, 46, 66, 90], cham = [14, 34, 54, 74, 108];
                    for (let k = 0; k < 5; k++){
                        if (T(bao[k])){ this.faceP(); this.warn(k === 4 ? 156 : 108, k === 4 ? 40 : 20, cham[k] - bao[k]); }
                        if (T(cham[k])){
                            this.faceP(); let to = (k === 4);
                            this.armR = to ? -2.6 : ((k % 2) ? 0.6 : -2.0);
                            this.doSlash(to ? 156 : 108, to ? 40 : 20, to ? 16 : 9);
                            this.dashV = this.dir() * (to ? 12 : 6);
                            this.ghost();
                            if (to){ shakeTimer = 30; if (SFX.bossExplode) SFX.bossExplode(); }
                            else if (SFX.tone) SFX.tone(460 - k * 34, 0.05, 'square', 0.10, 240);
                        }
                    }
                    if (this.subTimer > 126){ this.toIdle(27); }
                    return;
                }
                // ============ XOAY TIEN: vua xoay vua tien len (pha 3) ============
                if (st === 'g_xoay'){
                    if (T(8)){ this.faceP(); this.warn(130, 30, 22); }
                    if (this.subTimer > 30 && this.subTimer < 96){
                        this.armR = (this.armR || 0) - 0.34;
                        let g = this.gap();
                        this.x += Math.sign(g) * 2.6; this.walk += 2.6;
                        if (Math.floor(this.subTimer) % 5 === 0) this.ghost();
                        if (Math.floor(this.subTimer) % 14 === 0){
                            this.facingLeft = !this.facingLeft;
                            this.doSlash(130, 30, 10);
                            if (SFX.tone) SFX.tone(300, 0.05, 'square', 0.10, 220);
                        }
                    }
                    if (T(96)){ this.armR = 0; shakeTimer = 20; }
                    if (this.subTimer > 116) this.toIdle(24);
                    return;
                }
                // ============ NO CUOI: mot lan duy nhat duoi 25% mau ============
                if (st === 'g_cuoi'){
                    this.armR = -2.9;
                    if (T(2)){
                        floatingTexts.push(new FloatingText(this.cx() - 96, 132, "CHẠY RA XA!"));
                        if (SFX.bossEntry) SFX.bossEntry();
                    }
                    if (Math.floor(this.subTimer) % 6 === 0){
                        visualEffects.push(new Effect(this.cx() + (Math.random()-0.5)*70, this.y + this.h - Math.random()*50, 'explosion', true, 12));
                        shakeTimer = Math.max(shakeTimer, 14);
                    }
                    if (T(70)){
                        this.vong = { x: this.cx(), r: 12, sp: 6.0, max: 520, hit: false };
                        for (let k = -3; k <= 3; k++) if (k) this.datMau(this.cx() + k * 104, 26 + Math.abs(k) * 8);
                        gaeChop = 34; shakeTimer = 80;
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 112) this.toIdle(22);
                    return;
                }
                this.toIdle(19);
            }
            // ================= VE =================
            draw(){
                // vung bao truoc
                if (this.tel){
                    let a = this.tel, u = 1 - a.t / a.max;
                    let r = a.dir < 0 ? { x: this.x - a.reach, y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 }
                                      : { x: this.x + this.w,  y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 };
                    ctx.save();
                    ctx.globalAlpha = 0.16 + 0.24 * u;
                    ctx.fillStyle = this.stage >= 3 ? "#FF1744" : (this.stage === 2 ? "#B71C1C" : "#8D6E63");
                    ctx.fillRect(r.x, r.y, r.w, r.h);
                    ctx.globalAlpha = 0.55 + 0.4 * u;
                    ctx.strokeStyle = this.stage >= 3 ? "#FF8A80" : "#D7CCC8"; ctx.lineWidth = 2;
                    ctx.strokeRect(r.x, r.y, r.w, r.h);
                    ctx.restore();
                }
                // vet mau tren duong lao
                for (let v of this.veto){
                    ctx.save();
                    ctx.globalAlpha = 0.5 * (v.t / 26);
                    ctx.fillStyle = "#7F0F14";
                    ctx.beginPath(); ctx.ellipse(v.x, 316, 26, 6, 0, 0, 6.28); ctx.fill();
                    ctx.restore();
                }
                // mach mau
                for (let m of this.mau){
                    ctx.save();
                    if (m.no > 0){
                        let u = m.no / 26;
                        ctx.globalAlpha = 0.9 * u;
                        let g = ctx.createLinearGradient(0, 320 - 116, 0, 320);
                        g.addColorStop(0, "rgba(255,138,128,0)");
                        g.addColorStop(0.45, "rgba(183,28,28,0.92)");
                        g.addColorStop(1, "rgba(255,205,210,0.95)");
                        ctx.fillStyle = g;
                        let w = 52 * (0.6 + 0.4 * u);
                        ctx.fillRect(m.x - w/2, 320 - 116, w, 116);
                    } else {
                        let u = Math.max(0, Math.min(1, 1 - m.t / (m.tong || GAE_MAU_CHO)));
                        ctx.globalAlpha = 0.34 + 0.5 * u;
                        ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.ellipse(m.x, 316, 26 * (0.4 + 0.6 * u), 8, 0, 0, 6.28); ctx.stroke();
                        ctx.fillStyle = "rgba(183,28,28,0.35)";
                        ctx.beginPath(); ctx.ellipse(m.x, 316, 26 * (0.4 + 0.6 * u), 8, 0, 0, 6.28); ctx.fill();
                    }
                    ctx.restore();
                }
                // cot set
                for (let s of this.set){
                    ctx.save();
                    if (s.no > 0){
                        let u = s.no / 20;
                        ctx.globalAlpha = 0.92 * u;
                        let g = ctx.createLinearGradient(0, -CAM_TROI, 0, 320);
                        g.addColorStop(0, "rgba(255,255,255,0.95)");
                        g.addColorStop(0.35, "rgba(255,82,82,0.9)");
                        g.addColorStop(1, "rgba(183,28,28,0.75)");
                        ctx.fillStyle = g;
                        ctx.fillRect(s.x - GAE_SET_RONG * u, -CAM_TROI, GAE_SET_RONG * 2 * u, 320 + CAM_TROI);
                        ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 2.6; ctx.globalAlpha = u;
                        ctx.beginPath(); ctx.moveTo(s.x, -CAM_TROI);
                        for (let i = 1; i <= 8; i++)
                            ctx.lineTo(s.x + (i % 2 ? 11 : -11), -CAM_TROI + i * ((320 + CAM_TROI) / 8));
                        ctx.stroke();
                    } else {
                        /* Bao truoc ban dau la mot TAM DO phu kin chieu cao man hinh, nam
                           cot. Chup ra: nam tam do chiem gan het be ngang, ca man do quach,
                           khong con doc noi dau la boss dau la nen. Gio chi con VONG CHAM
                           DAT (thu nguoi choi thuc su can doc) cong mot soi doc rat mo de
                           biet set se giang tu tren xuong. */
                        let u = Math.max(0, Math.min(1, 1 - s.t / (s.tong || GAE_SET_CHO)));
                        ctx.globalAlpha = 0.40 + 0.55 * u;
                        ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.ellipse(s.x, 316, GAE_SET_RONG * (0.35 + 0.65 * u), 10, 0, 0, 6.28); ctx.stroke();
                        ctx.globalAlpha = 0.22 + 0.3 * u;
                        ctx.fillStyle = "rgba(255,23,68,0.55)";
                        ctx.beginPath(); ctx.ellipse(s.x, 316, GAE_SET_RONG * (0.35 + 0.65 * u), 10, 0, 0, 6.28); ctx.fill();
                        ctx.globalAlpha = 0.10 + 0.14 * u;
                        let gs2 = ctx.createLinearGradient(0, -CAM_TROI, 0, 320);
                        gs2.addColorStop(0, "rgba(255,23,68,0)");
                        gs2.addColorStop(1, "rgba(255,23,68,0.9)");
                        ctx.fillStyle = gs2;
                        ctx.fillRect(s.x - 5, -CAM_TROI, 10, 320 + CAM_TROI);
                    }
                    ctx.restore();
                }
                // vong xung
                if (this.vong){
                    let v = this.vong;
                    ctx.save();
                    ctx.globalAlpha = 0.62 * Math.max(0, 1 - v.r / v.max);
                    ctx.strokeStyle = this.stage >= 3 ? "#FF1744" : "#B71C1C"; ctx.lineWidth = 22;
                    ctx.beginPath(); ctx.ellipse(v.x, 316, v.r, v.r * 0.20, 0, Math.PI, 0); ctx.stroke();
                    ctx.globalAlpha = 0.92; ctx.strokeStyle = "#FFCDD2"; ctx.lineWidth = 2.4;
                    ctx.beginPath(); ctx.ellipse(v.x, 316, v.r, v.r * 0.20, 0, Math.PI, 0); ctx.stroke();
                    ctx.restore();
                }
                // BONG cua DON VONG (Echo Attack) — Vết Dư Ảnh Roi Áo Choàng Huyết Hồn
                if (this.echo){
                    let e = this.echo;
                    ctx.save();
                    let ex = e.dir < 0 ? e.x + e.w : e.x;
                    let ey = e.y + e.h * 0.55;
                    if (e.no > 0){
                        let u = e.no / 14;
                        ctx.globalAlpha = 0.88 * u;
                        let gEcho = ctx.createLinearGradient(e.x, e.y, e.x + e.w, e.y + e.h);
                        gEcho.addColorStop(0, "rgba(183, 28, 28, 0.25)");
                        gEcho.addColorStop(0.5, "rgba(229, 57, 53, 0.85)");
                        gEcho.addColorStop(1, "rgba(183, 28, 28, 0.25)");
                        ctx.fillStyle = gEcho;
                        ctx.beginPath();
                        ctx.moveTo(ex, ey - e.h * 0.45);
                        ctx.quadraticCurveTo(ex + e.dir * e.w * 0.85, ey - e.h * 0.55, ex + e.dir * e.w, ey + e.h * 0.35);
                        ctx.quadraticCurveTo(ex + e.dir * e.w * 0.45, ey + e.h * 0.48, ex, ey + e.h * 0.25);
                        ctx.closePath(); ctx.fill();
                        ctx.strokeStyle = "#FFCDD2"; ctx.lineWidth = 3.5 * u;
                        ctx.stroke();
                    } else {
                        let u = 1 - e.t / e.tong;
                        ctx.globalAlpha = 0.16 + 0.32 * u;
                        ctx.fillStyle = "#4A0E12";
                        ctx.beginPath();
                        ctx.moveTo(ex, ey - e.h * 0.42);
                        ctx.quadraticCurveTo(ex + e.dir * e.w * 0.8, ey - e.h * 0.5, ex + e.dir * e.w, ey + e.h * 0.35);
                        ctx.quadraticCurveTo(ex + e.dir * e.w * 0.4, ey + e.h * 0.45, ex, ey + e.h * 0.25);
                        ctx.closePath(); ctx.fill();
                        ctx.globalAlpha = 0.35 + 0.55 * u;
                        ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 2.2; ctx.setLineDash([8, 6]);
                        ctx.stroke(); ctx.setLineDash([]);
                    }
                    ctx.restore();
                }
                // DẢI ROI ÁO CHOÀNG QUẤT BỒI THEO KIẾM (WHIP-CAPE AFTERSHOCK RIBBON)
                // Thay vì vẽ một khung chữ nhật cứng nhắc, vẽ dải lụa roi huyết hồn uốn cong quất ra xa hơn lưỡi kiếm!
                for (let h of this.hop){
                    if (h.cho > 0) continue;
                    let u = h.t / h.tong;
                    ctx.save();
                    if (h.dir){
                        let ox = h.ox || (h.dir < 0 ? h.x + h.w : h.x);
                        let oy = h.oy || (h.y + h.h * 0.5);
                        let tx = h.dir < 0 ? h.x : h.x + h.w;
                        let ty = h.y + h.h * 0.38;
                        let mx = (ox + tx) * 0.5;
                        let my = oy - 36 * Math.sin(u * Math.PI);

                        let wg = ctx.createLinearGradient(ox, oy, tx, ty);
                        wg.addColorStop(0, "rgba(74, 14, 18, 0)");
                        wg.addColorStop(0.5, this.stage >= 2 ? "rgba(183, 28, 28, 0.72)" : "rgba(120, 48, 40, 0.68)");
                        wg.addColorStop(0.9, this.stage >= 2 ? "rgba(255, 82, 82, 0.90)" : "rgba(215, 204, 200, 0.85)");
                        wg.addColorStop(1, "rgba(255, 205, 210, 0)");

                        ctx.globalAlpha = 0.78 * u;
                        ctx.fillStyle = wg;
                        ctx.beginPath();
                        ctx.moveTo(ox, oy - 12);
                        ctx.quadraticCurveTo(mx, my - 18, tx, ty);
                        ctx.quadraticCurveTo(mx, my + 22, ox, oy + 16);
                        ctx.closePath();
                        ctx.fill();

                        // Sống roi sáng sắc lẹm
                        ctx.globalAlpha = 0.92 * u;
                        ctx.strokeStyle = this.stage >= 2 ? "#FF8A80" : "#EFEBE9";
                        ctx.lineWidth = 3.2 * u;
                        ctx.beginPath();
                        ctx.moveTo(ox, oy);
                        ctx.quadraticCurveTo(mx, my, tx, ty);
                        ctx.stroke();
                    } else {
                        ctx.globalAlpha = 0.26 * u;
                        ctx.fillStyle = "#7F1418"; ctx.fillRect(h.x, h.y, h.w, h.h);
                    }
                    ctx.restore();
                }
                // OAN HON
                for (let o of this.hon){
                    ctx.save();
                    let mo = (o.pha === 'ra') ? Math.min(1, o.t / 22)
                           : (o.pha === 'chui') ? Math.max(0, 1 - o.t / GAE_HON_CHUI) : 1;
                    ctx.globalAlpha = 0.85 * mo;
                    // duoi khoi keo phia sau
                    let gq = ctx.createRadialGradient(o.x, o.y, 2, o.x, o.y, 26);
                    gq.addColorStop(0, "rgba(255,205,210,0.85)");
                    gq.addColorStop(0.5, "rgba(183,28,28,0.65)");
                    gq.addColorStop(1, "rgba(120,20,24,0)");
                    ctx.fillStyle = gq;
                    ctx.beginPath(); ctx.ellipse(o.x, o.y, 22, 26, 0, 0, 6.28); ctx.fill();
                    // than: mot cai dau trum va hai giai vai rach bay nguoc
                    ctx.fillStyle = "rgba(30,8,10,0.92)";
                    ctx.beginPath();
                    ctx.moveTo(o.x, o.y - 15);
                    ctx.quadraticCurveTo(o.x + 11, o.y - 8, o.x + 8, o.y + 6);
                    ctx.quadraticCurveTo(o.x + 3, o.y + 16 + Math.sin(o.nhip) * 4, o.x, o.y + 10);
                    ctx.quadraticCurveTo(o.x - 3, o.y + 16 - Math.sin(o.nhip) * 4, o.x - 8, o.y + 6);
                    ctx.quadraticCurveTo(o.x - 11, o.y - 8, o.x, o.y - 15);
                    ctx.fill();
                    // hai dom mat
                    ctx.fillStyle = "#FF5252"; ctx.globalAlpha = mo;
                    ctx.fillRect(o.x - 5, o.y - 7, 3, 3); ctx.fillRect(o.x + 2, o.y - 7, 3, 3);
                    ctx.restore();
                }
                // BANH XE ANH SANG
                for (let c of this.cor){
                    let CY = c.y;
                    ctx.save();
                    // duoi anh sang keo lai phia sau
                    ctx.globalAlpha = 0.30;
                    let gd = ctx.createLinearGradient(c.x - c.vx * 11, CY, c.x, CY);
                    gd.addColorStop(0, "rgba(255,241,180,0)");
                    gd.addColorStop(1, "rgba(255,241,180,0.85)");
                    ctx.fillStyle = gd;
                    ctx.beginPath(); ctx.ellipse(c.x - c.vx * 5.5, CY, Math.abs(c.vx) * 6.5, 20, 0, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 1;
                    // quang toa
                    let gh = ctx.createRadialGradient(c.x, CY, 6, c.x, CY, 76);
                    gh.addColorStop(0, "rgba(255,248,225,0.55)");
                    gh.addColorStop(1, "rgba(255,193,7,0)");
                    ctx.fillStyle = gh;
                    ctx.beginPath(); ctx.arc(c.x, CY, 76, 0, 6.28); ctx.fill();
                    ctx.translate(c.x, CY);
                    ctx.rotate(c.goc);
                    let gq = ctx.createRadialGradient(0, 0, 4, 0, 0, 46);
                    gq.addColorStop(0, "rgba(255,255,255,0.98)");
                    gq.addColorStop(0.5, "rgba(255,241,180,0.88)");
                    gq.addColorStop(1, "rgba(255,193,7,0.10)");
                    ctx.fillStyle = gq;
                    ctx.beginPath(); ctx.arc(0, 0, 46, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "#FFFDE7"; ctx.lineWidth = 4.6; ctx.lineCap = 'round';
                    for (let k = 0; k < 8; k++){
                        let a = k * 0.785;
                        ctx.beginPath();
                        ctx.moveTo(Math.cos(a) * 9, Math.sin(a) * 9);
                        ctx.lineTo(Math.cos(a) * 40, Math.sin(a) * 40);
                        ctx.stroke();
                    }
                    ctx.strokeStyle = "rgba(255,235,59,0.95)"; ctx.lineWidth = 3.4;
                    ctx.beginPath(); ctx.arc(0, 0, 33, 0, 6.28); ctx.stroke();
                    ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.arc(0, 0, 45, 0, 6.28); ctx.stroke();
                    ctx.restore();
                }
                
                // bong tan du (truyen du goc xoay lon vong & roi ao choang)
                for (let g of this.ghosts){
                    ctx.save();
                    ctx.globalAlpha = 0.24 * (g.t / 14);
                    drawGaelBody({ facingLeft: g.left, armR: g.armR, stage: g.stage,
                                   flipAngle: g.flipAngle, capeWhip: g.capeWhip, capeAngle: g.capeAngle,
                                   w: g.w, h: g.h, walk: g.walk }, g.x, g.y);
                    ctx.restore();
                }
                if (this.an > 0){
                    /* Dang dich chuyen. Chup lan dau chi ra mot cuc nho xiu khong doc duoc;
                       gio la mot CON LOC AO CHOANG cao bang than nguoi, co canh vai xoay va
                       mot loi toi o giua — de nguoi choi biet ngay "han vua bien mat o day". */
                    let cx0 = this.cx(), cy0 = this.y + this.h * 0.52;
                    ctx.save();
                    let gl = ctx.createRadialGradient(cx0, cy0, 4, cx0, cy0, 56);
                    gl.addColorStop(0, "rgba(10,4,5,0.92)");
                    gl.addColorStop(0.55, "rgba(78,20,22,0.55)");
                    gl.addColorStop(1, "rgba(120,30,34,0)");
                    ctx.fillStyle = gl;
                    ctx.beginPath(); ctx.ellipse(cx0, cy0, 56, this.h * 0.72, 0, 0, 6.28); ctx.fill();
                    for (let k = 0; k < 6; k++){
                        let a = frames * 0.30 + k * 1.047;
                        let rr = 18 + (k % 3) * 13;
                        ctx.globalAlpha = 0.30 + 0.30 * Math.abs(Math.sin(a));
                        ctx.fillStyle = (k % 2) ? "#7F1418" : "#3A0D0F";
                        ctx.save();
                        ctx.translate(cx0 + Math.cos(a) * rr * 0.8, cy0 + Math.sin(a) * rr * 0.5);
                        ctx.rotate(a);
                        ctx.beginPath(); ctx.ellipse(0, 0, 26, 8, 0, 0, 6.28); ctx.fill();
                        ctx.restore();
                    }
                    ctx.globalAlpha = 0.85;
                    ctx.fillStyle = "#FF5252";
                    for (let k = 0; k < 3; k++){
                        let a = -frames * 0.26 + k * 2.09;
                        ctx.beginPath();
                        ctx.arc(cx0 + Math.cos(a) * 34, cy0 + Math.sin(a) * 20, 2.6, 0, 6.28); ctx.fill();
                    }
                    ctx.restore();
                } else drawGaelBody(this, this.x, this.y);
                // ten + bac
                ctx.save();
                ctx.textAlign = "center";
                ctx.font = "bold 10px Consolas, monospace";
                ctx.fillStyle = this.stage >= 3 ? "#FF8A80" : (this.stage === 2 ? "#EF9A9A" : "#D7CCC8");
                ctx.fillText(this.stage === 1 ? "SLAVE KNIGHT" : (this.stage === 2 ? "THE DARK SOUL" : "THE STORM"),
                             this.cx(), this.y - 16);
                ctx.textAlign = "left";
                ctx.restore();
                drawTopBossBar(this, this.stage >= 3 ? "#FF1744" : (this.stage === 2 ? "#E53935" : "#8D6E63"),
                               this.stage === 1 ? "SLAVE KNIGHT GAEL"
                                                : (this.stage === 2 ? "GAEL — MÁU CỦA HỒN TỐI"
                                                                    : "GAEL — BÃO CỦA HỒN TỐI"));
            }
        }
// BOSS_PART_END s0.GaelBoss.1

// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24489 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, IronhaulBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0.drawTopBossBar.1 READ_ONLY
function drawTopBossBar(b, col, label, sub, hang){
            /* Khong truyen `hang` (boss TU ve thanh mau) ma trong cung mot khung co hai con
               cung goi thi thanh thu hai phai TU xuong hang duoi, khong de len nhau. */
            if (_tbbKhung === frames) _tbbSo++; else { _tbbSo = 0; _tbbKhung = frames; }
            /* Tap phai co DAU KHUNG rieng. Neu chi xoa o day thi khung nao KHONG con nao tu ve
               thanh mau se khong xoa gi ca, va tap giu nguyen ten boss cua khung truoc — con
               boss thuong bi coi la "da co thanh roi" mai mai, thanh ra mat sach thanh mau. */
            if (_tbbDaVeKhung !== frames){ _tbbDaVe.clear(); _tbbDaVeKhung = frames; }
            _tbbDaVe.add(b);
            let W = 340, x0 = canvas.width/2 - W/2, H = sub ? 30 : 17;
            /* SAN TAP co mot hang nut chiem tron dai y = 10..46, ve thanh mau len do la bi
               che khuat. Chi trong san tap moi day thanh xuong duoi hang nut do. */
            let _dinh = (typeof dojoMode !== 'undefined' && dojoMode) ? 52 : 10;
            let Y = _dinh + ((hang === undefined ? _tbbSo : hang)) * 34;
            ctx.save();
            /* Thanh mau la HUD, phai nam yen o dinh man hinh. Truoc day no duoc ve BEN TRONG
               phep dich camera, ma camY khoi dau la -CAM_TROI (160) — nen thanh mau tut hn
               160px xuong giua khung hinh, va o cac map camera cuon doc (bien, tetris) no con
               truot theo camera. Tra ve dung toa do MAN HINH. */
            if (typeof DPR === 'number') ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            ctx.fillStyle = "rgba(0,0,0,0.74)"; ctx.fillRect(x0 - 4, Y, W + 8, H);
            ctx.strokeStyle = "rgba(255,255,255,0.20)"; ctx.lineWidth = 1; ctx.strokeRect(x0 - 4, Y, W + 8, H);
            ctx.fillStyle = "rgba(255,255,255,0.13)"; ctx.fillRect(x0, Y + 4, W, 10);
            ctx.fillStyle = col; ctx.fillRect(x0, Y + 4, W * Math.max(0, Math.min(1, b.hp / b.maxHp)), 10);
            if (sub){
                ctx.fillStyle = "rgba(255,255,255,0.13)"; ctx.fillRect(x0, Y + 17, W, 7);
                ctx.fillStyle = sub.col; ctx.fillRect(x0, Y + 17, W * Math.max(0, Math.min(1, sub.v)), 7);
                ctx.fillStyle = "#0A0C10"; ctx.font = "bold 8px Consolas, monospace"; ctx.textAlign = "left";
                ctx.fillText(sub.name, x0 + 4, Y + 23.5);
            }
            ctx.fillStyle = "white"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
            ctx.fillText(label + "   " + Math.max(0, Math.ceil(b.hp)) + " / " + b.maxHp, canvas.width/2, Y + H + 12);
            ctx.textAlign = "left"; ctx.restore();
        }
// BOSS_PART_END s0.drawTopBossBar.1

// Nguồn: index.html:100013 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s6.BOSS_CHUNG.1 READ_ONLY
const BOSS_CHUNG = {
            cx(){ return this.x + this.w / 2; },
            cy(){ return this.y + this.h / 2; },
            gap(){ return (dino.x + dino.w / 2) - this.cx(); },
            dir(){ return this.facingLeft ? -1 : 1; },
            faceP(){ this.facingLeft = (dino.x + dino.w / 2) < this.cx(); },
            hurtP(n){
                if (!dino.isShielding()) dino.takeDamage(n);
                else parry();
            }
        };
// BOSS_PART_END s6.BOSS_CHUNG.1

// Nguồn: index.html:100024 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s6.capBoHamChung.1 READ_ONLY
(function capBoHamChung(){
            const DS = [
            PteroBoss, QuetzalBoss, TRexBoss, TriceratopsBoss,
            SpinoBoss, GodzillaBoss, CloneBoss, LavaSerpentBoss,
            GreatSerpentBoss, StormEagleBoss, PoisonMothBoss, IndominusBoss,
            GiantSpiderBoss, ForestTitanBoss, UnityCloneBoss, VergilBoss,
            DanteBoss, NeroBoss, WarBoss, DeathBoss,
            ArtoriasBoss, HoGacBoss, ClawCloneBoss, FireCloneBoss, AegisRexBoss,
            SummitDragonBoss, ArcanaRexBoss, TetrisBoss, VoltCloneBoss,
            TriDino, MosaBoss, FlameCoreBoss, FlameLancerBoss,
            EmberWolfBoss, MagmaDragoonBoss, IaiRaptorBoss, SiegeGoliathBoss,
            EchoStalkerBoss, SporeCrownBoss, ScarabLordBoss, ChronoRexBoss, YasuoBoss, Yasuo2Boss, TyrantRexBoss,
            ZeroBoss, MegaManXBoss, GaelBoss, SoulOfCinderBoss, CorruptionBoss, OctopusBoss, PontiffBoss, SpinoLordBoss, TriceratopsLordBoss, PteroLordBoss, MegalodonBoss, ThalassaBoss,
            Effect, FloatingText,
            Projectile, BossProjectile, WindBlade, Obstacle,
            Heart, Pterodactyl, Raptor, ForestShooter,
            LavaDino, SummitBat, Player, TrainingDummy
            , DilophosBoss, MagmorBoss, PillarLordBoss, IceFangBoss, VajraRexBoss, FireDragonBoss, DragonLordBoss, SlashBeastBoss, StoneRocBoss, CliffGolemBoss, MountainGodBoss, GreatApeBoss, PulsarCloneBoss
            ];
            for (const C of DS){
                if (typeof C !== 'function') continue;
                for (const k of Object.keys(BOSS_CHUNG))
                    if (!Object.prototype.hasOwnProperty.call(C.prototype, k))
                        C.prototype[k] = BOSS_CHUNG[k];
            }
        })();
// BOSS_PART_END s6.capBoHamChung.1
