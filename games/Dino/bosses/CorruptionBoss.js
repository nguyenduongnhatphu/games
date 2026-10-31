// BOSS_FILE: CorruptionBoss
// BOSS_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, keys, parry, parryX, shakeTimer, visualEffects
// Nguồn: index.html:17927 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_HP.1 READ_ONLY
const COR_HP   = [0, 55, 55, 70];
// BOSS_PART_END s0.COR_HP.1

// Nguồn: index.html:17928 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_W.1 READ_ONLY
const COR_W    = [0, 58, 80, 58];
// BOSS_PART_END s0.COR_W.1

// Nguồn: index.html:17929 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_H.1 READ_ONLY
const COR_H    = [0, 96, 130, 96];
// BOSS_PART_END s0.COR_H.1

// Nguồn: index.html:17930 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_NGHI.1 EDITABLE
const COR_NGHI = [0, 26, 22, 16];
// BOSS_PART_END s0.COR_NGHI.1

// Nguồn: index.html:17931 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_CD.1 READ_ONLY
const COR_CD   = { chem: 40, loan: 140, giam: 170, lao: 115, keo: 190, xuc: 120, re: 250,
                           nhay: 140, song: 280, quet: 145, bay: 250, tom: 290, cuong: 390,
                           luot: 140, vuot: 220, don: 280, mua: 240, phan: 220 };
// BOSS_PART_END s0.COR_CD.1

// Nguồn: index.html:17934 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_BO.1 READ_ONLY
const COR_BO   = [null,
            ['chem', 'loan', 'giam', 'lao', 'keo', 'xuc', 're', 'nhay', 'song', 'luot', 'vuot', 'mua'],
            ['chem', 'loan', 'giam', 'lao', 'keo', 'xuc', 're', 'nhay', 'song', 'quet', 'cuong', 'luot', 'vuot', 'don', 'mua', 'phan'],
            ['chem', 'loan', 'giam', 'lao', 'keo', 'xuc', 're', 'nhay', 'song', 'bay', 'tom', 'cuong', 'luot', 'vuot', 'don', 'mua', 'phan']];
// BOSS_PART_END s0.COR_BO.1

// Nguồn: index.html:17939 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_TRONG.1 READ_ONLY
const COR_TRONG = { chem: [3, 0, 0], loan: [4, 2, 0], quet: [3, 0, 0], giam: [0, 0, 0],
                            lao: [0, 4, 3], keo: [0, 3, 3], xuc: [0, 2, 1], re: [1, 2, 1], nhay: [1, 3, 3],
                            song: [0, 1, 2], bay: [0, 2, 2], tom: [1, 2, 1], cuong: [3, 2, 1],
                            luot: [0, 2, 2], vuot: [0, 1, 2], don: [1, 1, 2], mua: [0, 2, 3], phan: [1, 3, 2] };
// BOSS_PART_END s0.COR_TRONG.1

// Nguồn: index.html:17943 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_KEO_DAI.1 READ_ONLY
const COR_KEO_DAI = 560, COR_ROI_DAI = 260;
// BOSS_PART_END s0.COR_KEO_DAI.1

// Nguồn: index.html:17944 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_BUNG.1 READ_ONLY
const COR_BUNG = 0.35;
// BOSS_PART_END s0.COR_BUNG.1

// Nguồn: index.html:17945 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_CHOANG.1 EDITABLE
const COR_CHOANG = 40;
// BOSS_PART_END s0.COR_CHOANG.1

// Nguồn: index.html:17946 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_NOI_LUON.1 READ_ONLY
const COR_NOI_LUON = { luot: 1, vuot: 1, don: 1 };
// BOSS_PART_END s0.COR_NOI_LUON.1

// Nguồn: index.html:17947 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_NOI_TL.1 READ_ONLY
const COR_NOI_TL   = [0, 0.65, 0.82, 0.94];
// BOSS_PART_END s0.COR_NOI_TL.1

// Nguồn: index.html:17948 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_NOI_MAX.1 READ_ONLY
const COR_NOI_MAX  = [0, 2, 3, 3];
// BOSS_PART_END s0.COR_NOI_MAX.1

// Nguồn: index.html:17949 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_NOI_NGHI.1 READ_ONLY
const COR_NOI_NGHI = [0, 7, 5, 3];
// BOSS_PART_END s0.COR_NOI_NGHI.1

// Nguồn: index.html:17951 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.corKichBan.1 READ_ONLY
function corKichBan(b, tu){
            let g = b.gap(), ad = Math.abs(g), S = b.stage;
            let om = ad < b.w / 2 + 26, gan = ad < 165, tren = !dino.grounded;
            const co = id => COR_BO[S].indexOf(id) >= 0;
            switch (tu){
                case 'luot':  return om ? 'giam' : (gan ? (S >= 2 && Math.random() < 0.6 ? 'loan' : 'chem') : 'lao');
                case 'vuot':  return gan ? 'loan' : 'keo';
                case 'don':   return om ? 'giam' : (gan ? 'loan' : 'lao');
                case 'lao':   return gan ? (Math.random() < 0.55 ? 'loan' : 'chem') : (co('nhay') ? 'nhay' : 'keo');
                case 'nhay':  return om ? 'giam' : (gan ? (S >= 2 && Math.random() < 0.55 ? 'quet' : 'chem') : 'lao');
                case 'keo':   return b.keoBat ? (Math.random() < 0.5 ? 'lao' : 'luot') : (gan ? 'loan' : (Math.random() < 0.5 ? 'luot' : 'vuot'));
                case 're':    return b.daTrung ? null : (gan ? 'loan' : (Math.random() < 0.5 ? 'lao' : 'luot'));
                case 'giam':  return Math.random() < 0.5 ? 'keo' : 'lao';
                case 'loan':  return om ? 'giam' : (gan ? 'quet' : ['keo', 'lao', 'nhay'][Math.floor(Math.random() * 3)]);
                case 'chem':  return gan ? (S >= 2 ? 'loan' : 'giam') : (Math.random() < 0.5 ? 'lao' : 'nhay');
                case 'song':  return tren ? 'keo' : (Math.random() < 0.5 ? 'lao' : 'don');
                case 'xuc':   return om ? 'giam' : (gan ? 'loan' : 'nhay');
                case 'quet':  return gan ? 'loan' : 'lao';
                case 'bay':   return gan ? 'loan' : (Math.random() < 0.5 ? 'keo' : 'lao');
                case 'tom':   return b.daTrung ? null : 'lao';
                case 'cuong': return gan ? 'giam' : (Math.random() < 0.5 ? 'keo' : 'lao');
                case 'mua':   return gan ? 'chem' : 'lao';
                case 'phan':  return gan ? 'giam' : 'keo';
            }
            return null;
        }
// BOSS_PART_END s0.corKichBan.1

// Nguồn: index.html:17977 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_XUC_QUET.1 EDITABLE
const COR_XUC_QUET = [-0.95, 0.35];
// BOSS_PART_END s0.COR_XUC_QUET.1

// Nguồn: index.html:17978 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.corXucDai.1 EDITABLE
function corXucDai(X){
            let s = Math.sin(X.goc);
            return s > 0.01 ? Math.min(X.dai, (322 - X.oy) / s) : X.dai;
        }
// BOSS_PART_END s0.corXucDai.1

// Nguồn: index.html:17982 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_SONG1.1 READ_ONLY
const COR_SONG1 = [0, 44, 88], COR_SONG2 = [0, 12, 56, 68, 112];
// BOSS_PART_END s0.COR_SONG1.1

// Nguồn: index.html:17983 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.COR_QUY.1 READ_ONLY
const COR_QUY  = 100, COR_BIEN = 40;
// BOSS_PART_END s0.COR_QUY.1

// Nguồn: index.html:18079 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.veRiuAbsalom.1 EDITABLE
function veRiuAbsalom(k, S, bung){
            let isEnraged = (S === 3 || bung);
            let glow      = isEnraged ? "#FFAB00" : "#E040FB";
            let coreGlow  = isEnraged ? "#FF3D00" : "#AA00FF";
            let darkMetal = isEnraged ? "#1F0D09" : "#14081E";
            let midMetal  = isEnraged ? "#3E1E16" : "#2A123D";
            let edgeCol   = isEnraged ? "#FFE57F" : "#EA80FC";
            let boneCol   = "#BCAAA4";

            ctx.save();

            // 1. CÁN ĐẠI PHỦ BẰNG CỘT SỐNG CỔ ĐẠI & THÉP ĐEN (Gài gai xương dọc thân cán)
            // Đuôi cán rìu (Pommel Spike)
            ctx.fillStyle = edgeCol;
            ctx.beginPath();
            ctx.moveTo(4 * k, 0); ctx.lineTo(14 * k, -5 * k); ctx.lineTo(14 * k, 5 * k);
            ctx.closePath(); ctx.fill();

            // Thân cán chính hơi uốn cong gân guốc
            ctx.fillStyle = darkMetal;
            ctx.beginPath();
            ctx.moveTo(12 * k, -4 * k);
            ctx.lineTo(94 * k, -4.5 * k);
            ctx.lineTo(98 * k, 0);
            ctx.lineTo(94 * k, 4.5 * k);
            ctx.lineTo(12 * k, 4 * k);
            ctx.closePath(); ctx.fill();

            // Các đốt xương quấn quanh cán rìu
            ctx.fillStyle = boneCol;
            for (let r = 0; r < 5; r++){
                let rx = (18 + r * 11) * k;
                ctx.beginPath();
                ctx.moveTo(rx, -5 * k); ctx.lineTo(rx + 4 * k, -3.5 * k);
                ctx.lineTo(rx + 3 * k, 5 * k); ctx.lineTo(rx - 1 * k, 3.5 * k);
                ctx.closePath(); ctx.fill();
            }

            // Mũi đinh ba Hủ Hóa sắc nhọn ở đỉnh cán rìu (Spear Tip)
            ctx.save();
            ctx.shadowColor = glow; ctx.shadowBlur = 10;
            ctx.fillStyle = midMetal;
            ctx.beginPath();
            ctx.moveTo(90 * k, -7 * k);
            ctx.lineTo(118 * k, 0);
            ctx.lineTo(90 * k, 7 * k);
            ctx.lineTo(95 * k, 0);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = edgeCol; ctx.lineWidth = 1.8 * k; ctx.stroke();
            ctx.restore();

            // 2. LƯỠI MÓC PHỤ PHÍA TRÊN (JAGGED EXECUTIONER HOOK — Cong ngược sắc lẹm)
            ctx.save();
            ctx.shadowColor = glow; ctx.shadowBlur = 14;
            let gradTop = ctx.createLinearGradient(55 * k, -5 * k, 95 * k, -60 * k);
            gradTop.addColorStop(0, darkMetal);
            gradTop.addColorStop(0.65, midMetal);
            gradTop.addColorStop(1, glow);
            ctx.fillStyle = gradTop;
            ctx.beginPath();
            ctx.moveTo(56 * k, -4 * k);
            ctx.lineTo(62 * k, -26 * k);
            ctx.lineTo(54 * k, -32 * k); // Gai ngược 1
            ctx.lineTo(72 * k, -48 * k);
            ctx.lineTo(66 * k, -56 * k); // Đỉnh móc câu
            ctx.lineTo(96 * k, -62 * k); // Mũi nhọn vươn xa
            ctx.quadraticCurveTo(108 * k, -38 * k, 98 * k, -22 * k);
            ctx.lineTo(104 * k, -16 * k); // Răng cưa trước
            ctx.lineTo(88 * k, -4 * k);
            ctx.closePath();
            ctx.fill();

            // Mép lưỡi trên phát sáng
            ctx.strokeStyle = edgeCol; ctx.lineWidth = 2.5 * k;
            ctx.beginPath();
            ctx.moveTo(66 * k, -56 * k);
            ctx.lineTo(96 * k, -62 * k);
            ctx.quadraticCurveTo(108 * k, -38 * k, 98 * k, -22 * k);
            ctx.lineTo(104 * k, -16 * k);
            ctx.lineTo(88 * k, -4 * k);
            ctx.stroke();

            // 3. ĐẠI LƯỠI PHỦ CHÍNH PHÍA DƯỚI (COLOSSAL BEARDED CLEAVER — Bản cực rộng & Răng cưa)
            let gradBot = ctx.createLinearGradient(50 * k, 4 * k, 105 * k, 68 * k);
            gradBot.addColorStop(0, darkMetal);
            gradBot.addColorStop(0.55, midMetal);
            gradBot.addColorStop(1, coreGlow);
            ctx.fillStyle = gradBot;
            ctx.beginPath();
            ctx.moveTo(52 * k, 4 * k);
            ctx.lineTo(44 * k, 28 * k);   // Móc lưỡi rìu kéo lùi về phía tay cầm (Bearded Axe)
            ctx.lineTo(54 * k, 26 * k);
            ctx.lineTo(48 * k, 46 * k);   // Răng cưa sau 2
            ctx.lineTo(74 * k, 66 * k);   // Đáy lưỡi rìu khổng lồ
            ctx.quadraticCurveTo(98 * k, 54 * k, 108 * k, 32 * k); // Vòng cung chém chính
            ctx.lineTo(100 * k, 26 * k);  // Khấc răng cưa xé máu
            ctx.lineTo(110 * k, 16 * k);
            ctx.lineTo(90 * k, 4 * k);
            ctx.closePath();
            ctx.fill();

            // Mép vát kim loại sáng chói của đại lưỡi phủ
            ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
            ctx.beginPath();
            ctx.moveTo(74 * k, 66 * k);
            ctx.quadraticCurveTo(98 * k, 54 * k, 108 * k, 32 * k);
            ctx.lineTo(92 * k, 24 * k);
            ctx.quadraticCurveTo(82 * k, 44 * k, 62 * k, 52 * k);
            ctx.closePath(); ctx.fill();

            ctx.strokeStyle = edgeCol; ctx.lineWidth = 2.8 * k;
            ctx.beginPath();
            ctx.moveTo(48 * k, 46 * k);
            ctx.lineTo(74 * k, 66 * k);
            ctx.quadraticCurveTo(98 * k, 54 * k, 108 * k, 32 * k);
            ctx.lineTo(100 * k, 26 * k);
            ctx.lineTo(110 * k, 16 * k);
            ctx.lineTo(90 * k, 4 * k);
            ctx.stroke();

            // 4. MẠCH HUYẾT TINH THỂ RỈ NĂNG LƯỢNG TRÊN MẶT RÌU
            ctx.strokeStyle = glow; ctx.lineWidth = 1.8 * k;
            ctx.beginPath();
            // Mạch lên lưỡi trên
            ctx.moveTo(74 * k, -4 * k); ctx.lineTo(78 * k, -26 * k); ctx.lineTo(90 * k, -48 * k);
            ctx.moveTo(78 * k, -26 * k); ctx.lineTo(68 * k, -40 * k);
            // Mạch xuống lưỡi dưới
            ctx.moveTo(74 * k, 4 * k); ctx.lineTo(72 * k, 30 * k); ctx.lineTo(76 * k, 56 * k);
            ctx.moveTo(72 * k, 30 * k); ctx.lineTo(94 * k, 36 * k);
            ctx.stroke();

            // 5. HỘP SỌ NEPHILIM & CON MẮT ÁC QUỶ SỐNG ĐỘNG Ở TÂM RÌU
            // Khung xương sọ bọc quanh khớp rìu
            ctx.fillStyle = "#D7CCC8";
            ctx.beginPath();
            ctx.moveTo(62 * k, -10 * k); ctx.lineTo(84 * k, -12 * k);
            ctx.lineTo(88 * k, 0); ctx.lineTo(84 * k, 12 * k);
            ctx.lineTo(62 * k, 10 * k); ctx.lineTo(58 * k, 0);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#3E2723"; ctx.lineWidth = 1.4 * k; ctx.stroke();

            // Hốc mắt tối & Nhãn cầu Ác Quỷ đảo liên tục
            ctx.fillStyle = "#12031A";
            ctx.beginPath(); ctx.ellipse(74 * k, 0, 8.5 * k, 6 * k, 0, 0, 6.28); ctx.fill();
            ctx.fillStyle = "#FFEA00";
            ctx.beginPath(); ctx.ellipse(74 * k, 0, 6 * k, 4.2 * k, 0, 0, 6.28); ctx.fill();
            // Con ngươi dọc đỏ máu biết liếc theo nhịp
            let eyeShift = Math.sin(frames * 0.15) * 1.8 * k;
            ctx.fillStyle = "#D50000";
            ctx.beginPath();
            ctx.ellipse(74 * k + eyeShift, 0, 2 * k, 4 * k, 0, 0, 6.28);
            ctx.fill();
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(72 * k, -2.5 * k, 1.8 * k, 1.8 * k);

            ctx.restore();
            ctx.restore();
        }
// BOSS_PART_END s0.veRiuAbsalom.1

// Nguồn: index.html:18239 · Dùng bởi: CorruptionBoss
// BOSS_PART_BEGIN s0.CorruptionBoss.1 EDITABLE
class CorruptionBoss {
            constructor(level){
                this.name = "ABSALOM — CORRUPTION";
                this.stage = 1; this.phase = 1;
                this.hp = COR_HP[1]; this.maxHp = COR_HP[1];
                this.w = COR_W[1]; this.h = COR_H[1]; this.baseY = 320 - this.h;
                this.x = canvas.width - 200; this.y = this.baseY; this.dy = 0; this.vx = 0; this.dashV = 0;
                this.grounded = true; this.facingLeft = true; this.invulnAll = false;
                this.state = 'entering'; this.t = 0; this.subTimer = 0; this.actionTimer = 50;
                this.cd = {}; this.lastSkill = ''; this.armR = -0.3; this.walk = 0; this.cui = 0;
                this.spinBody = 0;     // Góc xoay toàn thân khi nhảy bổ máy chém
                this.frenzy = 0;       // Độ rung giật điên loạn của cơ thể
                this.danh = [];        // cac hop chem dang song: {x,y,w,h,t,hit}
                this.song = [];        // song hu hoa chay doc dat
                this.bay = [];         // bay xuc tu (pha 3)
                this.xuc = null;       // xuc tu phong
                this.tom = null;       // don tom
                this.tel = null;       // khung bao truoc {x,y,w,h,t,max}
                this.burnTimer = 0; this.lastMeleeHit = -1;
                this._jPrev = false;
                this.vet = [];         // vet chem (chi de ve)
                this.manhDa = [];      // mảnh đá & tia lửa Hủ Hóa văng ra khi bổ/cày rìu
                this.vachDat = [];     // vết nứt phát sáng trên mặt đất khi đại rìu đập xuống
                this.moc = null;       // xuc tu MOC KEO
                this.re = null;        // RE TROI
                this.roi = [];         // roi xuc tu quat loan (CUONG NO)
                this.hat = null;       // nguoi choi dang bi hat vang
                this.thienThach = [];  // Mưa thiên thạch Hủ Hóa
                this.aoAnh = null;     // Ảo ảnh Nephilim chém gọng kìm
            }
            spd(){ return [1, 1.08, 0.98, 1.35][this.stage] * (this.bung ? 1.18 : 1); }
            danThang(){
                if (this._hitF === frames) return;
                this._hitF = frames;
                dino.invincible = false; dino.invTimer = 0;
                dino.takeDamage(1);
            }
            hatVang(v, dy){ this.hat = { v: v, t: 18 }; dino.dy = dy; dino.grounded = false; }
            tickHat(){
                let H = this.hat; if (!H) return;
                dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x + H.v));
                H.v *= 0.9; if (--H.t <= 0) this.hat = null;
            }
            // Tạo mảnh đá Hắc Diện Thạch & tia lửa Hủ Hóa văng tung tóe khi bổ rìu
            tungManhDa(x, y, soLuong, huongX){
                let glow = (this.stage === 3 || this.bung) ? "#FFAB00" : "#E040FB";
                for (let i = 0; i < soLuong; i++){
                    this.manhDa.push({
                        x: x + (Math.random() - 0.5) * 28,
                        y: y - Math.random() * 8,
                        vx: (huongX ? huongX * (2 + Math.random() * 6) : (Math.random() - 0.5) * 11),
                        vy: -3.5 - Math.random() * 7.5,
                        r: 3 + Math.random() * 4.5,
                        rot: Math.random() * 6.28,
                        vRot: (Math.random() - 0.5) * 0.4,
                        mau: (i % 3 === 0) ? glow : (i % 2 === 0 ? "#2A123D" : "#FFD54F"),
                        t: 26 + Math.floor(Math.random() * 12)
                    });
                }
            }
            // Tạo vết nứt dung nham Hủ Hóa tại điểm bổ rìu xuống đất
            taoVachDat(x, rong){
                this.vachDat.push({ x: x, r: rong || 55, t: 45, max: 45 });
            }
            vetChem(R, sau, cao, kieu){
                let d = sau ? -this.dir() : this.dir();
                this.vet.push({
                    x: this.cx() + d * this.w * 0.3,
                    y: this.y + this.h * (cao || 0.45),
                    r: R, d: d,
                    t: 14, max: 14,
                    lech: kieu === 'hatLen' ? -0.55 : (kieu === 'boXuong' ? 0.45 : (Math.random() - 0.5) * 0.6)
                });
            }
            hurtP(n){
                if (this._hitF === frames) return;
                this._hitF = frames;
                if (!dino.isShielding() && !dino.invincible) this.daTrung = true;
                BOSS_CHUNG.hurtP.call(this, n);
            }
            toIdle(t){
                let tu = this.state;
                this.state = 'idle'; this.t = 0; this.armR = -0.3; this.cui = 0;
                this.spinBody = 0; this.frenzy = 0; this.aoAnh = null;
                this.actionTimer = Math.max(this.bung ? 7 : 9, Math.round((t || (this.bung ? 10 : COR_NGHI[this.stage])) / this.spd()));
                this.noiTiep = null;
                if (t || !COR_CD[tu]) { this.soNoi = 0; return; }
                let tl = this.bung ? 1 : COR_NOI_TL[this.stage], mx = COR_NOI_MAX[this.stage] + (this.bung ? 1 : 0);
                if (COR_NOI_LUON[tu] || ((this.soNoi || 0) < mx && Math.random() < tl)){
                    let c = corKichBan(this, tu);
                    if (c && c !== tu && COR_BO[this.stage].indexOf(c) >= 0){
                        this.noiTiep = c; if (!COR_NOI_LUON[tu]) this.soNoi = (this.soNoi || 0) + 1;
                        this.actionTimer = COR_NOI_NGHI[this.stage];
                        return;
                    }
                }
                this.soNoi = 0;
            }
            batDau(c){
                this.keoHet = 0; this.reHet = 0; this.laoXong = 0; this.dat = 0;
                this.daTrung = false; this.keoBat = false; this.bong = []; this.chim = 0; this.laNoi = 0;
                this.spinBody = 0; this.frenzy = 0; this.aoAnh = null;
                this.lastSkill = c; this.cd[c] = COR_CD[c];
                this.state = c; this.t = 0; this.faceP();
            }
            physics(){
                this.dy += 0.72; this.y += this.dy;
                if (this.y + this.h >= 320){ this.y = 320 - this.h; this.dy = 0; this.grounded = true; }
                else this.grounded = false;
                this.x += this.dashV + (this.grounded ? 0 : this.vx);
                this.dashV *= 0.86; if (Math.abs(this.dashV) < 0.3) this.dashV = 0;
                this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
            }
            danhHop(x, y, w, h, song){ this.danh.push({ x: x, y: y, w: w, h: h, t: song, hit: false }); }
            canUse(id){ return !((this.cd[id] || 0) > 0); }
            pickSkill(){
                let bo = COR_BO[this.stage].filter(id => this.canUse(id) && id !== this.lastSkill);
                let ad = Math.abs(this.gap());
                let c = null;
                if (ad < this.w / 2 + 26 && bo.indexOf('giam') >= 0 && Math.random() < 0.6) c = 'giam';
                if (!c){
                    let vung = ad < 150 ? 0 : (ad < 340 ? 1 : 2), tong = 0, ds = [];
                    for (let id of bo){ let w = (COR_TRONG[id] || [0, 0, 0])[vung]; if (w > 0){ ds.push([id, w]); tong += w; } }
                    if (!tong){ this.actionTimer = 8; return; }
                    let r = Math.random() * tong;
                    for (let [id, w] of ds){ r -= w; if (r <= 0){ c = id; break; } }
                    if (!c) c = ds[ds.length - 1][0];
                }
                this.soNoi = 0;
                this.batDau(c);
            }
            // ================= CHUYEN PHA =================
            startPhase2(){
                if (this.state === 'quy' || this.state === 'bien'){ this.hp = Math.max(1, this.hp); return; }
                if (this.stage === 2) return this.batPha(3);
                return this.batPha(2);
            }
            batPha(n){
                this.stageSau = n;
                this.state = 'quy'; this.t = 0;
                this.hp = COR_HP[n]; this.maxHp = COR_HP[n];
                if (n === 3) this.phase = 2;
                this.name = (n === 2) ? "ABSALOM — AVATAR OF CHAOS" : "ABSALOM — HỦ HOÁ TOÀN PHẦN";
                this.danh.length = 0; this.song.length = 0; this.bay.length = 0; this.roi.length = 0; this.thienThach.length = 0;
                this.xuc = null; this.tel = null; this.aoAnh = null; this.tha();
                this.cd = {}; this.dashV = 0; this.vx = 0; this.noiTiep = null; this.soNoi = 0;
                this.chim = 0; this.donKhoa = 0; this.bong = []; this.invulnAll = false;
                this.spinBody = 0; this.frenzy = 0;
                bossProjectiles.length = 0;
                floatingTexts.push(new FloatingText(this.cx() - 60, this.y - 30, "SUY YẾU — TẤN CÔNG!"));
                shakeTimer = Math.max(shakeTimer, 30);
            }
            doiCo(n){
                let chan = this.y + this.h, giua = this.cx();
                this.stage = n;
                this.w = COR_W[n]; this.h = COR_H[n]; this.baseY = 320 - this.h;
                this.x = Math.max(8, Math.min(canvas.width - this.w - 8, giua - this.w/2));
                this.y = chan - this.h;
            }
            tha(){
                if ((this.tom && this.tom.bat) || (this.moc && this.moc.bat) || (this.re && this.re.bat)){ dino.dy = -8; }
                this.tom = null; this.moc = null; this.re = null; this.hat = null;
            }
            // ================= VONG CAP NHAT =================
            update(){
                const RIENG = { entering: 1, idle: 1, quy: 1, bien: 1, choang: 1 };
                if (!RIENG[this.state] && !COR_CD[this.state]){
                    if (this._st && (this._st === 'quy' || this._st === 'bien' || this._st === 'don' || this._st === 'entering')){ this.state = this._st; this.t = this._t; }
                    else { this.chim = 0; this.donKhoa = 0; this.invulnAll = false; this.tha(); this.toIdle(20); }
                }
                this._chay();
                this._st = this.state; this._t = this.t;
            }
            _chay(){
                if (this.state === 'entering'){
                    this.physics(); this.x -= 3.5; this.walk += 3.5;
                    if (this.x < canvas.width - 260) this.toIdle(40);
                    return;
                }
                for (let k in this.cd) if (this.cd[k] > 0) this.cd[k]--;
                if (this.stage === 3 && this.phase === 2 && !this.bung && this.hp > 0 && this.hp <= COR_HP[3] * COR_BUNG){
                    this.bung = 1;
                    floatingTexts.push(new FloatingText(this.cx() - 90, this.y - 40, "HỖN MANG BÙNG PHÁT!"));
                    shakeTimer = Math.max(shakeTimer, 40);
                    this.tungManhDa(this.cx(), this.cy(), 18, 0);
                    if (typeof SFX !== 'undefined' && SFX.bossEntry) SFX.bossEntry();
                }
                if (this.tel){ this.tel.t--; if (this.tel.t <= 0) this.tel = null; }
                this.tickDanh(); this.tickSong(); this.tickBay(); this.tickXuc(); this.tickTom();
                this.tickMoc(); this.tickRe(); this.tickRoi(); this.tickHat(); this.tickThienThach();
                for (let i = this.vet.length - 1; i >= 0; i--) if (--this.vet[i].t <= 0) this.vet.splice(i, 1);
                for (let i = this.vachDat.length - 1; i >= 0; i--) if (--this.vachDat[i].t <= 0) this.vachDat.splice(i, 1);
                for (let i = this.manhDa.length - 1; i >= 0; i--){
                    let p = this.manhDa[i];
                    p.x += p.vx; p.y += p.vy; p.vy += 0.42; p.rot += p.vRot;
                    if (p.y >= 320){ p.y = 320; p.vy *= -0.35; p.vx *= 0.7; }
                    if (--p.t <= 0) this.manhDa.splice(i, 1);
                }
                this.physics();
                if (this.state === 'idle'){
                    this.faceP();
                    let g = this.gap(), ad = Math.abs(g);
                    let sp = (this.stage === 2 ? 2.5 : 3.1) * this.spd();
                    if (ad > 110 && !this.noiTiep){ this.x += Math.sign(g) * sp; this.walk += sp; }
                    else if (ad < 60 && !this.noiTiep){ this.x -= Math.sign(g || 1) * sp * 0.7; this.walk += sp; }
                    this.actionTimer--;
                    if (this.actionTimer <= 0){
                        if (this.noiTiep){ let c = this.noiTiep; this.noiTiep = null; this.batDau(c); this.laNoi = 1; }
                        else this.pickSkill();
                    }
                    return;
                }
                this.t++;
                this.runSkill();
            }
            runSkill(){
                let d = this.dir(), T = this.t, S = this.stage;
                switch (this.state){
                // ---------- QUY GOI roi BIEN HINH ----------
                case 'quy':
                    this.cui = Math.min(1, T / 14);
                    this.invulnAll = false;
                    if (T >= COR_QUY){ this.state = 'bien'; this.t = 0; }
                    return;
                case 'bien':
                    this.invulnAll = true;
                    this.frenzy = 1;
                    this.cui = Math.max(0, 1 - T / 12);
                    if (T === 18){
                        this.doiCo(this.stageSau);
                        floatingTexts.push(new FloatingText(this.cx() - 80, this.y - 30,
                            this.stage === 2 ? "AVATAR OF CHAOS!" : "HỦ HOÁ TOÀN PHẦN!"));
                        for (let k = 0; k < 8; k++)
                            visualEffects.push(new Effect(this.cx() + (Math.random()-0.5)*110, this.cy() + (Math.random()-0.5)*90, 'explosion', true, 28));
                        this.tungManhDa(this.cx(), 318, 20, 0);
                        shakeTimer = Math.max(shakeTimer, 50);
                        if (typeof SFX !== 'undefined' && SFX.bossEntry) SFX.bossEntry();
                    }
                    if (T >= COR_BIEN){ this.invulnAll = false; this.frenzy = 0; this.toIdle(26); }
                    return;

                // ---------- CHEM DOI: 2 Nhát Đại Chiến Phủ Nặng Ngàn Cân (Heavy Overhead Cleave + Lunge) ----------
                case 'chem': {
                    let R = S === 2 ? 160 : (S === 3 ? 132 : 120);
                    if (T === 1 && this.laNoi){
                        this.t = T = 10;
                        this.tel = { x: (d > 0 ? this.x + this.w : this.x - R), y: this.y - 22, w: R, h: this.h + 22, t: 12, max: 12 };
                    }
                    let sw = (manh) => {
                        let x0 = d > 0 ? this.x + this.w - 6 : this.x + 6 - R;
                        this.danhHop(x0, this.y - 22, R, this.h + 22, 10);
                        this.vetChem(R + (manh ? 20 : 0), false, 0.45, 'boXuong');
                        let impX = this.cx() + d * (R * 0.72);
                        this.taoVachDat(impX, manh ? 75 : 55);
                        this.tungManhDa(impX, 318, manh ? 14 : 9, d);
                        visualEffects.push(new Effect(impX, 314, 'explosion', true, manh ? 28 : 20));
                    };
                    if (T === 1) this.tel = { x: (d > 0 ? this.x + this.w : this.x - R), y: this.y - 22, w: R, h: this.h + 22, t: 22, max: 22 };
                    // Lấy đà ngửa người ra sau kéo căng đại rìu
                    if (T <= 22){
                        let p = T / 22;
                        this.armR = -0.3 - 2.35 * (p * p);
                        this.cui = -0.35 * p;
                        this.frenzy = p * 0.6;
                    }
                    // Nhát 1: Bổ sầm đại rìu xuống đất!
                    if (T === 23){
                        this.dashV = d * 7; this.armR = 1.48; this.cui = 0.55; this.frenzy = 0;
                        sw(false);
                        shakeTimer = Math.max(shakeTimer, 16);
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(110, 0.16, 'sawtooth', 0.25, 65);
                    }
                    // Rút rìu lên chuẩn bị nhát 2 cực đại
                    if (T > 31 && T <= 44){
                        let p = (T - 31) / 13;
                        this.faceP(); d = this.dir();
                        this.armR = 1.48 - 4.2 * p;
                        this.cui = 0.55 - 0.95 * p;
                        this.frenzy = 0.8;
                    }
                    // Nhát 2: Nhảy chồm tới bổ rìu + Bắn kèm 1 cột sóng Hủ Hóa!
                    if (T === 45){
                        this.faceP(); d = this.dir();
                        this.dashV = d * 11; R += 28;
                        this.armR = 1.55; this.cui = 0.65; this.frenzy = 0;
                        sw(true);
                        this.song.push({ x: this.cx() + d * 45, dir: d, v: 7.5, cao: 28, t: 0, song: 45, hit: false, xk: 1 });
                        shakeTimer = Math.max(shakeTimer, 24);
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(85, 0.2, 'sawtooth', 0.28, 50);
                    }
                    if (T >= 72) this.toIdle();
                    return;
                }
                // ---------- CHOANG ----------
                case 'choang':
                    this.cui = 0.7; this.armR = 0.6;
                    if (T >= COR_CHOANG) this.toIdle(20);
                    return;

                // ---------- LUOT BONG ----------
                case 'luot': {
                    let CH = S === 3 ? 6 : 9;
                    if (T === 1){
                        let px = dino.x + dino.w/2;
                        this.luotMuc = Math.max(40, Math.min(canvas.width - 40, px + d * 120));
                        if (Math.abs(this.luotMuc - px) < 60) this.luotMuc = px - d * 120;
                        this.bong = [];
                    }
                    if (T <= CH){ this.cui = 0.5; return; }
                    let g = this.luotMuc - this.cx();
                    if (Math.abs(g) > 10 && T < CH + 40){
                        let v = Math.sign(g) * Math.min(18, Math.abs(g));
                        this.x += v; this.walk += 18; this.cui = 0.25;
                        if (T % 2 === 0) this.bong.push({ x: this.x, y: this.y, left: this.facingLeft, armR: this.armR, t: 12 });
                    } else if (!this.luotXong){ this.luotXong = T; this.faceP(); }
                    if (this.luotXong && T >= this.luotXong + 3){ this.luotXong = 0; this.toIdle(); }
                    return;
                }
                // ---------- NHAY CHAN DAU ----------
                case 'vuot': {
                    if (T === 1){
                        let px = dino.x + dino.w/2, huong = Math.sign(px - this.cx()) || d;
                        this.vuotMuc = Math.max(this.w, Math.min(canvas.width - this.w, px + huong * 150));
                        this.tel = { x: this.vuotMuc - 50, y: 320 - 30, w: 100, h: 30, t: 12, max: 12, cot: 1 };
                    }
                    if (T <= 12){ this.cui = T / 12; return; }
                    if (T === 13){ this.cui = 0; this.dy = -14; this.grounded = false; this.vx = (this.vuotMuc - this.cx()) / 38; this.vx = Math.max(-12, Math.min(12, this.vx)); }
                    if (T > 16 && this.grounded && !this.vuotDat){
                        this.vuotDat = 1; this.vx = 0; this.faceP();
                        this.danhHop(this.cx() - 70, 320 - 40, 140, 40, 6);
                        for (let k of [-1, 1]) this.song.push({ x: this.cx() + k * 30, dir: k, v: 6.5, cao: 24, t: 0, song: 30, hit: false, xk: 1 });
                        this.taoVachDat(this.cx(), 70);
                        this.tungManhDa(this.cx(), 318, 12, 0);
                        shakeTimer = Math.max(shakeTimer, 16);
                        visualEffects.push(new Effect(this.cx(), 316, 'explosion', true, 24));
                        this.vuotXong = T;
                    }
                    if (this.vuotXong && T >= this.vuotXong + 6){ this.vuotXong = 0; this.vuotDat = 0; this.toIdle(); }
                    if (T > 120){ this.vuotDat = 0; this.vuotXong = 0; this.toIdle(); }
                    return;
                }
                // ---------- DON THO ----------
                case 'don': {
                    const CHIM = 20, BAO = 18;
                    if (T === 1) floatingTexts.push(new FloatingText(this.cx() - 50, this.y - 26, "ĐỘN THỔ HỦ HOÁ"));
                    if (T <= CHIM){ this.chim = T / CHIM; if (T === CHIM){ this.invulnAll = true; this.ngamX = this.cx(); } return; }
                    if (!this.donKhoa){
                        let px = dino.x + dino.w/2, g = px - this.ngamX;
                        this.ngamX += Math.sign(g) * Math.min(8.5 * this.spd(), Math.abs(g));
                        if (Math.abs(g) < 12 || T > CHIM + 55){
                            this.donKhoa = T;
                            this.tel = { x: this.ngamX - 40, y: 320 - 160, w: 80, h: 160, t: BAO, max: BAO, cot: 1 };
                        }
                        return;
                    }
                    let k = T - this.donKhoa;
                    if (k === BAO){
                        this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.ngamX - this.w/2));
                        this.invulnAll = false;
                        let cot = { x: this.ngamX - 40, y: 320 - 160, w: 80, h: 160 };
                        if (checkAABB(dino, cot)){ this.hurtP(1); if (!dino.isShielding()) this.hatVang(Math.sign(dino.x + dino.w/2 - this.ngamX || 1) * 5, -11); }
                        this.tungManhDa(this.ngamX, 318, 15, 0);
                        shakeTimer = Math.max(shakeTimer, 20);
                        visualEffects.push(new Effect(this.ngamX, 300, 'explosion', true, 36));
                        if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
                    }
                    if (k >= BAO) this.chim = Math.max(0, 1 - (k - BAO) / 8);
                    if (k >= BAO + 12){ this.donKhoa = 0; this.chim = 0; this.faceP(); this.toIdle(); }
                    return;
                }
                // ---------- MƯA THIÊN THẠCH HỦ HÓA (mua) ----------
                case 'mua': {
                    if (T === 1){
                        this.faceP();
                        floatingTexts.push(new FloatingText(this.cx() - 60, this.y - 32, "MƯA HẮC TINH!"));
                        if (typeof SFX !== 'undefined' && SFX.bossSkill) SFX.bossSkill();
                    }
                    if (T <= 18){ this.armR = -0.3 - 2.1 * (T / 18); this.cui = -0.3 * (T / 18); this.frenzy = 0.7; return; }
                    if (T === 19){
                        this.armR = 1.45; this.cui = 0.55; this.frenzy = 0;
                        shakeTimer = Math.max(shakeTimer, 22);
                        let impX = this.cx() + d * 48;
                        this.taoVachDat(impX, 65);
                        this.tungManhDa(impX, 318, 12, d);
                        visualEffects.push(new Effect(impX, 316, 'explosion', true, 30));
                        let px = dino.x + dino.w / 2;
                        let count = S >= 2 ? 5 : 4;
                        for (let i = 0; i < count; i++){
                            let tx = Math.max(55, Math.min(canvas.width - 55, px + (i - (count - 1)/2) * 115 + (Math.random()-0.5)*30));
                            this.thienThach.push({
                                x: tx - 70 * d, y: -30 - i * 35,
                                tx: tx, vx: d * 2.5, vy: 9.5,
                                wait: 8 + i * 7, hit: false
                            });
                        }
                    }
                    if (T >= 60) this.toIdle();
                    return;
                }
                // ---------- ẢO ẢNH NEPHILIM GỌNG KÌM (phan) ----------
                case 'phan': {
                    let CH = S === 3 ? 20 : 24, R = 125;
                    if (T === 1){
                        this.faceP();
                        let px = dino.x + dino.w / 2;
                        let side = (this.cx() < px) ? 1 : -1;
                        let cloneX = Math.max(40, Math.min(canvas.width - this.w - 40, px + side * 125 - this.w / 2));
                        this.aoAnh = { x: cloneX, y: this.baseY, left: side > 0, armR: -0.3, t: 0 };
                        floatingTexts.push(new FloatingText(this.cx() - 55, this.y - 32, "GỌNG KÌM HỦ HOÁ!"));
                        this.tel = { x: Math.min(this.cx(), cloneX) - 20, y: this.y + 10, w: Math.abs(this.cx() - cloneX) + 60, h: this.h - 10, t: CH, max: CH };
                        if (typeof SFX !== 'undefined' && SFX.bossSkill) SFX.bossSkill();
                    }
                    if (T <= CH){
                        this.armR = -0.3 - 2.2 * (T / CH);
                        this.cui = -0.25 * (T / CH);
                        if (this.aoAnh) this.aoAnh.armR = this.armR;
                        return;
                    }
                    if (T === CH + 1){
                        this.faceP(); d = this.dir();
                        this.dashV = d * 12; this.armR = 1.45; this.cui = 0.5;
                        this.danhHop(d > 0 ? this.x + this.w - 6 : this.x + 6 - R, this.y, R, this.h, 10);
                        this.vetChem(R, false, 0.5, 'boXuong');
                        this.tungManhDa(this.cx() + d * 60, 318, 10, d);
                        if (this.aoAnh){
                            let cd2 = this.aoAnh.left ? -1 : 1;
                            this.aoAnh.armR = 1.45;
                            this.aoAnh.x += cd2 * 32;
                            this.danhHop(cd2 > 0 ? this.aoAnh.x + this.w - 6 : this.aoAnh.x + 6 - R, this.aoAnh.y, R, this.h, 10);
                        }
                        shakeTimer = Math.max(shakeTimer, 24);
                        if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
                    }
                    if (T >= CH + 24){ this.aoAnh = null; this.toIdle(); }
                    return;
                }
                // ---------- CHEM LOAN (BERSERK BUTCHER — Cuồng Loạn Băm Bổ Điên Cuồng + Xoay Kết Liễu) ----------
                case 'loan': {
                    let N = [0, 4, 5, 6][S], NH = S === 3 ? 8 : 10, CH = this.laNoi ? 9 : 16, R = 115;
                    if (T === 1){
                        floatingTexts.push(new FloatingText(this.cx() - 55, this.y - 30, "CUỒNG PHỦ BĂM XÁC!"));
                        this.tel = { x: (d > 0 ? this.x + this.w : this.x - R), y: this.y - 14, w: R, h: this.h + 14, t: CH, max: CH };
                    }
                    if (T <= CH){
                        this.armR = -0.3 - 2.3 * (T / CH);
                        this.cui = -0.3 * (T / CH);
                        this.frenzy = 1.2;
                        return;
                    }
                    let k = T - CH;
                    this.frenzy = 1.0;
                    // Giữa các nhịp chém, cánh tay giật lắc dữ dội
                    let sub = k % NH;
                    if (k / NH < N && sub > 2){
                        let nextUp = (Math.floor(k / NH) % 2 === 0);
                        this.armR = nextUp ? (-2.2 + (sub / NH) * 0.6) : (1.5 - (sub / NH) * 0.6);
                    }
                    if (sub === 0 && k / NH < N){
                        let i = k / NH, isLast = (i === N - 1);
                        let sau = (S >= 2 && i % 3 === 2 && !isLast);
                        this.faceP(); d = this.dir();
                        this.dashV = d * (isLast ? 14 : 9);
                        if (T % 2 === 0) this.bong.push({ x: this.x, y: this.y, left: this.facingLeft, armR: this.armR, t: 8 });

                        let curR = isLast ? R + 30 : R;
                        this.danhHop(d > 0 ? this.x + this.w - 6 : this.x + 6 - curR, this.y - 16, curR, this.h + 16, 7);
                        this.vetChem(curR, false, i % 2 ? 0.3 : 0.65, i % 2 ? 'hatLen' : 'boXuong');

                        let impX = this.cx() + d * (curR * 0.65);
                        this.tungManhDa(impX, 318, isLast ? 14 : 6, d);
                        if (i % 2 === 0 || isLast) this.taoVachDat(impX, isLast ? 70 : 45);

                        if (sau){
                            this.danhHop(d > 0 ? this.x + 6 - R : this.x + this.w - 6, this.y - 12, R, this.h + 12, 6);
                            this.vetChem(R, true, 0.5);
                        }
                        // Nhát cuối: Bổ tất sát giải phóng sóng xung kích Hủ Hóa!
                        if (isLast){
                            this.song.push({ x: this.cx() + d * 40, dir: d, v: 8, cao: 30, t: 0, song: 45, hit: false, xk: 1 });
                            visualEffects.push(new Effect(impX, 314, 'explosion', true, 28));
                        }
                        this.armR = (i % 2) ? -2.3 : 1.55;
                        this.cui = (i % 2) ? 0.15 : 0.6;
                        shakeTimer = Math.max(shakeTimer, isLast ? 20 : 8);
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(130 + i * 18, 0.09, 'sawtooth', 0.2, 80);
                    }
                    if (k >= N * NH + 20){ this.frenzy = 0; this.toIdle(); }
                    return;
                }
                // ---------- GIAM NGHIEN ----------
                case 'giam': {
                    let CH = S === 3 ? 10 : 14;
                    if (T === 1) this.tel = { x: this.x - 38, y: 320 - 44, w: this.w + 76, h: 44, t: CH, max: CH };
                    this.cui = T <= CH ? -0.35 * T / CH : 0.5;
                    if (T === CH){
                        this.danhHop(this.x - 38, 320 - 44, this.w + 76, 44, 7);
                        if (checkAABB(dino, { x: this.x - 38, y: 320 - 44, w: this.w + 76, h: 44 }))
                            this.hatVang(Math.sign(this.gap() || 1) * 10, -8);
                        this.taoVachDat(this.cx(), 80);
                        this.tungManhDa(this.cx(), 318, 12, 0);
                        shakeTimer = Math.max(shakeTimer, 16);
                        visualEffects.push(new Effect(this.cx(), 316, 'explosion', true, 24));
                    }
                    if (T >= CH + 22) this.toIdle();
                    return;
                }
                // ---------- LAO CHEM (DRAGGING AXE CHARGE & UPPERCUT — Kéo Lê Đại Rìu Cày Đất rồi Hất Tung Lên Trời) ----------
                case 'lao': {
                    let CH = S === 3 ? 14 : 19;
                    if (T === 1){
                        this.mucX = dino.x + dino.w/2;
                        let front = d > 0 ? this.x + this.w : this.x, end = this.mucX + d * 90;
                        this.laoEnd = end; this.laoHit = false;
                        this.tel = { x: Math.min(front, end), y: 320 - 66, w: Math.max(20, Math.abs(end - front)), h: 66, t: CH, max: CH };
                    }
                    // Gồng cắm lưỡi rìu xuống đất phía sau lưng
                    if (T <= CH){
                        this.cui = 0.65 * (T / CH);
                        this.armR = 0.4 + 1.55 * (T / CH); // Cắm ngược lưỡi rìu xuống sàn phía sau
                        this.frenzy = 0.8;
                        if (T === CH){
                            this.tungManhDa(this.cx() - d * 35, 318, 8, -d);
                            shakeTimer = Math.max(shakeTimer, 8);
                        }
                        return;
                    }
                    // Lao đi tốc độ cao trong khi kéo lê đại rìu cày nát mặt đất!
                    if (T <= CH + 24 && d * (this.laoEnd - this.cx()) > 0 && Math.abs(this.gap()) > 42){
                        this.cui = 0.55; this.x += d * 15.5; this.walk += 16;
                        this.armR = 1.9 + Math.sin(T * 1.5) * 0.12; // Rìu kéo lê rung bần bật dưới đất
                        if (T % 2 === 0){
                            this.bong.push({ x: this.x, y: this.y, left: this.facingLeft, armR: this.armR, t: 9 });
                            this.tungManhDa(this.cx() - d * 30, 318, 3, -d);
                            this.taoVachDat(this.cx() - d * 20, 30);
                        }
                        let hb = { x: d > 0 ? this.x + this.w - 20 : this.x - 55, y: this.y + this.h * 0.25, w: 75, h: this.h * 0.75 };
                        if (!this.laoHit && checkAABB(dino, hb)){
                            this.laoHit = true; this.hurtP(1);
                            if (!dino.isShielding()) this.hatVang(d * 6, -7);
                        }
                    } else if (!this.laoXong){
                        // KẾT THÚC CÀY ĐẤT: Vung đại rìu hất ngược từ dưới đất lên trời (Colossal Uppercut)!
                        this.laoXong = T;
                        this.cui = -0.25;
                        this.armR = -2.25; // Vung vút lên cao
                        this.dashV = d * 6;
                        let R = 125;
                        this.danhHop(d > 0 ? this.x + this.w - 10 : this.x + 10 - R, this.y - 28, R, this.h + 28, 9);
                        this.vetChem(R, false, 0.4, 'hatLen');
                        this.tungManhDa(this.cx() + d * 45, 318, 14, d);
                        this.song.push({ x: this.cx() + d * 36, dir: d, v: 7.5, cao: 26, t: 0, song: 36, hit: false, xk: 1 });
                        shakeTimer = Math.max(shakeTimer, 18);
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(150, 0.16, 'sawtooth', 0.24, 190);
                    }
                    if (this.laoXong && T >= this.laoXong + 22){ this.laoXong = 0; this.frenzy = 0; this.toIdle(); }
                    return;
                }
                // ---------- MOC KEO ----------
                case 'keo': {
                    if (T === 1){
                        let px = dino.x + dino.w/2, py = dino.y + dino.h/2;
                        let ox = this.cx() + d * this.w * 0.3, oy = this.y + this.h * 0.40;
                        let a = Math.atan2(py - oy, (px - ox) * d);
                        a = Math.max(-0.5, Math.min(0.3, a));
                        this.moc = { ox: ox, oy: oy, d: d, goc: a, dai: 0, pha: 'bao', t: 0, bat: false, bao: S === 3 ? 16 : 22 };
                    }
                    if (this.moc && this.moc.pha === 'nen'){
                        let u = this.moc.t;
                        this.armR = u < 14 ? -0.3 - 2.1 * u / 14 : 1.5;
                    }
                    if (!this.moc && T > 10){ if (!this.keoHet) this.keoHet = T; }
                    if (this.keoHet && T >= this.keoHet + 24){ this.keoHet = 0; this.toIdle(); }
                    return;
                }
                // ---------- RE TROI ----------
                case 're': {
                    let CH = S === 3 ? 26 : 34;
                    if (T <= 14) this.cui = 0.8 * T / 14;
                    if (T === 14){
                        let gx = dino.x + dino.w/2;
                        this.re = { gx: gx, t: 0, pha: 'bao', max: CH, bat: false };
                        this.tel = { x: gx - 38, y: 320 - 40, w: 76, h: 40, t: CH, max: CH, cot: 1 };
                        visualEffects.push(new Effect(this.cx(), 316, 'explosion', true, 14));
                    }
                    let R = this.re;
                    if (R && R.bat){
                        this.cui = 0;
                        let g = R.gx - this.cx(), muc = 64;
                        this.facingLeft = g < 0;
                        if (!R.toi){
                            if (Math.abs(g) > muc){ this.x += Math.sign(g) * Math.min(13, Math.abs(g) - muc); this.walk += 13; this.armR = -0.3; }
                            else { R.toi = 1; R.u = 0; }
                        } else {
                            R.u++;
                            if (R.u <= 16) this.armR = -0.3 - 2.1 * R.u / 16;
                            if (R.u === 16){ this.armR = 1.5; this.vetChem(105, false, 0.3, 'boXuong'); if (R.bat) this.danThang(); shakeTimer = Math.max(shakeTimer, 16); }
                            if (R.u === 24){ this.armR = -1.8; this.vetChem(105, false, 0.6, 'hatLen');
                                if (this.re && this.re.bat){ this.danThang(); this.re = null; this.hatVang((g < 0 ? -1 : 1) * 10, -9);
                                    if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode(); } }
                            if (R.u >= 24){ this.re = null; this.reHet = T; }
                        }
                    } else if (T > 14 && !R && !this.reHet) this.reHet = T;
                    if (this.reHet && T >= this.reHet + 26){ this.reHet = 0; this.toIdle(); }
                    return;
                }
                // ---------- CUONG NO HON MANG ----------
                case 'cuong': {
                    let DAI = S === 3 ? 170 : 120, NR = S === 3 ? 8 : 11;
                    if (T === 1){
                        floatingTexts.push(new FloatingText(this.cx() - 50, this.y - 30, "Cơn Thịnh Nộ Nephilim!"));
                        shakeTimer = Math.max(shakeTimer, 26);
                        if (typeof SFX !== 'undefined' && SFX.bossEntry) SFX.bossEntry();
                    }
                    this.frenzy = 1.3;
                    if (T <= 20){ this.cui = 0.5 * Math.sin(T / 20 * 3.14); this.armR = -2.3; return; }
                    let k = T - 20;
                    if (k < DAI){
                        this.faceP(); d = this.dir();
                        if (Math.abs(this.gap()) > 60){ this.x += d * 2.1 * this.spd(); this.walk += 2.2; }
                        if (k % 14 === 0){
                            let sau = Math.floor(k / 14) % 2 === 1, R = 108, dd = sau ? -d : d;
                            this.danhHop(dd > 0 ? this.x + this.w - 6 : this.x + 6 - R, this.y - 12, R, this.h + 12, 6);
                            this.vetChem(R, sau, 0.3 + Math.random() * 0.4);
                            this.tungManhDa(this.cx() + dd * 55, 318, 6, dd);
                            this.armR = sau ? -2.2 : 1.5;
                            shakeTimer = Math.max(shakeTimer, 6);
                        } else this.armR += (Math.random() - 0.5) * 0.65;
                        if (k % NR === 0){
                            let ben = Math.random() < 0.7 ? d : -d;
                            this.roi.push({ ox: this.cx() + ben * this.w * 0.25, oy: this.y + this.h * (0.25 + Math.random() * 0.3),
                                            d: ben, goc: -1.0 + Math.random() * 1.45, dai: 0, t: 0, pha: 'bao', hit: false });
                        }
                    }
                    if (k >= DAI + 26){ this.frenzy = 0; this.toIdle(); }
                    return;
                }
                // ---------- NHAY BO (GUILLOTINE SPIN SLAM — Nhảy Xoay Đại Rìu 720 Độ Giáng Trần) ----------
                case 'nhay': {
                    if (T === 1){ this.mucX = dino.x + dino.w/2; this.cui = 0; this.spinBody = 0; }
                    if (T <= 16){
                        this.cui = T / 16;
                        this.armR = -0.3 - 2.1 * (T / 16);
                        this.frenzy = 0.7;
                        return;
                    }
                    if (T === 17){
                        this.cui = 0; this.frenzy = 0;
                        this.dy = S === 2 ? -13.2 : -14.5;
                        this.vx = (this.mucX - this.cx()) / 34;
                        this.vx = Math.max(-10.5, Math.min(10.5, this.vx));
                        this.grounded = false;
                        this.tungManhDa(this.cx(), 318, 8, 0);
                    }
                    // Khi đang ở trên không: Xoay cuộn toàn thân + vung đại rìu như lưỡi cưa máy chém!
                    if (T > 17 && !this.dat && !this.grounded){
                        this.spinBody += 0.38;
                        this.armR = 0.2;
                        if (T % 3 === 0){
                            this.bong.push({ x: this.x, y: this.y, left: this.facingLeft, armR: this.armR, spin: this.spinBody, t: 9 });
                            this.vetChem(85, false, 0.5);
                        }
                        // Khi bắt đầu rơi xuống gần mặt đất, giáng mạnh xuống với tốc độ cực cao
                        if (this.dy > 2) this.dy += 0.55;
                    }
                    if (T > 17 && !this.dat){
                        if (this.grounded && T > 22){
                            this.dat = 1; this.spinBody = 0;
                            this.vx = 0; this.armR = 1.55; this.cui = 0.65;
                            let W2 = this.w + 110;
                            this.danhHop(this.cx() - W2/2, 320 - 64, W2, 64, 9);
                            this.vetChem(130, false, 0.45, 'boXuong');
                            this.taoVachDat(this.cx(), 95);
                            this.tungManhDa(this.cx(), 318, 18, 0);
                            for (let k of [-1, 1]) this.song.push({ x: this.cx() + k * 30, dir: k, v: 7.8, cao: 30, t: 0, song: 60, hit: false, xk: 1 });
                            shakeTimer = Math.max(shakeTimer, 26);
                            visualEffects.push(new Effect(this.cx(), 316, 'explosion', true, 38));
                            if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
                            this.t = 200;
                        }
                    }
                    if (T > 140 && !this.dat){ this.dat = 1; this.spinBody = 0; this.t = 200; }
                    if (T >= 232){ this.dat = 0; this.spinBody = 0; this.toIdle(); }
                    return;
                }
                // ---------- XUC TU PHONG ----------
                case 'xuc': {
                    if (T === 1){
                        let px = dino.x + dino.w/2, py = dino.y + dino.h/2;
                        let ox = this.cx() + d * this.w * 0.3, oy = this.y + this.h * 0.40;
                        let a = Math.atan2(py - oy, (px - ox) * d);
                        a = Math.max(-0.6, Math.min(0.28, a));
                        if (S >= 2) a = COR_XUC_QUET[0];
                        this.xuc = { ox: ox, oy: oy, d: d, goc: a, dai: 0, pha: 'bao', t: 0, hit: false,
                                     quet: S >= 2 };
                    }
                    if (this.xuc && this.xuc.pha === 'het'){ this.xuc = null; }
                    if (T >= 96 || (T > 10 && !this.xuc)) this.toIdle();
                    return;
                }
                // ---------- SONG HU HOA ----------
                case 'song': {
                    let lich = S === 2 ? COR_SONG2 : COR_SONG1, so = lich.length;
                    this.cui = Math.min(1, T / 16) * 0.7;
                    if (T === 1) this.tel = { x: (d > 0 ? this.x + this.w : this.x - 220), y: 290, w: 220, h: 30, t: 24, max: 24 };
                    if (T < 24) this.armR = -0.3 - 2.0 * (T / 24);
                    if (lich.indexOf(T - 24) >= 0){
                        this.armR = 1.45;
                        this.vetChem(100, false, 0.5, 'boXuong');
                        this.tungManhDa(this.cx() + d * 40, 318, 7, d);
                        this.song.push({ x: this.cx() + d * 34, dir: d, v: 7.0, cao: 36, t: 0, song: 200, hit: false });
                        shakeTimer = Math.max(shakeTimer, 10);
                    }
                    if (T >= 24 + lich[so - 1] + 28) this.toIdle();
                    return;
                }
                // ---------- QUET VONG RIU ----------
                case 'quet': {
                    let R = 185;
                    if (T === 1) this.tel = { x: this.cx() - R, y: 320 - 62, w: R * 2, h: 62, t: 26, max: 26, tron: 1 };
                    if (T <= 26){ this.armR = -0.3 - 2.1 * (T / 26); this.frenzy = 0.8; }
                    if (T === 26){
                        this.frenzy = 0;
                        this.danhHop(this.cx() - R, 320 - 62, R * 2, 62, 14);
                        this.vetChem(R, false, 0.5); this.vetChem(R, true, 0.5);
                        this.taoVachDat(this.cx() - 70, 60); this.taoVachDat(this.cx() + 70, 60);
                        this.tungManhDa(this.cx(), 318, 16, 0);
                        shakeTimer = Math.max(shakeTimer, 20);
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(90, 0.22, 'sawtooth', 0.26, 60);
                    }
                    if (T > 26 && T <= 44) this.armR = -2.4 + 6.8 * ((T - 26) / 18);
                    if (T >= 78) this.toIdle();
                    return;
                }
                // ---------- BAY XUC TU ----------
                case 'bay': {
                    this.cui = T < 22 ? T / 22 * 0.8 : Math.max(0, 0.8 - (T - 22) / 20);
                    if (T === 22 || T === 52 || T === 82){
                        this.bay.push({ x: this.cx() + d * 30, v: d * 2.4, t: 0, pha: 'di', hit: false });
                        shakeTimer = Math.max(shakeTimer, 8);
                        visualEffects.push(new Effect(this.cx() + d * 30, 316, 'explosion', true, 16));
                    }
                    if (T >= 110) this.toIdle();
                    return;
                }
                // ---------- TOM ----------
                case 'tom': {
                    this.cui = T < 22 ? T / 22 * 0.8 : 0;
                    if (T === 22){
                        let gx = dino.x + dino.w/2;
                        this.tom = { gx: gx, t: 0, pha: 'bao', bat: false };
                        this.tel = { x: gx - 30, y: 320 - 130, w: 60, h: 130, t: 38, max: 38, cot: 1 };
                    }
                    if (T > 22 && !this.tom) { if (T >= 60) this.toIdle(); return; }
                    if (this.tom && this.tom.bat){
                        let g = this.tom.gx - this.cx();
                        if (Math.abs(g) > 70) this.x += Math.sign(g) * 8;
                        this.facingLeft = g < 0;
                        if (this.tom.t === 34){ this.armR = -2.2; }
                        if (this.tom.t === 46){
                            this.armR = 1.5;
                            this.vetChem(125, false, 0.45, 'boXuong');
                            this.tungManhDa(this.tom.gx, 318, 14, Math.sign(g));
                            this.hurtP(1);
                            dino.dy = -9; dino.x += (g < 0 ? -1 : 1) * 30;
                            shakeTimer = Math.max(shakeTimer, 24);
                            this.tom = null; this.t = 400;
                            if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
                        }
                    }
                    if (T >= 440) this.toIdle();
                    return;
                }
                default: this.toIdle();
                }
            }
            // ================= CAC VAT THE PHU =================
            tickThienThach(){
                if (!this.thienThach) return;
                for (let i = this.thienThach.length - 1; i >= 0; i--){
                    let m = this.thienThach[i];
                    if (m.wait > 0){ m.wait--; continue; }
                    m.x += m.vx; m.y += m.vy;
                    if (!m.hit && checkAABB(dino, { x: m.x - 16, y: m.y - 16, w: 32, h: 32 })){
                        m.hit = true; this.hurtP(1);
                    }
                    if (m.y >= 316){
                        visualEffects.push(new Effect(m.x, 314, 'explosion', true, 36));
                        this.taoVachDat(m.x, 45);
                        this.tungManhDa(m.x, 318, 6, 0);
                        shakeTimer = Math.max(shakeTimer, 10);
                        if (!m.hit && checkAABB(dino, { x: m.x - 32, y: 280, w: 64, h: 40 })) this.hurtP(1);
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(130, 0.08, 'sawtooth', 0.14, 70);
                        this.thienThach.splice(i, 1);
                    }
                }
            }
            tickDanh(){
                for (let i = this.danh.length - 1; i >= 0; i--){
                    let h = this.danh[i]; h.t--;
                    if (!h.hit && checkAABB(dino, h)){ h.hit = true; this.hurtP(1); }
                    if (h.t <= 0) this.danh.splice(i, 1);
                }
            }
            tickSong(){
                for (let i = this.song.length - 1; i >= 0; i--){
                    let w = this.song[i]; w.t++; w.x += w.dir * w.v;
                    let r = { x: w.x - 16, y: 320 - w.cao, w: 32, h: w.cao };
                    if (!w.hit && checkAABB(dino, r)){ w.hit = true; this.hurtP(1); }
                    if (w.t > w.song || w.x < -40 || w.x > canvas.width + 40) this.song.splice(i, 1);
                }
            }
            tickBay(){
                for (let i = this.bay.length - 1; i >= 0; i--){
                    let b = this.bay[i]; b.t++;
                    let px = dino.x + dino.w/2;
                    if (b.pha === 'di'){
                        b.v += Math.sign(px - b.x) * 0.22;
                        b.v = Math.max(-3.4, Math.min(3.4, b.v));
                        b.x += b.v;
                        if (Math.abs(px - b.x) < 24 || b.t > 170){ b.pha = 'bao'; b.t = 0; }
                    } else if (b.pha === 'bao'){
                        if (b.t >= 16){ b.pha = 'no'; b.t = 0; shakeTimer = Math.max(shakeTimer, 8); }
                    } else if (b.pha === 'no'){
                        let r = { x: b.x - 22, y: 320 - 110, w: 44, h: 110 };
                        if (!b.hit && checkAABB(dino, r)){ b.hit = true; this.hurtP(1); }
                        if (b.t >= 18) this.bay.splice(i, 1);
                    }
                }
            }
            tickXuc(){
                let X = this.xuc; if (!X) return;
                X.t++;
                const DAI = 380;
                if (X.pha === 'bao'){ if (X.t >= 26){ X.pha = 'ra'; X.t = 0; } return; }
                if (X.pha === 'ra'){ X.dai = DAI * Math.min(1, X.t / 14); if (X.t >= 14){ X.pha = X.quet ? 'quet' : 'giu'; X.t = 0; } }
                else if (X.pha === 'giu'){ if (X.t >= 10){ X.pha = 've'; X.t = 0; } }
                else if (X.pha === 'quet'){ X.goc += (COR_XUC_QUET[1] - COR_XUC_QUET[0]) / 22; if (X.t >= 22){ X.pha = 've'; X.t = 0; } }
                else if (X.pha === 've'){ X.dai = DAI * Math.max(0, 1 - X.t / 12); if (X.t >= 12){ X.pha = 'het'; return; } }
                if (!X.hit && X.dai > 20 && X.pha !== 've'){
                    let L = corXucDai(X);
                    let ex = X.ox + X.d * Math.cos(X.goc) * L, ey = X.oy + Math.sin(X.goc) * L;
                    let px = dino.x + dino.w/2, py = dino.y + dino.h/2;
                    let vx = ex - X.ox, vy = ey - X.oy, L2 = vx*vx + vy*vy || 1;
                    let u = Math.max(0, Math.min(1, ((px - X.ox) * vx + (py - X.oy) * vy) / L2));
                    let qx = X.ox + vx * u, qy = X.oy + vy * u;
                    let rr = Math.hypot(px - qx, py - qy);
                    if (rr < 10 + Math.min(dino.w, dino.h) / 2){ X.hit = true; this.hurtP(1); }
                }
            }
            tickMoc(){
                let X = this.moc; if (!X) return;
                X.t++;
                let tx = X.d > 0 ? this.x + this.w + 2 : this.x - dino.w - 2;
                if (X.pha === 'bao'){ if (X.t >= X.bao){ X.pha = 'ra'; X.t = 0; } return; }
                if (X.pha === 'ra'){
                    X.dai = COR_KEO_DAI * Math.min(1, X.t / 10);
                    let L = corXucDai(X);
                    let ex = X.ox + X.d * Math.cos(X.goc) * L, ey = X.oy + Math.sin(X.goc) * L;
                    let px = dino.x + dino.w/2, py = dino.y + dino.h/2;
                    let vx = ex - X.ox, vy = ey - X.oy, L2 = vx*vx + vy*vy || 1;
                    let u = Math.max(0, Math.min(1, ((px - X.ox) * vx + (py - X.oy) * vy) / L2));
                    if (Math.hypot(px - (X.ox + vx * u), py - (X.oy + vy * u)) < 10 + Math.min(dino.w, dino.h) / 2){
                        if (dino.isShielding()){
                            visualEffects.push(new Effect(dino.x + dino.w/2, dino.y, 'parry'));
                            X.pha = 've'; X.t = 0; return;
                        }
                        X.pha = 'keo'; X.t = 0; X.bat = true; this.keoBat = true; this.daTrung = true;
                        floatingTexts.push(new FloatingText(dino.x - 10, dino.y - 30, "BỊ KÉO!"));
                        return;
                    }
                    if (X.t >= 18){ X.pha = 've'; X.t = 0; }
                    return;
                }
                if (X.pha === 'keo' || X.pha === 'nen'){
                    let g = tx - dino.x;
                    if (X.pha === 'keo'){
                        dino.x += Math.sign(g) * Math.min(16, Math.abs(g));
                        if (Math.abs(g) < 2 || X.t > 60){ X.pha = 'nen'; X.t = 0; }
                    } else dino.x = tx;
                    dino.y = 320 - dino.h - 6; dino.dy = 0;
                    X.ex = dino.x + dino.w/2; X.ey = dino.y + dino.h/2;
                    if (X.pha === 'nen'){
                        if ((X.t === 14 || X.t === 22) && dino.isShielding()){
                            let px = (typeof parryX === 'function') ? parryX() : (dino.x + dino.w / 2);
                            visualEffects.push(new Effect(px, dino.y + 10, 'parry'));
                            floatingTexts.push(new FloatingText(dino.x - 16, dino.y - 30, X.t === 14 ? "PHẢN ĐÒN! CHOÁNG" : "CHẶN!"));
                            this.moc = null; dino.dy = -5; this.hatVang(X.d * 4, -5);
                            shakeTimer = Math.max(shakeTimer, 10);
                            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900, 0.08, 'square', 0.18, 600);
                            if (X.t === 14){ this.state = 'choang'; this.t = 0; this.noiTiep = null; this.soNoi = 0; this.keoHet = 0; }
                            return;
                        }
                        if (X.t === 14){ this.vetChem(95, false, 0.35, 'boXuong'); this.danThang(); shakeTimer = Math.max(shakeTimer, 14); }
                        if (X.t === 22){
                            this.danThang(); this.vetChem(105, false, 0.55, 'hatLen');
                            this.moc = null; this.hatVang(X.d * 11, -9);
                            shakeTimer = Math.max(shakeTimer, 22);
                            if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
                        }
                    }
                    return;
                }
                if (X.pha === 've'){ X.dai = COR_KEO_DAI * Math.max(0, 1 - X.t / 10); if (X.t >= 10) this.moc = null; }
            }
            tickRe(){
                let R = this.re; if (!R) return;
                R.t++;
                if (R.pha === 'bao'){
                    if (R.t >= R.max){
                        R.pha = 'no'; R.t = 0;
                        shakeTimer = Math.max(shakeTimer, 8);
                        if (checkAABB(dino, { x: R.gx - 38, y: 320 - 40, w: 76, h: 40 })){
                            R.bat = true; R.gx = dino.x + dino.w/2; this.daTrung = true;
                            let xa = Math.max(0, Math.abs(R.gx - this.cx()) - 64);
                            R.giu = Math.round(xa / 12) + 16 + 30;
                            floatingTexts.push(new FloatingText(dino.x - 10, dino.y - 30, "BỊ TRÓI! (NHẤN J)"));
                        }
                    }
                    return;
                }
                if (R.pha === 'no' && !R.bat){ if (R.t >= 20) this.re = null; return; }
                if (R.bat){
                    let j = !!keys['KeyJ'];
                    if (j && !this._jPrev) R.giu -= 5;
                    this._jPrev = j;
                    dino.x = R.gx - dino.w/2; dino.y = 320 - dino.h; dino.dy = 0; dino.grounded = true;
                    if (--R.giu <= 0 && !(R.toi && R.u >= 16)){
                        floatingTexts.push(new FloatingText(dino.x - 10, dino.y - 30, "THOÁT!"));
                        R.bat = false; dino.dy = -7; dino.grounded = false;
                    }
                }
            }
            tickRoi(){
                for (let i = this.roi.length - 1; i >= 0; i--){
                    let W = this.roi[i]; W.t++;
                    if (W.pha === 'bao'){ if (W.t >= 12){ W.pha = 'quat'; W.t = 0; } continue; }
                    if (W.pha === 'quat'){
                        W.dai = COR_ROI_DAI * Math.min(1, W.t / 3);
                        if (!W.hit){
                            let L = corXucDai(W);
                            let ex = W.ox + W.d * Math.cos(W.goc) * L, ey = W.oy + Math.sin(W.goc) * L;
                            let px = dino.x + dino.w/2, py = dino.y + dino.h/2;
                            let vx = ex - W.ox, vy = ey - W.oy, L2 = vx*vx + vy*vy || 1;
                            let u = Math.max(0, Math.min(1, ((px - W.ox) * vx + (py - W.oy) * vy) / L2));
                            if (Math.hypot(px - (W.ox + vx * u), py - (W.oy + vy * u)) < 8 + Math.min(dino.w, dino.h) / 2){ W.hit = true; this.hurtP(1); }
                        }
                        if (W.t >= 7){ W.pha = 've'; W.t = 0; }
                        continue;
                    }
                    W.dai = COR_ROI_DAI * Math.max(0, 1 - W.t / 6);
                    if (W.t >= 6) this.roi.splice(i, 1);
                }
            }
            tickTom(){
                let M = this.tom; if (!M) return;
                M.t++;
                if (M.pha === 'bao'){
                    if (M.t >= 38){
                        M.pha = 'no'; M.t = 0;
                        shakeTimer = Math.max(shakeTimer, 12);
                        let r = { x: M.gx - 30, y: 320 - 130, w: 60, h: 130 };
                        if (checkAABB(dino, r)){
                            if (dino.isShielding()){
                                visualEffects.push(new Effect(dino.x + dino.w/2, dino.y, 'parry'));
                            } else {
                                M.bat = true; M.t = 0; M.giu = 58; this.daTrung = true;
                                floatingTexts.push(new FloatingText(dino.x - 10, dino.y - 30, "BỊ TÓM! (NHẤN J)"));
                            }
                        }
                    }
                    return;
                }
                if (M.pha === 'no' && !M.bat){ if (M.t >= 16) this.tom = null; return; }
                if (M.bat){
                    let j = !!keys['KeyJ'];
                    if (j && !this._jPrev){ M.giu -= 9; }
                    this._jPrev = j;
                    dino.x = M.gx - dino.w/2; dino.y = 320 - dino.h - 26; dino.dy = 0;
                    M.giu--;
                    if (M.giu <= 0 && M.t < 46){
                        floatingTexts.push(new FloatingText(dino.x - 10, dino.y - 30, "THOÁT!"));
                        dino.dy = -7; this.tom = null; this.t = 420;
                    }
                }
            }

            // ================= VẼ TỔNG HỢP & THANH MÁU HUD =================
            draw(){
                this.veVatThe();

                // Tàn ảnh lướt bóng của Absalom (Đã sửa lỗi cú pháp veThanTaiToaDo)
                if (this.bong && this.bong.length){
                    for (let i = this.bong.length - 1; i >= 0; i--){
                        let B = this.bong[i]; B.t--;
                        ctx.save();
                        ctx.globalAlpha = 0.34 * (B.t / 12);
                        this.veThanTaiToaDo(B.x, B.y, B.left !== undefined ? B.left : this.facingLeft, B.armR !== undefined ? B.armR : this.armR, true, B.spin || 0);
                        ctx.restore();
                        if (B.t <= 0) this.bong.splice(i, 1);
                    }
                }

                // Ảo ảnh Nephilim trong chiêu Gọng Kìm ('phan')
                if (this.aoAnh){
                    ctx.save();
                    ctx.globalAlpha = 0.65 + 0.2 * Math.sin(frames * 0.4);
                    this.veThanTaiToaDo(this.aoAnh.x, this.aoAnh.y, this.aoAnh.left, this.aoAnh.armR, true, 0);
                    ctx.restore();
                }

                // ĐỘN THỔ: Vũng lầy Hủ Hóa sủi bọt bóng tối dưới mặt đất
                if (this.state === 'don' && this.chim >= 1 && this.ngamX !== undefined){
                    ctx.save();
                    ctx.fillStyle = "#12041C";
                    ctx.beginPath(); ctx.ellipse(this.ngamX, 320, 42, 8, 0, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "#E040FB"; ctx.lineWidth = 2; ctx.stroke();
                    for (let i = 0; i < 6; i++){
                        ctx.globalAlpha = 0.6 + 0.35 * Math.sin(frames * 0.4 + i);
                        ctx.fillStyle = (i % 2 === 0) ? "#E040FB" : "#FFD54F";
                        ctx.beginPath(); ctx.arc(this.ngamX - 25 + i * 10, 317 - Math.abs(Math.sin(frames * 0.3 + i * 1.3)) * 14, 4.5, 0, 6.28); ctx.fill();
                    }
                    ctx.restore();
                }

                // Cảnh báo nhịp bổ rìu của Móc Kéo (bật khiên L đúng nhịp này sẽ phản đòn làm choáng Boss)
                let Q2 = this.moc;
                if (Q2 && Q2.pha === 'nen' && Q2.t >= 4 && Q2.t <= 14){
                    ctx.save(); ctx.globalAlpha = 0.6 + 0.4 * ((frames >> 1) & 1);
                    ctx.fillStyle = "#FFEA00"; ctx.font = "bold 16px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("⚡ ĐỠ KHIÊN (L)!", dino.x + dino.w/2, dino.y - 14);
                    ctx.textAlign = "left"; ctx.restore();
                }

                // Vẽ thân chính của Absalom
                if (this.chim < 1){
                    if (this.chim > 0){
                        ctx.save(); ctx.beginPath(); ctx.rect(-100, -400, canvas.width + 200, 720); ctx.clip();
                        ctx.translate(0, this.chim * this.h);
                        this.veThan();
                        ctx.restore();
                    } else {
                        this.veThan();
                    }
                }

                // Vẽ nhãn trạng thái trên đầu & Thanh máu Top Boss Bar
                if (!this.dying && this.hp > 0){
                    ctx.save();
                    let mainCol = (this.stage === 3 || this.bung) ? "#FFAB00" : (this.stage === 2 ? "#E040FB" : "#AB47BC");
                    ctx.fillStyle = mainCol; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                    let subTitle = this.state === 'quy' ? "SUY YẾU — TẤN CÔNG!" : (this.bung ? "HỖN MANG BÙNG PHÁT" : (this.stage === 2 ? "AVATAR OF CHAOS" : (this.stage === 3 ? "THE CORRUPTION" : "FIRST OF THE NEPHILIM")));
                    if (this.chim < 0.8) ctx.fillText(subTitle, this.cx(), this.y - 16);
                    if (typeof drawTopBossBar === 'function'){
                        drawTopBossBar(this, mainCol, this.name);
                    }
                    ctx.textAlign = "left";
                    ctx.restore();
                }
            }

            // ================= TẠO HÌNH CHI TIẾT ABSALOM — THỦ LĨNH NEPHILIM THA HÓA =================
            veThan(){
                this.veThanTaiToaDo(this.x, this.y, this.facingLeft, this.armR, false, this.spinBody || 0);
            }

            veThanTaiToaDo(xPos, yPos, isLeft, armAngle, isGhost, spinAngle){
                let S = this.stage, H = this.h, W = this.w, k = H / 96;
                let d = isLeft ? -1 : 1;
                let cx = xPos + W / 2, chan = yPos + H;
                let glow = (S === 3 || this.bung) ? "#FFAB00" : "#E040FB";
                let subGlow = (S === 3 || this.bung) ? "#FF3D00" : "#7B1FA2";
                let armorMain = isGhost ? "#2A123D" : (S === 2 ? "#160922" : "#1E142B");
                let armorTrim = (S === 3 || this.bung) ? "#FFD54F" : "#B39DDB";

                // Độ rung giật điên loạn khi đang cuồng nộ / gồng đòn
                let jx = (!isGhost && (this.frenzy > 0 || this.bung)) ? (Math.random() - 0.5) * 4 * (this.frenzy || 0.4) : 0;
                let jy = (!isGhost && (this.frenzy > 0 || this.bung)) ? (Math.random() - 0.5) * 3 * (this.frenzy || 0.4) : 0;

                ctx.save();
                if (this.dying && !isGhost){ ctx.globalAlpha = Math.max(0, 1 - (this.deathTimer || 0) / 90); }

                // 1. HÀO QUANG & TIA SÉT HỦ HÓA BAO QUANH CƠ THỂ
                if (!isGhost){
                    let hao = 0.24 + 0.12 * Math.sin(frames * 0.15) + (S === 3 ? 0.12 : 0);
                    let rg = ctx.createRadialGradient(cx, yPos + H * 0.52, 8, cx, yPos + H * 0.52, H * 1.05);
                    rg.addColorStop(0, (S === 3 || this.bung) ? "rgba(255,145,0," + hao + ")" : "rgba(213,0,249," + hao + ")");
                    rg.addColorStop(0.55, "rgba(74,20,140," + (hao * 0.5).toFixed(2) + ")");
                    rg.addColorStop(1, "rgba(0,0,0,0)");
                    ctx.fillStyle = rg; ctx.fillRect(cx - H, yPos - 28, H * 2, H + 44);
                }

                ctx.translate(cx + jx, chan + (isGhost ? 0 : Math.max(0, this.cui) * 14 * k) + jy);
                ctx.scale(d, 1);

                // Xoay toàn thân trên không nếu đang dùng chiêu Nhảy Máy Chém ('nhay')
                if (spinAngle){
                    ctx.translate(0, -H * 0.52);
                    ctx.rotate(spinAngle);
                    ctx.translate(0, H * 0.52);
                } else if (!isGhost && (this.state === 'quy' || this.state === 'choang')){
                    ctx.rotate(0.26 * this.cui);
                }

                let buoc = isGhost ? 0 : Math.sin(this.walk * 0.09) * 5.5 * k;
                let sway = Math.sin(frames * 0.08) * 3.5 * k;

                // 2. ĐÔI CHÂN BỌC THIẾT GIÁP NEPHILIM HẠNG NẶNG (Vẽ cố định trên mặt đất)
                let veChan = (ox, lech) => {
                    ctx.fillStyle = armorMain;
                    ctx.fillRect((ox - 7.5) * k + lech, -38 * k, 15 * k, 38 * k);
                    // Giáp gối đầu lâu có sừng nhọn
                    ctx.fillStyle = "#37244A";
                    ctx.beginPath();
                    ctx.moveTo((ox - 10) * k + lech, -28 * k);
                    ctx.lineTo(ox * k + lech, -33 * k);
                    ctx.lineTo((ox + 10) * k + lech, -28 * k);
                    ctx.lineTo((ox + 7) * k + lech, -14 * k);
                    ctx.lineTo((ox - 7) * k + lech, -14 * k);
                    ctx.closePath(); ctx.fill();
                    ctx.fillStyle = glow;
                    ctx.fillRect((ox - 3.5) * k + lech, -24 * k, 7 * k, 3.5 * k);
                    // Ủng sắt vuốt quỷ
                    ctx.fillStyle = "#100619";
                    ctx.beginPath();
                    ctx.moveTo((ox - 9) * k + lech, -8 * k);
                    ctx.lineTo((ox + 10) * k + lech, -8 * k);
                    ctx.lineTo((ox + 14) * k + lech, 0);
                    ctx.lineTo((ox - 9) * k + lech, 0);
                    ctx.closePath(); ctx.fill();
                };
                veChan(-11, buoc);
                veChan(9, -buoc);

                // Khố giáp & Đai lưng Đầu Lâu Nephilim
                ctx.fillStyle = "#2A0E3D";
                ctx.beginPath();
                ctx.moveTo(-11 * k, -39 * k); ctx.lineTo(13 * k, -39 * k);
                ctx.lineTo(9 * k + sway * 0.3, -10 * k); ctx.lineTo(0, -18 * k); ctx.lineTo(-9 * k + sway * 0.3, -8 * k);
                ctx.closePath(); ctx.fill();
                ctx.fillStyle = armorTrim;
                ctx.fillRect(-17 * k, -43 * k, 34 * k, 5.5 * k);
                ctx.fillStyle = glow;
                ctx.beginPath(); ctx.arc(1 * k, -40 * k, 5 * k, 0, 6.28); ctx.fill();

                // ===== KHỐI THÂN TRÊN NGHIÊNG THEO LỰC VUNG ĐẠI RÌU (DYNAMIC TORSO TILT) =====
                ctx.save();
                ctx.translate(0, -40 * k);
                let torsoTilt = (!spinAngle) ? (this.cui * 0.25 + (armAngle + 0.3) * 0.14) : 0;
                ctx.rotate(Math.max(-0.42, Math.min(0.48, torsoTilt)));
                ctx.translate(0, 40 * k);

                // 3. ÁO CHOÀNG XÚC TU HỖN MANG & CÁNH XƯƠNG HỦ HÓA SAU LƯNG
                let numTentacles = S === 2 ? 7 : (S === 3 ? 6 : 5);
                ctx.lineCap = 'round';
                for (let i = 0; i < numTentacles; i++){
                    let fastWave = (this.frenzy > 0 || this.bung) ? 0.22 : 0.09;
                    let sw = Math.sin(frames * fastWave + i * 1.3) * (18 + this.frenzy * 8) * k;
                    ctx.strokeStyle = (i % 2 === 0) ? "#140520" : "#2D0E42";
                    ctx.lineWidth = (9.5 - i * 1.0) * k;
                    ctx.beginPath();
                    ctx.moveTo(-10 * k, -68 * k);
                    ctx.bezierCurveTo(-40 * k, (-96 + i * 12) * k, -66 * k + sw, (-56 + i * 15) * k, -82 * k + sw, (-92 + i * 22) * k);
                    ctx.stroke();
                    ctx.strokeStyle = glow;
                    ctx.lineWidth = 1.5 * k;
                    ctx.stroke();
                }

                // Tà áo choàng chiến bào rách tả tơi
                ctx.fillStyle = "#160722";
                ctx.beginPath();
                ctx.moveTo(-15 * k, -64 * k);
                ctx.quadraticCurveTo(-44 * k - sway, -34 * k, -38 * k - sway * 1.5, -2 * k);
                ctx.lineTo(-18 * k, -12 * k);
                ctx.lineTo(-6 * k, -2 * k);
                ctx.lineTo(4 * k, -42 * k);
                ctx.closePath(); ctx.fill();

                // 4. BỜM TÓC BẠC XÁM TRO DÀI XÕA RỐI TUNG
                ctx.fillStyle = "#B0BEC5";
                ctx.beginPath();
                ctx.moveTo(4 * k, -95 * k);
                ctx.quadraticCurveTo(-28 * k - sway, -88 * k, -42 * k - sway * 1.6, -50 * k);
                ctx.lineTo(-24 * k - sway, -58 * k);
                ctx.lineTo(-30 * k - sway * 1.2, -40 * k);
                ctx.lineTo(-8 * k, -72 * k);
                ctx.closePath(); ctx.fill();

                // 5. TAY TRÁI (TAY SAU) — BÀN TAY QUỶ BỌC GIÁP GAI
                ctx.save();
                ctx.translate(-15 * k, -68 * k);
                ctx.rotate(0.32 - armAngle * 0.25 + Math.sin(frames * 0.1) * 0.12);
                ctx.fillStyle = armorMain; ctx.fillRect(-5.5 * k, 0, 11 * k, 25 * k);
                ctx.fillStyle = armorTrim; ctx.fillRect(-6.5 * k, 12 * k, 13 * k, 4.5 * k);
                ctx.fillStyle = glow;
                for (let c = -1; c <= 1; c++){
                    ctx.beginPath();
                    ctx.moveTo(c * 3.5 * k, 25 * k); ctx.lineTo((c * 4.5 + 2) * k, 36 * k); ctx.lineTo((c * 3.5 + 3.5) * k, 25 * k);
                    ctx.closePath(); ctx.fill();
                }
                ctx.restore();

                // 6. THÂN TRÊN ĐỒ SỘ — LỒNG NGỰC XƯƠNG SƯỜN & TRÁI TIM HỦ HÓA
                let tg = ctx.createLinearGradient(0, -88 * k, 0, -38 * k);
                tg.addColorStop(0, "#38224A"); tg.addColorStop(1, "#12071C");
                ctx.fillStyle = tg;
                ctx.beginPath();
                ctx.moveTo(-23 * k, -38 * k);
                ctx.lineTo(-30 * k, -74 * k);
                ctx.lineTo(-8 * k, -90 * k);
                ctx.lineTo(20 * k, -85 * k);
                ctx.lineTo(26 * k, -40 * k);
                ctx.closePath(); ctx.fill();

                // Khung xương sườn Nephilim lộ thiên ôm lấy lõi ngực
                ctx.strokeStyle = armorTrim; ctx.lineWidth = 2.4 * k;
                for (let r = 0; r < 3; r++){
                    let ry = (-74 + r * 9) * k;
                    ctx.beginPath();
                    ctx.moveTo(-18 * k, ry); ctx.quadraticCurveTo(3 * k, ry + 7 * k, 20 * k, ry);
                    ctx.stroke();
                }

                // Lõi Trái Tim Hủ Hóa (Heart of Corruption) đập rực sáng giữa ngực
                let heartPulse = 0.75 + 0.35 * Math.sin(frames * 0.22);
                ctx.save();
                ctx.shadowColor = glow; ctx.shadowBlur = 16 * heartPulse;
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.moveTo(3 * k, -72 * k); ctx.lineTo(11 * k, -60 * k);
                ctx.lineTo(3 * k, -48 * k); ctx.lineTo(-5 * k, -60 * k);
                ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(1 * k, -64 * k, 4 * k, 8 * k);
                ctx.restore();

                // 7. CẦU VAI ĐẦU LÂU BẤT ĐỐI XỨNG & CỤM TINH THỂ MỌC XUYÊN VAI
                ctx.fillStyle = "#2A183B";
                ctx.beginPath(); ctx.arc(-19 * k, -75 * k, 14 * k, Math.PI, 0); ctx.closePath(); ctx.fill();
                ctx.fillStyle = subGlow;
                ctx.beginPath();
                ctx.moveTo(-27 * k, -75 * k); ctx.lineTo(-42 * k, -106 * k); ctx.lineTo(-14 * k, -83 * k);
                ctx.closePath(); ctx.fill();
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.moveTo(-22 * k, -77 * k); ctx.lineTo(-30 * k, -102 * k); ctx.lineTo(-12 * k, -83 * k);
                ctx.closePath(); ctx.fill();

                // Vai trước: Giáp Đầu Lâu Thủ Lĩnh Nephilim
                ctx.fillStyle = "#3E2752";
                ctx.beginPath(); ctx.ellipse(17 * k, -73 * k, 16 * k, 13 * k, 0.2, 0, 6.28); ctx.fill();
                ctx.strokeStyle = armorTrim; ctx.lineWidth = 2.2 * k; ctx.stroke();
                let spikeH = (S >= 2 ? 1.38 : 1.05);
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.moveTo(9 * k, -80 * k); ctx.lineTo(23 * k, (-110 * spikeH) * k); ctx.lineTo(25 * k, -78 * k);
                ctx.closePath(); ctx.fill();

                // 8. ĐẦU ABSALOM: MẶT NẠ CHIẾN BINH NEPHILIM NỨT TOÁC & VƯƠNG MIỆN SỪNG ĐÔI
                ctx.fillStyle = "#1E142B";
                ctx.beginPath(); ctx.ellipse(9 * k, -90 * k, 11.5 * k, 11.5 * k, 0, 0, 6.28); ctx.fill();
                ctx.fillStyle = "#CFD8DC";
                ctx.beginPath();
                ctx.moveTo(4 * k, -99 * k); ctx.lineTo(20 * k, -97 * k);
                ctx.lineTo(21 * k, -82 * k); ctx.lineTo(10 * k, -77 * k);
                ctx.lineTo(2 * k, -84 * k);
                ctx.closePath(); ctx.fill();
                // Khe mặt nạ & Đôi mắt phát sáng dữ tợn kéo vệt sáng
                ctx.fillStyle = "#09040E";
                ctx.fillRect(6 * k, -93 * k, 14 * k, 5 * k);
                ctx.save();
                ctx.shadowColor = "#FFEA00"; ctx.shadowBlur = 12;
                ctx.fillStyle = "#FFEA00";
                ctx.fillRect(14 * k, -92 * k, 5 * k, 3.2 * k);
                ctx.fillRect(7 * k, -92 * k, 4 * k, 3.2 * k);
                ctx.restore();

                // Cặp Sừng Vương Miện Nephilim uốn cong oai vệ trên đầu
                ctx.fillStyle = "#221030"; ctx.strokeStyle = armorTrim; ctx.lineWidth = 1.6 * k;
                ctx.beginPath();
                ctx.moveTo(2 * k, -96 * k);
                ctx.quadraticCurveTo(-14 * k, -120 * k, -28 * k, -110 * k);
                ctx.quadraticCurveTo(-10 * k, -108 * k, 6 * k, -93 * k);
                ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(11 * k, -98 * k);
                ctx.quadraticCurveTo(6 * k, -124 * k, -8 * k, -120 * k);
                ctx.quadraticCurveTo(12 * k, -114 * k, 17 * k, -96 * k);
                ctx.closePath(); ctx.fill(); ctx.stroke();

                // 9. CÁNH TAY PHẢI CƠ BẮP & ĐẠI CHIẾN PHỦ ABYSSAL GREAT-CLEAVER
                ctx.save();
                ctx.translate(15 * k, -71 * k);
                ctx.rotate(armAngle);
                ctx.fillStyle = armorMain; ctx.fillRect(-4 * k, -6.5 * k, 28 * k, 13 * k);
                ctx.fillStyle = armorTrim; ctx.fillRect(10 * k, -7.5 * k, 9 * k, 15 * k);
                veRiuAbsalom(k, S, this.bung);
                ctx.restore();

                ctx.restore(); // Kết thúc khối thân trên nghiêng
                ctx.restore();
            }

            // ================= VẼ CÁC VẬT THỂ & HIỆU ỨNG KỸ NĂNG =================
            veVatThe(){
                let glow = (this.stage === 3 || this.bung) ? "#FFAB00" : "#E040FB";

                // 0. Vết nứt dung nham Hủ Hóa trên mặt đất khi đại rìu bổ xuống
                for (let vd of this.vachDat){
                    let u = vd.t / vd.max;
                    ctx.save();
                    ctx.globalAlpha = u;
                    ctx.shadowColor = glow; ctx.shadowBlur = 12;
                    ctx.fillStyle = "#1A0524";
                    ctx.beginPath(); ctx.ellipse(vd.x, 320, vd.r, 6, 0, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = glow; ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.moveTo(vd.x - vd.r * 0.85, 320);
                    ctx.lineTo(vd.x - vd.r * 0.3, 315);
                    ctx.lineTo(vd.x + vd.r * 0.2, 323);
                    ctx.lineTo(vd.x + vd.r * 0.85, 318);
                    ctx.stroke();
                    ctx.restore();
                }

                // 1. Vùng cảnh báo chiêu thức (Telegraph)
                if (this.tel){
                    let T = this.tel, u = 1 - T.t / T.max;
                    ctx.save();
                    ctx.globalAlpha = 0.16 + 0.28 * u;
                    ctx.fillStyle = "#AB47BC";
                    if (T.cot){
                        ctx.beginPath(); ctx.ellipse(T.x + T.w/2, 318, T.w * (0.5 + 0.5 * u), 10, 0, 0, 6.28); ctx.fill();
                        ctx.globalAlpha = 0.6 + 0.4 * u; ctx.strokeStyle = glow; ctx.lineWidth = 2.5;
                        ctx.beginPath(); ctx.ellipse(T.x + T.w/2, 318, T.w * 0.5, 10, 0, 0, 6.28); ctx.stroke();
                    } else {
                        ctx.fillRect(T.x, T.y, T.w, T.h);
                        ctx.globalAlpha = 0.65; ctx.strokeStyle = glow; ctx.lineWidth = 2;
                        ctx.strokeRect(T.x + 0.5, T.y + 0.5, T.w - 1, T.h - 1);
                    }
                    ctx.restore();
                }

                // 2. Mưa Thiên Thạch Hắc Tinh (Corruption Meteors)
                if (this.thienThach && this.thienThach.length){
                    for (let m of this.thienThach){
                        ctx.save();
                        ctx.globalAlpha = 0.55; ctx.strokeStyle = glow; ctx.lineWidth = 2;
                        ctx.beginPath(); ctx.ellipse(m.tx, 318, 24, 5, 0, 0, 6.28); ctx.stroke();
                        if (m.wait <= 0){
                            ctx.shadowColor = glow; ctx.shadowBlur = 14;
                            ctx.strokeStyle = "rgba(224, 64, 251, 0.55)"; ctx.lineWidth = 14; ctx.lineCap = "round";
                            ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * 5, m.y - m.vy * 5); ctx.stroke();
                            ctx.fillStyle = "#240A38";
                            ctx.beginPath();
                            ctx.moveTo(m.x, m.y + 16); ctx.lineTo(m.x - 13, m.y);
                            ctx.lineTo(m.x, m.y - 18); ctx.lineTo(m.x + 13, m.y);
                            ctx.closePath(); ctx.fill();
                            ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 2; ctx.stroke();
                        }
                        ctx.restore();
                    }
                }

                // 3. Vệt chém Đại Chiến Phủ Rách Không Gian (3 lớp + Tia chớp Hủ Hóa dọc lưỡi chém)
                for (let v of this.vet){
                    let u = v.t / v.max;
                    ctx.save(); ctx.globalAlpha = 0.95 * u;
                    ctx.translate(v.x, v.y); ctx.scale(v.d, 1); ctx.rotate(v.lech);
                    // Lớp ngoài: Bóng tối Hư Không
                    ctx.fillStyle = "#1A0524";
                    ctx.beginPath(); ctx.arc(0, 0, v.r * 1.06, -1.22, 1.22);
                    ctx.arc(-v.r * 0.24, 0, v.r * 0.78, 1.12, -1.12, true); ctx.closePath(); ctx.fill();
                    // Lớp giữa: Năng lượng Hủ Hóa rực cháy
                    ctx.shadowColor = glow; ctx.shadowBlur = 16;
                    ctx.fillStyle = glow;
                    ctx.beginPath(); ctx.arc(0, 0, v.r, -1.15, 1.15);
                    ctx.arc(-v.r * 0.20, 0, v.r * 0.84, 1.05, -1.05, true); ctx.closePath(); ctx.fill();
                    // Lớp lõi: Lưỡi ánh sáng trắng sắc lẹm
                    ctx.fillStyle = "#FFFFFF";
                    ctx.beginPath(); ctx.arc(0, 0, v.r * 0.96, -0.88, 0.88);
                    ctx.arc(-v.r * 0.12, 0, v.r * 0.89, 0.82, -0.82, true); ctx.closePath(); ctx.fill();
                    // Tia sét giật dọc vòng cung chém
                    ctx.strokeStyle = "#FFEA00"; ctx.lineWidth = 2;
                    ctx.beginPath();
                    for (let s = -4; s <= 4; s++){
                        let ang = s * 0.24;
                        let rr = v.r * (0.92 + (Math.random() - 0.5) * 0.14);
                        if (s === -4) ctx.moveTo(Math.cos(ang) * rr, Math.sin(ang) * rr);
                        else ctx.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr);
                    }
                    ctx.stroke();
                    ctx.restore();
                }

                // 3.5. Mảnh đá Hắc Diện Thạch & Tia lửa Hủ Hóa văng tung tóe
                for (let p of this.manhDa){
                    ctx.save();
                    ctx.globalAlpha = Math.min(1, p.t / 12);
                    ctx.translate(p.x, p.y); ctx.rotate(p.rot);
                    ctx.fillStyle = p.mau;
                    ctx.beginPath();
                    ctx.moveTo(-p.r, -p.r * 0.6); ctx.lineTo(p.r, -p.r * 0.3);
                    ctx.lineTo(p.r * 0.5, p.r); ctx.lineTo(-p.r * 0.7, p.r * 0.8);
                    ctx.closePath(); ctx.fill();
                    ctx.restore();
                }

                // 4. Xúc tu MÓC KÉO
                let Q = this.moc;
                if (Q){
                    ctx.save();
                    if (Q.pha === 'bao'){
                        ctx.globalAlpha = 0.35 + 0.5 * (Q.t / Q.bao); ctx.strokeStyle = "#FFAB00"; ctx.setLineDash([6, 6]); ctx.lineWidth = 2.5;
                        let L = corXucDai({ oy: Q.oy, goc: Q.goc, dai: COR_KEO_DAI });
                        ctx.beginPath(); ctx.moveTo(Q.ox, Q.oy); ctx.lineTo(Q.ox + Q.d * Math.cos(Q.goc) * L, Q.oy + Math.sin(Q.goc) * L); ctx.stroke();
                        ctx.setLineDash([]);
                    } else {
                        let ex, ey;
                        if (Q.pha === 'keo' || Q.pha === 'nen'){ ex = Q.ex; ey = Q.ey; }
                        else { let L = corXucDai(Q); ex = Q.ox + Q.d * Math.cos(Q.goc) * L; ey = Q.oy + Math.sin(Q.goc) * L; }
                        if (ex !== undefined){
                            let mx = (Q.ox + ex)/2, my = (Q.oy + ey)/2 + Math.sin(frames * 0.6) * 9;
                            ctx.lineCap = 'round';
                            ctx.strokeStyle = "#1A0826"; ctx.lineWidth = 11;
                            ctx.beginPath(); ctx.moveTo(Q.ox, Q.oy); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
                            ctx.strokeStyle = "#FF6D00"; ctx.lineWidth = 3; ctx.stroke();
                            for (let s = 1; s < 6; s++){
                                let t = s / 6, mt = 1 - t;
                                let px = mt*mt*Q.ox + 2*mt*t*mx + t*t*ex;
                                let py = mt*mt*Q.oy + 2*mt*t*my + t*t*ey;
                                ctx.fillStyle = "#FFD54F";
                                ctx.beginPath(); ctx.arc(px, py, 3.2, 0, 6.28); ctx.fill();
                            }
                            ctx.strokeStyle = "#FFEA00"; ctx.lineWidth = 3.5;
                            ctx.beginPath(); ctx.arc(ex, ey, 10, -2.4 * Q.d, 1.2 * Q.d, Q.d < 0); ctx.stroke();
                        }
                    }
                    ctx.restore();
                }

                // 5. RỄ TRÓI HỦ HÓA
                let Rr = this.re;
                if (Rr && Rr.pha !== 'bao'){
                    ctx.save();
                    let u = Rr.bat ? 1 : Math.max(0, 1 - Rr.t / 20), cao = Rr.bat ? 44 : 50 * u;
                    ctx.strokeStyle = "#2A0B38"; ctx.lineWidth = 6; ctx.lineCap = 'round';
                    for (let i = -2; i <= 2; i++){
                        let x0 = Rr.gx + i * 11, sw = Math.sin(frames * 0.2 + i) * 4;
                        ctx.beginPath(); ctx.moveTo(x0, 322);
                        ctx.bezierCurveTo(x0 + 14 * Math.sign(i || 1), 322 - cao * 0.4, x0 - 12 * Math.sign(i || 1) + sw, 322 - cao * 0.7, Rr.gx + sw, 322 - cao);
                        ctx.stroke();
                    }
                    ctx.strokeStyle = glow; ctx.lineWidth = 2;
                    for (let i = -2; i <= 2; i += 2){
                        ctx.beginPath(); ctx.moveTo(Rr.gx + i * 11, 322); ctx.lineTo(Rr.gx + i * 5, 322 - cao * 0.85); ctx.stroke();
                    }
                    ctx.restore();
                }

                // 6. ROI XÚC TU (Cơn Thịnh Nộ Nephilim)
                for (let W of this.roi){
                    ctx.save();
                    if (W.pha === 'bao'){
                        ctx.globalAlpha = 0.25 + 0.45 * W.t / 12; ctx.strokeStyle = "#E1BEE7"; ctx.lineWidth = 1.5; ctx.setLineDash([4, 5]);
                        let L = corXucDai({ oy: W.oy, goc: W.goc, dai: COR_ROI_DAI });
                        ctx.beginPath(); ctx.moveTo(W.ox, W.oy); ctx.lineTo(W.ox + W.d * Math.cos(W.goc) * L, W.oy + Math.sin(W.goc) * L); ctx.stroke();
                    } else if (W.dai > 0){
                        let L = corXucDai(W), ex = W.ox + W.d * Math.cos(W.goc) * L, ey = W.oy + Math.sin(W.goc) * L;
                        ctx.lineCap = 'round'; ctx.strokeStyle = "#1A0A24"; ctx.lineWidth = 8;
                        ctx.beginPath(); ctx.moveTo(W.ox, W.oy);
                        ctx.quadraticCurveTo((W.ox + ex)/2 - W.d * 20, (W.oy + ey)/2 - 18, ex, ey); ctx.stroke();
                        ctx.strokeStyle = glow; ctx.lineWidth = 2.5; ctx.stroke();
                    }
                    ctx.restore();
                }

                // 7. SÓNG HỦ HÓA: Cụm tinh thể sắc nhọn cày xới mặt đất
                for (let w of this.song){
                    ctx.save();
                    ctx.shadowColor = w.xk ? "#FFAB00" : "#E040FB"; ctx.shadowBlur = 12;
                    ctx.fillStyle = "#220A33";
                    ctx.strokeStyle = w.xk ? "#FFD54F" : "#E040FB"; ctx.lineWidth = 2.2;
                    ctx.beginPath(); ctx.moveTo(w.x - 22, 320);
                    for (let i = 0; i < 4; i++){
                        ctx.lineTo(w.x - 15 + i * 10, 320 - w.cao * (i % 2 ? 0.72 : 1.15));
                        ctx.lineTo(w.x - 8 + i * 10, 320);
                    }
                    ctx.closePath(); ctx.fill(); ctx.stroke();
                    ctx.restore();
                }

                // 8. BẪY XÚC TU NGẦM (Pha 3)
                for (let b of this.bay){
                    ctx.save();
                    if (b.pha === 'di'){
                        ctx.fillStyle = "#6A1B9A";
                        for (let i = 0; i < 3; i++) ctx.fillRect(b.x - 14 + i * 10, 315 - Math.abs(Math.sin(frames * 0.4 + i)) * 9, 6, 7);
                        ctx.globalAlpha = 0.5; ctx.fillStyle = "#E040FB";
                        ctx.beginPath(); ctx.ellipse(b.x, 319, 24, 5, 0, 0, 6.28); ctx.fill();
                    } else if (b.pha === 'bao'){
                        ctx.globalAlpha = 0.45 + 0.45 * (b.t / 16); ctx.fillStyle = "#FFAB00";
                        ctx.beginPath(); ctx.ellipse(b.x, 318, 26, 8, 0, 0, 6.28); ctx.fill();
                    } else {
                        let u = Math.min(1, b.t / 5);
                        ctx.shadowColor = "#E040FB"; ctx.shadowBlur = 12;
                        ctx.fillStyle = "#1A0A24"; ctx.strokeStyle = glow; ctx.lineWidth = 2.4;
                        for (let i = -1; i <= 1; i++){
                            ctx.beginPath(); ctx.moveTo(b.x + i * 13 - 7, 320);
                            ctx.quadraticCurveTo(b.x + i * 22, 320 - 62 * u, b.x + i * 8, 320 - (116 - Math.abs(i) * 24) * u);
                            ctx.lineTo(b.x + i * 13 + 7, 320); ctx.closePath(); ctx.fill(); ctx.stroke();
                        }
                    }
                    ctx.restore();
                }

                // 9. XÚC TU PHÓNG & QUÉT VÒNG CUNG
                let X = this.xuc;
                if (X){
                    ctx.save();
                    if (X.pha === 'bao'){
                        ctx.globalAlpha = 0.30 + 0.5 * (X.t / 26); ctx.strokeStyle = "#E1BEE7"; ctx.setLineDash([6, 8]); ctx.lineWidth = 2;
                        let g0 = X.goc, g1 = X.quet ? COR_XUC_QUET[1] : X.goc;
                        for (let g of (X.quet ? [g0, g1] : [g0])){
                            let L = corXucDai({ oy: X.oy, goc: g, dai: 380 });
                            ctx.beginPath(); ctx.moveTo(X.ox, X.oy);
                            ctx.lineTo(X.ox + X.d * Math.cos(g) * L, X.oy + Math.sin(g) * L); ctx.stroke();
                        }
                        ctx.setLineDash([]);
                        if (X.quet){
                            ctx.globalAlpha = 0.12 + 0.14 * (X.t / 26); ctx.fillStyle = "#CE93D8";
                            ctx.beginPath(); ctx.moveTo(X.ox, X.oy);
                            for (let k = 0; k <= 12; k++){
                                let g = g0 + (g1 - g0) * k / 12, L = corXucDai({ oy: X.oy, goc: g, dai: 380 });
                                ctx.lineTo(X.ox + X.d * Math.cos(g) * L, X.oy + Math.sin(g) * L);
                            }
                            ctx.closePath(); ctx.fill();
                        }
                    } else if (X.dai > 0){
                        let L = corXucDai(X);
                        let ex = X.ox + X.d * Math.cos(X.goc) * L, ey = X.oy + Math.sin(X.goc) * L;
                        let mx = (X.ox + ex)/2, my = (X.oy + ey)/2 + Math.sin(frames * 0.5) * 10;
                        ctx.lineCap = 'round';
                        ctx.strokeStyle = "#1A0A24"; ctx.lineWidth = 13;
                        ctx.beginPath(); ctx.moveTo(X.ox, X.oy); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
                        ctx.strokeStyle = glow; ctx.lineWidth = 3.5; ctx.stroke();
                        ctx.fillStyle = "#FFEA00";
                        ctx.beginPath(); ctx.arc(ex, ey, 8, 0, 6.28); ctx.fill();
                    }
                    ctx.restore();
                }

                // 10. ĐÒN TÓM: BÀN TAY QUỶ KHỔNG LỒ TRỒI LÊN TỪ MẶT ĐẤT
                let M = this.tom;
                if (M && (M.pha === 'no' || M.bat)){
                    ctx.save();
                    let u = Math.min(1, M.t / 5), cao = M.bat ? 112 : 134 * (1 - Math.max(0, M.t - 8) / 8);
                    ctx.shadowColor = glow; ctx.shadowBlur = 14;
                    ctx.fillStyle = "#1A0826"; ctx.strokeStyle = glow; ctx.lineWidth = 2.8;
                    for (let i = -1; i <= 1; i += 2){
                        ctx.beginPath(); ctx.moveTo(M.gx + i * 24, 320);
                        ctx.quadraticCurveTo(M.gx + i * 38, 320 - cao * 0.6 * u, M.gx + i * (M.bat ? 4 : 10), 320 - cao * u);
                        ctx.lineTo(M.gx + i * 12, 320); ctx.closePath(); ctx.fill(); ctx.stroke();
                    }
                    ctx.restore();
                }
            }
        }
// BOSS_PART_END s0.CorruptionBoss.1

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
