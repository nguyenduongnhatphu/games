// PLAYER_FILE: SPEAR02
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: AI_KHO, CAM_TROI, Effect, FloatingText, Player, WKG_CAO, WKG_CM, WKG_GIU, WKG_HA, WKG_SPIN_CD, WKG_ULT_BUFF, WORLD_W, activeShieldWasHeld, aiNhin, aiTTMoi, aiTanCong, bossProjectiles, bosses, canvas, checkAABB, ctx, currentForm, dashCd, dashVx, dealDamage, dino, enemies, floatingTexts, frames, gameState, giaoEase, giaoVeSong, keys, lastMoveTapDir, lastMoveTapTime, mayLuotGiu, projectiles, shakeTimer, ultCharge, visualEffects, wkgBat, wkgBuff, wkgChan, wkgCon, wkgCong, wkgDanh, wkgDat, wkgLoc, wkgMay, wkgMoi, wkgMucGan, wkgNac, wkgNoHop, wkgNoTai, wkgPhan, wkgSet, wkgSetTia, wkgSpin, wkgSpinCd, wkgSpinCua, wkgSpinCua_chan, wkgThemPhan, wkgThu, wkgUlt, wkgVong, worldL, worldR
// index.html:55784 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickCon.1 EDITABLE
function wkgTickCon(){
            if (!wkgCon) return;
            let C = wkgCon;
            /* KICH CON — nguoi choi TUM LAY CHINH CAY COT DANG DUNG LEN roi vung.
               Ba cho ban truoc lam sai, Hans chi ra het:
                 - cam o GIUA cay cot: phi ly, hai tay dang o DAU COT vi ho dung tren do.
                 - tam danh la mot vung nho quanh chan: cay cot dai 360px ma don chi voi 250px.
                 - nhac len xoay xong roi lai ha xuong nhu chua tung cam no len.
               Nay tay cam o DAU COT, cot quay quanh tay do, nen ban kinh don = DUNG CHIEU DAI
               CAY COT. Va nguoi choi RUNG XUONG CHAM trong suot cu vung — ho vua nho cai cot
               minh dang dung len thi phai roi theo no, khong the treo lo lung. */
            if (C.danh){
                C.danh.t++;
                let D = C.danh, u = D.t / D.T;
                if (D.L === undefined){ D.L = Math.max(130, C.cao); D.cao0 = C.cao; }
                let conLai = (u < 0.70) ? (1 - u * 0.40)
                                        : (1 - 0.70 * 0.40) * Math.max(0, 1 - (u - 0.70) / 0.30);
                C.cao = D.cao0 * conLai; C.dich = C.cao;
                // AN DON DUNG LUC GAY CHAM DAT. Truoc day no no o 0.80 trong khi vong quay
                // chi ve toi day o 0.84 — tuc no truoc khi gay xuong toi noi.
                if (D.t === Math.round(D.T * 0.86)){
                    /* GAP DOI. Don nay bop nguoi choi rat nang: dung im tren ngon cot suot ca
                       cu vung, khong ne duoc gi, an mot don la rot. Muc 3/5/7 khong dang doi
                       lay chung do rui ro. */
                    let dmg = 2 * (C.dmgEp || (C.nac >= 3 ? 7 : (C.nac >= 2 ? 5 : 3)));
                    let d = dino.isFacingLeft ? -1 : 1;
                    /* @@HE-WUKONGVE — CHO HUT CUA DON NAY NAM O DAY, va no da hut ca hai lan
                       (hoi con la vu no cung hut y het). Ban VE cay cot nhan them
                       getFormScale() — dang 2/3 la 1.35 — con hop sat thuong thi khong. Nen o
                       dang to, cay gay ve dai hon hop DUNG 35%: nhin thay cham muc tieu ma
                       khong an don, dung nhu Hans mo ta "thieu chung mot hai xen-ti-met".
                       Phai nhan cung mot he so o ca ba cho: hop, vet dap dat, va ban ve. */
                    let _Ls = D.L * dino.getFormScale();
                    wkgNoHop(dino, _Ls, _Ls + 240, dmg, "KÍCH CÔN!");
                    wkgDatVang(dino.x + dino.w/2, _Ls, d, 2);
                    shakeTimer = Math.max(shakeTimer || 0, 26);
                    dino._wkgTrung = (dino._wkgTrung || 0) + 1;
                }
                if (D.t >= D.T){ wkgCon = null; dino.dy = 0; return; }   // vung xong la da cham dat
                return;                       // dang danh thi khong dem gio tu ha
            }
            /* CUI DE THU GAY. Khong dung cho tu ha het gio — nguoi choi chu dong rut ngan
               cay cot de xuong. THU GAY KHONG dat lai dong ho dung tren cot (C.t van chay),
               va rut duoc toi tan mat dat. */
            if ((keys['KeyS'] || keys['ArrowDown']) && !C.danh){
                C.dich = Math.max(0, C.dich - 5.5);
                C.nac = Math.max(1, Math.ceil(C.dich / WKG_CAO));
                if (C.dich <= 2 && C.cao <= 8){ wkgCon = null; dino.dy = 0; return; }
            }
            C.cao += (C.dich - C.cao) * 0.34;
            C.t++;
            if (C.t >= WKG_GIU){
                // Ha xuong THAT SU cham dat roi moi tha. Ban dau toi tha ngay khi `dich` ve 0,
                // ma `cao` con lerp cham phia sau — do duoc nguoi choi bi tha o cach dat 74px,
                // tuc van la mot cu roi. Gio ep `cao` di theo va chi tha khi con duoi 6px.
                C.ha++;
                C.dich = Math.max(0, C.dich - (C.nac * WKG_CAO) / WKG_HA);
                C.cao += (C.dich - C.cao) * 0.55;
                if (C.cao <= 6){ wkgCon = null; dino.dy = 0; return; }
            }
        }
// PLAYER_PART_END s4.wkgTickCon.1

// index.html:55845 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickMay.1 EDITABLE
function wkgTickMay(){
            if (!wkgMay) return;
            wkgMay.t--; wkgMay.bob += 0.11;
            if (wkgMay.cd > 0) wkgMay.cd--;
            if (wkgMay.t <= 0){ wkgMay = null; dino.dy = 0; dino.grounded = false; }
        }
// PLAYER_PART_END s4.wkgTickMay.1

// index.html:55851 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickSpin.1 EDITABLE
function wkgTickSpin(){
            if (!wkgSpin) return;
            let S = wkgSpin; S.t--;
            let cx = dino.x + dino.w/2, cy = dino.y + dino.h/2, R = 128;
            // dem dan chan duoc TRUOC khi xoa
            if (typeof bossProjectiles !== 'undefined'){
                for (let i = bossProjectiles.length - 1; i >= 0; i--){
                    let bp = bossProjectiles[i];
                    if (typeof checkAABB === 'function' && checkAABB({x:cx-R,y:cy-R,w:R*2,h:R*2}, bp)){
                        S.chan++;
                        visualEffects.push(new Effect(bp.x + (bp.w||8)/2, bp.y + (bp.h||8)/2, 'parry', false));
                        bossProjectiles.splice(i, 1);
                    }
                }
            }
            S.nhip++;
            if (S.nhip % 30 === 0) wkgNoTai(cx, cy, R, 1, null);   // 2 dmg moi giay, chia hai nhip
            if (S.t <= 0){
                wkgSpinCua = 26; wkgSpinCua_chan = S.chan;
                wkgSpin = null; wkgSpinCd = WKG_SPIN_CD;
            }
        }
// PLAYER_PART_END s4.wkgTickSpin.1

// index.html:55873 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickMoi.1 EDITABLE
function wkgTickMoi(){
            if (!wkgMoi) return;
            let M = wkgMoi; M.t++;
            if (M.go > 0) M.go--;
            // ke dich lao vao thi bi go mot cai
            let ds = [];
            if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
            if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
            for (let o of ds){
                if (!o || o.hp === undefined || o.hp <= 0 || o.dying) continue;
                if (typeof checkAABB === 'function' && checkAABB(M, o)){
                    if (M.go <= 0){
                        if (typeof dealDamage === 'function') dealDamage(o, 1, 'flat');
                        M.go = 30;
                        floatingTexts.push(new FloatingText(M.x - 10, M.y - 26, "GÕ!"));
                    }
                    M.hp--;
                    if (M.hp <= 0){ visualEffects.push(new Effect(M.x + M.w/2, M.y + M.h/2, 'explosion', true, 26)); wkgMoi = null; return; }
                }
            }
            if (M.t > 420) wkgMoi = null;
        }
// PLAYER_PART_END s4.wkgTickMoi.1

// index.html:55911 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_PHAN_PHIM.1 EDITABLE
const WKG_PHAN_PHIM = ['KeyA','KeyD','KeyS','KeyW','Space','KeyJ','KeyK','ShiftLeft'];
// PLAYER_PART_END s4.WKG_PHAN_PHIM.1

// index.html:55912 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_PHAN_KHO.1 EDITABLE
const WKG_PHAN_KHO  = 2;
// PLAYER_PART_END s4.WKG_PHAN_KHO.1

// index.html:55913 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgPhanDangChay.1 EDITABLE
let wkgPhanDangChay = false;
// PLAYER_PART_END s4.wkgPhanDangChay.1

// index.html:55915 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgPhanTao.1 EDITABLE
function wkgPhanTao(ng, i){
            let _o = 78 + Math.floor(i / 2) * 66;
            let x = ng.x + ((i % 2) ? _o : -_o);
            let P;
            try { P = new Player(1, x, currentForm, 10, !!(i % 2)); } catch(e){ return null; }
            P._wkgPhan = 1;
            P.y = wkgDat() - P.h; P.baseY = ng.baseY;
            P.hp = P.maxHp; P.invincible = true; P.invTimer = 999999;
            P.maxAmmo = 6; P.ammo = 6;        // dung san the luc nhu Giao: het thi phai lui ra hoi (@@HE-THELUC: Giao 6)
            return { ng: P, phim: {}, phimCu: {}, TT: (typeof aiTTMoi === 'function') ? aiTTMoi() : null,
                     rieng: { dashVx: 0, dashCd: 0, tapDir: 0, tapT: 0, khien: false }, t: 0 };
        }
// PLAYER_PART_END s4.wkgPhanTao.1

// index.html:55928 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgPhanVoi.1 EDITABLE
function wkgPhanVoi(Q, fn){
            if (wkgPhanDangChay || !Q || !Q.ng) return;
            wkgPhanDangChay = true;
            let cuDino = dino, cuKeys = {};
            for (const k in keys){ cuKeys[k] = keys[k]; delete keys[k]; }
            Object.assign(keys, Q.phim);
            dino = Q.ng;
            let cDashVx = dashVx, cDashCd = dashCd, cTapDir = lastMoveTapDir,
                cTapT = lastMoveTapTime, cKhien = activeShieldWasHeld, cUlt = ultCharge, cGiu = mayLuotGiu;
            dashVx = Q.rieng.dashVx; dashCd = Q.rieng.dashCd; mayLuotGiu = Q.rieng.mayGiu || 0;
            lastMoveTapDir = Q.rieng.tapDir; lastMoveTapTime = Q.rieng.tapT;
            activeShieldWasHeld = Q.rieng.khien; ultCharge = 0;
            try { fn(); }
            finally {
                Q.rieng.dashVx = dashVx; Q.rieng.dashCd = dashCd; Q.rieng.mayGiu = mayLuotGiu;
                Q.rieng.tapDir = lastMoveTapDir; Q.rieng.tapT = lastMoveTapTime;
                Q.rieng.khien = activeShieldWasHeld;
                dashVx = cDashVx; dashCd = cDashCd; mayLuotGiu = cGiu; lastMoveTapDir = cTapDir;
                lastMoveTapTime = cTapT; activeShieldWasHeld = cKhien; ultCharge = cUlt;
                dino = cuDino;
                for (const k in keys) delete keys[k];
                Object.assign(keys, cuKeys);
                wkgPhanDangChay = false;
            }
        }
// PLAYER_PART_END s4.wkgPhanVoi.1

// index.html:55956 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgPhanDaiDien.1 EDITABLE
function wkgPhanDaiDien(P, m){
            let mw = m.w || 40, mh = m.h || 44;
            let cx = P.x + P.w/2, mcx = m.x + mw/2;
            if (m !== P._pDich){ P._pDich = m; P._pBen = undefined; }
            if (P._pBen === undefined || cx < m.x - 10 || cx > m.x + mw + 10)
                P._pBen = (cx < mcx) ? 1 : -1;
            let huong = P._pBen;
            let ho = huong > 0 ? (m.x - (P.x + P.w)) : (P.x - (m.x + mw));
            if (!(ho > 0)) ho = 0;
            let pcx = cx + huong * (ho + 40);
            return { x: pcx - P.w/2, y: m.y + mh/2 - P.h/2, w: P.w, h: P.h,
                     hp: Math.min(m.hp === undefined ? 999 : m.hp, 12), ammoType: -1, _that: m };
        }
// PLAYER_PART_END s4.wkgPhanDaiDien.1

// index.html:55969 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgPhanNghi.1 EDITABLE
function wkgPhanNghi(Q){
            Q.phim = {};
            if (typeof aiNhin !== 'function' || typeof aiTanCong !== 'function') return;
            let m = wkgMucGan(Q.ng); if (!m) return;
            if (!Q.TT && typeof aiTTMoi === 'function') Q.TT = aiTTMoi();
            if (!Q.TT) return;
            let N = null;
            try { N = aiNhin(Q.ng, wkgPhanDaiDien(Q.ng, m)); } catch(e){ return; }
            if (!N) return;
            let giu = function(ma){ Q.phim[ma] = true; };
            let K = (typeof AI_KHO !== 'undefined' && AI_KHO[WKG_PHAN_KHO])
                      ? AI_KHO[WKG_PHAN_KHO] : { tre: 8, boLo: 0.14, sacToiUu: true, sacTiLe: 0.35 };
            try { aiTanCong(N, giu, Q.TT, K); } catch(e){}
            // KHONG dung aiDiChuyen: bo do danh cho mot tran tay doi tay, nen may phan than
            // deu tinh ra CUNG MOT diem dung va chong len nhau thanh mot con. Thay bang mot
            // nhip DANH - LUI - CHO HOI DAN - VAO LAI, moi con mot lan rieng.
            wkgPhanDiChuyen(Q, m, giu);
            delete Q.phim['KeyU']; delete Q.phim['KeyL'];     // khong chieu cuoi, khong khien
        }
// PLAYER_PART_END s4.wkgPhanNghi.1

// index.html:55999 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_PT_GAN.1 EDITABLE
const WKG_PT_GAN = 8;
// PLAYER_PART_END s4.WKG_PT_GAN.1

// index.html:56000 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_PT_XA.1 EDITABLE
const WKG_PT_XA  = 92;
// PLAYER_PART_END s4.WKG_PT_XA.1

// index.html:56001 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_PT_NGHI.1 EDITABLE
const WKG_PT_NGHI = 120;
// PLAYER_PART_END s4.WKG_PT_NGHI.1

// index.html:56002 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgPhanDiChuyen.1 EDITABLE
function wkgPhanDiChuyen(Q, m, giu){
            let P = Q.ng; if (!P || !m) return;
            if (Q.lan === undefined) Q.lan = Math.floor(wkgPhan.indexOf(Q) / 2) * 26;
            let mw = m.w || 40;
            let cx = P.x + P.w/2, mcx = m.x + mw/2;
            /* CHO HUT LAM PHAN THAN CHAY RA CUOI MAP: truoc day `ben` la mot BEN CO DINH gan
               theo chi so, con khe ho lai tinh THEO BEN DO. Con nao dang dung o ben KIA muc
               tieu se ra khe ho AM va rat lon -> he doc thanh "con qua gan" -> no lui... ma
               lui thi cang xa ben do, khe ho cang am hon nua. Vong lap do day no chay thang
               ra mep ban do va khong bao gio quay lai.
               Nay khe ho luon do theo BEN MA NO DANG DUNG, nen khong bao gio am. */
            let benThat = (cx < mcx) ? -1 : 1;
            let ho = (benThat > 0) ? (P.x - (m.x + mw)) : (m.x - (P.x + P.w));
            if (!(ho > 0)) ho = 0;
            let mucVao = WKG_PT_GAN + Q.lan, mucLui = WKG_PT_XA + Q.lan;

            /* Ban truoc lui theo DIEU KIEN "day the luc" nen chung chay tit ra 230px roi dung
               do cho gan ba giay — Hans goi dung la luoi bieng. Nay lui la mot nhip CO DONG
               HO: het the luc thi lui 92px, dem dung 60 khung roi vao lai, khong cho day binh. */
            if (Q.pha2 === undefined){ Q.pha2 = 'vao'; Q.nghi = 0; }
            if (Q.pha2 === 'vao'){
                if (P.ammo <= 1 || P.isOverheated){ Q.pha2 = 'lui'; Q.nghi = WKG_PT_NGHI; }
            } else {
                if (Q.nghi > 0) Q.nghi--;
                if (Q.nghi <= 0){
                    // Nap lai the luc NGAY tai day thay vi cho thanh hoi tu nhien. Neu cho hoi
                    // thi nhip lui do TOC DO HOI quyet dinh chu khong do dong ho: do duoc phan
                    // than vao lai voi 1 the luc, danh mot cai roi lui ngay — cac pha dai
                    // 86 / 34 / 1 / 104 khung, giat cuc, va do la cai "lui ve dung giat giat".
                    P.ammo = P.maxAmmo; P.isOverheated = false; P.overheatTimer = 0;
                    Q.pha2 = 'vao';
                }
            }
            let muc = (Q.pha2 === 'vao') ? mucVao : mucLui;
            let lech = ho - muc;
            // day nhau: chi khi that su chong len nhau, va nhuong theo chi so de hai con khong
            // cung day mot luc roi rung tai cho (do la cai "dung yen giat giat").
            for (let R of wkgPhan){
                if (R === Q || !R.ng) continue;
                let d = (P.x + P.w/2) - (R.ng.x + R.ng.w/2);
                if (Math.abs(d) < 28 && wkgPhan.indexOf(Q) > wkgPhan.indexOf(R)){
                    giu(d >= 0 ? 'KeyD' : 'KeyA'); return;
                }
            }
            // CHOT CUNG: du the nao cung khong duoc ra xa muc tieu qua mucLui + 70. Day la
            // luoi an toan cho moi vong lap dieu khien nao con sot, khong phai thay cho no.
            // CHOT CUNG, khong phai keo tu tu: keo 6px mot khung thi thu gi do day ra nhanh
            // hon van thang. Dat thang vi tri — no thanh mot BUC TUONG, phan than khong the
            // ra xa muc tieu qua con so nay du dieu gi xay ra.
            let toiDa = mucLui + 70;
            if (ho > toiDa) P.x += (benThat > 0 ? -1 : 1) * (ho - toiDa);
            if (Math.abs(lech) < 24) return;                 // vung chet rong hon -> khong rung
            let raVao = (lech > 0) ? -1 : 1;                 // -1 = lai gan, +1 = lui ra
            let huongToiMuc = (mcx > cx) ? 1 : -1;
            let di = raVao < 0 ? huongToiMuc : -huongToiMuc;
            giu(di > 0 ? 'KeyD' : 'KeyA');
        }
// PLAYER_PART_END s4.wkgPhanDiChuyen.1

// index.html:56059 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgPhanVienPhim.1 EDITABLE
function wkgPhanVienPhim(Q){
            for (let i = 0; i < WKG_PHAN_PHIM.length; i++){
                let ma = WKG_PHAN_PHIM[i];
                let moi = !!Q.phim[ma], cu = !!Q.phimCu[ma];
                if (moi === cu) continue;
                Q.phimCu[ma] = moi;
                try {
                    let e = new KeyboardEvent(moi ? 'keydown' : 'keyup', { code: ma, bubbles: false });
                    e._may = 1; window.dispatchEvent(e);
                } catch(err){}
            }
        }
// PLAYER_PART_END s4.wkgPhanVienPhim.1

// index.html:56071 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgPhanChay.1 EDITABLE
function wkgPhanChay(Q){
            Q.t++;
            wkgPhanVoi(Q, function(){
                wkgPhanNghi(Q);
                for (const k in keys) delete keys[k];
                Object.assign(keys, Q.phim);
                wkgPhanVienPhim(Q);
                for (const k in keys) delete keys[k];
                Object.assign(keys, Q.phim);
                // KHONG bom day the luc nua: co het the luc thi nhip "danh -> lui ra cho hoi
                // -> vao lai" moi ton tai. Chi giu cho chung bat tu.
                Q.ng.hp = Q.ng.maxHp;
                Q.ng.invincible = true; Q.ng.invTimer = 999999;
                try { Q.ng.update(); } catch(e){}
                try { if (Q.ng.giaoTick) Q.ng.giaoTick(); } catch(e){}
            });
        }
// PLAYER_PART_END s4.wkgPhanChay.1

// index.html:56089 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickPhan.1 EDITABLE
function wkgTickPhan(){
            if (wkgChan){
                wkgChan.t++;
                if (wkgChan.t % 300 === 0) wkgThemPhan(dino, wkgPhan.length);
            } else if (!wkgPhan.length) return;
            for (let i = wkgPhan.length - 1; i >= 0; i--){
                let Q = wkgPhan[i];
                if (!Q || !Q.ng){ wkgPhan.splice(i, 1); continue; }
                wkgPhanChay(Q);
                if (!wkgChan) wkgPhan.splice(i, 1);      // nha K la chung tan ngay
            }
        }
// PLAYER_PART_END s4.wkgTickPhan.1

// index.html:56101 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickVong.1 EDITABLE
function wkgTickVong(){
            for (let i = wkgVong.length - 1; i >= 0; i--){
                let V = wkgVong[i]; V.t--; V.nhip++;
                if (V.nhip % 30 === 0) wkgNoTai(V.x, V.y - 20, V.r, 1, null);   // 2 dmg/giay
                if (V.t <= 0) wkgVong.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.wkgTickVong.1

// index.html:56111 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickSet.1 EDITABLE
function wkgTickSet(){
            if (!wkgSet) return;
            wkgSet.t--; wkgSet.nhip++;
            let m = wkgMucGan(dino);
            if (m){
                let mx = m.x + (m.w||20)/2;
                wkgSet.x += (mx - wkgSet.x) * 0.12;
                wkgSet.y += ((m.y - 130) - wkgSet.y) * 0.12;
                wkgSet.y = Math.max(-CAM_TROI + 34, Math.min(wkgDat() - 200, wkgSet.y));
                if (wkgSet.nhip % 60 === 1)
                    wkgSetTia(mx, m.y + (m.h||20)/2, 3, 1.4 * WKG_CM, wkgSet.y + 22);
            }
            if (wkgSet.t <= 0) wkgSet = null;
        }
// PLAYER_PART_END s4.wkgTickSet.1

// index.html:56125 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickLoc.1 EDITABLE
function wkgTickLoc(){
            // ba vong xoay roi DAY LOC — dieu khien boi dino._wkgLoc
            let L = dino._wkgLoc;
            if (L){
                L.t++;
                if (L.t % 16 === 0){
                    L.i++;
                    if (L.i < 3){
                        wkgDanh(dino, { dmg: 4, life: 12, reach: 0, hTop: 28, hBot: 28, cd: 8,
                                        kf: 'xoay', spinR: 168, ton: 0 });
                    } else {
                        wkgDanh(dino, { dmg: 5, life: 14, reach: 0, hTop: 30, hBot: 30, cd: 26,
                                        kf: 'xoay', spinR: 180, ton: 0 });
                        let d = dino.isFacingLeft ? -1 : 1;
                        wkgLoc.push({ x: dino.x + dino.w/2 + d * 40, y: wkgDat() - 70, dir: d,
                                      t: 150, hit: new Set(), di: 0 });
                        dino._wkgLoc = null;
                        shakeTimer = Math.max(shakeTimer || 0, 26);
                        return;
                    }
                }
            }
            for (let i = wkgLoc.length - 1; i >= 0; i--){
                let X = wkgLoc[i];
                if (X.tia){ X.t--; if (X.t <= 0) wkgLoc.splice(i, 1); continue; }
                X.t--; X.x += X.dir * 7; X.di += 7;
                let ds = [];
                if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
                if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
                for (let o of ds){
                    if (!o || o.hp === undefined || o.hp <= 0 || o.dying || o.invulnAll) continue;
                    if (X.hit.has(o)) continue;
                    let ox = o.x + (o.w||20)/2, oy = o.y + (o.h||20)/2;
                    if (Math.abs(ox - X.x) > 86 || Math.abs(oy - X.y) > 120) continue;
                    X.hit.add(o);
                    if (typeof dealDamage === 'function') dealDamage(o, 5 + wkgCong(), 'flat');
                    wkgHatTung(o, 70);                                        // HAT TUNG (tu lo cho roi xuong)
                    if (o.hp <= 0) o._wkgCuon = 1;                            // chet trong loc thi bi CUON DI
                }
                /* LOC CUON CA DAN. Khong ban chung bay tiep ma BOC HAN ra khoi mang dan cua
                   dich roi giu trong long loc: lam vay thi chung khong con cham duoc nguoi choi
                   nua, va cung khong phai danh nhau voi ham update rieng cua tung vien. */
                if (!X.dan) X.dan = [];
                const hut = (mang, chuTa) => {
                    if (!mang) return;
                    for (let q = mang.length - 1; q >= 0; q--){
                        let bp = mang[q];
                        if (!bp) continue;
                        if (chuTa !== undefined && bp.owner === chuTa) continue;
                        let px = bp.x + (bp.w || 8) / 2, py = bp.y + (bp.h || 8) / 2;
                        if (Math.abs(px - X.x) > 92 || py < X.y - 110 || py > X.y + 110) continue;
                        X.dan.push({ mau: bp.color || "#FF7043", w: bp.w || 8, h: bp.h || 8,
                                     a: Math.random() * 6.283, r: 24 + Math.random() * 54,
                                     cao: Math.random() * 150, t: 0 });
                        mang.splice(q, 1);
                    }
                };
                if (typeof bossProjectiles !== 'undefined') hut(bossProjectiles);
                if (gameState === 'pvp' && typeof projectiles !== 'undefined')
                    hut(projectiles, (typeof dino !== 'undefined' && dino) ? dino.id : 1);
                for (let D of X.dan){ D.t++; D.a += 0.26; D.cao += 2.4; D.r *= 0.985; }
                // keo cac xac bi cuon theo loc roi day ra khoi man
                for (let o of ds) if (o && o._wkgCuon){
                    o.x += X.dir * 13; o.y -= 5;
                    if (o.dying !== undefined) o.deathTimer = Math.max(o.deathTimer || 0, 2);
                }
                if (X.t <= 0 || X.di > 20 * WKG_CM || X.x < -90 || X.x > (typeof WORLD_W !== 'undefined' ? WORLD_W + 90 : 4000))
                    wkgLoc.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.wkgTickLoc.1

// index.html:56205 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgHatTung.1 EDITABLE
function wkgHatTung(o, cao, treo, g){
            if (!o) return;
            let nen = (o.baseY !== undefined) ? o.baseY : o.y;
            o.y = Math.max(-CAM_TROI + 20, o.y - cao);
            /* KHONG dat o.dy = -8 nua. Voi may con CO trong luc (Death) thi dy am lam chung
               bay len them vai khung, va cai do bi chinh cai bay-that ben duoi doc nham ->
               tha quyen -> treo o -74 suot gan 300 khung. Cu vung roi tu lo lay.
               treo / g: tuy chon. Mac dinh 0 / 0.9 — moi cho goi cu giu nguyen. */
            if (isFinite(o.y) && isFinite(nen) && o.y < nen - 1)
                o._wkgHat = { nen: nen, v: 0, t: 0, yCu: o.y, len: 0, treo: treo || 0, g: g || 0 };
        }
// PLAYER_PART_END s4.wkgHatTung.1

// index.html:56216 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickHat.1 EDITABLE
function wkgTickHat(){
            let ds = [];
            if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
            if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
            for (let o of ds){
                let H = o && o._wkgHat; if (!H) continue;
                H.t++;
                if (o.hp === undefined || o.hp <= 0 || o.dying || o._wkgCuon
                    || o.aaSeq || o.aaCombo || H.t > 300){ o._wkgHat = null; continue; }
                if ((H.treo || 0) > 0){
                    H.treo--;
                    o.y = H.yCu;
                    if (o.dy !== undefined) o.dy = 0;
                    continue;
                }
                /* Chi keo nhung con KHONG co vat ly cua rieng no. Phan biet bang cach nhin
                   chinh con boss: `d` la doan no TU di chuyen ke tu lan ta chinh truoc.
                   d > 0  -> no dang tu roi (co trong luc that, nhu Helios/Magma/Death) -> tra
                             quyen cho no, no tu ha canh dung cho, ke ca ha canh len BE MAT
                             lo lung (Death dap xuong platform cao hon mat dat 74px la DUNG).
                   d < 0 ba lan -> no dang tu khang dinh mot do cao (boss bay nhu Ptero) -> tha.
                   d = 0 -> no khong he dung toi y (Trice / Spino / Godzilla) -> ta keo. */
                let d = o.y - H.yCu;
                if (d > 0.3){ o._wkgHat = null; continue; }
                if (d < -0.3 && ++H.len >= 3){ o._wkgHat = null; continue; }
                if (o.y >= H.nen - 0.5){
                    o.y = H.nen;
                    if (o.dy !== undefined) o.dy = 0;
                    if (o.grounded !== undefined) o.grounded = true;
                    o._wkgHat = null; continue;
                }
                H.v = Math.min(17, H.v + (H.g || 0.9));
                o.y = Math.min(H.nen, o.y + H.v);
                H.yCu = o.y;
            }
        }
// PLAYER_PART_END s4.wkgTickHat.1

// index.html:56252 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickUlt.1 EDITABLE
function wkgTickUlt(){
            if (!wkgUlt) return;
            let U = wkgUlt; U.t++;
            dino.invincible = true; dino.invTimer = Math.max(dino.invTimer || 0, 20);
            if (U.t === 74){
                let m = wkgMucGan(dino);
                U.x = m ? (m.x + (m.w||20)/2) : (dino.x + dino.w/2 + (dino.isFacingLeft ? -120 : 120));
            }
            if (U.t === 96){
                U.no = 1;
                wkgNoTai(U.x, wkgDat() - 60, Math.max(canvas.width, 900), 100, "NHƯ Ý KIM CÔ BỔNG!");
                shakeTimer = Math.max(shakeTimer || 0, 60);
                if (typeof visualEffects !== 'undefined')
                    for (let q = 0; q < 5; q++)
                        visualEffects.push(new Effect(U.x + (q-2)*90, wkgDat() - 20, 'explosion', true, 70));
                wkgBuff = WKG_ULT_BUFF;
            }
            if (U.t > 140){ wkgUlt = null; }
        }
// PLAYER_PART_END s4.wkgTickUlt.1

// index.html:56273 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickSau.1 EDITABLE
function wkgTickSau(){
            wkgTickHat();        // chay sau boss.update(): keo con bi hat tung ve mat dat
            if (typeof dino === 'undefined' || !dino || !wkgBat()) return;
            if (dino._wkgDap){ /* dang lao dap dau: wkgTickDap tu lai vi tri */ }
            else if (wkgCon){
                dino.x = wkgCon.x;                       // dung tren ngon gay: KHONG di ngang duoc
                dino.y = wkgDat() - dino.h - wkgCon.cao;
                dino.dy = 0; dino.grounded = false;
                dashVx = 0;
            } else if (wkgMay){
                let sp = 4.6;
                if (keys['KeyA'] || keys['ArrowLeft']){ dino.x -= sp; dino.isFacingLeft = true; }
                if (keys['KeyD'] || keys['ArrowRight']){ dino.x += sp; dino.isFacingLeft = false; }
                if (keys['KeyW'] || keys['Space'] || keys['ArrowUp']) dino.y -= sp;
                if (keys['KeyS'] || keys['ArrowDown']) dino.y += sp;
                dino.y += Math.sin(wkgMay.bob) * 0.9;    // nhap nho
                dino.y = Math.max(-CAM_TROI + 14, Math.min(wkgDat() - dino.h - 24, dino.y));
                dino.dy = 0; dino.grounded = false;
            } else if (wkgThu > 0){
                dino.x = (dino._wkgX === undefined) ? dino.x : dino._wkgX;
                dashVx = 0;
            }
            if (wkgThu > 0 && dino._wkgX === undefined) dino._wkgX = dino.x;
            if (wkgThu <= 0) dino._wkgX = undefined;
            if (typeof worldL === 'function')
                dino.x = Math.max(worldL(), Math.min(worldR() - dino.w, dino.x));
        }
// PLAYER_PART_END s4.wkgTickSau.1

// index.html:56323 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_MAU_THAN.1 EDITABLE
const WKG_MAU_THAN  = "#2E1A12";
// PLAYER_PART_END s4.WKG_MAU_THAN.1

// index.html:56324 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_MAU_THAN2.1 EDITABLE
const WKG_MAU_THAN2 = "#6E3F26";
// PLAYER_PART_END s4.WKG_MAU_THAN2.1

// index.html:56325 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_MAU_BONG.1 EDITABLE
const WKG_MAU_BONG  = "#B07A45";
// PLAYER_PART_END s4.WKG_MAU_BONG.1

// index.html:56326 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_MAU_CO.1 EDITABLE
const WKG_MAU_CO    = "#E8C368";
// PLAYER_PART_END s4.WKG_MAU_CO.1

// index.html:56327 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_MAU_CO2.1 EDITABLE
const WKG_MAU_CO2   = "#FFF0BE";
// PLAYER_PART_END s4.WKG_MAU_CO2.1

// index.html:56328 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_MAU_CO3.1 EDITABLE
const WKG_MAU_CO3   = "#8A6A18";
// PLAYER_PART_END s4.WKG_MAU_CO3.1

// index.html:56358 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgNoi.1 EDITABLE
function wkgNoi(k, u, kieu){
            if (kieu === 'giu')   return 0;
            if (kieu === 'nhanh') return u * u * u;
            if (kieu === 'cham')  return 1 - Math.pow(1 - u, 3);
            if (kieu === 'phang') return u;
            return u * u * (3 - 2 * u);
        }
// PLAYER_PART_END s4.wkgNoi.1

// index.html:56365 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgLay.1 EDITABLE
function wkgLay(kf, u){
            if (u <= kf[0].t) return kf[0];
            for (let i = 1; i < kf.length; i++){
                if (u <= kf[i].t){
                    let A = kf[i-1], B = kf[i];
                    let d = Math.max(1e-6, B.t - A.t);
                    let w = wkgNoi(i, (u - A.t) / d, B.e);
                    const L = (n, m) => { let x = (A[n] === undefined ? m : A[n]), y = (B[n] === undefined ? m : B[n]);
                                          return x + (y - x) * w; };
                    return { a: L('a',0), b: L('b',0), len: L('len',1), gx: L('gx',0), gy: L('gy',0),
                             piv: L('piv',0.16), ngh: L('ngh',0) };
                }
            }
            let z = kf[kf.length-1];
            return { a: z.a||0, b: z.b||0, len: z.len===undefined?1:z.len, gx: z.gx||0, gy: z.gy||0,
                     piv: z.piv===undefined?0.16:z.piv, ngh: z.ngh||0 };
        }
// PLAYER_PART_END s4.wkgLay.1

// index.html:56385 · Phạm vi: global
// PLAYER_PART_BEGIN s4.WKG_TU.1 EDITABLE
const WKG_TU = {
            // TU THE CAM: chong gay xuong, mui chech len, doi thu truoc mat.
            cam: [ {t:0, a:-0.16, b:0.34, len:1, gx:-18, gy:2, piv:0.26, ngh:0} ],

            /* VU HOA / QUET NGANG (扫棍) — chuoi J.
               Cam duoi gay, xoay nguoi, dau gay ve TRON MOT VONG NGANG quanh minh.
               Nhip: lay da ra sau that cham, quet qua truoc mat trong 2 khung, giu mot nhip o
               diem cham, roi tra gay ve the thu. */
            vuhoa: [ {t:0.00, a:-0.10, b:-2.58, len:1.00, gx:-22, gy: 2, piv:0.07, ngh:-0.17},
                     {t:0.30, a:-0.16, b:-2.26, len:1.02, gx:-28, gy: 2, piv:0.07, ngh:-0.23, e:'cham'},
                     {t:0.40, a:-0.17, b:-2.20, len:1.03, gx:-28, gy: 2, piv:0.07, ngh:-0.25, e:'giu'},
                     {t:0.52, a:-0.04, b:-0.62, len:1.14, gx:  4, gy: 0, piv:0.07, ngh: 0.04, e:'nhanh'},
                     {t:0.60, a: 0.14, b: 0.46, len:1.20, gx: 20, gy:-1, piv:0.07, ngh: 0.24, e:'nhanh'},
                     {t:0.68, a: 0.15, b: 0.60, len:1.20, gx: 20, gy:-1, piv:0.07, ngh: 0.26, e:'giu'},
                     {t:1.00, a:-0.08, b: 1.85, len:1.00, gx:-18, gy: 2, piv:0.07, ngh: 0.02, e:'cham'} ],

            /* KICH CON (劈棍) — don ket. Vac nguoc qua vai, bo thang xuong dat. */
            kich:  [ {t:0.00, a:-0.55, b: 0.20, len:1.00, gx:-16, gy: 0, piv:0.07, ngh:-0.10},
                     {t:0.26, a:-2.15, b: 0.14, len:1.02, gx:-26, gy: 4, piv:0.07, ngh:-0.22, e:'cham'},
                     {t:0.38, a:-2.20, b: 0.12, len:1.04, gx:-26, gy: 4, piv:0.07, ngh:-0.24, e:'giu'},
                     {t:0.52, a:-0.60, b: 0.06, len:1.22, gx:  4, gy:-2, piv:0.16, ngh: 0.06, e:'nhanh'},
                     {t:0.60, a: 1.42, b: 0.00, len:1.30, gx: 20, gy: 2, piv:0.16, ngh: 0.28, e:'nhanh'},
                     {t:0.70, a: 1.46, b: 0.00, len:1.30, gx: 20, gy: 2, piv:0.16, ngh: 0.30, e:'giu'},
                     {t:1.00, a: 0.20, b: 0.26, len:1.00, gx:-14, gy: 1, piv:0.24, ngh: 0.04, e:'cham'} ],

            /* CHOC CON (戳棍) — than gay VUON DAI. Rut ve lay da truoc, ban ra, giu, thu. */
            choc:  [ {t:0.00, a: 0.02, b: 0.06, len:1.00, gx:-16, gy: 0, piv:0.12, ngh:-0.04},
                     {t:0.20, a: 0.04, b: 0.06, len:0.92, gx:-40, gy: 0, piv:0.12, ngh:-0.15, e:'cham'},
                     {t:0.30, a: 0.03, b: 0.04, len:0.92, gx:-40, gy: 0, piv:0.12, ngh:-0.16, e:'giu'},
                     {t:0.40, a:-0.02, b: 0.00, len:2.45, gx: 28, gy:-1, piv:0.10, ngh: 0.19, e:'nhanh'},
                     {t:0.60, a:-0.02, b: 0.00, len:2.45, gx: 28, gy:-1, piv:0.10, ngh: 0.20, e:'giu'},
                     {t:1.00, a: 0.02, b: 0.10, len:1.00, gx:-16, gy: 0, piv:0.07, ngh: 0.00, e:'cham'} ],

            /* BO XUONG — tu tren khong bo thang xuong. */
            bo:    [ {t:0.00, a:-1.10, b: 0.12, len:1.00, gx:-12, gy:-4, piv:0.07, ngh:-0.14},
                     {t:0.22, a:-1.95, b: 0.10, len:1.02, gx:-20, gy:-6, piv:0.07, ngh:-0.20, e:'cham'},
                     {t:0.32, a:-2.00, b: 0.10, len:1.04, gx:-20, gy:-6, piv:0.07, ngh:-0.20, e:'giu'},
                     {t:0.46, a: 1.50, b: 0.00, len:1.46, gx: 16, gy: 4, piv:0.16, ngh: 0.26, e:'nhanh'},
                     {t:0.58, a: 1.52, b: 0.00, len:1.46, gx: 16, gy: 4, piv:0.16, ngh: 0.28, e:'giu'},
                     {t:1.00, a: 0.10, b: 0.24, len:1.00, gx:-14, gy: 0, piv:0.24, ngh: 0.04, e:'cham'} ],

            /* QUET NGANG LON (J -> K) — mot vong ruoi, cham hon va sau hon Vu Hoa. */
            quet:  [ {t:0.00, a: 0.26, b:-2.30, len:1.00, gx:-24, gy: 2, piv:0.07, ngh:-0.22},
                     {t:0.32, a: 0.22, b:-1.40, len:1.06, gx:-20, gy: 1, piv:0.07, ngh:-0.26, e:'cham'},
                     {t:0.48, a: 0.10, b:-0.30, len:1.24, gx: -2, gy: 0, piv:0.07, ngh:-0.02, e:'nhanh'},
                     {t:0.56, a: 0.02, b: 0.50, len:1.36, gx: 22, gy:-2, piv:0.07, ngh: 0.26, e:'nhanh'},
                     {t:0.66, a: 0.02, b: 0.74, len:1.36, gx: 24, gy:-2, piv:0.07, ngh: 0.28, e:'giu'},
                     {t:0.86, a: 0.08, b: 2.60, len:1.14, gx:  6, gy: 1, piv:0.07, ngh: 0.16, e:'cham'},
                     {t:1.00, a:-0.12, b: 3.60, len:1.00, gx:-18, gy: 2, piv:0.24, ngh: 0.02, e:'cham'} ],

            /* XOAY — quay ngang lien tuc quanh nguoi (moc charge, Channel). */
            xoay:  [ {t:0.00, a: 0.10, b:-0.20, len:1.14, gx: 2, gy:0, piv:0.07, ngh:-0.12},
                     {t:0.50, a: 0.06, b: 2.94, len:1.20, gx: 8, gy:0, piv:0.16, ngh: 0.12, e:'phang'},
                     {t:1.00, a: 0.10, b: 6.08, len:1.14, gx: 2, gy:0, piv:0.07, ngh:-0.12, e:'phang'} ],

            /* LUOT DAM — thap, thang, nhanh. */
            luot:  [ {t:0.00, a: 0.10, b: 0.06, len:0.94, gx:-28, gy: 0, piv:0.12, ngh:-0.12},
                     {t:0.14, a: 0.10, b: 0.06, len:0.94, gx:-30, gy: 0, piv:0.12, ngh:-0.14, e:'giu'},
                     {t:0.30, a: 0.04, b: 0.00, len:2.05, gx: 24, gy: 0, piv:0.10, ngh: 0.22, e:'nhanh'},
                     {t:0.46, a: 0.04, b: 0.00, len:2.05, gx: 24, gy: 0, piv:0.10, ngh: 0.22, e:'giu'},
                     {t:1.00, a: 0.08, b: 0.10, len:1.00, gx:-16, gy: 0, piv:0.07, ngh: 0.00, e:'cham'} ]
        };
// PLAYER_PART_END s4.WKG_TU.1

// index.html:56464 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTamTu.1 EDITABLE
function wkgTamTu(ten, sc){
            let kf = WKG_TU[ten]; if (!kf) return null;
            let R = 0, T = 0, B = 0, nw = (dino ? dino.w : 32), nh = (dino ? dino.h : 44);
            for (let K of kf){
                let a = K.a || 0, b = K.b || 0;
                let len = (K.len === undefined) ? 1 : K.len;
                let piv = (K.piv === undefined) ? 0.16 : K.piv;
                let Lg = 138 * sc * len;
                let gx = 10 + (K.gx || 0) * sc * 0.9, gy = nh * 0.42 + (K.gy || 0);
                let cb = Math.cos(b); if (Math.abs(cb) < 0.17) cb = (cb < 0 ? -0.17 : 0.17);
                let ux = Math.cos(a) * cb, uy = Math.sin(a);
                for (let t of [-piv, 1 - piv]){
                    let x = gx + ux * Lg * t, y = gy + uy * Lg * t;
                    if (x > R) R = x;
                    if (-y > T) T = -y;
                    if (y - nh > B) B = y - nh;
                }
            }
            return { reach: Math.round(R - (nw / 2) + 5), hTop: Math.round(T), hBot: Math.round(B) };
        }
// PLAYER_PART_END s4.wkgTamTu.1

// index.html:56485 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgNghiengSau.1 EDITABLE
let wkgNghiengSau = false;
// PLAYER_PART_END s4.wkgNghiengSau.1

// index.html:56486 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgNguoiTruoc.1 EDITABLE
function wkgNguoiTruoc(){
            wkgNghiengSau = false;
            if (typeof dino === 'undefined' || !dino || !wkgBat() || !wkgAnim) return;
            let T = wkgTuThe(); let g = (T.ngh || 0) * ((wkgAnim.dir < 0) ? -1 : 1);
            if (Math.abs(g) < 0.004) return;
            ctx.save();
            ctx.translate(dino.x + dino.w / 2, dino.y + dino.h);
            ctx.rotate(g);
            ctx.translate(-(dino.x + dino.w / 2), -(dino.y + dino.h));
            wkgNghiengSau = true;
        }
// PLAYER_PART_END s4.wkgNguoiTruoc.1

// index.html:56497 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgNguoiSau.1 EDITABLE
function wkgNguoiSau(){ if (wkgNghiengSau){ ctx.restore(); wkgNghiengSau = false; } }
// PLAYER_PART_END s4.wkgNguoiSau.1

// index.html:56499 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgAnim.1 EDITABLE
let wkgAnim = null;
// PLAYER_PART_END s4.wkgAnim.1

// index.html:56500 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgVet.1 EDITABLE
let wkgVet = [];
// PLAYER_PART_END s4.wkgVet.1

// index.html:56501 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgFx.1 EDITABLE
let wkgFx  = [];
// PLAYER_PART_END s4.wkgFx.1

// index.html:56503 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTuThe.1 EDITABLE
function wkgTuThe(){
            let A = wkgAnim;
            if (!A) return wkgLay(WKG_TU.cam, 0);
            let kf = WKG_TU[A.ten] || WKG_TU.cam;
            let T = wkgLay(kf, Math.min(1, A.t / A.T));
            // Nhat CHAN cua chuoi quet nguoc chieu voi nhat LE — nguoi ta khong bao gio quet
            // hai nhat lien tiep cung mot ben, vi con gay sau nhat truoc dang o ben kia nguoi.
            if ((A.k || 0) % 2 === 1){ T = { a: T.a, b: -T.b, len: T.len, gx: T.gx, gy: T.gy,
                                             piv: T.piv, ngh: -T.ngh }; }
            return T;
        }
// PLAYER_PART_END s4.wkgTuThe.1

// index.html:56514 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgDatTu.1 EDITABLE
function wkgDatTu(ten, T, k){
            wkgAnim = { ten: ten, t: 0, T: Math.max(8, T | 0), dir: (dino && dino.isFacingLeft) ? -1 : 1, k: k || 0 };
            wkgVet.length = 0;
        }
// PLAYER_PART_END s4.wkgDatTu.1

// index.html:56518 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgVaCham.1 EDITABLE
function wkgVaCham(x, y, manh, mau){
            wkgFx.push({ x: x, y: y, t: 0, T: manh >= 2 ? 26 : 18, manh: manh, mau: mau || "#FFD76A" });
            if (wkgFx.length > 24) wkgFx.shift();
        }
// PLAYER_PART_END s4.wkgVaCham.1

// index.html:56528 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgDatVang.1 EDITABLE
function wkgDatVang(cx, dai, d, manh){
            let n = Math.max(4, Math.round(dai / 90) + 1);
            for (let q = 1; q <= n; q++){
                let t = q / n;
                wkgFx.push({ dat: 1, x: cx + d * dai * t, y: wkgDat() - 4, t: 0,
                             T: 26 + q * 2, manh: manh, d: d, tre: Math.round((1 - t) * 2),
                             manhVun: [] });
                let F = wkgFx[wkgFx.length - 1];
                for (let k = 0; k < 5 + (manh >= 2 ? 3 : 0); k++){
                    let goc = -0.35 - Math.random() * 1.0;
                    let v = 3.2 + Math.random() * 4.6;
                    F.manhVun.push({ x: 0, y: 0, vx: Math.cos(goc) * v * (Math.random() < 0.5 ? -1 : 1),
                                     vy: Math.sin(goc) * v, r: 2 + Math.random() * 3 });
                }
            }
            if (wkgFx.length > 48) wkgFx.splice(0, wkgFx.length - 48);
        }
// PLAYER_PART_END s4.wkgDatVang.1

// index.html:56545 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgTickFx.1 EDITABLE
function wkgTickFx(){
            for (let i = wkgFx.length - 1; i >= 0; i--){
                let F = wkgFx[i]; F.t++;
                if (F.dat && F.manhVun && F.t > (F.tre || 0)){
                    for (let m of F.manhVun){ m.x += m.vx; m.y += m.vy; m.vy += 0.42; if (m.y > 0){ m.y = 0; m.vy *= -0.32; m.vx *= 0.7; } }
                }
                if (F.t > F.T) wkgFx.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.wkgTickFx.1

// index.html:56558 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgVeCon.1 EDITABLE
function wkgVeCon(x0, y0, z0, x1, y1, z1, day, nac){
            let dx = x1 - x0, dy = y1 - y0, L = Math.max(1, Math.hypot(dx, dy));
            let nx = -dy / L, ny = dx / L;
            let w0 = day * (0.42 + 0.58 * (z0 * 0.5 + 0.5)) / 2;
            let w1 = day * (0.42 + 0.58 * (z1 * 0.5 + 0.5)) / 2;
            const quad = (a, b, m) => {
                let p0x = x0 + (x1 - x0) * a, p0y = y0 + (y1 - y0) * a;
                let p1x = x0 + (x1 - x0) * b, p1y = y0 + (y1 - y0) * b;
                let q0 = w0 + (w1 - w0) * a + m, q1 = w0 + (w1 - w0) * b + m;
                ctx.beginPath();
                ctx.moveTo(p0x + nx * q0, p0y + ny * q0);
                ctx.lineTo(p1x + nx * q1, p1y + ny * q1);
                ctx.lineTo(p1x - nx * q1, p1y - ny * q1);
                ctx.lineTo(p0x - nx * q0, p0y - ny * q0);
                ctx.closePath();
            };
            // 1) vien ngoai
            ctx.fillStyle = "#150C08"; quad(0, 1, 1.7); ctx.fill();
            // 2) THAN — sat sam nga do, sang dan ve phia dau gan
            let g = ctx.createLinearGradient(x0, y0, x1, y1);
            g.addColorStop(0, z0 > z1 ? WKG_MAU_THAN2 : WKG_MAU_THAN);
            g.addColorStop(0.5, "#4A2A1B");
            g.addColorStop(1, z1 > z0 ? WKG_MAU_THAN2 : WKG_MAU_THAN);
            ctx.fillStyle = g; quad(0, 1, 0); ctx.fill();
            // 3) VACH CAO SANG chay doc than — lam no ra kim loai tron chu khong phai thanh det
            ctx.save();
            quad(0, 1, 0); ctx.clip();
            ctx.fillStyle = WKG_MAU_BONG; ctx.globalAlpha = 0.42;
            ctx.beginPath();
            ctx.moveTo(x0 + nx * w0 * 0.62, y0 + ny * w0 * 0.62);
            ctx.lineTo(x1 + nx * w1 * 0.62, y1 + ny * w1 * 0.62);
            ctx.lineTo(x1 + nx * w1 * 0.12, y1 + ny * w1 * 0.12);
            ctx.lineTo(x0 + nx * w0 * 0.12, y0 + ny * w0 * 0.12);
            ctx.closePath(); ctx.fill();
            // 4) KHAC CHIM doc than
            ctx.globalAlpha = 0.30; ctx.strokeStyle = "#120A06"; ctx.lineWidth = 1;
            for (let q = 1; q < 7; q++){
                let a = q / 7;
                let px = x0 + (x1 - x0) * a, py = y0 + (y1 - y0) * a;
                let wq = (w0 + (w1 - w0) * a) * 0.9;
                ctx.beginPath(); ctx.moveTo(px + nx * wq, py + ny * wq);
                ctx.lineTo(px - nx * wq, py - ny * wq); ctx.stroke();
            }
            // 4b) NAC 2 — VAN SANG MAU VANG chay doc than gay
            if ((nac || 0) >= 2){
                let nh = 0.55 + 0.45 * Math.sin(frames * 0.22);
                ctx.globalAlpha = 0.50 + 0.35 * nh;
                ctx.strokeStyle = "#FFE9A8"; ctx.lineWidth = 1.6;
                for (let v = -1; v <= 1; v += 2){
                    ctx.beginPath();
                    for (let q = 0; q <= 10; q++){
                        let a = q / 10;
                        let px = x0 + (x1 - x0) * a, py = y0 + (y1 - y0) * a;
                        let wq = (w0 + (w1 - w0) * a) * 0.52 * v * Math.sin(a * 9.4 + frames * 0.12);
                        if (q === 0) ctx.moveTo(px + nx * wq, py + ny * wq);
                        else ctx.lineTo(px + nx * wq, py + ny * wq);
                    }
                    ctx.stroke();
                }
            }
            ctx.restore();
            // 5) HAI CAI CO VANG KIM — dau nhan cua ca cay gay
            const co = (a, w, z) => {
                let px = x0 + (x1 - x0) * a, py = y0 + (y1 - y0) * a;
                let ux = dx / L, uy = dy / L;
                let dai = 15 * (0.55 + 0.45 * (z * 0.5 + 0.5));
                let s = (a < 0.5) ? 1 : -1;
                let ax = px, ay = py, bx = px + ux * dai * s, by = py + uy * dai * s;
                let ww = w * 1.28;
                ctx.beginPath();
                ctx.moveTo(ax + nx * ww, ay + ny * ww); ctx.lineTo(bx + nx * ww, by + ny * ww);
                ctx.lineTo(bx - nx * ww, by - ny * ww); ctx.lineTo(ax - nx * ww, ay - ny * ww);
                ctx.closePath();
                let gg = ctx.createLinearGradient(ax + nx * ww, ay + ny * ww, ax - nx * ww, ay - ny * ww);
                gg.addColorStop(0, WKG_MAU_CO3); gg.addColorStop(0.38, WKG_MAU_CO2);
                gg.addColorStop(0.62, WKG_MAU_CO); gg.addColorStop(1, WKG_MAU_CO3);
                ctx.fillStyle = gg; ctx.fill();
                ctx.strokeStyle = "#4A3708"; ctx.lineWidth = 1.2; ctx.stroke();
                // go nho tren co
                ctx.strokeStyle = "rgba(74,55,8,0.75)"; ctx.lineWidth = 1;
                for (let q = 1; q <= 2; q++){
                    let t2 = q / 3;
                    let cxx = ax + (bx - ax) * t2, cyy = ay + (by - ay) * t2;
                    ctx.beginPath(); ctx.moveTo(cxx + nx * ww, cyy + ny * ww);
                    ctx.lineTo(cxx - nx * ww, cyy - ny * ww); ctx.stroke();
                }
                if ((nac || 0) >= 1){
                    // NAC 1 — hai dau gay DO RUC. Quang MONG om lay cai co: ban dau ve mot dia
                    // do ban kinh ww*2.1 alpha .55 va hai dau gay trong nhu hai qua ta — mat
                    // doc ra cai ta chu khong doc ra cay gay.
                    ctx.save();
                    let mx = (ax + bx) / 2, my = (ay + by) / 2;
                    let rg = ctx.createRadialGradient(mx, my, ww * 0.8, mx, my, ww * 1.9);
                    rg.addColorStop(0, "rgba(255,110,64,0.42)");
                    rg.addColorStop(1, "rgba(255,74,52,0)");
                    ctx.fillStyle = rg;
                    ctx.beginPath(); ctx.arc(mx, my, ww * 1.9, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "rgba(255,150,90,0.85)"; ctx.lineWidth = 1.4;
                    ctx.beginPath(); ctx.arc(mx, my, ww * 1.02, 0, 6.28); ctx.stroke();
                    ctx.restore();
                }
            };
            co(0.0, w0, z0);
            co(1.0, w1, z1);
        }
// PLAYER_PART_END s4.wkgVeCon.1

// index.html:56672 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgHaiDau.1 EDITABLE
function wkgHaiDau(ng, T){
            let sc = ng.getFormScale(), L = 138 * sc * (T.len === undefined ? 1 : T.len);
            let dir = (wkgAnim ? wkgAnim.dir : (ng.isFacingLeft ? -1 : 1));
            let a = T.a || 0, b = T.b || 0;
            let ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
            // Chia thang vao man thi cos(b) = 0 va cay gay CO VE MOT DIEM — dung ve toan hoc
            // nhung tren man la mot khung gay bien mat. Giu lai mot muc ngan nhat: nhin end-on
            // mat van thay mot khuc ngan chu khong thay khoang khong.
            if (Math.abs(cb) < 0.17) cb = (cb < 0 ? -0.17 : 0.17);
            let ux = ca * cb * dir, uy = sa, uz = ca * sb;
            let gx = ng.x + ng.w / 2 + dir * (10 + (T.gx || 0) * sc * 0.9);
            let gy = ng.y + ng.h * 0.42 + (T.gy || 0);
            let piv = (T.piv === undefined) ? 0.16 : T.piv;
            const P = (t) => ({ x: gx + ux * L * t, y: gy + uy * L * t - uz * L * t * 0.17, z: uz * t });
            let A = P(-piv), B = P(1 - piv);
            // Don dap xuong lam mui gay cam sau xuong duoi nen dat. Cho no cham san roi dung
            // — cay gay dap vao MAT DAT chu khong xuyen qua dat.
            let _san = wkgDat() + 10;
            if (B.y > _san && B.y !== A.y){
                let k = (_san - A.y) / (B.y - A.y);
                if (k > 0.25 && k < 1){ B = { x: A.x + (B.x - A.x) * k, y: _san, z: B.z }; }
            }
            return { x0: A.x, y0: A.y, z0: A.z, x1: B.x, y1: B.y, z1: B.z, day: 12.5 * sc, cx: gx, cy: gy };
        }
// PLAYER_PART_END s4.wkgHaiDau.1

// index.html:56698 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgVeGay.1 EDITABLE
function wkgVeGay(ng){
            if (!wkgBat() || ng.id !== 1) return false;
            if (typeof giaoVeSong === 'function') giaoVeSong();
            if (wkgUlt) return true;                 // da nem gay len troi
            let doGlow = Math.max(wkgNac(), wkgBuff > 0 ? 1 : 0);   // 0..3, dung lam NAC hao quang

            // --- DANG DUNG TREN NGON GAY: cay gay cam thang xuong dat ---
            if (wkgCon){
                let top = ng.y + ng.h - 2, cx = ng.x + ng.w / 2;
                // Dang vung thi cay cot DA O TREN TAY — khong con cam duoi dat nua. Ban truoc
                // ve ca hai cung luc: mot cay cam duoi dat va mot cay quay tren dau, tuc hai
                // cay gay. Do chinh la cho Hans bao phi ly.
                if (wkgCon.danh){ wkgVeKichCon(ng, cx, doGlow); return true; }
                let lac = Math.sin(frames * 0.06) * 1.5;
                ctx.save();
                wkgVeCon(cx + lac, top, 0.25, cx, wkgDat(), 0.25, 15 + wkgCon.nac * 2.2, doGlow);
                ctx.restore();
                return true;
            }
            // --- XOAY CON (khien) — CON HOA 棍花: BANH XE DUNG, DAT CHAN TRUOC MAT.
            // Day la cho ban truoc sai han: toi cho gay quay quanh TRUC DUNG, tuc no quet ngang
            // xuyen qua nguoi va khong chan duoc vien dan nao. Muon chan thi mat phang quay
            // phai DUNG va nam GIUA nguoi choi voi huong dan bay toi — nguoi nap sau banh xe.
            if (wkgSpin){
                let sc = ng.getFormScale(), L = 118 * sc;
                let d = ng.isFacingLeft ? -1 : 1;
                let cx = ng.x + ng.w / 2 + d * 30;        // dat RA TRUOC mat, khong phai trong nguoi
                let cy = ng.y + ng.h * 0.46;
                let p = frames * 0.62;                    // quay nhanh -> ra banh xe chu khong ra cay gay
                // ve 5 ban sao lech pha = nhoe chuyen dong, mat doc ra mot cai dia dac
                // dia mo phia sau — thu lam banh xe doc ra la MOT KHOI chu khong phai bo que
                ctx.save();
                let rg2 = ctx.createRadialGradient(cx, cy, L * 0.12, cx, cy, L * 0.52);
                rg2.addColorStop(0, "rgba(255,233,168,0.26)");
                rg2.addColorStop(0.72, "rgba(214,164,60,0.20)");
                rg2.addColorStop(1, "rgba(214,164,60,0)");
                ctx.fillStyle = rg2;
                ctx.beginPath(); ctx.arc(cx, cy, L * 0.52, 0, 6.28); ctx.fill();
                ctx.restore();
                for (let q = 5; q >= 0; q--){
                    let ang = p - q * 0.26;
                    let ux = Math.cos(ang), uy = Math.sin(ang);
                    ctx.save();
                    if (q) ctx.globalAlpha = 0.20 - q * 0.032;
                    wkgVeCon(cx - ux * L * 0.5, cy - uy * L * 0.5, 0.15,
                             cx + ux * L * 0.5, cy + uy * L * 0.5, 0.15, (q ? 7 : 12.5) * sc, q ? 0 : doGlow);
                    ctx.restore();
                }
                return true;
            }
            // --- CAC DON ---
            if (wkgAnim){
                wkgAnim.t++;
                if (wkgAnim.t > wkgAnim.T) wkgAnim = null;
            }
            let T = wkgTuThe();
            let D = wkgHaiDau(ng, T);
            // vet quet — chi luu khi dang ra don
            if (wkgAnim){
                wkgVet.push({ x0: D.x0, y0: D.y0, x1: D.x1, y1: D.y1 });
                if (wkgVet.length > 7) wkgVet.shift();
            } else if (wkgVet.length) wkgVet.shift();
            wkgVeVetGay();
            wkgVeCon(D.x0, D.y0, D.z0, D.x1, D.y1, D.z1, D.day, doGlow);
            return true;
        }
// PLAYER_PART_END s4.wkgVeGay.1

// index.html:56767 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgVeVetGay.1 EDITABLE
function wkgVeVetGay(){
            if (wkgVet.length < 2) return;
            // Chi lay NUA NGOAI cua than gay. Ban dau lay tron ca hai dau nen vet thanh mot
            // cai quat to bang ca cu vung — nhin ra mot mang xam chu khong ra duong di cua gay.
            const T0 = 0.80;
            ctx.save();
            for (let i = 1; i < wkgVet.length; i++){
                let a = wkgVet[i - 1], b = wkgVet[i];
                let ax = a.x0 + (a.x1 - a.x0) * T0, ay = a.y0 + (a.y1 - a.y0) * T0;
                let bx = b.x0 + (b.x1 - b.x0) * T0, by = b.y0 + (b.y1 - b.y0) * T0;
                let al = Math.pow(i / wkgVet.length, 1.6) * 0.62;
                ctx.globalAlpha = al;
                let g = ctx.createLinearGradient(ax, ay, a.x1, a.y1);
                g.addColorStop(0, "rgba(255,176,64,0)");
                g.addColorStop(0.45, "rgba(255,206,110,0.55)");
                g.addColorStop(1, "rgba(255,248,224,0.98)");
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.moveTo(ax, ay); ctx.lineTo(a.x1, a.y1);
                ctx.lineTo(b.x1, b.y1); ctx.lineTo(bx, by);
                ctx.closePath(); ctx.fill();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.wkgVeVetGay.1

// index.html:56796 · Phạm vi: global
// PLAYER_PART_BEGIN s4.wkgVeKichCon.1 EDITABLE
function wkgVeKichCon(ng, cx, doGlow){
            let D = wkgCon.danh, u = Math.min(1, D.t / D.T);
            let L = (D.L || 150) * ng.getFormScale();
            let d = ng.isFacingLeft ? -1 : 1;
            let gy = ng.y + ng.h * 0.46;
            // nhip quay: tum lay that cham -> hai vong -> giat manh vao cu giang -> dung hinh
            let g;
            if (u < 0.12)      g = (u / 0.12) * 0.05;
            else if (u < 0.74) g = 0.05 + ((u - 0.12) / 0.62) * 0.74;
            else if (u < 0.84) g = 0.79 + giaoEase((u - 0.74) / 0.10) * 0.21;
            else               g = 1;
            // CHIEU QUAY. Ban truoc TRU dan goc, tuc mui gay di XUONG -> RA TRUOC -> LEN:
            // ket thuc bang mot don HAT LEN, vac ca cay cot ma hat len thi khong con trong
            // luong nao. Phai CONG dan: xuong -> ra SAU LUNG -> vong LEN qua dau -> ra truoc
            // -> DAP XUONG. Ket o +1.0 rad = chech xuong truoc mat.
            let pha = 1.5708 + g * (Math.PI * 4 - 0.5708);
            const dau = (p, t) => ({ x: cx + Math.cos(p) * L * d * t, y: gy + Math.sin(p) * L * t });
            ctx.save();
            // quy dao quet — cho thay tam voi that su cua don
            ctx.globalAlpha = 0.10; ctx.strokeStyle = "#FFD76A"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(cx, gy, L, 0, 6.28); ctx.stroke();
            ctx.globalAlpha = 1;
            // bong mo cua may nhip truoc — chi trong doan dang quay nhanh
            if (u > 0.12 && u < 0.90){
                // Lech goc phai NHO va co dinh. Ban truoc nhan theo tong goc quay (4pi) nen
                // bon cai bong van ra bon goc khac han nhau — thanh mot mo que vang tung toe
                // chu khong phai vet nhoe cua mot cay gay.
                for (let q = 4; q >= 1; q--){
                    let p2 = pha - q * 0.20;
                    ctx.save(); ctx.globalAlpha = 0.16 - q * 0.033;
                    let A = dau(p2, -0.06), B = dau(p2, 1);
                    wkgVeCon(A.x, A.y, 0.15, B.x, B.y, 0.15, 8 * ng.getFormScale(), 0);
                    ctx.restore();
                }
            }
            let A = dau(pha, -0.06), B = dau(pha, 1);
            wkgVeCon(A.x, A.y, 0.2, B.x, B.y, 0.2, (13 + (wkgCon.nac || 1) * 1.6) * ng.getFormScale(), doGlow);
            if (u >= 0.78 && u <= 0.94){
                // dai sang doc than luc giang xuong
                ctx.globalAlpha = 0.34 * (1 - (u - 0.78) / 0.16);
                ctx.strokeStyle = "#FFE9A8"; ctx.lineWidth = 26;
                ctx.beginPath(); ctx.moveTo(cx, gy); ctx.lineTo(B.x, B.y); ctx.stroke();
                ctx.globalAlpha = 1;
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.wkgVeKichCon.1
