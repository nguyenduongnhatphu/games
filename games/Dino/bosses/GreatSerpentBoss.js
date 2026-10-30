// BOSS_FILE: GreatSerpentBoss
// BOSS_SNAPSHOT: 39483d797c15c5e35e37a5b630ae4f295f939302db706fe13262c4e699541a28
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, parry, parryX, pickFromBag, platforms, shakeTimer, visualEffects
// Nguồn: index.html:3003 · Dùng bởi: GreatSerpentBoss
// BOSS_PART_BEGIN s0.GreatSerpentBoss.1 EDITABLE
class GreatSerpentBoss {
            constructor(level) {
                this.maxHp = 75; this.hp = 75; this.name = "GREAT SERPENT";
                this.baseHeadX = 600; this.headX = canvas.width + 130; this.headY = 250;
                this.w = 54; this.h = 54; this.x = this.headX; this.y = this.headY;
                this.state = 'entering'; this.poolT = 0; this.poolX = 0; this.ripple = 0; this.actionTimer = 90; this.subTimer = 0;
                this.lockY = 250; this.lastSkill = ''; this.lastMeleeHit = -1; this.burnTimer = 0;
                this.shots = 0; this.laserY = 250; this.lungeCount = 0;
                this.diveCd = 200;   // do nhip lan: ~11 lan/100 giay (xem SWAMP_DIVE_CD)
                this.surfT = 0; this.surfHit = false;   // pha TROI LEN sau khi lan
            }
            pcY() { return dino.y + dino.h / 2; }
            setHead() { this.x = this.headX - this.w / 2; this.y = this.headY - this.h / 2; }
            pickSkill() {
                let sk = ['gs_lock', 'gs_barrage', 'gs_charge'];
                let c = pickFromBag(this, sk); this.subTimer = 0;
                if (c === 'gs_lock') { this.state = 'gs_lock'; this.subTimer = 120; this.lungeCount = 0; }
                else if (c === 'gs_barrage') { this.state = 'gs_barrage'; this.shots = 0; this.subTimer = 0; }
                else { this.state = 'gs_charge'; this.subTimer = 0; }
            }
            update() {
                // ===== DAM LAY: thinh thoang lan xuong vung nuoc roi trồi len tap kich =====
                let _pools = platforms.filter(p => p.swamp);
                if (_pools.length) {
                    this.ripple += 0.12;
                    if (this.diveCd > 0) this.diveCd--;
                    if (this.poolT > 0) {
                        this.poolT--;
                        this.y = 336;                                     // chim duoi nuoc, than KHONG hien
                        // 90 frame dau (1,5s): boi ngam ve phia nguoi choi
                        if (this.poolT > SWAMP_WARN) { this.poolX += ((dino.x + dino.w / 2) - this.poolX) * 0.035; }
                        this.poolX = Math.max(40, Math.min(canvas.width - 40, this.poolX));
                        this.x = this.poolX - this.w / 2;
                        if (this.poolT === SWAMP_WARN) { shakeTimer = 14; floatingTexts.push(new FloatingText(this.poolX - 46, 278, "SAP TROI LEN!")); if (SFX.bossSkill) SFX.bossSkill(); }
                        if (this.poolT <= 0) {                            // het lan -> BAT DAU TROI LEN
                            shakeTimer = 24;
                            visualEffects.push(new Effect(this.poolX, 320, 'explosion', true, 46));
                            this.state = 'gs_surface'; this.surfT = 0; this.surfHit = false;
                            this.headX = this.poolX; this.headY = 392;   // dau con duoi nuoc, se vot len
                            this.setHead();
                        }
                        return;
                    }
                    if (this.state === 'idle' && this.diveCd <= 0) {
                        // ca map la dam lay -> lan xuong ngay duoi cho no dang dung
                        let _p = _pools[Math.floor(Math.random() * _pools.length)];
                        let _lo = Math.max(60, _p.x + 40), _hi = Math.min(canvas.width - 60, _p.x + _p.w - 40);
                        this.poolX = Math.max(_lo, Math.min(_hi, this.headX));
                        this.poolT = SWAMP_SWIM + SWAMP_WARN;
                        this.diveCd = SWAMP_DIVE_CD + Math.floor(Math.random() * SWAMP_DIVE_JITTER);
                        visualEffects.push(new Effect(this.poolX, 320, 'explosion', true, 30));
                        floatingTexts.push(new FloatingText(this.poolX - 40, 296, "LAN XUONG!"));
                        return;
                    }
                }

                if (this.state === 'entering') {
                    this.headX -= 6; if (this.headX <= this.baseHeadX) { this.headX = this.baseHeadX; this.state = 'idle'; this.actionTimer = 70; }
                } else if (this.state === 'idle') {
                    this.headY += (this.pcY() - this.headY) * 0.06; this.headX = this.baseHeadX + Math.sin(frames * 0.05) * 12;
                    this.actionTimer--; if (this.actionTimer <= 0) this.pickSkill();
                } else if (this.state === 'gs_lock') {
                    this.headY += (this.pcY() - this.headY) * 0.12; this.subTimer--;
                    if (this.subTimer <= 0) { this.lockY = this.headY; this.state = 'gs_lunge'; }
                } else if (this.state === 'gs_lunge') {
                    this.headX -= 22; this.headY += (this.lockY - this.headY) * 0.2;
                    if (this.headX < -740) { this.headX = canvas.width + 130; this.state = 'gs_reenter'; }   // TOAN THAN qua het -> vao lai tu ben phai
                } else if (this.state === 'gs_reenter') {
                    this.headX -= 6; this.headY += (250 - this.headY) * 0.1;
                    if (this.headX <= this.baseHeadX) {
                        this.headX = this.baseHeadX; this.lungeCount = (this.lungeCount || 0) + 1;
                        if (this.lungeCount < 2) { this.lockY = this.pcY(); this.state = 'gs_lunge'; }   // dam lan 2 NGAY (khong delay), nham lai nguoi choi
                        else { this.state = 'idle'; this.actionTimer = 80; }
                    }
                } else if (this.state === 'gs_surface') {
                    // ===== TROI LEN: DAU + MOT PHAN THAN vot khoi mat nuoc =====
                    this.surfT++;
                    if (this.surfT <= 16) {                       // vot len that nhanh
                        this.headY += (196 - this.headY) * 0.34;
                        this.headX = this.poolX;
                        if (!this.surfHit && this.headY < 300) {
                            this.surfHit = true;
                            if (checkAABB(dino, { x: this.poolX - 62, y: 190, w: 124, h: 140 })) {
                                if (!dino.isShielding()) dino.takeDamage(1);
                                else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                            }
                        }
                    } else if (this.surfT <= 62) {                 // treo lo lung, quat dau theo nguoi choi
                        this.headY += (Math.max(180, this.pcY() - 30) - this.headY) * 0.09;
                        this.headX += ((dino.x + dino.w / 2) - this.headX) * 0.03;
                        if (this.surfT % 22 === 0) {                // nho noc doc trong luc troi len
                            let dx = (dino.x + dino.w / 2) - this.headX, dy = (dino.y + dino.h / 2) - this.headY, d = Math.hypot(dx, dy) || 1;
                            let bp = new BossProjectile(this.headX, this.headY, dx / d * 8, dy / d * 8, false, 1);
                            bp.color = "#7CB342"; bossProjectiles.push(bp);
                        }
                    } else if (this.surfT <= 92) {                // lan tro lai xuong nuoc
                        this.headY += (392 - this.headY) * 0.22;
                        if (this.surfT === 63) visualEffects.push(new Effect(this.headX, 322, 'explosion', true, 30));
                    } else {                                       // truon nguoc vao tu ben phai
                        this.headX = canvas.width + 130; this.headY = 250;
                        this.lungeCount = 2; this.state = 'gs_reenter';
                    }
                } else if (this.state === 'returning') {
                    this.headX += 15; this.headY += (250 - this.headY) * 0.1;
                    if (this.headX >= this.baseHeadX) { this.headX = this.baseHeadX; this.state = 'idle'; this.actionTimer = 80; }
                } else if (this.state === 'gs_barrage') {
                    this.headY += (this.pcY() - this.headY) * 0.08; this.subTimer++;
                    if (this.subTimer % 30 === 1 && this.shots < 5) {
                        let dx = (dino.x + dino.w / 2) - this.headX, dy = (dino.y + dino.h / 2) - this.headY, d = Math.hypot(dx, dy) || 1;
                        let bp = new BossProjectile(this.headX, this.headY, dx / d * 9, dy / d * 9, false, 1); bp.color = "#43A047"; bossProjectiles.push(bp); this.shots++;
                    }
                    if (this.shots >= 5 && this.subTimer > 170) { this.state = 'idle'; this.actionTimer = 80; }
                } else if (this.state === 'gs_charge') {
                    this.subTimer++;
                    if (this.subTimer < 90) this.headY += (this.pcY() - this.headY) * 0.1;   // khoa huong o 1.5s, cho 0.5s nhap nhay de ne
                    this.laserY = this.headY;
                    if (this.subTimer >= 120) { this.state = 'gs_laser'; this.subTimer = 90; }
                } else if (this.state === 'gs_laser') {
                    this.subTimer--;
                    let lrect = { x: 0, y: this.laserY - 22, w: this.headX, h: 44 };
                    if (checkAABB(dino, lrect)) {
                        if (dino.isShielding()) visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                        else if (this.subTimer % 12 === 0) dino.takeDamage(1);
                    }
                    if (this.subTimer <= 0) { this.state = 'idle'; this.actionTimer = 80; }
                }
                this.setHead();
            }
            // ================= BO VE MANG XA =================
            // Than ran = chuoi diem tren duong song, ve bang cac vong tron chong len nhau
            // -> thanh ong tron muot, thon dan ve duoi. Sau do dap vay + vay lung + bung sang.
            spine(hx, hy, len, amp, wob) {
                let pts = [], N = 46;
                for (let i = 0; i <= N; i++) {
                    let t = i / N;
                    let x = hx + t * len;
                    let y = hy + Math.sin(wob + t * 5.6) * amp * Math.min(1, t * 3.2);
                    pts.push({ x: x, y: y, r: 30 * (1 - 0.62 * t) + Math.sin(t * Math.PI) * 4 });
                }
                return pts;
            }
            drawTube(pts, alpha) {
                ctx.save(); if (alpha !== undefined) ctx.globalAlpha = alpha;
                // vien ngoai
                ctx.fillStyle = "#14401A";
                for (let p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 3, 0, Math.PI * 2); ctx.fill(); }
                // than chinh
                ctx.fillStyle = "#2E7D32";
                for (let p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
                // bung sang o duoi
                ctx.fillStyle = "#7CB342";
                for (let p of pts) { ctx.beginPath(); ctx.ellipse(p.x, p.y + p.r * 0.42, p.r * 0.52, p.r * 0.34, 0, 0, Math.PI * 2); ctx.fill(); }
                // vien sang tren lung
                ctx.fillStyle = "rgba(165,214,167,0.35)";
                for (let p of pts) { ctx.beginPath(); ctx.ellipse(p.x, p.y - p.r * 0.5, p.r * 0.42, p.r * 0.20, 0, 0, Math.PI * 2); ctx.fill(); }
                // vay hinh thoi doc than
                ctx.fillStyle = "rgba(27,94,32,0.85)";
                for (let i = 2; i < pts.length; i += 2) {
                    let p = pts[i], sz = p.r * 0.40;
                    for (let k = -1; k <= 1; k++) {
                        let oy = p.y + k * p.r * 0.44, ox = p.x + (k === 0 ? 0 : 4);
                        ctx.beginPath();
                        ctx.moveTo(ox, oy - sz * 0.6); ctx.lineTo(ox + sz * 0.7, oy);
                        ctx.lineTo(ox, oy + sz * 0.6); ctx.lineTo(ox - sz * 0.7, oy);
                        ctx.closePath(); ctx.fill();
                    }
                }
                // vay lung (gai) chay doc song lung
                ctx.fillStyle = "#66BB6A";
                for (let i = 1; i < pts.length - 1; i += 2) {
                    let p = pts[i], q = pts[i + 1];
                    let dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy) || 1;
                    let nx = -dy / d, ny = dx / d, fin = p.r * 0.55;
                    ctx.beginPath();
                    ctx.moveTo(p.x - nx * p.r * 0.7, p.y - ny * p.r * 0.7);
                    ctx.lineTo(p.x + nx * -fin + dx * 0.5, p.y + ny * -fin + dy * 0.5);
                    ctx.lineTo(q.x - nx * q.r * 0.7, q.y - ny * q.r * 0.7);
                    ctx.closePath(); ctx.fill();
                }
                ctx.restore();
            }
            // dau ran: mo ham, mat vang dong tu doc, sung cong ve sau, luoi che
            // ang = HUONG CAI MOM CHI TOI (he toa do man hinh):
            //   0 = sang PHAI, Math.PI = sang TRAI, -Math.PI/2 = LEN TREN, Math.PI/2 = XUONG DUOI
            // Sprite ve trong he cuc bo co mom o -x (tuc mom quay sang TRAI khi chua xoay),
            // nen phai bu them PI o day. Nguoi goi KHONG can biet den chuyen do.
            drawHead(cx, cy, ang, glow, mouth) {
                ctx.save();
                ctx.translate(cx, cy); ctx.rotate(ang + Math.PI);
                // sung cong ve sau
                ctx.fillStyle = "#1B5E20";
                for (let sgn = -1; sgn <= 1; sgn += 2) {
                    ctx.beginPath();
                    ctx.moveTo(14, sgn * 15); ctx.quadraticCurveTo(44, sgn * 30, 58, sgn * 20);
                    ctx.quadraticCurveTo(42, sgn * 20, 20, sgn * 8); ctx.closePath(); ctx.fill();
                }
                // mang co xoe
                ctx.fillStyle = "rgba(27,94,32,0.9)";
                ctx.beginPath(); ctx.ellipse(24, 0, 26, 30, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "rgba(102,187,106,0.55)";
                ctx.beginPath(); ctx.ellipse(26, 0, 18, 22, 0, 0, Math.PI * 2); ctx.fill();
                // hop so (vien)
                ctx.fillStyle = "#14401A";
                ctx.beginPath();
                ctx.moveTo(-46, 3); ctx.quadraticCurveTo(-40, -22, -8, -27);
                ctx.quadraticCurveTo(26, -30, 30, 0);
                ctx.quadraticCurveTo(26, 30, -8, 27);
                ctx.quadraticCurveTo(-40, 22, -46, 3); ctx.closePath(); ctx.fill();
                // hop so (than)
                ctx.fillStyle = glow ? "#8BC34A" : "#43A047";
                ctx.beginPath();
                ctx.moveTo(-43, 2); ctx.quadraticCurveTo(-37, -19, -7, -23);
                ctx.quadraticCurveTo(23, -26, 26, 0);
                ctx.quadraticCurveTo(23, 26, -7, 23);
                ctx.quadraticCurveTo(-37, 19, -43, 2); ctx.closePath(); ctx.fill();
                // song mui sang
                ctx.fillStyle = "rgba(197,225,165,0.5)";
                ctx.beginPath(); ctx.ellipse(-6, -13, 22, 6, -0.12, 0, Math.PI * 2); ctx.fill();
                // ham duoi (mo ra khi tan cong)
                let jaw = mouth || 0;
                ctx.save(); ctx.translate(-14, 12); ctx.rotate(jaw * 0.5);
                ctx.fillStyle = "#14401A";
                ctx.beginPath(); ctx.moveTo(-30, -6); ctx.quadraticCurveTo(-6, 14, 18, 6);
                ctx.lineTo(18, 14); ctx.quadraticCurveTo(-6, 22, -30, 2); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#7CB342";
                ctx.beginPath(); ctx.moveTo(-28, -4); ctx.quadraticCurveTo(-6, 12, 16, 5);
                ctx.lineTo(16, 11); ctx.quadraticCurveTo(-6, 19, -28, 1); ctx.closePath(); ctx.fill();
                // rang ham duoi
                ctx.fillStyle = "#FFFFFF";
                for (let t = 0; t < 3; t++) { let tx = -24 + t * 12; ctx.beginPath(); ctx.moveTo(tx, 0); ctx.lineTo(tx + 4, -8); ctx.lineTo(tx + 8, 0); ctx.closePath(); ctx.fill(); }
                ctx.restore();
                // nanh tren
                ctx.fillStyle = "#FFFFFF";
                ctx.beginPath(); ctx.moveTo(-38, 6); ctx.lineTo(-33, 24); ctx.lineTo(-28, 7); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(-22, 10); ctx.lineTo(-18, 22); ctx.lineTo(-14, 10); ctx.closePath(); ctx.fill();
                // luoi che (khi khong mo ham)
                if (!jaw && getSerpTongue()) {
                    ctx.strokeStyle = "#E53935"; ctx.lineWidth = 3; ctx.lineCap = "round";
                    ctx.beginPath(); ctx.moveTo(-40, 12); ctx.lineTo(-62, 16);
                    ctx.moveTo(-62, 16); ctx.lineTo(-74, 10); ctx.moveTo(-62, 16); ctx.lineTo(-74, 22);
                    ctx.stroke(); ctx.lineCap = "butt";
                }
                // lo mui
                ctx.fillStyle = "#14401A";
                ctx.beginPath(); ctx.ellipse(-36, -6, 3, 2, 0, 0, Math.PI * 2); ctx.fill();
                // MAT: trang vang + dong tu doc
                ctx.fillStyle = "#14401A";
                ctx.beginPath(); ctx.ellipse(-12, -8, 13, 11, -0.2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = glow ? "#FFF59D" : "#FFC107";
                ctx.beginPath(); ctx.ellipse(-12, -8, 10, 8, -0.2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "#000";
                ctx.beginPath(); ctx.ellipse(-13, -8, 2.6, 7, -0.2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "rgba(255,255,255,0.9)";
                ctx.beginPath(); ctx.arc(-16, -12, 2.4, 0, Math.PI * 2); ctx.fill();
                // lông mày gan du
                ctx.fillStyle = "#14401A";
                ctx.beginPath(); ctx.moveTo(-26, -18); ctx.lineTo(0, -22); ctx.lineTo(-2, -14); ctx.closePath(); ctx.fill();
                ctx.restore();
            }
            drawHpBar() {
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width / 2 - 160, 18, 320, 14);
                let f = Math.max(0, this.hp / this.maxHp);
                let g = ctx.createLinearGradient(canvas.width / 2 - 158, 0, canvas.width / 2 + 158, 0);
                g.addColorStop(0, "#1B5E20"); g.addColorStop(0.5, "#66BB6A"); g.addColorStop(1, "#AED581");
                ctx.fillStyle = g; ctx.fillRect(canvas.width / 2 - 158, 20, 316 * f, 10);
                ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.fillRect(canvas.width / 2 - 158, 20, 316 * f, 3);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(this.name, canvas.width / 2, 14); ctx.textAlign = "left"; ctx.restore();
            }
            draw() {
                // ---------- DANG LAN DUOI DAM LAY ----------
                if (this.poolT > 0) {
                    let warn = this.poolT <= SWAMP_WARN;
                    // bong den mo mo truot duoi mat nuoc
                    ctx.save(); ctx.globalAlpha = warn ? 0.34 : 0.20;
                    ctx.fillStyle = warn ? "#B71C1C" : "#0B2410";
                    for (let i = 0; i < 8; i++) {
                        let t = i / 8;
                        ctx.beginPath();
                        ctx.ellipse(this.poolX + 24 + t * 118, 336 + Math.sin(this.ripple * 1.6 + t * 4) * 5,
                                    24 * (1 - t * 0.6), 9 * (1 - t * 0.5), 0, 0, Math.PI * 2); ctx.fill();
                    }
                    ctx.restore();
                    // gon song lan ra tu vi tri no dang boi -> dau hieu duy nhat
                    ctx.strokeStyle = warn ? "#FF5252" : "rgba(174,213,129,0.9)"; ctx.lineWidth = warn ? 5 : 3;
                    for (let r = 0; r < 4; r++) {
                        let ph = (this.ripple * 2 + r * 0.9) % 4;
                        ctx.globalAlpha = Math.max(0, 1 - ph / 4);
                        ctx.beginPath();
                        ctx.ellipse(this.poolX, 326, 16 + ph * 16, 5 + ph * 4, 0, 0, Math.PI * 2); ctx.stroke();
                    }
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = warn ? "rgba(255,82,82,0.35)" : "rgba(174,213,129,0.28)";
                    ctx.beginPath(); ctx.ellipse(this.poolX, 326, 22, 8, 0, 0, Math.PI * 2); ctx.fill();
                    if (warn) {
                        ctx.fillStyle = frames % 8 < 4 ? "#FF1744" : "#FFEB3B";
                        ctx.beginPath(); ctx.moveTo(this.poolX, 306); ctx.lineTo(this.poolX - 11, 320); ctx.lineTo(this.poolX + 11, 320); ctx.closePath(); ctx.fill();
                    }
                    ctx.fillStyle = warn ? "#FF5252" : "#AED581"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(warn ? "SAP TROI LEN!" : "GON SONG - NO O DAY", this.poolX, warn ? 294 : 300); ctx.textAlign = "left";
                    this.drawHpBar();
                    return;
                }

                // ---------- PHA TROI LEN: than uon cong chui len tu mat nuoc ----------
                if (this.state === 'gs_surface') {
                    let hx = this.headX, hy = this.headY;
                    // song + bot nuoc
                    ctx.strokeStyle = "rgba(174,213,129,0.7)"; ctx.lineWidth = 3;
                    for (let r = 0; r < 3; r++) {
                        ctx.beginPath(); ctx.ellipse(this.poolX, 326, 26 + r * 20 + Math.sin(this.ripple * 2 + r) * 5, 7 + r * 3, 0, 0, Math.PI * 2); ctx.stroke();
                    }
                    // than: cong tu duoi nuoc len toi dau
                    let pts = [], N = 34;
                    for (let i = 0; i <= N; i++) {
                        let t = i / N;
                        pts.push({
                            x: hx + Math.sin(frames * 0.07 + t * 3.4) * 13 * t + t * t * 34,
                            y: hy + (392 - hy) * t,
                            r: 29 * (1 - 0.42 * t)
                        });
                    }
                    let above = pts.filter(p => p.y <= 330), below = pts.filter(p => p.y > 330);
                    if (below.length) this.drawTube(below, 0.28);      // phan chim: bong mo duoi nuoc
                    if (above.length) this.drawTube(above);
                    // vua troi len: mom nguoc THANG LEN TROI; sau do quay sang nham nguoi choi
                    let ang = -Math.PI / 2 + Math.sin(frames * 0.08) * 0.14;
                    if (this.surfT > 16) ang = Math.atan2((dino.y + dino.h / 2) - hy, (dino.x + dino.w / 2) - hx);
                    this.aimAng = ang;
                    this.drawHead(hx, hy, ang, this.surfT < 20, this.surfT < 26 ? 1 : 0.25);
                    // giot nuoc van ra
                    ctx.fillStyle = "rgba(197,225,165,0.8)";
                    for (let d = 0; d < 11; d++) {
                        let a2 = d * 0.62 + this.surfT * 0.12;
                        let rr = 18 + this.surfT * 1.7 + d * 5;
                        let dx2 = this.poolX + Math.cos(a2) * rr, dy2 = 322 - Math.abs(Math.sin(a2)) * (48 - this.surfT * 0.42);
                        if (dy2 < 322) ctx.fillRect(dx2, dy2, 3, 7);
                    }
                    if (this.surfT < 26) {
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("TROI LEN!", hx, hy - 52); ctx.textAlign = "left";
                    }
                    this.drawHpBar();
                    return;
                }

                // ---------- TRANG THAI THUONG ----------
                let sx = this.headX, sy = this.headY;
                let charging = this.state === 'gs_charge';
                let blink = charging && this.subTimer >= 90 && frames % 6 < 3;
                let lunging = this.state === 'gs_lunge';
                // than trai dai ve ben phai, uon song
                let amp = lunging ? 26 : 15;
                this.drawTube(this.spine(sx, sy, 690, amp, frames * 0.06));
                // dau huong ve phia nguoi choi
                // huong tu DAU toi NGUOI CHOI. Nguoi choi o ben trai => aim ~ PI.
                // Chi quay 55% tu tu the nghi (nhin thang sang trai = PI) de dau khong lac qua manh.
                let aim = Math.atan2((dino.y + dino.h / 2) - sy, ((dino.x + dino.w / 2) - sx) || -1);
                let dev = aim - Math.PI;
                while (dev > Math.PI) dev -= Math.PI * 2;
                while (dev < -Math.PI) dev += Math.PI * 2;
                let ang = Math.PI + dev * 0.55;
                if (lunging) ang = Math.PI;      // lao thang sang trai
                this.aimAng = ang;
                this.drawHead(sx, sy, ang, blink || charging, lunging ? 1 : (this.state === 'gs_barrage' ? 0.6 : 0));
                // hao quang khi nap chieu
                if (charging) {
                    ctx.save();
                    ctx.globalAlpha = 0.5 + 0.35 * Math.sin(frames * 0.3);
                    ctx.fillStyle = blink ? "#FFEB3B" : "#FF7043";
                    ctx.beginPath(); ctx.arc(sx - 34, sy + 6, 12 + Math.sin(frames * 0.35) * 4, 0, Math.PI * 2); ctx.fill();
                    ctx.restore();
                    ctx.strokeStyle = blink ? "rgba(255,235,59,0.95)" : "rgba(255,0,0,0.5)"; ctx.lineWidth = blink ? 7 : 3;
                    ctx.beginPath(); ctx.moveTo(sx - 40, this.laserY); ctx.lineTo(0, this.laserY); ctx.stroke();
                } else if (this.state === 'gs_laser') {
                    let g = ctx.createLinearGradient(0, this.laserY - 24, 0, this.laserY + 24);
                    g.addColorStop(0, "rgba(255,23,68,0)"); g.addColorStop(0.5, "rgba(255,23,68,0.85)"); g.addColorStop(1, "rgba(255,23,68,0)");
                    ctx.fillStyle = g; ctx.fillRect(0, this.laserY - 24, sx - 30, 48);
                    ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fillRect(0, this.laserY - 7, sx - 30, 14);
                    ctx.fillStyle = "rgba(255,241,118,0.9)";
                    for (let k = 0; k < 7; k++) {
                        let px = (sx - 40) - ((frames * 14 + k * 130) % (sx + 40));
                        ctx.fillRect(px, this.laserY - 13 + (k % 3) * 9, 16, 4);
                    }
                }
                this.drawHpBar();
            }
        }
// BOSS_PART_END s0.GreatSerpentBoss.1

// Nguồn: index.html:24226 · Dùng bởi: GreatSerpentBoss
// BOSS_PART_BEGIN s0.SWAMP_DIVE_CD.1 EDITABLE
const SWAMP_DIVE_CD = 380;
// BOSS_PART_END s0.SWAMP_DIVE_CD.1

// Nguồn: index.html:24227 · Dùng bởi: GreatSerpentBoss
// BOSS_PART_BEGIN s0.SWAMP_DIVE_JITTER.1 EDITABLE
const SWAMP_DIVE_JITTER = 30;
// BOSS_PART_END s0.SWAMP_DIVE_JITTER.1

// Nguồn: index.html:24228 · Dùng bởi: GreatSerpentBoss
// BOSS_PART_BEGIN s0.SWAMP_SWIM.1 EDITABLE
const SWAMP_SWIM = 90;
// BOSS_PART_END s0.SWAMP_SWIM.1

// Nguồn: index.html:24229 · Dùng bởi: GreatSerpentBoss
// BOSS_PART_BEGIN s0.SWAMP_WARN.1 EDITABLE
const SWAMP_WARN = 40;
// BOSS_PART_END s0.SWAMP_WARN.1

// Nguồn: index.html:24231 · Dùng bởi: GreatSerpentBoss
// BOSS_PART_BEGIN s0.getSerpTongue.1 EDITABLE
function getSerpTongue() { return frames % 46 < 12; }
// BOSS_PART_END s0.getSerpTongue.1

// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
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
