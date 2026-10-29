// BOSS_FILE: IceFangBoss
// BOSS_SNAPSHOT: 3cf4652cd737d36361a15b25712b9a3ff21a9a13bbe8337913bcf233f06c6a1d
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, canvas, checkAABB, ctx, dino, floatingTexts, frames, parry, pickFromBag, platforms, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:27847 · Dùng bởi: IceFangBoss
// BOSS_PART_BEGIN s0.IceFangBoss.1 EDITABLE
class IceFangBoss {
            constructor(level) {
                this.hp = 75; this.maxHp = 75;
                this.w = 104; this.h = 54; this.x = canvas.width - 220; this.y = 90;
                this.state = 'entering'; this.retState = 'roam'; this.name = "BANG NHA";
                this.actionTimer = 70; this.subTimer = 0; this.facingLeft = true; this.lastSkill = '';
                this.freezeCd = 240; this.icicles = []; this.spikes = []; this.fallen = [];
                this.slideV = 0; this.prevPx = 0; this.wing = 0; this.bob = 0;
                this.aim = null; this.stunTimer = 0; this.stormDir = 1; this.stormX = 0; this.safeBand = 1;
                this.burnTimer = 0; this.lastMeleeHit = -1;
            }
            rocks() { return platforms.filter(p => p.summit); }
            update() {
                const BANDS = [160, 240, 305];
                this.wing += 0.32; this.bob += 0.07;
                let R = this.rocks();
                if (this.state === 'entering') { this.x -= 6; if (this.x <= canvas.width - 240) { this.state = 'intro'; this.subTimer = 0; } return; }
                if (this.state === 'intro') { this.subTimer++; if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x, this.y - 40, "BANG NHA!")); if (SFX.bossEntry) SFX.bossEntry(); } if (this.subTimer > 44) { this.state = 'roam'; this.actionTimer = 60; } return; }
                if (this.state !== 'dive_go') this.facingLeft = (dino.x + dino.w/2) < (this.x + this.w/2);

                // ---- BANG: ban 3 phat de vo, khong vo thi mom da RUNG ----
                for (let pf of R) {
                    if (!pf.icy) continue;
                    for (let p = projectiles.length - 1; p >= 0; p--) {
                        let pr = projectiles[p];
                        if (pr._ice) continue;
                        if (checkAABB(pr, { x: pf.x - 6, y: pf.top - 50, w: pf.w + 12, h: 62 })) {
                            pr._ice = true; pf.iceHp = (pf.iceHp || 3) - 1;
                            visualEffects.push(new Effect(pr.x, pf.top - 6, 'explosion', true, 14));
                            if (pf.iceHp <= 0) { pf.icy = false; pf.iceFall = 0; floatingTexts.push(new FloatingText(pf.x + pf.w/2 - 24, pf.top - 26, "VO BANG!")); }
                            break;
                        }
                    }
                    if (!pf.icy) continue;
                    pf.iceFall = (pf.iceFall || 0) + 1;
                    if (pf.iceFall >= 300) {                       // 5 giay -> mom da rung
                        let k = platforms.indexOf(pf);
                        if (k >= 0 && platforms.filter(q => q.summit).length > 3) {
                            visualEffects.push(new Effect(pf.x + pf.w/2, pf.top, 'explosion', true, 32));
                            this.fallen.push({ x: pf.x, w: pf.w, top: pf.top, t: 420 });
                            platforms.splice(k, 1); shakeTimer = 20;
                        } else { pf.icy = false; pf.iceFall = 0; }
                    }
                }
                // ---- mom da moc lai ----
                for (let i = this.fallen.length - 1; i >= 0; i--) {
                    let f = this.fallen[i]; f.t--;
                    if (f.t <= 0) { platforms.push({ x: f.x, w: f.w, top: f.top, h: 18, summit: true }); visualEffects.push(new Effect(f.x + f.w/2, f.top, 'explosion', true, 24)); this.fallen.splice(i, 1); }
                }
                // ---- truot tren bang (khong gay sat thuong) ----
                let onIce = R.some(pf => pf.icy && dino.grounded && Math.abs((dino.y + dino.h) - pf.top) < 8 && dino.x + dino.w > pf.x && dino.x < pf.x + pf.w);
                let vx = dino.x - this.prevPx; this.prevPx = dino.x;
                if (onIce) { this.slideV = Math.max(-2.2, Math.min(2.2, this.slideV * 0.93 + vx * 0.14)); dino.x += this.slideV; dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x)); }
                else this.slideV *= 0.7;
                // ---- coc bang cam tren mom da ----
                for (let i = this.spikes.length - 1; i >= 0; i--) {
                    let s = this.spikes[i]; s.t--;
                    if (s.t <= 0) { this.spikes.splice(i, 1); continue; }
                    if (checkAABB(dino, { x: s.x - 12, y: s.y - 44, w: 24, h: 46 })) { if (!dino.isShielding()) { if (frames % 24 === 0) dino.takeDamage(1); } else parry(); }
                }
                for (let i = this.icicles.length - 1; i >= 0; i--) {
                    let ic = this.icicles[i]; ic.vy = Math.min(11, ic.vy + 0.34); ic.y += ic.vy;
                    if (checkAABB(dino, { x: ic.x - 10, y: ic.y - 20, w: 20, h: 40 })) { if (!dino.isShielding()) dino.takeDamage(1); else parry(); this.icicles.splice(i, 1); continue; }
                    if (ic.y > 420) { this.icicles.splice(i, 1); }
                }
                if (this.stunTimer > 0) { this.stunTimer--; if (this.stunTimer <= 0) { this.state = 'roam'; this.actionTimer = 50; } return; }

                if (this.state === 'roam') {
                    this.freezeCd--;
                    let frozen = R.filter(p => p.icy).length;
                    if (this.freezeCd <= 0 && frozen < 2 && R.length > 3) {
                        let cand = R.map((p, i) => i).filter(i => !R[i].icy).sort(() => Math.random() - 0.5);
                        for (let i of cand.slice(0, 1)) { R[i].icy = true; R[i].iceHp = 3; R[i].iceFall = 0; }
                        this.freezeCd = 330; if (SFX.bossSkill) SFX.bossSkill();
                    }
                    let ty = 105 + Math.sin(this.bob) * 24; this.y += (ty - this.y) * 0.07;
                    let dx = (dino.x + dino.w/2) - (this.x + this.w/2);
                    if (Math.abs(dx) < 230) this.x -= Math.sign(dx || 1) * 2.6;
                    else if (Math.abs(dx) > 420) this.x += Math.sign(dx) * 3.0;
                    this.x = Math.max(20, Math.min(canvas.width - this.w - 20, this.x));
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let pool = ['dive', 'rain', 'storm', 'dive', 'icelock', 'frost'];
                        let c = pickFromBag(this, pool);
                        if (c === 'icelock') {   // DONG BANG MOM DA duoi chan nguoi choi: roi khoi do HOAC ban 3 phat pha bang
                            this.lockPf = R.find(p => dino.grounded && Math.abs((dino.y + dino.h) - p.top) < 8 && dino.x + dino.w > p.x && dino.x < p.x + p.w) || null;
                            if (!this.lockPf) { this.state = 'roam'; this.actionTimer = 26; }
                            else { this.state = 'icelock_prep'; this.subTimer = 48; }
                        }
                        else if (c === 'frost') { this.state = 'frost_prep'; this.subTimer = 46;
                            this.frostX = dino.x + dino.w/2; this.frostDir = (dino.x + dino.w/2) < (this.x + this.w/2) ? -1 : 1; }
                        else if (c === 'dive') {                       // NHANH + CHEO + TARGET + PARRY duoc
                            this.state = 'dive_prep'; this.subTimer = 35;
                            let ddx = (dino.x + dino.w/2) - (this.x + this.w/2), ddy = (dino.y + dino.h/2) - (this.y + this.h/2), d = Math.hypot(ddx, ddy) || 1;
                            this.aim = { vx: ddx/d * 15, vy: ddy/d * 15 };
                        }
                        else if (c === 'rain') { this.state = 'rain_prep'; this.subTimer = 50;
                            let idx = R.map((p, i) => i).sort(() => Math.random() - 0.5).slice(0, 2);
                            this.rainMarks = idx.map(i => R[i] ? R[i].x + R[i].w/2 : 500); }
                        else {                                     // CHAM + RAT TO: bao bang quet cheo 2/3 man
                            this.state = 'storm_prep'; this.subTimer = 100;
                            this.stormDir = (dino.x + dino.w/2) < canvas.width/2 ? 1 : -1;
                            this.stormX = this.stormDir > 0 ? -260 : canvas.width + 260;
                            this.safeBand = Math.floor(Math.random() * 3);
                        }
                    }
                }
                // === DONG BANG MOM DA: bo di HOAC ban 3 phat pha bang, khong thi mom da RUNG ===
                else if (this.state === 'icelock_prep') {
                    this.subTimer--;
                    let pf = this.lockPf;
                    if (!pf || platforms.indexOf(pf) < 0) { this.lockPf = null; this.state = 'roam'; this.actionTimer = 40; return; }
                    this.x += ((pf.x + pf.w/2 - this.w/2) - this.x) * 0.10;
                    this.y += ((104) - this.y) * 0.08;
                    if (this.subTimer <= 0) {
                        pf.icy = true; pf.iceHp = 3; pf.iceFall = 170;    // con ~2.2 giay truoc khi rung
                        floatingTexts.push(new FloatingText(pf.x, pf.top - 30, "DONG BANG! RA KHOI DO / BAN VO!"));
                        visualEffects.push(new Effect(pf.x + pf.w/2, pf.top, 'explosion', true, 30));
                        shakeTimer = 18; if (SFX.bossSkill) SFX.bossSkill();
                        this.lockPf = null; this.state = 'roam'; this.actionTimer = 58;
                    }
                }
                // === LUONG BANG GIA: quet ngang mat dat, lam cham nguoi choi ===
                else if (this.state === 'frost_prep') {
                    this.subTimer--;
                    this.y += ((150) - this.y) * 0.10;
                    if (this.subTimer <= 0) { this.state = 'frost_go'; this.subTimer = 90; this.frostX = this.frostDir > 0 ? -40 : canvas.width + 40; shakeTimer = 16; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'frost_go') {
                    this.subTimer--;
                    this.frostX += this.frostDir * 13;
                    if (Math.abs((dino.x + dino.w/2) - this.frostX) < 52 && (dino.y + dino.h) > 250) {
                        if (!dino.isShielding()) { if (frames % 16 === 0) dino.takeDamage(1); } else parry();
                    }
                    if (this.frostX < -80 || this.frostX > canvas.width + 80 || this.subTimer <= 0) { this.state = 'roam'; this.actionTimer = 60; }
                }
                // === BO NHAO CHEO ===
                else if (this.state === 'dive_prep') {
                    this.subTimer--;
                    if (this.subTimer > 18) { let ddx = (dino.x + dino.w/2) - (this.x + this.w/2), ddy = (dino.y + dino.h/2) - (this.y + this.h/2), d = Math.hypot(ddx, ddy) || 1; this.aim = { vx: ddx/d * 15, vy: ddy/d * 15, locked: false }; }
                    else if (this.aim) this.aim.locked = true;
                    if (this.subTimer <= 0) { this.state = 'dive_go'; this.subTimer = 90; if (SFX.bossSkill) SFX.bossSkill(); }
                }
                else if (this.state === 'dive_go') {
                    this.x += this.aim.vx; this.y += this.aim.vy; this.subTimer--;
                    if (checkAABB(dino, this)) {
                        if (dino.isShielding()) { parry(); this.state = 'stun'; this.stunTimer = 150; shakeTimer = 22; floatingTexts.push(new FloatingText(this.x, this.y - 40, "CHOANG!")); return; }
                        else dino.takeDamage(1);
                    }
                    let hitRock = null;
                    for (let pf of this.rocks()) if (this.x + this.w > pf.x && this.x < pf.x + pf.w && this.y + this.h > pf.top - 6 && this.y + this.h < pf.top + 40) hitRock = pf;
                    if (hitRock) {
                        this.spikes.push({ x: this.x + this.w/2, y: hitRock.top, t: 300 });
                        visualEffects.push(new Effect(this.x + this.w/2, hitRock.top, 'explosion', true, 26)); shakeTimer = 16;
                        this.state = 'roam'; this.actionTimer = 46;
                    }
                    else if (this.subTimer <= 0 || this.x < -80 || this.x > canvas.width + 80 || this.y > 400 || this.y < -10) {
                        this.state = 'ice_back';   // LUI VE TU TU thay vi bat vi tri ve y=110
                    }
                }
                // === LUI VE CHO CU: bay deu 9px/khung, khong dich chuyen dot ngot ===
                else if (this.state === 'ice_back') {
                    let tx = Math.max(20, Math.min(canvas.width - this.w - 20, this.x)), ty = 110;
                    let dx = tx - this.x, dy = ty - this.y, d = Math.hypot(dx, dy);
                    if (d < 10) { this.state = 'roam'; this.actionTimer = 46; }
                    else { this.x += dx / d * 9; this.y += dy / d * 9; }
                }
                // === MUA BANG NHU ===
                else if (this.state === 'rain_prep') { this.subTimer--; if (this.subTimer <= 0) {
                    this.state = 'rain_fire'; this.subTimer = 80; if (SFX.bossSkill) SFX.bossSkill();
                    for (let m of (this.rainMarks || [])) for (let k = 0; k < 3; k++) this.icicles.push({ x: m + (k - 1) * 26, y: -30 - k * 34, vy: 3.2 });
                } }
                else if (this.state === 'rain_fire') { this.subTimer--; if (this.subTimer <= 0 && this.icicles.length === 0) { this.state = 'roam'; this.actionTimer = 60; } }
                // === BAO BANG (cham, rat to, chua 1 tang an toan) ===
                else if (this.state === 'storm_prep') { this.subTimer--; if (this.subTimer <= 0) { this.state = 'storm_go'; if (SFX.bossSkill) SFX.bossSkill(); shakeTimer = 12; } }
                else if (this.state === 'storm_go') {
                    this.stormX += this.stormDir * 7.5;
                    let sy = BANDS[this.safeBand];
                    let hb = { x: this.stormX - 130, y: 0, w: 260, h: 400 };
                    if (checkAABB(dino, hb) && Math.abs((dino.y + dino.h) - sy) > 46) { if (!dino.isShielding()) { if (frames % 16 === 0) dino.takeDamage(1); } else parry(); }
                    if (this.stormX < -300 || this.stormX > canvas.width + 300) { this.state = 'roam'; this.actionTimer = 60; }
                }
            }
            draw() {
                const BANDS = [160, 240, 305];
                let cx = this.x + this.w/2, sd = this.facingLeft ? -1 : 1;
                for (let f of this.fallen) { ctx.strokeStyle = "rgba(120,144,156,0.5)"; ctx.setLineDash([7, 7]); ctx.lineWidth = 2; ctx.strokeRect(f.x, f.top, f.w, 18); ctx.setLineDash([]); }
                for (let pf of this.rocks()) {
                    if (!pf.icy) continue;
                    let danger = (pf.iceFall || 0) > 200;
                    ctx.fillStyle = danger ? "rgba(255,138,128,0.85)" : "rgba(179,229,252,0.85)"; ctx.fillRect(pf.x, pf.top - 9, pf.w, 11);
                    ctx.fillStyle = "#E1F5FE"; for (let i = 0; i < pf.w; i += 20) ctx.fillRect(pf.x + i, pf.top - 13, 9, 6);
                    ctx.fillStyle = danger ? "#FF5252" : "#01579B"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("BANG " + (pf.iceHp || 0) + "  RUNG " + Math.max(0, Math.ceil((300 - (pf.iceFall || 0)) / 60)) + "s", pf.x + pf.w/2, pf.top - 18); ctx.textAlign = "left";
                }
                for (let s of this.spikes) {
                    ctx.fillStyle = "#B3E5FC"; ctx.beginPath(); ctx.moveTo(s.x, s.y - 44); ctx.lineTo(s.x - 12, s.y); ctx.lineTo(s.x + 12, s.y); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#0288D1"; ctx.lineWidth = 2; ctx.stroke();
                }
                if (this.state === 'dive_prep' && this.aim) {
                    ctx.strokeStyle = this.aim.locked ? "#00E5FF" : "rgba(79,195,247,0.4)"; ctx.lineWidth = this.aim.locked ? 7 : 3;
                    ctx.beginPath(); ctx.moveTo(cx, this.y + this.h/2); ctx.lineTo(cx + this.aim.vx * 90, this.y + this.h/2 + this.aim.vy * 90); ctx.stroke();
                }
                if (this.state === 'rain_prep') for (let m of (this.rainMarks || [])) {
                    let k = 1 - this.subTimer / 50;
                    ctx.strokeStyle = "rgba(79,195,247," + (0.4 + k * 0.5).toFixed(2) + ")"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(m - 34, 0); ctx.lineTo(m - 34, 400); ctx.moveTo(m + 34, 0); ctx.lineTo(m + 34, 400); ctx.stroke();
                }
                for (let ic of this.icicles) {
                    ctx.fillStyle = "#B3E5FC"; ctx.beginPath(); ctx.moveTo(ic.x, ic.y + 20); ctx.lineTo(ic.x - 9, ic.y - 18); ctx.lineTo(ic.x + 9, ic.y - 18); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#0288D1"; ctx.lineWidth = 2; ctx.stroke();
                }
                if (this.state === 'icelock_prep' && this.lockPf && platforms.indexOf(this.lockPf) >= 0) {
                    let pf = this.lockPf, a = (0.25 + 0.35 * Math.abs(Math.sin(frames * 0.4))).toFixed(2);
                    ctx.fillStyle = "rgba(129,212,250," + a + ")"; ctx.fillRect(pf.x - 4, pf.top - 16, pf.w + 8, 24);
                    ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = 2; ctx.strokeRect(pf.x - 4, pf.top - 16, pf.w + 8, 24);
                    ctx.strokeStyle = "rgba(179,229,252,0.7)"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(this.x + this.w/2, this.y + this.h); ctx.lineTo(pf.x + pf.w/2, pf.top); ctx.stroke();
                    ctx.fillStyle = "#E1F5FE"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("SẮP ĐÓNG BĂNG!", pf.x + pf.w/2, pf.top - 24); ctx.textAlign = "left";
                }
                if (this.state === 'frost_prep') {
                    ctx.fillStyle = "rgba(129,212,250," + (0.2 + 0.3 * Math.abs(Math.sin(frames * 0.4))).toFixed(2) + ")";
                    ctx.fillRect(0, 250, canvas.width, 70);
                    ctx.fillStyle = "#E1F5FE"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("LUỒNG BĂNG QUÉT MẶT ĐẤT — LÊN CAO!", canvas.width/2, 240); ctx.textAlign = "left";
                }
                if (this.state === 'frost_go') {
                    ctx.fillStyle = "rgba(179,229,252,0.65)";
                    ctx.beginPath(); ctx.ellipse(this.frostX, 292, 50, 30, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = 3;
                    for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(this.frostX - this.frostDir * k * 16, 292, 34 - k * 8, -1.4, 1.4); ctx.stroke(); }
                }
                if (this.state === 'storm_prep' || this.state === 'storm_go') {
                    let sy = BANDS[this.safeBand];
                    ctx.fillStyle = "rgba(76,175,80,0.16)"; ctx.fillRect(0, sy - 46, canvas.width, 50);
                    ctx.strokeStyle = "#69F0AE"; ctx.lineWidth = 2; ctx.strokeRect(0, sy - 46, canvas.width, 50);
                    ctx.fillStyle = "#69F0AE"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("TANG AN TOAN", canvas.width/2, sy - 52); ctx.textAlign = "left";
                    if (this.state === 'storm_prep') { ctx.fillStyle = "#4FC3F7"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("BAO BANG! " + (this.stormDir > 0 ? "TU TRAI" : "TU PHAI"), canvas.width/2, 40); ctx.textAlign = "left"; }
                    else {
                        ctx.fillStyle = "rgba(179,229,252,0.55)"; ctx.fillRect(this.stormX - 130, 0, 260, 400);
                        ctx.fillStyle = "rgba(255,255,255,0.5)";
                        for (let i = 0; i < 14; i++) { let yy = (i * 31 + frames * 5) % 400; ctx.fillRect(this.stormX - 120 + (i % 5) * 48, yy, 30, 5); }
                        ctx.clearRect(0, 0, 0, 0);
                        ctx.fillStyle = "rgba(76,175,80,0.22)"; ctx.fillRect(this.stormX - 130, sy - 46, 260, 50);
                    }
                }
                ctx.fillStyle = "#B0BEC5"; ctx.fillRect(this.x + 18, this.y + 16, this.w - 36, 28);
                ctx.fillStyle = "#CFD8DC"; ctx.fillRect(this.x + (sd < 0 ? 0 : this.w - 34), this.y + 8, 36, 26);
                let wy = Math.sin(this.wing) * 14;
                ctx.fillStyle = "#90A4AE";
                ctx.beginPath(); ctx.moveTo(cx - 10, this.y + 20); ctx.lineTo(cx - 62, this.y - 8 + wy); ctx.lineTo(cx - 20, this.y + 40); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(cx + 10, this.y + 20); ctx.lineTo(cx + 62, this.y - 8 - wy); ctx.lineTo(cx + 20, this.y + 40); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#263238"; ctx.lineWidth = 3;
                ctx.strokeRect(this.x + 18, this.y + 16, this.w - 36, 28);
                ctx.strokeRect(this.x + (sd < 0 ? 0 : this.w - 34), this.y + 8, 36, 26);
                ctx.fillStyle = "#E1F5FE";
                for (let i = 0; i < 3; i++) { let bx = this.x + (sd < 0 ? 4 : this.w - 30) + i * 10;
                    ctx.beginPath(); ctx.moveTo(bx, this.y + 32); ctx.lineTo(bx + 4, this.y + 48); ctx.lineTo(bx + 8, this.y + 32); ctx.closePath(); ctx.fill(); }
                ctx.fillStyle = this.stunTimer > 0 ? "#FFEB3B" : "#00B0FF";
                ctx.fillRect(this.x + (sd < 0 ? 8 : this.w - 22), this.y + 16, 12, 8);
                if (this.stunTimer > 0) { ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("CHOANG - DANH DI!", cx, this.y - 40); ctx.textAlign = "left"; }
                // ctx.fillStyle = "black"; ctx.fillRect(this.x, this.y - 26, this.w, 9);
                // ctx.fillStyle = "#4FC3F7"; ctx.fillRect(this.x + 1, this.y - 25, (this.w - 2) * Math.max(0, this.hp / this.maxHp), 7);
                ctx.fillStyle = "white"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name + "  " + Math.max(0, Math.ceil(this.hp)) + "/" + this.maxHp, this.x + this.w/2, this.y - 30); ctx.textAlign = "left";
            }
}
// BOSS_PART_END s0.IceFangBoss.1

// Nguồn: index.html:99250 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:99261 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
