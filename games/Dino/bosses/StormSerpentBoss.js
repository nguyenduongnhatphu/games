// BOSS_FILE: StormSerpentBoss
// BOSS_SNAPSHOT: 90b44e51b8a8c0ad12fba495a59e199c399e173aab86fbee147786ba09666942
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: DPR, Effect, FloatingText, Math, SFX, Set, aaDatNeo, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, platforms, shakeTimer, visualEffects
// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24480 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GiantSpiderBoss, GreatSerpentBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MosaBoss, MountainGodBoss, PoisonMothBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, VoltCloneBoss
// BOSS_PART_BEGIN s0.hudManHinh.1 READ_ONLY
function hudManHinh(b){
            if (_tbbDaVeKhung !== frames){ _tbbDaVe.clear(); _tbbDaVeKhung = frames; }
            _tbbDaVe.add(b);
            // nhieu boss cung tu ve thanh (dau tay doi) -> thanh sau xep xuong hang duoi
            if (_tbbKhung === frames) _tbbSo++; else { _tbbSo = 0; _tbbKhung = frames; }
            let d = (typeof DPR === 'number') ? DPR : 1;
            let dy = ((typeof dojoMode !== 'undefined' && dojoMode) ? 42 : 0) + _tbbSo * 40;
            ctx.setTransform(d, 0, 0, d, 0, dy * d);
        }
// BOSS_PART_END s0.hudManHinh.1

// Nguồn: index.html:38990 · Dùng bởi: StormSerpentBoss
// BOSS_PART_BEGIN s1.StormSerpentBoss.1 EDITABLE
class StormSerpentBoss {
            constructor(level){
                // Boss spam dia hinh thi khong duoc trau: cung nhom nay Thach Ung va Cu Thach deu 75.
                this.name = "PHONG XA"; this.hp = 85; this.maxHp = 85;
                this.w = 64; this.h = 56;
                this.x = canvas.width/2 - 32; this.y = 150; this.homeY = 150;
                this.state = 'entering'; this.retState = 'idle'; this.subTimer = 0;
                this.actionTimer = 44; this.facingLeft = true; this.lastSkill = '';
                this.invulnAll = false; this.burnTimer = 0; this.lastMeleeHit = -1; this.rage = false;
                this.luoi = []; this.luoiCd = 60; this.xoay = [];
                this.cot = []; this.quet = []; this.buou = null;
                this.ep = 0; this.epX = 0; this.epW = 0; this.bao = []; this.xoayCd = 0;
                this.bien = 0; this.lac = 0; this.hitDon = false;
            }
            getDmg(){ return 1; }
            tamX(){ return this.x + this.w/2; }
            tamY(){ return this.y + this.h/2; }
            // L5: luoi gio BAN RO T duoc — moi moi de doa deu co duong xu ly
            clashTargets(){
                let self = this, out = [];
                for (let d of this.luoi) out.push({ o: d, hp: 1, pierce: false,
                    box: { x: d.x - 14, y: d.y - 14, w: 28, h: 28 },
                    kill: function(){ let k = self.luoi.indexOf(d); if (k >= 0) self.luoi.splice(k, 1); } });
                return out;
            }
            // mat san ma luoi gio se cham — tinh theo CHAN nguoi choi, khong lay be cao nhat,
            // neu khong thi dung duoi gam be la co mai che mien phi.
            sanDuoi(tx){
                let chan = dino.y + dino.h, sanY = 320;
                for (let p of platforms){
                    if (tx < p.x || tx > p.x + p.w) continue;
                    if (p.top < 90 || p.top > 320) continue;
                    if (p.top < chan - 10) continue;
                    sanY = Math.min(sanY, p.top);
                }
                return sanY;
            }
            phongLuoi(n, kieu){
                let pcx = dino.x + dino.w/2;
                for (let k = 0; k < n; k++){
                    let tx;
                    if (kieu === 'don')  tx = pcx + (k - (n-1)/2) * 46;          // chum HEP, ep di xa
                    else                 tx = pcx + (Math.random() - 0.5) * 300;  // rai RONG
                    tx = Math.max(30, Math.min(canvas.width - 30, tx));
                    this.luoi.push({ x: this.tamX(), y: this.tamY(), vx: (tx - this.tamX()) / 46,
                                     vy: -5.2 - Math.random() * 2, dat: tx, sanY: this.sanDuoi(tx) });
                }
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(760, 0.07, 'triangle', 0.13, 1500);
            }
            chonChieu(){
                let tren = !dino.grounded || (dino.y + dino.h) < 300;
                let bo;
                // ANTI-AIR o day KHONG phai la giet tren khong ma la GIOI HAN thoi gian tren
                // khong: EP GIO lam nhay khong len noi, BAI XOAY lam cho dap xuong thanh nguy
                // hiem. Don aa_bao chi la mot phan nho.
                // Roi khoi mat dat thi EP GIO khoa do cao, nhung phai co ca don GAY DMG,
                // neu khong dung tren be lai thanh cho an toan nhat ban do.
                if (tren) bo = ['ep_bao', 'quet_bao', 'cot_bao', 'cot_bao', 'quet_bao', 'ep_bao'];   // @@HE-BO-AA: bo aa_bao
                else      bo = this.rage ? ['cot_bao','quet_bao','luoi_bao','bao_bao','ep_bao','cot_bao','quet_bao']
                                         : ['cot_bao','quet_bao','luoi_bao','bao_bao','ep_bao','quet_bao'];
                let c = bo[Math.floor(Math.random() * bo.length)];
                if (c === this.lastSkill && bo.length > 1) c = bo[(bo.indexOf(c) + 1) % bo.length];
                this.lastSkill = c; this.state = c; this.subTimer = 0; this.hitDon = false;
                this.bien = Math.floor(Math.random() * 3);         // 3 BIEN THE cho moi chieu
            }
            update(){
                let cham = (r) => {                                 // L7: mot don chi cham MOT lan
                    if (this.hitDon || !checkAABB(dino, r)) return 0;
                    this.hitDon = true;
                    if (!dino.isShielding()){ dino.takeDamage(1); return 1; }
                    parry(); return 2;
                };
                this.lac += 0.09;
                if (this.state === 'entering'){ this.subTimer++; if (this.subTimer > 26){ this.state='intro'; this.subTimer=0; } return; }
                if (this.state === 'intro'){ this.subTimer++;
                    if (this.subTimer === 1){ floatingTexts.push(new FloatingText(canvas.width/2 - 60, 106, "PHONG XA!")); if (SFX.bossEntry) SFX.bossEntry(); shakeTimer = 40; }
                    if (this.subTimer > 50){ this.state='idle'; this.actionTimer=40; } return; }

                let pcx = dino.x + dino.w/2;
                this.facingLeft = pcx < this.tamX();
                if (!this.rage && this.hp <= this.maxHp * 0.5){
                    this.rage = true; shakeTimer = 50; this.luoiCd = 30;
                    floatingTexts.push(new FloatingText(canvas.width/2 - 100, 138, "BAO NOI LEN!"));
                    if (SFX.bossEntry) SFX.bossEntry();
                }

                // ---- LUOI GIO: quet trung nguoi choi GIUA DUONG BAY cung an don ----
                this.luoiCd--;
                if (this.luoiCd <= 0){ this.phongLuoi(this.rage ? 3 : 2, 'rai'); this.luoiCd = this.rage ? PX_LUOI_CD2 : PX_LUOI_CD; }
                for (let i = this.luoi.length - 1; i >= 0; i--){
                    let d = this.luoi[i];
                    d.vy += 0.30; d.x += d.vx; d.y += d.vy;
                    if (checkAABB(dino, { x: d.x - 14, y: d.y - 14, w: 28, h: 28 })){
                        if (!dino.isShielding()) dino.takeDamage(1); else parry();
                        visualEffects.push(new Effect(d.x, d.y, 'explosion', true, 18));
                        this.luoi.splice(i, 1); continue;
                    }
                    let sy = d.sanY || 320;
                    if (d.y > sy - 14){
                        visualEffects.push(new Effect(d.dat, sy - 8, 'explosion', true, 20));
                        // BAI XOAY chi moc tren MAT DAT. Dat no tren be da la thiet ke hong:
                        // muon len be BAT BUOC phai nhay, ma bai xoay danh nguoi dang bay,
                        // nen len be thanh an dmg mac dinh — khong co cach nao tranh.
                        if (sy >= 318) this.xoay.push({ x: d.dat, sanY: sy, t: 0, hit: 0 });
                        this.luoi.splice(i, 1);
                    }
                }
                // ---- BAI XOAY DAT ----
                // KHOA DUNG CHUNG: khong co no thi mot cu nhay xuyen qua ba bai xoay an ba
                // don — do ra nguoi hay nhay an 2.33 dmg/giay, gap 4.6 lan nguoi dung yen.
                // Muc dich la RAN DE viec bay nhieu, khong phai xoa so.
                if (this.xoayCd > 0) this.xoayCd--;
                for (let i = this.xoay.length - 1; i >= 0; i--){
                    let z = this.xoay[i]; z.t++;
                    if (this.xoayCd <= 0 && !dino.grounded &&
                        checkAABB(dino, { x: z.x - 28, y: z.sanY - 50, w: 56, h: 52 })){
                        this.xoayCd = 56;
                        if (!dino.isShielding()) dino.takeDamage(1); else parry();
                    }
                    if (z.t > PX_XOAY_DAI) this.xoay.splice(i, 1);
                }
                // ---- EP GIO: khong gay dmg, chi LAM NANG nguoi choi -> nhay khong len noi.
                // Day moi la anti-air dung nghia: gioi han viec o tren khong, khong phai
                // trung phat bang mot cu vut.
                if (this.ep > 0){
                    this.ep--;
                    if (pcx > this.epX - this.epW/2 && pcx < this.epX + this.epW/2){
                        // GIOI HAN chu khong CAM: 0.72 + tran -3.2 lam do cao nhay tut tu
                        // 134px xuong 4px, tuc khong nhay duoc, va luong cat di kem thanh
                        // don khong the ne. 0.35 + tran -8 giu lai khoang mot phan ba do cao.
                        if (!dino.grounded){ dino.dy += 0.22; if (dino.dy < -10) dino.dy = -10; }
                    }
                }
                // ---- XOAY LON di tuan: moi de doa BEN VUNG, khong phai don spam ----
                for (let i = this.bao.length - 1; i >= 0; i--){
                    let v = this.bao[i]; v.t++; v.x += v.vx;
                    if (v.x < 50 || v.x > canvas.width - 50) v.vx = -v.vx;
                    if (v.hitCd > 0) v.hitCd--;
                    if (v.hitCd <= 0 && checkAABB(dino, { x: v.x - 40, y: 150, w: 80, h: 170 })){
                        v.hitCd = 45;
                        if (!dino.isShielding()) dino.takeDamage(1); else parry();
                    }
                    if (v.t > PX_BAO_DAI) this.bao.splice(i, 1);
                }
                // ---- COT LOC dang song: cao HET MAN HINH ----
                for (let i = this.cot.length - 1; i >= 0; i--){
                    let c = this.cot[i]; c.t++;
                    if (c.di) c.x += c.di;                                   // bien the 2: cot CHAY NGANG
                    if (c.t === PX_BAO_COT + 1){ shakeTimer = Math.max(shakeTimer, 24); if (SFX.glassBreak) SFX.glassBreak(); }
                    if (c.t > PX_BAO_COT && c.t <= PX_BAO_COT + PX_COT_SONG){
                        if (c.hitCd > 0) c.hitCd--;
                        if (c.hitCd <= 0 && checkAABB(dino, { x: c.x - PX_COT_RONG/2, y: 0, w: PX_COT_RONG, h: 320 })){
                            c.hitCd = 40;
                            if (!dino.isShielding()) dino.takeDamage(1); else parry();
                        }
                    }
                    if (c.t > PX_BAO_COT + PX_COT_SONG) this.cot.splice(i, 1);
                }
                // ---- LUONG CAT dang song ----
                for (let i = this.quet.length - 1; i >= 0; i--){
                    let q = this.quet[i];
                    q.x += q.dir * PX_QUET_TOC;
                    if (q.vy) q.y += q.vy;                                   // bien the 2: luong DANG LEN
                    if (!q.hit && checkAABB(dino, { x: q.x - 90, y: q.y - 26, w: 180, h: 52 })){
                        q.hit = true;
                        if (!dino.isShielding()) dino.takeDamage(1); else parry();
                    }
                    if (q.x < -230 || q.x > canvas.width + 230) this.quet.splice(i, 1);
                }

                // ================= TRANG THAI =================
                if (this.state === 'idle'){
                    this.y = this.homeY + Math.sin(this.lac) * 14;
                    let dx = (pcx - this.w/2) - this.x;
                    this.x += Math.max(-1.9, Math.min(1.9, dx * 0.03));
                    this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x));
                    this.actionTimer--;
                    if (this.actionTimer <= 0) this.chonChieu();
                    return; }

                // ---- COT LOC — 3 BIEN THE ----
                if (this.state === 'cot_bao'){ this.subTimer++;
                    if (this.subTimer === 1){ this.buou = { x: this.tamX() }; if (SFX.tone) SFX.tone(150, 0.3, 'sawtooth', 0.2, 90); }
                    if (this.buou) this.buou.x += Math.sign(pcx - this.buou.x) * 5.6;
                    if (this.subTimer > 46){
                        let bx = Math.max(40, Math.min(canvas.width - 40, this.buou.x));
                        if (this.bien === 0){                                 // MOT cot dung cho
                            this.cot.push({ x: bx, t: 0, hitCd: 0 });
                        } else if (this.bien === 1){                          // BA cot cach deu -> chay vao khe
                            for (let k = -1; k <= 1; k++)
                                this.cot.push({ x: Math.max(40, Math.min(canvas.width - 40, bx + k * 168)), t: -k * 10, hitCd: 0 });
                        } else {                                              // cot CHAY NGANG ca san
                            let d2 = pcx < canvas.width/2 ? 1 : -1;
                            this.cot.push({ x: d2 > 0 ? 60 : canvas.width - 60, t: 0, hitCd: 0, di: d2 * 4.6 });
                        }
                        if (this.rage) this.cot.push({ x: Math.max(40, Math.min(canvas.width - 40, bx + (Math.random()<0.5?-230:230))), t: -18, hitCd: 0 });
                        this.buou = null; this.state='cot_cho'; this.subTimer=0;
                    }
                    return; }
                if (this.state === 'cot_cho'){ this.subTimer++;
                    this.y = this.homeY + Math.sin(this.lac) * 14;
                    if (this.subTimer > 30){ this.state='idle'; this.subTimer=0; this.actionTimer = this.rage ? PX_NGHI2 : PX_NGHI; }
                    return; }

                // ---- LUONG CAT — 3 BIEN THE ----
                if (this.state === 'quet_bao'){ this.subTimer++;
                    if (this.subTimer === 1){
                        this.quetY = Math.max(70, Math.min(300, dino.y + dino.h/2));
                        this.quetDir = (pcx < this.tamX()) ? -1 : 1;
                        if (SFX.tone) SFX.tone(240, 0.2, 'square', 0.18, 600);
                    }
                    if (this.subTimer > PX_BAO_QUET){
                        let x0 = this.quetDir > 0 ? -190 : canvas.width + 190;
                        if (this.bien === 0){
                            this.quet.push({ x: x0, y: this.quetY, dir: this.quetDir, hit: false });
                        } else if (this.bien === 1){                          // HAI luong, phai o giua khe
                            this.quet.push({ x: x0, y: Math.max(60, this.quetY - 96), dir: this.quetDir, hit: false });
                            this.quet.push({ x: x0, y: Math.min(310, this.quetY + 96), dir: this.quetDir, hit: false });
                        } else {                                              // luong DANG LEN tu duoi
                            this.quet.push({ x: x0, y: 306, dir: this.quetDir, vy: -2.3, hit: false });
                        }
                        shakeTimer = Math.max(shakeTimer, 20);
                        this.state='idle'; this.subTimer=0; this.actionTimer = this.rage ? PX_NGHI2 : PX_NGHI;
                    }
                    return; }

                // ---- PHONG LUOI — 3 BIEN THE ----
                if (this.state === 'luoi_bao'){ this.subTimer++;
                    if (this.subTimer > 26){
                        if (this.bien === 0)      this.phongLuoi(this.rage ? 5 : 4, 'rai');
                        else if (this.bien === 1) this.phongLuoi(3, 'don');           // chum hep, ep chay
                        else { this.phongLuoi(2, 'don'); this.luoiCd = 26; }          // hai dot noi tiep
                        this.state='idle'; this.subTimer=0; this.actionTimer = this.rage?PX_NGHI2:PX_NGHI;
                    }
                    return; }

                // ---- EP GIO (khong sat thuong, chi khoa khong trung) ----
                if (this.state === 'ep_bao'){ this.subTimer++;
                    if (this.subTimer === 1){
                        this.epX = pcx; this.epW = this.rage ? 420 : 320;
                        if (SFX.tone) SFX.tone(120, 0.5, 'sawtooth', 0.22, 70);
                    }
                    if (this.subTimer > 30){
                        this.ep = PX_EP_DAI;
                        // Ep xong thi cat ngang luon: bi ghim duoi dat nen phai xu ly kieu khac
                        // Ep gio khoa do cao -> don di kem phai ne duoc bang CHAY NGANG,
                        // khong duoc la don doi hoi nhay. Ghim nguoi ta xuong dat roi bat ho
                        // nhay qua la don khong the ne.
                        this.phongLuoi(3, 'don');
                        this.state='idle'; this.subTimer=0; this.actionTimer = this.rage?PX_NGHI2:PX_NGHI;
                    }
                    return; }
                // ---- XOAY LON di tuan ----
                if (this.state === 'bao_bao'){ this.subTimer++;
                    if (this.subTimer > 34){
                        let d2 = pcx < canvas.width/2 ? 1 : -1;
                        this.bao.push({ x: Math.max(60, Math.min(canvas.width-60, pcx)), vx: d2 * 1.25, t: 0, hitCd: 0 });
                        shakeTimer = Math.max(shakeTimer, 22);
                        if (SFX.glassBreak) SFX.glassBreak();
                        this.state='idle'; this.subTimer=0; this.actionTimer = this.rage?PX_NGHI2:PX_NGHI;
                    }
                    return; }
                // ---- ANTI-AIR ----
                if (this.state === 'aa_bao'){ this.subTimer++;
                    if (this.subTimer === 1 && SFX.tone) SFX.tone(1050, 0.1, 'square', 0.2, 1700);
                    if (this.subTimer > 14){ this.state='aa_go'; this.subTimer=0;
                        if (typeof aaDatNeo === 'function') aaDatNeo(this); }
                    return; }
                if (this.state === 'aa_go'){ this.subTimer++;
                    this.x += ((dino.x + dino.w/2 - this.w/2) - this.x) * 0.30;
                    this.y += ((dino.y + dino.h/2 - this.h/2) - this.y) * 0.30;
                    this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x));
                    this.y = Math.max(10, Math.min(300, this.y));
                    cham({ x: this.x - 16, y: this.y - 16, w: this.w + 32, h: this.h + 32 });
                    if (this.subTimer > 34){ this.state='idle'; this.subTimer=0; this.actionTimer = this.rage?26:38; }
                    return; }
                this.state = 'idle';
            }
            draw(){
                let cx = this.tamX(), cy = this.tamY();
                // ---- BAI XOAY DAT (nhay vao moi an don) ----
                for (let z of this.xoay){
                    let mo = z.t > PX_XOAY_DAI - 40 ? (PX_XOAY_DAI - z.t) / 40 : 1;
                    ctx.save(); ctx.globalAlpha = 0.55 * mo;
                    for (let k = 0; k < 4; k++){
                        let ph = frames * 0.10 + k * 1.57;
                        let rw = 30 - k * 5, rh = 12 - k * 2;
                        ctx.strokeStyle = k % 2 ? "#B3E5FC" : "#4FC3F7"; ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.ellipse(z.x, z.sanY - 12 - k * 11, rw, rh, Math.sin(ph) * 0.4, 0, Math.PI*2);
                        ctx.stroke();
                    }
                    ctx.restore();
                    ctx.fillStyle = "rgba(79,195,247," + (0.22 * mo).toFixed(2) + ")";
                    ctx.fillRect(z.x - 34, z.sanY - 52, 68, 52);
                }
                // ---- EP GIO: mui ten chuc xuong, khong co vach do vi no KHONG gay dmg ----
                if (this.ep > 0 || this.state === 'ep_bao'){
                    let dangBao = this.state === 'ep_bao';
                    let ex = dangBao ? (dino.x + dino.w/2) : this.epX;
                    let ew = dangBao ? (this.rage ? 420 : 320) : this.epW;
                    ctx.save();
                    ctx.globalAlpha = dangBao ? (frames % 8 < 4 ? 0.5 : 0.2) : 0.34;
                    ctx.fillStyle = "#4FC3F7"; ctx.fillRect(ex - ew/2, 0, ew, 320);
                    ctx.globalAlpha = 0.8; ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = 3;
                    for (let k = 0; k < 8; k++){
                        let ax = ex - ew/2 + 22 + k * (ew - 44) / 7;
                        let ay = ((frames * 3.6 + k * 44) % 320);
                        ctx.beginPath(); ctx.moveTo(ax, ay - 20); ctx.lineTo(ax, ay + 14);
                        ctx.moveTo(ax - 8, ay + 4); ctx.lineTo(ax, ay + 14); ctx.lineTo(ax + 8, ay + 4);
                        ctx.stroke();
                    }
                    ctx.restore();
                    ctx.fillStyle = "#E1F5FE"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("EP GIO — NHAY KHONG LEN", ex, 66); ctx.textAlign = "left";
                }
                // ---- XOAY LON di tuan ----
                for (let v of this.bao){
                    let mo = v.t > PX_BAO_DAI - 50 ? (PX_BAO_DAI - v.t) / 50 : 1;
                    ctx.save(); ctx.globalAlpha = 0.7 * mo;
                    for (let k = 0; k < 9; k++){
                        let yy = 320 - k * 19;
                        let rw = 14 + k * 3.4, ph = frames * 0.15 + k * 0.8;
                        ctx.strokeStyle = k % 2 ? "#81D4FA" : "#E1F5FE"; ctx.lineWidth = 4;
                        ctx.beginPath();
                        ctx.ellipse(v.x + Math.sin(ph) * 6, yy, rw, 8, 0, 0, Math.PI*2);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // ---- BUOU GIO chay sat san (bao truoc cot loc) ----
                if (this.buou){
                    let bx = this.buou.x;
                    ctx.save(); ctx.strokeStyle = (frames % 6 < 3) ? "#FFEB3B" : "#4FC3F7"; ctx.lineWidth = 3;
                    for (let k = 0; k < 3; k++){
                        ctx.beginPath(); ctx.ellipse(bx, 306 - k*9, 34 - k*8, 9 - k*2, 0, 0, Math.PI*2); ctx.stroke();
                    }
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("CHAY NGANG!", bx, 278); ctx.textAlign = "left"; ctx.restore();
                }
                // ---- COT LOC ----
                for (let c of this.cot){
                    if (c.t < 0) continue;
                    if (c.t <= PX_BAO_COT){
                        let p = c.t / PX_BAO_COT;
                        ctx.fillStyle = (frames % 6 < 3) ? "rgba(79,195,247," + (0.13 + 0.26 * p).toFixed(2) + ")" : "rgba(79,195,247,0.06)";
                        ctx.fillRect(c.x - PX_COT_RONG/2, 0, PX_COT_RONG, 320);
                        ctx.strokeStyle = "#4FC3F7"; ctx.lineWidth = 2;
                        ctx.strokeRect(c.x - PX_COT_RONG/2, 0, PX_COT_RONG, 320);
                    } else {
                        ctx.save(); ctx.shadowBlur = 16; ctx.shadowColor = "#B3E5FC";
                        ctx.fillStyle = "rgba(129,212,250,0.55)"; ctx.fillRect(c.x - PX_COT_RONG/2, 0, PX_COT_RONG, 320);
                        ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = 3;
                        for (let k = 0; k < 10; k++){
                            let yy = k * 34, ph = frames * 0.22 + k * 0.9;
                            ctx.beginPath();
                            ctx.ellipse(c.x, yy + 17, PX_COT_RONG/2 * (0.6 + 0.4 * Math.abs(Math.sin(ph))), 12, 0, 0, Math.PI*2);
                            ctx.stroke();
                        }
                        ctx.restore();
                    }
                }
                // ---- LUONG CAT: bao truoc ----
                if (this.state === 'quet_bao'){
                    let dai = this.bien === 1 ? [this.quetY - 96, this.quetY + 96] : this.bien === 2 ? [306] : [this.quetY];
                    for (let yy of dai){
                        ctx.fillStyle = (frames % 6 < 3) ? "rgba(3,169,244,0.28)" : "rgba(3,169,244,0.09)";
                        ctx.fillRect(0, yy - 26, canvas.width, 52);
                        ctx.strokeStyle = "#03A9F4"; ctx.lineWidth = 2; ctx.strokeRect(0, yy - 26, canvas.width, 52);
                    }
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(this.bien === 1 ? "HAI LUONG — VAO KHE GIUA!" : this.bien === 2 ? "LUONG DANG LEN!" : "LUONG CAT — DOI CAO DO!",
                                 canvas.width/2, Math.max(24, dai[0] - 34)); ctx.textAlign = "left";
                }
                for (let q of this.quet){
                    for (let k = 0; k < 7; k++){
                        let sx = q.x - q.dir * k * 52;
                        ctx.save(); ctx.globalAlpha = 0.85 - k * 0.07;
                        ctx.fillStyle = k % 2 ? "#81D4FA" : "#B3E5FC";
                        ctx.beginPath(); ctx.ellipse(sx, q.y, 30, 22, 0, 0, Math.PI*2); ctx.fill();
                        ctx.strokeStyle = "#0288D1"; ctx.lineWidth = 2; ctx.stroke();
                        ctx.restore();
                    }
                }
                // ---- LUOI GIO ----
                for (let d of this.luoi){
                    let sy = (d.sanY || 320) - 4;
                    let gan = Math.max(0, Math.min(1, (d.y + 120) / 420));
                    ctx.fillStyle = "rgba(0,0,0," + (0.16 + 0.30 * gan).toFixed(2) + ")";
                    ctx.beginPath(); ctx.ellipse(d.dat, sy, 30, 8, 0, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = (frames % 6 < 3) ? "#4FC3F7" : "rgba(79,195,247,0.35)"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.ellipse(d.dat, sy, 30, 8, 0, 0, Math.PI*2); ctx.stroke();
                    ctx.save(); ctx.translate(d.x, d.y); ctx.rotate(Math.atan2(d.vy, d.vx));
                    ctx.fillStyle = "#E1F5FE"; ctx.beginPath();
                    ctx.moveTo(-16, 0); ctx.quadraticCurveTo(0, -9, 16, 0); ctx.quadraticCurveTo(0, 9, -16, 0);
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#0288D1"; ctx.lineWidth = 2; ctx.stroke();
                    ctx.restore();
                }
                // ---- DAU ----
                ctx.save(); ctx.translate(cx, cy); ctx.scale(this.facingLeft ? -1 : 1, 1);
                for (let k = 3; k >= 1; k--){
                    ctx.save(); ctx.globalAlpha = 0.9 - k * 0.16;
                    ctx.fillStyle = k % 2 ? "#0277BD" : "#0288D1";
                    let ox = -this.w * 0.55 * k, sc = 1 - k * 0.12;
                    ctx.beginPath();
                    ctx.ellipse(ox, Math.sin(this.lac - k*0.7) * 9, 24*sc, 21*sc, 0, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#01579B"; ctx.lineWidth = 3; ctx.stroke();
                    ctx.restore();
                }
                ctx.fillStyle = this.rage ? "#4FC3F7" : "#039BE5";
                ctx.beginPath(); ctx.ellipse(0, 0, this.w/2, this.h/2, 0, 0, Math.PI*2); ctx.fill();
                ctx.strokeStyle = "#01579B"; ctx.lineWidth = 4; ctx.stroke();
                ctx.fillStyle = "rgba(225,245,254,0.6)";
                ctx.beginPath(); ctx.ellipse(-4, -8, this.w/3, this.h/5, 0, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = this.rage ? "#FFEB3B" : "#E1F5FE";
                ctx.shadowBlur = 14; ctx.shadowColor = ctx.fillStyle;
                ctx.fillRect(this.w/2 - 24, -11, 9, 9); ctx.fillRect(this.w/2 - 24, 3, 9, 9);
                ctx.shadowBlur = 0;
                ctx.strokeStyle = "#B3E5FC"; ctx.lineWidth = 2;             // rau gio
                for (let k = 0; k < 3; k++){
                    ctx.beginPath(); ctx.moveTo(this.w/2 - 8, -14 + k*14);
                    ctx.quadraticCurveTo(this.w/2 + 18, -18 + k*14 + Math.sin(this.lac*2 + k)*6, this.w/2 + 34, -10 + k*14);
                    ctx.stroke();
                }
                ctx.restore();
                if (this.state === 'aa_bao'){
                    ctx.strokeStyle = (frames % 5 < 3) ? "#FF1744" : "rgba(255,23,68,0.25)"; ctx.lineWidth = 4;
                    ctx.strokeRect(this.x - 10, this.y - 10, this.w + 20, this.h + 20);
                    ctx.fillStyle = "#FF1744"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("LAO LEN!", cx, this.y - 18); ctx.textAlign = "left";
                }
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 150, 14, 300, 11);
                ctx.fillStyle = this.rage ? "#4FC3F7" : "#0288D1";
                ctx.fillRect(canvas.width/2 - 149, 15, 298 * Math.max(0, this.hp / this.maxHp), 9);
                ctx.fillStyle = "white"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + "  " + Math.max(0, Math.ceil(this.hp)) + "/" + this.maxHp, canvas.width/2, 34);
                ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s1.StormSerpentBoss.1

// Nguồn: index.html:44306 · Dùng bởi: StormSerpentBoss
// BOSS_PART_BEGIN s1.PX_BAO_COT.1 EDITABLE
const PX_BAO_COT = 44, PX_COT_SONG = 30, PX_COT_RONG = 46;
// BOSS_PART_END s1.PX_BAO_COT.1

// Nguồn: index.html:44307 · Dùng bởi: StormSerpentBoss
// BOSS_PART_BEGIN s1.PX_BAO_QUET.1 EDITABLE
const PX_BAO_QUET = 40, PX_QUET_TOC = 12;
// BOSS_PART_END s1.PX_BAO_QUET.1

// Nguồn: index.html:44310 · Dùng bởi: StormSerpentBoss
// BOSS_PART_BEGIN s1.PX_LUOI_CD.1 EDITABLE
const PX_LUOI_CD = 250, PX_LUOI_CD2 = 190;
// BOSS_PART_END s1.PX_LUOI_CD.1

// Nguồn: index.html:44311 · Dùng bởi: StormSerpentBoss
// BOSS_PART_BEGIN s1.PX_NGHI.1 EDITABLE
const PX_NGHI = 100, PX_NGHI2 = 74;
// BOSS_PART_END s1.PX_NGHI.1

// Nguồn: index.html:44312 · Dùng bởi: StormSerpentBoss
// BOSS_PART_BEGIN s1.PX_EP_DAI.1 EDITABLE
const PX_EP_DAI = 170, PX_BAO_DAI = 380;
// BOSS_PART_END s1.PX_EP_DAI.1

// Nguồn: index.html:44313 · Dùng bởi: StormSerpentBoss
// BOSS_PART_BEGIN s1.PX_XOAY_DAI.1 EDITABLE
const PX_XOAY_DAI = 300;
// BOSS_PART_END s1.PX_XOAY_DAI.1
