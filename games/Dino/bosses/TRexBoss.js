// BOSS_FILE: TRexBoss
// BOSS_SNAPSHOT: 90b44e51b8a8c0ad12fba495a59e199c399e173aab86fbee147786ba09666942
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossCornerWarn, bossHoldAnchor, bossProjectiles, canvas, checkAABB, ctx, dino, frames, parry, parryX, shakeTimer, visualEffects
// Nguồn: index.html:779 · Dùng bởi: TRexBoss, TyrantRexBoss
// BOSS_PART_BEGIN s0.drawRexBossBody.1 READ_ONLY
function drawRexBossBody(b, tyrant=false, offsetX=0){
            const dir=tyrant?b.dir():(b.oDir||-1),enraged=tyrant&&b.phase===2;
            const P=tyrant
                ? {edge:'#241211',dark:'#48251f',body:enraged?'#a32d24':'#82402c',light:enraged?'#c65b36':'#b06a3e',belly:'#b99063',stripe:'#48251f',bone:'#d7b483',eye:enraged?'#ffdd84':'#ff8f35'}
                : {edge:'#49241d',dark:'#9b3c25',body:'#e36a31',light:'#f79d4e',belly:'#f3cb85',stripe:'#b14728',bone:'#ffe4b0',eye:'#ffe76d'};
            const rush=/^(dashing|huc|retreat_out|retreat_in)$/.test(b.state);
            const moving=rush||(tyrant?/^(entering|returning|idle)$/:/^(entering|returning|retreat_out|retreat_in)$/).test(b.state);
            const gait=tyrant?(b.chan||0)*2:frames*(rush?.52:.24);
            const stride=moving?(rush?1:.55):0,breath=Math.sin(frames*.075)*.65;
            const bob=breath+(rush?Math.abs(Math.sin(gait))*1.4:0);
            const jaw=tyrant?.12+.88*Math.max(0,Math.min(1,b.ham||0)):(b.state==='shooting'?.55+Math.sin(frames*.35)*.12:0);
            const tail=(tyrant?(b.duoi||0)*-.38:0)+Math.sin(frames*.065)*.035;
            const poly=(points,fill,outline=true)=>{
                ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);
                for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);
                ctx.closePath();ctx.fillStyle=fill;ctx.fill();
                if(outline){ctx.strokeStyle=P.edge;ctx.lineWidth=1.8;ctx.stroke();}
            };
            const leg=(back)=>{
                const wave=Math.sin(gait+(back?Math.PI:0))*stride,lift=Math.max(0,-Math.cos(gait+(back?Math.PI:0)))*stride*5;
                const hip=back?79:64,knee=hip-10+wave*6,hock=hip+8-wave*3;
                const hy=75-lift*.5,fy=86-lift,bulk=tyrant?17:14;
                // A broad hip/thigh feeds a forward knee, then a heavy calf
                // folds back to the raised hock. Only the toes rest on the floor.
                poly([[hip-bulk,46+bob],[hip+9,45+bob],[hip+15,50+bob],[hip+14,58+bob],[knee+10,67],[hock+8,hy-1],[hock+7,fy-2],[hock+2,fy],[hock-8,fy-2],[hock-7,hy+3],[knee-7,69],[knee-11,63],[hip-bulk-1,55+bob]],back?P.dark:P.body);
                if(!back){
                    poly([[hip-10,49+bob],[hip+5,48+bob],[hip+9,53+bob],[hip+6,59],[knee+5,65],[knee-5,65],[hip-12,57+bob]],P.light,false);
                    poly([[hip+8,50+bob],[hip+13,53+bob],[hip+10,59],[knee+8,66],[knee+3,66],[hip+5,58]],P.stripe,false);
                    poly([[knee-4,67],[knee+5,65],[hock+4,hy],[hock+1,hy+5],[hock-4,hy+3],[knee-3,70]],P.light,false);
                    poly([[knee-8,63],[knee+1,61],[knee+5,65],[knee+2,69],[knee-6,68]],P.body);
                }
                // Thick ankle scales and three separate, splayed clawed toes.
                for(let i=0;i<3;i++){ctx.fillStyle=back?P.edge:P.stripe;ctx.fillRect(hock-5,hy+3+i*2,10,1);}
                poly([[hock-6,fy-6],[hock+6,fy-6],[hock+10,fy-1],[hock+7,fy+2],[hock-8,fy+2],[hock-15,fy-1]],back?P.dark:P.body);
                for(let i=0;i<3;i++){
                    const y=fy-4+i*2,tip=hock-23-(i===1?6:0);
                    poly([[hock-3,y-2],[hock-13,y-2],[tip+4,y-1],[tip,y+2],[hock-11,y+2],[hock+1,y+1]],back?P.dark:(i===1?P.body:P.light));
                    poly([[tip+5,y-1],[tip,y],[tip-3,y+2],[tip+5,y+2]],back?'#947452':P.bone,false);
                }
            };
            ctx.save();ctx.translate(b.x+offsetX+(dir>0?b.w:0),b.y);ctx.scale((dir>0?-1:1)*b.w/112,b.h/88);
            ctx.lineJoin='miter';ctx.lineCap='square';
            // A tapered, raised counterweight tail, rather than a rectangular stub.
            ctx.save();ctx.translate(82,43+bob);ctx.rotate(tail);
            poly([[-7,-7],[9,-6],[22,0],[36,1],[51,-4],[48,1],[36,7],[21,9],[8,5],[-7,5]],P.body);
            poly([[1,1],[13,2],[24,6],[36,5],[47,0],[35,7],[21,8],[8,4]],P.dark,false);
            ctx.fillStyle=P.stripe;ctx.fillRect(17,0,4,5);ctx.fillRect(29,2,3,4);ctx.restore();
            leg(true);
            // Rib cage, heavy pelvis and an S-shaped neck under the large skull.
            poly(tyrant?[[37,22+bob],[47,20+bob],[57,27+bob],[69,24+bob],[86,29+bob],[96,38+bob],[96,52+bob],[84,64+bob],[62,65+bob],[49,59+bob],[40,49+bob],[33,39+bob]]:[[38,22+bob],[47,24+bob],[52,29+bob],[69,27+bob],[84,31+bob],[93,39+bob],[92,52+bob],[82,62+bob],[62,64+bob],[49,59+bob],[42,49+bob],[34,41+bob]],P.body);
            poly([[36,35+bob],[43,39+bob],[48,49+bob],[59,56+bob],[77,57+bob],[84,54+bob],[78,61+bob],[62,62+bob],[49,56+bob],[40,46+bob]],P.belly,false);
            poly([[49,30+bob],[68,29+bob],[83,33+bob],[86,37+bob],[68,34+bob],[52,36+bob]],P.light,false);
            for(let i=0;i<4;i++){
                const x=53+i*8;
                poly([[x,30+bob],[x+5,29+bob],[x+4,40+bob],[x,45+bob],[x+1,36+bob]],P.stripe,false);
            }
            // Small skin scales, not a row of stegosaur plates.
            ctx.fillStyle=P.dark;
            for(const [x,y] of [[52,42],[59,46],[76,43],[83,48],[55,51],[73,52],[88,40]])ctx.fillRect(x,y+bob,2,2);
            if(tyrant){
                // Knotted neck muscles, low bony scutes and healed flank gashes.
                poly([[37,25+bob],[43,23+bob],[51,32+bob],[49,42+bob],[43,46+bob],[39,37+bob]],P.dark,false);
                for(let i=0;i<5;i++){const x=53+i*8,y=27+(i%2)*2+bob;poly([[x-2,y+2],[x,y-2],[x+4,y-3],[x+6,y+3]],P.dark);}
                ctx.strokeStyle='#c68d68';ctx.lineWidth=1.2;
                for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(78+i*4,38+bob);ctx.lineTo(75+i*4,45+bob);ctx.stroke();}
            }
            leg(false);
            // Short two-finger arms curl in against the chest.
            poly([[43,40+bob],[49,43+bob],[46,49+bob],[39,50+bob],[37,46+bob],[41,47+bob],[43,45+bob]],P.dark);
            poly([[44,39+bob],[48,41+bob],[44,47+bob],[37,47+bob],[35,44+bob],[39,45+bob],[42,43+bob]],P.body);
            ctx.fillStyle=P.bone;ctx.fillRect(34,43+bob,2,3);ctx.fillRect(37,45+bob,2,3);
            ctx.save();ctx.translate(0,bob);
            if(tyrant){ctx.translate(37,29);ctx.scale(1.12,1.1);ctx.translate(-37,-29);}
            // Deep skull, a muscular cheek and a separate hinged lower jaw.
            poly([[3,10],[10,7],[24,7],[29,4],[39,5],[44,12],[43,28],[37,35],[20,34],[7,29],[2,24]],P.dark);
            poly([[4,11],[23,9],[29,7],[38,8],[41,14],[39,25],[32,29],[8,27],[3,23]],P.body,false);
            poly([[5,11],[24,9],[29,7],[38,8],[37,12],[22,13],[5,15]],P.light,false);
            poly([[29,20],[38,17],[39,25],[34,30],[25,29]],P.stripe,false);
            // Mouth cavity remains dark even when the upper and lower teeth overlap.
            poly([[5,25],[33,25],[39,30],[34,37+jaw*10],[9,34+jaw*12]],tyrant?'#210d0e':'#411b1b',false);
            if(jaw>.4){ctx.fillStyle=enraged?'#ffad45':'#bb6250';ctx.fillRect(11,32+jaw*8,19,3);}
            ctx.save();ctx.translate(37,29);ctx.rotate(-jaw*.62);
            poly(tyrant?[[3,-2],[-33,0],[-33,7],[-27,14],[-7,14],[5,6]]:[[2,-1],[-32,0],[-32,5],[-26,11],[-8,12],[3,5]],P.body);
            poly(tyrant?[[-30,8],[-25,11],[-8,11],[2,7],[-3,12],[-8,14],[-27,12]]:[[-29,5],[-24,8],[-8,9],[1,4],[-3,9],[-8,12],[-26,10]],P.belly,false);
            ctx.fillStyle=P.bone;
            for(let i=0;i<5;i++)poly([[-29+i*5,1],[-27+i*5,tyrant?-(3+i%3):-3],[-25+i*5,1]],P.bone,false);
            ctx.restore();
            for(let i=0;i<(tyrant?7:6);i++){const x=5+i*(tyrant?4.2:5),tooth=tyrant?[4,6,4,7,5,6,3][i]:4+i%2;poly([[x,25],[x+3.8,25],[x+1.1,25+tooth]],P.bone,false);}
            ctx.fillStyle=P.edge;ctx.fillRect(7,18,4,2);
            // Sunken eye under a projecting brow; the giant has scarred bone ridges.
            poly([[24,14],[31,12],[37,14],[35,20],[26,21]],P.edge,false);
            if(tyrant){
                poly([[25,16],[33,14],[36,15],[32,18],[26,19]],P.eye,false);
                ctx.fillStyle='#190e0b';ctx.fillRect(28,15,1.5,4);
                poly([[22,12],[29,10],[39,8],[40,13],[31,14],[25,17],[22,16]],P.dark);
                poly([[25,12],[30,10],[38,9],[37,11],[30,12],[25,14]],P.light,false);
            }else{
                ctx.fillStyle=P.eye;ctx.fillRect(27,15,7,4);ctx.fillStyle='#26150d';ctx.fillRect(28,15,2,4);ctx.fillStyle='#fff4c9';ctx.fillRect(32,15,2,1);
                poly([[23,12],[30,10],[39,12],[37,15],[29,13],[24,15]],P.dark,false);
            }
            if(tyrant){
                poly([[29,5],[31,1],[34,4],[39,3],[42,8],[36,7]],P.dark);
                ctx.strokeStyle='#e5bd8c';ctx.lineWidth=1.4;
                ctx.beginPath();ctx.moveTo(20,13);ctx.lineTo(17,20);ctx.lineTo(21,25);ctx.stroke();
                ctx.fillStyle=enraged?'#ff7740':P.dark;ctx.fillRect(40,17,2,7);ctx.fillRect(37,23,2,5);
                if(enraged){poly([[26,17],[33,15],[32,17],[27,18]],'#fff2a1',false);}
            }else if(b.state==='shooting'&&b.shotsFired>=3){ctx.fillStyle='#fff5c3';ctx.fillRect(27,15,6,3);}
            ctx.restore();ctx.restore();
        }
// BOSS_PART_END s0.drawRexBossBody.1

// Nguồn: index.html:889 · Dùng bởi: TRexBoss
// BOSS_PART_BEGIN s0.TRexBoss.1 EDITABLE
class TRexBoss {
            constructor(level) {
                this.hp = 50; this.maxHp = 50;
                this.w = 112; this.h = 88; this.baseX = canvas.width - 160; this.baseY = 320 - this.h;
                this.x = canvas.width; this.y = this.baseY; this.state = 'entering'; this.actionTimer = 100; this.name = "T-REX BOSS"; this.actionCooldown = 60; this.shotsFired = 0; this.shotDelay = 0; this.lastMeleeHit = -1; this.lastSkill = ''; this.burnTimer = 0; this.oDir = -1; this._homeSide = 1;
            }
            draw() { drawRexBossBody(this, false); }
            update() {
                this.actionCooldown--;
                if (this.state === 'entering') { this.x -= 6; if (this.x <= this.baseX) { this.x = this.baseX; this.state = 'idle'; this.refDist = Math.max(Math.round(canvas.width * 0.5), Math.min(Math.round(canvas.width * 0.64), Math.abs((dino.x + dino.w/2) - (this.x + this.w/2)))); } }
                else if (this.state === 'idle') {
                    this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    bossHoldAnchor(this);
                    this.actionTimer--;
                    if (bossCornerWarn(this, 380, this.actionCooldown <= 0)) { this.state = 'dashing'; this.dashDir = this.oDir; this.actionCooldown = 90; }
                    else if (!this.cornerWarn && this.actionTimer <= 0 && this.actionCooldown <= 0) {
                        let seq = ['shoot', 'dash']; let sk = seq[(this.skillIdx || 0) % seq.length]; this.skillIdx = ((this.skillIdx || 0) + 1) % seq.length;
                        if (sk === 'dash') { this.state = 'dashing'; this.dashDir = this.oDir; }
                        else { this.state = 'shooting'; this.shotsFired = 0; this.shotDelay = 0; }
                    }
                } else if (this.state === 'dashing') {
                    this.oDir = this.dashDir; this.x += 20 * (this.dashDir || -1);
                    if (frames % 5 === 0) visualEffects.push(new Effect(this.dashDir > 0 ? this.x + this.w + 10 : this.x - 10, this.y + 40, 'charge_wave', this.dashDir > 0));
                    if (checkAABB(dino, this)) {
                        if (dino.isShielding()) { visualEffects.push(new Effect(parryX(), dino.y, 'parry')); this.state = 'retreat_out'; this.retDir = this.dashDir; shakeTimer = 12; }
                        else dino.takeDamage(1);
                    }
                    if (this.state === 'dashing') {
                        let _past = (this.dashDir > 0 && this.x + this.w >= dino.x) || (this.dashDir <= 0 && this.x <= dino.x + dino.w);
                        if (_past || this.x < 8 || this.x > canvas.width - this.w - 8) { this.x = Math.max(8, Math.min(canvas.width - this.w - 8, this.x)); this.state = 'returning'; }
                    }
                } else if (this.state === 'retreat_out') {
                    this.x += 22 * (this.retDir || -1);
                    if (this.x < -this.w - 30 || this.x > canvas.width + 30) { this.retDir = (this.retDir > 0) ? -1 : 1; this.x = this.retDir > 0 ? canvas.width + this.w : -this.w * 2; this.state = 'retreat_in'; }
                } else if (this.state === 'retreat_in') {
                    this.x += (this.retDir > 0 ? -1 : 1) * 16;
                    let target = this.retDir > 0 ? canvas.width - this.w - 40 : 40;
                    if ((this.retDir > 0 && this.x <= target) || (this.retDir <= 0 && this.x >= target)) { this.x = target; this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1; this.state = 'idle'; this.actionTimer = 26; this.actionCooldown = 26; }
                } else if (this.state === 'returning') {
                    let _dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    this.x -= Math.sign(_dx || 1) * 16; this.x = Math.max(30, Math.min(canvas.width - this.w - 30, this.x));
                    if (Math.abs(_dx) > (this.refDist || 480) - 40 || this.x <= 30 || this.x >= canvas.width - this.w - 30) { this.state = 'idle'; this.actionTimer = 100; this.actionCooldown = 60; }
                } else if (this.state === 'shooting') {
                    this.oDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1;
                    if (this.shotDelay <= 0) {
                        let sx = this.oDir < 0 ? this.x + 8 : this.x + this.w - 8, sy = this.y + 40;
                        let tx = dino.x + dino.w/2, ty = dino.y + dino.h/2, dx = tx - sx, dy = ty - sy, d = Math.hypot(dx, dy) || 1;
                        if (this.shotsFired < 3) {
                            let sp = 8; bossProjectiles.push(new BossProjectile(sx, sy, dx/d*sp, dy/d*sp, false, 1));
                            this.shotsFired++; this.shotDelay = (this.shotsFired === 3) ? 30 : 40;
                        } else {
                            let sp = 12; let p = new BossProjectile(sx, sy, dx/d*sp, dy/d*sp, false, 1); p.isPiercing = true;
                            bossProjectiles.push(p); this.state = 'idle'; this.actionTimer = 120; this.actionCooldown = 60;
                        }
                    } else this.shotDelay--;
                }
            }
        }
// BOSS_PART_END s0.TRexBoss.1

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
