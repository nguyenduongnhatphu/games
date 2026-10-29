// BOSS_FILE: LavaSerpentBoss
// BOSS_SNAPSHOT: 727b7298f5725557e84ed20d1375204ce421ac8161e96654772477c0b6e53e0c
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, Infinity, LavaDino, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, pickFromBag, platforms, shakeTimer, visualEffects
// Nguồn: index.html:2836 · Dùng bởi: LavaSerpentBoss
// BOSS_PART_BEGIN s0.LavaSerpentBoss.1 EDITABLE
class LavaSerpentBoss {
            constructor(level) {
                // Ha tu 75 xuong 30 va BO han khung bat tu luc lan duoi dung nham.
                // Truoc day no bat kha xam pham o MOI trang thai tru 'breach', tuc nguoi choi
                // chi danh duoc trong dung mot nhip nho, con lai la dung nhin — 75 mau trong
                // dieu kien do keo tran danh dai luot thuot ma chang kho hon chut nao.
                this.hp = 30; this.maxHp = 30;
                this.w = 110; this.h = 64; this.name = "HOA XA";
                this.lavaY = 330; this.x = 480; this.y = this.lavaY;
                this.state = 'entering'; this.retState = 'submerged'; this.subTimer = 0; this.actionTimer = 80;
                this.invulnAll = false; this.burnTimer = 0; this.lastMeleeHit = -1;
                this.wakeX = 500; this.wakeTX = 500; this.bub = 0;
                this.arcX = 500; this.arcDir = 1; this.facingLeft = true;
                this.lastSkill = ''; this.globs = []; this.waveX = 0; this.waveDir = -1; this.whirlX = 0;
                this.pillarRespawn = [];
            }
            pillars() { return platforms.filter(p => p.pillar); }
            crackNear(px) {
                let best = null, bd = Infinity;
                for (let p of this.pillars()) { let d = Math.abs((p.x + p.w/2) - px); if (d < bd) { bd = d; best = p; } }
                if (!best || bd > 160) return;
                best.crack = (best.crack || 0) + 1;
                visualEffects.push(new Effect(best.x + best.w/2, best.top, 'explosion', true, 22));
                if (best.crack >= 2) {
                    this.pillarRespawn.push({ x: best.x, w: best.w, top: best.top, t: 360 });
                    let i = platforms.indexOf(best); if (i >= 0) platforms.splice(i, 1);
                    floatingTexts.push(new FloatingText(best.x, best.top - 18, "COT SAP!"));
                    shakeTimer = Math.max(shakeTimer, 16);
                }
            }
            spitGlobs() {
                let ps = this.pillars().filter(p => p.top > 200);
                if (ps.length < 2) ps = this.pillars();
                let pick = ps.slice().sort(() => Math.random() - 0.5).slice(0, 2);
                for (let tp of pick) this.globs.push({ x: this.wakeX, y: this.lavaY - 10, tx: tp.x + tp.w/2, ty: tp.top, t: 0, dur: 46, sx: this.wakeX, sy: this.lavaY - 10 });
            }
            update() {
                this.bub += 0.12;
                for (let i = this.pillarRespawn.length - 1; i >= 0; i--) {
                    let r = this.pillarRespawn[i]; r.t--;
                    if (r.t <= 0) { platforms.push({ x: r.x, w: r.w, top: r.top, h: 400 - r.top, volcano: true, pillar: true, crack: 0 }); visualEffects.push(new Effect(r.x + r.w/2, r.top, 'explosion', true, 26)); this.pillarRespawn.splice(i, 1); }
                }
                for (let p of this.pillars()) { if (p.burn > 0) { p.burn--; if (dino.grounded && Math.abs((dino.y + dino.h) - p.top) < 6 && dino.x + dino.w > p.x && dino.x < p.x + p.w) { if (!dino.isShielding()) { if (frames % 12 === 0) dino.takeDamage(1); } else parry(); } } }
                for (let i = this.globs.length - 1; i >= 0; i--) {
                    let g = this.globs[i]; g.t++;
                    let u = g.t / g.dur;
                    g.x = g.sx + (g.tx - g.sx) * u; g.y = g.sy + (g.ty - g.sy) * u - Math.sin(u * Math.PI) * 150;
                    if (checkAABB(dino, { x: g.x - 12, y: g.y - 12, w: 24, h: 24 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); this.globs.splice(i, 1); continue; }
                    if (g.t >= g.dur) { visualEffects.push(new Effect(g.tx, g.ty, 'explosion', true, 24)); for (let p of this.pillars()) { if (Math.abs((p.x + p.w/2) - g.tx) < 70) p.burn = 120; } this.globs.splice(i, 1); }
                }
                this.invulnAll = false;   // danh duoc o moi trang thai, ke ca khi dang lan
                if (this.state === 'entering') { this.subTimer++; if (this.subTimer > 30) { this.state = 'intro'; this.subTimer = 0; } return; }
                if (this.state === 'intro') { this.subTimer++; if (this.subTimer === 1) { floatingTexts.push(new FloatingText(400, 150, "HOA XA!")); if (SFX.bossEntry) SFX.bossEntry(); } if (this.subTimer > 46) { this.state = 'submerged'; this.actionTimer = 80; } return; }
                if (this.state === 'submerged') {
                    this.wakeX += (this.wakeTX - this.wakeX) * 0.045;
                    if (Math.abs(this.wakeTX - this.wakeX) < 26) this.wakeTX = 90 + Math.random() * (canvas.width - 180);
                    this.x = this.wakeX - this.w/2; this.y = this.lavaY;
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let sk = ['breach', 'wave', 'globs', 'whirl'];
                        let c = pickFromBag(this, sk); this.subTimer = 0;
                        if (c === 'breach') { this.state = 'breach_warn'; this.wakeTX = dino.x + dino.w/2; }
                        else if (c === 'wave') { this.state = 'wave_warn'; this.waveDir = (dino.x + dino.w/2) < canvas.width/2 ? 1 : -1; }
                        else if (c === 'globs') { this.state = 'glob_warn'; }
                        else { this.state = 'whirl_warn'; let ps = this.pillars(); this.whirlX = ps.length > 1 ? (ps[0].x + ps[0].w + ps[1].x) / 2 : canvas.width/2; }
                    }
                    return;
                }
                if (this.state === 'breach_warn') {
                    this.subTimer++; this.wakeX += ((dino.x + dino.w/2) - this.wakeX) * 0.05; this.x = this.wakeX - this.w/2;
                    if (this.subTimer > 60) { this.state = 'breach'; this.invulnAll = false; this.subTimer = 0; this.arcX = this.wakeX; this.arcDir = (dino.x + dino.w/2) < this.arcX ? -1 : 1; this.crackNear(this.arcX); shakeTimer = 18; for (let k = 0; k < 7; k++) visualEffects.push(new Effect(this.arcX + (Math.random()-0.5)*90, this.lavaY, 'explosion', true, 18)); }
                    return;
                }
                if (this.state === 'breach') {
                    this.subTimer++;
                    let u = this.subTimer / 100;
                    let hx = this.arcX + this.arcDir * (u * 200 - 100), hy = this.lavaY - Math.sin(Math.min(1, u) * Math.PI) * 180;
                    this.x = hx - this.w/2; this.y = hy - this.h/2; this.facingLeft = this.arcDir < 0;
                    if (checkAABB(dino, this)) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    if (this.subTimer > 100) { this.state = 'submerged'; this.actionTimer = 90; this.wakeX = hx; this.y = this.lavaY; }
                    return;
                }
                if (this.state === 'wave_warn') { this.subTimer++; if (this.subTimer > 96) { this.state = 'wave'; this.subTimer = 0; this.waveX = this.waveDir > 0 ? -60 : canvas.width + 60; shakeTimer = 12; } return; }
                if (this.state === 'wave') {
                    this.subTimer++; this.waveX += this.waveDir * 13;
                    if (Math.abs(this.waveX - (dino.x + dino.w/2)) < 62 && (dino.y + dino.h) > 272) { if (!dino.isShielding()) { if (frames % 10 === 0) dino.takeDamage(1); } else parry(); }
                    if (this.waveX < -120 || this.waveX > canvas.width + 120) { this.state = 'submerged'; this.actionTimer = 90; }
                    return;
                }
                if (this.state === 'glob_warn') { this.subTimer++; if (this.subTimer > 48) { this.state = 'globs'; this.subTimer = 0; this.spitGlobs(); } return; }
                if (this.state === 'globs') { this.subTimer++; if (this.subTimer > 60) { this.state = 'submerged'; this.actionTimer = 90; } return; }
                if (this.state === 'whirl_warn') { this.subTimer++; if (this.subTimer > 60) { this.state = 'whirl'; this.subTimer = 0; shakeTimer = 10; } return; }
                if (this.state === 'whirl') {
                    this.subTimer++;
                    let d = this.whirlX - (dino.x + dino.w/2);
                    if (Math.abs(d) > 6) dino.x += Math.sign(d) * (dino.grounded ? 1.2 : 0.6);
                    if (this.subTimer % 8 === 0) shakeTimer = Math.max(shakeTimer, 4);
                    if (this.subTimer > 100) { this.state = 'submerged'; this.actionTimer = 90; }
                    return;
                }
            }
            draw() {
                let ly = this.lavaY;
                for (let p of this.pillars()) {
                    if (p.crack) { ctx.strokeStyle = "rgba(255,90,0,0.85)"; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { let cx0 = p.x + 20 + k * (p.w - 40) / 2; ctx.beginPath(); ctx.moveTo(cx0, p.top + 4); ctx.lineTo(cx0 + 8, p.top + 34); ctx.lineTo(cx0 - 4, p.top + 60); ctx.stroke(); } }
                    if (p.burn > 0) { for (let i = 0; i < p.w / 12; i++) { let fx = p.x + i * 12 + (frames % 6), fh = 12 + Math.sin(frames * 0.5 + i) * 6; ctx.fillStyle = "rgba(255,87,34,0.65)"; ctx.fillRect(fx, p.top - fh, 8, fh); ctx.fillStyle = "rgba(255,193,7,0.7)"; ctx.fillRect(fx + 2, p.top - fh * 0.55, 4, fh * 0.55); } }
                }
                if (this.state === 'submerged' || this.state === 'breach_warn') {
                    let w = this.wakeX;
                    ctx.fillStyle = "rgba(255,220,120,0.5)"; ctx.beginPath(); ctx.ellipse(w, ly + 4, 70, 9, 0, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "rgba(255,150,0,0.9)";
                    for (let i = 0; i < 6; i++) { let bx = w - 55 + i * 22, by = ly - 2 + Math.sin(this.bub + i) * 4; ctx.beginPath(); ctx.arc(bx, by, 4 + (i % 2) * 2, 0, Math.PI*2); ctx.fill(); }
                    if (this.state === 'breach_warn') {
                        let prog = Math.min(1, this.subTimer / 60);
                        ctx.fillStyle = "rgba(255,60,0," + (0.15 + prog * 0.3) + ")"; ctx.beginPath(); ctx.ellipse(w, ly, 60 + prog * 30, 16 + prog * 8, 0, 0, Math.PI*2); ctx.fill();
                        ctx.strokeStyle = (frames % 6 < 3) ? "#FF1744" : "rgba(255,23,68,0.4)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(w, ly, 62 + prog * 30, 18 + prog * 8, 0, 0, Math.PI*2); ctx.stroke();
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("TROI LEN!", w, ly - 34); ctx.textAlign = "left";
                    }
                }
                if (this.state === 'breach') {
                    let u = this.subTimer / 100, d = this.arcDir;
                    for (let s = 9; s >= 0; s--) {
                        let su = Math.max(0, u - s * 0.03);
                        let sx = this.arcX + d * (su * 200 - 100), sy = ly - Math.sin(Math.min(1, su) * Math.PI) * 190;
                        let r = (s === 0 ? 30 : 26 - s * 1.8);
                        ctx.fillStyle = "#140806"; ctx.beginPath(); ctx.arc(sx, sy, r + 4, 0, Math.PI*2); ctx.fill();
                        ctx.fillStyle = "#3d2018"; ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI*2); ctx.fill();
                        ctx.fillStyle = "rgba(255,109,0,0.95)"; ctx.fillRect(sx - r*0.62, sy - 3, r*1.24, 5);
                        ctx.fillStyle = "rgba(255,193,7,0.8)"; ctx.fillRect(sx - r*0.34, sy - 8, r*0.68, 3);
                        if (s === 0) {
                            ctx.fillStyle = "#140806"; ctx.beginPath(); ctx.moveTo(sx + d*10, sy + 4); ctx.lineTo(sx + d*48, sy - 8); ctx.lineTo(sx + d*48, sy + 20); ctx.closePath(); ctx.fill();
                            ctx.fillStyle = "#FFEB3B"; for (let k = 0; k < 3; k++) ctx.fillRect(sx + d*(20 + k*9), sy + 1, 4, 7);
                            ctx.fillStyle = "#140806";
                            ctx.beginPath(); ctx.moveTo(sx - d*4, sy - 26); ctx.lineTo(sx - d*18, sy - 52); ctx.lineTo(sx + d*8, sy - 28); ctx.closePath(); ctx.fill();
                            ctx.beginPath(); ctx.moveTo(sx + d*14, sy - 24); ctx.lineTo(sx + d*24, sy - 46); ctx.lineTo(sx + d*26, sy - 22); ctx.closePath(); ctx.fill();
                            ctx.fillStyle = "#FF1744"; ctx.beginPath(); ctx.arc(sx + d*14, sy - 10, 7, 0, Math.PI*2); ctx.fill();
                            ctx.fillStyle = "#FFEB3B"; ctx.beginPath(); ctx.arc(sx + d*15, sy - 11, 3.5, 0, Math.PI*2); ctx.fill();
                        }
                    }
                }
                if (this.state === 'wave_warn' || this.state === 'wave') {
                    if (this.state === 'wave_warn') {
                        let prog = Math.min(1, this.subTimer / 96);
                        ctx.fillStyle = "rgba(255,109,0," + (0.10 + prog * 0.22) + ")"; ctx.fillRect(0, 272, canvas.width, ly - 272 + 20);
                        ctx.strokeStyle = (frames % 6 < 3) ? "#FF6D00" : "rgba(255,109,0,0.35)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 272); ctx.lineTo(canvas.width, 272); ctx.stroke();
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("SONG NHAM - LEN COT CAO!", canvas.width/2, 262); ctx.textAlign = "left";
                    } else {
                        let wx = this.waveX;
                        ctx.fillStyle = "rgba(255,87,34,0.85)"; ctx.beginPath(); ctx.moveTo(wx - this.waveDir * 90, ly + 20); ctx.quadraticCurveTo(wx, 258, wx + this.waveDir * 70, ly + 20); ctx.fill();
                        ctx.fillStyle = "rgba(255,193,7,0.9)"; ctx.beginPath(); ctx.moveTo(wx - this.waveDir * 60, ly + 20); ctx.quadraticCurveTo(wx, 276, wx + this.waveDir * 45, ly + 20); ctx.fill();
                    }
                }
                if (this.state === 'glob_warn') { let prog = Math.min(1, this.subTimer / 48); ctx.fillStyle = "rgba(255,120,0," + (0.3 + prog * 0.5) + ")"; ctx.beginPath(); ctx.arc(this.wakeX, ly, 16 + prog * 14, 0, Math.PI*2); ctx.fill(); }
                this.globs.forEach(g => { ctx.fillStyle = "rgba(255,87,34,0.5)"; ctx.beginPath(); ctx.arc(g.x, g.y + 6, 13, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#FF6D00"; ctx.beginPath(); ctx.arc(g.x, g.y, 11, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#FFC107"; ctx.beginPath(); ctx.arc(g.x, g.y, 6, 0, Math.PI*2); ctx.fill(); ctx.strokeStyle = "rgba(255,60,0,0.5)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.tx, g.ty, 20, 0, Math.PI*2); ctx.stroke(); });
                if (this.state === 'whirl_warn' || this.state === 'whirl') {
                    let r = this.state === 'whirl_warn' ? 30 + this.subTimer * 0.7 : 70 + Math.sin(frames * 0.3) * 8;
                    ctx.strokeStyle = (frames % 6 < 3) ? "#FF6D00" : "rgba(255,109,0,0.4)"; ctx.lineWidth = 3;
                    for (let k = 0; k < 3; k++) { let rr = Math.max(6, r - k * 18); ctx.beginPath(); ctx.arc(this.whirlX, ly, rr, frames * 0.12 + k, frames * 0.12 + k + 4.2); ctx.stroke(); }
                    if (this.state === 'whirl_warn') { ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("XOAY HUT!", this.whirlX, ly - 44); ctx.textAlign = "left"; }
                }
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 150, 18, 300, 13);
                ctx.fillStyle = "#FF6D00"; ctx.fillRect(canvas.width/2 - 148, 20, 296 * Math.max(0, this.hp/this.maxHp), 9);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText(this.name + (this.state === 'submerged' ? "  (DANG LAN)" : "  (TROI - DANH DI!)"), canvas.width/2, 14); ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s0.LavaSerpentBoss.1

// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24480 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GiantSpiderBoss, GreatSerpentBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MosaBoss, MountainGodBoss, PoisonMothBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, VoltCloneBoss
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

// Nguồn: index.html:98807 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:98818 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
