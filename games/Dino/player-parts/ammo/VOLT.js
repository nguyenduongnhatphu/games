// PLAYER_FILE: VOLT
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, SFX, activeLightnings, allTargets, bosses, calculateLightningChains, checkAABB, ctx, dashCd, dashVx, dino, doChieu, doChieuCo, doChieuThu, enemies, floatingTexts, frames, hasRune, luotMien, shakeTimer, ultCharge, visualEffects, vkDangKy, voltDashBat
// index.html:51025 · Phạm vi: global
// PLAYER_PART_BEGIN s4.voltLuotUlt.1 EDITABLE
function voltLuotUlt(dir){
            // Luot SET trong ult Volt: tam ngan lai (truoc kia dashVx=90 lao gan het man)
            dashVx = dir * 42; dashCd = 20;
            luotMien(dino);
            dino.lightningDashActive = 18; dino.lightningDashHit = new Set();
            // Nhanh nay chay RIENG cho Ult Volt nen rune LUOT SET bi bo qua hoan toan.
            // Goi tay de trong Ult van co tia va van an muc 6 dmg.
            if (hasRune('voltdash')) voltDashBat(dir);
        }
// PLAYER_PART_END s4.voltLuotUlt.1

// index.html:51036 · Phạm vi: Player.prototype
const __Part1 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireLightning.1 EDITABLE
fireLightning(count, totalTargets = 3) {
                this.ammo--; this.attackCooldown = 60; 
                if (count === 3 || this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 90; }
                let pos = this.getShootPos();
                activeLightnings.push({ timer: 15, chains: calculateLightningChains(pos.x, pos.y, count, totalTargets, this.id) });
                // @@HE-DOCHIEU: tia set tuc thi — dang do chieu thi phong thang vao diem do phia truoc (tam 560px)
                if (this.id === 1 && typeof doChieuThu === 'function' && typeof doChieuCo === 'function' && doChieuCo()){
                    let _tam = { x: pos.dir < 0 ? pos.x - 560 : pos.x, y: pos.y - 70, w: 560, h: 140 };
                    if (doChieuThu(_tam, _tam, 1 + count) && typeof activeLightnings !== 'undefined')
                        visualEffects.push(new Effect(doChieu.x + doChieu.w / 2, doChieu.y + doChieu.h / 2, 'lightning_shock', true, 30));
                }
            }
// PLAYER_PART_END s4.Player.prototype.fireLightning.1
};

// index.html:51048 · Phạm vi: Player.prototype
const __Part2 = {
// PLAYER_PART_BEGIN s4.Player.prototype.tickLightningEffects.1 EDITABLE
tickLightningEffects() {
                if (this.lightZaps) for (let i = this.lightZaps.length - 1; i >= 0; i--) { this.lightZaps[i].t--; if (this.lightZaps[i].t <= 0) this.lightZaps.splice(i, 1); }
                if (this.lightningDashActive > 0) {
                    this.lightningDashActive--;
                    if (!this.lightningDashHit) this.lightningDashHit = new Set();
                    // LUOT SET la don chinh cua Ult Volt, nhung danh sach o day la
                    // [...bosses, ...enemies] — nguoi choi khong nam trong hai mang do, nen o
                    // PvP no XUYEN QUA doi thu ma khong gay mot diem nao. Ult Volt vi the mat
                    // han vu khi manh nhat cua no khi danh nguoi.
                    allTargets().forEach(o => { if (!o.invulnAll && !this.lightningDashHit.has(o) && checkAABB(this, o)) { this.lightningDashHit.add(o); o.hp -= 3; visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'lightning_shock')); } });
                }
                if (this.lightningFormTimer > 0) {
                    this.lightningFormTimer--;
                    ultCharge = (this.lightningFormTimer / 1200) * 100;
                    if (this.lightningFormTimer % 60 === 0) {
                        let cxp = this.x + this.w/2, cyp = this.y + this.h/2;
                        let tg = (typeof allTargets === 'function' ? allTargets() : [...bosses, ...enemies]).filter(o => !o.invulnAll).map(o => ({ o, d: Math.hypot((o.x+o.w/2)-cxp, (o.y+o.h/2)-cyp) })).sort((a,b)=>a.d-b.d).slice(0,3).map(z=>z.o);
                        tg.forEach(o => { o.hp -= 3; this.lightZaps.push({ x1: cxp, y1: cyp, x2: o.x+o.w/2, y2: o.y+o.h/2, t: 10 }); visualEffects.push(new Effect(o.x+o.w/2, o.y+o.h/2, 'lightning_shock')); });
                        if (tg.length && typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1200, 0.08, 'sawtooth', 0.14, 500);
                    }
                }
            }
// PLAYER_PART_END s4.Player.prototype.tickLightningEffects.1
};

// index.html:51070 · Phạm vi: Player.prototype
const __Part3 = {
// PLAYER_PART_BEGIN s4.Player.prototype.drawLightningFx.1 EDITABLE
drawLightningFx() {
                if (this.lightChannel && this.lightLinkTargets) { let cx = this.x + this.w/2, cy = this.y + this.h/2; this.lightLinkTargets.forEach(o => { if (o && o.hp > 0) this._bolt(cx, cy, o.x + o.w/2, o.y + o.h/2, '#00E5FF'); }); }
                if (this.lightZaps) for (let z of this.lightZaps) this._bolt(z.x1, z.y1, z.x2, z.y2, '#00E5FF');
                if (this.lightningFormTimer > 0) {
                    let cx = this.x + this.w/2, cy = this.y + this.h/2;
                    ctx.save(); ctx.globalCompositeOperation = 'lighter';
                    let R = 40 + Math.sin(frames*0.5)*6, g = ctx.createRadialGradient(cx, cy, 6, cx, cy, R);
                    g.addColorStop(0, 'rgba(120,230,255,0.5)'); g.addColorStop(0.6, 'rgba(0,180,255,0.22)'); g.addColorStop(1, 'rgba(0,140,255,0)');
                    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = 'rgba(200,240,255,0.8)'; ctx.lineWidth = 1.5;
                    for (let i = 0; i < 3; i++) { let a = Math.random()*Math.PI*2, l = 18 + Math.random()*20; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a)*l, cy + Math.sin(a)*l); ctx.stroke(); }
                    if (this.lightningDashActive > 0) {
                        ctx.strokeStyle = 'rgba(120,230,255,0.85)'; ctx.lineWidth = 3; ctx.shadowBlur = 8; ctx.shadowColor = '#00E5FF';
                        let bx = this.x + (dashVx > 0 ? 0 : this.w);
                        for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(bx, cy + k*12); ctx.lineTo(bx - dashVx*4, cy + k*12 + (Math.random()-0.5)*8); ctx.stroke(); }
                    }
                    ctx.restore();
                }
            }
// PLAYER_PART_END s4.Player.prototype.drawLightningFx.1
};

// index.html:51089 · Phạm vi: Player.prototype
const __Part4 = {
// PLAYER_PART_BEGIN s4.Player.prototype._bolt.1 EDITABLE
_bolt(x1, y1, x2, y2, col) {
                ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.shadowBlur = 8; ctx.shadowColor = col;
                ctx.beginPath(); ctx.moveTo(x1, y1); let seg = 6; for (let i = 1; i <= seg; i++) { let t = i / seg, mx = x1 + (x2 - x1) * t + (i < seg ? (Math.random() - 0.5) * 16 : 0), my = y1 + (y2 - y1) * t + (i < seg ? (Math.random() - 0.5) * 16 : 0); ctx.lineTo(mx, my); } ctx.stroke(); ctx.restore();
            }
// PLAYER_PART_END s4.Player.prototype._bolt.1
};

// index.html:51095 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.6 EDITABLE
vkDangKy(4, {
            ten: 'VOLT', mauUlt: '#00E5FF',
            sacToiDa: 90,              // so khung tich K cho day vong (maxChargeFrames)
            banJ(){
                if (this.ammo > 0) this.fireLightning(1, 3);
            },
            nhaK(){
                if (this.lightChannel) { this.lightChannel = false; this.lightLinkTargets = null; }
                else {
                let totalTargets = 3 + Math.floor(this.aKeyHeldTime / 15);
                // TIA THU 4 va THU 5 o moc 2 giay / 2.5 giay
                let _soTia = this.aKeyHeldTime >= 150 ? 5 : (this.aKeyHeldTime >= 120 ? 4 : 3);
                if (this.aKeyHeldTime >= 120){
                    this.fireLightning(_soTia, totalTargets);
                    floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, _soTia + ' TIA!'));
                }
                else if (this.chargeProgress >= 100) this.fireLightning(3, totalTargets);
                else if (this.chargeProgress >= 50 && this.ammo > 0 && !this.isOverheated && this.attackCooldown <= 0) this.fireLightning(2, totalTargets);
                else if (this.ammo > 0 && !this.isOverheated && this.attackCooldown <= 0) this.fireLightning(1, totalTargets);
                }
            },
            channel(){
                this.lightChannel = true;
                let cxp = this.x + this.w/2, cyp = this.y + this.h/2;
                this.lightLinkTargets = (typeof allTargets === 'function' ? allTargets() : [...bosses, ...enemies]).filter(o => !o.invulnAll).map(o => ({ o, d: Math.hypot((o.x+o.w/2)-cxp, (o.y+o.h/2)-cyp) })).sort((a,b)=>a.d-b.d).slice(0,4).map(z=>z.o);
                if (frames % 15 === 0) this.lightLinkTargets.forEach(o => { if (!o.invulnAll) o.hp -= 1; });
                if (frames % 6 === 0 && typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1500 + Math.random()*300, 0.03, 'sawtooth', 0.04, 900);
            },
            veSac(pos){
                if (!(this.chargeProgress > 0 && this.laserActiveTimer <= 0)) return;
                ctx.strokeStyle = "#00E5FF"; ctx.lineWidth = 2;
                let boltCount = Math.floor(this.chargeProgress / 15) + 1;
                for(let i = 0; i < boltCount; i++) {
                    ctx.beginPath(); ctx.moveTo(pos.x, pos.y);
                    let angle = (Math.random() - 0.5) * Math.PI; let length = 15 + Math.random() * 25;
                    ctx.lineTo(pos.x + Math.cos(angle)*length * pos.dir, pos.y + Math.sin(angle)*length); ctx.stroke();
                }
            },
            batUlt(){
                ultCharge = 0; this.lightningFormTimer = 1200;
                this.aKeyHeldTime = 0; this.chargeProgress = 0;
                floatingTexts.push(new FloatingText(this.x, this.y - 30, "LIGHTNING FORM!"));
                shakeTimer = Math.max(shakeTimer, 24);
                if (typeof SFX !== 'undefined' && SFX.tone) { SFX.tone(900, 0.2, 'sawtooth', 0.25, 1400); SFX.tone(1400, 0.3, 'square', 0.15, 1800); }
            },
            ultTick(ammo, fireKey, chargeKey){
                if (chargeKey && this.attackCooldown <= 0 && ultCharge > 0) {
                    this.attackCooldown = 20;
                    ultCharge = Math.max(0, ultCharge - 10);
                    let pool = [...bosses, ...enemies].filter(o => !o.invulnAll), cxp = this.x + this.w / 2, cyp = this.y + this.h / 2;
                    if (pool.length > 0) {
                        let root = pool.reduce((a, b) => (Math.hypot((a.x + a.w / 2) - cxp, (a.y + a.h / 2) - cyp) < Math.hypot((b.x + b.w / 2) - cxp, (b.y + b.h / 2) - cyp) ? a : b));
                        let hit = new Set([root]), arcs = [], spreadR = 900;
                        root.hp -= 5;
                        this.ultBolts.push({ sky: true, x: root.x + root.w / 2, y: root.y + root.h / 2, timer: 14 });
                        let pick = (fx, fy, n) => pool.filter(o => !hit.has(o)).map(o => ({ o, d: Math.hypot((o.x + o.w / 2) - fx, (o.y + o.h / 2) - fy) })).filter(z => z.d <= spreadR).sort((a, b) => a.d - b.d).slice(0, n).map(z => z.o);
                        pick(root.x + root.w / 2, root.y + root.h / 2, 3).forEach(t1 => {
                            hit.add(t1); t1.hp -= 5; arcs.push({ x1: root.x + root.w / 2, y1: root.y + root.h / 2, x2: t1.x + t1.w / 2, y2: t1.y + t1.h / 2 });
                            pick(t1.x + t1.w / 2, t1.y + t1.h / 2, 3).forEach(t2 => { hit.add(t2); t2.hp -= 5; arcs.push({ x1: t1.x + t1.w / 2, y1: t1.y + t1.h / 2, x2: t2.x + t2.w / 2, y2: t2.y + t2.h / 2 }); });
                        });
                        if (hit.size === 1) root.hp -= 5;
                        this.ultBolts.push({ arcs: arcs, timer: 14 });
                        visualEffects.push(new Effect(root.x + root.w / 2, root.y + root.h / 2, 'lightning_burst', true, 1.3));
                        hit.forEach(o => visualEffects.push(new Effect(o.x + o.w / 2, o.y + o.h / 2, 'lightning_shock')));
                        SFX.tone(1200, 0.12, 'sawtooth', 0.25, 400); SFX.noise(0.1, 0.15, 4000, 'highpass');
                    }
                    if (ultCharge <= 0) this.endUlt();
                } else if (fireKey && ultCharge > 0) {
                    if (this.ultTimer % 12 === 0) ultCharge = Math.max(0, ultCharge - 1);
                    let cxp = this.x + this.w / 2, cyp = this.y + this.h / 2;
                    let tg = allTargets().filter(o => !o.invulnAll).map(o => ({ o, d: Math.hypot((o.x + o.w / 2) - cxp, (o.y + o.h / 2) - cyp) })).sort((a, b) => a.d - b.d).slice(0, 4).map(z => z.o);
                    if (this.ultTimer % 15 === 0) tg.forEach(o => o.hp -= 1);
                    this.ultLightTargets = tg;
                    if (this.ultTimer % 5 === 0) SFX.tone(1400 + Math.random() * 400, 0.05, 'sawtooth', 0.06, 900);
                    if (ultCharge <= 0) this.endUlt();
                } else { this.ultLightTargets = null; }
                return;
            },
            veUlt(){
                if (!this.ultActive) return;
                let cx = this.x + this.w / 2, cy = this.y + this.h / 2;
                if (this.ultLightTargets) this.ultLightTargets.forEach(o => this._bolt(cx, cy, o.x + o.w / 2, o.y + o.h / 2, '#00E5FF'));
                if (this.ultBolts) { for (let i = this.ultBolts.length - 1; i >= 0; i--) { let b = this.ultBolts[i]; if (b.sky) { this._bolt(b.x, 0, b.x, b.y, '#00E5FF'); } if (b.arcs) b.arcs.forEach(ar => this._bolt(ar.x1, ar.y1, ar.x2, ar.y2, '#00E5FF')); b.timer--; if (b.timer <= 0) this.ultBolts.splice(i, 1); } }
            },
            hoverSac(half){
                this.fireLightning(2, 3 + Math.floor(half / 15));
            }
        });
// PLAYER_PART_END s4.vkDangKy.6
