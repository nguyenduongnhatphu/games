// BOSS_FILE: ForestTitanBoss
// BOSS_SNAPSHOT: 39483d797c15c5e35e37a5b630ae4f295f939302db706fe13262c4e699541a28
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BossProjectile, CAM_TROI, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LT, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, currentAmmoType, dino, floatingTexts, frames, parry, parryX, pickFromBag, platforms, projectiles, shakeTimer, troiSinh, troiVy, visualEffects
// Nguồn: index.html:4174 · Dùng bởi: ForestTitanBoss
// BOSS_PART_BEGIN s0.ForestTitanBoss.1 EDITABLE
class ForestTitanBoss {
            constructor(level) {
                this.hp = 250; this.maxHp = 250;
                // BO SUNG LA CAY cho dau truong: 2 chieu moi (roi song / gai phu san) deu song nho la
                if (typeof platforms !== 'undefined') {
                    let mk = (x, w, top) => platforms.push({ x, w, top, h: 16, isLeaf: true, solid: true, leafTimer: 0, leafCd: 0, fallY: 0 });
                    let have = platforms.filter(p => p.isLeaf).length;
                    if (have < 1) mk(330, 150, 226);
                    if (have < 2) mk(660, 150, 226);   // chi CHUA 3 la nen — them nua la phe cac chieu cu
                }
                this.tier = 'colossal'; this.headWeak = true; this.headZone = 140; this.headMarkX = 66; this.headMarkY = 88;
                this.w = 320; this.h = 270; this.baseX = canvas.width - 340; this.baseY = 320 - this.h;
                this.x = canvas.width; this.y = this.baseY; this.state = 'entering'; this.actionTimer = 120;
                this.name = "TITAN RỪNG"; this.retState = 'charge_back'; this.subStateTimer = 0; this.lastMeleeHit = -1; this.lastSkill = '';
                this.burnTimer = 0; this.headHits = 0; this.isDeadFinished = false; this.rockMarks = []; this.rockWave = 0;
            }
            getDmg() { return 1; }
            draw() {
                let x = this.x, y = this.y; ctx.save();
                if (this.state === 'tail_prep' || this.state === 'tail_fire') {
                    let fire = this.state === 'tail_fire';
                    let _t0 = Math.max(0, x + 30 - 420), _tw = (x + 30) - _t0;
                    if (fire) {
                        ctx.fillStyle = "#4E342E"; ctx.fillRect(_t0, 288, _tw, 34);
                        ctx.fillStyle = "#2E7D32";
                        for (let tx = _t0 + 10; tx < x + 10; tx += 80) { ctx.beginPath(); ctx.moveTo(tx, 288); ctx.lineTo(tx + 18, 262); ctx.lineTo(tx + 36, 288); ctx.fill(); }
                        ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.fillRect(_t0, 302, _tw, 8);
                    } else {
                        ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,87,34,0.35)" : "transparent"; ctx.fillRect(_t0, 288, _tw, 34);
                    }
                }
                if (this.state === 'charge_stun') {
                    ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("CHOANG - DANH DI!", x + this.w/2, y - 16); ctx.textAlign = "left";
                }
                if (this.rage && this.roots) for (let rt of this.roots) {
                    if (rt.t >= 26) { let k = 1 - (rt.t - 26) / 25;
                        ctx.fillStyle = "rgba(139,195,74," + (0.15 + k * 0.3).toFixed(2) + ")"; ctx.fillRect(rt.x - 30, 150, 60, 174);
                        ctx.strokeStyle = "#AED581"; ctx.lineWidth = 3; ctx.strokeRect(rt.x - 30, 150, 60, 174); }
                    else { let hh = 174 * Math.min(1, (26 - rt.t) / 6);
                        ctx.fillStyle = "#33691E"; ctx.fillRect(rt.x - 26, 324 - hh, 52, hh);
                        ctx.fillStyle = "#7CB342"; ctx.fillRect(rt.x - 12, 324 - hh, 24, hh); }
                }
                if (this.state === 'leaf_prep') {
                    let rows = [150, 195, 240, 285];
                    for (let r = 0; r < rows.length; r++) { if (r === this.leafGap) continue;
                        ctx.fillStyle = "rgba(139,195,74,0.18)"; ctx.fillRect(0, rows[r] - 12, canvas.width, 30); }
                    ctx.fillStyle = "#FFF"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("BAO LA - TIM KHE!", canvas.width/2, 130); ctx.textAlign = "left";
                }
                if (this.state === 'vine_prep' || this.state === 'vine_fire') {
                    let vx = this.vineX;
                    if (this.state === 'vine_prep') { let k = 1 - this.subStateTimer / 55;
                        ctx.fillStyle = "rgba(76,175,80," + (0.15 + k * 0.3).toFixed(2) + ")"; ctx.fillRect(vx - 34, 110, 68, 214);
                        ctx.strokeStyle = "#8BC34A"; ctx.lineWidth = 3; ctx.strokeRect(vx - 34, 110, 68, 214); }
                    else { let hh = 214 * Math.min(1, (46 - this.subStateTimer) / 8);
                        ctx.fillStyle = "#2E7D32"; ctx.fillRect(vx - 30, 324 - hh, 60, hh);
                        ctx.fillStyle = "#8BC34A"; for (let i = 0; i < 7; i++) { let yy = 324 - hh + i * 30; if (yy > 110) { ctx.fillRect(vx - 42, yy, 20, 9); ctx.fillRect(vx + 22, yy + 12, 20, 9); } } }
                }
                if (this.state === 'whip_warn' || this.state === 'whip_fire') {
                    if (this.state === 'whip_warn') {
                        let d = this.whipDir > 0 ? 1 : -1;
                        ctx.fillStyle = "rgba(120,80,160," + (0.10 + 0.16*Math.sin(frames*0.35)) + ")";
                        ctx.fillRect(0, -CAM_TROI - 20, canvas.width, 324 + CAM_TROI + 20);
                        ctx.fillStyle = "rgba(206,147,216,0.85)"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText(d > 0 ? "ROI QUÉT CẢ SÀN →" : "← ROI QUÉT CẢ SÀN", canvas.width/2, 118);
                        ctx.fillText(LT("NÚP DƯỚI LÁ — nhưng lá sẽ vỡ","HIDE UNDER A LEAF — it will break"), canvas.width/2, 138);
                        ctx.textAlign = "left";
                        // mui ten huong quet chay o mat dat
                        for (let k = 0; k < 6; k++) { let ax = ((frames*6 + k*170) % (canvas.width + 120)) - 60;
                            if (d < 0) ax = canvas.width - ax;
                            ctx.fillStyle = "rgba(206,147,216,0.5)"; ctx.fillRect(ax, 312, 40, 5); }
                    } else {
                        let wx = this.whipX, endY = this.whipStopY || 324;
                        ctx.strokeStyle = "#4A148C"; ctx.lineWidth = 18; ctx.lineCap = "round";
                        ctx.beginPath(); ctx.moveTo(wx - this.whipDir * 26, -10); ctx.lineTo(wx, endY); ctx.stroke();
                        ctx.strokeStyle = "#AB47BC"; ctx.lineWidth = 8;
                        ctx.beginPath(); ctx.moveTo(wx - this.whipDir * 26, -10); ctx.lineTo(wx, endY); ctx.stroke();
                        ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.moveTo(wx - this.whipDir * 26, -10); ctx.lineTo(wx, endY); ctx.stroke();
                        ctx.lineCap = "butt";
                        ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.fillRect(wx - 22, endY - 8, 44, 12);
                        ctx.fillStyle = "rgba(171,71,188,0.28)";
                        ctx.fillRect(wx - this.whipDir * 70, 0, 70, endY);   // vet keo phia sau
                    }
                }
                if (this.state === 'spike_warn' || this.state === 'spike_fire') {
                    let on = this.state === 'spike_fire';
                    if (!on) { ctx.fillStyle = "rgba(180,60,60," + (0.16 + 0.22*Math.sin(frames*0.35)) + ")"; ctx.fillRect(0, 300, canvas.width, 24); }
                    else {
                        ctx.fillStyle = "#37201A"; ctx.fillRect(0, 306, canvas.width, 18);
                        for (let gx = 8; gx < canvas.width; gx += 26) {
                            let hh = 20 + Math.sin(frames * 0.1 + gx * 0.06) * 4;
                            ctx.fillStyle = "#9E9E9E"; ctx.beginPath();
                            ctx.moveTo(gx - 9, 312); ctx.lineTo(gx, 312 - hh); ctx.lineTo(gx + 9, 312); ctx.fill();
                            ctx.fillStyle = "#E0E0E0"; ctx.beginPath();
                            ctx.moveTo(gx - 3, 312); ctx.lineTo(gx, 312 - hh); ctx.lineTo(gx + 2, 312); ctx.fill();
                        }
                    }
                    ctx.fillStyle = on ? "#FFCDD2" : "#EF9A9A"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(on ? "ĐỪNG CHẠM ĐẤT!" : "SẮP PHỦ GAI — LÊN LÁ!", canvas.width/2, 292); ctx.textAlign = "left";
                }
                if (this.state === 'groot_warn' || this.state === 'groot_fire') {
                    let warn = this.state === 'groot_warn';
                    let L = warn ? 26 : (this.grootLen || 0);
                    for (let side = 0; side < 2; side++) {
                        let x0 = side === 0 ? 0 : canvas.width - L;
                        if (L < 2) continue;
                        ctx.fillStyle = warn ? "rgba(120,190,70," + (0.20 + 0.25*Math.sin(frames*0.35)) + ")" : "rgba(46,90,30,0.92)";
                        ctx.fillRect(x0, 296, L, 28);
                        if (!warn) {
                            ctx.fillStyle = "#33691E"; ctx.fillRect(x0, 296, L, 6);
                            // gai re nho ngoi len
                            for (let gx = x0 + 12; gx < x0 + L - 6; gx += 34) {
                                let hh = 16 + Math.sin(frames * 0.12 + gx * 0.05) * 6;
                                ctx.fillStyle = "#558B2F"; ctx.beginPath();
                                ctx.moveTo(gx - 8, 300); ctx.lineTo(gx, 300 - hh); ctx.lineTo(gx + 8, 300); ctx.fill();
                            }
                            // mep dau re dang bo
                            let tipX = side === 0 ? L : canvas.width - L;
                            ctx.fillStyle = "#8BC34A"; ctx.fillRect(tipX - 5, 288, 10, 36);
                        }
                    }
                    if (warn) { ctx.fillStyle = "#DCEDC8"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("RỄ BÒ TỪ 2 MÉP — LÊN CAO!", canvas.width/2, 286); ctx.textAlign = "left"; }
                }
                if (this.state === 'swat_prep' || this.state === 'swat_fire') {
                    let sy = this.swatY;
                    if (this.state === 'swat_prep') { let k = 1 - this.subStateTimer / 58;
                        ctx.fillStyle = "rgba(139,195,74," + (0.12 + k * 0.28).toFixed(2) + ")"; ctx.fillRect(0, sy - 30, canvas.width, 60);
                        ctx.strokeStyle = "#8BC34A"; ctx.lineWidth = 3; ctx.strokeRect(0, sy - 30, canvas.width, 60);
                        ctx.fillStyle = "#FFF"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("QUAT NGANG - DOI DO CAO!", canvas.width/2, sy - 38); ctx.textAlign = "left"; }
                    else { ctx.fillStyle = "rgba(85,139,47,0.9)"; ctx.fillRect(0, sy - 30, canvas.width, 60);
                        ctx.fillStyle = "#8BC34A"; ctx.fillRect(0, sy - 10, canvas.width, 20); }
                }
                let bark = "#4E342E", barkDk = "#3E2723", barkLt = "#6D4C41", moss = "#388E3C", mossDk = "#2E7D32", mossLt = "#66BB6A", rock = "#607D8B";
                let breathe = Math.sin(frames * 0.08) * 3;
                // ===== THIET KE: titan bang VO CAY + REU + DA. Bo het khoi chu nhat,
                // dung hinh co van go, reu moc buong xuong, gai da nhieu lop.
                const TOUT = "#241109";

                // --- DUOI thon, phu reu ---
                ctx.fillStyle = barkDk;
                ctx.beginPath(); ctx.moveTo(x + 250, y + 146);
                ctx.quadraticCurveTo(x + 316, y + 152, x + 362, y + 186);
                ctx.quadraticCurveTo(x + 320, y + 190, x + 300, y + 202);
                ctx.quadraticCurveTo(x + 272, y + 212, x + 248, y + 202);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = TOUT; ctx.lineWidth = 3; ctx.stroke();
                ctx.fillStyle = mossDk;
                for (let k = 0; k < 3; k++) { ctx.beginPath();
                    ctx.ellipse(x + 288 + k * 26, y + 174 + k * 7, 18 - k * 3, 8 - k, -0.2, 0, Math.PI * 2); ctx.fill(); }

                // --- CHAN SAU: cot go, ngon re ---
                function titanLeg(lx, ly, lw, lh, col, lift) {
                    ctx.fillStyle = col;
                    ctx.beginPath();
                    ctx.moveTo(lx, ly - lift); ctx.quadraticCurveTo(lx - 6, ly + lh * 0.5 - lift, lx - 2, ly + lh - lift);
                    ctx.lineTo(lx + lw + 2, ly + lh - lift);
                    ctx.quadraticCurveTo(lx + lw + 6, ly + lh * 0.5 - lift, lx + lw, ly - lift);
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = TOUT; ctx.lineWidth = 3; ctx.stroke();
                    ctx.strokeStyle = "rgba(36,17,9,0.5)"; ctx.lineWidth = 2;
                    for (let k = 1; k < 4; k++) { ctx.beginPath();
                        ctx.moveTo(lx + k * lw / 4, ly + 6 - lift); ctx.lineTo(lx + k * lw / 4 - 2, ly + lh - 8 - lift); ctx.stroke(); }
                    // ban chan re cay
                    ctx.fillStyle = barkDk;
                    ctx.beginPath(); ctx.moveTo(lx - 8, ly + lh - lift);
                    ctx.quadraticCurveTo(lx + lw / 2, ly + lh + 12 - lift, lx + lw + 8, ly + lh - lift);
                    ctx.closePath(); ctx.fill();
                    ctx.fillStyle = "#2E1A12";
                    for (let t = 0; t < 3; t++) { ctx.beginPath();
                        ctx.moveTo(lx - 4 + t * (lw / 2.4), ly + lh + 4 - lift);
                        ctx.lineTo(lx - 8 + t * (lw / 2.4), ly + lh + 14 - lift);
                        ctx.lineTo(lx + 4 + t * (lw / 2.4), ly + lh + 6 - lift); ctx.closePath(); ctx.fill(); }
                }
                titanLeg(x + 228, y + 206, 42, 56, barkDk, 0);
                titanLeg(x + 142, y + 210, 40, 52, barkDk, 0);

                // --- THAN: mai vo cay cong ---
                ctx.fillStyle = bark;
                ctx.beginPath();
                ctx.moveTo(x + 104, y + 108 + breathe);
                ctx.quadraticCurveTo(x + 150, y + 62 + breathe, x + 210, y + 70 + breathe);
                ctx.quadraticCurveTo(x + 268, y + 78 + breathe, x + 288, y + 130 + breathe);
                ctx.quadraticCurveTo(x + 296, y + 186, x + 262, y + 216);
                ctx.lineTo(x + 132, y + 220);
                ctx.quadraticCurveTo(x + 96, y + 176, x + 104, y + 108 + breathe);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = TOUT; ctx.lineWidth = 4; ctx.stroke();
                // van go doc than
                ctx.strokeStyle = "rgba(36,17,9,0.45)"; ctx.lineWidth = 2.5;
                for (let k = 0; k < 7; k++) { let tt = k / 6;
                    ctx.beginPath();
                    ctx.moveTo(x + 112 + tt * 168, y + 96 + breathe + Math.sin(tt * 3) * 10);
                    ctx.quadraticCurveTo(x + 120 + tt * 168, y + 160 + breathe, x + 116 + tt * 166, y + 214);
                    ctx.stroke(); }
                // bung sang
                ctx.fillStyle = barkLt;
                ctx.beginPath(); ctx.moveTo(x + 112, y + 156 + breathe);
                ctx.quadraticCurveTo(x + 100, y + 194, x + 134, y + 218);
                ctx.lineTo(x + 186, y + 219);
                ctx.quadraticCurveTo(x + 160, y + 186, x + 166, y + 152 + breathe);
                ctx.closePath(); ctx.fill();

                // --- REU phu lung, co tua buong xuong ---
                ctx.fillStyle = moss;
                ctx.beginPath();
                ctx.moveTo(x + 108, y + 104 + breathe);
                ctx.quadraticCurveTo(x + 152, y + 60 + breathe, x + 212, y + 68 + breathe);
                ctx.quadraticCurveTo(x + 268, y + 76 + breathe, x + 288, y + 128 + breathe);
                ctx.quadraticCurveTo(x + 250, y + 116 + breathe, x + 216, y + 126 + breathe);
                ctx.quadraticCurveTo(x + 166, y + 138 + breathe, x + 108, y + 104 + breathe);
                ctx.closePath(); ctx.fill();
                ctx.fillStyle = mossLt;
                for (let k = 0; k < 5; k++) { ctx.beginPath();
                    ctx.ellipse(x + 132 + k * 34, y + 88 + breathe + (k % 2) * 12, 16 - (k % 3) * 3, 9, -0.25, 0, Math.PI * 2); ctx.fill(); }
                ctx.strokeStyle = mossDk; ctx.lineWidth = 3; ctx.lineCap = "round";
                for (let k = 0; k < 9; k++) { let vx2 = x + 116 + k * 20, vl = 16 + ((k * 13) % 22);
                    ctx.beginPath(); ctx.moveTo(vx2, y + 118 + breathe);
                    ctx.quadraticCurveTo(vx2 + Math.sin(frames * 0.03 + k) * 5, y + 118 + breathe + vl * 0.6,
                                         vx2 + Math.sin(frames * 0.03 + k) * 8, y + 118 + breathe + vl); ctx.stroke(); }
                ctx.lineCap = "butt";

                // --- GAI DA nhieu lop tren song lung ---
                for (const sp of [[x + 158, y + 66 + breathe, 34, 15], [x + 214, y + 56 + breathe, 44, 19], [x + 262, y + 78 + breathe, 30, 13]]) {
                    ctx.fillStyle = "#455A64";
                    ctx.beginPath(); ctx.moveTo(sp[0] - sp[3], sp[1]);
                    ctx.lineTo(sp[0] - 3, sp[1] - sp[2]); ctx.lineTo(sp[0] + 5, sp[1] - sp[2] + 6);
                    ctx.lineTo(sp[0] + sp[3], sp[1]); ctx.closePath(); ctx.fill();
                    ctx.fillStyle = rock;
                    ctx.beginPath(); ctx.moveTo(sp[0] - sp[3] + 5, sp[1]);
                    ctx.lineTo(sp[0] - 3, sp[1] - sp[2] + 4); ctx.lineTo(sp[0] + 2, sp[1] - sp[2] + 9);
                    ctx.lineTo(sp[0] + 2, sp[1]); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "#2E3D45"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(sp[0] - sp[3], sp[1]);
                    ctx.lineTo(sp[0] - 3, sp[1] - sp[2]); ctx.lineTo(sp[0] + sp[3], sp[1]); ctx.stroke();
                }

                // --- CHAN TRUOC (co nhac chan khi giam) ---
                let legLift = (this.state === 'stomp_prep') ? (this.subStateTimer > 0 ? 26 : 0) : 0;
                titanLeg(x + 196, y + 202, 46, 60, bark, 0);
                titanLeg(x + 122, y + 202, 44, 60, barkLt, legLift);

                // --- CO + DAU (DIEM YEU quanh x+66, y+88) ---
                ctx.fillStyle = bark;
                ctx.beginPath(); ctx.moveTo(x + 112, y + 96 + breathe);
                ctx.quadraticCurveTo(x + 78, y + 74, x + 62, y + 78);
                ctx.quadraticCurveTo(x + 58, y + 124, x + 96, y + 156 + breathe);
                ctx.quadraticCurveTo(x + 118, y + 140 + breathe, x + 112, y + 96 + breathe);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = TOUT; ctx.lineWidth = 3.5; ctx.stroke();
                let mouthOpen = this.state.includes('roar') ? 26 : (this.state.includes('charge') ? 8 : 6);
                // hop so
                ctx.fillStyle = bark;
                ctx.beginPath();
                ctx.moveTo(x + 104, y + 66); ctx.quadraticCurveTo(x + 60, y + 48, x + 26, y + 62);
                ctx.quadraticCurveTo(x + 8, y + 72, x + 12, y + 90);
                ctx.lineTo(x + 60, y + 100); ctx.quadraticCurveTo(x + 98, y + 104, x + 108, y + 84);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = TOUT; ctx.lineWidth = 3.5; ctx.stroke();
                // van go tren so
                ctx.strokeStyle = "rgba(36,17,9,0.4)"; ctx.lineWidth = 2;
                for (let k = 0; k < 3; k++) { ctx.beginPath();
                    ctx.moveTo(x + 24 + k * 6, y + 62 + k * 4); ctx.quadraticCurveTo(x + 60, y + 58 + k * 6, x + 98, y + 72 + k * 5); ctx.stroke(); }
                // ham duoi
                ctx.save(); ctx.translate(x + 52, y + 96); ctx.rotate(mouthOpen * 0.010);
                ctx.fillStyle = barkDk;
                ctx.beginPath(); ctx.moveTo(-44, -2); ctx.quadraticCurveTo(-20, 16, 16, 10);
                ctx.lineTo(18, 24); ctx.quadraticCurveTo(-22, 30, -48, 12); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = TOUT; ctx.lineWidth = 3; ctx.stroke();
                ctx.fillStyle = "#E8E0C8";
                for (let t = 0; t < 4; t++) { ctx.beginPath(); ctx.moveTo(-38 + t * 14, 4);
                    ctx.lineTo(-33 + t * 14, -8); ctx.lineTo(-28 + t * 14, 4); ctx.closePath(); ctx.fill(); }
                ctx.restore();
                ctx.fillStyle = "#2A0A0A";
                ctx.beginPath(); ctx.ellipse(x + 44, y + 96, 30, 5 + mouthOpen * 0.35, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "#E8E0C8";
                for (let t = 0; t < 4; t++) { ctx.beginPath(); ctx.moveTo(x + 20 + t * 14, y + 90);
                    ctx.lineTo(x + 25 + t * 14, y + 100); ctx.lineTo(x + 30 + t * 14, y + 90); ctx.closePath(); ctx.fill(); }
                // MAT ho phach - DIEM YEU
                ctx.fillStyle = "#1B0000";
                ctx.beginPath(); ctx.ellipse(x + 52, y + 78, 14, 11, -0.15, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = (frames % 40 < 30) ? "#FFC107" : "#FF6F00";
                ctx.beginPath(); ctx.ellipse(x + 52, y + 78, 10, 7.5, -0.15, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "#1B0000"; ctx.fillRect(x + 50, y + 74, 4, 9);
                ctx.fillStyle = "rgba(255,224,130,0.35)";
                ctx.beginPath(); ctx.arc(x + 52, y + 78, 17 + Math.sin(frames * 0.12) * 2, 0, Math.PI * 2); ctx.fill();
                // sung da tren tran + reu tren dau
                ctx.fillStyle = "#455A64";
                ctx.beginPath(); ctx.moveTo(x + 30, y + 60); ctx.lineTo(x + 18, y + 28);
                ctx.lineTo(x + 34, y + 40); ctx.lineTo(x + 48, y + 58); ctx.closePath(); ctx.fill();
                ctx.fillStyle = rock;
                ctx.beginPath(); ctx.moveTo(x + 32, y + 58); ctx.lineTo(x + 22, y + 34); ctx.lineTo(x + 36, y + 46); ctx.closePath(); ctx.fill();
                ctx.fillStyle = mossDk;
                ctx.beginPath(); ctx.ellipse(x + 76, y + 62, 20, 8, -0.2, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + 88, y + 96, 13, 7, 0.3, 0, Math.PI * 2); ctx.fill();
                ctx.restore();

                // --- TELEGRAPHS ---
                if (this.state === 'stomp_prep') {
                    ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,0,0,0.4)" : "transparent"; ctx.fillRect(0, 288, canvas.width, 34);
                }
                if (this.state === 'roar_fire') {
                    let rr = (30 - this.subStateTimer) * 10;
                    ctx.strokeStyle = "rgba(180,220,160," + Math.max(0, 1 - rr/300) + ")"; ctx.lineWidth = 5;
                    ctx.beginPath(); ctx.arc(x+40, y+90, rr, 0, Math.PI*2); ctx.stroke();
                }
                if (this.state === 'rockrain_prep') {
                    this.rockMarks.forEach(mx => {
                        ctx.strokeStyle = (frames % 8 < 4) ? "#FF1744" : "rgba(255,23,68,0.3)"; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.moveTo(mx-12, 314); ctx.lineTo(mx+12, 314); ctx.stroke();
                        ctx.fillStyle = "rgba(255,23,68,0.15)"; ctx.fillRect(mx-13, 0, 26, 320);
                    });
                }

                // HP BAR (above)
                if (this.state === 'charge_prep') {
                    ctx.fillStyle = (frames % 6 < 3) ? "rgba(255,60,0,0.4)" : "rgba(255,60,0,0.12)"; ctx.fillRect(0, 300, canvas.width, 22);
                    ctx.fillStyle = "rgba(120,90,60,0.5)";
                    for (let i = 0; i < 4; i++) { let dxr = x + this.w - 30 + i * 10; ctx.beginPath(); ctx.arc(dxr, 314, 3 + (frames + i * 3) % 7, 0, Math.PI * 2); ctx.fill(); }
                }
                if (this.state === 'charge_fire') {
                    ctx.fillStyle = "rgba(150,120,80,0.5)";
                    for (let i = 0; i < 7; i++) { let px = x + this.w + i * 16 + (frames * 4) % 16, py = 302 + Math.sin(frames * 0.3 + i) * 7, r = 5 + (i % 3) * 5; ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill(); }
                    ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 2;
                    for (let i = 0; i < 5; i++) { let ly = y + 90 + i * 42; ctx.beginPath(); ctx.moveTo(x + this.w, ly); ctx.lineTo(x + this.w + 46, ly); ctx.stroke(); }
                }
                // ctx.fillStyle = "black"; ctx.fillRect(x+40, y - 20, this.w-80, 12);
                // ctx.fillStyle = "#43A047"; ctx.fillRect(x+42, y - 18, (this.w-84) * Math.max(0, this.hp/this.maxHp), 8);
            }
            update() {
                if (this.state === 'dying') {
                    this.subStateTimer++;
                    if (this.subStateTimer === 30) { visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion')); this.isDeadFinished = true; }
                    return;
                }
                let gDmg = this.getDmg();
                if (this.state === 'entering') { this.x -= 2; if (this.x <= this.baseX) this.state = 'idle'; }
                // ===== GIAI DOAN 2: duoi 50% mau =====
                else {
                if (!this.rage && this.hp <= this.maxHp * 0.5) {
                    this.rage = true; this.roots = [];
                    floatingTexts.push(new FloatingText(this.x, this.y - 30, "RUNG GIA THUC TINH!"));
                    shakeTimer = 40; SFX.bossEntry && SFX.bossEntry();
                }
                if (this.rage) {
                    if (!this.roots) this.roots = [];
                    for (let r = this.roots.length - 1; r >= 0; r--) {
                        let rt = this.roots[r]; rt.t--;
                        if (rt.t <= 0) { this.roots.splice(r, 1); continue; }
                        if (rt.t < 26 && checkAABB(dino, { x: rt.x - 30, y: 150, w: 60, h: 174 })) { if (!dino.isShielding()) { if (frames % 14 === 0) dino.takeDamage(1); } else parry(); }
                    }
                }
                }
                if (this.state === 'idle') {
                    if (Math.abs(this.x - this.baseX) > 4) this.x += (this.baseX - this.x) * 0.03;
                    this.actionTimer--;
                    if (this.actionTimer <= 0) {
                        let skills = ['stomp','tail','roar','rockrain','charge','vine','swat','groot','whip','spike'];
                        let chosen = pickFromBag(this, skills);   // TUI CHIEU: dung het roi moi lap
                        if (this.rage) {                                  // GD2 ngan -> cu 2 lan co 1 chieu moi, xen ke
                            this.rageTick = (this.rageTick || 0) + 1;
                            if (this.rageTick === 1) chosen = 'roots';
                            else if (this.rageTick % 2 === 0) { this.rageAlt = !this.rageAlt; chosen = this.rageAlt ? 'leafstorm' : 'roots'; }
                        }
                        this.lastSkill = chosen;
                        if (chosen === 'stomp') { this.state = 'stomp_prep'; this.subStateTimer = 44; }
                        else if (chosen === 'tail') { this.state = 'tail_prep'; this.subStateTimer = 42; }
                        else if (chosen === 'roar') { this.state = 'roar_prep'; this.subStateTimer = 36; }
                        else if (chosen === 'rockrain') {
                            this.state = 'rockrain_prep'; this.subStateTimer = 50; this.rockWave = 0;
                            let cols = this.rage ? [90, 240, 390, 540, 690, 840] : [120, 320, 500, 680];
                            cols.sort(() => Math.random() - 0.5);
                            this.rockMarks = cols.slice(0, this.rage ? 5 : 3).sort((a,b)=>a-b);
                        }
                        else if (chosen === 'roots') { this.state = 'roots_fire'; this.subStateTimer = 150; this.rootTick = 0; }
                        else if (chosen === 'leafstorm') { this.state = 'leaf_prep'; this.subStateTimer = 50; this.leafGap = 1 + Math.floor(Math.random() * 3); }
                        else if (chosen === 'vine') { this.state = 'vine_prep'; this.subStateTimer = 55; this.vineX = dino.x + dino.w/2; }
                        else if (chosen === 'swat') { this.state = 'swat_prep'; this.subStateTimer = 58; this.swatY = Math.max(120, Math.min(300, dino.y + dino.h/2)); }
                        else if (chosen === 'groot') { this.state = 'groot_warn'; this.subStateTimer = 60; this.grootLen = 0; this.grootHit = 0; }
                        else if (chosen === 'whip') {
                            this.state = 'whip_warn'; this.subStateTimer = 60;
                            // quet TU CHO BOSS di ve phia nguoi choi
                            this.whipDir = ((dino.x + dino.w/2) < (this.x + this.w/2)) ? -1 : 1;
                            this.whipX = this.x + this.w/2;
                            this.whipHit = 0; this.whipLeaf = null;
                        }
                        else if (chosen === 'spike') {
                            this.state = 'spike_warn'; this.subStateTimer = 64; this.spikeHit = 0;
                            let ys = [252, 200, 152];
                            for (let k = 0; k < (this.rage ? 5 : 4); k++)
                                platforms.push({ x: 70 + k * 190, w: 128, top: ys[k % 3], h: 16, isLeaf: true, solid: true,
                                                 leafTimer: 0, leafCd: 0, fallY: 0, titanTemp: true });   // LA TAM THOI — het chieu la xoa
                        }
                        else { this.state = 'charge_prep'; this.subStateTimer = 40; }
                    }
                }
                // ===== ROI SONG: quat thang xuong; NUP DUOI LA thi la vo thay minh =====
                else if (this.state === 'whip_warn') {
                    this.subStateTimer--;
                    if (this.subStateTimer === 55) { floatingTexts.push(new FloatingText(this.x + 60, this.y + 30, "ROI SỐNG!")); if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.subStateTimer <= 0) { this.state = 'whip_fire'; this.subStateTimer = 46; }
                }
                else if (this.state === 'whip_fire') {
                    this.whipX += this.whipDir * (this.rage ? 10.5 : 8.2);
                    // LA CAY chan roi: bi chan het be ngang la; roi ra khoi la thi la moi VO
                    let leaf = platforms.find(p => p.isLeaf && p.solid && this.whipX > p.x - 4 && this.whipX < p.x + p.w + 4);
                    if (leaf) this.whipLeaf = leaf;
                    else if (this.whipLeaf) {
                        this.whipLeaf.solid = false; this.whipLeaf.leafCd = 300; this.whipLeaf.fallY = 0;
                        visualEffects.push(new Effect(this.whipX, this.whipLeaf.top, 'explosion', true, 30));
                        shakeTimer = Math.max(shakeTimer, 14); this.whipLeaf = null;
                    }
                    this.whipStopY = leaf ? leaf.top : 324;
                    if (!leaf && Math.abs((dino.x + dino.w/2) - this.whipX) < 30 && frames - (this.whipHit || 0) > 24) {
                        this.whipHit = frames;
                        if (!dino.isShielding()) dino.takeDamage(1); else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                    }
                    if (frames % 5 === 0) shakeTimer = Math.max(shakeTimer, 5);
                    if (this.whipX < -70 || this.whipX > canvas.width + 70) {
                        if (this.whipLeaf) { this.whipLeaf.solid = false; this.whipLeaf.leafCd = 300; this.whipLeaf = null; }
                        this.state = 'idle'; this.actionTimer = this.rage ? 40 : 58;
                    }
                }
                // ===== GAI PHU SAN: moc them nhieu la, mat dat thanh gai -> phai nhay tu la sang la =====
                else if (this.state === 'spike_warn') {
                    this.subStateTimer--;
                    if (this.subStateTimer === 63) { floatingTexts.push(new FloatingText(this.x + 60, this.y + 30, "GAI PHỦ SÀN!")); if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.subStateTimer <= 0) { this.state = 'spike_fire'; this.subStateTimer = this.rage ? 400 : 320; shakeTimer = 26; }
                }
                else if (this.state === 'spike_fire') {
                    this.subStateTimer--;
                    if ((dino.y + dino.h) > 306 && frames - (this.spikeHit || 0) > 30) {
                        this.spikeHit = frames;
                        if (!dino.isShielding()) dino.takeDamage(1); else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                        visualEffects.push(new Effect(dino.x + dino.w/2, 312, 'explosion', true, 14));
                    }
                    // moc bu la moi khi so la con nguyen xuong qua thap
                    if (this.subStateTimer % 70 === 0 && platforms.filter(p => p.isLeaf && p.solid).length < 3) {
                        platforms.push({ x: 60 + Math.random() * (canvas.width - 200), w: 132, top: 156 + Math.floor(Math.random()*3)*48,
                                         h: 16, isLeaf: true, solid: true, leafTimer: 0, leafCd: 0, fallY: 0 });
                    }
                    if (this.subStateTimer <= 0) {
                        for (let i = platforms.length - 1; i >= 0; i--) if (platforms[i].titanTemp) platforms.splice(i, 1);   // don la tam
                        this.state = 'idle'; this.actionTimer = this.rage ? 46 : 66;
                    }
                }
                // ===== RE SIET: re bo tu 2 MEP MAP vao giua, CHI cao ngang mat dat -> phai LEN CAO =====
                else if (this.state === 'groot_warn') {
                    this.subStateTimer--;
                    if (this.subStateTimer === 59) { floatingTexts.push(new FloatingText(this.x + 60, this.y + 40, "RỄ SIẾT!")); if (SFX.bossSkill) SFX.bossSkill(); }
                    if (this.subStateTimer <= 0) { this.state = 'groot_fire'; this.subStateTimer = 260; this.grootLen = 0; shakeTimer = 22; }
                }
                else if (this.state === 'groot_fire') {
                    this.subStateTimer--;
                    const GMAX = this.rage ? 410 : 350;
                    if (this.subStateTimer > 110) this.grootLen = Math.min(GMAX, this.grootLen + (this.rage ? 3.0 : 2.2));   // bo vao
                    else this.grootLen = Math.max(0, this.grootLen - 4.2);                                                   // rut ve
                    let pcx = dino.x + dino.w/2, onGround = (dino.y + dino.h) > 300;
                    let inLeft = pcx < this.grootLen, inRight = pcx > canvas.width - this.grootLen;
                    if (onGround && (inLeft || inRight) && frames - (this.grootHit || 0) > 40) {
                        this.grootHit = frames;
                        if (!dino.isShielding()) dino.takeDamage(1); else visualEffects.push(new Effect(parryX(), dino.y, 'parry'));
                    }
                    if (this.subStateTimer % 26 === 0 && this.grootLen > 20) {
                        visualEffects.push(new Effect(Math.random() * this.grootLen, 306, 'explosion', true, 12));
                        visualEffects.push(new Effect(canvas.width - Math.random() * this.grootLen, 306, 'explosion', true, 12));
                    }
                    if (this.subStateTimer <= 0) { this.grootLen = 0; this.state = 'idle'; this.actionTimer = this.rage ? 44 : 62; }
                }
                // STOMP -> shockwaves
                // RE TROI LIEN HOAN: 4 cot bam theo nguoi choi, moi cot bao 25f
                else if (this.state === 'roots_fire') {
                    this.subStateTimer--; this.rootTick++;
                    if (this.rootTick % 32 === 1 && this.roots.length < 4) { this.roots.push({ x: dino.x + dino.w/2, t: 51 }); shakeTimer = Math.max(shakeTimer, 8); }
                    if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 50; }
                }
                // BAO LA CHEO: la bay xien tu 2 huong, chua khe giua
                else if (this.state === 'leaf_prep') {
                    this.subStateTimer--;
                    if (this.subStateTimer <= 0) {
                        this.state = 'idle'; this.actionTimer = 56; SFX.bossSkill && SFX.bossSkill();
                        let rows = [150, 195, 240, 285];
                        for (let r = 0; r < rows.length; r++) {
                            if (r === this.leafGap) continue;
                            let L = new BossProjectile(-30, rows[r], 6.4, 1.5, false, 1); L.w = 26; L.h = 18; L.color = "#8BC34A";
                            let R = new BossProjectile(canvas.width + 10, rows[r] - 20, -6.4, 1.5, false, 1); R.w = 26; R.h = 18; R.color = "#689F38";
                            bossProjectiles.push(L, R);
                        }
                    }
                }
                // GAI GAI: moc tu dat LEN CAO tai vi tri nguoi choi -> dung tren la cay van dinh
                else if (this.state === 'vine_prep') {
                    this.subStateTimer--;
                    if (this.subStateTimer > 20) this.vineX = dino.x + dino.w/2;      // bam theo, khoa 20f cuoi
                    if (this.subStateTimer <= 0) { this.state = 'vine_fire'; this.subStateTimer = 46; shakeTimer = 22; SFX.bossSkill && SFX.bossSkill(); }
                }
                else if (this.state === 'vine_fire') {
                    this.subStateTimer--;
                    if (checkAABB(dino, { x: this.vineX - 34, y: 110, w: 68, h: 214 })) { if (!dino.isShielding()) { if (frames % 14 === 0) dino.takeDamage(1); } else parry(); }
                    if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 52; }
                }
                // QUAT NGANG THEO DO CAO: phu ca man o DUNG tang nguoi choi -> phai DOI TANG moi thoat
                else if (this.state === 'swat_prep') {
                    this.subStateTimer--;
                    if (this.subStateTimer > 22) this.swatY = Math.max(120, Math.min(300, dino.y + dino.h/2));
                    if (this.subStateTimer <= 0) { this.state = 'swat_fire'; this.subStateTimer = 16; this.swatHit = false; shakeTimer = 26; SFX.bossSkill && SFX.bossSkill(); }   // quat NHANH 1 nhat -> nhay dung luc la ne duoc
                }
                else if (this.state === 'swat_fire') {
                    this.subStateTimer--;
                    if (!this.swatHit && checkAABB(dino, { x: 0, y: this.swatY - 30, w: canvas.width, h: 60 })) { this.swatHit = true; if (!dino.isShielding()) dino.takeDamage(1); else parry(); }   // chi trung DUNG 1 LAN
                    if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 54; }
                }
                else if (this.state === 'stomp_prep') { this.y -= 3; this.subStateTimer--; if (this.subStateTimer <= 0) { this.state = 'stomp_fire'; this.subStateTimer = 12; shakeTimer = 20; } }
                else if (this.state === 'stomp_fire') {
                    this.y += 12;
                    if (this.y >= this.baseY) {
                        this.y = this.baseY;
                        if (this.subStateTimer === 12) {
                            shakeTimer = 34;
                            if (dino.grounded && dino.y + dino.h >= 300) { if (!dino.isShielding()) dino.takeDamage(gDmg); else parry(); }
                            let w1 = new BossProjectile(this.x - 10, 320 - 54, -9, 0, true, gDmg); w1.w = 26; w1.h = 54; w1.color = "#5D4037";
                            let w2 = new BossProjectile(this.x + 110, 320 - 66, -11, 0, true, gDmg); w2.w = 32; w2.h = 66; w2.color = "#4E342E";
                            bossProjectiles.push(w1, w2);
                        }
                        this.subStateTimer--; if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 105; }
                    }
                }
                // TAIL SWEEP (ground band)
                else if (this.state === 'tail_prep') {
                    let _tt = Math.max(160, Math.min(this.baseX, dino.x + dino.w + 120));
                    this.x += Math.max(-11, Math.min(11, (_tt - this.x) * 0.15));
                    this.subStateTimer--; if (this.subStateTimer <= 0) { this.state = 'tail_fire'; this.subStateTimer = 28; shakeTimer = 16; } }
                else if (this.state === 'tail_fire') {
                    this.subStateTimer--;
                    let _t0 = Math.max(0, this.x + 30 - 420), _tw = (this.x + 30) - _t0;
                    if (checkAABB(dino, { x: _t0, y: 288, w: _tw, h: 34 })) { if (!dino.isShielding()) dino.takeDamage(gDmg); else parry(); }
                    if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 95; }
                }
                // ROAR -> knockback + debris
                else if (this.state === 'roar_prep') { this.subStateTimer--; if (this.subStateTimer <= 0) { this.state = 'roar_fire'; this.subStateTimer = 30; shakeTimer = 40; } }
                else if (this.state === 'roar_fire') {
                    this.subStateTimer--; shakeTimer = 10;
                    if (dino.x > 26 && !dino.isShielding() && dino.grounded) dino.x -= 4;
                    if (this.subStateTimer === 29) {
                        for (let i = 0; i < 4; i++) { let rx = 90 + i * 150 + Math.random() * 40; let bp = new BossProjectile(rx, troiSinh(), (Math.random()-0.5)*1.4, troiVy(5 + Math.random()*1.6, -22), false, gDmg); bp.rock = true; bp.color = "#5D4037"; bp.w = 22; bp.h = 22; bossProjectiles.push(bp); }
                    }
                    if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 105; }
                }
                // ROCK RAIN
                else if (this.state === 'rockrain_prep') { this.subStateTimer--; if (this.subStateTimer <= 0) { this.state = 'rockrain_fire'; this.subStateTimer = 58; } }
                else if (this.state === 'rockrain_fire') {
                    this.subStateTimer--;
                    if (this.subStateTimer % 18 === 0 && this.rockWave < 3) {
                        this.rockWave++;
                        this.rockMarks.forEach(mx => { let bp = new BossProjectile(mx - 11, troiSinh(), (Math.random()-0.5)*0.6, troiVy(6.2, -22), false, gDmg); bp.rock = true; bp.color = "#6D4C41"; bp.w = 22; bp.h = 22; bossProjectiles.push(bp); });
                    }
                    if (this.subStateTimer <= 0) { this.state = 'idle'; this.actionTimer = 95; }
                }
                // CHARGE (lunge gore)
                else if (this.state === 'charge_prep') {
                    this.subStateTimer--;
                    if (this.subStateTimer > 14) this.x += 0.8; else this.x -= 1.4;   // ngua ra roi cun minh
                    if (this.subStateTimer % 5 === 0) shakeTimer = Math.max(shakeTimer, 6);
                    if (this.subStateTimer <= 0) { this.state = 'charge_fire'; this.x = this.baseX; this.subStateTimer = 0; shakeTimer = 18; this.chargeHp = this.hp; this.chargeStartX = this.baseX; this.chargeDist = Math.max(200, this.baseX + 70); this.starHits = 0; }
                }
                else if (this.state === 'charge_fire') {
                    this.x -= 7; this.subStateTimer++; shakeTimer = 6;    // CHAM nhung di het ban do
                    let gore = { x: this.x + 8, y: this.y + 24, w: this.w - 16, h: this.h - 30 };   // hitbox = CA THAN, dung nhu hinh anh
                    if (checkAABB(dino, gore)) { if (!dino.isShielding()) dino.takeDamage(gDmg); else parry(); }
                    // ===== DO SUC: ban de day lui, day het duong thi CHOANG =====
                    if (this.chargeHp === undefined) { this.chargeHp = this.hp; this.chargeStartX = this.baseX; this.chargeDist = Math.max(200, this.baseX + 70); this.starHits = 0; }
                    let _ammo = (typeof currentAmmoType !== 'undefined') ? currentAmmoType : 0;
                    let _stunNow = (tag) => { this.state = 'charge_stun'; this.subStateTimer = 170; this.chargeHp = undefined;
                        shakeTimer = 36; visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h/2, 'explosion', true, 54));
                        floatingTexts.push(new FloatingText(this.x + this.w/2, this.y + 10, "CHAN DUOC! CHOANG!  (" + tag + ")")); };
                    let _st = dino.pulsarStar;
                    if (_st && !_st.onBody && _st.x > this.x - 40 && _st.x < this.x + this.w + 90) {
                        this.x += 5.4;
                        this.starHold = (this.starHold || 0) + 1;
                        if (this.starHold > 100) { visualEffects.push(new Effect(_st.x, _st.y, 'explosion', true, 34)); dino.pulsarStar = null; this.starHold = 0;
                            floatingTexts.push(new FloatingText(_st.x, _st.y - 24, "SAO VO!")); }
                        for (let i = projectiles.length - 1; i >= 0; i--) {
                            let p = projectiles[i];
                            if (Math.abs((p.x + p.w/2) - _st.x) < 50 && Math.abs((p.y + p.h/2) - _st.y) < 60) {
                                this.starHits++; projectiles.splice(i, 1);
                                visualEffects.push(new Effect(_st.x, _st.y, 'explosion', true, 22));
                                floatingTexts.push(new FloatingText(_st.x, _st.y - 24, "SAO " + this.starHits + "/2"));
                                if (this.starHits >= 2) { dino.pulsarStar = null; _stunNow("PULSAR"); return; }
                                break;
                            }
                        }
                    }
                    if (_ammo === 1 && (dino.fireBreathTimer > 0 || dino.fireChannel)) {
                        let _pos = dino.getShootPos(), _fw = dino.fireBreathLength || 240;
                        let _br = { x: _pos.dir === 1 ? _pos.x : _pos.x - _fw, y: _pos.y - 20, w: _fw, h: 40 };
                        if (dino.fireChannel || checkAABB(_br, { x: this.x, y: this.y, w: this.w, h: this.h })) {
                            let _d = Math.abs((dino.x + dino.w/2) - (this.x + this.w/2));
                            this.x += 9 + _d / 150;
                            if (frames % 4 === 0) visualEffects.push(new Effect(this.x, this.y + this.h/2, 'explosion', true, 16));
                        }
                    }
                    for (let i = projectiles.length - 1; i >= 0; i--) {
                        let p = projectiles[i];
                        if (_ammo === 4 && (p.dmg || 1) >= 2 && checkAABB(p, { x: this.x, y: this.y, w: this.w, h: this.h })) {
                            projectiles.splice(i, 1); _stunNow("VOLT SAC"); return;
                        }
                    }
                    if (this.hp < this.chargeHp) {
                        let dd = Math.min(5, this.chargeHp - this.hp); this.chargeHp = this.hp;
                        let _mul = 1;
                        if (_ammo === 1) { let _d2 = Math.abs((dino.x + dino.w/2) - (this.x + this.w/2)); _mul = 1.5 + _d2 / 700; }
                        this.x += this.chargeDist * 0.50 * dd * _mul; shakeTimer = Math.max(shakeTimer, 14);
                        visualEffects.push(new Effect(this.x, this.y + this.h/2, 'explosion', true, 20));
                        floatingTexts.push(new FloatingText(this.x + this.w/2, this.y + 40, "DAY LUI!"));
                    }
                    if (this.x > this.chargeStartX) this.x = this.chargeStartX;    // khong day vuot qua cho xuat phat (tranh bay ra ngoai man)
                    this.x = Math.max(-70, Math.min(canvas.width - 20, this.x));
                    if (this.x >= this.chargeStartX) { _stunNow("DAY BAT"); return; }
                    if (this.x <= -70) { this.state = 'charge_back'; this.chargeHp = undefined; }
                }
                else if (this.state === 'charge_stun') {
                    this.subStateTimer--;
                    if (this.subStateTimer <= 0) { this.state = 'charge_back'; }
                }
                else if (this.state === 'charge_back') {
                    this.x += 9; if (this.x >= this.baseX) { this.x = this.baseX; this.state = 'idle'; this.actionTimer = 120; }
                }
            }
        }
// BOSS_PART_END s0.ForestTitanBoss.1

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
