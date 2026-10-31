// PLAYER_FILE: ProjectilesAndEffects01
// PLAYER_SNAPSHOT: ac95756f3acfed6d6f9d02fb09138fb3733cdf9c95fea17096fea023062a7b86
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DSW_ARC, DSW_GOLD, DSW_NGANG, DSW_NGANG_HET, DSW_NGANG_LAY, DSW_NGANG_RY, SFX, ctx, dino, dswAngle, dswAngleCat, dswHexRGB, dswNgangPha, dswTrail, frames, parry, playerHexImpact
// index.html:45750 · Phạm vi: global
// PLAYER_PART_BEGIN s2.Effect.1 EDITABLE
class Effect {
            constructor(x, y, type, isLeft = true, radius = 0) { 
                this.x = x; this.y = y; this.type = type; this.timer = 0; this.isLeft = isLeft; this.radius = radius; 
                this.life = 30;   // vet chem bam theo nhip kiem thi can song lau hon (xem _beginSlash)
                if (type === 'parry') { SFX.parry(); if(typeof playerHexImpact==='function'){for(const n of [dino,typeof p2!=='undefined'?p2:null])if(n&&Math.hypot(x-n.x-n.w/2,y-n.y-n.h/2)<150)playerHexImpact(n,x,y);} }
            }
            update() {
                this.timer++;
                // BAM THEO CHU: nhat chem di theo nguoi choi ke ca khi nhay/chay, khong bi tre nhip
                if (this.follow) { this.x = this.follow.x + this.follow.w/2; this.y = this.follow.y + this.follow.h/2; }
                // Vet chem cua nhat TRUOC: nguoi choi da sang nhat moi (swordPose moi) nen khong ai dem tiep dong ho
                // cua tu the cu -> vet cu DUNG HINH giua chung toi het life (loi "ket Effect" o J -> Luot -> J).
                // Tu dem tiep (mot lan moi khung) de no quet xong va mo di dung nhip.
                if (this.pose && this.follow && this.follow.swordPose !== this.pose && this.pose.t > 0 && this.pose._tf !== frames){
                    this.pose._tf = frames; this.pose.t--;
                }
            }
            draw() {
                if (this.type === 'parry') {
                    ctx.beginPath(); ctx.arc(this.x, this.y, this.timer * 5, 0, Math.PI*2);
                    ctx.strokeStyle = `rgba(0, 255, 255, ${1 - this.timer/20})`; ctx.lineWidth = 6; ctx.stroke();
                } else if (this.type === 'charge_wave') {
                    ctx.fillStyle = `rgba(255, 255, 255, ${0.5 - this.timer/30})`;
                    let dir = this.isLeft ? -1 : 1;
                    ctx.fillRect(this.x + dir * this.timer * 6, this.y, 8, 40); ctx.fillRect(this.x + dir * (this.timer * 6 + 12), this.y + 10, 6, 20);
                } else if (this.type === 'z_horz' && this.pose && this.pose.t0 && typeof dswNgangPha === 'function' && DSW_NGANG[this.pose.kind]) {
                    // @@HE-KIEMNGANG: vet chem NGANG = dai ELIP DET quanh nguc, dau dan sang trang
                    let G = dswNgangPha(this.pose);
                    let fade = G.pr < DSW_NGANG_LAY ? 0 : (G.quet ? 1 : Math.max(0, 1 - (G.pr - DSW_NGANG_HET) / 0.32));
                    if (fade > 0.01){
                        let R = (this.radius || 100), ry = R * DSW_NGANG_RY, ri = 0.5;
                        let cE = this.swordCol ? dswHexRGB(this.swordCol) : "198,208,219", cC = "255,255,255";
                        if (this.tint === 'nova' || this.tint === 'mika'){ cE = dswHexRGB(DSW_GOLD); cC = "255,250,224"; }
                        else if (this.tint === 'dark'){ cE = "60,40,90"; cC = "190,150,255"; }
                        else if (this.tint === 'set'){ cE = "79,195,247"; }
                        else if (this.tint === 'dragon'){ cE = "120,20,10"; cC = "255,138,64"; }
                        let a0 = G.phi0, a1 = G.phi, n = Math.max(3, Math.ceil(Math.abs(a1 - a0) / 0.09));
                        let P = (t, k) => [Math.cos(t) * R * k, Math.sin(t) * ry * k];
                        ctx.save(); ctx.translate(this.x + (this.isLeft ? -1 : 1) * 4, this.y - 12); if (this.isLeft) ctx.scale(-1, 1);
                        ctx.globalCompositeOperation = 'lighter';
                        for (let i = 1; i <= n; i++){
                            let t0 = a0 + (a1 - a0) * (i - 1) / n, t1 = a0 + (a1 - a0) * i / n, q = i / n;
                            let p0 = P(t0, 1), p1 = P(t1, 1), q0 = P(t0, ri + 0.25 * q), q1 = P(t1, ri + 0.25 * q);
                            ctx.fillStyle = "rgba(" + cE + "," + (0.85 * q * q * fade).toFixed(3) + ")";
                            ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.lineTo(q1[0], q1[1]); ctx.lineTo(q0[0], q0[1]); ctx.closePath(); ctx.fill();
                        }
                        // mep sac trang o vien ngoai, dam dan ve dau luoi
                        ctx.lineCap = "round";
                        for (let i = Math.floor(n * 0.35); i < n; i++){
                            let t0 = a0 + (a1 - a0) * i / n, t1 = a0 + (a1 - a0) * (i + 1) / n, q = (i + 1) / n;
                            let p0 = P(t0, 1.02), p1 = P(t1, 1.02);
                            ctx.strokeStyle = "rgba(" + cC + "," + (q * fade).toFixed(3) + ")"; ctx.lineWidth = 1 + 2.2 * q;
                            ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke();
                        }
                        ctx.restore();
                    }
                } else if ((this.type === 'z_vert' || this.type === 'z_big' || this.type === 'z_rise' || this.type === 'z_dive' || this.type === 'z_spin' || this.type === 'z_kk' || this.type === 'z_kk2')
                           && this.pose && this.pose.t0 && typeof dswAngleCat === 'function' && this.tint !== 'dragon') {
                    /* VET CHEM CHUAN KIEM — cung mot kieu voi nhat NGANG: mot dai SANG DAC quet
                       theo luoi kiem, mo dan ve phia duoi, day dan ve phia mui luoi, va mot MEP
                       TRANG SAC o vien ngoai. Khong lam mo (shadowBlur) nen doc ra "sac" chu khong
                       phai mot mang nhoe nhu ban cu. */
                    let k = this.type, fade = dswTrail(this.pose);
                    let A = DSW_ARC[k] || DSW_ARC.z_vert;
                    if (fade > 0.01){
                        let R = this.radius || 70;
                        let cE = this.swordCol ? dswHexRGB(this.swordCol) : "198,208,219", cC = "255,255,255";
                        if (this.tint === 'nova' || this.tint === 'mika'){ cE = dswHexRGB(DSW_GOLD); cC = "255,250,224"; }
                        else if (this.tint === 'dark'){ cE = "60,40,90"; cC = "190,150,255"; }
                        else if (this.tint === 'set'){ cE = "79,195,247"; }
                        let sg = A[1] >= A[0] ? 1 : -1;
                        let a1 = dswAngleCat(this.pose) - Math.PI / 2;
                        let a0 = A[0] - Math.PI / 2;
                        let tran = (k === 'z_spin') ? 3.4 : 2.5;          // duoi vet dai toi da (rad)
                        if ((a1 - a0) * sg > tran) a0 = a1 - sg * tran;
                        if ((a1 - a0) * sg > 0.04){
                            let n = Math.max(4, Math.ceil(Math.abs(a1 - a0) / 0.08));
                            ctx.save(); ctx.translate(this.x, this.y); if (this.isLeft) ctx.scale(-1, 1);
                            ctx.globalCompositeOperation = 'lighter';
                            let P = (t, k2) => [Math.cos(t) * R * k2, Math.sin(t) * R * k2];
                            for (let i = 1; i <= n; i++){
                                let t0 = a0 + (a1 - a0) * (i - 1) / n, t1 = a0 + (a1 - a0) * i / n, q = i / n;
                                let ri = 0.80 - 0.30 * q;                     // dai day dan ve phia mui luoi
                                let p0 = P(t0, 1), p1 = P(t1, 1), q0 = P(t0, ri + 0.03), q1 = P(t1, ri);
                                ctx.fillStyle = "rgba(" + cE + "," + (0.72 * q * q * fade).toFixed(3) + ")";
                                ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.lineTo(q1[0], q1[1]); ctx.lineTo(q0[0], q0[1]); ctx.closePath(); ctx.fill();
                            }
                            // loi sang mong o giua dai
                            ctx.lineCap = "round";
                            for (let i = Math.floor(n * 0.5); i < n; i++){
                                let t0 = a0 + (a1 - a0) * i / n, t1 = a0 + (a1 - a0) * (i + 1) / n, q = (i + 1) / n;
                                ctx.strokeStyle = "rgba(" + cC + "," + (0.45 * q * fade).toFixed(3) + ")"; ctx.lineWidth = 1 + 1.6 * q;
                                ctx.beginPath(); ctx.arc(0, 0, R * 0.84, Math.min(t0, t1), Math.max(t0, t1)); ctx.stroke();
                            }
                            // MEP SAC trang o vien ngoai, dam dan ve dau luoi
                            for (let i = Math.floor(n * 0.35); i < n; i++){
                                let t0 = a0 + (a1 - a0) * i / n, t1 = a0 + (a1 - a0) * (i + 1) / n, q = (i + 1) / n;
                                ctx.strokeStyle = "rgba(" + cC + "," + (q * fade).toFixed(3) + ")"; ctx.lineWidth = 1 + 2.6 * q;
                                ctx.beginPath(); ctx.arc(0, 0, R * 1.02, Math.min(t0, t1), Math.max(t0, t1)); ctx.stroke();
                            }
                            // tia loe o mui luoi khi dang quet
                            if (fade > 0.6){
                                let m = P(a1, 1.02);
                                ctx.fillStyle = "rgba(255,255,255," + (0.8 * fade).toFixed(3) + ")";
                                ctx.beginPath(); ctx.arc(m[0], m[1], 2.2 + R * 0.02, 0, 6.28); ctx.fill();
                            }
                            ctx.restore();
                        }
                    }
                } else if (this.type === 'z_vert' || this.type === 'z_horz' || this.type === 'z_big' || this.type === 'z_rise' || this.type === 'z_dive' || this.type === 'z_spin' || this.type === 'z_dash' || this.type === 'z_thrust') {
                    // ===== KIEM ANH MO: 3 dai cung bam theo dung duong ma LUOI KIEM vua quet qua =====
                    // Neu co this.pose (do _beginSlash gan vao) thi goc doc thang tu dswAngle —
                    // vet chem va cay kiem dung chung mot dong ho, khong the truot nhip.
                    let k = this.type;
                    let usePose = this.pose && this.pose.t0 && typeof dswAngle === 'function';
                    let t, ease, fade, a0, a1;
                    if (usePose) {
                        fade = dswTrail(this.pose);
                        if (fade <= 0.002) { /* chua chem hoac da thu kiem xong */ }
                    } else {
                        let dur = (k === 'z_big') ? 16 : (k === 'z_spin') ? 19 : (k === 'z_dive') ? 15 : (k === 'z_dash') ? 15 : (k === 'z_thrust') ? 13 : 11;
                        t = this.timer / dur;
                        ease = 1 - Math.pow(1 - Math.min(1, t), 2);
                        fade = Math.min(1, (1 - t) * 1.35);
                        let A = (typeof DSW_ARC !== 'undefined' && DSW_ARC[k]) ? DSW_ARC[k] : [-0.08, 2.12];
                        a0 = A[0] - Math.PI / 2; a1 = A[1] - Math.PI / 2;
                    }
                    if (fade > 0.002 && (usePose || t <= 1)) {
                        ctx.save(); ctx.translate(this.x, this.y); if (this.isLeft) ctx.scale(-1, 1);
                        if (k === 'z_dash') ctx.scale(1.85, 0.55);        // DASH CHEM: keo dai han ra theo chieu ngang
                        else if (k === 'z_thrust') ctx.scale(2.35, 0.28);  // DAM: det va dai, ra hinh mui dam
                        let R = this.radius || 70;
                        // MAU: thuong = an theo mau luoi kiem dang cam
                        //      NOVA / SWORDMASTER = chung mot bo VANG moi + vien dam giua cac dai cung
                        // BAN NHE cho vet chem PHAN THAN RONG: cung hinh dang, nhung 2 dai
                        // cung thay vi 5, 8 doan thay vi 20, va khong lam mo. Do la ~8 lan it
                        // net ve hon — do mot minh vet chem cua phan than ngon 216-648 op/khung,
                        // nhieu hon ca than + canh + vu khi cong lai.
                        let _nhe = (this.tint === 'dragon');
                        let cE = this.swordCol ? dswHexRGB(this.swordCol) : "198,208,219";
                        let cC = "255,255,255", edge = null, aMul = 1;
                        if (this.tint === 'nova' || this.tint === 'mika') {
                            cE = dswHexRGB(typeof DSW_GOLD !== 'undefined' ? DSW_GOLD : "#FFD54F");
                            cC = "255,250,224"; edge = "rgba(58,40,6,0.92)";
                        } else if (this.tint === 'dark') {
                            cE = "18,14,26"; cC = "150,110,215"; edge = "rgba(28,10,54,0.92)"; aMul = 0.9;
                        } else if (this.tint === 'set') {
                            // LUOT SET: chinh nhat chem mang dien — long lam sang, loi trang,
                            // vien xanh dam. Khong co vat the nao khac duoc sinh ra.
                            cE = "79,195,247"; cC = "255,255,255"; edge = "rgba(1,87,155,0.92)";
                        } else if (this.tint === 'dragon') {
                            // PHAN THAN RONG: y het hinh dang nhat chem cua nguoi choi, doi sang
                            // tong LUA — long den do, loi sang cam, vien than den.
                            cE = "62,6,10"; cC = "255,138,64"; edge = "rgba(70,10,0,0.92)"; aMul = 0.95;
                        }
                        // "mo hon" — de trong nhu kiem anh nhoe chu khong phai mot mang dac
                        fade *= aMul * 0.58;
                        // NAM DAI CUNG VUOT NHON — day nhat o giua, thu ve 0 o hai dau, nen ra
                        // hinh LUOI LIEM. Ban truoc la ba dai co be day khong doi nen trong nhu
                        // ba mieng bang dan chong len nhau.
                        ctx.shadowBlur = _nhe ? 0 : 12; ctx.shadowColor = "rgba(" + cE + ",0.85)";
                        const cungVuot = (rr, lo, hi, day, mau) => {
                            const NN = _nhe ? 8 : 20;
                            ctx.beginPath();
                            for (let i = 0; i <= NN; i++){
                                let u = i / NN, th = lo + (hi - lo) * u;
                                let d = day * Math.sqrt(Math.max(0, 1 - Math.pow(u * 2 - 1, 2)));
                                ctx.lineTo(Math.cos(th) * (rr + d), Math.sin(th) * (rr + d));
                            }
                            for (let i = NN; i >= 0; i--){
                                let u = i / NN, th = lo + (hi - lo) * u;
                                let d = day * Math.sqrt(Math.max(0, 1 - Math.pow(u * 2 - 1, 2)));
                                let ri = Math.max(1, rr - d);
                                ctx.lineTo(Math.cos(th) * ri, Math.sin(th) * ri);
                            }
                            ctx.closePath(); ctx.fillStyle = mau; ctx.fill();
                        };
                        let loDau = null, hiDau = null, rDau = R;
                        for (let n = 0; n < (_nhe ? 2 : 5); n++) {
                            let rr = R * (1 - n * 0.105);
                            let lo, hi;
                            if (usePose) {
                                let lead = dswAngleCat({ kind: this.pose.kind, t0: this.pose.t0, from: this.pose.from,
                                                      t: this.pose.t + n * 1.7 }) - Math.PI / 2;
                                let tail = dswAngleCat({ kind: this.pose.kind, t0: this.pose.t0, from: this.pose.from,
                                                      t: this.pose.t + n * 1.7 + 5.5 }) - Math.PI / 2;
                                lo = Math.min(lead, tail); hi = Math.max(lead, tail);
                                // @@HE-KIEMNGANG: chi ve phan nam TRONG cung chem — duoi vet khong duoc
                                // lan sang cu lay da (vung nguoc len qua dau) hay cu thu kiem
                                let _A = DSW_ARC[k];
                                if (_A && k !== 'z_spin'){ lo = Math.max(lo, Math.min(_A[0], _A[1]) - Math.PI / 2); hi = Math.min(hi, Math.max(_A[0], _A[1]) - Math.PI / 2); }
                            } else {
                                let lag = n * 0.062;
                                let c2 = a0 + (a1 - a0) * Math.max(0, ease - lag);
                                let t2 = a0 + (a1 - a0) * Math.max(0, ease - lag - 0.44);
                                lo = Math.min(t2, c2); hi = Math.max(t2, c2);
                            }
                            if (hi - lo < 0.03) continue;
                            if (loDau === null){ loDau = lo; hiDau = hi; rDau = rr; }
                            let f = fade * (1 - n * 0.15);
                            cungVuot(rr, lo, hi, rr * 0.185 * (1 - n * 0.13), "rgba(" + cE + "," + (f * 0.95) + ")");
                            if (edge && n === 0){ ctx.strokeStyle = edge; ctx.lineWidth = 1.4;
                                                  ctx.globalAlpha = f * 1.4; ctx.stroke(); ctx.globalAlpha = 1; }
                            cungVuot(rr, lo, hi, rr * 0.062, "rgba(" + cC + "," + f + ")");
                        }
                        // MEP DAN DAU sang trang — cho nhat chem co mot cai LUOI thay vi chi la
                        // mot mang mo. Day la thu lam no doc ra "sac" thay vi "nhoe".
                        if (loDau !== null){
                            ctx.shadowBlur = 16; ctx.shadowColor = "rgba(" + cC + ",0.95)";
                            ctx.strokeStyle = "rgba(255,255,255," + Math.min(1, fade * 1.9) + ")";
                            ctx.lineWidth = Math.max(1.6, R * 0.028); ctx.lineCap = "round";
                            ctx.beginPath(); ctx.arc(0, 0, rDau * 1.055, loDau, hiDau); ctx.stroke();
                        }
                        ctx.shadowBlur = 0;
                        ctx.restore();
                    }
                } else if (this.type === 'claw' || this.type === 'claw_big') {
                    let bigC = this.type === 'claw_big';
                    let dur = bigC ? 18 : 12;
                    let progC = this.timer / dur;
                    if (progC <= 1) {
                        ctx.save(); ctx.translate(this.x, this.y); if (this.isLeft) ctx.scale(-1, 1);
                        // 3 mong vuot CONG BAN NGUYET, to hon han ban cu
                        // R = ban kinh cung; cung mo rong theo quang duong luot (radius truyen vao)
                        let R = (bigC ? 105 : 58) + (this.radius || 0) * 0.5;
                        let gap = bigC ? 24 : 16;          // khoang cach giua 3 mong
                        let spreadAng = 0.62;               // do mo cua moi cung (radian, ~71 do)
                        ctx.lineCap = "round";
                        for (let k = -1; k <= 1; k++) {
                            let localProg = Math.min(1, Math.max(0, (this.timer - (k + 1) * 1.3) / dur));
                            if (localProg <= 0) continue;
                            let alpha = 1 - localProg;
                            // tam cung dat lech sang trai; cung ve ben phai tao hinh luoi liem
                            let cx = -R * 0.55;
                            let cy = k * gap;
                            let a0 = -spreadAng, a1 = spreadAng;
                            // Vien mau ben ngoai (day hon)
                            ctx.strokeStyle = "rgba(" + (bigC ? "255,235,59" : "0,229,255") + "," + (alpha * 0.85) + ")";
                            ctx.lineWidth = bigC ? 9 : 6;
                            ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.stroke();
                            // Loi trang o giua (manh hon, sang hon)
                            ctx.strokeStyle = "rgba(255,255,255," + alpha + ")";
                            ctx.lineWidth = bigC ? 4.5 : 3;
                            ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.stroke();
                        }
                        ctx.restore();
                    }
                } else if (this.type === 'laser_kill') {
                    ctx.fillStyle = "#FF1744"; ctx.fillRect(0, this.y, this.x, 32);
                    ctx.fillStyle = "white"; ctx.fillRect(0, this.y + 8, this.x, 16);
                } else if (this.type === 'explosion') {
                    let r = this.radius > 0 ? this.radius * (this.timer/20) : this.timer * 10;
                    ctx.beginPath(); ctx.arc(this.x, this.y, r, 0, Math.PI*2);
                    ctx.fillStyle = `rgba(255, 69, 0, ${1 - this.timer/30})`; ctx.fill();
                    ctx.beginPath(); ctx.arc(this.x, this.y, r * 0.6, 0, Math.PI*2);
                    ctx.fillStyle = `rgba(255, 255, 0, ${1 - this.timer/30})`; ctx.fill();
                } else if (this.type === 'body_slam_shockwave') {
                    // Song xung kich nam sat mat dat: radius trung khop voi vung gay sat thuong.
                    const progress = Math.min(1, this.timer / 18);
                    const radius = (this.radius || 40) * progress;
                    const alpha = Math.max(0, 1 - this.timer / 28);
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.scale(1, 0.42);
                    ctx.shadowBlur = 14; ctx.shadowColor = '#FFD600';
                    ctx.strokeStyle = `rgba(255, 193, 7, ${alpha})`; ctx.lineWidth = 5;
                    ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.stroke();
                    ctx.shadowBlur = 0;
                    ctx.strokeStyle = `rgba(255, 249, 196, ${alpha * 0.95})`; ctx.lineWidth = 1.8;
                    ctx.beginPath(); ctx.arc(0, 0, Math.max(0, radius - 6), 0, Math.PI * 2); ctx.stroke();
                    ctx.restore();
                } else if (this.type === 'exp_blue') {
                    let r = this.radius > 0 ? this.radius * (this.timer/20) : this.timer * 10;
                    ctx.beginPath(); ctx.arc(this.x, this.y, r, 0, Math.PI*2); ctx.fillStyle = `rgba(41, 121, 255, ${1 - this.timer/30})`; ctx.fill();
                    ctx.beginPath(); ctx.arc(this.x, this.y, r*0.6, 0, Math.PI*2); ctx.fillStyle = `rgba(130, 177, 255, ${1 - this.timer/30})`; ctx.fill();
                    ctx.beginPath(); ctx.arc(this.x, this.y, r*0.3, 0, Math.PI*2); ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.timer/30})`; ctx.fill();
                } else if (this.type === 'lightning_shock') {
                    ctx.strokeStyle = "#00E5FF"; ctx.lineWidth = 2;
                    for(let i=0; i<4; i++) {
                        let ang = Math.random() * Math.PI * 2;
                        let len = Math.random() * 20 + 10;
                        ctx.beginPath(); ctx.moveTo(this.x, this.y); ctx.lineTo(this.x + Math.cos(ang)*len, this.y + Math.sin(ang)*len); ctx.stroke();
                    }
                } else if (this.type === 'lightning_burst') {
                    let scale = this.radius > 0 ? this.radius : 0.5;
                    ctx.beginPath(); ctx.arc(this.x, this.y, this.timer * 8 * scale, 0, Math.PI*2);
                    ctx.strokeStyle = `rgba(0, 229, 255, ${1 - this.timer/30})`; ctx.lineWidth = 4 * scale; ctx.stroke();
                    ctx.fillStyle = `rgba(0, 229, 255, ${0.3 - this.timer/100})`; ctx.fill();
                    
                    ctx.strokeStyle = "#FFF"; ctx.lineWidth = 3 * scale;
                    for(let i=0; i<8; i++) {
                        let ang = Math.random() * Math.PI * 2;
                        let len = (Math.random() * 60 + 20) * scale;
                        ctx.beginPath(); ctx.moveTo(this.x, this.y);
                        ctx.lineTo(this.x + Math.cos(ang)*len, this.y + Math.sin(ang)*len);
                        ctx.stroke();
                    }
                }
            }
        }
// PLAYER_PART_END s2.Effect.1

// index.html:46051 · Phạm vi: global
// PLAYER_PART_BEGIN s2.FloatingText.1 EDITABLE
class FloatingText {
            constructor(x, y, text) { this.x = x; this.y = y; this.text = text; this.life = 60; }
            draw() {
                const isCritical = this.text.startsWith('CRITICAL');
                ctx.fillStyle = isCritical ? `rgba(220, 40, 40, ${this.life/60})` : `rgba(255, 215, 0, ${this.life/60})`;
                ctx.font = "bold 18px Consolas, monospace";
                ctx.fillText(isCritical ? `💥 ${this.text}` : this.text, this.x, this.y);
            }
            update() { this.y -= 1; this.life--; }
        }
// PLAYER_PART_END s2.FloatingText.1
