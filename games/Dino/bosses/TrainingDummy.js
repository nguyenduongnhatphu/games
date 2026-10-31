// BOSS_FILE: TrainingDummy
// BOSS_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Number, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, ctx, dino, floatingTexts, frames, parry
// Nguồn: index.html:79356 · Dùng bởi: TrainingDummy
// BOSS_PART_BEGIN s5.TrainingDummy.1 EDITABLE
class TrainingDummy {
            constructor(){
                this.name = "TRAINING DUMMY"; this.maxHp = 999999; this.hp = 999999;
                this.w = 72; this.h = 98; this.baseY = 320 - this.h;
                this.x = canvas.width - 215; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'idle'; this.subTimer = 0; this.actionTimer = 999999; this.facingLeft = true;
                this.invulnAll = false; this.burnTimer = 0; this.retState = 'idle'; this.lastMeleeHit = -1;
                this._prev = this.hp; this.total = 0; this.wob = 0; this.win = []; this.peak = 0;
                // Damage observation belongs to combat, never to the AI/physics clock.
                // Watch hp itself so legacy direct writes and wrapped minions also report immediately.
                let health = this.hp;
                Object.defineProperty(this, 'hp', {
                    configurable: true, enumerable: true,
                    get: () => health,
                    set: value => {
                        if (!Number.isFinite(value)) return;
                        const damage = health - value;
                        health = value;
                        if (damage > 0) this.recordDamage(damage);
                    }
                });
            }
            recordDamage(damage){
                this.total += damage;
                this.wob = Math.min(16, this.wob + damage * 0.7);
                this.win.push({ t: frames, d: damage });
                this.peak = Math.max(this.peak, this.dps());
                floatingTexts.push(new FloatingText(this.x + 6 + Math.random()*46, this.y + 16 + Math.random()*46, "-" + damage));
                if (typeof SFX !== 'undefined' && SFX.hit) SFX.hit();
            }
            combatTick(){
                if (this._combatFrame === frames) return;
                this._combatFrame = frames;
                this.hp = this.maxHp; this._prev = this.hp;
                this.dps();
                if (this.wob > 0.2) this.wob *= 0.86; else this.wob = 0;
            }
            update(){
                this.combatTick();
                /* @@HE-MIDAS: CHO PHEP BI HAT TUNG.
                   Truoc day dong duoi ghim `y = baseY` MOI KHUNG, nen moi cu hat len deu bi
                   xoa ngay trong cung khung do — day lui thi song vi `x` khong bi ghim.
                   Gio dang bay thi coc tu roi theo trong luc, cham dat moi ghim lai. */
                if (this.dy < 0 || this.y < this.baseY - 0.5){
                    this.y += this.dy; this.dy += 0.9;
                    if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; }
                    else this.grounded = false;
                } else { this.y = this.baseY; this.dy = 0; this.grounded = true; }
            }
            dps(){
                while (this.win.length && frames - this.win[0].t >= 60) this.win.shift();
                let sum = 0; for (const hit of this.win) sum += hit.d; return sum;
            }
            draw(){
                let x = this.x, y = this.y, k = Math.sin(frames * 0.5) * this.wob;
                ctx.save(); ctx.translate(x + this.w/2 + k, y + this.h); ctx.rotate(k * 0.006); ctx.translate(-(x + this.w/2), -(y + this.h));
                ctx.fillStyle = "#5D4037"; ctx.fillRect(x + this.w/2 - 9, y + 30, 18, this.h - 30);
                ctx.fillStyle = "#4E342E"; ctx.fillRect(x + this.w/2 - 9, y + 30, 5, this.h - 30);
                ctx.fillStyle = "#3E2723"; ctx.fillRect(x + this.w/2 - 30, y + this.h - 8, 60, 8);
                ctx.fillStyle = "#C8A165"; ctx.fillRect(x + 6, y + 26, this.w - 12, 54);          // than rom
                ctx.fillStyle = "#B08A50"; ctx.fillRect(x + 6, y + 26, this.w - 12, 6);
                ctx.fillStyle = "#8D6E42"; for (let r = 0; r < 5; r++) ctx.fillRect(x + 6, y + 34 + r*10, this.w - 12, 2);
                ctx.fillStyle = "#C8A165"; ctx.fillRect(x - 16, y + 34, 22, 12); ctx.fillRect(x + this.w - 6, y + 34, 22, 12);
                ctx.fillStyle = "#D7B278"; ctx.beginPath(); ctx.arc(x + this.w/2, y + 16, 17, 0, 6.28); ctx.fill();
                // vong bia
                let bx = x + this.w/2, by = y + 52;
                ctx.strokeStyle = "#E53935"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(bx, by, 17, 0, 6.28); ctx.stroke();
                ctx.beginPath(); ctx.arc(bx, by, 9, 0, 6.28); ctx.stroke();
                ctx.fillStyle = "#E53935"; ctx.beginPath(); ctx.arc(bx, by, 4, 0, 6.28); ctx.fill();
                ctx.restore();
                // bang so lieu
                let d1 = this.dps();
                ctx.fillStyle = "rgba(0,0,0,0.62)"; ctx.fillRect(x - 34, y - 60, 142, 52);
                ctx.strokeStyle = "#FFB300"; ctx.lineWidth = 2; ctx.strokeRect(x - 34, y - 60, 142, 52);
                ctx.textAlign = "left"; ctx.font = "bold 12px Consolas, monospace";
                ctx.fillStyle = "#FFD54F"; ctx.fillText("DPS  " + d1, x - 26, y - 42);
                ctx.fillStyle = "#80CBC4"; ctx.fillText("ĐỈNH " + this.peak, x - 26, y - 27);
                ctx.fillStyle = "#B0BEC5"; ctx.fillText("TỔNG " + this.total, x - 26, y - 12);
            }
        }
// BOSS_PART_END s5.TrainingDummy.1

// Nguồn: index.html:100013 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:100024 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
