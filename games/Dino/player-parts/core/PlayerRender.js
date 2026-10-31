// PLAYER_FILE: PlayerRender
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CHARGE_TIERS, Effect, LH_PAL, SDT_XOE_R, VK, aimTarget, autoAimEnabled, bossAimTarget, bzBat, bzVeChan, bzVeChanNgoi, bzVeGiap, bzVeGiapMay, chargeMoc, chargeRingColor, chargeTick, chargeTiersCua, chargeVongMax, combatStance, ctx, currentAmmoType, currentForm, deathCineActive, deathSkel, dtPalNow, dtVeCanh, dtVeNetRong, frames, gameState, hasRune, hoverAiming, kinhPal, lhGiangThe, lhVeAo, p2AmmoType, sdtDangBat, sdtKhoan, sdtVot, sdtXoe, unityOn, unityPal, veBzGiapThan, veDauAnDang, veDinoMay, veDinoXuong, veKinhManh, vePhuKien, vePhuKienThan, veTenLuaNeuCo, visualEffects, vkMoc
// index.html:47366 · Phạm vi: Player
class __Part0 {
// PLAYER_PART_BEGIN s3.Player._drawHexShield.1 EDITABLE
_drawHexShield(sc) {
                let cx = this.x + this.w / 2, cy = this.y + this.h / 2;
                let R = Math.max(this.w, this.h) * 0.86 * sc;
                let sg = (combatStance === 2);          // giap luc giac tim-vang: dac trung cua the
                let flash = (this.shinFlash || 0) / 16;
                // mau: thuong lam ngoc / ROYAL GUARD tim vang
                let base = sg ? "126,87,194" : "0,229,255";
                let hot  = sg ? "255,214,10" : "178,235,242";
                ctx.save();
                // quang nen
                let g = ctx.createRadialGradient(cx, cy, R * 0.45, cx, cy, R);
                g.addColorStop(0, "rgba(" + base + ",0.02)");
                g.addColorStop(0.78, "rgba(" + base + ",0.16)");
                g.addColorStop(1, "rgba(" + base + ",0.02)");
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
                // cac o luc giac xep thanh 3 vanh
                const RINGS = [{ n: 14, r: 1.00, s: 0.155, sp: 0.011 },
                               { n: 10, r: 0.80, s: 0.135, sp: -0.016 },
                               { n: 6,  r: 0.58, s: 0.120, sp: 0.022 }];
                for (let ri = 0; ri < RINGS.length; ri++) {
                    let ring = RINGS[ri], rr = R * ring.r, hs = R * ring.s;
                    for (let i = 0; i < ring.n; i++) {
                        let a = (i / ring.n) * Math.PI * 2 + frames * ring.sp + ri * 0.4;
                        let px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr * 0.92;
                        // nhip sang chay vong quanh
                        let pulse = 0.42 + 0.58 * Math.pow(Math.max(0, Math.sin(a * 2 - frames * 0.10)), 3);
                        let al = (0.20 + 0.42 * pulse) * (0.62 + 0.38 * flash);
                        ctx.save();
                        ctx.translate(px, py); ctx.rotate(a + Math.PI / 2);
                        ctx.beginPath();
                        for (let k = 0; k < 6; k++) {
                            let ha = k * Math.PI / 3;
                            let hx = Math.cos(ha) * hs, hy = Math.sin(ha) * hs;
                            if (k === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
                        }
                        ctx.closePath();
                        ctx.fillStyle = "rgba(" + base + "," + (al * 0.55).toFixed(3) + ")";
                        ctx.fill();
                        ctx.strokeStyle = "rgba(" + hot + "," + Math.min(1, al + 0.28 * flash).toFixed(3) + ")";
                        ctx.lineWidth = 1.6 + 1.6 * pulse + 1.4 * flash;
                        ctx.stroke();
                        ctx.restore();
                    }
                }
                // vien ngoai
                ctx.strokeStyle = "rgba(" + hot + "," + (0.45 + 0.5 * flash) + ")";
                ctx.lineWidth = 2 + 3 * flash;
                ctx.shadowBlur = 14 + 20 * flash; ctx.shadowColor = "rgb(" + hot + ")";
                ctx.beginPath(); ctx.ellipse(cx, cy, R * 1.06, R * 0.98, 0, 0, Math.PI * 2); ctx.stroke();
                ctx.restore();
                if (this.shinFlash > 0) this.shinFlash--;
            }
// PLAYER_PART_END s3.Player._drawHexShield.1
}

// index.html:47471 · Phạm vi: Player
class __Part1 {
// PLAYER_PART_BEGIN s3.Player.drawDinoBody.1 EDITABLE
drawDinoBody(bx, by, form, crouch, airborne, palOverride) {
                if (form === 4) {
                    veDinoMay(bx, by, crouch, airborne, airborne && this.dy < 1.2 || (this.mayBay || 0) > 0);
                    let cs = crouch ? 1 : 0, br = Math.sin(frames * 0.09) * 0.5;
                    if (this.id === 1 && typeof vePhuKienThan === 'function') vePhuKienThan(bx, by, cs, br);
                    if (this.id === 1 && typeof bzVeGiapMay === 'function') bzVeGiapMay(bx, by, cs, br, crouch, airborne);   // GIAP BERSERKER rieng cho dang may moc
                    if (this.id === 1 && typeof vePhuKien === 'function') vePhuKien(bx, by + cs * 12 + br, cs, airborne);
                    let _sa = (this.id === 1) ? ((typeof currentAmmoType !== 'undefined') ? currentAmmoType : -1) : (this.ammoType != null ? this.ammoType : -1);
                    { let _vkN = vkMoc(_sa, 'veTrenNguoi'); if (_vkN) _vkN.call(this, bx, by + cs * 12 + br, { out: '#0D1114', rim: '#80DEEA', lt: '#B0BEC5' }); }
                    if (this.id === 1) veTenLuaNeuCo(bx, by, cs, br, 4);
                    return;
                }
                if (form === 6) {                                                        // BO XUONG: ve rieng, khong dung than khung long
                    veDinoXuong(bx, by, crouch, airborne, this);
                    if (deathSkel && deathCineActive && this.id === 1) return;
                    let cs = crouch ? 1 : 0, br = Math.sin(frames * 0.09) * 0.5;
                    if (this.id === 1 && typeof vePhuKienThan === 'function') vePhuKienThan(bx, by, cs, br);
                    if (this.id === 1 && typeof veBzGiapThan === 'function') veBzGiapThan(bx, by, cs, br, false);
                    if (this.id === 1 && typeof bzVeGiap === 'function') bzVeGiap(bx, by, cs, br, false);
                    if (this.id === 1 && typeof vePhuKien === 'function') vePhuKien(bx, by + cs * 12 + br, cs, airborne);
                    let _sa = (this.id === 1) ? currentAmmoType : (this.ammoType || 0);
                    { let _vkN = vkMoc(_sa, 'veTrenNguoi'); if (_vkN) _vkN.call(this, bx, by + cs * 12 + br, { out: '#2b2418', rim: '#fff3d0', lt: '#e9e2cf' }); }
                    if (this.id === 1 && typeof veTenLuaNeuCo === 'function') veTenLuaNeuCo(bx, by, cs, br, 6);
                    return;
                }
                const PAL = [
                    {bd:"#B0402A",hd:"#C94A2E",dk:"#6E2212",lt:"#FF8A5C",foot:"#5E180E",spk:null,   out:"#3A0E07",rim:"#FFB59A",eye:"#FFF3E0",pup:"#000000",aura:null,crest:0},
                    {bd:"#3D4E57",hd:"#4E626D",dk:"#212E34",lt:"#8AA1AD",foot:"#161E22",spk:"#29B6F6",out:"#0E151A",rim:"#9EE1FF",eye:"#B3E5FC",pup:"#01579B",aura:null,crest:3},
                    {bd:"#232323",hd:"#333333",dk:"#0A0A0A",lt:"#C62828",foot:"#000000",spk:"#FF3050",out:"#000000",rim:"#FF6E6E",eye:"#FF8A80",pup:"#E53935",aura:null,crest:4},
                    {bd:"#1B1526",hd:"#2A2040",dk:"#0A0510",lt:"#7C4DFF",spk:"#E85CFF",foot:"#000000",out:"#000000",rim:"#D89CFF",eye:"#EA80FC",pup:"#C558FF",aura:null,crest:4}
                ];
                const P = palOverride || (form === 5 ? kinhPal(this) : (PAL[form] || PAL[0]));
                const isBeyond = (form === 3);
                let br = Math.sin(frames * 0.09) * 0.7;
                let cs = crouch ? 1 : 0, dy = cs * 12;
                let ph = frames * 0.26, stance = airborne ? 1 : Math.sin(ph);
                const qpt = (p0, c, p1, t) => { let u = 1 - t; return [u*u*p0[0]+2*u*t*c[0]+t*t*p1[0], u*u*p0[1]+2*u*t*c[1]+t*t*p1[1]]; };

                const leg = (hipDX, st, col) => {
                    let hipX = bx + hipDX, hipY = by + 24;
                    let planted = st >= 0, sv = Math.abs(st);
                    let kneeX = hipX + (planted?3:6), kneeY = hipY + (planted?8:5-sv*2);
                    let ankX = hipX + (planted?-2:8+sv*2), ankY = hipY + (planted?17:13-sv*7);
                    let toeX = ankX + 8, toeY = planted ? by+42 : ankY + 3 - sv*3;
                    if (airborne) { kneeX=hipX+6; kneeY=hipY+7; ankX=hipX+9; ankY=hipY+14; toeX=ankX+8; toeY=ankY+2; }
                    ctx.fillStyle = col; ctx.strokeStyle = P.out; ctx.lineWidth = 1.4;
                    ctx.beginPath(); ctx.moveTo(hipX-6,hipY-3); ctx.lineTo(hipX+6,hipY-2);
                    ctx.quadraticCurveTo(kneeX+5,kneeY-2,kneeX+4,kneeY+2); ctx.lineTo(kneeX-4,kneeY+2);
                    ctx.quadraticCurveTo(hipX-7,kneeY-4,hipX-6,hipY-3); ctx.closePath(); ctx.fill(); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(kneeX-4,kneeY); ctx.lineTo(kneeX+4,kneeY);
                    ctx.lineTo(ankX+4,ankY); ctx.lineTo(ankX-3,ankY); ctx.closePath(); ctx.fill(); ctx.stroke();
                    ctx.fillStyle = P.foot;
                    ctx.beginPath(); ctx.moveTo(ankX-4,ankY-2); ctx.lineTo(toeX,toeY-3);
                    ctx.lineTo(toeX,toeY+2); ctx.lineTo(ankX-5,ankY+3); ctx.closePath(); ctx.fill(); ctx.stroke();
                    ctx.fillStyle = P.lt;
                    for (let k=0;k<3;k++){ ctx.beginPath(); ctx.moveTo(toeX-4+k*4,toeY-1);
                        ctx.lineTo(toeX-2+k*4,toeY+2); ctx.lineTo(toeX+k*4,toeY-1); ctx.closePath(); ctx.fill(); }
                    ctx.strokeStyle = P.rim; ctx.lineWidth = 1; ctx.globalAlpha = 0.7;
                    ctx.beginPath(); ctx.moveTo(hipX+6,hipY-2); ctx.quadraticCurveTo(kneeX+5,kneeY-2,kneeX+4,kneeY+2); ctx.stroke();
                    ctx.globalAlpha = 1;
                    if (this.id === 1 && typeof bzVeChan === 'function') bzVeChan(hipX, hipY, kneeX, kneeY, ankX, ankY, toeX, toeY);   // GIAP CHAN BERSERKER
                };

                if (P.aura) { ctx.fillStyle = P.aura; ctx.beginPath(); ctx.arc(bx+22, by+22+cs*8, 29+Math.sin(frames*0.1)*3, 0, Math.PI*2); ctx.fill(); }
                if (!crouch) leg(20, -stance, P.dk);

                // DUOI
                ctx.fillStyle = P.bd; ctx.strokeStyle = P.out; ctx.lineWidth = 1.6;
                ctx.beginPath(); ctx.moveTo(bx+7, by+18+cs*10+br);
                ctx.quadraticCurveTo(bx-11, by+15+dy, bx-21, by+6+dy);
                ctx.quadraticCurveTo(bx-10, by+23+dy, bx+8, by+28+cs*8+br); ctx.closePath(); ctx.fill(); ctx.stroke();
                if (isBeyond) { for (const tt of [0.35,0.62,0.85]) {
                    let r = qpt([bx+7,by+18+cs*10+br],[bx-11,by+15+dy],[bx-21,by+6+dy],tt); let h = 6-tt*2;
                    ctx.fillStyle = P.spk; ctx.strokeStyle = P.out; ctx.lineWidth = 0.8;
                    ctx.beginPath(); ctx.moveTo(r[0]-3.5,r[1]+1.5); ctx.quadraticCurveTo(r[0]-1,r[1]-h,r[0]+2,r[1]+1);
                    ctx.lineTo(r[0]+3.5,r[1]+1.8); ctx.closePath(); ctx.fill(); ctx.stroke(); } }
                ctx.strokeStyle = P.rim; ctx.lineWidth = 1; ctx.globalAlpha = 0.6;
                ctx.beginPath(); ctx.moveTo(bx+7,by+18+cs*10+br); ctx.quadraticCurveTo(bx-11,by+15+dy,bx-21,by+6+dy); ctx.stroke(); ctx.globalAlpha = 1;

                // THAN
                ctx.fillStyle = P.bd; ctx.strokeStyle = P.out; ctx.lineWidth = 1.8;
                ctx.beginPath(); ctx.moveTo(bx+6, by+16+cs*11+br);
                ctx.quadraticCurveTo(bx+18, by+8+cs*13+br, bx+33, by+15+cs*11+br);
                ctx.quadraticCurveTo(bx+39, by+24+cs*8, bx+31, by+31+cs*6);
                ctx.quadraticCurveTo(bx+16, by+35+cs*5, bx+8, by+28+cs*8); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.fillStyle = P.lt; ctx.beginPath(); ctx.ellipse(bx+18, by+27+cs*7, 10, 4, -0.05, 0, Math.PI*2); ctx.fill();
                // PHU KIEN BOC THAN (giap): ve ngay tren than, DUOI gai lung va DUOI canh tay
                if (this.id === 1 && typeof vePhuKienThan === 'function') vePhuKienThan(bx, by, cs, br);
                if (this.id === 1 && typeof veBzGiapThan === 'function') veBzGiapThan(bx, by, cs, br, false);
                // GAI LUNG neo tren song lung
                if (P.crest) {
                    let P0=[bx+6,by+16+cs*11+br], C=[bx+18,by+8+cs*13+br], P1=[bx+33,by+15+cs*11+br], n=P.crest;
                    for (let i=0;i<n;i++){ let tt=0.28+i*(0.44/(n-1||1)); let r=qpt(P0,C,P1,tt); let h=(form===1?5:7)*(1-i*0.12);
                        ctx.fillStyle=P.spk; ctx.strokeStyle=P.out; ctx.lineWidth=0.8;
                        ctx.beginPath(); ctx.moveTo(r[0]-4,r[1]+2); ctx.quadraticCurveTo(r[0]-1,r[1]-h,r[0]+1.5,r[1]+0.5);
                        ctx.lineTo(r[0]+4,r[1]+2.2); ctx.closePath(); ctx.fill(); ctx.stroke();
                        if (form>=2){ ctx.strokeStyle=P.rim; ctx.lineWidth=0.7; ctx.globalAlpha=0.7;
                            ctx.beginPath(); ctx.moveTo(r[0]-1,r[1]+1); ctx.quadraticCurveTo(r[0]-0.5,r[1]-h*0.7,r[0]+0.5,r[1]); ctx.stroke(); ctx.globalAlpha=1; } }
                }
                if (isBeyond) { ctx.strokeStyle=P.spk; ctx.lineWidth=1; ctx.globalAlpha=0.5+0.35*Math.sin(frames*0.13);
                    ctx.beginPath(); ctx.moveTo(bx+15,by+18+cs*10); ctx.lineTo(bx+19,by+23+cs*8); ctx.lineTo(bx+17,by+28+cs*7); ctx.stroke(); ctx.globalAlpha=1; }
                ctx.strokeStyle = P.rim; ctx.lineWidth = 1.2; ctx.globalAlpha = 0.7;
                ctx.beginPath(); ctx.moveTo(bx+6,by+16+cs*11+br); ctx.quadraticCurveTo(bx+18,by+8+cs*13+br,bx+33,by+15+cs*11+br); ctx.stroke(); ctx.globalAlpha=1;

                // TAY gap khuyu
                { let sX=bx+27,sY=by+19+cs*9,eX=bx+30,eY=by+26+cs*8,wX=bx+37,wY=by+28+cs*8;
                  ctx.fillStyle=P.dk; ctx.strokeStyle=P.out; ctx.lineWidth=1.2;
                  ctx.beginPath(); ctx.moveTo(sX-3,sY-2); ctx.lineTo(sX+3,sY-1); ctx.lineTo(eX+2,eY); ctx.lineTo(eX-2,eY+1); ctx.closePath(); ctx.fill(); ctx.stroke();
                  ctx.beginPath(); ctx.moveTo(eX-2,eY-1); ctx.lineTo(eX+2,eY); ctx.lineTo(wX+1,wY); ctx.lineTo(wX-1,wY+2); ctx.closePath(); ctx.fill(); ctx.stroke();
                  ctx.strokeStyle=P.lt; ctx.lineWidth=1.6; ctx.lineCap="round";
                  ctx.beginPath(); ctx.moveTo(wX,wY); ctx.quadraticCurveTo(wX+4,wY+1,wX+5,wY+4); ctx.stroke();
                  ctx.beginPath(); ctx.moveTo(wX,wY+1); ctx.quadraticCurveTo(wX+3,wY+3,wX+3,wY+6); ctx.stroke(); ctx.lineCap="butt";
                  ctx.strokeStyle=P.rim; ctx.lineWidth=0.9; ctx.globalAlpha=0.65;
                  ctx.beginPath(); ctx.moveTo(sX+3,sY-1); ctx.lineTo(eX+2,eY); ctx.lineTo(wX+1,wY); ctx.stroke(); ctx.globalAlpha=1; }

                if (!crouch) leg(13, stance, P.bd);
                else { ctx.fillStyle=P.dk; ctx.strokeStyle=P.out; ctx.lineWidth=1.4;
                    for (let k=0;k<2;k++){ let lx=bx+13+k*9;
                        ctx.beginPath(); ctx.moveTo(lx-4,by+34); ctx.lineTo(lx+4,by+34); ctx.lineTo(lx+6,by+44); ctx.lineTo(lx-2,by+44); ctx.closePath(); ctx.fill(); ctx.stroke();
                        if (this.id === 1 && typeof bzVeChanNgoi === 'function'){ bzVeChanNgoi(lx, by); ctx.fillStyle = P.dk; ctx.strokeStyle = P.out; ctx.lineWidth = 1.4; }
                    } }

                // CO + DAU
                ctx.fillStyle=P.hd; ctx.strokeStyle=P.out; ctx.lineWidth=1.8;
                ctx.beginPath(); ctx.moveTo(bx+29,by+16+cs*11+br);
                ctx.quadraticCurveTo(bx+34,by+9+cs*12,bx+36,by+5+cs*13);
                ctx.quadraticCurveTo(bx+41,by+12+cs*12,bx+38,by+19+cs*11+br); ctx.closePath(); ctx.fill(); ctx.stroke();
                if (form===2){ ctx.fillStyle=P.spk; ctx.strokeStyle=P.out; ctx.lineWidth=0.8;
                    ctx.save(); ctx.translate(bx+35,by+6+cs*12+br); ctx.rotate(-0.5);
                    ctx.beginPath(); ctx.moveTo(-2.5,3); ctx.quadraticCurveTo(0,-8,2,3); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
                ctx.fillStyle=P.hd; ctx.strokeStyle=P.out; ctx.lineWidth=1.8;
                ctx.beginPath();
                ctx.moveTo(bx+31,by+4+cs*13+br);
                ctx.quadraticCurveTo(bx+45,by+1+cs*13+br,bx+52,by+8+cs*12+br);
                ctx.quadraticCurveTo(bx+54,by+13+cs*12,bx+47,by+15+cs*12+br);
                ctx.lineTo(bx+34,by+15+cs*12+br); ctx.closePath(); ctx.fill(); ctx.stroke();
                ctx.fillStyle=P.dk;
                ctx.beginPath(); ctx.moveTo(bx+35,by+14+cs*12+br);
                ctx.quadraticCurveTo(bx+45,by+18+cs*12+br,bx+51,by+13+cs*12+br);
                ctx.lineTo(bx+51,by+16+cs*12+br);
                ctx.quadraticCurveTo(bx+44,by+21+cs*12+br,bx+35,by+17+cs*12+br); ctx.closePath(); ctx.fill();
                ctx.fillStyle="#FFF";
                for (let k=0;k<3;k++){ ctx.beginPath(); ctx.moveTo(bx+39+k*4,by+13+cs*12+br);
                    ctx.lineTo(bx+41+k*4,by+17+cs*12+br); ctx.lineTo(bx+43+k*4,by+13+cs*12+br); ctx.closePath(); ctx.fill(); }
                ctx.strokeStyle=P.rim; ctx.lineWidth=1.1; ctx.globalAlpha=0.75;
                ctx.beginPath(); ctx.moveTo(bx+31,by+4+cs*13+br); ctx.quadraticCurveTo(bx+45,by+1+cs*13+br,bx+52,by+8+cs*12+br); ctx.stroke(); ctx.globalAlpha=1;
                // MAT
                if (form>=2){ ctx.fillStyle=P.pup;
                    ctx.beginPath(); ctx.moveTo(bx+41,by+4+cs*12+br); ctx.lineTo(bx+49,by+6+cs*12+br); ctx.lineTo(bx+42,by+9+cs*12+br); ctx.closePath(); ctx.fill();
                    ctx.fillStyle=P.eye; ctx.fillRect(bx+43,by+5+cs*12+br,4,3);
                    ctx.fillStyle=P.pup; ctx.fillRect(bx+44,by+5+cs*12+br,1.5,3);
                    ctx.fillStyle="rgba(255,255,255,0.8)"; ctx.fillRect(bx+43,by+5+cs*12+br,1,1);
                } else { ctx.fillStyle=P.eye; ctx.fillRect(bx+42,by+5+cs*12+br,6,5);
                    ctx.fillStyle=P.pup; ctx.fillRect(bx+44,by+6+cs*12+br,3,3); }
                ctx.fillStyle=P.out; ctx.fillRect(bx+50,by+8+cs*12+br,2,2);
                if (form === 5 && this.id === 1) veKinhManh(bx, by, cs, br, this.kinhLop === undefined ? 2 : this.kinhLop);   // THUY TINH: mat cat + tinh the ngoai
                    if (this.id === 1 && typeof bzVeGiap === 'function') bzVeGiap(bx, by, cs, br, false);
                // ---- PHU KIEN (chi nguoi choi 1 — ca ban xem truoc trong Customize) ----
                if (this.id === 1 && typeof vePhuKien === 'function') vePhuKien(bx, by + cs * 12 + br, cs, airborne);

                // ---- VU KHI CAM TREN NGUOI (vd cay kiem cua DINOSWORD) ----
                let _sa = (this.id === 1)
                    ? ((typeof currentAmmoType !== 'undefined') ? currentAmmoType : -1)
                    : (this.ammoType != null ? this.ammoType : -1);
                { let _vkN = vkMoc(_sa, 'veTrenNguoi'); if (_vkN) _vkN.call(this, bx, by + cs * 12 + br, P); }   // @@KHOI-VK
                if (this.id === 1) veTenLuaNeuCo(bx, by, cs, br, form);
            }
// PLAYER_PART_END s3.Player.drawDinoBody.1
}

// index.html:47639 · Phạm vi: Player
class __Part2 {
// PLAYER_PART_BEGIN s3.Player.drawForm.1 EDITABLE
drawForm(isCrouching, x, y, legAnim, overrideForm = -1, forceFacingLeft = false, palOverride = null) {
                // RUNE UNITY: nguoi choi mang bo mau UNITY, doi mau theo loai dan dang cam
                if (!palOverride && overrideForm === -1 && this.id === 1 && typeof unityOn === 'function' && unityOn())
                    palOverride = unityPal(currentAmmoType);
                let formTarget = overrideForm !== -1 ? overrideForm : (this.id === 1 ? currentForm : this.form);
                let sScale = this.getFormScale(formTarget); 
                let shouldFlip = overrideForm !== -1 ? forceFacingLeft : this.isFacingLeft;
                
                ctx.save();
                ctx.translate(x + this.w/2, y + this.h/2);
                if (shouldFlip) ctx.scale(-1, 1);
                ctx.translate(-(x + this.w/2), -(y + this.h/2));
                
                ctx.translate(x, y); ctx.scale(sScale, sScale);
                this.drawDinoBody(0, 0, formTarget, isCrouching, (overrideForm === -1 ? (this.grounded === false) : false), palOverride);
                ctx.restore(); 
                if (overrideForm === -1 && this.id === 1 && !palOverride && typeof veDauAnDang === 'function') veDauAnDang(this, x, y, formTarget, sScale);
            }
// PLAYER_PART_END s3.Player.drawForm.1
}

// index.html:47658 · Phạm vi: Player
class __Part3 {
// PLAYER_PART_BEGIN s3.Player.draw.1 EDITABLE
draw() {
                if (this._bzAn) return;
                if (this._giaoAn) return;   // @@HE-GIAO ult: tat than nguoi choi, thay bang vet luot
                if (this._cusNkAn) return;  // @@HE-CUSNK: dang o trong may khoan duoi long dat
                if (this._cusBomAn) return; // @@HE-CUSBOM: da bien mat, chi con vung tha bom
                // @@HE-CHANLONG: chan than duoc ghim `invincible` vinh vien de khong bao gio
                // chet — neu de no di qua nhanh nhap nhay o duoi thi no bien mat nua thoi gian.
                if (this.invincible && !this._cusBom && !(this.dk && this.dk.ult && this.dk.ult.bz) && !this._clNhan && !this._hakiGong && frames % 10 < 5 && !deathCineActive) return;   // @@HE-HAKI: dang gong thi khong nhap nhay
                ctx.save();
                if (this._cusBom && this._cusBomMo < 1) ctx.globalAlpha *= this._cusBomMo;
                
                let sScale = this.getFormScale();
                let pos = this.getShootPos();

                // ===== KHIEN: lop giap LUC GIAC bao tron quanh nguoi choi =====
                if (this.isShielding()) this._drawHexShield(sScale);
                if (this._xAn){ ctx.restore(); return; }

                let legAnim = (frames % 12 < 6 && !this.grounded === false) ? 4 : 0;
                // Nghieng dau nhe ve phia dich gan nhat (gioi han +-20 do)
                if (this.id === 1 && gameState !== 'pvp' && (autoAimEnabled || combatStance === 1 || hoverAiming())) {
                    let tgtH = (combatStance === 1 || hoverAiming()) ? bossAimTarget(pos.x, pos.y) : aimTarget(pos.x, pos.y, pos.dir), wantT = 0;
                    if (tgtH) { let capT = ((combatStance === 1 || hoverAiming()) ? 68 : 20) * Math.PI / 180; let baseH = pos.dir > 0 ? 0 : Math.PI; let rawH = Math.atan2((tgtH.y + tgtH.h / 2) - pos.y, (tgtH.x + tgtH.w / 2) - pos.x); let relH = Math.atan2(Math.sin(rawH - baseH), Math.cos(rawH - baseH)); wantT = Math.max(-capT, Math.min(capT, relH)); }
                    this.headTilt = (this.headTilt || 0) + (wantT - (this.headTilt || 0)) * 0.2;
                } else { this.headTilt = (this.headTilt || 0) * 0.8; }
                let tlt = this.headTilt || 0;
                // @@HE-SDT: o Shin Dragon Trigger nguoi choi MANG DUNG tao hinh cua phan
                // than — cung bang mau, cung doi canh, cung bo net rong. Hai hinh la MOT.
                // @@HE-CHANLONG: chan than muon nguyen bo tao hinh rong nay — cung bang mau,
                // cung doi canh, cung bo net rong. Nhung mui khoan va cu xoe canh la chieu
                // cua RIENG nguoi choi trong Shin Dragon Trigger nen phai loai no ra.
                let _cln = !!this._clNhan;
                let _sdt = _cln || (this.id === 1 && typeof sdtDangBat === 'function' && sdtDangBat());
                let _spal = _sdt ? dtPalNow() : null;
                let _lhGT = !_sdt && typeof lhGiangThe === 'function' && lhGiangThe(this);   // @@HE-LHDAN: Than Chet Giang The
                if (_lhGT){ _spal = LH_PAL; lhVeAo(this, 0); }
                let _kh = _sdt && !_cln && typeof sdtKhoan !== 'undefined' && sdtKhoan;
                let _xoe = _sdt && !_cln && typeof sdtXoe !== 'undefined' && sdtXoe > 0;
                // DANG KHOAN: xoay ca than theo huong bay -> nguoi choi THAT SU la mot mui khoan.
                if (_kh){
                    let _g = _kh.goc + (this.isFacingLeft ? Math.PI : 0);
                    ctx.save();
                    ctx.translate(this.x + this.w/2, this.y + this.h/2);
                    ctx.rotate(this.isFacingLeft ? -_g : _g);
                    ctx.translate(-(this.x + this.w/2), -(this.y + this.h/2));
                }
                if (_sdt && !_kh && typeof dtVeCanh === 'function')   // @@HE-SDT-KHOAN: dang khoan thi canh da khep vao mui khoan
                    dtVeCanh(this.x + this.w/2, this.y + this.h/2, this.isFacingLeft ? -1 : 1, 1,
                             !!_kh || _xoe || (typeof sdtVot !== 'undefined' && !!sdtVot));
                if (Math.abs(tlt) > 0.005) {
                    let pvX = this.isFacingLeft ? this.x + this.w * 0.38 : this.x + this.w * 0.62, pvY = this.y + this.h * 0.34;
                    ctx.save(); ctx.translate(pvX, pvY); ctx.rotate(tlt); ctx.translate(-pvX, -pvY);
                    this.drawForm(this.isCrouching, this.x, this.y, legAnim, -1, false, _spal);
                    ctx.restore();
                } else {
                    this.drawForm(this.isCrouching, this.x, this.y, legAnim, -1, false, _spal);
                }
                if (_sdt && typeof dtVeNetRong === 'function')
                    dtVeNetRong({ x: this.x, y: this.y }, this.isFacingLeft ? -1 : 1, 1);
                if (_lhGT) lhVeAo(this, 1);
                if (this.buaUniSet && typeof this.buaUniVe === 'function') this.buaUniVe();   // @@HE-BUAUNITY
                if (this.giaoUniXoay && typeof this.giaoUniVe === 'function') this.giaoUniVe();   // @@HE-GIAOUNITY
                if (_kh) ctx.restore();
                // XOE CANH: vong xung banh ra tu than
                if (_xoe){
                    let u = 1 - sdtXoe / 16;
                    ctx.save();
                    ctx.globalAlpha = 0.7 * (1 - u);
                    ctx.strokeStyle = "#FFAB40"; ctx.lineWidth = 6 * (1 - u) + 2;
                    ctx.beginPath();
                    ctx.ellipse(this.x + this.w/2, this.y + this.h/2, SDT_XOE_R * u, SDT_XOE_R * 0.8 * u, 0, 0, Math.PI*2);
                    ctx.stroke();
                    ctx.restore(); ctx.globalAlpha = 1;
                }

                if (this.fireBreathTimer > 0) this.infVeLua(pos);   // @@VK-INFERNO

                // ===== VONG NAP: chay lien tuc tu luc giu den nguong Channel (180f) =====
                {
                    let _anyCh = !!(this.clawChannel || this.rapidChannel || this.pulseLaserChannel || this.fireChannel
                                 || this.lightChannel || this.splitChannel || this.pulsarChannel || this.boomChannel);
                    if (_anyCh && !this._ringChPrev) this.chgBurst = 22;
                    this._ringChPrev = _anyCh;
                }
                if (this.boomSpin > 0) this.boomVeXoay();   // @@VK-BOOMERANG: xoay luoi quanh nguoi sau khi bat duoc
                if (this.chgBurst > 0) {
                    // vong no bung ra roi tan bien -> Channel xuat hien
                    let bt = 1 - (this.chgBurst / 22);
                    let br = 14 + bt * 95;
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, 1 - bt);
                    ctx.strokeStyle = chargeRingColor(this.id === 1 ? currentAmmoType : p2AmmoType, 180);
                    ctx.lineWidth = 7 * (1 - bt) + 1;
                    ctx.shadowBlur = 20; ctx.shadowColor = ctx.strokeStyle;
                    ctx.beginPath(); ctx.arc(pos.x, pos.y, br, 0, Math.PI*2); ctx.stroke();
                    ctx.globalAlpha = Math.max(0, 0.55 - bt * 0.55);
                    ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(pos.x, pos.y, br * 0.62, 0, Math.PI*2); ctx.stroke();
                    ctx.restore();
                    this.chgBurst--;
                }
                let _caR0 = this.id === 1 ? currentAmmoType : p2AmmoType;
                let _bzJNap = typeof bzBat === 'function' && bzBat(this) && this.dk && this.dk.jHold && (this.dk.jT || 0) > 0;
                if ((this.chargeProgress > 0 || _bzJNap) && (_bzJNap || this.aKeyHeldTime < chargeVongMax(_caR0)) && this.laserActiveTimer <= 0
                    && !(VK[_caR0] && VK[_caR0].anVongSac && VK[_caR0].anVongSac.call(this))) {
                    let caRing = _caR0, _vMax = _bzJNap ? 150 : chargeVongMax(caRing);
                    if (!_bzJNap) chargeTick(this, caRing);
                    let _held = _bzJNap ? this.dk.jT : this.aKeyHeldTime;
                    let _ringT = Math.max(0, Math.min(1, _held / _vMax));
                    let _rCol = chargeRingColor(caRing, _held);
                    { let _vkR = vkMoc(caRing, 'veVongSac'); if (_vkR) _vkR.call(this, _ringT, _rCol); else {   // @@KHOI-VK — vong sac rieng (Kiem: tia chop quanh than)
                        ctx.strokeStyle = _rCol;
                        ctx.lineWidth = 3 + _ringT * 5;
                        ctx.beginPath(); ctx.arc(pos.x, pos.y, 10 + _ringT * 34, 0, Math.PI*2); ctx.stroke();
                    } }
                    // cung tien do — TO va DAY hon han ban cu (ban kinh 46 -> 62, net 4 -> 9)
                    ctx.save();
                    const _R = 62;
                    ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.lineWidth = 13;   // vien den de noi tren moi nen
                    ctx.beginPath(); ctx.arc(pos.x, pos.y, _R, 0, Math.PI*2); ctx.stroke();
                    ctx.strokeStyle = _rCol; ctx.lineWidth = 9;
                    ctx.shadowBlur = 14; ctx.shadowColor = _rCol;
                    ctx.beginPath(); ctx.arc(pos.x, pos.y, _R, -Math.PI/2, -Math.PI/2 + Math.PI*2*_ringT); ctx.stroke();
                    let _hA = -Math.PI/2 + Math.PI*2*_ringT;
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = "#000"; ctx.fillRect(pos.x + Math.cos(_hA)*_R - 7, pos.y + Math.sin(_hA)*_R - 7, 14, 14);
                    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(pos.x + Math.cos(_hA)*_R - 5, pos.y + Math.sin(_hA)*_R - 5, 10, 10);
                    // VACH MOC: moi nac charge mot vach, day len khi da qua
                    for (let _m of (_bzJNap ? [0.2, 0.4, 0.6, 0.8, 1] : chargeMoc(caRing))){
                        let _a = -Math.PI/2 + Math.PI*2*_m, qua = _ringT >= _m;
                        ctx.strokeStyle = qua ? '#FFFFFF' : 'rgba(0,0,0,0.75)';
                        ctx.lineWidth = qua ? 4 : 3;
                        ctx.beginPath();
                        ctx.moveTo(pos.x + Math.cos(_a)*(_R-11), pos.y + Math.sin(_a)*(_R-11));
                        ctx.lineTo(pos.x + Math.cos(_a)*(_R+11), pos.y + Math.sin(_a)*(_R+11));
                        ctx.stroke();
                    }
                    // vach chia cac moc cua loai dan nay
                    let _T = chargeTiersCua(caRing) || CHARGE_TIERS[0];
                    ctx.lineWidth = 2;
                    for (let ti = 0; ti < _T.length; ti++) {
                        let a = -Math.PI/2 + Math.PI*2*(_T[ti][0]/_vMax);
                        ctx.strokeStyle = _held >= _T[ti][0] ? _T[ti][1] : "rgba(255,255,255,0.28)";
                        ctx.beginPath();
                        ctx.moveTo(pos.x + Math.cos(a)*41, pos.y + Math.sin(a)*41);
                        ctx.lineTo(pos.x + Math.cos(a)*51, pos.y + Math.sin(a)*51);
                        ctx.stroke();
                    }
                    ctx.restore();
                    // canh bao sap roi vao Channel
                    if (!_bzJNap && _held > _vMax - 15 && frames % 6 < 3) {
                        ctx.fillStyle = "#FF5252"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                        ctx.fillText("SẮP VÀO CHANNEL", pos.x, pos.y - 60); ctx.textAlign = "left";
                    }
                }
                
                let checkAmmo = this.id === 1 ? currentAmmoType : p2AmmoType;
                { let _vkS = vkMoc(checkAmmo, 'veSac'); if (_vkS) _vkS.call(this, pos); }   // @@KHOI-VK
                ctx.restore();

                if (this.laserActiveTimer > 0 || this.pulseLaserChannel) this.pulseVeLaser(pos);   // @@VK-PULSE
            }
// PLAYER_PART_END s3.Player.draw.1
}

// index.html:47887 · Phạm vi: Player
class __Part4 {
// PLAYER_PART_BEGIN s3.Player.drawUltAura.1 EDITABLE
drawUltAura() {
                if (!this.ultActive) return;
                let cx = this.x + this.w / 2, cy = this.y + this.h / 2;
                let col = (VK[this.ultAmmo] && VK[this.ultAmmo].mauUlt) || '#00E5FF';   // @@KHOI-VK: mau chieu cuoi khai trong khoi vu khi
                ctx.save(); ctx.globalCompositeOperation = 'lighter';
                let pulse = 6 + Math.sin(frames * 0.3) * 3, R = this.h * 0.95 + pulse;
                let g = ctx.createRadialGradient(cx, cy, 6, cx, cy, R);
                g.addColorStop(0, col + 'cc'); g.addColorStop(0.5, col + '55'); g.addColorStop(1, col + '00');
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = col; ctx.lineWidth = 2;
                for (let i = 0; i < 7; i++) { let a = -Math.PI / 2 + (i - 3) * 0.3, L = 20 + Math.abs(Math.sin(frames * 0.5 + i)) * 12; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 12, cy + Math.sin(a) * 12); ctx.lineTo(cx + Math.cos(a) * (12 + L), cy + Math.sin(a) * (12 + L)); ctx.stroke(); }
                ctx.restore(); ctx.globalAlpha = 1;
            }
// PLAYER_PART_END s3.Player.drawUltAura.1
}

// index.html:47900 · Phạm vi: Player
class __Part5 {
// PLAYER_PART_BEGIN s3.Player.drawUltBeam.1 EDITABLE
drawUltBeam() {
                { let _vkV = vkMoc(this.ultAmmo, 'veUlt'); if (_vkV) _vkV.call(this); }   // @@KHOI-VK
            }
// PLAYER_PART_END s3.Player.drawUltBeam.1
}

// index.html:48389 · Phạm vi: Player
class __Part6 {
// PLAYER_PART_BEGIN s3.Player._slashFx.1 EDITABLE
_slashFx(kind, isLeft, R) {
                this._fxLast = { kind: kind, isLeft: isLeft, R: R };   // de SOGENMU dung lai dung hoat anh
                let e = new Effect(this.x + this.w/2, this.y + this.h/2, kind, isLeft, R);
                e.follow = this;
                this._fxE = [e];
                // MAU nhat chem doi theo nang cap dang mang
                let _n = hasRune('explshot'), _c = hasRune('bulletclash');
                e.tint = (_n && _c) ? 'dark' : (_n ? 'nova' : (_c ? 'clash' : null));
                visualEffects.push(e);
                // SWORDMASTER — MIKAZUKIZAN: mot vet chem THU HAI y het hinh dang nhung ban kinh lon hon,
                // nen no luon khop voi don danh goc thay vi la mot hinh ve rieng.
                if (hasRune('swordmaster')) {
                    let e2 = new Effect(this.x + this.w/2, this.y + this.h/2, kind, isLeft, R + (R * 0.35 + 22));
                    e2.follow = this; e2.tint = 'mika';
                    visualEffects.push(e2); this._fxE.push(e2);
                }
                return e;
            }
// PLAYER_PART_END s3.Player._slashFx.1
}

// index.html:48569 · Phạm vi: Player
class __Part7 {
// PLAYER_PART_BEGIN s3.Player.drawNovaRing.1 EDITABLE
drawNovaRing() {
                if (!this.novaRing) return;
                let n = this.novaRing; n.t++; n.r = Math.min(n.max, n.r + n.max / 9);
                let a = Math.max(0, 1 - n.t / 16);
                if (a <= 0) { this.novaRing = null; return; }
                let cxp = this.x + this.w/2, cyp = this.y + this.h/2;
                ctx.save();
                let g5 = ctx.createRadialGradient(cxp, cyp, n.r * 0.35, cxp, cyp, n.r);
                g5.addColorStop(0, "rgba(255,253,231," + (a * 0.55) + ")");
                g5.addColorStop(0.55, "rgba(255,152,0," + (a * 0.60) + ")");
                g5.addColorStop(1, "rgba(191,54,12," + (a * 0.10) + ")");
                ctx.fillStyle = g5; ctx.beginPath(); ctx.arc(cxp, cyp, n.r, 0, 6.28); ctx.fill();
                ctx.strokeStyle = "rgba(255,213,79," + a + ")"; ctx.lineWidth = 5;
                ctx.beginPath(); ctx.arc(cxp, cyp, n.r, 0, 6.28); ctx.stroke();
                for (let k = 0; k < 12; k++) { let ang = k * 0.52 + frames * 0.06;
                    ctx.fillStyle = "rgba(255,112,67," + a + ")";
                    ctx.beginPath(); ctx.arc(cxp + Math.cos(ang) * n.r, cyp + Math.sin(ang) * n.r, 6, 0, 6.28); ctx.fill(); }
                ctx.restore();
            }
// PLAYER_PART_END s3.Player.drawNovaRing.1
}
