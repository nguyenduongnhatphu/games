// BOSS_FILE: SoulOfCinderBoss
// BOSS_SNAPSHOT: 3cf4652cd737d36361a15b25712b9a3ff21a9a13bbe8337913bcf233f06c6a1d
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, CAM_TROI, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, aaHeSo, aaUp, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, shakeTimer, visualEffects
// Nguồn: index.html:17772 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_W.1 EDITABLE
const SOC_W  = 48, SOC_H  = 80;
// BOSS_PART_END s0.SOC_W.1

// Nguồn: index.html:17773 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_W2.1 READ_ONLY
const SOC_W2 = 54, SOC_H2 = 92;
// BOSS_PART_END s0.SOC_W2.1

// Nguồn: index.html:17774 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_TEMPO.1 EDITABLE
const SOC_TEMPO = 1.15;
// BOSS_PART_END s0.SOC_TEMPO.1

// Nguồn: index.html:17779 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_HP.1 READ_ONLY
const SOC_HP = [0, 150, 125];
// BOSS_PART_END s0.SOC_HP.1

// Nguồn: index.html:17780 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_DOI_CHU.1 READ_ONLY
const SOC_DOI_CHU = 34;
// BOSS_PART_END s0.SOC_DOI_CHU.1

// Nguồn: index.html:17781 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_DOI_NHIP.1 EDITABLE
const SOC_DOI_NHIP = 760;
// BOSS_PART_END s0.SOC_DOI_NHIP.1

// Nguồn: index.html:17782 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_DOI_MAU.1 EDITABLE
const SOC_DOI_MAU = 0.17;
// BOSS_PART_END s0.SOC_DOI_MAU.1

// Nguồn: index.html:17786 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_TU.1 READ_ONLY
const SOC_TU = ['thang', 'cong', 'bua', 'phep'];
// BOSS_PART_END s0.SOC_TU.1

// Nguồn: index.html:17787 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_TU_TEN.1 EDITABLE
const SOC_TU_TEN = { thang: 'KIẾM THẲNG', cong: 'KIẾM CONG · HOẢ THUẬT',
                             bua: 'ĐẠI BÚA', phep: 'GẬY PHÉP' };
// BOSS_PART_END s0.SOC_TU_TEN.1

// Nguồn: index.html:17791 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_NHIP.1 READ_ONLY
const SOC_NHIP = { thang: 1.16, cong: 1.32, bua: 0.86, phep: 1.00 };
// BOSS_PART_END s0.SOC_NHIP.1

// Nguồn: index.html:17794 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_CULY.1 READ_ONLY
const SOC_CULY = { thang: 96, cong: 78, bua: 150, phep: 300 };
// BOSS_PART_END s0.SOC_CULY.1

// Nguồn: index.html:17806 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_DOI_LAU.1 EDITABLE
const SOC_DOI_LAU = { thang: 1, cong: 1, bua: 1.05, phep: 0.95 };
// BOSS_PART_END s0.SOC_DOI_LAU.1

// Nguồn: index.html:17807 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_MAU.1 EDITABLE
const SOC_MAU  = { thang: '#FFCC80', cong: '#FF7043', bua: '#90A4AE', phep: '#4FC3F7' };
// BOSS_PART_END s0.SOC_MAU.1

// Nguồn: index.html:17809 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_BO.1 READ_ONLY
const SOC_BO = {
            thang: ['s_ba', 's_luotdam', 's_trang', 's_song'],
            cong:  ['c_bal', 'c_mua', 'c_cau', 'c_xoay'],
            bua:   ['b_nem', 'b_lon', 'b_ngang', 'b_dia'],
            phep:  ['p_laser', 'p_kiem', 'p_bom', 'p_dich']
        };
// BOSS_PART_END s0.SOC_BO.1

// Nguồn: index.html:17816 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_BO2.1 READ_ONLY
const SOC_BO2 = ['w_chuoi5', 'w_lao', 'w_vong', 'w_luot',
                         'w_set3', 'w_muaset', 'w_giangset', 'w_dap', 'w_bat', 'w_kydi'];
// BOSS_PART_END s0.SOC_BO2.1

// Nguồn: index.html:17818 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_BO2T.1 READ_ONLY
const SOC_BO2T = ['w_ptTren', 'w_ptNgang'];
// BOSS_PART_END s0.SOC_BO2T.1

// Nguồn: index.html:17820 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_CD.1 EDITABLE
const SOC_CD = {
            s_ba:74,   s_luotdam:120, s_trang:130, s_song:104,
            c_bal:96,  c_mua:140,  c_cau:100,  c_xoay:96,
            b_nem:210, b_lon:120,  b_ngang:130, b_dia:120,
            p_laser:150, p_kiem:130, p_bom:96, p_dich:110,
            w_chuoi5:150, w_lao:88, w_vong:104, w_luot:80,
            w_set3:130, w_muaset:140, w_giangset:150, w_dap:110, w_bat:150, w_kydi:150,
            w_ptTren:170, w_ptNgang:150
        };
// BOSS_PART_END s0.SOC_CD.1

// Nguồn: index.html:17833 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_NOI.1 EDITABLE
const SOC_NOI = {
            // --- KIEM THANG ---
            s_ba:      { p: 0.72, ds: ['s_luotdam','s_song'] },
            s_luotdam: { p: 0.55, ds: ['s_ba','s_trang'] },
            s_trang:   { p: 0.70, ds: ['s_luotdam','s_ba'] },   // ban tu xa roi LAO VAO
            s_song:    { p: 0.60, ds: ['s_ba','s_luotdam'] },
            // --- KIEM CONG: thien ve LAO LAI CAN CHIEN, nen chuoi nao cung ket bang don ap sat ---
            c_bal:     { p: 0.80, ds: ['c_xoay','c_cau'] },
            c_mua:     { p: 0.95, ds: ['c_bal','c_xoay'] },     // mua lua xong la lao vao ngay
            c_cau:     { p: 0.85, ds: ['c_bal','c_xoay'] },
            c_xoay:    { p: 0.80, ds: ['c_bal','c_mua'] },
            // --- DAI BUA ---
            b_nem:     { p: 0.45, ds: ['b_lon'] },
            b_lon:     { p: 0.50, ds: ['b_ngang','b_dia'] },
            b_ngang:   { p: 0.45, ds: ['b_lon'] },
            b_dia:     { p: 0.40, ds: ['b_ngang'] },
            // --- GAY PHEP ---
            p_laser:   { p: 0.60, ds: ['p_dich','p_bom'] },
            p_kiem:    { p: 0.70, ds: ['p_dich','p_bom'] },
            p_bom:     { p: 0.80, ds: ['p_dich','p_kiem','p_laser'] },
            p_dich:    { p: 0.90, ds: ['p_laser','p_kiem','p_bom'] },
            // --- pha 2: GWYN ---
            /* Bang noi cua Gwyn co mot quy tac rieng: chieu nao DE LAI thu gi tren san (kiem khi,
               mua set, diem ky di) deu noi sang mot don AP SAT, de nguoi choi phai ne hai tang —
               cung nguyen tac da dung cho GAEL o @@HE-GAEL muc 1h. */
            w_chuoi5:  { p: 0.55, ds: ['w_luot','w_lao'] },
            w_lao:     { p: 0.75, ds: ['w_vong','w_luot','w_dap'] },
            w_vong:    { p: 0.70, ds: ['w_lao','w_luot','w_set3'] },
            w_luot:    { p: 0.85, ds: ['w_chuoi5','w_vong','w_bat'] },
            w_set3:    { p: 0.80, ds: ['w_lao','w_luot','w_dap'] },
            w_muaset:  { p: 0.90, ds: ['w_luot','w_lao','w_bat'] },      // mua set + ap sat = hai tang
            w_giangset:{ p: 0.60, ds: ['w_luot','w_lao'] },
            w_dap:     { p: 0.55, ds: ['w_bat','w_lao'] },               // dap xong bat luon
            w_bat:     { p: 0.45, ds: ['w_lao','w_vong'] },
            w_kydi:    { p: 1.00, ds: ['w_luot','w_lao','w_dap','w_bat'] }, // hut vao roi ap sat
            w_ptTren:  { p: 0.60, ds: ['w_luot','w_lao'] },
            w_ptNgang: { p: 0.70, ds: ['w_chuoi5','w_bat','w_lao'] }
        };
// BOSS_PART_END s0.SOC_NOI.1

// Nguồn: index.html:17871 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_CHUOI_MAX.1 READ_ONLY
const SOC_CHUOI_MAX = 4;
// BOSS_PART_END s0.SOC_CHUOI_MAX.1

// Nguồn: index.html:17874 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_LUA_LAU.1 EDITABLE
const SOC_LUA_LAU  = 150;
// BOSS_PART_END s0.SOC_LUA_LAU.1

// Nguồn: index.html:17875 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_LUA_NGHI.1 READ_ONLY
const SOC_LUA_NGHI = 40;
// BOSS_PART_END s0.SOC_LUA_NGHI.1

// Nguồn: index.html:17876 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_LUOT_XA.1 READ_ONLY
const SOC_LUOT_XA  = 300;
// BOSS_PART_END s0.SOC_LUOT_XA.1

// Nguồn: index.html:17877 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_TRANG_SAC.1 EDITABLE
const SOC_TRANG_SAC= 52;
// BOSS_PART_END s0.SOC_TRANG_SAC.1

// Nguồn: index.html:17878 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_SONG_R0.1 READ_ONLY
const SOC_SONG_R0  = 26;
// BOSS_PART_END s0.SOC_SONG_R0.1

// Nguồn: index.html:17879 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_SONG_RMAX.1 READ_ONLY
const SOC_SONG_RMAX= 96;
// BOSS_PART_END s0.SOC_SONG_RMAX.1

// Nguồn: index.html:17880 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_BAL_XA.1 READ_ONLY
const SOC_BAL_XA   = 270;
// BOSS_PART_END s0.SOC_BAL_XA.1

// Nguồn: index.html:17881 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_BAL_TOC.1 EDITABLE
const SOC_BAL_TOC  = 30;
// BOSS_PART_END s0.SOC_BAL_TOC.1

// Nguồn: index.html:17882 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_DOM_SO.1 READ_ONLY
const SOC_DOM_SO   = 9;
// BOSS_PART_END s0.SOC_DOM_SO.1

// Nguồn: index.html:17883 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_CAU_SO.1 READ_ONLY
const SOC_CAU_SO   = 5;
// BOSS_PART_END s0.SOC_CAU_SO.1

// Nguồn: index.html:17884 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_CAU_NHIP.1 READ_ONLY
const SOC_CAU_NHIP = 300;
// BOSS_PART_END s0.SOC_CAU_NHIP.1

// Nguồn: index.html:17885 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_CAU_GIU.1 READ_ONLY
const SOC_CAU_GIU  = 60;
// BOSS_PART_END s0.SOC_CAU_GIU.1

// Nguồn: index.html:17886 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_LAS_SAC.1 READ_ONLY
const SOC_LAS_SAC  = 120;
// BOSS_PART_END s0.SOC_LAS_SAC.1

// Nguồn: index.html:17887 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_LAS_TONG.1 READ_ONLY
const SOC_LAS_TONG = 240;
// BOSS_PART_END s0.SOC_LAS_TONG.1

// Nguồn: index.html:17888 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_LAS_QUAY.1 READ_ONLY
const SOC_LAS_QUAY = 0.016;
// BOSS_PART_END s0.SOC_LAS_QUAY.1

// Nguồn: index.html:17889 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_KIEM_BAO.1 EDITABLE
const SOC_KIEM_BAO = 44;
// BOSS_PART_END s0.SOC_KIEM_BAO.1

// Nguồn: index.html:17890 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_KIEM_DAI.1 EDITABLE
const SOC_KIEM_DAI = 120;
// BOSS_PART_END s0.SOC_KIEM_DAI.1

// Nguồn: index.html:17891 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_MIN_TRAN.1 READ_ONLY
const SOC_MIN_TRAN = 4;
// BOSS_PART_END s0.SOC_MIN_TRAN.1

// Nguồn: index.html:17892 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_MIN_MO.1 READ_ONLY
const SOC_MIN_MO   = 34;
// BOSS_PART_END s0.SOC_MIN_MO.1

// Nguồn: index.html:17893 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_MIN_LAU.1 EDITABLE
const SOC_MIN_LAU  = 620;
// BOSS_PART_END s0.SOC_MIN_LAU.1

// Nguồn: index.html:17895 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_VOI.1 READ_ONLY
const SOC_G_VOI   = 78;
// BOSS_PART_END s0.SOC_G_VOI.1

// Nguồn: index.html:17896 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_TRE.1 READ_ONLY
const SOC_G_TRE   = 7;
// BOSS_PART_END s0.SOC_G_TRE.1

// Nguồn: index.html:17897 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_XA.1 EDITABLE
const SOC_G_XA    = 250;
// BOSS_PART_END s0.SOC_G_XA.1

// Nguồn: index.html:17901 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_NO_R.1 READ_ONLY
const SOC_G_NO_R  = 333;
// BOSS_PART_END s0.SOC_G_NO_R.1

// Nguồn: index.html:17902 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_NO_BAO.1 READ_ONLY
const SOC_G_NO_BAO= 52;
// BOSS_PART_END s0.SOC_G_NO_BAO.1

// Nguồn: index.html:17903 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_AUTO.1 READ_ONLY
const SOC_G_AUTO  = 180;
// BOSS_PART_END s0.SOC_G_AUTO.1

// Nguồn: index.html:17904 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_PT_SO.1 READ_ONLY
const SOC_G_PT_SO = 5;
// BOSS_PART_END s0.SOC_G_PT_SO.1

// Nguồn: index.html:17905 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_G_PT_NHIP.1 READ_ONLY
const SOC_G_PT_NHIP = 30;
// BOSS_PART_END s0.SOC_G_PT_NHIP.1

// Nguồn: index.html:17906 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_KYDI_R0.1 READ_ONLY
const SOC_KYDI_R0   = 34;
// BOSS_PART_END s0.SOC_KYDI_R0.1

// Nguồn: index.html:17907 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_KYDI_RMAX.1 READ_ONLY
const SOC_KYDI_RMAX = 150;
// BOSS_PART_END s0.SOC_KYDI_RMAX.1

// Nguồn: index.html:17908 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_KYDI_LAU.1 EDITABLE
const SOC_KYDI_LAU  = 150;
// BOSS_PART_END s0.SOC_KYDI_LAU.1

// Nguồn: index.html:17909 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_KYDI_HUT.1 READ_ONLY
const SOC_KYDI_HUT  = 2.3;
// BOSS_PART_END s0.SOC_KYDI_HUT.1

// Nguồn: index.html:17910 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_MUA_SO.1 EDITABLE
const SOC_MUA_SO    = 6;
// BOSS_PART_END s0.SOC_MUA_SO.1

// Nguồn: index.html:17911 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_GIANG_COT.1 EDITABLE
const SOC_GIANG_COT = 5;
// BOSS_PART_END s0.SOC_GIANG_COT.1

// Nguồn: index.html:17912 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_GIANG_KHU.1 EDITABLE
const SOC_GIANG_KHU = 520;
// BOSS_PART_END s0.SOC_GIANG_KHU.1

// Nguồn: index.html:17913 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_PT_BAO.1 EDITABLE
const SOC_PT_BAO    = 14;
// BOSS_PART_END s0.SOC_PT_BAO.1

// Nguồn: index.html:17914 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_PT_ROI.1 READ_ONLY
const SOC_PT_ROI    = 20;
// BOSS_PART_END s0.SOC_PT_ROI.1

// Nguồn: index.html:17915 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_PT_BUOC.1 READ_ONLY
const SOC_PT_BUOC   = 62;
// BOSS_PART_END s0.SOC_PT_BUOC.1

// Nguồn: index.html:17916 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_SET_NAP.1 READ_ONLY
const SOC_SET_NAP   = 26;
// BOSS_PART_END s0.SOC_SET_NAP.1

// Nguồn: index.html:17917 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SOC_SET_NHIP.1 READ_ONLY
const SOC_SET_NHIP  = 42;
// BOSS_PART_END s0.SOC_SET_NHIP.1

// Nguồn: index.html:17919 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.socChop.1 EDITABLE
let socChop = 0;
// BOSS_PART_END s0.socChop.1

// Nguồn: index.html:20454 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.SoulOfCinderBoss.1 EDITABLE
class SoulOfCinderBoss {
            constructor(level){
                this.name = "SOUL OF CINDER";
                this.phase = 1; this.stage = 1;
                this.hp = SOC_HP[1]; this.maxHp = SOC_HP[1];
                this.w = SOC_W; this.h = SOC_H; this.baseY = 320 - this.h;
                this.x = canvas.width - 200; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.actionTimer = 48; this.facingLeft = true;
                this.lastSkill = ''; this.invulnAll = false; this.burnTimer = 0; this.lastMeleeHit = -1;
                this.armR = 0; this.dashV = 0; this.walk = 0; this.cd = {};
                this.slash = null; this.tel = null; this.ghosts = []; this.hop = [];
                this.vong = null; this.cot = []; this.set = []; this.stagger = 0;
                this.chuoi = []; this.chuoiDem = 0;
                // --- trang thai cua bay he rieng o pha 1 ---
                this.lua = [];      // vet lua chay tren mat dat
                this.trang = [];    // nhat chem mat trang lua
                this.song = null;   // song lua lon dan
                this.dom = [];      // dom lua nho dang bay theo duong cong
                this.bom = [];      // qua cau lua tach doi
                this.buaBay = null; // bua dang bay di / dang cam / dang thu ve
                this.loc = [];      // loc xoay
                this.cau = []; this.cauT = 0;   // nam qua cau tu dong cua tu the phep
                this.laser = null;  // tia laser
                this.kiem = null;   // luoi kiem phep khong lo
                this.min = [];      // min dat duoi dat
                // --- trang thai cua PHA 2 (Gwyn) ---
                this.khi = [];      // kiem khi lua quet ngang
                this.tia = [];      // tia set vang
                this.kydi = null;   // diem ky di (loc xoay lua hut nguoi choi)
                this.pt = [];       // phan than he thanh
                this.bat = null;    // dang bat nguoi choi
                this.noLon = null;  // vu no khi cam kiem xuong
                this.setT = 0;      // dong ho set tu danh (duoi 50% mau)
                this.napSet = null; // qua cau set dang giat trong tay truoc moi cu nem
                this.sang = 0;      // >0 = dang phat sang vang kim (he thanh)
                // --- he TU THE ---
                this.tu = 'thang';          // tu the dang cam
                this.tuTruoc = '';          // tu the vua roi (de khong boc lai ngay)
                this.tuT = 0;               // da o tu the nay bao nhieu khung
                this.tuMoc = this.hp;       // mau luc vao tu the nay (de biet da mat bao nhieu)
                this.tuMoi = null;          // tu the sap doi sang, trong luc dang cam vu khi xuong
                this.an = 0;                // >0 = dang dich chuyen, khong ve than
                this.sac = 0;               // 0..1 — do sang cua lua/set tren vu khi
            }
            /* Nhip do = nhip cua PHA nhan nhip cua TU THE. Pha 2 khong con tu the nen lay 1.24
               co dinh — Gwyn nang nhung khong cham. */
            spd(){ return this.stage === 2 ? 1.34 : SOC_NHIP[this.tu]; }
            /* Hoi chieu thuc te: pha 2 rut 0.82 lan vi bo don it hon nhung phai day hon. */
            cdCua(id){
                let c = SOC_CD[id] || 0; if (!c) return 0;
                return this.stage === 2 ? Math.round(c * 0.82) : c;
            }
            canUse(id){ return !((this.cd[id] || 0) > 0); }
            pickFrom(pool, fb){
                pool = pool.filter(id => this.canUse(id));
                if (!pool.length) return fb;
                if (pool.length > 1){ let f = pool.filter(x => x !== this.lastSkill); if (f.length) pool = f; }
                let c = pool[Math.floor(Math.random() * pool.length)];
                this.lastSkill = c; if (SOC_CD[c]) this.cd[c] = this.cdCua(c);
                return c;
            }
            /* Bo don HOP LE = dung bo don cua tu the hien tai (pha 1) hoac bo Gwyn (pha 2). */
            boHienTai(){
                if (this.stage !== 2) return SOC_BO[this.tu];
                return this.coThanh() ? SOC_BO2.concat(SOC_BO2T) : SOC_BO2;
            }
            /* @@HE-AIVO doc ham nay. Hai viec:
                 - chan tang AI vo khoi viec rut mot don cua TU THE KHAC (neu khong thi Soul of
                   Cinder cam bua ma vung ra mot don cua gay phep — moi cong suc lam bon tu the
                   khac nhau bi xoa sach trong mot khung hinh);
                 - dang giua chuoi thi nhuong han luot chon lai cho hang doi `chuoi`. */
            aiLocChieu(id){
                if (this.chuoi && this.chuoi.length) return false;
                return this.boHienTai().indexOf(id) >= 0 && this.canUse(id);
            }
            toIdle(t){
                if (SOC_NOI[this.state]) this.datNoi(this.state);
                this.state = 'idle'; this.subTimer = 0; this.armR = 0;
                this.dashV = 0;
                if (this.chuoi && this.chuoi.length){ this.actionTimer = Math.max(3, Math.round(6 / this.spd())); return; }
                this.chuoiDem = 0;
                this.actionTimer = Math.max(7, Math.round(t * SOC_TEMPO / this.spd()));
            }
            datNoi(id){
                let n = SOC_NOI[id]; if (!n || !this.chuoi) return;
                if ((this.chuoiDem || 0) >= SOC_CHUOI_MAX) return;
                if (Math.random() > n.p) return;
                // CHI noi trong cung mot tu the — xem ghi chu o bang SOC_NOI
                let bo = this.boHienTai();
                let ds = n.ds.filter(x => bo.indexOf(x) >= 0);
                if (!ds.length) return;
                this.chuoi.push(ds[Math.floor(Math.random() * ds.length)]);
                this.chuoiDem = (this.chuoiDem || 0) + 1;
            }
            ghost(){ if (this.ghosts.length >= 6) this.ghosts.shift();
                     this.ghosts.push({ x: this.x, y: this.y, left: this.facingLeft, armR: this.armR, t: 12, max: 12 }); }
            physics(){
                this.dy += 0.66; this.y += this.dy;
                let land = this.baseY + this.h;
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
            /* ============ CAC HE RIENG CUA PHA 2 — GWYN ============ */

            /* VET LUA noi dai don co ban. Hans: "lua se xuat hien de TANG TAM DANH cho cac don
               co ban, khi chem se co mot VET LUA giup keo dai don danh them mot khuc nua."
               Lam thanh mot HOP RIENG cham sau luoi kiem SOC_G_TRE khung — hai lan cham rieng
               biet, moi lan dung 1 sat thuong, khong phai mot hop 2 dmg (L7). Cung ky thuat da
               dung cho ao choang cua GAEL. */
            themVetLua(reach, up, life){
                let d = this.dir(), R = reach + SOC_G_VOI, U = up + 8;
                let r = d < 0 ? { x: this.x - R, y: this.y + 4 - U, w: R, h: this.h + U - 4 }
                              : { x: this.x + this.w, y: this.y + 4 - U, w: R, h: this.h + U - 4 };
                this.hop.push({ x:r.x, y:r.y, w:r.w, h:r.h, cho: SOC_G_TRE,
                                t: life || 10, tong: life || 10, hit: false, lua: 1 });
            }
            /* KIEM KHI LUA — mot lat khi bay ngang quet qua ca mot khu. Sinh ra tu nhat chem
               cua combo chu danh, o DUNG PHIA bi chem. */
            themKhi(x, dir, cao){
                this.khi.push({ x: x, dir: dir, cao: cao || 96, t: 0, r: 30, hit: false });
            }
            tickKhi(){
                for (let i = this.khi.length - 1; i >= 0; i--){
                    let k = this.khi[i]; k.t++;
                    k.x += k.dir * 11; k.r = Math.min(60, k.r + 0.7);
                    let box = { x: k.x - k.r * 0.5, y: 320 - k.cao, w: k.r, h: k.cao };
                    if (!k.hit && checkAABB(dino, box)){ k.hit = true; this.hurtP(1); }
                    if (k.t > 120 || k.x < -140 || k.x > canvas.width + 140) this.khi.splice(i, 1);
                }
            }
            /* TIA SET VANG cua Gwyn. Mot doan thang tu ban tay ra, dai va gap khuc. */
            themTia(x0, y0, goc, dai){
                this.tia.push({ x0: x0, y0: y0, goc: goc, dai: dai, t: 0, hit: false,
                                nhieu: Math.random() * 100 });
            }
            tickTia(){
                for (let i = this.tia.length - 1; i >= 0; i--){
                    let t2 = this.tia[i]; t2.t++;
                    if (!t2.hit && t2.t > 2){
                        for (let k = 1; k <= 22; k++){
                            let px = t2.x0 + Math.cos(t2.goc) * (t2.dai * k / 22);
                            let py = t2.y0 + Math.sin(t2.goc) * (t2.dai * k / 22);
                            if (checkAABB(dino, { x: px - 17, y: py - 17, w: 34, h: 34 })){
                                t2.hit = true; this.hurtP(1); break;
                            }
                        }
                    }
                    if (t2.t > 20) this.tia.splice(i, 1);
                }
            }
            /* DIEM KY DI — loc xoay lua HUT nguoi choi vao roi NO.
               Hans: "nguoi choi phai di NGUOC HUONG voi no, luc hut NGAY CANG MANH khi diem ky
               di nay MO RONG ra de phat no nen it nhat cung can dung 1 lan dash."
               Nen luc hut ti le voi do mo rong: luc dau keo nhe, cuoi cung keo rat manh — va vi
               vung no bang dung do mo rong do, ai khong dash thi khong ra kip. */
            tickKyDi(){
                let k = this.kydi; if (!k) return;
                k.t++;
                k.r = SOC_KYDI_R0 + (SOC_KYDI_RMAX - SOC_KYDI_R0) * Math.min(1, k.t / SOC_KYDI_LAU);
                if (k.t < SOC_KYDI_LAU){
                    let dx = k.x - (dino.x + dino.w/2);
                    let xa = Math.abs(dx);
                    if (xa < k.r * 2.4 && xa > 2){
                        let manh = SOC_KYDI_HUT * (0.3 + 0.7 * (k.t / SOC_KYDI_LAU));
                        dino.x += Math.sign(dx) * manh;
                    }
                } else if (!k.no){
                    k.no = 20;
                    let r = { x: k.x - k.r, y: 320 - k.r * 1.6, w: k.r * 2, h: k.r * 1.6 };
                    if (checkAABB(dino, r)) this.hurtP(1);
                    visualEffects.push(new Effect(k.x, 300, 'explosion', true, 52));
                    shakeTimer = 52; if (SFX.bossExplode) SFX.bossExplode();
                }
                if (k.no){ k.no--; if (k.no <= 0) this.kydi = null; }
            }
            /* PHAN THAN hệ thánh (chi duoi 50% mau). Moi phan than hien ra, chem MOT phat vao
               vi tri nguoi choi luc no sinh ra, roi bien mat. Vi no chot vi tri luc SINH RA chu
               khong duoi theo, nen chay lien tuc la thoat — do la duong go (L5). */
            /* PHAN THAN he thanh. Hans (lan sua): "chieu o tren khong thi phan than NHAY XUONG
               CHEM chu khong phai XUAT HIEN TUC THI. Ngoai ra chung khong duoc xuat hien qua xa
               nhau ma phai LAN LUOT o TUONG DOI GAN NHAU va CUNG MOT HUONG… giong chieu cua
               Radahn va Miquella ben Elden Ring."

               Nen mot phan than gio co HAI pha:
                 'roi'  — hien ra o tren cao, ROI XUONG trong SOC_PT_ROI khung (co vet duoi)
                 'chem' — cham dat roi moi bung hop sat thuong
               Va vi tri thi do chieu goi quyet dinh: mot goc x va MOT huong chot tu dau, moi con
               lech them SOC_PT_BUOC px theo dung huong do — ra mot HANG phan than quet ngang chu
               khong phai nam cho ngau nhien khap san. */
            themPhanThan(x, yDat, dir, cho, roi){
                this.pt.push({ x: x, y: roi ? (yDat - 220) : yDat, yDat: yDat, dir: dir,
                               cho: cho || 0, t: 0, hit: false, cham: false,
                               pha: roi ? 'roi' : 'chem' });
            }
            tickPhanThan(){
                for (let i = this.pt.length - 1; i >= 0; i--){
                    let o = this.pt[i];
                    if (o.cho > 0){ o.cho--; continue; }
                    o.t++;
                    if (o.pha === 'roi'){
                        let u = Math.min(1, o.t / SOC_PT_ROI);
                        o.y = (o.yDat - 220) + 220 * u * u;        // roi nhanh dan
                        if (o.t >= SOC_PT_ROI){
                            o.pha = 'chem'; o.t = 0; o.y = o.yDat;
                            visualEffects.push(new Effect(o.x, o.yDat + SOC_H2 - 6, 'explosion', true, 18));
                            shakeTimer = Math.max(shakeTimer, 12);
                        }
                        continue;
                    }
                    if (o.t === SOC_PT_BAO){
                        o.cham = true;
                        let r = { x: o.dir < 0 ? o.x - 150 : o.x, y: o.y - 20, w: 150, h: 110 };
                        if (!o.hit && checkAABB(dino, r)){ o.hit = true; this.hurtP(1); }
                        visualEffects.push(new Effect(o.x + o.dir * 60, o.y + 40, 'explosion', true, 16));
                        if (SFX.tone) SFX.tone(520, 0.05, 'square', 0.10, 240);
                    }
                    if (o.t > SOC_PT_BAO + 12) this.pt.splice(i, 1);
                }
            }
            /* SET TU DANH duoi 50% mau, moi 3 giay, o VI TRI NGAU NHIEN GAN nguoi choi.
               "Gan" chu khong "dung ngay tren dau": lech +-170px, nen no la ap luc lien tuc
               bat nguoi choi phai di chuyen, khong phai mot don khong ne duoc (L5). */
            tickSetTuDanh(){
                if (this.stage !== 2 || this.dying || this.hp > this.maxHp * 0.5){ this.setT = 0; return; }
                this.setT++;
                if (this.setT >= SOC_G_AUTO){
                    this.setT = 0;
                    let px = dino.x + dino.w/2 + (Math.random() - 0.5) * 340;
                    this.datCot(Math.max(40, Math.min(canvas.width - 40, px)), 44, 'set');
                }
            }
            // Duoi 50% mau moi mo bo he THANH
            coThanh(){ return this.stage === 2 && this.hp <= this.maxHp * 0.5; }
            /* Vu no khi CAM KIEM: chi DO duoc chu khong xoa duoc bang parry — do la don duy
               nhat trong file ma viec do TON KHIEN. Hans: "chieu nay chi do khong parry duoc." */
            /* Hans: "chieu nay CHI DO khong parry duoc."
               Trong game nay khien la cua so vung kiem, va khong co he parry don cua boss — nen
               "khong parry duoc" da dung san. Cai phai lam them la khien KHONG duoc mien phi:
               do duoc thi khong mat mau, nhung van bi HAT VANG va rung man. Do la don duy nhat
               trong file ma viec do van tra gia bang vi tri. */
            hurtPDo(n){
                if (!dino.isShielding()){ dino.takeDamage(n); return; }
                visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + dino.h/2, 'parry'));
                let d = Math.sign((dino.x + dino.w/2) - this.cx()) || 1;
                dino.x = Math.max(6, Math.min(canvas.width - dino.w - 6, dino.x + d * 150));
                dino.dy = -8; dino.grounded = false;
                shakeTimer = Math.max(shakeTimer, 40);
            }
            tickNoLon(){
                let n = this.noLon; if (!n) return;
                n.t++;
                if (n.t === n.bao){
                    let r = { x: n.x - SOC_G_NO_R, y: -CAM_TROI, w: SOC_G_NO_R * 2, h: 320 + CAM_TROI };
                    if (checkAABB(dino, r)) this.hurtPDo(1);
                    shakeTimer = 90; socChop = 60;
                    for (let k = 0; k < 7; k++)
                        visualEffects.push(new Effect(n.x + (k - 3) * 150, 290 - (k % 3) * 30, 'explosion', true, 46));
                    if (SFX.bossExplode) SFX.bossExplode();
                }
                if (n.t > n.bao + 34) this.noLon = null;
            }
            // Hop sat thuong phu, dung cho don vong tron / don khong co huong
            themHop(x, y, w, h, cho, life){
                this.hop.push({ x:x, y:y, w:w, h:h, cho: cho || 0, t: life || 10, tong: life || 10, hit: false });
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
            /* COT LUA / COT SET moc len tu dat. Moi cot NHO THOI GIAN CHO CUA CHINH NO (`tong`)
               chu khong chia cho mot hang so — da co mot loi IndexSizeError vi dat cac diem voi
               thoi gian cho khac nhau ma ve thi chia cho hang so, ra ban kinh am. Xem @@HE-GAEL. */
            datCot(x, cho, loai){
                let c = cho || 52;
                this.cot.push({ x: x, t: c, tong: c, no: 0, hit: false, loai: loai || 'lua' });
            }
            tickCot(){
                for (let i = this.cot.length - 1; i >= 0; i--){
                    let s = this.cot[i];
                    if (s.no > 0){
                        s.no--;
                        if (!s.hit){
                            let cao = s.loai === 'set' ? (320 + CAM_TROI) : 104;
                            let r = { x: s.x - 34, y: 320 - cao, w: 68, h: cao };
                            if (checkAABB(dino, r)){ s.hit = true; this.hurtP(1); }
                        }
                        if (s.no <= 0) this.cot.splice(i, 1);
                        continue;
                    }
                    s.t--;
                    if (s.t <= 0){
                        s.no = 18;
                        if (s.loai === 'set') socChop = 20;
                        visualEffects.push(new Effect(s.x, 300, 'explosion', true, s.loai === 'set' ? 28 : 22));
                        shakeTimer = Math.max(shakeTimer, s.loai === 'set' ? 18 : 12);
                        if (SFX.tone) SFX.tone(s.loai === 'set' ? 180 : 130, 0.12, 'sawtooth', 0.15, 70);
                    }
                }
            }
            tickVong(){
                let v = this.vong; if (!v) return;
                v.r += v.sp;
                let dx = Math.abs((dino.x + dino.w/2) - v.x);
                if (!v.hit && dino.grounded && Math.abs(dx - v.r) < 34){ v.hit = true; this.hurtP(1); }
                if (v.r > v.max) this.vong = null;
            }
            /* ============ CAC HE RIENG CUA PHA 1 ============
               Bay he nho, moi he phuc vu mot nhom don. Deu theo cung mot khuon: mot mang trang
               thai, mot ham `tick*` goi tu `update`, mot doan ve trong `draw`. Va deu tuan thu
               L7 — moi lan cham dung 1 sat thuong, khong he nao cong don trong cung mot khung. */

            // --- VET LUA CHAY tren mat dat (duong dam cua `s_luotdam`, mua lua cua `c_mua`) ---
            /* Vung lua TON TAI LAU, nen no khong the cham moi khung — nhu vay la mot vung cam
               chan chu khong phai mot don danh. Moi vet co `ngu` (nghi) rieng: cham xong thi
               nghi SOC_LUA_NGHI khung moi cham lai duoc, du nguoi choi van dung trong lua. */
            themLua(x, w, doi){
                this.lua.push({ x: x, w: w, t: doi || SOC_LUA_LAU, tong: doi || SOC_LUA_LAU, ngu: 0 });
            }
            tickLua(){
                for (let i = this.lua.length - 1; i >= 0; i--){
                    let f = this.lua[i]; f.t--;
                    if (f.ngu > 0) f.ngu--;
                    else {
                        let r = { x: f.x - f.w/2, y: 320 - 34, w: f.w, h: 34 };
                        if (checkAABB(dino, r)){ this.hurtP(1); f.ngu = SOC_LUA_NGHI; }
                    }
                    if (f.t <= 0) this.lua.splice(i, 1);
                }
            }
            // --- NHAT CHEM MAT TRANG (s_trang) va SONG LUA LON DAN (s_song) ---
            themTrang(x, y, vx, r){
                this.trang.push({ x: x, y: y, vx: vx, r: r, t: 0, hit: false, no: 0 });
            }
            tickTrang(){
                for (let i = this.trang.length - 1; i >= 0; i--){
                    let m = this.trang[i]; m.t++; m.x += m.vx;
                    if (m.no > 0){ m.no--; if (m.no <= 0) this.trang.splice(i, 1); continue; }
                    let box = { x: m.x - m.r * 0.45, y: m.y - m.r, w: m.r * 0.9, h: m.r * 2 };
                    if (!m.hit && checkAABB(dino, box)){ m.hit = true; this.hurtP(1); }
                    if (m.x < -120 || m.x > canvas.width + 120 || m.t > 240) this.trang.splice(i, 1);
                }
            }
            tickSongLua(){
                let s2 = this.song; if (!s2) return;
                s2.t++; s2.x += s2.vx;
                /* "song lua NGAY CANG TO" — ban kinh lon dan theo quang duong, nen cang ra xa
                   cang kho nhay qua. Doi lai no di cham dan, luon kip doc. */
                s2.r = Math.min(SOC_SONG_RMAX, SOC_SONG_R0 + s2.t * 0.62);
                s2.vx *= 0.992;
                let box = { x: s2.x - s2.r * 0.5, y: 320 - s2.r * 1.5, w: s2.r, h: s2.r * 1.5 };
                if (!s2.hit && checkAABB(dino, box)){ s2.hit = true; this.hurtP(1); }
                if (s2.x < -140 || s2.x > canvas.width + 140 || s2.t > 260) this.song = null;
            }
            // --- DOM LUA NHO bay theo DUONG CONG roi roi xuong (c_mua) ---
            /* Chung khong gay sat thuong luc dang bay — cho roi xuong moi tao mot vet lua nho.
               Duong bay la mot cung parabol tinh san tu diem xuat phat toi diem roi, nen nguoi
               choi NHIN DUONG BAY la biet truoc cho nao sap chay (L5). */
            tickDom(){
                for (let i = this.dom.length - 1; i >= 0; i--){
                    let o = this.dom[i]; o.t++;
                    let u = o.t / o.tong;
                    if (u >= 1){
                        this.themLua(o.dich, 70, 96);
                        visualEffects.push(new Effect(o.dich, 302, 'explosion', true, 16));
                        this.dom.splice(i, 1); continue;
                    }
                    o.cao = Math.sin(u * Math.PI) * 130;           // cung nem
                }
            }
            // --- QUA CAU LUA TACH DOI (c_cau) ---
            /* Bay theo duong cong, cham dat thi NO va TACH LAM HAI, hai qua nho bay hai ben roi
               NO THEM MOT LAN NUA. Ba lan no o ba cho khac nhau tu mot don duy nhat — nen cho
               dung an toan doi HAI lan trong cung mot doan. */
            tickBom(){
                for (let i = this.bom.length - 1; i >= 0; i--){
                    let q = this.bom[i];
                    q.vy += 0.42; q.x += q.vx; q.y += q.vy;
                    if (!q.hit){
                        let r = { x: q.x - 15, y: q.y - 15, w: 30, h: 30 };
                        if (checkAABB(dino, r)){ q.hit = true; this.hurtP(1); }
                    }
                    if (q.y >= 320 - 12 || q.x < 20 || q.x > canvas.width - 20){
                        let nx = Math.max(30, Math.min(canvas.width - 30, q.x));
                        visualEffects.push(new Effect(nx, 302, 'explosion', true, q.nho ? 22 : 32));
                        this.themLua(nx, q.nho ? 66 : 92, q.nho ? 80 : 110);
                        shakeTimer = Math.max(shakeTimer, q.nho ? 14 : 24);
                        if (!q.nho){
                            // TACH LAM HAI, bay ve hai ben
                            for (let s2 of [-1, 1])
                                this.bom.push({ x: nx + s2 * 14, y: 320 - 30, vx: s2 * 5.4, vy: -6.4,
                                                nho: true, hit: false });
                            if (SFX.bossExplode) SFX.bossExplode();
                        }
                        this.bom.splice(i, 1);
                    }
                }
            }
            // --- BUA NEM DI ROI THU VE (b_nem) ---
            tickBuaBay(){
                let b2 = this.buaBay; if (!b2) return;
                b2.goc += 0.42;
                if (b2.pha === 'di'){
                    b2.x += b2.vx; b2.t++;
                    if (b2.t > 26 || b2.x < 40 || b2.x > canvas.width - 40){ b2.pha = 'cam'; b2.vx = 0; }
                } else if (b2.pha === 've'){
                    let dx = this.cx() - b2.x, dy = (this.y + this.h * 0.5) - b2.y;
                    let L = Math.hypot(dx, dy) || 1;
                    b2.x += dx / L * 13; b2.y += dy / L * 13;
                    if (L < 26){ this.buaBay = null; this._buaVe = true; return; }
                }
                if (b2.pha !== 'cam'){
                    let r = { x: b2.x - 24, y: b2.y - 24, w: 48, h: 48 };
                    if (!b2.hit && checkAABB(dino, r)){ b2.hit = true; this.hurtP(1); }
                }
            }
            // --- LOC XOAY sinh ra khi bat lai bua (b_nem) ---
            themLoc(x, vx){ this.loc.push({ x: x, y: 320, vx: vx, t: 0, ngu: 0 }); }
            tickLoc(){
                for (let i = this.loc.length - 1; i >= 0; i--){
                    let o = this.loc[i]; o.t++; o.x += o.vx;
                    if (o.ngu > 0) o.ngu--;
                    else {
                        let r = { x: o.x - 26, y: 320 - 88, w: 52, h: 88 };
                        if (checkAABB(dino, r)){ this.hurtP(1); o.ngu = 34; }
                    }
                    if (o.t > 170 || o.x < -70 || o.x > canvas.width + 70) this.loc.splice(i, 1);
                }
            }
            // --- NAM QUA CAU TU DONG cua tu the phep ---
            /* Don DUY NHAT trong file tu kich hoat theo dong ho chu khong qua `pickSkill`. No
               chay SONG SONG voi moi don khac cua tu the phep, nen nguoi choi khong bao gio
               duoc phep chi nhin mot thu. Tao ra -> GIU 1 giay -> lao di. */
            tickCau(){
                if (this.stage === 1 && this.tu === 'phep' && !this.dying && this.state !== 'doi'){
                    this.cauT++;
                    if (this.cauT >= SOC_CAU_NHIP && this.cau.length === 0){
                        this.cauT = 0;
                        for (let k = 0; k < SOC_CAU_SO; k++)
                            this.cau.push({ ang: k * 6.283 / SOC_CAU_SO, r: 54, x: this.cx(), y: this.cy(),
                                            pha: 'giu', t: 0, vx: 0, vy: 0, hit: false });
                        if (SFX.tone) SFX.tone(660, 0.14, 'sine', 0.10, 260);
                    }
                } else this.cauT = 0;
                for (let i = this.cau.length - 1; i >= 0; i--){
                    let q = this.cau[i]; q.t++;
                    if (q.pha === 'giu'){
                        q.ang += 0.05;
                        q.x = this.cx() + Math.cos(q.ang) * q.r;
                        q.y = this.cy() + Math.sin(q.ang) * q.r * 0.8;
                        if (q.t > SOC_CAU_GIU){
                            q.pha = 'lao';
                            let dx = (dino.x + dino.w/2) - q.x, dy = (dino.y + dino.h/2) - q.y;
                            let L = Math.hypot(dx, dy) || 1;
                            q.vx = dx / L * 7.2; q.vy = dy / L * 7.2; q.t = 0;
                        }
                    } else {
                        q.x += q.vx; q.y += q.vy;
                        let r = { x: q.x - 11, y: q.y - 11, w: 22, h: 22 };
                        if (!q.hit && checkAABB(dino, r)){ q.hit = true; this.hurtP(1); this.cau.splice(i,1); continue; }
                        if (q.t > 150 || q.x < -60 || q.x > canvas.width + 60 || q.y > 340) this.cau.splice(i, 1);
                    }
                }
            }
            // --- TIA LASER dai 4 giay cua tu the phep ---
            tickLaser(){
                let L2 = this.laser; if (!L2) return;
                L2.t++;
                if (L2.t < SOC_LAS_SAC) return;                     // dang charge, chua ban
                /* Di theo nguoi choi mot cach HOI CHAM — do la ca cai kho lan ca duong go:
                   chay lien tuc mot huong thi tia bam kip, nhung doi huong thi no luon tre lai. */
                let mucX = dino.x + dino.w/2, mucY = dino.y + dino.h * 0.5;
                let g0 = Math.atan2(mucY - (this.y + this.h * 0.34), mucX - this.cx());
                let d = ((g0 - L2.goc + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
                L2.goc += Math.max(-SOC_LAS_QUAY, Math.min(SOC_LAS_QUAY, d));
                if (L2.ngu > 0){ L2.ngu--; return; }
                // kiem tra cham: chia tia thanh cac doan ngan
                let ox = this.cx(), oy = this.y + this.h * 0.34;
                for (let k = 1; k <= 26; k++){
                    let px = ox + Math.cos(L2.goc) * k * 38, py = oy + Math.sin(L2.goc) * k * 38;
                    let r = { x: px - 13, y: py - 13, w: 26, h: 26 };
                    if (checkAABB(dino, r)){ this.hurtP(1); L2.ngu = 30; break; }
                }
            }
            // --- MIN DAT DUOI DAT (toi da 4) ---
            tickMin(){
                for (let i = this.min.length - 1; i >= 0; i--){
                    let m = this.min[i]; m.t++;
                    if (m.no > 0){
                        m.no--;
                        if (!m.hit){
                            let r = { x: m.x - 62, y: 320 - 82, w: 124, h: 82 };
                            if (checkAABB(dino, r)){ m.hit = true; this.hurtP(1); }
                        }
                        if (m.no <= 0) this.min.splice(i, 1);
                        continue;
                    }
                    if (m.t < SOC_MIN_MO) continue;                  // chua kich hoat — L5: co thoi gian doc
                    let r = { x: m.x - 34, y: 320 - 46, w: 68, h: 46 };
                    if (checkAABB(dino, r) || m.t > SOC_MIN_LAU){
                        m.no = 20;
                        visualEffects.push(new Effect(m.x, 300, 'explosion', true, 30));
                        shakeTimer = Math.max(shakeTimer, 20);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                }
            }

            /* ================= DOI TU THE =================
               Hai duong vao:
                 - HET GIO (SOC_DOI_NHIP): doi sang tu the KE TIEP trong vong.
                 - BI EP (mat SOC_DOI_MAU mau trong mot tu the): boc NGAU NHIEN mot tu the khac.
               Duong thu hai quan trong hon duong thu nhat: no lam cho viec nguoi choi danh manh
               tro thanh thu DOI NHIP TRAN, chu khong phai chi la mot dong ho dem nguoc. Danh
               manh vao Soul of Cinder la tu tay minh doi doi thu.

               Doan doi keo SOC_DOI_CHU khung, BAT TU va KHONG gay sat thuong. Do khong phai la
               tang qua: no la cho nguoi choi doc ten vu khi moi va doi the — neu doi tu the ma
               danh duoc luon thi ca he thong tu the tro thanh mot don tan cong, khong con la
               mot cau hoi. */
            nenDoiTu(){
                if (this.stage !== 1 || this.dying || this.state !== 'idle') return false;
                if (this.chuoi && this.chuoi.length) return false;     // khong doi giua chuoi
                if (this.tuT > SOC_DOI_NHIP * (SOC_DOI_LAU[this.tu] || 1)) return true;
                return (this.tuMoc - this.hp) >= this.maxHp * SOC_DOI_MAU;
            }
            /* Doi tu the / chuyen pha thi DON SACH moi thu tu the cu de lai. Neu khong thi
               Soul of Cinder cam bua ma tren san van con tia laser cua gay phep — doc ra la sai
               hoan toan, va con lam viec "moi tu the mot loi danh" mat het y nghia.
               Ngoai le CO Y: `lua` va `min` la thu DE LAI TREN SAN, chung tu het han theo dong
               ho cua chinh chung — do la ca cai gia cua hai don do. */
            donTuThe(){
                this.khi.length = 0; this.tia.length = 0; this.kydi = null;
                this.pt.length = 0; this.bat = null; this.noLon = null; this.sang = 0;
                this.napSet = null;
                this._gsDa = false; this._ptDa = false; this._ptX = undefined;
                this._dapTrung = false; this._batTruot = false;
                this.trang.length = 0; this.song = null; this.dom.length = 0;
                this.bom.length = 0; this.buaBay = null; this.loc.length = 0;
                this.cau.length = 0; this.cauT = 0; this.laser = null; this.kiem = null;
                this._buaVe = false; this._daLoc = false; this._daBung = false;
                this._locT = undefined; this._lda = false; this._lon = 0;
            }
            batDauDoi(ep){
                /* Loai ca tu the HIEN TAI lan tu the VUA XONG. Do lan dau khong co `tuTruoc`:
                   trong 57 giay pha 1, han vao tu the KIEM THANG 3 lan va KHONG LAN NAO cam bua
                   — boc ngau nhien tren ba lua chon thi rat de quay lai cho vua roi di, va ca
                   mot tu the co the khong bao gio xuat hien trong mot tran. */
                let ds = SOC_TU.filter(t => t !== this.tu && t !== this.tuTruoc);
                if (!ds.length) ds = SOC_TU.filter(t => t !== this.tu);
                this.tuMoi = ep ? ds[Math.floor(Math.random() * ds.length)]
                                : SOC_TU[(SOC_TU.indexOf(this.tu) + 1) % SOC_TU.length];
                this.tuTruoc = this.tu;
                this.state = 'doi'; this.subTimer = 0; this.invulnAll = true;
                this.chuoi.length = 0; this.chuoiDem = 0;
                this.slash = null; this.tel = null;
                this.donTuThe();
            }
            xongDoi(){
                this.tu = this.tuMoi || 'thang'; this.tuMoi = null;
                this.tuT = 0; this.tuMoc = this.hp; this.invulnAll = false;
                this.cd = {};                       // vu khi moi thi bo don moi con nguyen
                floatingTexts.push(new FloatingText(this.cx() - 58, 150, SOC_TU_TEN[this.tu]));
                this.toIdle(16);
            }
            // ================= CHUYEN PHA: THAN LUA CUA GWYN =================
            startPhase2(){
                this.stage = 2; this.phase = 2;
                this.hp = SOC_HP[2]; this.maxHp = SOC_HP[2];
                this.invulnAll = true;
                this.name = "SOUL OF CINDER — GWYN";
                this.w = SOC_W2; this.h = SOC_H2; this.baseY = 320 - this.h;
                this.y = this.baseY; this.dy = 0; this.dashV = 0;
                this.state = 's_hoi2'; this.subTimer = 0;
                this.slash = null; this.tel = null; this.cd = {};
                this.chuoi.length = 0; this.chuoiDem = 0;
                this.hop.length = 0; this.cot.length = 0; this.vong = null;
                this.donTuThe(); this.lua.length = 0; this.min.length = 0;
                this.tuMoi = null; this.sac = 1;
                if (typeof shakeTimer !== 'undefined') shakeTimer = 70;
            }
            update(){
                if (this.state === 'entering'){
                    this.physics(); this.x -= 4;
                    if (this.x < canvas.width - 240) this.toIdle(26);
                    return;
                }
                for (let i = this.ghosts.length - 1; i >= 0; i--){ this.ghosts[i].t--; if (this.ghosts[i].t <= 0) this.ghosts.splice(i, 1); }
                if (this.tel){ this.tel.t--; if (this.tel.t <= 0) this.tel = null; }
                if (this.slash){ this.slash.t--; if (this.slash.t <= 0) this.slash = null; }
                for (let k in this.cd) if (this.cd[k] > 0) this.cd[k]--;
                this.tickCot(); this.tickVong(); this.tickHop();
                this.tickLua(); this.tickTrang(); this.tickSongLua(); this.tickDom();
                this.tickBom(); this.tickBuaBay(); this.tickLoc(); this.tickCau();
                this.tickLaser(); this.tickMin();
                this.tickKhi(); this.tickTia(); this.tickKyDi(); this.tickPhanThan();
                this.tickNoLon(); this.tickSetTuDanh();
                this.tuT++;
                this.sac = this.stage === 2 ? 1 : (this.tu === 'cong' || this.tu === 'phep' ? 0.7 : 0.25);
                if (this.stagger > 0){ this.stagger--; this.physics(); if (this.stagger === 0) this.toIdle(18); return; }
                this.physics();
                if (this.slash){
                    let r = this.slashRect();
                    if (!this.slash.hit && checkAABB(dino, r)){ this.slash.hit = true; this.hurtP(1); }
                }
                /* Kiem tra DOI TU THE o day, trong `update`, chu KHONG phai trong `pickSkill`.
                   Ly do da ghi lai o @@HE-GAEL: `aivoGan` boc thang len `pickSkill`, nen bat cu
                   gi viet trong do deu co the bi tang AI vo chen truoc va khong bao gio chay. */
                if (this.nenDoiTu()){ this.batDauDoi((this.tuMoc - this.hp) >= this.maxHp * SOC_DOI_MAU); return; }
                if (this.state === 'idle'){
                    this.faceP();
                    let g = this.gap(), ad = Math.abs(g);
                    let ly = this.stage === 2 ? 110 : SOC_CULY[this.tu];
                    let di = this.stage === 2 ? 3.0 : (this.tu === 'bua' ? 1.9 : (this.tu === 'cong' ? 3.2 : 2.5));
                    /* Moi tu the tu tim ve CU LY CUA NO. Day la thu lam "loi danh khac nhau"
                       doc duoc ngay ca khi chua ra don: cam gay phep thi han lui ra xa 300px,
                       cam kiem cong thi han dinh sat 78px. */
                    if (ad > ly + 40){ let sp = ad > 340 ? di * 1.4 : di; this.x += Math.sign(g) * sp; this.walk += sp; }
                    else if (ad < ly - 40){ this.x -= Math.sign(g) * di * 0.7; this.walk += di * 0.7; }
                    this.actionTimer--;
                    if (this.actionTimer <= 0) this.pickSkill();
                    return;
                }
                this.runSkill();
            }
            pickSkill(){
                if (this.chuoi && this.chuoi.length){
                    this.state = this.chuoi.shift(); this.subTimer = 0; this.faceP();
                    if (SOC_CD[this.state]) this.cd[this.state] = this.cdCua(this.state);
                    return;
                }
                let bo = this.boHienTai().slice();
                this.state = this.pickFrom(bo, bo[0]);
                this.subTimer = 0; this.faceP();
            }
            runSkill(){
                let st = this.state, sp = this.spd(); this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;

                // ============ DOI TU THE: cam vu khi xuong dat, lua cuon len ============
                if (st === 'doi'){
                    this.invulnAll = true;
                    if (T(2)){
                        this.armR = 1.5; shakeTimer = Math.max(shakeTimer, 16);
                        if (SFX.tone) SFX.tone(90, 0.3, 'sawtooth', 0.18, 50);
                    }
                    if (Math.floor(this.subTimer) % 5 === 0 && this.subTimer < SOC_DOI_CHU - 6)
                        visualEffects.push(new Effect(this.cx() + (Math.random()-0.5)*44,
                                                      this.y + this.h - Math.random()*40, 'explosion', true, 10));
                    if (this.subTimer > SOC_DOI_CHU){ this.xongDoi(); }
                    return;
                }
                // ============ CHUYEN PHA: THAN LUA CUA GWYN ============
                if (st === 's_hoi2'){
                    this.invulnAll = true;
                    if (T(2)) floatingTexts.push(new FloatingText(this.cx() - 92, 150, "\"...the First Flame.\""));
                    if (this.subTimer > 26 && Math.floor(this.subTimer) % 6 === 0){
                        socChop = 14;
                        visualEffects.push(new Effect(this.cx() + (Math.random()-0.5)*56,
                                                      this.y + this.h - Math.random()*56, 'explosion', true, 14));
                    }
                    if (T(96)){ shakeTimer = 64; socChop = 40; if (SFX.bossExplode) SFX.bossExplode(); }
                    if (T(118)){
                        // vong xung bao truoc RO, lan cham -> ne duoc (L5)
                        this.vong = { x: this.cx(), r: 10, sp: 5.0, max: 470, hit: false };
                        for (let k = -2; k <= 2; k++) this.datCot(this.cx() + k * 104, 40 + Math.abs(k) * 11, 'set');
                    }
                    if (this.subTimer > 156){ this.invulnAll = false; this.toIdle(20); }
                    return;
                }

                /* ===================== TU THE 1 — KIEM THANG =====================
                   Hans: "dang kiem thi co don LUOT DAM, khong luot het map ma luot mot doan
                   dai va o cuoi thi DAM MOT PHAT tao ra DUONG DAM LUA dot chay mot vung lon…
                   co chieu CHARGE chem tam xa voi COMBO 3 CHEM, tao ra 3 nhat chem MAT TRANG
                   LUA LON ve phia nguoi choi… VUNG KIEM MANH chem tu duoi dat chem len de tao
                   ra SONG LUA NGAY CANG TO."
                   Ba don do doi lai ba cau hoi khac nhau: luot dam hoi "dung o dau", mat trang
                   hoi "luon qua ba lop the nao", song lua hoi "nhay khi nao" — vi no to dan nen
                   nhay som la truot. */
                if (st === 's_ba'){
                    let bao = [6, 26, 56], cham = [14, 34, 70], voi = [112, 118, 132];
                    for (let k = 0; k < 3; k++){
                        if (T(bao[k])){ this.faceP(); this.warn(voi[k], 20, cham[k] - bao[k]); }
                        if (T(cham[k])){
                            this.armR = (k % 2) ? -0.6 : -2.0;
                            this.doSlash(voi[k], 20, 10);
                            this.dashV = this.dir() * (8 + k * 3);
                            if (SFX.tone) SFX.tone(430 - k * 30, 0.05, 'square', 0.10, 220);
                        }
                    }
                    if (this.subTimer > 96) this.toIdle(24);
                    return;
                }
                if (st === 's_luotdam'){
                    /* LUOT MOT DOAN DAI roi DAM. Doan luot co do dai CO DINH (SOC_LUOT_XA), do
                       tu cho han dung — khong bam theo nguoi choi va khong het map. Nghia la cho
                       han se dam la DOC DUOC ngay tu luc bat dau luot, va cach go la roi khoi
                       cai doan do chu khong phai chay xa mai. */
                    if (T(6)){
                        this.faceP(); this.armR = -1.2;
                        this._ldX = this.cx() + this.dir() * SOC_LUOT_XA;
                        this.warn(SOC_LUOT_XA + 60, 8, 40);
                    }
                    if (T(30)){ this.dashV = this.dir() * 27; }
                    if (this.subTimer > 30 && this.subTimer < 58){
                        if (Math.floor(this.subTimer) % 3 === 0) this.ghost();
                    }
                    if (T(58)){
                        this.armR = 0.1; this.doSlash(150, 6, 14); this.dashV = this.dir() * 9;
                        // DUONG DAM LUA: mot dai lua dai chay doc theo huong dam
                        let d = this.dir();
                        for (let k = 0; k < 5; k++)
                            this.themLua(this.cx() + d * (60 + k * 86), 96, SOC_LUA_LAU + k * 8);
                        shakeTimer = 32; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 96) this.toIdle(30);
                    return;
                }
                if (st === 's_trang'){
                    // CHARGE roi ba nhat MAT TRANG LUA bay ve phia nguoi choi, ba do cao khac nhau
                    if (T(6)){ this.faceP(); this.armR = -2.9; this.warn(0, 0, SOC_TRANG_SAC); }
                    if (this.subTimer > 6 && this.subTimer < SOC_TRANG_SAC && Math.floor(this.subTimer) % 5 === 0)
                        visualEffects.push(new Effect(this.cx() + this.dir() * 40, this.y + this.h * 0.4, 'explosion', true, 10));
                    for (let k = 0; k < 3; k++){
                        if (T(SOC_TRANG_SAC + k * 16)){
                            this.faceP();
                            this.armR = (k % 2) ? 0.9 : -1.4;
                            /* Ba nhat o BA DO CAO khac nhau (thap / vua / cao) nen khong the chi
                               nhay mot cai la qua ca ba — phai luon qua tung lop. Nhat nao cung
                               BAN VO DUOC nen van con duong go thu hai (L5). */
                            let cao = [300, 262, 224][k];
                            this.themTrang(this.cx() + this.dir() * 30, cao, this.dir() * (7.4 + k * 0.5), 30 + k * 6);
                            shakeTimer = Math.max(shakeTimer, 16);
                            if (SFX.tone) SFX.tone(300 - k * 40, 0.09, 'sawtooth', 0.14, 150);
                        }
                    }
                    if (this.subTimer > SOC_TRANG_SAC + 66) this.toIdle(30);
                    return;
                }
                if (st === 's_song'){
                    // VUNG KIEM TU DUOI DAT LEN -> mot con song lua chay doc san va TO DAN
                    if (T(8)){ this.faceP(); this.armR = 2.0; this.warn(120, 40, 44); }
                    if (T(52)){
                        this.armR = -2.6; this.doSlash(120, 40, 14);
                        this.song = { x: this.cx() + this.dir() * 56, vx: this.dir() * 6.2,
                                      r: SOC_SONG_R0, t: 0, hit: false };
                        visualEffects.push(new Effect(this.cx() + this.dir() * 56, 300, 'explosion', true, 24));
                        shakeTimer = 34; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 94) this.toIdle(30);
                    return;
                }
                /* ===================== TU THE 2 — KIEM CONG + HOA THUAT =====================
                   Hans: "co dong va nhanh hon nhieu. Cac don tan cong thien ve LAO LAI CAN
                   CHIEN, cac don can chien co the LUOT XA."
                   Nen ca bon don deu ket thuc bang mot cu ap sat, va bang noi chuoi cua tu the
                   nay (`c_mua` noi 95%) gan nhu bat buoc — nem lua xong la lao vao ngay. */
                if (st === 'c_bal'){
                    /* BA LAN LUOT QUA LAI. Moi cu luot co do dai CO DINH va doi chieu sau moi
                       lan, nen han bang qua nguoi choi roi vut nguoc lai — khong luot het map. */
                    if (T(4)){ this.faceP(); this._bd = this.dir(); }
                    for (let k = 0; k < 3; k++){
                        let t0 = 10 + k * 26;
                        if (T(t0 - 6)){
                            this.faceP();                                  // moi lan nhin lai mot lan
                            this._bd = this.dir();
                            this.warn(SOC_BAL_XA, 20, 6);
                        }
                        if (T(t0)){
                            this.facingLeft = (this._bd < 0);
                            this.dashV = this._bd * SOC_BAL_TOC;
                            this.armR = (k % 2) ? 0.8 : -1.9;
                            this.doSlash(124, 22, 16);
                            if (SFX.tone) SFX.tone(520 - k * 40, 0.05, 'square', 0.12, 240);
                        }
                        if (this.subTimer > t0 && this.subTimer < t0 + 14 && Math.floor(this.subTimer) % 2 === 0)
                            this.ghost();
                    }
                    if (this.subTimer > 96) this.toIdle(20);
                    return;
                }
                if (st === 'c_mua'){
                    /* RAT NHIEU DOM LUA NHO nem thanh mot DUONG CONG roi roi xuong NHIEU VI TRI.
                       Cac diem roi trai deu tren mot doan rong quanh nguoi choi va LECH NHIP nhau
                       — nen no la mot vung phai chay xuyen qua, khong phai mot buc tuong (L5).
                       Va Hans: "SAU DO LUOT VAO CHEM" — nen don nay tu no ket bang mot cu ap sat. */
                    if (T(6)){ this.faceP(); this.armR = -2.4; }
                    if (T(20)){
                        let px = dino.x + dino.w/2;
                        for (let k = 0; k < SOC_DOM_SO; k++){
                            let lech = (k - (SOC_DOM_SO - 1) / 2) * 62 + (Math.random() - 0.5) * 24;
                            this.dom.push({ x: this.cx() + this.dir() * 24, y: this.y + this.h * 0.36,
                                            dich: Math.max(40, Math.min(canvas.width - 40, px + lech)),
                                            t: 0, tong: 26 + k * 4, cao: 0 });
                        }
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (T(64)){ this.faceP(); this.warn(130, 24, 18); }
                    if (T(82)){
                        this.dashV = this.dir() * 24; this.armR = -1.7;
                    }
                    if (this.subTimer > 82 && this.subTimer < 100 && Math.floor(this.subTimer) % 3 === 0) this.ghost();
                    if (T(98)){
                        this.armR = 0.9; this.doSlash(130, 24, 14);
                        if (SFX.tone) SFX.tone(500, 0.06, 'square', 0.12, 230);
                    }
                    if (this.subTimer > 124) this.toIdle(24);
                    return;
                }
                if (st === 'c_cau'){
                    /* MOT qua cau lua bay theo DUONG CONG, cham dat thi NO va TACH LAM HAI, hai
                       qua nho bay hai ben roi NO THEM MOT LAN NUA. Ba lan no o ba cho khac nhau
                       tu mot don — nen cho dung an toan doi hai lan trong cung mot doan. */
                    if (T(8)){ this.faceP(); this.armR = -2.5; }
                    if (T(30)){
                        let px = dino.x + dino.w/2, d = this.dir();
                        let xa = Math.max(120, Math.min(420, Math.abs(px - this.cx())));
                        this.bom.push({ x: this.cx() + d * 22, y: this.y + this.h * 0.34,
                                        vx: d * (xa / 46), vy: -7.6, nho: false, hit: false });
                        if (SFX.tone) SFX.tone(200, 0.12, 'sawtooth', 0.14, 100);
                    }
                    if (this.subTimer > 62) this.toIdle(26);
                    return;
                }
                if (st === 'c_xoay'){
                    if (T(6)){ this.faceP(); this.armR = -2.2; }
                    for (let k = 0; k < 2; k++){
                        if (T(20 + k * 18)){
                            this.themHop(this.cx() - 108, this.y - 14, 216, this.h + 22, 0, 8);
                            // "cac don can chien co the LUOT XA" — vong xoay keo han di theo
                            let g = this.gap();
                            this.dashV = Math.sign(g || this.dir()) * 17;
                            visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 18));
                            if (SFX.tone) SFX.tone(360 - k * 50, 0.06, 'square', 0.12, 200);
                        }
                    }
                    if (this.subTimer > 22) this.armR += 0.42 * sp;
                    if (this.subTimer > 62){ this.armR = 0; this.toIdle(22); }
                    return;
                }
                /* ===================== TU THE 3 — DAI BUA =====================
                   Hans: "co chieu NEM BUA vao, NHAY DAP XUONG cho nguoi choi, tan cong bang TAY
                   3 DON, sau do THU BUA VE TU HUONG DA NEM roi khi NHAT LAI DUOC BUA thi XOAY
                   BUA MOT VONG tao ra 2 LOC XOAY sang 2 ben."
                   Day la don dai nhat cua ca pha 1 (~200 khung) va la don duy nhat co mot doan
                   han KHONG CAM VU KHI — ba don tay ngan va gan, nen doan do la cua so phan don
                   ro rang, doi lai doan thu bua ve thi ca duong bay la mot vung cam. */
                if (st === 'b_nem'){
                    if (T(8)){ this.faceP(); this.armR = -2.6; this.warn(120, 30, 26); }
                    if (T(34)){
                        // nem bua di theo huong dang nhin — GHI NHO huong do de thu ve dung duong
                        this.buaBay = { x: this.cx() + this.dir() * 26, y: this.y + this.h * 0.42,
                                        vx: this.dir() * 17, goc: 0, t: 0, pha: 'di', hit: false };
                        this._nemD = this.dir();
                        this.armR = 0.6;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (T(52)){ this.faceP(); this._nx = dino.x + dino.w/2; this.dy = -14.5; this.grounded = false; }
                    if (this.subTimer > 52 && !this.grounded){
                        let dx = (this._nx !== undefined ? this._nx : this.cx()) - this.cx();
                        this.x += Math.max(-12, Math.min(12, dx * 0.15));
                        if (Math.floor(this.subTimer) % 3 === 0) this.ghost();
                    }
                    // BA DON TAY khi da dap xuong — ngan va gan, khong co bua
                    for (let k = 0; k < 3; k++){
                        if (T(92 + k * 20)){ this.faceP(); this.warn(78, 18, 12); }
                        if (T(104 + k * 20)){
                            this.armR = (k % 2) ? -0.4 : -1.6;
                            this.doSlash(78, 18, 9); this.dashV = this.dir() * 7;
                            if (SFX.tone) SFX.tone(300 - k * 24, 0.05, 'triangle', 0.11, 180);
                        }
                    }
                    // THU BUA VE — bay nguoc lai tu cho no cam
                    if (T(160) && this.buaBay){ this.buaBay.pha = 've'; this.buaBay.hit = false; }
                    // NHAT DUOC BUA -> XOAY MOT VONG -> HAI LOC XOAY sang hai ben
                    if (this._buaVe && !this._daLoc){
                        this._daLoc = true; this._locT = this.subTimer;
                        this.armR = -2.0;
                    }
                    if (this._daLoc && this._locT !== undefined){
                        if (this.subTimer > this._locT && this.subTimer < this._locT + 24)
                            this.armR += 0.5 * sp;
                        if (this.subTimer >= this._locT + 24 && !this._daBung){
                            this._daBung = true;
                            this.themHop(this.cx() - 120, this.y - 20, 240, this.h + 28, 0, 9);
                            this.themLoc(this.cx() - 30, -4.2);
                            this.themLoc(this.cx() + 30,  4.2);
                            visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 32));
                            shakeTimer = 42; if (SFX.bossExplode) SFX.bossExplode();
                        }
                    }
                    if ((this._daBung && this.subTimer > (this._locT || 0) + 54) || this.subTimer > 300){
                        this._buaVe = false; this._daLoc = false; this._daBung = false;
                        this._locT = undefined; this._nx = undefined; this.buaBay = null;
                        this.armR = 0; this.toIdle(34);
                    }
                    return;
                }
                if (st === 'b_lon'){
                    /* "dap bua LON VONG dap bua roi LON VONG NHAY BONG LEN dap bua. Combo nay
                       NHANH XA NHAY XA." — nen ba cu dap, giua moi cu la mot cu lon vong keo han
                       di rat xa, va cu cuoi bat len cao roi bo xuong. Tu the bua von cham nhat
                       (nhip 0.86), don nay la ngoai le duy nhat cua no. */
                    if (T(6)){ this.faceP(); this.warn(130, 46, 22); }
                    if (T(28)){
                        this.armR = 1.5; this.doSlash(130, 46, 13);
                        this.vong = { x: this.cx() + this.dir() * 40, r: 8, sp: 6.2, max: 210, hit: false };
                        shakeTimer = 26; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (T(40)){ this.faceP(); this.dashV = this.dir() * 26; this._lon = 1; }   // lon vong 1
                    if (T(62)){ this.faceP(); this.warn(130, 46, 20); }
                    if (T(82)){
                        this.armR = 1.5; this.doSlash(130, 46, 13);
                        this.vong = { x: this.cx() + this.dir() * 40, r: 8, sp: 6.2, max: 210, hit: false };
                        shakeTimer = 26; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (T(94)){                                                                  // lon vong 2 — NHAY BONG
                        this.faceP(); this.dashV = this.dir() * 22;
                        this.dy = -16.5; this.grounded = false; this._lon = 2;
                        this._lx = dino.x + dino.w/2;
                    }
                    if (this.subTimer > 94 && !this.grounded){
                        let dx = (this._lx !== undefined ? this._lx : this.cx()) - this.cx();
                        this.x += Math.max(-10, Math.min(10, dx * 0.10));
                        if (Math.floor(this.subTimer) % 3 === 0) this.ghost();
                    }
                    if (this.subTimer > 104 && this.grounded && !this._lda){
                        this._lda = true; this.armR = 1.6;
                        this.themHop(this.cx() - 78, this.y + this.h - 76, 156, 94, 0, 12);
                        this.vong = { x: this.cx(), r: 8, sp: 7.6, max: 380, hit: false };
                        visualEffects.push(new Effect(this.cx(), 304, 'explosion', true, 36));
                        shakeTimer = 44; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if ((this._lda && this.subTimer > 140) || this.subTimer > 210){
                        this._lda = false; this._lon = 0; this._lx = undefined; this.toIdle(32);
                    }
                    return;
                }
                if (st === 'b_ngang'){
                    if (T(8)){ this.faceP(); this.armR = -2.6; this.warn(236, 40, 50); }
                    if (T(58)){
                        this.armR = 1.1; this.doSlash(236, 40, 18);
                        this.dashV = this.dir() * 10;
                        shakeTimer = 30; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 100) this.toIdle(34);
                    return;
                }
                if (st === 'b_dia'){
                    if (T(8)){ this.faceP(); this.armR = -2.7; this.warn(70, 20, 34); }
                    if (T(42)){
                        this.armR = 1.5; let d = this.dir();
                        for (let k = 0; k < 5; k++) this.datCot(this.cx() + d * (78 + k * 86), 20 + k * 10, 'da');
                        shakeTimer = 36; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 92) this.toIdle(34);
                    return;
                }
                /* ===================== TU THE 4 — GAY PHEP =====================
                   Tu the nay khac ba tu the kia o mot cho co ban: NAM QUA CAU la mot don TU
                   KICH HOAT (xem `tickCau`), chay song song voi bat cu don nao han dang lam.
                   Nen o tu the phep, nguoi choi khong bao gio duoc phep chi nhin MOT thu — do
                   la ly do ba don duoi day deu cham va bao rat ro: cai gap gap da nam o cho khac. */
                if (st === 'p_laser'){
                    /* CHUONG LASER: charge 2 giay roi ban 2 giay, tong 4 giay. Tia DI THEO nguoi
                       choi nhung QUAY CHAM (SOC_LAS_QUAY rad/khung) — chay lien tuc mot huong thi
                       tia bam kip, DOI HUONG thi no luon tre lai. Do la ca cai kho lan duong go. */
                    if (T(4)){
                        this.faceP(); this.armR = -1.9;
                        this.laser = { goc: Math.atan2((dino.y + dino.h*0.5) - (this.y + this.h*0.34),
                                                       (dino.x + dino.w/2) - this.cx()),
                                       t: 0, ngu: 0 };
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 4 && this.subTimer < SOC_LAS_SAC && Math.floor(this.subTimer) % 5 === 0)
                        visualEffects.push(new Effect(this.cx() + this.dir() * 26, this.y + this.h * 0.34, 'explosion', true, 9));
                    if (T(SOC_LAS_SAC)){ this.armR = 0.1; shakeTimer = Math.max(shakeTimer, 22); }
                    if (this.subTimer > SOC_LAS_TONG){ this.laser = null; this.toIdle(32); }
                    return;
                }
                if (st === 'p_kiem'){
                    /* THANH KIEM PHEP KHONG LO chem ngang va HAT TUNG nguoi choi len neu trung.
                       Han khong tu vung — luoi kiem hien ra giua khong trung roi quet mot duong
                       dai. Bao truoc la chinh luoi kiem hien MO DAN, nen doc duoc va ne duoc. */
                    if (T(6)){ this.faceP(); this.armR = -2.2; }
                    if (T(14)){
                        this.kiem = { x: this.cx() + this.dir() * 40, y: 320 - 66,
                                      dir: this.dir(), t: 0, hit: false };
                        if (SFX.tone) SFX.tone(150, 0.4, 'sine', 0.13, 60);
                    }
                    if (this.kiem){
                        this.kiem.t++;
                        if (this.kiem.t === SOC_KIEM_BAO && SFX.bossExplode) SFX.bossExplode();
                        if (this.kiem.t > SOC_KIEM_BAO){
                            this.kiem.x += this.kiem.dir * 15;
                            if (!this.kiem.hit){
                                let r = { x: this.kiem.x - SOC_KIEM_DAI/2, y: 320 - 108, w: SOC_KIEM_DAI, h: 104 };
                                if (checkAABB(dino, r)){
                                    this.kiem.hit = true; this.hurtP(1);
                                    // HAT TUNG: chi hat khi thuc su trung
                                    if (!dino.isShielding()){ dino.dy = -15; dino.grounded = false; }
                                }
                            }
                            if (this.kiem.x < -180 || this.kiem.x > canvas.width + 180) this.kiem = null;
                        }
                    }
                    if (this.subTimer > SOC_KIEM_BAO + 74){ this.kiem = null; this.toIdle(30); }
                    return;
                }
                if (st === 'p_bom'){
                    /* DAT MIN duoi dat — no khi nguoi choi di qua, toi da SOC_MIN_TRAN qua cung
                       luc. Co SOC_MIN_MO khung chua kich hoat de nguoi choi kip doc, va tu het
                       han sau SOC_MIN_LAU khung de san khong bi phu kin dan (L5). */
                    if (T(6)){ this.faceP(); this.armR = 1.2; }
                    if (T(26)){
                        if (this.min.length >= SOC_MIN_TRAN) this.min.shift();
                        let d = this.dir();
                        this.min.push({ x: Math.max(50, Math.min(canvas.width - 50, this.cx() + d * 70)),
                                        t: 0, no: 0, hit: false });
                        if (SFX.tone) SFX.tone(420, 0.09, 'triangle', 0.11, 200);
                    }
                    if (T(46)){
                        if (this.min.length >= SOC_MIN_TRAN) this.min.shift();
                        let d = this.dir();
                        this.min.push({ x: Math.max(50, Math.min(canvas.width - 50, this.cx() + d * 168)),
                                        t: 0, no: 0, hit: false });
                        if (SFX.tone) SFX.tone(380, 0.09, 'triangle', 0.11, 200);
                    }
                    if (this.subTimer > 70) this.toIdle(24);
                    return;
                }
                if (st === 'p_dich'){
                    /* L6: cu dich chuyen TU NO khong gay sat thuong, va sau khi hien lai con 24
                       khung dung im co bao truoc moi vao don noi. */
                    if (T(4)){ this.armR = -2.4; }
                    if (T(16)){
                        this.an = 1; this.invulnAll = true;
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 24));
                    }
                    if (T(34)){
                        let px = dino.x + dino.w/2;
                        let dich = (px < canvas.width/2) ? canvas.width - 150 : 110;
                        this.x = Math.max(8, Math.min(canvas.width - this.w - 8, dich - this.w/2));
                        this.an = 0; this.invulnAll = false; this.faceP();
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 24));
                        this.warn(0, 0, 24);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 62) this.toIdle(16);
                    return;
                }
                /* ===================== PHA 2 — DANG GWYN =====================
                   Hans: "Phase 2 co suc manh HE LUA, HE THANH va quan trong nhat la HE SET."
                   Ba he do chia nhau ba viec khac nhau, khong chong len nhau:
                     - LUA la thu NOI DAI: moi nhat co ban keo theo mot vet lua voi them 78px, va
                       combo chu danh de lai kiem khi lua quet qua ca mot khu.
                     - SET la thu PHU VUNG: nem tia, mua set, giang set — deu la don danh vao MOT
                       KHOANG chu khong vao mot diem, va duoi 50% mau thi set TU danh moi 3 giay.
                     - THANH la thu NHAN BAN: phan than, chi mo khi duoi 50% mau.
                   Tam voi van la xuong song cua ca pha (xem muc 2 cua tai lieu) — lua chi lam
                   no dai them, khong thay the no. */
                if (st === 'w_chuoi5'){
                    /* COMBO 5 DON CHU DANH.
                       Hans: "khi chem thi khong phai chi chem ve phia truoc nguoi choi ma CHEM
                       VE PHIA MAN HINH, nhu vay thi cac don chem se LAN RA CA 2 PHIA… khi chem
                       thi TU BEN NAY CHEM SANG BEN KIA nen that su la dmg CA 2 HUONG nhung
                       HUONG CHINH BI CHEM se tao ra mot KIEM KHI LUA chem qua khu vuc do."
                       Nen moi nhat la HAI hop rieng (trai va phai, moi hop dung 1 sat thuong —
                       L7), va chi phia dang nhin moi sinh kiem khi.
                       Don thu nam la CAM KIEM XUONG: vu no ban kinh 660px, gan 2/3 be ngang san. */
                    let bao  = [6, 34, 62, 90];
                    let cham = [22, 50, 78, 106];
                    for (let k = 0; k < 4; k++){
                        if (T(bao[k])){ this.faceP(); this.warn(SOC_G_XA, 34, cham[k] - bao[k]); }
                        if (T(cham[k])){
                            this.faceP();
                            this.armR = (k % 2) ? -0.5 : -2.2;
                            // HAI PHIA cung an — day la cai lam don nay khac moi don khac
                            this.themHop(this.x - SOC_G_XA, this.y - 30, SOC_G_XA, this.h + 40, 0, 12);
                            this.themHop(this.x + this.w, this.y - 30, SOC_G_XA, this.h + 40, 0, 12);
                            // nhung chi HUONG CHINH moi co kiem khi lua quet di
                            this.themKhi(this.cx() + this.dir() * 40, this.dir(), 104);
                            let gg = this.gap();
                            this.dashV = (gg === 0 ? this.dir() : Math.sign(gg)) *
                                         Math.max(5, Math.min(24, Math.abs(gg) / 6.3));
                            shakeTimer = Math.max(shakeTimer, 20);
                            if (SFX.tone) SFX.tone(330 - k * 22, 0.08, 'square', 0.13, 200);
                        }
                    }
                    // --- DON THU NAM: CAM KIEM XUONG ---
                    if (T(128)){
                        this.faceP(); this.armR = -2.9;
                        floatingTexts.push(new FloatingText(this.cx() - 54, 150, "CHẠY ĐI!"));
                    }
                    if (T(150)){
                        this.armR = 1.55;
                        this.noLon = { x: this.cx(), t: 0, bao: SOC_G_NO_BAO };
                        shakeTimer = Math.max(shakeTimer, 30);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 150 + SOC_G_NO_BAO + 40) this.toIdle(36);
                    return;
                }
                /* ---------- BA DON CO BAN cua Gwyn — deu co VET LUA noi dai ----------
                   Hans: "lua se xuat hien de TANG TAM DANH cho cac don co ban, khi chem se co
                   mot VET LUA giup keo dai don danh them mot khuc nua." Nen ca ba don duoi day
                   goi `themVetLua` ngay sau `doSlash`: mot hop thu hai, cham sau 7 khung va voi
                   dai hon 78px. Ai lui ra vua du tam kiem van an cai duoi lua. */
                if (st === 'w_lao'){
                    if (T(8)){ this.faceP(); this.armR = -1.2; this.warn(210 + SOC_G_VOI, 10, 34); }
                    if (T(42)){
                        this.armR = 0.1; this.doSlash(210, 10, 16); this.themVetLua(210, 10, 16);
                        this.dashV = this.dir() * 34;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 40 && this.subTimer < 62 && Math.floor(this.subTimer) % 3 === 0) this.ghost();
                    if (this.subTimer > 82) this.toIdle(28);
                    return;
                }
                if (st === 'w_vong'){
                    if (T(8)){ this.faceP(); this.armR = -2.4; this.warn(170, 34, 38); }
                    if (T(46)){
                        // vung tron: an CA HAI BEN, va ca hai ben deu co vanh lua noi dai
                        this.themHop(this.cx() - 170, this.y - 26, 340, this.h + 36, 0, 10);
                        this.themHop(this.cx() - 170 - SOC_G_VOI, this.y - 30,
                                     340 + SOC_G_VOI * 2, this.h + 44, SOC_G_TRE, 10);
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 30));
                        shakeTimer = 30; if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 40 && this.subTimer < 76) this.armR += 0.40 * sp;
                    if (this.subTimer > 90){ this.armR = 0; this.toIdle(30); }
                    return;
                }
                if (st === 'w_luot'){
                    // BUOC NHANH cua Gwyn: lui mot buoc roi lap tuc ap vao chem
                    if (T(4)){ this.faceP(); this.dashV = -this.dir() * 18; }
                    if (T(24)){ this.faceP(); this.warn(182 + SOC_G_VOI, 28, 24); }
                    if (T(48)){
                        this.armR = 0.8; this.doSlash(182, 28, 14); this.themVetLua(182, 28, 14);
                        let gg = this.gap();
                        this.dashV = Math.sign(gg || 1) * Math.max(8, Math.min(28, Math.abs(gg) / 6.3));
                        if (SFX.tone) SFX.tone(420, 0.07, 'square', 0.12, 230);
                    }
                    if (this.subTimer > 76) this.toIdle(24);
                    return;
                }
                if (st === 'w_set3'){
                    /* "dua tay len de NHAN LAY SET roi tu ban tay do NEM VUNG QUA LAI 3 LAN."
                       Hans (lan sua): "chieu chuong set 3 lan no phai GIONG DANG NEM RA va co
                       ANIMATION RO RANG HON voi viec SET GIAT MANH ROI MOI NEM de biet luc can
                       ne hay do."

                       Ban truoc chi co MOT doan nap 36 khung o dau roi ba cu nem lien tiep cach
                       nhau 22 khung — tuc la cu thu hai va thu ba khong co bao truoc gi ca, nguoi
                       choi chi thay tia set hien ra. Gio MOI cu nem co vong doi rieng:
                         NAP 26 khung — tay gio len, set tu tu tu tay (`napSet` lon dan)
                         8 khung cuoi  — set GIAT MANH, tay rung, man hinh chop
                         NEM          — tay quat xuong, tia bay ra
                       Ba cu cach nhau 42 khung nen ba lan bao truoc tach bach, doc duoc tung cai. */
                    for (let k = 0; k < 3; k++){
                        let tNem = 30 + k * SOC_SET_NHIP;
                        if (T(tNem - SOC_SET_NAP)){
                            this.faceP(); this.armR = -2.9;
                            this.napSet = { t: 0, tong: SOC_SET_NAP };
                            if (SFX.tone) SFX.tone(190, 0.22, 'sawtooth', 0.11, 70);
                        }
                        if (T(tNem)){
                            this.faceP();
                            this.armR = 0.9;                       // TAY QUAT XUONG — dong tac nem
                            this.napSet = null;
                            let ox = this.cx() + this.dir() * 24, oy = this.y + this.h * 0.28;
                            let g0 = Math.atan2((dino.y + dino.h * 0.5) - oy, (dino.x + dino.w/2) - ox);
                            // ba tia VUNG QUA LAI quanh huong nguoi choi, khong chong khit len nhau
                            this.themTia(ox, oy, g0 + (k - 1) * 0.26, 720);
                            socChop = 26; shakeTimer = Math.max(shakeTimer, 20);
                            if (SFX.tone) SFX.tone(880 - k * 90, 0.09, 'square', 0.14, 260);
                        }
                        // sau cu nem, tay ha ve tu the thuong cho toi luc nap cu ke tiep
                        if (T(tNem + 12)) this.armR = -0.4;
                    }
                    if (this.napSet){
                        this.napSet.t++;
                        let u = this.napSet.t / this.napSet.tong;
                        if (u > 0.68){                             // SET GIAT MANH o doan cuoi
                            socChop = Math.max(socChop, 14);
                            if (Math.floor(this.subTimer) % 2 === 0)
                                visualEffects.push(new Effect(this.cx() + this.dir() * 22 + (Math.random()-0.5)*18,
                                                              this.y - 22 + (Math.random()-0.5)*18, 'explosion', true, 10));
                        }
                    }
                    if (this.subTimer > 30 + 2 * SOC_SET_NHIP + 40){ this.napSet = null; this.toIdle(30); }
                    return;
                }
                if (st === 'w_muaset'){
                    /* "charge de tao ra mot tia set roi NEM LEN TROI de tao thanh mot CON MUA
                       SET lao ve phia nguoi choi." */
                    if (T(6)){ this.faceP(); this.armR = -2.9; }
                    if (this.subTimer > 6 && this.subTimer < 54 && Math.floor(this.subTimer) % 4 === 0){
                        socChop = 12;
                        visualEffects.push(new Effect(this.cx() + (Math.random()-0.5)*40, this.y - 30, 'explosion', true, 10));
                    }
                    if (T(56)){
                        this.armR = -2.2;
                        this.themTia(this.cx(), this.y + 10, -Math.PI/2, 600);   // nem THANG LEN TROI
                        socChop = 40; shakeTimer = 34;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (T(74)){
                        // mua set roi xuong quanh nguoi choi, LECH NHIP nhau nen luon con hanh lang
                        let px = dino.x + dino.w/2;
                        for (let k = 0; k < SOC_MUA_SO; k++){
                            let x0 = px + (k - (SOC_MUA_SO - 1) / 2) * 126 + (Math.random() - 0.5) * 40;
                            this.datCot(Math.max(40, Math.min(canvas.width - 40, x0)), 30 + k * 11, 'set');
                        }
                    }
                    if (this.subTimer > 130) this.toIdle(32);
                    return;
                }
                if (st === 'w_giangset'){
                    /* "nhay len cao, DUNG TREN KHONG TRUNG MOT LUC de thanh kiem nhan lay mot
                       luong lon sam set va GIANG MANH XUONG gay sat thuong mot vung, va o PHIA
                       BI CHEM XUONG thi sam set giat NGUYEN CA KHU ben do cuc lon." */
                    if (T(6)){ this.faceP(); this.armR = -2.6; }
                    if (T(18)){ this.dy = -19; this.grounded = false; }
                    if (T(34)) this._gsY = this.y;                 // ghi lai do cao de TREO dung cho do
                    if (this.subTimer > 18 && this.subTimer < 92){
                        /* TREO tren khong. Chi dat `dy = 0` la KHONG DU: `physics()` chay TRUOC
                           `runSkill()` trong cung mot khung, nen trong luc van keo han xuong deu
                           deu. Do ra chi treo duoc 1 khung. Phai giu ca `y`. */
                        if (this.subTimer > 34){
                            this.dy = 0; this.grounded = false;
                            if (this._gsY !== undefined) this.y = this._gsY;
                        }
                        if (Math.floor(this.subTimer) % 4 === 0){
                            socChop = 14;
                            visualEffects.push(new Effect(this.cx() + (Math.random()-0.5)*54,
                                                          this.y + this.h*0.3, 'explosion', true, 11));
                        }
                        if (T(70)){ this.faceP(); this._gsD = this.dir(); this.warn(SOC_GIANG_KHU, 60, 22); }
                    }
                    if (T(92)){ this.dy = 22; }                       // GIANG XUONG
                    if (this.subTimer > 92 && this.grounded && !this._gsDa){
                        this._gsDa = true; this.armR = 1.55;
                        let d = this._gsD || this.dir();
                        // vung ngay duoi chan
                        this.themHop(this.cx() - 88, this.y + this.h - 84, 176, 100, 0, 12);
                        this.vong = { x: this.cx(), r: 8, sp: 7.4, max: 340, hit: false };
                        // ca KHU ben bi chem: mot day cot set phu kin
                        for (let k = 0; k < SOC_GIANG_COT; k++)
                            this.datCot(this.cx() + d * (70 + k * 96), 16 + k * 7, 'set');
                        socChop = 54; shakeTimer = 60;
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if ((this._gsDa && this.subTimer > 140) || this.subTimer > 230){
                        this._gsDa = false; this._gsD = 0; this.toIdle(34);
                    }
                    return;
                }
                if (st === 'w_dap'){
                    /* DAP + CHUONG LUA. Hans: "nguoi choi tiep can co the bi DAP mot phat bay xa
                       va Boss se CHUONG LUA ve phia nguoi choi bi bay. Chieu dap nay XOA IFRAME
                       nguoi choi luc bi mat mau, luc dap LUOT MOT DOAN NGAN nen chieu nay rat
                       quan trong o viec NE DUOC. Dap gay 1 dmg va chuong gay 1 dmg, nguoi choi
                       bi vang ra CO MOT KHOANG DE NHAY LEN VA NE."
                       Nen day la mot don HAI NHIP: cu dap la mot don 1 sat thuong binh thuong,
                       nhung no xoa i-frame de cu chuong theo sau CO THE cham — tuc la 1+1, KHONG
                       phai mot hop 2 dmg (van dung L7). Va khoang tre 30 khung giua hai nhip
                       chinh la cua so de nhay len. */
                    if (T(6)){ this.faceP(); this.armR = -0.9; this.warn(96, 22, 20); }
                    if (T(26)){
                        let gg0 = this.gap(), toi0 = Math.max(0, Math.abs(gg0) - 60);
                        this.dashV = (Math.sign(gg0) || this.dir()) * Math.max(3, Math.min(16, toi0 / 5.5));
                        this.armR = 0.4;
                        let r = this.dir() < 0 ? { x: this.x - 96, y: this.y + 10, w: 96, h: this.h - 10 }
                                               : { x: this.x + this.w, y: this.y + 10, w: 96, h: this.h - 10 };
                        if (checkAABB(dino, r)){
                            this._dapTrung = true;
                            this.hurtP(1);
                            if (!dino.isShielding()){
                                dino.x += this.dir() * 190;        // VANG RA XA
                                dino.dy = -7; dino.grounded = false;
                                dino.invTimer = 0; dino.invincible = false;   // XOA I-FRAME
                            }
                            dino.x = Math.max(6, Math.min(canvas.width - dino.w - 6, dino.x));
                            shakeTimer = 26; if (SFX.bossExplode) SFX.bossExplode();
                        }
                    }
                    if (T(56)){ this.faceP(); this.armR = -1.6; this.warn(330, 30, 20); }
                    if (T(76)){
                        // CHUONG LUA duoi theo nguoi choi vua bi vang ra
                        this.armR = 0.2;
                        let d = this.dir();
                        this.themHop(d < 0 ? this.x - 330 : this.x + this.w, this.y - 16, 330, this.h + 26, 0, 14);
                        for (let k = 0; k < 3; k++)
                            visualEffects.push(new Effect(this.cx() + d * (90 + k * 96), this.y + this.h * 0.5, 'explosion', true, 26));
                        shakeTimer = 30; if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 110){ this._dapTrung = false; this.toIdle(28); }
                    return;
                }
                if (st === 'w_bat'){
                    /* CHIEU BAT. Hans: "Chup nguoi choi lai, dua len khong va PHUN LUA CUC MANH
                       vao nguoi choi, gay 2 SAT THUONG. Boss LUOT TOI MOT DOAN NGAN de bat nguoi
                       choi, co ANIMATION RIENG."
                       ---
                       Day la NGOAI LE DAU TIEN duoc phep cua @@LUAT-BOSS L7 ("khong don nao 2
                       dmg"), va no la ngoai le vi HANS DAT RA TRUC TIEP. Doi lai no phai dat
                       tieu chuan cao hon moi don khac:
                         - tam BAT rat ngan (96px) va chi cham DUNG MOT KHUNG o khung 30;
                         - co bao truoc 24 khung truoc do;
                         - DO DUOC: dang gio khien thi khong bi bat.
                       Bat truot thi han dung ngan mot nhip — do la cua so phan don. */
                    if (T(4)){ this.faceP(); this.armR = -1.0; this.warn(96, 20, 26); }
                    if (T(22)){
                        /* Cu luot phai TINH THEO KHOANG CACH. Do lan dau de co dinh 17: sau 8
                           khung han di duoc ~90px, nen neu nguoi choi dang dung sat thi han VUT
                           QUA roi moi chup — hop bat (voi ve phia truoc) khong con nguoi choi
                           trong do. Do ra: bat KHONG BAO GIO trung. */
                        let gg = this.gap(), toi = Math.max(0, Math.abs(gg) - 70);
                        this.dashV = (Math.sign(gg) || this.dir()) * Math.max(3, Math.min(18, toi / 5.5));
                    }
                    if (T(30)){
                        this.faceP();
                        let r = this.dir() < 0 ? { x: this.x - 120, y: this.y - 10, w: 120, h: this.h + 14 }
                                               : { x: this.x + this.w, y: this.y - 10, w: 120, h: this.h + 14 };
                        if (checkAABB(dino, r) && !dino.isShielding()){
                            this.bat = { t: 0 };
                            if (SFX.bossSkill) SFX.bossSkill();
                        } else {
                            this._batTruot = true;                 // bat truot -> dung ngan mot nhip
                        }
                    }
                    if (this.bat){
                        this.bat.t++;
                        this.dashV = 0;
                        // GIU nguoi choi tren khong ngay truoc mat han
                        dino.x = this.cx() + this.dir() * 44 - dino.w/2;
                        dino.y = this.y - 26; dino.dy = 0; dino.grounded = false;
                        if (this.bat.t < 20) this.armR = -1.4;
                        else {
                            // PHUN LUA
                            this.armR = 0.3;
                            if (Math.floor(this.bat.t) % 3 === 0)
                                visualEffects.push(new Effect(dino.x + dino.w/2 + (Math.random()-0.5)*26,
                                                              dino.y + dino.h/2, 'explosion', true, 18));
                        }
                        if (this.bat.t === 44){
                            dino.takeDamage(2);                    // HAI sat thuong — ngoai le co phep
                            shakeTimer = 46; if (SFX.bossExplode) SFX.bossExplode();
                        }
                        if (this.bat.t > 62){
                            dino.dy = -9; dino.x += this.dir() * 60;
                            dino.x = Math.max(6, Math.min(canvas.width - dino.w - 6, dino.x));
                            this.bat = null; this.toIdle(40); return;
                        }
                        return;
                    }
                    if (this.subTimer > (this._batTruot ? 76 : 60)){ this._batTruot = false; this.toIdle(34); }
                    return;
                }
                if (st === 'w_kydi'){
                    /* DIEM KY DI — loc xoay lua nhu mot ho den. Dat o CHO NGUOI CHOI DANG DUNG,
                       nen ngay tu dau nguoi choi da o trong vung, va cach duy nhat la di NGUOC
                       huong hut. Vi luc hut manh dan theo do mo rong, chay bo thuan tuy khong
                       du — phai dash. */
                    if (T(6)){ this.faceP(); this.armR = -2.4; }
                    if (T(30)){
                        this.kydi = { x: dino.x + dino.w/2, t: 0, r: SOC_KYDI_R0, no: 0 };
                        floatingTexts.push(new FloatingText(this.kydi.x - 40, 160, "KỲ DỊ"));
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > 58) this.toIdle(30);
                    return;
                }
                /* ---------- BO HE THANH: CHI MO DUOI 50% MAU ---------- */
                if (st === 'w_ptTren'){
                    /* "Bay len cao la PHAT SANG VANG KIM, tao ra cac PHAN THAN danh xuong tu co
                       the goc chem xuong bien mat lien tuc, chieu nay chem xuong VI TRI DUNG
                       HIEN TAI cua nguoi choi moi 0.5 giay voi 5 phan than, va cuoi cung Boss
                       LAO XUONG tao ra mot vu no manh o cho do." */
                    if (T(6)){ this.faceP(); this.armR = -2.6; this.invulnAll = false; }
                    if (T(16)){ this.dy = -21; this.grounded = false; this.sang = 1; }
                    if (T(34)) this._ptY = this.y;
                    if (this.subTimer > 16 && this.subTimer < 44 + SOC_G_PT_SO * SOC_G_PT_NHIP + 14){
                        // treo tren cao — giu ca y, xem ghi chu o `w_giangset`
                        if (this.subTimer > 34){
                            this.dy = 0; this.grounded = false;
                            if (this._ptY !== undefined) this.y = this._ptY;
                        }
                    }
                    /* Chot GOC va HUONG mot lan duy nhat, ngay truoc con dau tien. Ban truoc
                       lay `dino.x` moi lan va tu suy huong theo vi tri boss, nen nam con roi rac
                       khap san va quay lung lung tung — doc ra la nam don rieng le chu khong phai
                       mot chuoi. */
                    if (T(42)){
                        let px = dino.x + dino.w/2;
                        this._ptD = (px < this.cx()) ? 1 : -1;      // huong chem, chot mot lan
                        this._ptGoc = px - this._ptD * SOC_PT_BUOC; // con dau roi hoi LUI mot buoc
                    }
                    for (let k = 0; k < SOC_G_PT_SO; k++){
                        if (T(44 + k * SOC_G_PT_NHIP)){
                            let d = this._ptD || 1;
                            let x0 = (this._ptGoc !== undefined ? this._ptGoc : this.cx()) + d * k * SOC_PT_BUOC;
                            this.themPhanThan(Math.max(40, Math.min(canvas.width - 40, x0)),
                                              320 - this.h, d, 0, true);   // true = ROI TU TREN XUONG
                            socChop = 12;
                            if (SFX.tone) SFX.tone(700 - k * 30, 0.05, 'sine', 0.10, 280);
                        }
                    }
                    let tCuoi = 44 + SOC_G_PT_SO * SOC_G_PT_NHIP + 16;
                    if (T(tCuoi)){ this._ptX = dino.x + dino.w/2; this.dy = 24; }
                    if (this.subTimer > tCuoi && this._ptX !== undefined && !this.grounded){
                        let dx = this._ptX - this.cx();
                        this.x += Math.max(-16, Math.min(16, dx * 0.2));
                    }
                    if (this.subTimer > tCuoi && this.grounded && !this._ptDa){
                        this._ptDa = true; this.armR = 1.55; this.sang = 0;
                        this.themHop(this.cx() - 100, this.y + this.h - 92, 200, 110, 0, 12);
                        this.vong = { x: this.cx(), r: 8, sp: 8.0, max: 420, hit: false };
                        socChop = 48; shakeTimer = 58;
                        visualEffects.push(new Effect(this.cx(), 302, 'explosion', true, 46));
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if ((this._ptDa && this.subTimer > tCuoi + 50) || this.subTimer > 340){
                        this._ptDa = false; this._ptX = undefined; this.sang = 0; this.toIdle(36);
                    }
                    return;
                }
                if (st === 'w_ptNgang'){
                    /* "Boss chem nguoi choi mot phat, o TAI CHO nhu co mot phan than ngay lap tuc
                       chem nguoi choi tiep roi bien mat, va lap lai moi 0.5 giay voi 5 phan than,
                       roi boss LUOT XUYEN QUA vi tri nguoi choi." */
                    if (T(6)){ this.faceP(); this.armR = -2.2; this.warn(170, 30, 20); this.sang = 1; }
                    if (T(26)){
                        this.armR = 0.8; this.doSlash(170, 30, 12); this.themVetLua(170, 30, 12);
                        if (SFX.tone) SFX.tone(420, 0.06, 'square', 0.12, 230);
                    }
                    /* Cung mot quy tac voi `w_ptTren`: MOT huong, mot goc, cac con cach nhau
                       dung SOC_PT_BUOC px. Ban truoc doi ben moi con (`k % 2 ? 1 : -1`) nen nam
                       nhat chem tu hai phia, khong doc ra duoc la mot chuoi. */
                    if (T(38)){
                        let px = dino.x + dino.w/2;
                        this._pnD2 = (px < this.cx()) ? 1 : -1;
                        this._pnGoc = px - this._pnD2 * SOC_PT_BUOC;
                    }
                    for (let k = 0; k < SOC_G_PT_SO; k++){
                        if (T(40 + k * SOC_G_PT_NHIP)){
                            let d = this._pnD2 || 1;
                            let x0 = (this._pnGoc !== undefined ? this._pnGoc : this.cx()) + d * k * SOC_PT_BUOC;
                            this.themPhanThan(Math.max(40, Math.min(canvas.width - 40, x0)),
                                              320 - this.h, d, 0, false);  // dung tai cho, khong roi
                            socChop = 10;
                            if (SFX.tone) SFX.tone(600 - k * 26, 0.04, 'sine', 0.09, 300);
                        }
                    }
                    let tX = 40 + SOC_G_PT_SO * SOC_G_PT_NHIP + 14;
                    if (T(tX)){
                        this.faceP();
                        this.warn(260, 30, 16);
                        this._pnD = this.dir();
                    }
                    if (T(tX + 16)){
                        // LUOT XUYEN QUA vi tri nguoi choi
                        this.dashV = (this._pnD || 1) * 32;
                        this.doSlash(150, 28, 22); this.themVetLua(150, 28, 22);
                        shakeTimer = 30; if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (this.subTimer > tX + 16 && this.subTimer < tX + 48 && Math.floor(this.subTimer) % 2 === 0)
                        this.ghost();
                    if (this.subTimer > tX + 60){ this.sang = 0; this._pnD = 0; this.toIdle(30); }
                    return;
                }
                this.toIdle(24);
            }

            draw(){
                // ---- vung bao truoc ----
                if (this.tel && this.tel.reach > 0){
                    let a = this.tel, u = 1 - a.t / a.max;
                    let r = a.dir < 0 ? { x: this.x - a.reach, y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 }
                                      : { x: this.x + this.w,  y: this.y + 4 - a.up, w: a.reach, h: this.h + a.up - 4 };
                    ctx.save();
                    ctx.globalAlpha = 0.14 + 0.22 * u;
                    ctx.fillStyle = this.stage === 2 ? "#FFD54F" : SOC_MAU[this.tu];
                    ctx.fillRect(r.x, r.y, r.w, r.h);
                    ctx.globalAlpha = 0.5 + 0.4 * u;
                    ctx.strokeStyle = this.stage === 2 ? "#FFF59D" : "#ECEFF1"; ctx.lineWidth = 2;
                    ctx.strokeRect(r.x, r.y, r.w, r.h);
                    ctx.restore();
                }
                // ---- cot lua / da / set ----
                for (let s of this.cot){
                    ctx.save();
                    let cao = s.loai === 'set' ? (320 + CAM_TROI) : (s.loai === 'da' ? 86 : 104);
                    if (s.no > 0){
                        let u = s.no / 18;
                        ctx.globalAlpha = 0.92 * u;
                        if (s.loai === 'da'){
                            ctx.fillStyle = "#6D5B4E";
                            ctx.beginPath();
                            ctx.moveTo(s.x - 26, 320); ctx.lineTo(s.x, 320 - cao * (0.5 + 0.5 * u)); ctx.lineTo(s.x + 26, 320);
                            ctx.closePath(); ctx.fill();
                            ctx.strokeStyle = "#B0A497"; ctx.lineWidth = 2; ctx.stroke();
                        } else {
                            let g = ctx.createLinearGradient(0, 320 - cao, 0, 320);
                            if (s.loai === 'set'){
                                g.addColorStop(0, "rgba(255,245,157,0)");
                                g.addColorStop(0.42, "rgba(255,241,118,0.92)");
                                g.addColorStop(1, "rgba(255,255,255,0.96)");
                            } else {
                                g.addColorStop(0, "rgba(255,171,64,0)");
                                g.addColorStop(0.45, "rgba(255,112,67,0.92)");
                                g.addColorStop(1, "rgba(255,224,130,0.96)");
                            }
                            ctx.fillStyle = g;
                            let w = (s.loai === 'set' ? 40 : 60) * (0.55 + 0.45 * u);
                            ctx.fillRect(s.x - w/2, 320 - cao, w, cao);
                        }
                    } else {
                        let u = Math.max(0, Math.min(1, 1 - s.t / (s.tong || 52)));
                        ctx.globalAlpha = 0.32 + 0.5 * u;
                        ctx.strokeStyle = s.loai === 'set' ? "#FFF176" : (s.loai === 'da' ? "#BCAAA4" : "#FF7043");
                        ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.ellipse(s.x, 316, 30 * (0.35 + 0.65 * u), 9, 0, 0, 6.28); ctx.stroke();
                        ctx.fillStyle = s.loai === 'set' ? "rgba(255,241,118,0.28)" : "rgba(255,112,67,0.28)";
                        ctx.beginPath(); ctx.ellipse(s.x, 316, 30 * (0.35 + 0.65 * u), 9, 0, 0, 6.28); ctx.fill();
                    }
                    ctx.restore();
                }
                // ---- KIEM KHI LUA ----
                for (let k of this.khi){
                    ctx.save();
                    ctx.translate(k.x, 320 - k.cao * 0.5);
                    ctx.scale(k.dir, 1);
                    ctx.globalAlpha = Math.max(0, 0.92 - k.t / 130);
                    let g = ctx.createLinearGradient(-k.r, 0, k.r, 0);
                    g.addColorStop(0, "rgba(255,241,118,0.10)");
                    g.addColorStop(0.5, "rgba(255,112,67,0.95)");
                    g.addColorStop(1, "rgba(255,253,231,0.98)");
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, k.r * 0.45, k.cao * 0.55, 0, 0, 6.28);
                    ctx.fill();
                    ctx.globalAlpha *= 0.6;
                    ctx.strokeStyle = "#FFF59D"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.ellipse(-k.r * 0.16, 0, k.r * 0.3, k.cao * 0.42, 0, 0, 6.28); ctx.stroke();
                    ctx.restore();
                }
                // ---- TIA SET VANG ----
                for (let t2 of this.tia){
                    ctx.save();
                    let u = Math.max(0, 1 - t2.t / 20);
                    ctx.globalAlpha = 0.35 + 0.65 * u;
                    for (let lop = 0; lop < 3; lop++){
                        ctx.strokeStyle = lop === 0 ? "#FFF59D" : (lop === 1 ? "#FFD54F" : "#FFFFFF");
                        ctx.lineWidth = lop === 0 ? 20 : (lop === 1 ? 11 : 4);
                        ctx.globalAlpha = (0.24 + 0.5 * u) * (lop === 2 ? 1.5 : 1);
                        ctx.beginPath(); ctx.moveTo(t2.x0, t2.y0);
                        for (let k = 1; k <= 10; k++){
                            let d = t2.dai * k / 10;
                            let lech = (k === 10) ? 0 : Math.sin(k * 2.7 + t2.nhieu + lop) * 18;
                            ctx.lineTo(t2.x0 + Math.cos(t2.goc) * d - Math.sin(t2.goc) * lech,
                                       t2.y0 + Math.sin(t2.goc) * d + Math.cos(t2.goc) * lech);
                        }
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // ---- DIEM KY DI ----
                if (this.kydi){
                    let k = this.kydi;
                    ctx.save();
                    if (k.no){
                        let u = k.no / 20;
                        ctx.globalAlpha = 0.95 * u;
                        let g = ctx.createRadialGradient(k.x, 320 - k.r * 0.7, 6, k.x, 320 - k.r * 0.7, k.r * 1.5);
                        g.addColorStop(0, "rgba(255,253,231,0.98)"); g.addColorStop(0.4, "rgba(255,112,67,0.9)");
                        g.addColorStop(1, "rgba(191,54,12,0)");
                        ctx.fillStyle = g;
                        ctx.beginPath(); ctx.arc(k.x, 320 - k.r * 0.7, k.r * 1.5, 0, 6.28); ctx.fill();
                    } else {
                        let u = k.t / SOC_KYDI_LAU;
                        // LOI TOI o giua + cac canh lua xoay quanh — doc ra la "hut vao"
                        for (let lop = 0; lop < 5; lop++){
                            let a = frames * (0.10 + lop * 0.03) + lop * 1.25;
                            let rr = k.r * (0.45 + lop * 0.16);
                            ctx.globalAlpha = 0.5 - lop * 0.07;
                            let g = ctx.createLinearGradient(k.x - rr, 0, k.x + rr, 0);
                            g.addColorStop(0, "rgba(255,171,64,0)");
                            g.addColorStop(0.5, "rgba(255,112,67,0.85)");
                            g.addColorStop(1, "rgba(255,171,64,0)");
                            ctx.fillStyle = g;
                            ctx.beginPath();
                            ctx.ellipse(k.x, 320 - k.r * 0.7, rr, rr * 0.42, a, a % 6.28, (a % 6.28) + 3.0);
                            ctx.lineTo(k.x, 320 - k.r * 0.7); ctx.closePath(); ctx.fill();
                        }
                        ctx.globalAlpha = 0.9;
                        ctx.fillStyle = "#1A0A06";
                        ctx.beginPath(); ctx.arc(k.x, 320 - k.r * 0.7, k.r * 0.30, 0, 6.28); ctx.fill();
                        // vanh bao vung no sap toi
                        ctx.globalAlpha = 0.24 + 0.4 * u;
                        ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 2 + 3 * u;
                        ctx.setLineDash([14, 10]); ctx.lineDashOffset = -frames;
                        ctx.beginPath(); ctx.ellipse(k.x, 316, SOC_KYDI_RMAX * u, 16 * u, 0, 0, 6.28); ctx.stroke();
                        ctx.setLineDash([]);
                    }
                    ctx.restore();
                }
                // ---- VU NO KINH THIEN khi cam kiem ----
                if (this.noLon){
                    let n = this.noLon;
                    ctx.save();
                    if (n.t < n.bao){
                        // BAO TRUOC: vanh do lon dan toi dung ban kinh that — nguoi choi phai
                        // nhin vanh nay de biet chay bao xa moi thoat
                        let u = n.t / n.bao;
                        ctx.globalAlpha = 0.22 + 0.5 * u;
                        ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 4 + 6 * u;
                        ctx.setLineDash([22, 14]); ctx.lineDashOffset = -frames * 1.6;
                        ctx.beginPath(); ctx.ellipse(n.x, 316, SOC_G_NO_R * u, 40 * u, 0, 0, 6.28); ctx.stroke();
                        ctx.setLineDash([]);
                        ctx.globalAlpha = 0.12 * u;
                        ctx.fillStyle = "#FF5252";
                        ctx.fillRect(n.x - SOC_G_NO_R * u, -CAM_TROI, SOC_G_NO_R * 2 * u, 320 + CAM_TROI);
                    } else {
                        let u = Math.max(0, 1 - (n.t - n.bao) / 34);
                        ctx.globalAlpha = 0.95 * u;
                        let g = ctx.createRadialGradient(n.x, 300, 20, n.x, 300, SOC_G_NO_R);
                        g.addColorStop(0, "rgba(255,255,255,0.98)");
                        g.addColorStop(0.28, "rgba(255,241,118,0.92)");
                        g.addColorStop(0.62, "rgba(255,112,67,0.72)");
                        g.addColorStop(1, "rgba(191,54,12,0)");
                        ctx.fillStyle = g;
                        ctx.fillRect(n.x - SOC_G_NO_R, -CAM_TROI, SOC_G_NO_R * 2, 320 + CAM_TROI);
                    }
                    ctx.restore();
                }
                /* ---- SET GIAT TRONG TAY truoc cu nem ----
                   Day la ca cai bao truoc cua don nem set: qua cau lon dan trong 26 khung, va o
                   1/3 cuoi thi NO GIAT — vong ngoai rung, tia loe ra tung nhip. Nguoi choi doc
                   cai giat do de biet cu nem sap ra. */
                if (this.napSet){
                    let n = this.napSet, u = Math.min(1, n.t / n.tong);
                    let hx = this.cx() + this.dir() * 22, hy = this.y - 22;
                    let giat = u > 0.68;
                    ctx.save();
                    let R = 9 + 20 * u + (giat ? Math.sin(frames * 1.4) * 4 : 0);
                    let g = ctx.createRadialGradient(hx, hy, 1, hx, hy, R * 1.9);
                    g.addColorStop(0, "rgba(255,255,255,0.98)");
                    g.addColorStop(0.35, "rgba(255,241,118,0.92)");
                    g.addColorStop(1, "rgba(255,193,7,0)");
                    ctx.fillStyle = g;
                    ctx.beginPath(); ctx.arc(hx, hy, R * 1.9, 0, 6.28); ctx.fill();
                    // tia set gay khuc toa ra tu qua cau
                    let soTia = giat ? 7 : 4;
                    ctx.strokeStyle = "#FFF59D"; ctx.lineWidth = giat ? 3 : 1.8;
                    ctx.globalAlpha = 0.5 + 0.5 * u;
                    for (let k = 0; k < soTia; k++){
                        let a = (frames * 0.22 + k * 6.283 / soTia) % 6.283;
                        let L = R * (1.5 + (giat ? 1.5 : 0.7) * Math.abs(Math.sin(frames * 0.4 + k)));
                        ctx.beginPath(); ctx.moveTo(hx, hy);
                        ctx.lineTo(hx + Math.cos(a) * L * 0.55 - Math.sin(a) * 7,
                                   hy + Math.sin(a) * L * 0.55 + Math.cos(a) * 7);
                        ctx.lineTo(hx + Math.cos(a) * L, hy + Math.sin(a) * L);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // ---- PHAN THAN HE THANH ----
                for (let o of this.pt){
                    if (o.cho > 0) continue;
                    ctx.save();
                    if (o.pha === 'roi'){
                        /* dang ROI XUONG: ve vet sang keo dai tu tren cao xuong, de doc ra la
                           mot than hinh DANG LAO XUONG chu khong phai mot hinh tu nhien hien ra */
                        ctx.globalAlpha = 0.34;
                        let g2 = ctx.createLinearGradient(o.x, o.y - 140, o.x, o.y + SOC_H2);
                        g2.addColorStop(0, "rgba(255,241,118,0)");
                        g2.addColorStop(1, "rgba(255,253,231,0.85)");
                        ctx.fillStyle = g2;
                        ctx.fillRect(o.x - 13, o.y - 140, 26, 140 + SOC_H2 * 0.5);
                        ctx.globalAlpha = 0.72;
                        drawCinderBody({ facingLeft: o.dir < 0, w: SOC_W2, h: SOC_H2,
                                         armR: -2.7, stage: 2, tu: 'thang',
                                         walk: 0, sac: 1, tuMoi: null, an: 0 },
                                       o.x - SOC_W2/2, o.y);
                        ctx.restore();
                        continue;
                    }
                    let u = o.t / SOC_PT_BAO;
                    ctx.globalAlpha = o.cham ? Math.max(0, 1 - (o.t - SOC_PT_BAO) / 12) * 0.9
                                             : 0.22 + 0.5 * Math.min(1, u);
                    drawCinderBody({ facingLeft: o.dir < 0, w: SOC_W2, h: SOC_H2,
                                     armR: o.cham ? 0.9 : -2.4, stage: 2, tu: 'thang',
                                     walk: 0, sac: 1, tuMoi: null, an: 0 },
                                   o.x - SOC_W2/2, o.y);
                    if (o.cham){
                        ctx.globalAlpha = 0.72;
                        let g = ctx.createLinearGradient(o.x, 0, o.x + o.dir * 150, 0);
                        g.addColorStop(0, "rgba(255,253,231,0.95)");
                        g.addColorStop(1, "rgba(255,241,118,0)");
                        ctx.fillStyle = g;
                        ctx.fillRect(o.dir < 0 ? o.x - 150 : o.x, o.y - 20, 150, 110);
                    }
                    ctx.restore();
                }
                // ---- VET LUA tren mat dat ----
                for (let f of this.lua){
                    ctx.save();
                    let u = Math.min(1, f.t / 24);                 // tat dan o cuoi doi
                    ctx.globalAlpha = 0.55 * u;
                    let g = ctx.createLinearGradient(0, 320 - 40, 0, 320);
                    g.addColorStop(0, "rgba(255,171,64,0)");
                    g.addColorStop(0.5, "rgba(255,112,67,0.85)");
                    g.addColorStop(1, "rgba(255,224,130,0.95)");
                    ctx.fillStyle = g;
                    for (let k = 0; k < 4; k++){
                        let ww = f.w * (0.5 + 0.12 * k);
                        let hh = 20 + 16 * Math.abs(Math.sin(frames * 0.16 + k + f.x * 0.01));
                        ctx.fillRect(f.x - ww/2, 320 - hh, ww, hh);
                    }
                    ctx.restore();
                }
                // ---- NHAT CHEM MAT TRANG ----
                for (let m of this.trang){
                    ctx.save();
                    ctx.translate(m.x, m.y);
                    ctx.scale(m.vx < 0 ? -1 : 1, 1);
                    ctx.globalAlpha = 0.9;
                    let g = ctx.createLinearGradient(-m.r * 0.5, 0, m.r * 0.5, 0);
                    g.addColorStop(0, "rgba(255,241,118,0.15)");
                    g.addColorStop(0.55, "rgba(255,112,67,0.95)");
                    g.addColorStop(1, "rgba(255,245,157,0.98)");
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, m.r * 0.42, m.r, -0.24, 0, 6.28);
                    ctx.fill();
                    ctx.globalAlpha = 0.5;
                    ctx.strokeStyle = "#FFF59D"; ctx.lineWidth = 2.4;
                    ctx.beginPath(); ctx.ellipse(-m.r * 0.16, 0, m.r * 0.30, m.r * 0.82, -0.24, 0, 6.28); ctx.stroke();
                    ctx.restore();
                }
                // ---- SONG LUA LON DAN ----
                if (this.song){
                    let s2 = this.song;
                    ctx.save();
                    ctx.globalAlpha = 0.86;
                    let g = ctx.createLinearGradient(0, 320 - s2.r * 1.5, 0, 320);
                    g.addColorStop(0, "rgba(255,245,157,0)");
                    g.addColorStop(0.45, "rgba(255,112,67,0.92)");
                    g.addColorStop(1, "rgba(255,224,130,0.98)");
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.moveTo(s2.x - s2.r * 0.62, 320);
                    for (let k = 0; k <= 8; k++){
                        let u = k / 8;
                        ctx.lineTo(s2.x - s2.r * 0.62 + s2.r * 1.24 * u,
                                   320 - s2.r * 1.5 * Math.sin(u * Math.PI) *
                                        (0.8 + 0.2 * Math.sin(frames * 0.3 + k)));
                    }
                    ctx.lineTo(s2.x + s2.r * 0.62, 320);
                    ctx.closePath(); ctx.fill();
                    ctx.restore();
                }
                // ---- DOM LUA dang bay theo cung ----
                for (let o of this.dom){
                    let u = o.t / o.tong;
                    let px = o.x + (o.dich - o.x) * u, py = 320 - 14 - o.cao;
                    ctx.save();
                    ctx.globalAlpha = 0.9;
                    let g = ctx.createRadialGradient(px, py, 1, px, py, 11);
                    g.addColorStop(0, "rgba(255,245,157,0.98)"); g.addColorStop(0.5, "rgba(255,112,67,0.8)");
                    g.addColorStop(1, "rgba(191,54,12,0)");
                    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, 11, 0, 6.28); ctx.fill();
                    // dau cham bao TRUOC cho roi — day la duong go cua don nay
                    ctx.globalAlpha = 0.30 + 0.3 * u;
                    ctx.strokeStyle = "#FF7043"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.ellipse(o.dich, 316, 26, 7, 0, 0, 6.28); ctx.stroke();
                    ctx.restore();
                }
                // ---- QUA CAU LUA TACH DOI ----
                for (let q of this.bom){
                    ctx.save();
                    let r = q.nho ? 11 : 17;
                    let g = ctx.createRadialGradient(q.x, q.y, 1, q.x, q.y, r * 1.6);
                    g.addColorStop(0, "rgba(255,253,231,0.98)"); g.addColorStop(0.42, "rgba(255,112,67,0.9)");
                    g.addColorStop(1, "rgba(191,54,12,0)");
                    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x, q.y, r * 1.6, 0, 6.28); ctx.fill();
                    ctx.restore();
                }
                // ---- BUA DANG BAY ----
                if (this.buaBay){
                    let b2 = this.buaBay;
                    ctx.save();
                    ctx.translate(b2.x, b2.y); ctx.rotate(b2.goc);
                    ctx.fillStyle = "#4A3A31"; ctx.fillRect(-30, -4, 60, 8);
                    ctx.fillStyle = "#6D5B4E"; ctx.fillRect(20, -18, 26, 36);
                    ctx.fillStyle = "#B0BEC5"; ctx.fillRect(20, -18, 26, 6);
                    ctx.strokeStyle = "#1A1513"; ctx.lineWidth = 2.2; ctx.strokeRect(20, -18, 26, 36);
                    ctx.restore();
                    if (b2.pha === 'cam'){    // dang cam duoi dat: bao cho biet no se bay VE huong nao
                        ctx.save(); ctx.globalAlpha = 0.28 + 0.2 * Math.sin(frames * 0.2);
                        ctx.strokeStyle = "#B0BEC5"; ctx.lineWidth = 2; ctx.setLineDash([10, 8]);
                        ctx.beginPath(); ctx.moveTo(b2.x, b2.y); ctx.lineTo(this.cx(), this.y + this.h * 0.5); ctx.stroke();
                        ctx.setLineDash([]); ctx.restore();
                    }
                }
                // ---- LOC XOAY ----
                for (let o of this.loc){
                    ctx.save();
                    ctx.globalAlpha = 0.62;
                    for (let k = 0; k < 4; k++){
                        let yy = 320 - 16 - k * 22, rr = 12 + k * 7;
                        let ox = Math.sin(frames * 0.34 + k * 1.1 + o.t * 0.1) * 7;
                        let g = ctx.createLinearGradient(o.x - rr, yy, o.x + rr, yy);
                        g.addColorStop(0, "rgba(176,190,197,0)");
                        g.addColorStop(0.5, "rgba(207,216,220,0.75)");
                        g.addColorStop(1, "rgba(176,190,197,0)");
                        ctx.fillStyle = g;
                        ctx.beginPath(); ctx.ellipse(o.x + ox, yy, rr, 9, 0, 0, 6.28); ctx.fill();
                    }
                    ctx.restore();
                }
                // ---- NAM QUA CAU TU DONG ----
                for (let q of this.cau){
                    ctx.save();
                    let nh = q.pha === 'giu' ? (0.6 + 0.4 * Math.sin(frames * 0.25 + q.ang)) : 1;
                    let g = ctx.createRadialGradient(q.x, q.y, 1, q.x, q.y, 17 * nh);
                    g.addColorStop(0, "rgba(225,245,254,0.98)"); g.addColorStop(0.42, "rgba(79,195,247,0.85)");
                    g.addColorStop(1, "rgba(2,119,189,0)");
                    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x, q.y, 17 * nh, 0, 6.28); ctx.fill();
                    ctx.restore();
                }
                // ---- TIA LASER ----
                if (this.laser){
                    let L2 = this.laser, ox = this.cx(), oy = this.y + this.h * 0.34;
                    ctx.save();
                    if (L2.t < SOC_LAS_SAC){
                        // DANG CHARGE: duong ngam mo, cho nguoi choi doc huong truoc
                        let u = L2.t / SOC_LAS_SAC;
                        ctx.globalAlpha = 0.16 + 0.34 * u;
                        ctx.strokeStyle = "#4FC3F7"; ctx.lineWidth = 1.5 + 3 * u;
                        ctx.setLineDash([16, 12]); ctx.lineDashOffset = -frames * 1.4;
                        ctx.beginPath(); ctx.moveTo(ox, oy);
                        ctx.lineTo(ox + Math.cos(L2.goc) * 1100, oy + Math.sin(L2.goc) * 1100);
                        ctx.stroke(); ctx.setLineDash([]);
                        let r = 8 + 16 * u;
                        let g = ctx.createRadialGradient(ox, oy, 1, ox, oy, r);
                        g.addColorStop(0, "rgba(225,245,254,0.98)"); g.addColorStop(1, "rgba(79,195,247,0)");
                        ctx.fillStyle = g; ctx.globalAlpha = 1;
                        ctx.beginPath(); ctx.arc(ox, oy, r, 0, 6.28); ctx.fill();
                    } else {
                        let ex = ox + Math.cos(L2.goc) * 1100, ey = oy + Math.sin(L2.goc) * 1100;
                        ctx.globalAlpha = 0.28;
                        ctx.strokeStyle = "#4FC3F7"; ctx.lineWidth = 34; ctx.lineCap = 'round';
                        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke();
                        ctx.globalAlpha = 0.9;
                        ctx.strokeStyle = "#81D4FA"; ctx.lineWidth = 16;
                        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke();
                        ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 6;
                        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ex, ey); ctx.stroke();
                        ctx.lineCap = 'butt';
                    }
                    ctx.restore();
                }
                // ---- LUOI KIEM PHEP KHONG LO ----
                if (this.kiem){
                    let k2 = this.kiem;
                    let u = Math.min(1, k2.t / SOC_KIEM_BAO);
                    ctx.save();
                    ctx.translate(k2.x, 320 - 56); ctx.scale(k2.dir, 1);
                    ctx.globalAlpha = 0.24 + 0.62 * u;
                    let g = ctx.createLinearGradient(0, -52, 0, 52);
                    g.addColorStop(0, "rgba(225,245,254,0.30)");
                    g.addColorStop(0.5, "rgba(129,212,250,0.95)");
                    g.addColorStop(1, "rgba(2,119,189,0.30)");
                    ctx.fillStyle = g;
                    ctx.fillRect(-SOC_KIEM_DAI/2, -46, SOC_KIEM_DAI * 0.86, 92);
                    ctx.beginPath();
                    ctx.moveTo(SOC_KIEM_DAI * 0.36, -46);
                    ctx.lineTo(SOC_KIEM_DAI * 0.62, 0);
                    ctx.lineTo(SOC_KIEM_DAI * 0.36, 46);
                    ctx.closePath(); ctx.fill();
                    ctx.globalAlpha = 0.85 * u;
                    ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = 3;
                    ctx.strokeRect(-SOC_KIEM_DAI/2, -46, SOC_KIEM_DAI * 0.86, 92);
                    ctx.restore();
                }
                // ---- MIN ----
                for (let m of this.min){
                    ctx.save();
                    if (m.no > 0){
                        let u = m.no / 20;
                        ctx.globalAlpha = 0.92 * u;
                        let g = ctx.createRadialGradient(m.x, 300, 4, m.x, 300, 74);
                        g.addColorStop(0, "rgba(225,245,254,0.98)"); g.addColorStop(0.45, "rgba(79,195,247,0.8)");
                        g.addColorStop(1, "rgba(2,119,189,0)");
                        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(m.x, 300, 74, 0, 6.28); ctx.fill();
                    } else {
                        let mo = m.t < SOC_MIN_MO;                 // chua kich hoat
                        ctx.globalAlpha = mo ? 0.36 : 0.85;
                        ctx.fillStyle = mo ? "#546E7A" : "#4FC3F7";
                        ctx.beginPath(); ctx.arc(m.x, 310, 9, 0, 6.28); ctx.fill();
                        ctx.globalAlpha = mo ? 0.24 : (0.42 + 0.34 * Math.sin(frames * 0.22));
                        ctx.strokeStyle = "#81D4FA"; ctx.lineWidth = 2;
                        ctx.beginPath(); ctx.ellipse(m.x, 314, 34, 10, 0, 0, 6.28); ctx.stroke();
                    }
                    ctx.restore();
                }
                // ---- vong xung lan tren mat dat ----
                if (this.vong){
                    let v = this.vong, u = 1 - v.r / v.max;
                    ctx.save();
                    ctx.globalAlpha = 0.24 + 0.5 * u;
                    ctx.strokeStyle = this.stage === 2 ? "#FFF176" : "#FFAB40"; ctx.lineWidth = 5;
                    ctx.beginPath(); ctx.moveTo(v.x - v.r, 316); ctx.lineTo(v.x - v.r + 26, 302); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(v.x + v.r, 316); ctx.lineTo(v.x + v.r - 26, 302); ctx.stroke();
                    ctx.restore();
                }
                // ---- vet du anh ----
                for (let g of this.ghosts){
                    ctx.save(); ctx.globalAlpha = 0.26 * (g.t / g.max);
                    drawCinderBody({ facingLeft: g.left, w: this.w, h: this.h, armR: g.armR,
                                     stage: this.stage, tu: this.tu, walk: this.walk, sac: this.sac,
                                     tuMoi: null, an: 0 }, g.x, g.y);
                    ctx.restore();
                }
                if (!this.an) drawCinderBody(this, this.x, this.y);
            }
        }
// BOSS_PART_END s0.SoulOfCinderBoss.1

// Nguồn: index.html:22411 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.drawCinderBody.1 EDITABLE
function drawCinderBody(b, x, y){
            let d = b.facingLeft ? -1 : 1;
            let W = b.w, H = b.h;
            let cx0 = x + W / 2, chan = y + H;
            let hai = (b.stage === 2);
            let tu = b.tu || 'thang';
            let mau = hai ? '#FFF176' : SOC_MAU[tu];
            let khom = hai ? 0.02 : (tu === 'bua' ? 0.26 : (tu === 'phep' ? -0.06 : 0.12));
            ctx.save();
            ctx.translate(cx0, chan);
            ctx.scale(d, 1);

            // ---- QUANG SANG duoi chan: mau cua tu the ----
            let gq = ctx.createRadialGradient(0, -6, 2, 0, -6, hai ? 72 : 54);
            gq.addColorStop(0, hai ? "rgba(255,241,118,0.62)" :
                               (tu === 'phep' ? "rgba(79,195,247,0.58)" :
                               (tu === 'cong' ? "rgba(255,112,67,0.62)" :
                               (tu === 'bua'  ? "rgba(176,190,197,0.50)" : "rgba(255,204,128,0.56)"))));
            gq.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = gq;
            ctx.beginPath(); ctx.ellipse(0, -6, hai ? 92 : 72, hai ? 30 : 24, 0, 0, 6.28); ctx.fill();
            // bong do
            ctx.fillStyle = "rgba(0,0,0,0.44)";
            ctx.beginPath(); ctx.ellipse(0, -2, W * 0.60, 7, 0, 0, 6.28); ctx.fill();

            /* VIEN SANG. Dau truong nay la mot cai hang toi, ma bo giap cua Soul of Cinder cung
               den — khong co vien nay thi han la mot vet den tren nen den. Ve mot ban sao phong
               to bang mau cua TU THE, dat ngay sau, de lo ra dung mot duong. */
            /* Dau truong nay la mot cai hang toi va bo giap cua Soul of Cinder cung den — do
               lan dau chup ra thi han la mot vet den tren nen den, khong doc duoc dang nguoi
               lan vu khi. Ve HAI lop vien: mot lop toa rong rat mo lam quang, mot lop sat than
               dam hon lam duong cat. Mau lay theo TU THE nen vien nay con kiem luon viec bao
               cho nguoi choi biet han dang cam gi. */
            /* VIEN phai BAM SAT than that. Do lan ba (chup zoom 2.6x): vien ve rong 1.04*W
               trong khi than thuc te chi rong ~34px tren khung 48px — nen hai ben lo ra hai
               DAI MAU day, va ca nhan vat doc thanh mot cuc mau co cai mu den o giua chu khong
               phai mot hiep si. Vien phai la mot DUONG CAT, khong phai mot cai bong.
               Nen ban kinh lay theo be ngang THAT cua than (±17px tren W=48 => 0.40*W). */
            ctx.save();
            ctx.globalAlpha = 0.14;
            ctx.fillStyle = mau;
            ctx.beginPath();
            ctx.moveTo(-W * 0.56, 0);
            ctx.quadraticCurveTo(-W * 0.54, -H * 0.62, -9, -H * 1.08);
            ctx.quadraticCurveTo(W * 0.42, -H * 1.10, W * 0.54, -H * 0.50);
            ctx.lineTo(W * 0.58, 0);
            ctx.closePath(); ctx.fill();
            ctx.globalAlpha = 0.85;
            ctx.beginPath();
            ctx.moveTo(-W * 0.40, 0);
            ctx.quadraticCurveTo(-W * 0.39, -H * 0.60, -7, -H * 0.99);
            ctx.quadraticCurveTo(W * 0.30, -H * 1.01, W * 0.38, -H * 0.48);
            ctx.lineTo(W * 0.40, 0);
            ctx.closePath(); ctx.fill();
            ctx.restore();

            // ---- AO KHOAC RACH sau lung ----
            let dao = Math.sin(frames * 0.07 + (b.walk || 0) * 0.05) * 6;
            let capH = H * (0.80 - khom * 0.10);
            ctx.beginPath();
            ctx.moveTo(-2, -capH);
            ctx.quadraticCurveTo(-W * 0.86 - dao * 0.5, -capH * 0.70, -W * 1.02 - dao, -capH * 0.18);
            for (let i = 0; i <= 6; i++){
                let u = i / 6;
                let px = -W * 1.02 - dao + (W * 1.02 + dao + 9) * u;
                let py = -capH * 0.18 + Math.sin(u * 9 + frames * 0.06) * 4 + (i % 2 ? 11 : 2);
                ctx.lineTo(px, py);
            }
            ctx.lineTo(4, -capH * 0.62);
            ctx.closePath();
            let gc = ctx.createLinearGradient(0, -capH, 0, 0);
            gc.addColorStop(0, hai ? "#6B5316" : "#3A2E29");
            gc.addColorStop(0.6, hai ? "#8D6E1E" : "#4C3C35");
            gc.addColorStop(1, "#1C1715");
            ctx.fillStyle = gc; ctx.fill();
            ctx.strokeStyle = "#0D0A09"; ctx.lineWidth = 2; ctx.stroke();

            // ---- CHAN ----
            ctx.fillStyle = "#3C322C";
            let bw = Math.sin((b.walk || 0) * 0.16) * 5;
            ctx.fillRect(-13 + bw, -H * 0.36, 11, H * 0.36);
            ctx.fillRect(2 - bw, -H * 0.36, 11, H * 0.36);
            ctx.fillStyle = "#57493F"; ctx.fillRect(-15 + bw, -5, 15, 5); ctx.fillRect(1 - bw, -5, 15, 5);

            // ---- THAN: giap chay xam ----
            ctx.save();
            ctx.rotate(khom * 0.42);
            let tH = H * 0.66;
            let gt = ctx.createLinearGradient(-16, 0, 16, 0);
            /* Do lan hai: vien sang da cat duoc dang nguoi ra khoi nen, nhung BEN TRONG van
               la mot cuc den — nguoi choi doc duoc "co mot cai gi do" chu chua doc duoc bo giap.
               Keo ca dai gia tri cua than len mot bac. */
            gt.addColorStop(0, "#4A3F39"); gt.addColorStop(0.5, hai ? "#8A6E2E" : "#6E5C4E"); gt.addColorStop(1, "#3A312C");
            ctx.fillStyle = gt;
            ctx.beginPath();
            ctx.moveTo(-16, 0); ctx.lineTo(-14, -tH * 0.9);
            ctx.quadraticCurveTo(0, -tH * 1.06, 15, -tH * 0.86);
            ctx.lineTo(17, 0); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#141010"; ctx.lineWidth = 2; ctx.stroke();
            // GIAP VAI: hai khoi cong hai ben, lam cho bong nguoi co bo ngang o tren
            ctx.fillStyle = hai ? "#7A6020" : "#584A40";
            ctx.beginPath(); ctx.ellipse(-15, -tH * 0.74, 10, 8, -0.3, 0, 6.28); ctx.fill();
            ctx.beginPath(); ctx.ellipse(16, -tH * 0.74, 11, 9, 0.3, 0, 6.28); ctx.fill();
            ctx.strokeStyle = "#1A1513"; ctx.lineWidth = 1.6;
            ctx.beginPath(); ctx.ellipse(16, -tH * 0.74, 11, 9, 0.3, 0, 6.28); ctx.stroke();
            // dai lung + tam nguc
            ctx.fillStyle = hai ? "#C9A227" : "#7A6657"; ctx.fillRect(-16, -tH * 0.30, 33, 5);
            ctx.fillStyle = mau; ctx.globalAlpha = 0.5; ctx.fillRect(-5, -tH * 0.72, 10, 14); ctx.globalAlpha = 1;

            // ---- DAU: mu tru co VANH GAI (than lua) ----
            ctx.save();
            ctx.translate(2, -tH * 0.96);
            ctx.scale(0.86, 0.86);
            ctx.fillStyle = hai ? "#6E5518" : "#413631";
            ctx.beginPath();
            ctx.moveTo(-13, 7); ctx.quadraticCurveTo(-12, -14, 3, -15);
            ctx.quadraticCurveTo(16, -13, 15, 5);
            ctx.quadraticCurveTo(4, 11, -13, 7); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#120E0D"; ctx.lineWidth = 2; ctx.stroke();
            // vanh gai quanh mu — dau hieu cua "than lua"
            ctx.strokeStyle = mau; ctx.lineWidth = 2; ctx.globalAlpha = 0.85;
            for (let i = 0; i < 5; i++){
                let a = -2.4 + i * 0.52;
                ctx.beginPath(); ctx.moveTo(Math.cos(a) * 13 + 2, Math.sin(a) * 12 - 3);
                ctx.lineTo(Math.cos(a) * (21 + (i % 2) * 5) + 2, Math.sin(a) * (19 + (i % 2) * 4) - 3);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;
            /* MAT NA CO NAN SONG. Do lan bon: hoc mat cu la mot ellipse 9x6.5 mau gan den dat
               giua cai mu 26x22 — tuc la 60% cai dau la mot lo den, nen o cu ly choi that cai
               dau doc ra "mot cuc den" chu khong phai mot cai mu tru. Thu nho hoc mat lai va
               them nan song ngang: cung la mot vung toi, nhung co van nen mat doc duoc la MAT NA. */
            ctx.fillStyle = "#17110F";
            ctx.beginPath(); ctx.ellipse(4, -2, 7, 5, 0, 0, 6.28); ctx.fill();
            ctx.strokeStyle = hai ? "#8D6E1E" : "#6B5A4E"; ctx.lineWidth = 1.2;
            for (let i = 0; i < 3; i++){
                ctx.beginPath(); ctx.moveTo(-1.5, -4 + i * 3.2); ctx.lineTo(9.5, -4 + i * 3.2); ctx.stroke();
            }
            ctx.fillStyle = hai ? "#FFF59D" : mau;
            ctx.globalAlpha = 0.85 + 0.15 * Math.sin(frames * 0.17);
            ctx.fillRect(1.5, -4.6, 3.2, 2.6); ctx.fillRect(7, -4.6, 3.2, 2.6);
            ctx.globalAlpha = 1;
            ctx.restore();
            ctx.restore();

            // ---- VU KHI: doi hoan toan theo tu the ----
            ctx.save();
            ctx.translate(6, -H * 0.52);
            ctx.rotate(b.armR || 0);
            drawCinderVuKhi(b, hai ? 'gwyn' : ((b.tuMoi && b.state === 'doi') ? 'doi' : tu), mau);
            ctx.restore();
            ctx.restore();
        }
// BOSS_PART_END s0.drawCinderBody.1

// Nguồn: index.html:22565 · Dùng bởi: SoulOfCinderBoss
// BOSS_PART_BEGIN s0.drawCinderVuKhi.1 EDITABLE
function drawCinderVuKhi(b, loai, mau){
            // chuoi chung cho moi vu khi
            ctx.fillStyle = "#241C1A"; ctx.fillRect(-16, -4, 20, 8);
            ctx.strokeStyle = "#5A4B42"; ctx.lineWidth = 2;
            for (let i = 0; i < 4; i++){ ctx.beginPath(); ctx.moveTo(-14 + i * 5, -4); ctx.lineTo(-12 + i * 5, 4); ctx.stroke(); }

            if (loai === 'thang'){
                ctx.fillStyle = "#8A7566"; ctx.fillRect(0, -10, 7, 20);              // chan kiem
                let g = ctx.createLinearGradient(0, -5, 0, 5);
                g.addColorStop(0, "#B9AFA4"); g.addColorStop(0.45, "#ECE6DC"); g.addColorStop(1, "#7A7166");
                ctx.fillStyle = g; ctx.fillRect(7, -5, 78, 10);
                ctx.fillStyle = "#ECE6DC";
                ctx.beginPath(); ctx.moveTo(85, -5); ctx.lineTo(99, 0); ctx.lineTo(85, 5); ctx.closePath(); ctx.fill();
                // KHIEN o tay kia — dau hieu rieng cua tu the nay
                ctx.save(); ctx.rotate(-(b.armR || 0));
                ctx.fillStyle = "#3D332C";
                ctx.beginPath(); ctx.ellipse(-20, 8, 15, 21, 0, 0, 6.28); ctx.fill();
                ctx.strokeStyle = "#8A7566"; ctx.lineWidth = 2; ctx.stroke();
                ctx.restore();
            } else if (loai === 'cong'){
                ctx.fillStyle = "#8A7566"; ctx.fillRect(0, -8, 6, 16);
                ctx.strokeStyle = "#ECE6DC"; ctx.lineWidth = 7; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.moveTo(6, 4); ctx.quadraticCurveTo(52, -20, 88, 2); ctx.stroke();
                ctx.strokeStyle = "#FFAB40"; ctx.lineWidth = 2.5; ctx.globalAlpha = 0.8;
                ctx.beginPath(); ctx.moveTo(6, 4); ctx.quadraticCurveTo(52, -20, 88, 2); ctx.stroke();
                ctx.globalAlpha = 1; ctx.lineCap = 'butt';
                // ngon lua o tay kia
                ctx.save(); ctx.rotate(-(b.armR || 0));
                let nh = 0.7 + 0.3 * Math.sin(frames * 0.22);
                let gf = ctx.createRadialGradient(-22, 4, 1, -22, 4, 15 * nh);
                gf.addColorStop(0, "rgba(255,241,118,0.95)"); gf.addColorStop(0.5, "rgba(255,112,67,0.7)");
                gf.addColorStop(1, "rgba(191,54,12,0)");
                ctx.fillStyle = gf; ctx.beginPath(); ctx.arc(-22, 4, 15 * nh, 0, 6.28); ctx.fill();
                ctx.restore();
            } else if (loai === 'bua'){
                ctx.fillStyle = "#4A3A31"; ctx.fillRect(0, -5, 62, 10);              // can bua
                ctx.fillStyle = "#6D5B4E"; ctx.fillRect(58, -25, 34, 50);            // dau bua
                ctx.fillStyle = "#90A4AE"; ctx.fillRect(58, -25, 34, 7);
                ctx.strokeStyle = "#1A1513"; ctx.lineWidth = 2.5; ctx.strokeRect(58, -25, 34, 50);
                ctx.fillStyle = "#3E3330"; ctx.fillRect(66, -14, 8, 28);
            } else if (loai === 'phep'){
                ctx.fillStyle = "#4A3A31"; ctx.fillRect(0, -3.5, 78, 7);             // than gay
                ctx.strokeStyle = "#8A7566"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(84, 0, 11, 0, 6.28); ctx.stroke();
                let nh = 0.7 + 0.3 * Math.sin(frames * 0.19);
                let go = ctx.createRadialGradient(84, 0, 1, 84, 0, 16 * nh);
                go.addColorStop(0, "rgba(225,245,254,0.98)"); go.addColorStop(0.45, "rgba(79,195,247,0.8)");
                go.addColorStop(1, "rgba(2,119,189,0)");
                ctx.fillStyle = go; ctx.beginPath(); ctx.arc(84, 0, 16 * nh, 0, 6.28); ctx.fill();
            } else if (loai === 'gwyn'){
                /* DAI KIEM CUA GWYN: dai gap ruoi kiem thang, ban rong gap doi, va boc SET.
                   Kich thuoc nay khong phai de cho oai — no phai khop voi tam voi that (168-204)
                   de nguoi choi uoc luong duoc tu hinh anh. */
                ctx.fillStyle = "#8D6E1E"; ctx.fillRect(0, -14, 9, 28);
                let g = ctx.createLinearGradient(0, -9, 0, 9);
                g.addColorStop(0, "#C7BCA8"); g.addColorStop(0.42, "#FFFDE7"); g.addColorStop(1, "#8C8270");
                ctx.fillStyle = g; ctx.fillRect(9, -9, 116, 18);
                ctx.fillStyle = "#FFFDE7";
                ctx.beginPath(); ctx.moveTo(125, -9); ctx.lineTo(146, 0); ctx.lineTo(125, 9); ctx.closePath(); ctx.fill();
                // set chay doc luoi
                ctx.save(); ctx.globalAlpha = 0.55 + 0.45 * Math.sin(frames * 0.31);
                ctx.strokeStyle = "#FFF176"; ctx.lineWidth = 2.4;
                ctx.beginPath();
                for (let i = 0; i <= 7; i++){
                    let px = 12 + i * 18, py = ((i % 2) ? -7 : 7) * (0.4 + 0.6 * Math.sin(frames * 0.2 + i));
                    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                }
                ctx.stroke();
                ctx.globalAlpha = 0.25;
                ctx.strokeStyle = "#FFFDE7"; ctx.lineWidth = 8;
                ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(140, 0); ctx.stroke();
                ctx.restore();
            } else {
                // dang DOI TU THE: vu khi cu tan thanh lua, chua thanh hinh vu khi moi
                let nh = 0.6 + 0.4 * Math.sin(frames * 0.3);
                let gf = ctx.createRadialGradient(30, 0, 2, 30, 0, 44 * nh);
                gf.addColorStop(0, "rgba(255,245,157,0.95)"); gf.addColorStop(0.4, "rgba(255,112,67,0.66)");
                gf.addColorStop(1, "rgba(191,54,12,0)");
                ctx.fillStyle = gf; ctx.beginPath(); ctx.arc(30, 0, 44 * nh, 0, 6.28); ctx.fill();
            }
        }
// BOSS_PART_END s0.drawCinderVuKhi.1

// Nguồn: index.html:99250 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:99261 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
