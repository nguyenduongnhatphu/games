// PLAYER_FILE: PULSAR
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, Projectile, SFX, allTargets, canvas, combatStance, ctx, dealDamage, floatingTexts, frames, hasRune, projectiles, shakeTimer, ultCharge, visualEffects, vkDangKy, worldCX, worldL, worldR
// index.html:53242 · Phạm vi: global
// PLAYER_PART_BEGIN s4.pulsarScaledDamage.1 EDITABLE
function pulsarScaledDamage(proj) {
            if (!proj || (!proj.pulsar && !proj._fromStar)) return proj ? (proj.dmg || 1) : 1;
            // ~23 cm visible playfield; +1 damage every 6 cm, continuous in between.
            // Dan DO RUC cua Supernova an CO DINH 2 dmg. Truoc day no bi cong thuc "cang bay
            // cang dau" ghi de nen luc moi ban ra chi co 1 dmg — dung luc can dau nhat.
            if (proj._novaRed) return 2;
            if (proj._prismStar){
                const sc = Math.max(1, canvas.width * (6/23));
                const bs = proj._prismBase || 2, mx = proj._prismMax || 3;
                return bs + Math.max(0, Math.min(mx - bs, (proj._pulsarTravel || 0) / sc));
            }
            const sixCm = Math.max(1, canvas.width * (6/23));
            const maxDmg = proj.pulsar ? 3 : 2;
            const t = Math.max(0, Math.min(maxDmg - 1, (proj._pulsarTravel || 0) / sixCm));
            return 1 + t;
        }
// PLAYER_PART_END s4.pulsarScaledDamage.1

// index.html:53260 · Phạm vi: Player.prototype
const __Part1 = {
// PLAYER_PART_BEGIN s4.Player.prototype.firePulsarBullet.1 EDITABLE
firePulsarBullet() {
                this.ammo--; this.attackCooldown = 60; let pos = this.getShootPos();
                let p = new Projectile(pos.x, pos.y - 8, 1, 6, 0, 999, pos.dir, this.id); p.pulsar = true;
                projectiles.push(p);
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.firePulsarBullet.1
};

// index.html:53268 · Phạm vi: Player.prototype
const __Part2 = {
// PLAYER_PART_BEGIN s4.Player.prototype.pulsarBac.1 EDITABLE
pulsarBac(f) {
                // Nhip giu nguyen 15 tu moc 120 tro len: neu vua tang so tia vua rut ngan nhip
                // thi san luong thanh ~2.3 lan chu khong phai ~1.5 lan.
                if (f >= 240) return { perEdge: 11, spin: 0.60, emitCd: 15 };
                if (f >= 180) return { perEdge:  9, spin: 0.50, emitCd: 15 };
                if (f >= 120) return { perEdge:  7, spin: 0.40, emitCd: 15 };
                if (f >=  90) return { perEdge:  6, spin: 0.34, emitCd: 16 };
                if (f >=  75) return { perEdge:  5, spin: 0.28, emitCd: 18 };
                if (f >=  30) return { perEdge:  4, spin: 0.22, emitCd: 21 };
                return              { perEdge:  3, spin: 0.15, emitCd: 24 };
            }
// PLAYER_PART_END s4.Player.prototype.pulsarBac.1
};

// index.html:53279 · Phạm vi: Player.prototype
const __Part3 = {
// PLAYER_PART_BEGIN s4.Player.prototype.createPulsarStar.1 EDITABLE
createPulsarStar(f, onBody) {
                let b = this.pulsarBac(f);
                // Luon dat o GIUA ban do. Truoc day che do giu (onBody) sinh sao ngay tren
                // nguoi choi, nen dan J vua ra khoi nong da nam trong ban kinh nuot 26px.
                let cx = worldCX(), cy = this.y + this.h/2;
                this.pulsarStar = { x: cx, y: cy, timer: onBody ? 999999 : 180, angle: 0,
                                    spin: b.spin, perEdge: b.perEdge, nhip: b.emitCd,
                                    queue: 0, emitStep: 0, emitCd: 0, onBody: onBody, bac: 0 };
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(620, 0.15, 'triangle', 0.2, 900);
            }
// PLAYER_PART_END s4.Player.prototype.createPulsarStar.1
};

// index.html:53289 · Phạm vi: Player.prototype
const __Part4 = {
// PLAYER_PART_BEGIN s4.Player.prototype._pulsarUltCho.1 EDITABLE
_pulsarUltCho(i){
                const TL = [0.5, 0.88, 0.12, 0.70, 0.30];
                let L = worldL(), R = worldR();
                return L + (R - L) * TL[i % 5];
            }
// PLAYER_PART_END s4.Player.prototype._pulsarUltCho.1
};

// index.html:53294 · Phạm vi: Player.prototype
const __Part5 = {
// PLAYER_PART_BEGIN s4.Player.prototype._tickPulsarUlt.1 EDITABLE
_tickPulsarUlt(){
                let U = this.pulsarUlt; if (!U) return;
                U.t++;
                // --- sinh thien thach: 10 cai trong 10 giay ---
                // Chu ky 5 vi tri chay HAI luot (i % 5), giu nguyen nhip 1 cai/giay.
                if (U.soThach < 10 && U.t >= U.soThach * 60 + 1){
                    let tx = this._pulsarUltCho(U.soThach);
                    U.thach.push({ x: tx, y: -60, vy: 9.5, spin: 0, no: false });
                    U.soThach++;
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(300, 0.14, 'triangle', 0.18, 700);
                }
                // --- thien thach roi ---
                for (let k = U.thach.length - 1; k >= 0; k--){
                    let m = U.thach[k];
                    m.y += m.vy; m.vy += 0.16; m.spin += 0.28;
                    if (m.y < 292) continue;
                    // DAP DAT: 5 dmg trong ban kinh, roi toa 12 goc dan (moi goc MOT vien)
                    let ex = m.x, ey = 300;
                    allTargets().forEach(o => {
                        if (o.invulnAll) return;
                        if (Math.hypot((o.x + (o.w||20)/2) - ex, (o.y + (o.h||20)/2) - ey) > 82) return;
                        dealDamage(o, 5, 'flat');
                    });
                    for (let d = 0; d < 12; d++){
                        let a2 = d * (Math.PI*2/12) - Math.PI/24;
                        let pr = new Projectile(ex, ey - 6, 1, 6, 0, 0, 1, this.id);
                        pr.speed = Math.cos(a2) * 7.4; pr.vy = Math.sin(a2) * 7.4;
                        pr._fromStar = true; pr._pulsarTravel = 0;
                        pr._pulsarMaxDist = canvas.width * (16/23); pr._pulsarTier = 1;
                        projectiles.push(pr);
                    }
                    visualEffects.push(new Effect(ex, ey, 'explosion', true, 1.9));
                    shakeTimer = Math.max(shakeTimer, 34);
                    if (typeof SFX !== 'undefined'){ if (SFX.glassBreak) SFX.glassBreak(); if (SFX.tone) SFX.tone(120, 0.3, 'sawtooth', 0.28, 60); }
                    U.thach.splice(k, 1);
                }
                // --- DAN DO RUC quanh nguoi choi, tu tim muc tieu (2 dmg) ---
                U.doCd--;
                if (U.doCd <= 0){
                    U.doCd = 60;   // 1 loat/giay x 5 vien x 2 dmg = ~50 trong 5 giay
                    let cx = this.x + this.w/2, cy = this.y + this.h/2;
                    for (let k = 0; k < 5; k++){
                        let a2 = (k/5) * Math.PI*2 + U.t*0.05;
                        let pr = new Projectile(cx + Math.cos(a2)*30, cy + Math.sin(a2)*24, 1, 6, 0, 0, 1, this.id);
                        pr.speed = Math.cos(a2)*4.2; pr.vy = Math.sin(a2)*4.2;
                        pr._fromStar = true; pr._pulsarTravel = 0;
                        pr._pulsarMaxDist = canvas.width * (20/23); pr._pulsarTier = 1;
                        pr._novaRed = true; pr.dmg = 2;
                        projectiles.push(pr);
                    }
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880, 0.05, 'square', 0.10, 500);
                }
                // Keo dai theo so thien thach: 10 cai x 60 khung. Neu van de 300 thi ult tat
                // giua chung va nam thien thach sau khong bao gio duoc sinh ra.
                if (U.t > 600 && !U.thach.length) this.pulsarUlt = null;
            }
// PLAYER_PART_END s4.Player.prototype._tickPulsarUlt.1
};

// index.html:53350 · Phạm vi: Player.prototype
const __Part6 = {
// PLAYER_PART_BEGIN s4.Player.prototype._pulsarEmitRound.1 EDITABLE
_pulsarEmitRound(st) {
                let SO = st.perEdge || 5;
                for (let i = 0; i < SO; i++) { let a = st.angle + i * (Math.PI*2/SO), sp = 8; let p = new Projectile(st.x, st.y, 1, 6, 0, 0, 1, this.id); p.speed = Math.cos(a)*sp; p.vy = Math.sin(a)*sp; p._fromStar = true; p._pulsarTravel=0; p._pulsarMaxDist=canvas.width*0.52; p._pulsarTier=1; projectiles.push(p); }
                if (typeof SFX !== 'undefined' && SFX.shoot && frames % 4 === 0) SFX.shoot(3);
            }
// PLAYER_PART_END s4.Player.prototype._pulsarEmitRound.1
};

// index.html:53355 · Phạm vi: Player.prototype
const __Part7 = {
// PLAYER_PART_BEGIN s4.Player.prototype.tickPulsar.1 EDITABLE
tickPulsar() {
                if (this.pulsarStar) {
                    let st = this.pulsarStar;
                    // DUNG YEN o cho da dat — ca luc dang giu phim. Truoc day che do giu keo
                    // sao bam dinh nguoi choi, con che do tu do van keo y theo nguoi choi.
                    // CHAM DAN khi da tha phim: giam ve 45% chu khong dung han.
                    if (st.spinDich !== undefined) st.spin += (st.spinDich - st.spin) * 0.02;
                    st.angle += st.spin;
                    if (st.timer > 0) st.timer--;
                    if (st.onBody) { st.emitCd--; if (st.emitCd <= 0) { this._pulsarEmitRound(st); st.emitCd = st.nhip || 15; } }
                    else {
                        // ===== LO DEN: ngoi sao HUT MOI vien dan cua nguoi choi o gan =====
                        // Truoc day chi vien co co 'pulsar' va phai TU bay trung o 36x36 moi tinh
                        // -> ban lech la phi ca phat. Gio dan tu cong ve sao nen luon vao duoc.
                        const PULL_R = 210, EAT_R = 26;
                        for (let pi = projectiles.length - 1; pi >= 0; pi--) {
                            let b = projectiles[pi];
                            if (!b || b.owner !== this.id || b._starEaten || b._fromStar) continue;
                            b._tuoi = (b._tuoi || 0) + 1;
                            if (b._tuoi < 4) continue;   // dan vua roi nong thi chua the bi nuot
                            let bx = b.x + b.w / 2, by = b.y + b.h / 2;
                            let dx = st.x - bx, dy = st.y - by, d = Math.hypot(dx, dy);
                            if (d > PULL_R) continue;
                            if (d < EAT_R) {
                                b._starEaten = true;
                                st.queue += st.perEdge;
                                st.eatFlash = 8;
                                visualEffects.push(new Effect(st.x, st.y, 'parry', false));
                                projectiles.splice(pi, 1);
                                continue;
                            }
                            // BE HUONG chu khong chi cong luc: chi cong gia toc thi dan co van toc
                            // ngang se BAY VONG QUANH mai o ria (quy dao quanh tam) va khong bao giờ roi vao.
                            let ux = dx / d, uy = dy / d;
                            let t = 1 - d / PULL_R;                      // 0 = xa, 1 = sat tam
                            let mag = Math.hypot(b.speed || 0, b.vy || 0) || 1;
                            let sp = Math.max(mag, 7) + 0.4;             // hut vao thi nhanh dan
                            if (d < 70) {
                                // VUNG BAT: ep bay THANG vao tam, khong con thanh phan ngang
                                b.speed = ux * sp; b.vy = uy * sp;
                            } else {
                                let steer = 0.07 + 0.40 * t;             // cang gan cang be gap
                                let nx = (b.speed || 0) / mag * (1 - steer) + ux * steer;
                                let ny = (b.vy || 0) / mag * (1 - steer) + uy * steer;
                                let nm = Math.hypot(nx, ny) || 1;
                                b.speed = nx / nm * sp; b.vy = ny / nm * sp;
                            }
                        }
                        if (st.eatFlash > 0) st.eatFlash--;
                        if (st.queue > 0) { st.emitStep--; if (st.emitStep <= 0) { this._pulsarEmitRound(st); st.queue--; st.emitStep = 3; } }
                        if (st.timer <= 0) this.pulsarStar = null;
                    }
                }
                if (this.pulsarUlt) this._tickPulsarUlt();
        // (da xoa: code chet, khong con duong nao chay toi)
            }
// PLAYER_PART_END s4.Player.prototype.tickPulsar.1
};

// index.html:53411 · Phạm vi: Player.prototype
const __Part8 = {
// PLAYER_PART_BEGIN s4.Player.prototype._drawStar.1 EDITABLE
_drawStar(cx, cy, R, angle, col, big) {
                ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
                ctx.shadowBlur = big ? 24 : 12; ctx.shadowColor = col; ctx.fillStyle = col; ctx.beginPath();
                for (let i = 0; i < 10; i++) { let rr = (i % 2 === 0) ? R : R * 0.42, a = (i * Math.PI / 5) - Math.PI/2, px = Math.cos(a) * rr, py = Math.sin(a) * rr; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
                ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#FFFDE7'; ctx.beginPath(); ctx.arc(0, 0, R * 0.28, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            }
// PLAYER_PART_END s4.Player.prototype._drawStar.1
};

// index.html:53419 · Phạm vi: Player.prototype
const __Part9 = {
// PLAYER_PART_BEGIN s4.Player.prototype.drawPulsar.1 EDITABLE
drawPulsar() {
                // VUNG HUT cua ngoi sao (chi sao doc lap moi hut) — cho nguoi choi biet ban vao dau cung duoc
                if (this.pulsarStar && !this.pulsarStar.onBody) {
                    let st = this.pulsarStar, R = 210, ef = (st.eatFlash || 0) / 8;
                    ctx.save();
                    ctx.globalAlpha = 0.10 + 0.16 * ef;
                    let g = ctx.createRadialGradient(st.x, st.y, 10, st.x, st.y, R);
                    g.addColorStop(0, "rgba(255,235,59,0.55)"); g.addColorStop(0.55, "rgba(255,193,7,0.10)"); g.addColorStop(1, "rgba(255,193,7,0)");
                    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(st.x, st.y, R, 0, Math.PI * 2); ctx.fill();
                    // 4 nhanh xoay oc huong vao tam
                    ctx.globalAlpha = 0.30 + 0.5 * ef;
                    ctx.strokeStyle = "#FFE082"; ctx.lineWidth = 2;
                    for (let k = 0; k < 4; k++) {
                        ctx.beginPath();
                        for (let t = 0; t <= 14; t++) {
                            let u = t / 14, rr = R * (1 - u), aa = st.angle * 1.6 + k * (Math.PI / 2) + u * 2.4;
                            let px = st.x + Math.cos(aa) * rr, py = st.y + Math.sin(aa) * rr;
                            if (t === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                        }
                        ctx.stroke();
                    }
                    ctx.restore();
                }
                if (this.pulsarStar) this._drawStar(this.pulsarStar.x, this.pulsarStar.y, this.pulsarStar.onBody ? 16 : 20, this.pulsarStar.angle, this.pulsarStar.onBody ? '#FFD54F' : '#FFEB3B', false);
                // Ve TAT CA cac khau. Vong lap chinh gan this.sentry = null sau khi tick,
                // nen dong cu chi ve duoc mot khau — thuc te la KHONG ve khau nao.
                if (this.sentries) for (let _s of this.sentries){ this.sentry = _s; this._veSentry(); }
                this.sentry = null;
                if (this.pulsarUlt){
                    for (let m of this.pulsarUlt.thach){
                        // vach bao diem roi
                        ctx.save(); ctx.globalAlpha = 0.35 + 0.3*Math.sin(frames*0.4);
                        ctx.strokeStyle = '#FFD54F'; ctx.lineWidth = 3;
                        ctx.beginPath(); ctx.ellipse(m.x, 314, 74, 12, 0, 0, Math.PI*2); ctx.stroke();
                        ctx.globalAlpha = 0.18; ctx.fillStyle = '#FF7043';
                        ctx.fillRect(m.x - 4, 0, 8, 320); ctx.restore();
                        this._drawStar(m.x, m.y, 40, m.spin, '#FFD54F', true);
                        // duoi lua
                        ctx.save();
                        for (let k = 1; k <= 6; k++){
                            ctx.globalAlpha = 0.30 - k*0.04;
                            ctx.fillStyle = k < 3 ? '#FFE082' : '#FF7043';
                            ctx.beginPath(); ctx.arc(m.x, m.y - k*22, 30 - k*3.5, 0, Math.PI*2); ctx.fill();
                        }
                        ctx.restore();
                    }
                    // hao quang do quanh nguoi choi
                    ctx.save();
                    ctx.globalAlpha = 0.16 + 0.10*Math.sin(frames*0.3);
                    ctx.fillStyle = '#FF1744';
                    ctx.beginPath(); ctx.arc(this.x + this.w/2, this.y + this.h/2, 40, 0, Math.PI*2); ctx.fill();
                    ctx.restore();
                }
            }
// PLAYER_PART_END s4.Player.prototype.drawPulsar.1
};

// index.html:53474 · Phạm vi: Player.prototype
const __Part10 = {
// PLAYER_PART_BEGIN s4.Player.prototype.pulsarTickRoi.1 EDITABLE
pulsarTickRoi(crouchKey) {
                if (crouchKey && !this.grounded) { this.dy += 2.2; }
                else { this.dy += this.gravity * (hasRune('hyperspeed') ? 1.5 : 1); if (!this.grounded && this.dy > 2.2 * (hasRune('hyperspeed') ? 1.5 : 1)) this.dy = 2.2 * (hasRune('hyperspeed') ? 1.5 : 1); }
                this.y += this.dy;
                if (this.y >= 320 - this.h) { this.y = 320 - this.h; this.dy = 0; this.grounded = true; this.canDoubleJump = false; this.triggerBodySlamImpact(); this.jumpCount = 0; this.bodySlamArmed = false; }
            }
// PLAYER_PART_END s4.Player.prototype.pulsarTickRoi.1
};

// index.html:53482 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.8 EDITABLE
vkDangKy(6, {
            ten: 'PULSAR',
            sacToiDa: 120,
            banJ(){
                if (this.ammo > 0) this.firePulsarBullet();
            },
            // Pulsar: GIU K la ngoi sao hien ra NGAY, giu cang lau thi xoay cang nhanh
            // va ban cang nhieu. Truoc day phai giu du 3s sao moi moc, va no bi chot cung
            // o 3 tia / 0.28 xoay nen giu them chang duoc gi.
            giuK(){
                if (!(combatStance === 0 && !this.isOverheated)) return;
                if (!this.pulsarStar) this.createPulsarStar(0, true);
                let ST = this.pulsarStar;
                if (ST && ST.onBody) {
                    let b = this.pulsarBac(this.aKeyHeldTime);
                    if (b.perEdge !== ST.perEdge && typeof SFX !== 'undefined' && SFX.tone)
                        SFX.tone(520 + b.perEdge * 60, 0.06, 'triangle', 0.16, 1200);
                    ST.spin = b.spin; ST.perEdge = b.perEdge; ST.nhip = b.emitCd;
                    ST.timer = 999999;
                }
                // Channel van bat o 3s cho cac he khac, nhung KHONG tao lai sao nua —
                // ngoi sao dang giu phai song xuyen qua moc Channel.
                if (this.aKeyHeldTime >= 180) this.pulsarChannel = true;
            },
            nhaK(){
                this.pulsarChannel = false;
                let ST = this.pulsarStar;
                if (ST && ST.onBody) {
                    // TACH RA tai cho thay vi xoa trang: giu nguyen bac da tich duoc
                    // trong luc giu phim, roi chuyen sang che do hut dan.
                    ST.onBody = false; ST.timer = 180; ST.queue = 0; ST.emitStep = 0;
                    ST.spinDich = ST.spin * 0.45;
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880, 0.18, 'triangle', 0.22, 1400);
                } else if (!ST) this.createPulsarStar(this.aKeyHeldTime, false);
            },
            batUlt(){
                ultCharge = 0;
                // BO thien thach THU HAI (truoc day niem khi dang co san ngoi sao doc lap).
                // No ban them 180 vien nua -> mot lan Ult tao 360 vien, vua lag vua thua
                // vi dan Pulsar moi da tu tang sat thuong theo quang duong bay.
                // ===== SUPERNOVA (viet lai) =====
                // Truoc day chi la MOT thien thach roi xuong roi rai 72 vien tran 2 dmg -> yeu.
                // Gio: 5 giay, 5 THIEN THACH roi lan luot chia deu ban do, moi cai 5 dmg khi
                // dap dat + 12 goc dan toa tron. Nguoi choi dong thoi phun dan DO RUC tu ngan
                // (2 dmg) tu dong tim muc tieu.
                this.pulsarUlt = { t: 0, soThach: 0, doCd: 0, thach: [] };
                this.aKeyHeldTime = 0; this.chargeProgress = 0;
                floatingTexts.push(new FloatingText(this.x, this.y - 30, "SUPERNOVA!"));
                shakeTimer = Math.max(shakeTimer, 24);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(500, 0.3, 'triangle', 0.25, 900);
            },
            hoverSac(half){
                if (!this.pulsarStar) this.createPulsarStar(half, false); this.firePulsarBullet();
            }
        });
// PLAYER_PART_END s4.vkDangKy.8
