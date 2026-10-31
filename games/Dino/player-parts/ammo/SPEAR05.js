// PLAYER_FILE: SPEAR05
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, GIAO_C3_TAM, GIAO_DONG_HET, GIAO_DONG_MAX, GIAO_KET, GIAO_KF, GIAO_MUA_R, GIAO_UNI_DMG, GIAO_UNI_DMG_LUA, GIAO_UNI_NHIP, GIAO_UNI_R0, GIAO_UNI_R1, GIAO_UNI_T, PVP_HS, SFX, VK, allTargets, bossProjectiles, bosses, checkAABB, combatStance, ctx, currentAmmoType, cutBossProjectiles, dangLuotHoacChop, dashVx, dealDamage, dragDai, enemies, floatingTexts, frames, gameState, gdCatHop, giaoCong, giaoLay, giaoSong, giaoTickSong, giaoVeSong, hasRune, keys, setCanBat, setCanDmg, setCanTam, setCanTia, shakeTimer, slamLaoBat, trd, trdBat, trdChBat, trdK, trdUltBat, trdVeVung, ultCharge, visualEffects, vkDangKy, wkgBat, wkgChan, wkgChanBat, wkgK, wkgUltBat, wkgVeGay, worldL, worldR
// index.html:58621 · Phạm vi: Player.prototype
const __Part0 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoUniBatXoay.1 EDITABLE
giaoUniBatXoay(){
                // CAY GIAO TRIEU HOI — khong phai cay giao tren tay nguoi choi. Nho vay chieu
                // nay ra duoc ca khi dang cam loai dan khac trong bo ba Unity.
                // Dang CAM GIAO that thi mui giao boc lua: dep hon va an hon.
                let lua = (currentAmmoType === 10);
                this.giaoUniXoay = { t: 0, nhip: 0, goc: 0, lua: lua, vet: [] };
                shakeTimer = Math.max(shakeTimer, 22);
                floatingTexts.push(new FloatingText(this.x - 56, this.y - 52,
                    lua ? "THIÊN LONG VIÊM THƯƠNG!" : "THIÊN LONG XOAY!"));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(420, 0.4, 'sawtooth', 0.24, 1400); }
            }
// PLAYER_PART_END s4.Player.prototype.giaoUniBatXoay.1
};

// index.html:58635 · Phạm vi: Player.prototype
const __Part1 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoUniMui.1 EDITABLE
giaoUniMui(){
                let X = this.giaoUniXoay; if (!X) return null;
                let R = this.giaoUniBanKinh();
                let cx = this.x + this.w/2, cy = this.y + this.h/2;
                let gx = cx + Math.cos(X.goc) * R * 0.62;
                let gy = cy + Math.sin(X.goc) * R * 0.26;
                let huong = Math.cos(X.goc) < 0 ? -1 : 1;
                let ang = Math.atan2(Math.sin(X.goc) * R * 0.42, Math.cos(X.goc) * R);
                let a2 = huong > 0 ? ang : (Math.PI - ang);
                let L = 118 * this.getFormScale(), T = L * 0.66 + 40;
                return { gx: gx, gy: gy, huong: huong, ang: a2, L: L,
                         x: gx + huong * Math.cos(a2) * T, y: gy + Math.sin(a2) * T };
            }
// PLAYER_PART_END s4.Player.prototype.giaoUniMui.1
};

// index.html:58648 · Phạm vi: Player.prototype
const __Part2 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoUniBanKinh.1 EDITABLE
giaoUniBanKinh(){
                let X = this.giaoUniXoay; if (!X) return GIAO_UNI_R0;
                let u = Math.min(1, X.t / GIAO_UNI_T);
                return GIAO_UNI_R0 + (GIAO_UNI_R1 - GIAO_UNI_R0) * u;
            }
// PLAYER_PART_END s4.Player.prototype.giaoUniBanKinh.1
};

// index.html:58653 · Phạm vi: Player.prototype
const __Part3 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoUniTick.1 EDITABLE
giaoUniTick(){
                let X = this.giaoUniXoay; if (!X) return;
                X.t++;
                if (X.t >= GIAO_UNI_T){ this.giaoUniXoay = null; return; }
                X.goc += 0.285;                       // cay giao tu quay, khong an theo tay nguoi choi
                let R = this.giaoUniBanKinh();
                // vet lua o mui giao (chi khi dang cam giao)
                if (X.lua){
                    let M = this.giaoUniMui();
                    if (M){ X.vet.push({ x: M.x, y: M.y, t: 18 }); if (X.vet.length > 26) X.vet.shift(); }
                }
                for (let i = X.vet.length - 1; i >= 0; i--) if (--X.vet[i].t <= 0) X.vet.splice(i, 1);
                let cx = this.x + this.w/2, cy = this.y + this.h/2;
                // chan dan boss suot ca cu xoay — cay giao dang quay tron thi phai gat duoc dan
                let rect = { x: cx - R, y: cy - R, w: R*2, h: R*2 };
                if (typeof cutBossProjectiles === 'function') cutBossProjectiles(rect);
                for (let k = bossProjectiles.length - 1; k >= 0; k--){
                    let bp = bossProjectiles[k];
                    if (Math.hypot((bp.x + (bp.w||8)/2) - cx, (bp.y + (bp.h||8)/2) - cy) < R){
                        bossProjectiles.splice(k, 1);
                        visualEffects.push(new Effect(bp.x, bp.y, 'parry', false));
                    }
                }
                if (--X.nhip > 0) return;
                X.nhip = GIAO_UNI_NHIP;
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    let ox = o.x + (o.w||20)/2, oy = o.y + (o.h||20)/2;
                    if (Math.hypot(ox - cx, oy - cy) > R + Math.max(o.w||20, o.h||20) * 0.35) continue;
                    let _d = X.lua ? GIAO_UNI_DMG_LUA : GIAO_UNI_DMG;
                    if (typeof dealDamage === 'function') dealDamage(o, _d, 'ammo'); else o.hp -= _d;
                    visualEffects.push(new Effect(ox, oy, 'explosion', true, X.lua ? 26 : 20));
                }
                shakeTimer = Math.max(shakeTimer, 8);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900, 0.05, 'square', 0.12, 1600);
            }
// PLAYER_PART_END s4.Player.prototype.giaoUniTick.1
};

// index.html:58689 · Phạm vi: Player.prototype
const __Part4 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoUniVe.1 EDITABLE
giaoUniVe(){
                let X = this.giaoUniXoay; if (!X) return;
                let R = this.giaoUniBanKinh(), cx = this.x + this.w/2, cy = this.y + this.h/2;
                let mo = Math.min(1, X.t / 12) * Math.min(1, (GIAO_UNI_T - X.t) / 18);
                ctx.save();
                // hai vanh gio quay nguoc chieu nhau
                for (let k = 0; k < 2; k++){
                    let g = frames * (k ? -0.14 : 0.19) + k * 1.7;
                    ctx.globalAlpha = (0.30 - k * 0.10) * mo;
                    ctx.strokeStyle = k ? "#B0BEC5" : "#ECEFF1";
                    ctx.lineWidth = 10 - k * 4;
                    ctx.beginPath();
                    ctx.ellipse(cx, cy, R * (1 - k * 0.16), R * 0.42 * (1 - k * 0.16), 0, g, g + 4.4);
                    ctx.stroke();
                }
                // vet la gio bay quanh
                ctx.globalAlpha = 0.55 * mo; ctx.fillStyle = "#FFFFFF";
                for (let i = 0; i < 8; i++){
                    let a = frames * 0.22 + i * 0.785;
                    ctx.beginPath();
                    ctx.ellipse(cx + Math.cos(a) * R * 0.92, cy + Math.sin(a) * R * 0.38, 4, 2, a, 0, 6.28);
                    ctx.fill();
                }
                ctx.restore();
                // ---- DAI LUA re theo mui giao ----
                // Ban truoc la mot chuoi vong tron chong len nhau nen no ra mot day hat, khong
                // ra lua. Gio dung chinh duong di cua mui giao lam SONG, roi boi thanh mot dai
                // thon dan — day chinh la cach ta ve than rong o tren, va la thu tao ra cam
                // giac MUA LUA: mot dai lien mach keo dai phia sau mui.
                if (X.lua && X.vet.length >= 3 && typeof dragDai === 'function'){
                    ctx.save();
                    const dai = (heSo, mau, al) => {
                        let pts = [];
                        for (let i = 0; i < X.vet.length; i++){
                            let v = X.vet[i], w = (i + 1) / X.vet.length;
                            // thon ve DUOI (vet cu), day o dau mui; rung nhe cho ra ngon lua
                            let r = (1.5 + 11 * w * w) * heSo * (0.85 + 0.3 * Math.sin(frames * 0.5 + i * 0.9));
                            pts.push({ x: v.x, y: v.y, r: Math.max(0.6, r) });
                        }
                        ctx.globalAlpha = al * mo;
                        dragDai(pts, mau, null);
                    };
                    dai(1.00, "#BF360C", 0.42);
                    dai(0.72, "#FF7043", 0.62);
                    dai(0.42, "#FFC107", 0.80);
                    dai(0.18, "#FFF8E1", 0.95);
                    ctx.restore(); ctx.globalAlpha = 1;
                }
                // ---- CAY GIAO TRIEU HOI: mot cay giao THAT quay quanh nguoi ----
                {
                    let M = this.giaoUniMui();
                    if (M && typeof this.giaoVeThan === 'function'){
                        ctx.save(); ctx.globalAlpha = mo;
                        this.giaoVeThan(M.gx, M.gy, M.ang, M.huong, M.L, mo);
                        ctx.restore();
                    }
                    // dom lua nho o ngay dau mui, de dai lua co diem xuat phat ro rang
                    if (M && X.lua){
                        ctx.save();
                        ctx.globalAlpha = 0.9 * mo; ctx.fillStyle = "#FFF8E1";
                        ctx.beginPath(); ctx.arc(M.x, M.y, 3.4 + Math.sin(frames * 0.6) * 0.8, 0, 6.28); ctx.fill();
                        ctx.restore();
                    }
                }
                ctx.globalAlpha = 1;
            }
// PLAYER_PART_END s4.Player.prototype.giaoUniVe.1
};

// index.html:58755 · Phạm vi: Player.prototype
const __Part5 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoDatDap.1 EDITABLE
giaoDatDap(x, y, k){ k = k || 1; let T = Math.round(18 + 8 * k);
                                 this.giaoDap = { x, y, t: T, T, k }; }
// PLAYER_PART_END s4.Player.prototype.giaoDatDap.1
};

// index.html:58759 · Phạm vi: Player.prototype
const __Part6 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoVeDap.1 EDITABLE
giaoVeDap(){
                let D = this.giaoDap; if (!D) return;
                let u = 1 - D.t / D.T, k = D.k || 1;
                ctx.save();
                ctx.globalAlpha = Math.max(0, 0.9 - u);
                ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = (3.5 + 2.2 * k) * (1 - u) + 1;
                ctx.beginPath();
                ctx.ellipse(D.x, D.y, (30 + 190 * u) * k, (8 + 26 * u) * k, 0, Math.PI, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = "#CFD8DC";
                for (let sd = -1; sd <= 1; sd += 2) for (let i = 0; i < 3; i++){
                    let L = (46 + 130 * u) * k * (1 - i * 0.22);
                    let H = (26 +  74 * u) * k * (1 - i * 0.30);
                    ctx.globalAlpha = Math.max(0, 0.60 - u * 0.60) * (1 - i * 0.25);
                    ctx.beginPath();
                    ctx.moveTo(D.x + sd * 12, D.y);
                    ctx.lineTo(D.x + sd * L, D.y - H);
                    ctx.lineTo(D.x + sd * L * 0.82, D.y - H * 0.42);
                    ctx.closePath(); ctx.fill();
                }
                ctx.globalAlpha = Math.max(0, 0.8 - u);
                ctx.strokeStyle = "#455A64"; ctx.lineWidth = 3 * k;
                for (let i = 0; i < 6; i++){
                    let sd = (i % 2) ? 1 : -1, L = (40 + 170 * u) * k * (0.5 + (i % 3) * 0.28);
                    ctx.beginPath(); ctx.moveTo(D.x, D.y + 2);
                    ctx.lineTo(D.x + sd * L, D.y + 4 + (i % 3) * 5); ctx.stroke();
                }
                ctx.restore(); ctx.globalAlpha = 1;
                if (--D.t <= 0) this.giaoDap = null;
            }
// PLAYER_PART_END s4.Player.prototype.giaoVeDap.1
};

// index.html:58791 · Phạm vi: Player.prototype
const __Part7 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoTickMuiTen.1 EDITABLE
giaoTickMuiTen(){
                let dangLuot = dangLuotHoacChop();
                if (dangLuot && !this._giaoLuotTruoc && (this._giaoCS || 0) > 0 && !this.giaoMuiTen){
                    // @@HE-SETCAN: mui ten mang dien -> song lau hon (bay xa hon) va nang hon
                    let _st = (typeof setCanBat === 'function' && setCanBat());
                    this.giaoMuiTen = { t: _st ? 34 : 26, T: _st ? 34 : 26, dir: dashVx > 0 ? 1 : -1, hit: new Set(), set: _st };

                }
                this._giaoLuotTruoc = dangLuot;
                let A = this.giaoMuiTen; if (!A) return;
                A.t--;
                let cx = this.x + this.w/2, cy = this.y + this.h/2;
                // @@HE-SETFX: mui ten mang dien thi ram tia doc duong bay, moi 3 khung mot tia
                // @@HE-SETFX: mot tia chay DOC than mui ten, khong phai tia ban tung toe
                if (A.set && A.t % 4 === 0 && typeof setCanTia === 'function')
                    setCanTia(cx, cy, cx + A.dir * 150, cy, 3.5, 9);
                let _w = 190 * (A.set ? (typeof setCanTam === 'function' ? setCanTam() : 1) : 1);
                let rect = { x: A.dir > 0 ? cx - 20 : cx - (_w - 20), y: cy - 48, w: _w, h: 96 };
                let ds = [];
                for (let o of bosses) if (o && !o.dying && !o.invulnAll) ds.push(o);
                for (let o of enemies) ds.push(o);
                if (typeof gdCatHop === 'function') gdCatHop(rect);   // @@HE-GATDAN
                for (let o of ds){
                    if (A.hit.has(o) || !checkAABB(rect, o)) continue;
                    A.hit.add(o);
                    let dm = 4 + giaoCong() + (hasRune('explshot') ? 1 : 0)
                             + (A.set ? (typeof setCanDmg === 'function' ? setCanDmg() : 0) : 0);   // NOVA +1 | LUOT SET +2
                    if (typeof dealDamage === 'function') dealDamage(o, dm, 'ammo'); else o.hp -= dm;
                    this._giaoDong = Math.min(GIAO_DONG_MAX, (this._giaoDong || 0) + 1);
                    this._giaoDongT = GIAO_DONG_HET;
                    visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 16));
                }
                if (A.t <= 0) this.giaoMuiTen = null;
            }
// PLAYER_PART_END s4.Player.prototype.giaoTickMuiTen.1
};

// index.html:58825 · Phạm vi: Player.prototype
const __Part8 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoVeMuiTen.1 EDITABLE
giaoVeMuiTen(){
                let A = this.giaoMuiTen; if (!A) return;
                let cx = this.x + this.w/2, cy = this.y + this.h * 0.55, u = 1 - A.t / A.T;
                ctx.save(); ctx.translate(cx, cy); ctx.scale(A.dir, 1);
                ctx.globalAlpha = 0.30 + 0.55 * (1 - u);
                let L = 150, W = 46;
                let g = ctx.createLinearGradient(-L * 0.7, 0, L, 0);
                g.addColorStop(0, "rgba(176,190,197,0)");
                g.addColorStop(0.6, "rgba(236,239,241,0.82)");
                g.addColorStop(1, "#FFFFFF");
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.moveTo(L, 0); ctx.lineTo(L - 54, -W); ctx.lineTo(L - 40, -W * 0.30);
                ctx.lineTo(-L * 0.7, -10); ctx.lineTo(-L * 0.7, 10);
                ctx.lineTo(L - 40, W * 0.30); ctx.lineTo(L - 54, W);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "rgba(236,239,241,0.7)"; ctx.lineWidth = 3;
                for (let i = -1; i <= 1; i++){
                    ctx.beginPath(); ctx.moveTo(L - 70, i * 22);
                    ctx.lineTo(-L * (0.8 + Math.abs(i) * 0.25), i * 30); ctx.stroke();
                }
                ctx.restore(); ctx.globalAlpha = 1;
            }
// PLAYER_PART_END s4.Player.prototype.giaoVeMuiTen.1
};

// index.html:58848 · Phạm vi: Player.prototype
const __Part9 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoBatChannel.1 EDITABLE
giaoBatChannel(){ this.giaoChan = { t: 0 }; }
// PLAYER_PART_END s4.Player.prototype.giaoBatChannel.1
};

// index.html:58849 · Phạm vi: Player.prototype
const __Part10 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoNhaChannel.1 EDITABLE
giaoNhaChannel(){
                this.giaoChan = null;
                this._giaoDanh(4, 20, GIAO_KET + 40, 16, 50, 50, 'bo');
                shakeTimer = Math.max(shakeTimer, 22);
                this.giaoHenDap(1.3);
            }
// PLAYER_PART_END s4.Player.prototype.giaoNhaChannel.1
};

// index.html:58855 · Phạm vi: Player.prototype
const __Part11 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoTick.1 EDITABLE
giaoTick(){
                /* @@HE-WUKONG — Ngo Khong thay TRON bo don, nen cac he con RIENG CUA GIAO phai
                   tat het o day. Do duoc mot lan roi: don J tren khong cua Ngo Khong do 6 thay
                   vi 2, vi cu bat lui cua no lam `dangLuotHoacChop()` thanh true va tu dong
                   nap MUI TEN KHI cua Giao (4 sat thuong) — mot he con khong ai goi ma van chay.
                   Giu lai dung hai thu vo hai: dem cua so noi don va ve cay gay. */
                if (this.id === 1 && !this._wkgPhan && typeof wkgBat === 'function' && wkgBat()){
                    if (this._giaoCS > 0) this._giaoCS--;
                    if (this._giaoDongT > 0){ this._giaoDongT--; if (this._giaoDongT <= 0) this._giaoDong = 0; }
                    giaoTickSong();
                    this.giaoVe();
                    return;
                }
                if (this.giaoUlt || this.giaoNo || this.giaoDap){ this.giaoTickUlt(); giaoTickSong(); this.giaoVeUlt(); this.giaoVeDap(); if (!this._giaoAn) this.giaoVe(); return; }
                if (this._giaoCS > 0) this._giaoCS--;
                if (this._giaoVe && this._giaoVe.t > 0) this._giaoVe.t--;
                if (this._giaoDongT > 0){ this._giaoDongT--; if (this._giaoDongT <= 0) this._giaoDong = 0; }
                if (this._giaoC3 > 0){
                    this._giaoC3T--;
                    if (this._giaoC3T <= 0){ this._giaoC3--; this._giaoC3T = 9;
                        this._giaoDanh(2, 8, GIAO_C3_TAM, 5, 5, 3, 'choc', 0, this._giaoC3Ton || 0); }   // moc charge: 3 x 2
                }
                if (this.giaoMua){
                    this.giaoMua.t++;
                    if (this.giaoMua.t % 18 === 1 && this.giaoMua.con > 0){
                        this.giaoMua.con--;
                        // 2 vong xoay moi tru 1 the luc, khong phai moi vong mot diem
                        // MUA GIAO: 5 nhat x 3 = 15 o che do danh quai. Truoc day la 2 (tong 10)
                        // — dot xuong tu ban dat 3 hoi con soat lai suc manh cua Giao, nhung
                        // rieng don nay thi giu nguyen 3 vi no khoa chan nguoi choi 1.5 giay.
                        // O PvP ban dat moi nhat 4 / tong 20, chia nguoc cho he so 1.17 cua Giao
                        // de con so RA MAN HINH dung bang 4 chan, khong phai 4 roi bi nhan tiep.
                        this.giaoDonXoayNgam(gameState === 'pvp' ? (4 / (PVP_HS[10] || 1) + 1e-6) : 3,
                                             14, GIAO_MUA_R, (this.giaoMua.con % 2 === 1) ? 0 : 1);
                        this.attackCooldown = 2;
                    }
                    if (this.giaoMua.con <= 0 && this.giaoMua.t > 90){ this.giaoMua = null; this.attackCooldown = 16; }
                }
                if (this.giaoLao){
                    this.giaoLao.t--;
                    this.x = Math.max(worldL(), Math.min(worldR() - this.w, this.x + this.giaoLao.dir * 13));
                    if (this.giaoLao.t <= 0) this.giaoLao = null;
                }
                if (this.giaoChan){
                    this.giaoChan.t++;
                    let cx = this.x + this.w/2, cy = this.y + this.h/2, R = 140;
                    if (typeof cutBossProjectiles === 'function')
                        cutBossProjectiles({ x: cx - R, y: cy - R, w: R*2, h: R*2 });
                    if (this.giaoChan.t % 28 === 1) this.giaoDonXoayNgam(2, 10, 156);
                }
                if (this.giaoLui){
                    this.giaoLui.t--;
                    this.x = Math.max(worldL(), Math.min(worldR() - this.w, this.x - this.giaoLui.dir * 7));
                    if (this.giaoLui.t <= 0) this.giaoLui = null;
                }
                this.giaoTickHenDap();
                this.giaoTickBo();
                this.giaoTickMuiTen();
                giaoTickSong();
                this.giaoVe();
                this.giaoVeMuiTen();
                this.giaoVeDap();
                this.giaoVeUlt();
            }
// PLAYER_PART_END s4.Player.prototype.giaoTick.1
};

// index.html:58919 · Phạm vi: Player.prototype
const __Part12 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoVe.1 EDITABLE
giaoVe(){
                if (this.id === 1 && !this._wkgPhan && typeof wkgVeGay === 'function' && wkgVeGay(this)) return;   // @@HE-WUKONG
                if (this.id === 1 && typeof trdVeVung === 'function' && trdVeVung(this)) return;                   // @@HE-TRIDENT3
                if (this._wkgPhan) return;   // phan than duoc ve rieng trong wkgVePhan
                giaoVeSong();
                if (!this.giaoVK) this.giaoVK = { ang: 0.95, ext: -20, veti: [] };
                let VK = this.giaoVK, A = this._giaoAnim;
                let dir = A ? A.dir : (this.isFacingLeft ? -1 : 1);
                if (A){
                    A.t++;
                    let st = giaoLay(A.kf, Math.min(1, A.t / A.T), A.kieu === 'xoay');
                    VK.ang = st.ang; VK.ext = st.ext;
                    if (A.t >= A.T){
                        // Sau mot vong tron, goc dang la goc-dau + 2PI. Neu de nguyen thi buoc
                        // lerp ve tu the cam se keo nguoc CA MOT VONG. Gap ve cung mien truoc.
                        let _id = GIAO_KF.idle[0];
                        VK.ang -= Math.PI * 2 * Math.round((VK.ang - _id.ang) / (Math.PI * 2));
                        this._giaoAnim = null;
                    }
                } else if (this.giaoChan || this.giaoMua){
                    // CHANNEL: xoay lien tuc khong nghi, khong ve tu the cam giua chung.
                    VK.ang += 0.30; VK.ext += (24 - VK.ext) * 0.20;
                    if (VK.ang > Math.PI * 2) VK.ang -= Math.PI * 2;
                } else {
                    // ve tu the cam giao mac dinh
                    let id = GIAO_KF.idle[0];
                    VK.ang += (id.ang - VK.ang) * 0.18;
                    VK.ext += (id.ext - VK.ext) * 0.18;
                    if (VK.veti.length) VK.veti.shift();
                }
                let sc = this.getFormScale(), L = 118 * sc;
                let px = this.x + this.w/2 + dir * (12 + VK.ext * sc);
                let py = this.y + this.h * 0.52;
                let Rt = L * 0.66 + 40 * sc, Ri = Rt * 0.46;
                if ((A && A.vet) || this.giaoChan || this.giaoMua){
                    VK.veti.push({ x: px + dir * Math.cos(VK.ang) * Rt, y: py + Math.sin(VK.ang) * Rt,
                                   ix: px + dir * Math.cos(VK.ang) * Ri, iy: py + Math.sin(VK.ang) * Ri });
                    if (VK.veti.length > 14) VK.veti.shift();
                }
                this.giaoVeVet();
                if (this.id === 1 && typeof trdBat === 'function' && trdBat() && trd && (trd.tayKhong > 0 || trd.ult)) return;   // @@HE-TRIDENT: dinh ba dang tren troi / trong tay hai than
                this.giaoVeThan(px, py, VK.ang, dir, L, 1);
            }
// PLAYER_PART_END s4.Player.prototype.giaoVe.1
};

// index.html:58963 · Phạm vi: Player.prototype
const __Part13 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoVeVet.1 EDITABLE
giaoVeVet(){
                let V = this.giaoVK && this.giaoVK.veti;
                if (!V || V.length < 2) return;
                ctx.save();
                for (let i = 1; i < V.length; i++){
                    let a = V[i-1], b = V[i], u = i / V.length;
                    ctx.globalAlpha = 0.10 + 0.52 * u * u;
                    ctx.fillStyle = "#ECEFF1";
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(b.ix, b.iy); ctx.lineTo(a.ix, a.iy);
                    ctx.closePath(); ctx.fill();
                }
                // vien sang o mep ngoai
                ctx.globalAlpha = 0.85; ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 2.2;
                ctx.beginPath(); ctx.moveTo(V[0].x, V[0].y);
                for (let i = 1; i < V.length; i++) ctx.lineTo(V[i].x, V[i].y);
                ctx.stroke();
                ctx.restore(); ctx.globalAlpha = 1;
            }
// PLAYER_PART_END s4.Player.prototype.giaoVeVet.1
};

// index.html:58983 · Phạm vi: Player.prototype
const __Part14 = {
// PLAYER_PART_BEGIN s4.Player.prototype.giaoVeThan.1 EDITABLE
giaoVeThan(px, py, ang, dir, L, al){
                if (this.id === 1 && typeof trdBat === 'function' && trdBat()){                  // @@HE-TRIDENT: DINH BA
                    ctx.save(); ctx.globalAlpha = al; ctx.translate(px, py); ctx.scale(dir, 1); ctx.rotate(ang);
                    ctx.fillStyle = "#A87F12"; ctx.fillRect(-L * 0.34, -3.5, L * 0.98, 7);
                    ctx.fillStyle = "#FFD54F"; ctx.fillRect(-L * 0.33, -1.8, L * 0.96, 2);
                    ctx.fillStyle = "#26C6DA"; ctx.fillRect(-L * 0.12, -4, 10, 8);
                    let T = L * 0.64;
                    ctx.fillStyle = "#FFD54F"; ctx.strokeStyle = "#8D6E0F"; ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(T, -13); ctx.quadraticCurveTo(T - 5, 0, T, 13); ctx.lineTo(T + 7, 13); ctx.lineTo(T + 7, -13); ctx.closePath(); ctx.fill(); ctx.stroke();
                    ctx.fillStyle = "#E0F7FA"; ctx.strokeStyle = "#26C6DA";
                    for (const yy of [-13, 0, 13]){ ctx.beginPath(); ctx.moveTo(T + 6, yy - 3); ctx.lineTo(T + (yy ? 34 : 44), yy); ctx.lineTo(T + 6, yy + 3); ctx.closePath(); ctx.fill(); ctx.stroke(); }
                    ctx.fillStyle = "#00E5FF"; ctx.beginPath(); ctx.arc(T - 3, 0, 3, 0, 6.28); ctx.fill();
                    ctx.restore(); ctx.globalAlpha = 1;
                    return;
                }
                ctx.save(); ctx.globalAlpha = al;
                ctx.translate(px, py); ctx.scale(dir, 1); ctx.rotate(ang);
                let g = ctx.createLinearGradient(0, -3.5, 0, 3.5);
                g.addColorStop(0, "#A1887F"); g.addColorStop(0.45, "#6D4C41"); g.addColorStop(1, "#3E2723");
                ctx.fillStyle = g; ctx.fillRect(-L * 0.34, -3.5, L, 7);
                ctx.fillStyle = "#37474F"; ctx.fillRect(-L * 0.36, -4.5, 8, 9);      // do can
                ctx.fillStyle = "#B71C1C";                                            // dai quan can
                ctx.fillRect(-L * 0.12, -4, 11, 8); ctx.fillRect(L * 0.26, -4, 9, 8);
                ctx.fillStyle = "#CFD8DC"; ctx.fillRect(L * 0.60, -5.5, 13, 11);      // co giao
                let T = L * 0.66, W = 11;
                ctx.beginPath();
                ctx.moveTo(T + 40, 0); ctx.lineTo(T + 11, -W); ctx.lineTo(T, -4.5);
                ctx.lineTo(T, 4.5); ctx.lineTo(T + 11, W); ctx.closePath();
                let g2 = ctx.createLinearGradient(T, -W, T + 40, W);
                g2.addColorStop(0, "#FFFFFF"); g2.addColorStop(0.55, "#ECEFF1"); g2.addColorStop(1, "#78909C");
                ctx.fillStyle = g2; ctx.fill();
                ctx.strokeStyle = "#546E7A"; ctx.lineWidth = 1.2; ctx.stroke();
                ctx.beginPath(); ctx.moveTo(T + 2, 0); ctx.lineTo(T + 36, 0);        // song luoi
                ctx.strokeStyle = "rgba(96,125,139,0.85)"; ctx.lineWidth = 1.6; ctx.stroke();
                ctx.restore(); ctx.globalAlpha = 1;
            }
// PLAYER_PART_END s4.Player.prototype.giaoVeThan.1
};

// index.html:59021 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.12 EDITABLE
vkDangKy(10, {
            ten: 'SPEAR',
            theLuc: 6,
            sacToiDa(){ return (typeof trdBat === 'function' && trdBat()) ? 180 : 120; },   // Trident 3 giay, Giao / Ngo Khong 2 giay
            banJ(){
                this.spearSlash();
            },
            nhaK(){
                // ===== GIAO — BON MOC, toi da 120f (2 giay) =====
                //  15f  choc nhanh 3 phat, tam 4cm
                //  45f  quet ngang, luoi nho dan theo duong bay
                //  75f  mua giao 5 nhat, DI CHUYEN DUOC, keo dai 1.5 giay
                //  105f luot dam xuyen, de lai mui thuong xe gio bay tiep
                let _hg = this.aKeyHeldTime, _og = this.attackCooldown <= 0 && !this.isOverheated && this.ammo > 0;
                if (this.id === 1 && !this._wkgPhan && typeof trdBat === 'function' && trdBat() && trdK(this, _hg, _og)){ }   // @@HE-TRIDENT
                else if (this.id === 1 && !this._wkgPhan && typeof wkgBat === 'function' && wkgBat()){ wkgK(this, _hg, _og); }   // @@HE-WUKONG
                else if (this.giaoChan){ this.giaoNhaChannel(); }
                // CHAM K = DON KET. Phai HUY duoc khung hoi don cua nhat J vua roi,
                // khong thi phai cho het hoi don moi ra — cam giac y het dang phai GIU K.
                else if (_hg < 15 && (this._giaoCS || 0) > 0 && this._giaoNhanh) this.giaoKet();
                else if (_hg < 15 && keys['KeyS'] && _og) this.giaoLuiDam();   // S + K = LUI BUOC DAM
                else if (_hg >= 105 && _og) this.giaoXuyen();
                else if (_hg >= 75  && _og) this.giaoMuaBatDau();
                else if (_hg >= 45  && _og) this.giaoQuet();
                else if (_hg >= 15  && _og) this.giaoChoc3();
                // CHAM K: dang trong cua so noi don thi ra DON KET, khong thi choc thuong
                else if (_og){ if ((this._giaoCS || 0) > 0 && this._giaoNhanh) this.giaoKet(); else this.spearSlash(); }
            },
            channelRieng(chargeKey){
                if (chargeKey && combatStance === 0 && this.aKeyHeldTime >= 180) {
                    // @@HE-WUKONG — Channel cua Ngo Khong la THAN NGOAI HOA THAN, khong phai xoay giao
                    if (this.id === 1 && typeof trdBat === 'function' && trdBat()){ if (!trd || !trd.ch) trdChBat(this); }   // @@HE-TRIDENT: CUOI SONG
                    else if (this.id === 1 && !this._wkgPhan && typeof wkgBat === 'function' && wkgBat()){ if (!wkgChan) wkgChanBat(this); }
                    else if (!this.giaoChan) this.giaoBatChannel();
                }
            },
            batUlt(){
                if (typeof trdBat === 'function' && trdBat()) {
                    // @@HE-TRIDENT — LINH HON NGON GIAO
                    if (trdUltBat(this)){
                        ultCharge = 0;
                        this.aKeyHeldTime = 0; this.chargeProgress = 0;
                        floatingTexts.push(new FloatingText(this.x - 60, this.y - 34, "LINH HỒN NGỌN GIÁO!"));
                        shakeTimer = Math.max(shakeTimer, 30);
                        if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(160, 0.5, 'sine', 0.28, 90); SFX.tone(900, 0.3, 'triangle', 0.16, 1600); }
                    }
                } else if (typeof wkgBat === 'function' && wkgBat()) {
                    // @@HE-WUKONG
                    if (wkgUltBat(this)){
                        ultCharge = 0;
                        this.aKeyHeldTime = 0; this.chargeProgress = 0;
                        floatingTexts.push(new FloatingText(this.x - 60, this.y - 34, "NHƯ Ý KIM CÔ BỔNG!"));
                        shakeTimer = Math.max(shakeTimer, 30);
                        if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(200, 0.40, 'sawtooth', 0.28, 1200); SFX.tone(1400, 0.24, 'square', 0.16, 2400); }
                    }
                } else {
                    if (this.giaoBatUlt()){
                        ultCharge = 0;
                        this.aKeyHeldTime = 0; this.chargeProgress = 0;
                        floatingTexts.push(new FloatingText(this.x - 46, this.y - 34, "THIÊN LONG THƯƠNG!"));
                        shakeTimer = Math.max(shakeTimer, 24);
                        if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(300, 0.30, 'sawtooth', 0.26, 900); SFX.tone(1200, 0.20, 'square', 0.14, 2000); }
                    }
                }
            },
            // Body Slam: cam giao xuong, mot song chan CHAY DOC theo huong dang quay
            slamDuoi(ix, iy, to){
                let sc = this.getFormScale();
                // GIAO — cam giao xuong, mot song chan CHAY DOC theo huong dang quay
                let d = this.isFacingLeft ? -1 : 1;
                giaoSong.push({ chu: this, x: ix + d * 20, y: iy - 30, dir: d,
                                r: (to ? 300 : 240) * sc, t: to ? 46 : 38, t0: to ? 46 : 38,
                                dmg: to ? 6 : 4, nho: 0, xuyen: 1, hit: new Set() });
                for (let k = 0; k < 5; k++)
                    visualEffects.push(new Effect(ix + d * (30 + k * 44), iy - 6, 'explosion', d < 0, 16));
                floatingTexts.push(new FloatingText(ix - 44, iy - 42, "THƯƠNG CHẤN"));
            },
            // DONG CHAY COMBO — chi Giao moi tich
            trungCan(o){
                this._giaoDong = Math.min(GIAO_DONG_MAX, (this._giaoDong || 0) + 1);
                this._giaoDongT = GIAO_DONG_HET;
                // @@HE-WUKONG — HAO QUANG DO: dem tung don TRUNG DICH. Phan than khong tinh.
                if (this.id === 1 && !this._wkgPhan) this._wkgTrung = (this._wkgTrung || 0) + 1;
            },
            hoverSac(half){
                // GIAO: bo thang xuong THEO muc tieu, 5 sat thuong kem Impact mat dat
                let _N = this.hoverNgam();
                this.giaoBoXuong = { cap: 0, nhamX: _N ? _N.tx : undefined };
                this.dy = 26; this.hoverTimer = 0;
                // @@HE-LOLUNG3: muc tieu xa thi bo cham lai cho kip truot toi (40px / khung)
                if (_N){ let _kc = Math.abs(_N.tx - (this.x + this.w / 2)), _cao = Math.max(20, 320 - (this.y + this.h));
                         this.giaoBoXuong.dyMax = Math.max(9, Math.min(26, _cao / Math.max(1, _kc / 40))); }
                this._giaoVeDat('bo', GIAO_KET, 20);
                if (typeof slamLaoBat === 'function') slamLaoBat(this);   // @@HE-SLAMLAO
            }
        });
// PLAYER_PART_END s4.vkDangKy.12
