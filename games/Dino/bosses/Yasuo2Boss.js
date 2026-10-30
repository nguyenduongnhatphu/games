// BOSS_FILE: Yasuo2Boss
// BOSS_SNAPSHOT: 90b44e51b8a8c0ad12fba495a59e199c399e173aab86fbee147786ba09666942
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Y2_CHUOI_GAN, Y2_CHUOI_KHONG, Y2_CHUOI_XA, Y2_H, Y2_TEN, Y2_W, YasuoBoss, ZeroBoss, aaHeSo, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:8619 · Dùng bởi: Yasuo2Boss
// BOSS_PART_BEGIN s0.Yasuo2Boss.1 EDITABLE
class Yasuo2Boss {
            constructor(level){
                this.name='YASUO V2'; this.hp=165; this.maxHp=165; this.phase=1;
                this.w=Y2_W; this.h=Y2_H; this.baseY=320-this.h;
                this.x=canvas.width+30; this.y=this.baseY; this.dy=0; this.grounded=true;
                this.state='entering'; this.subTimer=0; this.actionTimer=54; this.facingLeft=true;
                this.invulnAll=true; this.burnTimer=0; this.lastMeleeHit=-1;
                this.chuoi=[]; this.nhip=0; this.hitFlag=false;
                this.tempest=0;                   // dem Steel Tempest -> nhip 3 thanh loc xoay
                this.wall=null;                   // Wind Wall dang dung
                this.gio=[];                      // luoi gio bay
                this.loc=[];                      // loc xoay
                this.calm=false;                  // dang trong the Calm
                this.dashHit=false; this.swordAngle=-0.4; this.legAnim=0;
                this.ultDung=false;               // Last Breath moi run mot lan moi pha
                this.fx=[];
            }
            cx(){ return this.x+this.w/2; }
            cy(){ return this.y+this.h/2; }
            gap(){ return (dino.x+dino.w/2)-this.cx(); }
            faceP(){ this.facingLeft = this.gap()<0; }
            dir(){ return this.facingLeft?-1:1; }
            hurtP(n){ if(!dino.isShielding()) dino.takeDamage(n); else parry(); }
            physics(){
                this.dy+=0.66; this.y+=this.dy;
                if(this.y>=this.baseY){this.y=this.baseY;this.dy=0;this.grounded=true;} else this.grounded=false;
                this.x=Math.max(8,Math.min(canvas.width-this.w-8,this.x));
            }
            // === HOP: mot vung danh truoc mat, dung chung cho phan lon chieu ===
            hop(dai,cao,lech){
                let k=aaHeSo(this); dai*=k;                       // @@HE-CHONGKHONG: chi noi tam NGANG
                let d=this.dir(), y=this.y+(lech===undefined?12:lech);
                return d<0 ? {x:this.cx()-dai,y,w:dai,h:cao} : {x:this.cx(),y,w:dai,h:cao};
            }
            danhTrung(r,dmg){
                if(this.hitFlag) return false;
                if(!checkAABB(dino,r)) return false;
                this.hitFlag=true; this.hurtP(dmg||1);
                visualEffects.push(new Effect(dino.x+dino.w/2,dino.y+dino.h/2,'explosion',true,16));
                return true;
            }
            hatTung(luc){ dino.dy=-(luc||11); dino.grounded=false; dino.canDoubleJump=true; this._vuaHat=frames; }
            // === CHON CHUOI ===
            chonChuoi(){
                let kc=Math.abs(this.gap()), tren=!dino.grounded;
                let bo = tren ? Y2_CHUOI_KHONG : (kc>230 ? Y2_CHUOI_XA : Y2_CHUOI_GAN);
                let c = bo[Math.floor(Math.random()*bo.length)].slice();
                // @@HE-BO-AA: vua hat tung trung (Updraft/Skybound) va nguoi choi con lo lung -> LAST BREATH
                if (tren && !this.ultDung && frames - (this._vuaHat || -999) < 40) c = ['y2_last'];
                // o xa thi luon mo dau bang mot chieu TIEP CAN
                if(!tren && kc>300 && c[0]!=='y2_sweep' && c[0]!=='y2_wall') c.unshift('y2_sweep');
                // PHA 2: noi hai chuoi lien nhau — day chinh la cach game doi khang gay ap luc,
                // khong phai bang mot don manh ma bang mot chuoi KHONG CO KHE HO de tho.
                if(this.phase>=2 && !tren && Math.random()<0.55){
                    let c2 = bo[Math.floor(Math.random()*bo.length)];
                    c = c.concat(['y2_calm']).concat(c2);
                }
                // SUPER: ket chuoi bang mot super. Pha 1 hiem, pha 2 thuong xuyen.
                let pSuper = this.phase>=2 ? 0.40 : 0.14;
                if(Math.random()<pSuper){
                    if(tren) c.push('y2_rise');
                    else c.push(Math.random()<0.5 ? 'y2_storm' : 'y2_rise');
                }
                this.chuoi=c; this.nhip=0;
                this.raNhip();
            }
            raNhip(){
                if(!this.chuoi.length){ this.state='idle'; this.actionTimer=this.phase>=2?12:22; this.calm=false; return; }
                let m=this.chuoi.shift();
                this.state=m; this.subTimer=0; this.hitFlag=false; this.dashHit=false;
                this.nhip++;
                if(m!=='y2_calm') this.calm=false;
                // Hien TEN CUA MOI chieu — bo 23 chieu chi doc duoc neu nguoi choi nhin ra
                // dang danh cai gi. Day cung la quy uoc cua game doi khang.
                if(m!=='y2_zephyr' && m!=='y2_tail' && m!=='y2_head')
                    floatingTexts.push(new FloatingText(this.cx()-46,this.y-30-(this.nhip%3)*12,Y2_TEN[m]||m));
            }
            ketNhip(){ this.raNhip(); }
            update(){
                if(this.dying) return;
                this.tickGio();
                for(let i=this.fx.length-1;i>=0;i--){ let e=this.fx[i]; e.t++; if(e.t>e.max) this.fx.splice(i,1); }
                if(this.wall){ this.wall.t--; if(this.wall.t<=0) this.wall=null; else this.chanDan(); }
                if(this.hp<=this.maxHp*0.45 && this.phase===1){ this.phase=2; this.ultDung=false;
                    floatingTexts.push(new FloatingText(this.cx()-60,this.y-46,'GIÓ NỔI LÊN!'));
                    shakeTimer=Math.max(shakeTimer,20); }

                if(this.state==='entering'){ this.x-=6; if(this.x<=canvas.width-230){ this.invulnAll=false; this.state='idle'; this.actionTimer=40; } this.physics(); return; }
                if(this.state==='idle'){
                    this.physics(); this.faceP();
                    let g=this.gap(), ad=Math.abs(g);
                    if(ad>150) this.x+=Math.sign(g)*(this.phase>=2?3.4:2.6);
                    else if(ad<80) this.x-=Math.sign(g)*1.6;
                    this.actionTimer--;
                    if(this.actionTimer<=0) this.chonChuoi();
                    return;
                }
                this.raChieu();
            }
            // ---------- tung chieu ----------
            raChieu(){
                let st=this.state, T=this.subTimer++, d=this.dir();
                const XONG=()=>this.ketNhip();

                // ===== STEEL TEMPEST — dam 2 nhip, nhip 3 thanh LOC XOAY =====
                if(st==='y2_steel'){
                    this.physics(); if(T<6) this.faceP();
                    this.swordAngle=-0.4+Math.min(1,T/8)*1.4;
                    if(T===8){
                        this.tempest++;
                        if(this.tempest>=3){
                            this.tempest=0;
                            this.loc.push({x:this.cx()+d*40,y:this.baseY+10,dir:d,t:0,hit:false,tung:true});
                            SFX.bossSkill && SFX.bossSkill();
                        } else {
                            let r=this.hop(74,30,10);
                            this.danhTrung(r,1);
                            this.fx.push({k:'dam',x:this.cx()+d*40,y:this.y+22,d,t:0,max:10});
                            // dam vao TUONG GIO -> phong ra luoi gio tam xa
                            if(this.wall && Math.abs(this.wall.x-this.cx())<120){
                                this.gio.push({x:this.wall.x,y:this.y+20,dir:d,t:0,hit:false});
                                floatingTexts.push(new FloatingText(this.cx()-40,this.y-44,'LƯỠI GIÓ!'));
                            }
                        }
                    }
                    if(T>18) XONG();
                    return;
                }
                // ===== SWEEPING BLADE — luot xuyen qua nguoi choi =====
                if(st==='y2_sweep'){
                    if(T===0){ this.faceP(); this.swDir=this.dir(); }
                    this.x+=this.swDir*13; this.physics();
                    if(!this.dashHit && checkAABB(dino,this)){ this.dashHit=true; this.hurtP(1);
                        visualEffects.push(new Effect(dino.x+dino.w/2,dino.y+dino.h/2,'explosion',true,18)); }
                    this.fx.push({k:'vet',x:this.cx(),y:this.cy(),t:0,max:8});
                    if(T>13||this.x<=10||this.x>=canvas.width-this.w-10) XONG();
                    return;
                }
                // ===== DWELLING BLADE — dung lai chem tai cho =====
                if(st==='y2_dwell'){
                    this.physics();
                    if(T===6){ this.danhTrung(this.hop(70,34,8),1); this.fx.push({k:'chem',x:this.cx()+d*36,y:this.y+18,d,t:0,max:12}); }
                    if(T>11) XONG(); return;
                }
                // ===== PARTING BLADE — chem roi lui ra =====
                if(st==='y2_part'){
                    this.physics();
                    if(T===5){ this.danhTrung(this.hop(66,34,8),1); this.fx.push({k:'chem',x:this.cx()+d*30,y:this.y+20,d:-d,t:0,max:12}); }
                    if(T>5) this.x-=d*7;
                    if(T>13) XONG(); return;
                }
                // ===== SKYBOUND BLADE — hat tung =====
                if(st==='y2_sky'){
                    this.physics();
                    if(T===7){ if(this.danhTrung(this.hop(60,52,-6),1)) this.hatTung(12);
                        this.fx.push({k:'boc',x:this.cx()+d*30,y:this.y,t:0,max:14}); }
                    if(T===8){ this.dy=-9; }
                    if(T>16) XONG(); return;
                }
                // ===== WIND WALL — chan sach dan cua nguoi choi =====
                if(st==='y2_wall'){
                    this.physics();
                    if(T===6){ this.wall={x:this.cx()+d*54,t:200}; SFX.bossSkill && SFX.bossSkill(); }
                    if(T>11) XONG(); return;
                }
                // ===== TURBULENT WIND — luong gio day lui =====
                if(st==='y2_turb'){
                    this.physics();
                    if(T>8 && T<30 && T%6===0) this.gio.push({x:this.cx()+d*30,y:this.y+16+(T%12),dir:d,t:0,hit:false,yeu:true});
                    if(T>26) XONG(); return;
                }
                // ===== CALM — the tan cong, chi la nhip chuyen =====
                if(st==='y2_calm'){
                    this.physics(); this.faceP(); this.calm=true;
                    if(T===0) this.fx.push({k:'calm',x:this.cx(),y:this.cy(),t:0,max:16});
                    if(T>5) XONG(); return;
                }
                // ===== CAC NHANH CUA CALM =====
                if(st==='y2_stomp'){                        // giam chan -> soc dat
                    this.physics();
                    if(T===9){ shakeTimer=Math.max(shakeTimer,14);
                        this.danhTrung({x:this.cx()-96,y:this.baseY+30,w:192,h:34},1);
                        this.fx.push({k:'soc',x:this.cx(),y:this.baseY+this.h,t:0,max:14}); }
                    if(T>13) XONG(); return;
                }
                if(st==='y2_lash'){                         // quat gio tam trung
                    this.physics();
                    if(T===7){ this.danhTrung(this.hop(96,30,12),1); this.fx.push({k:'quat',x:this.cx()+d*48,y:this.y+20,d,t:0,max:12}); }
                    if(T>11) XONG(); return;
                }
                if(st==='y2_sever'){                        // chem manh, day lui
                    this.physics();
                    if(T===10){ if(this.danhTrung(this.hop(84,40,6),1)) dino.x+=d*26;
                        this.fx.push({k:'chem',x:this.cx()+d*44,y:this.y+16,d,t:0,max:18});
                        this.fx.push({k:'quat',x:this.cx()+d*40,y:this.y+20,d,t:0,max:12}); }
                    if(T>16) XONG(); return;
                }
                if(st==='y2_scloud'){                       // chem THAP -> phai NHAY
                    this.physics();
                    if(T<10 && T%3===0) this.fx.push({k:'thap',x:this.cx()+d*40,y:this.baseY+38,t:0,max:8});
                    if(T===11){ let r={x:d<0?this.cx()-104:this.cx(),y:this.baseY+30,w:104,h:26};
                        this.danhTrung(r,1); }
                    if(T>14) XONG(); return;
                }
                if(st==='y2_zephyr'){                       // buoc lach nhanh
                    this.faceP(); this.x+=this.dir()*9; this.physics();
                    this.fx.push({k:'vet',x:this.cx(),y:this.cy(),t:0,max:7});
                    if(T>5) XONG(); return;
                }
                if(st==='y2_updraft'){                      // chong khong, hat tung
                    this.physics();
                    if(T===8){ if(this.danhTrung({x:this.cx()-46,y:this.y-58,w:92,h:110},1)) this.hatTung(13);
                        this.fx.push({k:'boc',x:this.cx(),y:this.y-20,t:0,max:18});
                        this.fx.push({k:'calm',x:this.cx(),y:this.y+10,t:0,max:14}); }
                    if(T>14) XONG(); return;
                }
                if(st==='y2_tail'){ this.faceP(); this.x+=this.dir()*11; this.physics(); if(T>6) XONG(); return; }
                if(st==='y2_head'){ this.x-=this.dir()*10; this.physics(); if(T>6) XONG(); return; }
                // ===== ANKLE CUT — don THAP, phai nhay =====
                if(st==='y2_ankle'){
                    this.physics();
                    if(T>2&&T<9&&T%2===0) this.fx.push({k:'thap',x:this.cx()+d*38,y:this.baseY+44,t:0,max:5});
                    if(T===9){ let r={x:d<0?this.cx()-78:this.cx(),y:this.baseY+34,w:78,h:22};
                        this.danhTrung(r,1); this.fx.push({k:'thap',x:this.cx()+d*40,y:this.baseY+40,t:0,max:14}); }
                    if(T>13) XONG(); return;
                }
                // ===== GALE BLADE — bay len chem =====
                // @@HE-BO-AA: chuoi tren khong (Gale) CHI chay khi vua hat tung trung — hut thi bo qua,
                // khong nhay len chem vao khong khi.
                if((st==='y2_gale'||st==='y2_rgale') && T===0 && frames-(this._vuaHat||-999)>45 && this.grounded){ XONG(); return; }
                if(st==='y2_sgale' && T===0 && this.grounded){ XONG(); return; }
                if(st==='y2_gale'){
                    if(T===0){ this.dy=-11; this.grounded=false; this.faceP(); }
                    this.physics(); this.x+=this.dir()*4;
                    if(T===8){ this.danhTrung(this.hop(70,46,0),1); this.fx.push({k:'chem',x:this.cx()+d*30,y:this.y+14,d,t:0,max:12}); }
                    if(T>14) XONG(); return;
                }
                if(st==='y2_rgale'){                        // quay nguoc lai chem lan hai
                    this.physics(); this.x-=this.dir()*7;
                    if(T===6){ this.hitFlag=false; this.danhTrung(this.hop(66,44,0),1); this.fx.push({k:'chem',x:this.cx()-d*24,y:this.y+14,d:-d,t:0,max:12}); }
                    if(T>11) XONG(); return;
                }
                if(st==='y2_sgale'){                        // dap xuong dat
                    this.dy+=1.3; this.y+=this.dy;
                    if(this.y>=this.baseY){ this.y=this.baseY; this.dy=0; this.grounded=true;
                        shakeTimer=Math.max(shakeTimer,16);
                        this.hitFlag=false;
                        this.danhTrung({x:this.cx()-84,y:this.baseY+18,w:168,h:46},1);
                        this.fx.push({k:'soc',x:this.cx(),y:this.baseY+this.h,t:0,max:16});
                        XONG(); return; }
                    if(T>70) XONG(); return;
                }
                // ===== STORM BREAKER — loc xoay khong lo =====
                if(st==='y2_storm'){
                    this.physics();
                    if(T===14){ this.loc.push({x:this.cx()+d*50,y:this.baseY-6,dir:d,t:0,hit:false,tung:true,to:true});
                        shakeTimer=Math.max(shakeTimer,20); SFX.bossSkill && SFX.bossSkill(); }
                    if(T>26) XONG(); return;
                }
                // ===== RISE, WITH THE WIND — hat tung roi bam chuoi tren khong =====
                if(st==='y2_rise'){
                    this.physics();
                    if(T===12){ if(this.danhTrung(this.hop(70,60,-10),1)){ this.hatTung(14); this.riseHit=true; } }
                    if(T===14) this.dy=-12;
                    if(this.riseHit && T>16 && T<52 && T%7===0){
                        this.hitFlag=false;
                        this.danhTrung({x:this.cx()-56,y:this.y-30,w:112,h:100},1);
                        this.fx.push({k:'chem',x:this.cx()+d*30,y:this.y+8,d,t:0,max:8});
                    }
                    if(T>60){ this.riseHit=false; XONG(); } return;
                }
                // ===== LAST BREATH — CHI khi nguoi choi tren khong =====
                if(st==='y2_last'){
                    if(T===0){ this.ultDung=true; shakeTimer=Math.max(shakeTimer,18); }
                    // Chia PHA thay vi cat theo moc thoi gian cung: truoc day cua so bay het han
                    // truoc khi Yasuo toi noi, nen chuoi chem danh vao khong khi.
                    if(this.lbPha===undefined||T===1) this.lbPha='bao';
                    if(this.lbPha==='bao'){                                  // BAO TRUOC 22 khung
                        this.faceP();
                        if(T%4===0) this.fx.push({k:'calm',x:this.cx(),y:this.cy(),t:0,max:12});
                        if(T>=22){ this.lbPha='bay'; this.lbT=0; }
                        return; }
                    if(this.lbPha==='bay'){   // BAY toi bang toc do CO DINH — khong khoa, van ne/gio khien duoc
                        this.lbT++;
                        let tx=dino.x, ty=dino.y-8, dx=tx-this.x, dy=ty-this.y, dd=Math.hypot(dx,dy);
                        if(dd>10){ this.x+=dx/dd*18; this.y+=dy/dd*18; }
                        this.dy=0; this.grounded=false;
                        this.fx.push({k:'vet',x:this.cx(),y:this.cy(),t:0,max:8});
                        if(dd<=10 || this.lbT>70){ this.lbPha='bam'; this.lbT=0; }
                        return; }
                    if(this.lbPha==='bam'){   // bam chuoi TAI CHO CUA CHINH NO — luot ra la thoat duoc
                        this.lbT++;
                        this.dy=0; this.grounded=false;
                        // giu KHOANG CACH BEN CANH nguoi choi, khong hut vao trong nguoi ho
                        { let moc = dino.x - this.dir()*46, dx = moc - this.x;
                          this.x += Math.max(-4, Math.min(4, dx*0.10)); }
                        if(this.lbT%7===0){ this.hitFlag=false;
                            this.danhTrung({x:this.cx()-46,y:this.cy()-42,w:92,h:84},1);
                            this.fx.push({k:'chem',x:this.cx(),y:this.cy(),d:(this.lbT%14<7?1:-1),t:0,max:7}); }
                        if(this.lbT>34){ this.lbPha='dap'; if(Math.abs(dino.x-this.x)<70) dino.dy=16; }
                        return; }
                    this.dy+=1.4; this.y+=this.dy;
                    { let dx=dino.x-this.x; this.x+=Math.max(-14,Math.min(14,dx*0.2)); }
                    if(this.y>=this.baseY){ this.y=this.baseY; this.dy=0; this.grounded=true;
                        shakeTimer=Math.max(shakeTimer,26);
                        this.hitFlag=false; this.danhTrung({x:this.cx()-90,y:this.baseY+10,w:180,h:52},1);
                        this.fx.push({k:'soc',x:this.cx(),y:this.baseY+this.h,t:0,max:20});
                        this.lbPha=undefined; XONG(); return; }
                    if(T>200){ this.lbPha=undefined; XONG(); } return;
                }
                XONG();
            }
            chanDan(){
                if(!this.wall) return;
                for(let i=projectiles.length-1;i>=0;i--){
                    let pr=projectiles[i]; if(!pr||pr.owner!==1) continue;
                    if(Math.abs((pr.x+(pr.w||8)/2)-this.wall.x)<16 && pr.y>this.baseY-70 && pr.y<this.baseY+this.h){
                        visualEffects.push(new Effect(this.wall.x,pr.y,'parry',false));
                        projectiles.splice(i,1);
                    }
                }
            }
            tickGio(){
                for(let i=this.gio.length-1;i>=0;i--){
                    let g=this.gio[i]; g.x+=g.dir*(g.yeu?7:15); g.t++;
                    if(!g.hit && checkAABB(dino,{x:g.x-16,y:g.y-14,w:32,h:28})){ g.hit=true; this.hurtP(1);
                        if(g.yeu) dino.x+=g.dir*18; }
                    if(g.t>90||g.x<-40||g.x>canvas.width+40) this.gio.splice(i,1);
                }
                for(let i=this.loc.length-1;i>=0;i--){
                    let L=this.loc[i]; L.x+=L.dir*(L.to?4.2:5.6); L.t++;
                    let R=L.to?52:34;
                    if(!L.hit && checkAABB(dino,{x:L.x-R/2,y:this.baseY+this.h-R*2.1,w:R,h:R*2.1})){
                        L.hit=true; this.hurtP(L.manh||1); if(L.tung) this.hatTung(L.to?15:12); }
                    if(L.t>(L.to?150:110)||L.x<-60||L.x>canvas.width+60) this.loc.splice(i,1);
                }
            }
            hitBox(){ return null; }
            draw(){
                let cx=this.cx(), d=this.dir();
                // TUONG GIO
                if(this.wall){
                    ctx.save(); let a=0.25+0.2*Math.sin(frames*0.3);
                    let veW=()=>{ for(let k=0;k<5;k++){ let yy=this.baseY-60+k*26;
                        ctx.beginPath(); ctx.moveTo(this.wall.x-10,yy); ctx.quadraticCurveTo(this.wall.x+10,yy+13,this.wall.x-10,yy+26); ctx.stroke(); } };
                    ctx.strokeStyle='rgba(0,0,0,0.8)'; ctx.lineWidth=5.5; veW();
                    ctx.strokeStyle='rgba(120,220,255,'+Math.min(1,a+0.45).toFixed(2)+')'; ctx.lineWidth=2.5; veW();
                    ctx.fillStyle='rgba(120,220,255,0.10)'; ctx.fillRect(this.wall.x-12,this.baseY-64,24,130);
                    ctx.restore();
                }
                // LUOI GIO
                for(let g of this.gio){ ctx.save();
                    let veG=()=>{ ctx.beginPath(); ctx.moveTo(g.x-g.dir*22,g.y-8); ctx.lineTo(g.x+g.dir*14,g.y); ctx.lineTo(g.x-g.dir*22,g.y+8); ctx.stroke(); };
                    ctx.lineCap='round';
                    ctx.strokeStyle='rgba(0,0,0,0.85)'; ctx.lineWidth=(g.yeu?2:3.4)+4; veG();
                    ctx.strokeStyle=g.yeu?'#9FE6FF':'#FFFFFF'; ctx.lineWidth=(g.yeu?2:3.4)+1.6; veG();
                    ctx.strokeStyle=g.yeu?'#4DD0E1':'#B3E5FC'; ctx.lineWidth=g.yeu?2:3.4; veG(); ctx.restore(); }
                // LOC XOAY
                for(let L of this.loc){ ctx.save(); let R=L.to?52:34, H=R*2.1, by=this.baseY+this.h;
                    let veL=()=>{ for(let k=0;k<7;k++){ let t=k/6, w=R*(0.25+t*0.75), yy=by-H*t;
                        ctx.beginPath(); ctx.ellipse(L.x,yy,w/2,5,0,0,6.28); ctx.stroke(); } };
                    ctx.strokeStyle='rgba(0,0,0,0.85)'; ctx.lineWidth=(L.to?3.4:2.4)+4; veL();
                    ctx.strokeStyle='#FFFFFF'; ctx.lineWidth=(L.to?3.4:2.4)+1.6; veL();
                    ctx.strokeStyle='#FFD54F'; ctx.lineWidth=L.to?3.4:2.4; veL();   // VANG = hat tung
                    ctx.restore(); }
                // ================= HIEU UNG =================
                // MA MAU THEO CACH DOI PHO — nguoi choi khong can nho 23 ten chieu, chi can nho 3 mau:
                //    CAM  = don THAP  -> phai NHAY
                //    VANG = don HAT TUNG / bat tren khong -> phai O DUOI DAT
                //    TRANG-XANH = don thuong -> ne ngang hoac do
                // Moi net deu ve HAI LOP: vien den day truoc, mau that de len tren. Truoc day chi
                // co mot lop mau nhat nen chim han vao nen hang dong.
                const Y2M = { thuong:'190,240,255', thap:'255,152,0', tung:'255,214,0', gio:'120,220,255' };
                const net = (mau,a,rong,ve) => {
                    ctx.strokeStyle='rgba(0,0,0,'+(a*0.85).toFixed(2)+')'; ctx.lineWidth=rong+3.5; ctx.lineCap='round'; ve();
                    ctx.strokeStyle='rgba(255,255,255,'+(a*0.9).toFixed(2)+')'; ctx.lineWidth=rong+1.6; ve();
                    ctx.strokeStyle='rgba('+mau+','+a.toFixed(2)+')'; ctx.lineWidth=rong; ve();
                };
                for(let e of this.fx){ let a=Math.max(0,1-e.t/e.max); ctx.save();
                    if(e.k==='chem'){ let R=40+e.t*2.2;
                        net(Y2M.thuong,a*0.95,4*a+2,()=>{ ctx.beginPath(); ctx.arc(e.x,e.y,R,(e.d<0?2.4:-0.7),(e.d<0?4.0:0.9)); ctx.stroke(); }); }
                    else if(e.k==='dam'){       // STEEL TEMPEST: MUI DAM thang, khac han nhat chem
                        net(Y2M.thuong,a,4*a+2,()=>{ ctx.beginPath();
                            ctx.moveTo(e.x-e.d*10,e.y); ctx.lineTo(e.x+e.d*(56+e.t*4),e.y);
                            ctx.moveTo(e.x+e.d*(40+e.t*4),e.y-9); ctx.lineTo(e.x+e.d*(56+e.t*4),e.y); ctx.lineTo(e.x+e.d*(40+e.t*4),e.y+9); ctx.stroke(); }); }
                    else if(e.k==='quat'){
                        net(Y2M.gio,a*0.9,3,()=>{ for(let k=-1;k<=1;k++){ ctx.beginPath();
                            ctx.moveTo(e.x-e.d*40,e.y+k*11); ctx.lineTo(e.x+e.d*(48+e.t*3),e.y+k*15); ctx.stroke(); } }); }
                    else if(e.k==='soc'){
                        net(Y2M.thap,a*0.9,3.4,()=>{ ctx.beginPath(); ctx.ellipse(e.x,e.y-4,20+e.t*10,7+e.t*2,0,0,6.28); ctx.stroke(); }); }
                    else if(e.k==='boc'){       // don HAT TUNG — vang
                        net(Y2M.tung,a*0.95,3.4,()=>{ for(let k=0;k<3;k++){ ctx.beginPath();
                            ctx.moveTo(e.x+(k-1)*16,e.y-e.t*5); ctx.lineTo(e.x+(k-1)*16-6,e.y-e.t*5+16); ctx.moveTo(e.x+(k-1)*16,e.y-e.t*5); ctx.lineTo(e.x+(k-1)*16+6,e.y-e.t*5+16); ctx.stroke(); } }); }
                    else if(e.k==='thap'){      // don THAP — cam, phai NHAY
                        net(Y2M.thap,a,3.6,()=>{ ctx.beginPath(); ctx.moveTo(e.x-46,e.y); ctx.lineTo(e.x+46,e.y);
                            ctx.moveTo(e.x-46,e.y-6); ctx.lineTo(e.x-46,e.y+6); ctx.moveTo(e.x+46,e.y-6); ctx.lineTo(e.x+46,e.y+6); ctx.stroke(); }); }
                    else if(e.k==='calm'){
                        net(Y2M.gio,a*0.85,2.4,()=>{ ctx.beginPath(); ctx.arc(e.x,e.y,18+e.t*2.6,0,6.28); ctx.stroke(); }); }
                    else if(e.k==='vet'){ ctx.fillStyle='rgba(0,0,0,'+(a*0.30).toFixed(2)+')'; ctx.fillRect(e.x-19,e.y-29,38,58);
                        ctx.fillStyle='rgba(150,230,255,'+(a*0.45).toFixed(2)+')'; ctx.fillRect(e.x-16,e.y-26,32,52); }
                    ctx.restore(); }
                // THAN
                ctx.save();
                if(this.calm){ ctx.shadowBlur=0; }
                ctx.fillStyle='#16283C'; ctx.fillRect(this.x+8,this.y+18,this.w-16,this.h-30);      // ao
                ctx.fillStyle='#B71C1C'; ctx.fillRect(this.x+8,this.y+30,this.w-16,5);              // dai
                ctx.fillStyle='#E8C89A'; ctx.fillRect(this.x+12,this.y+4,this.w-24,16);             // dau
                ctx.fillStyle='#101820'; ctx.fillRect(this.x+10,this.y+2,this.w-20,7);              // toc
                ctx.fillStyle='#16283C'; ctx.fillRect(this.x+12,this.y+this.h-14,9,14); ctx.fillRect(this.x+this.w-21,this.y+this.h-14,9,14);
                // kiem
                ctx.strokeStyle=this.calm?'#4DD0E1':'#ECEFF1'; ctx.lineWidth=3;
                let sa=this.swordAngle*(d<0?-1:1), sx=cx+d*10, sy=this.y+26;
                ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(sx+Math.cos(sa)*d*40,sy+Math.sin(sa)*32); ctx.stroke();
                if(this.calm){ ctx.strokeStyle='rgba(77,208,225,0.45)'; ctx.lineWidth=1.5;
                    ctx.beginPath(); ctx.arc(cx,this.cy(),30,0,6.28); ctx.stroke(); }
                ctx.restore();
                // thanh mau
                // ctx.fillStyle='black'; ctx.fillRect(this.x-16,this.y-26,this.w+32,9);   // @@HE-HUDBAR: khung den RONG tren dau (thanh mau da chuyen len HUD)
                ctx.fillStyle=this.phase>=2?'#4DD0E1':'#64B5F6';
                // ctx.fillRect(this.x-15,this.y-25,(this.w+30)*Math.max(0,this.hp/this.maxHp),7);
                ctx.fillStyle='#E1F5FE'; ctx.font='bold 10px Consolas, monospace'; ctx.textAlign='center';
                ctx.fillText(this.name+'  '+Math.max(0,Math.ceil(this.hp))+'/'+this.maxHp,cx,this.y-30);
                ctx.textAlign='left';
            }
        }
// BOSS_PART_END s0.Yasuo2Boss.1

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
