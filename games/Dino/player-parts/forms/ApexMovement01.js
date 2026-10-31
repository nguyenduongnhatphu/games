// PLAYER_FILE: ApexMovement01
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: OCEAN_SURF, afterimages, apexColor, dino, doChieu, doChieuCo, doChieuThu, floatingTexts, keys, mapTheme, platforms, projectiles, sgDamage, sgRocketClash, sgSegmentBox, sgTargets, worldL, worldR
// index.html:101360 · Phạm vi: apexCreate
function __Part0(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.updateJumpUI.1 EDITABLE
function updateJumpUI(){}
// PLAYER_PART_END s8.apexCreate.updateJumpUI.1
}}

// index.html:101360 · Phạm vi: apexCreate
function __Part1(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.updateDashUI.1 EDITABLE
function updateDashUI(){}
// PLAYER_PART_END s8.apexCreate.updateDashUI.1
}}

// index.html:101360 · Phạm vi: apexCreate
function __Part2(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.updateChargeUI.1 EDITABLE
function updateChargeUI(){}
// PLAYER_PART_END s8.apexCreate.updateChargeUI.1
}}

// index.html:101360 · Phạm vi: apexCreate
function __Part3(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.updateStatusBadge.1 EDITABLE
function updateStatusBadge(){}
// PLAYER_PART_END s8.apexCreate.updateStatusBadge.1
}}

// index.html:101706 · Phạm vi: apexCreate
function __Part4(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.startLedgeClimb.1 EDITABLE
function startLedgeClimb() {
            if (!dino.isLedgeGrabbing || dino.isLedgeClimbing || !dino.ledgePlatform) return;
            dino.isLedgeClimbing = true;
            dino.isLedgeGrabbing = false;
            dino.ledgeClimbProgress = 0;
            dino.climbStartX = dino.x;
            dino.climbStartY = dino.y;
            dino.climbTargetX = dino.ledgeCornerX + dino.ledgeSide * 38;
            dino.climbTargetY = dino.ledgePlatform.y;
            dino.facing = dino.ledgeSide;
            dino.ledgeLookDir = dino.ledgeSide;
            dino.jawOpen = 0.45;
            dino.chargePulse = 0.75;

            spawnParticles(dino.ledgeCornerX, dino.ledgeCornerY, 14, {
                spreadVx: 4,
                spreadVy: 3,
                baseVy: -2,
                minRadius: 3,
                maxRadius: 7,
                color: dino.ledgePlatform.runeColor,
                glow: true
            });
        }
// PLAYER_PART_END s8.apexCreate.startLedgeClimb.1
}}

// index.html:101730 · Phạm vi: apexCreate
function __Part5(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.triggerDash.1 EDITABLE
function triggerDash(direction) {
            if (dino.dashCooldown > 0 || dino.dashTimer > 0 || dino.isLedgeClimbing) return;

            let dir = direction !== undefined ? direction : dino.facing;
            if (dino.isWallSliding) {
                dir = -dino.wallDir;
                dino.isWallSliding = false;
                dino.wallDir = 0;
            } else if (dino.isLedgeGrabbing) {
                dir = dino.ledgeLookDir !== dino.ledgeSide ? dino.ledgeLookDir : -dino.ledgeSide;
                dino.isLedgeGrabbing = false;
                dino.ledgeIgnoreTimer = 18;
            }

            // KIỂM TRA TỔ HỢP "CHÉM -> DASH -> CHÉM": Nếu người chơi nhấn Dash khi đang thực hiện đòn Chém (hoặc vừa chém xong),
            // lập tức kích hoạt trạng thái "Death Roll Ready" (slashDashChainTimer) để cú Chém tiếp theo hóa thành Lốc Xoáy Cá Sấu!
            if(dino.meleeHolding&&!dino.meleeBiteTriggered){triggerPrimaryMeleeAction();dino.meleeBiteTriggered=true;}
            const wasSlashing = (
                dino.meleeState === 'claw1' ||
                dino.meleeState === 'claw2' ||
                dino.meleeState === 'claw3_retreat' ||
                dino.meleeState === 'claw4_reengage' ||
                dino.meleeState === 'air_slash' ||
                dino.meleeComboResetTimer > 20
            );
            dino.slashDashChainTimer=0;
            dino.postDashSlashWindow = 20; // Cho phép nhấn J trong hoặc ngay sau khi Dash để ra đòn Dash-Chém (Lốc Xoáy Đuôi 2 Vòng)
            dino.meleeState = 'none';
            dino.facing = dir;
            dino.dashDir = dir;
            dino.dashTimer = dino.dashMaxDuration;
            dino.dashCooldown = dino.dashMaxCooldown;
            dino.vx = dir * dino.dashSpeed*(apexColor===3?1.25:1);
            dino.vy = 0;
            dino.scaleX = 1.28;
            dino.scaleY = 0.80;
            dino.jawOpen = 0.65;
            dino.chargePulse = 1.0;
            dino.fireGlowTimer = 18;

            updateDashUI();

            shockwaves.push({
                x: dino.x - dir * 15,
                y: dino.y - 52,
                rx: 12,
                ry: 38,
                maxRx: 55,
                alpha: 1.0,
                color: wasSlashing ? '#fde047' : currentSkin.energyCore,
                lineWidth: 5,
                vertical: true
            });

            spawnParticles(dino.x - dir * 20, dino.y - 48, 22, {
                spreadVx: 4,
                spreadVy: 5.5,
                baseVx: -dir * 9,
                baseVy: 0,
                minRadius: 3,
                maxRadius: 8,
                color: wasSlashing ? '#fde047' : currentSkin.energyGlow,
                glow: true,
                gravity: 0.02,
                decay: 0.038,
                shape: 'shard'
            });
            if(wasSlashing)executeCrocodileDeathRoll();
        }
// PLAYER_PART_END s8.apexCreate.triggerDash.1
}}

// index.html:101799 · Phạm vi: apexCreate
function __Part6(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.triggerJump.1 EDITABLE
function triggerJump() {
            if (dino.isLedgeClimbing) return;
            if (dino.dashTimer > 0) dino.dashTimer = 0;

            if (dino.isLedgeGrabbing) {
                if (dino.ledgeLookDir === dino.ledgeSide) {
                    startLedgeClimb();
                    return;
                } else {
                    const leapDir = dino.ledgeLookDir;
                    dino.isLedgeGrabbing = false;
                    dino.ledgeIgnoreTimer = 20;
                    dino.facing = leapDir;
                    dino.vx = leapDir * 12.2;
                    dino.vy = dino.jumpForce * 0.96;
                    dino.jumpsLeft = dino.maxJumps - 1;
                    dino.wallJumpLockTimer = 11;
                    dino.scaleX = 1.20;
                    dino.scaleY = 0.84;
                    dino.jawOpen = 0.75;
                    dino.chargePulse = 0.9;

                    shockwaves.push({
                        x: dino.ledgeCornerX,
                        y: dino.ledgeCornerY + 12,
                        rx: 10,
                        ry: 24,
                        maxRx: 50,
                        alpha: 0.95,
                        color: currentSkin.energyGlow,
                        lineWidth: 4,
                        vertical: true
                    });
                    updateJumpUI();
                    return;
                }
            }

            if (dino.isWallSliding) {
                const kickDir = -dino.wallDir;
                const wallContactX = dino.x + dino.wallDir * 28;
                dino.isWallSliding = false;
                dino.facing = kickDir;
                dino.vx = kickDir * 11.8;
                dino.vy = dino.jumpForce * 0.98;
                dino.jumpsLeft = dino.maxJumps - 1;
                dino.wallJumpLockTimer = 12;
                dino.scaleX = 1.22;
                dino.scaleY = 0.82;
                dino.jawOpen = 0.8;
                dino.chargePulse = 1.0;
                dino.airSpinAngle = -0.26;

                shockwaves.push({
                    x: wallContactX,
                    y: dino.y - 45,
                    rx: 10,
                    ry: 32,
                    maxRx: 58,
                    alpha: 1.0,
                    color: currentSkin.energyCore,
                    lineWidth: 4.5,
                    vertical: true
                });

                spawnParticles(wallContactX, dino.y - 45, 18, {
                    spreadVx: 4.5,
                    spreadVy: 5.5,
                    baseVx: kickDir * 6.5,
                    baseVy: -2.0,
                    minRadius: 3,
                    maxRadius: 8,
                    color: currentSkin.energyGlow,
                    glow: true,
                    gravity: 0.05,
                    decay: 0.035,
                    shape: 'shard'
                });
                updateJumpUI();
                return;
            }

            if (dino.isGrounded) {
                dino.vy = dino.jumpForce;
                dino.isGrounded = false;
                dino.jumpsLeft = dino.maxJumps - 1;
                dino.scaleX = 0.86;
                dino.scaleY = 1.18;
                dino.jawOpen = 0.45;
                spawnParticles(dino.x, dino.y, 12, {
                    spreadVx: 4.5,
                    spreadVy: 2,
                    baseVy: -2.2,
                    minRadius: 5,
                    maxRadius: 11,
                    color: isNightMode ? '#64748b' : '#a8a29e'
                });
                updateJumpUI();
            } else if (dino.jumpsLeft > 0) {
                dino.vy = dino.doubleJumpForce;
                dino.jumpsLeft--;
                dino.scaleX = 1.20;
                dino.scaleY = 0.84;
                dino.jawOpen = 0.85;
                dino.chargePulse = 1.0;
                dino.airSpinAngle = -0.32;

                shockwaves.push({
                    x: dino.x,
                    y: dino.y - 10,
                    rx: 18,
                    ry: 6,
                    maxRx: 95,
                    alpha: 0.95,
                    color: currentSkin.energyGlow,
                    lineWidth: 4.5
                });

                spawnParticles(dino.x, dino.y - 12, 20, {
                    spreadVx: 6.5,
                    spreadVy: 3.5,
                    baseVy: 1.5,
                    minRadius: 3,
                    maxRadius: 8,
                    color: currentSkin.energyGlow,
                    glow: true,
                    gravity: 0.04,
                    decay: 0.032
                });
                updateJumpUI();
            }
        }
// PLAYER_PART_END s8.apexCreate.triggerJump.1
}}

// index.html:102599 · Phạm vi: apexCreate
function __Part7(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.update.1 EDITABLE
function update(rawDtSec) {
            // Chuẩn hóa dt về đơn vị frame 60fps (1.0 = 1/60s) nhưng hoàn toàn mượt theo thời gian thực
            const timeScale = isSlowMo ? 0.35 : 1.0;
            const dt = Math.min(2.5, rawDtSec * 60) * timeScale;
            const dtSec = (dt / 60);

            if (screenShake > 0) {
                screenShake *= Math.pow(0.84, dt);
                if (screenShake < 0.2) screenShake = 0;
            }

            if (dino.dashCooldown > 0) {
                dino.dashCooldown = Math.max(0, dino.dashCooldown - dt);
                updateDashUI();
            }
            if (dino.ledgeIgnoreTimer > 0) {
                dino.ledgeIgnoreTimer = Math.max(0, dino.ledgeIgnoreTimer - dt);
            }
            if (dino.wallJumpLockTimer > 0) {
                dino.wallJumpLockTimer = Math.max(0, dino.wallJumpLockTimer - dt);
            }
            if (dino.slashDashChainTimer > 0) {
                dino.slashDashChainTimer = Math.max(0, dino.slashDashChainTimer - dt);
            }
            if (dino.postDashSlashWindow > 0) {
                dino.postDashSlashWindow = Math.max(0, dino.postDashSlashWindow - dt);
            }

            // 0. XỬ LÝ TỤ LỰC CẬN CHIẾN (GIỮ J: DƯỚI ĐẤT -> CẮN XÉ | TRÊN KHÔNG -> LƯỠI CƯA VÂY LƯNG) & CÁC TUYỆT KỸ ĐA NHỊP
            if (dino.meleeComboResetTimer > 0) {
                dino.meleeComboResetTimer -= dt;
                if (dino.meleeComboResetTimer <= 0 && dino.meleeState === 'none' && dino.slashDashChainTimer <= 0) {
                    dino.meleeComboStep = 0;
                    comboBadge.textContent = 'Sẵn sàng';
                }
            }

            if (dino.meleeHolding && !dino.meleeBiteTriggered) {
                dino.meleeHoldSec += dtSec;
                if (dino.meleeHoldSec >= 0.13 && dino.meleeState === 'none') {
                    if (dino.isGrounded) {
                        dino.meleeState = 'bite_charge';
                        dino.jawOpen = damp(dino.jawOpen, 0.95, 14, dtSec);
                    }
                    dino.chargePulse = Math.min(1, dino.meleeHoldSec * 3.4);
                }
                // Khi giữ đủ 0.28 giây:
                // - Trên không: Hóa thành Lưỡi Cưa Vây Lưng Xoay Dọc (Aerial Dorsal Buzzsaw)!
                // - Dưới đất: Tung đòn Cắn Xé Hủy Diệt (Phantom Crunch Bite) ở ngay phía trước mõm!
                if (dino.meleeHoldSec >= 0.28) {
                    dino.meleeBiteTriggered = true;
                    if (!dino.isGrounded) {
                        executeAirBuzzsaw();
                    } else if (keys.down) {
                        executeCrouchClampBite();
                    } else {
                        executeChargedBite();
                    }
                }
            }

            // CẬP NHẬT CHI TIẾT TỪNG TRẠNG THÁI CHIẾN ĐẤU CẬN CHIẾN ĐẶC BIỆT
            if (dino.meleeState !== 'none' && dino.meleeState !== 'bite_charge') {
                dino.meleeTimer -= dt;
                dino.meleeSubTick += dt;

                // A. DASH -> CHÉM: Lốc Xoáy Đuôi 2 Vòng Ngang (Double Tail Cyclone)
                if (dino.meleeState === 'dash_tail_spin') {
                    const progress = 1 - Math.max(0, dino.meleeTimer) / dino.meleeMaxTimer;
                    // Xoay tròn 2 vòng hoàn chỉnh (4 * PI) theo chiều ngang
                    dino.tailSpinPhase = progress * Math.PI * 4;

                    if (dino.meleeSubTick >= 13) {
                        dino.meleeSubTick = 0;

                        damageTargetsInArea(dino.x, dino.y - 46, 138, 72, dino.meleeTimer > 0 ? 5 : 7, dino.facing * 7.5, '🌪️ LỐC ĐUÔI ');
                        spawnParticles(dino.x + (Math.random() - 0.5) * 140, dino.y - 44, 8, {
                            spreadVx: 7,
                            spreadVy: 3,
                            baseVy: -1,
                            minRadius: 3,
                            maxRadius: 7,
                            color: currentSkin.energyGlow,
                            glow: true,
                            shape: 'shard'
                        });
                    }
                }
                // B. CHÉM -> DASH -> CHÉM: Lốc Xoáy Tử Thần Cá Sấu & Đòn Chém Tròn Kết Liễu (Crocodile Death Roll -> 360 Nova)
                else if (dino.meleeState === 'death_roll') {
                    const progress = 1 - Math.max(0, dino.meleeTimer) / dino.meleeMaxTimer;
                    if (!dino.apexRollFinish) {
                        // Giai đoạn 1 (0 -> 72%): Xoay tròn quanh trục dọc cơ thể như cá sấu xé mồi (Death Roll)
                        dino.deathRollPhase += 0.58 * dt;
                        dino.vx = dino.facing * 18.5;

                        // Vòng xoáy tử thần xoắn quanh thân khủng long
                        if (Math.random() < 0.75) {
                            spinRings.push({
                                x: dino.x + dino.facing * 24,
                                y: dino.y - 48,
                                rx: 26,
                                ry: 64,
                                rotation: (Math.random() - 0.5) * 0.3,
                                alpha: 0.85,
                                color: '#fde047',
                                coreColor: '#ffffff',
                                type: 'death_roll_spiral'
                            });
                        }

                        if (dino.meleeSubTick >= 15) {
                            dino.meleeSubTick -= 15;

                            // Death-roll damage is swept along movement below, so short crossings still hit.
                        }
                    } else if (dino.meleeSubTick < 100) {
                        // Giai đoạn 2 (72% -> 100%): Bùng nổ Đòn Chém Hình Tròn 360 Độ Xung Quanh (Circular Finale)!
                        dino.meleeSubTick = 999; // Đánh dấu đã nổ đòn kết liễu hình tròn
                        dino.deathRollPhase = 0;
                        dino.vx = dino.facing * 4.0;
                        dino.scaleX = 1.32;
                        dino.scaleY = 0.80;
                        dino.jawOpen = 1.35;

                        spinRings.push({
                            x: dino.x,
                            y: dino.y - 50,
                            rx: 155,
                            ry: 155,
                            rotation: 0,
                            alpha: 1.0,
                            color: '#f43f5e',
                            coreColor: '#fef08a',
                            type: 'circular_finale_360'
                        });

                        shockwaves.push({
                            x: dino.x,
                            y: dino.y - 50,
                            rx: 25,
                            ry: 25,
                            maxRx: 175,
                            alpha: 1.0,
                            color: '#fef08a',
                            lineWidth: 7
                        });

                        spawnParticles(dino.x, dino.y - 50, 38, {
                            spreadVx: 11,
                            spreadVy: 11,
                            baseVy: 0,
                            minRadius: 4,
                            maxRadius: 10,
                            color: '#fde047',
                            glow: true,
                            shape: 'shard'
                        });

                        damageTargetsInArea(dino.x, dino.y - 50, 175, 165, 6, dino.facing * 14.0, '💥 CHÉM TRÒN 360° ');
                    }
                }
                // C. GIỮ J TRÊN KHÔNG: Lưỡi Cưa Vây Lưng Xoay Dọc (Vertical Dorsal Buzzsaw)
                else if (dino.meleeState === 'air_saw_spin') {
                    dino.sawSpinAngle += 0.65 * dt;
                    // Gravity continues normally during the saw.

                    if (dino.meleeSubTick >= 15) {
                        dino.meleeSubTick = 0;

                        damageTargetsInArea(dino.x, dino.y - 48, 98, 98, 4, dino.facing * 5.0, '⚙️ CƯA VÂY LƯNG ');
                        spawnParticles(dino.x, dino.y - 48, 8, {
                            spreadVx: 8,
                            spreadVy: 8,
                            baseVy: 0,
                            minRadius: 3,
                            maxRadius: 6.5,
                            color: currentSkin.energyCore,
                            glow: true,
                            shape: 'shard'
                        });
                    }
                }
                // D. CÚI + J: Dùng 2 tay tạo Hàm Kẹp Gọng Kìm rồi dùng Miệng Cắn Tới (Crouch Clamp -> Bite)
                else if (dino.meleeState === 'crouch_clamp_bite') {
                    const progress = 1 - Math.max(0, dino.meleeTimer) / dino.meleeMaxTimer;
                    // Ở mốc 48% tiến trình (ngay sau khi 2 tay vừa kẹp chặt): Miệng khủng long phóng tới đớp mạnh!
                    if (progress >= 0.48 && dino.meleeSubTick < 100) {
                        dino.meleeSubTick = 999;
                        const dir = dino.facing;
                        dino.vx = dir * 18.5;
                        dino.jawOpen = 1.4;

                        // Tạo Hàm Răng Cắn Tới ngay ở điểm Gọng Kìm 2 tay vừa khóa mục tiêu (phía trước mõm)
                        const forwardOffset = 108;
                        bitePhantoms.push({
                            x: dino.x + dir * forwardOffset,
                            y: dino.y - 38,
                            dir: dir,
                            followDino: true,
                            offsetX: forwardOffset,
                            offsetY: -38,
                            scale: 0.92,
                            progress: 0.15,
                            damageDealt: false,
                            alpha: 1.0,
                            color: currentSkin.energyGlow,
                            glowColor: currentSkin.energyArc,
                            coreColor: '#ffffff'
                        });
                    }
                }

                if (dino.meleeTimer <= 0) {
                    dino.meleeState = 'none';
                    dino.armStrikeExtend = 0;
                    dino.deathRollPhase = 0;
                    dino.tailSpinPhase = 0;
                    dino.sawSpinAngle = 0;
                    if (dino.meleeQueuedNext) {
                        const nextStep = (dino.meleeComboStep % 4) + 1;
                        executeClawComboStep(nextStep);
                    }
                }
            }

            // 0B. XỬ LÝ TỤ LỰC ĐÁNH XA (GIỮ K / CHUỘT PHẢI) & ĐẠI PHÁO LASER 2 GIÂY
            if (dino.rangedCharging) {
                dino.rangedChargeSec += dtSec;
                if(dino.rangedChargeSec>3&&!dino.apexChannel){dino.apexChannel=true;dino.laserActiveSec=2;dino.apexLaserTick=0;}
                if(dino.apexChannel)dino.laserActiveSec=2;
                dino.chargePulse = Math.min(1.0, dino.rangedChargeSec / 1.5);
                dino.jawOpen = damp(dino.jawOpen, 0.45 + Math.min(0.65, dino.rangedChargeSec * 0.32), 12, dtSec);

                // Phát sóng xung kích nhỏ báo hiệu mỗi khi đạt mốc 0.5s, 0.75s, 1.0s, 1.25s, 1.5s, 2.0s
                const milestones = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
                for (let m = 0; m < milestones.length; m++) {
                    if (dino.rangedChargeSec >= milestones[m] && dino.rangedLastMilestone < milestones[m]) {
                        dino.rangedLastMilestone = milestones[m];
                        const { spawnX, spawnY } = getMouthWorldPositionAndAngle();
                        shockwaves.push({
                            x: spawnX,
                            y: spawnY,
                            rx: 6,
                            ry: 6,
                            maxRx: milestones[m] >= 1.5 ? 65 : 38,
                            alpha: 0.9,
                            color: milestones[m] >= 2.0 ? '#f43f5e' : (milestones[m] >= 1.5 ? '#fde047' : currentSkin.energyGlow),
                            lineWidth: milestones[m] >= 1.5 ? 4 : 2.5
                        });
                    }
                }
                updateChargeUI();
            }

            // CẬP NHẬT ĐẠI PHÁO LASER KÉO DÀI 2 GIÂY
            if (dino.laserActiveSec > 0) {
                dino.apexLaserTick=(dino.apexLaserTick||0)+dtSec;
                const laserPulse=dino.apexLaserTick+1e-9>=10/60;
                if(laserPulse)dino.apexLaserTick-=10/60;
                dino.laserActiveSec = Math.max(0, dino.laserActiveSec - dtSec);
                dino.chargePulse = 1.0;
                dino.jawOpen = 1.35;

                const { spawnX, spawnY, angle } = getMouthWorldPositionAndAngle(
                    mouse.active ? mouse.x : undefined,
                    mouse.active ? mouse.y : undefined
                );
                dino.laserAngle = damp(dino.laserAngle, angle, 16, dtSec);

                // Kiểm tra va chạm tia Laser với mọi Mục tiêu trên đường chiếu (chiều dài 1500px)
                const cosA = Math.cos(dino.laserAngle);
                const sinA = Math.sin(dino.laserAngle);
                const beamLength = 1550;
                const lx=spawnX*SCALE,ly=spawnY*SCALE,ex=(spawnX+cosA*beamLength)*SCALE,ey=(spawnY+sinA*beamLength)*SCALE;
                if(laserPulse&&doChieuCo()&&sgSegmentBox(lx,ly,ex,ey,doChieu,12)!==null)doChieuThu({}, {x:Math.min(lx,ex)-12,y:Math.min(ly,ey)-12,w:Math.abs(ex-lx)+24,h:Math.abs(ey-ly)+24},1);

                if (Math.random() < 0.7) {
                    spawnParticles(spawnX + cosA * 35, spawnY + sinA * 35, 2, {
                        spreadVx: 4,
                        spreadVy: 4,
                        baseVx: cosA * 12,
                        baseVy: sinA * 12,
                        minRadius: 3,
                        maxRadius: 6,
                        color: '#ffffff',
                        glow: true,
                        gravity: 0,
                        decay: 0.06
                    });
                }

                for (let j = targets.length - 1; j >= 0; j--) {
                    const t = targets[j];
                    const toTx = t.x - spawnX;
                    const toTy = t.y - spawnY;
                    const proj = toTx * cosA + toTy * sinA;
                    if (laserPulse && proj > 0 && proj < beamLength) {
                        const perpDist = Math.abs(toTx * (-sinA) + toTy * cosA);
                        if (sgSegmentBox(spawnX*SCALE,spawnY*SCALE,(spawnX+cosA*beamLength)*SCALE,(spawnY+sinA*beamLength)*SCALE,t.o,12)!==null) {
                            const dmg = 1;
                            hitTarget(t, dmg);
                            t.hitFlash = 4;
                            t.vx += cosA * 0.9 * dt;

                            if (Math.random() < 0.32) {
                                floatingTexts.push({
                                    x: t.x + (Math.random() - 0.5) * 24,
                                    y: t.y - t.radius - 6,
                                    text: `⚡-${dmg}`,
                                    alpha: 1.0,
                                    vy: -2.8,
                                    color: '#fef08a'
                                });
                                spawnParticles(t.x, t.y, 4, {
                                    spreadVx: 7,
                                    spreadVy: 7,
                                    baseVy: -2,
                                    minRadius: 3,
                                    maxRadius: 7,
                                    color: currentSkin.energyCore,
                                    glow: true,
                                    shape: 'shard'
                                });
                            }

                            if (t.hp <= 0) {
                                destroyTargetAtIndex(j, '#fef08a');
                            }
                        }
                    }
                }
                updateChargeUI();
            }

            // 1. Cập nhật chuyển động lơ lửng của các Đảo Đá Bay
            const prevX = dino.x;
            const prevY = dino.y;
            const halfW = 28;
            const bodyHeight = 96;

            // 2. XỬ LÝ TRẠNG THÁI ĐANG LEO VƯỢT LÊN MÉP ĐÁ (LEDGE CLIMB VAULT)
            if (dino.isLedgeClimbing) {
                dino.ledgeClimbProgress += 0.058 * dt;
                const t = Math.min(1, dino.ledgeClimbProgress);
                const ease = 1 - Math.pow(1 - t, 2.4);

                const verticalBoost = Math.sin(t * Math.PI) * -26;
                dino.x = dino.climbStartX + (dino.climbTargetX - dino.climbStartX) * Math.pow(t, 1.4);
                dino.y = dino.climbStartY + (dino.climbTargetY - dino.climbStartY) * ease + verticalBoost;
                dino.vx = 0;
                dino.vy = 0;
                dino.walkCycle += 0.35 * dt;

                if (dino.ledgeClimbProgress >= 1) {
                    dino.isLedgeClimbing = false;
                    dino.x = dino.climbTargetX;
                    dino.y = dino.ledgePlatform ? dino.ledgePlatform.y : dino.climbTargetY;
                    dino.isGrounded = true;
                    dino.activePlatform = dino.ledgePlatform;
                    dino.jumpsLeft = dino.maxJumps;
                    dino.scaleX = 1.15;
                    dino.scaleY = 0.86;
                    updateJumpUI();
                }
            }
            // 3. XỬ LÝ TRẠNG THÁI ĐANG ĐU MÉP ĐÁ (LEDGE HANG & LOOK-BACK)
            else if (dino.isLedgeGrabbing && dino.ledgePlatform) {
                const p = dino.ledgePlatform;
                dino.ledgeCornerX = dino.ledgeSide === 1 ? p.x : p.x + p.w;
                dino.ledgeCornerY = p.y;

                dino.x = dino.ledgeCornerX - dino.ledgeSide * (halfW - 2);
                dino.y = dino.ledgeCornerY + 74;
                dino.vx = 0;
                dino.vy = 0;
                dino.isGrounded = false;
                dino.isWallSliding = false;
                dino.jumpsLeft = dino.maxJumps;
                updateJumpUI();

                if (keys.down) {
                    dino.isLedgeGrabbing = false;
                    dino.ledgeIgnoreTimer = 22;
                    dino.vy = 2.5;
                } else {
                    const pressingTowardLedge = (dino.ledgeSide === 1 && keys.right) || (dino.ledgeSide === -1 && keys.left);
                    const pressingAwayFromLedge = (dino.ledgeSide === 1 && keys.left) || (dino.ledgeSide === -1 && keys.right);

                    if (pressingAwayFromLedge) {
                        dino.ledgeLookDir = -dino.ledgeSide;
                    } else if (pressingTowardLedge) {
                        if (dino.ledgeLookDir !== dino.ledgeSide) {
                            dino.ledgeLookDir = dino.ledgeSide;
                        } else {
                            startLedgeClimb();
                        }
                    }
                }
            }
            // 4. XỬ LÝ DI CHUYỂN, DASH, CẬN CHIẾN, TRƯỢT TƯỜNG & VA CHẠM ĐẢO BAY
            else {
                const isDashing = dino.dashTimer > 0;
                const isLungingMelee = dino.meleeState !== 'none' && dino.meleeState !== 'bite_charge';
                dino.isCrouching = keys.down && dino.isGrounded && !isDashing && !isLungingMelee;

                if (isDashing) {
                    dino.dashTimer -= dt;
                    dino.vx = dino.dashDir * dino.dashSpeed*(apexColor===3?1.25:1);
                    dino.vy = 0;
                    dino.chargePulse = 1.0;
                    dino.isWallSliding = false;

                    if (Math.random() < 0.78) {
                        afterimages.push({
                            x: dino.x,
                            y: dino.y,
                            facing: dino.facing,
                            scaleX: dino.scaleX,
                            scaleY: dino.scaleY,
                            crouchBlend: dino.crouchBlend,
                            dashBlend: dino.dashBlend,
                            walkCycle: dino.walkCycle,
                            breathCycle: dino.breathCycle,
                            alpha: 0.56,
                            color: currentSkin.energyGlow,
                            coreColor: currentSkin.energyCore
                        });
                    }

                    for (let j = targets.length - 1; j >= 0; j--) {
                        const t = targets[j];
                        const dx = (dino.x + dino.facing * 35) - t.x;
                        const dy = (dino.y - 52) - t.y;
                        if (Math.hypot(dx, dy) < t.radius + 54) {
                            floatingTexts.push({
                                x: t.x,
                                y: t.y - t.radius - 8,
                                text: `⚡ HÚC VỠ -160!`,
                                alpha: 1.0,
                                vy: -2.6,
                                color: currentSkin.energyCore
                            });
                            destroyTargetAtIndex(j, currentSkin.energyGlow);
                        }
                    }
                } else if (isLungingMelee) {
                    // Trong lúc tung đòn Cào/Cắn lướt, ma sát giảm mượt để giữ quán tính lướt chiến đấu
                    dino.vx *= Math.pow(0.86, dt);
                } else {
                    const activeMaxSpeed = dino.isCrouching ? dino.crouchSpeed : dino.speed;
                    if (dino.wallJumpLockTimer <= 0) {
                        if (keys.left && !keys.right) {
                            dino.vx = damp(dino.vx, -activeMaxSpeed, 14, dtSec);
                            dino.facing = -1;
                        } else if (keys.right && !keys.left) {
                            dino.vx = damp(dino.vx, activeMaxSpeed, 14, dtSec);
                            dino.facing = 1;
                        } else {
                            dino.vx = damp(dino.vx, 0, 16, dtSec);
                            if (Math.abs(dino.vx) < 0.06) dino.vx = 0;
                        }
                    }
                }

                // Cập nhật trục X & kiểm tra va chạm Vách Tường của Đảo Đá Bay
                dino.x += dino.vx * dt;
                let touchingWallDir = 0;
                let wallPlatform = null;

                for (let i = 0; i < platforms.length; i++) {
                    const p = platforms[i];
                    if(p.oneWay)continue;
                    const dinoTop = dino.y - bodyHeight;
                    const dinoBottom = dino.y - 8;

                    if (dinoBottom > p.y + 8 && dinoTop < p.y + p.h - 6) {
                        if (prevX + halfW <= p.x + 10 && dino.x + halfW >= p.x) {
                            dino.x = p.x - halfW;
                            if (dino.vx > 0) dino.vx = 0;
                            if (dino.dashTimer > 0) dino.dashTimer = 0;
                            touchingWallDir = 1;
                            wallPlatform = p;
                        } else if (prevX - halfW >= p.x + p.w - 10 && dino.x - halfW <= p.x + p.w) {
                            dino.x = p.x + p.w + halfW;
                            if (dino.vx < 0) dino.vx = 0;
                            if (dino.dashTimer > 0) dino.dashTimer = 0;
                            touchingWallDir = -1;
                            wallPlatform = p;
                        }
                    }

                    if (touchingWallDir === 0 && dinoBottom > p.y + 12 && dinoTop < p.y + p.h - 10) {
                        if (Math.abs((dino.x + halfW) - p.x) <= 7 && keys.right) {
                            dino.x = p.x - halfW;
                            touchingWallDir = 1;
                            wallPlatform = p;
                        } else if (Math.abs((dino.x - halfW) - (p.x + p.w)) <= 7 && keys.left) {
                            dino.x = p.x + p.w + halfW;
                            touchingWallDir = -1;
                            wallPlatform = p;
                        }
                    }
                }

                if (dino.isGrounded && dino.activePlatform) {
                    const ap = dino.activePlatform;
                    if (dino.x + halfW < ap.x + 4 || dino.x - halfW > ap.x + ap.w - 4) {
                        dino.isGrounded = false;
                        dino.activePlatform = null;
                    } else {
                        dino.y = ap.y;
                    }
                }

                // Kiểm tra Bám Mép Đá (Ledge Grab)
                if (!dino.isGrounded && !isDashing && !isLungingMelee && wallCooldown<=0 && dino.ledgeIgnoreTimer <= 0 && dino.vy >= -3.5) {
                    for (let i = 0; i < platforms.length; i++) {
                        const p = platforms[i];
                        const handLevelY = dino.y - 72;
                        if (Math.abs(handLevelY - p.y) <= 24) {
                            if (Math.abs((dino.x + halfW) - p.x) <= 18 && (keys.right || dino.facing === 1 || touchingWallDir === 1)) {
                                dino.isLedgeGrabbing = true;
                                dino.ledgePlatform = p;
                                dino.ledgeSide = 1;
                                dino.ledgeLookDir = 1;
                                dino.ledgeCornerX = p.x;
                                dino.ledgeCornerY = p.y;
                                dino.x = p.x - (halfW - 2);
                                dino.y = p.y + 74;
                                dino.vx = 0;
                                dino.vy = 0;
                                dino.isWallSliding = false;
                                dino.jumpsLeft = dino.maxJumps;
                                dino.scaleX = 0.92;
                                dino.scaleY = 1.10;
                                updateJumpUI();
                                break;
                            }
                            if (Math.abs((dino.x - halfW) - (p.x + p.w)) <= 18 && (keys.left || dino.facing === -1 || touchingWallDir === -1)) {
                                dino.isLedgeGrabbing = true;
                                dino.ledgePlatform = p;
                                dino.ledgeSide = -1;
                                dino.ledgeLookDir = -1;
                                dino.ledgeCornerX = p.x + p.w;
                                dino.ledgeCornerY = p.y;
                                dino.x = p.x + p.w + (halfW - 2);
                                dino.y = p.y + 74;
                                dino.vx = 0;
                                dino.vy = 0;
                                dino.isWallSliding = false;
                                dino.jumpsLeft = dino.maxJumps;
                                dino.scaleX = 0.92;
                                dino.scaleY = 1.10;
                                updateJumpUI();
                                break;
                            }
                        }
                    }
                }

                // Kiểm tra Trượt Tường Megaman
                // Screen edges are climbable walls, never a floor or a ledge.
                const edgeLeft=(worldL()+owner.w/2)/SCALE,edgeRight=(worldR()-owner.w/2)/SCALE;
                if(dino.x<=edgeLeft+.5&&keys.left){dino.x=edgeLeft;touchingWallDir=-1;if(dino.vx<0)dino.vx=0;}
                else if(dino.x>=edgeRight-.5&&keys.right){dino.x=edgeRight;touchingWallDir=1;if(dino.vx>0)dino.vx=0;}
                const pressingTowardWall = (touchingWallDir === 1 && keys.right) || (touchingWallDir === -1 && keys.left);
                if (!dino.isGrounded && !dino.isLedgeGrabbing && !isDashing && touchingWallDir !== 0 && pressingTowardWall && wallCooldown<=0 && dino.vy >= -1.5) {
                    if (!dino.isWallSliding) {
                        dino.scaleX = 0.90;
                        dino.scaleY = 1.10;
                    }
                    dino.isWallSliding = true;
                    dino.wallDir = touchingWallDir;
                    dino.facing = touchingWallDir;
                    if (dino.jumpsLeft < dino.maxJumps) {
                        dino.jumpsLeft = dino.maxJumps;
                        updateJumpUI();
                    }
                } else {
                    dino.isWallSliding = false;
                    dino.wallDir = 0;
                }

                // Trọng lực & Đáp đất
                if (!dino.isGrounded && !dino.isLedgeGrabbing && !isDashing) {
                    if (dino.isWallSliding) {
                        const maxSlideSpeed = keys.down ? 6.2 : 2.35;
                        dino.vy = Math.min(dino.vy + 0.25 * dt, maxSlideSpeed);

                        if (Math.random() < 0.65) {
                            const clawWallX = dino.x + dino.wallDir * (halfW - 1);
                            const sparkColor = wallPlatform ? wallPlatform.runeColor : currentSkin.energyGlow;
                            spawnParticles(clawWallX, dino.y - 22 - Math.random() * 42, 2, {
                                spreadVx: 2.2,
                                spreadVy: 1.5,
                                baseVx: -dino.wallDir * 1.5,
                                baseVy: -1.8,
                                minRadius: 2.5,
                                maxRadius: 5.5,
                                color: Math.random() > 0.45 ? sparkColor : '#cbd5e1',
                                glow: true,
                                gravity: 0.05,
                                decay: 0.045
                            });
                        }
                    } else {
                        const fastFallMultiplier = keys.down ? 1.85 : 1.0;
                        if(mapTheme==='ocean'&&dino.y*SCALE>OCEAN_SURF+4)dino.vy=Math.min(3.4/SCALE,dino.vy+(.20+(keys.down?.60:0))/SCALE*dt);else dino.vy += dino.gravity * fastFallMultiplier * dt;
                    }

                    dino.y += dino.vy * dt;
                    dino.airSpinAngle = damp(dino.airSpinAngle, 0, 8, dtSec);

                    if (dino.vy < 0) {
                        for (let i = 0; i < platforms.length; i++) {
                            const p = platforms[i];
                            if(p.oneWay)continue;
                            if (dino.x + halfW > p.x + 8 && dino.x - halfW < p.x + p.w - 8) {
                                const headTopPrev = prevY - bodyHeight;
                                const headTopNow = dino.y - bodyHeight;
                                if (headTopPrev >= p.y + p.h - 10 && headTopNow <= p.y + p.h) {
                                    dino.y = p.y + p.h + bodyHeight;
                                    dino.vy = 1.2;
                                    break;
                                }
                            }
                        }
                    }

                    if (dino.vy >= 0) {
                        for (let i = 0; i < platforms.length; i++) {
                            const p = platforms[i];
                            if (dino.x + halfW > p.x + 6 && dino.x - halfW < p.x + p.w - 6) {
                                if (prevY <= p.y + 18 && dino.y >= p.y) {
                                    dino.y = p.y;
                                    dino.vy = 0;
                                    dino.isGrounded = true;
                                    dino.isWallSliding = false;
                                    dino.activePlatform = p;
                                    dino.jumpsLeft = dino.maxJumps;
                                    dino.airSpinAngle = 0;
                                    dino.scaleX = 1.18;
                                    dino.scaleY = 0.84;
                                    updateJumpUI();
                                    break;
                                }
                            }
                        }
                    }

                    if (!dino.isGrounded && dino.y >= groundY) {
                        dino.y = groundY;
                        dino.vy = 0;
                        dino.isGrounded = true;
                        dino.isWallSliding = false;
                        dino.activePlatform = null;
                        dino.jumpsLeft = dino.maxJumps;
                        dino.airSpinAngle = 0;
                        dino.scaleX = 1.20;
                        dino.scaleY = 0.82;
                        updateJumpUI();
                    }
                }
            }

            // 5. NỘI SUY MƯỢT TOÀN BỘ TƯ THẾ BẰNG HÀM DAMPING ĐỘC LẬP FRAME RATE
            dino.crouchBlend = damp(dino.crouchBlend, dino.isCrouching ? 1 : 0, 14, dtSec);
            dino.dashBlend = damp(dino.dashBlend, dino.dashTimer > 0 ? 1 : 0, dino.dashTimer > 0 ? 24 : 12, dtSec);
            dino.wallSlideBlend = damp(dino.wallSlideBlend, dino.isWallSliding ? 1 : 0, 18, dtSec);
            dino.ledgeBlend = damp(dino.ledgeBlend, dino.isLedgeGrabbing ? 1 : 0, 18, dtSec);
            dino.meleeBlend = damp(dino.meleeBlend, dino.meleeState !== 'none' ? 1 : 0, 20, dtSec);
            dino.ledgeLookBlend = damp(dino.ledgeLookBlend, dino.isLedgeGrabbing ? dino.ledgeLookDir : dino.facing, 16, dtSec);

            const targetVisualScale = dino.isLedgeGrabbing ? dino.ledgeSide : dino.facing;
            dino.visualScaleX = damp(dino.visualScaleX, targetVisualScale, 22, dtSec);

            dino.scaleX = damp(dino.scaleX, 1, 12, dtSec);
            dino.scaleY = damp(dino.scaleY, 1, 12, dtSec);
            dino.recoilOffset = damp(dino.recoilOffset, 0, 15, dtSec);
            dino.headPitch = damp(dino.headPitch, 0, 8, dtSec);
            dino.armStrikeExtend = damp(dino.armStrikeExtend, 0, 14, dtSec);

            if (dino.chargePulse > 0 && dino.dashTimer <= 0 && !dino.rangedCharging && dino.laserActiveSec <= 0) {
                dino.chargePulse = Math.max(0, dino.chargePulse - 0.03 * dt);
            }
            if (dino.fireGlowTimer > 0) {
                dino.fireGlowTimer -= dt;
            }

            // 7. Chu kỳ bước chạy mượt (không giật về 0 đột ngột khi dừng)
            const isMovingHoriz = dino.isGrounded && Math.abs(dino.vx) > 0.35 && dino.dashTimer <= 0;
            dino.moveBlend = damp(dino.moveBlend, isMovingHoriz ? 1 : 0, 14, dtSec);

            if (dino.moveBlend > 0.02) {
                const prevCycle = dino.walkCycle;
                const strideRate = dino.isCrouching ? 0.18 : 0.27;
                dino.walkCycle += (Math.abs(dino.vx) * 0.044 + strideRate * 0.35) * dt * dino.moveBlend;

                if (isMovingHoriz && Math.floor(dino.walkCycle / Math.PI) !== Math.floor(prevCycle / Math.PI)) {
                    spawnParticles(dino.x - dino.facing * 14, dino.y, 3, {
                        spreadVx: 2,
                        spreadVy: 1,
                        baseVy: -1.2,
                        minRadius: 3,
                        maxRadius: 6,
                        color: dino.activePlatform ? dino.activePlatform.runeColor : (isNightMode ? '#475569' : '#a8a29e')
                    });
                }
            }

            dino.breathCycle += 0.062 * dt;

            for (let i = 0; i < 5; i++) {
                const waveSpeed = dino.walkCycle * 1.35 + dino.breathCycle * 1.1;
                const amp = (0.055 + dino.moveBlend * 0.085) * (1 + i * 0.22);
                const targetTailAngle = Math.sin(waveSpeed - i * 0.55) * amp;
                dino.tailAngles[i] = damp(dino.tailAngles[i], targetTailAngle, 16, dtSec);
            }

            if (dino.laserActiveSec <= 0 && !dino.rangedCharging && !dino.meleeHolding) {
                const targetJaw = dino.fireGlowTimer > 8 ? 1.05
                    : (dino.dashTimer > 0 ? 0.55
                    : (!dino.isGrounded && dino.vy < 0 ? 0.38 : 0.04 + Math.sin(dino.breathCycle) * 0.03));
                dino.jawOpen = damp(dino.jawOpen, targetJaw, 14, dtSec);
            }

            dino.blinkTimer += dt;
            if (dino.blinkTimer > 165) {
                dino.isBlinking = true;
                if (dino.blinkTimer > 173) {
                    dino.isBlinking = false;
                    dino.blinkTimer = Math.random() * 35;
                }
            }

            updateLooseObjects(dt);
        }
// PLAYER_PART_END s8.apexCreate.update.1
}}

// index.html:103337 · Phạm vi: apexCreate
function __Part8(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.updateLooseObjects.1 EDITABLE
function updateLooseObjects(dt){
            // 8. CẬP NHẬT ĐẠN ĐÁNH XA (ĐẠN CONG TRỌNG LỰC, TIA PHỤ & CẦU HÀNH TINH XOẮN ỐC LÒ XO)
            for (let i = projectiles.length - 1; i >= 0; i--) {
                const p = projectiles[i];
                if(p.spinTarget){
                    const target=p.spinTarget;
                    if(!(target.hp>0)||!targets.some(t=>t.o===target)){projectiles.splice(i,1);continue;}
                    p.x=(target.x+target.w/2)/SCALE;p.y=(target.y+target.h/2)/SCALE;
                    p.vx=p.vy=0;p.travelDist+=6*dt;p.spinTick+=dt;
                    if(p.spinTick>=12){p.spinTick-=12;const amount=Math.min(p.spinTickDamage||1,(p.spinLimit||15)-p.spinDamage);const dealt=sgDamage(owner,target,amount+magmaBonus(),'apex');if(dealt>0)p.spinDamage+=amount;}
                    if(target.hp<=0||p.spinDamage>=(p.spinLimit||15)){spawnParticles(p.x,p.y,16,{color:p.glowColor,glow:true,shape:'shard'});projectiles.splice(i,1);continue;}
                }
                p.prevX=p.x;p.prevY=p.y;
                p.vy += (p.gravity || 0) * dt;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.rotation += 0.28 * dt;
                p.life -= dt;

                // Nếu là Cầu Hành Tinh Xoắn Ốc (1.5s Charge): Cập nhật quỹ đạo xoắn lò xo cho các vệ tinh xoay quanh!
                if (p.type === 'helical_planet' && p.satellites) {
                    const stepDist = Math.hypot(p.vx * dt, p.vy * dt);
                    p.travelDist += stepDist;
                    const dirAngle = Math.atan2(p.vy, p.vx);
                    const perpX = -Math.sin(dirAngle);
                    const perpY = Math.cos(dirAngle);
                    const forwardX = Math.cos(dirAngle);
                    const forwardY = Math.sin(dirAngle);

                    p.satellites.forEach(sat => {
                        // Góc xoay quanh trục di chuyển tạo hình xoắn lò xo (Helical Spring Vortex)
                        const theta = p.travelDist * 0.055 + sat.phaseOffset;
                        const orbitRadius = 38;
                        const depthCos = Math.cos(theta);
                        const sideSin = Math.sin(theta);

                        const sx = p.x + perpX * sideSin * orbitRadius + forwardX * depthCos * 12;
                        const sy = p.y + perpY * sideSin * orbitRadius + forwardY * depthCos * 12;

                        sat.x = sx;
                        sat.y = sy;
                        sat.depth = depthCos; // Dùng để vẽ vệ tinh phía trước hoặc phía sau hành tinh mẹ
                        sat.trail.push({ x: sx, y: sy, depth: depthCos });
                        if (sat.trail.length > 26) sat.trail.shift();
                    });
                } else if (p.type === 'sub_beam' && p.trail) {
                    p.trail.push({ x: p.x, y: p.y });
                    if (p.trail.length > 10) p.trail.shift();
                }

                if (Math.random() < 0.75) {
                    particles.push({
                        x: p.x + (Math.random() - 0.5) * 12,
                        y: p.y + (Math.random() - 0.5) * 12,
                        vx: -p.vx * 0.12 + (Math.random() - 0.5) * 2,
                        vy: -p.vy * 0.12 + (Math.random() - 0.5) * 2,
                        radius: 2.5 + Math.random() * 4.5,
                        alpha: 0.85,
                        color: Math.random() > 0.4 ? p.glowColor : p.arcColor,
                        glow: true,
                        gravity: 0,
                        decay: 0.055,
                        shape: 'circle'
                    });
                }

                if(p.spinTarget)continue;
                let hitSomething = sgRocketClash(p,p.prevX*SCALE,p.prevY*SCALE,p.x*SCALE,p.y*SCALE,p.damage);
                if (p.y + p.radius >= groundY) {
                    p.y = groundY - p.radius;
                    hitSomething = true;
                }

                for (let k = 0; k < platforms.length; k++) {
                    const plat = platforms[k];
                    if (
                        p.x + p.radius > plat.x &&
                        p.x - p.radius < plat.x + plat.w &&
                        p.y + p.radius > plat.y &&
                        p.y - p.radius < plat.y + plat.h
                    ) {
                        hitSomething = true;
                        break;
                    }
                }

                const hitRadius = p.type === 'helical_planet' ? p.radius + 36 : p.radius;
                for (let j = targets.length - 1; j >= 0; j--) {
                    const t = targets[j];
                    const dist = Math.hypot(p.x - t.x, p.y - t.y);
                    if (!hitSomething && sgSegmentBox(p.prevX*SCALE,p.prevY*SCALE,p.x*SCALE,p.y*SCALE,t.o,hitRadius*SCALE)!==null) {
                        hitSomething = true;
                        const dmg = p.damage;
                        hitTarget(t, dmg);if(p.skin===1)addLava(p);
                        if(p.type==='helical_planet'&&t.hp>0){p.spinTarget=t.o;p.spinTick=0;p.spinDamage=dmg;p.life=1200;hitSomething=false;}
                        t.hitFlash = 10;
                        t.vx += p.vx * 0.18;

                        floatingTexts.push({
                            x: t.x + (Math.random() - 0.5) * 20,
                            y: t.y - t.radius,
                            text: p.type === 'helical_planet' ? `🪐 XOẮN ỐC -${dmg}!` : `-${dmg}`,
                            alpha: 1.0,
                            vy: -2.3,
                            color: p.coreColor
                        });

                        if (t.hp <= 0) {
                            destroyTargetAtIndex(j, t.color);
                        }
                        break;
                    }
                }

                if (hitSomething) {
                    if(p.skin===1&&!p.lavaMade)addLava(p);
                    shockwaves.push({
                        x: p.x,
                        y: p.y,
                        rx: 10,
                        ry: 10,
                        maxRx: p.type === 'helical_planet' ? 95 : 58,
                        alpha: 0.95,
                        color: p.glowColor,
                        lineWidth: p.type === 'helical_planet' ? 5.5 : 3.5
                    });

                    spawnParticles(p.x, p.y, p.type === 'helical_planet' ? 28 : 15, {
                        spreadVx: 6.5,
                        spreadVy: 6.5,
                        baseVy: -1.5,
                        minRadius: 3,
                        maxRadius: 8,
                        color: p.glowColor,
                        glow: true,
                        gravity: 0.06,
                        decay: 0.038
                    });

                    projectiles.splice(i, 1);
                    continue;
                }

                if (p.life <= 0) {
                    projectiles.splice(i, 1);
                }
            }

            // 9. Cập nhật Hiệu ứng Vệt Cào, Hàm Răng Cắn Xé (Neo theo mõm), Gọng Kìm 2 Tay & Vòng Xoáy Tuyệt Kỹ
            for (let i = slashArcs.length - 1; i >= 0; i--) {
                slashArcs[i].alpha -= 0.085 * dt;
                slashArcs[i].x += dino.vx * 0.35 * dt;
                if (slashArcs[i].alpha <= 0.02) slashArcs.splice(i, 1);
            }

            for (let i = bitePhantoms.length - 1; i >= 0; i--) {
                const bp = bitePhantoms[i];
                bp.progress = Math.min(1, bp.progress + 0.125 * dt);

                // SỬA TRIỆT ĐỂ LỖI HÀM CẮN LỆCH VÀO GIỮA THÂN:
                // Trong suốt quá trình hàm răng đang khép lại (progress < 0.78), vị trí của Hàm Răng luôn cập nhật bám chặt phía trước mõm Khủng long!
                if (bp.followDino && bp.progress < 0.78) {
                    bp.x = dino.x + bp.dir * bp.offsetX;
                    bp.y = dino.y + bp.offsetY;
                }

                // Gây sát thương đúng khoảnh khắc 2 hàm răng sập khít vào nhau ở phía trước mõm!
                if (!bp.damageDealt && bp.progress >= 0.45) {
                    bp.damageDealt = true;
                    const dmg = 6;
                    const label = bp.scale < 1 ? '🦷 ĐỚP GỌNG KÌM ' : '🦷 CẮN XÉ HỦY DIỆT ';
                    damageTargetsInArea(bp.x, bp.y, 115 * bp.scale, 85 * bp.scale, dmg, bp.dir * 14.0, label);
                    spawnParticles(bp.x + bp.dir * 18, bp.y, 28, {
                        spreadVx: 8.5,
                        spreadVy: 7.5,
                        baseVx: bp.dir * 5,
                        baseVy: -1,
                        minRadius: 3.5,
                        maxRadius: 9,
                        color: bp.color,
                        glow: true,
                        gravity: 0.06,
                        decay: 0.032,
                        shape: 'shard'
                    });
                }

                if (bp.progress >= 1) {
                    bp.alpha -= 0.08 * dt;
                }
                if (bp.alpha <= 0.02) bitePhantoms.splice(i, 1);
            }

            for (let i = pincerClamps.length - 1; i >= 0; i--) {
                const pc = pincerClamps[i];
                pc.progress = Math.min(1, pc.progress + 0.14 * dt);
                pc.x = dino.x + pc.dir * pc.offsetX;
                pc.y = dino.y + pc.offsetY;
                if (pc.progress >= 1) {
                    pc.alpha -= 0.085 * dt;
                }
                if (pc.alpha <= 0.02) pincerClamps.splice(i, 1);
            }

            for (let i = spinRings.length - 1; i >= 0; i--) {
                const sr = spinRings[i];
                if (sr.type === 'double_tail_vortex') {
                    sr.x = dino.x;
                    sr.y = dino.y - 44;
                    sr.rotation += 0.45 * dt;
                    if (dino.meleeState !== 'dash_tail_spin') {
                        sr.alpha -= 0.10 * dt;
                    }
                } else if (sr.type === 'death_roll_spiral') {
                    sr.rx += 3.2 * dt;
                    sr.ry += 2.0 * dt;
                    sr.alpha -= 0.11 * dt;
                } else if (sr.type === 'circular_finale_360') {
                    sr.rx += 5.5 * dt;
                    sr.ry += 5.5 * dt;
                    sr.rotation += 0.25 * dt;
                    sr.alpha -= 0.055 * dt;
                }
                if (sr.alpha <= 0.02) spinRings.splice(i, 1);
            }

            // 10. Cập nhật Tinh thể, Hạt, Tàn ảnh & Sóng xung kích
            clouds.forEach(c => {
                c.x -= c.speed * dt;
                if (c.x < -600) c.x = 2600;
            });

            for (let i = afterimages.length - 1; i >= 0; i--) {
                afterimages[i].alpha -= 0.048 * dt;
                if (afterimages[i].alpha <= 0.02) afterimages.splice(i, 1);
            }

            for (let i = speedLines.length - 1; i >= 0; i--) {
                const sl = speedLines[i];
                sl.x += sl.vx * dt;
                sl.alpha -= 0.065 * dt;
                if (sl.alpha <= 0.02) speedLines.splice(i, 1);
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const pt = particles[i];
                pt.x += pt.vx * dt;
                pt.y += pt.vy * dt;
                pt.vy += (pt.gravity || 0) * dt;
                pt.rotation += (pt.rotSpeed || 0) * dt;
                pt.radius *= Math.pow(0.97, dt);
                pt.alpha -= pt.decay * dt;
                if (pt.alpha <= 0.02) particles.splice(i, 1);
            }

            for (let i = shockwaves.length - 1; i >= 0; i--) {
                const sw = shockwaves[i];
                const step = (sw.maxRx - sw.rx) * 0.18 * dt + 2.2 * dt;
                sw.rx += step;
                sw.ry += sw.vertical ? step * 1.4 : step * (sw.ry < sw.rx * 0.5 ? 0.45 : 1);
                sw.alpha -= 0.045 * dt;
                if (sw.alpha <= 0.02) shockwaves.splice(i, 1);
            }

            for (let i = floatingTexts.length - 1; i >= 0; i--) {
                const ft = floatingTexts[i];
                ft.y += ft.vy * dt;
                ft.alpha -= 0.025 * dt;
                if (ft.alpha <= 0) floatingTexts.splice(i, 1);
            }

            updateStatusBadge();
        }
// PLAYER_PART_END s8.apexCreate.updateLooseObjects.1
}}

// index.html:105426 · Phạm vi: apexCreate
function __Part9(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.wallBudget.1 EDITABLE
let wallBudget=120,wallCooldown=0,wallRest=0,wallBreakAge=40;
// PLAYER_PART_END s8.apexCreate.wallBudget.1
}}

// index.html:105427 · Phạm vi: apexCreate
function __Part10(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.previous.1 EDITABLE
let previous={},dashHits=new Set(),leafClock=0,leafStage='',leafs=[],nativeMap=new Map();
// PLAYER_PART_END s8.apexCreate.previous.1
}}

// index.html:105438 · Phạm vi: apexCreate
function __Part11(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.syncTargets.1 EDITABLE
function syncTargets(){targets.length=0;for(const o of sgTargets(owner))targets.push({o,x:(o.x+o.w/2)/SCALE,y:(o.y+o.h/2)/SCALE,radius:Math.min(o.w,o.h)/2/SCALE,get hp(){return o.hp},vx:0,color:currentSkin.energyGlow});}
// PLAYER_PART_END s8.apexCreate.syncTargets.1
}}
