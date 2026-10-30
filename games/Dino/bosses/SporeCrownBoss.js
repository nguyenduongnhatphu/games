// BOSS_FILE: SporeCrownBoss
// BOSS_SNAPSHOT: 39483d797c15c5e35e37a5b630ae4f295f939302db706fe13262c4e699541a28
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, parryX, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:40139 · Dùng bởi: SporeCrownBoss
// BOSS_PART_BEGIN s1.SporeCrownBoss.1 EDITABLE
class SporeCrownBoss {
            constructor(level){
                this.name = "SPORE CROWN"; this.hp = 110; this.maxHp = 110;
                this.w = 118; this.h = 84; this.baseY = 320 - this.h;
                this.x = canvas.width - 280; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.facingLeft = true;
                this.lastSkill = ''; this.atkBag = []; this.invulnAll = false; this.burnTimer = 0; this.rage = false;
                this.retState = 'idle'; this.actionTimer = 50; this.lastMeleeHit = -1;
                this.clouds = []; this.roots = []; this.towers = []; this.slamY = 0;
                this.cells = []; this.patches = [];   // te bao an mon dang bay / vung an mon tren san
            }
            physics(){ this.dy += 0.9; this.y += this.dy;
                if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x)); }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = t; }
            pickAttack(){
                if (!this.atkBag || !this.atkBag.length){
                    this.atkBag = ['puff','root','slam','rot','puff','rot'];
                    for (let i=this.atkBag.length-1;i>0;i--){ let j=Math.floor(Math.random()*(i+1)); let t=this.atkBag[i]; this.atkBag[i]=this.atkBag[j]; this.atkBag[j]=t; }
                }
                let c = this.atkBag.shift(); this.lastSkill = c; this.subTimer = 0;
                if (c === 'puff') this.state = 'puff_prep';
                else if (c === 'root') this.state = 'root_warn';
                else if (c === 'slam') this.state = 'slam_prep';
                else this.state = 'rot_warn';
            }
            update(){
                if (this.burnTimer > 0){ this.burnTimer--; if (this.burnTimer % 60 === 0) this.hp -= 1; }
                this.rage = this.hp <= this.maxHp * 0.4;
                const SL = ['entering','idle','puff_prep','puff_go','root_warn','root_go','slam_prep','slam_go','rot_warn','rot_go'];
                if (SL.indexOf(this.state) < 0){ this.invulnAll = false; this.toIdle(34); }
                this.subTimer++;
                // may bao tu troi: dung trong do thi cong tang
                for (let i=this.clouds.length-1;i>=0;i--){ let c=this.clouds[i]; c.t++; c.x += c.vx;
                    if (c.t % 42 === 0 && checkAABB(dino, {x:c.x-c.r, y:c.y-c.r, w:c.r*2, h:c.r*2})) addSporeStack(1);
                    if (c.t > 320 || c.x < -80 || c.x > canvas.width + 80) this.clouds.splice(i,1); }
                // PHASE 2: thap nam tu phun
                if (this.rage && this.towers.length < 3 && frames % 240 === 0)
                    this.towers.push({ x: 120 + Math.random()*(canvas.width-240), hp: 6, t: 0 });
                for (let i=this.towers.length-1;i>=0;i--){ let tw=this.towers[i]; tw.t++;
                    projectiles.forEach(p => { if (Math.abs((p.x+p.w/2) - tw.x) < 22 && p.y > 250) { tw.hp -= p.dmg || 1; p.hitIds.add(tw); } });
                    if (tw.t % 130 === 0) this.clouds.push({ x: tw.x, y: 292, r: 40, vx: (Math.random()<0.5?-0.5:0.5), t: 0 });
                    if (tw.hp <= 0){ visualEffects.push(new Effect(tw.x, 296, 'explosion', true, 24)); this.towers.splice(i,1); } }
                // te bao an mon dang bay
                for (let i=this.cells.length-1;i>=0;i--){ let c=this.cells[i]; c.t++;
                    c.vy += 0.42; c.x += c.vx; c.y += c.vy;
                    if (!c.hit && checkAABB(dino, {x:c.x-15, y:c.y-15, w:30, h:30})){
                        this.hurtP(1); addSporeStack(1); this.cells.splice(i,1); continue; }
                    if (c.y >= 306 || c.x < -30 || c.x > canvas.width + 30){
                        this.patches.push({ x: Math.max(30, Math.min(canvas.width-30, c.x)), r: 56, t: 0, life: 400 });
                        visualEffects.push(new Effect(c.x, 310, 'explosion', true, 22));
                        this.cells.splice(i,1); } }
                // vung an mon con lai tren san
                for (let i=this.patches.length-1;i>=0;i--){ let p=this.patches[i]; p.t++;
                    if (Math.abs((dino.x+dino.w/2) - p.x) < p.r && (dino.y+dino.h) > 300){
                        if (p.t % 42 === 0) this.hurtP(1);
                        if (p.t % 96 === 0) addSporeStack(1); }
                    if (p.t >= p.life) this.patches.splice(i,1); }
                // re nam
                for (let i=this.roots.length-1;i>=0;i--){ let r=this.roots[i]; r.t++;
                    if (r.t > 40 && r.t < 58 && !r.hit && Math.abs((dino.x+dino.w/2) - r.x) < 20 && (dino.y+dino.h) > 268){ this.hurtP(1); addSporeStack(1); r.hit = true; }
                    if (r.t > 74) this.roots.splice(i,1); }

                if (this.state === 'entering'){ this.physics(); this.faceP(); if (this.subTimer > 46) this.toIdle(46); return; }
                if (this.state === 'idle'){ this.physics(); this.faceP();
                    let d = (dino.x + dino.w/2) - this.cx();
                    if (Math.abs(d) > 300) this.x += Math.sign(d) * 1.4;      // di RAT cham, khong doa truc tiep
                    this.actionTimer--; if (this.actionTimer <= 0) this.pickAttack(); return; }
                // ===== SPORE PUFF: gianh dat, khong gay dmg =====
                if (this.state === 'puff_prep'){ this.physics(); this.faceP();
                    if (this.subTimer > 40){ this.state = 'puff_go'; this.subTimer = 0;
                        let n = this.rage ? 3 : 2;
                        for (let k=0;k<n;k++) this.clouds.push({ x: this.cx() + (k-1)*130, y: 280, r: 46, vx: (dino.x < this.cx() ? -0.6 : 0.6), t: 0 });
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'puff_go'){ this.physics(); if (this.subTimer > 18) this.toIdle(this.rage ? 16 : 26); return; }
                // ===== ROOT SURGE: vach bao duoi san roi bat gai =====
                if (this.state === 'root_warn'){ this.physics(); this.faceP();
                    if (this.subTimer > 34){ this.state = 'root_go'; this.subTimer = 0;
                        let base = dino.x + dino.w/2;
                        for (let k=-2;k<=2;k++) this.roots.push({ x: base + k*82, t: 0, hit: false });
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'root_go'){ this.physics(); if (this.subTimer > 62) this.toIdle(this.rage ? 14 : 24); return; }
                // ===== CAP SLAM: don nhanh duy nhat; trung thi dau nhung CAO MAT 1 TANG =====
                if (this.state === 'slam_prep'){ this.physics(); this.faceP();
                    if (this.subTimer > (this.rage ? 24 : 34)){ this.state = 'slam_go'; this.subTimer = 0; this.slamHit = false; shakeTimer = 10; }
                    return; }
                if (this.state === 'slam_go'){ this.physics();
                    if (this.subTimer === 6){ shakeTimer = 24; this.slamFx = 14;
                        visualEffects.push(new Effect(this.cx(), 310, 'explosion', true, 46));
                        if (Math.abs((dino.x+dino.w/2) - this.cx()) < 168 && (dino.y+dino.h) > 262){
                            this.hurtP(1);
                            if (sporeStacks > 0) clearSporeStack(1);      // DANH DOI: chiu dau de cao bot nam
                        } }
                    if (this.subTimer > 30) this.toIdle(this.rage ? 14 : 24);
                    return; }
                // ===== TE BAO AN MON: nem cum te bao nam, trung nguoi thi dau, roi dat thi de lai VUNG AN MON =====
                if (this.state === 'rot_warn'){ this.physics(); this.faceP();
                    if (this.subTimer === 1) floatingTexts.push(new FloatingText(this.x, this.y - 34, "TE BAO AN MON!"));
                    if (this.subTimer > 46){ this.state = 'rot_go'; this.subTimer = 0;
                        let n = this.rage ? 4 : 3;
                        for (let k = 0; k < n; k++){
                            let tx = dino.x + dino.w/2 + (k - (n-1)/2) * 118;
                            tx = Math.max(40, Math.min(canvas.width - 40, tx));
                            this.cells.push({ x: this.cx(), y: this.y + 18, vx: (tx - this.cx()) / 46, vy: -8.6, t: 0, hit: false });
                        }
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'rot_go'){ this.physics(); if (this.subTimer > 26) this.toIdle(this.rage ? 16 : 26); return; }
            }
            draw(){
                let x = this.x, y = this.y;
                // SONG CHAN luc CAP SLAM cham dat: ve dung dai da bao truoc
                if (this.slamFx > 0){
                    this.slamFx--;
                    let a3 = this.slamFx / 14;
                    ctx.fillStyle = "rgba(255,255,255," + (a3*0.55) + ")"; ctx.fillRect(this.cx() - 168, 262, 336, 58);
                    ctx.strokeStyle = "rgba(255,210,120," + a3 + ")"; ctx.lineWidth = 4;
                    ctx.strokeRect(this.cx() - 168, 262, 336, 58);
                }
                // ===== BAO HIEU CAP SLAM: dai do phu dung tam sat thuong 168px =====
                if (this.state === 'slam_prep'){
                    let p = Math.min(1, this.subTimer / (this.rage ? 24 : 34));
                    ctx.fillStyle = "rgba(255,70,70," + (0.10 + 0.22 * p) + ")";
                    ctx.fillRect(this.cx() - 168, 262, 336, 58);
                    ctx.strokeStyle = "rgba(255,140,140," + (0.5 + 0.5*Math.sin(frames*0.4)) + ")"; ctx.lineWidth = 3;
                    ctx.strokeRect(this.cx() - 168, 262, 336, 58);
                    // vach dem lui
                    ctx.fillStyle = "rgba(255,235,120,0.9)"; ctx.fillRect(this.cx() - 168, 262, 336 * p, 5);
                }
                for (let r of this.roots){
                    if (r.t <= 40){ let a = 0.22 + 0.30*Math.sin(r.t*0.35), p2 = r.t/40;
                        ctx.fillStyle = "rgba(180,220,120," + (a*0.5) + ")"; ctx.fillRect(r.x - 20, 320 - 62*p2, 40, 62*p2);
                        ctx.fillStyle = "rgba(210,255,150," + a + ")"; ctx.fillRect(r.x - 22, 314, 44, 8);
                        ctx.strokeStyle = "rgba(230,255,180," + a + ")"; ctx.lineWidth = 2;
                        ctx.beginPath(); ctx.moveTo(r.x, 320); ctx.lineTo(r.x, 320 - 62*p2); ctx.stroke(); }
                    else if (r.t < 62){ let hgt = Math.min(58, (r.t-40)*8);
                        ctx.fillStyle = "#8BC34A"; ctx.fillRect(r.x - 20, 320 - hgt, 40, hgt);            // BE RONG khop hitbox (+-20)
                        ctx.fillStyle = "#AED581"; ctx.fillRect(r.x - 20, 320 - hgt, 40, 4);
                        ctx.fillStyle = "#C5E1A5"; ctx.beginPath(); ctx.moveTo(r.x-22, 320-hgt); ctx.lineTo(r.x, 320-hgt-20); ctx.lineTo(r.x+22, 320-hgt); ctx.fill(); }
                }
                for (let c of this.clouds){
                    let a = Math.max(0, 0.42 - c.t/900);
                    ctx.fillStyle = "rgba(154,205,90," + a + ")";
                    ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "rgba(210,240,170," + (a*0.6) + ")";
                    for (let k=0;k<4;k++){ let aa = frames*0.02 + k*1.57; ctx.beginPath(); ctx.arc(c.x + Math.cos(aa)*c.r*0.5, c.y + Math.sin(aa)*c.r*0.4, 5, 0, 6.28); ctx.fill(); }
                }
                // VUNG AN MON tren san
                for (let p of this.patches){
                    let fade = p.t > p.life - 60 ? (p.life - p.t)/60 : 1;
                    let pulse = 0.30 + 0.12*Math.sin(frames*0.12 + p.x);
                    ctx.fillStyle = "rgba(126,58,160," + (pulse*fade) + ")";
                    ctx.beginPath(); ctx.ellipse(p.x, 316, p.r, 13, 0, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "rgba(206,147,216," + (0.75*fade) + ")"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.ellipse(p.x, 316, p.r, 13, 0, 0, 6.28); ctx.stroke();
                    for (let k=0;k<5;k++){ let bx = p.x - p.r + ((k*47 + p.t*1.4) % (p.r*2));
                        let by = 316 - Math.abs(Math.sin(p.t*0.06 + k))*13;
                        ctx.fillStyle = "rgba(225,190,240," + (0.6*fade) + ")";
                        ctx.beginPath(); ctx.arc(bx, by, 3, 0, 6.28); ctx.fill(); }
                }
                // TE BAO dang bay
                for (let c of this.cells){
                    ctx.fillStyle = "#7E3AA0"; ctx.beginPath(); ctx.arc(c.x, c.y, 14, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#CE93D8"; ctx.beginPath(); ctx.arc(c.x - 3, c.y - 3, 6, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "rgba(230,200,245,0.8)"; ctx.lineWidth = 2;
                    for (let k=0;k<4;k++){ let a=frames*0.14+k*1.57; ctx.beginPath();
                        ctx.moveTo(c.x+Math.cos(a)*10, c.y+Math.sin(a)*10);
                        ctx.lineTo(c.x+Math.cos(a)*17, c.y+Math.sin(a)*17); ctx.stroke(); }
                }
                for (let tw of this.towers){
                    ctx.fillStyle = "#6D4C41"; ctx.fillRect(tw.x - 7, 268, 14, 52);
                    ctx.fillStyle = "#9CCC65"; ctx.beginPath(); ctx.ellipse(tw.x, 266, 26, 13, 0, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#33691E"; ctx.beginPath(); ctx.ellipse(tw.x, 271, 22, 6, 0, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "black"; ctx.fillRect(tw.x - 16, 250, 32, 5);
                    ctx.fillStyle = "#AED581"; ctx.fillRect(tw.x - 15, 251, 30 * (tw.hp/6), 3);
                }
                let sq = this.state === 'slam_go' && this.subTimer < 10 ? 10 : 0;
                // than teo top ben duoi
                ctx.fillStyle = "#5d4a3a"; ctx.fillRect(x + 24, y + 44 + sq, this.w - 48, this.h - 52);
                ctx.fillStyle = "#4a3a2c"; ctx.fillRect(x + 24, y + 44 + sq, this.w - 48, 6);
                for (let k=0;k<4;k++){ ctx.fillStyle = "#6b5643"; ctx.fillRect(x + 26 + k*22, y + this.h - 14, 13, 14); }
                // dau nho tho ra
                let hx = this.facingLeft ? x + 6 : x + this.w - 34;
                ctx.fillStyle = "#6b5643"; ctx.fillRect(hx, y + 46 + sq, 28, 20);
                // VUONG MIEN NAM: nhieu tang tan chong len
                let cxp = x + this.w/2, top = y + 34 + sq;
                for (let t = 0; t < 3; t++){
                    let rw = 62 - t*14, ry = top - t*15;
                    ctx.fillStyle = t === 0 ? "#7d5b3f" : t === 1 ? "#8a6446" : "#9a7150";
                    ctx.beginPath(); ctx.ellipse(cxp, ry, rw, 15 - t*2, 0, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "rgba(140,200,110,0.55)";
                    ctx.beginPath(); ctx.ellipse(cxp, ry + 5, rw*0.85, 5, 0, 0, 6.28); ctx.fill();
                }
                // cuong nam cao vong len
                for (let k = -2; k <= 2; k++){
                    let sxp = cxp + k*17, sh = 26 + Math.abs(2-Math.abs(k))*10;
                    ctx.fillStyle = "#c8b89a"; ctx.fillRect(sxp - 3, top - 30 - sh, 6, sh);
                    ctx.fillStyle = "#AED581"; ctx.beginPath(); ctx.ellipse(sxp, top - 30 - sh, 10, 6, 0, 0, 6.28); ctx.fill();
                }
                if (this.state === 'rot_warn'){
                    ctx.strokeStyle = "rgba(190,110,220," + (0.4 + 0.4*Math.sin(frames*0.35)) + ")"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.arc(cxp, this.cy(), 62 + Math.sin(frames*0.2)*8, 0, 6.28); ctx.stroke();
                }
                // ctx.fillStyle = "black"; ctx.fillRect(x, y - 8, this.w, 8);
                // ctx.fillStyle = "#8BC34A"; ctx.fillRect(x + 1, y - 7, (this.w - 2) * (this.hp / this.maxHp), 6);
            }
        }
// BOSS_PART_END s1.SporeCrownBoss.1

// Nguồn: index.html:44432 · Dùng bởi: SporeCrownBoss
// BOSS_PART_BEGIN s1.sporeStacks.1 READ_ONLY
let sporeStacks = 0, sporePools = [], sporeFlash = 0;
// BOSS_PART_END s1.sporeStacks.1

// Nguồn: index.html:44433 · Dùng bởi: SporeCrownBoss
// BOSS_PART_BEGIN s1.addSporeStack.1 EDITABLE
function addSporeStack(n){
            if (sporeStacks >= 5) return;
            sporeStacks = Math.min(5, sporeStacks + n); sporeFlash = 12;
            floatingTexts.push(new FloatingText(dino.x, dino.y - 40, "BAO TU " + sporeStacks + "/5"));
            if (sporeStacks >= 5){
                sporeStacks = 0;
                if (!dino.isShielding()) dino.takeDamage(2); else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + dino.h/2, 'explosion', true, 30));
                floatingTexts.push(new FloatingText(dino.x, dino.y - 30, "NAM NO!"));
            }
        }
// BOSS_PART_END s1.addSporeStack.1

// Nguồn: index.html:44444 · Dùng bởi: SporeCrownBoss
// BOSS_PART_BEGIN s1.clearSporeStack.1 EDITABLE
function clearSporeStack(n){
            if (sporeStacks <= 0) return;
            sporeStacks = Math.max(0, sporeStacks - n);
            floatingTexts.push(new FloatingText(dino.x, dino.y - 40, "GO BAO TU (" + sporeStacks + ")"));
            visualEffects.push(new Effect(dino.x + dino.w/2, dino.y + dino.h/2, 'parry'));
        }
// BOSS_PART_END s1.clearSporeStack.1

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
