// BOSS_FILE: TriceratopsBoss
// BOSS_SNAPSHOT: 9124d003c3ce72e4e4fcae863db4e13cdfe06607527a4558945ab0774010859b
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossCornerWarn, bossHoldAnchor, bossProjectiles, canvas, checkAABB, ctx, dino, frames, parry, parryX, shakeTimer, visualEffects
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

// Nguồn: index.html:284 · Dùng bởi: TriceratopsBoss
// BOSS_PART_BEGIN s0.drawDesertTriceratops.1 EDITABLE
function drawDesertTriceratops(b){
            const dir=b.oDir||-1,charge=/charging|dash_sweep/.test(b.state),low=charge||b.state==='sweep_wait'?7:0;
            const walk=/entering|return|charging/.test(b.state),g=frames*(charge?.45:.18),breath=Math.sin(frames*.055);
            const P={edge:'#172f28',dark:'#284638',body:'#427258',lit:'#6e9470',belly:'#a5ab7d',frill:'#315f51',bone:'#e5ce9b'};
            const poly=(p,c,e=true)=>desertBossPoly(p,c,e?P.edge:null,1.8);
            ctx.save();ctx.translate(b.x+(dir>0?b.w:0),b.y);ctx.scale((dir>0?-1:1)*b.w/128,b.h/80);
            poly([[95,42],[111,43],[126,51],[135,50],[128,56],[114,56],[98,52]],P.dark);
            const leg=(x,back,phase)=>{
                const swing=walk?Math.sin(g+phase)*3:0,lift=walk?Math.max(0,Math.cos(g+phase))*4:0;
                poly([[x-8,51],[x+8,50],[x+12,61],[x+6+swing,70-lift],[x+7+swing,78-lift],[x-11+swing,80-lift],[x-14+swing,76-lift],[x-8+swing,69-lift],[x-11,60]],back?P.dark:P.body);
                if(!back){poly([[x-6,54],[x+3,54],[x+5,62],[x,70-lift],[x-6,68-lift]],P.lit,false);for(let k=0;k<3;k++)poly([[x-12+swing+k*5,76-lift],[x-14+swing+k*5,79-lift],[x-9+swing+k*5,79-lift]],P.bone,false);}
            };
            leg(65,true,Math.PI);leg(104,true,0);
            poly([[37,38],[52,28+breath],[73,23+breath],[95,26+breath],[111,36],[116,50],[109,61],[88,66],[61,65],[40,57]],P.body);
            poly([[48,37],[65,28+breath],[88,28+breath],[105,36],[107,40],[80,35],[56,43]],P.lit,false);
            poly([[45,52],[69,58],[99,56],[109,51],[106,61],[87,65],[59,62]],P.belly,false);
            for(let i=0;i<5;i++){const x=56+i*10;poly([[x,35],[x+5,34],[x+8,43],[x+4,47],[x,42]],P.dark,false);}
            leg(48,false,0);leg(91,false,Math.PI);
            ctx.save();ctx.translate(0,low);
            // The frill is a thick radial shield, carried behind the head.
            poly([[38,49],[24,29],[25,9],[36,-4],[53,-8],[69,0],[79,17],[76,36],[62,52]],P.dark);
            poly([[41,44],[30,28],[31,11],[40,2],[53,-2],[64,5],[72,19],[69,33],[59,44]],P.frill);
            for(const [x,y] of [[29,8],[35,-1],[47,-6],[60,-3],[71,7],[77,21],[73,34]])poly([[x-3,y+3],[x,y-5],[x+4,y+3]],P.bone);
            for(const [x,y] of [[33,12],[42,3],[56,2],[67,13],[69,28]])desertBossLine([[50,39],[x,y]],'#6b9476',2);
            poly([[44,23],[29,18],[16,24],[7,34],[9,47],[21,53],[42,47],[52,34]],P.body);
            poly([[28,24],[40,26],[43,34],[31,39],[18,38],[13,33]],P.lit,false);
            poly([[12,34],[5,36],[1,44],[5,49],[10,43],[19,44],[21,40]],'#70624a');
            for(const [x,y,L,ang] of [[30,20,41,-2.84],[42,27,43,-2.78],[14,34,22,-2.8]]){
                const tip=[x+Math.cos(ang)*L,y+Math.sin(ang)*L];poly([[x+2,y+5],[x-4,y-2],tip,[x+4,y-1]],P.bone);desertBossLine([[x,y-2],tip],'#fff1ce',1.3);
            }
            ctx.fillStyle=P.edge;ctx.fillRect(25,31,8,4);ctx.fillStyle=charge?'#ffd45b':'#e6ab50';ctx.fillRect(26,32,5,2);
            ctx.restore();ctx.restore();
        }
// BOSS_PART_END s0.drawDesertTriceratops.1

// Nguồn: index.html:948 · Dùng bởi: TriceratopsBoss
// BOSS_PART_BEGIN s0.TriceratopsBoss.1 EDITABLE
class TriceratopsBoss {
            constructor(level) {
                this.hp = 100; this.maxHp = 100;
                this.w = 128; this.h = 80; this.baseX = canvas.width - 180; this.baseY = 320 - this.h;
                this.x = canvas.width; this.y = this.baseY; this.state = 'entering'; this.actionTimer = 120; this.name = "TRICERATOPS BOSS"; this.subStateTimer = 0; this.lastMeleeHit = -1; this.lastSkill = ''; this.burnTimer = 0; this.oDir = -1; this._homeSide = 1; this.skillIdx = 0; this.actionCooldown = 0; this.refDist = 0;
            }
            draw() {
                let x=this.x,y=this.y;ctx.save();
                drawDesertTriceratops(this);

                if (this.state === 'sweep_wait') {
                    ctx.fillStyle = (frames % 6 < 3) ? "rgba(255, 0, 0, 0.4)" : "transparent"; 
                    ctx.fillRect(x - 100, y + 40, 100 + this.w, 40); 
                } else if (this.state === 'sweep_attack') {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; 
                    ctx.fillRect(x - 100, y + 40, 100 + this.w, 40); 
                }
                ctx.restore();
                if (this.state === 'slam_up' || this.state === 'slam_hover' || this.state === 'slam_down') {
                    ctx.fillStyle = (frames % 6 < 3) ? "rgba(255, 0, 0, 0.4)" : "transparent"; ctx.fillRect(0, 310, canvas.width, 10);
                }
                // ctx.fillStyle = "black"; ctx.fillRect(x, y - 20, this.w, 8); ctx.fillStyle = "#FFD54F"; ctx.fillRect(x + 1, y - 19, (this.w - 2) * (this.hp / this.maxHp), 6);
            }
            update() {
                if (this.state === 'entering') { this.x -= 4; if (this.x <= this.baseX) { this.x = this.baseX; this.state = 'idle'; this.refDist = Math.max(Math.round(canvas.width * 0.5), Math.min(Math.round(canvas.width * 0.6), Math.abs((dino.x + dino.w/2) - (this.x + this.w/2)))); } }
                else if (this.state === 'idle') {
                    this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    bossHoldAnchor(this);
                    this.actionTimer--;
                    if (bossCornerWarn(this, 360, this.actionCooldown <= 0)) { this.state = 'charging'; this.chgDir = this.oDir; this.chargePass = 1; this.actionCooldown = 90; }
                    else if (!this.cornerWarn && this.actionTimer <= 0 && this.actionCooldown <= 0) {
                        let seq = ['dash_sweep', 'slam', 'charging']; let sk = seq[(this.skillIdx || 0) % seq.length]; this.skillIdx = ((this.skillIdx || 0) + 1) % seq.length;
                        if (sk === 'charging') { this.state = 'charging'; this.chgDir = this.oDir; this.chargePass = 1; }
                        else if (sk === 'dash_sweep') { this.state = 'dash_sweep'; this.swpDir = this.oDir; }
                        else { this.state = 'slam_up'; this.subStateTimer = 0; }
                    }
                    if (this.actionCooldown > 0) this.actionCooldown--;
                } else if (this.state === 'charging') {
                    this.oDir = this.chgDir; this.x += 18 * (this.chgDir || -1);
                    if (frames % 4 === 0) visualEffects.push(new Effect(this.chgDir > 0 ? this.x + this.w + 10 : this.x - 15, this.y + 30, 'charge_wave', this.chgDir > 0));
                    if (checkAABB(dino, this)) {
                        if (dino.isShielding()) { visualEffects.push(new Effect(parryX(), dino.y, 'parry')); this.state = 'charge_recoil'; this.retDir = this.chgDir; this.subStateTimer = 20; shakeTimer = 12; }
                        else dino.takeDamage(1);
                    }
                    if (this.state === 'charging') {
                        if ((this.chgDir < 0 && this.x <= 8) || (this.chgDir > 0 && this.x >= canvas.width - this.w - 8)) {
                            this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
                            if ((this.chargePass || 1) < 2) { this.chargePass = 2; this.chgDir = -this.chgDir; this.state = 'charge_turn'; this.subStateTimer = 12; }
                            else { this.chargePass = 1; this.state = 'returning'; }
                        }
                    }
                } else if (this.state === 'charge_turn') {
                    this.oDir = this.chgDir; this.subStateTimer--;
                    if (this.subStateTimer <= 0) this.state = 'charging';
                } else if (this.state === 'charge_recoil') {
                    this.oDir = -this.retDir; this.x -= 13 * (this.retDir || -1);
                    if (frames % 5 === 0) visualEffects.push(new Effect(this.retDir > 0 ? this.x - 15 : this.x + this.w + 10, this.y + 30, 'charge_wave', this.retDir <= 0));
                    this.subStateTimer--;
                    if (this.subStateTimer <= 0 || this.x <= 8 || this.x >= canvas.width - this.w - 8) {
                        this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
                        this.chgDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1; this.chargePass = 1; this.state = 'charging';
                    }
                } else if (this.state === 'retreat_out') {
                    this.x += 22 * (this.retDir || -1);
                    if (this.x < -this.w - 30 || this.x > canvas.width + 30) { this.retDir = (this.retDir > 0) ? -1 : 1; this.x = this.retDir > 0 ? canvas.width + this.w : -this.w * 2; this.state = 'retreat_in'; }
                } else if (this.state === 'retreat_in') {
                    this.x += (this.retDir > 0 ? -1 : 1) * 16;
                    let target = this.retDir > 0 ? canvas.width - this.w - 40 : 40;
                    if ((this.retDir > 0 && this.x <= target) || (this.retDir <= 0 && this.x >= target)) { this.x = target; this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1; this.state = 'idle'; this.actionTimer = 30; this.actionCooldown = 30; }
                } else if (this.state === 'dash_sweep') {
                    this.x += 16 * (this.swpDir || -1); this.oDir = this.swpDir || -1;
                    if (frames % 4 === 0) visualEffects.push(new Effect(this.swpDir > 0 ? this.x + this.w + 15 : this.x - 15, this.y + 30, 'charge_wave', this.swpDir > 0));
                    let _past = (this.swpDir > 0 && this.x + this.w >= dino.x) || (this.swpDir <= 0 && this.x <= dino.x + dino.w);
                    if (Math.abs((this.x + this.w/2) - (dino.x + dino.w/2)) <= 120 || _past || this.x < 8 || this.x > canvas.width - this.w - 8) {
                        this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x));
                        this.state = 'sweep_wait'; this.subStateTimer = 30;
                    }
                } else if (this.state === 'sweep_wait') {
                    this.subStateTimer--;
                    if (this.subStateTimer <= 0) { this.state = 'sweep_attack'; this.subStateTimer = 15; shakeTimer = 10; }
                } else if (this.state === 'sweep_attack') {
                    this.subStateTimer--;
                    if (checkAABB(dino, {x: this.oDir < 0 ? this.x - 100 : this.x, y: this.y + 40, w: 100 + this.w, h: 40})) { if (dino.isShielding()) visualEffects.push(new Effect(parryX(), dino.y, 'parry')); else dino.takeDamage(1); }
                    if (this.subStateTimer <= 0) { this.state = 'returning'; }
                } else if (this.state === 'returning_place' || this.state === 'returning') {
                    let _dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    this.x -= Math.sign(_dx || 1) * 14; this.x = Math.max(30, Math.min(canvas.width - this.w - 30, this.x));
                    if (Math.abs(_dx) > (this.refDist || 560) - 40 || this.x <= 30 || this.x >= canvas.width - this.w - 30) { this.state = 'idle'; this.actionTimer = 120; this.actionCooldown = 40; }
                } else if (this.state === 'slam_up') {
                    this.y -= 25;
                    if (this.y <= 10) { this.state = 'slam_hover'; this.subStateTimer = 30; }
                } else if (this.state === 'slam_hover') {
                    this.subStateTimer--;
                    if (this.subStateTimer <= 0) { this.state = 'slam_down'; }
                } else if (this.state === 'slam_down') {
                    this.y += 30;
                    if (this.y >= this.baseY) {
                        this.y = this.baseY; this.state = 'idle'; this.actionTimer = 120; this.actionCooldown = 40; shakeTimer = 25;
                        if (dino.grounded) {
                            if (!dino.isShielding()) dino.takeDamage(1);
                            else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                        }
                        bossProjectiles.push(new BossProjectile(this.x - 10, 260, -12, 0, true, 1)); bossProjectiles.push(new BossProjectile(this.x + this.w - 6, 260, 12, 0, true, 1));
                    }
                }
            }
        }
// BOSS_PART_END s0.TriceratopsBoss.1

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
