// BOSS_FILE: SummitDragonBoss
// BOSS_SNAPSHOT: 2b36ae4c51fabb54b8d0e06c3164b8f6c2ef05a8c767bbd93c893e9900521e3e
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, enemies, floatingTexts, frames, parry, pickFromBag, shakeTimer
// Nguồn: index.html:23725 · Dùng bởi: SummitDragonBoss
// BOSS_PART_BEGIN s0.SummitDragonBoss.1 EDITABLE
class SummitDragonBoss {
            constructor(level) {
                this.hp = 75; this.maxHp = 75;
                this.w = 116; this.h = 60; this.baseX = canvas.width - 240; this.baseY = 90;
                this.x = canvas.width + 40; this.y = 70; this.state = 'entering'; this.retState = 'roam'; this.name = "PHONG LONG";
                this.actionTimer = 90; this.subTimer = 0; this.lastSkill = ''; this.facingLeft = true;
                this.bob = 0; this.wing = 0; this.shots = 0; this.diveX = 0; this.diveY = 0; this.breathX = 0;
                this.burnTimer = 0; this.lastMeleeHit = -1;
            }
            spawnBolt() {
                let mx = this.x + this.w/2, my = this.y + this.h - 6;
                let dx = (dino.x + dino.w/2) - mx, dy = (dino.y + dino.h/2) - my, d = Math.hypot(dx, dy) || 1, sp = 6.2;
                let bp = new BossProjectile(mx - 10, my - 10, dx/d*sp, dy/d*sp, false, 1); bp.fire = true; bp.w = 20; bp.h = 20; bossProjectiles.push(bp);
                if (SFX.bossSkill) SFX.bossSkill();
            }
            radialBurst() {
                let mx = this.x + this.w/2, my = this.y + this.h/2;
                for (let a = 0; a < 10; a++) { let ang = a * (Math.PI*2/10), sp = 5; let bp = new BossProjectile(mx - 8, my - 8, Math.cos(ang)*sp, Math.sin(ang)*sp, false, 1); bp.fire = true; bp.w = 16; bp.h = 16; bossProjectiles.push(bp); }
            }
            update() {
                this.bob += 0.08; this.wing += 0.3;
                if (this.state === 'entering') { this.x -= 6; this.faceP(); if (this.x <= this.baseX) { this.x = this.baseX; this.state = 'intro'; this.subTimer = 0; } return; }
                if (this.state === 'intro') { this.subTimer++; if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x, this.y - 16, "PHONG LONG!")); if (SFX.bossEntry) SFX.bossEntry(); } if (this.subTimer > 46) { this.state = 'roam'; this.actionTimer = 70; } return; }
                this.faceP();
                if (this.state === 'roam') {
                    let ty = 100 + Math.sin(this.bob) * 20; this.y += (ty - this.y) * 0.08;
                    let dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    if (Math.abs(dx) < 280) this.x -= Math.sign(dx || 1) * 2.4;
                    else if (Math.abs(dx) > 470) this.x += Math.sign(dx) * 2.8;
                    this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x));
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let sk = ['volley', 'dive', 'breath', 'summon', 'gust'];
                        let c = pickFromBag(this, sk);
                        if (c === 'volley') { this.state = 'volley'; this.subTimer = 0; this.shots = 0; }
                        else if (c === 'dive') { this.state = 'dive_warn'; this.subTimer = 0; this.diveX = dino.x + dino.w/2; this.diveY = dino.y + dino.h/2; }
                        else if (c === 'breath') { this.state = 'breath_move'; this.subTimer = 0; this.breathX = dino.x + dino.w/2; }
                        else if (c === 'summon') { this.state = 'summon'; this.subTimer = 0; }
                        else { this.state = 'gust'; this.subTimer = 0; }
                    }
                    return;
                }
                if (this.state === 'volley') {
                    this.subTimer++; let ty = 100 + Math.sin(this.bob) * 16; this.y += (ty - this.y) * 0.06;
                    if (this.subTimer >= 48 && (this.subTimer - 48) % 12 === 0 && this.shots < 5) { this.spawnBolt(); this.shots++; }
                    if (this.shots >= 5) { this.state = 'roam'; this.actionTimer = 90; }
                    return;
                }
                if (this.state === 'dive_warn') { this.subTimer++; if (this.subTimer > 50) { this.state = 'dive'; this.subTimer = 0; } return; }
                if (this.state === 'dive') {
                    this.subTimer++; let tx = this.diveX - this.w/2, ty = this.diveY - this.h/2;
                    if (this.subTimer < 16) { this.x += (tx - this.x) * 0.28; this.y += (ty - this.y) * 0.28; }
                    else { this.y -= 9; this.x += (this.facingLeft ? -7 : 7); }
                    if (checkAABB(dino, this)) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                    this.x = Math.max(-40, Math.min(canvas.width + 40 - this.w, this.x));
                    if (this.subTimer > 40) { this.state = 'roam'; this.actionTimer = 90; this.y = Math.max(60, this.y); }
                    return;
                }
                if (this.state === 'breath_move') {
                    this.subTimer++; let tx = this.breathX - this.w/2; this.x += (tx - this.x) * 0.14; this.y += (80 - this.y) * 0.1;
                    this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x));
                    if (this.subTimer > 60) { this.state = 'breath'; this.subTimer = 0; shakeTimer = 8; }
                    return;
                }
                if (this.state === 'breath') {
                    this.subTimer++; let mx = this.x + this.w/2, my = this.y + this.h - 6;
                    if (this.subTimer > 8 && Math.abs((dino.x + dino.w/2) - mx) < 42 && dino.y + dino.h > my) { if (!dino.isShielding()) { if (frames % 10 === 0) dino.takeDamage(1); } else parry(); }
                    if (this.subTimer % 6 === 0) shakeTimer = Math.max(shakeTimer, 4);
                    if (this.subTimer > 46) { this.state = 'roam'; this.actionTimer = 90; }
                    return;
                }
                if (this.state === 'summon') {
                    this.subTimer++;
                    if (this.subTimer === 12) { for (let k = 0; k < 3; k++) enemies.push(new SummitBat(this.x + this.w/2 + (k-1)*30, this.y + this.h/2)); floatingTexts.push(new FloatingText(this.x, this.y - 14, "TRIỆU HỒI!")); }
                    if (this.subTimer > 34) { this.state = 'roam'; this.actionTimer = 90; }
                    return;
                }
                if (this.state === 'gust') {
                    this.subTimer++; if (this.subTimer === 48) { this.radialBurst(); shakeTimer = 10; }
                    if (this.subTimer > 70) { this.state = 'roam'; this.actionTimer = 90; }
                    return;
                }
            }
            draw() {
                let x = this.x, y = this.y, w = this.w, h = this.h, cx = x + w/2, cy = y + h/2;
                ctx.save();
                if (!this.facingLeft) { ctx.translate(cx, 0); ctx.scale(-1, 1); ctx.translate(-cx, 0); }
                let flap = Math.sin(this.wing) * 20;
                ctx.fillStyle = "#33264d"; ctx.beginPath(); ctx.moveTo(cx + 8, cy - 4); ctx.lineTo(cx + 60, cy - 26 - flap); ctx.lineTo(cx + 56, cy + 8); ctx.lineTo(cx + 26, cy + 4); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#4a3a68"; ctx.beginPath(); ctx.moveTo(cx + 2, cy - 2); ctx.lineTo(cx + 52, cy - 42 - flap); ctx.lineTo(cx + 64, cy - 8); ctx.lineTo(cx + 26, cy + 8); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#6a5a92"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + 2, cy - 2); ctx.lineTo(cx + 52, cy - 42 - flap); ctx.stroke();
                ctx.fillStyle = "#2b2140"; ctx.beginPath(); ctx.moveTo(cx + 22, cy - 2); ctx.lineTo(cx + 74, cy + 4 + Math.sin(this.bob) * 6); ctx.lineTo(cx + 22, cy + 8); ctx.fill();
                ctx.fillStyle = "#4a3a68"; ctx.fillRect(cx - 30, cy - 12, 54, 24);
                ctx.fillStyle = "#5a4a7a"; ctx.fillRect(cx - 30, cy - 12, 54, 7);
                ctx.fillStyle = "#4a3a68"; ctx.fillRect(cx - 44, cy - 14, 18, 14);
                ctx.fillStyle = "#5a4a7a"; ctx.beginPath(); ctx.moveTo(cx - 44, cy - 16); ctx.lineTo(cx - 66, cy - 12); ctx.lineTo(cx - 60, cy + 4); ctx.lineTo(cx - 42, cy - 1); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#c8b8e0"; ctx.beginPath(); ctx.moveTo(cx - 48, cy - 15); ctx.lineTo(cx - 53, cy - 30); ctx.lineTo(cx - 43, cy - 15); ctx.fill();
                ctx.fillStyle = (frames % 30 < 22) ? "#FF7043" : "#FFEB3B"; ctx.fillRect(cx - 58, cy - 9, 6, 5);
                if (this.state === 'breath' || this.state === 'volley' || this.state === 'breath_move') { ctx.fillStyle = "rgba(255,120,0,0.7)"; ctx.beginPath(); ctx.arc(cx - 62, cy - 1, 6, 0, Math.PI*2); ctx.fill(); }
                ctx.restore();
                if (this.state === 'breath_move') {
                    let mx = cx, prog = Math.min(1, this.subTimer / 60), bw = 44, ty0 = y + h;
                    ctx.fillStyle = "rgba(255,109,0," + (0.10 + prog * 0.25) + ")"; ctx.fillRect(mx - bw, ty0, bw * 2, 344 - ty0);
                    ctx.strokeStyle = (frames % 6 < 3) ? "#FF6D00" : "rgba(255,109,0,0.35)"; ctx.lineWidth = 3; ctx.strokeRect(mx - bw, ty0, bw * 2, 344 - ty0);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("TRANH RA!", mx, ty0 + 26); ctx.textAlign = "left";
                }
                if ((this.state === 'volley' || this.state === 'gust') && this.subTimer < 48) {
                    let p = Math.min(1, this.subTimer / 48);
                    ctx.strokeStyle = "rgba(255,180,60," + (0.35 + p * 0.5) + ")"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(cx, cy, 30 + p * 20, 0, Math.PI*2); ctx.stroke();
                }
                if (this.state === 'breath' && this.subTimer > 4) {
                    let mx = cx, my = y + h - 4, bw = 22 + Math.min(1, (this.subTimer - 4) / 8) * 18;
                    ctx.fillStyle = "rgba(255,60,0,0.5)"; ctx.beginPath(); ctx.moveTo(mx - 14, my); ctx.lineTo(mx - bw, 344); ctx.lineTo(mx + bw, 344); ctx.lineTo(mx + 14, my); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "rgba(255,193,7,0.82)"; ctx.beginPath(); ctx.moveTo(mx - 7, my); ctx.lineTo(mx - bw*0.55, 344); ctx.lineTo(mx + bw*0.55, 344); ctx.lineTo(mx + 7, my); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "rgba(255,245,157,0.9)"; ctx.fillRect(mx - 4, my, 8, 344 - my);
                }
                if (this.state === 'dive_warn') {
                    ctx.strokeStyle = (frames%6<3) ? "#FF1744" : "rgba(255,23,68,0.3)"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(this.diveX, this.diveY); ctx.stroke();
                    ctx.strokeStyle = "#FF1744"; ctx.beginPath(); ctx.arc(this.diveX, this.diveY, 18, 0, Math.PI*2); ctx.stroke();
                }
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 150, 18, 300, 13);
                ctx.fillStyle = "#7E57C2"; ctx.fillRect(canvas.width/2 - 148, 20, 296 * Math.max(0, this.hp/this.maxHp), 9);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText(this.name, canvas.width/2, 14); ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s0.SummitDragonBoss.1

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
