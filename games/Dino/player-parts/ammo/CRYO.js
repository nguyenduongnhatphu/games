// PLAYER_FILE: CRYO
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CAM_TROI, Effect, FloatingText, PVP_HS, Projectile, SFX, addStyle, allTargets, bosses, canvas, checkAABB, ctx, dino, dsTrangThai, floatingTexts, frames, gameState, projectiles, pvpTuDoiThu, shakeTimer, ultCharge, visualEffects, vkDangKy
// index.html:54027 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CRYO_TANG.1 EDITABLE
const CRYO_TANG = 5, CRYO_DONG = 90, CRYO_MIEN = 180, CRYO_ULT_DONG = 180;
// PLAYER_PART_END s4.CRYO_TANG.1

// index.html:54028 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CRYO_ULT_VO.1 EDITABLE
const CRYO_ULT_VO = 5;
// PLAYER_PART_END s4.CRYO_ULT_VO.1

// index.html:54036 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoDangBang.1 EDITABLE
function cryoDangBang(o){ return o && (o._cryoBang || 0) > 0; }
// PLAYER_PART_END s4.cryoDangBang.1

// index.html:54039 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoBangUlt.1 EDITABLE
function cryoBangUlt(o){ return o && (o._cryoUB || 0) > 0; }
// PLAYER_PART_END s4.cryoBangUlt.1

// index.html:54040 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoTangCua.1 EDITABLE
function cryoTangCua(o){ return (o && o._cryoT) || 0; }
// PLAYER_PART_END s4.cryoTangCua.1

// index.html:54043 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoKhoaTich.1 EDITABLE
function cryoKhoaTich(o){ return o && (o._cryoMien || 0) > 0; }
// PLAYER_PART_END s4.cryoKhoaTich.1

// index.html:54044 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoCong.1 EDITABLE
function cryoCong(o, n, bu){
            if (!o || o.hp === undefined || o.invulnAll) return 0;
            // KHOA TICH: 3 giay sau khi tan bang thi khong cong duoc noi tai nua.
            // Bu lai bang sat thuong co dinh theo moc charge (cang charge lau cang nhieu).
            if (cryoKhoaTich(o)) return (bu === undefined ? 1 : bu);
            o._cryoT = (o._cryoT || 0) + n;
            if (o._cryoT >= CRYO_TANG){
                o._cryoT = 0;
                o._cryoBang = CRYO_DONG;
                o._cryoMien = CRYO_DONG + CRYO_MIEN;
                o._uFreeze = Math.max(o._uFreeze || 0, CRYO_DONG);
                if (typeof floatingTexts !== 'undefined')
                    floatingTexts.push(new FloatingText(o.x + (o.w||20)/2 - 40, o.y - 28, "ĐÓNG BĂNG!"));
                if (bosses.indexOf(o) >= 0) addStyle(12, 'dongbang');   // @@HE-STY-DACBIET: khong che la mot thanh qua
                visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'parry', false));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1500, 0.16, 'triangle', 0.2, 2400);
            }
            return 0;
        }
// PLAYER_PART_END s4.cryoCong.1

// index.html:54065 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoPha.1 EDITABLE
function cryoPha(o, dmgPha){
            if (cryoBangUlt(o)) return 0;        // bang ULT: danh vao khong lam vo duoc
            if (!cryoDangBang(o)) return 0;
            o._cryoBang = 0; o._uFreeze = 0;
            visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 30));
            if (typeof floatingTexts !== 'undefined')
                floatingTexts.push(new FloatingText(o.x + (o.w||20)/2 - 34, o.y - 30, "VỠ BĂNG!"));
            if (typeof SFX !== 'undefined' && SFX.glassBreak) SFX.glassBreak();
            if (bosses.indexOf(o) >= 0) addStyle(8, 'vobang');      // @@HE-STY-DACBIET
            return dmgPha;
        }
// PLAYER_PART_END s4.cryoPha.1

// index.html:54078 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoDon.1 EDITABLE
function cryoDon(o, dmgGoc, tang, dmgPha, bu){
            let d = cryoPha(o, dmgPha);
            if (d > 0) return d;
            return dmgGoc + cryoCong(o, tang, bu);
        }
// PLAYER_PART_END s4.cryoDon.1

// index.html:54084 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoDoGanGai.1 EDITABLE
function cryoDoGanGai(){
            if (typeof projectiles === 'undefined' || typeof allTargets !== 'function') return;
            for (let i = projectiles.length - 1; i >= 0; i--){
                let p = projectiles[i];
                if (!p || !p.cryoGai || p._daNo) continue;
                let pcx = p.x + p.w/2, pcy = p.y + p.h/2;
                let vung = { x: pcx - CRYO_GAI_TAM, y: pcy - CRYO_GAI_TAM, w: CRYO_GAI_TAM*2, h: CRYO_GAI_TAM*2 };
                let cham = null;
                for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    if (checkAABB(vung, o)){ cham = o; break; }
                }
                if (!cham) continue;
                p._daNo = 1;
                // CHI bung gai. Qua cau bang GOC van bay tiep va tu gay sat thuong khi cham
                // that su — truoc day toi cho no NO va XOA luon vien dan, nen don chinh bien
                // thanh mot vu no dien rong, chong len chinh may manh vua ban ra.
                if (typeof dino !== 'undefined' && dino.cryoNoGai) dino.cryoNoGai(pcx, pcy);
                p.w = Math.round(p.w * 0.62); p.h = Math.round(p.h * 0.62);   // vo gai da bung, loi nho lai
            }
        }
// PLAYER_PART_END s4.cryoDoGanGai.1

// index.html:54106 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoTick.1 EDITABLE
function cryoTick(){
            cryoDoGanGai();
            if (typeof allTargets !== 'function') return;
            for (let o of ((typeof dsTrangThai === 'function') ? dsTrangThai() : allTargets())){   // @@HE-P2KHOA: PvP gom ca P1
                if (!o) continue;
                // LOI TUNG GAP: Cryo chi NANG _uFreeze bang Math.max, con nguoi ha no xuong
                // lai la tickUnityUlt() — mot ham thuoc he Unity Clone. Bat ky khung nao
                // tickUnityUlt khong chay thi _cryoBang ve 0 nhung _uFreeze KET o 90 mai mai:
                // ke dich dung im vinh vien, ma lai KHONG con hinh bang nao tren nguoi
                // (vi cryoDangBang() doc _cryoBang chu khong doc _uFreeze).
                // Gio Cryo TU quan ly va TU tha khoa cua chinh no.
                if (o._cryoUB > 0){
                    o._cryoUB--;
                    o._uFreeze = Math.max(o._uFreeze || 0, o._cryoUB);
                    o._cryoOwn = 1;
                    if (o._cryoUB === 0){
                        // Bang ULT khong PHA SOM duoc, nhung het han thi TU VO — va vo bang
                        // thi an them dmg, dung luat co ban cua dan nay.
                        if (typeof pvpTuDoiThu === 'function') pvpTuDoiThu(o, () => { o.hp -= CRYO_ULT_VO; }); else o.hp -= CRYO_ULT_VO;   // @@HE-P2KHOA
                        visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 40));
                        if (typeof floatingTexts !== 'undefined')
                            floatingTexts.push(new FloatingText(o.x + (o.w||20)/2 - 34, o.y - 30, "VỠ BĂNG!"));
                        if (typeof SFX !== 'undefined' && SFX.glassBreak) SFX.glassBreak();
                        shakeTimer = Math.max(shakeTimer, 14);
                    }
                }
                if (o._cryoBang > 0){ o._cryoBang--; o._uFreeze = Math.max(o._uFreeze || 0, o._cryoBang); o._cryoOwn = 1; }
                if (o._cryoOwn && (o._cryoBang || 0) <= 0 && (o._cryoUB || 0) <= 0){
                    o._cryoOwn = 0;
                    if (!(o._uJC > 0)) o._uFreeze = 0;      // tru khi he khac dang thuc su khoa
                }
                if (o._cryoMien > 0) o._cryoMien--;
                if (o._cryoT > 0 && (o._cryoTho = (o._cryoTho || 0) + 1) > 300){ o._cryoT = 0; o._cryoTho = 0; }
            }
        }
// PLAYER_PART_END s4.cryoTick.1

// index.html:54142 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoVeBaoTuyet.1 EDITABLE
function cryoVeBaoTuyet(){
            ctx.save(); ctx.globalAlpha = 0.30; ctx.fillStyle = "#E1F5FE";
            ctx.fillRect(0, -CAM_TROI - 20, canvas.width, 340 + CAM_TROI + 20);
            ctx.globalAlpha = 0.85; ctx.fillStyle = "#FFFFFF";
            for (let k = 0; k < 90; k++){
                let x = (k * 137 + frames * 2.6) % canvas.width;
                let y = (k * 79 + frames * 5.2) % 340;
                ctx.fillRect(x, y, 2 + (k % 3), 2 + (k % 3));
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cryoVeBaoTuyet.1

// index.html:54154 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoVeUlt.1 EDITABLE
function cryoVeUlt(t, tamX){
            // LAN SONG BANG lan ra hai ben tu nguoi choi trong ~40 khung dau
            if (t < 46 && tamX !== undefined){
                let R = t * 26;
                ctx.save();
                for (let k = 0; k < 3; k++){
                    let rr = R - k * 34; if (rr <= 0) continue;
                    ctx.globalAlpha = Math.max(0, 0.85 - k * 0.25) * Math.max(0, 1 - t / 46);
                    ctx.strokeStyle = k ? "#81D4FA" : "#FFFFFF"; ctx.lineWidth = 7 - k * 2;
                    ctx.beginPath(); ctx.moveTo(tamX - rr, 320);
                    ctx.lineTo(tamX - rr * 0.72, 320 - 150); ctx.lineTo(tamX, 320 - 205);
                    ctx.lineTo(tamX + rr * 0.72, 320 - 150); ctx.lineTo(tamX + rr, 320);
                    ctx.stroke();
                }
                // gai bang moc len tren mat dat theo dau song
                ctx.globalAlpha = Math.max(0, 1 - t / 46);
                ctx.fillStyle = "rgba(225,245,254,0.9)";
                for (let sgn of [-1, 1]){
                    for (let d = 0; d < R; d += 30){
                        let px = tamX + sgn * d, h2 = 20 + (R - d) * 0.20;
                        ctx.beginPath();
                        ctx.moveTo(px - 11, 320); ctx.lineTo(px, 320 - h2); ctx.lineTo(px + 11, 320);
                        ctx.closePath(); ctx.fill();
                    }
                }
                ctx.restore();
            }
            let p = Math.min(1, t / 26), mo = t > 140 ? (180 - t) / 40 : 1;
            ctx.save();
            ctx.globalAlpha = Math.min(0.92, p) * mo;
            ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, -CAM_TROI - 20, canvas.width, 340 + CAM_TROI + 20);
            ctx.globalAlpha = 0.55 * mo; ctx.fillStyle = "#B3E5FC";
            ctx.fillRect(0, 300, canvas.width, 40);
            ctx.globalAlpha = 0.9 * mo; ctx.fillStyle = "#E1F5FE";
            for (let k = 0; k < 70; k++){
                let x = (k * 151 + frames * 1.8) % canvas.width;
                let y = (k * 91 + frames * 3.4) % 340;
                ctx.fillRect(x, y, 3, 3);
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cryoVeUlt.1

// index.html:54197 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoVeTinhThe.1 EDITABLE
function cryoVeTinhThe(o, manh){
            let W = (o.w||20), H = (o.h||20), cx = o.x + W/2, cy = o.y + H/2;
            let vien = manh ? 9 : 6;
            ctx.save();
            // khoi bang bao ngoai — vien GAY GOC chu khong phai hop vuong
            ctx.beginPath();
            ctx.moveTo(o.x - vien,        o.y + H*0.22);
            ctx.lineTo(o.x + W*0.26,      o.y - vien);
            ctx.lineTo(o.x + W*0.72,      o.y - vien*1.5);
            ctx.lineTo(o.x + W + vien,    o.y + H*0.30);
            ctx.lineTo(o.x + W + vien*0.6,o.y + H*0.80);
            ctx.lineTo(o.x + W*0.62,      o.y + H + vien);
            ctx.lineTo(o.x + W*0.22,      o.y + H + vien*0.7);
            ctx.lineTo(o.x - vien*1.2,    o.y + H*0.66);
            ctx.closePath();
            ctx.fillStyle = manh ? "rgba(225,245,254,0.70)" : "rgba(129,212,250,0.46)";
            ctx.fill();
            ctx.strokeStyle = manh ? "#FFFFFF" : "#E1F5FE"; ctx.lineWidth = manh ? 4 : 3; ctx.stroke();
            // mat cat trong long khoi — cho ra chat TINH THE
            ctx.strokeStyle = "rgba(255,255,255,0.75)"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(o.x + W*0.30, o.y - vien);   ctx.lineTo(cx, cy); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(o.x + W + vien, o.y + H*0.30); ctx.lineTo(cx, cy); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(o.x + W*0.24, o.y + H + vien*0.7); ctx.lineTo(cx, cy); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(o.x - vien, o.y + H*0.24); ctx.lineTo(cx, cy); ctx.stroke();
            // vai gai bang choi ra ngoai
            ctx.fillStyle = manh ? "rgba(255,255,255,0.95)" : "rgba(225,245,254,0.85)";
            for (let k = 0; k < 5; k++){
                let a = k * 1.257 + 0.4, R = (W + H) / 3.4;
                let gx = cx + Math.cos(a) * R, gy = cy + Math.sin(a) * R * 0.9;
                ctx.beginPath();
                ctx.moveTo(gx, gy);
                ctx.lineTo(gx + Math.cos(a + 0.5) * 11, gy + Math.sin(a + 0.5) * 11);
                ctx.lineTo(gx + Math.cos(a) * 19, gy + Math.sin(a) * 19);
                ctx.closePath(); ctx.fill();
            }
            // anh sang lap loe tren mat bang
            ctx.globalAlpha = 0.5 + 0.4 * Math.abs(Math.sin(frames * 0.06));
            ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(o.x + W*0.18, o.y + H*0.16); ctx.lineTo(o.x + W*0.40, o.y + H*0.06); ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s4.cryoVeTinhThe.1

// index.html:54240 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoVeThanh.1 EDITABLE
function cryoVeThanh(o){
            let W = (o.w||20), cx = o.x + W/2, by = o.y - 20;
            const BW = 46, BH = 7, x0 = cx - BW/2;
            let khoa = cryoKhoaTich(o), tang = cryoTangCua(o);
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(x0 - 1, by - 1, BW + 2, BH + 2);
            for (let k = 0; k < CRYO_TANG; k++){
                let sx = x0 + k * (BW / CRYO_TANG);
                ctx.fillStyle = k < tang ? (khoa ? "#78909C" : "#4FC3F7") : "rgba(255,255,255,0.13)";
                ctx.fillRect(sx + 1, by, BW / CRYO_TANG - 2, BH);
            }
            ctx.strokeStyle = khoa ? "#B0BEC5" : "#E1F5FE"; ctx.lineWidth = 1;
            ctx.strokeRect(x0 - 1.5, by - 1.5, BW + 3, BH + 3);
            if (khoa){
                // THANH BI DONG BANG: phu mot lop bang len chinh cai thanh
                ctx.fillStyle = "rgba(225,245,254,0.62)";
                ctx.fillRect(x0 - 2, by - 2, BW + 4, BH + 4);
                ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 2;
                ctx.strokeRect(x0 - 2, by - 2, BW + 4, BH + 4);
                ctx.strokeStyle = "rgba(129,212,250,0.95)"; ctx.lineWidth = 1.5;
                for (let k = 0; k < 5; k++){
                    let px = x0 + 4 + k * 10;
                    ctx.beginPath(); ctx.moveTo(px, by - 2); ctx.lineTo(px + 5, by + BH + 2); ctx.stroke();
                }
                ctx.fillStyle = "#B3E5FC"; ctx.font = "bold 8px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText("KHOÁ " + Math.ceil((o._cryoMien||0)/60) + "s", cx, by - 6); ctx.textAlign = "left";
            }
            ctx.restore();
        }
// PLAYER_PART_END s4.cryoVeThanh.1

// index.html:54270 · Phạm vi: global
// PLAYER_PART_BEGIN s4.cryoVe.1 EDITABLE
function cryoVe(){
            if (typeof allTargets !== 'function') return;
            for (let o of allTargets()){
                if (!o || o.hp === undefined || o.hp <= 0) continue;
                if (cryoBangUlt(o)){
                    cryoVeTinhThe(o, true);
                    ctx.fillStyle = "#01579B"; ctx.font = "bold 9px Consolas, monospace"; ctx.textAlign = "center";
                    ctx.fillText("BẤT ĐỘNG", o.x + (o.w||20)/2, o.y - 26); ctx.textAlign = "left";
                } else if (cryoDangBang(o)){
                    cryoVeTinhThe(o, false);
                }
                // Thanh noi tai luon hien khi co tang HOAC dang bi khoa tich
                if (cryoTangCua(o) > 0 || cryoKhoaTich(o)) cryoVeThanh(o);
            }
        }
// PLAYER_PART_END s4.cryoVe.1

// index.html:54289 · Phạm vi: global
// PLAYER_PART_BEGIN s4.CRYO_GAI_TAM.1 EDITABLE
let CRYO_GAI_TAM = 40;
// PLAYER_PART_END s4.CRYO_GAI_TAM.1

// index.html:54293 · Phạm vi: Player.prototype
const __Part17 = {
// PLAYER_PART_BEGIN s4.Player.prototype._cryoDan.1 EDITABLE
_cryoDan(x, y, dmg, tang, pha, spd, vy){
                let p = new Projectile(x, y, dmg, 6, vy || 0, 0, this.isFacingLeft ? -1 : 1, this.id);
                p.cryo = 1; p.cryoTang = tang; p.cryoPha = pha;
                if (spd) p.speed = spd * (this.isFacingLeft ? -1 : 1);
                projectiles.push(p);
                return p;
            }
// PLAYER_PART_END s4.Player.prototype._cryoDan.1
};

// index.html:54300 · Phạm vi: Player.prototype
const __Part18 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireCryoHoa.1 EDITABLE
fireCryoHoa(){                                  // danh thuong: 1 dmg, 1 tang, pha 3
                // Toc do dan cu (11-13) qua cham: dong bang 1.5 giay ma vien tiep theo bay
                // toi noi thi bang da tan, khong bao gio pha kip.
                this.ammo--; this.attackCooldown = 42;
                let pos = this.getShootPos();
                let p = this._cryoDan(pos.x, pos.y, 1, 1, 3, 19);
                p.cryoHoa = 1; p.cryoBu = 1;
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1200, 0.07, 'triangle', 0.14, 1900);
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 120; }
            }
// PLAYER_PART_END s4.Player.prototype.fireCryoHoa.1
};

// index.html:54310 · Phạm vi: Player.prototype
const __Part19 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cryoKhoi.1 EDITABLE
cryoKhoi(){                                     // 0.25-0.75s: khoi bang nen. 3 dmg, 2 tang, pha 5
                this.ammo--; this.attackCooldown = 16;
                let pos = this.getShootPos();
                let p = this._cryoDan(pos.x, pos.y, 3, 2, 5, 21);
                p.cryoKhoi = 1; p.cryoBu = 1; p.w = Math.round(p.w * 1.7); p.h = Math.round(p.h * 2.2);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(520, 0.12, 'square', 0.18, 900);
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 130; }
            }
// PLAYER_PART_END s4.Player.prototype.cryoKhoi.1
};

// index.html:54318 · Phạm vi: Player.prototype
const __Part20 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cryoGai.1 EDITABLE
cryoGai(){                                      // 0.75-1.25s: khoi GAI, trung thi toa manh
                this.ammo--; this.attackCooldown = 18;
                let pos = this.getShootPos();
                let p = this._cryoDan(pos.x, pos.y, 3, 3, 5, 20);
                p.cryoGai = 1; p.cryoBu = 2; p.w = Math.round(p.w * 1.8); p.h = Math.round(p.h * 2.4);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(420, 0.14, 'sawtooth', 0.2, 800);
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 140; }
            }
// PLAYER_PART_END s4.Player.prototype.cryoGai.1
};

// index.html:54326 · Phạm vi: Player.prototype
const __Part21 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cryoNoGai.1 EDITABLE
cryoNoGai(px, py){
                // NO ra TRUOC khi cham than dich (xem cryoDoGanGai) roi manh bay TOA TRON.
                // Truoc day khoi gai cham thang vao dich nen manh sinh ra ngay TRONG nguoi no,
                // dinh het mot cho va bi tran 3 manh khoa lai — nhin nhu khong he toa.
                // Bo dem nam tren CHINH CU NO (Map theo tung muc tieu). Truoc day dem tren
                // muc tieu theo id: manh cua cu truoc con bay khi cu sau no, id moi RESET bo
                // dem cua cu cu — hai cu thay nhau mo khoa cho nhau, do ra 5.3 manh/cu.
                let goi = { dem: new Map() };
                for (let k = 0; k < 10; k++){
                    let a = (k / 10) * Math.PI * 2 + Math.random() * 0.25;
                    let p = new Projectile(px, py, 1, 6, 0, 0, 1, this.id);
                    p.cryo = 1; p.cryoTang = 0; p.cryoPha = 1; p.cryoBu = 1; p.cryoManh = 1;
                    p.cryoGoi = goi;
                    p.speed = Math.cos(a) * 9.2; p.vy = Math.sin(a) * 9.2;
                    projectiles.push(p);
                }
                visualEffects.push(new Effect(px, py, 'explosion', true, 30));
                if (typeof SFX !== 'undefined' && SFX.glassBreak) SFX.glassBreak();
            }
// PLAYER_PART_END s4.Player.prototype.cryoNoGai.1
};

// index.html:54345 · Phạm vi: Player.prototype
const __Part22 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cryoTuong.1 EDITABLE
cryoTuong(giu){                                 // 1.25s+: tuong bang lon dan
                this.ammo--; this.attackCooldown = 30;
                let du = Math.max(0, Math.floor((giu - 105) / 30));   // moi 0.5s them 1 dmg + 1 tang
                // SONG BANG chay THANG RA XA va CANG XA CANG CAO — kieu anime.
                // Ban dau toi lam hinh chu nhat no ra tai cho nguoi choi nen no chi loe len
                // gan chan roi tat, khong he chay di dau.
                // Ban dat: moc cuoi 5, sac gan 3 giay len 6. Cong thuc cu la 4 + du voi
                // du = moi 30 khung +1, nen moc cuoi ra 4 va 175 khung ra 6. Doi thanh
                // 5 + du/2: 105f = 5, 175f = 6 — dung ca hai moc, ma `tang` van giu buoc 30
                // khung nen moc DONG BANG NGAY o 165f khong bi xe dich.
                // Chi doi o PvP, giong cach da lam voi Mua Giao; che do danh quai giu nguyen.
                // Chia nguoc he so 1.14 cua Cryo de con so ra man hinh dung bang 5 va 6 chan.
                let _dmgT = (gameState === 'pvp')
                    ? (5 + Math.floor(du / 2)) / (PVP_HS[8] || 1) + 1e-6
                    : (4 + du);
                this.cryoBucTuong = { x: this.x + this.w/2, dir: this.isFacingLeft ? -1 : 1, t: 0,
                                      front: 0, dmg: _dmgT, tang: 3 + du, bu: 3, hit: new Set() };
                floatingTexts.push(new FloatingText(this.x - 24, this.y - 32,
                    "TƯỜNG BĂNG " + (gameState === 'pvp' ? (5 + Math.floor(du / 2)) : (4 + du))));
                shakeTimer = Math.max(shakeTimer, 18);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(240, 0.3, 'sawtooth', 0.24, 1100);
                if (this.ammo <= 0){ this.isOverheated = true; this.overheatTimer = 150; }
            }
// PLAYER_PART_END s4.Player.prototype.cryoTuong.1
};

// index.html:54369 · Phạm vi: Player.prototype
const __Part23 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cryoCaoSong.1 EDITABLE
cryoCaoSong(d){ return Math.min(320 * 2/3, 26 + d * 0.40); }
// PLAYER_PART_END s4.Player.prototype.cryoCaoSong.1
};

// index.html:54370 · Phạm vi: Player.prototype
const __Part24 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cryoTickTuong.1 EDITABLE
cryoTickTuong(){
                let W = this.cryoBucTuong; if (!W) return;
                W.t++;
                W.front += 22;                               // dau song chay ra xa
                for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0 || W.hit.has(o)) continue;
                    let ocx = o.x + (o.w||20)/2;
                    let d = (ocx - W.x) * W.dir;
                    if (d < 0 || d > W.front) continue;      // chua toi cho no
                    let cao = this.cryoCaoSong(d);
                    if ((o.y + (o.h||20)) < 320 - cao) continue;   // dung cao hon song thi thoat
                    W.hit.add(o);
                    o.hp -= cryoDon(o, W.dmg, W.tang, 5, W.bu);
                    visualEffects.push(new Effect(ocx, o.y + (o.h||20)/2, 'explosion', true, 28));
                }
                if (W.front > canvas.width + 120) this.cryoBucTuong = null;
            }
// PLAYER_PART_END s4.Player.prototype.cryoTickTuong.1
};

// index.html:54387 · Phạm vi: Player.prototype
const __Part25 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cryoVeTuong.1 EDITABLE
cryoVeTuong(){
                let W = this.cryoBucTuong; if (!W) return;
                ctx.save();
                // Rang bang moc doc theo duong song da di qua, cai o xa CAO hon cai o gan
                const BUOC = 26;
                for (let d = 0; d < W.front; d += BUOC){
                    let px = W.x + W.dir * d;
                    if (px < -60 || px > canvas.width + 60) continue;
                    let cao = this.cryoCaoSong(d);
                    let treo = Math.max(0, 1 - (W.front - d) / 900);      // gan dau song thi mo dan
                    let mo = 0.45 + 0.5 * (1 - treo);
                    let lech = ((d / BUOC) % 2) ? 0.82 : 1;
                    ctx.fillStyle = "rgba(129,212,250," + (0.5 * mo).toFixed(2) + ")";
                    ctx.beginPath();
                    ctx.moveTo(px, 320);
                    ctx.lineTo(px + W.dir * BUOC * 0.5, 320 - cao * lech);
                    ctx.lineTo(px + W.dir * BUOC, 320);
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = "rgba(255,255,255," + (0.85 * mo).toFixed(2) + ")"; ctx.lineWidth = 2; ctx.stroke();
                }
                // DAU SONG: cot sang chay o mep truoc
                let fx = W.x + W.dir * W.front, fc = this.cryoCaoSong(W.front);
                ctx.shadowBlur = 22; ctx.shadowColor = "#E1F5FE";
                ctx.fillStyle = "rgba(255,255,255,0.9)";
                ctx.fillRect(fx - W.dir * 8, 320 - fc, 16, fc);
                ctx.restore();
            }
// PLAYER_PART_END s4.Player.prototype.cryoVeTuong.1
};

// index.html:54415 · Phạm vi: Player.prototype
const __Part26 = {
// PLAYER_PART_BEGIN s4.Player.prototype.cryoTickChannel.1 EDITABLE
cryoTickChannel() {
                this.cryoBaoT = (this.cryoBaoT || 0) + 1;
                if (this.cryoBaoT % 60 === 0){
                    for (let o of allTargets()){
                        if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                        if (cryoDangBang(o)) o.hp -= cryoPha(o, 3);
                        else o.hp -= 2 + cryoCong(o, 2);
                    }
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(880, 0.06, 'triangle', 0.1, 1400);
                }
            }
// PLAYER_PART_END s4.Player.prototype.cryoTickChannel.1
};

// index.html:54428 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.10 EDITABLE
vkDangKy(8, {
            ten: 'CRYO',
            sacToiDa: 105,
            banJ(){
                if (this.ammo > 0) this.fireCryoHoa();
            },
            nhaK(){
                // ===== CRYO — moc theo so khung GIU (maxChargeFrames = 105) =====
                //   <15f  hoa bang 1 dmg / 1 tang     | 15f  khoi bang 3 dmg / 2 tang
                //   45f   khoi GAI 3 dmg + manh / 3 tang | 75f TUONG BANG 4 dmg / 3 tang
                //   tren 105f: moi 30 khung them 1 dmg va 1 tang (165f = 5 tang = dong bang ngay)
                if (this.cryoChannel){ this.cryoChannel = false; this.cryoBaoT = 0; }
                else {
                    let _h = this.aKeyHeldTime, _ok = this.ammo > 0 && !this.isOverheated && this.attackCooldown <= 0;
                    if (_h >= 75 && _ok)      this.cryoTuong(_h);
                    else if (_h >= 45 && _ok) this.cryoGai();
                    else if (_h >= 15 && _ok) this.cryoKhoi();
                    else if (_ok)             this.fireCryoHoa();
                }
            },
            // CRYO CHANNEL — BAO TUYET: 2 dmg/giay + 2 tang/giay len TOAN BO ban do.
            // Dich dang dong bang thi VO ra, an them 3 dmg.
            channel(){
                if (!this.cryoChannel){ this.cryoChannel = true; this.cryoBaoT = 0;
                    floatingTexts.push(new FloatingText(this.x - 24, this.y - 30, "BÃO TUYẾT!"));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(200, 0.5, 'sawtooth', 0.2, 900); }
            },
            batUlt(){
                // ===== CRYO ULT: hoi bang trang xoa ca khu vuc, dong bang toan map =====
                ultCharge = 0;
                this.cryoUlt = { t: 0, x: this.x + this.w/2 };
                this.aKeyHeldTime = 0; this.chargeProgress = 0;
                for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                    o.hp -= 50;
                    // Trang thai RIENG: bat dong 3 giay, khong pha duoc, va khong dung
                    // chung gi voi he tang bang co ban (tang cu va mien nhiem giu nguyen).
                    o._cryoUB = CRYO_ULT_DONG;
                    o._uFreeze = Math.max(o._uFreeze || 0, CRYO_ULT_DONG);
                    visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 34));
                }
                floatingTexts.push(new FloatingText(canvas.width/2 - 80, 120, "TUYỆT ĐỐI LÃNH VỰC!"));
                shakeTimer = Math.max(shakeTimer, 40);
                if (typeof SFX !== 'undefined' && SFX.tone){ SFX.tone(140, 0.6, 'sawtooth', 0.3, 60); SFX.tone(1800, 0.4, 'triangle', 0.2, 2600); }
            },
            hoverSac(half){
                if (typeof this.cryoTuong === 'function') this.cryoTuong(90);
            }
        });
// PLAYER_PART_END s4.vkDangKy.10
