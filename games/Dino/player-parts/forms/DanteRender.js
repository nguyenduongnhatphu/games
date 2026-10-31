// PLAYER_FILE: DanteRender
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: DT_ARMS, DT_H, DT_SWITCH, DT_W, canvas, ctx, frames
// index.html:106228 · Phạm vi: global
// PLAYER_PART_BEGIN s12.DantePlayerRig.1 EDITABLE
class DantePlayerRig {
            constructor(level){
                this.name = "DANTE"; this.hp = 134; this.maxHp = 134;
                this.w = DT_W; this.h = DT_H; this.baseY = 320 - this.h;
                this.x = canvas.width - 200; this.y = this.baseY; this.dy = 0; this.grounded = true;
                this.state = 'entering'; this.subTimer = 0; this.actionTimer = 50; this.facingLeft = true;
                this.retState = 'idle'; this.lastSkill = ''; this.atkBag = []; this.invulnAll = false;
                this.burnTimer = 0; this.lastMeleeHit = -1; this.phase = 1; this._bag = null;
                this.dtStage = 1; this.chain = 0; this.chuoi = []; this.styleFx = 0; this.phantoms = []; this.tauntCd = 240; this.tauntHp = 0; this.jabs = 0;
                this.arms = 0; this.cycle = []; this.switchT = DT_SWITCH; this.hpAtSwitch = this.hp;
                this.armR = 0; this.armL = 0; this.drawn = false; this.cerb = 0;
                this.slash = null; this.tel = null; this.combo = 0; this.morph = 0;
                this.dashV = 0; this.ghosts = []; this.walk = 0;
                this.rg = 0; this.rgCd = 0; this.rgCharge = 0; this.rgDiem = 100;
                this.bike = null; this.hat = null; this.spikes = []; this.orbs = [];
                this.swords = []; this.fly = 0; this.hover = 0; this.wing = 0; this.beam = null;
                this._hb = false; this._dv = false; this._qt = 0; this._qy = 0;
                this.aiRieng = true; this.styleP = 0; this.trickCd = 90; this.trungLuc = -999; this.trungMove = '';
                this.noiThem = 0; this.breakCd = 120; this.dmgLog = []; this._hpTruoc = this.hp; this.neT = 0; this.gunT = 0;
                this._riPillar = 0; this._revSpin = 0; this._demoZones = [];
            }
}
// PLAYER_PART_END s12.DantePlayerRig.1

// index.html:106251 · Phạm vi: global
// PLAYER_PART_BEGIN s12.drawDantePlayerBody.1 EDITABLE
function drawDantePlayerBody(b, x, y){
            let dr = b.facingLeft ? -1 : 1, cxb = x + DT_W/2;
            let arm = (b.arms !== undefined) ? b.arms : 0, A = DT_ARMS[arm] || DT_ARMS[0];
            let walkCycle = Math.sin((b.walk || 0) * 0.18) * 3.5;
            let sway = Math.sin(frames * 0.065) * 2.2 + (b.dashV ? -Math.abs(b.dashV) * 0.45 : 0);

            ctx.save();
            ctx.globalAlpha*=1-(b._trickPhase||0)*.7;
            ctx.translate(cxb, y + 32);
            ctx.scale(dr * (b._swordTurn === undefined ? 1 : b._swordTurn), 1);
            ctx.rotate((b._swordLean || 0)+(b._gunRoll || 0));
            ctx.translate(-cxb, -y - 32);

            // 1. KIEM DEVIL SWORD DANTE SAU LUNG (khi chua rut hoac dang cam vu khi khac)
            if (!b._swordCustom && (!b.drawn || (arm !== 0 && arm !== 2))){
                ctx.save(); ctx.translate(cxb - 6, y + 18); ctx.rotate(0.48);
                ctx.fillStyle = "#263238";
                ctx.beginPath(); ctx.moveTo(-5, -34); ctx.lineTo(5, -34); ctx.lineTo(3, 18); ctx.lineTo(0, 26); ctx.lineTo(-3, 18); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#E53935"; ctx.fillRect(-1, -30, 2, 42);
                ctx.fillStyle = "#455A64";
                ctx.beginPath(); ctx.moveTo(-9, -32); ctx.lineTo(9, -32); ctx.lineTo(5, -37); ctx.lineTo(-5, -37); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#3E2723"; ctx.fillRect(-2.5, -45, 5, 9);
                ctx.restore();
            }

            // 2. TA AO KHOAC DO BAY PHAP PHOI (2 lop vat ao rach bui bam)
            let coatFlap = sway + (b._swordLean ? -b._swordLean * 18 : 0);
            ctx.fillStyle = "#5F0909";
            ctx.beginPath();
            ctx.moveTo(cxb - 12, y + 24);
            ctx.quadraticCurveTo(cxb - 34 + coatFlap * 2.2, y + 42, cxb - 30 + coatFlap * 3.2, y + DT_H - 1);
            ctx.lineTo(cxb - 18 + coatFlap * 2, y + DT_H - 6);
            ctx.lineTo(cxb - 10 + coatFlap * 1.5, y + DT_H);
            ctx.lineTo(cxb - 1, y + DT_H - 5);
            ctx.lineTo(cxb - 2, y + 24);
            ctx.closePath(); ctx.fill();

            ctx.fillStyle = "#8E1414";
            ctx.beginPath();
            ctx.moveTo(cxb - 11, y + 26);
            ctx.quadraticCurveTo(cxb - 25 + coatFlap * 1.6, y + 43, cxb - 21 + coatFlap * 2.4, y + DT_H - 3);
            ctx.lineTo(cxb - 4, y + DT_H - 6);
            ctx.lineTo(cxb - 3, y + 26);
            ctx.closePath(); ctx.fill();

            // 3. CHAN + GIAY BOOTS + GIAP CHAN BALROG
            let lOff = (!b.grounded) ? -3 : walkCycle, rOff = (!b.grounded) ? 2 : -walkCycle;
            let lunge = (b._swordLunge || 0);
            if(b._faustLegs){
                const pose=b._faustLegs,spread=pose.mode==='dash'?15:pose.mode==='cast'?10:8+pose.t*8;
                ctx.strokeStyle='#242530';ctx.lineWidth=8;ctx.lineCap='round';
                for(const side of [-1,1]){ctx.beginPath();ctx.moveTo(cxb+side*5,y+39);ctx.lineTo(cxb+side*spread,y+47);ctx.lineTo(cxb+side*(spread+3),y+56);ctx.stroke();ctx.fillStyle='#101116';ctx.fillRect(cxb+side*(spread+3)-4,y+55,side>0?14:10,5);}
            }else if(b._cavRide > .3){
                ctx.strokeStyle="#252531";ctx.lineWidth=8;ctx.lineCap="round";
                for(let side of [-1,1]){ctx.beginPath();ctx.moveTo(cxb+side*5,y+40);ctx.lineTo(cxb+side*13+5,y+43);ctx.lineTo(cxb+side*12,y+51);ctx.stroke();ctx.fillStyle="#111219";ctx.fillRect(cxb+side*12-3,y+49,11,5);}
            }else{
            ctx.fillStyle = "#21212B";
            ctx.fillRect(cxb - 10 - lunge * 0.4, y + 40, 8, 15 + lOff * 0.3);
            ctx.fillRect(cxb + 2 + lunge * 0.5, y + 40, 8, 15 + rOff * 0.3);
            ctx.fillStyle = "#373746";
            ctx.fillRect(cxb - 9 - lunge * 0.4, y + 44, 6, 4);
            ctx.fillRect(cxb + 3 + lunge * 0.5, y + 44, 6, 4);
            if (arm === 1){
                ctx.fillStyle = "#FF6D00";
                ctx.fillRect(cxb - 12 - lunge * 0.4, y + DT_H - 9, 11, 9);
                ctx.fillRect(cxb + 1 + lunge * 0.5, y + DT_H - 9, 11, 9);
                ctx.fillStyle = "#FFD54F";
                ctx.fillRect(cxb - 10 - lunge * 0.4, y + DT_H - 7, 7, 3);
                ctx.fillRect(cxb + 3 + lunge * 0.5, y + DT_H - 7, 7, 3);
            } else {
                ctx.fillStyle = "#121217";
                ctx.fillRect(cxb - 12 - lunge * 0.4, y + DT_H - 6, 11, 6);
                ctx.fillRect(cxb + 1 + lunge * 0.5, y + DT_H - 6, 11, 6);
                ctx.fillStyle = "#78909C";
                ctx.fillRect(cxb - 5 - lunge * 0.4, y + DT_H - 5, 3, 2);
                ctx.fillRect(cxb + 8 + lunge * 0.5, y + DT_H - 5, 3, 2);
            }

                        }
            // 4. THAN AO TRONG (Henley den xam + day dai nguc + that lung)
            ctx.fillStyle = "#1A1B24"; ctx.fillRect(cxb - 9, y + 15, 18, 27);
            ctx.fillStyle = "#2C2E3B"; ctx.fillRect(cxb - 4, y + 16, 8, 24);
            ctx.fillStyle = "#D7B18A";
            ctx.beginPath(); ctx.moveTo(cxb - 3, y + 15); ctx.lineTo(cxb + 3, y + 15); ctx.lineTo(cxb, y + 20); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = "#3E2723"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cxb - 8, y + 16); ctx.lineTo(cxb + 8, y + 34); ctx.stroke();
            ctx.fillStyle = "#CFD8DC"; ctx.fillRect(cxb - 2, y + 23, 4, 4);
            ctx.fillStyle = "#3E2723"; ctx.fillRect(cxb - 10, y + 39, 20, 3);
            ctx.fillStyle = "#FFD54F"; ctx.fillRect(cxb - 2, y + 38.5, 5, 4);

            // 5. AO KHOAC DO TRENCHCOAT
            ctx.fillStyle = "#B71C1C";
            ctx.beginPath();
            ctx.moveTo(cxb - 13, y + 14); ctx.lineTo(cxb - 5, y + 15);
            ctx.lineTo(cxb - 6, y + 45); ctx.lineTo(cxb - 15, y + 45);
            ctx.closePath(); ctx.fill();
            ctx.beginPath();
            ctx.moveTo(cxb + 5, y + 15); ctx.lineTo(cxb + 13, y + 14);
            ctx.lineTo(cxb + 15, y + 45); ctx.lineTo(cxb + 6, y + 45);
            ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#E53935";
            ctx.fillRect(cxb - 7, y + 16, 2, 26); ctx.fillRect(cxb + 5, y + 16, 2, 26);
            ctx.fillStyle = "#ECEFF1";
            for (let k = 0; k < 3; k++){
                ctx.fillRect(cxb - 9, y + 20 + k * 7, 1.5, 1.5);
                ctx.fillRect(cxb + 7.5, y + 20 + k * 7, 1.5, 1.5);
            }
            ctx.fillStyle = "#C62828";
            ctx.beginPath();
            ctx.moveTo(cxb - 12, y + 16); ctx.lineTo(cxb - 9, y + 9); ctx.lineTo(cxb + 9, y + 9); ctx.lineTo(cxb + 12, y + 16);
            ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#D32F2F"; ctx.fillRect(cxb - 16, y + 13, 32, 5);
            ctx.fillStyle = "#FFCDD2"; ctx.fillRect(cxb - 15, y + 13, 8, 1.5); ctx.fillRect(cxb + 7, y + 13, 8, 1.5);

            if (arm === 5){
                ctx.save();
                ctx.shadowColor = "#FF1744"; ctx.shadowBlur = 10;
                ctx.strokeStyle = "#FF1744"; ctx.lineWidth = 4; ctx.lineCap = "round";
                ctx.beginPath();
                ctx.moveTo(cxb - 8, y + 15);
                ctx.quadraticCurveTo(cxb + 2, y + 20, cxb + 10, y + 15);
                ctx.quadraticCurveTo(cxb - 22 + sway * 3, y + 26, cxb - 34 + sway * 4, y + 42);
                ctx.stroke();
                ctx.restore();
            }

            // 6. TAY TRAI (Tay sau — Tạo thế cân bằng khi vung kiếm)
            let ar = b.armR || 0, al = b.armL || (b._swordBackArm || 0.25);
            if (b.stab > 0) ar = -1.55 + (Math.random() - 0.5) * 0.25;
            if(![1,2,3,4,5].includes(arm)){
            ctx.save(); ctx.translate(cxb - 13, y + 19); ctx.rotate(al);
            ctx.fillStyle = "#8E1B1B"; ctx.fillRect(-3.5, 0, 7, 13);
            ctx.fillStyle = "#263238"; ctx.fillRect(-4, 11, 8, 3);
            ctx.fillStyle = (arm === 1) ? "#FF6D00" : "#1C1C24"; ctx.fillRect(-3.5, 14, 7, 5);
            if (b.drawn && arm === 4){
                ctx.translate(0, 17); ctx.rotate(-1.1);
                ctx.fillStyle = "#212121"; ctx.fillRect(-2.5, -14, 5, 13);
                ctx.fillStyle = "#FFD54F"; ctx.fillRect(-1.5, -13, 2, 10);
            }
            ctx.restore();
            }

            // 7. DAU + KHUON MAT + TOC BAC DANTE DMC5
            ctx.fillStyle = "#E8C9A0"; ctx.fillRect(cxb - 7, y + 2, 14, 13);
            ctx.fillStyle = "#C5A37E"; ctx.fillRect(cxb - 6, y + 12, 12, 3);
            ctx.fillStyle = "#B0BEC5"; ctx.fillRect(cxb - 6, y + 6, 4, 1.2); ctx.fillRect(cxb + 1, y + 6, 5, 1.2);
            ctx.fillStyle = "#29B6F6"; ctx.fillRect(cxb + 1.5, y + 7.5, 4, 2.2); ctx.fillRect(cxb - 5.5, y + 7.5, 3, 2.2);
            ctx.fillStyle = "#FFFFFF"; ctx.fillRect(cxb + 3, y + 7.5, 1.5, 1.2);
            let hairSway = sway * 0.45;
            ctx.fillStyle = "#CFD8DC";
            ctx.beginPath();
            ctx.moveTo(cxb - 11, y + 11); ctx.lineTo(cxb - 12 + hairSway, y + 2);
            ctx.lineTo(cxb - 7 + hairSway, y - 5); ctx.lineTo(cxb + 2, y - 6);
            ctx.lineTo(cxb + 10, y - 2); ctx.lineTo(cxb + 11, y + 8);
            ctx.closePath(); ctx.fill();

            ctx.fillStyle = "#F5F7FA";
            ctx.beginPath();
            ctx.moveTo(cxb - 9, y + 8);
            ctx.lineTo(cxb - 10 + hairSway, y - 2);
            ctx.lineTo(cxb - 4 + hairSway, y - 7);
            ctx.lineTo(cxb + 1, y - 3);
            ctx.lineTo(cxb + 5, y - 7);
            ctx.lineTo(cxb + 10, y - 2);
            ctx.lineTo(cxb + 9, y + 7);
            ctx.lineTo(cxb + 6, y + 4);
            ctx.lineTo(cxb + 3, y + 9);
            ctx.lineTo(cxb, y + 4);
            ctx.lineTo(cxb - 4, y + 8);
            ctx.closePath(); ctx.fill();

            if (arm === 5 && !b.hat){
                ctx.save(); ctx.translate(cxb, y - 1);
                ctx.fillStyle = "#3E0A0A"; ctx.fillRect(-15, 0, 30, 3.5);
                ctx.fillStyle = "#8E1414";
                ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(10, 0); ctx.lineTo(6, -11); ctx.lineTo(-4, -9); ctx.closePath(); ctx.fill();
                ctx.fillStyle = "#FF1744"; ctx.fillRect(-9, -2.5, 18, 2);
                ctx.restore();
            }

            // 8. TAY PHAI + VU KHI KHAC (Khi khong o che do Sword Custom)
            let stabOffset = (b.stab || 0) * 10;
            if (!b._swordCustom){
                ctx.save(); ctx.translate(cxb + 12 + stabOffset, y + 19); ctx.rotate(ar);
                ctx.fillStyle = "#A31515"; ctx.fillRect(-3.5, 0, 7, 13);
                ctx.fillStyle = "#263238"; ctx.fillRect(-4, 11, 8, 3);
                ctx.fillStyle = (arm === 1) ? "#FF6D00" : "#1C1C24"; ctx.fillRect(-3.5, 14, 7, 5);

                if (b.drawn){
                    ctx.save();
                    ctx.translate(0, 17); ctx.rotate(-1.05);
                    ctx.shadowColor = A.c; ctx.shadowBlur = 12;

                    if (arm === 0){
                        ctx.fillStyle = "#263238"; ctx.fillRect(-2.5, 0, 5, 12);
                        ctx.fillStyle = "#B71C1C"; ctx.beginPath(); ctx.arc(0, 13, 3.5, 0, 6.28); ctx.fill();
                        ctx.fillStyle = "#37474F";
                        ctx.beginPath();
                        ctx.moveTo(-11, -5); ctx.lineTo(-3, 2); ctx.lineTo(3, 2); ctx.lineTo(11, -5);
                        ctx.lineTo(6, -9); ctx.lineTo(-6, -9); ctx.closePath(); ctx.fill();
                        ctx.fillStyle = "#90A4AE";
                        ctx.beginPath();
                        ctx.moveTo(-6, -8); ctx.lineTo(-8, -28); ctx.lineTo(-5.5, -56);
                        ctx.lineTo(0, -68);
                        ctx.lineTo(5.5, -56); ctx.lineTo(8, -28); ctx.lineTo(6, -8);
                        ctx.closePath(); ctx.fill();
                        ctx.fillStyle = "#263238";
                        ctx.beginPath(); ctx.moveTo(-3.5, -8); ctx.lineTo(0, -62); ctx.lineTo(3.5, -8); ctx.closePath(); ctx.fill();
                        ctx.fillStyle = "#FF1744"; ctx.fillRect(-1.5, -58, 3, 50);
                        ctx.fillStyle = "#FFFFFF"; ctx.fillRect(-0.6, -54, 1.2, 44);
                    } else if (arm === 1){
                        ctx.fillStyle = "#263238";
                        ctx.beginPath(); ctx.moveTo(-8, -16); ctx.lineTo(8, -16); ctx.lineTo(10, 4); ctx.lineTo(-10, 4); ctx.closePath(); ctx.fill();
                        ctx.fillStyle = "#FF6D00"; ctx.fillRect(-7, -13, 14, 4); ctx.fillRect(-6, -6, 12, 3);
                        ctx.fillStyle = "#FFD54F"; ctx.fillRect(-5, -12, 10, 2);
                        for (let k = 0; k < 5; k++){
                            ctx.fillStyle = k % 2 ? "#FFEA00" : "#FF3D00";
                            ctx.beginPath(); ctx.arc((Math.random() - 0.5) * 16, -16 - Math.random() * 14, 2.5 + Math.random()*2, 0, 6.28); ctx.fill();
                        }
                    } else if (arm === 2){
                        ctx.fillStyle = "#37474F"; ctx.fillRect(-6, -36, 12, 36);
                        ctx.fillStyle = "#FF6D00"; ctx.fillRect(-2, -32, 4, 24);
                        ctx.save(); ctx.translate(0, -42); ctx.rotate(frames * 0.55);
                        ctx.fillStyle = "#263238"; ctx.beginPath(); ctx.arc(0, 0, 15, 0, 6.28); ctx.fill();
                        ctx.strokeStyle = "#ECEFF1"; ctx.lineWidth = 2.5;
                        for (let k = 0; k < 8; k++){
                            let a2 = k * 0.785;
                            ctx.beginPath(); ctx.moveTo(Math.cos(a2)*9, Math.sin(a2)*9); ctx.lineTo(Math.cos(a2)*18, Math.sin(a2)*18); ctx.stroke();
                        }
                        ctx.strokeStyle = "#40C4FF"; ctx.lineWidth = 2;
                        ctx.beginPath(); ctx.arc(0, 0, 11, 0, 6.28); ctx.stroke();
                        ctx.restore();
                    } else if (arm === 3){
                        let cCol = ["#FF5722", "#FFEA00", "#00E5FF"][(b.cerb || 0) % 3];
                        ctx.shadowColor = cCol;
                        ctx.strokeStyle = "#37474F"; ctx.lineWidth = 6; ctx.lineCap = "round";
                        ctx.beginPath(); ctx.moveTo(0, 4); ctx.lineTo(0, -24); ctx.stroke();
                        ctx.strokeStyle = cCol; ctx.lineWidth = 2;
                        ctx.beginPath(); ctx.moveTo(0, 2); ctx.lineTo(0, -22); ctx.stroke();
                        let swing = Math.sin(frames * 0.35) * 10;
                        ctx.strokeStyle = "#FFF"; ctx.lineWidth = 1.5;
                        ctx.beginPath(); ctx.moveTo(0, -24); ctx.lineTo(8 + swing, -46); ctx.moveTo(0, -24); ctx.lineTo(-8 - swing*0.7, -42); ctx.stroke();
                        ctx.strokeStyle = cCol; ctx.lineWidth = 5;
                        ctx.beginPath(); ctx.moveTo(3 + swing*0.4, -30); ctx.lineTo(12 + swing, -52); ctx.stroke();
                        ctx.beginPath(); ctx.moveTo(-3 - swing*0.3, -28); ctx.lineTo(-11 - swing*0.8, -48); ctx.stroke();
                    } else if (arm === 4){
                        ctx.fillStyle = "#CFD8DC"; ctx.fillRect(-3, -22, 6, 18);
                        ctx.fillStyle = "#5D4037"; ctx.fillRect(-3, -6, 5, 8);
                        ctx.fillStyle = "#FFFFFF"; ctx.fillRect(-2, -21, 3, 15);
                        ctx.fillStyle = "#FFD54F"; ctx.fillRect(-1, -22, 2, 3);
                    } else {
                        ctx.fillStyle = "#B71C1C";
                        ctx.beginPath(); ctx.moveTo(-16, 0); ctx.lineTo(16, 0); ctx.lineTo(4, -28); ctx.closePath(); ctx.fill();
                        ctx.fillStyle = "#3E0A0A"; ctx.fillRect(-18, -3, 36, 4);
                        for (let k = 0; k < 3; k++){
                            let oa = frames * 0.18 + k * 2.09;
                            ctx.fillStyle = "#FF1744";
                            ctx.beginPath(); ctx.arc(Math.cos(oa)*14, -14 + Math.sin(oa)*6, 3, 0, 6.28); ctx.fill();
                        }
                    }
                    ctx.restore();
                }
                ctx.restore();
            }
            ctx.restore();
        }
// PLAYER_PART_END s12.drawDantePlayerBody.1

// index.html:106518 · Phạm vi: global
// PLAYER_PART_BEGIN s12.drawDantePlayerDtOverlay.1 EDITABLE
function drawDantePlayerDtOverlay(b, x, y){
            let dr = b.facingLeft ? -1 : 1, W = 52, H = 76, cxb = x + W/2;
            let pu = 0.5 + 0.5 * Math.sin(frames * 0.14);
            ctx.save();
            ctx.translate(cxb, y); ctx.scale(dr, 1); ctx.translate(-cxb, -y);
            ctx.globalAlpha = 0.62 + 0.18 * pu;
            for (let lay = 0; lay < 2; lay++){
                ctx.fillStyle = lay === 0 ? "#4A0707" : "#D50000";
                let e = lay === 0 ? 7 : 0;
                for (let sg = -1; sg <= 1; sg += 2){
                    ctx.beginPath();
                    ctx.moveTo(cxb, y + 20 - e);
                    ctx.quadraticCurveTo(cxb + sg*(44 + e + pu*7), y - 10 - e, cxb + sg*(28 + e), y + 48 + e);
                    ctx.quadraticCurveTo(cxb + sg*(18 + e), y + 26, cxb, y + 20 - e);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 0.32 + 0.12 * pu;
            ctx.fillStyle = "#FF1744";
            ctx.fillRect(x + 12, y + 14, W - 24, H - 30);
            ctx.beginPath(); ctx.ellipse(cxb, y + 12, 13, 14, 0, 0, 6.28); ctx.fill();
            ctx.globalAlpha = 0.95;
            ctx.fillStyle = "#260E0C"; ctx.strokeStyle = "#FF5252"; ctx.lineWidth = 1.2;
            for (let sg = -1; sg <= 1; sg += 2){
                ctx.beginPath();
                ctx.moveTo(cxb + sg*7, y + 4);
                ctx.quadraticCurveTo(cxb + sg*20, y - 7, cxb + sg*16, y - 18);
                ctx.quadraticCurveTo(cxb + sg*11, y - 6, cxb + sg*4, y + 3);
                ctx.closePath(); ctx.fill(); ctx.stroke();
            }
            ctx.globalAlpha = 0.9 + 0.1 * pu;
            ctx.fillStyle = "#FFEA00";
            ctx.fillRect(cxb - 8, y + 8, 6, 3); ctx.fillRect(cxb + 3, y + 8, 6, 3);
            ctx.strokeStyle = "#FF9100"; ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let k = 0; k < 3; k++){
                let lx = cxb + (Math.random() - 0.5) * 32, ly = y + 10 + Math.random() * 50;
                ctx.moveTo(lx, ly); ctx.lineTo(lx + (Math.random() - 0.5) * 14, ly - 12);
            }
            ctx.stroke();
            ctx.restore();
        }
// PLAYER_PART_END s12.drawDantePlayerDtOverlay.1
