// PLAYER_FILE: RuneMenu
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: AMMO_NAMES, CX, LT, RDESC, RNAME, RUNES, RUNE_CATS, RUNE_LUP, canvas, ctx, dino, frames, mouseX, mouseY, pickerItems, runeGridGeom, runeScroll, runeTachDoan, runeXem, runeXemMax, runeXemScroll, wrapText
// index.html:83698 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runePicker.1 EDITABLE
let runePicker = null;
// PLAYER_PART_END s6.runePicker.1

// index.html:83908 · Phạm vi: global
// PLAYER_PART_BEGIN s6.RUNE_VIEW_TOP.1 EDITABLE
const RUNE_VIEW_TOP = 52, RUNE_HEAD_H = 26;
// PLAYER_PART_END s6.RUNE_VIEW_TOP.1

// index.html:83915 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeViewBot.1 EDITABLE
function runeViewBot(){ return 26; }
// PLAYER_PART_END s6.runeViewBot.1

// index.html:83917 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeThanhCuon.1 EDITABLE
function runeThanhCuon(L){
            let bx = L.gx + L.cols * L.cw + 6, bh = L.viewH;
            let th = Math.max(28, bh * (L.viewH / L.contentH));
            let ty = L.top + (bh - th) * (L.maxScroll > 0 ? runeScroll / L.maxScroll : 0);
            return { bx, bh, th, ty, top: L.top };
        }
// PLAYER_PART_END s6.runeThanhCuon.1

// index.html:83923 · Phạm vi: global
// PLAYER_PART_BEGIN s6._runeKeo.1 EDITABLE
let _runeKeo = null, _nuotClick = false;
// PLAYER_PART_END s6._runeKeo.1

// index.html:83924 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runePickerLayout.1 EDITABLE
function runePickerLayout(){
            let g = runeGridGeom(), cols = g.cols, cw = g.cw, ch = g.ch, gx = g.gx;
            let items = pickerItems(), cells = [], y = 0, heads = [];
            for (let c of RUNE_CATS){
                let group = items.filter(it => it.cat === c.key);
                if (!group.length) continue;
                heads.push({ cat: c, y: y });
                y += RUNE_HEAD_H;
                if (c.big) {
                    // RUNE 2 O: the CAO GAP DOI va rong gap ruoi -> du cho mo ta dai 3-4 dong
                    let bc = 1, bw = cols * cw, bh = ch * 3 + 24;   // 1 the moi hang, chiem tron be ngang
                    for (let i = 0; i < group.length; i++){
                        cells.push({ it: group[i], big: true,
                                     x: gx + (i % bc) * bw, y: y + Math.floor(i / bc) * bh, w: bw, h: bh });
                    }
                    y += Math.ceil(group.length / bc) * bh + 8;
                } else {
                    for (let i = 0; i < group.length; i++){
                        cells.push({ it: group[i], x: gx + (i % cols) * cw, y: y + Math.floor(i / cols) * ch, w: cw, h: ch });
                    }
                    y += Math.ceil(group.length / cols) * ch + 8;
                }
            }
            let viewH = canvas.height - RUNE_VIEW_TOP - runeViewBot();
            let maxScroll = Math.max(0, y - viewH);
            runeScroll = Math.max(0, Math.min(maxScroll, runeScroll));
            return { cells, heads, gx, cols, cw, ch, contentH: y, viewH, maxScroll, top: RUNE_VIEW_TOP };
        }
// PLAYER_PART_END s6.runePickerLayout.1

// index.html:83961 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeLupAt.1 EDITABLE
function runeLupAt(mx, my){
            let hit = runeCellAt(mx, my); if (!hit) return null;
            let c = hit.cell, sy = hit.sy;
            let bx = c.x + c.w - 4 - RUNE_LUP, by = sy + 3;
            if (mx >= bx && mx <= bx + RUNE_LUP && my >= by && my <= by + RUNE_LUP) return hit;
            return null;
        }
// PLAYER_PART_END s6.runeLupAt.1

// index.html:84024 · Phạm vi: global
// PLAYER_PART_BEGIN s6.runeCellAt.1 EDITABLE
function runeCellAt(mx, my){
            let L = runePickerLayout();
            if (my < L.top || my > L.top + L.viewH) return null;
            for (let c of L.cells){
                let sy = c.y - runeScroll + L.top;
                if (mx >= c.x + 4 && mx <= c.x + c.w - 4 && my >= sy && my <= sy + c.h - 6) return { cell: c, sy: sy, L: L };
            }
            return null;
        }
// PLAYER_PART_END s6.runeCellAt.1

// index.html:85425 · Phạm vi: global
// PLAYER_PART_BEGIN s6.drawRuneChiTiet.1 EDITABLE
function drawRuneChiTiet(){
            if (!runeXem) return;
            let r = RUNES.find(x => x.id === runeXem); if (!r){ runeXem = null; return; }
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.93)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            const PX = 70, PY = 34, PW = canvas.width - PX*2, PH = canvas.height - PY*2;
            ctx.fillStyle = "rgba(10,16,22,0.98)"; ctx.fillRect(PX, PY, PW, PH);
            ctx.strokeStyle = "#00E5FF"; ctx.lineWidth = 2; ctx.strokeRect(PX + 0.5, PY + 0.5, PW - 1, PH - 1);
            // dau bang
            ctx.textAlign = "left";
            ctx.fillStyle = "#00E5FF"; ctx.font = "bold 26px Consolas, monospace";
            ctx.fillText((r.icon ? r.icon + '  ' : '') + RNAME(r), PX + 24, PY + 42);
            ctx.fillStyle = "#FFEB3B"; ctx.font = "bold 14px Consolas, monospace";
            let phu = LT((r.cost || 1) + ' Ô', (r.cost || 1) + ' SLOT');
            if (r.onlyAmmo !== undefined) phu += '   ·   ' + LT('ĐỘC QUYỀN ', 'ONLY ') + AMMO_NAMES[r.onlyAmmo];
            else if (Array.isArray(r.onlyAmmoAny)) phu += '   ·   ' + r.onlyAmmoAny.map(a => AMMO_NAMES[a]).join(' / ');
            if (r.onlyStance !== undefined) phu += '   ·   ' + LT('CHỈ Ở THẾ ', 'ONLY IN ') + ['GUNSLINGER','TRICKSTER','ROYAL GUARD'][r.onlyStance];
            ctx.fillText(phu, PX + 24, PY + 64);
            ctx.strokeStyle = "rgba(0,229,255,0.35)"; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(PX + 24, PY + 76); ctx.lineTo(PX + PW - 24, PY + 76); ctx.stroke();
            // NUT X goc phai tren
            const XB = { x: PX + PW - 38, y: PY + 12, w: 26, h: 26 };
            let hovX = mouseX >= XB.x && mouseX <= XB.x + XB.w && mouseY >= XB.y && mouseY <= XB.y + XB.h;
            ctx.fillStyle = hovX ? "rgba(255,82,82,0.35)" : "rgba(255,255,255,0.08)";
            ctx.fillRect(XB.x, XB.y, XB.w, XB.h);
            ctx.strokeStyle = hovX ? "#FF5252" : "rgba(255,255,255,0.45)"; ctx.lineWidth = 2;
            ctx.strokeRect(XB.x + 0.5, XB.y + 0.5, XB.w - 1, XB.h - 1);
            ctx.beginPath();
            ctx.moveTo(XB.x + 8, XB.y + 8); ctx.lineTo(XB.x + XB.w - 8, XB.y + XB.h - 8);
            ctx.moveTo(XB.x + XB.w - 8, XB.y + 8); ctx.lineTo(XB.x + 8, XB.y + XB.h - 8);
            ctx.stroke();
            drawRuneChiTiet._X = XB;
            // than bang — CO CUON
            const TOP = PY + 92, BOT = PY + PH - 40;
            ctx.save();
            ctx.beginPath(); ctx.rect(PX + 12, TOP, PW - 24, BOT - TOP); ctx.clip();
            let y = TOP + 12 - runeXemScroll, maxW = PW - 76;
            ctx.font = "15px Consolas, monospace";
            for (let doan of runeTachDoan(RDESC(r))){
                if (y > BOT + 60) break;
                // dau doan: neu bat dau bang cum VIET HOA thi tach ra lam nhan
                let m = doan.match(/^([A-ZÀ-Ỹ0-9 ()\/]{3,32}):\s*(.*)$/);
                if (m){
                    ctx.fillStyle = "#76FF03"; ctx.font = "bold 15px Consolas, monospace";
                    ctx.fillText(m[1], PX + 28, y);
                    let w = ctx.measureText(m[1]).width;
                    ctx.fillStyle = "#E0F7FA"; ctx.font = "15px Consolas, monospace";
                    y = wrapText(m[2], PX + 34 + w, y, maxW - w - 10, 21);
                } else {
                    ctx.fillStyle = "#B3E5FC"; ctx.fillRect(PX + 26, y - 9, 4, 4);
                    ctx.fillStyle = "#E0F7FA"; ctx.font = "15px Consolas, monospace";
                    y = wrapText(doan, PX + 38, y, maxW - 14, 21);
                }
                y += 8;
            }
            ctx.restore();
            runeXemMax = Math.max(0, (y + runeXemScroll) - BOT + 20);
            runeXemScroll = Math.max(0, Math.min(runeXemMax, runeXemScroll));
            if (runeXemMax > 0){
                let tx = PX + PW - 20, th = BOT - TOP;
                ctx.fillStyle = "rgba(255,255,255,0.10)"; ctx.fillRect(tx, TOP, 6, th);
                let hh = Math.max(28, th * (th / (th + runeXemMax)));
                let hy = TOP + (th - hh) * (runeXemMax ? runeXemScroll / runeXemMax : 0);
                ctx.fillStyle = "#00E5FF"; ctx.fillRect(tx, hy, 6, hh);
                if (runeXemScroll < runeXemMax){
                    ctx.fillStyle = (frames % 30 < 15) ? "#00E5FF" : "rgba(0,229,255,0.35)";
                    ctx.font = "bold 12px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("▼", tx + 3, BOT + 14); ctx.textAlign = "left";
                }
            }
            ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "bold 12px Consolas, monospace";
            ctx.textAlign = "center";
            ctx.fillText(LT("LĂN CHUỘT ĐỂ CUỘN  ·  BẤM X HOẶC RA NGOÀI ĐỂ ĐÓNG",
                            "SCROLL TO READ  ·  CLICK X OR OUTSIDE TO CLOSE"), CX, PY + PH - 16);
            ctx.textAlign = "left";
            ctx.restore();
        }
// PLAYER_PART_END s6.drawRuneChiTiet.1

// index.html:89222 · Phạm vi: global
// PLAYER_PART_BEGIN s6.drawRuneShieldBubble.1 EDITABLE
function drawRuneShieldBubble(){
            if (typeof dino === 'undefined' || !dino) return;
            let n = dino.runeShield || 0; if (n <= 0) return;
            let cx = dino.x + dino.w/2, cy = dino.y + dino.h/2;
            let pulse = 0.6 + 0.4*Math.sin(frames*0.14);
            ctx.save();
            for (let k = 0; k < n; k++){
                let r = dino.w*0.95 + k*9;
                ctx.fillStyle = "rgba(79,195,247," + (0.07 + 0.05*pulse).toFixed(2) + ")";
                ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fill();
                ctx.strokeStyle = "rgba(129,212,250," + (0.55 + 0.35*pulse).toFixed(2) + ")"; ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
                // van luc giac chay quanh khien
                ctx.strokeStyle = "rgba(225,245,254,0.5)"; ctx.lineWidth = 1.2;
                for (let s = 0; s < 6; s++){ let a = frames*0.02 + s*(Math.PI/3) + k*0.4;
                    ctx.beginPath(); ctx.arc(cx, cy, r, a, a + 0.34); ctx.stroke(); }
            }
            ctx.restore();
        }
// PLAYER_PART_END s6.drawRuneShieldBubble.1
