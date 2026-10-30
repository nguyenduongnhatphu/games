// BOSS_FILE: PoisonMothBoss
// BOSS_SNAPSHOT: 2b36ae4c51fabb54b8d0e06c3164b8f6c2ef05a8c767bbd93c893e9900521e3e
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, frames, gameSpeed, parry, pickFromBag, projectiles, visualEffects
// Nguồn: index.html:3536 · Dùng bởi: PoisonMothBoss
// BOSS_PART_BEGIN s0.PoisonMothBoss.1 EDITABLE
class PoisonMothBoss {
            constructor(level) {
                this.maxHp = 75; this.hp = 75; this.name = "BƯỚM ĐÊM ĐỘC"; this.retState = 'idle';
                this.w = 96; this.h = 78; this.x = canvas.width; this.y = 160; this.tx = 400;
                this.state = 'entering'; this.actionTimer = 70; this.subTimer = 0;
                this.lastSkill = ''; this.lastMeleeHit = -1; this.burnTimer = 0;
                this.clouds = []; this.spores = []; this.wing = 0;
            }
            pcX() { return dino.x + dino.w / 2; } pcY() { return dino.y + dino.h / 2; }
            pickSkill() {
                let sk = ['pm_clouds', 'pm_spores', 'pm_wave'];
                this.state = pickFromBag(this, sk); this.subTimer = 0;
            }
            update() {
                this.wing += 0.2;
                for (let i = this.clouds.length - 1; i >= 0; i--) { let c = this.clouds[i]; c.life--; c.x -= gameSpeed * 0.25;
                    let cr = { x: c.x - c.r, y: c.y - c.r, w: c.r * 2, h: c.r * 2 };
                    if (checkAABB(dino, cr) && frames % 20 === 0 && !dino.isShielding()) dino.takeDamage(1);
                    if (c.life <= 0) this.clouds.splice(i, 1); }
                for (let i = this.spores.length - 1; i >= 0; i--) { let sp = this.spores[i]; sp.life--;
                    let dx = (dino.x + dino.w / 2) - sp.x, dy = (dino.y + dino.h / 2) - sp.y, d = Math.hypot(dx, dy) || 1;
                    sp.vx += (dx / d) * 0.22; sp.vy += (dy / d) * 0.22; let spd = Math.hypot(sp.vx, sp.vy); if (spd > 3.1) { sp.vx = sp.vx / spd * 3.1; sp.vy = sp.vy / spd * 3.1; }
                    sp.x += sp.vx; sp.y += sp.vy;
                    let sr = { x: sp.x - 8, y: sp.y - 8, w: 16, h: 16 };
                    if (checkAABB(dino, sr)) { if (dino.isShielding()) visualEffects.push(new Effect(dino.x + dino.w / 2, dino.y, 'parry')); else dino.takeDamage(1); this.spores.splice(i, 1); continue; }
                    let shot = false; for (let p = projectiles.length - 1; p >= 0; p--) { if (checkAABB(projectiles[p], sr)) { shot = true; break; } }
                    if (shot || sp.life <= 0) this.spores.splice(i, 1); }
                if (this.state === 'entering') {
                    this.x -= 9; if (this.x <= 400) { this.x = 400; this.state = 'idle'; this.actionTimer = 55; }
                } else if (this.state === 'idle') {
                    this.x += (this.tx - this.x) * 0.04; this.y = 160 + Math.sin(frames * 0.06) * 16;
                    if (frames % 90 === 0) this.tx = 150 + Math.random() * 480;
                    this.actionTimer--; if (this.actionTimer <= 0) this.pickSkill();
                } else if (this.state === 'pm_clouds') {
                    this.subTimer++;
                    if (this.subTimer === 1 || this.subTimer === 34 || this.subTimer === 67) this.clouds.push({ x: 130 + Math.random() * 540, y: 205 + Math.random() * 85, r: 44, life: 340 });
                    if (this.subTimer > 90) { this.state = 'idle'; this.actionTimer = 65; }
                } else if (this.state === 'pm_spores') {
                    this.subTimer++;
                    if (this.subTimer % 24 === 1 && this.spores.length < 7 && this.subTimer < 130) this.spores.push({ x: this.x + this.w / 2, y: this.y + this.h / 2, vx: 0, vy: 1, life: 220 });
                    if (this.subTimer > 155) { this.state = 'idle'; this.actionTimer = 65; }
                } else if (this.state === 'pm_wave') {
                    this.subTimer++;
                    if (this.subTimer === 18 || this.subTimer === 42) { let off = this.subTimer === 18 ? 0 : Math.PI / 12; for (let a = 0; a < 12; a++) { let ang = (a / 12) * Math.PI * 2 + off; let bp = new BossProjectile(this.x + this.w / 2, this.y + this.h / 2, Math.cos(ang) * 3.4, Math.sin(ang) * 3.4, false, 1); bp.color = "#CE93D8"; bossProjectiles.push(bp); } }
                    if (this.subTimer > 70) { this.state = 'idle'; this.actionTimer = 65; }
                }
            }
            draw() {
                this.clouds.forEach(c => { ctx.save(); ctx.globalAlpha = Math.min(0.55, c.life / 90) * 0.75; ctx.fillStyle = "#7B1FA2"; ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#AB47BC"; ctx.beginPath(); ctx.arc(c.x, c.y, c.r * 0.6, 0, Math.PI * 2); ctx.fill(); ctx.restore(); ctx.globalAlpha = 1; });
                this.spores.forEach(sp => { ctx.shadowBlur = 8; ctx.shadowColor = "#AB47BC"; ctx.fillStyle = "#8E24AA"; ctx.beginPath(); ctx.arc(sp.x, sp.y, 8, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#E1BEE7"; ctx.beginPath(); ctx.arc(sp.x, sp.y, 4, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; });
                let x = this.x + this.w / 2, y = this.y + this.h / 2;
                // ===== THIET KE: BON canh (truoc lon + sau nho rang cua), mat gia tren canh,
                // nguc XU LONG va rau LONG CHIM - hai thu phan biet buom DEM voi buom ngay.
                const MOUT = "#1B0A26";
                let mBeat = Math.abs(Math.sin(this.wing));
                let mOp = (this.state === 'pm_wave') ? (0.35 + 0.65 * Math.abs(Math.sin(frames * 0.25))) : (0.55 + mBeat * 0.5);
                let mGlow = (this.state === 'pm_spores' || this.state === 'pm_clouds') ? (0.4 + 0.6 * Math.sin(frames * 0.3)) : 0;
                ctx.save(); ctx.translate(x, y); ctx.scale(1.35, 1.35);

                for (let dir = -1; dir <= 1; dir += 2) {
                    ctx.save(); ctx.scale(dir * mOp, 1);
                    // canh SAU nho, vien rang cua
                    ctx.fillStyle = "#4A148C";
                    ctx.beginPath(); ctx.moveTo(4, 6);
                    ctx.quadraticCurveTo(26, 12, 34, 30);
                    ctx.quadraticCurveTo(24, 26, 20, 32);
                    ctx.quadraticCurveTo(14, 26, 10, 32);
                    ctx.quadraticCurveTo(6, 24, 4, 20); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = MOUT; ctx.lineWidth = 2; ctx.stroke();
                    // canh TRUOC lon
                    ctx.fillStyle = "#6A1B9A";
                    ctx.beginPath(); ctx.moveTo(4, -10);
                    ctx.quadraticCurveTo(30, -34, 52, -24);
                    ctx.quadraticCurveTo(48, -14, 50, -6);
                    ctx.quadraticCurveTo(40, -6, 36, 2);
                    ctx.quadraticCurveTo(28, -2, 22, 6);
                    ctx.quadraticCurveTo(12, 2, 4, 8); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = MOUT; ctx.lineWidth = 2.5; ctx.stroke();
                    ctx.fillStyle = "#AB47BC";
                    ctx.beginPath(); ctx.moveTo(10, -12); ctx.quadraticCurveTo(30, -26, 46, -20);
                    ctx.quadraticCurveTo(30, -12, 14, -4); ctx.closePath(); ctx.fill();
                    // MAT GIA tren canh
                    ctx.fillStyle = "#1B0A26"; ctx.beginPath(); ctx.ellipse(30, -14, 9, 7, -0.3, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "#FF6F00"; ctx.beginPath(); ctx.ellipse(30, -14, 6, 4.5, -0.3, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "#FFECB3"; ctx.beginPath(); ctx.ellipse(29, -15, 2.4, 2, -0.3, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = "rgba(225,190,231,0.5)"; ctx.lineWidth = 1.2;
                    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(6, -6 + k * 3);
                        ctx.quadraticCurveTo(26, -20 + k * 6, 48, -16 + k * 7); ctx.stroke(); }
                    // tuyen bao tu sang o mep canh truoc khi tha
                    if (mGlow > 0) { ctx.fillStyle = "rgba(224,64,251," + mGlow + ")";
                        for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(38 - k * 10, 2 - k * 3, 3.5, 0, Math.PI * 2); ctx.fill(); } }
                    ctx.restore();
                }
                // bung phan doi
                ctx.fillStyle = "#4A148C";
                ctx.beginPath(); ctx.ellipse(0, 18, 6, 16, 0, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = MOUT; ctx.lineWidth = 2; ctx.stroke();
                ctx.strokeStyle = "#7B1FA2"; ctx.lineWidth = 1.6;
                for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-5, 8 + k * 6); ctx.lineTo(5, 8 + k * 6); ctx.stroke(); }
                // NGUC XU LONG
                ctx.fillStyle = "#7B1FA2";
                ctx.beginPath(); ctx.ellipse(0, -2, 12, 14, 0, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = MOUT; ctx.lineWidth = 2.5; ctx.stroke();
                ctx.strokeStyle = "#CE93D8"; ctx.lineWidth = 1.5; ctx.lineCap = "round";
                for (let k = 0; k < 14; k++) { let a2 = k / 14 * Math.PI * 2;
                    ctx.beginPath(); ctx.moveTo(Math.cos(a2) * 8, -2 + Math.sin(a2) * 7.2);
                    ctx.lineTo(Math.cos(a2) * 15, -2 + Math.sin(a2) * 13.5); ctx.stroke(); }
                ctx.lineCap = "butt";
                // dau
                ctx.fillStyle = "#6A1B9A";
                ctx.beginPath(); ctx.ellipse(0, -18, 8, 7, 0, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = MOUT; ctx.lineWidth = 2; ctx.stroke();
                // RAU LONG CHIM
                ctx.strokeStyle = "#CE93D8"; ctx.lineWidth = 2;
                for (let sg = -1; sg <= 1; sg += 2) {
                    ctx.beginPath(); ctx.moveTo(sg * 4, -23);
                    ctx.quadraticCurveTo(sg * 16, -34, sg * 26, -30); ctx.stroke();
                    ctx.lineWidth = 1.2;
                    for (let k = 1; k <= 6; k++) { let t2 = k / 7, px = sg * (4 + 22 * t2), py = -23 - 11 * t2 + 3 * t2 * t2;
                        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + sg * 2, py - 5); ctx.stroke();
                        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + sg * 4, py + 3); ctx.stroke(); }
                    ctx.lineWidth = 2;
                }
                // mat kep (chuyen hong tim khi sap tha doc)
                for (let sg = -1; sg <= 1; sg += 2) {
                    ctx.fillStyle = "#1B0A26"; ctx.beginPath(); ctx.ellipse(sg * 4, -19, 4, 4.5, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = mGlow > 0.3 ? "#E040FB" : "#FFEB3B";
                    ctx.beginPath(); ctx.ellipse(sg * 4, -19, 2.6, 3, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.beginPath(); ctx.arc(sg * 4 - 1, -20, 1, 0, Math.PI * 2); ctx.fill();
                }
                // 6 chan
                ctx.strokeStyle = "#4A148C"; ctx.lineWidth = 2; ctx.lineCap = "round";
                for (let sg = -1; sg <= 1; sg += 2) for (let k = 0; k < 3; k++) {
                    ctx.beginPath(); ctx.moveTo(sg * 7, -2 + k * 5);
                    ctx.quadraticCurveTo(sg * 15, 4 + k * 6, sg * 13, 12 + k * 6); ctx.stroke(); }
                ctx.lineCap = "butt";
                ctx.restore();
                // phan buom roi lien tuc
                ctx.fillStyle = "rgba(206,147,216,0.5)";
                for (let i = 0; i < 14; i++) { let px = x + ((i * 97) % 160) - 80, py = y + ((frames * 1.2 + i * 31) % 150) - 10;
                    ctx.fillRect(px, py, 2, 2); }
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width / 2 - 160, 18, 320, 14);
                ctx.fillStyle = "#BA68C8"; ctx.fillRect(canvas.width / 2 - 158, 20, 316 * Math.max(0, this.hp / this.maxHp), 10);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText(this.name, canvas.width / 2, 14); ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s0.PoisonMothBoss.1

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

// Nguồn: index.html:99958 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:99969 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
