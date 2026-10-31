// PLAYER_FILE: DinoForms
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, LT, SFX, XUONG_BONE, XUONG_DK, XUONG_OUT, ctx, currentForm, dashVx, dealDamage, deathCineActive, deathCineFrame, deathReviveLevel, dino, enemies, floatingTexts, frames, gameState, reviveOverlay, shakeTimer, visualEffects
// index.html:83149 · Phạm vi: global
// PLAYER_PART_BEGIN s6.DANG_NOR_LUOT.1 EDITABLE
const DANG_NOR_LUOT = 0.85, DANG_RUSH_CHAY = 1.06;
// PLAYER_PART_END s6.DANG_NOR_LUOT.1

// index.html:83150 · Phạm vi: global
// PLAYER_PART_BEGIN s6.DANG_HQ_R.1 EDITABLE
const DANG_HQ_R = 46, DANG_HQ_NHIP = 60, DANG_VAY_CHO = 1500;
// PLAYER_PART_END s6.DANG_HQ_R.1

// index.html:83151 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dangCua.1 EDITABLE
function dangCua(ng){ return ng && ng.id === 1 ? currentForm : (ng ? ng.form : 0); }
// PLAYER_PART_END s6.dangCua.1

// index.html:83152 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dangMauThem.1 EDITABLE
function dangMauThem(f){ return (f === 2 || f === 3) ? 1 : 0; }
// PLAYER_PART_END s6.dangMauThem.1

// index.html:83153 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dangTick.1 EDITABLE
function dangTick(ng){
            if (!ng || ng.id !== 1 || gameState === 'pvp') return;
            let f = currentForm;
            if (f === 2 && frames % DANG_HQ_NHIP === 0 && typeof enemies !== 'undefined'){
                let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2;
                for (let e of enemies){
                    if (!e || e.hp === undefined || e.hp <= 0 || e.invulnAll) continue;
                    let ex = e.x + (e.w||20) / 2, ey = e.y + (e.h||20) / 2;
                    if (Math.abs(ex - cx) > DANG_HQ_R + (e.w||20) / 2 || Math.abs(ey - cy) > DANG_HQ_R + (e.h||20) / 2) continue;
                    if (typeof dealDamage === 'function') dealDamage(e, 1, 'ammo'); else e.hp -= 1;
                    visualEffects.push(new Effect(ex, ey, 'explosion', true, 8));
                }
            }
            if (f === 3){
                ng.dangVayT = (ng.dangVayT || 0) + 1;
                if (!ng.dangVay && ng.dangVayT >= DANG_VAY_CHO){
                    ng.dangVay = 1;
                    floatingTexts.push(new FloatingText(ng.x - 10, ng.y - 30, LT("VẢY", "SCALE")));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1200, 0.08, 'triangle', 0.10, 1600);
                }
            } else { ng.dangVay = 0; ng.dangVayT = 0; }
        }
// PLAYER_PART_END s6.dangTick.1

// index.html:83189 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dangVayChan.1 EDITABLE
function dangVayChan(ng){
            if (!ng || ng.id !== 1 || gameState === 'pvp' || currentForm !== 3) return false;
            ng.dangVayT = 0;                                   // dinh don (du chan hay khong) la dem lai tu dau
            if (!ng.dangVay) return false;
            ng.dangVay = 0; ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 40);
            floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 30, LT("VẢY CHẶN!", "SCALE BLOCK!")));
            visualEffects.push(new Effect(ng.x + ng.w / 2, ng.y + ng.h / 2, 'parry'));
            return true;
        }
// PLAYER_PART_END s6.dangVayChan.1

// index.html:83199 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dangVeNoiTai.1 EDITABLE
function dangVeNoiTai(ng, cx, cy){
            if (!ng || ng.id !== 1) return;
            if (currentForm === 2 && gameState !== 'pvp'){
                ctx.strokeStyle = 'rgba(255,82,82,' + (0.18 + 0.1 * Math.sin(frames * 0.12)).toFixed(3) + ')'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(cx, cy, DANG_HQ_R, 0, 6.28); ctx.stroke();
            }
            if (currentForm === 3 && ng.dangVay){
                ctx.strokeStyle = 'rgba(206,147,216,' + (0.45 + 0.25 * Math.sin(frames * 0.15)).toFixed(3) + ')'; ctx.lineWidth = 2;
                for (let k = 0; k < 6; k++){ let a = k * Math.PI / 3 + frames * 0.02;
                    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * 30, cy + Math.sin(a) * 26, 5, 0, 6.28); ctx.stroke(); }
            }
        }
// PLAYER_PART_END s6.dangVeNoiTai.1

// index.html:85581 · Phạm vi: global
// PLAYER_PART_BEGIN s6.DANG_KINH.1 EDITABLE
const DANG_KINH = 5, DANG_XUONG = 6;
// PLAYER_PART_END s6.DANG_KINH.1

// index.html:85582 · Phạm vi: global
// PLAYER_PART_BEGIN s6.DANG_TOC_MOI.1 EDITABLE
const DANG_TOC_MOI = 1.05, DANG_NHAY_MOI = Math.sqrt(1.05), DANG_XUONG_LUOT = 0.95;
// PLAYER_PART_END s6.DANG_TOC_MOI.1

// index.html:85583 · Phạm vi: global
// PLAYER_PART_BEGIN s6.DEATH_SKEL_TOTAL.1 EDITABLE
const DEATH_SKEL_TOTAL = 170;
// PLAYER_PART_END s6.DEATH_SKEL_TOTAL.1

// index.html:85584 · Phạm vi: global
// PLAYER_PART_BEGIN s6.deathSkel.1 EDITABLE
let deathSkel = null;
// PLAYER_PART_END s6.deathSkel.1

// index.html:85585 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dangMauGoc.1 EDITABLE
function dangMauGoc(f){ return f === DANG_KINH ? 3 : (f === DANG_XUONG ? 4 : 5); }
// PLAYER_PART_END s6.dangMauGoc.1

// index.html:85586 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dangTocMul.1 EDITABLE
function dangTocMul(ng){
            if (!ng || ng.id !== 1 || gameState === 'pvp') return 1;
            let f = dangCua(ng);
            if (f === DANG_XUONG || (f === DANG_KINH && (ng.kinhLop || 0) <= 0)) return DANG_TOC_MOI;
            return 1;
        }
// PLAYER_PART_END s6.dangTocMul.1

// index.html:85592 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dangNhayMul.1 EDITABLE
function dangNhayMul(ng){
            if (!ng || ng.id !== 1 || gameState === 'pvp') return 1;
            let f = dangCua(ng);
            if (f === DANG_XUONG || (f === DANG_KINH && (ng.kinhLop || 0) <= 0)) return DANG_NHAY_MOI;
            return 1;
        }
// PLAYER_PART_END s6.dangNhayMul.1

// index.html:85600 · Phạm vi: global
// PLAYER_PART_BEGIN s6.kinhPal.1 EDITABLE
function kinhPal(ng){
            let L = (ng && ng.id === 1 && ng.kinhLop !== undefined) ? ng.kinhLop : 2;
            return { bd: 'rgba(150,214,236,0.40)', hd: 'rgba(172,228,246,0.48)', dk: 'rgba(92,160,192,0.5)', lt: 'rgba(238,252,255,0.78)', foot: 'rgba(110,176,204,0.55)',
                     spk: 'rgba(205,246,255,0.88)', out: 'rgba(40,112,146,0.9)', rim: 'rgba(255,255,255,0.95)', eye: '#E1F5FE', pup: '#0277BD', aura: null,
                     crest: L >= 2 ? 5 : (L === 1 ? 3 : 0) };
        }
// PLAYER_PART_END s6.kinhPal.1

// index.html:85606 · Phạm vi: global
// PLAYER_PART_BEGIN s6.kinhTinhThe.1 EDITABLE
function kinhTinhThe(x, y, w, h, ang, al){
            ctx.save(); ctx.translate(x, y); ctx.rotate(ang || 0);
            ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(-w * 0.32, -h * 0.55); ctx.lineTo(0, -h); ctx.lineTo(w * 0.32, -h * 0.55); ctx.lineTo(w / 2, 0); ctx.closePath();
            ctx.fillStyle = 'rgba(214,246,255,' + (0.5 * al).toFixed(2) + ')'; ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,' + (0.95 * al).toFixed(2) + ')'; ctx.lineWidth = 1.1; ctx.stroke();
            ctx.strokeStyle = 'rgba(120,200,235,' + (0.8 * al).toFixed(2) + ')'; ctx.beginPath(); ctx.moveTo(0, -h); ctx.lineTo(0, -2); ctx.moveTo(0, -h * 0.55); ctx.lineTo(-w * 0.32, -h * 0.55); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s6.kinhTinhThe.1

// index.html:85635 · Phạm vi: global
// PLAYER_PART_BEGIN s6.kinhVo.1 EDITABLE
function kinhVo(ng, n){
            let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2, parts = [];
            for (let i = 0; i < 12 * n; i++) parts.push({ x: cx + (Math.random() - 0.5) * ng.w, y: cy + (Math.random() - 0.5) * ng.h, vx: (Math.random() - 0.5) * 8, vy: -Math.random() * 6 - 1,
                                                          r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.5, sz: 4 + Math.random() * 7 });
            visualEffects.push({ timer: 0, life: 56,
                update(){ this.timer++; for (const p of parts){ p.x += p.vx; p.y += p.vy; p.vy += 0.42; p.r += p.vr; } },
                draw(){
                    ctx.save(); let a = Math.max(0, 1 - this.timer / this.life);
                    for (const p of parts){
                        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = a;
                        ctx.beginPath(); ctx.moveTo(-p.sz / 2, p.sz / 3); ctx.lineTo(0, -p.sz * 0.7); ctx.lineTo(p.sz / 2, p.sz / 3); ctx.closePath();
                        ctx.fillStyle = 'rgba(205,243,255,0.62)'; ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,0.95)'; ctx.lineWidth = 1; ctx.stroke(); ctx.restore();
                    }
                    ctx.restore();
                } });
            floatingTexts.push(new FloatingText(ng.x - 24, ng.y - 36, n >= 2 ? "KÍNH VỠ ×2!" : "KÍNH VỠ!"));
            if (typeof SFX !== 'undefined'){ if (SFX.glassBreak) SFX.glassBreak(); else if (SFX.tone) SFX.tone(1800, 0.12, 'triangle', 0.16, 600); }
        }
// PLAYER_PART_END s6.kinhVo.1

// index.html:85654 · Phạm vi: global
// PLAYER_PART_BEGIN s6.kinhAnDon.1 EDITABLE
function kinhAnDon(ng, amount){
            if (!ng || ng.id !== 1 || gameState === 'pvp' || dangCua(ng) !== DANG_KINH || (ng.kinhLop || 0) <= 0) return amount;
            let ab = Math.min(Math.max(1, Math.ceil(amount)), ng.kinhLop), s0 = ng.getFormScale();
            ng.kinhLop -= ab;
            let s1 = ng.getFormScale();
            ng.y += 44 * (s0 - s1); ng.h = 44 * s1; ng.w = 32 * s1;                 // nho lai, chan van dung tren dat
            ng.invincible = true; ng.invTimer = 80; shakeTimer = Math.max(shakeTimer || 0, 12);
            kinhVo(ng, ab);
            return Math.max(0, amount - ab);
        }
// PLAYER_PART_END s6.kinhAnDon.1

// index.html:85664 · Phạm vi: global
// PLAYER_PART_BEGIN s6.kinhVeHud.1 EDITABLE
function kinhVeHud(){
            if (typeof dino === 'undefined' || !dino || gameState === 'pvp' || dangCua(dino) !== DANG_KINH) return;
            let L = dino.kinhLop === undefined ? 2 : dino.kinhLop;
            ctx.save();
            for (let i = 0; i < 2; i++){
                let x = 24 + i * 18, y = 28, on = i < L;
                ctx.beginPath(); ctx.moveTo(x, y - 9); ctx.lineTo(x + 7, y); ctx.lineTo(x, y + 9); ctx.lineTo(x - 7, y); ctx.closePath();
                ctx.fillStyle = on ? 'rgba(170,230,250,0.78)' : 'rgba(60,90,110,0.25)'; ctx.fill();
                ctx.strokeStyle = on ? '#FFFFFF' : 'rgba(150,190,210,0.35)'; ctx.lineWidth = 1.6; ctx.stroke();
                if (on){ ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.moveTo(x - 2, y - 4); ctx.lineTo(x + 2, y - 1); ctx.stroke(); }
            }
            ctx.restore();
        }
// PLAYER_PART_END s6.kinhVeHud.1

// index.html:85680 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xuongRnd.1 EDITABLE
function xuongRnd(i, s){ let x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return x - Math.floor(x); }
// PLAYER_PART_END s6.xuongRnd.1

// index.html:85682 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xuongParts.1 EDITABLE
function xuongParts(bx, by, dy, ph, crouch, airborne){
            const P = [];
            const B = (x1, y1, x2, y2, w) => P.push({ k: 'bone', cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, ang: Math.atan2(y2 - y1, x2 - x1), a: Math.hypot(x2 - x1, y2 - y1), b: w });
            const qp = (p0, c, p1, t) => { let u = 1 - t; return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]]; };
            for (let i = 0; i < 5; i++){ let t = i / 4; P.push({ k: 'vert', cx: bx + 5 - t * 27, cy: by + 19 + dy - t * 12, ang: -0.35, a: 3.8 - i * 0.5, b: 3.1 - i * 0.4 }); }   // duoi
            const S0 = [bx + 9, by + 21 + dy], SC = [bx + 19, by + 7 + dy], S1 = [bx + 32, by + 10 + dy];
            for (let i = 0; i < 7; i++){ let p = qp(S0, SC, S1, i / 6); P.push({ k: 'vert', cx: p[0], cy: p[1], ang: -0.2, a: 3.6, b: 3 }); }                     // cot song
            for (let i = 0; i < 4; i++){ let p = qp(S0, SC, S1, 0.22 + i * 0.14); P.push({ k: 'rib', cx: p[0] + 2.5, cy: p[1] + 8, ang: 0.12, a: 15 - i * 1.2, b: 5 }); }   // 4 xuong suon
            P.push({ k: 'pelvis', cx: bx + 10, cy: by + 26 + dy, ang: 0, a: 15, b: 9 });
            B(bx + 27, by + 21 + dy, bx + 31, by + 26 + dy, 2.6); B(bx + 31, by + 26 + dy, bx + 37, by + 28 + dy, 2.4);                                            // tay
            P.push({ k: 'claw', cx: bx + 39.5, cy: by + 29 + dy, ang: 0.5, a: 5, b: 2 });
            for (let i = 0; i < 2; i++){                                                                                                                          // 2 chan
                let hx = bx + 13 + i * 8, hy = by + 27 + dy, f = crouch ? 0.5 : (airborne ? 0.9 : Math.sin(frames * 0.26 + i * Math.PI));
                let kx = hx + 3 + f * 3, ky = hy + (crouch ? 6 : 9) - Math.abs(f) * 1.5, ax = hx + 1 + f * 6, ay = by + 43 - Math.max(0, f) * 5 - (airborne ? 4 : 0);
                B(hx, hy, kx, ky, 3.4); B(kx, ky, ax, ay, 3); P.push({ k: 'foot', cx: ax + 3.5, cy: ay + 1, ang: 0.05, a: 9, b: 2.6 });
            }
            P.push({ k: 'skull', cx: bx + 43, cy: by + 7 + dy, ang: 0.04, a: 22, b: 14 });
            P.push({ k: 'jaw', cx: bx + 44, cy: by + 14 + dy, ang: 0.04, a: 20, b: 7 });
            return P;
        }
// PLAYER_PART_END s6.xuongParts.1

// index.html:85702 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xuongVeManh.1 EDITABLE
function xuongVeManh(P){
            ctx.save(); ctx.translate(P.cx, P.cy); ctx.rotate(P.ang);
            ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            if (P.k === 'bone' || P.k === 'foot'){
                ctx.strokeStyle = XUONG_OUT; ctx.lineWidth = P.b + 2.4; ctx.beginPath(); ctx.moveTo(-P.a / 2, 0); ctx.lineTo(P.a / 2, 0); ctx.stroke();
                ctx.strokeStyle = XUONG_BONE; ctx.lineWidth = P.b; ctx.beginPath(); ctx.moveTo(-P.a / 2, 0); ctx.lineTo(P.a / 2, 0); ctx.stroke();
                for (const sx of [-1, 1]){ ctx.beginPath(); ctx.arc(sx * P.a / 2, 0, P.b * 0.78, 0, Math.PI * 2); ctx.fillStyle = XUONG_BONE; ctx.fill(); ctx.strokeStyle = XUONG_OUT; ctx.lineWidth = 1; ctx.stroke(); }
                if (P.k === 'foot'){ ctx.strokeStyle = XUONG_OUT; ctx.lineWidth = 1; for (const d of [-2, 0, 2]){ ctx.beginPath(); ctx.moveTo(P.a / 2, d * 0.7); ctx.lineTo(P.a / 2 + 3, d * 1.4); ctx.stroke(); } }
            } else if (P.k === 'vert'){
                ctx.beginPath(); ctx.ellipse(0, 0, P.a, P.b, 0, 0, Math.PI * 2); ctx.fillStyle = XUONG_BONE; ctx.fill(); ctx.strokeStyle = XUONG_OUT; ctx.lineWidth = 1.2; ctx.stroke();
            } else if (P.k === 'rib'){
                ctx.strokeStyle = XUONG_OUT; ctx.lineWidth = 4.2; ctx.beginPath(); ctx.moveTo(-3, -P.a / 2); ctx.quadraticCurveTo(P.b + 3, -2, 1.5, P.a / 2); ctx.stroke();
                ctx.strokeStyle = XUONG_BONE; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-3, -P.a / 2); ctx.quadraticCurveTo(P.b + 3, -2, 1.5, P.a / 2); ctx.stroke();
            } else if (P.k === 'pelvis'){
                ctx.beginPath(); ctx.moveTo(-7.5, -3); ctx.lineTo(7, -4.5); ctx.lineTo(8.5, 3); ctx.lineTo(0, 5); ctx.lineTo(-8.5, 3); ctx.closePath();
                ctx.fillStyle = XUONG_BONE; ctx.fill(); ctx.strokeStyle = XUONG_OUT; ctx.lineWidth = 1.4; ctx.stroke();
                ctx.fillStyle = XUONG_OUT; ctx.beginPath(); ctx.ellipse(0, 0.5, 2, 1.5, 0, 0, Math.PI * 2); ctx.fill();
            } else if (P.k === 'claw'){
                ctx.beginPath(); ctx.moveTo(-2, -2); ctx.quadraticCurveTo(4, -1, 5, 3); ctx.quadraticCurveTo(1, 1, -2, 2); ctx.closePath();
                ctx.fillStyle = XUONG_BONE; ctx.fill(); ctx.strokeStyle = XUONG_OUT; ctx.lineWidth = 1; ctx.stroke();
            } else if (P.k === 'skull'){
                ctx.beginPath(); ctx.moveTo(-9, 2); ctx.lineTo(-7.5, -6.5); ctx.lineTo(-1, -8); ctx.lineTo(7, -6); ctx.lineTo(12, -2); ctx.lineTo(13, 2.5); ctx.lineTo(-9, 2.5); ctx.closePath();
                ctx.fillStyle = XUONG_BONE; ctx.fill(); ctx.strokeStyle = XUONG_OUT; ctx.lineWidth = 1.5; ctx.stroke();
                ctx.fillStyle = '#1b1610'; ctx.beginPath(); ctx.ellipse(3, -2.2, 3, 2.7, 0.15, 0, Math.PI * 2); ctx.fill();                    // o mat
                ctx.fillStyle = 'rgba(255,40,70,0.85)'; ctx.beginPath(); ctx.arc(3.4, -2.2, 1.1, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#1b1610'; ctx.beginPath(); ctx.ellipse(11, -0.2, 0.9, 1.3, 0, 0, Math.PI * 2); ctx.fill();                       // lo mui
                ctx.strokeStyle = XUONG_DK; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-5, -5); ctx.lineTo(-2, -1); ctx.stroke();
                ctx.fillStyle = XUONG_BONE; for (let k = 0; k < 4; k++){ ctx.beginPath(); ctx.moveTo(4 + k * 2.4, 2.5); ctx.lineTo(5.3 + k * 2.4, 5); ctx.lineTo(6.6 + k * 2.4, 2.5); ctx.closePath(); ctx.fill(); ctx.stroke(); }
            } else if (P.k === 'jaw'){
                ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(12, 0); ctx.lineTo(11, 4); ctx.lineTo(-1, 5.5); ctx.lineTo(-6, 3.5); ctx.closePath();
                ctx.fillStyle = XUONG_DK; ctx.fill(); ctx.strokeStyle = XUONG_OUT; ctx.lineWidth = 1.3; ctx.stroke();
                ctx.fillStyle = XUONG_BONE; for (let k = 0; k < 4; k++){ ctx.beginPath(); ctx.moveTo(3.5 + k * 2.4, 0); ctx.lineTo(4.8 + k * 2.4, -2.6); ctx.lineTo(6.1 + k * 2.4, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); }
            }
            ctx.restore();
        }
// PLAYER_PART_END s6.xuongVeManh.1

// index.html:85737 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xuongVeLoiAt.1 EDITABLE
function xuongVeLoiAt(x, y, glow){
            ctx.save();
            let r = 15 * glow, g = ctx.createRadialGradient(x, y, 1, x, y, r);
            g.addColorStop(0, 'rgba(255,60,90,0.65)'); g.addColorStop(1, 'rgba(255,23,68,0)');
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x, y, 5.2, 0, Math.PI * 2); ctx.fillStyle = '#ff1744'; ctx.fill(); ctx.strokeStyle = '#5a0010'; ctx.lineWidth = 1.4; ctx.stroke();
            ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.arc(x - 1.6, y - 1.8, 1.4, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        }
// PLAYER_PART_END s6.xuongVeLoiAt.1

// index.html:85747 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xuongLoiVi.1 EDITABLE
function xuongLoiVi(t, bx, by){
            let hx = bx + 21, hy = by + 22, rise = Math.min(1, t / 30), tp = (t - 78) / 70, e = tp > 0 ? Math.min(1, tp / 0.9) : 0; e = e * e * (3 - 2 * e);
            return { x: hx, y: hy - 22 * rise * (1 - e) + Math.sin(t * 0.14) * 2 * (1 - e), glow: 0.7 + 0.3 * Math.sin(t * 0.2) + e * 0.8 };
        }
// PLAYER_PART_END s6.xuongLoiVi.1

// index.html:85752 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xuongChetParts.1 EDITABLE
function xuongChetParts(parts, bx, by, t){
            const g = 0.45, ground = by + 43, coreX = bx + 21;
            return parts.map((P, i) => {
                let vx = (xuongRnd(i, 1) - 0.5) * 8 + (P.cx - coreX) * 0.16, vy = -(2.5 + xuongRnd(i, 2) * 7.5);
                let x = P.cx, y = P.cy, ang = P.ang, spin = (xuongRnd(i, 3) - 0.5) * 0.5, rested = false, restAng = (xuongRnd(i, 4) - 0.5) * 1.5;
                for (let k = 0, n = Math.min(t, 70); k < n && !rested; k++){
                    x += vx; vy += g; y += vy; ang += spin; vx *= 0.985;
                    if (y >= ground - 2){
                        y = ground - 2 - xuongRnd(i, 5) * 2;
                        if (Math.abs(vy) > 3.2){ vy = -vy * 0.32; vx *= 0.7; spin *= 0.6; } else { rested = true; ang = restAng * 0.6 + ang * 0.4; }
                    }
                }
                let tp = (t - 78) / 70;
                if (tp > 0){
                    let e = Math.min(1, Math.max(0, (tp - i * 0.008) / 0.72)); e = e * e * (3 - 2 * e);
                    let lift = Math.sin(Math.PI * e) * (18 + xuongRnd(i, 6) * 26);
                    x += (P.cx - x) * e; y += (P.cy - y) * e - lift;
                    let da = ((P.ang - ang + Math.PI * 3) % (Math.PI * 2)) - Math.PI; ang += da * e;
                }
                return Object.assign({}, P, { cx: x, cy: y, ang });
            });
        }
// PLAYER_PART_END s6.xuongChetParts.1

// index.html:85785 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xuongVeLoi.1 EDITABLE
function xuongVeLoi(){                                                                                // goi tu drawDeathScene sau khi to trang
            if (!deathSkel || deathSkel.bx === undefined) return;
            let c = xuongLoiVi(deathCineFrame, deathSkel.bx, deathSkel.by);
            ctx.save();
            const m=deathSkel.drawMatrix;
            if(m)ctx.setTransform(m.a,m.b,m.c,m.d,m.e,m.f);
            xuongVeLoiAt(c.x, c.y, c.glow);
            ctx.restore();
        }
// PLAYER_PART_END s6.xuongVeLoi.1

// index.html:85794 · Phạm vi: global
// PLAYER_PART_BEGIN s6.xuongHoiSinh.1 EDITABLE
function xuongHoiSinh(){
            deathSkel = null; deathCineActive = false; deathReviveLevel = 0;
            dino.xuongDung = true; dino.maxHp = 2; dino.hp = 2; dino.invincible = true; dino.invTimer = 150; dino.dy = 0;
            floatingTexts.push(new FloatingText(dino.x - 28, dino.y - 34, "HỒI SINH! MÁU TỐI ĐA 2"));
            reviveOverlay = { level: 1, frame: 0, total: 34, shards: null };
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(260, 0.25, 'square', 0.2, 900);
        }
// PLAYER_PART_END s6.xuongHoiSinh.1

// index.html:87703 · Phạm vi: global
// PLAYER_PART_BEGIN s6.dangLuotHoacChop.1 EDITABLE
function dangLuotHoacChop(){
            if (typeof dashVx !== 'undefined' && Math.abs(dashVx) > 2) return true;
            return !!(typeof dino !== 'undefined' && dino && (dino._voidLuotDu || 0) > 0);
        }
// PLAYER_PART_END s6.dangLuotHoacChop.1
