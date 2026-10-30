// BOSS_FILE: OctopusBoss
// BOSS_SNAPSHOT: 90b44e51b8a8c0ad12fba495a59e199c399e173aab86fbee147786ba09666942
// Nguồn game: games/Dino/index.html
// Bản tách để sửa/gửi AI; game vẫn chạy từ ../index.html, không nạp file này trực tiếp.
// Giữ các dòng BOSS_PART_BEGIN / BOSS_PART_END và tên class/hàm công khai.
// EDITABLE: được sửa. READ_ONLY: ngữ cảnh dùng chung, không sửa trong file Boss.
// Nếu cần sửa phần dùng chung, gửi thêm shared/BossShared.js; xem README.md.
// Thêm helper mới BÊN TRONG một vùng EDITABLE, không đặt ngoài các marker.
// Global / tham chiếu ngoài file: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, BT_BO, BT_CD, BT_HP, BT_HUT_DAI, BT_HUT_MAX, BT_MUC_MAY, BT_MUC_R, BT_MUC_XA, BT_NGHI, BT_QUAT_TAM, BT_TRONG, BT_VP, BossProjectile, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DPR, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, Effect, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, FloatingText, ForestShooter, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, Heart, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaDino, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, Math, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, Object, Obstacle, PillarLordBoss, Player, PoisonMothBoss, PontiffBoss, Projectile, PteroBoss, PteroLordBoss, Pterodactyl, PulsarCloneBoss, QuetzalBoss, Raptor, SFX, ScarabLordBoss, Set, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitBat, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, WindBlade, Yasuo2Boss, YasuoBoss, ZeroBoss, btCong, btKcDoan, btThemMuc, btVeXuc, canvas, checkAABB, ctx, dino, dojoMode, floatingTexts, frames, keys, parry, parryX, shakeTimer, visualEffects
// Nguồn: index.html:19808 · Dùng bởi: OctopusBoss
// BOSS_PART_BEGIN s0.OctopusBoss.1 EDITABLE
class OctopusBoss {
            constructor(level){
                this.name = "BẠCH TUỘC VỰC THẲM";
                this.stage = 1; this.phase = 1;
                this.hp = BT_HP[1]; this.maxHp = BT_HP[1];
                this.facingLeft = true; this.invulnAll = false;
                this.state = 'entering'; this.t = 0; this.subTimer = 0; this.actionTimer = 60;
                this.cd = {}; this.lastSkill = '';
                this.len = 0;          // troi len tu duoi cat (0..1)
                this.an = 0;           // 0 = hien ro, 1 = tan hinh
                this.phong = 0;        // phong dau (dan muc)
                this.dan = [];         // dan muc dang bay
                this.xuc = [];         // xuc tu don danh dang ve: {P, w0, w1, a}
                this.tel = [];         // bao truoc
                this.burnTimer = 0; this.lastMeleeHit = -1;
                this.hop();
            }
            // ---- vi tri ----
            giua(){ return this.stage === 2; }
            mat(){
                const W = canvas.width;
                if (this.giua()) return { x: W / 2, y: 118 + (1 - this.len) * 240 };
                return { x: W - 118, y: 180 + (1 - this.len) * 240 };
            }
            // mieng / ong phun: pha 1 luon nhin sang trai; pha 2 quay ve phia nguoi choi
            mieng(){
                const W = canvas.width;
                if (this.giua()) return { x: W / 2 + this.huong() * 40, y: 250 };
                return { x: W - 222, y: 290 };
            }
            huong(){ let px = dino.x + dino.w / 2; return px < this.mat().x ? -1 : 1; }
            kc(){ let m = this.mieng(); return Math.abs((dino.x + dino.w / 2) - m.x); }
            hop(){
                const W = canvas.width;
                if (this.giua()){ this.x = W / 2 - 125; this.y = 0; this.w = 250; this.h = 320; }
                else { this.x = W - 250; this.y = 40; this.w = 245; this.h = 280; }
            }
            cx(){ return this.x + this.w / 2; }
            cy(){ return this.y + this.h / 2; }
            gap(){ return (dino.x + dino.w / 2) - this.mieng().x; }
            dir(){ return this.huong(); }
            faceP(){ this.facingLeft = this.huong() < 0; }
            hurtP(n){
                if (this._hitF === frames) return;
                this._hitF = frames;
                if (!dino.isShielding()) dino.takeDamage(1);
                else parry(dino.y + 10);
            }
            hatVang(v, dy){ this.hat = { v: v, t: 18 }; dino.dy = dy; dino.grounded = false; }
            spd(){ return this.stage === 2 ? 1.15 : 1; }
            toIdle(t){
                this.state = 'idle'; this.t = 0; this.phong = 0; this._tuDoi = frames;
                this.actionTimer = Math.max(8, Math.round((t || BT_NGHI[this.stage]) / this.spd()));
            }
            canUse(id){ return !((this.cd[id] || 0) > 0); }
            pickSkill(){
                let kc = this.kc();
                let bo = BT_BO[this.stage].filter(id => this.canUse(id) && id !== this.lastSkill);
                // O XA QUA thi HUT thuong xuyen (Hans) — bo qua mot nua hoi chieu
                if (kc >= 480 && this.lastSkill !== 'hut' && (this.cd.hut || 0) < BT_CD.hut / 2 && Math.random() < 0.6) bo = ['hut'];
                // can chi dung khi o sat
                if (kc > 170) bo = bo.filter(id => id !== 'can');
                let vung = kc < 260 ? 0 : (kc < 480 ? 1 : 2), tong = 0, ds = [];
                for (let id of bo){ let w = (BT_TRONG[id] || [1, 1, 1])[vung]; if (w > 0){ ds.push([id, w]); tong += w; } }
                if (!tong){ this.actionTimer = 10; return; }
                let r = Math.random() * tong, c = ds[ds.length - 1][0];
                for (let [id, w] of ds){ r -= w; if (r <= 0){ c = id; break; } }
                this.lastSkill = c; this.cd[c] = BT_CD[c];
                this.state = (c === 'sau') ? 'an' : c; this.t = 0; this.faceP();   // dam tu vuc sau: an than truoc
                this.xuc.length = 0; this.tel.length = 0; this.S = {};
            }
            // ============== CHUYEN PHA: phun muc che than -> bien mat -> dam tu vuc sau -> hien giua ==============
            startPhase2(){
                this.phase = 2;
                this.hp = BT_HP[2]; this.maxHp = BT_HP[2];
                this.name = "BẠCH TUỘC VỰC THẲM — TỪ VỰC SÂU";
                this.xuc.length = 0; this.tel.length = 0; this.dan.length = 0; this.bat = null; this.hat = null;
                this.state = 'an'; this.t = 0; this.S = { chuyen: 1 };
                this.cd = {};
                floatingTexts.push(new FloatingText(this.cx() - 60, this.y - 20, "PHUN MỰC!"));
            }
            // ================= VONG CAP NHAT =================
            update(){
                this.hop();
                /* Hans: "No bi chim xuong sau qua." Nguyen nhan: bat khien (L) CHAM vao than boss
                   la mot cu PARRY chung cua game, va no ep `b.state = 'returning'` cho moi con
                   boss dang ra don. Con nay khong co trang thai 'returning' nen roi ve idle — neu
                   luc do dang TROI LEN (hien) thi `len` ket o giua chung -> than chim duoi san;
                   neu dang AN/DAM TU VUC SAU thi con te hon: tan hinh va bat tu mai mai.
                   Sua hai lop: (1) chuoi an -> sau -> hien -> entering KHONG bi cat ngang: bi ep
                   trang thai la tra lai ngay; (2) ngoai chuoi do, than luon tu troi len het va
                   hien ro lai, bat tu tu tat. */
                const CHUOI = { entering: 1, an: 1, sau: 1, hien: 1 };
                if (this._st && CHUOI[this._st] && this.state !== this._st && !this['k_' + this.state] && this.state !== 'idle'){
                    this.state = this._st; this.t = this._t;
                } else if (this._st && CHUOI[this._st] && this.state === 'idle' && this._tuDoi !== frames){
                    this.state = this._st; this.t = this._t;
                }
                if (this.state !== 'idle' && this.state !== 'entering' && !this['k_' + this.state]) this.toIdle();
                if (!CHUOI[this.state]){
                    this.len = Math.min(1, this.len + 1 / 20);
                    this.an = Math.max(0, this.an - 1 / 20);
                    this.invulnAll = false;
                    if (this.stage === 1 && this.phase === 2) this.stage = 2;   // da qua chuyen pha thi phai o giua
                }
                this.tickDan(); this.tickHat(); this.tickBat();
                this._chay();
                this._st = this.state; this._t = this.t;
            }
            _chay(){
                if (this.state === 'entering'){
                    this.len = Math.min(1, this.len + 1 / 60); this.invulnAll = true;
                    if (this.len >= 1){ this.invulnAll = false; this.toIdle(40); }
                    return;
                }
                for (let k in this.cd) if (this.cd[k] > 0) this.cd[k]--;
                if (this.state === 'idle'){
                    this.faceP(); this.xuc.length = 0; this.tel.length = 0;
                    if (--this.actionTimer <= 0) this.pickSkill();
                    return;
                }
                this.t++;
                this.xuc.length = 0;   // xuc tu cua don duoc dung lai moi khung
                if (this['k_' + this.state]) this['k_' + this.state](this.t, this.S);
                else this.toIdle();
            }
            tickHat(){
                let H = this.hat; if (!H) return;
                dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x + H.v));
                H.v *= 0.9; if (--H.t <= 0) this.hat = null;
            }
            // ---------------- HUT roi QUAT ----------------
            k_hut(T, S){
                const BAO = 30, S2 = this.stage === 2;
                let m = this.mieng(), d = this.huong();
                if (T <= BAO){ this.phong = T / BAO * 0.4; this.hutFx = T / BAO; return; }
                if (!S.quat){
                    this.hutFx = 1;
                    let px = dino.x + dino.w / 2, g = m.x - px, kc = Math.abs(g);
                    if (kc > 140){
                        let F = Math.min(BT_HUT_MAX, 6.5 + kc / 100) * (S2 ? 1.1 : 1);
                        dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x + Math.sign(g) * Math.min(F, kc - 139)));
                        if (T % 5 === 0) visualEffects.push(new Effect(px, dino.y + dino.h / 2, 'explosion', true, 6));
                    }
                    if (T >= BAO + BT_HUT_DAI || (kc <= 150 && T > BAO + 12)){
                        S.quat = 1; S.i = 0; S.k = 0; S.n = S2 ? 4 : 3; this.hutFx = 0;
                    }
                    return;
                }
                // QUAT: moi nhat 24 khung — bao 14, quat 8. Van HUT nhe (7 > toc chay 6) trong luc
                // quat de nguoi choi khong chay thoat bang cach di bo — phai nhay/cui ne, hoac luot.
                {
                    let px = dino.x + dino.w / 2, g = m.x - px, kc = Math.abs(g);
                    if (kc > 170) dino.x = Math.max(0, Math.min(canvas.width - dino.w, dino.x + Math.sign(g) * Math.min(S2 ? 7.5 : 7, kc - 169)));
                    this.hutFx = 0.5;
                }
                S.k++;
                let NH = S2 ? 20 : 24, BAOQ = S2 ? 11 : 14;
                if (S.k === 1){
                    S.cao = (S.i === 0) ? (Math.random() < 0.5) : !S.cao;
                    S.d = d; S.hit = false;
                }
                let yBand = S.cao ? [320 - 104, 320 - 34] : [320 - 44, 320];
                let x0 = S.d < 0 ? m.x - BT_QUAT_TAM : m.x, x1 = S.d < 0 ? m.x : m.x + BT_QUAT_TAM;
                if (S.k <= BAOQ){
                    this.tel.length = 0;
                    this.tel.push({ x: x0, y: yBand[0], w: x1 - x0, h: yBand[1] - yBand[0], u: S.k / BAOQ, mau: S.cao ? "#80DEEA" : "#FFAB40" });
                    // xuc tu vung ve sau
                    let base = { x: m.x, y: 300 }, tip = { x: m.x - S.d * 60, y: 140 + S.k * 2 };
                    this.xuc.push({ P: btCong(base, { x: m.x - S.d * 20, y: 200 }, tip, 12, 0), w0: 22, w1: 5 });
                } else if (S.k <= BAOQ + 8){
                    this.tel.length = 0;
                    let u = (S.k - BAOQ) / 8, yy = (yBand[0] + yBand[1]) / 2;
                    let tip = { x: m.x + S.d * BT_QUAT_TAM * u, y: yy };
                    this.xuc.push({ P: btCong({ x: m.x, y: 300 }, { x: m.x + S.d * BT_QUAT_TAM * u * 0.5, y: yy - 30 }, tip, 14, 0), w0: 24, w1: 6 });
                    let hx = Math.min(m.x, tip.x), hw = Math.abs(tip.x - m.x);
                    if (!S.hit && checkAABB(dino, { x: hx, y: yBand[0], w: hw, h: yBand[1] - yBand[0] }) && !(S.cao && dino.isCrouching)){
                        S.hit = true; this.hurtP(1);
                    }
                    if (S.k === BAOQ + 1){ shakeTimer = Math.max(shakeTimer, 6); if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(220, 0.08, 'sawtooth', 0.15, 120); }
                }
                if (S.k >= NH){ S.k = 0; S.i++; if (S.i >= S.n) this.toIdle(); }
            }
            // ---------------- DAN MUC ----------------
            k_muc(T, S){
                let so = this.stage === 2 ? 2 : 1;
                this.phong = Math.min(1, T / 26);
                if (T === 26 || (so === 2 && T === 44)){
                    let m = this.mieng(), px = dino.x + dino.w / 2, py = dino.y + dino.h / 2;
                    let ox = m.x, oy = m.y - 20;
                    let a = Math.atan2(py - oy, px - ox);
                    let v = 7.5;
                    this.dan.push({ x: ox, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, di: 0, r: BT_MUC_R });
                    this.phong = 0;
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(160, 0.12, 'sine', 0.2, 90);
                }
                if (T >= (so === 2 ? 64 : 46)) this.toIdle();
            }
            tickDan(){
                for (let i = this.dan.length - 1; i >= 0; i--){
                    let D = this.dan[i];
                    D.x += D.vx; D.y += D.vy; D.di += Math.hypot(D.vx, D.vy);
                    // cham nguoi choi: 1 dmg
                    let qx = Math.max(dino.x, Math.min(D.x, dino.x + dino.w)), qy = Math.max(dino.y, Math.min(D.y, dino.y + dino.h));
                    if (Math.hypot(D.x - qx, D.y - qy) < D.r){
                        this.hurtP(1);
                        btThemMuc(D.x, D.y, 50, 70);
                        this.dan.splice(i, 1); continue;
                    }
                    // BAY XA thi NO thanh vung nuoc den
                    if (D.di > BT_MUC_XA || D.y > 318 || D.x < -20 || D.x > canvas.width + 20){
                        btThemMuc(D.x, Math.min(D.y, 300), BT_MUC_MAY, 330);
                        visualEffects.push(new Effect(D.x, Math.min(D.y, 300), 'explosion', true, 20));
                        this.dan.splice(i, 1);
                    }
                }
            }
            // ---------------- DAP: xuc tu khong lo dap xuong ----------------
            k_dap(T, S){
                let lan = this.stage === 2 ? 2 : 1, CH = this.stage === 2 ? 28 : 34, NH = CH + 30;
                let k = (T - 1) % NH, i = Math.floor((T - 1) / NH);
                if (i >= lan){ this.toIdle(); return; }
                let m = this.mat(), goc = { x: this.giua() ? m.x + this.huong() * 70 : m.x - 70, y: 300 };
                if (k === 0){ S.tx = dino.x + dino.w / 2; S.hit = false; }
                if (k < 16) S.tx += ((dino.x + dino.w / 2) - S.tx) * 0.25;           // bam theo roi khoa
                let tx = S.tx;
                if (k < CH){
                    this.tel.length = 0;
                    this.tel.push({ x: tx - 45, y: 300, w: 90, h: 20, u: k / CH, bong: 1 });
                    let cao = -60 - 40 * (k / CH);
                    this.xuc.push({ P: btCong(goc, { x: (goc.x + tx) / 2, y: cao - 60 }, { x: tx, y: cao }, 16, 0), w0: 34, w1: 10 });
                    return;
                }
                this.tel.length = 0;
                let u = Math.min(1, (k - CH) / 3);
                let tipY = -100 + u * 410;
                this.xuc.push({ P: btCong(goc, { x: (goc.x + tx) / 2, y: 320 - 80 * (1 - u) - 150 * (1 - u) }, { x: tx, y: Math.min(310, tipY) }, 16, 0), w0: 34, w1: 12 });
                if (k === CH + 3){
                    shakeTimer = Math.max(shakeTimer, 16);
                    visualEffects.push(new Effect(tx, 314, 'explosion', true, 30));
                    if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
                }
                if (k >= CH + 2 && k <= CH + 5 && !S.hit){
                    // dau xuc tu: cot 90px; than xuc tu nam doc san: dai thap 30px (nhay qua duoc)
                    let cot = { x: tx - 45, y: -100, w: 90, h: 420 };
                    let than = { x: Math.min(goc.x, tx), y: 290, w: Math.abs(goc.x - tx), h: 30 };
                    if (checkAABB(dino, cot) || checkAABB(dino, than)){ S.hit = true; this.hurtP(1); }
                }
            }
            // ---------------- QUAT: xuc tu quet ngang san (thap: nhay / cao: cui) ----------------
            k_quet(T, S){
                const CH = this.stage === 2 ? 24 : 28, CHAY = 22;
                let m = this.mieng();
                if (T === 1){
                    S.cao = Math.random() < (this.stage === 2 ? 0.5 : 0.3);
                    S.ds = this.giua() ? [-1, 1] : [this.huong()];
                    S.hit = false;
                }
                let yB = S.cao ? [320 - 104, 320 - 40] : [320 - 46, 320];
                for (let d of S.ds){
                    let xa = d < 0 ? 0 : canvas.width;
                    if (T <= CH){
                        if (d === S.ds[0]) this.tel.length = 0;
                        this.tel.push({ x: Math.min(m.x, xa), y: yB[0], w: Math.abs(xa - m.x), h: yB[1] - yB[0], u: T / CH, mau: S.cao ? "#80DEEA" : "#FFAB40" });
                        this.xuc.push({ P: btCong({ x: m.x, y: 305 }, { x: m.x - d * 40, y: 200 }, { x: m.x - d * 90, y: 150 + T }, 12, 0), w0: 30, w1: 8 });
                    } else if (T <= CH + CHAY){
                        if (d === S.ds[0]) this.tel.length = 0;
                        let u = (T - CH) / CHAY, tip = { x: m.x + (xa - m.x) * u, y: (yB[0] + yB[1]) / 2 };
                        this.xuc.push({ P: btCong({ x: m.x, y: 305 }, { x: (m.x + tip.x) / 2, y: tip.y - 20 }, tip, 16, 4), w0: 30, w1: 8 });
                        let hb = { x: Math.min(m.x, tip.x), y: yB[0], w: Math.abs(tip.x - m.x), h: yB[1] - yB[0] };
                        if (!S.hit && checkAABB(dino, hb) && !(S.cao && dino.isCrouching)){ S.hit = true; this.hurtP(1); }
                    }
                }
                if (T === CH + 1){ shakeTimer = Math.max(shakeTimer, 8); if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(140, 0.2, 'sawtooth', 0.2, 70); }
                if (T >= CH + CHAY + 16) this.toIdle();
            }
            // ---------------- BAT: xuc tu bo doc san toi tom nguoi choi ----------------
            k_bat(T, S){
                const CH = 16, TAM = this.giua() ? 520 : 760;
                let m = this.mieng();
                if (T === 1){ S.d = this.huong(); S.tip = m.x; S.di = 0; S.ve = 0; }
                if (T <= CH){
                    this.tel.length = 0;
                    this.xuc.push({ P: btCong({ x: m.x, y: 305 }, { x: m.x + S.d * 20, y: 250 }, { x: m.x + S.d * 30, y: 230 + T }, 10, 0), w0: 24, w1: 8 });
                    return;
                }
                let B = this.bat;
                if (B && B.bat){
                    // dang giu: keo ve mieng
                    S.tip += Math.sign(m.x - S.tip) * Math.min(9, Math.abs(m.x - S.tip));
                } else if (!S.ve){
                    S.tip += S.d * 11; S.di += 11;
                    // cham nguoi choi dang o thap
                    let hb = { x: S.tip - 18, y: 320 - 30, w: 36, h: 30 };
                    if (checkAABB(dino, hb)){
                        if (dino.isShielding()){ visualEffects.push(new Effect(parryX(), dino.y + 10, 'parry')); S.ve = 1; }
                        else {
                            // giu = thanh GIAT RA: chi tut khi bam J (moi lan -6). Khong bam thi bi keo toi mieng.
                            this.bat = { bat: true, giu: this.stage === 2 ? 36 : 30 };
                            floatingTexts.push(new FloatingText(dino.x - 10, dino.y - 30, "BỊ BẮT!"));
                        }
                    }
                    if (S.di >= TAM || S.tip < 0 || S.tip > canvas.width) S.ve = 1;
                } else {
                    S.tip += Math.sign(m.x - S.tip) * 16;
                    if (Math.abs(S.tip - m.x) < 20){ this.toIdle(); return; }
                }
                let mid = (m.x + S.tip) / 2;
                this.xuc.push({ P: btCong({ x: m.x, y: 305 }, { x: mid, y: 300 }, { x: S.tip, y: 308 }, 16, 3), w0: 22, w1: 9 });
                if (B && B.bat && Math.abs(S.tip - m.x) < 30){
                    // CAN roi hat
                    dino.invincible = false; dino.invTimer = 0;
                    this.hurtP(1);
                    this.bat = null; this.hatVang(-this.huong() * 11, -9);
                    shakeTimer = Math.max(shakeTimer, 14);
                    if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
                    S.ve = 1;
                }
                if (T > 400) this.toIdle();
            }
            tickBat(){
                let B = this.bat; if (!B || !B.bat) return;
                if (this.state !== 'bat'){ this.bat = null; return; }
                let j = !!keys['KeyJ'];
                if (j && !this._jPrev) B.giu -= 6;
                this._jPrev = j;
                if (B.giu <= 0){
                    floatingTexts.push(new FloatingText(dino.x - 10, dino.y - 30, "THOÁT!"));
                    this.bat = null; dino.dy = -8; dino.grounded = false; this.S.ve = 1;
                    return;
                }
                let tip = this.S.tip;
                dino.x = tip - dino.w / 2; dino.y = 320 - dino.h - 8; dino.dy = 0;
            }
            // ---------------- DAM: dam thang ngang ----------------
            k_dam(T, S){
                let N = this.stage === 2 ? 4 : 3, NH = this.stage === 2 ? 26 : 30, BAO = this.stage === 2 ? 13 : 16, TAM = this.giua() ? 640 : 780;
                let k = (T - 1) % NH, i = Math.floor((T - 1) / NH);
                if (i >= N){ this.toIdle(); return; }
                let m = this.mieng();
                if (k === 0){
                    S.d = this.huong(); S.hit = false;
                    if (!dino.grounded) S.y = Math.max(200, Math.min(306, dino.y + dino.h / 2));
                    else S.y = Math.random() < 0.5 ? 306 : 268;          // thap: nhay · cao: cui
                    S.cao = S.y < 290;
                }
                let x0 = m.x, x1 = m.x + S.d * TAM;
                if (k < BAO){
                    this.tel.length = 0;
                    this.tel.push({ duong: 1, x0: x0, x1: x1, y: S.y, u: k / BAO });
                    this.xuc.push({ P: btCong({ x: m.x, y: 300 }, { x: m.x - S.d * 30, y: S.y }, { x: m.x - S.d * 50, y: S.y }, 8, 0), w0: 20, w1: 12 });
                    return;
                }
                this.tel.length = 0;
                let ra = Math.min(TAM, (k - BAO + 1) * 60), ve = k > BAO + 12 ? (k - BAO - 12) * 60 : 0;
                let L = Math.max(0, ra - ve), tip = { x: m.x + S.d * L, y: S.y };
                if (L > 0) this.xuc.push({ P: btCong({ x: m.x, y: 300 }, { x: m.x + S.d * L * 0.3, y: S.y }, tip, 14, 0), w0: 22, w1: 7 });
                if (!S.hit && L > 20 && k <= BAO + 12){
                    let px = dino.x + dino.w / 2, py = dino.y + dino.h / 2;
                    if (btKcDoan(px, py, m.x, S.y, tip.x, tip.y) < 12 + dino.h / 2 && !(S.cao && dino.isCrouching)){ S.hit = true; this.hurtP(1); }
                }
            }
            // ---------------- CAN (pha 2): o sat giua ----------------
            k_can(T, S){
                const CH = 18;
                let m = this.mieng(), d = S.d || (S.d = this.huong());
                let hb = { x: d < 0 ? m.x - 150 : m.x - 20, y: 320 - 90, w: 170, h: 90 };
                if (T <= CH){ this.tel.length = 0; this.tel.push({ x: hb.x, y: hb.y, w: hb.w, h: hb.h, u: T / CH, mau: "#FF8A80" }); this.phong = T / CH * 0.3; return; }
                this.tel.length = 0;
                if (T <= CH + 5 && !S.hit && checkAABB(dino, hb)){ S.hit = true; this.hurtP(1); }
                if (T === CH + 1){ shakeTimer = Math.max(shakeTimer, 8); }
                if (T >= CH + 22) this.toIdle();
            }
            // ---------------- XOAY (pha 2): xuc tu dap vong ra hai ben ----------------
            k_xoay(T, S){
                const CH = 30, MOC = [70, 130, 190, 250];
                let m = this.mat();
                if (T <= CH){
                    this.tel.length = 0;
                    for (let d of [-1, 1]) this.tel.push({ x: d < 0 ? m.x - 275 : m.x, y: 290, w: 275, h: 30, u: T / CH, mau: "#FFAB40" });
                    return;
                }
                this.tel.length = 0;
                let k = T - CH;
                for (let j = 0; j < MOC.length; j++){
                    let t0 = j * 5, uu = k - t0;
                    if (uu < 0 || uu > 14) continue;
                    for (let d of [-1, 1]){
                        let tx = m.x + d * MOC[j], dap = Math.min(1, uu / 3);
                        this.xuc.push({ P: btCong({ x: m.x + d * 30, y: 290 }, { x: m.x + d * MOC[j] * 0.6, y: 180 + dap * 80 }, { x: tx, y: 200 + dap * 110 }, 12, 0), w0: 22, w1: 8 });
                        if (uu === 3){
                            visualEffects.push(new Effect(tx, 314, 'explosion', true, 14));
                            if (!S['h' + j] && checkAABB(dino, { x: tx - 28, y: 320 - 56, w: 56, h: 56 })){ S['h' + j] = 1; this.hurtP(1); }
                        }
                    }
                }
                if (k === 3) shakeTimer = Math.max(shakeTimer, 10);
                if (k >= MOC.length * 5 + 24) this.toIdle();
            }
            // ---------------- AN: phun muc che than roi bien mat ----------------
            k_an(T, S){
                this.invulnAll = true;
                let DAI = S.chuyen ? 60 : 36, TAN = S.chuyen ? 50 : 30;
                let m = this.mat();
                if (T === 1 || T === 12 || T === 24){
                    btThemMuc(m.x + (Math.random() - 0.5) * 80, m.y + 40, 170, DAI + TAN + 40);
                    shakeTimer = Math.max(shakeTimer, 8);
                }
                if (T > DAI) this.an = Math.min(1, (T - DAI) / TAN);
                if (T >= DAI + TAN){
                    this.an = 1;
                    this.state = 'sau'; this.t = 0; S.n = S.chuyen ? 3 : (this.stage === 2 ? 2 + Math.floor(Math.random() * 2) : 3); S.i = 0;
                }
            }
            // ---------------- SAU: dam tu vuc sau (3D) ----------------
            k_sau(T, S){
                this.invulnAll = true; this.an = 1;
                const THEO = 26, BAY = 18, NH = 56;
                let k = (T - 1) % NH, i = Math.floor((T - 1) / NH);
                if (i >= S.n){ this.state = 'hien'; this.t = 0; return; }
                if (k === 0){ S.hit = false; }
                if (k < THEO){ S.rx = dino.x + dino.w / 2; S.ry = dino.y + dino.h / 2; }
                S.k = k;
                if (k === THEO + BAY){
                    shakeTimer = Math.max(shakeTimer, 14);
                    visualEffects.push(new Effect(S.rx, S.ry, 'explosion', true, 30));
                    if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
                    let px = dino.x + dino.w / 2, py = dino.y + dino.h / 2;
                    if (Math.hypot(px - S.rx, py - S.ry) < 46){ S.hit = true; this.hurtP(1); }
                }
            }
            // ---------------- HIEN: troi len o GIUA man hinh ----------------
            k_hien(T, S){
                if (T === 1){
                    this.stage = 2; this.hop(); this.len = 0; this.an = 0;
                    if (S.chuyen) floatingTexts.push(new FloatingText(canvas.width / 2 - 60, 120, "TỪ VỰC SÂU!"));
                }
                this.len = Math.min(1, T / 40);
                if (T >= 44){ this.invulnAll = false; S.chuyen = 0; this.toIdle(20); }
            }
            // ================= VE =================
            veThan(alpha){
                const W = canvas.width;
                let m = this.mat(), G = this.giua(), sc = G ? 1.35 : 1.4, d = G ? this.huong() : -1;   // KHONG LO
                let ph = 1 + this.phong * 0.18;
                ctx.save();
                ctx.globalAlpha = alpha;
                if (!G){ ctx.beginPath(); ctx.rect(-100, -400, W + 200, 722); ctx.clip(); }
                // xuc tu nghi (ve truoc than)
                let so = G ? 8 : 5;
                for (let i = 0; i < so; i++){
                    let u = so === 1 ? 0 : i / (so - 1);
                    let bx = m.x + (u - 0.5) * (G ? 150 : 120) * sc;
                    let sw = Math.sin(frames * 0.05 + i * 1.3) * 16;
                    let huongX = G ? (u < 0.5 ? -1 : 1) : -1;
                    let tip = { x: bx + huongX * (60 + (i % 3) * 30) + sw, y: 316 };
                    btVeXuc(btCong({ x: bx, y: m.y + 70 * sc }, { x: bx + huongX * 10 + sw, y: 300 }, tip, 10, 0), 16 * sc, 4, alpha, 1);
                }
                // than / ao
                ctx.translate(m.x, m.y);
                if (!G) ctx.rotate(-0.25);
                ctx.scale(sc * ph, sc * ph);
                let gg = ctx.createRadialGradient(-20, -40, 10, 0, 0, 120);
                gg.addColorStop(0, "#C2185B"); gg.addColorStop(0.6, "#8E244D"); gg.addColorStop(1, "#4A0E2A");
                ctx.fillStyle = gg;
                ctx.beginPath(); ctx.ellipse(0, -10, 92, 108, 0, 0, 6.28); ctx.fill();
                // dom
                ctx.fillStyle = "rgba(248,187,208,0.35)";
                for (let i = 0; i < 9; i++){ ctx.beginPath(); ctx.arc(Math.cos(i * 2.4) * 55, -30 + Math.sin(i * 1.7) * 55, 5 + (i % 3) * 3, 0, 6.28); ctx.fill(); }
                // mat
                if (!G) ctx.rotate(0.25);
                let px = dino.x + dino.w / 2, py = dino.y + dino.h / 2;
                for (let e of [-1, 1]){
                    let ex = e * 38, ey = 48;
                    // mi mat day, xech xuong phia giua -> mat du
                    ctx.fillStyle = "#3A0A22";
                    ctx.beginPath(); ctx.ellipse(ex, ey, 22, 17, 0, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#FFB300"; ctx.beginPath(); ctx.ellipse(ex, ey + 2, 15, 9, 0, 0, 6.28); ctx.fill();
                    let a = Math.atan2(py - (m.y + ey), px - (m.x + ex));
                    ctx.fillStyle = "#111"; ctx.fillRect(ex + Math.cos(a) * 5 - 8, ey + 2 + Math.sin(a) * 3 - 2, 16, 4);
                    ctx.fillStyle = "#3A0A22";
                    ctx.beginPath(); ctx.moveTo(ex - e * 26, ey - 16); ctx.lineTo(ex + e * 20, ey - 4); ctx.lineTo(ex + e * 22, ey - 12); ctx.lineTo(ex - e * 22, ey - 24); ctx.closePath(); ctx.fill();
                }
                // ong phun / mo
                ctx.fillStyle = "#4A0E2A";
                ctx.beginPath(); ctx.ellipse(d * 60, 88, 16 + this.phong * 10, 11 + this.phong * 8, 0, 0, 6.28); ctx.fill();
                ctx.restore();
            }
            draw(){
                const W = canvas.width;
                let alpha = 1 - this.an;
                if (this.dying) alpha *= Math.max(0, 1 - (this.deathTimer || 0) / 60);
                if (alpha > 0.02) this.veThan(alpha);
                // luong nuoc bi HUT
                if (this.state === 'hut' && this.hutFx){
                    let m = this.mieng(), d = this.huong();
                    ctx.save(); ctx.strokeStyle = "rgba(179,229,252,0.55)"; ctx.lineWidth = 2;
                    for (let i = 0; i < 14; i++){
                        let y = 120 + (i * 37) % 200, pha = ((frames * 6 + i * 73) % 600) / 600;
                        let x = m.x + d * 620 * (1 - pha);
                        ctx.globalAlpha = 0.25 + 0.5 * this.hutFx * pha;
                        ctx.beginPath(); ctx.moveTo(x, y + (m.y - y) * pha); ctx.lineTo(x - d * 40, y + (m.y - y) * pha); ctx.stroke();
                    }
                    ctx.restore();
                }
                // bao truoc
                for (let T of this.tel){
                    ctx.save();
                    if (T.duong){
                        ctx.globalAlpha = 0.35 + 0.5 * T.u; ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 2; ctx.setLineDash([8, 6]);
                        ctx.beginPath(); ctx.moveTo(T.x0, T.y); ctx.lineTo(T.x1, T.y); ctx.stroke();
                    } else if (T.bong){
                        ctx.globalAlpha = 0.25 + 0.5 * T.u; ctx.fillStyle = "#000";
                        ctx.beginPath(); ctx.ellipse(T.x + T.w / 2, 318, T.w / 2 * (0.4 + 0.6 * T.u), 8, 0, 0, 6.28); ctx.fill();
                    } else {
                        ctx.globalAlpha = 0.12 + 0.28 * T.u; ctx.fillStyle = T.mau || "#FF8A80";
                        ctx.fillRect(T.x, T.y, T.w, T.h);
                        ctx.globalAlpha = 0.6; ctx.strokeStyle = T.mau || "#FF8A80"; ctx.lineWidth = 1.5;
                        ctx.strokeRect(T.x + 0.5, T.y + 0.5, T.w - 1, T.h - 1);
                    }
                    ctx.restore();
                }
                // xuc tu don danh
                for (let X of this.xuc) btVeXuc(X.P, X.w0, X.w1, X.a);
                // dang giu nguoi choi (BAT)
                // dan muc
                for (let D of this.dan){
                    ctx.save();
                    let gg = ctx.createRadialGradient(D.x - 5, D.y - 5, 2, D.x, D.y, D.r);
                    gg.addColorStop(0, "#37474F"); gg.addColorStop(1, "#050508");
                    ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(D.x, D.y, D.r, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 0.4; ctx.fillStyle = "#050508";
                    ctx.beginPath(); ctx.arc(D.x - D.vx * 2.5, D.y - D.vy * 2.5, D.r * 0.7, 0, 6.28); ctx.fill();
                    ctx.restore();
                }
                // DAM TU VUC SAU: ong ngam + xuc tu lao ra tu diem tu
                if (this.state === 'sau' && this.S && this.S.rx !== undefined){
                    const THEO = 26, BAY = 18;
                    let S = this.S, k = S.k, vp = { x: W * BT_VP.x, y: BT_VP.y };
                    ctx.save();
                    // ong ngam
                    let khoa = k >= THEO;
                    ctx.strokeStyle = khoa ? "#FF1744" : "#FFD54F"; ctx.lineWidth = 2; ctx.globalAlpha = 0.85;
                    let r = khoa ? 46 : 46 + (THEO - k) * 2;
                    ctx.beginPath(); ctx.arc(S.rx, S.ry, r, 0, 6.28); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(S.rx - r - 8, S.ry); ctx.lineTo(S.rx - r + 10, S.ry); ctx.moveTo(S.rx + r - 10, S.ry); ctx.lineTo(S.rx + r + 8, S.ry);
                    ctx.moveTo(S.rx, S.ry - r - 8); ctx.lineTo(S.rx, S.ry - r + 10); ctx.stroke();
                    // duong phoi canh tu vuc sau
                    ctx.globalAlpha = 0.18; ctx.setLineDash([4, 8]);
                    ctx.beginPath(); ctx.moveTo(vp.x, vp.y); ctx.lineTo(S.rx, S.ry); ctx.stroke(); ctx.setLineDash([]);
                    ctx.restore();
                    if (k >= THEO){
                        let z = Math.max(0, 1 - (k - THEO) / BAY);              // 1 = sau tit, 0 = cham
                        if (k > THEO + BAY) z = Math.min(0.6, (k - THEO - BAY) / 20);
                        let tip = { x: vp.x + (S.rx - vp.x) * (1 - z), y: vp.y + (S.ry - vp.y) * (1 - z) };
                        let P = [];
                        for (let j = 0; j <= 12; j++){
                            let u = j / 12, q = Math.pow(u, 1.6);
                            P.push({ x: vp.x + (tip.x - vp.x) * q + Math.sin(u * 5 + frames * 0.3) * 8 * u, y: vp.y + (tip.y - vp.y) * q });
                        }
                        // be rong theo do sau: gan thi to
                        let wGan = 10 + 46 * (1 - z);
                        btVeXuc(P, 3 + 4 * (1 - z), wGan, 0.95, 1);
                    }
                }
                if (typeof drawTopBossBar === 'function' && !this.dying) drawTopBossBar(this, this.stage === 2 ? "#EC407A" : "#AD1457", this.name);
            }
        }
// BOSS_PART_END s0.OctopusBoss.1

// Nguồn: index.html:24461 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbKhung.1 READ_ONLY
let _tbbKhung = -1, _tbbSo = 0;
// BOSS_PART_END s0._tbbKhung.1

// Nguồn: index.html:24472 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, FireCloneBoss, GaelBoss, GiantSpiderBoss, GreatSerpentBoss, HelicoprionBoss, HoGacBoss, IaiRaptorBoss, IndominusBoss, IronhaulBoss, LavaSerpentBoss, MagmaDragoonBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PoisonMothBoss, PontiffBoss, PulsarCloneBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, StormEagleBoss, StormSerpentBoss, SummitDragonBoss, TetrisBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, VoltCloneBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0._tbbDaVe.1 READ_ONLY
let _tbbDaVe = new Set(), _tbbDaVeKhung = -1;
// BOSS_PART_END s0._tbbDaVe.1

// Nguồn: index.html:24489 · Dùng bởi: ArtoriasBoss, CorruptionBoss, DanteBoss, DeathBoss, GaelBoss, HelicoprionBoss, HoGacBoss, IronhaulBoss, MegaManXBoss, MegalodonBoss, NeroBoss, OctopusBoss, PontiffBoss, ThalassaBoss, TyrantRexBoss, UnityCloneBoss, VergilBoss, WarBoss, YasuoBoss, ZeroBoss, ZeusBoss
// BOSS_PART_BEGIN s0.drawTopBossBar.1 READ_ONLY
function drawTopBossBar(b, col, label, sub, hang){
            /* Khong truyen `hang` (boss TU ve thanh mau) ma trong cung mot khung co hai con
               cung goi thi thanh thu hai phai TU xuong hang duoi, khong de len nhau. */
            if (_tbbKhung === frames) _tbbSo++; else { _tbbSo = 0; _tbbKhung = frames; }
            /* Tap phai co DAU KHUNG rieng. Neu chi xoa o day thi khung nao KHONG con nao tu ve
               thanh mau se khong xoa gi ca, va tap giu nguyen ten boss cua khung truoc — con
               boss thuong bi coi la "da co thanh roi" mai mai, thanh ra mat sach thanh mau. */
            if (_tbbDaVeKhung !== frames){ _tbbDaVe.clear(); _tbbDaVeKhung = frames; }
            _tbbDaVe.add(b);
            let W = 340, x0 = canvas.width/2 - W/2, H = sub ? 30 : 17;
            /* SAN TAP co mot hang nut chiem tron dai y = 10..46, ve thanh mau len do la bi
               che khuat. Chi trong san tap moi day thanh xuong duoi hang nut do. */
            let _dinh = (typeof dojoMode !== 'undefined' && dojoMode) ? 52 : 10;
            let Y = _dinh + ((hang === undefined ? _tbbSo : hang)) * 34;
            ctx.save();
            /* Thanh mau la HUD, phai nam yen o dinh man hinh. Truoc day no duoc ve BEN TRONG
               phep dich camera, ma camY khoi dau la -CAM_TROI (160) — nen thanh mau tut hn
               160px xuong giua khung hinh, va o cac map camera cuon doc (bien, tetris) no con
               truot theo camera. Tra ve dung toa do MAN HINH. */
            if (typeof DPR === 'number') ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            ctx.fillStyle = "rgba(0,0,0,0.74)"; ctx.fillRect(x0 - 4, Y, W + 8, H);
            ctx.strokeStyle = "rgba(255,255,255,0.20)"; ctx.lineWidth = 1; ctx.strokeRect(x0 - 4, Y, W + 8, H);
            ctx.fillStyle = "rgba(255,255,255,0.13)"; ctx.fillRect(x0, Y + 4, W, 10);
            ctx.fillStyle = col; ctx.fillRect(x0, Y + 4, W * Math.max(0, Math.min(1, b.hp / b.maxHp)), 10);
            if (sub){
                ctx.fillStyle = "rgba(255,255,255,0.13)"; ctx.fillRect(x0, Y + 17, W, 7);
                ctx.fillStyle = sub.col; ctx.fillRect(x0, Y + 17, W * Math.max(0, Math.min(1, sub.v)), 7);
                ctx.fillStyle = "#0A0C10"; ctx.font = "bold 8px Consolas, monospace"; ctx.textAlign = "left";
                ctx.fillText(sub.name, x0 + 4, Y + 23.5);
            }
            ctx.fillStyle = "white"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
            ctx.fillText(label + "   " + Math.max(0, Math.ceil(b.hp)) + " / " + b.maxHp, canvas.width/2, Y + H + 12);
            ctx.textAlign = "left"; ctx.restore();
        }
// BOSS_PART_END s0.drawTopBossBar.1

// Nguồn: index.html:100009 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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

// Nguồn: index.html:100020 · Dùng bởi: AegisRexBoss, ArcanaRexBoss, ArtoriasBoss, ChronoRexBoss, ClawCloneBoss, CliffGolemBoss, CloneBoss, CorruptionBoss, DanteBoss, DeathBoss, DilophosBoss, DragonLordBoss, EchoStalkerBoss, EmberWolfBoss, FireCloneBoss, FireDragonBoss, FlameCoreBoss, FlameLancerBoss, ForestTitanBoss, GaelBoss, GiantSpiderBoss, GodzillaBoss, GreatApeBoss, GreatSerpentBoss, HoGacBoss, IaiRaptorBoss, IceFangBoss, IndominusBoss, LavaSerpentBoss, MagmaDragoonBoss, MagmorBoss, MegaManXBoss, MegalodonBoss, MosaBoss, MountainGodBoss, NeroBoss, OctopusBoss, PillarLordBoss, PoisonMothBoss, PontiffBoss, PteroBoss, PteroLordBoss, PulsarCloneBoss, QuetzalBoss, ScarabLordBoss, SiegeGoliathBoss, SlashBeastBoss, SoulOfCinderBoss, SpinoBoss, SpinoLordBoss, SporeCrownBoss, StoneRocBoss, StormEagleBoss, SummitDragonBoss, TRexBoss, TetrisBoss, ThalassaBoss, TrainingDummy, TriDino, TriceratopsBoss, TriceratopsLordBoss, TyrantRexBoss, UnityCloneBoss, VajraRexBoss, VergilBoss, VoltCloneBoss, WarBoss, Yasuo2Boss, YasuoBoss, ZeroBoss
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
