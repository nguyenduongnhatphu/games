// PLAYER_FILE: LUOIHAI02
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, LH_BIEN_T, LH_CHAM_MAX, LH_CM, LH_DAN, LH_DAP_DMG, LH_DAP_LUI, LH_HOI, LH_M, LH_NGANG_TOI, LH_NGAT, LH_NO_MAX, LH_TEN_PVP, LT, LavaDino, RP_ALPHA, RP_TIM, Raptor, SDT_CONG, SDT_TRAN, bamXuongKhong, bossProjectiles, bosses, camX, canvas, checkAABB, ctx, currentAmmoType, danCuaNg, dashVx, dealDamage, dino, drawReaperDeath, enemies, floatingTexts, frames, gameSpeed, gameState, keys, lh, lhBat, lhCheoBat, lhChu, lhCua, lhDanh, lhDapBat, lhDapDuoc, lhDat, lhDir, lhDs, lhFxGoc, lhHienBat, lhHop, lhHopNguoi, lhImpact, lhLaChu, lhMoi, lhNhanhHoi, lhSfx, lhSongBat, lhStyDat, lhTam, lhTickCheo, lhTickHien, lhTickJ, lhTickKeo, lhTickNem, lhTickSong, lhTickTrang, lhTon, lhTrangBan, lhTrangHop, lhVung, lhVungNguoi, novaCo, shakeTimer, styleRankNow, venKhoa, visualEffects, worldL, worldR
// index.html:71804 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhDapDa.1 EDITABLE
function lhDapDa(ng, D){
            let d = D && D.dir ? D.dir : lhDir(ng), cx = ng.x + ng.w / 2;
            let trung = lhHopNguoi(ng, -6, 70, 12, 6, LH_DAP_DMG, new Set(), o => {
                if (o.invulnAll) return;
                if (typeof venKhoa === 'function') venKhoa(o, 24);
                let to = (typeof bosses !== 'undefined' && bosses.indexOf(o) >= 0) || (o.w || 20) > 90 || (o.h || 20) > 110;
                if (!to && gameState !== 'pvp'){ o.x += d * 40; if (typeof worldL === 'function') o.x = Math.max(worldL(), Math.min(worldR() - (o.w || 20), o.x)); }
            });
            // bat nguoc ra sau
            ng.dy = (ng.jumpPower || -12.5) * 0.75; ng.grounded = false;
            ng.jumpCount = Math.max(ng.jumpCount || 0, 1); ng.canDoubleJump = true;
            dashVx = -d * LH_DAP_LUI;
            ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 22);
            lh.chuoi = ''; lh.khong = 0;
            lh.dapVe = { t: 0, x: cx + d * 46, y: ng.y + ng.h * 0.62, d, trung: trung > 0 };
            shakeTimer = Math.max(shakeTimer || 0, trung ? 9 : 4);
            lhChu(ng.x - 10, ng.y - 30, "ĐẠP!", "KICK!");
            lhSfx(trung ? 110 : 160, 0.14, 'square', 0.2, 60);
        }
// PLAYER_PART_END s4.lhDapDa.1

// index.html:71824 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeDap.1 EDITABLE
function lhVeDap(){
            let V = lh.dapVe; if (!V) return;
            let a = 1 - V.t / 14;
            ctx.save(); ctx.translate(V.x, V.y); ctx.scale(V.d, 1);
            ctx.globalCompositeOperation = 'lighter';
            ctx.globalAlpha = a * 0.8; ctx.strokeStyle = "#EA80FC"; ctx.lineWidth = 4;
            for (let k = 0; k < 2; k++){
                let R = 10 + V.t * (3 + k * 2);
                ctx.beginPath(); ctx.ellipse(k * 6, 0, R * 0.45, R, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke();
            }
            ctx.globalAlpha = a * 0.5; ctx.fillStyle = "#CE93D8";   // ban chan
            ctx.beginPath(); ctx.ellipse(-4, 0, 7, 11, 0, 0, 6.28); ctx.fill();
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeDap.1

// index.html:71838 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhK.1 EDITABLE
function lhK(ng, h){
            if (!lh) lh = lhMoi();
            if (lh.ch || lh.chTat > 0){ lh.ch = null; lh.chTat = 0; return; }
            if (h < 30 && lhDapDuoc(ng)){                          // @@HE-LHDAP: J K
                if (lh.dang) lh.bufDa = 30; else lhDapBat(ng);
                return;
            }
            // @@HE-LUOIHAI3 — Hans: "J lên chi la chem hat len. Neu boi them K moi la DANH XUONG". Dang combo tren
            // khong (sau J lên hoac cac nhat J tren khong) ma cham K -> chem manh DAP XUONG; dang vung thi xep hang.
            if (h < 30 && !ng.grounded && (lh.chuoi === 'u' || /^k/.test(lh.chuoi)) && !lh.nem && !lh.ult){
                if (lh.dang || lh.hoi > 0) lh.bufDap = 30;
                else if (!ng.isOverheated && ng.ammo > 0){ lh.chuoi = 's'; lh.khong = 0; lhVung(ng, LH_M.dap); }
                return;
            }
            if (lh.dang || lh.nem || lh.khien || lh.ult || lh.keo) return;
            if (ng.isOverheated || ng.ammo <= 0) return;
            let d = lhDir(ng);
            lh.chuoi = '';
            if (h < 30){
                lhVung(ng, LH_M.keo); lhTon(ng, 1);   // @@HE-LHDAP — Hans: "don keo giam xuong con 1 dan" (truoc: 2)
            } else if (h < 60){
                // CHEM CHU THAP: dung yen 0.75s — nguoi chem ngang 0.3s, than chet chem doc 0.3s, roi dan bay
                lhVung(ng, { T: 45, hit: 9, hoi: 6, ton: 1, ngang: LH_NGANG_TOI, am: 200, dung: 1, sty: 'kngan',
                             fn: (n2, D) => { lhHopNguoi(n2, -10, 124, 36, 6, 2, D.hitSet); lhHienBat(n2, 'doc', 4); },
                             sau: { 38: (n2) => lhCheoBat(n2) } });
            } else if (h < 90){
                // LUOT LUI, than chet lao toi chem 3 nhat
                lhVung(ng, { T: 14, hit: 2, hoi: 6, ton: 1, a0: -1.95, a1: -1.95, am: 160, sty: 'kngan',
                             fn: (n2) => { let H = lhHienBat(n2, 'jjj', 4); H.x = n2.x + n2.w / 2;
                                           dashVx = -lhDir(n2) * 30; n2.invincible = true; n2.invTimer = Math.max(n2.invTimer || 0, 26); } });   // @@HE-LUOIHAI3: luot lui DAI GAP DOI
            } else if (h < 135){
                lh.khien = { t: 0, T: 120, nhip: 0, chan: 0 };
                lhTon(ng, 1); lhStyDat('kdai');
                lhChu(ng.x - 30, ng.y - 30, "KHIÊN LƯỠI HÁI!", "SCYTHE GUARD!");
            } else {
                // CAT MAT DAT: vet nut dia nguc
                lhVung(ng, { T: 24, hit: 14, hoi: 10, ton: 2, a0: -2.6, a1: 1.5, am: 80, dung: 1, sty: 'kdai',
                             fn: (n2) => lhVetBat(n2) });
            }
        }
// PLAYER_PART_END s4.lhK.1

// index.html:71880 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickKhien.1 EDITABLE
function lhTickKhien(ng){
            let S = lh.khien; if (!S) return;
            S.t++;
            let d = lhDir(ng), cx = ng.x + ng.w / 2 + d * 22, cy = ng.y + ng.h / 2, R = 78 * lhTam();
            if (typeof bossProjectiles !== 'undefined'){
                for (let i = bossProjectiles.length - 1; i >= 0; i--){
                    let bp = bossProjectiles[i];
                    if (typeof checkAABB === 'function' && checkAABB({ x: cx - R, y: cy - R, w: R * 2, h: R * 2 }, bp)){
                        S.chan++;
                        visualEffects.push(new Effect(bp.x + (bp.w || 8) / 2, bp.y + (bp.h || 8) / 2, 'parry', false));
                        bossProjectiles.splice(i, 1);
                    }
                }
            }
            if (S.t % 15 === 0){ lhHop(cx - R - 10, cy - R - 10, cx + R + 10, cy + R + 10, 1, null); lhSfx(500, 0.04, 'square', 0.06, 700); }
            ng.attackCooldown = Math.max(ng.attackCooldown || 0, 4);
            if (S.t >= S.T){
                lh.khien = null;
                lhVung(ng, { T: 14, hit: 7, hoi: 12, ton: 0, a0: 1.4, a1: -2.5, nguoc: 1, am: 140, sty: 'kdai', fn: (n2) => lhSongBat(n2, 7 * LH_CM, 5) });
            }
        }
// PLAYER_PART_END s4.lhTickKhien.1

// index.html:71903 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVetBat.1 EDITABLE
function lhVetBat(ng){
            let d = lhDir(ng);
            lh.vet.push({ x: ng.x + ng.w / 2 + d * 110, y: lhDatDuoi(ng), t: 0, T: 150, n: 5 + Math.floor(Math.random() * 3), ra: 0 });
            shakeTimer = Math.max(shakeTimer || 0, 18);
            lhChu(ng.x - 30, ng.y - 34, "CỬA ĐỊA NGỤC!", "HELL RIFT!");
            lhSfx(55, 0.7, 'sawtooth', 0.3, 30);
        }
// PLAYER_PART_END s4.lhVetBat.1

// index.html:71910 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhDatDuoi.1 EDITABLE
function lhDatDuoi(ng){ return ng.grounded ? ng.y + ng.h : lhDat(); }
// PLAYER_PART_END s4.lhDatDuoi.1

// index.html:71911 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickVet.1 EDITABLE
function lhTickVet(){
            for (let i = lh.vet.length - 1; i >= 0; i--){
                let V = lh.vet[i]; V.t++;
                if (V.t >= 16 && V.ra < V.n && (V.t - 16) % 11 === 0){
                    V.ra++;
                    lh.hon.push({ x: V.x + (Math.random() - 0.5) * 50, y: V.y - 6, vx: 0, vy: -2.6, t: 0, pha: 'len',
                                  lech: Math.random() * 6.28, o: null });
                }
                if (V.t >= V.T) lh.vet.splice(i, 1);
            }
            for (let i = lh.hon.length - 1; i >= 0; i--){
                let H = lh.hon[i]; H.t++;
                if (H.pha === 'len'){
                    H.y += H.vy; H.vy *= 0.95; H.x += Math.sin(H.t * 0.2 + H.lech) * 0.8;
                    if (H.t >= 28) H.pha = 'bay';
                } else {
                    if (!H.o || H.o.hp <= 0 || H.o.dying){
                        let ds = lhDs(), best = null, bd = 1e9;
                        for (let o of ds){ let dd = Math.hypot(o.x + (o.w || 20) / 2 - H.x, o.y + (o.h || 20) / 2 - H.y); if (dd < bd){ bd = dd; best = o; } }
                        H.o = best;
                    }
                    if (H.o){
                        let tx = H.o.x + (H.o.w || 20) / 2, ty = H.o.y + (H.o.h || 20) / 2, dx = tx - H.x, dy = ty - H.y, l = Math.hypot(dx, dy) || 1;
                        H.vx += (dx / l * 7.5 - H.vx) * 0.14; H.vy += (dy / l * 7.5 - H.vy) * 0.14;
                        H.x += H.vx; H.y += H.vy;
                        let o = H.o;
                        if (H.x > o.x - 6 && H.x < o.x + (o.w || 20) + 6 && H.y > o.y - 6 && H.y < o.y + (o.h || 20) + 6){
                            lhDanhHon(o);
                            lh.hon.splice(i, 1); continue;
                        }
                    } else { H.y -= 0.6; }
                }
                if (H.t > 300) lh.hon.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.lhTickVet.1

// index.html:71946 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhDanhHon.1 EDITABLE
function lhDanhHon(o){
            lhDanh(o, 2, 'flat');
            o._lhCham = Math.min(LH_CHAM_MAX, (o._lhCham || 0) + 0.1); o._lhChamT = 240;
            visualEffects.push(new Effect(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, 'parry', false));
            if (o.hp <= 0) lhThuHon(o);
        }
// PLAYER_PART_END s4.lhDanhHon.1

// index.html:71953 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhChoChay.1 EDITABLE
function lhChoChay(o){
            if (!o || !(o._lhCham > 0)) return true;
            o._lhAcc = (o._lhAcc || 0) + o._lhCham;
            if (o._lhAcc >= 1){ o._lhAcc -= 1; return false; }
            return true;
        }
// PLAYER_PART_END s4.lhChoChay.1

// index.html:71964 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhThuHon.1 EDITABLE
function lhThuHon(o){
            if (o._lhThu) return; o._lhThu = 1;
            let i = (typeof enemies !== 'undefined') ? enemies.indexOf(o) : -1;
            if (i >= 0){
                enemies.splice(i, 1);
                o.hp = 1; o._lhCham = 0;
                // @@HE-LHDAN: hinh ve moi loai quai quay mot huong rieng — Raptor / Lava Dino ve dau ben PHAI,
                // Ptero / Ban rung ve dau ben TRAI (Ptero bay nguoc thi tu lat). Quai bien co `dir` tu ve theo.
                let _tuPhai = (typeof Raptor !== 'undefined' && o instanceof Raptor) || (typeof LavaDino !== 'undefined' && o instanceof LavaDino)
                              || (o.speedOverride !== undefined && o.speedOverride < 0);
                lh.xac.push({ o, t: 0, T: 600, muc: null, tuPhai: _tuPhai, huong: 1, toc: 0,
                              tocGoc: Math.abs(o.speedOverride || o.speed || (typeof gameSpeed === 'number' ? gameSpeed * 1.25 : 6)) || 6 });
                lhChu(o.x - 20, o.y - 30, "XÁC BỊ ĐIỀU KHIỂN!", "PUPPETED!");
                return;
            }
            if (typeof bosses !== 'undefined' && bosses.indexOf(o) >= 0){
                let khac = bosses.filter(b => b !== o && b.hp > 0 && !b.dying);
                lh.bong.push({ x: o.x + (o.w || 80) / 2, y: o.y + (o.h || 80), ten: o.name || '', t: 0, T: khac.length ? 250 : 90,
                               muc: khac[0] || null, d: (khac[0] && khac[0].x > o.x) ? 1 : -1, hit: new Set() });
                lhChu(o.x, o.y - 40, "LINH HỒN BỊ THU!", "SOUL REAPED!");
            }
        }
// PLAYER_PART_END s4.lhThuHon.1

// index.html:71986 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickXac.1 EDITABLE
function lhTickXac(){
            for (let i = lh.xac.length - 1; i >= 0; i--){
                let X = lh.xac[i], o = X.o; X.t++;
                /* @@HE-LHDAN — Hans: "luc ke dich bi dieu khien thi chung quay dau theo huong bi tan cong va uu
                   tien ke dich ben phai hon cung nhu se tan cong bang cach di chuyen nhanh hon so voi binh thuong."
                   - chon muc tieu: con nao BEN PHAI xac thi duoc uu tien (ke dich tran vao tu ben phai); chi
                     khi ben phai khong con ai moi quay lai danh con ben trai;
                   - QUAY MAT theo huong dang lao toi (lat hinh luc ve);
                   - LAO NHANH: tang toc tu toc do chay binh thuong cua chinh no len ~2.2 lan. */
                if (!X.muc || X.muc.hp <= 0 || X.muc.dying){
                    let best = null, bd = 1e9, cx0 = o.x + (o.w || 20) / 2;
                    for (let e of lhDs()){
                        let ex = e.x + (e.w || 20) / 2, dd = Math.abs(ex - cx0) + Math.abs(e.y - o.y) * 0.5;
                        if (ex < cx0 - 10) dd += 2000;                       // ben trai: chi chon khi ben phai trong
                        if (dd < bd){ bd = dd; best = e; }
                    }
                    X.muc = best;
                }
                X.toc = Math.min(Math.max(7, X.tocGoc * 2.2), 11, (X.toc || X.tocGoc) + 0.5);
                if (X.muc){
                    let m = X.muc, dx = (m.x + (m.w || 20) / 2) - (o.x + (o.w || 20) / 2), dy = (m.y + (m.h || 20) / 2) - (o.y + (o.h || 20) / 2), l = Math.hypot(dx, dy) || 1;
                    if (Math.abs(dx) > 2) X.huong = dx > 0 ? 1 : -1;
                    if (o.dir !== undefined) o.dir = X.huong;
                    o.x += dx / l * X.toc; o.y += dy / l * X.toc * 0.66;
                    if (o.x < m.x + (m.w || 20) && o.x + (o.w || 20) > m.x && o.y < m.y + (m.h || 20) && o.y + (o.h || 20) > m.y){
                        lhDanh(m, 6, 'flat');
                        lhImpact(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, 0.4, true); lhImpact(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2, -0.9, true);
                        lhChu(o.x - 20, o.y - 24, "ĐỒNG QUY VU TẬN!", "MUTUAL RUIN!");
                        lh.xac.splice(i, 1); continue;
                    }
                } else { X.huong = 1; o.x += X.toc * 0.5; }   // het ke dich: chay ve phia phai
                if (X.t >= X.T || (typeof worldL === 'function' && (o.x < worldL() - 200 || o.x > worldR() + 200))) lh.xac.splice(i, 1);
            }
            for (let i = lh.bong.length - 1; i >= 0; i--){
                let B = lh.bong[i]; B.t++;
                if (B.muc && (B.muc.hp <= 0 || B.muc.dying)) B.muc = null;
                if (B.muc){
                    let tx = B.muc.x + (B.muc.w || 80) / 2 - B.d * 70;
                    B.x += (tx - B.x) * 0.06;
                    B.d = (B.muc.x + (B.muc.w || 80) / 2) > B.x ? 1 : -1;
                    if (B.t === 70 || B.t === 130 || B.t === 190){ lhDanh(B.muc, 5, 'flat'); shakeTimer = Math.max(shakeTimer || 0, 12); lhSfx(130, 0.25, 'sawtooth', 0.22, 60); }
                } else B.y -= 0.8;
                if (B.t >= B.T) lh.bong.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.lhTickXac.1

// index.html:72036 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTheoDanh.1 EDITABLE
function lhTheoDanh(ng, m){
            lh.hoi2.push({ t: 10, kieu: m.ngang ? 'ngang' : 'doc', dmg: lh.bien === 2 ? 3 : 2 });
            if (lh.hoi2.length > 4) lh.hoi2.shift();
        }
// PLAYER_PART_END s4.lhTheoDanh.1

// index.html:72040 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickTheo.1 EDITABLE
function lhTickTheo(ng){
            if (lh.bien < 1){ lh.theo = null; lh.hoi2.length = 0; return; }
            let d = lhDir(ng), cap2 = lh.bien === 2;
            let tx = ng.x + ng.w / 2 - d * (cap2 ? 34 : 44), fy = ng.y + ng.h + 2;
            if (!lh.theo) lh.theo = { x: tx, y: fy, d, vung: null };
            let Th = lh.theo;
            if (Th.vung) tx += d * 30 * Math.sin(Math.min(1, Th.vung.t / Th.vung.T) * Math.PI);   // lao len mot buoc khi chem
            Th.x += (tx - Th.x) * 0.25; Th.y += (fy - Th.y) * 0.3; Th.d = d;
            for (let i = lh.hoi2.length - 1; i >= 0; i--){
                let E = lh.hoi2[i];
                if (--E.t <= 0){ Th.vung = { t: 0, T: 16, kieu: E.kieu, dmg: E.dmg, hit: new Set() }; lh.hoi2.splice(i, 1); }
            }
            let V = Th.vung;
            if (V){
                V.t++;
                if (V.t === 8){
                    let k = lhTam(), x0 = Th.x - d * 20, x1 = Th.x + d * 175 * k;
                    lhFxGoc = V.kieu === 'ngang' ? 0.05 : 1.1;
                    lhHop(x0, Th.y - (V.kieu === 'ngang' ? 80 : 130) * k, x1, Th.y + 6, V.dmg, V.hit);
                    lhSfx(140, 0.12, 'sawtooth', 0.14, 60);
                }
                if (V.t >= V.T) Th.vung = null;
            }
        }
// PLAYER_PART_END s4.lhTickTheo.1

// index.html:72072 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_QUA_N.1 EDITABLE
const LH_QUA_N = 5, LH_QUA_NHIP = 120, LH_QUA_LECH = 24, LH_QUA_DMG = 2, LH_QUA_TAM = 460;
// PLAYER_PART_END s4.LH_QUA_N.1

// index.html:72073 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_QUA_KIEU.1 EDITABLE
const LH_QUA_KIEU = ['mo', 'vuot', 'xoay', 'dam', 'canh'];
// PLAYER_PART_END s4.LH_QUA_KIEU.1

// index.html:72074 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhChBat.1 EDITABLE
function lhChBat(ng){
            if (!lh) lh = lhMoi();
            lh.dang = null; lh.hoi = 0; lh.khien = null;
            let cx = ng.x + ng.w / 2, qua = [];
            for (let i = 0; i < LH_QUA_N; i++)
                qua.push({ i, kieu: LH_QUA_KIEU[i], x: cx, y: ng.y + ng.h / 2, pha: 'bay', cd: 20 + i * LH_QUA_LECH, muc: null, t: 0, vo: 0, huong: 1, trung: false });
            lh.ch = { t: 0, qua };
            lhChu(ng.x - 20, ng.y - 30, "BẦY QUẠ TRẮNG!", "WHITE CROWS!");
            lhSfx(900, 0.2, 'triangle', 0.14, 1400);
        }
// PLAYER_PART_END s4.lhChBat.1

// index.html:72084 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhQuaNha.1 EDITABLE
function lhQuaNha(ng, Q, C){                  // cho dau cua moi con: vong quanh tren dau nguoi choi
            let a = Q.i * (Math.PI * 2 / LH_QUA_N) + C.t * 0.035;
            return { x: ng.x + ng.w / 2 + Math.cos(a) * 58, y: ng.y - 34 + Math.sin(a) * 16 };
        }
// PLAYER_PART_END s4.lhQuaNha.1

// index.html:72088 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhQuaChon.1 EDITABLE
function lhQuaChon(ng, Q, C){
            // Moi con qua GIU muc tieu rieng (Q.chon) — chia deu bay qua cho cac ke dich trong tam, con nao da
            // du qua lo (so don dang bay toi >= mau con lai) thi khong ai xuc vao them.
            let cx = ng.x + ng.w / 2, ds = [];
            for (let o of lhDs()){
                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                let ox = o.x + (o.w || 20) / 2;
                if (Math.abs(ox - cx) > LH_QUA_TAM) continue;
                let bay = C.qua.filter(q => q !== Q && q.muc === o && (q.pha === 'lao' || q.pha === 'danh') && !q.trung).length;
                if (bay * LH_QUA_DMG >= o.hp) continue;              // cac con khac dang bay toi da du giet no
                let giu = C.qua.filter(q => q !== Q && q.chon === o).length;
                ds.push({ o, giu, cu: o === Q.chon ? 0 : 1, kc: Math.hypot(ox - Q.x, (o.y + (o.h || 20) / 2) - Q.y) });
            }
            if (!ds.length) return null;
            let it = Math.min(...ds.map(e => e.giu));
            let ung = ds.filter(e => e.giu === it);
            // muc tieu cu van o nhom it qua nhat thi giu nguyen, khong thi lay con gan nhat trong nhom do
            ung.sort((a, b) => a.cu - b.cu || a.kc - b.kc);
            Q.chon = ung[0].o;
            return Q.chon;
        }
// PLAYER_PART_END s4.lhQuaChon.1

// index.html:72109 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickCh.1 EDITABLE
function lhTickCh(ng){
            let C = lh.ch; if (!C) return;
            if (!keys['KeyK']){ lh.ch = null; lh.chTat = 4; return; }   // nha K: qua bay di, va K-nha khong duoc ra them don
            C.t++;
            for (let Q of C.qua){
                Q.vo += 0.45; if (Q.cd > 0) Q.cd--;
                let nha = lhQuaNha(ng, Q, C);
                if (Q.pha === 'bay'){
                    Q.x += (nha.x - Q.x) * 0.18; Q.y += (nha.y - Q.y) * 0.18;
                    if (Q.cd <= 0){
                        let o = lhQuaChon(ng, Q, C);
                        if (o){ Q.muc = o; Q.pha = 'lao'; Q.t = 0; Q.trung = false; Q.cd = LH_QUA_NHIP; Q.x0 = Q.x; Q.y0 = Q.y; }
                        else Q.cd = 20;
                    }
                    continue;
                }
                let o = Q.muc;
                if (!o || o.hp === undefined || o.hp <= 0){ Q.pha = 've'; Q.muc = null; }
                Q.t++;
                if (Q.pha === 'lao'){
                    let tx = o.x + (o.w || 20) / 2, ty = o.y + (o.h || 20) * 0.4;
                    Q.huong = tx >= Q.x ? 1 : -1;
                    // moi kieu mot duong bay toi muc tieu
                    let gx = tx, gy = ty, u = Math.min(1, Q.t / 22);
                    if (Q.kieu === 'mo')    { gy = ty - 70 * (1 - u); }                        // bay len cao roi MO xuong
                    if (Q.kieu === 'vuot')  { gx = tx - Q.huong * 60 * (1 - u); gy = ty - 20; }  // luot ngang sat dau
                    if (Q.kieu === 'xoay')  { gx = tx + Math.cos(Q.t * 0.5) * 50 * (1 - u); gy = ty + Math.sin(Q.t * 0.5) * 40 * (1 - u); }
                    if (Q.kieu === 'canh')  { gx = tx + Q.huong * 50 * (1 - u); gy = ty - 30 * (1 - u); }   // vong ra SAU LUNG
                    let dx = gx - Q.x, dy = gy - Q.y, l = Math.hypot(dx, dy) || 1, v = Q.kieu === 'dam' ? 15 : 11;
                    if (l > v){ Q.x += dx / l * v; Q.y += dy / l * v; } else { Q.x = gx; Q.y = gy; }
                    if ((Math.hypot(tx - Q.x, ty - Q.y) < 26 && Q.t > 6) || Q.t > 70){
                        if (!Q.trung && Q.t <= 70){
                            Q.trung = true;
                            lhDanh(o, LH_QUA_DMG);
                            lhImpact(tx, ty, Q.kieu === 'mo' ? 1.2 : Q.kieu === 'vuot' ? 0.1 : -0.8, false);
                            lhSfx(1200 + Q.i * 90, 0.06, 'square', 0.1, 600);
                        }
                        Q.pha = 'danh'; Q.t = 0;
                    }
                } else if (Q.pha === 'danh'){
                    // DONG TAC DANH RIENG: mo 3 cai · cao ngang · xoay tron · huc lui · chem canh
                    let tx = o ? o.x + (o.w || 20) / 2 : Q.x, ty = o ? o.y + (o.h || 20) * 0.4 : Q.y;
                    if (Q.kieu === 'mo')   { Q.y = ty - 8 + Math.abs(Math.sin(Q.t * 0.9)) * -14; Q.x = tx; }
                    if (Q.kieu === 'vuot') { Q.x = tx + Q.huong * (Q.t * 5 - 30); Q.y = ty - 18; }
                    if (Q.kieu === 'xoay') { Q.x = tx + Math.cos(Q.t * 0.7) * 24; Q.y = ty + Math.sin(Q.t * 0.7) * 24; }
                    if (Q.kieu === 'dam')  { Q.x = tx - Q.huong * (Q.t < 5 ? Q.t * 4 : (10 - Q.t) * 4); Q.y = ty; }
                    if (Q.kieu === 'canh') { Q.x = tx - Q.huong * 10; Q.y = ty - 10 - Q.t * 2; }
                    if (Q.t >= 10){ Q.pha = 've'; Q.t = 0; }
                } else {                                                   // 've': bay ve dan
                    let dx = nha.x - Q.x, dy = nha.y - Q.y, l = Math.hypot(dx, dy) || 1;
                    Q.huong = dx >= 0 ? 1 : -1;
                    if (l < 12){ Q.pha = 'bay'; Q.muc = null; }
                    else { Q.x += dx / l * Math.min(l, 10); Q.y += dy / l * Math.min(l, 10); }
                }
            }
            ng.attackCooldown = Math.max(ng.attackCooldown || 0, 3);
            lhStyDat('kgiu');
        }
// PLAYER_PART_END s4.lhTickCh.1

// index.html:72167 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeQua.1 EDITABLE
function lhVeQua(Q){
            let x = Q.x, y = Q.y, h = Q.huong || 1, vo = Math.sin(Q.vo) * (Q.pha === 'danh' ? 1.3 : 1);
            ctx.save();
            ctx.translate(x, y); ctx.scale(h * 1.35, 1.35);
            if (Q.pha === 'lao' || Q.pha === 'danh'){ ctx.rotate(Q.kieu === 'mo' ? 0.6 : Q.kieu === 'xoay' ? Q.t * 0.4 : 0.15); }
            ctx.globalAlpha = 0.95;
            // vet sang tim khi dang lao
            if (Q.pha === 'lao'){ ctx.fillStyle = "rgba(206,147,216,0.35)"; ctx.beginPath(); ctx.ellipse(-16, 0, 16, 4, 0, 0, 6.28); ctx.fill(); }
            // canh xa (sau than)
            ctx.fillStyle = "#CFD8DC";
            ctx.beginPath(); ctx.moveTo(-2, -2); ctx.lineTo(-10, -4 - 12 * vo); ctx.lineTo(4, -3); ctx.closePath(); ctx.fill();
            // than + dau
            ctx.fillStyle = "#FAFAFA";
            ctx.beginPath(); ctx.ellipse(0, 0, 9, 5, -0.15, 0, 6.28); ctx.fill();
            ctx.beginPath(); ctx.arc(8, -3, 4.2, 0, 6.28); ctx.fill();
            // duoi
            ctx.beginPath(); ctx.moveTo(-8, -1); ctx.lineTo(-16, -4); ctx.lineTo(-15, 3); ctx.closePath(); ctx.fill();
            // mo + mat
            ctx.fillStyle = "#90A4AE"; ctx.beginPath(); ctx.moveTo(11, -4); ctx.lineTo(17, -2); ctx.lineTo(11, -1); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#8E24AA"; ctx.fillRect(8.5, -4.5, 1.8, 1.8);
            // canh gan (truoc than)
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath(); ctx.moveTo(-3, 0); ctx.lineTo(-12, -2 - 14 * vo); ctx.lineTo(-1, -12 * vo * 0.4); ctx.lineTo(5, -1); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "rgba(120,144,156,0.8)"; ctx.lineWidth = 0.8; ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeQua.1

// index.html:72195 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhUltBat.1 EDITABLE
function lhUltBat(ng){
            if (!lh) lh = lhMoi();
            if (lh.ult) return false;
            let ds = lhDs().slice(0, 12);
            lh.dang = null; lh.hoi = 0; lh.ch = null; lh.khien = null;
            lh.ult = { t: 0, T: 170, ds, ten: ds.map(o => lhTen(o)) };
            lhSfx(60, 1.2, 'sawtooth', 0.32, 30); lhSfx(1400, 0.5, 'triangle', 0.14, 500);
            return true;
        }
// PLAYER_PART_END s4.lhUltBat.1

// index.html:72204 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTen.1 EDITABLE
function lhTen(o){
            if (o.name) return String(o.name);
            let t = (o.type !== undefined) ? ('#' + o.type) : '';
            return LT('VONG LINH ', 'LOST SOUL ') + t;
        }
// PLAYER_PART_END s4.lhTen.1

// index.html:72209 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhDungGio.1 EDITABLE
function lhDungGio(){ return !!(lh && lh.ult && lh.ult.t < 150 && lhBat()); }
// PLAYER_PART_END s4.lhDungGio.1

// index.html:72210 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickUlt.1 EDITABLE
function lhTickUlt(ng){
            let U = lh.ult; if (!U) return;
            U.t++;
            ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 12);
            if (U.t < 150){ ng._uFreeze = Math.max(ng._uFreeze || 0, 2); dashVx = 0; }
            if (U.t === 150){
                for (let o of U.ds) if (o && o.hp > 0 && !o.dying){ o._lhTen = { t: 0 }; }
                lhChu(canvas.width / 2 - 60 + (typeof camX !== 'undefined' ? camX : 0), 120, "ĐÃ GHI TÊN", "NAMES WRITTEN");
                shakeTimer = Math.max(shakeTimer || 0, 30);
                lhSfx(90, 0.6, 'sawtooth', 0.3, 40);
            }
            if (U.t >= U.T) lh.ult = null;
        }
// PLAYER_PART_END s4.lhTickUlt.1

// index.html:72224 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickTen.1 EDITABLE
function lhTickTen(){
            for (let o of lhDs()){
                if (!o._lhTen) continue;
                o._lhTen.t++;
                if (gameState === 'pvp' && o._lhTen.t > LH_TEN_PVP){ o._lhTen = null; continue; }   // @@HE-P2KHOA: PvP khong "cho toi chet"
                if (o._lhTen.t % 60 === 0){
                    let hp0 = o.hp;
                    if (typeof dealDamage === 'function') dealDamage(o, 8, 'flat'); else o.hp -= 8;
                    if (o.hp < hp0) floatingTexts.push(new FloatingText(o.x + (o.w || 20) / 2 - 8, o.y - 10, "-8"));
                }
            }
        }
// PLAYER_PART_END s4.lhTickTen.1

// index.html:72242 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_PAL.1 EDITABLE
const LH_PAL = { bd:"#1C1426", hd:"#E6DFD0", dk:"#07040B", lt:"#9C7BC4", foot:"#000000", spk:"#CE93D8",
                         out:"#000000", rim:"#EA80FC", eye:"#140018", pup:"#EA80FC", aura:null, crest:0 };
// PLAYER_PART_END s4.LH_PAL.1

// index.html:72244 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhGiangThe.1 EDITABLE
function lhGiangThe(ng){
            if (!lhLaChu(ng) || typeof lh === 'undefined') return false;
            let L = lhCua(ng);   // @@HE-P2KHOA: dung bo may + loai dan cua CHINH nguoi dang ve
            return !!(L && L.bien === 2 && ((typeof danCuaNg === 'function') ? danCuaNg(ng) : currentAmmoType) === LH_DAN);
        }
// PLAYER_PART_END s4.lhGiangThe.1

// index.html:72249 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeAo.1 EDITABLE
function lhVeAo(ng, lop){
            if (!lhGiangThe(ng)) return;
            let s = ng.getFormScale(), cs = ng.isCrouching ? 12 : 0, t = frames * 0.12;
            ctx.save();
            ctx.translate(ng.x + ng.w / 2, ng.y + ng.h / 2); if (ng.isFacingLeft) ctx.scale(-1, 1); ctx.translate(-(ng.x + ng.w / 2), -(ng.y + ng.h / 2));
            ctx.translate(ng.x, ng.y); ctx.scale(s, s);
            if (lop === 0){
                // AO CHOANG: tu vai (co) keo ra sau, gau rach bay theo gio
                let chay = Math.min(1, ((keys['KeyA'] || keys['KeyD']) ? 0.7 : 0) + (ng.grounded ? 0 : 0.6));
                ctx.fillStyle = "#150E1E"; ctx.strokeStyle = "rgba(206,147,216,0.85)"; ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(30, 8 + cs);
                ctx.quadraticCurveTo(10, 2 + cs, -2 - 10 * chay, 10 + cs);
                let N = 7;
                for (let i = 0; i <= N; i++){
                    let u = i / N, x = -8 - 14 * chay + u * 40, lay = Math.sin(t * 2.4 + i * 1.3) * (3 + 4 * chay);
                    let y = 44 + (i % 2 ? -7 : 2) + lay - u * 4 - chay * 6 * (1 - u);
                    ctx.lineTo(x, Math.max(20 + cs, y));
                }
                ctx.lineTo(34, 30 + cs);
                ctx.closePath(); ctx.fill(); ctx.stroke();
                // khoi hon tim bay len tu mep ao
                ctx.globalCompositeOperation = 'lighter';
                for (let k = 0; k < 4; k++){
                    let ph = ((frames * 0.02 + k * 0.25) % 1), x = -4 + k * 9 + Math.sin(t + k) * 3, y = 42 - ph * 30;
                    ctx.fillStyle = "rgba(186,104,200," + (0.45 * (1 - ph)).toFixed(2) + ")";
                    ctx.beginPath(); ctx.arc(x, y, 3.5 * (1 - ph) + 1, 0, 6.28); ctx.fill();
                }
            } else {
                // MU TRUM: om dinh + gay dau, chua mat (x ~42..52, y ~3..12)
                ctx.fillStyle = "#120B19"; ctx.strokeStyle = "rgba(234,128,252,0.9)"; ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.moveTo(26, 20 + cs);
                ctx.quadraticCurveTo(23, -5 + cs, 40, -6 + cs);
                ctx.quadraticCurveTo(52, -6 + cs, 56, 6 + cs);
                ctx.lineTo(51, 5 + cs);
                ctx.quadraticCurveTo(46, -1 + cs, 38, 2 + cs);
                ctx.quadraticCurveTo(32, 5 + cs, 33, 20 + cs);
                ctx.closePath(); ctx.fill(); ctx.stroke();
                // mat sang tim trong hoc mat
                ctx.globalCompositeOperation = 'lighter';
                let a = 0.55 + 0.35 * Math.sin(frames * 0.2);
                ctx.fillStyle = "rgba(234,128,252," + a.toFixed(2) + ")";
                ctx.beginPath(); ctx.arc(45.5, 6.5 + cs, 3.2, 0, 6.28); ctx.fill();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeAo.1

// index.html:72297 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhCongNo.1 EDITABLE
function lhCongNo(n){ if (lh && lhBat() && lh.bien === 0) lh.no = Math.min(LH_NO_MAX, lh.no + n); }
// PLAYER_PART_END s4.lhCongNo.1

// index.html:72298 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhPhimIO.1 EDITABLE
function lhPhimIO(){
            if (!lh) lh = lhMoi();
            let ng = dino;
            if (lh.bien === 0){
                if (lh.no < LH_NO_MAX){ lhChu(ng.x - 20, ng.y - 30, "CHƯA ĐẦY NỘ", "RAGE NOT FULL"); return; }
                lh.no = 0; lh.bien = 1; lh.bienT = LH_BIEN_T;
                lhChu(ng.x - 50, ng.y - 40, "HIỆN THÂN THẦN CHẾT!", "DEATH MANIFEST!");
                shakeTimer = Math.max(shakeTimer || 0, 20);
                for (let k = 0; k < 8; k++) lhImpact(ng.x + ng.w / 2 + (Math.random() - 0.5) * 60, ng.y + ng.h / 2 + (Math.random() - 0.5) * 50, Math.random() * 3.14, false);
                lhSfx(80, 0.6, 'sawtooth', 0.3, 40); lhSfx(700, 0.3, 'triangle', 0.16, 300);
                return;
            }
            if (lh.bien === 1){
                let h = (typeof styleRankNow === 'function') ? styleRankNow() : 0;
                if (h < 4){ lhChu(ng.x - 20, ng.y - 30, "CẦN HẠNG S", "NEEDS RANK S"); return; }
                let tran = (typeof SDT_TRAN !== 'undefined' && SDT_TRAN[h]) || 600, cong = (typeof SDT_CONG !== 'undefined' && SDT_CONG[h]) || 60;
                lh.bien = 2; lh.bienT = Math.min(tran, lh.bienT + cong);
                lhChu(ng.x - 60, ng.y - 46, "THẦN CHẾT GIÁNG THẾ  +" + (cong / 60) + "s", "DEATH INCARNATE  +" + (cong / 60) + "s");
                shakeTimer = Math.max(shakeTimer || 0, 30);
                for (let k = 0; k < 12; k++) lhImpact(ng.x + ng.w / 2 + (Math.random() - 0.5) * 90, ng.y + ng.h / 2 + (Math.random() - 0.5) * 80, Math.random() * 3.14, true);
                lhSfx(50, 0.9, 'sawtooth', 0.34, 30); lhSfx(1200, 0.4, 'square', 0.16, 2200);
            }
        }
// PLAYER_PART_END s4.lhPhimIO.1

// index.html:72321 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTickBien.1 EDITABLE
function lhTickBien(ng){
            if (lh.bien <= 0) return;
            if (lh.bien === 2){ ng.ammo = ng.maxAmmo; ng.isOverheated = false; ng.overheatTimer = 0; }   // @@HE-LHDAN: khong ton the luc
            if (--lh.bienT <= 0){
                if (lh.bien === 2 && ng.hp < ng.maxHp){ ng.hp++; lhChu(ng.x - 18, ng.y - 44, "+1 HP", "+1 HP"); }
                lh.bien = 0; lh.bienT = 0;
            }
        }
// PLAYER_PART_END s4.lhTickBien.1

// index.html:72331 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhTick.1 EDITABLE
function lhTick(){
            if (!lh) lh = lhMoi();
            // ghi ten van chay ca khi da thao rune (chieu da tung ra thi phai tron ven)
            if (!lhBat()){ if (lh.ult) lh.ult = null; lhTickTen(); return; }
            let ng = (typeof dino !== 'undefined') ? dino : null; if (!ng) return;
            if (gameState !== 'normal' && gameState !== 'boss_rush' && gameState !== 'test_boss' && gameState !== 'pvp') return;   // @@HE-P2KHOA
            if (lh.ult){ lhTickUlt(ng); lhTickTen(); if (lh.ult && lh.ult.t < 150) return; }
            // dem nhip nhat chem
            if (lh.dang){
                let D = lh.dang; D.t++;
                if (D.m.treo && !ng.grounded && !bamXuongKhong(ng)) ng.dy = Math.min(ng.dy || 0, 0.8);
                if (D.t === D.hit && D.m.fn){
                    // huong vet cat cua impact: nhat ngang -> nam ngang; chem xuong / hat len -> nghieng theo chieu vung
                    lhFxGoc = D.m.ngang ? (D.m.nguoc ? -0.12 : 0.12) : (D.m.a1 > D.m.a0 ? 1.05 : -1.05) * D.dir;
                    lhVungNguoi = true; lhTrangHop = null;   // @@HE-NOVA2/3: lhHop biet day la nhat chem cua nguoi choi
                    try { D.m.fn(ng, D); } finally { lhVungNguoi = false; }
                    if (lhTrangHop && typeof novaCo === 'function' && novaCo(ng)) lhTrangBan(ng, lhTrangHop, D);   // @@HE-NOVA3/4
                }
                if (D.m.sau && D.m.sau[D.t]) D.m.sau[D.t](ng, D);
                if (D.t >= D.T){
                    lh.dang = null;
                    lh.hoi = lhNhanhHoi(D.m.hoi || LH_HOI);
                    if (D.m.ket) { /* nhat ket: chuoi het, J sau la chuoi moi */ }
                    if (lh.hoi <= 0) lh.rh = 0;
                }
            } else if (lh.hoi > 0){
                lh.hoi--; if (lh.hoi === 0) lh.rh = 0;
            } else lh.rh = Math.min(999, lh.rh + 1);
            if (ng.grounded && !(lh.dang && /^k/.test(lh.chuoi))) lh.khong = 0;
            // @@HE-LHNHAY — Hans: J-jump hat cao hon mot chut, o tren khong roi cham hon de combo ra hinh.
            // Chuoi 'u' (vua nhay chem) truoc day roi tu do. Gio tran dy 0.35 trong cua so nhip (~1px/khung sau trong luc).
            // Chuoi 'k...' giu tran 0.3 nhu cu. Giu xuong van roi nhanh.
            if (!ng.grounded && !lh.dang && (lh.chuoi === 'u' || /^k/.test(lh.chuoi)) && (lh.hoi > 0 || lh.rh <= LH_NGAT) && !bamXuongKhong(ng)) ng.dy = Math.min(ng.dy || 0, lh.chuoi === 'u' ? 0.35 : 0.3);
            // cua so luot J J J
            if (typeof dashVx !== 'undefined' && Math.abs(dashVx) > 2 && lh.luotDu > 0) lh.luotDu = 30;
            else if (lh.luotDu > 0) lh.luotDu--;
            if (lh.chTat > 0) lh.chTat--;
            lhTickJ(ng);
            lhTickNem(ng); lhTickKeo(); lhTickKhien(ng); lhTickCh(ng); lhTickTrang();   // @@HE-NOVA2/3
            if (lh.dapVe && ++lh.dapVe.t > 14) lh.dapVe = null;   // @@HE-LHDAP
            lhTickHien(); lhTickSong(); lhTickCheo(); lhTickVet(); lhTickXac(); lhTickTen(); lhTickBien(ng);
            lhTickTheo(ng);
            // thoi han lam cham
            for (let o of lhDs()) if (o._lhChamT > 0 && --o._lhChamT <= 0) o._lhCham = 0;
            // vet luoi (dau mui) — chi ghi khi dang vung
            if (!lh.dang && lh.vetLuoi.length) lh.vetLuoi.shift();
        }
// PLAYER_PART_END s4.lhTick.1

// index.html:72379 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhHeSoChan.1 EDITABLE
function lhHeSoChan(ng){
            if (!lh || !lhBat()) return 1;
            if (lh.ult && lh.ult.t < 150) return 0;
            if (lh.dang && (lh.dang.m.dung || lh.dang.m.moc)) return 0;
            if (lh.dang) return 0.25;
            if (lh.khien) return 0.5;
            return 1;
        }
// PLAYER_PART_END s4.lhHeSoChan.1

// index.html:72391 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_NGHI.1 EDITABLE
const LH_NGHI = -1.95;
// PLAYER_PART_END s4.LH_NGHI.1

// index.html:72392 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhGocNguoi.1 EDITABLE
function lhGocNguoi(){
            let D = lh.dang;
            if (D){
                let p = Math.min(1, D.t / Math.max(1, D.hit)), e = p * p * (3 - 2 * p);
                let a = D.m.a0 + (D.m.a1 - D.m.a0) * e;
                lh.ang = a; lh.angHoi = a;
                return a;
            }
            if (lh.khien) return lh.ang = (lh.ang || 0) + 0.62;
            if (lh.ch) return lh.ang = -2.2 + Math.sin(lh.ch.t * 0.05) * 0.08;   // channel qua: gio cao luoi hai chi huy bay qua
            // thu hoi: duoi dan ve tu the nghi (dung goc gan nhat, khong quay nguoc ca vong)
            let a = lh.ang;
            while (a - LH_NGHI > Math.PI) a -= Math.PI * 2;
            while (LH_NGHI - a > Math.PI) a += Math.PI * 2;
            let k = lh.hoi > 0 ? 0.09 : 0.2;
            a += (LH_NGHI - a) * k;
            lh.ang = a;
            return a + Math.sin(frames * 0.06) * 0.04;
        }
// PLAYER_PART_END s4.lhGocNguoi.1

// index.html:72412 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeCay.1 EDITABLE
function lhVeCay(hx, hy, d, a, L, sang, keoDai, nguoc){
            let sn = nguoc ? -1 : 1;                          // NGUOC: luoi lat sang phia kia can (ngua len)
            let u = { x: Math.cos(a), y: Math.sin(a) }, n = { x: -Math.sin(a) * sn, y: Math.cos(a) * sn };
            let dai = L * (1 + (keoDai || 0));
            let p0 = { x: -u.x * L * 0.34, y: -u.y * L * 0.34 }, B = { x: u.x * dai * 0.66, y: u.y * dai * 0.66 };
            ctx.save();
            ctx.translate(hx, hy); ctx.scale(d, 1);
            ctx.strokeStyle = "#1B1420"; ctx.lineWidth = 4.2; ctx.lineCap = "round";
            ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(B.x, B.y); ctx.stroke();
            ctx.strokeStyle = "#4A3A57"; ctx.lineWidth = 1.4;
            ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(B.x, B.y); ctx.stroke();
            ctx.fillStyle = "#BDB5A3";
            for (const s of [0.1, 0.42]){ ctx.beginPath(); ctx.arc(u.x * dai * s, u.y * dai * s, 2.4, 0, 6.28); ctx.fill(); }
            let S = L / 66;
            let P = (kn, ku) => ({ x: B.x + n.x * kn * S + u.x * ku * S, y: B.y + n.y * kn * S + u.y * ku * S });
            let q0 = P(0, 5), ngoai = P(30, 17), tip = P(54, -16), trong = P(27, -1), q3 = P(3, -6);
            let g = ctx.createLinearGradient(q0.x, q0.y, tip.x, tip.y);
            g.addColorStop(0, "#3D3847"); g.addColorStop(0.55, "#C9C3D6"); g.addColorStop(1, "#7E758F");
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.moveTo(q0.x, q0.y); ctx.quadraticCurveTo(ngoai.x, ngoai.y, tip.x, tip.y);
            ctx.quadraticCurveTo(trong.x, trong.y, q3.x, q3.y); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#221A2B"; ctx.lineWidth = 1.2; ctx.stroke();
            ctx.strokeStyle = sang ? "rgba(234,128,252,0.95)" : "rgba(206,147,216,0.8)"; ctx.lineWidth = sang ? 2.6 : 1.6;
            ctx.beginPath(); ctx.moveTo(tip.x, tip.y); ctx.quadraticCurveTo(trong.x, trong.y, q3.x, q3.y); ctx.stroke();
            if (sang){
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                let k = 0.5 + 0.5 * Math.sin(frames * 0.5);
                ctx.fillStyle = "rgba(186,104,200," + (0.35 + 0.3 * k).toFixed(2) + ")";
                ctx.beginPath(); ctx.arc(trong.x, trong.y, 16 * S + 6 * k, 0, 6.28); ctx.fill();
                ctx.restore();
            }
            ctx.restore();
            return { x: hx + d * tip.x, y: hy + tip.y };
        }
// PLAYER_PART_END s4.lhVeCay.1

// index.html:72447 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhMui.1 EDITABLE
function lhMui(hx, hy, d, a, L, kn, ku, nguoc){
            let sn = nguoc ? -1 : 1;
            let ux = Math.cos(a), uy = Math.sin(a), nx = -uy * sn, ny = ux * sn, S = L / 66;
            let bx = ux * L * 0.66, by = uy * L * 0.66;
            let x = bx + nx * kn * S + ux * ku * S, y = by + ny * kn * S + uy * ku * S;
            return { x: hx + d * x, y: hy + y };
        }
// PLAYER_PART_END s4.lhMui.1

// index.html:72457 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeNgang.1 EDITABLE
function lhVeNgang(ng, d, N, L, LL){
            LL = LL || L;                                        // co luoi (mac dinh theo chieu dai can)
            let cx = ng.x + ng.w / 2, cy = ng.y + ng.h * (N.thap ? 0.82 : 0.56), R = L * 0.98, ry = 11;
            let P = t => ({ x: cx + d * Math.cos(t) * R, y: cy + Math.sin(t) * ry });
            let Q = t => ({ x: cx + d * Math.cos(t) * R * 0.66, y: cy + Math.sin(t) * ry * 0.66 });
            // vet elip tu goc bat dau toi goc hien tai
            let a0 = N.phi0, a1 = N.phi, n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / 0.1));
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            for (let i = 1; i <= n; i++){
                let t0 = a0 + (a1 - a0) * (i - 1) / n, t1 = a0 + (a1 - a0) * i / n, k = i / n;
                let p0 = P(t0), p1 = P(t1), q0 = Q(t0), q1 = Q(t1);
                ctx.fillStyle = "rgba(186,104,200," + (0.5 * k * k).toFixed(3) + ")";
                ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.lineTo(q1.x, q1.y); ctx.lineTo(q0.x, q0.y); ctx.closePath(); ctx.fill();
            }
            ctx.strokeStyle = "rgba(243,229,245,0.6)"; ctx.lineWidth = 1.5;
            ctx.beginPath(); for (let i = 0; i <= n; i++){ let t = a0 + (a1 - a0) * i / n; if (i < n * 0.45) continue; let p = P(t); if (i === Math.ceil(n * 0.45)) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); } ctx.stroke();
            ctx.restore();
            // can + luoi
            let E = P(N.phi), B = { x: cx + d * Math.cos(N.phi) * R * 0.08, y: cy };
            ctx.save();
            ctx.strokeStyle = "#1B1420"; ctx.lineWidth = 4.2; ctx.lineCap = "round";
            ctx.beginPath(); ctx.moveTo(B.x, B.y); ctx.lineTo(E.x, E.y); ctx.stroke();
            ctx.strokeStyle = "#4A3A57"; ctx.lineWidth = 1.4; ctx.stroke();
            let chieu = N.xuoi ? 1 : -1;                                // muc luoi di truoc theo chieu quay
            let lx = d * Math.sin(N.phi) * 46 * chieu * (LL / 66), up = N.nguoc ? -1 : 1;
            let tip = { x: E.x + lx, y: E.y + 6 * up }, dayB = 9 * (LL / 66);
            let g = ctx.createLinearGradient(E.x, E.y, tip.x, tip.y);
            g.addColorStop(0, "#3D3847"); g.addColorStop(0.55, "#C9C3D6"); g.addColorStop(1, "#7E758F");
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.moveTo(E.x, E.y - dayB * 0.5 * up);
            ctx.quadraticCurveTo(E.x + lx * 0.55, E.y - dayB * 1.1 * up, tip.x, tip.y);
            ctx.quadraticCurveTo(E.x + lx * 0.5, E.y + dayB * 0.2 * up, E.x, E.y + dayB * 0.5 * up);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "rgba(206,147,216,0.9)"; ctx.lineWidth = 1.6;
            ctx.beginPath(); ctx.moveTo(tip.x, tip.y); ctx.quadraticCurveTo(E.x + lx * 0.5, E.y + dayB * 0.2 * up, E.x, E.y + dayB * 0.5 * up); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeNgang.1

// index.html:72494 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeLuoiNguoi.1 EDITABLE
function lhVeLuoiNguoi(ng){
            if (lh.nem) return;                                  // luoi hai dang bay
            let d = lhDir(ng), sc = ng.getFormScale() * lhTam(), L = 66 * sc;
            let D = lh.dang, ngang = null;
            if (D && D.m.ngang){
                let p = Math.min(1, D.t / Math.max(1, D.hit)), e = p * p * (3 - 2 * p);
                let p0 = D.m.ngang[0], p1 = D.m.ngang[1];
                ngang = { phi: p0 + (p1 - p0) * e, phi0: p0, nguoc: D.m.nguoc, thap: D.m.thap, xuoi: p1 < p0 };
                lh.ang = 0.15;                                   // xong nhat ngang thi thu hoi ve tu the nghi tu day
            }
            if (ngang){ lh.vetGoc.length = 0; lhVeNgang(ng, d, ngang, L * ((D && D.m.dai) || 1), L * ((D && (D.m.luoiK || D.m.dai)) || 1)); }
            else {
                let a = lhGocNguoi(), nguoc = !!(D && D.m.nguoc);
                let keo = 0;
                if (D && D.m.moc){ let t = D.t, h = D.hit; keo = t <= h ? t / h * 1.6 : Math.max(0, 1.6 * (1 - (t - h) / 10)); }
                let hx = ng.x + ng.w / 2 + d * 8 * sc, hy = ng.y + ng.h * 0.46;
                // VET CHEM: luu GOC can roi noi suy -> cung tron min
                if (lh.dang || lh.khien){ lh.vetGoc.push({ a, hx, hy, d, L, nguoc }); if (lh.vetGoc.length > 7) lh.vetGoc.shift(); }
                else if (lh.vetGoc.length) lh.vetGoc.shift();
                let G = lh.vetGoc;
                if (G.length > 1){
                    let ngoai = [], trong = [];
                    for (let i = 1; i < G.length; i++){
                        let g0 = G[i - 1], g1 = G[i], buoc = Math.max(2, Math.min(10, Math.ceil(Math.abs(g1.a - g0.a) / 0.12)));
                        for (let k = (i === 1 ? 0 : 1); k <= buoc; k++){
                            let f = k / buoc, aa = g0.a + (g1.a - g0.a) * f, x = g0.hx + (g1.hx - g0.hx) * f, y = g0.hy + (g1.hy - g0.hy) * f;
                            ngoai.push(lhMui(x, y, g1.d, aa, g1.L, 54, -16, g1.nguoc)); trong.push(lhMui(x, y, g1.d, aa, g1.L, 16, -2, g1.nguoc));
                        }
                    }
                    ctx.save(); ctx.globalCompositeOperation = 'lighter';
                    let N = ngoai.length;
                    for (let i = 1; i < N; i++){
                        let k = i / N;
                        ctx.fillStyle = "rgba(186,104,200," + (0.5 * k * k).toFixed(3) + ")";
                        ctx.beginPath(); ctx.moveTo(ngoai[i - 1].x, ngoai[i - 1].y); ctx.lineTo(ngoai[i].x, ngoai[i].y);
                        ctx.lineTo(trong[i].x, trong[i].y); ctx.lineTo(trong[i - 1].x, trong[i - 1].y); ctx.closePath(); ctx.fill();
                    }
                    ctx.strokeStyle = "rgba(243,229,245,0.55)"; ctx.lineWidth = 1.6; ctx.lineCap = "round";
                    ctx.beginPath(); for (let i = Math.floor(N * 0.4); i < N; i++){ if (i === Math.floor(N * 0.4)) ctx.moveTo(ngoai[i].x, ngoai[i].y); else ctx.lineTo(ngoai[i].x, ngoai[i].y); } ctx.stroke();
                    ctx.restore();
                }
                lhVeCay(hx, hy, d, a, L, lh.ngatMo, keo, nguoc);
            }
            // khien xoay: banh xe tim mo truoc mat
            if (lh.khien){
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                let cx = ng.x + ng.w / 2 + d * 22, cy = ng.y + ng.h / 2, R = 78 * lhTam();
                ctx.strokeStyle = "rgba(186,104,200,0.5)"; ctx.lineWidth = 10;
                ctx.beginPath(); ctx.arc(cx, cy, R * 0.8, 0, 6.28); ctx.stroke();
                ctx.strokeStyle = "rgba(243,229,245,0.6)"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(cx, cy, R * 0.8, frames * 0.6, frames * 0.6 + 2); ctx.stroke();
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.lhVeLuoiNguoi.1

// index.html:72549 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeThanChet.1 EDITABLE
function lhVeThanChet(x, feetY, d, armR, luoi, ngang, alpha, sc, loe, nguoc){
            let b = { facingLeft: d < 0, armR, armVe: armR, luoi: luoi || 'thuong', quayNgang: ngang, loeT: loe || 0, nguoc: !!nguoc };
            RP_TIM = true; RP_ALPHA = alpha;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.translate(x, feetY); ctx.scale(sc || 1, sc || 1); ctx.translate(-x, -feetY);
            try { drawReaperDeath(b, x - 46, feetY - 112); } catch(e){}
            ctx.restore();
            RP_TIM = false; RP_ALPHA = 1;
        }
// PLAYER_PART_END s4.lhVeThanChet.1

// index.html:72559 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeHien.1 EDITABLE
function lhVeHien(H){
            let a = Math.min(1, H.t / 8, (H.T - H.t) / 10) * 0.72;
            if (a <= 0) return;
            let armR = 0.5, ngang = null, luoi = 'thuong', h0 = H.hitAt[0], nguoc = false;
            if (H.kieu === 'ngang'){ ngang = -2.6 + 5.2 * Math.min(1, H.t / (h0 * 2)); }
            else if (H.kieu === 'xoay3'){
                // @@HE-LUOIHAI4: xoay NGANG -> xoay tron mot vong CHEM XUONG -> xoay NGUOC mot vong CHEM LEN
                let h1 = H.hitAt[1], h2 = H.hitAt[2];
                if (H.t < h1 - 12) ngang = -2.6 + 5.2 * Math.min(1, H.t / (h1 - 14));
                else if (H.t < h2 - 12){ luoi = 'dai'; let p = Math.min(1, (H.t - (h1 - 12)) / 12);
                                          armR = 2.3 + Math.PI * 2 * (p - 1) + Math.max(0, H.t - h1) * 0.05; }
                else { luoi = 'dai'; nguoc = true;   // Hans: nhat 3 DAO NGUOC luoi hai — phan luoi xuc dat moi ra song
                       let p = Math.min(1, (H.t - (h2 - 12)) / 12);
                       armR = -1.1 + Math.PI * 2 * (1 - p) - Math.max(0, H.t - h2) * 0.03; }
            }
            else if (H.kieu === 'jjj'){
                let k = 0; for (let i = 0; i < H.hitAt.length; i++) if (H.t >= H.hitAt[i] - 8) k = i;
                let hh = H.hitAt[k], p = Math.min(1, Math.max(0, (H.t - (hh - 8)) / 8));
                armR = (k % 2 === 0) ? (-0.4 + 2.4 * p) : (2.0 - 2.4 * p);
            } else if (H.kieu === 'hat' || H.kieu === 'lenSong'){
                // chem HAT LEN: luoi tu thap phia truoc quet vut len tren dau
                luoi = 'dai'; if (H.kieu === 'lenSong') nguoc = true;   // @@HE-LHTHU: phan luoi xuc dat moi ra song
                armR = H.t < h0 - 5 ? 2.2 : Math.max(-1.1, 2.2 - 3.3 * ((H.t - (h0 - 5)) / 6));
            } else {
                // bo / doc: gio len (nga ra sau) roi bo xuong dung khung hit
                luoi = 'dai';
                armR = H.t < h0 - 6 ? 0.5 - 1.1 * (H.t / (h0 - 6)) : Math.min(2.3, -0.6 + 2.9 * ((H.t - (h0 - 6)) / 6));
            }
            let loe = 0; for (const hh of H.hitAt) if (H.t >= hh - 10 && H.t < hh) loe = hh - H.t;
            lhVeThanChet(H.x, H.y + 2, H.d, armR, luoi, ngang, a, lh.bien === 2 ? 1.1 : 1, loe, nguoc);
            // vet chem khi an don
            for (const hh of H.hitAt){
                let k = (H.t - hh);
                if (k < 0 || k > 10) continue;
                let al = 1 - k / 10, cx = H.x, y = H.y;
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.strokeStyle = "rgba(206,147,216," + (0.8 * al).toFixed(2) + ")"; ctx.lineWidth = 8 * al + 2;
                ctx.beginPath();
                if (H.kieu === 'ngang' || (H.kieu === 'xoay3' && hh === H.hitAt[0])) ctx.ellipse(cx + H.d * 60, y - 40, 190, 26, 0, 0, 6.28);
                else if (H.kieu === 'xoay3'){   // vong tron dung: chem xuong tim, chem len hong sang hon
                    if (hh === H.hitAt[2]) ctx.strokeStyle = "rgba(255,196,255," + (0.95 * al).toFixed(2) + ")";
                    ctx.arc(cx + H.d * 70, y - 74, 118, 0, 6.28);
                }
                else if (H.kieu === 'jjj') ctx.ellipse(cx + H.d * 60, y - 44, 80, 30, H.d * (k % 2 ? 0.5 : -0.5), 0, 6.28);
                else { ctx.arc(cx + H.d * 50, y - 60, 110, H.d > 0 ? -1.5 : Math.PI - 1.2, H.d > 0 ? 1.2 : Math.PI + 1.5); }
                ctx.stroke(); ctx.restore();
            }
        }
// PLAYER_PART_END s4.lhVeHien.1

// index.html:72608 · Phạm vi: global
// PLAYER_PART_BEGIN s4.LH_SONG_HINH.1 EDITABLE
const LH_SONG_HINH = [[-150, 0], [-112, -14], [-86, -24], [-92, -12], [-64, -36], [-72, -20], [-40, -50], [-48, -30], [-14, -66], [0, -74], [12, 0]];
// PLAYER_PART_END s4.LH_SONG_HINH.1

// index.html:72609 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeSong.1 EDITABLE
function lhVeSong(S){
            let lon = Math.min(1, S.t / 8), mo = S.het ? Math.max(0, 1 - S.het / 10) : 1, k = S.cao / 74;
            ctx.save();
            ctx.translate(S.x, S.y); ctx.scale(S.d * (S.rong || 150) / 150, 1);
            if (S.to){   // song cua THAN CHET: quang sang hong bao ngoai, de nhin ra la manh hon song nguoi choi
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                let gl = ctx.createRadialGradient(-40, -S.cao * lon * 0.45, 4, -40, -S.cao * lon * 0.45, S.cao * 1.1);
                gl.addColorStop(0, "rgba(255,196,255," + (0.35 * mo).toFixed(2) + ")"); gl.addColorStop(1, "rgba(171,71,188,0)");
                ctx.fillStyle = gl; ctx.beginPath(); ctx.ellipse(-50, -S.cao * lon * 0.45, 130, S.cao * lon * 0.8 + 6, 0, 0, 6.28); ctx.fill();
                ctx.restore();
            }
            let g = ctx.createLinearGradient(0, -S.cao * lon, 0, 0);
            g.addColorStop(0, "rgba(234,128,252," + (0.12 * mo).toFixed(2) + ")");
            g.addColorStop(0.5, "rgba(171,71,188," + (0.45 * mo).toFixed(2) + ")");
            g.addColorStop(1, "rgba(106,27,154," + (0.9 * mo).toFixed(2) + ")");
            ctx.fillStyle = g;
            ctx.beginPath();
            LH_SONG_HINH.forEach((p, i) => { let x = p[0], y = p[1] * lon * k + Math.sin(frames * 0.4 + i) * 1.5 * (p[1] ? 1 : 0); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "rgba(243,229,245," + (0.45 * mo).toFixed(2) + ")"; ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let i = 0; i < LH_SONG_HINH.length - 1; i++){ let p = LH_SONG_HINH[i]; if (i === 0) ctx.moveTo(p[0], p[1] * lon * k); else ctx.lineTo(p[0], p[1] * lon * k); }
            ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeSong.1

// index.html:72635 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeCheo.1 EDITABLE
function lhVeCheo(C){
            ctx.save();
            ctx.translate(C.x, C.y); ctx.scale(C.d, 1);
            let R = 46 * lhTam(), a = Math.min(1, (C.T - C.t) / 10);
            ctx.globalCompositeOperation = 'lighter';
            for (const [rot, sx] of [[-0.62, 1], [0.62, 1]]){
                ctx.save(); ctx.rotate(rot);
                ctx.fillStyle = "rgba(171,71,188," + (0.55 * a).toFixed(2) + ")";
                ctx.beginPath(); ctx.moveTo(0, -R); ctx.quadraticCurveTo(R * 0.9 * sx, 0, 0, R); ctx.quadraticCurveTo(R * 0.45 * sx, 0, 0, -R); ctx.fill();
                ctx.strokeStyle = "rgba(243,229,245," + (0.85 * a).toFixed(2) + ")"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(0, -R); ctx.quadraticCurveTo(R * 0.9 * sx, 0, 0, R); ctx.stroke();
                ctx.restore();
            }
            ctx.fillStyle = "rgba(243,229,245," + (0.6 * a).toFixed(2) + ")"; ctx.beginPath(); ctx.arc(R * 0.25, 0, 5, 0, 6.28); ctx.fill();
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeCheo.1

// index.html:72651 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeHon.1 EDITABLE
function lhVeHon(H){
            let bob = Math.sin(H.t * 0.25 + H.lech) * 2;
            ctx.save();
            ctx.translate(H.x, H.y + bob);
            let huong = (H.vx || 0) < 0 ? -1 : 1; ctx.scale(huong, 1);
            ctx.shadowBlur = 10; ctx.shadowColor = "#E1BEE7";
            ctx.fillStyle = "rgba(250,250,255,0.9)";
            ctx.beginPath(); ctx.arc(0, -4, 7, Math.PI, 0);
            ctx.lineTo(7, 4);
            for (let k = 0; k < 4; k++) ctx.lineTo(7 - (k + 0.5) * 3.5 - 2, 4 + (k % 2 ? 0 : 5) + Math.sin(H.t * 0.4 + k) * 1.5);
            ctx.lineTo(-7, 4); ctx.closePath(); ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = "#1A1026"; ctx.fillRect(-3.5, -6, 2.4, 3.5); ctx.fillRect(1.5, -6, 2.4, 3.5);
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeHon.1

// index.html:72666 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeVet.1 EDITABLE
function lhVeVet(V){
            let mo = Math.min(1, V.t / 12, (V.T - V.t) / 14), w = 92 * mo;
            ctx.save();
            let g = ctx.createRadialGradient(V.x, V.y, 2, V.x, V.y, w);
            g.addColorStop(0, "rgba(234,128,252,0.7)"); g.addColorStop(1, "rgba(106,27,154,0)");
            ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(V.x, V.y - 6, w, 26 * mo, 0, 0, 6.28); ctx.fill();
            ctx.fillStyle = "#07020C";
            ctx.beginPath(); ctx.moveTo(V.x - w * 0.9, V.y);
            for (let k = 0; k <= 8; k++){ let x = V.x - w * 0.9 + k * (w * 1.8 / 8); ctx.lineTo(x, V.y - (k % 2 ? 7 : 2) * mo); }
            for (let k = 8; k >= 0; k--){ let x = V.x - w * 0.9 + k * (w * 1.8 / 8); ctx.lineTo(x, V.y + (k % 2 ? 5 : 2) * mo); }
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "rgba(234,128,252,0.85)"; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeVet.1
