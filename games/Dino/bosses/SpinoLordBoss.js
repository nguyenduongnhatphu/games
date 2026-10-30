// BOSS_FILE: SpinoLordBoss
// BOSS_SNAPSHOT: 90b44e51b8a8c0ad12fba495a59e199c399e173aab86fbee147786ba09666942
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LT, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, addStyle, bossProjectiles, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, parryX, shakeTimer, visualEffects
// Nguồn: index.html:1184 · Dùng bởi: SpinoLordBoss
// BOSS_PART_BEGIN s0.SPL_HP.1 EDITABLE
const SPL_HP = 300, SPL_W = 250, SPL_H = 150, SPL_R = 78, SPL_DAT = 320;
// BOSS_PART_END s0.SPL_HP.1

// Nguồn: index.html:1185 · Dùng bởi: SpinoLordBoss
// BOSS_PART_BEGIN s0.SPL_BANH_LUOT.1 EDITABLE
const SPL_BANH_LUOT = 5, SPL_BANH_CHAN = 3, SPL_CHOANG = 180;
// BOSS_PART_END s0.SPL_BANH_LUOT.1

// Nguồn: index.html:1186 · Dùng bởi: SpinoLordBoss
// BOSS_PART_BEGIN s0.SpinoLordBoss.1 EDITABLE
class SpinoLordBoss {
            constructor(level){
                this.hp = SPL_HP; this.maxHp = SPL_HP; this.name = "SPINOSAURUS LORD";
                this.w = SPL_W; this.h = SPL_H; this.x = canvas.width + 20; this.y = SPL_DAT - SPL_H;
                this.state = 'entering'; this.t = 0; this.actionTimer = 70; this.facingLeft = true;
                this.lastMeleeHit = -1; this.burnTimer = 0; this.tuXuLyKhien = true;
                this.tui = []; this.chan = 0; this.moHam = 0; this.nghieng = 0; this.hamBao = 0;
            }
            spd(){ return this.hp < this.maxHp * 0.4 ? 1.18 : 1; }
            tuoiTho(){ return this.hp < this.maxHp * 0.4; }
            dauX(){ return this.facingLeft ? this.x : this.x + this.w; }
            hopDau(dai){ let d = dai || 130; return this.facingLeft ? { x: this.x - d + 40, y: this.y + 28, w: d, h: 72 } : { x: this.x + this.w - 40, y: this.y + 28, w: d, h: 72 }; }
            cham(r){ if (checkAABB(dino, r)) this.hurtP(1); }
            nhanh(v){ return v * this.spd(); }
            // ---------- CHON CHIEU ----------
            chonChieu(){
                if (!this.tui.length){ this.tui = ['l_quat','l_phun','l_song','l_lan','l_banh'];
                    for (let i = this.tui.length - 1; i > 0; i--){ let j = Math.floor(Math.random() * (i + 1)); [this.tui[i], this.tui[j]] = [this.tui[j], this.tui[i]]; } }
                let kc = Math.abs(this.gap()), hop = kc > 450 ? ['l_phun','l_lan','l_banh'] : (kc < 230 ? ['l_quat','l_song','l_banh'] : null);
                let i = hop ? this.tui.findIndex(s => hop.indexOf(s) >= 0) : 0; if (i < 0) i = 0;
                let s = this.tui.splice(i, 1)[0];
                this.state = s; this.t = 0; this.p = 'bat';
                if (s === 'l_banh') this.banhVao();
                if (s === 'l_phun'){ this.loat = 0; }
                if (s === 'l_song'){ this.dap = 0; }
            }
            veIdle(){ this.state = 'idle'; this.t = 0; this.actionTimer = this.tuoiTho() ? 30 : 42; this.nghieng = 0; this.moHam = 0; }   // @@HE-SIEUKL: nghi ngan hon (truoc 55/40)
            // ---------- BANH XE ----------
            banhVao(){
                let cx = this.cx();
                this.w = this.h = SPL_R * 2; this.x = cx - SPL_R; this.y = SPL_DAT - SPL_R * 2;
                this.bd = this.facingLeft ? -1 : 1; this.bLuot = 0; this.bGioiHan = SPL_BANH_LUOT; this.bChanDuoc = false;
                this.bChanLuot = false; this.bCham = 0; this.bVy = 0; this.bNang = 0; this.bGoc = 0; this.p = 'cuon';
            }
            banhRa(){
                let cx = this.cx(); this.w = SPL_W; this.h = SPL_H; this.x = cx - SPL_W / 2; this.y = SPL_DAT - SPL_H;
                this.x = Math.max(10, Math.min(canvas.width - SPL_W - 10, this.x));
            }
            banhTick(){
                let v0 = this.nhanh(15.5), cx = this.cx();
                this.bGoc += (this.p === 'cuon' ? Math.min(0.5, this.t * 0.012) : 0.55 * this.bd);
                // nhay theo nguoi choi (khong qua cao)
                if (this.bNang > 0 || this.bVy < 0){ this.bNang = Math.max(0, this.bNang - this.bVy); this.bVy += 0.5; if (this.bNang <= 0){ this.bNang = 0; this.bVy = 0; } }
                this.y = SPL_DAT - SPL_R * 2 - this.bNang;
                if (this.p === 'cuon'){                     // cuon tron + quay tai cho: 40 khung bao truoc
                    this.t++; if (this.t % 4 === 0) visualEffects.push(new Effect(cx - this.bd * 60, SPL_DAT - 6, 'explosion', this.bd > 0, 10));
                    if (this.t >= 40){ this.p = 'lan'; this.t = 0; shakeTimer = Math.max(shakeTimer, 14); if (typeof SFX !== 'undefined' && SFX.bossSkill) SFX.bossSkill(); }
                    return;
                }
                if (this.p === 'lan'){
                    this.t++;
                    let v = this.bCham > 0 ? v0 * 0.3 : v0; if (this.bCham > 0) this.bCham--;
                    this.x += v * this.bd; cx = this.cx();
                    if (frames % 3 === 0) visualEffects.push(new Effect(cx - this.bd * SPL_R, SPL_DAT - 8, 'charge_wave', this.bd > 0));
                    // nguoi choi nhay truoc mat -> nhay len theo (dinh ~70px)
                    let pcx = dino.x + dino.w / 2, truoc = (pcx - cx) * this.bd;
                    if (this.bNang === 0 && dino.y + dino.h < SPL_DAT - 26 && truoc > 0 && truoc < 250) this.bVy = -8.2;
                    // va cham: CHAN hoac TRUNG — khong co parry
                    if (checkAABB(dino, this)){
                        if (dino.isShielding()){
                            if (!this.bChanLuot){
                                this.bChanLuot = true; this.bChanDuoc = true; this.bCham = 42;
                                this.bGioiHan = Math.max(this.bLuot + 1, Math.min(this.bGioiHan, SPL_BANH_CHAN));
                                visualEffects.push(new Effect(parryX(), dino.y, 'parry')); shakeTimer = Math.max(shakeTimer, 18);
                                floatingTexts.push(new FloatingText(dino.x - 20, dino.y - 34, LT("CHẶN!", "BLOCKED!")));
                                if (typeof addStyle === 'function') addStyle(12, 'parry');
                                if (typeof SFX !== 'undefined' && SFX.parry) SFX.parry();
                            }
                        } else dino.takeDamage(1);
                    }
                    // het luot: da vuot qua nguoi choi du xa, hoac cham mep san
                    let quaXa = truoc < -230, mep = this.bd > 0 ? (cx >= canvas.width - SPL_R - 16) : (cx <= SPL_R + 16);
                    if ((quaXa || mep) && this.t > 12){
                        this.bLuot++; this.t = 0;
                        if (this.bLuot >= this.bGioiHan){ this.p = 'dung'; }
                        else { this.p = 'quay'; this.bVao = v; }
                    }
                    return;
                }
                if (this.p === 'quay'){                    // cua vong quay dau: cham dan, vot len theo vong cung, doi chieu
                    this.t++; let k = this.t / 24;
                    this.x += this.bd * this.bVao * Math.max(0, 1 - k);
                    this.bNang = Math.max(this.bNang, Math.sin(Math.PI * k) * 46);
                    this.x = Math.max(4, Math.min(canvas.width - this.w - 4, this.x));
                    if (this.t >= 24){ this.bd = -this.bd; this.p = 'rev'; this.t = 0; this.bChanLuot = false; this.bCham = 0; }
                    return;
                }
                if (this.p === 'rev'){                     // gam tai cho: 18 khung bao truoc luot ke (tong ~42 khung tu luc cua)
                    this.t++; if (this.t % 3 === 0) visualEffects.push(new Effect(this.cx() - this.bd * 60, SPL_DAT - 6, 'explosion', this.bd > 0, 9));
                    if (this.t >= 18){ this.p = 'lan'; this.t = 0; }
                    return;
                }
                if (this.p === 'dung'){                    // phanh lai
                    this.t++; this.x += this.bd * v0 * Math.max(0, 1 - this.t / 14);
                    this.x = Math.max(4, Math.min(canvas.width - this.w - 4, this.x));
                    if (this.t >= 14){
                        this.banhRa();
                        if (this.bChanDuoc){ this.state = 'l_choang'; this.t = 0;
                            floatingTexts.push(new FloatingText(this.cx() - 40, this.y - 20, LT("CHOÁNG!", "STUNNED!"))); }
                        else this.veIdle();
                    }
                }
            }
            // ---------- UPDATE ----------
            update(){
                if (this.dying) return;
                this.moHam = Math.max(0, this.moHam - 0.08);
                if (this.state === 'entering'){
                    this.x -= 5; this.facingLeft = true;
                    if (this.x <= canvas.width - SPL_W - 60){ this.veIdle(); this.actionTimer = 50; }
                    return;
                }
                if (this.state === 'idle'){
                    this.faceP(); this.invulnAll = false;
                    let g = this.gap(), kc = Math.abs(g);
                    if (kc > 440) this.x += Math.sign(g) * this.nhanh(2.4);
                    else if (kc < 230) this.x -= Math.sign(g) * this.nhanh(1.8);
                    this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x));
                    if (--this.actionTimer <= 0) this.chonChieu();
                    return;
                }
                if (this.state === 'l_choang'){ if (++this.t >= SPL_CHOANG) this.veIdle(); return; }
                if (this.state === 'l_banh'){ this.banhTick(); return; }
                this.t++;
                // ===== QUAT: lao toi, can 2 nhat, quat duoi xoay + song nuoc =====
                if (this.state === 'l_quat'){
                    if (this.p === 'bat'){
                        this.faceP(); this.x += this.dir() * this.nhanh(7);
                        this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x));
                        this.cham(this);
                        if (Math.abs(this.gap()) < 175 || this.t > 70){ this.p = 'can1b'; this.t = 0; }
                    } else if (this.p === 'can1b' || this.p === 'can2b'){
                        this.moHam = Math.min(1, this.moHam + 0.12); this.hamBao = 1;
                        if (this.t >= (this.p === 'can1b' ? 18 : 12)){ this.p = this.p === 'can1b' ? 'can1' : 'can2'; this.t = 0; this.hamBao = 0; this.moHam = 0; shakeTimer = Math.max(shakeTimer, 8); }
                    } else if (this.p === 'can1' || this.p === 'can2'){
                        this.cham(this.hopDau(135));
                        if (this.t >= 8){ if (this.p === 'can1'){ this.faceP(); this.p = 'can2b'; } else this.p = 'duoib'; this.t = 0; }
                    } else if (this.p === 'duoib'){
                        this.nghieng = Math.min(1, this.t / 26);
                        if (this.t >= 26){ this.p = 'duoi'; this.t = 0; shakeTimer = Math.max(shakeTimer, 16); }
                    } else if (this.p === 'duoi'){
                        this.nghieng = 1;
                        this.cham({ x: this.cx() - 215, y: SPL_DAT - 58, w: 430, h: 58 });   // quat thap hai phia: NHAY
                        if (this.t === 10){ for (let d of [-1, 1]) bossProjectiles.push(this.songNuoc(this.cx() + d * 120, d * this.nhanh(8.5), 46)); }
                        if (this.t >= 14){ this.p = 'nghi'; this.t = 0; }
                    } else if (this.p === 'nghi'){ this.nghieng = Math.max(0, 1 - this.t / 20); if (this.t >= 30) this.veIdle(); }
                    return;
                }
                // ===== PHUN: 3 loat x3 vien nham theo + qua cau to xuyen khien =====
                if (this.state === 'l_phun'){
                    this.faceP();
                    if (this.p === 'bat'){ this.moHam = Math.min(1, this.t / 26); this.hamBao = 1; if (this.t >= 30){ this.p = 'ban'; this.t = 0; this.hamBao = 0; } }
                    else if (this.p === 'ban'){
                        if (this.t % 24 === 1){
                            let sx = this.dauX(), sy = this.y + 52, a0 = Math.atan2((dino.y + dino.h / 2) - sy, (dino.x + dino.w / 2) - sx);
                            for (let k = -1; k <= 1; k++){ let a = a0 + k * 0.17, sp = this.nhanh(9.5);
                                let q = new BossProjectile(sx - 9, sy - 9, Math.cos(a) * sp, Math.sin(a) * sp, false, 1); q.w = q.h = 18; q.veRieng = splVeCauNuoc; bossProjectiles.push(q); }
                            this.moHam = 1; this.loat++;
                            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(260, 0.12, 'triangle', 0.14, 140);
                        }
                        if (this.loat >= 3 && this.t % 24 === 8){ this.p = 'to'; this.t = 0; }
                    } else if (this.p === 'to'){
                        this.moHam = Math.min(1, this.t / 20); this.hamBao = 1;
                        if (this.t === 30){
                            let sx = this.dauX(), sy = this.y + 52, a = Math.atan2((dino.y + dino.h / 2) - sy, (dino.x + dino.w / 2) - sx), sp = this.nhanh(6.5);
                            let q = new BossProjectile(sx - 24, sy - 24, Math.cos(a) * sp, Math.sin(a) * sp, false, 1); q.w = q.h = 48; q.isPiercing = true; q.veRieng = splVeCauNuoc; bossProjectiles.push(q);
                            shakeTimer = Math.max(shakeTimer, 12); this.hamBao = 0;
                        }
                        if (this.t >= 60) this.veIdle();
                    }
                    return;
                }
                // ===== SONG: dung len dap xuong 2 lan -> tuong nuoc hai phia =====
                if (this.state === 'l_song'){
                    let bao = this.dap === 0 ? 36 : 26;
                    if (this.p === 'bat'){ this.nghieng = -Math.min(1, this.t / bao); if (this.t >= bao){ this.p = 'dap'; this.t = 0; } }
                    else if (this.p === 'dap'){
                        this.nghieng = 0.25;
                        if (this.t === 1){
                            shakeTimer = Math.max(shakeTimer, 26); this.cham({ x: this.cx() - 150, y: SPL_DAT - 40, w: 300, h: 40 });
                            let h = this.dap === 0 ? 72 : 56, v = this.dap === 0 ? 7 : 10;
                            for (let d of [-1, 1]) bossProjectiles.push(this.songNuoc(this.cx() + d * 110, d * this.nhanh(v), h));
                            if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
                        }
                        if (this.t >= 20){ this.dap++; this.t = 0; this.p = this.dap >= 2 ? 'nghi' : 'bat'; }
                    } else if (this.p === 'nghi'){ this.nghieng = Math.max(0, 0.25 - this.t / 40); if (this.t >= 30) this.veIdle(); }
                    return;
                }
                // ===== LAN: chim xuong, canh buom luot duoi theo, troi len =====
                if (this.state === 'l_lan'){
                    if (this.p === 'bat'){ this.y = SPL_DAT - SPL_H + (SPL_H + 10) * Math.min(1, this.t / 36); if (this.t >= 36){ this.p = 'boi'; this.t = 0; this.invulnAll = true; } }
                    else if (this.p === 'boi'){
                        let g = this.gap(); this.facingLeft = g < 0;
                        this.x += Math.sign(g) * Math.min(Math.abs(g), this.nhanh(6.2));
                        this.x = Math.max(-40, Math.min(canvas.width - this.w + 40, this.x));
                        this.cham({ x: this.cx() - 55, y: SPL_DAT - 44, w: 110, h: 44 });   // canh buom luot tren mat dat
                        if (frames % 4 === 0) visualEffects.push(new Effect(this.cx(), SPL_DAT - 4, 'explosion', true, 10));
                        if (Math.abs(g) < 18 || this.t > 120){ this.p = 'bao'; this.t = 0; }
                    } else if (this.p === 'bao'){ if (this.t >= 34){ this.p = 'troi'; this.t = 0; this.invulnAll = false; this.vy = -15; shakeTimer = Math.max(shakeTimer, 22);
                            if (typeof SFX !== 'undefined' && SFX.bossSkill) SFX.bossSkill(); } }
                    else if (this.p === 'troi'){
                        this.y += this.vy; this.vy += 0.75;
                        this.cham(this);
                        if (this.vy > 0 && this.y >= SPL_DAT - SPL_H){ this.y = SPL_DAT - SPL_H; this.p = 'nghi'; this.t = 0; shakeTimer = Math.max(shakeTimer, 14);
                            this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x)); }
                    } else if (this.p === 'nghi'){ if (this.t >= 34) this.veIdle(); }
                    return;
                }
            }
            songNuoc(x, vx, h){
                let q = new BossProjectile(x - 16, SPL_DAT - h, vx, 0, true, 1);
                q.w = 32; q.h = h; q.color = "#4FC3F7"; q.veRieng = splVeTuongNuoc; return q;
            }
            // ---------- VE ----------
            draw(){
                let x = this.x, y = this.y;
                if (this.state === 'l_banh'){ this.veBanh(); return; }
                // bao truoc
                ctx.save();
                if (this.state === 'l_quat' && (this.p === 'can1b' || this.p === 'can2b')){ let r = this.hopDau(135); ctx.fillStyle = "rgba(255,23,68,0.28)"; ctx.fillRect(r.x, r.y, r.w, r.h); }
                if (this.state === 'l_quat' && this.p === 'duoib'){ ctx.fillStyle = "rgba(255,23,68," + (0.15 + 0.15 * (this.t % 8 < 4)) + ")"; ctx.fillRect(this.cx() - 215, SPL_DAT - 58, 430, 58); }
                if (this.state === 'l_song' && this.p === 'bat'){ ctx.strokeStyle = "rgba(79,195,247,0.8)"; ctx.lineWidth = 3; ctx.setLineDash([10, 8]);
                    ctx.beginPath(); ctx.moveTo(0, SPL_DAT - 2); ctx.lineTo(canvas.width, SPL_DAT - 2); ctx.stroke(); ctx.setLineDash([]); }
                if (this.state === 'l_lan' && this.p === 'bao'){ let a = 0.25 + 0.25 * (this.t % 6 < 3);
                    ctx.fillStyle = "rgba(255,109,0," + a + ")"; ctx.fillRect(this.cx() - 80, SPL_DAT - 250, 160, 250);
                    ctx.fillStyle = "rgba(121,85,72,0.8)"; for (let k = 0; k < 6; k++) ctx.fillRect(this.cx() - 70 + k * 26 + Math.random() * 6, SPL_DAT - 8 - Math.random() * 10, 6, 6); }
                ctx.restore();
                // than
                ctx.save();
                if (this.state === 'l_lan' && this.p !== 'troi'){ ctx.beginPath(); ctx.rect(-200, -400, canvas.width + 400, SPL_DAT + 400); ctx.clip(); }
                if (this.state === 'l_lan' && this.p === 'boi') this.veCanhBoi(); else this.veThan(x, y);
                ctx.restore();
                if (this.state === 'l_choang'){
                    ctx.save(); ctx.fillStyle = "#FFEB3B";
                    for (let k = 0; k < 4; k++){ let a = frames * 0.12 + k * Math.PI / 2;
                        ctx.beginPath(); ctx.arc(this.cx() + Math.cos(a) * 46, this.y - 14 + Math.sin(a) * 10, 5, 0, Math.PI * 2); ctx.fill(); }
                    ctx.restore();
                }
            }
            // than (khung toa do quay mat TRAI, lat khi quay phai)
            veThan(x, y){
                ctx.save();
                if (!this.facingLeft){ ctx.translate(x + this.w / 2, 0); ctx.scale(-1, 1); ctx.translate(-(x + this.w / 2), 0); }
                let ng = this.nghieng || 0, choang = this.state === 'l_choang';
                ctx.translate(x + 150, y + 110); ctx.rotate(ng * -0.28 + (choang ? 0.12 : 0)); ctx.translate(-(x + 150), -(y + 110));
                let buoc = (this.state === 'idle' || (this.state === 'l_quat' && this.p === 'bat')) ? Math.sin(frames * 0.25) * 7 : 0;
                // duoi
                ctx.fillStyle = "#37474F";
                ctx.beginPath(); ctx.moveTo(x + 190, y + 70); ctx.quadraticCurveTo(x + 240, y + 60 + Math.sin(frames * 0.1) * 6, x + 290, y + 88 + Math.sin(frames * 0.1) * 10);
                ctx.lineTo(x + 196, y + 108); ctx.closePath(); ctx.fill();
                // buom
                let gb = ctx.createLinearGradient(0, y - 60, 0, y + 70); gb.addColorStop(0, "#FF3D00"); gb.addColorStop(0.6, "#E64A19"); gb.addColorStop(1, "#6D1B00");
                ctx.fillStyle = gb;
                ctx.beginPath(); ctx.moveTo(x + 80, y + 62); ctx.quadraticCurveTo(x + 105, y - 70, x + 160, y - 58); ctx.quadraticCurveTo(x + 205, y - 40, x + 215, y + 66); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#3E0E00"; ctx.lineWidth = 3; ctx.stroke();
                ctx.strokeStyle = "rgba(255,213,79,0.55)"; ctx.lineWidth = 2;
                for (let k = 0; k < 7; k++){ let bx = x + 92 + k * 17; ctx.beginPath(); ctx.moveTo(bx, y + 62); ctx.lineTo(bx + 4 + k * 2, y - 44 + Math.abs(k - 3) * 10); ctx.stroke(); }
                // chan
                ctx.fillStyle = "#263238";
                ctx.fillRect(x + 118, y + 100 + buoc, 26, 50 - buoc); ctx.fillRect(x + 160, y + 100 - buoc, 28, 50 + buoc);
                ctx.fillStyle = "#ECEFF1"; for (let k = 0; k < 3; k++){ ctx.fillRect(x + 114 + k * 9, y + 146, 5, 4); ctx.fillRect(x + 156 + k * 9, y + 146, 5, 4); }
                // than
                ctx.fillStyle = "#455A64"; ctx.beginPath(); ctx.ellipse(x + 150, y + 84, 74, 36, -0.05, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "#B0BEC5"; ctx.beginPath(); ctx.ellipse(x + 142, y + 104, 52, 14, 0, 0, Math.PI * 2); ctx.fill();
                // tay
                ctx.fillStyle = "#37474F"; ctx.fillRect(x + 88, y + 92, 12, 26); ctx.fillStyle = "#ECEFF1"; ctx.fillRect(x + 84, y + 116, 4, 6); ctx.fillRect(x + 92, y + 116, 4, 6);
                // co + dau (mom ca sau dai)
                ctx.fillStyle = "#455A64"; ctx.beginPath(); ctx.moveTo(x + 110, y + 62); ctx.lineTo(x + 70, y + 40); ctx.lineTo(x + 66, y + 74); ctx.lineTo(x + 110, y + 102); ctx.closePath(); ctx.fill();
                let mo = (this.moHam || 0) * 16;
                ctx.fillStyle = "#37474F"; ctx.fillRect(x - 6, y + 34, 84, 24);                       // ham tren
                ctx.fillStyle = "#2E3B41"; ctx.fillRect(x + 2, y + 58 + mo, 72, 14);                   // ham duoi
                if (mo > 1){ ctx.fillStyle = "#4E0D0D"; ctx.fillRect(x + 4, y + 58, 70, mo); }
                ctx.fillStyle = "#FAFAFA";
                for (let k = 0; k < 7; k++){ ctx.fillRect(x - 2 + k * 11, y + 58, 5, 6); ctx.fillRect(x + 4 + k * 10, y + 52 + mo, 5, 6); }
                if (this.hamBao){ ctx.fillStyle = "rgba(79,195,247," + (0.35 + 0.3 * Math.sin(frames * 0.6)) + ")"; ctx.beginPath(); ctx.arc(x + 2, y + 60 + mo / 2, 14, 0, Math.PI * 2); ctx.fill(); }
                // mat
                ctx.fillStyle = choang ? "#9E9E9E" : "#FFEB3B"; ctx.fillRect(x + 50, y + 38, 10, 7);
                ctx.fillStyle = choang ? "#616161" : "#D50000"; ctx.fillRect(x + 52, y + 40, 4, 4);
                ctx.fillStyle = "#212121"; ctx.fillRect(x + 44, y + 32, 22, 4);                      // gio may
                ctx.restore();
            }
            veCanhBoi(){      // chi thay canh buom luot tren mat dat
                let cx = this.cx(), d = this.facingLeft ? -1 : 1;
                ctx.save(); ctx.translate(cx, SPL_DAT); ctx.scale(-d, 1);
                ctx.fillStyle = "#E64A19"; ctx.beginPath(); ctx.moveTo(-50, 0); ctx.quadraticCurveTo(-20, -60, 20, -52); ctx.quadraticCurveTo(46, -30, 52, 0); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#3E0E00"; ctx.lineWidth = 3; ctx.stroke();
                ctx.strokeStyle = "rgba(255,213,79,0.6)"; ctx.lineWidth = 2;
                for (let k = 0; k < 5; k++){ ctx.beginPath(); ctx.moveTo(-36 + k * 18, 0); ctx.lineTo(-30 + k * 18, -40 + Math.abs(k - 2) * 8); ctx.stroke(); }
                ctx.restore();
                ctx.fillStyle = "rgba(161,136,127,0.8)";
                for (let k = 0; k < 4; k++) ctx.fillRect(cx - d * (40 + k * 16) + Math.random() * 4, SPL_DAT - 6 - Math.random() * 8, 6, 5);
            }
            veBanh(){         // BANH XE BUOM: than cuon tron, buom xoe thanh vanh rang cua
                let cx = this.cx(), cy = this.cy(), R = SPL_R;
                ctx.save();
                // bong + bao truoc huong lan (cuon / rev)
                if (this.p === 'cuon' || this.p === 'rev' || this.p === 'quay'){
                    ctx.strokeStyle = "rgba(255,23,68," + (0.45 + 0.35 * (frames % 8 < 4)) + ")"; ctx.lineWidth = 6; ctx.setLineDash([16, 10]);
                    let d = this.p === 'quay' ? -this.bd : this.bd;
                    ctx.beginPath(); ctx.moveTo(cx + d * R, SPL_DAT - 6); ctx.lineTo(cx + d * (R + 360), SPL_DAT - 6); ctx.stroke(); ctx.setLineDash([]);
                    ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.moveTo(cx + d * (R + 380), SPL_DAT - 6); ctx.lineTo(cx + d * (R + 350), SPL_DAT - 22); ctx.lineTo(cx + d * (R + 350), SPL_DAT + 10); ctx.closePath(); ctx.fill();
                }
                ctx.translate(cx, cy); ctx.rotate(this.bGoc);
                // quang
                ctx.fillStyle = "rgba(255,61,0,0.18)"; ctx.beginPath(); ctx.arc(0, 0, R + 18, 0, Math.PI * 2); ctx.fill();
                // vanh buom rang cua
                ctx.fillStyle = "#E64A19"; ctx.strokeStyle = "#3E0E00"; ctx.lineWidth = 2.5;
                ctx.beginPath();
                for (let k = 0; k < 14; k++){ let a = k / 14 * Math.PI * 2, a2 = a + Math.PI / 14;
                    ctx.lineTo(Math.cos(a) * (R - 6), Math.sin(a) * (R - 6)); ctx.lineTo(Math.cos(a2) * (R + 12), Math.sin(a2) * (R + 12)); }
                ctx.closePath(); ctx.fill(); ctx.stroke();
                // than cuon
                ctx.fillStyle = "#455A64"; ctx.beginPath(); ctx.arc(0, 0, R - 14, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = "#263238"; ctx.lineWidth = 5;
                ctx.beginPath(); ctx.arc(0, 0, R - 30, 0.3, 2.6); ctx.stroke();
                ctx.beginPath(); ctx.arc(0, 0, R - 44, 3.4, 5.6); ctx.stroke();
                ctx.fillStyle = "#37474F"; ctx.fillRect(-10, -R + 18, 44, 18);   // dau cuon vao
                ctx.fillStyle = "#FFEB3B"; ctx.fillRect(18, -R + 21, 7, 5);
                ctx.restore();
                // vet toc do
                if (this.p === 'lan'){ ctx.save(); ctx.strokeStyle = "rgba(255,171,64,0.55)"; ctx.lineWidth = 3;
                    for (let k = 0; k < 4; k++){ let yy = cy - R * 0.6 + k * R * 0.4; ctx.beginPath(); ctx.moveTo(cx - this.bd * (R + 10), yy); ctx.lineTo(cx - this.bd * (R + 60 + k * 10), yy); ctx.stroke(); }
                    ctx.restore(); }
            }
        }
// BOSS_PART_END s0.SpinoLordBoss.1

// Nguồn: index.html:1511 · Dùng bởi: SpinoLordBoss
// BOSS_PART_BEGIN s0.splVeCauNuoc.1 EDITABLE
function splVeCauNuoc(q){
            let cx = q.x + q.w / 2, cy = q.y + q.h / 2, r = q.w / 2;
            ctx.save();
            ctx.fillStyle = "rgba(79,195,247,0.30)"; ctx.beginPath(); ctx.arc(cx, cy, r * 1.35, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = q.isPiercing ? "#0277BD" : "#29B6F6"; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.beginPath(); ctx.arc(cx - r * 0.3, cy - r * 0.3, r * 0.3, 0, Math.PI * 2); ctx.fill();
            if (q.isPiercing){ ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r + 4 + Math.sin(frames * 0.4) * 2, 0, Math.PI * 2); ctx.stroke(); }
            ctx.restore();
        }
// BOSS_PART_END s0.splVeCauNuoc.1

// Nguồn: index.html:1520 · Dùng bởi: SpinoLordBoss
// BOSS_PART_BEGIN s0.splVeTuongNuoc.1 EDITABLE
function splVeTuongNuoc(q){
            let d = q.vx >= 0 ? 1 : -1, x = q.x, y = q.y, w = q.w, h = q.h;
            ctx.save();
            let g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, "#E1F5FE"); g.addColorStop(0.3, "#4FC3F7"); g.addColorStop(1, "#01579B");
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x + (d > 0 ? 0 : w), y + h * 0.1);
            ctx.quadraticCurveTo(x + w / 2 + d * w * 0.6, y - 6, x + (d > 0 ? w : 0), y + h * 0.35); ctx.lineTo(x + (d > 0 ? w : 0), y + h); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "rgba(255,255,255,0.8)";
            for (let k = 0; k < 3; k++) ctx.fillRect(x + w / 2 + d * (w * 0.4) + Math.random() * 6 - 3, y + k * 5 + Math.random() * 4, 4, 4);
            ctx.restore();
        }
// BOSS_PART_END s0.splVeTuongNuoc.1

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
