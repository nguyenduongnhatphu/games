// PLAYER_FILE: ApexRender01
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: afterimages, apexColor, ctx, dino, floatingTexts, platforms, projectiles
// index.html:101542 · Phạm vi: apexCreate
function __Part0(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.computeSkeletalRig.1 EDITABLE
function computeSkeletalRig(c, d, walkCycle, breathCycle, recoil, headPitch, vy, isGrounded) {
            const w = dino.wallSlideBlend;
            const l = dino.ledgeBlend;
            const m = dino.meleeBlend;
            const climb = dino.isLedgeClimbing ? Math.sin(dino.ledgeClimbProgress * Math.PI) : 0;
            const lookAwayFactor = l * Math.max(0, -dino.ledgeLookBlend * dino.ledgeSide);

            // Chuyển động nhấp nhô mượt theo moveBlend thay vì ngắt đột ngột
            const bounceY = Math.abs(Math.sin(walkCycle)) * -6.2 * dino.moveBlend * (1 - d * 0.85)
                + Math.sin(breathCycle) * 2.1 * (1 - dino.moveBlend * 0.6) * (1 - d * 0.8);

            // Tính toán độ vươn người khi Cận Chiến (Combo Cào, Cắn Xé, Cúi Kẹp Cắn, Lốc Đuôi, Cá Sấu Xoay)
            let meleeSpinePitch = 0;
            let meleeForwardLunge = 0;
            let meleeHeadThrust = 0;
            if (dino.meleeState !== 'none') {
                const progress = 1 - dino.meleeTimer / Math.max(1, dino.meleeMaxTimer);
                const swingWave = Math.sin(progress * Math.PI);
                if (dino.meleeState === 'claw1' || dino.meleeState === 'air_slash') {
                    meleeSpinePitch = 0.28 * swingWave;
                    meleeForwardLunge = 14 * swingWave;
                } else if (dino.meleeState === 'claw2') {
                    meleeSpinePitch = -0.22 * swingWave;
                    meleeForwardLunge = 12 * swingWave;
                } else if (dino.meleeState === 'claw3_retreat') {
                    meleeSpinePitch = 0.18 * swingWave;
                    meleeForwardLunge = -10 * swingWave;
                } else if (dino.meleeState === 'claw4_reengage') {
                    meleeSpinePitch = 0.36 * swingWave;
                    meleeForwardLunge = 22 * swingWave;
                } else if (dino.meleeState === 'bite_charge') {
                    meleeSpinePitch = -0.22;
                    meleeForwardLunge = -8;
                    meleeHeadThrust = -6;
                } else if (dino.meleeState === 'bite_lunge') {
                    // Vươn dài cổ và đầu về phía trước hướng cắn để khớp hoàn hảo với Hàm Năng Lượng phía trước mõm
                    meleeSpinePitch = 0.32 * swingWave;
                    meleeForwardLunge = 28 * swingWave;
                    meleeHeadThrust = 34 * swingWave;
                } else if (dino.meleeState === 'crouch_clamp_bite') {
                    // Nửa đầu (0 -> 0.45): Vươn 2 tay kẹp gọng kìm, đầu hơi rút lấy đà; Nửa sau (0.45 -> 1.0): Phóng đầu cắn mạnh tới!
                    if (progress < 0.45) {
                        const clampWave = Math.sin((progress / 0.45) * Math.PI * 0.5);
                        meleeSpinePitch = 0.25 * clampWave;
                        meleeForwardLunge = 10 * clampWave;
                        meleeHeadThrust = -10 * clampWave;
                    } else {
                        const snapWave = Math.sin(((progress - 0.45) / 0.55) * Math.PI);
                        meleeSpinePitch = 0.35 * snapWave;
                        meleeForwardLunge = 24 * snapWave;
                        meleeHeadThrust = 38 * snapWave;
                    }
                } else if (dino.meleeState === 'death_roll') {
                    // Duỗi thẳng cơ thể như cá sấu săn mồi khi xoay trục ngang
                    meleeSpinePitch = 0.30;
                    meleeForwardLunge = 18;
                    meleeHeadThrust = 16;
                } else if (dino.meleeState === 'dash_tail_spin') {
                    meleeSpinePitch = 0.15 * swingWave;
                    meleeForwardLunge = 8 * swingWave;
                } else if (dino.meleeState === 'air_saw_spin') {
                    // Cuộn tròn lưng tôm để lộ toàn bộ hàng vây lưng thành lưỡi cưa tròn
                    meleeSpinePitch = 0.85;
                    meleeForwardLunge = 0;
                    meleeHeadThrust = -14;
                }
            }

            const laserBrace = dino.laserActiveSec > 0 ? 0.35 : (dino.rangedCharging ? Math.min(0.25, dino.rangedChargeSec * 0.12) : 0);
            const poseLow = Math.min(1.25, (c + d * 0.92 + laserBrace * 0.5) * (1 - w * 0.85) * (1 - l * 0.85) + climb * 0.85);

            // 1. KHỚP HÔNG GỐC (PELVIS / HIP ROOT)
            const hipX = -10 - poseLow * 10 - recoil * 0.25 + meleeForwardLunge * 0.6 + w * 8 + l * (4 - lookAwayFactor * 6);
            const hipY = -50 + poseLow * 15 + bounceY + w * 4 + l * 10 - climb * 12;

            // 2. GÓC NGHIÊNG XƯƠNG SỐNG THÂN (TORSO SPINE ANGLE)
            const airPitch = (!isGrounded && d < 0.2 && w < 0.2 && l < 0.2)
                ? Math.max(-0.24, Math.min(0.24, vy * 0.011))
                : 0;
            const baseSpine = -0.24 + c * 0.34 + d * 0.32 + airPitch + climb * 0.55 + meleeSpinePitch + laserBrace * 0.22;
            const verticalSpine = -1.10 + lookAwayFactor * 0.28;
            const spineAngle = baseSpine * (1 - Math.max(w, l)) + verticalSpine * Math.max(w, l);
            const spineLength = 42;

            // 3. KHỚP NGỰC / VAI (CHEST / SHOULDER SOCKET)
            const chestX = hipX + Math.cos(spineAngle) * spineLength;
            const chestY = hipY + Math.sin(spineAngle) * spineLength;

            const torsoCenterX = (hipX + chestX) * 0.5;
            const torsoCenterY = (hipY + chestY) * 0.5;

            // 4. CHUỖI ĐỐT SỐNG CỔ & HỘP SỌ (NECK CHAIN -> SKULL PIVOT)
            const neckBaseAngle = -0.70
                + c * 0.60
                + d * 0.66
                + headPitch * 0.35
                + meleeSpinePitch * 0.8
                + laserBrace * 0.35
                - w * 0.32
                - l * 0.25
                + lookAwayFactor * 0.42
                + climb * 0.45;
            const neckLength = 26 - c * 3.5 + d * 4 + meleeHeadThrust * 0.55;
            const neckMidX = chestX + Math.cos((spineAngle + neckBaseAngle) * 0.5) * (neckLength * 0.52);
            const neckMidY = chestY + Math.sin((spineAngle + neckBaseAngle) * 0.5) * (neckLength * 0.52);

            const headX = chestX + Math.cos(neckBaseAngle) * neckLength - recoil * 0.7 + meleeHeadThrust * 0.55;
            const headY = chestY + Math.sin(neckBaseAngle) * neckLength + bounceY * 0.18;

            const headRotation = c * 0.08 - d * 0.06 + headPitch + airPitch * 0.55 - w * 0.18 - l * 0.12 + lookAwayFactor * 0.22 + meleeSpinePitch * 0.35;

            // 5. CHUỖI 5 ĐỐT SỐNG ĐUÔI (ARTICULATED TAIL VERTEBRAE)
            const tailRootX = hipX - Math.cos(spineAngle) * 10;
            const tailRootY = hipY - Math.sin(spineAngle) * 10 + 1;
            let segX = tailRootX;
            let segY = tailRootY;
            let cumAngle = (-spineAngle * 0.45) * (1 - d * 0.85) - (w * 0.85 + l * 0.95);
            if (dino.meleeState === 'air_saw_spin') {
                cumAngle = -0.95; // Uốn cong đuôi khép vòng tròn lưỡi cưa
            } else if (dino.meleeState === 'dash_tail_spin') {
                cumAngle = 0.08 * Math.sin(dino.tailSpinPhase * 2); // Duỗi căng đuôi quất lốc xoáy
            }
            const segLengths = [23, 22, 20, 19, 18];
            const segRadiiTop = [19, 15, 11.5, 8, 4.5];
            const segRadiiBot = [16, 12.5, 9.2, 6, 3];

            const tailNodes = [{ x: segX, y: segY, rTop: 22, rBot: 18, angle: cumAngle }];
            for (let i = 0; i < 5; i++) {
                const spinCurl = dino.meleeState === 'air_saw_spin' ? -0.32 : 0;
                cumAngle += dino.tailAngles[i] * (1 - d * 0.75) + (w + l) * 0.08 + spinCurl;
                segX -= Math.cos(cumAngle) * segLengths[i];
                segY += Math.sin(cumAngle) * segLengths[i];
                tailNodes.push({
                    x: segX,
                    y: segY,
                    rTop: segRadiiTop[i],
                    rBot: segRadiiBot[i],
                    angle: cumAngle
                });
            }

            return {
                bounceY,
                poseLow,
                w,
                l,
                m,
                climb,
                lookAwayFactor,
                hipX,
                hipY,
                spineAngle,
                torsoCenterX,
                torsoCenterY,
                chestX,
                chestY,
                neckMidX,
                neckMidY,
                headX,
                headY,
                headRotation,
                tailNodes
            };
        }
// PLAYER_PART_END s8.apexCreate.computeSkeletalRig.1
}}

// index.html:102390 · Phạm vi: apexCreate
function __Part1(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.getMouthWorldPositionAndAngle.1 EDITABLE
function getMouthWorldPositionAndAngle(targetWorldX, targetWorldY) {
            let effectiveFacing = dino.facing;
            if (dino.isWallSliding) {
                effectiveFacing = -dino.wallDir;
            } else if (dino.isLedgeGrabbing) {
                effectiveFacing = dino.ledgeLookDir;
            } else if (targetWorldX !== undefined) {
                const dxClick = targetWorldX - dino.x;
                if (Math.abs(dxClick) > 25 && dino.dashTimer <= 0) {
                    dino.facing = dxClick > 0 ? 1 : -1;
                    effectiveFacing = dino.facing;
                }
            }

            const rig = computeSkeletalRig(
                dino.crouchBlend,
                dino.dashBlend,
                dino.walkCycle,
                dino.breathCycle,
                dino.recoilOffset,
                dino.headPitch,
                dino.vy,
                dino.isGrounded
            );
            const spawnX = dino.x + effectiveFacing * (rig.headX + 42);
            const spawnY = dino.y + rig.headY + 4;

            let angle = effectiveFacing === 1 ? 0 : Math.PI;
            if (targetWorldX !== undefined && targetWorldY !== undefined) {
                const rawAngle = Math.atan2(targetWorldY - spawnY, targetWorldX - spawnX);
                if (effectiveFacing === 1) {
                    angle = Math.max(-0.72, Math.min(0.65, rawAngle));
                    dino.headPitch = angle * 0.65;
                } else {
                    let diff = rawAngle - Math.PI;
                    if (diff < -Math.PI) diff += Math.PI * 2;
                    if (diff > Math.PI) diff -= Math.PI * 2;
                    diff = Math.max(-0.65, Math.min(0.72, diff));
                    angle = Math.PI + diff;
                    dino.headPitch = -diff * 0.65;
                }
            } else {
                dino.headPitch = 0;
            }

            return { spawnX, spawnY, angle, effectiveFacing };
        }
// PLAYER_PART_END s8.apexCreate.getMouthWorldPositionAndAngle.1
}}

// index.html:103610 · Phạm vi: apexCreate
function __Part2(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.tnNode.1 EDITABLE
function tnNode(arr, idx) {
            return arr[Math.max(0, Math.min(arr.length - 1, idx))];
        }
// PLAYER_PART_END s8.apexCreate.tnNode.1
}}

// index.html:103613 · Phạm vi: apexCreate
function __Part3(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawEnergySpine.1 EDITABLE
function drawEnergySpine(x, y, w, h, angle, spineIdx, totalSpines) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);

            const ratio = spineIdx / Math.max(1, totalSpines - 1);
            const chargeLevel = Math.max(obelithPower(),magmaTime>0?1:0,dino.chargePulse, dino.rangedCharging ? Math.min(1, dino.rangedChargeSec / 1.5) : 0);
            const isLit = chargeLevel > 0.05 && ratio <= chargeLevel * (ultimate&&ultimate.kind===0?1:1.15);

            ctx.fillStyle = isLit ? currentSkin.energyGlow : currentSkin.armor;
            ctx.strokeStyle = apexColor===4?'#a82d42':'#090d16';
            ctx.lineWidth = apexColor===4?1.15:2;

            if (isLit) {
                ctx.shadowColor = currentSkin.energyGlow;
                ctx.shadowBlur = 12;
            }

            ctx.beginPath();
            ctx.moveTo(-w * 0.5, 2);
            ctx.quadraticCurveTo(-w * 0.15, -h * 0.75, 2, -h);
            ctx.quadraticCurveTo(w * 0.45, -h * 0.35, w * 0.5, 2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            if (isLit) {
                ctx.fillStyle = currentSkin.energyCore;
                ctx.beginPath();
                ctx.moveTo(-w * 0.22, 0);
                ctx.lineTo(1, -h * 0.72);
                ctx.lineTo(w * 0.22, 0);
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        }
// PLAYER_PART_END s8.apexCreate.drawEnergySpine.1
}}

// index.html:103651 · Phạm vi: apexCreate
function __Part4(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawDashAfterimages.1 EDITABLE
function drawDashAfterimages() {
            afterimages.forEach(ai => {
                ctx.save();
                ctx.translate(ai.x, ai.y);
                ctx.scale(ai.facing * ai.scaleX, ai.scaleY);
                ctx.globalAlpha = Math.max(0, ai.alpha * 0.55);

                const rig = computeSkeletalRig(ai.crouchBlend, ai.dashBlend, ai.walkCycle, ai.breathCycle, 0, 0, 0, true);
                ctx.fillStyle = ai.color;
                ctx.strokeStyle = ai.coreColor;
                ctx.lineWidth = 2;

                ctx.beginPath();
                ctx.ellipse(rig.torsoCenterX, rig.torsoCenterY, 42, 24, rig.spineAngle, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                ctx.ellipse(rig.headX + 12, rig.headY - 4, 28, 14, rig.headRotation, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            });
        }
// PLAYER_PART_END s8.apexCreate.drawDashAfterimages.1
}}

// index.html:103675 · Phạm vi: apexCreate
function __Part5(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawParticlesAndEffects.1 EDITABLE
function drawParticlesAndEffects() {
            // Sóng xung kích (Shockwaves)
            shockwaves.forEach(sw => {
                ctx.save();
                ctx.globalAlpha = Math.max(0, sw.alpha);
                ctx.strokeStyle = sw.color;
                ctx.shadowColor = sw.color;
                ctx.shadowBlur = 12;
                ctx.lineWidth = sw.lineWidth || 4;
                ctx.beginPath();
                ctx.ellipse(sw.x, sw.y, sw.rx, sw.ry, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            });

            // Hạt năng lượng & Mảnh vỡ (Particles)
            particles.forEach(pt => {
                ctx.save();
                ctx.globalAlpha = Math.max(0, pt.alpha);
                ctx.translate(pt.x, pt.y);
                ctx.rotate(pt.rotation || 0);
                ctx.fillStyle = pt.color;
                if (pt.glow) {
                    ctx.shadowColor = pt.color;
                    ctx.shadowBlur = 10;
                }
                if (pt.shape === 'shard') {
                    ctx.beginPath();
                    ctx.moveTo(0, -pt.radius * 1.3);
                    ctx.lineTo(pt.radius, 0);
                    ctx.lineTo(0, pt.radius * 1.3);
                    ctx.lineTo(-pt.radius, 0);
                    ctx.closePath();
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, pt.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            });

            // Chữ sát thương bay lên (Floating Damage Numbers)
            floatingTexts.forEach(ft => {
                ctx.save();
                ctx.globalAlpha = Math.max(0, ft.alpha);
                ctx.font = '900 13px "Be Vietnam Pro", sans-serif';
                ctx.fillStyle = ft.color;
                ctx.strokeStyle = '#020617';
                ctx.lineWidth = 3;
                ctx.textAlign = 'center';
                ctx.strokeText(ft.text, ft.x, ft.y);
                ctx.fillText(ft.text, ft.x, ft.y);
                ctx.restore();
            });
        }
// PLAYER_PART_END s8.apexCreate.drawParticlesAndEffects.1
}}

// index.html:103731 · Phạm vi: apexCreate
function __Part6(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawArticulatedLeg.1 EDITABLE
function drawArticulatedLeg(hipX, hipY, stepPhase, isBackLeg, crouchFactor, dashFactor) {
            const w = dino.wallSlideBlend;
            const l = dino.ledgeBlend;
            const climb = dino.isLedgeClimbing ? Math.sin(dino.ledgeClimbProgress * Math.PI) : 0;

            let footOffsetX = 0;
            let footOffsetY = 0;
            let kneeForward = 0;

            if (climb > 0.05) {
                footOffsetX = isBackLeg ? 10 : 26;
                footOffsetY = (isBackLeg ? -12 : -32) * climb;
                kneeForward = 22;
            } else if (l > 0.15) {
                footOffsetX = isBackLeg ? 8 : 20;
                footOffsetY = isBackLeg ? -6 : -22;
                kneeForward = 16;
            } else if (w > 0.15) {
                footOffsetX = isBackLeg ? 16 : 24;
                footOffsetY = isBackLeg ? -8 : -28;
                kneeForward = 18;
            } else if (dashFactor > 0.15) {
                footOffsetX = (isBackLeg ? -34 : -22) * dashFactor;
                footOffsetY = (-18 - (isBackLeg ? 6 : 0)) * dashFactor;
                kneeForward = 12;
            } else if (!dino.isGrounded) {
                footOffsetX = isBackLeg ? -18 : 12;
                footOffsetY = -20;
                kneeForward = 15;
            } else {
                const strideLength = (crouchFactor > 0.5 ? 24 : 34) * dino.moveBlend;
                const liftHeight = (crouchFactor > 0.5 ? 13 : 24) * dino.moveBlend;
                const restOffset = (isBackLeg ? -11 : 10) * (1 - dino.moveBlend);
                footOffsetX = Math.sin(stepPhase) * strideLength + restOffset;
                footOffsetY = Math.min(0, Math.cos(stepPhase) * liftHeight);
            }

            const footX = hipX + footOffsetX;
            const footY = -4 + footOffsetY;

            const kneeX = (hipX + footX) * 0.5 + 15 + kneeForward * 0.35;
            const kneeY = (hipY + footY) * 0.5 - 5;
            const ankleX = footX - 9;
            const ankleY = footY - 16 + footOffsetY * 0.2;

            const mainColor = isBackLeg ? currentSkin.secondary : currentSkin.primary;
            const armorColor = currentSkin.armor;

            ctx.save();
            ctx.strokeStyle = apexColor===4?'#a82d42':'#090d16';
            ctx.lineWidth = apexColor===4?1.15:2.5;
            ctx.lineJoin = 'round';

            ctx.fillStyle = mainColor;
            ctx.beginPath();
            ctx.moveTo(hipX - 20, hipY - 10);
            ctx.quadraticCurveTo(hipX - 26, kneeY - 2, kneeX - 10, kneeY + 6);
            ctx.lineTo(kneeX + 12, kneeY - 4);
            ctx.quadraticCurveTo(hipX + 24, hipY - 16, hipX - 20, hipY - 10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            if (!isBackLeg) {
                ctx.fillStyle = armorColor;
                for (let p = 0; p < 3; p++) {
                    const t = 0.22 + p * 0.22;
                    const px = hipX * (1 - t) + kneeX * t + 3;
                    const py = hipY * (1 - t) + kneeY * t - 4;
                    ctx.beginPath();
                    ctx.ellipse(px, py, 7 - p, 3.5, 0.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.fillStyle = mainColor;
            ctx.beginPath();
            ctx.moveTo(kneeX - 8, kneeY + 2);
            ctx.lineTo(ankleX - 7, ankleY);
            ctx.lineTo(ankleX + 7, ankleY + 3);
            ctx.lineTo(kneeX + 10, kneeY - 2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#fef3c7';
            ctx.beginPath();
            ctx.moveTo(ankleX - 6, ankleY);
            ctx.lineTo(ankleX - 14, ankleY + 4);
            ctx.lineTo(ankleX - 5, ankleY + 6);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = mainColor;
            ctx.beginPath();
            ctx.moveTo(ankleX - 5, ankleY);
            ctx.lineTo(footX - 6, footY);
            ctx.lineTo(footX + 20, footY);
            ctx.lineTo(footX + 14, footY - 8);
            ctx.lineTo(ankleX + 7, ankleY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#fef3c7';
            for (let c = 0; c < 3; c++) {
                const clawX = footX + 16 - c * 6.5;
                const clawScale = 1 - c * 0.15;
                ctx.beginPath();
                ctx.moveTo(clawX, footY);
                ctx.quadraticCurveTo(clawX + 7 * clawScale, footY - 5 * clawScale, clawX + 9 * clawScale, footY);
                ctx.lineTo(clawX, footY);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            if(apexColor===4&&!isBackLeg){ctx.save();ctx.strokeStyle='rgba(154,174,204,.5)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(hipX-9,hipY-6);ctx.quadraticCurveTo(kneeX-9,kneeY-1,kneeX-3,kneeY+1);ctx.stroke();ctx.restore();}
            if(!isBackLeg)drawObelithTrace([[hipX+3,hipY-4],[kneeX,kneeY],[ankleX,ankleY],[footX+8,footY-4]],3);
            if (showHitbox) {
                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(hipX, hipY);
                ctx.lineTo(kneeX, kneeY);
                ctx.lineTo(ankleX, ankleY);
                ctx.lineTo(footX + 8, footY);
                ctx.stroke();
            }

            ctx.restore();
        }
// PLAYER_PART_END s8.apexCreate.drawArticulatedLeg.1
}}

// index.html:103864 · Phạm vi: apexCreate
function __Part7(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawArticulatedArm.1 EDITABLE
function drawArticulatedArm(shoulderX, shoulderY, isBackArm, crouchFactor, dashFactor, lookAwayFactor = 0) {
            const w = dino.wallSlideBlend;
            const l = dino.ledgeBlend;
            const climb = dino.isLedgeClimbing ? Math.sin(dino.ledgeClimbProgress * Math.PI) : 0;

            let armAngle = Math.sin(dino.walkCycle + (isBackArm ? Math.PI : 0)) * 0.22 * dino.moveBlend * (1 - dashFactor)
                + Math.sin(dino.breathCycle) * 0.08
                + (dino.fireGlowTimer > 0 ? -0.32 : 0)
                + dashFactor * 0.55
                + crouchFactor * 0.25;

            let armScaleX = 1.0;

            // Khi Cúi Kẹp Cắn (crouch_clamp_bite): 2 tay vươn cực dài ra phía trước tạo thành Gọng Kìm (Upper & Lower Pincer)
            if (dino.meleeState === 'crouch_clamp_bite') {
                const progress = 1 - dino.meleeTimer / Math.max(1, dino.meleeMaxTimer);
                const clampSnap = Math.min(1, progress / 0.42);
                // Tay sau nâng lên làm gọng kìm trên, tay trước hạ xuống làm gọng kìm dưới rồi kẹp sập vào nhau!
                const openSpread = (1 - clampSnap) * 0.72;
                armAngle = isBackArm ? (-0.55 - openSpread) : (0.15 + openSpread);
                armScaleX = 2.05;
            } else if (dino.armStrikeExtend > 0.05) {
                const progress = 1 - dino.meleeTimer / Math.max(1, dino.meleeMaxTimer);
                const swing = Math.sin(progress * Math.PI);
                armAngle = dino.armStrikeAngle * (isBackArm ? -0.7 : 1.0) + swing * 1.45;
                armScaleX = 1.0 + dino.armStrikeExtend * 0.48;
            } else if (climb > 0.05) {
                armAngle = 0.65 * climb;
                armScaleX = 1.25;
            } else if (l > 0.15) {
                if (!isBackArm && lookAwayFactor > 0.35) {
                    armAngle = -2.35;
                    armScaleX = 1.25;
                } else {
                    armAngle = -0.92;
                    armScaleX = 1.32;
                }
            } else if (w > 0.15) {
                armAngle = -0.68 + (isBackArm ? -0.15 : 0.1);
                armScaleX = 1.22;
            }

            ctx.save();
            ctx.translate(shoulderX, shoulderY);
            ctx.rotate(armAngle);
            ctx.scale(armScaleX, 1 + (armScaleX - 1) * 0.35);

            const mainColor = isBackArm ? currentSkin.secondary : currentSkin.primary;
            ctx.fillStyle = mainColor;
            ctx.strokeStyle = apexColor===4?'#a82d42':'#090d16';
            ctx.lineWidth = apexColor===4?1.15:2.2;
            ctx.lineJoin = 'round';

            ctx.beginPath();
            ctx.moveTo(-6, -5);
            ctx.lineTo(10, 10);
            ctx.lineTo(25, 4);
            ctx.lineTo(24, 12);
            ctx.lineTo(8, 18);
            ctx.lineTo(-8, 4);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            const clawGlow = dino.armStrikeExtend > 0.15;
            ctx.fillStyle = clawGlow ? currentSkin.energyCore : '#fef3c7';
            if (clawGlow) {
                ctx.shadowColor = currentSkin.energyGlow;
                ctx.shadowBlur = 12;
            }
            for (let k = 0; k < 3; k++) {
                const wy = 4 + k * 3.5;
                ctx.beginPath();
                ctx.moveTo(24, wy);
                ctx.quadraticCurveTo(33 - k * 1.5, wy + 1, 31 - k * 1.5, wy + 5);
                ctx.lineTo(22, wy + 3);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            ctx.restore();
        }
// PLAYER_PART_END s8.apexCreate.drawArticulatedArm.1
}}

// index.html:103947 · Phạm vi: apexCreate
function __Part8(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawDinosaur.1 EDITABLE
function drawDinosaur() {
            const c = dino.crouchBlend;
            const d = dino.dashBlend;
            const rig = computeSkeletalRig(
                c,
                d,
                dino.walkCycle,
                dino.breathCycle,
                dino.recoilOffset,
                dino.headPitch,
                dino.vy,
                dino.isGrounded
            );

            let shadowSurfaceY = groundY;
            for (let i = 0; i < platforms.length; i++) {
                const p = platforms[i];
                if (dino.x >= p.x - 20 && dino.x <= p.x + p.w + 20 && dino.y <= p.y + 10) {
                    if (p.y < shadowSurfaceY) shadowSurfaceY = p.y;
                }
            }
            const distFromSurface = Math.max(0, shadowSurfaceY - dino.y);
            const shadowScale = Math.max(0.25, 1 - distFromSurface / 340);

            ctx.save();
            ctx.fillStyle = 'rgba(2, 6, 23, 0.44)';
            ctx.beginPath();
            ctx.ellipse(dino.x, shadowSurfaceY + 4, (62 + rig.poseLow * 20) * shadowScale, 10 * shadowScale, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.translate(dino.x, dino.y);
            // Hiệu ứng 3D xoay ngang khi dùng Dash-Chém (Lốc Đuôi 2 Vòng) & Xoay trục dọc khi dùng Chém-Dash-Chém (Cá Sấu Xoay)
            let spinFlipMultiplier = 1;
            let verticalRollScaleY = 1;
            if (dino.meleeState === 'dash_tail_spin') {
                spinFlipMultiplier = Math.cos(dino.tailSpinPhase);
                if (Math.abs(spinFlipMultiplier) < 0.28) {
                    spinFlipMultiplier = (spinFlipMultiplier >= 0 ? 1 : -1) * 0.28;
                }
            } else if (dino.meleeState === 'death_roll' && dino.deathRollPhase > 0) {
                verticalRollScaleY = Math.cos(dino.deathRollPhase);
                if (Math.abs(verticalRollScaleY) < 0.30) {
                    verticalRollScaleY = (verticalRollScaleY >= 0 ? 1 : -1) * 0.30;
                }
            }

            const safeFlipX = Math.sign(dino.visualScaleX || dino.facing) * Math.max(0.78, Math.abs(dino.visualScaleX)) * spinFlipMultiplier;

            // Khi Giữ J Trên Không (Lưỡi Cưa Vây Lưng Xoay Dọc - air_saw_spin): Xoay dọc toàn bộ cơ thể quanh tâm lưng!
            if (dino.meleeState === 'air_saw_spin' || dino.meleeState === 'tail_rise') {
                ctx.translate(0, -48);
                ctx.scale(safeFlipX * dino.scaleX, dino.scaleY);
                ctx.rotate(dino.meleeState==='tail_rise'?dino.riseAngle:dino.sawSpinAngle);
                ctx.translate(0, 48);
            } else {
                ctx.translate(0, -48 * (1 - verticalRollScaleY));
                ctx.scale(safeFlipX * dino.scaleX, dino.scaleY * verticalRollScaleY);
                if (!dino.isGrounded && d < 0.2 && rig.w < 0.2 && rig.l < 0.2) {
                    ctx.rotate(dino.airSpinAngle);
                }
            }

            const totalSpines = 12;
            const { hipX, hipY, spineAngle, torsoCenterX, torsoCenterY, chestX, chestY, neckMidX, neckMidY, headX, headY, headRotation, tailNodes, w, l, lookAwayFactor } = rig;

            // LỚP 1: CHÂN SAU & TAY SAU
            drawArticulatedLeg(hipX - 4, hipY + 2, dino.walkCycle + Math.PI, true, c, d);
            drawArticulatedArm(chestX + 4, chestY + 6, true, c, d, lookAwayFactor);

            // LỚP 2: ĐUÔI ĐA ĐỐT SỐNG (Phóng dài gai lưng thành lưỡi cưa khi đang xoay dọc trên không)
            const sawSpineBoost = dino.meleeState === 'air_saw_spin' ? 1.85 : 1.0;
            ctx.save();
            for (let i = 4; i >= 1; i--) {
                const n = tailNodes[i];
                drawEnergySpine(n.x, n.y - n.rTop * 0.85, (8 + (5 - i) * 1.5) * sawSpineBoost, (10 + (5 - i) * 2.5) * sawSpineBoost, -0.35 - n.angle, 4 - i, totalSpines);
            }

            ctx.fillStyle = currentSkin.primary;
            ctx.strokeStyle = apexColor===4?'#a82d42':'#090d16';
            ctx.lineWidth = apexColor===4?1.15:2.6;
            ctx.beginPath();
            ctx.moveTo(tailNodes[0].x, tailNodes[0].y - tailNodes[0].rTop);
            for (let i = 1; i < tailNodes.length; i++) {
                ctx.lineTo(tailNodes[i].x, tailNodes[i].y - tailNodes[i].rTop);
            }
            const tip = tailNodes[tailNodes.length - 1];
            ctx.lineTo(tip.x - 10, tip.y);
            for (let i = tailNodes.length - 1; i >= 0; i--) {
                ctx.lineTo(tnNode(tailNodes, i).x, tnNode(tailNodes, i).y + tnNode(tailNodes, i).rBot);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = currentSkin.belly;
            ctx.beginPath();
            ctx.moveTo(tailNodes[0].x, tailNodes[0].y + tailNodes[0].rBot * 0.45);
            for (let i = 1; i < tailNodes.length - 1; i++) {
                ctx.lineTo(tailNodes[i].x, tailNodes[i].y + tailNodes[i].rBot * 0.45);
            }
            for (let i = tailNodes.length - 2; i >= 0; i--) {
                ctx.lineTo(tailNodes[i].x, tailNodes[i].y + tailNodes[i].rBot * 0.92);
            }
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = currentSkin.armor;
            for (let i = 0; i < tailNodes.length - 1; i++) {
                const n = tailNodes[i];
                ctx.beginPath();
                ctx.ellipse(n.x - 6, n.y - n.rTop * 0.45, 7 - i, 3.2 - i * 0.4, -n.angle, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();

            // LỚP 3: THÂN MÌNH CƠ BẮP
            ctx.save();
            ctx.translate(torsoCenterX, torsoCenterY);
            ctx.rotate(spineAngle);

            for (let i = -2; i <= 2; i++) {
                const spX = i * 12.5;
                const spY = -24 + Math.abs(i) * 2.0;
                const spH = (22 - Math.abs(i) * 2.4) * sawSpineBoost;
                drawEnergySpine(spX, spY, 13 * sawSpineBoost, spH, -0.15 + i * 0.08, 5 + (i + 2), totalSpines);
            }

            ctx.fillStyle = currentSkin.primary;
            ctx.strokeStyle = apexColor===4?'#a82d42':'#090d16';
            ctx.lineWidth = apexColor===4?1.15:2.8;
            ctx.beginPath();
            ctx.ellipse(0, 0, 44, 27, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = currentSkin.belly;
            ctx.beginPath();
            ctx.ellipse(5, 11, 33, 13, 0.06, 0, Math.PI);
            ctx.fill();

            ctx.fillStyle = currentSkin.armor;
            ctx.beginPath();
            ctx.ellipse(-1, -13, 38, 11, 0, Math.PI, Math.PI * 2);
            ctx.fill();

            for (let s = -2; s <= 2; s++) {
                ctx.fillStyle = currentSkin.armor;
                ctx.beginPath();
                ctx.moveTo(s * 11 - 4, -22);
                ctx.lineTo(s * 11 + 4, -22);
                ctx.lineTo(s * 11 + 1, -2 + Math.abs(s) * 2);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();

            // LỚP 4: CẦU CƠ CỔ ĐA ĐỐT LIỀN MẠCH
            ctx.save();
            drawEnergySpine(neckMidX - 8, neckMidY - 12, 10 * sawSpineBoost, 15 * sawSpineBoost, spineAngle - 0.35, 10, totalSpines);
            drawEnergySpine(headX - 14, headY - 10, 11 * sawSpineBoost, 17 * sawSpineBoost, headRotation - 0.35, 11, totalSpines);

            ctx.fillStyle = currentSkin.primary;
            ctx.strokeStyle = apexColor===4?'#a82d42':'#090d16';
            ctx.lineWidth = apexColor===4?1.15:2.6;
            ctx.beginPath();
            ctx.moveTo(chestX - 18, chestY - 18);
            ctx.quadraticCurveTo(neckMidX - 16, neckMidY - 16, headX - 16, headY - 12);
            ctx.lineTo(headX + 12, headY + 6);
            ctx.quadraticCurveTo(neckMidX + 14, neckMidY + 14, chestX + 12, chestY + 18);
            ctx.quadraticCurveTo(chestX - 6, chestY + 8, chestX - 18, chestY - 18);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = currentSkin.belly;
            ctx.beginPath();
            ctx.moveTo(chestX + 6, chestY + 16);
            ctx.quadraticCurveTo(neckMidX + 12, neckMidY + 12, headX + 8, headY + 8);
            ctx.lineTo(headX + 1, headY + 4);
            ctx.quadraticCurveTo(neckMidX + 4, neckMidY + 6, chestX - 2, chestY + 10);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = currentSkin.armor;
            ctx.beginPath();
            ctx.moveTo(chestX - 16, chestY - 16);
            ctx.quadraticCurveTo(neckMidX - 14, neckMidY - 14, headX - 14, headY - 10);
            ctx.lineTo(headX - 4, headY - 2);
            ctx.quadraticCurveTo(neckMidX - 4, neckMidY - 4, chestX - 6, chestY - 6);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // LỚP 5: HỘP SỌ CHI TIẾT & QUẢ CẦU TỤ LỰC TRƯỚC MIỆNG
            ctx.save();
            ctx.translate(headX, headY);
            const lookFlip = (w > 0.55 || lookAwayFactor > 0.45) ? -1 : 1;
            ctx.scale(lookFlip, 1);
            ctx.rotate(headRotation * lookFlip);

            if (dino.jawOpen > 0.06) {
                ctx.fillStyle = currentSkin.jawInterior;
                ctx.beginPath();
                ctx.moveTo(-2, 1);
                ctx.lineTo(38, 2);
                ctx.lineTo(32, 11 + dino.jawOpen * 18);
                ctx.lineTo(-4, 9);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#fb7185';
                ctx.beginPath();
                ctx.moveTo(4, 7);
                ctx.quadraticCurveTo(18, 4 + dino.jawOpen * 6, 28, 8 + dino.jawOpen * 10);
                ctx.quadraticCurveTo(16, 12 + dino.jawOpen * 9, 4, 9);
                ctx.closePath();
                ctx.fill();

                if (dino.fireGlowTimer > 0 || dino.chargePulse > 0.2 || dino.rangedCharging) {
                    const glowAlpha = Math.min(1, dino.fireGlowTimer / 12 + dino.chargePulse * 0.65);
                    ctx.save();
                    ctx.globalAlpha = glowAlpha;
                    const throatGrad = ctx.createRadialGradient(14, 5, 2, 18, 6, 28);
                    throatGrad.addColorStop(0, currentSkin.energyCore);
                    throatGrad.addColorStop(0.5, currentSkin.energyGlow);
                    throatGrad.addColorStop(1, 'transparent');
                    ctx.fillStyle = throatGrad;
                    ctx.beginPath();
                    ctx.arc(16, 6, 28, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }

            // Hàm dưới
            ctx.save();
            ctx.translate(0, 6);
            ctx.rotate(dino.jawOpen * 0.52);

            const lowerTeethSizes = [5.5, 7.5, 5, 7, 6, 4.5];
            ctx.fillStyle = '#fefce8';
            ctx.strokeStyle = apexColor===4?'#a82d42':'#090d16';
            ctx.lineWidth = apexColor===4?1.15:1.5;
            for (let r = 0; r < lowerTeethSizes.length; r++) {
                const rx = 6 + r * 6.2;
                const th = lowerTeethSizes[r];
                ctx.beginPath();
                ctx.moveTo(rx, 1);
                ctx.lineTo(rx + 2.5, -th);
                ctx.lineTo(rx + 5, 1);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            ctx.fillStyle = currentSkin.secondary;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(-12, -2);
            ctx.lineTo(44, 0);
            ctx.quadraticCurveTo(46, 8, 36, 12);
            ctx.lineTo(14, 13);
            ctx.lineTo(8, 16);
            ctx.lineTo(2, 12);
            ctx.lineTo(-10, 11);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = currentSkin.belly;
            ctx.beginPath();
            ctx.moveTo(0, 8);
            ctx.lineTo(36, 6);
            ctx.lineTo(30, 11);
            ctx.lineTo(2, 10);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // Hàm trên
            const upperTeethSizes = [6, 9.5, 7, 10, 6.5, 8.5, 5.5];
            ctx.fillStyle = '#fefce8';
            ctx.strokeStyle = apexColor===4?'#a82d42':'#090d16';
            ctx.lineWidth = apexColor===4?1.15:1.5;
            for (let r = 0; r < upperTeethSizes.length; r++) {
                const rx = 5 + r * 5.8;
                const th = upperTeethSizes[r];
                ctx.beginPath();
                ctx.moveTo(rx, 2);
                ctx.lineTo(rx + 2.2, 2 + th);
                ctx.lineTo(rx + 5, 2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            ctx.fillStyle = currentSkin.primary;
            ctx.strokeStyle = apexColor===4?'#a82d42':'#090d16';
            ctx.lineWidth = apexColor===4?1.15:2.7;
            ctx.beginPath();
            ctx.moveTo(-18, 6);
            ctx.lineTo(-20, -14);
            ctx.lineTo(-8, -24);
            ctx.lineTo(4, -22);
            ctx.lineTo(14, -17);
            ctx.lineTo(42, -14);
            ctx.quadraticCurveTo(51, -11, 49, 4);
            ctx.lineTo(24, 5);
            ctx.quadraticCurveTo(12, 2, -6, 5);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = currentSkin.armor;
            ctx.beginPath();
            ctx.moveTo(-20, -12);
            ctx.lineTo(-31, -19);
            ctx.lineTo(-14, -22);
            ctx.lineTo(6, -22);
            ctx.lineTo(38, -14);
            ctx.lineTo(34, -8);
            ctx.lineTo(2, -12);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = dino.fireGlowTimer > 0 ? currentSkin.energyGlow : '#090d16';
            ctx.beginPath();
            ctx.ellipse(40, -7, 3.5, 2, -0.25, 0, Math.PI * 2);
            ctx.fill();

            // Mắt bò sát
            const eyeX = 4;
            const eyeY = -10;
            if (dino.isBlinking && dino.dashTimer <= 0) {
                ctx.strokeStyle = apexColor===4?'#a82d42':'#090d16';
                ctx.lineWidth = apexColor===4?1.15:3;
                ctx.beginPath();
                ctx.moveTo(eyeX - 6, eyeY);
                ctx.lineTo(eyeX + 6, eyeY);
                ctx.stroke();
            } else {
                ctx.fillStyle = currentSkin.armor;
                ctx.beginPath();
                ctx.arc(eyeX, eyeY, 8, 0, Math.PI * 2);
                ctx.fill();

                ctx.save();
                if (dino.chargePulse > 0.1 || dino.fireGlowTimer > 0) {
                    ctx.shadowColor = currentSkin.energyGlow;
                    ctx.shadowBlur = 12;
                }
                ctx.fillStyle = apexColor!==4&&(dino.fireGlowTimer > 5 || dino.dashTimer > 0 || dino.laserActiveSec > 0) ? currentSkin.energyCore : currentSkin.eye;
                ctx.beginPath();
                ctx.arc(eyeX, eyeY, 6.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                ctx.fillStyle = '#090d16';
                ctx.beginPath();
                ctx.ellipse(eyeX + 1.5, eyeY, 1.8, 5, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(eyeX - 1.2, eyeY - 2.2, 1.6, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = currentSkin.armor;
                ctx.beginPath();
                ctx.moveTo(eyeX - 9, eyeY - 5);
                ctx.lineTo(eyeX + 2, eyeY - 9);
                ctx.lineTo(eyeX + 9, eyeY - 3);
                ctx.lineTo(eyeX - 8, eyeY - 2);
                ctx.closePath();
                ctx.fill();
            }

            // HIỆU ỨNG QUẢ CẦU TỤ LỰC TRƯỚC MIỆNG KHI ĐANG GIỮ PHÍM K / CHUỘT PHẢI
            if (dino.rangedCharging) {
                const chargeRatio = Math.min(1, dino.rangedChargeSec / 2.0);
                const orbR = 6 + chargeRatio * 18 + Math.sin(dino.breathCycle * 8) * 2.5;
                ctx.save();
                ctx.translate(46, 5);

                const cGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, orbR * 2.2);
                cGrad.addColorStop(0, '#ffffff');
                cGrad.addColorStop(0.45, dino.rangedChargeSec >= 2.0 ? '#f43f5e' : (dino.rangedChargeSec >= 1.5 ? '#fde047' : currentSkin.energyGlow));
                cGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = cGrad;
                ctx.beginPath();
                ctx.arc(0, 0, orbR * 2.2, 0, Math.PI * 2);
                ctx.fill();

                // Nếu đạt mốc 1.5s: Hiển thị các hạt vệ tinh xoay quanh miệng báo hiệu Cầu Hành Tinh Xoắn Ốc
                if (dino.rangedChargeSec >= 1.5) {
                    for (let s = 0; s < 3; s++) {
                        const ang = dino.breathCycle * 5 + (s * Math.PI * 2) / 3;
                        const sx = Math.cos(ang) * (orbR + 10);
                        const sy = Math.sin(ang) * (orbR * 0.55);
                        ctx.fillStyle = '#fde047';
                        ctx.beginPath();
                        ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                ctx.restore();
            }

            ctx.restore(); // Kết thúc vẽ Đầu
            drawMagmaVeins(rig);

            // LỚP 6: CHÂN TRƯỚC & TAY TRƯỚC
            drawArticulatedLeg(hipX + 4, hipY, dino.walkCycle, false, c, d);
            drawArticulatedArm(chestX - 2, chestY + 8, false, c, d, lookAwayFactor);

            drawObelithGloss(rig);
            drawObelithRunes(rig);

            // LỚP 7: NÓN SÓNG ÂM KHI DASH
            if (d > 0.25) {
                ctx.save();
                ctx.globalAlpha = d * 0.75;
                const coneTipX = headX + 56;
                const coneTipY = headY - 2;
                const coneGrad = ctx.createLinearGradient(coneTipX, coneTipY, coneTipX - 95, coneTipY);
                coneGrad.addColorStop(0, currentSkin.energyCore);
                coneGrad.addColorStop(0.4, currentSkin.energyGlow);
                coneGrad.addColorStop(1, 'transparent');

                ctx.strokeStyle = coneGrad;
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(coneTipX - 85, coneTipY - 48);
                ctx.quadraticCurveTo(coneTipX - 15, coneTipY - 18, coneTipX, coneTipY);
                ctx.quadraticCurveTo(coneTipX - 15, coneTipY + 18, coneTipX - 85, coneTipY + 48);
                ctx.stroke();
                ctx.restore();
            }

            if (showHitbox) {
                ctx.save();
                ctx.strokeStyle = '#fde047';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                for (let i = tailNodes.length - 1; i >= 0; i--) {
                    if (i === tailNodes.length - 1) ctx.moveTo(tailNodes[i].x, tailNodes[i].y);
                    else ctx.lineTo(tailNodes[i].x, tailNodes[i].y);
                }
                ctx.lineTo(hipX, hipY);
                ctx.lineTo(chestX, chestY);
                ctx.lineTo(neckMidX, neckMidY);
                ctx.lineTo(headX, headY);
                ctx.stroke();
                ctx.restore();
            }

            ctx.restore();

            if (dino.isLedgeGrabbing || dino.isWallSliding) {
                ctx.save();
                const indicatorX = dino.x;
                const indicatorY = dino.y - 115 + Math.sin(dino.breathCycle * 3) * 4;
                const isLookingBack = dino.isLedgeGrabbing && dino.ledgeLookDir !== dino.ledgeSide;
                const label = dino.isWallSliding
                    ? `⚡ W: BẬT TƯỜNG (${dino.wallDir === 1 ? '⬅️' : '➡️'})`
                    : (isLookingBack
                        ? `🚀 W: PHÓNG SANG KIA (${dino.ledgeLookDir === 1 ? '➡️' : '⬅️'})`
                        : `🧗 W / TỚI: LEO LÊN ĐẢO`);

                ctx.font = '800 11px "Be Vietnam Pro", sans-serif';
                const textW = ctx.measureText(label).width + 16;
                ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
                ctx.strokeStyle = isLookingBack ? '#fbbf24' : currentSkin.energyGlow;
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.roundRect(indicatorX - textW * 0.5, indicatorY - 14, textW, 22, 8);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = isLookingBack ? '#fde047' : '#ecfccb';
                ctx.textAlign = 'center';
                ctx.fillText(label, indicatorX, indicatorY + 1);
                ctx.restore();
            }
        }
// PLAYER_PART_END s8.apexCreate.drawDinosaur.1
}}

// index.html:104435 · Phạm vi: apexCreate
function __Part9(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawProjectiles.1 EDITABLE
function drawProjectiles() {
            projectiles.forEach(p => {
                // 1. Vẽ đuôi tia phụ (Sub-beam trail)
                if (p.type === 'sub_beam' && p.trail && p.trail.length > 1) {
                    ctx.save();
                    ctx.strokeStyle = p.glowColor;
                    ctx.lineWidth = 5;
                    ctx.lineCap = 'round';
                    ctx.globalAlpha = 0.65;
                    ctx.beginPath();
                    for (let i = 0; i < p.trail.length; i++) {
                        if (i === 0) ctx.moveTo(p.trail[i].x, p.trail[i].y);
                        else ctx.lineTo(p.trail[i].x, p.trail[i].y);
                    }
                    ctx.stroke();
                    ctx.restore();
                }

                // 2. Nếu là CẦU HÀNH TINH XOẮN ỐC VŨ TRỤ (1.5s Charge): Vẽ nửa quỹ đạo lò xo nằm PHÍA SAU hành tinh trước
                if (p.type === 'helical_planet' && p.satellites) {
                    p.satellites.forEach((sat, sIdx) => {
                        const satColor = sIdx === 0 ? '#38bdf8' : (sIdx === 1 ? '#fde047' : '#f43f5e');
                        if (sat.trail.length > 1) {
                            ctx.save();
                            ctx.lineCap = 'round';
                            for (let t = 1; t < sat.trail.length; t++) {
                                const pt0 = sat.trail[t - 1];
                                const pt1 = sat.trail[t];
                                if (pt1.depth < 0) {
                                    ctx.strokeStyle = satColor;
                                    ctx.globalAlpha = (t / sat.trail.length) * 0.55;
                                    ctx.lineWidth = 3.5;
                                    ctx.beginPath();
                                    ctx.moveTo(pt0.x, pt0.y);
                                    ctx.lineTo(pt1.x, pt1.y);
                                    ctx.stroke();
                                }
                            }
                            ctx.restore();
                        }
                        if (sat.depth < 0 && sat.x !== undefined) {
                            ctx.save();
                            ctx.fillStyle = satColor;
                            ctx.shadowColor = satColor;
                            ctx.shadowBlur = 10;
                            ctx.beginPath();
                            ctx.arc(sat.x, sat.y, 5.5, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.restore();
                        }
                    });
                }

                // 3. Vẽ Quả Cầu Năng Lượng Chính (Hành Tinh Mẹ hoặc Cầu Plasma)
                ctx.save();
                ctx.translate(p.x, p.y);

                const grad = ctx.createRadialGradient(0, 0, p.radius * 0.2, 0, 0, p.radius * 2.3);
                grad.addColorStop(0, p.coreColor);
                grad.addColorStop(0.45, p.glowColor);
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(0, 0, p.radius * 2.3, 0, Math.PI * 2);
                ctx.fill();

                ctx.rotate(p.rotation);
                ctx.strokeStyle = p.arcColor;
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.ellipse(0, 0, p.radius * 1.45, p.radius * 0.65, 0.4, 0, Math.PI * 2);
                ctx.stroke();

                ctx.strokeStyle = p.coreColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.ellipse(0, 0, p.radius * 1.45, p.radius * 0.65, -0.9, 0, Math.PI * 2);
                ctx.stroke();

                ctx.fillStyle = p.coreColor;
                ctx.shadowColor = p.glowColor;
                ctx.shadowBlur = 18;
                ctx.beginPath();
                ctx.arc(0, 0, p.radius * 0.75, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();

                // 4. Vẽ nửa quỹ đạo lò xo xoắn ốc & Vệ tinh nằm PHÍA TRƯỚC hành tinh mẹ (tạo chiều sâu 3D thật)
                if (p.type === 'helical_planet' && p.satellites) {
                    p.satellites.forEach((sat, sIdx) => {
                        const satColor = sIdx === 0 ? '#38bdf8' : (sIdx === 1 ? '#fde047' : '#f43f5e');
                        if (sat.trail.length > 1) {
                            ctx.save();
                            ctx.lineCap = 'round';
                            for (let t = 1; t < sat.trail.length; t++) {
                                const pt0 = sat.trail[t - 1];
                                const pt1 = sat.trail[t];
                                if (pt1.depth >= 0) {
                                    ctx.strokeStyle = satColor;
                                    ctx.globalAlpha = (t / sat.trail.length) * 0.95;
                                    ctx.lineWidth = 5;
                                    ctx.shadowColor = satColor;
                                    ctx.shadowBlur = 8;
                                    ctx.beginPath();
                                    ctx.moveTo(pt0.x, pt0.y);
                                    ctx.lineTo(pt1.x, pt1.y);
                                    ctx.stroke();
                                }
                            }
                            ctx.restore();
                        }
                        if (sat.depth >= 0 && sat.x !== undefined) {
                            ctx.save();
                            ctx.fillStyle = '#ffffff';
                            ctx.strokeStyle = satColor;
                            ctx.lineWidth = 3;
                            ctx.shadowColor = satColor;
                            ctx.shadowBlur = 14;
                            ctx.beginPath();
                            ctx.arc(sat.x, sat.y, 7.5, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.stroke();
                            ctx.restore();
                        }
                    });
                }
            });
        }
// PLAYER_PART_END s8.apexCreate.drawProjectiles.1
}}
