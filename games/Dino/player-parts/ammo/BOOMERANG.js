// PLAYER_FILE: BOOMERANG
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, PVP_HS, SFX, addStyle, allTargets, bosses, canvas, checkAABB, combatStance, ctx, damageFromAmmoAny, dino, doChieuThu, enemies, floatingTexts, frames, gameState, hasRune, novaBlast, parry, score, shakeTimer, ultCharge, visualEffects, vkDangKy
// index.html:53556 · Phạm vi: global
// PLAYER_PART_BEGIN s4.boomerangs.1 EDITABLE
let boomerangs = [];
// PLAYER_PART_END s4.boomerangs.1

// index.html:53557 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BOOM_CATCH_R.1 EDITABLE
const BOOM_CATCH_R = 46;
// PLAYER_PART_END s4.BOOM_CATCH_R.1

// index.html:53558 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BOOM_A_MIN.1 EDITABLE
const BOOM_A_MIN = 330;
// PLAYER_PART_END s4.BOOM_A_MIN.1

// index.html:53559 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BOOM_A_MAX.1 EDITABLE
const BOOM_A_MAX = 900;
// PLAYER_PART_END s4.BOOM_A_MAX.1

// index.html:53560 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BOOM_HOVER.1 EDITABLE
const BOOM_HOVER = 52;
// PLAYER_PART_END s4.BOOM_HOVER.1

// index.html:53561 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BOOM_DRIFT.1 EDITABLE
const BOOM_DRIFT = 2.5;
// PLAYER_PART_END s4.BOOM_DRIFT.1

// index.html:53569 · Phạm vi: global
// PLAYER_PART_BEGIN s4.boomApply.1 EDITABLE
function boomApply(rect, dmg, hitSet) {
            let any = false;
            if (typeof doChieuThu === 'function') doChieuThu(hitSet || rect, rect, dmg);   // @@HE-DOCHIEU: moi luoi tinh 1 lan
            let one = (o, isBoss) => {
                if (!o || (hitSet && hitSet.has(o)) || !checkAABB(rect, o)) return;
                if (hitSet) hitSet.add(o);
                if (isBoss) {
                    if (o.invulnAll) { visualEffects.push(new Effect(o.x + o.w / 2, o.y, 'parry', false)); return; }
                    if (o.name === "AEGIS REX") { if (o.shieldBrokenTimer > 0) { damageFromAmmoAny(o, dmg); any = true; } else o.hitShield(3, o.x + o.w / 2, o.y + o.h / 2); return; }
                    if (o.name === "HELIOS REX" && (o.shieldTimer > 0 || o.spamShieldTimer > 0 || o.state.includes('clone_dash') || o.state === 'clone_bounce_back' || o.state === 'clone_wait') && o.shieldHp > 0) {
                        visualEffects.push(new Effect(o.x - 10, o.y + 20, 'parry', false)); o.shieldHp--; return;
                    }
                }
                damageFromAmmoAny(o, dmg); any = true;   // CHI MANG: truoc day Boomerang di duong 'flat' nen khong bao gio chi mang
            };
            allTargets().forEach(o => one(o, bosses.indexOf(o) >= 0));
            if (any && gameState !== 'pvp') score += 1;
            return any;
        }
// PLAYER_PART_END s4.boomApply.1

// index.html:53589 · Phạm vi: global
// PLAYER_PART_BEGIN s4.boomNearestX.1 EDITABLE
function boomNearestX(bx, by) {
            let best = null, bd = 1e9;
            for (let o of bosses.concat(enemies)) { if (o.invulnAll || o.hp <= 0) continue;
                let d = Math.hypot((o.x + o.w / 2) - bx, (o.y + o.h / 2) - by); if (d < bd) { bd = d; best = o; } }
            return best;
        }
// PLAYER_PART_END s4.boomNearestX.1

// index.html:53596 · Phạm vi: global
// PLAYER_PART_BEGIN s4.boomAim.1 EDITABLE
function boomAim(x, y, faceDir) {
            let t = boomNearestX(x, y);
            if (!t) return null;
            let tx = t.x + t.w / 2, ty = t.y + t.h / 2;
            let dir = (tx >= x) ? 1 : -1;
            let base = dir > 0 ? 0 : Math.PI;
            let raw = Math.atan2(ty - y, tx - x);
            let rel = Math.atan2(Math.sin(raw - base), Math.cos(raw - base));
            rel = Math.max(-BOOM_AIM_CAP, Math.min(BOOM_AIM_CAP, rel));
            return { ang: base + rel, dir: dir, dist: Math.hypot(tx - x, ty - y), tgt: t };
        }
// PLAYER_PART_END s4.boomAim.1

// index.html:53609 · Phạm vi: global
// PLAYER_PART_BEGIN s4.boomPos.1 EDITABLE
function boomPos(b, ph) {
            let u = b.A * Math.sin(ph);                    // doc truc chinh
            let v = -(b.lift / 2) * (1 - Math.cos(ph));    // vuong goc truc chinh
            if (!b.ang) return { x: b.x0 + b.dir * u, y: b.y0 + v };
            let ca = Math.cos(b.ang), sa = Math.sin(b.ang);
            return { x: b.x0 + ca * u - sa * v, y: b.y0 + sa * u + ca * v };
        }
// PLAYER_PART_END s4.boomPos.1

// index.html:53618 · Phạm vi: global
// PLAYER_PART_BEGIN s4.boomLost.1 EDITABLE
function boomLost(b) {
            if (!b || b.big || !b.owner) return;
            b.owner.boomOut = Math.max(0, (b.owner.boomOut || 1) - 1);
            // Chi luoi DA TRU DAN moi hoan lai. Hoan sau 1 giay ke tu luc mat.
            if (b.paid) b.owner.boomLostPend = (b.owner.boomLostPend || 0) + 1;
        }
// PLAYER_PART_END s4.boomLost.1

// index.html:53627 · Phạm vi: global
// PLAYER_PART_BEGIN s4.BOOM_AIM_CAP.1 EDITABLE
const BOOM_AIM_CAP = 38 * Math.PI / 180;
// PLAYER_PART_END s4.BOOM_AIM_CAP.1

// index.html:53629 · Phạm vi: global
// PLAYER_PART_BEGIN s4.throwBoomerang.1 EDITABLE
function throwBoomerang(p, opts) {
            opts = opts || {};
            let sc = p.getFormScale ? p.getFormScale() : 1;
            let dir = p.isFacingLeft ? -1 : 1;
            let big = !!opts.big;
            let ch = Math.max(0, Math.min(1, opts.charge || 0));
            let A = opts.ultSmall ? 300 : (BOOM_A_MIN + (BOOM_A_MAX - BOOM_A_MIN) * ch);
            // NGAM: xoay ca duong elip cho truc chinh huong ve muc tieu (chi khi duoc yeu cau)
            let ang = 0;
            if (opts.aim) {
                let am = boomAim(p.x + p.w / 2, p.y + p.h * 0.42, dir);
                if (am) {
                    ang = am.ang; dir = am.dir;
                    if (opts.fitRange) A = Math.max(240, Math.min(BOOM_A_MAX, am.dist * 1.18));
                }
            }
            let b = {
                dir: dir, ang: ang, dmg: opts.dmg || 3, big: big,
                r: (big ? 30 : 14) * sc,
                sp: big ? 15 : 17,
                state: 'arc', spin: 0,
                hit: new Set(), twice: !!opts.twice,
                // ==== THONG SO QUY DAO (chot cung luc nem) ====
                x0: p.x + p.w / 2 + dir * 18,          // goc toa do cua duong bay
                y0: p.y + p.h * 0.42,
                A: A,                                   // ban truc ngang = tam nem
                lift: big ? 0 : (104 - 64 * ch),        // ve cao hon diem nem bao nhieu
                phi: 0,                                  // 0 -> PI
                dphi: Math.PI / (opts.ultSmall ? 62 : (58 + A * 0.09)),   // xa hon thi bay lau hon
                turned: false,
                caught: false, life: 0,
                small: !!opts.small, ultSmall: !!opts.ultSmall, owner: p
            };
            b.x = b.x0; b.y = b.y0;
            if (big) { b.state = 'ride'; b.rideT = 0; b.mounted = false; b.slamT = 0; }
            boomerangs.push(b);
            if (typeof SFX !== 'undefined' && SFX.shoot) SFX.shoot(1);
            return b;
        }
// PLAYER_PART_END s4.throwBoomerang.1

// index.html:53669 · Phạm vi: global
// PLAYER_PART_BEGIN s4.boomAiLoc.1 EDITABLE
let boomAiLoc = null;
// PLAYER_PART_END s4.boomAiLoc.1

// index.html:53670 · Phạm vi: global
// PLAYER_PART_BEGIN s4.tickBoomerangs.1 EDITABLE
function tickBoomerangs() {
            let p = boomAiLoc || dino;
            for (let i = boomerangs.length - 1; i >= 0; i--) {
                let b = boomerangs[i];
                // `let p = dino` cu chay MOT lan duy nhat, ngoai vong doi vai lanVoiP2.
                // Hau qua: luoi cua P2 lay P1 lam chu — no bay ve phia P1 de duoc "bat",
                // va boomApply() ban sat thuong vao allTargets(), ma allTargets() goi ngoai
                // vong doi vai thi tra ve doi thu CUA P1, tuc la chinh P2. P2 nem luoi
                // gay 0 sat thuong len P1 va tu danh minh.
                if (gameState === 'pvp' && b.owner && b.owner !== p) continue;
                b.life++; b.spin += b.big ? 0.30 : 0.55;
                let rect = { x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 };

                // ---------- BOOMERANG LON CUA ULT ----------
                if (b.big) {
                    if (b.state === 'ride') {
                        b.rideT++;
                        if (!b.mounted) {
                            b.x += b.dir * b.sp;
                            b.y += (130 - b.y) * 0.11;                      // VOT LEN CAO nhanh
                            if (b.rideT > 34) b.sp *= 0.90;                 // cham dan roi lo lung cho nguoi choi treo len
                            // Cua so treo len NGAN: khong dung lam ban hover ne dan duoc
                            if (b.rideT > 132) {
                                b.state = 'slam'; b.slamT = 0; b.hit = new Set();
                                if (b.owner) { b.owner.boomUltRide = null; b.owner.boomUltLeft = Math.max(0, (b.owner.boomUltLeft || 0) - 1); }
                            }
                        } else {
                            // DANG CHO NGUOI CHOI: bay NHANH ve phia truoc. Khong phai ban hover, phai xu ly gap.
                            b.x += b.dir * 7.5;
                            b.y += Math.sin(b.rideT * 0.09) * 0.7;
                            if (b.x < 46 || b.x > canvas.width - 46) b.dir *= -1;   // cham mep thi doi huong, van khong dung yen
                            b.x = Math.max(46, Math.min(canvas.width - 46, b.x));
                            if (p) { p.x = b.x - p.w / 2; p.y = b.y - b.r - p.h + 6; p.dy = 0; p.grounded = true; p.canDoubleJump = true; }
                            // dung tren luoi qua lau cung tu roi
                            if (b.rideT > 330) {
                                b.mounted = false; b.state = 'slam'; b.slamT = 0; b.hit = new Set();
                                if (p) { p.grounded = false; p.dy = p.jumpPower; p.canDoubleJump = true; }
                                if (b.owner) { b.owner.boomUltRide = null; b.owner.boomUltLeft = Math.max(0, (b.owner.boomUltLeft || 0) - 1); }
                            }
                        }
                        boomApply(rect, 3, b.hit);
                    } else if (b.state === 'slam') {
                        b.slamT++;
                        let tg = boomNearestX(b.x, b.y);
                        if (tg) b.x += Math.max(-4.5, Math.min(4.5, ((tg.x + tg.w / 2) - b.x) * 0.10));   // homing NHE
                        b.y += Math.min(26, 7 + b.slamT * 1.3);
                        // Chieu cuoi ghi 25 nhung o PvP con he so 0.67 nen ra 16. Chia nguoc
                        // de con so hien ra dung 25 nhu thiet ke — don nay rat kho trung
                        // (phai nem, nhay, canh goc roi day luoi vao nguoi), khong dang bi
                        // cat thanh mot phan ba.
                        if (boomApply(rect, (gameState === 'pvp' ? 25 / (PVP_HS[7] || 1) + 1e-6 : 25), b.hit)) {
                            visualEffects.push(new Effect(b.x, b.y, 'explosion', true, 66));
                            shakeTimer = Math.max(shakeTimer, 22);
                            floatingTexts.push(new FloatingText(b.x - 40, b.y - 30, "CAM LUOI! -25"));
                            boomerangs.splice(i, 1); continue;
                        }
                        if (b.y > 330) {
                            visualEffects.push(new Effect(b.x, 322, 'explosion', true, 58));
                            boomApply({ x: b.x - 62, y: 292, w: 124, h: 46 },
                                      (gameState === 'pvp' ? 25 / (PVP_HS[7] || 1) + 1e-6 : 25), b.hit);
                            shakeTimer = Math.max(shakeTimer, 20);
                            boomerangs.splice(i, 1); continue;
                        }
                    }
                    continue;
                }

                // ---------- QUY DAO BOOMERANG: nua elip co dinh, KHONG bam theo nguoi choi ----------
                if (b.state === 'arc') {
                    b.phi += b.dphi;
                    let ph = Math.min(Math.PI, b.phi);
                    let pt = boomPos(b, ph);
                    b.x = pt.x; b.y = pt.y;
                    // qua diem xa nhat = da quay dau: MAX CHARGE cho an dmg lan hai
                    if (!b.turned && ph >= Math.PI / 2) {
                        b.turned = true;
                        if (b.twice) b.hit = new Set();
                    }
                    boomApply({ x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 }, b.dmg, b.hit);
                    // AWAKENED: NOVA — luoi de lai vet no doc duong bay
                    if (typeof hasRune === 'function' && hasRune('explshot') && b.life % 9 === 0 && typeof novaBlast === 'function') {
                        novaBlast(b.x, b.y, 30, 1, b.hit, 0);
                    }
                    // bat duoc bat cu luc nao cham vao nguoi choi (ke ca luc dang bay ra)
                    if (b.turned && p && p.hp > 0 && Math.hypot((p.x + p.w / 2) - b.x, (p.y + p.h * 0.42) - b.y) < BOOM_CATCH_R) {
                        catchBoomerang(p, b); boomerangs.splice(i, 1); continue;
                    }
                    if (b.phi >= Math.PI) { b.state = 'hover'; b.hoverT = 0; }
                }
                // ---------- LO LUNG CHO BAT ----------
                else if (b.state === 'hover') {
                    b.hoverT++;
                    b.y += 0.55 + b.hoverT * 0.045;                      // tu tu roi xuong
                    // luc nay moi troi NHE ve phia nguoi choi, toi da 2.5px/frame -> khong be cong quy dao
                    if (p) { let d = (p.x + p.w / 2) - b.x; b.x += Math.max(-BOOM_DRIFT, Math.min(BOOM_DRIFT, d * 0.12)); }
                    boomApply({ x: b.x - b.r, y: b.y - b.r, w: b.r * 2, h: b.r * 2 }, b.dmg, b.hit);
                    if (p && p.hp > 0 && Math.hypot((p.x + p.w / 2) - b.x, (p.y + p.h * 0.42) - b.y) < BOOM_CATCH_R) {
                        catchBoomerang(p, b); boomerangs.splice(i, 1); continue;
                    }
                    if (b.hoverT > BOOM_HOVER || b.y > 330) {
                        visualEffects.push(new Effect(b.x, b.y, 'explosion', true, 10));
                        floatingTexts.push(new FloatingText(b.x - 30, b.y - 16, "HUT LUOI!"));
                        boomLost(b); boomerangs.splice(i, 1); continue;
                    }
                }
                if (b.life > 620) { boomLost(b); boomerangs.splice(i, 1); }
            }
        }
// PLAYER_PART_END s4.tickBoomerangs.1

// index.html:53780 · Phạm vi: global
// PLAYER_PART_BEGIN s4.catchBoomerang.1 EDITABLE
function catchBoomerang(p, b) {
            let _nv = (typeof hasRune === 'function' && hasRune('explshot'));
            let cxp = p.x + p.w / 2, cyp = p.y + p.h / 2;
            // 1) No nho quanh nguoi (chi an khi co dich dung sat) — khong con la nguon dmg chinh
            let aoeD = 3 + (_nv ? 2 : 0);   // bat luoi: 3 sat thuong
            let R = (78 + (_nv ? 30 : 0)) * (p.getFormScale ? p.getFormScale() : 1);
            boomApply({ x: cxp - R, y: cyp - R, w: R * 2, h: R * 2 }, aoeD, new Set());
            visualEffects.push(new Effect(cxp, cyp, 'explosion', true, R));
            shakeTimer = Math.max(shakeTimer, 12);
            p.boomSpin = 22;
            p.attackCooldown = 0;
            p.boomOut = Math.max(0, (p.boomOut || 1) - 1);
            if (typeof SFX !== 'undefined' && SFX.parry) SFX.parry();
            if (typeof addStyle === 'function') addStyle(5, 'catch');   // BAT BOOMERANG la mot ky nang, khong phai sat thuong (12 -> 5: bat lien tuc la farm)

            // 2) NEM NGUOC CO NGAM: bat duoc la nem thang vao dich gan nhat, mien phi dan
            let chain = (b.chain || 0) + 1;
            let inCh = !!p.boomChannel;
            let cd = inCh ? 4 : 3;                            // Khien Luoi manh hon (nerf -1: 4/5 -> 3/4)
            let nb = throwBoomerang(p, { dmg: cd, charge: 0.55, twice: true, aim: true, fitRange: true });
            nb.chain = chain; nb.counter = true; nb.paid = b.paid;
            p.boomOut = (p.boomOut || 0) + 1;
            p.boomThrowCount = chain;
            let tag = boomNearestX(cxp, cyp) ? ("PHAN DON x" + chain + "  -" + cd) : ("BAT LUOI x" + chain);
            floatingTexts.push(new FloatingText(cxp - 52, p.y - 30, tag));
        }
// PLAYER_PART_END s4.catchBoomerang.1

// index.html:53806 · Phạm vi: global
// PLAYER_PART_BEGIN s4.drawBoomerangs.1 EDITABLE
function drawBoomerangs() {
            for (let b of boomerangs) {
                ctx.save();
                ctx.translate(b.x, b.y); ctx.rotate(b.spin);
                let R = b.r, col = b.big ? "#FFD54F" : (b.twice ? "#FF80AB" : "#80DEEA");
                ctx.shadowBlur = b.big ? 20 : 12; ctx.shadowColor = col;
                // luoi hinh chu V (boomerang) 2 canh
                ctx.strokeStyle = col; ctx.lineWidth = b.big ? 9 : 5; ctx.lineCap = "round";
                ctx.beginPath(); ctx.moveTo(-R, R * 0.55); ctx.lineTo(0, -R * 0.75); ctx.lineTo(R, R * 0.55); ctx.stroke();
                ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = b.big ? 3.5 : 2;
                ctx.beginPath(); ctx.moveTo(-R, R * 0.55); ctx.lineTo(0, -R * 0.75); ctx.lineTo(R, R * 0.55); ctx.stroke();
                ctx.restore();
                // vet duoi mo phia sau
                // vet duoi keo NGUOC voi huong bay thuc te (luot ve thi vet nam phia ben kia)
                let vdir = b.big ? b.dir : (b.dir * (Math.cos(Math.min(Math.PI, b.phi || 0)) >= 0 ? 1 : -1));
                ctx.save(); ctx.globalAlpha = 0.28; ctx.strokeStyle = b.big ? "#FFE082" : "#B2EBF2"; ctx.lineWidth = 3;
                for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.arc(b.x - vdir * k * 7, b.y, b.r * (1 - k * 0.18), 0, Math.PI * 2); ctx.stroke(); }
                ctx.restore();
                // dang quay ve: chi ro DIEM VE CO DINH (khong doi khi nguoi choi nhay)
                if (b.state === 'arc' && b.turned) {
                    let end = boomPos(b, Math.PI);
                    ctx.save();
                    ctx.globalAlpha = 0.35 + 0.35 * Math.abs(Math.sin(frames * 0.2));
                    ctx.strokeStyle = "#80DEEA"; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.beginPath(); ctx.arc(end.x, end.y, BOOM_CATCH_R, 0, Math.PI * 2); ctx.stroke();
                    // ve luon phan duong bay con lai de doc quy dao
                    ctx.globalAlpha = 0.22; ctx.lineWidth = 2;
                    ctx.beginPath();
                    for (let k = 0; k <= 16; k++) {
                        let ph = b.phi + (Math.PI - b.phi) * (k / 16);
                        let pp = boomPos(b, ph);
                        if (k === 0) ctx.moveTo(pp.x, pp.y); else ctx.lineTo(pp.x, pp.y);
                    }
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.restore();
                }
                // dang lo lung: vong bat sang ro, dem nguoc thoi gian con lai
                if (b.state === 'hover') {
                    let left = 1 - (b.hoverT / BOOM_HOVER);
                    ctx.save();
                    ctx.globalAlpha = 0.55 + 0.35 * Math.abs(Math.sin(frames * 0.35));
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(b.x, b.y, BOOM_CATCH_R, 0, Math.PI * 2); ctx.stroke();
                    ctx.globalAlpha = 1;
                    ctx.strokeStyle = "#80DEEA"; ctx.lineWidth = 4;
                    ctx.beginPath(); ctx.arc(b.x, b.y, BOOM_CATCH_R + 6, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * left); ctx.stroke();
                    ctx.restore();
                }
            }
        }
// PLAYER_PART_END s4.drawBoomerangs.1

// index.html:53858 · Phạm vi: global
// PLAYER_PART_BEGIN s4.boomNhayUlt.1 EDITABLE
function boomNhayUlt(){
            let rb = dino.boomUltRide;
            if (!rb.mounted) {
                // treo len: bam ra luoi va dung len tren
                rb.mounted = true; rb.sp = 0;
                dino.x = rb.x - dino.w / 2; dino.y = rb.y - rb.r - dino.h + 6;
                dino.dy = 0; dino.grounded = true; dino.canDoubleJump = true; dino.invincible = true; dino.invTimer = Math.max(dino.invTimer, 40);
                floatingTexts.push(new FloatingText(dino.x - 20, dino.y - 26, "LEN LUOI!"));
                visualEffects.push(new Effect(rb.x, rb.y, 'parry', false));
                SFX.jump();
            } else {
                // nhay ra: luoi CAM THANG XUONG DAT co homing nhe, nguoi choi duoc 2 bac nhay
                rb.mounted = false; rb.state = 'slam'; rb.slamT = 0; rb.hit = new Set();
                dino.grounded = false; dino.dy = dino.jumpPower * 1.05; dino.canDoubleJump = true; dino.hoverArmed = false;
                dino.boomUltRide = null; dino.boomUltLeft = Math.max(0, (dino.boomUltLeft || 0) - 1);
                floatingTexts.push(new FloatingText(dino.x - 20, dino.y - 26, "CAM XUONG! (" + dino.boomUltLeft + " luoi con lai)"));
                shakeTimer = Math.max(shakeTimer, 14);
                SFX.jump();
            }
        }
// PLAYER_PART_END s4.boomNhayUlt.1

// index.html:53882 · Phạm vi: Player.prototype
const __Part18 = {
// PLAYER_PART_BEGIN s4.Player.prototype.boomHoverThrow.1 EDITABLE
boomHoverThrow() {
                this.ammo--; this.attackCooldown = 30;
                this.boomOut = (this.boomOut || 0) + 1;
                let nb = throwBoomerang(this, { dmg: 4, charge: 0.5, twice: true, aim: true, fitRange: true });
                nb.paid = true;
                floatingTexts.push(new FloatingText(this.x - 24, this.y - 28, "LƯỠI KÉP · NGẮM"));
            }
// PLAYER_PART_END s4.Player.prototype.boomHoverThrow.1
};

// index.html:53891 · Phạm vi: Player.prototype
const __Part19 = {
// PLAYER_PART_BEGIN s4.Player.prototype.boomThrow.1 EDITABLE
boomThrow(held) {
                let maxF = 90;
                let t = Math.max(0, Math.min(1, held / maxF));
                let full = held >= maxF;
                this.ammo--; this.attackCooldown = 60;   // 1 giay giua 2 lan nem
                this.boomOut = (this.boomOut || 0) + 1;
                // Cu nem THUONG truoc day thieu cop `aim` — cac duong nem khac (sac, channel,
                // bat lai) deu co. Nen no bay THANG theo huong dang dung thay vi ngam con gan nhat.
                let nb = throwBoomerang(this, { dmg: held > 0 ? 4 : 3, charge: t, twice: full,
                                                aim: true, fitRange: true });
                nb.paid = true;                          // luoi nay da tru dan -> mat thi moi hoan lai
                if (full) floatingTexts.push(new FloatingText(this.x - 20, this.y - 28, "LUOI KEP!"));
            }
// PLAYER_PART_END s4.Player.prototype.boomThrow.1
};

// index.html:53905 · Phạm vi: Player.prototype
const __Part20 = {
// PLAYER_PART_BEGIN s4.Player.prototype.boomChannelThrow.1 EDITABLE
boomChannelThrow() {
                this.boomOut = (this.boomOut || 0) + 1;
                // KHIEN LUOI: luoi tu ngam vao dich gan nhat ngay tu cu nem dau
                throwBoomerang(this, { dmg: 5, charge: 0.65, twice: true, aim: true, fitRange: true });
                this.attackCooldown = 8;
            }
// PLAYER_PART_END s4.Player.prototype.boomChannelThrow.1
};

// index.html:53912 · Phạm vi: Player.prototype
const __Part21 = {
// PLAYER_PART_BEGIN s4.Player.prototype.boomTickChannel.1 EDITABLE
boomTickChannel(chargeKey) {
                this.boomChanCd = (this.boomChanCd || 0) - 1;
                // 3 luoi dau nem lien tuc luc moi vao
                if (this.boomChanLeft > 0 && this.boomChanCd <= 0) { this.boomChannelThrow(); this.boomChanLeft--; this.boomChanCd = 22; }
                // VAN GIU K: cu 1 giay tao bu 1 luoi neu luoi cu da mat
                else if (this.boomChanLeft <= 0 && chargeKey && combatStance === 0) {
                    this.boomChanRefill = (this.boomChanRefill || 0) + 1;
                    if (this.boomChanRefill >= 60) {
                        this.boomChanRefill = 0;
                        if ((this.boomOut || 0) < 3) { this.boomChannelThrow(); floatingTexts.push(new FloatingText(this.x - 20, this.y - 40, "BU LUOI")); }
                    }
                } else this.boomChanRefill = 0;
                // Chi ket thuc khi KHONG con luoi nao tren khong VA da nha phim
                if (this.boomChanLeft <= 0 && (this.boomOut || 0) <= 0 && !chargeKey) {
                    this.boomChannel = false; this.boomThrowCount = 0;
                    this.isOverheated = true; this.overheatTimer = 120;
                    this.aKeyHeldTime = 0; this.chargeProgress = 0;
                    floatingTexts.push(new FloatingText(this.x - 24, this.y - 30, "MAT HET LUOI!"));
                }
            }
// PLAYER_PART_END s4.Player.prototype.boomTickChannel.1
};

// index.html:53932 · Phạm vi: Player.prototype
const __Part22 = {
// PLAYER_PART_BEGIN s4.Player.prototype.boomVeXoay.1 EDITABLE
boomVeXoay() {
                this.boomSpin--;
                let bs = this.boomSpin / 22, R = 86 * (this.getFormScale ? this.getFormScale() : 1);
                let cxb = this.x + this.w / 2, cyb = this.y + this.h / 2;
                ctx.save();
                ctx.globalAlpha = bs;
                ctx.strokeStyle = "#80DEEA"; ctx.lineWidth = 4; ctx.shadowBlur = 16; ctx.shadowColor = "#80DEEA";
                ctx.beginPath(); ctx.arc(cxb, cyb, R * (0.55 + 0.45 * (1 - bs)), 0, Math.PI * 2); ctx.stroke();
                ctx.shadowBlur = 0;
                for (let k = 0; k < 3; k++) {
                    let a = frames * 0.55 + k * (Math.PI * 2 / 3), rr = R * 0.8;
                    ctx.save();
                    ctx.translate(cxb + Math.cos(a) * rr, cyb + Math.sin(a) * rr); ctx.rotate(a * 3);
                    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 4; ctx.lineCap = "round";
                    ctx.beginPath(); ctx.moveTo(-11, 6); ctx.lineTo(0, -8); ctx.lineTo(11, 6); ctx.stroke();
                    ctx.restore();
                }
                ctx.restore();
            }
// PLAYER_PART_END s4.Player.prototype.boomVeXoay.1
};

// index.html:53953 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.9 EDITABLE
vkDangKy(7, {
            ten: 'BOOMERANG',
            theLuc: 3,                  // thanh dan = so luoi dang cam tay
            banJ(){
                if (this.ammo > 0) this.boomThrow(0);
            },
            nhaK(){
                // NHA K khi dang KHIEN LUOI: KHONG tat che do. Luoi con bay thi van con dieu khien duoc.
                if (this.boomChannel) { this.boomChanRefill = 0; }
                else if (this.ammo > 0 && !this.isOverheated && this.attackCooldown <= 0) this.boomThrow(this.aKeyHeldTime);
            },
            channel(){
                if (!this.boomChannel) {
                    this.boomChannel = true; this.boomChanLeft = 3; this.boomChanCd = 0; this.boomThrowCount = 0;
                    floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, "KHIEN LUOI!"));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(420, 0.2, 'triangle', 0.22, 760);
                }
            },
            // BOOMERANG: thanh dan = so LUOI DANG CAM TAY. Nem ra la mat luon,
            // chi khi luoi BI MAT (khong bat kip) moi hoi lai, va phai cho 1 giay.
            hoiDan(){
                if (this.boomLostPend > 0) {
                    this.boomRefillT = (this.boomRefillT || 0) + 1;
                    if (this.boomRefillT >= 60) {
                        this.boomRefillT = 0; this.boomLostPend--;
                        if (this.ammo < this.maxAmmo) this.ammo++;
                    }
                } else this.boomRefillT = 0;
            },
            hetQuaNhiet(){
                this.boomLostPend = 0;
            },
            batUlt(){
                ultCharge = 0;
                this.ultActive = true; this.ultAmmo = 7; this.ultTimer = 0;
                this.aKeyHeldTime = 0; this.chargeProgress = 0; this.isOverheated = false;
                this.boomUltLeft = 3; this.boomUltRide = null; this.boomUltSmall = 0;
                floatingTexts.push(new FloatingText(this.x - 30, this.y - 30, "OVERDRIVE: 3 LUOI!"));
                shakeTimer = Math.max(shakeTimer, 24);
                if (typeof SFX !== 'undefined' && SFX.tone) { SFX.tone(320, 0.3, 'sawtooth', 0.28, 880); SFX.tone(880, 0.25, 'square', 0.16, 1200); }
            },
            // ===== BOOMERANG ULT — OVERDRIVE: nem luoi lon roi TREO LEN no =====
            ultTick(ammo, fireKey, chargeKey){
                let ride = this.boomUltRide;
                if (ride && boomerangs.indexOf(ride) < 0) { this.boomUltRide = null; ride = null; }
                // J = nem luoi LON (chi khi chua co chiec nao dang bay)
                if (fireKey && !ride && this.boomUltLeft > 0 && this.attackCooldown <= 0) {
                    this.boomUltRide = throwBoomerang(this, { big: true });
                    this.attackCooldown = 24;
                    floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, "NHAY DE TREO LEN!"));
                }
                // K = dang dung tren luoi thi nem luoi NHO tu tim muc tieu
                if (chargeKey && ride && ride.mounted && this.attackCooldown <= 0 && (this.boomUltSmall || 0) < 4) {
                    throwBoomerang(this, { dmg: 4, charge: 1, twice: true, ultSmall: true });
                    this.boomUltSmall = (this.boomUltSmall || 0) + 1;
                    this.attackCooldown = 16;
                }
                if (this.boomUltLeft <= 0 && !ride) this.endUlt();
                return;
            },
            hoverSac(half){
                if ((this.boomOut || 0) < 3) this.boomHoverThrow();
            }
        });
// PLAYER_PART_END s4.vkDangKy.9
