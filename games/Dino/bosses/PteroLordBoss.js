// BOSS_FILE: PteroLordBoss
// BOSS_SNAPSHOT: c46ab032a6cbf762cde49e8ab251e6d69cdda9d15fe744f89765bcb84b9046a7
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, frames, parry, parryX, shakeTimer, visualEffects
// Nguồn: index.html:1810 · Dùng bởi: PteroLordBoss
// BOSS_PART_BEGIN s0.PTL_HP.1 EDITABLE
const PTL_HP = 240, PTL_SC = 1.65, PTL_DAT = 320;
// BOSS_PART_END s0.PTL_HP.1

// Nguồn: index.html:1811 · Dùng bởi: PteroLordBoss
// BOSS_PART_BEGIN s0.PteroLordBoss.1 EDITABLE
class PteroLordBoss {
            constructor(level){
                this.hp = PTL_HP; this.maxHp = PTL_HP; this.name = "PTERO LORD";
                this.w = Math.round(120 * PTL_SC); this.h = Math.round(80 * PTL_SC);
                this.x = canvas.width + 30; this.y = 50; this.baseY = 50;
                this.state = 'entering'; this.t = 0; this.actionTimer = 50; this.facingLeft = true;
                this.lastMeleeHit = -1; this.burnTimer = 0; this.retState = 'pl_ve'; this.tui = [];
                this._gia = { x: 0, y: 0, w: 120, h: 80, oDir: -1, state: 'hovering', targetX: 0 };
                this.bay = [];
            }
            spd(){ return this.hp < this.maxHp * 0.4 ? 1.15 : 1; }
            nhanh(v){ return v * this.spd(); }
            mieng(){ return { x: this.facingLeft ? this.x - 20 : this.x + this.w + 20, y: this.y + 44 * PTL_SC }; }
            veIdle(){ this.state = 'idle'; this.t = 0; this.actionTimer = this.hp < this.maxHp * 0.4 ? 22 : 32; }
            chonChieu(){
                if (!this.tui.length){ this.tui = ['pl_laser','pl_trieu','pl_dive_go','pl_gio','pl_dap'];
                    for (let i = this.tui.length - 1; i > 0; i--){ let j = Math.floor(Math.random() * (i + 1)); [this.tui[i], this.tui[j]] = [this.tui[j], this.tui[i]]; } }
                this.state = this.tui.shift(); this.t = 0; this.p = 'bat'; this.dem = 0;
                if (this.state === 'pl_dive_go'){ this.faceP(); this.sd = this.dir(); this.luot = 0; }
                if (this.state === 'pl_laser'){ this.huong = Math.random() < 0.5 ? 1 : -1; }
            }
            // bay toi mot diem, tra ve true khi toi
            bayToi(tx, ty, v){
                let dx = tx - this.x, dy = ty - this.y, d = Math.hypot(dx, dy);
                if (d <= v){ this.x = tx; this.y = ty; return true; }
                this.x += dx / d * v; this.y += dy / d * v; return false;
            }
            // bong Ptero Boss bay qua: bao truoc o mep -> bo nhao theo vong cung qua nguoi choi -> bay mat
            capNhatBay(){
                let v = this.nhanh(14.5);
                for (let f of this.bay){
                    if (f.warn > 0){ f.warn--; if (Math.abs(f.px - (dino.x + dino.w / 2)) > 0) f.px += ((dino.x + dino.w / 2) - f.px) * 0.2; continue; }
                    f.t++;
                    if (f.lui > 0){                       // bi PARRY: lui lai roi vot len bay di
                        f.lui--; f.x -= f.dir * 7; f.y -= 2;
                        if (f.lui === 0){ f.vy = -7; f.dir = -f.dir; }
                        continue;
                    }
                    f.x += f.dir * v;
                    let cx = f.x + f.w / 2;
                    if (f.vy){ f.y += f.vy; f.vy -= 0.2; }
                    else {
                        if (Math.abs(cx - f.px) > 240) f.px += ((dino.x + dino.w / 2) - f.px) * 0.07;   // con xa: van ngam theo
                        let k = (cx - f.px) / 400; f.y = Math.max(30, 236 - 206 * k * k);
                    }
                    if (!f.hit){
                        let r = { x: f.x + 10, y: f.y + 20, w: 100, h: 40 };
                        if (checkAABB(dino, r)){
                            f.hit = true;
                            if (dino.isShielding()){ parry(); f.lui = 14; f.vy = 0; shakeTimer = Math.max(shakeTimer, 8); }
                            else dino.takeDamage(1);
                        }
                    }
                    if (f.t % 4 === 0 && !f.vy) visualEffects.push(new Effect(f.dir > 0 ? f.x : f.x + f.w, f.y + 40, 'charge_wave', f.dir > 0));
                }
                this.bay = this.bay.filter(f => f.warn > 0 || f.lui > 0 || (f.x > -200 && f.x < canvas.width + 200 && f.y > -160));
            }
            update(){
                if (this.dying){ this.bay = []; return; }
                if (this.bay.length) this.capNhatBay();
                if (this.state === 'entering'){ this.x -= 4; this.facingLeft = true; this.y = this.baseY + Math.sin(frames * 0.05) * 20;
                    if (this.x <= canvas.width - this.w - 70) this.veIdle(); return; }
                if (this.state === 'idle'){
                    this.faceP();
                    let g = this.gap(), kc = Math.abs(g);
                    if (kc < 380) this.x -= Math.sign(g || 1) * this.nhanh(3); else if (kc > 540) this.x += Math.sign(g) * this.nhanh(3);
                    this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x));
                    this.y += ((this.baseY + Math.sin(frames * 0.05) * 30) - this.y) * 0.1;
                    if (--this.actionTimer <= 0) this.chonChieu();
                    return;
                }
                this.t++;
                // ===== LUI LAI ROI BAY DI (sau parry / sau cac chieu) =====
                if (this.state === 'pl_ve'){
                    let pcx = dino.x + dino.w / 2, tx = (this.cx() < pcx ? pcx - 440 : pcx + 440) - this.w / 2;
                    tx = Math.max(20, Math.min(canvas.width - this.w - 20, tx));
                    this.facingLeft = pcx < this.cx();
                    if (this.bayToi(tx, this.baseY, this.nhanh(12)) || this.t > 90) this.veIdle();
                    return;
                }
                // ===== LASER QUET TOAN MAP =====
                if (this.state === 'pl_laser'){
                    if (this.p === 'bat'){        // bay len giua troi, quay mat ve phia bat dau quet
                        this.facingLeft = this.huong > 0;
                        if (this.bayToi(canvas.width / 2 - this.w / 2, 26, this.nhanh(11)) || this.t > 70){ this.p = 'nap'; this.t = 0; }
                    } else if (this.p === 'nap'){
                        this.targetX = this.huong > 0 ? 0 : canvas.width;
                        if (this.t >= 54){ this.p = 'ban'; this.t = 0; shakeTimer = Math.max(shakeTimer, 14); if (typeof SFX !== 'undefined' && SFX.bossSkill) SFX.bossSkill(); }
                    } else if (this.p === 'ban'){
                        let T = 120, u = Math.min(1, this.t / T);
                        this.targetX = this.huong > 0 ? u * canvas.width : canvas.width * (1 - u);
                        this.facingLeft = this.targetX < this.cx();
                        let m = this.mieng(), tx = this.targetX, ty = PTL_DAT; if (Math.abs(tx - m.x) < 0.1) tx += 0.1;
                        let k = (ty - m.y) / (tx - m.x), px = dino.x + dino.w / 2, iy = m.y + k * (px - m.x);
                        let giua = (px - m.x) * (tx - m.x) >= 0;   // nguoi choi cung phia voi diem cham
                        if (giua && iy >= dino.y - 12 && iy <= dino.y + dino.h + 12){
                            if (dino.isShielding()) visualEffects.push(new Effect(parryX(), dino.y + dino.h / 2, 'parry'));
                            else dino.takeDamage(1);
                        }
                        if (frames % 3 === 0) visualEffects.push(new Effect(this.targetX, PTL_DAT - 4, 'explosion', true, 12));
                        if (this.t >= T){ this.state = 'pl_ve'; this.t = 0; }
                    }
                    return;
                }
                // ===== TRIEU 3 CON PTERO BOSS (@@HE-PTL-BAY) =====
                // Hans: "Ptero thuong y la con BOSS ay. No chi BAY QUA roi BIEN MAT."
                // 3 bong Ptero Boss (ti le 1) lan luot lao tu mep man hinh, bo nhao qua nguoi choi roi bay mat.
                if (this.state === 'pl_trieu'){
                    this.faceP(); this.y += ((this.baseY - 10) - this.y) * 0.1;
                    let cach = this.hp < this.maxHp * 0.4 ? 18 : 22;
                    if (this.t === 8){ if (typeof SFX !== 'undefined' && SFX.bossSkill) SFX.bossSkill();
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'parry')); this.benTrieu = Math.random() < 0.5 ? 1 : -1; }
                    if (this.t >= 14 && (this.t - 14) % cach === 0 && this.dem < 3){
                        let d = this.dem % 2 === 0 ? this.benTrieu : -this.benTrieu;   // luan phien hai mep
                        this.bay.push({ x: d > 0 ? -130 : canvas.width + 10, y: 40, w: 120, h: 80, dir: d, warn: 30, t: 0,
                                        px: dino.x + dino.w / 2, hit: false, lui: 0, vy: 0 });
                        this.dem++;
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(700, 0.08, 'square', 0.12, 1100);
                    }
                    if (this.dem >= 3 && this.t > 14 + cach * 2 + 30) this.veIdle();
                    return;
                }
                // ===== BO NHAO 2 LUOT (parry -> vong chung day ve pl_ve) =====
                if (this.state === 'pl_dive_go'){
                    this.facingLeft = this.sd < 0;
                    this.x += this.sd * this.nhanh(18); this.y = Math.min(230, this.y + 7);
                    if (frames % 4 === 0) visualEffects.push(new Effect(this.sd > 0 ? this.x : this.x + this.w, this.y + this.h / 2, 'charge_wave', this.sd > 0));
                    let qua = this.sd > 0 ? this.x > dino.x + dino.w + 90 : this.x + this.w < dino.x - 90;
                    let mep = this.sd > 0 ? this.x > canvas.width - this.w - 6 : this.x < 6;
                    if ((qua && this.t > 20) || mep){
                        this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x));
                        this.luot++;
                        if (this.luot >= 2){ this.state = 'pl_ve'; this.t = 0; }
                        else { this.state = 'pl_quay'; this.t = 0; }
                    }
                    return;
                }
                if (this.state === 'pl_quay'){      // vot len, quay dau — 22 khung bao truoc luot 2
                    this.y += (120 - this.y) * 0.12; this.faceP();
                    if (this.t >= 22){ this.sd = this.dir(); this.state = 'pl_dive_go'; this.t = 0; }
                    return;
                }
                // ===== LOC CANH: day ra + long vu =====
                if (this.state === 'pl_gio'){
                    this.faceP(); this.y += ((this.baseY + 10) - this.y) * 0.1;
                    if (this.t > 20 && this.t < 120){
                        let xa = Math.sign((dino.x + dino.w / 2) - this.cx()) || 1;
                        let luc = (dino.isShielding() ? 1.1 : 2.6) * this.spd();
                        dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x + xa * luc));
                        if (this.t % 30 === 0){
                            let m = this.mieng();
                            for (let k = -1; k <= 1; k++){
                                let a = Math.atan2((dino.y + dino.h / 2) - m.y, (dino.x + dino.w / 2) - m.x) + k * 0.2, sp = this.nhanh(8.5);
                                let q = new BossProjectile(m.x - 8, m.y - 8, Math.cos(a) * sp, Math.sin(a) * sp, false, 1); q.w = 16; q.h = 16; q.slashBlade = true; bossProjectiles.push(q);
                            }
                        }
                    }
                    if (this.t >= 130) this.veIdle();
                    return;
                }
                // ===== VOT LEN ROI DAP XUONG =====
                if (this.state === 'pl_dap'){
                    if (this.p === 'bat'){ this.y -= 16; if (this.y < -this.h - 30){ this.p = 'treo'; this.t = 0; } }
                    else if (this.p === 'treo'){
                        if (this.t < 40){ let tx = dino.x + dino.w / 2 - this.w / 2; this.x += (tx - this.x) * 0.2; this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x)); }
                        if (this.t >= 62){ this.p = 'roi'; this.t = 0; }
                    } else if (this.p === 'roi'){
                        this.y += 26;
                        if (this.y + this.h * 0.7 >= PTL_DAT){ let r = { x: this.x, y: this.y, w: this.w, h: this.h };
                            if (checkAABB(dino, r)) this.hurtP(1);
                            this.y = PTL_DAT - this.h * 0.7; this.p = 'cham'; this.t = 0; shakeTimer = Math.max(shakeTimer, 30);
                            for (let d of [-1, 1]){ let q = new BossProjectile(this.cx() + d * 90 - 14, PTL_DAT - 50, d * this.nhanh(10), 0, true, 1); q.h = 50; q.color = "#E040FB"; bossProjectiles.push(q); }
                            if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode(); }
                        else if (checkAABB(dino, this)) this.hurtP(1);
                    } else if (this.p === 'cham'){ if (this.t >= 26){ this.state = 'pl_ve'; this.t = 0; } }
                    return;
                }
            }
            // ---------- VE ----------
            draw(){
                let x = this.x, y = this.y;
                ctx.save();
                // bao truoc
                if (this.state === 'pl_laser' && this.p === 'nap'){
                    ctx.fillStyle = (frames % 10 < 5) ? "rgba(224,64,251,0.25)" : "rgba(224,64,251,0.10)"; ctx.fillRect(0, PTL_DAT - 20, canvas.width, 20);
                    let x0 = this.huong > 0 ? 30 : canvas.width - 30, d = this.huong;
                    ctx.fillStyle = "rgba(255,23,68,0.85)";
                    for (let k = 0; k < 3; k++){ let ax = x0 + d * (k * 26 + ((frames * 2) % 26)); ctx.beginPath(); ctx.moveTo(ax + d * 14, PTL_DAT - 10); ctx.lineTo(ax, PTL_DAT - 20); ctx.lineTo(ax, PTL_DAT); ctx.closePath(); ctx.fill(); }
                }
                if (this.state === 'pl_dap' && this.p === 'treo'){
                    let a = this.t >= 40 ? 0.5 : 0.28; ctx.fillStyle = "rgba(0,0,0," + a + ")";
                    ctx.beginPath(); ctx.ellipse(this.cx(), PTL_DAT - 3, this.w * 0.5, 10, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = "rgba(224,64,251,0.8)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(this.cx(), PTL_DAT - 3, this.w * 0.5 + 30, 14, 0, 0, Math.PI * 2); ctx.stroke();
                }
                ctx.restore();
                // than: ve lai ptero goc o ti le lon, them quang tim va mao vuong mien
                let G = this._gia; G.oDir = this.facingLeft ? -1 : 1;
                G.state = (this.state === 'pl_dive_go' || (this.state === 'pl_dap' && this.p === 'roi')) ? 'swooping' : 'hovering';
                ctx.save();
                ctx.fillStyle = "rgba(170,0,255,0.14)"; ctx.beginPath(); ctx.ellipse(this.cx(), this.cy(), this.w * 0.62, this.h * 0.55, 0, 0, Math.PI * 2); ctx.fill();
                ctx.translate(x, y); ctx.scale(PTL_SC, PTL_SC);
                PteroBoss.prototype.draw.call(G);
                // mao vuong mien tim-vang
                ctx.save(); if (G.oDir > 0){ ctx.translate(60, 0); ctx.scale(-1, 1); ctx.translate(-60, 0); }
                ctx.fillStyle = "#6A1B9A"; ctx.beginPath(); ctx.moveTo(14, 22); ctx.quadraticCurveTo(34, -6, 76, -12); ctx.quadraticCurveTo(44, 10, 24, 28); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 1.5; ctx.stroke();
                let sang = (this.state === 'pl_laser' && this.p !== 'bat') ? 0.6 + 0.4 * Math.sin(frames * 0.4) : 0.25;
                ctx.fillStyle = "rgba(224,64,251," + sang + ")"; ctx.beginPath(); ctx.arc(4, 35, 9, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
                ctx.restore();
                // bong Ptero Boss bay qua
                for (let f of this.bay){
                    if (f.warn > 0){
                        let ex = f.dir > 0 ? 24 : canvas.width - 24, ey = 150 + Math.sin(frames * 0.3) * 2;
                        ctx.save(); ctx.globalAlpha = (frames % 8 < 4) ? 1 : 0.45;
                        ctx.fillStyle = "#FF1744"; ctx.beginPath(); ctx.moveTo(ex, ey - 20); ctx.lineTo(ex + 18, ey + 12); ctx.lineTo(ex - 18, ey + 12); ctx.closePath(); ctx.fill();
                        ctx.fillStyle = "#FFFFFF"; ctx.font = "bold 20px monospace"; ctx.textAlign = "center"; ctx.fillText("!", ex, ey + 9);
                        ctx.globalAlpha = 0.22; ctx.strokeStyle = "#E040FB"; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath();
                        for (let xx = 0; xx <= canvas.width; xx += 40){ let k = (xx - f.px) / 400, yy = Math.max(30, 236 - 206 * k * k) + 40; if (xx) ctx.lineTo(xx, yy); else ctx.moveTo(xx, yy); }
                        ctx.stroke(); ctx.setLineDash([]); ctx.restore();
                        continue;
                    }
                    let F = { x: f.x, y: f.y, w: 120, h: 80, oDir: f.dir, state: (f.vy || f.lui) ? 'hovering' : 'swooping', targetX: 0 };
                    ctx.save(); ctx.globalAlpha = 0.9;
                    ctx.fillStyle = "rgba(170,0,255,0.16)"; ctx.beginPath(); ctx.ellipse(f.x + 60, f.y + 40, 70, 40, 0, 0, Math.PI * 2); ctx.fill();
                    PteroBoss.prototype.draw.call(F);
                    ctx.restore();
                }
                // tia laser
                if (this.state === 'pl_laser' && this.p === 'ban'){
                    let m = this.mieng();
                    ctx.save();
                    ctx.strokeStyle = "rgba(224,64,251,0.35)"; ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(this.targetX, PTL_DAT); ctx.stroke();
                    ctx.strokeStyle = "#E040FB"; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(this.targetX, PTL_DAT); ctx.stroke();
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(this.targetX, PTL_DAT); ctx.stroke();
                    ctx.fillStyle = "rgba(224,64,251,0.85)"; ctx.beginPath(); ctx.ellipse(this.targetX, PTL_DAT - 2, 20, 7, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.restore();
                }
                if (this.state === 'pl_gio' && this.t > 20 && this.t < 120){
                    ctx.save(); ctx.strokeStyle = "rgba(236,239,241,0.55)"; ctx.lineWidth = 2;
                    let d = this.facingLeft ? -1 : 1;
                    for (let k = 0; k < 7; k++){ let yy = 150 + k * 24, xx = this.cx() + d * (((frames * 14 + k * 90) % 700));
                        ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + d * 50, yy + 3); ctx.stroke(); }
                    ctx.restore();
                }
            }
        }
// BOSS_PART_END s0.PteroLordBoss.1

// Nguồn: index.html:98512 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:98523 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
