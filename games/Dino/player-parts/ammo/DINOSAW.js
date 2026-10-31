// PLAYER_FILE: DINOSAW
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Effect, FloatingText, LT, SFX, allTargets, bamXuongKhong, canvas, checkAABB, ctx, currentAmmoType, dangLuotHoacChop, dashVx, dealDamage, dino, dino2, dsawNovaMau, floatingTexts, frames, gdCatHop, giaoSong, keys, novaCo, novaMauThem, setCanApDon, setCanBat, setCanDmg, shakeTimer, ultCharge, venKhoa, visualEffects, vkDangKy, worldL, worldR
// index.html:70104 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_DAN.1 EDITABLE
const DSAW_DAN   = 15;
// PLAYER_PART_END s4.DSAW_DAN.1

// index.html:70105 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_BANG.1 EDITABLE
const DSAW_BANG  = 5;
// PLAYER_PART_END s4.DSAW_BANG.1

// index.html:70106 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_DONG.1 EDITABLE
const DSAW_DONG  = 300;
// PLAYER_PART_END s4.DSAW_DONG.1

// index.html:70107 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_SAC.1 EDITABLE
const DSAW_SAC   = 300;
// PLAYER_PART_END s4.DSAW_SAC.1

// index.html:70109 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_NAC.1 EDITABLE
const DSAW_NAC     = [0, 15, 30, 60, 120];
// PLAYER_PART_END s4.DSAW_NAC.1

// index.html:70110 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_NAC_TEN.1 EDITABLE
const DSAW_NAC_TEN = ['', 'NỔ MÁY', 'CƯA VÀNG', 'CƯA XANH', 'CƯA TỬ THẦN'];
// PLAYER_PART_END s4.DSAW_NAC_TEN.1

// index.html:70111 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_NAC_MAU.1 EDITABLE
const DSAW_NAC_MAU = ['#B0BEC5', '#FF7043', '#FFD54F', '#66BB6A', '#29B6F6'];
// PLAYER_PART_END s4.DSAW_NAC_MAU.1

// index.html:70113 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_CHEM.1 EDITABLE
const DSAW_CHEM    = 1;
// PLAYER_PART_END s4.DSAW_CHEM.1

// index.html:70114 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_JD.1 EDITABLE
const DSAW_JD      = 3;
// PLAYER_PART_END s4.DSAW_JD.1

// index.html:70115 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_KHONG.1 EDITABLE
const DSAW_KHONG   = 2;
// PLAYER_PART_END s4.DSAW_KHONG.1

// index.html:70116 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_LEN.1 EDITABLE
const DSAW_LEN     = 1;
// PLAYER_PART_END s4.DSAW_LEN.1

// index.html:70117 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_DAM.1 EDITABLE
const DSAW_DAM     = 5;
// PLAYER_PART_END s4.DSAW_DAM.1

// index.html:70118 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_DAM_NO.1 EDITABLE
const DSAW_DAM_NO  = 10;
// PLAYER_PART_END s4.DSAW_DAM_NO.1

// index.html:70119 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_DAM_KHOA.1 EDITABLE
const DSAW_DAM_KHOA= 36;
// PLAYER_PART_END s4.DSAW_DAM_KHOA.1

// index.html:70120 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_NAC_CONG.1 EDITABLE
const DSAW_NAC_CONG= 2;
// PLAYER_PART_END s4.DSAW_NAC_CONG.1

// index.html:70121 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_CUA.1 EDITABLE
const DSAW_CUA     = 44;
// PLAYER_PART_END s4.DSAW_CUA.1

// index.html:70122 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_KHI_DMG.1 EDITABLE
const DSAW_KHI_DMG = 1;
// PLAYER_PART_END s4.DSAW_KHI_DMG.1

// index.html:70123 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_KHI_R.1 EDITABLE
const DSAW_KHI_R   = 150;
// PLAYER_PART_END s4.DSAW_KHI_R.1

// index.html:70124 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_KHI_SONG.1 EDITABLE
const DSAW_KHI_SONG= 13;
// PLAYER_PART_END s4.DSAW_KHI_SONG.1

// index.html:70125 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_XANH_MIN.1 EDITABLE
const DSAW_XANH_MIN= 10, DSAW_XANH_MAX = 15;
// PLAYER_PART_END s4.DSAW_XANH_MIN.1

// index.html:70126 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_TU_DPS.1 EDITABLE
const DSAW_TU_DPS  = 8;
// PLAYER_PART_END s4.DSAW_TU_DPS.1

// index.html:70127 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_TU_TAM.1 EDITABLE
const DSAW_TU_TAM  = 1.9;
// PLAYER_PART_END s4.DSAW_TU_TAM.1

// index.html:70128 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_VET.1 EDITABLE
const DSAW_VET     = 7;
// PLAYER_PART_END s4.DSAW_VET.1

// index.html:70132 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_MUA_MOC.1 EDITABLE
const DSAW_MUA_MOC  = 180;
// PLAYER_PART_END s4.DSAW_MUA_MOC.1

// index.html:70133 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_MUA_NHIP.1 EDITABLE
const DSAW_MUA_NHIP = 15;
// PLAYER_PART_END s4.DSAW_MUA_NHIP.1

// index.html:70138 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_DAI.1 EDITABLE
const DSAW_DAI = 1.35;
// PLAYER_PART_END s4.DSAW_DAI.1

// index.html:70139 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_MUA_LUOI.1 EDITABLE
const DSAW_MUA_LUOI = 124;
// PLAYER_PART_END s4.DSAW_MUA_LUOI.1

// index.html:70140 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_MUA_KHI.1 EDITABLE
const DSAW_MUA_KHI  = 300;
// PLAYER_PART_END s4.DSAW_MUA_KHI.1

// index.html:70143 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_QUY_DAI.1 EDITABLE
const DSAW_QUY_DAI   = 600;
// PLAYER_PART_END s4.DSAW_QUY_DAI.1

// index.html:70144 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_QUY_NHIP.1 EDITABLE
const DSAW_QUY_NHIP  = 7;
// PLAYER_PART_END s4.DSAW_QUY_NHIP.1

// index.html:70145 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_QUY_DASH.1 EDITABLE
const DSAW_QUY_DASH  = 5;
// PLAYER_PART_END s4.DSAW_QUY_DASH.1

// index.html:70146 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_QUY_DASHV.1 EDITABLE
const DSAW_QUY_DASHV = 8;
// PLAYER_PART_END s4.DSAW_QUY_DASHV.1

// index.html:70152 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_NONG_CONG.1 EDITABLE
const DSAW_NONG_CONG = 6, DSAW_NONG_TRAN = 120;
// PLAYER_PART_END s4.DSAW_NONG_CONG.1

// index.html:70153 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_DE_NAP.1 EDITABLE
const DSAW_DE_NAP = 60, DSAW_DE_HOI = 240;
// PLAYER_PART_END s4.DSAW_DE_NAP.1

// index.html:70154 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_CAY_DMG.1 EDITABLE
const DSAW_CAY_DMG = 2, DSAW_CAY_NHIP = 6;
// PLAYER_PART_END s4.DSAW_CAY_DMG.1

// index.html:70155 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_NGHIEN_VAO.1 EDITABLE
const DSAW_NGHIEN_VAO = 20, DSAW_NGHIEN_NHIP = 15, DSAW_NGHIEN_TRAN = 3;
// PLAYER_PART_END s4.DSAW_NGHIEN_VAO.1

// index.html:70156 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dsawBat.1 EDITABLE
function dsawBat(a){ return (a === undefined ? currentAmmoType : a) === DSAW_DAN; }
// PLAYER_PART_END s4.dsawBat.1

// index.html:70158 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dsawNacCua.1 EDITABLE
function dsawNacCua(giu){
            if (giu >= DSAW_NAC[4]) return 4;
            if (giu >= DSAW_NAC[3]) return 3;
            if (giu >= DSAW_NAC[2]) return 2;
            if (giu >= DSAW_NAC[1]) return 1;
            return 0;
        }
// PLAYER_PART_END s4.dsawNacCua.1

// index.html:70168 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dsawHopTu.1 EDITABLE
function dsawHopTu(ng){
            let sc = ng.getFormScale ? ng.getFormScale() : 1;
            let tam = 62 * sc * DSAW_DAI * DSAW_TU_TAM, d = ng.isFacingLeft ? -1 : 1;
            return { x: (d === 1 ? ng.x + ng.w - 6 : ng.x + 6 - tam), y: ng.y - 20,
                     w: tam, h: ng.h + 40 };
        }
// PLAYER_PART_END s4.dsawHopTu.1

// index.html:70176 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dsawMuaPha.1 EDITABLE
function dsawMuaPha(ng){
            let f = frames + (ng.id === 2 ? 97 : 0);
            let d = ng.isFacingLeft ? -1 : 1;
            let xoay = (f % 34) < 7;
            if (xoay) d = -d;
            return { d: d, xoay: xoay,
                     goc: -0.95 + Math.sin(f * 0.37) * 1.25 + Math.sin(f * 0.91 + 1.3) * 0.55,
                     lao: 5 + Math.sin(f * 0.53) * 7 };
        }
// PLAYER_PART_END s4.dsawMuaPha.1

// index.html:70192 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_GOC.1 EDITABLE
const DSAW_GOC = [
            [-1.30,  0.50],   // 0 — bo tu tren xuong
            [ 1.00, -0.80],   // 1 — moc tu duoi len
            [-0.22,  0.10],   // 2 — dam: gan nhu khong xoay, doi lai co doan lao ra
            [-1.45,  1.45],   // 3 — tren khong: quet tron ca tren lan duoi
            [ 0.55, -1.35]    // 4 — hat len
        ];
// PLAYER_PART_END s4.DSAW_GOC.1

// index.html:70199 · Phạm vi: global
// PLAYER_PART_BEGIN s4.DSAW_XOAY_DMG.1 EDITABLE
const DSAW_XOAY_DMG = 4, DSAW_XOAY_R = 96, DSAW_XOAY_T = 22, DSAW_XOAY_XUONG = 4;
// PLAYER_PART_END s4.DSAW_XOAY_DMG.1

// index.html:70200 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dsawVeXoay.1 EDITABLE
function dsawVeXoay(ng){
            let t = ng._dsawXoay || 0; if (t <= 0) return;
            let u = 1 - t / DSAW_XOAY_T, cx = ng.x + ng.w / 2, cy = ng.y + ng.h / 2, R = DSAW_XOAY_R * ng.getFormScale();
            ctx.save();
            if (u < 0.55){                                   // vong cua quay 360 do
                let a = Math.min(1, (0.55 - u) * 4), goc = u * 13;
                ctx.globalAlpha = 0.35 * a; ctx.strokeStyle = "#FF7043"; ctx.lineWidth = 16;
                ctx.beginPath(); ctx.arc(cx, cy, R * 0.8, goc, goc + Math.PI * 2 * Math.min(1, u * 3.2)); ctx.stroke();
                ctx.globalAlpha = a; ctx.strokeStyle = "#ECEFF1"; ctx.lineWidth = 2;
                for (let k = 0; k < 24; k++){                // rang cua
                    let g = goc + k * Math.PI / 12, r0 = R * 0.72, r1 = R * 0.9;
                    ctx.beginPath(); ctx.moveTo(cx + Math.cos(g) * r0, cy + Math.sin(g) * r0);
                    ctx.lineTo(cx + Math.cos(g + 0.12) * r1, cy + Math.sin(g + 0.12) * r1); ctx.stroke();
                }
            } else {                                         // nhat chem xuong
                let a = Math.min(1, (1 - u) * 3);
                ctx.globalAlpha = a; ctx.strokeStyle = "#FFCCBC"; ctx.lineWidth = 6;
                ctx.beginPath(); ctx.moveTo(cx - 40, ng.y + ng.h); ctx.quadraticCurveTo(cx, ng.y + ng.h + 90, cx + 40, ng.y + ng.h); ctx.stroke();
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.dsawVeXoay.1

// index.html:70221 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dsawVeMot.1 EDITABLE
function dsawVeMot(ng){
            if (!ng || ng.ammoType !== DSAW_DAN) return;
            dsawVeXoay(ng);   // @@HE-LOLUNG2
            if (ng.dsawQuy){ dsawVeQuy(ng); return; }          // cai cua to bien mat
            let d = ng.isFacingLeft ? -1 : 1, nac = ng.dsawNac || 0;
            let mau = DSAW_NAC_MAU[nac] || DSAW_NAC_MAU[0];
            let dangNo = nac > 0;
            if (ng.dsawMua){ mau = ((ng._dsawMuaN || 0) >= DSAW_MUA_KHI) ? '#FFD54F' : '#FF5722'; dangNo = true; }
            // --- nhip vung ---
            let goc = 0, lao = 0, vung = false;
            if ((ng.dsawVeT || 0) > 0){
                vung = true;
                let u = 1 - ng.dsawVeT / (ng.dsawVeT0 || 1);          // 0 -> 1
                let e = u < 0.34 ? (u / 0.34) * (u / 0.34) : 1 - Math.pow((u - 0.34) / 0.66, 2) * 0.22;
                let G = DSAW_GOC[ng.dsawKieu || 0] || DSAW_GOC[0];
                goc = G[0] + (G[1] - G[0]) * Math.min(1, e);
                lao = (ng.dsawKieu === 2) ? Math.sin(Math.min(1, u * 1.6) * Math.PI) * 18
                                          : Math.sin(Math.min(1, u * 1.3) * Math.PI) * 7;
                ng.dsawVeT--;
            }
            /* MUA CUA — kieu Leatherface noi dien: vung LOAN XA, thien ve tren dau, va cu
               vai nhip lai XOAY NGUOI mot cai (cai cua quet ra sau lung trong it khung roi
               quay lai). Tron hai song sin lech tan so de goc khong bao gio lap lai deu —
               deu la thanh nhip mua, ma day phai la con dien vung bua. */
            if (ng.dsawMua){
                vung = true;
                let P = dsawMuaPha(ng);
                goc = P.goc; lao = P.lao; d = P.d;
                /* Luc xoay nguoi cai cua nhay sang phia kia trong MOT khung — de nguyen vet
                   thi no noi hai dau bang mot duong thang dai cat ngang ca man hinh. Xoa vet
                   ngay khi doi ben. */
                if (ng._dsawMuaD !== undefined && ng._dsawMuaD !== d && ng.dsawVet) ng.dsawVet.length = 0;
                ng._dsawMuaD = d;
            }
            let L = ng.dsawMua ? DSAW_MUA_LUOI : 46 * DSAW_DAI * (nac >= 4 ? 1.35 : 1);
            // diem tay cam — cua xoay QUANH tay, nen moi goc deu ra tu day
            let px = ng.x + ng.w/2 + d * (14 + lao), py = ng.y + ng.h * (vung ? 0.48 : 0.58);
            if (ng.dsawMua){ px += (Math.random() - 0.5) * 3; py += (Math.random() - 0.5) * 3; }
            ctx.save();
            ctx.translate(px, py);
            ctx.scale(d, 1);            // lat theo huong -> ben duoi chi can ve ve phia +x
            ctx.rotate(goc);
            // quang theo nac
            if (dangNo){
                ctx.globalAlpha = 0.22 + 0.16 * Math.sin(frames * 0.2);
                ctx.shadowBlur = 14; ctx.shadowColor = mau; ctx.fillStyle = mau;
                ctx.beginPath(); ctx.ellipse(22, 0, 40 * (nac >= 4 ? 1.3 : 1), 19, 0, 0, 6.28); ctx.fill();
                ctx.shadowBlur = 0; ctx.globalAlpha = 1;
            }
            // than may
            ctx.fillStyle = dangNo ? mau : "#B0BEC5";
            ctx.fillRect(-5, -12, 26, 24);
            ctx.fillStyle = "#37474F"; ctx.fillRect(4, -12, 4, 24);
            ctx.strokeStyle = dangNo ? mau : "#78909C"; ctx.lineWidth = 4;
            ctx.beginPath(); ctx.moveTo(-4, -10); ctx.lineTo(-13, 5); ctx.stroke();
            // thanh luoi
            ctx.fillStyle = "#546E7A";
            ctx.beginPath();
            ctx.moveTo(20, -9); ctx.lineTo(L + 14 - 6, -6);
            ctx.lineTo(L + 14, 0); ctx.lineTo(L + 14 - 6, 6);
            ctx.lineTo(20, 9); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#B0BEC5";
            ctx.fillRect(22, -3, L - 12, 6);
            // rang
            ctx.fillStyle = (nac >= 4) ? mau : "#ECEFF1";
            let toc = (dangNo || vung) ? 2.6 : 0, pha = toc ? ((frames * toc) % 8) : 0;
            for (let t = 0; t < 22; t++){
                let off = 22 + t * 8 + pha; if (off > L + 8) continue;
                ctx.fillRect(off - 1.5, -12, 3, 3);
                ctx.fillRect(off - 1.5, 9, 3, 3);
            }
            ctx.restore();
            /* VET CHEM — Hans: "sua thanh CAC DUONG TRANG KEO THEO SAU LUOI thoi."
               Ban truoc la mot cung mo day 9px ve tu goc bat dau toi goc hien tai: nhin ra
               mot mieng quat dac, che mat ca cai cua lan con dino. Nay chi con lich su vi tri
               cua BA DIEM tren thanh luoi (mui, giua, gan may) noi lai thanh ba duong trang
               manh — dung nghia "vet keo theo sau luoi", va no tu bien mat khi luoi dung. */
            if (!ng.dsawVet) ng.dsawVet = [];
            if (vung){
                let cg = Math.cos(goc), sg = Math.sin(goc);
                ng.dsawVet.push([px + d * (cg * (L + 14)), py + sg * (L + 14),
                                 px + d * (cg * (L * 0.68)), py + sg * (L * 0.68),
                                 px + d * (cg * (L * 0.38)), py + sg * (L * 0.38)]);
                if (ng.dsawVet.length > DSAW_VET) ng.dsawVet.shift();
            } else if (ng.dsawVet.length) ng.dsawVet.shift();
            let V = ng.dsawVet;
            if (V.length >= 2){
                ctx.save();
                ctx.lineCap = 'round'; ctx.lineJoin = 'round';
                ctx.strokeStyle = "#FFFFFF";
                for (let k = 0; k < 3; k++){
                    ctx.globalAlpha = 0.62 - k * 0.16;
                    ctx.lineWidth = 2.6 - k * 0.6;
                    ctx.beginPath();
                    for (let i = 0; i < V.length; i++){
                        let x = V[i][k*2], y = V[i][k*2+1];
                        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                }
                ctx.lineCap = 'butt'; ctx.lineJoin = 'miter'; ctx.globalAlpha = 1;
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.dsawVeMot.1

// index.html:70328 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dsawVeLuoi.1 EDITABLE
function dsawVeLuoi(x, y, goc, L, day, mau, pha){
            ctx.save();
            ctx.translate(x, y); ctx.rotate(goc);
            ctx.fillStyle = "#37474F";
            ctx.fillRect(-4, -day/2 - 2, 9, day + 4);                    // chan gan
            ctx.fillStyle = "#90A4AE";
            ctx.beginPath();
            ctx.moveTo(4, -day/2); ctx.lineTo(L - 5, -day/2 + 1.5);
            ctx.lineTo(L, 0); ctx.lineTo(L - 5, day/2 - 1.5); ctx.lineTo(4, day/2);
            ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#CFD8DC"; ctx.fillRect(6, -1.5, L - 12, 3);
            ctx.fillStyle = mau;
            for (let t = 0; t < 10; t++){
                let off = 6 + t * 6 + (pha % 6); if (off > L - 2) continue;
                ctx.fillRect(off - 1.2, -day/2 - 2.5, 2.4, 2.5);
                ctx.fillRect(off - 1.2,  day/2,       2.4, 2.5);
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.dsawVeLuoi.1

// index.html:70347 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dsawVeQuy.1 EDITABLE
function dsawVeQuy(ng){
            let Q = ng.dsawQuy, d = ng.isFacingLeft ? -1 : 1;
            let pha = frames * 2.6;
            // quang do cam quanh nguoi — sap het thi nhap nhay bao truoc
            ctx.save();
            let sapHet = Q.t < 90 && (Math.floor(Q.t / 6) % 2);
            ctx.globalAlpha = sapHet ? 0.10 : (0.20 + 0.10 * Math.sin(frames * 0.25));
            ctx.shadowBlur = 18; ctx.shadowColor = "#FF3D00"; ctx.fillStyle = "#FF5722";
            ctx.beginPath(); ctx.ellipse(ng.x + ng.w/2, ng.y + ng.h/2, ng.w * 1.05, ng.h * 0.85, 0, 0, 6.28); ctx.fill();
            ctx.restore();
            // LUOI TREN DAU — cheo ra phia truoc
            let hx = ng.x + ng.w/2 + d * ng.w * 0.30, hy = ng.y + 4;
            dsawVeLuoi(hx, hy, (d === 1 ? -1.05 : Math.PI + 1.05), 40, 9, "#FFEB3B", pha);
            // HAI LUOI TAY — vung theo nhat chem dang chay
            let ax = ng.x + ng.w/2 + d * ng.w * 0.36, ay = ng.y + ng.h * 0.54;
            let u = (ng.dsawVeT || 0) > 0 ? 1 - ng.dsawVeT / (ng.dsawVeT0 || 1) : 1;
            let vung = (ng.dsawVeT || 0) > 0;
            if (vung) ng.dsawVeT--;
            let tay = ng._dsawTay || 0;
            for (let k = 0; k < 2; k++){
                let g0 = k === 0 ? -0.35 : 0.40;
                if (vung && k === tay){
                    let G = DSAW_GOC[k === 0 ? 0 : 1];
                    g0 = G[0] + (G[1] - G[0]) * Math.min(1, u * 1.4);
                }
                let gg = (d === 1) ? g0 : Math.PI - g0;
                /* Hans: "cac don tan cong co HIEN THI TAM DANH bang cach hien ra mot LUOI CUA TO
                   vua du tam chem." Nhat dang vung thi ve them mot luoi ma, dai dung bang tam
                   cua hop an (xem `dsawChem`), mo dan theo nhip vung — nhin vao la biet toi dau. */
                if (vung && k === tay){
                    let sc = ng.getFormScale ? ng.getFormScale() : 1;
                    let tam = ((ng.dsawKieu === 3) ? 84 : 62) * sc * DSAW_DAI + 8;
                    ctx.save();
                    ctx.globalAlpha = 0.50 * (1 - u * 0.55);
                    dsawVeLuoi(ax, ay, gg, tam, 16, "#FFEB3B", pha);
                    ctx.restore();
                }
                dsawVeLuoi(ax + d * k * 3, ay + (k === 0 ? -3 : 4), gg, 28, 7, "#FFFFFF", pha + k * 3);
            }
            // vet trang sau luoi tay dang vung — dung chung kieu vet cua cai cua to
            if (!ng.dsawVet) ng.dsawVet = [];
            if (vung){
                let G = DSAW_GOC[tay === 0 ? 0 : 1];
                let gA = G[0] + (G[1] - G[0]) * Math.min(1, u * 1.4);
                let gg = (d === 1) ? gA : Math.PI - gA, c = Math.cos(gg), s2 = Math.sin(gg);
                ng.dsawVet.push([ax + c * 30, ay + s2 * 30, ax + c * 20, ay + s2 * 20, ax + c * 11, ay + s2 * 11]);
                if (ng.dsawVet.length > DSAW_VET) ng.dsawVet.shift();
            } else if (ng.dsawVet.length) ng.dsawVet.shift();
            let V = ng.dsawVet;
            if (V.length >= 2){
                ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = "#FFFFFF";
                for (let k = 0; k < 3; k++){
                    ctx.globalAlpha = 0.62 - k * 0.16; ctx.lineWidth = 2.4 - k * 0.6;
                    ctx.beginPath();
                    for (let i = 0; i < V.length; i++){ let x = V[i][k*2], y = V[i][k*2+1];
                        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
                    ctx.stroke();
                }
                ctx.restore();
            }
        }
// PLAYER_PART_END s4.dsawVeQuy.1

// index.html:70408 · Phạm vi: global
// PLAYER_PART_BEGIN s4.dsawVe.1 EDITABLE
function dsawVe(nguoi){
            if (nguoi) { if (nguoi.ammoType === DSAW_DAN) dsawVeMot(nguoi); return; }
            if (typeof dino !== 'undefined') dsawVeMot(dino);
            if (typeof dino2 !== 'undefined') dsawVeMot(dino2);
        }
// PLAYER_PART_END s4.dsawVe.1

// index.html:70418 · Phạm vi: Player.prototype
const __Part47 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawTick.1 EDITABLE
dsawTick(){
                if (this.dsawDong === undefined) this.dsawDong = DSAW_DONG;
                if ((this._dsawXoay || 0) > 0){                     // @@HE-LOLUNG2: het vong xoay thi CHEM XUONG
                    // nhan Xuong: bo doan lao lo lung, CHEM XUONG ngay roi roi nhanh
                    if (bamXuongKhong(this) && this._dsawXoay > Math.round(DSAW_XOAY_T * 0.45) + 1) this._dsawXoay = Math.round(DSAW_XOAY_T * 0.45) + 1;
                    this._dsawXoay--;
                    let _M = this._dsawXoayMuc;                     // @@HE-LOLUNG3: lao toi muc tieu
                    if (_M && _M.hp > 0 && this._dsawXoay > Math.round(DSAW_XOAY_T * 0.45)){
                        let mx = _M.x + (_M.w || 20) / 2, dd = mx < this.x + this.w / 2 ? -1 : 1;
                        let gx = mx - dd * ((_M.w || 20) / 2 + 10) - this.w / 2, gy = Math.min(_M.y + (_M.h || 20) * 0.3, 320) - this.h;
                        this.x += (gx - this.x) * 0.38; this.y += (gy - this.y) * 0.3; this.dy = 0;
                        this.isFacingLeft = dd < 0;
                        if (typeof worldL === 'function') this.x = Math.max(worldL(), Math.min(worldR() - this.w, this.x));
                    }
                    if (this._dsawXoay === Math.round(DSAW_XOAY_T * 0.45)){
                        let cx = this.x + this.w / 2;
                        if (_M && _M.hp > 0){ let mx = _M.x + (_M.w || 20) / 2; cx = (cx + mx) / 2; }
                        this._dsawXoayMuc = null;
                        this.meleeStrike({ x: cx - 70, y: this.y + this.h - 10, w: 140, h: 140 }, DSAW_XOAY_XUONG);
                        this.dy = Math.max(this.dy || 0, 9);
                        shakeTimer = Math.max(shakeTimer, 8);
                    }
                }
                if (this.maxAmmo !== DSAW_BANG){
                    this.maxAmmo = DSAW_BANG;
                    if (this.ammo > DSAW_BANG) this.ammo = DSAW_BANG;
                }
                if ((this.dsawCua || 0) > 0) this.dsawCua--; else this.dsawCombo = 0;
                /* THANH DONG CO. Chi tieu hao khi CUA DANG NO (nac > 0) — vung cua khan thi
                   khong ton xang, va do la ly do bo don "khan" phai phe: no la thu ban lam
                   trong luc cho may. Het sach thi phai cho tron DSAW_SAC roi moi day lai —
                   khong sac tung chut mot, de nguoi choi doc duoc "may chet roi" chu khong
                   phai "may con thoi thop". */
                if ((this.dsawSac || 0) > 0){
                    this.dsawSac--;
                    if (this.dsawSac <= 0) this.dsawDong = DSAW_DONG;
                } else if ((this.dsawNac || 0) > 0){
                    this.dsawDong--;
                    if (this.dsawDong <= 0){
                        this.dsawDong = 0; this.dsawSac = DSAW_SAC;
                        this.dsawTat();
                        floatingTexts.push(new FloatingText(this.x - 30, this.y - 26, "CHẾT MÁY!"));
                    }
                }
                this.dsawDamTick();
                this.dsawTuTick();
                this.dsawQuyTick();
            }
// PLAYER_PART_END s4.Player.prototype.dsawTick.1
};

// index.html:70470 · Phạm vi: Player.prototype
const __Part48 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawTuTick.1 EDITABLE
dsawTuTick(){
                if ((this.dsawNac || 0) < 4){ this._dsawTuAcc = 0; return; }
                if (this.id === 1 && typeof gdCatHop === 'function') gdCatHop(dsawHopTu(this));   // @@HE-GATDAN: luoi tu quay chem dan moi khung
                this._dsawTuAcc = (this._dsawTuAcc || 0) + DSAW_TU_DPS / 60;
                if (this._dsawTuAcc < 1) return;
                let hop = dsawHopTu(this), trung = false;
                if (typeof allTargets === 'function') for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (!checkAABB(hop, o)) continue;
                    trung = true;
                    let d = 1;
                    this.cusLot = (this.cusLot || 0) + 1;
                    if (typeof dealDamage === 'function') dealDamage(o, d, 'ammo'); else o.hp -= d;
                    if (typeof dsawNovaMau === 'function') dsawNovaMau(this, o);   // @@HE-NOVA3
                    visualEffects.push(new Effect(o.x + (o.w||20)/2 + (Math.random()-0.5)*20,
                                                  o.y + (o.h||20)/2 + (Math.random()-0.5)*20,
                                                  'explosion', true, 9));
                }
                if (trung){
                    this._dsawTuAcc -= 1;
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(150, 0.04, 'sawtooth', 0.10, 90);
                } else this._dsawTuAcc = Math.min(1, this._dsawTuAcc);
            }
// PLAYER_PART_END s4.Player.prototype.dsawTuTick.1
};

// index.html:70493 · Phạm vi: Player.prototype
const __Part49 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawTat.1 EDITABLE
dsawTat(){
                this.dsawNac = 0; this.dsawMau = null; this.dsawMua = 0;
            }
// PLAYER_PART_END s4.Player.prototype.dsawTat.1
};

// index.html:70500 · Phạm vi: Player.prototype
const __Part50 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawMuaTick.1 EDITABLE
dsawMuaTick(){
                this._dsawMuaN = (this._dsawMuaN || 0) + 1;
                let vang = this._dsawMuaN >= DSAW_MUA_KHI;
                if (this._dsawMuaN === DSAW_MUA_KHI){
                    floatingTexts.push(new FloatingText(this.x - 34, this.y - 32, "CHÉM KHÍ!"));
                    shakeTimer = Math.max(shakeTimer, 12);
                }
                if (frames % 4 === 0 && typeof SFX !== 'undefined' && SFX.tone)
                    SFX.tone(130 + Math.random() * 80, 0.05, 'sawtooth', 0.12, 90);
                if (this._dsawMuaN % DSAW_MUA_NHIP) return;
                let P = dsawMuaPha(this), sc = this.getFormScale ? this.getFormScale() : 1;
                /* Hop an = vung cua GAP DOI quet qua: tu tay (giua nguoi) ra toi mui luoi,
                   phia ben cua dang o; cao tu tren dau xuong ngang hong vi dieu mua thien ve
                   vung tren dau. */
                let R = (DSAW_MUA_LUOI + 28) * sc;
                let cx = this.x + this.w/2, cy = this.y + this.h * 0.48;
                let hop = { x: (P.d === 1 ? cx : cx - R), y: cy - R, w: R, h: R * 1.45 };
                if (this.id === 1 && typeof gdCatHop === 'function') gdCatHop(hop);   // @@HE-GATDAN
                if (typeof allTargets !== 'function') return;
                this.cusLot = (this.cusLot || 0) + 1;
                let trung = new Set();
                for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (!checkAABB(hop, o)) continue;
                    trung.add(o);
                    if (typeof dealDamage === 'function') dealDamage(o, 1, 'ammo'); else o.hp -= 1;
                    if (typeof dsawNovaMau === 'function') dsawNovaMau(this, o);   // @@HE-NOVA3
                    visualEffects.push(new Effect(o.x + (o.w||20)/2 + (Math.random()-0.5)*26,
                                                  o.y + (o.h||20)/2 + (Math.random()-0.5)*26,
                                                  'explosion', true, 10));
                }
                /* SAU 5 GIAY — moi nhip con bat ra mot CHEM KHI bay tiep ra ngoai tam cua.
                   Con nao vua an nhat cua trong nhip nay thi duoc DIEN SAN vao danh sach da
                   trung cua chem khi, nen mot con khong bao gio an ca hai trong cung mot nhip. */
                if (vang && typeof giaoSong !== 'undefined'){
                    giaoSong.push({ chu: this, x: cx + P.d * R * 0.55, y: cy - 10 + (Math.random() - 0.5) * 30,
                                    dir: P.d, r: DSAW_KHI_R, t: DSAW_KHI_SONG, t0: DSAW_KHI_SONG,
                                    dmg: DSAW_KHI_DMG, nho: 1, xuyen: 0, kiem: 1, cua: 1, mui: 0,
                                    hit: trung });
                }
            }
// PLAYER_PART_END s4.Player.prototype.dsawMuaTick.1
};

// index.html:70545 · Phạm vi: Player.prototype
const __Part51 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawQuyBat.1 EDITABLE
dsawQuyBat(){
                this.dsawQuy = { t: DSAW_QUY_DAI, hp0: this.hp, dash: new Set(), bong: [] };
                this.dsawTat(); this._dsawMuaDa = 0;
                this.dsawDamKhoa = null;
                this.isOverheated = false; this.ammo = DSAW_BANG; this.attackCooldown = 0;
                floatingTexts.push(new FloatingText(this.x - 40, this.y - 36, "QUỶ CƯA!"));
                shakeTimer = Math.max(shakeTimer, 34);
                if (typeof SFX !== 'undefined' && SFX.tone){
                    SFX.tone(80, 0.60, 'sawtooth', 0.34, 260); SFX.tone(520, 0.40, 'square', 0.18, 1400);
                }
            }
// PLAYER_PART_END s4.Player.prototype.dsawQuyBat.1
};

// index.html:70556 · Phạm vi: Player.prototype
const __Part52 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawQuyTick.1 EDITABLE
dsawQuyTick(){
                let Q = this.dsawQuy; if (!Q) return;
                // doi vu khi giua chung thi ket thuc ngay (va van tra mau)
                if (this.ammoType !== DSAW_DAN){ this.dsawQuyHet(); return; }
                Q.t--;
                this.isOverheated = false; this.ammo = DSAW_BANG;
                /* DASH XUYEN. Nhan ra dash bang quang duong di trong mot khung chu khong
                   doc `dashVx` — bien do chi co cho nguoi choi 1, ma PvP thi ca hai ben deu
                   co the cam DinoSaw. Moi con chi an MOT lan moi cu dash, va 5 sat thuong do
                   tra thanh 5 nhip lien tiep chu khong phai mot cuc. */
                let dx = Math.abs(this.x - (Q.xCu === undefined ? this.x : Q.xCu));
                Q.xCu = this.x;
                if (dx >= DSAW_QUY_DASHV){
                    if (this.id === 1 && typeof gdCatHop === 'function') gdCatHop(this);   // @@HE-GATDAN
                    if (typeof allTargets === 'function') for (let o of allTargets()){
                        if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                        if (Q.dash.has(o) || !checkAABB(this, o)) continue;
                        Q.dash.add(o);
                        Q.bong.push({ o: o, con: DSAW_QUY_DASH });
                        floatingTexts.push(new FloatingText(o.x - 10, o.y - 28, "XÉ!"));
                        shakeTimer = Math.max(shakeTimer, 12);
                    }
                } else if (dx < 2) Q.dash.clear();                 // dung lai la mot cu dash moi
                for (let i = Q.bong.length - 1; i >= 0; i--){
                    let B = Q.bong[i];
                    if (!B.o || B.o.hp === undefined || B.o.hp <= 0 || B.con <= 0){ Q.bong.splice(i, 1); continue; }
                    B.con--;
                    if (typeof dealDamage === 'function') dealDamage(B.o, 1, 'ammo'); else B.o.hp -= 1;
                    if (typeof dsawNovaMau === 'function') dsawNovaMau(this, B.o);   // @@HE-NOVA3
                    visualEffects.push(new Effect(B.o.x + (B.o.w||20)/2, B.o.y + (B.o.h||20)/2, 'explosion', true, 12));
                }
                if (Q.t <= 0) this.dsawQuyHet();
            }
// PLAYER_PART_END s4.Player.prototype.dsawQuyTick.1
};

// index.html:70589 · Phạm vi: Player.prototype
const __Part53 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawQuyHet.1 EDITABLE
dsawQuyHet(){
                let Q = this.dsawQuy; if (!Q) return;
                this.dsawQuy = null;
                /* "Moi HP bi mat trong trang thai nay se duoc hoi phuc lai sau khi het." */
                if (this.hp < Q.hp0){
                    floatingTexts.push(new FloatingText(this.x - 30, this.y - 34, "+" + (Q.hp0 - this.hp) + " MÁU"));
                    this.hp = Q.hp0;
                }
                this.isOverheated = false; this.ammo = DSAW_BANG;
            }
// PLAYER_PART_END s4.Player.prototype.dsawQuyHet.1
};

// index.html:70601 · Phạm vi: Player.prototype
const __Part54 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawDamTick.1 EDITABLE
dsawDamTick(){
                let D = this.dsawDamKhoa; if (!D) return;
                let o = D.muc;
                if (!o || o.hp === undefined || o.hp <= 0 || o.invulnAll || D.t >= D.dai){
                    this.dsawDamKhoa = null; return;
                }
                D.t++;
                if (typeof venKhoa === 'function') venKhoa(o, 8);
                let can = Math.floor(D.t * D.tong / D.dai);
                while (D.da < can){
                    D.da++;
                    if (typeof dealDamage === 'function') dealDamage(o, 1, 'ammo'); else o.hp -= 1;
                    if (typeof novaCo === 'function' && novaCo(this)) novaMauThem(o);   // @@HE-NOVA2: no cua -> CHAY MAU (cong don)
                    visualEffects.push(new Effect(o.x + (o.w||20)/2 + (Math.random()-0.5)*24,
                                                  o.y + (o.h||20)/2 + (Math.random()-0.5)*24,
                                                  'explosion', true, 11));
                }
                if (D.t % 5 === 0) shakeTimer = Math.max(shakeTimer, 6);
            }
// PLAYER_PART_END s4.Player.prototype.dsawDamTick.1
};

// index.html:70622 · Phạm vi: Player.prototype
const __Part55 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawChem.1 EDITABLE
dsawChem(kieu){
                let sc = this.getFormScale(), dir = this.isFacingLeft ? -1 : 1;
                let nac = this.dsawNac || 0;
                let cong = nac > 0 ? DSAW_NAC_CONG : 0;
                let reach, hTop, hBot, dmg, life;
                if (kieu === 0){ reach = 62*sc*DSAW_DAI; hTop = 30; hBot =  8; dmg = DSAW_CHEM; life=12; }
                else if (kieu === 1){ reach = 62*sc*DSAW_DAI; hTop =  8; hBot = 26; dmg = DSAW_CHEM; life=12; }
                else if (kieu === 3){ reach = 84*sc*DSAW_DAI; hTop = 34; hBot = 34; dmg = DSAW_KHONG;  life=15; }
                else if (kieu === 4){ reach = 58*sc*DSAW_DAI; hTop = 40; hBot =  0; dmg = DSAW_LEN; life=12; }
                else { reach = 74*sc*DSAW_DAI; hTop = 12; hBot = 12; dmg = DSAW_DAM; life=14; }
                if (kieu === 2 && nac >= 3){
                    /* NAC XANH: cu dam an 10-15 tuy da giu K bao lau trong khoang 1-2 giay. */
                    let u = Math.max(0, Math.min(1, ((this.dsawGiu || DSAW_NAC[3]) - DSAW_NAC[3]) / (DSAW_NAC[4] - DSAW_NAC[3])));
                    dmg = Math.round(DSAW_XANH_MIN + (DSAW_XANH_MAX - DSAW_XANH_MIN) * u);
                } else if (kieu === 2 && nac > 0) dmg = DSAW_DAM_NO;
                else dmg += cong;
                if (this._dsawSet){ dmg += 2; reach *= 1.28; }
                /* KHONG goi `_slashFx`. Do la hinh vet chem hinh luoi liem mau kem cua he
                   Kiem — chup ra thi no nam de len chinh cai cua va doc thanh "co mot luoi
                   kiem o day". Hans: "sua thanh CAC DUONG TRANG keo theo sau luoi THOI."
                   Nen vet chem cua DinoSaw chi con ba duong trang trong `dsawVeMot`. */
                this._beginSlash(dmg, life, dir, Math.round(reach), hTop, hBot, 0);
                if (kieu === 2 && this.slashAtk) this.slashAtk.dam = 1;   // @@HE-HITFX: cu dam cua cua
                this.dsawKieu = kieu; this.dsawVeT = life + 6; this.dsawVeT0 = life + 6;
                /* NAC VANG — CHEM KHI. Vung cua thi bat ra mot duong chem cong co rang cua bay
                   ra truoc. Dung lai he `giaoSong` san co (von de lam kiem khi cua Kiem) thay
                   vi dung mot he song thu hai: mot he song thi chi co mot cho de sua khi sai. */
                if (nac >= 2){
                    let _y = this.y + this.h * (kieu === 4 ? 0.28 : (kieu === 1 ? 0.62 : 0.46));
                    giaoSong.push({ chu: this, x: this.x + this.w/2 + dir * 26, y: _y,
                                    dir: dir, r: DSAW_KHI_R, t: DSAW_KHI_SONG, t0: DSAW_KHI_SONG,
                                    dmg: DSAW_KHI_DMG, nho: 1, xuyen: 0, kiem: 1, cua: 1,
                                    mui: (kieu === 2 ? 1 : 0), hit: new Set() });
                }
                if (typeof SFX !== 'undefined' && SFX.tone)
                    SFX.tone(kieu === 2 ? 170 : 380, kieu === 2 ? 0.16 : 0.07, 'sawtooth',
                             kieu === 2 ? 0.22 : 0.12, kieu === 2 ? 110 : 560);
                /* Don DAM: neu cham duoc ai thi GHIM va no may cua trong nguoi no. Phai cham
                   that — khong co doan keo nguoi choi toi cho muc tieu. */
                if (kieu === 2){
                    let rect = this._slashRect(false), muc = null;
                    if (rect && typeof allTargets === 'function')
                        for (let o of allTargets()){
                            if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                            if (checkAABB(rect, o)){ muc = o; break; }
                        }
                    if (muc){
                        this.slashAtk = null;                 // sat thuong di het qua duong GHIM
                        this.dsawDamKhoa = { muc: muc, t: 0, da: 0, dai: DSAW_DAM_KHOA, tong: dmg };
                        if (typeof venKhoa === 'function') venKhoa(muc, DSAW_DAM_KHOA + 10);
                        floatingTexts.push(new FloatingText(muc.x - 16, muc.y - 30, "GHIM!"));
                        shakeTimer = Math.max(shakeTimer, 16);
                    }
                }
            }
// PLAYER_PART_END s4.Player.prototype.dsawChem.1
};

// index.html:70678 · Phạm vi: Player.prototype
const __Part56 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawMayNong.1 EDITABLE
dsawMayNong(){
                if ((this.dsawNac || 0) <= 0 || (this.dsawSac || 0) > 0) return;
                if ((this._dsawNong || 0) >= DSAW_NONG_TRAN) return;
                if (this._dsawNongF === frames) return;               // mot nhat chem nhieu muc tieu van chi tinh mot lan
                this._dsawNongF = frames;
                let c = Math.min(DSAW_NONG_CONG, DSAW_NONG_TRAN - (this._dsawNong || 0));
                this._dsawNong = (this._dsawNong || 0) + c;
                this.dsawDong = Math.min(DSAW_DONG, (this.dsawDong || 0) + c);
            }
// PLAYER_PART_END s4.Player.prototype.dsawMayNong.1
};

// index.html:70687 · Phạm vi: Player.prototype
const __Part57 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawGiatDe.1 EDITABLE
dsawGiatDe(){
                this._dsawDeCd = DSAW_DE_HOI;
                if ((this.dsawSac || 0) > 0){ this.dsawSac = 0; this.dsawDong = 0; }   // may chet: giat la song lai
                this.dsawDong = Math.min(DSAW_DONG, (this.dsawDong || 0) + DSAW_DE_NAP);
                if ((this.dsawNac || 0) <= 0){ this.dsawNac = 1; this._dsawNong = 0; this.dsawGiu = DSAW_NAC[1]; }
                this._dsawSet = typeof setCanBat === 'function' && setCanBat();
                this.dsawChem(0);
                if (this._dsawSet && typeof setCanApDon === 'function') setCanApDon(this, 160);
                this._dsawSet = 0;
                this.attackCooldown = 16;
                floatingTexts.push(new FloatingText(this.x - 34, this.y - 30, LT("GIẬT DÂY ĐỀ!", "PULL START!")));
                shakeTimer = Math.max(shakeTimer, 8);
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(120, 0.10, 'sawtooth', 0.20, 260); SFX.tone(260, 0.22, 'sawtooth', 0.18, 520); }
            }
// PLAYER_PART_END s4.Player.prototype.dsawGiatDe.1
};

// index.html:70701 · Phạm vi: Player.prototype
const __Part58 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawCayBat.1 EDITABLE
dsawCayBat(){
                let no = (this.dsawNac || 0) > 0, dir = this.isFacingLeft ? -1 : 1;
                this._dsawCay = { t: 0, n: no ? 3 : 1, da: 0, dir: dir };
                if (typeof dashVx !== 'undefined') dashVx = dir * (no ? 26 : 14);
                this.attackCooldown = no ? 26 : 20;
                this.dsawCombo = 0; this.dsawCua = 0;
                floatingTexts.push(new FloatingText(this.x - 26, this.y - 30, LT("CÀY ĐẤT!", "PLOW!")));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(140, 0.25, 'sawtooth', 0.18, 90);
            }
// PLAYER_PART_END s4.Player.prototype.dsawCayBat.1
};

// index.html:70710 · Phạm vi: Player.prototype
const __Part59 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawTick2.1 EDITABLE
dsawTick2(giuJ){
                if ((this._dsawDeCd || 0) > 0) this._dsawDeCd--;
                if (!this._dsawDam && (frames - (this._dsawLuotCho || -999)) <= 24
                    && typeof dashVx !== 'undefined' && Math.abs(dashVx) > 2){
                    let dir = dashVx > 0 ? 1 : -1;
                    this._dsawDam = { t: 0, hit: new Set(), dir: dir };
                    this._dsawLuotCho = -999;
                    dashVx = dir * Math.max(Math.abs(dashVx), 18);
                    if (typeof setCanApDon === 'function') setCanApDon(this, 150);
                    floatingTexts.push(new FloatingText(this.x - 16, this.y - 30, LT("ĐÂM!", "THRUST!")));
                }
                if (this._dsawDam){
                    let D = this._dsawDam; D.t++;
                    let sc = this.getFormScale(), x0 = this.x + this.w / 2, reach = 78 * sc;
                    let rect = { x: D.dir > 0 ? x0 - 8 : x0 - reach, y: this.y + 2, w: reach + 8, h: this.h };
                    let dmg = DSAW_JD + ((this.dsawNac || 0) > 0 ? DSAW_NAC_CONG : 0);
                    if (typeof setCanDmg === 'function') dmg += setCanDmg();
                    if (typeof allTargets === 'function') for (let o of allTargets()){
                        if (!o || o.hp === undefined || o.hp <= 0 || D.hit.has(o)) continue;
                        if (!checkAABB(rect, o)) continue;
                        D.hit.add(o);
                        if (typeof dealDamage === 'function') dealDamage(o, dmg, 'ammo'); else o.hp -= dmg;
                        let L = (typeof worldL === 'function') ? worldL() : 0;
                        let R = (typeof worldR === 'function') ? worldR() : canvas.width;
                        o.x = Math.max(L, Math.min(R - (o.w || 20), o.x + D.dir * 28));
                    }
                    if (D.t === 1 && typeof SFX !== 'undefined' && SFX.tone) SFX.tone(180, 0.08, 'sawtooth', 0.16, 90);
                    if (D.t > 12) this._dsawDam = null;
                }
                // ---- CAY DAT ----
                if (this._dsawCay){
                    let C = this._dsawCay; C.t++;
                    this.dsawKieu = 1; this.dsawVeT = 8; this.dsawVeT0 = 8;     // giu tu the cua chuc xuong
                    if (C.t % DSAW_CAY_NHIP === 3 && C.da < C.n){
                        C.da++;
                        let sc = this.getFormScale(), x0 = this.x + this.w / 2;
                        let rect = { x: C.dir > 0 ? x0 - 10 : x0 - 100 * sc * DSAW_DAI, y: this.y + this.h - 40, w: 100 * sc * DSAW_DAI + 10, h: 46 };
                        if (this.meleeStrike(rect, DSAW_CAY_DMG)) this.dsawMayNong();
                        for (let k = 0; k < 3; k++)
                            visualEffects.push(new Effect(x0 + C.dir * (20 + Math.random() * 50), this.y + this.h - 4, 'explosion', true, 7 + Math.random() * 6));
                        shakeTimer = Math.max(shakeTimer, 4);
                    }
                    if (C.t >= C.n * DSAW_CAY_NHIP + 6) this._dsawCay = null;
                }
                // ---- NGHIEN ----
                let nac = this.dsawNac || 0;
                this._dsawGiuJ = giuJ ? (this._dsawGiuJ || 0) + 1 : 0;
                if (!this._dsawNghien && this._dsawGiuJ >= DSAW_NGHIEN_VAO && nac >= 1 && nac <= 3 && this.grounded
                    && !this.dsawDamKhoa && !this._dsawCay && !this.dsawMua && !this.dsawQuy && (this.dsawSac || 0) <= 0){
                    this._dsawNghien = { t: 0, nhip: 0 };
                    floatingTexts.push(new FloatingText(this.x - 20, this.y - 30, LT("NGHIẾN!", "GRIND!")));
                }
                if (this._dsawNghien){
                    let N = this._dsawNghien;
                    if (!giuJ || (this.dsawNac || 0) <= 0 || (this.dsawSac || 0) > 0 || this.dsawDamKhoa){ this._dsawNghien = null; this.attackCooldown = Math.max(this.attackCooldown || 0, 14); }
                    else {
                        N.t++;
                        let dir = this.isFacingLeft ? -1 : 1, sc = this.getFormScale();
                        this.attackCooldown = Math.max(this.attackCooldown || 0, 2);
                        this.dsawKieu = 2; this.dsawVeT = 8; this.dsawVeT0 = 8;   // giu tu the dam cua
                        this.dsawDong = Math.max(0, (this.dsawDong || 0) - 1);    // dot xang GAP DOI (dsawTick da tru 1)
                        if (N.t % DSAW_NGHIEN_NHIP === 0){
                            N.nhip++;
                            let d = Math.min(DSAW_NGHIEN_TRAN, N.nhip), x0 = this.x + this.w / 2;
                            let rect = { x: dir > 0 ? x0 : x0 - 76 * sc * DSAW_DAI, y: this.y + 6, w: 76 * sc * DSAW_DAI, h: this.h - 6 };
                            if (this.meleeStrike(rect, d)){
                                this.x -= dir * 5;                                      // bi day lui dan
                                let tx = x0 + dir * 60 * sc, ty = this.y + this.h * 0.5;
                                for (let k = 0; k < 2; k++) visualEffects.push(new Effect(tx + (Math.random() - 0.5) * 14, ty + (Math.random() - 0.5) * 14, 'explosion', true, 6 + d * 2));
                            }
                            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(200 + d * 60, 0.06, 'sawtooth', 0.12, 120);
                            shakeTimer = Math.max(shakeTimer, 2 + d);
                        }
                    }
                }
            }
// PLAYER_PART_END s4.Player.prototype.dsawTick2.1
};

// index.html:70788 · Phạm vi: Player.prototype
const __Part60 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawXoayVong.1 EDITABLE
dsawXoayVong(){
                let dir = this.isFacingLeft ? -1 : 1, sc = this.getFormScale();
                this._beginSlash(DSAW_XOAY_DMG, 12, dir, 0, 0, 0, Math.round(DSAW_XOAY_R * sc));
                this._dsawXoay = DSAW_XOAY_T;
                // @@HE-LOLUNG3: co muc tieu trong 360px -> vua xoay vua LAO toi no, nhat chem xuong roi dung dau no
                let N = (typeof this.hoverNgam === 'function') ? this.hoverNgam() : null;
                this._dsawXoayMuc = (N && N.o && Math.hypot(N.tx - (this.x + this.w / 2), N.ty - (this.y + this.h / 2)) < 440) ? N.o : null;
                if (this._dsawXoayMuc){ this.invincible = true; this.invTimer = Math.max(this.invTimer || 0, DSAW_XOAY_T); }
                this.attackCooldown = Math.max(this.attackCooldown || 0, 20);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(420, 0.2, 'sawtooth', 0.18, 900);
            }
// PLAYER_PART_END s4.Player.prototype.dsawXoayVong.1
};

// index.html:70800 · Phạm vi: Player.prototype
const __Part61 = {
// PLAYER_PART_BEGIN s4.Player.prototype.dsawBam.1 EDITABLE
dsawBam(){
                /* QUY CUA — "chem thoai mai khong thoi gian hoi chieu". Hai canh tay co cua
                   nen chem luan phien trai/phai, khong ton dan, khong co cu dam ghim (ghim
                   se khoa chan nguoi choi lai, nguoc han chu "thoai mai"). */
                if (this.dsawQuy){
                    this._dsawTay = 1 - (this._dsawTay || 0);
                    this.dsawChem(this.grounded ? this._dsawTay : 3);
                    this.attackCooldown = DSAW_QUY_NHIP;
                    return;
                }
                if (this.dsawDamKhoa) return;                 // dang ghim thi khong lam gi khac
                if (this._dsawNghien || this._dsawCay) return;   // @@HE-DSAW2: dang nghien / dang cay
                // @@HE-DSAW2 — LUOT + J: GIAT DAY DE
                if (typeof dangLuotHoacChop === 'function' && dangLuotHoacChop() && (this._dsawDeCd || 0) <= 0 && !this.dsawMua){
                    this.dsawGiatDe(); return;
                }
                // @@HE-DSAW2 — XUONG + J: CAY DAT
                if (this.grounded && (keys['KeyS'] || keys['ArrowDown']) && (this.dsawNac || 0) < 4){
                    if (this.isOverheated || this.ammo <= 0) return;
                    this.ammo--; this.dsawCayBat();
                    if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 55; }
                    return;
                }
                /* NAC 4 — CUA TU THAN: Hans dat ro "KHONG CO CHEM o don nay". Cai luoi tu an
                   moi khung (xem `dsawTuTick`), nen J khong con lam gi ca. */
                if ((this.dsawNac || 0) >= 4) return;
                if (this.isOverheated || this.ammo <= 0) return;
                this.ammo--;
                let lenKey = keys['KeyW'] || keys['ArrowUp'];
                if (!this.grounded){
                    // TREN KHONG: mot nhat rong, an ca tren lan duoi
                    this.dsawChem(3);
                    this.dsawCombo = 0; this.dsawCua = 0; this.attackCooldown = 20;
                } else if (lenKey){
                    // CHEM roi CHEM LEN — giong bo cua Kiem
                    this.dsawChem(0);
                    this.dsawNoiLen = 9;
                    this.dsawCombo = 0; this.dsawCua = 0; this.attackCooldown = 26;
                } else {
                    let step = this.dsawCombo || 0;
                    this.dsawChem(step === 2 ? 2 : step);
                    if (step >= 2){ this.dsawCombo = 0; this.dsawCua = 0; this.attackCooldown = 34; }
                    else { this.dsawCombo = step + 1; this.dsawCua = DSAW_CUA; this.attackCooldown = 17; }
                }
                /* @@HE-DSAW — qua nhiet NGAN hon cac vu khi can chien khac (110 -> 55).
                   Hans bao "khong co J nhay that ma, hoac la khong kich hoat". Do lai: don
                   tren khong CO ra, dung 8/8 lan nhay — nhung trong 900 khung giu J lien tuc
                   thi khau nay QUA NHIET 479 khung, tuc 53% thoi gian no khong lam gi duoc.
                   Nguoi choi nhay len bam J thi qua nua so lan roi dung vao khoang chet do,
                   va cam giac dung la "don nay khong ton tai".
                   Bang dan 5 la con so Hans dat nen khong dong; cai sua duoc la doan CHET
                   giua hai bang. 55 khung dua khoang chet ve khoang mot phan ba. */
                if (!(typeof dangLuotHoacChop === 'function' && dangLuotHoacChop())) this._dsawLuotCho = frames;
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 55; }
            }
// PLAYER_PART_END s4.Player.prototype.dsawBam.1
};

// index.html:70857 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.19 EDITABLE
vkDangKy(15, {
            ten: 'DINOSAW',
            trungCan(o){
                if (typeof dsawNovaMau === 'function') dsawNovaMau(this, o);   // @@HE-NOVA3: dang no may -> Chay mau
                this.dsawMayNong();                                              // @@HE-DSAW2
            },
            // @@HE-LOLUNG2 — rune LO LUNG: nha K giua khong (xem hoverMidCharge)
            hoverSac(half){ this.dsawXoayVong(); },
            sacToiDa(){ return DSAW_MUA_MOC; },
            banJ(){
                this.dsawBam();
            },
            nhaKTruoc(){
                /* @@HE-DSAW — NHA K LA NO MAY. Khac moi khau khac o cho: nha charge
                   khong ban ra thu gi ca, no BAT MOT TRANG THAI. Nac cao bao nhieu la do
                   thoi gian da giu, con no chay duoc bao lau la do THANH DONG CO — hai
                   dong ho tach roi nhau, va do la toan bo canh bac cua khau nay. */
                if (this._dsawMuaDa){
                    /* Vua mua cua xong thi nha K chi la DUNG MUA. Khong de no roi xuong
                       duoi va tinh thanh "giu 3 giay = CUA TU THAN" — nguoi choi dang tha
                       phim de dung lai, khong phai de bat mot trang thai moi. */
                    this._dsawMuaDa = 0; this.dsawMua = 0; this._dsawMuaKhoa = 0;
                }
                else if (this._dsawMuaKhoa){
                    this._dsawMuaKhoa = 0;                   // tha K sau khi bi ngat: khong no may
                }
                else {
                    let nac = dsawNacCua(this.aKeyHeldTime);
                    if (nac > 0 && (this.dsawSac || 0) <= 0 && this.dsawDong > 0){
                        this.dsawNac = nac;
                        this._dsawNong = 0;                 // @@HE-DSAW2: MAY NONG tinh lai tu dau moi lan no may
                        this.dsawGiu = this.aKeyHeldTime;   // nac XANH tinh sat thuong theo so nay
                        floatingTexts.push(new FloatingText(this.x - 34, this.y - 30, DSAW_NAC_TEN[nac] + "!"));
                        shakeTimer = Math.max(shakeTimer, 8 + nac * 3);
                        if (typeof SFX !== 'undefined' && SFX.tone){
                            SFX.tone(150 + nac * 90, 0.20, 'sawtooth', 0.24, 420 + nac * 160);
                        }
                    } else if (nac > 0){
                        floatingTexts.push(new FloatingText(this.x - 30, this.y - 26, "HẾT XĂNG!"));
                    }
                }
            },
            /* @@HE-DSAW — CHANNEL MUA CUA. Chay DONG CO nhu moi trang thai "may dang no"
               khac, nen no tu tat khi het xang — neu khong thi giu K la 4 sat thuong moi
               giay vo han, khong co gia nao ca. */
            channelRieng(chargeKey){
                let _vao = chargeKey && this.aKeyHeldTime >= DSAW_MUA_MOC && !this.dsawQuy
                           && !this._dsawMuaKhoa;            // bi ngat thi phai tha K ra moi vao lai
                if (_vao){
                    if (!this.dsawMua){
                        this.dsawMua = 1; this._dsawMuaDa = 1; this._dsawMuaN = 0;
                        this.dsawNac = 0; this.dsawMau = null;
                        floatingTexts.push(new FloatingText(this.x - 34, this.y - 32, "MÚA CƯA!"));
                        shakeTimer = Math.max(shakeTimer, 16);
                    }
                    this.dsawMuaTick();
                } else if (this.dsawMua){
                    this.dsawMua = 0;
                }
            },
            // thanh dong co + cua so combo + cu ghim
            moiKhung(checkAmmo, fireKey, chargeKey, crouchKey){
                this.dsawTick();
                this.dsawTick2(!!fireKey);   // @@HE-DSAW2
                // nhat HAT LEN noi ngay sau nhat dau khi dang giu huong len
                if ((this.dsawNoiLen || 0) > 0 && --this.dsawNoiLen === 0) this.dsawChem(4);
            },
            batUlt(){
                ultCharge = 0;                              // @@HE-DSAW — QUY CUA
                this.aKeyHeldTime = 0; this.chargeProgress = 0;
                this.dsawQuyBat();
            },
            veHudThem(){
                /* @@HE-DSAW — thanh DONG CO nam ngay duoi bang dan. Hai thanh phai doc duoc
                   cung luc: bang dan quyet dinh con chem duoc may nhat, dong co quyet dinh
                   cai cua con NO duoc bao lau. */
                if (dino){
                    const BX = 80, BY = 70, BW = 128, BH = 8;
                    let nac = dino.dsawNac || 0;
                    let u = Math.max(0, Math.min(1, (dino.dsawDong === undefined ? DSAW_DONG : dino.dsawDong) / DSAW_DONG));
                    ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.fillRect(BX - 1, BY - 1, BW + 2, BH + 2);
                    if ((dino.dsawSac || 0) > 0){
                        let v = 1 - dino.dsawSac / DSAW_SAC;
                        ctx.fillStyle = "#4E342E"; ctx.fillRect(BX, BY, BW * v, BH);
                        ctx.fillStyle = "#FF8A65"; ctx.font = "bold 10px Consolas, monospace";
                        ctx.fillText("CHẾT MÁY " + (dino.dsawSac/60).toFixed(1) + "s", BX + 4, BY + 7);
                    } else {
                        ctx.fillStyle = DSAW_NAC_MAU[nac] || "#B0BEC5";
                        ctx.fillRect(BX, BY, BW * u, BH);
                    }
                    ctx.font = "bold 11px Consolas, monospace";
                    if (dino.dsawQuy){
                        ctx.fillStyle = "#FF5722";
                        ctx.fillText("QUỶ CƯA " + (dino.dsawQuy.t / 60).toFixed(1) + "s", BX + BW + 8, BY + 8);
                    } else if (dino.dsawMua){
                        let _k = (dino._dsawMuaN || 0) >= DSAW_MUA_KHI;
                        ctx.fillStyle = _k ? "#FFD54F" : "#FF7043";
                        ctx.fillText(_k ? "MÚA CƯA · CHÉM KHÍ" : "MÚA CƯA " + (dino._dsawMuaN/60).toFixed(1) + "s", BX + BW + 8, BY + 8);
                    } else {
                        ctx.fillStyle = nac > 0 ? DSAW_NAC_MAU[nac] : "#546E7A";
                        ctx.fillText(nac > 0 ? DSAW_NAC_TEN[nac] : "MÁY TẮT", BX + BW + 8, BY + 8);
                    }
                }
            }
        });
// PLAYER_PART_END s4.vkDangKy.19
