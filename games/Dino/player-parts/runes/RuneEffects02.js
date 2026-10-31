// PLAYER_FILE: RuneEffects02
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BIEN_CHANG, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DINHNUI_CHANG, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MUA_HOA_DMG, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Obstacle, OctopusBoss, PVP_CUI_NE, PVP_HS, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, R14, Raptor, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VOLCANO_CHANG, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss, ZeusBoss, baseSpeed, bienDonDep, bienSpawn, boidoiGiamMau, bossLevel, bossRushStage, bossWaitTimer, bosses, camReset, canvas, checkAABB, cloneGauntlet, cloneStages, currentAmmoType, cusNkPhim, dealDamage, defHurt, defMode, defUnits, dino, dino2, duelApDung, duelChon, duelMode, duelOver, duelTS, duelTSReset, duelTen, duelWinner, enemies, fireBrands, floatingTexts, forestBossQueue, forestQueueInit, forestSpawn, frames, gameSpeed, gameState, gameVictory, gauntletGate, hasRune, hearts, lavaGeysers, mapBuoc, mapChay, mapSangKeTiep, mapSoBoss, mapTheme, midasHado, midasHadoNo, nextBossScore, noPhanHach, normalBossStage, novaBlast, obstacles, offsetDoubleGroundBosses, platforms, prismDmg, projectiles, pulseSieuTrung, pvpDaNhan, pvpKeDanh, pvpNguoi1, pvpTinhDmg, pvpVoBoc, r14ChinhMau, routeDaHien, routeDangChay, routeMap, routeThangChang, score, selfTest, selfTestKQ, setupAbyssArena, setupApeArena, setupArtoriasArena, setupBeachArena, setupChronoArena, setupCinderArena, setupCoreArena, setupCorruptArena, setupDanteArena, setupDeathArena, setupDinhNuiArena, setupDragonLordArena, setupDragoonArena, setupDuelArena, setupDuneArena, setupEchoArena, setupEmberArena, setupFireDragonArena, setupForgeArena, setupGaelArena, setupGrassArena, setupHoGacArena, setupIceFangArena, setupLancerArena, setupLavaSerpentArena, setupMagmorArena, setupMegArena, setupNeroArena, setupOceanArena, setupPhongXaArena, setupPillarLordArena, setupPlateauArena, setupPontiffArena, setupSerpentArena, setupShrineArena, setupSlashBeastArena, setupSpiderArena, setupSporeArena, setupSummitBossRoom, setupSummitPeakArena, setupSwampArena, setupTetrisArena, setupUnityArena, setupVajraArena, setupVergilArena, setupVolcanoArena, setupWarArena, setupYasuoArena, setupZeroArena, sgCredit, spawnTimerCactus, spawnTimerEnemy, spawnTrio, summitApproach, summitSpawn, testBossSelection, visualEffects, volcanoApproach, volcanoSpawn, wildernessOn
// index.html:96283 · Phạm vi: global
// PLAYER_PART_BEGIN s6.defPlayerHits.1 EDITABLE
function defPlayerHits(){
            if (!defMode) return;
            for (let pi = projectiles.length - 1; pi >= 0; pi--){
                let pr = projectiles[pi]; if (!pr || pr.owner !== 1) continue;
                for (let v of defUnits){
                    if (v.ben !== 'e' || v.hp <= 0) continue;
                    if (!checkAABB(pr, v)) continue;
                    // Di qua DUNG duong sat thuong chung, khong tru mau thang nua — nho vay
                    // CHI MANG / NOVA / PHAN HACH moi hoat dong trong Defense.
                    let _d = (typeof prismDmg === 'function') ? prismDmg(pr, v) : (pr.dmg || 1);
                    if (typeof dealDamage === 'function') dealDamage(v, _d, 'ammo'); else v.hp -= _d;
                    v.flash = 8;
                    if (pr.type === 11) v.burnTimer = 120;
                    // @@HE-MIDAS-VE: chuong Hadoken cham la NO, sat thuong LAN quanh diem no.
                    if (pr.midasHado && typeof midasHadoNo === 'function') midasHadoNo(pr);
                    if (typeof hasRune === 'function' && hasRune('explshot') && typeof novaBlast === 'function'){
                        let _nr = (pr.type === 7 || pr.type === 8) ? 46 : 34;
                        novaBlast(pr.x + pr.w/2, pr.y + pr.h/2, _nr, 1, pr.hitIds, 0, 'explosion');
                    }
                    if (pr.fission && !pr._split && typeof noPhanHach === 'function') noPhanHach(pr);
                    if ((pr.pulseNo || pr._pulseSet) && typeof pulseSieuTrung === 'function') pulseSieuTrung(pr);   // @@HE-PULSE-ST
                    if (!pr.pierceCount) { projectiles.splice(pi, 1); }
                    else pr.pierceCount--;
                    break;
                }
            }
            // don can chien cua nguoi choi
            if (dino.slashAtk){
                let r = dino._slashRect();
                if (r) for (let v of defUnits){
                    if (v.ben !== 'e' || v.hp <= 0) continue;
                    if (dino.slashAtk.hit.has(v)) continue;
                    if (checkAABB(r, v)){ dino.slashAtk.hit.add(v); defHurt(v, dino.slashAtk.dmg || 2); }
                }
            }
            // quan dich cham vao nguoi choi
            for (let v of defUnits){
                if (v.ben !== 'e' || v.hp <= 0) continue;
                if (checkAABB(dino, v)){
                    if (dino.isShielding()) visualEffects.push(new Effect(dino.x, dino.y, 'parry'));
                    else dino.takeDamage(1);
                }
            }
        }
// PLAYER_PART_END s6.defPlayerHits.1

// index.html:96909 · Phạm vi: global
// PLAYER_PART_BEGIN s6.spawnEntities.1 EDITABLE
function spawnEntities() {
            if (wildernessOn()) return; // Static, authored world: no runner chunks or campaign boss queue.
            // @@HE-CUSNK — dang chay doan phim bom nguyen tu thi khong tha them gi vao man.
            if (typeof cusNkPhim !== 'undefined' && cusNkPhim) return;
            // LO TRINH: o che do test_boss, he thong tu hoi sinh boss khi bosses rong. Phai bat
            // khoanh khac boss chet NGAY TAI DAY, truoc khi con moi kip xuat hien.
            if (routeDangChay && gameState === 'test_boss'){
                // @@HE-ROUTE14: nguoi choi nga thi KHONG xoa run o day — con doan phim chet, con
                // rune Hoi Sinh va con MANG. Lo trinh chi ket luan khi Game Over that (r14SauTran).
                if (dino.hp <= 0){ if (!R14){ routeDangChay = false; routeDaHien = false; routeMap = null; } }
                else if (bosses.length > 0){ routeDaHien = true; if (R14) r14ChinhMau(); }
                else if (routeDaHien){ routeDaHien = false; routeThangChang(); return; }
            }
            if (bosses.length > 0) return; 
            
            if (gameState === 'test_boss') {
                if (bossWaitTimer > 0) { bossWaitTimer--; return; }
                if (testBossSelection === 0) bosses.push(new TRexBoss(1)); 
                else if (testBossSelection === 1) bosses.push(new PteroBoss(1)); 
                else if (testBossSelection === 2) bosses.push(new TriceratopsBoss(1)); 
                else if (testBossSelection === 3) bosses.push(new SpinoBoss(1)); 
                else if (testBossSelection === 74) bosses.push(new SpinoLordBoss(1));   // @@HE-SPL
                else if (testBossSelection === 75) bosses.push(new TriceratopsLordBoss(1));   // @@HE-TCL
                else if (testBossSelection === 76) bosses.push(new PteroLordBoss(1));   // @@HE-PTL
                else if (testBossSelection === 4) bosses.push(new GodzillaBoss(1)); 
                else if (testBossSelection === 5) bosses.push(new CloneBoss(1)); 
                
                else if (testBossSelection === 6) { let b1 = new TRexBoss(1); let b2 = new PteroBoss(1); offsetDoubleGroundBosses(b1,b2); boidoiGiamMau(b1,b2); bosses.push(b1,b2); }
                else if (testBossSelection === 7) { let b1 = new TRexBoss(1); let b2 = new TriceratopsBoss(1); offsetDoubleGroundBosses(b1,b2); boidoiGiamMau(b1,b2); bosses.push(b1,b2); }
                else if (testBossSelection === 8) { let b1 = new TRexBoss(1); let b2 = new SpinoBoss(1); offsetDoubleGroundBosses(b1,b2); boidoiGiamMau(b1,b2); bosses.push(b1,b2); }
                else if (testBossSelection === 9) { let b1 = new PteroBoss(1); let b2 = new TriceratopsBoss(1); offsetDoubleGroundBosses(b1,b2); boidoiGiamMau(b1,b2); bosses.push(b1,b2); }
                else if (testBossSelection === 10) { let b1 = new PteroBoss(1); let b2 = new SpinoBoss(1); offsetDoubleGroundBosses(b1,b2); boidoiGiamMau(b1,b2); bosses.push(b1,b2); }
                else if (testBossSelection === 11) { let b1 = new TriceratopsBoss(1); let b2 = new SpinoBoss(1); offsetDoubleGroundBosses(b1,b2); boidoiGiamMau(b1,b2); bosses.push(b1,b2); }
                /* @@HE-NENBOSS — LUU Y KHI THEM BOSS MOI:
                   Nen (background) cua arena phai ve theo `canvas.width` / `canvas.height`
                   cua MAN HINH HIEN TAI, khong duoc cam cung con so cu. Canvas da doi tu
                   1000x400 thanh 1000x560; nen nao con ke theo 400 se bi HUT MOT KHUC O TREN.
                   Cung ap dung cho thanh mau: moi boss TU goi `drawTopBossBar()` trong
                   `draw()` cua no — khong co dong do thi boss khong co thanh mau. */
                else if (testBossSelection === 67) { setupZeroArena(); bosses.push(new ZeroBoss(1)); }
                else if (testBossSelection === 77) { setupZeroArena(); bosses.push(new MegaManXBoss(1)); }   // @@HE-MMX
                else if (testBossSelection === 12) { bosses.push(new QuetzalBoss(1)); }
                // Cap doi co QUETZAL: con nay bay va khong kho, ghep doi rat hop
                else if (testBossSelection === 62) { let b1 = new QuetzalBoss(1); let b2 = new TriceratopsBoss(1); b1.x = canvas.width - 260; b2.x = canvas.width - 140; bosses.push(b1,b2); }
                else if (testBossSelection === 63) { let b1 = new QuetzalBoss(1); let b2 = new SpinoBoss(1);       b1.x = canvas.width - 260; b2.x = canvas.width - 140; bosses.push(b1,b2); }
                else if (testBossSelection === 13) { setupSwampArena(); bosses.push(new GreatSerpentBoss(1)); }
                else if (testBossSelection === 14) { setupSerpentArena(); bosses.push(new DilophosBoss(1)); }
                else if (testBossSelection === 15) { setupSerpentArena(); bosses.push(new StormEagleBoss(1)); }
                else if (testBossSelection === 16) { setupSerpentArena(); bosses.push(new PoisonMothBoss(1)); }
                else if (testBossSelection === 17) { setupGrassArena(); bosses.push(new IndominusBoss(1)); }
                else if (testBossSelection === 18) { setupSpiderArena(); bosses.push(new GiantSpiderBoss(1)); }
                else if (testBossSelection === 19) { setupSerpentArena(); bosses.push(new ForestTitanBoss(1)); }
                else if (testBossSelection === 20) { setupSerpentArena(); bosses.push(new ClawCloneBoss(1)); }
                else if (testBossSelection === 21) { setupVolcanoArena(); bosses.push(new FireCloneBoss(1)); }
                else if (testBossSelection === 22) { setupDinhNuiArena(); bosses.push(new AegisRexBoss(1)); }
                else if (testBossSelection === 23) { setupVolcanoArena(); bosses.push(new ArcanaRexBoss(1)); }
                else if (testBossSelection === 24) { setupLavaSerpentArena(); bosses.push(new LavaSerpentBoss(1)); }
                else if (testBossSelection === 25) { setupSummitBossRoom(); bosses.push(new SummitDragonBoss(1)); }
                else if (testBossSelection === 26) { setupMagmorArena(); bosses.push(new MagmorBoss(1)); }
                else if (testBossSelection === 27) { setupPillarLordArena(); bosses.push(new PillarLordBoss(1)); }
                else if (testBossSelection === 28) { setupIceFangArena(); bosses.push(new IceFangBoss(1)); }
                else if (testBossSelection === 29) { setupVajraArena(); bosses.push(new VajraRexBoss(1)); }
                else if (testBossSelection === 30) { setupFireDragonArena(); bosses.push(new FireDragonBoss(1)); }
                else if (testBossSelection === 31) { setupDragonLordArena(); bosses.push(new DragonLordBoss(1)); }
                else if (testBossSelection === 32) { setupSummitPeakArena(); bosses.push(new StoneRocBoss(1)); }
                else if (testBossSelection === 33) { setupSummitPeakArena(); bosses.push(new CliffGolemBoss(1)); }
                else if (testBossSelection === 34) { setupSummitPeakArena(); bosses.push(new MountainGodBoss(1)); }
                else if (testBossSelection === 66) { setupPhongXaArena(); bosses.push(new StormSerpentBoss(1)); }
                else if (testBossSelection === 59) { setupSlashBeastArena(); bosses.push(new SlashBeastBoss(1)); }
                else if (testBossSelection === 35) { setupApeArena(); bosses.push(new GreatApeBoss(1)); }
                else if (testBossSelection === 36) { setupTetrisArena(); bosses.push(new TetrisBoss(1)); }
                else if (testBossSelection === 37) { setupShrineArena(); bosses.push(new VoltCloneBoss(1)); }
                else if (testBossSelection === 38) { spawnTrio(); }
                else if (testBossSelection === 39) { setupOceanArena(); bosses.push(new MosaBoss(1)); }
                else if (testBossSelection === 40) { setupDragoonArena(); bosses.push(new MagmaDragoonBoss(1)); }
                else if (testBossSelection === 41) { setupPlateauArena(); bosses.push(new IaiRaptorBoss(1)); }
                else if (testBossSelection === 42) { setupForgeArena(); bosses.push(new SiegeGoliathBoss(1)); }
                else if (testBossSelection === 43) { setupDuneArena(); bosses.push(new ScarabLordBoss(1)); }
                else if (testBossSelection === 44) { setupChronoArena(); bosses.push(new ChronoRexBoss(1)); }
                else if (testBossSelection === 45) { setupEchoArena(); bosses.push(new EchoStalkerBoss(1)); }
                else if (testBossSelection === 46) { setupSporeArena(); bosses.push(new SporeCrownBoss(1)); }
                else if (testBossSelection === 47) { setupEmberArena(); bosses.push(new EmberWolfBoss(1)); }
                else if (testBossSelection === 48) { setupLancerArena(); bosses.push(new FlameLancerBoss(1)); }
                else if (testBossSelection === 49) { setupCoreArena(); bosses.push(new FlameCoreBoss(1)); }
                else if (testBossSelection === 50) { setupUnityArena(); bosses.push(new UnityCloneBoss(1)); }
                else if (testBossSelection === 51) { setupVergilArena(); bosses.push(new VergilBoss(1)); }
                else if (testBossSelection === 52) { setupDanteArena(); bosses.push(new DanteBoss(1)); }
                else if (testBossSelection === 60) { setupNeroArena(); bosses.push(new NeroBoss(1)); }
                else if (testBossSelection === 53) { setupWarArena(); bosses.push(new WarBoss(1)); }
                else if (testBossSelection === 54) { setupDeathArena(); bosses.push(new DeathBoss(1)); }
                else if (testBossSelection === 58) { bosses.push(new PulsarCloneBoss(1)); }
                else if (testBossSelection === 56) { setupArtoriasArena(); bosses.push(new ArtoriasBoss(1)); }
                else if (testBossSelection === 68) { setupGaelArena(); bosses.push(new GaelBoss(1)); }
                else if (testBossSelection === 69) { setupCinderArena(); bosses.push(new SoulOfCinderBoss(1)); }
                else if (testBossSelection === 70) { setupCorruptArena(); bosses.push(new CorruptionBoss(1)); }   // @@HE-COR
                else if (testBossSelection === 71) { setupReefArena(); bosses.push(new OctopusBoss(1)); }   // @@HE-BTUOC
                else if (testBossSelection === 72) { setupAbyssArena(); bosses.push(new HelicoprionBoss(1)); }   // @@HE-HELI
                else if (testBossSelection === 78) { setupMegArena(); bosses.push(new MegalodonBoss(1)); }   // @@HE-MEG
                else if (testBossSelection === 79) { setupBeachArena(); bosses.push(new ThalassaBoss(1)); }   // @@HE-CORALIE
                else if (testBossSelection === 73) { setupPontiffArena(); bosses.push(new PontiffBoss(1)); }    // @@HE-PONTIFF
                else if (testBossSelection === 82) { ZeusBoss.setupArena(); bosses.push(new ZeusBoss(1)); }
                else if (testBossSelection === 81) { IronhaulBoss.setupArena(); bosses.push(new IronhaulBoss(1)); }
                else if (testBossSelection === 80) { setupHoGacArena(); bosses.push(new HoGacBoss(1)); }       // @@HE-HOGAC
                // Chon tran dau ma CHUA qua bang chinh thong so -> mo bang chinh truoc.
                else if ((testBossSelection === 57 || testBossSelection === 55) && duelChon !== testBossSelection) {
                    duelChon = testBossSelection;
                    duelTen = (testBossSelection === 57) ? ['DANTE','VERGIL'] : ['WAR','DEATH'];
                    duelTSReset();
                    gameState = 'duel_tune';
                    return;
                }
                else if (testBossSelection === 57) {   // DAU TAY DOI: Dante vs Vergil
                    setupVergilArena();
                    duelMode = true; duelOver = 0; duelWinner = null;
                    let dt = new DanteBoss(1);  dt.x = 170; dt.facingLeft = false;
                    dt.state = 'idle'; dt.actionTimer = 60;
                    let vg = new VergilBoss(1); vg.x = canvas.width - 230; vg.facingLeft = true;
                    vg.state = 'idle'; vg.actionTimer = 60;
                    // Sau khi bo luat nhuong luot (xem cho goi bossDuelUpdate) thi hai ben
                    // gan nhu can san: Dante 360 dmg/phut, Vergil 272. Chi can ha nhe Dante.
                    // Do lai sau khi them TRAN MOI LAN TUNG CHIEU (don nhieu nhat bi phat nang hon):
                    //   0.86 -> 12-18   0.90 -> 21-9   0.94 -> 19-10   1.30 -> 23-1
                    // Chot 0.88, tran ~73 giay va ca hai deu kip vao Sin Devil Trigger.
                    // LUU Y: nhieu rat lon. Chenh 0.02 da lat tu 21-9 sang 11-18, tuc la
                    // hai mau do khong khac nhau that. Gop 0.88 + 0.90: 32-27 tren 59 tran.
                    dt.duelAtk = 0.89; dt.duelDef = 1.0;
                    vg.duelAtk = 1.00; vg.duelDef = 1.0;
                    duelApDung(dt, duelTS[0]); duelApDung(vg, duelTS[1]);
                    bosses.push(dt, vg);
                    duelChon = 0;
                }
                else if (testBossSelection === 55) {   // DAU TAY DOI: War vs Death
                    setupDuelArena();
                    let w1 = new WarBoss(1); w1.x = 150; w1.state = 'idle'; w1.actionTimer = 60;
                    // Cap so cu (2.1 / 0.42) duoc chinh de bu cho HAI LOI: dan tam xa vo hai
                    // va luat nhuong luot ghim doi thu o idle. Vá xong hai loi do thi cap cu
                    // thanh 12-0 nghieng War. Do lai tu dau, 30 tran moi cap:
                    // Do lai sau khi them TRAN MOI LAN TUNG CHIEU (War toan don nhieu nhat nen
                    // bi phat nang nhat): 1.90 -> 8-16   2.05 -> 18-12   2.18 -> 23-7.
                    // Chot 2.00, tran ~72 giay va ca hai deu kip chuyen dang.
                    // Gop 2 mau 30 tran o muc 2.00: 28-32. Dung coi day la con so chinh xac.
                    w1.duelAtk = 2.00; w1.duelDef = 1.0;
                    let d1 = new DeathBoss(1); d1.x = canvas.width - 220; d1.state = 'idle'; d1.actionTimer = 60;
                    d1.duelAtk = 0.65; d1.duelDef = 1.0;
                    duelMode = true; duelOver = 0; duelWinner = null;
                    duelApDung(w1, duelTS[0]); duelApDung(d1, duelTS[1]);
                    bosses.push(w1, d1);
                    duelChon = 0;
                }
                else if (testBossSelection === 61) { setupYasuoArena(); bosses.push(new YasuoBoss(1)); }
                else if (testBossSelection === 65) { setupYasuoArena(); bosses.push(new Yasuo2Boss(1)); }
                else if (testBossSelection === 64) { mapTheme='desert'; enemies.length=0; obstacles.length=0; platforms.length=0; platforms.push({x:-60,w:canvas.width+160,top:320,h:80}); camReset(); bosses.push(new TyrantRexBoss(1)); }
                else if (testBossSelection === 98) { selfTestKQ = selfTest(); gameState = 'selftest'; return; }   // TU KIEM
                else if (testBossSelection === 99) { mapTheme = 'desert'; platforms.length = 0; bosses.push(new TrainingDummy()); }   // SAN TAP
                return;
            }
            
            if (gameState === 'boss_rush') {
                if (bossWaitTimer > 0) { bossWaitTimer--; return; }
                if (mapTheme === 'forest') {
                    if (bossRushStage === 0) { setupSwampArena(); bosses.push(new GreatSerpentBoss(1)); }
                    else if (bossRushStage === 1) { setupSerpentArena(); bosses.push(new DilophosBoss(1)); }
                    else if (bossRushStage === 2) { setupSerpentArena(); bosses.push(new StormEagleBoss(1)); }
                    else if (bossRushStage === 3) { setupSerpentArena(); bosses.push(new PoisonMothBoss(1)); }
                    else if (bossRushStage === 4) { setupGrassArena(); bosses.push(new IndominusBoss(1)); }
                    else if (bossRushStage === 5) { setupSpiderArena(); bosses.push(new GiantSpiderBoss(1)); }
                    // Bac 6-7: 2 con CO CHE MOI (106/110 mau) — nang hon nhom 75 nhung nhe hon Ape/Titan
                    else if (bossRushStage === 6) { setupEchoArena(); bosses.push(new EchoStalkerBoss(1)); }
                    else if (bossRushStage === 7) { setupSporeArena(); bosses.push(new SporeCrownBoss(1)); }
                    else if (bossRushStage === 8) { setupApeArena(); bosses.push(new GreatApeBoss(1)); }
                    else if (bossRushStage === 9) { setupPlateauArena(); bosses.push(new IaiRaptorBoss(1)); }
                    else if (bossRushStage === 10) { setupSerpentArena(); bosses.push(new ForestTitanBoss(1)); }   // COLOSSAL = ke ket thuc khu Rung
                    // (da bo ClawCloneBoss — cac ban sao chi xuat hien o man Thu Thach Ban Sao)
                    else gameVictory = true;
                    return;
                }
                if (mapTheme === 'volcano') {
                    // (da bo FireCloneBoss — cac ban sao chi xuat hien o man Thu Thach Ban Sao)
                    if (bossRushStage === 0) { setupLavaSerpentArena(); bosses.push(new LavaSerpentBoss(1)); }
                    else if (bossRushStage === 1) { setupMagmorArena(); bosses.push(new MagmorBoss(1)); }
                    else if (bossRushStage === 2) { setupEmberArena(); bosses.push(new EmberWolfBoss(1)); }        // ACTION 1
                    else if (bossRushStage === 3) { setupPillarLordArena(); bosses.push(new PillarLordBoss(1)); }
                    else if (bossRushStage === 4) { setupLancerArena(); bosses.push(new FlameLancerBoss(1)); }     // ACTION 2
                    else if (bossRushStage === 5) { setupVolcanoArena(); bosses.push(new ArcanaRexBoss(1)); }
                    else if (bossRushStage === 6) { setupCoreArena(); bosses.push(new FlameCoreBoss(1)); }         // ACTION 3
                    else if (bossRushStage === 7) { setupFireDragonArena(); bosses.push(new FireDragonBoss(1)); }
                    else if (bossRushStage === 8) { setupDragoonArena(); bosses.push(new MagmaDragoonBoss(1)); }   // KE CUOI khu Dung Nham
                    else if (bossRushStage === 9) { setupDragonLordArena(); bosses.push(new DragonLordBoss(1)); }
                    else gameVictory = true;
                    return;
                }
                if (mapTheme === 'dinhnui') {
                    if (bossRushStage === 0) { setupSummitPeakArena(); bosses.push(new StoneRocBoss(1)); }
                    else if (bossRushStage === 1) { setupIceFangArena(); bosses.push(new IceFangBoss(1)); }
                    else if (bossRushStage === 2) { setupSummitBossRoom(); bosses.push(new SummitDragonBoss(1)); }
                    else if (bossRushStage === 3) { setupSummitPeakArena(); bosses.push(new CliffGolemBoss(1)); }
                    else if (bossRushStage === 4) { setupVajraArena(); bosses.push(new VajraRexBoss(1)); }
                    else if (bossRushStage === 5) { setupDinhNuiArena(); bosses.push(new AegisRexBoss(1)); }
                    else if (bossRushStage === 6) { setupDinhNuiArena(); bosses.push(new SlashBeastBoss(1)); }   // SLASH BEAST la boss cua DINH NUI
                    // Chang nay truoc day cung ghi `=== 6` — trung voi dong tren nen KHONG
                    // BAO GIO chay: Siege Goliath bien mat khoi Boss Rush. Danh lai so cho dung.
                    else if (bossRushStage === 7) { setupForgeArena(); bosses.push(new SiegeGoliathBoss(1)); }   // KE CUOI khu Dinh Nui
                    else if (bossRushStage === 8) { setupSummitPeakArena(); bosses.push(new MountainGodBoss(1)); }   // COLOSSAL
                    else gameVictory = true;
                    return;
                }
                if (bossRushStage === 0) bosses.push(new TRexBoss(1)); 
                else if (bossRushStage === 1) bosses.push(new PteroBoss(1)); 
                else if (bossRushStage === 2) bosses.push(new TriceratopsBoss(1)); 
                else if (bossRushStage === 3) bosses.push(new SpinoBoss(1)); 
                else if (bossRushStage === 4) { bosses.push(new TRexBoss(1), new PteroBoss(1)); bosses[1].actionTimer += 30; } 
                else if (bossRushStage === 5) { 
                    let b1 = new TRexBoss(1); let b2 = Math.random() > 0.5 ? new TriceratopsBoss(1) : new SpinoBoss(1); 
                    b2.actionTimer += 90; offsetDoubleGroundBosses(b1, b2); bosses.push(b1, b2); 
                }
                else if (bossRushStage === 6) { bosses.push(new PteroBoss(1), Math.random() > 0.5 ? new TriceratopsBoss(1) : new SpinoBoss(1)); bosses[1].actionTimer += 90; }
                else if (bossRushStage === 7) { 
                    let b1 = new TriceratopsBoss(1); let b2 = new SpinoBoss(1); 
                    b2.actionTimer += 90; offsetDoubleGroundBosses(b1, b2); bosses.push(b1, b2); 
                }
                else if (bossRushStage === 8) { bosses.push(new QuetzalBoss(1)); }
                else if (bossRushStage === 9) { setupDuneArena(); bosses.push(new ScarabLordBoss(1)); }   // ngay SAU Quetzal
                else if (bossRushStage === 10) { mapTheme = 'desert'; platforms.length = 0; bosses.push(new GodzillaBoss(1)); }
                // (da bo CloneBoss — cac ban sao chi xuat hien o man Thu Thach Ban Sao)
                else gameVictory = true;
            } else if (gameState === 'normal') {
                if (defMode) return;   // DEFENSE tu quan ly quan cua no: khong xuong rong, khong boss tu sinh
                if (cloneGauntlet) {
                    if (gauntletGate) {
                        for (let gi = platforms.length - 1; gi >= 0; gi--) { platforms[gi].x -= gameSpeed; if (platforms[gi].x + platforms[gi].w < -80) platforms.splice(gi, 1); }
                        gauntletGate.x -= gameSpeed;
                        if (gauntletGate.x <= dino.x + dino.w) { let st = cloneStages()[normalBossStage]; gauntletGate = null; hearts.length = 0; enemies.length = 0; obstacles.length = 0; if (st.terrain === 'volcano') setupVolcanoArena(); else if (st.terrain === 'forest') setupSerpentArena(); else if (st.terrain === 'dinhnui') setupDinhNuiArena();
                            /* Chang PULSAR CLONE truoc day roi vao nhanh `else` chung: bi dat
                               lai mapTheme='desert' va XOA SACH platforms — dung hai buc be
                               ma setupGauntletPrep vua dung rieng cho no. Nguoi choi buoc qua
                               cong la hai buc be bien mat, danh tren san phang. Dung lai dung
                               dia hinh cua chang nay. */
                            else if (st.terrain === 'pulsar') { mapTheme = 'pulsar'; platforms.length = 0; lavaGeysers.length = 0;
                                platforms.push({ x: -60, w: canvas.width + 160, top: 320, h: 80, pulsar: true });
                                platforms.push({ x: 120, w: 150, top: 225, h: 14, pulsar: true });
                                platforms.push({ x: 650, w: 150, top: 225, h: 14, pulsar: true }); }
                            else { mapTheme = 'desert'; platforms.length = 0; lavaGeysers.length = 0; } bosses.push(new st.ctor(bossLevel)); }
                        return;
                    }
                    if (score >= nextBossScore) {
                        enemies.length = 0; obstacles.length = 0; lavaGeysers.length = 0;
                        let st = cloneStages()[normalBossStage], base = canvas.width;
                        if (mapTheme === 'forest' || mapTheme === 'volcano' || mapTheme === 'dinhnui' || mapTheme === 'slashcave' || mapTheme === 'tetris') { let mr = 0; platforms.forEach(p => { if (p.x + p.w > mr) mr = p.x + p.w; }); base = Math.max(mr, canvas.width); platforms.push({ x: base, w: 620, top: (mapTheme === 'dinhnui' ? 305 : 320), h: 80, volcano: (mapTheme === 'volcano'), summit: (mapTheme === 'dinhnui') }); }
                        let bh = new Heart(); bh.big = true; bh.w = 34; bh.h = 34; bh.x = base + 180; bh.y = 258; hearts.push(bh);
                        gauntletGate = { x: base + 470, terrain: st.terrain, name: st.name, col: st.col };
                        return;
                    }
                    if (mapTheme === 'forest') { forestSpawn(); return; }
                    if (mapTheme === 'volcano') { volcanoSpawn(); return; }
                    if (mapTheme === 'dinhnui') { summitSpawn(); return; }
                }
                if (score >= nextBossScore) {
                    // @@HE-BIEN: Khu Bien — Mosasaurus roi Bach Tuoc, moi con dung dau truong cua no
                    if (mapTheme === 'ocean' && mapChay === 'ocean'){
                        let _bq = BIEN_CHANG[Math.min(mapBuoc(), BIEN_CHANG.length - 1)];
                        bienDonDep(); _bq.san(); let _L = _bq.lop(); bosses.push(new _L(bossLevel)); return;
                    }
                    // Het boss cua map nay thi SANG MAP KE truoc khi chon boss
                    if (mapBuoc() >= mapSoBoss()) mapSangKeTiep();
                    if (mapTheme === 'volcano') {
                        if (!volcanoApproach) { enemies.length = 0; obstacles.length = 0; hearts.length = 0; lavaGeysers.length = 0; platforms.length = 0; platforms.push({ x: -60, w: 1620, top: 320, h: 80, volcano: true }); volcanoApproach = { markerX: 1500 }; return; }
                        for (let _i = platforms.length - 1; _i >= 0; _i--) { platforms[_i].x -= gameSpeed; if (platforms[_i].x + platforms[_i].w < -80) platforms.splice(_i, 1); }
                        volcanoApproach.markerX -= gameSpeed;
                        if (volcanoApproach.markerX <= dino.x + dino.w) { volcanoApproach = null;
                            /* Truoc day cho nay chi co HAI con: chang 0 la Hoa Xa, moi chang
                               sau deu la Arcana Rex — danh mai mot con. Tam boss con lai cua
                               khu Dung Nham da dung xong tu lau (Magmor, Hoa Lang, Thach Tru
                               Rex, Diem Thuong, Hoa Tam, Hoa Long, Magma Dragoon, Hac Long
                               Vuong) nhung khong bao gio ra mat o che do chay. Gio noi du,
                               giu dung thu tu do kho. */
                            let _vq = VOLCANO_CHANG[Math.min(mapBuoc(), VOLCANO_CHANG.length - 1)];
                            _vq.san(); bosses.push(new _vq.lop(bossLevel)); }
                        return;
                    }
                    if (mapTheme === 'dinhnui') {
                        if (!summitApproach) { enemies.length = 0; obstacles.length = 0; hearts.length = 0; lavaGeysers.length = 0; platforms.length = 0; platforms.push({ x: -60, w: 1620, top: 320, h: 80, summit: true }); summitApproach = { markerX: 1500 }; return; }
                        for (let _i = platforms.length - 1; _i >= 0; _i--) { platforms[_i].x -= gameSpeed; if (platforms[_i].x + platforms[_i].w < -80) platforms.splice(_i, 1); }
                        summitApproach.markerX -= gameSpeed;
                        if (summitApproach.markerX <= dino.x + dino.w) { summitApproach = null;
                            /* Truoc day la `mapBuoc() % 6` — sau con thu 6 la QUAY VONG danh
                               lai tu Thach Ung, va ba con Aegis Rex / Slash Beast / Siege
                               Goliath (deu la boss cua khu nay) khong bao gio ra. Gio di het
                               chin chang roi sang map ke tiep, khong lap lai. */
                            let _sq = DINHNUI_CHANG[Math.min(mapBuoc(), DINHNUI_CHANG.length - 1)];
                            _sq.san(); bosses.push(new _sq.lop(bossLevel)); }
                        return;
                    }
                    if (mapTheme === 'forest') {
                        setupSerpentArena();
                        if (!forestQueueInit) {
                            // Truoc day day la mot cu XAO TRON TOAN BO 9 con: Great Ape (130 mau),
                            // Spore Crown (110) hay Echo Stalker (106) hoan toan co the roi vao
                            // tran DAU TIEN o bossLevel 1, ngay canh Dilophos (75 mau). Khong he
                            // co thu tu do kho nao ca — dung nhu nguoi choi thay.
                            // Gio chia BA BAC va chi xao tron TRONG tung bac, giu nguyen thu tu
                            // giua cac bac. Van ngau nhien de moi lan choi mot khac, nhung khong
                            // bao gio nem con nang nhat vao mat nguoi choi ngay tu dau.
                            const tron = (a) => { for (let i = a.length - 1; i > 0; i--) { let j = Math.floor(Math.random() * (i + 1)); let t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
                            let bac1 = tron([DilophosBoss, StormEagleBoss, PoisonMothBoss]);           // 75 mau, nho, don gian
                            let bac2 = tron([GreatSerpentBoss, GiantSpiderBoss, IndominusBoss]);       // 75 mau nhung chieu kho hon
                            let bac3 = tron([EchoStalkerBoss, SporeCrownBoss, GreatApeBoss]);          // 106 / 110 / 130 mau
                            forestBossQueue = bac1.concat(bac2, bac3);
                            forestBossQueue.push(ForestTitanBoss);                                     // 250 mau — tran ket
                            forestQueueInit = true;
                        }
                        let FB = forestBossQueue.shift() || ForestTitanBoss;
                        if (FB === GreatApeBoss) setupApeArena();
                        else if (FB === GiantSpiderBoss) setupSpiderArena();
                        else if (FB === IndominusBoss) setupGrassArena();
                        else if (FB === GreatSerpentBoss) setupSwampArena();
                        else if (FB === EchoStalkerBoss) setupEchoArena();
                        else if (FB === SporeCrownBoss) setupSporeArena();
                        bosses.push(new FB(bossLevel)); return;
                    }
                    let nextB = bossLevel;
                    if (mapBuoc() === 0) { bosses.push(new TRexBoss(nextB)); } 
                    else if (mapBuoc() === 1) { bosses.push(new PteroBoss(nextB)); } 
                    else if (mapBuoc() === 2) { bosses.push(new TriceratopsBoss(nextB)); } 
                    else if (mapBuoc() === 3) { bosses.push(new SpinoBoss(nextB)); } 
                    else if (mapBuoc() === 4) { let b1 = new TRexBoss(nextB); let b2 = new PteroBoss(nextB); b2.actionTimer += 60; offsetDoubleGroundBosses(b1, b2); bosses.push(b1, b2); } 
                    else if (mapBuoc() === 5) { let b1 = new TRexBoss(nextB); let b2 = new TriceratopsBoss(nextB); b2.actionTimer += 90; offsetDoubleGroundBosses(b1, b2); bosses.push(b1, b2); } 
                    else if (mapBuoc() === 6) { let b1 = new TriceratopsBoss(nextB); let b2 = new PteroBoss(nextB); b2.actionTimer += 60; offsetDoubleGroundBosses(b1, b2); bosses.push(b1, b2); } 
                    else if (mapBuoc() === 7) { let b1 = new TRexBoss(nextB); let b2 = new SpinoBoss(nextB); b2.actionTimer += 90; offsetDoubleGroundBosses(b1, b2); bosses.push(b1, b2); } 
                    else if (mapBuoc() === 8) { let b1 = new PteroBoss(nextB); let b2 = new SpinoBoss(nextB); b2.actionTimer += 60; offsetDoubleGroundBosses(b1, b2); bosses.push(b1, b2); } 
                    else if (mapBuoc() === 9) { let b1 = new SpinoBoss(nextB); let b2 = new TriceratopsBoss(nextB); b2.actionTimer += 90; offsetDoubleGroundBosses(b1, b2); bosses.push(b1, b2); } 
                    else { bosses.push(new GodzillaBoss(nextB)); }   // chang 10 = ke ket sa mac
                    /* Da bo chang 11: no goi ForestTitanBoss (ke ket khu RUNG) ngay giua sa
                       mac. Het sa mac gio la sang han map RUNG. */
                    return; 
                }
                
                if (mapTheme === 'forest') { forestSpawn(); return; }
                if (mapTheme === 'volcano') { volcanoSpawn(); return; }
                if (mapTheme === 'dinhnui') { summitSpawn(); return; }
                if (mapTheme === 'ocean' && mapChay === 'ocean') { bienSpawn(); return; }   // @@HE-BIEN

                let speedRatio = gameSpeed / baseSpeed; 
                let maxCactusSpeedRatio = Math.min(speedRatio, 1.5); 
                
                if (spawnTimerCactus <= 0) {
                    let clusterType = Math.random();
                    if (clusterType < 0.6) {
                        obstacles.push(new Obstacle());
                    } else {
                        obstacles.push(new Obstacle());
                        let secondObs = new Obstacle();
                        secondObs.x += 45; 
                        obstacles.push(secondObs);
                    }
                    
                    if (enemies.length === 0) {
                        spawnTimerCactus = 40 * maxCactusSpeedRatio; 
                    } else {
                        spawnTimerCactus = (Math.random() * 80 + 60) * maxCactusSpeedRatio;
                    }
                } else { spawnTimerCactus--; }

                if (spawnTimerEnemy <= 0) {
                    let isLightning = (currentAmmoType === 4);
                    let isChargingLong = (dino.aKeyHeldTime >= 75); 
                    
                    let cooldownBase = Math.random() * 100 + 100; 
                    if (isChargingLong && enemies.length === 0) cooldownBase = cooldownBase / 3; 
                    if (isLightning) cooldownBase = cooldownBase / 1.4; 
                    
                    spawnTimerEnemy = cooldownBase * speedRatio;

                    let formationPattern = Math.floor(Math.random() * 5);
                    
                    if (formationPattern === 0) {
                        let count = Math.random() < 0.5 ? 2 : 3;
                        for (let i = 0; i < count; i++) {
                            let r = new Raptor(); r.x += i * 80;
                            enemies.push(r);
                        }
                    } 
                    else if (formationPattern === 1) {
                        let p1 = new Pterodactyl('normal'); p1.y = 265; 
                        let r1 = new Raptor(); r1.x += 80; 
                        enemies.push(p1, r1);
                        spawnTimerEnemy = spawnTimerEnemy * 0.7;
                    }
                    else if (formationPattern === 2) {
                        let pLow = new Pterodactyl('normal'); pLow.y = 265;  
                        let pHigh = new Pterodactyl('normal'); pHigh.y = 190; 
                        enemies.push(pLow, pHigh);
                        spawnTimerEnemy = spawnTimerEnemy * 0.5;
                    }
                    else if (formationPattern === 3) {
                        let isRed = hasRune('redbird') && Math.random() < 0.20;
                        let pSingle = new Pterodactyl(isRed ? 'red' : 'normal');
                        pSingle.y = Math.random() < 0.5 ? 265 : 190; 
                        enemies.push(pSingle);
                        spawnTimerEnemy = spawnTimerEnemy * 0.4; 
                    }
                    else if (formationPattern === 4) {
                        let isYellow = Math.random() < 0.20;
                        let pHigh1 = new Pterodactyl(isYellow ? 'yellow' : 'normal'); pHigh1.y = 190;
                        let pHigh2 = new Pterodactyl('normal'); pHigh2.y = 190; pHigh2.x += 35; 
                        let rBack = new Raptor(); rBack.x += 100; 
                        enemies.push(pHigh1, pHigh2, rBack);
                    }

                } else { spawnTimerEnemy--; }

                if (frames % 450 === 0 && Math.random() > 0.4) hearts.push(new Heart()); 
            }
        }
// PLAYER_PART_END s6.spawnEntities.1

// index.html:97324 · Phạm vi: global
// PLAYER_PART_BEGIN s6.checkPvPCollisions.1 EDITABLE
function checkPvPCollisions() {
            let players = [dino, dino2];
            players.forEach(target => {
                let isShieldActive = target.isShielding();
                let sScale = target.getFormScale();
                // Tính toán chính xác vị trí cái Khiên đang dựng
                let sX = target.isFacingLeft ? target.x - 15*sScale : target.x + (target.isCrouching ? 48*sScale : 42*sScale);
                let sY = target.y - 15;
                let shieldHitbox = {x: sX, y: sY, w: 15, h: 75 * sScale};

                for (let p = projectiles.length - 1; p >= 0; p--) {
                    let proj = projectiles[p];
                    if (proj.owner === target.id) continue;

                    let isPiercing = proj.type === 2 || proj.pierceCount > 0;
                    
                    // XÉT VA CHẠM: Nếu trúng Khiên VÀ đạn không có hiệu ứng xuyên phá -> Chặn đạn
                    if (isShieldActive && checkAABB(proj, shieldHitbox) && !isPiercing) {
                        visualEffects.push(new Effect(sX, proj.y, 'parry'));
                        projectiles.splice(p, 1);
                    } 
                    // Nếu đạn xuyên phá HOẶC chạm thẳng vào cơ thể -> Mất máu
                    // CUI DUNG NHIP. Cui va giu mai thi khong duoc gi — chi cui trong vong
                    // PVP_CUI_NE khung truoc khi vien dan toi noi moi an. Bien cai nut cui tu
                    // mot thu spam duoc thanh mot don doc nhip: bam sat qua thi mat, bam som
                    // qua cung mat. Dan BAY XUYEN QUA chu khong bi pha — nen no van con bay
                    // tiep va van co the trung nguoi phia sau.
                    else if (target.isCrouching && (frames - (target._cuiTu || -999)) < PVP_CUI_NE
                             && checkAABB(proj, target)) {
                        if (!proj._neCui){
                            proj._neCui = 1;
                            floatingTexts.push(new FloatingText(target.x - 14, target.y - 24, "NÉ!"));
                            visualEffects.push(new Effect(target.x + target.w/2, target.y + target.h/2, 'parry', false));
                        }
                        continue;
                    }
                    else if (checkAABB(proj, target)) {
                        // Truoc day cho nay chi lam mot viec: `takeDamage(proj.dmg)`.
                        // Con duong danh quai thi khong the — no goi prismDmg(), la cai
                        // cua duy nhat cong don tang Cryo, danh dau Prism/Whisper, dot
                        // chay Inferno... Bo qua no dong nghia MOI noi tai cua MOI loai
                        // dan deu bi vut o PvP, chi con lai con so sat thuong tran.
                        let vo = pvpVoBoc(target);
                        // KHOI GAI bung nho mot vong kich hoat rong 40px quanh vien dan.
                        // Dung sat mat nhau thi qua cau cham than doi thu TRUOC khi kip
                        // di het 40px do, nen no khong bao gio bung: do duoc o cu ly 60px
                        // la 0 lan no va 3 dmg, trong khi tu 120px tro ra la 6 dmg. Ket qua
                        // la chieu charge dat nhat cua Cryo thanh vo dung o dung cai cu ly
                        // ma nguoi ta hay danh nhau. Cho no bung luon khi cham than.
                        if (proj.cryoGai && !proj._daNo){
                            proj._daNo = 1;
                            let _b = (proj.owner === 2 ? dino2 : dino);
                            if (_b && _b.cryoNoGai) _b.cryoNoGai(proj.x + proj.w/2, proj.y + proj.h/2);
                            proj.w = Math.round(proj.w * 0.62); proj.h = Math.round(proj.h * 0.62);
                        }
                        if (proj.hitIds && proj.hitIds.has(vo)) continue;
                        let d = (typeof prismDmg === 'function') ? prismDmg(proj, vo) : proj.dmg;
                        // Cau Mua Hoa dam TRUC TIEP vao nguoi: truoc day no chi la mot vien
                        // dan thuong, dmg 2 nhan he so 0.39 = 1 roi bien mat. Cho no bang
                        // dung don no duoi dat.
                        if (proj.mortar) d = MUA_HOA_DMG;
                        if (proj.hitIds) proj.hitIds.add(vo);
                        // Dan da bay ra roi thi nguoi ban co the khong con la `dino` nua,
                        // nen lay he so theo CHU cua vien dan chu khong theo ai dang chay.
                        let _ban = (proj.owner === 2 ? dino2 : pvpNguoi1());
                        pvpKeDanh = _ban;                       // ghi ro ai la chu cu ban nay
                        
                        const _sgBeforePvp = proj.sg ? Math.max(0, vo.hp) : 0;
                        if (d > 0){
                            pvpDaNhan = true;          // gia tri duoi day DA nhan he so roi
                            try { vo.hp -= pvpTinhDmg(d, proj.mortar ? 1 : (PVP_HS[_ban ? _ban.ammoType : 0] || 1)); }
                            finally { pvpDaNhan = false; }
                        }
                        if (proj.sg && typeof sgCredit === 'function') sgCredit(proj.sgOwner, 'pistol', Math.max(0, _sgBeforePvp - Math.max(0, vo.hp)));
                        if (proj.type === 11) vo.burnTimer = 120;      // INFERNO: chay tiep
                        /* PHAN HACH — TACH KHI CHAM.
                           `noPhanHach()` chi duoc goi o duong va cham voi QUAI. Ham nay la
                           duong rieng cua PvP nen chua bao gio goi no: qua cau phan hach bay
                           toi, cham nguoi choi, gay 2 sat thuong roi bien mat — khong no,
                           khong vo thanh manh nao. Do la ly do doi khang thay Pulse nap day
                           van yeu hon nap vua. Cac he khac di theo cung mot cua nay: Nova
                           cua rune, va chay cua Inferno. */
                        // HOA AN cua Inferno: khoi cam dau nam trong checkCollisions (duong
                        // danh quai). Duong PvP nay chua bao gio chay no, nen o doi khang
                        // moc K 2 giay cua Inferno ban ra mot qua cau roi... het. Khong dau,
                        // khong dem nguoc, khong vu no: do duoc dung 0 sat thuong o ca ba
                        // khoang cach. Ghi luon ca CHU cua dau de con biet no phai no vao ai.
                        if (proj.brand && !proj._branded && typeof fireBrands !== 'undefined'){
                            proj._branded = true;
                            let _bx = proj.x + proj.w/2, _by = proj.y + proj.h/2;
                            fireBrands.push({ tgt: (vo && vo.__goc) ? vo.__goc : target,
                                              chu: _ban, x: _bx, y: _by, t: 0, oc: proj.oc || 0 });
                            while (fireBrands.length > 2) fireBrands.shift();
                            visualEffects.push(new Effect(_bx, _by, 'explosion', true, 22));
                        }
                        if (proj.fission && !proj._split && typeof noPhanHach === 'function')
                            noPhanHach(proj);
                        if ((proj.pulseNo || proj._pulseSet) && typeof pulseSieuTrung === 'function') pulseSieuTrung(proj);   // @@HE-PULSE-ST
                        // @@HE-MIDAS-VE: chuong Hadoken cham la NO, sat thuong LAN quanh diem no.
                        if (proj.midasHado && typeof midasHadoNo === 'function') midasHadoNo(proj);
                        if (typeof hasRune === 'function' && hasRune('explshot') && typeof novaBlast === 'function'){
                            let _nr = (proj.type === 7 || proj.type === 8) ? 46 : 34;
                            novaBlast(proj.x + proj.w/2, proj.y + proj.h/2, _nr, 1, proj.hitIds, 0, 'explosion');
                        }
                        /* @@HE-P2KHOA — truoc day pvpKeDanh bi xoa NGAY sau cu trung, nen moi thu no tiep theo (loi phan
                           hach cua Pulse, vung set, Hadoken) tinh nhu cua `dino` = P1: he so vu khi cua P1 va NAP ULT CHO P1
                           ke ca khi dan la cua P2. Giu chu vien dan toi het phan hau qua. */
                        pvpKeDanh = null;
                        if (!isPiercing) projectiles.splice(p, 1);
                        else proj.pierceCount--; // Bị cản lại 1 nhịp xuyên
                    }
                }
            });
        }
// PLAYER_PART_END s6.checkPvPCollisions.1
