// PLAYER_FILE: CUSTOM04
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: BIEN_DAY, CM, CUS_CG_FULL, CUS_CG_GAN, CUS_CG_MOC, CUS_CG_XUYEN, CUS_DAN, CUS_PT_CHAY, CUS_TACH_GOC, CUS_TOA_SO, DO_VO_VAT, Effect, FloatingText, LT, SFX, allTargets, bossProjectiles, bosses, camX, camY, canvas, checkAABB, ctx, cusCapCua, cusCgDan, cusCgMax, cusChDanh, cusHieuUng, cusNoDat, cusPtBat, cusPtChay, cusPtDam, cusPtDps, cusPtGoc, cusPvpDanh, cusStandThu, cusTangPT, cusToaNo, cutBossProjectiles, dealDamage, dino, doChieuThu, floatingTexts, frames, gameState, gdVaCham, hitDam, mapTheme, novaCo, novaMuiCam, obstacles, parry, pvpDich, shakeTimer, visualEffects, worldL, worldR
// index.html:65194 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgBat.1 EDITABLE
function cusCgBat(){ return typeof cusCapCua === 'function' && cusCapCua('cung') > 0; }
// PLAYER_PART_END s4.cusCgBat.1

// index.html:65195 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgDmg.1 EDITABLE
function cusCgDmg(t){ for (const m of CUS_CG_MOC) if (t >= m[0]) return m[1]; return 1; }
// PLAYER_PART_END s4.cusCgDmg.1

// index.html:65196 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgGoc.1 EDITABLE
function cusCgGoc(){ return cusPtGoc() * 0.8; }
// PLAYER_PART_END s4.cusCgGoc.1

// index.html:65197 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgTam.1 EDITABLE
function cusCgTam(t){
            let u = Math.min(1, t / CUS_CG_FULL), W = worldR() - worldL();
            return u >= 1 ? W + 400 : CM * CUS_CG_GAN + (W * 0.9 - CM * CUS_CG_GAN) * u;
        }
// PLAYER_PART_END s4.cusCgTam.1

// index.html:65201 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgBan.1 EDITABLE
function cusCgBan(ng, t){
            let pos = ng.getShootPos(), dir = pos.dir < 0 ? -1 : 1;
            let n = Math.max(1, Math.min(cusCgMax(), ng.cusCgTen || 1)), dmg = cusCgDmg(t), xuyen = t >= CUS_CG_XUYEN;
            let u = Math.min(1, t / CUS_CG_FULL), v = 11 + 15 * u + (xuyen ? 5 : 0), b = cusCgGoc();
            ng.cusLot = (ng.cusLot || 0) + 1;
            // @@HE-SONGHE — CUNG + TACH TIA: moi mui tach thanh 2 / 3 mui; CUNG + TOA: mui ten trung la toa chum
            let _tt = cusCapCua('tachtia'), _toa = cusCapCua('toa') > 0;
            let _lech = _tt <= 0 ? [0] : (_tt === 1 ? [-CUS_TACH_GOC * 1.4, CUS_TACH_GOC * 1.4] : [-CUS_TACH_GOC * 1.4, 0, CUS_TACH_GOC * 1.4]);
            for (let i = 0; i < n; i++) for (let l of _lech){
                let a = (dir > 0 ? 0 : Math.PI) + ((i - (n - 1) / 2) * b + l) * dir;
                cusCgDan.push({ ng, x: pos.x, y: pos.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, dmg, xuyen, tam: cusCgTam(t),
                                di: 0, roi: 0, cam: 0, trung: new Set(), lot: ng.cusLot, t: 0, muc: dmg, toa: _toa });
            }
            if (typeof SFX !== 'undefined' && SFX.tone){
                SFX.tone(260 + 60 * dmg, 0.08, 'triangle', 0.16, 120);
                if (xuyen) SFX.tone(1800, 0.14, 'sawtooth', 0.12, 700);
            }
            if (xuyen) shakeTimer = Math.max(shakeTimer, 6);
        }
// PLAYER_PART_END s4.cusCgBan.1

// index.html:65220 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgTrung.1 EDITABLE
function cusCgTrung(D, o){
            if (gameState === 'pvp'){ cusPvpDanh(D.ng, o, D.dmg); return; }
            let d = cusTangPT(o, D.dmg);
            if (o._cusLot !== D.lot){ o._cusLot = D.lot; d += (typeof cusHieuUng === 'function') ? cusHieuUng(o, D.dmg) : 0; }
            if (D.toa && !D.toaXong && typeof cusToaNo === 'function'){   // @@HE-SONGHE: CUNG + TOA
                D.toaXong = 1;
                let tv = Math.hypot(D.vx, D.vy) || 1;
                cusToaNo({ cusToaSo: CUS_TOA_SO, dmg: Math.max(1, Math.round(D.dmg / 2)), cusLot: D.lot, owner: D.ng.id }, D.x + D.vx / tv * 50, D.y + D.vy / tv * 50);
            }
            cusStandThu(o, d, 'cung', D.ng.id);
            if (typeof dealDamage === 'function') dealDamage(o, d, 'ammo'); else o.hp -= d;
            if (typeof novaCo === 'function' && novaCo(D.ng)) novaMuiCam(o, D.x, D.y, Math.atan2(D.vy, D.vx), D.muc, D.xuyen);   // @@HE-NOVA2
            if (typeof cusCapCua === 'function' && cusCapCua('no') > 0 && typeof cusNoDat === 'function')
                cusNoDat(o.x + (o.w||20)/2, o.y + (o.h||20)/2);
            if (typeof hitDam === 'function') hitDam(D.x, D.y, D.vx, D.dmg >= 4, D.xuyen ? [255, 138, 128] : [255, 224, 178]);
        }
// PLAYER_PART_END s4.cusCgTrung.1

// index.html:65237 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgTick.1 EDITABLE
function cusCgTick(){
            for (let i = cusCgDan.length - 1; i >= 0; i--){
                let D = cusCgDan[i]; D.t++;
                if (D.cam){ if (++D.cam > 40) cusCgDan.splice(i, 1); continue; }
                let x0 = D.x, y0 = D.y;
                if (D.roi){ D.vy += 0.7; D.vx *= 0.97; }
                D.x += D.vx; D.y += D.vy; D.di += Math.hypot(D.vx, D.vy);
                if (!D.roi && D.di >= D.tam){ D.roi = 1; D.vx *= 0.55; D.vy = Math.min(D.vy, -1.2); }
                if (D.y >= 318){ D.y = 318; D.cam = 1; continue; }                          // chui xuong dat
                if (D.x < worldL() - 80 || D.x > worldR() + 80 || D.t > 200){ cusCgDan.splice(i, 1); continue; }
                if (D.roi) continue;                                                       // dang rot: het luc
                let hop = { x: Math.min(x0, D.x) - 2, y: Math.min(y0, D.y) - 3, w: Math.abs(D.x - x0) + 4, h: Math.abs(D.y - y0) + 6 };
                if (!D.xuyen && typeof doChieuThu === 'function' && doChieuThu(D, hop, D.dmg)){ cusCgDan.splice(i, 1); continue; }   // @@HE-DOCHIEU
                if (D.xuyen && gameState !== 'pvp' && typeof cutBossProjectiles === 'function') cutBossProjectiles(hop, D.ng.id);   // XUYEN PHA: cat vo dan tren duong bay
                if (D.ng && D.ng.id === 1 && typeof gdVaCham === 'function'){   // @@HE-GATDAN2
                    let _con = gdVaCham(hop, D.dmg, D.xuyen);
                    if (_con <= 0){ cusCgDan.splice(i, 1); continue; }
                    D.dmg = _con;
                }
                let ds = (gameState === 'pvp') ? [((typeof pvpDich === 'function') ? pvpDich(D.ng) : null)]
                                               : ((typeof allTargets === 'function') ? allTargets() : []);
                let het = false;
                for (let o of ds){
                    if (!o || o === D.ng || D.trung.has(o) || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (!checkAABB(hop, o)) continue;
                    D.trung.add(o); cusCgTrung(D, o);
                    if (!D.xuyen){ het = true; break; }
                }
                if (!het && gameState !== 'pvp' && typeof obstacles !== 'undefined')
                    for (let o of obstacles) if (o && !D.trung.has(o) && checkAABB(hop, o)){ D.trung.add(o); if (o.hp !== undefined) o.hp -= D.dmg; if (!D.xuyen){ het = true; break; } }
                if (het) cusCgDan.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.cusCgTick.1

// index.html:65271 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgMau.1 EDITABLE
function cusCgMau(dmg){ return dmg >= 5 ? "#FF8A80" : dmg >= 4 ? "#FFD54F" : dmg >= 3 ? "#FFFFFF" : "#B0BEC5"; }
// PLAYER_PART_END s4.cusCgMau.1

// index.html:65272 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgVeTen.1 EDITABLE
function cusCgVeTen(x, y, a, L, mau, sang, than){
            ctx.save(); ctx.translate(x, y); ctx.rotate(a);
            if (sang){ ctx.strokeStyle = mau; ctx.globalAlpha = 0.35; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-L, 0); ctx.lineTo(4, 0); ctx.stroke(); ctx.globalAlpha = 1; }
            ctx.strokeStyle = than || "#8D6E63"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(-L, 0); ctx.lineTo(0, 0); ctx.stroke();                 // than ten
            ctx.fillStyle = "#ECEFF1"; ctx.beginPath(); ctx.moveTo(0, -3); ctx.lineTo(8, 0); ctx.lineTo(0, 3); ctx.closePath(); ctx.fill();   // mui
            ctx.fillStyle = mau; ctx.beginPath(); ctx.moveTo(-L + 8, 0); ctx.lineTo(-L - 1, -4); ctx.lineTo(-L + 2, 0); ctx.lineTo(-L - 1, 4); ctx.closePath(); ctx.fill();   // long duoi
            ctx.restore();
        }
// PLAYER_PART_END s4.cusCgVeTen.1

// index.html:65281 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgVe.1 EDITABLE
function cusCgVe(){
            if (!cusCgDan.length) return;
            ctx.save();
            for (let D of cusCgDan){
                let a = D.cam ? (D.vx >= 0 ? 0.9 : Math.PI - 0.9) : Math.atan2(D.vy, D.vx);
                if (D.cam) ctx.globalAlpha = Math.max(0, 1 - D.cam / 40);
                let mau = cusCgMau(D.muc);
                if (!D.roi && !D.cam && D.muc >= 3){                                           // vet gio
                    ctx.strokeStyle = mau; ctx.globalAlpha = D.xuyen ? 0.55 : 0.28; ctx.lineWidth = D.xuyen ? 3 : 1.5;
                    ctx.beginPath(); ctx.moveTo(D.x, D.y); ctx.lineTo(D.x - D.vx * (D.xuyen ? 4 : 2.5), D.y - D.vy * (D.xuyen ? 4 : 2.5)); ctx.stroke();
                    ctx.globalAlpha = 1;
                }
                cusCgVeTen(D.x, D.y, a, 26, mau, D.xuyen && !D.roi && !D.cam);
                ctx.globalAlpha = 1;
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cusCgVe.1

// index.html:65299 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusCgVeCung.1 EDITABLE
function cusCgVeCung(ng){
            if (!ng || ng.ammoType !== CUS_DAN || !cusCgBat()) return;
            let pos = ng.getShootPos(), d = pos.dir < 0 ? -1 : 1;
            let t = ng.cusCgKeo ? (ng.cusCgT || 0) : 0, u = Math.min(1, t / CUS_CG_XUYEN), n = Math.max(1, Math.min(cusCgMax(), ng.cusCgTen || 1));
            let mau = cusCgMau(ng.cusCgKeo ? cusCgDmg(t) : 1);
            let bx = pos.x - d * 4, by = pos.y, H = 26, keo = 4 + 16 * u, cong = 9 + 5 * u;
            ctx.save();
            // than cung: hai canh cong ve phia truoc, uon them khi keo
            ctx.strokeStyle = "#5D4037"; ctx.lineWidth = 3.5; ctx.lineCap = "round";
            ctx.beginPath(); ctx.moveTo(bx, by - H); ctx.quadraticCurveTo(bx + d * cong * 2, by, bx, by + H); ctx.stroke();
            ctx.strokeStyle = "#A1887F"; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(bx, by - H); ctx.quadraticCurveTo(bx + d * cong * 2 - d * 2, by, bx, by + H); ctx.stroke();
            // day cung keo ve sau
            let sx = bx - d * keo;
            ctx.strokeStyle = "rgba(236,239,241,0.9)"; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(bx, by - H + 1); ctx.lineTo(sx, by); ctx.lineTo(bx, by + H - 1); ctx.stroke();
            // cac mui ten dat tren day (toa nhe)
            let b = cusCgGoc();
            for (let i = 0; i < n; i++){
                let a = (d > 0 ? 0 : Math.PI) + (i - (n - 1) / 2) * b * d * 1.2;
                cusCgVeTen(sx + Math.cos(a) * 32, by + Math.sin(a) * 32, a, 32, mau, false, "#D7CCC8");
            }
            // nac keo: loe sang o moi moc
            if (ng.cusCgKeo && t >= CUS_CG_FULL){
                ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = mau; ctx.globalAlpha = 0.18 + 0.12 * Math.sin(frames * 0.4);
                ctx.beginPath(); ctx.arc(bx + d * 6, by, 16 + 8 * u, 0, Math.PI * 2); ctx.fill();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cusCgVeCung.1

// index.html:65341 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_AC_HOI.1 EDITABLE
const CUS_AC_HOI = 60;
// PLAYER_PART_END s4.CUS_AC_HOI.1

// index.html:65342 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_AC_NAC.1 EDITABLE
const CUS_AC_NAC = [
            { t:   0, dmg: 3, tuong: 3, R: 8,  day: 0.5, luc: 13 },
            { t:  45, dmg: 4, tuong: 3, R: 12, day: 0.5, luc: 15 },
            { t:  90, dmg: 5, tuong: 4, R: 16, day: 0.5, luc: 17 },
            { t: 120, dmg: 6, tuong: 4, R: 0,  day: 0.5, luc: 20 },
            { t: 180, dmg: 7, tuong: 5, R: 0,  day: 1,   luc: 24 }
        ];
// PLAYER_PART_END s4.CUS_AC_NAC.1

// index.html:65349 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_AC_MIEN.1 EDITABLE
const CUS_AC_MIEN = 90;
// PLAYER_PART_END s4.CUS_AC_MIEN.1

// index.html:65350 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_AC_KHONG_NGAT.1 EDITABLE
const CUS_AC_KHONG_NGAT = /enter|wake|dying|phase|split|gate|chaos|ult|sdt|transform|intro|return|revive|hoi|chet|death|stun|choang|stagger|_ne$/i;
// PLAYER_PART_END s4.CUS_AC_KHONG_NGAT.1

// index.html:65351 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcNo.1 EDITABLE
let cusAcNo = [];
// PLAYER_PART_END s4.cusAcNo.1

// index.html:65352 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcDs.1 EDITABLE
let cusAcDs = [];
// PLAYER_PART_END s4.cusAcDs.1

// index.html:65353 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcBat.1 EDITABLE
function cusAcBat(){ return typeof cusCapCua === 'function' && cusCapCua('khicong') > 0; }
// PLAYER_PART_END s4.cusAcBat.1

// index.html:65354 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcNacTu.1 EDITABLE
function cusAcNacTu(giu){ let lv = 0; for (let i = 1; i < CUS_AC_NAC.length; i++) if (giu >= CUS_AC_NAC[i].t) lv = i; return lv; }
// PLAYER_PART_END s4.cusAcNacTu.1

// index.html:65355 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcBan.1 EDITABLE
function cusAcBan(ng, lv){
            let N = CUS_AC_NAC[lv], p = ng.getShootPos(), dir = p.dir < 0 ? -1 : 1;
            let x0 = (typeof camX === 'number') ? camX : 0, W = canvas.width;
            let R = N.R > 0 ? N.R * CM : Math.max(80, (dir > 0 ? (x0 + W - p.x) : (p.x - x0)) + 40);
            cusAcNo.push({ ng: ng, x: p.x, y: p.y, dir: dir, R: R, day: R * N.day, lv: lv, front: 0, trung: new Set(), t: 0, cap: Math.max(1, cusAcCap()),
                           rong: N.R > 0 ? 0.55 : 0.8 });
            if (typeof novaCo === 'function' && novaCo(ng)) novaAcBan(ng, p, dir);   // @@HE-NOVA2: song sieu nen
            shakeTimer = Math.max(shakeTimer, 4 + lv * 4);
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(120 + lv * 20, 0.25, 'sawtooth', 0.22 + lv * 0.03, 50); SFX.tone(600, 0.08, 'triangle', 0.10, 200); }
            if (lv > 0) floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 34, LT("KHÍ CÔNG PHÁO ×", "AIR CANNON ×") + lv));
        }
// PLAYER_PART_END s4.cusAcBan.1

// index.html:65370 · Phạm vi: global
// PLAYER_PART_BEGIN s4.NOVA_AC_TOC.1 EDITABLE
const NOVA_AC_TOC = 22, NOVA_AC_DMG = 2, NOVA_AC_NO = 3, NOVA_AC_R = 70;
// PLAYER_PART_END s4.NOVA_AC_TOC.1

// index.html:65371 · Phạm vi: global
// PLAYER_PART_BEGIN s4.novaAcSong.1 EDITABLE
let novaAcSong = [];
// PLAYER_PART_END s4.novaAcSong.1

// index.html:65372 · Phạm vi: global
// PLAYER_PART_BEGIN s4.novaAcBan.1 EDITABLE
function novaAcBan(ng, p, dir){ novaAcSong.push({ ng: ng, x: p.x, y: p.y, dir: dir, t: 0, trung: new Set(), vet: [] }); }
// PLAYER_PART_END s4.novaAcBan.1

// index.html:65373 · Phạm vi: global
// PLAYER_PART_BEGIN s4.novaAcTick.1 EDITABLE
function novaAcTick(){
            if (!novaAcSong.length) return;
            let L = (typeof camX === 'number') ? camX : 0, Rr = L + canvas.width;
            for (let i = novaAcSong.length - 1; i >= 0; i--){
                let S = novaAcSong[i]; S.t++;
                S.vet.push(S.x); if (S.vet.length > 6) S.vet.shift();
                S.x += S.dir * NOVA_AC_TOC;
                let hop = { x: S.x - 18, y: S.y - 16, w: 36, h: 32 };
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || S.trung.has(o) || o.invulnAll || o.hp === undefined || o.hp <= 0 || !checkAABB(hop, o)) continue;
                    S.trung.add(o);
                    if (typeof dealDamage === 'function') dealDamage(o, NOVA_AC_DMG, 'ammo'); else o.hp -= NOVA_AC_DMG;
                    visualEffects.push(new Effect(S.x, S.y, 'parry', S.dir > 0));
                }
                let tuong = (S.dir > 0 && S.x >= Rr - 10) || (S.dir < 0 && S.x <= L + 10);
                if (tuong || S.t > 150){
                    let x = Math.max(L + 10, Math.min(Rr - 10, S.x));
                    if (tuong){
                        let r = { x: x - NOVA_AC_R, y: S.y - NOVA_AC_R, w: NOVA_AC_R * 2, h: NOVA_AC_R * 2 };
                        if (typeof allTargets === 'function') for (let o of allTargets()){
                            if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0 || !checkAABB(r, o)) continue;
                            if (typeof dealDamage === 'function') dealDamage(o, NOVA_AC_NO, 'flat'); else o.hp -= NOVA_AC_NO;
                        }
                        visualEffects.push(new Effect(x, S.y, 'explosion', true, NOVA_AC_R));
                        visualEffects.push(new Effect(x, S.y, 'exp_blue', true, NOVA_AC_R * 0.7));
                        shakeTimer = Math.max(shakeTimer, 14);
                        if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(70, 0.3, 'square', 0.22, 40); SFX.tone(900, 0.1, 'triangle', 0.12, 300); }
                    }
                    novaAcSong.splice(i, 1);
                }
            }
        }
// PLAYER_PART_END s4.novaAcTick.1

// index.html:65405 · Phạm vi: global
// PLAYER_PART_BEGIN s4.novaAcVe.1 EDITABLE
function novaAcVe(){
            if (!novaAcSong.length) return;
            ctx.save();
            for (let S of novaAcSong){
                // vet khi nen phia sau
                for (let k = 0; k < S.vet.length; k++){
                    ctx.globalAlpha = 0.08 + 0.05 * k; ctx.fillStyle = "#B3E5FC";
                    ctx.beginPath(); ctx.ellipse(S.vet[k], S.y, 10 + k, 7 + k * 0.6, 0, 0, 6.28); ctx.fill();
                }
                let p = 0.5 + 0.5 * Math.sin(S.t * 0.8);
                ctx.globalAlpha = 0.5; ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = 2;
                for (let k = 0; k < 3; k++){ ctx.beginPath(); ctx.ellipse(S.x - S.dir * k * 9, S.y, 6 + k * 3, 12 + k * 4 + p * 2, 0, 0, 6.28); ctx.stroke(); }
                ctx.globalAlpha = 1; ctx.fillStyle = "#FFFFFF"; ctx.shadowColor = "#81D4FA"; ctx.shadowBlur = 12;
                ctx.beginPath(); ctx.ellipse(S.x, S.y, 11, 8, 0, 0, 6.28); ctx.fill();
                ctx.shadowBlur = 0; ctx.fillStyle = "#4FC3F7"; ctx.beginPath(); ctx.ellipse(S.x, S.y, 5, 4, 0, 0, 6.28); ctx.fill();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.novaAcVe.1

// index.html:65423 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcNgat.1 EDITABLE
function cusAcNgat(o){
            if (typeof bosses === 'undefined' || bosses.indexOf(o) < 0) return false;
            if (o.dying || o.invulnAll || (o._acMien || 0) > frames) return false;
            // @@HE-MMX-AC: boss tu lo viec bi ngat (X, Zero — hai tang, khong co toIdle)
            if (typeof o.acNgat === 'function'){ if (!o.acNgat()) return false; o._acMien = frames + CUS_AC_MIEN; return true; }
            let coToIdle = typeof o.toIdle === 'function';
            if (!coToIdle && !('actionTimer' in o)) return false;
            let st = String(o.state || '');
            if (!st || st === 'idle' || CUS_AC_KHONG_NGAT.test(st) || o.phase === 'transition') return false;
            o._acMien = frames + CUS_AC_MIEN;
            if (Array.isArray(o.chuoi)) o.chuoi.length = 0;
            o.slash = null; o.tel = null;
            if ('chain' in o) o.chain = null;
            if (coToIdle){ try { o.toIdle(26); } catch(e){} }
            else { o.state = 'idle'; o.subTimer = 0; o.actionTimer = Math.max(o.actionTimer || 0, 30); }   // boss cu khong co toIdle
            return true;
        }
// PLAYER_PART_END s4.cusAcNgat.1

// index.html:65450 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_AC_PHAN_TOC.1 EDITABLE
const CUS_AC_PHAN_TOC = 14;
// PLAYER_PART_END s4.CUS_AC_PHAN_TOC.1

// index.html:65451 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcPhan.1 EDITABLE
let cusAcPhan = [];
// PLAYER_PART_END s4.cusAcPhan.1

// index.html:65452 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcCap.1 EDITABLE
function cusAcCap(){ return typeof cusCapCua === 'function' ? cusCapCua('khicong') : 0; }
// PLAYER_PART_END s4.cusAcCap.1

// index.html:65453 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcTrung.1 EDITABLE
function cusAcTrung(B, o){
            let N = CUS_AC_NAC[B.lv], cx = o.x + (o.w || 20) / 2, cy = o.y + (o.h || 20) / 2, cap = B.cap || 1;
            if (gameState === 'pvp'){ if (o.takeDamage) o.takeDamage(Math.min(3, N.dmg)); return; }
            let dx = (cx - B.x) * B.dir, parry = dx <= B.day;
            cusChDanh(o, N.dmg + (parry && cap >= 3 ? 1 : 0));
            if (parry && o.hp > 0){
                // PARRY: day lui + ngat hanh dong
                visualEffects.push(new Effect(cx - B.dir * (o.w || 20) / 2, cy, 'parry', B.dir > 0));
                let ngat = cusAcNgat(o);
                if (ngat) floatingTexts.push(new FloatingText(cx - 18, o.y - 30, LT("NGẮT!", "BROKEN!")));
                let sieu = cap >= 3 && B.lv >= CUS_AC_NAC.length - 1;       // cap 3 + sac du: luc day KHONG LO
                o._acDay = { v: B.dir * (sieu ? 62 : N.luc), t: sieu ? 48 : 16, k: sieu ? 0.94 : 0.86,
                             tuong: N.tuong + (cap >= 3 ? 2 : 0), dap: false };
                if (cusAcDs.indexOf(o) < 0) cusAcDs.push(o);
            }
        }
// PLAYER_PART_END s4.cusAcTrung.1

// index.html:65469 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcTrongVung.1 EDITABLE
function cusAcTrongVung(B, px, py){
            let dx = (px - B.x) * B.dir;
            if (dx < -24 || dx > Math.min(B.front, B.R) || dx > B.day) return false;
            return Math.abs(py - B.y) <= 46 + Math.max(0, dx) * B.rong;
        }
// PLAYER_PART_END s4.cusAcTrongVung.1

// index.html:65475 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcDan.1 EDITABLE
function cusAcDan(B){
            if (typeof bossProjectiles !== 'undefined'){
                for (let j = bossProjectiles.length - 1; j >= 0; j--){
                    let bp = bossProjectiles[j];
                    if (!bp || (bp.w || 0) > 140 || (bp.h || 0) > 140) continue;
                    let px = bp.x + (bp.w || 0) / 2, py = bp.y + (bp.h || 0) / 2;
                    if (!cusAcTrongVung(B, px, py)) continue;
                    bossProjectiles.splice(j, 1);
                    if (B.cap >= 3){
                        let sp = Math.max(CUS_AC_PHAN_TOC, Math.hypot(bp.vx || 0, bp.vy || 0) * 1.3);
                        bp.vx = B.dir * sp; bp.vy = (bp.vy || 0) * 0.2;
                        cusAcPhan.push({ bp: bp, dmg: Math.max(2, bp.dmg || 1), trung: new Set(), t: 0 });
                        visualEffects.push(new Effect(px, py, 'parry', B.dir > 0));
                    } else {
                        visualEffects.push(new Effect(px, py, 'explosion', true, 12));
                    }
                }
            }
            if (typeof bosses === 'undefined' || typeof DO_VO_VAT === 'undefined') return;
            // @@HE-MMX-AC: boss co mang dan RIENG (X, Zero) tu pha / thoi nguoc dan cua minh
            for (const b of bosses) if (b && !b.dying && typeof b.acDan === 'function') b.acDan(B, (x, y) => cusAcTrongVung(B, x, y));
            for (const b of bosses){
                if (!b) continue;
                for (const key in DO_VO_VAT){
                    let ar = b[key]; if (!Array.isArray(ar) || !ar.length) continue;
                    let C = DO_VO_VAT[key];
                    for (let j = ar.length - 1; j >= 0; j--){
                        let g = ar[j];
                        if (!g || g.dead || typeof g.x !== 'number' || typeof g.y !== 'number') continue;
                        if (C.dk && !C.dk(g)) continue;
                        if (!cusAcTrongVung(B, g.x, g.y)) continue;
                        g.dead = true; if (g.hp !== undefined) g.hp = 0; g.life = 0;
                        ar.splice(j, 1);
                        visualEffects.push(new Effect(g.x, g.y, 'explosion', true, 14));
                    }
                }
            }
        }
// PLAYER_PART_END s4.cusAcDan.1

// index.html:65515 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcThoiVat.1 EDITABLE
function cusAcThoiVat(x, y, r, dmg, dir, ve){
            let bp = { x: x - r, y: y - r, w: r * 2, h: r * 2, vx: dir * CUS_AC_PHAN_TOC, vy: 0, dmg: dmg, isPiercing: false,
                       draw(){ try { ve(this.x + this.w / 2, this.y + this.h / 2); } catch(e){} } };
            cusAcPhan.push({ bp: bp, dmg: Math.max(2, dmg), trung: new Set(), t: 0 });
            visualEffects.push(new Effect(x, y, 'parry', dir > 0));
        }
// PLAYER_PART_END s4.cusAcThoiVat.1

// index.html:65521 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcPhanTick.1 EDITABLE
function cusAcPhanTick(){
            if (!cusAcPhan.length) return;
            let ds = (typeof allTargets === 'function') ? allTargets() : [];
            let L = ((typeof camX === 'number') ? camX : 0);
            for (let i = cusAcPhan.length - 1; i >= 0; i--){
                let P = cusAcPhan[i], bp = P.bp; P.t++;
                bp.x += bp.vx; bp.y += bp.vy;
                let het = false;
                for (let o of ds){
                    if (!o || P.trung.has(o) || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (!checkAABB(bp, o)) continue;
                    P.trung.add(o); cusChDanh(o, P.dmg);
                    visualEffects.push(new Effect(bp.x + (bp.w || 0) / 2, bp.y + (bp.h || 0) / 2, 'explosion', true, 16));
                    if (!bp.isPiercing){ het = true; break; }
                }
                if (het || P.t > 150 || bp.x < L - 80 || bp.x > L + canvas.width + 80 || bp.y < -400 || bp.y > 700) cusAcPhan.splice(i, 1);
            }
        }
// PLAYER_PART_END s4.cusAcPhanTick.1

// index.html:65539 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcPhanVe.1 EDITABLE
function cusAcPhanVe(){
            if (!cusAcPhan.length) return;
            for (let P of cusAcPhan){
                let bp = P.bp;
                try { if (typeof bp.draw === 'function') bp.draw(); } catch(e){}
                ctx.save(); ctx.globalAlpha = 0.8; ctx.strokeStyle = '#E1F5FE'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(bp.x + (bp.w || 0) / 2, bp.y + (bp.h || 0) / 2, Math.max(8, (bp.w || 12) * 0.7), 0, 6.28); ctx.stroke();
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.cusAcPhanVe.1

// index.html:65549 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcTick.1 EDITABLE
function cusAcTick(){
            cusAcPhanTick();
            novaAcTick();   // @@HE-NOVA2
            if (!cusAcNo.length && !cusAcDs.length) return;
            let ds = null;
            for (let i = cusAcNo.length - 1; i >= 0; i--){
                let B = cusAcNo[i]; B.t++;
                B.front += 40 + B.lv * 2;
                if (ds === null) ds = (gameState === 'pvp') ? [((typeof pvpDich === 'function') ? pvpDich(B.ng) : null)]
                                                            : ((typeof allTargets === 'function') ? allTargets() : []);
                for (let o of ds){
                    if (!o || o === B.ng || B.trung.has(o) || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    let cx = o.x + (o.w || 20) / 2, cy = o.y + (o.h || 20) / 2;
                    let dx = (cx - B.x) * B.dir, gan = (o.w || 20) / 2;
                    if (dx < -gan - 10 || dx - gan > Math.min(B.front, B.R)) continue;
                    let xoe = 36 + Math.max(0, dx) * B.rong;
                    if (Math.abs(cy - B.y) > xoe + (o.h || 20) / 2) continue;
                    B.trung.add(o); cusAcTrung(B, o);
                }
                if ((B.cap || 1) >= 2 && gameState !== 'pvp') cusAcDan(B);     // @@HE-CUSAC2
                if (B.front > B.R + 60) cusAcNo.splice(i, 1);
            }
            // day lui + dap tuong
            let L = ((typeof camX === 'number') ? camX : 0), Rr = L + canvas.width;
            for (let i = cusAcDs.length - 1; i >= 0; i--){
                let o = cusAcDs[i], A = o && o._acDay;
                if (!o || !A || o.hp === undefined || o.hp <= 0){ if (o) o._acDay = null; cusAcDs.splice(i, 1); continue; }
                o.x += A.v; A.v *= (A.k || 0.86); A.t--;
                if (!A.dap && ((A.v < 0 && o.x <= L + 60) || (A.v > 0 && o.x + (o.w || 20) >= Rr - 60)) && Math.abs(A.v) > 3){
                    A.dap = true;
                    if (typeof dealDamage === 'function') dealDamage(o, A.tuong, 'flat'); else o.hp -= A.tuong;
                    let cx = A.v < 0 ? o.x : o.x + (o.w || 20), cy = o.y + (o.h || 20) / 2;
                    visualEffects.push(new Effect(cx, cy, 'explosion', true, 34));
                    floatingTexts.push(new FloatingText(cx - 20, o.y - 18, LT("ĐẬP TƯỜNG +", "WALL SLAM +") + A.tuong));
                    shakeTimer = Math.max(shakeTimer, 14);
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(90, 0.2, 'square', 0.2, 40);
                    A.t = 0;
                }
                if (A.t <= 0){ o._acDay = null; cusAcDs.splice(i, 1); }
            }
        }
// PLAYER_PART_END s4.cusAcTick.1

// index.html:65590 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusAcVe.1 EDITABLE
function cusAcVe(){
            cusAcPhanVe();
            novaAcVe();     // @@HE-NOVA2
            if (!cusAcNo.length) return;
            ctx.save();
            for (let B of cusAcNo){
                let f = Math.min(B.front, B.R), a = Math.max(0, 1 - B.front / (B.R + 60));
                // non khi mo nhat
                ctx.globalAlpha = 0.10 * a + 0.04;
                ctx.fillStyle = '#E1F5FE';
                ctx.beginPath(); ctx.moveTo(B.x, B.y - 30); ctx.lineTo(B.x + B.dir * f, B.y - 36 - f * B.rong);
                ctx.lineTo(B.x + B.dir * f, B.y + 36 + f * B.rong); ctx.lineTo(B.x, B.y + 30); ctx.closePath(); ctx.fill();
                // cac vong song khi o mat song va phia sau
                for (let k = 0; k < 4; k++){
                    let d = f - k * 34; if (d < 10) continue;
                    let h = 36 + d * B.rong;
                    ctx.globalAlpha = (0.75 - k * 0.17) * (0.35 + 0.65 * a);
                    ctx.strokeStyle = k === 0 ? '#FFFFFF' : '#B3E5FC'; ctx.lineWidth = 5 - k + B.lv * 0.6;
                    ctx.beginPath(); ctx.ellipse(B.x + B.dir * d, B.y, Math.max(4, h * 0.22), h, 0, B.dir > 0 ? -1.35 : Math.PI - 1.35, B.dir > 0 ? 1.35 : Math.PI + 1.35); ctx.stroke();
                }
                // vong mieng phao
                if (B.t < 12){
                    ctx.globalAlpha = 1 - B.t / 12; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.ellipse(B.x + B.dir * 6, B.y, 6 + B.t * 1.2, 14 + B.t * 3, 0, 0, 6.28); ctx.stroke();
                }
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cusAcVe.1

// index.html:65634 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TLD_SO.1 EDITABLE
const CUS_TLD_SO = 3, CUS_TLD_TOC = 13, CUS_TLD_TRAN = 60;
// PLAYER_PART_END s4.CUS_TLD_SO.1

// index.html:65635 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_BV_SO.1 EDITABLE
const CUS_BV_SO = 10, CUS_BV_TOC = 17, CUS_BV_THOI = 180, CUS_BV_TRAN = 90;
// PLAYER_PART_END s4.CUS_BV_SO.1

// index.html:65636 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TLD_GIAT.1 EDITABLE
const CUS_TLD_GIAT = 24;
// PLAYER_PART_END s4.CUS_TLD_GIAT.1

// index.html:65637 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TLD_KEO.1 EDITABLE
const CUS_TLD_KEO = 18, CUS_TLD_TROI = 42;
// PLAYER_PART_END s4.CUS_TLD_KEO.1

// index.html:65638 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TLD_LAI.1 EDITABLE
const CUS_TLD_LAI = 20;
// PLAYER_PART_END s4.CUS_TLD_LAI.1

// index.html:65639 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTl.1 EDITABLE
let cusTl = null;
// PLAYER_PART_END s4.cusTl.1

// index.html:65640 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TLD_CH.1 EDITABLE
const CUS_TLD_CH = { id:'thienla', xong:true, khongCap:true, ten:'THIÊN LA ĐỊA VÕNG', tenEn:'HEAVEN AND EARTH NET',
            mo:['Giữ K qua mốc: phóng 3 phi tiêu ba hướng, nảy tường mãi. Mỗi lần đập tường để lại một sợi dây mắc vào tường — dây giăng kín map. Phi tiêu vẫn gây sát thương + Chảy máu như kim thường. Nhả K hoặc ăn đòn: GIẬT DÂY — nhiều kẻ địch thì dây chém qua tất cả, sát thương = số dây; một kẻ địch thì dây kéo lại TRÓI rồi CẮT XUYÊN. Mỗi nhát cắt: sát thương = số dây, gắn thêm tối đa 10 stack Chảy máu, rồi toàn bộ Chảy máu 3 giây NỔ MỘT LẦN ngay lập tức.'],
            moEn:['Hold K past the mark: 3 darts fly out in three directions and bounce off the walls forever. Every wall hit leaves a thread strung between walls until the map is caged. Darts still deal damage + Bleed like normal needles. Release K or take a hit: YANK — with many enemies the threads slice through all of them for damage = thread count; with one enemy the threads pull in, BIND it and CUT THROUGH. Every cut deals damage = thread count, adds up to 10 Bleed stacks, then detonates the whole 3-second Bleed at once.'],
            tom:'KHOÁ theo PHI TIÊU. Giữ càng lâu dây càng dày (tối đa 60). Ăn đòn không mất trắng — nó giật dây ngay lúc đó.',
            tomEn:'LOCKED by DARTS. The longer you hold, the denser the net (60 max). A hit does not waste it — it yanks on the spot.' };
// PLAYER_PART_END s4.CUS_TLD_CH.1

// index.html:65645 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TLD_CH.mo.1 EDITABLE
CUS_TLD_CH.mo = [CUS_TLD_CH.mo[0], CUS_TLD_CH.mo[0], CUS_TLD_CH.mo[0]];
// PLAYER_PART_END s4.CUS_TLD_CH.mo.1

// index.html:65645 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TLD_CH.moEn.1 EDITABLE
CUS_TLD_CH.moEn = [CUS_TLD_CH.moEn[0], CUS_TLD_CH.moEn[0], CUS_TLD_CH.moEn[0]];
// PLAYER_PART_END s4.CUS_TLD_CH.moEn.1

// index.html:65646 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_BV_ULT.1 EDITABLE
const CUS_BV_ULT = { id:'baovu', khongCap:true, ten:'BẠO VŨ LÊ HOA CHÂM', tenEn:'STORM OF PEAR-BLOSSOM NEEDLES',
            mo:['10 phi tiêu toả ra mọi hướng, nảy tường giăng kín map trong 3 giây rồi tự GIẬT DÂY: một kẻ địch thì trói rồi cắt xuyên, nhiều kẻ địch thì chém qua tất cả. Mỗi nhát cắt = số dây + tối đa 10 stack Chảy máu, rồi Chảy máu 3 giây nổ một lần.'],
            moEn:['10 darts burst out in every direction, bounce and cage the map for 3 seconds, then YANK on their own: one enemy is bound and cut through, many enemies are all sliced. Every cut = thread count + up to 10 Bleed stacks, then the 3-second Bleed detonates at once.'],
            tom:'KHOÁ theo PHI TIÊU. Dùng lúc đang giăng Thiên La thì thêm 10 phi tiêu vào cùng lưới.',
            tomEn:'LOCKED by DARTS. Used while a Heaven and Earth Net is up, it adds 10 darts to the same net.' };
// PLAYER_PART_END s4.CUS_BV_ULT.1

// index.html:65651 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_BV_ULT.mo.1 EDITABLE
CUS_BV_ULT.mo = [CUS_BV_ULT.mo[0], CUS_BV_ULT.mo[0], CUS_BV_ULT.mo[0]];
// PLAYER_PART_END s4.CUS_BV_ULT.mo.1

// index.html:65651 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_BV_ULT.moEn.1 EDITABLE
CUS_BV_ULT.moEn = [CUS_BV_ULT.moEn[0], CUS_BV_ULT.moEn[0], CUS_BV_ULT.moEn[0]];
// PLAYER_PART_END s4.CUS_BV_ULT.moEn.1

// index.html:65652 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlKhung.1 EDITABLE
function cusTlKhung(){
            let x0 = (typeof camX === 'number') ? camX : 0, y0 = (typeof camY === 'number') ? camY : 0;
            let day = (typeof mapTheme !== 'undefined' && mapTheme === 'ocean' && typeof BIEN_DAY !== 'undefined') ? BIEN_DAY : 320;
            return { L: x0 + 3, R: x0 + canvas.width - 3, T: y0 + 3, D: day };
        }
// PLAYER_PART_END s4.cusTlKhung.1

// index.html:65657 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlMucTieu.1 EDITABLE
function cusTlMucTieu(ng){
            if (gameState === 'pvp'){ let d = (typeof pvpDich === 'function') ? pvpDich(ng) : null; return d ? [d] : []; }
            let ds = (typeof allTargets === 'function') ? allTargets() : [];
            return ds.filter(o => o && o !== ng && !o.invulnAll && o.hp !== undefined && o.hp > 0);
        }
// PLAYER_PART_END s4.cusTlMucTieu.1

// index.html:65662 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlLuoi.1 EDITABLE
function cusTlLuoi(){
            if (!cusTl) cusTl = { kim: [], day: [], pha: 'giang', t: 0, tran: CUS_TLD_TRAN, tuGiat: 0, giu: false, muc: null, ve: [] };
            return cusTl;
        }
// PLAYER_PART_END s4.cusTlLuoi.1

// index.html:65666 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlPhong.1 EDITABLE
function cusTlPhong(ng, goc, toc){
            let N = cusTlLuoi(), p = ng.getShootPos();
            N.kim.push({ x: p.x, y: p.y, vx: Math.cos(goc) * toc, vy: Math.sin(goc) * toc, neo: null, trung: new Map(), spin: Math.random() * 6 });
        }
// PLAYER_PART_END s4.cusTlPhong.1

// index.html:65670 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlVao.1 EDITABLE
function cusTlVao(ng){
            let N = cusTlLuoi();
            if (N.pha !== 'giang') return;
            N.giu = true; N.chu = ng;   // @@HE-PVPCUS
            let dir = ng.isFacingLeft ? -1 : 1;
            for (let a of [-0.5, -1.5708, -2.55]) cusTlPhong(ng, dir > 0 ? a : Math.PI - a, CUS_TLD_TOC);
            floatingTexts.push(new FloatingText(ng.x - 50, ng.y - 40, LT("THIÊN LA ĐỊA VÕNG!", "HEAVEN AND EARTH NET!")));
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(2400, 0.08, 'triangle', 0.12, 3400); SFX.tone(1600, 0.08, 'triangle', 0.10, 2600); }
        }
// PLAYER_PART_END s4.cusTlVao.1

// index.html:65679 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlNha.1 EDITABLE
function cusTlNha(ng){
            if (!cusTl) return;
            cusTl.giu = false;
            if (!(cusTl.tuGiat > 0)) cusTlGiat(ng);      // chieu cuoi dang giang thi de no tu giat dung 3 giay
        }
// PLAYER_PART_END s4.cusTlNha.1

// index.html:65684 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusBvNo.1 EDITABLE
function cusBvNo(ng){
            let N = cusTlLuoi();
            if (N.pha !== 'giang') return false;
            N.tran = CUS_BV_TRAN; N.tuGiat = CUS_BV_THOI; N.chu = ng;   // @@HE-PVPCUS
            let a0 = Math.random() * 6.28;
            for (let i = 0; i < CUS_BV_SO; i++) cusTlPhong(ng, a0 + i * 6.2832 / CUS_BV_SO, CUS_BV_TOC);
            floatingTexts.push(new FloatingText(ng.x - 70, ng.y - 50, LT("BẠO VŨ LÊ HOA CHÂM!", "STORM OF PEAR-BLOSSOM NEEDLES!")));
            shakeTimer = Math.max(shakeTimer, 14);
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(2800, 0.3, 'triangle', 0.14, 4200); SFX.tone(700, 0.4, 'sine', 0.12, 1400); }
            return true;
        }
// PLAYER_PART_END s4.cusBvNo.1

// index.html:65700 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TLD_MAU.1 EDITABLE
const CUS_TLD_MAU = 10;
// PLAYER_PART_END s4.CUS_TLD_MAU.1

// index.html:65701 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlNo.1 EDITABLE
function cusTlNo(soDay, nCu){ let them = Math.min(soDay, CUS_TLD_MAU), n = (nCu || 0) + them;
                                      return { them: them, n: n, no: cusPtDps(n) * CUS_PT_CHAY / 60 }; }
// PLAYER_PART_END s4.cusTlNo.1

// index.html:65703 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlCat.1 EDITABLE
function cusTlCat(o, soDay){
            if (!o || o.hp === undefined || o.hp <= 0) return 0;
            cusTlDanh(o, soDay);
            if (o.hp <= 0) return soDay;
            let M = o._cusMau || (o._cusMau = { n: 0, t: 0, nhip: 0 });
            let K = cusTlNo(soDay, M.n);
            M.n = K.n; M.t = 0;
            let i = cusPtChay.indexOf(o); if (i >= 0) cusPtChay.splice(i, 1);
            /* @@HE-PVPCUS — PvP truoc day cat xong la thoi: khong chay mau, khong no. Gio no dung luat PvE,
               sat thuong qua he so PvP cua nguoi giang luoi. */
            if (gameState === 'pvp'){ if (K.no > 0) cusPvpDanh(cusTlChu(), o, K.no); }
            else if (K.no > 0){ if (typeof dealDamage === 'function') dealDamage(o, K.no, 'flat'); else o.hp -= K.no; }
            let cx = o.x + (o.w || 20) / 2;
            floatingTexts.push(new FloatingText(cx - 10, o.y - 8, "🩸 " + K.no));
            return soDay + K.no;
        }
// PLAYER_PART_END s4.cusTlCat.1

// index.html:65719 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlGiat.1 EDITABLE
function cusTlGiat(ng){
            let N = cusTl; if (!N || N.pha !== 'giang') return;
            N.giu = false; N.tuGiat = 0; N.t = 0;
            for (let k of N.kim) N.ve.push({ x: k.x, y: k.y, t: 0 });   // phi tieu bay ve tay
            N.kim = [];
            if (!N.day.length){ N.pha = 'het'; return; }
            let ds = cusTlMucTieu(ng);
            for (let d of N.day){ d.ox1 = d.x1; d.oy1 = d.y1; d.ox2 = d.x2; d.oy2 = d.y2; }
            if (ds.length === 1){
                let o = ds[0]; N.pha = 'troi'; N.muc = o; N.ghim = { x: o.x, y: o.y };
                let cx = o.x + (o.w || 20) / 2, W = (o.w || 20), Hh = (o.h || 20);
                N.day.forEach((d, i) => {                           // moi soi QUAN CHEO qua than muc tieu nhu mot tam luoi siet
                    let r1 = (i * 0.37 + 0.1) % 1, r2 = (i * 0.61 + 0.35) % 1;
                    if (i % 3 === 0){ d.tx1 = o.x + r1 * W; d.ty1 = o.y - 4; d.tx2 = o.x + r2 * W; d.ty2 = o.y + Hh + 4; }
                    else if (i % 2){ d.tx1 = o.x - 4; d.ty1 = o.y + r1 * Hh; d.tx2 = o.x + W + 4; d.ty2 = o.y + r2 * Hh; }
                    else { d.tx1 = o.x + W + 4; d.ty1 = o.y + r1 * Hh; d.tx2 = o.x - 4; d.ty2 = o.y + r2 * Hh; }
                });
                floatingTexts.push(new FloatingText(cx - 20, o.y - 30, LT("TRÓI!", "BOUND!")));
            } else {
                N.pha = 'giat';
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1900, 0.12, 'sawtooth', 0.12, 500);
            }
        }
// PLAYER_PART_END s4.cusTlGiat.1

// index.html:65742 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_TLD_PVP.1 EDITABLE
const CUS_TLD_PVP = 30;
// PLAYER_PART_END s4.CUS_TLD_PVP.1

// index.html:65743 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlChu.1 EDITABLE
function cusTlChu(){ return (cusTl && cusTl.chu) || ((typeof dino !== 'undefined') ? dino : null); }
// PLAYER_PART_END s4.cusTlChu.1

// index.html:65744 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlDanh.1 EDITABLE
function cusTlDanh(o, dmg){
            if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) return;
            if (gameState === 'pvp'){ cusPvpDanh(cusTlChu(), o, Math.min(CUS_TLD_PVP, dmg)); return; }   // @@HE-PVPCUS
            cusChDanh(o, dmg);
        }
// PLAYER_PART_END s4.cusTlDanh.1

// index.html:65749 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlTick.1 EDITABLE
function cusTlTick(){
            let N = cusTl; if (!N) return;
            let ng = (typeof dino !== 'undefined') ? dino : null;
            if (!ng || !cusPtBat()){ cusTl = null; return; }
            let pcx = ng.x + ng.w / 2, pcy = ng.y + ng.h / 2;
            for (let i = N.ve.length - 1; i >= 0; i--){            // phi tieu bay ve
                let v = N.ve[i]; v.t++;
                v.x += (pcx - v.x) * 0.25; v.y += (pcy - v.y) * 0.25;
                if (v.t > 14) N.ve.splice(i, 1);
            }
            if (N.pha === 'giang'){
                if (N.tuGiat > 0 && --N.tuGiat === 0){ cusTlGiat(ng); return; }
                let B = cusTlKhung(), ds = null;
                for (let k of N.kim){
                    let x0 = k.x, y0 = k.y; k.x += k.vx; k.y += k.vy; k.spin += 0.6;
                    let dap = false;
                    if (k.x < B.L){ k.x = B.L; k.vx = Math.abs(k.vx); dap = true; }
                    else if (k.x > B.R){ k.x = B.R; k.vx = -Math.abs(k.vx); dap = true; }
                    if (k.y < B.T){ k.y = B.T; k.vy = Math.abs(k.vy); dap = true; }
                    else if (k.y > B.D){ k.y = B.D; k.vy = -Math.abs(k.vy); dap = true; }
                    if (dap){
                        if (k.neo && N.day.length < N.tran && Math.hypot(k.x - k.neo.x, k.y - k.neo.y) > 30)
                            N.day.push({ x1: k.neo.x, y1: k.neo.y, x2: k.x, y2: k.y, t: 0, s: Math.random() });
                        k.neo = { x: k.x, y: k.y };
                        let sp = Math.hypot(k.vx, k.vy), a = Math.atan2(k.vy, k.vx) + (Math.random() - 0.5) * 0.44;
                        // khong de bay gan nhu song song voi tuong (lam day ngan va dan)
                        k.vx = Math.cos(a) * sp; k.vy = Math.sin(a) * sp;
                        if (Math.abs(k.vx) < sp * 0.25) k.vx = Math.sign(k.vx || 1) * sp * 0.25;
                        if (Math.abs(k.vy) < sp * 0.25) k.vy = Math.sign(k.vy || 1) * sp * 0.25;
                        visualEffects.push(new Effect(k.x, k.y, 'parry'));
                        if (typeof SFX !== 'undefined' && SFX.tone && frames % 3 === 0) SFX.tone(3000, 0.03, 'triangle', 0.05, 2200);
                    }
                    if (ds === null) ds = cusTlMucTieu(ng);
                    let hop = { x: Math.min(x0, k.x) - 3, y: Math.min(y0, k.y) - 3, w: Math.abs(k.x - x0) + 6, h: Math.abs(k.y - y0) + 6 };
                    for (let o of ds){
                        if (frames - (k.trung.get(o) || -999) < CUS_TLD_LAI) continue;
                        if (!checkAABB(hop, o)) continue;
                        k.trung.set(o, frames); cusPtDam(o, { ng: ng });   // 1 dmg + 1 stack chay mau, nhu kim thuong
                    }
                }
                for (let d of N.day) d.t++;
                return;
            }
            N.t++;
            if (N.pha === 'giat'){
                let u = Math.min(1, N.t / CUS_TLD_GIAT), e = u * u;
                for (let d of N.day){                               // hai dau day quet ve phia Dino
                    d.x1 = d.ox1 + (pcx - d.ox1) * e; d.y1 = d.oy1 + (pcy - d.oy1) * e;
                    d.x2 = d.ox2 + (pcx - d.ox2) * e; d.y2 = d.oy2 + (pcy - d.oy2) * e;
                }
                if (N.t === 14){
                    let n = N.day.length;
                    for (let o of cusTlMucTieu(ng)){
                        cusTlCat(o, n);     // @@HE-CUSTL2
                        let cx = o.x + (o.w || 20) / 2, cy = o.y + (o.h || 20) / 2;
                        visualEffects.push(new Effect(cx, cy, 'explosion', true, 26));
                        floatingTexts.push(new FloatingText(cx - 16, o.y - 24, "✂ " + n));
                    }
                    shakeTimer = Math.max(shakeTimer, 16);
                    if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(2600, 0.14, 'sawtooth', 0.16, 300); SFX.tone(900, 0.2, 'square', 0.10, 200); }
                }
                if (N.t >= CUS_TLD_GIAT){ cusTl = N.ve.length ? { kim: [], day: [], pha: 'het', t: 0, ve: N.ve } : null; }
                return;
            }
            if (N.pha === 'troi'){
                let o = N.muc;
                if (!o || o.hp === undefined){ cusTl = null; return; }
                let cx = o.x + (o.w || 20) / 2, cy = o.y + (o.h || 20) / 2;
                // day keo lai quan chat, sau do bam theo than muc tieu
                let u = Math.min(1, N.t / CUS_TLD_KEO), e = 1 - (1 - u) * (1 - u);
                let dx = cx - (N.ghim.x + (o.w || 20) / 2), dy = cy - (N.ghim.y + (o.h || 20) / 2);
                for (let d of N.day){
                    d.x1 = d.ox1 + (d.tx1 + dx - d.ox1) * e; d.y1 = d.oy1 + (d.ty1 + dy - d.oy1) * e;
                    d.x2 = d.ox2 + (d.tx2 + dx - d.ox2) * e; d.y2 = d.oy2 + (d.ty2 + dy - d.oy2) * e;
                }
                // GHIM muc tieu tai cho trong luc bi troi (khong ap PvP)
                if (gameState !== 'pvp' && N.t >= CUS_TLD_KEO && o.hp > 0 && !o.dying){ o.x = N.ghim.x; o.y = N.ghim.y; if ('dy' in o) o.dy = 0; if ('dashV' in o) o.dashV = 0; }
                else if (N.t < CUS_TLD_KEO){ N.ghim.x = o.x; N.ghim.y = o.y; }
                if (N.t === CUS_TLD_TROI){
                    let n = N.day.length, dmg = cusTlCat(o, n);     // @@HE-CUSTL2
                    N.catFx = 16;
                    floatingTexts.push(new FloatingText(cx - 30, o.y - 40, LT("CẮT XUYÊN! ", "CUT THROUGH! ") + dmg));
                    visualEffects.push(new Effect(cx, cy, 'explosion', true, 60));
                    shakeTimer = Math.max(shakeTimer, 26);
                    if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(3200, 0.18, 'sawtooth', 0.18, 200); SFX.tone(140, 0.3, 'square', 0.16, 60); }
                }
                if (N.t > CUS_TLD_TROI){ if (--N.catFx <= 0) cusTl = null; }
                return;
            }
            if (N.pha === 'het' && !N.ve.length) cusTl = null;
        }
// PLAYER_PART_END s4.cusTlTick.1

// index.html:65840 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlVeDay.1 EDITABLE
function cusTlVeDay(x1, y1, x2, y2, a, s){
            // soi day manh: vien den + loi trang lech len, va mot diem bong chay doc day
            ctx.globalAlpha = a;
            ctx.strokeStyle = "rgba(15,15,20,0.85)"; ctx.lineWidth = 2.4;
            ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
            ctx.strokeStyle = "rgba(255,255,255,0.85)"; ctx.lineWidth = 0.9;
            ctx.beginPath(); ctx.moveTo(x1, y1 - 0.7); ctx.lineTo(x2, y2 - 0.7); ctx.stroke();
            let p = ((frames * 0.012) + s) % 1;
            let gx = x1 + (x2 - x1) * p, gy = y1 + (y2 - y1) * p;
            ctx.fillStyle = "rgba(255,255,255," + (0.9 * a).toFixed(2) + ")";
            ctx.beginPath(); ctx.arc(gx, gy - 0.5, 1.8, 0, 6.28); ctx.fill();
        }
// PLAYER_PART_END s4.cusTlVeDay.1

// index.html:65852 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlVeKim.1 EDITABLE
function cusTlVeKim(x, y, goc, spin){
            ctx.save(); ctx.translate(x, y); ctx.rotate(goc);
            ctx.strokeStyle = "#CFD8DC"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(8, 0); ctx.stroke();
            ctx.fillStyle = "#ECEFF1"; ctx.beginPath(); ctx.moveTo(8, -1.8); ctx.lineTo(14, 0); ctx.lineTo(8, 1.8); ctx.fill();
            ctx.fillStyle = "#212121"; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(-17, -4); ctx.lineTo(-15, 0); ctx.lineTo(-17, 4); ctx.closePath(); ctx.fill();
            ctx.restore();
        }
// PLAYER_PART_END s4.cusTlVeKim.1

// index.html:65860 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusTlVe.1 EDITABLE
function cusTlVe(){
            let N = cusTl; if (!N) return;
            ctx.save();
            let a = 1;
            if (N.pha === 'troi' && N.t > CUS_TLD_TROI) a = Math.max(0, N.catFx / 16);
            for (let d of N.day){
                let hien = N.pha === 'giang' ? Math.min(1, (d.t + 1) / 8) : 1;
                cusTlVeDay(d.x1, d.y1, d.x2, d.y2, a * hien, d.s);
            }
            // soi day dang keo theo moi phi tieu tu diem neo cuoi
            for (let k of N.kim){
                if (k.neo){ ctx.setLineDash([4, 5]); cusTlVeDay(k.neo.x, k.neo.y, k.x, k.y, 0.55, 0); ctx.setLineDash([]); }
                ctx.globalAlpha = 1; cusTlVeKim(k.x, k.y, Math.atan2(k.vy, k.vx), k.spin);
            }
            for (let v of N.ve){ ctx.globalAlpha = Math.max(0, 1 - v.t / 14); cusTlVeKim(v.x, v.y, frames * 0.8, 0); }
            // vet chem khi cat xuyen
            if (N.pha === 'troi' && N.t > CUS_TLD_TROI && N.muc){
                let o = N.muc, cx = o.x + (o.w || 20) / 2, cy = o.y + (o.h || 20) / 2, k = 1 - N.catFx / 16;
                ctx.globalAlpha = N.catFx / 16; ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 3;
                for (let q = 0; q < 4; q++){
                    let g = q * 0.785 + 0.3, r = 30 + k * 120;
                    ctx.beginPath(); ctx.moveTo(cx - Math.cos(g) * r, cy - Math.sin(g) * r); ctx.lineTo(cx + Math.cos(g) * r, cy + Math.sin(g) * r); ctx.stroke();
                }
            }
            // dong ho chieu cuoi
            if (N.pha === 'giang' && N.tuGiat > 0 && typeof dino !== 'undefined' && dino){
                ctx.globalAlpha = 0.9; ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(dino.x + dino.w / 2, dino.y - 18, 9, -Math.PI / 2, -Math.PI / 2 + 6.2832 * (N.tuGiat / CUS_BV_THOI)); ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cusTlVe.1

// index.html:65902 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_SINH.1 EDITABLE
const CUS_KV_SINH  = 30;
// PLAYER_PART_END s4.CUS_KV_SINH.1

// index.html:65903 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_LUNG.1 EDITABLE
const CUS_KV_LUNG  = 6;
// PLAYER_PART_END s4.CUS_KV_LUNG.1

// index.html:65904 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_THAY.1 EDITABLE
const CUS_KV_THAY  = 60;
// PLAYER_PART_END s4.CUS_KV_THAY.1

// index.html:65905 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_NHIP.1 EDITABLE
const CUS_KV_NHIP  = 15;
// PLAYER_PART_END s4.CUS_KV_NHIP.1

// index.html:65906 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_DMG.1 EDITABLE
const CUS_KV_DMG   = 5;
// PLAYER_PART_END s4.CUS_KV_DMG.1

// index.html:65907 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_TOC.1 EDITABLE
const CUS_KV_TOC   = 24;
// PLAYER_PART_END s4.CUS_KV_TOC.1

// index.html:65908 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_CHANR.1 EDITABLE
const CUS_KV_CHANR = 125;
// PLAYER_PART_END s4.CUS_KV_CHANR.1

// index.html:65909 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_VK_DMG.1 EDITABLE
const CUS_VK_DMG   = 100;
// PLAYER_PART_END s4.CUS_VK_DMG.1

// index.html:65910 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_VK_R.1 EDITABLE
const CUS_VK_R     = 130;
// PLAYER_PART_END s4.CUS_VK_R.1

// index.html:65911 · Phạm vi: global
// PLAYER_PART_BEGIN s4.VK_HIEN.1 EDITABLE
const VK_HIEN = 80, VK_KET = 150, VK_DAM = 176, VK_NO = 196, VK_HET = 250;
// PLAYER_PART_END s4.VK_HIEN.1

// index.html:65912 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKv.1 EDITABLE
let cusKv = { lung: [], du: 0, bay: [], chan: [], khien: null, sinh: 0, cd: 0, nhuom: 0, tran: null, tru: [], thien: [] };
// PLAYER_PART_END s4.cusKv.1

// index.html:65913 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusVk.1 EDITABLE
let cusVk = null;
// PLAYER_PART_END s4.cusVk.1

// index.html:65914 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_VK_ULT.1 EDITABLE
const CUS_VK_ULT = { id:'vankiem', khongCap:true, ten:'VẠN KIẾM QUY TÔNG', tenEn:'TEN THOUSAND SWORDS',
            mo:['Kiếm lấp đầy cả vùng trời, kết thành một thanh kiếm khổng lồ rồi đâm CHÉO từ trên trời xuống kẻ địch: 100 sát thương, lan ra xung quanh chỗ đâm.',
                'Kiếm lấp đầy cả vùng trời, kết thành một thanh kiếm khổng lồ rồi đâm CHÉO từ trên trời xuống kẻ địch: 100 sát thương, lan ra xung quanh chỗ đâm.',
                'Kiếm lấp đầy cả vùng trời, kết thành một thanh kiếm khổng lồ rồi đâm CHÉO từ trên trời xuống kẻ địch: 100 sát thương, lan ra xung quanh chỗ đâm.'],
            moEn:['Swords fill the whole sky, bind into one colossal blade and drive DIAGONALLY down onto the enemy: 100 damage, spreading around the impact.',
                  'Swords fill the whole sky, bind into one colossal blade and drive DIAGONALLY down onto the enemy: 100 damage, spreading around the impact.',
                  'Swords fill the whole sky, bind into one colossal blade and drive DIAGONALLY down onto the enemy: 100 damage, spreading around the impact.'],
            tom:'BỊ KHOÁ bởi KIẾM VŨ — lắp Kiếm Vũ là chiêu cuối bắt buộc thành chiêu này.',
            tomEn:'LOCKED by SWORD DANCE — equipping Sword Dance forces this ultimate.' };
// PLAYER_PART_END s4.CUS_VK_ULT.1

// index.html:65923 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvBat.1 EDITABLE
function cusKvBat(){ return typeof cusCapCua === 'function' && cusCapCua('kiemvu') > 0; }
// PLAYER_PART_END s4.cusKvBat.1

// index.html:65924 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvReset.1 EDITABLE
function cusKvReset(){ cusKv = { lung: [], du: 0, bay: [], chan: [], khien: null, sinh: 0, cd: 0, nhuom: 0, tran: null, tru: [], thien: [] }; cusVk = null; }
// PLAYER_PART_END s4.cusKvReset.1

// index.html:65925 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvO.1 EDITABLE
function cusKvO(i){ if (!cusKv.lung[i]) cusKv.lung[i] = { co: false, t: 0, vao: 0 }; return cusKv.lung[i]; }
// PLAYER_PART_END s4.cusKvO.1

// index.html:65926 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvSoLung.1 EDITABLE
function cusKvSoLung(){ let n = 0; for (let i = 0; i < CUS_KV_LUNG; i++) if (cusKvO(i).co && cusKvO(i).vao >= 1) n++; return n; }
// PLAYER_PART_END s4.cusKvSoLung.1
