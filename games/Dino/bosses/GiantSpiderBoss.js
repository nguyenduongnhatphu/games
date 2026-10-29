// BOSS_FILE: GiantSpiderBoss
// BOSS_SNAPSHOT: 3cf4652cd737d36361a15b25712b9a3ff21a9a13bbe8337913bcf233f06c6a1d
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, ctx, dino, dojoMode, floatingTexts, frames, parry, pickFromBag, projectiles, shakeTimer, visualEffects
// Nguồn: index.html:3891 · Dùng bởi: GiantSpiderBoss
// BOSS_PART_BEGIN s0.GiantSpiderBoss.1 EDITABLE
class GiantSpiderBoss {
            constructor(level) {
                this.hp = 75; this.maxHp = 75; this.name = "NHỆN KHỔNG LỒ"; this.retState = 'idle';
                this.w = 92; this.h = 60; this.x = canvas.width; this.y = 150; this.tx = 400;
                this.hangY = 150;      // do cao treo binh thuong (duoi tan cay)
                this.state = 'entering'; this.thread = 1; this.threadHits = 0; this.webStun = 0; this.fallDy = 0; this.webPhase = 0; this.anchorX = canvas.width/2; this.anchorY = (typeof spiderTree !== 'undefined' ? spiderTree.canopyBottom - 18 : 56); this.actionTimer = 55; this.subTimer = 0; this.lastSkill = ''; this.lastMeleeHit = -1; this.burnTimer = 0;
                this.legPhase = 0; this.wpToggle = 0; this.dropLockX = null;
            }
            pcX() { return dino.x + dino.w / 2; }
            shootAt(web) {
                let sx = this.x + this.w / 2, sy = this.y + this.h, dx = this.pcX() - sx, dy = (dino.y + dino.h / 2) - sy, d = Math.hypot(dx, dy) || 1, spd = web ? 6 : 7.5;
                let bp = new BossProjectile(sx, sy, dx / d * spd, dy / d * spd, false, 1);
                if (web) { bp.web = true; bp.color = "#ECEFF1"; } else bp.color = "#7CB342";
                bossProjectiles.push(bp);
            }
            pickSkill() {
                let sk = ['sp_webpoison', 'sp_drop', 'sp_spread'];
                this.state = pickFromBag(this, sk); this.subTimer = 0; this.wpToggle = 0;
            }
            update() {
                // ===== TREO TREN TO: ban dut 3 phat vao soi to PHIA TREN no -> roi xuong, choang 150 frame =====
                this.webPhase += 0.02;
                // dang roi tu do sau khi dut to
                if (this.thread === 0 && this.webStun <= 0 && this.fallDy >= 0 && this.y + this.h < 320) {
                    this.fallDy += 1.1; this.y += this.fallDy;
                    if (this.y + this.h >= 320) {
                        this.y = 320 - this.h; this.fallDy = 0; this.webStun = 150; shakeTimer = 26;
                        visualEffects.push(new Effect(this.x + this.w / 2, 312, 'explosion', true, 44));
                        floatingTexts.push(new FloatingText(this.x, this.y - 20, "ROI! CHOANG!"));
                        if (SFX.bossExplode) SFX.hit && SFX.hit();
                    }
                    return;
                }
                if (this.webStun > 0) {
                    this.webStun--; this.y = 320 - this.h; this.fallDy = 0;
                    if (this.webStun <= 0) {
                        this.thread = 1; this.threadHits = 0; this.fallDy = -1;
                        this.anchorX = 120 + Math.random() * (canvas.width - 240);
                        this.anchorY = (typeof spiderTree !== 'undefined' ? spiderTree.canopyBottom - 18 : 56);
                        this.state = 'idle'; this.actionTimer = 45; this.subTimer = 0; this.tx = this.anchorX - this.w / 2;
                    }
                    return;
                }
                // treo lai len to sau khi het choang
                if (this.thread && this.fallDy === -1) {
                    this.y -= 7;
                    if (this.y <= this.hangY) { this.y = this.hangY; this.fallDy = 0; }
                    return;
                }
                if (this.thread) {
                    // diem neo bam theo nguoi choi cham cham
                    this.anchorX += ((dino.x + dino.w / 2) - this.anchorX) * 0.005;   // bam theo CHAM (~26% khoang cach / giay)
                    this.anchorX = Math.max(90, Math.min(canvas.width - 90, this.anchorX));
                    let ax = this.anchorX, ay = this.anchorY, bx = this.x + this.w / 2, by = this.y + 6;
                    for (let _i = projectiles.length - 1; _i >= 0; _i--) {
                        let _p = projectiles[_i];
                        if (_p._webCut) continue;
                        let cxp = _p.x + _p.w / 2, cyp = _p.y + _p.h / 2;
                        if (cyp > by - 6) continue;                       // phai la doan to PHIA TREN nhen
                        let hit = distPtSeg(cxp, cyp, ax, ay, bx, by);
                        if (hit.d < 18) {
                            _p._webCut = true; this.threadHits++;
                            visualEffects.push(new Effect(cxp, cyp, 'explosion', true, 16));
                            floatingTexts.push(new FloatingText(cxp - 30, cyp - 12, "DUT TO " + this.threadHits + "/3"));
                            if (SFX.hit) SFX.hit();
                            if (this.threadHits >= 3) { this.thread = 0; this.fallDy = 0; shakeTimer = 18; }
                            break;
                        }
                    }
                    if (!this.thread) return;
                }

                this.legPhase += 0.2;
                if (this.state === 'entering') {
                    this.x -= 9; this.y += (this.hangY - this.y) * 0.2; if (this.x <= 400) { this.x = 400; this.state = 'idle'; this.actionTimer = 45; }
                } else if (this.state === 'idle') {
                    this.x += (this.tx - this.x) * 0.05; this.y += (this.hangY - this.y) * 0.15;
                    if (frames % 70 === 0) this.tx = 120 + Math.random() * 520;
                    this.actionTimer--; if (this.actionTimer <= 0) this.pickSkill();
                } else if (this.state === 'sp_webpoison') {
                    this.subTimer++; this.y += (this.hangY - 56 - this.y) * 0.12; this.x += (this.pcX() - this.w / 2 - this.x) * 0.025;
                    if (this.subTimer % 60 === 20 && this.subTimer < 260) { this.shootAt(this.wpToggle % 2 === 0); this.wpToggle++; }
                    if (this.subTimer > 268) { this.state = 'idle'; this.actionTimer = 45; }
                } else if (this.state === 'sp_drop') {
                    this.subTimer++;
                    if (this.subTimer <= SPD_TRACK) {
                        // GIAI DOAN 1: bam sat nguoi choi
                        this.x += (this.pcX() - this.w / 2 - this.x) * 0.2;
                        this.y += (this.hangY - this.y) * 0.2;
                        this.dropLockX = this.x + this.w / 2;
                    } else if (this.subTimer <= SPD_LOCK) {
                        // GIAI DOAN 2 (0,5 giay cuoi): luc bam GIAM DAN ve 0 -> chay ra la thoat
                        let e = (this.subTimer - SPD_TRACK) / SPD_EASE;      // 0 -> 1
                        // luc bam tut hang ngay khi vao 0,5s cuoi (0.2 -> 0.045) roi tat han theo bac 3
                        // => ca 30 frame cuoi no chi con khep duoc ~29% khoang cach: chay ngang la thoat
                        let k = SPD_EASE_K * (1 - e) * (1 - e) * (1 - e);
                        this.x += (this.pcX() - this.w / 2 - this.x) * k;
                        this.y += (this.hangY - this.y) * 0.2;
                        this.dropLockX = this.x + this.w / 2;
                    } else if (this.subTimer <= SPD_LOCK + 30) {
                        // GIAI DOAN 3: bo nhao xuong dung cot da khoa, KHONG doi huong nua
                        this.y += 15; if (this.y > 250) this.y = 250;
                    } else {
                        this.y += (this.hangY - this.y) * 0.16;
                        if (this.subTimer > SPD_LOCK + 68) { this.y = this.hangY; this.state = 'idle'; this.actionTimer = 45; this.dropLockX = null; }
                    }
                } else if (this.state === 'sp_spread') {
                    this.subTimer++; this.y += (this.hangY - this.y) * 0.15;
                    if (this.subTimer === 22 || this.subTimer === 52) { let sx = this.x + this.w / 2, sy = this.y + this.h; for (let k = -2; k <= 2; k++) { let web = ((k + this.subTimer / 30) % 2 === 0); let bp = new BossProjectile(sx, sy, k * 2.4, 5.6, false, 1); if (web) { bp.web = true; bp.color = "#ECEFF1"; } else bp.color = "#7CB342"; bossProjectiles.push(bp); } }
                    if (this.subTimer > 76) { this.state = 'idle'; this.actionTimer = 45; }
                }
            }
            draw() {
                // ===== MANG TO TOA RA TU DIEM NEO tren tan cay =====
                if (this.thread) {
                    let ax = this.anchorX, ay = this.anchorY, bx = this.x + this.w / 2, by = this.y + 6;
                    ctx.save();
                    // nut to bam vao canh cay (tan cay that ve o drawSpiderTree)
                    ctx.fillStyle = "rgba(255,255,255,0.85)";
                    ctx.beginPath(); ctx.ellipse(ax, ay, 9, 6, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "rgba(255,255,255,0.35)";
                    ctx.beginPath(); ctx.ellipse(ax, ay, 18, 10, 0, 0, Math.PI * 2); ctx.fill();
                    // nan hoa: 9 soi toa ra tu diem neo
                    let R = 132, spokes = 9;
                    ctx.strokeStyle = "rgba(255,255,255,0.30)"; ctx.lineWidth = 1.4;
                    for (let k = 0; k < spokes; k++) {
                        let a = (Math.PI / (spokes - 1)) * k + Math.sin(this.webPhase) * 0.03;
                        ctx.beginPath(); ctx.moveTo(ax, ay);
                        ctx.lineTo(ax + Math.cos(a) * R, ay + Math.sin(a) * R); ctx.stroke();
                    }
                    // vong to dong tam
                    for (let r = 1; r <= 4; r++) {
                        let rr = R * r / 4.4;
                        ctx.beginPath();
                        for (let k = 0; k < spokes; k++) {
                            let a = (Math.PI / (spokes - 1)) * k + Math.sin(this.webPhase) * 0.03;
                            let px = ax + Math.cos(a) * rr, py = ay + Math.sin(a) * rr * 0.92;
                            if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                        }
                        ctx.stroke();
                    }
                    // soi to CHINH (day la soi ban dut duoc)
                    let cut = this.threadHits;
                    ctx.strokeStyle = cut === 0 ? "rgba(255,255,255,0.85)" : (cut === 1 ? "#FFF59D" : "#FFB300");
                    ctx.lineWidth = 4 - cut;
                    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
                    // danh dau vung ban trung
                    if (cut > 0) {
                        ctx.strokeStyle = "rgba(255,179,0,0.55)"; ctx.lineWidth = 1;
                        for (let k = 1; k <= cut; k++) {
                            let t = k / 4, mx = ax + (bx - ax) * t, my = ay + (by - ay) * t;
                            ctx.beginPath(); ctx.arc(mx, my, 7 + Math.sin(frames * 0.2 + k) * 2, 0, Math.PI * 2); ctx.stroke();
                        }
                    }
                    ctx.restore();
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("BAN DUT TO " + this.threadHits + "/3", (ax + bx) / 2, (ay + by) / 2 - 10);
                    ctx.textAlign = "left";
                }
                // ===== VONG NGAM CHIEU CHUP: chi ro cot se roi + con bao nhieu de ne =====
                if (this.state === 'sp_drop' && this.subTimer <= SPD_LOCK + 30 && this.dropLockX != null) {
                    let locked = this.subTimer > SPD_LOCK;
                    let easing = this.subTimer > SPD_TRACK && !locked;
                    let lx = this.dropLockX;
                    ctx.save();
                    // cot roi
                    ctx.fillStyle = locked ? "rgba(255,23,68,0.20)" : (easing ? "rgba(255,193,7,0.16)" : "rgba(255,23,68,0.10)");
                    ctx.fillRect(lx - 34, this.y + this.h, 68, 320 - (this.y + this.h));
                    // vong ngam duoi dat
                    ctx.strokeStyle = locked ? "#FF1744" : (easing ? "#FFC107" : "rgba(255,23,68,0.7)");
                    ctx.lineWidth = locked ? 4 : 3;
                    ctx.beginPath(); ctx.ellipse(lx, 316, 36, 12, 0, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.ellipse(lx, 316, 20, 7, 0, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(lx - 46, 316); ctx.lineTo(lx - 26, 316);
                    ctx.moveTo(lx + 26, 316); ctx.lineTo(lx + 46, 316);
                    ctx.moveTo(lx, 300); ctx.lineTo(lx, 309); ctx.moveTo(lx, 323); ctx.lineTo(lx, 332); ctx.stroke();
                    // thanh dem nguoc 0,5 giay cuoi
                    if (easing) {
                        let left = 1 - (this.subTimer - SPD_TRACK) / SPD_EASE;
                        ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(lx - 40, 286, 80, 8);
                        ctx.fillStyle = "#FFC107"; ctx.fillRect(lx - 39, 287, 78 * left, 6);
                        ctx.fillStyle = "#FFC107"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("NE DI!", lx, 282); ctx.textAlign = "left";
                    } else if (locked) {
                        ctx.fillStyle = frames % 6 < 3 ? "#FF1744" : "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("CHUP!", lx, 284); ctx.textAlign = "left";
                    }
                    ctx.restore();
                }
                if (this.webStun > 0) {
                    ctx.fillStyle = frames % 8 < 4 ? "#FFEB3B" : "#FF5252"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("CHOANG " + Math.ceil(this.webStun / 60) + "s - DANH DI!", this.x + this.w / 2, this.y - 26);
                    ctx.strokeStyle = "rgba(255,235,59,0.7)"; ctx.lineWidth = 2;
                    for (let k = 0; k < 3; k++) { let a = frames * 0.12 + k * 2.1;
                        ctx.beginPath(); ctx.arc(this.x + this.w / 2 + Math.cos(a) * 34, this.y - 6 + Math.sin(a) * 9, 4, 0, Math.PI * 2); ctx.stroke(); }
                    ctx.textAlign = "left";
                }

                ctx.save();
                let cx = this.x + this.w / 2, cy = this.y + this.h / 2;
                // ===== THIET KE: 8 chan co DOT (dui - ong - ban), bung phinh co van,
                // 8 mat xep hai hang, va DOI KIM DOC truoc mieng. Ban cu chi la 2 hinh bau duc.
                const SOUT = "#1A0E0A";
                // --- 8 CHAN: moi chan 3 doan, khop nhon len tren nhu nhen that ---
                for (let sg = -1; sg <= 1; sg += 2) {
                    for (let i = 0; i < 4; i++) {
                        let lf = Math.sin(this.legPhase + i * 0.8 + (sg < 0 ? 0 : 1.4)) * 5;
                        let reach = 26 + i * 9, knee = 20 + i * 4;
                        let hipX = cx + sg * 11, hipY = cy - 2 + i * 3;
                        let kx = hipX + sg * (reach * 0.55), ky = hipY - knee + lf;
                        let fx = hipX + sg * reach, fy = cy + 20 + i * 2 + lf;
                        ctx.strokeStyle = "#4E342E"; ctx.lineWidth = 6 - i * 0.5; ctx.lineCap = "round";
                        ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(kx, ky); ctx.stroke();
                        ctx.strokeStyle = "#3E2723"; ctx.lineWidth = 4.5 - i * 0.4;
                        ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(fx, fy); ctx.stroke();
                        // ban chan nhon
                        ctx.strokeStyle = "#2E1A12"; ctx.lineWidth = 2.5;
                        ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx + sg * 7, fy + 7); ctx.stroke();
                        // long tren chan
                        ctx.strokeStyle = "rgba(46,26,18,0.8)"; ctx.lineWidth = 1.5;
                        for (let h = 0; h < 3; h++) { let t = (h + 1) / 4;
                            let px = hipX + (kx - hipX) * t, py = hipY + (ky - hipY) * t;
                            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + sg * 4, py - 6); ctx.stroke(); }
                        ctx.lineCap = "butt";
                    }
                }
                // --- BUNG phinh, co van ---
                ctx.fillStyle = "#3E2723";
                ctx.beginPath(); ctx.ellipse(cx + 2, cy + 12, 31, 27, 0.08, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = SOUT; ctx.lineWidth = 3; ctx.stroke();
                ctx.fillStyle = "#4E342E";
                ctx.beginPath(); ctx.ellipse(cx - 4, cy + 6, 20, 16, 0.1, 0, Math.PI * 2); ctx.fill();
                // van sang hinh nhen tren bung
                ctx.fillStyle = "#A1887F";
                ctx.beginPath(); ctx.moveTo(cx + 2, cy - 2);
                ctx.lineTo(cx + 10, cy + 12); ctx.lineTo(cx + 2, cy + 8);
                ctx.lineTo(cx - 6, cy + 12); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "rgba(161,136,127,0.55)";
                for (let k = 0; k < 3; k++) { ctx.beginPath();
                    ctx.ellipse(cx + 2, cy + 20 + k * 6, 16 - k * 4, 4, 0, 0, Math.PI * 2); ctx.fill(); }
                // --- NGUC ---
                ctx.fillStyle = "#5D4037";
                ctx.beginPath(); ctx.ellipse(cx, cy - 13, 19, 16, 0, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = SOUT; ctx.lineWidth = 2.5; ctx.stroke();
                ctx.fillStyle = "rgba(93,64,55,0.9)";
                ctx.beginPath(); ctx.ellipse(cx, cy - 17, 12, 8, 0, 0, Math.PI * 2); ctx.fill();
                // --- 8 MAT xep hai hang ---
                for (let e = 0; e < 4; e++) {
                    let ex = cx - 11 + e * 7.3, big = (e === 1 || e === 2);
                    ctx.fillStyle = "#1A0E0A";
                    ctx.beginPath(); ctx.arc(ex, cy - 19, big ? 4 : 3, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = this.webStun > 0 ? "#78909C" : "#FF1744";
                    ctx.beginPath(); ctx.arc(ex, cy - 19, big ? 2.8 : 1.9, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "rgba(255,255,255,0.75)";
                    ctx.beginPath(); ctx.arc(ex - 0.8, cy - 20, big ? 1.1 : 0.7, 0, Math.PI * 2); ctx.fill();
                }
                for (let e = 0; e < 4; e++) {
                    let ex = cx - 9 + e * 6;
                    ctx.fillStyle = "#1A0E0A";
                    ctx.beginPath(); ctx.arc(ex, cy - 12, 2.4, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = this.webStun > 0 ? "#78909C" : "#D32F2F";
                    ctx.beginPath(); ctx.arc(ex, cy - 12, 1.5, 0, Math.PI * 2); ctx.fill();
                }
                // --- DOI KIM DOC truoc mieng ---
                for (let sg = -1; sg <= 1; sg += 2) {
                    ctx.fillStyle = "#3E2723";
                    ctx.beginPath(); ctx.moveTo(cx + sg * 4, cy - 4);
                    ctx.quadraticCurveTo(cx + sg * 12, cy + 4, cx + sg * 9, cy + 15);
                    ctx.quadraticCurveTo(cx + sg * 4, cy + 6, cx + sg * 1, cy - 2);
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = SOUT; ctx.lineWidth = 1.8; ctx.stroke();
                    ctx.fillStyle = "#FFECB3";
                    ctx.beginPath(); ctx.moveTo(cx + sg * 9, cy + 13);
                    ctx.lineTo(cx + sg * 7, cy + 22); ctx.lineTo(cx + sg * 11, cy + 15); ctx.closePath(); ctx.fill();
                }
                ctx.restore();
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width / 2 - 160, 18, 320, 14);
                ctx.fillStyle = "#8D6E63"; ctx.fillRect(canvas.width / 2 - 158, 20, 316 * Math.max(0, this.hp / this.maxHp), 10);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText(this.name, canvas.width / 2, 14); ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s0.GiantSpiderBoss.1

// Nguồn: index.html:24219 · Dùng bởi: GiantSpiderBoss
// BOSS_PART_BEGIN s0.SPD_TRACK.1 EDITABLE
const SPD_TRACK = 26;
// BOSS_PART_END s0.SPD_TRACK.1

// Nguồn: index.html:24220 · Dùng bởi: GiantSpiderBoss
// BOSS_PART_BEGIN s0.SPD_EASE.1 EDITABLE
const SPD_EASE = 30;
// BOSS_PART_END s0.SPD_EASE.1

// Nguồn: index.html:24221 · Dùng bởi: GiantSpiderBoss
// BOSS_PART_BEGIN s0.SPD_EASE_K.1 EDITABLE
const SPD_EASE_K = 0.045;
// BOSS_PART_END s0.SPD_EASE_K.1

// Nguồn: index.html:24222 · Dùng bởi: GiantSpiderBoss
// BOSS_PART_BEGIN s0.SPD_LOCK.1 EDITABLE
const SPD_LOCK = SPD_TRACK + SPD_EASE;
// BOSS_PART_END s0.SPD_LOCK.1

// Nguồn: index.html:24447 · Dùng bởi: GiantSpiderBoss
// BOSS_PART_BEGIN s0.distPtSeg.1 EDITABLE
function distPtSeg(px, py, ax, ay, bx, by) {
            let vx = bx - ax, vy = by - ay, wx = px - ax, wy = py - ay;
            let len2 = vx * vx + vy * vy;
            let t = len2 > 0 ? Math.max(0, Math.min(1, (wx * vx + wy * vy) / len2)) : 0;
            let cx = ax + vx * t, cy = ay + vy * t;
            return { d: Math.hypot(px - cx, py - cy), t: t };
        }
// BOSS_PART_END s0.distPtSeg.1

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

// Nguồn: index.html:34720 · Dùng bởi: GiantSpiderBoss
// BOSS_PART_BEGIN s1.spiderTree.1 READ_ONLY
let spiderTree = { trunkX: 520, canopyBottom: 70 };
// BOSS_PART_END s1.spiderTree.1

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
