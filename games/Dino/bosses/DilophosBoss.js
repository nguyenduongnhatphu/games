// BOSS_FILE: DilophosBoss
// BOSS_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, frames, parry, pickFromBag, shakeTimer, visualEffects
// Nguồn: index.html:24234 · Dùng bởi: DilophosBoss
// BOSS_PART_BEGIN s0.DilophosBoss.1 EDITABLE
class DilophosBoss {
            constructor(level) {
                this.maxHp = 75; this.hp = 75; this.name = "DILOPHOS PRIME";
                this.w = 120; this.h = 96; this.baseX = canvas.width - 240; this.baseY = 320 - this.h;
                this.x = canvas.width + 40; this.y = this.baseY;
                this.state = 'entering'; this.actionTimer = 80; this.subTimer = 0; this.lastSkill = '';
                this.lastMeleeHit = -1; this.burnTimer = 0;
                this.pounceCount = 0; this.pounceHigh = false; this.frillGlow = 0;
            }
            pickSkill() {
                let sk = ['dil_volley', 'dil_quake', 'dil_pounce', 'dil_stream'];
                let c = pickFromBag(this, sk); this.subTimer = 0; this.state = c;
                if (c === 'dil_pounce') this.pounceCount = 0;
            }
            update() {
                if (this.state === 'entering') {
                    this.x -= 5; if (this.x <= this.baseX) { this.x = this.baseX; this.state = 'idle'; this.actionTimer = 55; }
                } else if (this.state === 'idle') {
                    this.x = this.baseX; this.y = this.baseY;
                    this.actionTimer--; if (this.actionTimer <= 0) this.pickSkill();
                }
                // VENOM VOLLEY: 3 tia doc 3 do cao -> DO KHIEN hoac len platform
                else if (this.state === 'dil_volley') {
                    this.subTimer++;
                    if (this.subTimer === 42) { [262, 290, 318].forEach(yy => { let p = new BossProjectile(this.x, yy, -11, 0, false, 1); p.color = "#AA00FF"; bossProjectiles.push(p); }); }
                    if (this.subTimer > 82) { this.state = 'idle'; this.actionTimer = 50; }
                }
                // FRILL QUAKE: rung mat dat ~2s -> bat buoc LEN PLATFORM (nhay khong du)
                else if (this.state === 'dil_quake') {
                    this.subTimer++;
                    // 0-40: dao xuong dat
                    if (this.subTimer <= 40) { this.frillGlow = this.subTimer; this.y = this.baseY + (this.subTimer / 40) * 110;
                        if (this.subTimer === 40) { this.moundX = this.x + this.w/2; shakeTimer = 16; } }
                    // 40-160 (2 giay): u dat DI THEO nguoi choi
                    else if (this.subTimer <= 160) {
                        this.y = this.baseY + 130;
                        let tx = dino.x + dino.w/2;
                        let mspd = this.subTimer > 130 ? 1.1 : 9.0;      // 0.5 giay cuoi: cham han lai -> ne duoc
                        this.moundX += Math.sign(tx - this.moundX) * Math.min(mspd, Math.abs(tx - this.moundX));
                        shakeTimer = Math.max(shakeTimer, 4);
                        if (checkAABB(dino, { x: this.moundX - 40, y: 296, w: 80, h: 30 })) { if (!dino.isShielding()) { if (frames % 14 === 0) dino.takeDamage(1); } else parry(); }
                    }
                    // 160-200: TROI LEN -> cot dat bat cao, tren la cay cung dinh
                    else if (this.subTimer <= 200) {
                        if (this.subTimer === 161) { shakeTimer = 40; this.x = Math.max(10, Math.min(canvas.width - this.w - 10, this.moundX - this.w/2)); SFX.bossSkill && SFX.bossSkill();
                            for (let k = 0; k < 5; k++) visualEffects.push(new Effect(this.moundX + (Math.random()-0.5)*90, 300 - Math.random()*120, 'explosion', true, 26)); }
                        this.y = this.baseY + 130 - ((this.subTimer - 160) / 40) * 130;
                        if (this.subTimer < 186 && checkAABB(dino, { x: this.moundX - 52, y: 130, w: 104, h: 195 })) { if (!dino.isShielding()) { if (frames % 14 === 0) dino.takeDamage(1); } else parry(); }
                    }
                    else { this.y = this.baseY; this.frillGlow = 0; this.state = 'idle'; this.actionTimer = 55; }
                }
                // POUNCE HUNT: nhay den vi tri nguoi choi (2 lan), doc lai moi lan -> phai DOI TANG
                else if (this.state === 'dil_pounce') {
                    this.subTimer++;
                    if (this.subTimer === 1) this.pounceHigh = (dino.y + dino.h / 2) < 240;
                    if (this.subTimer <= 30) { this.x += (this.baseX - this.x) * 0.16; this.y += (this.baseY - this.y) * 0.16;
                        if (Math.abs(this.baseX - this.x) < 2) this.x = this.baseX; if (Math.abs(this.baseY - this.y) < 2) this.y = this.baseY; }   // lui ve TU TU, khong bat vi tri
                    else if (this.subTimer <= 52) {
                        // Truoc day tx viet cung = 70 nen nguoi choi chi can ngoi o sat mep trai
                        // (x < 70) la cu vo khong bao gio toi. Gio BAM THEO nguoi choi, chi chan
                        // lai o mep ban do.
                        let tx = Math.max(8, Math.min(this.baseX - 60, (dino.x + dino.w/2) - this.w/2));
                        let ty = this.pounceHigh ? 128 : this.baseY;
                        this.x += (tx - this.x) * 0.28; this.y += (ty - this.y) * 0.28;
                    }
                    else if (this.subTimer > 66) { this.pounceCount++; if (this.pounceCount < 2) { this.subTimer = 0; this.pounceHigh = (dino.y + dino.h/2) < 240; } else this.state = 'dil_return'; }
                }
                else if (this.state === 'dil_return' || this.state === 'returning') {
                    this.x += (this.baseX - this.x) * 0.2; this.y += (this.baseY - this.y) * 0.2;
                    if (Math.abs(this.x - this.baseX) < 8) { this.x = this.baseX; this.y = this.baseY; this.state = 'idle'; this.actionTimer = 55; }
                }
                // VENOM STREAM: loat tia ngang TAM DAU -> NGOI ne
                else if (this.state === 'dil_stream') {
                    this.subTimer++;
                    if (this.subTimer >= 20 && this.subTimer <= 80 && this.subTimer % 12 === 0) { let p = new BossProjectile(this.x, 262, -13, 0, false, 1); p.color = "#E040FB"; bossProjectiles.push(p); }
                    if (this.subTimer > 105) { this.state = 'idle'; this.actionTimer = 52; }
                }
            }
            draw() {
                let x = this.x, y = this.y, glow = this.frillGlow > 0; ctx.save();
                if (this.state === 'dil_quake' && this.subTimer > 40) {
                    if (this.subTimer <= 160) {
                        ctx.fillStyle = "#5D4037"; ctx.beginPath(); ctx.ellipse(this.moundX, 316, 42, 16, 0, 0, Math.PI*2); ctx.fill();
                        ctx.fillStyle = "#8D6E63"; ctx.beginPath(); ctx.ellipse(this.moundX, 310, 26, 11, 0, 0, Math.PI*2); ctx.fill();
                        ctx.strokeStyle = "#FFB74D"; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(this.moundX, 316, 42, 16, 0, 0, Math.PI*2); ctx.stroke();
                        ctx.fillStyle = "#FFD54F"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("SAP TROI LEN " + Math.max(0, Math.ceil((161 - this.subTimer) / 60)) + "s", this.moundX, 288); ctx.textAlign = "left";
                    } else if (this.subTimer < 186) {
                        ctx.fillStyle = "rgba(141,110,99,0.9)"; ctx.fillRect(this.moundX - 52, 130, 104, 195);
                        ctx.fillStyle = "#A1887F"; ctx.fillRect(this.moundX - 26, 130, 52, 195);
                    }
                }
                // ===== THIET KE: hinh dac trung cua Dilophosaurus la DOI MAO DAU
                // va cai MANG CO xoe ra khi phun doc. Ban cu khong co ca hai.
                const DOUT = "#0F2E0C";
                let legA = (this.state === 'dil_pounce' && frames % 8 < 4) ? -6 : 0;
                let legB = (this.state === 'dil_pounce' && frames % 8 >= 4) ? -6 : 0;
                let spit = (this.state === 'dil_volley' || this.state === 'dil_stream');
                let dBr = Math.sin(frames * 0.07) * 1.5;

                // --- DUOI thon ---
                ctx.fillStyle = "#1B5E20";
                ctx.beginPath(); ctx.moveTo(x + 92, y + 44 + dBr);
                ctx.quadraticCurveTo(x + 124, y + 46, x + 142, y + 62);
                ctx.quadraticCurveTo(x + 118, y + 60, x + 94, y + 66 + dBr);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = DOUT; ctx.lineWidth = 2.5; ctx.stroke();

                // --- CHAN SAU (2 tong, tao chieu sau) ---
                ctx.fillStyle = "#1B5E20";
                ctx.beginPath(); ctx.moveTo(x + 66, y + 62); ctx.quadraticCurveTo(x + 92, y + 66, x + 88, y + 84 + legB);
                ctx.lineTo(x + 74, y + 84 + legB); ctx.quadraticCurveTo(x + 66, y + 74, x + 62, y + 64); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#2E7D32"; ctx.fillRect(x + 74, y + 80 + legB, 12, 14);
                ctx.fillStyle = "#1B5E20"; ctx.fillRect(x + 70, y + 92 + legB, 22, 4);
                ctx.fillStyle = "#33691E";
                ctx.beginPath(); ctx.moveTo(x + 40, y + 60); ctx.quadraticCurveTo(x + 66, y + 66, x + 62, y + 84 + legA);
                ctx.lineTo(x + 48, y + 84 + legA); ctx.quadraticCurveTo(x + 38, y + 74, x + 36, y + 62); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = DOUT; ctx.lineWidth = 2.5; ctx.stroke();
                ctx.fillStyle = "#558B2F"; ctx.fillRect(x + 48, y + 80 + legA, 13, 14);
                ctx.fillStyle = "#1B5E20"; ctx.fillRect(x + 44, y + 92 + legA, 23, 4);
                ctx.fillStyle = "#DCEDC8";
                for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x + 45 + k * 8, y + 96 + legA);
                    ctx.lineTo(x + 42 + k * 8, y + 90 + legA); ctx.lineTo(x + 50 + k * 8, y + 91 + legA); ctx.closePath(); ctx.fill(); }

                // --- THAN ---
                ctx.fillStyle = "#33691E";
                ctx.beginPath(); ctx.moveTo(x + 28, y + 44 + dBr);
                ctx.quadraticCurveTo(x + 58, y + 26 + dBr, x + 96, y + 42 + dBr);
                ctx.quadraticCurveTo(x + 104, y + 60, x + 92, y + 70);
                ctx.quadraticCurveTo(x + 56, y + 78, x + 32, y + 66);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = DOUT; ctx.lineWidth = 3; ctx.stroke();
                ctx.fillStyle = "#558B2F";
                ctx.beginPath(); ctx.ellipse(x + 60, y + 58, 26, 12, -0.06, 0, Math.PI * 2); ctx.fill();
                // van soc tren lung
                ctx.strokeStyle = "rgba(15,46,12,0.5)"; ctx.lineWidth = 3;
                for (let k = 0; k < 4; k++) { ctx.beginPath();
                    ctx.moveTo(x + 42 + k * 14, y + 38 + dBr); ctx.lineTo(x + 38 + k * 14, y + 52 + dBr); ctx.stroke(); }

                // --- TAY NHO co vuot ---
                ctx.fillStyle = "#1B5E20";
                ctx.beginPath(); ctx.moveTo(x + 34, y + 50); ctx.quadraticCurveTo(x + 22, y + 58, x + 20, y + 70);
                ctx.quadraticCurveTo(x + 30, y + 62, x + 38, y + 60); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#DCEDC8";
                for (let k = 0; k < 2; k++) { ctx.beginPath(); ctx.moveTo(x + 21, y + 69 - k * 5);
                    ctx.lineTo(x + 13, y + 71 - k * 6); ctx.lineTo(x + 21, y + 74 - k * 5); ctx.closePath(); ctx.fill(); }

                // --- MANG CO xoe ra khi phun doc (dac trung Dilophosaurus) ---
                if (spit || glow) {
                    let fr = spit ? 1 : 0.45;
                    ctx.fillStyle = "rgba(255,152,0," + (0.35 + fr * 0.4) + ")";
                    ctx.beginPath(); ctx.moveTo(x + 24, y + 30);
                    ctx.quadraticCurveTo(x + 6, y + 6 - fr * 12, x - 10, y + 16 - fr * 8);
                    ctx.quadraticCurveTo(x - 6, y + 40, x + 8, y + 50);
                    ctx.quadraticCurveTo(x + 2, y + 66 + fr * 8, x + 18, y + 62);
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#E65100"; ctx.lineWidth = 2; ctx.stroke();
                    ctx.strokeStyle = "rgba(255,224,130,0.7)"; ctx.lineWidth = 1.5;
                    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x + 20, y + 40);
                        ctx.lineTo(x - 4 + k * 6, y + 14 - fr * 6 + k * 12); ctx.stroke(); }
                }

                // --- CO + DAU ---
                ctx.fillStyle = "#558B2F";
                ctx.beginPath(); ctx.moveTo(x + 34, y + 44 + dBr); ctx.quadraticCurveTo(x + 20, y + 34, x + 18, y + 22);
                ctx.quadraticCurveTo(x + 34, y + 22, x + 40, y + 42 + dBr); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = DOUT; ctx.lineWidth = 2.5; ctx.stroke();
                ctx.fillStyle = "#33691E";
                ctx.beginPath(); ctx.moveTo(x + 30, y + 18); ctx.quadraticCurveTo(x + 4, y + 14, x - 8, y + 26);
                ctx.quadraticCurveTo(x - 4, y + 36, x + 10, y + 38);
                ctx.lineTo(x + 30, y + 40); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = DOUT; ctx.lineWidth = 2.5; ctx.stroke();
                // ham duoi
                ctx.fillStyle = "#1B5E20";
                ctx.beginPath(); ctx.moveTo(x - 6, y + 33); ctx.quadraticCurveTo(x + 8, y + 42, x + 26, y + 41);
                ctx.lineTo(x + 26, y + 46); ctx.quadraticCurveTo(x + 6, y + 48, x - 8, y + 38); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FFFFFF";
                for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(x - 2 + k * 9, y + 36);
                    ctx.lineTo(x + 1 + k * 9, y + 43); ctx.lineTo(x + 4 + k * 9, y + 36); ctx.closePath(); ctx.fill(); }
                // --- DOI MAO DAU: dau hieu nhan dien ro nhat ---
                for (let mo = 0; mo < 2; mo++) {
                    ctx.fillStyle = mo ? "#F57C00" : "#FF9800";
                    ctx.beginPath();
                    ctx.moveTo(x + 2 + mo * 5, y + 16);
                    ctx.quadraticCurveTo(x + 8 + mo * 5, y - 8, x + 26 + mo * 4, y - 2);
                    ctx.quadraticCurveTo(x + 20 + mo * 4, y + 10, x + 20 + mo * 5, y + 18);
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#E65100"; ctx.lineWidth = 1.8; ctx.stroke();
                }
                // mat
                ctx.fillStyle = "white"; ctx.fillRect(x + 4, y + 20, 7, 7);
                ctx.fillStyle = spit ? "#FF6D00" : "#FFD600"; ctx.fillRect(x + 5, y + 21, 5, 5);
                ctx.fillStyle = "black"; ctx.fillRect(x + 6, y + 22, 3, 3);
                ctx.fillStyle = glow ? "#FF3D00" : "#E53935";
                ctx.beginPath(); ctx.moveTo(x + 2, y + 18); ctx.lineTo(x + 10, y - 8 - (glow ? 6 : 0)); ctx.lineTo(x + 18, y + 18); ctx.fill();
                ctx.beginPath(); ctx.moveTo(x + 14, y + 18); ctx.lineTo(x + 22, y - 6 - (glow ? 6 : 0)); ctx.lineTo(x + 30, y + 18); ctx.fill();
                if (glow) { ctx.strokeStyle = "rgba(255,193,7,0.85)"; ctx.lineWidth = 2; ctx.strokeRect(x - 8, y - 16, 44, 36); }
                if (frames % 40 < 20) { ctx.fillStyle = "#AEEA00"; ctx.fillRect(x - 2, y + 42, 4, 8); }
                ctx.restore();
                if (this.state === 'dil_pounce' && this.subTimer <= 30) { let my = this.pounceHigh ? 150 : 300; ctx.fillStyle = (frames % 8 < 4) ? "rgba(255,0,0,0.5)" : "rgba(255,0,0,0.15)"; ctx.fillRect(38, my - 32, 96, 64); }
                if (this.state === 'dil_quake' && this.subTimer <= 55) { ctx.fillStyle = (frames % 8 < 4) ? "rgba(255,0,0,0.32)" : "rgba(255,0,0,0.1)"; ctx.fillRect(0, 215, canvas.width, 105); ctx.strokeStyle = "rgba(255,0,0,0.85)"; ctx.lineWidth = 3; ctx.strokeRect(1, 216, canvas.width - 2, 103); }
                if (this.state === 'dil_quake' && this.subTimer > 55 && this.subTimer < 185) { ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,87,34,0.45)" : "rgba(255,152,0,0.25)"; ctx.fillRect(0, 215, canvas.width, 105); }
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width / 2 - 160, 18, 320, 14);
                ctx.fillStyle = "#9CCC65"; ctx.fillRect(canvas.width / 2 - 158, 20, 316 * Math.max(0, this.hp / this.maxHp), 10);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText(this.name, canvas.width / 2, 14); ctx.textAlign = "left"; ctx.restore();
            }
        }
// BOSS_PART_END s0.DilophosBoss.1

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
