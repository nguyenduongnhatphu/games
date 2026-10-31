// BOSS_FILE: YasuoBoss
// BOSS_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, CM, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, YAS_H, YAS_KHIEN_HOI, YAS_KHIEN_LAU, YAS_W, Yasuo2Boss, ZeroBoss, bossProjectiles, bossVaoTam, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, nhipXa, parry, pickFromBag, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:9045 · Dùng bởi: YasuoBoss
// BOSS_PART_BEGIN s0.YasuoBoss.1 EDITABLE
class YasuoBoss {
            constructor(level){
                this.name='YASUO'; this.hp=140; this.maxHp=140; this.phase=1;
                this.w=YAS_W; this.h=YAS_H; this.baseY=320-this.h;
                this.x=canvas.width+30; this.y=this.baseY; this.dy=0; this.grounded=true;
                this.state='entering'; this.subTimer=0; this.actionTimer=54; this.facingLeft=true; this.invulnAll=true;
                this.burnTimer=0; this.lastMeleeHit=-1; this.lastSkill=''; this._bag=null;
                this.swordAngle=-0.4; this.armR=0;
                this.khienT=0; this.khienCd=YAS_KHIEN_HOI;   // NHIP: thanh hoi lop chan
                this.tuong=null;                              // W
                this.loc=[];                                  // LOC XOAY that su bay ra
                this.slash=null; this.vet=[];
                this.dam=null;                                // Q: cu choc
                this.rVung=null;                              // R: vung chi dinh
                this.dashDir=1; this.dashHit=false;
                this.comboN=0;                                // E xong thi danh thuong lien tiep
            }
            spd(){ return 1; }
            hurtP(n){ if(!dino.isShielding()) dino.takeDamage(n); else parry(); }
            physics(){
                this.dy+=0.66; this.y+=this.dy;
                if(this.y>=this.baseY){this.y=this.baseY;this.dy=0;this.grounded=true;} else this.grounded=false;
                this.x=Math.max(8,Math.min(canvas.width-this.w-8,this.x));
            }
            toIdle(t){
                this.state='idle'; this.subTimer=0; this.actionTimer=Math.max(10,Math.round(t));
                this.slash=null; this.dam=null; this.dashHit=false; this.armR=0; this.swordAngle=-0.4;
            }
            // ================= NHIP: lop chan chan dan trong 1 giay =================
            tickKhien(){
                if (this.khienT > 0){
                    this.khienT--;
                    for (let i=projectiles.length-1;i>=0;i--){
                        let pr=projectiles[i]; if(!pr||pr.owner!==1) continue;
                        if (!checkAABB(pr,{x:this.x-14,y:this.y-14,w:this.w+28,h:this.h+28})) continue;
                        projectiles.splice(i,1);
                        visualEffects.push(new Effect(pr.x,pr.y,'parry',this.dir()<0));
                    }
                } else if (this.khienCd > 0) this.khienCd--;
            }
            bungKhien(){
                if (this.khienCd > 0 || this.khienT > 0) return false;
                this.khienT = YAS_KHIEN_LAU; this.khienCd = YAS_KHIEN_HOI;
                floatingTexts.push(new FloatingText(this.x-10,this.y-30,'NHỊP!'));
                if (SFX.parry) SFX.parry();
                return true;
            }
            // ================= don thuong: nhat chem =================
            chem(reach, up, life){
                this.slash={t:life,dir:this.dir(),reach:reach,up:up||0,hit:false};
                this.vet.push({t:life,max:life,dir:this.dir(),reach:reach,up:up||0});
                if(SFX.tone)SFX.tone(760,0.05,'square',0.10,300);
            }
            tickSlash(){
                for(let i=this.vet.length-1;i>=0;i--) if(--this.vet[i].t<=0) this.vet.splice(i,1);
                let a=this.slash; if(!a) return;
                a.t--;
                if(!a.hit){
                    let r=a.dir<0?{x:this.x-a.reach,y:this.y-a.up,w:a.reach,h:this.h+a.up}
                                 :{x:this.x+this.w,y:this.y-a.up,w:a.reach,h:this.h+a.up};
                    if(checkAABB(dino,r)){ a.hit=true; this.hurtP(1); }
                }
                if(a.t<=0) this.slash=null;
            }
            // ================= Q: CHOC KIEM =================
            tickDam(){
                let D=this.dam; if(!D) return;
                D.t++;
                if(D.t===D.raT){
                    let dai=5*CM, r=D.dir<0?{x:this.cx()-dai,y:this.y+14,w:dai,h:26}
                                           :{x:this.cx(),y:this.y+14,w:dai,h:26};
                    D.hop=r;
                    if(checkAABB(dino,r)) this.hurtP(1);
                    visualEffects.push(new Effect(this.cx()+D.dir*dai*0.55,this.y+27,'lightning_shock',true,26));
                    if(SFX.tone)SFX.tone(1200,0.05,'square',0.13,600);
                    shakeTimer=Math.max(shakeTimer,10);
                }
                if(D.t>D.raT+12) this.dam=null;
            }
            // ================= LOC XOAY that su =================
            taoLoc(x,y,dir){
                this.loc.push({x:x,y:y,dir:dir,t:0,r:20,hit:false});
                if(SFX.bossSkill)SFX.bossSkill();
            }
            tickLoc(){
                for(let i=this.loc.length-1;i>=0;i--){
                    let L=this.loc[i]; L.t++;
                    L.x += L.dir*4.2; L.r = Math.min(40, 20 + L.t*0.35);
                    if(!L.hit && checkAABB(dino,{x:L.x-L.r,y:280-L.r*2.2,w:L.r*2,h:L.r*2.2+40})){
                        L.hit=true;
                        if(!dino.isShielding()){
                            dino.dy=-15; dino.grounded=false;
                            this.hurtP(1);
                            floatingTexts.push(new FloatingText(dino.x-16,dino.y-30,'HẤT TUNG!'));
                            shakeTimer=Math.max(shakeTimer,16);
                            // trung loc -> vao R NGAY
                            this.loc.splice(i,1);
                            // Khong de nguoi choi an khung bat tu o day: don loc va nhat dau cua
                            // chieu cuoi phai vao DU CA HAI. Xoa khung bat tu vua duoc cap.
                            dino.invincible=false; dino.invTimer=0;
                            this.rVung={x:dino.x+dino.w/2,t:0,n:0,ha:false,treo:true};
                            this.state='r_go'; this.subTimer=0;
                            continue;
                        } else this.hurtP(1);
                    }
                    if(L.t>150||L.x<-60||L.x>canvas.width+60) this.loc.splice(i,1);
                }
            }
            // ================= W =================
            dungTuong(){
                let d=this.dir();
                this.tuong={x:this.cx()+d*56,t:180,w:12,h:132};
                floatingTexts.push(new FloatingText(this.tuong.x-30,150,'TƯỜNG GIÓ'));
                if(SFX.bossSkill)SFX.bossSkill();
            }
            tickTuong(){
                let T2=this.tuong; if(!T2) return;
                T2.t--;
                let hop={x:T2.x-T2.w/2,y:320-T2.h,w:T2.w,h:T2.h};
                for(let i=projectiles.length-1;i>=0;i--){
                    let pr=projectiles[i]; if(!pr||pr.owner!==1) continue;
                    if(!checkAABB(pr,hop)) continue;
                    projectiles.splice(i,1);
                    visualEffects.push(new Effect(T2.x,pr.y,'parry',this.dir()<0));
                }
                if(T2.t<=0) this.tuong=null;
            }
            pickSkill(){
                let gan=Math.abs(this.gap())<150;
                // R khong con phai cho loc xoay. Thinh thoang han TU bo tri tren dau nguoi
                // choi roi bo xuong — nguoi choi phai doc vong bao tren troi ma tranh.
                // @@HE-NHIPXA
                let list = !nhipXa(this, gan) ? ['q_prep','danh','w_prep','q_prep','danh','r_tu']
                                              : ['e_prep','e_prep','w_prep','r_tu','q_prep'];
                this.state=pickFromBag(this,list); this.subTimer=0; this.faceP();
            }
            update(){
                this.tickKhien(); this.tickSlash(); this.tickDam(); this.tickTuong(); this.tickLoc();
                // bi ban nhieu -> bung NHIP
                if(this.khienT<=0 && this.khienCd<=0){
                    for(let pr of projectiles) if(pr.owner===1 &&
                        Math.abs((pr.x)-this.cx())<150 && Math.abs(pr.y-this.cy())<70){ this.bungKhien(); break; }
                }
                const T=(n)=>this.subTimer===n, QUA=(n)=>this.subTimer>n;

                if(this.state==='entering'){this.x-=5;if(this.x<=canvas.width-200){this.x=canvas.width-200;this.invulnAll=false;this.toIdle(40);}return;}
                if(this.state==='idle'){
                    this.physics(); this.faceP();
                    // Di nhanh hon han: truoc day 2.6 nen han hay dung ngoai tam roi choc Q
                    // vao khong khi. Gio ap sat truoc khi ra don.
                    bossVaoTam(this, 76, 148, 7.0);
                    this.actionTimer--; if(this.actionTimer<=0)this.pickSkill();
                    return;
                }
                // ===== DON THUONG =====
                if(this.state==='danh'){
                    this.physics(); this.subTimer++;
                    if(this.subTimer<=2)this.faceP();
                    if(T(8)){ this.swordAngle=-1.5; this.x+=this.dir()*5; this.chem(74,10,11); }
                    if(QUA(26)){
                        if(this.comboN>0){ this.comboN--; this.state='danh'; this.subTimer=0; this.faceP(); }
                        else this.toIdle(24);
                    }
                    return;
                }
                // ===== Q: CHOC =====
                if(this.state==='q_prep'){
                    // Ngoai tam choc thi DI TOI truoc, khong dam vao khong khi.
                    if(this.subTimer===0 && Math.abs(this.gap())>5*CM*0.85){ this.toIdle(6); return; }
                    this.physics(); this.faceP(); this.subTimer++;
                    this.swordAngle=-0.05;
                    this.x-=this.dir()*0.9;                       // ruon ra sau lay the
                    if(T(1)) floatingTexts.push(new FloatingText(this.x-6,this.y-28,'Q'));
                    if(QUA(14)){ this.dam={t:0,raT:4,dir:this.dir()}; this.state='q_go'; this.subTimer=0; }
                    return;
                }
                if(this.state==='q_go'){
                    this.physics(); this.subTimer++; this.swordAngle=0;
                    if(T(4)) this.x+=this.dir()*14;
                    if(QUA(22)) this.toIdle(20);
                    return;
                }
                // ===== Q LEN — COT GIO XOAY duoi chan nguoi choi dang bay (@@HE-BO-AA) =====
                // Thay cho R bay len duoi theo: Yasuo dung duoi dat, cam kiem xuong, mot cot loc
                // xoay moc len o cho nguoi choi (khoa cho sau 14 khung). Trung thi hat tung.
                if(this.state==='q_len'){
                    this.physics(); this.faceP(); this.subTimer++; this.swordAngle=1.2;
                    if(T(1)){ this.lenX=dino.x+dino.w/2; floatingTexts.push(new FloatingText(this.x-6,this.y-28,'Q ↑')); }
                    if(this.subTimer<14) this.lenX+=((dino.x+dino.w/2)-this.lenX)*0.25;
                    if(T(28)){
                        let r={x:this.lenX-34,y:320-230,w:68,h:230};
                        if(checkAABB(dino,r)){ let h=dino.hp; this.hurtP(1); if(dino.hp<h){ dino.dy=-10; dino.grounded=false; } }
                        this.lenNo=20; shakeTimer=Math.max(shakeTimer,10);
                        visualEffects.push(new Effect(this.lenX,300,'explosion',true,22));
                        if(SFX.bossSkill)SFX.bossSkill();
                    }
                    if(QUA(46)) this.toIdle(22);
                    return;
                }
                // ===== W =====
                if(this.state==='w_prep'){
                    this.physics(); this.faceP(); this.subTimer++; this.armR=-1.2;
                    if(T(16)) this.dungTuong();
                    if(QUA(34)) this.toIdle(28);
                    return;
                }
                // ===== E (co the noi Q thanh LOC XOAY) =====
                if(this.state==='e_prep'){
                    this.physics(); this.faceP(); this.subTimer++; this.swordAngle=-0.8;
                    if(T(1)) floatingTexts.push(new FloatingText(this.x-6,this.y-28,'E'));
                    if(QUA(13)){
                        this.state='e_go'; this.subTimer=0; this.dashDir=this.dir(); this.dashHit=false;
                        this.eqSe = Math.random()<0.45;            // co noi Q thanh loc khong
                    }
                    return;
                }
                if(this.state==='e_go'){
                    this.subTimer++; this.y=this.baseY; this.dy=0;
                    this.x+=this.dashDir*15;
                    this.swordAngle=-0.4+Math.sin(this.subTimer*0.6)*0.5;
                    if(this.subTimer%3===0)visualEffects.push(new Effect(this.cx()-this.dashDir*16,this.cy(),'explosion',true,12));
                    if(!this.dashHit&&checkAABB(dino,{x:this.x-10,y:this.y,w:this.w+20,h:this.h})){
                        this.dashHit=true; this.hurtP(1);          // KHONG cong don
                        visualEffects.push(new Effect(dino.x+dino.w/2,dino.y+dino.h/2,'explosion',true,22));
                    }
                    if(this.subTimer>24||this.x<10||this.x>canvas.width-this.w-10){
                        this.x=Math.max(8,Math.min(canvas.width-this.w-8,this.x));
                        if(this.eqSe){ this.state='eq_loc'; this.subTimer=0; return; }
                        this.comboN=2;                              // E xong -> danh thuong lien tiep
                        this.state='danh'; this.subTimer=0; this.faceP(); return;
                    }
                    return;
                }
                // ===== E -> Q: LOC XOAY QUANH THAN =====
                if(this.state==='eq_loc'){
                    this.physics(); this.subTimer++; this.swordAngle=this.subTimer*0.5;
                    if(T(1)) floatingTexts.push(new FloatingText(this.x-22,this.y-30,'LỐC XOÁY'));
                    if(this.subTimer>=6&&this.subTimer<=26&&this.subTimer%4===0){
                        visualEffects.push(new Effect(this.cx()+(Math.random()-0.5)*70,this.cy()+(Math.random()-0.5)*50,'explosion',true,18));
                        if(!this._locHit&&checkAABB(dino,{x:this.x-42,y:this.y-16,w:this.w+84,h:this.h+24})){
                            this._locHit=true; this.hurtP(1);
                        }
                    }
                    if(T(28)){ this._locHit=false; this.taoLoc(this.cx()+this.dir()*30,this.y+20,this.dir()); }
                    if(QUA(46)){ this._locHit=false; this.toIdle(30); }
                    return;
                }
                // ===== R TU KICH HOAT: chi dinh vung tren dau nguoi choi =====
                if(this.state==='r_tu'){
                    this.subTimer++;
                    if(T(1)){
                        this.rVung={x:dino.x+dino.w/2,t:0,n:0,ha:false,treo:false};
                        floatingTexts.push(new FloatingText(this.rVung.x-40,90,'TỬ THẦN CHI TỤC'));
                    }
                    this.physics();
                    // LUOT toi vung roi moi bung chieu — truoc day chop thang len (8,80) nen
                    // nguoi choi khong thay han di duong nao.
                    if(this.subTimer>18){
                        let tx=Math.max(8,Math.min(canvas.width-this.w-8,this.rVung.x-this.w/2));
                        let dx=tx-this.x, dy=80-this.y, dd=Math.hypot(dx,dy);
                        if(dd>22){ this.x+=dx/dd*22; this.y+=dy/dd*22; this.dy=0;
                            visualEffects.push(new Effect(this.cx(),this.cy(),'explosion',true,12)); }
                        else {
                            this.x=tx; this.y=80; this.dy=0;
                            for(let k=0;k<5;k++)visualEffects.push(new Effect(this.cx()+(Math.random()-0.5)*50,this.cy()+(Math.random()-0.5)*50,'explosion',true,20));
                            shakeTimer=Math.max(shakeTimer,18);
                            this.state='r_go'; this.subTimer=0;
                        }
                        return;
                    }
                    return;
                }
                // ===== R: chi dinh VUNG, chuoi chem roi bo xuong =====
                if(this.state==='r_go'){
                    this.subTimer++;
                    let V=this.rVung; if(!V){ this.toIdle(26); return; }
                    // treo nguoi choi trong vung
                    if(this.subTimer<64){
                        if(V.treo){                       // den tu LOC XOAY -> giu nguoi choi lo lung
                            dino.y += (Math.max(70,dino.y-30) - dino.y)*0.18; dino.dy=0; dino.grounded=false;
                            this.y = dino.y - 4;
                        } else {                          // TU kich hoat -> chi lo lung tai cho, khong bat nguoi choi
                            this.y += (86 - this.y)*0.2;
                        }
                        this.x += ((V.x - this.w/2) - this.x)*0.25; this.dy=0;
                    }
                    // chuoi chem kieu Judgement Cut
                    if(this.subTimer<58 && this.subTimer%7===0){
                        V.n++;
                        let goc0 = V.treo ? dino.y : this.cy();
                        let px=V.x+(Math.random()-0.5)*100, py=goc0+(Math.random()-0.5)*70;
                        this.vet.push({t:9,max:9,dir:Math.random()<0.5?-1:1,reach:70,up:10,tuDo:{x:px,y:py}});
                        visualEffects.push(new Effect(px,py,'explosion',true,22));
                        if(V.treo || checkAABB(dino,{x:px-46,y:py-40,w:92,h:80})) this.hurtP(1);
                        if(SFX.tone)SFX.tone(900+V.n*40,0.03,'square',0.09,500);
                    }
                    // BO XUONG DAT + 2 luong song
                    if(this.subTimer===64){
                        this.dy=20; if(V.treo) dino.dy=16;
                    }
                    if(this.subTimer>64 && !V.ha){
                        this.y+=this.dy; this.dy+=0.9;
                        if(this.y>=this.baseY){
                            this.y=this.baseY; this.dy=0; V.ha=true;
                            visualEffects.push(new Effect(this.cx(),this.y+this.h,'body_slam_shockwave',true,120));
                            shakeTimer=Math.max(shakeTimer,40);
                            if(SFX.bossSkill)SFX.bossSkill();
                            if(Math.abs((dino.x+dino.w/2)-this.cx())<90) this.hurtP(1);
                            for(let ss of[-1,1]){
                                let pr=new BossProjectile(this.cx(),286,ss*9,0,true,1);
                                pr.w=56; pr.h=34; pr.color='#4DD0E1'; pr.frail=true;
                                bossProjectiles.push(pr);
                            }
                        }
                    }
                    if(V.ha && this.subTimer>92){ this.rVung=null; this.toIdle(46); }
                    if(this.subTimer>200){ this.rVung=null; this.toIdle(46); }
                    return;
                }
                if(this.state==='returning'){
                    this.subTimer++; this.physics(); this.faceP();
                    this.x+=(this.cx()>dino.x+dino.w/2?1:-1)*4;
                    if(this.subTimer>=26) this.toIdle(32);
                    return;
                }
                this.toIdle(24);
            }
            draw(){
                // ---- COT GIO Q LEN (@@HE-BO-AA) ----
                if(this.state==='q_len' && this.subTimer<28 && this.lenX!=null){
                    let k=this.subTimer/28; ctx.save();
                    ctx.globalAlpha=0.3+0.4*k; ctx.strokeStyle=this.subTimer<14?'#80DEEA':'#FFFFFF'; ctx.lineWidth=2;
                    ctx.beginPath(); ctx.ellipse(this.lenX,318,34,7,0,0,Math.PI*2); ctx.stroke();
                    ctx.globalAlpha=0.12+0.2*k; ctx.fillStyle='#4DD0E1'; ctx.fillRect(this.lenX-34,320-230,68,230);
                    ctx.restore();
                }
                if(this.lenNo>0){
                    this.lenNo--; let a=this.lenNo/20; ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle='#E0F7FA'; ctx.lineWidth=3;
                    for(let k=0;k<9;k++){ let yy=320-k*26-(20-this.lenNo)*4, w=16+k*2.5;
                        ctx.beginPath(); ctx.ellipse(this.lenX,yy,w,6,0,0,Math.PI*2); ctx.stroke(); }
                    ctx.restore();
                }
                // ---- TUONG GIO ----
                if(this.tuong){
                    let T2=this.tuong, mo=Math.min(1,T2.t/30);
                    ctx.save();
                    ctx.globalAlpha=0.20*mo; ctx.fillStyle='#4DD0E1';
                    ctx.fillRect(T2.x-T2.w/2,320-T2.h,T2.w,T2.h);
                    ctx.globalAlpha=0.75*mo; ctx.strokeStyle='#B2EBF2'; ctx.lineWidth=2;
                    for(let k=0;k<7;k++){
                        let yy=320-T2.h+k*(T2.h/7)+((frames*2.2+k*14)%(T2.h/7));
                        ctx.beginPath(); ctx.moveTo(T2.x-9,yy);
                        ctx.quadraticCurveTo(T2.x,yy-8,T2.x+9,yy); ctx.stroke();
                    }
                    ctx.globalAlpha=0.9*mo; ctx.strokeStyle='#E0F7FA'; ctx.lineWidth=2;
                    ctx.strokeRect(T2.x-T2.w/2,320-T2.h,T2.w,T2.h);
                    ctx.restore();
                }
                // ---- LOC XOAY ----
                for(let L of this.loc){
                    ctx.save();
                    for(let k=0;k<5;k++){
                        let t2=k/5, R=L.r*(0.35+t2*0.75), yy=300-t2*88;
                        ctx.globalAlpha=0.30+0.28*(1-t2);
                        ctx.strokeStyle=k%2?'#B2EBF2':'#4DD0E1'; ctx.lineWidth=3;
                        ctx.beginPath();
                        ctx.ellipse(L.x+Math.sin(L.t*0.25+k)*5,yy,R,R*0.30,0,0,Math.PI*2);
                        ctx.stroke();
                    }
                    ctx.globalAlpha=0.5; ctx.strokeStyle='#E0F7FA'; ctx.lineWidth=2;
                    for(let k=0;k<3;k++){
                        let a2=L.t*0.3+k*2.1;
                        ctx.beginPath();
                        ctx.moveTo(L.x+Math.cos(a2)*L.r*0.8,300);
                        ctx.lineTo(L.x+Math.cos(a2+1.4)*L.r*0.3,300-84);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // ---- Q: cu choc ----
                if(this.dam && this.dam.t>=this.dam.raT-3){
                    let D=this.dam, dai=5*CM, mo=Math.max(0,1-(D.t-D.raT)/12);
                    ctx.save(); ctx.globalAlpha=0.55*mo;
                    ctx.fillStyle='#B3E5FC';
                    ctx.fillRect(D.dir<0?this.cx()-dai:this.cx(), this.y+22, dai, 10);
                    ctx.globalAlpha=0.95*mo; ctx.fillStyle='#E1F5FE';
                    ctx.fillRect(D.dir<0?this.cx()-dai:this.cx(), this.y+25, dai, 3);
                    ctx.restore();
                } else if(this.state==='q_prep'){
                    let dai=5*CM, t2=Math.min(1,this.subTimer/14);
                    ctx.save(); ctx.globalAlpha=0.18+0.22*t2;
                    ctx.strokeStyle='#4DD0E1'; ctx.lineWidth=2; ctx.setLineDash([7,6]);
                    ctx.beginPath();
                    ctx.moveTo(this.cx(),this.y+27);
                    ctx.lineTo(this.cx()+this.dir()*dai,this.y+27); ctx.stroke();
                    ctx.setLineDash([]); ctx.restore();
                }
                // ---- vet chem ----
                for(let a of this.vet){
                    let cxS,cyS;
                    if(a.tuDo){ cxS=a.tuDo.x; cyS=a.tuDo.y; }
                    else { cxS=a.dir<0?this.x:this.x+this.w; cyS=this.y+this.h/2-a.up*0.4; }
                    ctx.save(); ctx.globalAlpha=Math.min(1,a.t/(a.max*0.6));
                    ctx.strokeStyle='#B3E5FC'; ctx.lineWidth=4; ctx.lineCap='round';
                    let mo=1-a.t/a.max,bd=0.95;
                    for(let k=0;k<3;k++){
                        let R=Math.max(10,a.reach-k*17)*(0.7+0.35*mo);
                        ctx.beginPath();
                        ctx.arc(cxS,cyS,R,a.dir<0?Math.PI-bd:-bd,a.dir<0?Math.PI+bd:bd,false);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                // ---- than ----
                let d=this.dir(), cx=this.cx();
                ctx.save(); ctx.translate(cx,this.y); ctx.scale(d,1); ctx.translate(-cx,-this.y);
                ctx.fillStyle='#2B3A55'; ctx.fillRect(this.x+8,this.y+18,this.w-16,this.h-24);
                ctx.fillStyle='#8E2B2B'; ctx.fillRect(this.x+8,this.y+34,this.w-16,7);
                ctx.fillStyle='#E8C9A0'; ctx.fillRect(this.x+12,this.y+4,this.w-24,16);
                ctx.fillStyle='#1A1A22'; ctx.fillRect(this.x+10,this.y,this.w-20,8);
                ctx.fillStyle='#1A1A22'; ctx.fillRect(this.x+this.w-18,this.y+2,10,26);
                ctx.fillStyle='#0D0D12'; ctx.fillRect(this.x+14,this.y+9,5,3); ctx.fillRect(this.x+23,this.y+9,5,3);
                ctx.fillStyle='#3E5170'; ctx.fillRect(this.x+6,this.y+this.h-8,12,8);
                ctx.fillStyle='#3E5170'; ctx.fillRect(this.x+this.w-18,this.y+this.h-8,12,8);
                ctx.save(); ctx.translate(this.x+this.w-6,this.y+30); ctx.rotate(this.swordAngle);
                ctx.fillStyle='#6D4C41'; ctx.fillRect(-6,-2,10,4);
                ctx.fillStyle='#CFD8DC'; ctx.fillRect(4,-2,44,4);
                ctx.fillStyle='#ECEFF1'; ctx.fillRect(4,-1,42,1.5);
                ctx.restore(); ctx.restore();
                // ---- lop chan dang bat ----
                if(this.khienT>0){
                    ctx.save(); ctx.globalAlpha=0.22+0.16*Math.sin(frames*0.5);
                    ctx.fillStyle='#4DD0E1';
                    ctx.beginPath(); ctx.arc(cx,this.cy(),40,0,Math.PI*2); ctx.fill();
                    ctx.globalAlpha=0.9; ctx.strokeStyle='#E0F7FA'; ctx.lineWidth=3;
                    ctx.beginPath(); ctx.arc(cx,this.cy(),40,0,Math.PI*2); ctx.stroke();
                    ctx.restore();
                }
                // ================= THANH MAU (@@HE-BCR-BAR) — dung HUD chung, khong ve trong camera =================
                let tp=this.khienT>0 ? this.khienT/YAS_KHIEN_LAU : 1-this.khienCd/YAS_KHIEN_HOI;
                drawTopBossBar(this, '#4DD0E1', this.name,
                    { name: this.khienT>0?'NHỊP — ĐANG CHẶN':'NHỊP', col: this.khienT>0?'#FFD54F':'#80DEEA', v: Math.max(0,Math.min(1,tp)) });
            }
        }
// BOSS_PART_END s0.YasuoBoss.1

// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24489 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, IronhaulBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
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
