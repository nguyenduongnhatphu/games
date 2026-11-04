// PLAYER_FILE: DAIKIEM05
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: BZ_LH_HP_MIN, BZ_NAP, DK_CHAY, DK_CHAY_BUFF, DK_CHAY_DAT, DK_DAN, DK_DA_N, DK_JC_DMG, DK_JC_HUT, DK_JC_K, Effect, FloatingText, LT, SFX, bzBat, bzKenBat, canvas, combatStance, ctx, dealDamage, dino, dkBatDau, dkChu, dkCua, dkDungYen, dkEm, dkNangLuong, dkNhaK, dkParry, dkTick, dkUltBat, dkVeKiem, dkVeTrenNguoi, floatingTexts, hasRune, hitDat, shakeTimer, ultCharge, uniTargets, venKhoa, visualEffects, vkDangKy, worldCX, worldL, worldR
// index.html:76221 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkVeUlt.1 EDITABLE
function dkVeUlt(ng, U){
            if (U && U.bz) return;
            let f = U.t;
            ctx.save();
            // pha 1: vet chem trang tim ca man + mat dat nut
            if (f >= 14 && f < 44){
                let a = 1 - Math.abs(f - 22) / 22;
                ctx.globalCompositeOperation = 'lighter';
                ctx.strokeStyle = "rgba(235,225,255," + Math.max(0, a).toFixed(2) + ")"; ctx.lineWidth = 16; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.ellipse(worldCX(), 250, canvas.width * 0.55, 60, 0, Math.PI * 1.05, Math.PI * 1.95, true); ctx.stroke();
                ctx.strokeStyle = "rgba(179,136,255," + Math.max(0, a * 0.7).toFixed(2) + ")"; ctx.lineWidth = 34;
                ctx.beginPath(); ctx.ellipse(worldCX(), 250, canvas.width * 0.55, 60, 0, Math.PI * 1.05, Math.PI * 1.95, true); ctx.stroke();
                ctx.globalCompositeOperation = 'source-over';
            }
            if (f >= 20){
                let a = f < 180 ? 1 : Math.max(0, 1 - (f - 180) / 20);
                ctx.strokeStyle = "rgba(40,20,60," + (0.8 * a).toFixed(2) + ")"; ctx.lineWidth = 3;
                for (const N of U.nut){
                    let G = U.nenY || 320;
                    ctx.beginPath(); ctx.moveTo(N.x, G);
                    ctx.lineTo(N.x + 8 - N.s * 16, G + N.l * 0.3); ctx.lineTo(N.x - 6 + N.s * 10, G + N.l * 0.6); ctx.lineTo(N.x + 4, G + N.l); ctx.stroke();
                    ctx.strokeStyle = "rgba(179,136,255," + (0.5 * a).toFixed(2) + ")"; ctx.lineWidth = 1.2;
                    ctx.beginPath(); ctx.moveTo(N.x, G); ctx.lineTo(N.x + 8 - N.s * 16, G + N.l * 0.3); ctx.stroke();
                    ctx.strokeStyle = "rgba(40,20,60," + (0.8 * a).toFixed(2) + ")"; ctx.lineWidth = 3;
                }
            }
            // pha 2: kiem bay, set, hao quang tu, qua cau
            if (f >= 36 && f < 168){
                let mo = Math.min(1, (f - 36) / 30);
                ctx.globalCompositeOperation = 'lighter';
                let g = ctx.createRadialGradient(U.kx, U.ky, 4, U.kx, U.ky, 120);
                g.addColorStop(0, "rgba(179,136,255," + (0.55 * mo).toFixed(2) + ")"); g.addColorStop(1, "rgba(124,77,255,0)");
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(U.kx, U.ky, 120, 0, Math.PI * 2); ctx.fill();
                // vong tu truong
                ctx.strokeStyle = "rgba(200,170,255," + (0.5 * mo).toFixed(2) + ")"; ctx.lineWidth = 2;
                for (let k = 0; k < 3; k++){ ctx.beginPath(); ctx.ellipse(U.kx, U.ky + 40, 60 + k * 26 + Math.sin(f * 0.2 + k) * 6, 14 + k * 6, 0, 0, Math.PI * 2); ctx.stroke(); }
                // set
                if (f % 3 === 0 || f % 7 === 0){
                    ctx.strokeStyle = "rgba(230,220,255,0.9)"; ctx.lineWidth = 2;
                    for (let k = 0; k < 3; k++){
                        let ax = U.kx, ay = U.ky, gx = U.kx + (Math.random() - 0.5) * 300, gy = U.ky + 40 + Math.random() * 160;
                        ctx.beginPath(); ctx.moveTo(ax, ay);
                        for (let s = 1; s <= 5; s++) ctx.lineTo(ax + (gx - ax) * s / 5 + (Math.random() - 0.5) * 18, ay + (gy - ay) * s / 5 + (Math.random() - 0.5) * 18);
                        ctx.stroke();
                    }
                }
                ctx.globalCompositeOperation = 'source-over';
                // qua cau da + ke dich
                if (f >= 70){
                    let R = 26 + Math.min(40, (f - 70) * 0.5);
                    let gq = ctx.createRadialGradient(U.kx - R * 0.3, U.qy - R * 0.3, 4, U.kx, U.qy, R);
                    gq.addColorStop(0, "#8D6E63"); gq.addColorStop(0.7, "#4E342E"); gq.addColorStop(1, "#311B92");
                    ctx.fillStyle = gq; ctx.beginPath(); ctx.arc(U.kx, U.qy, R, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = "rgba(179,136,255,0.8)"; ctx.lineWidth = 2; ctx.stroke();
                }
                ctx.fillStyle = "#6D4C41";
                for (const r of U.da){ ctx.save(); ctx.translate(r.x, r.y); ctx.rotate(r.a); ctx.fillRect(-r.r, -r.r * 0.7, r.r * 2, r.r * 1.4); ctx.restore(); }
                // kiem: mui chui xuong
                ctx.save(); ctx.translate(U.kx, U.ky); ctx.rotate(Math.PI + (f < 70 ? (70 - f) * 0.18 : 0)); ctx.scale(1.5, 1.5);
                dkVeKiem("#B388FF"); ctx.restore();
            }
            // vu no
            if (U.no && U.no.t < 32){
                let u = U.no.t / 32, R = 40 + 360 * dkEm(u, 'out');
                ctx.globalCompositeOperation = 'lighter';
                let g = ctx.createRadialGradient(U.no.x, U.no.y, 0, U.no.x, U.no.y, R);
                g.addColorStop(0, "rgba(255,255,255," + (0.9 * (1 - u)).toFixed(2) + ")");
                g.addColorStop(0.4, "rgba(179,136,255," + (0.7 * (1 - u)).toFixed(2) + ")");
                g.addColorStop(1, "rgba(124,77,255,0)");
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(U.no.x, U.no.y, R, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = "rgba(224,210,255," + (1 - u).toFixed(2) + ")"; ctx.lineWidth = 6;
                ctx.beginPath(); ctx.ellipse(U.no.x, U.no.y + 20, R * 1.3, 18, 0, 0, Math.PI * 2); ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.dkVeUlt.1

// index.html:76298 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkUni.1 EDITABLE
var dkUni = null;
// PLAYER_PART_END s4.dkUni.1

// index.html:76299 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkUniBat.1 EDITABLE
function dkUniBat(){
            let L2 = (typeof worldL === 'function') ? worldL() : 0;
            let R2 = (typeof worldR === 'function') ? worldR() : canvas.width;
            dkUni = { x: (L2 + R2) / 2, y: 320, t: 0, T: 130, hit: false };
            floatingTexts.push(new FloatingText((typeof dino !== 'undefined' && dino ? dino.x : dkUni.x) - 40,
                (typeof dino !== 'undefined' && dino ? dino.y : 200) - 74, LT("ĐẠI KIẾM TRẤN!", "GREATSWORD PIN!")));
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(90, 0.4, 'sawtooth', 0.28, 40);
        }
// PLAYER_PART_END s4.dkUniBat.1

// index.html:76307 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dkUniTick.1 EDITABLE
function dkUniTick(){
            let Gk = dkUni; if (!Gk) return;
            Gk.t++;
            if (!Gk.hit && Gk.t >= 16){
                Gk.hit = true;
                shakeTimer = Math.max(shakeTimer, 20);
                let ds = (typeof uniTargets === 'function') ? uniTargets() : [];
                for (let o of ds){
                    if (!o || o.hp <= 0 || o.invulnAll) continue;
                    let chan = o.y + (o.h || 20);
                    let bay = !o.grounded || chan < Gk.y - 16;
                    if (typeof dealDamage === 'function') dealDamage(o, 5, 'flat'); else o.hp -= 5;
                    let khoa = 120;
                    if (bay){
                        if (typeof dealDamage === 'function') dealDamage(o, 5, 'flat'); else o.hp -= 5;
                        o.y = Gk.y - (o.h || 20); o.dy = 0; if (o.vy !== undefined) o.vy = 0; o.grounded = true;
                        khoa = 240;
                    }
                    if (typeof venKhoa === 'function') venKhoa(o, khoa);
                    else o._uFreeze = Math.max(o._uFreeze || 0, khoa);
                }
            }
            ctx.save();
            let roi = Math.min(1, Gk.t / 14);
            ctx.translate(Gk.x, 92);
            ctx.rotate(Math.PI);
            ctx.scale(2.05, 2.05 * (0.55 + 0.45 * roi));
            dkVeKiem("#B388FF", 1, false);
            ctx.restore();
            ctx.save();
            ctx.globalAlpha = 0.35 * (1 - Math.min(1, Gk.t / Gk.T));
            ctx.fillStyle = "#7C4DFF";
            ctx.beginPath(); ctx.ellipse(Gk.x, Gk.y - 4, 70, 16, 0, 0, 6.28); ctx.fill();
            ctx.restore();
            if (Gk.t > Gk.T) dkUni = null;
        }
// PLAYER_PART_END s4.dkUniTick.1

// index.html:76345 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.21 EDITABLE
vkDangKy(DK_DAN, {
            ten: 'DAI KIEM',
            mauUlt: '#B388FF',
            theLuc(){ return (typeof hasRune === 'function' && hasRune('berserk')) ? 6 : 3; },
            sacToiDa: 180,
            slamTo: 1.4,
            nhipHoi: 26,
            // J: khong qua banJ — dkTick (moiKhung) tu bat canh len cua J vi kiem co hai trang thai
            moiKhung(checkAmmo, fireKey, chargeKey, crouchKey){ dkTick(this, fireKey, chargeKey, crouchKey); },
            nhaK(){ dkNhaK(this); },
            channelRieng(chargeKey){
                if (bzBat(this)){
                    let dk = dkCua(this);
                    if ((dk._kenBao || 0) > 0) dk._kenBao--;
                    if (chargeKey && this.aKeyHeldTime >= 180) bzKenBat(this);
                    return;
                }
                let dk = dkCua(this);
                if (chargeKey && combatStance === 0 && this.aKeyHeldTime >= 180 && !dk.kenh && !dk.A && !dk.ult && !this.isOverheated){
                    dkBatDau(this, 'kenh');
                    dkChu(this.x - 26, this.y - 40, "ĐỊA CHẤN ẤN", "QUAKE SEAL");
                }
            },
            // Lo Lung: bo xuong tu tren cao 9
            hoverSac(half){
                if (bzBat(this)) return;
                let dk = dkCua(this);
                if (dk.A || dk.ult) return;
                dk.trang = 'lung';
                dkBatDau(this, 'roi', { dmg: 9 });
            },
            batUlt(){
                if (dkUltBat(this)){
                    ultCharge = 0;
                    this.aKeyHeldTime = 0; this.chargeProgress = 0;
                    shakeTimer = Math.max(shakeTimer, 20);
                }
            },
            heSoChay(mv){
                let dk = this.dk; if (!dk) return mv * DK_CHAY;
                if (bzBat(this)){
                    if (dkDungYen(dk)) return 0;
                    if (dk.A && dk.A.m && dk.A.m.cua) return mv;
                    if (dk.A && dk.A.m.dmg > 0 && dk.A.t < dk.A.hit) return mv * 0.72;
                    return mv;
                }
                if (dkDungYen(dk)) return 0;
                if (dk.A && dk.A.kieu === 'nhayDap' && dk.A.ph >= 1 && dk.A.ph <= 3) return mv * (dk.A.ph === 3 ? 0.75 : 1.0);   // A / D chon cho dap
                if (dk.A && dk.A.m.dmg > 0 && dk.A.t < dk.A.T) return mv * 0.4;
                if (dk.trang === 'dat') return mv * (dk.buff > 0 ? 0.8 : DK_CHAY_DAT);
                return mv * (dk.buff > 0 ? DK_CHAY_BUFF : DK_CHAY);
            },
            anDon(){
                if (dkParry(this)){
                    visualEffects.push(new Effect(this.x + (this.isFacingLeft ? 0 : this.w), this.y, 'parry', this.isFacingLeft));
                    dkChu(this.x - 20, this.y - 34, "PARRY!", "PARRY!");
                    this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, 20);
                    return true;
                }
                return false;
            },
            slamDuoi(ix, iy, to){
                hitDat(ix, iy, 1, [179, 136, 255]);
                shakeTimer = Math.max(shakeTimer, to ? 22 : 14);
            },
            veTrenNguoi(x, y, P){ dkVeTrenNguoi(this, x, y); },
            veHudThem(){
                let dk = this.dk; if (!dk) return;
                const HX = 300;                                                    // cot trang thai nam BEN PHAI cac thanh HUD (truoc day x = 140 de len thanh Khien / Ultimate)
                ctx.font = "bold 12px Consolas, monospace";
                ctx.fillStyle = dk.trang === 'dat' ? "#FFB74D" : "#B0BEC5";
                ctx.fillText(dk.kenh ? LT("◆ CẮM KIẾM", "◆ PLANTED") : dk.trang === 'dat' ? LT("▼ KIẾM DƯỚI ĐẤT", "▼ BLADE DOWN") : LT("▲ KIẾM TRÊN LƯNG", "▲ ON BACK"), HX, 64);
                if (dk.buff > 0){ ctx.fillStyle = "#FF5252"; ctx.fillText(LT("BÁT MÔN ", "8 GATES ") + Math.ceil(dk.buff / 60) + "s", HX, 80); }
                let hy = dk.buff > 0 ? 96 : 80;
                if (dk.da > 0){                                                    // KIEM DA: 5 o tang, o sang = con lai
                    ctx.fillStyle = "#B388FF"; ctx.fillText(LT("KIẾM ĐÁ", "STONE"), HX, hy);
                    for (let q = 0; q < DK_DA_N; q++){
                        ctx.fillStyle = q < dk.da ? "#B388FF" : "rgba(60,50,80,0.6)"; ctx.fillRect(HX + 64 + q * 14, hy - 10, 11, 12);
                        ctx.strokeStyle = "#2a2230"; ctx.lineWidth = 1; ctx.strokeRect(HX + 64 + q * 14, hy - 10, 11, 12);
                    }
                    hy += 16;
                }
                if (bzBat(this)){
                    ctx.fillStyle = dk._bzNgat ? "#FF8A80" : "#FF1744";
                    let buoc = dk.bzNhanh ? (dk.bzNhanh + " " + (dk.bzBuoc || 0)) : ((dk.bz || 0) ? ("J" + dk.bz) : "");
                    if (dk._bzNgat) buoc = "NGẮT";
                    else if (dk.jHold) buoc = "CHÉM " + (dk.jTier || 0) + " " + (dk.jT / 60).toFixed(1) + "s";
                    else if (dk.bzCh) buoc = "KÊNH";
                    else if ((this.aKeyHeldTime || 0) >= 30 && !dk.A){
                        let h = this.aKeyHeldTime;
                        let tier = h >= 150 ? 5 : h >= 120 ? 4 : h >= 90 ? 3 : h >= 60 ? 2 : h >= 30 ? 1 : 0;
                        buoc = (BZ_NAP[tier] || "NẠP") + " " + (h / 60).toFixed(1) + "s";
                        if (tier === 5 && this.hp < BZ_LH_HP_MIN) buoc += " (CẦN " + BZ_LH_HP_MIN + " MÁU)";
                    }
                    else if (dk.A && dk.A.kieu === 'bzCua') buoc = "CƯA";
                    else if (dk.A && (dk.A.kieu === 'bzVong' || dk.A.kieu === 'bzKen')) buoc = dk.A.kieu === 'bzKen' ? "KÊNH" : "XOAY";
                    else if (dk.A && (dk.A.kieu === 'bzLoan' || (dk.A.kieu || '').indexOf('bzLH') === 0)) buoc = "LIÊN HOÀN";
                    else if ((dk.voHan || 0) > 0) buoc = "BÙNG " + Math.ceil(dk.voHan / 60) + "s";
                    ctx.fillText("BERSERK" + (buoc ? " · " + buoc : ""), HX, hy); hy += 16;
                }
                let _jc = bzBat(this) ? 0 : dkNangLuong(dk);
                if (_jc > 0){
                    ctx.fillStyle = ["", "#80DEEA", "#B388FF", "#FFF176"][_jc];
                    let _laDonJ = !!(dk.A && dk.A.them && dk.A.them.dmg);
                    let _hut = !!(dk.kenh || dk.jHut) && !_laDonJ && !(dk.A && dk.A.them && dk.A.them.cong);
                    let _napJ = _laDonJ || (dk.jHold && !dk.jGiu && !dk.jHut);
                    let _so = _hut ? DK_JC_HUT[_jc - 1] : (_napJ ? DK_JC_DMG[_jc - 1] : DK_JC_K[_jc - 1]);
                    let _nhan = _hut ? ("HÚT +" + _so) : (_napJ ? ("KIẾM KHÍ " + _jc + "/3 · " + _so) : ("NẠP " + _jc + " · K+" + _so));
                    ctx.fillText(_nhan, HX, hy);
                }
            }
        });
// PLAYER_PART_END s4.vkDangKy.21
