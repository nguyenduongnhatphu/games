// PLAYER_FILE: VergilForm02
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, Player, SFX, VG_CONC_MAX, VG_FORM_IDX, VG_MIRAGE_MODES, VG_SDT_MAX, ammoPicker, ammoXem, apexWrap, battuMa, camX, camY, canvas, ctx, cusNCPicker, danteKey, danteTick, dino, doDash, dojoMode, dojoUltBusy, drawCustomMenu, drawSinVergil, drawUI, drawVergilBody, frames, gameOver, gameState, gameVictory, keys, paused, resetPreview, runePicker, runeXem, shakeTimer, ultCharge, v_markedValid, vergilActive, vergilForm, vergilInit, vergilLabel, vergilOn, vergilTick, vgAddConc, vgConcLevel, vgFireRangedMirage, vgPerformTrick, vgTriggerJCE, visualEffects, xDatForm, ymtCommand, ymtPose
// index.html:113731 · Phạm vi: global
// PLAYER_PART_BEGIN s18.IfStatement.2 EDITABLE
if (typeof danteKey === 'function') {
    const vgKeyBase = danteKey;
    danteKey = function(code, repeat) {
        if (code === 'KeyV' && !repeat && typeof gameState !== 'undefined' && gameState === 'custom_menu' && runePicker===null && !battuMa && !runeXem && !ammoPicker && !cusNCPicker && ammoXem===null) {
            xDatForm(vergilForm?9:VG_FORM_IDX);resetPreview();
            return true;
        }
        if (!vergilActive(dino)) return vgKeyBase(code, repeat);
        if (!dino.vergil) vergilInit(dino);
        const n = dino, v = n.vergil;

        if (!['KeyJ', 'KeyK', 'KeyQ', 'KeyE', 'KeyI', 'KeyO', 'KeyU', 'KeyL'].includes(code)) {
            return false;
        }
        keys[code] = true;
        if (paused || gameOver || gameVictory || repeat) return true;
        if (v.jce) return true;

        const isDown = !!(keys.KeyS || keys.ArrowDown);
        const isUp = !!(keys.KeyW || keys.ArrowUp);
        const isDash = frames - v.lastDash <= 20;

        // 1. Phím J: Nếu đang giữ O hoặc đang bật Mirage Stance -> Đánh chuỗi Song Kiếm Mirage Edge!
        if (code === 'KeyJ') {
            v.holdJ = 1;
            ymtCommand({ key: 'J', down: isDown, up: isUp, air: !n.grounded, dash: isDash, mirageForce: !!keys.KeyO });
            return true;
        }

        // 2. Phím K: Nếu đang giữ O hoặc đang bật Mirage Stance -> Đâm Deep Stinger / Round Trip!
        if (code === 'KeyK') {
            v.holdK=1;
            ymtCommand({ key: 'K', down: isDown, up: isUp, air: !n.grounded, dash: isDash, mirageForce: !!keys.KeyO });
            return true;
        }

        // 3. Phím Q / E: Đổi 4 đội hình Mirage Blades tầm xa cho phím I
        if (code === 'KeyQ' || code === 'KeyE') {
            v.mirageMode = (v.mirageMode + (code === 'KeyE' ? 1 : 3)) % 4;
            vergilLabel('I-MODE: ' + VG_MIRAGE_MODES[v.mirageMode].n);
            return true;
        }

        // 4. Phím I: CHUYÊN BẮN KIẾM ẢO ẢNH TẦM XA (Shooting / Spiral / Storm / Heavy Rain)
        if (code === 'KeyI') {
            v.holdI = 1;
            vgFireRangedMirage(n, v, v.mirageMode);
            return true;
        }

        // 5. Phím O: CHUYÊN BẬT/TẮT THẾ CẬN CHIẾN MIRAGE BLADE (Kết hợp cùng J hoặc K để múa Song Kiếm!)
        if (code === 'KeyO') {
            if (v.mirageStance > 0) {
                v.mirageStance = 0;
                vergilLabel('PURE YAMATO STANCE');
            } else {
                v.mirageStance = 360; // Duy trì thế Song Kiếm 6 giây (tự động gia hạn khi đánh J/K)
                vergilLabel('MIRAGE BLADE MELEE ON! (BẤM J / K)', '#00E5FF');
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1280, 0.06, 'sine', 0.10, 640);
            }
            return true;
        }

        // 6. Phím L: Đỡ đòn bằng vỏ kiếm Yamato
        if (code === 'KeyL') {
            if (frames >= v.guardReady) {
                v.attack = null; v.queue = [];
                v.guardUntil = frames + 28;
                v.perfectUntil = frames + 8;
                v.guardReady = frames + 52;
                n.shieldCd = 52;
                n.meleeTimer = 28;
                n.parryWindow = 8;
            }
            return true;
        }

        // 7. Phím U: Hóa SIN DEVIL TRIGGER + DOPPELGANGER / JUDGEMENT CUT END
        if (code === 'KeyU') {
            if (v.sdt > 0) {
                if (vgConcLevel(v) >= 1 || v.sdt >= 180) {
                    vgTriggerJCE(n, v);
                } else {
                    vergilLabel('NEED CONCENTRATION FOR JCE!');
                }
                return true;
            }
            if (typeof ultCharge !== 'undefined' && ultCharge >= 100) {
                ultCharge = 0;
                v.sdt = VG_SDT_MAX;
                v.conc = VG_CONC_MAX;
                const dir = n.isFacingLeft ? -1 : 1;
                v.dop = { x: n.x - dir * 82, y: n.y - 16, facingLeft: n.isFacingLeft, attack: null };
                v.dopHist = [];
                vergilLabel('SIN DEVIL TRIGGER & DOPPELGANGER!');
                if (typeof visualEffects !== 'undefined') {
                    visualEffects.push(new Effect(n.x + n.w / 2, n.y + n.h / 2, 'parry', false));
                }
                if (typeof shakeTimer !== 'undefined') shakeTimer = Math.max(shakeTimer, 20);
                if (typeof SFX !== 'undefined' && SFX.bossEntry) SFX.bossEntry();
            }
            return true;
        }

        return true;
    };
}
// PLAYER_PART_END s18.IfStatement.2

// index.html:113839 · Phạm vi: global
// PLAYER_PART_BEGIN s18.IfStatement.3 EDITABLE
if (typeof doDash === 'function') {
    const vgDashBase = doDash;
    doDash = function(...args) {
        if (!vergilActive(dino) || paused || gameOver || gameVictory) {
            return vgDashBase(...args);
        }
        const n = dino;
        if(!n.vergil)vergilInit(n);
        const v=n.vergil;
        if (v.jce) return;
        v.lastDash = frames;
        const isDown = !!(keys.KeyS || keys.ArrowDown);
        const isUp = !!(keys.KeyW || keys.ArrowUp || keys.Space);
        vgPerformTrick(n, v, isDown ? 'down' : (isUp ? 'up' : 'grim'));
    };
}
// PLAYER_PART_END s18.IfStatement.3

// index.html:113856 · Phạm vi: global
// PLAYER_PART_BEGIN s18.IfStatement.4 EDITABLE
if (typeof danteTick === 'function') {
    const vgTickWrap = danteTick;
    danteTick = function() {
        vgTickWrap();
        if (vergilActive(dino)) vergilTick();
    };
}
// PLAYER_PART_END s18.IfStatement.4

// index.html:113864 · Phạm vi: global
// PLAYER_PART_BEGIN s18.IfStatement.5 EDITABLE
if (typeof Player !== 'undefined') {
    const vgPlayerUpdateBase = Player.prototype.update;
    Player.prototype.update = function(...args) {
        if (!vergilActive(this) || this !== dino || !this.vergil) {
            return vgPlayerUpdateBase.apply(this, args);
        }
        const v = this.vergil, a = v.attack;
        if (v.airSlow > 0 && !this.grounded && (!a || a.id !== 'helm')) {
            this.dy = Math.min(this.dy, 0.55);
        }
        return vgPlayerUpdateBase.apply(this, args);
    };

    const vgShieldBase = Player.prototype.isShielding;
    Player.prototype.isShielding = function() {
        if (vergilActive(this) && this === dino && this.vergil) {
            return frames < this.vergil.guardUntil;
        }
        return vgShieldBase.call(this);
    };

    const vgTakeDamageBase = Player.prototype.takeDamage;
    Player.prototype.takeDamage = function(amount = 1, ...args) {
        if (vergilActive(this) && this === dino && this.vergil) {
            if(this.invincible || !(amount>0))return vgTakeDamageBase.call(this,amount,...args);
            const v = this.vergil;
            if (frames < v.guardUntil) {
                const perfect = frames < v.perfectUntil;
                vgAddConc(v, perfect ? 65 : 25);
                if (typeof visualEffects !== 'undefined') {
                    visualEffects.push(new Effect(this.x + this.w / 2, this.y + 24, 'parry', this.isFacingLeft));
                }
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(perfect ? 1650 : 950, 0.06, 'square', 0.12, 800);
                if (perfect) {
                    v.guardReady = frames;
                    this.shieldCd = 0;
                    v.justWindow = 16;
                    vergilLabel('PERFECT SHEATHE DEFLECT!');
                } else {
                    vergilLabel('YAMATO GUARD');
                }
                return 0;
            }
            const before=this.hp,result=vgTakeDamageBase.call(this,amount,...args);
            if(this.hp<before){vgAddConc(v,-55);v.attack=null;v.queue=[];v.holdJ=0;v.holdK=0;}
            return result;
        }
        return vgTakeDamageBase.call(this, amount, ...args);
    };
}
// PLAYER_PART_END s18.IfStatement.5

// index.html:113918 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgDrawKatana.1 EDITABLE
function vgDrawKatana(x, y, angle, len = 84, flat = 1, isSdt = false) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, flat);
    ctx.rotate(angle);

    ctx.fillStyle = '#ECEFF1';
    ctx.fillRect(-15, -2.2, 14, 4.4);
    ctx.fillStyle = '#263238';
    for (let k = 0; k < 3; k++) ctx.fillRect(-14 + k * 4.2, -2.2, 2, 4.4);
    ctx.fillStyle = '#FFD54F';
    ctx.fillRect(-2, -6.5, 3, 13);

    ctx.shadowColor = isSdt ? '#B388FF' : '#00E5FF';
    ctx.shadowBlur = isSdt ? 18 : 12;
    const grad = ctx.createLinearGradient(0, 0, len, 0);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.55, isSdt ? '#D1C4E9' : '#B3E5FC');
    grad.addColorStop(1, isSdt ? '#7C4DFF' : '#00E5FF');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(1, -2.5);
    ctx.quadraticCurveTo(len * 0.55, -4.5, len, -1.2);
    ctx.lineTo(len - 5, 2.5);
    ctx.quadraticCurveTo(len * 0.5, 0.8, 1, 2.2);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(2, -1.2);
    ctx.quadraticCurveTo(len * 0.55, -2.8, len - 2, -0.8);
    ctx.stroke();

    ctx.restore();
}
// PLAYER_PART_END s18.vgDrawKatana.1

// index.html:113957 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgDrawMirageEdgeBlade.1 EDITABLE
function vgDrawMirageEdgeBlade(x, y, angle, len = 80, flat = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, flat);
    ctx.rotate(angle);
    ctx.globalAlpha = 0.85;
    ctx.shadowColor = '#00E5FF';
    ctx.shadowBlur = 14;

    ctx.fillStyle = '#00E5FF';
    ctx.beginPath();
    ctx.moveTo(-10, -2.5);
    ctx.lineTo(4, -8);
    ctx.lineTo(len * 0.72, -5.5);
    ctx.lineTo(len, 0);
    ctx.lineTo(len * 0.72, 5.5);
    ctx.lineTo(4, 8);
    ctx.lineTo(-10, 2.5);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#E0F7FA';
    ctx.beginPath();
    ctx.moveTo(4, -2.2);
    ctx.lineTo(len - 6, 0);
    ctx.lineTo(4, 2.2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
// PLAYER_PART_END s18.vgDrawMirageEdgeBlade.1

// index.html:113988 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgDrawMirageSword.1 EDITABLE
function vgDrawMirageSword(s, col = '#40C4FF') {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.ang);
    ctx.shadowColor = col; ctx.shadowBlur = 10;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(19, 0); ctx.lineTo(3, -4.5); ctx.lineTo(-4, -2);
    ctx.lineTo(-10, -5); ctx.lineTo(-8, -1.5); ctx.lineTo(-15, 0);
    ctx.lineTo(-8, 1.5); ctx.lineTo(-10, 5); ctx.lineTo(-4, 2);
    ctx.lineTo(3, 4.5);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(16, 0); ctx.lineTo(2, -1.6); ctx.lineTo(-11, 0); ctx.lineTo(2, 1.6);
    ctx.closePath(); ctx.fill();
    ctx.restore();
}
// PLAYER_PART_END s18.vgDrawMirageSword.1

// index.html:114007 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vergilDraw.1 EDITABLE
function vergilDraw(n) {
    const v = n.vergil;
    if (!v) return;
    const cx = n.x + n.w / 2, cy = n.y + n.h / 2;
    const dir = n.isFacingLeft ? -1 : 1;
    const isSdt = v.sdt > 0;
    const lv = vgConcLevel(v);

    ctx.save();

    // 1. JUDGEMENT CUT END: Lớp phủ cực nhẹ (alpha 0.14) để luôn nhìn rõ hoàn toàn sân đấu & mục tiêu!
    if (v.jce) {
        const j = v.jce;
        ctx.save();
        ctx.fillStyle = j.age >= 88 ? 'rgba(225, 245, 254, 0.16)' : 'rgba(8, 14, 34, 0.14)';
        ctx.fillRect(camX, camY-20, canvas.width, canvas.height+40);
        for (const sl of j.slashes) {
            const k = sl.t / sl.max;
            ctx.globalAlpha = k * 0.72;
            ctx.strokeStyle = '#40C4FF'; ctx.lineWidth = 2.6 * k;
            ctx.beginPath(); ctx.moveTo(sl.x1, sl.y1); ctx.lineTo(sl.x2, sl.y2); ctx.stroke();
            ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1.1 * k;
            ctx.stroke();
        }
        ctx.restore();
    }

    // 2. VẾT NỨT KHÔNG GIAN VOID SLASH: Trong suốt (alpha nền 0.08, viền nét đứt mảnh) không che mục tiêu!
    for (const vz of v.voidZones) {
        const k = vz.t / vz.max;
        ctx.save();
        ctx.translate(vz.x, vz.y);
        ctx.globalAlpha = k * 0.45;
        ctx.fillStyle = 'rgba(0, 176, 255, 0.08)';
        ctx.beginPath(); ctx.ellipse(0, 0, vz.r * 0.85, vz.r * 0.58, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 1.6;
        ctx.setLineDash([6, 5]);
        ctx.beginPath(); ctx.ellipse(0, 0, vz.r * 0.85, vz.r * 0.58, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
    }

    // 3. Tàn Ảnh Dịch Chuyển
    for (const g of v.ghosts) {
        ctx.save();
        ctx.globalAlpha = (g.t / g.max) * 0.30;
        const gm = { facingLeft: g.left, stage: g.sdt ? 3 : 1, drawn: g.drawn, armR: g.armR, armL: g.armL, wing: v.body.wing, isDop: true };
        if (g.sdt && typeof drawSinVergil === 'function') drawSinVergil(gm, g.x - 13, g.y - 28);
        else if (typeof drawVergilBody === 'function') drawVergilBody(gm, g.x, g.y);
        ctx.restore();
    }

    // 4. PHÂN THÂN DOPPELGANGER: Đứng tách xa hẳn khỏi người chơi + độ trong suốt 0.46 thanh thoát
    if (v.dop && (!v.jce || v.jce.age < 20 || v.jce.age >= 88)) {
        ctx.save();
        ctx.globalAlpha = 0.46;
        const dm = {
            facingLeft: v.dop.facingLeft, stage: 3,
            drawn: !!v.dop.attack,
            armR: v.dop.attack ? Math.sin(v.dop.attack.age * 0.4) * 1.5 : 0,
            armL: 0, wing: v.body.wing, isDop: true
        };
        if (typeof drawVergilBody === 'function') drawVergilBody(dm, v.dop.x, v.dop.y);
        ctx.restore();
    }

    // 5. Vẽ Cơ Thể VERGIL + Thanh Katana Yamato + Thanh Mirage Edge (nếu bật O)
    if (!v.jce || v.jce.age < 20 || v.jce.age >= 88) {
        if (lv >= 2) {
            ctx.save();
            ctx.globalAlpha = 0.22 + 0.10 * Math.sin(frames * 0.15);
            const cg = ctx.createRadialGradient(cx, n.y + n.h - 4, 4, cx, n.y + n.h - 4, 42);
            cg.addColorStop(0, '#00E5FF');
            cg.addColorStop(1, 'rgba(0, 229, 255, 0)');
            ctx.fillStyle = cg;
            ctx.beginPath(); ctx.ellipse(cx, n.y + n.h - 4, 42, 10, 0, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        }

        const pose = ymtPose(n, v, v.attack, v.attack ? v.attack.age : 0);

        // Nếu đang bật Mirage Blade Stance (Phím O) -> Vẽ thanh Mirage Edge xanh ngọc bên tay trái
        if (pose.mirageBlade && !v.roundSword) {
            ctx.save();
            ctx.translate(pose.mx, pose.my);
            ctx.scale(pose.dir, 1);
            vgDrawMirageEdgeBlade(0, 0, pose.mAngle, pose.len * 0.94, pose.flat);
            ctx.restore();
        }

        ctx.save();
        if (n.invincible && frames % 6 < 3 && !v.jce) ctx.globalAlpha = 0.55;
        if (isSdt && typeof drawSinVergil === 'function') {
            drawSinVergil({ ...v.body, drawn: false }, n.x - 13, n.y - 28);
        } else if (typeof drawVergilBody === 'function') {
            drawVergilBody({ ...v.body, drawn: false }, n.x, n.y);
        }
        ctx.restore();

        if (pose.drawn) {
            ctx.save();
            ctx.translate(pose.x, pose.y);
            ctx.scale(pose.dir, 1);
            vgDrawKatana(0, 0, pose.angle, pose.len, pose.flat, isSdt);
            ctx.restore();
        }

        if (v.sheatheSpark > 0 || v.justWindow > 0 || (v.holdJ >= 24 && v.holdJ <= 38)) {
            const sx = pose.sayaX, sy = pose.sayaY - 6;
            const pulse = v.justWindow > 0 ? 1.25 : 1.0;
            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(frames * 0.25);
            ctx.shadowColor = '#00E5FF'; ctx.shadowBlur = 16;
            ctx.fillStyle = '#00E5FF';
            for (let k = 0; k < 2; k++) {
                ctx.rotate(Math.PI / 2);
                ctx.beginPath();
                ctx.moveTo(-16 * pulse, 0); ctx.lineTo(0, -3.2 * pulse);
                ctx.lineTo(16 * pulse, 0);  ctx.lineTo(0, 3.2 * pulse);
                ctx.closePath(); ctx.fill();
            }
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath(); ctx.arc(0, 0, 4 * pulse, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        }
    }

    // 6. Vẽ Dải Lụa Kiếm Khí Yamato & Mirage Edge (Trong suốt thanh mảnh)
    for (let i = 1; i < v.slashTrail.length; i++) {
        const u = v.slashTrail[i - 1], w = v.slashTrail[i];
        const alpha = (w.t / w.max) * 0.36;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#00B0FF';
        ctx.beginPath();
        ctx.moveTo(u.x + (u.tx - u.x) * 0.45, u.y + (u.ty - u.y) * 0.45);
        ctx.lineTo(u.tx, u.ty); ctx.lineTo(w.tx, w.ty);
        ctx.lineTo(w.x + (w.tx - w.x) * 0.45, w.y + (w.ty - w.y) * 0.45);
        ctx.closePath(); ctx.fill();

        ctx.globalAlpha = alpha * 1.5;
        ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2.0;
        ctx.beginPath(); ctx.moveTo(u.tx, u.ty); ctx.lineTo(w.tx, w.ty); ctx.stroke();
    }
    for (let i = 1; i < v.mirageTrail.length; i++) {
        const u = v.mirageTrail[i - 1], w = v.mirageTrail[i];
        const alpha = (w.t / w.max) * 0.34;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#00E5FF';
        ctx.beginPath();
        ctx.moveTo(u.x + (u.tx - u.x) * 0.45, u.y + (u.ty - u.y) * 0.45);
        ctx.lineTo(u.tx, u.ty); ctx.lineTo(w.tx, w.ty);
        ctx.lineTo(w.x + (w.tx - w.x) * 0.45, w.y + (w.ty - w.y) * 0.45);
        ctx.closePath(); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 7. Vẽ Đại Kiếm Xoay MIRAGE EDGE ROUND TRIP (O + S + K)
    if (v.roundSword) {
        const rs = v.roundSword;
        ctx.save();
        ctx.translate(rs.x, rs.y);
        ctx.globalAlpha = 0.45;
        ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(0, 0, 42, rs.t * 0.45, rs.t * 0.45 + 4.2); ctx.stroke();
        vgDrawMirageEdgeBlade(0, 0, rs.t * 0.55, 64, 1);
        ctx.restore();
    }

    // 8. QUẢ CẦU KHÔNG GIAN JUDGEMENT CUT: Làm trong suốt (alpha nền chỉ 0.06, nét cắt thanh mảnh) để nhìn rõ Boss bên trong!
    for (const c of v.cuts) {
        ctx.save();
        if (c.t > 0) {
            const k = 1 - c.t / c.warn;
            ctx.globalAlpha = 0.25 + 0.35 * k;
            ctx.strokeStyle = '#00E5FF';
            ctx.lineWidth = 1.8;
            ctx.setLineDash([5, 5]);
            ctx.beginPath(); ctx.arc(c.x, c.y, c.r * (1.2 - 0.2 * k), 0, Math.PI * 2); ctx.stroke();
            ctx.setLineDash([]);
        } else {
            const k = c.boom / c.maxBoom;
            ctx.globalAlpha = k * 0.78;
            // Nền quả cầu cực kỳ trong suốt (0.06) để không che mục tiêu
            ctx.fillStyle = 'rgba(0, 176, 255, 0.06)';
            ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill();
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI + c.boom * 0.22;
                const R = c.r * (1.12 - 0.1 * k);
                ctx.strokeStyle = i % 2 === 0 ? '#FFFFFF' : '#80D8FF';
                ctx.lineWidth = i % 2 === 0 ? 1.8 * k : 2.8 * k;
                ctx.beginPath();
                ctx.moveTo(c.x - Math.cos(a) * R, c.y - Math.sin(a) * R);
                ctx.lineTo(c.x + Math.cos(a) * R, c.y + Math.sin(a) * R);
                ctx.stroke();
            }
            ctx.strokeStyle = '#80D8FF'; ctx.lineWidth = 1.6 * k;
            ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.restore();
    }

    // 9. Vẽ các thanh MIRAGE BLADES tầm xa (Phím I)
    for (const s of v.swords) {
        vgDrawMirageSword(s, '#40C4FF');
    }
    if (v_markedValid(v)) {
        const mt = v.markedTarget;
        const mx = mt.x + (mt.w || 40) / 2, my = mt.y + (mt.h || 50) / 2;
        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(frames * 0.08);
        ctx.globalAlpha = 0.55;
        ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
    }

    if (frames < v.guardUntil) {
        ctx.save();
        ctx.strokeStyle = frames < v.perfectUntil ? '#00E5FF' : '#90CAF9';
        ctx.fillStyle = 'rgba(0, 229, 255, 0.10)';
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.ellipse(cx + dir * 10, cy, n.w * 0.72, n.h * 0.60, 0, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        ctx.restore();
    }

    for (const sp of v.sparks) {
        const k = sp.t / sp.max;
        ctx.save();
        ctx.globalAlpha = k * 0.8;
        ctx.translate(sp.x, sp.y);
        ctx.rotate(sp.ang);
        ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 2.2 * k;
        ctx.beginPath(); ctx.moveTo(-sp.len / 2, 0); ctx.lineTo(sp.len / 2, 0); ctx.stroke();
        ctx.restore();
    }

    ctx.restore();
}
// PLAYER_PART_END s18.vergilDraw.1

// index.html:114249 · Phạm vi: global
// PLAYER_PART_BEGIN s18.IfStatement.6 EDITABLE
if (typeof Player !== 'undefined') {
    const vgDrawWrap = Player.prototype.draw;
    Player.prototype.draw = function(...args) {
        if (vergilOn() && this === dino && this.vergil) {
            vergilDraw(this);
            return;
        }
        return vgDrawWrap.apply(this, args);
    };
}
// PLAYER_PART_END s18.IfStatement.6

// index.html:114263 · Phạm vi: global
// PLAYER_PART_BEGIN s18.IfStatement.7 EDITABLE
if (typeof drawUI === 'function') {
    const vgUIBase = drawUI;
    drawUI = function() {
        vgUIBase();
        if (!vergilOn() || !dino || !dino.vergil) return;
        const v = dino.vergil;
        const lv = vgConcLevel(v);
        const modeInfo = VG_MIRAGE_MODES[v.mirageMode];

        ctx.save();
        if (typeof dojoMode !== 'undefined' && dojoMode) ctx.translate(0, 15);

        ctx.fillStyle = '#0B1326';
        ctx.fillRect(10, 45, 298, 156);
        ctx.strokeStyle = v.mirageStance > 0 ? '#00E5FF' : (lv >= 2 ? '#40C4FF' : '#29B6F6');
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 45, 298, 156);

        ctx.textAlign = 'left';
        ctx.font = 'bold 13px Consolas, monospace';
        ctx.fillStyle = v.sdt > 0 ? '#80D8FF' : '#40C4FF';
        ctx.fillText(v.sdt > 0 ? 'VERGIL · SIN DEVIL TRIGGER' : (v.mirageStance > 0 ? 'VERGIL · YAMATO + MIRAGE EDGE' : 'VERGIL · PURE YAMATO'), 20, 64);

        ctx.font = '11px Consolas, monospace';
        ctx.fillStyle = '#E1F5FE';
        ctx.fillText('I: ' + modeInfo.n + ' · O: ' + (v.mirageStance > 0 ? 'ON' : 'OFF'), 20, 82);
        ctx.fillStyle = v.justWindow > 0 ? '#00E5FF' : '#B3E5FC';
        ctx.fillText(
            v.jce ? '>>> JUDGEMENT CUT END! <<<' :
            v.justWindow > 0 ? '★ BẤM J NGAY: PERFECT JUDGEMENT CUT! ★' :
            v.attack ? v.attack.name :
            (v.mirageStance > 0 ? 'O+J: SONG KIẾM · O+K: DEEP STINGER' : 'J: YAMATO · GIỮ/NHẢ J: JUDGEMENT CUT'),
            20, 100
        );

        ctx.fillStyle = '#90CAF9';
        ctx.fillText('CONCENTRATION LV.' + lv + (lv >= 2 ? ' (MAX · JCE READY)' : ''), 20, 118);
        for (let k = 0; k < 3; k++) {
            const bx = 20 + k * 90;
            const fill = Math.max(0, Math.min(1, (v.conc - k * 100) / 100));
            ctx.fillStyle = '#162440';
            ctx.fillRect(bx, 123, 84, 7);
            ctx.fillStyle = lv >= 2 ? (frames % 12 < 6 ? '#FFFFFF' : '#00E5FF') : '#29B6F6';
            ctx.fillRect(bx, 123, 84 * fill, 7);
        }

        ctx.fillStyle = '#1A1438';
        ctx.fillRect(20, 148, 264, 8);
        ctx.fillStyle = v.sdt > 0 ? '#80D8FF' : '#00B0FF';
        const ultRatio = v.sdt > 0 ? (v.sdt / VG_SDT_MAX) : (Math.min(100, typeof ultCharge !== 'undefined' ? ultCharge : 0) / 100);
        ctx.fillRect(20, 148, 264 * ultRatio, 8);

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(
            v.sdt > 0 ? ('SDT & DOPPELGANGER: ' + (v.sdt / 60).toFixed(1) + 's · BẤM U: JCE!') :
            ('U: SIN DEVIL TRIGGER ' + Math.floor(typeof ultCharge !== 'undefined' ? ultCharge : 0) + '%'),
            20, 143
        );
        ctx.fillText('HP ' + Math.ceil(dino.hp) + '/' + dino.maxHp + ' · SHIFT: TRICK · Q/E: MODE', 20, 172);
        ctx.fillStyle = '#80D8FF';
        ctx.fillText('I: BẮN XA · O + J/K: SONG KIẾM', 20, 189);
        ctx.restore();
    };
}
// PLAYER_PART_END s18.IfStatement.7

// index.html:114328 · Phạm vi: global
// PLAYER_PART_BEGIN s18.IfStatement.8 EDITABLE
if (typeof drawCustomMenu === 'function') {
    const vgMenuBase = drawCustomMenu;
    drawCustomMenu = function() {
        vgMenuBase();
        if(runePicker!==null||battuMa||runeXem||ammoPicker||cusNCPicker||ammoXem!==null)return;
        ctx.save();
        ctx.fillStyle = vergilOn() ? '#00E5FF' : '#90CAF9';
        ctx.font = 'bold 11px Consolas, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('[V] DANTE / VERGIL', canvas.width / 2, 506);
        ctx.restore();

        if (!vergilOn()) return;
        ctx.save();
        ctx.fillStyle = '#091122';
        ctx.fillRect(24, 76, 276, 452);
        ctx.fillRect(702, 80, 272, 436);
        ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 2;
        ctx.strokeRect(24, 76, 276, 452);
        ctx.strokeRect(702, 80, 272, 436);

        ctx.textAlign = 'left';
        ctx.fillStyle = '#40C4FF';
        ctx.font = 'bold 21px Consolas, monospace';
        ctx.fillText('VERGIL · 10 HP', 38, 108);
        ctx.fillText('YAMATO & MIRAGE', 716, 111);

        ctx.font = '11px Consolas, monospace';
        ctx.fillStyle = '#E1F5FE';
        if (typeof apexWrap === 'function') {
            apexWrap(
                'PHÂN TÁCH RÕ PHÍM I (BẮN XA) & O (CẬN CHIẾN)\n\n' +
                '• PHÍM I (MIRAGE BLADES TẦM XA):\n' +
                'Bấm Q / E để đổi 4 chế độ kiếm:\n' +
                'Shooting / Spiral / Storm / Heavy Rain.\n' +
                'Bấm I để bắn độc lập không ngắt đòn!\n\n' +
                '• PHÍM O (MIRAGE EDGE CẬN CHIẾN):\n' +
                'Bấm O để triệu hồi thanh Mirage Edge\n' +
                'cầm tay trái kết hợp cùng J hoặc K:\n' +
                '  + O → J-J-J: Song Kiếm Combo B\n' +
                '  + O → K: Deep Stinger (Khoan kép)\n' +
                '  + O → S+K: Ném kiếm xoay Round Trip\n' +
                '  + O → S+J: Hất tung Spiral Launch\n\n' +
                '• CHỐNG SPAM KHỐNG CHẾ (2 GIÂY):\n' +
                'Cùng 1 chiêu khống chế bị khóa 2s,\n' +
                'kết hợp bắn xa & đổi chiêu linh hoạt!',
                38, 140, 248, 16
            );
            apexWrap(
                'BỘ CHIÊU THỨC KATANA YAMATO\n\n' +
                '• J-J-J-J: Yamato Combo A\n' +
                '• J-J → (đợi nhịp) → J liên tục:\n' +
                '  YAMATO COMBO C (Chém bão táp)\n' +
                '• S + J (2 lần): Upper Slash I & II\n' +
                '• Trên không J-J-J: Aerial Rave A/B\n\n' +
                '• GIỮ J rồi NHẢ ĐÚNG NHỊP LÓE SÁNG:\n' +
                '  PERFECT JUDGEMENT CUT!\n\n' +
                '• K: Rapid Slash (lướt xuyên qua)\n' +
                '• Giữ K / W+K: Rising Star\n' +
                '• S + K: Void Slash (hút & làm chậm)\n' +
                '• Trên không K: Helm Breaker\n' +
                '• U: SDT + Doppelganger (đứng tách xa)\n' +
                '• U lần 2: JUDGEMENT CUT END!',
                716, 140, 248, 16
            );
        }
        ctx.restore();
    };
}
// PLAYER_PART_END s18.IfStatement.8

// index.html:114398 · Phạm vi: global
// PLAYER_PART_BEGIN s18.vgUltBusyBase.1 EDITABLE
const vgUltBusyBase=dojoUltBusy;
// PLAYER_PART_END s18.vgUltBusyBase.1

// index.html:114399 · Phạm vi: global
// PLAYER_PART_BEGIN s18.dojoUltBusy.1 EDITABLE
dojoUltBusy=function(n){return !!(vergilOn()&&n===dino&&n.vergil&&(n.vergil.sdt>0||n.vergil.jce))||vgUltBusyBase(n);};
// PLAYER_PART_END s18.dojoUltBusy.1

// index.html:114401 · Phạm vi: global
// PLAYER_PART_BEGIN s18.IfStatement.9 EDITABLE
if(vergilForm)xDatForm(VG_FORM_IDX);
// PLAYER_PART_END s18.IfStatement.9
