// BOSS_FILE: MegaManXBoss
// BOSS_SNAPSHOT: 9124d003c3ce72e4e4fcae863db4e13cdfe06607527a4558945ab0774010859b
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Map, Math, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Number, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, beamClashTargets, bosses, canvas, checkAABB, ctx, cusAcThoiVat, dealDamage, defMode, dino, dojoMode, enemies, floatingTexts, frames, gameState, mapChay, mapTheme, parry, platforms, projectiles, shakeTimer, visualEffects, voidBat, voidPhanRa, xCong, xDmgDan
// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24489 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:30383 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MMX_HP.1 READ_ONLY
const MMX_HP = 160;
// BOSS_PART_END s0.MMX_HP.1

// Nguồn: index.html:30384 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MMX_VK.1 READ_ONLY
const MMX_VK = ['cshot', 'goo', 'tri', 'flaser', 'dark', 'wing', 'fire', 'spike'];
// BOSS_PART_END s0.MMX_VK.1

// Nguồn: index.html:30385 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MMX_VK_TEN.1 READ_ONLY
const MMX_VK_TEN = { cshot: 'C-SHOT', goo: 'GOO SHAVER', tri: 'TRI-THUNDER', flaser: 'F-LASER',
                     dark: 'DARK HOLD', wing: 'WING SPIRAL', fire: 'GROUND FIRE', spike: 'SPIKE BALL' };
// BOSS_PART_END s0.MMX_VK_TEN.1

// Nguồn: index.html:30388 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MMX_MAU.1 EDITABLE
const MMX_MAU = { thuong: ['#1E5FD0', '#4FC3F7'], cshot: ['#E0A800', '#FFF176'], goo: ['#26A6C9', '#E0F7FA'],
                  tri: ['#7CB342', '#FFF59D'], flaser: ['#E8641E', '#FFCCBC'], dark: ['#6A1B9A', '#CE93D8'],
                  wing: ['#2E9D48', '#C8E6C9'], fire: ['#D32F2F', '#FFAB91'], spike: ['#C2185B', '#F48FB1'] };
// BOSS_PART_END s0.MMX_MAU.1

// Nguồn: index.html:30391 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MMX_GIAP_TEN.1 READ_ONLY
const MMX_GIAP_TEN = { thuong: 'MEGA MAN X', fourth: 'X — FOURTH ARMOR', falcon: 'X — FALCON ARMOR',
                       gaea: 'X — GAEA ARMOR', ultimate: 'X — ULTIMATE ARMOR' };
// BOSS_PART_END s0.MMX_GIAP_TEN.1

// Nguồn: index.html:30393 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MMX_GIAP_MAU.1 READ_ONLY
const MMX_GIAP_MAU = { thuong: '#42A5F5', fourth: '#EF5350', falcon: '#E0E0E0', gaea: '#FF8F00', ultimate: '#B388FF' };
// BOSS_PART_END s0.MMX_GIAP_MAU.1

// Nguồn: index.html:30394 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MMX_SAN.1 EDITABLE
const MMX_SAN = 320;
// BOSS_PART_END s0.MMX_SAN.1

// Nguồn: index.html:30396 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s0.MegaManXBoss.1 EDITABLE
class MegaManXBoss {
    san(){
        if(!this.laChoi||mapTheme!=='ocean')return MMX_SAN;
        let floor=bienDayHT(),feet=this.y+this.h;
        for(const pf of platforms){if(pf.solid===false||!Number.isFinite(pf.top)||pf.top<feet-4)continue;if(this.x+this.w>pf.x&&this.x<pf.x+pf.w)floor=Math.min(floor,pf.top);}
        return floor;
    }

    constructor(level){
        this.name = "MEGA MAN X";
        this.hp = MMX_HP; this.maxHp = MMX_HP; this.w = 44; this.h = 72;
        this.x = canvas.width - 180; this.baseY = this.san() - this.h; this.y = -140;
        this.facingLeft = true; this.vx = 0; this.vy = 0; this.grounded = false;
        this.invulnAll = true; this.burnTimer = 0;
        // ----- tang di chuyen -----
        this.mS = 'dung'; this.mT = 0; this.mCho = 0; this.luotCd = 0; this.nhayCd = 0;
        this.khoaDi = 0; this.dac = null;            // don di chuyen dac biet: tuong / nova / bay / hover / luot
        // ----- tang tan cong -----
        this.aS = 'intro'; this.aT = 0; this.aNghi = 0; this.cd = {};
        this.sacLv = 0; this.mau = 'thuong'; this.mauT = 0; this.vkCu = null;
        this.tayBan = 0;                               // khung con lai gio nong sung ra truoc
        // ----- giap -----
        this.giap = 'thuong'; this.giapT = 0; this.giapCd = 0; this.giapCu = null; this.bien = null;
        this.gigaDa = false; this._hpTruoc = MMX_HP;
        // ----- vat the -----
        this.dan = []; this.cot = []; this.tia = []; this.roi = []; this.hon = [];
        this.khien = null; this.toi = null; this.cau = null;
        this.toc = 0; this.chan = 0; this.hit = new Set(); this.vet = [];
        this.state = 'intro';
    }
    cx(){ return this.x + this.w / 2; }
    cy(){ return this.y + this.h / 2; }
    dir(){ return this.facingLeft ? -1 : 1; }
    face(){
        let tx = this.laChoi ? this.tamX() : (dino.x + dino.w / 2);
        this.facingLeft = tx < this.cx();
    }
    gap(){ return Math.abs((dino.x + dino.w / 2) - this.cx()); }
    khe(){ return this.x > dino.x ? this.x - (dino.x + dino.w) : dino.x - (this.x + this.w); }
    hurtP(n){
        if (!dino.isShielding()) dino.takeDamage(n || 1);
        else visualEffects.push(new Effect(dino.x + (dino.isFacingLeft ? dino.w : 0), dino.y, 'parry'));
    }
    cham(o, box){
        if (o.hit) return false;
        if (this.laChoi){
            let ds = this.laChoi ? beamClashTargets() : [];
            if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
            if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
            // XUYEN: tia, cot set, khoi bang, ban sao, xoay loc / lua / gai, orb plasma, vien co o.xuyen -> trung MOI muc tieu (khong bi xoa khi trung)
            // Vien thuong: trung ke dau tien roi bien mat. REH = nhip trung lai (khung) cho vat the ton tai lau.
            const MULTI = { goo: 1, wing: 1, wingS: 1, xoaylua: 1, cyclone: 1, orb: 1, gai: 1, gaiS: 1 };
            const REH = { orb: 20, wingS: 16, xoaylua: 16, cyclone: 16, gai: 20, gaiS: 16 };
            let multi = !!(o.xuyen || !o.k || MULTI[o.k]);
            let rh = o.rehit || (o.k && REH[o.k]) || 0;
            let hs = o._hs || (o._hs = new Map());
            for (let t of ds){
                if (!t || t.dying || t.invulnAll || !(t.hp > 0)) continue;
                if (!checkAABB(t, box)) continue;
                if (multi){
                    let last = hs.get(t);
                    if (last !== undefined && !(rh && frames - last >= rh)) continue;
                    hs.set(t, frames);
                } else o.hit = 1;
                let dmg = (typeof xDmgDan === 'function') ? xDmgDan(o) : 2;
                if (typeof dealDamage === 'function') dealDamage(t, dmg, 'flat'); else t.hp -= dmg;
                if (!t._beamClashPoint && typeof xCong === 'function') xCong(1);
                if (!multi) return true;
            }
            return false;
        }
        if (checkAABB(dino, box)){
            o.hit = 1;
            if (o.k && typeof voidBat === 'function' && voidBat() && dino.isShielding() && typeof voidPhanRa === 'function'){
                voidPhanRa(box.x + box.w / 2, box.y + box.h / 2, o, function(bb){ this.veDan(bb); }.bind(this));
                o._voidXoa = 1;
            } else this.hurtP(1);
            return true;
        }
        return false;
    }
    tile(){ return this.hp / this.maxHp; }
    /* @@HE-MMX-AC — Hans: "giup Khi Cong Phao co the khac che dan cua X thay vi bi no bo qua. Dan nao tinh la
       Piercing thi khong bi bat ra nhung dan nao khong co thi co the bi day lui. Pha dan cung nen co the pha cac
       don nao duoc tinh la dan." Cap 2: pha moi thu la DAN. Cap 3: dan thuong bi THOI NGUOC; dan XUYEN chi bi pha.
       KHONG phai dan (khong dung duoc): tia Falcon / F-Laser nap, cot set / tia Giga, qua cau Gaea Giga, Dark Hold,
       khien C-Shot, Nova Strike. */
    acNgat(){
        if (this.aS === 'khong' || this.bien || this.state === 'intro') return false;
        if (this.aS === 'nova' || this.aS === 'falconGiga' || this.aS === 'gaeaGiga') return false;   // giga / nova: sieu giap
        this.aS = 'khong'; this.aT = 0; this.sacLv = 0; this.khoaDi = 0; this.aNghi = 30;
        if (this.dac && this.dac.ten !== 'nova'){ this.dac = null; }
        this.invulnAll = false; this.tia = this.tia.filter(r => r.t > r.bao);   // tia chua ban thi huy
        return true;
    }
    acDan(B, trong){
        const XUYEN = { sac3: 1, plasma: 1, orb: 1, wing: 1, wingS: 1, xoaylua: 1, cyclone: 1, gaiS: 1, gaea: 1 };
        const CAO = { wingS: 98, xoaylua: 66, cyclone: 58 };
        let thoi = (B.cap || 1) >= 3 && typeof cusAcThoiVat === 'function';
        for (let i = this.dan.length - 1; i >= 0; i--){
            let b = this.dan[i];
            let x = b.x, y = CAO[b.k] ? this.san() - CAO[b.k] / 2 : b.k === 'goo' ? this.san() - 9 : b.y;
            if (!trong(x, y)) continue;
            this.dan.splice(i, 1);
            if (thoi && !XUYEN[b.k]) cusAcThoiVat(x, y, Math.max(7, b.r || 8), 2, B.dir, (xx, yy) => this.veDan(Object.assign({}, b, { x: xx, y: yy, vx: B.dir * 9, vy: 0 })));
            else visualEffects.push(new Effect(x, y, 'explosion', true, 14));
        }
        for (let i = this.roi.length - 1; i >= 0; i--){          // khoi bang Frost Tower: XUYEN -> pha
            let q = this.roi[i]; if (q.t < q.cho || !trong(q.x, q.y + q.h / 2)) continue;
            this.roi.splice(i, 1); visualEffects.push(new Effect(q.x, q.y + q.h / 2, 'parry', false));
        }
        for (let i = this.hon.length - 1; i >= 0; i--){          // ban sao Soul Body: XUYEN -> pha
            let h = this.hon[i]; if (!trong(h.x + this.w / 2, h.y + this.h / 2)) continue;
            this.hon.splice(i, 1); visualEffects.push(new Effect(h.x + this.w / 2, h.y + this.h / 2, 'explosion', true, 20));
        }
    }
    nhip(){ return (this.giap === 'ultimate' ? 0.62 : this.giap === 'thuong' ? 0.9 : 0.8) + this.tile() * 0.25; }
    nongSung(){ let d = this.dir(); return { x: this.cx() + d * 26, y: this.y + this.h * 0.42 }; }
    tieng(f, dai, kieu){ if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(f, dai || 0.08, kieu || 'square', 0.12, f * 1.6); }
    chu(s, mau){ floatingTexts.push(new FloatingText(this.x - 30, this.y - 24, s)); }
    tren(){ return !dino.grounded && dino.y + dino.h < this.san() - 40; }

    // ======================= BAN =======================
    ban(k, vx, vy, r, them){
        let p = this.nongSung();
        let o = Object.assign({ k: k, x: p.x, y: p.y, vx: vx, vy: vy || 0, r: r || 6, t: 0, hit: 0 }, them || {});
        this.dan.push(o); this.tayBan = 16;
        return o;
    }
    tamX(){ return this.laChoi ? this.mucTieu().x : dino.x + dino.w / 2; }
    tamY(){ return this.laChoi ? this.mucTieu().y : dino.y + dino.h / 2; }
    mucTieu(){
        let best = null, bd = 1e9, ds = this.laChoi ? beamClashTargets() : [];
        if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
        if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
        for (let o of ds){
            if (!o || o.dying || o.laChoi || o.invulnAll || !(o.hp > 0)) continue;
            let ox = o.x + (o.w || 20) / 2;
            let d = Math.hypot(ox - this.cx(), (o.y + (o.h || 20) / 2) - this.cy());
            if (this.laChoi){
                // BAN NGUOI CHOI: bo ke chua vao man hinh; ke o phia sau lung bi 'phat' khoang cach de uu tien ke phia truoc mat
                if (ox < -20 || ox > canvas.width + 20) continue;
                if (this.facingLeft ? ox > this.cx() : ox < this.cx()) d *= 2.2;
            }
            if (d < bd){ bd = d; best = o; }
        }
        if (!best) return { x: this.cx() + this.dir() * 240, y: this.cy() };
        return { x: best.x + (best.w || 20) / 2, y: best.y + (best.h || 20) / 2 };
    }
    ngamY(v){ let p = this.nongSung(); let ty = this.tamY() - p.y, tx = Math.max(60, Math.abs(this.tamX() - p.x));
              return Math.max(-v * 0.7, Math.min(v * 0.7, ty / tx * v)); }
    // nguoi choi ngam du 100%, boss van ngam mot phan (f) de nguoi choi con ne duoc
    aim(v, f){ return this.ngamY(v) * (this.laChoi ? 1 : f); }
    // van toc (toc do sp) huong ve muc tieu, lech them `off` rad; ep goc trong +-57 do de khong ban thang len / xuong
    vec(sp, off){
        let p = this.nongSung(), t = this.mucTieu(), d = this.dir();
        let dx = Math.max(40, Math.abs(t.x - p.x)), dy = t.y - p.y;
        let a = Math.max(-1.0, Math.min(1.0, Math.atan2(dy, dx))) + (off || 0);
        return { vx: d * Math.cos(a) * sp, vy: Math.sin(a) * sp };
    }
    // n toa do x de roi cot / khoi bang: dung vi tri ke dich that (gan nhat truoc), thieu thi rai quanh muc tieu
    xsMt(n){
        let cx = this.cx(), ds = [], xs = [], all = this.laChoi ? beamClashTargets() : [];
        if (typeof bosses !== 'undefined') for (let b of bosses) all.push(b);
        if (typeof enemies !== 'undefined') for (let e of enemies) all.push(e);
        for (let o of all){
            if (!o || o.dying || o.laChoi || o.invulnAll || !(o.hp > 0)) continue;
            let x = o.x + (o.w || 20) / 2; if (x < 10 || x > canvas.width - 10) continue;
            ds.push({ x: x, d: Math.abs(x - cx) });
        }
        ds.sort((a, b) => a.d - b.d);
        for (let o of ds){ if (xs.every(q => Math.abs(q - o.x) >= 46)) xs.push(o.x); if (xs.length >= n) break; }
        let base = xs.length ? xs[0] : this.mucTieu().x;
        for (let k = 1; xs.length < n && k < 9; k++) for (const s of [1, -1]){
            if (xs.length >= n) break;
            let x = Math.max(30, Math.min(canvas.width - 30, base + s * k * 70));
            if (xs.every(q => Math.abs(q - x) >= 46)) xs.push(x);
        }
        return xs;
    }

    // ======================= DOI GIAP =======================
    batBien(g){
        this.bien = { g: g, t: 0, dai: g === 'ultimate' ? 84 : 50 };
        this.aS = 'khong'; this.aT = 0; this.sacLv = 0; this.dac = null; this.khien = null;
        this.invulnAll = true; this.vx = 0; this.khoaDi = 0;
        this.tieng(g === 'ultimate' ? 220 : 440, 0.3, 'sawtooth');
    }
    tickBien(){
        let B = this.bien; B.t++;
        this.vx = 0; this.vy = Math.min(this.vy, 2);
        if (B.t === Math.round(B.dai * 0.55)){
            this.giapCu = this.giap; this.giap = B.g;
            this.mau = 'thuong';
            if (B.g === 'thuong') this.chu('X');
            else this.chu(MMX_GIAP_TEN[B.g].replace('X — ', '') + '!');
            shakeTimer = Math.max(shakeTimer, B.g === 'ultimate' ? 30 : 14);
            for (let k = 0; k < 6; k++) visualEffects.push(new Effect(this.cx() + (Math.random() - 0.5) * 60, this.cy() + (Math.random() - 0.5) * 70, 'parry', false));
        }
        if (B.t >= B.dai){
            this.bien = null; this.invulnAll = false;
            if (this.laChoi){
                this.aNghi = 8;
                if (this.giap !== 'thuong'){ this.giapT = 0; this.gigaDa = false; }
                return;
            }
            if (this.giap === 'thuong'){ this.giapCd = Math.round(420 + Math.random() * 180); }
            else if (this.giap !== 'ultimate'){ this.giapT = 13 * 60; this.gigaDa = false; }
            else this.gigaDa = false;
            this.aNghi = 14;
        }
    }
    tickGiap(){
        if (this.bien) return;
        let tl = this.tile();
        if (tl <= 0.4 && this.giap !== 'ultimate'){ this.batBien('ultimate'); return; }
        if (this.giap === 'ultimate') return;
        if (this.giapCd > 0) this.giapCd--;
        if (this.giap === 'thuong'){
            if (tl <= 0.8 && this.giapCd <= 0 && this.aS === 'khong' && !this.dac && this.grounded){
                let ds = ['fourth', 'falcon', 'gaea'].filter(g => g !== this.giapCu);
                this.batBien(ds[Math.floor(Math.random() * ds.length)]);
            }
            return;
        }
        if (--this.giapT <= 0 && this.aS === 'khong' && !this.dac && this.grounded) this.batBien('thuong');
    }

    // ======================= TANG DI CHUYEN =======================
    dai(){
        let g = this.giap;
        if (g === 'gaea') return [80, 185];     // tam ban gan hon (190) nen boss Gaea dung gan hon
        if (g === 'falcon') return [210, 400];
        if (g === 'ultimate') return [150, 330];
        return [170, 340];
    }
    tocDi(){ return this.giap === 'gaea' ? 1.5 : this.giap === 'ultimate' ? 3.1 : 2.6; }
    tickDi(){
        this.mT++;
        if (this.luotCd > 0) this.luotCd--;
        if (this.nhayCd > 0) this.nhayCd--;
        if (this.dac){ this.tickDac(); return; }
        if (this.khoaDi > 0){ this.khoaDi--; this.vx *= 0.6; this.mS = 'dung'; return; }
        let k = this.khe(), [GAN, XA] = this.dai(), nang = this.giap === 'gaea';
        if (--this.mCho <= 0){
            let r = Math.random();
            if (k < GAN - 50 && this.grounded && this.nhayCd <= 0 && !nang && r < 0.55){
                // qua sat: NHAY QUA dau nguoi choi (kieu X) — hoac luot ra
                this.mS = 'nhay'; this.vy = -13.2; this.grounded = false; this.nhayCd = 80; this.mCho = 40;
                this.vx = -this.dir() * 3.5 * (r < 0.3 ? -1.5 : 1);
            } else if (k < GAN && this.luotCd <= 0 && this.grounded){
                this.mS = 'luot'; this.mT = 0; this.mCho = 20; this.luotCd = nang ? 150 : 90; this.luotV = -this.dir();
            } else if (k > XA && this.luotCd <= 0 && this.grounded && !nang){
                this.mS = 'luot'; this.mT = 0; this.mCho = 20; this.luotCd = 110; this.luotV = this.dir();
            } else if (k > XA){ this.mS = 'toi'; this.mCho = 24 + r * 20; }
            else if (k < GAN){ this.mS = 'lui'; this.mCho = 20 + r * 16; }
            else { this.mS = r < 0.55 ? 'vong' : 'dung'; this.mCho = 20 + r * 30; }
        }
        let v = this.tocDi();
        if (this.mS === 'toi') this.vx = this.dir() * v;
        else if (this.mS === 'lui') this.vx = -this.dir() * v * 1.05;
        else if (this.mS === 'vong') this.vx = Math.sin(this.toc * 0.08) * v * 0.7;
        else if (this.mS === 'luot'){ this.vx = this.luotV * (nang ? 6 : 9.5); if (this.mT > 18) this.mS = 'dung'; }
        else if (this.mS === 'nhay'){ if (this.grounded) this.mS = 'dung'; }
        else this.vx *= 0.7;
        // bat tuong man hinh
        if ((this.x < 12 && this.vx < 0) || (this.x > canvas.width - this.w - 12 && this.vx > 0)){ this.vx = 0; if (this.mS === 'lui') this.mS = 'dung'; }
        this.chan += Math.abs(this.vx) * 0.16;
    }
    batDac(ten, them){ this.dac = Object.assign({ ten: ten, t: 0 }, them || {}); }
    tickDac(){
        let D = this.dac; D.t++;
        if (D.ten === 'tuong'){
            // DA TUONG: luot toi mep man gan nhat, bam tuong leo len, da ra va ban cheo xuong
            let trai = D.ben < 0, mep = trai ? 8 : canvas.width - this.w - 8;
            if (D.pha === 0){
                this.vx = (mep - this.x) > 0 ? 9 : -9;
                if (Math.abs(mep - this.x) < 12){ this.x = mep; D.pha = 1; D.t = 0; this.vy = -12; this.grounded = false; }
                if (D.t > 90){ this.dac = null; }
            } else if (D.pha === 1){
                this.vx = 0; this.x = mep; this.facingLeft = !trai;
                if (this.vy > 1.2) this.vy = 1.2;                         // truot tuong
                if (D.t === 14 || D.t === 30){ this.vy = -11; this.tieng(700, 0.04); }   // da tuong leo tiep
                if (D.t >= 42){ D.pha = 2; D.t = 0; this.vy = -8; this.vx = (trai ? 1 : -1) * 6; this.face(); }
            } else {
                if (D.t === 6){
                    this.face();
                    let p=this.nongSung();
                let tx = this.tamX() - p.x, ty = this.tamY() - p.y, l = Math.hypot(tx, ty) || 1;
                    this.ban('sac3', tx / l * 9, ty / l * 9, 17); this.tieng(300, 0.18, 'sawtooth');
                    this.sacLv = 0;
                }
                if (this.grounded || D.t > 70){ this.dac = null; this.vx = 0; }
            }
            this.chan += 0.2;
            return;
        }
        if (D.ten === 'nova'){
            // NOVA STRIKE: thu minh roi lao thanh sao choi 7 mau, bat tu, xuyen qua cho nguoi choi
            if (D.t < 20){ this.vx = 0; this.vy = Math.min(this.vy, 0.5); this.invulnAll = true; return; }
            if (D.t === 20){
                this.face();
                let tx = this.tamX() - this.cx(), ty = this.tamY() - this.cy(), l = Math.hypot(tx, ty) || 1;
                D.vx = tx / l * 17; D.vy = Math.max(-6, Math.min(8, ty / l * 17));
                this.tieng(180, 0.4, 'sawtooth'); shakeTimer = Math.max(shakeTimer, 12);
            }
            if (D.t < 52){
                this.vx = D.vx; this.vy = D.vy; this.invulnAll = true;
                if (this.laChoi){ D.rehit = 8; if (D.t % 8 === 0) D.hit = 0; }
                this.vet.push({ x: this.x, y: this.y, t: 14 });
                this.cham(D, { x: this.x - 10, y: this.y - 6, w: this.w + 20, h: this.h + 12 });
                if ((this.x <= 8 && this.vx < 0) || (this.x >= canvas.width - this.w - 8 && this.vx > 0)) D.t = 52;
                return;
            }
            this.invulnAll = false; this.vx *= 0.5; this.dac = null; this.aNghi = 18;
            return;
        }
        if (D.ten === 'bay'){
            // FALCON: bay len cao sau lung, roi LAO CHEO xuyen qua cho nguoi choi (bat tu luc lao)
            if (D.pha === 0){
                this.vy = -7; this.vx = -this.dir() * 3;
                if (this.y < 70 || D.t > 40){ D.pha = 1; D.t = 0; this.vy = 0; }
                return;
            }
            if (D.pha === 1){
                this.vx = 0; this.vy = 0; this.face();
                if (D.t === 18){
                    let tx = this.tamX() - this.cx(), ty = this.tamY() - this.cy(), l = Math.hypot(tx, ty) || 1;
                    D.vx = tx / l * 15; D.vy = ty / l * 15; D.pha = 2; D.t = 0; this.tieng(520, 0.3, 'triangle');
                }
                return;
            }
            this.vx = D.vx; this.vy = D.vy; this.invulnAll = true;
            this.vet.push({ x: this.x, y: this.y, t: 12, trang: 1 });
            this.cham(D, { x: this.x - 8, y: this.y, w: this.w + 16, h: this.h });
            if (this.y >= this.baseY - 2 || D.t > 40 || this.x <= 8 || this.x >= canvas.width - this.w - 8){
                this.invulnAll = false; this.dac = null; this.vy = Math.max(this.vy, 0); this.vx *= 0.3; this.aNghi = 16;
            }
            return;
        }
        if (D.ten === 'hover'){
            // BAY LO LUNG (Fourth / Ultimate): nhay len, dung giua khong ban xien xuong
            if (D.pha === 0){ if (D.t === 1){ this.vy = -12.5; this.grounded = false; } if (this.vy >= 0){ D.pha = 1; D.t = 0; } return; }
            this.vy = 0; this.vx = Math.sin(D.t * 0.06) * 1.2; this.face();
            if (D.t % 12 === 6 && D.t < 72){
                let p = this.nongSung(), tx = this.tamX() - p.x, ty = this.tamY() - p.y, l = Math.hypot(tx, ty) || 1;
                this.ban('lemon', tx / l * 9.5, ty / l * 9.5, 6); this.tieng(1200, 0.03);
            }
            if (D.t > 84){ this.dac = null; this.vy = 1; }
            return;
        }
        this.dac = null;
    }

    // ======================= TANG TAN CONG =======================
    chon(){
        let g = this.giap, k = this.khe(), tl = this.tile(), ds = [];
        const them = (t, w, dk) => { if (dk !== false && !(this.cd[t] > 0)) ds.push([t, w]); };
        if (g === 'thuong'){
            them('lemon', 26); them('sac', 22); them('luotban', 12, k < 260);
            them('tuong', 10, k > 120); them('vk', 24);
            them('vkS', 12, tl <= 0.8);
        } else if (g === 'fourth'){
            them('plasma', 22); them('stock', 16); them('hover', 14); them('lemon', 12); them('vkS', 20);
        } else if (g === 'falcon'){
            them('falconBan', 24); them('bay', 20); them('falconGiga', 16, !this.gigaDa); them('lemon', 12); them('vk', 20);
        } else if (g === 'gaea'){
            them('gaeaBan', 34); them('gaeaGiga', 20, !this.gigaDa); them('lemon', 18); them('luotban', 8, k < 200);
        } else {
            them('nova', 20); them('plasma', 16); them('vkS', 22); them('cyclone', 10); them('soul', 10);
            them('frost', 10); them('lemon', 8); them('hover', 8);
        }
        if (!ds.length) return null;
        let tong = 0; for (const e of ds) tong += e[1];
        let r = Math.random() * tong;
        for (const e of ds){ r -= e[1]; if (r <= 0) return e[0]; }
        return ds[0][0];
    }
    chonVk(){
        let ds = MMX_VK.filter(v => v !== this.vkCu);
        if (this.giap === 'falcon') ds = ds.filter(v => v !== 'dark');
        let v = ds[Math.floor(Math.random() * ds.length)];
        this.vkCu = v; return v;
    }
    batDon(t){
        this.aS = t; this.aT = 0; this.hit.clear();
        if (this.mau !== 'thuong' && t !== 'vk' && t !== 'vkS'){ this.mau = 'thuong'; this.mauT = 0; }
        if (t === 'vk' || t === 'vkS'){
            if (!(this.laChoi && this.vk)) this.vk = this.chonVk();
            this.mau = this.vk; this.mauT = 0;
            if (!this.laChoi) this.chu(MMX_VK_TEN[this.vk] + (t === 'vkS' ? ' ★' : ''));
        }
    }
    hetDon(cd){
        let ten = this.aS;
        this.cd[ten] = Math.round(cd * this.nhip());
        this.aS = 'khong'; this.aT = 0; this.sacLv = 0;
        this.aNghi = Math.round((this.giap === 'ultimate' ? BOSS_NGHI.xUlt : this.giap === 'thuong' ? BOSS_NGHI.x : BOSS_NGHI.xGiap) * this.nhip());
        if (this.laChoi){
            this.aNghi = 6;
            if (this.giap === 'ultimate' && ten === 'nova'){ this.cd.nova = 12; this.aNghi = 4; }
        }
        if (this.mau !== 'thuong') this.mauT = 36;
    }
    tickDon(){
        for (const t in this.cd) if (this.cd[t] > 0) this.cd[t]--;
        if (this.aS === 'khong'){
            if (this.laChoi) return;
            if (this.aNghi > 0){ this.aNghi--; return; }
            if (this.dac || this.bien) return;
            let t = this.chon(); if (t) this.batDon(t);
            return;
        }
        this.aT++;
        let A = this.aS, T = this.aT, d = this.dir();
        const CD = { lemon: 80, sac: 170, luotban: 170, tuong: 420, vk: 150, vkS: 260, plasma: 190, stock: 280,
                     hover: 300, falconBan: 170, bay: 240, falconGiga: 600, gaeaBan: 90, gaeaGiga: 600,
                     nova: 230, cyclone: 360, soul: 360, frost: 380 };
        if (A === 'lemon'){
            // X-BUSTER: ba vien chanh lien tay, ban duoc khi dang chay / nhay
            if (this.laChoi ? (T === 3 || T === 9 || T === 15) : (T === 4 || T === 14 || T === 24)){
                this.face();
                if (this.laChoi){ let q = this.vec(11, 0); this.ban('lemon', q.vx, q.vy, 6); }
                else this.ban('lemon', this.dir() * 9.5, this.ngamY(9.5) * 0.5, 6);
                this.tieng(1300, 0.03);
            }
            if (T > (this.laChoi ? 22 : 32)) this.hetDon(CD.lemon);
        } else if (A === 'sac'){
            // NAP BUSTER 3 nac, vua nap vua di
            this.sacLv = T < 20 ? 1 : T < 44 ? 2 : 3;
            if (T === 44) this.tieng(900, 0.12, 'triangle');
            if (T === 62){
                this.face(); this.khoaDi = 8;
                this.ban('sac3', this.dir() * 8.5, this.ngamY(8.5) * 0.6, 18);
                this.tieng(260, 0.22, 'sawtooth'); shakeTimer = Math.max(shakeTimer, 6); this.sacLv = 0;
            }
            if (T > 74) this.hetDon(CD.sac);
        } else if (A === 'luotban'){
            if (T === 1 && this.grounded){ this.face(); this.mS = 'luot'; this.mT = 0; this.mCho = 22; this.luotV = this.dir(); this.luotCd = 60; }
            if (T === 8 || T === 18) { this.ban('lemon', this.dir() * 11, 0, 6); this.tieng(1300, 0.03); }
            if (T > 26) this.hetDon(CD.luotban);
        } else if (A === 'tuong'){
            if (T === 1){ this.batDac('tuong', { pha: 0, ben: this.cx() < canvas.width / 2 ? -1 : 1 }); this.sacLv = 3; }
            if (!this.dac || T > 200) this.hetDon(CD.tuong);
        } else if (A === 'vk' || A === 'vkS'){
            if (this.tickVk(this.vk, A === 'vkS', T)) this.hetDon(A === 'vkS' ? CD.vkS : CD.vk);
        } else if (A === 'plasma'){
            // PLASMA SHOT: nap roi ban vien to, doc duong de lai cau plasma lo lung
            this.sacLv = T < 20 ? 2 : 3;
            if (T === 36){ this.face(); this.khoaDi = 10; if (this.laChoi){ let q = this.vec(9, 0); this.ban('plasma', q.vx, q.vy, 16, { rai: 0, dmg: 8 }); } else this.ban('plasma', this.dir() * 7.5, this.ngamY(7.5) * 0.4, 16, { rai: 0 }); this.tieng(200, 0.3, 'sawtooth'); shakeTimer = Math.max(shakeTimer, 8); this.sacLv = 0; }
            if (T > 50) this.hetDon(CD.plasma);
        } else if (A === 'stock'){
            // STOCK CHARGE: nap mot lan, tha 4 phat nap lien, phat cuoi ngam
            this.sacLv = T < 40 ? 2 : 3;
            if (T >= 40 && T <= 76 && (T - 40) % 12 === 0){
                this.face(); this.khoaDi = 6;
                let cuoi = T === 76;
                if (this.laChoi){ let q = this.vec(10, (T - 58) * 0.008); this.ban('stock', q.vx, q.vy, 11, { dmg: 16 }); }
                else this.ban('stock', this.dir() * 9, cuoi ? this.ngamY(9) : (T - 58) * 0.06, 11);
                this.tieng(500 + (T - 40) * 8, 0.08, 'square');
            }
            if (T > 86){ this.sacLv = 0; this.hetDon(CD.stock); }
        } else if (A === 'hover'){
            if (T === 1 && this.grounded) this.batDac('hover', { pha: 0 });
            if (!this.dac || T > 160) this.hetDon(CD.hover);
        } else if (A === 'falconBan'){
            // FALCON BUSTER: tia manh XUYEN ca man, ngam theo do cao nguoi choi luc bat dau
            if (T === 1){ this.face(); this.sacLv = 2; }
            if (T === 8){ let p = this.nongSung(); this.tia.push({ x0: p.x, y: this.tamY(), h: this.laChoi ? 18 : 12, dir: this.dir(), bao: this.laChoi ? 14 : 26, lua: 12, t: 0, loai: 'falcon', hit: 0, rehit: this.laChoi ? 4 : 0, dmg: this.laChoi ? 9 : undefined }); this.khoaDi = 40; }
            if (T === 34){ this.sacLv = 0; this.tieng(1500, 0.2, 'sawtooth'); shakeTimer = Math.max(shakeTimer, 6); }
            if (T > 52) this.hetDon(CD.falconBan);
        } else if (A === 'bay'){
            if (T === 1) this.batDac('bay', { pha: 0 });
            if (!this.dac || T > 140) this.hetDon(CD.bay);
        } else if (A === 'falconGiga'){
            // GIGA ATTACK FALCON: bay len giua troi, mua tia len xuong khap man theo 3 dot co khe ho
            if (T === 1){ this.gigaDa = true; this.khoaDi = 999; this.chu('GIGA ATTACK!'); this.tieng(300, 0.5, 'sawtooth'); }
            this.vx = (canvas.width / 2 - this.cx()) * 0.08; this.vy = (60 - this.y) * 0.1; this.invulnAll = true;
            for (let s = 0; s < 3; s++) if (T === 24 + s * 34){
                let ke = s % 2, n = 9;
                if (this.laChoi) this.xsMt(7).forEach((x, i) => this.cot.push({ x: x, w: 34, bao: 22 + (i % 3) * 4, lua: 12, t: 0, loai: 'falcon', hit: 0, dmg: 16 }));
                else for (let i = 0; i < n; i++) if ((i + ke) % 2 === 0 || (s === 2 && i % 3 === 1))
                    this.cot.push({ x: 40 + i * (canvas.width - 80) / (n - 1), w: 26, bao: 30, lua: 12, t: 0, loai: 'falcon', hit: 0 });
                this.tieng(900 + s * 200, 0.1, 'triangle');
            }
            if (T > 24 + 2 * 34 + 48){ this.invulnAll = false; this.khoaDi = 0; this.hetDon(CD.falconGiga); }
        } else if (A === 'gaeaBan'){
            // GAEA SHOT: phat nang tam NGAN (190px, truoc 290) nhung ra don NHANH (khung 14, truoc 30) — nuot dan nguoi choi tren duong di
            this.sacLv = T < 8 ? 2 : 3;
            if (T === 14){ this.face(); this.khoaDi = 8; if (this.laChoi){ let q = this.vec(10, 0); this.ban('gaea', q.vx, q.vy * 0.6, 24, { di: 0, xuyen: 1, dmg: 17 }); } else this.ban('gaea', this.dir() * 8.5, 0, 24, { di: 0 }); this.tieng(120, 0.3, 'sawtooth'); shakeTimer = Math.max(shakeTimer, 10); this.sacLv = 0; }
            if (T > 28) this.hetDon(CD.gaeaBan);
        } else if (A === 'gaeaGiga'){
            // GIGA ATTACK GAEA: qua cau nang luong khong lo hinh thanh truoc mat, phinh roi tien toi
            if (T === 1){ this.gigaDa = true; this.face(); this.chu('GIGA ATTACK!'); this.khoaDi = 110; this.tieng(90, 0.6, 'sawtooth');
                this.cau = { x: this.cx() + this.dir() * 70, y: this.san() - 64, r: 6, t: 0, dir: this.dir(), hit: 0 }; }
            if (T > 120) this.hetDon(CD.gaeaGiga);
        } else if (A === 'nova'){
            if (T === 1){ this.batDac('nova', {}); this.chu('NOVA STRIKE!'); }
            if (!this.dac || T > 120){ this.invulnAll = false; this.hetDon(CD.nova); }
        } else if (A === 'cyclone'){
            // DOUBLE CYCLONE: hai luong loc xoay ra hai ben doc mat san
            if (T === 1){ this.mau = 'wing'; this.sacLv = 3; this.khoaDi = 40; this.chu('DOUBLE CYCLONE'); }
            if (T === 30){ for (const dd of [-1, 1]) this.dan.push({ k: 'cyclone', x: this.cx(), y: this.san() - 58, vx: dd * 7, vy: 0, r: 30, t: 0, hit: 0 }); this.tieng(340, 0.35, 'sawtooth'); this.sacLv = 0; }
            if (T > 48) this.hetDon(CD.cyclone);
        } else if (A === 'soul'){
            // SOUL BODY: dung yen, ba ban sao lao thang ve phia nguoi choi o ba do cao
            if (T === 1){ this.mau = 'dark'; this.khoaDi = 80; this.chu('SOUL BODY'); this.face(); }
            for (let i = 0; i < 3; i++) if (T === 16 + i * 18){
                let cao = [0, 74, 0][i];
                this.hon.push({ x: this.x, y: this.baseY - cao, vx: this.dir() * 10, t: 0, hit: 0, dir: this.dir() });
                this.tieng(600 - i * 80, 0.12, 'triangle');
            }
            if (T > 80) this.hetDon(CD.soul);
        } else if (A === 'frost'){
            // FROST TOWER (nap): khoi bang roi tu tren xuong quanh nguoi choi
            if (T === 1){ this.mau = 'goo'; this.sacLv = 3; this.khoaDi = 30; this.chu('FROST TOWER'); }
            if (T === 24){
                this.sacLv = 0;
                let px = this.tamX();
                if (this.laChoi){
                    this.xsMt(5).forEach((x, i) => this.roi.push({ x: x, y: -60 - i * 26, vy: 0, w: 44, h: 46, cho: 18 + i * 8, t: 0, hit: 0, loai: 'bang' }));
                } else for (let i = -2; i <= 2; i++){
                    let x = Math.max(30, Math.min(canvas.width - 30, px + i * 92 + (Math.random() - 0.5) * 20));
                    this.roi.push({ x: x, y: -60 - Math.abs(i) * 40, vy: 0, w: 40, h: 46, cho: 26 + Math.abs(i) * 10, t: 0, hit: 0, loai: 'bang' });
                }
            }
            if (T > 60) this.hetDon(CD.frost);
        } else this.hetDon(60);
    }
    /* ================= VU KHI DOI MAU (8 vu khi X5) =================
       Tra ve true khi don xong. `nap` = ban NAP cua vu khi. */
    /* ================= 8 VU KHI — BAN NGUOI CHOI =================
       Khac ban boss: tha don som (khong cho 30 khung), ngam theo ke dich gan nhat PHIA TRUOC (vec), khong bay ngau nhien,
       tia / cot / xoay trung nhieu muc tieu, F-Laser duoi ke dich, cot Tri-Thunder roi dung cho ke dich dung. */
    tickVkP(v, nap, T){
        const B = nap ? 10 : 4;
        if (nap) this.sacLv = T < 6 ? 2 : 3;
        if (T < B) return false;
        if (T === B){ this.face(); this.sacLv = 0; }
        let d = this.dir();
        const sh = (k, sp, off, r, them) => { let q = this.vec(sp, off); return this.ban(k, q.vx, q.vy, r, them); };
        if (v === 'cshot'){
            if (!nap){
                for (const [i, off] of [[0, -0.12], [6, 0], [12, 0.12]]) if (T === B + i){ sh('trang', 9, off, 9, { cong: 0, hom: 0.07 }); this.tieng(1100, 0.04, 'triangle'); }
                return T > B + 24;
            }
            if (T === B){ this.khien = { t: 0, dai: 190, goc: 0 }; this.tieng(800, 0.2, 'triangle'); }
            for (const [i, off] of [[4, -0.22], [12, 0.22], [20, -0.1], [28, 0.1]]) if (T === B + i){ sh('trang', 9.5, off, 10, { cong: 0, hom: 0.08, dmg: 5 }); this.tieng(1100, 0.04, 'triangle'); }
            return T > B + 36;
        }
        if (v === 'goo'){
            if (!nap){
                if (T === B || T === B + 12 || T === B + 24){
                    let p = this.nongSung(); this.dan.push({ k: 'goo', x: p.x, y: this.san() - 9, vx: d * 8, vy: 0, r: 9, t: 0, hit: 0 });
                    this.tayBan = 14; this.tieng(700, 0.06, 'sine');
                }
                return T > B + 32;
            }
            if (T === B){
                let Dx = Math.max(90, Math.abs(this.mucTieu().x - this.cx()));
                for (const o of [-80, -50, -25, -8, 8, 25, 50, 80]){
                    let land = Math.max(60, Dx + o);
                    this.dan.push({ k: 'da', x: this.cx() + d * 16, y: this.y + 10, vx: d * land / 40, vy: -10, r: 13, t: 0, hit: 0, dmg: 5 });   // 40 khung bay -> roi dung quanh ke dich
                }
                this.tieng(500, 0.2, 'sine'); shakeTimer = Math.max(shakeTimer, 6);
            }
            return T > B + 24;
        }
        if (v === 'tri'){
            if (!nap){
                if (T === B){ for (const off of [-0.32, 0, 0.32]) sh('set', 8, off, 7); this.tieng(1600, 0.05, 'sawtooth'); }
                return T > B + 20;
            }
            if (T === B){
                this.xsMt(5).forEach((x, i) => this.cot.push({ x: x, w: 40, bao: 20 + i * 6, lua: 16, t: 0, loai: 'set', hit: 0, dmg: 18 }));
                this.tieng(200, 0.3, 'sawtooth');
            }
            return T > B + 30;
        }
        if (v === 'flaser'){
            if (!nap){
                if (T === B || T === B + 12){ let q = this.vec(8, T === B ? -0.45 : 0.45); this.ban('flaser', q.vx, q.vy, 7, { lai: 90, rot: 0.1 }); this.tieng(1800, 0.12, 'sine'); }
                return T > B + 26;
            }
            if (T === B){
                let p = this.nongSung(), t = this.mucTieu();
                this.tia.push({ x0: p.x, y: Math.max(24, Math.min(this.san() - 12, t.y)), h: 28, dir: d, bao: 14, lua: 70, t: 0, loai: 'flaser', hit: 0, rehit: 14, dmg: 9 });
                this.tieng(1800, 0.2, 'sine');
            }
            if (T === B + 14){ this.tieng(900, 0.6, 'sawtooth'); shakeTimer = Math.max(shakeTimer, 6); }
            return T > B + 86;
        }
        if (v === 'dark'){
            // vung toi dat len CHO KE DICH (toi da 300px truoc mat), dong bang 70 khung, ban chanh vao ke bi dong
            if (T === B){
                let t = this.mucTieu(), cx = this.cx();
                this.toi = { t: 0, R: nap ? 260 : 200, x: Math.max(cx - 300, Math.min(cx + 300, t.x)), y: Math.max(60, Math.min(this.san() - 20, t.y)), da: 0, fr: nap ? 100 : 70, life: nap ? 110 : 80 };
                this.tieng(160, 0.5, 'sine');
            }
            if (this.toi && this.toi.da && T > B + 36 && (T - B) % (nap ? 10 : 8) === 0 && T < B + (nap ? 96 : 76)){ this.face(); let q = this.vec(10.5, 0); this.ban('lemon', q.vx, q.vy, 6, { dmg: nap ? 6 : 3 }); }
            return T > B + (nap ? 100 : 80);
        }
        if (v === 'wing'){
            if (!nap){
                if (T === B || T === B + 14){ sh('wing', 7.5, 0, 20); this.tieng(900, 0.1, 'triangle'); }
                return T > B + 26;
            }
            if (T === B){ this.dan.push({ k: 'wingS', x: this.cx() + d * 40, y: this.san() - 98, vx: d * 6.5, vy: 0, r: 34, t: 0, hit: 0, ret: 62, dmg: 10 }); this.tieng(400, 0.4, 'sawtooth'); }
            return T > B + 26;
        }
        if (v === 'fire'){
            if (!nap){
                for (let i = 0; i < 4; i++) if (T === B + i * 4){ sh('lua', 8.5, (i - 1.5) * 0.05, 8, { gra: 0.04, life: 34, dmg: 1 }); this.tieng(300, 0.06, 'sawtooth'); }
                return T > B + 30;
            }
            if (T === B || T === B + 16){
                this.dan.push({ k: 'xoaylua', x: this.cx() + d * 20, y: this.san() - 66, vx: d * 6.5, vy: 0, r: 22, t: 0, hit: 0, dmg: 16 });
                this.tieng(220, 0.35, 'sawtooth'); shakeTimer = Math.max(shakeTimer, 6);
            }
            return T > B + 30;
        }
        if (v === 'spike'){
            if (!nap){
                if (T === B || T === B + 16){
                    let p = this.nongSung(); this.dan.push({ k: 'gai', x: p.x, y: this.san() - 16, vx: d * (T === B ? 6.5 : 7.5), vy: -3, r: 15, t: 0, hit: 0 });
                    this.tayBan = 14; this.tieng(500, 0.1, 'square');
                }
                return T > B + 24;
            }
            if (T === B){ this.ban('gaiS', d * 6.5, -2.5, 18, { life: 260, gra: 0.3, reb: 4.5, dmg: 7 }); this.tieng(380, 0.18, 'square'); }
            return T > B + 22;
        }
        return true;
    }
    tickVk(v, nap, T){
        if (this.laChoi) return this.tickVkP(v, nap, T);
        let d = this.dir();
        if (nap){ this.sacLv = T < 16 ? 2 : 3; }
        let B = nap ? 30 : 8;                               // khung tha don
        if (T < B) return false;
        if (T === B){ this.face(); d = this.dir(); this.sacLv = 0; }
        if (v === 'cshot'){
            if (!nap){
                if (T === B || T === B + 10) for (let i = 0; i < 2; i++){
                    let a = (Math.random() - 0.5) * 0.9;
                    this.ban('trang', d * 8 * Math.cos(a), 8 * Math.sin(a), 9, { cong: (Math.random() < 0.5 ? -1 : 1) * 0.12 });
                }
                if (T === B) this.tieng(1100, 0.05, 'triangle');
                return T > B + 20;
            }
            if (T === B){ this.khien = { t: 0, dai: 170, goc: 0 }; this.tieng(800, 0.2, 'triangle'); }
            return T > B + 30;
        }
        if (v === 'goo'){
            if (!nap){
                if (T === B || T === B + 26){ let p = this.nongSung(); this.dan.push({ k: 'goo', x: p.x, y: this.san() - 9, vx: d * 7, vy: 0, r: 9, t: 0, hit: 0 }); this.tayBan = 14; this.tieng(700, 0.06, 'sine'); }
                return T > B + 34;
            }
            if (T === B){
                for (const dd of [-1, 1]) for (let i = 0; i < 4; i++)
                    this.dan.push({ k: 'da', x: this.cx(), y: this.y + 10, vx: dd * (2.4 + i * 2.1), vy: -9 - i * 0.8, r: 13, t: 0, hit: 0 });
                this.tieng(500, 0.2, 'sine'); shakeTimer = Math.max(shakeTimer, 6);
            }
            return T > B + 24;
        }
        if (v === 'tri'){
            if (!nap){
                if (T === B){ for (const vy of [-7, 0, 7]) this.ban('set', d * 7, vy, 6); this.tieng(1600, 0.05, 'sawtooth'); }
                return T > B + 20;
            }
            if (T === B){
                let px = this.tamX();
                let xs = [px];
                for (let i = 0; i < 4; i++) xs.push(60 + Math.random() * (canvas.width - 120));
                xs.forEach((x, i) => this.cot.push({ x: x, w: 36, bao: 34 + i * 8, lua: 16, t: 0, loai: 'set', hit: 0 }));
                this.tieng(200, 0.3, 'sawtooth');
            }
            return T > B + 30;
        }
        if (v === 'flaser'){
            if (!nap){
                // tia dieu khien: X dung yen lai tia bam theo nguoi choi
                if (T === B){ this.khoaDi = 60; this.ban('flaser', d * 6.5, 0, 7, { lai: 60 }); this.tieng(1800, 0.2, 'sine'); }
                return T > B + 60;
            }
            if (T === B){ let p = this.nongSung(); this.khoaDi = 140; this.tia.push({ x0: p.x, y: p.y, h: 26, dir: d, bao: 30, lua: 100, t: 0, loai: 'flaser', hit: 0 }); }
            if (T === B + 30){ this.tieng(900, 0.8, 'sawtooth'); shakeTimer = Math.max(shakeTimer, 8); }
            return T > B + 132;
        }
        if (v === 'dark'){
            // DARK HOLD (sua cho boss): qua cau tim no rong co bao truoc, trong vong thi dong cung
            if (T === B){ this.toi = { t: 0, R: nap ? 260 : 200, x: this.cx(), y: this.cy(), da: 0 }; this.khoaDi = 50; this.tieng(160, 0.5, 'sine'); }
            if (this.toi && this.toi.da && T > B + 36 && T % 10 === 0 && T < B + 70){ this.face(); this.ban('lemon', this.dir() * 9.5, this.ngamY(9.5), 6); }
            return T > B + 76;
        }
        if (v === 'wing'){
            if (!nap){
                if (T === B || T === B + 16){
                    let chay = Math.abs(this.vx) > 1.2;
                    this.dan.push({ k: 'wing', x: this.cx() + d * 30, y: this.y + 10, vx: chay ? d * 3.2 : d * 0.6, vy: -5.5, r: 20, t: 0, hit: 0 });
                    this.tieng(900, 0.1, 'triangle');
                }
                return T > B + 24;
            }
            if (T === B){ this.dan.push({ k: 'wingS', x: this.cx() + d * 40, y: this.san() - 98, vx: d * 5.2, vy: 0, r: 34, t: 0, hit: 0 }); this.tieng(400, 0.4, 'sawtooth'); }
            return T > B + 24;
        }
        if (v === 'fire'){
            if (!nap){
                if (T === B){ this.ban('lua', d * 5.2, -6.5, 10); this.tieng(300, 0.12, 'sawtooth'); }
                return T > B + 30;
            }
            if (T === B){ for (const dd of [-1, 1]) this.dan.push({ k: 'xoaylua', x: this.cx(), y: this.san() - 66, vx: dd * 6, vy: 0, r: 22, t: 0, hit: 0 }); this.tieng(220, 0.35, 'sawtooth'); shakeTimer = Math.max(shakeTimer, 8); }
            return T > B + 24;
        }
        if (v === 'spike'){
            if (!nap){
                if (T === B){ let p = this.nongSung(); this.dan.push({ k: 'gai', x: p.x, y: this.san() - 16, vx: d * 5, vy: -3, r: 15, t: 0, hit: 0 }); this.tayBan = 14; this.tieng(500, 0.1, 'square'); }
                return T > B + 22;
            }
            if (T === B){ this.ban('gaiS', d * 6.2, -6, 18); this.tieng(380, 0.18, 'square'); }
            return T > B + 22;
        }
        return true;
    }

    // ======================= VAT THE =======================
    tickVatThe(){
        const W = canvas.width;
        // --- dan ---
        for (let i = this.dan.length - 1; i >= 0; i--){
            let b = this.dan[i]; b.t++;
            let xoa = false;
            if (b.k === 'lemon' || b.k === 'sac3' || b.k === 'stock'){
                b.x += b.vx; b.y += b.vy;
                if (this.cham(b, { x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 })) xoa = true;
            } else if (b.k === 'plasma'){
                b.x += b.vx; b.y += b.vy;
                if (++b.rai % 11 === 0) this.dan.push({ k: 'orb', x: b.x, y: b.y + (Math.random() - 0.5) * 16, vx: 0, vy: 0, r: 10, t: 0, hit: 0, dmg: this.laChoi ? 3 : undefined });
                if (this.cham(b, { x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 })){
                    xoa = true;
                    // nguoi choi: 3 orb sau no CO sat thuong (ban boss thi hit:1 de chi la hieu ung)
                    for (let k = 0; k < 3; k++) this.dan.push({ k: 'orb', x: b.x + (k - 1) * 20, y: b.y + (k % 2) * 12, vx: 0, vy: 0, r: 10, t: 0, hit: this.laChoi ? 0 : 1, dmg: this.laChoi ? 3 : undefined });
                }
            } else if (b.k === 'orb'){
                if (b.t > 8) this.cham(b, { x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 });
                if (b.t > 60) xoa = true;
            } else if (b.k === 'trang'){
                if (this.laChoi && b.hom){      // trang khuyet cua nguoi choi: uon nhe ve ke dich gan nhat
                    let t0 = this.mucTieu(), a = Math.atan2(b.vy, b.vx), m = Math.atan2(t0.y - b.y, t0.x - b.x);
                    let da = ((m - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI; a += Math.max(-b.hom, Math.min(b.hom, da));
                    let sp = Math.hypot(b.vx, b.vy); b.vx = Math.cos(a) * sp; b.vy = Math.sin(a) * sp;
                } else b.vy += (b.cong || 0);
                b.x += b.vx; b.y += b.vy;
                if (this.cham(b, { x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 })) xoa = true;
            } else if (b.k === 'goo'){
                b.x += b.vx;
                if (this.cham(b, { x: b.x - 16, y: this.san() - 16, w: 32, h: 16 })) xoa = true;
            } else if (b.k === 'da'){
                b.vy += 0.5; b.x += b.vx; b.y += b.vy;
                if (this.cham(b, { x: b.x - 13, y: b.y - 13, w: 26, h: 26 })) xoa = true;
                if (b.y > this.san() - 13){ xoa = true; visualEffects.push(new Effect(b.x, this.san() - 8, 'parry', false)); }
            } else if (b.k === 'set'){
                b.x += b.vx; b.y += b.vy;
                if (this.cham(b, { x: b.x - 7, y: b.y - 7, w: 14, h: 14 })) xoa = true;
                else if (b.y >= this.san() - 6){
                    xoa = true; let sy = this.san() - 8;
                    for (const dd of [-1, 1]) this.dan.push({ k: 'bi', x: b.x, y: sy, vx: dd * 5, vy: 0, r: 7, t: 0, hit: 0 });
                }
            } else if (b.k === 'bi'){
                b.x += b.vx;
                if (this.cham(b, { x: b.x - 8, y: b.y - 8, w: 16, h: 16 })) xoa = true;
                if (b.t > 70) xoa = true;
            } else if (b.k === 'flaser'){
                if (b.t < b.lai){
                    let T0 = this.laChoi ? this.mucTieu() : { x: dino.x + dino.w / 2, y: dino.y + dino.h / 2 };   // nguoi choi: duoi ke dich, KHONG duoi chinh minh
                    let a = Math.atan2(b.vy, b.vx), m = Math.atan2(T0.y - b.y, T0.x - b.x);
                    let da = ((m - a + Math.PI * 3) % (Math.PI * 2)) - Math.PI, rt = b.rot || 0.055;
                    a += Math.max(-rt, Math.min(rt, da));
                    let v = Math.hypot(b.vx, b.vy); b.vx = Math.cos(a) * v; b.vy = Math.sin(a) * v;
                }
                b.x += b.vx; b.y += b.vy;
                if (this.cham(b, { x: b.x - 7, y: b.y - 7, w: 14, h: 14 })) xoa = true;
            } else if (b.k === 'wing'){
                b.x += b.vx; b.y += b.vy;
                if (this.cham(b, { x: b.x - 18, y: b.y - 36, w: 36, h: 72 })) xoa = true;
                if (b.y < -220) xoa = true;
            } else if (b.k === 'wingS' || b.k === 'xoaylua' || b.k === 'cyclone'){
                b.x += b.vx;
                if (this.laChoi && b.ret){      // luoi Wing Spiral nap cua nguoi choi: di roi QUAY VE (trung 2 luot)
                    if (b.t === b.ret) b.vx = -b.vx * 1.15;
                    if (b.t > b.ret && Math.abs(b.x - this.cx()) < 26) xoa = true;
                }
                let cao = b.k === 'wingS' ? 98 : b.k === 'xoaylua' ? 66 : 58;
                this.cham(b, { x: b.x - b.r * 0.7, y: this.san() - cao, w: b.r * 1.4, h: cao });
            } else if (b.k === 'lua'){
                b.vy += (b.gra === undefined ? 0.36 : b.gra); b.x += b.vx; b.y += b.vy;
                if (this.cham(b, { x: b.x - 9, y: b.y - 9, w: 18, h: 18 })){
                    xoa = true;
                    if (this.laChoi){   // trung ke dich cung no: bat tia lua ra xung quanh
                        visualEffects.push(new Effect(b.x, b.y, 'explosion', true, 12));
                        for (let k = 0; k < (this.laChoi ? 2 : 3); k++) this.dan.push({ k: 'hoa', x: b.x, y: b.y, vx: (k - 1) * 3.2, vy: -3 - k, r: 5, t: 0, hit: 0, dmg: 1 });
                    }
                }
                if (b.y >= this.san() - 10){
                    xoa = true; visualEffects.push(new Effect(b.x, this.san() - 10, 'explosion', true, 18));
                    for (let k = 0; k < (this.laChoi ? 3 : 6); k++) this.dan.push({ k: 'hoa', x: b.x, y: this.san() - 12, vx: (Math.random() - 0.5) * 7, vy: -5 - Math.random() * 5, r: 5, t: 0, hit: 0, dmg: this.laChoi ? 1 : undefined });
                }
            } else if (b.k === 'hoa'){
                b.vy += 0.34; b.x += b.vx; b.y += b.vy;
                if (this.cham(b, { x: b.x - 5, y: b.y - 5, w: 10, h: 10 })) xoa = true;
                if (b.y >= this.san() - 4) xoa = true;
            } else if (b.k === 'gai'){
                b.vy += 0.45; b.x += b.vx; b.y += b.vy;
                if (b.y > this.san() - b.r){ b.y = this.san() - b.r; b.vy = -3.2; }
                this.cham(b, { x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 });
                if (b.t > 170) xoa = true;
            } else if (b.k === 'gaiS'){
                b.vy += (b.gra || 0.22); b.x += b.vx; b.y += b.vy;
                if (b.x < b.r || b.x > W - b.r){ b.vx = -b.vx; b.x = Math.max(b.r, Math.min(W - b.r, b.x)); b.hit = 0; b._hs = null; }
                if (b.y > this.san() - b.r){ b.y = this.san() - b.r; b.vy = -(b.reb || 8.5); b.hit = 0; b._hs = null; }
                if (b.y < -40){ b.y = -40; b.vy = Math.abs(b.vy); }
                this.cham(b, { x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 });
                if (b.t > 330) xoa = true;
            } else if (b.k === 'gaea'){
                b.x += b.vx; b.di += Math.abs(b.vx);
                // nuot dan nguoi choi tren duong
                if (!b.gaeaTap && typeof projectiles !== 'undefined') for (let j = projectiles.length - 1; j >= 0; j--){
                    let q = projectiles[j]; if (!q || q.owner === 2) continue;
                    if (Math.hypot((q.x + (q.w || 8) / 2) - b.x, (q.y + (q.h || 8) / 2) - b.y) < b.r + 6){ projectiles.splice(j, 1); visualEffects.push(new Effect(b.x, b.y, 'parry', false)); }
                }
                if (this.cham(b, { x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 })) xoa = true;
                if (b.di > (b.maxRange||190)) xoa = true;
            } else xoa = true;
            if (b.t > (b.life || 260) || b.x < -120 || b.x > W + 120 || b.y > (this.laChoi&&mapTheme==='ocean'?bienDayHT()+100:420) || b.y < -260) xoa = true;
            if (xoa || b._voidXoa) this.dan.splice(i, 1);
        }
        // --- cot (set roi / tia Falcon Giga) ---
        for (let i = this.cot.length - 1; i >= 0; i--){
            let c = this.cot[i]; c.t++;
            if (c.t === c.bao){ shakeTimer = Math.max(shakeTimer, 4); if (c.loai === 'set') visualEffects.push(new Effect(c.x, this.san() - 10, 'explosion', true, 20)); }
            if (c.t > c.bao && c.t <= c.bao + c.lua) this.cham(c, { x: c.x - c.w / 2, y: -200, w: c.w, h: this.san() + 200 });
            if (c.t > c.bao + c.lua) this.cot.splice(i, 1);
        }
        // --- tia ngang ---
        for (let i = this.tia.length - 1; i >= 0; i--){
            let r = this.tia[i]; r.t++;
            if (r.loai === 'flaser'){ let p = this.nongSung(); r.x0 = p.x; r.dir = this.dir(); }
            if (r.t > r.bao && r.t <= r.bao + r.lua){
                let x1 = r.dir > 0 ? r.x0 : -20, x2 = r.dir > 0 ? W + 20 : r.x0;
                if (this.cham(r, { x: x1, y: r.y - r.h / 2, w: x2 - x1, h: r.h }) && r.loai === 'flaser') r.hit = 1;
            }
            if (r.t > r.bao + r.lua) this.tia.splice(i, 1);
        }
        // --- khoi bang roi (Frost Tower) ---
        for (let i = this.roi.length - 1; i >= 0; i--){
            let q = this.roi[i]; q.t++;
            if (q.t < q.cho) continue;
            q.vy += 0.6; q.y += q.vy;
            if (this.cham(q, { x: q.x - q.w / 2, y: q.y, w: q.w, h: q.h })) {}
            if (q.y + q.h >= this.san()){
                visualEffects.push(new Effect(q.x, this.san() - 20, 'parry', false)); shakeTimer = Math.max(shakeTimer, 3);
                this.roi.splice(i, 1);
            }
        }
        // --- ban sao Soul Body ---
        for (let i = this.hon.length - 1; i >= 0; i--){
            let h = this.hon[i]; h.t++; h.x += h.vx;
            this.cham(h, { x: h.x + 4, y: h.y + 6, w: this.w - 8, h: this.h - 8 });
            if (h.x < -80 || h.x > W + 80) this.hon.splice(i, 1);
        }
        // --- khien C-Shot nap ---
        if (this.khien){
            let K = this.khien; K.t++; K.goc += 0.16;
            let cx = this.cx(), cy = this.cy(), R = 46;
            if (typeof projectiles !== 'undefined') for (let j = projectiles.length - 1; j >= 0; j--){
                let q = projectiles[j]; if (!q || q.owner === 2) continue;
                if (Math.hypot((q.x + (q.w || 8) / 2) - cx, (q.y + (q.h || 8) / 2) - cy) < R + 8){ projectiles.splice(j, 1); visualEffects.push(new Effect(cx, cy, 'parry', false)); }
            }
            let kk = 'kh' + Math.floor(K.t / 30);
            if (!this.hit.has(kk)){
                if (this.laChoi){
                    let ds = this.laChoi ? beamClashTargets() : [];
                    if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
                    if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
                    for (let t of ds){
                        if (!t || t.dying || !(t.hp > 0)) continue;
                        let nx = Math.max(t.x, Math.min(cx, t.x + (t.w || 20))), ny = Math.max(t.y, Math.min(cy, t.y + (t.h || 20)));
                        if (Math.hypot(nx - cx, ny - cy) < R){
                            this.hit.add(kk);
                            let dmg = 3;
                            if (typeof dealDamage === 'function') dealDamage(t, dmg, 'flat'); else t.hp -= dmg;
                            if (!t._beamClashPoint && typeof xCong === 'function') xCong(1);
                            break;
                        }
                    }
                } else {
                    let nx = Math.max(dino.x, Math.min(cx, dino.x + dino.w)), ny = Math.max(dino.y, Math.min(cy, dino.y + dino.h));
                    if (Math.hypot(nx - cx, ny - cy) < R){ this.hit.add(kk); this.hurtP(1); }
                }
            }
            if (K.t > K.dai) this.khien = null;
        }
        // --- Dark Hold ---
        if (this.toi){
            let D = this.toi; D.t++;
            if (D.t === 36){
                D.da = 1; shakeTimer = Math.max(shakeTimer, 10);
                if (this.laChoi){
                    let ds = this.laChoi ? beamClashTargets() : [];
                    if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
                    if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
                    for (let t of ds){
                        if (!t || !(t.hp > 0)) continue;
                        let nx = Math.max(t.x, Math.min(D.x, t.x + (t.w || 20))), ny = Math.max(t.y, Math.min(D.y, t.y + (t.h || 20)));
                        if (Math.hypot(nx - D.x, ny - D.y) < D.R) t._uFreeze = Math.max(t._uFreeze || 0, D.fr || 38);
                    }
                } else {
                    let nx = Math.max(dino.x, Math.min(D.x, dino.x + dino.w)), ny = Math.max(dino.y, Math.min(D.y, dino.y + dino.h));
                    if (Math.hypot(nx - D.x, ny - D.y) < D.R){
                        dino._uFreeze = Math.max(dino._uFreeze || 0, 38);
                        floatingTexts.push(new FloatingText(dino.x - 20, dino.y - 30, "DARK HOLD!"));
                    }
                }
                if (typeof projectiles !== 'undefined') for (let j = projectiles.length - 1; j >= 0; j--){
                    let q = projectiles[j]; if (!q || q.owner === 2) continue;
                    if (Math.hypot((q.x + (q.w || 8) / 2) - D.x, (q.y + (q.h || 8) / 2) - D.y) < D.R) projectiles.splice(j, 1);
                }
            }
            if (D.t > (D.life || 80)) this.toi = null;
        }
        // --- qua cau Gaea Giga ---
        if (this.cau){
            let C = this.cau; C.t++;
            if (C.t < 50) C.r = 6 + C.t * 1.3;
            else C.r = 71 + Math.sin(C.t * 0.4) * 4;
            if (this.laChoi) C.x = this.cx() + C.dir * (34 + C.r * 0.8);       // NGUOI CHOI: cau dinh sat truoc mat, khong bay di
            else if (C.t >= 50) C.x += C.dir * 3;
            let kk = 'cau' + Math.floor(C.t / 40);
            if (C.t > 20 && (this.laChoi || !this.hit.has(kk))){
                if (this.laChoi){
                    let ds = this.laChoi ? beamClashTargets() : [];
                    if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
                    if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
                    // cu 8 khung mot nhip, moi ke dich trong cau bi tru 9 (11 nhip = ~100 sat thuong). Nang luong chi +1 cho lan trung dau cua tung ke dich.
                    if ((C.t - 18) % 8 === 0){
                        C.hs = C.hs || new Set();
                        for (let t of ds){
                            if (!t || t.dying || t.invulnAll || !(t.hp > 0)) continue;
                            let nx = Math.max(t.x, Math.min(C.x, t.x + (t.w || 20))), ny = Math.max(t.y, Math.min(C.y, t.y + (t.h || 20)));
                            if (Math.hypot(nx - C.x, ny - C.y) < C.r * 0.85){
                                if (typeof dealDamage === 'function') dealDamage(t, 9, 'flat'); else t.hp -= 9;
                                if (!C.hs.has(t)){ C.hs.add(t); if (!t._beamClashPoint && typeof xCong === 'function') xCong(1); }
                            }
                        }
                    }
                } else {
                    let nx = Math.max(dino.x, Math.min(C.x, dino.x + dino.w)), ny = Math.max(dino.y, Math.min(C.y, dino.y + dino.h));
                    if (Math.hypot(nx - C.x, ny - C.y) < C.r * 0.85){ this.hit.add(kk); this.hurtP(2); }   // 2 sat thuong (truoc 1): cast rat lau, co bao truoc
                }
            }
            if (C.t > (this.laChoi ? 112 : 150) || C.x < -100 || C.x > W + 100) this.cau = null;
        }
        for (let i = this.vet.length - 1; i >= 0; i--) if (--this.vet[i].t <= 0) this.vet.splice(i, 1);
    }

    update(){
        if (this.laChoi){
            if(mapTheme==='ocean')this.baseY=this.san()-this.h;
            this.toc++;
            if (this.tayBan > 0) this.tayBan--;
            if (this.mauT > 0 && --this.mauT === 0 && this.aS === 'khong' && (this.vkChon || 'buster') === 'buster') this.mau = 'thuong';
            this.tickVatThe();
            if (this.bien) this.tickBien();
            else if (this.dac) this.tickDac();
            if (!this.bien) this.tickDon();
            if (this.dac || this.aS === 'falconGiga' || this.aS === 'gaeaGiga'){
                const flight=this.dac&&((this.dac.ten==='hover'&&this.dac.pha===1)||this.dac.ten==='bay'||(this.dac.ten==='nova'&&this.dac.t>=20))||this.aS==='falconGiga';
                if(!flight&&!this.grounded)this.vy=(this.vy||0)+(mapTheme==='ocean'?.20:(this.giap==='gaea'?.85:.7));
                this.x += this.vx || 0;
                this.y += this.vy || 0;
                if (this.baseY && this.y > this.baseY){ this.y = this.baseY; this.vy = 0; this.grounded = true; }
                else this.grounded = false;
            }
            this.chan += Math.abs(this.vx) * 0.16;
            return;
        }
        this.toc++;
        if (this.tayBan > 0) this.tayBan--;
        if (this.mauT > 0 && --this.mauT === 0 && this.aS === 'khong') this.mau = 'thuong';
        // GAEA: giap nang — an don chi mat mot nua
        if (this.giap === 'gaea' && this.hp < this._hpTruoc && this.hp > 0) this.hp += (this._hpTruoc - this.hp) * 0.5;
        this._hpTruoc = this.hp;
        this.tickVatThe();
        // ---- vao tran: tia sang bay tu troi xuong (warp in) ----
        if (this.state === 'intro'){
            this.y = Math.min(this.baseY, this.y + 18);
            if (this.y >= this.baseY){
                this.aT++;
                if (this.aT === 1){ this.grounded = true; shakeTimer = Math.max(shakeTimer, 8); this.tieng(1000, 0.1, 'triangle'); }
                if (this.aT === 10) this.chu('MEGA MAN X');
                if (this.aT > 40){ this.state = 'danh'; this.aS = 'khong'; this.aT = 0; this.invulnAll = false; this.aNghi = 20; }
            }
            return;
        }
        if (!this.dac && !this.bien) this.face();
        if (this.bien) this.tickBien();
        else { this.tickGiap(); }
        if (!this.bien){ this.tickDi(); this.tickDon(); }
        // ---- vat ly ----
        let bay = this.dac && ((this.dac.ten === 'hover' && this.dac.pha === 1) || this.dac.ten === 'bay' || (this.dac.ten === 'nova' && this.dac.t >= 20))
                  || this.aS === 'falconGiga';
        if (!bay){
            if (!this.grounded || this.y < this.baseY){
                this.vy += this.giap === 'gaea' ? 0.85 : 0.7; this.y += this.vy;
                if (this.y >= this.baseY){ this.y = this.baseY; this.vy = 0; this.grounded = true; if (this.giap === 'gaea') shakeTimer = Math.max(shakeTimer, 4); }
                else this.grounded = false;
            }
        } else { this.y += this.vy; this.grounded = false; if (this.y >= this.baseY){ this.y = this.baseY; this.vy = 0; } }
        this.x += this.vx;
        this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x));
        if (this.y < 10) { this.y = 10; if (this.vy < 0) this.vy = 0; }
    }

    // ======================= VE =======================
    veVatThe(){
        const W = canvas.width;
        ctx.save();
        for (const c of this.cot){
            if (c.t <= c.bao){
                let a = 0.25 + 0.35 * Math.abs(Math.sin(c.t * 0.35));
                ctx.fillStyle = c.loai === 'set' ? "rgba(255,238,88," + a * 0.5 + ")" : "rgba(129,212,250," + a * 0.45 + ")";
                ctx.fillRect(c.x - c.w / 2, -200, c.w, this.san() + 200);
                ctx.strokeStyle = c.loai === 'set' ? "#FFEE58" : "#E1F5FE"; ctx.lineWidth = 1.5; ctx.setLineDash([6, 6]);
                ctx.beginPath(); ctx.moveTo(c.x, -200); ctx.lineTo(c.x, this.san()); ctx.stroke(); ctx.setLineDash([]);
            } else {
                let k = 1 - (c.t - c.bao) / c.lua;
                ctx.globalCompositeOperation = 'lighter';
                if (c.loai === 'set'){
                    ctx.strokeStyle = "rgba(255,245,157," + k + ")"; ctx.lineWidth = 10 * k + 4;
                    ctx.beginPath(); let yy = -200; ctx.moveTo(c.x, -200);
                    while (yy < this.san()){ yy += 26; ctx.lineTo(c.x + (Math.random() - 0.5) * c.w * 0.8, Math.min(this.san(), yy)); }
                    ctx.stroke();
                    ctx.strokeStyle = "rgba(255,255,255," + k + ")"; ctx.lineWidth = 3; ctx.stroke();
                } else {
                    let g = ctx.createLinearGradient(c.x - c.w / 2, 0, c.x + c.w / 2, 0);
                    g.addColorStop(0, "rgba(79,195,247,0)"); g.addColorStop(0.5, "rgba(225,245,254," + k + ")"); g.addColorStop(1, "rgba(79,195,247,0)");
                    ctx.fillStyle = g; ctx.fillRect(c.x - c.w / 2, -200, c.w, this.san() + 200);
                }
                ctx.globalCompositeOperation = 'source-over';
            }
        }
        for (const r of this.tia){
            let x1 = r.dir > 0 ? r.x0 : 0, x2 = r.dir > 0 ? W : r.x0;
            if (r.t <= r.bao){
                ctx.strokeStyle = r.loai === 'falcon' ? "rgba(224,247,250,0.7)" : "rgba(255,171,64,0.7)"; ctx.lineWidth = 1.5; ctx.setLineDash([8, 6]);
                ctx.beginPath(); ctx.moveTo(x1, r.y); ctx.lineTo(x2, r.y); ctx.stroke(); ctx.setLineDash([]);
            } else {
                let k = Math.min(1, (r.bao + r.lua - r.t) / 10 + 0.2), h = r.h * (0.85 + 0.15 * Math.sin(r.t * 0.8));
                ctx.globalCompositeOperation = 'lighter';
                let g = ctx.createLinearGradient(0, r.y - h, 0, r.y + h);
                if (r.loai === 'falcon'){ g.addColorStop(0, "rgba(79,195,247,0)"); g.addColorStop(0.5, "rgba(255,255,255," + k + ")"); g.addColorStop(1, "rgba(79,195,247,0)"); }
                else { g.addColorStop(0, "rgba(255,87,34,0)"); g.addColorStop(0.35, "rgba(255,152,0," + 0.8 * k + ")"); g.addColorStop(0.5, "rgba(255,248,225," + k + ")"); g.addColorStop(0.65, "rgba(255,152,0," + 0.8 * k + ")"); g.addColorStop(1, "rgba(255,87,34,0)"); }
                ctx.fillStyle = g; ctx.fillRect(x1, r.y - h, x2 - x1, h * 2);
                ctx.globalCompositeOperation = 'source-over';
            }
        }
        for (const q of this.roi){
            if (q.t < q.cho){
                ctx.fillStyle = "rgba(179,229,252," + (0.2 + 0.2 * Math.sin(q.t * 0.5)) + ")";
                ctx.beginPath(); ctx.ellipse(q.x, this.san() - 2, q.w * 0.6, 5, 0, 0, 6.28); ctx.fill();
                continue;
            }
            ctx.fillStyle = "#B3E5FC"; ctx.fillRect(q.x - q.w / 2, q.y, q.w, q.h);
            ctx.fillStyle = "#E1F5FE"; ctx.fillRect(q.x - q.w / 2 + 4, q.y + 4, q.w * 0.4, q.h - 8);
            ctx.strokeStyle = "#0277BD"; ctx.lineWidth = 2; ctx.strokeRect(q.x - q.w / 2, q.y, q.w, q.h);
        }
        for (const h of this.hon){
            ctx.globalAlpha = 0.45; this.veThan(h.x, h.y, h.dir, { hon: 1 }); ctx.globalAlpha = 1;
        }
        for (const v of this.vet){
            ctx.globalAlpha = v.t / 30; this.veThan(v.x, v.y, this.dir(), { hon: v.trang ? 2 : 3 }); ctx.globalAlpha = 1;
        }
        for (const b of this.dan) this.veDan(b);
        if (this.toi){
            let D = this.toi, k = Math.min(1, D.t / 36);
            ctx.strokeStyle = "rgba(206,147,216,0.8)"; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
            ctx.beginPath(); ctx.arc(D.x, D.y, D.R, 0, 6.28); ctx.stroke(); ctx.setLineDash([]);
            let g = ctx.createRadialGradient(D.x, D.y, 0, D.x, D.y, D.R * k);
            g.addColorStop(0, "rgba(74,20,140,0.05)"); g.addColorStop(0.8, "rgba(106,27,154," + (D.da ? 0.35 * (1 - (D.t - 36) / 44) : 0.3) + ")"); g.addColorStop(1, "rgba(206,147,216,0.5)");
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(D.x, D.y, Math.max(1, D.R * k), 0, 6.28); ctx.fill();
        }
        if (this.cau){
            let C = this.cau;
            let g = ctx.createRadialGradient(C.x, C.y, 2, C.x, C.y, C.r);
            g.addColorStop(0, "rgba(255,248,225,0.95)"); g.addColorStop(0.5, "rgba(255,171,64,0.75)"); g.addColorStop(1, "rgba(191,54,12,0.1)");
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(C.x, C.y, C.r, 0, 6.28); ctx.fill();
            ctx.strokeStyle = "rgba(255,224,130,0.9)"; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.arc(C.x, C.y, C.r * (0.7 + 0.1 * Math.sin(C.t * 0.5)), 0, 6.28); ctx.stroke();
        }
        if (this.khien){
            let K = this.khien, cx = this.cx(), cy = this.cy();
            for (let i = 0; i < 4; i++){
                let a = K.goc + i * Math.PI / 2;
                this.veTrang(cx + Math.cos(a) * 42, cy + Math.sin(a) * 42, a + Math.PI / 2, 12, 1);
            }
        }
        ctx.restore();
    }
    veTrang(x, y, goc, r, a){
        ctx.save(); ctx.translate(x, y); ctx.rotate(goc); ctx.globalAlpha *= a;
        ctx.fillStyle = "#FFEE58"; ctx.strokeStyle = "#F57F17"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(0, 0, r, -1.2, 1.2); ctx.arc(-r * 0.45, 0, r * 0.8, 1.0, -1.0, true); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();
    }
    veDan(b){
        let x = b.x, y = b.y;
        const tron = (r, c1, c2, c3) => {
            let g = ctx.createRadialGradient(x, y, 1, x, y, r);
            g.addColorStop(0, c1); g.addColorStop(0.5, c2); g.addColorStop(1, c3);
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.28); ctx.fill();
        };
        if (b.k === 'lemon'){ ctx.fillStyle = "#FFF59D"; ctx.beginPath(); ctx.ellipse(x, y, 7, 4.5, 0, 0, 6.28); ctx.fill(); ctx.fillStyle = "#FFFFFF"; ctx.beginPath(); ctx.ellipse(x, y, 3.5, 2.2, 0, 0, 6.28); ctx.fill(); }
        else if (b.k === 'sac3'){
            tron(b.r * 1.5, "rgba(255,255,255,0.95)", "rgba(105,240,174,0.7)", "rgba(41,182,246,0)");
            ctx.strokeStyle = "rgba(128,222,234,0.8)"; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.ellipse(x - Math.sign(b.vx) * 10, y, b.r * 0.7, b.r * 1.3, 0, 0, 6.28); ctx.stroke();
        }
        else if (b.k === 'stock') tron(b.r * 1.4, "#FFFFFF", "rgba(234,128,252,0.8)", "rgba(123,31,162,0)");
        else if (b.k === 'plasma'){ tron(b.r * 1.6, "#FFFFFF", "rgba(129,212,250,0.85)", "rgba(2,136,209,0)");
            ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, b.r * (0.8 + 0.2 * Math.sin(b.t)), 0, 6.28); ctx.stroke(); }
        else if (b.k === 'orb'){ let a = Math.max(0, 1 - b.t / 60); ctx.globalAlpha = a; tron(b.r, "#E1F5FE", "rgba(79,195,247,0.7)", "rgba(2,136,209,0)"); ctx.globalAlpha = 1; }
        else if (b.k === 'trang') this.veTrang(x, y, Math.atan2(b.vy, b.vx), b.r, 1);
        else if (b.k === 'goo'){ ctx.fillStyle = "#80DEEA"; ctx.beginPath(); ctx.moveTo(x - 16, this.san()); ctx.lineTo(x - 6, this.san() - 16); ctx.lineTo(x + 14, this.san() - 10); ctx.lineTo(x + 18, this.san()); ctx.closePath(); ctx.fill(); ctx.fillStyle = "#E0F7FA"; ctx.fillRect(x - 4, this.san() - 12, 8, 6); }
        else if (b.k === 'da'){ ctx.save(); ctx.translate(x, y); ctx.rotate(b.t * 0.1); ctx.fillStyle = "#B2EBF2"; ctx.fillRect(-13, -13, 26, 26); ctx.strokeStyle = "#00838F"; ctx.lineWidth = 2; ctx.strokeRect(-13, -13, 26, 26); ctx.fillStyle = "#FFFFFF"; ctx.fillRect(-9, -9, 8, 8); ctx.restore(); }
        else if (b.k === 'set' || b.k === 'bi'){
            ctx.strokeStyle = "#FFF59D"; ctx.lineWidth = 2;
            ctx.beginPath(); for (let k = 0; k < 5; k++){ let a = Math.random() * 6.28; ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * b.r * 1.6, y + Math.sin(a) * b.r * 1.6); } ctx.stroke();
            tron(b.r, "#FFFFFF", "rgba(255,241,118,0.9)", "rgba(124,179,66,0)");
        }
        else if (b.k === 'flaser'){ tron(9, "#FFFFFF", "rgba(255,171,64,0.9)", "rgba(255,87,34,0)");
            ctx.strokeStyle = "rgba(255,204,128,0.6)"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - b.vx * 3, y - b.vy * 3); ctx.stroke(); }
        else if (b.k === 'wing' || b.k === 'wingS' || b.k === 'cyclone'){
            let cao = b.k === 'wing' ? 72 : b.k === 'wingS' ? 98 : 58, rr = b.k === 'wing' ? 18 : b.r, day = b.k === 'wing' ? y + 36 : this.san();
            ctx.strokeStyle = b.k === 'cyclone' ? "rgba(178,255,89,0.8)" : "rgba(200,230,201,0.85)"; ctx.lineWidth = 2.5;
            for (let k = 0; k < 7; k++){
                let yy = day - (k + 0.5) * cao / 7, w = rr * (0.45 + 0.55 * (k + 1) / 7);
                ctx.beginPath(); ctx.ellipse(x + Math.sin(b.t * 0.4 + k) * 4, yy, w, 5, 0, 0, 6.28); ctx.stroke();
            }
        }
        else if (b.k === 'lua' || b.k === 'hoa') tron(b.r * 1.4, "#FFF8E1", "rgba(255,112,67,0.9)", "rgba(211,47,47,0)");
        else if (b.k === 'xoaylua'){
            for (let k = 0; k < 6; k++){
                let yy = this.san() - (k + 0.5) * 11, w = b.r * (0.5 + 0.5 * (k + 1) / 6);
                ctx.fillStyle = k % 2 ? "rgba(255,112,67,0.75)" : "rgba(255,213,79,0.7)";
                ctx.beginPath(); ctx.ellipse(x + Math.sin(b.t * 0.5 + k) * 5, yy, w, 6, 0, 0, 6.28); ctx.fill();
            }
        }
        else if (b.k === 'gai' || b.k === 'gaiS'){
            ctx.save(); ctx.translate(x, y); ctx.rotate(b.t * 0.2 * Math.sign(b.vx || 1));
            ctx.fillStyle = b.k === 'gaiS' ? "#8E24AA" : "#EC407A";
            ctx.beginPath(); for (let k = 0; k < 16; k++){ let a = k * Math.PI / 8, rr = k % 2 ? b.r * 0.7 : b.r * 1.25; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill();
            ctx.fillStyle = b.k === 'gaiS' ? "#CE93D8" : "#F8BBD0"; ctx.beginPath(); ctx.arc(0, 0, b.r * 0.5, 0, 6.28); ctx.fill();
            ctx.restore();
        }
        else if (b.k === 'gaea'){ let a = Math.max(0.2, 1 - b.di / 290); ctx.globalAlpha = a; tron(b.r * 1.3, "#FFF8E1", "rgba(255,143,0,0.85)", "rgba(191,54,12,0)"); ctx.globalAlpha = 1; }
    }
    /* Than X — hinh nguoi, quay phai trong toa do rieng; `o.hon`: ban sao (1 = Soul Body, 2 = vet Falcon, 3 = vet Nova). */
    veThan(x, y, d, o){
        o = o || {};
        let W = this.w, H = this.h, cx = x + W / 2, cy = y + H / 2;
        let g = o.hon ? 'thuong' : this.giap;
        let [c1, c2] = MMX_MAU[o.hon ? 'thuong' : this.mau] || MMX_MAU.thuong;
        if (o.hon === 1){ c1 = '#5E35B1'; c2 = '#D1C4E9'; }
        if (o.hon === 3){ c1 = ['#E53935', '#FDD835', '#43A047', '#1E88E5', '#8E24AA'][Math.floor(this.toc / 3) % 5]; c2 = '#FFFFFF'; }
        if (o.hon === 2){ c1 = '#80DEEA'; c2 = '#FFFFFF'; }

        let dat = this.grounded, chay = Math.abs(this.vx) > 0.8 && dat;
        let buoc = Math.sin(this.chan) * (chay ? 1 : 0);
        let nhip = Math.sin((this.toc || 0) * 0.12) * (dat && !chay ? 0.8 : 0); // Nhịp thở Cyborg
        let luot = this.mS === 'luot' || (this.dac && (this.dac.ten === 'nova' || this.dac.ten === 'bay'));
        let tuong = this.dac && this.dac.ten === 'tuong' && this.dac.pha === 1;
        let giuSung = this.tayBan > 0 || this.sacLv > 0 || (this.aS !== 'khong' && this.aS !== 'nova' && this.aS !== 'bay') || (this.dac && this.dac.ten === 'hover');

        ctx.save();
        ctx.translate(cx, cy); ctx.scale(d, 1);
        // Upright body axis; movement is expressed through limbs and thrusters.
        ctx.translate(-W / 2, -H / 2 + nhip);

        // --- BẢNG MÀU CƠ KHÍ ---
        const KHUNG_TOI = '#0D1528';   // Khung xương carbon tối
        const KHUNG_SANG = '#263238';  // Khớp cơ khí
        const VIEN_THEP = '#102038';   // Viền giáp
        const DA = '#FFE0BD', DA_BONG = '#F4B480';

        // Bảng màu riêng cho từng bộ giáp X5
        let mChinh = c1, mPhu = c2, mGiap = c1, mVien = c2, mNangLuong = '#00E676', mVang = '#FFD600';
        if (g === 'fourth'){
            mGiap = '#F5F7FA'; mVien = '#D32F2F'; mChinh = '#1565C0'; mPhu = '#4FC3F7'; mNangLuong = '#00E676'; mVang = '#FFB300';
        } else if (g === 'falcon'){
            mGiap = '#ECEFF1'; mVien = '#1E88E5'; mChinh = '#0D47A1'; mPhu = '#E53935'; mNangLuong = '#00E5FF'; mVang = '#FFCA28';
        } else if (g === 'gaea'){
            mGiap = '#4E342E'; mVien = '#FF8F00'; mChinh = '#263238'; mPhu = '#8D6E63'; mNangLuong = '#FFAB00'; mVang = '#FFD54F';
        } else if (g === 'ultimate'){
            mGiap = '#1A162B'; mVien = '#FFD600'; mChinh = '#4A148C'; mPhu = '#7C4DFF'; mNangLuong = '#FF1744'; mVang = '#FFD600';
        }

        // Helper vẽ đa giác cơ khí nhanh
        const daGiac = (pts, fill, stroke, lw = 1) => {
            ctx.beginPath();
            ctx.moveTo(pts[0][0], pts[0][1]);
            for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
            ctx.closePath();
            if (fill){ ctx.fillStyle = fill; ctx.fill(); }
            if (stroke && !o.hon){ ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
        };

        // Helper vẽ đèn / lõi năng lượng phát sáng
        const denLed = (lx, ly, lr, mau) => {
            ctx.save();
            if (!o.hon){ ctx.shadowColor = mau; ctx.shadowBlur = 6; }
            ctx.fillStyle = mau;
            ctx.beginPath(); ctx.arc(lx, ly, lr, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath(); ctx.arc(lx - lr * 0.25, ly - lr * 0.25, lr * 0.4, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        };

        // =========================================================================
        // 1. BACKPACK & CÁNH NĂNG LƯỢNG SAU LƯNG (FALCON / ULTIMATE / LƯỚT)
        // =========================================================================
        if (g === 'falcon' && !o.hon){
            let v = Math.sin((this.toc || 0) * 0.22) * 3.5;
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            // Cánh Plasma xanh sáng đặc trưng X5 Falcon
            daGiac([[14, 22], [-18, 2 - v], [-26, 14 - v], [-10, 22], [-22, 32 - v * 0.5], [10, 32]], 'rgba(0, 229, 255, 0.45)', '#84FFFF', 1.2);
            daGiac([[14, 24], [-10, 10 - v], [-16, 18 - v], [-6, 24], [-14, 29 - v * 0.5], [10, 30]], 'rgba(224, 247, 250, 0.75)');
            ctx.restore();
            // Khung giữ cánh cơ khí
            daGiac([[14, 20], [2, 16], [-4, 22], [4, 32], [14, 32]], '#ECEFF1', '#1565C0', 1.2);
            ctx.fillStyle = '#D32F2F'; ctx.fillRect(0, 21, 8, 3);
        } else if (g === 'ultimate' && !o.hon){
            // Cánh phản lực Nova Strike sau lưng Ultimate Armor
            let v = luot ? 6 : Math.sin((this.toc || 0) * 0.15) * 2;
            daGiac([[14, 21], [-8 - v, 8], [-12 - v, 15], [4, 26]], '#1A162B', '#FFD600', 1.2);
            daGiac([[14, 26], [-6 - v, 28], [-10 - v, 34], [6, 33]], '#1A162B', '#FFD600', 1.2);
            if (luot || (this.dac && this.dac.ten === 'nova')){
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                daGiac([[2, 22], [-28, 12], [-20, 25], [-30, 34], [4, 30]], 'rgba(179, 136, 255, 0.7)');
                ctx.restore();
            }
        } else if (luot && !o.hon){
            // Tia lửa phản lực sau lưng khi Dash
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            daGiac([[10, 28], [-16 - (this.toc % 6), 24], [-10, 31], [-18 - (this.toc % 5), 35], [10, 34]], 'rgba(41, 182, 246, 0.75)');
            ctx.restore();
        }

        // =========================================================================
        // 2. TAY SAU (Hỗ trợ tạo chiều sâu trước khi vẽ thân)
        // =========================================================================
        let taySauX = 9 - buoc * 5, taySauY = 37 - Math.abs(buoc) * 2;
        // Khớp bả vai + cánh tay trong
        ctx.strokeStyle = KHUNG_TOI; ctx.lineWidth = 5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(14, 25); ctx.lineTo(taySauX, taySauY); ctx.stroke();
        // Giáp cẳng tay sau
        daGiac([
            [taySauX - 3, taySauY - 5], [taySauX + 4, taySauY - 5],
            [taySauX + 3, taySauY + 3], [taySauX - 4, taySauY + 3]
        ], mGiap, VIEN_THEP, 1);
        // Nắm đấm tay sau
        ctx.fillStyle = g === 'thuong' ? c1 : mVien;
        ctx.beginPath(); ctx.arc(taySauX, taySauY + 3, 3.8, 0, Math.PI * 2); ctx.fill();

        // =========================================================================
        // 3. ĐÔI CHÂN & ỦNG CYBORG (MECHA BOOTS)
        // =========================================================================
        let bot = g === 'gaea' ? 1.25 : g === 'fourth' || g === 'ultimate' ? 1.08 : 1;
        for (const ben of [-1, 1]){
            let gg = buoc * ben;
            let hX = 22 + ben * 4.5, hY = 40; // Khớp háng
            let kX = hX + gg * 4, kY = 46; // Khớp gối
            let aX = hX + gg * 7.5, aY = tuong ? 52 : (dat ? H - 12 : H - 15 + ben * 3); // Cổ chân

            // Đùi cơ khí (Thigh)
            ctx.strokeStyle = KHUNG_TOI; ctx.lineWidth = 6.5; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(hX, hY); ctx.lineTo(kX, kY); ctx.stroke();
            ctx.strokeStyle = mChinh; ctx.lineWidth = 4;
            ctx.beginPath(); ctx.moveTo(hX, hY); ctx.lineTo(kX, kY); ctx.stroke();

            // Khớp đầu gối (Knee Cap)
            let ux = aX - 7 * bot, uw = 15 * bot, uh = 13 * bot;
            // Ủng giáp đa giác (Mecha Greaves & Sabatons)
            daGiac([
                [kX - 4 * bot, kY - 2],
                [kX + 5 * bot, kY - 3],
                [ux + uw * 0.85, aY + 2],
                [ux + uw + 4.5 * bot, aY + uh * 0.55], // Mũi giày vát nhọn khí động học
                [ux + uw + 3 * bot, aY + uh * 0.85],
                [ux - 1.5 * bot, aY + uh * 0.85],
                [ux - 1 * bot, aY]
            ], mGiap, VIEN_THEP, 1.2);

            // Đế giày từ tính + chi tiết ống chân
            if (!o.hon){
                // Đế giày (Sole)
                ctx.fillStyle = KHUNG_SANG;
                ctx.fillRect(ux - 1.5 * bot, aY + uh * 0.72, uw + 5 * bot, 2.5);
                // Giáp bảo vệ đầu gối (Knee Guard)
                daGiac([
                    [kX - 3 * bot, kY - 4], [kX + 4.5 * bot, kY - 4],
                    [kX + 3 * bot, kY + 2], [kX - 2 * bot, kY + 2]
                ], mVien);
                // Dải sáng / Khe phản lực trên ủng
                ctx.fillStyle = g === 'thuong' ? c2 : mVang;
                ctx.fillRect(ux + 1.5, aY + 1, uw * 0.65, 2.5);
                // Đèn mắt cá chân Cyborg
                denLed(aX, aY + 5, 1.8, mNangLuong);
            }
        }

        // =========================================================================
        // 4. THẮT LƯNG, HÔNG & GIÁP NGỰC (TORSO & CHEST ARMOR)
        // =========================================================================
        let vaiScale = g === 'gaea' ? 1.32 : g === 'fourth' || g === 'ultimate' ? 1.15 : 1;

        // Khung bụng Cyborg (Inner Ab-frame có rãnh cơ bụng robot)
        daGiac([[14, 22], [30, 22], [28, 41], [16, 41]], KHUNG_TOI);
        if (!o.hon){
            ctx.fillStyle = KHUNG_SANG;
            ctx.fillRect(17, 34, 10, 1.5);
            ctx.fillRect(18, 36.5, 8, 1.5);
        }

        // Đai hông / Codpiece chuẩn thiết kế Mega Man X
        daGiac([[12, 38], [32, 38], [30, 42], [14, 42]], g === 'thuong' ? c1 : mGiap, VIEN_THEP, 1);
        daGiac([[19, 37], [25, 37], [23.5, 44], [20.5, 44]], g === 'thuong' ? c2 : mVien, VIEN_THEP, 1);
        if (!o.hon){
            ctx.fillStyle = mVang;
            ctx.fillRect(14, 39, 4, 2); ctx.fillRect(26, 39, 4, 2);
        }

        // Giáp ngực (Chestplate) theo từng hình dạng X5
        if (g === 'thuong'){
            daGiac([[10, 21], [34, 21], [31, 35], [13, 35]], c1, VIEN_THEP, 1.2);
            // Mảng ngực sáng & khe tản nhiệt
            daGiac([[15, 23], [29, 23], [27, 32], [17, 32]], c2);
            if (!o.hon){
                ctx.fillStyle = KHUNG_TOI;
                ctx.fillRect(16, 29, 4, 1.5); ctx.fillRect(24, 29, 4, 1.5);
                denLed(22, 26.5, 2.5, '#00E676');
            }
        } else if (g === 'fourth'){
            // Fourth Armor: Giáp trắng, viền đỏ/vàng, lõi ngọc đỏ/lục trước ngực
            daGiac([[9, 20], [35, 20], [32, 36], [12, 36]], '#F5F7FA', '#1565C0', 1.2);
            daGiac([[12, 21], [32, 21], [29, 27], [15, 27]], '#D32F2F');
            ctx.fillStyle = '#FFB300'; ctx.fillRect(12, 33.5, 20, 2.5);
            denLed(22, 28.5, 3.6, '#00E676');
        } else if (g === 'falcon'){
            // Falcon Armor: Giáp khí động học chữ V sắc nét, lõi ngọc đỏ
            daGiac([[10, 20], [34, 20], [30, 35], [14, 35]], '#ECEFF1', '#1E88E5', 1.2);
            daGiac([[12, 21], [22, 33], [32, 21], [27, 21], [22, 28], [17, 21]], '#1E88E5');
            ctx.fillStyle = '#FFCA28'; ctx.fillRect(14, 33, 16, 2);
            denLed(22, 26.5, 3.2, '#FF1744');
        } else if (g === 'gaea'){
            // Gaea Armor: Giáp hạng nặng đồ sộ, khung ngực vuông vức như xe tăng
            daGiac([[6, 18], [38, 18], [35, 37], [9, 37]], '#4E342E', '#FF8F00', 1.4);
            daGiac([[10, 21], [34, 21], [32, 29], [12, 29]], '#263238', '#FFB300', 1);
            // Khe tản nhiệt lò phản ứng Gaea
            ctx.fillStyle = '#FFAB00';
            ctx.fillRect(13, 23, 6, 4); ctx.fillRect(25, 23, 6, 4);
            denLed(22, 32, 3, '#00E676');
        } else if (g === 'ultimate'){
            // Ultimate Armor: Giáp đen tím viền vàng kim, lõi đỏ rực ở trung tâm
            daGiac([[9, 19], [35, 19], [32, 36], [12, 36]], '#1A162B', '#FFD600', 1.3);
            daGiac([[12, 21], [22, 31], [32, 21]], '#6A1B9A', '#FFD600', 1);
            ctx.fillStyle = '#FFD600'; ctx.fillRect(12, 34, 20, 2);
            denLed(22, 27.5, 3.8, '#FF1744');
        }

        // =========================================================================
        // 5. CẦU VAI CƠ KHÍ (SHOULDER PAULDRONS)
        // =========================================================================
        for (const isFront of [false, true]){
            let vx = isFront ? 11 : 33;
            let dir = isFront ? -1 : 1;
            let sw = 8 * vaiScale, sh = 7 * vaiScale;

            daGiac([
                [vx - sw * 0.7, 20],
                [vx + sw * 0.7, 20],
                [vx + sw * 0.95 * dir, 27],
                [vx - sw * 0.5 * dir, 28]
            ], mGiap, mVien, 1.3);

            // Chi tiết vây cầu vai cho Ultimate & Gaea
            if (g === 'ultimate' && !o.hon){
                daGiac([[vx, 19], [vx + dir * 10, 13], [vx + dir * 6, 23]], '#FFD600', '#FF6F00', 1);
            } else if (g === 'gaea' && !o.hon){
                ctx.fillStyle = '#FF8F00';
                ctx.fillRect(vx - 4, 22, 8, 3);
            } else if (!o.hon){
                ctx.fillStyle = mVang;
                ctx.fillRect(vx - 3, 22, 6, 2);
            }
        }

        // =========================================================================
        // 6. ĐẦU, MẶT & MŨ BẢO HIỂM (HELMET & CYBORG FACE)
        // =========================================================================
        let hx = 22, hy = 11;
        // Cổ cơ khí
        ctx.fillStyle = KHUNG_TOI; ctx.fillRect(hx - 4, hy + 7, 8, 5);

        // Vòm mũ bảo hiểm chính (Domed Mecha Helmet)
        ctx.fillStyle = g === 'thuong' ? c1 : mGiap;
        ctx.beginPath();
        ctx.arc(hx - 1, hy, 11.5, Math.PI * 0.85, Math.PI * 2.08);
        ctx.lineTo(hx + 9, hy + 8);
        ctx.lineTo(hx - 11, hy + 9);
        ctx.closePath();
        ctx.fill();
        if (!o.hon){ ctx.strokeStyle = VIEN_THEP; ctx.lineWidth = 1.2; ctx.stroke(); }

        // Highlight bóng vòm mũ
        if (!o.hon){
            ctx.fillStyle = 'rgba(255,255,255,0.22)';
            ctx.beginPath(); ctx.ellipse(hx - 2, hy - 6, 6, 2.5, -0.2, 0, Math.PI * 2); ctx.fill();
        }

        // Khuôn mặt & Mắt Anime sắc nét của X
        ctx.fillStyle = DA;
        ctx.fillRect(hx - 1, hy - 1, 10, 10);
        ctx.fillStyle = DA_BONG;
        ctx.fillRect(hx - 1, hy + 7, 9, 2); // Bóng cằm

        if (!o.hon){
            if (g === 'gaea'){
                // Gaea Armor có dải kính chắn (Visor) + 2 mắt sáng bên trong
                ctx.fillStyle = '#FFB300';
                ctx.fillRect(hx + 1, hy - 1, 9, 4);
                ctx.fillStyle = '#00E676';
                ctx.fillRect(hx + 3, hy, 5, 2.5);
            } else {
                // Mắt X tiêu chuẩn (Tròng trắng + Con ngươi xanh lục bảo / đỏ)
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(hx + 2, hy, 6, 4.5);
                ctx.fillStyle = g === 'ultimate' ? '#00E5FF' : '#00C853';
                ctx.fillRect(hx + 4.5, hy + 0.5, 3, 4);
                ctx.fillStyle = '#000000';
                ctx.fillRect(hx + 6, hy + 1.5, 1.5, 2);
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(hx + 4.5, hy + 0.8, 1.5, 1.5); // Eye catchlight
                // Lông mày sắc nét
                ctx.strokeStyle = KHUNG_TOI; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(hx + 1, hy - 0.5); ctx.lineTo(hx + 8.5, hy + 0.5); ctx.stroke();
            }
        }

        // Giáp hàm (Cheek Guard) & Mào mũ (Helmet Crest / Fins)
        daGiac([[hx - 9, hy + 1], [hx + 1, hy + 3], [hx + 2, hy + 9], [hx - 9, hy + 9]], g === 'thuong' ? c1 : mGiap, VIEN_THEP, 1);

        if (g === 'thuong'){
            // Sống mũ xanh sáng + Ngọc trán đỏ chuẩn X
            daGiac([[hx - 9, hy - 10], [hx + 3, hy - 11], [hx + 7, hy - 5], [hx - 4, hy - 6]], c2, VIEN_THEP, 1);
            denLed(hx + 5.5, hy - 4, 2.6, '#FF1744');
        } else if (g === 'fourth'){
            // Sừng chữ V đỏ/vàng vươn cao của Fourth Armor
            daGiac([[hx + 5, hy - 8], [hx - 17, hy - 17], [hx - 4, hy - 4]], '#D32F2F', '#B71C1C', 1);
            daGiac([[hx + 6, hy - 6], [hx - 13, hy - 12], [hx - 2, hy - 3]], '#FFD600');
            denLed(hx + 5, hy - 3.5, 2.5, '#00E676');
        } else if (g === 'falcon'){
            // Mào chim ưng vàng lao về phía trước của Falcon Armor
            daGiac([[hx - 8, hy - 11], [hx + 4, hy - 12], [hx + 14, hy - 3], [hx + 2, hy - 3]], '#FFCA28', '#F57F17', 1);
            daGiac([[hx - 10, hy - 9], [hx + 1, hy - 10], [hx - 2, hy - 5]], '#1E88E5');
            denLed(hx + 5.5, hy - 3.5, 2.5, '#FF1744');
        } else if (g === 'gaea'){
            // Mũ giáp vuông hạng nặng có sừng ngắn cam của Gaea Armor
            daGiac([[hx - 12, hy - 12], [hx + 10, hy - 12], [hx + 11, hy - 3], [hx - 11, hy - 3]], '#4E342E', '#FF8F00', 1.4);
            ctx.fillStyle = '#FF8F00'; ctx.fillRect(hx - 6, hy - 10, 14, 3);
            denLed(hx + 6, hy - 5.5, 2.2, '#00E676');
        } else if (g === 'ultimate'){
            // Mào 3 sừng vàng kim huyền thoại của Ultimate Armor X5
            daGiac([[hx - 4, hy - 9], [hx - 20, hy - 14], [hx - 9, hy - 4]], '#6A1B9A', '#FFD600', 1);
            daGiac([[hx + 5, hy - 7], [hx - 18, hy - 20], [hx - 4, hy - 3]], '#FFD600', '#FF6F00', 1);
            daGiac([[hx + 7, hy - 5], [hx - 15, hy - 11], [hx - 1, hy - 2]], '#FFD600');
            denLed(hx + 5.5, hy - 3.5, 2.8, '#FF1744');
        }

        // Tai nghe cơ khí (Ear Pod) phát sáng
        ctx.fillStyle = KHUNG_SANG;
        ctx.beginPath(); ctx.arc(hx - 5, hy + 3, 4.5, 0, Math.PI * 2); ctx.fill();
        denLed(hx - 5, hy + 3, 2.5, g === 'thuong' ? c2 : mNangLuong);

        // =========================================================================
        // 7. TAY TRƯỚC & NÒNG PHÁO X-BUSTER CÔNG NGHỆ CAO (CYBORG BUSTER)
        // =========================================================================
        if (giuSung && !o.hon){
            // Khớp khuỷu tay đưa ra trước
            ctx.strokeStyle = KHUNG_TOI; ctx.lineWidth = 5.5;
            ctx.beginPath(); ctx.moveTo(14, 25); ctx.lineTo(34, 28); ctx.stroke();

            let bx = 31, by = 22;
            let bw = g === 'gaea' ? 20 : g === 'ultimate' || g === 'fourth' ? 18 : 16;
            let bh = g === 'gaea' ? 13 : 11;

            // Thân súng X-Buster vát cạnh công nghệ cao
            daGiac([
                [bx, by + 2],
                [bx + bw - 3, by],
                [bx + bw, by + 3],
                [bx + bw, by + bh - 3],
                [bx + bw - 3, by + bh],
                [bx, by + bh - 1]
            ], g === 'thuong' ? c1 : mGiap, VIEN_THEP, 1.3);

            // Ốp sáng trên thân Buster
            ctx.fillStyle = g === 'thuong' ? c2 : mVien;
            ctx.fillRect(bx + 2, by + 2, bw - 6, 2.5);

            // Khe đo mức năng lượng (Buster Energy Gauge)
            let mauSacBuster = this.sacLv >= 2 ? '#FFEB3B' : this.sacLv === 1 ? '#00E5FF' : mNangLuong;
            ctx.save();
            ctx.shadowColor = mauSacBuster; ctx.shadowBlur = 5;
            ctx.fillStyle = mauSacBuster;
            ctx.fillRect(bx + 3, by + bh * 0.48, bw - 7, 2.5);
            ctx.restore();

            // Đầu nòng súng (Muzzle Ring & Barrel)
            ctx.fillStyle = KHUNG_SANG;
            ctx.fillRect(bx + bw - 2, by + 2, 3.5, bh - 4);
            ctx.fillStyle = '#000000';
            ctx.beginPath(); ctx.ellipse(bx + bw + 1.5, by + bh / 2, 1.5, bh * 0.32, 0, 0, Math.PI * 2); ctx.fill();

            // Quả cầu tụ năng lượng ở đầu nòng khi đang gồng (Charge Shot Orb)
            if (this.sacLv > 0){
                let orbR = 3 + this.sacLv * 2 + Math.sin((this.toc || 0) * 0.8) * 1.5;
                denLed(bx + bw + 3, by + bh / 2, orbR, mauSacBuster);
            }
        } else {
            // Tay trước vung tự nhiên khi chạy / đứng
            let tayTruocX = 34 + buoc * 5, tayTruocY = 37 - Math.abs(buoc) * 2;
            ctx.strokeStyle = KHUNG_TOI; ctx.lineWidth = 5.5; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(31, 25); ctx.lineTo(tayTruocX, tayTruocY); ctx.stroke();
            // Giáp cẳng tay (Forearm Gauntlet)
            daGiac([
                [tayTruocX - 3.5, tayTruocY - 6], [tayTruocX + 3.5, tayTruocY - 6],
                [tayTruocX + 4, tayTruocY + 2], [tayTruocX - 3, tayTruocY + 2]
            ], g === 'thuong' ? c1 : mGiap, VIEN_THEP, 1);
            // Đèn cổ tay
            if (!o.hon) denLed(tayTruocX, tayTruocY - 2, 1.6, mNangLuong);
            // Nắm đấm
            ctx.fillStyle = g === 'thuong' ? c2 : mVien;
            ctx.beginPath(); ctx.arc(tayTruocX + 0.5, tayTruocY + 3.5, 4 * vaiScale, 0, Math.PI * 2); ctx.fill();
        }

        ctx.restore();
    }

/* ----- veSac: Hiệu ứng nạp năng lượng (Charge Aura kiểu X5) ----- */
    veSac(){
        if (this.sacLv <= 0) return;
        let cx = this.cx(), cy = this.cy(), lv = this.sacLv;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        let mau = lv === 1 ? "41,182,246" : lv === 2 ? "255,238,88" : (this.toc % 6 < 3 ? "213,0,249" : "0,230,118");
        let r = 28 + lv * 7 + Math.sin(this.toc * 0.6) * 3.5;

        // Vầng hào quang Radial
        let g = ctx.createRadialGradient(cx, cy, 4, cx, cy, r);
        g.addColorStop(0, "rgba(255,255,255,0.35)");
        g.addColorStop(0.5, "rgba(" + mau + ",0.28)");
        g.addColorStop(1, "rgba(" + mau + ",0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

        // Vòng xoáy năng lượng Cyborg xoay quanh người
        ctx.strokeStyle = "rgba(" + mau + ",0.75)";
        ctx.lineWidth = 1.8;
        for (let i = 0; i < 2; i++){
            let rot = (this.toc * 0.12) * (i === 0 ? 1 : -1) + i * 1.5;
            ctx.beginPath();
            ctx.ellipse(cx, cy, r * 0.85, r * 0.38, rot, 0, Math.PI * 1.4);
            ctx.stroke();
        }

        // Hạt photon hút vào tâm
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        for (let k = 0; k < 5 + lv * 3; k++){
            let a = this.toc * 0.25 + k * 2.1;
            let prog = 1 - (((this.toc * 2.5 + k * 13) % 24) / 24);
            let rr = r * prog;
            let px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
            ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
        }
        ctx.restore();
    }
    draw(){
        this.veVatThe();
        let x = this.x, y = this.y, d = this.dir();
        // vao tran: cot sang warp
        if (this.state === 'intro' && this.aT < 10){
            ctx.save(); ctx.fillStyle = "rgba(79,195,247,0.8)"; ctx.fillRect(this.cx() - 5, Math.min(y, this.baseY) - 20, 10, this.h + 20);
            ctx.fillStyle = "#E1F5FE"; ctx.fillRect(this.cx() - 2, Math.min(y, this.baseY) - 20, 4, this.h + 20); ctx.restore();
            if (this.aT === 0) { this.veTieuDe(); return; }
        }
        // doi giap: nhap nhay + vong sang
        if (this.bien){
            let B = this.bien, k = B.t / B.dai;
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            let mau = B.g === 'ultimate' ? "179,136,255" : B.g === 'gaea' ? "255,171,64" : B.g === 'falcon' ? "224,247,250" : B.g === 'fourth' ? "239,83,80" : "79,195,247";
            for (let i = 0; i < 3; i++){
                ctx.strokeStyle = "rgba(" + mau + "," + (0.8 * (1 - k)) + ")"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 20 + ((B.t * 3 + i * 25) % 80), 0, 6.28); ctx.stroke();
            }
            ctx.fillStyle = "rgba(" + mau + ",0.25)"; ctx.fillRect(this.cx() - 22, 0, 44, this.san());
            ctx.restore();
        }
        let nhapNhay = this.bien && this.bien.t % 6 < 3;
        if (nhapNhay){ ctx.save(); ctx.globalAlpha = 0.55; }
        this.veThan(x, y, d, {});
        if (nhapNhay) ctx.restore();
        if (this.dac && this.dac.ten === 'nova' && this.dac.t >= 20){
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            let g = ctx.createRadialGradient(this.cx(), this.cy(), 4, this.cx(), this.cy(), 60);
            g.addColorStop(0, "rgba(255,255,255,0.9)"); g.addColorStop(0.5, "rgba(255,213,79,0.5)"); g.addColorStop(1, "rgba(233,30,99,0)");
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 60, 0, 6.28); ctx.fill(); ctx.restore();
        }
        if (this.dac && this.dac.ten === 'nova' && this.dac.t < 20){
            ctx.save(); ctx.strokeStyle = "rgba(255,213,79," + (this.dac.t / 20) + ")"; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
            ctx.beginPath(); ctx.moveTo(this.cx(), this.cy()); ctx.lineTo(dino.x + dino.w / 2, dino.y + dino.h / 2); ctx.stroke(); ctx.restore();
        }
        this.veSac();
        this.veTieuDe();
    }
    veTieuDe(){
        if (this.laChoi) return;        // dang choi dang X: khong ve thanh mau kieu Boss o dinh man hinh
        if (typeof drawTopBossBar === 'function'){
            let g = this.giap;
            let ten = MMX_GIAP_TEN[g] + (this.mau !== 'thuong' && MMX_VK_TEN[this.mau] ? ' · ' + MMX_VK_TEN[this.mau] : '');
            drawTopBossBar(this, MMX_GIAP_MAU[g], ten);
        }
    }
}
// BOSS_PART_END s0.MegaManXBoss.1

// Nguồn: index.html:39967 · Dùng bởi: MegaManXBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.OCEAN_FLOOR.1 READ_ONLY
const OCEAN_FLOOR = 500;
// BOSS_PART_END s1.OCEAN_FLOOR.1

// Nguồn: index.html:40028 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.BIEN_DAY.1 READ_ONLY
const BIEN_DAY = 760, BIEN_NONG = 330, BIEN_SAU = 470, BIEN_VUC = 560;
// BOSS_PART_END s1.BIEN_DAY.1

// Nguồn: index.html:40037 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienChay.1 READ_ONLY
function bienChay(){
            return typeof gameState !== 'undefined' && gameState === 'normal' && mapChay === 'ocean' && mapTheme === 'ocean'
                && bosses.length === 0 && !defMode;
        }
// BOSS_PART_END s1.bienChay.1

// Nguồn: index.html:40042 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss
// BOSS_PART_BEGIN s1.bienCoDiaHinh.1 READ_ONLY
function bienCoDiaHinh(){ return bienChay() || (typeof bienDT !== 'undefined' && bienDT && mapTheme === 'ocean'); }
// BOSS_PART_END s1.bienCoDiaHinh.1

// Nguồn: index.html:40043 · Dùng bởi: MegaManXBoss
// BOSS_PART_BEGIN s1.bienDayHT.1 READ_ONLY
function bienDayHT(){ return bienCoDiaHinh() ? BIEN_DAY : OCEAN_FLOOR; }
// BOSS_PART_END s1.bienDayHT.1

// Nguồn: index.html:40930 · Dùng bởi: HelicoprionBoss, MegaManXBoss, MegalodonBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.bienDT.1 READ_ONLY
let bienDT = false, bienToiY = 520;
// BOSS_PART_END s1.bienDT.1

// Nguồn: index.html:98795 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:98806 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
