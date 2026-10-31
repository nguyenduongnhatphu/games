// PLAYER_FILE: RAPIDFIRE
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CM, Effect, FloatingText, Projectile, SFX, allTargets, camX, canvas, combatStance, ctx, currentAmmoType, dino, floatingTexts, frames, gameState, hasRune, keys, platforms, projectiles, shakeTimer, ultCharge, visualEffects, vkDangKy
// index.html:50038 · Phạm vi: global
// PLAYER_PART_BEGIN s4.RF_NHIET_MAX.1 EDITABLE
const RF_NHIET_MAX = 50, RF_NHIET_HOI = RF_NHIET_MAX / 300, RF_QUANHIET = 300;
// PLAYER_PART_END s4.RF_NHIET_MAX.1

// index.html:50039 · Phạm vi: global
// PLAYER_PART_BEGIN s4.RF_NHIET_CHO.1 EDITABLE
const RF_NHIET_CHO = 18;
// PLAYER_PART_END s4.RF_NHIET_CHO.1

// index.html:50040 · Phạm vi: global
// PLAYER_PART_BEGIN s4.RF_DRONE_DAN.1 EDITABLE
const RF_DRONE_DAN = 60;
// PLAYER_PART_END s4.RF_DRONE_DAN.1

// index.html:50041 · Phạm vi: global
// PLAYER_PART_BEGIN s4.RF_DRONE_TIM.1 EDITABLE
const RF_DRONE_TIM = 40;
// PLAYER_PART_END s4.RF_DRONE_TIM.1

// index.html:50044 · Phạm vi: global
// PLAYER_PART_BEGIN s4.RF_DRONE_CHO.1 EDITABLE
const RF_DRONE_CHO = 180;
// PLAYER_PART_END s4.RF_DRONE_CHO.1

// index.html:50048 · Phạm vi: global
// PLAYER_PART_BEGIN s4.RF_TAN_DAN.1 EDITABLE
const RF_TAN_DAN = 5, RF_TAN_QUET = 1;
// PLAYER_PART_END s4.RF_TAN_DAN.1

// index.html:50049 · Phạm vi: global
// PLAYER_PART_BEGIN s4.rfTanCuoc.1 EDITABLE
function rfTanCuoc(d){
            if (!d || d.roi || d.tan) return;
            d.tan = 1; d.tanBan = 0; d.tanQuet = 0;
        }
// PLAYER_PART_END s4.rfTanCuoc.1

// index.html:50053 · Phạm vi: global
// PLAYER_PART_BEGIN s4.RF_CHUOI.1 EDITABLE
const RF_CHUOI = 30;
// PLAYER_PART_END s4.RF_CHUOI.1

// index.html:50054 · Phạm vi: global
// PLAYER_PART_BEGIN s4.RF_NGUOI.1 EDITABLE
const RF_NGUOI = 24;
// PLAYER_PART_END s4.RF_NGUOI.1

// index.html:50055 · Phạm vi: global
// PLAYER_PART_BEGIN s4.RF_LECH.1 EDITABLE
const RF_LECH = 7;
// PLAYER_PART_END s4.RF_LECH.1

// index.html:50070 · Phạm vi: global
// PLAYER_PART_BEGIN s4.TL_USUNG_MOI_GIAY.1 EDITABLE
const TL_USUNG_MOI_GIAY = 8;
// PLAYER_PART_END s4.TL_USUNG_MOI_GIAY.1

// index.html:50071 · Phạm vi: global
// PLAYER_PART_BEGIN s4.TL_TANK_MAU.1 EDITABLE
const TL_TANK_MAU = 10;
// PLAYER_PART_END s4.TL_TANK_MAU.1

// index.html:50072 · Phạm vi: global
// PLAYER_PART_BEGIN s4.TL_TANK_HOI.1 EDITABLE
const TL_TANK_HOI = 120;
// PLAYER_PART_END s4.TL_TANK_HOI.1

// index.html:50073 · Phạm vi: global
// PLAYER_PART_BEGIN s4.TL_DRONE_NAP.1 EDITABLE
const TL_DRONE_NAP = 300;
// PLAYER_PART_END s4.TL_DRONE_NAP.1

// index.html:50074 · Phạm vi: global
// PLAYER_PART_BEGIN s4.TL_PHAO_NAP.1 EDITABLE
const TL_PHAO_NAP = 180;
// PLAYER_PART_END s4.TL_PHAO_NAP.1

// index.html:50075 · Phạm vi: global
// PLAYER_PART_BEGIN s4.TL_PHAO_TRAN.1 EDITABLE
const TL_PHAO_TRAN = 1;
// PLAYER_PART_END s4.TL_PHAO_TRAN.1

// index.html:50076 · Phạm vi: global
// PLAYER_PART_BEGIN s4.TL_KHIEN_DAI.1 EDITABLE
const TL_KHIEN_DAI = 180;
// PLAYER_PART_END s4.TL_KHIEN_DAI.1

// index.html:50077 · Phạm vi: global
// PLAYER_PART_BEGIN s4.TL_KHIEN_CD.1 EDITABLE
const TL_KHIEN_CD = 480;
// PLAYER_PART_END s4.TL_KHIEN_CD.1

// index.html:50078 · Phạm vi: global
// PLAYER_PART_BEGIN s4.tlBat.1 EDITABLE
function tlBat(){ return typeof hasRune === 'function' && hasRune('trienlien') && currentAmmoType === 2; }
// PLAYER_PART_END s4.tlBat.1

// index.html:50079 · Phạm vi: global
// PLAYER_PART_BEGIN s4.tlThe.1 EDITABLE
let tlThe = -1;
// PLAYER_PART_END s4.tlThe.1

// index.html:50080 · Phạm vi: global
// PLAYER_PART_BEGIN s4.tlDoiThe.1 EDITABLE
function tlDoiThe(cu, moi){
            if (!dino) return;
            // ---- ROI khoi TRICKSTER: u sung KHAI HOA ----
            if (cu === 1 && dino.tlUSung){
                let u = dino.tlUSung; dino.tlUSung = null;
                dino.sentries.push({ x: u.x, y: 320, dan: u.dan, cd: 0, mo: 0, xoay: 0,
                                     goc: dino.isFacingLeft ? Math.PI : 0, thu: 0 });
                floatingTexts.push(new FloatingText(u.x - 40, 250, "Ụ SÚNG KHAI HOẢ — " + u.dan + " VIÊN"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(300, 0.2, 'square', 0.24, 900);
            }
            // ---- ROI khoi TRICKSTER: drone laser bay di ----
            if (cu === 1 && dino.rapidDrone) for (let d of dino.rapidDrone) if (d.loai === 'laser') rfTanCuoc(d);
            // ---- VAO TRICKSTER: cam mot u sung MOI, chua ban ----
            if (moi === 1){
                dino.tlUSung = { x: dino.x + dino.w/2, dan: 0, t: 0 };
                floatingTexts.push(new FloatingText(dino.x - 30, dino.y - 32, "CẮM Ụ SÚNG"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(420, 0.14, 'square', 0.2, 700);
            }
            // ---- VAO GUNSLINGER: DRONE KHIEN bung khien chan toan bo 3 giay ----
            if (moi === 0 && (dino.tlKhienCd || 0) <= 0){
                dino.tlKhienT = TL_KHIEN_DAI; dino.tlKhienCd = TL_KHIEN_CD;
                floatingTexts.push(new FloatingText(dino.x - 34, dino.y - 34, "DRONE KHIÊN — 3 GIÂY"));
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(900, 0.2, 'triangle', 0.22, 1500);
            }
            // ---- VAO ROYAL GUARD: hoa xe tang, nhan 1 phao neu da nap ----
            if (moi === 2){
                if (!dino.tank) dino.tank = { dan: 0, cd: 0, phao: 0, phaoCd: 0, goc: 0, nong: 0, mg: 0, t: 0, no: [],
                                              giap: dino.tlTankMau === undefined ? TL_TANK_MAU : dino.tlTankMau };
                dino.tank.dan = 0;                          // KHONG co sung may
                // Tran 1 vien: khong don nhieu phao roi ban mot luc
                if (dino.tlPhaoSan > 0){ dino.tank.phao = Math.min(TL_PHAO_TRAN, dino.tank.phao + dino.tlPhaoSan); dino.tlPhaoSan = 0; }
                if (dino.tlDroneSan){ dino.tlDroneSan = false;
                    if (!dino.rapidDrone) dino.rapidDrone = [];
                    if (!dino.rapidDrone.some(d => d.loai === 'dan'))
                        dino.rapidDrone.push({ loai:'dan', x: dino.x - 90, y: -40, cd: 0, goc: 0, ban: 0, roi: 0 });
                }
                floatingTexts.push(new FloatingText(dino.x - 40, dino.y - 34, "XE TĂNG — PHÁO " + dino.tank.phao));
            }
            // ---- ROI khoi ROYAL GUARD: cat xe tang lai, nho mau ----
            if (cu === 2 && dino.tank){
                dino.tlTankMau = Math.max(0, dino.tank.giap);
                dino.tank = null;
            }
        }
// PLAYER_PART_END s4.tlDoiThe.1

// index.html:50124 · Phạm vi: global
// PLAYER_PART_BEGIN s4.tlVe.1 EDITABLE
function tlVe(){
            if (!dino || !tlBat()) return;
            let U = dino.tlUSung;
            if (U){
                // U SUNG dang NAP — chua ban, hien so dan
                ctx.save();
                ctx.fillStyle = "#2E7D32"; ctx.fillRect(U.x - 16, 296, 32, 24);
                ctx.fillStyle = "#66BB6A"; ctx.fillRect(U.x - 16, 296, 32, 7);
                ctx.strokeStyle = "#14200A"; ctx.lineWidth = 3; ctx.strokeRect(U.x - 16, 296, 32, 24);
                ctx.fillStyle = "#1B3A1E"; ctx.fillRect(U.x - 5, 286, 10, 12);
                ctx.fillStyle = (frames % 20 < 10) ? "#FFEB3B" : "#AED581";
                ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText("NẠP " + U.dan, U.x, 282);
                ctx.textAlign = "left"; ctx.restore();
            }
            // DRONE KHIEN dang bung
            if ((dino.tlKhienT || 0) > 0){
                let cx = dino.x + dino.w/2, cy = dino.y + dino.h/2;
                let p = dino.tlKhienT / TL_KHIEN_DAI;
                ctx.save();
                ctx.globalAlpha = 0.30 + 0.18 * Math.abs(Math.sin(frames * 0.12));
                ctx.fillStyle = "#4FC3F7";
                ctx.beginPath(); ctx.arc(cx, cy, 46, 0, Math.PI*2); ctx.fill();
                ctx.globalAlpha = 0.95; ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(cx, cy, 46, -Math.PI/2, -Math.PI/2 + Math.PI*2*p); ctx.stroke();
                // con drone lo lung tren dau
                let dx = cx, dy = dino.y - 52 + Math.sin(frames * 0.06) * 5;
                ctx.fillStyle = "#0277BD"; ctx.fillRect(dx - 13, dy - 8, 26, 16);
                ctx.fillStyle = "#4FC3F7"; ctx.fillRect(dx - 13, dy - 8, 26, 5);
                ctx.strokeStyle = "#01579B"; ctx.lineWidth = 2; ctx.strokeRect(dx - 13, dy - 8, 26, 16);
                ctx.strokeStyle = "rgba(179,229,252,0.85)"; ctx.lineWidth = 2;
                let w2 = (frames % 6 < 3) ? 15 : 8;
                ctx.beginPath(); ctx.moveTo(dx - w2, dy - 10); ctx.lineTo(dx + w2, dy - 10); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(dx, dy + 8); ctx.lineTo(cx, cy - 40); ctx.stroke();
                ctx.restore();
            }
            // bang trang thai goc trai
            ctx.save();
            ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.fillRect(14, 230, 176, 60);
            ctx.fillStyle = "#AED581"; ctx.font = "bold 10px Consolas, monospace";
            ctx.fillText("PHÁO " + (dino.tlPhaoSan || 0) + "/" + TL_PHAO_TRAN + "   XE " + (dino.tlTankMau || 0) + "/" + TL_TANK_MAU, 22, 246);
            ctx.fillStyle = dino.tlDroneSan ? "#76FF03" : "#607D8B";
            ctx.fillText("DRONE " + (dino.tlDroneSan ? "SẴN" : Math.ceil((TL_DRONE_NAP - (dino.tlNapDrone||0))/60) + "s"), 22, 262);
            ctx.fillStyle = (dino.tlKhienT > 0) ? "#4FC3F7" : ((dino.tlKhienCd || 0) > 0 ? "#607D8B" : "#76FF03");
            ctx.fillText("KHIÊN " + (dino.tlKhienT > 0 ? (dino.tlKhienT/60).toFixed(1) + "s"
                        : ((dino.tlKhienCd || 0) > 0 ? "hồi " + Math.ceil(dino.tlKhienCd/60) + "s" : "SẴN")), 22, 278);
            ctx.fillStyle = "#B0BEC5";
            ctx.fillText(["GUNSLINGER","TRICKSTER","ROYAL GUARD"][combatStance], 22, 288);
            ctx.restore();
        }
// PLAYER_PART_END s4.tlVe.1

// index.html:50174 · Phạm vi: global
// PLAYER_PART_BEGIN s4.tlTick.1 EDITABLE
function tlTick(){
            if (!dino) return;
            if (!tlBat()){ tlThe = combatStance; return; }
            if (tlThe !== combatStance){ let cu = tlThe; tlThe = combatStance; tlDoiThe(cu, combatStance); }
            if (dino.tlPhaoSan === undefined) dino.tlPhaoSan = 1;
            if (dino.tlTankMau === undefined) dino.tlTankMau = TL_TANK_MAU;

            if (combatStance === 1){
                // U SUNG nap dan (chua ban)
                if (dino.tlUSung){
                    dino.tlUSung.t++;
                    if (dino.tlUSung.t % 60 === 0) dino.tlUSung.dan += TL_USUNG_MOI_GIAY;
                }
                // DRONE LASER quet lien tuc
                if (!dino.rapidDrone) dino.rapidDrone = [];
                if (!dino.rapidDrone.some(d => d.loai === 'laser'))
                    dino.rapidDrone.push({ loai:'laser', x: dino.x + 90, y: -40, cd: 0, goc: 0, quet: null, luot: 0, huongDau: 1, roi: 0 });
            }
            // NAP / HOI: chay o MOI the tru Royal Guard. Ban dau toi long ca khoi nay vao
            // nhanh `else` cua `if (stance === 1)`, nen dung o TRICKSTER la khong nap gi ca —
            // xe tang khong bao gio hoi mau neu nguoi choi luan phien Gunslinger <-> Trickster.
            if (combatStance !== 2){
                dino.tlNapDrone = (dino.tlNapDrone || 0) + 1;
                if (dino.tlNapDrone >= TL_DRONE_NAP){ dino.tlNapDrone = 0; dino.tlDroneSan = true; }
                dino.tlNapPhao = (dino.tlNapPhao || 0) + 1;
                if (dino.tlNapPhao >= TL_PHAO_NAP){ dino.tlNapPhao = 0; dino.tlPhaoSan = Math.min(TL_PHAO_TRAN, (dino.tlPhaoSan || 0) + 1); }
                dino.tlNapMau = (dino.tlNapMau || 0) + 1;
                if (dino.tlNapMau >= TL_TANK_HOI){ dino.tlNapMau = 0; dino.tlTankMau = Math.min(TL_TANK_MAU, (dino.tlTankMau || 0) + 1); }
            }
            // ---- DRONE KHIEN cua GUNSLINGER ----
            if (dino.tlKhienCd > 0) dino.tlKhienCd--;
            if (dino.tlKhienT > 0){
                dino.tlKhienT--;
                dino.invincible = true; dino.invTimer = Math.max(dino.invTimer || 0, 2);
            }
        }
// PLAYER_PART_END s4.tlTick.1

// index.html:50216 · Phạm vi: Player.prototype
const __Part23 = {
// PLAYER_PART_BEGIN s4.Player.prototype.rfTien.1 EDITABLE
rfTien(){                       // 0 -> 1 theo chuoi ban
                return Math.max(0, Math.min(1, (this.rfChuoi || 0) / RF_CHUOI));
            }
// PLAYER_PART_END s4.Player.prototype.rfTien.1
};

// index.html:50219 · Phạm vi: Player.prototype
const __Part24 = {
// PLAYER_PART_BEGIN s4.Player.prototype.rfCong.1 EDITABLE
rfCong(){
                this.rfChuoi = Math.min(RF_CHUOI, (this.rfChuoi || 0) + 1);
                this.rfNghi = 0;
            }
// PLAYER_PART_END s4.Player.prototype.rfCong.1
};

// index.html:50223 · Phạm vi: Player.prototype
const __Part25 = {
// PLAYER_PART_BEGIN s4.Player.prototype.rfTick.1 EDITABLE
rfTick(){
                if ((this.rfChuoi || 0) > 0){
                    this.rfNghi = (this.rfNghi || 0) + 1;
                    if (this.rfNghi > RF_NGUOI){ this.rfChuoi = 0; this.rfNghi = 0; }
                }
                // NHIET chi ha khi DA NGUNG BAN han. Truoc day toi xet tung khung mot, ma nhip
                // ban la 4-8 khung nen phan lon khung khong co dan -> nhiet vua tang vua tu ha.
                if (this.rfNgat > 0) this.rfNgat--;
                if (this.rfDroneCho){
                    if (this.rfDroneCho.dan   > 0) this.rfDroneCho.dan--;
                    if (this.rfDroneCho.laser > 0) this.rfDroneCho.laser--;
                }
                this.rfChoNguoi = (this.rfVuaBan ? 0 : (this.rfChoNguoi || 0) + 1);
                if (this.rfChoNguoi > RF_NHIET_CHO && (this.rfNhiet || 0) > 0)
                    this.rfNhiet = Math.max(0, this.rfNhiet - RF_NHIET_HOI);
                this.rfVuaBan = 0;
            }
// PLAYER_PART_END s4.Player.prototype.rfTick.1
};

// index.html:50240 · Phạm vi: Player.prototype
const __Part26 = {
// PLAYER_PART_BEGIN s4.Player.prototype.rfNongLen.1 EDITABLE
rfNongLen(n){
                this.rfNhiet = (this.rfNhiet || 0) + n;
                this.rfVuaBan = 1;
                if (hasRune('trienlien')){ this.rfNhiet = Math.min(this.rfNhiet, RF_NHIET_MAX - 1); return; }
                if (this.rfNhiet >= RF_NHIET_MAX){
                    this.rfNhiet = 0;
                    this.isOverheated = true; this.overheatTimer = RF_QUANHIET;
                    this.rfChuoi = 0;
                    floatingTexts.push(new FloatingText(this.x - 24, this.y - 30, "QUÁ NHIỆT!"));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(120, 0.4, 'sawtooth', 0.26, 60);
                }
            }
// PLAYER_PART_END s4.Player.prototype.rfNongLen.1
};

// index.html:50252 · Phạm vi: Player.prototype
const __Part27 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireRapidSingle.1 EDITABLE
fireRapidSingle() {
                let t = this.rfTien();
                // nhip ban: 8 khung -> 4 khung (nhanh gap doi o moc cuoi)
                this.attackCooldown = Math.round(8 - 4 * t);
                let pos = this.getShootPos();
                let yC = pos.y - (4*pos.scale)/2;
                // do lech: RF_LECH do luc dau -> 0 do khi da ve giua
                // Tham so thu 7 cua Projectile la HE SO HUONG (+-1), khong phai goc — nhet goc
                // vao do thi chi lam lech toc do, do tan do ra dung 0.
                let lech = (Math.random() - 0.5) * 2 * RF_LECH * (1 - t) * Math.PI / 180;
                let p = new Projectile(pos.x, yC, this.bulletDmg, 5, 0, 0, pos.dir, this.id);
                p.rf = 1; p.rfT = t;
                let goc = (pos.dir < 0 ? Math.PI : 0) + lech * (pos.dir < 0 ? -1 : 1);
                let sp = 16 * (1.2 + 0.8 * t);         // 1.2x -> 2x
                p.speed = Math.cos(goc) * sp; p.vy = Math.sin(goc) * sp;
                if (t >= 1) p.rfLaser = 1;             // moc cuoi: tia laser nho
                projectiles.push(p);
                this.rfCong();
                this.rfNongLen(t >= 1 ? 2 : 1);        // moc LASER lam nong gap doi
            }
// PLAYER_PART_END s4.Player.prototype.fireRapidSingle.1
};

// index.html:50272 · Phạm vi: Player.prototype
const __Part28 = {
// PLAYER_PART_BEGIN s4.Player.prototype.tankLeoHo.1 EDITABLE
tankLeoHo(){
                let feet = this.y + this.h;
                if (this.grounded && feet <= 336) return;
                const DAY = 418, DOC = 72;
                let cx = this.x + this.w / 2, moi = null, gan = 1e9;
                for (let pf of platforms){
                    if (!pf || pf.pillar || pf.wall || pf.top < 290 || pf.top > 345) continue;
                    let d = cx < pf.x ? pf.x - cx : (cx > pf.x + pf.w ? cx - (pf.x + pf.w) : 0);
                    if (d < gan){ gan = d; moi = pf; }
                }
                if (moi && gan === 0){
                    this.y = moi.top - this.h; this.dy = 0; this.grounded = true;
                } else if (moi && gan < DOC){
                    let t = 1 - gan / DOC;
                    this.y = (DAY + (moi.top - DAY) * t) - this.h; this.dy = 0; this.grounded = true;
                } else if (feet >= DAY){
                    this.y = DAY - this.h; this.dy = 0; this.grounded = true;
                }
            }
// PLAYER_PART_END s4.Player.prototype.tankLeoHo.1
};

// index.html:50291 · Phạm vi: Player.prototype
const __Part29 = {
// PLAYER_PART_BEGIN s4.Player.prototype.rfTickTank.1 EDITABLE
rfTickTank(){
                let T = this.tank; if (!T) return;
                T.t++;
                let cx = this.x + this.w/2, by = this.y + this.h;
                let mx0 = cx, my0 = by - 80;
                let ds = allTargets().filter(o => o && !o.invulnAll && o.hp > 0);
                let muc = null, gan = 1e9;
                for (let o of ds){
                    let d = Math.hypot((o.x + (o.w||20)/2) - mx0, (o.y + (o.h||20)/2) - my0);
                    if (d < gan){ gan = d; muc = o; }
                }
                if (muc) T.mg = Math.atan2((muc.y + (muc.h||20)/2) - my0, (muc.x + (muc.w||20)/2) - mx0);
                else T.mg = this.isFacingLeft ? Math.PI : 0;
                if (keys['KeyW'] || keys['ArrowUp']) T.nong = Math.min(1.05, (T.nong || 0) + 0.02);
                if (keys['KeyS'] || keys['ArrowDown']) T.nong = Math.max(-0.08, (T.nong || 0) - 0.02);
                if (T.dan > 0 && --T.cd <= 0){
                    T.cd = 5;
                    T.dan--;
                    let a = T.mg + (Math.random() - 0.5) * 0.1;
                    let mxx = mx0 + Math.cos(a) * 30, myy = my0 + Math.sin(a) * 30;
                    let p = new Projectile(mxx, myy, this.bulletDmg, 5, 0, 0, Math.cos(a) < 0 ? -1 : 1, this.id);
                    p.x = mxx - p.w / 2; p.y = myy - p.h / 2;
                    p.speed = Math.cos(a) * 19; p.vy = Math.sin(a) * 19; p.rfTank = 1; p._canLe = 1;
                    p.rf = 1; p.rfT = 0;
                    projectiles.push(p);
                    if (typeof SFX !== 'undefined' && SFX.shoot && frames % 12 === 0) SFX.shoot(2);
                }
                // PHAO KICH dang bay
                for (let i = T.no.length - 1; i >= 0; i--){
                    let q = T.no[i]; q.t++;
                    let hut = null, ganN = 150;
                    for (let o of allTargets()){
                        if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                        let dx = (o.x + (o.w||20)/2) - q.x, dy = (o.y + (o.h||20)/2) - q.y, d = Math.hypot(dx, dy);
                        if (d < ganN && d > 10){ ganN = d; hut = { dx, dy, d }; }
                    }
                    if (hut){ q.vx += hut.dx / hut.d * 0.16; q.vy += hut.dy / hut.d * 0.07; }
                    q.vy += 0.32; q.x += q.vx; q.y += q.vy;
                    if (q.y > 306){
                        const R = 130;
                        for (let o of allTargets()){
                            if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0) continue;
                            if (Math.abs((o.x + (o.w||20)/2) - q.x) > R) continue;
                            o.hp -= 10;
                        }
                        for (let k = 0; k < 5; k++)
                            visualEffects.push(new Effect(q.x + (k-2) * 42, 300 - Math.abs(k-2) * 16, 'explosion', true, 60 - Math.abs(k-2) * 10));
                        T.noVe = { x: q.x, t: 0 };
                        shakeTimer = Math.max(shakeTimer, 40);
                        if (typeof SFX !== 'undefined'){ if (SFX.glassBreak) SFX.glassBreak(); if (SFX.tone) SFX.tone(80, 0.5, 'sawtooth', 0.34, 40); }
                        T.no.splice(i, 1);
                    }
                }
                if (T.noVe && ++T.noVe.t > 26) T.noVe = null;
                if (T.phaoCd > 0) T.phaoCd--;
                // Chi bien mat khi HET CA sung may LAN phao va khong con vien phao nao dang bay.
                if (typeof tlBat === 'function' && tlBat()) { /* Tam Luan: xe song theo THE, khong tu tan */ }
                else if (T.dan <= 0 && T.phao <= 0 && T.no.length === 0){
                    this.tank = null;
                    floatingTexts.push(new FloatingText(this.x - 26, this.y - 30, "HẾT ĐẠN"));
                } else if (T.dan <= 0 && T.phao > 0 && !T._baoHetDan){
                    T._baoHetDan = 1;
                    floatingTexts.push(new FloatingText(this.x - 40, this.y - 34, "HẾT SÚNG MÁY — CÒN " + T.phao + " PHÁO"));
                }
            }
// PLAYER_PART_END s4.Player.prototype.rfTickTank.1
};

// index.html:50356 · Phạm vi: Player.prototype
const __Part30 = {
// PLAYER_PART_BEGIN s4.Player.prototype.rfNoTank.1 EDITABLE
rfNoTank(){
                // Ket thuc bang cach HET GIAP: xe no, nguoi choi an 1 dmg that.
                if (typeof tlBat === 'function' && tlBat()) this.tlTankMau = 0;   // kho mau xe ve 0
                this.tank = null;
                let cx = this.x + this.w/2, cy = this.y + this.h/2;
                for (let k = 0; k < 7; k++)
                    visualEffects.push(new Effect(cx + (Math.random()-0.5)*110, cy + (Math.random()-0.5)*70, 'explosion', true, 44 + Math.random()*30));
                shakeTimer = Math.max(shakeTimer, 50);
                floatingTexts.push(new FloatingText(cx - 40, cy - 40, "XE TĂNG NỔ!"));
                if (typeof SFX !== 'undefined'){ if (SFX.glassBreak) SFX.glassBreak(); if (SFX.tone) SFX.tone(70, 0.6, 'sawtooth', 0.34, 40); }
                this.hp -= 1;
                this.invincible = true; this.invTimer = 60;
                this.xuLyChet();   // @@HE-CHETCHUAN
            }
// PLAYER_PART_END s4.Player.prototype.rfNoTank.1
};

// index.html:50370 · Phạm vi: Player.prototype
const __Part31 = {
// PLAYER_PART_BEGIN s4.Player.prototype.rfBanPhao.1 EDITABLE
rfBanPhao(){
                let T = this.tank; if (!T || T.phao <= 0 || T.phaoCd > 0) return;
                T.phao--; T.phaoCd = 40;
                let m = this.rfMiengNong();
                let x0 = m.x + Math.cos(m.goc) * 10, y0 = m.y + Math.sin(m.goc) * 10;
                let v = 12;
                T.no.push({ x: x0, y: y0, vx: Math.cos(m.goc) * v, vy: Math.sin(m.goc) * v, t: 0 });
                shakeTimer = Math.max(shakeTimer, 22);
                if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(140, 0.3, 'sawtooth', 0.3, 60);
            }
// PLAYER_PART_END s4.Player.prototype.rfBanPhao.1
};

// index.html:50380 · Phạm vi: Player.prototype
const __Part32 = {
// PLAYER_PART_BEGIN s4.Player.prototype.rfGocNong.1 EDITABLE
rfGocNong(){
                let T = this.tank;
                let nong = (T && T.nong) || 0;
                return this.isFacingLeft ? Math.PI + nong : -nong;
            }
// PLAYER_PART_END s4.Player.prototype.rfGocNong.1
};

// index.html:50385 · Phạm vi: Player.prototype
const __Part33 = {
// PLAYER_PART_BEGIN s4.Player.prototype.rfMiengNong.1 EDITABLE
rfMiengNong(){
                let cx = this.x + this.w / 2, goc = this.rfGocNong(), dai = 64;
                return { x: cx + Math.cos(goc) * dai, y: this.y + this.h - 64 + Math.sin(goc) * dai, goc };
            }
// PLAYER_PART_END s4.Player.prototype.rfMiengNong.1
};

// index.html:50389 · Phạm vi: Player.prototype
const __Part34 = {
// PLAYER_PART_BEGIN s4.Player.prototype.rfVeTank.1 EDITABLE
rfVeTank(){
                let T = this.tank; if (!T) return;
                let cx = this.x + this.w/2, by = this.y + this.h;
                ctx.save();
                // than xe — TO HON han ban truoc
                ctx.fillStyle = "#33691E"; ctx.fillRect(cx - 58, by - 50, 116, 34);
                ctx.fillStyle = "#558B2F"; ctx.fillRect(cx - 58, by - 50, 116, 11);
                ctx.strokeStyle = "#14200A"; ctx.lineWidth = 4; ctx.strokeRect(cx - 58, by - 50, 116, 34);
                // giap nghieng phia truoc
                ctx.fillStyle = "#43802A";
                ctx.beginPath(); ctx.moveTo(cx + 58, by - 50); ctx.lineTo(cx + 76, by - 30); ctx.lineTo(cx + 58, by - 16); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#14200A"; ctx.lineWidth = 3; ctx.stroke();
                // xich
                ctx.fillStyle = "#1B2E0A"; ctx.fillRect(cx - 64, by - 20, 128, 20);
                ctx.strokeStyle = "#0A1405"; ctx.lineWidth = 3; ctx.strokeRect(cx - 64, by - 20, 128, 20);
                ctx.fillStyle = "#76FF03";
                for (let k = 0; k < 9; k++) ctx.fillRect(cx - 60 + ((k * 15 + frames * 2) % 120), by - 16, 6, 12);
                // banh
                ctx.fillStyle = "#2E4A16";
                for (let k = 0; k < 4; k++){ ctx.beginPath(); ctx.arc(cx - 44 + k * 30, by - 10, 9, 0, Math.PI*2); ctx.fill(); }
                // thap phao
                ctx.fillStyle = "#558B2F"; ctx.fillRect(cx - 30, by - 74, 60, 26);
                ctx.strokeStyle = "#14200A"; ctx.lineWidth = 4; ctx.strokeRect(cx - 30, by - 74, 60, 26);
                // nong dai bac: nam ngang, nguoi choi ngửa/cúi bang len xuong
                ctx.save(); ctx.translate(cx, by - 64); ctx.rotate(this.rfGocNong());
                ctx.fillStyle = "#1B2E0A"; ctx.fillRect(0, -6, 64, 12);
                ctx.fillStyle = "#76FF03"; ctx.fillRect(54, -4, 10, 8);
                ctx.restore();
                if (T.dan > 0){
                    ctx.save(); ctx.translate(cx, by - 80);
                    ctx.fillStyle = "#2E4A16"; ctx.fillRect(-7, -3, 14, 7); ctx.strokeStyle = "#14200A"; ctx.lineWidth = 2; ctx.strokeRect(-7, -3, 14, 7);
                    ctx.rotate(T.mg || 0);
                    ctx.fillStyle = "#0A1405"; ctx.fillRect(0, -2.5, 28, 5);
                    ctx.fillStyle = "#76FF03"; ctx.fillRect(24, -1.6, 6, 3.2);
                    ctx.restore();
                }
                // dan phao dang bay
                for (let q of T.no){
                    ctx.fillStyle = "#76FF03"; ctx.beginPath(); ctx.arc(q.x, q.y, 9, 0, Math.PI*2); ctx.fill();
                    ctx.strokeStyle = "#1B2E0A"; ctx.lineWidth = 2; ctx.stroke();
                }
                // VU NO xanh la
                if (T.noVe){
                    let p = T.noVe.t / 26;
                    ctx.globalAlpha = 1 - p;
                    for (let k = 0; k < 3; k++){
                        ctx.fillStyle = k ? "rgba(118,255,3,0.45)" : "rgba(220,255,180,0.8)";
                        ctx.beginPath(); ctx.arc(T.noVe.x, 296, (40 + k * 46) * (0.4 + p), 0, Math.PI*2); ctx.fill();
                    }
                    ctx.globalAlpha = 1;
                }
                // dem so
                ctx.fillStyle = "#76FF03"; ctx.font = "bold 11px Consolas, monospace"; ctx.textAlign = "center";
                ctx.fillText("ĐẠN " + T.dan + "   PHÁO " + T.phao, cx, by - 96);
                ctx.fillStyle = T.giap > 3 ? "#EF5350" : "#FF1744";
                ctx.fillText("GIÁP " + Math.max(0, T.giap) + "/10", cx, by - 84);
                ctx.textAlign = "left";
                ctx.restore();
            }
// PLAYER_PART_END s4.Player.prototype.rfVeTank.1
};

// index.html:50448 · Phạm vi: Player.prototype
const __Part35 = {
// PLAYER_PART_BEGIN s4.Player.prototype.rfTickDrone.1 EDITABLE
rfTickDrone(){
                let D = this.rapidDrone; if (!D) return;
                for (let i = D.length - 1; i >= 0; i--){
                    let d = D[i];
                    // DA XONG VIEC: bay thang len troi roi bien mat
                    if (d.roi){
                        d.y -= 6.5;
                        if (d.y < -70){
                            if (this.rfDroneCho) this.rfDroneCho[d.loai] = RF_DRONE_CHO;   // hen gio RIENG
                            D.splice(i, 1);
                        }
                        continue;
                    }
                    // bay lai gan nguoi choi roi lo lung hai ben
                    // Con ban DAN dung thap va ban cheo xuong; con LASER van o tren cao.
                    let mx = this.x + this.w/2 + (i === 0 ? -86 : 86);
                    // y - 6 la ngang tam nguoi choi: ban cheo xuong tu do thi dan cam xuong dat
                    // sau chua toi 170px. Nang len y - 44 de duong dan con cho ma di.
                    let my = (d.loai === 'dan' ? this.y - 44 : this.y - 78) + Math.sin(frames * 0.05 + i * 2) * 9;
                    d.x += (mx - d.x) * 0.09; d.y += (my - d.y) * 0.09;
                    // chon muc tieu bat ky tren ban do
                    let ds = allTargets().filter(o => o && !o.invulnAll && o.hp > 0);
                    let muc = ds.length ? ds[Math.floor(Math.random() * ds.length)] : null;
                    d.cd--;
                    if (d.loai === 'dan'){
                        if (Math.abs(d.y - my) > 26) d.cd = Math.max(d.cd, 4);   // chua vao cho thi chua ban
                        else if (d.cd <= 0){
                            // Len TIM o vien 40 chu khong phai 60 -> con 20 vien ban o muc cao nhat
                            if (d.tan){
                                if (d.tanBan >= RF_TAN_DAN){ d.roi = 1; continue; }
                                d.tanBan++;
                            }
                            let td = Math.max(0, Math.min(1, d.ban / RF_DRONE_TIM));
                            d.cd = Math.round(15 - 11 * td);            // 15 -> 4 khung, bang nguoi choi
                            d.ban++;
                            let nen = (this.isFacingLeft ? -1 : 1);
                            // Tinh theo CAO DO DUNG (my), khong phai d.y hien tai: luc drone con
                            // dang bay vao cho thi d.y con o rat cao, goc ban ra doc toi 21 do.
                            let cao = (320 - CM) - my;           // 1 cm tren mat san
                            let xuong = Math.atan2(cao, 700);
                            // Do lech thu HEP DAN theo so vien da ban
                            let gocNgau = (nen < 0 ? Math.PI - xuong : xuong) + (Math.random() - 0.5) * 3 * (1 - td) * Math.PI / 180;
                            // CANG BAN CANG NGAM: pha tron tu ban vu vo sang bam thang muc tieu
                            let goc = gocNgau;
                            if (muc){
                                let gocNgam = Math.atan2((muc.y + (muc.h||20)/2) - d.y, (muc.x + (muc.w||20)/2) - d.x);
                                let sai = Math.atan2(Math.sin(gocNgam - gocNgau), Math.cos(gocNgam - gocNgau));
                                goc = gocNgau + sai * td;
                            }
                            d.goc = goc;
                            let sp = 16 * (1.2 + 0.8 * td);            // 19.2 -> 32, DUNG bang nguoi choi
                            let p = new Projectile(d.x, d.y, this.bulletDmg, 5, 0, 0, 1, this.id);
                            p.speed = Math.cos(goc) * sp; p.vy = Math.sin(goc) * sp; p.rfDrone = 1;
                            // Cung doi XANH LA -> TIM theo so vien da ban, giong nguoi choi
                            p.rf = 1; p.rfT = td;
                            if (d.ban >= (d.tran || RF_DRONE_DAN)){      // @@HE-CUSULT: tran rieng tung con
                                d.roi = 1;
                                floatingTexts.push(new FloatingText(d.x - 30, d.y - 16, "DRONE HẾT ĐẠN"));
                            }
                            projectiles.push(p);
                            if (typeof SFX !== 'undefined' && SFX.shoot && frames % 20 === 0) SFX.shoot(2);
                        }
                    } else {
                        // LASER QUET: chieu mot duong doc ca ban do, quet het thi nghi 0.5 giay.
                        if (!d.quet && d.cd <= 0){
                            // Luot le quet mot chieu, luot chan quet NGUOC lai tu ben kia.
                            // @@HE-DEFENSE: ban do rong 2.5 man hinh, nen [0, canvas.width] chi la
                            // MOT PHAN ban do — truoc day drone chi quet duoc o man hinh goc.
                            // Quet theo KHUNG NHIN hien tai (camX) moi dung o moi che do.
                            let _bT = (typeof camX === 'number' ? camX : 0), _bP = _bT + canvas.width;
                            if (d.luot === 0) d.huongDau = d.x < (_bT + _bP) / 2 ? 1 : -1;
                            let hg = (d.luot % 2 === 0) ? d.huongDau : -d.huongDau;
                            d.quet = { x: hg > 0 ? _bT : _bP, huong: hg, hit: new Set(), bT: _bT, bP: _bP };
                            if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(1500, 0.3, 'sawtooth', 0.16, 700);
                        }
                        if (d.quet){
                            d.quet.x += d.quet.huong * 22;
                            for (let o of allTargets()){
                                if (!o || o.invulnAll || o.hp === undefined || o.hp <= 0 || d.quet.hit.has(o)) continue;
                                if (Math.abs((o.x + (o.w||20)/2) - d.quet.x) > 22) continue;
                                d.quet.hit.add(o);
                                o.hp -= 2;
                                visualEffects.push(new Effect(o.x + (o.w||20)/2, o.y + (o.h||20)/2, 'explosion', true, 22));
                            }
                            let _qT = (d.quet.bT !== undefined) ? d.quet.bT : 0;
                            let _qP = (d.quet.bP !== undefined) ? d.quet.bP : canvas.width;
                            if (d.quet.x < _qT - 30 || d.quet.x > _qP + 30){
                                d.quet = null; d.cd = 30; d.luot++;      // nghi 0.5 giay
                                if (d.tan){ d.tanQuet++; if (d.tanQuet >= RF_TAN_QUET){ d.roi = 1; continue; } }
                            }
                        }
                    }
                }
            }
// PLAYER_PART_END s4.Player.prototype.rfTickDrone.1
};

// index.html:50542 · Phạm vi: Player.prototype
const __Part36 = {
// PLAYER_PART_BEGIN s4.Player.prototype.rfVeDrone.1 EDITABLE
rfVeDrone(){
                let D = this.rapidDrone; if (!D) return;
                for (let d of D){
                    ctx.save();
                    if (d.loai === 'laser' && d.quet){
                        ctx.strokeStyle = "rgba(118,255,3,0.85)"; ctx.lineWidth = 7;
                        ctx.shadowBlur = 16; ctx.shadowColor = "#76FF03";
                        ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.quet.x, 320); ctx.stroke();
                        ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 2.5;
                        ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.quet.x, 320); ctx.stroke();
                        ctx.fillStyle = "rgba(174,213,129,0.55)";
                        ctx.beginPath(); ctx.ellipse(d.quet.x, 316, 20, 7, 0, 0, Math.PI*2); ctx.fill();
                    }
                    ctx.shadowBlur = 0;
                    let tt = d.loai === 'dan' ? Math.max(0, Math.min(1, (d.ban||0) / RF_DRONE_TIM)) : 0;
                    let R2 = Math.round(51 + (74 - 51) * tt), G3 = Math.round(105 - 105 * tt * 0.7), B2 = Math.round(30 + (154 - 30) * tt);
                    ctx.fillStyle = `rgb(${R2},${G3},${B2})`; ctx.fillRect(d.x - 15, d.y - 9, 30, 18);
                    let R3 = Math.round(118 + (156 - 118) * tt), G4 = Math.round(255 - 255 * tt * 0.72), B3 = Math.round(3 + (255 - 3) * tt);
                    ctx.fillStyle = `rgb(${R3},${G4},${B3})`; ctx.fillRect(d.x - 15, d.y - 9, 30, 5);
                    ctx.strokeStyle = "#1B2E0A"; ctx.lineWidth = 2; ctx.strokeRect(d.x - 15, d.y - 9, 30, 18);
                    ctx.fillStyle = d.loai === 'laser' ? "#FF1744" : "#FFEB3B";
                    ctx.fillRect(d.x - 4, d.y - 3, 8, 6);
                    // canh quat
                    ctx.strokeStyle = "rgba(174,213,129,0.8)"; ctx.lineWidth = 2;
                    let w2 = (frames % 6 < 3) ? 17 : 9;
                    ctx.beginPath(); ctx.moveTo(d.x - w2, d.y - 11); ctx.lineTo(d.x + w2, d.y - 11); ctx.stroke();
                    ctx.restore();
                }
            }
// PLAYER_PART_END s4.Player.prototype.rfVeDrone.1
};

// index.html:50571 · Phạm vi: Player.prototype
const __Part37 = {
// PLAYER_PART_BEGIN s4.Player.prototype.fireRapidChannel.1 EDITABLE
fireRapidChannel() {
                let pos = this.getShootPos(), yC = pos.y - (4*pos.scale)/2;
                let roll = Math.random();
                if (roll < 0.12) projectiles.push(new Projectile(pos.x, yC, this.bulletDmg * 2, 9, 0, 0, pos.dir, this.id));
                else if (roll < 0.24) projectiles.push(new Projectile(pos.x, yC, this.bulletDmg, 6, 0, 1, pos.dir, this.id));
                else projectiles.push(new Projectile(pos.x, yC, this.bulletDmg, 5, 0, 0, pos.dir, this.id));
                if (typeof SFX !== 'undefined' && SFX.shoot && frames % 20 === 0) SFX.shoot(2);
            }
// PLAYER_PART_END s4.Player.prototype.fireRapidChannel.1
};

// index.html:50581 · Phạm vi: Player.prototype
const __Part38 = {
// PLAYER_PART_BEGIN s4.Player.prototype._tickSentry.1 EDITABLE
_tickSentry(){
                let S = this.sentry; if (!S) return;
                if (S.thu > 0){                                  // dang GAP LAI roi bien mat
                    S.thu++; S.mo = Math.max(0, 1 - S.thu/26);
                    if (S.thu > 26){ this.sentry = null; }
                    return;
                }
                if (S.mo < 1){                                   // dang BUNG RA: co khi, tung khop mot
                    S.mo = Math.min(1, S.mo + 1/34);
                    if (Math.abs(S.mo*34 - Math.round(S.mo*34)) < 0.001 && Math.round(S.mo*34) % 6 === 0
                        && typeof SFX !== 'undefined' && SFX.tone) SFX.tone(200 + S.mo*260, 0.04, 'square', 0.09, 300);
                    return;
                }
                // --- ngam: doi muc tieu gan nhat, xoay nong tu tu ---
                let mt = null, bd = 1e9;
                for (let o of allTargets()){
                    if (!o || o.invulnAll || o.hp <= 0) continue;
                    let d = Math.hypot((o.x + (o.w||20)/2) - S.x, (o.y + (o.h||20)/2) - (S.y - 26));
                    if (d < bd){ bd = d; mt = o; }
                }
                // Nong QUAY TU DO, khong gioi han toc do xoay — no la mot khau sung may.
                if (mt) S.goc = Math.atan2((mt.y + (mt.h||20)/2) - (S.y - 26), (mt.x + (mt.w||20)/2) - S.x);
                S.xoay += 0.4;
                // --- ban: 4 vien/giay. Dan XANH cua Rapidfire, 1 dmg, XUYEN vat the ---
                // Truoc day toi dung Projectile(.., 2, 2, ..) tuc la vien TO 2 dmg cua Pulse ->
                // chieu cuoi manh qua so voi ban chat cua Rapidfire. Gio 100 vien x 1 dmg = 100,
                // cong them 12% roll ra vien doi sat thuong nen thuc te nhinh hon mot chut.
                if (S.cd > 0) S.cd--;
                else if (S.dan > 0 && mt){          // dan yeu roi -> NGHI khi khong co muc tieu
                    S.cd = 14;                      // ban roi doi 14 khung -> dung 15 khung/vien
                    S.dan--;
                    let bx = S.x + Math.cos(S.goc)*24, by = (S.y - 26) + Math.sin(S.goc)*24;
                    // ===== BANG ROLL =====
                    // Moi vien deu XUYEN san (doi so thu 6 = 1) nen khong con nhanh "dan xuyen"
                    // nua — no khong khac gi dan thuong. Thay bang DAN NO va LOAT 2 / LOAT 3.
                    // Loat con co ti le rieng de tung vien trong loat ra ban XIN hon.
                    // Loat tieu dung so vien dung bang so dan ban ra, nen tong van quanh 100.
                    // Sentry ban DAN NHO giong ban thuong, va cung LECH +-5 do — khong con
                    // dan no / dan xin / dan xuyen nen no het ba dao.
                    let ban1 = (goc2) => {
                        let g = goc2 + (Math.random() - 0.5) * 2 * 5 * Math.PI / 180;
                        let px = S.x + Math.cos(g)*24, py = (S.y - 26) + Math.sin(g)*24;
                        let pr = new Projectile(px, py, this.bulletDmg, 5, 0, 0,
                                                Math.cos(g) >= 0 ? 1 : -1, this.id);
                        pr.speed = Math.cos(g) * 16; pr.vy = Math.sin(g) * 16;
                        pr._sentry = true; pr.rf = 1; pr.rfT = 0;
                        projectiles.push(pr);
                    };
                    // Chi con MOT loai dan duy nhat: vien nho, lech +-5 do (xu ly trong ban1).
                    ban1(S.goc);
                    visualEffects.push(new Effect(bx, by, 'explosion', true, 7));
                    if (typeof SFX !== 'undefined' && SFX.shoot) SFX.shoot(2);
                }
                if (S.dan <= 0) S.thu = 1;
            }
// PLAYER_PART_END s4.Player.prototype._tickSentry.1
};

// index.html:50636 · Phạm vi: Player.prototype
const __Part39 = {
// PLAYER_PART_BEGIN s4.Player.prototype._veSentry.1 EDITABLE
_veSentry(){
                let S = this.sentry; if (!S) return;
                const XL = '#2E7D32', X = '#66BB6A', XS = '#A5D6A7', TOI = '#1B3A1E';
                let m = S.mo;
                ctx.save(); ctx.translate(S.x, S.y);
                // chan de: ba cang bung ra
                for (let k = -1; k <= 1; k++){
                    if (k === 0) continue;
                    let g = k * (0.5 + 0.55*m);
                    ctx.save(); ctx.rotate(g);
                    ctx.fillStyle = XL; ctx.fillRect(-4, -4, 8, 26*m + 4);
                    ctx.fillStyle = TOI; ctx.fillRect(-5, 24*m, 10, 5);
                    ctx.restore();
                }
                ctx.fillStyle = XL; ctx.fillRect(-9, -10*m, 18, 12*m);
                // than sung nho len dan
                let ty = -16 * m;
                ctx.fillStyle = X; ctx.fillRect(-11, ty - 14*m, 22, 16*m);
                ctx.fillStyle = XS; ctx.fillRect(-8, ty - 11*m, 6, 5*m);
                // nong
                if (m > 0.75){
                    ctx.save(); ctx.translate(0, ty - 6); ctx.rotate(S.goc);
                    ctx.fillStyle = TOI; ctx.fillRect(0, -5, 30, 10);
                    ctx.fillStyle = X;   ctx.fillRect(0, -3, 26, 6);
                    ctx.fillStyle = XS;  ctx.fillRect(24, -4, 5, 8);
                    // bang dan xoay
                    ctx.fillStyle = XL;
                    for (let k = 0; k < 3; k++){
                        let a2 = S.xoay + k*(Math.PI*2/3);
                        ctx.beginPath(); ctx.arc(8, Math.sin(a2)*4, 2.4, 0, Math.PI*2); ctx.fill();
                    }
                    ctx.restore();
                }
                // so dan con lai
                if (m >= 1 && !S.thu){
                    ctx.fillStyle = XS; ctx.font = 'bold 9px Consolas, monospace'; ctx.textAlign = 'center';
                    ctx.fillText(S.dan + '', 0, ty - 20);
                    ctx.textAlign = 'left';
                    ctx.strokeStyle = 'rgba(102,187,106,0.5)'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.arc(0, ty - 6, 15 + 2*Math.sin(frames*0.2), 0, Math.PI*2); ctx.stroke();
                }
                ctx.restore();
            }
// PLAYER_PART_END s4.Player.prototype._veSentry.1
};

// index.html:50679 · Phạm vi: Player.prototype
const __Part40 = {
// PLAYER_PART_BEGIN s4.Player.prototype.hoverTick.1 EDITABLE
hoverTick(){
                let H = this.hovRF; if (!H) return;
                if (--H.cd <= 0 && H.con > 0){
                    H.cd = 2;
                    // Giong hệt bắn gốc: mo man TOA RONG de hut, roi tum dan ve giua.
                    // Chi NAM VIEN CUOI moi thang tap va ra dang LASER.
                    let banRa = 30 - H.con;                     // da ban bao nhieu vien
                    let cuoi = H.con <= 5;
                    let tum = Math.max(0, Math.min(1, banRa / 25));   // 0 -> 1 qua 25 vien dau
                    // Toa CHI khep lai mot phan: 20.6 do -> 12 do qua 25 vien dau. Phai con
                    // lech ro de van de hut. Chi NAM VIEN CUOI moi ve 0 va thanh laser.
                    let toa = cuoi ? 0 : 0.36 * (1 - 0.42 * tum);
                    // fireRapidSingle TU TANG rfChuoi moi phat, nen den vien ~20 la no da
                    // cham nguong laser roi — do la ly do van thay 10 vien laser chu khong 5.
                    // Phai GHIM chuoi xuong duoi nguong cho 25 vien dau.
                    this.rfChuoi = cuoi ? RF_CHUOI : Math.min(this.rfChuoi || 0, Math.round(RF_CHUOI * 0.5));
                    let N = this.hoverNgam();
                    if (N) this.isFacingLeft = N.tx < (this.x + this.w/2);
                    // Loat nay la phan thuong cua Lo Lung nen KHONG dot nong va khong bi
                    // Qua Nhiet chan giua chung — neu khong thi 5 vien LASER cuoi co the
                    // khong bao gio ra (do duoc: chi 19/30 vien duoc ban).
                    let _nh = this.rfNhiet, _oh = this.isOverheated, _cd = this.attackCooldown;
                    this.isOverheated = false; this.attackCooldown = 0;
                    let n0 = projectiles.length;
                    if (typeof this.fireRapidSingle === 'function') this.fireRapidSingle();
                    this.rfNhiet = _nh; this.isOverheated = _oh; this.attackCooldown = _cd;
                    if (N) for (let i = n0; i < projectiles.length; i++){
                        let pr = projectiles[i];
                        let sp = Math.hypot(pr.speed || 0, pr.vy || 0) || 16;
                        let g = N.g + (Math.random() - 0.5) * 2 * toa;
                        pr.speed = Math.cos(g) * sp; pr.vy = Math.sin(g) * sp;
                    }
                    // CHI tru khi that su co vien bay ra. fireRapidSingle co nhip ban rieng,
                    // truoc day tru ca luc no khong ban gi nen loat chi ra 19/30 vien.
                    if (projectiles.length > n0) H.con--;
                }
                if (H.con <= 0) this.hovRF = null;
            }
// PLAYER_PART_END s4.Player.prototype.hoverTick.1
};

// index.html:50719 · Phạm vi: global
// PLAYER_PART_BEGIN s4.vkDangKy.4 EDITABLE
vkDangKy(2, {
            ten: 'RAPIDFIRE', mauUlt: '#00E676',
            // het chieu cuoi: tra lai bang dan cu (chieu cuoi noi rong bang dan)
            hetUlt(){ if (this.ultPrevMaxAmmo) { this.maxAmmo = this.ultPrevMaxAmmo; this.ammo = this.maxAmmo; } },
            sacToiDa: 180,              // so khung tich K cho day vong (maxChargeFrames)
            mauHudUlt: '#00E676',         // mau thanh chieu cuoi tren HUD khi dang chay
            theLuc: 10,                 // thanh nhiet 10 o (ammoToiDa)
            nhipHoi: 11,                // hoi 1 o moi 11 khung (vu khi khac 22)
            sacBoQuaNhiet: true,        // tich K khong bi Qua Nhiet chan (Charge khong dung bang dan)
            khongSac(){ return typeof hasRune === 'function' && hasRune('trienlien'); },   // TAM LUAN: khong co Charge
            banJ(){
                if (typeof tlBat === 'function' && tlBat() && combatStance === 1){ /* Trickster: khong ban duoc */ }
                else if (this.tank) this.rfBanPhao();
                else if (!this.isOverheated && !(this.rfNgat > 0)) this.fireRapidSingle();
            },
            nhaK(){
                // CHARGE = CAM SENTRY. So vien tich duoc thanh so dan cua khau sung,
                // va cam bao nhieu khau cung duoc. Truoc day charge chi la mot loat burst.
                // Charge KHONG dung chung bang dan va KHONG bi Overheat chan —
                // hai he da tach roi nhau.
                if (this.rapidChannel){ this.rapidChannel = false; this.rfDroneCho = { dan: 0, laser: 0 }; if (this.rapidDrone) for (let _d of this.rapidDrone) rfTanCuoc(_d); }
                else if (this.aKeyHeldTime >= 60) {
                    // 12 vien o moc 1 giay, len toi 24 o moc day (3 giay). Truoc day toi
                    // lay 0.7 vien moi khung nen giu day ra 126 vien — do la thua huong
                    // con so 100 vien cua chieu cuoi cu, khong phai muc tich duoc.
                    let vien = Math.max(12, Math.min(24, Math.round(12 + (this.aKeyHeldTime - 60) / 10)));
                    this.sentries.push({ x: this.x + this.w/2, y: 320, dan: vien, cd: 0, mo: 0, xoay: 0,
                                         goc: this.isFacingLeft ? Math.PI : 0, thu: 0 });
                    floatingTexts.push(new FloatingText(this.x - 26, this.y - 30, "SENTRY " + vien + " VIÊN"));
                    shakeTimer = Math.max(shakeTimer, 16);
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(420, 0.16, 'square', 0.2, 700);
                } else {
                    // Duoi 1 giay thi khong du de dung khau sung
                    floatingTexts.push(new FloatingText(this.x - 30, this.y - 28, "CHƯA ĐỦ 1 GIÂY"));
                }
            },
            channel(){
                this.rapidChannel = true;
                // Dang Channel van TICH DAN nhung CHAM GAP DOI (moi 30 khung mot viec thay vi 15).
                // Truoc day vao Channel la ngung tich han, nen giu lau khong duoc gi them.
                this._rcT = (this._rcT || 0) + 1;
                if (this._rcT % 30 === 0) this.aKeyHeldTime += 10;   // 10 khung = dung 1 vien
                // CHANNEL = trieu hoi HAI DRONE tu tren khong. Mot con xa dan (4 vien/giay),
                // mot con ban laser (2 dmg/giay). Chung na tua lua khap ban do.
                // MOI CON mot bo hen gio rieng: con nay bay di roi tu xuong lai, khong cho
                // con kia. Truoc day dung chung mot bo dem nen phai doi ca hai cung xong.
                if (!this.rapidDrone) this.rapidDrone = [];
                if (!this.rfDroneCho) this.rfDroneCho = { dan: 0, laser: 0 };
                for (let loai of ['dan', 'laser']){
                    if (this.rapidDrone.some(d => d.loai === loai)) continue;
                    if ((this.rfDroneCho[loai] || 0) > 0) continue;
                    if (loai === 'dan')
                        this.rapidDrone.push({ loai:'dan', x: this.x - 90, y: -40, cd: 0, goc: 0, ban: 0, roi: 0 });
                    else
                        this.rapidDrone.push({ loai:'laser', x: this.x + 90, y: -40, cd: 0, goc: 0, quet: null, luot: 0, huongDau: 1, roi: 0 });
                    floatingTexts.push(new FloatingText(this.x - 30, this.y - 32, loai === 'dan' ? "DRONE ĐẠN!" : "DRONE LASER!"));
                    if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(300, 0.3, 'square', 0.22, 1100);
                }
            },
            batUlt(){
                this.ultActive = true; this.ultAmmo = 2; this.ultTimer = 0;
                this.aKeyHeldTime = 0; this.chargeProgress = 0; this.isOverheated = false;
                // ===== XE TANG: Dino hoa thanh xe tang xanh la =====
                // Sung may tren dinh TU BAN 100 vien. Kem 5 vien phao kich (bam J) —
                // moi vien no mot vung, 10 dmg len toan bo vung no.
                this.ultActive = false; this.ultAmmo = -1; ultCharge = 0;
                // GIAP 30 o PvP thay vi 10: o day no la mot THANH MAU THU HAI that su,
                // phan vuot qua giap di tiep vao mau chu khong bi nuot.
                this.tank = { dan: 100, cd: 0, phao: 5, phaoCd: 0, goc: 0, nong: 0, mg: 0, t: 0, no: [],
                              giap: (gameState === 'pvp' ? 30 : 10) };
                combatStance = 0;                       // khoa the GUNSLINGER
                floatingTexts.push(new FloatingText(this.x - 44, this.y - 34, "XE TĂNG! J = PHÁO · GIÁP 10"));
                shakeTimer = Math.max(shakeTimer, 30);
                SFX.tone(660, 0.2, 'sawtooth', 0.25, 990); SFX.tone(990, 0.35, 'square', 0.15, 1320);
            },
            ultTick(ammo, fireKey, chargeKey){
                if (chargeKey && this.attackCooldown <= 0) this.fireRapidSingle();
                else if (fireKey && this.attackCooldown <= 0) this.fireRapidSingle();
                if (this.ammo <= 0) this.endUlt();
                return;
            },
            veHudDan(){
                // RAPIDFIRE khong co bang dan — chi co THANH NHIET
                const BX = 80, BY = 53, BW = 128, BH = 12;
                let nh = Math.max(0, Math.min(1, (dino.rfNhiet || 0) / RF_NHIET_MAX));
                let ch = Math.max(0, Math.min(1, (dino.rfChuoi || 0) / RF_CHUOI));
                ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.fillRect(BX - 1, BY - 1, BW + 2, BH + 2);
                if (dino.isOverheated){
                    let p = 1 - (dino.overheatTimer || 0) / RF_QUANHIET;
                    ctx.fillStyle = "#B71C1C"; ctx.fillRect(BX, BY, BW * p, BH);
                    ctx.fillStyle = "#FF5252"; ctx.font = "bold 11px Consolas, monospace";
                    ctx.fillText("QUÁ NHIỆT " + ((dino.overheatTimer/60).toFixed(1)) + "s", BX + 6, BY + 10);
                } else {
                    // mau thanh nhiet doi theo chuoi ban: xanh la -> tim
                    let R = Math.round(118 + (156 - 118) * ch), G = Math.round(255 - 255 * ch * 0.72), B = Math.round(3 + (255 - 3) * ch);
                    ctx.fillStyle = `rgb(${R},${G},${B})`;
                    ctx.fillRect(BX, BY, BW * nh, BH);
                    if (nh > 0.8){ ctx.fillStyle = (frames % 8 < 4) ? "#FF5252" : "rgba(255,82,82,0.4)"; ctx.fillRect(BX + BW * 0.8, BY, BW * 0.2, BH); }
                }
                ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1;
                ctx.strokeRect(BX - 1.5, BY - 1.5, BW + 3, BH + 3);
                if (ch >= 1 && !dino.isOverheated){
                    ctx.fillStyle = "#CE93D8"; ctx.font = "bold 10px Consolas, monospace";
                    ctx.fillText("LASER", BX + BW + 6, BY + 10);
                }
                ctx.font = "bold 15px Consolas, monospace";
            },
            hoverSac(half){
                this.hovRF = { con: 30, cd: 0 };                  // loat 30 vien, 5 vien cuoi LASER
            }
        });
// PLAYER_PART_END s4.vkDangKy.4
