// BOSS_FILE: SpinoBoss
// BOSS_SNAPSHOT: 90b44e51b8a8c0ad12fba495a59e199c399e173aab86fbee147786ba09666942
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossCornerWarn, bossHoldAnchor, bossProjectiles, canvas, checkAABB, ctx, dino, frames, parry, parryX, visualEffects
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

// Nguồn: index.html:317 · Dùng bởi: SpinoBoss
// BOSS_PART_BEGIN s0.drawDesertSpino.1 EDITABLE
function drawDesertSpino(b){
            const spin=/^spin_(dash|bounce|wait)/.test(b.state),dir=b.oDir||-1,bite=b.state==='biting',reach=bite?-36:0;
            const move=/dash|return|enter/.test(b.state),g=frames*.3,bob=Math.sin(frames*.06)*.7;
            const P={edge:'#1b292c',dark:'#2b4449',body:'#476a70',lit:'#779799',belly:'#bac0a0',sail:'#a54e35',rib:'#dc9a5f',bone:'#e9d5aa'};
            const poly=(p,c,e=true)=>desertBossPoly(p,c,e?P.edge:null,1.8);
            ctx.save();ctx.translate(b.x+b.w/2,b.y+b.h/2);if(spin)ctx.rotate(frames*.8);else if(dir>0)ctx.scale(-1,1);ctx.scale(b.w/140,b.h/90);ctx.translate(-70-(bite?24:0),-45);
            poly([[96,50],[114,48],[135,51],[153,47],[164,40],[158,52],[140,61],[117,64],[99,60]],P.body);
            poly([[113,53],[137,55],[153,51],[140,58],[118,61]],P.lit,false);
            const leg=(x,back)=>{const wave=move?Math.sin(g+(back?Math.PI:0))*4:0,lift=move?Math.max(0,Math.cos(g+(back?Math.PI:0)))*4:0;
                poly([[x-11,51],[x+10,51],[x+15,59],[x+3,70],[x+13+wave,79-lift],[x+12+wave,87-lift],[x-13+wave,90-lift],[x-19+wave,87-lift],[x+3+wave,83-lift],[x+3+wave,79-lift],[x-10,70],[x-14,61]],back?P.dark:P.body);
                if(!back){poly([[x-8,54],[x+5,54],[x+9,60],[x,68],[x-9,64]],P.lit,false);for(let i=0;i<3;i++)poly([[x-15+wave+i*5,86-lift],[x-20+wave+i*5,90-lift],[x-12+wave+i*5,89-lift]],P.bone,false);}};
            leg(91,true);
            poly([[40,37],[45,20],[55,4],[65,-4],[75,-1],[87,9],[101,35]],P.sail);
            poly([[46,33],[57,10],[66,2],[75,5],[88,20],[96,34]],'#c57043',false);
            for(const [x,y] of [[46,21],[56,6],[66,-3],[76,0],[87,10],[97,26]])desertBossLine([[x-3,43],[x,y]],P.rib,1.7);
            poly([[35,33+bob],[54,30+bob],[80,32+bob],[103,41],[110,52],[100,65],[69,67],[48,60],[35,49]],P.body);
            poly([[40,44],[58,47],[73,57],[95,59],[103,55],[96,63],[69,65],[48,56]],P.belly,false);
            for(let i=0;i<5;i++)poly([[52+i*9,34],[57+i*9,35],[56+i*9,47],[52+i*9,49]],P.dark,false);
            leg(70,false);
            // The body leans into the 60px bite; the remaining reach comes from
            // the neck, keeping the attack readable without a long pipe-like neck.
            poly([[46,33],[34,30],[30+reach*.5,24],[35+reach,24],[27+reach,26],[31+reach,38],[25+reach*.4,42],[39,53],[51,49]],P.body);
            poly([[44,47],[31+reach,34],[28+reach,37],[25+reach*.4,41],[40,51]],P.lit,false);
            poly([[44,46],[47,51],[39,59],[29,59],[28,56],[36,55],[40,49]],P.body);
            for(let i=0;i<3;i++)poly([[29+i*3,56],[26+i*3,62],[32+i*3,59]],P.bone,false);
            ctx.save();ctx.translate(reach,bob);
            poly([[0,18],[23,15],[31,11],[41,16],[44,26],[36,34],[3,30],[-4,26]],P.body);
            poly([[1,19],[24,18],[29,14],[36,15],[33,20],[4,23]],P.lit,false);
            poly([[-2,27],[35,27],[39,31],[9,34+bite*12],[0,31+bite*12]],'#291b1b',false);
            ctx.save();ctx.translate(36,29);ctx.rotate(bite?-.38:-.03);
            poly([[-37,0],[-5,-1],[4,3],[-4,9],[-29,9],[-38,4]],P.body);
            poly([[-33,4],[-7,5],[-2,7],[-29,8]],P.belly,false);
            for(let i=0;i<7;i++)poly([[-34+i*4.6,0],[-32+i*4.6,-3],[-30+i*4.6,0]],P.bone,false);ctx.restore();
            for(let i=0;i<8;i++)poly([[i*4.6,27],[3+i*4.6,27],[1+i*4.6,31]],P.bone,false);
            ctx.fillStyle=P.edge;ctx.fillRect(2,21,4,2);ctx.fillRect(28,18,9,4);ctx.fillStyle='#edba53';ctx.fillRect(29,19,6,2);
            ctx.restore();ctx.restore();
        }
// BOSS_PART_END s0.drawDesertSpino.1

// Nguồn: index.html:1056 · Dùng bởi: SpinoBoss
// BOSS_PART_BEGIN s0.SpinoBoss.1 EDITABLE
class SpinoBoss {
            constructor(level) {
                this.hp = 100; this.maxHp = 100;
                this.w = 140; this.h = 90; this.baseX = canvas.width - 180; this.baseY = 320 - this.h;
                this.x = canvas.width; this.y = this.baseY; this.state = 'entering'; this.actionTimer = 65; this.name = "SPINOSAURUS"; this.subStateTimer = 0; this.lastMeleeHit = -1;
                this.shootReps = 0; this.lastSkill = ''; this.burnTimer = 0; this.oDir = -1; this.actionCd = 0; this.mDir = -1;
            }
            draw() {
                let x=this.x,y=this.y;
                drawDesertSpino(this);

                if (this.state === 'biting_prep') { ctx.fillStyle="rgba(255,0,0,0.5)"; ctx.fillRect((this.mDir < 0 ? x-60 : x+this.w-20), y, 80, 50); }
                if (this.state === 'tail_prep' || this.state === 'tail_whip') { ctx.fillStyle = this.state === 'tail_whip' ? "rgba(255,255,255,0.75)" : "rgba(255,0,0,0.5)"; ctx.fillRect((this.mDir < 0 ? x-80 : x+this.w-20), y+40, 100, 50); }
                
                if (this.state === 'stunned') {
                    ctx.save();
                    ctx.translate(x + this.w/2, y - 20);
                    ctx.fillStyle = "yellow";
                    ctx.font = "bold 24px Consolas, monospace";
                    ctx.fillText("STUNNED!", -40 + Math.random()*4, 0 + Math.random()*4);
                    ctx.restore();
                }

                // ctx.fillStyle = "black"; ctx.fillRect(x+10, y - 20, this.w-20, 8); ctx.fillStyle = "#FF7043"; ctx.fillRect(x + 11, y - 19, (this.w - 22) * (this.hp / this.maxHp), 6);
            }
            update() {
                if (this.state === 'entering') { this.x -= 6; if (this.x <= this.baseX) { this.x = this.baseX; this.state = 'idle'; this.refDist = Math.max(Math.round(canvas.width*0.5), Math.min(Math.round(canvas.width*0.64), Math.abs((dino.x+dino.w/2)-(this.x+this.w/2)))); } }
                else if (this.state === 'idle') {
                    this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    bossHoldAnchor(this);
                    if (this.actionCd > 0) this.actionCd--;
                    this.actionTimer--;
                    if (bossCornerWarn(this, 380, this.actionCd <= 0)) { this.state = 'spin_prep'; this.subStateTimer = 26; this.actionCd = 90; }
                    else if (!this.cornerWarn && this.actionTimer <= 0) {
                        let seq = ['shoot', 'combo', 'spin']; let sk = seq[(this.skillIdx || 0) % seq.length]; this.skillIdx = ((this.skillIdx || 0) + 1) % seq.length;
                        if (sk === 'combo') { this.state = 'dash_in'; }
                        else if (sk === 'spin') { this.state = 'spin_prep'; this.subStateTimer = 26; }
                        else { this.state = 'shoot_prep'; this.shootReps = 0; this.subStateTimer = 0; }
                    }
                } else if (this.state === 'dash_in') {
                    this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1; this.x += 13 * this.oDir;
                    if (frames % 4 === 0) visualEffects.push(new Effect(this.oDir < 0 ? this.x - 10 : this.x + this.w + 10, this.y + 40, 'charge_wave', this.oDir > 0));
                    if (Math.abs((this.x + this.w/2) - (dino.x + dino.w/2)) <= 90 || this.x < 8 || this.x > canvas.width - this.w - 8) { this.mDir = this.oDir; this.state = 'biting_prep'; this.subStateTimer = 24; }
                } else if (this.state === 'biting_prep') {
                    this.subStateTimer--; if (this.subStateTimer <= 0) { this.state = 'biting'; this.subStateTimer = 12; }
                } else if (this.state === 'biting') {
                    this.subStateTimer--;
                    let hb = this.mDir < 0 ? {x: this.x-60, y: this.y, w: 80, h: 50} : {x: this.x+this.w-20, y: this.y, w: 80, h: 50};
                    if (checkAABB(dino, hb)) { if (dino.isShielding()) visualEffects.push(new Effect(parryX(), dino.y, 'parry')); else dino.takeDamage(1); }
                    if (this.subStateTimer <= 0) { this.state = 'wait_tail'; this.subStateTimer = 40; }
                } else if (this.state === 'wait_tail') {
                    this.subStateTimer--; if (this.subStateTimer <= 0) { this.state = 'tail_prep'; this.subStateTimer = 26; }
                } else if (this.state === 'tail_prep') {
                    this.subStateTimer--; if (this.subStateTimer <= 0) { this.state = 'tail_whip'; this.subStateTimer = 12; }
                } else if (this.state === 'tail_whip') {
                    this.subStateTimer--;
                    let hb = this.mDir < 0 ? {x: this.x-80, y: this.y+40, w: 100, h: 50} : {x: this.x+this.w-20, y: this.y+40, w: 100, h: 50};
                    if (checkAABB(dino, hb)) { if (dino.isShielding()) visualEffects.push(new Effect(parryX(), dino.y, 'parry')); else dino.takeDamage(1); }
                    if (this.subStateTimer <= 0) { this.state = 'returning'; }
                } else if (this.state === 'spin_prep') {
                    this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    this.subStateTimer--; if (this.subStateTimer <= 0) { this.spinDir = this.oDir; this.state = 'spin_dash_1'; }
                } else if (this.state === 'spin_dash_1') {
                    this.oDir = this.spinDir; this.x += 22 * this.spinDir;
                    if (frames % 3 === 0) visualEffects.push(new Effect(this.spinDir > 0 ? this.x + this.w : this.x, this.y + 40, 'charge_wave', this.spinDir > 0));
                    if (checkAABB(dino, this) && !dino.isShielding()) dino.takeDamage(1);
                    if (this.x < -this.w - 40 || this.x > canvas.width + 40) { this.state = 'spin_dash_return'; }
                } else if (this.state === 'spin_bounce_back') {
                    // Bi PARRY -> bat LUI XA ra gan mep map (du thoi gian hoi khien de parry cu lao thu 2)
                    let _pcx = dino.x + dino.w/2, _dir = (this.x + this.w/2) < _pcx ? -1 : 1;
                    this.x += _dir * 17;
                    if (frames % 3 === 0) visualEffects.push(new Effect(_dir > 0 ? this.x + this.w : this.x, this.y + 40, 'charge_wave', _dir > 0));
                    if (this.x <= 34 || this.x >= canvas.width - this.w - 34 || Math.abs((this.x + this.w/2) - _pcx) > 560) { this.state = 'spin_wait'; this.subStateTimer = 60; }
                } else if (this.state === 'spin_wait') {
                    this.subStateTimer--; if (this.subStateTimer <= 0) { this.spinDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1; this.state = 'spin_dash_2'; }
                } else if (this.state === 'spin_dash_2') {
                    this.oDir = this.spinDir; this.x += 24 * this.spinDir;
                    if (frames % 3 === 0) visualEffects.push(new Effect(this.spinDir > 0 ? this.x + this.w : this.x, this.y + 40, 'charge_wave', this.spinDir > 0));
                    if (checkAABB(dino, this) && !dino.isShielding()) dino.takeDamage(1);
                    if (this.x < -this.w - 40 || this.x > canvas.width + 40) { this.state = 'spin_dash_return'; }
                } else if (this.state === 'spin_dash_return') {
                    let pcx = dino.x + dino.w/2, tgt = pcx < canvas.width/2 ? Math.min(canvas.width - this.w - 30, pcx + (this.refDist || 620) - this.w/2) : Math.max(30, pcx - (this.refDist || 620) - this.w/2);
                    this.x += Math.sign(tgt - this.x) * 18;
                    if (Math.abs(this.x - tgt) <= 18) { this.x = tgt; this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1; this.state = 'idle'; this.actionTimer = 65; }
                } else if (this.state === 'stunned_return') {
                    let pcx = dino.x + dino.w/2, tgt = pcx < canvas.width/2 ? Math.min(canvas.width - this.w - 30, pcx + (this.refDist || 620) - this.w/2) : Math.max(30, pcx - (this.refDist || 620) - this.w/2);
                    this.x += Math.sign(tgt - this.x) * 14;
                    if (Math.abs(this.x - tgt) <= 14) { this.x = tgt; this.state = 'stunned'; this.subStateTimer = 90; }
                } else if (this.state === 'stunned') {
                    this.subStateTimer--; if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 65; }
                } else if (this.state === 'returning') {
                    let _dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    this.x -= Math.sign(_dx || 1) * 16; this.x = Math.max(30, Math.min(canvas.width - this.w - 30, this.x));
                    if (Math.abs(_dx) > (this.refDist || 620) - 60 || this.x <= 30 || this.x >= canvas.width - this.w - 30) { this.state = 'idle'; this.actionTimer = 65; }
                } else if (this.state === 'shoot_prep') {
                    this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1; this.subStateTimer++; if (this.subStateTimer >= 20) { this.state = 'shooting'; this.subStateTimer = 0; }
                } else if (this.state === 'shooting') {
                    this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    let sx = this.oDir < 0 ? this.x : this.x + this.w, sy = this.y + 40, tx = dino.x + dino.w/2, ty = dino.y + dino.h/2;
                    let mk = (oy) => { let dx = tx - sx, dy = (ty + oy) - sy, d = Math.hypot(dx, dy) || 1, sp = 11; let p = new BossProjectile(sx, sy, dx/d*sp, dy/d*sp, false, 1); if (this.shootReps === 2) p.isPiercing = true; return p; };
                    bossProjectiles.push(mk(0), mk(-34));
                    this.shootReps++;
                    if (this.shootReps >= 3) { this.state = 'idle'; this.actionTimer = 90; }
                    else { this.state = 'shoot_wait'; this.subStateTimer = 30; }
                } else if (this.state === 'shoot_wait') {
                    this.subStateTimer--; if (this.subStateTimer <= 0) this.state = 'shooting';
                }
            }
        }
// BOSS_PART_END s0.SpinoBoss.1

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
