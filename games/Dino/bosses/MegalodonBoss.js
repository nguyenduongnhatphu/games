// BOSS_FILE: MegalodonBoss
// BOSS_SNAPSHOT: 90b44e51b8a8c0ad12fba495a59e199c399e173aab86fbee147786ba09666942
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LT, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bosses, canvas, checkAABB, ctx, defMode, dino, dojoMode, floatingTexts, frames, gameState, mapChay, mapTheme, parry, projectiles, shakeTimer, visualEffects
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

// Nguồn: index.html:41158 · Dùng bởi: HelicoprionBoss, MegalodonBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.OCEAN_SURF.1 READ_ONLY
const OCEAN_SURF = 150;
// BOSS_PART_END s1.OCEAN_SURF.1

// Nguồn: index.html:41160 · Dùng bởi: HelicoprionBoss, MegalodonBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.oceanPads.1 READ_ONLY
let oceanPads = [], oceanCamY = 0;
// BOSS_PART_END s1.oceanPads.1

// Nguồn: index.html:41220 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.BIEN_DAY.1 READ_ONLY
const BIEN_DAY = 760, BIEN_NONG = 330, BIEN_SAU = 470, BIEN_VUC = 560;
// BOSS_PART_END s1.BIEN_DAY.1

// Nguồn: index.html:41227 · Dùng bởi: HelicoprionBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienVat.1 READ_ONLY
let bienVat = [], bienCuoi = 0, bienLoaiTruoc = -1, bienX0 = null, bienTrongBun = 0, bienChon = false, bienDaDoan = 0;
// BOSS_PART_END s1.bienVat.1

// Nguồn: index.html:41229 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienChay.1 READ_ONLY
function bienChay(){
            return typeof gameState !== 'undefined' && gameState === 'normal' && mapChay === 'ocean' && mapTheme === 'ocean'
                && bosses.length === 0 && !defMode;
        }
// BOSS_PART_END s1.bienChay.1

// Nguồn: index.html:41234 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienCoDiaHinh.1 READ_ONLY
function bienCoDiaHinh(){ return bienChay() || (typeof bienDT !== 'undefined' && bienDT && mapTheme === 'ocean'); }
// BOSS_PART_END s1.bienCoDiaHinh.1

// Nguồn: index.html:42122 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.bienDT.1 READ_ONLY
let bienDT = false, bienToiY = 520;
// BOSS_PART_END s1.bienDT.1

// Nguồn: index.html:42138 · Dùng bởi: HelicoprionBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienTickTinh.1 READ_ONLY
function bienTickTinh(){
            for (let o of bienVat) o.t++;
            for (let p of oceanPads) if (p.bien) p.top = p.top0 + Math.sin(frames * 0.045 + p.pha) * 5;
            for (let p of projectiles) for (let o of bienVat) if (o.k === 'sang' && checkAABB(p, o)) o.sang = 360;
        }
// BOSS_PART_END s1.bienTickTinh.1

// Nguồn: index.html:42450 · Dùng bởi: MegalodonBoss
// BOSS_PART_BEGIN s1.MEG_HP.1 READ_ONLY
const MEG_HP = 200;
// BOSS_PART_END s1.MEG_HP.1

// Nguồn: index.html:42451 · Dùng bởi: MegalodonBoss
// BOSS_PART_BEGIN s1.MEG_TRANG.1 READ_ONLY
const MEG_TRANG = { vao: 1, lan: 1, chop: 1, vuc: 1, vay: 1, can: 1, duoi: 1, gam: 1 };
// BOSS_PART_END s1.MEG_TRANG.1

// Nguồn: index.html:42452 · Dùng bởi: MegalodonBoss
// BOSS_PART_BEGIN s1.MEG_CD.1 READ_ONLY
const MEG_CD = { chop: 150, vuc: 180, vay: 200, can: 140, duoi: 170 };
// BOSS_PART_END s1.MEG_CD.1

// Nguồn: index.html:42453 · Dùng bởi: MegalodonBoss
// BOSS_PART_BEGIN s1.MEG_L.1 EDITABLE
const MEG_L = 280, MEG_H = 86;
// BOSS_PART_END s1.MEG_L.1

// Nguồn: index.html:42458 · Dùng bởi: MegalodonBoss
// BOSS_PART_BEGIN s1.MegalodonBoss.1 EDITABLE
class MegalodonBoss {
            constructor(level){
                this.name = "MEGALODON";
                this.hp = MEG_HP; this.maxHp = MEG_HP; this.phase = 1;
                this.X = canvas.width / 2; this.Y = BIEN_DAY + 80; this.f = -1; this.facingLeft = true; this.goc = 0; this.dung = false;
                this.w = MEG_L; this.h = MEG_H; this.x = this.X - MEG_L / 2; this.y = this.Y - MEG_H / 2;
                this.state = 'vao'; this.t = 0; this.S = {}; this.cd = {}; this.actionTimer = 60; this.lastSkill = '';
                this.invulnAll = true; this.burnTimer = 0; this.lastMeleeHit = -1;
                this.mo = 0; this.an = true;          // mo ham 0..1 · dang AN trong toi (chi thay mat)
                this.tel = null; this.song = []; this.toe = []; this.bot = [];
                this.vy = 0; this.duoiP = 0;
            }
            spd(){ return this.phase === 2 ? 1.25 : 1; }
            cx(){ return this.X; } cy(){ return this.Y; }
            hop(){
                if (this.dung){ this.w = MEG_H; this.h = MEG_L; } else { this.w = MEG_L; this.h = MEG_H; }
                this.x = this.X - this.w / 2; this.y = this.Y - this.h / 2;
            }
            mieng(){
                if (this.dung) return { x: this.X, y: this.Y - MEG_L / 2 + 26 };
                return { x: this.X + this.f * (MEG_L / 2 - 28), y: this.Y + 10 };
            }
            hopCan(){ let M = this.mieng(); return this.dung ? { x: M.x - 55, y: M.y - 60, w: 110, h: 90 } : { x: M.x + (this.f > 0 ? -30 : -80), y: M.y - 44, w: 110, h: 88 }; }
            chamThan(){ return checkAABB(dino, { x: this.x + 16, y: this.y + 8, w: this.w - 32, h: this.h - 16 }); }
            faceP(){ this.f = (dino.x + dino.w / 2) < this.X ? -1 : 1; this.facingLeft = this.f < 0; }
            hurtP(){
                if (this._hitF === frames) return; this._hitF = frames;
                if (!dino.isShielding()) dino.takeDamage(1);
                else visualEffects.push(new Effect(dino.x + (dino.isFacingLeft ? 0 : dino.w), dino.y + 10, 'parry'));
            }
            pY(){ return dino.y + dino.h / 2; } pX(){ return dino.x + dino.w / 2; }
            khoaY(y){ return Math.max(OCEAN_SURF + 30, Math.min(BIEN_DAY - MEG_H / 2 - 12, y)); }
            tieng(f, d, k){ if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(f, d || 0.2, k || 'sawtooth', 0.18, f * 0.5); }
            veLan(t){ this.state = 'lan'; this.t = 0; this.S = {}; this.tel = null; this.goc = 0; this.dung = false; this.mo = 0; this.invulnAll = false;
                this.actionTimer = Math.round((t || (this.phase === 2 ? 40 : 54)) / this.spd()); }
            pick(){
                let tren = this.pY() < OCEAN_SURF + 110, gan = Math.abs(this.pX() - this.X) < 360;
                let W = tren ? { vay: 5, chop: 3, vuc: 2, duoi: 1, can: 1 } : { chop: 3, vuc: 3, can: gan ? 4 : 2, duoi: 3, vay: 1 };
                let ds = [], tong = 0;
                for (let id in W) if (!((this.cd[id] || 0) > 0) && id !== this.lastSkill){ ds.push([id, W[id]]); tong += W[id]; }
                if (!tong){ this.actionTimer = 10; return; }
                let r = Math.random() * tong, c = ds[0][0];
                for (let [id, w] of ds){ r -= w; if (r <= 0){ c = id; break; } }
                this.lastSkill = c; this.cd[c] = Math.round(MEG_CD[c] / this.spd());
                this.state = c; this.t = 0; this.S = {};
            }
            update(){
                if (this.dying) return;
                if (!MEG_TRANG[this.state]){ this.state = this._st || 'lan'; this.t = this._t || 0; }    // parry ep 'returning' -> tra lai don
                if (this.phase === 1 && this.hp <= this.maxHp * 0.5 && (this.state === 'lan' || this.state === 'can' || this.state === 'duoi')){
                    this.phase = 2; this.state = 'gam'; this.t = 0; this.S = {}; this.tel = null; this.cd = {}; this.dung = false; this.goc = 0;
                    this.name = "MEGALODON — MÁU LOANG";
                }
                if (typeof bienTickTinh === 'function') bienTickTinh();
                bienToiY += ((this.phase === 2 ? 370 : 470) - bienToiY) * 0.02;
                for (let k in this.cd) if (this.cd[k] > 0) this.cd[k]--;
                this.tickSong();
                this.t++;
                this['s_' + this.state](this.t, this.S);
                this.hop();
                this._st = this.state; this._t = this.t;
            }
            // ---- VAO: noi len tu vuc, loe mat, lan ----
            s_vao(T){
                this.Y += (650 - this.Y) * 0.05; this.X += (this.pX() - this.X) * 0.02; this.an = true;
                if (T === 60){ floatingTexts.push(new FloatingText(this.X - 50, 560, "MEGALODON")); this.tieng(60, 0.8); }
                if (T > 90){ this.invulnAll = false; this.veLan(40); }
            }
            // ---- LAN: tron trong toi duoi chan nguoi choi, chi thay mat ----
            s_lan(T){
                this.an = true; this.mo *= 0.9; this.goc *= 0.9;
                let tx = this.pX() + Math.sin(frames * 0.012) * 260, ty = Math.max(this.phase === 2 ? 430 : 520, Math.min(BIEN_DAY - 60, this.pY() + 200));
                this.f = tx < this.X ? -1 : 1; this.facingLeft = this.f < 0;
                this.X += (tx - this.X) * 0.02; this.Y += (ty - this.Y) * 0.03 + Math.sin(frames * 0.04) * 0.4;
                this.X = Math.max(-60, Math.min(canvas.width + 60, this.X));
                if (--this.actionTimer <= 0) this.pick();
            }
            // ================= 1. CHOP LUOT =================
            s_chop(T, S){
                const BAO = Math.round((S.lan ? 20 : 26) / this.spd()), SO = this.phase === 2 ? 3 : 2;
                if (!S.p){ S.p = 1; S.lan = 0; S.ben = this.pX() < canvas.width / 2 ? 1 : -1; }
                if (S.p === 1){                                   // lui ra mep xa, an khoi man
                    this.an = true; let tx = S.ben > 0 ? canvas.width + MEG_L : -MEG_L;
                    this.X += (tx - this.X) * 0.12; this.Y += (this.khoaY(this.pY()) - this.Y) * 0.1; this.f = -S.ben; this.facingLeft = this.f < 0;
                    this.invulnAll = this.X < -MEG_L / 2 || this.X > canvas.width + MEG_L / 2;
                    if (Math.abs(this.X - tx) < 20 || T > 60){ S.p = 2; S.k = 0; S.y = this.khoaY(this.pY()); }
                    return;
                }
                if (S.p === 2){                                   // BAO: vach do ngang o do sau KHOA
                    S.k++; this.Y = S.y; this.invulnAll = true;
                    this.tel = { loai: 'ngang', y: S.y - MEG_H / 2 - 4, h: MEG_H + 8, u: S.k / BAO, ben: -this.f };
                    if (S.k >= BAO){ S.p = 3; this.tel = null; this.an = false; this.invulnAll = false; this.mo = 1; this.tieng(140, 0.25); }
                    return;
                }
                if (S.p === 3){
                    this.X += this.f * 28 * this.spd();
                    if (this.chamThan()) this.hurtP();
                    if (T % 3 === 0) this.bot.push({ x: this.X - this.f * MEG_L / 2, y: this.Y + (Math.random() - 0.5) * 40, t: 0 });
                    if (this.f > 0 ? this.X > canvas.width + MEG_L : this.X < -MEG_L){
                        S.lan++; this.mo = 0;
                        if (S.lan < SO){ this.f = -this.f; this.facingLeft = this.f < 0; S.p = 2; S.k = 0; S.y = this.khoaY(this.pY()); this.invulnAll = true; }
                        else { S.p = 4; S.k = 0; this.f = -this.f; this.facingLeft = this.f < 0; this.X = this.f > 0 ? -MEG_L / 2 + 60 : canvas.width + MEG_L / 2 - 60; }
                    }
                    return;
                }
                // NHIP DANH TRA: tro vao man, quay dau cham chap o mep
                S.k++; this.an = false; this.invulnAll = false;
                this.X += this.f * 2.2; this.goc = Math.sin(S.k * 0.2) * 0.08;
                if (S.k > 50) this.veLan();
            }
            // ================= 2. DOP TU VUC =================
            s_vuc(T, S){
                const BAO = Math.round(34 / this.spd()), KHOA = 12, SO = this.phase === 2 ? 2 : 1;
                if (!S.p){ S.p = 1; S.lan = 0; }
                if (S.p === 1){                                   // chim sau
                    this.an = true; this.Y += 10; this.invulnAll = this.Y > BIEN_DAY - 10;
                    if (this.Y > BIEN_DAY + 60){ S.p = 2; S.k = 0; S.x = this.pX(); this.dung = true; this.f = 1; this.facingLeft = false; }
                    return;
                }
                if (S.p === 2){                                   // hai mat bam theo duoi chan roi KHOA
                    S.k++; if (S.k < BAO - KHOA) S.x += (this.pX() - S.x) * 0.22;
                    this.X = S.x; this.Y = BIEN_DAY + MEG_L / 2 - 30; this.goc = -Math.PI / 2; this.dung = true;
                    this.tel = { loai: 'doc', x: S.x, u: S.k / BAO };
                    if (S.k >= BAO){ S.p = 3; this.tel = null; this.invulnAll = false; this.an = false; this.vy = -21 * this.spd(); this.mo = 1; this.tieng(90, 0.4); shakeTimer = Math.max(shakeTimer, 8); }
                    return;
                }
                if (S.p === 3){                                   // PHONG LEN, ham mo; qua nguoi choi thi DOP
                    this.Y += this.vy;
                    if (this.chamThan()) this.hurtP();
                    let M = this.mieng();
                    if (!S.dop && (M.y < this.pY() - 30 || M.y < OCEAN_SURF + 20)){ S.dop = 1; this.mo = 0; this.tieng(260, 0.12, 'square');
                        if (checkAABB(dino, this.hopCan())) this.hurtP(); visualEffects.push(new Effect(M.x, M.y, 'explosion', true, 26)); }
                    if (M.y < OCEAN_SURF + 10 && !S.vo){ S.vo = 1; for (let k = 0; k < 8; k++) visualEffects.push(new Effect(S.x + (Math.random() - 0.5) * 90, OCEAN_SURF, 'explosion', true, 20));
                        for (let p of oceanPads) if (p.solid && S.x > p.x - 30 && S.x < p.x + p.w + 30){ p.solid = false; p.respawn = 240; } }
                    if (this.vy > -2 || M.y < OCEAN_SURF - 70){ S.p = 4; S.k = 0; this.vy = Math.min(this.vy, 0); }
                    this.vy += 0.35;
                    return;
                }
                // NHIP DANH TRA: roi xuong cham, lat ngang dan
                S.k++; this.vy = Math.min(6, this.vy + 0.35); this.Y += this.vy;
                if (S.k > 20){ this.dung = false; this.goc *= 0.85; }
                if (S.k > 56){
                    S.lan++;
                    if (S.lan < SO){ S.p = 1; S.dop = 0; S.vo = 0; this.goc = 0; } else this.veLan();
                }
            }
            // ================= 3. VAY SAN =================
            s_vay(T, S){
                const DUOI = Math.round(84 / this.spd());
                if (!S.p){ S.p = 1; }
                if (S.p === 1){                                   // noi len sat mat nuoc, chi con VAY LUNG
                    this.an = false; this.Y += (OCEAN_SURF + MEG_H / 2 + 6 - this.Y) * 0.1; this.invulnAll = false;
                    this.faceP(); this.X += (this.pX() - this.f * 300 - this.X) * 0.05;
                    if (Math.abs(this.Y - (OCEAN_SURF + MEG_H / 2 + 6)) < 6 || T > 50){ S.p = 2; S.k = 0; }
                    return;
                }
                if (S.p === 2){                                   // vay luot zic-zac ve phia nguoi choi
                    S.k++; this.faceP();
                    this.X += this.f * (4 + Math.sin(S.k * 0.15) * 1.5) * this.spd(); this.Y = OCEAN_SURF + MEG_H / 2 + 6 + Math.sin(S.k * 0.2) * 3;
                    this.tel = { loai: 'vay', x: this.pX(), u: S.k / DUOI };
                    if (S.k >= DUOI || Math.abs(this.pX() - this.X) < 150){ S.p = 3; S.k = 0; this.tel = null;
                        let dx = this.pX() - this.X; S.vx = Math.max(-13, Math.min(13, dx / 28 + this.f * 5)); this.vy = -15; this.mo = 1; this.tieng(120, 0.35);
                        for (let k = 0; k < 6; k++) visualEffects.push(new Effect(this.X + (Math.random() - 0.5) * 160, OCEAN_SURF, 'explosion', true, 18)); }
                    return;
                }
                if (S.p === 3){                                   // NHAY VOT thanh vong cung, ham mo
                    S.k++; this.X += S.vx; this.Y += this.vy; this.vy += 0.62;
                    this.goc = Math.atan2(this.vy, Math.abs(S.vx) + 0.01) * this.f * 0.7;
                    if (this.chamThan()) this.hurtP();
                    if (this.vy > 0 && this.Y > OCEAN_SURF + 10){
                        S.p = 4; S.k = 0; this.mo = 0; shakeTimer = Math.max(shakeTimer, 14); this.tieng(70, 0.4);
                        for (const d of [-1, 1]) this.song.push({ x: this.X, v: d * 7, t: 0, hit: 0, loai: 'mat' });
                        for (let k = 0; k < 10; k++) visualEffects.push(new Effect(this.X + (Math.random() - 0.5) * 200, OCEAN_SURF, 'explosion', true, 22));
                    }
                    return;
                }
                // NHIP DANH TRA: chim cham, xoay ngang lai
                S.k++; this.Y += 3; this.goc *= 0.9;
                if (S.k > 46) this.veLan();
            }
            // ================= 4. CAN XE =================
            s_can(T, S){
                const MO = Math.round(14 / this.spd()), SO = this.phase === 2 ? 4 : 3;
                if (!S.p){ S.p = 1; S.n = 0; }
                if (S.p === 1){                                   // lao tu bong toi toi sat nguoi choi
                    this.an = false; this.faceP();
                    let tx = this.pX() - this.f * (MEG_L / 2 + 20), ty = this.khoaY(this.pY() - 6);
                    let dx = tx - this.X, dy = ty - this.Y, d = Math.hypot(dx, dy) || 1, v = Math.min(d, 20 * this.spd());
                    this.X += dx / d * v; this.Y += dy / d * v; this.goc = Math.atan2(dy, Math.abs(dx) + 1) * this.f * 0.3;
                    if (d < 24 || T > 50){ S.p = 2; S.k = 0; this.goc = 0; }
                    return;
                }
                S.k++;
                if (S.k === 1){ this.faceP(); S.y = this.khoaY(this.pY() - 6); }
                if (S.k <= MO){ this.mo = S.k / MO; this.tel = { loai: 'ham', u: S.k / MO }; this.Y += (S.y - this.Y) * 0.3; return; }
                this.tel = null;
                if (S.k === MO + 1){ this.mo = 0; this.tieng(300, 0.1, 'square'); }
                if (S.k <= MO + 6){ this.X += this.f * 11; if (checkAABB(dino, this.hopCan())) this.hurtP(); }
                if (S.k > MO + 14){
                    S.n++;
                    if (S.n < SO){ S.k = 0; }
                    else { S.p = 3; S.k = 0; }
                }
                if (S.p === 3){ this.veLan(this.phase === 2 ? 40 : 60); }
            }
            // ================= 5. QUAT DUOI — VONG SONG AP =================
            s_duoi(T, S){
                const CUON = Math.round(22 / this.spd());
                if (!S.p){ S.p = 1; S.ben = this.pX() < canvas.width / 2 ? 1 : -1; }
                if (S.p === 1){                                   // boi ngang toi, lot qua ngay canh nguoi choi
                    this.an = false; this.f = -S.ben; this.facingLeft = this.f < 0;
                    let ty = this.khoaY(this.pY() + (this.pY() > 500 ? -120 : 120));
                    if (!S.vao){ S.vao = 1; this.X = S.ben > 0 ? canvas.width + MEG_L / 2 : -MEG_L / 2; this.Y = ty; }
                    this.X += this.f * 11 * this.spd(); this.Y += (ty - this.Y) * 0.08;
                    let duoiX = this.X - this.f * MEG_L / 2;
                    if ((this.f < 0 ? duoiX < this.pX() + 40 : duoiX > this.pX() - 40) || T > 150){ S.p = 2; S.k = 0; }
                    return;
                }
                if (S.p === 2){                                   // CUON DUOI: bao vong ap sap no
                    S.k++; this.X += this.f * 1.5; this.duoiP = Math.sin(S.k / CUON * Math.PI) * 1.2;
                    let dx = this.X - this.f * (MEG_L / 2 - 10);
                    this.tel = { loai: 'vong', x: dx, y: this.Y, r: 300, u: S.k / CUON };
                    if (S.k >= CUON){ S.p = 3; S.k = 0; this.tel = null; this.tieng(80, 0.5); shakeTimer = Math.max(shakeTimer, 12);
                        this.song.push({ x: dx, y: this.Y, r: 20, t: 0, hit: 0, loai: 'vong' }); }
                    return;
                }
                S.k++; this.duoiP *= 0.85; this.X += this.f * 3;
                if (S.k > 44) this.veLan();
            }
            // ---- GAM: MAU LOANG — dung yen bat tu 1 giay ----
            s_gam(T){
                this.invulnAll = true; this.an = false; this.faceP(); this.mo = Math.min(1, T / 20);
                if (T === 1){ floatingTexts.push(new FloatingText(this.X - 70, this.Y - 70, LT("MÁU LOANG!", "BLOOD FRENZY!"))); shakeTimer = Math.max(shakeTimer, 24); this.tieng(55, 0.8); }
                if (T > 60){ this.invulnAll = false; this.veLan(24); }
            }
            tickSong(){
                for (let i = this.song.length - 1; i >= 0; i--){
                    let s = this.song[i]; s.t++;
                    if (s.loai === 'mat'){                        // song toe doc mat nuoc
                        s.x += s.v;
                        if (!s.hit && checkAABB(dino, { x: s.x - 22, y: OCEAN_SURF - 50, w: 44, h: 80 })){ s.hit = 1; this.hurtP(); }
                        if (s.t > 110 || s.x < -60 || s.x > canvas.width + 60) this.song.splice(i, 1);
                    } else {                                      // vong song ap: vanh day 26px no toi 300
                        s.r = 20 + s.t * 10;
                        let d = Math.hypot(this.pX() - s.x, this.pY() - s.y);
                        if (!s.hit && Math.abs(d - s.r) < 26){ s.hit = 1; this.hurtP();
                            let nx = (this.pX() - s.x) / (d || 1), ny = (this.pY() - s.y) / (d || 1);
                            dino.x += nx * 34; if ('dy' in dino) dino.dy = ny * 6; }
                        if (s.r > 300) this.song.splice(i, 1);
                    }
                }
                for (let i = this.bot.length - 1; i >= 0; i--){ let b = this.bot[i]; b.t++; b.y -= 1.2; if (b.t > 40) this.bot.splice(i, 1); }
            }
            // lo sang trong bong toi (bienVeTren goi): an -> chi quanh mat; hien -> ca than
            toiLo(lo){
                if (this.an){ let E = this.mat(); lo(E.x, E.y, 36); return; }
                if (this.invulnAll && this.state === 'chop') return;
                lo(this.X, this.Y, 230); lo(this.X + this.f * 110, this.Y, 150); lo(this.X - this.f * 110, this.Y, 150);
            }
            mat(){
                if (this.dung) return { x: this.X + 18, y: this.Y - MEG_L / 2 + 70 };
                return { x: this.X + this.f * (MEG_L / 2 - 64), y: this.Y - 16 };
            }
            // ================= VE =================
            veNguyHiem(){
                if (this.phase === 2){ ctx.save(); ctx.fillStyle = "rgba(160,0,20,0.10)"; ctx.fillRect(-100, OCEAN_SURF, canvas.width + 200, BIEN_DAY - OCEAN_SURF); ctx.restore(); }
                let T = this.tel;
                if (T){
                    ctx.save(); let nh = Math.floor(frames / 3) % 2 === 0;
                    if (T.loai === 'ngang'){
                        ctx.fillStyle = "rgba(255,30,30," + (0.10 + 0.2 * T.u).toFixed(2) + ")"; ctx.fillRect(0, T.y, canvas.width, T.h);
                        ctx.strokeStyle = nh ? "rgba(255,70,70,0.95)" : "rgba(255,210,90,0.9)"; ctx.lineWidth = 2; ctx.strokeRect(1, T.y, canvas.width - 2, T.h);
                        // mat loe o mep man phia no se lao ra
                        let ex = T.ben > 0 ? canvas.width - 24 : 24;
                        ctx.fillStyle = "#FFEB3B"; ctx.shadowColor = "#FFEB3B"; ctx.shadowBlur = 16; ctx.beginPath(); ctx.arc(ex, T.y + T.h * 0.35, 5 + 3 * T.u, 0, 6.28); ctx.fill();
                    } else if (T.loai === 'doc'){
                        ctx.fillStyle = "rgba(255,30,30," + (0.08 + 0.16 * T.u).toFixed(2) + ")"; ctx.fillRect(T.x - 50, OCEAN_SURF - 30, 100, BIEN_DAY - OCEAN_SURF + 30);
                        ctx.fillStyle = "rgba(255,255,255,0.6)"; for (let k = 0; k < 12; k++){ let by = BIEN_DAY - ((frames * 8 + k * 55) % (BIEN_DAY - OCEAN_SURF)); ctx.beginPath(); ctx.arc(T.x + Math.sin(by * 0.05 + k) * 20, by, 3 + (k % 3), 0, 6.28); ctx.fill(); }
                    } else if (T.loai === 'vay'){
                        ctx.strokeStyle = "rgba(255,80,80," + (0.4 + 0.4 * T.u).toFixed(2) + ")"; ctx.lineWidth = 2; ctx.setLineDash([8, 6]);
                        ctx.beginPath(); ctx.ellipse(T.x, OCEAN_SURF, 90, 22, 0, 0, 6.28); ctx.stroke(); ctx.setLineDash([]);
                    } else if (T.loai === 'ham'){
                        let hop = this.hopCan(); ctx.fillStyle = "rgba(255,40,40," + (0.15 + 0.25 * T.u).toFixed(2) + ")"; ctx.fillRect(hop.x, hop.y, hop.w, hop.h);
                        ctx.strokeStyle = nh ? "#FF5252" : "#FFD180"; ctx.lineWidth = 2; ctx.strokeRect(hop.x, hop.y, hop.w, hop.h);
                    } else if (T.loai === 'vong'){
                        ctx.strokeStyle = "rgba(255,80,80," + (0.3 + 0.5 * T.u).toFixed(2) + ")"; ctx.lineWidth = 3; ctx.setLineDash([10, 8]);
                        ctx.beginPath(); ctx.arc(T.x, T.y, T.r, 0, 6.28); ctx.stroke(); ctx.setLineDash([]);
                    }
                    ctx.restore();
                }
                // song
                ctx.save();
                for (let s of this.song){
                    if (s.loai === 'mat'){
                        ctx.fillStyle = "rgba(224,247,250,0.85)"; ctx.beginPath(); ctx.moveTo(s.x - 26, OCEAN_SURF + 6);
                        ctx.quadraticCurveTo(s.x, OCEAN_SURF - 60, s.x + 26 * Math.sign(s.v), OCEAN_SURF + 6); ctx.fill();
                    } else {
                        let a = Math.max(0, 1 - s.r / 300);
                        ctx.strokeStyle = "rgba(178,235,242," + (0.9 * a + 0.1).toFixed(2) + ")"; ctx.lineWidth = 10;
                        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.stroke();
                        ctx.strokeStyle = "rgba(255,255,255," + (0.8 * a).toFixed(2) + ")"; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.arc(s.x, s.y, s.r - 8, 0, 6.28); ctx.stroke();
                    }
                }
                for (let b of this.bot){ ctx.fillStyle = "rgba(255,255,255," + (0.6 * (1 - b.t / 40)).toFixed(2) + ")"; ctx.beginPath(); ctx.arc(b.x, b.y, 3 + (b.t % 3), 0, 6.28); ctx.fill(); }
                ctx.restore();
                // HAI CON MAT VANG luc dang an — luon thay, ke ca trong toi
                if (this.an && !(this.state === 'chop' && this.invulnAll)){
                    let E = this.mat(), nh = 0.6 + 0.4 * Math.sin(frames * 0.1);
                    ctx.save(); ctx.fillStyle = this.phase === 2 ? "#FF5252" : "#FFEB3B"; ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 14; ctx.globalAlpha = nh;
                    ctx.beginPath(); ctx.ellipse(E.x, E.y, 6, 3, 0, 0, 6.28); ctx.fill();
                    ctx.beginPath(); ctx.ellipse(E.x - this.f * 26, E.y - 4, 4, 2, 0, 0, 6.28); ctx.fill();
                    ctx.restore();
                }
            }
            draw(){
                if (!(typeof bienCoDiaHinh === 'function' && bienCoDiaHinh())) this.veNguyHiem();
                if (this.X < -MEG_L || this.X > canvas.width + MEG_L) { this.veThanh(); return; }
                let a = this.dying ? Math.max(0, 1 - (this.deathTimer || 0) / 48) : 1;
                let chiVay = this.state === 'vay' && (this.S.p || 1) <= 2;      // VAY SAN: than chim, chi VAY LUNG nho len
                ctx.save(); ctx.globalAlpha = a * (chiVay ? 0.28 : 1);
                ctx.translate(this.X, this.Y); ctx.rotate(this.goc); ctx.scale(this.f, 1);
                const L = MEG_L / 2, Hh = MEG_H / 2, sw = Math.sin(frames * 0.18) * 8 + this.duoiP * 30;
                // DUOI luoi liem
                ctx.fillStyle = "#37474F";
                ctx.beginPath(); ctx.moveTo(-L + 30, -8); ctx.lineTo(-L - 46, -Hh - 44 + sw); ctx.lineTo(-L - 22, -2 + sw * 0.3); ctx.lineTo(-L - 40, Hh + 30 + sw); ctx.lineTo(-L + 30, 10); ctx.closePath(); ctx.fill();
                // THAN: lung xam xanh, bung trang
                let g = ctx.createLinearGradient(0, -Hh, 0, Hh); g.addColorStop(0, "#37474F"); g.addColorStop(0.5, "#546E7A"); g.addColorStop(0.62, "#B0BEC5"); g.addColorStop(1, "#ECEFF1");
                ctx.fillStyle = g; ctx.beginPath();
                ctx.moveTo(L + 8, -2); ctx.quadraticCurveTo(L - 20, -Hh - 6, 0, -Hh); ctx.quadraticCurveTo(-L * 0.7, -Hh + 4, -L + 20, -8);
                ctx.lineTo(-L + 20, 10); ctx.quadraticCurveTo(-L * 0.6, Hh + 2, 10, Hh); ctx.quadraticCurveTo(L - 40, Hh - 4, L - 6, 16); ctx.closePath(); ctx.fill();
                // VAY LUNG khong lo + vay nguc
                ctx.fillStyle = "#37474F";
                ctx.beginPath(); ctx.moveTo(-10, -Hh + 2); ctx.quadraticCurveTo(10, -Hh - 60, 36, -Hh - 58); ctx.quadraticCurveTo(30, -Hh - 20, 50, -Hh + 4); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(30, Hh - 10); ctx.quadraticCurveTo(0, Hh + 40, -20, Hh + 34 + sw * 0.3); ctx.quadraticCurveTo(10, Hh + 4, 56, Hh - 4); ctx.closePath(); ctx.fill();
                // khe mang
                ctx.strokeStyle = "rgba(20,30,40,0.7)"; ctx.lineWidth = 2.5;
                for (let k = 0; k < 5; k++){ ctx.beginPath(); ctx.moveTo(L - 92 - k * 10, -Hh * 0.45); ctx.quadraticCurveTo(L - 98 - k * 10, 0, L - 94 - k * 10, Hh * 0.45); ctx.stroke(); }
                // SEO chien tren than
                ctx.strokeStyle = "rgba(236,239,241,0.45)"; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(-30, -20); ctx.lineTo(-6, -8); ctx.moveTo(-50, -10); ctx.lineTo(-28, 2); ctx.stroke();
                // HAM: mo theo this.mo
                let mo = this.mo, hx = L - 14;
                ctx.fillStyle = "#3E0D14";
                ctx.beginPath(); ctx.moveTo(hx - 70, 6); ctx.lineTo(hx + 18, 2 - mo * 26); ctx.lineTo(hx + 18, 10 + mo * 30); ctx.closePath(); ctx.fill();
                // ham tren + ham duoi
                ctx.fillStyle = "#546E7A";
                ctx.beginPath(); ctx.moveTo(hx - 80, -6); ctx.quadraticCurveTo(hx, -Hh * 0.9, hx + 24, -2 - mo * 28); ctx.lineTo(hx - 66, 4); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#CFD8DC";
                ctx.beginPath(); ctx.moveTo(hx - 70, 10); ctx.lineTo(hx + 18, 12 + mo * 32); ctx.quadraticCurveTo(hx - 20, Hh - 2 + mo * 16, hx - 76, 18); ctx.closePath(); ctx.fill();
                // RANG tam giac
                ctx.fillStyle = "#FFFDE7";
                for (let k = 0; k < 7; k++){
                    let u = k / 6, x1 = hx - 62 + u * 78, y1 = -2 - mo * 26 * u + 2;
                    ctx.beginPath(); ctx.moveTo(x1 - 4, y1); ctx.lineTo(x1, y1 + 8 + mo * 4); ctx.lineTo(x1 + 4, y1); ctx.fill();
                    let y2 = 11 + mo * 30 * u;
                    ctx.beginPath(); ctx.moveTo(x1 - 4, y2); ctx.lineTo(x1, y2 - 7 - mo * 4); ctx.lineTo(x1 + 4, y2); ctx.fill();
                }
                // mat
                ctx.fillStyle = this.phase === 2 ? "#FF1744" : "#111"; ctx.beginPath(); ctx.arc(L - 64, -16, 5, 0, 6.28); ctx.fill();
                ctx.fillStyle = this.phase === 2 ? "#FF8A80" : "#FFEB3B"; ctx.beginPath(); ctx.arc(L - 63, -17, 1.8, 0, 6.28); ctx.fill();
                if (chiVay){                                         // vay lung ro net + vet nuoc re doi
                    ctx.globalAlpha = a; ctx.fillStyle = "#263238";
                    ctx.beginPath(); ctx.moveTo(-10, -Hh + 2); ctx.quadraticCurveTo(10, -Hh - 60, 36, -Hh - 58); ctx.quadraticCurveTo(30, -Hh - 20, 50, -Hh + 4); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(56, -Hh - 6); ctx.quadraticCurveTo(20, -Hh - 14, -60, -Hh - 4); ctx.stroke();
                }
                ctx.restore();
                this.veThanh();
            }
            veThanh(){ if (typeof drawTopBossBar === 'function' && !this.dying) drawTopBossBar(this, this.phase === 2 ? "#D50000" : "#546E7A", this.name); }
        }
// BOSS_PART_END s1.MegalodonBoss.1

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
