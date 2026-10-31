// BOSS_FILE: ScarabLordBoss
// BOSS_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, dojoMode, frames, parry, shakeTimer, visualEffects
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

// Nguồn: index.html:354 · Dùng bởi: ScarabLordBoss
// BOSS_PART_BEGIN s0.drawDesertScarab.1 EDITABLE
function drawDesertScarab(b){
            const dir=b.facingLeft?-1:1,attack=/claw/.test(b.state),sting=/sting/.test(b.state),rage=b.rage;
            const P={edge:'#29261b',dark:'#3b493a',body:'#687550',lit:'#a8ad6c',gold:'#c7a05b',bone:'#ead4a3',shell:'#385b55'};
            const poly=(p,c,e=true)=>desertBossPoly(p,c,e?P.edge:null,1.8),g=frames*(b.state==='claw_go'?.4:.15);
            ctx.save();ctx.translate(b.x+(dir>0?b.w:0),b.y);ctx.scale((dir>0?-1:1)*b.w/104,b.h/72);
            // The curved tail is made of overlapping chitin segments, ending
            // in the same poison-coloured sting that is warned on the ground.
            const tail=[[80,38],[96,29],[106,17],[106,2],[97,-10],[83,-14],[72,-9],[70,sting?-2:5]];
            for(let i=0;i<tail.length-1;i++){
                const [x,y]=tail[i],[nx,ny]=tail[i+1],a=Math.atan2(ny-y,nx-x);
                ctx.save();ctx.translate(x,y);ctx.rotate(a);
                poly([[-3,-6],[12,-7],[18,-3],[18,5],[4,7],[-3,3]],i%2?P.body:P.dark);
                poly([[0,-4],[11,-5],[14,-2],[2,-1]],P.gold,false);ctx.restore();
            }
            poly([[66,-7],[75,-6],[79,1],[74,sting?22:14],[69,9],[66,0]],P.dark);
            poly([[69,-3],[74,1],[72,sting?17:10]],rage?'#c6f176':'#8fbc63',false);
            const legs=(back)=>{for(let i=0;i<4;i++){
                const x=27+i*16,wave=Math.sin(g+i*1.5+(back?Math.PI:0))*3,y=back?48:53;
                poly([[x-3,y-3],[x+3,y-1],[x+10+wave,59],[x+4+wave,67],[x-4+wave,72],[x-6+wave,69],[x+2+wave,63],[x+3+wave,59],[x-4,y+4]],back?P.dark:P.body);
                if(!back)desertBossLine([[x+2,y],[x+6+wave,59],[x+wave,67]],P.gold,1.2);
            }};
            legs(true);
            poly([[19,35],[32,23],[54,20],[78,25],[89,37],[85,51],[68,60],[38,60],[22,51]],P.dark);
            for(let i=3;i>=0;i--){const x=33+i*12;poly([[x-9,28+i],[x+3,25+i],[x+11,33+i],[x+11,46],[x+2,54],[x-10,51]],P.body);poly([[x-6,30+i],[x+2,28+i],[x+7,34+i],[x-5,36+i]],P.gold,false);}
            poly([[20,33],[32,27],[51,27],[58,38],[54,54],[34,57],[19,48]],P.shell);
            poly([[33,29],[39,29],[37,53],[32,54]],P.gold,false);
            for(const x of [25,43])desertBossLine([[x,34],[x+3,39],[x+1,47]],'#85a084',1.4);
            legs(false);
            // Two large serrated pincers sit ahead of the armoured head.
            for(const back of [true,false]){
                const oy=back?-5:8,open=attack?8:2;
                poly([[23,35+oy],[12,35+oy],[3,43+oy],[-2,39+oy],[9,28+oy],[22,28+oy]],back?P.dark:P.body);
                ctx.save();ctx.translate(3,34+oy);ctx.rotate(back?.16:-.08);
                poly([[3,-6],[-11,-13-open],[-26,-9-open],[-34,1-open],[-26,-2],[-13,-4],[-5,2],[3,4]],P.gold);
                poly([[2,3],[-11,6],[-23,10+open],[-32,6+open],[-25,17+open],[-11,18],[4,10]],back?P.body:P.lit);
                for(let i=0;i<3;i++)poly([[-10-i*6,1],[-13-i*6,5],[-16-i*6,0]],P.bone,false);
                ctx.restore();
            }
            poly([[13,25],[25,25],[30,35],[25,44],[12,43],[7,34]],P.dark);
            poly([[15,26],[20,23],[26,27],[24,32],[15,33]],P.gold,false);
            ctx.fillStyle=rage?'#ffc85e':'#ee7950';ctx.fillRect(10,30,4,3);ctx.fillRect(17,31,3,2);
            desertBossLine([[12,28],[5,20],[-1,18]],P.gold,1.5);
            ctx.restore();
        }
// BOSS_PART_END s0.drawDesertScarab.1

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

// Nguồn: index.html:40349 · Dùng bởi: ScarabLordBoss
// BOSS_PART_BEGIN s1.ScarabLordBoss.1 EDITABLE
class ScarabLordBoss {
            constructor(level){
                this.name = "SCARAB LORD"; this.hp = 130; this.maxHp = 130;
                this.w = 104; this.h = 72; this.baseY = 320 - this.h;
                this.x = canvas.width - 250; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.step = 0; this.facingLeft = true;
                this.lastSkill = ''; this.atkBag = []; this.invulnAll = false; this.burnTimer = 0; this.rage = false;
                this.retState = 'idle'; this.actionTimer = 40; this.lastMeleeHit = -1;
                this.mound = null; this.claw = null; this.spikes = []; this.pools = []; this.stormDir = 1; this.burrowN = 0;
            }
            physics(){ this.dy += 0.9; this.y += this.dy;
                if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x)); }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = t; }
            pickAttack(){
                if (!this.atkBag || !this.atkBag.length){
                    this.atkBag = ['burrow','sweep','claw','sting','storm'];
                    for (let i = this.atkBag.length-1; i>0; i--){ let j = Math.floor(Math.random()*(i+1)); let t=this.atkBag[i]; this.atkBag[i]=this.atkBag[j]; this.atkBag[j]=t; }
                    if (this.atkBag[0] === this.lastSkill && this.atkBag.length > 1){ let t=this.atkBag[0]; this.atkBag[0]=this.atkBag[1]; this.atkBag[1]=t; }
                }
                let c = this.atkBag.shift(); this.lastSkill = c; this.step = 0; this.subTimer = 0;
                if (c === 'burrow'){ this.state = 'bur_down'; this.burrowN = 0; }
                else if (c === 'sweep') this.state = 'swp_warn';
                else if (c === 'claw') this.state = 'claw_warn';
                else if (c === 'sting') this.state = 'sting_warn';
                else { this.state = 'storm_warn'; this.stormDir = (dino.x + dino.w/2) < canvas.width/2 ? 1 : -1; }
            }
            update(){
                if (this.burnTimer > 0){ this.burnTimer--; if (this.burnTimer % 60 === 0) this.hp -= 1; }
                this.rage = this.hp <= this.maxHp * 0.35;
                const SL = ['entering','idle','bur_down','bur_move','bur_up','swp_warn','swp_go','claw_warn','claw_go','sting_warn','sting_go','storm_warn','storm_go'];
                if (SL.indexOf(this.state) < 0){ this.mound = null; this.claw = null; this.y = this.baseY; this.dy = 0; this.invulnAll = false; this.toIdle(30); }
                if (this.state === 'idle' && !(this.actionTimer >= 0)) this.actionTimer = 30;
                this.subTimer++;
                // vung doc con lai
                for (let i = this.pools.length - 1; i >= 0; i--){ let p = this.pools[i]; p.t--;
                    if (Math.abs((dino.x + dino.w/2) - p.x) < 42 && dino.grounded){ if (frames % 26 === 0) this.hurtP(1); }
                    if (p.t <= 0) this.pools.splice(i, 1); }
                // coc cat troi len
                for (let i = this.spikes.length - 1; i >= 0; i--){ let s = this.spikes[i]; s.t++;
                    if (s.t > 26 && s.t < 44 && !s.hit && Math.abs((dino.x + dino.w/2) - s.x) < 26 && (dino.y + dino.h) > 268){ this.hurtP(1); s.hit = true; }
                    if (s.t > 56) this.spikes.splice(i, 1); }

                if (this.state === 'entering'){ this.physics(); this.faceP(); if (this.subTimer > 40) this.toIdle(38); return; }
                if (this.state === 'idle'){ this.physics(); this.faceP();
                    let d = (dino.x + dino.w/2) - this.cx();
                    if (Math.abs(d) > 260) this.x += Math.sign(d) * 2.4; else if (Math.abs(d) < 110) this.x -= Math.sign(d) * 1.9;
                    this.actionTimer--; if (this.actionTimer <= 0) this.pickAttack(); return; }
                // ===== DAO NGAM: u cat duoi theo, troi len duoi chan (NHAY/CHAY khoi u) =====
                if (this.state === 'bur_down'){ this.y += 7; this.invulnAll = true;
                    if (this.y > 320){ this.state = 'bur_move'; this.subTimer = 0; this.mound = { x: this.cx() }; } return; }
                if (this.state === 'bur_move'){ this.invulnAll = true;
                    let tx = dino.x + dino.w/2;
                    this.mound.x += Math.sign(tx - this.mound.x) * (this.rage ? 8.2 : 6.8);   // NHANH hon nguoi chay -> phai NHAY qua u
                    if (this.subTimer > (this.rage ? 66 : 86) || Math.abs(this.mound.x - tx) < 8){ this.state = 'bur_up'; this.subTimer = 0; this.x = this.mound.x - this.w/2; this.y = 330; shakeTimer = 20; }
                    return; }
                if (this.state === 'bur_up'){ this.invulnAll = false;
                    this.y -= 16;
                    if (checkAABB(dino, this)) this.hurtP(1);
                    if (this.y <= this.baseY){ this.y = this.baseY; this.dy = 0; this.mound = null;
                        visualEffects.push(new Effect(this.cx(), 314, 'explosion', true, 34));
                        this.spikes.push({ x: this.cx() - 90, t: 0, hit: false }, { x: this.cx() + 90, t: 0, hit: false });   // cat van hai ben
                        this.burrowN++;
                        if (this.burrowN < (this.rage ? 3 : 2)){ this.state = 'bur_down'; this.subTimer = 0; }
                        else this.toIdle(this.rage ? 28 : 40); }
                    return; }
                // ===== QUET DUOI TAM DUNG: NGOI XUONG =====
                if (this.state === 'swp_warn'){ this.physics(); this.faceP();
                    if (this.subTimer > (this.rage ? 30 : 44)){ this.state = 'swp_go'; this.subTimer = 0; this.swpHit = false;
                        this.swpDir = (dino.x + dino.w/2) < this.cx() ? -1 : 1; this.swpX = this.cx(); if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'swp_go'){ this.physics();
                    this.swpX += this.swpDir * (this.rage ? 17 : 14);
                    if (!this.swpHit && !dino.isCrouching && Math.abs((dino.x + dino.w/2) - this.swpX) < 40 && (dino.y + dino.h) > 250){ this.hurtP(1); this.swpHit = true; }
                    if (this.swpX < -70 || this.swpX > canvas.width + 70) this.toIdle(this.rage ? 28 : 44);
                    return; }
                // ===== KEP CANG: lao toi — DO hoac LUOT =====
                if (this.state === 'claw_warn'){ this.physics(); this.faceP();
                    if (this.subTimer > (this.rage ? 30 : 42)){ this.state = 'claw_go'; this.subTimer = 0;
                        this.claw = { dir: (dino.x + dino.w/2) < this.cx() ? -1 : 1, hit: false }; this.facingLeft = this.claw.dir < 0;
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'claw_go'){ this.y = this.baseY; this.dy = 0;
                    this.x += this.claw.dir * (this.rage ? 22 : 18);
                    if (!this.claw.hit && checkAABB(dino, this)){ this.hurtP(1); this.claw.hit = true; }
                    // CHOT AN TOAN: don nay khong co moc thoi gian nao khac, neu vi ly do gi
                    // ma khong bao gio ra khoi bien thi boss se lao mai mai. Cat cung sau 4 giay.
                    if (this.subTimer > 240){ this.clawPass = 0; this.claw = null;
                        this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x)); this.toIdle(40); return; }
                    if (this.x < -this.w - 20 || this.x > canvas.width + 20){
                        this.clawPass = (this.clawPass || 0) + 1;
                        if (this.clawPass >= (this.rage ? 3 : 2)){ this.clawPass = 0; this.claw = null; this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x)); this.toIdle(40); }
                        else { this.x = this.claw.dir > 0 ? canvas.width + 18 : -this.w - 18; this.claw.dir = -this.claw.dir; this.claw.hit = false; this.facingLeft = this.claw.dir < 0; }
                    }
                    return; }
                // ===== CHICH DOC: bao vong tron roi dam xuong, de lai vung doc =====
                if (this.state === 'sting_warn'){ this.physics(); this.faceP();
                    if (this.subTimer < 26) this.stingX = dino.x + dino.w/2;
                    this.x += ((this.stingX - this.w/2) - this.x) * 0.10;
                    if (this.subTimer > 40){ this.state = 'sting_go'; this.subTimer = 0; this.stingN = 0; if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'sting_go'){ this.physics();
                    let n = this.rage ? 4 : 3;                                  // DAM LIEN TIEP, moi nhat nham lai
                    this.x += ((this.stingX - this.w/2) - this.x) * 0.12;
                    if (this.subTimer % 26 === 6 && this.stingN < n){ this.stingN++;
                        shakeTimer = 24; visualEffects.push(new Effect(this.stingX, 306, 'explosion', true, 34));
                        if (Math.abs((dino.x + dino.w/2) - this.stingX) < 38 && (dino.y + dino.h) > 268) this.hurtP(1);
                        this.pools.push({ x: this.stingX, t: 220 });
                        this.stingX = Math.max(40, Math.min(canvas.width - 40, dino.x + dino.w/2));   // nham cho nhat tiep
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.subTimer > n*26 + 24) this.toIdle(this.rage ? 28 : 42);
                    return; }
                // ===== BAO CAT: gio day dat + coc cat troi len (phai di chuyen lien tuc) =====
                if (this.state === 'storm_warn'){ this.physics(); this.faceP();
                    if (this.subTimer > 44){ this.state = 'storm_go'; this.subTimer = 0; this.step = 0; if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'storm_go'){ this.physics();
                    if (!dino.isShielding()){ dino.x += this.stormDir * 3.6; dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x)); }
                    let gap = this.rage ? 14 : 19;
                    if (this.subTimer % gap === 1 && this.step < (this.rage ? 10 : 7)){ this.step++;
                        this.spikes.push({ x: Math.max(40, Math.min(canvas.width - 40, dino.x + dino.w/2 + (Math.random()*2-1)*62)), t: 0, hit: false }); }
                    if (this.subTimer > (this.rage ? 150 : 170)) this.toIdle(this.rage ? 28 : 44);
                    return; }
            }
            drawBody(){drawDesertScarab(this);}
            draw(){
                for (let p of this.pools){
                    ctx.fillStyle = "rgba(124,179,66," + (0.25 + 0.15*Math.sin(frames*0.15)).toFixed(2) + ")";
                    ctx.beginPath(); ctx.ellipse(p.x, 316, 42, 10, 0, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "rgba(174,213,129,0.5)";
                    for (let k = 0; k < 3; k++){ ctx.beginPath(); ctx.arc(p.x + (k-1)*16, 312 - (frames*0.8 + k*9) % 14, 3.5, 0, 6.28); ctx.fill(); }
                }
                for (let s of this.spikes){
                    if (s.t <= 26){ let a = (0.25 + 0.35*Math.abs(Math.sin(frames*0.45))).toFixed(2);
                        ctx.strokeStyle = "rgba(255,64,64," + a + ")"; ctx.lineWidth = 2;
                        ctx.beginPath(); ctx.ellipse(s.x, 314, 24, 7, 0, 0, 6.28); ctx.stroke(); }
                    else if (s.t < 44){ let hgt = Math.min(54, (s.t - 26) * 7);
                        ctx.fillStyle = "#c9884f"; ctx.beginPath(); ctx.moveTo(s.x - 20, 320); ctx.lineTo(s.x, 320 - hgt); ctx.lineTo(s.x + 20, 320); ctx.closePath(); ctx.fill();
                        ctx.fillStyle = "#e8b87c"; ctx.beginPath(); ctx.moveTo(s.x - 8, 320); ctx.lineTo(s.x, 320 - hgt); ctx.lineTo(s.x + 6, 320); ctx.closePath(); ctx.fill(); }
                }
                if (this.mound){
                    ctx.fillStyle = "#c9884f"; ctx.beginPath(); ctx.ellipse(this.mound.x, 314, 44, 16, 0, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#e8b87c"; ctx.beginPath(); ctx.ellipse(this.mound.x, 310, 28, 9, 0, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "rgba(200,140,80,0.5)";
                    for (let k = 0; k < 5; k++) ctx.fillRect(this.mound.x - 30 + k*13, 300 - (frames*1.4 + k*7) % 12, 4, 4);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("Ụ CÁT ĐANG ĐUỔI — CHẠY / NHẢY!", canvas.width/2, 246); ctx.textAlign = "left";
                }
                if (this.state === 'swp_warn'){
                    let a = (0.2 + 0.3*Math.abs(Math.sin(frames*0.4))).toFixed(2);
                    ctx.fillStyle = "rgba(255,64,64," + a + ")"; ctx.fillRect(0, 250, canvas.width, 44);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("QUÉT ĐUÔI — NGỒI XUỐNG (S)!", canvas.width/2, 242); ctx.textAlign = "left";
                }
                if (this.state === 'swp_go'){
                    ctx.fillStyle = "rgba(184,130,60,0.75)"; ctx.beginPath();
                    ctx.moveTo(this.swpX - this.swpDir*46, 250); ctx.lineTo(this.swpX, 250); ctx.lineTo(this.swpX, 294); ctx.lineTo(this.swpX - this.swpDir*46, 294); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#d9b06a"; ctx.fillRect(this.swpX - 6, 250, 12, 44);
                }
                if (this.state === 'claw_warn'){
                    let a = (0.2 + 0.3*Math.abs(Math.sin(frames*0.4))).toFixed(2);
                    ctx.fillStyle = "rgba(255,64,64," + a + ")"; ctx.fillRect(0, this.y, canvas.width, this.h);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("KẸP CÀNG — ĐỠ (L) HOẶC LƯỚT (SHIFT)!", canvas.width/2, this.y - 8); ctx.textAlign = "left";
                }
                if (this.state === 'sting_warn' || this.state === 'sting_go'){
                    let a = (0.25 + 0.35*Math.abs(Math.sin(frames*0.45))).toFixed(2);
                    ctx.fillStyle = "rgba(124,179,66," + a + ")"; ctx.fillRect(this.stingX - 40, 268, 80, 52);
                    ctx.strokeStyle = "#7CB342"; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(this.stingX, 312, 40, 11, 0, 0, 6.28); ctx.stroke();
                }
                if (this.state === 'storm_go' || this.state === 'storm_warn'){
                    ctx.strokeStyle = "rgba(233,196,144,0.55)"; ctx.lineWidth = 2;
                    for (let i = 0; i < 12; i++){ let wy = 60 + i*22, wx = ((frames*7*this.stormDir + i*120) % (canvas.width+200) + canvas.width+200) % (canvas.width+200) - 100;
                        ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + this.stormDir*54, wy + 3); ctx.stroke(); }
                    if (this.state === 'storm_warn'){ ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("BÃO CÁT — CỌC CÁT SẼ TRỒI LÊN!", canvas.width/2, 52); ctx.textAlign = "left"; }
                }
                if (this.state !== 'bur_move') this.drawBody();
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2 - 160, 6, 320, 12);
                ctx.fillStyle = this.rage ? "#FF1744" : "#b8823c"; ctx.fillRect(canvas.width/2 - 158, 8, 316 * Math.max(0, this.hp/this.maxHp), 8);
                ctx.fillStyle = "white"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + (this.invulnAll ? "  ✕ DƯỚI CÁT" : (this.rage ? "  ☠ CUỒNG NỘ" : "")), canvas.width/2, 32); ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s1.ScarabLordBoss.1

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
