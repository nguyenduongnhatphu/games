// PLAYER_FILE: ShieldVisuals
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: Player, apexActive, apexOn, combatStance, ctx, dino, frames
// index.html:105780 · Phạm vi: global
// PLAYER_PART_BEGIN s9.newPlayerHexVisual.1 EDITABLE
function newPlayerHexVisual(owner){
 const dino={x:0,y:0,shieldBlend:0,shieldRadius:50,shieldRotY:0,shieldRotX:.22,shieldParryWindow:0};
 let currentSkin={energyArc:'#00e5ff',energyGlow:'#67e8f9',energyCore:'#ffffff'};
 const shieldHexRipples=[];
 let stamp=-1;
 function sync(){
  dino.x=owner.x+owner.w/2;dino.y=owner.y+owner.h/2+48;
  dino.shieldRadius=Math.max(owner.w,owner.h)*.95*owner.getFormScale();
  currentSkin=combatStance===2?{energyArc:'#a78bfa',energyGlow:'#facc15',energyCore:'#ffffff'}:{energyArc:'#00e5ff',energyGlow:'#67e8f9',energyCore:'#ffffff'};
  if(stamp===frames)return;stamp=frames;
  dino.shieldBlend+=((owner.isShielding()?1:0)-dino.shieldBlend)*.22;dino.shieldRotY+=.032;
  for(let i=shieldHexRipples.length-1;i>=0;i--){const r=shieldHexRipples[i];r.progress+=.08;r.alpha-=.045;if(r.alpha<=0)shieldHexRipples.splice(i,1);}
 }
 function impact(x,y){shieldHexRipples.push({angle:Math.atan2(y-(owner.y+owner.h/2),x-(owner.x+owner.w/2)),progress:0,alpha:1,isParry:false});if(shieldHexRipples.length>12)shieldHexRipples.shift();}
        const shieldHexMesh = [];
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
        initShieldHexMesh();

        function drawHexShieldLayer(isFrontHemisphere) {
            if (dino.shieldBlend <= 0.02) return;

            const b = dino.shieldBlend;
            const centerX = dino.x;
            const centerY = dino.y - 48;
            const baseRadius = dino.shieldRadius;
            const nowSec = performance.now() * 0.001;

            ctx.save();
            ctx.translate(centerX, centerY);

            // Lớp hào quang nền của quả cầu năng lượng (vẽ ở lớp sau)
            if (!isFrontHemisphere) {
                const bgGrad = ctx.createRadialGradient(0, 0, baseRadius * 0.25, 0, 0, baseRadius * b * 1.08);
                bgGrad.addColorStop(0, 'transparent');
                bgGrad.addColorStop(0.7, `${currentSkin.energyArc}22`);
                bgGrad.addColorStop(1, `${currentSkin.energyGlow}55`);
                ctx.fillStyle = bgGrad;
                ctx.beginPath();
                ctx.arc(0, 0, baseRadius * b * 1.04, 0, Math.PI * 2);
                ctx.fill();
            }

            // Tính toán tọa độ 3D và chiếu phối cảnh từng mảnh ghép Lục Giác
            const projectedTiles = [];
            for (let i = 0; i < shieldHexMesh.length; i++) {
                const tile = shieldHexMesh[i];
                // Hiệu ứng lắp ghép từng mảnh lục giác bay từ ngoài khóa vào khung cầu khi mới bật khiên
                const localProgress = Math.max(0, Math.min(1, (b - tile.delayOffset * (1 - b)) / (1 - tile.delayOffset * 0.5)));
                if (localProgress <= 0.02) continue;

                const assembleOffset = (1 - localProgress) * 38;
                const r = baseRadius * localProgress + assembleOffset;

                const lon = tile.lon + dino.shieldRotY * (tile.ringIdx % 2 === 0 ? 1 : -0.8);
                const lat = tile.lat;

                // Tọa độ 3D trên mặt cầu đơn vị
                const cosLat = Math.cos(lat);
                const sinLat = Math.sin(lat);
                const sinLon = Math.sin(lon);
                const cosLon = Math.cos(lon);

                let x3 = cosLat * sinLon;
                let y3 = sinLat;
                let z3 = cosLat * cosLon;

                // Nghiêng nhẹ trục X để nhìn rõ cấu trúc vòm tổ ong 3D
                const tilt = dino.shieldRotX;
                const yRot = y3 * Math.cos(tilt) - z3 * Math.sin(tilt);
                const zRot = y3 * Math.sin(tilt) + z3 * Math.cos(tilt);

                if (isFrontHemisphere && zRot < 0) continue;
                if (!isFrontHemisphere && zRot >= 0) continue;

                projectedTiles.push({
                    tile,
                    x: x3 * r,
                    y: yRot * r,
                    z: zRot,
                    nx: x3,
                    ny: yRot,
                    localProgress
                });
            }

            // Sắp xếp theo chiều sâu Z (Painter's Algorithm)
            projectedTiles.sort((a, bTile) => a.z - bTile.z);

            projectedTiles.forEach(pt => {
                const { tile, x, y, z, nx, ny, localProgress } = pt;
                const tileAngle = Math.atan2(y, x);

                // Kiểm tra xem mảnh lục giác này có đang nằm trong vùng chấn động khi chặn đạn hay không
                let impactBoost = 0;
                let isParryGlow = false;
                for (let r = 0; r < shieldHexRipples.length; r++) {
                    const rp = shieldHexRipples[r];
                    let angleDiff = Math.abs(tileAngle - rp.angle);
                    if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
                    const waveDist = Math.abs(angleDiff - rp.progress * 1.8);
                    if (waveDist < 0.55) {
                        const boost = (1 - waveDist / 0.55) * rp.alpha;
                        if (boost > impactBoost) {
                            impactBoost = boost;
                            if (rp.isParry) isParryGlow = true;
                        }
                    }
                }

                // Sóng quét năng lượng tuần hoàn dọc theo các tầng lục giác
                const pulseWave = 0.5 + 0.5 * Math.sin(nowSec * 4.5 - tile.lat * 2.2 + tile.lon);
                const depthAlpha = isFrontHemisphere ? (0.32 + z * 0.52) : (0.14 + (1 + z) * 0.14);
                const finalAlpha = Math.min(1, (depthAlpha + pulseWave * 0.14 + impactBoost * 0.75) * localProgress);

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(tileAngle + Math.PI * 0.5);
                // Biến dạng phối cảnh 3D (Foreshortening): các mảnh lục giác ở rìa cầu sẽ nghiêng dẹt tự nhiên theo độ cong mặt cầu
                const radialDist = Math.min(0.92, Math.hypot(nx, ny));
                const foreshorten = Math.max(0.32, Math.sqrt(1 - radialDist * radialDist * 0.78));
                const hexScale = localProgress * (1 + impactBoost * 0.22);
                ctx.scale(hexScale, hexScale * foreshorten);

                const hexR = tile.size;
                ctx.beginPath();
                for (let v = 0; v < 6; v++) {
                    const a = (v * Math.PI) / 3 + Math.PI / 6;
                    const vx = Math.cos(a) * hexR;
                    const vy = Math.sin(a) * hexR;
                    if (v === 0) ctx.moveTo(vx, vy);
                    else ctx.lineTo(vx, vy);
                }
                ctx.closePath();

                // Tô màu bề mặt tấm lục giác
                if (impactBoost > 0.2) {
                    ctx.fillStyle = isParryGlow
                        ? `rgba(253, 224, 71, ${finalAlpha * 0.75})`
                        : `rgba(255, 255, 255, ${finalAlpha * 0.7})`;
                    ctx.shadowColor = isParryGlow ? '#fde047' : '#ffffff';
                    ctx.shadowBlur = 16;
                } else {
                    ctx.fillStyle = isFrontHemisphere
                        ? `rgba(56, 189, 248, ${finalAlpha * 0.26})`
                        : `rgba(14, 165, 233, ${finalAlpha * 0.15})`;
                }
                ctx.fill();

                // Viền năng lượng sắc nét của từng mảnh ghép lục giác
                ctx.lineWidth = impactBoost > 0.2 ? 2.8 : (isFrontHemisphere ? 1.8 : 1.1);
                ctx.strokeStyle = impactBoost > 0.2
                    ? '#ffffff'
                    : (pulseWave > 0.78 ? currentSkin.energyCore : currentSkin.energyArc);
                ctx.globalAlpha = finalAlpha;
                ctx.stroke();

                // Lõi lục giác đồng tâm bên trong mỗi mảnh ghép (Tạo chi tiết công nghệ cao)
                if (isFrontHemisphere || impactBoost > 0.25) {
                    ctx.beginPath();
                    for (let v = 0; v < 6; v++) {
                        const a = (v * Math.PI) / 3 + Math.PI / 6;
                        const vx = Math.cos(a) * (hexR * 0.52);
                        const vy = Math.sin(a) * (hexR * 0.52);
                        if (v === 0) ctx.moveTo(vx, vy);
                        else ctx.lineTo(vx, vy);
                    }
                    ctx.closePath();
                    ctx.lineWidth = 1.0;
                    ctx.strokeStyle = currentSkin.energyGlow;
                    ctx.globalAlpha = finalAlpha * 0.65;
                    ctx.stroke();
                }

                ctx.restore();
            });

            // Vành đai năng lượng ngoại vi khóa chặt hình cầu bảo vệ (vẽ ở lớp trước)
            if (isFrontHemisphere) {
                ctx.save();
                ctx.strokeStyle = dino.shieldParryWindow > 0 ? '#fde047' : currentSkin.energyGlow;
                ctx.shadowColor = currentSkin.energyArc;
                ctx.shadowBlur = 18;
                ctx.lineWidth = 3.2;
                ctx.globalAlpha = 0.75 * b;
                ctx.beginPath();
                ctx.arc(0, 0, baseRadius * b, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            ctx.restore();
        }

 return {draw(front){sync();drawHexShieldLayer(front);},impact};
}
// PLAYER_PART_END s9.newPlayerHexVisual.1

// index.html:105999 · Phạm vi: global
// PLAYER_PART_BEGIN s9.playerHexImpact.1 EDITABLE
function playerHexImpact(n,x,y){if(!n||!n.isShielding())return;if(apexActive(n)&&n.apex)n.apex.shieldImpact(x,y);else{if(!n.hexVisual)n.hexVisual=newPlayerHexVisual(n);n.hexVisual.impact(x,y);}}
// PLAYER_PART_END s9.playerHexImpact.1

// index.html:106000 · Phạm vi: global
// PLAYER_PART_BEGIN s9.Player.prototype._drawHexShield.1 EDITABLE
Player.prototype._drawHexShield=function(){};
// PLAYER_PART_END s9.Player.prototype._drawHexShield.1

// index.html:106001 · Phạm vi: global
// PLAYER_PART_BEGIN s9.fullHexPlayerDraw.1 EDITABLE
const fullHexPlayerDraw=Player.prototype.draw;
// PLAYER_PART_END s9.fullHexPlayerDraw.1

// index.html:106002 · Phạm vi: global
// PLAYER_PART_BEGIN s9.Player.prototype.draw.1 EDITABLE
Player.prototype.draw=function(...args){if(apexOn()&&this.id===1&&this.apex)return fullHexPlayerDraw.apply(this,args);if(!this.hexVisual)this.hexVisual=newPlayerHexVisual(this);this.hexVisual.draw(false);const result=fullHexPlayerDraw.apply(this,args);this.hexVisual.draw(true);return result;};
// PLAYER_PART_END s9.Player.prototype.draw.1
