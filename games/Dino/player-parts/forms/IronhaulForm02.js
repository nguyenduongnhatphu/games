// PLAYER_FILE: IronhaulForm02
// PLAYER_SNAPSHOT: bae52db6534a8318283b8c7d74ac1420b52adb74ae335721bf4bc7249c2da3be
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: IRON_DRIVE_MAX, IRON_DRIVE_RUNUP, IRON_FORM, IRON_MODES, IRON_ROBOT_H, IRON_ROBOT_W, Player, ammoPicker, ammoXem, apexWrap, battuMa, checkAABB, ctx, cusNCPicker, danteTick, dino, dojoMode, dojoUltBusy, drawCustomMenu, drawUI, formAmmoSummary, frames, ironActive, ironArea, ironBegin, ironBody, ironCancel, ironCapture, ironCommand, ironDamage, ironDriveImpact, ironFlankStep, ironForm, ironFriendlyRound, ironGeometry, ironInit, ironKinematicsMatrix, ironLabel, ironOn, ironPower, ironResetDrive, ironRoundTick, ironSilverEnd, ironSpawnMissiles, ironTarget, ironTargets, ironTriggerBunker, ironTruckLanding, ironWhite, ironhaulCoreFx, ironhaulEase, ironhaulMix, ironhaulPolygon, ironhaulRig, ironhaulRobot, ironhaulTruck, keys, mapTheme, resolveSolidPillars, resolveTetrisWalls, runePicker, runeXem, sgSegmentBox, ultCharge, worldL, worldR, xDatForm
// index.html:116225 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironTick.1 EDITABLE
function ironTick(){
    if(!ironActive())return;const n=dino;if(!n.ironhaul)ironInit(n);const p=n.ironhaul;
    ironTruckLanding(n);
    n.parryWindow=Math.max(0,p.perfectUntil-frames);n.meleeTimer=Math.max(0,Math.min(n.meleeTimer,p.guardUntil-frames));if(frames>=p.perfectUntil)n.meleeTimer=Math.min(22,n.meleeTimer);
    if(p.silver>0&&!p.silverFinishing){p.silver--;ultCharge=0;if(!p.silver)ironSilverEnd(n);}
    if(p.novaReady>0)p.novaReady--;
    p.reach=(p.reach??112)+((p.attack?.slash?.reach??112)-(p.reach??112))*.38;
    if(p.core>0)p.core--;if(p.coreReady>0)p.coreReady--;if(p.muzzle>0)p.muzzle--;if(p.transition>0)p.transition--;
    p.fx=p.fx.filter(f=>--f.t>0);
    p.trails=p.trails.filter(f=>--f.t>0);p.ghosts=p.ghosts.filter(f=>--f.t>0);
    p.jets=(p.jets||[]).filter(j=>--j.t>0);
    p.bunkers=(p.bunkers||[]).filter(b=>--b.t>0);
    for(const sh of p.shells||[]){sh.x+=sh.vx;sh.y+=sh.vy;sh.vy+=0.38;sh.ang+=0.35;sh.t--;}
    p.shells=(p.shells||[]).filter(sh=>sh.t>0);

    if(n.grounded)p.airCombo=0;
    if(p.pendingJump){if(frames>p.pendingJump.until)p.pendingJump=null;else if(!n.grounded&&(n.jumpCount||0)>p.pendingJump.jumpCount){const kind=p.pendingJump.kind;ironCancel(n);ironBegin(kind==='J'?(ironWhite(p)?'ascension':'skyripper'):(ironWhite(p)?'starfall':'gunrain'),n);}}
    if(p.k!==null){if(keys.KeyK)p.k=Math.min(90,p.k+1);else{const charge=p.k;p.k=null;ironCommand('K',n,charge);}}
    if(p.counter&&frames>=p.counter){p.counter=0;p.guardUntil=-100;ironBegin('riposte',n);}
    if(!p.attack&&p.mode===2&&keys.KeyJ&&!keys.KeyK&&frames>=p.guardUntil)ironCommand('J',n);
    const a=p.attack;
    if(a){
        const m=a.move,old=a.geometry||ironGeometry(n);a.age++;if(p.mode===2)a.dir=p.driveHeading;n.isFacingLeft=a.dir<0;
        // Sinh luồng lửa phản lực (Jet Booster Plume) sau lưng và vai Robot khi tung đòn cơ khí
        if(m.jet&&a.age>=2&&a.age<=m.T-6&&a.age%2===0){
            p.jets.push({
                x:n.x+n.w/2-a.dir*(p.mode===2?36:14),
                y:n.y+(p.mode===2?20:26)+(Math.random()-0.5)*10,
                dir:-a.dir,
                power:m.jet,
                white:ironWhite(p)||p.core>0,
                t:7,max:7
            });
        }
        if(m.jump&&a.age===m.jump[0]){n.dy=m.jump[1];n.grounded=false;}
        if(m.diveAt&&a.age>=m.diveAt&&!n.grounded)n.dy=Math.max(11,n.dy);
        if(m.flank)ironFlankStep(n,a);
        if(m.airSlow&&a.age<=m.airSlow&&!n.grounded)n.dy=Math.min(n.dy,.55);
        if(m.plunge&&a.age>=14&&!n.grounded)n.dy=Math.max(14,n.dy);
        if(p.mode!==2&&m.step&&a.age>=m.step[0]&&a.age<=m.step[1]){
            const x=n.x,target=ironTarget(n);let travel=m.step[2];
            if(m.waitLand&&a.target?.hp>0)travel=Math.max(-travel,Math.min(travel,(a.target.x+a.target.w/2-n.x-n.w/2)*a.dir));
            else if(travel>0&&!m.ram&&target)travel=Math.min(travel,Math.max(0,(target.x+target.w/2-n.x-n.w/2)*a.dir-52));
            n.x=Math.max(worldL(),Math.min(worldR()-n.w,n.x+a.dir*travel));if(mapTheme==='tetris')resolveTetrisWalls(n,n.x-x);else resolveSolidPillars(n);
        }
        for(const beat of m.sword||[])if(a.age===beat[0]){ironCapture(n,6);const [at,kind,reach,life,damage]=beat,angles=kind==='rise'?[.52,-1.9]:kind==='thrust'?[-.12,.08]:kind==='downthrust'?[1.5,1.64]:kind==='low'?[-.08,.08]:kind==='spin'?[0,0]:[-2.2,.65];a.slash={kind,reach:reach*(ironWhite(p)?1.14:1),life,age:0,a0:angles[0],a1:angles[1],angle:angles[0],damage:ironPower(p,damage+(p.core?1:0),a),hit:new Set()};}
        for(const beat of m.shield||[])if(a.age===beat[0]){ironCapture(n,6);a.shield={kind:beat[1],age:0,life:beat[2],damage:ironPower(p,beat[3],a),hit:new Set()};}
        if(a.slash){const s=a.slash;s.age++;s.angle=s.a0+(s.a1-s.a0)*ironhaulEase(s.age/s.life);}
        if(a.shield)a.shield.age++;

        // Kích hoạt Cọc Thủy Lực Pile Bunker (nếu đòn đánh có thuộc tính `bunker`)
        if(m.bunker){
            for(let bIdx=0;bIdx<m.bunker.length;bIdx+=3){
                if(a.age===m.bunker[bIdx]){
                    ironTriggerBunker(n,m.bunker[bIdx+1],m.bunker[bIdx+2]);
                }
            }
        }
        // Kích hoạt Phóng Tên Lửa Vòm Dẫn Đường (nếu đòn đánh có thuộc tính `missiles`)
        if((m.missiles||[]).includes(a.age)){
            ironSpawnMissiles(n,m.ultimate?4:ironWhite(p)?3:2);
        }

        const g=ironGeometry(n);a.geometry=g;
        for(const o of ironTargets(n)){const root=o.__goc||o,s=a.slash,h=a.shield;
            if(s&&!s.hit.has(root))for(let k=0;k<=6;k++){const u=k/6;if(sgSegmentBox(ironhaulMix(old.grip.x,g.grip.x,u),ironhaulMix(old.grip.y,g.grip.y,u),ironhaulMix(old.tip.x,g.tip.x,u),ironhaulMix(old.tip.y,g.tip.y,u),o,6)!==null){s.hit.add(root);ironDamage(n,o,s.damage,a);break;}}
            if(h&&!p.shieldOut&&!h.hit.has(root)&&h.age>=h.life*.15&&h.age<=h.life*.92&&(checkAABB(g.shieldBox,o)||sgSegmentBox(old.shield.x,old.shield.y,g.shield.x,g.shield.y,o,10)!==null)){h.hit.add(root);ironDamage(n,o,h.damage,a);}
            if(m.ram&&a.age>=2&&a.age<=26&&!a.hits.has(root)&&checkAABB(n,o)){a.hits.add(root);if(frames-(p.driveHits.get(root)??-1000)>=30)ironDriveImpact(n,o);}
        }
        if(a.slash){
            p.trails.push({grip:{...old.grip},tip:{...old.tip},toGrip:{...g.grip},toTip:{...g.tip},white:ironWhite(p),core:p.core>0,t:10});
            if((p.core||ironWhite(p))&&a.slash.kind==='thrust'&&a.slash.age===6)ironFriendlyRound(n,'wave',3);
            if(a.slash.age>=a.slash.life){ironCapture(n,8);a.slash=null;}
        }
        if(a.shield&&a.shield.age>=a.shield.life){ironCapture(n,8);a.shield=null;}
        if((m.shots||[]).includes(a.age))ironFriendlyRound(n,m.round,m.power||(m.round==='shield'?4:1));
        // Nạp lõi Overdrive Ignition (I): Kích hoạt ngay ở frame 12 thay vì bắt đứng chờ 72 frames!
        if(a.id==='charge'&&a.age===12){
            p.core=540;
            p.fx.push({x:n.x+n.w/2,y:n.y+24,r:58,t:20,max:20});
            ironLabel('OVERDRIVE CORE · 9 GIÂY');
        }
        if((m.waves||[]).includes(a.age))for(const tilt of m.fan?[-.22,0,.22]:[0])ironFriendlyRound(n,'wave',3.2,tilt);
        if(m.nova&&a.age===m.nova[0])ironArea(n,m.nova[1],m.nova[2],a);
        if(m.plunge&&a.age>=14&&n.grounded&&!a.landed){a.landed=true;ironArea(n,6.5,84,a);}
        if(m.ultimate&&a.age===92)ironArea(n,14,155,a);
        if((m.plunge&&!a.landed||m.waitLand&&!n.grounded)&&a.age>=m.T&&!(++a.airWait>90))a.age=m.T-1;
        const follow=p.queue?.follow&&a.age>=(m.link||10)&&(!m.waitLand||n.grounded)?p.queue:null;
        if(follow){ironCancel(n);ironBegin(follow.follow,n);if(p.attack)p.attack.input=follow.key;}
        else if(a.age>=m.T){ironCapture(n,8);p.attack=null;p.ended=frames;const queued=p.queue;p.queue=null;if(m.ultimate)ironSilverEnd(n);else if(queued&&!queued.follow&&frames<=queued.until)ironCommand(queued.key,n,queued.charge,queued.down);}
    }
    const dx=n.x-p.lastX;
    if((Math.abs(dx)>6||p.attack?.move.jet>=3)&&frames%3===0){const b=ironBody(n);b.rigPose=b.rigPose||ironhaulRig(b);p.ghosts.push({body:b,cx:n.x+n.w/2,cy:n.y+n.h/2,t:10});}
    p.ghosts=p.ghosts.slice(-6);p.trails=p.trails.slice(-24);
    ironRoundTick(n);p.speed=(p.speed||0)*.6+dx*.4;p.gait+=Math.abs(dx)*.11;p.lastX=n.x;
}
// PLAYER_PART_END s22.ironTick.1

// index.html:116321 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironCombatBase.1 EDITABLE
const ironCombatBase=danteTick;
// PLAYER_PART_END s22.ironCombatBase.1

// index.html:116321 · Phạm vi: global
// PLAYER_PART_BEGIN s22.danteTick.1 EDITABLE
danteTick=function(){ironCombatBase();ironTick();};
// PLAYER_PART_END s22.danteTick.1

// index.html:116322 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDamageBase.1 EDITABLE
const ironDamageBase=Player.prototype.takeDamage;
// PLAYER_PART_END s22.ironDamageBase.1

// index.html:116323 · Phạm vi: global
// PLAYER_PART_BEGIN s22.Player.prototype.takeDamage.1 EDITABLE
Player.prototype.takeDamage=function(...args){if(ironActive(this)&&this.ironhaul?.mode===2&&(this.ironhaul.driveShield||frames<this.ironhaul.driveGuardUntil))return;const hp=this.hp,result=ironDamageBase.apply(this,args);if(ironOn()&&this===dino&&this.ironhaul&&this.hp<hp){const p=this.ironhaul,a=p.attack;ironResetDrive(this);ironCancel(this);p.counter=0;p.combo=0;if(a?.move.ultimate)ironSilverEnd(this);}return result;};
// PLAYER_PART_END s22.Player.prototype.takeDamage.1

// index.html:116325 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironRenderBodyWithKinematics.1 EDITABLE
function ironRenderBodyWithKinematics(b,cx,cy){
    const m=ironKinematicsMatrix(b,cx,cy);
    ctx.save();
    ctx.transform(m.a,m.b,m.c,m.d,m.e,m.f);
    ctx.scale(b.scale,b.scale);
    if(b.vehicle)ironhaulTruck(b);
    else{ironhaulRobot(b);ironhaulCoreFx(b);}
    ctx.restore();
}
// PLAYER_PART_END s22.ironRenderBodyWithKinematics.1

// index.html:116335 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDraw.1 EDITABLE
function ironDraw(n){
    const p=n.ironhaul,b=ironBody(n);
    const cx=n.x+n.w/2,cy=n.y+n.h/2,dir=(p.attack?p.attack.dir:(n.isFacingLeft?-1:1));
    const kin=b._kin||{rot:0,lean:0,scaleX:1,offX:0,offY:0,spearCone:0,drillSpin:0};

    // 1. Vẽ Tàn Ảnh Quang Học (Optical Camo Afterimages) lưu đầy đủ góc nhào lộn trên không!
    for(const f of p.ghosts){
        ctx.save();ctx.globalAlpha=f.t/10*.22;
        ironRenderBodyWithKinematics(f.body,f.cx||cx,f.cy||cy);
        ctx.restore();
    }

    // 2. Vẽ Vòng Lửa Nhào Lộn Trên Không (Acrobatic Somersault Booster Ring) khi đang lộn vòng!
    if(Math.abs(kin.rot)>0.25){
        ctx.save();
        ctx.translate(cx+kin.offX,cy+kin.offY);
        ctx.rotate(kin.rot);
        ctx.globalAlpha=0.55;
        ctx.strokeStyle=ironWhite(p)?'#00E5FF':'#FF9100';
        ctx.lineWidth=4;
        ctx.beginPath();ctx.arc(0,0,34,0,Math.PI*1.35);ctx.stroke();
        ctx.strokeStyle='#FFFFFF';
        ctx.lineWidth=1.8;
        ctx.beginPath();ctx.arc(0,0,30,0.3,Math.PI*1.1);ctx.stroke();
        ctx.restore();
    }

    // 3. Vẽ Luồng Lửa Động Cơ Phản Lực (Jet Booster Plumes) sau lưng / gầm xe
    for(const j of p.jets||[]){
        const k=j.t/j.max,len=(20+j.power*12)*k;
        ctx.save();
        ctx.translate(j.x,j.y);
        ctx.scale(j.dir,1);
        ctx.globalAlpha=k*0.88;
        const jg=ctx.createLinearGradient(0,0,len,0);
        jg.addColorStop(0,'#FFFFFF');
        jg.addColorStop(0.4,j.white?'#00E5FF':'#FF9100');
        jg.addColorStop(1,'rgba(255, 61, 0, 0)');
        ctx.fillStyle=jg;
        ctx.beginPath();
        ctx.moveTo(0,-5*k);
        ctx.lineTo(len,0);
        ctx.lineTo(0,5*k);
        ctx.closePath();ctx.fill();
        ctx.restore();
    }

    // 4. Vẽ Dải Năng Lượng Lưỡi Kiếm Nhiệt / Quang Học (Plasma & Aegis Blade Ribbon)
    for(const f of p.trails){
        const k=f.t/10;
        ctx.save();
        ctx.globalAlpha=k*(f.white?.40:f.core?.36:.26);
        ctx.fillStyle=f.white?'#80D8FF':f.core?'#FF6D00':'#FFAB40';
        ctx.strokeStyle=f.white?'#E0F7FA':'#FFF8E1';
        ctx.lineWidth=2.2*k;
        ctx.beginPath();
        ctx.moveTo(f.grip.x,f.grip.y);
        ctx.lineTo(f.tip.x,f.tip.y);
        ctx.lineTo(f.toTip.x,f.toTip.y);
        ctx.lineTo(f.toGrip.x,f.toGrip.y);
        ctx.closePath();
        ctx.fill();ctx.stroke();
        ctx.restore();
    }

    // 5. Hào quang Lõi Overdrive & Silver Aegis dưới chân Robot
    if(ironWhite(p)||p.core>0){
        ctx.save();
        ctx.globalAlpha=.25;
        ctx.strokeStyle=ironWhite(p)?'#00E5FF':'#FF9100';
        ctx.lineWidth=2.2;
        ctx.beginPath();
        ctx.ellipse(cx,n.y+n.h-4,34+Math.sin(frames*.12)*3,8,0,0,7);
        ctx.stroke();
        ctx.restore();
    }

    // 6. Vẽ Khung Gầm Robot / Thiết Xa Ironhaul với Động Học Nhào Lộn / Đâm Lao
    ctx.save();
    if(n.invincible&&frames%6<3)ctx.globalAlpha=.45;
    ironRenderBodyWithKinematics(b,cx,cy);
    ctx.restore();

    // 7. HIỆU ỨNG MŨI GIÁO NĂNG LƯỢNG & MŨI KHOAN XOÁY (SPEAR CONE & DRILL VORTEX) KHI ĐÂM LAO!
    if(kin.spearCone>0.15&&p.attack){
        const c=kin.spearCone;
        const g=ironGeometry(n);
        const sx=g.grip.x,sy=g.grip.y;
        const reach=95*c;
        ctx.save();
        ctx.translate(sx,sy);
        ctx.scale(dir,1);
        ctx.globalAlpha=0.85*c;
        const sg=ctx.createLinearGradient(0,0,reach+28,0);
        sg.addColorStop(0,'rgba(255, 145, 0, 0.05)');
        sg.addColorStop(0.55,ironWhite(p)?'rgba(0, 229, 255, 0.78)':'rgba(255, 109, 0, 0.78)');
        sg.addColorStop(1,'#FFFFFF');
        ctx.fillStyle=sg;
        ctx.beginPath();
        ctx.moveTo(10,-15*c);
        ctx.lineTo(reach+32,0);
        ctx.lineTo(10,15*c);
        ctx.lineTo(26,0);
        ctx.closePath();ctx.fill();

        // Nếu là đòn Khoan Phản Lực (Drill Rush: Dash + J) -> Vẽ 3 vòng xoắn ốc xoay tít quanh mũi giáo!
        for(let r=0;r<3;r++){
            const rx=24+r*24;
            const radY=(16-r*3)*c;
            ctx.strokeStyle=r===0?'#FFFFFF':(ironWhite(p)?'#00E5FF':'#FFAB40');
            ctx.lineWidth=2.4*c;
            ctx.beginPath();
            ctx.ellipse(rx,0,5,radY,0,kin.drillSpin+r,kin.drillSpin+r+Math.PI*1.4);
            ctx.stroke();
        }
        ctx.restore();
    }

    // 8. Vẽ 4 Phễu Chiến Đấu Bay Lơ Lửng Sau Vai (Floating Aegis Bit Funnels)
    if(p.mode!==2&&(ironWhite(p)||p.core>0)){
        ctx.save();
        const funnelCount=ironWhite(p)?4:2;
        for(let i=0;i<funnelCount;i++){
            const tier=Math.floor(i/2);
            const hover=Math.sin(frames*0.12+i*1.4)*3.5;
            const fx=cx-dir*(18+tier*10),fy=n.y+12+tier*14+hover;
            ctx.save();
            ctx.translate(fx,fy);
            ctx.rotate(dir*(0.22-tier*0.12));
            ctx.fillStyle=ironWhite(p)?'#E0F7FA':'#37474F';
            ctx.strokeStyle=ironWhite(p)?'#00E5FF':'#FF9100';
            ctx.lineWidth=1.5;
            ctx.beginPath();
            ctx.moveTo(dir*10,0);ctx.lineTo(-dir*6,-4.5);ctx.lineTo(-dir*4,0);ctx.lineTo(-dir*6,4.5);
            ctx.closePath();ctx.fill();ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
    }

    // 9. Vẽ Mũi Đột Cọc Thủy Lực Nổ (Pile Bunker Piston Spike & Shock Rings)
    for(const bk of p.bunkers||[]){
        const k=bk.t/bk.max;
        ctx.save();
        ctx.globalAlpha=k;
        ctx.strokeStyle=bk.white?'#00E5FF':'#FF6D00';
        ctx.lineWidth=9*k;ctx.lineCap='round';
        ctx.beginPath();ctx.moveTo(bk.x,bk.y);ctx.lineTo(bk.ex,bk.ey);ctx.stroke();
        ctx.strokeStyle='#FFFFFF';
        ctx.lineWidth=3.5*k;
        ctx.beginPath();ctx.moveTo(bk.x,bk.y);ctx.lineTo(bk.ex,bk.ey);ctx.stroke();
        for(const rPos of [0.45,0.82]){
            const rx=bk.x+(bk.ex-bk.x)*rPos,ry=bk.y+(bk.ey-bk.y)*rPos;
            ctx.strokeStyle=bk.white?'#E0F7FA':'#FFE082';
            ctx.lineWidth=2.2*k;
            ctx.beginPath();
            ctx.ellipse(rx,ry,5,18*(1.2-0.3*k),0,0,7);
            ctx.stroke();
        }
        ctx.restore();
    }

    // 10. Vẽ Vỏ Đạn Đồng Văng Ra (Ejected Brass Casings)
    for(const sh of p.shells||[]){
        ctx.save();
        ctx.translate(sh.x,sh.y);
        ctx.rotate(sh.ang);
        ctx.globalAlpha=Math.min(1,sh.t/10);
        ctx.fillStyle='#FFD54F';
        ctx.fillRect(-2.5,-1.2,5,2.4);
        ctx.restore();
    }

    if(p.transition){
        ctx.save();ctx.globalAlpha=p.transition/16*.6;ctx.strokeStyle=p.mode===1?'#d2fcff':'#9bcee5';ctx.lineWidth=2;
        const u=1-p.transition/16;
        for(let i=0;i<8;i++){const a=i*Math.PI/4,R=18+u*28,x=cx+Math.cos(a)*R,y=cy+Math.sin(a)*R;ctx.save();ctx.translate(x,y);ctx.rotate(a+u);ctx.strokeRect(-4,-7,8,14);ctx.restore();}
        ctx.restore();
    }

    // 11. Vẽ Đạn Pháo, Railgun, Khiên Bay & Tên Lửa Vòm Dẫn Đường
    for(const q of p.rounds){
        ctx.save();
        if(q.kind==='missile'){
            ctx.lineCap='round';
            for(let i=1;i<q.trail.length;i++){
                const u=i/q.trail.length;
                ctx.globalAlpha=u*0.55;
                ctx.strokeStyle=q.white?'#80D8FF':'#FFAB40';
                ctx.lineWidth=2.5*u;
                ctx.beginPath();ctx.moveTo(q.trail[i-1].x,q.trail[i-1].y);ctx.lineTo(q.trail[i].x,q.trail[i].y);ctx.stroke();
            }
            ctx.globalAlpha=1;
            ctx.translate(q.x,q.y);
            ctx.rotate(Math.atan2(q.vy,q.vx));
            ctx.fillStyle='#ECEFF1';
            ctx.beginPath();ctx.moveTo(7,0);ctx.lineTo(-4,-3);ctx.lineTo(-4,3);ctx.closePath();ctx.fill();
            ctx.fillStyle=q.white?'#00E5FF':'#FF3D00';
            ctx.fillRect(-7,-2,3,4);
        }else{
            ctx.translate(q.x,q.y);ctx.fillStyle=q.white?'#bbfaff':'#ffda98';ctx.strokeStyle='#ecfbff';ctx.lineWidth=2;
            if(q.kind==='shield'){ctx.rotate(q.age*.32);ironhaulPolygon([[-12,-10],[0,-15],[13,-9],[13,9],[0,16],[-12,9]],'#dcebf3','#a4efff');}
            else if(q.kind==='wave'){ctx.rotate(Math.atan2(q.vy,q.vx));ctx.beginPath();ctx.arc(-8,0,q.r,-1.2,1.2);ctx.lineWidth=q.white?9:7;ctx.stroke();}
            else if(q.kind==='rail'){ctx.rotate(Math.atan2(q.vy,q.vx));ctx.fillRect(-24,-5,48,10);ctx.fillStyle='#fff';ctx.fillRect(-18,-2,38,4);}
            else{ctx.rotate(Math.atan2(q.vy,q.vx));ctx.beginPath();ctx.ellipse(0,0,q.r*1.6,q.r,0,0,7);ctx.fill();}
        }
        ctx.restore();
    }

    const lockTarget=ironTarget(n);
    if(lockTarget){
        const tx=lockTarget.x+lockTarget.w/2,ty=lockTarget.y+lockTarget.h/2;
        ctx.save();
        ctx.translate(tx,ty);
        ctx.rotate(frames*0.04);
        ctx.globalAlpha=0.52;
        ctx.strokeStyle=ironWhite(p)?'#00E5FF':'#FFAB40';
        ctx.lineWidth=1.6;
        const r=18+Math.sin(frames*0.15)*2;
        for(let i=0;i<4;i++){
            ctx.rotate(Math.PI/2);
            ctx.beginPath();ctx.moveTo(r-5,-r);ctx.lineTo(r,-r);ctx.lineTo(r,-r+5);ctx.stroke();
        }
        ctx.restore();
    }

    for(const f of p.fx){ctx.save();ctx.globalAlpha=f.t/f.max;ctx.strokeStyle='#b4f5ff';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(f.x,f.y,f.r*(1-f.t/f.max*.6),f.r*.5*(1-f.t/f.max*.6),0,0,7);ctx.stroke();ctx.restore();}
    if(p.mode===2&&(p.driveShield||frames<p.driveGuardUntil)){ctx.save();ctx.strokeStyle='#aaf7ff';ctx.lineWidth=3;ctx.shadowColor='#55dcff';ctx.shadowBlur=12;ctx.translate(cx+dir*n.w*.44,cy);ctx.scale(dir,1);ctx.beginPath();ctx.ellipse(0,0,10,n.h*.65,0,-Math.PI/2,Math.PI/2);ctx.stroke();ctx.restore();}
    if(p.mode===2&&Math.abs(p.driveSpeed)>8){ctx.save();ctx.strokeStyle='#94cfee';ctx.globalAlpha=.5;ctx.lineWidth=2;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(cx-dir*50,cy-8+i*8);ctx.lineTo(cx-dir*(68+Math.abs(p.driveSpeed)*i),cy-8+i*8);ctx.stroke();}ctx.restore();}
    if(frames<p.guardUntil){ctx.save();ctx.strokeStyle=frames<p.perfectUntil?'#fff6c4':'#9de8ff';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(cx,cy,n.w*.82,n.h*.6,0,0,7);ctx.stroke();ctx.restore();}
    if(p.k!==null){ctx.save();ctx.strokeStyle=p.k>=32?'#fff5b5':'#80ddff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,26,0,Math.PI*2*Math.min(1,p.k/32));ctx.stroke();ctx.restore();}
}
// PLAYER_PART_END s22.ironDraw.1

// index.html:116567 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironDrawBase.1 EDITABLE
const ironDrawBase=Player.prototype.draw;
// PLAYER_PART_END s22.ironDrawBase.1

// index.html:116567 · Phạm vi: global
// PLAYER_PART_BEGIN s22.Player.prototype.draw.1 EDITABLE
Player.prototype.draw=function(...args){if(ironOn()&&this===dino&&this.ironhaul){ironDraw(this);return;}return ironDrawBase.apply(this,args);};
// PLAYER_PART_END s22.Player.prototype.draw.1

// index.html:116568 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironPlayerPreview.1 EDITABLE
function ironPlayerPreview(x,feet){
    for(const mode of [0,1,2]){
        const cx=x+(mode-1)*90,w=mode===2?86:IRON_ROBOT_W,h=mode===2?34:IRON_ROBOT_H;
        const sample={x:cx-w/2,y:feet-h,w,h,isFacingLeft:false,grounded:true,ironhaul:{mode,attack:null,core:0,muzzle:0,shieldOut:0,gait:frames*.025,lastX:cx-w/2}};
        const b=ironBody(sample);ctx.save();ctx.scale(b.scale,b.scale);if(b.vehicle)ironhaulTruck(b);else ironhaulRobot(b);ctx.restore();
    }
}
// PLAYER_PART_END s22.ironPlayerPreview.1

// index.html:116575 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironUiBase.1 EDITABLE
const ironUiBase=drawUI;
// PLAYER_PART_END s22.ironUiBase.1

// index.html:116576 · Phạm vi: global
// PLAYER_PART_BEGIN s22.drawUI.1 EDITABLE
drawUI=function(){
    ironUiBase();if(!ironOn()||!dino.ironhaul)return;const p=dino.ironhaul,white=ironWhite(p);
    ctx.save();if(dojoMode)ctx.translate(0,15);ctx.fillStyle='#101e2c';ctx.fillRect(10,45,308,150);ctx.textAlign='left';ctx.font='bold 13px Consolas';ctx.fillStyle=white?'#efffff':'#b8edfa';ctx.fillText('IRONHAUL · '+IRON_MODES[p.mode],20,65);
    ctx.font='11px Consolas';ctx.fillStyle='#e1edf2';ctx.fillText(white?'SILVER AEGIS · '+(p.silverFinishing?'FINAL DISCHARGE':(p.silver/60).toFixed(1)+'s'):p.mode===2?'A/D: LÁI · S + NGƯỢC: LÙI · DASH: NITRO':'Q/E: ROBOT / TRUCK · J×5: COMBO',20,85);
    formAmmoSummary(p.mode===2?'TỐC ĐỘ '+Math.round(Math.abs(p.driveSpeed)/IRON_DRIVE_MAX*100)+'% · '+(p.driveShield?'KHIÊN XUNG KÍCH':frames<p.driveGuardUntil?'IFRAME SAU VA CHẠM':p.driveReverse?'SỐ LÙI':Math.round(p.driveDistance/IRON_DRIVE_RUNUP*100)+'% ĐÀ'):p.attack?.move.name||(p.k!==null?'GIỮ K: PHÁO TAM LIÊN':'J DASH / DASH J · K DASH / DASH K'),20,105,284,13);
    ctx.fillText(white?'I: NOVA · O: SOVEREIGN · U: ĐÒN KẾT':p.core?'KIẾM CƯỜNG HÓA: '+(p.core/60).toFixed(1)+'s':'I: LÕI '+(p.coreReady?Math.ceil(p.coreReady/60)+'s':'SẴN SÀNG')+' · O: ĐÒN NẶNG',20,133);
    ctx.fillStyle='#294355';ctx.fillRect(20,146,282,8);ctx.fillStyle=white?'#ecffff':'#a8efff';ctx.fillRect(20,146,282*(white?(p.silverFinishing?0:p.silver/p.silverMax):Math.min(100,ultCharge)/100),8);ctx.fillStyle='#fff';ctx.fillText(white?'U: DỒN THỜI GIAN CÒN LẠI → AEGIS BREAKER':'U: SILVER AEGIS 12s · '+Math.floor(ultCharge)+'%',20,178);ctx.restore();
};
// PLAYER_PART_END s22.drawUI.1

// index.html:116584 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironMenuBase.1 EDITABLE
const ironMenuBase=drawCustomMenu;
// PLAYER_PART_END s22.ironMenuBase.1

// index.html:116585 · Phạm vi: global
// PLAYER_PART_BEGIN s22.drawCustomMenu.1 EDITABLE
drawCustomMenu=function(){
    ironMenuBase();if(!ironOn()||runePicker!==null||battuMa||runeXem||ammoPicker||cusNCPicker||ammoXem!==null)return;
    ctx.save();ctx.fillStyle='#10212e';ctx.fillRect(24,76,276,452);ctx.fillRect(702,80,272,436);ctx.textAlign='left';ctx.fillStyle='#b1edff';ctx.font='bold 21px Consolas';ctx.fillText('IRONHAUL · MECHA',38,108);ctx.fillText('SILVER AEGIS · ULT',716,111);ctx.font='12px Consolas';ctx.fillStyle='#dbeaf2';
    apexWrap('CƠ GIÁP CHIẾN THUẬT (HEAVY MECHA)\n\n• J ×5: Kiếm Nhiệt → Nổ Cò Súng →\n  Đột Cọc Thủy Lực (Pile Bunker)!\n• Đang chém J bấm K: Pháo Kích\n  Gunblade & Đóng Cọc Cận Chiến!\n• K: Súng máy ngắm mục tiêu / Giữ K:\n  Pháo + 2 tên lửa dẫn đường\n• Dash J: Đột kích phản lực + Cọc\n• Dash K: Pháo Điện Từ (Railgun)\n• J Dash J: Lộn đâm → Vòng lưng xoay\n• Cúi J: Chém quét ngang tầm thấp\n• Xe: A/D lái, S + ngược để lùi\n• Dash xe: Húc mạnh, tự do đổi hướng\n• Xe nhảy: Đáp đất gây sát thương vùng\n• Q/E khi đang đánh: BIẾN HÌNH\n  TÔNG XE / ĐẬP ĐẤT TỨC THÌ!\n• I: Nổ Lõi Overdrive tức thì + Tên lửa\n• O: Đột Cọc Thủy Lực Cực Đại\n• L: Khiên Từ Trường (Perfect -> Phản)',38,140,248,18);
    apexWrap('SILVER AEGIS (OVERDRIVE 12 GIÂY)\nTriệu hồi Phễu Bay (Bit Funnels) &\nSát thương ×1.5 +1; Kiếm Quang Học.\n\n• J ×5: Quang Trảm → Khiên Xoay →\n  Cross Requiem → Sovereign Array\n  (Bão Kiếm Khí & Mưa Tên Lửa!)\n• Dash J: Thương Ánh Sáng + Cọc Nổ\n• Dash K: Song Luân Khiên + Tên Lửa\n• J/K Jump: Không Chiến Tên Lửa\n• Cúi K / I: Vụ Nổ Lõi Quang Học\n• O: Sovereign Array (Bão Kiếm Khí)\n\n• U LẦN NỮA: AEGIS BREAKER\n  Dồn năng lượng còn lại kích nổ\n  toàn màn hình + Mưa Tên Lửa!',716,142,246,17);ctx.restore();
};
// PLAYER_PART_END s22.drawCustomMenu.1

// index.html:116591 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironGuardMenuBase.1 EDITABLE
const ironGuardMenuBase=drawCustomMenu;
// PLAYER_PART_END s22.ironGuardMenuBase.1

// index.html:116591 · Phạm vi: global
// PLAYER_PART_BEGIN s22.drawCustomMenu.2 EDITABLE
drawCustomMenu=function(){ironGuardMenuBase();if(!ironOn()||runePicker!==null||battuMa||runeXem||ammoPicker||cusNCPicker||ammoXem!==null)return;ctx.save();ctx.fillStyle='#120c06';ctx.fillRect(334,388,338,78);ctx.font='bold 13px Consolas';ctx.fillStyle='#b1edff';ctx.textAlign='left';ctx.fillText('GUARD',340,410);ctx.textAlign='center';ctx.fillText('PARRY / COUNTER',548,410);ctx.textAlign='left';ctx.font='11px Consolas';ctx.fillStyle='#90aebe';ctx.fillText('L: Perfect 7f / Silver 9f → phản kích',340,439);ctx.restore();};
// PLAYER_PART_END s22.drawCustomMenu.2

// index.html:116592 · Phạm vi: global
// PLAYER_PART_BEGIN s22.ironUltBusyBase.1 EDITABLE
const ironUltBusyBase=dojoUltBusy;
// PLAYER_PART_END s22.ironUltBusyBase.1

// index.html:116592 · Phạm vi: global
// PLAYER_PART_BEGIN s22.dojoUltBusy.1 EDITABLE
dojoUltBusy=function(n){return !!(ironOn()&&n===dino&&n.ironhaul?.attack?.move.ultimate)||ironUltBusyBase(n);};
// PLAYER_PART_END s22.dojoUltBusy.1

// index.html:116593 · Phạm vi: global
// PLAYER_PART_BEGIN s22.IfStatement.1 EDITABLE
if(ironForm)xDatForm(IRON_FORM);
// PLAYER_PART_END s22.IfStatement.1
