// BOSS_FILE: HelicoprionBoss
// BOSS_SNAPSHOT: 3cf4652cd737d36361a15b25712b9a3ff21a9a13bbe8337913bcf233f06c6a1d
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: DPR, Effect, FloatingText, LT, Math, SFX, Set, bosses, canvas, checkAABB, ctx, defMode, dino, dojoMode, floatingTexts, frames, gameState, mapChay, mapTheme, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24489 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, IronhaulBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:40403 · Dùng bởi: HelicoprionBoss, MegalodonBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.OCEAN_SURF.1 READ_ONLY
const OCEAN_SURF = 150;
// BOSS_PART_END s1.OCEAN_SURF.1

// Nguồn: index.html:40405 · Dùng bởi: HelicoprionBoss, MegalodonBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.oceanPads.1 READ_ONLY
let oceanPads = [], oceanCamY = 0;
// BOSS_PART_END s1.oceanPads.1

// Nguồn: index.html:40465 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.BIEN_DAY.1 READ_ONLY
const BIEN_DAY = 760, BIEN_NONG = 330, BIEN_SAU = 470, BIEN_VUC = 560;
// BOSS_PART_END s1.BIEN_DAY.1

// Nguồn: index.html:40472 · Dùng bởi: HelicoprionBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienVat.1 READ_ONLY
let bienVat = [], bienCuoi = 0, bienLoaiTruoc = -1, bienX0 = null, bienTrongBun = 0, bienChon = false, bienDaDoan = 0;
// BOSS_PART_END s1.bienVat.1

// Nguồn: index.html:40474 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienChay.1 READ_ONLY
function bienChay(){
            return typeof gameState !== 'undefined' && gameState === 'normal' && mapChay === 'ocean' && mapTheme === 'ocean'
                && bosses.length === 0 && !defMode;
        }
// BOSS_PART_END s1.bienChay.1

// Nguồn: index.html:40479 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienCoDiaHinh.1 READ_ONLY
function bienCoDiaHinh(){ return bienChay() || (typeof bienDT !== 'undefined' && bienDT && mapTheme === 'ocean'); }
// BOSS_PART_END s1.bienCoDiaHinh.1

// Nguồn: index.html:41362 · Dùng bởi: HelicoprionBoss
// BOSS_PART_BEGIN s1.HELI_HP.1 EDITABLE
const HELI_HP = 180;
// BOSS_PART_END s1.HELI_HP.1

// Nguồn: index.html:41363 · Dùng bởi: HelicoprionBoss
// BOSS_PART_BEGIN s1.HELI_XOAY_R.1 EDITABLE
const HELI_XOAY_R = 85;
// BOSS_PART_END s1.HELI_XOAY_R.1

// Nguồn: index.html:41364 · Dùng bởi: HelicoprionBoss
// BOSS_PART_BEGIN s1.HELI_TRANG.1 READ_ONLY
const HELI_TRANG = { vao: 1, nghi: 1, xe: 1, rang: 1, xoay: 1, vo: 1, can: 1, bao: 1, gam: 1 };
// BOSS_PART_END s1.HELI_TRANG.1

// Nguồn: index.html:41365 · Dùng bởi: HelicoprionBoss
// BOSS_PART_BEGIN s1.HELI_CD.1 EDITABLE
const HELI_CD = { xe: 200, rang: 240, xoay: 420, vo: 380, can: 150, bao: 600 };
// BOSS_PART_END s1.HELI_CD.1

// Nguồn: index.html:41367 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.bienDT.1 READ_ONLY
let bienDT = false, bienToiY = 520;
// BOSS_PART_END s1.bienDT.1

// Nguồn: index.html:41383 · Dùng bởi: HelicoprionBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienTickTinh.1 READ_ONLY
function bienTickTinh(){
            for (let o of bienVat) o.t++;
            for (let p of oceanPads) if (p.bien) p.top = p.top0 + Math.sin(frames * 0.045 + p.pha) * 5;
            for (let p of projectiles) for (let o of bienVat) if (o.k === 'sang' && checkAABB(p, o)) o.sang = 360;
        }
// BOSS_PART_END s1.bienTickTinh.1

// Nguồn: index.html:41388 · Dùng bởi: HelicoprionBoss
// BOSS_PART_BEGIN s1.HelicoprionBoss.1 EDITABLE
class HelicoprionBoss {
            constructor(level){
                this.name = "HELICOPRION — HÀM CƯA XOẮN";
                this.hp = HELI_HP; this.maxHp = HELI_HP; this.phase = 1;
                this.w = 220; this.h = 60; this.x = canvas.width + 40; this.y = 430; this.f = -1; this.facingLeft = true;
                this.state = 'vao'; this.t = 0; this.S = {}; this.cd = {}; this.actionTimer = 50; this.lastSkill = '';
                this.invulnAll = false; this.burnTimer = 0; this.lastMeleeHit = -1;
                this.quay = 0;           // goc quay vong rang (ve)
                this.nong = 0;           // 0..1 ham nung do (pha 2)
                this.goc = 0;            // nghieng than (ve) — lao thang dung khi troi len
                this.dan = [];           // rang: { x, y, vx, vy, t, ve, roi }
                this.tel = null;         // bao truoc dang ve
            }
            cx(){ return this.x + this.w / 2; } cy(){ return this.y + this.h / 2; }
            ham(){ return { x: this.cx() + this.f * (this.w / 2 - 34), y: this.y + this.h * 0.72 }; }
            faceP(){ this.f = (dino.x + dino.w / 2) < this.cx() ? -1 : 1; this.facingLeft = this.f < 0; }
            spd(){ return this.phase === 2 ? 1.25 : 1; }
            hurtP(){
                if (this._hitF === frames) return; this._hitF = frames;
                if (!dino.isShielding()) dino.takeDamage(1);
                else visualEffects.push(new Effect(dino.x + (dino.isFacingLeft ? 0 : dino.w), dino.y + 10, 'parry'));
            }
            // @@HE-HELI2: hop can xoan = vung ve do truoc ham · hop troi len = dung than thang dung dang ve
            hopCan(){ let H = this.ham(); return { x: H.x + (this.f > 0 ? -6 : -94), y: H.y - 38, w: 100, h: 76 }; }
            hopVo(){ let cy = this.y + this.w * 0.35; return { x: this.S.x - 30, y: cy - this.w / 2 + 6, w: 60, h: this.w - 12 }; }
            chamThan(){ return checkAABB(dino, { x: this.x + 14, y: this.y + 6, w: this.w - 28, h: this.h - 12 }); }
            chamHam(r){ let H = this.ham(); return Math.hypot((dino.x + dino.w / 2) - H.x, (dino.y + dino.h / 2) - H.y) < (r || 34) + 16; }
            veNghi(t){ this.state = 'nghi'; this.t = 0; this.tel = null; this.goc = 0; this.invulnAll = false;
                this.actionTimer = Math.round((t || (this.phase === 2 ? 42 : 66)) / this.spd()); }
            pick(){
                let kc = Math.abs((dino.x + dino.w / 2) - this.cx()) + Math.abs((dino.y + dino.h / 2) - this.cy()) * 0.6;
                let W = kc < 230 ? { can: 4, xoay: 3, xe: 1, rang: 1, vo: 1 } : { xe: 3, rang: 3, vo: 2, xoay: 1 };
                if (this.phase === 2) W.bao = 2;
                let ds = [], tong = 0;
                for (let id in W) if (!((this.cd[id] || 0) > 0) && id !== this.lastSkill){ ds.push([id, W[id]]); tong += W[id]; }
                if (!tong){ this.actionTimer = 10; return; }
                let r = Math.random() * tong, c = ds[0][0];
                for (let [id, w] of ds){ r -= w; if (r <= 0){ c = id; break; } }
                this.lastSkill = c; this.cd[c] = Math.round(HELI_CD[c] / this.spd());
                this.state = c; this.t = 0; this.S = {}; this.faceP();
            }
            update(){
                if (this.dying) return;
                // parry cua game ep state la ('returning') -> tra lai don dang ra
                if (!HELI_TRANG[this.state]){ this.state = this._st || 'nghi'; this.t = this._t || 0; }
                if (this.phase === 1 && this.hp <= this.maxHp * 0.5 && this.state !== 'vo'){
                    this.phase = 2; this.state = 'gam'; this.t = 0; this.S = {}; this.tel = null; this.cd = {};
                    this.name = "HELICOPRION — HÀM NUNG ĐỎ";
                }
                if (typeof bienTickTinh === 'function') bienTickTinh();
                this.quay += (this.state === 'xoay' || this.state === 'can' || this.state === 'xe') ? 0.5 : 0.12;
                if (this.phase === 2) this.nong = Math.min(1, this.nong + 0.02);
                bienToiY += ((this.phase === 2 ? 390 : 520) - bienToiY) * 0.02;
                for (let k in this.cd) if (this.cd[k] > 0) this.cd[k]--;
                this.tickRang();
                this.t++;
                this['s_' + this.state](this.t, this.S);
                this._st = this.state; this._t = this.t;
            }
            s_vao(T){ this.f = -1; this.x += (canvas.width - 330 - this.x) * 0.05; this.invulnAll = T < 40;
                if (T > 70) this.veNghi(40); }
            s_nghi(T){
                this.faceP();
                let px = dino.x + dino.w / 2, py = dino.y + dino.h / 2;
                let tx = px - this.f * 300 - this.w / 2, ty = Math.max(OCEAN_SURF + 70, Math.min(BIEN_DAY - 90, py - this.h / 2));
                tx = Math.max(-60, Math.min(canvas.width - this.w + 60, tx));
                this.x += (tx - this.x) * 0.025; this.y += (ty - this.y) * 0.03 + Math.sin(frames * 0.05) * 0.6;
                if (--this.actionTimer <= 0) this.pick();
            }
            // ---- LAO CUA: vach do ngang 0.66 giay roi xe ngang ca dau truong o do sau da khoa ----
            s_xe(T, S){
                const BAO = Math.round(40 / this.spd());
                if (!S.p){ S.p = 1; S.lan = 0; }
                if (S.p === 1){                                   // ve mep, khoa do sau
                    let ben = (dino.x + dino.w / 2) < canvas.width / 2 ? 1 : -1;   // lao TU phia xa nguoi choi
                    S.tu = ben > 0 ? canvas.width - 40 : 40 - this.w; S.dir = -ben;
                    S.y = Math.max(OCEAN_SURF + 20, Math.min(BIEN_DAY - this.h - 10, dino.y + dino.h / 2 - this.h / 2));
                    this.x += (S.tu - this.x) * 0.12; this.y += (S.y - this.y) * 0.12; this.f = S.dir; this.facingLeft = this.f < 0;
                    if (Math.abs(this.x - S.tu) < 12 || T > 70){ S.p = 2; S.k = 0; }
                    return;
                }
                if (S.p === 2){                                   // BAO: vach do theo do sau da khoa
                    S.k++; this.y += (S.y - this.y) * 0.2;
                    this.tel = { loai: 'ngang', y: S.y - 8, h: this.h + 16, u: S.k / BAO };
                    if (S.k >= BAO){ S.p = 3; this.tel = null; if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(160, 0.3, 'sawtooth', 0.18, 90); }
                    return;
                }
                this.x += S.dir * 17 * this.spd();
                if (this.chamThan() || this.chamHam(40)) this.hurtP();
                if (S.dir > 0 ? this.x > canvas.width + 20 : this.x + this.w < -20){
                    S.lan++;
                    if (this.phase === 2 && S.lan < 2){ S.p = 2; S.k = 0; S.dir = -S.dir; this.f = S.dir; this.facingLeft = this.f < 0;
                        S.y = Math.max(OCEAN_SURF + 20, Math.min(BIEN_DAY - this.h - 10, dino.y + dino.h / 2 - this.h / 2)); }
                    else { this.x = S.dir > 0 ? canvas.width - this.w + 40 : -40; this.veNghi(); }
                }
            }
            // ---- NEM RANG: ha ham 0.5 giay, phun 3 (pha 2: 5) rang xoan bay ra roi QUAY VE ham ----
            s_rang(T, S){
                this.faceP();
                const BAO = 30, N = this.phase === 2 ? 5 : 3;
                if (T === BAO){
                    let H = this.ham(), px = dino.x + dino.w / 2, py = dino.y + dino.h / 2, a0 = Math.atan2(py - H.y, px - H.x);
                    for (let i = 0; i < N; i++){ let a = a0 + (i - (N - 1) / 2) * 0.32;
                        this.dan.push({ x: H.x, y: H.y, vx: Math.cos(a) * 7.5, vy: Math.sin(a) * 7.5, t: 0, ve: true }); }
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900, 0.12, 'square', 0.14, 300);
                }
                if (T > BAO + 20) this.veNghi();
            }
            tickRang(){
                let H = this.ham();
                for (let i = this.dan.length - 1; i >= 0; i--){
                    let r = this.dan[i]; r.t++;
                    if (r.roi){                                   // BAO RANG / VO RANG: bay thang hoac chim tu tu
                        r.x += r.vx + (r.lac ? Math.sin(r.t * 0.08) * 0.8 : 0); r.y += r.vy;
                    } else if (r.ve && r.t > 48){                 // quay ve ham, bay vong
                        let dx = H.x - r.x, dy = H.y - r.y, d = Math.hypot(dx, dy) || 1;
                        r.vx += dx / d * 0.7; r.vy += dy / d * 0.7; let v = Math.hypot(r.vx, r.vy); if (v > 9){ r.vx *= 9 / v; r.vy *= 9 / v; }
                        r.x += r.vx; r.y += r.vy;
                        if (d < 30 || r.t > 220){ this.dan.splice(i, 1); continue; }
                    } else { r.vx *= 0.985; r.vy *= 0.985; r.x += r.vx; r.y += r.vy; }
                    { let nx = Math.max(dino.x + 4, Math.min(r.x, dino.x + dino.w - 4)), ny = Math.max(dino.y + 4, Math.min(r.y, dino.y + dino.h - 4));
                      if (Math.hypot(r.x - nx, r.y - ny) < 10) this.hurtP(); }   // @@HE-HELI2: dung hinh rang (ban kinh ~11) cham than, khong phai vong 26 tu tam
                    if (r.y > BIEN_DAY + 20 || r.x < -60 || r.x > canvas.width + 60 || r.t > 600) this.dan.splice(i, 1);
                }
            }
            // ---- XOAY LOC: xoay tron tai cho, HUT nguoi choi vao, ham cua cat trong 95px; ket thuc vo tung rang ra 4 phia ----
            s_xoay(T, S){
                const BAO = 36, DAI = Math.round((this.phase === 2 ? 190 : 150));
                if (T <= BAO){ this.faceP(); let px = dino.x + dino.w / 2, py = dino.y + dino.h / 2;
                    this.x += (px - this.w / 2 - this.x) * 0.02; this.y += (py - this.h / 2 - this.y) * 0.02;
                    this.tel = { loai: 'vong', x: this.cx(), y: this.cy(), r: 260, u: T / BAO }; return; }
                this.tel = null;
                if (T <= BAO + DAI){
                    this.goc += 0.35;
                    let cx = this.cx(), cy = this.cy(), dx = cx - (dino.x + dino.w / 2), dy = cy - (dino.y + dino.h / 2), d = Math.hypot(dx, dy) || 1;
                    if (d < 260 && !dino.invincible){ let F = 2.4 * (1 - d / 260) + 0.5; dino.x += dx / d * F; dino.y += dy / d * F * 0.8; dino.dy *= 0.85; }
                    if (d < HELI_XOAY_R) this.hurtP();
                    if (T % 4 === 0) visualEffects.push(new Effect(cx + Math.cos(this.goc) * 90, cy + Math.sin(this.goc) * 60, 'explosion', true, 8));
                    return;
                }
                if (!S.no){ S.no = 1; this.goc = 0; let n = this.phase === 2 ? 8 : 6;
                    for (let i = 0; i < n; i++){ let a = i / n * 6.283 + 0.2; this.dan.push({ x: this.cx(), y: this.cy(), vx: Math.cos(a) * 6, vy: Math.sin(a) * 6, t: 0, roi: true }); }
                    shakeTimer = Math.max(shakeTimer, 10); }
                if (T > BAO + DAI + 24) this.veNghi();
            }
            // ---- TROI LEN TU VUC: lan xuong day toi, cot bot + hai mat sang bao 0.75 giay, roi phong thang len mat nuoc ----
            s_vo(T, S){
                if (!S.p){ S.p = 1; }
                if (S.p === 1){                                   // chim vao bong toi
                    this.y += 9; this.invulnAll = this.y > BIEN_DAY - 20;
                    if (this.y > BIEN_DAY + 40){ S.p = 2; S.k = 0; S.x = Math.max(60, Math.min(canvas.width - 60, dino.x + dino.w / 2)); }
                    return;
                }
                if (S.p === 2){                                   // BAO: bot + mat sang theo nguoi choi 30 khung dau, khoa 15 khung cuoi
                    S.k++; const BAO = Math.round(45 / this.spd());
                    if (S.k < BAO - 15) S.x += ((dino.x + dino.w / 2) - S.x) * 0.2;
                    this.tel = { loai: 'doc', x: S.x, u: S.k / BAO };
                    this.x = S.x - this.w / 2; this.y = BIEN_DAY + 40;
                    if (S.k >= BAO){ S.p = 3; this.tel = null; this.invulnAll = false; this.goc = -1.57; this.vy = -17 * this.spd(); shakeTimer = Math.max(shakeTimer, 8);
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(110, 0.35, 'sawtooth', 0.2, 60); }
                    return;
                }
                if (S.p === 3){                                   // PHONG LEN — than thang dung, hop va cham doc
                    this.y += this.vy;
                    if (checkAABB(dino, this.hopVo())) this.hurtP();
                    if (this.y - 60 < OCEAN_SURF + 10 && !S.vo){
                        S.vo = 1; for (let k = 0; k < 8; k++) visualEffects.push(new Effect(S.x + (Math.random() - 0.5) * 90, OCEAN_SURF, 'explosion', true, 20));
                        for (let p of oceanPads) if (p.solid && S.x > p.x - 30 && S.x < p.x + p.w + 30){ p.solid = false; p.respawn = 240; }   // lat be
                    }
                    if (this.y < OCEAN_SURF - 60){ S.p = 4; this.vy = 4; }
                    return;
                }
                this.y += this.vy; this.vy = Math.min(8, this.vy + 0.35); this.goc += (0 - this.goc) * 0.1;
                if (this.y > OCEAN_SURF + 160){ this.goc = 0; this.veNghi(); }
            }
            // ---- CAN XOAN: sat nguoi — ham mo, vong rang xoay ve truoc, luot toi 70px, cat 50 khung ----
            s_can(T, S){
                const BAO = 22;
                if (T <= BAO){ this.faceP(); this.tel = { loai: 'ham', u: T / BAO }; return; }
                this.tel = null;
                if (T <= BAO + 12) this.x += this.f * 6 * this.spd();
                if (T <= BAO + 50 && checkAABB(dino, this.hopCan())) this.hurtP();
                if (T > BAO + 64) this.veNghi();
            }
            // ---- BAO RANG (pha 2): boi doc tang nong, rai rang cham tu tu chim xuong ----
            s_bao(T, S){
                if (!S.p){ S.p = 1; S.dir = this.cx() < canvas.width / 2 ? 1 : -1; }
                if (S.p === 1){ let tx = S.dir > 0 ? -80 : canvas.width - this.w + 80;
                    this.x += (tx - this.x) * 0.1; this.y += (OCEAN_SURF + 50 - this.y) * 0.1; this.f = S.dir; this.facingLeft = this.f < 0;
                    if (Math.abs(this.x - tx) < 10 || T > 60){ S.p = 2; } return; }
                this.x += S.dir * 7 * this.spd();
                if (T % 7 === 0) this.dan.push({ x: this.cx(), y: this.y + this.h, vx: 0, vy: 1.6, t: 0, roi: true, lac: true });
                if (this.chamThan()) this.hurtP();
                if (S.dir > 0 ? this.x > canvas.width + 30 : this.x + this.w < -30){ this.x = S.dir > 0 ? canvas.width - this.w + 40 : -40; this.y = 420; this.veNghi(); }
            }
            // ---- GAM: chuyen pha — dung yen bat tu 1 giay, ham nung do, bong toi dang len ----
            s_gam(T){
                this.invulnAll = true; this.faceP();
                if (T === 1){ floatingTexts.push(new FloatingText(this.cx() - 70, this.y - 20, LT("HÀM NUNG ĐỎ!", "RED-HOT JAW!"))); shakeTimer = Math.max(shakeTimer, 24);
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(70, 0.6, 'sawtooth', 0.22, 40); }
                if (T > 60){ this.invulnAll = false; this.veNghi(30); }
            }
            // ================= VE =================
            veNguyHiem(){
                let T = this.tel;
                if (T){                                            // BAO TRUOC
                    ctx.save(); let nh = Math.floor(frames / 4) % 2 === 0;
                    if (T.loai === 'ngang'){ ctx.fillStyle = "rgba(255,40,40," + (0.10 + 0.15 * T.u).toFixed(2) + ")"; ctx.fillRect(0, T.y, canvas.width, T.h);
                        ctx.strokeStyle = nh ? "rgba(255,80,80,0.9)" : "rgba(255,200,80,0.8)"; ctx.lineWidth = 2; ctx.strokeRect(1, T.y, canvas.width - 2, T.h); }
                    else if (T.loai === 'doc'){ ctx.fillStyle = "rgba(255,40,40," + (0.08 + 0.14 * T.u).toFixed(2) + ")"; ctx.fillRect(T.x - 40, OCEAN_SURF - 30, 80, BIEN_DAY - OCEAN_SURF + 30);
                        ctx.fillStyle = "rgba(255,255,255,0.6)"; for (let k = 0; k < 10; k++){ let by = BIEN_DAY - ((frames * 7 + k * 60) % (BIEN_DAY - OCEAN_SURF)); ctx.beginPath(); ctx.arc(T.x + Math.sin(by * 0.05 + k) * 16, by, 3 + (k % 3), 0, 6.28); ctx.fill(); }
                        ctx.fillStyle = "#FFEB3B"; ctx.shadowColor = "#FFEB3B"; ctx.shadowBlur = 12; ctx.fillRect(T.x - 20, BIEN_DAY - 26, 8, 5); ctx.fillRect(T.x + 12, BIEN_DAY - 26, 8, 5); }
                    else if (T.loai === 'vong'){ ctx.strokeStyle = "rgba(255,80,80," + (0.3 + 0.4 * T.u).toFixed(2) + ")"; ctx.lineWidth = 3; ctx.setLineDash([10, 8]);
                        ctx.beginPath(); ctx.arc(T.x, T.y, T.r * (1.3 - 0.3 * T.u), 0, 6.28); ctx.stroke(); ctx.setLineDash([]); }
                    ctx.restore();
                }
                // XOAY LOC: vong nuoc xoay quanh than, cho thay vung hut 260px
                if (this.state === 'xoay' && this.t > 36){
                    ctx.save(); ctx.strokeStyle = "rgba(200,240,255,0.45)"; ctx.lineWidth = 2;
                    for (let k = 0; k < 4; k++){ ctx.beginPath(); for (let s2 = 0; s2 < 44; s2++){ let u = s2 / 44, rr = 260 * (1 - u) + 30, g2 = -frames * 0.12 + k * 1.57 + u * 7;
                        let px = this.cx() + Math.cos(g2) * rr, py = this.cy() + Math.sin(g2) * rr * 0.75; if (s2 === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } ctx.stroke(); }
                    ctx.restore();
                }
                // VUNG CAT THAT (Hans: "may chieu gay dmg ma cha thay hit box gi") — ve dung hop dang gay sat thuong
                if (this.state === 'xoay' && this.t > 36){
                    ctx.save(); ctx.strokeStyle = "rgba(255,60,60,0.75)"; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.lineDashOffset = -frames * 2;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), HELI_XOAY_R, 0, 6.28); ctx.stroke(); ctx.setLineDash([]);
                    ctx.fillStyle = "rgba(255,60,60,0.10)"; ctx.fill(); ctx.restore();
                }
                if (this.state === 'can' && this.t > 22 && this.t <= 22 + 50){
                    let hop = this.hopCan(); ctx.save();
                    ctx.fillStyle = "rgba(255,60,40," + (0.18 + 0.1 * Math.sin(frames * 0.8)).toFixed(2) + ")"; ctx.fillRect(hop.x, hop.y, hop.w, hop.h);
                    ctx.strokeStyle = "rgba(255,220,200,0.85)"; ctx.lineWidth = 2;
                    for (let k = 0; k < 3; k++){ let a0 = frames * 0.5 + k * 2.1; ctx.beginPath(); ctx.arc(hop.x + hop.w / 2, hop.y + hop.h / 2, hop.h * 0.42, a0, a0 + 1.4); ctx.stroke(); }
                    ctx.restore();
                }
                if (this.state === 'vo' && this.S.p === 3){ let hop = this.hopVo(); ctx.save(); ctx.strokeStyle = "rgba(255,80,80,0.55)"; ctx.lineWidth = 2; ctx.strokeRect(hop.x, hop.y, hop.w, hop.h); ctx.restore(); }
                // rang bay — phat sang, luon thay ke ca trong bong toi
                for (let r of this.dan){ ctx.save(); ctx.translate(r.x, r.y); ctx.rotate(r.t * 0.4);
                    ctx.shadowColor = this.nong > 0.5 ? "#FF5722" : "#80DEEA"; ctx.shadowBlur = 12;
                    ctx.fillStyle = this.nong > 0.5 ? "#FF8A65" : "#ECEFF1"; ctx.beginPath();
                    for (let k = 0; k < 6; k++){ let a = k * 1.047; ctx.lineTo(Math.cos(a) * 12, Math.sin(a) * 12); ctx.lineTo(Math.cos(a + 0.5) * 5, Math.sin(a + 0.5) * 5); }
                    ctx.closePath(); ctx.fill(); ctx.strokeStyle = "#546E7A"; ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); }
            }
            draw(){
                // @@HE-HELI2: bao truoc, vung cat, rang bay ve o veNguyHiem() — SAU lop bong toi, de khong bao gio bi che
                if (!(typeof bienCoDiaHinh === 'function' && bienCoDiaHinh())) this.veNguyHiem();
                if (this.state === 'vo' && this.S.p === 2) return;          // dang an duoi day
                let a = this.dying ? Math.max(0, 1 - (this.deathTimer || 0) / 48) : 1;
                ctx.save(); ctx.globalAlpha = a;
                let cx = this.cx(), cy = this.cy();
                if (this.state === 'vo' && this.S.p >= 3){ cx = this.S.x; cy = this.y + this.w * 0.35; }
                ctx.translate(cx, cy);
                if (this.state === 'xoay' && this.t > 36) ctx.rotate(this.goc);
                else if (this.state === 'vo' && this.S.p >= 3) ctx.rotate(this.goc * this.f);
                ctx.scale(this.f, 1);
                const L = this.w / 2, Hh = this.h / 2, sw = Math.sin(frames * 0.15) * 6;
                // duoi
                ctx.fillStyle = "#37474F";
                ctx.beginPath(); ctx.moveTo(-L + 20, -4); ctx.lineTo(-L - 38, -Hh - 26 + sw); ctx.lineTo(-L - 20, 0); ctx.lineTo(-L - 36, Hh + 16 + sw); ctx.lineTo(-L + 20, 8); ctx.fill();
                // than
                let g = ctx.createLinearGradient(0, -Hh, 0, Hh); g.addColorStop(0, "#455A64"); g.addColorStop(0.55, "#607D8B"); g.addColorStop(1, "#CFD8DC");
                ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, L, Hh, 0, 0, 6.28); ctx.fill();
                // vay lung + vay nguc
                ctx.fillStyle = "#37474F"; ctx.beginPath(); ctx.moveTo(-10, -Hh + 4); ctx.lineTo(20, -Hh - 34); ctx.lineTo(40, -Hh + 6); ctx.fill();
                ctx.beginPath(); ctx.moveTo(10, Hh - 6); ctx.lineTo(-14, Hh + 22 + sw * 0.5); ctx.lineTo(34, Hh - 2); ctx.fill();
                // khe mang
                ctx.strokeStyle = "rgba(20,30,40,0.6)"; ctx.lineWidth = 2; for (let k = 0; k < 4; k++){ ctx.beginPath(); ctx.moveTo(L - 70 - k * 9, -Hh * 0.5); ctx.lineTo(L - 74 - k * 9, Hh * 0.4); ctx.stroke(); }
                // vet phat quang doc suon
                ctx.fillStyle = "rgba(100,255,218," + (0.35 + 0.25 * Math.sin(frames * 0.08)).toFixed(2) + ")";
                for (let k = 0; k < 7; k++) ctx.fillRect(-L + 40 + k * 22, -2 + Math.sin(k) * 3, 8, 3);
                // mom + mat
                ctx.fillStyle = "#546E7A"; ctx.beginPath(); ctx.moveTo(L - 30, -Hh + 6); ctx.quadraticCurveTo(L + 16, -6, L - 4, 6); ctx.lineTo(L - 40, 4); ctx.fill();
                ctx.fillStyle = this.phase === 2 ? "#FF5252" : "#FFEB3B"; ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(L - 30, -Hh * 0.35, 4, 0, 6.28); ctx.fill(); ctx.shadowBlur = 0;
                // HAM XOAN: vong rang xoan oc duoi mom
                let hx = L - 34, hy = Hh * 0.45, mo = (this.state === 'can' || this.state === 'rang') ? 1 : 0.4;
                ctx.save(); ctx.translate(hx, hy);
                let nong = this.nong, mauR = nong > 0 ? "rgb(" + Math.round(236 + 19 * nong) + "," + Math.round(239 - 150 * nong) + "," + Math.round(241 - 180 * nong) + ")" : "#ECEFF1";
                if (nong > 0){ ctx.fillStyle = "rgba(255,90,40," + (0.25 * nong).toFixed(2) + ")"; ctx.beginPath(); ctx.arc(0, 0, 40, 0, 6.28); ctx.fill(); }
                ctx.strokeStyle = "#37474F"; ctx.lineWidth = 3;
                ctx.beginPath(); for (let s2 = 0; s2 < 60; s2++){ let a2 = s2 * 0.2 + this.quay, rr = 6 + s2 * 0.42 * (0.7 + 0.3 * mo); let px = Math.cos(a2) * rr, py = Math.sin(a2) * rr * 0.9 + 6 * mo; if (s2 === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } ctx.stroke();
                ctx.fillStyle = mauR;
                for (let s2 = 6; s2 < 60; s2 += 3){ let a2 = s2 * 0.2 + this.quay, rr = 6 + s2 * 0.42 * (0.7 + 0.3 * mo), px = Math.cos(a2) * rr, py = Math.sin(a2) * rr * 0.9 + 6 * mo;
                    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(a2 + 1.2) * 7, py + Math.sin(a2 + 1.2) * 7); ctx.lineTo(px + Math.cos(a2 + 0.4) * 3, py + Math.sin(a2 + 0.4) * 3); ctx.fill(); }
                ctx.restore();
                ctx.restore();
                if (typeof drawTopBossBar === 'function' && !this.dying) drawTopBossBar(this, this.phase === 2 ? "#FF5722" : "#26A69A", this.name);
            }
        }
// BOSS_PART_END s1.HelicoprionBoss.1
