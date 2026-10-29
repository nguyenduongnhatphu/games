// BOSS_FILE: TyrantRexBoss
// BOSS_SNAPSHOT: c46ab032a6cbf762cde49e8ab251e6d69cdda9d15fe744f89765bcb84b9046a7
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, pickFromBag, shakeTimer, visualEffects
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

// Nguồn: index.html:9491 · Dùng bởi: TyrantRexBoss
// BOSS_PART_BEGIN s0.BCR_W.1 EDITABLE
const BCR_W = 168, BCR_H = 132;
// BOSS_PART_END s0.BCR_W.1

// Nguồn: index.html:9492 · Dùng bởi: TyrantRexBoss
// BOSS_PART_BEGIN s0.TyrantRexBoss.1 EDITABLE
class TyrantRexBoss {
            constructor(level){
                this.name='BÁO CHÚA REX'; this.hp=190; this.maxHp=190; this.phase=1;
                this.w=BCR_W; this.h=BCR_H; this.baseY=320-this.h;
                this.x=canvas.width+40; this.y=this.baseY; this.dy=0; this.grounded=true;
                this.state='entering'; this.subTimer=0; this.actionTimer=70; this.facingLeft=true; this.invulnAll=true;
                this.burnTimer=0; this.lastMeleeHit=-1; this.lastSkill=''; this._bag=null;
                this.ham=0; this.duoi=0; this.chan=0;        // goc ham / duoi / chan cho hoat anh
                this.hit=false; this.combo=0; this.hung=0;   // hung = buff toc do sau khi gam
                this.song=[]; this.da=[]; this.bui=[];
                this.tel=0; this.rung=0;
            }
            spd(){ return (this.phase===2?1.26:1) * (this.hung>0?1.25:1); }
            hurtP(n){ if(!dino.isShielding()) dino.takeDamage(n); else parry(); }
            physics(){
                this.dy+=0.72; this.y+=this.dy;
                if(this.y>=this.baseY){this.y=this.baseY;this.dy=0;this.grounded=true;} else this.grounded=false;
                this.x=Math.max(4,Math.min(canvas.width-this.w-4,this.x));
            }
            toIdle(t){
                this.state='idle'; this.subTimer=0; this.actionTimer=Math.max(12,Math.round(t/this.spd()));
                this.ham=0; this.duoi=0; this.hit=false; this.combo=0; this.tel=0;
            }
            hop(reach, cao){ let d=this.dir();
                return d>0 ? {x:this.x+this.w-10, y:this.y+(this.h-cao), w:reach, h:cao}
                           : {x:this.x+10-reach, y:this.y+(this.h-cao), w:reach, h:cao}; }
            danh(reach, cao, dmg, hat){
                if(this.hit) return;
                if(!checkAABB(dino, this.hop(reach,cao))) return;
                this.hit=true; this.hurtP(dmg||1);
                if(hat && !dino.isShielding()){ dino.dy=-hat; dino.grounded=false; dino.x += this.dir()*24; }
            }
            taoSong(x, dir){ this.song.push({x:x, dir:dir, t:0, hit:false}); }
            tickSong(){
                for(let i=this.song.length-1;i>=0;i--){
                    let S=this.song[i]; S.t++; S.x += S.dir*11;
                    if(!S.hit && dino.grounded && Math.abs((dino.x+dino.w/2)-S.x)<34){
                        S.hit=true; this.hurtP(1); dino.dy=-9; dino.grounded=false;
                    }
                    if(S.t>90 || S.x<-60 || S.x>canvas.width+60) this.song.splice(i,1);
                }
            }
            taoDa(x, y, vx, vy){ this.da.push({x:x,y:y,vx:vx,vy:vy,t:0,hit:false,r:9+Math.random()*7}); }
            tickDa(){
                for(let i=this.da.length-1;i>=0;i--){
                    let D=this.da[i]; D.t++; D.vy+=0.34; D.x+=D.vx; D.y+=D.vy;
                    if(!D.hit && checkAABB(dino,{x:D.x-D.r,y:D.y-D.r,w:D.r*2,h:D.r*2})){ D.hit=true; this.hurtP(1); }
                    if(D.y>324){
                        visualEffects.push(new Effect(D.x,318,'explosion',true,16));
                        this.da.splice(i,1); continue;
                    }
                    if(D.t>200) this.da.splice(i,1);
                }
            }
            pickSkill(){
                let g=Math.abs(this.gap()), gan=g<190, xa=g>330;
                let ds = gan ? ['can','giam','quet','can','nhay','gam']
                       : xa  ? ['huc','gam','nhay','huc']
                             : ['can','huc','nhay','giam','gam'];
                this.state=pickFromBag(this,ds); this.subTimer=0; this.faceP();
            }
            startPhase2(){
                this.phase=2; this.hp=Math.max(1,Math.round(this.maxHp*0.5));
                this.name='BÁO CHÚA REX — CUỒNG NỘ';
                this.state='no'; this.subTimer=0; this._bag=null; this.hung=240;
                floatingTexts.push(new FloatingText(this.cx()-60,this.y-30,'CUỒNG NỘ!'));
                shakeTimer=Math.max(shakeTimer,40);
                if(SFX.bossEntry)SFX.bossEntry();
            }
            update(){
                this.tickSong(); this.tickDa();
                if(this.hung>0) this.hung--;
                if(this.rung>0) this.rung--;
                if(this.phase===1 && this.hp<=this.maxHp*0.5 && this.state!=='entering'){ this.startPhase2(); return; }
                const T=(n)=>this.subTimer===Math.round(n/this.spd());
                const QUA=(n)=>this.subTimer>Math.round(n/this.spd());

                if(this.state==='entering'){
                    this.x-=4; this.chan+=0.2;
                    if(this.x<=canvas.width-260){ this.x=canvas.width-260; this.invulnAll=false; this.state='gam'; this.subTimer=0; }
                    return;
                }
                if(this.state==='no'){
                    this.subTimer++; this.physics(); this.ham=Math.min(1,this.subTimer/16);
                    this.rung=6;
                    if(this.subTimer%8===0) visualEffects.push(new Effect(this.cx()+(Math.random()-0.5)*140,this.cy()+(Math.random()-0.5)*90,'explosion',true,24));
                    if(QUA(70)){ this.toIdle(20); }
                    return;
                }
                if(this.state==='idle'){
                    this.physics(); this.faceP(); this.chan+=0.16*this.spd();
                    let g=this.gap(), ad=Math.abs(g);
                    if(ad>250) this.x+=Math.sign(g)*2.0*this.spd();
                    else if(ad<130) this.x-=Math.sign(g)*1.2*this.spd();
                    this.actionTimer--; if(this.actionTimer<=0) this.pickSkill();
                    return;
                }
                // ===== GAM =====
                if(this.state==='gam'){
                    this.physics(); this.faceP(); this.subTimer++;
                    this.ham=Math.min(1,this.subTimer/20);
                    if(T(2)) floatingTexts.push(new FloatingText(this.cx()-30,this.y-26,'GẦM'));
                    if(T(24)){
                        this.rung=20; shakeTimer=Math.max(shakeTimer,26);
                        this.hung=this.phase===2?300:200;
                        if(SFX.bossSkill)SFX.bossSkill();
                        // song am day lui
                        if(Math.abs(this.gap())<300){
                            this.hurtP(1);
                            dino.x += this.dir()*46; dino.dy=-6; dino.grounded=false;
                        }
                        for(let k=0;k<10;k++) visualEffects.push(new Effect(this.cx()+this.dir()*(40+k*26), this.cy()-10+(Math.random()-0.5)*50,'charge_wave',true,0.8));
                        // PHA 2: gam keo theo DA ROI
                        if(this.phase===2) for(let k=0;k<6;k++) this.taoDa(90+Math.random()*(canvas.width-180), -40, (Math.random()-0.5)*2, 2+Math.random()*2);
                    }
                    if(QUA(56)) this.toIdle(26);
                    return;
                }
                // ===== CAN NHIEU NHIP =====
                if(this.state==='can'){
                    this.physics(); this.subTimer++;
                    if(this.subTimer<=2) this.faceP();
                    let nhip = this.phase===2?4:3;
                    for(let k=0;k<nhip;k++){
                        let t0 = 14 + k*20;
                        if(T(t0)){ this.combo=k+1; this.hit=false; this.ham=1; this.x += this.dir()*(k===nhip-1?26:14); }
                        if(this.subTimer>=Math.round(t0/this.spd()) && this.subTimer<=Math.round((t0+9)/this.spd())){
                            if(k===nhip-1) this.danh(96, 62, 1, 12);   // nhip cuoi: ngoam va quat
                            else this.danh(84, 52, 1, 0);
                        }
                    }
                    if(this.subTimer%6===0) this.ham=Math.max(0,this.ham-0.25);
                    if(QUA(14+nhip*20+16)) this.toIdle(this.phase===2?24:34);
                    return;
                }
                // ===== GIAM DAT =====
                if(this.state==='giam'){
                    this.physics(); this.faceP(); this.subTimer++;
                    if(T(2)) floatingTexts.push(new FloatingText(this.cx()-24,this.y-26,'GIẪM'));
                    if(this.subTimer<Math.round(20/this.spd())){ this.chan=Math.sin(this.subTimer*0.4)*0.6; return; }
                    if(T(20)){ this.dy=-9; this.grounded=false; }
                    if(!this.grounded) return;
                    if(T(30)||this.dy===0&&this.subTimer>Math.round(20/this.spd())&&!this.hit){
                        this.hit=true;
                        shakeTimer=Math.max(shakeTimer,30); this.rung=14;
                        visualEffects.push(new Effect(this.cx(),this.y+this.h,'body_slam_shockwave',true,130));
                        if(SFX.bossSkill)SFX.bossSkill();
                        this.taoSong(this.cx(),1); this.taoSong(this.cx(),-1);
                        if(this.phase===2){ this.taoSong(this.cx()+40,1); this.taoSong(this.cx()-40,-1); }
                        if(Math.abs((dino.x+dino.w/2)-this.cx())<110 && dino.grounded){ this.hurtP(1); dino.dy=-8; }
                    }
                    if(QUA(60)) this.toIdle(34);
                    return;
                }
                // ===== QUET DUOI =====
                if(this.state==='quet'){
                    this.physics(); this.subTimer++;
                    if(this.subTimer<=2) this.faceP();
                    if(T(2)) floatingTexts.push(new FloatingText(this.cx()-34,this.y-26,'QUÉT ĐUÔI'));
                    if(this.subTimer<Math.round(22/this.spd())){ this.duoi=-0.5*(this.subTimer/22); return; }
                    let p2=(this.subTimer-Math.round(22/this.spd()))/18;
                    this.duoi=-0.5+p2*2.4;
                    if(p2>=0 && p2<=1 && !this.hit){
                        // quat CA HAI BEN: khong the chi lui ra sau lung
                        let r={x:this.cx()-150, y:this.y+this.h-46, w:300, h:46};
                        if(checkAABB(dino,r)){ this.hit=true; this.hurtP(1);
                            dino.dy=-11; dino.grounded=false;
                            dino.x += ((dino.x+dino.w/2)<this.cx()?-1:1)*40;
                            visualEffects.push(new Effect(dino.x+dino.w/2,dino.y+dino.h,'explosion',true,30));
                        }
                    }
                    if(QUA(56)) this.toIdle(30);
                    return;
                }
                // ===== HUC XUYEN =====
                if(this.state==='huc'){
                    this.subTimer++;
                    if(this.subTimer<=2) this.faceP();
                    if(T(2)){ floatingTexts.push(new FloatingText(this.cx()-30,this.y-26,'HÚC')); this.tel=1; }
                    if(this.subTimer<Math.round(34/this.spd())){
                        this.physics(); this.x -= this.dir()*1.1; this.chan=Math.sin(this.subTimer*0.6)*0.5;
                        return;
                    }
                    this.tel=0; this.y=this.baseY; this.dy=0;
                    this.x += this.dir()*(this.phase===2?15:12);
                    this.chan += 0.5;
                    if(this.subTimer%4===0) visualEffects.push(new Effect(this.cx()-this.dir()*40, this.y+this.h-6,'explosion',true,18));
                    if(!this.hit && checkAABB(dino,{x:this.x,y:this.y,w:this.w,h:this.h})){
                        this.hit=true; this.hurtP(1);
                        dino.x += this.dir()*70; dino.dy=-10; dino.grounded=false;
                    }
                    if(this.x<=6 || this.x>=canvas.width-this.w-6){
                        // dam vao tuong -> CHOANG, day la cua so phan don
                        this.state='choang'; this.subTimer=0;
                        shakeTimer=Math.max(shakeTimer,36); this.rung=24;
                        for(let k=0;k<8;k++) this.taoDa(this.cx()+(Math.random()-0.5)*90, this.y-10, (Math.random()-0.5)*5, -3-Math.random()*3);
                        return;
                    }
                    if(QUA(120)) this.toIdle(36);
                    return;
                }
                if(this.state==='choang'){
                    this.physics(); this.subTimer++;
                    this.ham=Math.abs(Math.sin(this.subTimer*0.12))*0.5;
                    if(T(4)) floatingTexts.push(new FloatingText(this.cx()-30,this.y-30,'CHOÁNG!'));
                    if(QUA(70)) this.toIdle(18);
                    return;
                }
                // ===== NHAY DE =====
                if(this.state==='nhay'){
                    this.subTimer++;
                    if(this.subTimer<=2) this.faceP();
                    if(T(2)) this.mocX = dino.x + dino.w/2;
                    if(T(18)){ this.dy=-17; this.grounded=false; }
                    if(this.subTimer<Math.round(18/this.spd())){ this.physics(); return; }
                    this.dy+=0.62; this.y+=this.dy;
                    if(this.dy<0) this.mocX = dino.x + dino.w/2;
                    else this.x += ((this.mocX - this.w/2) - this.x)*0.10;
                    if(this.y>=this.baseY){
                        this.y=this.baseY; this.dy=0; this.grounded=true;
                        shakeTimer=Math.max(shakeTimer,34); this.rung=16;
                        visualEffects.push(new Effect(this.cx(),this.y+this.h,'body_slam_shockwave',true,150));
                        if(SFX.bossSkill)SFX.bossSkill();
                        for(let k=0;k<6;k++){
                            let a=(k/6)*Math.PI - Math.PI;
                            this.taoDa(this.cx(), this.y+this.h-20, Math.cos(a)*7, Math.sin(a)*6-3);
                        }
                        if(Math.abs((dino.x+dino.w/2)-this.cx())<120 && dino.grounded){ this.hurtP(1); dino.dy=-10; }
                        this.toIdle(40);
                    }
                    if(QUA(150)){ this.y=this.baseY; this.dy=0; this.toIdle(36); }
                    return;
                }
                if(this.state==='returning'){
                    this.subTimer++; this.physics(); this.faceP();
                    this.x += (this.cx()>dino.x+dino.w/2?1:-1)*3;
                    if(this.subTimer>=30) this.toIdle(34);
                    return;
                }
                this.toIdle(26);
            }
            draw(){
                // ---- song xung kich ----
                for(let S of this.song){
                    ctx.save(); ctx.globalAlpha=Math.max(0,0.7-S.t/90);
                    ctx.strokeStyle='#FFB74D'; ctx.lineWidth=4;
                    for(let k=0;k<3;k++){
                        ctx.beginPath();
                        ctx.arc(S.x, 320, 16+k*13+S.t*0.4, Math.PI*1.15, Math.PI*1.85);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // ---- da ----
                for(let D of this.da){
                    ctx.save(); ctx.translate(D.x,D.y); ctx.rotate(D.t*0.14);
                    ctx.fillStyle='#5D4037'; ctx.fillRect(-D.r,-D.r,D.r*2,D.r*2);
                    ctx.fillStyle='#795548'; ctx.fillRect(-D.r+3,-D.r+3,D.r*2-6,D.r*2-6);
                    ctx.restore();
                }
                // ---- vach bao HUC ----
                if(this.tel){
                    let d=this.dir();
                    ctx.save(); ctx.globalAlpha=0.35+0.3*Math.sin(frames*0.5);
                    ctx.fillStyle='#FF5722';
                    ctx.fillRect(d>0?this.cx():0, this.y+this.h-40, d>0?canvas.width-this.cx():this.cx(), 34);
                    ctx.restore();
                }
                const rx=this.rung>0?(Math.random()-.5)*this.rung*.5:0;
                drawRexBossBody(this, true, rx);
                // ---- thanh mau (@@HE-BCR-BAR) ----
                // Truoc day tu ve mot thanh rieng BEN TRONG phep dich camera -> tut xuong giua map,
                // va vi khong qua drawTopBossBar nen HUD con bu them thanh mac dinh "TYRANT REX"
                // -> 2 thanh. Gio chi dung MOT thanh HUD chung o dinh man hinh.
                drawTopBossBar(this, this.phase===2?'#FF3D00':'#FF7043', this.name,
                    this.hung>0 ? { name:'CUỒNG BẠO', col:'#FFD54F', v:this.hung/240 } : null);
            }
        }
// BOSS_PART_END s0.TyrantRexBoss.1

// Nguồn: index.html:24178 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24189 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24206 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:98512 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:98523 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
