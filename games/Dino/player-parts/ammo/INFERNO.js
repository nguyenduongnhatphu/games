// PLAYER_FILE: INFERNO
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, LT, MUA_HOA_DMG, PULSE_THAN, PVP_HS, Projectile, SFX, allTargets, bosses, canvas, checkAABB, combatStance, ctx, currentAmmoType, damageBossWithFirstStrike, damageFromAmmoAny, dealDamage, dino, dino2, enemies, floatingTexts, frames, gameState, hasRune, lanP1, obstacles, overchargeT, projectiles, pvpDich, pvpNguoi1, pvpVoBoc, score, shakeTimer, ultCharge, visualEffects, vkDangKy
// index.html:49497 · Phạm vi: global
// PLAYER_PART_BEGIN s4.INF_XANH_CHO.1 EDITABLE
const INF_XANH_CHO = 180;
// PLAYER_PART_END s4.INF_XANH_CHO.1

// index.html:49498 · Phạm vi: global
// PLAYER_PART_BEGIN s4.INF_XANH_DMG.1 EDITABLE
const INF_XANH_DMG = 6;
// PLAYER_PART_END s4.INF_XANH_DMG.1

// index.html:49499 · Phạm vi: global
// PLAYER_PART_BEGIN s4.INF_NOVA_NOI.1 EDITABLE
const INF_NOVA_NOI = 60;
// PLAYER_PART_END s4.INF_NOVA_NOI.1

// index.html:49504 · Phạm vi: global
// PLAYER_PART_BEGIN s4.INF_NHIET_BAT.1 EDITABLE
var INF_NHIET_BAT = true;
// PLAYER_PART_END s4.INF_NHIET_BAT.1

// index.html:49505 · Phạm vi: global
// PLAYER_PART_BEGIN s4.INF_NHIET_CAN.1 EDITABLE
const INF_NHIET_CAN = 3, INF_NHIET_QUET = 30, INF_XUNG_DMG = 5, INF_XUNG_TO_DMG = 8, INF_ULT_XUNG = 180;
// PLAYER_PART_END s4.INF_NHIET_CAN.1

// index.html:49506 · Phạm vi: global
// PLAYER_PART_BEGIN s4.INF_TAM.1 EDITABLE
const INF_TAM = [29, 21];
// PLAYER_PART_END s4.INF_TAM.1

// index.html:49507 · Phạm vi: global
// PLAYER_PART_BEGIN s4.INF_VAN.1 EDITABLE
const INF_VAN = [
            [[29,21],[33,15],[40,11],[48,8]],                 // len dau
            [[29,21],[38,17],[47,14]],                         // ham
            [[29,21],[21,17],[12,14],[2,11],[-12,8]],         // lung -> duoi
            [[29,21],[20,26],[10,26],[4,22]],                  // bung
            [[29,21],[23,29],[20,36],[17,42]],                 // chan sau
            [[29,21],[29,31],[29,41]],                          // chan truoc
            [[29,21],[35,26],[40,30]]                           // tay
        ];
// PLAYER_PART_END s4.INF_VAN.1

// index.html:49516 · Phạm vi: global
// PLAYER_PART_BEGIN s4.infVeVan.1 EDITABLE
function infVeVan(ng){
            if (!ng || (ng.hp !== undefined && ng.hp <= 0)) return;
            if (ng.ammoType !== 1 && !(ng === dino && currentAmmoType === 1)) return;
            let dem = ng.infDem || 0, q = (ng._infQuet == null) ? 999 : frames - ng._infQuet;
            let chay = q <= INF_NHIET_QUET + 12, cho = (ng.infXungCho || 0) > 0;
            if (!dem && !chay && !cho) return;
            let sx = ng.w / 32, sy = ng.h / 44, lat = !!ng.isFacingLeft;
            const P = (x, y) => [ng.x + (lat ? 32 - x : x) * sx, ng.y + y * sy];
            let nen = cho ? 0.55 : dem * 0.22;                 // am ir theo so lan da tich
            let dau = chay ? q / INF_NHIET_QUET * 34 : -99;    // vi tri dau lua (don vi than)
            const doSang = d => { let a = nen; if (chay && d <= dau) a = Math.max(a, 1 - (dau - d) / 12); return Math.min(1, a); };
            ctx.save();
            ctx.beginPath();
            PULSE_THAN.forEach((d, i) => { let [X, Y] = P(d[0], d[1]); if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); });
            ctx.closePath(); ctx.clip();
            ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            for (let L of INF_VAN){
                let d0 = 0;
                for (let i = 1; i < L.length; i++){
                    let dd = Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]);
                    let a = doSang(d0 + dd / 2); d0 += dd; if (a <= 0.02) continue;
                    let [x1, y1] = P(L[i - 1][0], L[i - 1][1]), [x2, y2] = P(L[i][0], L[i][1]);
                    let rung = Math.sin(frames * 0.5 + i) * 0.6;
                    ctx.globalAlpha = 0.7 * a; ctx.strokeStyle = "#3E0A00"; ctx.lineWidth = (3.4 + rung) * sx;   // ranh toi de van noi len than do
                    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
                    ctx.globalAlpha = a; ctx.strokeStyle = cho ? "#FFF8E1" : "#FFB300"; ctx.lineWidth = 1.6 * sx;
                    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
                }
            }
            // dau lua dang chay: dom sang trang-vang
            if (chay && dau <= 34){
                ctx.fillStyle = "#FFF3E0";
                for (let L of INF_VAN){
                    let v = dau, pt = null;
                    for (let i = 1; i < L.length; i++){ let dd = Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]);
                        if (v <= dd){ let t = v / dd; pt = [L[i - 1][0] + (L[i][0] - L[i - 1][0]) * t, L[i - 1][1] + (L[i][1] - L[i - 1][1]) * t]; break; } v -= dd; }
                    if (!pt) continue;
                    let [X, Y] = P(pt[0], pt[1]); ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.arc(X, Y, 1.8 * sx, 0, 6.28); ctx.fill();
                }
            }
            // lo nhiet giua nguc
            let [cx, cy] = P(INF_TAM[0], INF_TAM[1]);
            let r = (2.5 + dem * 1.2 + (cho ? 3 : 0) + (chay ? 1.5 * Math.max(0, 1 - q / 20) : 0)) * sx;
            let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.2);
            g.addColorStop(0, "rgba(255,248,225,0.95)"); g.addColorStop(0.45, "rgba(255,145,0,0.75)"); g.addColorStop(1, "rgba(191,54,12,0)");
            ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r * 2.2, 0, 6.28); ctx.fill();
            ctx.restore();
        }
// PLAYER_PART_END s4.infVeVan.1

// index.html:49567 · Phạm vi: global
// PLAYER_PART_BEGIN s4.fireBrands.1 EDITABLE
let fireBrands = [];
// PLAYER_PART_END s4.fireBrands.1

// index.html:49574 · Phạm vi: global
// PLAYER_PART_BEGIN s4.mortarBuoc.1 EDITABLE
function mortarBuoc(proj, p){
                    proj.vy = (proj.vy || 0) + 0.34;
                    // HUT NHE: dich nam trong ~1cm (40px) thi cau lua nga nhe ve phia no
                    { let mx2 = proj.x + proj.w/2, my2 = proj.y + proj.h/2;
                      // Danh sach hut chi co boss va quai. O PvP khong con con nao nen ba
                      // qua Mua Hoa bay theo dung dan dao va roi o ~138 / 310 / 516px —
                      // ke ho giua chung rong hon ca nguoi choi, nen dung o 90/170/300px
                      // deu khong an qua nao. Cho nguoi choi doi dien vao danh sach hut,
                      // dung ban kinh 40px nhu cu.
                      let _hut = bosses.concat(enemies);
                      if (gameState === 'pvp' && typeof pvpDich === 'function'){
                          let _k = pvpDich(proj.owner === 2 ? dino2 : pvpNguoi1());
                          if (_k) _hut = _hut.concat([_k]);
                      }
                      for (let o of _hut) {
                          if (o.invulnAll) continue;
                          let ox = o.x + o.w/2, oy = o.y + o.h/2, dd2 = Math.hypot(ox - mx2, oy - my2);
                          if (dd2 < 40 && dd2 > 1) { proj.speed += (ox - mx2) / dd2 * 0.9; proj.vy += (oy - my2) / dd2 * 0.9; break; }
                      } }
                    if ((proj.y + proj.h) >= 308) {
                        let ex = proj.x + proj.w/2, ey = 300;
                        visualEffects.push(new Effect(ex, ey, 'explosion', true, 64));
                        shakeTimer = Math.max(shakeTimer, 10);
                        if (gameState !== 'pvp') {
                            let ar2 = { x: ex - 70, y: ey - 70, w: 140, h: 140 };
                            obstacles.forEach(o => { if (checkAABB(ar2, o)) o.hp -= 3; });
                            allTargets().forEach(e => { if (bosses.indexOf(e) < 0 && checkAABB(ar2, e)) { e.hp -= 3; if (e.burnTimer !== undefined) e.burnTimer = 90; } });
                            bosses.forEach(b => { if (!b.invulnAll && checkAABB(ar2, b)) { damageBossWithFirstStrike(b, 3); b.burnTimer = 90; } });
                        } else { let t3 = pvpDich(proj.owner === 2 ? dino2 : pvpNguoi1());
                            // Mua Hoa la don cua che do danh quai; o PvP no rat kho trung
                            // nen trung thi phai dang mot don ra hon. 5 sat thuong CHAN,
                            // khong qua he so 0.39 cua Inferno (0.39 se bop 5 xuong con 1).
                            if (t3 && Math.hypot((t3.x+t3.w/2)-ex, (t3.y+t3.h/2)-ey) < 70) { if (!t3.isShielding()) pvpVoBoc(t3).hp -= MUA_HOA_DMG; else visualEffects.push(new Effect(t3.x, t3.y, 'parry')); } }
                        if (typeof SFX !== 'undefined' && SFX.hit) SFX.hit();
                        return true;   // da no, nguoi goi tu xoa khoi mang
                    }
                
            return false;
        }
// PLAYER_PART_END s4.mortarBuoc.1

// index.html:49613 · Phạm vi: global
// PLAYER_PART_BEGIN s4.tickFireBrands.1 EDITABLE
function tickFireBrands() {
            for (let i = fireBrands.length - 1; i >= 0; i--) {
                let b = fireBrands[i], o = b.tgt;
                // Nguoi choi khong nam trong bosses/enemies, nen o PvP `alive` luon false:
                // dau vua cam vao la lap tuc coi nhu muc tieu da chet va no ngay tai cho,
                // mat sach 2.5 giay dem nguoc lan sat thuong chay.
                let alive = o && o.hp > 0 &&
                    (bosses.indexOf(o) >= 0 || enemies.indexOf(o) >= 0 ||
                     (gameState === 'pvp' && (o === dino || o === dino2 ||
                      (typeof lanP1 !== 'undefined' && o === lanP1))));
                if (alive) { b.x = o.x + o.w/2; b.y = o.y + o.h/2; }
                b.t++;
                if (alive && b.t % 30 === 0) { o.hp -= 1; o.burnTimer = 90; }   // 7 nhip -> 5 nhip
                if (b.t >= 150 || !alive) {
                    visualEffects.push(new Effect(b.x, b.y, 'explosion', true, 86));
                    visualEffects.push(new Effect(b.x, b.y, 'explosion', true, 52));
                    shakeTimer = Math.max(shakeTimer, 26);
                    let BD = 3 + Math.round(6 * (b.oc || 0));           // 3 -> 9 theo do giu them
                    let BR = 62 + Math.round(48 * (b.oc || 0));
                    let ar = { x: b.x - BR, y: b.y - BR, w: BR*2, h: BR*2 };
                    obstacles.forEach(q => { if (checkAABB(ar, q)) q.hp -= BD; });
                    // allTargets() goi ngoai vong doi vai luon tra ve doi thu CUA P1. Dau
                    // cua P2 vi the no vao chinh P2. Chot muc tieu theo chu cua dau.
                    let _ds = allTargets();
                    if (gameState === 'pvp' && b.chu && typeof pvpDich === 'function'){
                        let _d = pvpDich(b.chu);
                        _ds = _ds.filter(q => !(q && q.__laNguoi));
                        if (_d) _ds.push(typeof pvpVoBoc === 'function' ? pvpVoBoc(_d) : _d);
                    }
                    _ds.forEach(q => { if (bosses.indexOf(q) < 0 && checkAABB(ar, q)) { q.hp -= BD; if (q.burnTimer !== undefined) q.burnTimer = 120; } });
                    bosses.forEach(q => { if (!q.invulnAll && checkAABB(ar, q)) { q.hp -= BD; q.burnTimer = 120; } });
                    if (typeof SFX !== 'undefined' && SFX.glassBreak) SFX.glassBreak();
                    fireBrands.splice(i, 1);
                }
            }
        }
// PLAYER_PART_END s4.tickFireBrands.1

// index.html:49649 · Phạm vi: global
// PLAYER_PART_BEGIN s4.drawFireBrands.1 EDITABLE
function drawFireBrands() {
            for (let b of fireBrands) {
                let p = b.t / 150, pulse = 0.5 + 0.5 * Math.sin(frames * (0.12 + p * 0.5));
                ctx.save();
                ctx.fillStyle = "rgba(255,87,34," + (0.20 + 0.35 * pulse) + ")";
                ctx.beginPath(); ctx.arc(b.x, b.y, 22 + 16 * p, 0, 6.28); ctx.fill();
                ctx.strokeStyle = "rgba(255,193,7," + (0.6 + 0.4 * pulse) + ")"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(b.x, b.y, 30 + 24 * p, 0, 6.28); ctx.stroke();
                // vong dem nguoc
                ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 4;
                ctx.beginPath(); ctx.arc(b.x, b.y, 34 + 24 * p, -Math.PI/2, -Math.PI/2 + Math.PI * 2 * p); ctx.stroke();
                for (let k = 0; k < 5; k++) { let a = frames * 0.14 + k * 1.26, rr = 18 + 14 * p;
                    ctx.fillStyle = "rgba(255,213,79,0.85)";
                    ctx.beginPath(); ctx.arc(b.x + Math.cos(a) * rr, b.y + Math.sin(a) * rr, 3.5, 0, 6.28); ctx.fill(); }
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.drawFireBrands.1

// index.html:49668 · Phạm vi: Player.prototype
const __Part12 = {
// PLAYER_PART_BEGIN s4.Player.prototype.startFireBreath.1 EDITABLE
startFireBreath() {
                this.ammo--; this.attackCooldown = 15;
                this.fireBreathTimer = 60; this.fireBreathLength = 240;
                this.infGiu = 0;                                  // @@HE-INFERNO-NOVA: nhom lua moi = dem lai tu dau
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.startFireBreath.1
};

// index.html:49676 · Phạm vi: Player.prototype
const __Part13 = {
// PLAYER_PART_BEGIN s4.Player.prototype.infXanh.1 EDITABLE
infXanh(){
                return (this.infGiu || 0) >= INF_XANH_CHO
                    && typeof hasRune === 'function' && hasRune('explshot');
            }
// PLAYER_PART_END s4.Player.prototype.infXanh.1
};

// index.html:49681 · Phạm vi: Player.prototype
const __Part14 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireExplosiveFireball.1 EDITABLE
fireExplosiveFireball() {
                this.ammo--; this.attackCooldown = 24;
                this.infNhiet();   // @@HE-INF-NHIET
                let cxp = this.x + this.w/2, cyp = this.y + this.h/2, R = 120 * this.getFormScale();
                this.novaRing = { r: 10, max: R, t: 0 };
                let ar = { x: cxp - R, y: cyp - R, w: R*2, h: R*2 };
                if (gameState !== 'pvp') {
                    // dung allTargets(): an ca quan trieu hoi cua boss lan quan che do Defense
                    allTargets().forEach(o => {
                        if (o.invulnAll || !checkAABB(ar, o)) return;
                        if (bosses.indexOf(o) >= 0) dealDamage(o, 3, 'flat');
                        else o.hp -= 3;
                        if (o.burnTimer !== undefined) o.burnTimer = 90;
                        if (o.hp <= 0 && o.dead !== undefined) o.dead = true;
                    });
                } else { let t2 = pvpDich(this);
                    if (t2 && checkAABB(ar, t2)) { if (!t2.isShielding()) pvpVoBoc(t2).takeDamage(3); else visualEffects.push(new Effect(t2.x, t2.y, 'parry')); } }
                visualEffects.push(new Effect(cxp, cyp, 'explosion', true, 40));
                shakeTimer = Math.max(shakeTimer, 14);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(220, 0.16, 'sawtooth', 0.22, 800);
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.fireExplosiveFireball.1
};

// index.html:49704 · Phạm vi: Player.prototype
const __Part15 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireDoubleFireball.1 EDITABLE
fireDoubleFireball() {
                this.ammo--; this.attackCooldown = 28; let pos = this.getShootPos();
                this.infNhiet();   // @@HE-INF-NHIET
                const SET = [[4.8, -7.2], [8.6, -9.0], [12.4, -10.4]];   // gan / vua / xa
                for (let k = 0; k < 3; k++) {
                    let p = new Projectile(pos.x, pos.y - 10, 2, 4, 0, 0, pos.dir, this.id);
                    p.mortar = true; p.speed = SET[k][0] * pos.dir; p.vy = SET[k][1];
                    p.w = Math.round(p.w * 1.2); p.h = Math.round(p.h * 1.2);
                    projectiles.push(p);
                }
                floatingTexts.push(new FloatingText(this.x, this.y - 24, "MƯA HỎA"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(240, 0.20, 'sawtooth', 0.22, 1000);
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.fireDoubleFireball.1
};

// index.html:49719 · Phạm vi: Player.prototype
const __Part16 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireBrand.1 EDITABLE
fireBrand() {
                this.ammo--; this.attackCooldown = 30;
                this.infNhiet();   // @@HE-INF-NHIET
                let pos = this.getShootPos();
                let oc = overchargeT(this.aKeyHeldTime, 120);
                let p = new Projectile(pos.x, pos.y - 8, 2, 3, 0, 0, pos.dir, this.id);
                p.brand = true; p.oc = oc; p.infernoMax = (oc >= 0.999);
                let sc3 = 1.35 + 0.5 * oc;
                p.w = Math.round(p.w * sc3); p.h = Math.round(p.h * sc3); p.speed *= 0.72;
                projectiles.push(p);
                floatingTexts.push(new FloatingText(this.x, this.y - 26, "HỎA ẤN " + Math.round(oc * 100) + "%"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(180, 0.26, 'sawtooth', 0.24, 700);
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.fireBrand.1
};

// index.html:49740 · Phạm vi: Player.prototype
const __Part17 = {
// PLAYER_PART_BEGIN s4.Player.prototype.infNhiet.1 EDITABLE
infNhiet(){
                if (!INF_NHIET_BAT) return;
                this.infDem = (this.infDem || 0) + 1;
                this._infQuet = frames;
                if (this.infDem >= INF_NHIET_CAN){ this.infDem = 0; this.infXungCho = INF_NHIET_QUET; this._infDay = frames; }
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(160 + (this.infDem || 3) * 40, 0.12, 'sawtooth', 0.10, 260);
            }
// PLAYER_PART_END s4.Player.prototype.infNhiet.1
};

// index.html:49747 · Phạm vi: Player.prototype
const __Part18 = {
// PLAYER_PART_BEGIN s4.Player.prototype.infChXung.1 EDITABLE
infChXung(){                       // moi nhip xung cua Channel
                this.infChDem = (this.infChDem || 0) + 1;
                if (INF_NHIET_BAT && this.infChDem >= INF_NHIET_CAN){ this.infChDem = 0; this.fireNukePulse(INF_XUNG_TO_DMG, true); }
                else this.fireNukePulse(INF_XUNG_DMG);
            }
// PLAYER_PART_END s4.Player.prototype.infChXung.1
};

// index.html:49752 · Phạm vi: Player.prototype
const __Part19 = {
// PLAYER_PART_BEGIN s4.Player.prototype.infNhietTick.1 EDITABLE
infNhietTick(){
                if (currentAmmoType !== 1 && !(this.fireReactorTimer > 0)){   // trong update, currentAmmoType luon la dan cua NGUOI dang cap nhat (P2 chay trong lanVoiP2)
                    this.infDem = 0; this.infPhun = 0; this.infXungCho = 0; return; }
                // moi 60 khung PHUN LUA LIEN TUC = mot lan van lua
                if (this.fireBreathTimer > 0){ this.infPhun = (this.infPhun || 0) + 1; if (this.infPhun % 60 === 0) this.infNhiet(); }
                else this.infPhun = 0;
                // lan van thu 3 chay toi mep than thi NO
                if (this.infXungCho > 0 && --this.infXungCho === 0){
                    this.fireNukePulse(INF_XUNG_DMG);
                    floatingTexts.push(new FloatingText(this.x - 34, this.y - 34, LT("XUNG HẠT NHÂN!", "NUCLEAR PULSE!")));
                }
                if (!this.fireChannel) this.infChDem = 0;
                // chieu cuoi: xung moi 3 giay
                if (INF_NHIET_BAT && this.fireReactorTimer > 0 && this.fireReactorTimer < 1200 && (1200 - this.fireReactorTimer) % INF_ULT_XUNG === 0) this.fireNukePulse(INF_XUNG_DMG);
            }
// PLAYER_PART_END s4.Player.prototype.infNhietTick.1
};

// index.html:49767 · Phạm vi: Player.prototype
const __Part20 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireNukePulse.1 EDITABLE
fireNukePulse(dmg, to) {
                dmg = dmg || 5;
                allTargets().forEach(o => { if (!o.invulnAll) { o.hp -= dmg; if (o.burnTimer !== undefined) o.burnTimer = 120; } });
                this.fireRings.push({ r: 20, maxR: canvas.width * (to ? 1.25 : 1), timer: 0, life: to ? 48 : 34, to: !!to });   // ban kinh vong lua = mot man hinh, khong phai ca ban do
                shakeTimer = Math.max(shakeTimer, to ? 30 : 14);
                if (to) floatingTexts.push(new FloatingText(this.x - 40, this.y - 44, LT("ĐẠI XUNG HẠT NHÂN! ", "GREAT NUCLEAR PULSE! ") + dmg));
                if (typeof SFX !== 'undefined') { if (SFX.tone) SFX.tone(90, 0.3, 'sawtooth', 0.3, 60); if (SFX.noise) SFX.noise(0.25, 0.2, 800, 'lowpass'); }
            }
// PLAYER_PART_END s4.Player.prototype.fireNukePulse.1
};

// index.html:49775 · Phạm vi: Player.prototype
const __Part21 = {
// PLAYER_PART_BEGIN s4.Player.prototype.tickFireEffects.1 EDITABLE
tickFireEffects() {
                this.infNhietTick();   // @@HE-INF-NHIET
                if (this.fireRings) for (let i = this.fireRings.length - 1; i >= 0; i--) { let g = this.fireRings[i]; g.timer++; g.r = Math.min(g.maxR, g.r + g.maxR / 20); if (g.timer >= g.life) this.fireRings.splice(i, 1); }
                if (this.fireReactorTimer > 0) {
                    this.fireReactorTimer--;
                    ultCharge = (this.fireReactorTimer / 1200) * 100;
                    // LO PHAN UNG: 4 dmg moi giay. O PvP con bi he so 0.39 cua Inferno nghien
                    // xuong con 1.56 — do ca chieu cuoi 20 giay duoc 27 sat thuong, thap nhat
                    // bang. Nang len 5 dmg moi giay o CA HAI che do, va o PvP thi chia nguoc
                    // he so de con so ra dung 5 chan chu khong phai 5 roi bi bop lai.
                    if (this.fireReactorTimer % 60 === 0) {
                        let _d = (gameState === 'pvp') ? (5 / (PVP_HS[1] || 1) + 1e-6) : 5;
                        allTargets().forEach(o => { if (!o.invulnAll) { o.hp -= _d; if (o.burnTimer !== undefined) o.burnTimer = 120; } });
                    }
                    if (frames % 8 === 0) shakeTimer = Math.max(shakeTimer, 3);
                }
            }
// PLAYER_PART_END s4.Player.prototype.tickFireEffects.1
};

// index.html:49792 · Phạm vi: Player.prototype
const __Part22 = {
// PLAYER_PART_BEGIN s4.Player.prototype.drawFireFx.1 EDITABLE
drawFireFx() {
                this.drawNovaRing();
                if (this.fireRings) for (let g of this.fireRings) {
                    let a = Math.max(0, 1 - g.timer / g.life), cx = this.x + this.w/2, cy = this.y + this.h/2;
                    ctx.save(); ctx.globalCompositeOperation = 'lighter';
                    ctx.strokeStyle = 'rgba(255,' + Math.round(120 + 100*a) + ',30,' + a + ')'; ctx.lineWidth = g.to ? 26 + 46*a : 10 + 20*a;   // @@HE-INF-NHIET: xung TO day gap doi
                    ctx.beginPath(); ctx.arc(cx, cy, g.r, 0, Math.PI*2); ctx.stroke();
                    if (g.to){ ctx.strokeStyle = 'rgba(255,60,0,' + (a*0.7) + ')'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(cx, cy, g.r * 0.8, 0, Math.PI*2); ctx.stroke(); }
                    ctx.strokeStyle = 'rgba(255,255,180,' + (a*0.8) + ')'; ctx.lineWidth = g.to ? 8 : 4;
                    ctx.beginPath(); ctx.arc(cx, cy, g.r * 0.92, 0, Math.PI*2); ctx.stroke();
                    ctx.restore();
                }
                if (this.fireReactorTimer > 0) {
                    ctx.save();
                    ctx.fillStyle = 'rgba(255,50,0,' + (0.12 + Math.sin(frames*0.2)*0.04) + ')'; ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.globalCompositeOperation = 'lighter';
                    for (let fx = 0; fx < canvas.width; fx += 30) {
                        let h = 26 + Math.sin(frames*0.35 + fx*0.15) * 12 + Math.random() * 12;
                        ctx.fillStyle = 'rgba(255,' + Math.round(80 + Math.random()*90) + ',0,0.55)';
                        ctx.beginPath(); ctx.moveTo(fx, 320); ctx.quadraticCurveTo(fx+15, 320 - h - 12, fx+30, 320); ctx.fill();
                        ctx.fillStyle = 'rgba(255,215,90,0.45)';
                        ctx.beginPath(); ctx.moveTo(fx+8, 320); ctx.quadraticCurveTo(fx+15, 320 - h*0.55, fx+22, 320); ctx.fill();
                    }
                    for (let k = 0; k < 16; k++) { let ex = (frames*2 + k*151) % canvas.width; let ey = 300 - ((frames*3 + k*61) % 290); ctx.fillStyle = 'rgba(255,' + Math.round(140+Math.random()*90) + ',20,0.6)'; ctx.fillRect(ex, ey, 3, 5); }
                    for (let sy = 320; sy > 30; sy -= 34) { let sw = 10 + Math.sin(frames*0.3 + sy)*6 + Math.random()*6; ctx.fillStyle = 'rgba(255,70,0,0.3)'; ctx.fillRect(0, sy - 34, sw, 34); ctx.fillRect(canvas.width - sw, sy - 34, sw, 34); }
                    let cx = this.x + this.w/2, cy = this.y + this.h/2, R = 52 + Math.sin(frames*0.3)*8;
                    let g2 = ctx.createRadialGradient(cx, cy, 8, cx, cy, R);
                    g2.addColorStop(0, 'rgba(255,200,60,0.7)'); g2.addColorStop(0.55, 'rgba(255,90,0,0.4)'); g2.addColorStop(1, 'rgba(255,40,0,0)');
                    ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.fill();
                    ctx.restore();
                    ctx.save(); ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255,' + Math.round(120 + Math.sin(frames*0.4)*80) + ',20,0.95)'; ctx.shadowBlur = 6; ctx.shadowColor = '#FF5000';
                    let bx = this.x, by = this.y, bw = this.w, bh = this.h;
                    ctx.beginPath();
                    ctx.moveTo(bx+6, by+4); ctx.lineTo(bx+13, by+14); ctx.lineTo(bx+9, by+26); ctx.lineTo(bx+16, by+36);
                    ctx.moveTo(bx+bw-8, by+6); ctx.lineTo(bx+bw-15, by+18); ctx.lineTo(bx+bw-10, by+30);
                    ctx.moveTo(bx+bw/2, by+2); ctx.lineTo(bx+bw/2-5, by+16); ctx.lineTo(bx+bw/2+4, by+28); ctx.lineTo(bx+bw/2-3, by+40);
                    ctx.moveTo(bx+4, by+bh-10); ctx.lineTo(bx+14, by+bh-4);
                    ctx.moveTo(bx+bw-6, by+bh-12); ctx.lineTo(bx+bw-16, by+bh-6);
                    ctx.stroke();
                    ctx.fillStyle = 'rgba(255,230,120,' + (0.6 + Math.sin(frames*0.5)*0.3) + ')';
                    ctx.fillRect(bx+10, by+12, 3, 3); ctx.fillRect(bx+bw-12, by+20, 3, 3); ctx.fillRect(bx+bw/2, by+26, 3, 3);
                    ctx.restore();
                }
            }
// PLAYER_PART_END s4.Player.prototype.drawFireFx.1
};

// index.html:49837 · Phạm vi: Player.prototype
const __Part23 = {
// PLAYER_PART_BEGIN s4.Player.prototype.infTickLua.1 EDITABLE
infTickLua() {
                if (this.fireBreathTimer > 0) {
                    this.fireBreathTimer--;
                    // @@HE-INFERNO-NOVA — dem so khung lua chay LIEN TUC, dut mot khung la ve 0.
                    this.infGiu = (this.infGiu || 0) + 1;
                    let _infXanh = this.infXanh();
                    let _infDmg = _infXanh ? INF_XANH_DMG : 1;
                    let pos = this.getShootPos();
                    let fw = this.fireBreathLength;
                    let rx = pos.dir === 1 ? pos.x : pos.x - fw;
                    // Luong lua VE ra la mot hinh non xoe rong dan (nua tren ~26px, nua duoi ~26px
                    // o cuoi non), nhung hop sat thuong cu chi cao 40px quanh tam sung — nen do
                    // bay cao hon mot chut la lua di xuyen qua ma khong an gi.
                    let rect = { x: rx, y: pos.y - 48, w: fw, h: 96 };

                    if (frames % 10 === 0) {
                        let hitAny = false;
                        /* LOI GOC CUA "DON MANH CHI GAY 1 DMG": nhanh PvP cua don can
                           chien viet cung takeDamage(1) — bat ke vu khi do vung ra bao
                           nhieu. Nhanh danh quai ngay ben duoi dung `dmg` that. Vi vay
                           chinh PVP_HS tu 1.0 len 3.0 cung khong lam suy suyen mot don
                           vi nao. Gio dung dung con so that va di qua lop vo PvP de
                           he so can bang co hieu luc. */
                        if (gameState === 'pvp') {
                            let target = pvpDich(this);
                            if (target && checkAABB(rect, target)) {
                                if (target.isShielding()) visualEffects.push(new Effect(target.x + (target.isFacingLeft ? target.w : 0), target.y, 'parry'));
                                else { pvpVoBoc(target).takeDamage(_infDmg); hitAny = true; }
                            }
                        } else {
                            obstacles.forEach(o => { if(checkAABB(rect, o)) { o.hp -= _infDmg; hitAny=true; } });
                            allTargets().forEach(e => { if (bosses.indexOf(e) < 0 && checkAABB(rect, e)) {
                                damageFromAmmoAny(e, _infDmg); hitAny = true;   // CHI MANG cho luong lua
                                if (e.burnTimer !== undefined) e.burnTimer = 90;
                                visualEffects.push(new Effect(e.x + (e.w||20)/2, e.y + (e.h||20)/2, 'explosion', true, 12));
                                if (e.hp <= 0 && e.dead !== undefined) e.dead = true;
                            } });
                            bosses.forEach(b => { 
                                if(checkAABB(rect, b)) { 
                                    if (b.invulnAll) { visualEffects.push(new Effect(b.x + b.w/2, b.y, 'parry', false)); }
                                    else if (b.name === "AEGIS REX") { if (b.shieldBrokenTimer > 0) { damageFromAmmoAny(b, _infDmg); hitAny=true; } else { b.hitShield(3, b.x + b.w/2, b.y + b.h/2); } }
                                    else if (b.name === "HELIOS REX" && (b.shieldTimer > 0 || b.spamShieldTimer > 0 || b.state.includes('clone_dash') || b.state === 'clone_bounce_back' || b.state === 'clone_wait')) {
                                        visualEffects.push(new Effect(b.x - 10, b.y + 20, 'parry', false));
                                    } else {
                                        damageFromAmmoAny(b, _infDmg); hitAny=true;   // CHI MANG cho luong lua
                                    }
                                } 
                            });
                        }
                        if(hitAny && gameState !== 'pvp') score += 1;
                    }
                    if (this.fireBreathTimer <= 0){ this.fireBreathLength = 240; this.infGiu = 0; }
                } else this.infGiu = 0;
            }
// PLAYER_PART_END s4.Player.prototype.infTickLua.1
};

// index.html:49892 · Phạm vi: Player.prototype
const __Part24 = {
// PLAYER_PART_BEGIN s4.Player.prototype.infVeLua.1 EDITABLE
infVeLua(pos) {
                /* LUONG LUA kieu lua that: mot chuoi CUM LUA cuon trao ra tu mieng, moi cum phinh to dan, BOC LEN nhe
                   (lua nong), doi mau tu loi trang-vang -> cam -> do -> khoi xam o dau luong. Mep tren co cac LUOI LUA
                   liem len lap loe. Do dai da duoc kep o 6 moc nen hinh khong con bi keo gian. */
                let L = this.fireBreathLength, d = pos.dir;
                ctx.save();
                let _bx = this.infXanh();
                const MAU = _bx
                    ? [[235,250,255],[140,220,255],[41,121,255],[13,71,161],[40,50,70]]
                    : [[255,253,231],[255,224,120],[255,145,30],[214,60,20],[70,60,60]];
                const mau = (t, a) => {                     // noi suy theo bac mau 0..1 doc luong lua
                    let f = Math.min(0.999, Math.max(0, t)) * (MAU.length - 1), i = Math.floor(f), u = f - i;
                    let A = MAU[i], B = MAU[i + 1];
                    return "rgba(" + Math.round(A[0] + (B[0] - A[0]) * u) + "," + Math.round(A[1] + (B[1] - A[1]) * u) + "," + Math.round(A[2] + (B[2] - A[2]) * u) + "," + a.toFixed(3) + ")";
                };
                const N = 26, toc = 0.034;
                // 1) quang nhiet mo phia sau
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = _bx ? "rgba(33,150,243,0.16)" : "rgba(255,112,67,0.16)";
                ctx.beginPath(); ctx.ellipse(pos.x + d * L * 0.5, pos.y - 6, L * 0.52, 30, 0, 0, 6.28); ctx.fill();
                // 2) cac CUM LUA cuon — ve tu xa toi gan de loi sang nam tren cung
                for (let k = N - 1; k >= 0; k--){
                    let t = ((frames * toc + k / N) % 1);
                    let nh = Math.sin(k * 12.9898 + Math.floor(frames * toc + k / N) * 78.233) * 0.5 + 0.5;   // nhieu co dinh moi cum
                    let x = pos.x + d * L * t;
                    let y = pos.y - t * t * 26 + Math.sin(frames * 0.35 + k * 1.7) * (3 + t * 9) + (nh - 0.5) * 8 * t;
                    let r = 6 + t * 40 * (0.75 + nh * 0.5);
                    let a = t < 0.85 ? 0.85 : 0.85 * (1 - (t - 0.85) / 0.15);
                    let g = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
                    g.addColorStop(0, mau(t * 0.8, a)); g.addColorStop(0.55, mau(t * 0.8 + 0.18, a * 0.75)); g.addColorStop(1, mau(t + 0.25, 0));
                    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.28); ctx.fill();
                }
                // 3) LUOI LUA liem len o mep tren (lap loe theo nhip)
                ctx.globalCompositeOperation = 'lighter';
                for (let k = 0; k < 7; k++){
                    let t0 = 0.12 + k * 0.12 + Math.sin(frames * 0.2 + k) * 0.03;
                    if (t0 > 0.95) continue;
                    let bx = pos.x + d * L * t0, by = pos.y - 6 - t0 * t0 * 26 - t0 * 14, w = 5 + t0 * 11;
                    let cao = (8 + t0 * 20) * (0.55 + 0.45 * Math.abs(Math.sin(frames * 0.45 + k * 2.3)));
                    let dinh = bx - d * w * 0.4 + Math.sin(frames * 0.6 + k * 1.3) * 3;      // ngon lua bi gio day NGUOC ve sau
                    let gt = ctx.createLinearGradient(0, by, 0, by - cao);
                    gt.addColorStop(0, mau(0.2 + t0 * 0.4, 0.45)); gt.addColorStop(1, mau(0.5 + t0 * 0.4, 0));
                    ctx.fillStyle = gt;
                    ctx.beginPath(); ctx.moveTo(bx - w, by);
                    ctx.bezierCurveTo(bx - w * 0.9, by - cao * 0.45, dinh - w * 0.2, by - cao * 0.7, dinh, by - cao);
                    ctx.bezierCurveTo(dinh + w * 0.3, by - cao * 0.6, bx + w * 0.8, by - cao * 0.35, bx + w, by);
                    ctx.closePath(); ctx.fill();
                }
                // 4) LOI SANG: tia trang-vang mong sat mieng, tan dan
                let LK = Math.min(L * 0.3, 150);
                let gl = ctx.createLinearGradient(pos.x, 0, pos.x + d * LK, 0);
                gl.addColorStop(0, mau(0, 0.9)); gl.addColorStop(1, mau(0.3, 0));
                ctx.fillStyle = gl;
                ctx.beginPath(); ctx.moveTo(pos.x, pos.y - 6);
                ctx.quadraticCurveTo(pos.x + d * LK * 0.5, pos.y - 12, pos.x + d * LK, pos.y - 8);
                ctx.quadraticCurveTo(pos.x + d * LK * 0.5, pos.y + 8, pos.x, pos.y + 6); ctx.closePath(); ctx.fill();
                // 5) tan lua bay ra, nang dan len
                ctx.globalCompositeOperation = 'source-over';
                for (let k = 0; k < 8; k++){
                    let t = ((frames * 0.028 + k * 0.137) % 1);
                    let xx = pos.x + d * L * (0.2 + t * 0.85), yy = pos.y - t * 46 + Math.sin(frames * 0.3 + k * 3) * 10;
                    ctx.fillStyle = mau(0.3 + t * 0.4, 0.8 * (1 - t));
                    ctx.fillRect(xx, yy, 3, 3);
                }
                // mieng phun
                ctx.fillStyle = _bx ? "rgba(224,247,255,0.95)" : "rgba(255,253,231,0.95)";
                ctx.beginPath(); ctx.arc(pos.x, pos.y, 9 + Math.sin(frames * 0.6) * 2, 0, 6.28); ctx.fill();
                // Dung khung vua vuot moc: bao mot lan cho de nhan ra.
                if (this.id === 1 && (this.infGiu || 0) === INF_XANH_CHO && typeof hasRune === 'function' && hasRune('explshot')){
                    floatingTexts.push(new FloatingText(this.x - 30, this.y - 40, "LỬA XANH!"));
                    shakeTimer = Math.max(shakeTimer, 14);
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1200, 0.22, 'sine', 0.22, 2400);
                }
                ctx.restore();
            }
// PLAYER_PART_END s4.Player.prototype.infVeLua.1
};

// index.html:49969 · Phạm vi: global
// PLAYER_PART_BEGIN s4.INF_DAI_BUOC.1 EDITABLE
const INF_DAI_BUOC = 100, INF_DAI_TRAN = 240 + 5 * INF_DAI_BUOC;
// PLAYER_PART_END s4.INF_DAI_BUOC.1

// index.html:49970 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.3 EDITABLE
vkDangKy(1, {
            ten: 'INFERNO', mauUlt: '#FF1744',
            sacToiDa: 120,              // so khung tich K cho day vong (maxChargeFrames)
            mauHudUlt: '#FF1744',         // mau thanh chieu cuoi tren HUD khi dang chay
            banJ(){
                if (this.fireBreathTimer <= 0 && this.ammo > 0) this.startFireBreath();
                // Dang phun ma bam J lai: NAP LAI dong ho (giu nguyen do dai + moc lua xanh) -> luong lua khong tu tat.
                // (chi tinh cu BAM MOI: J da giu tu khung truoc thi giuJ lo, khong tru them dan)
                else if (this.fireBreathTimer > 0 && this.ammo > 0 && !this.isOverheated && this._infGiuF !== frames - 1) {
                    this.ammo--; this.fireBreathTimer = Math.max(this.fireBreathTimer, 60);
                    if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
                }
            },
            giuJ(){
                this._infGiuF = frames;
                if (!(combatStance !== 2 && !this.isOverheated && this.fireBreathTimer > 0 && this.attackCooldown <= 0)) return;
                if (this.ammo > 0 && frames % 10 === 0) {
                    // @@HE-INFERNO-NOVA: deo Nova thi moi lan noi duoc TRON MOT GIAY,
                    // du thoi gian de cham moc 3 giay va huong lua xanh mot doan tu te.
                    let _noi = (typeof hasRune === 'function' && hasRune('explshot')) ? INF_NOVA_NOI : 30;
                    this.ammo--; this.fireBreathTimer += _noi; this.attackCooldown = 10;
                    // 6 MOC do dai (240 -> 740) roi DUNG: truoc day cong mai khong tran, luong lua keo dai vo han va meo ca hinh.
                    this.fireBreathLength = Math.min(INF_DAI_TRAN, this.fireBreathLength + INF_DAI_BUOC);
                    if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
                }
            },
            nhaK(){
                if (this.fireChannel) { this.fireChannel = false; }
                else if (this.aKeyHeldTime >= 120) this.fireBrand();
                else if (this.aKeyHeldTime >= 60 && this.ammo > 0 && !this.isOverheated && this.attackCooldown <= 0) this.fireDoubleFireball();
                else if (this.ammo > 0 && !this.isOverheated && this.attackCooldown <= 0) this.fireExplosiveFireball();
            },
            channel(){
                if (!this.fireChannel) { this.fireChannel = true; this.infChDem = 0; this.infChXung(); this.fireChannelCd = 60; }   // @@HE-INF-NHIET
                else { if (this.fireChannelCd > 0) this.fireChannelCd--; if (this.fireChannelCd <= 0) { this.infChXung(); this.fireChannelCd = 60; } }
            },
            batUlt(){
                ultCharge = 0; this.fireReactorTimer = 1200;
                this.aKeyHeldTime = 0; this.chargeProgress = 0;
                floatingTexts.push(new FloatingText(this.x, this.y - 30, "ATOMIC REACTOR!"));
                shakeTimer = Math.max(shakeTimer, 30);
                if (typeof SFX !== 'undefined' && SFX.tone) { SFX.tone(70, 0.5, 'sawtooth', 0.35, 50); SFX.tone(120, 0.4, 'square', 0.2, 80); }
            },
            hoverSac(half){
                let n0 = projectiles.length;
                this.fireDoubleFireball();                       // dung roi
                // @@HE-LOLUNG3: ba qua Mua Hoa tinh lai dan dao de ROI DUNG muc tieu (truoc day ban tam co dinh 138/310/516px,
                // muc tieu ngay duoi chan thi bay qua dau)
                let N = this.hoverNgam();
                if (N) for (let i = n0, k = 0; i < projectiles.length; i++){
                    let p = projectiles[i]; if (!p || !p.mortar) continue;
                    let T = 18 + k * 6, px = p.x + p.w / 2, py = p.y + p.h / 2, dx = N.tx - px + (k - 1) * 16, dy = N.ty - py; k++;
                    p.speed = dx / T; p.vy = (dy - 0.5 * 0.34 * T * T) / T;
                }
            }
        });
// PLAYER_PART_END s4.vkDangKy.3
