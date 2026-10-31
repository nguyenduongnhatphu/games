// PLAYER_FILE: CUSTOM06
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CUS_DAN, CUS_QD_CUA_SO, CUS_QD_DAC, CUS_QD_KHOA, CUS_QD_R, CUS_QD_RCUI, CUS_QN_CM, CUS_QN_MOC, CUS_QN_NO, CUS_TOA_CM, CUS_TOA_SO, CUS_TOA_TOC, CUS_TT_HOMH, CUS_TT_HOMW, CUS_TT_TRAN, CUS_TT_TRUC, CUS_UFO_BAT, CUS_UFO_CAO, CUS_UFO_DMG, CUS_UFO_HOICD, CUS_UFO_NHIP, CUS_UFO_NHUN, CUS_UFO_VAO, CUS_VIEN_H, CUS_VIEN_W, CW_MAU_THAN, CW_RO_VANG, CW_RO_XANH, CW_VE_DAY, CW_VE_LUOI, CW_VE_VONG, Effect, FloatingText, Projectile, SFX, allTargets, bossProjectiles, bosses, camX, canvas, checkAABB, ctx, cusCapCua, cusChCap, cusCwBat, cusGb, cusGbGiu, cusGbVao, cusHieuUng, cusKvBat, cusLap, cusMauDan, cusMt, cusMtGiu, cusMtVao, cusNoDat, cusPtBat, cusPvpDanh, cusQdBat, cusQdNguoi, cusQdR, cusStandThu, cusTTBat, cusTangPT, cusTl, cusTlVao, cusToaTia, cusToaVong, cusUzGiu, cusUzVao, cusUzu, cwHop, dangCua, dashVx, dealDamage, defMode, defUnits, dino, dino2, doChieuThu, enemies, floatingTexts, frames, gameSpeed, gameState, novaBlast, novaBom, novaCo, novaHenGioEp, obstacles, projectiles, pvpDich, shakeTimer, visualEffects, worldL, worldR
// index.html:66713 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQdVaCham.1 EDITABLE
function cusQdVaCham(ng, A){
            let cap = cusCapCua('quydao');
            for (let i = A.length - 1; i >= 0; i--){
                let S = A[i];
                if (S.khoa > 0) continue;
                let r = S.cui ? CUS_QD_RCUI : CUS_QD_R;
                let hop = { x: S.x - r, y: S.y - r, w: r * 2, h: r * 2 };
                let trung = false;
                // ---- 1. DAN CUA KE DICH ----
                if (typeof bossProjectiles !== 'undefined'){
                    for (let j = bossProjectiles.length - 1; j >= 0; j--){
                        let bp = bossProjectiles[j];
                        if (!bp || typeof checkAABB !== 'function' || !checkAABB(hop, bp)) continue;
                        visualEffects.push(new Effect(bp.x + (bp.w||8)/2, bp.y + (bp.h||8)/2, 'parry', false));
                        bossProjectiles.splice(j, 1);
                        trung = true; break;
                    }
                }
                // PvP: dan cua nguoi choi ben kia cung nam trong `projectiles`
                if (!trung && gameState === 'pvp' && typeof projectiles !== 'undefined'){
                    for (let j = projectiles.length - 1; j >= 0; j--){
                        let pr = projectiles[j];
                        if (!pr || pr.owner === ng.id || !checkAABB(hop, pr)) continue;
                        visualEffects.push(new Effect(pr.x + (pr.w||8)/2, pr.y + (pr.h||8)/2, 'parry', false));
                        projectiles.splice(j, 1);
                        trung = true; break;
                    }
                }
                // @@HE-DOCHIEU: sao cham diem do chieu = mot lan do
                if (!trung && typeof doChieuThu === 'function' && doChieuThu(S, hop, ng.bulletDmg || 1)) trung = true;
                // ---- 2. THAN KE DICH ----
                //  `allTargets()` da bao gom ca doi thu PvP (qua `pvpVoBoc`, no tu xu ly khien
                //  va he so can bang PvP) nen khong can mot nhanh PvP rieng o day.
                let _qdO = null;
                if (!trung && typeof allTargets === 'function'){
                    for (let o of allTargets()){
                        if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                        if (!checkAABB(hop, o)) continue;
                        cusQdDanh(ng, o);
                        trung = true; _qdO = o; break;
                    }
                }
                if (!trung) continue;
                /* @@HE-NOVA2 — Hans: "Vu no giua 2 giao diem tro nen to hon gap doi. De lai do mot vu no nua."
                   Moi lan ngoi sao cham (than dich HAY dan dich): vu no Nova ban kinh GAP DOI dan thuong (68 thay 34),
                   va cho do CHAC CHAN co mot vu no lan hai 1 giay sau (khong cho hoi chieu chung 1 giay cua Nova). */
                if (typeof novaCo === 'function' && novaCo(ng)){
                    let _nb = novaBom.length;
                    novaBlast(S.x, S.y, 68, 1, _qdO ? new Set([_qdO]) : null, 0, 'explosion');
                    if (novaBom.length === _nb) novaHenGioEp(S.x, S.y, 68);
                }
                /* CAP 3 — lan cham dau KHONG xoa ngoi sao, chi lam no CUI di. Khoa
                   CUS_QD_KHOA khung nen hai lan cham khong the roi vao cung mot khung:
                   day la hai lan 1 sat thuong, khong phai mot lan 2. */
                if (cap >= 3 && !S.cui){ S.cui = 1; S.khoa = CUS_QD_KHOA; S.lao = null; continue; }
                A.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.cusQdVaCham.1

// index.html:66771 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQdDanh.1 EDITABLE
function cusQdDanh(ng, o){
            let base = ng.bulletDmg || 1, d = cusTangPT(o, base);
            // moi lan cham la MOT lan proc noi tai, dung co che ma loat `cusLot` san co
            ng.cusLot = (ng.cusLot || 0) + 1;
            if (o._cusLot !== ng.cusLot){ o._cusLot = ng.cusLot; d += cusHieuUng(o, base); }
            cusStandThu(o, d, 'sao', ng.id);
            if (typeof dealDamage === 'function') dealDamage(o, d, 'ammo'); else o.hp -= d;
            // nhanh NO treo o moc va cham cua VIEN DAN, ma o day khong co `Projectile` nao
            if (typeof cusCapCua === 'function' && cusCapCua('no') > 0 && typeof cusNoDat === 'function')
                cusNoDat(o.x + (o.w||20)/2, o.y + (o.h||20)/2);
            visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 12));
        }
// PLAYER_PART_END s4.cusQdDanh.1

// index.html:66787 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQdVeSao.1 EDITABLE
function cusQdVeSao(x, y, r, quay, cui, mau, khongGlow){
            ctx.save();
            ctx.translate(x, y); ctx.rotate(quay);
            ctx.beginPath();
            for (let i = 0; i < 10; i++){
                let rr = (i % 2) ? r * 0.44 : r;
                let a = i * Math.PI / 5 - Math.PI / 2;
                if (i === 0) ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
                else         ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
            }
            ctx.closePath();
            if (!cui && !khongGlow){ ctx.shadowBlur = 9; ctx.shadowColor = mau[0]; }
            ctx.fillStyle = cui ? "#8C9AA6" : mau[1];
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.lineWidth = 1.6; ctx.strokeStyle = cui ? "#5A6773" : mau[2];
            ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.cusQdVeSao.1

// index.html:66806 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQdVe.1 EDITABLE
function cusQdVe(){
            if (!cusQdBat()) return;
            let mau = cusMauDan();
            for (let k = 0; k < 2; k++){
                let ng = cusQdNguoi(k);
                if (!ng || !ng.cusQd || !ng.cusQd.length) continue;
                let A = ng.cusQd, R = cusQdR(), cx = ng.x + ng.w/2, cy = ng.y + ng.h/2;
                ctx.save();
                let dac = A.length > CUS_QD_DAC;
                // VANH LUOI CUA — chi hien khi vong da du day
                if (A.length >= CUS_QD_CUA_SO){
                    let dam = Math.min(0.30, 0.05 + (A.length - CUS_QD_CUA_SO) * 0.022);
                    ctx.globalAlpha = dam;
                    ctx.strokeStyle = mau[1]; ctx.lineWidth = CUS_QD_R * 1.5;
                    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.28); ctx.stroke();
                    ctx.globalAlpha = dam * 1.5;
                    ctx.strokeStyle = mau[2]; ctx.lineWidth = 2;
                    ctx.setLineDash([7, 11]);
                    ctx.beginPath(); ctx.arc(cx, cy, R, ng.cusQdGoc * 2, ng.cusQdGoc * 2 + 6.28); ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.globalAlpha = 1;
                }
                // VET truoc, SAO sau — de ngoi sao luon nam tren cung cua vet cua chinh no
                /* VET SAO CHOI — ve bang MOT DAI THON DAN (ribbon), khong phai bang net ke.
                   Hai lan truoc deu hong theo cung mot kieu: ve tung doan bang `stroke` voi
                   `lineCap:'round'` thi moi DAU DOAN de lai mot hinh tron, nen cai vet ra
                   thanh mot CHUOI HAT chu khong phai mot vet lien. Doi sang ba lop duong lien
                   tuc cung khong cuu duoc: ba lop bat dau o ba cho khac nhau nen thanh ba cai
                   dau tron to nho dan — van la hat, chi it hat hon.
                   Cach dung la tu dung lay HINH: moi diem trong lich su cho ra hai bien trai
                   va phai, be rong thon tu 0 o duoi vet len r0 o dau vet, roi `fill` mot lan.
                   Khong co dau net nao ca nen khong the ra hat, va dau vet to dan lam no doc
                   dung chieu chuyen dong. */
                if (dac){
                    // mot dai duy nhat thay cho hang tram vet chong len nhau
                    ctx.globalAlpha = 0.34;
                    ctx.strokeStyle = mau[1]; ctx.lineWidth = CUS_QD_R * 0.82;
                    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.28); ctx.stroke();
                    ctx.globalAlpha = 1;
                }
                for (let S of A){
                    if (dac) break;
                    let V = S.vet; if (!V || V.length < 6) continue;
                    let n = V.length / 2;
                    let mo = 1;
                    let r0 = (S.cui ? CUS_QD_RCUI : CUS_QD_R) * 0.82;
                    let mauVet = S.cui ? "#7E8B96" : mau[1];
                    for (let lop = 0; lop < 2; lop++){
                        let he = lop ? 0.42 : 1, al = lop ? 0.42 : 0.20;
                        ctx.globalAlpha = mo * al;
                        ctx.fillStyle = mauVet;
                        ctx.beginPath();
                        // bien TRAI: di tu duoi vet len dau vet
                        for (let i = 0; i < n; i++){
                            let x = V[i*2], y = V[i*2+1];
                            let j = Math.min(n - 1, i + 1), k = Math.max(0, i - 1);
                            let dx = V[j*2] - V[k*2], dy = V[j*2+1] - V[k*2+1];
                            let d = Math.hypot(dx, dy) || 1;
                            let h = r0 * he * 0.5 * (i / (n - 1));
                            let px = -dy / d * h, py = dx / d * h;
                            if (i === 0) ctx.moveTo(x + px, y + py); else ctx.lineTo(x + px, y + py);
                        }
                        // bien PHAI: quay nguoc ve
                        for (let i = n - 1; i >= 0; i--){
                            let x = V[i*2], y = V[i*2+1];
                            let j = Math.min(n - 1, i + 1), k = Math.max(0, i - 1);
                            let dx = V[j*2] - V[k*2], dy = V[j*2+1] - V[k*2+1];
                            let d = Math.hypot(dx, dy) || 1;
                            let h = r0 * he * 0.5 * (i / (n - 1));
                            ctx.lineTo(x + dy / d * h, y - dx / d * h);
                        }
                        ctx.closePath(); ctx.fill();
                    }
                }
                for (let S of A){
                    ctx.globalAlpha = 1;
                    cusQdVeSao(S.x, S.y, S.cui ? CUS_QD_RCUI : CUS_QD_R, S.quay, S.cui, mau, dac);
                }
                ctx.globalAlpha = 1;
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.cusQdVe.1

// index.html:66894 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cwVeMot.1 EDITABLE
function cwVeMot(ng){
            if (!ng) return;
            let d = ng.isFacingLeft ? -1 : 1;
            /* CUA CHI DONG DAY KHI GIU J. Hans: "cua khong tu Animation ma luc J moi xoay luoi
               va dua cua ra mot chut." Nen `day` ghe tu 0 len CW_VE_DAY khi dang cua va ve 0
               khi buong — ghe chu khong nhay, neu khong cai cua giat mot cai moi lan bam J. */
            let dangCua0 = (ng.cwGiu || 0) > 0 || !!ng.cwKhoa;
            ng._cwDay = (ng._cwDay || 0) + ((dangCua0 ? 1 : 0) - (ng._cwDay || 0)) * 0.25;
            let day = ng._cwDay * CW_VE_DAY;
            let bx = ng.x + ng.w/2 + d * (32 + day), by = ng.y + ng.h * 0.60 - ng._cwDay * 2;
            let trangThai = ng.cwMau || (ng.cwHieu ? ng.cwHieu.loai : 'do');
            let mau = CW_MAU_THAN[trangThai] || CW_MAU_THAN.do;
            let dangCua = (ng.cwGiu || 0) > 0 || !!ng.cwKhoa;
            let hop = cwHop(ng);
            let banTay = CW_VE_LUOI;               // do dai luoi THAT (px)
            ctx.save();
            /* --- 1. luoi cua gio ---
               Hans goi no la "luoi cua VO HINH", nen no khong duoc ve thanh mot thanh dac:
               lan dau toi do mot mang xam alpha 0.34 tu luoi ra het tam, va chup ra thi no
               doc y het mot cai luoi kim loai dai ngoang — nguoi choi se tuong do la tam
               that cua cai cua ngay ca luc chua giu J. Nay chi con VET GIO: vai duong cong
               chay giat theo nhip, mo dan ve phia dau, cong mot mang nen rat nhat de con
               biet vung do co an. */
            if (hop.tam > banTay + 6){
                let x0 = bx + d * banTay, xl = hop.tam - banTay;
                let g = ctx.createLinearGradient(x0, 0, x0 + d * xl, 0);
                g.addColorStop(0, "rgba(224,247,255,0.13)");
                g.addColorStop(1, "rgba(224,247,255,0.00)");
                ctx.fillStyle = g;
                ctx.fillRect(Math.min(x0, x0 + d * xl), by - 11, xl, 22);
                for (let k = 0; k < 4; k++){
                    let pha = (frames * 0.34 + k * 1.7) % 1;
                    let xs = x0 + d * xl * pha, xe = xs + d * Math.min(xl * 0.30, 40);
                    let yy = by + Math.sin(frames * 0.2 + k * 2.1) * 8;
                    ctx.globalAlpha = 0.55 * (1 - pha);
                    ctx.strokeStyle = (trangThai === 'do') ? "#B3E5FC" : mau[1];
                    ctx.lineWidth = 1.6;
                    ctx.beginPath(); ctx.moveTo(xs, yy); ctx.lineTo(xe, yy + (k - 1.5) * 2); ctx.stroke();
                }
                ctx.globalAlpha = 1;
            }
            /* Mot cai than cua 24x22px doi mau thi o co the that trong tran nguoi choi khong
               nhin ra, nhat la khi con dino cung mau cam do. Nen khi da chot duoc mau thi ve
               them mot QUANG SANG quanh ca cai cua — do moi la thu doc duoc tu xa. */
            if (trangThai !== 'do'){
                ctx.save();
                ctx.shadowBlur = 14; ctx.shadowColor = mau[1];
                ctx.globalAlpha = 0.30 + 0.20 * Math.sin(frames * 0.16);
                ctx.fillStyle = mau[1];
                ctx.beginPath();
                ctx.ellipse(bx + d * 10, by, 44, 21, 0, 0, 6.28);
                ctx.fill();
                ctx.restore();
            }
            // --- 2. than cua ---  (mau doi theo trang thai; LUOI thi khong bao gio doi)
            ctx.fillStyle = mau[0];
            ctx.fillRect(bx - d * 19, by - 13, d * 29, 26);
            ctx.fillStyle = mau[1];
            ctx.fillRect(bx - d * 17, by - 11, d * 12, 9);
            ctx.fillStyle = mau[2];
            ctx.fillRect(bx - d * 19, by + 7, d * 29, 6);
            ctx.fillStyle = "#37474F";
            ctx.fillRect(bx - d * 9, by - 13, d * 4, 26);            // khe may
            // tay cam sau + tay cam tren
            ctx.strokeStyle = mau[2]; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.moveTo(bx - d * 18, by - 11); ctx.lineTo(bx - d * 28, by + 5); ctx.stroke();
            ctx.lineWidth = 4;
            ctx.beginPath(); ctx.moveTo(bx - d * 16, by - 13); ctx.lineTo(bx - d * 4, by - 19);
            ctx.lineTo(bx + d * 6, by - 13); ctx.stroke();
            // --- 3. thanh luoi + xich rang ---
            ctx.fillStyle = "#546E7A";
            ctx.beginPath();
            ctx.moveTo(bx + d * 8, by - 10); ctx.lineTo(bx + d * (banTay - 6), by - 7);
            ctx.lineTo(bx + d * banTay, by); ctx.lineTo(bx + d * (banTay - 6), by + 7);
            ctx.lineTo(bx + d * 8, by + 10); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#B0BEC5";
            ctx.fillRect(Math.min(bx + d*10, bx + d*(banTay-4)), by - 3, Math.abs(d*(banTay-14)), 6);
            /* Rang chi chay khi DANG CUA. Truoc day toi de toc idle 0.3 — nhin ra thanh cai cua
               tu no lach cach chay suot tran du nguoi choi khong bam gi, lam mat han cai khoanh
               khac bam J. Nay idle = 0 tuyet doi. */
            ctx.fillStyle = "#ECEFF1";
            let toc = dangCua ? 2.8 : 0, pha = toc ? ((frames * toc) % 8) : 0;
            for (let t = 0; t < 14; t++){
                let off = 10 + t * 8 + pha;
                if (off > banTay - 3) continue;
                let xx = bx + d * off;
                ctx.fillRect(xx - 1.5, by - 13, 3, 3);
                ctx.fillRect(xx - 1.5, by + 10, 3, 3);
            }
            // khoi xa khi dang cua
            if (dangCua && frames % 3 === 0)
                visualEffects.push(new Effect(bx - d * 20, by - 16, 'explosion', true, 6));
            /* --- vanh RO CUA --- bao quanh CA NGUOI CHOI chu khong phai mot vong nho tren
               dau: day la thanh tien trinh cua mot hanh dong dai 3 giay, no phai doc duoc
               bang duoi mat chu khong phai bang viec nhin cham chu. */
            if ((ng.cwRo || 0) > 0){
                let u = Math.min(1, ng.cwRo / CW_RO_XANH);
                let m = ng.cwRo >= CW_RO_XANH ? '#66BB6A' : (ng.cwRo >= CW_RO_VANG ? '#FFD54F' : '#EF5350');
                let ccx = ng.x + ng.w/2, ccy = ng.y + ng.h/2, R = CW_VE_VONG;
                ctx.save();
                ctx.globalAlpha = 0.30;
                ctx.strokeStyle = "#263238"; ctx.lineWidth = 9;
                ctx.beginPath(); ctx.arc(ccx, ccy, R, 0, 6.28); ctx.stroke();
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 12; ctx.shadowColor = m;
                ctx.strokeStyle = m; ctx.lineWidth = 8; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.arc(ccx, ccy, R, -Math.PI/2, -Math.PI/2 + 6.283 * u); ctx.stroke();
                ctx.lineCap = 'butt'; ctx.shadowBlur = 0;
                // hai vach moc: 1.5 giay va 3 giay
                for (let moc of [CW_RO_VANG / CW_RO_XANH, 1]){
                    let a = -Math.PI/2 + 6.283 * moc;
                    ctx.strokeStyle = "#FFFFFF"; ctx.globalAlpha = 0.75; ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(ccx + Math.cos(a) * (R - 7), ccy + Math.sin(a) * (R - 7));
                    ctx.lineTo(ccx + Math.cos(a) * (R + 7), ccy + Math.sin(a) * (R + 7));
                    ctx.stroke();
                }
                ctx.globalAlpha = 1;
                ctx.restore();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cwVeMot.1

// index.html:67020 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cwVe.1 EDITABLE
function cwVe(nguoi){
            if (!cusCwBat()) return;
            for (let k = 0; k < 2; k++){
                let ng = nguoi || ((k === 0) ? ((typeof dino !== 'undefined') ? dino : null)
                                             : ((typeof dino2 !== 'undefined') ? dino2 : null));
                if (!ng || ng.ammoType !== CUS_DAN){ if (nguoi) return; else continue; }
                cwVeMot(ng);
                // nhac nghi thuc nap khi da het xang
                if ((ng.cwNong || ng.cwNapSan) && ng.id === 1){
                    ctx.save();
                    ctx.globalAlpha = ng.cwNapSan ? 0.9 : (0.55 + 0.45 * Math.sin(frames * 0.12));
                    ctx.fillStyle = ng.cwNapSan ? "#8BC34A" : "#FFD54F";
                    ctx.font = "bold 11px Consolas, monospace";
                    ctx.textAlign = "center";
                    ctx.fillText(ng.cwNapSan ? "MÁY ĐANG NỔ — TỰ ĐỔ XĂNG" : "CÚI 3 LẦN ĐỂ ĐỀ MÁY",
                                 ng.x + ng.w/2, ng.y - 34);
                    ctx.textAlign = "left"; ctx.restore();
                }
                if (nguoi) return;
            }
        }
// PLAYER_PART_END s4.cwVe.1

// index.html:67044 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusToaNo.1 EDITABLE
function cusToaNo(proj, x, y){
            if (!proj) return;
            let so = proj.cusToaSo || CUS_TOA_SO;
            let tam = Math.max(40, canvas.width * (CUS_TOA_CM / 23));
            let pha = Math.random() * Math.PI * 2;
            for (let i = 0; i < so; i++){
                let a = (i / so) * Math.PI * 2 + pha;
                let cx = Math.cos(a), cy = Math.sin(a);
                let p = new Projectile(x, y, proj.dmg || 1, 5, 0, 0, (cx >= 0 ? 1 : -1), proj.owner || 1);
                p.speed = cx * CUS_TOA_TOC; p.vy = cy * CUS_TOA_TOC;
                p.cus = 1; p.cusLot = proj.cusLot;
                /* HOP VA CHAM nho, HINH VE to. Ban dau toi de ca hai o 0.55 co goc — chup
                   man hinh ra mot vet cham xam gan nhu khong thay gi. Phong len 0.9 thi nhin
                   duoc, nhung do lai: tren mot con boss 112x88 thi CA SAU vien deu trung,
                   thanh 7 sat thuong mot phat va nhanh nay vot len 8.6 dmg/giay — trong khi
                   Hans dat muc "trung them co 3 vien". Nen tach doi: hop va cham giu nho de
                   con so dung, con `_cusToaVe` chi phong to luc VE. */
                p.w = CUS_VIEN_W * 0.55; p.h = CUS_VIEN_H * 0.85; p._cusToaVe = 1.7;
                p._cusToaCon = 1; p._cusToaDi = 0; p._cusToaTam = tam;
                projectiles.push(p);
            }
            cusToaVong.push({ x: x, y: y, t: 0, tong: 14, r: tam * 0.5 });
            /* VET TIA — chi de NHIN. Sau vien con sinh ra ngay trong than boss thi bi an
               het mau ngay o khung dau roi bien mat, nen dau ai kip thay chum toa; ma keo
               dai tuoi tho cua chung ra de nhin cho ro thi mot so vien se bay ra khoi than
               boss va truot — tuc la bop so tia boss an, dung cai Hans khong muon. Nen tach
               han: sat thuong giu nguyen, con cai de nhin la sau vet ke nay. */
            let _tia = [];
            for (let i = 0; i < so; i++) _tia.push((i / so) * Math.PI * 2 + pha);
            cusToaTia.push({ x: x, y: y, goc: _tia, t: 0, tong: 12, dai: tam * 0.55 });
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(760, 0.06, 'square', 0.12, 1200);
        }
// PLAYER_PART_END s4.cusToaNo.1

// index.html:67080 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTTHom.1 EDITABLE
let cusTTHom = [], cusTTTruc = null, cusTTCd = 0;
// PLAYER_PART_END s4.cusTTHom.1

// index.html:67081 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTTRoi.1 EDITABLE
function cusTTRoi(x, y, du){
            if (cusTTHom.length > 8) return;                 // khong de rac chat san
            cusTTHom.push({ x: x - CUS_TT_HOMW/2, y: y, vy: du ? 0 : -2.2, du: du ? 1 : 0, t: 0 });
        }
// PLAYER_PART_END s4.cusTTRoi.1

// index.html:67085 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTTTick.1 EDITABLE
function cusTTTick(){
            if (typeof dino === 'undefined' || !dino) return;
            let cap = (typeof cusCapCua === 'function') ? cusCapCua('supply') : 0;
            if (cap <= 0){ if (cusTTHom.length) cusTTHom.length = 0; cusTTTruc = null; return; }
            if (gameState === 'pvp') return;
            // --- truc thang chi vien ---
            let nhip = CUS_TT_TRUC[cap] || 0;
            if (nhip > 0){
                if (!cusTTTruc){
                    /* GIU K thi dong ho goi truc thang chay NHANH GAP DOI — giu cang lau thi
                       hang toi cang som. Nhung neu dang trong Channel thi chi con MOT NUA
                       phan cong them (giay do da duoc tra cho Channel roi) — dung luat chia
                       phim K chung cho moi module. */
                    let _giuK = (typeof dino !== 'undefined' && dino && dino.aKeyHeldTime > 0);
                    if (_giuK) cusTTCd += (dino.cusCh ? 0.5 : 1);
                    if (++cusTTCd >= nhip){
                        cusTTCd = 0;
                        let T = (typeof worldL === 'function') ? worldL() : 0;
                        let P = (typeof worldR === 'function') ? worldR() : canvas.width;
                        cusTTTruc = { x: T - 90, y: 64, huong: 1, tha: T + (P - T) * (0.3 + Math.random() * 0.4), daTha: 0 };
                    }
                } else {
                    cusTTTruc.x += 4.2;
                    if (!cusTTTruc.daTha && cusTTTruc.x >= cusTTTruc.tha){ cusTTTruc.daTha = 1; cusTTRoi(cusTTTruc.x, cusTTTruc.y + 16, 1); }
                    let P = (typeof worldR === 'function') ? worldR() : canvas.width;
                    if (cusTTTruc.x > P + 110) cusTTTruc = null;
                }
            }
            // --- hom dan roi xuong dat, cham nguoi choi thi nhat ---
            for (let i = cusTTHom.length - 1; i >= 0; i--){
                let h = cusTTHom[i]; h.t++;
                h.vy += h.du ? 0.06 : 0.32;
                if (h.du) h.vy = Math.min(h.vy, 1.3);          // co du thi roi cham
                h.y += h.vy;
                if (h.y > 320 - CUS_TT_HOMH){ h.y = 320 - CUS_TT_HOMH; h.vy = 0; h.du = 0; }
                let hop = { x: h.x, y: h.y, w: CUS_TT_HOMW, h: CUS_TT_HOMH };
                if (checkAABB(hop, dino)){
                    dino.cusTTNap = Math.min(CUS_TT_TRAN, (dino.cusTTNap || 0) + 1);
                    if (cap >= 3 && dino.isOverheated){ dino.isOverheated = false; dino.overheatTimer = 0; dino.ammo = dino.maxAmmo; }
                    floatingTexts.push(new FloatingText(h.x - 18, h.y - 14, cap >= 3 ? "TIẾP TRỢ! HẾT NÓNG" : "TIẾP TRỢ!"));
                    visualEffects.push(new Effect(h.x + CUS_TT_HOMW/2, h.y + CUS_TT_HOMH/2, 'explosion', true, 16));
                    if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(880, 0.09, 'square', 0.18, 1400); SFX.tone(1320, 0.08, 'triangle', 0.14, 1800); }
                    cusTTHom.splice(i, 1); continue;
                }
                if (h.t > 1800) cusTTHom.splice(i, 1);         // 30 giay khong ai nhat thi tu mat
            }
        }
// PLAYER_PART_END s4.cusTTTick.1

// index.html:67132 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTTVe.1 EDITABLE
function cusTTVe(){
            if (cusTTTruc){
                /* Ban dau toi ve duoi va canh quat duoi o ben PHAI thân, trong khi truc thang
                   bay sang phai — thanh ra no bay LUI. Gio dung mot he toa do lat theo huong
                   bay: ve mot lan voi mui o ben phai, roi `scale(-1,1)` neu bay nguoc lai. */
                let T = cusTTTruc, cx = T.x, cy = T.y, hg = (T.huong >= 0 ? 1 : -1);
                ctx.save();
                ctx.translate(cx, cy); ctx.scale(hg, 1);
                // duoi keo ve PHIA SAU (ben trai trong he da lat)
                ctx.fillStyle = "#455A64"; ctx.fillRect(-50, -4, 26, 7);
                ctx.fillStyle = "#37474F";
                ctx.beginPath(); ctx.moveTo(-52, -16); ctx.lineTo(-44, -16); ctx.lineTo(-44, 2); ctx.lineTo(-52, 2); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "rgba(176,190,197,0.8)"; ctx.lineWidth = 1.5;
                let q2 = (frames % 4 < 2) ? 9 : 3;
                ctx.beginPath(); ctx.moveTo(-48, -8 - q2); ctx.lineTo(-48, -8 + q2); ctx.stroke();
                // than
                ctx.fillStyle = "#37474F";
                ctx.beginPath();
                ctx.moveTo(-26, -9); ctx.lineTo(16, -9); ctx.lineTo(26, -1); ctx.lineTo(24, 8);
                ctx.lineTo(-24, 8); ctx.closePath(); ctx.fill();
                // buong lai o MUI
                ctx.fillStyle = "#B3E5FC";
                ctx.beginPath(); ctx.moveTo(6, -7); ctx.lineTo(15, -7); ctx.lineTo(23, -1); ctx.lineTo(6, -1); ctx.closePath(); ctx.fill();
                // cang dap
                ctx.strokeStyle = "#263238"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(-16, 8); ctx.lineTo(-18, 15); ctx.moveTo(8, 8); ctx.lineTo(10, 15);
                ctx.moveTo(-22, 15); ctx.lineTo(14, 15); ctx.stroke();
                // truc va canh quat chinh
                ctx.fillStyle = "#263238"; ctx.fillRect(-4, -14, 5, 6);
                ctx.strokeStyle = "rgba(176,190,197,0.9)"; ctx.lineWidth = 2.5;
                let q = (frames % 6 < 3) ? 32 : 13;
                ctx.beginPath(); ctx.moveTo(-q, -14); ctx.lineTo(q, -14); ctx.stroke();
                ctx.restore();
            }
            for (let h of cusTTHom){
                let cx = h.x + CUS_TT_HOMW/2;
                ctx.save();
                if (h.du){
                    ctx.fillStyle = "rgba(255,241,118,0.85)";
                    ctx.beginPath(); ctx.arc(cx, h.y - 14, 17, Math.PI, 0); ctx.fill();
                    ctx.strokeStyle = "rgba(255,255,255,0.7)"; ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(cx - 15, h.y - 14); ctx.lineTo(cx - 5, h.y);
                    ctx.moveTo(cx + 15, h.y - 14); ctx.lineTo(cx + 5, h.y); ctx.stroke();
                }
                let nhay = (h.vy === 0 && frames % 40 < 20);
                ctx.fillStyle = nhay ? "#FFE082" : "#FBC02D";
                ctx.fillRect(h.x, h.y, CUS_TT_HOMW, CUS_TT_HOMH);
                ctx.fillStyle = "#6D4C41"; ctx.fillRect(h.x, h.y + CUS_TT_HOMH/2 - 2, CUS_TT_HOMW, 4);
                ctx.fillRect(h.x + CUS_TT_HOMW/2 - 2, h.y, 4, CUS_TT_HOMH);
                ctx.strokeStyle = "#8D6E63"; ctx.lineWidth = 1.5;
                ctx.strokeRect(h.x + 0.5, h.y + 0.5, CUS_TT_HOMW - 1, CUS_TT_HOMH - 1);
                ctx.restore();
            }
            // bieu tuong dan phao tren dau nguoi choi
            if (typeof dino !== 'undefined' && dino && (dino.cusTTNap || 0) > 0 && cusTTBat()){
                for (let i = 0; i < dino.cusTTNap; i++){
                    let bx = dino.x + dino.w/2 - (dino.cusTTNap - 1) * 7 + i * 14;
                    let by = dino.y - 16 + Math.sin(frames * 0.12 + i) * 2;
                    ctx.save();
                    ctx.fillStyle = "#FFD54F"; ctx.fillRect(bx - 4, by - 5, 8, 10);
                    ctx.fillStyle = "#FF7043";
                    ctx.beginPath(); ctx.moveTo(bx - 4, by - 5); ctx.lineTo(bx, by - 11); ctx.lineTo(bx + 4, by - 5); ctx.closePath(); ctx.fill();
                    ctx.restore();
                }
            }
        }
// PLAYER_PART_END s4.cusTTVe.1

// index.html:67208 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQN.1 EDITABLE
let cusQN = null;
// PLAYER_PART_END s4.cusQN.1

// index.html:67209 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUfo.1 EDITABLE
let cusUfo = null;
// PLAYER_PART_END s4.cusUfo.1

// index.html:67210 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTanChay.1 EDITABLE
let cusTanChay = [];
// PLAYER_PART_END s4.cusTanChay.1

// index.html:67213 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusChVao.1 EDITABLE
function cusChVao(ng){
            if (typeof cusKvBat === 'function' && cusKvBat()){ cusGbVao(ng); return; }   // @@HE-CUSGB
            if (typeof cusPtBat === 'function' && cusPtBat()){ cusTlVao(ng); return; }   // @@HE-CUSTL
            if (cusLap.ch === 'quanhiet'){
                let cap = cusChCap('quanhiet'); if (cap <= 0) return;
                cusQN = { muc: 1, t: 0, moc: CUS_QN_MOC[cap], ban: CUS_QN_CM };
                floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 34, "QUÁ NHIỆT!"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(160, 0.25, 'sawtooth', 0.20, 420);
            } else if (cusLap.ch === 'nuke'){
                if (cusChCap('nuke') <= 0) return;
                cusNkVao(ng);
            } else if (cusLap.ch === 'muaten'){       // @@HE-CUSMT
                if (cusChCap('muaten') <= 0) return;
                cusMtVao(ng);
            } else if (cusLap.ch === 'uzumaki'){      // @@HE-CUSUZ
                if (cusChCap('uzumaki') <= 0) return;
                if (cusUzu && cusUzu.pha === 'xa') return;   // vong truoc con dang tu phun
                cusUzVao(ng);
            } else if (cusLap.ch === 'ufo'){
                let cap = cusChCap('ufo'); if (cap <= 0) return;
                cusUfo = { x: ng.x + ng.w/2, y: -70, bx: ng.x + ng.w/2, by: -70,
                           ox: 0, oy: 0, jx: 0, jy: 0,
                           muc: null, t: 0, vao: 0, hut: null, roi: 0, du: 0 };
                floatingTexts.push(new FloatingText(ng.x - 20, ng.y - 34, "UFO!"));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(900, 0.30, 'sine', 0.16, 1700); SFX.tone(1400, 0.25, 'sine', 0.12, 700); }
            }
        }
// PLAYER_PART_END s4.cusChVao.1

// index.html:67244 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQNTan.1 EDITABLE
function cusQNTan(o){
            if (typeof bosses !== 'undefined' && bosses.indexOf(o) >= 0){ o._cusTan = 1; return; }
            cusTanChay.push({ x: o.x, y: o.y, w: (o.w || 24), h: (o.h || 24), t: 0, tong: 64 });
        }
// PLAYER_PART_END s4.cusQNTan.1

// index.html:67248 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUfoBat.1 EDITABLE
let cusUfoBat = 0, cusUfoHoiCd = 0;
// PLAYER_PART_END s4.cusUfoBat.1

// index.html:67251 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusChDem.1 EDITABLE
function cusChDem(){ if (cusUfoHoiCd > 0) cusUfoHoiCd--; }
// PLAYER_PART_END s4.cusChDem.1

// index.html:67252 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUfoHut.1 EDITABLE
function cusUfoHut(o){
            if (!cusUfo) return;
            // bat du 10 con thi hoi 1 mau, hoi chieu 20 giay
            cusUfoBat++;
            if (cusUfoBat >= CUS_UFO_BAT && cusUfoHoiCd <= 0 && typeof dino !== 'undefined' && dino){
                cusUfoBat -= CUS_UFO_BAT; cusUfoHoiCd = CUS_UFO_HOICD;
                if (dino.hp < dino.maxHp){
                    dino.hp = Math.min(dino.maxHp, dino.hp + 1);
                    floatingTexts.push(new FloatingText(dino.x - 30, dino.y - 44, "UFO: +1 MÁU"));
                    if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(1500, 0.16, 'sine', 0.18, 2400); SFX.tone(900, 0.12, 'triangle', 0.14, 1500); }
                } else floatingTexts.push(new FloatingText(dino.x - 34, dino.y - 44, "UFO: ĐÃ ĐẦY MÁU"));
            }
            if (typeof bosses !== 'undefined' && bosses.indexOf(o) >= 0){ o._cusHut = 1; return; }
            cusUfo.hut = { x: o.x, y: o.y, w: (o.w || 24), h: (o.h || 24), t: 0, tong: 44 };
        }
// PLAYER_PART_END s4.cusUfoHut.1

// index.html:67274 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_CH_HU_NHIP.1 EDITABLE
const CUS_CH_HU_NHIP = 12;
// PLAYER_PART_END s4.CUS_CH_HU_NHIP.1

// index.html:67275 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusChDanh.1 EDITABLE
function cusChDanh(o, dmg){
            if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0 || !(dmg > 0)) return;
            if (gameState === 'pvp'){ cusPvpDanh((typeof dino !== 'undefined') ? dino : null, o, dmg); return; }   // @@HE-PVPCUS
            let d = (typeof cusTangPT === 'function') ? cusTangPT(o, dmg) : dmg;
            if (typeof cusHieuUng === 'function' && frames - (o._cusChHU || -999) >= CUS_CH_HU_NHIP){
                o._cusChHU = frames; d += cusHieuUng(o, dmg);
            }
            if (typeof cusStandThu === 'function') cusStandThu(o, d, 'dan', 1);
            if (typeof dealDamage === 'function') dealDamage(o, d, 'flat'); else o.hp -= d;
            if (typeof cusCapCua === 'function' && cusCapCua('no') > 0 && typeof cusNoDat === 'function')
                cusNoDat(o.x + (o.w||20)/2, o.y + (o.h||20)/2);
        }
// PLAYER_PART_END s4.cusChDanh.1

// index.html:67287 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQNDanh.1 EDITABLE
function cusQNDanh(ds, dmg){
            for (let o of ds){
                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                let con = o.hp;
                cusChDanh(o, dmg);   // @@HE-CUSCHHU
                if (con > 0 && o.hp <= 0) cusQNTan(o);
            }
        }
// PLAYER_PART_END s4.cusQNDanh.1

// index.html:67295 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusChTick.1 EDITABLE
function cusChTick(ng){
            if (cusGb && cusGb.giu) { cusGbGiu(ng); return; }     // @@HE-CUSGB
            if (cusTl && cusTl.giu) return;                          // @@HE-CUSTL: phi tieu tu bay trong cusTlTick
            if (cusMt && cusMt.giu) { cusMtGiu(ng); return; }     // @@HE-CUSMT
            if (cusUzu && cusUzu.giu) { cusUzGiu(ng); return; }   // @@HE-CUSUZ
            if (cusNuke) { cusNkTickDem(ng); return; }
            if (cusUfo) { cusUfoTick(ng); return; }
            if (!cusQN) return;
            cusQN.t++;
            if (cusQN.t % 60 === 0){
                // leo thang: x2 toi moc, sau do x1.5
                cusQN.muc = (cusQN.muc < cusQN.moc)
                          ? Math.min(cusQN.moc, cusQN.muc * 2)
                          : Math.round(cusQN.muc * 1.5);
                cusQN.ban += CUS_QN_NO;          // moi lan nhiet tang thi quang rong them 0.5cm
                // quang nhiet dot trong ban kinh hien tai
                if (gameState !== 'pvp' && typeof allTargets === 'function'){
                    let R = Math.max(40, canvas.width * (cusQN.ban / 23));
                    let cx = ng.x + ng.w/2, cy = ng.y + ng.h/2;
                    let ds = allTargets().filter(o => o && o.hp > 0 &&
                        Math.hypot((o.x + (o.w||20)/2) - cx, (o.y + (o.h||20)/2) - cy) <= R + (o.w||20)/2);
                    cusQNDanh(ds, cusQN.muc);
                }
                shakeTimer = Math.max(shakeTimer, 6);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(120 + cusQN.muc * 4, 0.10, 'sawtooth', 0.14, 300);
            }
        }
// PLAYER_PART_END s4.cusChTick.1

// index.html:67330 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUfoChon.1 EDITABLE
function cusUfoChon(ng){
            if (gameState === 'pvp') return (typeof pvpDich === 'function') ? pvpDich(ng) : null;
            let ds = [];
            if (typeof bosses !== 'undefined') for (let b of bosses) ds.push(b);
            if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
            if (typeof defMode !== 'undefined' && defMode && typeof defUnits !== 'undefined')
                for (let u of defUnits) if (u.ben === 'e' && u.hp > 0) ds.push(u);
            let cx = ng.x + ng.w/2, cy = ng.y + ng.h/2;
            let huong = ng.isFacingLeft ? -1 : 1;
            let truoc = null, dT = 1e9, batKy = null, dB = 1e9;
            for (let o of ds){
                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                let ox = o.x + (o.w||20)/2, oy = o.y + (o.h||20)/2;
                let d = Math.hypot(ox - cx, oy - cy);
                if (d < dB){ dB = d; batKy = o; }
                if ((ox - cx) * huong >= -24 && d < dT){ dT = d; truoc = o; }
            }
            return truoc || batKy;
        }
// PLAYER_PART_END s4.cusUfoChon.1

// index.html:67349 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusUfoTick.1 EDITABLE
function cusUfoTick(ng){
            let U = cusUfo; if (!U) return;
            U.t++;
            if (U.vao < CUS_UFO_VAO){ U.vao++; }
            let cap = cusChCap('ufo');
            if (!U.muc || U.muc.hp === undefined || U.muc.hp <= 0 || U.muc.invulnAll)
                U.muc = cusUfoChon(ng);
            /* DI CHUYEN "NHON NHON". Truoc day toi lerp thang toi dich nen no truot muot mot
               duong — nhin nhu mot cai bong bay chu khong phai dia bay. Gio tach lam hai:
               mot diem NEO di chuyen cham va deu, cong mot do lech NHAY GIAT doi cho moi 14
               khung roi giat toi cho moi trong vai khung. Va khi KHONG con muc tieu nao thi
               no DUNG YEN nhun tai cho, khong bay ve tren dau nguoi choi nua. */
            let cao = canvas.width * (CUS_UFO_CAO / 23);
            let tx = U.muc ? (U.muc.x + (U.muc.w||20)/2) : U.bx;
            let ty = U.muc ? Math.max(24, U.muc.y - cao) : U.by;
            U.bx += (tx - U.bx) * 0.05;
            U.by += (ty - U.by) * 0.05;
            if (U.t % CUS_UFO_NHUN === 0){
                U.ox = (Math.random() - 0.5) * 22;
                U.oy = (Math.random() - 0.5) * 12;
            }
            U.jx += (U.ox - U.jx) * 0.34;
            U.jy += (U.oy - U.jy) * 0.34;
            U.x = U.bx + U.jx;
            U.y = U.by + U.jy + Math.sin(U.t * 0.07) * 3;
            /* MAY HUT: nhieu nhip nho moi giay chu khong phai mot cuc. Phan le duoc giu lai
               trong `U.du` roi cong don sang nhip sau, nen tong moi giay van dung 4 / 6 / 8
               ma sat thuong ra van la so nguyen. */
            if (U.muc && U.vao >= CUS_UFO_VAO && U.t % CUS_UFO_NHIP === 0){
                U.du = (U.du || 0) + (CUS_UFO_DMG[cap] || 4) * CUS_UFO_NHIP / 60;
                let dmg = Math.floor(U.du);
                if (dmg > 0){
                    U.du -= dmg;
                    let con = U.muc.hp;
                    cusChDanh(U.muc, dmg);   // @@HE-CUSCHHU
                    if (con > 0 && U.muc.hp !== undefined && U.muc.hp <= 0){ cusUfoHut(U.muc); U.muc = null; U.du = 0; }
                }
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1150 + Math.random() * 200, 0.05, 'sine', 0.08, 2100);
            }
            if (U.hut){ U.hut.t++; if (U.hut.t > U.hut.tong) U.hut = null; }
        }
// PLAYER_PART_END s4.cusUfoTick.1

// index.html:67409 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_NK_DEM.1 EDITABLE
const CUS_NK_DEM  = 600;
// PLAYER_PART_END s4.CUS_NK_DEM.1

// index.html:67410 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_NK_PHIM.1 EDITABLE
const CUS_NK_PHIM = 420;
// PLAYER_PART_END s4.CUS_NK_PHIM.1

// index.html:67411 · Phạm vi: global
// PLAYER_PART_BEGIN s4.NK_KHOAN.1 EDITABLE
const NK_KHOAN = 14;
// PLAYER_PART_END s4.NK_KHOAN.1

// index.html:67412 · Phạm vi: global
// PLAYER_PART_BEGIN s4.NK_CHUI.1 EDITABLE
const NK_CHUI  = 104;
// PLAYER_PART_END s4.NK_CHUI.1

// index.html:67413 · Phạm vi: global
// PLAYER_PART_BEGIN s4.NK_CUA.1 EDITABLE
const NK_CUA   = 132;
// PLAYER_PART_END s4.NK_CUA.1

// index.html:67414 · Phạm vi: global
// PLAYER_PART_BEGIN s4.NK_THA.1 EDITABLE
const NK_THA   = 192;
// PLAYER_PART_END s4.NK_THA.1

// index.html:67415 · Phạm vi: global
// PLAYER_PART_BEGIN s4.NK_NO.1 EDITABLE
const NK_NO    = 258;
// PLAYER_PART_END s4.NK_NO.1

// index.html:67416 · Phạm vi: global
// PLAYER_PART_BEGIN s4.NK_TAULEN.1 EDITABLE
const NK_TAULEN= 296;
// PLAYER_PART_END s4.NK_TAULEN.1

// index.html:67417 · Phạm vi: global
// PLAYER_PART_BEGIN s4.NK_LEN.1 EDITABLE
const NK_LEN   = 360;
// PLAYER_PART_END s4.NK_LEN.1

// index.html:67418 · Phạm vi: global
// PLAYER_PART_BEGIN s4.NK_RA.1 EDITABLE
const NK_RA    = 402;
// PLAYER_PART_END s4.NK_RA.1

// index.html:67419 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNuke.1 EDITABLE
let cusNuke = null;
// PLAYER_PART_END s4.cusNuke.1

// index.html:67420 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkPhim.1 EDITABLE
let cusNkPhim = null;
// PLAYER_PART_END s4.cusNkPhim.1

// index.html:67421 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKhoan.1 EDITABLE
let cusKhoan = null;
// PLAYER_PART_END s4.cusKhoan.1

// index.html:67422 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkTat.1 EDITABLE
let cusNkTat = 0;
// PLAYER_PART_END s4.cusNkTat.1

// index.html:67423 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkTatSo.1 EDITABLE
let cusNkTatSo = 0;
// PLAYER_PART_END s4.cusNkTatSo.1

// index.html:67425 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkDat.1 EDITABLE
function cusNkDat(){
            if (typeof dino !== 'undefined' && dino && dino.baseY !== undefined) return dino.baseY + dino.h;
            return 320;
        }
// PLAYER_PART_END s4.cusNkDat.1

// index.html:67429 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkVao.1 EDITABLE
function cusNkVao(ng){
            cusNuke = { t: 0 };
            floatingTexts.push(new FloatingText(ng.x - 44, ng.y - 34, "ĐẾM NGƯỢC 10..."));
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(180, 0.18, 'square', 0.16, 180);
        }
// PLAYER_PART_END s4.cusNkVao.1

// index.html:67434 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkTickDem.1 EDITABLE
function cusNkTickDem(ng){
            let N = cusNuke; if (!N) return;
            N.t++;
            let con = Math.ceil((CUS_NK_DEM - N.t) / 60);
            // KHONG ban so len dau nguoi choi nua: bang dem giua man hinh da lo viec do,
            // hai cho cung dem mot thu thi chi lam roi mat.
            if (N.t % 60 === 0 && con > 0 && typeof SFX !== 'undefined' && SFX.tone)
                SFX.tone(520 + (10 - con) * 40, 0.09, 'square', 0.16, 520);
            if (N.t >= CUS_NK_DEM) cusNkBatDau(ng);
        }
// PLAYER_PART_END s4.cusNkTickDem.1

// index.html:67447 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkBatDau.1 EDITABLE
function cusNkBatDau(ng){
            cusNuke = null; cusNkTat = 0;
            ng.cusCh = 0; ng.aKeyHeldTime = 0; ng.chargeProgress = 0;
            cusKhoan = null;
            /* Tam tha bom lay GIUA MAN HINH chu khong phai toa do nguoi choi: nham thang
               dau minh thi ca canh phim bi don ve mot goc, ma nguoi choi thi dang o duoi
               dat nen chang co ly do gi de quy chieu theo no. `nguoiX` giu rieng cho cai
               ho va cai may khoan. */
            let _giua = ((typeof camX !== 'undefined') ? camX : 0) + canvas.width / 2;
            cusNkPhim = { t: 0, x: _giua, dat: cusNkDat(), no: 0, chop: 0,
                          nguoiX: ng.x, nguoiY: ng.y };
            floatingTexts.push(new FloatingText(ng.x - 60, ng.y - 54, "BOM NGUYÊN TỬ!"));
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(70, 1.4, 'sawtooth', 0.24, 42); SFX.tone(140, 0.9, 'square', 0.14, 90); }
        }
// PLAYER_PART_END s4.cusNkBatDau.1

// index.html:67463 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkGiuNguoi.1 EDITABLE
function cusNkGiuNguoi(ng){
            if (!cusNkPhim || !ng || ng.id !== 1) return false;
            let P = cusNkPhim;
            ng.dy = 0; ng.grounded = true;
            if (typeof dashVx !== 'undefined') dashVx = 0;
            // an than nguoi choi tu luc may khoan dong nap toi luc no nhay ra
            ng._cusNkAn = (P.t >= NK_KHOAN && P.t < NK_RA) ? 1 : 0;
            if (P.t >= NK_RA){
                /* NHAY RA SANG MOT BEN. Ban dau toi cho no nhay THANG LEN tai cho, ma may
                   khoan lai duoc ve SAU nguoi choi — thanh ra cu nhay bi chinh cai may khoan
                   che kin, nhin nhu nguoi choi khong he tro ra. Va bo `invincible` o day
                   luon: giu bat tu thi than nguoi choi nhap nhay nua khung, dung cai khung
                   quan trong nhat cua ca doan phim.  */
                /* Va phai XOA han khung mien thuong o day. Giu lai thi `Player.draw()` cho
                   than nguoi choi nhap nhay (`invincible && frames%10<5` thi khong ve) —
                   dung cu nhay ra khoi may khoan, tuc cai khung dang xem nhat, bi mat mot
                   nua so khung. Man hinh vua bi xoa sach nen khong con gi de do ca.
                   Rieng PvP thi doi thu van song, giu nguyen mien thuong. */
                if (gameState !== 'pvp'){ ng.invincible = false; ng.invTimer = 0; }
                let u = Math.min(1, (P.t - NK_RA) / (CUS_NK_PHIM - NK_RA));
                ng.x = P.nguoiX + 46 * u;
                ng.y = P.nguoiY - Math.sin(u * Math.PI) * 36;
                ng.isFacingLeft = false;
            } else {
                ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 20);
                ng.x = P.nguoiX; ng.y = P.nguoiY;
            }
            return true;
        }
// PLAYER_PART_END s4.cusNkGiuNguoi.1

// index.html:67501 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkNo.1 EDITABLE
function cusNkNo(){
            let P = cusNkPhim; if (!P) return;
            P.no = 1; P.chop = 1;
            shakeTimer = Math.max(shakeTimer || 0, 110);
            if (typeof SFX !== 'undefined' && SFX.tone){
                SFX.tone(40, 2.2, 'sawtooth', 0.42, 18); SFX.tone(90, 1.6, 'square', 0.30, 30);
                SFX.tone(220, 1.0, 'triangle', 0.18, 60);
            }
            if (typeof bossProjectiles !== 'undefined') bossProjectiles.length = 0;
            if (gameState === 'pvp'){
                /* Hans chot: PvP an Y HET PvE, KHONG khoa tran. Ban truoc toi tu dat mot
                   tran 34% mau toi da vi so no thanh nut thang — nhung gia cua no da la
                   giu K tron 10 giay khong duoc ban va khong duoc an mot don nao, va o PvP
                   thi doi thu co du 10 giay do de pha. Ai de bi dem het 10 giay thi thua la
                   dung. Danh thang vao `hp` chu khong qua `takeDamage`, de khien / khung
                   mien thuong / giap khong chan duoc — dung nghia "khong co khoa tran". */
                let d = (typeof pvpDich === 'function') ? pvpDich(dino) : null;
                if (d){ d.hp = 0; d._pvpLe = 0; }
                return;
            }
            if (typeof projectiles !== 'undefined') projectiles.length = 0;
            if (typeof bosses !== 'undefined') for (let b of bosses){
                if (!b || b.dying) continue;
                b.hp = 0; b.dying = true; b.deathTimer = 0;
                if (typeof SFX !== 'undefined' && SFX.bossExplode) SFX.bossExplode();
            }
            let ds = [];
            if (typeof enemies !== 'undefined') for (let e of enemies) ds.push(e);
            if (typeof defMode !== 'undefined' && defMode && typeof defUnits !== 'undefined')
                for (let u of defUnits) if (u.ben === 'e') ds.push(u);
            for (let o of ds){
                if (!o || o.hp === undefined || o.hp <= 0 || o.dying) continue;
                let xong = (typeof dealDamage === 'function') && dealDamage(o, 999999, 'flat');
                if (!xong) o.hp = 0;          // con dang bat tu / do don thi ep chet thang
            }
            if (typeof obstacles !== 'undefined') for (let i = obstacles.length - 1; i >= 0; i--){
                let ob = obstacles[i];
                if (typeof visualEffects !== 'undefined' && typeof Effect === 'function')
                    visualEffects.push(new Effect(ob.x + (ob.w||20)/2, ob.y + (ob.h||20)/2, 'explosion', true, 26));
                obstacles.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.cusNkNo.1

// index.html:67543 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkTick.1 EDITABLE
function cusNkTick(){
            if (cusNkTat > 0) cusNkTat--;
            // may khoan bi bo lai: map chay tiep thi no troi ra sau roi mat ngoai man hinh
            if (cusKhoan){
                cusKhoan.t++;
                if (typeof gameSpeed !== 'undefined' && gameState !== 'pvp') cusKhoan.x -= gameSpeed;
                if (cusKhoan.x < -160 || cusKhoan.t > 3600) cusKhoan = null;
            }
            let P = cusNkPhim; if (!P) return;
            // CUA THOAT: cu no co the ha con boss cuoi cua man, keo theo ca man chuyen canh.
            // Mat dino hoac doi che do thi tra quyen dieu khien ngay, dung de nguoi choi ket.
            /* 'menu' cung nam trong danh sach: SAN TAP chay bang chinh gameState do va la
               cho nguoi choi thu chieu, bo no ra thi khong ai thu duoc module nay. */
            if (typeof dino === 'undefined' || !dino ||
                (gameState !== 'normal' && gameState !== 'boss_rush' && gameState !== 'test_boss'
                 && gameState !== 'pvp' && gameState !== 'menu')){
                cusNkDon(); return;
            }
            P.t++;
            if (P.t === NK_NO) cusNkNo();
            if (P.chop > 0) P.chop++;
            if (P.t === NK_RA){
                // nhay ra khoi may khoan; may khoan o lai tai cho
                // dung do cao ma may khoan dang co o khung cuoi cua doan chui len, neu khong
                // no tut xuong 46px dung khung nguoi choi nhay ra.
                cusKhoan = { x: P.nguoiX + 16, y: P.dat - 34 * 1.35, t: 0 };
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(420, 0.12, 'square', 0.14, 700);
            }
            if (P.t >= CUS_NK_PHIM) cusNkDon();
        }
// PLAYER_PART_END s4.cusNkTick.1

// index.html:67573 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkDon.1 EDITABLE
function cusNkDon(){
            cusNkPhim = null;
            if (typeof dino !== 'undefined' && dino){ dino._cusNkAn = 0; dino.cusCh = 0; }
        }
// PLAYER_PART_END s4.cusNkDon.1

// index.html:67579 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusNkVeMayKhoan.1 EDITABLE
function cusNkVeMayKhoan(cx, cy, t, sc, mo){
            // may khoan chui dat: mui non xoay o DUOI, than ngan, vanh dai o tren
            ctx.save();
            ctx.globalAlpha = (mo === undefined) ? 1 : mo;
            let R = 17 * sc, L = 34 * sc, TH = 30 * sc;
            // than
            let g = ctx.createLinearGradient(cx - R, 0, cx + R, 0);
            g.addColorStop(0, "#455A64"); g.addColorStop(0.45, "#CFD8DC"); g.addColorStop(1, "#546E7A");
            ctx.fillStyle = g;
            ctx.fillRect(cx - R, cy - TH, R * 2, TH);
            ctx.strokeStyle = "#263238"; ctx.lineWidth = 2 * sc;
            ctx.strokeRect(cx - R, cy - TH, R * 2, TH);
            // vanh cao su den
            ctx.fillStyle = "#212121";
            ctx.fillRect(cx - R - 2 * sc, cy - TH + 5 * sc, R * 2 + 4 * sc, 5 * sc);
            // kinh buong lai
            ctx.fillStyle = "#4FC3F7"; ctx.globalAlpha = (mo === undefined ? 1 : mo) * 0.9;
            ctx.beginPath(); ctx.ellipse(cx, cy - TH + 17 * sc, R * 0.52, 6 * sc, 0, 0, 6.28); ctx.fill();
            ctx.globalAlpha = (mo === undefined) ? 1 : mo;
            // mui khoan hinh non huong XUONG, van xoan chay theo t
            let gk = ctx.createLinearGradient(cx - R, cy, cx + R, cy + L);
            gk.addColorStop(0, "#8FA3B4"); gk.addColorStop(0.55, "#ECEFF1"); gk.addColorStop(1, "#B0BEC5");
            ctx.beginPath();
            ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.lineTo(cx, cy + L);
            ctx.closePath(); ctx.fillStyle = gk; ctx.fill();
            ctx.strokeStyle = "#37474F"; ctx.lineWidth = 2 * sc; ctx.stroke();
            ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 2 * sc; ctx.globalAlpha = (mo === undefined ? 1 : mo) * 0.8;
            for (let i = 0; i < 4; i++){
                let u = ((i / 4) + (t * 0.06 % 1)) % 1;
                let yy = cy + L * u, rr = R * (1 - u);
                ctx.beginPath();
                ctx.moveTo(cx - rr, yy);
                ctx.quadraticCurveTo(cx, yy + 8 * sc, cx + rr, yy);
                ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cusNkVeMayKhoan.1
