// BOSS_FILE: ZeroBoss
// BOSS_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, canvas, checkAABB, ctx, cusAcThoiVat, dino, dojoMode, floatingTexts, frames, parry, projectiles, shakeTimer, visualEffects, voidBat, voidPhanRa
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

// Nguồn: index.html:29206 · Dùng bởi: ZeroBoss
// BOSS_PART_BEGIN s0.ZX_HP.1 READ_ONLY
const ZX_HP = 140;
// BOSS_PART_END s0.ZX_HP.1

// Nguồn: index.html:29207 · Dùng bởi: ZeroBoss
// BOSS_PART_BEGIN s0.ZX_KIEM.1 EDITABLE
const ZX_KIEM = {
    thuong: ['#00E676', '#B9F6CA'],
    lua:    ['#FF6D00', '#FFE082'],
    bang:   ['#00E5FF', '#E0F7FA'],
    dien:   ['#FFEA00', '#FFFDE7'],
    tim:    ['#D500F9', '#F3E5F5'],
    den:    ['#AA00FF', '#EA80FC']
};
// BOSS_PART_END s0.ZX_KIEM.1

// Nguồn: index.html:29216 · Dùng bởi: MegaManXBoss, ThalassaBoss, ZeroBoss
// BOSS_PART_BEGIN s0.BOSS_NGHI.1 READ_ONLY
const BOSS_NGHI = { x: 40, xGiap: 34, xUlt: 28, zero: 38, sauChuoi: 20, chuoiMax: 3, tl1: 40, tl2: 30, tlThem: 16 };
// BOSS_PART_END s0.BOSS_NGHI.1

// Nguồn: index.html:29218 · Dùng bởi: ZeroBoss
// BOSS_PART_BEGIN s0.ZeroBoss.1 EDITABLE
class ZeroBoss {
    constructor(level){
        this.hp = ZX_HP; this.maxHp = ZX_HP; this.w = 54; this.h = 88;
        this.x = canvas.width - 190; this.y = 320 - this.h; this.baseY = 320 - this.h;
        this.name = "ZERO";
        this.facingLeft = true; this.vx = 0; this.vy = 0; this.grounded = true; this.nhayKep = 0;
        // ----- tầng di chuyển -----
        this.mS = 'dung'; this.mT = 0; this.mCho = 0; this.luotCd = 0; this.nhayCd = 0;
        // ----- tầng tấn công & chuỗi combo -----
        this.aS = 'khong'; this.aT = 0; this.aNghi = 0;
        this.hangDoi = [];          // Hàng đợi chứa chuỗi combo được lên kịch bản mượt mà
        this.chuoiDai = 0;
        this.comboCut = false;      // Cờ ngắt nhát thứ 2 trong combo 3 nhát để nối V-lên (Ryuenjin)
        this.cd = {};
        // ----- chung & Black Zero -----
        this.state = 'intro'; this.actionTimer = 64;
        this.hit = new Set(); this.dan = []; this.vet = []; this.hat = [];
        this.tiaSet = null; this.setTim = []; this.vachKiem = [];
        this.invulnAll = false; this.burnTimer = 0;
        this.toc = 0; this.chan = 0; this.gatT = 0; this.gocKiem = -0.35; this.goc = -0.35;
        this.tenkuu = false; this.black = false; // Trạng thái Black Zero
        this.docKhien = 0; this.docBan = 0; this.trungDon = false; this.treo = 0;
        this.kiem = 'thuong'; this.tayBan = 0;
    }

    cx(){ return this.x + this.w / 2; }
    cy(){ return this.y + this.h / 2; }
    hurtP(n){
        if (!dino.isShielding()) dino.takeDamage(n || 1);
        else visualEffects.push(new Effect(dino.x + (dino.isFacingLeft ? dino.w : 0), dino.y, 'parry'));
    }
    face(){ this.facingLeft = (dino.x + dino.w / 2) < this.cx(); }
    dir(){ return this.facingLeft ? -1 : 1; }
    gap(){ return Math.abs((dino.x + dino.w / 2) - this.cx()); }
    khe(){ return this.x > dino.x ? this.x - (dino.x + dino.w) : dino.x - (this.x + this.w); }
    tren(){ return !dino.grounded && dino.y + dino.h < this.baseY + 20; }
    nhip(){ return (this.black ? 0.54 : 0.62) + (this.hp / this.maxHp) * 0.34; }
    tieng(f, dai, kieu){ if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(f, dai || 0.07, kieu || 'sawtooth', 0.12, f * 1.8); }
    chu(s){ floatingTexts.push(new FloatingText(this.x - 30, this.y - 26, s)); }

    // Tạo tia sét tím giật quanh cơ thể (dùng khi thức tỉnh & Black Zero)
    taoSetTim(x0, y0, r){
        let pts = [[x0, y0]];
        let a = Math.random() * Math.PI * 2;
        for (let i = 1; i <= 5; i++){
            let rr = (r / 5) * i;
            let jitter = (Math.random() - 0.5) * 18;
            pts.push([x0 + Math.cos(a) * rr - Math.sin(a) * jitter, y0 + Math.sin(a) * rr + Math.cos(a) * jitter]);
        }
        this.setTim.push({ pts: pts, t: 8 });
    }

    // HỘP CHÉM phía trước hoặc quanh người
    chem(rong, cao, xa, khoa, lech){
        let d = this.dir();
        let box = { x: d > 0 ? this.x + this.w + xa - 10 : this.x - xa - rong + 10, y: this.y + (this.h - cao) / 2 + (lech || 0), w: rong, h: cao };
        if (!this.hit.has(khoa) && checkAABB(dino, box)){ this.hit.add(khoa); this.hurtP(1); this.trungDon = true; }
        if (this.tenkuu) this.chemDan(box);
        return box;
    }
    quanh(pad, khoa){
        let box = { x: this.x - pad, y: this.y - pad, w: this.w + pad * 2, h: this.h + pad * 2 };
        if (!this.hit.has(khoa) && checkAABB(dino, box)){ this.hit.add(khoa); this.hurtP(1); this.trungDon = true; }
        if (this.tenkuu) this.chemDan(box);
        return box;
    }
    chemDan(box){
        if (typeof projectiles === 'undefined') return;
        for (let i = projectiles.length - 1; i >= 0; i--){
            let q = projectiles[i]; if (!q || q.owner === 2) continue;
            if (checkAABB(box, q)){ projectiles.splice(i, 1); visualEffects.push(new Effect(q.x, q.y, 'parry', false)); }
        }
    }
    vetBong(){ this.vet.push({ x: this.x, y: this.y, t: 13, trai: this.facingLeft, goc: this.goc, kiem: this.kiem, black: this.black }); }
    bui(n, mau){
        let a = [];
        for (let i = 0; i < n; i++) a.push({ x: this.cx() + (Math.random() - 0.5) * 30, y: this.y + this.h, vx: (Math.random() - 0.5) * 3.5, vy: -Math.random() * 2.5, t: 0, song: 18, mau: mau, r: 3.2 });
        return a;
    }

    /* ================= TẦNG DI CHUYỂN — chạy khi RẢNH TAY ================= */
    tickDi(){
        this.mT++;
        if (this.luotCd > 0) this.luotCd--;
        if (this.nhayCd > 0) this.nhayCd--;
        if (this.khe() < 12 && this.grounded){ let day = (this.x > dino.x) ? 1 : -1; this.x += day * (12 - this.khe()) * 0.6; }
        let k = this.khe();
        const GAN = 46, XA = 110;
        if (--this.mCho <= 0){
            let r = Math.random();
            if (this.tren() && this.nhayCd <= 0 && this.grounded){
                this.mS = 'nhay'; this.mCho = 38; this.nhayCd = 65; this.vy = -13.5; this.grounded = false; this.nhayKep = 1;
            } else if (k > XA && this.luotCd <= 0 && this.grounded){
                this.mS = 'luot'; this.mT = 0; this.mCho = 16; this.luotCd = this.black ? 45 : 68;
            } else if (k > XA){
                this.mS = 'toi'; this.mCho = 18 + r * 18;
            } else if (k < GAN){
                this.mS = r < 0.45 && this.luotCd <= 0 ? 'luotlui' : 'lui'; this.mT = 0; this.mCho = 14 + r * 12;
                if (this.mS === 'luotlui') this.luotCd = 65;
            } else {
                this.mS = 'vong'; this.mCho = 18 + r * 20;
            }
        }
        if (this.mS === 'toi' && k <= GAN) this.mS = 'vong';
        let spd = this.black ? 1.18 : 1;
        if (this.mS === 'toi') this.vx = this.dir() * 3.2 * spd;
        else if (this.mS === 'lui') this.vx = -this.dir() * 3.0 * spd;
        else if (this.mS === 'luot'){ this.vx = this.dir() * 11.5 * spd; if (this.mT % 2 === 0) this.vetBong(); if (this.mT > 15) this.mS = 'vong'; }
        else if (this.mS === 'luotlui'){ this.vx = -this.dir() * 10.5 * spd; if (this.mT % 2 === 0) this.vetBong(); if (this.mT > 12) this.mS = 'vong'; }
        else if (this.mS === 'nhay'){
            this.vx = this.dir() * 3.0 * spd;
            if (this.nhayKep && this.vy > -2 && !this.grounded){ this.nhayKep = 0; this.vy = -11; this.hat.push(...this.bui(6, '#E0F7FA')); }
            if (this.grounded) this.mS = 'vong';
        }
        else if (this.mS === 'vong') this.vx = Math.sin(this.toc * 0.09) * 2.0;
        else this.vx *= 0.7;
        this.chan += Math.abs(this.vx) * 0.16;
    }

    /* ================= TẦNG TẤN CÔNG & TỔ HỢP COMBO ================= */
    /* Thiết lập cả 1 chuỗi liên hoàn hợp lý vào hàng đợi `hangDoi` */
    datChuoi(...ds){
        this.hangDoi = ds.slice(1);
        this.batDon(ds[0]);
    }

    chonChuoi(){
        let k = this.khe(), g = this.gap(), tren = this.tren();
        const co = t => !(this.cd[t] > 0);
        let sac = (dino.chargeProgress || 0) > 35;

        // 1. Phá khiên hoặc trừng phạt bắn liên tục
        if (this.docKhien > 16){
            this.docKhien = 0;
            if (this.black && co('rekkoha')) return ['rekkoha'];
            if (co('rakuhouha')) return ['rakuhouha'];
            return ['ryuenjin', 'hyouretsuzan'];
        }
        if (this.docBan >= 2){
            this.docBan = 0;
            if (this.black && co('raikousen')) return ['raikousen', 'ryuenjin', 'kuuenzan'];
            if (this.black && co('tele')) return ['tele', 'combo2', 'ryuenjin', 'kuuenzan'];
            if (co('shippuuga')) return ['shippuuga', 'combo2', 'ryuenjin', 'kuuenzan'];
        }

        // 2. Khi ở trạng thái BLACK ZERO (Phase 2) — Ưu tiên các tổ hợp biến ảo X5/X6 + X4
        if (this.black){
            if (tren){
                if (co('tele')) return ['tele', 'kuuenzan', 'sentsuizan'];
                if (co('ryuenjin')) return ['ryuenjin', 'kuuenzan', 'hyouretsuzan'];
            }
            if (k > 190){
                // Khoảng cách xa: Bắn Z-Buster + Kiếm khí, hoặc Tia chớp Raikousen, hoặc Tele áp sát
                if (co('zbuster') && Math.random() < 0.55) return ['zbuster', 'tele', 'sentsuizan'];
                if (co('raikousen')) return ['raikousen', 'ryuenjin', 'hyouretsuzan'];
                if (co('tele')) return ['tele', 'combo2', 'ryuenjin', 'kuuenzan'];
            }
            if (k >= 85 && k <= 190){
                // Tầm trung: Chọc điện -> Lướt chém -> V-lên -> Băng xuống / Lao chéo
                if (co('raijingeki')) return ['raijingeki', 'shippuuga', 'ryuenjin', 'sentsuizan'];
                if (co('shippuuga')) return ['shippuuga', 'combo2', 'ryuenjin', 'kuuenzan'];
                if (co('rekkoha')) return ['rekkoha'];
            }
            // Cận chiến Black Zero:
            if (co('combo2') && Math.random() < 0.5) return ['combo2', 'ryuenjin', 'kuuenzan', 'hyouretsuzan']; // Chém 2 cái -> V lên -> Xoay tròn -> Đâm băng
            if (co('ryuenjin')) return ['ryuenjin', 'hyouretsuzan']; // V lên -> V xuống cổ điển
            if (co('tele')) return ['tele', 'raijingeki', 'shippuuga'];
        }

        // 3. Trạng thái ZERO X4 Chuẩn (Phase 1) — Tổ hợp kỹ thuật kiếm thuật X4
        if (tren){
            // Người chơi nhảy: V-lên (Ryuenjin) -> Xoay tròn (Kuuenzan) hoặc V-xuống (Hyouretsuzan)
            if (g < 140 && co('ryuenjin')) return ['ryuenjin', 'kuuenzan', 'hyouretsuzan'];
            if (co('kuuenzan')) return ['kuuenzan', 'hyouretsuzan'];
            if (co('hyouretsuzan')) return ['hyouretsuzan'];
        }
        if (k < 90){
            // Cận chiến:
            // Tổ hợp 1: Chém 2 cái đầu -> V-lên (Ryuenjin) -> Xoay kiếm (Kuuenzan)
            if (co('combo2') && Math.random() < 0.48) return ['combo2', 'ryuenjin', 'kuuenzan'];
            // Tổ hợp 2: V-lên (Lửa) -> V-xuống (Băng)
            if (co('ryuenjin') && Math.random() < 0.55) return ['ryuenjin', 'hyouretsuzan'];
            // Tổ hợp 3: 3 nhát chuẩn -> Chọc điện (Raijingeki)
            if (co('combo')) return ['combo', 'raijingeki'];
            if (co('rakuhouha') && this.hp < this.maxHp * 0.75) return ['rakuhouha'];
        }
        if (k < 210){
            // Tầm trung:
            // Tổ hợp thương hiệu yêu cầu: Lướt tới (Shippuuga) -> Chém 2 cái đầu (combo2) -> V-lên (Ryuenjin) -> Xoay tròn (Kuuenzan)
            if (co('shippuuga') && Math.random() < 0.55) return ['shippuuga', 'combo2', 'ryuenjin', 'kuuenzan'];
            // Hoặc: Chọc điện (Raijingeki) -> Lướt chém (Shippuuga) -> V-lên (Ryuenjin)
            if (co('raijingeki')) return ['raijingeki', 'shippuuga', 'ryuenjin'];
            if (co('hyouretsuzan')) return ['hyouretsuzan', 'combo2', 'ryuenjin'];
        }
        // Tầm xa:
        if (sac && co('raijingeki')) return ['raijingeki', 'shippuuga'];
        if (co('shippuuga')) return ['shippuuga', 'combo2', 'ryuenjin', 'hyouretsuzan'];
        if (co('rakuhouha') && this.hp < this.maxHp * 0.8) return ['rakuhouha'];
        return ['hyouretsuzan'];
    }

    batDon(t){
        this.comboCut = (t === 'combo2');
        this.aS = (t === 'combo2') ? 'combo' : t;
        this.aT = 0; this.hit.clear(); this.trungDon = false;
        this.kiem = this.aS === 'ryuenjin' ? 'lua'
                  : (this.aS === 'hyouretsuzan' || this.aS === 'sentsuizan') ? 'bang'
                  : (this.aS === 'raijingeki' || this.aS === 'raikousen') ? 'dien'
                  : this.black ? 'den' : 'thuong';
        const TEN = {
            shippuuga: 'SHIPPUUGA!', ryuenjin: 'RYUENJIN!', hyouretsuzan: 'HYOURETSUZAN!',
            raijingeki: 'RAIJINGEKI!', kuuenzan: 'KUUENZAN!', rakuhouha: 'RAKUHOUHA!',
            hienkyaku: 'HIENKYAKU!', zbuster: 'Z-BUSTER!', raikousen: 'RAIKOUSEN!',
            sentsuizan: 'SENTSUIZAN!', rekkoha: 'REKKOHA!'
        };
        if (TEN[this.aS]) this.chu(TEN[this.aS]);
    }

    hetDon(cd, noiTrucTiep){
        let keyCd = this.comboCut ? 'combo2' : this.aS;
        this.cd[keyCd] = Math.round((cd || 110) * this.nhip());
        this.treo = 0; this.comboCut = false;

        // Lấy chiêu tiếp theo từ kịch bản hàng đợi (hoặc chiêu nối trực tiếp)
        let keTiep = (this.hangDoi && this.hangDoi.length > 0) ? this.hangDoi.shift() : noiTrucTiep;
        if (keTiep && this.chuoiDai < BOSS_NGHI.chuoiMax + (this.black ? 1 : 0)){
            this.chuoiDai++;
            this.aS = 'khong';
            this.batDon(keTiep);
            this.aNghi = 0;
            return;
        }
        let _daNoi = this.chuoiDai;
        this.chuoiDai = 0; this.hangDoi = [];
        this.aS = 'khong'; this.aT = 0;
        this.kiem = this.black ? 'den' : 'thuong';
        this.aNghi = Math.round((BOSS_NGHI.zero + _daNoi * BOSS_NGHI.sauChuoi) * this.nhip());
        this.hit.clear();
    }

    tickDon(){
        for (const k in this.cd) if (this.cd[k] > 0) this.cd[k]--;
        if (this.tayBan > 0) this.tayBan--;
        this._pvx = (this._px === undefined) ? 0 : this._pvx * 0.8 + (dino.x - this._px) * 0.2; this._px = dino.x;

        // KÍCH HOẠT BIẾN HÌNH BLACK ZERO NGAY KHI MÁU <= 50%
        if (!this.black && this.hp <= this.maxHp * 0.5 && this.aS !== 'awaken' && this.state === 'danh'){
            this.hangDoi = []; this.chuoiDai = 0; this.tiaSet = null;
            this.batDon('awaken');
            return true;
        }

        if (this.aS === 'khong'){
            if (this.aNghi > 0){ this.aNghi--; return false; }
            if (!this.grounded) return false;
            let ds = this.chonChuoi();
            if (ds && ds.length){ this.datChuoi(...ds); return true; }
            return false;
        }

        this.aT++;
        const CD = {
            combo: 95, combo2: 85, shippuuga: 130, ryuenjin: 135, hyouretsuzan: 155,
            raijingeki: 145, kuuenzan: 115, rakuhouha: 340, hienkyaku: 60,
            tele: 90, zbuster: 160, raikousen: 190, sentsuizan: 140, rekkoha: 380, awaken: 99999
        };
        let A = this.aS, T = this.aT, d = this.dir();

        // =========================================================================
        // 0. AWAKEN — SỰ THỨC TỈNH CỦA BLACK ZERO (Sét tím giật + Hào quang)
        // =========================================================================
        if (A === 'awaken'){
            this.vx = 0; this.vy = 0; this.treo = 1;
            this.invulnAll = true; // Bất tử trong lúc chuyển dạng
            if (T === 1){
                this.chu('BLACK ZERO AWAKENING!');
                this.tieng(180, 0.45, 'sawtooth');
                shakeTimer = Math.max(shakeTimer, 20);
            }
            // Sét tím phóng ra liên tục từ cơ thể Zero
            if (T % 2 === 0){
                this.taoSetTim(this.cx() + (Math.random() - 0.5) * 24, this.cy() + (Math.random() - 0.5) * 36, 48 + Math.random() * 45);
                this.hat.push({ x: this.cx() + (Math.random() - 0.5) * 50, y: this.y + this.h, vx: (Math.random() - 0.5) * 2, vy: -3 - Math.random() * 4, t: 0, song: 20, mau: '#D500F9', r: 3.5 });
            }
            if (T === 34){
                // Khoảnh khắc nổ xung kích biến thành Black Zero
                this.black = true;
                this.tenkuu = true;
                this.kiem = 'den';
                this.name = "BLACK ZERO";
                shakeTimer = Math.max(shakeTimer, 28);
                this.tieng(620, 0.5, 'triangle');
                for (let i = 0; i < 12; i++) this.taoSetTim(this.cx(), this.cy(), 110);
                this.quanh(36, 'awk');
            }
            if (T > 58){
                this.invulnAll = false;
                this.treo = 0;
                // Biến hình xong lập tức mở màn bằng Teleport chém hoặc Raikousen
                this.hetDon(CD.awaken, 'raikousen');
            }
            return true;
        }

        // =========================================================================
        // 1. Z-SABER COMBO (Hỗ trợ ngắt ở nhát thứ 2 để nối V-lên cực mượt)
        // =========================================================================
        if (A === 'combo'){
            if (T === 1) this.face();
            if (T === 6 || T === 17 || T === 30){
                this.vx = this.dir() * (this.black ? 5.2 : 4.2);
                this.tieng(720 + T * 8, 0.05);
            } else this.vx *= 0.76;

            if (T >= 6 && T < 12) this.chem(66, 52, 0, 'a');
            if (T >= 17 && T < 23){
                if (T === 17) this.face();
                this.chem(74, 40, 4, 'b');
            }
            // Nếu là `combo2` (lướt tới chém 2 cái đầu rồi nối V-lên), cancel ngay tại frame 24!
            if (this.comboCut && T >= 24){
                this.hetDon(CD.combo2);
                return true;
            }
            if (T >= 30 && T < 37){
                this.chem(84, 64, 2, 'c', -6);
                // Black Zero nhát thứ 3 bắn thêm kiếm khí nhỏ
                if (T === 31 && this.black){
                    this.dan.push({ k: 'kiemkhi', x: this.cx() + d * 28, y: this.cy(), vx: d * 9.5, vy: 0, r: 16, t: 0, hit: 0, dir: d });
                }
            }
            if (T > 42) this.hetDon(CD.combo);
        }

        // =========================================================================
        // 2. SHIPPUUGA — Lướt chém xé gió (Nối cực mượt vào 2 nhát đầu hoặc V-lên)
        // =========================================================================
        else if (A === 'shippuuga'){
            if (T === 1) this.face();
            if (T < 6){ this.vx = -this.dir() * 1.5; }
            else if (T < 22){
                this.vx = this.dir() * (this.black ? 15.5 : 13.8);
                if (T % 2 === 0) this.vetBong();
                this.chem(48, 56, -24, 's');
                if (this.khe() < 12 && T > 9) this.aT = 21; // Chạm tầm gần là phanh lại chém ngay
                if (this.x <= 8 || this.x >= canvas.width - this.w - 8) this.aT = 21;
            } else if (T === 22){
                this.vx = this.dir() * 3; this.face(); this.tieng(1200, 0.08);
            } else {
                this.vx *= 0.72;
                if (T < 29) this.chem(80, 54, 0, 'ket');
            }
            if (T > 32) this.hetDon(CD.shippuuga);
        }

        // =========================================================================
        // 3. RYUENJIN — Chém lửa V-Lên (Tự động nối Kuuenzan hoặc Hyouretsuzan ở đỉnh)
        // =========================================================================
        else if (A === 'ryuenjin'){
            if (T === 1) this.face();
            if (T < 5){ this.vx = 0; }
            else if (T === 5){
                this.vy = -15.8; this.grounded = false;
                this.vx = this.dir() * (this.gap() > 70 ? 4.4 : 2.8);
                this.tieng(240, 0.24, 'sawtooth');
                shakeTimer = Math.max(shakeTimer, 5);
            } else if (T < 27){
                this.quanh(14, 'r' + Math.floor(T / 7));
                for (let k = 0; k < 2; k++){
                    this.hat.push({
                        x: this.cx() + d * (14 + Math.random() * 12),
                        y: this.y - 16 + Math.random() * 38,
                        vx: (Math.random() - 0.5) * 2, vy: 1 + Math.random() * 2,
                        t: 0, song: 20, mau: Math.random() < 0.5 ? '#FF6D00' : '#FFD180', r: 4.5 + Math.random() * 3
                    });
                }
            }
            // Ngay khi đạt đỉnh nhảy (vy >= -1.5), chuyển mượt sang chiêu trên không tiếp theo!
            if (T >= 27 || (T > 8 && this.vy >= -1.5)){
                let ke = (this.hangDoi.length === 0 && this.gap() < 240) ? 'hyouretsuzan' : null;
                this.hetDon(CD.ryuenjin, ke);
            }
        }

        // =========================================================================
        // 4. KUUENZAN — Xoay kiếm bánh xe trên không (Chiêu Boss Cú X4)
        // =========================================================================
        else if (A === 'kuuenzan'){
            if (T === 1){
                this.face();
                if (this.grounded){ this.vy = -12.8; this.grounded = false; }
                else { this.vy = -7.5; } // Bật nhẹ thêm nhịp thứ 2 trên không (Kuuenbu)
                this.hat.push(...this.bui(6, '#B9F6CA'));
                this.tieng(920, 0.12);
            }
            if (T === 12 && this.vy > -2 && !this.grounded){
                this.vy = -8.0; this. tieng(980, 0.1);
            }
            // Lái bánh xe kiếm đuổi theo người chơi trên không
            let targetVx = ((dino.x + dino.w / 2) - this.cx()) * 0.09;
            this.vx = Math.max(-6.5, Math.min(6.5, targetVx));
            if (T > 3) this.quanh(20, 'k' + Math.floor(T / 8));

            // Nếu trong hàng đợi có Hyouretsuzan hoặc Sentsuizan thì chuyển ngay trên không!
            if (T >= 26 && this.hangDoi.length > 0 && !this.grounded){
                this.hetDon(CD.kuuenzan);
                return true;
            }
            if ((T > 14 && this.grounded) || T > 48){
                this.vx = 0;
                this.hetDon(CD.kuuenzan);
            }
        }

        // =========================================================================
        // 5. HYOURETSUZAN — Đâm kiếm băng khổng lồ V-Xuống
        // =========================================================================
        else if (A === 'hyouretsuzan'){
            if (T === 1){
                this.face();
                if (this.grounded){ this.vy = -14.5; this.grounded = false; this.D = 'len'; }
                else { this.D = 'treo'; this.aT = 18; } // Nối từ Ryuenjin / Kuuenzan thì treo đâm luôn!
            }
            if (this.D === 'len'){
                this.vx = Math.max(-5.5, Math.min(5.5, ((dino.x + dino.w / 2) - this.cx()) * 0.06));
                if (this.vy > -2.5){ this.vy = -8; this.D = 'treo'; this.aT = 18; this.hat.push(...this.bui(6, '#E1F5FE')); }
            } else if (this.D === 'treo'){
                this.treo = 1; this.vy = 0;
                this.vx = ((dino.x + dino.w / 2) - this.cx()) * 0.14;
                if (T >= 27){
                    this.D = 'dam'; this.treo = 0; this.vy = 18.5; this.vx *= 0.2;
                    this.tieng(1600, 0.12, 'triangle');
                }
            } else if (this.D === 'dam'){
                let box = { x: this.cx() - 22, y: this.y + this.h - 10, w: 44, h: 74 };
                if (!this.hit.has('h') && checkAABB(dino, box)){ this.hit.add('h'); this.hurtP(1); this.trungDon = true; }
                this.quanh(6, 'h2');
                if (this.grounded){
                    this.D = 'xong'; shakeTimer = Math.max(shakeTimer, 14); this.tieng(300, 0.2, 'square');
                    for (const dd of [-1, 1]) for (let k = 0; k < (this.black ? 3 : 2); k++)
                        this.dan.push({ k: 'bang', x: this.cx() + dd * 20, y: 320 - 12, vx: dd * (5.2 + k * 2.4), vy: 0, r: 12, t: 0, hit: 0 });
                    for (let k = 0; k < 12; k++)
                        this.hat.push({ x: this.cx() + (Math.random() - 0.5) * 64, y: 316, vx: (Math.random() - 0.5) * 5, vy: -2 - Math.random() * 4, t: 0, song: 24, mau: '#E1F5FE', r: 3.5 });
                    this.aT = 100;
                }
            }
            if (this.D === 'xong' && T > 110) this.hetDon(CD.hyouretsuzan);
            if (T > 190) this.hetDon(CD.hyouretsuzan);
        }

        // =========================================================================
        // 6. RAIJINGEKI — Chọc kiếm phóng luồng điện dài (Nối mượt sang Shippuuga)
        // =========================================================================
        else if (A === 'raijingeki'){
            if (T === 1) this.face();
            this.vx *= 0.6;
            if (T === 11){
                this.tiaSet = { x0: this.cx() + d * 28, y: this.y + this.h * 0.42, dai: 0, dir: d, t: 0, hit: 0, tim: this.black };
                this.tieng(1800, 0.26, 'sawtooth');
                shakeTimer = Math.max(shakeTimer, 6);
            }
            if (T > 30) this.hetDon(CD.raijingeki);
        }

        // =========================================================================
        // 7. HIENKYAKU — Lướt chém ngang trên không
        // =========================================================================
        else if (A === 'hienkyaku'){
            if (T === 1){ this.face(); this.treo = 1; }
            if (T < 16){ this.vy = 0; this.vx = d * 12.5; if (T % 2 === 0) this.vetBong(); this.chem(56, 52, -20, 'hk'); }
            else { this.treo = 0; this.vx *= 0.8; }
            if (T > 19) this.hetDon(CD.hienkyaku);
        }

        // =========================================================================
        // 8. RAKUHOUHA — Đấm đất phóng 9 cầu năng lượng (X4 Giga Attack)
        // =========================================================================
        else if (A === 'rakuhouha'){
            if (T === 1) this.face();
            this.vx *= 0.6;
            if (T === 22 || (T === 42 && this.black)){
                let lech = T === 42 ? Math.PI / 16 : 0;
                for (let i = 0; i < 9; i++){
                    let a = Math.PI + (i / 8) * Math.PI + lech;
                    this.dan.push({ k: 'orb', x: this.cx(), y: this.y + this.h - 10, vx: Math.cos(a) * 5.6, vy: Math.sin(a) * 5.6, r: 11, t: 0, hit: 0, tim: this.black });
                }
                shakeTimer = Math.max(shakeTimer, 16); this.tieng(140, 0.4, 'sawtooth');
            }
            if (T > 56) this.hetDon(CD.rakuhouha);
        }

        // =========================================================================
        // 9. [BLACK ZERO X5/X6] PHANTOM TELEPORT — Dịch chuyển tức thời đánh úp
        // =========================================================================
        else if (A === 'tele'){
            this.vx = 0; this.vy = 0; this.treo = 1;
            if (T === 1){
                this.tieng(1400, 0.12, 'sine');
                for (let i = 0; i < 5; i++) this.taoSetTim(this.cx(), this.cy(), 45);
                this.vetBong();
            }
            if (T === 10){
                // Dịch chuyển ra sau lưng người chơi (hoặc lên trên đầu nếu chiêu kế là Kuuenzan/Hyouretsuzan/Sentsuizan)
                let nextMove = this.hangDoi[0];
                let pDir = dino.isFacingLeft ? -1 : 1;
                if (nextMove === 'kuuenzan' || nextMove === 'hyouretsuzan' || nextMove === 'sentsuizan'){
                    this.x = Math.max(20, Math.min(canvas.width - this.w - 20, dino.x + (Math.random() - 0.5) * 40));
                    this.y = Math.max(40, dino.y - 115);
                    this.grounded = false;
                } else {
                    let targetX = dino.x - pDir * 68;
                    if (targetX < 20 || targetX > canvas.width - this.w - 20) targetX = dino.x + pDir * 68;
                    this.x = Math.max(16, Math.min(canvas.width - this.w - 16, targetX));
                    this.y = this.baseY;
                    this.grounded = true;
                }
                this.face();
                for (let i = 0; i < 6; i++) this.taoSetTim(this.cx(), this.cy(), 50);
                this.tieng(1650, 0.1, 'sine');
            }
            if (T >= 16){
                this.treo = 0;
                this.hetDon(CD.tele);
            }
        }

        // =========================================================================
        // 10. [BLACK ZERO X5] Z-BUSTER & GENMU — Bắn đạn đôi từ tay + Sóng kiếm khí
        // =========================================================================
        else if (A === 'zbuster'){
            if (T === 1) this.face();
            this.vx *= 0.5;
            this.tayBan = 10;
            // Phát 1 & 2: Đạn Z-Buster năng lượng tím-vàng bắn ra từ tay
            if (T === 10 || T === 22){
                this.face(); d = this.dir();
                this.tieng(540, 0.15, 'sawtooth');
                let by = (T === 10) ? this.y + 38 : this.y + 24;
                this.dan.push({ k: 'buster', x: this.cx() + d * 28, y: by, vx: d * 10.5, vy: 0, r: 12, t: 0, hit: 0, dir: d });
                this.taoSetTim(this.cx() + d * 28, by, 22);
            }
            // Phát 3 (T = 36): Chém vung Z-Saber phóng Kiếm khí bán nguyệt khổng lồ (Twin Dream / Genmu)
            if (T === 36){
                this.face(); d = this.dir();
                this.tieng(320, 0.28, 'sawtooth');
                shakeTimer = Math.max(shakeTimer, 10);
                this.dan.push({ k: 'kiemkhi', x: this.cx() + d * 32, y: this.cy() - 4, vx: d * 11.5, vy: 0, r: 26, t: 0, hit: 0, dir: d });
            }
            if (T > 50) this.hetDon(CD.zbuster);
        }

        // =========================================================================
        // 11. [BLACK ZERO X5] RAIKOUSEN — Hóa thành tia chớp tím cắt ngang màn hình
        // =========================================================================
        else if (A === 'raikousen'){
            if (T === 1){
                this.face();
                this.tieng(1950, 0.25, 'sawtooth');
                for (let i = 0; i < 5; i++) this.taoSetTim(this.cx(), this.cy(), 45);
            }
            this.vx = 0;
            if (T === 11){
                let startX = this.cx(), startY = this.cy();
                let dist = 250 * d;
                let endX = Math.max(24, Math.min(canvas.width - 24, startX + dist));
                this.x = endX - this.w / 2;
                // Tạo đường chớp zig-zag nối từ vị trí cũ sang vị trí mới
                let segs = [];
                for (let i = 0; i <= 10; i++){
                    let px = startX + (endX - startX) * (i / 10);
                    let py = startY + (i === 0 || i === 10 ? 0 : (Math.random() - 0.5) * 44);
                    segs.push([px, py]);
                }
                this.vachKiem.push({ pts: segs, t: 16 });
                // Kiểm tra sát thương toàn vùng lướt qua
                let minX = Math.min(startX, endX), maxX = Math.max(startX, endX);
                if (checkAABB(dino, { x: minX, y: this.y - 10, w: maxX - minX, h: this.h + 20 })){
                    this.hurtP(1); this.trungDon = true;
                }
                shakeTimer = Math.max(shakeTimer, 10);
            }
            if (T > 24){
                this.face();
                this.hetDon(CD.raikousen);
            }
        }

        // =========================================================================
        // 12. [BLACK ZERO X6] SENTSUIZAN — Nhảy đâm kiếm lao chéo 45 độ tốc độ cao
        // =========================================================================
        else if (A === 'sentsuizan'){
            if (T === 1){
                this.face();
                if (this.grounded){ this.vy = -13.5; this.grounded = false; this.D = 'nhay'; }
                else { this.D = 'lao'; this.aT = 12; }
            }
            if (this.D === 'nhay' && T >= 12){
                this.D = 'lao'; this.face();
            }
            if (this.D === 'lao'){
                this.vx = this.dir() * 14.5;
                this.vy = 13.5;
                if (T % 2 === 0) this.vetBong();
                this.quanh(14, 'stz');
                if (this.grounded){
                    this.vx = 0;
                    shakeTimer = Math.max(shakeTimer, 12);
                    this.tieng(360, 0.18, 'square');
                    this.hat.push(...this.bui(10, '#EA80FC'));
                    this.hetDon(CD.sentsuizan, 'combo2');
                    return true;
                }
            }
            if (T > 45) this.hetDon(CD.sentsuizan);
        }

        // =========================================================================
        // 13. [BLACK ZERO X6] REKKOHA — Đập đất triệu hồi mưa cột trụ ánh sáng
        // =========================================================================
        else if (A === 'rekkoha'){
            if (T === 1) this.face();
            this.vx = 0;
            if (T < 20 && T % 3 === 0) this.taoSetTim(this.cx(), this.cy(), 50);
            if (T === 20){
                shakeTimer = Math.max(shakeTimer, 22);
                this.tieng(160, 0.5, 'sawtooth');
                // Triệu hồi 6 cột sáng Rekkoha giáng từ đỉnh màn hình xuống
                let count = 6;
                let spacing = (canvas.width - 100) / (count - 1);
                let offset = (Math.random() - 0.5) * 35;
                for (let i = 0; i < count; i++){
                    let bx = Math.max(35, Math.min(canvas.width - 35, 50 + i * spacing + offset));
                    this.dan.push({ k: 'rekkoha', x: bx, y: -120 - i * 35, vx: 0, vy: 15, r: 20, t: 0, hit: 0 });
                }
            }
            if (T > 55) this.hetDon(CD.rekkoha);
        }

        else this.hetDon(60);
        return true;
    }

    /* Khi Công Pháo: ngắt hành động / thổi đạn */
    acNgat(){
        if (this.aS === 'khong' || this.aS === 'awaken') return false;
        this.aS = 'khong'; this.aT = 0; this.treo = 0; this.hangDoi = []; this.chuoiDai = 0;
        this.kiem = this.black ? 'den' : 'thuong';
        this.aNghi = 28; this.tiaSet = null; return true;
    }
    acDan(B, trong){
        for (let i = this.dan.length - 1; i >= 0; i--){
            let b = this.dan[i];
            if (!trong(b.x, b.y)) continue;
            this.dan.splice(i, 1);
            if ((B.cap || 1) >= 3 && typeof cusAcThoiVat === 'function') cusAcThoiVat(b.x, b.y, b.r, 2, B.dir, (x, y) => this.veDan(Object.assign({}, b, { x: x, y: y })));
            else visualEffects.push(new Effect(b.x, b.y, 'explosion', true, 12));
        }
    }

    update(){
        this.toc++;
        if (this.gatT > 0) this.gatT--;

        // Black Zero thi thoảng phát tia sét tím quanh cơ thể
        if (this.black && this.toc % 9 === 0 && Math.random() < 0.65){
            this.taoSetTim(this.cx() + (Math.random() - 0.5) * 26, this.cy() + (Math.random() - 0.5) * 44, 24 + Math.random() * 18);
        }

        // ---- Cập nhật đạn / Kiếm khí / Trụ sáng ----
        for (let i = this.dan.length - 1; i >= 0; i--){
            let b = this.dan[i]; b.t++;
            b.x += b.vx; b.y += b.vy;
            let hitBox = b.k === 'rekkoha'
                ? { x: b.x - 16, y: b.y - 90, w: 32, h: 110 }
                : b.k === 'kiemkhi'
                ? { x: b.x - 18, y: b.y - 34, w: 36, h: 68 }
                : { x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 };

            if (!b.hit && checkAABB(dino, hitBox)){
                b.hit = 1;
                if (typeof voidBat === 'function' && voidBat() && dino.isShielding() && typeof voidPhanRa === 'function')
                    voidPhanRa(b.x, b.y, b, function(bb){ this.veDan(bb); }.bind(this));
                else this.hurtP(1);
                if (b.k !== 'rekkoha' && b.k !== 'kiemkhi'){ this.dan.splice(i, 1); continue; }
            }
            if (b.t > 160 || b.x < -60 || b.x > canvas.width + 60 || b.y > 420 || b.y < -320) this.dan.splice(i, 1);
        }

        for (let i = this.hat.length - 1; i >= 0; i--){
            let p = this.hat[i]; p.t++; p.x += p.vx; p.y += p.vy; p.vy += 0.08;
            if (p.t > p.song) this.hat.splice(i, 1);
        }
        for (let i = this.vet.length - 1; i >= 0; i--) if (--this.vet[i].t <= 0) this.vet.splice(i, 1);
        for (let i = this.setTim.length - 1; i >= 0; i--) if (--this.setTim[i].t <= 0) this.setTim.splice(i, 1);
        for (let i = this.vachKiem.length - 1; i >= 0; i--) if (--this.vachKiem[i].t <= 0) this.vachKiem.splice(i, 1);

        // ---- Tia điện Raijingeki ----
        if (this.tiaSet){
            let S = this.tiaSet; S.t++;
            S.x0 = this.cx() + this.dir() * 30; S.y = this.y + this.h * 0.42; S.dir = this.dir();
            let maxD = S.tim ? 310 : 260;
            S.dai = S.t < 5 ? S.t * 55 : S.t < 19 ? maxD : Math.max(0, maxD - (S.t - 19) * 45);
            let x1 = S.dir > 0 ? S.x0 : S.x0 - S.dai;
            if (S.t <= 19 && !S.hit && checkAABB(dino, { x: x1, y: S.y - 18, w: S.dai, h: 36 })){
                S.hit = 1; this.hurtP(1); this.trungDon = true;
            }
            if (S.t > 24) this.tiaSet = null;
        }

        if (this.state === 'intro'){
            if (this.actionTimer === 64) floatingTexts.push(new FloatingText(this.x - 10, this.y - 30, 'ZERO'));
            if (--this.actionTimer <= 0) this.state = 'danh';
            return;
        }

        this.docKhien = (dino.isShielding && dino.isShielding()) ? this.docKhien + 1 : 0;

        // CHÉM ĐẠN khi rảnh tay
        if (typeof projectiles !== 'undefined' && this.gatT <= 0 && this.aS === 'khong'){
            let tam = this.tenkuu ? 120 : 84;
            for (let i = projectiles.length - 1; i >= 0; i--){
                let pr = projectiles[i];
                if (!pr || pr.owner === 2) continue;
                let dx = (pr.x + (pr.w || 8) / 2) - this.cx();
                if (dx * this.dir() < 0 || Math.abs(dx) > tam) continue;
                if (Math.abs((pr.y + (pr.h || 8) / 2) - this.cy()) > 52) continue;
                projectiles.splice(i, 1); this.gatT = this.tenkuu ? 12 : 20; this.docBan++;
                this.goc = -2.2;
                visualEffects.push(new Effect(this.cx() + this.dir() * 30, this.cy(), 'parry', false));
                break;
            }
        }

        if (this.aS === 'khong') this.face();
        let ban = this.tickDon();
        if (this.aS === 'khong' && !ban) this.tickDi();

        // ===== Vật lý =====
        if (!this.treo && (!this.grounded || this.y < this.baseY)){
            this.vy += 0.72; this.y += this.vy;
            if (this.y >= this.baseY){ this.y = this.baseY; this.vy = 0; this.grounded = true; this.nhayKep = 0; }
            else this.grounded = false;
        } else if (this.treo){
            this.y += this.vy; this.grounded = false;
        }
        this.x += this.vx;
        this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x));
        if (this.y < -60){ this.y = -60; if (this.vy < 0) this.vy = 0; }
        this.goc = this.gocDon();
    }

    gocDon(){
        let A = this.aS, t = this.aT;
        const lerp = (a, b, k) => a + (b - a) * Math.max(0, Math.min(1, k));
        if (A === 'combo'){
            if (t < 6) return lerp(-0.4, -2.2, t / 6);
            if (t < 12) return lerp(-2.2, 1.0, (t - 6) / 6);
            if (t < 17) return lerp(1.0, 1.4, (t - 12) / 5);
            if (t < 23) return lerp(1.4, -1.0, (t - 17) / 6);
            if (t < 30) return lerp(-1.0, -2.6, (t - 23) / 7);
            if (t < 37) return lerp(-2.6, 1.4, (t - 30) / 7);
            return 1.4;
        }
        if (A === 'shippuuga') return t < 6 ? -2.5 : t < 22 ? 0.05 : lerp(0.05, 1.25, (t - 22) / 5);
        if (A === 'ryuenjin') return t < 5 ? 0.85 : -1.52;
        if (A === 'hyouretsuzan') return this.D === 'dam' || this.D === 'xong' ? 1.57 : -1.2;
        if (A === 'sentsuizan') return 0.78; // Chéo 45 độ hướng xuống
        if (A === 'raijingeki') return t < 11 ? lerp(0, -2.8, t / 11) : 0;
        if (A === 'kuuenzan') return this.toc * 0.62;
        if (A === 'hienkyaku') return t < 16 ? 0.1 : 0.9;
        if (A === 'rakuhouha' || A === 'rekkoha') return t < 20 ? -2.4 : 1.4;
        if (A === 'zbuster') return t < 32 ? -2.2 : lerp(-2.4, 1.3, (t - 32) / 8);
        if (A === 'awaken') return -1.8;
        if (this.mS === 'luot' || this.mS === 'luotlui') return -0.2;
        if (this.gatT > 10) return lerp(-2.2, 0.9, (20 - this.gatT) / 10);
        return -0.35 + Math.sin(this.toc * 0.06) * 0.08;
    }

    veDan(b){
        ctx.save();
        if (b.k === 'orb'){
            let g = ctx.createRadialGradient(b.x, b.y, 1, b.x, b.y, b.r * 1.6);
            g.addColorStop(0, "#FFFFFF");
            g.addColorStop(0.45, b.tim ? "rgba(213,0,249,0.9)" : "rgba(255,138,101,0.9)");
            g.addColorStop(1, b.tim ? "rgba(74,20,140,0)" : "rgba(213,0,0,0)");
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 1.6, 0, Math.PI * 2); ctx.fill();
        } else if (b.k === 'bang'){
            ctx.fillStyle = "#80DEEA"; ctx.strokeStyle = "#00838F"; ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(b.x - 13, 320); ctx.lineTo(b.x - 5, 320 - 25);
            ctx.lineTo(b.x + 2, 320 - 14); ctx.lineTo(b.x + 9, 320 - 28);
            ctx.lineTo(b.x + 14, 320); ctx.closePath(); ctx.fill(); ctx.stroke();
        } else if (b.k === 'buster'){
            // Đạn Z-Buster của Black Zero
            ctx.globalCompositeOperation = 'lighter';
            let g = ctx.createRadialGradient(b.x, b.y, 2, b.x, b.y, 18);
            g.addColorStop(0, '#FFFFFF'); g.addColorStop(0.5, '#EA80FC'); g.addColorStop(1, 'rgba(170,0,255,0)');
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.ellipse(b.x, b.y, 18, 10, 0, 0, Math.PI * 2); ctx.fill();
        } else if (b.k === 'kiemkhi'){
            // Sóng kiếm khí bán nguyệt khổng lồ (Genmu / Twin Dream)
            ctx.globalCompositeOperation = 'lighter';
            ctx.translate(b.x, b.y); ctx.scale(b.dir || 1, 1);
            ctx.fillStyle = 'rgba(213, 0, 249, 0.75)';
            ctx.beginPath();
            ctx.arc(0, 0, 34, -Math.PI * 0.48, Math.PI * 0.48);
            ctx.quadraticCurveTo(10, 0, 0, -34);
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 3; ctx.stroke();
        } else if (b.k === 'rekkoha'){
            // Cột trụ ánh sáng Rekkoha từ trời giáng xuống
            ctx.globalCompositeOperation = 'lighter';
            let g = ctx.createLinearGradient(b.x - 18, 0, b.x + 18, 0);
            g.addColorStop(0, 'rgba(170,0,255,0)');
            g.addColorStop(0.5, 'rgba(255,255,255,0.95)');
            g.addColorStop(1, 'rgba(170,0,255,0)');
            ctx.fillStyle = g;
            ctx.fillRect(b.x - 18, b.y - 100, 36, 120);
        }
        ctx.restore();
    }

    /* ============================================================================
     * veThan — NGOẠI HÌNH MECHA / CYBORG ZERO X4 & BLACK ZERO ĐỈNH CAO
     * ============================================================================ */
    veThan(x, y, trai, goc, kiem, bong, isBlack){
        let W = this.w, H = this.h, cx = x + W / 2, cy = y + H / 2, d = trai ? -1 : 1;
        let blk = isBlack !== undefined ? isBlack : this.black;
        let [k1, k2] = bong ? (blk ? ['#CE93D8', '#FFFFFF'] : ['#80DEEA', '#FFFFFF']) : (ZX_KIEM[kiem] || ZX_KIEM.thuong);
        if (!bong && this.tenkuu && (kiem === 'thuong' || kiem === 'den')){ k1 = ZX_KIEM.tim[0]; k2 = ZX_KIEM.tim[1]; }

        ctx.save();
        ctx.translate(cx, cy); ctx.scale(d, 1); ctx.translate(-cx, -cy);

        let xoay = !bong && this.aS === 'kuuenzan';
        if (xoay){ ctx.translate(cx, cy); ctx.rotate(this.toc * 0.58); ctx.translate(-cx, -cy); }

        let luot = !bong && (this.mS === 'luot' || this.mS === 'luotlui' || (this.aS === 'shippuuga' && this.aT >= 6 && this.aT < 22) || (this.aS === 'hienkyaku' && this.aT < 16));
        if (luot){ ctx.translate(cx, cy); ctx.rotate(0.24); ctx.translate(-cx, -cy); }

        let ngoi = !bong && ((this.aS === 'ryuenjin' && this.aT < 5) || ((this.aS === 'rakuhouha' || this.aS === 'rekkoha') && this.aT < 20) || (this.aS === 'shippuuga' && this.aT < 6));
        let ty = y + (ngoi ? 9 : 0);
        let buoc = bong ? 0 : Math.sin(this.chan), cxx = x + W / 2;

        // --- BẢNG MÀU ZERO X4 vs BLACK ZERO ---
        const GIAP_CHINH = bong ? (blk ? '#7B1FA2' : '#4FC3F7') : (blk ? '#1A162B' : '#D32F2F');
        const GIAP_SANG  = bong ? '#E1F5FE' : (blk ? '#311B92' : '#FF5252');
        const GIAP_TRANG = bong ? '#E1F5FE' : (blk ? '#FFD600' : '#ECEFF1'); // Cầu vai/mũ: Trắng (X4) hoặc Vàng Kim (Black Zero)
        const KHUNG_CO   = bong ? '#90A4AE' : '#121824';
        const NGOC_NGUC  = blk ? '#FF1744' : '#00E676'; // Hai bầu ngực xanh lá (X4) / đỏ (Black Zero)
        const NGOC_TRAN  = blk ? '#D500F9' : '#00E5FF';

        const daGiac = (pts, fill, stroke, lw = 1.1) => {
            ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
            for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
            ctx.closePath();
            if (fill){ ctx.fillStyle = fill; ctx.fill(); }
            if (stroke && !bong){ ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
        };

        // 1. MÁI TÓC VÀNG HUYỀN THOẠI CỦA ZERO (Multi-layered flowing anime hair)
        if (!bong){
            let bay = luot ? 18 : Math.min(14, Math.abs(this.vx) * 1.4);
            let w1 = Math.sin(this.toc * 0.16) * 7, w2 = Math.cos(this.toc * 0.14) * 6;
            ctx.save();
            ctx.fillStyle = blk ? '#FFF176' : '#FFD54F';
            ctx.strokeStyle = '#F57F17'; ctx.lineWidth = 1.2;
            // Lọn tóc lớn chính
            ctx.beginPath();
            ctx.moveTo(cxx - 6, ty + 14);
            ctx.quadraticCurveTo(cxx - 28 - bay, ty + 20 + w1, cxx - 46 - bay * 1.4, ty + 48 + w2 - bay * 0.5);
            ctx.quadraticCurveTo(cxx - 30 - bay, ty + 44 + w1, cxx - 20 - bay * 0.6, ty + 62 + w2);
            ctx.quadraticCurveTo(cxx - 14 - bay * 0.3, ty + 38, cxx - 4, ty + 22);
            ctx.closePath(); ctx.fill(); ctx.stroke();
            // Lọn tóc phụ sắc nhọn bên trên
            ctx.fillStyle = '#FFECB3';
            ctx.beginPath();
            ctx.moveTo(cxx - 8, ty + 13);
            ctx.quadraticCurveTo(cxx - 26 - bay, ty + 12 + w2, cxx - 38 - bay * 1.2, ty + 28 + w1 - bay * 0.4);
            ctx.quadraticCurveTo(cxx - 22 - bay * 0.5, ty + 24, cxx - 6, ty + 18);
            ctx.closePath(); ctx.fill();
            ctx.restore();
        }

        // 2. CHÂN & ỦNG CHIẾN ĐẤU MECHA (Zero's Knee-Guard Boots)
        for (const ben of [-1, 1]){
            let gg = buoc * ben * (Math.abs(this.vx) > 0.6 ? 1 : 0.2);
            let hX = cxx + ben * 5, hY = ty + 44;
            let kX = hX + gg * 7 + ben * 2, kY = ty + 58;
            let uX = hX + gg * 13 + ben * 3, uY = ty + H - 2;

            // Đùi carbon đen
            ctx.strokeStyle = KHUNG_CO; ctx.lineWidth = 6.5; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(hX, hY); ctx.lineTo(kX, kY); ctx.stroke();

            // Ủng giáp góc cạnh có mũi nhọn ở đầu gối
            daGiac([
                [kX - 5, kY - 4], [kX + 6, kY - 6],
                [uX + 9, uY - 8], [uX + 13, uY],
                [uX - 8, uY], [uX - 6, uY - 12]
            ], GIAP_CHINH, '#0D1528', 1.2);

            // Ốp gối trắng/vàng + sọc sáng
            if (!bong){
                daGiac([[kX - 4, kY - 5], [kX + 5, kY - 6], [kX + 4, kY + 1], [kX - 3, kY + 1]], GIAP_TRANG);
                ctx.fillStyle = GIAP_SANG;
                ctx.fillRect(uX - 4, uY - 12, 8, 5);
            }
        }

        // 3. THÂN TRÊN, ĐAI HÔNG & HAI LÕI NĂNG LƯỢNG TRƯỚC NGỰC (Zero's Iconic Chest)
        // Khung bụng cơ khí
        daGiac([[cxx - 9, ty + 32], [cxx + 9, ty + 32], [cxx + 7, ty + 45], [cxx - 7, ty + 45]], KHUNG_CO);
        // Đai hông (Belt)
        daGiac([[cxx - 12, ty + 41], [cxx + 12, ty + 41], [cxx + 10, ty + 47], [cxx - 10, ty + 47]], GIAP_CHINH, '#0D1528', 1);
        if (!bong){ ctx.fillStyle = GIAP_TRANG; ctx.fillRect(cxx - 4, ty + 42, 8, 3); }

        // Giáp ngực chữ V viền vàng/trắng
        daGiac([[cxx - 15, ty + 20], [cxx + 15, ty + 20], [cxx + 11, ty + 37], [cxx - 11, ty + 37]], GIAP_CHINH, '#0D1528', 1.2);
        daGiac([[cxx - 12, ty + 21], [cxx + 12, ty + 21], [cxx + 9, ty + 26], [cxx - 9, ty + 26]], GIAP_TRANG);

        // 2 Viên ngọc năng lượng trước ngực đặc trưng của Zero
        if (!bong){
            ctx.save(); ctx.shadowColor = NGOC_NGUC; ctx.shadowBlur = 5;
            ctx.fillStyle = NGOC_NGUC;
            ctx.beginPath(); ctx.arc(cxx - 5, ty + 30, 3.2, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(cxx + 5, ty + 30, 3.2, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(cxx - 6, ty + 28.5, 1.5, 1.5); ctx.fillRect(cxx + 4, ty + 28.5, 1.5, 1.5);
            ctx.restore();
        }

        // 4. CẦU VAI "Z" (Zero's Pauldrons)
        for (const side of [-1, 1]){
            let vx = cxx + side * 16;
            daGiac([
                [vx - 8, ty + 18], [vx + 8, ty + 18],
                [vx + 10 * side, ty + 29], [vx - 6 * side, ty + 28]
            ], GIAP_CHINH, GIAP_TRANG, 1.4);
            if (!bong){
                ctx.fillStyle = '#FFD600';
                ctx.fillRect(vx - 3, ty + 22, 6, 2.5);
            }
        }

        // 5. ĐẦU, MẶT ANIME & MŨ BẢO HIỂM SỪNG TRẮNG/VÀNG (Zero Helmet)
        // Khuôn mặt
        ctx.fillStyle = '#FFE0B2';
        ctx.fillRect(cxx - 4, ty + 6, 12, 11);
        // Mắt sắc lạnh (Xanh lam ở X4, Đỏ rực ở Black Zero)
        if (!bong){
            ctx.fillStyle = '#FFFFFF'; ctx.fillRect(cxx + 2, ty + 9, 6, 4);
            ctx.fillStyle = blk ? '#FF1744' : '#00B0FF'; ctx.fillRect(cxx + 4, ty + 9.5, 3.5, 3.5);
            ctx.fillStyle = '#121824'; ctx.fillRect(cxx + 1, ty + 8, 7, 1.5); // Lông mày
        }
        // Vòm mũ chính
        daGiac([[cxx - 11, ty + 13], [cxx - 11, ty + 3], [cxx + 2, ty + 1], [cxx + 10, ty + 7], [cxx + 2, ty + 9], [cxx - 6, ty + 14]], GIAP_CHINH, '#0D1528', 1.1);
        // Cặp sừng chữ V sắc nhọn vươn lên trời của Zero
        daGiac([[cxx - 7, ty + 3], [cxx - 19, ty - 9], [cxx - 2, ty - 1]], GIAP_TRANG, '#0D1528', 1);
        daGiac([[cxx + 1, ty + 2], [cxx + 15, ty - 11], [cxx + 9, ty + 4]], GIAP_TRANG, '#0D1528', 1);
        // Ngọc trán hình thoi phát sáng
        if (!bong){
            ctx.save(); ctx.shadowColor = NGOC_TRAN; ctx.shadowBlur = 6;
            daGiac([[cxx + 2, ty + 2], [cxx + 7, ty - 2], [cxx + 9, ty + 4], [cxx + 4, ty + 6]], NGOC_TRAN);
            ctx.restore();
        }
        // Tai nghe cơ khí
        ctx.fillStyle = GIAP_TRANG; ctx.beginPath(); ctx.arc(cxx - 5, ty + 11, 3.5, 0, Math.PI * 2); ctx.fill();

        // 6. TAY SAU (Hoặc tay bắn Z-Buster của Black Zero)
        ctx.strokeStyle = KHUNG_CO; ctx.lineWidth = 5.5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(cxx - 14, ty + 25);
        if (!bong && (this.aS === 'rakuhouha' || this.aS === 'rekkoha') && this.aT >= 20){
            ctx.lineTo(cxx + 4, ty + H - 4);
            ctx.stroke();
        } else if (!bong && this.tayBan > 0){
            // Nòng pháo Z-Buster đưa ra phía trước
            ctx.lineTo(cxx + 24, ty + 28); ctx.stroke();
            daGiac([[cxx + 16, ty + 23], [cxx + 32, ty + 23], [cxx + 32, ty + 33], [cxx + 16, ty + 33]], GIAP_CHINH, GIAP_TRANG, 1.2);
            ctx.fillStyle = '#D500F9'; ctx.beginPath(); ctx.arc(cxx + 32, ty + 28, 3.5, 0, Math.PI * 2); ctx.fill();
        } else {
            ctx.lineTo(cxx - 19 - buoc * 5, ty + 41); ctx.stroke();
            ctx.fillStyle = GIAP_TRANG; ctx.beginPath(); ctx.arc(cxx - 19 - buoc * 5, ty + 42, 4, 0, Math.PI * 2); ctx.fill();
        }

        // 7. TAY CẦM KIẾM & THANH Z-SABER PLASMA HUYỀN THOẠI
        let hx = cxx + 12, hy = ty + 33;
        let dai = kiem === 'bang' && (this.D === 'dam' || this.D === 'xong') ? 98 : kiem === 'lua' ? 78 : 70;
        ctx.strokeStyle = KHUNG_CO; ctx.lineWidth = 6;
        ctx.beginPath(); ctx.moveTo(cxx + 14, ty + 25); ctx.lineTo(hx + Math.cos(goc) * 7, hy + Math.sin(goc) * 7); ctx.stroke();

        // Vệt quét cong của lưỡi kiếm (Motion Blur Sword Arc)
        if (!bong && Math.abs(goc - this.gocKiem) > 0.05 && Math.abs(goc - this.gocKiem) < 4){
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.globalAlpha = 0.42; ctx.fillStyle = k1;
            ctx.beginPath(); ctx.moveTo(hx, hy);
            for (let q = 0; q <= 12; q++){
                let a = this.gocKiem + (goc - this.gocKiem) * (q / 12);
                ctx.lineTo(hx + Math.cos(a) * (dai + 8), hy + Math.sin(a) * (dai + 8));
            }
            ctx.closePath(); ctx.fill();
            ctx.restore();
        }
        if (!bong) this.gocKiem = goc;

        // Vẽ chuôi kiếm & lưỡi kiếm Z-Saber
        ctx.save(); ctx.translate(hx, hy); ctx.rotate(goc);
        // Chuôi kiếm công nghệ cao
        ctx.fillStyle = '#263238'; ctx.fillRect(-10, -3.5, 13, 7);
        ctx.fillStyle = '#FFD600'; ctx.fillRect(2, -6.5, 5, 13);

        if (kiem === 'bang' && (this.D === 'dam' || this.D === 'xong')){
            // Đại kiếm Băng Hyouretsuzan khổng lồ
            ctx.fillStyle = 'rgba(128, 222, 234, 0.92)'; ctx.strokeStyle = '#00ACC1'; ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(6, -10); ctx.lineTo(6 + dai * 0.72, -14); ctx.lineTo(6 + dai, 0);
            ctx.lineTo(6 + dai * 0.72, 14); ctx.lineTo(6, 10); ctx.closePath();
            ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#FFFFFF'; ctx.fillRect(10, -3.5, dai * 0.65, 7);
        } else {
            // Hào quang lưỡi kiếm Z-Saber Plasma
            ctx.save();
            if (!bong) ctx.globalCompositeOperation = 'lighter';
            ctx.globalAlpha = 0.45; ctx.fillStyle = k1;
            ctx.beginPath();
            ctx.moveTo(6, -9); ctx.lineTo(6 + dai * 0.85, -6); ctx.lineTo(6 + dai + 6, 0);
            ctx.lineTo(6 + dai * 0.85, 6); ctx.lineTo(6, 9); ctx.closePath(); ctx.fill();

            ctx.globalAlpha = 0.95; ctx.fillStyle = k2;
            ctx.beginPath();
            ctx.moveTo(6, -4.5); ctx.lineTo(6 + dai, -1.5); ctx.lineTo(6 + dai + 3, 0);
            ctx.lineTo(6 + dai, 1.5); ctx.lineTo(6, 4.5); ctx.closePath(); ctx.fill();

            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(6, -1.8, dai - 5, 3.6);
            ctx.restore();

            // Hiệu ứng Lửa Ryuenjin trên lưỡi kiếm
            if (kiem === 'lua' && !bong){
                for (let k = 0; k < 6; k++){
                    let xx = 10 + k * 11, h = 7 + Math.random() * 13;
                    ctx.fillStyle = k % 2 ? '#FFE082' : '#FF6D00';
                    ctx.beginPath(); ctx.moveTo(xx - 4, -4); ctx.lineTo(xx, -4 - h); ctx.lineTo(xx + 4, -4); ctx.fill();
                    ctx.beginPath(); ctx.moveTo(xx - 4, 4); ctx.lineTo(xx, 4 + h * 0.6); ctx.lineTo(xx + 4, 4); ctx.fill();
                }
            }
            // Hiệu ứng Điện Raijingeki / Black Zero trên lưỡi kiếm
            if ((kiem === 'dien' || blk) && !bong){
                ctx.strokeStyle = blk ? '#EA80FC' : '#FFF59D'; ctx.lineWidth = 1.6;
                ctx.beginPath(); ctx.moveTo(6, 0);
                for (let q = 1; q <= 6; q++) ctx.lineTo(6 + q * dai / 6, (Math.random() - 0.5) * 14);
                ctx.stroke();
            }
        }
        ctx.restore();
        ctx.restore();
    }

    draw(){
        // 1. Dư ảnh lướt (Afterimages)
        for (const v of this.vet){
            ctx.save(); ctx.globalAlpha = v.t / 22;
            this.veThan(v.x, v.y, v.trai, v.goc, v.kiem, true, v.black);
            ctx.restore();
        }
        // 2. Hạt lửa / băng / năng lượng
        for (const p of this.hat){
            ctx.save(); ctx.globalAlpha = Math.max(0, 1 - p.t / p.song); ctx.fillStyle = p.mau;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        }
        // 3. Đạn, Kiếm khí & Cột trụ sáng Rekkoha
        for (const b of this.dan) this.veDan(b);

        // 4. Vạch chớp tím Raikousen cắt ngang màn hình
        for (const vk of this.vachKiem){
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            ctx.strokeStyle = 'rgba(213, 0, 249, 0.85)'; ctx.lineWidth = vk.t * 0.9;
            ctx.beginPath(); ctx.moveTo(vk.pts[0][0], vk.pts[0][1]);
            for (let i = 1; i < vk.pts.length; i++) ctx.lineTo(vk.pts[i][0], vk.pts[i][1]);
            ctx.stroke();
            ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2.5; ctx.stroke();
            ctx.restore();
        }

        // 5. Tia điện Raijingeki
        if (this.tiaSet && this.tiaSet.dai > 0){
            let S = this.tiaSet, x1 = S.dir > 0 ? S.x0 : S.x0 - S.dai;
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = S.tim ? 'rgba(213,0,249,0.28)' : 'rgba(255,238,88,0.25)';
            ctx.fillRect(x1, S.y - 16, S.dai, 32);
            for (let n = 0; n < 3; n++){
                ctx.strokeStyle = n === 0 ? '#FFFFFF' : (S.tim ? '#EA80FC' : '#FFF176');
                ctx.lineWidth = n === 0 ? 3.2 : 2;
                ctx.beginPath(); ctx.moveTo(S.x0, S.y);
                for (let q = 1; q <= 10; q++) ctx.lineTo(S.x0 + S.dir * q * S.dai / 10, S.y + (Math.random() - 0.5) * (n === 0 ? 12 : 26));
                ctx.stroke();
            }
            ctx.restore();
        }

        // 6. Vòng tụ năng lượng Rakuhouha / Rekkoha / Awaken
        if (((this.aS === 'rakuhouha' || this.aS === 'rekkoha') && this.aT < 20) || this.aS === 'awaken'){
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            let r = this.aS === 'awaken' ? 28 + Math.sin(this.toc * 0.5) * 14 : 42 - this.aT * 1.5;
            ctx.strokeStyle = this.black || this.aS === 'awaken' ? 'rgba(213,0,249,0.85)' : 'rgba(255,138,101,0.85)';
            ctx.lineWidth = 3.5;
            ctx.beginPath(); ctx.arc(this.cx(), this.cy(), Math.max(5, r), 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
        }

        // 7. Vẽ thân Zero / Black Zero
        this.veThan(this.x, this.y, this.facingLeft, this.goc, this.kiem, false, this.black);

        // 8. Tia sét tím giật quanh cơ thể Zero khi thức tỉnh & ở dạng Black Zero
        if (this.setTim.length > 0){
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            for (const st of this.setTim){
                ctx.strokeStyle = '#D500F9'; ctx.lineWidth = 3.5;
                ctx.beginPath(); ctx.moveTo(st.pts[0][0], st.pts[0][1]);
                for (let i = 1; i < st.pts.length; i++) ctx.lineTo(st.pts[i][0], st.pts[i][1]);
                ctx.stroke();
                ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1.4; ctx.stroke();
            }
            ctx.restore();
        }

        // 9. Thanh máu Boss trên đỉnh màn hình
        if (typeof drawTopBossBar === 'function'){
            drawTopBossBar(
                this,
                this.black ? '#AA00FF' : '#EF5350',
                this.black ? 'BLACK ZERO — AWAKENED' : 'ZERO'
            );
        }
    }
}
// BOSS_PART_END s0.ZeroBoss.1

// Nguồn: index.html:100017 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:100028 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
