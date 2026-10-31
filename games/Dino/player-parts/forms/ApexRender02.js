// PLAYER_FILE: ApexRender02
// PLAYER_SNAPSHOT: 5d0f15f3a03fc9fbe0541ede012a13e7d7b9bce48bb14b7d7206f3153fac704c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: apexColor, apexDrawObelith, bienDayHT, ctx, dino, frames, mapTheme, oceanCamY, worldL, worldR
// index.html:104560 · Phạm vi: apexCreate
function __Part0(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawCombatEffects.1 EDITABLE
function drawCombatEffects() {
            // 1. Vẽ Vệt Móng Vuốt Cận Chiến (3 Claw Slash Marks)
            slashArcs.forEach(sa => {
                ctx.save();
                ctx.translate(sa.x, sa.y);
                ctx.scale(sa.dir, 1);
                ctx.globalAlpha = Math.max(0, sa.alpha);

                const drawTripleClaw = (rotOffset) => {
                    ctx.save();
                    ctx.rotate(rotOffset);
                    for (let c = -1; c <= 1; c++) {
                        const rOffset = c * 11;
                        if(apexColor===1){
                            // Same origin, rotation and elliptical path as the original three claws.
                            const rx=(sa.radiusX+rOffset)*magmaReach(),ry=(sa.radiusY+rOffset*.6)*magmaReach();
                            for(const [width,color,blur] of [[12,'#7c1608',0],[8,'#ff4b08',13],[4.2,'#ffab24',8],[1.5,'#fff0a6',3]]){
                                ctx.lineWidth=width-Math.abs(c)*.4;ctx.strokeStyle=color;ctx.shadowColor='#ff650b';ctx.shadowBlur=blur;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(0,rOffset*.4,rx,ry,0,-.75,.85);ctx.stroke();
                            }
                            ctx.shadowBlur=0;
                            const age=Math.max(0,1-sa.alpha);
                            for(let j=0;j<6;j++){const a=-.7+j*.29,flow=age*(10+j*2);ctx.fillStyle=j%2?'#ffc13e':'#ff5a0a';ctx.beginPath();ctx.ellipse(Math.cos(a)*rx+flow*.3,rOffset*.4+Math.sin(a)*ry+flow*flow*.045,1.6+(j%2),2.4+age*4,-.2,0,Math.PI*2);ctx.fill();}
                            continue;
                        }
                        ctx.strokeStyle = sa.color;
                        ctx.shadowColor = sa.color;
                        ctx.shadowBlur = 16;
                        ctx.lineWidth = 6 - Math.abs(c) * 1.2;
                        ctx.lineCap = 'round';
                        ctx.beginPath();
                        ctx.ellipse(0, rOffset * 0.4, sa.radiusX + rOffset, sa.radiusY + rOffset * 0.6, 0, -0.75, 0.85);
                        ctx.stroke();

                        ctx.strokeStyle = sa.coreColor;
                        ctx.lineWidth = 2.5;
                        ctx.beginPath();
                        ctx.ellipse(0, rOffset * 0.4, sa.radiusX + rOffset, sa.radiusY + rOffset * 0.6, 0, -0.65, 0.75);
                        ctx.stroke();
                    }
                    ctx.restore();
                };

                if (sa.type === 'cross_x') {
                    drawTripleClaw(0.38);
                    drawTripleClaw(-0.42);
                } else {
                    drawTripleClaw(sa.swingDown ? 0.18 : -0.22);
                }
                ctx.restore();
            });

            // 2. Vẽ Hàm Kẹp Gọng Kìm 2 Tay khi Cúi Đánh (Crouch Dual-Claw Pincer Clamp)
            pincerClamps.forEach(pc => {
                ctx.save();
                ctx.translate(pc.x, pc.y);
                ctx.scale(pc.dir, 1);
                ctx.globalAlpha = Math.max(0, pc.alpha);

                const snap = Math.min(1, pc.progress * 1.6);
                const pincerAngle = (1 - snap) * 0.68 + 0.05;

                for (let side of [-1, 1]) {
                    ctx.save();
                    ctx.rotate(side * pincerAngle);
                    ctx.strokeStyle = pc.color;
                    ctx.fillStyle = pc.color;
                    ctx.shadowColor = pc.color;
                    ctx.shadowBlur = 16;
                    ctx.lineWidth = 4;

                    // Cánh cung móng vuốt gọng kìm
                    ctx.beginPath();
                    ctx.moveTo(-48, side * 14);
                    ctx.quadraticCurveTo(5, side * 44, 52, side * 4);
                    ctx.lineTo(36, side * 2);
                    ctx.quadraticCurveTo(2, side * 24, -42, side * 6);
                    ctx.closePath();
                    ctx.fill();

                    // Răng kẹp bên trong gọng kìm
                    ctx.fillStyle = pc.coreColor;
                    for (let k = 0; k < 3; k++) {
                        const kx = -5 + k * 16;
                        const ky = side * (20 - k * 4);
                        ctx.beginPath();
                        ctx.moveTo(kx, ky);
                        ctx.lineTo(kx + 5, ky - side * 11);
                        ctx.lineTo(kx + 10, ky);
                        ctx.closePath();
                        ctx.fill();
                    }
                    ctx.restore();
                }
                ctx.restore();
            });

            // 3. Vẽ Vòng Lốc Xoáy Đuôi 2 Vòng, Lốc Cá Sấu Xoay & Lưỡi Cưa Vây Lưng Trên Không
            spinRings.forEach(sr => {
                ctx.save();
                ctx.translate(sr.x, sr.y);
                ctx.globalAlpha = Math.max(0, sr.alpha);

                if (sr.type === 'double_tail_vortex') {
                    // 2 Vòng Lốc Xoáy Đuôi Ngang Kép (Double Horizontal Tail Cyclone)
                    for (let ring = 0; ring < 2; ring++) {
                        const yOff = ring === 0 ? -12 : 12;
                        const scaleR = ring === 0 ? 1.0 : 0.82;
                        ctx.save();
                        ctx.translate(0, yOff);
                        ctx.strokeStyle = ring === 0 ? sr.color : currentSkin.energyArc;
                        ctx.shadowColor = sr.color;
                        ctx.shadowBlur = 18;
                        ctx.lineWidth = 7 - ring * 1.5;
                        ctx.beginPath();
                        ctx.ellipse(0, 0, sr.rx * scaleR, sr.ry * scaleR, 0, sr.rotation + ring * Math.PI, sr.rotation + ring * Math.PI + Math.PI * 1.65);
                        ctx.stroke();

                        ctx.strokeStyle = sr.coreColor;
                        ctx.lineWidth = 2.5;
                        ctx.beginPath();
                        ctx.ellipse(0, 0, sr.rx * scaleR, sr.ry * scaleR, 0, sr.rotation + ring * Math.PI + 0.1, sr.rotation + ring * Math.PI + Math.PI * 1.4);
                        ctx.stroke();
                        ctx.restore();
                    }
                } else if (sr.type === 'death_roll_spiral') {
                    // Vòng xoắn ốc dọc bao quanh thân khi xoay Cá Sấu Tử Thần (Crocodile Death Roll)
                    ctx.rotate(sr.rotation);
                    ctx.strokeStyle = sr.color;
                    ctx.shadowColor = sr.color;
                    ctx.shadowBlur = 14;
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, sr.rx, sr.ry, 0, 0, Math.PI * 1.5);
                    ctx.stroke();
                } else if (sr.type === 'circular_finale_360') {
                    // Đòn Chém Hình Tròn 360 Độ Xung Quanh kết thúc chuỗi Chém-Dash-Chém
                    ctx.rotate(sr.rotation);
                    ctx.strokeStyle = sr.color;
                    ctx.shadowColor = sr.color;
                    ctx.shadowBlur = 24;
                    ctx.lineWidth = 10;
                    ctx.beginPath();
                    ctx.arc(0, 0, sr.rx, 0, Math.PI * 2);
                    ctx.stroke();

                    ctx.strokeStyle = sr.coreColor;
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.arc(0, 0, sr.rx * 0.92, 0, Math.PI * 2);
                    ctx.stroke();

                    // Các lưỡi răng cưa phát sáng xung quanh vòng chém 360
                    const blades = 12;
                    ctx.fillStyle = sr.coreColor;
                    for (let b = 0; b < blades; b++) {
                        const ang = (b * Math.PI * 2) / blades;
                        const bx = Math.cos(ang) * sr.rx;
                        const by = Math.sin(ang) * sr.rx;
                        ctx.beginPath();
                        ctx.arc(bx, by, 5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                ctx.restore();
            });

            // Hiệu ứng đĩa răng cưa năng lượng dọc khi đang giữ J trên không (Aerial Dorsal Buzzsaw)
            if (dino.meleeState === 'air_saw_spin') {
                ctx.save();
                ctx.translate(dino.x, dino.y - 48);
                ctx.scale(dino.facing, 1);
                ctx.rotate(dino.sawSpinAngle * 1.4);

                const sawR = 76;
                ctx.strokeStyle = currentSkin.energyGlow;
                ctx.shadowColor = currentSkin.energyGlow;
                ctx.shadowBlur = 22;
                ctx.lineWidth = 7;
                ctx.beginPath();
                ctx.arc(0, 0, sawR, 0, Math.PI * 2);
                ctx.stroke();

                // Vẽ 16 răng cưa vây lưng xoay dọc
                const teeth = 16;
                ctx.fillStyle = currentSkin.energyCore;
                ctx.strokeStyle = currentSkin.energyArc;
                ctx.lineWidth = 2;
                for (let i = 0; i < teeth; i++) {
                    const a0 = (i * Math.PI * 2) / teeth;
                    const a1 = a0 + 0.22;
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(a0) * (sawR - 6), Math.sin(a0) * (sawR - 6));
                    ctx.lineTo(Math.cos(a0 + 0.06) * (sawR + 22), Math.sin(a0 + 0.06) * (sawR + 22));
                    ctx.lineTo(Math.cos(a1) * (sawR - 6), Math.sin(a1) * (sawR - 6));
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }
                ctx.restore();
            }

            // 4. Vẽ Hàm Răng Năng Lượng Khổng Lồ khi Giữ Cắn Xé (Đã căn chuẩn phía trước Mõm!)
            bitePhantoms.forEach(bp => {
                ctx.save();
                ctx.translate(bp.x, bp.y);
                ctx.scale(bp.dir * (bp.scale || 1), bp.scale || 1);
                ctx.globalAlpha = Math.max(0, bp.alpha);

                // Góc khép hàm sập mạnh từ mở rộng (0.85 rad) về cắn chặt (0.02 rad)
                const snapEase = Math.pow(bp.progress, 2.2);
                const jawAngle = (1 - snapEase) * 0.78;

                // Hàm Trên Năng Lượng
                ctx.save();
                ctx.rotate(-jawAngle);
                ctx.fillStyle = bp.color;
                ctx.strokeStyle = bp.coreColor;
                ctx.lineWidth = 3;
                ctx.shadowColor = bp.color;
                ctx.shadowBlur = 22;

                ctx.beginPath();
                ctx.moveTo(-45, -18);
                ctx.quadraticCurveTo(10, -48, 72, -12);
                ctx.lineTo(58, 0);
                // Răng nanh hàm trên khổng lồ
                const fangCount = 5;
                for (let f = fangCount; f >= 0; f--) {
                    const fx = -25 + f * 16;
                    const fangH = (f === 4 || f === 2) ? 26 : 16;
                    ctx.lineTo(fx + 8, 0);
                    ctx.lineTo(fx + 4, fangH);
                    ctx.lineTo(fx, 0);
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();

                // Hàm Dưới Năng Lượng
                ctx.save();
                ctx.rotate(jawAngle);
                ctx.fillStyle = bp.color;
                ctx.strokeStyle = bp.coreColor;
                ctx.lineWidth = 3;
                ctx.shadowColor = bp.color;
                ctx.shadowBlur = 22;

                ctx.beginPath();
                ctx.moveTo(-45, 18);
                ctx.quadraticCurveTo(10, 48, 72, 12);
                ctx.lineTo(58, 0);
                for (let f = fangCount; f >= 0; f--) {
                    const fx = -22 + f * 16;
                    const fangH = (f === 3 || f === 1) ? -24 : -15;
                    ctx.lineTo(fx + 8, 0);
                    ctx.lineTo(fx + 4, fangH);
                    ctx.lineTo(fx, 0);
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();

                ctx.restore();
            });

            // 3. Vẽ ĐẠI PHÁO TIA LASER KÉO DÀI 2 GIÂY (2s Hyper Plasma Laser Beam)
            if (dino.laserActiveSec > 0) {
                const { spawnX, spawnY } = getMouthWorldPositionAndAngle();
                const beamLen = 1550;
                const pulse = 1 + Math.sin(performance.now() * 0.045) * 0.18;

                ctx.save();
                ctx.translate(spawnX, spawnY);
                ctx.rotate(dino.laserAngle);

                // Luồng hào quang ngoài
                ctx.strokeStyle = currentSkin.energyGlow;
                ctx.shadowColor = currentSkin.energyGlow;
                ctx.shadowBlur = 32;
                ctx.lineWidth = 46 * pulse;
                ctx.lineCap = 'round';
                ctx.globalAlpha = 0.45;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(beamLen, 0);
                ctx.stroke();

                // Luồng Plasma trung tâm
                ctx.strokeStyle = currentSkin.energyArc;
                ctx.lineWidth = 26 * pulse;
                ctx.globalAlpha = 0.85;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(beamLen, 0);
                ctx.stroke();

                // Lõi Trắng Siêu Nhiệt
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 12 * pulse;
                ctx.globalAlpha = 1.0;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(beamLen, 0);
                ctx.stroke();

                // Vòng xoắn năng lượng cuộn dọc theo thân tia Laser
                ctx.strokeStyle = '#fde047';
                ctx.lineWidth = 3.5;
                ctx.beginPath();
                const phaseShift = -performance.now() * 0.025;
                for (let x = 0; x < beamLen; x += 14) {
                    const y = Math.sin(x * 0.045 + phaseShift) * 24 * pulse;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();

                // Quả cầu tụ hội ngay tại miệng khi khạc Laser
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, 26 * pulse, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
        }
// PLAYER_PART_END s8.apexCreate.drawCombatEffects.1
}}

// index.html:104904 · Phạm vi: apexCreate
function __Part1(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawSpecialties.1 EDITABLE
function drawSpecialties(){
  ctx.save();
  for(const z of lavaPools){
   ctx.save();ctx.translate(z.x,z.y);const fade=Math.min(1,(180-z.age)/25),grow=Math.min(1,.35+z.age/12);ctx.globalAlpha=fade;ctx.scale(grow,grow);
   const rim=(scale)=>{ctx.beginPath();for(let i=0;i<=64;i++){const a=i/64*Math.PI*2,r=1+.055*Math.sin(a*7+z.seed)+.035*Math.cos(a*11);const x=Math.cos(a)*65*r*scale,y=Math.sin(a)*10*r*scale-3;if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);}ctx.closePath();};
   ctx.fillStyle='#391c1c';rim(1.09);ctx.fill();ctx.lineWidth=3;ctx.strokeStyle='#6f2a1c';ctx.stroke();
   const molten=ctx.createRadialGradient(-8,-4,1,0,-3,62);molten.addColorStop(0,'#ffe57d');molten.addColorStop(.3,'#ffad20');molten.addColorStop(.72,'#f94b08');molten.addColorStop(1,'#8b200a');ctx.fillStyle=molten;ctx.shadowColor='#fb570b';ctx.shadowBlur=14;rim(1);ctx.fill();ctx.shadowBlur=0;
   ctx.save();rim(.97);ctx.clip();
   for(let i=0;i<9;i++){const x=Math.sin(i*9+z.seed)*53,y=Math.cos(i*5)*6-3;ctx.fillStyle='#50251e';ctx.beginPath();ctx.moveTo(x-7,y);ctx.lineTo(x-2,y-2.5);ctx.lineTo(x+7,y-1);ctx.lineTo(x+4,y+2);ctx.lineTo(x-5,y+2);ctx.closePath();ctx.fill();}
   ctx.strokeStyle='#ffe99b';ctx.lineWidth=.9;for(let i=0;i<5;i++){const t=(z.age*.035+i*.7)%1,x=Math.sin(i*14+z.seed)*47;ctx.globalAlpha=fade*(1-t)*.8;ctx.beginPath();ctx.ellipse(x,-4+Math.cos(i*7)*4,2+t*8,1+t*2,0,0,Math.PI*2);ctx.stroke();}ctx.restore();
   for(let i=0;i<7;i++){const t=(z.age+i*19)%55/55;ctx.globalAlpha=fade*Math.sin(t*Math.PI)*.65;ctx.fillStyle=i%2?'#ffcf61':'#ff671c';ctx.beginPath();ctx.arc(Math.sin(i*8+z.seed)*49+Math.sin(t*4+i)*3,-7-t*27,1.2+(1-t),0,Math.PI*2);ctx.fill();}ctx.restore();
  }
  ctx.restore();
 }
// PLAYER_PART_END s8.apexCreate.drawSpecialties.1
}}

// index.html:104918 · Phạm vi: apexCreate
function __Part2(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawNebulaDashShield.1 EDITABLE
function drawNebulaDashShield(){
  if(apexColor!==3||dino.dashTimer<=0)return;
  ctx.save();ctx.translate(dino.x,dino.y-48);ctx.scale(dino.dashDir,1);
  const pulse=.5+.5*Math.sin(frames*.23),trace=(r=100)=>{ctx.beginPath();ctx.ellipse(8,0,r,100,0,-Math.PI/2,Math.PI/2);ctx.quadraticCurveTo(58,0,8,-100);ctx.closePath();};
  const glass=ctx.createLinearGradient(30,0,112,0);glass.addColorStop(0,'rgba(73,33,143,.04)');glass.addColorStop(.6,'rgba(139,76,231,.16)');glass.addColorStop(1,'rgba(231,184,255,.38)');ctx.fillStyle=glass;trace();ctx.fill();
  ctx.save();trace();ctx.clip();
  // Curved latitude ribs and drifting hex cells are clipped into the glass crescent.
  ctx.lineWidth=.8;ctx.strokeStyle='rgba(204,167,255,.24)';for(let row=-5;row<=5;row++)for(let col=0;col<7;col++){const x=20+col*15,y=row*20+(col%2)*10+(frames*.55%20);ctx.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;const xx=x+Math.cos(a)*10,yy=y+Math.sin(a)*10;if(k)ctx.lineTo(xx,yy);else ctx.moveTo(xx,yy);}ctx.closePath();ctx.stroke();}
  ctx.strokeStyle='rgba(227,197,255,.30)';for(let i=-2;i<=2;i++){ctx.beginPath();ctx.ellipse(14,i*28,89,13,0,-1.25,1.25);ctx.stroke();}
  for(const hit of nebulaImpacts){ctx.strokeStyle='rgba(255,238,255,'+(1-hit.age/16)+')';ctx.lineWidth=2;ctx.beginPath();ctx.arc(8+Math.sqrt(10000-hit.y*hit.y),hit.y,5+hit.age*3,0,Math.PI*2);ctx.stroke();}
  const scan=(frames*3)%220-110;const band=ctx.createLinearGradient(0,scan-15,0,scan+15);band.addColorStop(0,'rgba(224,186,255,0)');band.addColorStop(.5,'rgba(242,215,255,.25)');band.addColorStop(1,'rgba(224,186,255,0)');ctx.fillStyle=band;ctx.fillRect(0,scan-15,120,30);ctx.restore();
  for(const [width,color,blur] of [[7,'rgba(156,76,245,.22)',15],[2.4,'rgba(212,161,255,.9)',8],[.9,'#f6e8ff',0]]){ctx.lineWidth=width;ctx.strokeStyle=color;ctx.shadowColor='#b76dff';ctx.shadowBlur=blur;ctx.beginPath();ctx.ellipse(8,0,100,100,0,-Math.PI/2,Math.PI/2);ctx.stroke();}
  ctx.shadowBlur=0;ctx.strokeStyle='rgba(198,141,255,.5)';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(8,0,92,94,0,-1.48,1.48);ctx.stroke();
  for(let i=0;i<3;i++){const a=-1.35+((frames*.055+i*.9)%2.7),x=8+Math.cos(a)*100,y=Math.sin(a)*100;ctx.fillStyle='#f8eaff';ctx.shadowColor='#d0a0ff';ctx.shadowBlur=9;ctx.beginPath();ctx.arc(x,y,1.8+pulse,0,Math.PI*2);ctx.fill();}
  ctx.restore();
 }
// PLAYER_PART_END s8.apexCreate.drawNebulaDashShield.1
}}

// index.html:105474 · Phạm vi: apexCreate
function __Part3(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawTailTrail.1 EDITABLE
function drawTailTrail(){if(!rise||rise.trail.length<2)return;ctx.save();ctx.lineCap='round';for(let i=1;i<rise.trail.length;i++){ctx.globalAlpha=i/rise.trail.length*.75;ctx.strokeStyle=currentSkin.energyGlow;ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(rise.trail[i-1].x,rise.trail[i-1].y);ctx.lineTo(rise.trail[i].x,rise.trail[i].y);ctx.stroke();ctx.strokeStyle=currentSkin.energyCore;ctx.lineWidth=3;ctx.stroke();}ctx.restore();}
// PLAYER_PART_END s8.apexCreate.drawTailTrail.1
}}

// index.html:105547 · Phạm vi: apexCreate
function __Part4(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawWallTrees.1 EDITABLE
function drawWallTrees(){
  ctx.save();
  const top=(mapTheme==='ocean'?oceanCamY:0)/SCALE-50,bottom=(mapTheme==='ocean'?bienDayHT()+100:600)/SCALE;
  for(const side of [-1,1]){const edge=(side<0?worldL():worldR())/SCALE;
   if(wallCooldown>0){const age=wallBreakAge;if(age<40){for(let i=0;i<10;i++){ctx.globalAlpha=1-age/40;ctx.fillStyle=i%2?'#826044':'#49352b';ctx.fillRect(edge+side*(-5-i%3*3)-side*age*(.3+i*.1),(owner.y/SCALE)+i*7+age*age*.12,7,15);}}continue;}
   ctx.fillStyle='#3a302b';ctx.fillRect(edge-(side<0?10:7),top,17,bottom-top);ctx.fillStyle='#70513b';ctx.fillRect(edge-(side<0?4:7),top,5,bottom-top);
   ctx.strokeStyle='#ad8253';ctx.lineWidth=1.1;for(let y=top;y<bottom;y+=28){ctx.beginPath();ctx.moveTo(edge-3,y);ctx.lineTo(edge+2,y+9);ctx.lineTo(edge-2,y+23);ctx.stroke();}
   if(wallBudget<60){ctx.strokeStyle='#e6bf7c';ctx.beginPath();ctx.moveTo(edge,owner.y/SCALE-30);ctx.lineTo(edge+5,owner.y/SCALE);ctx.lineTo(edge-4,owner.y/SCALE+25);ctx.stroke();}
  }ctx.restore();
 }
// PLAYER_PART_END s8.apexCreate.drawWallTrees.1
}}

// index.html:105557 · Phạm vi: apexCreate
function __Part5(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawLeaves.1 EDITABLE
function drawLeaves(){for(const p of leafs){ctx.save();let yy=p.y,alpha=1;if(p.fallen){const t=240-p.fallen;if(t>35){ctx.restore();continue;}yy+=t*t*.35;alpha=1-t/35;}ctx.globalAlpha=alpha;apexDrawObelith(p.x,yy,p.w,p.h,p.ttl);ctx.restore();}}
// PLAYER_PART_END s8.apexCreate.drawLeaves.1
}}

// index.html:105591 · Phạm vi: apexCreate
function __Part6(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawHexShieldLayer.1 EDITABLE
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
// PLAYER_PART_END s8.apexCreate.drawHexShieldLayer.1
}}

// index.html:105765 · Phạm vi: apexCreate
function __Part7(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.drawGuard.1 EDITABLE
function drawGuard(){drawHexShieldLayer(true);}
// PLAYER_PART_END s8.apexCreate.drawGuard.1
}}

// index.html:105767 · Phạm vi: apexCreate
function __Part8(){ while(false){
// PLAYER_PART_BEGIN s8.apexCreate.draw.1 EDITABLE
function draw(){currentSkin=obelithSkin();if(liveUltimate()){const u=ultimate;ctx.save();ctx.scale(SCALE,SCALE);drawWallTrees();drawLeaves();drawObelithSites();drawCombatEffects();drawProjectiles();drawParticlesAndEffects();ctx.restore();drawObelithUltimate(u);for(const v of u.victims)drawUltVictim(v,u);drawObelithImpact(u);return;}ctx.save();ctx.scale(SCALE,SCALE);drawWallTrees();drawLeaves();drawSpecialties();drawMagmaAura();drawDashAfterimages();drawTailTrail();drawHexShieldLayer(false);if(!owner.invincible||Math.floor(frames/4)%2===0)drawDinosaur();drawCombatEffects();drawNebulaDashShield();drawProjectiles();drawParticlesAndEffects();drawGuard();drawObelithSites();ctx.restore();}
// PLAYER_PART_END s8.apexCreate.draw.1
}}
