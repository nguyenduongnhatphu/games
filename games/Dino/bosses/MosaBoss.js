// BOSS_FILE: MosaBoss
// BOSS_SNAPSHOT: 39483d797c15c5e35e37a5b630ae4f295f939302db706fe13262c4e699541a28
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LT, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, shakeTimer, visualEffects
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

// Nguồn: index.html:36236 · Dùng bởi: MosaBoss
// BOSS_PART_BEGIN s1.MosaBoss.1 EDITABLE
class MosaBoss {
            constructor(level){
                this.name="MOSASAURUS"; this.hp=190; this.maxHp=190; this.w=236; this.h=78;
                this.x=canvas.width+60; this.y=OCEAN_SURF+130; this.dy=0; this.facingLeft=true;
                this.state='entering'; this.subTimer=0; this.step=0; this.invulnAll=false; this.burnTimer=0;
                this.lastAttack=''; this.atkBag=[]; this.wave=null; this.suck=null; this.imp=null; this.spout=null; this.bub=null; this.tail=null;
                this.stuckPad=null; this.rageDive=null; this.swimT=0;
            }
            hurtP(n){ if (!dino.isShielding()) dino.takeDamage(n); else parry(); }
            onPad(){ return (dino.y+dino.h) <= OCEAN_SURF + 12; }
            moveTo(tx,ty,sp){ let dx=tx-this.x, dy=ty-this.y, d=Math.hypot(dx,dy)||1; if (d<=sp){this.x=tx;this.y=ty;return true;} this.x+=dx/d*sp; this.y+=dy/d*sp; return false; }
            toRest(sec){ this.state='rest'; this.restLen=sec*60; this.subTimer=0; }
            pickAttack(){
                let pool = this.onPad() ? ['breach','spout','tail','leap','torpedo'] : ['wave','suck','impale','bubbles','ring','torpedo'];
                if (!this.onPad() && (dino.y+dino.h) < OCEAN_SURF+130) pool.push('leap','leap');   // nguoi choi len cao -> vot len tom
                pool = pool.filter(a=>a!==this.lastAttack);
                let pick = pool[Math.floor(Math.random()*pool.length)];
                this.lastAttack=pick; this.state=pick; this.subTimer=0; this.step=0;
            }
            update(){
                if (this.burnTimer>0){ this.burnTimer--; if (this.burnTimer%60===0) this.hp-=1; }
                this.swimT+=0.08;
                // CHONG DO: parry co the ep sang state la -> tra ve lurk
                const MS_STATES = ['entering','lurk','rest','wave','suck','impale','bubbles','breach','spout','tail','leap','ring','torpedo'];
                if (MS_STATES.indexOf(this.state) < 0){ this.wave=null; this.suck=null; this.imp=null; this.spout=null; this.bub=null; this.tail=null; this.leap=null; this.ring=null; this.torp=null; this.stuckPad=false; this.state='lurk'; this.subTimer=0; this.step=0; }
                this.subTimer++;
                if (this.state==='entering'){ this.faceP(); if (this.moveTo(canvas.width-260, OCEAN_SURF+130, 9)) { this.state='lurk'; this.subTimer=0; } return; }
                if (this.state==='rest'){ this.faceP(); this.y += ((this.onPad()? OCEAN_SURF+130 : Math.max(OCEAN_SURF+60, Math.min(OCEAN_FLOOR-110, dino.y-10)))-this.y)*0.07; this.x += Math.sin(this.swimT)*1.4;
                    if (this.subTimer>=this.restLen){ this.state='lurk'; this.subTimer=0; } return; }
                if (this.state==='lurk'){ this.faceP();
                    let ty = this.onPad() ? (OCEAN_SURF+130) : Math.max(OCEAN_SURF+50, Math.min(OCEAN_FLOOR-110, dino.y-10));
                    this.y += (ty-this.y)*0.08; this.x += ((dino.x+dino.w/2 < this.cx() ? 1 : -1) * -1) * 1.6 + Math.sin(this.swimT)*1.2;
                    this.x=Math.max(-40, Math.min(canvas.width-this.w+40, this.x));
                    if (this.subTimer>70) this.pickAttack(); return; }
                // ============ DUOI NUOC ============
                if (this.state==='wave'){   // song ap luc BAM DAY BIEN, bao truoc
                    if (this.step===0){ this.faceP(); this.y += ((OCEAN_FLOOR-70)-this.y)*0.12;
                        if (this.subTimer>52){ this.step=1; this.subTimer=0; let dir=(dino.x+dino.w/2)<this.cx()?-1:1;
                            this.wave={ x:this.cx(), dir, hit:false }; shakeTimer=18; } }
                    else { let w=this.wave; w.x += w.dir*11;
                        if (!w.hit && Math.abs((dino.x+dino.w/2)-w.x)<64 && (dino.y+dino.h)>OCEAN_FLOOR-72){ this.hurtP(1); w.hit=true; }
                        if (w.x<-60 || w.x>canvas.width+60){ this.wave=null; this.toRest(1.4); } }
                    return;
                }
                if (this.state==='suck'){   // HUT ve mieng 2 giay roi CAN 2 dmg
                    if (this.step===0){ this.faceP(); this.suck={t:0, dir:this.facingLeft?-1:1}; this.step=1; }
                    let s2=this.suck; s2.t++;
                    this.facingLeft = s2.dir<0;
                    let mx=this.facingLeft? this.x+14 : this.x+this.w-14, my=this.cy();
                    if (s2.t<120){
                        // boss ap sat + LUC HUT MANH HON toc do boi -> phai boi lien tuc/luot moi thoat
                        this.y += ((dino.y+dino.h/2-this.h/2)-this.y)*0.035;
                        this.x += Math.sign((dino.x+dino.w/2)-this.cx())*1.5;
                        let dx=mx-(dino.x+dino.w/2), dy=my-(dino.y+dino.h/2), d=Math.hypot(dx,dy)||1;
                        let pull = 4.6 - 1.2*Math.min(1, d/560);            // xa 3.4 -> gan 4.6 (boi 3.72)
                        dino.x += dx/d*pull; dino.y += dy/d*pull*0.8;
                        if (frames%3===0) visualEffects.push(new Effect(mx+(Math.random()-0.5)*120, my+(Math.random()-0.5)*120, 'explosion', true, 8)); }
                    else if (s2.t===120){ let jaw={x:this.facingLeft?this.x-24:this.x+this.w-118, y:this.y-14, w:142, h:this.h+28};
                        if (checkAABB(dino,jaw)) this.hurtP(2);
                        visualEffects.push(new Effect(mx,my,'explosion',true,52)); shakeTimer=28; }
                    else if (s2.t>150){ this.suck=null; this.toRest(1.2); }
                    return;
                }
                if (this.state==='impale'){   // lao xuyen -> 1s sau lao nguoc lai tu ngoai man
                    if (!this.imp){ let dir=(dino.x+dino.w/2)<this.cx()?-1:1;
                        this.imp={ph:'warn', t:0, dir, y:Math.max(OCEAN_SURF+26, Math.min(OCEAN_FLOOR-96, dino.y+dino.h/2-this.h/2)), pass:0}; }
                    let I=this.imp; I.t++;
                    if (I.ph==='warn'){ this.y += (I.y-this.y)*0.16; this.facingLeft=I.dir<0; if (I.t>44){ I.ph='go'; I.t=0; } }
                    else if (I.ph==='go'){ this.x += I.dir*19; this.y=I.y;
                        if (checkAABB(this,dino)) this.hurtP(1);
                        if (this.x< -this.w-60 || this.x>canvas.width+60){ I.pass++;
                            if (I.pass>=2){ this.imp=null; this.x=Math.max(-20,Math.min(canvas.width-this.w+20,this.x)); this.toRest(1.4); }
                            else { I.ph='turn'; I.t=0; I.dir=-I.dir; I.y=Math.max(OCEAN_SURF+26, Math.min(OCEAN_FLOOR-96, dino.y+dino.h/2-this.h/2));
                                this.x = I.dir>0 ? -this.w-40 : canvas.width+40; this.facingLeft=I.dir<0; } } }
                    else { if (I.t>60){ I.ph='go'; I.t=0; } }   // 1 giay sau lao lai
                    return;
                }
                if (this.state==='bubbles'){   // cot bong khi tu day bien
                    if (this.step===0){ let px=dino.x+dino.w/2;
                        this.bub={ vents:[{x:px-190,ph:0},{x:px,ph:22},{x:px+190,ph:44}].map(v=>({x:Math.max(60,Math.min(canvas.width-60,v.x)), ph:v.ph, warn:0, fire:0})), t:0 };
                        this.step=1; this.subTimer=0; }
                    let B=this.bub; B.t++;
                    this.y += (Math.max(OCEAN_SURF+80, Math.min(OCEAN_FLOOR-130, dino.y))-this.y)*0.07;
                    // moi mieng lo: BAO TRUOC 40f -> PHUN 46f -> DOI CHO MOI
                    for (let v of B.vents){ let c=(B.t+v.ph)%86;
                        v.warn=(c<40)?(40-c):0; v.fire=(c>=40&&c<86)?1:0;
                        if (c===0){ let px=dino.x+dino.w/2; v.x=Math.max(60,Math.min(canvas.width-60, px+(Math.random()*2-1)*230)); }   // NHAY sang cho khac
                        if (v.fire && Math.abs((dino.x+dino.w/2)-v.x)<64 && (dino.y+dino.h)>OCEAN_SURF+120){   // len CAO la thoat
                            if (frames%14===0) this.hurtP(1); dino.dy=Math.min(dino.dy,-3.4); } }
                    if (B.t>300){ this.bub=null; this.toRest(1.2); }
                    return;
                }
                // ============ KHI NGUOI CHOI TREN BEO ============
                if (this.state==='leap'){   // VOT LEN TOM nguoi choi o tren cao / tren beo
                    if (this.step===0){ this.leap={tx:dino.x+dino.w/2, t:0}; this.step=1; this.subTimer=0; }
                    let L=this.leap; L.t++;
                    if (L.t<44){ this.x += ((L.tx-this.w/2)-this.x)*0.12; this.y += ((OCEAN_SURF+150)-this.y)*0.12; L.tx=dino.x+dino.w/2; }
                    else if (L.t<120){ if (L.t===44){ this.dy=-23; shakeTimer=20; }
                        this.dy += 0.62; this.y += this.dy; this.x += Math.sign(L.tx-this.cx())*2.2;
                        this.facingLeft=(dino.x+dino.w/2)<this.cx();
                        if (checkAABB(this,dino)) this.hurtP(1);
                        if (this.dy>0 && this.y>OCEAN_SURF+40){ visualEffects.push(new Effect(this.cx(), OCEAN_SURF, 'explosion', true, 50)); shakeTimer=24; this.leap=null; this.toRest(1.4); } }
                    else { this.leap=null; this.toRest(1.2); }
                    return;
                }
                if (this.state==='ring'){   // GAM DUOI NUOC -> vong soc lan ra, tranh xa hoac len cao
                    if (this.step===0){ this.ring={t:0, r:0}; this.step=1; this.subTimer=0; }
                    let R=this.ring; R.t++;
                    this.y += (Math.max(OCEAN_SURF+90, Math.min(OCEAN_FLOOR-130, dino.y))-this.y)*0.05;
                    if (R.t>48){ R.r += 9;
                        let d=Math.hypot((dino.x+dino.w/2)-this.cx(), (dino.y+dino.h/2)-this.cy());
                        if (!R.hit && Math.abs(d-R.r)<40){ this.hurtP(1); R.hit=true; }
                        if (R.r>620){ this.ring=null; this.toRest(1.3); } }
                    return;
                }
                if (this.state==='torpedo'){   // ban 3 qua thuy loi bam duoi
                    if (this.step===0){ this.torp={t:0,n:0}; this.step=1; this.subTimer=0; this.faceP(); }
                    let T2=this.torp; T2.t++;
                    this.y += (Math.max(OCEAN_SURF+70, Math.min(OCEAN_FLOOR-130, dino.y-20))-this.y)*0.06;
                    if (T2.t>40 && T2.t%22===0 && T2.n<3){ T2.n++;
                        let mx=this.facingLeft? this.x+16 : this.x+this.w-16, my=this.cy();
                        let dx=(dino.x+dino.w/2)-mx, dy=(dino.y+dino.h/2)-my, d=Math.hypot(dx,dy)||1;
                        let bp=new BossProjectile(mx-10, my-10, dx/d*7.2, dy/d*7.2, false, 1); bp.w=26; bp.h=26; bp.color="#B3E5FC"; bossProjectiles.push(bp);
                        if (typeof SFX!=='undefined'&&SFX.bossSkill) SFX.bossSkill(); }
                    if (T2.t>130){ this.torp=null; this.toRest(1.2); }
                    return;
                }
                if (this.state==='breach'){   // trao len xuyen beo -> KET 2s (ban thoai mai) -> dien tiet lao xuong pha beo
                    if (this.step===0){ let p=padAt(dino.x+dino.w/2) || oceanPads.find(q=>q.solid);
                        this.brX = p ? p.x+p.w/2 : dino.x+dino.w/2; this.step=1; this.subTimer=0; this.brPad=p; }
                    else if (this.step===1){ this.x = this.brX-this.w/2; this.y += ((OCEAN_SURF+230)-this.y)*0.12;
                        if (this.subTimer>46){ this.step=2; this.subTimer=0; shakeTimer=22; } }
                    else if (this.step===2){ this.y -= 15; this.facingLeft=(dino.x+dino.w/2)<this.cx();
                        if (checkAABB(this,dino)) this.hurtP(1);
                        if (this.y <= OCEAN_SURF-this.h+6){ this.y=OCEAN_SURF-this.h+6; breakPad(this.brPad); this.step=3; this.subTimer=0; this.stuckPad=true; } }
                    else if (this.step===3){ this.stuckPad=true;   // KET 2 giay - ban duoc thoai mai
                        if (this.subTimer>120){ this.stuckPad=false; this.step=4; this.subTimer=0;
                            this.rageDive={ph:'up', tx:(dino.x+dino.w/2)}; floatingTexts.push(new FloatingText(this.x, this.y-20, "DIEN TIET!")); } }
                    else { let R=this.rageDive;
                        if (R.ph==='up'){ this.y -= 13; if (this.y< -this.h-20){ R.ph='aim'; this.subTimer=0; R.tx=dino.x+dino.w/2; } }
                        else if (R.ph==='aim'){ this.x += ((R.tx-this.w/2)-this.x)*0.2; if (this.subTimer>36){ R.ph='dive'; } }
                        else { this.y += 22;
                            if (checkAABB(this,dino)) this.hurtP(1);
                            if (this.y+this.h >= OCEAN_SURF+14){ let p=padAt(this.cx()); breakPad(p); shakeTimer=30;
                                visualEffects.push(new Effect(this.cx(), OCEAN_SURF, 'explosion', true, 44));
                                this.rageDive=null; this.toRest(1.6); } } }
                    return;
                }
                if (this.state==='spout'){   // troi len KHOANG TRONG giua be roi phun nuoc: 1 dmg + day xuong
                    if (this.step===0){ let gaps=[]; for (let i=0;i<oceanPads.length-1;i++){ let a=oceanPads[i], b=oceanPads[i+1]; gaps.push((a.x+a.w+b.x)/2); }
                        if (!gaps.length) gaps=[canvas.width/2];
                        gaps.sort((u,v)=>Math.abs(u-(dino.x+dino.w/2))-Math.abs(v-(dino.x+dino.w/2)));
                        this.spout={x:gaps[0], t:0}; this.step=1; this.subTimer=0; }
                    let S=this.spout; S.t++;
                    this.x += ((S.x-this.w/2)-this.x)*0.14; this.y += ((OCEAN_SURF+16)-this.y)*0.1;
                    if (S.t>60 && S.t<130){   // phun cot nuoc
                        if (Math.abs((dino.x+dino.w/2)-S.x)<72 && dino.y+dino.h < OCEAN_SURF+50){
                            if (frames%20===0) this.hurtP(1);
                            dino.dy = Math.max(dino.dy, 5.5); dino.grounded=false;      // DAY XUONG NUOC
                        }
                        if (S.t%14===0){ let p=padAt(S.x); if (p) breakPad(p); }
                    }
                    if (S.t>160){ this.spout=null; this.toRest(1.4); }
                    return;
                }
                if (this.state==='tail'){   // quet duoi doc mat nuoc, pha be tren duong di
                    if (this.step===0){ this.tail={dir:(dino.x+dino.w/2)<this.cx()?-1:1, x:this.cx(), t:0}; this.step=1; this.subTimer=0;
                        this.y += (OCEAN_SURF+30-this.y)*0.3; }
                    let T=this.tail; T.t++;
                    this.y += ((OCEAN_SURF+26)-this.y)*0.12;
                    if (T.t>50){ T.x += T.dir*9; this.x = T.x-this.w/2;
                        if (Math.abs((dino.x+dino.w/2)-T.x)<70 && (dino.y+dino.h)>OCEAN_SURF-30 && dino.y<OCEAN_SURF+48) this.hurtP(1);   // co BE DAY -> nhay cao la thoat
                        if (T.t%16===0){ let p=padAt(T.x); if (p) breakPad(p); }
                        if (T.x<-70 || T.x>canvas.width+70){ this.tail=null; this.toRest(1.5); } }
                    return;
                }
            }
            drawBody(){
                let x=this.x, y=this.y, w=this.w, h=this.h;
                ctx.save();
                if (this.facingLeft){ ctx.translate(x+w/2,0); ctx.scale(-1,1); ctx.translate(-(x+w/2),0); }
                let sw=Math.sin(this.swimT), bend=sw*8;
                const DK="#16323f", MD="#1d4a5e", LT2="#2f6f88", BEL="#8fbecb", TOOTH="#F2F8FA";
                // ---- DUOI + van duoi (dang khung long bien) ----
                ctx.fillStyle=MD;
                ctx.beginPath(); ctx.moveTo(x+w*0.30, y+h*0.30);
                ctx.quadraticCurveTo(x+w*0.10, y+h*0.46+bend*0.6, x-30, y+h*0.52+bend);
                ctx.quadraticCurveTo(x+w*0.10, y+h*0.66+bend*0.6, x+w*0.30, y+h*0.74); ctx.closePath(); ctx.fill();
                ctx.fillStyle=DK;
                ctx.beginPath(); ctx.moveTo(x-24, y+h*0.52+bend);
                ctx.lineTo(x-66, y+h*0.02+bend*1.7); ctx.lineTo(x-44, y+h*0.54+bend);
                ctx.lineTo(x-70, y+h*1.06+bend*1.7); ctx.closePath(); ctx.fill();
                // ---- THAN chinh ----
                ctx.fillStyle=MD;
                ctx.beginPath(); ctx.moveTo(x+w*0.26, y+h*0.26);
                ctx.quadraticCurveTo(x+w*0.52, y+h*0.06, x+w*0.74, y+h*0.20);
                ctx.quadraticCurveTo(x+w*0.90, y+h*0.30, x+w*0.98, y+h*0.40);
                ctx.quadraticCurveTo(x+w*0.90, y+h*0.72, x+w*0.72, y+h*0.84);
                ctx.quadraticCurveTo(x+w*0.48, y+h*0.98, x+w*0.26, y+h*0.78); ctx.closePath(); ctx.fill();
                ctx.fillStyle=BEL;   // bung sang
                ctx.beginPath(); ctx.ellipse(x+w*0.52, y+h*0.70, w*0.24, h*0.17, 0, 0, 6.28); ctx.fill();
                ctx.fillStyle=LT2;   // lung sang hon
                ctx.beginPath(); ctx.ellipse(x+w*0.54, y+h*0.30, w*0.24, h*0.12, 0, 0, 6.28); ctx.fill();
                // van vay
                ctx.strokeStyle="rgba(10,30,40,0.35)"; ctx.lineWidth=1.4;
                for (let i=0;i<5;i++){ let vx=x+w*(0.32+i*0.10); ctx.beginPath(); ctx.moveTo(vx, y+h*0.24); ctx.quadraticCurveTo(vx+6, y+h*0.52, vx, y+h*0.80); ctx.stroke(); }
                // ---- GAI LUNG ----
                ctx.fillStyle=DK;
                for (let i=0;i<7;i++){ let sx2=x+w*(0.22+i*0.085), sy2=y+h*(0.26-Math.sin(i*0.5)*0.04);
                    ctx.beginPath(); ctx.moveTo(sx2, sy2+4); ctx.lineTo(sx2+7, sy2-11); ctx.lineTo(sx2+14, sy2+4); ctx.closePath(); ctx.fill(); }
                // ---- 4 CHAN CHEO (mai cheo) ----
                ctx.fillStyle=LT2;
                ctx.save(); ctx.translate(x+w*0.42, y+h*0.80); ctx.rotate(0.5+sw*0.18); ctx.beginPath(); ctx.ellipse(0,0,34,13,0,0,6.28); ctx.fill(); ctx.restore();
                ctx.save(); ctx.translate(x+w*0.70, y+h*0.82); ctx.rotate(0.4-sw*0.16); ctx.beginPath(); ctx.ellipse(0,0,26,10,0,0,6.28); ctx.fill(); ctx.restore();
                ctx.fillStyle=MD;
                ctx.save(); ctx.translate(x+w*0.40, y+h*0.34); ctx.rotate(-0.45-sw*0.16); ctx.beginPath(); ctx.ellipse(0,0,28,10,0,0,6.28); ctx.fill(); ctx.restore();
                ctx.save(); ctx.translate(x+w*0.66, y+h*0.30); ctx.rotate(-0.35+sw*0.14); ctx.beginPath(); ctx.ellipse(0,0,21,8,0,0,6.28); ctx.fill(); ctx.restore();
                // ---- DAU: so dai kieu bo sat, ham tren/duoi tach roi ----
                let jaw = (this.state==='suck') ? 20 : (this.state==='impale'||this.state==='leap' ? 13 : 5);
                let hx=x+w*0.74, hy=y+h*0.30;
                ctx.fillStyle=MD;                                   // ham TREN
                ctx.beginPath(); ctx.moveTo(hx, hy-h*0.10);
                ctx.quadraticCurveTo(x+w*1.02, hy-h*0.14-jaw*0.5, x+w+52, hy+h*0.02-jaw);
                ctx.lineTo(x+w+48, hy+h*0.16-jaw);
                ctx.quadraticCurveTo(x+w*0.98, hy+h*0.20, hx, hy+h*0.20); ctx.closePath(); ctx.fill();
                ctx.fillStyle=LT2; ctx.beginPath(); ctx.moveTo(hx+6, hy-h*0.06); ctx.quadraticCurveTo(x+w*1.0, hy-h*0.10-jaw*0.5, x+w+42, hy+h*0.0-jaw); ctx.lineTo(x+w+40, hy+h*0.05-jaw); ctx.quadraticCurveTo(x+w*0.96, hy+h*0.02, hx+6, hy-h*0.02); ctx.closePath(); ctx.fill();
                ctx.fillStyle=DK;                                   // ham DUOI
                ctx.beginPath(); ctx.moveTo(hx, hy+h*0.24);
                ctx.quadraticCurveTo(x+w*1.0, hy+h*0.30+jaw*0.6, x+w+44, hy+h*0.26+jaw);
                ctx.lineTo(x+w+40, hy+h*0.40+jaw);
                ctx.quadraticCurveTo(x+w*0.96, hy+h*0.46, hx, hy+h*0.42); ctx.closePath(); ctx.fill();
                // rang
                ctx.fillStyle=TOOTH;
                for (let i=0;i<7;i++){ let tx2=hx+18+i*13;
                    ctx.beginPath(); ctx.moveTo(tx2, hy+h*0.16-jaw*0.62); ctx.lineTo(tx2+4, hy+h*0.30-jaw*0.5); ctx.lineTo(tx2+9, hy+h*0.16-jaw*0.62); ctx.closePath(); ctx.fill();
                    ctx.beginPath(); ctx.moveTo(tx2, hy+h*0.27+jaw*0.66); ctx.lineTo(tx2+4, hy+h*0.13+jaw*0.5); ctx.lineTo(tx2+9, hy+h*0.27+jaw*0.66); ctx.closePath(); ctx.fill(); }
                // mat + lo mui
                ctx.fillStyle="#FFC107"; ctx.beginPath(); ctx.ellipse(hx+16, hy-h*0.01, 8, 6.5, 0, 0, 6.28); ctx.fill();
                ctx.fillStyle="#07202b"; ctx.beginPath(); ctx.ellipse(hx+18, hy-h*0.01, 3, 5.5, 0, 0, 6.28); ctx.fill();
                ctx.fillStyle="rgba(255,255,255,0.6)"; ctx.beginPath(); ctx.arc(hx+15, hy-h*0.04, 2, 0, 6.28); ctx.fill();
                ctx.fillStyle=DK; ctx.beginPath(); ctx.ellipse(x+w+30, hy-h*0.02-jaw*0.8, 3.5, 2.5, 0, 0, 6.28); ctx.fill();
                ctx.restore();
            }
            draw(){
                // canh bao / hieu ung
                if (this.state==='wave' && this.step===0){ ctx.fillStyle="rgba(255,64,64,"+(0.12+0.16*Math.abs(Math.sin(frames*0.3))).toFixed(2)+")"; ctx.fillRect(0,OCEAN_FLOOR-72,canvas.width,72);
                    ctx.strokeStyle="rgba(255,80,80,0.8)"; ctx.lineWidth=2; ctx.strokeRect(1,OCEAN_FLOOR-71,canvas.width-2,70); }
                if (this.wave){ let w=this.wave, wy=OCEAN_FLOOR-26;
                    ctx.fillStyle="rgba(180,235,255,0.55)"; ctx.beginPath(); ctx.ellipse(w.x, wy, 62, 34, 0, 0, 6.28); ctx.fill();
                    ctx.strokeStyle="#E1F5FE"; ctx.lineWidth=3;
                    for (let k=0;k<4;k++){ ctx.beginPath(); ctx.arc(w.x-w.dir*k*18, wy, 40-k*8, -1.4, 1.4); ctx.stroke(); } }
                if (this.suck && this.suck.t<120){ let mx=this.facingLeft? this.x+10 : this.x+this.w-10, my=this.cy();
                    ctx.strokeStyle="rgba(190,240,255,0.55)"; ctx.lineWidth=2;
                    for (let k=0;k<9;k++){ let a=this.swimT*2+k*0.7, r=60+((frames*3+k*30)%150);
                        ctx.beginPath(); ctx.arc(mx+Math.cos(a)*r, my+Math.sin(a)*r*0.6, 4, 0, 6.28); ctx.stroke(); }
                    ctx.fillStyle=(frames%14<7)?"#FF5252":"#FFEB3B"; ctx.font="bold 12px Consolas, monospace"; ctx.textAlign="center";
                    ctx.fillText("BOI NGUOC LAI!", mx, my-64); ctx.textAlign="left"; }
                if (this.imp && this.imp.ph==='warn'){ let I=this.imp; ctx.strokeStyle="rgba(255,64,64,"+(0.3+0.4*Math.abs(Math.sin(frames*0.4))).toFixed(2)+")"; ctx.lineWidth=this.h;
                    ctx.beginPath(); ctx.moveTo(0, I.y+this.h/2); ctx.lineTo(canvas.width, I.y+this.h/2); ctx.stroke(); }
                if (this.bub){ let B=this.bub;
                    for (let v of B.vents){
                        ctx.fillStyle="#1a2e22"; ctx.beginPath(); ctx.ellipse(v.x, OCEAN_FLOOR-2, 26, 9, 0, 0, 6.28); ctx.fill();   // mieng lo
                        if (v.warn>0){ let a=(0.35+0.4*Math.abs(Math.sin(frames*0.4))).toFixed(2);
                            ctx.fillStyle="rgba(255,190,60,"+a+")"; ctx.beginPath(); ctx.ellipse(v.x, OCEAN_FLOOR-4, 24-v.warn*0.2, 10, 0, 0, 6.28); ctx.fill();
                            ctx.strokeStyle="rgba(255,120,60,"+a+")"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(v.x,OCEAN_FLOOR); ctx.lineTo(v.x,OCEAN_SURF+120); ctx.stroke(); }
                        if (v.fire){ ctx.fillStyle="rgba(235,252,255,0.66)";
                            for (let k=0;k<15;k++){ let by=OCEAN_FLOOR-((k*40+frames*7)%(OCEAN_FLOOR-OCEAN_SURF-120)); ctx.beginPath(); ctx.arc(v.x+Math.sin(by*0.08)*11, by, 10+(k%3)*5, 0, 6.28); ctx.fill(); } } } }
                if (this.spout && this.spout.t>60 && this.spout.t<130){ let S=this.spout;
                    ctx.fillStyle="rgba(220,245,255,0.75)"; ctx.fillRect(S.x-34, -180, 68, OCEAN_SURF+210);
                    ctx.fillStyle="rgba(255,255,255,0.9)"; ctx.fillRect(S.x-13, -180, 26, OCEAN_SURF+210);
                    for (let k=0;k<10;k++){ ctx.beginPath(); ctx.arc(S.x+(Math.random()-0.5)*46, (frames*7+k*40)%(OCEAN_SURF+30), 4, 0, 6.28); ctx.fill(); } }
                if (this.spout && this.spout.t<=60){ ctx.strokeStyle="rgba(255,64,64,"+(0.3+0.35*Math.abs(Math.sin(frames*0.4))).toFixed(2)+")"; ctx.lineWidth=3;
                    ctx.beginPath(); ctx.moveTo(this.spout.x, 0); ctx.lineTo(this.spout.x, OCEAN_SURF+30); ctx.stroke(); }
                if (this.tail){ ctx.fillStyle="rgba(255,64,64,"+(this.tail.t<=50?0.2:0.12)+")"; ctx.fillRect(0, OCEAN_SURF-26, canvas.width, 66);
                    if (this.tail.t<=50){ ctx.strokeStyle="rgba(255,80,80,0.85)"; ctx.lineWidth=2; ctx.strokeRect(1, OCEAN_SURF-25, canvas.width-2, 64); } }
                if (this.leap && this.leap.t<44){ ctx.strokeStyle="rgba(255,64,64,"+(0.3+0.4*Math.abs(Math.sin(frames*0.4))).toFixed(2)+")"; ctx.lineWidth=4;
                    ctx.beginPath(); ctx.moveTo(this.cx(), this.y); ctx.lineTo(this.leap.tx, OCEAN_SURF-90); ctx.stroke();
                    ctx.fillStyle="rgba(255,80,80,0.25)"; ctx.beginPath(); ctx.ellipse(this.leap.tx, OCEAN_SURF-4, 60, 12, 0, 0, 6.28); ctx.fill(); }
                if (this.ring){ let R=this.ring;
                    if (R.t<=48){ ctx.strokeStyle="rgba(255,180,60,"+(0.3+0.4*Math.abs(Math.sin(frames*0.4))).toFixed(2)+")"; ctx.lineWidth=4;
                        ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 60+R.t, 0, 6.28); ctx.stroke(); }
                    else { ctx.strokeStyle="rgba(200,240,255,0.8)"; ctx.lineWidth=10; ctx.beginPath(); ctx.arc(this.cx(), this.cy(), R.r, 0, 6.28); ctx.stroke();
                        ctx.strokeStyle="rgba(255,255,255,0.5)"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(this.cx(), this.cy(), Math.max(0, R.r-12), 0, 6.28); ctx.stroke(); } }
                this.drawBody();
                if (this.stuckPad){ ctx.fillStyle=(frames%16<8)?"#FFEB3B":"#FF5252"; ctx.font="bold 13px Consolas, monospace"; ctx.textAlign="center";
                    ctx.fillText("KET TRONG BEO — BAN DI!", this.cx(), this.y-14); ctx.textAlign="left"; }
                ctx.save(); ctx.translate(0,-oceanCamY);
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle="black"; ctx.fillRect(canvas.width/2-160,6,320,12);
                ctx.fillStyle="#4FC3F7"; ctx.fillRect(canvas.width/2-158,8,316*Math.max(0,this.hp/this.maxHp),8);
                ctx.fillStyle="white"; ctx.font="bold 11px Consolas, monospace"; ctx.textAlign="center";
                ctx.fillText(this.name+(this.stuckPad?LT("  ● SO HO","  ● EXPOSED"):""), canvas.width/2, 32); ctx.textAlign="left"; ctx.restore(); ctx.restore();
            }
        }
// BOSS_PART_END s1.MosaBoss.1

// Nguồn: index.html:41158 · Dùng bởi: HelicoprionBoss, MegalodonBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.OCEAN_SURF.1 READ_ONLY
const OCEAN_SURF = 150;
// BOSS_PART_END s1.OCEAN_SURF.1

// Nguồn: index.html:41159 · Dùng bởi: MegaManXBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.OCEAN_FLOOR.1 READ_ONLY
const OCEAN_FLOOR = 500;
// BOSS_PART_END s1.OCEAN_FLOOR.1

// Nguồn: index.html:41160 · Dùng bởi: HelicoprionBoss, MegalodonBoss, MosaBoss, ThalassaBoss
// BOSS_PART_BEGIN s1.oceanPads.1 READ_ONLY
let oceanPads = [], oceanCamY = 0;
// BOSS_PART_END s1.oceanPads.1

// Nguồn: index.html:41163 · Dùng bởi: MosaBoss
// BOSS_PART_BEGIN s1.padAt.1 EDITABLE
function padAt(x){ for (let p of oceanPads){ if (p.solid && x>=p.x-6 && x<=p.x+p.w+6) return p; } return null; }
// BOSS_PART_END s1.padAt.1

// Nguồn: index.html:41164 · Dùng bởi: MosaBoss
// BOSS_PART_BEGIN s1.breakPad.1 EDITABLE
function breakPad(p){ if (p && p.solid){ p.solid=false; p.respawn=300; shakeTimer=Math.max(shakeTimer,14);
            for (let k=0;k<5;k++) visualEffects.push(new Effect(p.x+20+Math.random()*(p.w-40), p.top+Math.random()*10, 'explosion', true, 18)); } }
// BOSS_PART_END s1.breakPad.1

// Nguồn: index.html:100013 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:100024 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
