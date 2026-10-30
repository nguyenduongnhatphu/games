// BOSS_FILE: EchoStalkerBoss
// BOSS_SNAPSHOT: 39483d797c15c5e35e37a5b630ae4f295f939302db706fe13262c4e699541a28
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dashVx, dino, floatingTexts, frames, keys, parry, shakeTimer, visualEffects
// Nguồn: index.html:39914 · Dùng bởi: EchoStalkerBoss
// BOSS_PART_BEGIN s1.EchoStalkerBoss.1 EDITABLE
class EchoStalkerBoss {
            constructor(level){
                this.name = "ECHO STALKER"; this.hp = 106; this.maxHp = 106;
                this.w = 108; this.h = 78; this.baseY = 320 - this.h;
                this.x = canvas.width - 260; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.facingLeft = true;
                this.lastSkill = ''; this.atkBag = []; this.invulnAll = false; this.burnTimer = 0; this.rage = false;
                this.retState = 'idle'; this.actionTimer = 46; this.lastMeleeHit = -1;
                this.earOpen = 0; this.pinT = 0; this.pinX = canvas.width/2;   // pinT>0 = dang ghim chinh xac nguoi choi
                this.ring = null; this.cone = null; this.lungeX = 0; this.bugs = []; this.chestGlow = 0;
            }
            physics(){ this.dy += 0.9; this.y += this.dy;
                if (this.y >= this.baseY){ this.y = this.baseY; this.dy = 0; this.grounded = true; } else this.grounded = false;
                this.x = Math.max(6, Math.min(canvas.width - this.w - 6, this.x)); }
            toIdle(t){ this.state = 'idle'; this.subTimer = 0; this.actionTimer = t; }
            // Diem boss TIN la nguoi choi: dang ghim thi la that, khong thi la diem on cuoi
            beliefX(){
                if (this.pinT > 0){ this.pinX = dino.x + dino.w/2; return this.pinX; }
                if (this.bugs.length && Math.random() < 0.02) return this.bugs[0].x;
                if (noisePow > 0) this.pinX = noiseX;      // nghe thay -> cap nhat NIEM TIN
                return this.pinX;                          // im lang -> giu niem tin CU
            }
            pickAttack(){
                if (!this.atkBag || !this.atkBag.length){
                    this.atkBag = ['ping','lunge','listen','scream','lunge'];
                    for (let i=this.atkBag.length-1;i>0;i--){ let j=Math.floor(Math.random()*(i+1)); let t=this.atkBag[i]; this.atkBag[i]=this.atkBag[j]; this.atkBag[j]=t; }
                }
                let c = this.atkBag.shift(); this.lastSkill = c; this.subTimer = 0;
                if (c === 'ping') this.state = 'ping_prep';
                else if (c === 'lunge') this.state = 'lunge_prep';
                else if (c === 'listen') this.state = 'listen_prep';
                else this.state = 'scream_prep';
            }
            update(){
                if (this.burnTimer > 0){ this.burnTimer--; if (this.burnTimer % 60 === 0) this.hp -= 1; }
                this.rage = this.hp <= this.maxHp * 0.4;
                const SL = ['entering','idle','ping_prep','ping_go','lunge_prep','lunge_go','lunge_stun','listen_prep','listen_go','scream_prep','scream_go','maul_prep','maul_go'];
                if (SL.indexOf(this.state) < 0){ this.ring = null; this.cone = null; this.invulnAll = false; this.toIdle(30); }
                this.subTimer++;
                if (this.pinT > 0) this.pinT--;
                if (this.earOpen > 0) this.earOpen--;
                // PHASE 2: con trung keu -> nguon tieng gia
                if (this.rage && this.bugs.length < 3 && frames % 150 === 0) this.bugs.push({ x: 80 + Math.random()*(canvas.width-160), y: 250 + Math.random()*50, t: 0 });
                for (let i=this.bugs.length-1;i>=0;i--){ let b=this.bugs[i]; b.t++; b.x += Math.sin(b.t*0.05)*1.2; if (b.t>520) this.bugs.splice(i,1); }
                // quay mat theo thu no TIN, khong phai theo nguoi choi
                let bx = this.beliefX(); if (bx > -900) this.facingLeft = bx < this.cx();

                if (this.state === 'entering'){ this.physics(); if (this.subTimer > 40) this.toIdle(44); return; }
                if (this.state === 'idle'){ this.physics();
                    if (bx > -900){ let d = bx - this.cx(); if (Math.abs(d) > 150) this.x += Math.sign(d) * 1.8; }
                    this.actionTimer--; if (this.actionTimer <= 0) this.pickAttack(); return; }
                // ===== ECHO PING: song lan; DANG DI CHUYEN luc song quet qua -> bi ghim 3s =====
                if (this.state === 'ping_prep'){ this.physics(); this.earOpen = 8;
                    if (this.subTimer > 34){ this.state = 'ping_go'; this.subTimer = 0; this.ring = { r: 0 }; if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'ping_go'){ this.physics(); this.ring.r += 15;
                    let pd = Math.abs((dino.x + dino.w/2) - this.cx());
                    let moving = (!dino.grounded) || Math.abs(dashVx) > 1 || (!dino.isCrouching && (keys['KeyA'] || keys['KeyD']));
                    if (!this.ring.done && Math.abs(this.ring.r - pd) < 22){ this.ring.done = true;
                        if (moving){ this.pinT = 180; this.atkBag.unshift('lunge'); floatingTexts.push(new FloatingText(dino.x, dino.y - 30, "BI GHIM!")); }
                        else floatingTexts.push(new FloatingText(dino.x, dino.y - 30, "IM LANG")); }
                    if (this.ring.r > canvas.width){ this.ring = null; this.toIdle(this.rage ? 14 : 22); }
                    return; }
                // ===== BLIND LUNGE: lao vao DIEM ON, trung than cay thi CHOANG =====
                if (this.state === 'lunge_prep'){ this.physics(); this.earOpen = 10;
                    this.lungeX = this.beliefX();
                    // NIEM TIN QUA GAN -> khong lao duoc, chuyen sang CAU XE tai cho (danh cho nguoi choi can chien)
                    if (Math.abs(this.lungeX - this.cx()) < 170){ this.state = 'maul_prep'; this.subTimer = 0; return; }
                    if (this.subTimer > (this.rage ? 26 : 38)){ this.state = 'lunge_go'; this.subTimer = 0; this.lungeHit = false;
                        this.lungeDir = this.lungeX < this.cx() ? -1 : 1; if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                // ===== CAU XE TAI CHO: 2 nhat ngoam, tam ngan — don doi pho ke ap sat =====
                if (this.state === 'maul_prep'){ this.physics(); this.earOpen = 12;
                    this.facingLeft = this.lungeX < this.cx();
                    if (this.subTimer > (this.rage ? 26 : 36)){ this.state = 'maul_go'; this.subTimer = 0; this.maulN = 0; this.maulHit = false;
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'maul_go'){ this.physics();
                    let per = this.rage ? 18 : 24;
                    if (this.subTimer % per === 6){ this.maulHit = false;
                        let dirM = this.facingLeft ? -1 : 1;
                        let mr = { x: dirM === 1 ? this.x + this.w - 10 : this.x - 118, y: this.y + 6, w: 128, h: this.h - 4 };
                        this.maulRect = mr; this.maulFx = 10;
                        if (checkAABB(dino, mr)) this.hurtP(1);
                        this.maulN++; }
                    if (this.maulFx > 0) this.maulFx--;
                    if (this.maulN >= (this.rage ? 3 : 2) && this.subTimer % per === 0) this.toIdle(this.rage ? 14 : 24);
                    return; }
                if (this.state === 'lunge_go'){ this.y = this.baseY; this.dy = 0;
                    this.x += this.lungeDir * (this.rage ? 21 : 17);
                    if (!this.lungeHit && checkAABB(dino, this)){ this.hurtP(1); this.lungeHit = true; }
                    let hitTree = this.subTimer > 14 && echoTrees.some(t => this.cx() > t.x - 20 && this.cx() < t.x + t.w + 20);
                    let overshot = (this.lungeDir > 0 && this.cx() > this.lungeX + 40) || (this.lungeDir < 0 && this.cx() < this.lungeX - 40);
                    if (hitTree && !this.lungeHit){ this.state = 'lunge_stun'; this.subTimer = 0; shakeTimer = 26;
                        visualEffects.push(new Effect(this.cx(), this.cy(), 'explosion', true, 34));
                        floatingTexts.push(new FloatingText(this.x, this.y - 24, "CHOANG!")); }
                    else if (overshot || this.x < 10 || this.x > canvas.width - this.w - 10) this.toIdle(this.rage ? 14 : 24);
                    return; }
                if (this.state === 'lunge_stun'){ this.physics(); if (this.subTimer > 108) this.toIdle(14); return; }
                // ===== SWEEP LISTEN: quat nghe quet ngang, nhuc nhich trong quat la bi ghim =====
                if (this.state === 'listen_prep'){ this.physics(); this.earOpen = 12;
                    if (this.subTimer > 30){ this.state = 'listen_go'; this.subTimer = 0;
                        this.cone = { a: (dino.x + dino.w/2) < this.cx() ? Math.PI : 0, dir: (dino.x + dino.w/2) < this.cx() ? -1 : 1 }; }
                    return; }
                if (this.state === 'listen_go'){ this.physics();
                    this.cone.a += 0.016 * this.cone.dir;
                    let ang = Math.atan2((dino.cy ? 0 : (dino.y + dino.h/2)) - this.cy(), (dino.x + dino.w/2) - this.cx());
                    let diff = Math.abs(Math.atan2(Math.sin(ang - this.cone.a), Math.cos(ang - this.cone.a)));
                    let moving = (!dino.grounded) || Math.abs(dashVx) > 1 || (!dino.isCrouching && (keys['KeyA'] || keys['KeyD']));
                    if (diff < 0.42 && moving && this.pinT <= 0){ this.pinT = 150; floatingTexts.push(new FloatingText(dino.x, dino.y - 30, "BI NGHE THAY!")); }
                    if (this.subTimer > 96){ this.cone = null; this.toIdle(this.rage ? 14 : 22); }
                    return; }
                // ===== RESONANCE SCREAM: cang gan cang dau; nup sau than cay thi chan duoc =====
                if (this.state === 'scream_prep'){ this.physics(); this.chestGlow = Math.min(1, this.subTimer / 76);
                    if (this.subTimer > 76){ this.state = 'scream_go'; this.subTimer = 0; this.screamHit = false; shakeTimer = 22; if (SFX.bossSkill) SFX.bossSkill(); }
                    return; }
                if (this.state === 'scream_go'){ this.physics(); this.chestGlow = Math.max(0, 1 - this.subTimer/22);
                    if (!this.screamHit && this.subTimer === 4){
                        this.screamHit = true;
                        let pcx = dino.x + dino.w/2, d = Math.abs(pcx - this.cx());
                        let blocked = echoTrees.some(t => (t.x + t.w/2 - this.cx()) * (pcx - this.cx()) > 0 && Math.abs(t.x + t.w/2 - this.cx()) < d);
                        if (!blocked && d < 460) this.hurtP(1);
                        else if (blocked) floatingTexts.push(new FloatingText(dino.x, dino.y - 30, "CHAN DUOC!"));
                    }
                    if (this.subTimer > 34) this.toIdle(this.rage ? 16 : 26);
                    return; }
            }
            draw(){
                let x = this.x, y = this.y, fl = this.facingLeft;
                // dau X: thu boss TIN la nguoi choi
                if (noisePow > 0){
                    let a = Math.max(0, 1 - noiseAge/34);
                    ctx.strokeStyle = "rgba(255,120,120," + (0.5*a) + ")"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(noiseX-11, noiseY-11); ctx.lineTo(noiseX+11, noiseY+11);
                    ctx.moveTo(noiseX+11, noiseY-11); ctx.lineTo(noiseX-11, noiseY+11); ctx.stroke();
                    ctx.strokeStyle = "rgba(255,180,120," + (0.35*a) + ")"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.arc(noiseX, noiseY, 14 + noisePow*5, 0, 6.28); ctx.stroke();
                }
                if (this.ring){ ctx.strokeStyle = "rgba(180,255,220,0.5)"; ctx.lineWidth = 5;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), this.ring.r, 0, 6.28); ctx.stroke(); }
                // BAO HIEU CU LAO: duong do chay tu boss toi diem no dinh lao vao
                if (this.state === 'lunge_prep'){
                    let p = Math.min(1, this.subTimer / (this.rage ? 26 : 38));
                    let x0 = this.cx(), x1 = this.lungeX;
                    ctx.fillStyle = "rgba(255,70,70," + (0.14 + 0.22*p) + ")";
                    ctx.fillRect(Math.min(x0,x1), this.y + 6, Math.abs(x1-x0), this.h - 8);
                    ctx.fillStyle = "rgba(255,220,110,0.95)";
                    ctx.fillRect(Math.min(x0,x1), this.y + this.h - 6, Math.abs(x1-x0) * p, 5);
                    ctx.strokeStyle = "rgba(255,150,150,0.8)"; ctx.lineWidth = 2;
                    ctx.strokeRect(Math.min(x0,x1), this.y + 6, Math.abs(x1-x0), this.h - 8);
                }
                // SONG AM cua tieng rong: truoc day gay dmg ma KHONG ve gi ca
                if (this.state === 'scream_go'){
                    let rr = this.subTimer * 26;
                    for (let k = 0; k < 3; k++){
                        let r2 = rr - k*30; if (r2 <= 0) continue;
                        let a2 = Math.max(0, 0.55 - this.subTimer/26 - k*0.12);
                        ctx.strokeStyle = "rgba(255,190,120," + a2 + ")"; ctx.lineWidth = 7 - k*2;
                        ctx.beginPath(); ctx.arc(this.cx(), this.cy(), r2, 0, 6.28); ctx.stroke();
                    }
                }
                if (this.state === 'scream_prep'){
                    ctx.strokeStyle = "rgba(255,170,90," + (0.3 + 0.5*this.chestGlow) + ")"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 200, 0, 6.28); ctx.stroke();
                    ctx.setLineDash([8, 10]);
                    ctx.strokeStyle = "rgba(255,140,80," + (0.2 + 0.35*this.chestGlow) + ")";
                    ctx.beginPath(); ctx.arc(this.cx(), this.cy(), 460, 0, 6.28); ctx.stroke();
                    ctx.setLineDash([]);
                }
                if (this.cone){ ctx.fillStyle = "rgba(255,235,150,0.10)";
                    ctx.beginPath(); ctx.moveTo(this.cx(), this.cy());
                    ctx.arc(this.cx(), this.cy(), 620, this.cone.a - 0.42, this.cone.a + 0.42); ctx.closePath(); ctx.fill(); }
                for (let b of this.bugs){ ctx.fillStyle = (b.t % 30 < 15) ? "#CDDC39" : "#7c8a25";
                    ctx.beginPath(); ctx.arc(b.x, b.y, 5, 0, 6.28); ctx.fill(); }
                // BAO HIEU CAU XE: vach do vung ngoam truoc mat
                if (this.state === 'maul_prep'){
                    let dirW = this.facingLeft ? -1 : 1;
                    let wx = dirW === 1 ? this.x + this.w - 10 : this.x - 118;
                    ctx.fillStyle = "rgba(255,80,80," + (0.16 + 0.20*Math.sin(frames*0.35)) + ")";
                    ctx.fillRect(wx, this.y + 6, 128, this.h - 4);
                    ctx.strokeStyle = "rgba(255,140,140,0.75)"; ctx.lineWidth = 2;
                    ctx.strokeRect(wx, this.y + 6, 128, this.h - 4);
                }
                if (this.maulFx > 0 && this.maulRect){
                    ctx.fillStyle = "rgba(255,255,255," + (this.maulFx/16) + ")";
                    ctx.fillRect(this.maulRect.x, this.maulRect.y, this.maulRect.w, this.maulRect.h);
                }
                ctx.save();
                if (this.state === 'lunge_stun') ctx.globalAlpha = 0.75 + Math.sin(frames*0.5)*0.2;
                // than
                ctx.fillStyle = "#c9c3b4"; ctx.fillRect(x + 12, y + 22, this.w - 24, this.h - 30);
                ctx.fillStyle = "#b3ac9c"; ctx.fillRect(x + 12, y + 22, this.w - 24, 8);
                // long nguc hom - khoang cong huong
                ctx.fillStyle = "#7d7566"; ctx.fillRect(x + (fl ? 20 : this.w - 50), y + 34, 30, 26);
                if (this.chestGlow > 0){ ctx.fillStyle = "rgba(255,220,120," + this.chestGlow + ")"; ctx.fillRect(x + (fl ? 22 : this.w - 48), y + 36, 26, 22); }
                for (let r = 0; r < 4; r++){ ctx.fillStyle = "#8f8878"; ctx.fillRect(x + (fl ? 22 : this.w - 48), y + 37 + r*6, 26, 2); }
                // dau, KHONG CO MAT
                let hx = fl ? x - 6 : x + this.w - 40;
                ctx.fillStyle = "#d4cec0"; ctx.fillRect(hx, y - 4, 46, 30);
                ctx.fillStyle = "#c2bbac"; ctx.fillRect(hx + (fl ? -12 : 40), y + 8, 18, 12);   // mom dai
                // rau cam giac
                ctx.strokeStyle = "#9a9384"; ctx.lineWidth = 2;
                for (let k = -1; k <= 1; k++){ ctx.beginPath(); ctx.moveTo(hx + (fl ? -6 : 46), y + 12 + k*4);
                    ctx.lineTo(hx + (fl ? -26 : 66), y + 10 + k*8 + Math.sin(frames*0.2 + k)*3); ctx.stroke(); }
                // TAI QUAT: bung xoe khi dang do
                let eo = this.earOpen > 0 ? 1 : 0.28;
                ctx.fillStyle = "#e6dfd0";
                for (let s = -1; s <= 1; s += 2){
                    ctx.beginPath(); ctx.moveTo(hx + 22, y + 4);
                    ctx.lineTo(hx + 22 + (fl ? -1 : 1) * 8, y + 4 + s * (10 + 26*eo));
                    ctx.lineTo(hx + 40, y + 6 + s * (4 + 12*eo)); ctx.closePath(); ctx.fill();
                }
                ctx.strokeStyle = "#a49c8c"; ctx.lineWidth = 1;
                // chan
                ctx.fillStyle = "#bdb6a6"; ctx.fillRect(x + 22, y + this.h - 12, 16, 12); ctx.fillRect(x + this.w - 40, y + this.h - 12, 16, 12);
                // duoi
                ctx.fillStyle = "#c9c3b4"; ctx.fillRect(fl ? x + this.w - 8 : x - 30, y + 30, 38, 12);
                ctx.restore();
                if (this.pinT > 0){ ctx.strokeStyle = "rgba(255,80,80,0.8)"; ctx.lineWidth = 2;
                    ctx.strokeRect(dino.x - 5, dino.y - 5, dino.w + 10, dino.h + 10); }
                // ctx.fillStyle = "black"; ctx.fillRect(x, y - 18, this.w, 8);
                // ctx.fillStyle = "#B0BEC5"; ctx.fillRect(x + 1, y - 17, (this.w - 2) * (this.hp / this.maxHp), 6);
            }
        }
// BOSS_PART_END s1.EchoStalkerBoss.1

// Nguồn: index.html:44395 · Dùng bởi: EchoStalkerBoss
// BOSS_PART_BEGIN s1.noiseX.1 EDITABLE
let noiseX = -999, noiseY = 260, noiseAge = 999, noisePow = 0;
// BOSS_PART_END s1.noiseX.1

// Nguồn: index.html:44412 · Dùng bởi: EchoStalkerBoss
// BOSS_PART_BEGIN s1.echoTrees.1 READ_ONLY
let echoTrees = [];
// BOSS_PART_END s1.echoTrees.1

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
