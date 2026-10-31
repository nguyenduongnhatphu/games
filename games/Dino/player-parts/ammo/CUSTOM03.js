// PLAYER_FILE: CUSTOM03
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CRYO_TANG, CUS_DAN, CUS_HE_TANG, CUS_LZ_CAO, CUS_LZ_DMG, CUS_TOA_SO, CUS_TT_ROI, Effect, FloatingText, LT, PVP_HS, SFX, allTargets, bosses, canvas, checkAABB, cryoCong, cryoDangBang, ctx, currentAmmoType, currentForm, cusBangMoc, cusCapCua, cusDotNhip, cusDotSo, cusKXCong, cusKXMoc, cusNoDat, cusPvpDanh, cusTTRoi, cusToaNo, dashVx, dealDamage, dino, dino2, doChieuThu, enemies, floatingTexts, frames, gameState, gdVaCham, novaCo, obstacles, pvpDich, shakeTimer, uniKim, venKhoa, visualEffects, worldL, worldR
// index.html:64394 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusMauMax.1 EDITABLE
function cusMauMax(o){
            let m = o.maxHp || o.hpMax || o.maxHP || 0;
            if (!m){ if (!o._cusMau0 || o.hp > o._cusMau0) o._cusMau0 = o.hp; m = o._cusMau0; }
            return m;
        }
// PLAYER_PART_END s4.cusMauMax.1

// index.html:64400 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTangPT.1 EDITABLE
function cusTangPT(o, d){
            if (!o || o.hp === undefined || o.hp <= 0 || !(d > 0)) return d;
            let kc = cusCapCua('khaicuoc') > 0, tn = cusCapCua('tamnhan') > 0;
            if (!kc && !tn) return d;
            let r = o.hp / Math.max(1, cusMauMax(o)), k = 0;
            if (kc && r > 0.6) k += CUS_HE_TANG;
            if (tn && r < 0.5) k += CUS_HE_TANG;
            if (!k) return d;
            o._cusPhan = (o._cusPhan || 0) + d * k;
            let them = Math.floor(o._cusPhan + 1e-9); o._cusPhan -= them;
            if (them > 0 && Math.random() < 0.5)
                floatingTexts.push(new FloatingText(o.x + (o.w||20) / 2 - 8, o.y - 8, (r > 0.6 ? "◆" : "◉") + "+" + them));
            return d + them;
        }
// PLAYER_PART_END s4.cusTangPT.1

// index.html:64415 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_ST_PAL.1 EDITABLE
const CUS_ST_PAL = { bd:"#B8BEE8", hd:"#CDD2F5", dk:"#6A6FA8", lt:"#FFFFFF", foot:"#5A5E96", spk:"#E1BEE7",
                             out:"#3B2F6B", rim:"#F3E5F5", eye:"#FFFFFF", pup:"#7C4DFF", aura:null, crest:0 };
// PLAYER_PART_END s4.CUS_ST_PAL.1

// index.html:64417 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusStand.1 EDITABLE
let cusStand = { x: null, y: null, cd: 0, sang: 0, don: [], tich: 0 };
// PLAYER_PART_END s4.cusStand.1

// index.html:64418 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusStandBat.1 EDITABLE
function cusStandBat(){ return cusCapCua('stand') > 0; }
// PLAYER_PART_END s4.cusStandBat.1

// index.html:64419 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusStandTiLe.1 EDITABLE
function cusStandTiLe(D){ let d = Math.max(1, Math.min(200, D)); return 0.05 + 0.55 * (d - 1) / 199; }
// PLAYER_PART_END s4.cusStandTiLe.1

// index.html:64420 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusStandMieng.1 EDITABLE
function cusStandMieng(){
            let ng = dino, dir = ng.isFacingLeft ? -1 : 1;
            return { x: cusStand.x + ng.w / 2 + dir * ng.w * 0.45, y: cusStand.y + ng.h * 0.35, dir: dir };
        }
// PLAYER_PART_END s4.cusStandMieng.1

// index.html:64425 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusStandThu.1 EDITABLE
function cusStandThu(o, D, kieu, owner, xtra){
            if (!cusStandBat() || gameState === 'pvp' || !o || !(D > 0)) return;
            if (owner !== undefined && owner !== 1) return;
            if (typeof dino === 'undefined' || !dino || cusStand.x === null) return;
            if (cusStand.cd > 0) return;
            // CAP 2 — CONG DON: ti le cua don hut duoc cong vao don ke tiep, ra tay thi ve 0
            let p = cusStandTiLe(D), cd2 = cusCapCua('stand') >= 2;
            if (cd2) p += cusStand.tich || 0;
            if (Math.random() >= p){ if (cd2) cusStand.tich = p; return; }
            cusStand.tich = 0;
            cusStand.cd = 10; cusStand.sang = 16;
            let m = cusStandMieng();
            cusStand.don.push({ o: o, D: Math.round(D), kieu: kieu, t: 0, x: m.x, y: m.y, x0: m.x, y0: m.y,
                                w: (xtra && xtra.w) || 16, h: (xtra && xtra.h) || 8, xong: false });
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880, 0.06, 'triangle', 0.10, 1320);
        }
// PLAYER_PART_END s4.cusStandThu.1

// index.html:64441 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusStandDanh.1 EDITABLE
function cusStandDanh(S){
            if (S.xong) return; S.xong = true;
            let o = S.o;
            if (!o || o.hp === undefined || o.hp <= 0 || o.invulnAll) return;
            if (typeof dealDamage === 'function') dealDamage(o, S.D, 'ammo'); else o.hp -= S.D;
            // COMBO STAND + RAILGUN: tia rail cua Stand XUYEN — ai nam tren duong bay cung an nua sat thuong.
            if (S.kieu === 'rail' && gameState !== 'pvp' && typeof allTargets === 'function'){
                let ox = o.x + (o.w||20) / 2, oy = o.y + (o.h||20) / 2, x1 = S.x0, y1 = S.y0, d2 = Math.max(1, Math.round(S.D / 2));
                for (let e of allTargets()){
                    if (!e || e === o || e.invulnAll || e.hp === undefined || e.hp <= 0) continue;
                    let ex = e.x + (e.w||20) / 2, ey = e.y + (e.h||20) / 2;
                    let vx = ox - x1, vy = oy - y1, L2 = vx * vx + vy * vy || 1;
                    let u = Math.max(0, Math.min(1, ((ex - x1) * vx + (ey - y1) * vy) / L2));
                    let px = x1 + vx * u - ex, py = y1 + vy * u - ey;
                    if (px * px + py * py > Math.pow(30 + Math.max(e.w||20, e.h||20) / 2, 2)) continue;
                    if (typeof dealDamage === 'function') dealDamage(e, d2, 'ammo'); else e.hp -= d2;
                    visualEffects.push(new Effect(ex, ey, 'lightning_shock', true, 20));
                }
            }
            visualEffects.push(new Effect(o.x + (o.w||20) / 2, o.y + (o.h||20) / 2, 'explosion', true, 14 + Math.min(30, S.D / 3)));
            floatingTexts.push(new FloatingText(o.x + (o.w||20) / 2 - 10, o.y - 22, "ORA! " + S.D));
        }
// PLAYER_PART_END s4.cusStandDanh.1

// index.html:64463 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusStandTick.1 EDITABLE
function cusStandTick(){
            if (typeof dino === 'undefined' || !dino || !cusStandBat() || currentAmmoType !== CUS_DAN){
                cusStand.x = null; cusStand.don.length = 0; return;
            }
            let dir = dino.isFacingLeft ? -1 : 1;
            let tx = dino.x - dir * 38, ty = dino.y - 44 + Math.sin(frames * 0.06) * 5;
            if (cusStand.x === null){ cusStand.x = tx; cusStand.y = ty; }
            cusStand.x += (tx - cusStand.x) * 0.12; cusStand.y += (ty - cusStand.y) * 0.12;
            if (cusStand.cd > 0) cusStand.cd--;
            if (cusStand.sang > 0) cusStand.sang--;
            for (let i = cusStand.don.length - 1; i >= 0; i--){
                let S = cusStand.don[i]; S.t++;
                let o = S.o, ox = o.x + (o.w||20) / 2, oy = o.y + (o.h||20) / 2;
                if (S.kieu === 'dan' || S.kieu === 'sao'){
                    if (!S.xong){
                        let dx = ox - S.x, dy = oy - S.y, d = Math.hypot(dx, dy) || 1, v = 22;
                        if (d <= v + 8 || o.hp <= 0){ cusStandDanh(S); S.tat = 0; }
                        else { S.x += dx / d * v; S.y += dy / d * v; }
                        S.goc = Math.atan2(dy, dx);
                    } else if (++S.tat > 8) cusStand.don.splice(i, 1);
                } else if (S.kieu === 'rail'){
                    if (!S.xong){
                        let dx = ox - S.x, dy = oy - S.y, d = Math.hypot(dx, dy) || 1, v = 70;
                        S.goc = Math.atan2(dy, dx);
                        if (d <= v){ S.x = ox; S.y = oy; cusStandDanh(S); S.tat = 0; }
                        else { S.x += dx / d * v; S.y += dy / d * v; }
                    } else if (++S.tat > 24) cusStand.don.splice(i, 1);
                } else {   // 'laser' / 'cua': tuc thi
                    if (!S.xong){ S.x = ox; S.y = oy; S.goc = Math.atan2(oy - S.y0, ox - S.x0); cusStandDanh(S); }
                    if (S.t > 16) cusStand.don.splice(i, 1);
                }
            }
        }
// PLAYER_PART_END s4.cusStandTick.1

// index.html:64496 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusStandVe.1 EDITABLE
function cusStandVe(){
            if (cusStand.x === null || typeof dino === 'undefined' || !dino) return;
            ctx.save();
            // hao quang tim bac
            let cx = cusStand.x + dino.w / 2, cy = cusStand.y + dino.h / 2;
            let g = ctx.createRadialGradient(cx, cy, 4, cx, cy, 46);
            g.addColorStop(0, "rgba(206,147,216," + (0.20 + cusStand.sang * 0.02) + ")"); g.addColorStop(1, "rgba(124,77,255,0)");
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 46, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 0.34 + cusStand.sang * 0.025;
            if (typeof dino.drawForm === 'function') dino.drawForm(false, cusStand.x + (cusStand.sang > 0 ? (dino.isFacingLeft ? -6 : 6) : 0), cusStand.y, 0, currentForm, dino.isFacingLeft, CUS_ST_PAL);
            ctx.globalAlpha = 1;
            // don danh
            for (let S of cusStand.don){
                if (S.kieu === 'dan' || S.kieu === 'sao'){
                    let a = S.xong ? Math.max(0, 1 - (S.tat || 0) / 8) : 1;
                    ctx.save(); ctx.translate(S.x, S.y); ctx.rotate(S.goc || 0); ctx.globalAlpha = a;
                    ctx.strokeStyle = "rgba(179,157,219,0.5)"; ctx.lineWidth = Math.max(3, S.h * 0.7);
                    ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(0, 0); ctx.stroke();
                    ctx.fillStyle = "#EDE7F6"; ctx.strokeStyle = "#7C4DFF"; ctx.lineWidth = 2;
                    if (S.kieu === 'sao'){
                        ctx.beginPath(); for (let k = 0; k < 10; k++){ let r = k % 2 ? 4 : 9, q = k * Math.PI / 5; ctx.lineTo(Math.cos(q) * r, Math.sin(q) * r); }
                        ctx.closePath(); ctx.fill(); ctx.stroke();
                    } else { ctx.beginPath(); ctx.ellipse(0, 0, Math.max(6, S.w / 2), Math.max(3, S.h / 2), 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); }
                    ctx.restore();
                } else if (S.kieu === 'laser'){
                    let a = Math.max(0, 1 - S.t / 16);
                    ctx.strokeStyle = "rgba(237,231,246," + a + ")"; ctx.lineWidth = 3 + 6 * a;
                    ctx.beginPath(); ctx.moveTo(S.x0, S.y0); ctx.lineTo(S.x, S.y); ctx.stroke();
                    ctx.strokeStyle = "rgba(124,77,255," + (0.6 * a) + ")"; ctx.lineWidth = 14 * a + 2;
                    ctx.globalAlpha = 0.4; ctx.beginPath(); ctx.moveTo(S.x0, S.y0); ctx.lineTo(S.x, S.y); ctx.stroke(); ctx.globalAlpha = 1;
                } else if (S.kieu === 'rail'){
                    let a = S.xong ? Math.max(0, 1 - (S.tat || 0) / 24) : 1;
                    let L = Math.hypot(S.x - S.x0, S.y - S.y0); if (L < 2) continue;
                    ctx.save(); ctx.translate(S.x0, S.y0); ctx.rotate(S.goc || 0);
                    let H = 10 + Math.min(40, S.D / 5);
                    const lop = (ti, mau) => { ctx.fillStyle = mau; ctx.beginPath(); ctx.moveTo(0, 0);
                        for (let i = 1; i <= 12; i++){ let u = i / 12; ctx.lineTo(L * u, -H * ti * Math.sqrt(u)); }
                        for (let i = 12; i >= 1; i--){ let u = i / 12; ctx.lineTo(L * u, H * ti * Math.sqrt(u)); }
                        ctx.closePath(); ctx.fill(); };
                    lop(1, "rgba(209,196,233," + (0.35 * a) + ")"); lop(0.5, "rgba(124,77,255," + (0.75 * a) + ")"); lop(0.15, "rgba(255,255,255," + a + ")");
                    if (!S.xong){ ctx.fillStyle = "#FFB300"; ctx.beginPath(); ctx.ellipse(L, 0, 4, 8, 0, 0, Math.PI * 2); ctx.fill(); }
                    ctx.restore();
                } else {   // 'cua' — ba nhat chem ma
                    let a = Math.max(0, 1 - S.t / 16);
                    ctx.strokeStyle = "rgba(237,231,246," + a + ")"; ctx.lineWidth = 3;
                    for (let k = -1; k <= 1; k++){
                        ctx.beginPath(); ctx.arc(S.x + k * 10, S.y, 18 + S.t * 1.5, -1.1 + k * 0.3, 1.1 + k * 0.3); ctx.stroke();
                    }
                }
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cusStandVe.1

// index.html:64550 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusHieuUng.1 EDITABLE
function cusHieuUng(o, base){
            if (!o || o.hp === undefined || o.hp <= 0) return 0;
            let bonus = 0;
            // ---- KHUC XA: bung no MOT LAN roi tich lai tu dau, khong cong vinh vien ----
            let kx = cusCapCua('khucxa');
            if (kx > 0){
                let moc = cusKXMoc();
                o._cusKX = (o._cusKX || 0) + 1;
                if (o._cusKX >= moc){
                    o._cusKX = 0;
                    bonus += cusKXCong();
                    visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 18));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1250, 0.07, 'triangle', 0.15, 1900);
                }
            }
            // ---- BANG: du stack thi dong bang. Dung thang he bang cua CRYO nen phan con
            //      lai cua game (mien nhiem 3 giay, hieu ung hinh, cac doi chieu bang) deu
            //      hieu — khong dung mot trang thai bang thu hai chay song song.
            let bg = cusCapCua('bang');
            if (bg > 0){
                if (bg >= 3 && typeof cryoDangBang === 'function' && cryoDangBang(o)) bonus += base;   // cap 3: don ke tiep x2
                o._cusB = (o._cusB || 0) + 1;
                if (o._cusB >= cusBangMoc()){
                    o._cusB = 0;
                    if (typeof cryoCong === 'function' && typeof CRYO_TANG !== 'undefined') cryoCong(o, CRYO_TANG);
                }
            }
            // ---- TIEP TRO: moi PHAT BAN trung co ti le lam roi mot hom dan ----
            let tt = cusCapCua('supply');
            if (tt > 0 && gameState !== 'pvp' && Math.random() < CUS_TT_ROI[tt])
                cusTTRoi(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 0);
            /* ---- DOT: KHONG cong don — moi phat trung LAM MOI lai vet dot ----
               @@HE-CUSDOT — lam moi gio chi phuc hoi SO NHIP con lai; dong ho toi nhip ke
               tiep va bo dem `giu` deu chay tiep.
               GHI CHU TRUNG THUC: toi doi cho nay vi tuong ban cu (tao MOT OBJECT MOI moi
               phat trung, tuc dat lai ca `t`) dang day lui nhip dot moi khi ban lien tuc, va
               do la ly do DOT chi ra 3.70 dmg/giay. DO LAI THI KHONG PHAI: ban chi sua cho
               nay ma khong gap doi van ra DUNG 3.70. Vay nen doan tren la mot gia thuyet
               SAI, khong phai mot loi da sua.
               Van giu thay doi nay vi mot ly do khac va la ly do that: ban cu tao object moi
               moi phat trung nen bo dem `giu` bi xoa sach 6 lan moi giay — khong co no thi
               luat "giu du 4 giay thi gap doi" khong the ton tai. */
            let dt = cusCapCua('dot');
            if (dt > 0){
                let nh = cusDotNhip(), cu = o._cusDot;
                // COMBO DOT + TACH TIA: dang chay ma trung tiep thi CHONG them 1 nhip (toi da gap doi) thay vi chi lam moi.
                if (cu && cu.n > 0){ cu.n = (cusCapCua('tachtia') > 0) ? Math.min(cusDotSo() * 2, Math.max(cusDotSo(), cu.n + 1)) : cusDotSo(); cu.nhip = nh; if (cu.t > nh) cu.t = nh; }
                else o._cusDot = { n: cusDotSo(), t: nh, nhip: nh, giu: 0 };
            }
            return bonus;
        }
// PLAYER_PART_END s4.cusHieuUng.1

// index.html:64612 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusLaserBan.1 EDITABLE
function cusLaserBan(ng){
            if (!ng) return;
            let cap = cusCapCua('laser'); if (cap <= 0) return;
            let base = CUS_LZ_DMG[cap] || CUS_LZ_DMG[1];
            let pos = ng.getShootPos();
            let huong = (pos.dir < 0 ? -1 : 1);
            let bien = huong > 0 ? (typeof worldR === 'function' ? worldR() : canvas.width)
                                 : (typeof worldL === 'function' ? worldL() : 0);
            let cao = CUS_LZ_CAO * ((typeof ng.getFormScale === 'function') ? ng.getFormScale() : 1);
            let khung = { x: Math.min(pos.x, bien), y: pos.y - cao / 2,
                          w: Math.abs(bien - pos.x), h: cao };
            let _tt = cusCapCua('tachtia'), _toa = cusCapCua('toa') > 0;   // @@HE-SONGHE
            let _phu = _tt > 0 ? [-(cao * 1.9), cao * 1.9] : [];
            ng.cusLzTia = { x1: pos.x, x2: bien, y: pos.y, cao: cao, t: 0, tong: 16, phu: _phu };
            if (ng.id === 1 && typeof doChieuThu === 'function') doChieuThu(khung, khung, base);   // @@HE-DOCHIEU
            ng.cusLot = (ng.cusLot || 0) + 1;
            if (gameState === 'pvp'){
                let dich = (typeof pvpDich === 'function') ? pvpDich(ng) : null;
                if (dich && checkAABB(khung, dich)){
                    if (dich.isShielding && dich.isShielding())
                        visualEffects.push(new Effect(dich.x + (dich.isFacingLeft ? dich.w : 0), dich.y, 'parry'));
                    else dich.takeDamage(base);
                }
            } else if (typeof allTargets === 'function'){
                for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (!checkAABB(khung, o)) continue;
                    let d = cusTangPT(o, base);
                    if (o._cusLot !== ng.cusLot){ o._cusLot = ng.cusLot; d += cusHieuUng(o, base); }
                    cusStandThu(o, d, 'laser', ng.id);
                    if (typeof dealDamage === 'function') dealDamage(o, d, 'ammo'); else o.hp -= d;
                    /* Nhanh NO treo o moc VA CHAM CUA VIEN DAN, ma tia thi khong co vien dan
                       nao — do lan dau: LASER + NO ra dung 6.0 dmg/giay, y het khi khong lap
                       hieu ung gi. Phai tu dat vu no o cho tia cham. */
                    if (typeof cusCapCua === 'function' && cusCapCua('no') > 0 && typeof cusNoDat === 'function')
                        cusNoDat(o.x + (o.w||20)/2, o.y + (o.h||20)/2);
                    // LASER + TOA: moi muc tieu tia cat qua bung mot chum toa phia sau no
                    if (_toa && typeof cusToaNo === 'function')
                        cusToaNo({ cusToaSo: CUS_TOA_SO, dmg: 1, cusLot: ng.cusLot, owner: ng.id }, o.x + (o.w||20)/2 + huong * ((o.w||20)/2 + 30), pos.y);
                    visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 20));
                }
                // LASER + TACH TIA: hai tia phu tren / duoi, nua sat thuong
                for (let off of _phu){
                    let k2 = { x: khung.x, y: khung.y + off, w: khung.w, h: khung.h };
                    for (let o of allTargets()){
                        if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                        if (!checkAABB(k2, o)) continue;
                        let d2 = Math.max(1, Math.round(cusTangPT(o, base) / 2));
                        if (typeof dealDamage === 'function') dealDamage(o, d2, 'ammo'); else o.hp -= d2;
                        visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 14));
                    }
                }
                for (let i = obstacles.length - 1; i >= 0; i--)
                    if (checkAABB(khung, obstacles[i])) obstacles[i].hp -= base;
            }
            shakeTimer = Math.max(shakeTimer, 12);
            if (typeof SFX !== 'undefined' && SFX.tone){
                SFX.tone(1800, 0.16, 'sawtooth', 0.22, 500); SFX.tone(300, 0.10, 'square', 0.14, 900);
            }
        }
// PLAYER_PART_END s4.cusLaserBan.1

// index.html:64686 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_RG_NAC.1 EDITABLE
const CUS_RG_NAC  = 60;
// PLAYER_PART_END s4.CUS_RG_NAC.1

// index.html:64687 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_RG_HOI.1 EDITABLE
const CUS_RG_HOI  = 45;
// PLAYER_PART_END s4.CUS_RG_HOI.1

// index.html:64688 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgDan.1 EDITABLE
let cusRgDan = [];
// PLAYER_PART_END s4.cusRgDan.1

// index.html:64689 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgSet.1 EDITABLE
let cusRgSet = [];
// PLAYER_PART_END s4.cusRgSet.1

// index.html:64690 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgBat.1 EDITABLE
function cusRgBat(){ return typeof cusCapCua === 'function' && cusCapCua('railgun') > 0; }
// PLAYER_PART_END s4.cusRgBat.1

// index.html:64691 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgDmg.1 EDITABLE
function cusRgDmg(n){ return n * (n + 5); }
// PLAYER_PART_END s4.cusRgDmg.1

// index.html:64693 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgLech.1 EDITABLE
function cusRgLech(){ return (typeof cusCapCua === 'function' && cusCapCua('railgun') >= 2) ? 24 : 0; }
// PLAYER_PART_END s4.cusRgLech.1

// index.html:64694 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgN.1 EDITABLE
function cusRgN(t){ return Math.floor(((t || 0) + cusRgLech()) / CUS_RG_NAC); }
// PLAYER_PART_END s4.cusRgN.1

// index.html:64696 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgRoNhip.1 EDITABLE
function cusRgRoNhip(n){ return n <= 2 ? 60 : (n === 3 ? 30 : 20); }
// PLAYER_PART_END s4.cusRgRoNhip.1

// index.html:64703 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_RG_KLEN.1 EDITABLE
const CUS_RG_KLEN  = 90;
// PLAYER_PART_END s4.CUS_RG_KLEN.1

// index.html:64704 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_RG_KHET.1 EDITABLE
const CUS_RG_KHET  = 180;
// PLAYER_PART_END s4.CUS_RG_KHET.1

// index.html:64705 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_RG_KHOI.1 EDITABLE
const CUS_RG_KHOI  = 30;
// PLAYER_PART_END s4.CUS_RG_KHOI.1

// index.html:64706 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_RG_KRO.1 EDITABLE
const CUS_RG_KRO   = 30;
// PLAYER_PART_END s4.CUS_RG_KRO.1

// index.html:64707 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_RG_KR.1 EDITABLE
const CUS_RG_KR    = 2;
// PLAYER_PART_END s4.CUS_RG_KR.1

// index.html:64708 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgKBat.1 EDITABLE
function cusRgKBat(ng){ return !!(ng && ng.cusRgK && ng.cusRgK.t < CUS_RG_KHET); }
// PLAYER_PART_END s4.cusRgKBat.1

// index.html:64709 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgKHeSo.1 EDITABLE
function cusRgKHeSo(ng){
            let K = ng && ng.cusRgK; if (!K || K.t >= CUS_RG_KHET) return 1;
            let he = 1 + 2 * Math.min(1, K.t / CUS_RG_KLEN);
            if (K.giam > 0) he = Math.min(he, 3 - K.giam / CUS_RG_KHOI);
            return he;
        }
// PLAYER_PART_END s4.cusRgKHeSo.1

// index.html:64715 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgKDmg.1 EDITABLE
function cusRgKDmg(ng){
            let t = ng.cusRgK ? ng.cusRgK.t : 0;
            return t >= CUS_RG_KLEN ? 6 : (t >= 60 ? 4 : (t >= 30 ? 3 : 2));
        }
// PLAYER_PART_END s4.cusRgKDmg.1

// index.html:64719 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgLuotBat.1 EDITABLE
function cusRgLuotBat(ng, dir){
            let K = ng.cusRgK; if (!K) return;
            let dmg = cusRgKDmg(ng), u = Math.min(1, K.t / CUS_RG_KLEN);
            if (typeof dashVx !== 'undefined') dashVx *= 1 + 0.8 * u;      // xa dan len toi x1.8
            ng.cusRgLuot = { t: 14 + Math.round(8 * u), hit: new Set(), dmg: dmg, x: ng.x + ng.w / 2, y: ng.y + ng.h / 2, sx: ng.x + ng.w / 2, sy: ng.y + ng.h / 2, dir: dir };
            if (dmg >= 6) K.giam = CUS_RG_KHOI;                           // cu luot manh nhat: tut ve x2
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(1600, 0.10, 'sawtooth', 0.18, 300); if (dmg >= 6) SFX.tone(70, 0.3, 'square', 0.22, 40); }
        }
// PLAYER_PART_END s4.cusRgLuotBat.1

// index.html:64727 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgToc.1 EDITABLE
function cusRgToc(n){ return Math.min(150, 34 + 12 * n); }
// PLAYER_PART_END s4.cusRgToc.1

// index.html:64728 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgCao.1 EDITABLE
function cusRgCao(n){ return Math.min(300, 18 + 14 * (n - 1)); }
// PLAYER_PART_END s4.cusRgCao.1

// index.html:64729 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgRoR.1 EDITABLE
function cusRgRoR(n){ return canvas.width / 23 * Math.min(5, 2.3 + 0.3 * (n - 2)); }
// PLAYER_PART_END s4.cusRgRoR.1

// index.html:64730 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgTiaSet.1 EDITABLE
function cusRgTiaSet(x1, y1, x2, y2, lech, t){
            let pts = [[x1, y1]], d = Math.hypot(x2 - x1, y2 - y1), n = Math.max(3, Math.round(d / 14));
            let nx = -(y2 - y1) / (d || 1), ny = (x2 - x1) / (d || 1);
            for (let i = 1; i < n; i++){
                let u = i / n, l = (Math.random() - 0.5) * 2 * lech * Math.sin(u * Math.PI);
                pts.push([x1 + (x2 - x1) * u + nx * l, y1 + (y2 - y1) * u + ny * l]);
            }
            pts.push([x2, y2]);
            cusRgSet.push({ p: pts, t: 0, tong: t || 8 });
        }
// PLAYER_PART_END s4.cusRgTiaSet.1

// index.html:64740 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgBan.1 EDITABLE
function cusRgBan(ng, n){
            let pos = ng.getShootPos(), dir = pos.dir < 0 ? -1 : 1;
            let sc = (typeof ng.getFormScale === 'function') ? ng.getFormScale() : 1;
            ng.cusLot = (ng.cusLot || 0) + 1;
            let _toa = cusCapCua('toa') > 0, _tt = cusCapCua('tachtia');   // @@HE-SONGHE: chi co khi deo Song He
            cusRgDan.push({ ng: ng, x0: pos.x, x: pos.x, y: pos.y, dir: dir, n: n, v: cusRgToc(n),
                            h: cusRgCao(n) * sc, dmg: cusRgDmg(n), trung: new Set(), t: 0, het: 0, lot: ng.cusLot,
                            bien: dir > 0 ? worldR() + 200 : worldL() - 200, toa: _toa });
            // RAILGUN + TACH TIA: hai cot dan phu tren / duoi, nua sat thuong
            if (_tt > 0){
                let lech = cusRgCao(n) * sc * 0.5 + 26 * sc;
                for (let sg of (_tt === 1 ? [-1, 1] : [-1, 1]))
                    cusRgDan.push({ ng: ng, x0: pos.x, x: pos.x, y: pos.y + sg * lech, dir: dir, n: n, v: cusRgToc(n),
                                    h: cusRgCao(n) * sc * 0.6, dmg: Math.max(1, Math.round(cusRgDmg(n) / 2)), trung: new Set(), t: 0, het: 0, lot: ng.cusLot,
                                    bien: dir > 0 ? worldR() + 200 : worldL() - 200, toa: _toa, phu: 1 });
            }
            shakeTimer = Math.max(shakeTimer, Math.min(50, 8 + 5 * n));
            // giat lui
            if (typeof ng.x === 'number') ng.x -= dir * Math.min(36, 3 + 3 * n);
            floatingTexts.push(new FloatingText(ng.x - 40, ng.y - 40, n >= 5 ? "RAILGUN — " + cusRgDmg(n) + "!!" : "RAILGUN! " + cusRgDmg(n)));
            if (typeof SFX !== 'undefined' && SFX.tone){
                SFX.tone(2400, 0.20, 'sawtooth', 0.22, 300); SFX.tone(90, 0.35 + 0.05 * Math.min(n, 8), 'square', 0.26, 40);
                if (n >= 3) SFX.tone(60, 0.6, 'sawtooth', 0.30, 25);
            }
        }
// PLAYER_PART_END s4.cusRgBan.1

// index.html:64765 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgTrungDich.1 EDITABLE
function cusRgTrungDich(D, o){
            let ng = D.ng, d = D.dmg;
            if (gameState === 'pvp'){
                if (o.isShielding && o.isShielding())
                    visualEffects.push(new Effect(o.x + (o.isFacingLeft ? o.w : 0), o.y, 'parry'));
                else if (typeof cusPvpDanh === 'function') cusPvpDanh(ng, o, d);   // @@HE-P2KHOA: di ong PvP (he so, tran, nap ult cho nguoi ban)
                else o.takeDamage(d);
                return;
            }
            d = cusTangPT(o, d);
            if (o._cusLot !== D.lot){ o._cusLot = D.lot; d += (typeof cusHieuUng === 'function') ? cusHieuUng(o, D.dmg) : 0; }
            // RAILGUN + TOA: muc tieu DAU TIEN cot dan xuyen qua bung ra mot chum toa (moi vien = so nac)
            if (D.toa && !D.toaXong && typeof cusToaNo === 'function'){
                D.toaXong = 1;
                cusToaNo({ cusToaSo: CUS_TOA_SO, dmg: Math.max(1, D.n), cusLot: D.lot, owner: ng.id }, o.x + (o.w||20)/2 + D.dir * ((o.w||20)/2 + 30), D.y);
            }
            cusStandThu(o, d, 'rail', ng.id);
            if (typeof dealDamage === 'function') dealDamage(o, d, 'ammo'); else o.hp -= d;
            if (typeof novaCo === 'function' && novaCo(ng) && o.hp > 0){   // @@HE-NOVA2: TE LIET 0.5 giay
                if (typeof venKhoa === 'function') venKhoa(o, 30); else o._uFreeze = Math.max(o._uFreeze || 0, 30);
                o._novaTe = 30;
                visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'lightning_shock', true, 30));
                floatingTexts.push(new FloatingText(o.x + (o.w||20)/2 - 26, o.y - 22, LT("TÊ LIỆT!", "PARALYZED!")));
            }
            if (typeof cusCapCua === 'function' && cusCapCua('no') > 0 && typeof cusNoDat === 'function')
                cusNoDat(o.x + (o.w||20)/2, o.y + (o.h||20)/2);
            visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 20 + Math.min(40, D.n * 4)));
            for (let k = 0; k < 2; k++)
                cusRgTiaSet(o.x + (o.w||20)/2, D.y, o.x + (o.w||20)/2 + (Math.random() - 0.5) * 80, D.y + (Math.random() - 0.5) * (D.h + 60), 10, 7);
        }
// PLAYER_PART_END s4.cusRgTrungDich.1

// index.html:64796 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgTick.1 EDITABLE
function cusRgTick(){
            for (let i = cusRgDan.length - 1; i >= 0; i--){
                let D = cusRgDan[i]; D.t++;
                if (D.het){ if (++D.het > 26) cusRgDan.splice(i, 1); continue; }
                let xc = D.x; D.x += D.dir * D.v;
                if ((D.dir > 0 && D.x >= D.bien) || (D.dir < 0 && D.x <= D.bien)){ D.x = D.bien; D.het = 1; }
                let hop = { x: Math.min(xc, D.x), y: D.y - D.h / 2, w: Math.abs(D.x - xc) + 1, h: D.h };
                if (typeof doChieuThu === 'function') doChieuThu(D, hop, D.dmg);   // @@HE-DOCHIEU
                let ds = (gameState === 'pvp') ? [((typeof pvpDich === 'function') ? pvpDich(D.ng) : null)]
                                               : ((typeof allTargets === 'function') ? allTargets() : []);
                for (let o of ds){
                    if (!o || o === D.ng || D.trung.has(o) || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (!checkAABB(hop, o)) continue;
                    D.trung.add(o);
                    cusRgTrungDich(D, o);
                }
                if (gameState !== 'pvp' && typeof obstacles !== 'undefined')
                    for (let o of obstacles) if (o && !D.trung.has(o) && checkAABB(hop, o)){ D.trung.add(o); if (o.hp !== undefined) o.hp -= D.dmg; }
            }
            for (let i = cusRgSet.length - 1; i >= 0; i--) if (++cusRgSet[i].t > cusRgSet[i].tong) cusRgSet.splice(i, 1);
        }
// PLAYER_PART_END s4.cusRgTick.1

// index.html:64817 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusRgVe.1 EDITABLE
function cusRgVe(){
            ctx.save();
            // ---- lua dien khi dang tich ----
            for (let k = 0; k < 2; k++){
                let ng = k === 0 ? (typeof dino !== 'undefined' ? dino : null) : (typeof dino2 !== 'undefined' ? dino2 : null);
                if (!ng || !ng.cusRgGiu) continue;
                if (!cusRgBat() || ng.ammoType !== CUS_DAN){ ng.cusRgGiu = false; ng.cusRgT = 0; continue; }
                let pos = ng.getShootPos(), t = (ng.cusRgT || 0) + cusRgLech(), n = Math.floor(t / CUS_RG_NAC), u = (t % CUS_RG_NAC) / CUS_RG_NAC;
                // dong xu tung len xoay tren nong sung
                let cy = pos.y - 22 - Math.abs(Math.sin(t * 0.09)) * 6, bx = Math.abs(Math.cos(t * 0.35));
                ctx.fillStyle = "#FFB300"; ctx.strokeStyle = "#FFF3C4"; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.ellipse(pos.x, cy, 1.5 + 5.5 * bx, 7, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                // vong tich nac
                let mau = n >= 1 ? "rgba(79,195,247,0.95)" : "rgba(144,202,249,0.7)";
                ctx.strokeStyle = mau; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(pos.x, pos.y, 16 + Math.min(14, n * 2), -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * u); ctx.stroke();
                if (n >= 1){
                    ctx.font = "bold 13px Consolas, monospace"; ctx.fillStyle = "#E1F5FE"; ctx.strokeStyle = "#01579B"; ctx.lineWidth = 3;
                    let s = "×" + n; ctx.strokeText(s, pos.x + 18, pos.y - 20); ctx.fillText(s, pos.x + 18, pos.y - 20);
                }
                // tia lua dien nho quanh nong
                if (frames % 3 === 0){
                    let a = Math.random() * Math.PI * 2, r = 10 + Math.random() * (12 + 3 * n);
                    cusRgTiaSet(pos.x, pos.y, pos.x + Math.cos(a) * r, pos.y + Math.sin(a) * r, 4, 5);
                }
                // tu nac 2: hao quang dien quanh ca nguoi
                if (n >= 2){
                    let R = cusRgRoR(n), cx = ng.x + ng.w / 2, cyy = ng.y + ng.h / 2;
                    let g = ctx.createRadialGradient(cx, cyy, 0, cx, cyy, R);
                    g.addColorStop(0, "rgba(129,212,250,0.00)"); g.addColorStop(0.75, "rgba(79,195,247,0.10)"); g.addColorStop(1, "rgba(41,182,246,0.28)");
                    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cyy, R, 0, Math.PI * 2); ctx.fill();
                    if (frames % 4 === 0){
                        let a = Math.random() * Math.PI * 2, b = a + (Math.random() - 0.5) * 1.6;
                        cusRgTiaSet(cx + Math.cos(a) * ng.w * 0.4, cyy + Math.sin(a) * ng.h * 0.4, cx + Math.cos(b) * R * 0.95, cyy + Math.sin(b) * R * 0.95, 12, 6);
                    }
                }
            }
            // ---- @@HE-CUSRG2: dien tu gia toc quanh nguoi ----
            if (typeof dino !== 'undefined' && dino && cusRgKBat(dino) && cusRgBat()){
                let K = dino.cusRgK, u = Math.min(1, K.t / CUS_RG_KLEN), cx = dino.x + dino.w / 2, cy = dino.y + dino.h / 2;
                let R = canvas.width / 23 * CUS_RG_KR;
                let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
                g.addColorStop(0, "rgba(255,238,88,0)"); g.addColorStop(0.7, "rgba(129,212,250," + (0.08 + 0.10 * u) + ")"); g.addColorStop(1, "rgba(41,182,246," + (0.18 + 0.18 * u) + ")");
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
                if (frames % Math.max(2, 5 - Math.round(3 * u)) === 0){
                    let a = Math.random() * Math.PI * 2, b = a + (Math.random() - 0.5) * 1.4;
                    cusRgTiaSet(cx + Math.cos(a) * dino.w * 0.35, cy + Math.sin(a) * dino.h * 0.35, cx + Math.cos(b) * R * 0.9, cy + Math.sin(b) * R * 0.9, 10, 5);
                }
                // vet toc do sau lung khi dang chay
                if (Math.abs(dino.x - (K.px === undefined ? dino.x : K.px)) > 6){
                    let dx = dino.x - K.px;
                    ctx.strokeStyle = "rgba(129,212,250," + (0.3 + 0.4 * u) + ")"; ctx.lineWidth = 2;
                    for (let k = -1; k <= 1; k++){
                        ctx.beginPath(); ctx.moveTo(cx - Math.sign(dx) * dino.w * 0.4, cy + k * 10);
                        ctx.lineTo(cx - dx * 5, cy + k * 10 + (Math.random() - 0.5) * 4); ctx.stroke();
                    }
                }
                K.px = dino.x;
            }
            // ---- vien dan + vet sang ----
            for (let D of cusRgDan){
                let mo = D.het ? Math.max(0, 1 - D.het / 26) : 1;
                let L = Math.abs(D.x - D.x0); if (L < 2) continue;
                let H = D.h / 2 + 4;
                const veLop = (ti, mau) => {
                    ctx.fillStyle = mau; ctx.beginPath(); ctx.moveTo(D.x0, D.y);
                    const S = 16;
                    for (let i = 1; i <= S; i++){ let u = i / S; ctx.lineTo(D.x0 + D.dir * L * u, D.y - H * ti * Math.sqrt(u)); }
                    for (let i = S; i >= 1; i--){ let u = i / S; ctx.lineTo(D.x0 + D.dir * L * u, D.y + H * ti * Math.sqrt(u)); }
                    ctx.closePath(); ctx.fill();
                };
                // vet: ngoai nhat dan -> giua dac xanh dam
                veLop(1.00, "rgba(179,229,252," + (0.30 * mo) + ")");
                veLop(0.75, "rgba(129,212,250," + (0.40 * mo) + ")");
                veLop(0.45, "rgba(3,155,229," + (0.85 * mo) + ")");
                veLop(0.14, "rgba(225,245,254," + (0.95 * mo) + ")");
                // vanh phan luc hinh luoi liem, mep sau rang cua
                let rv = 16 + H * 0.8 + Math.min(24, D.t * 2), cx = D.x0 - D.dir * rv * 0.95;
                ctx.save(); ctx.translate(cx, D.y); ctx.scale(D.dir, 1);
                let mv = Math.max(0, 1 - D.t / 30) * mo;
                if (mv > 0){
                    ctx.fillStyle = "rgba(129,212,250," + (0.75 * mv) + ")"; ctx.strokeStyle = "rgba(255,255,255," + (0.9 * mv) + ")"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.arc(0, 0, rv, -Math.PI / 2, Math.PI / 2);
                    let rang = 4;
                    for (let i = 0; i <= rang * 2; i++){
                        let yy = rv - (2 * rv) * i / (rang * 2), xx = (i % 2 ? rv * 0.28 : rv * 0.08);
                        ctx.lineTo(xx, yy);
                    }
                    ctx.closePath(); ctx.fill(); ctx.stroke();
                }
                ctx.restore();
                // dau dan: dong xu cam ruc giua lua dien xanh
                if (!D.het){
                    let R = 5 + Math.min(12, D.n * 1.5);
                    let g = ctx.createRadialGradient(D.x, D.y, 0, D.x, D.y, R * 3.2);
                    g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.25, "rgba(255,171,64,0.95)");
                    g.addColorStop(0.55, "rgba(41,182,246,0.55)"); g.addColorStop(1, "rgba(41,182,246,0)");
                    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(D.x, D.y, R * 3.2, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "#FF8F00"; ctx.beginPath(); ctx.ellipse(D.x, D.y, R * 0.55, R, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = "#FFF8E1"; ctx.beginPath(); ctx.ellipse(D.x, D.y, R * 0.22, R * 0.5, 0, 0, Math.PI * 2); ctx.fill();
                    for (let k = 0; k < 2 + Math.min(4, D.n); k++){
                        let a = Math.random() * Math.PI * 2, r = R * (1.6 + Math.random() * 1.8);
                        cusRgTiaSet(D.x, D.y, D.x - D.dir * (10 + Math.random() * 40) + Math.cos(a) * r * 0.4, D.y + Math.sin(a) * r, 6, 3);
                    }
                }
            }
            // ---- tia dien ----
            ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            for (let S of cusRgSet){
                let a = Math.max(0, 1 - S.t / S.tong);
                for (let lop = 0; lop < 2; lop++){
                    ctx.strokeStyle = lop ? "rgba(255,255,255," + a + ")" : "rgba(41,182,246," + (0.6 * a) + ")";
                    ctx.lineWidth = lop ? 1.3 : 4;
                    ctx.beginPath(); ctx.moveTo(S.p[0][0], S.p[0][1]);
                    for (let i = 1; i < S.p.length; i++) ctx.lineTo(S.p[i][0], S.p[i][1]);
                    ctx.stroke();
                }
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cusRgVe.1

// index.html:64948 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_PT_HOI.1 EDITABLE
const CUS_PT_HOI  = 60;
// PLAYER_PART_END s4.CUS_PT_HOI.1

// index.html:64949 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_PT_NAP.1 EDITABLE
const CUS_PT_NAP  = 90;
// PLAYER_PART_END s4.CUS_PT_NAP.1

// index.html:64950 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_PT_NHIP.1 EDITABLE
const CUS_PT_NHIP = 12;
// PLAYER_PART_END s4.CUS_PT_NHIP.1

// index.html:64951 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_PT_TOC.1 EDITABLE
const CUS_PT_TOC  = 21;
// PLAYER_PART_END s4.CUS_PT_TOC.1

// index.html:64952 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_PT_CHAY.1 EDITABLE
const CUS_PT_CHAY = 180;
// PLAYER_PART_END s4.CUS_PT_CHAY.1

// index.html:64953 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_PT_KMOC.1 EDITABLE
const CUS_PT_KMOC = 45;
// PLAYER_PART_END s4.CUS_PT_KMOC.1

// index.html:64954 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusPtDan.1 EDITABLE
let cusPtDan = [];
// PLAYER_PART_END s4.cusPtDan.1

// index.html:64955 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusPtChay.1 EDITABLE
let cusPtChay = [];
// PLAYER_PART_END s4.cusPtChay.1

// index.html:64956 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusPtBat.1 EDITABLE
function cusPtBat(){ return typeof cusCapCua === 'function' && cusCapCua('phitieu') > 0; }
// PLAYER_PART_END s4.cusPtBat.1

// index.html:64960 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_PT_TRAN.1 EDITABLE
const CUS_PT_TRAN = 10;
// PLAYER_PART_END s4.CUS_PT_TRAN.1

// index.html:64961 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusPtDps.1 EDITABLE
function cusPtDps(n){ return Math.min(CUS_PT_TRAN, Math.floor((Math.sqrt(8 * n + 1) - 1) / 2 + 1e-9)); }
// PLAYER_PART_END s4.cusPtDps.1

// index.html:64962 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusPtCanKim.1 EDITABLE
function cusPtCanKim(d){ return d * (d + 1) / 2; }
// PLAYER_PART_END s4.cusPtCanKim.1

// index.html:64963 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusPtGoc.1 EDITABLE
function cusPtGoc(){ return Math.atan(0.4 / 5); }
// PLAYER_PART_END s4.cusPtGoc.1

// index.html:64964 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusPtNem.1 EDITABLE
function cusPtNem(ng, goc, quat){
            let pos = ng.getShootPos(), dir = pos.dir < 0 ? -1 : 1;
            let a = (dir > 0 ? 0 : Math.PI) + goc * dir;
            cusPtDan.push({ ng: ng, x: pos.x, y: pos.y, vx: Math.cos(a) * CUS_PT_TOC, vy: Math.sin(a) * CUS_PT_TOC,
                            trung: new Set(), xuyen: 1, t: 0, day: (typeof novaCo === 'function' && novaCo(ng)),   // @@HE-NOVA2: kim keo theo soi day
                            quat: quat ? { x: pos.x, y: pos.y } : null });                                            // @@HE-PTGHIM: kim cua quat K
        }
// PLAYER_PART_END s4.cusPtNem.1

// index.html:64974 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_PT_GHIM_R.1 EDITABLE
const CUS_PT_GHIM_R = 3 * 43.4;
// PLAYER_PART_END s4.CUS_PT_GHIM_R.1

// index.html:64975 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusPtRut.1 EDITABLE
function cusPtRut(ng){
            let ds = (gameState === 'pvp') ? [((typeof pvpDich === 'function') ? pvpDich(ng) : null)] : ((typeof allTargets === 'function') ? allTargets() : []);
            let tong = 0, so = 0;
            for (let o of ds){
                if (!o || o === ng || o.hp === undefined || o.hp <= 0 || o.invulnAll) continue;
                let M = o._cusMau; if (!M || !(M.n > 0)) continue;
                let d = M.n; M.n = 0; M.t = 0;
                let i = cusPtChay.indexOf(o); if (i >= 0) cusPtChay.splice(i, 1);
                if (gameState === 'pvp') cusPvpDanh(ng, o, d);
                else if (typeof dealDamage === 'function') dealDamage(o, d, 'flat'); else o.hp -= d;
                let cx = o.x + (o.w || 20) / 2, cy = o.y + (o.h || 20) / 2;
                visualEffects.push(new Effect(cx, cy, 'explosion', true, 20 + Math.min(50, d)));
                floatingTexts.push(new FloatingText(cx - 30, o.y - 34, LT("RÚT KIM ", "RIP OUT ") + d));
                novaPtGiat.push({ o: o, dx: (o.w || 20) / 2, dy: (o.h || 20) / 2, t: 0, no: true, ng: ng });
                tong += d; so++;
            }
            if (so){
                shakeTimer = Math.max(shakeTimer, Math.min(18, 4 + tong / 4));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(2600, 0.10, 'sawtooth', 0.16, 400); SFX.tone(500, 0.18, 'square', 0.10, 150); }
            }
            return so > 0;
        }
// PLAYER_PART_END s4.cusPtRut.1

// index.html:65007 · Phạm vi: global
// PLAYER_PART_BEGIN s4.NOVA_PT_KHOA.1 EDITABLE
const NOVA_PT_KHOA = 30, NOVA_PT_ANIM = 12;
// PLAYER_PART_END s4.NOVA_PT_KHOA.1

// index.html:65008 · Phạm vi: global
// PLAYER_PART_BEGIN s4.novaPtGiat.1 EDITABLE
let novaPtGiat = [];
// PLAYER_PART_END s4.novaPtGiat.1

// index.html:65009 · Phạm vi: global
// PLAYER_PART_BEGIN s4.novaPtTrung.1 EDITABLE
function novaPtTrung(o, D){
            let M = o._cusMau, dang = !!M && M.t > 0 && cusPtChay.indexOf(o) >= 0;
            let san = !(o._novaPtF !== undefined && typeof frames === 'number' && frames - o._novaPtF >= 0 && frames - o._novaPtF < NOVA_PT_KHOA);
            let no = (dang && san) ? Math.round(cusPtDps(M.n) * M.t / 60) : 0;
            cusPtDam(o, D);                                   // 1 sat thuong + 1 stack (+ bat / lam moi chay mau)
            if (dang && san){
                o._novaPtF = frames;
                M = o._cusMau; M.t = 0;
                let i = cusPtChay.indexOf(o); if (i >= 0) cusPtChay.splice(i, 1);
                if (no > 0 && o.hp > 0 && !o.invulnAll){
                    if (typeof dealDamage === 'function') dealDamage(o, no, 'flat'); else o.hp -= no;
                    let cx = o.x + (o.w || 20) / 2, cy = o.y + (o.h || 20) / 2;
                    visualEffects.push(new Effect(cx, cy, 'explosion', true, 20 + Math.min(40, no * 2)));
                    floatingTexts.push(new FloatingText(cx - 14, o.y - 30, "🩸 " + no));
                    shakeTimer = Math.max(shakeTimer, Math.min(14, 4 + no));
                }
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(2400, 0.10, 'sawtooth', 0.14, 500); SFX.tone(700, 0.14, 'square', 0.08, 200); }
            }
            novaPtGiat.push({ o: o, dx: D.x - o.x, dy: D.y - o.y, t: 0, no: dang && san, ng: D.ng });
            if (novaPtGiat.length > 16) novaPtGiat.shift();
        }
// PLAYER_PART_END s4.novaPtTrung.1

// index.html:65030 · Phạm vi: global
// PLAYER_PART_BEGIN s4.novaPtTick.1 EDITABLE
function novaPtTick(){
            for (let i = novaPtGiat.length - 1; i >= 0; i--) if (++novaPtGiat[i].t >= NOVA_PT_ANIM) novaPtGiat.splice(i, 1);
        }
// PLAYER_PART_END s4.novaPtTick.1

// index.html:65033 · Phạm vi: global
// PLAYER_PART_BEGIN s4.novaPtVe.1 EDITABLE
function novaPtVe(){
            let ng = (typeof dino !== 'undefined') ? dino : null;
            if (!ng || (!novaPtGiat.length && !cusPtDan.some(D => D.day))) return;
            let tay = ng.getShootPos();
            ctx.save();
            let veDay = (x1, y1, x2, y2, a, cang) => {
                let mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + (cang ? 0 : Math.min(26, Math.hypot(x2 - x1, y2 - y1) * 0.08));
                ctx.globalAlpha = a;
                ctx.strokeStyle = "rgba(15,15,20,0.8)"; ctx.lineWidth = 2.2;
                ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke();
                ctx.strokeStyle = "rgba(255,255,255,0.8)"; ctx.lineWidth = 0.8;
                ctx.beginPath(); ctx.moveTo(x1, y1 - 0.6); ctx.quadraticCurveTo(mx, my - 0.6, x2, y2 - 0.6); ctx.stroke();
            };
            for (const D of cusPtDan) if (D.day && D.ng === ng) veDay(tay.x, tay.y, D.x, D.y, 0.55, false);
            for (const G of novaPtGiat){
                if (G.ng && G.ng !== ng) continue;
                let o = G.o; if (!o) continue;
                let px = o.x + G.dx, py = o.y + G.dy, u = G.t / NOVA_PT_ANIM;
                // day cang thang, kim bay nguoc ve tay theo day
                let kx = px + (tay.x - px) * u, ky = py + (tay.y - py) * u;
                veDay(tay.x, tay.y, kx, ky, 0.9 * (1 - u * 0.5), true);
                ctx.globalAlpha = 1 - u * 0.6; ctx.fillStyle = "#ECEFF1";
                ctx.save(); ctx.translate(kx, ky); ctx.rotate(Math.atan2(py - tay.y, px - tay.x));
                ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(-6, -2); ctx.lineTo(-6, 2); ctx.closePath(); ctx.fill(); ctx.restore();
                if (G.no && G.t < 8){                          // vong no do quanh cho kim rut ra
                    ctx.globalAlpha = 0.8 * (1 - G.t / 8); ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(px, py, 8 + G.t * 4, 0, 6.28); ctx.stroke();
                }
            }
            ctx.globalAlpha = 1;
            ctx.restore();
        }
// PLAYER_PART_END s4.novaPtVe.1

// index.html:65067 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusPtLoLung.1 EDITABLE
function cusPtLoLung(ng){
            let pos = ng.getShootPos(), dir = pos.dir < 0 ? -1 : 1, m = null, bd = 1e9;
            let ds = (typeof allTargets === 'function') ? allTargets() : [];
            for (let o of ds){
                if (!o || o === ng || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                let d = Math.hypot((o.x + (o.w||20)/2) - pos.x, (o.y + (o.h||20)/2) - pos.y); if (d < bd){ bd = d; m = o; }
            }
            let a0 = m ? Math.atan2((m.y + (m.h||20)/2) - pos.y, (m.x + (m.w||20)/2) - pos.x) : (dir > 0 ? 0.96 : Math.PI - 0.96);
            for (let i = 0; i < 4; i++){
                let a = a0 + (i - 1.5) * 0.07;
                cusPtDan.push({ ng: ng, x: pos.x, y: pos.y, vx: Math.cos(a) * CUS_PT_TOC, vy: Math.sin(a) * CUS_PT_TOC,
                                trung: new Set(), xuyen: 1, t: 0, day: (typeof novaCo === 'function' && novaCo(ng)) });
            }
            floatingTexts.push(new FloatingText(ng.x - 16, ng.y - 34, "4 " + LT("KIM", "NEEDLES")));
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(2600, 0.08, 'triangle', 0.14, 3600); SFX.tone(1800, 0.06, 'triangle', 0.10, 2800); }
        }
// PLAYER_PART_END s4.cusPtLoLung.1

// index.html:65083 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusPtDam.1 EDITABLE
function cusPtDam(o, D){
            /* @@HE-CANPVP2 — truoc day PvP: kim goi thang takeDamage(1) len doi thu tran -> KHONG qua he so
               PVP_HS va KHONG chay mau, nen Phi Tieu thang 7% so tran. Gio kim nhan he so cua nguoi nem va
               cung cong stack CHAY MAU nhu PvE (DOT cung nhan he so, xem cusPtTick). */
            if (gameState === 'pvp'){
                let hs = (D && D.ng && PVP_HS[D.ng.ammoType] != null) ? PVP_HS[D.ng.ammoType] : 1;
                cusPvpDanh(D && D.ng, o, 1);   // @@HE-PVPCUS: qua ong PvP day du (he so + nap ult cho nguoi nem)
                let M = o._cusMau || (o._cusMau = { n: 0, t: 0, nhip: 0 });
                M.n++; M.t = CUS_PT_CHAY; M.hs = hs;
                if (cusPtChay.indexOf(o) < 0){ cusPtChay.push(o); M.nhip = 0; }
                return;
            }
            if (typeof dealDamage === 'function') dealDamage(o, 1, 'ammo'); else o.hp -= 1;
            let M = o._cusMau || (o._cusMau = { n: 0, t: 0, nhip: 0 });
            M.n++; M.t = CUS_PT_CHAY;
            if (cusPtChay.indexOf(o) < 0){ cusPtChay.push(o); M.nhip = 0; }
        }
// PLAYER_PART_END s4.cusPtDam.1

// index.html:65100 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusPtTick.1 EDITABLE
function cusPtTick(){
            novaPtTick();   // @@HE-NOVA2
            for (let i = cusPtDan.length - 1; i >= 0; i--){
                let D = cusPtDan[i]; D.t++;
                let x0 = D.x, y0 = D.y; D.x += D.vx; D.y += D.vy;
                let hop = { x: Math.min(x0, D.x) - 2, y: Math.min(y0, D.y) - 3, w: Math.abs(D.x - x0) + 4, h: Math.abs(D.y - y0) + 6 };
                if (typeof doChieuThu === 'function' && doChieuThu(D, hop, 1)) { cusPtDan.splice(i, 1); continue; }   // @@HE-DOCHIEU
                if (D.ng && D.ng.id === 1 && typeof gdVaCham === 'function' && gdVaCham(hop, 1, false) <= 0){ cusPtDan.splice(i, 1); continue; }   // @@HE-GATDAN2
                let ds = (gameState === 'pvp') ? [((typeof pvpDich === 'function') ? pvpDich(D.ng) : null)]
                                               : ((typeof allTargets === 'function') ? allTargets() : []);
                let het = false;
                for (let o of ds){
                    if (!o || o === D.ng || D.trung.has(o) || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (!checkAABB(hop, o)) continue;
                    D.trung.add(o);
                    if (D.day && typeof novaPtTrung === 'function') novaPtTrung(o, D); else cusPtDam(o, D);   // @@HE-NOVA4: kim gan day trung -> giat
                    if (D.quat && o._cusMau && Math.hypot(D.x - D.quat.x, D.y - D.quat.y) < CUS_PT_GHIM_R){   // @@HE-PTGHIM
                        o._cusMau.n++;
                        if (!o._ptGhimF || frames - o._ptGhimF > 20){ o._ptGhimF = frames; floatingTexts.push(new FloatingText(o.x + (o.w||20) / 2 - 20, o.y - 18, LT("GHIM SÂU", "DEEP PIN"))); }
                    }
                    if (D.uniKim && typeof uniKim !== 'undefined' && uniKim && uniKim.cast === D.uniKim) uniKim.ds.set(o, (uniKim.ds.get(o) || 0) + 1);   // @@HE-UNITY4
                    if (D.xuyen-- <= 0){ het = true; break; }
                }
                if (het || D.t > 90 || D.x < worldL() - 60 || D.x > worldR() + 60 || D.y > 700 || D.y < -600) cusPtDan.splice(i, 1);
            }
            // chay mau
            for (let i = cusPtChay.length - 1; i >= 0; i--){
                let o = cusPtChay[i], M = o && o._cusMau;
                if (!o || !M || o.hp === undefined || o.hp <= 0){ cusPtChay.splice(i, 1); continue; }
                let _nguoi = gameState === 'pvp' && (o === dino || (typeof dino2 !== 'undefined' && o === dino2));   // @@HE-CANPVP2
                if (!_nguoi && typeof bosses !== 'undefined' && typeof enemies !== 'undefined' && typeof obstacles !== 'undefined'
                    && bosses.indexOf(o) < 0 && enemies.indexOf(o) < 0 && obstacles.indexOf(o) < 0){ cusPtChay.splice(i, 1); continue; }
                M.t--;
                if (++M.nhip >= 60){
                    M.nhip = 0;
                    let _d = cusPtDps(M.n);
                    if (_d > 0 && _nguoi){ let _v = Math.max(1, Math.round(_d * (M.hs || 1))); o.hp = Math.max(0, o.hp - _v); }   // PvP: tru thang, khong an i-frame
                    else if (_d > 0){ if (typeof dealDamage === 'function') dealDamage(o, _d, 'flat'); else o.hp -= _d; }
                }
                if (M.t <= 0) cusPtChay.splice(i, 1);    // het chay mau — stack van giu tren `o._cusMau.n`
            }
        }
// PLAYER_PART_END s4.cusPtTick.1

// index.html:65142 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusPtVe.1 EDITABLE
function cusPtVe(){
            novaPtVe();     // @@HE-NOVA2
            if (!cusPtDan.length && !cusPtChay.length) return;
            ctx.save();
            for (let D of cusPtDan){
                let a = Math.atan2(D.vy, D.vx);
                ctx.save(); ctx.translate(D.x, D.y); ctx.rotate(a);
                ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(-34, 0); ctx.lineTo(-12, 0); ctx.stroke();       // vet gio
                ctx.strokeStyle = "#CFD8DC"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(8, 0); ctx.stroke();         // than kim
                ctx.fillStyle = "#ECEFF1"; ctx.beginPath(); ctx.moveTo(8, -1.5); ctx.lineTo(13, 0); ctx.lineTo(8, 1.5); ctx.fill();
                ctx.fillStyle = "#C62828"; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(-17, -4); ctx.lineTo(-15, 0); ctx.lineTo(-17, 4); ctx.closePath(); ctx.fill();
                ctx.restore();
            }
            // giot mau + so sat thuong moi giay tren dau
            ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "left";
            for (let o of cusPtChay){
                let M = o._cusMau; if (!M) continue;
                let cx = o.x + (o.w||20) / 2, y = o.y - 16 + Math.sin(frames * 0.12) * 2;
                let a = Math.min(1, M.t / 30);
                ctx.globalAlpha = a;
                ctx.fillStyle = "#D50000"; ctx.strokeStyle = "#4A0000"; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(cx - 10, y - 12);
                ctx.quadraticCurveTo(cx - 3, y - 4, cx - 3, y); ctx.arc(cx - 10, y, 7, 0, Math.PI); ctx.quadraticCurveTo(cx - 17, y - 4, cx - 10, y - 12);
                ctx.fill(); ctx.stroke();
                ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.beginPath(); ctx.arc(cx - 12, y - 1, 1.8, 0, Math.PI * 2); ctx.fill();
                let s = cusPtDps(M.n) + "/s";
                ctx.strokeStyle = "#000"; ctx.lineWidth = 3; ctx.strokeText(s, cx + 1, y + 4);
                ctx.fillStyle = "#FF8A80"; ctx.fillText(s, cx + 1, y + 4);
            }
            ctx.globalAlpha = 1;
            ctx.restore();
        }
// PLAYER_PART_END s4.cusPtVe.1

// index.html:65190 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_CG_FULL.1 EDITABLE
const CUS_CG_FULL  = 30;
// PLAYER_PART_END s4.CUS_CG_FULL.1

// index.html:65191 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_CG_MOC.1 EDITABLE
const CUS_CG_MOC   = [[60, 5], [45, 4], [30, 3]];
// PLAYER_PART_END s4.CUS_CG_MOC.1

// index.html:65192 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_CG_XUYEN.1 EDITABLE
const CUS_CG_XUYEN = 60;
// PLAYER_PART_END s4.CUS_CG_XUYEN.1

// index.html:65193 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_CG_GAN.1 EDITABLE
const CUS_CG_GAN   = 5;
// PLAYER_PART_END s4.CUS_CG_GAN.1

// index.html:65194 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_CG_MAX.1 EDITABLE
const CUS_CG_MAX   = 5;
// PLAYER_PART_END s4.CUS_CG_MAX.1

// index.html:65195 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgMax.1 EDITABLE
function cusCgMax(){ let c = (typeof cusCapCua === 'function') ? cusCapCua('cung') : 3; return c >= 3 ? 5 : (c === 2 ? 3 : 1); }
// PLAYER_PART_END s4.cusCgMax.1

// index.html:65196 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_CG_HOI.1 EDITABLE
const CUS_CG_HOI   = 12;
// PLAYER_PART_END s4.CUS_CG_HOI.1

// index.html:65197 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgDan.1 EDITABLE
let cusCgDan = [];
// PLAYER_PART_END s4.cusCgDan.1
