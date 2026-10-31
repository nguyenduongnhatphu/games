// BOSS_FILE: PillarLordBoss
// BOSS_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, pickFromBag, platforms, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:27543 · Dùng bởi: PillarLordBoss
// BOSS_PART_BEGIN s0.PillarLordBoss.1 EDITABLE
class PillarLordBoss {
            constructor(level) {
                this.hp = 100; this.maxHp = 100;
                this.w = 92; this.h = 78;
                this.x = canvas.width - 240; this.y = 165 - 78;
                this.state = 'entering'; this.retState = 'idle'; this.name = "THACH TRU REX";
                this.magmaX = []; this.slamPf = null; this.sunk = [];
                this.actionTimer = 80; this.subTimer = 0; this.facingLeft = true; this.lastSkill = '';
                this.shiftCd = 400; this.shiftIdx = []; this.shiftFrom = []; this.shiftTo = [];
                this.charges = []; this.flames = []; this.aim = null; this.hopTo = null;
                this.burnTimer = 0; this.lastMeleeHit = -1; this.rumble = 0; this.vy = 0;
            }
            pillars() { return platforms.filter(p => p.pillar); }
            onPillar(pf) { return dino.grounded && Math.abs((dino.y + dino.h) - pf.top) < 8 && dino.x + dino.w > pf.x && dino.x < pf.x + pf.w; }
            setTop(pf, nt) { let d = nt - pf.top; if (this.onPillar(pf)) dino.y += d; pf.top = nt; pf.h = 400 - nt; }
            update() {
                const BANDS = [300, 235, 165];
                let P = this.pillars();
                if (this.state === 'entering') { this.x -= 6; if (this.x <= canvas.width - 260) { this.state = 'intro'; this.subTimer = 0; } return; }
                if (this.state === 'intro') { this.subTimer++; if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x, this.y - 40, "THACH TRU REX!")); if (SFX.bossEntry) SFX.bossEntry(); } if (this.subTimer > 44) { this.state = 'idle'; this.actionTimer = 55; } return; }
                this.facingLeft = (dino.x + dino.w/2) < (this.x + this.w/2);
                if (this.rumble > 0) this.rumble--;
                // ---- tru da chim dung nham: 6 giay sau troi len lai (o bac thap nhat) ----
                for (let i = this.sunk.length - 1; i >= 0; i--) {
                    let sk = this.sunk[i]; sk.t--;
                    if (sk.t <= 0) {
                        platforms.push({ x: sk.x, w: sk.w, top: 300, h: 100, volcano: true, pillar: true, crack: 0 });
                        visualEffects.push(new Effect(sk.x + sk.w/2, 300, 'explosion', true, 30));
                        this.sunk.splice(i, 1);
                    }
                }

                // ---- COT DANG NAP: ban 3 phat vao CHAN de huy ----
                for (let i = this.charges.length - 1; i >= 0; i--) {
                    let c = this.charges[i], pf = c.pf;
                    if (!pf || platforms.indexOf(pf) < 0) { this.charges.splice(i, 1); continue; }
                    let baseR = { x: pf.x, y: pf.top + 24, w: pf.w, h: 64 };
                    for (let p = projectiles.length - 1; p >= 0; p--) {
                        let pr = projectiles[p];
                        if (pr._trBase) continue;
                        if (checkAABB(pr, baseR)) {
                            pr._trBase = true; c.hits++;
                            visualEffects.push(new Effect(pr.x, pr.y, 'explosion', true, 16));
                            floatingTexts.push(new FloatingText(pf.x + 10, pf.top + 30, "CHAN COT " + c.hits + "/3"));
                            if (c.hits >= 3) {
                                let b = BANDS.indexOf(pf.top);
                                if (b > 0) this.setTop(pf, BANDS[b - 1]);
                                visualEffects.push(new Effect(pf.x + pf.w/2, pf.top, 'explosion', true, 32));
                                floatingTexts.push(new FloatingText(pf.x, pf.top - 24, "HUY DON!"));
                                shakeTimer = 18; this.charges.splice(i, 1);
                            }
                            break;
                        }
                    }
                    if (this.charges.indexOf(c) < 0) continue;
                    c.t--;
                    if (c.t <= 0) {
                        // phat dong: cot CAO -> lua NGANG, cot THAP -> lua DOC
                        let high = pf.top <= 200;
                        this.flames.push({ pf: pf, horiz: high, t: high ? 84 : 96 });
                        if (SFX.bossSkill) SFX.bossSkill(); shakeTimer = 16;
                        this.charges.splice(i, 1);
                    }
                }
                // ---- lua dang phun ----
                for (let i = this.flames.length - 1; i >= 0; i--) {
                    let f = this.flames[i]; f.t--;
                    if (f.t <= 0 || platforms.indexOf(f.pf) < 0) { this.flames.splice(i, 1); continue; }
                    let pf = f.pf;
                    if (f.horiz) {
                        let hb = { x: 0, y: pf.top - 40, w: canvas.width, h: 34 };
                        if (checkAABB(dino, hb)) { if (!dino.isShielding()) { if (frames % 18 === 0) dino.takeDamage(1); } else parry(); }
                    } else {
                        let hb = { x: pf.x + 10, y: pf.top - 210, w: pf.w - 20, h: 214 };
                        if (checkAABB(dino, hb)) { if (!dino.isShielding()) { if (frames % 18 === 0) dino.takeDamage(1); } else parry(); }
                    }
                }

                // ---- lich doi dia hinh ----
                if (this.state === 'idle' || this.state === 'open') {
                    this.shiftCd--;
                    if (this.shiftCd <= 0 && P.length >= 3) {
                        let cand = P.map((p, i) => i).filter(i => BANDS.indexOf(P[i].top) >= 0);
                        cand.sort(() => Math.random() - 0.5);
                        this.shiftIdx = cand.slice(0, 2); this.shiftFrom = []; this.shiftTo = [];
                        for (let i of this.shiftIdx) {
                            let pf = P[i], b = BANDS.indexOf(pf.top);
                            let dir = (b === 0) ? 1 : (b === 2) ? -1 : (Math.random() < 0.5 ? 1 : -1);
                            if (this.onPillar(pf)) dir = 1;
                            this.shiftFrom.push(pf.top); this.shiftTo.push(BANDS[Math.max(0, Math.min(2, b + dir))]);
                        }
                        this.state = 'shift_prep'; this.subTimer = 80;
                    }
                }
                if (this.state === 'idle') {
                    this.y += ((165 - 78) - this.y) * 0.06;
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let pool = ['ignite', 'hop', 'ignite2', 'magma', 'slam'];
                        // KHONG chong chieu: dang co lua/nap thi bo qua mua dung nham (tranh vung khong the ne)
                        if (this.flames.length || this.charges.length) pool = pool.filter(s => s !== 'magma');
                        let c = pickFromBag(this, pool);
                        if (c === 'magma') {                   // MUA DUNG NHAM: danh dau toi da 2 tru, LUON chua >=2 tru sach
                            let busy = new Set();
                            for (let fl of this.flames) busy.add(fl.pf);
                            for (let ch of this.charges) busy.add(ch.pf);
                            let free = P.filter(p => !busy.has(p));
                            let nMark = Math.min(2, free.length - 2);
                            if (nMark < 1) { this.state = 'idle'; this.actionTimer = 26; }
                            else {
                                let mi = free.map((p, i) => i).sort(() => Math.random() - 0.5).slice(0, nMark);
                                this.magmaX = mi.map(i => free[i].x + free[i].w/2);
                                this.state = 'magma_prep'; this.subTimer = 56;
                            }
                        }
                        else if (c === 'slam') {               // DAP TRU: ran 2s (1.25s dau bam theo nguoi choi) -> len cao -> giang xuong
                            this.state = 'slam_charge'; this.subTimer = 120;
                            this.slamTo = dino.x + dino.w/2 - this.w/2;
                        }
                        else if (c === 'hop') {                     // NHAY CHEO CO TARGET: nhanh, hitbox nho
                            this.state = 'hop_prep'; this.subTimer = 30;
                            this.hopTo = Math.max(20, Math.min(canvas.width - this.w - 20, dino.x + dino.w/2 - this.w/2));
                        } else {                                // NAP LUA CHO 1-2 COT (bao 45f bang chan sang)
                            this.state = 'ignite'; this.subTimer = 16;
                            let n = c === 'ignite2' ? 2 : 1;
                            let idx = P.map((p, i) => i).sort(() => Math.random() - 0.5).slice(0, n);
                            for (let i of idx) if (P[i]) this.charges.push({ pf: P[i], t: 45, hits: 0 });
                        }
                    }
                }
                else if (this.state === 'ignite') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 62; } }
                // === MUA DUNG NHAM: bao 3 cot roi giang thien thach ===
                else if (this.state === 'magma_prep') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'magma_fire'; this.subTimer = 34; shakeTimer = 20; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'magma_fire') {
                    this.subTimer--;
                    if (this.subTimer === 20) {
                        for (let mx of this.magmaX) {
                            visualEffects.push(new Effect(mx, 300, 'explosion', true, 34));
                            if (Math.abs((dino.x + dino.w/2) - mx) < 48 && dino.grounded) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                        }
                    }
                    if (this.subTimer <= 0) { this.magmaX = []; this.state = 'idle'; this.actionTimer = 60; }
                }
                // === DAP TRU: RAN 2 giay (1.25s dau bam theo nguoi choi) -> len cao -> giang xuong ===
                else if (this.state === 'slam_charge') {
                    this.subTimer--; this.rumble = 3;
                    if (this.subTimer > 45) this.slamTo = dino.x + dino.w/2 - this.w/2;   // 1.25s dau: BAM THEO nguoi choi
                    this.x += (Math.max(10, Math.min(canvas.width - this.w - 10, this.slamTo)) - this.x) * 0.10;
                    if (this.subTimer <= 0) { this.state = 'slam_rise'; this.subTimer = 34; shakeTimer = 16; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'slam_rise') {
                    this.subTimer--; this.y -= 9;
                    this.x += (Math.max(10, Math.min(canvas.width - this.w - 10, this.slamTo)) - this.x) * 0.10;
                    if (this.subTimer <= 0) { this.state = 'slam_fall'; this.vy = 0; }
                }
                else if (this.state === 'slam_fall') {
                    this.vy += 1.7; this.y += this.vy;
                    let land = 400;
                    for (let pf of P) if (this.x + this.w > pf.x && this.x < pf.x + pf.w && pf.top - this.h < land && this.y + this.h <= pf.top + 24) land = pf.top - this.h;
                    if (this.vy > 0 && this.y >= land) {
                        this.y = land; this.vy = 0; shakeTimer = 34;
                        visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h, 'explosion', true, 46));
                        if (checkAABB(dino, { x: this.x - 34, y: this.y, w: this.w + 68, h: this.h + 24 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                        // CHI DUNG 1 TRU (tru ngay duoi cho no giang xuong) bi sap
                        let alive = P.filter(p => platforms.indexOf(p) >= 0);
                        let bcx = this.x + this.w/2, hit = null, bd = 1e9;
                        for (let pf of alive) { let d = Math.abs((pf.x + pf.w/2) - bcx); if (d < bd) { bd = d; hit = pf; } }
                        if (hit && bd < hit.w) {
                            let b = BANDS.indexOf(hit.top);
                            if (b > 0) { this.setTop(hit, BANDS[b - 1]); floatingTexts.push(new FloatingText(hit.x, hit.top - 22, "SAP TRU!")); }
                            else if (alive.length > 2) {                       // da thap het co -> CHIM XUONG DUNG NHAM
                                if (this.onPillar(hit)) { dino.grounded = false; dino.dy = Math.max(dino.dy, 2); }
                                let gi = platforms.indexOf(hit); if (gi >= 0) platforms.splice(gi, 1);
                                this.sunk.push({ x: hit.x, w: hit.w, t: 360 });
                                visualEffects.push(new Effect(hit.x + hit.w/2, 306, 'explosion', true, 40));
                                floatingTexts.push(new FloatingText(hit.x, 280, "CHIM DUNG NHAM!"));
                            }
                        }
                        this.state = 'idle'; this.actionTimer = 66;
                    }
                    if (this.y > 420) { this.y = 165 - 78; this.state = 'idle'; this.actionTimer = 66; }
                }
                // === NHAY CHEO NHAM VAO NGUOI CHOI ===
                else if (this.state === 'hop_prep') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'hop_go'; this.vy = -13; } }
                else if (this.state === 'hop_go') {
                    this.vy += 0.7; this.y += this.vy; this.x += (this.hopTo - this.x) * 0.14;
                    let land = 400;
                    for (let pf of P) if (this.x + this.w > pf.x && this.x < pf.x + pf.w && pf.top - this.h < land && this.y + this.h <= pf.top + 20) land = pf.top - this.h;
                    if (this.vy > 0 && this.y >= land) {
                        this.y = land; this.vy = 0; shakeTimer = 20;
                        if (checkAABB(dino, { x: this.x - 26, y: this.y, w: this.w + 52, h: this.h + 20 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); }
                        visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h, 'explosion', true, 26));
                        this.state = 'idle'; this.actionTimer = 54;
                    }
                    if (this.y > 420) { this.y = 165 - 78; this.state = 'idle'; this.actionTimer = 54; }
                }
                // === DOI DIA HINH ===
                else if (this.state === 'shift_prep') { this.subTimer--; this.rumble = 4; if (this.subTimer <= 0) { this.state = 'shift_move'; this.subTimer = 36; shakeTimer = 24; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'shift_move') {
                    this.subTimer--; let k = 1 - this.subTimer / 36;
                    for (let j = 0; j < this.shiftIdx.length; j++) { let pf = P[this.shiftIdx[j]]; if (!pf) continue;
                        this.setTop(pf, Math.round(this.shiftFrom[j] + (this.shiftTo[j] - this.shiftFrom[j]) * k)); }
                    if (this.subTimer <= 0) { this.state = 'open'; this.subTimer = 110; this.shiftCd = 460; }
                }
                else if (this.state === 'open') {
                    this.subTimer--;
                    let tx = dino.x + dino.w/2 - this.w/2;
                    this.x += (Math.max(30, Math.min(canvas.width - this.w - 30, tx)) - this.x) * 0.04;
                    this.y += ((235 - 78) - this.y) * 0.07;
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 50; }
                }
                this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.x));
            }
            draw() {
                let P = this.pillars(), cx = this.x + this.w/2, sd = this.facingLeft ? -1 : 1;
                // CANH BAO: mua dung nham
                if (this.state === 'magma_prep' || this.state === 'magma_fire') {
                    let a = (0.25 + 0.35 * Math.abs(Math.sin(frames * 0.35))).toFixed(2);
                    for (let mx of this.magmaX) {
                        // CHI to vung DAP DAT (khong phu ca cot) -> nhin la biet nhay len la thoat
                        ctx.fillStyle = "rgba(255,87,34," + a + ")"; ctx.fillRect(mx - 46, 286, 92, 34);
                        ctx.strokeStyle = "rgba(255,193,7,0.9)"; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.ellipse(mx, 302, 44, 14, 0, 0, Math.PI * 2); ctx.stroke();
                        if (this.state === 'magma_prep') {   // thien thach dang roi xuong
                            let k = 1 - this.subTimer / 56;
                            ctx.fillStyle = "#FF6D00"; ctx.beginPath(); ctx.arc(mx, 40 + k * 240, 11, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = "rgba(255,193,7,0.6)"; ctx.beginPath(); ctx.arc(mx, 40 + k * 240 - 12, 7, 0, Math.PI * 2); ctx.fill();
                        }
                    }
                }
                // CANH BAO: dap tru (ran -> len cao -> giang)
                if (this.state === 'slam_charge' || this.state === 'slam_rise' || this.state === 'slam_fall') {
                    ctx.fillStyle = "rgba(255,64,64," + (0.2 + 0.3 * Math.abs(Math.sin(frames * 0.4))).toFixed(2) + ")";
                    ctx.fillRect(this.x - 30, this.y + this.h, this.w + 60, 400 - (this.y + this.h));
                    if (this.state === 'slam_charge') {
                        let k = 1 - this.subTimer / 120;
                        ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(this.x - 6, this.y - 20, this.w + 12, 8);
                        ctx.fillStyle = this.subTimer > 45 ? "#FFC107" : "#FF1744"; ctx.fillRect(this.x - 4, this.y - 18, (this.w + 8) * k, 4);
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText(this.subTimer > 45 ? "ĐANG NHẮM..." : "KHOÁ MỤC TIÊU!", this.x + this.w/2, this.y - 26); ctx.textAlign = "left";
                    }
                }
                // tru dang chim dung nham
                for (let sk of this.sunk) {
                    ctx.fillStyle = "rgba(255,87,34,0.35)"; ctx.fillRect(sk.x, 300, sk.w, 100);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(Math.ceil(sk.t / 60) + "s", sk.x + sk.w/2, 316); ctx.textAlign = "left";
                }
                if (this.state === 'shift_prep') for (let j = 0; j < this.shiftIdx.length; j++) {
                    let pf = P[this.shiftIdx[j]]; if (!pf) continue;
                    let up = this.shiftTo[j] < this.shiftFrom[j], a = 0.35 + 0.35 * Math.sin(frames * 0.35);
                    ctx.fillStyle = "rgba(255,193,7," + a.toFixed(2) + ")"; ctx.fillRect(pf.x, pf.top, pf.w, Math.max(4, pf.h));
                    ctx.fillStyle = "#FFF"; ctx.font = "bold 22px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(up ? "▲" : "▼", pf.x + pf.w/2, pf.top - 12); ctx.textAlign = "left";
                }
                // CHAN COT SANG = dang nap, ban vao day de huy
                for (let c of this.charges) {
                    let pf = c.pf; if (!pf) continue;
                    let k = 1 - c.t / 45, high = pf.top <= 200;
                    ctx.fillStyle = "rgba(255,87,34," + (0.3 + k * 0.5).toFixed(2) + ")"; ctx.fillRect(pf.x, pf.top + 24, pf.w, 64);
                    ctx.strokeStyle = "#FFEB3B"; ctx.lineWidth = 4; ctx.strokeRect(pf.x, pf.top + 24, pf.w, 64);
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(high ? "LUA NGANG" : "LUA DOC", pf.x + pf.w/2, pf.top + 50);
                    ctx.fillText("BAN CHAN " + c.hits + "/3", pf.x + pf.w/2, pf.top + 68); ctx.textAlign = "left";
                    if (high) { ctx.fillStyle = "rgba(255,87,34,0.18)"; ctx.fillRect(0, pf.top - 40, canvas.width, 34); }
                    else { ctx.fillStyle = "rgba(255,87,34,0.18)"; ctx.fillRect(pf.x + 10, pf.top - 210, pf.w - 20, 214); }
                }
                for (let f of this.flames) {
                    let pf = f.pf;
                    if (f.horiz) {
                        ctx.fillStyle = "rgba(255,87,34,0.85)"; ctx.fillRect(0, pf.top - 40, canvas.width, 34);
                        ctx.fillStyle = "#FFEB3B"; ctx.fillRect(0, pf.top - 30, canvas.width, 14);
                    } else {
                        ctx.fillStyle = "rgba(255,87,34,0.85)"; ctx.fillRect(pf.x + 10, pf.top - 210, pf.w - 20, 214);
                        ctx.fillStyle = "#FFEB3B"; ctx.fillRect(pf.x + pf.w/2 - 12, pf.top - 210, 24, 214);
                    }
                }
                if (this.state === 'hop_prep') {
                    ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.beginPath(); ctx.ellipse(this.hopTo + this.w/2, 316, 56, 11, 0, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(cx, this.y + this.h); ctx.lineTo(this.hopTo + this.w/2, 310); ctx.stroke();
                }
                let ox = this.rumble > 0 ? (Math.random() - 0.5) * 4 : 0;
                ctx.fillStyle = "#546E7A"; ctx.fillRect(this.x + ox, this.y + 24, this.w, 44);
                ctx.fillRect(this.x + ox + (sd < 0 ? -14 : this.w - 30), this.y + 4, 44, 34);
                ctx.fillStyle = "#37474F";
                for (let i = 0; i < 4; i++) ctx.fillRect(this.x + ox + 14 + i * 18, this.y + 8 + (i % 2) * 4, 12, 20);
                ctx.fillStyle = "#546E7A"; ctx.fillRect(this.x + ox + 18, this.y + 64, 18, 16); ctx.fillRect(this.x + ox + this.w - 36, this.y + 64, 18, 16);
                ctx.strokeStyle = "#1C262B"; ctx.lineWidth = 3;
                ctx.strokeRect(this.x + ox, this.y + 24, this.w, 44);
                ctx.strokeRect(this.x + ox + (sd < 0 ? -14 : this.w - 30), this.y + 4, 44, 34);
                ctx.strokeStyle = this.state === 'open' ? "#FFEB3B" : "#4FC3F7"; ctx.lineWidth = 2;
                for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(this.x + ox + 10, this.y + 34 + i * 12); ctx.lineTo(this.x + ox + this.w - 10, this.y + 40 + i * 12); ctx.stroke(); }
                ctx.fillStyle = this.state === 'open' ? "#FFEB3B" : "#FF5252";
                ctx.fillRect(this.x + ox + (sd < 0 ? -6 : this.w - 22), this.y + 16, 12, 8);
                if (this.state === 'open') { ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("HO! DANH DI!", cx, this.y - 40); ctx.textAlign = "left"; }
                // ctx.fillStyle = "black"; ctx.fillRect(this.x, this.y - 26, this.w, 9);
                // ctx.fillStyle = "#90A4AE"; ctx.fillRect(this.x + 1, this.y - 25, (this.w - 2) * Math.max(0, this.hp / this.maxHp), 7);
                ctx.fillStyle = "white"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + "  " + Math.max(0, Math.ceil(this.hp)) + "/" + this.maxHp, this.x + this.w/2, this.y - 30); ctx.textAlign = "left";
            }
}
// BOSS_PART_END s0.PillarLordBoss.1

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
