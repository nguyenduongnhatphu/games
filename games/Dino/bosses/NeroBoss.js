// BOSS_FILE: NeroBoss
// BOSS_SNAPSHOT: 3cf4652cd737d36361a15b25712b9a3ff21a9a13bbe8337913bcf233f06c6a1d
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NR_BREAKERS, NR_CHARGES, NR_H, NR_W, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, drawNeroBody, floatingTexts, frames, keoBiChan, parry, pickFromBag, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:9771 · Dùng bởi: NeroBoss
// BOSS_PART_BEGIN s0.NeroBoss.1 EDITABLE
class NeroBoss {
            constructor(level){
                this.name='NERO'; this.hp=126; this.maxHp=126; this.phase=1;
                this.w=NR_W; this.h=NR_H; this.baseY=320-this.h;
                this.x=canvas.width+30; this.y=this.baseY; this.dy=0; this.grounded=true;
                this.state='entering'; this.subTimer=0; this.actionTimer=60; this.facingLeft=true; this.invulnAll=true;
                this.burnTimer=0; this.lastMeleeHit=-1; this.lastSkill=''; this._bag=null;
                this.armR=0; this.gunAngle=0.45; this.gunDrawn=false;
                this.swordDrawn=false; this.swordAngle=-0.42; this.exceed=0; this.breakerGlow=0;
                this.combo=0; this.slashT=0; this.swingHit=false; this.dashDir=-1; this.dashHit=false;
                this.shots=0; this.snatch=null; this.launchHit=false; this.airTargetX=0;
                this.guardHits=0; this.guardCounter=false;
                // --- he thong Devil Breaker ---
                this.brIdx=0; this.brLeft=NR_CHARGES; this.brShake=0;
                this.echoes=[]; this.gang=null; this.spin=0; this.hrLoops=0; this.reachHt=62; this.vet=[]; this.bao=0; this.baoTen='';
                this.slamDone=false; this.helterMon=0; this.helterXuyen=false;
                this.blades=[];   // nam dam Punch Line — la muc tieu BAN VO DUOC (@@HE-MUCTIEU)
                this.mines=[];    // min dien Overture
                this.revs=1;      // khoi dau co san 1 nac Exceed de lao vao ngay
                this.hitStop=0;
                this.aiRieng=true; this.chuoi=[]; this.noiThem=0; this.trungLuc=-999; this.kiem=[]; this.muzzle=0; this.revFx=0;   // @@HE-NERO-DMC5
                // Bien co dong & hieu ung bo sung
                this.dashV=0; this.ghosts=[]; this._cshots=[]; this._petals=[]; this._fists=[]; this._xWave=0;
            }
            br(){ return NR_BREAKERS[this.brIdx % NR_BREAKERS.length]; }
            spd(){ return (this.phase===2 ? 1.22 : 0.98) * (1 + 0.02 * this.revLevel()); }
            hurtP(n){ if(!dino.isShielding()) dino.takeDamage(n); else parry(); }
            ghost(){
                if(this.ghosts.length>=5)this.ghosts.shift();
                this.ghosts.push({x:this.x,y:this.y,left:this.facingLeft,sword:this.swordDrawn,sa:this.swordAngle,armR:this.armR,t:12});
            }
            physics(){
                this.dy+=0.64; this.y+=this.dy;
                this.x+=this.dashV; this.dashV*=0.84;
                if(Math.abs(this.dashV)<0.35)this.dashV=0;
                if(this.y>=this.baseY){this.y=this.baseY;this.dy=0;this.grounded=true;} else this.grounded=false;
                this.x=Math.max(8,Math.min(canvas.width-this.w-8,this.x));
            }
            // ===== CO CHE MOI: BUOC THEO BANG DONG CO RED QUEEN (Jet Lunge Tracking) =====
            // Khac phuc triet de loi dung vung kiem tai cho: moi nhat chem se day Nero lao theo khoang cach thuc te
            // Giảm khoảng cách bám và giảm tốc độ lướt tối đa đi ~40%
            buocTheo(coBan, toiDa){
                this.faceP();
                let g = this.gap(), ad = Math.abs(g), d = this.dir();
                let r = this.revLevel();
                // Chỉ nhích theo khi ở trong tầm vừa phải (< 180px), nếu người chơi đã chủ động chạy xa thì cho họ thoát
                if (ad > 54 && ad < 180){
                    let luc = Math.min((toiDa * 0.6) + r * 1.0, (coBan * 0.55) + (ad - 54) * 0.12);
                    this.dashV = d * luc;
                    if (luc > 9) this.ghost();
                } else {
                    this.dashV = d * 1.8;
                }
            }
            toIdle(t){
                this.state='idle'; this.subTimer=0; this.actionTimer=Math.max(24,Math.round(t*1.35/this.spd()));
                this.combo=0; this.slashT=0; this.swingHit=false;
                this.gunDrawn=false; this.swordDrawn=false; this.breakerGlow=0; this.armR=0;
                this.snatch=null; this.exceed=this.revs>0?1:0;
                this.slamDone=false; this.launchHit=false; this.hrLoops=0; this.reachHt=62; this.dashHit=false;
                this.helterMon=0; this.helterXuyen=false; this.guardHits=0;
            }
            dungTay(){
                if(this.phase===2) return;
                this.brLeft--;
                if(this.brLeft<=0) this.pendingBreak=true;
            }
            voTay(){
                this.pendingBreak=false;
                for(let k=0;k<10;k++){
                    let a=Math.random()*Math.PI*2, d=10+Math.random()*26;
                    visualEffects.push(new Effect(this.cx()+Math.cos(a)*d, this.cy()+Math.sin(a)*d, 'explosion', true, 14));
                }
                floatingTexts.push(new FloatingText(this.x-30,this.y-34,'TAY GÃY!'));
                shakeTimer=Math.max(shakeTimer,20);
                if(SFX.tone)SFX.tone(150,0.30,'square',0.20,70);
                this.brIdx++; this.brLeft=NR_CHARGES; this.brShake=30;
                this.state='br_broken'; this.subTimer=0;
            }
            fireBlueRose(charged,spread){
                let sx=this.cx()+this.dir()*20, sy=this.y+24, tx=dino.x+dino.w/2, ty=dino.y+dino.h/2;
                let dx=tx-sx,dy=ty-sy,speed=charged?13.5:15;
                let a=Math.atan2(dy,dx)+(spread||0),p=new BossProjectile(sx,sy,Math.cos(a)*speed,Math.sin(a)*speed,false,1);
                p.w=charged?25:14;p.h=charged?18:8;p.x-=p.w/2;p.y-=p.h/2;p.color=charged?'#FF7043':'#42A5F5';p.frail=true;
                bossProjectiles.push(p);
            }
            fireCrescent(bigger){
                let sx=this.cx()+this.dir()*22, sy=this.y+26;
                let p=new BossProjectile(sx,sy,this.dir()*(this.phase===2?16:13.5),0,true,1);
                p.w=bigger?96:72; p.h=bigger?32:24; p.color=bigger?'#FF3D00':'#FFAB91'; p.frail=true; p.crescent=true;
                bossProjectiles.push(p);
                visualEffects.push(new Effect(sx+this.dir()*30,sy,'lightning_shock',true,26)); shakeTimer=Math.max(shakeTimer,10);
            }
            bladeBox(reach){let d=this.dir();return {x:d>0?this.x+this.w-6:this.x-reach,y:this.y+9,w:reach+6,h:50};}
            swing(reach){if(!this.swingHit&&checkAABB(dino,this.bladeBox(reach))){this.swingHit=true;this.hurtP(1);}}
            banNamDam(n){
                for(let k=0;k<n;k++){
                    this.blades.push({ x:this.cx()+this.dir()*18, y:this.y+26+(k-(n-1)/2)*16,
                                       vx:this.dir()*8.5, vy:0, life:190, dead:false, hitCd:0, t:k*7 });
                }
                if(SFX.bossSkill)SFX.bossSkill();
            }
            tickBlades(){
                for(let i=this.blades.length-1;i>=0;i--){
                    let f=this.blades[i]; f.life--; f.t++;
                    if(f.t>8){
                        let tx=dino.x+dino.w/2, ty=dino.y+dino.h/2;
                        let a=Math.atan2(ty-f.y,tx-f.x), sp=this.phase===2?9.2:8.0;
                        f.vx += (Math.cos(a)*sp-f.vx)*0.11; f.vy += (Math.sin(a)*sp-f.vy)*0.11;
                    }
                    f.x+=f.vx; f.y+=f.vy;
                    if(f.hitCd>0)f.hitCd--;
                    if(f.hitCd<=0 && checkAABB(dino,{x:f.x-13,y:f.y-13,w:26,h:26})){ f.hitCd=40; this.hurtP(1); f.vx*=-0.6; f.vy*=-0.6; }
                    if(f.life<=0||f.dead||f.hp<=0||f.x<-60||f.x>canvas.width+60||f.y>400||f.y<-80){
                        visualEffects.push(new Effect(f.x,f.y,'explosion',true,18)); this.blades.splice(i,1);
                    }
                }
            }
            datMin(x,y){ this.mines.push({x:x,y:y,t:0,no:false}); }
            tickMines(){
                for(let i=this.mines.length-1;i>=0;i--){
                    let m=this.mines[i]; m.t++;
                    if(m.t===Math.round(48/this.spd())){
                        visualEffects.push(new Effect(m.x,m.y,'lightning_burst',true,1.2));
                        if(Math.hypot((dino.x+dino.w/2)-m.x,(dino.y+dino.h/2)-m.y)<74) this.hurtP(1);
                        shakeTimer=Math.max(shakeTimer,12); if(SFX.tone)SFX.tone(900,0.10,'square',0.14,220);
                        this.mines.splice(i,1);
                    }
                }
            }
            // ===== WIRE SNATCH 2 CHIEU SIEU TOC: Vừa kéo mục tiêu vừa phóng Nero bay tới =====
            tickSnatch(){
                let c=this.snatch;if(!c)return;
                if(c.st==='out'){
                    c.len+=34; // Nhanh hon han ban cu (24 -> 34)
                    let hx=this.cx()+c.dir*c.len,hy=this.cy()+c.vy*c.len;
                    if(!c.hit&&checkAABB(dino,{x:hx-38,y:hy-38,w:76,h:76})){
                        c.hit=true;c.st='pull';c.len=Math.abs((dino.x+dino.w/2)-this.cx());
                        if (keoBiChan()) c.tuKeo = true;
                        floatingTexts.push(new FloatingText(dino.x-24,dino.y-30, c.tuKeo?'HELL BOUND!':'SNATCH!'));
                        if(SFX.bossSkill)SFX.bossSkill();
                    }
                    // Kéo trượt ở tầm 360px thì thu dây về chứ không tự phóng người tới nữa
                    if(!c.hit && c.len>360) c.st='back';
                }else if(c.st==='pull'){
                    c.len-=30;
                    this.ghost();
                    if(c.tuKeo){
                        // Nero phong minh lao thang toi truoc mat nguoi choi
                        let nx=(dino.x+dino.w/2)-c.dir*Math.max(48,c.len*0.5)-this.w/2;
                        this.x+=(nx-this.x)*0.48;
                        this.y+=((this.baseY)-this.y)*0.35; this.dy=0;
                        visualEffects.push(new Effect(this.cx(),this.cy(),'explosion',true,12));
                    }else{
                        // Keo ca 2 lai gan nhau (vua keo nguoi choi vua nhich Nero len)
                        let tx=this.cx()+c.dir*Math.max(46,c.len)-dino.w/2;
                        dino.x+=(tx-dino.x)*0.42;
                        this.x+=c.dir*4.5;
                        if(dino.dy>0)dino.dy*=0.5;
                    }
                    if(c.len<=56)c.st='back';
                }else{c.len-=36;if(c.len<=0)this.snatch=null;}
            }
            startPhase2(){
                this.phase=2;this.hp=108;this.maxHp=108;this.name='NERO — DEVIL TRIGGER';this.invulnAll=true;
                this.state='dt_wake';this.subTimer=0;this._bag=null;this.y=this.baseY;this.dy=0;this.exceed=1;
                this.gunDrawn=false;this.swordDrawn=false;this.breakerGlow=0;this.pendingBreak=false;this.brLeft=NR_CHARGES;
                bossProjectiles.length=0;
                floatingTexts.push(new FloatingText(this.x-46,this.y-38,'DEVIL TRIGGER!'));
                visualEffects.push(new Effect(this.cx(),this.cy(),'lightning_burst',true,1.5));shakeTimer=Math.max(shakeTimer,24);
                if(SFX.tone)SFX.tone(140,0.46,'sawtooth',0.24,62);
            }
            revLevel(){ return this.phase===2 ? Math.max(2,this.revs) : this.revs; }
            revUp(){
                if(this.revs>=3) return;
                this.revs++; this.exceed=1; this.revFx=12;
                floatingTexts.push(new FloatingText(this.x-10,this.y-24-this.revs*10,'EXCEED '+this.revs));
                visualEffects.push(new Effect(this.cx()+this.dir()*14,this.cy(),'explosion',true,12+this.revs*4));
                if(SFX.tone)SFX.tone(280+this.revs*150,0.06,'sawtooth',0.12,190);
            }
            // Mot nhat chem co kem EX-ACT tu dong nap lai Exceed ngay giua don
            chem(reach, ket, huong){
                let r=this.revLevel();
                this.slashT=ket?13:9; this.swingHit=false;
                this.reachHt=reach+r*10+(ket?16:0);
                this.vet.push({ t:ket?15:11, max:ket?15:11, dir:this.dir(), reach:this.reachHt,
                                mau: r>=3?'#FF3D00':(r>=2?'#FF9100':(r>=1?'#FFCC80':'#E3F2FD')),
                                day: ket?8.5:5.5, goc: (huong===undefined?0:huong), ket:!!ket });
                if(r>0){
                    let bx=this.dir()>0?this.x+this.w:this.x-this.reachHt;
                    visualEffects.push(new Effect(bx+this.dir()*this.reachHt/2,this.y+28,'explosion',true,12+r*6));
                }
                if(ket&&r>=2) this.fireCrescent(r>=3);
                if(this.phase===2) this.datEcho(this.reachHt+64, 11);
                // EX-ACT TIMING: Moi nhat chem co 55% co hoi giat ga nap them 1 nac Exceed tai cho!
                if(!ket && this.revs < 3 && Math.random() < 0.55){
                    this.revs++; this.exceed = 1; this.revFx = 10;
                } else if (ket && this.phase !== 2 && this.revs > 0){
                    this.revs = Math.max(1, this.revs - 1); // Xả bớt sau đòn kết nhưng giữ lại 1 nấc nền
                }
                if(SFX.tone)SFX.tone(ket?300:480,0.05,'square',0.10,ket?200:280);
            }
            datEcho(reach, tre){ this.echoes.push({t:tre, max:tre, reach:reach, dir:this.dir(), x:this.cx(), y:this.cy(), ve:0}); }
            veCanh(){
                for(let e of this.echoes){
                    let sap = e.ve>0 ? 1 : Math.max(0, 1-e.t/Math.max(1,e.max));
                    let ax=this.cx(), ay=this.cy()-6;
                    ctx.save();
                    ctx.globalAlpha = e.ve>0 ? (e.ve/10)*0.85 : 0.20+0.35*sap;
                    for(let ss of[-1,1]){
                        let xoe=(e.ve>0)? 1.15 : (0.25+0.55*sap);
                        ctx.strokeStyle=e.ve>0?'#B3E5FC':'#00E5FF'; ctx.lineWidth=e.ve>0?5.5:3.2; ctx.lineCap='round';
                        ctx.beginPath(); ctx.moveTo(ax,ay);
                        ctx.quadraticCurveTo(ax+e.dir*e.reach*0.55, ay+ss*38*xoe,
                                             ax+e.dir*e.reach*(e.ve>0?1:0.72), ay+ss*20*xoe);
                        ctx.stroke();
                        if(e.ve>0){
                            let hx=ax+e.dir*e.reach, hy=ay+ss*20*xoe;
                            ctx.lineWidth=3;
                            for(let g=-1;g<=1;g++){
                                ctx.beginPath(); ctx.moveTo(hx-e.dir*10,hy);
                                ctx.lineTo(hx+e.dir*13, hy+g*11);
                                ctx.stroke();
                            }
                        }
                    }
                    ctx.restore();
                }
            }
            tickVet(){ for(let i=this.vet.length-1;i>=0;i--){ if(--this.vet[i].t<=0) this.vet.splice(i,1); } }
            veVet(){
                for(let a of this.vet){
                    let cxS = a.dir<0 ? this.x : this.x+this.w;
                    let cyS = this.y + this.h/2 + a.goc*22;
                    ctx.save(); ctx.globalAlpha = Math.min(1, a.t/(a.max*0.55));
                    ctx.strokeStyle = a.mau; ctx.lineWidth = a.day; ctx.lineCap = 'round';
                    ctx.shadowColor = a.mau; ctx.shadowBlur = a.ket ? 14 : 8;
                    let mo = 1 - a.t/a.max;
                    let bd = a.ket ? 1.15 : 0.85;
                    for(let k=0;k<(a.ket?4:3);k++){
                        let R = Math.max(8, a.reach - k*15) * (0.72+0.28*mo);
                        ctx.beginPath();
                        ctx.arc(cxS, cyS, R, a.dir<0?Math.PI-bd:-bd, a.dir<0?Math.PI+bd:bd, false);
                        ctx.stroke();
                    }
                    if(a.ket){ ctx.globalAlpha*=0.65; ctx.strokeStyle='#FFFFFF'; ctx.lineWidth=2.5;
                        ctx.beginPath(); ctx.arc(cxS,cyS,a.reach*(0.72+0.28*mo),a.dir<0?Math.PI-bd:-bd,a.dir<0?Math.PI+bd:bd,false); ctx.stroke(); }
                    ctx.restore();
                }
            }
            tickEcho(){
                for(let i=this.echoes.length-1;i>=0;i--){
                    let e=this.echoes[i]; e.t--;
                    if(e.ve>0){ if(--e.ve<=0) this.echoes.splice(i,1); continue; }
                    if(e.t>0) continue;
                    let bx={x:e.dir>0?e.x+10:e.x-e.reach-10,y:this.y-14,w:e.reach,h:88};
                    visualEffects.push(new Effect(e.x+e.dir*(e.reach*0.7),this.y+26,'lightning_shock',true,30));
                    if(checkAABB(dino,bx)) this.hurtP(1);
                    if(SFX.tone)SFX.tone(160,0.07,'sawtooth',0.13,90);
                    e.ve=10;
                    if(e.t<-10) this.echoes.splice(i,1);
                    continue;
                }
            }
            update(){
                if(this.breakerGlow>0)this.breakerGlow--;
                if(this.brShake>0)this.brShake--;
                if(this._xWave>0)this._xWave--;
                for(let i=this.ghosts.length-1;i>=0;i--){if(--this.ghosts[i].t<=0)this.ghosts.splice(i,1);}
                this.tickSnatch(); this.tickBlades(); this.tickMines(); this.tickEcho(); this.tickGang(); this.tickVet(); if(this.bao>0)this.bao--;
                this.nrKiemTick();     // @@HE-NERO-DMC5
                const T=(n)=>this.subTimer===Math.round(n/this.spd());
                const QUA=(n)=>this.subTimer>Math.round(n/this.spd());
                const HT=()=>{ if(this.slashT>0){this.slashT--;this.swing(this.reachHt||62);} };
                if (this.nrChieu(T, QUA, HT)) return;    // @@HE-NERO-DMC5

                if(this.state==='entering'){this.x-=6;if(this.x<=canvas.width-210){this.x=canvas.width-210;this.invulnAll=false;this.toIdle(28);}return;}
                if(this.state==='idle'){
                    this.physics();this.faceP();let g=this.gap(),ad=Math.abs(g);
                    // Giảm tốc độ đi bộ từ 4.8 xuống 2.8, giữ khoảng cách thở 110px
                    if (ad > 110) this.x += Math.sign(g) * (2.8 * this.spd());
                    else if (ad < 65) this.x -= Math.sign(g) * 1.5;
                    // Tăng ngưỡng chờ ở xa từ 28 lên 70 frame (~1.2 giây) mới lao vào
                    if(ad>260){ this.xaLau=(this.xaLau||0)+1; } else this.xaLau=0;
                    if(this.xaLau>Math.round(70/this.spd())){
                        this.xaLau=0;
                        if(!(this.chuoi&&this.chuoi.length))
                            this.chuoi=[pickFromBag(this,this.phase===2?['dt_calibur','snatch_prep','nr_payline']:['snatch_prep','calibur','nr_payline','streak_prep'])];
                        this.pickSkill(); return;
                    }
                    this.actionTimer--;if(this.actionTimer<=0)this.pickSkill();return;
                }
                if(this.state==='br_broken'){
                    this.physics(); this.subTimer++;
                    this.armR=Math.sin(this.subTimer*0.4)*0.35-0.3;
                    if(T(14)) floatingTexts.push(new FloatingText(this.x-26,this.y-24, this.br().ten));
                    if(QUA(46)){ this.breakerGlow=24; this.toIdle(14); }
                    return;
                }
                // ================= COMBO A — RED QUEEN 4 NHIP + JET LUNGE BAM DUOI =================
                if(this.state==='rq_combo'){
                    this.physics();this.swordDrawn=true;this.subTimer++;
                    if(this.subTimer<=2)this.faceP();
                    if(T(2)) this.baoDon('RED QUEEN COMBO', 12);
                    if(T(14)){ this.swordAngle=-1.75; this.buocTheo(8, 15);  this.chem(66,false,-0.35); }
                    if(T(28)){ this.swordAngle= 0.72; this.buocTheo(8, 15);  this.chem(66,false, 0.35); }
                    if(T(42)){ this.swordAngle=-1.20; this.buocTheo(9, 16);  this.chem(70,false,-0.15); }
                    if(T(52)) this.baoDon('', 10);
                    if(T(64)){ this.swordAngle=-0.20; this.buocTheo(13, 22); this.chem(92,true,0); shakeTimer=Math.max(shakeTimer,16);
                               if(this.br().id==='overture') this.socDien(); }
                    HT();
                    if(QUA(82))this.toIdle(this.phase===2?18:24);
                    return;
                }
                // ================= COMBO B — LAO VAO BO LIEN HOAN (Red Queen Combo B) =================
                if(this.state==='rq_pound'){
                    this.physics();this.swordDrawn=true;this.subTimer++;
                    if(this.subTimer<=2)this.faceP();
                    if(T(2)) this.baoDon('RED QUEEN MILL', 14);
                    if(T(14)){ this.swordAngle=-1.70; this.buocTheo(10, 18); this.chem(72,false,-0.4); }
                    for(let k=0;k<4;k++) if(T(30+k*13)){
                        this.swordAngle=-2.0+k*0.12;
                        this.buocTheo(6, 12);
                        this.chem(64,k===3,0.45);
                        visualEffects.push(new Effect(this.cx()+this.dir()*40,this.y+this.h-4,'explosion',true,16+k*4));
                        if(k===3){ shakeTimer=Math.max(shakeTimer,18);
                                   for(let ss of[-1,1]){let p=new BossProjectile(this.cx(),288,ss*10,0,true,1);p.w=48;p.h=28;p.color='#FFAB91';p.frail=true;bossProjectiles.push(p);} }
                    }
                    HT();
                    if(QUA(94))this.toIdle(this.phase===2?18:26);
                    return;
                }
                // ================= COMBO C — 3 NHAT LUOT + NHAY VOM QUA DAU DAP DAT (Double Down) =================
                if(this.state==='combo_slam'){
                    this.physics();this.swordDrawn=true;this.subTimer++;
                    if(this.subTimer<=2)this.faceP();
                    if(T(2)) this.baoDon('DOUBLE DOWN', 12);
                    if(T(14)){ this.swordAngle=-1.75; this.buocTheo(8, 14); this.chem(64,false,-0.35); }
                    if(T(27)){ this.swordAngle= 0.70; this.buocTheo(8, 14); this.chem(64,false, 0.35); }
                    if(T(40)){ this.swordAngle=-1.30; this.buocTheo(9, 15); this.chem(68,false,-0.15); }
                    if(T(52)){
                        this.faceP();
                        this.dy=-11.5; this.grounded=false;
                        this.dashV = Math.sign(this.gap() || this.dir()) * Math.min(16, Math.abs(this.gap()) * 0.22 + 5);
                        this.swordAngle=-2.3; this.baoDon('',10);
                    }
                    if(!this.grounded&&this.dy>0&&this.y>=this.baseY-2&&!this.slamDone&&QUA(52)){
                        this.slamDone=true; this.swordAngle=0.1;
                        let R=this.revLevel()>=2?132:102;
                        visualEffects.push(new Effect(this.cx(),this.y+this.h,'body_slam_shockwave',true,R));
                        shakeTimer=Math.max(shakeTimer,22);
                        if(Math.abs((dino.x+dino.w/2)-this.cx())<R && dino.grounded) { this.hurtP(1); dino.dy=-7; }
                        for(let ss of[-1,1]){let p=new BossProjectile(this.cx(),288,ss*10.5,0,true,1);p.w=50;p.h=30;p.color=this.revLevel()>=2?'#FF7043':'#FFCCBC';p.frail=true;bossProjectiles.push(p);}
                        if(SFX.bossSkill)SFX.bossSkill();
                    }
                    HT();
                    if(QUA(94)){this.slamDone=false;this.toIdle(26);}
                    return;
                }
                // ================= HIGH ROLLER =================
                if(this.state==='highroller'){
                    this.physics();this.swordDrawn=true;this.subTimer++;
                    if(this.subTimer<=2){ this.faceP(); this.buocTheo(10, 18); }
                    if(this.subTimer<Math.round(12/this.spd())){this.swordAngle=-1.0;return;}
                    this.swordAngle=-2.4; this.x+=this.dir()*5.5;
                    if(!this.launchHit&&checkAABB(dino,this.bladeBox(76))){
                        this.launchHit=true;this.hurtP(1);dino.dy=-13.5;dino.grounded=false;
                        this.state='hr_air';this.subTimer=0;this.dy=-12.5;this.grounded=false;
                        this.airTargetX=dino.x+dino.w/2; this.hrLoops=0; this.spin=0;
                        visualEffects.push(new Effect(this.cx()+this.dir()*30,this.y+20,'explosion',true,26));
                    }
                    if(QUA(36)){this.launchHit=false;this.toIdle(20);}
                    return;
                }
                if(this.state==='hr_air'){
                    this.subTimer++;this.swordDrawn=true;this.faceP();
                    this.dy+=0.34;this.y+=this.dy;this.x+=((dino.x+dino.w/2)-this.cx())*0.09;
                    this.spin=(this.spin||0)+0.45;
                    this.swordAngle=-1.6+Math.sin(this.spin)*1.5;
                    if(this.subTimer%Math.round(10/this.spd())===0){ this.chem(70,false); }
                    HT();
                    if(this.dy>1.2&&this.hrLoops<(this.phase===2?2:1)&&Math.random()<0.55){
                        this.hrLoops++; this.dy=-9.5; this.subTimer=0;
                        floatingTexts.push(new FloatingText(this.x-16,this.y-26,'AIR HIKE'));
                        return;
                    }
                    if(this.dy>1.2&&(this.hrLoops>=(this.phase===2?2:1)||this.subTimer>Math.round(38/this.spd()))){
                        this.state='hr_dive';this.subTimer=0;this.swordAngle=-0.1;this.dy=16;
                    }
                    return;
                }
                if(this.state==='hr_dive'){
                    this.subTimer++;this.swordDrawn=true;this.y+=this.dy;this.dy+=0.55;
                    this.x+=((dino.x+dino.w/2)-this.cx())*0.12;
                    if(this.slashT<=0){this.slashT=6;this.swingHit=false;this.reachHt=88;}
                    HT();
                    if(this.y>=this.baseY){
                        this.y=this.baseY;this.dy=0;this.grounded=true;this.launchHit=false;
                        visualEffects.push(new Effect(this.cx(),this.y+this.h,'body_slam_shockwave',true,this.revLevel()>=2?115:88));
                        shakeTimer=Math.max(shakeTimer,20);
                        if(Math.abs((dino.x+dino.w/2)-this.cx())<88&&dino.grounded)this.hurtP(1);
                        this.toIdle(26);
                    }
                    return;
                }
                // ================= CALIBUR — PHONG NHANH TREN KHONG XUYEN MAN HINH =================
                if(this.state==='calibur'){
                    this.physics();this.swordDrawn=true;this.subTimer++;
                    if(this.subTimer<=3)this.faceP();
                    if(T(2)){ this.baoDon('CALIBUR!', 15); this.dy = -5.5; this.grounded = false; }
                    if(this.subTimer<Math.round(15/this.spd())){ this.swordAngle=-0.35; this.x-=this.dir()*1.5; return; }
                    this.swordAngle=-0.02; this.y=Math.min(this.baseY-10, this.y); this.dy=0;
                    this.x+=this.dir()*(this.phase===2?18:15.5);
                    this.ghost();
                    if(this.subTimer%4===0)visualEffects.push(new Effect(this.cx()-this.dir()*20,this.cy(),'explosion',true,14));
                    let mui={x:this.dir()>0?this.x+this.w-8:this.x-58,y:this.y+8,w:66,h:48};
                    if(!this.dashHit&&checkAABB(dino,mui)){
                        this.dashHit=true; this.chem(78,false,0); this.hurtP(1);
                        visualEffects.push(new Effect(this.cx()+this.dir()*40,this.cy(),'lightning_shock',true,26));
                        shakeTimer=Math.max(shakeTimer,14);
                        this.state='rq_combo'; this.subTimer=Math.round(14/this.spd());
                        this.combo=1; return;
                    }
                    if(QUA(48)||this.x<12||this.x>canvas.width-this.w-12){
                        this.x=Math.max(10,Math.min(canvas.width-this.w-10,this.x));
                        this.y=this.baseY;this.dashHit=false;this.toIdle(20);
                    }
                    return;
                }
                // ================= SPLIT =================
                if(this.state==='split'){
                    this.subTimer++;this.swordDrawn=true;
                    if(this.subTimer<=3)this.faceP();
                    if(T(2))this.baoDon('SPLIT!', 14);
                    if(T(14)){ this.dy=-15.5; this.grounded=false; }
                    if(this.subTimer<Math.round(14/this.spd())){ this.physics(); this.swordAngle=-1.2; return; }
                    this.dy+=0.55; this.y+=this.dy;
                    this.swordAngle=-2.4;
                    if(this.dy<0) this.splitX=dino.x+dino.w/2;
                    else this.x+=((this.splitX||this.cx())-this.cx())*0.16;
                    if(this.dy>0){
                        this.swordAngle=-0.05;
                        if(this.slashT<=0){this.slashT=5;this.swingHit=false;this.reachHt=86;}
                        if(this.slashT>0){this.slashT--;this.swing(this.reachHt);}
                    }
                    if(this.y>=this.baseY){
                        this.y=this.baseY;this.dy=0;this.grounded=true;
                        this.chem(90,true,0);
                        visualEffects.push(new Effect(this.cx(),this.y+this.h,'body_slam_shockwave',true,this.revLevel()>=2?120:94));
                        shakeTimer=Math.max(shakeTimer,20);
                        if(Math.abs((dino.x+dino.w/2)-this.cx())<90&&dino.grounded)this.hurtP(1);
                        for(let ss of[-1,1]){let p=new BossProjectile(this.cx(),288,ss*10,0,true,1);p.w=48;p.h=28;p.color='#FFAB91';p.frail=true;bossProjectiles.push(p);}
                        this.toIdle(24);
                    }
                    if(QUA(120)){this.y=this.baseY;this.dy=0;this.toIdle(24);}
                    return;
                }
                // ================= STREAK EX — LUOT XOAY TOC DO CAO =================
                if(this.state==='streak_prep'){
                    this.physics();this.faceP();this.swordDrawn=true;this.exceed=1;this.subTimer++;
                    if(T(2))this.baoDon('STREAK!', 12);
                    if(QUA(12)){this.state='streak_go';this.subTimer=0;this.dashDir=this.dir();this.dashHit=false;this.spin=0;}
                    return;
                }
                if(this.state==='streak_go'){
                    this.subTimer++;this.y=this.baseY;this.swordDrawn=true;
                    this.x+=this.dashDir*(this.phase===2?18.5:16);
                    this.ghost();
                    this.spin+=0.56; this.swordAngle=-Math.PI+((this.spin)%(Math.PI*2));
                    if(this.subTimer%4===0)visualEffects.push(new Effect(this.cx()-this.dashDir*16,this.y+this.h-6,'explosion',true,16));
                    let hb={x:this.dashDir>0?this.x-6:this.x-36,y:this.y+4,w:this.w+42,h:58};
                    if(this.dashHit>0)this.dashHit--;
                    if(!this.dashHit&&checkAABB(dino,hb)){this.dashHit=14;this.hurtP(1); this.chem(82,true,0);}
                    if(this.subTimer>Math.round(42/this.spd())||this.x<12||this.x>canvas.width-this.w-12){
                        this.x=Math.max(10,Math.min(canvas.width-this.w-10,this.x));this.dashHit=false;this.toIdle(20);
                    }
                    return;
                }
                // ================= HELTER SKELTER =================
                if(this.state==='helter_prep'){
                    this.physics();this.faceP();this.swordDrawn=true;this.swordAngle=-0.05;this.subTimer++;
                    if(T(1))floatingTexts.push(new FloatingText(this.x-20,this.y-30,'HELTER SKELTER'));
                    if(this.subTimer%5===0)visualEffects.push(new Effect(this.cx()+this.dir()*30,this.cy(),'explosion',true,10));
                    if(QUA(28)){this.state='helter_go';this.subTimer=0;this.dashDir=this.dir();this.helterMon=0;this.helterXuyen=false;}
                    return;
                }
                if(this.state==='helter_go'){
                    this.subTimer++;this.y=this.baseY;this.swordDrawn=true;
                    this.swordAngle=-0.05+Math.sin(this.subTimer*0.9)*0.10;
                    let mui={x:this.dashDir>0?this.x+this.w-8:this.x-58,y:this.y+14,w:66,h:44};
                    let cham=checkAABB(dino,mui);
                    if(cham&&dino.isShielding()&&!this.helterXuyen){
                        this.helterMon++;
                        this.x+=this.dashDir*1.1;
                        dino.x+=this.dashDir*2.6;
                        let bien=(this.dashDir<0)?12:(canvas.width-dino.w-12);
                        if((this.dashDir<0)?(dino.x<=bien):(dino.x>=bien)) this.helterMon+=2;
                        if(this.subTimer%3===0)visualEffects.push(new Effect(dino.x+(this.dashDir>0?0:dino.w),dino.y+16,'parry',this.dashDir<0));
                        if(this.subTimer%9===0&&SFX.tone)SFX.tone(1500,0.04,'square',0.08,900);
                        if(this.helterMon>Math.round(44/this.spd())){
                            this.helterXuyen=true;
                            floatingTexts.push(new FloatingText(dino.x-30,dino.y-32,'KHIÊN VỠ!'));
                            visualEffects.push(new Effect(dino.x+dino.w/2,dino.y+16,'explosion',true,40));
                            shakeTimer=Math.max(shakeTimer,22); if(SFX.bossSkill)SFX.bossSkill();
                            dino.takeDamage(2);
                        }
                    }else{
                        this.x+=this.dashDir*(this.phase===2?14.5:12.5);
                        if(cham&&!this.dashHit){this.dashHit=true;this.hurtP(1);}
                    }
                    if(this.subTimer%4===0)visualEffects.push(new Effect(this.cx()+this.dashDir*36,this.cy(),'explosion',true,12));
                    let dangDo=(this.helterMon>0&&!this.helterXuyen);
                    if(this.subTimer>Math.round(95/this.spd())||(!dangDo&&(this.x<12||this.x>canvas.width-this.w-12))){
                        this.x=Math.max(10,Math.min(canvas.width-this.w-10,this.x));this.dashHit=false;this.toIdle(24);
                    }
                    return;
                }
                // ================= OVERTURE (Lao tới đấm xung điện tầm xa) =================
                if(this.state==='ov_punch'){
                    this.physics();this.subTimer++;this.breakerGlow=24;
                    if(this.subTimer<=2)this.faceP();
                    if(T(2))this.baoDon('OVERTURE: BATTERY', 16);
                    this.armR=this.subTimer<Math.round(18/this.spd())?-0.5:-1.25;
                    if(this.subTimer<Math.round(18/this.spd()))return;
                    if(T(18)) this.buocTheo(12, 22);
                    if(!this.dashHit&&checkAABB(dino,{x:this.dir()>0?this.x+this.w-10:this.x-68,y:this.y+4,w:78,h:58})){
                        this.dashHit=true;this.hurtP(1);
                        this.datMin(dino.x+dino.w/2,dino.y+dino.h/2);
                        visualEffects.push(new Effect(dino.x+dino.w/2,dino.y+dino.h/2,'lightning_shock',true,36));
                        shakeTimer=Math.max(shakeTimer,16);
                    }
                    if(QUA(40)){this.dashHit=false;this.toIdle(22);}
                    return;
                }
                if(this.state==='ov_mines'){
                    this.physics();this.subTimer++;this.breakerGlow=24;this.armR=-0.55;
                    if(this.subTimer<=2){ this.faceP(); this.buocTheo(8, 14); }
                    if(T(14)||T(22)||T(30)){
                        let k=Math.round((this.subTimer*this.spd()-14)/8);
                        this.datMin(dino.x+dino.w/2+(k-1)*82, 300);
                        if(SFX.tone)SFX.tone(620,0.06,'square',0.10,300);
                    }
                    if(QUA(44))this.toIdle(20);
                    return;
                }
                // ================= GERBERA GP01 — BẬT NHẢY PHẢN LỰC TRÊN KHÔNG & XẢ ĐẠN XUNG KÍCH =================
                if(this.state==='gb_reflect'){
                    this.physics();this.faceP();this.subTimer++;this.breakerGlow=28;this.armR=-1.05;
                    if(T(1)){
                        floatingTexts.push(new FloatingText(this.x-16,this.y-28,'GERBERA JOCK!'));
                        this.buocTheo(11, 18); // Lao thẳng tới bật khiên xung kích phản đạn + hất tung cận chiến
                    }
                    if(T(12)){
                        visualEffects.push(new Effect(this.cx()+this.dir()*24,this.cy(),'charge_wave',true,1.1));
                        if(checkAABB(dino,{x:this.cx()-58,y:this.y-10,w:116,h:this.h+16})){
                            this.hurtP(1); dino.dy=-11; dino.grounded=false;
                        }
                    }
                    if(this.subTimer>=Math.round(8/this.spd())&&this.subTimer<=Math.round(38/this.spd())){
                        let d=this.dir(),vung={x:d<0?this.x-60:this.x+this.w,y:this.y-14,w:60,h:this.h+28};
                        for(let i=projectiles.length-1;i>=0;i--){
                            let pr=projectiles[i]; if(!pr||pr.owner!==1||!checkAABB(pr,vung))continue;
                            projectiles.splice(i,1);
                            let tx=dino.x+dino.w/2,ty=dino.y+dino.h/2;
                            let a=Math.atan2(ty-pr.y,tx-pr.x);
                            let np=new BossProjectile(pr.x,pr.y,Math.cos(a)*12.5,Math.sin(a)*12.5,false,1);
                            np.w=Math.max(14,pr.w||14);np.h=Math.max(12,pr.h||12);np.color='#4DD0E1';np.frail=true;
                            bossProjectiles.push(np);
                            visualEffects.push(new Effect(pr.x,pr.y,'parry',d<0));
                            this.guardHits++;
                            if(SFX.tone)SFX.tone(1300,0.05,'sine',0.10,700);
                        }
                    }
                    if(QUA(44))this.toIdle(20);
                    return;
                }
                // GERBERA GP01 AIR DASH — Phóng phản lực zigzag trên không vượt đầu người chơi + bắn chéo xuống
                if(this.state==='gb_dash'){
                    this.physics();this.subTimer++;this.breakerGlow=28;this.armR=-1.35;
                    if(T(2)){
                        this.faceP(); this.baoDon('GERBERA GP01!', 10);
                        this.dy = -13.5; this.grounded = false;
                        this.dashV = this.dir() * 14;
                        visualEffects.push(new Effect(this.cx(), this.y + this.h, 'charge_wave', true, 1.1));
                    }
                    if(T(18)){
                        // Nhịp bật phản lực thứ 2 trên không lao thẳng về phía người chơi + bắn 2 sóng xung kích chéo xuống
                        this.faceP();
                        this.dy = -6;
                        this.dashV = this.dir() * 16;
                        this.ghost();
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'charge_wave', true, 1.2));
                        for(let k=-1; k<=1; k+=2){
                            let a = Math.atan2((dino.y+dino.h/2)-this.cy(), (dino.x+dino.w/2)-this.cx()) + k*0.18;
                            let p = new BossProjectile(this.cx(), this.cy(), Math.cos(a)*12.5, Math.sin(a)*12.5, false, 1);
                            p.w=32; p.h=24; p.color='#4DD0E1'; p.frail=true; bossProjectiles.push(p);
                        }
                        if(SFX.tone)SFX.tone(420,0.09,'sine',0.14,220);
                    }
                    if(QUA(42) && this.grounded) this.toIdle(18);
                    if(QUA(75)) this.toIdle(18);
                    return;
                }
                // ================= PUNCH LINE =================
                if(this.state==='pl_dive'){
                    this.physics();this.subTimer++;this.breakerGlow=26;this.armR=-0.7;
                    if(this.subTimer<=2)this.faceP();
                    if(T(10)){
                        this.gang={x:this.cx(),y:this.cy(),a:0,r:24,pha:'luon',t:0};
                        if(SFX.bossSkill)SFX.bossSkill();
                    }
                    if(T(36)){ this.dy=-13.5; this.grounded=false; }
                    if(T(46)&&this.gang){ this.gang.pha='lao'; this.gang.tx=dino.x+dino.w/2; }
                    if(QUA(46)){ this.state='pl_dive_air'; this.subTimer=0; this.airTargetX=dino.x+dino.w/2; }
                    return;
                }
                if(this.state==='pl_dive_air'){
                    this.subTimer++;this.swordDrawn=true;this.breakerGlow=26;
                    this.dy+=0.42;this.y+=this.dy;this.x+=(this.airTargetX-this.cx())*0.08;
                    this.swordAngle=-2.2;
                    if(this.gang) this.airTargetX=this.gang.x;
                    if(this.dy>0&&(!this.gang||this.gang.pha==='xong')){
                        this.state='pl_dive_stab';this.subTimer=0;this.dy=16;this.swordAngle=-0.05;
                    }
                    if(QUA(55)){this.state='pl_dive_stab';this.subTimer=0;this.dy=16;}
                    return;
                }
                if(this.state==='pl_dive_stab'){
                    this.subTimer++;this.swordDrawn=true;this.y+=this.dy;this.dy+=0.55;
                    this.x+=(this.airTargetX-this.cx())*0.14;
                    if(this.slashT<=0){this.slashT=6;this.swingHit=false;this.reachHt=90;}
                    HT();
                    if(this.y>=this.baseY){
                        this.y=this.baseY;this.dy=0;this.grounded=true;
                        visualEffects.push(new Effect(this.cx(),this.y+this.h,'body_slam_shockwave',true,116));
                        shakeTimer=Math.max(shakeTimer,24);
                        if(Math.abs((dino.x+dino.w/2)-this.cx())<96&&dino.grounded)this.hurtP(1);
                        for(let ss of[-1,1]){let p=new BossProjectile(this.cx(),288,ss*11,0,true,1);p.w=54;p.h=30;p.color='#EF5350';p.frail=true;bossProjectiles.push(p);}
                        this.toIdle(26);
                    }
                    return;
                }
                if(this.state==='pl_launch'){
                    this.physics();this.subTimer++;this.breakerGlow=24;this.armR=-0.75;
                    if(this.subTimer<=2){ this.faceP(); this.buocTheo(9, 15); }
                    if(T(16))this.banNamDam(this.phase===2?3:2);
                    if(QUA(32))this.toIdle(18);
                    return;
                }
                // ================= TOMBOY =================
                if(this.state==='tb_rev'){
                    this.physics();this.faceP();this.swordDrawn=true;this.subTimer++;this.breakerGlow=26;
                    if(T(6)||T(14)||T(22))this.revUp();
                    if(QUA(28)){
                        this.state=Math.random()<0.5?'rq_combo':'nr_payline';
                        this.subTimer=0;this.combo=0;this.swingHit=false;
                    }
                    return;
                }
                if(this.state==='tb_burst'){
                    // Vừa nhảy lướt trên không vừa xả đạn Tomboy cường hóa (không đứng yên!)
                    this.physics();this.gunDrawn=true;this.gunAngle=-0.10;this.subTimer++;this.breakerGlow=24;
                    if(T(2)){
                        this.faceP();
                        this.dy = -10.5; this.grounded = false;
                        this.dashV = this.dir() * 11;
                    }
                    let tong=this.phase===2?4:3;
                    if(this.subTimer>=Math.round(12/this.spd())&&this.shots<tong&&this.subTimer%Math.round(6/this.spd())===0){
                        this.shots++; this.fireBlueRose(true,(this.shots-(tong+1)/2)*0.09);
                    }
                    if(this.shots>=tong&&QUA(12+tong*6+10)){this.shots=0;this.toIdle(20);}
                    return;
                }
                // ================= WIRE SNATCH & GUARD =================
                if(this.state==='snatch_prep'){
                    this.physics();this.faceP();this.armR=-0.82;this.breakerGlow=24;this.subTimer++;
                    if(T(1))this.baoDon('WIRE SNATCH!', 10);
                    if(QUA(10)){
                        this.snatch={st:'out',len:34,dir:this.dir(),vy:0,hit:false,tuKeo:Math.abs(this.gap())>200};
                        this.state='snatch_pull';this.subTimer=0;if(SFX.bossSkill)SFX.bossSkill();
                    }
                    return;
                }
                if(this.state==='snatch_pull'){
                    this.physics();this.faceP();this.armR=-0.92;this.breakerGlow=24;this.subTimer++;
                    if(this.snatch&&this.snatch.st==='back'&&this.subTimer>6){
                        this.snatch=null; this.toIdle(26); return;
                    }
                    if(this.snatch&&this.snatch.st==='pull'&&this.snatch.len<=96){
                        let nextMoves = ['rq_combo','highroller','nr_buster','combo_slam'];
                        this.state = nextMoves[Math.floor(Math.random()*nextMoves.length)];
                        this.subTimer=0;this.combo=0;this.swingHit=false;this.launchHit=false;this.snatch=null;
                        return;
                    }
                    if(QUA(48)){this.snatch=null;this.toIdle(16);}
                    return;
                }
                if(this.state==='guard_prep'){this.physics();this.faceP();this.swordDrawn=true;this.swordAngle=-1.15;this.subTimer++;if(QUA(12)){this.state='guard';this.subTimer=0;this.guardHits=0;this.guardCounter=false;}return;}
                if(this.state==='guard'){
                    this.physics();this.faceP();this.swordDrawn=true;this.swordAngle=-1.2;this.subTimer++;
                    this.x += this.dir() * 2.5; // Vừa thủ kiếm vừa bước ép vào
                    let d=this.dir(),box={x:d<0?this.x-34:this.x+this.w,y:this.y-8,w:34,h:this.h+16};
                    for(let i=projectiles.length-1;i>=0;i--){let pr=projectiles[i];if(!pr||pr.owner!==1||!checkAABB(pr,box))continue;projectiles.splice(i,1);this.guardHits++;visualEffects.push(new Effect(pr.x,pr.y,'parry',d<0));}
                    if(this.guardHits>0&&!this.guardCounter){this.guardCounter=true;this.subTimer=18;this.buocTheo(14, 22);this.slashT=12;this.swingHit=false;this.swordAngle=-0.15;this.reachHt=82;}
                    if(this.guardCounter){this.slashT--;this.swing(82);if(this.slashT<=0){this.guardCounter=false;this.subTimer=32;}}
                    if(this.subTimer>44)this.toIdle(20);return;
                }
                if(this.state==='blue_prep'){
                    // Nhảy bật lên không rồi bắn Blue Rose từ trên xuống (Run & Gun)
                    this.physics();this.faceP();this.gunDrawn=true;this.gunAngle=-0.10;this.subTimer++;
                    if(T(2)){ this.dy = -9.5; this.grounded = false; this.dashV = this.dir() * 9; }
                    if(QUA(14)){this.state='blue_fire';this.subTimer=0;this.shots=0;}
                    return;
                }
                if(this.state==='blue_fire'){
                    this.physics();this.gunDrawn=true;this.gunAngle=-0.10;this.subTimer++;
                    let total=this.phase===2?4:3;
                    if(this.subTimer%Math.round(8/this.spd())===1&&this.shots<total){this.shots++;this.fireBlueRose(this.shots===total,(this.shots-(total+1)/2)*0.045);}
                    if(this.shots>=total&&QUA(total*8+10)){this.shots=0;this.toIdle(20);}
                    return;
                }
                // ================= PHA 2 — DEVIL TRIGGER =================
                if(this.state==='dt_wake'){this.subTimer++;this.y=this.baseY;this.armR=-0.35;this.breakerGlow=24;if(this.subTimer%18===0)visualEffects.push(new Effect(this.cx(),this.cy(),'lightning_burst',true,0.9));if(this.subTimer>82){this.invulnAll=false;this.revs=3;this.toIdle(20);}return;}
                if(this.state==='dt_maxact'){
                    this.subTimer++; this.swordDrawn=true; this.breakerGlow=26; this.exceed=1;
                    let chuKy=Math.round(22/this.spd());
                    if(this.subTimer%chuKy===1&&this.subTimer<chuKy*3){
                        let ss=(dino.x+dino.w/2)<canvas.width/2?1:-1;
                        this.x=Math.max(10,Math.min(canvas.width-this.w-10,dino.x+dino.w/2+ss*74-this.w/2));
                        this.y=this.baseY;this.dy=0;this.faceP();
                        visualEffects.push(new Effect(this.cx(),this.cy(),'explosion',true,20));
                    }
                    if(this.subTimer%chuKy===Math.round(12/this.spd())&&this.subTimer<chuKy*3){
                        this.swordAngle=-1.5+Math.random(); this.buocTheo(10, 16); this.chem(74,false);
                    }
                    HT();
                    if(this.subTimer>chuKy*3+10){this.fireCrescent(true);this.toIdle(22);}
                    return;
                }
                if(this.state==='dt_wings'){
                    this.physics();this.faceP();this.subTimer++;this.breakerGlow=28;this.armR=-1.1;
                    if(T(2)){ this.baoDon('SPECTRAL WINGS', 18); this.buocTheo(12, 20); }
                    if(T(20)||T(36)){
                        let R=this.subTimer<Math.round(30/this.spd())?108:154;
                        for(let ss of[-1,1]){ this.echoes.push({t:1,max:1,reach:R,dir:ss,x:this.cx(),y:this.cy(),ve:0}); }
                        visualEffects.push(new Effect(this.cx(),this.cy(),'body_slam_shockwave',true,R));
                        shakeTimer=Math.max(shakeTimer,16);
                        if(SFX.bossSkill)SFX.bossSkill();
                    }
                    if(QUA(58))this.toIdle(24);
                    return;
                }
                if(this.state==='dt_barrage'){
                    this.physics();this.faceP();this.subTimer++;this.breakerGlow=28;
                    if(T(2))this.baoDon('BRINGER BARRAGE', 16);
                    this.armR=-0.6-0.5*Math.sin(this.subTimer*0.5);
                    for(let k=0;k<5;k++) if(T(20+k*11)){
                        this.buocTheo(7, 13);
                        this.datEcho(150+k*18, 6);
                        visualEffects.push(new Effect(this.cx()+this.dir()*(60+k*22),this.cy(),'explosion',true,18));
                        if(SFX.tone)SFX.tone(150+k*30,0.06,'sawtooth',0.12,90);
                    }
                    if(QUA(88))this.toIdle(22);
                    return;
                }
                if(this.state==='dt_calibur'){
                    this.physics();this.swordDrawn=true;this.subTimer++;
                    if(this.subTimer<=3)this.faceP();
                    if(T(2))this.baoDon('DT CALIBUR', 16);
                    if(this.subTimer<Math.round(16/this.spd())){ this.swordAngle=-0.35; this.x-=this.dir()*1.4; return; }
                    this.swordAngle=-0.02; this.y=this.baseY-6; this.dy=0; this.breakerGlow=28;
                    this.x+=this.dir()*18;
                    this.ghost();
                    if(this.subTimer%4===0)visualEffects.push(new Effect(this.cx()-this.dir()*20,this.cy(),'explosion',true,14));
                    let mui={x:this.dir()>0?this.x+this.w-10:this.x-58,y:this.y+10,w:68,h:50};
                    if(!this.dashHit&&checkAABB(dino,mui)){
                        this.dashHit=true; this.chem(82,true,0); this.hurtP(1);
                        this.datEcho(168, 12);
                        this.datEcho(196, 22);
                        shakeTimer=Math.max(shakeTimer,20);
                    }
                    if(QUA(54)||this.x<12||this.x>canvas.width-this.w-12){
                        this.x=Math.max(10,Math.min(canvas.width-this.w-10,this.x));
                        this.y=this.baseY;this.dashHit=false;this.toIdle(22);
                    }
                    return;
                }
                if(this.state==='dt_rockets'){
                    this.physics();this.subTimer++;this.breakerGlow=28;this.armR=-0.8;
                    if(this.subTimer<=2){ this.faceP(); this.buocTheo(10, 16); }
                    if(T(16))this.banNamDam(4);
                    if(QUA(34))this.toIdle(22);
                    return;
                }
                if(this.state==='dt_grab'){
                    this.physics();this.faceP();this.subTimer++;this.breakerGlow=28;this.armR=-1.4;
                    if(T(4)) this.buocTheo(14, 24);
                    if(T(16)){
                        let bx={x:this.dir()>0?this.x+this.w:this.x-96,y:this.y-6,w:96,h:this.h+12};
                        if(checkAABB(dino,bx)){
                            this.hurtP(1); dino.x=this.cx()+this.dir()*30-dino.w/2; dino.dy=-4;
                            floatingTexts.push(new FloatingText(dino.x-20,dino.y-30,'BUSTER!'));
                            this.state='dt_slam'; this.subTimer=0; return;
                        }
                    }
                    if(QUA(32))this.toIdle(20);return;
                }
                if(this.state==='dt_slam'){
                    this.subTimer++; this.breakerGlow=28; this.armR=1.2; this.physics();
                    if(T(12)){
                        this.hurtP(1); dino.dy=6;
                        visualEffects.push(new Effect(dino.x+dino.w/2,dino.y+dino.h,'body_slam_shockwave',true,88));
                        shakeTimer=Math.max(shakeTimer,24);
                        for(let ss of[-1,1]){let p=new BossProjectile(this.cx(),288,ss*11,0,true,1);p.w=54;p.h=30;p.color='#80DEEA';p.frail=true;bossProjectiles.push(p);}
                    }
                    if(QUA(30))this.toIdle(24);return;
                }
                if(this.state==='returning'){this.subTimer++;this.physics();this.faceP();this.x+=(this.cx()>dino.x+dino.w/2?1:-1)*(this.phase===2?5:4);this.swordDrawn=false;this.gunDrawn=false;this.breakerGlow=0;if(this.subTimer>=24)this.toIdle(24);return;}
                this.toIdle(20);
            }
            baoDon(ten, dai){
                this.bao=dai||14; this.baoTen=ten||'';
                if(ten){
                    floatingTexts.push(new FloatingText(this.x-14,this.y-30,ten));
                    if(SFX.tone)SFX.tone(220,0.09,'sine',0.10,150);
                }
                visualEffects.push(new Effect(this.cx(),this.cy(),'charge_wave',true,this.revLevel()>=2?1.2:0.9));
            }
            socDien(){
                let R=this.phase===2?92:74;
                visualEffects.push(new Effect(this.cx(),this.cy(),'lightning_burst',true,1.25));
                for(let k=0;k<5;k++){
                    let a2=Math.random()*Math.PI*2;
                    visualEffects.push(new Effect(this.cx()+Math.cos(a2)*R*0.7,this.cy()+Math.sin(a2)*R*0.7,'lightning_shock',true,22));
                }
                if(Math.hypot((dino.x+dino.w/2)-this.cx(),(dino.y+dino.h/2)-this.cy())<R) this.hurtP(1);
                shakeTimer=Math.max(shakeTimer,14);
                if(SFX.tone)SFX.tone(1100,0.10,'square',0.14,240);
            }
            tickGang(){
                let g=this.gang; if(!g) return;
                g.t++;
                if(g.pha==='luon'){
                    g.a+=0.22; g.r=Math.min(96,g.r+3.0);
                    g.x=this.cx()+Math.cos(g.a)*g.r; g.y=this.cy()-30+Math.sin(g.a)*g.r*0.55;
                    if(g.t%5===0)visualEffects.push(new Effect(g.x,g.y,'explosion',true,8));
                }else if(g.pha==='lao'){
                    g.x+=((g.tx||dino.x+dino.w/2)-g.x)*0.18; g.y+=14;
                    visualEffects.push(new Effect(g.x,g.y,'explosion',true,12));
                    if(g.y>=304){
                        visualEffects.push(new Effect(g.x,312,'body_slam_shockwave',true,84));
                        shakeTimer=Math.max(shakeTimer,20); if(SFX.bossSkill)SFX.bossSkill();
                        if(Math.abs((dino.x+dino.w/2)-g.x)<74&&dino.grounded)this.hurtP(1);
                        g.pha='xong'; g.t=0;
                    }
                }else{ if(g.t>14) this.gang=null; }
            }
            draw(){
                // Tan anh khi Nero luot bang phan luc Exceed / Snatch
                for(let g of this.ghosts){
                    ctx.save(); ctx.globalAlpha = (g.t/12)*0.36;
                    drawNeroBody({facingLeft:g.left,w:this.w,h:this.h,phase:this.phase,swordDrawn:g.sword,swordAngle:g.sa,armR:g.armR,revs:this.revs,br:()=>this.br()}, g.x, g.y);
                    ctx.restore();
                }
                // nam dam Punch Line
                for(let f of this.blades){
                    ctx.save();ctx.translate(f.x,f.y);ctx.rotate(Math.atan2(f.vy,f.vx));
                    ctx.shadowColor='#FF3D00'; ctx.shadowBlur=10;
                    ctx.fillStyle='#EF5350';ctx.fillRect(-12,-8,20,16);
                    ctx.fillStyle='#B71C1C';ctx.fillRect(8,-9,7,18);
                    ctx.fillStyle='#FFAB00';ctx.fillRect(-22,-4,11,8);
                    ctx.restore();
                }
                // gang Punch Line dang luon vong / lao xuong
                if(this.gang){
                    let g=this.gang;
                    ctx.save();ctx.translate(g.x,g.y);ctx.rotate(g.pha==='lao'?Math.PI/2:g.a);
                    ctx.fillStyle='#EF5350';ctx.fillRect(-13,-9,22,18);
                    ctx.fillStyle='#B71C1C';ctx.fillRect(9,-10,8,20);
                    ctx.fillStyle='rgba(255,171,145,0.55)';ctx.fillRect(-24,-5,11,10);
                    ctx.restore();
                    if(g.pha==='lao'){
                        ctx.save();ctx.globalAlpha=0.4+0.3*Math.sin(frames*0.3);ctx.strokeStyle='#EF5350';ctx.lineWidth=3;
                        ctx.beginPath();ctx.ellipse(g.tx||g.x,318,64,11,0,0,Math.PI*2);ctx.stroke();ctx.restore();
                    }
                }
                // HAO QUANG LUA theo muc Exceed
                if(this.revLevel()>0){
                    let r=this.revLevel();
                    ctx.save();ctx.globalAlpha=0.12+0.07*r+0.05*Math.sin(frames*0.25);
                    ctx.fillStyle=r>=3?'#FF3D00':(r>=2?'#FF9100':'#FFCC80');
                    ctx.beginPath();ctx.arc(this.cx(),this.cy(),30+r*8,0,Math.PI*2);ctx.fill();ctx.restore();
                    for(let k=0;k<r;k++){
                        let a2=frames*0.09+k*Math.PI*2/r;
                        ctx.save();ctx.globalAlpha=0.65;ctx.fillStyle='#FF6D00';
                        ctx.beginPath();ctx.arc(this.cx()+Math.cos(a2)*(26+r*5),this.cy()+Math.sin(a2)*(26+r*5),3.4,0,Math.PI*2);ctx.fill();ctx.restore();
                    }
                }
                // min Overture
                for(let m of this.mines){
                    let p=m.t/Math.round(48/this.spd());
                    ctx.save();ctx.globalAlpha=0.35+0.45*Math.abs(Math.sin(m.t*0.35));
                    ctx.strokeStyle='#FFCA28';ctx.lineWidth=3;
                    ctx.beginPath();ctx.arc(m.x,m.y,20+p*52,0,Math.PI*2);ctx.stroke();
                    ctx.fillStyle='#FFF59D';ctx.beginPath();ctx.arc(m.x,m.y,5,0,Math.PI*2);ctx.fill();
                    ctx.restore();
                }
                // Mui khoan xoan oc Helter Skelter
                if(this.state==='helter_prep'||this.state==='helter_go'){
                    let d=this.dir(), cy=this.y+36, dai=this.state==='helter_go'?150:330;
                    ctx.save(); ctx.lineCap='round';
                    ctx.strokeStyle='rgba(255,138,101,0.85)'; ctx.lineWidth=2.5;
                    ctx.beginPath();
                    for(let t=0;t<=dai;t+=6){
                        let ph=frames*0.42 - t*0.09;
                        let bk=(1-t/dai)*17+3;
                        let px=this.cx()+d*(24+t), py=cy+Math.sin(ph)*bk;
                        if(t===0)ctx.moveTo(px,py); else ctx.lineTo(px,py);
                    }
                    ctx.stroke();
                    ctx.beginPath();
                    for(let t=0;t<=dai;t+=6){
                        let ph=frames*0.42 - t*0.09 + Math.PI;
                        let bk=(1-t/dai)*17+3;
                        let px=this.cx()+d*(24+t), py=cy+Math.sin(ph)*bk;
                        if(t===0)ctx.moveTo(px,py); else ctx.lineTo(px,py);
                    }
                    ctx.stroke();
                    ctx.globalAlpha=0.5; ctx.strokeStyle='#FFCC80'; ctx.lineWidth=1.5;
                    ctx.beginPath(); ctx.moveTo(this.cx()+d*24,cy); ctx.lineTo(this.cx()+d*(24+dai),cy); ctx.stroke();
                    ctx.restore();
                }
                if(this.state==='streak_prep'||this.state==='calibur'){
                    let dai=this.state==='calibur'?230:290, d=this.dir();
                    ctx.save(); ctx.lineWidth=3; ctx.lineCap='round';
                    for(let k=0;k<7;k++){
                        let t=((k*40 + frames*3.2) % dai);
                        let px=this.cx()+d*(30+t), py=this.y+40;
                        ctx.globalAlpha=0.75*(1-t/dai);
                        ctx.strokeStyle=this.state==='calibur'?'#FFCC80':'#FF8A65';
                        ctx.beginPath();
                        ctx.moveTo(px-d*9,py-8); ctx.lineTo(px,py); ctx.lineTo(px-d*9,py+8);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // ---- WIRE SNATCH ----
                if(this.snatch){
                    let c=this.snatch;
                    let ox=this.cx()+this.dir()*16, oy=this.y+40;
                    let hx=this.cx()+c.dir*c.len, hy=this.cy()+c.vy*c.len;
                    let cang = c.st==='pull' ? 1 : (c.st==='hold' ? 1 : 0);
                    let vong = (1-cang)*Math.min(30, c.len*0.16);
                    ctx.save();
                    for(let lop=0;lop<2;lop++){
                        ctx.strokeStyle = lop===0 ? 'rgba(13,71,161,0.85)' : 'rgba(0,229,255,0.95)';
                        ctx.lineWidth   = lop===0 ? 6 : 3;
                        ctx.lineCap='round';
                        ctx.beginPath(); ctx.moveTo(ox,oy);
                        ctx.quadraticCurveTo((ox+hx)/2, (oy+hy)/2+vong, hx, hy);
                        ctx.stroke();
                    }
                    let N=Math.max(3,Math.round(c.len/26));
                    for(let k=1;k<N;k++){
                        let t=k/N, mt=1-t;
                        let px=mt*mt*ox+2*mt*t*((ox+hx)/2)+t*t*hx;
                        let py=mt*mt*oy+2*mt*t*((oy+hy)/2+vong)+t*t*hy;
                        ctx.fillStyle=k%2?'#80D8FF':'#0288D1';
                        ctx.beginPath();ctx.arc(px,py,2.6,0,Math.PI*2);ctx.fill();
                    }
                    let goc=Math.atan2(hy-((oy+hy)/2+vong), hx-((ox+hx)/2));
                    ctx.save(); ctx.translate(hx,hy); ctx.rotate(goc);
                    ctx.strokeStyle='#E0F7FA'; ctx.lineWidth=3; ctx.lineCap='round';
                    let ha = (c.st==='out') ? 0.85 : 0.28;
                    for(let g=-1;g<=1;g++){
                        ctx.beginPath(); ctx.moveTo(-2,0);
                        ctx.quadraticCurveTo(7, g*ha*7, 14, g*ha*12);
                        ctx.stroke();
                    }
                    ctx.fillStyle='#00B0FF'; ctx.beginPath(); ctx.arc(-3,0,4.2,0,Math.PI*2); ctx.fill();
                    ctx.restore();
                    if(c.st==='pull'||c.st==='hold'){
                        ctx.globalAlpha=0.55; ctx.strokeStyle='#80D8FF'; ctx.lineWidth=2;
                        for(let k=0;k<3;k++){
                            let t=0.3+k*0.2, px=ox+(hx-ox)*t, py=oy+(hy-oy)*t;
                            ctx.beginPath(); ctx.moveTo(px-9,py-7); ctx.lineTo(px+9,py+7); ctx.stroke();
                        }
                    }
                    ctx.restore();
                }
                if(this.phase===2){ctx.save();ctx.globalAlpha=0.14+0.07*Math.sin(frames*0.17);ctx.fillStyle='#00E5FF';ctx.beginPath();ctx.arc(this.cx(),this.cy(),54,0,Math.PI*2);ctx.fill();ctx.restore();}
                if(this.bao>0){
                    let t=this.bao/26;
                    ctx.save(); ctx.globalAlpha=Math.min(0.55,0.18+t*0.4);
                    ctx.strokeStyle=this.revLevel()>=2?'#FF3D00':'#FFE082'; ctx.lineWidth=3;
                    ctx.beginPath(); ctx.arc(this.cx(),this.cy(),34+(1-t)*26,0,Math.PI*2); ctx.stroke();
                    ctx.restore();
                }
                let rung=this.brShake>0?(Math.random()-0.5)*this.brShake*0.3:0;
                ctx.save(); ctx.translate(rung,0);
                drawNeroBody(this,this.x,this.y);
                ctx.restore();
                this.veVet();
                if(this.phase===2) this.veCanh();
                this.nrVe();           // @@HE-NERO-DMC5
                let by=this.y-18;
                ctx.textAlign='center';
                drawTopBossBar(this, this.phase===2?'#00E5FF':'#E53935', this.phase===2?'NERO — DEVIL TRIGGER':('NERO — '+this.br().ten),
                               { name:'EXCEED '+this.revLevel(), col:this.revLevel()>=3?'#FF3D00':'#FFA726', v:this.revLevel()/3 });
                let B=this.br(), by2=by-18;
                ctx.fillStyle=B.mau;ctx.font='bold 9px Consolas, monospace';
                ctx.fillText(this.phase===2?('👿 '+B.ten):B.ten,this.cx(),by2);
                if(this.phase!==2){
                    for(let k=0;k<NR_CHARGES;k++){
                        let px=this.cx()-(NR_CHARGES-1)*5+k*10;
                        ctx.beginPath();ctx.arc(px,by2+7,3.2,0,Math.PI*2);
                        if(k<this.brLeft){ctx.fillStyle=B.mau;ctx.fill();}
                        else{ctx.strokeStyle='rgba(255,255,255,0.35)';ctx.lineWidth=1;ctx.stroke();}
                    }
                }
                ctx.textAlign='left';
            }
        }
// BOSS_PART_END s0.NeroBoss.1

// Nguồn: index.html:10799 · Dùng bởi: NeroBoss
// BOSS_PART_BEGIN s0.NR_CB_GAN.1 EDITABLE
const NR_CB_GAN = [
            ['rq_combo','nr_gun'],
            ['rq_combo','nr_shuffle'],
            ['nr_shuffle','nr_maxact'],
            ['BR','rq_combo'],
            ['combo_slam','nr_gun'],
            ['nr_buster'],
            ['highroller','nr_payline'],
            ['rq_pound','BR']
        ];
// BOSS_PART_END s0.NR_CB_GAN.1

// Nguồn: index.html:10809 · Dùng bởi: NeroBoss
// BOSS_PART_BEGIN s0.NR_CB_TIEP.1 EDITABLE
const NR_CB_TIEP = [
            ['snatch_prep','rq_combo'],
            ['calibur','nr_gun'],
            ['nr_payline','nr_shuffle'],
            ['streak_prep','rq_pound'],
            ['BR','calibur'],
            ['gb_dash','nr_payline']
        ];
// BOSS_PART_END s0.NR_CB_TIEP.1

// Nguồn: index.html:10817 · Dùng bởi: NeroBoss
// BOSS_PART_BEGIN s0.NR_CB_XA.1 EDITABLE
const NR_CB_XA = [
            ['snatch_prep','rq_combo'],
            ['calibur','nr_payline'],
            ['nr_ride'],
            ['streak_prep','combo_slam'],
            ['nr_colorshot','calibur'],
            ['split','rq_pound'],
            ['gb_dash','calibur']
        ];
// BOSS_PART_END s0.NR_CB_XA.1

// Nguồn: index.html:10826 · Dùng bởi: NeroBoss
// BOSS_PART_BEGIN s0.NR_CB_KHONG.1 EDITABLE
const NR_CB_KHONG = [
            ['snatch_prep','highroller'],
            ['calibur','nr_roulette'],
            ['nr_payline','nr_roulette'],
            ['gb_dash','split']
        ];
// BOSS_PART_END s0.NR_CB_KHONG.1

// Nguồn: index.html:10832 · Dùng bởi: NeroBoss
// BOSS_PART_BEGIN s0.NR_CB_DT.1 EDITABLE
const NR_CB_DT = [
            ['dt_calibur','dt_barrage'],
            ['dt_showdown','dt_wings'],
            ['dt_grab','dt_maxact'],
            ['dt_wings','dt_calibur','dt_showdown'],
            ['dt_bknuckle','dt_calibur'],
            ['nr_payline','dt_showdown'],
            ['rq_combo','dt_wings','dt_barrage']
        ];
// BOSS_PART_END s0.NR_CB_DT.1

// Nguồn: index.html:10841 · Dùng bởi: NeroBoss
// BOSS_PART_BEGIN s0.NR_CB_DT_XA.1 EDITABLE
const NR_CB_DT_XA = [
            ['dt_calibur','dt_showdown'],
            ['snatch_prep','dt_showdown'],
            ['dt_bknuckle','dt_calibur','dt_barrage'],
            ['nr_payline','dt_grab']
        ];
// BOSS_PART_END s0.NR_CB_DT_XA.1

// Nguồn: index.html:10847 · Dùng bởi: NeroBoss
// BOSS_PART_BEGIN s0.NR_TEN_BA.1 EDITABLE
const NR_TEN_BA = {
            overture:'BREAK AGE: MEGA BATTERY',
            gerbera:'BREAK AGE: STAMEN RAY',
            punchline:'BREAK AGE: BOOST KNUCKLE',
            tomboy:'BREAK AGE: ONE NIGHT STAND'
        };
// BOSS_PART_END s0.NR_TEN_BA.1

// Nguồn: index.html:10854 · Dùng bởi: NeroBoss
// BOSS_PART_BEGIN s0.Object.assign.NeroBoss.prototype.1 EDITABLE
Object.assign(NeroBoss.prototype, {
            hurtP(n){
                if (dino.isShielding()){ parry(); return; }
                let h = dino.hp; dino.takeDamage(n);
                if (dino.hp < h){ this.trungLuc = frames; this.trungMove = this.state; }
            },
            toIdle(t){
                let st = this.state;
                this.state='idle'; this.subTimer=0;
                this.combo=0; this.slashT=0; this.swingHit=false;
                this.gunDrawn=false; this.swordDrawn=false; this.breakerGlow=0; this.armR=0;
                this.snatch=null; this.exceed=this.revs>0?1:0;
                this.slamDone=false; this.launchHit=false; this.hrLoops=0; this.reachHt=62; this.dashHit=false;
                this.helterMon=0; this.helterXuyen=false; this.guardHits=0;
                this.nrNoi(st);
                // 1. Giữa các chiêu trong cùng 1 combo: tăng từ 3-5 frame lên 12-16 frame để có khe hở né/Parry
                if (this.chuoi && this.chuoi.length && this.hp > 0 && !this.pendingBreak){
                    this.actionTimer = Math.max(12, Math.round(15 / this.spd())); return;
                }
                this.noiThem = 0;
                // 2. Hết 1 chuỗi combo: tăng hệ số nghỉ từ 0.85 lên 1.35 (khoảng nghỉ rõ ràng để người chơi phản công)
                this.actionTimer = Math.max(24, Math.round(t * 1.35 / this.spd()));
                if (this.phase !== 2 && this.revs > 0 && Math.random() < 0.6) this.revs--;
            },
            nrNoi(st){
                if (!this.chuoi) this.chuoi = [];
                let trung = (frames - (this.trungLuc || -999)) < 50 && this.trungMove === st;
                if (!trung || (this.noiThem || 0) >= 1) return;
                let ke = null;
                if (st === 'rq_combo' || st === 'calibur' || st === 'nr_payline') ke = Math.random() < 0.5 ? 'highroller' : 'nr_buster';
                else if (st === 'nr_shuffle' || st === 'streak_go') ke = this.revs >= 2 ? 'nr_maxact' : 'rq_combo';
                else if (st === 'snatch_pull') ke = this.phase === 2 ? 'dt_showdown' : 'rq_combo';
                if (ke && this.chuoi[0] !== ke){ this.chuoi.unshift(ke); this.noiThem = 1; }
            },
            pickSkill(){
                if (this.pendingBreak){ this.voTay(); return; }
                let c;
                if (this.chuoi && this.chuoi.length) c = this.chuoi.shift();
                else {
                    let kc = Math.abs(this.gap()), tren = !dino.grounded && (dino.y + dino.h) < 290;
                    let bo;
                    if (this.phase === 2) bo = kc > 220 ? NR_CB_DT_XA : NR_CB_DT;
                    else if (tren && kc < 260) bo = NR_CB_KHONG;
                    else if (kc > 240) bo = NR_CB_XA;
                    else if (kc > 125) bo = NR_CB_TIEP;
                    else bo = NR_CB_GAN;
                    this.chuoi = bo[Math.floor(Math.random() * bo.length)].slice();
                    if (this.phase !== 2 && this.brLeft === 1 && Math.random() < 0.58) this.chuoi.unshift('nr_breakage');
                    c = this.chuoi.shift();
                }
                if (c === 'BR'){ let ds = this.br().chieu; c = ds[Math.floor(Math.random() * ds.length)]; }
                // [NERF] Không còn tự chèn Wire Snatch/Calibur khi chọn chiêu cận chiến ở xa
                if (c === 'nr_maxact' && this.revLevel() < 2) this.revs = 2; // Tự nạp nóng Exceed để bổ luôn không cần đứng gồng
                if (c === 'tb_rev' && this.br().id !== 'tomboy') c = 'nr_payline';
                this.state = c; this.subTimer = 0; this.faceP(); this.shots = 0;
                if (NR_BREAKERS.some(b => b.chieu.indexOf(c) >= 0)) this.dungTay();
            },
            // ----- BO CHIEU BUNG CHAY MOI & NANG CAP -----
            nrChieu(T, QUA, HT){
                let st = this.state, d = this.dir();

                // ===== [CHIEU MOI PHASE 1] BUSTER SUPLEX SLAM (nr_buster): Lao vồ bằng cánh tay cơ khí rồi quật nổ sàn =====
                if (st === 'nr_buster'){
                    this.physics(); this.subTimer++; this.breakerGlow = 30;
                    if (T(2)){
                        this.faceP(); this.baoDon('BUSTER KNUCKLE!', 12);
                        this.armR = -0.6;
                    }
                    if (T(14)){
                        this.buocTheo(15, 24);
                        this.armR = -1.45;
                        let bx = { x: this.dir() > 0 ? this.x + this.w - 8 : this.x - 86, y: this.y - 6, w: 94, h: this.h + 12 };
                        if (checkAABB(dino, bx)){
                            this.hurtP(1);
                            dino.x = this.cx() + this.dir() * 28 - dino.w / 2;
                            dino.dy = -9; dino.grounded = false;
                            this.dy = -9; this.grounded = false;
                            floatingTexts.push(new FloatingText(dino.x - 24, dino.y - 34, 'BUSTER SLAM!'));
                            this._busterGrab = true;
                            if (SFX.bossSkill) SFX.bossSkill();
                        }
                    }
                    if (this._busterGrab && T(26)){
                        this.dy = 18; dino.dy = 18;
                        this.armR = 1.2;
                        this.hurtP(1);
                        visualEffects.push(new Effect(this.cx() + this.dir() * 34, this.baseY + this.h, 'body_slam_shockwave', true, 105));
                        shakeTimer = Math.max(shakeTimer, 26);
                        if (SFX.bossExplode) SFX.bossExplode();
                        this._busterGrab = false;
                    }
                    if (QUA(40)){ this._busterGrab = false; this.toIdle(20); }
                    return true;
                }

                // ===== [CHIEU 1] PAYLINE & HARD WAY: Nhay cao lao cheo boc lua xuong dat roi chem no Hard Way =====
                if (st === 'nr_payline'){
                    this.subTimer++; this.swordDrawn = true; this.exceed = 1;
                    if (T(2)){
                        this.faceP(); this.baoDon('PAYLINE!', 12);
                        this.dy = -13.5; this.grounded = false;
                        this.swordAngle = -2.2;
                    }
                    if (this.subTimer < Math.round(14 / this.spd())){
                        this.physics();
                        return true;
                    }
                    if (T(14)){
                        this.faceP(); this.dashDir = this.dir();
                        this.swordAngle = 0.25;
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (!this.grounded && this.subTimer >= Math.round(14 / this.spd())){
                        this.x += this.dashDir * 16.5;
                        this.y += 13.5; this.dy = 0;
                        this.ghost();
                        if (this.subTimer % 2 === 0)
                            visualEffects.push(new Effect(this.cx() - this.dashDir * 18, this.cy(), 'explosion', true, 14));
                        if (!this.dashHit && checkAABB(dino, this.bladeBox(78))){
                            this.dashHit = true; this.hurtP(1);
                        }
                        if (this.y >= this.baseY){
                            this.y = this.baseY; this.grounded = true;
                            this._plLand = this.subTimer;
                            shakeTimer = Math.max(shakeTimer, 18);
                            visualEffects.push(new Effect(this.cx() + this.dashDir * 30, this.baseY + this.h, 'explosion', true, 32));
                        }
                    }
                    if (this.grounded && this._plLand && this.subTimer === this._plLand + Math.round(8 / this.spd())){
                        this.faceP();
                        this.buocTheo(10, 18);
                        this.swordAngle = -1.9;
                        this.chem(102, true, -0.2);
                        floatingTexts.push(new FloatingText(this.x - 18, this.y - 34, 'HARD WAY!'));
                        for (let k = 1; k <= 2; k++){
                            let fx = this.cx() + this.dir() * (45 + k * 44);
                            visualEffects.push(new Effect(fx, 295, 'explosion', true, 36));
                            if (Math.abs((dino.x + dino.w/2) - fx) < 44 && dino.y + dino.h > 245) this.hurtP(1);
                        }
                        shakeTimer = Math.max(shakeTimer, 22);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    HT();
                    if ((this.grounded && this._plLand && this.subTimer > this._plLand + Math.round(22 / this.spd())) || QUA(76)){
                        this._plLand = 0; this.dashHit = false; this.toIdle(20);
                    }
                    return true;
                }

                // ===== [CHIEU 2] COLOR UP & CHARGE SHOT 3 (Vừa nhảy lướt vừa găm đạn nổ, không đứng yên) =====
                if (st === 'nr_colorshot'){
                    this.physics(); this.faceP(); this.gunDrawn = true; this.gunAngle = -0.12; this.subTimer++;
                    if (T(2)){
                        this.baoDon('CHARGE SHOT 3!', 12);
                        this.dy = -9.5; this.grounded = false;
                        this.dashV = this.dir() * (Math.abs(this.gap()) > 220 ? 11 : -9);
                        if (SFX.tone) SFX.tone(520, 0.12, 'sine', 0.12, 880);
                    }
                    for (let k = 0; k < 2; k++) if (T(12 + k * 10)){
                        this.muzzle = 8;
                        this.fireBlueRose(true, (k - 0.5) * 0.06);
                        let tx = Math.max(50, Math.min(canvas.width - 50, dino.x + dino.w/2 + (k === 1 ? (Math.random()-0.5)*85 : 0)));
                        let ty = Math.max(120, Math.min(305, dino.y + dino.h/2));
                        this._cshots.push({ x: tx, y: ty, t: Math.round(32 / this.spd()), max: Math.round(32 / this.spd()) });
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (QUA(34)) this.toIdle(14);
                    return true;
                }

                // ===== [CHIEU 3] ROCKET SKATE (PUNCH LINE): Cuoi van truot ten lua luot ngang san roi Kickflip no =====
                if (st === 'nr_ride'){
                    this.subTimer++; this.breakerGlow = 28; this.swordDrawn = true;
                    if (T(2)){
                        this.faceP(); this.dashDir = this.dir();
                        this.baoDon('ROCKET SKATE!', 12);
                        this.dy = -6; this.grounded = false;
                    }
                    if (this.subTimer < Math.round(12 / this.spd())){ this.physics(); return true; }
                    if (this.subTimer >= Math.round(12 / this.spd()) && this.subTimer < Math.round(54 / this.spd())){
                        this.y = this.baseY - 6; this.dy = 0;
                        this.x += this.dashDir * (this.phase === 2 ? 15.5 : 13.5);
                        this.ghost();
                        this.swordAngle = -0.6 + Math.sin(this.subTimer * 0.4) * 0.5;
                        if (this.subTimer % 3 === 0)
                            visualEffects.push(new Effect(this.cx() - this.dashDir * 24, this.y + this.h, 'explosion', true, 14));
                        if (!this.dashHit && checkAABB(dino, { x: this.x - 10, y: this.y, w: this.w + 20, h: this.h + 6 })){
                            this.dashHit = true; this.hurtP(1); dino.dy = -9; dino.grounded = false;
                        }
                        if (this.x <= 18 || this.x >= canvas.width - this.w - 18){
                            this.dashDir *= -1; this.facingLeft = this.dashDir < 0; this.dashHit = false;
                        }
                    }
                    if (T(54)){
                        this.faceP(); this.dy = -11; this.grounded = false;
                        let bx = this.cx() + this.dir() * 64;
                        visualEffects.push(new Effect(bx, 295, 'explosion', true, 52));
                        shakeTimer = Math.max(shakeTimer, 22);
                        if (Math.hypot((dino.x + dino.w/2) - bx, (dino.y + dino.h/2) - 295) < 76) this.hurtP(1);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer >= Math.round(54 / this.spd())) this.physics();
                    if (QUA(72)){ this.dashHit = false; this.toIdle(20); }
                    return true;
                }

                // ===== [CHIEU 4] GERBERA PETAL RAY: Bật nhảy bắn chùm tia phản xạ trên sàn & trần =====
                if (st === 'nr_petalray'){
                    this.physics(); this.faceP(); this.subTimer++; this.breakerGlow = 28; this.armR = -1.25;
                    if (T(2)){ this.baoDon('PETAL RAY!', 14); this.buocTheo(10, 16); }
                    if (T(16)){
                        let d2 = this.dir();
                        for (let k = 0; k < 4; k++){
                            let a = (k - 1.5) * 0.24;
                            this._petals.push({
                                x: this.cx() + d2 * 20, y: this.cy(),
                                vx: Math.cos(a) * d2 * 12.5, vy: Math.sin(a) * 12.5 - 3,
                                bounces: 3, life: 120
                            });
                        }
                        shakeTimer = Math.max(shakeTimer, 14);
                        if (SFX.bossSkill) SFX.bossSkill();
                    }
                    if (QUA(34)) this.toIdle(18);
                    return true;
                }

                // ===== [CHIEU 5 - DT] SHOWDOWN: Song kiem Red Queen + Katana Linh Hon chem 8 nhat toc do cao =====
                if (st === 'dt_showdown'){
                    this.physics(); this.subTimer++; this.swordDrawn = true; this.breakerGlow = 30; this.exceed = 1;
                    if (T(2)){
                        this.faceP();
                        this.baoDon('SHOWDOWN!', 18);
                        this.swordAngle = -2.1; this.armR = -1.4;
                        if (SFX.bossEntry) SFX.bossEntry();
                    }
                    for (let k = 0; k < 8; k++) if (T(20 + k * 6)){
                        this.faceP();
                        this.buocTheo(9, 15);
                        this.swordAngle = (k % 2 === 0) ? -1.8 : 0.85;
                        this.chem(88, k === 7, (k % 2 === 0) ? -0.35 : 0.35);
                        this.datEcho(128, 5);
                        if (SFX.tone) SFX.tone(540 + k * 65, 0.04, 'sawtooth', 0.12, 320);
                    }
                    if (T(72)){
                        this.faceP();
                        this.buocTheo(12, 20);
                        this.chem(126, true, 0);
                        this.fireCrescent(true);
                        this._xWave = 20; this._xWaveX = this.cx() + this.dir() * 70;
                        shakeTimer = Math.max(shakeTimer, 28);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    HT();
                    if (QUA(92)) this.toIdle(24);
                    return true;
                }

                // ===== [CHIEU 6 - DT] MAXIMUM BET & BRINGER KNUCKLE =====
                if (st === 'dt_bknuckle'){
                    this.physics(); this.faceP(); this.subTimer++; this.swordDrawn = true; this.breakerGlow = 30;
                    if (T(2)){
                        this.baoDon('MAXIMUM BET!', 18);
                        this.swordAngle = -2.3; this.armR = -1.5;
                    }
                    if (T(20)){
                        this.swordAngle = 0.4;
                        this.chem(110, true, 0);
                        for (let vy of [-1.2, 1.2]){
                            let p = new BossProjectile(this.cx() + this.dir() * 26, this.y + 18, this.dir() * 14.5, vy, true, 1);
                            p.w = 88; p.h = 38; p.color = '#00E5FF'; p.crescent = true; p.isPiercing = true;
                            bossProjectiles.push(p);
                        }
                        let px = dino.x + dino.w / 2;
                        for (let k = -1; k <= 1; k++){
                            let fx = Math.max(60, Math.min(canvas.width - 60, px + k * 115));
                            this._fists.push({ x: fx, y: -40, t: 16 + (k + 1) * 7, hit: false });
                        }
                        shakeTimer = Math.max(shakeTimer, 26);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    HT();
                    if (QUA(48)) this.toIdle(22);
                    return true;
                }

                // ===== EXCEED: Vừa lướt áp sát vừa rồ ga (không đứng đực một chỗ) =====
                if (st === 'nr_rev'){
                    this.physics(); this.faceP(); this.swordDrawn = true; this.swordAngle = 0.5; this.subTimer++;
                    if (T(1)){
                        floatingTexts.push(new FloatingText(this.x - 10, this.y - 30, 'MAX-ACT REV!'));
                        this.buocTheo(10, 18);
                    }
                    for (let k = 0; k < 3; k++) if (T(5 + k * 6)){
                        this.revUp();
                        visualEffects.push(new Effect(this.cx() - d * 10, this.y + 34, 'explosion', true, 14 + k * 4));
                        if (SFX.tone) SFX.tone(160 + k * 70, 0.07, 'sawtooth', 0.14, 320 + k * 90);
                    }
                    if (QUA(22)) this.toIdle(6);
                    return true;
                }
                // ===== MAX-ACT: Phóng lướt bằng phản lực động cơ rồi bổ nhát kiếm lửa khổng lồ =====
                if (st === 'nr_maxact'){
                    this.physics(); this.swordDrawn = true; this.subTimer++; this.exceed = 1;
                    if (this.subTimer <= 3) this.faceP();
                    if (T(2)){ this.baoDon('MAX-ACT!', 14); this.swordAngle = -2.4; }
                    if (T(15)){
                        this.swordAngle = 0.5;
                        this.buocTheo(15, 25); // Phóng vọt tới trước mặt người chơi!
                        this.revs = 3; this.chem(116, true, 0); this.revFx = 16;
                        let bx = { x: d > 0 ? this.x + this.w - 6 : this.x - 136, y: this.y - 20, w: 142, h: this.h + 30 };
                        if (!this.swingHit && checkAABB(dino, bx)){ this.swingHit = true; this.hurtP(1); }
                        this.fireCrescent(true);
                        for (let k = 0; k < 6; k++) visualEffects.push(new Effect(this.cx() + d * (30 + k * 18), this.cy() + (Math.random() - 0.5) * 40, 'explosion', true, 16 + k * 3));
                        shakeTimer = Math.max(shakeTimer, 22); if (SFX.bossExplode) SFX.bossExplode();
                    }
                    HT();
                    if (QUA(36)) this.toIdle(20);
                    return true;
                }
                // ===== SHUFFLE: Bước lùi lấy đà ngắn rồi phóng vọt lên chém hất =====
                if (st === 'nr_shuffle'){
                    this.physics(); this.swordDrawn = true; this.subTimer++;
                    if (this.subTimer <= 2) this.faceP();
                    if (T(2)){ this.baoDon('SHUFFLE!', 10); this.swordAngle = -0.3; this.dashV = -d * 9; }
                    if (T(12)){
                        this.faceP();
                        this.swordAngle = 1.2;
                        this.buocTheo(16, 26); // Phóng cực mạnh tới mục tiêu
                    }
                    if (this.subTimer >= Math.round(12 / this.spd()) && this.subTimer < Math.round(24 / this.spd())){
                        this.ghost();
                        if (!this.swingHit && checkAABB(dino, this.bladeBox(84))){ this.swingHit = true; this.hurtP(1); }
                    }
                    if (T(18)){ this.swordAngle = -2.1; this.chem(88, true, -0.5); }
                    HT();
                    if (QUA(34)) this.toIdle(18);
                    return true;
                }
                // ===== ROULETTE SPIN (Nhảy vọt lên xoay kiếm bám theo mục tiêu trên không) =====
                if (st === 'nr_roulette'){
                    this.physics(); this.swordDrawn = true; this.subTimer++;
                    if (this.subTimer <= 2) this.faceP();
                    if (T(2)){
                        this.baoDon('ROULETTE SPIN', 10);
                        this.dy = -10.5; this.grounded = false;
                        this.buocTheo(9, 16);
                    }
                    if (this.subTimer > Math.round(10 / this.spd()) && this.subTimer < Math.round(38 / this.spd())){
                        this.spin = (this.spin || 0) + 0.58; this.swordAngle = -Math.PI + (this.spin % (Math.PI * 2));
                        this.dy = Math.min(this.dy, 0.5);
                        if (this.subTimer % Math.round(7 / this.spd()) === 0){
                            let hop = { x: this.cx() - 74, y: this.y - 110, w: 148, h: this.h + 118 };
                            this.swingHit = false;
                            if (checkAABB(dino, hop)){ this.hurtP(1); }
                            this.vet.push({ t: 10, max: 10, dir: (this.subTimer % 14 < 7) ? 1 : -1, reach: 86, mau: this.revLevel() >= 2 ? '#FF7043' : '#E3F2FD', day: 5, goc: -1.6, ket: false });
                            if (SFX.tone) SFX.tone(520, 0.04, 'square', 0.09, 300);
                        }
                    }
                    if (QUA(46)){ this.spin = 0; this.toIdle(18); }
                    return true;
                }
                // ===== BLUE ROSE GUN CANCEL (Nhịp bắn cực nhanh 16 frame giữa chuỗi) =====
                if (st === 'nr_gun'){
                    this.physics(); this.faceP(); this.gunDrawn = true; this.gunAngle = -0.10; this.subTimer++;
                    if (T(2)) this.buocTheo(7, 12);
                    for (let k = 0; k < 2; k++) if (T(4 + k * 7)){
                        this.fireBlueRose(false, -0.03); this.fireBlueRose(false, 0.03);
                        this.muzzle = 6;
                        if (SFX.tone) SFX.tone(700, 0.04, 'square', 0.10, 400);
                    }
                    if (QUA(16)) this.toIdle(8);
                    return true;
                }
                // ===== BREAK AGE =====
                if (st === 'nr_breakage'){
                    this.physics(); this.subTimer++; this.breakerGlow = 30; this.armR = -1.3;
                    if (this.subTimer <= 2) this.faceP();
                    let id = this.br().id;
                    if (T(2)){
                        this.baoDon(NR_TEN_BA[id] || 'BREAK AGE', 20);
                        this.brShake = 26; this.baX = dino.x + dino.w / 2; this.baY = dino.y + dino.h / 2;
                        if (id === 'overture' || id === 'tomboy') this.buocTheo(14, 22);
                    }
                    if (this.subTimer < Math.round(12 / this.spd())){ this.baX = dino.x + dino.w / 2; this.baY = dino.y + dino.h / 2; }
                    if (T(22)){
                        shakeTimer = Math.max(shakeTimer, 30); if (SFX.bossExplode) SFX.bossExplode();
                        if (id === 'overture'){
                            visualEffects.push(new Effect(this.cx(), this.cy(), 'lightning_burst', true, 2.4));
                            for (let k = 0; k < 10; k++){ let a = k / 10 * Math.PI * 2; visualEffects.push(new Effect(this.cx() + Math.cos(a) * 100, this.cy() + Math.sin(a) * 70, 'lightning_shock', true, 26)); }
                            if (Math.hypot((dino.x + dino.w/2) - this.cx(), (dino.y + dino.h/2) - this.cy()) < 135) this.hurtP(1);
                        } else if (id === 'gerbera'){
                            this.baLaser = { t: 16, goc: Math.atan2(this.baY - this.cy(), this.baX - this.cx()) };
                            for (let k = -1; k <= 1; k++){
                                let a = this.baLaser.goc + k * 0.22, px = dino.x + dino.w/2 - this.cx(), py = dino.y + dino.h/2 - this.cy();
                                let doc = px * Math.cos(a) + py * Math.sin(a), ngang = Math.abs(-px * Math.sin(a) + py * Math.cos(a));
                                if (doc > 0 && ngang < 20){ this.hurtP(1); break; }
                            }
                        } else if (id === 'punchline'){
                            let p = new BossProjectile(this.cx() + d * 20, Math.min(300, this.baY) - 22, d * 14, 0, false, 1);
                            p.w = 70; p.h = 44; p.color = '#EF5350'; p.isPiercing = true; bossProjectiles.push(p);
                        } else {
                            this.revs = 3; this.chem(124, true, 0); this.fireCrescent(true);
                            let bx = { x: d > 0 ? this.x + this.w : this.x - 140, y: this.y - 24, w: 140, h: this.h + 34 };
                            if (checkAABB(dino, bx)) this.hurtP(1);
                        }
                    }
                    if (QUA(36)){ this.baLaser = null; this.brLeft = 0; this.pendingBreak = false; this.voTay(); }
                    return true;
                }
                return false;
            },
            // ----- TICK CAC HIEU UNG BO SUNG -----
            nrKiemTick(){
                if (this.baLaser && --this.baLaser.t <= 0) this.baLaser = null;

                // 1. Bom hen gio Charge Shot 3
                if (this._cshots && this._cshots.length){
                    for (let i = this._cshots.length - 1; i >= 0; i--){
                        let cs = this._cshots[i]; cs.t--;
                        if (cs.t <= 0){
                            visualEffects.push(new Effect(cs.x, cs.y, 'explosion', true, 48));
                            shakeTimer = Math.max(shakeTimer, 16);
                            if (Math.hypot((dino.x + dino.w/2) - cs.x, (dino.y + dino.h/2) - cs.y) < 62) this.hurtP(1);
                            if (SFX.bossExplode) SFX.bossExplode();
                            this._cshots.splice(i, 1);
                        }
                    }
                }

                // 2. Tia laser phan xa Petal Ray
                if (this._petals && this._petals.length){
                    for (let i = this._petals.length - 1; i >= 0; i--){
                        let pt = this._petals[i]; pt.life--;
                        pt.x += pt.vx; pt.y += pt.vy;
                        if (pt.y <= 36 || pt.y >= 316){
                            pt.vy *= -1; pt.y = Math.max(36, Math.min(316, pt.y));
                            pt.bounces--;
                            visualEffects.push(new Effect(pt.x, pt.y, 'parry', false));
                            if (SFX.tone) SFX.tone(1350, 0.03, 'sine', 0.06, 900);
                        }
                        if (pt.x <= 12 || pt.x >= canvas.width - 12){
                            pt.vx *= -1; pt.bounces--;
                        }
                        if (checkAABB(dino, { x: pt.x - 10, y: pt.y - 10, w: 20, h: 20 })){
                            this.hurtP(1); pt.life = 0;
                        }
                        if (pt.life <= 0 || pt.bounces < 0) this._petals.splice(i, 1);
                    }
                }

                // 3. Nam Dam Quy khong lo roi tu tren troi
                if (this._fists && this._fists.length){
                    for (let i = this._fists.length - 1; i >= 0; i--){
                        let f = this._fists[i]; f.t--;
                        if (f.t > 0) continue;
                        f.y += 17;
                        if (!f.hit && checkAABB(dino, { x: f.x - 24, y: f.y - 28, w: 48, h: 56 })){
                            f.hit = true; this.hurtP(1);
                        }
                        if (f.y >= 312){
                            visualEffects.push(new Effect(f.x, 316, 'body_slam_shockwave', true, 56));
                            shakeTimer = Math.max(shakeTimer, 16);
                            if (SFX.bossExplode) SFX.bossExplode();
                            this._fists.splice(i, 1);
                        }
                    }
                }

                // 4. DT Summoned Swords
                if (!this.kiem) this.kiem = [];
                if (this.phase !== 2){ this.kiem.length = 0; return; }
                if (this.kiem.length < 4 && frames % 40 === 0) this.kiem.push({ a: Math.random() * 6.28, st: 'quay', t: 0, x: this.cx(), y: this.cy(), vx: 0, vy: 0 });
                for (let i = this.kiem.length - 1; i >= 0; i--){
                    let k = this.kiem[i]; k.t++;
                    if (k.st === 'quay'){
                        k.a += 0.07; k.x = this.cx() + Math.cos(k.a) * 46; k.y = this.cy() - 6 + Math.sin(k.a) * 30;
                        if (k.t > 70 && this.kiem.indexOf(k) === 0 && frames % 28 === 0){
                            let a = Math.atan2((dino.y + dino.h/2) - k.y, (dino.x + dino.w/2) - k.x);
                            k.vx = Math.cos(a) * 11; k.vy = Math.sin(a) * 11; k.st = 'bay';
                            if (SFX.tone) SFX.tone(1500, 0.04, 'triangle', 0.08, 900);
                        }
                    } else {
                        k.x += k.vx; k.y += k.vy;
                        let hop = { x: k.x - 12, y: k.y - 12, w: 24, h: 24 };
                        let vo = false;
                        for (let pi = projectiles.length - 1; pi >= 0; pi--){
                            let pr = projectiles[pi]; if (!pr || pr.owner !== 1 || !checkAABB(pr, hop)) continue;
                            vo = true; if (!(pr.type === 2 || (pr.pierceCount || 0) > 0)) projectiles.splice(pi, 1); break;
                        }
                        if (!vo && checkAABB(dino, hop)){ vo = true; this.hurtP(1); }
                        if (vo || k.x < -40 || k.x > canvas.width + 40 || k.y > 360 || k.y < -60){
                            visualEffects.push(new Effect(k.x, k.y, 'explosion', true, 12)); this.kiem.splice(i, 1);
                        }
                    }
                }
            },
            nrVe(){
                if (this._cshots && this._cshots.length){
                    for (let cs of this._cshots){
                        let k = 1 - cs.t / cs.max;
                        ctx.save();
                        ctx.translate(cs.x, cs.y);
                        ctx.globalAlpha = 0.35 + 0.55 * k;
                        ctx.strokeStyle = (frames % 4 < 2) ? '#FF3D00' : '#FFEA00';
                        ctx.lineWidth = 2.5;
                        ctx.beginPath(); ctx.arc(0, 0, 56 * (1 - k * 0.5), 0, 6.28); ctx.stroke();
                        ctx.fillStyle = '#FF6D00';
                        ctx.beginPath(); ctx.arc(0, 0, 6 + k * 8, 0, 6.28); ctx.fill();
                        ctx.restore();
                    }
                }
                if (this._petals && this._petals.length){
                    ctx.save();
                    ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 12;
                    for (let pt of this._petals){
                        ctx.strokeStyle = '#80DEEA'; ctx.lineWidth = 5; ctx.lineCap = 'round';
                        ctx.beginPath(); ctx.moveTo(pt.x, pt.y); ctx.lineTo(pt.x - pt.vx * 2.2, pt.y - pt.vy * 2.2); ctx.stroke();
                        ctx.fillStyle = '#FFFFFF';
                        ctx.beginPath(); ctx.arc(pt.x, pt.y, 4, 0, 6.28); ctx.fill();
                    }
                    ctx.restore();
                }
                if (this._fists && this._fists.length){
                    for (let f of this._fists){
                        if (f.t > 0){
                            ctx.save();
                            ctx.globalAlpha = 0.45; ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 2;
                            ctx.setLineDash([6, 6]);
                            ctx.beginPath(); ctx.moveTo(f.x, 0); ctx.lineTo(f.x, 320); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.beginPath(); ctx.ellipse(f.x, 316, 28, 6, 0, 0, 6.28); ctx.stroke();
                            ctx.restore();
                        } else {
                            ctx.save();
                            ctx.translate(f.x, f.y);
                            ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 16;
                            ctx.fillStyle = 'rgba(0, 176, 255, 0.85)';
                            ctx.beginPath();
                            ctx.moveTo(-18, -28); ctx.lineTo(18, -28); ctx.lineTo(22, 12);
                            ctx.lineTo(0, 26); ctx.lineTo(-22, 12);
                            ctx.closePath(); ctx.fill();
                            ctx.fillStyle = '#E0F7FA';
                            ctx.fillRect(-10, -18, 20, 24);
                            ctx.restore();
                        }
                    }
                }
                if (this._xWave > 0){
                    let k = this._xWave / 20, xx = this._xWaveX || this.cx();
                    ctx.save();
                    ctx.globalAlpha = k;
                    ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 18;
                    ctx.strokeStyle = '#FF3D00'; ctx.lineWidth = 7; ctx.lineCap = 'round';
                    ctx.beginPath(); ctx.moveTo(xx - 55, 205); ctx.lineTo(xx + 55, 315); ctx.stroke();
                    ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 7;
                    ctx.beginPath(); ctx.moveTo(xx + 55, 205); ctx.lineTo(xx - 55, 315); ctx.stroke();
                    ctx.restore();
                }
                for (const k of this.kiem || []){
                    let a = k.st === 'bay' ? Math.atan2(k.vy, k.vx) : Math.atan2((dino.y + dino.h/2) - k.y, (dino.x + dino.w/2) - k.x);
                    ctx.save(); ctx.translate(k.x, k.y); ctx.rotate(a);
                    ctx.globalAlpha = 0.9; ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 10;
                    ctx.fillStyle = '#80DEEA'; ctx.beginPath(); ctx.moveTo(16, 0); ctx.lineTo(2, -4); ctx.lineTo(-12, -2.5); ctx.lineTo(-12, 2.5); ctx.lineTo(2, 4); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = '#E0F7FA'; ctx.fillRect(-12, -1, 22, 2); ctx.fillRect(-14, -6, 3, 12);
                    ctx.restore();
                }
                if (this.baLaser && this.baLaser.t > 0){
                    ctx.save(); ctx.globalAlpha = this.baLaser.t / 16; ctx.lineCap = 'round';
                    for (let k = -1; k <= 1; k++){
                        let a = this.baLaser.goc + k * 0.22, ex = this.cx() + Math.cos(a) * 900, ey = this.cy() + Math.sin(a) * 900;
                        ctx.strokeStyle = '#4DD0E1'; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(this.cx(), this.cy()); ctx.lineTo(ex, ey); ctx.stroke();
                        ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(this.cx(), this.cy()); ctx.lineTo(ex, ey); ctx.stroke();
                    }
                    ctx.restore();
                }
                if (this.state === 'nr_breakage' && this.br().id === 'gerbera' && this.subTimer < 22 && this.baX != null){
                    let g = Math.atan2(this.baY - this.cy(), this.baX - this.cx());
                    ctx.save(); ctx.globalAlpha = 0.4 + 0.3 * Math.sin(frames * 0.6); ctx.strokeStyle = '#4DD0E1'; ctx.lineWidth = 2; ctx.setLineDash([8, 6]);
                    for (let k = -1; k <= 1; k++){ let a = g + k * 0.22; ctx.beginPath(); ctx.moveTo(this.cx(), this.cy()); ctx.lineTo(this.cx() + Math.cos(a) * 900, this.cy() + Math.sin(a) * 900); ctx.stroke(); }
                    ctx.setLineDash([]); ctx.restore();
                }
                if (this.state === 'nr_breakage' && this.br().id === 'overture' && this.subTimer < 22){
                    ctx.save(); ctx.globalAlpha = 0.25 + 0.25 * Math.sin(frames * 0.8); ctx.strokeStyle = '#FFCA28'; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 135, 0, 6.28); ctx.stroke(); ctx.restore();
                }
                if (this.muzzle > 0){
                    this.muzzle--; let d = this.dir(), mx = this.cx() + d * 30, my = this.y + 25;
                    ctx.save(); ctx.globalAlpha = this.muzzle / 6; ctx.fillStyle = '#FFF59D';
                    for (let q = -1; q <= 1; q += 2){ ctx.beginPath(); ctx.moveTo(mx, my + q * 3); ctx.lineTo(mx + d * 16, my + q * 6 - 3); ctx.lineTo(mx + d * 16, my + q * 6 + 3); ctx.closePath(); ctx.fill(); }
                    ctx.restore();
                }
                if (this.revFx > 0){
                    this.revFx--;
                    ctx.save(); ctx.globalAlpha = this.revFx / 14; ctx.strokeStyle = '#FF7043'; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 28 + (14 - this.revFx) * 3, 0, 6.28); ctx.stroke();
                    ctx.fillStyle = '#FFD54F'; ctx.font = 'bold italic 11px Consolas, monospace'; ctx.textAlign = 'center';
                    ctx.fillText('EX-ACT!', this.cx(), this.y - 8 - (14 - this.revFx)); ctx.textAlign = 'left';
                    ctx.restore();
                }
            }
        });
// BOSS_PART_END s0.Object.assign.NeroBoss.prototype.1

// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24489 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, IronhaulBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0.drawTopBossBar.1 READ_ONLY
function drawTopBossBar(b, col, label, sub, hang){
            /* Khong truyen `hang` (boss TU ve thanh mau) ma trong cung mot khung co hai con
               cung goi thi thanh thu hai phai TU xuong hang duoi, khong de len nhau. */
            if (_tbbKhung === frames) _tbbSo++; else { _tbbSo = 0; _tbbKhung = frames; }
            /* Tap phai co DAU KHUNG rieng. Neu chi xoa o day thi khung nao KHONG con nao tu ve
               thanh mau se khong xoa gi ca, va tap giu nguyen ten boss cua khung truoc — con
               boss thuong bi coi la "da co thanh roi" mai mai, thanh ra mat sach thanh mau. */
            if (_tbbDaVeKhung !== frames){ _tbbDaVe.clear(); _tbbDaVeKhung = frames; }
            _tbbDaVe.add(b);
            let W = 340, x0 = canvas.width/2 - W/2, H = sub ? 30 : 17;
            /* SAN TAP co mot hang nut chiem tron dai y = 10..46, ve thanh mau len do la bi
               che khuat. Chi trong san tap moi day thanh xuong duoi hang nut do. */
            let _dinh = (typeof dojoMode !== 'undefined' && dojoMode) ? 52 : 10;
            let Y = _dinh + ((hang === undefined ? _tbbSo : hang)) * 34;
            ctx.save();
            /* Thanh mau la HUD, phai nam yen o dinh man hinh. Truoc day no duoc ve BEN TRONG
               phep dich camera, ma camY khoi dau la -CAM_TROI (160) — nen thanh mau tut hn
               160px xuong giua khung hinh, va o cac map camera cuon doc (bien, tetris) no con
               truot theo camera. Tra ve dung toa do MAN HINH. */
            if (typeof DPR === 'number') ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            ctx.fillStyle = "rgba(0,0,0,0.74)"; ctx.fillRect(x0 - 4, Y, W + 8, H);
            ctx.strokeStyle = "rgba(255,255,255,0.20)"; ctx.lineWidth = 1; ctx.strokeRect(x0 - 4, Y, W + 8, H);
            ctx.fillStyle = "rgba(255,255,255,0.13)"; ctx.fillRect(x0, Y + 4, W, 10);
            ctx.fillStyle = col; ctx.fillRect(x0, Y + 4, W * Math.max(0, Math.min(1, b.hp / b.maxHp)), 10);
            if (sub){
                ctx.fillStyle = "rgba(255,255,255,0.13)"; ctx.fillRect(x0, Y + 17, W, 7);
                ctx.fillStyle = sub.col; ctx.fillRect(x0, Y + 17, W * Math.max(0, Math.min(1, sub.v)), 7);
                ctx.fillStyle = "#0A0C10"; ctx.font = "bold 8px Consolas, monospace"; ctx.textAlign = "left";
                ctx.fillText(sub.name, x0 + 4, Y + 23.5);
            }
            ctx.fillStyle = "white"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
            ctx.fillText(label + "   " + Math.max(0, Math.ceil(b.hp)) + " / " + b.maxHp, canvas.width/2, Y + H + 12);
            ctx.textAlign = "left"; ctx.restore();
        }
// BOSS_PART_END s0.drawTopBossBar.1

// Nguồn: index.html:99250 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:99261 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
