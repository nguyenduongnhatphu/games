// BOSS_FILE: PontiffBoss
// BOSS_SNAPSHOT: 90b44e51b8a8c0ad12fba495a59e199c399e173aab86fbee147786ba09666942
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, platforms, shakeTimer, visualEffects
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

// Nguồn: index.html:37645 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PON_HP.1 READ_ONLY
const PON_HP   = [0, 90, 90];
// BOSS_PART_END s1.PON_HP.1

// Nguồn: index.html:37646 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PON_W.1 EDITABLE
const PON_W    = 46, PON_H = 98;
// BOSS_PART_END s1.PON_W.1

// Nguồn: index.html:37647 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PON_TRE.1 READ_ONLY
const PON_TRE  = 42;
// BOSS_PART_END s1.PON_TRE.1

// Nguồn: index.html:37648 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PON_MA_SONG.1 EDITABLE
const PON_MA_SONG = 900;
// BOSS_PART_END s1.PON_MA_SONG.1

// Nguồn: index.html:37649 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PON_MA_HOI.1 EDITABLE
const PON_MA_HOI  = 420;
// BOSS_PART_END s1.PON_MA_HOI.1

// Nguồn: index.html:37650 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PON_CD.1 EDITABLE
const PON_CD = { p_bong: 110, p_phanxet: 200, p_hoa: 210, p_lui: 150, p_quay: 90,
                         q_bung: 300, q_chu: 250, q_damkep: 190, q_combo: 60 };
// BOSS_PART_END s1.PON_CD.1

// Nguồn: index.html:37652 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PON_PHA.1 READ_ONLY
const PON_PHA = { q_bung: 2, q_chu: 2, q_damkep: 2, q_combo: 2, q_trieu: 2 };
// BOSS_PART_END s1.PON_PHA.1

// Nguồn: index.html:37653 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PON_LUA.1 READ_ONLY
const PON_LUA = "#FF7043", PON_PHEP = "#B388FF";
// BOSS_PART_END s1.PON_LUA.1

// Nguồn: index.html:37654 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.ponChop.1 EDITABLE
let ponChop = 0, ponBui = [];
// BOSS_PART_END s1.ponChop.1

// Nguồn: index.html:37735 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.drawPontiffBody.1 EDITABLE
function drawPontiffBody(a, P, ma){
            let d = a.facingLeft ? -1 : 1, W = a.w, H = a.h;
            let cx0 = a.x + W / 2, chan = a.y + H;
            let khom = P.cui || 0;
            ctx.save();
            ctx.translate(cx0, chan);
            ctx.scale(d, 1);
            if (ma){ ctx.globalAlpha = ma; }
            // bong + hao quang
            if (!ma){
                ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.beginPath(); ctx.ellipse(0, -2, W * 0.7, 6, 0, 0, 6.28); ctx.fill();
            }
            if (a.stage === 2 || ma){
                let gq = ctx.createRadialGradient(0, -H * 0.5, 4, 0, -H * 0.5, H * 0.8);
                gq.addColorStop(0, "rgba(179,136,255,0.30)"); gq.addColorStop(1, "rgba(80,30,160,0)");
                ctx.fillStyle = gq; ctx.beginPath(); ctx.ellipse(0, -H * 0.5, H * 0.55, H * 0.8, 0, 0, 6.28); ctx.fill();
            }
            let C = ma ? { ao: "#5E35B1", ao2: "#311B92", tim: "#9575CD", vien: "#D1C4E9", da: "#B39DDB", vang: "#E1BEE7", lot: "#7E57C2" }
                       : { ao: "#1C1A28", ao2: "#0C0B12", tim: "#2E2A3E", vien: "#8D7A3E", da: "#C9C2B0", vang: "#B8A160", lot: "#5A1520" };
            let vai = -H * (0.76 - khom * 0.08), eo = -H * 0.47;
            ctx.save(); ctx.translate(0, 0); ctx.rotate(khom * 0.25);
            // ao choang sau lung — lot do
            let dao = Math.sin(frames * 0.06 + (a.walk || 0) * 0.05) * 5;
            ctx.beginPath(); ctx.moveTo(-4, vai);
            ctx.quadraticCurveTo(-W * 0.8 - dao, vai * 0.5, -W * 0.95 - dao, -4);
            for (let i = 0; i <= 5; i++){ let u = i / 5; ctx.lineTo(-W * 0.95 - dao + (W * 0.95 + dao + 4) * u, -4 + (i % 2 ? -7 : 0)); }
            ctx.lineTo(6, vai * 0.6); ctx.closePath();
            ctx.fillStyle = C.lot; ctx.fill(); ctx.strokeStyle = C.ao2; ctx.lineWidth = 2; ctx.stroke();
            // TAY SAU + KIEM PHAN XET (tim)
            veTayKiemPon(-2, vai + 4, P.armB != null ? P.armB : 1.1, 'phep', P.sangB || 0, C, ma);
            // vay ao dai (tu eo toi dat), mep rach
            ctx.beginPath(); ctx.moveTo(-11, eo); ctx.lineTo(11, eo);
            ctx.lineTo(20, -3);
            for (let i = 0; i <= 6; i++){ let u = i / 6; ctx.lineTo(20 - 42 * u, -3 + (i % 2 ? -6 : 0)); }
            ctx.lineTo(-11, eo); ctx.closePath();
            let gv = ctx.createLinearGradient(0, eo, 0, 0); gv.addColorStop(0, C.ao); gv.addColorStop(1, C.ao2);
            ctx.fillStyle = gv; ctx.fill(); ctx.strokeStyle = C.ao2; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.strokeStyle = C.vien; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(0, eo); ctx.lineTo(1, -6); ctx.stroke();
            // chan / ung
            let bw = Math.sin((a.walk || 0) * 0.15) * 4;
            ctx.fillStyle = C.ao2; ctx.fillRect(-9 + bw, -6, 9, 6); ctx.fillRect(2 - bw, -6, 10, 6);
            // than tren
            ctx.beginPath(); ctx.moveTo(-10, eo); ctx.lineTo(-9, vai + 4); ctx.lineTo(10, vai + 4); ctx.lineTo(11, eo); ctx.closePath();
            ctx.fillStyle = C.tim; ctx.fill(); ctx.strokeStyle = C.ao2; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.strokeStyle = C.vien; ctx.lineWidth = 1.4;
            ctx.beginPath(); ctx.moveTo(-8, vai + 8); ctx.lineTo(0, eo + 6); ctx.lineTo(9, vai + 8); ctx.stroke();
            ctx.fillStyle = C.vien; ctx.fillRect(-11, eo - 3, 22, 4);           // dai lung vang
            // co + dau
            ctx.fillStyle = C.ao2; ctx.fillRect(-3, vai - 8, 7, 10);
            let dy = vai - 16;
            ctx.fillStyle = C.da; ctx.beginPath(); ctx.ellipse(2, dy, 6.5, 8, 0, 0, 6.28); ctx.fill();
            ctx.fillStyle = ma ? "#EDE7F6" : "#1A1418"; ctx.fillRect(4, dy - 2, 4, 2);    // khe mat
            // MAO MIEN nhon — ba gai cao
            ctx.fillStyle = C.vang; ctx.strokeStyle = ma ? C.ao2 : "#5E4E22"; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(-6, dy - 5); ctx.lineTo(-7, dy - 20); ctx.lineTo(-2, dy - 11); ctx.lineTo(2, dy - 28);
            ctx.lineTo(5, dy - 11); ctx.lineTo(10, dy - 21); ctx.lineTo(9, dy - 5); ctx.closePath(); ctx.fill(); ctx.stroke();
            // vai giap
            ctx.fillStyle = C.vien; ctx.beginPath(); ctx.ellipse(6, vai + 5, 7, 5, -0.3, 0, 6.28); ctx.fill();
            // TAY TRUOC + KIEM LUA (cam)
            veTayKiemPon(6, vai + 5, P.armF != null ? P.armF : 0.9, 'lua', P.sangF || 0, C, ma);
            ctx.restore();
            ctx.restore();
        }
// BOSS_PART_END s1.drawPontiffBody.1

// Nguồn: index.html:37799 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.veTayKiemPon.1 EDITABLE
function veTayKiemPon(sx, sy, goc, loai, sang, C, ma){
            ctx.save();
            ctx.translate(sx, sy); ctx.rotate(goc);
            ctx.fillStyle = C.ao; ctx.fillRect(0, -3.5, 30, 7);                 // canh tay dai
            ctx.fillStyle = C.vien; ctx.fillRect(26, -4, 5, 8);
            ctx.translate(32, 0);
            let L = 80;
            // chuoi + canh ve
            ctx.fillStyle = "#2B2224"; ctx.fillRect(-8, -2.5, 10, 5);
            ctx.fillStyle = loai === 'lua' ? "#6D4C41" : "#455A64"; ctx.fillRect(1, -8, 4, 16);
            // luoi
            let gl = ctx.createLinearGradient(0, -5, 0, 5);
            if (ma){ gl.addColorStop(0, "#EDE7F6"); gl.addColorStop(1, "#9575CD"); }
            else if (loai === 'lua'){ gl.addColorStop(0, "#5D4037"); gl.addColorStop(0.5, "#8D6E63"); gl.addColorStop(1, "#3E2723"); }
            else { gl.addColorStop(0, "#2A2F4A"); gl.addColorStop(0.5, "#6C6FA8"); gl.addColorStop(1, "#1C1F36"); }
            ctx.fillStyle = gl;
            ctx.beginPath(); ctx.moveTo(5, -5); ctx.lineTo(L - 10, -4); ctx.lineTo(L, 0); ctx.lineTo(L - 10, 4); ctx.lineTo(5, 5); ctx.closePath(); ctx.fill();
            // lop sang: lua lap loe / phep tim
            let nh = 0.45 + 0.25 * Math.sin(frames * (loai === 'lua' ? 0.5 : 0.2)) + sang * 0.6;
            ctx.globalAlpha = (ctx.globalAlpha || 1) * Math.min(1, nh);
            ctx.strokeStyle = loai === 'lua' ? "#FFAB40" : "#B388FF"; ctx.lineWidth = 2 + sang * 3;
            ctx.beginPath(); ctx.moveTo(7, loai === 'lua' ? -4 : 0); ctx.lineTo(L - 4, loai === 'lua' ? -3 : 0); ctx.stroke();
            if (loai === 'lua'){
                // quang lua om lay luoi — Profaned Greatsword luon chay
                let gf = ctx.createLinearGradient(0, -14, 0, 10);
                gf.addColorStop(0, "rgba(255,112,67,0)"); gf.addColorStop(0.5, "rgba(255,138,76," + (0.35 + sang * 0.3) + ")"); gf.addColorStop(1, "rgba(255,112,67,0)");
                ctx.fillStyle = gf; ctx.fillRect(6, -14 - sang * 6, L - 8, 24 + sang * 10);
                for (let k = 0; k < 4; k++){
                    let x = 12 + k * 17 + ((frames * 2 + k * 9) % 12), h = 5 + Math.random() * (5 + sang * 8);
                    ctx.fillStyle = k % 2 ? "#FFD180" : "#FF7043";
                    ctx.beginPath(); ctx.moveTo(x - 3, -4); ctx.lineTo(x, -4 - h); ctx.lineTo(x + 3, -4); ctx.fill();
                }
            } else {
                // Greatsword of Judgment: quang tim nhat luon co, nap phep thi ruc len
                let gp = ctx.createLinearGradient(0, -12, 0, 12);
                gp.addColorStop(0, "rgba(124,77,255,0)"); gp.addColorStop(0.5, "rgba(179,136,255," + (0.28 + sang * 0.3) + ")"); gp.addColorStop(1, "rgba(124,77,255,0)");
                ctx.fillStyle = gp; ctx.fillRect(6, -12, L - 8, 24);
            }
            if (loai !== 'lua' && sang > 0){
                let gg = ctx.createRadialGradient(L * 0.6, 0, 2, L * 0.6, 0, 26 + sang * 20);
                gg.addColorStop(0, "rgba(209,196,233,0.8)"); gg.addColorStop(1, "rgba(124,77,255,0)");
                ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(L * 0.6, 0, 26 + sang * 20, 0, 6.28); ctx.fill();
            }
            ctx.restore();
        }
// BOSS_PART_END s1.veTayKiemPon.1

// Nguồn: index.html:37845 · Dùng bởi: PontiffBoss
// BOSS_PART_BEGIN s1.PontiffBoss.1 EDITABLE
class PontiffBoss {
            constructor(level){
                this.name = "PONTIFF SULYVAHN";
                this.stage = 1; this.phase = 1;
                this.hp = PON_HP[1]; this.maxHp = PON_HP[1];
                this.w = PON_W; this.h = PON_H; this.baseY = 320 - this.h;
                this.x = canvas.width - 200; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.actionTimer = 40; this.facingLeft = true;
                this.lastSkill = ''; this.invulnAll = false; this.burnTimer = 0;
                this.dashV = 0; this.walk = 0; this.cd = {}; this.chuoi = [];
                this.P = { armF: 0.9, armB: 1.1, cui: 0, sangF: 0, sangB: 0 };
                this.bao = []; this.chem = []; this.song = []; this.cot = []; this.no = [];
                this.ma = null; this.hen = []; this.ghi = []; this.maHoi = 0;
            }
            spd(){ return this.stage === 1 ? 1.0 : 1.12; }   // nhinh cham hon Gael/Cinder mot chut: Hans muon '~EX hoac thap hon chut'
            dirA(a){ return a.facingLeft ? -1 : 1; }
            toIdle(t){
                this.state = 'idle'; this.subTimer = 0;
                this.P.sangF = 0; this.P.sangB = 0; this.P.cui = 0;
                this.lam('xong');
                if (this.chuoi.length){ this.actionTimer = 6; return; }
                this.actionTimer = Math.max(8, Math.round(t / this.spd()));
            }
            // ================= HANH DONG GOC — chay tren Pontiff roi hen lai cho hoan anh =================
            lam(ten, ...ts){
                this['A_' + ten](this, ...ts);
                if (this.ma && !this.ma.tan) this.hen.push({ t: PON_TRE, ten: ten, ts: ts });
            }
            A_bat(a){ a.dangDon = true; if (a === this.ma){ this.maQuay(); } }
            A_xong(a){ a.dangDon = false; }
            A_quay(a){ if (a === this) this.faceP(); else this.maQuay(); }
            A_bao(a, reach, up, t, mau, ca2){ this.bao.push({ a: a, dir: this.dirA(a), reach: reach, up: up, t: t, max: t, mau: mau, ca2: ca2 }); }
            A_chem(a, reach, up, life, mau, ca2){ this.chem.push({ a: a, dir: this.dirA(a), reach: reach, up: up, t: life, mau: mau, ca2: ca2, hit: false, tong: life }); }
            A_luot(a, v, vy){ a.dashV = this.dirA(a) * v; if (vy){ a.dy = vy; a.grounded = false; } }
            A_nhay(a, vx, vy){ a.dashV = 0; a.nhayVx = this.dirA(a) * vx; a.dy = vy; a.grounded = false; a.y -= 2; }
            A_song(a, loai, v, cao, h){
                let d = this.dirA(a);
                this.song.push({ x: a.x + a.w / 2 + d * 40, y: 320 - cao - h, w: 30, h: h, v: d * v, loai: loai, t: 0, hit: false });
            }
            A_songDap(a, hai){
                this.A_song(a, 'lua', 7, 0, 22);
                if (hai){ a.facingLeft = !a.facingLeft; this.A_song(a, 'phep', 7, 0, 22); a.facingLeft = !a.facingLeft; }
            }
            A_cot(a, dx, cho){ this.cot.push({ x: a.x + a.w / 2 + this.dirA(a) * dx, t: cho, tong: cho, no: 0, hit: false }); }
            A_no(a, r, cho){ this.no.push({ a: a, x: a.x + a.w / 2, y: a.y + a.h * 0.55, r: r, t: cho, tong: cho, no: 0, hit: false }); }
            A_tieng(a, f){ if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(f, 0.08, 'sawtooth', 0.10, f * 0.5); }
            // ================= HOAN ANH =================
            maQuay(){ let m = this.ma; if (m) m.facingLeft = (dino.x + dino.w / 2) < (m.x + m.w / 2); }
            trieuMa(){
                let d = this.dirA(this);
                this.ma = { x: Math.max(20, Math.min(canvas.width - this.w - 20, this.x - d * 110)), y: this.y, w: this.w, h: this.h,
                            facingLeft: this.facingLeft, dy: 0, dashV: 0, nhayVx: 0, grounded: true, song: PON_MA_SONG, hien: 0,
                            tan: 0, dangDon: false, walk: 0, stage: 2 };
                this.hen.length = 0;
            }
            tickMa(){
                let m = this.ma; if (!m) return;
                if (m.tan){ if (++m.tan > 30){ this.ma = null; this.maHoi = PON_MA_HOI; } return; }
                if (m.hien < 1) m.hien = Math.min(1, m.hien + 0.03);
                if (--m.song <= 0 && !m.dangDon){ m.tan = 1; this.hen.length = 0; floatingTexts.push(new FloatingText(m.x - 10, m.y - 20, "…")); return; }
                // chay cac hanh dong da hen
                for (let i = this.hen.length - 1; i >= 0; i--){
                    let e = this.hen[i];
                    if (--e.t <= 0){ this.hen.splice(i, 1); this['A_' + e.ten](m, ...e.ts); }
                }
                // vat ly rieng
                m.dy += 0.72; m.y += m.dy;
                if (m.y + m.h >= 320){ m.y = 320 - m.h; m.dy = 0; m.grounded = true; m.nhayVx = 0; } else m.grounded = false;
                m.x += m.dashV + (m.grounded ? 0 : (m.nhayVx || 0)); m.dashV *= 0.87; if (Math.abs(m.dashV) < 0.4) m.dashV = 0;
                // ranh thi tu di ve phia nguoi choi, giu mot khoang
                if (!m.dangDon && m.grounded){
                    this.maQuay();
                    let g = (dino.x + dino.w / 2) - (m.x + m.w / 2), ad = Math.abs(g);
                    if (ad > 130){ m.x += Math.sign(g) * 2.0; m.walk += 2; }
                }
                m.x = Math.max(8, Math.min(canvas.width - m.w - 8, m.x));
            }
            // tu the tre PON_TRE khung cho hoan anh
            poseMa(){ let i = this.ghi.length - PON_TRE; return i >= 0 ? this.ghi[i] : this.ghi[0] || this.P; }
            // ================= VAT LY =================
            physics(){
                this.dy += 0.72; this.y += this.dy;
                let land = 320;
                for (let pf of platforms){
                    if (pf.top >= 320 || pf.wall) continue;
                    if (this.x + this.w > pf.x + 6 && this.x < pf.x + pf.w - 6 && this.dy >= 0 &&
                        (this.y + this.h) <= pf.top + 16 && (this.y + this.h) >= pf.top - 20) land = Math.min(land, pf.top);
                }
                if (this.y + this.h >= land){ this.y = land - this.h; this.dy = 0; this.grounded = true; this.nhayVx = 0; } else this.grounded = false;
                this.x += this.dashV + (this.grounded ? 0 : (this.nhayVx || 0)); this.dashV *= 0.87;
                if (Math.abs(this.dashV) < 0.4) this.dashV = 0;
                this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
            }
            hopChem(c){
                let a = c.a;
                if (c.ca2) return { x: a.x - c.reach, y: a.y + 4 - c.up, w: a.w + c.reach * 2, h: a.h + c.up - 4 };
                return c.dir < 0 ? { x: a.x - c.reach, y: a.y + 4 - c.up, w: c.reach + 10, h: a.h + c.up - 4 }
                                 : { x: a.x + a.w - 10, y: a.y + 4 - c.up, w: c.reach + 10, h: a.h + c.up - 4 };
            }
            tickDon(){
                for (let i = this.bao.length - 1; i >= 0; i--) if (--this.bao[i].t <= 0) this.bao.splice(i, 1);
                for (let i = this.chem.length - 1; i >= 0; i--){
                    let c = this.chem[i];
                    if (!c.hit && checkAABB(dino, this.hopChem(c))){ c.hit = true; this.hurtP(1); }
                    if (--c.t <= 0) this.chem.splice(i, 1);
                }
                for (let i = this.song.length - 1; i >= 0; i--){
                    let s = this.song[i]; s.t++; s.x += s.v;
                    if (!s.hit && checkAABB(dino, { x: s.x - s.w / 2, y: s.y, w: s.w, h: s.h })){ s.hit = true; this.hurtP(1); }
                    if (s.x < -60 || s.x > canvas.width + 60 || s.t > 160) this.song.splice(i, 1);
                }
                for (let i = this.cot.length - 1; i >= 0; i--){
                    let c = this.cot[i];
                    if (c.no > 0){
                        if (!c.hit && checkAABB(dino, { x: c.x - 22, y: 320 - 124, w: 44, h: 124 })){ c.hit = true; this.hurtP(1); }
                        if (--c.no <= 0) this.cot.splice(i, 1);
                        continue;
                    }
                    if (--c.t <= 0){
                        c.no = 16; shakeTimer = Math.max(shakeTimer, 5);
                        visualEffects.push(new Effect(c.x, 300, 'explosion', true, 20));
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(140, 0.10, 'sawtooth', 0.12, 60);
                    }
                }
                for (let i = this.no.length - 1; i >= 0; i--){
                    let n = this.no[i];
                    n.x = n.a.x + n.a.w / 2; n.y = n.a.y + n.a.h * 0.55;
                    if (n.no > 0){
                        if (!n.hit){
                            let nx = Math.max(dino.x, Math.min(n.x, dino.x + dino.w)), ny = Math.max(dino.y, Math.min(n.y, dino.y + dino.h));
                            if (Math.hypot(nx - n.x, ny - n.y) < n.r * Math.min(1, (18 - n.no) / 6 + 0.4)){ n.hit = true; this.hurtP(1); }
                        }
                        if (--n.no <= 0) this.no.splice(i, 1);
                        continue;
                    }
                    if (--n.t <= 0){ n.no = 18; shakeTimer = Math.max(shakeTimer, 16); ponChop = 20;
                        if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(90, 0.4, 'sawtooth', 0.22, 40); SFX.tone(700, 0.2, 'sine', 0.12, 300); } }
                }
            }
            // ================= CAP NHAT =================
            startPhase2(){
                this.stage = 2; this.phase = 2;
                this.hp = PON_HP[2]; this.maxHp = PON_HP[2];
                this.invulnAll = true;
                this.name = "PONTIFF SULYVAHN — HOÀN ẢNH";
                this.state = 'p_hoi2'; this.subTimer = 0; this.dy = 0; this.dashV = 0;
                this.bao.length = 0; this.chem.length = 0; this.chuoi.length = 0; this.cd = {};
                shakeTimer = Math.max(shakeTimer, 40);
                this._bongBao = 0; this._bongCham = 0; this.nhayVx = 0;
            }
            aiLocChieu(id){
                if (this.chuoi.length) return false;
                if (id === 'q_trieu') return false;
                return (PON_PHA[id] || 1) <= this.stage && this.canUse(id);
            }
            canUse(id){ return !((this.cd[id] || 0) > 0); }
            update(){
                // ghi tu the cho hoan anh (giu vua du)
                this.ghi.push({ armF: this.P.armF, armB: this.P.armB, cui: this.P.cui, sangF: this.P.sangF, sangB: this.P.sangB });
                if (this.ghi.length > PON_TRE + 4) this.ghi.shift();
                this.tickDon(); this.tickMa();
                if (this.maHoi > 0) this.maHoi--;
                for (let k in this.cd) if (this.cd[k] > 0) this.cd[k]--;
                if (this.state === 'entering'){
                    this.physics(); this.x -= 3.4; this.walk += 3.4;
                    if (this.x < canvas.width - 250) this.toIdle(30);
                    return;
                }
                this.physics();
                if (this.state === 'idle'){
                    // pha 2: het hoan anh va da hoi -> trieu lai truoc moi thu khac
                    if (this.stage === 2 && !this.ma && this.maHoi <= 0 && !this.chuoi.length){ this.state = 'q_trieu'; this.subTimer = 0; return; }
                    this.faceP();
                    let g = this.gap(), ad = Math.abs(g);
                    let di = this.stage === 1 ? 2.3 : 2.8;
                    if (ad > 112){ this.x += Math.sign(g) * di; this.walk += di; }
                    else if (ad < 50){ this.x -= Math.sign(g) * 1.3; this.walk += 1.3; }
                    this.P.armF += (0.9 - this.P.armF) * 0.2; this.P.armB += (1.1 - this.P.armB) * 0.2;
                    this.actionTimer--;
                    if (this.actionTimer <= 0) this.pickSkill();
                    return;
                }
                this.runSkill();
            }
            pickSkill(){
                let c;
                if (this.chuoi.length) c = this.chuoi.shift();
                else {
                    let ad = Math.abs(this.gap()), gan = ad < 170;
                    let N = ['p_combo', 'p_combo', 'p_quay', 'p_lui', 'p_bong'];
                    let F = ['p_dam', 'p_bong', 'p_phanxet', 'p_hoa'];
                    if (this.stage >= 2){ N.push('q_combo', 'q_bung', 'q_combo'); F.push('q_chu', 'q_damkep', 'q_bung'); }
                    let pool = (gan ? N : F).filter(x => this.canUse(x));
                    if (pool.length > 1) pool = pool.filter(x => x !== this.lastSkill);
                    c = pool.length ? pool[Math.floor(Math.random() * pool.length)] : 'p_combo';
                }
                this.state = c; this.subTimer = 0; this.faceP();
            }
            batDon(){
                // khung dau cua moi don: ghi hoi chieu + bao cho hoan anh
                if (this.subTimer > 0) return;
                this.lastSkill = this.state; if (PON_CD[this.state]) this.cd[this.state] = PON_CD[this.state];
                this.lam('bat');
            }
            buocToi(k, vmax){
                // lao TINH THEO KHOANG CACH de luoi kiem cham khi con cach ~60px (bai hoc cua GAEL)
                let g = this.gap(), d = this.dirA(this);
                let toi = (g * d > 0) ? Math.abs(g) : 0;
                return Math.max(3, Math.min(vmax, Math.max(0, toi - 60) / 5.77));
            }
            runSkill(){
                let st = this.state;
                // pha 1 lo tay ra chieu pha 2 (tang AI vo doi khi chen) -> doi sang chieu tuong duong
                if ((PON_PHA[st] || 1) > this.stage){ this.state = 'p_combo'; st = 'p_combo'; }
                if (this.subTimer === 0 && st !== 'p_hoi2' && st !== 'q_trieu') this.batDon();
                let sp = this.spd(); this.subTimer += sp;
                let T = (n) => this.subTimer >= n && this.subTimer - sp < n;
                let P = this.P;

                // ============ CHUYEN PHA: HOAN ANH CHUI RA ============
                if (st === 'p_hoi2'){
                    this.invulnAll = true;
                    P.cui = Math.min(1, this.subTimer / 30); P.armF = 1.3; P.armB = 1.4;
                    if (T(4)) floatingTexts.push(new FloatingText(this.cx() - 60, 150, "PONTIFF SULYVAHN"));
                    if (this.subTimer > 40 && Math.floor(this.subTimer) % 6 === 0)
                        visualEffects.push(new Effect(this.cx() + (Math.random() - 0.5) * 60, this.y + Math.random() * this.h, 'explosion', true, 10));
                    if (T(80)){ P.cui = 0; P.armF = -1.2; P.armB = -1.4; P.sangB = 1; shakeTimer = 50; ponChop = 60;
                        if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(80, 0.8, 'sawtooth', 0.26, 40); SFX.tone(520, 0.6, 'sine', 0.14, 260); } }
                    if (T(96)){ this.trieuMa(); floatingTexts.push(new FloatingText(this.cx() - 40, 170, "HOÀN ẢNH")); }
                    if (this.subTimer > 150){ this.invulnAll = false; this.toIdle(20); }
                    return;
                }
                // ============ TRIEU LAI HOAN ANH ============
                if (st === 'q_trieu'){
                    P.armB = -1.3; P.sangB = Math.min(1, this.subTimer / 30);
                    if (T(30)){ this.trieuMa(); ponChop = 30; shakeTimer = 20;
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(420, 0.5, 'sine', 0.14, 210); }
                    if (this.subTimer > 56) this.toIdle(16);
                    return;
                }
                // ============ COMBO XEN KE HAI TAY — nhat cuoi tre mot nhip ============
                if (st === 'p_combo' || st === 'q_combo'){
                    let hai = st === 'q_combo';
                    let bao  = hai ? [4, 24, 44, 64, 96] : [6, 30, 54, 92];
                    let cham = hai ? [14, 34, 54, 74, 112] : [18, 42, 66, 110];
                    let n = bao.length;
                    for (let k = 0; k < n; k++){
                        let cuoi = k === n - 1;
                        let tay = cuoi ? 'hai' : (k % 2 ? 'phep' : 'lua');
                        let mau = tay === 'phep' ? PON_PHEP : PON_LUA;
                        let reach = cuoi ? 124 : 100, up = cuoi ? 34 : 20;
                        if (T(bao[k])){
                            this.lam('quay');
                            this.lam('bao', reach, up, cham[k] - bao[k], mau, hai && cuoi);
                            this.lam('luot', this.buocToi(k, cuoi ? 16 : 12));
                            if (tay === 'lua') P.armF = -1.6; else if (tay === 'phep') P.armB = -1.7; else { P.armF = -1.9; P.armB = -1.8; }
                        }
                        if (T(cham[k])){
                            this.lam('chem', reach, up, 9, mau, hai && cuoi);
                            this.lam('tieng', cuoi ? 180 : 320 - k * 30);
                            if (tay === 'lua') P.armF = 1.2; else if (tay === 'phep') P.armB = 1.3; else { P.armF = 1.3; P.armB = 1.4; }
                        }
                    }
                    if (this.subTimer > cham[n - 1] + 26){
                        if (Math.random() < (hai ? 0.35 : 0.28) && this.canUse('p_bong')) this.chuoi.push('p_bong');
                        this.toIdle(hai ? 22 : 30);
                    }
                    return;
                }
                // ============ DAM LUA — lao dam mot duong dai co dinh ============
                if (st === 'p_dam' || st === 'q_damkep'){
                    let lan = st === 'q_damkep' ? 2 : 1;
                    for (let k = 0; k < lan; k++){
                        let o = k * 64;
                        if (T(o + 2)){ this.lam('quay'); P.armF = 2.6; P.cui = 0.4; this.lam('bao', 250, 0, 30, PON_LUA); }
                        if (T(o + 32)){ P.armF = 0; P.cui = 0.2; this.lam('luot', 22); this.lam('tieng', 520); }
                        if (T(o + 34)) this.lam('chem', 80, 4, 16, PON_LUA);
                    }
                    if (this.subTimer > 64 * lan + 22) this.toIdle(26);
                    return;
                }
                // ============ LUI + PHAN DON ============
                if (st === 'p_lui'){
                    if (T(2)){ this.lam('quay'); P.cui = 0.3; this.lam('luot', -15, -5); }
                    if (this.subTimer > 26){
                        let r = Math.random();
                        this.chuoi.push(r < 0.6 ? (this.stage >= 2 && Math.random() < 0.5 ? 'q_damkep' : 'p_dam') : 'p_phanxet');
                        this.cd['p_dam'] = 0; this.cd['p_phanxet'] = 0; this.cd['q_damkep'] = 0;
                        this.toIdle(4);
                    }
                    return;
                }
                // ============ NHAY CHEM HAI KIEM ============
                if (st === 'p_bong'){
                    if (T(2)){ this.lam('quay'); P.cui = 0.8; P.armF = -2.2; P.armB = -2.3; }
                    if (T(22)){
                        let g = Math.abs(this.gap()), vx = Math.max(2, Math.min(9.5, g / 40));
                        P.cui = 0; this.lam('nhay', vx, -14.5); this.lam('tieng', 260);
                    }
                    if (this.subTimer > 26 && this.subTimer < 60 && !this.grounded && this.dy > 2 && !this._bongBao){
                        this._bongBao = 1; P.armF = -2.6; P.armB = -2.7;
                    }
                    if (this.subTimer > 30 && this.grounded && !this._bongCham){
                        this._bongCham = 1; this._bongT = this.subTimer;
                        P.armF = 1.5; P.armB = 1.6; P.cui = 0.6;
                        this.lam('chem', 70, 12, 10, PON_LUA, true);
                        // cham dat: song lua chay ve phia truoc; pha 2 them song phep chay ve phia SAU
                        this.lam('songDap', this.stage >= 2);
                        shakeTimer = Math.max(shakeTimer, 16);
                    }
                    if (this._bongCham && this.subTimer > this._bongT + 44){ this._bongBao = 0; this._bongCham = 0; this.toIdle(34); }
                    if (this.subTimer > 150){ this._bongBao = 0; this._bongCham = 0; this.toIdle(20); }
                    return;
                }
                // ============ XOAY HAI KIEM ============
                if (st === 'p_quay'){
                    if (T(2)){ this.lam('quay'); P.armF = 0; P.armB = Math.PI; this.lam('bao', 96, 40, 24, PON_PHEP, true); }
                    for (let k = 0; k < 2; k++){
                        if (T(26 + k * 22)){ this.lam('chem', 96, 40, 12, k ? PON_PHEP : PON_LUA, true); this.lam('luot', 9); this.lam('tieng', 300 - k * 60); }
                    }
                    if (this.subTimer > 26 && this.subTimer < 72){ P.armF = (this.subTimer * 0.35); P.armB = P.armF + Math.PI; }
                    if (this.subTimer > 90) this.toIdle(28);
                    return;
                }
                // ============ KIEM PHAN XET — nap phep roi phong song ============
                if (st === 'p_phanxet'){
                    if (T(2)){ this.lam('quay'); this.lam('bao', 0, 0, 1, PON_PHEP); }
                    if (this.subTimer < 42){ P.armB = -1.9 + this.subTimer * 0.005; P.sangB = this.subTimer / 42;
                        if (Math.floor(this.subTimer) % 5 === 0) visualEffects.push(new Effect(this.cx() - this.dirA(this) * 8, this.y + 6, 'explosion', true, 6)); }
                    if (T(42)){ P.armB = 0.1; P.sangB = 1; this.lam('song', 'phep', 8.5, 0, 44); this.lam('tieng', 180); }
                    if (this.stage >= 2 && T(58)) this.lam('song', 'phep', 8.5, 0, 44);
                    if (this.subTimer > 84) this.toIdle(30);
                    return;
                }
                // ============ KEO LUA DUOI DAT — cot lua moc lan luot ============
                if (st === 'p_hoa'){
                    if (T(2)){ this.lam('quay'); P.armF = 1.9; P.cui = 0.5; }
                    if (this.subTimer < 32 && Math.floor(this.subTimer) % 4 === 0)
                        visualEffects.push(new Effect(this.cx() + this.dirA(this) * 60, 316, 'explosion', true, 7));
                    if (T(32)){ P.armF = -1.9; P.cui = 0; this.lam('tieng', 160);
                        let so = this.stage >= 2 ? 5 : 4;
                        for (let k = 0; k < so; k++) this.lam('cot', 90 + k * 72, 20 + k * 10); }
                    if (this.subTimer > 96) this.toIdle(30);
                    return;
                }
                // ============ PHA 2: NO PHEP QUANH NGUOI ============
                if (st === 'q_bung'){
                    if (T(2)){ P.armB = -2.0; P.cui = 0; this.lam('no', 150, 52); }
                    if (this.subTimer < 50) P.sangB = this.subTimer / 50;
                    if (T(52)){ P.armB = 1.6; P.cui = 0.5; }
                    if (this.subTimer > 90) this.toIdle(26);
                    return;
                }
                // ============ PHA 2: HAI SONG CHEO — song lua THAP (nhay), song phep CAO (dung yen) ============
                if (st === 'q_chu'){
                    if (T(2)){ this.lam('quay'); P.armF = -1.8; P.armB = -1.9; this.lam('bao', 0, 0, 1, PON_LUA); }
                    if (T(26)){ P.armF = 1.3; this.lam('song', 'lua', 8, 0, 34); this.lam('tieng', 240); }
                    if (T(50)){ P.armB = 1.4; this.lam('song', 'cao', 8, 74, 58); this.lam('tieng', 420); }
                    if (this.subTimer > 86) this.toIdle(28);
                    return;
                }
                this.toIdle(20);
            }
            // ================= VE =================
            veBao(b){
                let a = b.a, u = 1 - b.t / b.max;
                if (b.reach <= 0) return;
                let r = b.ca2 ? { x: a.x - b.reach, y: a.y + 4 - b.up, w: a.w + b.reach * 2, h: a.h + b.up - 4 }
                              : (b.dir < 0 ? { x: a.x - b.reach, y: a.y + 4 - b.up, w: b.reach, h: a.h + b.up - 4 }
                                           : { x: a.x + a.w, y: a.y + 4 - b.up, w: b.reach, h: a.h + b.up - 4 });
                if (b.up === 0){ r.y = a.y + a.h * 0.35; r.h = a.h * 0.3; }
                ctx.save();
                ctx.globalAlpha = (0.10 + 0.20 * u) * (a === this ? 1 : 0.8);
                ctx.fillStyle = b.mau; ctx.fillRect(r.x, r.y, r.w, r.h);
                ctx.globalAlpha = 0.45 + 0.4 * u; ctx.strokeStyle = a === this ? "#ECEFF1" : "#D1C4E9"; ctx.lineWidth = 2;
                ctx.strokeRect(r.x, r.y, r.w, r.h);
                ctx.restore();
            }
            draw(){
                for (let b of this.bao) this.veBao(b);
                // cot lua
                for (let c of this.cot){
                    ctx.save();
                    if (c.no > 0){
                        let u = c.no / 16;
                        let g = ctx.createLinearGradient(0, 320 - 124, 0, 320);
                        g.addColorStop(0, "rgba(255,171,64,0)"); g.addColorStop(0.4, "rgba(255,112,67,0.92)"); g.addColorStop(1, "rgba(255,236,179,0.96)");
                        ctx.fillStyle = g; let w = 44 * (0.6 + 0.4 * u);
                        ctx.fillRect(c.x - w / 2, 320 - 124 * (0.5 + 0.5 * Math.min(1, (16 - c.no) / 4)), w, 124);
                    } else {
                        let u = Math.max(0, Math.min(1, 1 - c.t / c.tong));
                        ctx.globalAlpha = 0.3 + 0.55 * u; ctx.strokeStyle = "#FF7043"; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.ellipse(c.x, 317, 24 * (0.35 + 0.65 * u), 7, 0, 0, 6.28); ctx.stroke();
                        ctx.fillStyle = "rgba(255,112,67,0.25)"; ctx.fill();
                    }
                    ctx.restore();
                }
                // no phep
                for (let n of this.no){
                    ctx.save();
                    if (n.no > 0){
                        let k = Math.min(1, (18 - n.no) / 6 + 0.4), a = n.no / 18;
                        let g = ctx.createRadialGradient(n.x, n.y, 4, n.x, n.y, n.r * k);
                        g.addColorStop(0, "rgba(237,231,246," + (0.9 * a) + ")"); g.addColorStop(0.6, "rgba(124,77,255," + (0.6 * a) + ")"); g.addColorStop(1, "rgba(49,27,146,0)");
                        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, n.r * k, 0, 6.28); ctx.fill();
                    } else {
                        let u = 1 - n.t / n.tong;
                        ctx.strokeStyle = "rgba(179,136,255," + (0.35 + 0.5 * u) + ")"; ctx.lineWidth = 2 + 2 * u;
                        ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 6.28); ctx.stroke(); ctx.setLineDash([]);
                        ctx.fillStyle = "rgba(124,77,255," + (0.06 + 0.12 * u) + ")"; ctx.beginPath(); ctx.arc(n.x, n.y, n.r * u, 0, 6.28); ctx.fill();
                    }
                    ctx.restore();
                }
                // hoan anh (ve truoc Pontiff, mo)
                if (this.ma){
                    let m = this.ma, al = 0.55 * m.hien * (m.tan ? Math.max(0, 1 - m.tan / 30) : 1) * (m.song < 90 ? 0.5 + 0.5 * Math.sin(frames * 0.5) : 1);
                    drawPontiffBody(m, this.poseMa(), Math.max(0.05, al));
                }
                drawPontiffBody(this, this.P, 0);
                // vet chem
                for (let c of this.chem){
                    let r = this.hopChem(c), u = c.t / c.tong;
                    ctx.save(); ctx.globalAlpha = 0.65 * u;
                    ctx.strokeStyle = c.a === this ? c.mau : "#D1C4E9"; ctx.lineWidth = 5;
                    let cx = r.x + r.w / 2, cy = r.y + r.h / 2;
                    ctx.beginPath(); ctx.ellipse(cx, cy, r.w / 2, r.h / 2, 0, c.dir > 0 ? -1.3 : Math.PI - 1.3 + 0.4, c.dir > 0 ? 1.3 : Math.PI + 1.3); ctx.stroke();
                    ctx.lineWidth = 2; ctx.strokeStyle = "#FFFFFF"; ctx.stroke();
                    ctx.restore();
                }
                // song
                for (let s of this.song){
                    ctx.save();
                    let lua = s.loai === 'lua';
                    let g = ctx.createLinearGradient(s.x - s.w, 0, s.x + s.w, 0);
                    let m1 = lua ? "255,112,67" : "124,77,255", m2 = lua ? "255,236,179" : "237,231,246";
                    g.addColorStop(0, "rgba(" + m1 + ",0)"); g.addColorStop(0.5, "rgba(" + m1 + ",0.85)"); g.addColorStop(1, "rgba(" + m2 + ",0.95)");
                    ctx.fillStyle = g;
                    ctx.beginPath(); ctx.ellipse(s.x, s.y + s.h / 2, s.w * 0.8, s.h / 2, 0, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "rgba(" + m2 + ",0.9)"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.ellipse(s.x + (s.v > 0 ? 6 : -6), s.y + s.h / 2, s.w * 0.4, s.h / 2 - 2, 0, s.v > 0 ? -1.4 : Math.PI - 1.4, s.v > 0 ? 1.4 : Math.PI + 1.4); ctx.stroke();
                    ctx.restore();
                }
                let sub = this.stage === 1 ? "PHA 1 — HAI THANH KIẾM" : ("PHA 2 — HOÀN ẢNH" + (this.ma && !this.ma.tan ? " (" + Math.ceil(this.ma.song / 60) + "s)" : ""));
                drawTopBossBar(this, this.stage === 1 ? "#FF7043" : "#B388FF", this.name, sub);
            }
        }
// BOSS_PART_END s1.PontiffBoss.1

// Nguồn: index.html:100009 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:100020 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
