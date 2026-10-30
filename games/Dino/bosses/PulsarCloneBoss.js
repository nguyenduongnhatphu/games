// BOSS_FILE: PulsarCloneBoss
// BOSS_SNAPSHOT: 90b44e51b8a8c0ad12fba495a59e199c399e173aab86fbee147786ba09666942
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, CX, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, ctx, currentForm, dino, dojoMode, floatingTexts, frames, parry, projectiles, shakeTimer, visualEffects
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

// Nguồn: index.html:40849 · Dùng bởi: PulsarCloneBoss
// BOSS_PART_BEGIN s1.PULSAR_CLONE_PAL.1 EDITABLE
const PULSAR_CLONE_PAL = { body:'#E1F5FE', core:'#7E57C2', glow:'#CE93D8', dark:'#311B92' };
// BOSS_PART_END s1.PULSAR_CLONE_PAL.1

// Nguồn: index.html:40850 · Dùng bởi: PulsarCloneBoss
// BOSS_PART_BEGIN s1.PulsarCloneBoss.1 EDITABLE
class PulsarCloneBoss {
    constructor(level){
        this.phase=1; this.hp=60; this.maxHp=60; this.totalHp=200;
        this.w=48; this.h=54; this.x=canvas.width-210; this.y=320-this.h;
        this.name='PULSAR CLONE'; this.state='entering'; this.subTimer=0; this.facingLeft=true;
        this.invulnAll=true; this.vulnerable=0; this.jitter=0; this.lastAttack=''; this.atkBag=[];
        this.star=null; this.gravity=null; this.echo=null; this.guard=null; this.stars=[]; this.moveTarget=null;
        this.dash=null; this.hitCd=0; this.step=0; this.echoOffset=34;
    }
    cx(){ return this.x+this.w/2; }
    cy(){ return this.y+this.h/2; }
    faceP(){ this.facingLeft=(dino.x+dino.w/2)<this.cx(); }
    moveTo(tx,ty,sp){ let dx=tx-this.x,dy=ty-this.y,d=Math.hypot(dx,dy)||1; if(d<=sp){this.x=tx;this.y=ty;return true;} this.x+=dx/d*sp;this.y+=dy/d*sp;return false; }
    hurtP(n){ if(this.hitCd>0)return; if(!dino.isShielding()) dino.takeDamage(n); else parry(); this.hitCd=14; }
    resetPhase(hp){
        this.phase++; this.hp=hp; this.maxHp=hp; this.state='phase_shift'; this.subTimer=0; this.vulnerable=55; this.invulnAll=true;
        this.star=null; this.gravity=null; this.echo=null; this.guard=null; this.stars.length=0; this.dash=null; this.atkBag=[];
        bossProjectiles.length=0; shakeTimer=16; SFX.tone(640,0.16,'sine',0.18,220);
        floatingTexts.push(new FloatingText(this.cx(),this.y-28,'PULSAR CLONE — P'+this.phase));
    }
    chooseAttack(){
        let pool=this.phase===1?['star','gravity','echo']:this.phase===2?['star_gravity','counter','echo','dash_burst']:['counter','star_gravity','starfall','echo','dash_burst'];
        if(this.atkBag.length===0){ this.atkBag=pool.slice(); for(let i=this.atkBag.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1)),t=this.atkBag[i];this.atkBag[i]=this.atkBag[j];this.atkBag[j]=t;} if(this.atkBag[0]===this.lastAttack&&this.atkBag.length>1){let t=this.atkBag[0];this.atkBag[0]=this.atkBag[1];this.atkBag[1]=t;} }
        this.lastAttack=this.atkBag.shift(); this.state=this.lastAttack; this.subTimer=0; this.step=0;
    }
    spawnStar(x=this.cx(),y=130){ this.star={x,y,t:0,angle:Math.random()*Math.PI*2}; }
    starBurst(star,count=6,speed=5,offset=0){ for(let i=0;i<count;i++){let a=star.angle+offset+i*Math.PI*2/count;let p=new BossProjectile(star.x-8,star.y-8,Math.cos(a)*speed,Math.sin(a)*speed,false,1);p.color='#CE93D8';p.pulsarClone=true;bossProjectiles.push(p);} }
    startGravity(){ this.gravity={x:this.cx(),y:this.cy()-10,r:this.phase===1?165:185,t:0,hit:false}; }
    startEcho(){
        let dir=(dino.x+dino.w/2)<this.cx()?-1:1;
        // Echo co y cach nguoi choi mot khoang nhin thay ro, khong de trung len nguoi choi.
        this.echo={x:dino.x+dino.w/2+dir*this.echoOffset,y:dino.y+dino.h/2,t:0,delay:38,hit:false};
    }
    startGuard(){ this.guard={t:0,ammo:0,flash:0}; }
    startDashBurst(){ this.dash={t:0,stage:0,x:this.x,y:this.y,tx:0,ty:0}; }
    startStarfall(){
        // Pulsar Ultimate goc: ngoi sao ROI TU TREN XUONG, tung qua mot, khong roi dong thoi.
        // Moi ngoi sao chon mot diem dap khac nhau; sau khi cham dat moi toa dan thanh nhieu dot.
        let xs=[canvas.width*0.20,canvas.width*0.52,canvas.width*0.80];
        this.stars=xs.map((x,i)=>({x,targetX:x,y:-70-i*12,t:-i*52,angle:Math.random()*6.28,stage:'fall',wave:0,done:false}));
    }
    absorbPlayerShots(){
        if(!this.guard)return;
        let g=this.guard;
        for(let i=projectiles.length-1;i>=0;i--){
            let p=projectiles[i]; if(!p||p.owner!==1||p._pulsarAbsorbed)continue;
            let px=p.x+p.w/2,py=p.y+p.h/2,dx=px-this.cx(),dy=py-this.cy();
            if(Math.hypot(dx,dy)<112){
                p._pulsarAbsorbed=true; projectiles.splice(i,1); g.ammo+=Math.max(1,Math.min(5,Math.ceil((p.dmg||1)/1.5)));
                visualEffects.push(new Effect(px,py,'explosion',true,12));
            }
        }
    }
    returnVolley(){
        let n=Math.max(8,Math.min(30,8+this.guard.ammo*2));
        let speed=5.5+(this.phase-1)*0.4;
        for(let i=0;i<n;i++){let a=this.guard.t*0.07+i*Math.PI*2/n;let p=new BossProjectile(this.cx()-8,this.cy()-8,Math.cos(a)*speed,Math.sin(a)*speed,false,1);p.color=i%2?'#E1BEE7':'#7E57C2';p.pulsarClone=true;bossProjectiles.push(p);}
        shakeTimer=8; SFX.tone(880,0.08,'sine',0.14,420);
        floatingTexts.push(new FloatingText(this.cx(),this.y-24,'PULSAR RETURN ×'+n));
    }
    update(){
        if(this.hitCd>0)this.hitCd--; if(this.jitter>0)this.jitter--;
        this.invulnAll=(this.state==='entering'||this.state==='phase_shift'||this.vulnerable>0||this.state==='starfall');
        if(this.vulnerable>0)this.vulnerable--;
        if(this.hp<=0&&this.phase<3){this.resetPhase(this.phase===1?70:70);return;}
        if(this.hp<=0&&this.phase===3){this.state='dying';this.subTimer=0;return;}
        if(this.state==='dying'){this.subTimer++;if(this.subTimer>45)this.hp=0;return;}
        if(this.state==='entering'){this.faceP();if(this.moveTo(canvas.width-210,320-this.h,8)){this.state='idle';this.subTimer=0;}return;}
        if(this.state==='phase_shift'){this.subTimer++;this.y+=(320-this.h-this.y)*0.08;if(this.subTimer>45){this.state='idle';this.subTimer=0;}return;}
        if(this.state==='idle'){
            // Clone phai CO CHUYEN DONG ro rang ngay tu Phase 1: luon doi ben, khong dung yen canh player.
            this.faceP(); this.subTimer++;
            let px=dino.x+dino.w/2, py=dino.y+dino.h/2;
            let side=(Math.floor(this.subTimer/70)%2===0)?1:-1;
            let tx=Math.max(90,Math.min(canvas.width-150,px+side*110));
            let ty=Math.max(150,Math.min(270,py-25 + Math.sin(this.subTimer*0.045)*28));
            this.x+=(tx-this.x)*0.055; this.y+=(ty-this.y)*0.055;
            if(this.subTimer>42)this.chooseAttack(); return;
        }
        // GENERIC PARRY RECOVERY: hệ thống parry chung có thể đổi state của boss thành 'returning'.
        // Pulsar Clone phải luôn có đường thoát khỏi state này; nếu không, update() sẽ rơi xuống cuối
        // hàm và boss giữ nguyên vị trí/không còn AI. Đồng thời hủy mọi attack object đang dang dở.
        if(this.state==='returning'){
            this.subTimer++;
            this.star=null; this.gravity=null; this.echo=null; this.guard=null; this.dash=null;
            this.stars.length=0;
            this.invulnAll=false;
            // Lui nhẹ khỏi người chơi rồi quay lại vị trí chiến đấu, thay vì đứng im.
            let px=dino.x+dino.w/2, away=this.cx()>=px?1:-1;
            let tx=Math.max(90,Math.min(canvas.width-150,px+away*155));
            let ty=Math.max(150,Math.min(270,dino.y+dino.h/2-25));
            this.x+=(tx-this.x)*0.10; this.y+=(ty-this.y)*0.10; this.faceP();
            if(this.subTimer>=26){
                this.state='vulnerable'; this.subTimer=0; this.vulnerable=34;
                this.atkBag=[]; // không lặp lại ngay chuỗi tấn công vừa bị phá
            }
            return;
        }
        if(this.state==='vulnerable'){this.subTimer++;this.x+=(Math.max(100,Math.min(canvas.width-180,dino.x+(dino.w/2)+(this.facingLeft?100:-100)))-this.x)*0.025;if(this.subTimer>this.vulnerable+8){this.state='idle';this.subTimer=0;this.vulnerable=0;}return;}
        if(this.state==='star'){
            this.subTimer++; if(!this.star)this.spawnStar(); this.star.t++;this.star.angle+=0.085;
            if(this.subTimer%34===1)this.starBurst(this.star,this.phase===1?6:7,4.8+(this.phase-1)*0.35,Math.floor(this.subTimer/34)*0.18);
            this.x+=(this.star.x-this.x)*0.012;
            if(this.subTimer>130){this.star=null;this.state='vulnerable';this.subTimer=0;this.vulnerable=65;}return;
        }
        if(this.state==='gravity'){
            this.subTimer++;if(!this.gravity)this.startGravity();let g=this.gravity;g.t++;this.x+=(g.x-this.x)*0.018;
            if(g.t>30&&g.t<105){let dx=(dino.x+dino.w/2)-g.x,dy=(dino.y+dino.h/2)-g.y,d=Math.hypot(dx,dy)||1;if(d<g.r){dino.x+=(-dx/d)*0.30;dino.y+=(-dy/d)*0.12;}if(d<48&&!g.hit){this.hurtP(1);g.hit=true;}}
            if(this.subTimer>118){this.gravity=null;this.state='vulnerable';this.subTimer=0;this.vulnerable=55;}return;
        }
        if(this.state==='star_gravity'){
            this.subTimer++;if(!this.star)this.spawnStar();if(!this.gravity)this.startGravity();this.star.t++;this.star.angle+=0.095;this.gravity.t++;
            if(this.subTimer%40===1)this.starBurst(this.star,6,5.0,Math.floor(this.subTimer/40)*0.22);
            let g=this.gravity; if(g.t>35&&g.t<118){let dx=(dino.x+dino.w/2)-g.x,dy=(dino.y+dino.h/2)-g.y,d=Math.hypot(dx,dy)||1;if(d<g.r){dino.x+=(-dx/d)*0.32;dino.y+=(-dy/d)*0.13;}if(d<48&&!g.hit){this.hurtP(1);g.hit=true;}}
            if(this.subTimer>145){this.star=null;this.gravity=null;this.state='vulnerable';this.subTimer=0;this.vulnerable=68;}return;
        }
        if(this.state==='echo'){
            this.subTimer++;if(!this.echo)this.startEcho();let e=this.echo;e.t++;
            if(e.t<e.delay){e.x+=(dino.x+dino.w/2+(dino.x<this.x?34:-34)-e.x)*0.045;e.y+=(dino.y+dino.h/2-e.y)*0.045;}
            if(e.t===e.delay){for(let k=-1;k<=1;k++){let a=Math.atan2((dino.y+dino.h/2)-e.y,(dino.x+dino.w/2)-e.x)+k*0.32;let p=new BossProjectile(e.x-8,e.y-8,Math.cos(a)*6.2,Math.sin(a)*6.2,false,1);p.color='#7E57C2';p.pulsarClone=true;bossProjectiles.push(p);}e.hit=false;}
            if(e.t>e.delay+28&&!e.hit){let dx=(dino.x+dino.w/2)-e.x,dy=(dino.y+dino.h/2)-e.y;if(Math.hypot(dx,dy)<30){this.hurtP(1);e.hit=true;}}
            if(e.t>e.delay+48){this.echo=null;this.state='vulnerable';this.subTimer=0;this.vulnerable=52;}return;
        }
        if(this.state==='counter'){
            this.subTimer++;if(!this.guard)this.startGuard();this.guard.t++;this.absorbPlayerShots();
            this.x+=(Math.max(110,Math.min(canvas.width-180,dino.x+dino.w/2+(dino.x<this.x?80:-80)))-this.x)*0.018;
            if(this.guard.t%22===0&&this.guard.ammo>0){this.returnVolley();this.guard.ammo=0;}
            if(this.guard.t>105){if(this.guard.ammo>0)this.returnVolley();this.guard=null;this.state='vulnerable';this.subTimer=0;this.vulnerable=62;}return;
        }
        if(this.state==='dash_burst'){
            this.subTimer++;if(!this.dash)this.startDashBurst();let d=this.dash;
            if(d.stage===0){d.t++;if(d.t===1){d.tx=Math.max(90,Math.min(canvas.width-160,dino.x+dino.w/2+(dino.x<this.x?100:-100)));d.ty=Math.max(150,Math.min(270,dino.y+dino.h/2-25));}if(d.t>20){d.stage=1;d.t=0;}}
            else if(d.stage===1){let done=this.moveTo(d.tx-this.w/2,d.ty-this.h/2,12);if(frames%4===0)visualEffects.push(new Effect(this.cx(),this.cy(),'explosion',true,12));if(done){for(let i=0;i<7;i++){let a=i*Math.PI*2/7;let p=new BossProjectile(this.cx()-8,this.cy()-8,Math.cos(a)*4.8,Math.sin(a)*4.8,false,1);p.color='#CE93D8';p.pulsarClone=true;bossProjectiles.push(p);}d.stage=2;d.t=0;}}
            else {d.t++;if(d.t>24){this.dash=null;this.state='vulnerable';this.subTimer=0;this.vulnerable=52;}}return;
        }
        if(this.state==='starfall'){
            // STARFALL: tung ngoi sao roi xuong nhu Pulsar that, cham dat moi no.
            // Khong co 3 ngoi sao cung ton tai tren man hinh va cung no mot luc.
            this.subTimer++; if(this.stars.length===0)this.startStarfall(); this.invulnAll=true;
            for(let s of this.stars){
                s.t++;
                if(s.t<0) continue;
                if(s.stage==='fall'){
                    // Roi nhanh dan, co chut xien theo muc tieu de tao cam giac thien thach.
                    s.y += 7.2 + this.phase*0.35;
                    s.x += (s.targetX-s.x)*0.018;
                    if(s.y>=285){
                        s.y=300; s.stage='burst'; s.wave=0; s.burstT=0;
                        shakeTimer=Math.max(shakeTimer,12);
                        visualEffects.push(new Effect(s.x,s.y,'explosion',true,1.6));
                        if(typeof SFX!=='undefined'&&SFX.tone) SFX.tone(150,0.16,'sawtooth',0.20,70);
                    }
                } else if(s.stage==='burst'){
                    s.burstT++;
                    // Hai dot toa cach nhau: wave 1 mo, wave 2 xoay lech 15 do.
                    if((s.burstT===4||s.burstT===22)&&s.wave<2){
                        let off=s.wave===0?s.angle:s.angle+Math.PI/12;
                        this.starBurst(s,12,5.0+(this.phase-1)*0.25,off);
                        s.wave++; shakeTimer=Math.max(shakeTimer,5);
                    }
                    if(s.burstT>38){s.done=true;s.stage='done';}
                }
            }
            if(this.stars.length && this.stars.every(s=>s.done)){
                this.stars.length=0; this.state='vulnerable'; this.subTimer=0; this.vulnerable=92;
            }
            return;
        }
    }
    drawClone(x,y,alpha=1){
        ctx.save();ctx.globalAlpha=alpha;
        try{ let legAnim=frames%20<10?3:0; dino.drawForm(false,x,y,legAnim,typeof currentForm!=='undefined'?currentForm:0,this.facingLeft,PULSAR_CLONE_PAL); }catch(e){
            ctx.fillStyle=PULSAR_CLONE_PAL.body;ctx.fillRect(x,y,this.w,this.h);ctx.fillStyle=PULSAR_CLONE_PAL.core;ctx.fillRect(x+8,y+10,this.w-16,18);ctx.fillStyle=PULSAR_CLONE_PAL.dark;ctx.fillRect(x+12,y+34,9,8);ctx.fillRect(x+27,y+34,9,8);
        }
        ctx.restore();
    }
    draw(){
        let jx=this.jitter>0?(Math.random()-0.5)*5:0,jy=this.jitter>0?(Math.random()-0.5)*5:0,x=this.x+jx,y=this.y+jy,cx=x+this.w/2,cy=y+this.h/2;
        // Core star / gravity
        if(this.star){let s=this.star;ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.angle);ctx.shadowBlur=18;ctx.shadowColor='#CE93D8';ctx.fillStyle='#7E57C2';ctx.beginPath();for(let i=0;i<10;i++){let a=-Math.PI/2+i*Math.PI/5,r=i%2?11:30;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.fill();ctx.strokeStyle='#F3E5F5';ctx.lineWidth=2;ctx.stroke();ctx.restore();}
        if(this.gravity){let g=this.gravity;let p=Math.min(1,g.t/25);ctx.save();ctx.fillStyle='rgba(126,87,194,0.07)';ctx.beginPath();ctx.arc(g.x,g.y,g.r,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(206,147,216,'+(0.3+0.4*p)+')';ctx.lineWidth=2;ctx.setLineDash([8,8]);ctx.beginPath();ctx.arc(g.x,g.y,g.r,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);ctx.restore();}
        // Counter: ro rang sang, hut dan vao core
        if(this.guard){let p=0.5+0.25*Math.sin(frames*0.16);ctx.save();ctx.strokeStyle='rgba(225,190,231,'+p+')';ctx.lineWidth=3;ctx.shadowBlur=16;ctx.shadowColor='#7E57C2';ctx.beginPath();ctx.arc(cx,cy,112+Math.sin(frames*0.08)*5,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(126,87,194,0.12)';ctx.beginPath();ctx.arc(cx,cy,96,0,Math.PI*2);ctx.fill();ctx.restore();}
        // Echo: cach player mot khoang ro rang
        if(this.echo){let e=this.echo;ctx.save();ctx.globalAlpha=e.t<e.delay?0.42:0.7;ctx.setLineDash([5,5]);ctx.strokeStyle='#CE93D8';ctx.lineWidth=2;ctx.beginPath();ctx.arc(e.x,e.y,25,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);this.drawClone(e.x-this.w/2,e.y-this.h/2,e.t<e.delay?0.38:0.62);ctx.restore();}
        // STARFALL: hien ro thien thach dang ROI + vung dap, khong phai marker dung yen.
        for(let s of this.stars){
            if(s.t<0)continue;
            ctx.save();
            if(s.stage==='fall'){
                let len=72;
                ctx.strokeStyle='rgba(206,147,216,0.38)';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(s.x,s.y-len);ctx.lineTo(s.x,s.y-8);ctx.stroke();
                ctx.translate(s.x,s.y);ctx.rotate(s.angle);
                ctx.shadowBlur=20;ctx.shadowColor='#CE93D8';ctx.fillStyle='#7E57C2';ctx.beginPath();
                for(let i=0;i<10;i++){let a=-Math.PI/2+i*Math.PI/5,r=i%2?12:30;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.fill();ctx.strokeStyle='#F3E5F5';ctx.lineWidth=2;ctx.stroke();
            } else if(s.stage==='burst'){
                ctx.translate(s.x,s.y);let q=Math.min(1,(s.burstT||0)/10);ctx.strokeStyle='rgba(206,147,216,'+(0.35+0.55*q)+')';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,24+q*22,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(126,87,194,0.20)';ctx.beginPath();ctx.arc(0,0,16,0,Math.PI*2);ctx.fill();
            }
            ctx.restore();
        }
        // Clone body: same silhouette as player, with Pulsar core
        this.drawClone(x,y,this.invulnAll?0.82:1);
        ctx.save();ctx.translate(cx,cy);ctx.rotate(frames*0.08);ctx.strokeStyle='#E1BEE7';ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<8;i++){let a=i*Math.PI/4,r=i%2?10:16;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.stroke();ctx.restore();
        // HP
        ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
        ctx.fillStyle='black';ctx.fillRect(canvas.width/2-160,6,320,12);ctx.fillStyle='#CE93D8';ctx.fillRect(canvas.width/2-158,8,316*Math.max(0,this.hp/this.maxHp),8);ctx.fillStyle='white';ctx.font='bold 11px Consolas, monospace';ctx.textAlign='center';ctx.fillText(this.name+'  P'+this.phase+'  '+this.hp+'/'+this.maxHp,CX,34);ctx.textAlign='left'; ctx.restore();
    }
}
// BOSS_PART_END s1.PulsarCloneBoss.1

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
