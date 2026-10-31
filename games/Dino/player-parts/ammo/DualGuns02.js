// PLAYER_FILE: DualGuns02
// PLAYER_SNAPSHOT: 7fab8124c03d46d16307f4ec9963299dbed3e34621bc6add01980145fef9893c
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: AI_HOSO, AMMO_CHITIET_EN, AMMO_CHITIET_VI, AMMO_NAMES, AMMO_NHOM, CHARGE_TIERS, HUD_HANG, LT, PVP_HS, PVP_SAN, Player, SG_DAN, STY_DPS, UNITY_PAL_SRC, ammoColors, ctx, deathCineActive, dino, frames, gameOver, gameState, hudHangSau, keys, sgAmmoHud, sgBefore, sgCannonBeam, sgChangeForm, sgDraw, sgFan, sgFireCannon, sgOn, sgReleaseCharge, sgReload, sgRobot, sgRobotEnd, sgRobotGun, sgRobotMissile, sgRobotSlash, sgRobotStart, sgRobotSwordPose, sgRobotSwordSweep, sgRoll, sgShot, sgState, sgSwordJ, sgSwordK, sgTick, ultCharge, vkDangKy
// index.html:100845 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotTick.1 EDITABLE
function sgRobotTick(n,fire,k){
    const r=sgRobot(n);if(!r)return;
    r.age++;r.time--;r.flash=Math.max(0,r.flash-1);r.gunCd=Math.max(0,r.gunCd-1);r.missileCd=Math.max(0,r.missileCd-1);ultCharge=0;
    n.canDoubleJump=false;n.hoverTimer=0;n.hoverArmed=false;n.aKeyHeldTime=0;n.chargeProgress=0;
    if(n.grounded){r.hover=240;r.airTime=0;}else{r.airTime=(r.airTime||0)+1;r.hover=Math.max(0,240-r.airTime);}
    if(n.hp<=0){sgRobotEnd(n,false);return;}
    if(r.time<=0){sgRobotEnd(n,false);return;}
    if(fire)sgRobotGun(n);
    if(k&&!r.kPrev)sgRobotSlash(n);r.kPrev=!!k;
    const a=r.slash;
    if(a){
        a.t++;sgRobotSwordSweep(n,a);
        if(a.t>=23){r.slash=null;if(r.queued){r.queued=false;sgRobotSlash(n);}}
    }
    r.uHold=keys.KeyU?r.uHold+1:0;
    if(r.uHold>=12&&r.missileCd===0)for(let i=0;i<4&&sgRobot(n);i++)sgRobotMissile(n,i);
}
// PLAYER_PART_END s7.sgRobotTick.1

// index.html:100862 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgChargeRing.1 EDITABLE
function sgChargeRing(n,pos){
    const s=sgState(n),t=n.aKeyHeldTime;
    if(s.robot||s.mode!=='pistol'||t<=0)return;
    const p=Math.min(1,t/60),col=t<15?'#ffb35b':t<30?'#69e9ff':'#fff4d3',R=26;
    ctx.save();ctx.translate(pos.x,pos.y);ctx.strokeStyle='#182b3b';ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,0,R,0,Math.PI*2);ctx.stroke();
    ctx.strokeStyle=col;ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,R,-Math.PI/2,-Math.PI/2+2*Math.PI*p);ctx.stroke();
    for(const f of [.25,.5,1]){const a=-Math.PI/2+2*Math.PI*f;ctx.strokeStyle=p>=f?'#fff':'#667c8e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(Math.cos(a)*22,Math.sin(a)*22);ctx.lineTo(Math.cos(a)*30,Math.sin(a)*30);ctx.stroke();}
    ctx.font='bold 9px sans-serif';ctx.textAlign='center';ctx.fillStyle=col;ctx.fillText(t<15?'DUAL':t<30?'FUSION':'RAIL',0,-34);ctx.restore();
}
// PLAYER_PART_END s7.sgChargeRing.1

// index.html:100871 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotAmmoHud.1 EDITABLE
function sgRobotAmmoHud(n){const r=sgRobot(n);ctx.save();ctx.font='bold 11px sans-serif';ctx.fillStyle='#a9f2ff';ctx.fillText('PLASMA · ∞',86,65);ctx.restore();}
// PLAYER_PART_END s7.sgRobotAmmoHud.1

// index.html:100872 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotHud.1 EDITABLE
function sgRobotHud(n,y){
    const r=sgRobot(n);if(!r)return;if(!Number.isFinite(y))y=hudHangSau()+HUD_HANG+4;
    ctx.save();ctx.fillStyle='rgba(8,19,30,.78)';ctx.fillRect(20,y,220,61);ctx.textAlign='left';ctx.font='bold 11px sans-serif';ctx.fillStyle='#ecf9ff';ctx.fillText('ROBOT  '+Math.ceil(r.time/60)+'s',28,y+14);
    ctx.fillStyle='#ffbf72';ctx.fillText(LT('GIÁP ','ARMOR ')+r.armor+'/10',148,y+14);
    for(let i=0;i<10;i++){ctx.fillStyle=i<r.armor?'#69e9ff':'#304550';ctx.fillRect(28+i*20,y+20,16,4);}
    ctx.font='10px sans-serif';ctx.fillStyle='#d6e6ef';ctx.fillText(LT('GIỮ U · TÊN LỬA ','HOLD U · MISSILES ')+r.missiles+'/20',28,y+39);
    ctx.fillStyle='#8facbd';ctx.fillText(LT('J SÚNG · K KIẾM · GIỮ NHẢY BAY','J GUN · K BLADE · JUMP: HOVER'),28,y+53);ctx.restore();
}
// PLAYER_PART_END s7.sgRobotHud.1

// index.html:100880 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgDrawRobot.1 EDITABLE
function sgDrawRobot(n, x, y) {
    const r = sgRobot(n);
    if (!r) return;
    const dir = n.isFacingLeft ? -1 : 1;
    const spawnT = Math.min(1, r.age / 20);
    const bob = n.grounded ? Math.sin(frames * 0.22) * 1.8 : Math.sin(frames * 0.12) * 1.2;
    const walkPhase = n.grounded && (keys.KeyA || keys.KeyD || keys.ArrowLeft || keys.ArrowRight) ? frames * 0.28 : 0;

    ctx.save();
    ctx.translate(x + n.w / 2, y + n.h);
    ctx.scale(dir * 1.5, 1.5);
    ctx.translate(0, -44 + bob);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const OUT = '#071019';
    const DK = '#182838';
    const MID = '#2d4459';
    const LT = r.flash > 5 ? '#ffffff' : '#65829c';
    const HI = r.flash > 5 ? '#ffffff' : '#b8d0e0';
    const CYAN = '#69e9ff';
    const AMBER = '#ffb35b';

    function poly(pts, fill, stroke = OUT, lw = 1.2) {
        ctx.beginPath();
        for (let i = 0; i < pts.length; i++) {
            if (i === 0) ctx.moveTo(pts[i][0], pts[i][1]);
            else ctx.lineTo(pts[i][0], pts[i][1]);
        }
        ctx.closePath();
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke && lw > 0) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }

    // 1. BACKPACK PHẢN LỰC & 2 BỆ TÊN LỬA VAI (Vẽ phía sau)
    const podLift = r.uHold > 0 ? -2.5 : 0;
    poly([[-21, 3 + podLift], [-11, 0 + podLift], [-9, 18 + podLift], [-22, 20 + podLift]], DK);
    poly([[-19, 4 + podLift], [-12, 2 + podLift], [-11, 15 + podLift], [-19, 16 + podLift]], MID);
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = i < Math.ceil(r.missiles / 7) ? AMBER : '#111c26';
        ctx.fillRect(-18, 5 + i * 3.5 + podLift, 5, 2.2);
    }
    poly([[-14, 12], [-26, 8], [-29, 14], [-16, 22]], MID);
    poly([[-24, 10], [-28, 13], [-19, 18]], CYAN, OUT, 0.8);
    if (!n.grounded) {
        const jetLen = (r.hovering ? 14 : 8) + (frames % 3) * 3;
        poly([[-22, 20], [-28, 20 + jetLen], [-17, 22]], r.hovering ? CYAN : AMBER, null, 0);
        poly([[-21, 20], [-25, 18 + jetLen * 0.6], [-18, 21]], '#ffffff', null, 0);
    }

    // 2. TAY TRÁI (PHÍA XA) — ĐẠI LIÊN PLASMA KÉP
    const recoil = r.gunCd > 22 ? (r.gunCd - 22) * 0.85 : 0;
    ctx.save();
    ctx.translate(8 - recoil, 17);
    ctx.rotate(-0.04);
    poly([[-4, -5], [6, -5], [8, 4], [-2, 4]], DK);
    poly([[2, -6], [25, -6], [30, -3], [30, 6], [22, 8], [2, 8], [-3, 3]], MID);
    poly([[5, -4], [24, -4], [26, 0], [5, 0]], HI);
    ctx.fillStyle = '#0c1622';
    ctx.fillRect(28, -5, 7, 4);
    ctx.fillRect(28, 1, 7, 4);
    ctx.fillStyle = CYAN; ctx.fillRect(10, -3, 16, 1.8);
    ctx.fillStyle = AMBER; ctx.fillRect(10, 3, 16, 1.8);
    if (r.gunCd > 25) {
        poly([[35, -6], [48, -2], [41, 1], [50, 4], [35, 7]], CYAN, null, 0);
        poly([[35, -3], [43, 1], [35, 4]], '#ffffff', null, 0);
    }
    ctx.restore();

    // 3. HAI CHÂN (Đùi - Gối - Ống đồng - Bàn chân)
    for (let side = 0; side < 2; side++) {
        const stride = Math.sin(walkPhase + (side ? 0 : Math.PI));
        const hipX = side ? 4 : -5;
        const hipY = 27;
        const kneeX = hipX + stride * 4 + (side ? 2 : -1);
        const kneeY = 35 - Math.max(0, -stride * 2);
        const footX = hipX + stride * 6 + (side ? 1 : -2);
        const footY = 43 - Math.max(0, stride * 2.5);

        ctx.strokeStyle = OUT; ctx.lineWidth = 6.5;
        ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(kneeX, kneeY); ctx.stroke();
        ctx.strokeStyle = side ? LT : MID; ctx.lineWidth = 4.2;
        ctx.beginPath(); ctx.moveTo(hipX, hipY); ctx.lineTo(kneeX, kneeY); ctx.stroke();

        poly([
            [kneeX - 3.5, kneeY - 1], [kneeX + 4.5, kneeY - 1],
            [footX + 5, footY], [footX - 4, footY]
        ], side ? HI : MID);

        poly([[kneeX - 3, kneeY - 3], [kneeX + 5, kneeY - 2], [kneeX + 3, kneeY + 3], [kneeX - 3, kneeY + 2]], DK);
        ctx.fillStyle = side ? AMBER : CYAN;
        ctx.fillRect(kneeX - 1.5, kneeY - 1, 4, 1.8);

        poly([
            [footX - 5, footY - 1], [footX + 7, footY - 1],
            [footX + 10, footY + 2.5], [footX - 6, footY + 2.5]
        ], DK);
        ctx.fillStyle = side ? HI : LT;
        ctx.fillRect(footX - 2, footY - 0.5, 7, 1.8);

        if (!n.grounded) {
            const fLen = (r.hovering ? 9 : 5) + ((frames + side * 2) % 3) * 2.5;
            poly([[footX - 3, footY + 2.5], [footX + 1, footY + 2.5 + fLen], [footX + 5, footY + 2.5]], r.hovering ? CYAN : AMBER, null, 0);
            poly([[footX - 1, footY + 2.5], [footX + 1, footY + 2.5 + fLen * 0.55], [footX + 3, footY + 2.5]], '#ffffff', null, 0);
        }
    }

    // 4. EO & VÁY GIÁP HÔNG
    poly([[-9, 23], [9, 23], [11, 28], [-11, 28]], DK);
    poly([[-3, 23], [4, 23], [3, 29], [-2, 29]], HI);
    poly([[-12, 24], [-5, 24], [-6, 30], [-13, 29]], LT);
    ctx.fillStyle = AMBER; ctx.fillRect(-11, 26, 4, 1.5);

    // 5. THÂN TRÊN & LÕI NĂNG LƯỢNG
    poly([[-13, 9], [-6, 6], [9, 6], [15, 11], [11, 24], [-9, 24], [-14, 17]], LT);
    poly([[-11, 9], [0, 13], [12, 9], [10, 20], [-9, 20]], DK);
    poly([[-10, 10], [-2, 13], [-3, 18], [-9, 17]], HI);
    poly([[11, 10], [3, 13], [4, 18], [9, 17]], HI);
    ctx.fillStyle = AMBER;
    ctx.fillRect(-8, 15, 4, 1.6);
    ctx.fillRect(5, 15, 4, 1.6);
    ctx.save();
    ctx.translate(1, 15.5);
    ctx.fillStyle = '#07131e';
    ctx.beginPath(); ctx.arc(0, 0, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.rotate(frames * 0.08);
    ctx.fillStyle = CYAN;
    ctx.beginPath(); ctx.arc(0, 0, 3.4, -Math.PI / 2, Math.PI / 2); ctx.fill();
    ctx.fillStyle = AMBER;
    ctx.beginPath(); ctx.arc(0, 0, 3.4, Math.PI / 2, Math.PI * 1.5); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(0, 0, 1.4, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // 6. ĐẦU MECHA & SỪNG V-FIN
    ctx.fillStyle = DK; ctx.fillRect(-3, 4, 6, 4);
    poly([[-7, -1], [5, -2], [10, 3], [8, 9], [-6, 9], [-9, 4]], HI);
    poly([[-5, 2], [9, 2], [8, 6.5], [-4, 6.5]], '#08131f');
    ctx.fillStyle = r.uHold > 0 ? AMBER : CYAN;
    ctx.fillRect(-3, 3.3, 10, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(2, 3.6, 4, 1);
    poly([[1, -1], [-10, -8], [-6, -1]], CYAN, OUT, 1);
    poly([[3, -1], [13, -7], [7, -1]], AMBER, OUT, 1);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, -2.5, 4, 2.5);

    // 7. CÁNH TAY PHẢI CÓ KHỚP KHUỶU + BÀN TAY CẦM ĐẠI ĐAO HƯỚNG VỀ PHÍA TRƯỚC
    const a = r.slash;
    const pose=sgRobotSwordPose(n,a);
    const {shoulderRot,elbowBend,wristTilt}=pose;

    ctx.save();
    ctx.translate(-9, 13); // Tâm khớp vai phải

    // Giáp vai lớn (Pauldron)
    poly([[-8, -6], [5, -8], [7, 2], [-9, 4]], HI);
    poly([[-7, -4], [3, -5], [4, 0], [-8, 1]], DK);
    ctx.fillStyle = CYAN; ctx.fillRect(-6, -2.5, 7, 1.8);

    // Bắp tay trên (Upper Arm)
    if(a&&a.step===2)ctx.scale(1,.45);
    ctx.rotate(shoulderRot);
    poly([[-3, 0], [3.5, 0], [4, 9.5], [-2.5, 9.5]], MID);
    ctx.fillStyle = DK;
    ctx.beginPath(); ctx.arc(0.5, 9.5, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = OUT; ctx.lineWidth = 1; ctx.stroke();

    // Cẳng tay (Forearm)
    ctx.translate(0.5, 9.5);
    ctx.rotate(elbowBend);
    poly([[-3, -2], [10.5, -3.2], [12.5, 0], [10.5, 3.8], [-3, 3.2]], LT);
    poly([[-1, -3.2], [6, -3.8], [7, -1.5], [-1, -1.5]], HI);
    ctx.fillStyle = AMBER; ctx.fillRect(1, -0.5, 6.5, 1.8);

    // Cổ tay & Bàn tay cầm kiếm
    ctx.translate(12.5, 0.5);
    ctx.rotate(wristTilt);

    // --- THANH ĐẠI ĐAO: Dựng dọc trục -Y, LƯỠI SẮC (CYAN) ở phía +X (trước mặt), SỐNG ĐAO ở phía -X ---
    // Đốc kiếm (Pommel) thò xuống dưới nắm tay
    poly([[-2.5, 4.5], [2.5, 4.5], [3.5, 9], [0, 11], [-3.5, 9]], HI);
    ctx.fillStyle = AMBER; ctx.fillRect(-1.5, 6, 3, 2.5);

    // Cán kiếm (Grip) nằm trong lòng bàn tay
    poly([[-2, -6], [2, -6], [2, 5], [-2, 5]], DK);

    // Chắn tay (Crossguard)
    poly([[-5.5, -5.5], [7.5, -5.5], [9, -9], [-7, -8.5]], HI);
    ctx.fillStyle = AMBER; ctx.fillRect(-4, -7.8, 9, 1.8);

    // Thân lưỡi đại đao: sống đao (-X) dày màu tối, mặt vát (+X) sáng, mũi vát nhọn hướng về phía trước
    poly([[-4.5, -8.5], [-4.5, -50], [2.5, -60], [6, -47], [6, -8.5]], '#1c3144');
    poly([[-1.5, -9.5], [-1.5, -48], [2.2, -55], [4.5, -46], [4.5, -9.5]], '#d7eef7');

    // Lưỡi năng lượng Cyan phát sáng ở mép trước (+X)
    ctx.save();
    ctx.strokeStyle = CYAN;
    ctx.lineWidth = 2.4;
    ctx.shadowColor = CYAN;
    ctx.shadowBlur = a ? 10 : 5;
    ctx.beginPath();
    ctx.moveTo(5.8, -9.5);
    ctx.lineTo(5.8, -47);
    ctx.lineTo(2.3, -59.5);
    ctx.stroke();
    ctx.strokeStyle = AMBER;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(0.5, -13);
    ctx.lineTo(0.5, -45);
    ctx.stroke();
    ctx.restore();

    // Bàn tay nắm chặt cán kiếm (Vẽ đè lên cán kiếm)
    poly([[-3.8, -3.5], [3.8, -3.5], [4.5, 3.8], [-3.8, 3.8]], DK);
    ctx.fillStyle = HI;
    ctx.fillRect(-2.5, -2.5, 5.8, 1.7); // Các đốt ngón tay hướng về phía trước (+X)
    ctx.fillRect(-2.5, -0.3, 5.8, 1.7);
    ctx.fillRect(-2.5, 1.9, 5.8, 1.6);
    poly([[-4.2, -1.8], [0.5, -2.5], [0.5, 0.2], [-4.2, 0.8]], LT); // Ngón cái bấm ngang cán

    ctx.restore();

    // 8. VÒNG XUNG KÍCH KHI VỪA BIẾN HÌNH
    if (spawnT < 1) {
        ctx.strokeStyle = `rgba(105, 233, 255, ${1 - spawnT})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 22, 18 + 36 * spawnT, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.restore();
}
// PLAYER_PART_END s7.sgDrawRobot.1

// index.html:101114 · Phạm vi: global
// PLAYER_PART_BEGIN s7.vkDangKy.1 EDITABLE
vkDangKy(SG_DAN,{
    ten:'SONG SÚNG',theLuc:12,sacToiDa:60,khongHoiDan:true,
    anVongSac(){return true;},veSac(pos){sgChargeRing(this,pos);},
    khongSac(){const s=sgState(this);return !!s.robot||s.mode!=='pistol'||s.reload>0||!!s.action;},
    banJ(){
        const s=sgState(this);
        if(s.robot||s.beam)return;
        if(s.mode==='cannon'){sgFireCannon(this);return;}
        if(s.mode==='sword'){sgSwordJ(this);return;}
        if(s.reload||s.action)return;
        if(frames-s.lastDash<18 && frames-s.lastJ>24){sgFan(this,'spin');return;}
        if(sgShot(this,0,1)){this.attackCooldown=10;s.lastJ=frames;}
    },
    giuK(){const s=sgState(this);s.charge=s.robot?0:Math.min(60,this.aKeyHeldTime);},
    nhaK(){
        const s=sgState(this),t=this.aKeyHeldTime;s.charge=0;
        if(s.robot||s.mode!=='pistol'||s.reload||s.action)return;
        sgReleaseCharge(this,t);
    },
    moiKhung(checkAmmo,fireKey,chargeKey){const s=sgState(this);if(s.robot){sgRobotTick(this,fireKey,chargeKey);return;}if(s.mode==='cannon'&&chargeKey&&!s.kPrev)sgCannonBeam(this);if(s.mode==='sword'&&chargeKey&&!s.kPrev)sgSwordK(this);s.kPrev=!!chargeKey;sgTick(this);},hoiDan(){},
    veTrenNguoi(x,y,P){sgDraw(this,x,y,P);},
    veHudDan(){sgAmmoHud(this);},
    veHudThem(){},
    batUltRieng(){sgRobotStart(this);}
});
// PLAYER_PART_END s7.vkDangKy.1

// index.html:101140 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgUpdateGoc.1 EDITABLE
const sgUpdateGoc=Player.prototype._updateGoc;
// PLAYER_PART_END s7.sgUpdateGoc.1

// index.html:101141 · Phạm vi: global
// PLAYER_PART_BEGIN s7.Player.prototype._updateGoc.1 EDITABLE
Player.prototype._updateGoc=function(){sgBefore(this);const out=sgUpdateGoc.call(this);if(sgOn(this)&&this.sg&&this.sg.beam){this.x=this.sg.beam.x;this.y=this.sg.beam.y;this.dy=0;}return out;};
// PLAYER_PART_END s7.Player.prototype._updateGoc.1

// index.html:101142 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgFormGoc.1 EDITABLE
const sgFormGoc=Player.prototype.drawForm;
// PLAYER_PART_END s7.sgFormGoc.1

// index.html:101143 · Phạm vi: global
// PLAYER_PART_BEGIN s7.Player.prototype.drawForm.1 EDITABLE
Player.prototype.drawForm=function(...args){
    if(sgRobot(this)&&(args[4]===undefined||args[4]===-1)){sgDrawRobot(this,args[1],args[2]);return;}
    const a=sgOn(this)&&this.sg&&this.sg.action;
    if(!a || !['vault','spin','rain'].includes(a.kind)) return sgFormGoc.apply(this,args);
    ctx.save();const x=args[1]+this.w/2,y=args[2]+this.h/2;
    ctx.translate(x,y);ctx.rotate(sgRoll(this));ctx.translate(-x,-y);
    sgFormGoc.apply(this,args);ctx.restore();
};
// PLAYER_PART_END s7.Player.prototype.drawForm.1

// index.html:101151 · Phạm vi: global
// PLAYER_PART_BEGIN s7.AMMO_NAMES.push.1 EDITABLE
AMMO_NAMES.push('SONG SÚNG');
// PLAYER_PART_END s7.AMMO_NAMES.push.1

// index.html:101151 · Phạm vi: global
// PLAYER_PART_BEGIN s7.ammoColors.push.1 EDITABLE
ammoColors.push('#73deef');
// PLAYER_PART_END s7.ammoColors.push.1

// index.html:101151 · Phạm vi: global
// PLAYER_PART_BEGIN s7.AMMO_NHOM.push.1 EDITABLE
AMMO_NHOM.push(1);
// PLAYER_PART_END s7.AMMO_NHOM.push.1

// index.html:101152 · Phạm vi: global
// PLAYER_PART_BEGIN s7.UNITY_PAL_SRC.push.1 EDITABLE
UNITY_PAL_SRC.push({c:'#73deef',d:'#163949'});
// PLAYER_PART_END s7.UNITY_PAL_SRC.push.1

// index.html:101153 · Phạm vi: global
// PLAYER_PART_BEGIN s7.STY_DPS.push.1 EDITABLE
STY_DPS.push(6);
// PLAYER_PART_END s7.STY_DPS.push.1

// index.html:101153 · Phạm vi: global
// PLAYER_PART_BEGIN s7.PVP_HS.push.1 EDITABLE
PVP_HS.push(1);
// PLAYER_PART_END s7.PVP_HS.push.1

// index.html:101153 · Phạm vi: global
// PLAYER_PART_BEGIN s7.PVP_SAN.push.1 EDITABLE
PVP_SAN.push(0);
// PLAYER_PART_END s7.PVP_SAN.push.1

// index.html:101154 · Phạm vi: global
// PLAYER_PART_BEGIN s7.AI_HOSO.push.1 EDITABLE
AI_HOSO.push({dai:[260,520],ep:false,sac:1.5,xa:true,moc:[90]});
// PLAYER_PART_END s7.AI_HOSO.push.1

// index.html:101155 · Phạm vi: global
// PLAYER_PART_BEGIN s7.CHARGE_TIERS.push.1 EDITABLE
CHARGE_TIERS.push([[15,'#ffab40'],[30,'#73deef'],[60,'#ffffff']]);
// PLAYER_PART_END s7.CHARGE_TIERS.push.1

// index.html:101156 · Phạm vi: global
// PLAYER_PART_BEGIN s7.AMMO_CHITIET_VI.push.1 EDITABLE
AMMO_CHITIET_VI.push([
    '#SONG SÚNG / SONG KIẾM / ĐẠI BÁC — BẢN MẪU',
    '-Hai súng lục, mỗi khẩu 6 viên; luân phiên giật lùi để lộ khẩu còn lại. Q/E chuyển Song súng → Song kiếm → Đại bác. U kích hoạt Robot khi đầy thanh chiêu cuối.',
    '#BẮN [J]', '-Giữ hoặc bấm J: 1 sát thương mỗi viên, 6 phát/giây. Hai băng riêng; cạn tự nạp 1.4 giây. R nạp sớm.',
    '#CHARGE [K] — MỖI ĐÒN TỐN 1 VIÊN MỖI KHẨU',
    '-Dưới 0.25s (15f): bắn 2 viên 1 sát thương cùng lúc, một trên một dưới.',
    '-Từ 0.25s đến dưới 0.5s (15–29f): hợp nhất thành 1 viên xuyên mọi mục tiêu, 3 sát thương. Tự phá đạn địch có HP NHỎ HƠN 3, dùng bảng HP của Rune Phá Đạn; không cần trang bị Rune. Đạn có đúng 3 HP không bị phá.',
    '-Từ 0.5s (30f) đến 1s (60f): mini rail gây 5 sát thương NGAY LẬP TỨC lên mọi mục tiêu nằm trong tia phía trước. Giữ lâu hơn không tăng sát thương. Nếu một khẩu hết đạn, phải nạp trước khi dùng K.',
    '#COMBO LƯỚT — QUẠT TỔNG 60°',
    '-J → Lướt trong 0.4s: nhảy cao vượt đầu, tự chọn mục tiêu trong đường nhảy và chờ ở trên mục tiêu mới xả. Khi bắn giật nhẹ lên và lùi; không có mục tiêu thì xả gần đỉnh nhảy. Trên không: lướt rải quạt xuống. Lướt → J trong 0.3s: quạt ngang phía trước. 8–12 viên chia đều trong ±30°; dưới 8 viên thì nạp lại và thực hiện combo lần nữa.',
    '#J → NHẢY', '-Trong 0.4s sau J: nhảy cao, tự ngắm mọi hướng, giữ J bắn tối đa 4 viên; mỗi phát hãm rơi ngắn. Nhảy lần hai bật lên thật để canh vị trí, tới đỉnh xả nhanh xuống dưới; không tự ngắm ở nhịp này.',
    '#ĐẠI BÁC [Q/E ĐỔI DẠNG, J KHAI HỎA]',
    '-K khi đủ 2 viên: tiêu cả hai, nạp 0.2s rồi chưởng tia mảnh tự ngắm trong 2s. Tia xanh trắng có các hạt xanh/cam xoắn quanh, đẩy mục tiêu tới biên tường. 60 sát thương nếu trúng toàn bộ; hạt xoắn không cộng sát thương riêng. Không tự nạp lại đạn Đại bác.',
    '-Sức chứa 2 đầu đạn. Mỗi trận bắt đầu 0 đạn. Nạp ĐỘC LẬP: Song súng và Song kiếm đều tích sát thương thật vào thanh riêng, mỗi bên tối đa 30 để nạp 1 viên. Không cần theo thứ tự. Mỗi bên giữ tối đa 1 viên; bắn viên nào thì mở lại thanh của bên đó. Sát thương vượt 30 không được tích trữ.',
    '-Đạn tên lửa homing ưu tiên boss có máu hiện tại cao nhất. Nổ bán kính 5cm: tâm 40, cách 1cm 32, 2cm 24, 3cm 16, 4cm 8, 5cm 0; tính khoảng cách từ tâm nổ tới thân mục tiêu. Sát thương đại bác không tự nạp lại đại bác.',
    '#SONG KIẾM [J]', '-Hai súng gắn lưỡi dài dưới nòng, viền xanh và cam. Vung cả hai cùng lúc, tay phải dẫn nhịp. Chuỗi J: phải qua trái 2+2, trái qua phải 2+2, chữ X 3+3. Ngừng quá 0.8s sẽ bắt đầu lại chuỗi. Không tiêu đạn súng.',
    '#COMBO KIẾM', '-J → Lướt: hoàn tất nhát mở đầu rồi liên trảm suốt cú lướt, tổng 3+3 mỗi mục tiêu đi qua. Lướt → J: lướt chém X cong và dài, 3+3. J → Nhảy: bật lên chém hai kiếm, 2+2. Trên không: chỉ 2 đòn lặp lại — chém ngang 2+2 rồi lao xuống bổ đôi 3+3; hãm rơi trong 18 khung hình khi vung. Cúi + J: chém ngang nhanh luân phiên từng kiếm, 2 sát thương mỗi lần. K lần 1: xoay đôi 5 sát thương, tiến ngắn; K lần 2: xoay lớn 5 sát thương, đi xa bằng lướt và xuyên qua mục tiêu. Có thể bấm K lần 2 trong đòn đầu để nối đòn. K → Lướt trong 0.4s: lốc kiếm xuyên mục tiêu, tổng 3+3 mỗi mục tiêu trong cú lướt. K trên không: bổ xuống ngay, 3+3. Unity và Lơ Lửng bị khóa; các kết hợp Rune khác chờ thiết kế sau.',
    '#CHIÊU CUỐI RIÊNG [U]', '-Đại bác là dạng thứ ba, không phải chiêu cuối. U khi đầy thanh: biến thành Robot 20 giây, 10 HP giáp riêng, không tiêu đạn Đại bác. J: Plasma hai nửa xoắn, 5 sát thương, 2 phát/giây. KKK: chéo phải 6, chéo trái 6, xoay ngang 8. Giữ U: tên lửa từ lưng vòng ra trước, homing 4 sát thương, mỗi đợt 4 viên cùng lúc, 1 đợt/giây, kho 20 viên. Hết tên lửa: trở lại bình thường, không mất HP. Vỡ giáp: kết thúc và mất 1 HP thật. Hết đủ 20 giây: kết thúc không mất HP. Chỉ nhảy một lần; giữ nhảy lúc rơi để lơ lửng bằng phản lực bay lên chậm, tối đa khoảng 4 giây trên không mỗi lần nhảy. Q/E và R khóa trong Robot.',
    '#THOÁT COMBO', '-Xuống hoặc Khiên thoát tư thế; Lướt thoát Không Kích / Xả Băng. Combo không cộng thêm miễn thương ngoài cú lướt vốn có.'
]);
// PLAYER_PART_END s7.AMMO_CHITIET_VI.push.1

// index.html:101176 · Phạm vi: global
// PLAYER_PART_BEGIN s7.AMMO_CHITIET_EN.push.1 EDITABLE
AMMO_CHITIET_EN.push([
    '#PISTOLS / GUNBLADES / CANNON', '-Each pistol has 6 rounds. J alternates; R reloads. Q/E cycle all three forms; J attacks. U activates the Robot ultimate with a full meter.',
    '#CHARGE K — ONE ROUND FROM EACH GUN', '-Under 0.25s: two simultaneous 1-damage bullets, one above the other. 0.25–0.5s: one 3-damage piercing fusion round, intrinsically destroying enemy bullets with strictly less than 3 HP using the Bullet Clash Rune classification. From 0.5s: instant mini rail, 5 damage to every target along the forward beam. Fully charged at 1s; holding longer adds no damage.',
    '#DASH FANS', '-8–12 evenly spaced bullets, ±30° (60° total), downward for J→Dash and forward for Dash→J. Ground J→Dash jumps higher, detects a target along the vault, waits until overhead, then fires with a small upward/backward recoil; with no target, fires near the apex. Fewer than 8 rounds triggers reload; repeat the combo afterwards.',
    '#AIR COMBO', '-J→Jump: higher leap, full-angle target aim, up to four recoil-braked J shots. Jump again: true second leap, then a downward burst at the apex, with no auto aim.',
    '#CANNON', '-Starts empty every run; capacity 2. Independent loading: pistols and swords each store up to 30 actual damage for one shell, in either order. Firing frees the corresponding source slot. Excess damage does not carry over, and cannon damage cannot recharge itself. Homing prioritizes the boss with the highest current HP. Explosion radius 5cm; 40 damage at the center, falling by 8 per cm to zero at 5cm, measured to the target body.',
    '#ROBOT ULTIMATE [U]', '-Full meter activates a 20-second Robot with 10 armour HP. J: spinning two-half plasma, 5 damage, 2 shots/s. KKK: right diagonal 6, left diagonal 6, horizontal spin 8. Hold U: back-mounted homing missiles, 4 damage each, simultaneous volleys of 4 once per second, total 20. Empty missiles ends the form with no HP cost; broken armour costs 1 real HP; normal timeout costs none. Single jump, then hold jump while falling for slow ascent for up to 4 seconds airborne per jump. Q/E and R are disabled. Cannon resources stay separate.',
    '#GUNBLADES', '-Dual long under-barrel blades, cyan and amber. J chain: 2+2, 2+2, 3+3 X. Right hand leads the simultaneous swings. J→Dash: opening swing then rapid cuts, 3+3 per crossed target total. Dash→J: longer curved X, 3+3. J→Jump: upward twin cut, 2+2. Air J alternates horizontal 2+2 and a diving 3+3 cleave, with 18 frames of reduced falling per swing. Crouch J alternates quick single-blade horizontal cuts for 2 each. K: 5-damage twin spin with a short advance, then a larger 5-damage spin travelling as far as a dash. Tap K again during the first spin to queue it. Air K dives immediately for 3+3. No pistol ammo cost. Unity and Hover are locked; other Rune combinations await design. K→Dash is a travelling sword tornado, 3+3 once per target.'
]);
// PLAYER_PART_END s7.AMMO_CHITIET_EN.push.1

// index.html:101186 · Phạm vi: global
// PLAYER_PART_BEGIN s7.window.addEventListener.1 EDITABLE
window.addEventListener('keydown',e=>{
    if((e.code==='KeyQ'||e.code==='KeyE') && !e.repeat && typeof dino!=='undefined' && sgOn(dino)
       && ['normal','boss_rush','test_boss','pvp'].includes(gameState) && !gameOver && !deathCineActive){
       e.preventDefault();sgChangeForm(dino,e.code==='KeyE'?1:-1);
    }
    if(e.code==='KeyR' && !e.repeat && typeof dino!=='undefined' && sgOn(dino)
       && ['normal','boss_rush','test_boss','pvp'].includes(gameState) && !gameOver && !deathCineActive){
       e.preventDefault();sgReload(dino);
    }
});
// PLAYER_PART_END s7.window.addEventListener.1
