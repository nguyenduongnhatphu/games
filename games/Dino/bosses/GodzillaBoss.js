// BOSS_FILE: GodzillaBoss
// BOSS_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, addStyle, beamClashRecord, bossProjectiles, canvas, checkAABB, ctx, currentAmmoType, dino, doChieuBatDau, doChieuDong, doChieuLay, doChieuMo, doChieuNative, floatingTexts, frames, parry, parryX, pickFromBag, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:216 · Dùng bởi: GodzillaBoss, PteroBoss, QuetzalBoss, ScarabLordBoss, SpinoBoss, TriceratopsBoss
// BOSS_PART_BEGIN s0.desertBossPoly.1 READ_ONLY
function desertBossPoly(points,fill,edge='#20242a',width=2){
            ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);
            for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);
            ctx.closePath();ctx.fillStyle=fill;ctx.fill();
            if(edge){ctx.strokeStyle=edge;ctx.lineWidth=width;ctx.stroke();}
        }
// BOSS_PART_END s0.desertBossPoly.1

// Nguồn: index.html:222 · Dùng bởi: GodzillaBoss, PteroBoss, QuetzalBoss, ScarabLordBoss, SpinoBoss, TriceratopsBoss
// BOSS_PART_BEGIN s0.desertBossLine.1 READ_ONLY
function desertBossLine(points,color,width=1.5){
            ctx.beginPath();ctx.moveTo(points[0][0],points[0][1]);
            for(let i=1;i<points.length;i++)ctx.lineTo(points[i][0],points[i][1]);
            ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();
        }
// BOSS_PART_END s0.desertBossLine.1

// Nguồn: index.html:398 · Dùng bởi: GodzillaBoss
// BOSS_PART_BEGIN s0.drawDesertGodzilla.1 EDITABLE
function drawDesertGodzilla(b){
            const charge=b.state==='atomic_charge',fire=b.state==='atomic_fire',hot=charge||fire;
            const P={edge:'#101a20',dark:'#26343c',body:'#3e5057',lit:'#63777a',belly:'#7e8a83',claw:'#d6cbb7'};
            const poly=(p,c,e=true)=>desertBossPoly(p,c,e?P.edge:null,2.6),br=Math.sin(frames*.045)*2;
            const lift=b.state==='stomp_prep'?Math.max(0,Math.sin(frames*.1))*23:0;
            ctx.save();ctx.translate(b.x,b.y);
            if(b.state!=='tail_fire'){
                poly([[182,129],[216,134],[249,155],[278,185],[315,198],[330,193],[316,207],[287,207],[255,193],[221,184],[186,179]],P.dark);
                poly([[207,146],[240,163],[269,192],[292,201],[275,198],[247,185],[214,175]],P.body,false);
                for(let i=0;i<4;i++)desertBossLine([[231+i*19,164+i*10],[226+i*19,178+i*7]],'#53666b',2);
            }
            const leg=(back)=>{const x=back?177:114,dy=back?lift:0;
                poly([[x-25,154],[x+20,150],[x+38,172],[x+34,199-dy],[x+22,220-dy],[x+25,232-dy],[x+35,240-dy],[x-32,240-dy],[x-38,234-dy],[x-25,221-dy],[x-26,196-dy],[x-34,175]],back?P.dark:P.body);
                if(!back)poly([[x-23,164],[x+12,160],[x+24,177],[x+15,199],[x-8,213],[x-18,201],[x-25,180]],P.lit,false);
                for(let i=0;i<3;i++){const tx=x-33+i*19;poly([[tx,231-dy],[tx+10,230-dy],[tx+15,238-dy],[tx-6,240-dy]],P.claw);}
            };
            leg(true);
            // A broad, forward-loaded rib cage and thick neck make the kaiju
            // read as a massive animal, rather than a stack of rectangles.
            poly([[84,84+br],[112,70+br],[150,76+br],[187,98+br],[208,125],[215,157],[202,188],[173,207],[130,210],[94,194],[77,164],[72,121]],P.body);
            poly([[86,102+br],[109,99+br],[121,126],[130,155],[139,185],[127,199],[100,191],[85,170],[78,140]],P.belly,false);
            for(let i=0;i<7;i++){const y=111+i*12;desertBossLine([[83,y],[105+i*3,y+5],[119+i*2,y+3]],'#485c60',2.5);}
            for(let row=0;row<4;row++)for(let col=0;col<4;col++){const x=138+col*15-row*3,y=103+row*18;poly([[x,y],[x+7,y-3],[x+11,y+3],[x+7,y+8],[x,y+7]],row%2?P.dark:P.lit,false);}
            leg(false);
            // Three staggered dorsal ridges; the main plates are jagged mineral
            // shapes, with a tail-to-head pulse when atomic breath charges.
            const fins=[[114,84,24],[143,80,37],[171,87,43],[198,107,37],[221,136,29],[249,164,21],[278,186,15]];
            fins.forEach(([x,y,h],i)=>{
                const glow=fire?1:charge?Math.max(0,1-Math.abs(((frames*.05)%1.6)-.15*(6-i))*3):.1;
                poly([[x-10,y+7],[x-15,y-8],[x-6,y-h*.48],[x-8,y-h],[x+2,y-h*.77],[x+10,y-h*1.12],[x+13,y-h*.5],[x+23,y-h*.37],[x+15,y+5]],glow>.4?'#3fb4c7':'#365a66');
                poly([[x-3,y-2],[x+2,y-h*.62],[x+9,y-h*.83],[x+8,y-h*.3],[x+14,y-4]],glow>.4?'#c9fbff':'#6598a1',false);
                if(glow>.15){ctx.globalAlpha=glow;desertBossLine([[x-6,y],[x+3,y-h*.6],[x+10,y-h*.9]],'#92f5ff',3);ctx.globalAlpha=1;}
            });
            poly([[94,107],[79,91],[66,77],[69,58],[87,54],[108,74],[117,95]],P.body);
            poly([[88,94],[74,76],[76,66],[88,67],[103,84]],P.lit,false);
            // Heavy forearms, knuckles and hooked claws.
            poly([[105,120],[91,118],[74,127],[65,144],[62,157],[72,163],[85,155],[95,139],[112,136]],P.dark);
            poly([[100,120],[86,124],[76,138],[73,148],[82,148],[94,132],[107,131]],P.lit,false);
            for(let i=0;i<3;i++)poly([[66+i*6,146+i*3],[58+i*5,150+i*4],[55+i*5,160+i*4],[65+i*5,156+i*3],[72+i*4,152+i*3]],P.claw);
            // The muzzle ends at the existing beam origin (x+10, y+80).
            poly([[19,45],[39,34],[65,29],[88,31],[103,41],[104,62],[93,77],[64,84],[24,78],[12,66]],P.body);
            poly([[21,46],[40,37],[67,34],[85,36],[93,42],[74,42],[54,40],[27,51]],P.lit,false);
            poly([[17,64],[68,65],[94,63],[91,78],[51,91],[16,82],[9,76]],'#172025',false);
            ctx.save();ctx.translate(88,70);ctx.rotate(hot?-.23:-.03);
            poly([[-75,4],[-30,3],[7,-4],[8,12],[-15,24],[-49,23],[-75,16],[-81,10]],P.dark);
            poly([[-64,13],[-31,17],[-10,13],[-16,20],[-47,21],[-67,17]],P.lit,false);
            for(let i=0;i<6;i++)poly([[-69+i*11,5],[-65+i*11,-3-i%2],[-61+i*11,5]],P.claw,false);ctx.restore();
            for(let i=0;i<7;i++)poly([[18+i*10,65],[25+i*10,65],[21+i*10,73+i%2*2]],P.claw,false);
            poly([[46,44],[64,40],[81,43],[74,54],[54,54]],P.edge,false);
            poly([[52,48],[68,44],[72,46],[64,50],[54,51]],hot?'#a6f5ff':'#e2a85c',false);
            poly([[43,41],[62,35],[86,38],[87,44],[67,43],[49,49]],P.dark);
            ctx.fillStyle=P.edge;ctx.fillRect(23,54,7,4);
            if(hot){ctx.fillStyle=fire?'#e6ffff':'#68deef';ctx.beginPath();ctx.ellipse(18,77,14,7,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f3ffff';ctx.beginPath();ctx.ellipse(11,78,6,3,0,0,Math.PI*2);ctx.fill();}
            ctx.restore();
        }
// BOSS_PART_END s0.drawDesertGodzilla.1

// Nguồn: index.html:2059 · Dùng bởi: GodzillaBoss
// BOSS_PART_BEGIN s0.GodzillaBoss.1 EDITABLE
class GodzillaBoss {
            constructor(level) {
                this.hp = 250; this.maxHp = 250;   // ban vao dau cong dmg rat nhanh -> can be day tuong xung
                this.tier = 'colossal'; this.headWeak = true; this.headZone = 100; this.headMarkX = 80; this.headMarkY = 52;
                this.w = 280; this.h = 240; this.baseX = canvas.width - 300; this.baseY = 320 - this.h;
                this.x = canvas.width; this.y = this.baseY; this.state = 'entering'; this.actionTimer = 120; this.name = "GODZILLA"; this.subStateTimer = 0; this.lastMeleeHit = -1;
                this.laserLanes = []; this.isDeadFinished = false; this.headHits = 0; this.lastSkill = ''; this.burnTimer = 0; this.atomicCd = 0; this.beamY = 0;
            }
            getDmg() { return 1; }
            clashWin(tag) {
                doChieuDong(this);
                this.hp -= 20; shakeTimer = 44;   // theo ti le be mau moi (250)
                visualEffects.push(new Effect(this.x + 10, this.y + 80, 'explosion', true, 62));
                visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion', true, 48));
                floatingTexts.push(new FloatingText(this.x, this.y - 20, "DO THANG! -10  (" + tag + ")"));
                if (typeof addStyle === 'function') addStyle(30, 'clash');
                this.state = 'idle'; this.actionTimer = 90;
            }
            draw() {
                let x = this.x, y = this.y; ctx.save();
                let colDark = "#212121", colBase = "#424242", colFin = "#00E5FF", colBelly = "#616161";
                
                if (this.state.includes('back_laser')) {
                    ctx.translate(x + this.w/2, y + this.h/2); ctx.scale(-1, 1); ctx.translate(-(x + this.w/2), -(y + this.h/2));
                }

                let mx = x + 10, my = y + 80;


                if (this.state === 'tail_fire') {
                    let _d0 = Math.max(0, x + 110 - 400), _dw = (x + 110) - _d0;
                    ctx.fillStyle = colDark; ctx.fillRect(_d0, 280, _dw, 40);
                    ctx.fillStyle = colFin;
                    for (let tx = _d0 + 20; tx < x + 90; tx += 90) { ctx.beginPath(); ctx.moveTo(tx, 280); ctx.lineTo(tx + 20, 250); ctx.lineTo(tx + 40, 280); ctx.fill(); }
                    ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.fillRect(_d0, 300, _dw, 10);
                }

                // ===== THIEN THACH: bao tam roi -> khoi da lua -> van da nong chay nay tung toe =====
                if (this.state === 'deb_warn' || this.state === 'deb_go') {
                    let mX = this.metX || canvas.width/2;
                    if (this.state === 'deb_warn') {
                        let p = Math.min(1, this.subStateTimer / 56);
                        ctx.strokeStyle = "rgba(255,110,50," + (0.35 + 0.4*Math.sin(frames*0.35)) + ")"; ctx.lineWidth = 4;
                        ctx.beginPath(); ctx.arc(mX, 306, 92, 0, 6.28); ctx.stroke();
                        ctx.fillStyle = "rgba(255,110,50,0.16)"; ctx.beginPath(); ctx.arc(mX, 306, 92 * p, 0, 6.28); ctx.fill();
                        ctx.fillStyle = "rgba(255,170,90,0.5)"; ctx.fillRect(mX - 3, 0, 6, 306);
                    }
                    if (this.state === 'deb_go' && (this.metY || 0) < 292 && this.metY > -900) {
                        let my2 = this.metY;
                        ctx.fillStyle = "rgba(255,140,40,0.35)";
                        ctx.beginPath(); ctx.moveTo(mX - 26, my2); ctx.lineTo(mX, my2 - 150); ctx.lineTo(mX + 26, my2); ctx.fill();
                        ctx.fillStyle = "#3E2723"; ctx.beginPath(); ctx.arc(mX, my2, 30, 0, 6.28); ctx.fill();
                        ctx.fillStyle = "#BF360C"; ctx.beginPath(); ctx.arc(mX - 7, my2 - 5, 16, 0, 6.28); ctx.fill();
                        ctx.fillStyle = "#FF7043"; ctx.beginPath(); ctx.arc(mX + 8, my2 + 6, 9, 0, 6.28); ctx.fill();
                        ctx.fillStyle = "#FFCC80"; ctx.beginPath(); ctx.arc(mX + 3, my2 - 10, 5, 0, 6.28); ctx.fill();
                    }
                    for (let s of this.shards || []) {
                        let a3 = s.t > 170 ? (210 - s.t) / 40 : 1;
                        ctx.globalAlpha = Math.max(0, Math.min(1, a3));
                        ctx.fillStyle = "rgba(255,120,40,0.30)"; ctx.beginPath(); ctx.arc(s.x, s.y, 15, 0, 6.28); ctx.fill();
                        ctx.fillStyle = "#5D4037"; ctx.beginPath(); ctx.arc(s.x, s.y, 9, 0, 6.28); ctx.fill();
                        ctx.fillStyle = "#FF6D00"; ctx.beginPath(); ctx.arc(s.x - 2, s.y - 2, 5, 0, 6.28); ctx.fill();
                        ctx.fillStyle = "#FFD180"; ctx.beginPath(); ctx.arc(s.x + 2, s.y + 1, 2.4, 0, 6.28); ctx.fill();
                        ctx.globalAlpha = 1;
                    }
                }
                // ===== XOAY DUOI 360: vong quet sat dat =====
                if (this.state === 'spin_warn' || this.state === 'spin_go') {
                    let go = this.state === 'spin_go';
                    let a2 = go ? Math.max(0, 1 - this.subStateTimer / 27) : (0.2 + 0.3 * Math.sin(frames * 0.4));
                    ctx.fillStyle = "rgba(255,80,80," + (go ? a2 * 0.5 : a2) + ")";
                    ctx.fillRect(0, 268, canvas.width, 52);
                    ctx.strokeStyle = "rgba(255,180,180," + (go ? a2 : 0.85) + ")"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(0, 268); ctx.lineTo(canvas.width, 268); ctx.stroke();
                    if (!go) { ctx.fillStyle = "#FFCDD2"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("NHẢY!", canvas.width/2, 258); ctx.textAlign = "left"; }
                    // CAI DUOI: quet ngang qua ca man hinh, day dan ve phia mut
                    let sc = x + this.w/2;
                    let sweep = go ? Math.min(1, this.subStateTimer / 24) : 0;
                    let ang0 = -Math.PI * 0.15, ang = ang0 + sweep * Math.PI * 2;
                    let TL = go ? 560 : 300 + Math.sin(frames * 0.3) * 30;
                    ctx.save(); ctx.translate(sc, 294);
                    if (!go) ctx.rotate(Math.sin(frames * 0.25) * 0.10); else ctx.rotate(Math.sin(ang) * 0.16);
                    let dirS = go ? (Math.cos(ang) >= 0 ? 1 : -1) : 1;
                    ctx.scale(dirS, 1);
                    ctx.fillStyle = "#212121";
                    ctx.beginPath(); ctx.moveTo(0, -16); ctx.lineTo(TL, -5); ctx.lineTo(TL, 5); ctx.lineTo(0, 18); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#00E5FF";
                    for (let t2 = 60; t2 < TL - 30; t2 += 90) { ctx.beginPath(); ctx.moveTo(t2, -12); ctx.lineTo(t2 + 22, -34); ctx.lineTo(t2 + 44, -12); ctx.fill(); }
                    ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.fillRect(0, 6, TL, 4);
                    ctx.restore();
                }
                // ===== COT NGUYEN TU o 2 mep map =====
                if (this.state === 'atom_warn' || this.state === 'atom_go') {
                    const PERd = this.rage ? 22 : 30;
                    let warn = this.state === 'atom_warn';
                    let ph = warn ? -1 : (this.subStateTimer % PERd);
                    let lx = warn ? 46 : (this.atomLX || 46), rx = warn ? canvas.width - 46 : (this.atomRX || canvas.width - 46);
                    for (let px of [lx, rx]) {
                        if (px < -500) continue;
                        if (warn || ph < 6) {   // vach bao truoc
                            let a = 0.18 + 0.22 * Math.sin(frames * 0.4);
                            ctx.fillStyle = "rgba(0,229,255," + a + ")"; ctx.fillRect(px - 44, 0, 88, 320);
                            ctx.strokeStyle = "rgba(120,255,255,0.8)"; ctx.lineWidth = 2; ctx.strokeRect(px - 44, 0, 88, 320);
                        } else if (ph <= 20) {   // cot bung len
                            let g = ctx.createLinearGradient(px - 44, 0, px + 44, 0);
                            g.addColorStop(0, "rgba(0,180,255,0.15)"); g.addColorStop(0.5, "rgba(200,255,255,0.92)"); g.addColorStop(1, "rgba(0,180,255,0.15)");
                            ctx.fillStyle = g; ctx.fillRect(px - 44, 0, 88, 320);
                            ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.fillRect(px - 12, 0, 24, 320);
                            for (let k = 0; k < 5; k++) { let sy2 = (frames * 11 + k * 64) % 320;
                                ctx.fillStyle = "rgba(180,255,255,0.7)"; ctx.fillRect(px - 30, sy2, 60, 6); }
                        }
                    }
                }
                drawDesertGodzilla(this);

                let _ty = (this.beamTipY === undefined) ? 322 : this.beamTipY;
                let targetY1 = _ty - 14, targetY2 = _ty + 14;

                ctx.restore();

                if (this.state === 'clash_prep') {
                    let k = 1 - this.subStateTimer / 50;
                    ctx.fillStyle = (frames % 6 < 3) ? "#00E5FF" : "#FFFFFF";
                    ctx.beginPath(); ctx.arc(x + 10, y + 80, Math.max(4, 6 + k * 26), 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#00E5FF"; ctx.font = "bold 15px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("DO CHUONG! BAN VAO TIA!", canvas.width/2, 40); ctx.textAlign = "left";
                    ctx.fillStyle = "rgba(0,229,255,0.18)"; ctx.fillRect(0, 288 - 30, canvas.width, 60);
                }
                if (this.state === 'clash_go' || this.state === 'clash_lose') {
                    let mx2 = x + 10, my2 = y + 80, cxx = this.clashX, cyy = this.clashY;
                    ctx.save(); ctx.lineCap = "round";
                    ctx.strokeStyle = "rgba(0,229,255,0.55)"; ctx.lineWidth = 40; ctx.beginPath(); ctx.moveTo(mx2, my2); ctx.lineTo(cxx, cyy); ctx.stroke();
                    ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(mx2, my2); ctx.lineTo(cxx, cyy); ctx.stroke();
                    ctx.restore();
                    let pr = 26 + 6 * Math.sin(frames * 0.5);
                    ctx.fillStyle = "#FFFFFF"; ctx.beginPath(); ctx.arc(cxx, cyy, Math.max(6, pr), 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#00E5FF"; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cxx, cyy, Math.max(9, pr + 12), 0, Math.PI*2); ctx.stroke();
                }
                if (this.state === 'clash_lose' && this.boomR && this.subStateTimer <= 50) {
                    let a = Math.max(0, this.subStateTimer / 50);
                    ctx.fillStyle = "rgba(0,229,255," + (0.28 + a * 0.4).toFixed(2) + ")";
                    ctx.beginPath(); ctx.arc(this.boomX, this.boomY, Math.max(8, this.boomR), 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "rgba(255,255,255," + (a * 0.6).toFixed(2) + ")";
                    ctx.beginPath(); ctx.arc(this.boomX, this.boomY, Math.max(5, this.boomR * 0.55), 0, Math.PI*2); ctx.fill();
                }
                if (this.state === 'tail_prep') {
                    let _p0 = Math.max(0, x + 110 - 400); ctx.fillStyle = (frames % 6 < 3) ? "rgba(255, 0, 0, 0.4)" : "transparent"; ctx.fillRect(_p0, 280, (x + 110) - _p0, 40); 
                }
                if (this.state === 'stomp_prep') {
                    ctx.fillStyle = (frames % 6 < 3) ? "rgba(255, 0, 0, 0.4)" : "transparent"; ctx.fillRect(0, 310, canvas.width, 10);
                }
                
                let endX = (this.beamTipX === undefined) ? 0 : this.beamTipX;
                let isHit = false;
                if (isHit && dino.isShielding()) endX = dino.x + dino.w; 

                if (this.state === 'beam_prep') {
                    ctx.fillStyle = (frames % 10 < 5) ? "#00E5FF" : "white";
                    ctx.beginPath(); ctx.arc(mx, my, this.subStateTimer/4, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "rgba(0, 229, 255, 0.2)";
                    ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(endX, targetY1); ctx.lineTo(endX, targetY2); ctx.closePath(); ctx.fill();
                } else if (this.state === 'beam_fire') {
                    ctx.fillStyle = "#00E5FF"; 
                    ctx.beginPath(); ctx.moveTo(mx, my - 10); ctx.lineTo(endX, targetY1 - 10); ctx.lineTo(endX, targetY2 + 10); ctx.lineTo(mx, my + 10); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "white"; 
                    ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(endX, targetY1 + 5); ctx.lineTo(endX, targetY2 - 5); ctx.closePath(); ctx.fill();
                }

                if (this.state === 'atomic_charge') {
                    let p = Math.min(1, this.subStateTimer / 80);
                    ctx.strokeStyle = "rgba(0,229,255," + (0.3 + 0.4 * p) + ")"; ctx.lineWidth = 2 + 4 * p;
                    ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(dino.x + dino.w/2, dino.y + dino.h/2); ctx.stroke();
                    ctx.fillStyle = (frames % 6 < 3) ? "#00E5FF" : "#E0F7FA";
                    ctx.beginPath(); ctx.arc(mx, my, 6 + p * 20, 0, Math.PI*2); ctx.fill();
                } else if (this.state === 'atomic_fire') {
                    if (this.rage && this.trails && frames % 8 === 0) this.trails.push({ x: 60 + Math.random() * (canvas.width - 120), life: 180 });
                    let aby = this.beamY, aex = 0;
                    if (dino.isShielding() && Math.abs((dino.y + dino.h/2) - aby) < 30 && dino.x < mx) aex = dino.x + dino.w;
                    ctx.lineCap = "round";
                    ctx.strokeStyle = "rgba(0,229,255,0.9)"; ctx.lineWidth = 46; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(aex, aby); ctx.stroke();
                    ctx.strokeStyle = "white"; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(aex, aby); ctx.stroke();
                    ctx.lineCap = "butt";
                    ctx.fillStyle = "rgba(0,229,255,0.85)"; ctx.beginPath(); ctx.arc(mx, my, 30, 0, Math.PI*2); ctx.fill();
                }

                if (this.state === 'back_laser_prep') {
                    // BAO TRUOC kieu moi: dai nang luong day dan len, co vien va hat sang chay doc
                    let p = Math.min(1, this.subStateTimer / 60);
                    this.laserLanes.forEach(lane => {
                        ctx.fillStyle = "rgba(0,229,255," + (0.10 + 0.16 * Math.sin(frames * 0.35)) + ")";
                        ctx.fillRect(0, lane - 17, x + 180, 34);
                        ctx.strokeStyle = "rgba(120,255,255,0.75)"; ctx.lineWidth = 2;
                        ctx.strokeRect(0, lane - 17, x + 180, 34);
                        ctx.fillStyle = "rgba(255,255,255,0.85)";
                        ctx.fillRect((x + 180) * (1 - p), lane - 2, (x + 180) * p, 4);
                        for (let k = 0; k < 4; k++) { let sx2 = (x + 180) - ((frames * 13 + k * 130) % (x + 220));
                            ctx.fillStyle = "rgba(180,255,255,0.6)"; ctx.fillRect(sx2, lane - 9, 26, 18); }
                    });
                } else if (this.state === 'sweep_prep' || this.state === 'sweep_fire') {
                    let fire = this.state === 'sweep_fire';
                    for (let ly = 140; ly <= 312; ly += 18) {
                        if (Math.abs(ly - this.gapY) <= 46) continue;
                        ctx.strokeStyle = fire ? "#00E5FF" : "rgba(0,229,255,0.28)"; ctx.lineWidth = fire ? 11 : 3;
                        ctx.beginPath(); ctx.moveTo(x + 40, ly); ctx.lineTo(0, ly); ctx.stroke();
                        if (fire) { ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + 40, ly); ctx.lineTo(0, ly); ctx.stroke(); }
                    }
                    ctx.fillStyle = "rgba(76,175,80,0.22)"; ctx.fillRect(0, this.gapY - 46, x + 40, 92);
                    ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 3; ctx.strokeRect(0, this.gapY - 46, x + 40, 92);
                    ctx.fillStyle = "#69F0AE"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("KHE AN TOAN", (x + 40) / 2, this.gapY - 52); ctx.textAlign = "left";
                } else if (this.state === 'back_laser_fire') {
                    this.laserLanes.forEach(lane => {
                        let lEndX = 0;
                        if (dino.isShielding() && lane >= dino.y - 15 && lane <= dino.y + dino.h + 15) {
                            lEndX = dino.x + dino.w;
                        }
                        // TIA kieu moi: nhieu lop, loi trang, hat sang chay va quang sang o mieng phong
                        let g2 = ctx.createLinearGradient(0, lane - 18, 0, lane + 18);
                        g2.addColorStop(0, "rgba(0,180,255,0.10)"); g2.addColorStop(0.5, "rgba(200,255,255,0.92)"); g2.addColorStop(1, "rgba(0,180,255,0.10)");
                        ctx.fillStyle = g2; ctx.fillRect(Math.min(lEndX, x + 180), lane - 18, Math.abs(x + 180 - lEndX), 36);
                        ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fillRect(Math.min(lEndX, x + 180), lane - 5, Math.abs(x + 180 - lEndX), 10);
                        for (let k = 0; k < 6; k++) { let sx2 = (x + 180) - ((frames * 26 + k * 150) % (x + 220));
                            if (sx2 < lEndX) continue;
                            ctx.fillStyle = "rgba(180,255,255,0.75)"; ctx.fillRect(sx2, lane - 13, 34, 26); }
                        ctx.fillStyle = "rgba(0,229,255,0.8)"; ctx.beginPath(); ctx.arc(x + 180, lane, 20 + Math.sin(frames*0.5)*4, 0, 6.28); ctx.fill();
                        ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.beginPath(); ctx.arc(x + 180, lane, 9, 0, 6.28); ctx.fill();
                    });
                }

                if (this.rage && this.trails) for (let t of this.trails) {
                    let a = Math.min(1, t.life / 40);
                    ctx.fillStyle = "rgba(0,229,255," + (0.35 * a + 0.25).toFixed(2) + ")"; ctx.fillRect(t.x - 26, 296, 52, 26);
                    ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.fillRect(t.x - 12, 300, 24, 18);
                }
                // ctx.fillStyle = "black"; ctx.fillRect(x+20, y - 20, this.w-40, 12);
                // ctx.fillStyle = "#B71C1C"; ctx.fillRect(x + 22, y - 18, (this.w - 44) * (this.hp / this.maxHp), 8);
            }
            update() {
                if (this.state === 'dying') { 
                    this.subStateTimer++;
                    if (this.subStateTimer === 1) { visualEffects.push(new Effect(canvas.width, this.y + 100, 'laser_kill')); }
                    if (this.subStateTimer === 30) {
                        visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion'));
                        this.isDeadFinished = true;
                    }
                    return;
                }

                let gDmg = this.getDmg();
                let pcx = dino.x + dino.w/2, midT = canvas.width * 0.5;
                if (this.atomicCd > 0) this.atomicCd--;
                if (this.state === 'idle' && this.atomicCd <= 0 && pcx >= midT) { this.state = 'atomic_charge'; this.subStateTimer = 0; }
                // ===== GIAI DOAN 2: duoi 50% mau =====
                if (!this.rage && this.hp <= this.maxHp * 0.5 && this.state !== 'entering') {
                    this.rage = true; this.waveQ = []; this.trails = [];
                    floatingTexts.push(new FloatingText(this.x, this.y - 30, "PHAN NO HAT NHAN!"));
                    shakeTimer = 40; SFX.bossEntry && SFX.bossEntry();
                }
                if (this.rage) {
                    if (!this.waveQ) { this.waveQ = []; this.trails = []; }
                    for (let i = this.waveQ.length - 1; i >= 0; i--) {
                        let q = this.waveQ[i]; q.t--;
                        if (q.t <= 0) {
                            shakeTimer = 22;
                            let a1 = new BossProjectile(q.x - 20, 320 - 54, -11, 0, true, gDmg); a1.w = 26; a1.h = 54; a1.color = "#00E5FF";
                            let a2 = new BossProjectile(q.x + 20, 320 - 54, 11, 0, true, gDmg); a2.w = 26; a2.h = 54; a2.color = "#00E5FF";
                            bossProjectiles.push(a1, a2); this.waveQ.splice(i, 1);
                        }
                    }
                    for (let i = this.trails.length - 1; i >= 0; i--) {
                        let t = this.trails[i]; t.life--;
                        if (t.life <= 0) { this.trails.splice(i, 1); continue; }
                        if (checkAABB(dino, { x: t.x - 26, y: 292, w: 52, h: 32 })) { if (!dino.isShielding()) { if (frames % 16 === 0) dino.takeDamage(gDmg); } else visualEffects.push(new Effect(parryX(), dino.y, 'parry')); }
                    }
                }
                if (this.state === 'entering') { this.x -= 2; if (this.x <= this.baseX) this.state = 'idle'; }
                // ===== TIA LUNG QUET QUAT: chua DUNG 1 khe an toan dang di chuyen =====
                else if (this.state === 'sweep_prep') {
                    this.subStateTimer--;
                    this.gapY += this.gapDir * 1.6; if (this.gapY < 150 || this.gapY > 300) this.gapDir *= -1;
                    if (this.subStateTimer <= 0) { this.state = 'sweep_fire'; this.subStateTimer = 80; shakeTimer = 18; SFX.bossSkill && SFX.bossSkill(); }
                }
                else if (this.state === 'sweep_fire') {
                    this.subStateTimer--;
                    this.gapY += this.gapDir * 1.9; if (this.gapY < 150 || this.gapY > 300) this.gapDir *= -1;
                    let pcy2 = dino.y + dino.h/2;
                    if (dino.x < this.x + 60 && Math.abs(pcy2 - this.gapY) > 46) {
                        if (!dino.isShielding()) { if (frames % 14 === 0) dino.takeDamage(gDmg); } else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                    }
                    if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 46; }
                }
                else if (this.state === 'idle') {
                    this.actionTimer--;
                    if (this.actionTimer <= 0) { 
                        let skills = ['beam_prep', 'tail_prep', 'stomp_prep', 'back_laser_prep', 'clash_prep', 'clash_prep', 'atom_warn', 'deb_warn', 'spin_warn'];   // sweep_prep CO Y BO (khong co cach ne hop ly)
                        let chosen = pickFromBag(this, skills);   // TUI CHIEU: dung het roi moi lap
                        if (chosen === 'atom_warn') { this.state = 'atom_warn'; this.subStateTimer = 0; this.atomStep = 0; this.atomHit = false; }
                        else if (chosen === 'deb_warn') { this.state = 'deb_warn'; this.subStateTimer = 0; }
                        else if (chosen === 'spin_warn') { this.state = 'spin_warn'; this.subStateTimer = 0; }
                        else if (chosen === 'sweep_prep') { this.state = 'sweep_prep'; this.subStateTimer = 50; this.gapY = 225; this.gapDir = Math.random() < 0.5 ? 1 : -1; }
                        else if (chosen === 'beam_prep') { this.state = 'beam_prep'; this.subStateTimer = 0; }
                        else if (chosen === 'clash_prep') { this.state = 'clash_prep'; this.subStateTimer = 50; } 
                        else if (chosen === 'tail_prep') { this.state = 'tail_prep'; this.subStateTimer = this.rage ? 45 : 60; }
                        else if (chosen === 'stomp_prep') { this.state = 'stomp_prep'; this.subStateTimer = this.rage ? 45 : 60; }
                        else { this.state = 'back_laser_prep'; this.subStateTimer = 0; }
                    }
                }
                // ===== COT NGUYEN TU: cot moc tu 2 MEP MAP roi buoc dan vao giua -> cam dat o ria =====
                else if (this.state === 'atom_warn') {
                    this.subStateTimer++;
                    if (this.subStateTimer >= 56) { this.state = 'atom_go'; this.subStateTimer = 0; this.atomStep = 0; this.atomHit = false; shakeTimer = 20; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'atom_go') {
                    this.subStateTimer++;
                    const PER = this.rage ? 22 : 30;            // moi buoc tien vao trong
                    const MAXS = this.rage ? 4 : 3;
                    let phase = this.subStateTimer % PER;
                    if (phase === 1) { this.atomHit = false; shakeTimer = Math.max(shakeTimer, 12); }
                    let lx = 46 + this.atomStep * 118, rx = canvas.width - 46 - this.atomStep * 118;
                    this.atomLX = lx; this.atomRX = rx;
                    if (phase >= 6 && phase <= 20 && !this.atomHit) {       // cot dang bung -> gay dmg
                        let pcx = dino.x + dino.w/2;
                        if (Math.abs(pcx - lx) < 44 || Math.abs(pcx - rx) < 44) {
                            if (!dino.isShielding()) dino.takeDamage(1); else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                            this.atomHit = true;
                        }
                    }
                    if (phase === 0 && this.subStateTimer > 0) {
                        visualEffects.push(new Effect(lx, 300, 'explosion', true, 26));
                        visualEffects.push(new Effect(rx, 300, 'explosion', true, 26));
                        this.atomStep++;
                        if (this.atomStep >= MAXS) { this.state = 'idle'; this.actionTimer = this.rage ? 40 : 60; this.atomLX = -999; }
                    }
                }
                // ===== MANH VO ROI: nhieu cot roi tu tren, chi chua DUNG MOT khe an toan =====
                else if (this.state === 'deb_warn') {
                    this.subStateTimer++;
                    if (this.subStateTimer === 1) {
                        this.metX = canvas.width/2; this.metY = -70; this.shards = [];
                        floatingTexts.push(new FloatingText(this.x + 40, this.y - 10, "THIÊN THẠCH!"));
                    }
                    if (this.subStateTimer >= 56) { this.state = 'deb_go'; this.subStateTimer = 0; shakeTimer = 20; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'deb_go') {
                    this.subStateTimer++;
                    if (this.metY < 292) {
                        this.metY += 15;
                        if (this.metY >= 292) {   // CHAM DAT -> no lon + van da nong chay ban ra
                            this.metY = 292; shakeTimer = 46;
                            visualEffects.push(new Effect(this.metX, 300, 'explosion', true, 78));
                            if (Math.abs((dino.x + dino.w/2) - this.metX) < 92 && (dino.y + dino.h) > 250) {
                                if (!dino.isShielding()) dino.takeDamage(1); else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                            }
                            let n = this.rage ? 9 : 7;
                            for (let k = 0; k < n; k++) {
                                let sp = 5 + Math.random() * 6, dirk = (k % 2 === 0 ? 1 : -1);
                                this.shards.push({ x: this.metX, y: 296, vx: dirk * sp * (0.5 + Math.random()*0.7), vy: -(6 + Math.random()*5), t: 0, hit: 0 });
                            }
                            if (SFX.bossSkill) SFX.bossSkill();
                        }
                    }
                    for (let s of this.shards) {
                        s.t++; s.vy += 0.42; s.x += s.vx; s.y += s.vy;
                        if (s.y >= 306) { s.y = 306; s.vy *= -0.62; s.vx *= 0.9; }        // NAY tren mat dat
                        if (s.x < 12 || s.x > canvas.width - 12) s.vx *= -1;
                        if (frames - s.hit > 40 && Math.hypot((dino.x+dino.w/2)-s.x, (dino.y+dino.h/2)-s.y) < 24) {
                            s.hit = frames;
                            if (!dino.isShielding()) dino.takeDamage(1); else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                        }
                    }
                    for (let i = this.shards.length - 1; i >= 0; i--) if (this.shards[i].t > 210) this.shards.splice(i, 1);
                    if (this.subStateTimer > 190) { this.state = 'idle'; this.actionTimer = this.rage ? 36 : 54; this.shards = []; this.metY = -999; }
                }
                // ===== XOAY DUOI 360: quet sat dat CA HAI BEN -> bat buoc phai NHAY =====
                else if (this.state === 'spin_warn') {
                    this.subStateTimer++;
                    if (this.subStateTimer === 1) floatingTexts.push(new FloatingText(this.x + 40, this.y - 10, "XOAY ĐUÔI!"));
                    if (this.subStateTimer >= (this.rage ? 38 : 50)) { this.state = 'spin_go'; this.subStateTimer = 0; this.spinHit = false; shakeTimer = 26; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'spin_go') {
                    this.subStateTimer++;
                    if (!this.spinHit && this.subStateTimer > 5 && this.subStateTimer < 27 && (dino.y + dino.h) > 268) {
                        if (!dino.isShielding()) dino.takeDamage(1); else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                        this.spinHit = true;
                    }
                    if (this.subStateTimer > 44) { this.state = 'idle'; this.actionTimer = this.rage ? 34 : 52; }
                }
                else if (this.state === 'beam_prep') {
                    this.subStateTimer++;
                    if (this.subStateTimer >= 90) { this.state = 'beam_fire'; this.subStateTimer = 150; shakeTimer = 60;
                        this.beamTipX = this.x - 30; this.beamTipY = 320;                 // dau tia bat dau NGAY CANH GODZILLA
                        this.beamGoalX = 24; this.beamGoalY = null; }        // quet HET mat dat toi goc trai roi moi nhac len
                } else if (this.state === 'beam_fire') {
                    this.subStateTimer--;
                    // quet ngang tu Godzilla ve phia nguoi choi, toi noi thi NHAC LEN qua dau roi dung
                    if (this.beamTipX > this.beamGoalX) this.beamTipX = Math.max(this.beamGoalX, this.beamTipX - 6.5);
                    else { if (this.beamGoalY === null) this.beamGoalY = Math.max(100, dino.y - 40);
                           if (this.beamTipY > this.beamGoalY) this.beamTipY = Math.max(this.beamGoalY, this.beamTipY - 2.6); }
                    let hit = false;
                    { let ox = this.x + 10, oy = this.y + 80, dxb = this.beamTipX - ox, dyb = this.beamTipY - oy, L = Math.hypot(dxb, dyb) || 1;
                      for (let tt = 0; tt <= L; tt += 22) {
                          let px = ox + dxb / L * tt, py = oy + dyb / L * tt;
                          if (checkAABB(dino, { x: px - 20, y: py - 20, w: 40, h: 40 })) { hit = true; break; }
                      } }
                    if (hit) { if (dino.isShielding()) { visualEffects.push(new Effect(parryX(), dino.y, 'parry')); } else { dino.takeDamage(gDmg); } }
                    if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 150; }
                } else if (this.state === 'tail_prep') {
                    let _tt = Math.max(180, Math.min(this.baseX, dino.x + dino.w + 130));   // tien lai vua tam quat
                    this.x += Math.max(-12, Math.min(12, (_tt - this.x) * 0.16));
                    this.subStateTimer--; 
                    if (this.subStateTimer <= 0) { this.state = 'tail_fire'; this.subStateTimer = 20; }
                } else if (this.state === 'tail_fire') {
                    this.subStateTimer--; 
                    let _t0 = Math.max(0, this.x + 110 - 400), _tw = (this.x + 110) - _t0;
                    if (checkAABB(dino, {x: _t0, y: 280, w: _tw, h: 40})) { if (!dino.isShielding()) dino.takeDamage(gDmg); else visualEffects.push(new Effect(parryX(), dino.y, 'parry')); } 
                    if (this.subStateTimer <= 0) { this.state = 'returning'; }
                } else if (this.state === 'returning') {
                    this.x += 9; if (this.x >= this.baseX) { this.x = this.baseX; this.state = 'idle'; this.actionTimer = 120; }   // lui ve nhanh hon (truoc 2px/khung = qua cham)
                } else if (this.state === 'stomp_prep') {
                    this.y -= 3.4; this.subStateTimer--; 
                    if (this.subStateTimer <= 0) { this.state = 'stomp_fire'; this.subStateTimer = 15; shakeTimer = 30; }
                } else if (this.state === 'stomp_fire') {
                    this.y += 16; 
                    if (this.y >= this.baseY) {
                        this.y = this.baseY;
                        if (this.subStateTimer === 15) { 
                            if (dino.grounded) {
                                if (!dino.isShielding()) dino.takeDamage(gDmg);
                                else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                            }
                            if (this.rage) { this.waveQ.push({ x: this.x + this.w/2, t: 40 }, { x: this.x + this.w/2, t: 80 }); }
                            let w1 = new BossProjectile(this.x - 20, 320 - 60, -12, 0, true, gDmg);
                            w1.w = 28; w1.h = 60;
                            bossProjectiles.push(w1);                 // bo 2 song phia sau 
                        }
                        this.subStateTimer--; if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 120; }
                    }
                } else if (this.state === 'clash_prep') {
                    this.subStateTimer--;
                    if (this.subStateTimer <= 0) {
                        this.state = 'clash_go'; this.subStateTimer = 300;
                        this.clashY = 288; this.clashX = this.x + 10;
                        this.clashDist = Math.max(120, this.clashX - (dino.x + dino.w/2));
                        this.clashSpeed = this.clashDist / 90;                      // toi nguoi choi trong 1.5s
                        this.starHits = 0; this.starHold = 0; this.clashHits = 0; doChieuBatDau(this); shakeTimer = 22; if (SFX.bossSkill) SFX.bossSkill();
                    }
                } else if (this.state === 'clash_go') {
                    this.subStateTimer--;
                    let ammo = (typeof currentAmmoType !== 'undefined') ? currentAmmoType : 0;
                    let blocked = false;
                    let st = dino.pulsarStar;
                    if (st && !st.onBody && Math.abs(st.x - this.clashX) < 90 && Math.abs(st.y - this.clashY) < 100) {
                        blocked = true;
                        this.clashX = st.x + 34;
                        this.starHold = (this.starHold || 0) + 1;                      // sao chi giu duoc ~1.7s neu khong ban
                        if (this.starHold > 100) { visualEffects.push(new Effect(st.x, st.y, 'explosion', true, 34)); dino.pulsarStar = null; this.starHold = 0; blocked = false;
                            floatingTexts.push(new FloatingText(st.x, st.y - 24, "SAO VO!")); }
                        if (dino.pulsarStar === st) for (let i = projectiles.length - 1; i >= 0; i--) {   // sao vua vo o tren thi khong con do dan
                            let p = projectiles[i];
                            if (p.owner !== undefined && p.owner !== 1) continue;
                            if (Math.abs((p.x + p.w/2) - st.x) < 50 && Math.abs((p.y + p.h/2) - st.y) < 50) {
                                doChieuNative(this); this.starHits++; projectiles.splice(i, 1);
                                visualEffects.push(new Effect(st.x, st.y, 'explosion', true, 22));
                                floatingTexts.push(new FloatingText(st.x, st.y - 24, "SAO " + this.starHits + "/2"));
                                if (this.starHits >= 2) { dino.pulsarStar = null; this.clashWin("PULSAR"); return; }
                                break;
                            }
                        }
                    }
                    // INFERNO ban J = LUONG LUA (khong phai vien dan) -> phai bat rieng
                    if (ammo === 1 && (dino.fireBreathTimer > 0 || dino.fireChannel)) {
                        let pos = dino.getShootPos(), fw = dino.fireBreathLength || 240;
                        let br = { x: pos.dir === 1 ? pos.x : pos.x - fw, y: pos.y - 20, w: fw, h: 40 };
                        let head = { x: this.clashX - 34, y: this.clashY - 34, w: 68, h: 68 };
                        if (dino.fireChannel || checkAABB(br, head)) {
                            let dist = Math.abs((dino.x + dino.w/2) - (this.x + this.w/2));
                            doChieuNative(this); this.clashX += this.clashSpeed * 1.25 + dist / 260;      // cang xa day cang manh
                            if (frames % 12 === 0) { this.clashHits++; floatingTexts.push(new FloatingText(this.clashX, this.clashY - 30, "DO " + this.clashHits + "/3")); }
                            if (frames % 4 === 0) visualEffects.push(new Effect(this.clashX, this.clashY, 'explosion', true, 16));
                            if (this.clashHits >= 3) { this.clashWin("INFERNO"); return; }
                        }
                    }
                    // CHEM CAN CHIEN (Claws bam J): tam ngan nhung day rat manh
                    this._clawCd = Math.max(0, (this._clawCd || 0) - 1);
                    if (dino.clawStrikeTimer > 0 && dino.clawStrikeRect && (this._clawCd || 0) <= 0) {
                        let _mr = dino.clawStrikeRect;
                        if (checkAABB(_mr, { x: this.clashX - 40, y: this.clashY - 40, w: 80, h: 80 })) {
                            this._clawCd = 14; doChieuNative(this);
                            this.clashX += this.clashDist * 0.62;
                            this.clashHits = (this.clashHits || 0) + 3;      // cham mat tia = rui ro cao -> an tron
                            visualEffects.push(new Effect(this.clashX, this.clashY, 'explosion', true, 34));
                            floatingTexts.push(new FloatingText(this.clashX, this.clashY - 30, "CHEM VO TIA!"));
                            if (this.clashHits >= 3) { this.clashWin("CLAWS"); return; }
                        }
                    }
                    for (let i = projectiles.length - 1; i >= 0; i--) {
                        let p = projectiles[i];
                        if (p.owner !== undefined && p.owner !== 1) continue;
                        if (p._gzClash === beamClashRecord(this)) continue;
                        if (Math.abs((p.x + p.w/2) - this.clashX) < 66 && Math.abs((p.y + p.h/2) - this.clashY) < 64) {
                            if (ammo === 4 && (p.dmg || 1) >= 2) { projectiles.splice(i, 1); this.clashWin("VOLT SAC"); return; }
                            let _pierce = (p.pierceCount || 0) > 0;
                            let _mul = 1;
                            if (ammo === 1) { let _dd = Math.abs((dino.x + dino.w/2) - (this.x + this.w/2)); _mul = 1.5 + _dd / 700; }
                            if (_pierce) _mul = Math.max(_mul, 1.4 + (p.dmg || 1) * 0.35);   // XUYEN: cang manh cang day xa
                            this.clashX += (this.clashDist * 0.50 + (p.dmg || 1) * 12) * _mul;
                            visualEffects.push(new Effect(this.clashX, this.clashY, 'explosion', true, _pierce ? 24 : 13));
                            if (_pierce) p._gzClash = beamClashRecord(this); else projectiles.splice(i, 1);
                            // Diem do tinh theo SAT THUONG cho moi vien (truoc day chi dan xuyen): mot phat
                            // CHARGE nang thi phai dang gia hon mot vien thuong, khong phai cung 1/3.
                            let _gain = Math.max(1, Math.round((p.dmg || 1) / 2));
                            this.clashHits = (this.clashHits || 0) + _gain;
                            floatingTexts.push(new FloatingText(this.clashX, this.clashY - 30, (_pierce ? "XUYEN! " : "DO ") + this.clashHits + "/3"));
                            if (this.clashHits >= 3) { this.clashWin(_pierce ? "XUYEN" : "DAY BAT"); return; }
                        }
                    }
                    // @@HE-DOCHIEU: moi vu khi khong phai vien dan (can chien, laser, railgun, boomerang...)
                    doChieuMo(this.clashX - 66, this.clashY - 64, 132, 128, this);
                    for (let _d of doChieuLay(this)){
                        this.clashX += this.clashDist * 0.50 + _d * 12;
                        this.clashHits = (this.clashHits || 0) + Math.max(1, Math.round(_d / 2));
                        visualEffects.push(new Effect(this.clashX, this.clashY, 'explosion', true, 16));
                        floatingTexts.push(new FloatingText(this.clashX, this.clashY - 30, "DO " + Math.min(3, this.clashHits) + "/3"));
                        if (this.clashHits >= 3){ doChieuDong(this); this.clashWin("DAY BAT"); return; }
                    }
                    if (!blocked) this.clashX -= this.clashSpeed;
                    if (this.clashX > this.x + 10) this.clashX = this.x + 10;   // khong cho vuot qua mom: thang/thua tinh bang so diem do
                    if (this.clashX <= dino.x + dino.w) {
                        this.state = 'clash_lose'; this.subStateTimer = 300; this.boomed = false; shakeTimer = 30;
                        if (!dino.isShielding()) dino.takeDamage(gDmg * 2); else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                        visualEffects.push(new Effect(dino.x + dino.w/2, this.clashY, 'explosion', true, 40));
                        floatingTexts.push(new FloatingText(dino.x, dino.y - 26, "DO THUA!"));
                    }
                    if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 80; }
                } else if (this.state === 'clash_lose') {
                    this.subStateTimer--;
                    if (!this.boomed) {
                        this.clashX -= 13; this.clashY += 0.5;                       // tia tiep tuc bay TOI CUOI MAN HINH
                        if (frames % 4 === 0) visualEffects.push(new Effect(this.clashX, this.clashY, 'explosion', true, 18));
                        if (this.clashX <= 70) {                                     // toi cuoi man hinh -> MOI NO
                            this.boomed = true; this.subStateTimer = 70;
                            shakeTimer = 60; if (SFX.bossExplode) SFX.bossExplode();
                            this.boomX = 70; this.boomY = 300; this.boomR = canvas.width / 8;
                            for (let k = 0; k < 8; k++) visualEffects.push(new Effect(this.boomX + (Math.random()-0.5)*this.boomR, this.boomY - Math.random()*this.boomR*0.8, 'explosion', true, 34));
                        }
                    }
                    else if (this.subStateTimer > 20 && this.boomR) {
                        if (Math.hypot((dino.x + dino.w/2) - this.boomX, (dino.y + dino.h/2) - this.boomY) < this.boomR) {
                            if (!dino.isShielding()) { if (frames % 18 === 0) dino.takeDamage(gDmg); }
                            else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                        }
                    }
                    if (this.subStateTimer <= 0) { this.boomR = 0; this.boomed = false; this.state = 'idle'; this.actionTimer = 80; }
                } else if (this.state === 'back_laser_prep') {
                    this.subStateTimer++;
                    if (this.subStateTimer === 1) {
                        let pairs = [[190, 240], [240, 290]]; this.laserLanes = pairs[Math.floor(Math.random() * pairs.length)];   // khong bao gio ra to hop (1,3)
                    }
                    if (this.subStateTimer >= 60) { this.state = 'back_laser_fire'; this.subStateTimer = 30; shakeTimer = 30; }
                } else if (this.state === 'back_laser_fire') {
                    this.subStateTimer--;
                    this.laserLanes.forEach(lane => {
                        let lRect = {x: 0, y: lane - 15, w: this.x + this.w, h: 30};
                        if (checkAABB(dino, lRect)) {
                            if (dino.isShielding()) visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                            else dino.takeDamage(gDmg);
                        }
                    });
                    if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 120; }
                } else if (this.state === 'atomic_charge') {
                    this.subStateTimer++;
                    let closerT = canvas.width * 0.5 + 70;
                    if (pcx < midT - 30) { this.state = 'idle'; this.actionTimer = 40; this.atomicCd = 40; }
                    else {
                        if (this.subStateTimer > 80) this.subStateTimer = 80;
                        if (this.subStateTimer >= 80 && pcx >= closerT) { this.state = 'atomic_fire'; this.subStateTimer = 0; this.beamY = dino.y + dino.h/2; shakeTimer = 30; }
                    }
                } else if (this.state === 'atomic_fire') {
                    this.subStateTimer++;
                    this.beamY += ((dino.y + dino.h/2) - this.beamY) * 0.12;
                    shakeTimer = Math.max(shakeTimer, 4);
                    if (dino.x < this.x + 20 && dino.y + dino.h > this.beamY - 26 && dino.y < this.beamY + 26) {
                        if (dino.isShielding()) { if (frames % 8 === 0) visualEffects.push(new Effect(parryX(), dino.y, 'parry')); }
                        else dino.takeDamage(gDmg);
                    }
                    if (pcx < midT - 30) { this.state = 'idle'; this.actionTimer = 60; this.atomicCd = 90; }
                }
            }
        }
// BOSS_PART_END s0.GodzillaBoss.1

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
