// PLAYER_FILE: ProjectilesAndEffects02
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CUS_HX_BIEN, CUS_HX_TAN, CUS_TOCDO, Effect, SFX, aimTarget, allTargets, autoAimEnabled, bossAimTarget, canvas, combatStance, ctx, cusCapCua, cusMauDan, dino, dino2, frames, gameState, hoverAiming, midasHado, midasVeVienHado, novaBlast, pulseVeVien, pvpMucCua, visualEffects
// index.html:46064 · Phạm vi: global
// PLAYER_PART_BEGIN s2.Projectile.1 EDITABLE
class Projectile {
            constructor(x, y, dmg, type = 0, vy = 0, pierceCount = 0, dir = 1, owner = 1, endlessSpread = false) { 
                this.x = x; this.y = y; this.dmg = dmg; this.type = type; this.vy = vy; this.pierceCount = pierceCount;
                this.dir = dir; this.owner = owner;
                let sScale = this.owner === 1 ? dino.getFormScale() : dino2.getFormScale();
                this.w = ((type > 0 && type < 3) ? 24 : 16) * sScale; 
                this.h = ((type > 0 && type < 3) ? 12 : 6) * sScale; 
                if (type === 3 || type === 4) { this.w = 16 * sScale; this.h = 16 * sScale; }
                if (type === 5) { this.w = 16 * sScale; this.h = 6 * sScale; this.speed = 16 * dir; } 
                else if (type === 6) { this.w = 16 * sScale; this.h = 6 * sScale; this.speed = 13 * dir; } 
                else if (type === 9) { this.w = 18 * sScale; this.h = 8 * sScale; this.speed = 16 * dir; } 
                else if (type === 7) { this.w = 22 * sScale; this.h = 50 * sScale; this.speed = 14 * dir; } 
                else if (type === 8) { this.w = 28 * sScale; this.h = 62 * sScale; this.speed = 19 * dir; } 
                else if (type === 10) { this.w = 20 * sScale; this.h = 20 * sScale; this.speed = 15 * dir; }
                else if (type === 11) { this.w = 40 * sScale; this.h = 14 * sScale; this.speed = 17 * dir; }
                else if (type === 12) { this.w = 10 * sScale; this.h = 10 * sScale; this.speed = 14 * dir; }
                else if (type === 13) { this.w = 16 * sScale; this.h = 16 * sScale; this.speed = 12 * dir; }
                else { this.speed = ((type > 0) ? 15 : 13) * dir; }
                this.hitIds = new Set();
                // PULSAR: damage scales continuously with travel distance.
                // Reference playfield ≈23 cm wide: every 6 cm adds +1 damage.
                // J: 1→3 at 18 cm. Star Shot: 1→2 at 12 cm.
                if (this.pulsar || this._fromStar) {
                    this._pulsarStartX = x; this._pulsarStartY = y;
                    this._pulsarTravel = 0;
                    this._pulsarMaxDist = this.pulsar ? canvas.width * (18/23) : canvas.width * (12/23);
                }
                // NGAM: chinh huong ban ve muc tieu gan nhat, GIOI HAN goc +-20 do (dan bay THANG, van co the hut)
                // Đạn Vô Tận: góc lệch được áp dụng SAU auto-aim để không bị hệ thống tự ngắm ghi đè.
                if (this.owner === 1 && gameState !== 'pvp' && (autoAimEnabled || combatStance === 1 || hoverAiming())) {
                    let tgt = (combatStance === 1 || hoverAiming()) ? bossAimTarget(x, y) : aimTarget(x, y, dir);
                    if (tgt) {
                        let mag = Math.hypot(this.speed, this.vy);
                        if (mag > 0.5) {
                            let cap = (hoverAiming() ? 85 : (combatStance === 1 ? 68 : 20)) * Math.PI / 180;   // @@HE-LOLUNG3: lo lung 85 do
                            let base = dir > 0 ? 0 : Math.PI;
                            let raw = Math.atan2((tgt.y + tgt.h / 2) - y, (tgt.x + tgt.w / 2) - x);
                            let rel = Math.atan2(Math.sin(raw - base), Math.cos(raw - base));
                            let capped = Math.max(-cap, Math.min(cap, rel));
                            let ang = base + capped + Math.atan2(this.vy, Math.abs(this.speed));
                            this.speed = Math.cos(ang) * mag; this.vy = Math.sin(ang) * mag;
                        }
                    }
                }
                if (endlessSpread) {
                    const mag = Math.hypot(this.speed || 0, this.vy || 0);
                    if (mag > 0.5) {
                        const baseAng = Math.atan2(this.vy || 0, this.speed || 0);
                        const spreadAng = (Math.random() * 6 - 3) * Math.PI / 180;
                        const finalAng = baseAng + spreadAng;
                        this.speed = Math.cos(finalAng) * mag;
                        this.vy = Math.sin(finalAng) * mag;
                        this.endlessSpread = true;
                    }
                }
            }
            draw() {
                // @@HE-MIDAS-VE: chuong Hadoken tu ve lay. Truoc day no ve DE LEN hinh dan
                // goc, nen giua qua cau xanh luon co mot vien do — do la vien dan mac dinh
                // van duoc ve ben duoi. Chan han o day thi chi con MOT hinh duy nhat.
                if (this.midasHado){ midasVeVienHado(this); return; }
                if ((this.pulseSieu && this.pulseSieu !== 'toa') || this.pulseDan){ pulseVeVien(this); return; }   // @@HE-PULSE-ST / DAN
                ctx.save();

                // PULSAR METEOR: all real Pulsar shots use one consistent comet-like projectile.
                // Color continuously shifts yellow -> orange -> red as travel damage scales.
                if (this.pulsar || this._fromStar) {
                    const cx = this.x + this.w / 2, cy = this.y + this.h / 2;
                    const spd = Math.hypot(this.speed || 0, this.vy || 0) || 1;
                    const dx = (this.speed || 0) / spd, dy = (this.vy || 0) / spd;
                    const t = Math.max(0, Math.min(1, this._pulsarRangeT || 0));
                    const tier = this._pulsarTier || 1;

                    // Warm progression: yellow at tier 1, orange in the middle, red at max.
                    const hue = Math.max(0, 52 - 52 * t);
                    const core = `hsl(${hue}, 100%, 62%)`;
                    const hot = `hsl(${Math.min(58, hue + 10)}, 100%, 78%)`;
                    const tail = `hsla(${hue}, 100%, 58%, 0.72)`;

                    ctx.save();
                    ctx.translate(cx, cy);
                    ctx.rotate(Math.atan2(dy, dx));

                    // ---- TOI UU: bo shadowBlur va gradient ----
                    // shadowBlur la lenh dat nhat tren canvas. Moi vien dan truoc day dat no
                    // HAI lan, cong mot createLinearGradient moi MOI KHUNG. Mot lan Ult co 72
                    // vien -> 144 lenh ve co bong mo + 72 gradient/khung. Thay bang cac lop fill
                    // phang chong len nhau: nhin gan nhu y het ma re hon nhieu lan.
                    const tailLen = (this.pulsar ? 5.5 : 4.2) * Math.max(this.w, this.h) * (1 + t * 0.8);
                    const tailW = Math.max(2, Math.max(this.w, this.h) * (0.42 + t * 0.10));
                    for (let L = 0; L < 2; L++){
                        let f = L === 0 ? 1.0 : 0.55, al = L === 0 ? 0.30 : 0.85;
                        ctx.globalAlpha = al;
                        ctx.fillStyle = L === 0 ? tail : core;
                        ctx.beginPath();
                        ctx.moveTo(-tailLen * f, 0);
                        ctx.quadraticCurveTo(-tailLen * f * 0.35, -tailW * f, 1, -tailW * 0.45);
                        ctx.lineTo(1, tailW * 0.45);
                        ctx.quadraticCurveTo(-tailLen * f * 0.35, tailW * f, -tailLen * f, 0);
                        ctx.closePath(); ctx.fill();
                    }
                    ctx.globalAlpha = 1;

                    // Meteor head: irregular pointed body instead of a square bullet.
                    const r = Math.max(4, Math.max(this.w, this.h) * (0.46 + t * 0.08));
                    // quang: mot vong mo to thay cho shadowBlur
                    ctx.globalAlpha = 0.26 + t * 0.10;
                    ctx.fillStyle = core;
                    ctx.beginPath(); ctx.arc(0, 0, r * 1.75, 0, 6.28); ctx.fill();
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = core;
                    ctx.beginPath();
                    ctx.moveTo(r * 1.15, 0);
                    ctx.lineTo(r * 0.35, -r * 0.72);
                    ctx.lineTo(-r * 0.78, -r * 0.35);
                    ctx.lineTo(-r * 0.98, r * 0.20);
                    ctx.lineTo(-r * 0.30, r * 0.76);
                    ctx.lineTo(r * 0.72, r * 0.46);
                    ctx.closePath();
                    ctx.fill();

                    // White-hot core.
                    ctx.fillStyle = hot;
                    ctx.beginPath();
                    ctx.arc(r * 0.24, -r * 0.04, r * 0.38, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = "#FFFDE7";
                    ctx.beginPath();
                    ctx.arc(r * 0.34, -r * 0.07, r * 0.18, 0, Math.PI * 2);
                    ctx.fill();

                    // Tia sang bao cap sat thuong. Giam so tia va bo chuoi hsla dung moi khung.
                    const sparks = this.pulsar ? (tier === 1 ? 0 : tier === 2 ? 2 : 3) : (tier === 1 ? 0 : 2);
                    if (sparks){
                        ctx.fillStyle = hot; ctx.globalAlpha = 0.45 + 0.45 * t;
                        for (let k = 0; k < sparks; k++) {
                            const a2 = (frames * 0.16) + k * 2.399;
                            const dist = r * (1.3 + ((k * 0.47) % 1.8));
                            ctx.beginPath();
                            ctx.arc(-dist * 0.55 + Math.cos(a2) * r * 0.25, Math.sin(a2) * r * 0.48,
                                    Math.max(1, r * (0.055 + t * 0.025)), 0, Math.PI * 2);
                            ctx.fill();
                        }
                        ctx.globalAlpha = 1;
                    }
                    // chop sang khi vua len cap (thay cho hieu ung DOM cu)
                    if (this._pulsarFlash > 0){
                        this._pulsarFlash--;
                        ctx.globalAlpha = this._pulsarFlash / 9 * 0.7;
                        ctx.strokeStyle = hot; ctx.lineWidth = 2;
                        ctx.beginPath(); ctx.arc(0, 0, r * (1.4 + (9 - this._pulsarFlash) * 0.35), 0, 6.28); ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                    ctx.restore();
                } else if (this.cus) {
                    /* @@HE-CUSVE — HINH DANG VIEN DAN CUSTOM.
                       Ban dau moi vien Custom deu la mot vach xam giong het nhau, ke ca khi
                       nguoi choi da lap hai module doi han cach khau sung hoat dong. Nhin vao
                       man hinh khong doc duoc minh dang cam gi. Gio: DANG vien dan do NANG LUC
                       quyet dinh (no doi duong dan), con MAU do HIEU UNG quyet dinh (no doi
                       thu xay ra voi muc tieu). Vien tran trui van la vach xam — do van la
                       ban sac "khau chua xong". */
                    let _ccx = this.x + this.w/2, _ccy = this.y + this.h/2;
                    let _cag = Math.atan2(this.vy || 0, this.speed || 1);
                    let _cm = (typeof cusMauDan === 'function') ? cusMauDan() : ["#90A4AE","#ECEFF1","#B0BEC5"];
                    if (this.cusTL){
                        // ---- TEN LUA: than xam dam, dau do, duoi lua vang ----
                        let _tl = this.w, _th = this.h;
                        ctx.save(); ctx.translate(_ccx, _ccy); ctx.rotate(_cag);
                        for (let _k = 0; _k < 3; _k++){
                            let _r = (_th * 0.9) * (1 - _k * 0.26) * (0.8 + Math.random() * 0.4);
                            ctx.fillStyle = ["rgba(255,87,34,0.55)","rgba(255,167,38,0.75)","rgba(255,241,118,0.95)"][_k];
                            ctx.beginPath(); ctx.ellipse(-_tl * (0.55 + 0.16 * _k), 0, _r * (1.5 - 0.3 * _k), _r * 0.5, 0, 0, 6.28); ctx.fill();
                        }
                        ctx.fillStyle = "#455A64"; ctx.fillRect(-_tl/2, -_th/2, _tl * 0.82, _th);
                        ctx.fillStyle = "#B0BEC5"; ctx.fillRect(-_tl/2, -_th/2, _tl * 0.82, _th * 0.28);
                        ctx.fillStyle = "#E53935";
                        ctx.beginPath(); ctx.moveTo(_tl/2 - _tl*0.18, -_th/2); ctx.lineTo(_tl/2, 0);
                        ctx.lineTo(_tl/2 - _tl*0.18, _th/2); ctx.closePath(); ctx.fill();
                        ctx.fillStyle = "#37474F";
                        ctx.beginPath(); ctx.moveTo(-_tl/2, -_th/2); ctx.lineTo(-_tl/2 - _tl*0.12, -_th); ctx.lineTo(-_tl/2 + _tl*0.10, -_th/2); ctx.closePath(); ctx.fill();
                        ctx.beginPath(); ctx.moveTo(-_tl/2, _th/2); ctx.lineTo(-_tl/2 - _tl*0.12, _th); ctx.lineTo(-_tl/2 + _tl*0.10, _th/2); ctx.closePath(); ctx.fill();
                        ctx.restore();
                    } else if (this.cusTT){
                        // ---- DAN PHAO TIEP TRO: dau dan dong, vanh dai, khoi thuoc sung ----
                        let _pl = this.w, _ph = this.h;
                        ctx.save(); ctx.translate(_ccx, _ccy); ctx.rotate(_cag);
                        ctx.fillStyle = "rgba(120,144,156,0.35)";
                        for (let _k = 0; _k < 3; _k++)
                            { ctx.beginPath(); ctx.arc(-_pl * (0.6 + _k * 0.22), (Math.random()-0.5)*_ph*0.5, _ph * (0.55 - _k*0.12), 0, 6.28); ctx.fill(); }
                        ctx.fillStyle = "#8D6E63"; ctx.fillRect(-_pl/2, -_ph/2, _pl * 0.72, _ph);
                        ctx.fillStyle = "#FFB300"; ctx.fillRect(-_pl/2 + _pl*0.10, -_ph/2, _pl*0.09, _ph);
                        ctx.fillRect(-_pl/2 + _pl*0.30, -_ph/2, _pl*0.09, _ph);
                        ctx.fillStyle = "#5D4037";
                        ctx.beginPath(); ctx.moveTo(_pl/2 - _pl*0.28, -_ph/2); ctx.lineTo(_pl/2, 0);
                        ctx.lineTo(_pl/2 - _pl*0.28, _ph/2); ctx.closePath(); ctx.fill();
                        ctx.strokeStyle = "rgba(255,224,130,0.9)"; ctx.lineWidth = 1.5;
                        ctx.strokeRect(-_pl/2 + 0.5, -_ph/2 + 0.5, _pl * 0.72 - 1, _ph - 1);
                        ctx.restore();
                    } else if (this._cusHx){
                        /* ---- XOAN SONG DOI: VET DNA.
                           Duong bay la mot ham thuan tuy cua thoi gian nen ve lai qua khu
                           khong can luu lich su: cu thay t bang t - i la ra dung cho vien dan
                           da o dau i khung truoc. Chi VIEN PHA 0 ve ca thang DNA (hai soi +
                           nac thang), vien kia chi ve dau — neu ca hai cung ve thi moi net
                           bi chong len chinh no, thanh ra dam va nang gap doi. */
                        let _hc = cusCapCua('helix') || 1;
                        let _ht = CUS_HX_TAN[_hc], _hsp = Math.abs(this.speed) || CUS_TOCDO;
                        let _hd = (this.speed >= 0) ? 1 : -1;
                        let _hy = this._cusHxY0 + this.h/2;
                        if (!this._cusHxPha){
                            const _HN = 16, _HB = 2;            // so mau va buoc lay mau (khung)
                            ctx.save();
                            for (let _k = 0; _k < 2; _k++){
                                ctx.beginPath();
                                for (let _i = 0; _i <= _HN; _i++){
                                    let _t2 = this._cusHxT - _i * _HB; if (_t2 < 0) break;
                                    let _xx = _ccx - _hd * _i * _HB * _hsp;
                                    let _yy = _hy + Math.sin(_t2 * _ht + _k * Math.PI) * CUS_HX_BIEN;
                                    if (_i === 0) ctx.moveTo(_xx, _yy); else ctx.lineTo(_xx, _yy);
                                }
                                ctx.strokeStyle = _k ? "rgba(129,212,250,0.40)" : "rgba(255,241,118,0.40)";
                                ctx.lineWidth = 2; ctx.stroke();
                            }
                            // nac thang noi hai soi — dam nhat dan ve phia sau
                            for (let _i = 1; _i <= _HN; _i += 3){
                                let _t2 = this._cusHxT - _i * _HB; if (_t2 < 0) break;
                                let _xx = _ccx - _hd * _i * _HB * _hsp;
                                let _s = Math.sin(_t2 * _ht) * CUS_HX_BIEN;
                                ctx.globalAlpha = 0.45 * (1 - _i / _HN);
                                ctx.strokeStyle = _cm[2]; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(_xx, _hy + _s); ctx.lineTo(_xx, _hy - _s); ctx.stroke();
                            }
                            ctx.restore();
                        }
                        // dau vien dan
                        let _hl = this.w, _hh = this.h;
                        ctx.save(); ctx.translate(_ccx, _ccy);
                        ctx.shadowBlur = 8; ctx.shadowColor = this._cusHxPha ? "#81D4FA" : "#FFF176";
                        ctx.fillStyle = this._cusHxPha ? "#81D4FA" : "#FFF176";
                        ctx.beginPath(); ctx.ellipse(0, 0, _hl * 0.5, _hh * 0.62, 0, 0, 6.28); ctx.fill();
                        ctx.fillStyle = "#FFFFFF";
                        ctx.beginPath(); ctx.ellipse(0, 0, _hl * 0.22, _hh * 0.3, 0, 0, 6.28); ctx.fill();
                        ctx.restore();
                        if (this._cusHxNut){
                            ctx.save(); ctx.globalAlpha = 0.85;
                            ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(_ccx - _hl * 0.5, _ccy - _hh * 1.2);
                            ctx.lineTo(_ccx + _hl * 0.25, _ccy);
                            ctx.lineTo(_ccx - _hl * 0.25, _ccy);
                            ctx.lineTo(_ccx + _hl * 0.5, _ccy + _hh * 1.2);
                            ctx.stroke();
                            ctx.fillStyle = "rgba(224,247,255,0.5)";
                            ctx.beginPath(); ctx.arc(_ccx, _ccy, _hl * 0.7, 0, 6.28); ctx.fill();
                            ctx.restore();
                        }
                    } else if (this._cusToaChinh){
                        // ---- TOA: vien me nhin nhu mot cai HAT sap bung ----
                        let _tl = this.w, _th = this.h;
                        ctx.save(); ctx.translate(_ccx, _ccy); ctx.rotate(_cag);
                        ctx.strokeStyle = "rgba(255,241,118,0.55)"; ctx.lineWidth = 1.5;
                        for (let _k = 0; _k < 6; _k++){
                            let _a = (_k / 6) * Math.PI * 2 + frames * 0.10;
                            ctx.beginPath(); ctx.moveTo(Math.cos(_a) * _th * 0.5, Math.sin(_a) * _th * 0.5);
                            ctx.lineTo(Math.cos(_a) * _th * 1.05, Math.sin(_a) * _th * 1.05); ctx.stroke();
                        }
                        ctx.shadowBlur = 8; ctx.shadowColor = _cm[2];
                        ctx.fillStyle = _cm[0];
                        ctx.beginPath(); ctx.ellipse(0, 0, _tl * 0.42, _th * 0.62, 0, 0, 6.28); ctx.fill();
                        ctx.fillStyle = _cm[1];
                        ctx.beginPath(); ctx.ellipse(_tl * 0.08, 0, _tl * 0.16, _th * 0.26, 0, 0, 6.28); ctx.fill();
                        ctx.restore();
                    } else if (this._cusToaCon){
                        // ---- manh toa: mot tia nho sang ----
                        let _tv = this._cusToaVe || 1;
                        let _sl = this.w * _tv, _sh = this.h * _tv;
                        ctx.save(); ctx.translate(_ccx, _ccy); ctx.rotate(_cag);
                        ctx.shadowBlur = 6; ctx.shadowColor = _cm[2];
                        ctx.fillStyle = _cm[0];
                        ctx.beginPath(); ctx.moveTo(-_sl/2, 0); ctx.lineTo(_sl/2 - _sh*0.5, -_sh/2);
                        ctx.lineTo(_sl/2, 0); ctx.lineTo(_sl/2 - _sh*0.5, _sh/2); ctx.closePath(); ctx.fill();
                        ctx.fillStyle = _cm[1]; ctx.fillRect(-_sl*0.1, -_sh*0.16, _sl*0.4, _sh*0.32);
                        ctx.restore();
                    } else {
                        let _cu = this._cusU || 0;          // 0..1 theo quang duong (chi nhanh TAM XA)
                        let _cl = this.w, _ch = this.h;
                        let _bd = (typeof cusCapCua === 'function') ? cusCapCua('bangdan') : 0;
                        let _tt = (typeof cusCapCua === 'function') ? cusCapCua('tachtia') : 0;
                        ctx.save(); ctx.translate(_ccx, _ccy); ctx.rotate(_cag);
                        if (_cu > 0.02){
                            // TAM XA giu bang mau RIENG cua no: mau o day noi ve QUANG DUONG,
                            // khong phai ve hieu ung, nen khong nhuom theo hieu ung.
                            let _cr = _cl * (0.9 + 1.4 * _cu);
                            let _cmx = _cu > 0.66 ? "255,213,79" : (_cu > 0.33 ? "255,241,118" : "176,190,197");
                            let _cg = ctx.createRadialGradient(0, 0, 0, 0, 0, _cr);
                            _cg.addColorStop(0, "rgba(" + _cmx + ",0.55)");
                            _cg.addColorStop(1, "rgba(" + _cmx + ",0)");
                            ctx.fillStyle = _cg; ctx.beginPath(); ctx.arc(0, 0, _cr, 0, 6.28); ctx.fill();
                            ctx.strokeStyle = "rgba(" + _cmx + ",0.75)"; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.arc(0, 0, _cl * 0.62, 0, 6.28); ctx.stroke();
                        }
                        let _than = _cu > 0.66 ? "#FFD54F" : (_cu > 0.33 ? "#FFF176" : _cm[0]);
                        let _loi  = _cu > 0.33 ? "#FFFDE7" : _cm[1];
                        ctx.shadowBlur = 6 + 10 * _cu;
                        ctx.shadowColor = _cu > 0.5 ? "#FFD54F" : _cm[2];
                        if (_tt > 0){
                            // TACH TIA: mot mui LAO nhon, kem mot bong mo lech — nhin la biet
                            // no di theo chum chu khong di mot minh.
                            ctx.globalAlpha = 0.3; ctx.fillStyle = _than;
                            ctx.fillRect(-_cl*0.6, -_ch*0.5 - _ch*0.55, _cl*0.7, _ch*0.7);
                            ctx.globalAlpha = 1;
                            ctx.fillStyle = _than;
                            ctx.beginPath(); ctx.moveTo(-_cl/2, -_ch/2); ctx.lineTo(_cl*0.18, -_ch/2);
                            ctx.lineTo(_cl/2, 0); ctx.lineTo(_cl*0.18, _ch/2); ctx.lineTo(-_cl/2, _ch/2);
                            ctx.closePath(); ctx.fill();
                            ctx.fillStyle = _loi; ctx.fillRect(-_cl*0.3, -_ch*0.18, _cl*0.45, _ch*0.36);
                        } else if (_bd > 0 && _cu <= 0.02){
                            // BANG DAN: mot vien dan DONG that su — than dong, vanh day, dau nhon
                            ctx.fillStyle = "#B08D57";
                            ctx.fillRect(-_cl/2, -_ch/2, _cl * 0.68, _ch);
                            ctx.fillStyle = "#8D6E47"; ctx.fillRect(-_cl/2, -_ch/2, _cl * 0.12, _ch);
                            ctx.fillStyle = _than;
                            ctx.beginPath(); ctx.moveTo(_cl*0.18, -_ch/2); ctx.lineTo(_cl/2, 0);
                            ctx.lineTo(_cl*0.18, _ch/2); ctx.closePath(); ctx.fill();
                            ctx.fillStyle = _loi; ctx.fillRect(-_cl*0.2, -_ch*0.16, _cl*0.3, _ch*0.32);
                        } else {
                            /* @@HE-CUSVE2 — Hans: "Custom thi no giong dan hon". Mot vien dan that:
                               duoi co ranh, than tru, mui dau dan cong (ogive), vet sang doc than.
                               Mau than / loi van theo HIEU UNG nhu cu. */
                            ctx.save(); ctx.shadowBlur = 0;
                            ctx.fillStyle = "rgba(255,255,255,0.18)";               // vet gio phia sau
                            ctx.fillRect(-_cl * 1.1, -_ch * 0.22, _cl * 0.6, _ch * 0.44);
                            ctx.restore();
                            let _xm = _cl * 0.08;                                   // noi than -> mui
                            ctx.fillStyle = _than;
                            ctx.beginPath();
                            ctx.moveTo(-_cl/2, -_ch * 0.42); ctx.lineTo(_xm, -_ch/2);
                            ctx.quadraticCurveTo(_cl * 0.42, -_ch * 0.46, _cl/2, 0);
                            ctx.quadraticCurveTo(_cl * 0.42, _ch * 0.46, _xm, _ch/2);
                            ctx.lineTo(-_cl/2, _ch * 0.42); ctx.closePath(); ctx.fill();
                            ctx.fillStyle = "rgba(0,0,0,0.28)";                    // ranh duoi + day
                            ctx.fillRect(-_cl/2, -_ch * 0.42, _cl * 0.1, _ch * 0.84);
                            ctx.fillRect(-_cl * 0.3, -_ch * 0.46, _cl * 0.05, _ch * 0.92);
                            ctx.fillStyle = _loi;                                   // vet sang
                            ctx.fillRect(-_cl * 0.38, -_ch * 0.3, _cl * 0.62, _ch * 0.18);
                            ctx.beginPath(); ctx.arc(_cl * 0.3, -_ch * 0.08, _ch * 0.14, 0, 6.28); ctx.fill();
                        }
                        ctx.restore();
                        // DOT: vai doi tan bay lai phia sau
                        if (typeof cusCapCua === 'function' && cusCapCua('dot') > 0){
                            ctx.save();
                            for (let _k = 0; _k < 2; _k++){
                                ctx.globalAlpha = 0.5 - _k * 0.2;
                                ctx.fillStyle = _k ? "#FF7043" : "#FFCA28";
                                let _bx = _ccx - (this.speed >= 0 ? 1 : -1) * (_cl * (0.8 + _k * 0.8));
                                let _by = _ccy + Math.sin(frames * 0.4 + _k * 2) * 3;
                                ctx.beginPath(); ctx.arc(_bx, _by, _ch * (0.42 - _k * 0.12), 0, 6.28); ctx.fill();
                            }
                            ctx.restore();
                        }
                    }
                } else if (this.rf) {
                    // Mau chuyen XANH LA -> TIM theo chuoi ban. Moc cuoi thanh mot TIA LASER nho.
                    let t = this.rfT || 0;
                    let cx2 = this.x + this.w/2, cy2 = this.y + this.h/2;
                    let a2 = Math.atan2(this.vy || 0, this.speed || 1);
                    let R = Math.round(118 + (156 - 118) * t), G2 = Math.round(255 - 255 * t * 0.72), B = Math.round(3 + (255 - 3) * t);
                    let mau = `rgb(${R},${G2},${B})`;
                    ctx.save(); ctx.translate(cx2, cy2); ctx.rotate(a2);
                    ctx.shadowBlur = 8 + 10 * t; ctx.shadowColor = mau;
                    if (this.rfLaser){
                        ctx.fillStyle = mau; ctx.fillRect(-26, -2, 52, 4);
                        ctx.fillStyle = "#FFFFFF"; ctx.fillRect(-22, -1, 44, 2);
                    } else {
                        let L2 = 8 + 12 * t;
                        ctx.fillStyle = mau; ctx.fillRect(-L2/2, -2.5, L2, 5);
                        ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.fillRect(-L2/2 + 1, -1, L2 - 2, 2);
                    }
                    ctx.restore();
                } else if (this.ws) {
                    // Dan kieu JHIN: than thon nhon mau do hong, loi vang, duoi keo dai.
                    // Vien thu 4 to hon, boc quang toi va co canh hoa xoe ra.
                    let cx2 = this.x + this.w/2, cy2 = this.y + this.h/2;
                    let ang = Math.atan2(this.vy || 0, this.speed || 1);
                    let bon = !!this.wsBon, to = bon ? 1.75 : 1;
                    let L = (this.wsNang ? 30 : 18) * to, Wd = (this.wsNang ? 13 : 5) * to;
                    ctx.save(); ctx.translate(cx2, cy2); ctx.rotate(ang);
                    // duoi
                    let tg = ctx.createLinearGradient(-L * 3.4, 0, 0, 0);
                    tg.addColorStop(0, "rgba(236,64,122,0)");
                    tg.addColorStop(1, bon ? "rgba(255,213,79,0.85)" : "rgba(244,143,177,0.8)");
                    ctx.fillStyle = tg;
                    ctx.beginPath(); ctx.moveTo(-L * 3.4, 0); ctx.lineTo(0, -Wd * 0.85); ctx.lineTo(0, Wd * 0.85);
                    ctx.closePath(); ctx.fill();
                    if (bon){                                   // hao quang toi cua vien thu 4
                        ctx.fillStyle = "rgba(74,20,90,0.55)";
                        ctx.beginPath(); ctx.ellipse(0, 0, L * 1.5, Wd * 2.4, 0, 0, Math.PI*2); ctx.fill();
                        ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 2;
                        for (let k = 0; k < 4; k++){            // canh hoa xoe
                            let a2 = k * Math.PI/2 + frames * 0.09;
                            ctx.beginPath();
                            ctx.moveTo(0, 0);
                            ctx.quadraticCurveTo(Math.cos(a2+0.6)*L*0.9, Math.sin(a2+0.6)*Wd*2.2,
                                                 Math.cos(a2)*L*1.25, Math.sin(a2)*Wd*2.8);
                            ctx.stroke();
                        }
                    }
                    ctx.shadowBlur = 14; ctx.shadowColor = bon ? "#FFD54F" : "#EC407A";
                    if (this.wsNang){
                        // VIEN NANG: dai, day, co hai vanh dai quanh than -> nhin la biet ngay
                        ctx.fillStyle = "rgba(74,20,90,0.5)";
                        ctx.beginPath(); ctx.ellipse(0, 0, L * 1.1, Wd * 1.5, 0, 0, Math.PI*2); ctx.fill();
                        ctx.strokeStyle = "#FFD54F"; ctx.lineWidth = 2.5;
                        for (let k = -1; k <= 1; k += 2){
                            ctx.beginPath(); ctx.ellipse(L * 0.2 * k, 0, Wd * 0.55, Wd * 1.25, 0, 0, Math.PI*2); ctx.stroke();
                        }
                    }
                    // than dan: hinh thoi nhon
                    ctx.fillStyle = this.wsNang ? "#7B0F3A" : (bon ? "#B71C4A" : "#C2185B");
                    ctx.beginPath();
                    ctx.moveTo(L, 0); ctx.lineTo(0, -Wd); ctx.lineTo(-L * 0.55, 0); ctx.lineTo(0, Wd);
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = bon ? "#FFD54F" : "#F48FB1"; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = bon ? "#FFECB3" : "#FFD54F";
                    ctx.beginPath();
                    ctx.moveTo(L * 0.62, 0); ctx.lineTo(0, -Wd * 0.42); ctx.lineTo(-L * 0.2, 0); ctx.lineTo(0, Wd * 0.42);
                    ctx.closePath(); ctx.fill();
                    ctx.restore();
                } else if (this.cryo) {
                    let cx2 = this.x + this.w/2, cy2 = this.y + this.h/2;
                    let g = frames * 0.14 + (this._cryoPha = (this._cryoPha || Math.random() * 6));
                    ctx.save(); ctx.translate(cx2, cy2); ctx.rotate(g);
                    ctx.shadowBlur = 12; ctx.shadowColor = "#B3E5FC";
                    if (this.cryoKhoi || this.cryoGai){
                        let R = Math.max(this.w, this.h) / 2;
                        ctx.fillStyle = "rgba(79,195,247,0.85)";
                        ctx.beginPath();
                        for (let k = 0; k < 6; k++){ let a = k * Math.PI/3; (k ? ctx.lineTo : ctx.moveTo).call(ctx, Math.cos(a)*R, Math.sin(a)*R); }
                        ctx.closePath(); ctx.fill();
                        ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = 2; ctx.stroke();
                        if (this.cryoGai){                       // khoi GAI: co gai chia ra
                            ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 3;
                            for (let k = 0; k < 8; k++){ let a = k * Math.PI/4;
                                ctx.beginPath(); ctx.moveTo(Math.cos(a)*R*0.7, Math.sin(a)*R*0.7);
                                ctx.lineTo(Math.cos(a)*R*1.6, Math.sin(a)*R*1.6); ctx.stroke(); }
                        }
                        ctx.fillStyle = "rgba(255,255,255,0.9)";
                        ctx.beginPath(); ctx.arc(0, 0, R*0.34, 0, Math.PI*2); ctx.fill();
                    } else {                                     // HOA BANG / manh
                        let R = this.cryoManh ? 5 : 9;
                        ctx.strokeStyle = "#E1F5FE"; ctx.lineWidth = this.cryoManh ? 2 : 3;
                        for (let k = 0; k < 6; k++){ let a = k * Math.PI/3;
                            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a)*R, Math.sin(a)*R); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(Math.cos(a)*R*0.6, Math.sin(a)*R*0.6);
                            ctx.lineTo(Math.cos(a)*R*0.6 + Math.cos(a+1)*R*0.3, Math.sin(a)*R*0.6 + Math.sin(a+1)*R*0.3); ctx.stroke(); }
                        ctx.fillStyle = "#FFFFFF"; ctx.beginPath(); ctx.arc(0, 0, R*0.3, 0, Math.PI*2); ctx.fill();
                    }
                    ctx.restore();
                } else if (this.type === 2) {
                    // NAC CHARGE 2: cau nang luong CUC TO, loi trang, 2 vong xoay nguoc chieu, co duoi keo
                    let cx0 = this.x + this.w/2, cy0 = this.y + this.h/2, R = Math.max(this.w, this.h) * 0.72;
                    let dirp = (this.speed || 1) >= 0 ? 1 : -1;
                    ctx.shadowBlur = 20; ctx.shadowColor = "#00E5FF";
                    ctx.fillStyle = "rgba(0,188,212,0.30)";
                    ctx.beginPath(); ctx.ellipse(cx0 - dirp*R*1.5, cy0, R*1.6, R*0.5, 0, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "rgba(0,188,212,0.55)"; ctx.beginPath(); ctx.arc(cx0, cy0, R, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#00E5FF"; ctx.beginPath(); ctx.arc(cx0, cy0, R*0.68, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#FFFFFF"; ctx.beginPath(); ctx.arc(cx0, cy0, R*0.34, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "rgba(178,235,242,0.95)"; ctx.lineWidth = 3;
                    ctx.save(); ctx.translate(cx0, cy0);
                    ctx.rotate(frames * 0.22); ctx.beginPath(); ctx.ellipse(0, 0, R*1.15, R*0.40, 0, 0, 6.28); ctx.stroke();
                    ctx.rotate(-frames * 0.44); ctx.beginPath(); ctx.ellipse(0, 0, R*0.95, R*0.34, 1.1, 0, 6.28); ctx.stroke();
                    ctx.restore();
                } else if (this.type === 1) {
                    // NAC CHARGE 1: cau nang luong TO, mot vong xoay
                    let cx0 = this.x + this.w/2, cy0 = this.y + this.h/2, R = Math.max(this.w, this.h) * 0.62;
                    ctx.shadowBlur = 14; ctx.shadowColor = "#00BCD4";
                    ctx.fillStyle = "rgba(0,188,212,0.40)"; ctx.beginPath(); ctx.arc(cx0, cy0, R, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#00BCD4"; ctx.beginPath(); ctx.arc(cx0, cy0, R*0.66, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#E0F7FA"; ctx.beginPath(); ctx.arc(cx0, cy0, R*0.30, 0, 6.28); ctx.fill();
                    ctx.strokeStyle = "rgba(178,235,242,0.9)"; ctx.lineWidth = 2;
                    ctx.save(); ctx.translate(cx0, cy0); ctx.rotate(frames * 0.18);
                    ctx.beginPath(); ctx.ellipse(0, 0, R*1.05, R*0.36, 0, 0, 6.28); ctx.stroke(); ctx.restore();
                } else if (this.type === 3 || this.type === 4) {
                    // ===== CAU LUA INFERNO: loi trang nong, 3 lop nhiet, duoi lua cuon phia sau =====
                    let big = this.type === 3;
                    let cx0 = this.x + this.w/2, cy0 = this.y + this.h/2, R = this.w/2 * (big ? 1.25 : 1.05);
                    let dirp = (this.speed || 1) >= 0 ? 1 : -1;
                    ctx.shadowBlur = big ? 18 : 13; ctx.shadowColor = "#FF5722";
                    // duoi lua: 4 luoi nho dan keo ve sau, lech theo song
                    for (let k = 4; k >= 1; k--) {
                        let tx = cx0 - dirp * R * (0.9 + k * 0.85);
                        let ty = cy0 + Math.sin(frames * 0.45 + k * 1.1) * (R * 0.30);
                        let tr = R * (1 - k * 0.17);
                        ctx.fillStyle = k > 2 ? "rgba(191,54,12,0.32)" : "rgba(255,112,67,0.55)";
                        ctx.beginPath(); ctx.arc(tx, ty, Math.max(1, tr), 0, 6.28); ctx.fill();
                    }
                    // than: quang do -> cam -> vang -> loi trang
                    ctx.fillStyle = "rgba(191,54,12,0.45)"; ctx.beginPath(); ctx.arc(cx0, cy0, R * 1.5, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#E64A19"; ctx.beginPath(); ctx.arc(cx0, cy0, R * 1.12, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#FF9800"; ctx.beginPath(); ctx.arc(cx0, cy0, R * 0.80, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#FFD54F"; ctx.beginPath(); ctx.arc(cx0 + dirp * R * 0.10, cy0, R * 0.50, 0, 6.28); ctx.fill();
                    ctx.fillStyle = "#FFFDE7"; ctx.beginPath(); ctx.arc(cx0 + dirp * R * 0.16, cy0, R * 0.26, 0, 6.28); ctx.fill();
                    // tan lua bung ra phia truoc
                    for (let k = 0; k < 3; k++) { let a = frames * 0.3 + k * 2.1;
                        ctx.fillStyle = "rgba(255,193,7,0.7)";
                        ctx.beginPath(); ctx.arc(cx0 + dirp * R * 1.2 + Math.cos(a) * R * 0.4, cy0 + Math.sin(a) * R * 0.55, R * 0.18, 0, 6.28); ctx.fill(); }
                } else if (this.type === 5) {
                    ctx.shadowBlur = 4; ctx.shadowColor = "#76FF03"; ctx.fillStyle = "#76FF03"; ctx.fillRect(this.x, this.y, this.w, this.h);
                    ctx.strokeStyle = "white"; ctx.lineWidth = 1; ctx.strokeRect(this.x, this.y, this.w, this.h);
                } else if (this.type === 6) { 
                    ctx.shadowBlur = 5; ctx.shadowColor = "#FFEB3B"; ctx.fillStyle = "#FFEB3B"; ctx.fillRect(this.x, this.y, this.w, this.h);
                    ctx.strokeStyle = "white"; ctx.lineWidth = 1.5; ctx.strokeRect(this.x, this.y, this.w, this.h);
                } else if (this.type === 9) {
                    ctx.shadowBlur = 8; ctx.shadowColor = "#FF1744"; ctx.fillStyle = "#FF1744"; ctx.fillRect(this.x, this.y, this.w, this.h);
                    ctx.strokeStyle = "white"; ctx.lineWidth = 1.5; ctx.strokeRect(this.x, this.y, this.w, this.h);
                } else if (this.type === 7 || this.type === 8) {
                    // KIEM KHI MAT TRANG — mo phong nhat chem cua Colonel (Mega Man X4):
                    // mot vong cung nang luong tim, LON DAN trong khi bay chu khong dung yen.
                    this._cresAge = Math.min(46, (this._cresAge || 0) + 1);
                    let p = this._cresAge / 46;
                    // NO RA: keo ca hitbox chu khong chi hinh ve, de cai nhin thay = cai an don.
                    if (this._cresW0 === undefined){ this._cresW0 = this.w; this._cresH0 = this.h; }
                    {
                        let _no = 1 + (this._cresNo || 1.6) * p;
                        let _nw = this._cresW0 * _no, _nh = this._cresH0 * _no;
                        this.y += (this.h - _nh) / 2;      // giu tam khi no
                        this.x += (this.w - _nw) / 2;
                        this.w = _nw; this.h = _nh;
                    }
                    ctx.translate(this.x + this.w/2, this.y + this.h/2); ctx.scale(this.dir, 1);
                    // Kich thuoc BAM theo hitbox (truoc day R tinh tu h*1.5+w*0.9 nen phinh
                    // gap may lan vung sat thuong that).
                    let R = this.h * 0.46;                   // hitbox da tu no roi, khong nhan them
                    let mo = 1.06 + 0.10 * p;
                    let tx = -R * 0.52;
                    let _cc = this._cresCol || "#B388FF";
                    let _rgb = (function(h){ h = String(h).replace('#','');
                        if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
                        let n = parseInt(h, 16);
                        return isNaN(n) ? [179,102,255] : [(n>>16)&255, (n>>8)&255, n&255]; })(_cc);
                    const _rg = (a2, k) => 'rgba(' + Math.round(_rgb[0]*k) + ',' + Math.round(_rgb[1]*k)
                                          + ',' + Math.round(_rgb[2]*k) + ',' + a2 + ')';
                    ctx.shadowBlur = 14; ctx.shadowColor = _cc;
                    // HINH DANG: luoi liem — day o giua, VUOT NHON ve hai dau.
                    // Truoc day la mot dai vong co be day khong doi nen trong nhu cai bang.
                    const cung = (day, mau) => {
                        ctx.beginPath();
                        ctx.arc(tx, 0, R, -mo, mo);
                        const N = 16;
                        for (let i = N; i >= 0; i--){
                            let th = -mo + (2 * mo) * (i / N);
                            let d = day * Math.cos(th / mo * Math.PI / 2);   // -> 0 o hai dau
                            ctx.lineTo(tx + Math.cos(th) * (R - d), Math.sin(th) * (R - d));
                        }
                        ctx.closePath(); ctx.fillStyle = mau; ctx.fill();
                    };
                    cung(R * 0.30, _rg(0.55, 0.36));    // vien ngoai: mau luoi kiem, toi
                    cung(R * 0.18, _rg(0.92, 1.00));    // than: dung mau luoi kiem
                    cung(R * 0.07, 'rgba(255,255,255,0.98)');
                } else if (this.type === 10) {
                    let cx = this.x + this.w/2, cy = this.y + this.h/2, r = this.w/2, td = this.speed >= 0 ? -1 : 1;
                    let tg = ctx.createLinearGradient(cx, cy, cx + td*r*4.5, cy); tg.addColorStop(0, "rgba(41,121,255,0.85)"); tg.addColorStop(1, "rgba(41,121,255,0)");
                    ctx.fillStyle = tg; ctx.beginPath(); ctx.moveTo(cx, cy - r*0.7); ctx.lineTo(cx + td*r*4.5, cy); ctx.lineTo(cx, cy + r*0.7); ctx.closePath(); ctx.fill();
                    ctx.shadowBlur = 16; ctx.shadowColor = "#448AFF"; ctx.fillStyle = "#2979FF"; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#82B1FF"; ctx.beginPath(); ctx.arc(cx, cy, r*0.55, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, r*0.24, 0, Math.PI*2); ctx.fill();
                } else if (this.type === 11) {
                    let cx = this.x + this.w/2, cy = this.y + this.h/2, fd = this.speed >= 0 ? 1 : -1;
                    ctx.translate(cx, cy); ctx.shadowBlur = 18; ctx.shadowColor = "#FF1744";
                    ctx.fillStyle = "rgba(255,23,68,0.55)"; ctx.beginPath(); ctx.ellipse(0, 0, this.w/2, this.h/2, 0, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "rgba(255,82,82,0.95)"; ctx.beginPath(); ctx.ellipse(0, 0, this.w/2.6, this.h/3, 0, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFF3E0"; ctx.beginPath(); ctx.ellipse(fd*this.w/6, 0, this.w/7, this.h/5, 0, 0, Math.PI*2); ctx.fill();
                } else if (this.type === 12) {
                    ctx.shadowBlur = 12; ctx.shadowColor = "#FFEB3B"; ctx.fillStyle = "#FFEB3B"; ctx.beginPath(); ctx.arc(this.x + this.w/2, this.y + this.h/2, this.w/2, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFF59D"; ctx.beginPath(); ctx.arc(this.x + this.w/2, this.y + this.h/2, this.w/4, 0, Math.PI*2); ctx.fill();
                } else if (this.type === 13) {
                    ctx.shadowBlur = 16; ctx.shadowColor = "#FFD600"; ctx.fillStyle = "#FFC400"; ctx.beginPath(); ctx.arc(this.x + this.w/2, this.y + this.h/2, this.w/2, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#FFF176"; ctx.beginPath(); ctx.arc(this.x + this.w/2, this.y + this.h/2, this.w/3, 0, Math.PI*2); ctx.fill();
                    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(this.x + this.w/2, this.y + this.h/2, this.w/7, 0, Math.PI*2); ctx.fill();
                } else {
                    ctx.shadowBlur = 5; ctx.shadowColor = "#00E5FF"; ctx.fillStyle = "#00E5FF"; ctx.fillRect(this.x, this.y, this.w, this.h);
                    ctx.strokeStyle = "white"; ctx.lineWidth = 1.5; ctx.strokeRect(this.x, this.y, this.w, this.h);
                }
                ctx.restore();
            }
            update() {
                // ===== CAN MEP TRUOC VE DUNG NONG SUNG =====
                // Dan luon sinh ra voi `x` = MEP TRAI. Ban sang phai thi mep truoc la x+w,
                // tuc no da nam san w pixel ve phia dich; ban sang trai thi mep truoc la x,
                // vien dan lui lai sau nong ca mot than minh. Dan Phan Hach con nhan w len
                // 1.6-2.5 lan nen cho lech thanh vai chuc pixel: cong 5 loat Pulse K thi
                // nguoi dung ben trai gay 43, nguoi dung ben phai chi gay 34 — thiet chi vi
                // dung sai ben. Lam o nhip update DAU TIEN chu khong o constructor, vi nhieu
                // vu khi phong to w SAU khi vien dan da duoc tao.
                if (!this._canLe){
                    this._canLe = 1;
                    if (gameState === 'pvp' && ((this.dir || 0) < 0 || (this.speed || 0) < 0))
                        this.x -= this.w;
                }
                // ===== DAN DO RUC cua SUPERNOVA: TEN LUA TU DAN =====
                // Truoc day toi chi gan `homing = true` — Projectile khong he doc truong do, nen
                // dan bay thang ra ngoai va truot het. Danh hinh nom chi ra 18 dmg vi cac vien
                // nay khong bao gio quay lai. Gio dan thuc su lai cho muc tieu gan nhat.
                // DAN NO cua Sentry: cham gan muc tieu la kich no; khong trung ai thi tu no
                // giua khong sau 90 khung.
                if (this._sentryNo) {
                    let cx1 = this.x + this.w/2, cy1 = this.y + this.h/2, cham = false;
                    for (let o of ((typeof pvpMucCua === 'function') ? pvpMucCua(this.owner) : allTargets())){   // @@HE-P2KHOA
                        if (!o || o.invulnAll || o.hp <= 0) continue;
                        if (Math.hypot((o.x + (o.w||20)/2) - cx1, (o.y + (o.h||20)/2) - cy1) < 30){ cham = true; break; }
                    }
                    if (cham || (this._noLife = (this._noLife || 0) + 1) > 90){
                        if (typeof novaBlast === 'function') novaBlast(cx1, cy1, 46, 2, null, 0, 'explosion');
                        visualEffects.push(new Effect(cx1, cy1, 'explosion', true, 26));
                        if (typeof SFX !== 'undefined' && SFX.tone) SFX.tone(200, 0.08, 'sawtooth', 0.14, 90);
                        this.dead = true;
                    }
                }
                if (this._novaRed) {
                    let mt = null, bd = 1e9;
                    let cx0 = this.x + this.w/2, cy0 = this.y + this.h/2;
                    for (let o of ((typeof pvpMucCua === 'function') ? pvpMucCua(this.owner) : allTargets())){   // @@HE-P2KHOA
                        if (!o || o.invulnAll || o.hp <= 0) continue;
                        let d = Math.hypot((o.x + (o.w||20)/2) - cx0, (o.y + (o.h||20)/2) - cy0);
                        if (d < bd){ bd = d; mt = o; }
                    }
                    if (mt){
                        let goc = Math.atan2((mt.y + (mt.h||20)/2) - cy0, (mt.x + (mt.w||20)/2) - cx0);
                        let sp = Math.min(11, Math.hypot(this.speed||0, this.vy||0) + 0.32);   // tang toc dan
                        let hnay = Math.atan2(this.vy||0, this.speed||0);
                        let lech = Math.atan2(Math.sin(goc - hnay), Math.cos(goc - hnay));
                        let quay = Math.max(-0.22, Math.min(0.22, lech));                      // ban kinh vong kha rong
                        let hmoi = hnay + quay;
                        this.speed = Math.cos(hmoi) * sp; this.vy = Math.sin(hmoi) * sp;
                    }
                    if ((this._novaLife = (this._novaLife || 0) + 1) > 210) this.dead = true;
                }
                if (this.pulsar || this._fromStar) {
                    this._pulsarTravel = (this._pulsarTravel || 0) + Math.hypot(this.speed || 0, this.vy || 0);
                    const _sixCm = Math.max(1, canvas.width * (6/23));
                    const _maxTier = this.pulsar ? 3 : 2;
                    const _tier = Math.min(_maxTier, 1 + Math.floor(this._pulsarTravel / _sixCm));
                    this._pulsarTier = Math.max(1, _tier);
                    this._pulsarRangeT = Math.max(0, Math.min(1, this._pulsarTravel / (_sixCm * (_maxTier - 1 || 1))));
                    if ((this._pulsarLastVisualTier || 1) < _tier) {
                      this._pulsarLastVisualTier = _tier;
                      // TRUOC DAY: moi vien len cap lai TAO MOT THE DOM va goi getBoundingClientRect().
                      // getBoundingClientRect ep trinh duyet tinh lai toan bo layout; mot lan Ult co
                      // 72 vien cung len cap trong vai khung hinh -> 72 lan reflow + 72 the DOM.
                      // Day moi la nguyen nhan lag, khong phai so luong dan.
                      // Gio ve thang len canvas: chi la mot vong tron nho, gan nhu mien phi.
                      this._pulsarFlash = 9;
                    }
                }
                if (this.type === 12) { this.zigT = (this.zigT || 0) + 1.4; this.zigBaseY = (this.zigBaseY !== undefined ? this.zigBaseY : this.y) + (this.zigVy || 0); this.x += this.speed; this.y = this.zigBaseY + Math.sin(this.zigT + (this.zigPhase || 0)) * 9; return; }
                this.x += this.speed; this.y += this.vy;
                if (this.bounce) {
                    if (this.bounceLife !== undefined && --this.bounceLife <= 0) { this.bounce = false; }
                    else {
                    let bounced = false;
                    if (this.x <= 0) { this.x = 0; this.speed = Math.abs(this.speed); bounced = true; }
                    else if (this.x >= canvas.width - this.w) { this.x = canvas.width - this.w; this.speed = -Math.abs(this.speed); bounced = true; }
                    if (this.y <= 0) { this.y = 0; this.vy = Math.abs(this.vy) || 2.5; bounced = true; }
                    else if (this.y >= 320 - this.h) { this.y = 320 - this.h; this.vy = -(Math.abs(this.vy) || 2.5); bounced = true; }
                    if (bounced) this.hitIds = new Set();
                    }
                }
            }
        }
// PLAYER_PART_END s2.Projectile.1

// index.html:46736 · Phạm vi: global
// PLAYER_PART_BEGIN s2.WindBlade.1 EDITABLE
class WindBlade {
            constructor(x, y, tx, ty, speed = 10) {
                let dx = tx - x, dy = ty - y, d = Math.hypot(dx, dy) || 1;
                this.vx = dx / d * speed; this.vy = dy / d * speed;
                this.x = x; this.y = y; this.w = 26; this.h = 26;
                this.dmg = 1; this.isWave = false; this.isPiercing = false;
                this.ang = Math.atan2(dy, dx); this.life = 200;
            }
            update() { this.x += this.vx; this.y += this.vy; this.life--; if (this.life <= 0) this.x = -999; }
            draw() {
                ctx.save(); ctx.translate(this.x + this.w/2, this.y + this.h/2); ctx.rotate(this.ang + Math.PI/2);
                ctx.fillStyle = "rgba(178, 235, 242, 0.9)";
                ctx.beginPath(); ctx.moveTo(-26, 10); ctx.quadraticCurveTo(0, -16, 26, 10); ctx.quadraticCurveTo(0, -2, -26, 10); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = "#00E5FF"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(-26, 10); ctx.quadraticCurveTo(0, -16, 26, 10); ctx.stroke();
                ctx.restore();
            }
        }
// PLAYER_PART_END s2.WindBlade.1
