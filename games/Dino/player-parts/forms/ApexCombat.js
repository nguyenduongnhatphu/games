// PLAYER_FILE: ApexCombat
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: afterimages, apexColor, apexControl, apexLaunch, baseSpeed, dino, doChieu, doChieuCo, doChieuThu, keys, projectiles, sgDamage, sgSegmentBox
// index.html:101927 · Phạm vi: apexCreate
function __Part0(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.executeClawComboStep.1 EDITABLE
function executeClawComboStep(step) {
            if (dino.isLedgeClimbing || dino.isLedgeGrabbing || dino.isWallSliding) return;

            // Tự động hướng về phía mục tiêu gần nhất hoặc hướng chuột nếu đang đứng yên
            const dir = keys.left ? -1 : (keys.right ? 1 : dino.facing);
            dino.facing = dir;
            dino.meleeComboStep = step;
            dino.meleeComboResetTimer = 46; // Cửa sổ nối combo ~0.75 giây
            dino.meleeQueuedNext = false;

            if (step === 1) {
                // ĐÒN 1: Lunge Down-Slash (Tiếp cận nhanh)
                dino.meleeState = 'claw1';
                dino.meleeMaxTimer = 14;
                dino.meleeTimer = 14;
                dino.vx = dir * 13.5;
                dino.scaleX = 1.16;
                dino.scaleY = 0.88;
                dino.jawOpen = 0.5;
                dino.armStrikeAngle = -1.25;
                dino.armStrikeExtend = 1.35;

                slashArcs.push({
                    x: dino.x + dir * 56,
                    y: dino.y - 52,
                    dir: dir,
                    radiusX: 68,
                    radiusY: 54,
                    startAngle: -1.1,
                    endAngle: 0.85,
                    swingDown: true,
                    alpha: 1.0,
                    color: currentSkin.energyGlow,
                    coreColor: currentSkin.energyCore,
                    type: 'single'
                });

                damageTargetsInArea(dino.x + dir * 68, dino.y - 52, 82, 4, 2, dir * 5.5, '🐾 CÀO 1 ');
            } else if (step === 2) {
                // ĐÒN 2: Rising Cross-Claw (Cào vớt ngược từ dưới lên)
                dino.meleeState = 'claw2';
                dino.meleeMaxTimer = 14;
                dino.meleeTimer = 14;
                dino.vx = dir * 14.5;
                if (dino.isGrounded) dino.vy = -3.8;
                dino.scaleX = 0.90;
                dino.scaleY = 1.15;
                dino.jawOpen = 0.65;
                dino.armStrikeAngle = 0.95;
                dino.armStrikeExtend = 1.45;

                slashArcs.push({
                    x: dino.x + dir * 62,
                    y: dino.y - 56,
                    dir: dir,
                    radiusX: 74,
                    radiusY: 62,
                    startAngle: 0.95,
                    endAngle: -1.15,
                    swingDown: false,
                    alpha: 1.0,
                    color: currentSkin.energyArc,
                    coreColor: currentSkin.energyCore,
                    type: 'single'
                });

                damageTargetsInArea(dino.x + dir * 74, dino.y - 56, 86, 70, 2, dir * 6.5, '🐾 CÀO 2 ');
            } else if (step === 3) {
                // ĐÒN 3: Phantom Back-Step Slash (Chém xoáy rồi LƯỚT LÙI RA SAU để quấy rối & né đòn!)
                dino.meleeState = 'claw3_retreat';
                dino.meleeMaxTimer = 16;
                dino.meleeTimer = 16;
                // Lưu lại tàn ảnh tại vị trí chém trước khi bật lùi
                for (let g = 0; g < 2; g++) {
                    afterimages.push({
                        x: dino.x + dir * (g * 14),
                        y: dino.y,
                        facing: dir,
                        scaleX: 1.12,
                        scaleY: 0.9,
                        crouchBlend: dino.crouchBlend,
                        dashBlend: 0.5,
                        walkCycle: dino.walkCycle,
                        breathCycle: dino.breathCycle,
                        alpha: 0.65,
                        color: currentSkin.energyArc,
                        coreColor: currentSkin.energyCore
                    });
                }

                // Chém tại chỗ trước khi búng lùi
                slashArcs.push({
                    x: dino.x + dir * 58,
                    y: dino.y - 54,
                    dir: dir,
                    radiusX: 82,
                    radiusY: 46,
                    startAngle: -0.8,
                    endAngle: 0.9,
                    swingDown: true,
                    alpha: 1.0,
                    color: '#fde047',
                    coreColor: '#ffffff',
                    type: 'spin'
                });

                damageTargetsInArea(dino.x + dir * 65, dino.y - 54, 92, 68, 2, -dir * 4.0, '🌪️ LƯỚT LÙI ');

                // Vận tốc bật ngược ra sau + nhảy nhẹ tạo độ cơ động biến ảo
                dino.vx = -dir * 16.5;
                if (dino.isGrounded) {
                    dino.vy = -5.5;
                    dino.isGrounded = false;
                } else {
                    // Air follow-ups preserve vertical momentum.
                }
                dino.scaleX = 1.20;
                dino.scaleY = 0.84;
                dino.armStrikeAngle = -1.6;
                dino.armStrikeExtend = 1.4;

            } else if (step === 4) {
                // ĐÒN 4: Apex Re-Engage Finisher (Từ vị trí vừa lùi, PHÓNG VỌT TRỞ LẠI chém chữ X Kép cực mạnh!)
                dino.meleeState = 'claw4_reengage';
                dino.meleeMaxTimer = 19;
                dino.meleeTimer = 19;
                dino.vx = dir * 26.5; // Lao vọt tiếp cận ngược trở lại
                if(dino.isGrounded)dino.vy = 0;
                dino.scaleX = 1.32;
                dino.scaleY = 0.78;
                dino.jawOpen = 1.0;
                dino.chargePulse = 1.0;
                dino.fireGlowTimer = 20;
                dino.armStrikeAngle = -0.35;
                dino.armStrikeExtend = 1.65;

                // Tạo chuỗi tàn ảnh khi lao vọt trở lại
                for (let g = 0; g < 3; g++) {
                    afterimages.push({
                        x: dino.x + dir * (g * 22),
                        y: dino.y,
                        facing: dir,
                        scaleX: 1.25,
                        scaleY: 0.8,
                        crouchBlend: 0.3,
                        dashBlend: 0.9,
                        walkCycle: dino.walkCycle,
                        breathCycle: dino.breathCycle,
                        alpha: 0.7 - g * 0.15,
                        color: currentSkin.energyGlow,
                        coreColor: currentSkin.energyCore
                    });
                }

                slashArcs.push({
                    x: dino.x + dir * 92,
                    y: dino.y - 54,
                    dir: dir,
                    radiusX: 105,
                    radiusY: 78,
                    startAngle: -1.2,
                    endAngle: 1.2,
                    swingDown: true,
                    alpha: 1.0,
                    color: currentSkin.energyGlow,
                    coreColor: '#ffffff',
                    type: 'cross_x'
                });

                shockwaves.push({
                    x: dino.x + dir * 85,
                    y: dino.y - 52,
                    rx: 14,
                    ry: 42,
                    maxRx: 78,
                    alpha: 1.0,
                    color: currentSkin.energyCore,
                    lineWidth: 5,
                    vertical: true
                });

                damageTargetsInArea(dino.x + dir * 95, dino.y - 54, 118, 85, 6, dir * 12.0, '⚡ KẾT LIỄU X-CLAW ');
            }

            comboBadge.textContent = `Combo Cào ${step}/4`;
        }
// PLAYER_PART_END s8.apexCreate.executeClawComboStep.1
}}

// index.html:102113 · Phạm vi: apexCreate
function __Part1(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.executeChargedBite.1 EDITABLE
function executeChargedBite() {
            if (dino.isLedgeClimbing || dino.isLedgeGrabbing) return;
            const dir = keys.left ? -1 : (keys.right ? 1 : dino.facing);
            dino.facing = dir;
            dino.meleeState = 'bite_lunge';
            dino.meleeQueuedNext=false;dino.meleeComboStep=0;
            dino.meleeMaxTimer = 22;
            dino.meleeTimer = 22;
            dino.meleeComboStep = 0;

            dino.vx = dir * 22.5;

            dino.scaleX = 1.28;
            dino.scaleY = 0.82;
            dino.jawOpen = 1.45;
            dino.chargePulse = 1.0;
            dino.fireGlowTimer = 26;

            // Offset +115px về phía trước tính từ tâm Khủng long (tức là nằm hẳn phía trước đầu & mõm 55px)
            const forwardOffset = 115;
            const biteCenterX = dino.x + dir * forwardOffset;
            const biteCenterY = dino.y - 54;

            bitePhantoms.push({
                x: biteCenterX,
                y: biteCenterY,
                dir: dir,
                followDino: true,
                offsetX: forwardOffset,
                offsetY: -54,
                scale: 1.08,
                progress: 0,
                damageDealt: false,
                alpha: 1.0,
                color: '#f43f5e',
                glowColor: currentSkin.energyGlow,
                coreColor: '#fef08a'
            });

            shockwaves.push({
                x: biteCenterX,
                y: biteCenterY,
                rx: 18,
                ry: 18,
                maxRx: 110,
                alpha: 1.0,
                color: '#f43f5e',
                lineWidth: 6
            });

            comboBadge.textContent = '🦷 CẮN XÉ CRUNCH!';
        }
// PLAYER_PART_END s8.apexCreate.executeChargedBite.1
}}

// index.html:102165 · Phạm vi: apexCreate
function __Part2(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.executeAirBuzzsaw.1 EDITABLE
function executeAirBuzzsaw() {
            if (dino.isLedgeClimbing || dino.isLedgeGrabbing) return;
            const dir = keys.left ? -1 : (keys.right ? 1 : dino.facing);
            dino.facing = dir;
            dino.meleeState = 'air_saw_spin';
            dino.meleeQueuedNext=false;dino.meleeComboStep=0;
            dino.meleeMaxTimer = 32;
            dino.meleeTimer = 32;
            dino.meleeSubTick = 0;
            dino.sawSpinAngle = 0;

            // Giữ lơ lửng và lao chéo về phía trước như một lưỡi cưa bay
            dino.vx = dir * 11.5;
            // No extra lift from an aerial saw.
            dino.chargePulse = 1.0;
            dino.fireGlowTimer = 34;

            shockwaves.push({
                x: dino.x,
                y: dino.y - 48,
                rx: 25,
                ry: 25,
                maxRx: 98,
                alpha: 1.0,
                color: currentSkin.energyGlow,
                lineWidth: 5
            });

            comboBadge.textContent = '⚙️ LƯỠI CƯA VÂY LƯNG!';
        }
// PLAYER_PART_END s8.apexCreate.executeAirBuzzsaw.1
}}

// index.html:102195 · Phạm vi: apexCreate
function __Part3(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.executeAirSlash.1 EDITABLE
function executeAirSlash() {
            const dir = keys.left ? -1 : (keys.right ? 1 : dino.facing);
            dino.facing = dir;
            dino.meleeState = 'air_slash';
            dino.meleeQueuedNext=false;dino.meleeComboStep=0;
            dino.meleeMaxTimer = 15;
            dino.meleeTimer = 15;
            dino.meleeComboResetTimer = 42;

            dino.vx = dir * 12.5;
            // Air slash cannot reset falling velocity.
            dino.airSpinAngle = -0.45;
            dino.armStrikeAngle = -1.1;
            dino.armStrikeExtend = 1.45;
            dino.jawOpen = 0.65;

            slashArcs.push({
                x: dino.x + dir * 64,
                y: dino.y - 52,
                dir: dir,
                radiusX: 78,
                radiusY: 68,
                startAngle: -1.2,
                endAngle: 1.1,
                swingDown: true,
                alpha: 1.0,
                color: currentSkin.energyArc,
                coreColor: '#ffffff',
                type: 'single'
            });

            damageTargetsInArea(dino.x + dir * 70, dino.y - 52, 88, 76, 2, dir * 6.5, '🦅 KHÔNG TRẢO ');
            comboBadge.textContent = '🦅 Chém Không Trung';
        }
// PLAYER_PART_END s8.apexCreate.executeAirSlash.1
}}

// index.html:102229 · Phạm vi: apexCreate
function __Part4(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.executeDashTailSpin.1 EDITABLE
function executeDashTailSpin() {
            const dir = keys.left ? -1 : (keys.right ? 1 : dino.facing);
            dino.facing = dir;
            dino.dashTimer = 0;
            dino.postDashSlashWindow = 0;
            dino.meleeState = 'dash_tail_spin';
            dino.meleeQueuedNext=false;dino.meleeComboStep=0;
            dino.meleeMaxTimer = 26;
            dino.meleeTimer = 26;
            dino.meleeSubTick = 0;
            dino.tailSpinPhase = 0;

            dino.vx = dir * 16.5;
            dino.chargePulse = 1.0;
            dino.fireGlowTimer = 26;

            // Tạo 2 vòng lốc xoáy ngang đồng tâm từ chiếc đuôi quất 2 vòng
            spinRings.push({
                x: dino.x,
                y: dino.y - 44,
                rx: 125,
                ry: 36,
                rotation: 0,
                alpha: 1.0,
                color: currentSkin.energyGlow,
                coreColor: currentSkin.energyCore,
                type: 'double_tail_vortex'
            });

            comboBadge.textContent = '🌪️ DASH-CHÉM: LỐC ĐUÔI 2 VÒNG!';
        }
// PLAYER_PART_END s8.apexCreate.executeDashTailSpin.1
}}

// index.html:102260 · Phạm vi: apexCreate
function __Part5(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.executeCrocodileDeathRoll.1 EDITABLE
function executeCrocodileDeathRoll() {
            const dir = keys.left ? -1 : (keys.right ? 1 : dino.facing);
            dino.facing = dir;
            dino.dashTimer = 0;
            dino.slashDashChainTimer = 0;
            dino.postDashSlashWindow = 0;
            dino.meleeState = 'death_roll';
            dino.rollHits=new Map();dino.apexRollFinish=false;dino.postDashSlashWindow=0;dino.meleeQueuedNext=false;dino.meleeComboResetTimer=0;
            dino.meleeMaxTimer = 34;
            dino.meleeTimer = 34;
            dino.meleeSubTick = 0;
            dino.deathRollPhase = 0;

            dino.vx = dir * 22.0;
            // Air roll preserves falling velocity.
            dino.jawOpen = 1.2;
            dino.chargePulse = 1.0;
            dino.fireGlowTimer = 36;

            comboBadge.textContent = 'XOAY TỬ THẦN · J: ĐÒN KẾT';
        }
// PLAYER_PART_END s8.apexCreate.executeCrocodileDeathRoll.1
}}

// index.html:102281 · Phạm vi: apexCreate
function __Part6(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.executeCrouchClampBite.1 EDITABLE
function executeCrouchClampBite() {
            const dir = keys.left ? -1 : (keys.right ? 1 : dino.facing);
            dino.facing = dir;
            dino.meleeState = 'crouch_clamp_bite';
            dino.meleeQueuedNext=false;dino.meleeComboStep=0;
            dino.meleeMaxTimer = 24;
            dino.meleeTimer = 24;
            dino.meleeSubTick = 0;
            dino.meleeComboStep = 0;

            dino.vx = dir * 14.5;
            dino.armStrikeAngle = -0.15;
            dino.armStrikeExtend = 1.85;
            dino.jawOpen = 0.95;
            dino.chargePulse = 0.9;

            // Hiệu ứng 2 cánh tay năng lượng hóa thành Hàm Kẹp Gọng Kìm (Pincer Clamp) phía trước
            pincerClamps.push({
                x: dino.x + dir * 88,
                y: dino.y - 36,
                dir: dir,
                offsetX: 88,
                offsetY: -36,
                progress: 0,
                alpha: 1.0,
                color: currentSkin.energyArc,
                coreColor: '#ffffff'
            });

            // Nhịp 1: Hai tay kẹp gọng kìm gây sát thương và kéo nhẹ mục tiêu vào tầm miệng
            damageTargetsInArea(dino.x + dir * 88, dino.y - 38, 95, 4, 4, -dir * 3.5, '🦀 KẸP GỌNG KÌM ');
            comboBadge.textContent = '🦀 CÚI: KẸP TAY & CẮN TỚI!';
        }
// PLAYER_PART_END s8.apexCreate.executeCrouchClampBite.1
}}

// index.html:102314 · Phạm vi: apexCreate
function __Part7(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.triggerPrimaryMeleeAction.1 EDITABLE
function triggerPrimaryMeleeAction() {
            if (dino.isLedgeClimbing || dino.isLedgeGrabbing || dino.isWallSliding) return;

            // ƯU TIÊN 1: Tổ hợp CHÉM -> DASH -> CHÉM (Khi vừa Dash hủy đòn Chém) -> Cú Xoay Tử Thần Cá Sấu!
            if (dino.slashDashChainTimer > 0) {
                executeCrocodileDeathRoll();
                return;
            }

            // ƯU TIÊN 2: Tổ hợp DASH -> CHÉM (Khi đang Dash hoặc vừa kết thúc Dash) -> Lốc Xoáy Đuôi 2 Vòng Ngang!
            if (dino.dashTimer > 0 || dino.postDashSlashWindow > 0) {
                executeDashTailSpin();
                return;
            }

            // ƯU TIÊN 3: Đang CÚI NGƯỜI dưới đất (Giữ S + J) -> Dùng 2 tay tạo hàm kẹp rồi dùng miệng cắn tới!
            if (keys.down && dino.isGrounded) {
                executeCrouchClampBite();
                return;
            }

            if(dino.meleeComboStep===3&&dino.meleeComboResetTimer>0){
                if(dino.meleeState==='claw3_retreat'&&dino.meleeTimer>4)dino.meleeQueuedNext=true;
                else executeClawComboStep(4);
                return;
            }
            // ƯU TIÊN 4: Đang ở TRÊN KHÔNG -> Chém Xoáy Không Trung!
            if (!dino.isGrounded) {
                executeAirSlash();
                return;
            }

            // ƯU TIÊN 5: Combo 4 Đòn Cào Cơ Động trên mặt đất
            if (dino.meleeState !== 'none' && dino.meleeTimer > 4) {
                dino.meleeQueuedNext = true;
            } else {
                const nextStep = (dino.meleeComboResetTimer > 0) ? (dino.meleeComboStep % 4) + 1 : 1;
                executeClawComboStep(nextStep);
            }
        }
// PLAYER_PART_END s8.apexCreate.triggerPrimaryMeleeAction.1
}}

// index.html:102354 · Phạm vi: apexCreate
function __Part8(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.startMeleePress.1 EDITABLE
function startMeleePress() {
            if (dino.meleeHolding || dino.isLedgeClimbing) return;
            if(dino.meleeState==='death_roll'){
                dino.meleeHolding=true;dino.meleeBiteTriggered=true;
                if(!dino.apexRollFinish){dino.apexRollFinish=true;dino.meleeSubTick=0;dino.meleeTimer=10;dino.meleeMaxTimer=10;comboBadge.textContent='J · ĐÒN KẾT';}
                return;
            }
            dino.meleeHolding = true;
            dino.meleeHoldSec = 0;
            dino.meleeBiteTriggered = false;

            // Nếu đang trong cửa sổ Chém-Dash-Chém hoặc Dash-Chém hoặc Đang Cúi thì tung chiêu ngay lập tức cho nhạy!
            if (dino.slashDashChainTimer > 0 || dino.dashTimer > 0 || dino.postDashSlashWindow > 0 || (keys.down && dino.isGrounded)) {
                dino.meleeBiteTriggered = true;
                triggerPrimaryMeleeAction();
            }
        }
// PLAYER_PART_END s8.apexCreate.startMeleePress.1
}}

// index.html:102371 · Phạm vi: apexCreate
function __Part9(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.releaseMeleePress.1 EDITABLE
function releaseMeleePress() {
            if (!dino.meleeHolding) return;
            const heldSec = dino.meleeHoldSec;
            dino.meleeHolding = false;
            dino.meleeHoldSec = 0;

            if (dino.meleeBiteTriggered) {
                dino.meleeBiteTriggered = false;
                return;
            }

            if (heldSec < 0.28) {
                triggerPrimaryMeleeAction();
            }
        }
// PLAYER_PART_END s8.apexCreate.releaseMeleePress.1
}}

// index.html:102433 · Phạm vi: apexCreate
function __Part10(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.startRangedCharge.1 EDITABLE
function startRangedCharge() {
            if(apexColor===4&&(obelith.beam||fireObelithBeam()))return;
            if (dino.rangedCharging || dino.laserActiveSec > 0 || dino.isLedgeClimbing) return;
            dino.rangedCharging = true;
            dino.rangedChargeSec = 0;
            dino.rangedLastMilestone = 0;
        }
// PLAYER_PART_END s8.apexCreate.startRangedCharge.1
}}

// index.html:102440 · Phạm vi: apexCreate
function __Part11(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.releaseRangedCharge.1 EDITABLE
function releaseRangedCharge(targetWorldX, targetWorldY) {
            if(dino.apexChannel){dino.apexChannel=false;dino.rangedCharging=false;dino.rangedChargeSec=0;dino.laserActiveSec=0;return;}
            if (!dino.rangedCharging) return;
            const chargeSec = Math.round(dino.rangedChargeSec * 60) / 60;
            dino.rangedCharging = false;
            dino.rangedChargeSec = 0;
            updateChargeUI();

            const { spawnX, spawnY, angle, effectiveFacing } = getMouthWorldPositionAndAngle(
                targetWorldX !== undefined ? targetWorldX : (mouse.active ? mouse.x : undefined),
                targetWorldY !== undefined ? targetWorldY : (mouse.active ? mouse.y : undefined)
            );

            // CẤP ĐỘ TỐI THƯỢNG (>= 2.0 GIÂY): ĐẠI PHÁO TIA LASER KÉO DÀI 2 GIÂY!
            if (chargeSec >= 2.0) {
                dino.laserActiveSec = dino.laserMaxSec;dino.apexLaserTick=0;
                dino.laserAngle = angle;
                dino.jawOpen = 1.35;
                dino.recoilOffset = 16;
                dino.chargePulse = 1.0;
                dino.fireGlowTimer = 120;

                shockwaves.push({
                    x: spawnX,
                    y: spawnY,
                    rx: 16,
                    ry: 36,
                    maxRx: 95,
                    alpha: 1.0,
                    color: '#ffffff',
                    lineWidth: 6,
                    vertical: true
                });
                updateChargeUI();
                return;
            }

            // CẤP ĐỘ 1.5 GIÂY -> < 2.0 GIÂY: CẦU HÀNH TINH & VỆ TINH XOẮN LÒ XO VŨ TRỤ (HELICAL PLANETARY SYSTEM)
            if (chargeSec >= 1.5) {
                const speed = 13.5;
                projectiles.push({
                    x: spawnX,
                    y: spawnY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    gravity: 0,
                    radius: 25,
                    damage: apexColor===0?6:5, skin:apexColor, spinLimit:apexColor===0?18:15, spinTickDamage:apexColor===0?2:1,
                    coreColor: '#ffffff',
                    glowColor: currentSkin.energyGlow,
                    arcColor: '#fde047',
                    rotation: 0,
                    life: 185,
                    type: 'helical_planet',
                    travelDist: 0,
                    satellites: [
                        { phaseOffset: 0, trail: [] },
                        { phaseOffset: (Math.PI * 2) / 3, trail: [] },
                        { phaseOffset: (Math.PI * 4) / 3, trail: [] }
                    ]
                });

                dino.jawOpen = 1.25;
                dino.recoilOffset = 15;
                dino.chargePulse = 1.0;
                dino.fireGlowTimer = 28;

            } else {
                // CẤP ĐỘ 0.0s -> < 1.5s: TÍNH TOÁN ĐỘ CONG TRỌNG LỰC & SỐ TIA PHỤ MỖI 0.25 GIÂY
                const straightness = Math.min(1, chargeSec / 0.5);
                // Khi nhấp bắn ngay (0s): trọng lực = 0.40 đè viên đạn cong xuống rõ rệt; càng giữ gần 0.5s càng thẳng, >= 0.5s là thẳng tuyệt đối (gravity = 0)
                const projGravity = (1 - straightness) * 0.40;
                const baseSpeed = 13.5 + straightness * 5.2;
                // Khi bắn đạn cong (<0.5s), hơi nâng nhẹ góc nòng 1 chút để tạo đường vòng cung parabol đẹp mắt
                const launchAngle = angle - (1 - straightness) * effectiveFacing * 0.14;

                projectiles.push({
                    x: spawnX,
                    y: spawnY,
                    vx: Math.cos(launchAngle) * baseSpeed,
                    vy: Math.sin(launchAngle) * baseSpeed,
                    gravity: projGravity,
                    radius: 13 + straightness * 5,
                    damage: (chargeSec < .25 ? 1 : 2)+(apexColor===0?1:0), skin:apexColor,
                    coreColor: currentSkin.energyCore,
                    glowColor: currentSkin.energyGlow,
                    arcColor: currentSkin.energyArc,
                    rotation: 0,
                    life: 155,
                    type: 'standard'
                });

                // Sau mốc 0.5s, mỗi 0.25s thêm các tia phụ nhỏ (0.75s -> 2 tia, 1.0s -> 3 tia, 1.25s -> 4 tia)
                let subBeamCount = 0;
                if (chargeSec >= 1.25) subBeamCount = apexColor===0?5:3;
                else if (chargeSec >= 1.00) subBeamCount = 3;
                else if (chargeSec >= 0.75) subBeamCount = 2;

                for (let s = 0; s < subBeamCount; s++) {
                    const spreadIndex = s - (subBeamCount - 1) * 0.5;
                    const subAngle = angle + spreadIndex * 0.13;
                    const subSpeed = baseSpeed * 1.06;
                    projectiles.push({
                        x: spawnX,
                        y: spawnY,
                        vx: Math.cos(subAngle) * subSpeed,
                        vy: Math.sin(subAngle) * subSpeed,
                        gravity: 0,
                        radius: 8.5,
                        damage: 2,
                        coreColor: '#ffffff',
                        glowColor: currentSkin.energyArc,
                        arcColor: currentSkin.energyGlow,
                        rotation: 0,
                        life: 135,
                        type: 'sub_beam',
                        trail: []
                    });
                }

                dino.jawOpen = 1.05;
                dino.recoilOffset = 10 + subBeamCount * 1.5;
                dino.chargePulse = 0.85;
                dino.fireGlowTimer = 20;

            }

            if (dino.dashTimer <= 0 && !dino.isWallSliding && !dino.isLedgeGrabbing) {
                dino.vx -= effectiveFacing * 1.8;
            }

            shockwaves.push({
                x: spawnX,
                y: spawnY,
                rx: 8,
                ry: 16,
                maxRx: 44,
                alpha: 0.9,
                color: currentSkin.energyCore,
                lineWidth: 3.5,
                vertical: true
            });

            spawnParticles(spawnX, spawnY, 14, {
                spreadVx: 5,
                spreadVy: 5,
                baseVy: 0,
                minRadius: 2.5,
                maxRadius: 6.5,
                color: currentSkin.energyGlow,
                glow: true,
                gravity: 0.02,
                decay: 0.045
            });
        }
// PLAYER_PART_END s8.apexCreate.releaseRangedCharge.1
}}

// index.html:105425 · Phạm vi: apexCreate
function __Part12(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.hitTarget.1 EDITABLE
function hitTarget(t,amount){return t.o?sgDamage(owner,t.o,amount+magmaBonus(),'apex'):0;}
// PLAYER_PART_END s8.apexCreate.hitTarget.1
}}

// index.html:105426 · Phạm vi: apexCreate
function __Part13(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.damageTargetsInArea.1 EDITABLE
function damageTargetsInArea(x,y,rx,ry,damage,kb,label=''){
  if(apexColor===1){damage+=1;rx*=1.2*magmaReach();ry*=1.2*magmaReach();}
  let count=0;const box={x:(x-rx)*SCALE,y:(y-ry)*SCALE,w:rx*2*SCALE,h:ry*2*SCALE};
  doChieuThu({},box,damage);
  for(const t of targets){const o=t.o;if(!o||o.hp<=0)continue;const nx=Math.max(o.x,Math.min(x*SCALE,o.x+o.w)),ny=Math.max(o.y,Math.min(y*SCALE,o.y+o.h));
   if(((nx-x*SCALE)/(rx*SCALE))**2+((ny-y*SCALE)/(ry*SCALE))**2<=1){const dealt=hitTarget(t,damage);if(dealt>0&&apexColor===2){if(dino.meleeState==='dash_tail_spin')apexControl(o,6);if(label.includes('360'))apexControl(o,6,dino.facing*8);}count++;}}
  return count;
 }
// PLAYER_PART_END s8.apexCreate.damageTargetsInArea.1
}}

// index.html:105452 · Phạm vi: apexCreate
function __Part14(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.jumpAttack.1 EDITABLE
function jumpAttack(){
  if(dino.meleeState==='death_roll'&&(dino.isGrounded||dino.jumpsLeft>0)){triggerJump();startTailRise();return;}

  const canJump=dino.isGrounded||dino.jumpsLeft>0||dino.isWallSliding||dino.isLedgeGrabbing;
  const traversal=dino.isWallSliding||dino.isLedgeGrabbing||dino.isLedgeClimbing;
  const pending=dino.meleeHolding&&!dino.meleeBiteTriggered;
  const claw=['claw1','claw2','claw3_retreat','claw4_reengage','air_slash'].includes(dino.meleeState)||dino.meleeComboResetTimer>20;
  if(canJump&&!traversal&&pending){triggerPrimaryMeleeAction();dino.meleeBiteTriggered=true;}
  triggerJump();
  if(canJump&&!traversal&&(pending||claw)&&!dino.isGrounded){startTailRise();if(dino.meleeHolding)dino.meleeBiteTriggered=true;}
 }
// PLAYER_PART_END s8.apexCreate.jumpAttack.1
}}

// index.html:105463 · Phạm vi: apexCreate
function __Part15(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.rise.1 EDITABLE
let rise=null;
// PLAYER_PART_END s8.apexCreate.rise.1
}}

// index.html:105466 · Phạm vi: apexCreate
function __Part16(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.startTailRise.1 EDITABLE
function startTailRise(){dino.meleeState='tail_rise';dino.meleeTimer=dino.meleeMaxTimer=26;dino.meleeComboStep=0;dino.meleeComboResetTimer=0;dino.meleeQueuedNext=false;dino.riseAngle=0;dino.vx=dino.facing*4;dino.airSpinAngle=0;rise={hit:new Set(),prev:tailPoints(),trail:[],source:{}};comboBadge.textContent='J → NHẢY · ĐUÔI HẤT TUNG';}
// PLAYER_PART_END s8.apexCreate.startTailRise.1
}}

// index.html:105467 · Phạm vi: apexCreate
function __Part17(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.tickTailRise.1 EDITABLE
function tickTailRise(){if(!rise)return;if(dino.meleeState!=='tail_rise'){rise=null;return;}dino.riseAngle=-Math.PI*2*Math.pow(1-dino.meleeTimer/26,.55);const pts=tailPoints(),segments=[];
  for(let i=1;i<pts.length;i++)segments.push([pts[i-1],pts[i]]);for(let i=0;i<pts.length;i++)segments.push([rise.prev[i],pts[i]]);
  for(const [a,b] of segments){const x=a.x*SCALE,y=a.y*SCALE,xx=b.x*SCALE,yy=b.y*SCALE;
   if(doChieuCo()&&sgSegmentBox(x,y,xx,yy,doChieu,8)!==null)doChieuThu(rise.source,{x:Math.min(x,xx)-8,y:Math.min(y,yy)-8,w:Math.abs(xx-x)+16,h:Math.abs(yy-y)+16},4);
   for(const t of targets){if(rise.hit.has(t.o)||sgSegmentBox(x,y,xx,yy,t.o,8)===null)continue;rise.hit.add(t.o);if(sgDamage(owner,t.o,(apexColor===1?5:4)+magmaBonus(),'apex')>0){apexLaunch(t.o);if(apexColor===2)apexControl(t.o,12);}}}
  rise.prev=pts;rise.trail.push(pts[pts.length-1]);if(rise.trail.length>10)rise.trail.shift();
 }
// PLAYER_PART_END s8.apexCreate.tickTailRise.1
}}
