// BOSS_FILE: ThalassaBoss
// BOSS_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LT, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, mapTheme, minionBox, parry, platforms, shakeTimer, visualEffects
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

// Nguồn: index.html:29216 · Dùng bởi: MegaManXBoss, ThalassaBoss, ZeroBoss
// BOSS_PART_BEGIN s0.BOSS_NGHI.1 READ_ONLY
const BOSS_NGHI = { x: 40, xGiap: 34, xUlt: 28, zero: 38, sauChuoi: 20, chuoiMax: 3, tl1: 40, tl2: 30, tlThem: 16 };
// BOSS_PART_END s0.BOSS_NGHI.1

// Nguồn: index.html:41158 · Dùng bởi: HelicoprionBoss, MegalodonBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.OCEAN_SURF.1 READ_ONLY
const OCEAN_SURF = 150;
// BOSS_PART_END s1.OCEAN_SURF.1

// Nguồn: index.html:41159 · Dùng bởi: MegaManXBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.OCEAN_FLOOR.1 READ_ONLY
const OCEAN_FLOOR = 500;
// BOSS_PART_END s1.OCEAN_FLOOR.1

// Nguồn: index.html:41160 · Dùng bởi: HelicoprionBoss, MegalodonBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.oceanPads.1 READ_ONLY
let oceanPads = [], oceanCamY = 0;
// BOSS_PART_END s1.oceanPads.1

// Nguồn: index.html:42122 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.bienDT.1 READ_ONLY
let bienDT = false, bienToiY = 520;
// BOSS_PART_END s1.bienDT.1

// Nguồn: index.html:42847 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.CL_HP.1 READ_ONLY
const CL_HP = 240;
// BOSS_PART_END s1.CL_HP.1

// Nguồn: index.html:42848 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.CL_TRANG.1 READ_ONLY
const CL_TRANG = { vao: 1, nghi: 1, combo: 1, thuong: 1, phun: 1, cot: 1, loc: 1, giang: 1, chan: 1, songthan: 1, ngap: 1,
                           luot: 1, chem: 1, trieu: 1, xoay: 1, long: 1 };
// BOSS_PART_END s1.CL_TRANG.1

// Nguồn: index.html:42850 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.CL_CD.1 READ_ONLY
const CL_CD = { combo: 70, thuong: 110, phun: 150, cot: 230, loc: 330, giang: 280, chan: 200, songthan: 260,
                        luot: 190, chem: 150, trieu: 520, xoay: 380, long: 420 };
// BOSS_PART_END s1.CL_CD.1

// Nguồn: index.html:42852 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.CL_W.1 EDITABLE
const CL_W = 44, CL_H = 82;
// BOSS_PART_END s1.CL_W.1

// Nguồn: index.html:42853 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.CL_GIAO_CACH.1 READ_ONLY
const CL_GIAO_CACH = 26;
// BOSS_PART_END s1.CL_GIAO_CACH.1

// Nguồn: index.html:42854 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.bbNgap.1 READ_ONLY
let bbNgap = false, bbNuoc = 400;
// BOSS_PART_END s1.bbNgap.1

// Nguồn: index.html:42866 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.bbNhanChim.1 EDITABLE
function bbNhanChim(){
            mapTheme = 'ocean'; bbNgap = true; if (typeof bienDT !== 'undefined') bienDT = false;
            platforms.length = 0; oceanPads.length = 0;
            platforms.push({ x: -60, w: canvas.width + 160, top: OCEAN_FLOOR, h: 80 });
            for (let xs of [130, canvas.width - 300]){ let p = { x: xs, w: 170, top: OCEAN_SURF, h: 14, pad: true, solid: true, respawn: 0, pop: 0 }; oceanPads.push(p); platforms.push(p); }
            oceanCamY = 0;
        }
// BOSS_PART_END s1.bbNhanChim.1

// Nguồn: index.html:42937 · Dùng bởi: ThalassaBoss
// BOSS_PART_BEGIN s1.ThalassaBoss.1 EDITABLE
class ThalassaBoss {
            constructor(level){
                this.name = "THALASSA — NỮ THẦN ATLANTIS";
                this.hp = CL_HP; this.maxHp = CL_HP; this.phase = 1;
                this.w = CL_W; this.h = CL_H; this.x = canvas.width - 220; this.y = -120; this.baseY = 320 - CL_H;
                this.facingLeft = true; this.f = -1; this.vx = 0; this.vy = 0; this.grounded = false;
                this.state = 'vao'; this.t = 0; this.S = {}; this.cd = {}; this.actionTimer = 40; this.lastSkill = '';
                this.invulnAll = true; this.burnTimer = 0; this.lastMeleeHit = -1;
                this.goc = -0.6; this.nghieng = 0; this.buoc = 0; this.phepT = 0;
                this.gai = []; this.cotN = []; this.loc = []; this.song = []; this.luon = []; this.bot = [];
                this.giao = []; this.xoa = null; this.chanS = []; this.songT = []; this.rong = []; this.xoayN = null;
                this.tel = null; this.hit = new Set(); this.trungDon = false;
            }
            cx(){ return this.x + this.w / 2; } cy(){ return this.y + this.h / 2; }
            dir(){ return this.facingLeft ? -1 : 1; }
            faceP(){ this.facingLeft = (dino.x + dino.w / 2) < this.cx(); this.f = this.facingLeft ? -1 : 1; }
            pX(){ return dino.x + dino.w / 2; } pY(){ return dino.y + dino.h / 2; }
            gap(){ return Math.abs(this.pX() - this.cx()); }
            nuoc(){ return this.phase === 2 && bbNgap; }
            spd(){ return this.phase === 2 ? 1.18 : 1; }
            dat(){ return this.nuoc() ? OCEAN_FLOOR : 320; }
            // dinh ba dang o tren troi / dang la cac ngon giao -> tay khong
            tayKhong(){ return !!this.xoa || this.giao.some(g => g.st !== 've'); }
            hurtP(){
                if (this._hitF === frames) return false; this._hitF = frames;
                if (!dino.isShielding()){ dino.takeDamage(1); this.trungDon = true; return true; }
                visualEffects.push(new Effect(dino.x + (dino.isFacingLeft ? 0 : dino.w), dino.y + 10, 'parry')); return false;
            }
            tieng(f, d, k){ if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(f, d || 0.1, k || 'triangle', 0.12, f * 1.5); }
            chu(s){ floatingTexts.push(new FloatingText(this.x - 40, this.y - 26, s)); }
            // hop dam dinh ba phia truoc
            dam(rong, cao, lech, khoa){
                let d = this.dir();
                let box = { x: d > 0 ? this.x + this.w - 6 : this.x - rong + 6, y: this.y + (this.h - cao) / 2 + (lech || 0), w: rong, h: cao };
                if (!this.hit.has(khoa) && checkAABB(dino, box)){ this.hit.add(khoa); this.hurtP(); }
                return box;
            }
            veNghi(t){
                this.state = 'nghi'; this.t = 0; this.S = {}; this.tel = null; this.invulnAll = false; this.nghieng = 0; this.phepT = 0;
                // @@HE-BOSSNGHI: chi noi MOT don, roi nghi dai hon sau chuoi
                if (this.noi && !this.daNoi && !(this.cd[this.noi] > 0) && !this.tayKhong()){ let n = this.noi; this.noi = null; this.daNoi = 1; this.batDau(n); return; }
                let _sauChuoi = this.daNoi ? BOSS_NGHI.sauChuoi : 0;
                this.noi = null; this.daNoi = 0;
                this.actionTimer = Math.round(((t || (this.phase === 2 ? BOSS_NGHI.tl2 : BOSS_NGHI.tl1)) + BOSS_NGHI.tlThem + _sauChuoi) / this.spd());
            }
            batDau(c){
                this.lastSkill = c; this.cd[c] = Math.round(CL_CD[c] / this.spd());
                this.state = c; this.t = 0; this.S = {}; this.hit.clear(); this.trungDon = false; this.faceP();
            }
            pick(){
                let g = this.gap(), W;
                if (!this.nuoc()){
                    // PHA 1 — TRÊN BỜ BIỂN: Mạnh nhất ở tầm trung (90–240px)
                    if (g < 90) W = { combo: 5, thuong: 1, cot: 1, loc: 1, chan: 2 };
                    else if (g < 240) W = { thuong: 6, combo: 3, phun: 3, cot: 2, loc: 2, giang: 2, chan: 2, songthan: 1 };
                    else W = { phun: 4, thuong: 3, cot: 2, loc: 2, giang: 3, songthan: 3 };
                } else {
                    // PHA 2 — HÓA THÂN ĐẠI DƯƠNG: Kết hợp cả các chiêu mới của Pha 2 lẫn các chiêu Pha 1 đã được Cường Hóa!
                    if (g < 115) W = { combo: 4, luot: 2, xoay: 2, chem: 2, chan: 2, thuong: 2 };
                    else if (g < 280) W = { chem: 4, luot: 3, giang: 4, phun: 3, thuong: 3, cot: 2, chan: 2, songthan: 2, xoay: 2, trieu: 2, long: 1 };
                    else W = { giang: 4, luot: 4, chem: 3, songthan: 3, long: 3, phun: 2, cot: 2, trieu: 2 };
                    if (this.luon.length >= 3) delete W.trieu;
                }
                // tay khong (dinh ba con tren troi): chi dung phep, khong dung don can chien
                if (this.tayKhong()) for (const k of ['combo', 'thuong', 'phun', 'luot', 'chem', 'chan', 'giang']) delete W[k];
                let ds = [], tong = 0;
                for (let id in W) if (!((this.cd[id] || 0) > 0) && id !== this.lastSkill){ ds.push([id, W[id]]); tong += W[id]; }
                if (!tong){ this.actionTimer = 8; return; }
                let r = Math.random() * tong, c = ds[0][0];
                for (let [id, w] of ds){ r -= w; if (r <= 0){ c = id; break; } }
                this.batDau(c);
            }
            acNgat(){
                if (this.state === 'nghi' || this.state === 'ngap' || this.state === 'vao') return false;
                this.gai.length = 0; this.tel = null; this.noi = null; this.veNghi(34); return true;
            }
            update(){
                if (this.dying) return;
                if (!CL_TRANG[this.state]){ this.state = this._st || 'nghi'; this.t = this._t || 0; }    // parry ep 'returning' -> tra lai don
                if (this.phase === 1 && this.hp <= this.maxHp * 0.5 && this.state !== 'vao'){
                    this.phase = 2; this.state = 'ngap'; this.t = 0; this.S = {}; this.tel = null; this.gai.length = 0; this.cd = {};
                    this.cotN.length = 0; this.loc.length = 0; this.chanS.length = 0; this.songT.length = 0; this.phepT = 0;
                }
                for (let k in this.cd) if (this.cd[k] > 0) this.cd[k]--;
                this.tickVat();
                this.t++;
                this['s_' + this.state](this.t, this.S);
                // vat ly
                if (this.nuoc()){
                    this.x += this.vx; this.y += this.vy; this.vx *= 0.9; this.vy *= 0.9;
                    this.y = Math.max(OCEAN_SURF + 16, Math.min(OCEAN_FLOOR - this.h, this.y));
                } else if (this.state !== 'ngap'){
                    this.vy += 0.72; this.y += this.vy; this.x += this.vx;
                    if (this.y >= this.baseY){ this.y = this.baseY; this.vy = 0; this.grounded = true; } else this.grounded = false;
                }
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x));
                this.buoc += Math.abs(this.vx) * 0.2;
                this._st = this.state; this._t = this.t;
            }
            // ---------- VAO: tu tren troi ha xuong, dam tam xoa xuong cat ----------
            s_vao(T){
                if (T === 1) this.tieng(330, 0.3, 'sine');
                if (this.y >= this.baseY && T > 20){
                    this.goc = 1.57;
                    if (T === 30){ this.chu("SHARK OF ATLANTIS!"); shakeTimer = Math.max(shakeTimer, 10); }
                    if (T > 70){ this.invulnAll = false; this.goc = -0.6; this.veNghi(30); }
                }
            }
            // ---------- NGHI: giu TAM TRUNG ----------
            s_nghi(T){
                this.faceP();
                let g = this.gap(), muon = this.nuoc() ? 190 : 150, d = this.dir();
                if (!this.nuoc()){
                    if (g > muon + 50) this.vx = d * 3.0; else if (g < muon - 60) this.vx = -d * 2.6; else this.vx = Math.sin(T * 0.07) * 1.2;
                } else {
                    let tx = this.pX() - d * muon, ty = Math.max(OCEAN_SURF + 30, Math.min(OCEAN_FLOOR - this.h - 10, this.pY() - this.h / 2 + Math.sin(T * 0.05) * 40));
                    this.vx += (tx - this.cx()) * 0.012; this.vy += (ty - this.y) * 0.012;
                    if (T % 10 === 0) this.bot.push({ x: this.cx(), y: this.y + this.h, t: 0 });
                }
                this.goc += (-0.6 - this.goc) * 0.2;
                if (--this.actionTimer <= 0) this.pick();
            }
            // ================= TAM LIEN KICH (Nâng cấp ở Phase 2: Nhát 3 phóng thêm sóng lưỡi liềm kép!) =================
            s_combo(T){
                let d = this.dir();
                const NHIP = [8, 22, 36];
                if (T === 1) this.faceP();
                if (T === NHIP[0] || T === NHIP[1] || T === NHIP[2]){ this.vx = d * (this.nuoc() ? 6.2 : 3.6); this.tieng(600 + T * 10, 0.05, 'square'); }
                else if (!this.nuoc()) this.vx *= 0.75;
                // 1: dam thang
                if (T < NHIP[0]) this.goc = -0.1 + (1 - T / NHIP[0]) * -0.5;
                if (T >= NHIP[0] && T < NHIP[0] + 5){ this.goc = 0; this.dam(116, 30, -6, 'a'); }
                // 2: quet ngang rong
                if (T >= NHIP[0] + 5 && T < NHIP[1]) this.goc = -0.1 - (T - NHIP[0] - 5) * 0.12;
                if (T >= NHIP[1] && T < NHIP[1] + 6){ if (T === NHIP[1]) this.faceP(); this.goc = -1.6 + (T - NHIP[1]) * 0.5; this.dam(100, 74, 0, 'b'); }
                // 3: xoay hat len (Ở Phase 2: phóng kèm luồng sóng lưỡi liềm về phía người chơi!)
                if (T >= NHIP[1] + 6 && T < NHIP[2]) this.goc = 1.2;
                if (T >= NHIP[2] && T < NHIP[2] + 8){
                    this.goc = 1.2 - (T - NHIP[2]) * 0.42;
                    let box = { x: this.x - 40, y: this.y - 76, w: this.w + 80, h: this.h + 60 };
                    if (!this.hit.has('c') && checkAABB(dino, box)){ this.hit.add('c'); this.hurtP(); }
                    if (!this.nuoc() && T === NHIP[2]) this.vy = -6;
                    if (this.nuoc() && T === NHIP[2]){
                        let dx = this.pX() - this.cx(), dy = this.pY() - this.cy(), l = Math.hypot(dx, dy) || 1;
                        let goc = Math.atan2(dy, dx);
                        this.song.push({ x: this.cx() + (dx / l) * 28, y: this.cy() + (dy / l) * 28, vx: (dx / l) * 10, vy: (dy / l) * 10, t: 0, hit: 0, goc: goc });
                    }
                }
                if (T > NHIP[2] + 14){ if (this.trungDon) this.noi = this.nuoc() ? 'chem' : 'phun'; this.veNghi(); }
            }
            // ================= THUY THUONG — dam lao tam trung (Nâng cấp ở Phase 2: Đâm 2 nhịp liên hoàn!) =================
            s_thuong(T, S){
                let d = this.dir(), BAO = Math.round(14 / this.spd());
                if (T === 1){ this.faceP(); S.soNhip = this.nuoc() ? 2 : 1; }
                if (T < BAO){ this.goc = -0.05; this.nghieng = -0.2; this.vx *= 0.6; return; }
                if (T === BAO){
                    this.faceP(); d = this.dir();
                    this.tieng(420, 0.12, 'sawtooth');
                    if (this.nuoc()){
                        let dy = this.pY() - this.cy();
                        this.vy = Math.max(-7, Math.min(7, dy * 0.08));
                    }
                }
                if (T >= BAO && T < BAO + 11){
                    this.nghieng = 0.25; this.vx = d * (this.nuoc() ? 19.5 : 17); this.goc = 0;
                    this.dam(132, 36, -6, 't1');
                    this.gai.push({ loai: 'vet', x: this.cx() + d * 60, y: this.cy() - 6, t: 0, song: 14 });
                    return;
                }
                // Nhịp đâm bồi thứ 2 khi ở Phase 2 (dưới nước) + Phóng 3 mũi gai nước phía trước!
                if (S.soNhip === 2 && T >= BAO + 14 && T < BAO + 26){
                    if (T === BAO + 14){
                        this.faceP(); d = this.dir();
                        this.tieng(560, 0.12, 'sawtooth');
                        let baseGoc = Math.atan2(this.pY() - this.cy(), this.pX() - this.cx());
                        for (let k = -1; k <= 1; k++){
                            this.gai.push({ loai: 'gai', x0: this.cx() + d * 24, y0: this.cy() - 6, goc: baseGoc + k * 0.18, dai: 0, max: 230, t: 0, song: 16, hit: 0 });
                        }
                    }
                    this.nghieng = 0.28; this.vx = d * 18; this.goc = 0;
                    this.dam(136, 38, -6, 't2');
                    this.gai.push({ loai: 'vet', x: this.cx() + d * 60, y: this.cy() - 6, t: 0, song: 14 });
                    return;
                }
                this.vx *= 0.7; this.nghieng = 0;
                let ketThuc = S.soNhip === 2 ? BAO + 38 : BAO + 26;
                if (T > ketThuc){ if (this.trungDon) this.noi = 'combo'; this.veNghi(); }
            }
            // ================= MUA GIAO NUOC (Nâng cấp ở Phase 2: Bắn 2 đợt quạt gai đan chéo 7 gai -> 9 gai!) =================
            s_phun(T, S){
                let BAO = Math.round(16 / this.spd());
                if (T === 1){ this.faceP(); S.goc = Math.atan2(this.pY() - this.cy(), (this.pX() - this.cx())); }
                this.vx *= 0.6;
                if (T <= BAO){ this.goc = -0.3 - (T / BAO) * 0.3; this.tel = { loai: 'quat', x: this.cx() + this.dir() * 20, y: this.cy() - 8, goc: S.goc, u: T / BAO }; return; }
                // Đợt 1:
                if (T === BAO + 1){
                    this.tel = null; this.goc = 0; this.tieng(700, 0.15, 'sawtooth');
                    let n = this.nuoc() ? 7 : 5;
                    for (let i = 0; i < n; i++){
                        let a = S.goc + (i - (n - 1) / 2) * 0.16;
                        this.gai.push({ loai: 'gai', x0: this.cx() + this.dir() * 20, y0: this.cy() - 8, goc: a, dai: 0, max: this.nuoc() ? 310 : 280, t: 0, song: 18, hit: 0 });
                    }
                }
                // Đợt 2 (Chỉ có ở Phase 2 dưới nước): Ngắm lại và bắn bồi thêm 9 mũi gai nước đan chéo!
                if (this.nuoc() && T === BAO + 14){
                    this.faceP();
                    let goc2 = Math.atan2(this.pY() - this.cy(), this.pX() - this.cx());
                    this.tieng(860, 0.15, 'sawtooth');
                    let n2 = 9;
                    for (let i = 0; i < n2; i++){
                        let a = goc2 + (i - (n2 - 1) / 2) * 0.14;
                        this.gai.push({ loai: 'gai', x0: this.cx() + this.dir() * 22, y0: this.cy() - 6, goc: a, dai: 0, max: 330, t: 0, song: 18, hit: 0 });
                    }
                }
                if (T > BAO + (this.nuoc() ? 36 : 26)) this.veNghi();
            }
            // ================= COT NUOC (Nâng cấp ở Phase 2: 5 cột nước áp lực cao đuổi theo người chơi!) =================
            s_cot(T, S){
                let BAO = Math.round(32 / this.spd());
                this.vx *= 0.6; this.phepT = T;
                if (T === 1){
                    this.goc = -1.57;
                    this.chu(this.nuoc() ? "ĐẠI HỒNG THỦY!" : "CỘT NƯỚC!");
                    let px = this.pX();
                    let offsets = this.nuoc() ? [-160, -80, 0, 80, 160] : [-100, 0, 100];
                    for (const dx of offsets){
                        this.cotN.push({
                            x: Math.max(30, Math.min(canvas.width - 30, px + dx + (dx ? (Math.random() - 0.5) * 24 : 0))),
                            t: 0,
                            bao: BAO + Math.abs(dx) / 9,
                            lua: this.nuoc() ? 28 : 22,
                            hit: 0
                        });
                    }
                }
                if (T > BAO + (this.nuoc() ? 42 : 34)) this.veNghi();
            }
            // ================= LOC XOAY — tren bo: hat tung =================
            s_loc(T, S){
                this.vx *= 0.6;
                if (T < 20){ this.goc = -1.57 + T * 0.3; return; }
                if (T === 20){ let d = this.dir(); this.loc.push({ x: this.cx() + d * 50, v: d * 2.3, t: 0, cd: 0 }); this.tieng(300, 0.4, 'sine'); this.chu("LỐC XOÁY!"); }
                if (T > 36) this.veNghi();
            }
            // ================= TAM XOA GIANG THE (NÂNG CẤP ĐẶC BIỆT Ở PHASE 2) =================
            // Phase 1: Ném đinh ba lên trời -> tách 3 ngọn giáo vàng.
            // Phase 2 (Dưới nước): Tách thành 5 NGỌN GIÁO HẢI THẦN, mỗi ngọn giáo khi phóng xuống sẽ bắn kèm
            // 2 luồng sóng lưỡi liềm kẹp 2 bên, và khi cắm xuống đáy biển sẽ kích nổ CỘT NƯỚC dâng cao!
            s_giang(T, S){
                this.vx *= 0.6; this.vy *= 0.8;
                if (T === 1) this.chu(this.nuoc() ? LT("NGŨ XOA HỦY DIỆT!", "ATLANTIS JUDGEMENT!") : LT("TAM XOA GIÁNG THẾ!", "TRIDENT DESCENT!"));
                if (T < 18){ this.goc = -1.57; this.nghieng = -0.1; return; }
                if (T === 18){
                    this.xoa = { x: this.cx() + this.dir() * 10, y: this.y - 10, vy: -20, t: 0, cuongHoa: this.nuoc() };
                    this.tieng(520, 0.25, 'sawtooth'); this.nghieng = 0;
                }
                this.phepT = T;
                if (T > 56) this.veNghi(20);
            }
            // ================= CHAN DIA (Nâng cấp ở Phase 2: Đập xuống đáy biển tạo sóng địa chấn + chuỗi cột nước!) =================
            s_chan(T, S){
                if (T === 1){
                    this.chu(this.nuoc() ? LT("HẢI CHẤN ĐẠI DƯƠNG!", "ABYSSAL TREMOR!") : LT("CHẤN ĐỊA!", "EARTHSHAKER!"));
                    this.vx = 0;
                }
                if (T < 15){
                    this.goc = -1.57 - T * 0.02; this.vx *= 0.6;
                    if (this.nuoc()) this.vy = -4.5;
                    return;
                }
                if (T === 15){
                    this.vy = this.nuoc() ? 16 : -8;
                    this.goc = 1.3;
                }
                // Ở Phase 2 dưới nước, lao thẳng xuống chạm đáy đại dương (OCEAN_FLOOR)
                if (this.nuoc() && T > 15 && !S.dap){
                    this.vy = 18;
                }
                let chamSan = this.nuoc() ? (this.y + this.h >= OCEAN_FLOOR - 4) : this.grounded;
                if (T > 15 && !S.dap && chamSan){
                    S.dap = T;
                    if (this.nuoc()){ this.y = OCEAN_FLOOR - this.h; this.vy = 0; }
                    this.goc = 1.57; this.tieng(90, 0.45, 'sawtooth'); shakeTimer = Math.max(shakeTimer, 20);
                    let spdWave = this.nuoc() ? 9.2 : 7.5;
                    for (const v of [-spdWave, spdWave]){
                        this.chanS.push({ x: this.cx() + Math.sign(v) * 20, v: v, t: 0, hit: 0, day: this.dat(), cuongHoa: this.nuoc() });
                    }
                    let box = { x: this.x - 42, y: this.y + this.h - 36, w: this.w + 84, h: 36 };
                    if (checkAABB(dino, box)) this.hurtP();
                }
                if (S.dap && T > S.dap + 26) this.veNghi();
                if (T > 88) this.veNghi();
            }
            // ================= SONG THAN (Nâng cấp ở Phase 2: Gọi 2 bức tường sóng thần khổng lồ cuốn ở đáy biển + sóng lưỡi liềm!) =================
            s_songthan(T, S){
                this.vx *= 0.6; this.phepT = T;
                const BAO = this.nuoc() ? 28 : 34;
                if (T === 1){
                    this.chu(this.nuoc() ? LT("CUỒNG TRIỀU ATLANTIS!", "ABYSSAL TSUNAMI!") : LT("SÓNG THẦN!", "TIDAL WALL!"));
                    S.d = this.dir();
                }
                if (T <= BAO){
                    this.goc = -1.57 + Math.sin(T * 0.4) * 0.2;
                    this.tel = { loai: 'song', x: this.cx(), d: S.d, u: T / BAO, day: this.dat() };
                    return;
                }
                if (T === BAO + 1){
                    this.tel = null; this.goc = 0.4; this.tieng(160, 0.6, 'sine'); shakeTimer = Math.max(shakeTimer, 12);
                    let day = this.dat();
                    this.songT.push({ x: this.cx() + S.d * 30, v: S.d * (this.nuoc() ? 8.2 : 6.4), h: this.nuoc() ? 105 : 78, day: day, t: 0, hit: 0 });
                    // Ở Phase 2: Có thêm 1 đợt sóng thần thứ 2 tràn ngược từ phía bên kia hoặc phóng kèm sóng lưỡi liềm tầm cao!
                    if (this.nuoc()){
                        this.songT.push({ x: this.cx() - S.d * 30, v: -S.d * 7.2, h: 92, day: day, t: 0, hit: 0 });
                        this.song.push({ x: this.cx() + S.d * 28, y: this.cy() - 20, vx: S.d * 9.5, vy: 0, t: 0, hit: 0, goc: S.d > 0 ? 0 : Math.PI });
                    }
                }
                if (T > BAO + 30) this.veNghi();
            }
            // ================= CHUYEN PHA — GOI BIEN NHAN CHIM BO BIEN, HOA THAN =================
            s_ngap(T, S){
                this.invulnAll = true; this.vx = 0; this.vy = 0;
                if (T === 1){ this.chu(LT("ATLANTIS THỨC TỈNH!", "THE APEX PREDATOR AWAKENS!")); shakeTimer = Math.max(shakeTimer, 20); this.tieng(220, 0.9, 'sine'); }
                this.goc = -1.57; this.phepT = T;
                if (!bbNgap){
                    bbNuoc = Math.max(OCEAN_SURF, 400 - T * 1.7);
                    if (T % 6 === 0) this.bot.push({ x: Math.random() * canvas.width, y: bbNuoc + 10, t: 0 });
                    if (bbNuoc <= OCEAN_SURF + 0.5){ bbNhanChim(); S.xong = T; this.name = "THALASSA — HẢI THẦN ATLANTIS"; shakeTimer = Math.max(shakeTimer, 14); }
                    return;
                }
                this.y += ((OCEAN_SURF + 120) - this.y) * 0.05;
                if (T > (S.xong || T) + 50){ this.phepT = 0; this.invulnAll = false; this.veNghi(20); }
            }
            // ================= LUOT CHOP — 3 lan lao xuyen qua cho nguoi choi =================
            s_luot(T, S){
                const BAO = Math.round(16 / this.spd()), LAO = 14, SO = 3;
                if (!S.p){ S.p = 1; S.k = 0; S.n = 0; }
                S.k++;
                if (S.p === 1){
                    if (S.k === 1){ this.faceP(); let dx = this.pX() - this.cx(), dy = this.pY() - this.cy(), l = Math.hypot(dx, dy) || 1; S.ux = dx / l; S.uy = dy / l; }
                    this.vx *= 0.5; this.vy *= 0.5;
                    this.tel = { loai: 'duong', x: this.cx(), y: this.cy(), ux: S.ux, uy: S.uy, u: S.k / BAO };
                    this.goc = Math.atan2(S.uy, S.ux * this.dir());
                    if (S.k >= BAO){ S.p = 2; S.k = 0; this.tel = null; this.tieng(500, 0.1, 'sawtooth'); }
                    return;
                }
                this.vx = S.ux * 22; this.vy = S.uy * 22; this.nghieng = 0.3;
                let box = { x: this.x - 20, y: this.y, w: this.w + 40, h: this.h };
                if (!this.hit.has('l' + S.n) && checkAABB(dino, box)){ this.hit.add('l' + S.n); this.hurtP(); }
                this.gai.push({ loai: 'vet', x: this.cx(), y: this.cy(), t: 0, song: 16 });
                if (S.k >= LAO){ S.n++; this.nghieng = 0; this.vx *= 0.2; this.vy *= 0.2;
                    if (S.n < SO){ S.p = 1; S.k = 0; } else { if (this.trungDon) this.noi = 'chem'; this.veNghi(34); } }
            }
            // ================= CHEM SONG — song xung kich hinh luoi liem (Nâng cấp: 3 nhát chém ở Phase 2) =================
            s_chem(T, S){
                if (T === 1) this.faceP();
                const NH = [12, 26, 40];
                if (T < NH[0]) this.goc = -2.2;
                for (let idx = 0; idx < NH.length; idx++){
                    const n = NH[idx];
                    if (T === n){
                        this.faceP(); let dx = this.pX() - this.cx(), dy = this.pY() - this.cy(), l = Math.hypot(dx, dy) || 1;
                        let baseAng = Math.atan2(dy, dx);
                        // Nhát cuối phóng 2 luồng sóng lưỡi liềm rẻ quạt!
                        let spreads = (idx === 2) ? [-0.16, 0.16] : [0];
                        for (const sp of spreads){
                            let a = baseAng + sp;
                            this.song.push({ x: this.cx() + Math.cos(a) * 30, y: this.cy() + Math.sin(a) * 30, vx: Math.cos(a) * 9.8, vy: Math.sin(a) * 9.8, t: 0, hit: 0, goc: a });
                        }
                        this.goc = idx % 2 === 0 ? 1.2 : -2.2; this.tieng(900 + idx * 80, 0.1, 'sawtooth');
                    }
                }
                if (T > NH[2] + 18) this.veNghi();
            }
            // ================= TRIEU HAI XA — luon bien bam duoi =================
            s_trieu(T, S){
                this.goc = -1.57; this.phepT = T;
                if (T === 1) this.chu(LT("HẢI XÀ!", "SEA SERPENTS!"));
                if (T === 24) for (let i = 0; i < 3; i++){
                    let x = Math.max(40, Math.min(canvas.width - 40, this.cx() + (i - 1) * 90)), y = OCEAN_FLOOR - 30 - i * 40;
                    this.luon.push({ x: x, y: y, vx: 0, vy: -2, t: 0, cd: 20, hp: 3, dead: false, pha: i * 2 });
                    for (let k = 0; k < 6; k++) this.bot.push({ x: x + (Math.random() - 0.5) * 30, y: y, t: 0 });
                }
                if (T > 40) this.veNghi();
            }
            minionTargets(){ return this.luon.filter(q => !q.dead && q.hp > 0).map(q => minionBox(q, 50, 24, 3, true, true)); }
            // ================= XOAY NUOC — duoi nuoc: HUT RAT MANH =================
            s_xoay(T, S){
                const BAO = 30, DAI = Math.round(170 * this.spd());
                if (T === 1){ this.chu("XOÁY NƯỚC ATLANTIS!"); S.x = this.cx(); S.y = this.cy(); }
                this.vx *= 0.8; this.vy *= 0.8; this.goc = -1.57 + T * 0.4;
                if (T <= BAO){ this.tel = { loai: 'vong', x: S.x, y: S.y, r: 340, u: T / BAO }; return; }
                if (T === BAO + 1){ this.tel = null; this.xoayN = { x: S.x, y: S.y, t: 0, dai: DAI }; this.tieng(160, 0.9, 'sine'); }
                if (T > BAO + DAI + 10) this.veNghi();
            }
            // ================= THUY LONG — rong nuoc phuong Dong, 2 luot =================
            s_long(T, S){
                this.vx *= 0.8; this.vy *= 0.8; this.phepT = T; this.goc = -1.57 + Math.sin(T * 0.2) * 0.3;
                if (T === 1) this.chu(LT("THỦY LONG!", "LEVIATHAN SURGE!"));
                for (const [bat, k] of [[1, 0], [70, 1]]){
                    if (T === bat){
                        let d = k === 0 ? (this.pX() < canvas.width / 2 ? 1 : -1) : -(S.d0 || 1);
                        if (k === 0) S.d0 = d;
                        S['y' + k] = Math.max(OCEAN_SURF + 60, Math.min(OCEAN_FLOOR - 60, this.pY()));
                        S['d' + k] = d;
                    }
                    if (T >= bat && T < bat + 36) this.tel = { loai: 'long', d: S['d' + k], y: S['y' + k], u: (T - bat) / 36 };
                    if (T === bat + 36){
                        this.tel = null; this.tieng(260, 0.5, 'sawtooth');
                        let d = S['d' + k];
                        this.rong.push({ d: d, x: d > 0 ? -60 : canvas.width + 60, y0: S['y' + k], y: S['y' + k], t: 0, vet: [], hit: 0 });
                    }
                }
                if (T > 150) this.veNghi();
            }
            tickVat(){
                // gai nuoc / vet
                for (let i = this.gai.length - 1; i >= 0; i--){
                    let g = this.gai[i]; g.t++;
                    if (g.loai === 'gai'){
                        g.dai = g.t < 6 ? g.max * g.t / 6 : g.t < 12 ? g.max : g.max * Math.max(0, 1 - (g.t - 12) / 6);
                        if (g.t < 13 && !g.hit){
                            let ex = g.x0 + Math.cos(g.goc) * g.dai, ey = g.y0 + Math.sin(g.goc) * g.dai;
                            for (let s = 0.3; s <= 1; s += 0.14){ let px = g.x0 + (ex - g.x0) * s, py = g.y0 + (ey - g.y0) * s;
                                if (px > dino.x - 6 && px < dino.x + dino.w + 6 && py > dino.y - 6 && py < dino.y + dino.h + 6){ g.hit = 1; this.hurtP(); break; } }
                        }
                    }
                    if (g.t > g.song) this.gai.splice(i, 1);
                }
                // cot nuoc
                for (let i = this.cotN.length - 1; i >= 0; i--){
                    let c = this.cotN[i]; c.t++;
                    let day = this.dat(), cao = this.nuoc() ? 300 : 200;
                    if (c.t > c.bao && c.t <= c.bao + c.lua){
                        let box = { x: c.x - 26, y: day - cao, w: 52, h: cao };
                        if (!c.hit && checkAABB(dino, box)){ c.hit = 1; this.hurtP(); if (this.nuoc() && 'dy' in dino) dino.dy = Math.min(dino.dy, -6); }
                    }
                    if (c.t === c.bao + 1){ shakeTimer = Math.max(shakeTimer, 4); this.tieng(200, 0.1, 'sine'); }
                    if (c.t > c.bao + c.lua) this.cotN.splice(i, 1);
                }
                // loc xoay tren bo: hat tung KE CA KHI DO
                for (let i = this.loc.length - 1; i >= 0; i--){
                    let L = this.loc[i]; L.t++; L.x += L.v;
                    if (L.x < 30 || L.x > canvas.width - 30) L.v = -L.v;
                    if (L.cd > 0) L.cd--;
                    let box = { x: L.x - 30, y: 320 - 120, w: 60, h: 120 };
                    if (L.cd <= 0 && checkAABB(dino, box)){
                        L.cd = 45;
                        this.hurtP();                                   // do thi khong mat mau, nhung VAN bi hat tung
                        dino.dy = -9.5; dino.grounded = false; dino.x += (dino.x + dino.w / 2 < L.x ? -1 : 1) * 10;
                        floatingTexts.push(new FloatingText(dino.x - 10, dino.y - 20, "↑"));
                    }
                    if (L.t > 240 || this.nuoc()) this.loc.splice(i, 1);
                }
                // DINH BA bay len troi -> tach 3 ngon giao (o Phase 1) HOAC 5 NGON GIAO CUONG HOA (o Phase 2!)
                if (this.xoa){
                    let X = this.xoa; X.t++; X.y += X.vy;
                    let dinh = this.nuoc() ? OCEAN_SURF - 110 : -60;
                    if (X.y < dinh){
                        let isUpgraded = !!X.cuongHoa || this.nuoc();
                        this.xoa = null; this.tieng(980, 0.2, 'triangle');
                        visualEffects.push(new Effect(X.x, dinh, 'explosion', true, 24));
                        let soGiao = isUpgraded ? 5 : 3;
                        let khoangCach = isUpgraded ? 22 : CL_GIAO_CACH;
                        for (let i = 0; i < soGiao; i++){
                            let lechX = (i - (soGiao - 1) / 2) * (isUpgraded ? 75 : 90);
                            this.giao.push({
                                st: 'cho', x: X.x, y: dinh, goc: Math.PI / 2, t: 0,
                                ban: 16 + i * khoangCach, lech: lechX,
                                tx: this.pX(), ty: this.pY(), vx: 0, vy: 0,
                                hit: 0, no: 0, cuongHoa: isUpgraded
                            });
                        }
                    }
                }
                // CÁC NGỌN GIÁO: lơ lửng, nhắm theo người chơi, khóa 10 khung trước khi phóng
                // NÂNG CẤP PHASE 2: Khi phóng xuống bắn kèm sóng lưỡi liềm kẹp sườn + Khi cắm xuống đất kích nổ CỘT NƯỚC!
                for (let i = this.giao.length - 1; i >= 0; i--){
                    let G = this.giao[i]; G.t++;
                    let dinh = this.nuoc() ? OCEAN_SURF - 110 : -60, san = this.dat();
                    if (G.st === 'cho'){
                        G.x += (Math.max(40, Math.min(canvas.width - 40, this.pX() + G.lech)) - G.x) * 0.14;
                        G.y = dinh + Math.sin(G.t * 0.2 + i) * 3;
                        if (G.t < G.ban - 10){ G.tx = this.pX(); G.ty = this.pY(); }
                        G.goc = Math.atan2(G.ty - G.y, G.tx - G.x);
                        if (G.t >= G.ban){
                            let v = G.cuongHoa ? 22.5 : (this.nuoc() ? 19 : 21);
                            G.st = 'bay'; G.vx = Math.cos(G.goc) * v; G.vy = Math.sin(G.goc) * v;
                            this.tieng(720 + i * 85, 0.08, 'sawtooth');
                            // Nếu là giáo cường hóa Phase 2 -> Phóng kèm 2 tia gai nước kẹp 2 bên đường bay của giáo!
                            if (G.cuongHoa){
                                for (const s of [-0.14, 0.14]){
                                    this.gai.push({ loai: 'gai', x0: G.x, y0: G.y, goc: G.goc + s, dai: 0, max: 240, t: 0, song: 16, hit: 0 });
                                }
                            }
                        }
                    } else if (G.st === 'bay'){
                        G.x += G.vx; G.y += G.vy;
                        if (!G.hit) for (const s of [0, 16, 32]){ let px = G.x - Math.cos(G.goc) * s, py = G.y - Math.sin(G.goc) * s;
                            if (px > dino.x - 6 && px < dino.x + dino.w + 6 && py > dino.y - 6 && py < dino.y + dino.h + 6){ G.hit = 1; this.hurtP(); break; } }
                        if (G.y >= san - 4 || G.x < -60 || G.x > canvas.width + 60){
                            G.y = Math.min(G.y, san - 4); G.st = 'cam'; G.t = 0; shakeTimer = Math.max(shakeTimer, G.cuongHoa ? 8 : 5);
                            for (let k = 0; k < 6; k++) this.bot.push({ x: G.x + (Math.random() - 0.5) * 40, y: G.y - 6, t: 0 });
                            if (!G.hit && Math.abs(this.pX() - G.x) < 38 && Math.abs(dino.y + dino.h - G.y) < 44){ G.hit = 1; this.hurtP(); }
                            // NÂNG CẤP PHASE 2: Ngọn giáo cắm xuống đáy biển kích hoạt ngay 1 CỘT NƯỚC phun trào tại điểm cắm!
                            if (G.cuongHoa && G.x > 25 && G.x < canvas.width - 25){
                                this.cotN.push({ x: G.x, t: 0, bao: 14, lua: 18, hit: 0 });
                            }
                        }
                    } else if (G.st === 'cam'){
                        if (G.t > 28){ G.st = 've'; G.t = 0; }
                    } else {                                        // 've': bay ve tay chu nhan
                        G.x += (this.cx() - G.x) * 0.22; G.y += (this.cy() - G.y) * 0.22;
                        if (G.t > 14) this.giao.splice(i, 1);
                    }
                }
                // song dat CHAN DIA (Hỗ trợ cả trên bờ lẫn dưới đáy biển Phase 2!)
                for (let i = this.chanS.length - 1; i >= 0; i--){
                    let C = this.chanS[i]; C.t++; C.x += C.v;
                    let day = C.day || this.dat();
                    if (!C.hit && checkAABB(dino, { x: C.x - 18, y: day - 38, w: 36, h: 38 })){ C.hit = 1; this.hurtP(); }
                    if (C.t % 5 === 0) this.bot.push({ x: C.x, y: day - 4, t: 30 });
                    // Ở Phase 2, sóng chấn địa chạy dọc đáy biển cứ mỗi 18 frame lại dựng lên 1 cột nước nhỏ!
                    if (C.cuongHoa && C.t % 18 === 0 && C.x > 40 && C.x < canvas.width - 40){
                        this.cotN.push({ x: C.x, t: 0, bao: 12, lua: 16, hit: 0 });
                    }
                    if (C.x < -40 || C.x > canvas.width + 40) this.chanS.splice(i, 1);
                }
                // SONG THAN (Hỗ trợ cả trên bờ lẫn dưới đáy biển Phase 2!)
                for (let i = this.songT.length - 1; i >= 0; i--){
                    let W2 = this.songT[i]; W2.t++; W2.x += W2.v;
                    let day = W2.day || this.dat();
                    if (!W2.hit && checkAABB(dino, { x: W2.x - 28, y: day - W2.h, w: 56, h: W2.h })){ W2.hit = 1; this.hurtP(); if ('dy' in dino) dino.x += Math.sign(W2.v) * 16; }
                    if (W2.x < -90 || W2.x > canvas.width + 90) this.songT.splice(i, 1);
                }
                // song luoi liem
                for (let i = this.song.length - 1; i >= 0; i--){
                    let s = this.song[i]; s.t++; s.x += s.vx; s.y += s.vy;
                    let ux = Math.cos(s.goc), uy = Math.sin(s.goc), near = false;
                    for (let k = -55; k <= 55; k += 11){ let px = s.x - uy * k, py = s.y + ux * k;
                        if (px > dino.x && px < dino.x + dino.w && py > dino.y && py < dino.y + dino.h){ near = true; break; } }
                    if (!s.hit && near){ s.hit = 1; this.hurtP(); }
                    if (s.t > 80 || s.x < -80 || s.x > canvas.width + 80) this.song.splice(i, 1);
                }
                // hai xa (luon bien)
                for (let i = this.luon.length - 1; i >= 0; i--){
                    let q = this.luon[i]; q.t++;
                    if (q.dead || q.hp <= 0 || !this.nuoc()){ this.luon.splice(i, 1); for (let k = 0; k < 5; k++) this.bot.push({ x: q.x, y: q.y, t: 0 }); continue; }
                    let dx = this.pX() - q.x, dy = this.pY() - q.y, l = Math.hypot(dx, dy) || 1;
                    q.vx += dx / l * 0.18; q.vy += dy / l * 0.18; let v = Math.hypot(q.vx, q.vy); if (v > 2.6){ q.vx *= 2.6 / v; q.vy *= 2.6 / v; }
                    q.x += q.vx + Math.sin(q.t * 0.2 + q.pha) * 0.6; q.y += q.vy;
                    if (q.cd > 0) q.cd--;
                    if (q.cd <= 0 && Math.abs(q.x - this.pX()) < 30 && Math.abs(q.y - this.pY()) < 26){ q.cd = 60; this.hurtP(); }
                    if (q.t > 600) q.dead = true;
                }
                // xoay nuoc: HUT RAT MANH, loi xoay cat
                if (this.xoayN){
                    let X = this.xoayN; X.t++;
                    let dx = X.x - this.pX(), dy = X.y - this.pY(), d = Math.hypot(dx, dy) || 1;
                    if (d < 340){ let F = 3.4 * (1 - d / 340) + 0.9; dino.x += dx / d * F; dino.y += dy / d * F * 0.9; if ('dy' in dino) dino.dy *= 0.8; }
                    if (d < 58 && (X.t % 30 === 0 || X.t === 1)) this.hurtP();
                    if (X.t % 4 === 0) this.bot.push({ x: X.x + (Math.random() - 0.5) * 200, y: X.y + (Math.random() - 0.5) * 140, t: 0 });
                    if (X.t > X.dai || !this.nuoc()){
                        this.xoayN = null;
                        for (let k = 0; k < 8; k++) visualEffects.push(new Effect(X.x + (Math.random() - 0.5) * 120, X.y + (Math.random() - 0.5) * 90, 'explosion', true, 14));
                    }
                }
                // THUY LONG
                for (let i = this.rong.length - 1; i >= 0; i--){
                    let R = this.rong[i]; R.t++;
                    R.x += R.d * 7.5; R.y = R.y0 + Math.sin(R.t * 0.07) * 55;
                    R.vet.unshift({ x: R.x, y: R.y }); if (R.vet.length > 64) R.vet.pop();
                    if (!R.hit) for (let k = 0; k < R.vet.length; k += 6){ let p = R.vet[k], r = k === 0 ? 20 : 15 - k * 0.1;
                        if (p.x > dino.x - r && p.x < dino.x + dino.w + r && p.y > dino.y - r && p.y < dino.y + dino.h + r){ R.hit = 1; this.hurtP(); break; } }
                    let duoi = R.vet[R.vet.length - 1];
                    if ((R.d > 0 ? duoi.x > canvas.width + 60 : duoi.x < -60) || !this.nuoc()) this.rong.splice(i, 1);
                }
                for (let i = this.bot.length - 1; i >= 0; i--){ let b = this.bot[i]; b.t++; b.y -= 1.4; if (b.t > 50) this.bot.splice(i, 1); }
            }

            // ======================= VE HIỆU ỨNG KỸ NĂNG =======================
            veVat(){
                ctx.save();
                let T = this.tel;
                if (T){
                    let nh = Math.floor(frames / 4) % 2 === 0;
                    if (T.loai === 'quat'){
                        ctx.fillStyle = "rgba(129,212,250," + (0.10 + 0.18 * T.u).toFixed(2) + ")";
                        ctx.beginPath(); ctx.moveTo(T.x, T.y); ctx.arc(T.x, T.y, 280, T.goc - 0.36, T.goc + 0.36); ctx.closePath(); ctx.fill();
                        ctx.strokeStyle = nh ? "rgba(255,255,255,0.8)" : "rgba(79,195,247,0.8)"; ctx.lineWidth = 1.5; ctx.stroke();
                    } else if (T.loai === 'duong'){
                        ctx.strokeStyle = "rgba(255,213,79," + (0.35 + 0.5 * T.u).toFixed(2) + ")"; ctx.lineWidth = 3; ctx.setLineDash([10, 6]);
                        ctx.beginPath(); ctx.moveTo(T.x, T.y); ctx.lineTo(T.x + T.ux * 320, T.y + T.uy * 320); ctx.stroke(); ctx.setLineDash([]);
                    } else if (T.loai === 'vong'){
                        ctx.strokeStyle = "rgba(255,213,79," + (0.3 + 0.5 * T.u).toFixed(2) + ")"; ctx.lineWidth = 3; ctx.setLineDash([10, 8]);
                        ctx.beginPath(); ctx.arc(T.x, T.y, T.r, 0, 6.28); ctx.stroke(); ctx.setLineDash([]);
                    } else if (T.loai === 'song'){
                        let day = T.day || 320;
                        ctx.fillStyle = "rgba(79,195,247," + (0.25 + 0.4 * T.u).toFixed(2) + ")";
                        ctx.beginPath(); ctx.ellipse(T.x, day - 2, 30 + 30 * T.u, 8 + 10 * T.u, 0, Math.PI, 0); ctx.fill();
                        ctx.strokeStyle = "rgba(255,213,79,0.8)"; ctx.lineWidth = 3; ctx.setLineDash([8, 6]);
                        ctx.beginPath(); ctx.moveTo(T.x + T.d * 40, day - 40); ctx.lineTo(T.x + T.d * (40 + 200 * T.u), day - 40); ctx.stroke(); ctx.setLineDash([]);
                    } else if (T.loai === 'long'){
                        let ex = T.d > 0 ? 0 : canvas.width;
                        ctx.strokeStyle = "rgba(100,255,218," + (0.25 + 0.5 * T.u).toFixed(2) + ")"; ctx.lineWidth = 2; ctx.setLineDash([12, 8]);
                        ctx.beginPath(); for (let x = 0; x <= canvas.width; x += 20){ let s = T.d > 0 ? x : canvas.width - x;
                            let y = T.y + Math.sin((x / 7.5) * 0.07) * 55; if (x === 0) ctx.moveTo(s, y); else ctx.lineTo(s, y); } ctx.stroke(); ctx.setLineDash([]);
                        ctx.fillStyle = "rgba(100,255,218," + (0.4 * T.u).toFixed(2) + ")"; ctx.beginPath(); ctx.arc(ex, T.y, 30 + 20 * T.u, 0, 6.28); ctx.fill();
                    }
                }
                // cot nuoc
                for (const c of this.cotN){
                    let day = this.dat(), cao = this.nuoc() ? 300 : 200;
                    if (c.t <= c.bao){
                        ctx.fillStyle = "rgba(255,255,255," + (0.3 + 0.3 * Math.sin(c.t * 0.6)).toFixed(2) + ")";
                        for (let k = 0; k < 5; k++){ ctx.beginPath(); ctx.arc(c.x + (k - 2) * 9, day - 4 - ((c.t * 2 + k * 7) % 20), 3, 0, 6.28); ctx.fill(); }
                        ctx.strokeStyle = "rgba(255,213,79,0.8)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(c.x, day - 2, 28, 6, 0, 0, 6.28); ctx.stroke();
                    } else {
                        let k = Math.min(1, (c.t - c.bao) / 5), h = cao * k;
                        let g = ctx.createLinearGradient(c.x - 26, 0, c.x + 26, 0); g.addColorStop(0, "rgba(79,195,247,0.2)"); g.addColorStop(0.5, "rgba(225,245,254,0.9)"); g.addColorStop(1, "rgba(79,195,247,0.2)");
                        ctx.fillStyle = g; ctx.fillRect(c.x - 26, day - h, 52, h);
                        ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.beginPath(); ctx.ellipse(c.x, day - h, 32, 12, 0, 0, 6.28); ctx.fill();
                    }
                }
                // loc xoay tren bo
                for (const L of this.loc){
                    ctx.strokeStyle = "rgba(179,229,252,0.85)"; ctx.lineWidth = 3;
                    for (let k = 0; k < 8; k++){ let y = 320 - 8 - k * 15, w = 10 + k * 4; ctx.beginPath(); ctx.ellipse(L.x + Math.sin(L.t * 0.3 + k) * 5, y, w, 5, 0, 0, 6.28); ctx.stroke(); }
                }
                // song dat CHAN DIA: moc da + vet nut
                for (const C of this.chanS){
                    let day = C.day || 320;
                    ctx.fillStyle = C.cuongHoa ? "#26C6DA" : "#8D7B68"; ctx.strokeStyle = C.cuongHoa ? "#E0F7FA" : "#5D4E3F"; ctx.lineWidth = 1.5;
                    for (let k = 0; k < 3; k++){ let x = C.x - Math.sign(C.v) * k * 14, h = 32 - k * 8;
                        ctx.beginPath(); ctx.moveTo(x - 8, day); ctx.lineTo(x - 2, day - h); ctx.lineTo(x + 3, day - h + 6); ctx.lineTo(x + 8, day); ctx.closePath(); ctx.fill(); ctx.stroke(); }
                }
                // SONG THAN: buc tuong song cuon
                for (const W2 of this.songT){
                    let d = Math.sign(W2.v), x = W2.x, h = W2.h, day = W2.day || 320;
                    let g = ctx.createLinearGradient(0, day - h, 0, day); g.addColorStop(0, "rgba(129,212,250,0.95)"); g.addColorStop(1, "rgba(2,119,189,0.95)");
                    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - d * 60, day); ctx.quadraticCurveTo(x - d * 40, day - h * 0.6, x - d * 6, day - h);
                    ctx.quadraticCurveTo(x + d * 30, day - h - 4, x + d * 28, day - h + 22); ctx.quadraticCurveTo(x + d * 10, day - h + 10, x + d * 22, day - h * 0.35);
                    ctx.lineTo(x + d * 30, day); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "rgba(255,255,255,0.9)";
                    for (let k = 0; k < 5; k++){ ctx.beginPath(); ctx.arc(x + d * (k * 7 - 6), day - h - 2 + Math.sin(frames * 0.3 + k) * 2, 5, 0, 6.28); ctx.fill(); }
                }
                // xoay nuoc
                if (this.xoayN){
                    let X = this.xoayN;
                    ctx.strokeStyle = "rgba(200,240,255,0.5)"; ctx.lineWidth = 2;
                    for (let k = 0; k < 4; k++){ ctx.beginPath(); for (let s2 = 0; s2 < 44; s2++){ let u = s2 / 44, rr = 330 * (1 - u) + 20, g2 = -frames * 0.16 + k * 1.57 + u * 7;
                        let px = X.x + Math.cos(g2) * rr, py = X.y + Math.sin(g2) * rr * 0.7; if (s2 === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } ctx.stroke(); }
                    ctx.strokeStyle = "rgba(255,213,79,0.8)"; ctx.setLineDash([7, 5]); ctx.beginPath(); ctx.arc(X.x, X.y, 58, 0, 6.28); ctx.stroke(); ctx.setLineDash([]);
                }
                // gai nuoc / vet
                for (const g of this.gai){
                    if (g.loai === 'gai'){
                        let ex = g.x0 + Math.cos(g.goc) * g.dai, ey = g.y0 + Math.sin(g.goc) * g.dai;
                        ctx.strokeStyle = "rgba(129,212,250,0.8)"; ctx.lineWidth = 7; ctx.lineCap = 'round';
                        ctx.beginPath(); ctx.moveTo(g.x0, g.y0); ctx.lineTo(ex, ey); ctx.stroke();
                        ctx.strokeStyle = "rgba(255,255,255,0.95)"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(g.x0, g.y0); ctx.lineTo(ex, ey); ctx.stroke();
                        ctx.fillStyle = "#E1F5FE"; ctx.beginPath(); ctx.moveTo(ex + Math.cos(g.goc) * 12, ey + Math.sin(g.goc) * 12);
                        ctx.lineTo(ex + Math.cos(g.goc + 2.5) * 8, ey + Math.sin(g.goc + 2.5) * 8); ctx.lineTo(ex + Math.cos(g.goc - 2.5) * 8, ey + Math.sin(g.goc - 2.5) * 8); ctx.fill();
                    } else {
                        ctx.fillStyle = "rgba(179,229,252," + (0.5 * (1 - g.t / g.song)).toFixed(2) + ")"; ctx.beginPath(); ctx.ellipse(g.x, g.y, 20 * (1 - g.t / g.song) + 4, 7, 0, 0, 6.28); ctx.fill();
                    }
                }
                // song luoi liem
                for (const s of this.song){
                    ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.goc);
                    let a = Math.max(0.2, 1 - s.t / 80);
                    ctx.fillStyle = "rgba(179,229,252," + (0.55 * a).toFixed(2) + ")";
                    ctx.beginPath(); ctx.arc(-18, 0, 58, -1.1, 1.1); ctx.arc(-40, 0, 50, 1.0, -1.0, true); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "rgba(255,236,179," + (0.9 * a).toFixed(2) + ")"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(-18, 0, 58, -1.0, 1.0); ctx.stroke();
                    ctx.restore();
                }
                // hai xa
                for (const q of this.luon){
                    let d = q.vx >= 0 ? 1 : -1;
                    ctx.strokeStyle = "#1565C0"; ctx.lineWidth = 10; ctx.lineCap = 'round';
                    ctx.beginPath(); for (let k = 0; k <= 8; k++){ let px = q.x - d * k * 6, py = q.y + Math.sin(q.t * 0.25 - k * 0.8 + q.pha) * 6; if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } ctx.stroke();
                    ctx.strokeStyle = "#90CAF9"; ctx.lineWidth = 3; ctx.stroke();
                    ctx.fillStyle = "#FFD54F"; ctx.beginPath(); ctx.arc(q.x + d * 2, q.y - 2, 2.4, 0, 6.28); ctx.fill();
                }
                // THUY LONG — than dot nuoc trong, vay luoi, dau co sung va rau
                for (const R of this.rong){
                    let V = R.vet;
                    if (V.length > 2){
                        for (let k = 1; k < V.length; k++){
                            let r = Math.max(4, 15 - k * 0.17);
                            ctx.strokeStyle = "rgba(0,150,136,0.85)"; ctx.lineWidth = r * 2 + 2; ctx.lineCap = 'round';
                            ctx.beginPath(); ctx.moveTo(V[k - 1].x, V[k - 1].y); ctx.lineTo(V[k].x, V[k].y); ctx.stroke();
                        }
                        for (let k = 1; k < V.length; k++){
                            let r = Math.max(4, 15 - k * 0.17);
                            ctx.strokeStyle = "rgba(128,255,229,0.9)"; ctx.lineWidth = r * 1.3; ctx.lineCap = 'round';
                            ctx.beginPath(); ctx.moveTo(V[k - 1].x, V[k - 1].y); ctx.lineTo(V[k].x, V[k].y); ctx.stroke();
                        }
                        ctx.fillStyle = "rgba(224,247,250,0.85)";
                        for (let k = 3; k < V.length; k += 3){ let r = Math.max(4, 15 - k * 0.17); ctx.beginPath(); ctx.arc(V[k].x, V[k].y + r * 0.35, r * 0.35, 0, 6.28); ctx.fill(); }
                        ctx.fillStyle = "rgba(255,213,79,0.9)";
                        for (let k = 4; k < V.length - 2; k += 5){ let r = Math.max(4, 15 - k * 0.17), p = V[k];
                            ctx.beginPath(); ctx.moveTo(p.x - R.d * 4, p.y - r + 1); ctx.lineTo(p.x - R.d * 9, p.y - r - 9); ctx.lineTo(p.x + R.d * 2, p.y - r + 1); ctx.fill(); }
                        let u = V[V.length - 1];
                        ctx.fillStyle = "rgba(128,255,229,0.8)"; ctx.beginPath(); ctx.moveTo(u.x, u.y); ctx.lineTo(u.x - R.d * 18, u.y - 12); ctx.lineTo(u.x - R.d * 12, u.y); ctx.lineTo(u.x - R.d * 18, u.y + 12); ctx.closePath(); ctx.fill();
                    }
                    let h = R.vet[0]; if (!h) continue;
                    ctx.save(); ctx.translate(h.x, h.y); ctx.scale(R.d, 1);
                    ctx.fillStyle = "rgba(128,255,229,0.9)"; ctx.beginPath(); ctx.ellipse(4, 0, 22, 13, 0, 0, 6.28); ctx.fill();
                    ctx.beginPath(); ctx.moveTo(14, 2); ctx.lineTo(30, 8); ctx.lineTo(14, 10); ctx.fill();
                    ctx.strokeStyle = "rgba(255,236,179,0.95)"; ctx.lineWidth = 2.5;
                    ctx.beginPath(); ctx.moveTo(-2, -10); ctx.quadraticCurveTo(-10, -24, -22, -26); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(6, -11); ctx.quadraticCurveTo(0, -26, -10, -30); ctx.stroke();
                    ctx.strokeStyle = "rgba(224,247,250,0.9)"; ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.moveTo(22, 4); ctx.quadraticCurveTo(30 + Math.sin(frames * 0.2) * 4, 16, 16, 26); ctx.stroke();
                    ctx.fillStyle = "#FFD54F"; ctx.beginPath(); ctx.arc(10, -4, 3, 0, 6.28); ctx.fill();
                    ctx.restore();
                }
                // DINH BA bay len troi
                if (this.xoa){ ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = "rgba(255,213,79,0.35)"; ctx.fillRect(this.xoa.x - 3, this.xoa.y, 6, 60); ctx.restore();
                    this.veTrident(this.xoa.x, this.xoa.y, -Math.PI / 2, 70); }
                // CÁC NGỌN GIÁO (3 ở Phase 1, 5 ở Phase 2)
                for (const G of this.giao){
                    if (G.st === 'cho' && G.t > G.ban - 34){
                        let khoa = G.t >= G.ban - 10;
                        ctx.strokeStyle = khoa ? "rgba(255,82,82,0.9)" : (G.cuongHoa ? "rgba(0,229,255,0.75)" : "rgba(255,213,79,0.55)");
                        ctx.lineWidth = khoa ? 3 : 2; ctx.setLineDash([10, 7]);
                        ctx.beginPath(); ctx.moveTo(G.x, G.y); ctx.lineTo(G.x + Math.cos(G.goc) * 900, G.y + Math.sin(G.goc) * 900); ctx.stroke(); ctx.setLineDash([]);
                    }
                    let a = G.st === 've' ? Math.max(0, 1 - G.t / 14) : G.st === 'cam' ? 1 - G.t / 40 : 1;
                    ctx.save(); ctx.globalAlpha = a;
                    if (G.st === 'bay'){
                        ctx.strokeStyle = G.cuongHoa ? "rgba(0,229,255,0.75)" : "rgba(255,236,179,0.6)";
                        ctx.lineWidth = G.cuongHoa ? 8 : 6;
                        ctx.beginPath(); ctx.moveTo(G.x, G.y); ctx.lineTo(G.x - G.vx * 3.2, G.y - G.vy * 3.2); ctx.stroke();
                    }
                    this.veGiao(G.x, G.y, G.goc);
                    ctx.restore();
                    if (G.st === 'cam' && G.t < 12){ ctx.strokeStyle = "rgba(225,245,254," + (1 - G.t / 12).toFixed(2) + ")"; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(G.x, G.y + 2, 10 + G.t * 3, 4 + G.t, 0, Math.PI, 0); ctx.stroke(); }
                }
                // bot nuoc
                ctx.fillStyle = "rgba(255,255,255,0.55)";
                for (const b of this.bot){ ctx.beginPath(); ctx.arc(b.x, b.y, 2 + (b.t % 3), 0, 6.28); ctx.fill(); }
                ctx.restore();
            }

            // Vẽ 1 ngọn giáo tách từ Đinh Ba Atlantis
            veGiao(x, y, goc){
                ctx.save(); ctx.translate(x, y); ctx.rotate(goc); ctx.scale(1.5, 1.5);
                ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = "rgba(0,229,255,0.28)"; ctx.beginPath(); ctx.ellipse(-24, 0, 38, 7, 0, 0, 6.28); ctx.fill(); ctx.restore();
                ctx.strokeStyle = "#C9A227"; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-58, 0); ctx.lineTo(-10, 0); ctx.stroke();
                ctx.strokeStyle = "#FFE082"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-56, -1); ctx.lineTo(-12, -1); ctx.stroke();
                ctx.fillStyle = "#E0F7FA"; ctx.strokeStyle = "#00B0FF"; ctx.lineWidth = 1.2;
                ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(-12, -5.5); ctx.lineTo(-8, 0); ctx.lineTo(-12, 5.5); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.restore();
            }

            // VẼ ĐINH BA GAWR GURA ATLANTIS (Thiết kế chĩa cong chữ U vàng kim + ngọc Sapphire + 3 mũi giáo sắc lẹm)
            veTrident(x, y, goc, dai){
                ctx.save(); ctx.translate(x, y); ctx.rotate(goc);

                // 1. Cán đinh ba vàng kim (Gold Shaft) + Đuôi cán nhọn hình thoi
                ctx.strokeStyle = "#9E740B"; ctx.lineWidth = 5; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.moveTo(-dai * 0.36, 0); ctx.lineTo(dai * 0.68, 0); ctx.stroke();
                ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 2.4;
                ctx.beginPath(); ctx.moveTo(-dai * 0.35, -0.8); ctx.lineTo(dai * 0.66, -0.8); ctx.stroke();

                // Đuôi cán hình thoi vàng
                ctx.fillStyle = "#FFD54F"; ctx.strokeStyle = "#8D6E0F"; ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(-dai * 0.36, -3.5); ctx.lineTo(-dai * 0.44, 0); ctx.lineTo(-dai * 0.36, 3.5); ctx.lineTo(-dai * 0.31, 0);
                ctx.closePath(); ctx.fill(); ctx.stroke();

                // 2. Dải ruy-băng lụa xanh biển & trắng cột dưới cổ đinh ba (Đặc trưng Atlantis)
                let wave = Math.sin(frames * 0.16) * 3;
                ctx.strokeStyle = "#29B6F6"; ctx.lineWidth = 2.2;
                ctx.beginPath(); ctx.moveTo(dai * 0.56, 0); ctx.quadraticCurveTo(dai * 0.48, 10 + wave, dai * 0.38, 16 + wave); ctx.stroke();
                ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 1.4;
                ctx.beginPath(); ctx.moveTo(dai * 0.56, 0); ctx.quadraticCurveTo(dai * 0.50, -8 - wave * 0.6, dai * 0.42, -13 - wave * 0.6); ctx.stroke();

                // 3. Khung chĩa chữ U uốn cong đặc trưng của Đinh Ba Gura
                ctx.strokeStyle = "#8D6E0F"; ctx.lineWidth = 5.5;
                ctx.beginPath();
                ctx.moveTo(dai * 0.80, -13);
                ctx.quadraticCurveTo(dai * 0.60, -13, dai * 0.62, 0);
                ctx.quadraticCurveTo(dai * 0.60, 13, dai * 0.80, 13);
                ctx.stroke();

                ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 3.2;
                ctx.beginPath();
                ctx.moveTo(dai * 0.80, -13);
                ctx.quadraticCurveTo(dai * 0.60, -13, dai * 0.62, 0);
                ctx.quadraticCurveTo(dai * 0.60, 13, dai * 0.80, 13);
                ctx.stroke();

                // Hai cánh ngạnh vàng nhỏ xòe ra ở cổ đinh ba
                ctx.fillStyle = "#FFD54F";
                for (const s of [-1, 1]){
                    ctx.beginPath();
                    ctx.moveTo(dai * 0.63, s * 3);
                    ctx.lineTo(dai * 0.56, s * 10);
                    ctx.lineTo(dai * 0.67, s * 7);
                    ctx.closePath(); ctx.fill();
                }

                // 4. Ba mũi đinh ba ánh kim trắng-xanh sắc nhọn (Mũi giữa dài hơn, có ngạnh cá mập)
                ctx.fillStyle = "#E0F7FA"; ctx.strokeStyle = "#00B0FF"; ctx.lineWidth = 1.1;
                // Mũi trên & dưới
                for (const yy of [-13, 13]){
                    ctx.beginPath();
                    ctx.moveTo(dai * 0.76, yy - 3.5);
                    ctx.lineTo(dai * 0.98, yy);
                    ctx.lineTo(dai * 0.76, yy + 3.5);
                    ctx.lineTo(dai * 0.80, yy);
                    ctx.closePath(); ctx.fill(); ctx.stroke();
                }
                // Mũi chính giữa (dài và có ngạnh đôi)
                ctx.beginPath();
                ctx.moveTo(dai * 0.68, -4.2);
                ctx.lineTo(dai * 1.10, 0);
                ctx.lineTo(dai * 0.68, 4.2);
                ctx.lineTo(dai * 0.73, 0);
                ctx.closePath(); ctx.fill(); ctx.stroke();

                // 5. Viên ngọc Hải Thần (Ocean Core Gem) ở tâm chĩa đinh ba
                ctx.fillStyle = "#0288D1";
                ctx.beginPath(); ctx.arc(dai * 0.64, 0, 4.2, 0, 6.28); ctx.fill();
                ctx.fillStyle = "#80D8FF";
                ctx.beginPath(); ctx.arc(dai * 0.64 - 0.8, -0.8, 2.0, 0, 6.28); ctx.fill();

                ctx.restore();
            }

            // =========================================================================
            // VẼ NGOẠI HÌNH GAWR GURA MODEL 3 — BẢN ATLANTIS (CHUẨN CHI TIẾT)
            // =========================================================================
            veNguoi(){
                let x = this.x, y = this.y, W = this.w, H = this.h, cx = x + W / 2, d = this.dir();
                let than = this.nuoc() || (this.state === 'ngap' && bbNgap); // Trạng thái Hóa Thân Biển Sâu (Phase 2)
                ctx.save();
                ctx.translate(cx, y + H / 2); ctx.scale(d, 1); ctx.rotate(this.nghieng); ctx.translate(-W / 2, -H / 2);

                let song = Math.sin(frames * 0.11);
                let tho = Math.sin(frames * 0.08);
                let tailWag = Math.sin(frames * (than ? 0.18 : 0.12)) * (than ? 6.5 : 4.0);

                // ---------------------------------------------------------------------
                // 1. VÒNG HÀO QUANG ATLANTIS SAU LƯNG (Khi Hóa Thân ở Phase 2)
                // ---------------------------------------------------------------------
                if (than){
                    ctx.save(); ctx.translate(22, 18); ctx.rotate(frames * 0.015);
                    ctx.strokeStyle = "rgba(0, 229, 255, 0.75)"; ctx.lineWidth = 2.2;
                    ctx.beginPath(); ctx.arc(0, 0, 22, 0, 6.28); ctx.stroke();
                    ctx.strokeStyle = "rgba(255, 213, 79, 0.85)"; ctx.lineWidth = 1.4;
                    for (let k = 0; k < 8; k++){
                        let a = k * Math.PI / 4;
                        ctx.beginPath();
                        ctx.moveTo(Math.cos(a) * 23, Math.sin(a) * 23);
                        ctx.lineTo(Math.cos(a + 0.12) * 28, Math.sin(a + 0.12) * 28);
                        ctx.lineTo(Math.cos(a + 0.24) * 23, Math.sin(a + 0.24) * 23);
                        ctx.stroke();
                    }
                    ctx.restore();
                }

                // ---------------------------------------------------------------------
                // 2. CHIẾC ĐUÔI CÁ MẬP ĐẶC TRƯNG CỦA GAWR GURA (SHARK TAIL)
                // To bản, uốn cong phía sau hông, mặt lưng xanh biển đậm, mặt bụng trắng kem, vây đuôi chẻ đôi
                // ---------------------------------------------------------------------
                ctx.save();
                let tx0 = 15, ty0 = 50;
                let txMid = -4, tyMid = 58 + tailWag * 0.5;
                let txTip = -18 - (than ? 4 : 0), tyTip = 46 + tailWag;

                // Phần thân đuôi cá mập (Màu xanh biển Gura)
                let tailGrad = ctx.createLinearGradient(tx0, ty0, txTip, tyTip);
                tailGrad.addColorStop(0, than ? "#0077C2" : "#1E6091");
                tailGrad.addColorStop(1, than ? "#00B0FF" : "#2E8BC0");
                ctx.fillStyle = tailGrad;
                ctx.beginPath();
                ctx.moveTo(tx0, ty0 - 6);
                ctx.quadraticCurveTo(txMid, tyMid - 10, txTip, tyTip);
                ctx.quadraticCurveTo(txMid + 2, tyMid + 8, tx0, ty0 + 8);
                ctx.closePath(); ctx.fill();

                // Phần bụng dưới đuôi cá mập (Màu trắng xám sáng)
                ctx.fillStyle = "#F0F4F8";
                ctx.beginPath();
                ctx.moveTo(tx0, ty0 + 2);
                ctx.quadraticCurveTo(txMid + 1, tyMid + 1, txTip + 2, tyTip + 2);
                ctx.quadraticCurveTo(txMid + 2, tyMid + 8, tx0, ty0 + 8);
                ctx.closePath(); ctx.fill();

                // Vây lưng nhỏ trên thân đuôi (Dorsal fin)
                ctx.fillStyle = than ? "#0091EA" : "#1E6091";
                ctx.beginPath();
                ctx.moveTo(txMid + 3, tyMid - 6);
                ctx.lineTo(txMid - 4, tyMid - 15 + tailWag * 0.3);
                ctx.lineTo(txMid - 6, tyMid - 5);
                ctx.closePath(); ctx.fill();

                // Vây đuôi cá mập chẻ đôi lớn ở chóp (Caudal fin: thùy trên dài hơn thùy dưới + vết khuyết chữ V)
                ctx.fillStyle = than ? "#00B0FF" : "#247BA0";
                ctx.beginPath();
                ctx.moveTo(txTip + 2, tyTip);
                ctx.quadraticCurveTo(txTip - 10, tyTip - 14, txTip - 14, tyTip - 22 + tailWag * 0.4); // Thùy trên vươn cao
                ctx.lineTo(txTip - 6, tyTip - 6 + tailWag * 0.2);                                      // Vết cắn nhỏ trên vây
                ctx.lineTo(txTip - 9, tyTip - 4 + tailWag * 0.2);
                ctx.lineTo(txTip - 3, tyTip + 1);                                                      // Khe giữa 2 thùy
                ctx.lineTo(txTip - 11, tyTip + 14 + tailWag * 0.3);                                    // Thùy dưới
                ctx.quadraticCurveTo(txTip - 2, tyTip + 10, txTip + 3, tyTip + 3);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = than ? "#80D8FF" : "#134074"; ctx.lineWidth = 1; ctx.stroke();

                // Vòng vàng trang sức đeo quanh gốc đuôi Gura (Atlantis Gold Tail Ring)
                ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 2.2;
                ctx.beginPath(); ctx.moveTo(tx0 - 4, ty0 - 5); ctx.lineTo(tx0 - 6, ty0 + 7); ctx.stroke();
                ctx.restore();

                // ---------------------------------------------------------------------
                // 3. LỚP TÓC BẠCH KIM PHÍA SAU + DẢI LỤA XANH ATLANTIS BAY PHẤP PHỚI
                // ---------------------------------------------------------------------
                let bay = than ? 1 : 0;
                // Tà voan xanh biển chuyển sắc rủ từ vai sau (Atlantis Translucent Cape)
                let capeGrad = ctx.createLinearGradient(8, 24, -6, 76);
                capeGrad.addColorStop(0, "rgba(41, 182, 246, 0.78)");
                capeGrad.addColorStop(1, "rgba(1, 87, 155, 0.25)");
                ctx.fillStyle = capeGrad;
                ctx.beginPath();
                ctx.moveTo(14, 24);
                ctx.quadraticCurveTo(-2 - song * 5, 48, -6 - song * 8, 74 - bay * 8);
                ctx.lineTo(12 - song * 4, 76 - bay * 6);
                ctx.lineTo(20, 32);
                ctx.closePath(); ctx.fill();

                // Tóc sau màu trắng bạch kim pha xanh nhạt của Gura
                ctx.fillStyle = "#F0F5FA";
                ctx.beginPath();
                ctx.moveTo(12, 8);
                ctx.quadraticCurveTo(2 - song * 3, 28 - bay * 6, 4 - song * 5 - bay * 4, 52 - bay * 12);
                ctx.quadraticCurveTo(12, 48 - bay * 8, 16, 54 - bay * 12);
                ctx.quadraticCurveTo(24, 34, 26, 10);
                ctx.closePath(); ctx.fill();
                // Lọn tóc highlight màu xanh biển mặt trong (Gura's Blue Inner Hair)
                ctx.fillStyle = than ? "#00E5FF" : "#4FC3F7";
                ctx.beginPath();
                ctx.moveTo(14, 14);
                ctx.quadraticCurveTo(6 - song * 3, 32, 8 - song * 4, 48 - bay * 10);
                ctx.lineTo(15, 44 - bay * 8);
                ctx.closePath(); ctx.fill();

                // ---------------------------------------------------------------------
                // 4. ĐÔI CHÂN + SANDAL DÂY VÀNG HY LẠP (GLADIATOR GOLD SANDALS)
                // ---------------------------------------------------------------------
                let b = Math.sin(this.buoc) * (Math.abs(this.vx) > 0.6 ? 4.5 : 0);
                let swimLeg = than ? Math.sin(frames * 0.14) * 3.5 : b * 0.45;
                // Đùi và bắp chân thon gọn
                ctx.fillStyle = "#FFE6D4";
                ctx.fillRect(16 + swimLeg, 56, 4.8, 22);
                ctx.fillRect(24 - swimLeg, 56, 4.8, 22);
                // Vòng vàng đeo đùi (Gold Thigh Strap đặc trưng bản Atlantis)
                ctx.fillStyle = "#FFD54F";
                ctx.fillRect(15.5 + swimLeg, 60, 5.5, 1.8);
                ctx.fillRect(23.5 - swimLeg, 62, 5.5, 1.8);
                // Dây quấn sandal vàng đan chéo từ cổ chân lên bắp chân
                ctx.strokeStyle = "#D4AF37"; ctx.lineWidth = 1.3;
                for (let k = 0; k < 3; k++){
                    let ly = 68 + k * 3.2;
                    ctx.beginPath();
                    ctx.moveTo(16 + swimLeg, ly); ctx.lineTo(20.8 + swimLeg, ly + 1.8);
                    ctx.moveTo(24 - swimLeg, ly); ctx.lineTo(28.8 - swimLeg, ly + 1.8);
                    ctx.stroke();
                }
                // Đế dép Sandal vàng
                ctx.fillStyle = "#C9A227";
                ctx.fillRect(15.5 + swimLeg, 77, 7, 2.8);
                ctx.fillRect(23.5 - swimLeg, 77, 7, 2.8);

                // ---------------------------------------------------------------------
                // 5. TRANG PHỤC GAWR GURA MODEL 3 ATLANTIS (CHITON TRẮNG & VÁY XANH BIỂN)
                // ---------------------------------------------------------------------
                // Lớp váy lụa xanh biển bên dưới (xẻ tà trước để lộ chân, viền vàng hoa văn Hy Lạp)
                let skirtGrad = ctx.createLinearGradient(0, 42, 0, 68);
                skirtGrad.addColorStop(0, than ? "#0091EA" : "#1976D2");
                skirtGrad.addColorStop(1, than ? "#00E5FF" : "#0D47A1");
                ctx.fillStyle = skirtGrad;
                // Tà váy sau & hai bên hông
                ctx.beginPath();
                ctx.moveTo(13, 42); ctx.lineTo(32, 42);
                ctx.lineTo(36 - song * 1.5, 67);
                ctx.lineTo(28, 65);
                ctx.lineTo(23, 52); // Đường xẻ chữ V ở giữa lộ chân
                ctx.lineTo(17, 65);
                ctx.lineTo(10 - song * 1.5, 67);
                ctx.closePath(); ctx.fill();

                // Đường viền vàng lấp lánh dọc tà váy xanh
                ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.moveTo(10 - song * 1.5, 66); ctx.lineTo(17, 64); ctx.lineTo(23, 51);
                ctx.lineTo(28, 64); ctx.lineTo(36 - song * 1.5, 66);
                ctx.stroke();

                // Thân áo Chiton Hy Lạp trắng ngà xếp ly mềm mại (Lệch vai, thắt eo cao)
                ctx.fillStyle = "#FFFFFF";
                ctx.beginPath();
                ctx.moveTo(15, 23 + tho * 0.2);
                ctx.lineTo(30, 24 + tho * 0.2);
                ctx.lineTo(32, 43);
                ctx.lineTo(26, 55); // Tà chiton trắng rủ nhọn ở giữa
                ctx.lineTo(19, 55);
                ctx.lineTo(14, 43);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#CFD8DC"; ctx.lineWidth = 0.9; ctx.stroke();

                // Chi tiết cổ áo viền xanh biển đậm & họa tiết răng cá mập nhỏ đặc trưng của Gura
                ctx.fillStyle = "#1565C0";
                ctx.beginPath();
                ctx.moveTo(16, 23); ctx.lineTo(29, 24); ctx.lineTo(23, 30); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 1.3;
                ctx.beginPath(); ctx.moveTo(16, 23); ctx.lineTo(23, 30); ctx.lineTo(29, 24); ctx.stroke();

                // Đai lưng vàng chữ V (Atlantis Royal Gold Corset Belt) + Ngọc lam ở rốn
                ctx.fillStyle = "#1565C0";
                ctx.fillRect(14.5, 36, 16.5, 6.5);
                ctx.fillStyle = "#FFD54F";
                ctx.beginPath();
                ctx.moveTo(14, 36); ctx.lineTo(22.8, 39.5); ctx.lineTo(31.5, 36);
                ctx.lineTo(31.5, 38.5); ctx.lineTo(22.8, 42.5); ctx.lineTo(14, 38.5);
                ctx.closePath(); ctx.fill();
                // Viên ngọc xanh giữa thắt lưng
                ctx.fillStyle = "#00E5FF";
                ctx.beginPath(); ctx.arc(22.8, 39.2, 2.2, 0, 6.28); ctx.fill();

                // Phụ kiện ngôi sao biển vàng & túi bóng nước Bloop đeo bên hông váy Gura
                ctx.fillStyle = "#FFB74D";
                ctx.beginPath(); ctx.arc(15, 43, 2.4, 0, 6.28); ctx.fill();
                // Bong bóng Bloop nhỏ bên hông phải
                ctx.fillStyle = "rgba(225, 245, 254, 0.85)";
                ctx.beginPath(); ctx.arc(30, 44, 3.8, 0, 6.28); ctx.fill();
                ctx.fillStyle = "#E53935";
                ctx.beginPath(); ctx.arc(30, 44, 2.0, 0, 6.28); ctx.fill();

                // Trâm cài vai vàng tròn (Gold Shoulder Brooch) giữ dải lụa Atlantis
                ctx.fillStyle = "#FFD54F"; ctx.strokeStyle = "#A87F12"; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.arc(17, 24, 3.2, 0, 6.28); ctx.fill(); ctx.stroke();
                ctx.fillStyle = "#00E5FF";
                ctx.beginPath(); ctx.arc(17, 24, 1.4, 0, 6.28); ctx.fill();

                // ---------------------------------------------------------------------
                // 6. ĐẦU, KHUÔN MẶT DỄ THƯƠNG NHƯNG UY NGHI CỦA GURA, TÓC BÍM 2 BÊN & VƯƠNG MIỆN
                // ---------------------------------------------------------------------
                // Cổ
                ctx.fillStyle = "#FFE6D4";
                ctx.fillRect(20.5, 18, 4.5, 5.5);

                // Khuôn mặt bầu bĩnh dễ thương chuẩn anime VTuber của Gura
                ctx.fillStyle = "#FFE6D4";
                ctx.beginPath(); ctx.ellipse(23.5, 11.5, 9.2, 9.5, 0, 0, 6.28); ctx.fill();
                // Má hồng nhẹ (Blush)
                ctx.fillStyle = than ? "rgba(255, 82, 82, 0.35)" : "rgba(255, 138, 128, 0.42)";
                ctx.beginPath(); ctx.ellipse(18.5, 14.2, 2.2, 1.1, 0, 0, 6.28); ctx.fill();
                ctx.beginPath(); ctx.ellipse(29.2, 14.2, 2.2, 1.1, 0, 0, 6.28); ctx.fill();

                // MẮT GAWR GURA (Phase 1: Xanh đại dương long lanh; Phase 2: Đỏ hồng Apex Predator rực sáng!)
                let nham = (frames % 190) < 5;
                if (nham){
                    ctx.strokeStyle = "#455A64"; ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.arc(27.2, 12.2, 2.6, 0.2, Math.PI - 0.2); ctx.stroke();
                } else {
                    // Tròng trắng
                    ctx.fillStyle = "#FFFFFF";
                    ctx.beginPath(); ctx.ellipse(27.2, 12.0, 3.2, 3.6, 0, 0, 6.28); ctx.fill();
                    // Tròng mắt (Xanh biển ở Phase 1 / Đỏ Crimson ở Phase 2)
                    ctx.fillStyle = than ? "#FF1744" : "#0288D1";
                    ctx.beginPath(); ctx.ellipse(27.6, 12.2, 2.3, 2.9, 0, 0, 6.28); ctx.fill();
                    // Nửa dưới mắt sáng màu hơn
                    ctx.fillStyle = than ? "#FF8A80" : "#4FC3F7";
                    ctx.beginPath(); ctx.arc(27.6, 13.0, 1.8, 0, Math.PI); ctx.fill();
                    // Đốm sáng trắng long lanh (Eye catchlight)
                    ctx.fillStyle = "#FFFFFF";
                    ctx.beginPath(); ctx.arc(26.6, 10.8, 1.1, 0, 6.28); ctx.fill();
                    ctx.beginPath(); ctx.arc(28.4, 13.4, 0.6, 0, 6.28); ctx.fill();
                    // Hàng mi cong dày
                    ctx.strokeStyle = "#263238"; ctx.lineWidth = 1.4;
                    ctx.beginPath(); ctx.arc(27.2, 11.4, 3.3, Math.PI * 1.15, Math.PI * 1.9); ctx.stroke();
                    if (than){
                        ctx.save(); ctx.globalCompositeOperation = 'lighter';
                        ctx.fillStyle = "rgba(255, 23, 68, 0.38)";
                        ctx.beginPath(); ctx.arc(27.6, 12.2, 5.2, 0, 6.28); ctx.fill();
                        ctx.restore();
                    }
                }

                // Miệng cười lộ chiếc răng nanh cá mập nhỏ trắng xinh đặc trưng của Gura!
                ctx.fillStyle = "#D81B60";
                ctx.beginPath(); ctx.arc(27.5, 16.5, 1.8, 0, Math.PI); ctx.fill();
                ctx.fillStyle = "#FFFFFF"; // Chiếc răng nanh cá mập nhỏ
                ctx.beginPath(); ctx.moveTo(26.5, 16.5); ctx.lineTo(27.2, 18.0); ctx.lineTo(27.9, 16.5); ctx.closePath(); ctx.fill();

                // Vòm tóc đỉnh đầu và mái bằng xẻ lọn đặc trưng của Gura (Màu trắng bạc pha sọc xanh biển)
                ctx.fillStyle = "#F4F8FB";
                ctx.beginPath(); ctx.ellipse(23.2, 6.2, 10.5, 6.8, 0, Math.PI, 0); ctx.fill();
                ctx.beginPath();
                ctx.moveTo(13, 6);
                ctx.quadraticCurveTo(16, 11, 19, 6.5);
                ctx.quadraticCurveTo(22, 11.5, 25, 6.5);
                ctx.quadraticCurveTo(28, 11, 31, 6.5);
                ctx.quadraticCurveTo(33, 9.5, 34, 6);
                ctx.lineTo(34, 2); ctx.lineTo(13, 2);
                ctx.closePath(); ctx.fill();

                // Sọc highlight xanh dương trên mái tóc Gura
                ctx.fillStyle = than ? "#00E5FF" : "#29B6F6";
                ctx.beginPath(); ctx.moveTo(19.5, 3.5); ctx.lineTo(21.5, 9.5); ctx.lineTo(23.2, 4.0); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(26.5, 3.5); ctx.lineTo(28.5, 9.2); ctx.lineTo(29.8, 4.2); ctx.closePath(); ctx.fill();

                // Chỏm tóc Ahoge cong vút trên đỉnh đầu Gura
                ctx.strokeStyle = "#F4F8FB"; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.moveTo(22, 0); ctx.quadraticCurveTo(19, -6, 25, -5 + song * 0.8); ctx.stroke();

                // HAI LỌN TÓC MAI DÀI BẾT BÍM ĐỐI XỨNG 2 BÊN NGỰC + ĐUÔI XANH + KẸP TÓC CÁ MẬP ĐỎ!
                for (const side of [-1, 1]){
                    let lx = side < 0 ? 13.5 : 31.5;
                    let sw = song * 1.2 * side;
                    // Lọn tóc trắng rủ xuống ngực
                    ctx.fillStyle = "#F4F8FB";
                    ctx.beginPath();
                    ctx.moveTo(lx - 2, 6);
                    ctx.quadraticCurveTo(lx - 3 + sw, 18, lx - 2 + sw, 32);
                    ctx.lineTo(lx + 2 + sw, 32);
                    ctx.quadraticCurveTo(lx + 2.5 + sw, 18, lx + 2, 6);
                    ctx.closePath(); ctx.fill();
                    // Phần chóp đuôi bím tóc nhuộm xanh biển (Blue Gradient Tips)
                    ctx.fillStyle = than ? "#00E5FF" : "#0288D1";
                    ctx.beginPath();
                    ctx.moveTo(lx - 2 + sw, 24);
                    ctx.lineTo(lx + 2 + sw, 24);
                    ctx.lineTo(lx + sw * 1.2, 34);
                    ctx.closePath(); ctx.fill();
                    // Nơ / Dây buộc vàng nhỏ ở bím tóc
                    ctx.fillStyle = "#FFD54F";
                    ctx.fillRect(lx - 2.2 + sw * 0.6, 21, 4.4, 1.8);
                }
                // Kẹp tóc hình tam giác đỏ (Red Shark Hairpin) bên tóc mai phải của Gura
                ctx.fillStyle = "#E53935";
                ctx.beginPath(); ctx.moveTo(29.5, 9.5); ctx.lineTo(33.5, 8.2); ctx.lineTo(33.0, 11.2); ctx.closePath(); ctx.fill();

                // VƯƠNG MIỆN NGUYỆT QUẾ VÀNG ATLANTIS (Golden Laurel Wreath & Tiara)
                ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 1.8;
                ctx.beginPath(); ctx.arc(23.2, 5.5, 9.8, Math.PI * 1.12, Math.PI * 1.88); ctx.stroke();
                // Các phiến lá nguyệt quế vàng đính dọc vòng đầu
                ctx.fillStyle = "#FFD54F";
                for (let k = -3; k <= 3; k++){
                    let la = -Math.PI / 2 + k * 0.28;
                    let rx = 23.2 + Math.cos(la) * 9.8, ry = 5.5 + Math.sin(la) * 6.2;
                    ctx.beginPath(); ctx.ellipse(rx, ry, 2.2, 1.1, la, 0, 6.28); ctx.fill();
                }
                // Ngôi sao / Đinh ba vàng nhỏ ở chính giữa trán
                ctx.fillStyle = "#00E5FF";
                ctx.beginPath(); ctx.arc(23.2, -0.5, 1.8, 0, 6.28); ctx.fill();

                // ---------------------------------------------------------------------
                // 7. CÁNH TAY TRƯỚC + VÒNG TAY VÀNG + CẦM ĐINH BA GURA
                // ---------------------------------------------------------------------
                ctx.fillStyle = "#FFE6D4";
                ctx.save();
                ctx.translate(28, 27);
                ctx.rotate(Math.max(-1.6, Math.min(1.4, this.goc)) * 0.6 + 0.45);
                ctx.fillRect(0, -2.2, 10, 4.4);
                // Vòng tay vàng Atlantis ở cổ tay và bắp tay (Gold Armlet & Wristband)
                ctx.fillStyle = "#FFD54F";
                ctx.fillRect(2, -2.5, 1.8, 5);
                ctx.fillRect(7, -2.5, 2.0, 5);
                ctx.restore();

                if (!this.tayKhong()){
                    this.veTrident(35, 30, this.goc, 72);
                } else {
                    // Khi phóng đinh ba lên trời: Bàn tay phát sáng triệu hồi ma pháp biển sâu
                    ctx.save(); ctx.globalCompositeOperation = 'lighter';
                    ctx.fillStyle = "rgba(0, 229, 255, 0.55)";
                    ctx.beginPath(); ctx.arc(38, 22, 6.5 + Math.sin(frames * 0.3) * 1.5, 0, 6.28); ctx.fill();
                    ctx.restore();
                }

                ctx.restore();
            }

            draw(){
                this.veVat();
                if (this.state === 'ngap' || this.phepT > 0){
                    // hao quang phep bien
                    let r = this.state === 'ngap' ? 95 : 55;
                    ctx.save(); ctx.globalCompositeOperation = 'lighter';
                    let g = ctx.createRadialGradient(this.cx(), this.cy(), 4, this.cx(), this.cy(), r);
                    g.addColorStop(0, "rgba(224,247,250,0.45)"); g.addColorStop(1, "rgba(79,195,247,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(this.cx(), this.cy(), r, 0, 6.28); ctx.fill();
                    ctx.restore();
                }
                this.veNguoi();
                if (typeof drawTopBossBar === 'function' && !this.dying) drawTopBossBar(this, this.phase === 2 ? "#00E5FF" : "#29B6F6", this.name);
            }
        }
// BOSS_PART_END s1.ThalassaBoss.1

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
