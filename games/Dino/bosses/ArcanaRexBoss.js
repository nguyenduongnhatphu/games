// BOSS_FILE: ArcanaRexBoss
// BOSS_SNAPSHOT: beba2bbb918dbf33475490c993ed1556c7f85c4568f316c2be580c4161e1acfd
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArtoriasBoss, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MINION_HP, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, OctopusBoss, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, bossProjectiles, canvas, checkAABB, ctx, dino, dojoMode, enemies, floatingTexts, frames, minionBox, parry, parryX, platforms, shakeTimer, visualEffects
// Nguồn: index.html:23854 · Dùng bởi: ArcanaRexBoss
// BOSS_PART_BEGIN s0.ARC_TRANG.1 EDITABLE
const ARC_TRANG = { entering: 1, intro: 1, shuffle: 1, deal: 1, window: 1, resolve: 1, recover: 1 };
// BOSS_PART_END s0.ARC_TRANG.1

// Nguồn: index.html:23855 · Dùng bởi: ArcanaRexBoss
// BOSS_PART_BEGIN s0.ArcanaRexBoss.1 EDITABLE
class ArcanaRexBoss {
            constructor(level) {
                this.hp = 125; this.maxHp = 125;
                this.w = 66; this.h = 92;
                this.hoverX = Math.round(canvas.width/2 - this.w/2); this.hoverY = 22;
                this.groundY = 320 - this.h;
                this.x = this.hoverX; this.y = -this.h - 10;
                this.name = "ARCANA REX"; this.state = 'entering';
                this.subTimer = 0; this.actionTimer = 0; this.facingLeft = true;
                this.invulnAll = false; this.burnTimer = 0; this.orbit = 0; this.cycle = 0;
                this.zoneN = 5; this.zoneW = canvas.width / this.zoneN;
                this.zc = []; for (let i = 0; i < this.zoneN; i++) this.zc.push(Math.round((i + 0.5) * this.zoneW));
                this.cards = []; this.cardsActive = false;
                this.pool = ['meteor','fire','spike','rush','bullet','laser'];
                this.meteors = []; this.pillars = []; this.spikeFields = []; this.rushers = []; this.lasers = [];
                this.zoneBooms = []; this.zoneStay = 0; this.lastZone = -1; this.zoneHops = []; this.zoneCd = 90;
                this.resolveTimer = 0;
            }
            minionTargets(){ return this.rushers.map(r => minionBox(r, r.w || 52, r.h || 42, MINION_HP, false, false)); }
            totemRect(c) { return { x: c.cx - 24, y: 174, w: 48, h: 130 }; }
            // ===== AP LUC THEO KHU: boss danh THANG nguoi choi, khong cho ai cam chan mot cho =====
            // Dung li mot khu qua lau  -> no dung khu do.
            // Chay qua lai nhieu khu   -> no lan luot cac khu o PHIA TRUOC huong chay, chan duong.
            zoneOf(px) { return Math.max(0, Math.min(this.zoneN - 1, Math.floor(px / this.zoneW))); }
            // BO BAI DEP = tu 3 la trung loai tro len. Boss KHONG tu pha combo cua chinh no,
            // nen cac khu chua bo do duoc chua ra khi no khu.
            comboZones() {
                if (!this.cardsActive || !this.cards.length) return [];
                let cnt = {};
                for (let c of this.cards) if (!c.broken) cnt[c.type] = (cnt[c.type] || 0) + 1;
                let best = null;
                for (let k in cnt) if (cnt[k] >= 3 && (!best || cnt[k] > cnt[best])) best = k;
                if (!best) return [];
                return this.cards.filter(c => !c.broken && c.type === best).map(c => c.zone);
            }
            armZoneBoom(zi, delay) {
                if (zi < 0 || zi >= this.zoneN) return;
                if (this.zoneBooms.some(b => b.zone === zi)) return;
                this.zoneBooms.push({ zone: zi, t: (delay || 0) + ARC_ZONE_WARN, hit: false });
            }
            tickZones() {
                if (this.state === 'entering' || this.state === 'intro') return;
                let pcx = dino.x + dino.w / 2, zi = this.zoneOf(pcx);
                if (this.zoneCd > 0) this.zoneCd--;
                // --- 1) CAM CHAN MOT KHU ---
                if (zi === this.lastZone) this.zoneStay++;
                else {
                    this.zoneStay = 0;
                    if (this.lastZone >= 0) this.zoneHops.push({ f: frames, from: this.lastZone, to: zi });
                    this.lastZone = zi;
                }
                while (this.zoneHops.length && frames - this.zoneHops[0].f > ARC_HOP_WIN) this.zoneHops.shift();
                if (this.zoneStay > ARC_CAMP && this.zoneCd <= 0 && this.comboZones().indexOf(zi) < 0) {
                    this.zoneStay = 0; this.zoneCd = 150;
                    this.armZoneBoom(zi, 0);
                    floatingTexts.push(new FloatingText(pcx - 52, dino.y - 42, "ĐỨNG YÊN LÂU QUÁ!"));
                    if (SFX.bossSkill) SFX.bossSkill();
                }
                // --- 2) CHAY QUA LAI -> chan duong phia truoc ---
                else if (this.zoneHops.length >= ARC_HOPS && this.zoneCd <= 0) {
                    let dir = this.zoneHops[this.zoneHops.length - 1].to - this.zoneHops[0].from;
                    dir = dir >= 0 ? 1 : -1;
                    this.zoneHops.length = 0;
                    // BO BAI DEP (>=3 la trung loai) -> boss GIU lai may khu do, khong tu pha combo cua minh
                    let keep = this.comboZones();
                    // Doi lucd danh ca man, doi luc chi chan 1-2 khu ngay truoc mat -> khong doan duoc
                    let full = Math.random() < 0.45 && keep.length === 0;
                    if (full) {
                        this.zoneCd = 260;
                        let far = dir > 0 ? this.zoneN - 1 : 0, step = -dir, n = 0;
                        for (let z = far; z !== zi - step; z += step) {
                            if (keep.indexOf(z) >= 0) continue;
                            this.armZoneBoom(z, n * ARC_CASCADE_GAP); n++;
                            if (n > this.zoneN) break;
                        }
                        floatingTexts.push(new FloatingText(pcx - 60, dino.y - 42, "TRẢI BÀI TOÀN MÀN!"));
                    } else {
                        this.zoneCd = 150;
                        // chi 1-2 khu: khu dang dung va khu ke tiep theo huong chay
                        let n = 0;
                        for (let z of [zi, zi + dir]) {
                            if (z < 0 || z >= this.zoneN || keep.indexOf(z) >= 0) continue;
                            this.armZoneBoom(z, n * ARC_CASCADE_GAP); n++;
                            if (n >= (Math.random() < 0.5 ? 1 : 2)) break;
                        }
                        floatingTexts.push(new FloatingText(pcx - 46, dino.y - 42, "CHẶN ĐƯỜNG!"));
                    }
                    if (SFX.bossSkill) SFX.bossSkill();
                }
                // --- kich no ---
                for (let i = this.zoneBooms.length - 1; i >= 0; i--) {
                    let b = this.zoneBooms[i]; b.t--;
                    if (b.t > 0) continue;
                    if (!b.hit) {
                        b.hit = true;
                        let x0 = b.zone * this.zoneW;
                        if (checkAABB(dino, { x: x0, y: 0, w: this.zoneW, h: 326 })) {
                            if (!dino.isShielding()) dino.takeDamage(1);   // moi don cua Arcana deu 1 dmg
                            else visualEffects.push(new Effect(parryX(), dino.y + dino.h / 2, 'parry'));
                        }
                        for (let k = 0; k < 4; k++) visualEffects.push(new Effect(x0 + 24 + k * (this.zoneW - 48) / 3, 250 + Math.random() * 60, 'explosion', true, 34));
                        shakeTimer = Math.max(shakeTimer, 18);
                        let c = this.cards.find(cc => cc.zone === b.zone);
                        if (c) c.broken = true;   // la bai khu do chay rui theo
                    }
                    if (b.t < -10) this.zoneBooms.splice(i, 1);
                }
            }
            drawZones() {
                for (let b of this.zoneBooms) {
                    let x0 = b.zone * this.zoneW;
                    if (b.t > 0) {
                        let k = 1 - b.t / ARC_ZONE_WARN;
                        ctx.save();
                        ctx.fillStyle = "rgba(206,147,216," + (0.10 + 0.30 * Math.max(0, k)).toFixed(2) + ")";
                        ctx.fillRect(x0, 0, this.zoneW, 326);
                        ctx.strokeStyle = (frames % 8 < 4) ? "#E040FB" : "#7E57C2"; ctx.lineWidth = 3;
                        ctx.strokeRect(x0 + 2, 2, this.zoneW - 4, 322);
                        ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("NỔ KHU!", x0 + this.zoneW / 2, 150);
                        ctx.textAlign = "left"; ctx.restore();
                    } else if (b.t > -10) {
                        ctx.save();
                        ctx.globalAlpha = Math.max(0, (10 + b.t) / 10);
                        ctx.fillStyle = "rgba(255,235,59,0.55)"; ctx.fillRect(x0, 0, this.zoneW, 326);
                        ctx.restore();
                    }
                }
            }
            hurt(sub) { if (dino.isShielding()) { if (!sub || frames % 12 === 0) visualEffects.push(new Effect(parryX(), dino.y, 'parry')); return true; } if (!sub) dino.takeDamage(1); else if (frames % 10 === 0) dino.takeDamage(1); return false; }
            fireVolley(sx, sy, combo) {
                let mk = (vx, vy) => { let bp = new BossProjectile(sx - 8, sy - 8, vx, vy, false, 1); bp.w = 16; bp.h = 16; bp.color = "#FFD54F"; bossProjectiles.push(bp); };
                let tx = dino.x + dino.w/2, ty = dino.y + dino.h/2, base = Math.atan2(ty - sy, tx - sx), sp = 6.4;
                if (combo >= 3) { for (let a = 0; a < 12; a++) { let ang = a * (Math.PI*2/12); mk(Math.cos(ang)*sp, Math.sin(ang)*sp); } }
                else if (combo >= 2) { for (let k = -2; k <= 2; k++) { let ang = base + k*0.22; mk(Math.cos(ang)*sp, Math.sin(ang)*sp); } }
                else { for (let k = -1; k <= 1; k++) { let ang = base + k*0.24; mk(Math.cos(ang)*sp, Math.sin(ang)*sp); } }
            }
            spawnAttacks() {
                let survivors = this.cards.filter(c => !c.broken);
                let counts = {}; survivors.forEach(c => counts[c.type] = (counts[c.type]||0) + 1);
                survivors.forEach((c, idx) => {
                    let combo = counts[c.type], cx = c.cx, delay = idx * 5;
                    if (c.type === 'meteor') { let n = combo>=3?3:(combo>=2?2:1); for (let k = 0; k < n; k++) this.meteors.push({ x: cx + (Math.random()-0.5)*70, y: -40 - k*46 - delay*2, vy: 4 }); }
                    else if (c.type === 'fire') { this.pillars.push({ cx: cx, t: -delay, mega: combo>=3, wide: combo>=2 }); }
                    else if (c.type === 'spike') { let w = combo>=3?210:(combo>=2?168:130); this.spikeFields.push({ x: cx - w/2, w: w, t: -delay }); }
                    else if (c.type === 'rush') { let n = combo>=2?2:1; for (let k = 0; k < n; k++) this.rushers.push({ x: cx - 40 - k*70, y: 320-42, w: 52, h: 42, dir: ((dino.x + dino.w/2) < cx ? -1 : 1), spd: combo>=3?11:9 }); }
                    else if (c.type === 'bullet') { this.fireVolley(cx, 198, combo); }
                    else if (c.type === 'laser') { this.lasers.push({ cx: cx, t: -delay, w: combo>=3?92:(combo>=2?60:42) }); }
                });
            }
            drawGlyph(cx, cy, type) {
                if (type === 'meteor') { ctx.fillStyle = "#FF7043"; ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#FFC107"; ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI*2); ctx.fill(); ctx.strokeStyle = "#FF7043"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx-11, cy-11); ctx.lineTo(cx-3, cy-3); ctx.stroke(); }
                else if (type === 'fire') { ctx.fillStyle = "#FF5722"; ctx.beginPath(); ctx.moveTo(cx, cy-13); ctx.quadraticCurveTo(cx+9, cy, cx, cy+10); ctx.quadraticCurveTo(cx-9, cy, cx, cy-13); ctx.fill(); ctx.fillStyle = "#FFC107"; ctx.beginPath(); ctx.moveTo(cx, cy-4); ctx.quadraticCurveTo(cx+4, cy+2, cx, cy+9); ctx.quadraticCurveTo(cx-4, cy+2, cx, cy-4); ctx.fill(); }
                else if (type === 'spike') { ctx.fillStyle = "#B0BEC5"; for (let i = -1; i <= 1; i++) { let sx = cx + i*9; ctx.beginPath(); ctx.moveTo(sx-5, cy+9); ctx.lineTo(sx, cy-11); ctx.lineTo(sx+5, cy+9); ctx.fill(); } }
                else if (type === 'rush') { ctx.fillStyle = "#E64A19"; ctx.fillRect(cx-10, cy-2, 15, 9); ctx.fillRect(cx+3, cy-9, 9, 9); ctx.fillStyle = "#FFEB3B"; ctx.fillRect(cx+7, cy-6, 3, 2); ctx.fillStyle = "#E64A19"; ctx.beginPath(); ctx.moveTo(cx-9, cy+1); ctx.lineTo(cx-18, cy-3); ctx.lineTo(cx-9, cy+6); ctx.fill(); }
                else if (type === 'bullet') { ctx.fillStyle = "#FFD54F"; for (let i = 0; i < 6; i++) { let a = i*(Math.PI*2/6); ctx.beginPath(); ctx.arc(cx+Math.cos(a)*9, cy+Math.sin(a)*9, 2.5, 0, Math.PI*2); ctx.fill(); } ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI*2); ctx.fill(); }
                else if (type === 'laser') { ctx.fillStyle = "#E040FB"; ctx.fillRect(cx-3, cy-13, 6, 20); ctx.fillStyle = "#EA80FC"; ctx.beginPath(); ctx.moveTo(cx-6, cy+5); ctx.lineTo(cx, cy+12); ctx.lineTo(cx+6, cy+5); ctx.fill(); }
            }
            update() {
                this.orbit += 0.05;
                this.tickZones();
                // ---- TOTEM TREN COT DA: dung li tren cot cao -> boss khac totem ngay tren do ----
                if (!this.runes) { this.runes = []; this.runeCamp = 0; }
                if (this.state !== 'entering' && this.state !== 'intro') {
                    let hi = platforms.filter(p => p.top < 300 && (!p.isLeaf || p.solid));
                    let standing = hi.find(p => dino.grounded && Math.abs((dino.y + dino.h) - p.top) < 8 && dino.x + dino.w > p.x && dino.x < p.x + p.w);
                    if (standing) {
                        this.runeCamp++;
                        if (this.runeCamp > 45 && this.runes.length < 2 && !this.runes.some(r => r.pf === standing)) {
                            let arRune = { pf: standing, t: 140, hp: 3, isArcanaRune: true, type: 'arcanarune', invulnAll: false, x: standing.x - 4, y: standing.top - 54, w: standing.w + 8, h: 66, update() { this.x = this.pf.x - 4; this.y = this.pf.top - 54; this.w = this.pf.w + 8; this.h = 66; }, draw() {} };
                            this.runes.push(arRune); enemies.push(arRune);
                            this.runeCamp = 0;
                            floatingTexts.push(new FloatingText(standing.x + 6, standing.top - 26, "TOTEM!"));
                            SFX.bossSkill && SFX.bossSkill();
                        }
                    } else this.runeCamp = Math.max(0, this.runeCamp - 2);
                }
                for (let i = this.runes.length - 1; i >= 0; i--) {
                    let r = this.runes[i], pf = r.pf;
                    let dropRune = (idx) => { let ei = enemies.indexOf(r); if (ei >= 0) enemies.splice(ei, 1); this.runes.splice(idx, 1); };
                    if (platforms.indexOf(pf) < 0) { dropRune(i); continue; }
                    // Rune la 1 "enemy ma" (isArcanaRune) nam trong enemies[] -> MOI loai sat thuong cua nguoi choi
                    // (dan, laser, lua, ult lua, can chien, lao set...) deu tru hp no qua cac vong damage co san.
                    if (r.hp <= 0 || enemies.indexOf(r) < 0) {
                        if (r.hp <= 0) { floatingTexts.push(new FloatingText(pf.x + 4, pf.top - 26, "PHÁ TOTEM!")); visualEffects.push(new Effect(pf.x + pf.w / 2, pf.top - 30, 'explosion', true, 18)); }
                        dropRune(i); continue;
                    }
                    r.t--;
                    if (r.t <= 0) {
                        visualEffects.push(new Effect(pf.x + pf.w/2, pf.top - 16, 'explosion', true, 46)); shakeTimer = 20;
                        if (checkAABB(dino, { x: pf.x - 20, y: pf.top - 80, w: pf.w + 40, h: 96 })) { if (!dino.isShielding()) dino.takeDamage(1); else visualEffects.push(new Effect(parryX(), dino.y, 'parry')); }
                        dropRune(i);
                    }
                }
                // ---- hazards (always) ----
                for (let i = this.meteors.length - 1; i >= 0; i--) { let m = this.meteors[i]; m.y += m.vy; m.vy += 0.3; if (m.y > 0 && checkAABB(dino, { x: m.x-14, y: m.y-14, w: 28, h: 28 })) { this.hurt(false); m.y = 999; } if (m.y >= 306) { visualEffects.push(new Effect(m.x, 308, 'explosion', true, 20)); shakeTimer = 8; this.meteors.splice(i, 1); } }
                for (let i = this.pillars.length - 1; i >= 0; i--) { let p = this.pillars[i]; p.t++; if (p.t >= 30 && p.t <= 78) { let hw = p.mega?38:(p.wide?28:20); if (dino.grounded && dino.y + dino.h >= 300 && Math.abs((dino.x + dino.w/2) - p.cx) < hw) this.hurt(true); } if (p.t > 96) this.pillars.splice(i, 1); }
                for (let i = this.spikeFields.length - 1; i >= 0; i--) { let s = this.spikeFields[i]; s.t++; if (s.t >= 26 && s.t <= 68) { if (dino.grounded && dino.y + dino.h >= 300 && (dino.x + dino.w) > s.x && dino.x < s.x + s.w) this.hurt(true); } if (s.t > 84) this.spikeFields.splice(i, 1); }
                for (let i = this.rushers.length - 1; i >= 0; i--) { let r = this.rushers[i]; r.x += r.dir * r.spd; if (checkAABB(dino, { x: r.x, y: r.y, w: r.w, h: r.h })) { if (dino.isShielding()) { visualEffects.push(new Effect(r.x + r.w/2, r.y, 'parry')); floatingTexts.push(new FloatingText(r.x, r.y - 14, "PARRY!")); this.rushers.splice(i, 1); continue; } else dino.takeDamage(1); } if (r.x < -80 || r.x > canvas.width + 80) this.rushers.splice(i, 1); }
                for (let i = this.lasers.length - 1; i >= 0; i--) { let l = this.lasers[i]; l.t++; if (l.t >= 30 && l.t <= 70) { if ((dino.x + dino.w) > l.cx - l.w/2 && dino.x < l.cx + l.w/2) this.hurt(true); } if (l.t > 84) this.lasers.splice(i, 1); }
                // ---- TOTEM (the bai) = "enemy ma" nam trong enemies[] -> MOI loai sat thuong deu pha ----
                // (dan/laser/lua/ult/can chien...). Dan XUYEN pha nhieu the cung luc -> mang Pulse loi hon.
                if (!this.cardGhosts) this.cardGhosts = [];
                {
                    let canBreak = this.cardsActive && (this.state === 'window' || this.state === 'deal');
                    for (let gi = this.cardGhosts.length - 1; gi >= 0; gi--) {
                        let g = this.cardGhosts[gi], c = g.card, ei = enemies.indexOf(g);
                        if (!canBreak || c.broken || !this.cards.includes(c)) { if (ei >= 0) enemies.splice(ei, 1); this.cardGhosts.splice(gi, 1); continue; }
                        c.hp = Math.min(c.maxHp, g.hp);
                        if (g.hp <= 0 || ei < 0) {
                            c.broken = true; c.hp = 0;
                            visualEffects.push(new Effect(c.cx, 240, 'explosion', true, 22));
                            floatingTexts.push(new FloatingText(c.cx - 30, 158, "AN TOÀN!"));
                            shakeTimer = Math.max(shakeTimer, 6); if (SFX.glassBreak) SFX.glassBreak();
                            if (ei >= 0) enemies.splice(ei, 1); this.cardGhosts.splice(gi, 1);
                        }
                    }
                }
                // ---- state machine ----
                // Parry chung cua game ep state = 'returning' — Arcana khong co trang thai do nen
                // truoc day DUNG IM VINH VIEN. Tra ve don dang ra (giu nguyen chu ky bai).
                if (!ARC_TRANG[this.state]) this.state = this._st || 'shuffle'; else this._st = this.state;
                if (this.state === 'entering') { this.y += 6; if (this.y >= this.hoverY) { this.y = this.hoverY; this.state = 'intro'; this.subTimer = 0; } }
                else if (this.state === 'intro') { this.subTimer++; if (this.subTimer === 1) { floatingTexts.push(new FloatingText(this.x + this.w/2 - 40, this.y + this.h + 12, "ARCANA REX!")); if (SFX.bossEntry) SFX.bossEntry(); } if (this.subTimer > 46) { this.state = 'shuffle'; this.subTimer = 0; } }
                else if (this.state === 'shuffle') { this.x += (this.hoverX - this.x) * 0.15; if (this.y < this.groundY) this.y = Math.min(this.groundY, this.y + 7); this.subTimer++; if (this.subTimer > 130) { this.state = 'deal'; this.subTimer = 0; } }
                else if (this.state === 'deal') {
                    this.y += (this.hoverY - this.y) * 0.2; this.subTimer++;
                    if (this.subTimer === 1) { this.cards = [];
                        // RUT NGAU NHIEN tung la — trung loai la CO Y: cang nhieu la giong nhau thi don cang manh
                        for (let i = 0; i < this.zoneN; i++) this.cards.push({ zone: i, cx: this.zc[i], type: this.pool[Math.floor(Math.random()*this.pool.length)], hp: 10, maxHp: 10, broken: false, flip: 0 }); this.cardsActive = true;
                        this.cardGhosts = []; for (let c of this.cards) { let g = { card: c, isArcanaTotem: true, type: 'arcanatotem', invulnAll: false, x: c.cx - 24, y: 174, w: 48, h: 130, hp: c.hp, update(){ this.x = this.card.cx - 24; this.y = 174; this.w = 48; this.h = 130; }, draw(){} }; this.cardGhosts.push(g); enemies.push(g); }
                        if (SFX.bossSkill) SFX.bossSkill(); }
                    this.cards.forEach((c, i) => { if (this.subTimer > 6 + i*5) c.flip = Math.min(1, c.flip + 0.15); });
                    if (this.subTimer > 40) { this.state = 'window'; this.subTimer = 0; }
                }
                else if (this.state === 'window') { this.y += (this.hoverY - this.y) * 0.2; this.faceP(); this.subTimer++; if (this.subTimer >= 240) { this.spawnAttacks(); this.state = 'resolve'; this.subTimer = 0; this.resolveTimer = 0; shakeTimer = 12; if (SFX.bossSkill) SFX.bossSkill(); } }
                else if (this.state === 'resolve') { this.subTimer++; this.resolveTimer++; let active = this.meteors.length + this.pillars.length + this.spikeFields.length + this.rushers.length + this.lasers.length; if ((active === 0 && this.subTimer > 40) || this.subTimer > 240) { this.state = 'recover'; this.subTimer = 0; this.cardsActive = false; } }
                else if (this.state === 'recover') { this.subTimer++; this.cards.forEach(c => c.flip = Math.max(0, c.flip - 0.1)); if (this.subTimer > 36) { this.state = 'shuffle'; this.subTimer = 0; this.cards = []; this.cycle++; } }
                this.invulnAll = false;   // BO BAT TU: danh duoc moi luc, bu lai bang ap luc tu cac khu
            }
            draw() {
                let x = this.x, y = this.y, w = this.w, h = this.h, cx = x + w/2, dir = this.facingLeft ? -1 : 1;
                this.drawZones();
                if (this.runes) for (let r of this.runes) {
                    let pf = r.pf, k = 1 - r.t / 140, rcx = pf.x + pf.w/2, rcy = pf.top - 22;
                    ctx.strokeStyle = "rgba(206,147,216," + (0.45 + k * 0.5).toFixed(2) + ")"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(rcx, rcy, Math.max(8, 26 + k * 10), 0, Math.PI*2); ctx.stroke();
                    ctx.strokeStyle = "#E040FB"; ctx.lineWidth = 2;
                    for (let sgn = 0; sgn < 6; sgn++) { let a1 = this.orbit + sgn * Math.PI/3, a2 = a1 + Math.PI*2/3;
                        ctx.beginPath(); ctx.moveTo(rcx + Math.cos(a1)*22, rcy + Math.sin(a1)*22); ctx.lineTo(rcx + Math.cos(a2)*22, rcy + Math.sin(a2)*22); ctx.stroke(); }
                    ctx.fillStyle = "rgba(224,64,251," + (0.10 + k * 0.30).toFixed(2) + ")"; ctx.fillRect(pf.x - 20, pf.top - 80, pf.w + 40, 96);
                    ctx.fillStyle = "#FFF"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("TOTEM " + r.hp + " | " + Math.max(0, Math.ceil(r.t / 60)) + "s", rcx, pf.top - 60); ctx.textAlign = "left";
                }
                // ---- lasers (behind) ----
                this.lasers.forEach(l => { let hw = l.w/2; if (l.t >= 0 && l.t < 30) { ctx.strokeStyle = (frames%6<3)?"#E040FB":"rgba(224,64,251,0.3)"; ctx.lineWidth = 2; ctx.strokeRect(l.cx-hw, 0, l.w, 320); ctx.fillStyle = "rgba(224,64,251,0.08)"; ctx.fillRect(l.cx-hw, 0, l.w, 320); } else if (l.t >= 30 && l.t <= 70) { ctx.fillStyle = "rgba(224,64,251,0.5)"; ctx.fillRect(l.cx-hw, 0, l.w, 320); ctx.fillStyle = "rgba(234,128,252,0.8)"; ctx.fillRect(l.cx-hw*0.5, 0, hw, 320); ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.fillRect(l.cx-3, 0, 6, 320); } });
                // ---- fire pillars ----
                this.pillars.forEach(p => { let hw = p.mega?38:(p.wide?28:20), topY = p.mega?0:110; if (p.t >= 0 && p.t < 30) { ctx.strokeStyle = (frames%8<4)?"#FF1744":"rgba(255,23,68,0.3)"; ctx.lineWidth = 3; ctx.strokeRect(p.cx-hw, topY, hw*2, 320-topY); ctx.fillStyle = "rgba(255,87,34,0.1)"; ctx.fillRect(p.cx-hw, topY, hw*2, 320-topY); } else if (p.t >= 30 && p.t <= 78) { let ph = 320 - topY; ctx.fillStyle = "rgba(255,87,34,0.75)"; ctx.fillRect(p.cx-hw, topY, hw*2, ph); ctx.fillStyle = "rgba(255,193,7,0.85)"; ctx.fillRect(p.cx-hw*0.6, topY, hw*1.2, ph); ctx.fillStyle = "rgba(255,245,157,0.9)"; ctx.fillRect(p.cx-4, topY, 8, ph); } });
                // ---- spikes ----
                this.spikeFields.forEach(s => { if (s.t >= 0 && s.t < 26) { ctx.strokeStyle = (frames%8<4)?"#FF1744":"rgba(255,23,68,0.3)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(s.x, 315); ctx.lineTo(s.x+s.w, 315); ctx.stroke(); } else if (s.t >= 26 && s.t <= 68) { let up = Math.min(1, (Math.min(s.t-26, 68-s.t))/10), n = Math.floor(s.w/18); ctx.fillStyle = "#90A4AE"; for (let i = 0; i < n; i++) { let sx = s.x+9+i*18, sh = 28*up; ctx.beginPath(); ctx.moveTo(sx-8, 320); ctx.lineTo(sx, 320-sh); ctx.lineTo(sx+8, 320); ctx.fill(); } ctx.fillStyle = "#ECEFF1"; for (let i = 0; i < n; i++) { let sx = s.x+9+i*18, sh = 28*up; ctx.beginPath(); ctx.moveTo(sx-3, 320); ctx.lineTo(sx, 320-sh); ctx.lineTo(sx+3, 320); ctx.fill(); } } });
                // ---- totems (cards) ----
                if (this.cardsActive) { this.cards.forEach(c => { let r = this.totemRect(c); if (c.broken) { ctx.fillStyle = "rgba(76,175,80,0.14)"; ctx.fillRect(c.cx - this.zoneW/2, 40, this.zoneW, 280); ctx.fillStyle = "rgba(110,110,110,0.6)"; ctx.fillRect(r.x+6, 300, r.w-12, 6); ctx.fillStyle = "#69F0AE"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("AN TOÀN", c.cx, 296); ctx.textAlign = "left"; } else { ctx.fillStyle = "#5C4A3A"; ctx.fillRect(r.x, r.y, r.w, r.h); ctx.fillStyle = "#7D6552"; ctx.fillRect(r.x+3, r.y+3, r.w-6, r.h-6); ctx.strokeStyle = "#3E2E1E"; ctx.lineWidth = 2; ctx.strokeRect(r.x, r.y, r.w, r.h); if (c.flip > 0) { ctx.save(); ctx.globalAlpha = c.flip; this.drawGlyph(c.cx, r.y + 44, c.type); ctx.restore(); } ctx.fillStyle = "black"; ctx.fillRect(r.x, r.y-11, r.w, 7); ctx.fillStyle = "#FFD54F"; ctx.fillRect(r.x+1, r.y-10, (r.w-2)*Math.max(0, c.hp/c.maxHp), 5); } }); }
                // ---- boss body (shaman theropod) ----
                ctx.save();
                let au = 0.10 + Math.sin(frames*0.1)*0.04; ctx.fillStyle = "rgba(171,71,188," + au + ")"; ctx.beginPath(); ctx.arc(cx, y+h/2, 58, 0, Math.PI*2); ctx.fill();
                if (this.state === 'shuffle') { for (let i = 0; i < 5; i++) { let a = this.orbit + i*(Math.PI*2/5), ox = cx + Math.cos(a)*46, oy = y+h/2 + Math.sin(a)*30; ctx.save(); ctx.translate(ox, oy); ctx.rotate(a); ctx.fillStyle = "#E8E0C8"; ctx.fillRect(-6, -9, 12, 18); ctx.strokeStyle = "#8E24AA"; ctx.lineWidth = 1; ctx.strokeRect(-6, -9, 12, 18); ctx.restore(); } }
                // robe
                ctx.fillStyle = "#3E2C57"; ctx.beginPath(); ctx.moveTo(cx-14, y+28); ctx.lineTo(cx+14, y+28); ctx.lineTo(cx+26, y+h); ctx.lineTo(cx-26, y+h); ctx.closePath(); ctx.fill(); ctx.strokeStyle = "rgba(255,179,0,0.7)"; ctx.lineWidth = 2; ctx.stroke();
                ctx.fillStyle = "rgba(192,57,43,0.85)"; ctx.fillRect(cx-2, y+34, 4, h-40);
                // neck + head
                ctx.fillStyle = "#4A3668"; ctx.fillRect(cx-8, y+18, 16, 14);
                ctx.fillStyle = "#E8E0C8"; ctx.beginPath(); ctx.moveTo(cx - 10*dir, y+6); ctx.lineTo(cx + 16*dir, y+9); ctx.lineTo(cx + 22*dir, y+17); ctx.lineTo(cx + 9*dir, y+22); ctx.lineTo(cx - 10*dir, y+22); ctx.closePath(); ctx.fill();
                ctx.fillStyle = (frames%40<30)?"#FFB300":"#FF7043"; ctx.fillRect(cx + 5*dir - 3, y+11, 6, 5);
                // headdress
                for (let i = -2; i <= 2; i++) { ctx.save(); ctx.translate(cx, y+6); ctx.rotate(i*0.34); ctx.fillStyle = (i%2)?"#C0392B":"#E8E0C8"; ctx.fillRect(-2, -24, 4, 21); ctx.restore(); }
                // staff + skull
                let stx = cx + 32*dir; ctx.strokeStyle = "#6D4C41"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(stx, y+16); ctx.lineTo(stx, y+h-4); ctx.stroke();
                ctx.fillStyle = "#EDE3C8"; ctx.beginPath(); ctx.arc(stx, y+13, 7, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#3E2C57"; ctx.fillRect(stx-4, y+12, 3, 3); ctx.fillRect(stx+1, y+12, 3, 3);
                ctx.restore();
                if (this.state === 'shuffle') { ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("SƠ HỞ — TẤN CÔNG!", cx, y-6); ctx.textAlign = "left"; }
                // ---- meteors + rushers (front) ----
                this.meteors.forEach(m => { ctx.fillStyle = "rgba(255,87,34,0.5)"; ctx.beginPath(); ctx.arc(m.x, m.y-14, 10, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#FF6D00"; ctx.beginPath(); ctx.arc(m.x, m.y, 13, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#FFC107"; ctx.beginPath(); ctx.arc(m.x, m.y, 7, 0, Math.PI*2); ctx.fill(); });
                this.rushers.forEach(r => { let bx = r.x, by = r.y, flip = r.dir < 0; ctx.fillStyle = "#D84315"; ctx.fillRect(bx+10, by+10, 32, 18); ctx.beginPath(); if (flip) { ctx.moveTo(bx+42, by+13); ctx.lineTo(bx+58, by+9); ctx.lineTo(bx+42, by+24); } else { ctx.moveTo(bx+10, by+13); ctx.lineTo(bx-6, by+9); ctx.lineTo(bx+10, by+24); } ctx.fill(); let hx = flip ? bx : bx+32; ctx.fillStyle = "#BF360C"; ctx.fillRect(hx, by, 18, 14); ctx.fillStyle = "#FFEB3B"; ctx.fillRect(flip?hx+3:hx+11, by+3, 4, 3); ctx.fillStyle = "#D84315"; let lg = (frames%10<5)?3:0; ctx.fillRect(bx+16, by+26, 5, 12-lg); ctx.fillRect(bx+28, by+26+lg, 5, 12-lg); });
                // ---- HUD ----
                ctx.save(); hudManHinh(this);   // @@HE-HUDBAR
                ctx.fillStyle = "black"; ctx.fillRect(canvas.width/2-160, 18, 320, 14);
                ctx.fillStyle = "#AB47BC"; ctx.fillRect(canvas.width/2-158, 20, 316*Math.max(0, this.hp/this.maxHp), 10);
                ctx.fillStyle = "white"; ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText(this.name, canvas.width/2, 14); ctx.textAlign = "left"; ctx.restore();
                if (this.invulnAll && this.state !== 'entering' && this.state !== 'intro') { ctx.fillStyle = "#CE93D8"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center"; ctx.fillText("BẤT KHẢ XÂM PHẠM — PHÁ PHIẾN ĐÁ", canvas.width/2, 44); ctx.textAlign = "left"; }
            }
        }
// BOSS_PART_END s0.ArcanaRexBoss.1

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

// Nguồn: index.html:27279 · Dùng bởi: ArcanaRexBoss
// BOSS_PART_BEGIN s0.ARC_ZONE_WARN.1 EDITABLE
const ARC_ZONE_WARN = 34;
// BOSS_PART_END s0.ARC_ZONE_WARN.1

// Nguồn: index.html:27280 · Dùng bởi: ArcanaRexBoss
// BOSS_PART_BEGIN s0.ARC_CAMP.1 EDITABLE
const ARC_CAMP = 150;
// BOSS_PART_END s0.ARC_CAMP.1

// Nguồn: index.html:27281 · Dùng bởi: ArcanaRexBoss
// BOSS_PART_BEGIN s0.ARC_HOPS.1 EDITABLE
const ARC_HOPS = 4;
// BOSS_PART_END s0.ARC_HOPS.1

// Nguồn: index.html:27282 · Dùng bởi: ArcanaRexBoss
// BOSS_PART_BEGIN s0.ARC_HOP_WIN.1 EDITABLE
const ARC_HOP_WIN = 190;
// BOSS_PART_END s0.ARC_HOP_WIN.1

// Nguồn: index.html:27283 · Dùng bởi: ArcanaRexBoss
// BOSS_PART_BEGIN s0.ARC_CASCADE_GAP.1 EDITABLE
const ARC_CASCADE_GAP = 16;
// BOSS_PART_END s0.ARC_CASCADE_GAP.1

// Nguồn: index.html:99424 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:99435 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
