// PLAYER_FILE: MIDAS01
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DPR, Effect, FloatingText, Projectile, SFX, allTargets, canvas, checkAABB, ctx, dashVx, floatingTexts, frames, gameState, gdCatHop, giaoSong, midasVeNamDam, projectiles, pvpDich, setCanApDon, setCanBat, setCanDmg, setCanTam, shakeTimer, slamLaoBat, visualEffects, voltTia
// index.html:60281 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_DAN.1 EDITABLE
const MIDAS_DAN = 12;
// PLAYER_PART_END s4.MIDAS_DAN.1

// index.html:60282 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_NEN.1 EDITABLE
const MIDAS_NEN = 3;
// PLAYER_PART_END s4.MIDAS_NEN.1

// index.html:60283 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_MOC_TOC.1 EDITABLE
const MIDAS_MOC_TOC = 120;
// PLAYER_PART_END s4.MIDAS_MOC_TOC.1

// index.html:60284 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_CHO_ROT.1 EDITABLE
const MIDAS_CHO_ROT = 240;
// PLAYER_PART_END s4.MIDAS_CHO_ROT.1

// index.html:60285 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_ROT_MOC.1 EDITABLE
const MIDAS_ROT_MOC = 60;
// PLAYER_PART_END s4.MIDAS_ROT_MOC.1

// index.html:60290 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_ROT_TRAN.1 EDITABLE
const MIDAS_ROT_TRAN = 3;
// PLAYER_PART_END s4.MIDAS_ROT_TRAN.1

// index.html:60299 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_NOVA_NHIP.1 EDITABLE
const MIDAS_NOVA_NHIP = 120;
// PLAYER_PART_END s4.MIDAS_NOVA_NHIP.1

// index.html:60300 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_NOVA_CONG.1 EDITABLE
const MIDAS_NOVA_CONG = 1;
// PLAYER_PART_END s4.MIDAS_NOVA_CONG.1

// index.html:60301 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_OVERHEAT.1 EDITABLE
const MIDAS_OVERHEAT = 90;
// PLAYER_PART_END s4.MIDAS_OVERHEAT.1

// index.html:60302 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_ULT_HS.1 EDITABLE
const MIDAS_ULT_HS = 10;
// PLAYER_PART_END s4.MIDAS_ULT_HS.1

// index.html:60303 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_HAKI_DAI.1 EDITABLE
const MIDAS_HAKI_DAI = 40;
// PLAYER_PART_END s4.MIDAS_HAKI_DAI.1

// index.html:60304 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_HAKI_BV.1 EDITABLE
const MIDAS_HAKI_BV  = 14;
// PLAYER_PART_END s4.MIDAS_HAKI_BV.1

// index.html:60305 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_HAKI_CHAM.1 EDITABLE
const MIDAS_HAKI_CHAM = 84;
// PLAYER_PART_END s4.MIDAS_HAKI_CHAM.1

// index.html:60306 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasHakiCham.1 EDITABLE
let midasHakiCham = 0;
// PLAYER_PART_END s4.midasHakiCham.1

// index.html:60308 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasSetDen.1 EDITABLE
function midasSetDen(x1, y1, x2, y2, hat, day, a){
            let n = 7, pts = [];
            for (let i = 0; i <= n; i++){ let q = i / n, r = Math.sin((i + 1) * 91.7 + hat) * 43758.5; r = r - Math.floor(r);
                let lech = (i === 0 || i === n) ? 0 : (r - 0.5) * 26 * (1 - Math.abs(q - 0.5));
                let nx = -(y2 - y1), ny = x2 - x1, nl = Math.hypot(nx, ny) || 1;
                pts.push([x1 + (x2 - x1) * q + nx / nl * lech, y1 + (y2 - y1) * q + ny / nl * lech]); }
            ctx.save(); ctx.globalAlpha = a; ctx.lineJoin = 'miter'; ctx.lineCap = 'round';
            ctx.shadowColor = '#FF1744'; ctx.shadowBlur = 10;
            ctx.strokeStyle = 'rgba(213,0,0,0.9)'; ctx.lineWidth = day + 3;
            ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
            ctx.shadowBlur = 0; ctx.strokeStyle = '#050505'; ctx.lineWidth = day;
            ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.midasSetDen.1

// index.html:60322 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeHakiVien.1 EDITABLE
function midasVeHakiVien(){         // canh tua cham: vien toi do den
            let u = Math.min(1, midasHakiCham / 20);
            ctx.save(); ctx.setTransform(typeof DPR === 'number' ? DPR : 1, 0, 0, typeof DPR === 'number' ? DPR : 1, 0, 0);   // @@HE-DPR
            let g = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.height * 0.3, canvas.width / 2, canvas.height / 2, canvas.width * 0.7);
            g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(20,0,5,' + (0.55 * u).toFixed(2) + ')');
            ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }
// PLAYER_PART_END s4.midasVeHakiVien.1

// index.html:60330 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_SONG_MOC.1 EDITABLE
const MIDAS_SONG_MOC = 30;
// PLAYER_PART_END s4.MIDAS_SONG_MOC.1

// index.html:60331 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_TAM_NEN.1 EDITABLE
const MIDAS_TAM_NEN = 70;
// PLAYER_PART_END s4.MIDAS_TAM_NEN.1

// index.html:60336 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_KHONG_GIAM.1 EDITABLE
const MIDAS_KHONG_GIAM = 67;
// PLAYER_PART_END s4.MIDAS_KHONG_GIAM.1

// index.html:60342 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_THUONG_DMG.1 EDITABLE
const MIDAS_THUONG_DMG = 2;
// PLAYER_PART_END s4.MIDAS_THUONG_DMG.1

// index.html:60343 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_THUONG_CD.1 EDITABLE
const MIDAS_THUONG_CD  = 30;
// PLAYER_PART_END s4.MIDAS_THUONG_CD.1

// index.html:60344 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_DENJIN.1 EDITABLE
const MIDAS_DENJIN     = 5;
// PLAYER_PART_END s4.MIDAS_DENJIN.1

// index.html:60345 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_DENJIN_CD.1 EDITABLE
const MIDAS_DENJIN_CD  = 180;
// PLAYER_PART_END s4.MIDAS_DENJIN_CD.1

// index.html:60346 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_DENJIN_GO.1 EDITABLE
const MIDAS_DENJIN_GO  = 18;
// PLAYER_PART_END s4.MIDAS_DENJIN_GO.1

// index.html:60357 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_DENJIN_CUA.1 EDITABLE
const MIDAS_DENJIN_CUA  = 120;
// PLAYER_PART_END s4.MIDAS_DENJIN_CUA.1

// index.html:60358 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_DENJIN_TON.1 EDITABLE
const MIDAS_DENJIN_TON  = 5;
// PLAYER_PART_END s4.MIDAS_DENJIN_TON.1

// index.html:60359 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_DENJIN_CONG.1 EDITABLE
const MIDAS_DENJIN_CONG = 5;
// PLAYER_PART_END s4.MIDAS_DENJIN_CONG.1

// index.html:60360 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_DENJIN_TO.1 EDITABLE
const MIDAS_DENJIN_TO   = 1.7;
// PLAYER_PART_END s4.MIDAS_DENJIN_TO.1

// index.html:60361 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_PARRY.1 EDITABLE
const MIDAS_PARRY      = 3;
// PLAYER_PART_END s4.MIDAS_PARRY.1

// index.html:60362 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_PARRY_HH.1 EDITABLE
const MIDAS_PARRY_HH   = 6;
// PLAYER_PART_END s4.MIDAS_PARRY_HH.1

// index.html:60363 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_GO_CUA.1 EDITABLE
const MIDAS_GO_CUA     = 24;
// PLAYER_PART_END s4.MIDAS_GO_CUA.1

// index.html:60364 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_SHORYU_DMG.1 EDITABLE
const MIDAS_SHORYU_DMG = 2;
// PLAYER_PART_END s4.MIDAS_SHORYU_DMG.1

// index.html:60365 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_SHORYU_HAT.1 EDITABLE
const MIDAS_SHORYU_HAT = -17;
// PLAYER_PART_END s4.MIDAS_SHORYU_HAT.1

// index.html:60366 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_HADO_DMG.1 EDITABLE
const MIDAS_HADO_DMG   = 5,  MIDAS_HADO_XA = 200;
// PLAYER_PART_END s4.MIDAS_HADO_DMG.1

// index.html:60367 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_HASHO_DMG.1 EDITABLE
const MIDAS_HASHO_DMG  = 3,  MIDAS_HASHO_DAY = 60;
// PLAYER_PART_END s4.MIDAS_HASHO_DMG.1

// index.html:60368 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_XA_DMG.1 EDITABLE
const MIDAS_XA_DMG     = 4,  MIDAS_XA_TAM = 140;
// PLAYER_PART_END s4.MIDAS_XA_DMG.1

// index.html:60369 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_HADO_NO_R.1 EDITABLE
const MIDAS_HADO_NO_R  = 44, MIDAS_HADO_NO_DMG = 3;
// PLAYER_PART_END s4.MIDAS_HADO_NO_R.1

// index.html:60370 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_DL_DMG.1 EDITABLE
const MIDAS_DL_DMG = 2;
// PLAYER_PART_END s4.MIDAS_DL_DMG.1

// index.html:60371 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_LD_DMG.1 EDITABLE
const MIDAS_LD_DMG = 4,  MIDAS_LD_TAM  = 130;
// PLAYER_PART_END s4.MIDAS_LD_DMG.1

// index.html:60372 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_TT_DMG.1 EDITABLE
const MIDAS_TT_DMG = 3,  MIDAS_TT_SONG = 2, MIDAS_TT_XA = 160;
// PLAYER_PART_END s4.MIDAS_TT_DMG.1

// index.html:60373 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_NX_DMG.1 EDITABLE
const MIDAS_NX_DMG = 5,  MIDAS_NX_IFR  = 26;
// PLAYER_PART_END s4.MIDAS_NX_DMG.1

// index.html:60374 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_NX_TAM.1 EDITABLE
const MIDAS_NX_TAM = 120;
// PLAYER_PART_END s4.MIDAS_NX_TAM.1

// index.html:60380 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_SHO_CD.1 EDITABLE
const MIDAS_SHO_CD = 60;
// PLAYER_PART_END s4.MIDAS_SHO_CD.1

// index.html:60381 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_KAME_MOC.1 EDITABLE
const MIDAS_KAME_MOC = 50;
// PLAYER_PART_END s4.MIDAS_KAME_MOC.1

// index.html:60382 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_KAME_NAP.1 EDITABLE
const MIDAS_KAME_NAP = 54;
// PLAYER_PART_END s4.MIDAS_KAME_NAP.1

// index.html:60383 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_KAME_BAN.1 EDITABLE
const MIDAS_KAME_BAN = 96;
// PLAYER_PART_END s4.MIDAS_KAME_BAN.1

// index.html:60384 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_KAME_NO.1 EDITABLE
const MIDAS_KAME_NO  = 10;
// PLAYER_PART_END s4.MIDAS_KAME_NO.1

// index.html:60385 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_XA_GO.1 EDITABLE
const MIDAS_XA_GO    = 12;
// PLAYER_PART_END s4.MIDAS_XA_GO.1

// index.html:60401 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_FX_DAI.1 EDITABLE
const MIDAS_FX_DAI = { thuong: 9, thuong3: 14, xa: 20, hasho: 22, shoryu: 28, hado: 20, denjin: 26, dat: 16 };
// PLAYER_PART_END s4.MIDAS_FX_DAI.1

// index.html:60413 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_DAM_KHUNG.1 EDITABLE
const MIDAS_DAM_KHUNG = 58;
// PLAYER_PART_END s4.MIDAS_DAM_KHUNG.1

// index.html:60415 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasNut.1 EDITABLE
let midasNut = null;
// PLAYER_PART_END s4.midasNut.1

// index.html:60426 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasAiChuoi.1 EDITABLE
function midasAiChuoi(mau, ng){
            let q = [];
            for (const m of mau){
                let ma = (m === 'tien')  ? (ng.isFacingLeft ? 'KeyA' : 'KeyD')
                       : (m === 'lui')   ? (ng.isFacingLeft ? 'KeyD' : 'KeyA')
                       : (m === 'xuong') ? 'KeyS'
                       : (m === 'len')   ? 'Space'
                       : (m === 'J')     ? 'KeyJ' : null;
                q.push({ ma: ma, n: 2 }); q.push({ ma: null, n: 1 });
            }
            return q;
        }
// PLAYER_PART_END s4.midasAiChuoi.1

// index.html:60439 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasCong.1 EDITABLE
function midasCong(ng, luong, nhan){
            if (!ng || ng.ammoType !== MIDAS_DAN || !(luong > 0)) return 0;
            let M = midasCua(ng);
            M.dmg += luong;
            M.roi = 0; M.tocRoi = 1;
            M.loe = Math.max(M.loe || 0, 12);
            if (nhan && typeof floatingTexts !== 'undefined')
                floatingTexts.push(new FloatingText(ng.x - 16, ng.y - 36, nhan + " +" + luong));
            return luong;
        }
// PLAYER_PART_END s4.midasCong.1

// index.html:60450 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasGhi.1 EDITABLE
function midasGhi(ng, ma){
            if (!ng || ng.ammoType !== MIDAS_DAN) return;
            let M = midasCua(ng); if (!M.go) M.go = [];
            M.go.push({ ma: ma, f: frames });
            while (M.go.length > 5) M.go.shift();
        }
// PLAYER_PART_END s4.midasGhi.1

// index.html:60457 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasKhop.1 EDITABLE
function midasKhop(ng, mau){          // mau = ['lui','tien'] ...
            let M = midasCua(ng); if (!M || !M.go) return false;
            let n = mau.length; if (M.go.length < n) return false;
            let phan = M.go.slice(-n);
            for (let i = 0; i < n; i++) if (phan[i].ma !== mau[i]) return false;
            for (let i = 1; i < n; i++) if (phan[i].f - phan[i-1].f > MIDAS_GO_CUA) return false;
            if (frames - phan[n-1].f > MIDAS_GO_CUA) return false;
            return true;
        }
// PLAYER_PART_END s4.midasKhop.1

// index.html:60468 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasHado.1 EDITABLE
function midasHado(ng){
            if (ng.isOverheated || ng.attackCooldown > 0) return false;
            let dir = ng.isFacingLeft ? -1 : 1;
            let _dj = midasDenjinSan(ng);            // @@HE-MIDAS-DENJIN
            let pos = ng.getShootPos();
            let p = new Projectile(pos.x, pos.y, MIDAS_HADO_DMG + (_dj ? MIDAS_DENJIN_CONG : 0), 9, 0, 0, dir, ng.id);
            p.speed = 11 * dir;
            p.midasHado = 1; p.midasX0 = pos.x;      // de cat khi bay du MIDAS_HADO_XA
            p.pierceCount = 0;
            if (_dj){
                p.midasDenjin = 1;
                p.w *= MIDAS_DENJIN_TO; p.h *= MIDAS_DENJIN_TO;
                p.midasXa = Math.round(MIDAS_HADO_XA * MIDAS_DENJIN_TO);
            }
            projectiles.push(p);
            ng.attackCooldown = 34;
            midasFx(ng, 'hado', _dj);
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(_dj ? 220 : 300, _dj ? 0.28 : 0.2, 'sine', 0.24, 700);
            if (typeof floatingTexts !== 'undefined')
                floatingTexts.push(new FloatingText(ng.x - (_dj ? 26 : 14), ng.y - 34, _dj ? "DENJIN HADOKEN" : "HADOKEN"));
            if (_dj) midasDenjinTieu(ng);
            return true;
        }
// PLAYER_PART_END s4.midasHado.1

// index.html:60493 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasHadoDenjinLoLung.1 EDITABLE
function midasHadoDenjinLoLung(ng){
            let dir = ng.isFacingLeft ? -1 : 1, pos = ng.getShootPos();
            let p = new Projectile(pos.x, pos.y, MIDAS_HADO_DMG + MIDAS_DENJIN_CONG, 9, 0, 0, dir, ng.id);
            p.speed = 11 * dir; p.midasHado = 1; p.midasX0 = pos.x; p.pierceCount = 0;
            p.midasDenjin = 1; p.w *= MIDAS_DENJIN_TO; p.h *= MIDAS_DENJIN_TO;
            p.midasXa = Math.round(MIDAS_HADO_XA * MIDAS_DENJIN_TO);
            projectiles.push(p);
            ng.attackCooldown = Math.max(ng.attackCooldown || 0, 20);
            midasFx(ng, 'hado', true);
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(220, 0.28, 'sine', 0.24, 700);
            floatingTexts.push(new FloatingText(ng.x - 26, ng.y - 34, "DENJIN HADOKEN"));
        }
// PLAYER_PART_END s4.midasHadoDenjinLoLung.1

// index.html:60506 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasHasho.1 EDITABLE
function midasHasho(ng){
            if (ng.isOverheated || ng.attackCooldown > 0) return false;
            let dir = ng.isFacingLeft ? -1 : 1;
            let sc = (typeof ng.getFormScale === 'function') ? ng.getFormScale() : 1;
            let _dj = midasDenjinSan(ng);            // @@HE-MIDAS-DENJIN
            ng.attackCooldown = 30;
            ng._beginSlash(MIDAS_HASHO_DMG + (_dj ? MIDAS_DENJIN_CONG : 0), 14, dir,
                           Math.round(96 * sc * (_dj ? MIDAS_DENJIN_TO : 1)),
                           _dj ? 34 : 22, _dj ? 34 : 22, 0);
            // Day lui CHAM mot nhip. Day ngay thi doi thu roi khoi tam 96px truoc khi hop
            // cham cua `_beginSlash` kip an — do duoc: day dung 60px nhung sat thuong 0.
            midasCua(ng).hasho = { t: 0, dir: dir, dj: _dj ? 1 : 0 };
            midasFx(ng, 'hasho', _dj);
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(_dj ? 140 : 190, _dj ? 0.24 : 0.16, 'square', 0.24, 420);
            if (typeof floatingTexts !== 'undefined')
                floatingTexts.push(new FloatingText(ng.x - (_dj ? 28 : 18), ng.y - 34, _dj ? "DENJIN HASHOGEKI" : "HASHOGEKI"));
            if (_dj) midasDenjinTieu(ng);
            return true;
        }
// PLAYER_PART_END s4.midasHasho.1

// index.html:60527 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasDamXa.1 EDITABLE
function midasDamXa(ng){
            // KHONG xet attackCooldown: day la don NOI TIEP tu cu dam thuong, ma cu dam thuong
            // vua dat hoi don 30 khung — xet vao thi chuoi nay khong bao gio ra duoc.
            if (ng.isOverheated) return false;
            let dir = ng.isFacingLeft ? -1 : 1;
            let sc = (typeof ng.getFormScale === 'function') ? ng.getFormScale() : 1;
            ng.attackCooldown = 26;
            ng._beginSlash(MIDAS_XA_DMG, 13, dir, Math.round(MIDAS_XA_TAM * sc), 20, 20, 0);
            midasFx(ng, 'xa');
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(420, 0.1, 'square', 0.2, 640);
            return true;
        }
// PLAYER_PART_END s4.midasDamXa.1

// index.html:60541 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasShoryu.1 EDITABLE
function midasShoryu(ng){
            if (ng.isOverheated) return false;
            let _M = midasCua(ng);
            if (_M && _M.shoCd > 0) return false;
            if (_M) _M.shoCd = MIDAS_SHO_CD;
            let dir = ng.isFacingLeft ? -1 : 1;
            let sc = (typeof ng.getFormScale === 'function') ? ng.getFormScale() : 1;
            let _dj = midasDenjinSan(ng);                    // @@HE-MIDAS-DENJIN
            ng.clawRiseWindow = 0;
            ng.dy = MIDAS_SHORYU_HAT; ng.grounded = false;
            ng.attackCooldown = 0;
            ng._beginSlash(MIDAS_SHORYU_DMG + (_dj ? MIDAS_DENJIN_CONG : 0), 14, dir,
                           Math.round(84 * sc * (_dj ? MIDAS_DENJIN_TO : 1)),
                           _dj ? 34 : 22, _dj ? 38 : 26, 0);
            midasDay(ng, _dj ? 130 : 84, 0, true);           // nhip 1: ngat hanh dong + hat len
            midasCua(ng).shoryu = { t: 0, dir: dir, sc: sc, dj: _dj ? 1 : 0 };   // nhip 2 ra o midasTick
            midasFx(ng, 'shoryu', _dj);
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(_dj ? 520 : 660, _dj ? 0.28 : 0.2, 'sawtooth', 0.26, 1400);
            if (typeof floatingTexts !== 'undefined')
                floatingTexts.push(new FloatingText(ng.x - (_dj ? 28 : 20), ng.y - 34, _dj ? "DENJIN SHORYUKEN" : "SHORYUKEN"));
            if (_dj) midasDenjinTieu(ng);
            return true;
        }
// PLAYER_PART_END s4.midasShoryu.1

// index.html:60565 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasDay.1 EDITABLE
function midasDay(ng, tam, day, hat){
            if (typeof allTargets !== 'function') return;
            let dir = ng.isFacingLeft ? -1 : 1;
            let cx = ng.x + ng.w / 2;
            for (let o of allTargets()){
                if (!o || o.hp === undefined || o.hp <= 0 || o === ng) continue;
                let ox = o.x + (o.w || 20) / 2;
                if ((ox - cx) * dir < 0) continue;            // chi an phia truoc mat
                /* Do MEP toi MEP chu khong tam toi tam. Boss than rong hang tram pixel:
                   dung dinh mat nguoi choi ma tam cua no van cach hon 84px, nen cu hat
                   tung khong bao gio cham toi boss. Nguoi choi than hep nen truoc gio
                   khong lo ra loi nay. */
                let khe = dir > 0 ? (o.x - (ng.x + ng.w)) : (ng.x - (o.x + (o.w || 20)));
                if (Math.max(0, khe) > tam) continue;
                /* Truoc day chi cong thang mot lan vao o.x. Nguoi choi thi thay duoc, nhung
                   BOSS tu dat lai vi tri moi khung theo may trang thai cua no nen cu day bi
                   xoa ngay khung sau. Doi thanh mot VAN TOC TAT DAN; boss thi duoc keo len
                   bang chinh he do vi chung khong dung `dy` nhu nguoi choi. */
                let goc = o.__goc || o;
                if (day || hat){
                    if (!goc._mdDay) goc._mdDay = { vx: 0, vy: 0, y0: goc.y, t: 0 };
                    let D = goc._mdDay; D.t = 0;
                    if (!D.vy) D.y0 = goc.y;
                    if (day) D.vx = day * 0.18 * dir;
                }
                if (hat){
                    if (o.dy !== undefined && o.grounded !== undefined){ o.dy = MIDAS_SHORYU_HAT; o.grounded = false; }
                    else goc._mdDay.vy = -15;
                }
                if (o.actionTimer !== undefined) o.actionTimer = Math.max(o.actionTimer || 0, 30);
                if (o._uFreeze !== undefined) o._uFreeze = Math.max(o._uFreeze || 0, 24);
            }
        }
// PLAYER_PART_END s4.midasDay.1

// index.html:60599 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasFx.1 EDITABLE
function midasFx(ng, kieu, to, tay){
            let M = midasCua(ng); if (!M) return;
            if (!M.fx) M.fx = [];
            /* `to` = ban DENJIN. KHONG phong to hinh: nam dam bi keo to len nhin nhu tay
               bi sung chu khong ra "manh hon". Ban Denjin duoc nhan ra bang LUA XANH tren
               nam dam (xem `midasVeLuaXanh`), con phan to ra chi danh cho QUA CAU va tam
               voi cua don — nhung thu that su co kich thuoc trong tran dau. */
            let sc = (typeof ng.getFormScale === 'function') ? ng.getFormScale() : 1;
            M.fx.push({ kieu: kieu, t: 0, tong: MIDAS_FX_DAI[kieu] || 18, denjin: to ? 1 : 0,
                        dir: ng.isFacingLeft ? -1 : 1, sc: sc, tay: tay || 'phai',
                        x: ng.x + ng.w / 2, y: ng.y + ng.h / 2 + (tay === 'trai' ? 6 : 0), ng: ng });
            while (M.fx.length > 6) M.fx.shift();
        }
// PLAYER_PART_END s4.midasFx.1

// index.html:60614 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeGio.1 EDITABLE
function midasVeGio(x, y, dir, sc, k, mo, ban, cung){
            ctx.save();
            ctx.translate(x, y); ctx.scale(dir, 1);
            ctx.globalAlpha = mo * 0.85;
            ctx.strokeStyle = '#FFF8E1'; ctx.lineCap = 'round';
            for (let i = 0; i < 2; i++){
                let r = (ban + i * 13) * sc * (0.55 + k * 0.95);
                ctx.lineWidth = (3.4 - i * 1.1) * sc;
                ctx.beginPath(); ctx.arc(0, 0, r, -cung, cung); ctx.stroke();
            }
            ctx.globalAlpha = mo * 0.5; ctx.strokeStyle = '#FFD54F'; ctx.lineWidth = 1.6 * sc;
            ctx.beginPath(); ctx.arc(0, 0, (ban + 6) * sc * (0.55 + k * 0.95), -cung * 0.7, cung * 0.7); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.midasVeGio.1

// index.html:60647 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeLuaXanh.1 EDITABLE
function midasVeLuaXanh(x, y, sc, mo, t, dir, truoc){
            const SAU   = [[26, 'rgba(1,58,120,0.90)'],
                           [21, 'rgba(2,136,209,0.95)'],
                           [14, 'rgba(79,195,247,0.95)']];
            /* Hai lop TRUOC de mo vua phai: chung nam DE LEN nam dam, neu dac qua thi
               che mat ban tay — ma cai Hans muon la "nam dam lua", van phai thay tay. */
            const TRUOC = [[11, 'rgba(179,229,252,0.55)'],
                           [6,  'rgba(255,255,255,0.62)']];
            const LOP = truoc ? TRUOC : SAU;
            const N = 22;
            ctx.save();
            for (let li = 0; li < LOP.length; li++){
                let R = LOP[li][0] * sc, d = [];
                for (let i = 0; i < N; i++){
                    let a = (i / N) * Math.PI * 2;
                    let run = 1 + 0.26 * Math.sin(a * 3 + t * 0.55 + li * 1.3);
                    /* Keo NHON XUONG DUOI: he so dat cuc dai dung o huong 6 gio va tat
                       dan ve hai ben, nen ra dang duoi lua thuot xuong. Keo deu ca nua
                       duoi thi no thanh mot cai vom, nen phai dung ham mu. */
                    let len = Math.max(0, Math.sin(a));
                    let keo = 1 + 1.80 * Math.pow(len, 1.3);
                    if (Math.sin(a) < 0) keo *= 0.80;             // dinh ngon lua thu lai
                    let rr = R * run * keo;
                    let ex = x + Math.cos(a) * rr * 0.62, ey = y + Math.sin(a) * rr;
                    /* THU HEP DAN THEO DO SAU. Chi keo dai khong thoi thi ra mot khoi
                       bau duc — dung nhu anh chup: trong nhu qua bong xanh chu khong
                       phai ngon lua. Ngon lua phai PHINH o goc tay roi VUOT NHON ra xa,
                       nen be ngang phai co lai cang xuong duoi cang manh. */
                    let sau = Math.min(1, Math.max(0, ey - y) / (R * 2.6));
                    ex = x + (ex - x) * (1 - 0.78 * sau);
                    ex -= dir * 0.34 * Math.max(0, ey - y);        // duoi lua nga ve sau lung
                    d.push([ex, ey]);
                }
                ctx.globalAlpha = mo;
                ctx.fillStyle = LOP[li][1];
                /* Noi cac dinh bang duong cong bac hai qua TRUNG DIEM tung canh — neu noi
                   thang thi ngon lua trong nhu mot manh bang vo, dung nhu anh chup thu. */
                ctx.beginPath();
                let m0 = [(d[N-1][0] + d[0][0]) / 2, (d[N-1][1] + d[0][1]) / 2];
                ctx.moveTo(m0[0], m0[1]);
                for (let i = 0; i < N; i++){
                    let c = d[i], nx = d[(i + 1) % N];
                    ctx.quadraticCurveTo(c[0], c[1], (c[0] + nx[0]) / 2, (c[1] + nx[1]) / 2);
                }
                ctx.closePath(); ctx.fill();
            }
            if (truoc) { ctx.restore(); return; }
            // vai doi lua nho tach ra ROI LAI PHIA SAU — chi ve o luot SAU cho khoi day dac
            for (let i = 0; i < 4; i++){
                let ph = ((t * 0.085 + i * 0.27) % 1);
                ctx.globalAlpha = mo * (1 - ph);
                ctx.fillStyle = (i % 2) ? '#E1F5FE' : '#039BE5';
                let by = y + (16 + 40 * ph) * sc;
                let bx = x + Math.sin(t * 0.2 + i * 2.1) * 9 * sc - dir * 0.30 * (by - y);
                ctx.beginPath(); ctx.arc(bx, by, Math.max(0.5, (4.4 - 3.2 * ph) * sc), 0, Math.PI * 2); ctx.fill();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.midasVeLuaXanh.1

// index.html:60706 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeFx.1 EDITABLE
function midasVeFx(ng, M){
            if (!M.fx || !M.fx.length) return;
            for (let f of M.fx){
                if (f.ng !== ng) continue;
                let k = Math.min(1, f.t / f.tong), mo = Math.max(0, 1 - k * k);
                let ea = 1 - (1 - k) * (1 - k);
                let A = { x: f.x, y: f.y, sc: f.sc, dir: f.dir };
                if (f.kieu === 'denjin'){
                    ctx.save(); ctx.globalAlpha = mo;
                    ctx.strokeStyle = '#80D8FF'; ctx.lineWidth = 2 * f.sc;
                    for (let i = 0; i < 6; i++){
                        let g = (i / 6) * Math.PI * 2 + f.t * 0.25;
                        let r1 = (52 - 40 * ea) * f.sc, r2 = r1 + 16 * f.sc;
                        ctx.beginPath();
                        ctx.moveTo(f.x + Math.cos(g) * r2, f.y + Math.sin(g) * r2);
                        ctx.lineTo(f.x + Math.cos(g) * r1, f.y + Math.sin(g) * r1);
                        ctx.stroke();
                    }
                    ctx.globalAlpha = mo * 0.6; ctx.fillStyle = '#E1F5FE';
                    ctx.beginPath(); ctx.arc(f.x, f.y, 8 * f.sc * (1 - ea * 0.4), 0, Math.PI * 2); ctx.fill();
                    ctx.restore();
                    continue;
                }
                let tien = 22 * f.sc, ban = 26, cung = 0.85;
                if (f.kieu === 'dat'){
                    // nam dam CHIA THANG XUONG, cam vao mat dat truoc chan
                    let px = f.x + f.dir * 16 * f.sc, py = f.y + (4 + 18 * ea) * f.sc;
                    ctx.save(); ctx.translate(px, py); ctx.rotate(Math.PI / 2); ctx.translate(-px, -py);
                    midasVeNamDam({ x: px, y: py, sc: f.sc, dir: 1 }, 0, mo);
                    ctx.restore();
                    ctx.save(); ctx.globalAlpha = mo * 0.7; ctx.strokeStyle = '#FFD54F'; ctx.lineWidth = 3 * f.sc;
                    ctx.beginPath(); ctx.ellipse(px, f.y + 24 * f.sc, (10 + 40 * ea) * f.sc, (3 + 8 * ea) * f.sc, 0, 0, Math.PI * 2); ctx.stroke();
                    ctx.restore();
                    continue;
                }
                if (f.kieu === 'thuong'){ tien = (20 + 42 * ea) * f.sc; ban = 24; }
                else if (f.kieu === 'thuong3'){ tien = (20 + 72 * ea) * f.sc; ban = 30; cung = 0.8; }
                else if (f.kieu === 'xa'){ tien = (24 + 104 * ea) * f.sc; ban = 30; cung = 0.7; }
                else if (f.kieu === 'hasho'){ tien = (16 + 62 * ea) * f.sc; ban = 34; cung = 1.15; }
                else if (f.kieu === 'hado'){ tien = (18 + 34 * ea) * f.sc; ban = 28; cung = 0.95; }
                else if (f.kieu === 'shoryu'){ ban = 26; cung = 1.2; }
                if (f.kieu === 'shoryu'){
                    /* Lan truoc toi xoay quanh THAN NGUOI CHOI. Ma `midasVeNamDam` ve canh tay
                       KEO DAI VE PHIA SAU nam dam, nen xoay quanh than thi cai duoi tay van ra
                       xa phia sau lung — dung nhu bao cao "ban tay xuat hien sau lung kha xa".
                       Cach dung: dat nam dam o TRUOC mat, cho no di len theo mot cung, roi xoay
                       quanh CHINH NAM DAM. Nhu vay duoi tay luon chuc xuong ve phia vai. */
                    let px = f.x + f.dir * (34 + 20 * ea) * f.sc;   // day ra truoc them mot doan
                    let py = f.y - (2 + 82 * ea) * f.sc;
                    /* @@HE-MIDAS-DENJIN — ban Denjin: lua xanh boc lay nam dam.
                       Ngon lua ve NGOAI khoi `ctx.rotate` cua nam dam. Truoc day toi ve
                       no ben trong, nen ca ngon lua bi xoay theo goc nghieng cua nam dam
                       va chia ngang — sai vat ly, vi Shoryuken bay LEN thi duoi lua phai
                       bi bo lai o duoi bat ke ban tay nghieng bao nhieu.
                       Than ngon lua ve truoc (nam sau nam dam), luoi lua sang ve sau
                       (liem qua khop tay). */
                    if (f.denjin) midasVeLuaXanh(px, py, f.sc, mo, f.t, f.dir, 0);
                    ctx.save();
                    ctx.translate(px, py);
                    ctx.rotate(-1.05 * f.dir);
                    ctx.translate(-px, -py);
                    midasVeNamDam({ x: px, y: py, sc: f.sc, dir: f.dir }, 0, mo);
                    ctx.restore();
                    if (f.denjin) midasVeLuaXanh(px, py, f.sc, mo, f.t, f.dir, 1);
                    midasVeGio(px, py, f.dir, f.sc, k, mo, ban, cung);
                } else {
                    midasVeNamDam(A, tien / f.sc, mo);
                    midasVeGio(A.x + f.dir * tien, A.y, f.dir, f.sc, k, mo, ban, cung);
                }
                if (f.kieu === 'hasho'){
                    let qx = A.x + f.dir * tien, qy = A.y, R = (10 + 26 * ea) * f.sc;
                    ctx.save();
                    ctx.globalAlpha = mo * 0.3;  ctx.fillStyle = '#4FC3F7';
                    ctx.beginPath(); ctx.arc(qx, qy, R * 1.45, 0, Math.PI * 2); ctx.fill();
                    ctx.globalAlpha = mo * 0.95; ctx.fillStyle = '#29B6F6';
                    ctx.beginPath(); ctx.arc(qx, qy, R, 0, Math.PI * 2); ctx.fill();
                    ctx.globalAlpha = mo * 0.8;  ctx.fillStyle = '#B3E5FC';
                    ctx.beginPath(); ctx.arc(qx, qy, R * 0.5, 0, Math.PI * 2); ctx.fill();
                    ctx.globalAlpha = mo; ctx.strokeStyle = '#0288D1'; ctx.lineWidth = 2.5 * f.sc;
                    ctx.beginPath(); ctx.arc(qx, qy, R, 0, Math.PI * 2); ctx.stroke();
                    ctx.restore();
                }
            }
        }
// PLAYER_PART_END s4.midasVeFx.1

// index.html:60792 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeVienHado.1 EDITABLE
function midasVeVienHado(pr){
            let cx = pr.x + pr.w / 2, cy = pr.y + pr.h / 2, d = pr.dir || 1;
            let R = 22, n = (typeof frames !== 'undefined' ? frames : 0);
            let phap = 1 + Math.sin(n * 0.35) * 0.06;
            ctx.save();
            ctx.globalAlpha = 0.22; ctx.fillStyle = '#4FC3F7';
            ctx.beginPath(); ctx.arc(cx, cy, R * 1.5 * phap, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 0.4;
            for (let i = 1; i <= 4; i++){
                ctx.beginPath(); ctx.arc(cx - d * i * 15, cy, R * (0.78 - i * 0.15), 0, Math.PI * 2); ctx.fill();
            }
            ctx.globalAlpha = 0.95; ctx.fillStyle = '#29B6F6';
            ctx.beginPath(); ctx.arc(cx, cy, R * phap, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 0.85; ctx.fillStyle = '#B3E5FC';
            ctx.beginPath(); ctx.arc(cx, cy, R * 0.52 * phap, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 0.9; ctx.strokeStyle = '#0288D1'; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.arc(cx, cy, R * phap, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.midasVeVienHado.1

// index.html:60812 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasHadoNo.1 EDITABLE
function midasHadoNo(pr){
            if (!pr || !pr.midasHado || pr._daNoHado) return;
            pr._daNoHado = 1;
            let cx = pr.x + pr.w / 2, cy = pr.y + pr.h / 2;
            if (typeof visualEffects !== 'undefined' && typeof Effect === 'function')
                visualEffects.push(new Effect(cx, cy, 'explosion', true, 26));
            if (typeof shakeTimer !== 'undefined') shakeTimer = Math.max(shakeTimer, 10);
            /* TU TINH SAT THUONG LAN, khong goi novaBlast.
               novaBlast co dong `if (gameState === 'pvp') return;` dat NGAY TRUOC phan tru
               mau — nghia la o PvP no chi con la hieu ung hinh. Do duoc: no dung mot lan,
               bia cach 12px van mat 0 mau. Ca he 'explshot' cua rune cung dung cua nay nen
               o PvP no cung chi no cho dep.
               Muc tieu CHINH bi loai khoi vung lan vi no da an don truc tiep roi. O PvP phai
               so ca `__goc` vi allTargets() tra ve mot proxy MOI moi lan goi, so bang dia chi
               thi khong bao gio khop. */
            if (typeof allTargets === 'function' && typeof checkAABB === 'function'){
                let R = MIDAS_HADO_NO_R * (pr.midasDenjin ? 1.5 : 1);   // @@HE-MIDAS-DENJIN
                let hop = { x: cx - R, y: cy - R, w: R * 2, h: R * 2 };
                for (let o of allTargets()){
                    if (!o || o.hp === undefined || o.hp <= 0 || o.invulnAll) continue;
                    let goc = o.__goc || o;
                    if (pr.hitIds && pr.hitIds.has && (pr.hitIds.has(o) || pr.hitIds.has(goc))) continue;
                    if (!checkAABB(hop, o)) continue;
                    o.hp -= MIDAS_HADO_NO_DMG;
                    if (typeof floatingTexts !== 'undefined')
                        floatingTexts.push(new FloatingText(o.x, o.y - 20, "" + MIDAS_HADO_NO_DMG));
                }
            }
        }
// PLAYER_PART_END s4.midasHadoNo.1

// index.html:60843 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasLuotDam.1 EDITABLE
function midasLuotDam(ng){
            if (ng.isOverheated || ng.attackCooldown > 0) return false;
            let dir = ng.isFacingLeft ? -1 : 1;
            let sc = (typeof ng.getFormScale === 'function') ? ng.getFormScale() : 1;
            ng.attackCooldown = 28;
            if (typeof dashVx !== 'undefined') dashVx = dir * Math.max(Math.abs(dashVx) * 2, 24);   // LUOT + J lao xa hon cu luot thuong
            ng._beginSlash(MIDAS_LD_DMG + (typeof setCanDmg === 'function' ? setCanDmg() : 0), 13, dir, Math.round(MIDAS_LD_TAM * sc * (typeof setCanTam === 'function' ? setCanTam() : 1)), 22, 22, 0);
            if (typeof ng.setNhuomLuoi === 'function') ng.setNhuomLuoi();
            if (typeof setCanApDon === 'function') setCanApDon(ng, MIDAS_LD_TAM * sc);
            if (typeof voltTia !== 'undefined' && typeof setCanBat === 'function' && setCanBat()){
                let dS = ng.isFacingLeft ? -1 : 1;
                voltTia.push({ x: ng.x + ng.w / 2, y: ng.y + ng.h / 2, dir: dS, t: 0, hit: new Set() });
            }
            midasFx(ng, 'xa');
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(380, 0.12, 'square', 0.22, 620);
            return true;
        }
// PLAYER_PART_END s4.midasLuotDam.1

// index.html:60863 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasThienTruy.1 EDITABLE
function midasThienTruy(ng){
            if (ng.isOverheated) return false;
            let M = midasCua(ng);
            if (M.tt) return false;
            M.tt = { hit: new Set() };
            ng.dy = 17;
            if (typeof slamLaoBat === 'function') slamLaoBat(ng);   // @@HE-SLAMLAO
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(160, 0.14, 'sawtooth', 0.24, 60);
            return true;
        }
// PLAYER_PART_END s4.midasThienTruy.1

// index.html:60874 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasTTNo.1 EDITABLE
function midasTTNo(ng){
            let sc = (typeof ng.getFormScale === 'function') ? ng.getFormScale() : 1;
            let cx = ng.x + ng.w / 2;
            let songT = Math.ceil(MIDAS_TT_XA / 12) + 6;
            for (const d of [-1, 1]){
                giaoSong.push({ chu: ng, chuId: ng.id, x: cx, y: ng.y + ng.h * 0.72, dir: d,
                                t: songT, t0: songT,
                                r: Math.round(70 * sc), dmg: MIDAS_TT_SONG, xuyen: 1, kiem: 0,
                                x0: cx, giam: 1,          // giam = nho dan theo quang duong
                                mau: '#FFD54F', midas: 1, hit: new Set() });
            }
            shakeTimer = Math.max(shakeTimer, 16);
            midasFx(ng, 'dat');
            if (typeof visualEffects !== 'undefined' && typeof Effect === 'function')
                visualEffects.push(new Effect(cx, ng.y + ng.h, 'explosion', true, 26));
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(100, 0.2, 'square', 0.26, 50);
        }
// PLAYER_PART_END s4.midasTTNo.1

// index.html:60894 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasNhayDap.1 EDITABLE
function midasNhayDap(ng){
            if (ng.isOverheated) return false;
            let M = midasCua(ng);
            if (M.nx) return false;
            let muc = null, bd = 1e9, cx = ng.x + ng.w / 2;
            for (let o of allTargets()){
                if (!o || o.hp === undefined || o.hp <= 0 || o === ng) continue;
                let d = Math.abs((o.x + (o.w || 20) / 2) - cx);
                if (d < bd){ bd = d; muc = o; }
            }
            if (!muc || bd > MIDAS_NX_TAM) return false;   // ngoai tam thi khong ra don
            M.nx = { pha: 0, t: 0, x0: ng.x, y0: ng.y,
                     tx: muc.x + (muc.w || 20) / 2 - ng.w / 2,
                     ty: muc.y + (muc.h || 20) / 2 - ng.h, muc: muc };
            midasFx(ng, 'shoryu');
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(740, 0.16, 'square', 0.22, 1500);
            return true;
        }
// PLAYER_PART_END s4.midasNhayDap.1

// index.html:60913 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasKame.1 EDITABLE
function midasKame(ng){
            let M = midasCua(ng);
            if (!M || M.kame || ng.isOverheated) return false;
            if (M.dmg < MIDAS_KAME_MOC){
                if (typeof floatingTexts !== 'undefined')
                    floatingTexts.push(new FloatingText(ng.x - 40, ng.y - 34, "CẦN " + MIDAS_KAME_MOC + " TÍCH"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(150, 0.10, 'square', 0.14, 90);
                return false;
            }
            let luc = Math.round(M.dmg);
            M.dmg = 0; M.toc = MIDAS_NEN; M.giu = 0; M.roi = 0; M.tocRoi = 1;
            M.kame = { pha: 0, t: 0, luc: luc, daGay: 0, dir: ng.isFacingLeft ? -1 : 1,
                       x0: ng.x, y0: ng.y };
            ng.attackCooldown = MIDAS_KAME_NAP + MIDAS_KAME_BAN;
            if (typeof floatingTexts !== 'undefined')
                floatingTexts.push(new FloatingText(ng.x - 30, ng.y - 40, "TÍCH " + luc + " → CHƯỞNG!"));
            if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(180, 0.5, 'sine', 0.24, 900); }
            return true;
        }
// PLAYER_PART_END s4.midasKame.1

// index.html:60933 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasKameTick.1 EDITABLE
function midasKameTick(ng, M){
            let A = M.kame; A.t++;
            ng.x = A.x0; ng.y = A.y0; ng.dy = 0; ng.grounded = true;   // khoa chan suot cutscene
            if (A.pha === 0){                                   // ---- NAP ----
                if (A.t >= MIDAS_KAME_NAP){ A.pha = 1; A.t = 0; shakeTimer = Math.max(shakeTimer, 26); }
                return;
            }
            if (A.pha === 1){                                   // ---- CHUONG QUET ----
                let cx = ng.x + ng.w / 2;
                let hop = { x: A.dir > 0 ? cx : 0, y: ng.y - 26, w: A.dir > 0 ? (canvas.width - cx) : cx, h: ng.h + 52 };
                if (ng.id === 1 && typeof gdCatHop === 'function') gdCatHop(hop);   // @@HE-GATDAN: chuong Kame quet sach dan
                // Chia deu tong sat thuong cho ca doan ban, va lam TRON DAN de tong ra dung `luc`.
                let nen = A.luc * (A.t / MIDAS_KAME_BAN);
                let can = Math.floor(nen) - A.daGay;
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.hp === undefined || o.hp <= 0 || o === ng) continue;
                    if (!checkAABB(hop, o)) continue;
                    if (can > 0) o.hp -= can;
                    // DAY VAO GOC: doi thu bi doan chuong day lui deu dan
                    o.x += A.dir * 4.2;
                    if (o._uFreeze !== undefined) o._uFreeze = Math.max(o._uFreeze || 0, 6);
                    if (o.actionTimer !== undefined) o.actionTimer = Math.max(o.actionTimer || 0, 10);
                }
                if (can > 0) A.daGay += can;
                if (A.t % 6 === 0) shakeTimer = Math.max(shakeTimer, 12);
                if (A.t >= MIDAS_KAME_BAN){
                    // ---- NO KET THUC ----
                    let con = A.luc - A.daGay;                  // tra not phan le cho du `luc`
                    if (typeof allTargets === 'function') for (let o of allTargets()){
                        if (!o || o.hp === undefined || o.hp <= 0 || o === ng) continue;
                        if (!checkAABB(hop, o)) continue;
                        o.hp -= Math.max(0, con) + MIDAS_KAME_NO;
                        if (typeof visualEffects !== 'undefined' && typeof Effect === 'function')
                            visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 60));
                    }
                    shakeTimer = Math.max(shakeTimer, 34);
                    if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(70, 0.5, 'sawtooth', 0.34, 40); }
                    ng.isOverheated = true; ng.overheatTimer = MIDAS_OVERHEAT;
                    M.kame = null;
                }
            }
        }
// PLAYER_PART_END s4.midasKameTick.1

// index.html:60976 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeDamLuot.1 EDITABLE
function midasVeDamLuot(ng, M){
            let D = M.dl; if (!D) return;
            let sc = (typeof ng.getFormScale === 'function') ? ng.getFormScale() : 1;
            let dir = ng.isFacingLeft ? -1 : 1;
            let cx = ng.x + ng.w / 2, cy = ng.y + ng.h * 0.5;
            let n = (typeof frames !== 'undefined' ? frames : 0);
            let px = cx + dir * 40 * sc, nhap = 0.75 + Math.sin(n * 0.55) * 0.25;
            ctx.save();
            // vet keo dai phia sau — cho thay dang lao toi
            ctx.globalAlpha = 0.28; ctx.fillStyle = '#FFD54F';
            ctx.fillRect(Math.min(px, px - dir * 78 * sc), cy - 11 * sc, 78 * sc, 22 * sc);
            // quang sang quanh nam dam
            ctx.globalAlpha = 0.3 * nhap; ctx.fillStyle = '#FFF176';
            ctx.beginPath(); ctx.arc(px, cy, 30 * sc, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 0.55 * nhap; ctx.fillStyle = '#FFE082';
            ctx.beginPath(); ctx.arc(px, cy, 19 * sc, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
            midasVeNamDam({ x: cx, y: cy, sc: sc, dir: dir }, 40, 1);
            ctx.save();
            ctx.globalAlpha = 0.5 * nhap; ctx.strokeStyle = '#FFFDE7'; ctx.lineWidth = 2.5 * sc;
            ctx.beginPath(); ctx.arc(px, cy, 24 * sc, -0.9, 0.9); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.midasVeDamLuot.1

// index.html:61000 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasVeKame.1 EDITABLE
function midasVeKame(ng, M){
            let A = M.kame; if (!A) return;
            let cx = ng.x + ng.w / 2, cy = ng.y + ng.h * 0.52;
            ctx.save();
            if (A.pha === 0){
                let k = A.t / MIDAS_KAME_NAP;
                ctx.globalAlpha = 0.25 + k * 0.35; ctx.fillStyle = '#40C4FF';
                ctx.beginPath(); ctx.arc(cx + A.dir * 22, cy, 10 + k * 26, 0, Math.PI * 2); ctx.fill();
                ctx.globalAlpha = 0.9; ctx.fillStyle = '#E1F5FE';
                ctx.beginPath(); ctx.arc(cx + A.dir * 22, cy, 4 + k * 12, 0, Math.PI * 2); ctx.fill();
                ctx.globalAlpha = 0.5; ctx.strokeStyle = '#4FC3F7'; ctx.lineWidth = 3;
                for (let i = 0; i < 8; i++){
                    let g = (i / 8) * Math.PI * 2 + A.t * 0.2, r1 = 74 - k * 50;
                    ctx.beginPath();
                    ctx.moveTo(cx + Math.cos(g) * (r1 + 18), cy + Math.sin(g) * (r1 + 18));
                    ctx.lineTo(cx + Math.cos(g) * r1, cy + Math.sin(g) * r1);
                    ctx.stroke();
                }
            } else {
                let x1 = A.dir > 0 ? cx : 0, w1 = A.dir > 0 ? (canvas.width - cx) : cx;
                let day = 30 + Math.sin(A.t * 0.6) * 5;
                ctx.globalAlpha = 0.3; ctx.fillStyle = '#4FC3F7';
                ctx.fillRect(x1, cy - day * 1.7, w1, day * 3.4);
                ctx.globalAlpha = 0.95; ctx.fillStyle = '#29B6F6';
                ctx.fillRect(x1, cy - day, w1, day * 2);
                ctx.globalAlpha = 0.95; ctx.fillStyle = '#E1F5FE';
                ctx.fillRect(x1, cy - day * 0.42, w1, day * 0.84);
                ctx.globalAlpha = 0.5; ctx.fillStyle = '#B3E5FC';
                ctx.beginPath(); ctx.arc(cx + A.dir * 26, cy, 34 + Math.sin(A.t * 0.5) * 6, 0, Math.PI * 2); ctx.fill();
                ctx.globalAlpha = 1; ctx.fillStyle = '#01579B';
                ctx.font = 'bold 13px Consolas, monospace'; ctx.textAlign = 'left';
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.midasVeKame.1

// index.html:61038 · Phạm vi: global
// PLAYER_PART_BEGIN s4.MIDAS_CB_CUA.1 EDITABLE
const MIDAS_CB_CUA = 26, MIDAS_CB_CD = 8, MIDAS_CB3_TAM = 1.6, MIDAS_CB3_DMG = 3;
// PLAYER_PART_END s4.MIDAS_CB_CUA.1

// index.html:61039 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasDamThuong.1 EDITABLE
function midasDamThuong(ng){
            if (!ng || ng.ammoType !== MIDAS_DAN) return false;
            if (ng.hp <= 0 || ng.isOverheated) return false;
            let M = midasCua(ng);
            if (ng.attackCooldown > 0){ if (ng.attackCooldown <= 10) M.jCho = 12; return false; }
            let sc = (typeof ng.getFormScale === 'function') ? ng.getFormScale() : 1;
            let dir = ng.isFacingLeft ? -1 : 1;
            let b = (frames - (M.cbT || -999)) <= MIDAS_CB_CUA ? (M.cb || 0) : 0;
            let cuoi = b === 2;
            ng.attackCooldown = cuoi ? MIDAS_THUONG_CD : MIDAS_CB_CD;
            ng._beginSlash(cuoi ? MIDAS_CB3_DMG : MIDAS_THUONG_DMG, cuoi ? 12 : 8, dir,
                           Math.round(MIDAS_TAM_NEN * sc * (cuoi ? MIDAS_CB3_TAM : 1)), 20, 20, 0);
            midasFx(ng, cuoi ? 'thuong3' : 'thuong', false, b === 1 ? 'trai' : 'phai');
            M.cb = cuoi ? 0 : b + 1; M.cbT = frames;
            M.damT = frames;      // mo cua so noi sang DAM LUOT
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(cuoi ? 380 : 520 + b * 60, cuoi ? 0.09 : 0.05, 'square', 0.14, cuoi ? 620 : 820);
            return true;
        }
// PLAYER_PART_END s4.midasDamThuong.1

// index.html:61058 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasDamDat.1 EDITABLE
function midasDamDat(ng){
            if (!ng || ng.ammoType !== MIDAS_DAN || ng.isOverheated || ng.attackCooldown > 0) return false;
            let sc = (typeof ng.getFormScale === 'function') ? ng.getFormScale() : 1;
            ng.attackCooldown = 24;
            let cx = ng.x + ng.w / 2, R = 78 * sc;
            ng._beginSlash(MIDAS_THUONG_DMG + 1, 10, 1, 0, 0, 0, R);
            midasFx(ng, 'dat');
            shakeTimer = Math.max(shakeTimer, 8);
            if (typeof visualEffects !== 'undefined' && typeof Effect === 'function')
                visualEffects.push(new Effect(cx + (ng.isFacingLeft ? -1 : 1) * 14, ng.y + ng.h, 'explosion', true, 20));
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(120, 0.14, 'square', 0.24, 60);
            return true;
        }
// PLAYER_PART_END s4.midasDamDat.1

// index.html:61072 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasCua.1 EDITABLE
function midasCua(ng){
            if (!ng) return null;
            if (!ng._md) ng._md = { dmg: 0, toc: MIDAS_NEN, giu: 0, roi: 0, tocRoi: 1, loe: 0, no: 0 };
            return ng._md;
        }
// PLAYER_PART_END s4.midasCua.1

// index.html:61078 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasDmg.1 EDITABLE
function midasDmg(ng){ let M = midasCua(ng); return M ? Math.max(1, Math.round(M.dmg)) : 1; }
// PLAYER_PART_END s4.midasDmg.1

// index.html:61081 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasDenjinSan.1 EDITABLE
function midasDenjinSan(ng){
            let M = midasCua(ng);
            return !!(M && (M.denjinCua || 0) > 0 && (M.dmg || 0) >= MIDAS_DENJIN_TON);
        }
// PLAYER_PART_END s4.midasDenjinSan.1

// index.html:61086 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasDenjinTieu.1 EDITABLE
function midasDenjinTieu(ng){
            let M = midasCua(ng); if (!M) return false;
            M.denjinCua = 0;
            M.dmg = Math.max(0, (M.dmg || 0) - MIDAS_DENJIN_TON);
            M.loe = 18;
            if (typeof floatingTexts !== 'undefined')
                floatingTexts.push(new FloatingText(ng.x - 24, ng.y - 54, "DENJIN! -5"));
            if (typeof shakeTimer !== 'undefined') shakeTimer = Math.max(shakeTimer, 16);
            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1500, 0.14, 'sawtooth', 0.22, 2600);
            return true;
        }
// PLAYER_PART_END s4.midasDenjinTieu.1

// index.html:61099 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasBac.1 EDITABLE
function midasBac(ng){          // 0 chua gi · 1 dang doa · 2 chi mang · 3 du giet
            let d = midasDmg(ng), o = pvpDich(ng);
            let mau = o ? o.maxHp : 75;
            if (d >= mau) return 3;
            if (d >= mau * 0.5) return 2;
            if (d >= Math.max(6, mau * 0.15)) return 1;
            return 0;
        }
// PLAYER_PART_END s4.midasBac.1

// index.html:61109 · Phạm vi: global
// PLAYER_PART_BEGIN s4.midasAnDon.1 EDITABLE
function midasAnDon(ng, mat){
            if (!ng || ng.ammoType !== MIDAS_DAN || mat <= 0) return;
            let M = midasCua(ng);
            M.dmg += mat * (gameState === 'pvp' ? 1 : 10);
            M.loe = 14;
        }
// PLAYER_PART_END s4.midasAnDon.1
