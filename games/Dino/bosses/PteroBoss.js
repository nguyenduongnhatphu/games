// BOSS_FILE: PteroBoss
// BOSS_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossKeepDist, canvas, ctx, dino, enemies, frames, gameSpeed, parry, parryX, visualEffects
// Nguồn: index.html:207 · Dùng bởi: PteroBoss
// BOSS_PART_BEGIN s0.PTERO_SWEEP.1 EDITABLE
const PTERO_SWEEP = 150, PTERO_SWEEP_T = 48;
// BOSS_PART_END s0.PTERO_SWEEP.1

// Nguồn: index.html:216 · Dùng bởi: GodzillaBoss, PteroBoss, QuetzalBoss, ScarabLordBoss, SpinoBoss, TriceratopsBoss
// BOSS_PART_BEGIN s0.desertBossPoly.1 READ_ONLY
function desertBossPoly(points,fill,edge='#20242a',width=2){
            ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);
            for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);
            ctx.closePath();ctx.fillStyle=fill;ctx.fill();
            if(edge){ctx.strokeStyle=edge;ctx.lineWidth=width;ctx.stroke();}
        }
// BOSS_PART_END s0.desertBossPoly.1

// Nguồn: index.html:222 · Dùng bởi: GodzillaBoss, PteroBoss, QuetzalBoss, ScarabLordBoss, SpinoBoss, TriceratopsBoss
// BOSS_PART_BEGIN s0.desertBossLine.1 READ_ONLY
function desertBossLine(points,color,width=1.5){
            ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);
            for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);
            ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();
        }
// BOSS_PART_END s0.desertBossLine.1

// Nguồn: index.html:227 · Dùng bởi: PteroBoss, QuetzalBoss
// BOSS_PART_BEGIN s0.drawDesertPterosaur.1 READ_ONLY
function drawDesertPterosaur(b,quetzal=false){
            const q=quetzal,dir=q?(b.state==='q_talon_go'?(b.talonDir||-1):-1):(b.oDir||-1);
            const dive=/swoop|q_dive|q_talon_go/.test(b.state),charge=/laser|q_slash|q_flurry/.test(b.state);
            const flap=dive?-.55:Math.sin(frames*(q?.105:.15)),bob=dive||charge?0:-flap*2;
            const P=q?{edge:'#251c1b',body:'#6b5141',lit:'#a28260',mem:'#a95535',shade:'#653629',rib:'#d8a664',crest:'#bc763c',beak:'#d8c19a'}:{edge:'#19242c',body:'#415e68',lit:'#79949b',mem:'#87594e',shade:'#553c3b',rib:'#b88d71',crest:'#b66a4b',beak:'#c1b399'};
            const poly=(p,c,e=true)=>desertBossPoly(p,c,e?P.edge:null,1.8);
            ctx.save();ctx.translate(b.x+(dir>0?b.w:0),b.y);ctx.scale((dir>0?-1:1)*b.w/120,b.h/80);ctx.translate(0,bob);
            const wing=(back)=>{
                ctx.save();ctx.translate(q?58:52,38);ctx.rotate(flap*(back?.36:.53)+(back?-.12:.08));ctx.scale(back?.82:1,back?.8:1);
                const tip=q?106:92,top=q?-57:-51;
                poly([[0,0],[21,-19],[44,-44],[tip,top],[tip-25,-25],[55,-2],[35,9],[15,17],[3,15]],back?P.shade:P.mem);
                poly([[4,1],[23,-14],[45,-38],[tip-7,top+3],[50,-15],[27,7],[10,12]],back?P.mem:P.shade,false);
                poly([[0,-3],[18,-20],[41,-44],[47,-43],[24,-14],[6,4]],back?P.body:P.lit);
                // The elongated fourth finger supports a single membrane; the
                // other three fingers stay short at the wrist.
                desertBossLine([[0,0],[22,-18],[44,-43],[tip,top]],P.rib,2.5);
                for(const [x,y] of [[tip-25,-25],[55,-2],[35,9],[15,17]])desertBossLine([[44,-42],[x,y]],P.rib,1.1);
                for(let i=0;i<3;i++)poly([[40+i*3,-41],[42+i*3,-48],[44+i*3,-42]],P.beak,false);
                poly([[47,-35],[58,-39],[53,-23]],P.mem,false);
                ctx.restore();
            };
            wing(true);
            // Keeled chest and folded hind limbs, with weight at the shoulder.
            poly([[26,35],[42,28],[67,28],[87,35],[94,42],[86,51],[64,56],[40,51],[25,43]],P.body);
            poly([[34,40],[50,36],[76,37],[88,42],[77,49],[53,51],[37,46]],P.lit,false);
            poly([[84,37],[105,40],[111,36],[108,45],[92,48]],P.body);
            for(let i=0;i<2;i++){
                const x=65+i*17,dy=dive?12:0;
                poly([[x,48],[x+7,48],[x+4,56+dy],[x-4,60+dy],[x-8,57+dy],[x-2,53]],i?P.body:P.shade);
                for(let j=0;j<3;j++)poly([[x-7+j*3,56+dy],[x-10+j*3,64+dy],[x-5+j*3,60+dy]],P.beak,false);
            }
            if(q){
                // Quetzal has a long, stiff neck and a broad spear-shaped bill.
                poly([[40,41],[31,41],[23,28],[14,22],[9,12],[16,9],[23,17],[29,20],[37,32],[45,35]],P.body);
                poly([[34,37],[27,24],[17,19],[13,13],[17,12],[24,20],[31,23],[39,35]],P.lit,false);
                ctx.save();ctx.translate(0,20);
                poly([[3,9],[7,0],[18,-3],[25,3],[21,16],[11,18],[0,15]],P.body);
                poly([[9,0],[15,-17],[23,-27],[23,-7],[26,1],[19,3]],P.crest);
                poly([[0,7],[-40,15],[-49,19],[-3,17],[11,13]],P.beak);
                poly([[0,16],[-43,20-charge*3],[-4,23+charge*3],[10,17]],P.lit);
                desertBossLine([[-43,18],[-3,15],[10,13]],P.edge,1.2);
                ctx.fillStyle='#efb744';ctx.fillRect(9,6,7,3);ctx.fillStyle=P.edge;ctx.fillRect(10,6,2,3);
                ctx.restore();
            }else{
                ctx.save();ctx.translate(0,charge?6:0);
                poly([[28,38],[19,35],[12,31],[6,31],[4,37],[16,43],[29,47],[36,43]],P.body);
                poly([[9,29],[16,21],[23,23],[25,33],[18,39],[5,39],[0,34]],P.lit);
                poly([[15,24],[30,13],[56,5],[43,18],[22,30]],P.crest);
                poly([[18,24],[32,15],[48,10],[35,19]],P.rib,false);
                poly([[4,31],[-29,34],[-4,37],[9,36]],P.beak);
                poly([[3,38],[-23,38+charge*3],[-1,42+charge*3],[13,37]],P.body);
                ctx.fillStyle='#ffba70';ctx.fillRect(13,28,6,3);ctx.fillStyle=P.edge;ctx.fillRect(14,28,2,3);
                if(charge){ctx.fillStyle='#e48bfa';ctx.beginPath();ctx.arc(3,38,4+Math.sin(frames*.4),0,Math.PI*2);ctx.fill();}
                ctx.restore();
            }
            wing(false);ctx.restore();
        }
// BOSS_PART_END s0.drawDesertPterosaur.1

// Nguồn: index.html:454 · Dùng bởi: PteroBoss
// BOSS_PART_BEGIN s0.PteroBoss.1 EDITABLE
class PteroBoss {
            constructor(level) {
                this.hp = 50; this.maxHp = 50;
                this.w = 120; this.h = 80; this.baseX = canvas.width - 180; this.baseY = 80;
                this.x = canvas.width; this.y = 80; this.state = 'entering'; this.swoopTimer = 120; this.name = "PTERO BOSS"; this.actionCooldown = 60; this.lastMeleeHit = -1;
                this.actionTimer = 0; this.subTimer = 0; this.summons = 0; this.lastSkill = ''; this.burnTimer = 0; this.oDir = -1; this._homeSide = 1;
            }
            draw() {
                let x=this.x,y=this.y;ctx.save();
                drawDesertPterosaur(this);
                let drawTargetX = this.targetX;
                let drawTargetY = 320;

                // Tia LUON chieu thang xuong dat. Khong be tia dinh vao khien nua — khien chi do binh thuong.
                if (this.state === 'laser_prep') {
                    let a0 = (this.laserAim || this.targetX) - PTERO_SWEEP, a1 = (this.laserAim || this.targetX) + PTERO_SWEEP;
                    // BANG CANH BAO tren mat dat: dung bang khu vuc se bi quet
                    ctx.fillStyle = (frames % 10 < 5) ? "rgba(224,64,251,0.22)" : "rgba(224,64,251,0.10)";
                    ctx.fillRect(a0, 300, a1 - a0, 20);
                    ctx.strokeStyle = "rgba(224,64,251,0.9)"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(a0, 296); ctx.lineTo(a0, 322); ctx.moveTo(a1, 296); ctx.lineTo(a1, 322); ctx.stroke();
                    ctx.setLineDash([7, 7]);
                    ctx.strokeStyle = (frames % 10 < 5) ? "rgba(255,0,0,0.7)" : "rgba(255,0,0,0.25)";
                    ctx.beginPath(); ctx.moveTo(x, y + 44); ctx.lineTo(a0, 320); ctx.stroke();
                    ctx.setLineDash([]);
                } else if (this.state === 'laser_firing') {
                    ctx.strokeStyle = "#E040FB"; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(x, y + 44); ctx.lineTo(drawTargetX, drawTargetY); ctx.stroke();
                    ctx.strokeStyle = "white"; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, y + 44); ctx.lineTo(drawTargetX, drawTargetY); ctx.stroke();
                    // diem cham dat + vet chay de lai
                    ctx.fillStyle = "rgba(224,64,251,0.85)";
                    ctx.beginPath(); ctx.ellipse(drawTargetX, 318, 16, 6, 0, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "rgba(255,255,255,0.9)";
                    ctx.beginPath(); ctx.ellipse(drawTargetX, 318, 7, 3, 0, 0, Math.PI*2); ctx.fill();
                }
                ctx.restore();
                // ctx.fillStyle = "black"; ctx.fillRect(x+10, y - 10, this.w-20, 8); ctx.fillStyle = "#FF5252"; ctx.fillRect(x + 11, y - 9, (this.w - 22) * (this.hp / this.maxHp), 6);
            }
            update() {
                if (this.actionTimer > 0) { this.actionTimer--; return; } 
                this.actionCooldown--;
                if (this.state === 'entering') { this.x -= 3; if (this.x <= this.baseX) this.state = 'hovering'; } 
                else if (this.state === 'hovering') {
                    this.y = this.baseY + Math.floor(Math.sin(frames * 0.05) * 35); this.swoopTimer--; 
                    this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    bossKeepDist(this, 420, 560, 9, 3);
                    if (this.swoopTimer <= 0 && this.actionCooldown <= 0) { 
                        let seq = ['laser_prep', 'summon_adds', 'swooping']; let chosen = seq[(this.skillIdx || 0) % seq.length]; this.skillIdx = ((this.skillIdx || 0) + 1) % seq.length;

                        if (chosen === 'swooping') { this.state = 'swooping'; this.swoopDir = this.oDir; } 
                        else if (chosen === 'laser_prep') { this.state = 'laser_prep'; this.swoopTimer = 55; this.laserAim = dino.x + dino.w/2; this.targetX = this.laserAim - PTERO_SWEEP; }
                        else { this.state = 'summon_adds'; this.subTimer = 0; this.summons = 0; this.summonMax = Math.min(6, (this.summonMax || 3) + 1); }
                    }
                } else if (this.state === 'swooping') {
                    this.x += 16 * (this.swoopDir || -1); this.y += 6; if (this.y > 250) this.y = 250;
                    let _past = (this.swoopDir > 0 && this.x > dino.x + dino.w + 60) || (this.swoopDir <= 0 && this.x + this.w < dino.x - 60);
                    if (_past || this.x < 8 || this.x > canvas.width - this.w - 8) { this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x)); this.state = 'returning'; }
                } else if (this.state === 'summon_adds') {
                    if (this.subTimer % 24 === 0 && this.summons < (this.summonMax || 4)) {
                        let p = new Pterodactyl('normal');
                        let side = (dino.x + dino.w/2) < (this.x + this.w/2) ? 1 : -1;
                        p.x = this.x + this.w/2 - p.w/2;
                        p.y = 236 + (this.summons % 4) * 16;
                        p.speedOverride = side * (gameSpeed * 1.55);
                        enemies.push(p);
                        this.summons++;
                    }
                    this.subTimer++;
                    if (this.summons >= (this.summonMax || 4) && this.subTimer > 80) {
                        this.state = 'hovering'; this.swoopTimer = 150; this.actionCooldown = 60;
                    }
                } else if (this.state === 'laser_prep') {
                    this.swoopTimer--;
                    if (this.swoopTimer <= 0) { this.state = 'laser_firing'; this.swoopTimer = PTERO_SWEEP_T; this.laserT = 0; }
                } else if (this.state === 'laser_firing') {
                    this.swoopTimer--; this.laserT = (this.laserT || 0) + 1;
                    // QUET mat dat: bat dau cach diem ngam 150px ve mot ben, ket thuc 150px ben kia
                    let u = Math.max(0, Math.min(1, this.laserT / PTERO_SWEEP_T));
                    this.targetX = (this.laserAim - PTERO_SWEEP) + (PTERO_SWEEP * 2) * u;
                    let bx = this.x; let by = this.y + 44; let tx = this.targetX; let ty = 320;
                    if (tx === bx) tx += 0.1;
                    let m = (ty - by) / (tx - bx); let checkX = dino.x + dino.w/2; let interceptY = by + m * (checkX - bx);
                    if (interceptY >= dino.y - 15 && interceptY <= dino.y + dino.h + 15) {
                        // Khien chi DO BINH THUONG — khong con keo tia lazer dinh vao khien nua
                        if (dino.isShielding()) { visualEffects.push(new Effect(parryX(), dino.y + dino.h/2, 'parry')); }
                        else { dino.takeDamage(1); }
                    }
                    if (this.swoopTimer <= 0) { this.state = 'returning'; }
                } else if (this.state === 'returning') {
                    let pcx = dino.x + dino.w/2, pdx = pcx - (this.x + this.w/2);
                    let retX = (pdx > 0 ? pcx - 360 : pcx + 360) - this.w/2; retX = Math.max(30, Math.min(canvas.width - this.w - 30, retX));
                    let dx = retX - this.x, dy = this.baseY - this.y, dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 15) { this.y = this.baseY; this.state = 'hovering'; this.swoopTimer = 150; this.actionCooldown = 60; } else { this.x += (dx/dist)*13; this.y += (dy/dist)*13; }
                }
            }
        }
// BOSS_PART_END s0.PteroBoss.1

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
