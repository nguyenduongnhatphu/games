// PLAYER_FILE: PRISM
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: FloatingText, Projectile, SFX, bosses, ctx, dino, dino2, enemies, floatingTexts, frames, gameState, obstacles, projectiles, shakeTimer, ultCharge, vkDangKy
// index.html:50837 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PRISM_STEP.1 EDITABLE
const PRISM_STEP = 3;
// PLAYER_PART_END s4.PRISM_STEP.1

// index.html:50838 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PRISM_MAX_TIER.1 EDITABLE
const PRISM_MAX_TIER = 3;
// PLAYER_PART_END s4.PRISM_MAX_TIER.1

// index.html:50839 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PRISM_MAX_HITS.1 EDITABLE
const PRISM_MAX_HITS = PRISM_STEP * PRISM_MAX_TIER;
// PLAYER_PART_END s4.PRISM_MAX_HITS.1

// index.html:50840 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PRISM_HOLD.1 EDITABLE
const PRISM_HOLD = 180;
// PLAYER_PART_END s4.PRISM_HOLD.1

// index.html:50841 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PRISM_BLEED.1 EDITABLE
const PRISM_BLEED = 12;
// PLAYER_PART_END s4.PRISM_BLEED.1

// index.html:50842 · Phạm vi: global
// PLAYER_PART_BEGIN s4.PRISM_COL.1 EDITABLE
const PRISM_COL = ["#80DEEA", "#4DD0E1", "#FFF176", "#FFB74D", "#FF80AB", "#E040FB", "#FFFFFF"];
// PLAYER_PART_END s4.PRISM_COL.1

// index.html:50843 · Phạm vi: global
// PLAYER_PART_BEGIN s4.prismTier.1 EDITABLE
function prismTier(o) { return o && o._pxN ? Math.floor(o._pxN / PRISM_STEP) : 0; }
// PLAYER_PART_END s4.prismTier.1

// index.html:50844 · Phạm vi: global
// PLAYER_PART_BEGIN s4.prismCol.1 EDITABLE
function prismCol(t) { return PRISM_COL[Math.min(PRISM_COL.length - 1, t)]; }
// PLAYER_PART_END s4.prismCol.1

// index.html:50845 · Phạm vi: global
// PLAYER_PART_BEGIN s4.tickPrismStacks.1 EDITABLE
function tickPrismStacks() {
            // Truoc day danh sach nay khong co nguoi choi, nen trong PvP tang danh dau
            // khong bao gio tu rot — dinh mot lan la giu mai.
            let all = bosses.concat(enemies, obstacles);
            if (gameState === 'pvp'){ if (typeof dino !== 'undefined' && dino) all.push(dino); if (typeof dino2 !== 'undefined' && dino2) all.push(dino2); }
            for (let o of all) {
                if (o._pxFlash > 0) o._pxFlash--;
                if (!o._pxN) continue;
                if (o._pxT > 0) { o._pxT--; continue; }
                o._pxB = (o._pxB || 0) + 1;
                if (o._pxB >= PRISM_BLEED) { o._pxB = 0; o._pxN--; if (o._pxN < PRISM_MAX_HITS) o._pxExtra = 0; }
            }
        }
// PLAYER_PART_END s4.tickPrismStacks.1

// index.html:50858 · Phạm vi: global
// PLAYER_PART_BEGIN s4.drawPrismStacks.1 EDITABLE
function drawPrismStacks() {
            let all = bosses.concat(enemies, obstacles);
            // O PvP nguoi choi KHONG nam trong bosses/enemies/obstacles, nen bang tang
            // Khuc Xa chua bao gio duoc ve len dau ho: nguoi choi cong don du 3 phat
            // ma tren man hinh khong co gi bao, danh phai dem nham.
            if (gameState === 'pvp') { if (dino) all = all.concat([dino]); if (dino2) all = all.concat([dino2]); }
            for (let o of all) {
                if (!o._pxN || o.hp <= 0) continue;
                let tier = prismTier(o);                      // da no bao nhieu lan
                let next = tier + 1;                          // don KHUC XA ke tiep manh bao nhieu
                let col = prismCol(next);
                let inStep = o._pxN - tier * PRISM_STEP;       // 0..2 tien do toi don ke tiep
                let cxp = o.x + o.w / 2, yy = o.y - 16;
                let fading = o._pxT <= 0;
                ctx.save();
                ctx.globalAlpha = fading ? 0.45 + 0.35 * Math.abs(Math.sin(frames * 0.25)) : 1;
                // lang kinh: doi mau theo do lon cua don ke tiep
                ctx.fillStyle = col; ctx.strokeStyle = "rgba(0,0,0,0.6)"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(cxp - 34, yy + 6); ctx.lineTo(cxp - 26, yy - 7); ctx.lineTo(cxp - 18, yy + 6); ctx.closePath();
                ctx.stroke(); ctx.fill();
                // 3 o vuong = con may phat nua thi no
                for (let s = 0; s < PRISM_STEP; s++) {
                    ctx.fillStyle = (s < inStep) ? col : "rgba(255,255,255,0.18)";
                    ctx.strokeStyle = "rgba(0,0,0,0.55)"; ctx.lineWidth = 1.5;
                    ctx.fillRect(cxp - 12 + s * 12, yy - 5, 9, 11);
                    ctx.strokeRect(cxp - 12 + s * 12, yy - 5, 9, 11);
                }
                // do lon cua don KHUC XA ke tiep
                ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "left";
                ctx.lineWidth = 3; ctx.strokeStyle = "rgba(0,0,0,0.8)";
                ctx.strokeText("-" + next, cxp + 27, yy + 6);
                ctx.fillStyle = col; ctx.fillText("-" + next, cxp + 27, yy + 6);
                ctx.restore();
                // chop sang khi vua an don KHUC XA
                if (o._pxFlash > 0) {
                    let ft = o._pxFlash / 20;
                    ctx.save();
                    ctx.globalAlpha = ft;
                    ctx.strokeStyle = prismCol(tier); ctx.lineWidth = 3;
                    ctx.shadowBlur = 16; ctx.shadowColor = ctx.strokeStyle;
                    let rr = (o.w / 2 + 10) + (1 - ft) * 34;
                    ctx.beginPath(); ctx.arc(cxp, o.y + o.h / 2, rr, 0, Math.PI * 2); ctx.stroke();
                    ctx.restore();
                }
            }
        }
// PLAYER_PART_END s4.drawPrismStacks.1

// index.html:50906 · Phạm vi: Player.prototype
const __Part10 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireSplitShot.1 EDITABLE
fireSplitShot(chargeTime) { 
                // ===== HAI NAC MOI: DAN TICH TU kieu Pulsar =====
                //   1.9s - 2.5s : vien dan chay DUNG co che Pulsar — cang bay xa cang dau, 2 -> 3
                //   2.5s - 2.9s : vien do nhung DA O MUC MAX san, an thang 3 dmg
                if (chargeTime >= 114){
                    // VAN LA BA TIA nhu Prism goc — chi doi ban chat tung tia sang co che Pulsar.
                    //   1.9s-2.5s : tia lon dan theo quang duong, 2 -> 3 dmg
                    //   2.5s+     : moi tia DA O MUC MAX ngay tu khung dau, an thang 3 dmg
                    this.ammo--; this.attackCooldown = 34;
                    let pos2 = this.getShootPos();
                    let max = chargeTime >= 150;
                    let goc = [-0.16, 0, 0.16];
                    for (let g of goc){
                        let pr = new Projectile(pos2.x, pos2.y - (6*pos2.scale)/2, max ? 4 : 2, 6, 0, 999, pos2.dir, this.id);
                        // Truoc day dan cua nac charge nay KHONG mang co `prism`, nen prismDmg()
                        // thoat ra ngay dong dau va khong bao gio cong tang danh dau: do duoc
                        // `_pxN` dung im o 0 qua ca sau phat, sat thuong phang 2 o moi khoang
                        // cach. Nac charge nang nhat cua Prism khong he co noi tai cua chinh no.
                        pr.prism = true;
                        pr.pulsar = true; pr._prismStar = true;
                        pr._prismBase = max ? 4 : 2;      // nac giua: noi tai 2 ngay khi cham, len dan toi 3
                        pr._prismMax  = max ? 4 : 3;
                        // Hai nac nay DAT THANG tang Khuc Xa khi cham: Tu = tang 2, MAX = tang 3.
                        pr._pxTangNgay = max ? 3 : 2;
                        pr._pulsarTravel = max ? 1e9 : 0;
                        pr.vy = Math.sin(g) * 6;
                        pr.speed = Math.cos(g) * Math.abs(pr.speed || 12) * pos2.dir;
                        pr.w = Math.round(pr.w * (max ? 2.0 : 1.6));
                        pr.h = Math.round(pr.h * (max ? 2.0 : 1.6));
                        projectiles.push(pr);
                    }
                    floatingTexts.push(new FloatingText(this.x - 24, this.y - 30, max ? 'LĂNG KÍNH MAX!' : 'LĂNG KÍNH TỤ!'));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(max ? 1500 : 1150, 0.14, 'triangle', 0.20, 2100);
                    if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 150; }
                    return;
                }
                this.ammo--; this.attackCooldown = 30; let pos = this.getShootPos();
                let yCenter = pos.y - (6*pos.scale)/2;
                
                let chargeIntervals = Math.floor(Math.min(chargeTime, 90) / 15);
                let currentAngle = Math.max(0.5, 3.5 - (chargeIntervals * 0.5));
                
                let pCount = 0;
                if (chargeTime >= 60) pCount = 999;
                else if (chargeTime >= 30) pCount = 1;

                // Manh dan LUON 2 dmg du charge hay khong. Suc manh nam o KHUC XA tich tu.
                let pd = this.bulletDmg + 1;
                [0, -currentAngle, currentAngle].forEach(a => {
                    let p = new Projectile(pos.x, yCenter, pd, 6, a, pCount, pos.dir, this.id);
                    p.prism = true; projectiles.push(p);
                });
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.fireSplitShot.1
};

// index.html:50960 · Phạm vi: Player.prototype
const __Part11 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireSplitBounce.1 EDITABLE
fireSplitBounce() {
                if (projectiles.filter(p => p.bounce).length >= 12) return;
                let pos = this.getShootPos(), yCenter = pos.y - (6*pos.scale)/2, ang = 3.0;
                [0, -ang, ang].forEach(a => { let p = new Projectile(pos.x, yCenter, 2, 6, a, 999, pos.dir, this.id); p.bounce = true; p.prism = true; projectiles.push(p); });
                if (typeof SFX !== 'undefined' && SFX.shoot) SFX.shoot(3);
            }
// PLAYER_PART_END s4.Player.prototype.fireSplitBounce.1
};

// index.html:50968 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.5 EDITABLE
vkDangKy(3, {
            ten: 'PRISM', mauUlt: '#FFEB3B',
            sacToiDa: 90,              // so khung tich K cho day vong (maxChargeFrames)
            banJ(){
                if (this.ammo > 0) this.fireSplitShot(0);
            },
            nhaK(){
                if (this.splitChannel) { this.splitChannel = false; projectiles.forEach(p => { if (p.bounce) p.bounce = false; }); }
                else if (this.ammo > 0 && !this.isOverheated && this.attackCooldown <= 0) this.fireSplitShot(this.aKeyHeldTime);
            },
            channel(){
                if (!this.splitChannel) { this.splitChannel = true; this.fireSplitBounce(); this.splitChannelCd = 60; }
                else { if (this.splitChannelCd > 0) this.splitChannelCd--; if (this.splitChannelCd <= 0) { this.fireSplitBounce(); this.splitChannelCd = 60; } }
            },
            batUlt(){
                ultCharge = 0;
                let cxp = this.x + this.w/2, cyp = this.y + this.h/2, sp = 9;
                for (let i = 0; i < 12; i++) { let ang = (i / 12) * Math.PI * 2; let p = new Projectile(cxp, cyp, 2, 6, 0, 999, 1, this.id); p.speed = Math.cos(ang) * sp; p.vy = Math.sin(ang) * sp; p.bounce = true; p.bounceLife = 600; projectiles.push(p); }
                this.aKeyHeldTime = 0; this.chargeProgress = 0;
                floatingTexts.push(new FloatingText(this.x, this.y - 30, "PRISM NOVA!"));
                shakeTimer = Math.max(shakeTimer, 26);
                if (typeof SFX !== 'undefined' && SFX.shoot) SFX.shoot(3);
            },
            ultTick(ammo, fireKey, chargeKey){
                if (chargeKey && this.attackCooldown <= 0 && ultCharge > 0) {
                    this.attackCooldown = 16;
                    let pos = this.getShootPos(), last = ultCharge < 10;
                    ultCharge = Math.max(0, ultCharge * 0.9);
                    for (let k = -1; k <= 1; k++) projectiles.push(new Projectile(pos.x, pos.y - 8 + k * 15, 3, 13, 0, 999, pos.dir, this.id));
                    SFX.shoot(3);
                    if (last) this.endUlt();
                } else if (fireKey && this.attackCooldown <= 0 && ultCharge > 0) {
                    this.attackCooldown = 11;
                    let pos = this.getShootPos(), last = ultCharge < 10;
                    ultCharge = Math.max(0, ultCharge * 0.9);
                    for (let k = 0; k < 3; k++) { let p = new Projectile(pos.x, pos.y - 8, 3, 12, 0, 0, pos.dir, this.id); p.zigBaseY = p.y; p.zigVy = (k - 1) * 2.6; p.zigPhase = k * 2.09; p.zigT = 0; projectiles.push(p); }
                    SFX.shoot(3);
                    if (last) this.endUlt();
                }
                return;
            },
            hoverSac(half){
                this.fireSplitShot(90);                          // len thang MAX charge
            }
        });
// PLAYER_PART_END s4.vkDangKy.5
