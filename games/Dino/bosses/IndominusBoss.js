// BOSS_FILE: IndominusBoss
// BOSS_SNAPSHOT: 3cf4652cd737d36361a15b25712b9a3ff21a9a13bbe8337913bcf233f06c6a1d
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, ctx, dino, dojoMode, frames, parry, pickFromBag, shakeTimer
// Nguồn: index.html:3684 · Dùng bởi: IndominusBoss
// BOSS_PART_BEGIN s0.IndominusBoss.1 EDITABLE
class IndominusBoss {
            constructor(level) {
                this.hp = 75; this.maxHp = 75; this.name = "INDOMINUS REX"; this.retState = 'idle';
                this.w = 128; this.h = 92; this.baseX = canvas.width - 200; this.baseY = 320 - this.h;
                this.x = canvas.width; this.y = this.baseY; this.state = 'entering'; this.actionTimer = 65; this.subTimer = 0;
                this.lastSkill = ''; this.lastMeleeHit = -1; this.burnTimer = 0; this.alpha = 1; this.warnX = 400; this.dir = -1;
                this.fullH = 92; this.crouch = 0;   // 0 = dung thang, 1 = cui sat dat de nup trong co
            }
            pcX() { return dino.x + dino.w / 2; }
            pickSkill() {
                let sk = ['ir_cloak', 'ir_charge', 'ir_spikes', 'ir_roar'];
                this.state = pickFromBag(this, sk); this.subTimer = 0;
            }
            update() {
                // ===== DONG CO CAO =====
                // Co la MOI TRUONG THUAN TUY: dan bay XUYEN QUA, khong ton dan, khong co "mau".
                // (Co che ban rap co da bo: no thien vi nang cac loai dan xuyen va phat
                //  vo ly cac loai dan ban nhanh - cung mot hanh dong ma hieu qua khac han.)
                // Cach doc vi tri: co hoi xuyen thau + bong con vat mo -> hai lop bu tru, thay bong mo.
                if (typeof grassField !== 'undefined' && grassField.length) {
                    let _bodyCx = this.x + this.w / 2;
                    for (let _gp of grassField) {
                        // than boss di qua -> co re ra, do re tang dan toi TOI DA 10
                        if (Math.abs(_gp.x - _bodyCx) < this.w * 0.6) _gp.sway = Math.min(10, _gp.sway + (10 - _gp.sway) * 0.4 + 0.6);
                        else _gp.sway *= 0.88;
                        if (_gp.sway > 10) _gp.sway = 10;
                        if (_gp.sway < 0.05) _gp.sway = 0;
                    }
                    this._grassHidden = this.alpha < 0.5;
                }

                // CUI XUONG khi tang hinh: ha thap than de bui co che kin
                let _wantCrouch = ((this.state || '').indexOf('cloak') >= 0) ? 1 : 0;
                this.crouch += (_wantCrouch - this.crouch) * 0.14;
                if (this.crouch < 0.004) this.crouch = 0;
                if (this.crouch > 0.996) this.crouch = 1;
                this.h = Math.round(this.fullH - 40 * this.crouch);   // 92 -> 52px khi cui het
                this.baseY = 320 - this.h;
                this.y = this.baseY;
                if (this.state === 'entering') {
                    this.x -= 8; if (this.x <= this.baseX) { this.x = this.baseX; this.alpha = 1; this.state = 'idle'; this.actionTimer = 50; }
                } else if (this.state === 'idle') {
                    this.alpha += (1 - this.alpha) * 0.25; this.actionTimer--; if (this.actionTimer <= 0) this.pickSkill();
                } else if (this.state === 'ir_cloak') {
                    this.subTimer++; this.alpha += (0.34 - this.alpha) * 0.12;   // tang hinh: mo ~0.34, du de lo bong qua tan co xuyen thau
                    let side = this.pcX() < 400 ? 250 : -250, tx = Math.max(10, Math.min(canvas.width - this.w - 10, this.pcX() + side - this.w / 2));
                    this.x += (tx - this.x) * 0.08;
                    if (this.subTimer > 70) { this.warnX = this.x + this.w / 2; this.state = 'ir_cloak_warn'; this.subTimer = 0; }
                } else if (this.state === 'ir_cloak_warn') {
                    this.subTimer++; this.alpha += (0.42 - this.alpha) * 0.1;
                    if (this.subTimer >= 45) { this.state = 'ir_cloak_strike'; this.subTimer = 0; this.dir = this.pcX() > this.x + this.w / 2 ? 1 : -1; }
                } else if (this.state === 'ir_cloak_strike') {
                    this.subTimer++; this.alpha += (1 - this.alpha) * 0.4; this.x += this.dir * 27;
                    if (this.subTimer > 28 || this.x < -this.w || this.x > canvas.width) this.state = 'ir_return';
                } else if (this.state === 'ir_return') {
                    this.alpha = 1; this.x += (this.baseX - this.x) * 0.12; if (Math.abs(this.x - this.baseX) < 12) { this.x = this.baseX; this.state = 'idle'; this.actionTimer = 55; }
                } else if (this.state === 'ir_charge') {
                    this.subTimer++;
                    if (this.subTimer < 42) this.x += (this.baseX + 26 - this.x) * 0.1;
                    else if (this.subTimer < 92) { this.x -= 25; if (this.x < -this.w) { this.x = canvas.width + 30; this.state = 'ir_charge_back'; } }
                } else if (this.state === 'ir_charge_back') {
                    this.x -= 13; if (this.x <= this.baseX) { this.x = this.baseX; this.state = 'idle'; this.actionTimer = 55; }
                } else if (this.state === 'ir_spikes') {
                    this.subTimer++;
                    if (this.subTimer % 20 === 1 && this.subTimer < 100) { let sx = this.x + 14, sy = this.y + 26, dx = this.pcX() - sx, dy = (dino.y + dino.h / 2) - sy, ba = Math.atan2(dy, dx); for (let k = -1; k <= 1; k++) { let ang = ba + k * 0.2; let bp = new BossProjectile(sx, sy, Math.cos(ang) * 8, Math.sin(ang) * 8, false, 1); bp.color = "#ECEFF1"; bossProjectiles.push(bp); } }
                    if (this.subTimer > 120) { this.state = 'idle'; this.actionTimer = 55; }
                } else if (this.state === 'ir_roar') {
                    this.subTimer++;
                    if (this.subTimer === 42) { shakeTimer = 22;
                        // SONG AM: vong xung lan ra tu mom, khong con la cuc vuong trang bo cham
                        let bp = new BossProjectile(this.x, 250, -12.5, 0, false, 1);
                        bp.w = 34; bp.h = 96; bp.color = "#E1F5FE"; bp.sonic = true; bossProjectiles.push(bp);
                        if (SFX.bossExplode) SFX.bossExplode();
                    }
                    if (this.subTimer > 80) { this.state = 'idle'; this.actionTimer = 55; }
                }
            }
            draw() {
                ctx.save(); ctx.globalAlpha = Math.max(0.26, this.alpha);   // luon con bong mo toi thieu de doc vi tri
                // nen sprite theo do cui, chan van dung tren mat dat
                let _sc = this.h / this.fullH;
                if (_sc < 0.999) { ctx.translate(0, 320); ctx.scale(1, _sc); ctx.translate(0, -320); }
                let x = this.x, y = 320 - this.fullH, W = this.w, H = this.fullH;
                // ===== THIET KE: than lai giua T-Rex va Raptor - lung cong, dau dai,
                // gai xuong doc song lung, chi truoc co vuot dai. Nhin nghieng, huong sang TRAI.
                const IOUT = "#5A6A72", ISKIN = "#ECEFF1", IDARK = "#B0BEC5", IMID = "#CFD8DC";
                let iBr = Math.sin(frames * 0.06) * 1.6;

                // --- DUOI dai thang can bang ---
                ctx.fillStyle = IDARK;
                ctx.beginPath(); ctx.moveTo(x + W - 46, y + 36 + iBr);
                ctx.quadraticCurveTo(x + W + 4, y + 30, x + W + 30, y + 12);
                ctx.quadraticCurveTo(x + W + 2, y + 44, x + W - 44, y + 56 + iBr);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = IOUT; ctx.lineWidth = 2.5; ctx.stroke();

                // --- CHAN SAU ---
                ctx.fillStyle = IDARK;
                ctx.beginPath(); ctx.moveTo(x + W - 74, y + 44); ctx.quadraticCurveTo(x + W - 40, y + 50, x + W - 46, y + H - 16);
                ctx.lineTo(x + W - 62, y + H - 16); ctx.quadraticCurveTo(x + W - 78, y + 66, x + W - 82, y + 46); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = IOUT; ctx.lineWidth = 2.5; ctx.stroke();
                ctx.fillStyle = IMID; ctx.fillRect(x + W - 62, y + H - 18, 15, 14);
                ctx.fillStyle = IDARK; ctx.fillRect(x + W - 66, y + H - 6, 25, 6);
                ctx.fillStyle = "#FFFFFF";
                for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x + W - 64 + k * 8, y + H);
                    ctx.lineTo(x + W - 68 + k * 8, y + H - 8); ctx.lineTo(x + W - 58 + k * 8, y + H - 7); ctx.closePath(); ctx.fill(); }

                // --- THAN: lung cong, nguc sau ---
                ctx.fillStyle = ISKIN;
                ctx.beginPath();
                ctx.moveTo(x + 26, y + 40 + iBr);
                ctx.quadraticCurveTo(x + 70, y + 14 + iBr, x + W - 56, y + 30 + iBr);
                ctx.quadraticCurveTo(x + W - 32, y + 50, x + W - 48, y + 74);
                ctx.quadraticCurveTo(x + 80, y + 84, x + 34, y + 68);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = IOUT; ctx.lineWidth = 3; ctx.stroke();
                ctx.fillStyle = IMID;
                ctx.beginPath(); ctx.ellipse(x + 74, y + 62, 34, 13, -0.05, 0, Math.PI * 2); ctx.fill();
                // van soc mo
                ctx.strokeStyle = "rgba(90,106,114,0.35)"; ctx.lineWidth = 3;
                for (let k = 0; k < 5; k++) { ctx.beginPath();
                    ctx.moveTo(x + 46 + k * 15, y + 26 + iBr); ctx.lineTo(x + 40 + k * 15, y + 46 + iBr); ctx.stroke(); }

                // --- GAI XUONG doc song lung ---
                ctx.fillStyle = "#90A4AE";
                for (let i = 0; i < 7; i++) {
                    let t = i / 6, sx2 = x + 34 + t * (W - 94);
                    let hgt = 10 + Math.sin(t * Math.PI) * 16;
                    ctx.beginPath(); ctx.moveTo(sx2 - 6, y + 30 + iBr - t * 4);
                    ctx.quadraticCurveTo(sx2, y + 30 + iBr - t * 4 - hgt, sx2 + 6, y + 28 + iBr - t * 4);
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = IOUT; ctx.lineWidth = 1.6; ctx.stroke();
                }

                // --- CHI TRUOC co vuot dai ---
                ctx.fillStyle = IDARK;
                ctx.beginPath(); ctx.moveTo(x + 40, y + 54); ctx.quadraticCurveTo(x + 26, y + 64, x + 20, y + 78);
                ctx.quadraticCurveTo(x + 34, y + 70, x + 46, y + 66); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = IOUT; ctx.lineWidth = 2; ctx.stroke();
                ctx.fillStyle = "#FFFFFF";
                for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x + 21, y + 77 - k * 5);
                    ctx.lineTo(x + 8, y + 80 - k * 6); ctx.lineTo(x + 21, y + 82 - k * 5); ctx.closePath(); ctx.fill(); }
                // chan truoc (dung dat)
                ctx.fillStyle = IMID; ctx.fillRect(x + 46, y + H - 20, 15, 16);
                ctx.fillStyle = IDARK; ctx.fillRect(x + 42, y + H - 6, 25, 6);
                ctx.fillStyle = "#FFFFFF";
                for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x + 44 + k * 8, y + H);
                    ctx.lineTo(x + 40 + k * 8, y + H - 8); ctx.lineTo(x + 50 + k * 8, y + H - 7); ctx.closePath(); ctx.fill(); }

                // --- CO + DAU dai, ham day rang ---
                ctx.fillStyle = ISKIN;
                ctx.beginPath(); ctx.moveTo(x + 34, y + 40 + iBr); ctx.quadraticCurveTo(x + 22, y + 26, x + 24, y + 14);
                ctx.quadraticCurveTo(x + 40, y + 16, x + 46, y + 38 + iBr); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = IOUT; ctx.lineWidth = 2.5; ctx.stroke();
                ctx.fillStyle = ISKIN;
                ctx.beginPath();
                ctx.moveTo(x + 42, y + 8); ctx.quadraticCurveTo(x + 12, y + 2, x - 6, y + 16);
                ctx.quadraticCurveTo(x - 10, y + 26, x + 2, y + 30);
                ctx.lineTo(x + 30, y + 34); ctx.quadraticCurveTo(x + 46, y + 30, x + 46, y + 20);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = IOUT; ctx.lineWidth = 3; ctx.stroke();
                ctx.fillStyle = IDARK;
                ctx.beginPath(); ctx.moveTo(x - 4, y + 27); ctx.quadraticCurveTo(x + 12, y + 38, x + 34, y + 36);
                ctx.lineTo(x + 34, y + 42); ctx.quadraticCurveTo(x + 10, y + 44, x - 7, y + 33); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FFFFFF";
                for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(x - 2 + k * 9, y + 29);
                    ctx.lineTo(x + 1 + k * 9, y + 38); ctx.lineTo(x + 4 + k * 9, y + 29); ctx.closePath(); ctx.fill(); }
                // sung nho tren mom
                ctx.fillStyle = "#90A4AE";
                ctx.beginPath(); ctx.moveTo(x + 6, y + 12); ctx.lineTo(x + 2, y + 2); ctx.lineTo(x + 14, y + 10); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(x + 22, y + 6); ctx.lineTo(x + 20, y - 4); ctx.lineTo(x + 32, y + 6); ctx.closePath(); ctx.fill();
                // mat do
                ctx.fillStyle = "#37474F"; ctx.fillRect(x + 12, y + 14, 10, 9);
                ctx.fillStyle = "#D50000"; ctx.fillRect(x + 13, y + 15, 8, 7);
                ctx.fillStyle = "#000"; ctx.fillRect(x + 16, y + 16, 3, 5);
                ctx.restore();

                // ===== CO HOI XUYEN THAU ve de len than boss =====
                // Co ve o alpha ~0.68 (khong che kin). Khi boss tang hinh no cung mo di.
                // Hai lop xuyen thau BU TRU nhau: qua tan co ban trong, bong con vat mo hien ra
                // -> nguoi choi doc vi tri bang cai BONG MO do, khong con ngon co loe vang.
                if (typeof grassField !== 'undefined' && grassField.length) {
                    ctx.save(); ctx.globalAlpha = 0.68;
                    for (let _gp of grassField) {
                        let bend = Math.sin(frames * 0.04 + _gp.x * 0.02) * 3 + _gp.sway;
                        ctx.strokeStyle = "#1B5E20"; ctx.lineWidth = 5;
                        for (let b2 = -1; b2 <= 1; b2++) { ctx.beginPath();
                            ctx.moveTo(_gp.x + b2 * 9, 322);
                            ctx.quadraticCurveTo(_gp.x + b2 * 9 + bend * 0.5, 322 - _gp.h * 0.6, _gp.x + b2 * 9 + bend, 322 - _gp.h); ctx.stroke(); }
                        ctx.strokeStyle = "#2E7D32"; ctx.lineWidth = 3;
                        for (let b2 = -1; b2 <= 1; b2++) { ctx.beginPath();
                            ctx.moveTo(_gp.x + b2 * 5, 322);
                            ctx.quadraticCurveTo(_gp.x + b2 * 5 + bend * 0.55, 322 - _gp.h * 0.62, _gp.x + b2 * 5 + bend * 1.1, 322 - _gp.h + 4); ctx.stroke(); }
                        ctx.strokeStyle = "#43A047"; ctx.lineWidth = 2;
                        ctx.beginPath(); ctx.moveTo(_gp.x, 322); ctx.quadraticCurveTo(_gp.x + bend * 0.6, 322 - _gp.h * 0.65, _gp.x + bend * 1.2, 322 - _gp.h); ctx.stroke();
                    }
                    ctx.restore();
                }

                if (this.state === 'ir_cloak_warn') { ctx.strokeStyle = "rgba(255,23,68,0.6)"; ctx.lineWidth = 2; ctx.strokeRect(this.x, this.y, this.w, this.h); ctx.fillStyle = frames % 6 < 3 ? "#FF1744" : "#FFEB3B"; ctx.font = "bold 34px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("!", this.warnX, this.y - 8); ctx.textAlign = "left"; }
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width / 2 - 160, 18, 320, 14);
                ctx.fillStyle = "#ECEFF1"; ctx.fillRect(canvas.width / 2 - 158, 20, 316 * Math.max(0, this.hp / this.maxHp), 10);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText(this.name, canvas.width / 2, 14); ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s0.IndominusBoss.1

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

// Nguồn: index.html:34718 · Dùng bởi: IndominusBoss, IronhaulBoss
// BOSS_PART_BEGIN s1.grassField.1 READ_ONLY
let grassField = [];
// BOSS_PART_END s1.grassField.1

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
