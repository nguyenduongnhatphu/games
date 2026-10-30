// BOSS_FILE: TriDino
// BOSS_SNAPSHOT: 39483d797c15c5e35e37a5b630ae4f295f939302db706fe13262c4e699541a28
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LT, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, frames, parry, platforms, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:41068 · Dùng bởi: TriDino
// BOSS_PART_BEGIN s1.TriDino.1 EDITABLE
class TriDino {
            constructor(role, col, dk, name, x){
                this.role=role; this.col=col; this.dk=dk; this.name=name;
                this.w=32; this.h=34; this.x=x; this.y=320-this.h; this.dy=0; this.grounded=false;
                this.hp=25; this.maxHp=25; this.invulnAll=false; this.burnTimer=0; this.dying=false; this.deathTimer=0;
                this.facingLeft=false; this.tx=x; this.jumpCd=0; this.actCd=(role==='shoot'?50:(role==='ram'?120:30));
                this.state='idle'; this.subT=0; this.shieldHits=2; this.shieldRegen=0; this.charge=null; this.pack=null; this.wanderCd=0; this.legAnim=0; this.slamPhase=null;
            }
            physics(){
                this.dy += 0.6; if (this.dy>13) this.dy=13; this.y += this.dy;
                let feet=this.y+this.h, prevFeet=feet-this.dy; this.grounded=false;
                for (let pf of platforms){ if (this.x+this.w>pf.x+4 && this.x<pf.x+pf.w-4 && prevFeet<=pf.top+2 && feet>=pf.top-2 && this.dy>=0){ this.y=pf.top-this.h; this.dy=0; this.grounded=true; break; } }
                if (this.y > 320-this.h){ this.y=320-this.h; this.dy=0; this.grounded=true; }   // SAN DAT CUNG — khong lot xuong duoi map
                if (this.x<0) this.x=0; if (this.x>canvas.width-this.w) this.x=canvas.width-this.w;
            }
            tryJump(v){ if (this.grounded && this.jumpCd<=0){ this.dy=v; this.grounded=false; this.jumpCd=22; } }
            dodgeBullets(){ if (!this.grounded||this.jumpCd>0) return;
                for (let p of projectiles){ if (Math.abs(p.x-this.cx())<66 && Math.abs(p.y-this.cy())<44){ this.tryJump(-11); break; } } }
            moveToX(sp){ let d=this.tx-this.cx(); if (Math.abs(d)>6){ this.x += Math.sign(d)*sp; this.facingLeft=d<0; }
                if (this.grounded){ for (let pf of platforms){ if (pf.top<this.y-4 && this.y-pf.top<118 && Math.abs((pf.x+pf.w/2)-this.cx())<130){ if (Math.random()<0.05) this.tryJump(-13); break; } } } }
            update(){
                if (['idle','warn','charge','slide','slam'].indexOf(this.state) < 0){ this.state='idle'; this.charge=null; this.slamPhase=null; this.actCd=60; }   // CHONG DO khi bi parry
                if (this.jumpCd>0) this.jumpCd--; if (this.actCd>0) this.actCd--; if (this.wanderCd>0) this.wanderCd--;
                if (this.shieldRegen>0){ this.shieldRegen--; if (this.shieldRegen===0) this.shieldHits=2; }
                if (this.state!=='charge') this.physics();
                this.dodgeBullets();
                let px=dino.x+dino.w/2, py=dino.y+dino.h/2;
                if (this.role==='shoot'){
                    if (this.wanderCd<=0){ let dist=this.cx()-px; this.tx=Math.max(40,Math.min(canvas.width-40, px+(dist<0?-300:300))); this.wanderCd=48; }
                    this.moveToX(2.4); this.facingLeft=px<this.cx();
                    if (this.actCd<=0){ let dx=px-this.cx(), dy=py-this.cy(), d=Math.hypot(dx,dy)||1; bossProjectiles.push(new BossProjectile(this.cx()-8, this.cy()-8, dx/d*6, dy/d*6, false, 1)); this.actCd=30; }
                }
                else if (this.role==='block'){
                    let allies=this.pack.filter(o=>o!==this && o.hp>0);
                    let mx = allies.length? allies.reduce((a,o)=>a+o.cx(),0)/allies.length : this.cx();
                    let pdist=Math.abs(this.cx()-px);
                    if (this.state==='slam'){
                        if (this.slamPhase==='approach'){ this.tx=px; this.moveToX(3.6); this.facingLeft=px<this.cx();
                            if (Math.abs(this.cx()-px)<44 && this.grounded){ this.tryJump(-13); this.slamPhase='air'; } }
                        else { if (this.grounded){ visualEffects.push(new Effect(this.cx(), this.y+this.h, 'explosion', true, 24)); shakeTimer=Math.max(shakeTimer,8);
                            if (Math.hypot((dino.x+dino.w/2)-this.cx(), (dino.y+dino.h)-(this.y+this.h))<44){ if (!dino.isShielding()) dino.takeDamage(1); else visualEffects.push(new Effect(dino.x+dino.w/2,dino.y,'parry')); }
                            this.state='idle'; this.actCd=110; } }
                    } else {
                        if (pdist<115 && this.actCd<=0 && this.grounded){ this.state='slam'; this.slamPhase='approach'; }
                        else { let dir=Math.sign(mx-px)||1; this.tx=Math.max(30,Math.min(canvas.width-30, px+dir*130)); this.moveToX(3.0); this.facingLeft=px<this.cx(); }
                    }
                }
                else if (this.role==='ram'){
                    if (this.state==='idle'){
                        if (this.wanderCd<=0){ let dist=this.cx()-px; this.tx=Math.max(40,Math.min(canvas.width-40, px+(dist<0?-150:150))); this.wanderCd=36; }
                        this.moveToX(2.6);
                        if (this.actCd<=0){ this.state='warn'; this.subT=26; this.facingLeft=px<this.cx(); }
                    } else if (this.state==='warn'){ this.subT--; this.facingLeft=px<this.cx();
                        if (this.subT<=0){ let dx=px-this.cx(), dy=py-this.cy(), d=Math.hypot(dx,dy)||1; this.charge={vx:dx/d, vy:dy/d, dist:0, max:Math.min(canvas.width, d+320)}; this.state='charge'; }   // LAO VUOT QUA nguoi choi (+320px) kieu Aegis
                    } else if (this.state==='charge'){ let c=this.charge, sp=18; this.x+=c.vx*sp; this.y+=c.vy*sp; c.dist+=sp;
                        if (checkAABB(this,dino)){ if (!dino.isShielding()) dino.takeDamage(1); else visualEffects.push(new Effect(dino.x+dino.w/2,dino.y,'parry')); }
                        if (this.x<=0||this.x>=canvas.width-this.w||this.y<=40||c.dist>=c.max){ this.state='idle'; this.actCd=120; this.charge=null; } }
                    if (this.x<0)this.x=0; if (this.x>canvas.width-this.w)this.x=canvas.width-this.w; if (this.y<40)this.y=40; if (this.y>320-this.h)this.y=320-this.h;
                }
                this.legAnim = (((!this.grounded)||this.state==='charge') && frames%12<6) ? 4 : 0;
            }
            drawBody(){ let x=this.x,y=this.y,w=this.w,h=this.h;
                ctx.save(); if (this.facingLeft){ ctx.translate(x+w/2,0); ctx.scale(-1,1); ctx.translate(-(x+w/2),0); }
                ctx.fillStyle=this.dk; ctx.beginPath(); ctx.moveTo(x+w*0.18,y+h*0.5); ctx.lineTo(x-6,y+h*0.42); ctx.lineTo(x+w*0.2,y+h*0.72); ctx.closePath(); ctx.fill();   // duoi
                ctx.fillStyle=this.col; ctx.fillRect(x+w*0.14, y+h*0.34, w*0.6, h*0.46);   // than
                ctx.fillStyle=this.dk; ctx.fillRect(x+w*0.14, y+h*0.34, w*0.6, 4);
                ctx.fillStyle=this.col; ctx.fillRect(x+w*0.5, y+h*0.12, w*0.42, h*0.34);   // dau
                ctx.fillStyle="#263238"; ctx.fillRect(x+w*0.52, y+h*0.34, w*0.4, h*0.08);  // mieng
                ctx.fillStyle=this.dk; let lo=(this.legAnim?3:0); ctx.fillRect(x+w*0.24, y+h*0.78, w*0.14, h*0.22); ctx.fillRect(x+w*0.5, y+h*0.78+lo, w*0.14, h*0.22-lo);  // chan
                ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(x+w*0.74, y+h*0.24, 3.2, 0, 6.28); ctx.fill();
                ctx.fillStyle=this.dk; ctx.beginPath(); ctx.arc(x+w*0.76, y+h*0.24, 1.5, 0, 6.28); ctx.fill();
                ctx.restore();
            }
            draw(){ let cx=this.cx(), cy=this.cy();
                if (this.role==='block' && this.shieldHits>0){ ctx.strokeStyle="rgba(255,202,40,"+(0.45+0.15*Math.sin(frames*0.2)).toFixed(2)+")"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(cx,cy,this.w*0.92,0,6.28); ctx.stroke();
                    for (let i=0;i<this.shieldHits;i++){ ctx.fillStyle="#FFCA28"; ctx.beginPath(); ctx.arc(cx-8+i*16, this.y-9, 3,0,6.28); ctx.fill(); } }
                if (this.role==='ram' && this.state==='warn'){ ctx.strokeStyle="rgba(239,83,80,0.85)"; ctx.lineWidth=2.5; ctx.beginPath(); ctx.arc(cx,cy,this.w*(0.8+0.4*Math.abs(Math.sin(frames*0.5))),0,6.28); ctx.stroke();
                    let dx=(dino.x+dino.w/2)-cx, dy=(dino.y+dino.h/2)-cy, d=Math.hypot(dx,dy)||1; ctx.strokeStyle="rgba(239,83,80,0.5)"; ctx.setLineDash([6,6]); ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+dx/d*90, cy+dy/d*90); ctx.stroke(); ctx.setLineDash([]); }
                this.drawBody();
                ctx.fillStyle="rgba(0,0,0,0.6)"; ctx.fillRect(this.x-2,this.y-5,this.w+4,4); ctx.fillStyle=this.col; ctx.fillRect(this.x-1,this.y-4,(this.w+2)*Math.max(0,this.hp/this.maxHp),2);
                let lbl = this.role==='shoot'?LT('BẮN','SHOOT'):(this.role==='ram'?LT('HÚC','RAM'):LT('KHIÊN','SHIELD'));
                ctx.fillStyle=this.col; ctx.font="bold 8px Consolas, monospace"; ctx.textAlign="center"; ctx.fillText(lbl, cx, this.y-8); ctx.textAlign="left";
            }
        }
// BOSS_PART_END s1.TriDino.1

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
