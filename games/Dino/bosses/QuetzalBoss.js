// BOSS_FILE: QuetzalBoss
// BOSS_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dashVx, dino, frames, parry, parryX, pickFromBag, shakeTimer, visualEffects
// Nguồn: index.html:206 · Dùng bởi: DragonLordBoss, EmberWolfBoss, FlameCoreBoss, FlameLancerBoss, GreatApeBoss, MagmorBoss, QuetzalBoss
// BOSS_PART_BEGIN s0.GWAVE_H.1 READ_ONLY
const GWAVE_H = 96, GWAVE_SPD = 11.5;
// BOSS_PART_END s0.GWAVE_H.1

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

// Nguồn: index.html:227 · Dùng bởi: PteroBoss, QuetzalBoss
// BOSS_PART_BEGIN s0.drawDesertPterosaur.1 READ_ONLY
function drawDesertPterosaur(b,quetzal=false){
            const q=quetzal,dir=q?(b.state==='q_talon_go'?(b.talonDir||-1):-1):(b.oDir||-1);
            const dive=/swoop|q_dive|q_talon_go/.test(b.state),charge=/laser|q_slash|q_flurry/.test(b.state);
            const flap=dive?-.55:Math.sin(frames*(q?.105:.15)),bob=dive||charge?0:-flap*2;
            const P=q?{edge:'#251c1b',body:'#6b5141',lit:'#a28260',mem:'#a95535',shade:'#653629',rib:'#d8a664',crest:'#bc763c',beak:'#d8c19a'}:{edge:'#19242c',body:'#415e68',lit:'#79949b',mem:'#87594e',shade:'#553c3b',rib:'#b88d71',crest:'#b66a4b',beak:'#c1b399'};
            const poly=(p,c,e=true)=>desertBossPoly(p,c,e?P.edge:null,1.8);
            ctx.save();ctx.translate(b.x+(dir>0?b.w:0),b.y);ctx.scale((dir>0?-1:1)*b.w/120,b.h/80);ctx.translate(0,bob);
            const wing=(back)=>{
                ctx.save();ctx.translate(q?58:52,38);ctx.rotate(flap*(back?.36:.53)+(back?-.12:.08));ctx.scale(back?.82:1,back?.8:1);
                const tip=q?106:92,top=q?-57:-51;
                poly([[0,0],[21,-19],[44,-44],[tip,top],[tip-25,-25],[55,-2],[35,9],[15,17],[3,15]],back?P.shade:P.mem);
                poly([[4,1],[23,-14],[45,-38],[tip-7,top+3],[50,-15],[27,7],[10,12]],back?P.mem:P.shade,false);
                poly([[0,-3],[18,-20],[41,-44],[47,-43],[24,-14],[6,4]],back?P.body:P.lit);
                // The elongated fourth finger supports a single membrane; the
                // other three fingers stay short at the wrist.
                desertBossLine([[0,0],[22,-18],[44,-43],[tip,top]],P.rib,2.5);
                for(const [x,y] of [[tip-25,-25],[55,-2],[35,9],[15,17]])desertBossLine([[44,-42],[x,y]],P.rib,1.1);
                for(let i=0;i<3;i++)poly([[40+i*3,-41],[42+i*3,-48],[44+i*3,-42]],P.beak,false);
                poly([[47,-35],[58,-39],[53,-23]],P.mem,false);
                ctx.restore();
            };
            wing(true);
            // Keeled chest and folded hind limbs, with weight at the shoulder.
            poly([[26,35],[42,28],[67,28],[87,35],[94,42],[86,51],[64,56],[40,51],[25,43]],P.body);
            poly([[34,40],[50,36],[76,37],[88,42],[77,49],[53,51],[37,46]],P.lit,false);
            poly([[84,37],[105,40],[111,36],[108,45],[92,48]],P.body);
            for(let i=0;i<2;i++){
                const x=65+i*17,dy=dive?12:0;
                poly([[x,48],[x+7,48],[x+4,56+dy],[x-4,60+dy],[x-8,57+dy],[x-2,53]],i?P.body:P.shade);
                for(let j=0;j<3;j++)poly([[x-7+j*3,56+dy],[x-10+j*3,64+dy],[x-5+j*3,60+dy]],P.beak,false);
            }
            if(q){
                // Quetzal has a long, stiff neck and a broad spear-shaped bill.
                poly([[40,41],[31,41],[23,28],[14,22],[9,12],[16,9],[23,17],[29,20],[37,32],[45,35]],P.body);
                poly([[34,37],[27,24],[17,19],[13,13],[17,12],[24,20],[31,23],[39,35]],P.lit,false);
                ctx.save();ctx.translate(0,20);
                poly([[3,9],[7,0],[18,-3],[25,3],[21,16],[11,18],[0,15]],P.body);
                poly([[9,0],[15,-17],[23,-27],[23,-7],[26,1],[19,3]],P.crest);
                poly([[0,7],[-40,15],[-49,19],[-3,17],[11,13]],P.beak);
                poly([[0,16],[-43,20-charge*3],[-4,23+charge*3],[10,17]],P.lit);
                desertBossLine([[-43,18],[-3,15],[10,13]],P.edge,1.2);
                ctx.fillStyle='#efb744';ctx.fillRect(9,6,7,3);ctx.fillStyle=P.edge;ctx.fillRect(10,6,2,3);
                ctx.restore();
            }else{
                ctx.save();ctx.translate(0,charge?6:0);
                poly([[28,38],[19,35],[12,31],[6,31],[4,37],[16,43],[29,47],[36,43]],P.body);
                poly([[9,29],[16,21],[23,23],[25,33],[18,39],[5,39],[0,34]],P.lit);
                poly([[15,24],[30,13],[56,5],[43,18],[22,30]],P.crest);
                poly([[18,24],[32,15],[48,10],[35,19]],P.rib,false);
                poly([[4,31],[-29,34],[-4,37],[9,36]],P.beak);
                poly([[3,38],[-23,38+charge*3],[-1,42+charge*3],[13,37]],P.body);
                ctx.fillStyle='#ffba70';ctx.fillRect(13,28,6,3);ctx.fillStyle=P.edge;ctx.fillRect(14,28,2,3);
                if(charge){ctx.fillStyle='#e48bfa';ctx.beginPath();ctx.arc(3,38,4+Math.sin(frames*.4),0,Math.PI*2);ctx.fill();}
                ctx.restore();
            }
            wing(false);ctx.restore();
        }
// BOSS_PART_END s0.drawDesertPterosaur.1

// Nguồn: index.html:550 · Dùng bởi: QuetzalBoss
// BOSS_PART_BEGIN s0.QuetzalBoss.1 EDITABLE
class QuetzalBoss {
            constructor(level) {
                this.hp = 100; this.maxHp = 100;
                this.w = 150; this.h = 95; this.baseX = canvas.width - 240; this.baseY = 60;
                this.x = canvas.width + 60; this.y = this.baseY;
                this.state = 'entering'; this.retState = 'idle'; this.name = "QUETZALCOATLUS";
                this.actionTimer = 90; this.subTimer = 0; this.lastSkill = '';
                this.lastMeleeHit = -1; this.burnTimer = 0;
                this.warnX = 0; this.spinHitDone = false;
            }
            pickSkill() {
                let chosen = pickFromBag(this, ['q_glide', 'q_ascend', 'q_flurry', 'q_gale', 'q_talon']);   // TUI CHIEU
                if (chosen === 'q_glide') { this.state = 'q_glide'; }
                else if (chosen === 'q_ascend') { this.state = 'q_ascend'; }
                else if (chosen === 'q_gale') {   // LUONG GIO LON ban ngang tu mot ben ve phia nguoi choi
                    this.state = 'q_gale_warn'; this.subTimer = 54;
                    this.galeDir = ((dino.x + dino.w/2) < canvas.width/2) ? -1 : 1;   // thoi ve phia VACH gan nguoi choi nhat
                    this.galeY = dino.y + dino.h/2; this.galeHit = false; this.galePush = 0; }
                else if (chosen === 'q_talon') { this.state = 'q_talon_warn'; this.subTimer = 48; this.talonY = Math.max(150, Math.min(300 - this.h, dino.y + dino.h/2 - this.h/2)); this.talonDir = (this.x > canvas.width/2) ? -1 : 1; }
                else { this.state = 'q_flurry'; this.subTimer = 0; }
            }
            fireBlade() {
                bossProjectiles.push(new WindBlade(this.x + 10, this.y + this.h/2, dino.x + dino.w/2, dino.y + dino.h/2, 10));
            }
            update() {
                if (this.state === 'entering') {
                    this.x -= 4; if (this.x <= this.baseX) { this.x = this.baseX; this.state = 'idle'; }
                } else if (this.state === 'idle') {
                    this.y = this.baseY + Math.floor(Math.sin(frames * 0.05) * 18);
                    this.actionTimer--;
                    if (this.actionTimer <= 0) this.pickSkill();
                }
                // ----- KỸ NĂNG 1: Lướt -> Dừng nhịp -> Xoay -> Lùi chéo -> Chém đao gió -----
                else if (this.state === 'q_glide') {
                    let tx = dino.x + 150, ty = dino.y - 40;
                    let dx = tx - this.x, dy = ty - this.y, d = Math.hypot(dx, dy);
                    if (d < 18) { this.state = 'q_pause'; this.subTimer = 45; }
                    else { this.x += dx / d * 17; this.y += dy / d * 17; }
                } else if (this.state === 'q_pause') {
                    this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'q_spin'; this.subTimer = 30; this.spinHitDone = false; }
                } else if (this.state === 'q_spin') {
                    this.subTimer--; this.x -= 6;
                    let spinBox = { x: this.x + 25, y: this.y + 15, w: this.w - 50, h: this.h - 30 };
                    if (!this.spinHitDone && checkAABB(dino, spinBox)) {
                        if (dino.isShielding()) { visualEffects.push(new Effect(parryX(), dino.y + 20, 'parry')); }
                        else { dino.takeDamage(1); }
                        this.spinHitDone = true;
                    }
                    if (this.subTimer <= 0) { this.state = 'q_retreat'; this.subTimer = 40; }
                } else if (this.state === 'q_retreat') {
                    this.subTimer--; this.x += 9; this.y -= 5;
                    if (this.y < 30) this.y = 30;
                    if (this.subTimer <= 0) { this.state = 'q_slash'; this.subTimer = 30; }
                } else if (this.state === 'q_slash') {
                    this.subTimer--;
                    if (this.subTimer === 12) this.fireBlade();
                    if (this.subTimer <= 0) { this.state = 'q_return'; }
                } else if (this.state === 'q_return') {
                    let dx = this.baseX - this.x, dy = this.baseY - this.y, d = Math.hypot(dx, dy);
                    if (d < 10) { this.x = this.baseX; this.y = this.baseY; this.state = 'idle'; this.actionTimer = 110; }
                    else { this.x += dx / d * 8; this.y += dy / d * 8; }
                }
                // ----- KỸ NĂNG 4: LUỒNG GIÓ LỚN — bắn ngang từ một bên, trúng thì hất văng vào vách -----
                else if (this.state === 'q_gale_warn') {
                    this.subTimer--;
                    this.y += ((this.baseY + 10) - this.y) * 0.08;
                    if (this.subTimer > 22) this.galeY = dino.y + dino.h/2;      // khoa do cao o 0.35s cuoi
                    if (this.subTimer <= 0) { this.state = 'q_gale_go'; this.galeX = this.galeDir < 0 ? canvas.width + 70 : -70; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'q_gale_go') {
                    this.galeX += this.galeDir * 17;
                    let band = { x: this.galeX - 60, y: this.galeY - 38, w: 120, h: 76 };
                    if (!this.galeHit && checkAABB(dino, band)) {
                        this.galeHit = true;
                        if (dino.isShielding()) { visualEffects.push(new Effect(parryX(), dino.y, 'parry')); this.galePush = 8; }   // do duoc: chi lui nhe
                        else { dino.takeDamage(2); this.galePush = 34; shakeTimer = 24; }                                                  // trung: 2 dmg + van vao vach
                    }
                    if (this.galePush > 0) {
                        this.galePush--;
                        dino.x += this.galeDir * (this.galeHit && this.galePush > 8 ? 13 : 3.2);
                        dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x));
                        if ((dino.x <= 0 || dino.x >= canvas.width - dino.w) && this.galePush > 8) {
                            this.galePush = 0; shakeTimer = 26;
                            visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + dino.h/2, 'explosion', true, 26));
                        }
                    }
                    if (this.galeX < -140 || this.galeX > canvas.width + 140) { this.galePush = 0; this.state = 'q_return'; }
                }
                // ----- KỸ NĂNG 5: VUỐT NGANG — báo tuyến rồi lướt ngang xé qua -----
                else if (this.state === 'q_talon_warn') {
                    this.subTimer--;
                    if (this.subTimer > 20) this.talonY = Math.max(150, Math.min(300 - this.h, dino.y + dino.h/2 - this.h/2));
                    this.y += (this.talonY - this.y) * 0.16;
                    this.x += (((this.talonDir > 0 ? -this.w - 30 : canvas.width + 30)) - this.x) * 0.12;
                    if (this.subTimer <= 0) { this.state = 'q_talon_go'; this.y = this.talonY; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'q_talon_go') {
                    this.x += this.talonDir * 21;
                    if (checkAABB(dino, { x: this.x + 14, y: this.y + 16, w: this.w - 28, h: this.h - 32 })) {
                        if (dino.isShielding()) { visualEffects.push(new Effect(parryX(), dino.y, 'parry')); }
                        else dino.takeDamage(1);
                    }
                    if (this.x < -this.w - 60 || this.x > canvas.width + 60) { this.state = 'q_return'; }
                }
                // ----- KỸ NĂNG 2: Bay lên -> Cảnh báo -> Bổ nhào -> Stun/Sóng -----
                else if (this.state === 'q_ascend') {
                    this.y -= 10;
                    if (this.y < -this.h - 130) {
                        this.state = 'q_dive_warn'; this.subTimer = 90;
                        this.warnX = dino.x + dino.w / 2;
                        dashVx = 0;
                    }
                } else if (this.state === 'q_dive_warn') {
                    this.subTimer--;
                    if (this.subTimer > 30) this.warnX = dino.x + dino.w / 2;
                    if (this.subTimer <= 0) {
                        this.state = 'q_dive';
                        this.x = this.warnX - this.w / 2;
                        if (this.x < 0) this.x = 0;
                        if (this.x > canvas.width - this.w) this.x = canvas.width - this.w;
                    }
                } else if (this.state === 'q_dive') {
                    this.y += 26;
                    if (this.y >= 320 - this.h) {
                        this.y = 320 - this.h; shakeTimer = 20;
                        visualEffects.push(new Effect(this.x + this.w/2, 310, 'explosion', true, 20));
                        let impact = { x: this.x + 15, y: 100, w: this.w - 30, h: 220 };
                        let hit = checkAABB(dino, impact);
                        if (hit) { if (dino.isShielding()) { visualEffects.push(new Effect(parryX(), dino.y, 'parry')); } else dino.takeDamage(1); this.state = 'q_return'; }
                        else { this.state = 'q_stun'; this.subTimer = 90; }
                    }
                } else if (this.state === 'q_stun') {
                    this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'q_shockwave'; this.subTimer = 20; }
                } else if (this.state === 'q_shockwave') {
                    if (this.subTimer === 20) {
                        for (let _s of [-1, 1]){
                            let _w = new BossProjectile(_s < 0 ? this.x - 20 : this.x + this.w + 20, 322 - GWAVE_H, _s * GWAVE_SPD, 0, true, 1);
                            _w.w = 44; _w.h = GWAVE_H; _w.color = "#FF7043"; _w.crescent = true; bossProjectiles.push(_w);
                        }
                    }
                    this.subTimer--;
                    if (this.subTimer <= 0) { this.state = 'q_return'; }
                }
                // ----- KỸ NĂNG 3: Loạt 3 lưỡi đao gió, cách nhau 1.25 giây, có cảnh báo -----
                else if (this.state === 'q_flurry') {
                    this.y = this.baseY + Math.floor(Math.sin(frames * 0.08) * 10);
                    this.subTimer++;
                    if (this.subTimer === 45 || this.subTimer === 120 || this.subTimer === 195) this.fireBlade();
                    if (this.subTimer >= 215) { this.state = 'idle'; this.actionTimer = 120; }
                }
            }
            draw() {
                let x = this.x, y = this.y; ctx.save();
                if (this.state === 'q_spin') {
                    ctx.translate(x + this.w/2, y + this.h/2); ctx.rotate(frames * 0.7); ctx.translate(-(x + this.w/2), -(y + this.h/2));
                }
                if (this.state === 'q_slash' && this.subTimer > 12) {
                    ctx.translate(x + this.w/2, y + this.h/2); ctx.rotate(-0.25); ctx.translate(-(x + this.w/2), -(y + this.h/2));
                }

                drawDesertPterosaur(this,true);
                ctx.restore();

                if (this.state === 'q_pause') {
                    ctx.strokeStyle = (frames % 8 < 4) ? "rgba(255, 60, 60, 0.9)" : "transparent";
                    ctx.lineWidth = 3; ctx.strokeRect(x + 20, y + 10, this.w - 40, this.h - 15);
                }
                if (this.state === 'q_flurry') {
                    let warning = this.subTimer < 45 || (this.subTimer > 75 && this.subTimer < 120) || (this.subTimer > 150 && this.subTimer < 195);
                    if (warning) {
                        ctx.strokeStyle = (frames % 10 < 5) ? "rgba(255, 0, 0, 0.55)" : "transparent"; ctx.lineWidth = 2;
                        ctx.beginPath(); ctx.moveTo(x + 10, y + this.h/2); ctx.lineTo(dino.x + dino.w/2, dino.y + dino.h/2); ctx.stroke();
                    }
                }
                if (this.state === 'q_gale_warn') {   // BAO TUYEN + mui ten huong gio
                    let a = (0.18 + 0.25 * Math.abs(Math.sin(frames * 0.35))).toFixed(2);
                    ctx.fillStyle = "rgba(255,214,0," + a + ")"; ctx.fillRect(0, this.galeY - 38, canvas.width, 76);
                    ctx.strokeStyle = "rgba(255,214,0,0.85)"; ctx.lineWidth = 2; ctx.strokeRect(1, this.galeY - 37, canvas.width - 2, 74);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 20px Consolas, monospace"; ctx.textAlign = "center";
                    for (let k = 0; k < 5; k++) ctx.fillText(this.galeDir < 0 ? "◀" : "▶", 120 + k * 190, this.galeY + 7);
                    ctx.textAlign = "left";
                }
                if (this.state === 'q_gale_go') {   // LUONG GIO LON
                    let gx = this.galeX, gy = this.galeY;
                    ctx.fillStyle = "rgba(207,240,255,0.5)"; ctx.beginPath(); ctx.ellipse(gx, gy, 62, 40, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "rgba(255,255,255,0.75)"; ctx.beginPath(); ctx.ellipse(gx, gy, 36, 24, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 3;
                    for (let k = 0; k < 5; k++) {
                        let tx = gx - this.galeDir * (30 + k * 34), ty = gy - 26 + ((k * 13 + frames * 3) % 52);
                        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx - this.galeDir * 26, ty + 5); ctx.stroke();
                    }
                }
                if (this.state === 'q_talon_warn') {
                    let a = (0.25 + 0.35 * Math.abs(Math.sin(frames * 0.4))).toFixed(2);
                    ctx.fillStyle = "rgba(255,64,64," + a + ")"; ctx.fillRect(0, this.talonY + 14, canvas.width, this.h - 28);
                    ctx.strokeStyle = "rgba(255,120,120,0.9)"; ctx.lineWidth = 2; ctx.strokeRect(1, this.talonY + 15, canvas.width - 2, this.h - 30);
                }
                if (this.state === 'q_dive_warn') {
                    let locked = this.subTimer <= 30;
                    let wx = this.warnX;
                    ctx.fillStyle = locked ? "rgba(255, 0, 0, 0.45)" : ((frames % 8 < 4) ? "rgba(255, 60, 0, 0.25)" : "rgba(255, 60, 0, 0.12)");
                    ctx.fillRect(wx - (this.w - 30)/2, 110, this.w - 30, 210);
                    ctx.fillStyle = "#FF1744"; ctx.font = "bold 30px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("!", wx, 150 + (frames % 20 < 10 ? 0 : 6));
                    ctx.textAlign = "left";
                }
                if (this.state === 'q_dive_warn' || this.state === 'q_dive') {
                    ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(canvas.width/2 - 190, 8, 380, 26);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("DI CHUYỂN: A / D — SHIFT ĐỂ LƯỚT!", canvas.width/2, 26);
                    ctx.textAlign = "left";
                }
                if (this.state === 'q_stun') {
                    ctx.fillStyle = "yellow"; ctx.font = "bold 24px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("STUNNED!", x + this.w/2 + Math.random()*4, y - 26 + Math.random()*4);
                    ctx.textAlign = "left";
                }

                if (this.y > -this.h) {
                    // ctx.fillStyle = "black"; ctx.fillRect(x+10, y - 16, this.w-20, 8);
                    // ctx.fillStyle = "#B388FF"; ctx.fillRect(x + 11, y - 15, (this.w - 22) * (this.hp / this.maxHp), 6);
                }
            }
        }
// BOSS_PART_END s0.QuetzalBoss.1

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
