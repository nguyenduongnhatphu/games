// PLAYER_FILE: ApexCore
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: APEX_SKINS, APEX_VARIANT_LABELS, FloatingText, apexActive, apexColor, apexHostileRounds, apexSetColor, canvas, checkAABB, ctx, dkNenY, frames, paused, sgDamage, sgSegmentBox
// index.html:101353 · Phạm vi: apexCreate
function __Part0(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.SCALE.1 EDITABLE
const SCALE=.55, width=canvas.width/SCALE,height=canvas.height/SCALE;
// PLAYER_PART_END s8.apexCreate.SCALE.1
}}

// index.html:101354 · Phạm vi: apexCreate
function __Part1(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.groundY.1 EDITABLE
let groundY=dkNenY()/SCALE,currentSkin=APEX_SKINS[apexColor],isSlowMo=false,isNightMode=true,showHitbox=false;
// PLAYER_PART_END s8.apexCreate.groundY.1
}}

// index.html:101355 · Phạm vi: apexCreate
function __Part2(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.comboBadge.1 EDITABLE
const comboBadge={textContent:''};
// PLAYER_PART_END s8.apexCreate.comboBadge.1
}}

// index.html:101357 · Phạm vi: apexCreate
function __Part3(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.destroyTargetAtIndex.1 EDITABLE
function destroyTargetAtIndex(){}
// PLAYER_PART_END s8.apexCreate.destroyTargetAtIndex.1
}}

// index.html:101358 · Phạm vi: apexCreate
function __Part4(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.keys.1 EDITABLE
const keys = {
            left: false,
            right: false,
            down: false
        };
// PLAYER_PART_END s8.apexCreate.keys.1
}}

// index.html:101363 · Phạm vi: apexCreate
function __Part5(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.lastTapTime.1 EDITABLE
const lastTapTime = {
            left: 0,
            right: 0
        };
// PLAYER_PART_END s8.apexCreate.lastTapTime.1
}}

// index.html:101367 · Phạm vi: apexCreate
function __Part6(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.DOUBLE_TAP_WINDOW.1 EDITABLE
const DOUBLE_TAP_WINDOW = 260;
// PLAYER_PART_END s8.apexCreate.DOUBLE_TAP_WINDOW.1
}}

// index.html:101369 · Phạm vi: apexCreate
function __Part7(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.mouse.1 EDITABLE
const mouse = {
            screenX: width * 0.75,
            screenY: height * 0.55,
            x: 0,
            y: 0,
            active: false
        };
// PLAYER_PART_END s8.apexCreate.mouse.1
}}

// index.html:101377 · Phạm vi: apexCreate
function __Part8(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.camera.1 EDITABLE
const camera = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0
        };
// PLAYER_PART_END s8.apexCreate.camera.1
}}

// index.html:101383 · Phạm vi: apexCreate
function __Part9(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.screenShake.1 EDITABLE
let screenShake = 0;
// PLAYER_PART_END s8.apexCreate.screenShake.1
}}

// index.html:101385 · Phạm vi: apexCreate
function __Part10(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.dino.1 EDITABLE
const dino = {
            x: 420,
            y: groundY,
            vx: 0,
            vy: 0,
            speed: 8.8,
            crouchSpeed: 4.6,
            jumpForce: -16.5,
            doubleJumpForce: -15.5,
            gravity: 0.68,
            facing: 1,
            visualScaleX: 1,
            scaleX: 1,
            scaleY: 1,
            isGrounded: true,
            isCrouching: false,
            crouchBlend: 0,
            jumpsLeft: 2,
            maxJumps: 2,
            airSpinAngle: 0,

            // Hệ thống Dash
            dashTimer: 0,
            dashMaxDuration: 13,
            dashCooldown: 0,
            dashMaxCooldown: 46,
            dashDir: 1,
            dashSpeed: 24.5,
            dashBlend: 0,

            // Hệ thống Trượt Tường & Nhảy Tường (Megaman Wall Slide & Wall Kick)
            isWallSliding: false,
            wallDir: 0,
            wallSlideBlend: 0,
            wallJumpLockTimer: 0,
            activePlatform: null,

            // Hệ thống Bám Mép Đá & Leo Lên (Ledge Grab, Climb & Look-Back)
            isLedgeGrabbing: false,
            ledgeSide: 0,
            ledgeLookDir: 0,
            ledgeLookBlend: 1,
            ledgeBlend: 0,
            ledgePlatform: null,
            ledgeCornerX: 0,
            ledgeCornerY: 0,
            ledgeIgnoreTimer: 0,

            isLedgeClimbing: false,
            ledgeClimbProgress: 0,
            climbStartX: 0,
            climbStartY: 0,
            climbTargetX: 0,
            climbTargetY: 0,

            // HỆ THỐNG CẬN CHIẾN NÂNG CAO: COMBO 4 ĐÒN, DASH-CHÉM, CHÉM-DASH-CHÉM, CƯA LƯNG TRÊN KHÔNG & CÚI KẸP CẮN
            meleeHolding: false,
            meleeHoldSec: 0,
            meleeBiteTriggered: false,
            meleeComboStep: 0,          // 1 -> 4
            meleeComboResetTimer: 0,    // Thời gian giữ chuỗi combo (frames)
            meleeState: 'none',         // 'none', 'claw1'..'claw4_reengage', 'bite_charge', 'bite_lunge', 'dash_tail_spin', 'death_roll', 'air_slash', 'air_saw_spin', 'crouch_clamp_bite'
            meleeTimer: 0,
            meleeMaxTimer: 1,
            meleeSubTick: 0,            // Bộ đếm phụ để gây sát thương nhiều nhịp (Multi-hit) cho Lốc Đuôi, Cá Sấu Xoay & Cưa Lưng
            meleeQueuedNext: false,
            meleeBlend: 0,
            armStrikeAngle: 0,
            armStrikeExtend: 0,

            // Trạng thái chuyển tiếp Chém -> Dash -> Chém & Biến형 cơ thể khi tung tuyệt kỹ
            slashDashChainTimer: 0,     // > 0 khi vừa Dash hủy đòn Chém (Sẵn sàng tung Chém-Dash-Chém: Cá Sấu Xoay)
            postDashSlashWindow: 0,     // Cửa sổ ngắn sau khi Dash để vẫn nhận tổ hợp Dash-Chém
            deathRollPhase: 0,          // Góc xoay trục ngang (Barrel Roll) của đòn Cá Sấu Xoay
            tailSpinPhase: 0,           // Góc xoay ngang 2 vòng quất đuôi của đòn Dash-Chém
            sawSpinAngle: 0,            // Góc cuộn tròn lưỡi cưa vây lưng trên không

            // HỆ THỐNG ĐÁNH XA TỤ LỰC 6 CẤP & LASER 2 GIÂY (K / CHUỘT PHẢI)
            rangedCharging: false,
            rangedChargeSec: 0,         // Tính bằng giây thực tế (0.0s -> 2.0s+)
            rangedLastMilestone: 0,
            laserActiveSec: 0,          // Khi >= 0: đang khạc đại pháo Laser kéo dài 2.0 giây
            laserMaxSec: 2.0,
            laserAngle: 0,

            // Hoạt ảnh cơ sinh học mượt
            walkCycle: 0,
            moveBlend: 0,
            breathCycle: 0,
            jawOpen: 0,
            headPitch: 0,
            recoilOffset: 0,
            chargePulse: 0,
            fireGlowTimer: 0,
            blinkTimer: 0,
            isBlinking: false,
            tailAngles: [0, 0, 0, 0, 0]
        };
// PLAYER_PART_END s8.apexCreate.dino.1
}}

// index.html:101484 · Phạm vi: apexCreate
function __Part11(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.platforms.1 EDITABLE
const platforms = [];
// PLAYER_PART_END s8.apexCreate.platforms.1
}}

// index.html:101485 · Phạm vi: apexCreate
function __Part12(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.projectiles.1 EDITABLE
const projectiles = [];
// PLAYER_PART_END s8.apexCreate.projectiles.1
}}

// index.html:101486 · Phạm vi: apexCreate
function __Part13(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.slashArcs.1 EDITABLE
const slashArcs = [];
// PLAYER_PART_END s8.apexCreate.slashArcs.1
}}

// index.html:101487 · Phạm vi: apexCreate
function __Part14(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.bitePhantoms.1 EDITABLE
const bitePhantoms = [];
// PLAYER_PART_END s8.apexCreate.bitePhantoms.1
}}

// index.html:101488 · Phạm vi: apexCreate
function __Part15(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.pincerClamps.1 EDITABLE
const pincerClamps = [];
// PLAYER_PART_END s8.apexCreate.pincerClamps.1
}}

// index.html:101489 · Phạm vi: apexCreate
function __Part16(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.spinRings.1 EDITABLE
const spinRings = [];
// PLAYER_PART_END s8.apexCreate.spinRings.1
}}

// index.html:101490 · Phạm vi: apexCreate
function __Part17(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.particles.1 EDITABLE
const particles = [];
// PLAYER_PART_END s8.apexCreate.particles.1
}}

// index.html:101491 · Phạm vi: apexCreate
function __Part18(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.shockwaves.1 EDITABLE
const shockwaves = [];
// PLAYER_PART_END s8.apexCreate.shockwaves.1
}}

// index.html:101492 · Phạm vi: apexCreate
function __Part19(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.speedLines.1 EDITABLE
const speedLines = [];
// PLAYER_PART_END s8.apexCreate.speedLines.1
}}

// index.html:101493 · Phạm vi: apexCreate
function __Part20(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.afterimages.1 EDITABLE
const afterimages = [];
// PLAYER_PART_END s8.apexCreate.afterimages.1
}}

// index.html:101494 · Phạm vi: apexCreate
function __Part21(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.targets.1 EDITABLE
const targets = [];
// PLAYER_PART_END s8.apexCreate.targets.1
}}

// index.html:101495 · Phạm vi: apexCreate
function __Part22(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.floatingTexts.1 EDITABLE
const floatingTexts = [];
// PLAYER_PART_END s8.apexCreate.floatingTexts.1
}}

// index.html:101497 · Phạm vi: apexCreate
function __Part23(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.stars.1 EDITABLE
const stars = [];
// PLAYER_PART_END s8.apexCreate.stars.1
}}

// index.html:101498 · Phạm vi: apexCreate
function __Part24(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.clouds.1 EDITABLE
const clouds = [];
// PLAYER_PART_END s8.apexCreate.clouds.1
}}

// index.html:101499 · Phạm vi: apexCreate
function __Part25(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.groundDetails.1 EDITABLE
const groundDetails = [];
// PLAYER_PART_END s8.apexCreate.groundDetails.1
}}

// index.html:101500 · Phạm vi: apexCreate
function __Part26(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.distantPillars.1 EDITABLE
const distantPillars = [];
// PLAYER_PART_END s8.apexCreate.distantPillars.1
}}

// index.html:101502 · Phạm vi: apexCreate
function __Part27(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.damp.1 EDITABLE
function damp(current, target, lambda, dt) {
            return current + (target - current) * (1 - Math.exp(-lambda * dt));
        }
// PLAYER_PART_END s8.apexCreate.damp.1
}}

// index.html:101505 · Phạm vi: apexCreate
function __Part28(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.spawnParticles.1 EDITABLE
function spawnParticles(x, y, count, options = {}) {
            const {
                spreadVx = 4,
                spreadVy = 4,
                baseVx = 0,
                baseVy = -1.5,
                minRadius = 3,
                maxRadius = 7,
                color = '#d6d3d1',
                glow = false,
                gravity = 0.08,
                decay = 0.028,
                shape = 'circle'
            } = options;

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: x + (Math.random() - 0.5) * 18,
                    y: y + (Math.random() - 0.5) * 14,
                    vx: baseVx + (Math.random() - 0.5) * spreadVx * 2,
                    vy: baseVy + (Math.random() - 0.5) * spreadVy * 2,
                    radius: minRadius + Math.random() * (maxRadius - minRadius),
                    alpha: 0.85 + Math.random() * 0.15,
                    color: color,
                    glow: glow,
                    gravity: gravity,
                    decay: decay,
                    shape: shape,
                    rotation: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.2
                });
            }
        }
// PLAYER_PART_END s8.apexCreate.spawnParticles.1
}}

// index.html:104889 · Phạm vi: apexCreate
function __Part29(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.lavaPools.1 EDITABLE
const lavaPools=[],magmaSwings=[],nebulaImpacts=[],lavaTrailHits=new WeakMap();
// PLAYER_PART_END s8.apexCreate.lavaPools.1
}}

// index.html:104890 · Phạm vi: apexCreate
function __Part30(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.lavaSurface.1 EDITABLE
function lavaSurface(x,y){let surface=null,top=groundY;for(const q of platforms){if(x>=q.x&&x<=q.x+q.w&&q.y>=y-2&&q.y<top){top=q.y;surface=q;}}return {y:top,surface};}
// PLAYER_PART_END s8.apexCreate.lavaSurface.1
}}

// index.html:104891 · Phạm vi: apexCreate
function __Part31(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.addLava.1 EDITABLE
function addLava(p){if(p.lavaMade)return;p.lavaMade=true;const land=lavaSurface(p.x,p.y);lavaPools.push({x:p.x,y:land.y,surface:land.surface,age:0,seed:Math.random()*10});}
// PLAYER_PART_END s8.apexCreate.addLava.1
}}

// index.html:104892 · Phạm vi: apexCreate
function __Part32(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.tickSpecialties.1 EDITABLE
function tickSpecialties(dashing){
  for(let i=nebulaImpacts.length-1;i>=0;i--)if(++nebulaImpacts[i].age>15)nebulaImpacts.splice(i,1);
  for(let i=lavaPools.length-1;i>=0;i--){const z=lavaPools[i];if(z.surface&&platforms.includes(z.surface))z.y=z.surface.y;else {const land=lavaSurface(z.x,z.y);z.y=land.y;z.surface=land.surface;}z.age++;if(z.age%60===0)for(const t of targets){const o=t.o;if(checkAABB({x:(z.x-65)*SCALE,y:(z.y-22)*SCALE,w:130*SCALE,h:44*SCALE},o)){if(!z.ult)sgDamage(owner,o,1,'apex');else if(frames-(lavaTrailHits.get(o)??-9999)>=60&&sgDamage(owner,o,3,'apex')>0)lavaTrailHits.set(o,frames);}}if(z.age>=180&&!z.ult)lavaPools.splice(i,1);}
  if(apexColor!==3||!dashing)return;
  // A forward semicircle swept through this frame's dash catches incoming fast rounds.
  const dir=dino.dashDir,cx=dino.x*SCALE,cy=(dino.y-48)*SCALE;
  const box={x:cx+(dir>0?5:-63),y:cy-55,w:58,h:110};
  for(const t of apexHostileRounds(owner)){const o=t.o;if(!o||o._clashDead||!t.box)continue;const r=t.box;
   const vx=Number.isFinite(o.vx)?o.vx:Number.isFinite(o.speed)?o.speed:0,vy=Number.isFinite(o.vy)?o.vy:0;
   if(checkAABB(box,r)||sgSegmentBox(r.x+r.w/2,r.y+r.h/2,r.x+r.w/2+vx-dir*dino.dashSpeed*SCALE*1.25,r.y+r.h/2+vy,box,Math.max(r.w,r.h)/2)!==null){o._clashDead=true;if(t.kill)t.kill();nebulaImpacts.push({y:Math.max(-85,Math.min(85,(r.y+r.h/2)/SCALE-(dino.y-48))),age:0});if(nebulaImpacts.length>8)nebulaImpacts.shift();spawnParticles((r.x+r.w/2)/SCALE,(r.y+r.h/2)/SCALE,8,{color:'#d8b4fe',glow:true,shape:'shard'});}
  }
 }
// PLAYER_PART_END s8.apexCreate.tickSpecialties.1
}}

// index.html:105184 · Phạm vi: apexCreate
function __Part33(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.changeVariant.1 EDITABLE
function changeVariant(step){
  if(ultimate||paused||!apexActive(owner)||owner.hp<=0)return false;
  const next=(apexColor+step+APEX_SKINS.length)%APEX_SKINS.length;
  if(next===apexColor)return false;
  if(apexColor===4){const occupiedCycle=obelith.blocks.length>0;hideObelithBlocks();if(occupiedCycle)obelith.clock=0;obelith.form=0;}
  apexSetColor(next);currentSkin=obelithSkin();
  comboBadge.textContent='Q/E · '+APEX_SKINS[apexColor].name;
  floatingTexts.push(new FloatingText(owner.x-22,owner.y-30,APEX_VARIANT_LABELS[apexColor]));
  spawnParticles(dino.x,dino.y-48,12,{spreadVx:3,spreadVy:3,color:currentSkin.energyGlow,glow:true,shape:'shard',gravity:.05,decay:.06});
  return true;
 }
// PLAYER_PART_END s8.apexCreate.changeVariant.1
}}

// index.html:105424 · Phạm vi: apexCreate
function __Part34(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.dino.x.1 EDITABLE
dino.x=(owner.x+owner.w/2)/SCALE;
// PLAYER_PART_END s8.apexCreate.dino.x.1
}}

// index.html:105424 · Phạm vi: apexCreate
function __Part35(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.dino.y.1 EDITABLE
dino.y=(owner.y+owner.h)/SCALE;
// PLAYER_PART_END s8.apexCreate.dino.y.1
}}

// index.html:105464 · Phạm vi: apexCreate
function __Part36(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.tailPoints.1 EDITABLE
function tailPoints(){const r=computeSkeletalRig(dino.crouchBlend,dino.dashBlend,dino.walkCycle,dino.breathCycle,dino.recoilOffset,dino.headPitch,dino.vy,dino.isGrounded),a=dino.riseAngle||0,c=Math.cos(a),s=Math.sin(a),flip=Math.sign(dino.visualScaleX||dino.facing)*Math.max(.78,Math.abs(dino.visualScaleX));
  return r.tailNodes.map((p,i)=>{const reach=apexColor===1?1.2*magmaReach():1,x=(p.x-(i===r.tailNodes.length-1?10:0))*reach,y=(p.y+48)*reach;return{x:dino.x+(x*c-y*s)*flip*dino.scaleX,y:dino.y-48+(x*s+y*c)*dino.scaleY};});}
// PLAYER_PART_END s8.apexCreate.tailPoints.1
}}

// index.html:105559 · Phạm vi: apexCreate
function __Part37(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.shieldHexRipples.1 EDITABLE
const shieldHexRipples=[];
// PLAYER_PART_END s8.apexCreate.shieldHexRipples.1
}}

// index.html:105560 · Phạm vi: apexCreate
function __Part38(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.Object.assign.1 EDITABLE
Object.assign(dino,{shieldBlend:0,shieldRadius:110,shieldRotY:0,shieldRotX:.22,shieldParryWindow:0});
// PLAYER_PART_END s8.apexCreate.Object.assign.1
}}

// index.html:105561 · Phạm vi: apexCreate
function __Part39(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.shieldImpact.1 EDITABLE
function shieldImpact(x,y){if(!owner.isShielding())return;shieldHexRipples.push({angle:Math.atan2(y/SCALE-(dino.y-48),x/SCALE-dino.x),progress:0,alpha:1,isParry:false});if(shieldHexRipples.length>12)shieldHexRipples.shift();}
// PLAYER_PART_END s8.apexCreate.shieldImpact.1
}}

// index.html:105562 · Phạm vi: apexCreate
function __Part40(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.tickHexShield.1 EDITABLE
function tickHexShield(){dino.shieldBlend+=( (owner.isShielding()?1:0)-dino.shieldBlend)*.22;dino.shieldRotY+=.032;for(let i=shieldHexRipples.length-1;i>=0;i--){const r=shieldHexRipples[i];r.progress+=.08;r.alpha-=.045;if(r.alpha<=0)shieldHexRipples.splice(i,1);}}
// PLAYER_PART_END s8.apexCreate.tickHexShield.1
}}

// index.html:105563 · Phạm vi: apexCreate
function __Part41(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.shieldHexMesh.1 EDITABLE
const shieldHexMesh = [];
// PLAYER_PART_END s8.apexCreate.shieldHexMesh.1
}}

// index.html:105564 · Phạm vi: apexCreate
function __Part42(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.initShieldHexMesh.1 EDITABLE
function initShieldHexMesh() {
            shieldHexMesh.length = 0;
            // Phân bố các tâm mảnh lục giác đều trên mặt cầu theo 5 tầng vĩ độ
            const rings = [
                { lat: -1.18, count: 5, radiusScale: 0.92 },
                { lat: -0.62, count: 9, radiusScale: 0.96 },
                { lat: 0.0,   count: 12, radiusScale: 1.0 },
                { lat: 0.62,  count: 9, radiusScale: 0.96 },
                { lat: 1.18,  count: 5, radiusScale: 0.92 }
            ];
            let idCounter = 0;
            rings.forEach((ring, rIdx) => {
                for (let i = 0; i < ring.count; i++) {
                    const lon = (i * Math.PI * 2) / ring.count + (rIdx % 2) * (Math.PI / ring.count);
                    shieldHexMesh.push({
                        id: idCounter++,
                        lat: ring.lat,
                        lon: lon,
                        size: 23 * ring.radiusScale,
                        ringIdx: rIdx,
                        delayOffset: (Math.abs(ring.lat) / 1.2) * 0.35 + (i % 3) * 0.06
                    });
                }
            });
        }
// PLAYER_PART_END s8.apexCreate.initShieldHexMesh.1
}}

// index.html:105589 · Phạm vi: apexCreate
function __Part43(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.initShieldHexMesh.2 EDITABLE
initShieldHexMesh();
// PLAYER_PART_END s8.apexCreate.initShieldHexMesh.2
}}

// index.html:105768 · Phạm vi: apexCreate
function __Part44(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.preview.1 EDITABLE
function preview(x,y){obelithPreview=true;currentSkin=obelithSkin();dino.x=(x+20)/SCALE;dino.y=(y+44)/SCALE;dino.breathCycle=frames*.035;groundY=dino.y;ctx.save();ctx.scale(SCALE,SCALE);drawDinosaur();ctx.restore();obelithPreview=false;}
// PLAYER_PART_END s8.apexCreate.preview.1
}}

// index.html:105769 · Phạm vi: apexCreate
function __Part45(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.ReturnStatement.1 EDITABLE
return {tick,draw,preview,shieldImpact,ultStart,changeVariant,cinematicFrame,isCinematic:()=>!!ultimate&&!liveUltimate(),isLiveUltimate:liveUltimate,ultimate:()=>ultimate,magmaRemaining:()=>magmaTime,state:dino,events:inputEvents,leafs:()=>leafs,obelith:()=>obelith,shots:projectiles,label:()=>apexColor===4?(obelith.beam?'K · OBELITH '+((120-obelith.beam.age)/60).toFixed(1)+'s':obelith.ready?'K · OBELITH READY':obelithPad()?'OBELITH · '+Math.floor(obelith.charge/60*100)+'%':'OBELITH · '+(obelith.blocks.length?(obelith.activated?'USE ':'LAND '):'NEXT ')+Math.ceil(((obelith.blocks.length?300:600)-obelith.clock)/60)+'s'):comboBadge.textContent||'J: CLAWS · K: CHARGE',test:{lavaPools,magmaSwings,tickSpecialties,addLava,jumpAttack,damageTargetsInArea,executeClawComboStep,executeChargedBite,executeAirBuzzsaw,executeDashTailSpin,executeCrocodileDeathRoll,releaseRangedCharge,triggerDash,triggerJump,syncTargets}};
// PLAYER_PART_END s8.apexCreate.ReturnStatement.1
}}
