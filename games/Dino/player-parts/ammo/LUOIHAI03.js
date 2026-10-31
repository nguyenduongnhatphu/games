// PLAYER_FILE: LUOIHAI03
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: FloatingText, LH_BIEN_T, LH_NO_MAX, LT, STYLE_RANKS, camX, camY, canvas, combatStance, ctx, dino, floatingTexts, frames, gameState, hudChu, hudHangDragon, lh, lhBat, lhChBat, lhChu, lhDir, lhDs, lhHeSoChan, lhHienBat, lhImpactDat, lhK, lhLaChu, lhMoi, lhUltBat, lhVeCay, lhVeCheo, lhVeDap, lhVeHien, lhVeHon, lhVeLuoiNguoi, lhVeQua, lhVeSong, lhVeTay2, lhVeThanChet, lhVeTrang, lhVeVet, shakeTimer, styleRankNow, ultCharge, vkDangKy
// index.html:72676 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeNem.1 EDITABLE
function lhVeNem(N){
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            ctx.strokeStyle = "rgba(186,104,200,0.45)"; ctx.lineWidth = 12;
            ctx.beginPath(); ctx.arc(N.x, N.y, 44, 0, 6.28); ctx.stroke();
            ctx.restore();
            lhVeCay(N.x, N.y, 1, N.goc, 66, true, 0);
        }
// PLAYER_PART_END s4.lhVeNem.1

// index.html:72683 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVe.1 EDITABLE
function lhVe(){
            if (!lh || !lhBat() || typeof dino === 'undefined' || !dino) return;
            let ng = dino;
            if (gameState !== 'normal' && gameState !== 'boss_rush' && gameState !== 'test_boss' && gameState !== 'pvp') return;   // @@HE-P2KHOA
            // bien hinh: bong than chet sau lung
            if (lh.bien >= 1 && lh.theo){
                let d = lhDir(ng), cap2 = lh.bien === 2, Th = lh.theo, V = Th.vung;
                let armR = 0.5 + Math.sin(frames * 0.05) * 0.1, qn = null, luoi = 'thuong', loe = 0;
                if (V){
                    let p = V.t / V.T;
                    if (V.kieu === 'ngang'){ qn = -2.6 + 5.2 * Math.min(1, V.t / 12); }
                    else { luoi = 'dai'; armR = V.t < 5 ? 0.5 - 1.1 * (V.t / 5) : Math.min(2.3, -0.6 + 2.9 * ((V.t - 5) / 4)); }
                    loe = V.t < 6 ? 6 - V.t : 0;
                }
                lhVeThanChet(Th.x, Th.y, d, armR, luoi, qn, cap2 ? 0.62 : 0.5, cap2 ? 0.95 : 0.72, loe);
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = "rgba(171,71,188," + (cap2 ? 0.16 : 0.09) + ")";
                ctx.beginPath(); ctx.ellipse(ng.x + ng.w / 2, ng.y + ng.h / 2, ng.w * (cap2 ? 1.3 : 1), ng.h * (cap2 ? 1.2 : 0.9), 0, 0, 6.28); ctx.fill();
                ctx.restore();
            }
            // channel: bay qua trang
            if (lh.ch && lh.ch.qua) for (const Q of lh.ch.qua) lhVeQua(Q);
            for (const V of lh.vet) lhVeVet(V);
            for (const H of lh.hien) lhVeHien(H);
            for (const X of lh.xac){
                let o = X.o, cx = o.x + (o.w || 20) / 2, cy = o.y + (o.h || 20) / 2;
                // @@HE-LHDAN: quay mat theo huong lao — hinh goc quay trai (hoac phai neu no tu lat)
                let _lat = o.dir === undefined && ((X.huong === 1) !== !!X.tuPhai);
                if (_lat){ ctx.save(); ctx.translate(cx, 0); ctx.scale(-1, 1); ctx.translate(-cx, 0); }
                try { X.o.draw(); } catch(e){}
                if (_lat) ctx.restore();
                if (X.toc > 6){   // vet lao
                    ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = "#CE93D8";
                    for (let k = 1; k <= 3; k++) ctx.fillRect(cx - X.huong * ((o.w || 20) / 2 + k * 9), cy - 3 + k, 7, 2);
                    ctx.restore();
                }
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                ctx.strokeStyle = "rgba(186,104,200," + (0.5 + 0.3 * Math.sin(frames * 0.3)).toFixed(2) + ")"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.ellipse(cx, cy, (o.w || 20) * 0.75, (o.h || 20) * 0.75, 0, 0, 6.28); ctx.stroke();
                ctx.restore();
            }
            for (const B of lh.bong){
                let a = Math.min(1, B.t / 12, (B.T - B.t) / 16) * 0.6;
                let hh = [70, 130, 190].find(v => B.t >= v - 12 && B.t < v + 4);
                let armR = hh ? (B.t < hh ? 0.5 - 1.1 * ((B.t - (hh - 12)) / 12) : 2.2) : 0.5;
                lhVeThanChet(B.x, B.y, B.d, armR, 'dai', null, a, 1.25, 0);
                ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = "#E1BEE7"; ctx.font = "bold 10px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(B.ten, B.x, B.y - 150); ctx.textAlign = "left"; ctx.restore();
            }
            for (const S of lh.song) lhVeSong(S);
            for (const C of lh.cheo) lhVeCheo(C);
            for (const H of lh.hon) lhVeHon(H);
            if (lh.nem) lhVeNem(lh.nem);
            // day moc keo
            if (lh.trang) for (const V of lh.trang) lhVeTrang(V);   // @@HE-NOVA3
            if (lh.dapVe) lhVeDap();                                 // @@HE-LHDAP
            if (lh.keo && lh.keo.o && lh.keo.tay){ /* @@HE-NOVA4: Tay linh hon ve o lhVeTren (tren nguoi choi) */ }
            else if (lh.keo && lh.keo.o){
                let o = lh.keo.o, d = lhDir(ng);
                ctx.save(); ctx.strokeStyle = "rgba(206,147,216,0.8)"; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
                ctx.beginPath(); ctx.moveTo(ng.x + ng.w / 2 + d * 20, ng.y + ng.h * 0.45); ctx.lineTo(o.x + (o.w || 20) / 2, o.y + (o.h || 20) / 2); ctx.stroke();
                ctx.restore();
            }
            lhVeLuoiNguoi(ng);
        }
// PLAYER_PART_END s4.lhVe.1

// index.html:72749 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeTren.1 EDITABLE
function lhVeTren(){
            if (!lh || typeof dino === 'undefined' || !dino) return;
            if (lh.keo && lh.keo.o && lh.keo.tay && lhBat()) lhVeTay2(dino, lh.keo);   // @@HE-NOVA4
            for (let o of lhDs()){
                if (!o._lhTen) continue;
                let cx = o.x + (o.w || 20) / 2, y = o.y - 18 + Math.sin(frames * 0.1) * 2;
                ctx.save(); ctx.globalAlpha = 0.9;
                ctx.strokeStyle = "#CE93D8"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(cx, y, 7, 0, 6.28); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(cx, y - 7); ctx.lineTo(cx, y + 7); ctx.moveTo(cx - 5, y + 2); ctx.lineTo(cx + 5, y + 2); ctx.stroke();
                ctx.restore();
            }
            if (!lhBat()) return;
            if (lh.ult) lhVeUlt(lh.ult);
            if (gameState === 'pvp') return;   // @@HE-P2KHOA: PvP khong co Power DEATH (I/O) -> khong ve thanh NO
            // HUD (toa do man hinh)
            ctx.save(); ctx.translate(typeof camX !== 'undefined' ? camX : 0, typeof camY !== 'undefined' ? camY : 0);
            let y = (typeof hudHangDragon === 'function') ? hudHangDragon() : 108, x = 120, w = 120, h = 9;
            ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(x, y, w, h);
            ctx.font = 'bold 9px Consolas, monospace'; ctx.textAlign = 'left';
            let chu = (s, cx, col) => { if (typeof hudChu === 'function') hudChu(s, cx, y + 7, col); else { ctx.fillStyle = col; ctx.fillText(s, cx, y + 7); } };
            if (lh.bien === 0){
                ctx.fillStyle = lh.no >= LH_NO_MAX ? '#BA68C8' : '#6D4C7D'; ctx.fillRect(x, y, w * (lh.no / LH_NO_MAX), h);
                chu(lh.no >= LH_NO_MAX ? LT('NỘ ĐẦY — I/O', 'RAGE — I/O') : LT('NỘ', 'RAGE'), 20, lh.no >= LH_NO_MAX ? '#E1BEE7' : '#B39DDB');
            } else {
                ctx.fillStyle = lh.bien === 2 ? '#EA80FC' : '#AB47BC'; ctx.fillRect(x, y, w * Math.min(1, lh.bienT / LH_BIEN_T), h);
                chu('DEATH ' + (lh.bien === 2 ? 'II' : 'I') + ' ' + (lh.bienT / 60).toFixed(1) + 's', 20, '#E1BEE7');
                if (lh.bien === 1 && typeof styleRankNow === 'function' && styleRankNow() >= 4)
                    chu(LT('▲ ' + STYLE_RANKS[styleRankNow()] + ' — I/O LÊN CẤP 2', '▲ ' + STYLE_RANKS[styleRankNow()] + ' — I/O FOR LEVEL 2'), 246, '#FFE082');
            }
            ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeTren.1

// index.html:72782 · Phạm vi: global
// PLAYER_PART_BEGIN s4.lhVeUlt.1 EDITABLE
function lhVeUlt(U){
            let cX = (typeof camX !== 'undefined' ? camX : 0), cY = (typeof camY !== 'undefined' ? camY : 0);
            let W = canvas.width, Hh = canvas.height, t = U.t;
            let a = Math.min(1, t / 14) * Math.min(1, Math.max(0, (U.T - t) / 20));
            ctx.save(); ctx.translate(cX, cY);
            ctx.fillStyle = "rgba(10,2,18," + (0.72 * a).toFixed(2) + ")"; ctx.fillRect(0, 0, W, Hh);
            let vg = ctx.createRadialGradient(W / 2, Hh / 2, 80, W / 2, Hh / 2, W * 0.7);
            vg.addColorStop(0, "rgba(106,27,154,0)"); vg.addColorStop(1, "rgba(106,27,154," + (0.45 * a).toFixed(2) + ")");
            ctx.fillStyle = vg; ctx.fillRect(0, 0, W, Hh);
            ctx.restore();
            // than chet khong lo o giua, mot tay cam cuon SO SINH TU
            let cx = cX + W / 2 - 170, feet = cY + Hh - 60;
            lhVeThanChet(cx, feet, 1, 0.35 + Math.sin(t * 0.08) * 0.08, 'dai', null, 0.92 * a, 1.55, 0);
            // cuon so
            let sx = cX + W / 2 + 10, sy = cY + 60, sw = 300, mo = Math.min(1, Math.max(0, (t - 16) / 18));
            let sh = 26 + 250 * mo;
            ctx.save(); ctx.globalAlpha = a;
            ctx.fillStyle = "#E8DDC5"; ctx.fillRect(sx, sy, sw, sh);
            ctx.fillStyle = "#6D4C41"; ctx.fillRect(sx - 8, sy - 8, sw + 16, 10); ctx.fillRect(sx - 8, sy + sh - 2, sw + 16, 10);
            ctx.strokeStyle = "rgba(106,27,154,0.5)"; ctx.lineWidth = 1; ctx.strokeRect(sx + 6, sy + 6, sw - 12, sh - 12);
            if (mo >= 1){
                ctx.fillStyle = "#4A148C"; ctx.font = "bold 14px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText(LT('SỔ SINH TỬ', 'LEDGER OF THE DEAD'), sx + sw / 2, sy + 26);
                ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "left";
                let viet = Math.floor((t - 34) / 9);
                for (let i = 0; i < U.ten.length && i <= viet; i++){
                    let ty = sy + 50 + i * 18; if (ty > sy + sh - 14) break;
                    let s = U.ten[i], p = Math.min(1, (t - 34 - i * 9) / 9), n = Math.max(1, Math.floor(s.length * p));
                    ctx.fillStyle = "#311B92"; ctx.fillText(s.slice(0, n), sx + 20, ty);
                    if (p >= 1){ ctx.strokeStyle = "rgba(183,28,28,0.8)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(sx + 16, ty - 4); ctx.lineTo(sx + 26 + ctx.measureText(s).width, ty - 4); ctx.stroke(); }
                }
                if (!U.ten.length){ ctx.fillStyle = "#6A1B9A"; ctx.fillText(LT('(không có ai)', '(no one)'), sx + 20, sy + 50); }
            }
            ctx.textAlign = "left";
            ctx.restore();
        }
// PLAYER_PART_END s4.lhVeUlt.1

// index.html:72819 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.20 EDITABLE
vkDangKy(18, {
            ten: 'LUOI HAI',
            // @@HE-LOLUNG2 — rune LO LUNG: nha K giua khong (xem hoverMidCharge)
            // than chet hien ra chem mot nhat NANG LUONG TIM hinh ban nguyet: nhat doc 5 + song ban nguyet 4 bay 60% man
            hoverSac(half){
                if (!lh) lh = lhMoi();
                if (lh.ult) return;
                let d = lhDir(this);
                let W = (typeof canvas !== 'undefined' && canvas.width) ? canvas.width : 1000;
                /* @@HE-LOLUNG3 — Hans: "Luoi hai lo lung khong target muc tieu". Truoc day than chet chem doc NGAY CHO nguoi
                   choi dang treo tren khong (hop an tu chan nguoi choi len tren -> ke dich duoi dat khong bao gio trung) va nhat
                   ban nguyet bay NGANG o do cao lo lung. Gio: than chet hien ra DUNG CANH muc tieu gan nhat, tren mat dat, chem
                   doc 5 vao no; nhat ban nguyet 4 bay THANG tu nguoi choi toi muc tieu (xuyen, bay tiep 60% man). */
                let N = this.hoverNgam();
                let H = lhHienBat(this, 'doc', 5);
                let cx = this.x + this.w / 2, cy = this.y + this.h * 0.5, g = d > 0 ? 0 : Math.PI;
                if (N && N.o){
                    let o = N.o, od = N.tx < cx ? -1 : 1;
                    d = od; this.isFacingLeft = od < 0;
                    H.d = od; H.x = N.tx - od * Math.max(40, (o.w || 20) * 0.5 + 10); H.y = o.y + (o.h || 20);
                    g = Math.atan2(N.ty - cy, N.tx - cx);
                }
                let T = lh.trang || (lh.trang = []), toc = 14;
                T.push({ ngang: 0, ry: 74, ro: 50, ri: 18, rot: Math.atan2(Math.sin(g), Math.abs(Math.cos(g))), y: cy, x: cx, x0: cx, y0: cy,
                         d: Math.cos(g) < 0 ? -1 : 1, vx: Math.cos(g) * toc, vy: Math.sin(g) * toc, t: 0, het: 0, manh: true,
                         xa: W * 0.6, hit: new Set(), dmg: 4, toc: toc });
                lhChu(this.x - 30, this.y - 40, "TRẢM NGUYỆT!", "CRESCENT REAP!");
            },
            theLuc: 6,
            sacToiDa: 180,
            slamTo: 1.45,
            // J: khong co nhanh o day — lhTickJ (vong lap chinh) bat canh len cua J va dem nhip
            nhaK(){
                if (lhLaChu(this) && typeof lhK === 'function') lhK(this, this.aKeyHeldTime);   // @@HE-LHDAN · @@HE-P2KHOA
            },
            channelRieng(chargeKey){
                if (chargeKey && combatStance === 0 && this.aKeyHeldTime >= 180) {   // @@HE-LHDAN
                    if (lhLaChu(this) && typeof lhChBat === 'function'){ if (lh && !lh.ch && !lh.ult) lhChBat(this); }
                }
            },
            batUlt(){
                if (!lhLaChu(this) || typeof lhUltBat !== 'function') { /* @@HE-LHDAN · @@HE-P2KHOA: P1, va P2 trong PvP */ } else
                // @@HE-LUOIHAI — SO SINH TU
                if (lhUltBat(this)){
                    ultCharge = 0;
                    this.aKeyHeldTime = 0; this.chargeProgress = 0;
                    floatingTexts.push(new FloatingText(this.x - 50, this.y - 34, LT("SỔ SINH TỬ!", "LEDGER OF THE DEAD!")));
                    shakeTimer = Math.max(shakeTimer, 30);
                }
            },
            // Body Slam: vet nut dat tim cua than chet (khong goi set cua Bua)
            slamDuoi(ix, iy, to){
                // LUOI HAI (rune cua Bua) — khong goi set cua Bua: vet nut dat tim cua than chet
                if (typeof lhImpactDat === 'function') lhImpactDat(this, 0, 1);
                shakeTimer = Math.max(shakeTimer, to ? 22 : 14);
            },
            // chay 100%, dang vung thi cham
            heSoChay(mv){
                if (lhLaChu(this) && typeof lhHeSoChan === 'function') mv *= lhHeSoChan(this);   // @@HE-LHDAN: chay 100%, dang vung thi cham
                return mv;
            }
        });
// PLAYER_PART_END s4.vkDangKy.20
