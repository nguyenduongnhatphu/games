// BOSS_FILE: StormEagleBoss
// BOSS_SNAPSHOT: 90b44e51b8a8c0ad12fba495a59e199c399e173aab86fbee147786ba09666942
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, frames, parry, pickFromBag, troiSinh, troiVy, visualEffects
// Nguồn: index.html:3393 · Dùng bởi: StormEagleBoss
// BOSS_PART_BEGIN s0.StormEagleBoss.1 EDITABLE
class StormEagleBoss {
            constructor(level) {
                this.maxHp = 75; this.hp = 75; this.name = "ĐẠI BÀNG SẤM"; this.retState = 'idle';
                this.w = 104; this.h = 72; this.x = canvas.width; this.y = 150; this.tx = 400;
                this.state = 'entering'; this.actionTimer = 70; this.subTimer = 0;
                this.lastSkill = ''; this.lastMeleeHit = -1; this.burnTimer = 0;
                this.strikes = []; this.featherGap = 400; this.wing = 0; this.diveX = 400;
            }
            pcX() { return dino.x + dino.w / 2; }
            pickSkill() {
                let sk = ['se_bolts', 'se_feathers', 'se_dive'];
                this.state = pickFromBag(this, sk); this.subTimer = 0;
                if (this.state === 'se_bolts') { this.strikes = []; for (let i = 0; i < 3; i++) this.strikes.push({ x: 90 + Math.random() * 620, warn: 52 + i * 8, hit: 0 }); }
                if (this.state === 'se_feathers') this.featherGap = 130 + Math.random() * 470;
                if (this.state === 'se_dive') this.diveX = this.pcX();
            }
            update() {
                this.wing += 0.32;
                if (this.state === 'entering') {
                    this.x -= 9; if (this.x <= 400) { this.x = 400; this.state = 'idle'; this.actionTimer = 55; }
                } else if (this.state === 'idle') {
                    this.x += (this.tx - this.x) * 0.04; this.y = 150 + Math.sin(frames * 0.05) * 10;
                    if (frames % 80 === 0) this.tx = 150 + Math.random() * 480;
                    this.actionTimer--; if (this.actionTimer <= 0) this.pickSkill();
                } else if (this.state === 'se_bolts') {
                    this.x += (this.tx - this.x) * 0.04; this.subTimer++;
                    this.strikes.forEach(s => {
                        if (s.warn > 0) { s.warn--; if (s.warn === 0) s.hit = 20; }
                        else if (s.hit > 0) { s.hit--; let col = { x: s.x - 21, y: 0, w: 42, h: 400 };
                            if (checkAABB(dino, col)) { if (dino.isShielding()) visualEffects.push(new Effect(dino.x + dino.w / 2, dino.y, 'parry')); else if (s.hit % 6 === 0) dino.takeDamage(1); } }
                    });
                    if (this.strikes.every(s => s.warn <= 0 && s.hit <= 0)) { this.state = 'idle'; this.actionTimer = 65; }
                } else if (this.state === 'se_feathers') {
                    this.subTimer++; this.y += (130 - this.y) * 0.06;
                    if (this.subTimer % 15 === 1 && this.subTimer < 135) {
                        for (let fx = 36; fx < canvas.width - 10; fx += 68) { if (Math.abs(fx - this.featherGap) < 74) continue; let bp = new BossProjectile(fx, troiSinh(), (Math.random() - 0.5) * 1.2, troiVy(4.6, -12), false, 1); bp.color = "#90A4AE"; bossProjectiles.push(bp); }
                    }
                    if (this.subTimer > 165) { this.state = 'idle'; this.actionTimer = 65; }
                } else if (this.state === 'se_dive') {
                    this.subTimer++;
                    if (this.subTimer < 28) { this.diveX = this.pcX(); this.x += (this.diveX - this.x) * 0.25; this.y = 150; }
                    else if (this.subTimer < 60) { this.y += 15; this.x += (this.diveX - this.x) * 0.05; if (this.y > 300) this.y = 300; }
                    else { this.y += (150 - this.y) * 0.14; if (this.subTimer > 92) { this.y = 150; this.state = 'idle'; this.actionTimer = 65; } }
                }
            }
            draw() {
                if (this.state === 'se_bolts') this.strikes.forEach(s => {
                    if (s.warn > 0 && frames % 6 < 3) { ctx.fillStyle = "rgba(255,50,50,0.30)"; ctx.fillRect(s.x - 21, 0, 42, 400); }
                    if (s.hit > 0) { ctx.strokeStyle = frames % 4 < 2 ? "#FFEB3B" : "#40C4FF"; ctx.lineWidth = 8; ctx.shadowBlur = 12; ctx.shadowColor = "#40C4FF"; ctx.beginPath(); ctx.moveTo(s.x, 0); let yy = 0; while (yy < 400) { yy += 34; ctx.lineTo(s.x + (Math.random() - 0.5) * 26, yy); } ctx.stroke(); ctx.shadowBlur = 0; }
                });
                // ===== THIET KE: moi canh 7 CHIEC LONG BAY rieng, xoe nan quat theo nhip vo =====
                // Nhin CHINH DIEN (khac Quetzal/Ptero nhin nghieng) vi no lo lung tren dau va danh xuong.
                const EOUT = "#141C21";
                let eFlap = (this.state === 'se_dive') ? -0.85 : Math.sin(this.wing);
                let eCharge = (this.state === 'se_bolts') ? (0.5 + 0.5 * Math.sin(frames * 0.35)) : 0;
                let eSp = (eFlap + 1) / 2;
                ctx.save(); ctx.translate(this.x + this.w / 2, this.y + this.h / 2); ctx.scale(1.35, 1.35);

                for (let dir = -1; dir <= 1; dir += 2) {
                    ctx.save(); ctx.scale(dir, 1);
                    let lift = -eSp * 26;
                    ctx.fillStyle = "#37474F";
                    ctx.beginPath(); ctx.moveTo(8, -6); ctx.quadraticCurveTo(30, -16 + lift * 0.5, 52, -10 + lift * 0.7);
                    ctx.quadraticCurveTo(34, 4, 10, 8); ctx.closePath(); ctx.fill();
                    for (let i = 0; i < 7; i++) {
                        let t = i / 6, ang = (-0.30 - t * 0.62) + lift * 0.006, len = 46 + t * 40;
                        let bx = 14 + t * 30, by = -4 + lift * (0.35 + t * 0.5);
                        ctx.save(); ctx.translate(bx, by); ctx.rotate(ang);
                        ctx.fillStyle = i % 2 ? "#455A64" : "#546E7A";
                        ctx.beginPath(); ctx.moveTo(0, -5); ctx.quadraticCurveTo(len * 0.55, -9, len, -2);
                        ctx.quadraticCurveTo(len * 0.55, 7, 0, 6); ctx.closePath(); ctx.fill();
                        ctx.strokeStyle = EOUT; ctx.lineWidth = 1.6; ctx.stroke();
                        ctx.strokeStyle = "#78909C"; ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(2, 0); ctx.lineTo(len - 4, -1); ctx.stroke();
                        ctx.restore();
                    }
                    // dien phong ra tu DAU CANH khi goi set -> bao truoc ngay tren than boss
                    if (eCharge > 0) {
                        ctx.strokeStyle = "rgba(64,196,255," + eCharge + ")"; ctx.lineWidth = 2;
                        let px = 88, py = -16 + lift * 0.8;
                        ctx.beginPath(); ctx.moveTo(px, py);
                        for (let k = 0; k < 4; k++) ctx.lineTo(px - k * 12 - 6, py + (Math.random() - 0.5) * 16);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // duoi xoe
                ctx.fillStyle = "#37474F";
                for (let i = -2; i <= 2; i++) {
                    ctx.save(); ctx.rotate(i * 0.17);
                    ctx.beginPath(); ctx.moveTo(-5, 14); ctx.quadraticCurveTo(-3, 34, 0, 44);
                    ctx.quadraticCurveTo(3, 34, 5, 14); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = EOUT; ctx.lineWidth = 1.4; ctx.stroke(); ctx.restore();
                }
                // than + long nguc xep vay
                ctx.fillStyle = "#546E7A";
                ctx.beginPath(); ctx.ellipse(0, 2, 17, 22, 0, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = EOUT; ctx.lineWidth = 2.5; ctx.stroke();
                ctx.fillStyle = "#78909C";
                for (let r = 0; r < 4; r++) for (let c = -2; c <= 2; c++) {
                    if (Math.abs(c) === 2 && r > 2) continue;
                    ctx.beginPath(); ctx.arc(c * 6.5, -4 + r * 7, 4, Math.PI, 0); ctx.fill();
                }
                // dau trang + go may du ton
                ctx.fillStyle = "#ECEFF1";
                ctx.beginPath(); ctx.ellipse(0, -24, 13, 12, 0, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = EOUT; ctx.lineWidth = 2; ctx.stroke();
                ctx.fillStyle = "#90A4AE";
                ctx.beginPath(); ctx.moveTo(-13, -29); ctx.quadraticCurveTo(-4, -33, 0, -30);
                ctx.quadraticCurveTo(4, -33, 13, -29); ctx.lineTo(11, -24);
                ctx.quadraticCurveTo(0, -27, -11, -24); ctx.closePath(); ctx.fill();
                // mo moc cau
                ctx.fillStyle = "#FFC107";
                ctx.beginPath(); ctx.moveTo(-6, -22); ctx.lineTo(6, -22);
                ctx.quadraticCurveTo(5, -13, 0, -9); ctx.quadraticCurveTo(-4, -13, -6, -22); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = EOUT; ctx.lineWidth = 1.5; ctx.stroke();
                ctx.fillStyle = "#FF8F00";
                ctx.beginPath(); ctx.moveTo(-2, -13); ctx.lineTo(2, -13); ctx.lineTo(0, -8); ctx.closePath(); ctx.fill();
                // mat (chuyen xanh khi goi set)
                for (let sg = -1; sg <= 1; sg += 2) {
                    ctx.fillStyle = "#FFF9C4"; ctx.beginPath(); ctx.ellipse(sg * 6, -27, 4.5, 4, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = eCharge > 0.3 ? "#40C4FF" : "#FFA000";
                    ctx.beginPath(); ctx.ellipse(sg * 6, -27, 3, 2.8, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "#000"; ctx.beginPath(); ctx.arc(sg * 6, -27, 1.6, 0, Math.PI * 2); ctx.fill();
                }
                // vuot, quap lai khi bo nhao
                ctx.strokeStyle = "#FFC107"; ctx.lineWidth = 3; ctx.lineCap = "round";
                let eGrab = (this.state === 'se_dive') ? 8 : 0;
                for (let sg = -1; sg <= 1; sg += 2) {
                    ctx.beginPath(); ctx.moveTo(sg * 7, 20); ctx.lineTo(sg * 9, 28 + eGrab); ctx.stroke();
                    ctx.fillStyle = "#FFD54F";
                    for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(sg * 9, 28 + eGrab);
                        ctx.lineTo(sg * 9 + k * 5, 34 + eGrab * 1.4); ctx.lineTo(sg * 9 + k * 5 + 2, 29 + eGrab); ctx.closePath(); ctx.fill(); }
                }
                ctx.lineCap = "butt";
                ctx.restore();
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width / 2 - 160, 18, 320, 14);
                ctx.fillStyle = "#4FC3F7"; ctx.fillRect(canvas.width / 2 - 158, 20, 316 * Math.max(0, this.hp / this.maxHp), 10);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText(this.name, canvas.width / 2, 14); ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s0.StormEagleBoss.1

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
