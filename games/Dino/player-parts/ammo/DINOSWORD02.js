// PLAYER_FILE: DINOSWORD02
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DSW_XOAY_DAI, DSW_XOAY_GOC, DSW_XOAY_NHIP, DSW_XOAY_TRAN, Effect, FloatingText, KAT_C2_DMG, KAT_C2_SO, KAT_C3_DMG, KAT_C3_NHIP, KAT_C3_TONG, KAT_C4_DMG, KAT_C4_KET_DMG, KAT_C4_KET_R, KAT_C4_KHUNG, KAT_C4_LAN, KAT_CH_BAN, KAT_CH_DMG, KAT_CH_MAX, KAT_HAT_TOC, KAT_JC_DAT, KAT_JC_DMG, KAT_JC_R, KAT_JC_TAM, KAT_JC_TOC, KAT_LOAN_DMG, KAT_LOAN_SO, KAT_RAPID_DMG, KAT_RAPID_SO, KAT_RAPID_XA, KAT_ULT_HANG, LT, SFX, allTargets, bossProjectiles, bosses, canvas, checkAABB, clawSwordCap, ctx, currentAmmoType, dangLuotHoacChop, dashVx, dealDamage, doChieuThu, dojoMode, dswBladeCol, dswGrip, enemies, floatingTexts, frames, gameState, gdCatHop, gdCatTron, hasRune, katBat, katDrive, katFx, katMuc, katRapid, katVeCat, katVeChargeJ, katVeMoc, katVeTat, katVeTia, katVeVong, katVeVongNo, keys, p2AmmoType, score, shakeTimer, slamLaoBat, slamLaoHuy, spawnAfterimage, styleRankNow, visualEffects, worldL, worldR
// index.html:51969 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katTick.1 EDITABLE
function katTick(p){
            if (!katBat(p.id === 1 ? currentAmmoType : p2AmmoType)) return;
            if (p.katJcCd > 0) p.katJcCd--;
            if (p.katCS > 0) p.katCS--;
            if (p.katRapidCS > 0) p.katRapidCS--;
            /* J -> DASH = RAPID SLASH. Truoc day chi xet luc CON GIU J, nhung thao tac
               that cua nguoi choi la BAM J roi LUOT — tay da nha phim tu truoc, nen dieu
               kien khong bao gio dung va Rapid Slash chua he xuat hien trong game.
               Gio mo mot CUA SO 22 khung tinh tu luc bam/nha J. */
            if (p.katLuotCho > 0) p.katLuotCho--;
            if ((p.katJ > 0 || p.katLuotCho > 0) && !p.katRapid
                && typeof dashVx !== 'undefined' && Math.abs(dashVx) > 2){
                p.katJ = 0; p.katLuotCho = 0; katRapid(p);
            }
            // Rising Star: 26 khung dau van tiep tuc BAY LEN, sau do moi treo lo lung
            if (p.katLen > 0){ p.katLen--; p.dy = -8.5; p.grounded = false;
                if (p.katLen % 6 === 0) katFx(p, 'z_spin', 90); }
            if (p.katTreo > 0){ p.katTreo--; if (p.dy > 1.6) p.dy = 1.6; }
            for (const o of katMuc()){
                if (!o || !(o._katTreo > 0)) continue;
                o._katTreo--;
                if (o.grounded !== undefined) o.grounded = false;
                if (o._katLen > 0){ o._katLen--; o.y -= KAT_HAT_TOC; }   // dang bi HAT LEN
                else if (o.dy > 1.2) o.dy = 1.2;                          // roi cham lai
            }
            /* DUONG KIEM XANH cua Judgement Cut: chay sat dat, cham dich thi NO. */
            if (p.katTia) for (let i = p.katTia.length - 1; i >= 0; i--){
                let T = p.katTia[i]; T.t++; T.x += T.dir * KAT_JC_TOC;
                let no = false;
                for (const o of katMuc()){
                    if (!o || o.hp === undefined || o.hp <= 0) continue;
                    if (T.x < o.x - 16 || T.x > o.x + (o.w||20) + 16) continue;
                    if (o.y + (o.h||20) < KAT_JC_DAT - 90) continue;
                    no = true; break;
                }
                if (no || T.t * KAT_JC_TOC > KAT_JC_TAM){
                    if (no){
                        let cx = T.x, cy = KAT_JC_DAT - 26;
                        for (let z = 0; z < 5; z++)
                            katVeCat(p, cx + (Math.random()-0.5)*70, cy + (Math.random()-0.5)*70,
                                     26 + Math.random()*30, Math.random()*Math.PI);
                        for (const o of katMuc()){
                            if (!o || o.hp === undefined || o.hp <= 0) continue;
                            let ox = Math.max(o.x, Math.min(cx, o.x + (o.w||20)));
                            let oy = Math.max(o.y, Math.min(cy, o.y + (o.h||20)));
                            if (Math.hypot(ox-cx, oy-cy) < KAT_JC_R) o.hp -= KAT_JC_DMG;
                        }
                        // VONG NGOAI bao lay vung meo — dau hieu nhan dang cua Judgement Cut
                        if (!p.katVongNo) p.katVongNo = [];
                        p.katVongNo.push({ x: cx, y: cy, t: 0, T: 20 });
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1400, 0.06, 'square', 0.12, 2400);
                    }
                    p.katTia.splice(i, 1);
                }
            }
            // chem loan xa quanh nguoi (moc J thu hai)
            if (p.katLoan){
                let Lo = p.katLoan; Lo.t++;
                if (Lo.cho > 0){ Lo.cho--; }        // nhip THU KIEM truoc khi loat chem no ra
                else if (Lo.t % 4 === 0){
                    /* Cac nhat chem no QUANH VUNG GIAO TRANH chu khong quanh rieng nguoi
                       choi: bam vao muc tieu gan nhat neu no trong tam. Ban truoc tan ra
                       +-180px quanh nguoi va ban kinh trung chi 70, nen voi boss cach 140px
                       thi gan nhu khong nhat nao trung — do duoc 0 sat thuong. */
                    let ax = p.x + p.w/2, ay = p.y + p.h/2, dg = 1e9;
                    for (const o of katMuc()){
                        if (!o || o.hp === undefined || o.hp <= 0) continue;
                        let d = Math.hypot((o.x+(o.w||20)/2) - ax, (o.y+(o.h||20)/2) - ay);
                        if (d < dg && d < 260){ dg = d; ax = o.x+(o.w||20)/2; ay = o.y+(o.h||20)/2; }
                    }
                    /* Tam no BAM VAO muc tieu voi do lech nho hon ban kinh trung, nen sau
                       nhat deu an — tong 3 + 6 = 9, khong con nhay 5..9 tuy may rui. Cac
                       vet cat VE ra van toa rong quanh nguoi cho dung chat Judgement Cut. */
                    let cx = ax + (Math.random()-0.5)*50;
                    let cy = ay + (Math.random()-0.5)*50;
                    for (let z = 0; z < 3; z++)
                        katVeCat(p, cx + (Math.random()-0.5)*190, cy + (Math.random()-0.5)*150,
                                 40 + Math.random()*45, Math.random()*Math.PI);
                    for (const o of katMuc()){
                        if (!o || o.hp === undefined || o.hp <= 0) continue;
                        let ox = Math.max(o.x, Math.min(cx, o.x + (o.w||20)));
                        let oy = Math.max(o.y, Math.min(cy, o.y + (o.h||20)));
                        if (Math.hypot(ox-cx, oy-cy) < 70) o.hp -= KAT_LOAN_DMG;   // 6 nhat x 1
                    }
                    if (++Lo.n >= KAT_LOAN_SO) p.katLoan = null;
                }
            }
            // Rapid Slash: chem lien tuc doc quang duong
            if (p.katRapid){
                let R = p.katRapid; R.t++;
                p.x += R.dir * (KAT_RAPID_XA / 24);
                if (R.t % 4 === 0 && R.n < KAT_RAPID_SO){
                    R.n++;
                    katFx(p, 'z_dash', 90);         // Rapid Slash: luot toi dam doc duong
                    p._beginSlash(KAT_RAPID_DMG, 6, R.dir, 90, 22, 22, 0);
                }
                if (R.t > 24){
                    p.katRapid = null;
                    // Vergil: GIU tiep sau Rapid Slash thi noi thang Rising Star
                    p.katRapidCS = 34; p.katRapidGiu = 1;
                }
            }
            // Drive: hai vang trang xanh
            if (p.katDrive){
                let D = p.katDrive; D.t++;
                // Hai nhat NHANH GON: bo xuong (khung 1) roi hat nguoc len ngay (khung 8) — hai vang
                // trang ra dung luc luoi kiem quet qua, thanh mot chu V.
                if (D.t === 1 || D.t === 8){
                    if (typeof p.fireCrescent === 'function') p.fireCrescent(D.n === 1, 999, KAT_C2_DMG, D.n === 1);
                    if (++D.n >= KAT_C2_SO) p.katDrive = null;
                }
            }
            // Round Trip: kiem xoay tai cho dich
            if (p.katRT){
                let T = p.katRT; T.t++;
                if (T.cd > 0) T.cd--;
                let song = T.o && T.o.hp !== undefined && T.o.hp > 0;
                if (song){ T.tx = T.o.x + (T.o.w||20)/2; T.ty = T.o.y + (T.o.h||20)/2; }
                if (T.pha === 'bay'){
                    let dx = T.tx - T.x, dy = T.ty - T.y, d = Math.hypot(dx, dy) || 1;
                    T.x += dx/d * 16; T.y += dy/d * 16;
                    if (d < 22 || T.t > 45) T.pha = 'xoay';
                } else if (T.pha === 'xoay'){
                    T.x += ((T.tx - T.x)) * 0.16; T.y += ((T.ty - T.y)) * 0.16;
                    if (T.tong >= KAT_C3_TONG - KAT_C3_DMG || !song) T.pha = 've';
                } else {
                    let dx = (p.x + p.w/2) - T.x, dy = (p.y + p.h/2) - T.y, d = Math.hypot(dx, dy) || 1;
                    T.x += dx/d * 19; T.y += dy/d * 19;
                    if (d < 26) p.katRT = null;
                }
                // cham la an, ke ca luc dang bay ra hay dang quay ve
                if (p.id === 1 && typeof gdCatTron === 'function') gdCatTron(T.x, T.y, 30);   // @@HE-GATDAN
                if (p.katRT && T.cd <= 0) for (const o of katMuc()){
                    if (!o || o.hp === undefined || o.hp <= 0) continue;
                    let ox = Math.max(o.x, Math.min(T.x, o.x + (o.w||20)));
                    let oy = Math.max(o.y, Math.min(T.y, o.y + (o.h||20)));
                    if (Math.hypot(ox-T.x, oy-T.y) < 34){
                        o.hp -= KAT_C3_DMG; T.tong += KAT_C3_DMG; T.cd = KAT_C3_NHIP;
                        if (T.tong >= KAT_C3_TONG) T.pha = 've';
                        break;
                    }
                }
            }
            // Deep Stinger: mui khoan, lai duoc, xuyen qua dich
            if ((p._katNuotJ || 0) > 0) p._katNuotJ--;
            if (p.katKhoan){
                let K = p.katKhoan; K.t++;
                /* Bam J hoac K giua chung = KET THUC SOM: ra ngay nhat Judgement Cut ket don, du sat thuong va hieu
                   ung nhu luc het 3 giay. Nuot luon cu bam do de no khong ra them mot don J / K nua. */
                { let jN = !!keys['KeyJ'], kN = !!keys['KeyK'];
                  if (K.t > 6 && K.t <= KAT_C4_KHUNG && ((jN && !K.jCu) || (kN && !K.kCu))){
                      K.t = KAT_C4_KHUNG + 1;
                      if (kN) p._hoverNuot = true;                 // K dang giu: khong dem charge, nha ra khong ra don
                      if (jN){ p.katJ = 0; p.katJSan = 0; p._katNuotJ = 14; }
                  }
                  K.jCu = jN; K.kCu = kN; }
                let mv = ((keys['KeyD']||keys['ArrowRight'])?1:0) - ((keys['KeyA']||keys['ArrowLeft'])?1:0);
                if (mv){ K.dir = mv; p.isFacingLeft = (mv < 0); }
                p.x += K.dir * 6;
                if (keys['KeyW']) p.y -= 4; else if (keys['KeyS']) p.y += 4;
                p.dy = 0; p.grounded = false;
                /* Mui khoan DAM XUYEN: cham la an, khong xet huong mat. Ban truoc dung
                   `katTrung` (do theo huong dang quay mat) nhung khi lai qua lai thi mat
                   khong doi chieu, va vua vuot qua muc tieu la no nam sau lung -> 0 sat
                   thuong suot 3 giay du cam thay dang xuyen qua nguoi ta. */
                let kx = p.x + p.w/2, ky = p.y + p.h/2;
                for (const o of katMuc()){
                    if (!o || o.hp === undefined || o.hp <= 0) continue;
                    if ((o._katKhCd || 0) > 0){ o._katKhCd--; continue; }
                    let ox = Math.max(o.x, Math.min(kx, o.x + (o.w||20)));
                    let oy = Math.max(o.y, Math.min(ky, o.y + (o.h||20)));
                    if (Math.hypot(ox-kx, oy-ky) < 48 && (o._katKhLan || 0) < KAT_C4_LAN){
                        o.hp -= KAT_C4_DMG; o._katKhCd = 24; o._katKhLan = (o._katKhLan || 0) + 1;
                    }
                }
                if (K.t > KAT_C4_KHUNG){
                    // Het 3 giay: mot nhat Judgement Cut quanh nguoi. Lai sao cho luc nay
                    // dang dung canh dich thi moi an duoc.
                    let jx = p.x + p.w/2, jy = p.y + p.h/2;
                    for (const o of katMuc()){
                        if (!o || o.hp === undefined || o.hp <= 0) continue;
                        o._katKhLan = 0;
                        let ox = Math.max(o.x, Math.min(jx, o.x + (o.w||20)));
                        let oy = Math.max(o.y, Math.min(jy, o.y + (o.h||20)));
                        if (Math.hypot(ox-jx, oy-jy) < KAT_C4_KET_R) o.hp -= KAT_C4_KET_DMG;
                    }
                    for (let i = 0; i < 8; i++)
                        katVeCat(p, jx + (Math.random()-0.5)*KAT_C4_KET_R*1.4,
                                    jy + (Math.random()-0.5)*KAT_C4_KET_R, 34 + Math.random()*36, Math.random()*Math.PI);
                    katFx(p, 'z_spin', KAT_C4_KET_R * 0.7);
                    floatingTexts.push(new FloatingText(p.x - 24, p.y - 36, "CẮT!"));
                    shakeTimer = Math.max(shakeTimer, 22);
                    p.katKhoan = null; p.grounded = false;
                }
            }
            // Channel: kiem bay quanh nguoi
            if (p.katVong){
                let V = p.katVong; V.t++;
                if (V.n < KAT_CH_MAX && V.t % 20 === 0) V.n++;
                let cx = p.x + p.w/2, cy = p.y + p.h/2;
                for (let i = 0; i < V.n; i++){
                    let a = V.t * 0.11 + i * (Math.PI*2 / Math.max(1, V.n));
                    let sx = cx + Math.cos(a) * 76, sy = cy + Math.sin(a) * 60;
                    if (p.id === 1 && typeof gdCatTron === 'function') gdCatTron(sx, sy, 20);   // @@HE-GATDAN
                    for (const o of katMuc()){
                        if (!o || o.hp === undefined || o.hp <= 0) continue;
                        if ((o._katCd || 0) > 0) continue;
                        let ox = Math.max(o.x, Math.min(sx, o.x + (o.w||20)));
                        let oy = Math.max(o.y, Math.min(sy, o.y + (o.h||20)));
                        if (Math.hypot(ox-sx, oy-sy) < 22){ o.hp -= KAT_CH_DMG; o._katCd = 14; }
                    }
                }
            }
            for (const o of katMuc()) if (o && o._katCd > 0) o._katCd--;
            katTickPhong(p);
        }
// PLAYER_PART_END s4.katTick.1

// index.html:52188 · Phạm vi: global
// PLAYER_PART_BEGIN s4.KAT_PHONG_TOC.1 EDITABLE
const KAT_PHONG_TOC = 17, KAT_PHONG_SONG = 100;
// PLAYER_PART_END s4.KAT_PHONG_TOC.1

// index.html:52189 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katNhaChannel.1 EDITABLE
function katNhaChannel(p){
            if (!p.katVong) return;
            let V = p.katVong, n = V.n; p.katVong = null;
            let cx = p.x + p.w/2, cy = p.y + p.h/2;
            let ds = katMuc().filter(o => o && o.hp !== undefined && o.hp > 0 && !o.invulnAll)
                             .sort((a, b) => Math.abs((a.x + (a.w||20)/2) - cx) - Math.abs((b.x + (b.w||20)/2) - cx));
            if (!p.katPhong) p.katPhong = [];
            for (let i = 0; i < n; i++){
                let a = V.t * 0.11 + i * (Math.PI*2 / Math.max(1, n));
                let o = ds.length ? ds[i % Math.min(ds.length, 3)] : null;        // chia toi da 3 muc tieu gan nhat
                p.katPhong.push({ x: cx + Math.cos(a)*76, y: cy + Math.sin(a)*60, a: a + Math.PI/2, o, t: -i * 4,
                                  vx: (p.isFacingLeft ? -1 : 1) * 6, vy: -2, pha: 'bay' });
            }
            floatingTexts.push(new FloatingText(p.x - 20, p.y - 34, n + " KIẾM PHÓNG"));
            shakeTimer = Math.max(shakeTimer, 12);
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1500, 0.12, 'triangle', 0.14, 2600);
        }
// PLAYER_PART_END s4.katNhaChannel.1

// index.html:52206 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katTickPhong.1 EDITABLE
function katTickPhong(p){
            if (!p.katPhong || !p.katPhong.length) return;
            for (let i = p.katPhong.length - 1; i >= 0; i--){
                let S = p.katPhong[i]; S.t++;
                if (S.t <= 0) continue;                                       // cho luot phong (lech nhip tung thanh)
                if (S.pha === 'vang'){                                        // bi dan danh vang: xoay tit, roi, mo dan
                    S.vy += 0.5; S.x += S.vx; S.y += S.vy; S.a += 0.6;
                    if (S.t > 32) p.katPhong.splice(i, 1);
                    continue;
                }
                let o = S.o;
                if (!o || o.hp === undefined || o.hp <= 0){
                    let cx = p.x + p.w/2, best = null, bd = 1e9;
                    for (const q of katMuc()){ if (!q || q.hp === undefined || q.hp <= 0 || q.invulnAll) continue;
                        let d = Math.abs((q.x + (q.w||20)/2) - cx); if (d < bd){ bd = d; best = q; } }
                    S.o = o = best;
                }
                if (o){
                    let tx = o.x + (o.w||20)/2, ty = o.y + (o.h||20)/2, dx = tx - S.x, dy = ty - S.y, l = Math.hypot(dx, dy) || 1;
                    S.vx += (dx / l * KAT_PHONG_TOC - S.vx) * 0.35; S.vy += (dy / l * KAT_PHONG_TOC - S.vy) * 0.35;
                }
                S.x += S.vx; S.y += S.vy; S.a = Math.atan2(S.vy, S.vx);
                // cham DAN dich: chem vo vien dan, kiem bi vang ra
                let vang = false;
                if (typeof bossProjectiles !== 'undefined') for (let k = bossProjectiles.length - 1; k >= 0; k--){
                    let b = bossProjectiles[k]; if (!b) continue;
                    let bx = b.x + (b.w||16)/2, by = b.y + (b.h||16)/2;
                    if (Math.abs(bx - S.x) < 20 + (b.w||16)/2 && Math.abs(by - S.y) < 20 + (b.h||16)/2){
                        visualEffects.push(new Effect(bx, by, 'parry', false));
                        bossProjectiles.splice(k, 1); vang = true; break;
                    }
                }
                if (vang){
                    S.pha = 'vang'; S.t = 0; S.vx = -S.vx * 0.45 + (Math.random() - 0.5) * 3; S.vy = -7;
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1900, 0.05, 'square', 0.12, 700);
                    continue;
                }
                if (o){
                    let ox = Math.max(o.x, Math.min(S.x, o.x + (o.w||20))), oy = Math.max(o.y, Math.min(S.y, o.y + (o.h||20)));
                    if (Math.hypot(ox - S.x, oy - S.y) < 18){
                        o.hp -= KAT_CH_BAN;
                        katVeCat(p, S.x, S.y, 34, S.a + Math.PI/2);
                        visualEffects.push(new Effect(S.x, S.y, 'explosion', true, 14));
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1100, 0.05, 'square', 0.12, 1800);
                        p.katPhong.splice(i, 1); continue;
                    }
                }
                if (S.t > KAT_PHONG_SONG) p.katPhong.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.katTickPhong.1

// index.html:52256 · Phạm vi: global
// PLAYER_PART_BEGIN s4.katUltMo.1 EDITABLE
function katUltMo(){
            return (typeof styleRankNow === 'function') && styleRankNow() >= KAT_ULT_HANG;
        }
// PLAYER_PART_END s4.katUltMo.1

// index.html:52261 · Phạm vi: Player.prototype
const __Part5 = {
// PLAYER_PART_BEGIN s4.Player.prototype.updateJC.1 EDITABLE
updateJC() {
                this.jcTimer++; this.invincible = true; this.invTimer = 30;
                if (this.jcState === 'shake') { shakeTimer = 12; if (this.jcTimer >= 60) { this.jcState = 'rise'; this.jcTimer = 0; } return; }
                let cx = canvas.width / 2 - this.w / 2, cy = 118;
                if (this.jcState === 'rise') {
                    this.x += (cx - this.x) * 0.25; this.y += (cy - this.y) * 0.25; this.dy = 0; this.grounded = false;
                    if (Math.abs(this.x - cx) < 6 && Math.abs(this.y - cy) < 6) { this.x = cx; this.y = cy; this.jcState = 'grow'; this.jcRadius = 12; }
                } else if (this.jcState === 'grow') {
                    this.jcRadius += 9;
                    if (this.jcRadius >= 470) {
                        this.jcState = 'slash'; this.jcTimer = 0; shakeTimer = 60; this.jcSlashes = [];
                        for (let i = 0; i < 16; i++) this.jcSlashes.push({ ang: Math.random() * Math.PI, off: (Math.random() - 0.5) * (this.jcRadius * 1.6), t: i * 2 });
                    }
                } else if (this.jcState === 'slash') {
                    shakeTimer = 26;
                    if (this.jcTimer >= 38) {
                        this.jcState = 'shatter'; this.jcTimer = 0; shakeTimer = 40;
                        let bx = this.x + this.w / 2, by = this.y + this.h / 2, r = this.jcRadius + 40;
                        allTargets().forEach(o => { if (Math.hypot((o.x + o.w / 2) - bx, (o.y + o.h / 2) - by) <= r && !o.invulnAll) o.hp -= 100; });
                        SFX.muteAll = false; SFX.glassBreak();
                    }
                } else if (this.jcState === 'shatter') {
                    if (this.jcTimer >= 26) this.jcState = 'return';
                } else if (this.jcState === 'return') {
                    this.x += (this.jcReturnX - this.x) * 0.2;
                    if (Math.abs(this.x - this.jcReturnX) < 8) {
                        this.x = this.jcReturnX; this.jcState = null; this.invincible = false; this.invTimer = 24;
                        SFX.muteAll = false;
                        if (!dojoMode && (gameState === 'normal' || gameState === 'boss_rush' || gameState === 'test_boss')) SFX.startMusic();
                    }
                }
            }
// PLAYER_PART_END s4.Player.prototype.updateJC.1
};

// index.html:52293 · Phạm vi: Player.prototype
const __Part6 = {
// PLAYER_PART_BEGIN s4.Player.prototype.drawJC.1 EDITABLE
drawJC() {
                if (!this.jcState || this.jcState === 'rise') return;
                let cx = this.x + this.w / 2, cy = this.y + this.h / 2;
                if (this.jcState === 'grow' || this.jcState === 'slash') {
                    let grad = ctx.createRadialGradient(cx, cy, this.jcRadius * 0.25, cx, cy, this.jcRadius);
                    grad.addColorStop(0, 'rgba(190,190,200,0.12)'); grad.addColorStop(0.75, 'rgba(120,120,132,0.34)'); grad.addColorStop(1, 'rgba(210,210,220,0.62)');
                    ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(cx, cy, this.jcRadius, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = 'rgba(235,235,245,0.85)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, this.jcRadius, 0, Math.PI * 2); ctx.stroke();
                }
                if (this.jcState === 'slash') {
                    ctx.save(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.shadowBlur = 8; ctx.shadowColor = '#fff';
                    this.jcSlashes.forEach(sl => { if (this.jcTimer >= sl.t) {
                        let dx = Math.cos(sl.ang), dy = Math.sin(sl.ang), px = -dy, py = dx, L = this.jcRadius * 1.5;
                        let ox = cx + px * sl.off, oy = cy + py * sl.off;
                        ctx.globalAlpha = Math.max(0, 1 - (this.jcTimer - sl.t) / 16);
                        ctx.beginPath(); ctx.moveTo(ox - dx * L, oy - dy * L); ctx.lineTo(ox + dx * L, oy + dy * L); ctx.stroke();
                    } });
                    ctx.restore(); ctx.globalAlpha = 1;
                }
                if (this.jcState === 'shatter') {
                    ctx.strokeStyle = 'rgba(220,220,235,' + Math.max(0, 1 - this.jcTimer / 26) + ')'; ctx.lineWidth = 2;
                    for (let i = 0; i < 18; i++) { let a = i / 18 * Math.PI * 2, r1 = this.jcRadius * 0.4 + this.jcTimer * 5, r2 = this.jcRadius * 0.5 + this.jcTimer * 11;
                        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2); ctx.stroke(); }
                }
            }
// PLAYER_PART_END s4.Player.prototype.drawJC.1
};

// index.html:52321 · Phạm vi: Player.prototype
const __Part7 = {
// PLAYER_PART_BEGIN s4.Player.prototype.addClawSword.1 EDITABLE
addClawSword() {
                if (this.clawSwords.length >= clawSwordCap()) return;
                this.clawSwords.push({ a: Math.random() * 6.28, r: 50 + Math.random() * 30, guard: false });
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880 + this.clawSwords.length * 22, 0.05, 'triangle', 0.10, 1400);
            }
// PLAYER_PART_END s4.Player.prototype.addClawSword.1
};

// index.html:52326 · Phạm vi: Player.prototype
const __Part8 = {
// PLAYER_PART_BEGIN s4.Player.prototype.launchClawSwords.1 EDITABLE
launchClawSwords(voluntary) {
                let n = this.clawSwords.length; if (n <= 0) return;
                let keep = (voluntary && n >= clawSwordCap()) ? 5 : 0;
                let cxp = this.x + this.w/2, cyp = this.y + this.h/2;
                for (let i = 0; i < n - keep; i++) {
                    let s = this.clawSwords[i];
                    this.clawFlying.push({ x: cxp + Math.cos(s.a) * s.r, y: cyp + Math.sin(s.a) * s.r, ang: 0, t: 0, tgt: null, delay: i * 3 });
                }
                if (keep > 0) {
                    this.clawGuard = 60; this.clawGuardHits = new Map(); this.clawSwords = [];
                    for (let k = 0; k < 5; k++) this.clawSwords.push({ a: k * (Math.PI * 2 / 5), r: 64, guard: true });
                    floatingTexts.push(new FloatingText(this.x, this.y - 34, "KIẾM VỆ!"));
                } else this.clawSwords = [];
                shakeTimer = Math.max(shakeTimer, 12);
                if (typeof SFX !== 'undefined' && SFX.glassBreak) SFX.glassBreak();
            }
// PLAYER_PART_END s4.Player.prototype.launchClawSwords.1
};

// index.html:52342 · Phạm vi: Player.prototype
const __Part9 = {
// PLAYER_PART_BEGIN s4.Player.prototype.tickClawSwords.1 EDITABLE
tickClawSwords() {
                let cxp = this.x + this.w/2, cyp = this.y + this.h/2;
                for (let s of this.clawSwords) s.a += s.guard ? 0.17 : 0.022;
                // ---- 5 KIEM VE: xoay NGANG quanh nguoi, chem dich va pha dan bay toi ----
                if (this.clawGuard > 0) {
                    this.clawGuard--;
                    for (let s of this.clawSwords) {
                        let sx = cxp + Math.cos(s.a) * s.r, sy = cyp + Math.sin(s.a) * s.r * 0.34;
                        for (let i = bossProjectiles.length - 1; i >= 0; i--) {
                            let bp = bossProjectiles[i];
                            if (Math.hypot((bp.x + bp.w/2) - sx, (bp.y + bp.h/2) - sy) < 28) {
                                visualEffects.push(new Effect(bp.x, bp.y, 'parry')); bossProjectiles.splice(i, 1);
                            }
                        }
                        for (let o of enemies.concat(bosses)) {
                            if (o.invulnAll) continue;
                            if (Math.hypot((o.x + o.w/2) - sx, (o.y + o.h/2) - sy) < (o.w/2 + 24)) {
                                let last = this.clawGuardHits.get(o); if (last === undefined) last = -999;
                                if (frames - last > 20) { this.clawGuardHits.set(o, frames); o.hp -= 2;
                                    visualEffects.push(new Effect(sx, sy, 'explosion', true, 12)); }
                            }
                        }
                    }
                    if (this.clawGuard <= 0) this.clawSwords = [];
                }
                // ---- KIEM DANG BAY: tu tim dich, dich chet thi doi sang con khac ----
                for (let i = this.clawFlying.length - 1; i >= 0; i--) {
                    let f = this.clawFlying[i];
                    if (f.delay > 0) { f.delay--; continue; }
                    f.t++;
                    if (this.id === 1 && typeof gdCatTron === 'function') gdCatTron(f.x, f.y, 18);   // @@HE-GATDAN
                    let alive = f.tgt && f.tgt.hp > 0 && (enemies.indexOf(f.tgt) >= 0 || bosses.indexOf(f.tgt) >= 0) && !f.tgt.invulnAll;
                    if (!alive) {
                        let best = null, bd = 99999;
                        for (let o of bosses.concat(enemies)) { if (o.hp <= 0 || o.invulnAll) continue;
                            let d = Math.hypot((o.x + o.w/2) - f.x, (o.y + o.h/2) - f.y); if (d < bd) { bd = d; best = o; } }
                        f.tgt = best;
                    }
                    if (!f.tgt) { f.x += (this.isFacingLeft ? -18 : 18); f.ang = this.isFacingLeft ? Math.PI : 0;
                        if (f.t > 60 || f.x < worldL() - 40 || f.x > worldR() + 40) this.clawFlying.splice(i, 1); continue; }
                    let tx = f.tgt.x + f.tgt.w/2, ty = f.tgt.y + f.tgt.h/2;
                    let dx = tx - f.x, dy = ty - f.y, d = Math.hypot(dx, dy) || 1;
                    f.x += dx / d * 21; f.y += dy / d * 21; f.ang = Math.atan2(dy, dx);
                    if (d < 28) { f.tgt.hp -= 2; if (gameState !== 'pvp') score += 1;
                        visualEffects.push(new Effect(f.x, f.y, 'explosion', true, 14)); this.clawFlying.splice(i, 1); continue; }
                    if (f.t > 200) this.clawFlying.splice(i, 1);
                }
            }
// PLAYER_PART_END s4.Player.prototype.tickClawSwords.1
};

// index.html:52390 · Phạm vi: Player.prototype
const __Part10 = {
// PLAYER_PART_BEGIN s4.Player.prototype.drawClawSwords.1 EDITABLE
drawClawSwords() {
                let cxp = this.x + this.w/2, cyp = this.y + this.h/2;
                let blade = (sx, sy, ang, sc) => {
                    ctx.save(); ctx.translate(sx, sy); ctx.rotate(ang);
                    ctx.fillStyle = "#E8EEF5"; ctx.fillRect(-4 * sc, -1.6 * sc, 26 * sc, 3.2 * sc);
                    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(-4 * sc, -0.7 * sc, 26 * sc, 1.4 * sc);
                    ctx.fillStyle = "#90A4AE"; ctx.fillRect(-9 * sc, -3.4 * sc, 4 * sc, 6.8 * sc);
                    ctx.restore();
                };
                for (let s of this.clawSwords) {
                    let sx = cxp + Math.cos(s.a) * s.r, sy = cyp + Math.sin(s.a) * s.r * (s.guard ? 0.34 : 1);
                    ctx.globalAlpha = s.guard ? 1 : 0.9;
                    ctx.shadowBlur = 8; ctx.shadowColor = "#B3E5FC";
                    blade(sx, sy, s.a + Math.PI/2, 1.15);
                    ctx.shadowBlur = 0; ctx.globalAlpha = 1;
                }
                for (let f of this.clawFlying) {
                    if (f.delay > 0) continue;
                    ctx.shadowBlur = 10; ctx.shadowColor = "#E1F5FE";
                    blade(f.x, f.y, f.ang || 0, 1.3);
                    ctx.shadowBlur = 0;
                }
                // dem so kiem dang giu
                if (this.clawChannel && this.clawSwords.length > 0) {
                    ctx.fillStyle = this.clawSwords.length >= clawSwordCap() ? "#FFD54F" : "#E1F5FE";
                    ctx.font = "bold 13px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText(this.clawSwords.length + "/" + clawSwordCap(), cxp, this.y - 26); ctx.textAlign = "left";
                }
            }
// PLAYER_PART_END s4.Player.prototype.drawClawSwords.1
};

// index.html:52419 · Phạm vi: Player.prototype
const __Part11 = {
// PLAYER_PART_BEGIN s4.Player.prototype.tickClawJCircles.1 EDITABLE
tickClawJCircles() {
                if (!this.clawJCircles || !this.clawJCircles.length) return;
                for (let i = this.clawJCircles.length - 1; i >= 0; i--) {
                    let c = this.clawJCircles[i]; c.timer++;
                    if (c.r < c.maxR) c.r = Math.min(c.maxR, c.r + c.maxR / 6);
                    if (!c.applied && c.timer >= 6) {
                        c.applied = true;
                        allTargets().forEach(o => { if (!o.invulnAll && Math.hypot((o.x + o.w/2) - c.x, (o.y + o.h/2) - c.y) <= c.maxR) o.hp -= c.dmg; });
                        if (typeof SFX !== 'undefined') { if (c.big && SFX.glassBreak) SFX.glassBreak(); else if (SFX.tone) SFX.tone(700, 0.07, 'square', 0.11, 820); }
                    }
                    if (c.timer >= c.life) this.clawJCircles.splice(i, 1);
                }
            }
// PLAYER_PART_END s4.Player.prototype.tickClawJCircles.1
};

// index.html:52432 · Phạm vi: Player.prototype
const __Part12 = {
// PLAYER_PART_BEGIN s4.Player.prototype.drawClawJCircles.1 EDITABLE
drawClawJCircles() {
                if (!this.clawJCircles || !this.clawJCircles.length) return;
                ctx.save();
                for (let c of this.clawJCircles) {
                    let a = Math.max(0, 1 - c.timer / c.life);
                    let grad = ctx.createRadialGradient(c.x, c.y, c.r * 0.25, c.x, c.y, c.r);
                    grad.addColorStop(0, 'rgba(190,200,235,' + (0.10 * a) + ')'); grad.addColorStop(0.75, 'rgba(110,120,160,' + (0.30 * a) + ')'); grad.addColorStop(1, 'rgba(190,205,255,' + (0.55 * a) + ')');
                    ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = 'rgba(120,200,255,' + (0.9 * a) + ')'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.stroke();
                    ctx.strokeStyle = 'rgba(255,255,255,' + a + ')'; ctx.lineWidth = 2; ctx.shadowBlur = 8; ctx.shadowColor = '#8ecbff';
                    for (let sl of c.slashes) { let dx = Math.cos(sl.ang), dy = Math.sin(sl.ang), L = c.r * 1.4, ox = c.x + (-dy) * sl.off, oy = c.y + dx * sl.off; ctx.beginPath(); ctx.moveTo(ox - dx * L, oy - dy * L); ctx.lineTo(ox + dx * L, oy + dy * L); ctx.stroke(); }
                }
                ctx.restore(); ctx.globalAlpha = 1;
            }
// PLAYER_PART_END s4.Player.prototype.drawClawJCircles.1
};

// index.html:52446 · Phạm vi: Player.prototype
const __Part13 = {
// PLAYER_PART_BEGIN s4.Player.prototype.katanaTick.1 EDITABLE
katanaTick(){ if (typeof katTick === 'function') katTick(this); }
// PLAYER_PART_END s4.Player.prototype.katanaTick.1
};

// index.html:52447 · Phạm vi: Player.prototype
const __Part14 = {
// PLAYER_PART_BEGIN s4.Player.prototype.katanaVe.1 EDITABLE
katanaVe(){ if (typeof katVeTat === 'function'){
                /* KHONG ve `katVeTay` nua: cay katana gio la tier 3 cua chinh cay kiem goc
                   (xem `dswTier`), nen no dung hoat anh vung san co va khong bi de len. */
                /* KHONG con `katVeQuet`: no ve THEM mot luoi katana chay doc cung don, to
                   hon va chay theo dong ho rieng (T=16) nen tre nhip so voi cay kiem that.
                   Cay kiem that la tier 3 cua `drawDinoSwordArt`, da khop san voi vet chem. */
                katVeTia(this); katVeVongNo(this); katVeTat(this); katVeVong(this);
                katVeChargeJ(this); katVeMoc(this);
            } }
// PLAYER_PART_END s4.Player.prototype.katanaVe.1
};

// index.html:52458 · Phạm vi: Player.prototype
const __Part15 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dswNap.1 EDITABLE
dswNap(){
                if (currentAmmoType !== 5) return 0;
                return Math.max(0, Math.min(1, (this.aKeyHeldTime || 0) / 120));
            }
// PLAYER_PART_END s4.Player.prototype.dswNap.1
};

// index.html:52465 · Phạm vi: Player.prototype
const __Part16 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dswVeNap.1 EDITABLE
dswVeNap(){
                if (currentAmmoType !== 5) return;
                let h = this.aKeyHeldTime || 0;
                if (h <= 0){ this._dswMocTruoc = 0; return; }
                const MOC = [15, 30, 60, 90, 120];
                let bac = 0; for (let i = 0; i < MOC.length; i++) if (h >= MOC[i]) bac = i + 1;
                if (bac !== (this._dswMocTruoc || 0)){
                    this._dswMocTruoc = bac;
                    if (bac > 0){ this._dswLoe = 12;
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(600 + bac * 190, 0.05, 'square', 0.10, 1600); }
                }
                let col = (typeof dswBladeCol === 'function') ? dswBladeCol() : '#FFFFFF';
                let nap = this.dswNap(), dir = this.isFacingLeft ? -1 : 1;
                let cx = this.x + this.w/2 + dir * 16, cy = this.y + this.h * 0.34;
                ctx.save();
                // hao quang bam quanh luoi, day dan theo do tich
                ctx.globalAlpha = 0.20 + 0.52 * nap;
                ctx.strokeStyle = col; ctx.lineWidth = 2 + 5 * nap;
                ctx.beginPath(); ctx.arc(cx, cy, 16 + 16 * nap, 0, Math.PI * 2); ctx.stroke();
                // hat sang xoay quanh
                ctx.globalAlpha = 0.35 + 0.5 * nap; ctx.fillStyle = col;
                for (let i = 0; i < 3; i++){
                    let a2 = frames * 0.16 + i * 2.09, r2 = 20 + 18 * nap;
                    ctx.beginPath(); ctx.arc(cx + Math.cos(a2) * r2, cy + Math.sin(a2) * r2, 1.6 + 2.2 * nap, 0, Math.PI * 2); ctx.fill();
                }
                // nam cham nho: moc nao da qua thi sang han
                ctx.globalAlpha = 1;
                for (let i = 0; i < MOC.length; i++){
                    let on = h >= MOC[i];
                    ctx.fillStyle = on ? col : 'rgba(255,255,255,0.18)';
                    ctx.fillRect(cx - 18 + i * 9, cy - 34, 6, on ? 6 : 4);
                }
                // loe khi vua qua mot moc
                if (this._dswLoe > 0){
                    let u = this._dswLoe / 12;
                    ctx.globalAlpha = u * 0.8; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 3 * u + 1;
                    ctx.beginPath(); ctx.arc(cx, cy, 22 + 46 * (1 - u), 0, Math.PI * 2); ctx.stroke();
                    this._dswLoe--;
                }
                ctx.restore(); ctx.globalAlpha = 1;
            }
// PLAYER_PART_END s4.Player.prototype.dswVeNap.1
};

// index.html:52506 · Phạm vi: Player.prototype
const __Part17 = {
// PLAYER_PART_BEGIN s4.Player.prototype.clawSlash.1 EDITABLE
clawSlash() {
                // @@HE-SHIPBO — HAI DON RIENG, khong don nao nuot don nao:
                //  1) DASH + J  = SHIPPUUGA goc (chem ngang xuyen thau) — van con nguyen.
                //  2) J -> LUOT = CHEM LEN tu dong, roi J tiep = CHEM TAM XA.
                // Nhanh (2) duoc kiem truoc vi luc do cua so `_shipNoi` dang mo; het cua so
                // thi J trong luc luot lai roi ve dung Shippuuga goc.
                if ((this._shipNoi || 0) > 0){ this.shippuugaBo(); return; }
                if (this.grounded && dangLuotHoacChop()) { this.shippuuga(); return; }
                // TREN KHONG: thay hoan toan nhat chem thuong (dung nhu X4 — Kuuenzan de len midair slash)
                if (!this.grounded) { if (keys['KeyS']) this.hyouretsuzan(); else this.kuuenzan(); return; }
                // CUI + J: CHEM NGANG sat dat — ra nhanh hon, voi xa hon mot chut, sat thuong nhu nhat thuong.
                // KHONG phai combo: xong la khoa hoi don dai hon nen khong spam lien tuc duoc.
                if (keys['KeyS'] || keys['ArrowDown']) { this.clawCui(); return; }

                this.ammo--;
                let sScale = this.getFormScale();
                let dir = this.isFacingLeft ? -1 : 1;
                if (this._cuiNoiF && frames - this._cuiNoiF <= 40){          // @@HE-CUINOI: dung day noi tu cu cui -> mo dau combo J J J
                    this._cuiNoiF = 0; this.clawCombo = 0; this.clawComboWindow = 46;
                    floatingTexts.push(new FloatingText(this.x - 14, this.y - 30, LT("NỐI!", "LINK!")));
                }

                if ((this.clawComboWindow || 0) <= 0) this.clawCombo = 0;   // qua cua so -> ve nhat dau
                let step = this.clawCombo || 0;

                // reach = tam voi, hTop/hBot = no ra tren/duoi than -> tao hinh dang DOC vs NGANG
                let reach, hTop, hBot, dmg, kind, fxR;
                if (step === 0)      { reach =  70 * sScale; hTop = 26; hBot = 14; dmg = 3; kind = 'z_vert'; fxR =  76 * sScale; }   // DOC: cao, hep
                else if (step === 1) { reach = 100 * sScale; hTop =  2; hBot =  2; dmg = 3; kind = 'z_horz'; fxR = 102 * sScale; }   // NGANG: dai, det
                else                 { reach = 126 * sScale; hTop = 30; hBot = 22; dmg = 4; kind = 'z_big';  fxR = 142 * sScale; }   // CHEM TO: vong tu sau lung qua dau (@@HE-KIEMNGANG)

                this._slashFx(kind, dir === -1, fxR);
                this._beginSlash(dmg, (step >= 2) ? 16 : 12, dir, reach, hTop, hBot, 0);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(step >= 2 ? 300 : (step === 1 ? 520 : 620), step >= 2 ? 0.16 : 0.07, 'square', step >= 2 ? 0.20 : 0.12, step >= 2 ? 180 : 900);

                this.clawRiseWindow = 38;   // bam NHAY trong khoang nay -> RYUENJIN (chem hat len)
                if (step >= 2) { this.clawCombo = 0; this.clawComboWindow = 0; this.attackCooldown = 40; }   // xong combo -> khoa
                else           { this.clawCombo = step + 1; this.clawComboWindow = 46; this.attackCooldown = 20; }

                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.clawSlash.1
};

// index.html:52547 · Phạm vi: Player.prototype
const __Part18 = {
// PLAYER_PART_BEGIN s4.Player.prototype.clawCui.1 EDITABLE
clawCui() {
                this.ammo--;
                let sScale = this.getFormScale(), dir = this.isFacingLeft ? -1 : 1;
                this._slashFx('z_horz', dir === -1, 118 * sScale);
                this._beginSlash(3, 9, dir, 116 * sScale, 4, 8, 0);          // nhat ngang thuong: 12 khung, tam 100
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(560, 0.06, 'square', 0.12, 1000);
                this.clawCombo = 0; this.clawComboWindow = 0; this.clawRiseWindow = 0;
                this.attackCooldown = 32;                                    // khong noi combo, khong spam
                this._cuiNoiF = frames;                                      // @@HE-CUINOI: dung day chem thi ra nhanh
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.clawCui.1
};

// index.html:52559 · Phạm vi: Player.prototype
const __Part19 = {
// PLAYER_PART_BEGIN s4.Player.prototype.kuuenzan.1 EDITABLE
kuuenzan() {
                this.ammo--; this.attackCooldown = 20;
                let sScale = this.getFormScale(), R = 66 * sScale;
                this._slashFx('z_spin', this.isFacingLeft, R);
                this._beginSlash(3, DSW_XOAY_DAI, this.isFacingLeft ? -1 : 1, 0, 0, 0, R);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(700, 0.10, 'square', 0.13, 1100);
                this.clawCombo = 0; this.clawComboWindow = 0;
                // ===== @@HE-XOAYKHONG — GIU J thi xoay tiep cho toi khi cham dat =====
                // Mo cua so xoay lien tuc. Moi vong ton them 1 the luc, va cu bo cuoi cung
                // cung ton — nen chuoi cang dai thi cang phai tra gia bang ca thanh the luc.
                this.xoayKhong = { vong: 1, cho: DSW_XOAY_NHIP };
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.kuuenzan.1
};

// index.html:52574 · Phạm vi: Player.prototype
const __Part20 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dswXoayTick.1 EDITABLE
dswXoayTick(){
                let X = this.xoayKhong; if (!X) return;
                if (currentAmmoType !== 5 || this.ultActive || this.clawDive > 0 || this.jcState){ this.xoayKhong = null; if (this.clawDive <= 0 && typeof slamLaoHuy === 'function') slamLaoHuy(this); return; }
                let giuJ = !!(keys['KeyJ']) || X.het;
                if (this.grounded){
                    this.xoayKhongKet(X.vong);
                    this.xoayKhong = null; return;
                }
                if (!giuJ){ this.xoayKhong = null; if (typeof slamLaoHuy === 'function') slamLaoHuy(this); return; }
                // Roi VOI TOC DO BINH THUONG — khong ghim dy nua.
                // VAO VONG MOI khi vong hien tai da QUET XONG. Truoc day toi dem cung 15 khung,
                // ma mot nhat z_spin keo 42 khung (lay da + quet + thu kiem), nen no bi cat o
                // khoang mot phan ba: cay kiem chua di het vong da bi giat ve dau. Gio doi cho
                // toi khi doan QUET ket thuc roi moi noi vong sau — swordSwing lay goc hien tai
                // lam goc bat dau nen hai vong noi lien mach thanh mot duong tron that su.
                if (X.cho > 0){ X.cho--; return; }
                // Doi cho vong hien tai QUET XONG han. Mot nhat gom ba doan: lay da -> quet ->
                // thu kiem. dswGrip = 1 dung trong doan QUET. Neu chi hoi "grip < 1" thi ngay
                // doan LAY DA cung thoa, va vong moi lai no ra khi cay kiem chua kip di dau —
                // dung cai loi "vung chua xong lai vung tiep". Nen phai ghi nhan da VAO duoc
                // doan quet truoc, roi moi tinh la xong khi no roi khoi doan do.
                if (this.swordPose && this.swordPose.t0 && typeof dswGrip === 'function'){
                    let g = dswGrip(this.swordPose);
                    if (g >= 0.999){ X.daQuet = true; return; }
                    if (!X.daQuet) return;
                }
                X.daQuet = false;
                if (this.ammo <= 0 || this.isOverheated){
                    // Het the luc thi NGUNG XOAY nhung VAN giu cua so, de cu tiep dat con
                    // duoc tinh — no se tu bao "het the luc" neu khong tra noi.
                    X.het = true; return;
                }
                X.cho = DSW_XOAY_NHIP; X.vong++;
                if (X.vong >= 2 && typeof slamLaoBat === 'function') slamLaoBat(this);   // @@HE-SLAMLAO: xoay LIEN TUC toi dat
                this.ammo = Math.max(0, this.ammo - 1);
                let sc = this.getFormScale(), R = 66 * sc;
                this._slashFx('z_spin', this.isFacingLeft, R);
                this._beginSlash(3, DSW_XOAY_DAI, this.isFacingLeft ? -1 : 1, 0, 0, 0, R);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(700 + X.vong * 40, 0.08, 'square', 0.12, 1200);
            }
// PLAYER_PART_END s4.Player.prototype.dswXoayTick.1
};

// index.html:52616 · Phạm vi: Player.prototype
const __Part21 = {
// PLAYER_PART_BEGIN s4.Player.prototype.xoayKhongKet.1 EDITABLE
xoayKhongKet(vong){
                if (vong < 2) return;                          // xoay dung mot vong roi tiep dat: khong tinh
                let cost = 1;
                if (this.ammo < cost){                         // khong du the luc -> chi tiep dat suong
                    floatingTexts.push(new FloatingText(this.x - 30, this.y - 26, "HẾT THỂ LỰC"));
                    return;
                }
                this.ammo = Math.max(0, this.ammo - cost);
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 150; }
                let dmg = Math.min(DSW_XOAY_TRAN, DSW_XOAY_GOC + (vong - 2));
                let sc = this.getFormScale(), R = Math.round((92 + vong * 9) * sc);
                let r = { x: this.x + this.w/2 - R, y: this.y + this.h - 40, w: R * 2, h: 62 };
                this.meleeStrike(r, dmg);
                this._slashFx('z_big', this.isFacingLeft, R);
                visualEffects.push(new Effect(this.x + this.w/2, this.y + this.h, 'explosion', true, 30));
                for (let k = 0; k < 6; k++)
                    visualEffects.push(new Effect(this.x + this.w/2 + (Math.random()-0.5)*R*1.6,
                                                  this.y + this.h - 6, 'explosion', true, 18));
                shakeTimer = Math.max(shakeTimer, 14 + vong * 2);
                floatingTexts.push(new FloatingText(this.x - 34, this.y - 30, "BỔ ĐỊA  " + dmg));
                this.attackCooldown = 26;
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(150, 0.26, 'sawtooth', 0.26, 70); }
            }
// PLAYER_PART_END s4.Player.prototype.xoayKhongKet.1
};

// index.html:52640 · Phạm vi: Player.prototype
const __Part22 = {
// PLAYER_PART_BEGIN s4.Player.prototype.hyouretsuzan.1 EDITABLE
hyouretsuzan() {
                this.ammo--; this.attackCooldown = 22;
                this.clawDive = 30; this.dy = 17;
                if (typeof slamLaoBat === 'function') slamLaoBat(this);   // @@HE-SLAMLAO
                let sScale = this.getFormScale();
                this._slashFx('z_dive', this.isFacingLeft, 86 * sScale);
                this.swordSwing('z_dive', 26, 18);
                if (this._fxE) { for (let _e of this._fxE) { _e.pose = this.swordPose; _e.life = this.swordPose.t0 + 2;
                    _e.swordCol = (typeof dswBladeCol === 'function') ? dswBladeCol() : null; } this._fxE = null; }
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(240, 0.18, 'sawtooth', 0.20, 140);
                this.clawCombo = 0; this.clawComboWindow = 0;
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.hyouretsuzan.1
};

// index.html:52654 · Phạm vi: Player.prototype
const __Part23 = {
// PLAYER_PART_BEGIN s4.Player.prototype.ryuenjin.1 EDITABLE
ryuenjin() {
                this.ammo--; this.attackCooldown = 26;
                this.clawRiseWindow = 0; this.clawCombo = 0; this.clawComboWindow = 0;
                this.dy = -13.5; this.grounded = false; this.canDoubleJump = false; this.hoverArmed = false;
                let sScale = this.getFormScale(), dir = this.isFacingLeft ? -1 : 1;
                let reach = 84 * sScale, up = 76 * sScale;
                this._slashFx('z_rise', dir === -1, 98 * sScale);
                this._beginSlash(3, 16, dir, reach, up, 0, 0);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(420, 0.20, 'square', 0.20, 1500);
                if (this.ammo <= 0) { this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.ryuenjin.1
};

// index.html:52667 · Phạm vi: Player.prototype
const __Part24 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsLaoXuyen.1 EDITABLE
dsLaoXuyen(){
                this.ammo = Math.max(0, this.ammo - 2); this.attackCooldown = 70;
                this.dsLao = { pha: 'lao', t: 0, dir: this.isFacingLeft ? -1 : 1, hit: new Set(),
                               sm: (typeof hasRune === 'function' && hasRune('swordmaster')), vet: [],
                               batX: this.x + this.w/2, batY: this.y + this.h/2,
                               rib: [], cat: [] };   // rib = dai lua bam theo nguoi | cat = cac VET KIEM da cat roi
                this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 26);
                // DONG TAC KIEM: dang thuong vung MOT nhat, Swordmaster vung HAI nhat noi tiep
                this.swordSwing('z_far', 14, 10);
                if (this.dsLao.sm) this.dsSwing2 = 12;      // nhat thu hai sau 12 khung
                floatingTexts.push(new FloatingText(this.x - 24, this.y - 32, 'LAO XUYÊN!'));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(240, 0.18, 'sawtooth', 0.24, 1400);
                shakeTimer = Math.max(shakeTimer, 16);
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 160; }
            }
// PLAYER_PART_END s4.Player.prototype.dsLaoXuyen.1
};

// index.html:52682 · Phạm vi: Player.prototype
const __Part25 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsTick.1 EDITABLE
dsTick(){
                if (this.dsSwing2 > 0){ this.dsSwing2--; if (this.dsSwing2 === 0) this.swordSwing('z_big', 14, 10); }
                if (this.dsLao){
                    let L = this.dsLao; L.t++;
                    if (L.pha === 'lao' || L.pha === 've'){
                        // LUOT kieu Lightning Dash: xa han, tan anh day dac, XUYEN QUA muc tieu
                        let sg = (L.pha === 've') ? -L.dir : L.dir;
                        this.x += sg * 36;   // dung toc do cua Lightning Dash
                        this.x = Math.max(worldL(), Math.min(worldR() - this.w, this.x));
                        this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 8);
                        spawnAfterimage(); spawnAfterimage();
                        L.rib.push({ x: this.x + this.w/2, y: this.y + this.h/2 });
                        if (L.rib.length > 12) L.rib.shift();
                        // Ghi lai BIEN quang duong qua CA HAI luot. Truoc day chi chot ketX cua
                        // luot cuoi, nen khi Swordmaster luot VE thi doan duong co lai gan bang 0
                        // -> nhat chem ket bi don het quanh cho nguoi choi dung.
                        { let cx = this.x + this.w/2;
                          L.xMin = (L.xMin === undefined) ? cx : Math.min(L.xMin, cx);
                          L.xMax = (L.xMax === undefined) ? cx : Math.max(L.xMax, cx); }
                        let R = { x: this.x - 8, y: this.y - 6, w: this.w + 16, h: this.h + 12 };
                        if (this.id === 1 && typeof doChieuThu === 'function') doChieuThu(L, R, 6);   // @@HE-DOCHIEU: LAO XUYEN qua diem do = thang do
                        if (this.id === 1 && typeof gdCatHop === 'function') gdCatHop(R);   // @@HE-GATDAN
                        for (let o of allTargets()){
                            if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0 || L.hit.has(o)) continue;
                            if (!checkAABB(R, o)) continue;
                            L.hit.add(o);
                            if (typeof dealDamage === 'function') dealDamage(o, 5, 'ammo'); else o.hp -= 5;
                            o._uFreeze = 45;                       // KHUNG lai 0.75 giay
                            visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 26));
                            // de lai NHAT CHEM ngay sau lung muc tieu vua xuyen qua
                            // Vet tren muc tieu vua xuyen qua — cung kieu vet kiem, cho dong bo
                            { let vx = o.x + (o.w||20)/2 + sg * ((o.w||20)/2 + 18);
                              let vy = o.y + (o.h||20)/2;
                              // goc NGAU NHIEN quanh huong luot -> chem loan xa, khong phai
                              // mot goc cheo duy nhat nhu ban truoc.
                              let g = (sg > 0 ? 0 : Math.PI) + (Math.random() - 0.5) * 0.7;
                              this.dsCat(L, vx, vy, g, 118, 20, 7); }
                            L.cuoiX = o.x + (o.w||20)/2; L.cuoiY = o.y + (o.h||20)/2;   // nho cho vua xuyen qua
                        }
                        if (L.t >= 14){
                            // CAT ROI: dai lua thoi bam theo nguoi, dong lai thanh mot vet kiem
                            if (L.rib.length > 1){
                                let a0 = L.rib[0], b0 = L.rib[L.rib.length - 1];
                                // Nghieng NGUOC chieu nhau -> hai nhat cat thanh chu X ro rang,
                                // thay vi nam chong len nhau nhu truoc.
                                // Nhat LAO va nhat VE phai CHEO NHAU that su: khac nhau ve GOC
                                // (~68 do), khong phai chi nang cao/ha thap cung mot goc.
                                let ng = (L.pha === 've') ? -1 : 1;
                                let truc = (L.dir > 0 ? 0 : Math.PI);
                                let g = truc + ng * 0.60;
                                this.dsCat(L, (a0.x + b0.x) / 2, (a0.y + b0.y) / 2, g, 205, 26, 5);
                                L.rib = [];
                                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1750, 0.07, 'triangle', 0.18, 2600);
                            }
                            if (L.pha === 'lao' && L.sm){          // SWORDMASTER: lao xong LUOT VE cuc nhanh
                                L.pha = 've'; L.t = 0; L.hit = new Set();
                                floatingTexts.push(new FloatingText(this.x - 20, this.y - 32, 'LƯỢT VỀ!'));
                            } else {
                                // Nhat chem ket dat o CHO VUA XUYEN QUA, khong phai cho Dino dung lai —
                                // luot 476px thi Dino da vuot xa muc tieu, dat o day la chem vao khong khi.
                                // Nhat chem ket dat tren QUANG DUONG DA LUOT QUA:
                                //   co muc tieu -> ngay cho vua xuyen qua
                                //   khong trung ai -> GIUA quang duong, KHONG BAO GIO o cho Dino dang dung.
                                // Day la loi toi lap lai nhieu lan: khi luot hut thi moc mac dinh roi
                                // ve chinh nguoi choi, nen nhat chem hien ngay tren dau minh.
                                L.pha = 'cho'; L.t = 0;
                                // CHOT diem cuoi quang duong (truoc day khong bao gio duoc gan
                                // nen xA/xB tut ve moc mac dinh = cho Dino dang dung).
                                L.ketX = this.x + this.w / 2;
                                L.mx = (L.cuoiX !== undefined) ? L.cuoiX : ((L.batX + L.ketX) / 2);
                                L.my = (L.cuoiY !== undefined) ? L.cuoiY : L.batY;
                            }
                        }
                    }
                    else if (L.pha === 'cho'){
                        // MOI NHAT DEU 5 DMG. Truoc day nhat sau nhan doi thanh 10 voi Swordmaster —
                        // sat thuong don ca vao mot nhat. Gio Swordmaster ra HAI nhat rieng, moi nhat 5.
                        if (L.t === 30 || (L.sm && L.t === 48)){
                            // Vung sat thuong = DUNG doan duong da luot qua, khong phai mot vong
                            // tron quanh nguoi choi. Truoc day hien thi mot noi, dmg mot noi.
                            let hA = Math.min(L.xMin, L.xMax), hB = Math.max(L.xMin, L.xMax);
                            if (hB - hA < 160){ let c = (hA + hB) / 2; hA = c - 80; hB = c + 80; }
                            let r0 = { x: hA, y: L.my - 46, w: hB - hA, h: 92 };
                            if (this.id === 1 && typeof gdCatHop === 'function') gdCatHop(r0);   // @@HE-GATDAN
                            for (let o of allTargets()){
                                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                                if (!checkAABB(r0, o)) continue;
                                if (typeof dealDamage === 'function') dealDamage(o, 5, 'ammo'); else o.hp -= 5;
                                o._uFreeze = Math.max(o._uFreeze || 0, 15);
                                visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 30));
                            }
                            shakeTimer = Math.max(shakeTimer, 22);
                            if (typeof SFX !== 'undefined' && SFX.glassBreak) SFX.glassBreak();
                            // DON KET dung dung thiet ke vet kiem cua cu lao.
                            // Rai DEU tren ca quang duong: truoc day dung Math.random() nen chum het
                            // ve mot phia, doan dau khong co nhat nao.
                            // Trai deu tren QUANG DUONG DA LUOT (batX -> ketX), khong phai
                            // quanh cho Dino dang dung.
                            // Rai DOC theo doan duong da luot. Luot 2 (Swordmaster) thi DAY hon.
                            let xA = hA, xB = hB;
                            let SO = L.sm ? 5 : 4, buoc = (xB - xA) / SO;
                            let truc = (L.dir > 0 ? 0 : Math.PI);
                            // Nhip thu hai lech NUA buoc -> hai dot dan vao nhau thanh mot hang
                            // day hon, thay vi dong dau len dung cho cu.
                            let lech = (L.t === 30) ? 0 : 0.5;
                            for (let k = 0; k < SO; k++){
                                let cx0 = xA + buoc * (k + 0.5 + lech);
                                if (cx0 > xB) continue;
                                let cy0 = L.my + (k % 2 ? -1 : 1) * 18;
                                // Gon gang: bam truc luot, chi nghieng qua lai chut mot.
                                let g = truc + (k % 2 ? 0.5 : -0.5);
                                this.dsCat(L, cx0, cy0, g, 158, 22, 5);
                            }
                        }
                        if (L.t >= (L.sm ? 56 : 38)){
                            L.pha = 'xong';
                            L.no = 0;
                        }
                    }
                    else { L.no = (L.no || 0) + 1; if (L.no > 20) this.dsLao = null; }
                }
            }
// PLAYER_PART_END s4.Player.prototype.dsTick.1
};

// index.html:52804 · Phạm vi: Player.prototype
const __Part26 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsCat.1 EDITABLE
dsCat(L, px, py, goc, dai, doi, soLan){
                // Don LUOT dung nhat chem MANH — vet kiem thang, mong, goc NGAU NHIEN.
                // Co tinh khac han hinh luoi liem cua chem mat trang de hai chieu khong lan nhau.
                // soLan: bung nhieu vet mot luc. Truoc day moi cho chi mot vet nen duong lao
                // nhin rat trong so voi mot don charge muc cao nhat.
                let N = Math.max(1, soLan || 1);
                for (let i = 0; i < N; i++){
                    L.cat.push({ x: px + (Math.random() - 0.5) * 84 * (i ? 1 : 0),
                                 y: py + (Math.random() - 0.5) * 66 * (i ? 1 : 0),
                                 goc: goc + (Math.random() - 0.5) * 2.4,
                                 dai: dai * (0.6 + Math.random() * 0.8), doi: doi,
                                 t: -i * 2 });
                }
            }
// PLAYER_PART_END s4.Player.prototype.dsCat.1
};
