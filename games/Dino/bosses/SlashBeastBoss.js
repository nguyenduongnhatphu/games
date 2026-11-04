// BOSS_FILE: SlashBeastBoss
// BOSS_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, platforms, projectiles, shakeTimer, visualEffects
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

// Nguồn: index.html:32045 · Dùng bởi: SlashBeastBoss
// BOSS_PART_BEGIN s0.SlashBeastBoss.1 EDITABLE
class SlashBeastBoss {
    constructor(level){
        this.hp=125; this.maxHp=125; this.w=116; this.h=78;
        this.x=canvas.width+40; this.y=320-this.h;
        this.baseY=320-this.h; this.name="SLASH BEAST";
        this.state='entering'; this.retState='idle'; this.retMode='ground';
        this.actionTimer=52; this.subTimer=0; this.facingLeft=true; this.lastSkill=''; this.atkBag=[];
        this.vx=0; this.vy=0; this.faceDir=-1;
        this.rage=false; this.rushCount=0; this.rushDir=-1; this.jumpDir=-1;
        this.counterArmed=false; this.lastMeleeHit=-1; this.burnTimer=0; this.invulnAll=false; this.grabbed=false;
        this.throwVX=0; this.throwVY=0; this.throwTimer=0; this.throwingPlayer=false;
        this.clawFlash=0; this.legAnim=0; this.roarT=0; this.wallHit=0;

        // Kịch bản cột đá: tổng thời gian người chơi đứng trên các cột đá.
        this.pillarTime=0; this.pillarTrigger=180; this.pillarCooldown=0;
        this.scriptedCycle=0; this.pillarTarget=null; this.pillarJumps=0;
        this.pillarClawTarget=null; this.clawHitCount=0;
    }

    cx(){return this.x+this.w/2;}
    cy(){return this.y+this.h/2;}

    hurtP(n=1){
        if(!dino.isShielding()) dino.takeDamage(n);
        else visualEffects.push(new Effect(dino.x+(dino.isFacingLeft?dino.w:0),dino.y,'parry'));
    }

    resetIdle(t=42){
        this.state='idle'; this.subTimer=0; this.actionTimer=t; this.vx=0; this.vy=0;
        this.invulnAll=false; this.counterArmed=false; this.grabbed=false;
        this.throwingPlayer=false; this.throwTimer=0; this.throwVX=0; this.throwVY=0;
        this.pillarTarget=null; this.pillarClawTarget=null; this.pillarJumps=0; this.clawHitCount=0;
    }

    getPillars(){
        // Mặt đất không được tính là cột đá.
        return platforms.filter(p => p && p.summit && p.top < 300);
    }

    getPlayerPillar(){
        const px=dino.x+dino.w/2, foot=dino.y+dino.h;
        let best=null, bestDist=9999;
        for(const p of this.getPillars()){
            if(px>=p.x-4 && px<=p.x+p.w+4 && Math.abs(foot-p.top)<=9){
                const d=Math.abs(px-(p.x+p.w/2));
                if(d<bestDist){best=p;bestDist=d;}
            }
        }
        return best;
    }

    pickAttack(){
        if(!this.atkBag.length){
            let pool=['charge','twin','jump','charge','counter'];
            if(this.rushCount>=2) pool.push('grab');
            for(let i=pool.length-1;i>0;i--){
                let j=Math.floor(Math.random()*(i+1));
                [pool[i],pool[j]]=[pool[j],pool[i]];
            }
            this.atkBag=pool;
        }
        let a=this.atkBag.shift();
        if(a===this.lastSkill && this.atkBag.length) a=this.atkBag.shift();
        this.lastSkill=a;
        return a;
    }

    choosePillarScript(){
        // Pillar advantage is a hard priority. Once the player has remained
        // off the ground for >3 seconds, normal attacks are suspended until
        // Beast gets a chance to attack the pillar.
        if(this.pillarCooldown>0 || this.state!=='idle' || this.pillarTime<180) return false;
        const p=this.getPlayerPillar();
        if(!p) return false;

        this.pillarTime=0;
        this.pillarCooldown=70;

        const mode=(this.scriptedCycle++)%2===0 ? 'dive' : 'claw';
        if(mode==='dive'){
            this.pillarTarget=p;
            this.pillarJumps=0;
            this.state='pillar_dive_prep';
            this.subTimer=this.rage?10:16;
            floatingTexts.push(new FloatingText(this.x,this.y-28,'PILLAR HUNT!'));
        }else{
            this.pillarClawTarget=p;
            this.state='pillar_claw_prep';
            this.subTimer=this.rage?12:18;
            floatingTexts.push(new FloatingText(this.x,this.y-28,'CLAW FROM BELOW!'));
        }
        if(SFX.bossSkill) SFX.bossSkill();
        return true;
    }

    update(){
        this.legAnim+=0.3;
        if(this.clawFlash>0)this.clawFlash--;
        if(this.pillarCooldown>0)this.pillarCooldown--;

        if(this.hp<=this.maxHp*.5 && !this.rage){
            this.rage=true; this.actionTimer=20;
            floatingTexts.push(new FloatingText(this.x,this.y-32,'SLASH BEAST!')); shakeTimer=18;
        }

        // Quét trạng thái vị trí của người chơi:
        // nếu người chơi KHÔNG ở dưới đất liên tục quá 3 giây,
        // Beast xem việc đứng trên cột là lợi thế và ưu tiên săn trên cột.
        const playerGrounded = dino.y + dino.h >= canvas.height - 55 || (
            Math.abs((dino.y+dino.h)-this.baseY) <= 9
        );
        if(playerGrounded){
            this.pillarTime=0;
        }else{
            this.pillarTime++;
        }

        // Gravity cho các state trên không.
        const groundedStates=['idle','entering','intro','roar','counter_prep','counter',
            'charge_prep','charge_recoil','twin_prep','grab_prep','grab_go','grab_ram',
            'pillar_claw_prep','pillar_claw','returning'];
        if(!groundedStates.includes(this.state)){
            this.vy+=0.72; this.y+=this.vy;
            if(this.y>=this.baseY){this.y=this.baseY;this.vy=0;}
        }

        if(this.state==='entering'){
            this.x-=7;
            if(this.x<=canvas.width-250){this.state='intro';this.subTimer=0;}
            return;
        }

        if(this.state==='intro'){
            this.subTimer++;
            if(this.subTimer===1){
                floatingTexts.push(new FloatingText(this.x,this.y-38,'SLASH BEAST!'));
                if(SFX.bossEntry) SFX.bossEntry();
            }
            if(this.subTimer>42)this.resetIdle(42);
            return;
        }

        // Explicit Returning:
        // - trên không: rơi xuống đất;
        // - đang lao trên mặt đất: lùi ra xa người chơi.
        if(this.state==='returning'){
            this.invulnAll=false;
            if(this.retMode==='air'){
                this.vy+=0.95; this.y+=this.vy;
                this.x+=this.vx*0.35;
                this.vx*=0.96;
                if(this.y>=this.baseY){
                    this.y=this.baseY; this.vy=0; this.vx=0;
                    shakeTimer=10; this.resetIdle(30);
                }
            }else{
                const px=dino.x+dino.w/2;
                const away=this.cx()>=px?1:-1;
                const desired=away*(this.rage?5.2:4.2);
                this.vx=this.vx*0.82+desired*0.18;
                this.x+=this.vx;
                this.x=Math.max(10,Math.min(canvas.width-this.w-10,this.x));
                this.subTimer++;
                if(this.subTimer>=28)this.resetIdle(30);
            }
            return;
        }

        if(this.state==='idle'){
            // Beast luôn di chuyển và săn người chơi.
            let dx=(dino.x+dino.w/2)-this.cx(), dist=Math.abs(dx), dir=Math.sign(dx||-1);
            let targetDist=this.rage?108:138;
            if(dist>targetDist+24)this.x+=dir*(this.rage?3.2:2.45);
            else if(dist<targetDist-30)this.x-=dir*1.85;
            this.x=Math.max(12,Math.min(canvas.width-this.w-12,this.x));

            // Pillar attack has absolute priority because the player has
            // gained an aerial/vertical advantage.
            if(this.choosePillarScript()) return;

            this.actionTimer--;
            if(this.actionTimer<=0){
                let a=this.pickAttack();
                if(a==='charge'){this.state='charge_prep';this.subTimer=this.rage?18:26;this.rushDir=dir;}
                else if(a==='twin'){this.state='twin_prep';this.subTimer=this.rage?18:24;}
                else if(a==='jump'){this.state='jump_prep';this.subTimer=this.rage?18:25;this.jumpDir=dir;}
                else if(a==='counter'){this.state='counter_prep';this.subTimer=this.rage?26:34;this.counterArmed=true;}
                else if(a==='grab'){this.state='grab_prep';this.subTimer=24;}
            }
        }

        else if(this.state==='charge_prep'){
            // Same movement philosophy as the older proven dash bosses:
            // short telegraph movement, then a constant-speed lunge.
            this.subTimer--;
            this.x+=this.rushDir*0.55;
            if(this.subTimer<=0){
                this.state='charging';
                this.subTimer=this.rage?64:78;
                this.dashSpeed=this.rage?13.5:11.5;
                this.rushStartX=this.x;
                this.rushDir=this.rushDir||-1;
                this.faceDir=this.rushDir;
                this.clawFlash=0;
                shakeTimer=8;
                if(SFX.bossSkill) SFX.bossSkill();
            }
        }

        else if(this.state==='charging'){
            // Constant displacement per frame: no lerp, no acceleration,
            // no position correction. This is what makes old boss dashes
            // readable and visually stable.
            this.x+=this.dashSpeed*this.rushDir;
            this.clawFlash=(frames%6<3)?4:0;

            if(checkAABB(dino,{x:this.x+10,y:this.y+12,w:this.w-20,h:this.h-18}))
                this.hurtP(1);

            const hitWall=(this.x<=8 && this.rushDir<0) ||
                          (this.x>=canvas.width-this.w-8 && this.rushDir>0);

            if(hitWall){
                this.x=Math.max(8,Math.min(canvas.width-this.w-8,this.x));
                this.rushCount++;
                this.wallHit++;
                shakeTimer=12;

                if(this.rushCount>=2){
                    // A clean end point rather than an interpolated reversal.
                    this.state='charge_recoil';
                    this.subTimer=16;
                }else{
                    this.rushDir*=-1;
                    this.state='charge_recoil';
                    this.subTimer=12;
                }
            }else if(--this.subTimer<=0){
                this.rushCount++;
                if(this.rushCount>=2){
                    this.state='charge_recoil';
                    this.subTimer=16;
                }else{
                    this.rushDir*=-1;
                    this.state='charge_recoil';
                    this.subTimer=12;
                }
            }
        }

        else if(this.state==='charge_recoil'){
            // No hidden movement during the pause. The boss visibly stops,
            // giving the player a readable reversal window.
            this.vx=0;
            this.subTimer--;
            if(this.subTimer<=0){
                if(this.rushCount>=2){
                    this.state='grab_prep';
                    this.subTimer=22;
                }else{
                    this.state='charge_prep';
                    this.subTimer=this.rage?8:12;
                }
            }
        }

        else if(this.state==='twin_prep'){
            this.subTimer--;
            if(this.subTimer<=0){
                let sx=this.cx(), sy=this.y+28, tx=dino.x+dino.w/2, ty=dino.y+dino.h/2, base=Math.atan2(ty-sy,tx-sx);
                for(let k=0;k<2;k++){
                    let a=base+(k===0?-0.28:0.28);
                    let bp=new BossProjectile(sx,sy,Math.cos(a)*10.5,Math.sin(a)*10.5,false,1);
                    bp.slashBlade=true; bp.w=34; bp.h=18; bp.color='#FFB74D'; bossProjectiles.push(bp);
                }
                if(this.rage){
                    let a=base+Math.PI;
                    let bp=new BossProjectile(sx,sy,Math.cos(a)*8,Math.sin(a)*8,false,1);
                    bp.slashBlade=true; bp.w=34; bp.h=18; bossProjectiles.push(bp);
                }
                if(SFX.bossSkill) SFX.bossSkill();
                this.state='roar'; this.subTimer=this.rage?28:36; this.roarT=this.subTimer;
            }
        }

        else if(this.state==='jump_prep'){
            this.subTimer--;
            if(this.subTimer<=0){
                this.state='jump_attack'; this.vy=-(this.rage?14.5:13);
                this.vx=this.jumpDir*(this.rage?5.5:4);
                if(SFX.bossSkill) SFX.bossSkill();
            }
        }

        else if(this.state==='jump_attack'){
            this.x+=this.vx;
            if(checkAABB(dino,{x:this.x+12,y:this.y+8,w:this.w-24,h:this.h-12}))this.hurtP(1);
            if(this.y>=this.baseY){
                this.y=this.baseY; this.vy=0; shakeTimer=18;
                for(let side of [-1,1]){
                    let bp=new BossProjectile(this.cx(),308,side*6.5,0,true,1);
                    bp.w=30;bp.h=18;bp.color='#FFB74D';bp.stomp=true;bossProjectiles.push(bp);
                }
                this.state='roar';this.subTimer=this.rage?24:34;this.roarT=this.subTimer;
            }
        }

        // === KỊCH BẢN 1: PILLAR DIVE HUNT ===
        // Boss nhảy vào đúng cột người chơi đang đứng. Nếu người chơi đổi cột,
        // boss lại nhảy lên cột mới. Khi người chơi xuống đất, kết thúc bằng Slam.
        else if(this.state==='pillar_dive_prep'){
            this.subTimer--;
            const p=this.getPlayerPillar() || this.pillarTarget;
            if(p) this.pillarTarget=p;
            if(this.pillarTarget){
                const tx=this.pillarTarget.x+this.pillarTarget.w/2;
                const dx=tx-this.cx();
                if(Math.abs(dx)>6) this.x+=Math.sign(dx)*Math.min(3.2,Math.abs(dx));
            }
            if(this.subTimer<=0){
                const p=this.pillarTarget || this.getPlayerPillar();
                if(!p){this.resetIdle(24);return;}
                this.state='pillar_dive';
                this.vy=-(this.rage?15.5:14);
                // Bounded horizontal launch speed prevents a large position snap.
                const launchDx=(p.x+p.w/2)-this.cx();
                this.faceDir=Math.sign(launchDx||this.faceDir||-1);
                this.vx=Math.max(-7.5,Math.min(7.5,launchDx*0.045));
                this.pillarJumps++;
                shakeTimer=7;
                if(SFX.bossSkill) SFX.bossSkill();
            }
        }

        else if(this.state==='pillar_dive'){
            const p=this.getPlayerPillar();
            if(p) this.pillarTarget=p; // retarget immediately when player changes pillar
            this.x+=this.vx;
            if(checkAABB(dino,{x:this.x+12,y:this.y+10,w:this.w-24,h:this.h-12}))this.hurtP(1);

            // Land on the target pillar if possible.
            let land=null;
            for(const rp of this.getPillars()){
                if(this.x+this.w>rp.x && this.x<rp.x+rp.w &&
                   this.y+this.h<=rp.top+18 && this.vy>=0){
                    land=rp; break;
                }
            }

            if(land && this.y+this.h>=land.top){
                this.y=land.top-this.h; this.vy=0; this.vx=0;
                shakeTimer=10;
                const playerPillar=this.getPlayerPillar();
                if(playerPillar){
                    // Người chơi vẫn ở trên cao: lập tức khóa vào CỘT MỚI của người chơi.
                    // Không cần chờ một attack cycle khác.
                    this.pillarTarget=playerPillar;
                    this.pillarJumps++;
                    if(this.pillarJumps<6){
                        this.state='pillar_dive_prep';
                        this.subTimer=this.rage?7:11;
                    }else{
                        this.state='pillar_dive_prep';
                        this.subTimer=8;
                    }
                }else{
                    // Người chơi đã xuống đất -> Slam kết thúc kịch bản.
                    this.state='pillar_slam_prep';
                    this.subTimer=this.rage?12:18;
                }
            }else if(this.y>=this.baseY){
                this.y=this.baseY; this.vy=0; this.vx=0;
                if(this.getPlayerPillar()){
                    this.state='pillar_dive_prep'; this.subTimer=this.rage?9:14;
                }else{
                    this.state='pillar_slam_prep'; this.subTimer=this.rage?12:18;
                }
            }
        }

        else if(this.state==='pillar_slam_prep'){
            this.subTimer--;
            this.x+=(dino.x+dino.w/2-this.cx())*0.035;
            if(this.subTimer<=0){
                this.state='pillar_slam';
                this.vy=-(this.rage?12.5:11);
                this.vx=Math.sign((dino.x+dino.w/2)-this.cx()||-1)*(this.rage?4.5:3.5);
                if(SFX.bossSkill) SFX.bossSkill();
            }
        }

        else if(this.state==='pillar_slam'){
            this.x+=this.vx;
            if(checkAABB(dino,{x:this.x+10,y:this.y+8,w:this.w-20,h:this.h-10}))this.hurtP(1);
            if(this.y>=this.baseY){
                this.y=this.baseY;this.vy=0;this.vx=0;shakeTimer=24;
                for(let side of [-1,1]){
                    let bp=new BossProjectile(this.cx(),308,side*(this.rage?7.2:6.3),0,true,1);
                    bp.w=38;bp.h=20;bp.color='#FFB74D';bp.stomp=true;bp.slashSlam=true;
                    bossProjectiles.push(bp);
                }
                // Slam có một nhịp trễ nhỏ để người chơi có thể jump/parry.
                this.state='roar';this.subTimer=this.rage?28:38;this.roarT=this.subTimer;
            }
        }

        // === KỊCH BẢN 2: PILLAR CLAW ===
        // Boss đứng dưới cột đá và cào lên phía người chơi, sau đó rơi xuống.
        else if(this.state==='pillar_claw_prep'){
            this.subTimer--;
            const p=this.getPlayerPillar() || this.pillarClawTarget;
            if(p) this.pillarClawTarget=p;
            if(this.pillarClawTarget){
                const tx=this.pillarClawTarget.x+this.pillarClawTarget.w/2;
                const dx=tx-this.cx();
                if(Math.abs(dx)>6) this.x+=Math.sign(dx)*Math.min(2.8,Math.abs(dx));
            }
            if(this.subTimer<=0){
                const p=this.pillarClawTarget || this.getPlayerPillar();
                if(!p){this.resetIdle(24);return;}
                this.state='pillar_claw_approach';
                this.clawHitCount=0;
                this.subTimer=this.rage?58:68;
                this.vy=0;
                // Không snap Y. Boss trượt mượt tới vị trí dưới cột rồi mới bắt đầu cào.
                this.pillarClawY=Math.min(this.baseY,p.top+8);
                this.faceDir=Math.sign((p.x+p.w/2)-this.cx()||this.faceDir||-1);
                this.approachTimer=this.rage?14:20;
                if(SFX.bossSkill) SFX.bossSkill();
            }
        }

        else if(this.state==='pillar_claw_approach'){
            const p=this.pillarClawTarget || this.getPlayerPillar();
            if(p){
                this.pillarClawY=Math.min(this.baseY,p.top+8);
                this.x+=(p.x+p.w/2-this.cx())*0.12;
            }
            // Smoothly approach vertically instead of teleporting.
            const dy=this.pillarClawY-this.y;
            this.y += dy * 0.18;
            if(Math.abs(dy)<1.2) this.y=this.pillarClawY;
            this.approachTimer--;
            if(this.approachTimer<=0 || Math.abs(this.y-this.pillarClawY)<1.5){
                this.y=this.pillarClawY;
                this.state='pillar_claw';
            }
        }

        else if(this.state==='pillar_claw'){
            this.x+=(this.pillarClawTarget ? (this.pillarClawTarget.x+this.pillarClawTarget.w/2-this.cx())*0.12 : 0);
            this.x=Math.max(12,Math.min(canvas.width-this.w-12,this.x));
            this.subTimer--;

            // Cào 3 nhịp lên phía trên; mỗi nhịp có khoảng nghỉ đọc được.
            if((this.subTimer===this.rage?46:54) || (this.subTimer===this.rage?30:38) || (this.subTimer===this.rage?14:22)){
                this.clawHitCount++;
                const p=this.pillarClawTarget;
                const hx=this.cx(), hy=p?p.top-8:210;
                const hitbox={x:hx-48,y:hy-48,w:96,h:50};
                if(checkAABB(dino,hitbox))this.hurtP(1);
                visualEffects.push(new Effect(hx,hy,'slash',true,30));
                shakeTimer=5;
            }
            if(this.subTimer<=0){
                // Sau khi cào xong, rơi xuống đất.
                this.state='pillar_claw_fall';
                this.vy=-1.5;
            }
        }

        else if(this.state==='pillar_claw_fall'){
            this.vy+=1.05;this.y+=this.vy;
            if(this.y>=this.baseY){
                this.y=this.baseY;this.vy=0;shakeTimer=14;
                this.state='roar';this.subTimer=this.rage?20:28;
            }
        }

        else if(this.state==='counter_prep'){
            this.invulnAll=true; this.subTimer--;
            if(this.subTimer<=0){this.state='counter';this.subTimer=this.rage?34:42;}
        }

        else if(this.state==='counter'){
            this.invulnAll=true;
            let hit=false;
            for(let i=projectiles.length-1;i>=0;i--){
                let p=projectiles[i];
                if(checkAABB(p,this)){hit=true;projectiles.splice(i,1);}
            }
            if(hit){
                let sx=this.cx(), sy=this.y+26, tx=dino.x+dino.w/2, ty=dino.y+dino.h/2, base=Math.atan2(ty-sy,tx-sx);
                for(let k=-1;k<=1;k++){
                    let a=base+k*.22;
                    let bp=new BossProjectile(sx,sy,Math.cos(a)*12,Math.sin(a)*12,false,1);
                    bp.slashBlade=true;bp.w=34;bp.h=18;bossProjectiles.push(bp);
                }
                floatingTexts.push(new FloatingText(this.x,this.y-30,'COUNTER!'));shakeTimer=12;
            }
            if(--this.subTimer<=0){this.invulnAll=false;this.state='roar';this.subTimer=this.rage?22:30;}
        }

        else if(this.state==='grab_prep'){
            this.subTimer--;
            // Readable short approach, matching the old bosses' constant movement.
            const dx=(dino.x+dino.w/2)-this.cx();
            const dir=Math.sign(dx||this.rushDir||-1);
            this.x+=dir*(this.rage?2.8:2.2);
            if(this.subTimer<=0){
                this.state='grab_go';
                this.grabDir=dir;
                this.faceDir=this.grabDir;
                this.subTimer=this.rage?28:34;
                this.grabSpeed=this.rage?10.5:8.5;
                this.grabStartX=this.x;
                shakeTimer=5;
            }
        }

        else if(this.state==='grab_go'){
            // Constant-speed grab lunge. No lerp and no direct player relocation.
            this.x+=this.grabSpeed*this.grabDir;
            this.clawFlash=(frames%5<3)?5:0;

            const grabBox={x:this.x+6,y:this.y+8,w:this.w-12,h:this.h-12};
            if(checkAABB(dino,grabBox) && !this.grabbed){
                this.grabbed=true;
                this.state='grab_hold';
                this.subTimer=this.rage?16:22;
                this.vx=0;

                // Store the player's relative position at the instant of capture.
                this.grabOffsetX=dino.x-this.x;
                this.grabOffsetY=dino.y-this.y;
                this.grabLastX=dino.x;
                this.grabLastY=dino.y;
                this.hurtP(1);
                floatingTexts.push(new FloatingText(this.x,this.y-30,'GRAB!'));
                shakeTimer=7;
            }else if(
                (this.grabDir<0 && this.x<8) ||
                (this.grabDir>0 && this.x>canvas.width-this.w-8) ||
                --this.subTimer<=0
            ){
                this.x=Math.max(8,Math.min(canvas.width-this.w-8,this.x));
                this.grabbed=false;
                this.state='returning';
                this.retMode='ground';
                this.subTimer=0;
            }
        }

        else if(this.state==='grab_hold'){
            // The player is held by a physical-looking constraint rather than
            // being teleported. The constraint has limited correction speed.
            this.subTimer--;
            const targetX=this.x+this.grabOffsetX;
            const targetY=this.y+this.grabOffsetY;
            const dx=targetX-dino.x;
            const dy=targetY-dino.y;

            dino.x += Math.max(-5,Math.min(5,dx*0.55));
            dino.y += Math.max(-5,Math.min(5,dy*0.55));
            dino.vx=dx*0.22;
            dino.vy=dy*0.22;

            if(this.subTimer<=0){
                const away=(dino.x+dino.w/2)>=this.cx()?1:-1;
                this.throwVX=(this.rage?10.5:8.5)*away;
                this.throwVY=-(this.rage?10.5:9);
                this.throwTimer=46;
                this.grabbed=false;
                this.throwingPlayer=true;
                this.state='grab_throw';
                shakeTimer=10;
            }
        }

        else if(this.state==='grab_throw'){
            // Real projectile motion for the player. The boss no longer writes
            // the player's position after release.
            dino.x+=this.throwVX;
            dino.y+=this.throwVY;
            this.throwVY+=0.62;
            this.throwVX*=0.985;
            this.throwTimer--;

            if(dino.x<4){dino.x=4;this.throwVX=Math.abs(this.throwVX)*0.45;}
            if(dino.x>canvas.width-dino.w-4){
                dino.x=canvas.width-dino.w-4;
                this.throwVX=-Math.abs(this.throwVX)*0.45;
            }

            if(this.throwTimer<=0 || dino.y+dino.h>=canvas.height-55){
                if(dino.y+dino.h>=canvas.height-55){
                    dino.y=canvas.height-55-dino.h;
                    dino.vy=0;
                    shakeTimer=14;
                }
                this.throwingPlayer=false;
                this.state='returning';
                this.retMode='ground';
                this.subTimer=0;
                this.vx=0;
                this.resetIdle(this.rage?18:28);
            }
        }

        else if(this.state==='roar'){
            this.subTimer--;this.x+=Math.sin(frames*.2)*.18;
            if(this.subTimer<=0)this.resetIdle(this.rage?20:34);
        }

    }

    draw(){
        let x=this.x,y=this.y,bob=Math.sin(frames*.22)*1.5;
        ctx.save();ctx.translate(x,y+bob);if(this.faceDir<0)ctx.scale(-1,1);

        // Ngoại hình thú hơn: thân thấp, bốn chân, đầu thú nhô ra, tai, bờm và móng.
        ctx.fillStyle='#272B33';
        ctx.beginPath();ctx.ellipse(56,40,45,25,0,0,Math.PI*2);ctx.fill();

        // ngực / vai
        ctx.fillStyle='#555B65';
        ctx.beginPath();ctx.ellipse(47,34,31,28,0,0,Math.PI*2);ctx.fill();

        // Đầu thú máy hoàn chỉnh: trán, mặt, má, mõm, mũi, mắt và hàm.
        ctx.fillStyle='#A2A4AD';
        ctx.beginPath();
        ctx.moveTo(56,11);ctx.lineTo(77,3);ctx.lineTo(96,8);ctx.lineTo(109,18);
        ctx.lineTo(114,29);ctx.lineTo(104,39);ctx.lineTo(88,42);
        ctx.lineTo(70,37);ctx.lineTo(57,28);ctx.closePath();ctx.fill();

        // tai
        ctx.fillStyle='#696E77';
        ctx.beginPath();ctx.moveTo(65,10);ctx.lineTo(59,-6);ctx.lineTo(78,5);ctx.closePath();ctx.fill();
        ctx.beginPath();ctx.moveTo(91,8);ctx.lineTo(103,-5);ctx.lineTo(104,16);ctx.closePath();ctx.fill();
        ctx.fillStyle='#30343B';
        ctx.beginPath();ctx.moveTo(64,5);ctx.lineTo(63,0);ctx.lineTo(72,6);ctx.closePath();ctx.fill();
        ctx.beginPath();ctx.moveTo(96,7);ctx.lineTo(101,0);ctx.lineTo(101,11);ctx.closePath();ctx.fill();

        // bờm gai
        ctx.fillStyle='#454A54';
        for(let i=0;i<8;i++){
            ctx.beginPath();ctx.moveTo(14+i*9,18);ctx.lineTo(8+i*10,4+(i%2)*4);ctx.lineTo(26+i*9,13);ctx.closePath();ctx.fill();
        }

        // mặt trước: trán, hai mắt phát sáng, sống mũi và mõm
        ctx.fillStyle='#252931';
        ctx.beginPath();ctx.moveTo(77,15);ctx.lineTo(94,15);ctx.lineTo(102,24);
        ctx.lineTo(96,34);ctx.lineTo(79,34);ctx.lineTo(73,25);ctx.closePath();ctx.fill();

        // hai mắt rõ ràng
        ctx.fillStyle='#FFB74D';
        ctx.beginPath();ctx.moveTo(78,19);ctx.lineTo(87,18);ctx.lineTo(86,24);ctx.lineTo(78,23);ctx.closePath();ctx.fill();
        ctx.beginPath();ctx.moveTo(91,18);ctx.lineTo(100,20);ctx.lineTo(99,25);ctx.lineTo(91,23);ctx.closePath();ctx.fill();

        // mũi
        ctx.fillStyle='#171A20';
        ctx.beginPath();ctx.moveTo(87,25);ctx.lineTo(96,25);ctx.lineTo(92,31);ctx.closePath();ctx.fill();

        // hàm / miệng có răng
        ctx.fillStyle='#383D45';
        ctx.fillRect(84,30,17,8);
        ctx.fillStyle='#E4E6EA';
        for(let i=0;i<4;i++) ctx.fillRect(86+i*4,30,2,4);

        // viền má
        ctx.strokeStyle='#1A1D22';ctx.lineWidth=3;
        ctx.beginPath();ctx.moveTo(73,27);ctx.lineTo(66,33);ctx.lineTo(78,37);ctx.stroke();

        // bốn chân
        ctx.strokeStyle='#1C2026';ctx.lineWidth=10;ctx.lineCap='round';
        ctx.beginPath();
        ctx.moveTo(25,57);ctx.lineTo(19,72);
        ctx.moveTo(49,59);ctx.lineTo(45,74);
        ctx.moveTo(75,58);ctx.lineTo(81,73);
        ctx.moveTo(91,54);ctx.lineTo(101,68);
        ctx.stroke();

        // móng vuốt
        ctx.strokeStyle='#FFB74D';ctx.lineWidth=3;
        for(const px of [17,43,79,99]){
            for(let i=0;i<2;i++){ctx.beginPath();ctx.moveTo(px,70+i*3);ctx.lineTo(px+8,68+i*4);ctx.stroke();}
        }

        // tay trước / vuốt
        ctx.strokeStyle='#1A1D22';ctx.lineWidth=7;
        ctx.beginPath();ctx.moveTo(79,38);ctx.lineTo(101,50);ctx.stroke();
        ctx.strokeStyle='#FFB74D';ctx.lineWidth=3;
        for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(98,48+i*4);ctx.lineTo(110,43+i*5);ctx.stroke();}

        if(this.state==='counter_prep'||this.state==='counter'){
            ctx.strokeStyle='#FFB74D';ctx.lineWidth=3;ctx.strokeRect(3,0,110,76);
        }
        if(this.state==='charge_prep'||this.state==='pillar_dive_prep'){
            ctx.strokeStyle='rgba(255,183,77,.72)';ctx.lineWidth=3;ctx.strokeRect(0,7,116,64);
        }
        if(this.state==='pillar_claw'){
            ctx.strokeStyle='rgba(255,183,77,.85)';ctx.lineWidth=4;ctx.beginPath();
            ctx.moveTo(20,8);ctx.lineTo(38,-8);ctx.moveTo(48,8);ctx.lineTo(66,-8);ctx.moveTo(76,8);ctx.lineTo(94,-8);ctx.stroke();
        }
        if(this.state==='pillar_slam'||this.state==='pillar_slam_prep'){
            ctx.strokeStyle='rgba(255,183,77,.85)';ctx.lineWidth=3;ctx.strokeRect(-6,10,128,60);
        }

        ctx.restore();

        if(this.state==='twin_prep'){
            ctx.fillStyle='#FFB74D';ctx.font='bold 12px Consolas, monospace';ctx.textAlign='center';
            ctx.fillText('TWIN SLASHER',this.cx(),this.y-18);ctx.textAlign='left';
        }
        if(this.state==='counter_prep'||this.state==='counter'){
            ctx.fillStyle='#FFEB3B';ctx.font='bold 12px Consolas, monospace';ctx.textAlign='center';
            ctx.fillText('COUNTER',this.cx(),this.y-18);ctx.textAlign='left';
        }
        if(this.pillarTime>=150 && this.getPlayerPillar() && this.state==='idle'){
            ctx.fillStyle='#FFB74D';ctx.font='bold 10px Consolas, monospace';ctx.textAlign='center';
            ctx.fillText('VERTICAL HUNT',this.cx(),this.y-34);ctx.textAlign='left';
        }
        if(this.state==='grab_go'||this.state==='grab_hold'||this.state==='grab_throw'){
            ctx.fillStyle='#FFB74D';ctx.font='bold 11px Consolas, monospace';ctx.textAlign='center';
            ctx.fillText(this.state==='grab_throw'?'THROW!':'GRAB',this.cx(),this.y-18);ctx.textAlign='left';
        }
        if(this.state==='pillar_dive_prep'||this.state==='pillar_dive'||this.state==='pillar_slam_prep'||this.state==='pillar_slam'){
            ctx.fillStyle='#FFB74D';ctx.font='bold 11px Consolas, monospace';ctx.textAlign='center';
            ctx.fillText('PILLAR HUNT',this.cx(),this.y-18);ctx.textAlign='left';
        }
        if(this.state==='pillar_claw_prep'||this.state==='pillar_claw'){
            ctx.fillStyle='#FFB74D';ctx.font='bold 11px Consolas, monospace';ctx.textAlign='center';
            ctx.fillText('CLAW FROM BELOW',this.cx(),this.y-18);ctx.textAlign='left';
        }

        ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
        ctx.fillStyle='black';ctx.fillRect(canvas.width/2-160,12,320,12);
        ctx.fillStyle='#FFB74D';ctx.fillRect(canvas.width/2-159,13,318*Math.max(0,this.hp/this.maxHp),10);
        ctx.fillStyle='white';ctx.font='bold 10px Consolas, monospace';ctx.textAlign='center';
        ctx.fillText(this.name+'  '+Math.max(0,Math.ceil(this.hp))+'/'+this.maxHp,canvas.width/2,35);ctx.textAlign='left'; ctx.restore();
    }
}
// BOSS_PART_END s0.SlashBeastBoss.1

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
