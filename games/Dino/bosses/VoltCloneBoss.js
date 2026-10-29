// BOSS_FILE: VoltCloneBoss
// BOSS_SNAPSHOT: beba2bbb918dbf33475490c993ed1556c7f85c4568f316c2be580c4161e1acfd
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LT, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, dojoMode, frames, parry, platforms, shakeTimer, visualEffects
// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:35506 · Dùng bởi: VoltCloneBoss
// BOSS_PART_BEGIN s1.VoltCloneBoss.1 EDITABLE
class VoltCloneBoss {
            constructor(level){
                this.hp=100; this.maxHp=100; this.w=46; this.h=52;
                this.baseX=canvas.width-260; this.hoverY=110; this.baseY=320-this.h; this.x=canvas.width; this.y=this.baseY; this.dy=0;
                this.name="VOLT REX"; this.state='entering'; this.subTimer=0; this.facingLeft=true;
                this.dodging=true; this.invulnAll=true; this.jitter=0; this.burnTimer=0; this.enraged=false; this.dodgeCharges=3; this.dodgeReCd=0;
                this.beams=[]; this.strikes=[]; this.sweep=null; this.summon=null; this.burst=null; this.dash=null;
                this.step=0; this.pillarElec=0; this.safeCol=-1; this.orbit=0; this.lastAttack=''; this.queued=null;
            }
            pillars(){ return platforms.filter(p=>p.stone); }
            faceP(){ this.facingLeft=(dino.x+dino.w/2)<(this.x+this.w/2); }
            hurtP(n){ if (!dino.isShielding()) dino.takeDamage(n); else parry(); }
            moveTo(tx,ty,sp){ let dx=tx-this.x, dy=ty-this.y, d=Math.hypot(dx,dy)||1; if (d<=sp){this.x=tx;this.y=ty;return true;} this.x+=dx/d*sp; this.y+=dy/d*sp; return false; }
            pickAttack(){
                if (this.queued){ let q=this.queued; this.queued=null; this.lastAttack=q; this.state=q; this.step=0; this.subTimer=0; return; }   // hoan thanh combo (luot sau quet)
                if (this.hp<=this.maxHp*0.3 && this.lastAttack!=='storm'){ this.state='storm'; this.lastAttack='storm'; this.subTimer=0; this.step=0; this.safeCol=-1; return; }
                if (!this.atkBag || this.atkBag.length===0){ this.atkBag=['beams','sweep','dashes'];   // xao tron TUI -> dung du 3 chieu moi lap
                    for (let i=this.atkBag.length-1;i>0;i--){ let j=Math.floor(Math.random()*(i+1)); let tmp=this.atkBag[i]; this.atkBag[i]=this.atkBag[j]; this.atkBag[j]=tmp; }
                    if (this.atkBag[0]===this.lastAttack && this.atkBag.length>1){ let tmp=this.atkBag[0]; this.atkBag[0]=this.atkBag[1]; this.atkBag[1]=tmp; } }
                let pick=this.atkBag.shift();
                if (pick==='dashes' && this.lastAttack!=='sweep'){ this.queued='dashes'; pick='sweep'; }   // BAT BUOC quet + nhiem dien TRUOC khi luot (chan viec leo tru tron)
                this.lastAttack=pick; this.state=pick; this.step=0; this.subTimer=0;
            }
            toRest(sec){ this.state='rest'; this.restLen=sec*60; this.subTimer=0; }
            update(){
                this.orbit+=0.1; if (this.jitter>0) this.jitter--; if (this.burnTimer>0){ this.burnTimer--; if(this.burnTimer%60===0) this.hp-=1; }
                this.invulnAll = (this.state==='entering');   // chi bat tu luc moi VAO; con lai deu DINH duoc
                if (this.dodgeReCd>0) this.dodgeReCd--; else if (this.dodgeCharges<3){ this.dodgeCharges++; this.dodgeReCd=90; }   // hoi 1 lan ne moi 1.5s
                this.dodging = this.dodgeCharges > 0;
                // pillar nhiem dien (5s sau sweep): dung tren cot -> dmg
                if (this.pillarElec>0){ this.pillarElec--;
                    if (dino.grounded){ for (let p of this.pillars()){ if (Math.abs((dino.y+dino.h)-p.top)<8 && dino.x+dino.w>p.x && dino.x<p.x+p.w){ if (frames%14===0) this.hurtP(1); visualEffects.push(new Effect(dino.x+dino.w/2, p.top-6, 'lightning_shock')); } } } }
                // strikes chung (beams/summon/storm) xu ly
                for (let i=this.strikes.length-1;i>=0;i--){ let st=this.strikes[i]; st.t++;
                    if (!st.hit && st.t>=st.warn){ st.hit=true; // giang xuong
                        if (Math.abs((dino.x+dino.w/2)-st.x) < st.hw && (st.full || dino.grounded)) this.hurtP(st.dmg||1);
                        shakeTimer=Math.max(shakeTimer,10); if (typeof SFX!=='undefined'&&SFX.tone) SFX.tone(2000,0.06,'sawtooth',0.15,400);
                    }
                    if (st.t>st.warn+10) this.strikes.splice(i,1);
                }
                if (this.state==='entering'){ if (this.moveTo(this.baseX,this.baseY,9)){ this.state='idle'; this.subTimer=0; } this.faceP(); return; }
                if (this.state==='idle'){ this.faceP(); this.x += ((this.baseX)-this.x)*0.04; this.y += (this.baseY-this.y)*0.12; this.subTimer++; if (this.subTimer>36) this.pickAttack(); return; }
                if (this.state==='rest'){ this.subTimer++; this.y += ((320-this.h)-this.y)*0.12; if (this.subTimer>=this.restLen){ this.state='idle'; this.subTimer=0; } return; }
                // ---- BEAMS: 4 tia bao hieu 1s roi danh trung vi tri, ket bang trieu set tracking ----
                if (this.state==='beams'){ this.faceP(); this.subTimer++;
                    if (this.step<4){ if (this.subTimer===1){ this.beams.push({x:dino.x+dino.w/2, t:0}); }
                        // moi tia: bao hieu 60f roi giang (them vao strikes)
                        for (let bi=this.beams.length-1;bi>=0;bi--){ let bm=this.beams[bi]; bm.t++; if (bm.t===60){ this.strikes.push({x:bm.x, hw:26, warn:0, t:0, dmg:1, full:true}); this.beams.splice(bi,1); this.step++; this.subTimer=0; } }
                    } else { // trieu set tren dau: tracking 1s, 0.3s cuoi cham lai
                        if (!this.summon){ this.summon={x:dino.x+dino.w/2, t:0}; }
                        this.summon.t++; let tr = this.summon.t<42 ? 0.25 : 0.06;   // 0.3s cuoi cham
                        this.summon.x += ((dino.x+dino.w/2)-this.summon.x)*tr;
                        if (this.summon.t>=60){ this.strikes.push({x:this.summon.x, hw:30, warn:0, t:0, dmg:1, full:true}); this.summon=null; this.toRest(2); }
                    }
                    return;
                }
                // ---- SWEEP: lo lung + charge 2s -> quet set ngang mat duoi -> nhiem dien cot ----
                if (this.state==='sweep'){ this.subTimer++;
                    if (this.step===0){ this.y += (120-this.y)*0.1; if (this.subTimer>120){ this.step=1; this.subTimer=0; this.sweep={x: this.facingLeft?canvas.width:0, dir: this.facingLeft?-1:1}; shakeTimer=20; } }
                    else if (this.step===1){ let sw=this.sweep; sw.x += sw.dir*18;   // nhanh hon
                        let onPillar=false; for (let p of this.pillars()){ if (dino.grounded && Math.abs((dino.y+dino.h)-p.top)<8 && dino.x+dino.w>p.x && dino.x<p.x+p.w) onPillar=true; }
                        if (dino.grounded && !onPillar && dino.y+dino.h>300 && Math.abs((dino.x+dino.w/2)-sw.x)<46) this.hurtP(1);
                        if (sw.x< -70 || sw.x> canvas.width+70){ this.step=2; this.subTimer=0; this.sweep=null; this.pillarElec=420; // XOA tia (het ket goc) + nhiem dien ~7s (phu chieu luot sau do)
                            for (let p of this.pillars()){ this.strikes.push({x:p.x+p.w/2, hw:p.w/2+6, warn:20, t:0, dmg:1, full:false}); } }
                    }
                    else { if (this.subTimer>30) this.toRest(2); }
                    return;
                }
                // ---- DASHES: luot set 3 lan (bao hieu 0.5s) roi charge -> chuong set toa (an toan khi o gan) ----
                if (this.state==='dashes'){ this.subTimer++;
                    if (this.step<3){
                        if (!this.dash){ let dir=(this.cx()<canvas.width/2)?1:-1; this.dash={ warn:30, t:0, dir, tx: dir<0? 55 : canvas.width-this.w-55 }; this.facingLeft=(dir<0); }
                        let d=this.dash; d.t++;
                        if (d.t>=d.warn){ let done=this.moveTo(d.tx, this.baseY, 40);   // luot ngang mat dat
                            if (checkAABB(this,dino)) this.hurtP(1);
                            if (done){ this.step++; this.dash=null; this.subTimer=0; } }
                    } else if (this.step===3){ this.faceP(); if (this.subTimer>50){ this.step=4; this.subTimer=0; this.burst={t:0, x:this.cx(), y:this.cy(), dir:(this.cx()<canvas.width/2?1:-1)}; shakeTimer=26; } }   // GONG NGAY GOC (khong bay vao giua)
                    else { this.burst.t++;
                        // CHUONG PHEU ngang MAT DAT: chi trung nguoi DANG DUNG DUOI DAT trong tam ban. NHAY (bay len) hoac dung TRU = ne.
                        if (this.burst.t>=16 && this.burst.t<=46 && !this.burst.hit){ let b=this.burst, along=((dino.x+dino.w/2)-b.x)*b.dir;
                            let onPillar=false; for (let p of this.pillars()){ if (dino.grounded && Math.abs((dino.y+dino.h)-p.top)<8 && dino.x+dino.w>p.x && dino.x<p.x+p.w) onPillar=true; }
                            if (dino.grounded && !onPillar && dino.y+dino.h>300 && along>4 && along<canvas.width){ this.hurtP(2); this.burst.hit=true; } }
                        if (this.burst.t===16) shakeTimer=32;
                        if (this.burst.t>56){ this.burst=null; this.toRest(2); } }
                    return;
                }
                // ---- STORM (<30%): tia set roi lien tuc, vung an toan doi cho moi 0.75s, 5s ----
                if (this.state==='storm'){ this.subTimer++; this.y += (60-this.y)*0.08;
                    if (this.subTimer>0 && this.subTimer%66===0 && this.subTimer<=330){   // cham hon (moi ~1.1s), bao hieu lau hon
                        if (this.safeCol<0) this.safeCol=Math.floor(Math.random()*6);
                        else { let ns=this.safeCol+(Math.random()<0.5?-1:1); if (ns<0) ns=1; if (ns>5) ns=4; this.safeCol=ns; }   // vung an toan doi sang cot KE BEN
                        for (let c=0;c<6;c++){ if (c===this.safeCol) continue; let x=80+c*(canvas.width-160)/5; this.strikes.push({x:x, hw:86, warn:56, t:0, dmg:1, full:true}); } }
                    if (this.subTimer>=430){ this.state='rest'; this.restLen=180; this.subTimer=0; }
                    return;
                }
            }
            draw(){
                let jx=this.jitter>0?(Math.random()-0.5)*6:0, jy=this.jitter>0?(Math.random()-0.5)*6:0;
                let x=this.x+jx, y=this.y+jy, cx=x+this.w/2, cy=y+this.h/2;
                // strikes / beams / effects
                for (let bm of this.beams){ let a=bm.t/60; ctx.strokeStyle="rgba(255,235,59,"+(0.3+0.5*a).toFixed(2)+")"; ctx.lineWidth=2+a*3; ctx.setLineDash([6,6]); ctx.beginPath(); ctx.moveTo(bm.x,0); ctx.lineTo(bm.x,320); ctx.stroke(); ctx.setLineDash([]); }
                if (this.summon){ let s=this.summon; ctx.fillStyle="rgba(41,182,246,0.25)"; ctx.beginPath(); ctx.arc(s.x, 60, 26,0,6.28); ctx.fill(); ctx.strokeStyle="#FFEB3B"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(s.x,80); ctx.lineTo(s.x,320); ctx.setLineDash([4,8]); ctx.stroke(); ctx.setLineDash([]); }
                for (let st of this.strikes){ if (st.t<st.warn){ let a=st.t/Math.max(1,st.warn); ctx.fillStyle="rgba(255,64,64,"+(0.12+0.18*a).toFixed(2)+")"; ctx.fillRect(st.x-st.hw, st.full?0:120, st.hw*2, 320-(st.full?0:120)); }
                    else { ctx.strokeStyle="#E1F5FE"; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(st.x, st.full?0:120); let yy=st.full?0:120; while(yy<320){ let nx=st.x+(Math.random()-0.5)*16; ctx.lineTo(nx, yy+18); yy+=18; } ctx.stroke(); ctx.strokeStyle="#FFEB3B"; ctx.lineWidth=2; ctx.stroke(); } }
                if (this.sweep){ let sw=this.sweep, x0=cx, y0=cy+this.h*0.35;
                    for (let sN=0;sN<9;sN++){ let off=(sN-4)*11; ctx.strokeStyle=(sN%2)?"#E1F5FE":"#40C4FF"; ctx.lineWidth=(sN===4)?5:2.4; ctx.beginPath(); ctx.moveTo(x0,y0); let steps=9; for (let k=1;k<=steps;k++){ let t=k/steps, px=x0+((sw.x+off)-x0)*t+(k<steps?(Math.random()-0.5)*15:0), py=y0+(320-y0)*t; ctx.lineTo(px,py); } ctx.stroke(); }
                    ctx.fillStyle="rgba(64,196,255,0.5)"; ctx.beginPath(); ctx.arc(sw.x, 316, 28, 0, 6.28); ctx.fill(); ctx.fillStyle="#FFEB3B"; ctx.fillRect(sw.x-42,313,84,7);
                    for (let sN=0;sN<4;sN++){ let ix=sw.x+(sN-1.5)*18; ctx.strokeStyle="#81D4FA"; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(ix,300); ctx.lineTo(ix+(Math.random()-0.5)*10,320); ctx.stroke(); } }
                if (this.pillarElec>0){ let ea=0.55+0.4*Math.sin(frames*0.6); ctx.save(); ctx.lineCap="round"; ctx.shadowBlur=8; ctx.shadowColor="#40C4FF";
                    for (let p of this.pillars()){ let cx=p.x+p.w/2;
                        ctx.strokeStyle="rgba(140,225,255,"+ea.toFixed(2)+")"; ctx.lineWidth=2.6;
                        // tia chay DOC mat tren tru
                        ctx.beginPath(); ctx.moveTo(p.x,p.top); for (let x=p.x+10;x<=p.x+p.w;x+=11){ ctx.lineTo(x, p.top+(Math.random()-0.5)*8); } ctx.stroke();
                        // dien chay DOC than cot xuong dat (2 day)
                        for (let sdir=-1;sdir<=1;sdir+=2){ let bx=cx+sdir*16; ctx.beginPath(); ctx.moveTo(bx,p.top+p.h); let yy=p.top+p.h; while(yy<320){ ctx.lineTo(bx+(Math.random()-0.5)*13, yy+15); yy+=15; } ctx.stroke(); }
                        // tia nho nhay quanh cot
                        ctx.lineWidth=1.3; for (let k=0;k<3;k++){ let sx=p.x+Math.random()*p.w, sy=p.top+Math.random()*(320-p.top); ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(sx+(Math.random()-0.5)*18, sy+(Math.random()-0.5)*18); ctx.stroke(); }
                    }
                    ctx.restore(); }
                if (this.burst){ let b=this.burst, prog=Math.min(1,b.t/16), a=Math.max(0,1-b.t/52), dir=b.dir;
                    let range=canvas.width, tubeLen=range*0.55, reach=prog*range, tubeEnd=Math.min(reach,tubeLen), tubeW=38, nX=b.x+dir*tubeEnd, nY=b.y;
                    ctx.strokeStyle="rgba(64,196,255,"+a.toFixed(2)+")"; ctx.lineCap="round";
                    // ONG (tube): tia SET zigzag (khong thang tap), 2 bien tren/duoi + loi giua
                    for (let o=-1;o<=1;o++){ ctx.lineWidth=(o===0)?5:3; let baseY=b.y+o*tubeW; ctx.beginPath(); ctx.moveTo(b.x,baseY); let segs=Math.max(4,Math.floor(tubeEnd/26));
                        for (let sN=1;sN<=segs;sN++){ let t=sN/segs, jj=(sN<segs)?((sN%2?1:-1)*(8+Math.random()*12)):0; ctx.lineTo(b.x+dir*tubeEnd*t, baseY+jj); } ctx.stroke(); }
                    // nhanh set nho ben trong ong
                    ctx.lineWidth=1.6; for (let s2=0;s2<5;s2++){ let sx=b.x+dir*tubeEnd*(0.18+0.16*s2), sy=b.y+(Math.random()-0.5)*tubeW*1.5; ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(sx+dir*(10+Math.random()*14), sy+(Math.random()-0.5)*22); ctx.stroke(); }
                    // TAM GIAC (flare) toa doc o CUOI ong
                    if (reach>tubeLen){ let flareLen=reach-tubeLen, nb=9;
                        for (let k=0;k<nb;k++){ let sp=(k/(nb-1)-0.5), fx=dir*Math.cos(sp*0.8), fy=Math.sin(sp*0.8); ctx.lineWidth=(Math.abs(sp)<0.12)?4:2.2; let my=nY+sp*tubeW*1.4; ctx.beginPath(); ctx.moveTo(nX,my);
                            let px=nX, py=my; for (let sN=1;sN<=6;sN++){ let t=sN/6, r=flareLen*t; px=nX+fx*r+(Math.random()-0.5)*15; py=nY+fy*r+(Math.random()-0.5)*15; ctx.lineTo(px,py); if (sN>=3 && Math.random()<0.5){ let bl=16+Math.random()*22, ba=Math.atan2(fy,fx)+(Math.random()-0.5)*0.9; ctx.lineTo(px+Math.cos(ba)*bl,py+Math.sin(ba)*bl); ctx.moveTo(px,py); } } ctx.stroke(); } }
                    ctx.lineCap="butt"; ctx.fillStyle="rgba(225,245,254,"+(0.6*a).toFixed(2)+")"; ctx.beginPath(); ctx.arc(b.x,b.y,12,0,6.28); ctx.fill(); }
                if (this.state==='dashes' && this.step===3){ ctx.strokeStyle="#FFEB3B"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(cx,cy, 14+this.subTimer*0.5, 0, 6.28); ctx.stroke(); }
                if (this.dash && this.dash.t<this.dash.warn){ let yy=cy, tx=this.dash.tx+this.w/2; ctx.strokeStyle="rgba(255,235,59,"+(0.22+0.35*Math.abs(Math.sin(frames*0.5))).toFixed(2)+")"; ctx.lineWidth=this.h*0.8; ctx.beginPath(); ctx.moveTo(cx,yy); ctx.lineTo(tx,yy); ctx.stroke(); ctx.strokeStyle="#FFEB3B"; ctx.lineWidth=2; ctx.setLineDash([10,8]); ctx.beginPath(); ctx.moveTo(cx,yy); ctx.lineTo(tx,yy); ctx.stroke(); ctx.setLineDash([]); }
                // than = CLONE TRANG (giong nguoi choi), gai lung + mat xanh; giat khi jitter
                let aura = this.dodging ? 0.5 : 0.15;
                ctx.fillStyle="rgba(64,196,255,"+aura.toFixed(2)+")"; ctx.beginPath(); ctx.arc(cx,cy,this.w*0.95,0,6.28); ctx.fill();
                let legAnim = (((!this.grounded) || this.state==='dashes') && frames%12<6) ? 4 : 0;
                try { dino.drawForm(false, x, y, legAnim, 1, this.facingLeft, VOLT_PAL); } catch(e){}
                for (let d=0; d<3; d++){ ctx.fillStyle = d < this.dodgeCharges ? "#40C4FF" : "rgba(255,255,255,0.16)"; ctx.beginPath(); ctx.arc(cx-16+d*16, y-12, 4, 0, 6.28); ctx.fill(); ctx.strokeStyle="rgba(1,87,155,0.8)"; ctx.lineWidth=1; ctx.stroke(); }   // chỉ báo số lần NÉ
                // tia dien phong quanh than
                ctx.strokeStyle="#81D4FA"; ctx.lineWidth=1.5; for (let k=0;k<5;k++){ let a=this.orbit+k*1.26; ctx.beginPath(); ctx.moveTo(cx+Math.cos(a)*this.w*0.45, cy+Math.sin(a)*this.h*0.45); ctx.lineTo(cx+Math.cos(a)*this.w*0.8+(Math.random()-0.5)*8, cy+Math.sin(a)*this.h*0.8+(Math.random()-0.5)*8); ctx.stroke(); }
                // HP bar
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle="black"; ctx.fillRect(canvas.width/2-160,6,320,12); ctx.fillStyle="#40C4FF"; ctx.fillRect(canvas.width/2-158,8,316*Math.max(0,this.hp/this.maxHp),8);
                ctx.fillStyle="white"; ctx.font="bold 11px Consolas, monospace"; ctx.textAlign="center"; ctx.fillText(this.name+"  "+LT("NÉ","DODGE")+" "+this.dodgeCharges+"/3"+(this.hp<=this.maxHp*0.3?LT("  ⚡CUỒNG NỘ","  ⚡ENRAGED"):""), canvas.width/2, 34); ctx.textAlign="left"; ctx.restore();
            }
        }
// BOSS_PART_END s1.VoltCloneBoss.1

// Nguồn: index.html:40480 · Dùng bởi: VoltCloneBoss
// BOSS_PART_BEGIN s1.VOLT_PAL.1 EDITABLE
const VOLT_PAL = {bd:"#ECEFF1",hd:"#FFFFFF",dk:"#B0BEC5",lt:"#FFFFFF",foot:"#90A4AE",spk:"#29B6F6",out:"#37474F",rim:"#E1F5FE",eye:"#40C4FF",pup:"#01579B",aura:"rgba(64,196,255,0.18)",crest:3};
// BOSS_PART_END s1.VOLT_PAL.1

// Nguồn: index.html:99424 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:99435 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
