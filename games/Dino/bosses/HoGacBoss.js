// BOSS_FILE: HoGacBoss
// BOSS_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, IaiRaptorBoss, IceFangBoss, IndominusBoss, LT, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bosses, canvas, checkAABB, ctx, dealDamage, dino, dojoMode, floatingTexts, frames, parry, shakeTimer, visualEffects, worldL, worldR
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

// Nguồn: index.html:99448 · Dùng bởi: HoGacBoss
// BOSS_PART_BEGIN s6.HG_W.1 EDITABLE
const HG_W = 74, HG_H = 96, HG_P1 = 110, HG_P2 = 130, HG_PHU = 36, HG_DOI = 8, HG_VE = 2.35;
// BOSS_PART_END s6.HG_W.1

// Nguồn: index.html:99449 · Dùng bởi: HoGacBoss
// BOSS_PART_BEGIN s6.HoGacBoss.1 EDITABLE
class HoGacBoss {
            constructor(level, phu, phan){
                this.phu = !!phu;
                this.phan = phan || 'ta';
                this.w = HG_W; this.h = HG_H;
                this.baseY = 320 - this.h;
                this.x = this.phu ? 70 : (canvas.width - 180);
                this.y = this.baseY;
                this.facingLeft = !this.phu;
                this.grounded = true;
                this.state = this.phu ? 'idle' : 'entering';
                this.sub = 0;
                this.actionTimer = this.phu ? 24 : 8;
                /* Ke phu de phase = 2 de vong lap chet KHONG goi startPhase2.
                   Chi ke chinh o phase 1 moi dung day. */
                this.phase = this.phu ? 2 : 1;
                this.hp = this.phu ? HG_PHU : HG_P1;
                this.maxHp = this.hp;
                this.name = this.phu ? (this.phan === 'phan' ? "PHẢN BỘI" : "ĐỒNG BỌN") : "KẺ GÁC HỐ";
                this.invulnAll = false;
                this.kiem = 0.55;
                this.lua = [];
                this.luaNhom = 0;
                this.vx = 0; this.dy = 0; this.bay = 0; this.bayY = 0; this.vuaDat = false;
                this.bao = null; this.huong = -1;
                this.sinh = 150;
                this.aiRieng = true;
                this.daNguoi = false;
                this.daAi = [];
                this.nhip = 0;
                this.retState = 'return';
                this.lastMeleeHit = -1;
                this.song = null;
                this._lui = 0;
            }
            p2(){ return this.phase === 2 && !this.phu; }
            toc(){ return this.p2() ? 6.4 : 4.8; }
            tam(){ return this.p2() ? 210 : 168; }
            mt(){
                let gan = this.keGan(this.phan === 'phan' ? null : 'phan');
                if (gan) return gan;
                return (typeof dino !== 'undefined') ? dino : null;
            }
            keGan(phan){
                if (typeof bosses === 'undefined') return null;
                let best = null, bd = 1e9;
                for (let b of bosses){
                    if (b === this || !(b instanceof HoGacBoss) || b.dying || !(b.hp > 0) || b.invulnAll) continue;
                    if (phan && b.phan !== phan) continue;
                    let d = Math.abs(b.cx() - this.cx());
                    if (d < bd){ bd = d; best = b; }
                }
                return best;
            }
            hoi(){ return this.p2() ? 34 : 48; }
            face(t){
                if (!t) return;
                let tx = t.x + (t.w || 20) / 2;
                this.facingLeft = tx < this.cx();
            }
            gapTo(t){
                if (!t) return 0;
                return (t.x + (t.w || 20) / 2) - this.cx();
            }
            hop(r){
                let y = 246, h = 74;
                return this.facingLeft
                    ? { x: this.x - r, y: y, w: r + 14, h: h }
                    : { x: this.x + this.w - 8, y: y, w: r + 14, h: h };
            }
            nghi(t){
                if (this._biParry && (this.state === 'return' || this.state === 'returning')) return;
                this.state = 'idle'; this.sub = 0; this.vx = 0;
                this.actionTimer = t; this.kiem = 0.85; this.bao = null;
                this.daNguoi = false; this.daAi = [];
                this._lui = 0;
            }
            moDon(){ this.daNguoi = false; this.daAi = []; this.face(this.mt()); }
            hurtP(n){
                if (typeof dino !== 'undefined' && dino && dino.isShielding()){
                    if (typeof parry === 'function') parry();
                    let st = this.state;
                    if (st !== 'idle' && st !== 'return' && st !== 'returning' && st !== 'dung' && st !== 'entering'){
                        this.state = 'return'; this._biParry = 1;
                    }
                    return;
                }
                if (typeof dino !== 'undefined' && dino) dino.takeDamage(n);
            }
            chem(box){
                if (!box) box = this.hop(this.tam());
                this.bao = box;
                if (!this.daNguoi && typeof dino !== 'undefined' && dino && typeof checkAABB === 'function' && checkAABB(dino, box)){
                    this.daNguoi = true; this.hurtP(1);
                }
                if (typeof bosses === 'undefined') return;
                for (let b of bosses){
                    if (b === this || !(b instanceof HoGacBoss) || b.dying || !(b.hp > 0) || b.invulnAll) continue;
                    if (this.phan !== 'phan' && b.phan !== 'phan') continue;
                    if (this.daAi.indexOf(b) >= 0) continue;
                    if (typeof checkAABB === 'function' && checkAABB(b, box)){
                        this.daAi.push(b);
                        if (typeof dealDamage === 'function') dealDamage(b, HG_DOI, 'flat');
                    }
                }
            }
            demSong(){
                let n = 0, phan = false;
                if (typeof bosses === 'undefined') return { n: 1, phan: false };
                for (let b of bosses){
                    if (!(b instanceof HoGacBoss) || b.dying || !(b.hp > 0)) continue;
                    n++; if (b.phan === 'phan') phan = true;
                }
                return { n: n, phan: phan };
            }
            sinhThem(){
                if (this.phu || this.phase !== 1 || this.state === 'entering') return;
                this.sinh--;
                if (this.sinh > 0) return;
                this.sinh = 220;
                let d = this.demSong();
                if (d.n >= 3) return;
                let phan = (!d.phan && d.n >= 2) ? 'phan' : 'ta';
                let a = new HoGacBoss(1, true, phan);
                a.x = (Math.random() < 0.5) ? 36 : (canvas.width - HG_W - 36);
                a.y = a.baseY;
                a.facingLeft = a.x > canvas.width / 2;
                bosses.push(a);
                floatingTexts.push(new FloatingText(a.x - 20, a.y - 28, LT(phan === 'phan' ? "PHẢN BỘI" : "THÊM MỘT KẺ", phan === 'phan' ? "TRAITOR" : "ANOTHER")));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(phan === 'phan' ? 180 : 240, 0.12, 'square', 0.14, 90);
            }
            tickLua(){
                for (let i = this.lua.length - 1; i >= 0; i--){
                    let f = this.lua[i];
                    f.t--;
                    if (!f.hit && f.t < 30 && typeof dino !== 'undefined' && dino && typeof checkAABB === 'function'){
                        if (checkAABB(dino, { x: f.x, y: 286, w: 48, h: 36 })){
                            let nh = f.nhom;
                            for (let q of this.lua) if (q.nhom === nh) q.hit = true;
                            this.hurtP(1);
                        }
                    }
                    if (f.t <= 0) this.lua.splice(i, 1);
                }
            }
            tickSong(){
                let s = this.song; if (!s) return;
                s.x += s.dir * 6.2; s.t++;
                if (!s.hit && typeof dino !== 'undefined' && dino && typeof checkAABB === 'function' && checkAABB(dino, { x: s.x, y: 284, w: 44, h: 36 })){
                    s.hit = true; this.hurtP(1);
                }
                if (s.t > 48 || s.x < -50 || s.x > (canvas.width || 1000) + 50) this.song = null;
            }
            buoc(){
                this.nhip++;
                this.x += this.vx; this.vx *= 0.84;
                if (Math.abs(this.vx) < 0.35) this.vx = 0;
                this.vuaDat = false;
                if (this.bay){
                    this.dy = (this.dy || 0) + 0.78;
                    this.bayY = (this.bayY || 0) + this.dy;
                    if (this.bayY >= 0){ this.bayY = 0; this.dy = 0; this.bay = 0; this.vuaDat = true; }
                }
                let L = (typeof worldL === 'function') ? worldL() : 0;
                let R = (typeof worldR === 'function') ? worldR() : canvas.width;
                this.x = Math.max(L + 8, Math.min(R - this.w - 8, this.x));
                this.y = this.baseY + (this.bayY || 0); this.grounded = !this.bay;
            }
            startPhase2(){
                if (this.phu || this.phase !== 1) return;
                this.phase = 2;
                this.maxHp = HG_P2; this.hp = HG_P2;
                this.state = 'dung'; this.sub = 0; this.vx = 0;
                this.invulnAll = true; this.kiem = -0.3; this.lua = [];
                this.name = "KẺ GÁC HỐ";
                if (typeof bosses !== 'undefined'){
                    for (let i = bosses.length - 1; i >= 0; i--){
                        let o = bosses[i];
                        if (o !== this && o instanceof HoGacBoss){
                            if (typeof visualEffects !== 'undefined') visualEffects.push(new Effect(o.cx(), o.cy(), 'explosion', true, 26));
                            bosses.splice(i, 1);
                        }
                    }
                }
                floatingTexts.push(new FloatingText(this.cx() - 70, 118, LT("HẮN ĐỨNG DẬY", "HE STANDS")));
                shakeTimer = Math.max(shakeTimer || 0, 28);
                if (typeof SFX !== 'undefined' && SFX.bossEntry) SFX.bossEntry();
            }
            update(){
                if (this.dying) return;
                this.buoc(); this.tickLua(); this.tickSong();
                if (this.state === 'entering'){
                    this.facingLeft = true; this.x -= 3.2; this.kiem = 0.4;
                    if (this.x < canvas.width - 240) this.nghi(28);
                    return;
                }
                this.sinhThem();
                if (this.state === 'dung'){
                    this.sub++; this.kiem = -0.4 + Math.min(1, this.sub / 70) * 0.9;
                    if (this.sub >= 70){ this.invulnAll = false; this.nghi(18); }
                    return;
                }
                if (this.state === 'return' || this.state === 'returning'){
                    if (!this._lui){
                        this._lui = 1; this._biParry = 0; this.sub = 0; this.bao = null;
                        this.bay = 0; this.dy = 0; this.bayY = 0; this.y = this.baseY;
                        let g = (typeof dino !== 'undefined' && dino) ? this.gapTo(dino) : (this.facingLeft ? -1 : 1);
                        let lui = -Math.sign(g || 1);
                        this.facingLeft = lui < 0;
                        this.vx = lui * 6.5;
                        this.x += lui * 10;
                        this.kiem = 2.35;
                    }
                    this.sub++;
                    this.kiem = 2.15 - this.sub * 0.03;
                    if (this.sub > 36) this.nghi(this.p2() ? 30 : 42);
                    return;
                }
                if (this.state === 'idle'){
                    let t = this.mt(); this.face(t);
                    let g = this.gapTo(t), ad = Math.abs(g);
                    if (ad > this.tam() * 0.55) this.x += Math.sign(g) * this.toc();
                    else if (ad < 28 && ad > 0) this.x -= Math.sign(g) * 1.4;
                    let dong = 0;
                    if (typeof bosses !== 'undefined'){
                        for (let b of bosses){
                            if (b !== this && b instanceof HoGacBoss && !b.dying && b.hp > 0 && b.state !== 'idle' && b.state !== 'entering' && b.state !== 'dung' && b.state !== 'return' && b.state !== 'returning') dong++;
                        }
                    }
                    if (dong >= 2 && ad < 280) this.actionTimer = Math.max(this.actionTimer, 6);
                    else {
                        this.actionTimer--;
                        if (this.actionTimer <= 0) this.chon(ad);
                    }
                    this.kiem = 0.85;
                    return;
                }
                this.chay();
            }
            chon(ad){
                this.sub = 0; this.moDon(); this.bao = null;
                let t = this.mt();
                let tren = t && (t.y + (t.h || 20)) < this.baseY - 18;
                if (tren && Math.random() < 0.7){ this.state = 'vot'; return; }
                let xa = ad > 280, gan = ad < 110;
                let pool = this.p2()
                    ? (xa ? ['lao','lat','song','nhay'] : gan ? ['chuoi','chem','dao','xoay','dam','xien','truot'] : ['chuoi','chem','lao','lat','xien','song','dam','truot','keo','nhay'])
                    : (xa ? ['lao','nhay','truot'] : gan ? ['chuoi','chem','dao','xoay','dam','xien','vot'] : ['chuoi','chem','lao','nhay','xien','dam','truot','lui']);
                this.state = pool[Math.floor(Math.random() * pool.length)];
            }
            datLua(d, so, buoc){
                this.luaNhom++;
                for (let k = 0; k < so; k++) this.lua.push({ x: this.cx() + d * (30 + k * buoc) - 22, t: 50, hit: false, nhom: this.luaNhom });
            }
            chay(){
                let st = this.state; this.sub++;
                let t = this.mt();
                let dir = this.facingLeft ? -1 : 1;
                if (st === 'chem'){
                    /* 2 nhip dai kiem. Pha 2 them nhip 3 roi mot nhip dao ngan.
                       Giua hai nhip co khoang ~20 khung giu tu the, khong quat lien. */
                    let nhip = this.p2() ? [1, 34, 66, 96] : [1, 40];
                    let danh = this.p2() ? [12, 46, 78, 106] : [16, 56];
                    for (let k = 0; k < nhip.length; k++){
                        let dao = this.p2() && k === nhip.length - 1;
                        let r = dao ? 72 : this.tam() + (k === (this.p2() ? 2 : 1) ? 36 : 0);
                        if (this.sub === nhip[k]){ this.moDon(); this.face(t); this.kiem = dao ? -0.6 : -2.15; this.bao = this.hop(r); }
                        if (this.sub === danh[k]){
                            this.kiem = dao ? 0.35 : 1.35;
                            let g = this.gapTo(t);
                            if (!dao && Math.abs(g) > 48) this.vx = Math.sign(g) * 4.2;
                            this.chem(this.hop(r));
                            if (this.p2() && !dao) this.datLua(this.facingLeft ? -1 : 1, 3, 26);
                        }
                    }
                    if (this.sub > (this.p2() ? 128 : 86)) this.nghi(this.hoi());
                    return;
                }
                if (st === 'lao'){
                    if (this.sub === 1){
                        this.face(t); this.kiem = -1.7;
                        let ad = Math.abs(this.gapTo(t));
                        this.laoN = Math.max(10, Math.min(20, 6 + Math.floor(ad / 22)));
                        this.bao = this.hop(this.tam());
                    }
                    if (this.sub >= 8 && this.sub < 8 + (this.laoN || 12)){
                        this.vx = dir * (this.p2() ? 14 : 12);
                        this.kiem = -1.45;
                    }
                    if (this.sub === 8 + (this.laoN || 12)){
                        this.moDon(); this.kiem = 1.25;
                        this.chem(this.hop(this.tam() + 24));
                        if (this.p2()) this.datLua(dir, 4, 30);
                    }
                    if (this.sub > 30 + (this.laoN || 12)) this.nghi(this.hoi());
                    return;
                }
                if (st === 'nhay'){
                    if (this.sub === 1){ this.face(t); this.kiem = -2.4; this.huong = dir; }
                    if (this.sub < 16) this.kiem = -2.35;
                    if (this.sub === 16){
                        this.bay = 1; this.dy = this.p2() ? -14.5 : -13; this.bayY = 0;
                        this.huong = Math.sign(this.gapTo(t) || dir);
                    }
                    if (this.bay){ this.vx = (this.huong || dir) * (this.p2() ? 9 : 7.4); this.kiem += 0.28; }
                    if (this.vuaDat){
                        this.moDon(); this.kiem = 1.75;
                        let R = this.p2() ? 150 : 124;
                        this.chem({ x: this.cx() - R, y: 250, w: R * 2, h: 72 });
                        if (this.p2()) this.datLua(this.huong || dir, 7, 36);
                        shakeTimer = Math.max(shakeTimer || 0, 16);
                        this.nghi(this.p2() ? 40 : 52);
                    } else if (this.sub > 90) this.nghi(this.hoi());
                    return;
                }
                if (st === 'xoay'){
                    if (this.sub === 1){ this.face(t); this.kiem = -1.8; }
                    if (this.sub < 18) this.kiem = -1.7;
                    if (this.sub >= 18 && this.sub <= 32) this.kiem += 0.55;
                    if (this.sub === 24){
                        this.moDon();
                        let R = this.p2() ? 160 : 140;
                        this.chem({ x: this.cx() - R, y: 246, w: R * 2, h: 74 });
                        if (this.p2()) this.datLua(dir, 3, 24);
                    }
                    if (this.sub > 58) this.nghi(this.hoi());
                    return;
                }
                if (st === 'dam'){
                    if (this.sub === 1){ this.face(t); this.bao = this.hop(this.tam() + 50); }
                    if (this.sub < 26){
                        this.kiem = -0.35;
                        let g = this.gapTo(t);
                        if (Math.abs(g) > 70) this.vx = Math.sign(g) * 2.2;
                    }
                    if (this.sub === 26){
                        this.moDon(); this.kiem = 1.7;
                        this.chem(this.hop(this.tam() + 56));
                        if (this.p2()) this.datLua(dir, 4, 28);
                        shakeTimer = Math.max(shakeTimer || 0, 12);
                    }
                    if (this.sub > 52) this.nghi(this.hoi());
                    return;
                }
                if (st === 'xien'){
                    if (this.sub === 1){ this.face(t); this.kiem = -0.15; this.bao = this.hop(this.tam() + 48); }
                    if (this.sub < 18) this.kiem = -0.1;
                    if (this.sub === 18){
                        this.moDon(); this.vx = dir * 15; this.kiem = 1.55;
                        this.chem(this.hop(this.tam() + 64));
                        if (this.p2()) this.datLua(dir, 3, 34);
                    }
                    if (this.sub > 18 && this.sub < 26) this.vx = dir * 6;
                    if (this.sub > 48) this.nghi(this.hoi());
                    return;
                }
                if (st === 'keo'){
                    if (this.sub === 1){ this.face(t); this.kiem = 1.15; this.moDon(); }
                    if (this.sub <= 16){
                        this.vx = dir * 6.5; this.kiem = 1.25;
                        if (this.sub === 6) this.chem(this.hop(this.tam()));
                        if (this.sub === 4) this.datLua(dir, 6, 32);
                    }
                    if (this.sub > 44) this.nghi(this.hoi());
                    return;
                }
                if (st === 'chuoi'){
                    let nhip = this.p2() ? [1, 32, 64, 92] : [1, 36, 72];
                    let danh = this.p2() ? [14, 46, 78, 102] : [16, 52, 88];
                    for (let k = 0; k < nhip.length; k++){
                        let dao = this.p2() && k === 3;
                        let dam = !dao && k === nhip.length - (this.p2() ? 2 : 1);
                        let r = dao ? 64 : this.tam() + (dam ? 52 : 0);
                        if (this.sub === nhip[k]){ this.moDon(); this.face(t); this.kiem = dao ? -0.5 : (dam ? -0.2 : -2.15); this.bao = this.hop(r); }
                        if (this.sub === danh[k]){
                            this.kiem = dao ? 0.4 : (dam ? 1.55 : 1.3);
                            if (dam) this.vx = dir * 8;
                            this.chem(this.hop(r));
                            if (this.p2() && dam) this.datLua(dir, 4, 28);
                        }
                    }
                    if (this.sub > (this.p2() ? 124 : 112)) this.nghi(this.hoi());
                    return;
                }
                if (st === 'truot'){
                    if (this.sub === 1){ this.face(t); this.kiem = 1.7; }
                    if (this.sub < 12) this.bao = { x: this.facingLeft ? this.x - this.tam() : this.x, y: 294, w: this.tam() + this.w, h: 26 };
                    if (this.sub >= 12 && this.sub <= 26){
                        this.vx = dir * (this.p2() ? 13 : 11);
                        this.kiem = 1.55;
                        if (this.sub === 16){
                            this.moDon();
                            this.chem({ x: this.facingLeft ? this.x - this.tam() : this.x, y: 294, w: this.tam() + this.w, h: 26 });
                            if (this.p2()) this.datLua(dir, 3, 24);
                        }
                    }
                    if (this.sub > 48) this.nghi(this.hoi());
                    return;
                }
                if (st === 'vot'){
                    if (this.sub === 1){ this.face(t); this.kiem = 1.9; }
                    if (this.sub < 16) this.kiem = 1.8;
                    if (this.sub === 16){
                        this.moDon(); this.kiem = -1.2;
                        let r = this.p2() ? 150 : 124;
                        let box = this.facingLeft
                            ? { x: this.cx() - r, y: 150, w: r, h: 120 }
                            : { x: this.cx(), y: 150, w: r, h: 120 };
                        this.chem(box);
                    }
                    if (this.sub > 42) this.nghi(this.hoi());
                    return;
                }
                if (st === 'dao'){
                    if (this.sub === 1){ this.face(t); this.kiem = 0.9; this.bao = this.hop(68); }
                    if (this.sub === 8){ this.moDon(); this.kiem = 0.35; this.chem(this.hop(68)); }
                    if (this.sub > 20) this.nghi(this.hoi() + 10);
                    return;
                }
                if (st === 'lui'){
                    if (this.sub === 1){ this.face(t); this.kiem = -1.8; }
                    if (this.sub <= 12) this.vx = -dir * 5.5;
                    if (this.sub === 18){ this.face(this.mt()); dir = this.facingLeft ? -1 : 1; this.kiem = -0.3; this.bao = this.hop(this.tam() + 40); }
                    if (this.sub >= 24 && this.sub <= 32) this.vx = dir * 12;
                    if (this.sub === 28){ this.moDon(); this.kiem = 1.45; this.chem(this.hop(this.tam() + 28)); }
                    if (this.sub > 52) this.nghi(this.hoi());
                    return;
                }
                if (st === 'song'){
                    if (this.sub === 1){ this.face(t); this.kiem = -0.4; }
                    if (this.sub < 18){
                        this.bao = { x: this.facingLeft ? this.cx() - 280 : this.cx(), y: 284, w: 280, h: 36 };
                    }
                    if (this.sub === 18){
                        this.kiem = 1.2;
                        this.song = { x: this.cx() + dir * 16, dir: dir, t: 0, hit: false };
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(110, 0.14, 'sawtooth', 0.14, 70);
                    }
                    if (this.sub > 36) this.nghi(this.hoi());
                    return;
                }
                if (st === 'lat'){
                    if (this.sub === 1){ this.face(t); this.kiem = -2.5; this.huong = dir; }
                    if (this.sub === 14){
                        this.bay = 1; this.dy = -12.5; this.bayY = 0;
                        this.huong = Math.sign(this.gapTo(t) || dir);
                    }
                    if (this.bay){ this.vx = (this.huong || dir) * 12; this.kiem += 0.34; }
                    if (this.vuaDat){
                        this.moDon(); this.kiem = 1.8;
                        let R = 156;
                        this.chem({ x: this.cx() - R, y: 246, w: R * 2, h: 74 });
                        this.datLua(this.huong || dir, 8, 34);
                        shakeTimer = Math.max(shakeTimer || 0, 16);
                        this.nghi(44);
                    } else if (this.sub > 96) this.nghi(this.hoi());
                }
            }
            veQua(){
                let p2 = this.p2(), phan = this.phan === 'phan';
                let st = this.state;
                let dao = st === 'dao' || ((st === 'chem' || st === 'chuoi') && p2 && this.sub > 90 && this.sub < 116);
                let vung = st !== 'idle' && st !== 'return' && st !== 'returning' && st !== 'entering' && st !== 'dung' && this.kiem > 0.5;
                let luoi = vung ? 116 : 58;
                ctx.save();
                ctx.translate(this.cx(), this.y + this.h);
                ctx.scale((this.facingLeft ? -1 : 1) * HG_VE, HG_VE);
                ctx.fillStyle = p2 ? "#3E1810" : (phan ? "#4A1018" : "#241910");
                ctx.beginPath();
                ctx.moveTo(-3, -32);
                ctx.lineTo(-16, -6 + Math.sin(this.nhip / 8) * 2);
                ctx.lineTo(-8, 1);
                ctx.lineTo(2, -24);
                ctx.fill();
                if (p2){ ctx.fillStyle = "#FF6D00"; ctx.fillRect(-14, -2, 8, 2); }
                ctx.fillStyle = p2 ? "#5D4037" : "#3A4450";
                ctx.fillRect(-7, -30, 14, 14);
                ctx.fillStyle = "#1C1814";
                ctx.fillRect(-5, -18, 10, 8);
                ctx.fillStyle = "#2E261E";
                ctx.fillRect(-6, -10, 4, 10);
                ctx.fillRect(2, -10, 4, 10);
                ctx.fillStyle = "#2A241C";
                ctx.fillRect(-6, -40, 12, 5);
                ctx.fillStyle = "#C8B8A4";
                ctx.fillRect(-4, -38, 8, 6);
                ctx.fillStyle = phan ? "#FF1744" : (p2 ? "#FF6D00" : "#ECEFF1");
                ctx.fillRect(-3, -36, 2, 2);
                ctx.fillRect(2, -36, 2, 2);
                if (phan){ ctx.fillStyle = "#B71C1C"; ctx.fillRect(-6, -33, 12, 2); }
                ctx.save();
                ctx.translate(dao ? 10 : -8, dao ? -24 : -16);
                ctx.rotate(dao ? 0.5 : 1.1);
                ctx.fillStyle = "#6D4C41";
                ctx.fillRect(-1, -8, 2, 10);
                ctx.fillStyle = "#B0BEC5";
                ctx.fillRect(-1, -16, 2, 8);
                ctx.restore();
                ctx.translate(2, -22);
                ctx.rotate(this.kiem);
                ctx.fillStyle = "#4E342E";
                ctx.fillRect(-3, -6, 6, 8);
                ctx.fillStyle = p2 ? "#FF8A50" : "#E0E4E8";
                ctx.fillRect(-3, -luoi, 5, luoi - 4);
                ctx.fillStyle = p2 ? "#FFE082" : "#90A4AE";
                ctx.fillRect(-1, -luoi + 4, 2, luoi - 14);
                ctx.fillStyle = "#5D4037";
                ctx.fillRect(-6, -8, 12, 3);
                ctx.restore();
            }
            draw(){
                if (this.song){
                    let s = this.song;
                    ctx.save();
                    ctx.globalAlpha = 0.8;
                    ctx.fillStyle = "#FF6D00";
                    ctx.fillRect(s.x, 286, 46, 28);
                    ctx.fillStyle = "#FFE082";
                    ctx.fillRect(s.x + 8, 276, 20, 16);
                    ctx.restore();
                }
                for (let f of this.lua){
                    let u = Math.max(0, f.t / 48);
                    ctx.save();
                    ctx.globalAlpha = 0.35 + 0.55 * u;
                    ctx.fillStyle = "#FF6D00";
                    ctx.fillRect(f.x, 300, 48, 20);
                    ctx.fillStyle = "#FFD54F";
                    ctx.fillRect(f.x + 8, 292, 22, 14);
                    ctx.restore();
                }
                if (this.bao){
                    ctx.save(); ctx.globalAlpha = 0.28; ctx.strokeStyle = this.p2() ? "#FF6D00" : "#ECEFF1"; ctx.lineWidth = 2;
                    ctx.strokeRect(this.bao.x, this.bao.y, this.bao.w, this.bao.h);
                    ctx.restore();
                }
                this.veQua();
                if (!this.dying && this.hp > 0 && typeof drawTopBossBar === 'function'){
                    let ten = this.p2() ? "GÁC HỐ — DẬY" : (this.phan === 'phan' ? "PHẢN BỘI" : (this.phu ? "ĐỒNG BỌN" : "GÁC HỐ"));
                    let col = this.phan === 'phan' ? "#E53935" : (this.p2() ? "#FF6D00" : "#90A4AE");
                    drawTopBossBar(this, col, ten);
                }
            }
        }
// BOSS_PART_END s6.HoGacBoss.1

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
