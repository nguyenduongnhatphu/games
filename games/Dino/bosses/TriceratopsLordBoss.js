// BOSS_FILE: TriceratopsLordBoss
// BOSS_SNAPSHOT: 9124d003c3ce72e4e4fcae863db4e13cdfe06607527a4558945ab0774010859b
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, frames, parry, parryX, shakeTimer, visualEffects
// Nguồn: index.html:1544 · Dùng bởi: TriceratopsLordBoss
// BOSS_PART_BEGIN s0.TCL_HP.1 EDITABLE
const TCL_HP = 320, TCL_W = 260, TCL_H = 160, TCL_DAT = 320;
// BOSS_PART_END s0.TCL_HP.1

// Nguồn: index.html:1545 · Dùng bởi: TriceratopsLordBoss
// BOSS_PART_BEGIN s0.TriceratopsLordBoss.1 EDITABLE
class TriceratopsLordBoss {
            constructor(level){
                this.hp = TCL_HP; this.maxHp = TCL_HP; this.name = "TRICERATOPS LORD";
                this.w = TCL_W; this.h = TCL_H; this.x = canvas.width + 20; this.y = TCL_DAT - TCL_H;
                this.state = 'entering'; this.t = 0; this.actionTimer = 60; this.facingLeft = true;
                this.lastMeleeHit = -1; this.burnTimer = 0; this.tuXuLyKhien = true;
                this.tui = []; this.cui = 0; this.nang = 0; this.phat = 0;
            }
            spd(){ return this.hp < this.maxHp * 0.4 ? 1.15 : 1; }
            nhanh(v){ return v * this.spd(); }
            dauX(){ return this.facingLeft ? this.x + 10 : this.x + this.w - 10; }
            hopXung(){   // vung xung kich truoc sung (dai 95)
                return this.facingLeft ? { x: this.x - 95, y: this.y + 30, w: 110, h: 110 } : { x: this.x + this.w - 15, y: this.y + 30, w: 110, h: 110 };
            }
            cham(r){ if (checkAABB(dino, r)) this.hurtP(1); }
            veIdle(){ this.state = 'idle'; this.t = 0; this.actionTimer = this.hp < this.maxHp * 0.4 ? 30 : 42; this.cui = 0; this.nang = 0; this.phat = 0; }
            chonChieu(){
                if (!this.tui.length){ this.tui = ['k_huc','k_quet','k_dap','k_nhay','k_boom'];
                    for (let i = this.tui.length - 1; i > 0; i--){ let j = Math.floor(Math.random() * (i + 1)); [this.tui[i], this.tui[j]] = [this.tui[j], this.tui[i]]; } }
                let kc = Math.abs(this.gap()), hop = kc > 450 ? ['k_huc','k_boom','k_nhay'] : (kc < 230 ? ['k_quet','k_dap','k_huc'] : null);
                let i = hop ? this.tui.findIndex(s => hop.indexOf(s) >= 0) : 0; if (i < 0) i = 0;
                this.state = this.tui.splice(i, 1)[0]; this.t = 0; this.p = 'bat'; this.dem = 0;
                if (this.state === 'k_huc'){ this.faceP(); this.hd = this.dir(); this.luot = 0; this.luotMax = this.hp < this.maxHp * 0.4 ? 4 : 3; }
                if (this.state === 'k_boom'){ this.mau = Math.random() < 0.5 ? [0, 1, 0] : [1, 0, 1]; }
            }
            songXung(x, y, w, h, vx, cao){
                let q = new BossProjectile(x, y, vx, 0, !cao, 1); q.w = w; q.h = h; q.xungCao = !!cao; q.veRieng = tclVeSong; return q;
            }
            update(){
                if (this.dying) return;
                if (this.state === 'entering'){ this.x -= 4; this.facingLeft = true; if (this.x <= canvas.width - TCL_W - 60) this.veIdle(); return; }
                if (this.state === 'idle'){
                    this.faceP();
                    let g = this.gap(), kc = Math.abs(g);
                    if (kc > 460) this.x += Math.sign(g) * this.nhanh(2.2); else if (kc < 220) this.x -= Math.sign(g) * this.nhanh(1.6);
                    this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x));
                    if (--this.actionTimer <= 0) this.chonChieu();
                    return;
                }
                this.t++;
                // ===== HUC: 3 luot xung kich qua san =====
                if (this.state === 'k_huc'){
                    this.facingLeft = this.hd < 0;
                    if (this.p === 'bat'){             // cao dat + ha sung: 34 khung dau, 20 khung cac luot sau
                        this.cui = Math.min(1, this.t / 14);
                        if (this.t % 6 === 0) visualEffects.push(new Effect(this.x + (this.hd < 0 ? this.w * 0.6 : this.w * 0.4), TCL_DAT - 6, 'explosion', this.hd > 0, 10));
                        if (this.t >= (this.luot === 0 ? 34 : 20)){ this.p = 'chay'; this.t = 0; shakeTimer = Math.max(shakeTimer, 10); if (typeof SFX !== 'undefined' && SFX.bossSkill) SFX.bossSkill(); }
                    } else if (this.p === 'chay'){
                        this.x += this.hd * this.nhanh(17);
                        if (frames % 3 === 0) visualEffects.push(new Effect(this.hd > 0 ? this.x : this.x + this.w, TCL_DAT - 20, 'charge_wave', this.hd > 0));
                        let r = this.hopXung();
                        if (checkAABB(dino, this) || checkAABB(dino, r)){
                            if (dino.isShielding()){
                                visualEffects.push(new Effect(parryX(), dino.y, 'parry')); shakeTimer = Math.max(shakeTimer, 16);
                                dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x + this.hd * 80));
                                if (typeof SFX !== 'undefined' && SFX.parry) SFX.parry();
                                this.p = 'giat'; this.t = 0;
                            } else dino.takeDamage(1);
                        }
                        let mep = this.hd > 0 ? this.x >= canvas.width - this.w - 8 : this.x <= 8;
                        if (mep){ this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x)); this.p = 'phanh'; this.t = 0; shakeTimer = Math.max(shakeTimer, 12); }
                    } else if (this.p === 'giat'){      // bi chan: giat nguoc lai roi huc luot tiep
                        this.x -= this.hd * this.nhanh(9) * (1 - this.t / 18);
                        this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
                        if (this.t >= 18){ this.luot++; this.faceP(); this.hd = this.dir(); this.p = this.luot >= this.luotMax ? 'nghi' : 'bat'; this.t = 0; }
                    } else if (this.p === 'phanh'){
                        if (this.t % 3 === 0) visualEffects.push(new Effect(this.hd > 0 ? this.x + this.w : this.x, TCL_DAT - 8, 'explosion', this.hd < 0, 12));
                        if (this.t >= 14){ this.luot++; this.hd = -this.hd; this.p = this.luot >= this.luotMax ? 'nghi' : 'bat'; this.t = 0; }
                    } else if (this.p === 'nghi'){ this.cui = Math.max(0, 1 - this.t / 16); if (this.t >= 26) this.veIdle(); }
                    return;
                }
                // ===== QUET SUNG: hat thap roi hat cao =====
                if (this.state === 'k_quet'){
                    if (this.p === 'bat'){ this.faceP(); this.x += this.dir() * this.nhanh(8); this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
                        if (Math.abs(this.gap()) < 200 || this.t > 60){ this.p = 'b1'; this.t = 0; } }
                    else if (this.p === 'b1'){ this.cui = Math.min(1, this.t / 10); if (this.t >= 20){ this.p = 'q1'; this.t = 0; shakeTimer = Math.max(shakeTimer, 10);
                            bossProjectiles.push(this.songXung(this.dauX() - 20 + this.dir() * 40, TCL_DAT - 50, 40, 50, this.dir() * this.nhanh(10), false)); } }
                    else if (this.p === 'q1'){ this.cham(this.facingLeft ? { x: this.x - 110, y: TCL_DAT - 55, w: 180, h: 55 } : { x: this.x + this.w - 70, y: TCL_DAT - 55, w: 180, h: 55 });
                        if (this.t >= 10){ this.p = 'b2'; this.t = 0; this.faceP(); } }
                    else if (this.p === 'b2'){ this.cui = 1 - Math.min(1, this.t / 8); this.nang = Math.min(1, this.t / 16); if (this.t >= 16){ this.p = 'q2'; this.t = 0; shakeTimer = Math.max(shakeTimer, 10);
                            bossProjectiles.push(this.songXung(this.dauX() - 20 + this.dir() * 40, TCL_DAT - 160, 44, 80, this.dir() * this.nhanh(10), true)); } }
                    else if (this.p === 'q2'){ this.cham(this.facingLeft ? { x: this.x - 110, y: TCL_DAT - 170, w: 180, h: 110 } : { x: this.x + this.w - 70, y: TCL_DAT - 170, w: 180, h: 110 });
                        if (this.t >= 10){ this.p = 'nghi'; this.t = 0; } }
                    else if (this.p === 'nghi'){ this.nang = Math.max(0, 1 - this.t / 14); if (this.t >= 28) this.veIdle(); }
                    return;
                }
                // ===== DAM 3 LAN =====
                if (this.state === 'k_dap'){
                    if (this.p === 'bat'){ this.nang = Math.min(1, this.t / 22); if (this.t >= (this.dem === 0 ? 26 : 18)){ this.p = 'dap'; this.t = 0; } }
                    else if (this.p === 'dap'){
                        this.nang = Math.max(0, 1 - this.t / 3);
                        if (this.t === 3){
                            let cuoi = this.dem >= 2; shakeTimer = Math.max(shakeTimer, cuoi ? 30 : 18);
                            this.cham({ x: this.cx() - 160, y: TCL_DAT - 36, w: 320, h: 36 });
                            let h = cuoi ? 52 : 34, v = cuoi ? 8.5 : 11;
                            for (let d of [-1, 1]) bossProjectiles.push(this.songXung(this.cx() + d * 120 - 20, TCL_DAT - h, 40, h, d * this.nhanh(v), false));
                            if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
                        }
                        if (this.t >= 12){ this.dem++; this.t = 0; this.p = this.dem >= 3 ? 'nghi' : 'bat'; }
                    } else if (this.p === 'nghi'){ if (this.t >= 30) this.veIdle(); }
                    return;
                }
                // ===== NHAY VOT DAP XUONG =====
                if (this.state === 'k_nhay'){
                    if (this.p === 'bat'){ this.cui = Math.min(1, this.t / 18); if (this.t >= 20){ this.p = 'len'; this.t = 0; this.cui = 0; } }
                    else if (this.p === 'len'){ this.y -= 24; if (this.y <= -TCL_H - 40){ this.p = 'treo'; this.t = 0; } }
                    else if (this.p === 'treo'){   // o tren cao, bong bao theo nguoi choi roi chot 22 khung truoc khi dap
                        if (this.t < 36){ let tx = dino.x + dino.w / 2 - this.w / 2; this.x += (tx - this.x) * 0.18; this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x)); }
                        if (this.t >= 58){ this.p = 'dap'; this.t = 0; }
                    } else if (this.p === 'dap'){
                        this.y += 34;
                        if (this.y >= TCL_DAT - TCL_H){
                            this.y = TCL_DAT - TCL_H; this.p = 'nghi'; this.t = 0; shakeTimer = Math.max(shakeTimer, 34);
                            this.cham({ x: this.x - 40, y: TCL_DAT - 60, w: this.w + 80, h: 60 });
                            if (dino.grounded && Math.abs(this.gap()) < 260 && !checkAABB(dino, { x: this.x - 40, y: TCL_DAT - 60, w: this.w + 80, h: 60 })) this.hurtP(1);
                            for (let d of [-1, 1]) bossProjectiles.push(this.songXung(this.cx() + d * 150 - 22, TCL_DAT - 60, 44, 60, d * this.nhanh(10), false));
                            for (let k = 0; k < 5; k++){ let q = new BossProjectile(60 + Math.random() * (canvas.width - 120), -30 - k * 50, 0, 7, false, 1); q.w = q.h = 22; q.veRieng = tclVeDa; bossProjectiles.push(q); }
                            if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
                        }
                    } else if (this.p === 'nghi'){ if (this.t >= 36) this.veIdle(); }
                    return;
                }
                // ===== BOOM: 3 vong xung kich thap / cao xen ke =====
                if (this.state === 'k_boom'){
                    this.faceP();
                    if (this.p === 'bat'){ this.cui = Math.min(1, this.t / 20); if (this.t >= 40){ this.p = 'ban'; this.t = 0; } }
                    else if (this.p === 'ban'){
                        if (this.t % 24 === 1 && this.phat < 3){
                            let cao = this.mau[this.phat] === 1, d = this.dir();
                            bossProjectiles.push(cao ? this.songXung(this.dauX() + d * 30 - 22, TCL_DAT - 165, 44, 85, d * this.nhanh(9), true)
                                                     : this.songXung(this.dauX() + d * 30 - 22, TCL_DAT - 50, 44, 50, d * this.nhanh(9), false));
                            this.phat++; shakeTimer = Math.max(shakeTimer, 8);
                            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(cao ? 520 : 180, 0.16, 'sawtooth', 0.18, cao ? 900 : 90);
                        }
                        if (this.phat >= 3 && this.t % 24 === 12){ this.p = 'nghi'; this.t = 0; }
                    } else if (this.p === 'nghi'){ this.cui = Math.max(0, 1 - this.t / 14); if (this.t >= 30) this.veIdle(); }
                    return;
                }
            }
            // ---------- VE ----------
            draw(){
                let x = this.x, y = this.y;
                ctx.save();
                // bao truoc
                if (this.state === 'k_huc' && this.p === 'bat'){
                    let d = this.hd, a = 0.45 + 0.35 * (frames % 8 < 4);
                    ctx.strokeStyle = "rgba(255,23,68," + a + ")"; ctx.lineWidth = 6; ctx.setLineDash([16, 10]);
                    let x0 = d > 0 ? x + this.w : x; ctx.beginPath(); ctx.moveTo(x0, TCL_DAT - 6); ctx.lineTo(d > 0 ? canvas.width : 0, TCL_DAT - 6); ctx.stroke(); ctx.setLineDash([]);
                }
                if (this.state === 'k_quet' && (this.p === 'b1' || this.p === 'b2')){
                    ctx.fillStyle = "rgba(255,23,68," + (0.2 + 0.2 * (frames % 6 < 3)) + ")";
                    let lo = this.p === 'b1', r = this.facingLeft ? { x: x - 110, w: 180 } : { x: x + this.w - 70, w: 180 };
                    ctx.fillRect(r.x, lo ? TCL_DAT - 55 : TCL_DAT - 170, r.w, lo ? 55 : 110);
                }
                if (this.state === 'k_nhay' && (this.p === 'treo' || this.p === 'dap')){
                    let cx = this.cx(), a = this.p === 'treo' && this.t >= 36 ? 0.55 : 0.3;
                    ctx.fillStyle = "rgba(0,0,0," + a + ")"; ctx.beginPath(); ctx.ellipse(cx, TCL_DAT - 3, this.w * 0.55, 12, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = "rgba(255,23,68,0.7)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(cx, TCL_DAT - 3, this.w * 0.55 + 40, 16, 0, 0, Math.PI * 2); ctx.stroke();
                }
                ctx.restore();
                this.veThan(x, y);
                // xung kich truoc sung khi dang huc
                if (this.state === 'k_huc' && this.p === 'chay') tclVeXungKich(this.dauX() + this.dir() * 20, y + 80, this.dir(), 1.2);
                if (this.state === 'k_boom' && this.p === 'bat'){      // gom luc: vong xung co vao sung
                    ctx.save(); ctx.strokeStyle = "rgba(255,213,79,0.8)"; ctx.lineWidth = 3;
                    let r = 70 * (1 - (this.t % 14) / 14) + 8; ctx.beginPath(); ctx.arc(this.dauX() + this.dir() * 10, y + 70, r, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
                }
            }
            veThan(x, y){
                ctx.save();
                if (!this.facingLeft){ ctx.translate(x + this.w / 2, 0); ctx.scale(-1, 1); ctx.translate(-(x + this.w / 2), 0); }
                let cui = (this.cui || 0) * 16, nang = this.nang || 0;
                // dung bang chan sau
                ctx.translate(x + 190, y + 150); ctx.rotate(nang * 0.32); ctx.translate(-(x + 190), -(y + 150));
                let chay = this.state === 'k_huc' && this.p === 'chay', buoc = chay ? (frames % 8 < 4 ? -9 : 0) : (this.state === 'idle' ? Math.sin(frames * 0.2) * 3 : 0);
                let D = "#12302C", B = "#1E4A44", L = "#2E6B62", V = "#C9A227", X = "#F5E9C8";
                // duoi
                ctx.fillStyle = D; ctx.beginPath(); ctx.moveTo(x + 235, y + 82); ctx.lineTo(x + 298, y + 104 + Math.sin(frames * 0.1) * 4); ctx.lineTo(x + 238, y + 116); ctx.closePath(); ctx.fill();
                // chan xa
                ctx.fillStyle = D; ctx.fillRect(x + 125, y + 112 + buoc, 28, 48 - buoc); ctx.fillRect(x + 222, y + 112 - buoc, 28, 48);
                // than
                ctx.fillStyle = B; ctx.beginPath(); ctx.ellipse(x + 170, y + 92, 92, 48, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = L; ctx.beginPath(); ctx.ellipse(x + 165, y + 118, 70, 16, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = V; for (let k = 0; k < 6; k++) ctx.fillRect(x + 120 + k * 20, y + 52 + Math.abs(k - 2.5) * 3, 12, 6);
                // chan gan
                ctx.fillStyle = B; ctx.fillRect(x + 100, y + 116 - buoc, 32, 44 + buoc); ctx.fillRect(x + 196, y + 116 + buoc, 32, 44 - buoc);
                ctx.fillStyle = X; for (let k = 0; k < 3; k++){ ctx.fillRect(x + 100 + k * 11, y + 155, 6, 5); ctx.fillRect(x + 196 + k * 11, y + 155, 6, 5); }
                ctx.save(); ctx.translate(0, cui);
                // diem co khong lo: nen toi, vien vang, gai xuong, dau an sang
                ctx.fillStyle = D;
                ctx.beginPath(); ctx.moveTo(x + 112, y + 100); ctx.quadraticCurveTo(x + 50, y + 80, x + 60, y + 10); ctx.quadraticCurveTo(x + 80, y - 40, x + 125, y - 36);
                ctx.quadraticCurveTo(x + 165, y - 30, x + 160, y + 20); ctx.quadraticCurveTo(x + 158, y + 80, x + 130, y + 104); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = V; ctx.lineWidth = 4; ctx.stroke();
                ctx.fillStyle = X;
                for (let k = 0; k < 8; k++){ let a = -2.9 + k * 0.4, px = x + 110 + Math.cos(a) * 58, py = y + 34 + Math.sin(a) * 66;
                    ctx.beginPath(); ctx.moveTo(px - 4, py + 4); ctx.lineTo(px + Math.cos(a) * 14, py + Math.sin(a) * 14); ctx.lineTo(px + 4, py - 4); ctx.closePath(); ctx.fill(); }
                ctx.fillStyle = "rgba(255,171,64," + (0.5 + 0.4 * Math.sin(frames * 0.15)) + ")";
                for (let k = 0; k < 5; k++){ let a = -2.6 + k * 0.45; ctx.fillRect(x + 110 + Math.cos(a) * 34 - 3, y + 36 + Math.sin(a) * 40 - 3, 6, 6); }
                // dau
                ctx.fillStyle = B;
                ctx.beginPath(); ctx.moveTo(x + 115, y + 50); ctx.lineTo(x + 40, y + 62); ctx.quadraticCurveTo(x + 14, y + 78, x + 20, y + 100);
                ctx.lineTo(x + 50, y + 116); ctx.lineTo(x + 118, y + 112); ctx.closePath(); ctx.fill();
                ctx.fillStyle = L; ctx.fillRect(x + 48, y + 66, 56, 10);
                ctx.fillStyle = "#8D6E63"; ctx.beginPath(); ctx.moveTo(x + 40, y + 76); ctx.quadraticCurveTo(x + 6, y + 88, x + 12, y + 110); ctx.quadraticCurveTo(x + 26, y + 100, x + 46, y + 100); ctx.closePath(); ctx.fill();
                // ba sung khong lo — sang len khi huc / gom luc
                let sang = (this.state === 'k_huc' && this.p === 'chay') || (this.state === 'k_boom' && this.p === 'bat');
                let cs = sang ? "#FFF59D" : X;
                drawTaperHorn(x + 72, y + 56, 86, -2.8, 13, cs, "#FFFFFF");
                drawTaperHorn(x + 92, y + 62, 80, -2.62, 12, cs, "#FFFFFF");
                drawTaperHorn(x + 30, y + 82, 32, -2.95, 8, cs, "#FFFFFF");
                // mat
                ctx.fillStyle = "#FFD54F"; ctx.fillRect(x + 58, y + 70, 12, 8); ctx.fillStyle = "#D50000"; ctx.fillRect(x + 61, y + 72, 5, 5);
                ctx.fillStyle = "#0B1F1C"; ctx.fillRect(x + 54, y + 64, 22, 4);
                ctx.restore();
                ctx.restore();
            }
        }
// BOSS_PART_END s0.TriceratopsLordBoss.1

// Nguồn: index.html:1763 · Dùng bởi: TriceratopsLordBoss
// BOSS_PART_BEGIN s0.tclVeXungKich.1 EDITABLE
function tclVeXungKich(x, y, d, sc){
            ctx.save(); ctx.translate(x, y); ctx.scale(d * (sc || 1), sc || 1);
            ctx.fillStyle = "rgba(255,241,118,0.18)"; ctx.beginPath(); ctx.moveTo(0, -46); ctx.quadraticCurveTo(90, 0, 0, 46); ctx.closePath(); ctx.fill();
            for (let k = 0; k < 3; k++){
                let ph = (frames * 0.18 + k / 3) % 1;
                ctx.globalAlpha = 0.9 * (1 - ph * 0.6);
                ctx.strokeStyle = k === 1 ? "#FFFFFF" : "#FFD54F"; ctx.lineWidth = 6 - k * 1.2;
                ctx.beginPath(); ctx.ellipse(10 + ph * 60, 0, 12 + k * 8, 40 - k * 6, 0, -1.25, 1.25); ctx.stroke();
            }
            ctx.restore();
        }
// BOSS_PART_END s0.tclVeXungKich.1

// Nguồn: index.html:1775 · Dùng bởi: TriceratopsLordBoss
// BOSS_PART_BEGIN s0.tclVeSong.1 EDITABLE
function tclVeSong(q){
            let d = q.vx >= 0 ? 1 : -1, cx = q.x + q.w / 2, cy = q.y + q.h / 2;
            ctx.save(); ctx.translate(cx, cy); ctx.scale(d, 1);
            let mau = q.xungCao ? ["#80DEEA", "#E0F7FA"] : ["#FFD54F", "#FFFDE7"];
            ctx.fillStyle = q.xungCao ? "rgba(128,222,234,0.22)" : "rgba(255,213,79,0.22)";
            ctx.beginPath(); ctx.ellipse(-q.w * 0.2, 0, q.w * 0.8, q.h * 0.55, 0, 0, Math.PI * 2); ctx.fill();
            for (let k = 0; k < 3; k++){
                let ph = (frames * 0.2 + k / 3) % 1;
                ctx.globalAlpha = 0.95 * (1 - ph * 0.5);
                ctx.strokeStyle = k === 1 ? mau[1] : mau[0]; ctx.lineWidth = 6 - k * 1.3;
                ctx.beginPath(); ctx.ellipse(-q.w * 0.3 + ph * q.w * 0.5, 0, q.w * 0.35 + k * 5, Math.max(4, q.h * 0.5 - k * 5), 0, -1.3, 1.3); ctx.stroke();
            }
            ctx.restore();
        }
// BOSS_PART_END s0.tclVeSong.1

// Nguồn: index.html:1789 · Dùng bởi: TriceratopsLordBoss
// BOSS_PART_BEGIN s0.tclVeDa.1 EDITABLE
function tclVeDa(q){
            let cx = q.x + q.w / 2, cy = q.y + q.h / 2, r = q.w / 2;
            ctx.save(); ctx.fillStyle = "#6D4C41"; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.beginPath(); ctx.arc(cx + r * 0.3, cy + r * 0.3, r * 0.5, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = "#3E2723"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
            // bong bao cho da roi tren mat dat
            ctx.fillStyle = "rgba(255,23,68,0.35)"; ctx.fillRect(cx - r, TCL_DAT - 4, r * 2, 4);
            ctx.restore();
        }
// BOSS_PART_END s0.tclVeDa.1

// Nguồn: index.html:24182 · Dùng bởi: TriceratopsLordBoss
// BOSS_PART_BEGIN s0.drawTaperHorn.1 EDITABLE
function drawTaperHorn(hx, hy, len, ang, wid, col, tipCol) {
            ctx.fillStyle = col;
            ctx.beginPath();
            ctx.moveTo(hx, hy - wid); ctx.lineTo(hx, hy + wid);
            ctx.quadraticCurveTo(hx + Math.cos(ang) * len * 0.6, hy + Math.sin(ang) * len * 0.6 + wid * 0.4,
                                 hx + Math.cos(ang) * len, hy + Math.sin(ang) * len);
            ctx.quadraticCurveTo(hx + Math.cos(ang) * len * 0.55, hy + Math.sin(ang) * len * 0.55 - wid * 0.5, hx, hy - wid);
            ctx.closePath(); ctx.fill();
            if (tipCol) { ctx.fillStyle = tipCol; ctx.fillRect(hx + Math.cos(ang) * len - 2, hy + Math.sin(ang) * len - 2, 3, 3); }
        }
// BOSS_PART_END s0.drawTaperHorn.1

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
