// PLAYER_FILE: CUSTOM05
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CUS_DAN, CUS_KV_CHANR, CUS_KV_DMG, CUS_KV_LUNG, CUS_KV_THAY, CUS_KV_TOC, CUS_LZ_TU, CUS_QD_DAC, CUS_QD_GHE, CUS_QD_LAO_GHE, CUS_QD_LAO_MIN, CUS_QD_LAO_SO, CUS_QD_VET, CUS_VK_DMG, CUS_VK_R, Effect, FloatingText, KV_DAN, LT, SFX, VK_DAM, VK_HET, VK_HIEN, VK_KET, VK_NO, allTargets, bossProjectiles, bosses, camX, camY, canvas, checkAABB, ctx, currentAmmoType, cusKv, cusKvBat, cusKvO, cusKvReset, cusKvSoLung, cusLaserBat, cusPvpDanh, cusQdBat, cusQdR, cusQdToc, cusQdVaCham, cusVk, cutBossProjectiles, dealDamage, dino, dino2, doChieu, doChieuCo, doChieuThu, enemies, floatingTexts, frames, gameState, gdVaCham, laCusDan, novaCo, obstacles, parry, projectiles, pvpDich, pvpVoiChu, setCanApDon, setCanDmg, shakeTimer, uniHas, unityOn, visualEffects, worldL, worldR
// index.html:65932 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvViTri.1 EDITABLE
function cusKvViTri(ng, i){
            let dir = ng.isFacingLeft ? -1 : 1, hang = Math.floor(i / 3), cot = i % 3;
            let x = ng.x + ng.w / 2 - dir * (4 + cot * 18 + hang * 8);
            let y = ng.y - 14 - hang * 17 + Math.sin(frames * 0.07 + i) * 2;
            return { x: x, y: y, goc: (dir > 0 ? 0 : Math.PI) - dir * 0.25 };
        }
// PLAYER_PART_END s4.cusKvViTri.1

// index.html:65938 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvViTriDu.1 EDITABLE
function cusKvViTriDu(ng, k){
            let dir = ng.isFacingLeft ? -1 : 1, hang = Math.floor(k / 8), cot = k % 8;
            return { x: ng.x + ng.w / 2 - dir * (cot * 11 - 30 + (hang % 2) * 5), y: ng.y - 64 - hang * 12 + Math.sin(frames * 0.05 + k) * 2,
                     goc: -Math.PI / 2 };
        }
// PLAYER_PART_END s4.cusKvViTriDu.1

// index.html:65943 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvThem.1 EDITABLE
function cusKvThem(ng){
            for (let i = 0; i < CUS_KV_LUNG; i++){ let o = cusKvO(i); if (!o.co){ o.co = true; o.vao = 0; o.tu = 'moi'; return; } }
            cusKv.du++;
        }
// PLAYER_PART_END s4.cusKvThem.1

// index.html:65947 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvLay.1 EDITABLE
function cusKvLay(){   // lay mot thanh tren lung (thanh o hang sau nhat truoc)
            for (let i = CUS_KV_LUNG - 1; i >= 0; i--){ let o = cusKvO(i); if (o.co && o.vao >= 1){ o.co = false; o.t = CUS_KV_THAY; return i; } }
            return -1;
        }
// PLAYER_PART_END s4.cusKvLay.1

// index.html:65951 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvMucTieu.1 EDITABLE
function cusKvMucTieu(ng, x, y){
            if (gameState === 'pvp') return (typeof pvpDich === 'function') ? pvpDich(ng) : null;
            let dir = ng.isFacingLeft ? -1 : 1, tot = null, dT = 1e9;
            let ds = []; if (typeof bosses !== 'undefined') ds = ds.concat(bosses); if (typeof enemies !== 'undefined') ds = ds.concat(enemies);
            for (let o of ds){
                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                let ox = o.x + (o.w||20) / 2, oy = o.y + (o.h||20) / 2;
                if ((ox - x) * dir < -10) continue;
                let d = Math.hypot(ox - x, oy - y); if (d < dT){ dT = d; tot = o; }
            }
            return tot;
        }
// PLAYER_PART_END s4.cusKvMucTieu.1

// index.html:65964 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_CHAN_PVP.1 EDITABLE
let CUS_KV_CHAN_PVP = true;
// PLAYER_PART_END s4.CUS_KV_CHAN_PVP.1

// index.html:65965 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_PHAN.1 EDITABLE
const CUS_KV_PHAN = 4;
// PLAYER_PART_END s4.CUS_KV_PHAN.1

// index.html:65966 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvKhien.1 EDITABLE
function cusKvKhien(ng){
            if (!cusKvBat() || !ng || (ng.id !== 1 && gameState !== 'pvp') || !laCusDan(currentAmmoType)) return false;   // @@HE-PVPCUS
            if (cusKvSoLung() < CUS_KV_LUNG) return false;
            let tu = [];
            for (let i = 0; i < CUS_KV_LUNG; i++){ tu.push(cusKvViTri(ng, i)); let o = cusKvO(i); o.co = false; o.t = CUS_KV_THAY; }
            cusKv.khien = { t: 0, tu: tu };
            ng.invincible = true; ng.invTimer = Math.max(ng.invTimer || 0, 40);
            // @@HE-KVCHAN: PHAN DON — ke dich gan nhat (thuong la con vua lao toi) an 4 sat thuong
            if (gameState !== 'pvp' && typeof allTargets === 'function'){
                let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2, best = null, bd = 1e9;
                for (let o of allTargets()){
                    if (!o || o.hp === undefined || o.hp <= 0 || o.invulnAll) continue;
                    if (typeof obstacles !== 'undefined' && obstacles.indexOf(o) >= 0) continue;
                    let d = Math.hypot((o.x + (o.w||20) / 2) - cx, (o.y + (o.h||20) / 2) - cy) - Math.max(o.w||20, o.h||20) / 2;
                    if (d < bd){ bd = d; best = o; }
                }
                if (best){
                    if (typeof dealDamage === 'function') dealDamage(best, CUS_KV_PHAN, 'flat'); else best.hp -= CUS_KV_PHAN;
                    let bx = best.x + (best.w||20) / 2, by = best.y + (best.h||20) / 2;
                    for (let k = 0; k < 3; k++) cusKv.chan.push({ x0: cx, y0: cy - 20 + k * 20, x: bx, y: by, t: 0 });
                    visualEffects.push(new Effect(bx, by, 'parry'));
                    floatingTexts.push(new FloatingText(bx - 20, by - 30, "-" + CUS_KV_PHAN));
                }
            } else if (gameState === 'pvp'){
                // @@HE-PVPCUS — PvP: phan don vao doi thu, qua he so PvP cua nguoi cam Kiem Vu
                let best = (typeof pvpDich === 'function') ? pvpDich(ng) : null;
                if (best && best.hp > 0){
                    let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2, bx = best.x + best.w / 2, by = best.y + best.h / 2;
                    cusPvpDanh(ng, best, CUS_KV_PHAN);
                    for (let k = 0; k < 3; k++) cusKv.chan.push({ x0: cx, y0: cy - 20 + k * 20, x: bx, y: by, t: 0 });
                    visualEffects.push(new Effect(bx, by, 'parry'));
                }
            }
            floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 40, LT("KIẾM THUẪN!", "SWORD WALL!")));
            shakeTimer = Math.max(shakeTimer, 10);
            if (typeof SFX !== 'undefined'){ if (SFX.parry) SFX.parry(); if (SFX.tone) SFX.tone(1500, 0.12, 'triangle', 0.16, 900); }
            return true;
        }
// PLAYER_PART_END s4.cusKvKhien.1

// index.html:66005 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvTick.1 EDITABLE
function cusKvTick(){
            let ng = (typeof dino !== 'undefined') ? dino : null;
            if (!ng || !cusKvBat() || !laCusDan(currentAmmoType)){
                // @@HE-UNITY3: Kiem Vu nam trong bo ba Unity thi GIU kiem tren lung / kiem du khi doi sang loai khac
                if (typeof unityOn === 'function' && unityOn() && typeof uniHas === 'function' && uniHas(KV_DAN)){ cusKv.bay.length = 0; cusKv.chan.length = 0; cusKv.khien = null; return; }
                if (cusKv.lung.length || cusKv.du) cusKvReset(); return; }
            // o trong -> thanh tren cao bay xuong thay sau 1 giay
            for (let i = 0; i < CUS_KV_LUNG; i++){
                let o = cusKvO(i);
                if (o.co){ if (o.vao < 1) o.vao = Math.min(1, o.vao + (o.tu === 'du' ? 0.08 : 0.15)); continue; }
                if (o.t > 0){ o.t--; continue; }
                if (cusKv.du > 0){ cusKv.du--; o.co = true; o.vao = 0; o.tu = 'du'; o.tuX = null; }
            }
            // noi tai: chan dan
            if (gameState !== 'pvp' && typeof bossProjectiles !== 'undefined'){
                let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2;
                for (let i = bossProjectiles.length - 1; i >= 0; i--){
                    let q = bossProjectiles[i]; if (!q) continue;
                    let w = q.w || 0, h = q.h || 0; if (w > 140 || h > 140) continue;
                    let qx = q.x + w / 2, qy = q.y + h / 2;
                    if (Math.hypot(qx - cx, qy - cy) > CUS_KV_CHANR) continue;
                    let s = cusKvLay(); if (s < 0) break;
                    let p = cusKvViTri(ng, s);
                    cusKv.chan.push({ x0: p.x, y0: p.y, x: qx, y: qy, t: 0 });
                    cusKv.nhuom = Math.min(CUS_KV_LUNG, (cusKv.nhuom || 0) + 1);   // @@HE-KVHOP: KIEM NHUOM
                    bossProjectiles.splice(i, 1);
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(2400, 0.05, 'square', 0.10, 1400);
                }
            }
            /* @@HE-PVPCUS — PvP: kiem tren lung cung lao ra chan DAN CUA DOI THU (dan thuong trong
               `projectiles`, chu dan to > 140 px nhu tia laser thi khong chan duoc). */
            if (gameState === 'pvp' && CUS_KV_CHAN_PVP && typeof projectiles !== 'undefined'){
                let cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2;
                for (let i = projectiles.length - 1; i >= 0; i--){
                    let q = projectiles[i]; if (!q || q.owner === ng.id) continue;
                    let w = q.w || 0, h = q.h || 0; if (w > 140 || h > 140) continue;
                    let qx = q.x + w / 2, qy = q.y + h / 2;
                    if (Math.hypot(qx - cx, qy - cy) > CUS_KV_CHANR) continue;
                    let s = cusKvLay(); if (s < 0) break;
                    let p = cusKvViTri(ng, s);
                    cusKv.chan.push({ x0: p.x, y0: p.y, x: qx, y: qy, t: 0 });
                    cusKv.nhuom = Math.min(CUS_KV_LUNG, (cusKv.nhuom || 0) + 1);   // @@HE-KVHOP
                    projectiles.splice(i, 1);
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(2400, 0.05, 'square', 0.10, 1400);
                }
            }
            for (let i = cusKv.chan.length - 1; i >= 0; i--) if (++cusKv.chan[i].t > 18) cusKv.chan.splice(i, 1);
            if (cusKv.khien && ++cusKv.khien.t > 34) cusKv.khien = null;
            // kiem dang bay
            for (let i = cusKv.bay.length - 1; i >= 0; i--){
                let K = cusKv.bay[i]; K.t++;
                let m = K.muc;
                if (typeof doChieuCo === 'function' && doChieuCo()) m = doChieu;   // @@HE-DOCHIEU: kiem lao vao diem do
                if (m && (m === doChieu || (m.hp > 0 && !m.invulnAll)) && !(K.tre && K.t <= K.tre)){   // @@HE-NOVA3: tre = bay thang truoc
                    let mx = m.x + (m.w||20) / 2, my = m.y + (m.h||20) / 2;
                    let a = Math.atan2(my - K.y, mx - K.x), da = ((a - K.goc + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
                    K.goc += Math.max(-0.18, Math.min(0.18, da));
                }
                let x0 = K.x, y0 = K.y;
                K.x += Math.cos(K.goc) * CUS_KV_TOC; K.y += Math.sin(K.goc) * CUS_KV_TOC;
                let _kr = 5 + ((K.to || 1) - 1) * 12;   // @@HE-LOLUNG2: kiem lon cham rong hon
                let hop = { x: Math.min(x0, K.x) - _kr, y: Math.min(y0, K.y) - _kr, w: Math.abs(K.x - x0) + _kr * 2, h: Math.abs(K.y - y0) + _kr * 2 };
                let ds = (gameState === 'pvp') ? [((typeof pvpDich === 'function') ? pvpDich(ng) : null)] : ((typeof allTargets === 'function') ? allTargets() : []);
                let trung = false;
                if (K.catDan && gameState !== 'pvp' && typeof cutBossProjectiles === 'function') cutBossProjectiles(hop, ng.id);   // @@HE-KVHOP: DAI KIEM chem vo dan
                if (K.cdHit > 0) K.cdHit--;
                if (typeof doChieuThu === 'function' && doChieuThu(K, hop, K.dmg || CUS_KV_DMG)){ visualEffects.push(new Effect(K.x, K.y, 'parry')); cusKv.bay.splice(i, 1); continue; }   // @@HE-DOCHIEU
                if (ng.id === 1 && typeof gdVaCham === 'function'){   // @@HE-GATDAN2: suc kiem = sat thuong con lai
                    let _con = gdVaCham(hop, K.dmg || CUS_KV_DMG, false);
                    if (_con <= 0){ cusKv.bay.splice(i, 1); continue; }
                    K.dmg = _con;
                }
                for (let o of ds){
                    if (!o || o === ng || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (!checkAABB(hop, o)) continue;
                    if (K.daTrung && K.daTrung.has(o)) continue;          // @@HE-KVHOP: kiem xuyen khong cham lai
                    if (K.lan && K.cdHit > 0) continue;                    // truy kiem: cho nhip giua hai lan dam
                    let _kd = K.dmg || CUS_KV_DMG;
                    if (gameState === 'pvp') cusPvpDanh(ng, o, _kd);   // @@HE-PVPCUS: qua he so PvP + nap ult
                    else if (typeof dealDamage === 'function') dealDamage(o, _kd, 'ammo'); else o.hp -= _kd;
                    visualEffects.push(new Effect(K.x, K.y, 'parry'));
                    if (K.tru){ cusKvTruCam(K.x); trung = true; break; }                  // KIEM TRU: dam roi cam xuong
                    if (K.lan){ K.lan--; K.cdHit = 14; K.muc = o; if (K.lan <= 0){ trung = true; } break; }   // TRUY KIEM
                    if (K.xuyen){ (K.daTrung || (K.daTrung = new Set())).add(o); if (K.xuyen !== 99) K.xuyen--; if (K.xuyen <= 0) { trung = true; break; } continue; }
                    trung = true; break;
                }
                if (K.tru && !trung && K.t > 45){ cusKvTruCam(K.x); trung = true; }
                if (trung || K.t > (K.song || 70) || K.x < worldL() - 80 || K.x > worldR() + 80 || K.y > 700 || K.y < -700) cusKv.bay.splice(i, 1);
            }
            cusKvHopTick(ng);   // @@HE-KVHOP
            cusVkTick(ng);
        }
// PLAYER_PART_END s4.cusKvTick.1

// index.html:66099 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_LON_DMG.1 EDITABLE
const CUS_KV_LON_DMG = 12;
// PLAYER_PART_END s4.CUS_KV_LON_DMG.1

// index.html:66100 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvLoLung.1 EDITABLE
function cusKvLoLung(ng){
            if (cusKvSoLung() < 2){ floatingTexts.push(new FloatingText(ng.x - 26, ng.y - 34, LT("THIẾU KIẾM", "NOT ENOUGH SWORDS"))); return; }
            let s1 = cusKvLay(), s2 = cusKvLay();
            let p1 = cusKvViTri(ng, s1), p2 = cusKvViTri(ng, s2), x = (p1.x + p2.x) / 2, y = (p1.y + p2.y) / 2 - 10;
            let m = cusKvMucTieu(ng, x, y);
            let goc = m ? Math.atan2((m.y + (m.h||20) / 2) - y, (m.x + (m.w||20) / 2) - x) : (ng.isFacingLeft ? Math.PI : 0);
            cusKv.bay.push({ x: x, y: y, goc: goc, muc: m, t: 0, dmg: CUS_KV_LON_DMG, to: 2.4 });
            floatingTexts.push(new FloatingText(ng.x - 26, ng.y - 38, LT("ĐẠI KIẾM!", "GREATSWORD!")));
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(700, 0.18, 'triangle', 0.18, 1600); SFX.tone(260, 0.2, 'sawtooth', 0.12, 120); }
        }
// PLAYER_PART_END s4.cusKvLoLung.1

// index.html:66110 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvBan.1 EDITABLE
function cusKvBan(ng){
            let s = cusKvLay(); if (s < 0) return false;
            let p = cusKvViTri(ng, s);
            let m = cusKvMucTieu(ng, p.x, p.y);
            let goc = m ? Math.atan2((m.y + (m.h||20) / 2) - p.y, (m.x + (m.w||20) / 2) - p.x) : (ng.isFacingLeft ? Math.PI : 0);
            // @@HE-NOVA2: mot lan phong ra HAI thanh — van chi ton mot thanh tren lung.
            // @@HE-NOVA3 — Hans: "cho 2 cay kiem tach nhau ra, sat nhau qua". Hai thanh xoe DOI XUNG hai ben duong ngam
            // (lech +-0.42 rad, cach nhau 28px) va BAY THANG vai khung truoc khi bat dau duoi muc tieu, nen chung
            // cong vao muc tieu tu tren va duoi thay vi chong len nhau.
            // `tre` theo khoang cach (30% quang duong, toi da 6 khung) de muc tieu sat mat van trung.
            if (typeof novaCo === 'function' && novaCo(ng)){
                let _xa = m ? Math.hypot((m.x + (m.w||20) / 2) - p.x, (m.y + (m.h||20) / 2) - p.y) : 400;
                let _tre = Math.max(0, Math.min(6, Math.round(_xa * 0.3 / CUS_KV_TOC)));
                cusKv.bay.push({ x: p.x, y: p.y - 14, goc: goc - 0.42, muc: m, t: 0, tre: _tre });
                cusKv.bay.push({ x: p.x, y: p.y + 14, goc: goc + 0.42, muc: m, t: 0, tre: _tre });
            } else cusKv.bay.push({ x: p.x, y: p.y, goc: goc, muc: m, t: 0 });
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1300, 0.06, 'triangle', 0.12, 2400);
            return true;
        }
// PLAYER_PART_END s4.cusKvBan.1

// index.html:66133 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_HOP_DAU.1 EDITABLE
const CUS_KV_HOP_DAU = 12, CUS_KV_HOP_NHIP = 15;
// PLAYER_PART_END s4.CUS_KV_HOP_DAU.1

// index.html:66135 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_HOP_DMG.1 EDITABLE
const CUS_KV_HOP_DMG = [0, 5, 12, 18, 25, 10, 40];
// PLAYER_PART_END s4.CUS_KV_HOP_DMG.1

// index.html:66136 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_KV_TRU_T.1 EDITABLE
const CUS_KV_TRU_T = 180, CUS_KV_TRAN_T = 360, CUS_KV_THIEN_R = 150;
// PLAYER_PART_END s4.CUS_KV_TRU_T.1

// index.html:66137 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvDanh.1 EDITABLE
function cusKvDanh(ng, o, d){
            if (!o || o.hp === undefined || o.hp <= 0 || o.invulnAll) return;
            if (gameState === 'pvp') cusPvpDanh(ng, o, d);
            else if (typeof dealDamage === 'function') dealDamage(o, d, 'ammo'); else o.hp -= d;
        }
// PLAYER_PART_END s4.cusKvDanh.1

// index.html:66142 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvHopNem.1 EDITABLE
function cusKvHopNem(ng, n){
            let pos = ng.getShootPos(), x = pos.x, y = pos.y - 6;
            let m = cusKvMucTieu(ng, x, y);
            let goc = m ? Math.atan2((m.y + (m.h||20) / 2) - y, (m.x + (m.w||20) / 2) - x) : (ng.isFacingLeft ? Math.PI : 0);
            let nh = Math.min(n, cusKv.nhuom || 0); cusKv.nhuom = (cusKv.nhuom || 0) - nh;   // KIEM NHUOM: +1 moi thanh
            let d = CUS_KV_HOP_DMG[n] + (n === 5 ? Math.ceil(nh / 3) : nh);
            let ten = '';
            if (n === 1){ cusKv.bay.push({ x, y, goc, muc: m, t: 0, dmg: d }); }
            else if (n === 2){ cusKv.bay.push({ x, y, goc, muc: m, t: 0, dmg: d, to: 1.35, xuyen: 1, song: 80, doi: 1 }); ten = LT("SONG KIẾM", "TWIN BLADES"); }
            else if (n === 3){ cusKv.bay.push({ x, y, goc, muc: m, t: 0, dmg: d, to: 2.2, xuyen: 99, catDan: 1, song: 90 }); ten = LT("ĐẠI KIẾM", "GREATSWORD"); }
            else if (n === 4){ cusKv.bay.push({ x, y, goc, muc: m, t: 0, dmg: d, to: 1.8, tru: 1, song: 60 }); ten = LT("KIẾM TRỤ", "PILLAR SWORD"); }
            else if (n === 5){ cusKv.bay.push({ x, y, goc, muc: m, t: 0, dmg: d, to: 1.6, lan: 3, song: 170, truy: 1 }); ten = LT("TRUY KIẾM", "SEEKER SWORD"); }
            else {
                let tx = m ? m.x + (m.w||20) / 2 : x + (ng.isFacingLeft ? -260 : 260);
                let ty = m ? Math.min(300, m.y + (m.h||20) / 2) : 300;
                cusKv.thien.push({ x: tx, y: (typeof camY === 'number' ? camY : 0) - 120, vy: 4, ty: ty, dmg: d, no: 0, ng: ng });
                ten = LT("THIÊN KIẾM", "HEAVEN SWORD");
                shakeTimer = Math.max(shakeTimer, 8);
            }
            if (ten) floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 40, ten + (nh ? "  +" + nh : "")));
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(600 + n * 90, 0.16, 'triangle', 0.16, 1500); if (n >= 3) SFX.tone(160, 0.25, 'sawtooth', 0.14, 70); }
        }
// PLAYER_PART_END s4.cusKvHopNem.1

// index.html:66165 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvVanPhong.1 EDITABLE
function cusKvVanPhong(ng){
            let n = 0, pos = ng.getShootPos(), g0 = ng.isFacingLeft ? Math.PI : 0;
            let tong = cusKvSoLung();
            if (tong <= 0){ floatingTexts.push(new FloatingText(ng.x - 26, ng.y - 34, LT("HẾT KIẾM", "NO SWORDS"))); return; }
            while (cusKvLay() >= 0){
                let g = g0 + (tong === 1 ? 0 : (n / (tong - 1) - 0.5) * 1.0);
                cusKv.bay.push({ x: pos.x, y: pos.y - 4, goc: g, muc: null, t: 0, dmg: Math.ceil(CUS_KV_DMG / 2) + (typeof setCanDmg === 'function' ? setCanDmg() : 0), song: 40 });
                n++;
            }
            floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 38, LT("VẠN KIẾM PHÓNG ×", "SWORD FAN ×") + n));
            if (typeof setCanApDon === 'function') setCanApDon(ng, 180);
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(1700, 0.08, 'triangle', 0.14, 2600); SFX.tone(1100, 0.10, 'triangle', 0.10, 2000); }
        }
// PLAYER_PART_END s4.cusKvVanPhong.1

// index.html:66179 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvTranCam.1 EDITABLE
function cusKvTranCam(ng){
            let n = 0, dir = ng.isFacingLeft ? -1 : 1, ds = [];
            while (cusKvLay() >= 0){ ds.push({ x: ng.x + ng.w / 2 + dir * (46 + n * 20), y: 320 }); n++; }
            if (!n){ floatingTexts.push(new FloatingText(ng.x - 26, ng.y - 34, LT("HẾT KIẾM", "NO SWORDS"))); return; }
            cusKv.tran = { ds: ds, t: 0 };
            floatingTexts.push(new FloatingText(ng.x - 26, ng.y - 38, LT("KIẾM TRẬN", "SWORD WALL") + " ×" + n));
            shakeTimer = Math.max(shakeTimer, 5);
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(320, 0.14, 'square', 0.14, 180);
        }
// PLAYER_PART_END s4.cusKvTranCam.1

// index.html:66188 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvTranPhong.1 EDITABLE
function cusKvTranPhong(ng){
            let T = cusKv.tran; if (!T) return; cusKv.tran = null;
            for (let k of T.ds){
                let m = cusKvMucTieu(ng, k.x, k.y - 40);
                if (!m && typeof allTargets === 'function'){ let b = 1e9; for (let o of allTargets()){ if (!o || o.hp <= 0 || o.invulnAll) continue; let dd = Math.abs(o.x - k.x); if (dd < b){ b = dd; m = o; } } }
                let goc = m ? Math.atan2((m.y + (m.h||20) / 2) - (k.y - 30), (m.x + (m.w||20) / 2) - k.x) : -Math.PI / 2;
                cusKv.bay.push({ x: k.x, y: k.y - 30, goc: goc, muc: m, t: 0, dmg: CUS_KV_DMG });
            }
            floatingTexts.push(new FloatingText(ng.x - 26, ng.y - 38, LT("TRẬN PHÁT!", "WALL LAUNCH!")));
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1400, 0.10, 'triangle', 0.14, 2400);
        }
// PLAYER_PART_END s4.cusKvTranPhong.1

// index.html:66199 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvTruCam.1 EDITABLE
function cusKvTruCam(x){
            cusKv.tru.push({ x: x, y: 320, t: CUS_KV_TRU_T });
            shakeTimer = Math.max(shakeTimer, 6);
        }
// PLAYER_PART_END s4.cusKvTruCam.1

// index.html:66204 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvChanDan.1 EDITABLE
function cusKvChanDan(hopC){
            let n = 0;
            if (gameState !== 'pvp' && typeof bossProjectiles !== 'undefined')
                for (let i = bossProjectiles.length - 1; i >= 0; i--){
                    let q = bossProjectiles[i]; if (!q) continue;
                    if ((q.w || 0) > 140 || (q.h || 0) > 140) continue;
                    if (!checkAABB(hopC, q)) continue;
                    visualEffects.push(new Effect(q.x + (q.w||0) / 2, q.y + (q.h||0) / 2, 'parry'));
                    bossProjectiles.splice(i, 1); n++;
                }
            return n;
        }
// PLAYER_PART_END s4.cusKvChanDan.1

// index.html:66216 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvHopTick.1 EDITABLE
function cusKvHopTick(ng){
            if (cusKv.tran){
                let T = cusKv.tran; T.t++;
                for (let k of T.ds) cusKvChanDan({ x: k.x - 9, y: k.y - 70, w: 18, h: 70 });
                if (T.t >= CUS_KV_TRAN_T) cusKvTranPhong(ng);
            }
            for (let i = cusKv.tru.length - 1; i >= 0; i--){
                let T = cusKv.tru[i];
                cusKvChanDan({ x: T.x - 14, y: T.y - 130, w: 28, h: 130 });
                if (--T.t <= 0) cusKv.tru.splice(i, 1);
            }
            for (let i = cusKv.thien.length - 1; i >= 0; i--){
                let T = cusKv.thien[i];
                if (T.no){ if (++T.no > 24) cusKv.thien.splice(i, 1); continue; }
                T.vy = Math.min(40, T.vy + 2.6); T.y += T.vy;
                if (T.y >= T.ty){
                    T.y = T.ty; T.no = 1;
                    let R = CUS_KV_THIEN_R;
                    let ds = (gameState === 'pvp') ? [((typeof pvpDich === 'function') ? pvpDich(T.ng) : null)] : ((typeof allTargets === 'function') ? allTargets() : []);
                    for (let o of ds){
                        if (!o || o === T.ng) continue;
                        let ox = o.x + (o.w||20) / 2, oy = o.y + (o.h||20) / 2;
                        if (Math.abs(ox - T.x) > R + (o.w||20) / 2 || Math.abs(oy - T.y) > R + (o.h||20) / 2) continue;
                        cusKvDanh(T.ng, o, T.dmg);
                    }
                    visualEffects.push(new Effect(T.x, T.y, 'explosion', true, R));
                    visualEffects.push(new Effect(T.x, T.y, 'parry'));
                    shakeTimer = Math.max(shakeTimer, 22);
                    floatingTexts.push(new FloatingText(T.x - 20, T.y - 50, "-" + T.dmg));
                    if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(90, 0.5, 'sawtooth', 0.26, 40); SFX.tone(1200, 0.2, 'triangle', 0.14, 300); }
                }
            }
        }
// PLAYER_PART_END s4.cusKvHopTick.1

// index.html:66249 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvHopVe.1 EDITABLE
function cusKvHopVe(ng){
            // kiem dang gop tren tay
            if (ng && ng._kvHop && ng._kvHop.n > 0){
                let n = ng._kvHop.n, pos = ng.getShootPos(), dir = ng.isFacingLeft ? -1 : 1;
                let sc = 1.1 + 0.28 * n, gx = pos.x + dir * 8, gy = pos.y - 26 - n * 3;
                ctx.save();
                ctx.globalAlpha = 0.35 + 0.15 * Math.sin(frames * 0.4);
                ctx.fillStyle = (cusKv.nhuom > 0) ? "rgba(255,213,79,0.6)" : "rgba(128,222,234,0.6)";
                ctx.beginPath(); ctx.ellipse(gx, gy, 10 + 7 * n, 5 + 2 * n, 0, 0, 6.28); ctx.fill();
                ctx.restore();
                cusKvVeKiem(gx - dir * 6 * sc, gy, ng.isFacingLeft ? Math.PI : 0, sc, 1, true);
                ctx.save(); ctx.font = "bold 12px Consolas, monospace"; ctx.fillStyle = "#E0F7FA"; ctx.textAlign = "center";
                ctx.fillText("×" + n, gx, gy - 14 - n * 2); ctx.restore();
            }
            // kiem tran
            if (cusKv.tran){
                for (let k of cusKv.tran.ds){
                    let rung = cusKv.tran.t < 8 ? (8 - cusKv.tran.t) * 0.5 : 0;
                    cusKvVeKiem(k.x, k.y - 34 - rung, Math.PI / 2, 1.6, 1, true);
                }
            }
            // kiem tru
            for (let T of cusKv.tru){
                let a = Math.min(1, T.t / 30);
                ctx.save(); ctx.globalAlpha = 0.25 * a; ctx.fillStyle = "#80DEEA"; ctx.fillRect(T.x - 14, T.y - 130, 28, 130); ctx.restore();
                cusKvVeKiem(T.x, T.y - 60, Math.PI / 2, 3.2, a, true);
            }
            // thien kiem
            for (let T of cusKv.thien){
                if (T.no){ continue; }
                ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = "#FFF59D";
                ctx.fillRect(T.x - 18, T.y - 200, 36, 200); ctx.restore();
                cusKvVeKiem(T.x, T.y - 110, Math.PI / 2, 6, 1, true);
            }
        }
// PLAYER_PART_END s4.cusKvHopVe.1

// index.html:66285 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvVeKiem.1 EDITABLE
function cusKvVeKiem(x, y, goc, sc, a, sang){
            ctx.save(); ctx.translate(x, y); ctx.rotate(goc); ctx.scale(sc, sc); ctx.globalAlpha *= a;
            if (sang){ ctx.fillStyle = "rgba(128,222,234,0.35)"; ctx.beginPath(); ctx.ellipse(4, 0, 22, 6, 0, 0, Math.PI * 2); ctx.fill(); }
            ctx.fillStyle = "#ECEFF1"; ctx.strokeStyle = "#4DD0E1"; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(-4, -2.2); ctx.lineTo(16, -2.2); ctx.lineTo(22, 0); ctx.lineTo(16, 2.2); ctx.lineTo(-4, 2.2); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.strokeStyle = "rgba(96,125,139,0.8)"; ctx.beginPath(); ctx.moveTo(-3, 0); ctx.lineTo(15, 0); ctx.stroke();
            ctx.fillStyle = "#FFD54F"; ctx.fillRect(-6, -5, 3, 10);
            ctx.fillStyle = "#5D4037"; ctx.fillRect(-13, -1.6, 7, 3.2);
            ctx.fillStyle = "#FFD54F"; ctx.beginPath(); ctx.arc(-14, 0, 1.8, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        }
// PLAYER_PART_END s4.cusKvVeKiem.1

// index.html:66296 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusKvVe.1 EDITABLE
function cusKvVe(){
            let ng = (typeof dino !== 'undefined') ? dino : null;
            if (!ng || !cusKvBat() || !laCusDan(currentAmmoType)){ cusVkVe(); return; }
            ctx.save();
            // kiem tren cao (vo so) — ve toi da 48, con lai ghi so
            let nDu = Math.min(48, cusKv.du);
            for (let k = 0; k < nDu; k++){ let p = cusKvViTriDu(ng, k); cusKvVeKiem(p.x, p.y, p.goc, 0.85, 0.8, false); }
            if (cusKv.du > 0){
                ctx.font = "bold 11px Consolas, monospace"; ctx.fillStyle = "#B2EBF2"; ctx.textAlign = "center";
                ctx.fillText("×" + cusKv.du, ng.x + ng.w / 2, ng.y - 78 - Math.floor((nDu - 1) / 8) * 12);
                ctx.textAlign = "left";
            }
            // kiem tren lung
            for (let i = 0; i < CUS_KV_LUNG; i++){
                let o = cusKvO(i); if (!o.co) continue;
                let p = cusKvViTri(ng, i), x = p.x, y = p.y;
                if (o.vao < 1){
                    let tu = o.tu === 'du' ? cusKvViTriDu(ng, 0) : { x: ng.x + ng.w / 2, y: ng.y + ng.h / 2 };
                    x = tu.x + (p.x - tu.x) * o.vao; y = tu.y + (p.y - tu.y) * o.vao;
                }
                cusKvVeKiem(x, y, p.goc, 1.3, o.vao < 1 ? 0.5 + 0.5 * o.vao : 1, o.vao < 1);
                if (i < (cusKv.nhuom || 0) && o.vao >= 1){        // @@HE-KVHOP: kiem nhuom phat sang vang
                    ctx.save(); ctx.globalAlpha = 0.45 + 0.25 * Math.sin(frames * 0.2 + i); ctx.fillStyle = "#FFD54F";
                    ctx.beginPath(); ctx.ellipse(x, y, 16, 5, p.goc, 0, 6.28); ctx.fill(); ctx.restore();
                }
            }
            cusKvHopVe(ng);
            // kiem lao ra chan dan
            for (let C of cusKv.chan){
                let u = Math.min(1, C.t / 4), x = C.x0 + (C.x - C.x0) * u, y = C.y0 + (C.y - C.y0) * u;
                let a = C.t <= 4 ? 1 : Math.max(0, 1 - (C.t - 4) / 14);
                cusKvVeKiem(x, y, Math.atan2(C.y - C.y0, C.x - C.x0) + (C.t > 4 ? (C.t - 4) * 0.5 : 0), 1, a, true);
                if (C.t >= 4 && C.t < 10){ ctx.strokeStyle = "rgba(255,255,255," + (1 - (C.t - 4) / 6) + ")"; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.arc(C.x, C.y, 6 + (C.t - 4) * 3, 0, Math.PI * 2); ctx.stroke(); }
            }
            // tam khien 6 kiem chum mui
            if (cusKv.khien){
                let K = cusKv.khien, dir = ng.isFacingLeft ? -1 : 1;
                let cx = ng.x + ng.w / 2 + dir * (ng.w * 0.7), cy = ng.y + ng.h / 2;
                let u = Math.min(1, K.t / 6), a = K.t < 22 ? 1 : Math.max(0, 1 - (K.t - 22) / 12);
                ctx.fillStyle = "rgba(128,222,234," + (0.22 * a) + ")"; ctx.beginPath(); ctx.arc(cx, cy, 36, 0, Math.PI * 2); ctx.fill();
                for (let i = 0; i < 6; i++){
                    let g = i * Math.PI / 3 + K.t * 0.02, R = 30;
                    let tx = cx + Math.cos(g) * R, ty = cy + Math.sin(g) * R;
                    let x = K.tu[i].x + (tx - K.tu[i].x) * u, y = K.tu[i].y + (ty - K.tu[i].y) * u;
                    cusKvVeKiem(x, y, g + Math.PI, 1.15, a, true);   // mui kiem chum vao tam
                }
            }
            // kiem dang bay
            for (let K of cusKv.bay){
                ctx.strokeStyle = "rgba(178,235,242,0.5)"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(K.x - Math.cos(K.goc) * 40, K.y - Math.sin(K.goc) * 40); ctx.lineTo(K.x, K.y); ctx.stroke();
                cusKvVeKiem(K.x, K.y, K.goc, 1.15 * (K.to || 1), 1, true);
                if (K.doi){ let ox = -Math.sin(K.goc) * 9, oy = Math.cos(K.goc) * 9, w = Math.sin(K.t * 0.6);   // SONG KIEM: hai luoi xoan nhau
                    cusKvVeKiem(K.x + ox * w, K.y + oy * w, K.goc, 1.15 * (K.to || 1), 0.85, true); }
                if (K.truy){ ctx.save(); ctx.strokeStyle = "rgba(255,213,79,0.6)"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(K.x - Math.cos(K.goc) * 60, K.y - Math.sin(K.goc) * 60); ctx.lineTo(K.x, K.y); ctx.stroke(); ctx.restore(); }
            }
            ctx.restore();
            cusVkVe();
        }
// PLAYER_PART_END s4.cusKvVe.1

// index.html:66358 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusVkNo.1 EDITABLE
function cusVkNo(ng){
            if (cusVk) return false;
            // uu tien BOSS gan nhat (bat ke huong), khong co boss moi lay quai gan nhat
            let m = null, dM = 1e9, cx0 = ng.x + ng.w / 2, cy0 = ng.y + ng.h / 2;
            if (gameState === 'pvp') m = (typeof pvpDich === 'function') ? pvpDich(ng) : null;
            else for (let ds of [(typeof bosses !== 'undefined' ? bosses : []), (typeof enemies !== 'undefined' ? enemies : [])]){
                for (let o of ds){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    let d = Math.hypot(o.x + (o.w||20) / 2 - cx0, o.y + (o.h||20) / 2 - cy0); if (d < dM){ dM = d; m = o; }
                }
                if (m) break;
            }
            let T0 = { x: (typeof camX === 'number' ? camX : 0), y: (typeof camY === 'number' ? camY : 0) };
            let N = 420, nho = [];
            for (let i = 0; i < N; i++)
                nho.push({ sx: T0.x + Math.random() * canvas.width, sy: T0.y + 14 + Math.random() * canvas.height * 0.42,
                           ra: Math.floor(Math.random() * VK_HIEN), u: Math.random(), v: (Math.random() * 2 - 1), goc0: Math.PI / 2 + (Math.random() - 0.5) * 0.6 });
            cusVk = { t: 0, muc: m, nho: nho, dir: ng.isFacingLeft ? -1 : 1, tx: 0, ty: 0 };
            cusVkDich(ng);
            floatingTexts.push(new FloatingText(ng.x - 70, ng.y - 50, LT("VẠN KIẾM QUY TÔNG!", "TEN THOUSAND SWORDS!")));
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(700, 0.6, 'triangle', 0.16, 1400); SFX.tone(350, 0.8, 'sine', 0.14, 700); }
            return true;
        }
// PLAYER_PART_END s4.cusVkNo.1

// index.html:66381 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusVkDich.1 EDITABLE
function cusVkDich(ng){
            let V = cusVk, m = V.muc;
            if (m && m.hp > 0){ V.tx = m.x + (m.w||20) / 2; V.ty = m.y + (m.h||20) / 2; }
            else if (!V.tx){ V.tx = ng.x + ng.w / 2 + V.dir * 320; V.ty = ng.y + ng.h / 2; }
        }
// PLAYER_PART_END s4.cusVkDich.1

// index.html:66387 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusVkHinh.1 EDITABLE
function cusVkHinh(V){
            /* Truoc khi dam, thanh kiem phai NAM TRON trong vung troi dang nhin thay: dat chuoi
               kiem sat mep tren man hinh roi tinh nguoc ra cho mui kiem. Ban dau toi dat mui
               cach muc tieu mot khoang co dinh — chup ra thanh kiem nam gan het ngoai man. */
            let L = 300, ux = V.dir * 1.3, uy = 1, l = Math.hypot(ux, uy); ux /= l; uy /= l;
            let goc = Math.atan2(uy, ux);
            let top = (typeof camY === 'number' ? camY : 0) + 26;
            let D0 = Math.max(140, (V.ty - (top + uy * L)) / uy);
            let keo = V.t < VK_DAM ? 0 : Math.min(1, (V.t - VK_DAM) / (VK_NO - VK_DAM));
            keo = keo * keo;
            let lui = D0 * (1 - keo);
            return { ux: ux, uy: uy, L: L, tipX: V.tx - ux * lui, tipY: V.ty - uy * lui, goc: goc };
        }
// PLAYER_PART_END s4.cusVkHinh.1

// index.html:66400 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusVkDiem.1 EDITABLE
function cusVkDiem(H, n){
            // u: 0..1 doc than (0 = chuoi), v: -1..1 ngang
            let u = n.u, rong;
            if (u < 0.14) rong = 7;                          // chuoi
            else if (u < 0.19) rong = 48;                    // canh ve
            else rong = 20 * (1 - Math.pow((u - 0.19) / 0.81, 3));   // luoi thon dan toi mui
            let d = (1 - u) * H.L, w = n.v * rong;
            return { x: H.tipX - H.ux * d - H.uy * w, y: H.tipY - H.uy * d + H.ux * w };
        }
// PLAYER_PART_END s4.cusVkDiem.1

// index.html:66409 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusVkTick.1 EDITABLE
function cusVkTick(ng){
            let V = cusVk; if (!V) return;
            V.t++;
            if (V.t < VK_DAM) cusVkDich(ng);
            if (V.t === VK_NO){
                if (gameState === 'pvp'){ let d = (typeof pvpDich === 'function') ? pvpDich(ng) : null;
                    if (d && Math.hypot(d.x + d.w / 2 - V.tx, d.y + d.h / 2 - V.ty) < CUS_VK_R) cusPvpDanh(ng, d, CUS_VK_DMG); }   // @@HE-PVPCUS
                else for (let o of ((typeof allTargets === 'function') ? allTargets() : [])){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    let nx = Math.max(o.x, Math.min(V.tx, o.x + (o.w||20))), ny = Math.max(o.y, Math.min(V.ty, o.y + (o.h||20)));
                    if (o !== V.muc && Math.hypot(nx - V.tx, ny - V.ty) > CUS_VK_R) continue;
                    if (typeof dealDamage === 'function') dealDamage(o, CUS_VK_DMG, 'ammo'); else o.hp -= CUS_VK_DMG;
                }
                shakeTimer = Math.max(shakeTimer, 45);
                for (let k = 0; k < 5; k++) visualEffects.push(new Effect(V.tx + (Math.random() - 0.5) * 120, V.ty + (Math.random() - 0.5) * 60, 'explosion', true, 50 + Math.random() * 30));
                floatingTexts.push(new FloatingText(V.tx - 20, V.ty - 60, "" + CUS_VK_DMG));
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(60, 0.8, 'sawtooth', 0.34, 30); SFX.tone(2200, 0.3, 'triangle', 0.16, 600); }
                V.no = { x: V.tx, y: V.ty };
            }
            if (V.t >= VK_HET) cusVk = null;
        }
// PLAYER_PART_END s4.cusVkTick.1

// index.html:66430 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusVkVe.1 EDITABLE
function cusVkVe(){
            let V = cusVk; if (!V) return;
            let H = cusVkHinh(V);
            ctx.save();
            // man troi toi dan lai cho kiem noi bat
            let toi = V.t < VK_NO ? Math.min(0.35, V.t / 60 * 0.35) : Math.max(0, 0.35 * (1 - (V.t - VK_NO) / 40));
            if (toi > 0){ ctx.fillStyle = "rgba(10,20,40," + toi + ")"; ctx.fillRect((typeof camX === 'number' ? camX : 0) - 50, (typeof camY === 'number' ? camY : 0) - 50, canvas.width + 100, canvas.height + 100); }
            for (let n of V.nho){
                if (V.t < n.ra) continue;
                let x, y, goc, a = Math.min(1, (V.t - n.ra) / 10);
                if (V.t < VK_HIEN + 10){ x = n.sx; y = n.sy + Math.sin(frames * 0.05 + n.u * 9) * 3; goc = n.goc0; }
                else if (V.t >= VK_NO){
                    // no tung ra
                    let d = cusVkDiem(H, n), s = (V.t - VK_NO);
                    let ra = Math.atan2(d.y - V.ty, d.x - V.tx) + n.v;
                    x = d.x + Math.cos(ra) * s * 7; y = d.y + Math.sin(ra) * s * 7; goc = ra; a *= Math.max(0, 1 - s / (VK_HET - VK_NO));
                } else {
                    let k = Math.min(1, (V.t - VK_HIEN - 10) / (VK_KET - VK_HIEN - 10)); k = k * k * (3 - 2 * k);
                    let d = cusVkDiem(H, n);
                    x = n.sx + (d.x - n.sx) * k; y = n.sy + (d.y - n.sy) * k;
                    goc = n.goc0 + (H.goc - n.goc0) * k;
                }
                cusKvVeKiem(x, y, goc, 0.55, a * 0.9, false);
            }
            // hao quang cua thanh kiem da ket
            ctx.globalCompositeOperation = 'lighter';
            if (V.t >= VK_KET && V.t < VK_NO + 6){
                let g = 0.18 + 0.12 * Math.sin(V.t * 0.4);
                ctx.strokeStyle = "rgba(128,222,234," + g + ")"; ctx.lineWidth = 44; ctx.lineCap = 'round';
                let c = cusVkDiem(H, { u: 0.02, v: 0 }), m = cusVkDiem(H, { u: 1, v: 0 });
                ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(m.x, m.y); ctx.stroke();
                ctx.strokeStyle = "rgba(255,255,255," + (g + 0.3) + ")"; ctx.lineWidth = 6;
                ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(m.x, m.y); ctx.stroke();
            }
            // cho sap dam: vong ngam
            if (V.t >= VK_KET && V.t < VK_NO){
                ctx.strokeStyle = "rgba(255,82,82,0.8)"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(V.tx, V.ty, CUS_VK_R * (1.3 - 0.3 * (V.t - VK_KET) / (VK_NO - VK_KET)), 0, Math.PI * 2); ctx.stroke();
            }
            if (V.no){
                let s = V.t - VK_NO, a = Math.max(0, 1 - s / 30);
                ctx.fillStyle = "rgba(224,247,250," + (0.6 * a) + ")"; ctx.beginPath(); ctx.arc(V.no.x, V.no.y, CUS_VK_R * (0.6 + s * 0.04), 0, Math.PI * 2); ctx.fill();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cusVkVe.1

// index.html:66482 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_GB_CONG.1 EDITABLE
const CUS_GB_CONG = 16;
// PLAYER_PART_END s4.CUS_GB_CONG.1

// index.html:66483 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_GB_NHIP.1 EDITABLE
const CUS_GB_NHIP = 15;
// PLAYER_PART_END s4.CUS_GB_NHIP.1

// index.html:66484 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_GB_MO.1 EDITABLE
const CUS_GB_MO   = 14;
// PLAYER_PART_END s4.CUS_GB_MO.1

// index.html:66485 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_GB_TROI.1 EDITABLE
const CUS_GB_TROI = 16;
// PLAYER_PART_END s4.CUS_GB_TROI.1

// index.html:66486 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_GB_DMG.1 EDITABLE
const CUS_GB_DMG  = 3;
// PLAYER_PART_END s4.CUS_GB_DMG.1

// index.html:66487 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusGb.1 EDITABLE
let cusGb = null;
// PLAYER_PART_END s4.cusGb.1

// index.html:66488 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CUS_GB_CH.1 EDITABLE
const CUS_GB_CH = { id:'vuongkho', xong:true, khongCap:true, ten:'VƯƠNG KHỐ', tenEn:'GATE OF TREASURE',
            mo:['Giữ K qua mốc: 16 cánh cổng vàng mở ra sau lưng. Mỗi giây 4 cổng lần lượt gợn sóng, trồi nửa thanh kiếm ra rồi phóng tới kẻ địch, 3 sát thương mỗi thanh. Nhả K hoặc ăn đòn là cổng khép lại.',
                'Giữ K qua mốc: 16 cánh cổng vàng mở ra sau lưng. Mỗi giây 4 cổng lần lượt gợn sóng, trồi nửa thanh kiếm ra rồi phóng tới kẻ địch, 3 sát thương mỗi thanh. Nhả K hoặc ăn đòn là cổng khép lại.',
                'Giữ K qua mốc: 16 cánh cổng vàng mở ra sau lưng. Mỗi giây 4 cổng lần lượt gợn sóng, trồi nửa thanh kiếm ra rồi phóng tới kẻ địch, 3 sát thương mỗi thanh. Nhả K hoặc ăn đòn là cổng khép lại.'],
            moEn:['Hold K past the mark: 16 golden gates open behind you. Four times a second a gate ripples, pushes half a sword out, then launches it at the enemy for 3 damage. Release K or take a hit and the gates close.',
                  'Hold K past the mark: 16 golden gates open behind you. Four times a second a gate ripples, pushes half a sword out, then launches it at the enemy for 3 damage. Release K or take a hit and the gates close.',
                  'Hold K past the mark: 16 golden gates open behind you. Four times a second a gate ripples, pushes half a sword out, then launches it at the enemy for 3 damage. Release K or take a hit and the gates close.'],
            tom:'BỊ KHOÁ bởi KIẾM VŨ. Kiếm vẫn tiếp tục sinh trên lưng trong lúc giữ K.',
            tomEn:'LOCKED by SWORD DANCE. Swords keep forming on your back while you hold K.' };
// PLAYER_PART_END s4.CUS_GB_CH.1

// index.html:66497 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusGbVao.1 EDITABLE
function cusGbVao(ng){
            let cong = [];
            for (let i = 0; i < CUS_GB_CONG; i++){
                let a = Math.PI * (0.55 + 0.9 * (i + Math.random() * 0.6) / CUS_GB_CONG), r = 70 + Math.random() * 110;
                cong.push({ dx: Math.cos(a) * r, dy: -Math.abs(Math.sin(a)) * r - 20, pha: 'cho', t: 0, mo: 0, seed: Math.random() * 9 });
            }
            cusGb = { t: 0, cong: cong, tat: 0, giu: true };
            // @@HE-KVHOP — kiem dang co tren lung thanh LOAT MO MAN ngay lap tuc, khong phai cho cong mo
            { let n = 0;
              while (cusKvLay() >= 0){
                  let p = cusKvViTri(ng, n % CUS_KV_LUNG), m = cusKvMucTieu(ng, p.x, p.y);
                  let goc = m ? Math.atan2((m.y + (m.h||20) / 2) - p.y, (m.x + (m.w||20) / 2) - p.x) : (ng.isFacingLeft ? Math.PI : 0);
                  cusKv.bay.push({ x: p.x, y: p.y - n * 4, goc: goc + (n - 2.5) * 0.08, muc: m, t: 0, dmg: CUS_KV_DMG, tre: n * 2 });
                  n++;
              }
              if (n) floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 56, LT("MỞ MÀN ×", "OPENING ×") + n)); }
            floatingTexts.push(new FloatingText(ng.x - 34, ng.y - 40, LT("VƯƠNG KHỐ!", "GATE OF TREASURE!")));
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(420, 0.4, 'sine', 0.14, 840); SFX.tone(630, 0.4, 'triangle', 0.10, 1260); }
        }
// PLAYER_PART_END s4.cusGbVao.1

// index.html:66516 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusGbViTri.1 EDITABLE
function cusGbViTri(ng, C){
            let dir = ng.isFacingLeft ? -1 : 1;
            return { x: ng.x + ng.w / 2 - dir * Math.abs(C.dx) + (C.dx < 0 ? 0 : 0), y: ng.y + ng.h / 2 + C.dy };
        }
// PLAYER_PART_END s4.cusGbViTri.1

// index.html:66520 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusGbGiu.1 EDITABLE
function cusGbGiu(ng){   // goi moi khung dang giu K (tu cusChTick)
            let G = cusGb; if (!G || !G.giu) return;
            G.t++;
            for (let C of G.cong) if (C.mo < 1) C.mo = Math.min(1, C.mo + 0.08);
            if (G.t % ((typeof novaCo === 'function' && novaCo(ng)) ? 12 : CUS_GB_NHIP) === 0){   // @@HE-NOVA2: Vuong Kho 4 -> 5 kiem / giay
                let ranh = G.cong.filter(C => C.pha === 'cho');
                if (ranh.length){ let C = ranh[Math.floor(Math.random() * ranh.length)]; C.pha = 'mo'; C.t = 0; }
            }
        }
// PLAYER_PART_END s4.cusGbGiu.1

// index.html:66529 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusGbNha.1 EDITABLE
function cusGbNha(){ if (cusGb){ cusGb.giu = false; cusGb.tat = 16; } }
// PLAYER_PART_END s4.cusGbNha.1

// index.html:66530 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusGbTick.1 EDITABLE
function cusGbTick(){
            let G = cusGb; if (!G) return;
            let ng = (typeof dino !== 'undefined') ? dino : null;
            if (!ng){ cusGb = null; return; }
            if (!G.giu){ if (--G.tat <= 0) cusGb = null; return; }
            for (let C of G.cong){
                if (C.pha === 'cho') continue;
                C.t++;
                if (C.pha === 'mo' && C.t >= CUS_GB_MO){ C.pha = 'troi'; C.t = 0; }
                else if (C.pha === 'troi' && C.t >= CUS_GB_TROI){
                    let p = cusGbViTri(ng, C);
                    let m = cusKvMucTieu(ng, p.x, p.y);
                    let goc = m ? Math.atan2((m.y + (m.h||20) / 2) - p.y, (m.x + (m.w||20) / 2) - p.x) : (ng.isFacingLeft ? Math.PI : 0);
                    cusKv.bay.push({ x: p.x, y: p.y, goc: goc, muc: m, t: 0, dmg: CUS_GB_DMG, vang: true });
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1500, 0.05, 'triangle', 0.09, 2600);
                    C.pha = 'dong'; C.t = 0;
                } else if (C.pha === 'dong' && C.t >= 8){ C.pha = 'cho'; C.t = 0; }
                if (C.pha === 'troi' || C.pha === 'mo'){
                    let p = cusGbViTri(ng, C), m = cusKvMucTieu(ng, p.x, p.y);
                    C.goc = m ? Math.atan2((m.y + (m.h||20) / 2) - p.y, (m.x + (m.w||20) / 2) - p.x) : (ng.isFacingLeft ? Math.PI : 0);
                }
            }
        }
// PLAYER_PART_END s4.cusGbTick.1

// index.html:66553 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusGbVe.1 EDITABLE
function cusGbVe(){
            let G = cusGb; if (!G) return;
            let ng = (typeof dino !== 'undefined') ? dino : null; if (!ng) return;
            let chung = G.giu ? 1 : Math.max(0, G.tat / 16);
            ctx.save();
            for (let C of G.cong){
                let p = cusGbViTri(ng, C), sang = (C.pha === 'mo' || C.pha === 'troi') ? 1 : 0.45;
                let r = 15 * C.mo * chung * (C.pha === 'mo' ? 1 + 0.3 * Math.sin(C.t * 0.8) : 1);
                if (r < 1) continue;
                // gon song vang
                for (let k = 0; k < 3; k++){
                    let rr = Math.max(0.5, r * (0.5 + k * 0.28) + Math.sin(frames * 0.2 + C.seed + k) * 1.5);
                    ctx.strokeStyle = "rgba(255," + (200 + k * 18) + "," + (60 + k * 50) + "," + (0.75 * sang * (1 - k * 0.22)) + ")";
                    ctx.lineWidth = 2.2 - k * 0.5;
                    ctx.beginPath(); ctx.ellipse(p.x, p.y, rr, rr * 1.15, 0, 0, Math.PI * 2); ctx.stroke();
                }
                let g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 1.2);
                g.addColorStop(0, "rgba(255,248,225," + (0.55 * sang) + ")"); g.addColorStop(1, "rgba(255,193,7,0)");
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r * 1.2, 0, Math.PI * 2); ctx.fill();
                // nua thanh kiem troi ra khoi cong
                if (C.pha === 'troi'){
                    let u = Math.min(1, C.t / CUS_GB_TROI) * 0.55, goc = C.goc || 0;
                    // mui kiem o phia truoc cong: tam thanh kiem lui ve sau cong mot khoang (1-u)*dai
                    let lui = 22 * (1 - u) - 4;
                    cusKvVeKiem(p.x - Math.cos(goc) * lui, p.y - Math.sin(goc) * lui, goc, 1.2, 0.35 + 0.65 * u / 0.55, true);
                }
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cusGbVe.1

// index.html:66582 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusLaserVe.1 EDITABLE
function cusLaserVe(){
            let ng = (typeof dino !== 'undefined') ? dino : null;
            for (let k = 0; k < 2; k++){
                let n = k === 0 ? ng : (typeof dino2 !== 'undefined' ? dino2 : null);
                if (!n) continue;
                // vong tu quanh nong sung trong luc dang tu
                if ((n.cusLzTu || 0) > 0 && cusLaserBat()){
                    let pos = n.getShootPos(), u = Math.min(1, n.cusLzTu / CUS_LZ_TU);
                    ctx.save();
                    ctx.strokeStyle = "rgba(255,241,118," + (0.35 + 0.5 * u).toFixed(2) + ")";
                    ctx.lineWidth = 2 + 2 * u;
                    ctx.beginPath(); ctx.arc(pos.x, pos.y, 26 * (1.15 - 0.75 * u), 0, Math.PI * 2 * u); ctx.stroke();
                    ctx.fillStyle = "rgba(255,255,255," + (0.25 + 0.6 * u).toFixed(2) + ")";
                    ctx.beginPath(); ctx.arc(pos.x, pos.y, 3 + 5 * u, 0, 6.28); ctx.fill();
                    ctx.restore();
                }
                let T = n.cusLzTia; if (!T) continue;
                T.t++;
                if (T.t > T.tong){ n.cusLzTia = null; continue; }
                let mo = 1 - T.t / T.tong, h = T.cao * mo;
                ctx.save();
                ctx.globalAlpha = mo;
                let g = ctx.createLinearGradient(0, T.y - h, 0, T.y + h);
                g.addColorStop(0, "rgba(255,193,7,0)"); g.addColorStop(0.30, "rgba(255,213,79,0.55)");
                g.addColorStop(0.5, "rgba(255,255,255,0.98)");
                g.addColorStop(0.70, "rgba(255,213,79,0.55)"); g.addColorStop(1, "rgba(255,193,7,0)");
                ctx.fillStyle = g;
                ctx.fillRect(Math.min(T.x1, T.x2), T.y - h, Math.abs(T.x2 - T.x1), h * 2);
                ctx.fillStyle = "rgba(255,255,255,0.95)";
                ctx.fillRect(Math.min(T.x1, T.x2), T.y - h * 0.16, Math.abs(T.x2 - T.x1), h * 0.32);
                for (let off of (T.phu || [])){      // @@HE-SONGHE: tia phu cua TACH TIA
                    let y2 = T.y + off, h2 = h * 0.6;
                    let g2 = ctx.createLinearGradient(0, y2 - h2, 0, y2 + h2);
                    g2.addColorStop(0, "rgba(255,193,7,0)"); g2.addColorStop(0.5, "rgba(255,245,200,0.9)"); g2.addColorStop(1, "rgba(255,193,7,0)");
                    ctx.fillStyle = g2; ctx.fillRect(Math.min(T.x1, T.x2), y2 - h2, Math.abs(T.x2 - T.x1), h2 * 2);
                }
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.cusLaserVe.1

// index.html:66630 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQdNguoi.1 EDITABLE
function cusQdNguoi(k){
            if (k === 0) return (typeof dino  !== 'undefined') ? dino  : null;
            return (typeof dino2 !== 'undefined') ? dino2 : null;
        }
// PLAYER_PART_END s4.cusQdNguoi.1

// index.html:66634 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQdTick.1 EDITABLE
function cusQdTick(){
            for (let k = 0; k < 2; k++){
                let ng = cusQdNguoi(k);
                if (!ng || !ng.cusQd || !ng.cusQd.length) continue;
                // @@HE-P2KHOA: sao cua P2 phai tim doi thu cua P2 (truoc day tim ra chinh P2 -> P2 0 sat thuong)
                if (typeof pvpVoiChu === 'function') pvpVoiChu(ng, () => cusQdTickNg(ng)); else cusQdTickNg(ng);
            }
        }
// PLAYER_PART_END s4.cusQdTick.1

// index.html:66642 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQdTickNg.1 EDITABLE
function cusQdTickNg(ng){
            {
                // doi nhanh / doi dan giua chung thi vong sao bien mat, khong de lai rac
                if (!cusQdBat() || ng.ammoType !== CUS_DAN){ ng.cusQd.length = 0; return; }
                let A = ng.cusQd;
                ng.cusQdGoc = (ng.cusQdGoc || 0) + cusQdToc();
                let R = cusQdR(), cx = ng.x + ng.w/2, cy = ng.y + ng.h/2;
                let buoc = Math.PI * 2 / A.length;
                cusQdChonLao(ng, A, R, cx, cy);
                for (let i = A.length - 1; i >= 0; i--){
                    let S = A[i];
                    S.t++;
                    if (S.khoa > 0) S.khoa--;
                    let khe = ng.cusQdGoc + i * buoc, rMuc = R, ghe = CUS_QD_GHE;
                    let m = S.lao;
                    if (m){
                        // dang BO VAO mot con lot trong vong: khe la HUONG cua no, ban kinh
                        // la dung khoang cach toi no, nen ngoi sao vua xoay ve vua thu lai.
                        let mx = m.x + (m.w||20)/2, my = m.y + (m.h||20)/2;
                        khe = Math.atan2(my - cy, mx - cx);
                        rMuc = Math.max(CUS_QD_LAO_MIN, Math.hypot(mx - cx, my - cy));
                        ghe = CUS_QD_LAO_GHE;
                    }
                    let lech = ((khe - S.goc + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
                    S.goc += lech * ghe;
                    S.r = (S.r === undefined ? R : S.r) + (rMuc - S.r) * ghe;
                    S.x = cx + Math.cos(S.goc) * S.r;
                    S.y = cy + Math.sin(S.goc) * S.r;
                    if (A.length > CUS_QD_DAC){ if (S.vet && S.vet.length) S.vet.length = 0; }
                    else {
                        if (!S.vet) S.vet = [];
                        S.vet.push(S.x, S.y);
                        if (S.vet.length > CUS_QD_VET * 2) S.vet.splice(0, S.vet.length - CUS_QD_VET * 2);
                    }
                    S.quay += m ? 0.72 : 0.42;
                }
                cusQdVaCham(ng, A);
            }
        }
// PLAYER_PART_END s4.cusQdTickNg.1

// index.html:66684 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cusQdChonLao.1 EDITABLE
function cusQdChonLao(ng, A, R, cx, cy){
            let dangLao = 0;
            for (let S of A){
                let m = S.lao;
                if (m && (m.hp === undefined || m.hp <= 0 || m.invulnAll)) S.lao = null;
                else if (m){
                    // no ra khoi vong roi thi tha, de sao ve cho
                    let d = Math.hypot((m.x + (m.w||20)/2) - cx, (m.y + (m.h||20)/2) - cy);
                    if (d > R) S.lao = null; else dangLao++;
                }
            }
            if (dangLao >= CUS_QD_LAO_SO || typeof allTargets !== 'function') return;
            for (let o of allTargets()){
                if (dangLao >= CUS_QD_LAO_SO) break;
                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                let ox = o.x + (o.w||20)/2, oy = o.y + (o.h||20)/2;
                let d = Math.hypot(ox - cx, oy - cy);
                if (d >= R) continue;                       // dang o vanh hoac ngoai vanh: vong tu cham toi
                if (A.some(S => S.lao === o)) continue;      // da co sao lo con nay roi
                let goc = Math.atan2(oy - cy, ox - cx), best = null, bd = 9e9;
                for (let S of A){
                    if (S.lao) continue;
                    let l = Math.abs(((goc - S.goc + Math.PI) % (Math.PI*2) + Math.PI*2) % (Math.PI*2) - Math.PI);
                    if (l < bd){ bd = l; best = S; }
                }
                if (!best) break;
                best.lao = o; dangLao++;
            }
        }
// PLAYER_PART_END s4.cusQdChonLao.1
