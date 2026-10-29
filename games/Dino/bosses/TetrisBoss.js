// BOSS_FILE: TetrisBoss
// BOSS_SNAPSHOT: 9124d003c3ce72e4e4fcae863db4e13cdfe06607527a4558945ab0774010859b
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, Array, ArtoriasBoss, BossProjectile, CX, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, JSON, LANG, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, checkAABB, ctx, currentLang, dino, dojoMode, frames, parry, platforms, shakeTimer, visualEffects
// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24480 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GiantSpiderBoss, GreatSerpentBoss, IaiRaptorBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MosaBoss, MountainGodBoss, PoisonMothBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, VoltCloneBoss
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

// Nguồn: index.html:34713 · Dùng bởi: DanteBoss, TetrisBoss
// BOSS_PART_BEGIN s1.tetris.1 READ_ONLY
let tetris = null, tetrisCamY = 0;
// BOSS_PART_END s1.tetris.1

// Nguồn: index.html:34714 · Dùng bởi: TetrisBoss
// BOSS_PART_BEGIN s1.TSHAPES.1 EDITABLE
const TSHAPES = [
            { k:'I', col:'#00E5FF', cells:[[0,0],[0,1],[0,2],[0,3]] },
            { k:'O', col:'#FFD54F', cells:[[0,0],[0,1],[1,0],[1,1]] },
            { k:'T', col:'#BA68C8', cells:[[0,0],[0,1],[0,2],[1,1]] },
            { k:'S', col:'#66BB6A', cells:[[0,1],[0,2],[1,0],[1,1]] },
            { k:'Z', col:'#EF5350', cells:[[0,0],[0,1],[1,1],[1,2]] },
            { k:'L', col:'#FFA726', cells:[[0,0],[0,1],[0,2],[1,0]] },
            { k:'J', col:'#5C6BC0', cells:[[0,0],[0,1],[0,2],[1,2]] },
        ];
// BOSS_PART_END s1.TSHAPES.1

// Nguồn: index.html:34723 · Dùng bởi: TetrisBoss
// BOSS_PART_BEGIN s1.tetroRots.1 EDITABLE
function tetroRots(cells){ let out=[], cur=cells.map(c=>[c[0],c[1]]);
            for (let k=0;k<4;k++){ let mnR=Math.min.apply(null,cur.map(c=>c[0])), mnC=Math.min.apply(null,cur.map(c=>c[1]));
                let norm=cur.map(c=>[c[0]-mnR,c[1]-mnC]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]); let key=JSON.stringify(norm);
                if (!out.some(v=>JSON.stringify(v)===key)) out.push(norm); cur=cur.map(c=>[c[1],-c[0]]); }
            return out; }
// BOSS_PART_END s1.tetroRots.1

// Nguồn: index.html:34728 · Dùng bởi: TetrisBoss
// BOSS_PART_BEGIN s1.TPIECES.1 EDITABLE
const TPIECES = TSHAPES.map(sh=>({col:sh.col,k:sh.k,rots:tetroRots(sh.cells)}));
// BOSS_PART_END s1.TPIECES.1

// Nguồn: index.html:34738 · Dùng bởi: TetrisBoss
// BOSS_PART_BEGIN s1.tetrisColTop.1 EDITABLE
function tetrisColTop(c){ for (let r=0;r<tetris.rows;r++) if (tetris.grid[r][c]) return r; return tetris.rows; }
// BOSS_PART_END s1.tetrisColTop.1

// Nguồn: index.html:34739 · Dùng bởi: TetrisBoss
// BOSS_PART_BEGIN s1.rebuildTetrisPlatforms.1 EDITABLE
function rebuildTetrisPlatforms(){
            if (!tetris) return;
            platforms.length=0;
            platforms.push({ x: tetris.fx-4, w: tetris.cols*tetris.cell+8, top: tetris.groundY, h: 80, tetrisGround:true });
            for (let c=0;c<tetris.cols;c++){ let top=tetrisColTop(c); if (top<tetris.rows){ let ty=tetris.worldTop+top*tetris.cell; platforms.push({ x: tetris.fx+c*tetris.cell, w: tetris.cell, top: ty, h: tetris.groundY-ty, pillar:true, tetris:true }); } }
        }
// BOSS_PART_END s1.rebuildTetrisPlatforms.1

// Nguồn: index.html:34751 · Dùng bởi: TetrisBoss
// BOSS_PART_BEGIN s1.TetrisBoss.1 EDITABLE
class TetrisBoss {
            constructor(level){
                this.name="TETRA REX"; this.hp=50; this.maxHp=50;
                this.w=104; this.h=72;
                this.homeY = -this.h - 8;   // dung TREN CAO, NGOAI khung (tren vien tren) -> bat tu
                this.x = (tetris?tetris.fx:CX-52) + ((tetris?tetris.cols*tetris.cell:104)-this.w)/2;
                this.y = this.homeY;
                this.invulnAll=true; this.burnTimer=0; this.orbit=0;
                this.state='entering'; this.subTimer=0; this.phase=1; this.piece=null; this.pieceCd=0;
                this.gapCol = (tetris?tetris.cols-1:17);           // chua dung 1 COT CUOI (cot an toan + de pha hang)
                this.openThresh = (tetris?Math.min(10, tetris.rows-3):10);   // len toi o thu ~10 la boss ha xuong danh duoc
                this.openTimer=0; this.clearRows=[];
            }
            cellX(c){ return tetris.fx + c*tetris.cell; }
            cellY(r){ return tetris.worldTop + r*tetris.cell; }
            colTop(c){ return tetrisColTop(c); }
            stackHeight(){ let mn=tetris.rows; for (let c=0;c<tetris.cols;c++){ if (c===this.gapCol) continue; let t=tetrisColTop(c); if (t<mn) mn=t; } return tetris.rows-mn; }
            surfaceWorldY(){ let mn=tetris.rows; for (let c=0;c<tetris.cols;c++){ if (c===this.gapCol) continue; let t=tetrisColTop(c); if (t<mn) mn=t; } return tetris.worldTop + mn*tetris.cell; }
            openY(){ return Math.max(tetris.worldTop + tetris.cell, this.surfaceWorldY() - this.h - 6); }
            computeRestCells(cells, c){ let rest=tetris.rows; for (let cell of cells){ let cc=c+cell[1], top=tetrisColTop(cc), maxR=top-1-cell[0]; if (maxR<rest) rest=maxR; } return rest; }
            evalPlacement(cells, c, rest){
                let placed={}; for (let cell of cells){ let rr=rest+cell[0], cc=c+cell[1]; (placed[cc]=placed[cc]||[]).push(rr); }
                let holes=0, aggH=0, heights=[];
                for (let cc=0;cc<tetris.cols;cc++){
                    if (cc===this.gapCol){ heights.push(0); continue; }
                    let et=tetrisColTop(cc), pr=placed[cc]||[], pmin=pr.length?Math.min.apply(null,pr):tetris.rows, nt=Math.min(et,pmin);
                    heights.push(tetris.rows-nt); aggH+=tetris.rows-nt;
                    for (let rr=nt; rr<tetris.rows; rr++){ let filled=(rr>=et)||pr.indexOf(rr)>=0; if (!filled) holes++; }
                }
                let bump=0; for (let i=0;i<heights.length-1;i++){ if (i===this.gapCol||i+1===this.gapCol) continue; bump+=Math.abs(heights[i]-heights[i+1]); }
                let maxH=Math.max.apply(null,heights);
                let pcol=(typeof dino!=='undefined'&&dino)?Math.floor((dino.x+dino.w/2-tetris.fx)/tetris.cell):-1;
                let onP=(pcol>=0&&placed[pcol])?1:0;
                return holes*1000 + aggH*1 + bump*7 + maxH*6 + (rest)* -1 - onP*12;   // uu tien: khong lo, PHANG (khong thap nhon), thap + nham nhe cot nguoi choi
            }
            bestPlaceFor(pc){ let best=null, bs=1e18;
                for (let rot of pc.rots){ let w=Math.max.apply(null,rot.map(c=>c[1]))+1;
                    for (let c=0; c+w<=this.gapCol; c++){ let rest=this.computeRestCells(rot,c); if (rest<0) continue;
                        let sc=this.evalPlacement(rot,c,rest); if (sc<bs){ bs=sc; best={cells:rot, col:c, color:pc.col, rest}; } } }
                return best; }
            spawnNext(){ let pc=TPIECES[Math.floor(Math.random()*TPIECES.length)];   // KHOI NGAU NHIEN (khong tu chon de ghep hoan hao)
                let bp=this.bestPlaceFor(pc); if (!bp){ this.state='descend'; this.subTimer=0; return; }
                let w=Math.max.apply(null,bp.cells.map(c=>c[1]))+1, ph=Math.max.apply(null,bp.cells.map(c=>c[0]))+1;
                let startC=Math.max(0, Math.min(this.gapCol-w, Math.round((tetris.cols-w)/2)));
                this.piece={ cells:bp.cells, targetC:bp.col, c:startC, color:bp.color, rest:bp.rest, worldY: tetris.worldTop - ph*tetris.cell - 4, mode:'slide', warnT:0 }; }
            dropSpd(){ return 16; }   // ~0.25s: cham lai, thay ro (chuan phase 2)
            lockPiece(){ let p=this.piece;
                for (let cell of p.cells){ let rr=p.rest+cell[0], cc=p.c+cell[1]; if (rr>=0&&rr<tetris.rows&&cc>=0&&cc<tetris.cols){ tetris.grid[rr][cc]=p.color;
                    let cr={x:this.cellX(cc),y:this.cellY(rr),w:tetris.cell,h:tetris.cell};
                    if (checkAABB(dino,cr)){ if (!dino.isShielding()) dino.takeDamage(1); else visualEffects.push(new Effect(dino.x+dino.w/2,dino.y,'parry')); dino.y=this.cellY(p.rest)-dino.h; dino.dy=-4; dino.grounded=false; } } }
                rebuildTetrisPlatforms(); shakeTimer=Math.max(shakeTimer,4);
                visualEffects.push(new Effect(this.cellX(p.c)+tetris.cell, this.cellY(p.rest), 'explosion', true, 7));
                if (typeof SFX!=='undefined'&&SFX.tone) SFX.tone(170,0.06,'square',0.12,120);
                this.piece=null;
            }
            doGapFill(){ this.clearRows=[];   // lap DAY moi hang co khoi -> xoa sach ca stack (khong bi ket boi lo)
                for (let r=0;r<tetris.rows;r++){ if (tetris.grid[r].some(c=>c)){ for (let c=0;c<tetris.cols;c++){ if (!tetris.grid[r][c]) tetris.grid[r][c]='#00E5FF'; } this.clearRows.push(r); } }
                rebuildTetrisPlatforms(); shakeTimer=Math.max(shakeTimer,10); }
            clearLines(){ let kept=tetris.grid.filter(row=>row.some(c=>!c)); let n=tetris.rows-kept.length; while (kept.length<tetris.rows) kept.unshift(new Array(tetris.cols).fill(null)); tetris.grid=kept; rebuildTetrisPlatforms(); return n; }
            update(){
                this.orbit+=0.05;
                if (tetris){ dino.x=Math.max(tetris.fx, Math.min(tetris.fx+tetris.cols*tetris.cell-dino.w, dino.x)); tetrisCamY += (0-tetrisCamY)*0.2; }   // map thap -> khong can cuon camera
                if (this.burnTimer>0){ this.burnTimer--; if (this.burnTimer%60===0) this.hp-=1; }
                if (['entering','build','descend','open','clearing'].indexOf(this.state) < 0){ this.state='build'; this.subTimer=0; this.pieceCd=8; }   // CHONG DO khi bi parry
                // roi khoi: truot ngang khop cho -> hard drop
                if (this.piece){ let p=this.piece;
                    if (p.mode==='slide'){ for (let k=0;k<3;k++){ if (p.c<p.targetC) p.c++; else if (p.c>p.targetC) p.c--; }   // truot ngang khop cho
                        if (p.c===p.targetC){ p.rest=this.computeRestCells(p.cells,p.c); p.mode='warn'; p.warnT=16; } }
                    else if (p.mode==='warn'){ p.warnT--; if (p.warnT<=0){ p.mode='drop'; if (typeof SFX!=='undefined'&&SFX.tone) SFX.tone(90,0.05,'square',0.2,60); } }   // LUON canh bao truoc khi xa (chuan phase 2)
                    else { p.worldY += this.dropSpd(); let ry=this.cellY(p.rest); if (p.worldY>=ry){ p.worldY=ry; this.lockPiece(); } } }
                this.subTimer++;
                // CHI nhan dmg khi da HA VAO TRONG khung (state open + than da xuong duoi vien tren)
                this.invulnAll = !(this.state==='open' && (this.y+this.h) > tetris.worldTop+10);
                if (this.state==='entering'){ this.y=this.homeY; if (this.subTimer>20){ this.state='build'; this.subTimer=0; } return; }
                if (this.state==='build'){ this.y += (this.homeY-this.y)*0.2;
                    if (!this.piece){ if (this.stackHeight() >= this.openThresh){ this.state='descend'; this.subTimer=0; }
                        else if (this.pieceCd>0){ this.pieceCd--; }
                        else { this.spawnNext(); this.pieceCd=2; } }
                    return; }
                if (this.state==='descend'){ let oy=this.openY(); this.y += (oy-this.y)*0.16; if (Math.abs(this.y-oy)<3){ this.y=oy; this.state='open'; this.subTimer=0; this.openTimer=(this.phase>=2?150:210); } return; }
                if (this.state==='open'){ this.y += (this.openY()-this.y)*0.1; this.openTimer--; if (this.openTimer<=0){ this.state='clearing'; this.subTimer=0; this.doGapFill(); } return; }
                if (this.state==='clearing'){ this.y += (this.homeY-this.y)*0.12;
                    if (this.subTimer>26){ this.clearLines(); this.clearRows=[]; this.phase=2; this.state='build'; this.subTimer=0; this.pieceCd=8; } return; }
            }
            drawDino(){ let x=this.x, y=this.y, w=this.w, h=this.h, vuln=!this.invulnAll;
                let body=vuln?"#C62828":"#37474F", edge=vuln?"#FF8A80":"#78909C", lt=vuln?"#EF5350":"#546E7A", eyeC=vuln?"#FFEB3B":"#40C4FF";
                ctx.save();
                // aura theo trang thai
                ctx.fillStyle=vuln?"rgba(255,80,80,"+(0.15+0.1*Math.sin(this.orbit*3)).toFixed(2)+")":"rgba(120,180,255,0.10)";
                ctx.beginPath(); ctx.ellipse(x+w/2,y+h*0.55,w*0.62,h*0.8,0,0,6.28); ctx.fill();
                // duoi may
                ctx.fillStyle=body; ctx.beginPath(); ctx.moveTo(x+w*0.72,y+h*0.5); ctx.lineTo(x+w+18,y+h*0.30); ctx.lineTo(x+w+18,y+h*0.44); ctx.lineTo(x+w*0.74,y+h*0.66); ctx.closePath(); ctx.fill();
                ctx.fillStyle=lt; ctx.fillRect(x+w+6,y+h*0.31,12,4);
                // than
                ctx.fillStyle=body; ctx.fillRect(x+w*0.30, y+h*0.30, w*0.46, h*0.44);
                ctx.fillStyle=lt; ctx.fillRect(x+w*0.30, y+h*0.30, w*0.46, 5);
                ctx.fillStyle="rgba(0,0,0,0.25)"; ctx.fillRect(x+w*0.30, y+h*0.68, w*0.46, 5);
                // gai lung (mach dien)
                ctx.fillStyle=edge; for (let i=0;i<4;i++){ let sx=x+w*0.34+i*w*0.11; ctx.beginPath(); ctx.moveTo(sx,y+h*0.30); ctx.lineTo(sx+w*0.05,y+h*0.14); ctx.lineTo(sx+w*0.10,y+h*0.30); ctx.closePath(); ctx.fill(); }
                // mach dien tren than
                ctx.strokeStyle=eyeC; ctx.lineWidth=1.4; ctx.globalAlpha=0.7; ctx.beginPath(); ctx.moveTo(x+w*0.34,y+h*0.5); ctx.lineTo(x+w*0.46,y+h*0.5); ctx.lineTo(x+w*0.46,y+h*0.6); ctx.lineTo(x+w*0.62,y+h*0.6); ctx.stroke(); ctx.globalAlpha=1;
                // dau (phia truoc-trai, cui xuong nhin nguoi choi)
                ctx.fillStyle=body; ctx.fillRect(x+w*0.06, y+h*0.34, w*0.30, h*0.30);
                ctx.fillStyle=lt; ctx.fillRect(x+w*0.06, y+h*0.34, w*0.30, 4);
                // ham + rang
                ctx.fillStyle="#263238"; ctx.fillRect(x+w*0.04, y+h*0.60, w*0.30, h*0.12);
                ctx.fillStyle="#ECEFF1"; for (let t=0;t<5;t++){ ctx.beginPath(); ctx.moveTo(x+w*0.06+t*w*0.058, y+h*0.60); ctx.lineTo(x+w*0.06+t*w*0.058+4, y+h*0.70); ctx.lineTo(x+w*0.06+t*w*0.058+8, y+h*0.60); ctx.closePath(); ctx.fill(); }
                // mat phat sang
                ctx.fillStyle=eyeC; ctx.shadowBlur=8; ctx.shadowColor=eyeC; ctx.beginPath(); ctx.arc(x+w*0.16, y+h*0.46, 5.5, 0, 6.28); ctx.fill(); ctx.shadowBlur=0;
                ctx.fillStyle="#01579B"; ctx.beginPath(); ctx.arc(x+w*0.16, y+h*0.46, 2.4, 0, 6.28); ctx.fill();
                // rang cua/sung tren dau (antenna)
                ctx.strokeStyle=edge; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x+w*0.20,y+h*0.34); ctx.lineTo(x+w*0.16,y+h*0.20); ctx.stroke(); ctx.fillStyle=eyeC; ctx.beginPath(); ctx.arc(x+w*0.16,y+h*0.19,2.4,0,6.28); ctx.fill();
                // chan may (2 chan co vuot)
                ctx.fillStyle=body; ctx.fillRect(x+w*0.36, y+h*0.72, w*0.09, h*0.24); ctx.fillRect(x+w*0.56, y+h*0.72, w*0.09, h*0.24);
                ctx.fillStyle="#ECEFF1"; for (let f=0;f<2;f++){ let fx=x+w*(0.36+f*0.20); ctx.beginPath(); ctx.moveTo(fx,y+h*0.96); ctx.lineTo(fx+w*0.09,y+h*0.96); ctx.lineTo(fx+w*0.045,y+h*1.02); ctx.closePath(); ctx.fill(); }
                ctx.restore();
            }
            draw(){
                let T=tetris, off=tetrisCamY;
                for (let r=0;r<T.rows;r++) for (let c=0;c<T.cols;c++){ let col=T.grid[r][c]; if (col){ let x=this.cellX(c), y=this.cellY(r); ctx.fillStyle=col; ctx.fillRect(x+1,y+1,T.cell-2,T.cell-2); ctx.fillStyle="rgba(255,255,255,0.22)"; ctx.fillRect(x+1,y+1,T.cell-2,4); ctx.fillStyle="rgba(0,0,0,0.18)"; ctx.fillRect(x+1,y+T.cell-4,T.cell-2,3);
                    if (this.state==='clearing' && this.clearRows.indexOf(r)>=0 && (Math.floor(this.subTimer/3)%2===0)){ ctx.fillStyle="rgba(255,255,255,0.85)"; ctx.fillRect(x+1,y+1,T.cell-2,T.cell-2); } } }
                // COT AN TOAN (cot cuoi de trong)
                let gx=this.cellX(this.gapCol); ctx.fillStyle="rgba(0,229,255,0.07)"; ctx.fillRect(gx, T.worldTop, T.cell, T.rows*T.cell);
                ctx.strokeStyle="rgba(0,229,255,0.35)"; ctx.setLineDash([5,6]); ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(gx, T.worldTop); ctx.lineTo(gx, T.groundY); ctx.moveTo(gx+T.cell, T.worldTop); ctx.lineTo(gx+T.cell, T.groundY); ctx.stroke(); ctx.setLineDash([]);
                ctx.strokeStyle="rgba(120,150,200,0.25)"; ctx.lineWidth=2; ctx.strokeRect(T.fx-2, T.worldTop-2, T.cols*T.cell+4, T.rows*T.cell+4);
                ctx.strokeStyle="rgba(255,255,255,0.05)"; ctx.lineWidth=1;
                for (let c=0;c<=T.cols;c++){ ctx.beginPath(); ctx.moveTo(T.fx+c*T.cell,T.worldTop); ctx.lineTo(T.fx+c*T.cell,T.groundY); ctx.stroke(); }
                if (this.piece){ let p=this.piece;
                    let gcol=(p.mode==='slide')?p.targetC:p.c, grest=(p.mode==='slide')?this.computeRestCells(p.cells,p.targetC):p.rest;
                    let flash=(p.mode==='warn')&&(Math.floor(this.subTimer/4)%2===0);
                    for (let cell of p.cells){ let gx=this.cellX(gcol+cell[1]), gy=this.cellY(grest+cell[0]);   // GHOST canh bao noi dap
                        ctx.fillStyle=flash?"rgba(255,70,70,0.5)":"rgba(255,255,255,0.15)"; ctx.fillRect(gx+2,gy+2,T.cell-4,T.cell-4);
                        ctx.strokeStyle=flash?"rgba(255,120,120,0.95)":"rgba(255,255,255,0.4)"; ctx.lineWidth=1.4; ctx.strokeRect(gx+1.5,gy+1.5,T.cell-3,T.cell-3); }
                    for (let cell of p.cells){ let x=this.cellX(p.c+cell[1]), y=p.worldY+cell[0]*T.cell; ctx.fillStyle=p.color; ctx.fillRect(x+1,y+1,T.cell-2,T.cell-2); ctx.fillStyle="rgba(255,255,255,0.3)"; ctx.fillRect(x+1,y+1,T.cell-2,4); } }
                ctx.fillStyle="#1A237E"; ctx.fillRect(T.fx-4, T.groundY, T.cols*T.cell+8, 40);
                ctx.fillStyle="#0D1440"; for (let i=0;i<T.cols*T.cell/8;i++) ctx.fillRect(T.fx + i*8, T.groundY+2, 4, 4);
                this.drawDino();
                ctx.save(); ctx.translate(0,-off);
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle="black"; ctx.fillRect(CX-160,4,320,14); ctx.fillStyle="#AB47BC"; ctx.fillRect(CX-158,6,316*Math.max(0,this.hp/this.maxHp),10);
                ctx.fillStyle="white"; ctx.font="bold 11px Consolas, monospace"; ctx.textAlign="center"; ctx.fillText(this.name+"  P"+this.phase+(this.invulnAll?("  \u2715 "+LANG[currentLang].b_out):("  \u25cf "+LANG[currentLang].b_hit)), CX, 32); ctx.textAlign="left"; ctx.restore(); ctx.restore();
            }
        }
// BOSS_PART_END s1.TetrisBoss.1

// Nguồn: index.html:98795 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:98806 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
