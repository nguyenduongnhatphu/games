// PLAYER_FILE: DualGuns01
// PLAYER_SNAPSHOT: d5722ee1c848e806df184fefa1d479adadba816b9a6260bbabbdbacfd68be66b
// Nguồn: games/Dino/index.html
// File để sửa/gửi AI; không chạy riêng và không thêm script import vào game.
// Giữ marker, mã ngoài marker và tên API. Chỉ sửa trong EDITABLE.
// Các lớp/hàm __Part là khung cú pháp để mô tả đoạn nằm trong class/hàm/object gốc.
// Mỗi đoạn được ghép VỀ ĐÚNG PHẠM VI GỐC; không ghép các khung __Part vào game.
// Tham chiếu ngoài: CM, Effect, HUD_HANG, LT, Projectile, SFX, allTargets, beamClashReceive, bossAimTarget, bossProjectiles, bosses, checkAABB, clashHpOf, ctx, currentAmmoType, cusPvpDanh, dangNhayMul, dashVx, dealDamage, deathCineActive, doChieu, doChieuCo, doChieuThu, frames, gameOver, gameState, hasRune, hudHangSau, keys, projectiles, pvpDich, pvpMucCua, runeLocked, sanhChoUlt, sgRobotAmmoHud, sgRobotHud, shakeTimer, ultCharge, unityPicks, unityStep, unitySync, visualEffects, worldL, worldR
// index.html:100060 · Phạm vi: global
// PLAYER_PART_BEGIN s7.SG_DAN.1 EDITABLE
const SG_DAN = 20;
// PLAYER_PART_END s7.SG_DAN.1

// index.html:100061 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgState.1 EDITABLE
function sgState(n){
    return n.sg || (n.sg = { rounds:[6,6], next:0, kick:[0,0], flash:[0,0],
        angles:[0,0], reload:0, lastJ:-9999, lastDash:-9999, action:null,
        label:'', labelT:0, charge:0, jumpUsed:false, mode:'pistol', cannonKick:0, swordStep:0, swordAt:-9999, swordBrake:0, airStep:0, heavyStep:0, heavyAt:-9999, kPrev:false, kQueued:false,
        cannon:{progress:[0,0],loaded:[false,false],queue:[],next:0} });
}
// PLAYER_PART_END s7.sgState.1

// index.html:100067 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgOn.1 EDITABLE
function sgOn(n){ return !!n && n.ammoType === SG_DAN; }
// PLAYER_PART_END s7.sgOn.1

// index.html:100068 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRoll.1 EDITABLE
function sgRoll(n){const a=n.sg&&n.sg.action;return a&&['vault','spin','rain'].includes(a.kind)?(a.kind==='spin'?.3:1)*a.t/a.duration*Math.PI*2*a.dir:0;}
// PLAYER_PART_END s7.sgRoll.1

// index.html:100069 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgSync.1 EDITABLE
function sgSync(n){ const s=sgState(n); if(s.robot){n.maxAmmo=20;n.ammo=s.robot.missiles;return;} n.maxAmmo=s.mode==='cannon'?2:12; n.ammo=s.mode==='cannon'?s.cannon.queue.length:s.rounds[0]+s.rounds[1]; }
// PLAYER_PART_END s7.sgSync.1

// index.html:100070 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgLabel.1 EDITABLE
function sgLabel(n,t){ const s=sgState(n); s.label=t; s.labelT=65; }
// PLAYER_PART_END s7.sgLabel.1

// index.html:100071 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgReload.1 EDITABLE
function sgReload(n){
    const s=sgState(n);
    if(s.robot||s.mode!=='pistol')return;
    if(s.reload || s.rounds[0]+s.rounds[1]===12) return;
    s.reload=84; s.action=null; s.charge=0;
    n.aKeyHeldTime=0; n.chargeProgress=0;
    sgLabel(n,LT('NẠP HAI BĂNG','RELOADING'));
    if(SFX.tone) SFX.tone(280,.07,'triangle',.09,140);
}
// PLAYER_PART_END s7.sgReload.1

// index.html:100080 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgPose.1 EDITABLE
function sgPose(n,i){
    const s=sgState(n), k=s.kick[i]/9, a=s.action;
    let angle=s.angles[i] || 0;
    if(a && (a.kind==='dumpRise'||a.kind==='dump')) angle=Math.PI/2+(i?-.15:.15);
    if(s.charge>0) angle=0;
    let x=(i?39:35)-k*7, y=(i?24:30)+(n.isCrouching?12:0);
    if(s.reload){ const t=1-s.reload/84; x-=5+Math.sin(t*Math.PI)*6; y+=5; angle=1.0+Math.sin(t*Math.PI)*.6; }
    return {x,y,angle:angle-k*.38-sgRoll(n)*(n.isFacingLeft?-1:1)};
}
// PLAYER_PART_END s7.sgPose.1

// index.html:100089 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgMuzzle.1 EDITABLE
function sgMuzzle(n,i,angle){
    const p=sgPose(n,i), z=n.getFormScale(), d=n.isFacingLeft?-1:1;
    // World coordinates matching drawForm's mirroring and scale.
    const roll=sgRoll(n), local=angle-roll*d;
    const rx=d*((p.x+24*Math.cos(local))*z-n.w/2),ry=(p.y+24*Math.sin(local))*z-n.h/2;
    return {x:n.x+n.w/2+rx*Math.cos(roll)-ry*Math.sin(roll),
        y:n.y+n.h/2+rx*Math.sin(roll)+ry*Math.cos(roll), dir:d};
}
// PLAYER_PART_END s7.sgMuzzle.1

// index.html:100097 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgShot.1 EDITABLE
function sgShot(n,angle=0,damage=1,which=-1,pierce=0){
    const s=sgState(n);
    if(s.reload) return false;
    let i=which<0?s.next:which;
    if(!s.rounds[i]){ if(which>=0 || !s.rounds[1-i]) return false; i=1-i; }
    const p=sgMuzzle(n,i,angle), worldAngle=p.dir>0?angle:Math.PI-angle;
    let b=new Projectile(p.x-4,p.y-3,damage,0,0,pierce,p.dir,n.id);
    b.w=damage>1?14:8; b.h=damage>1?8:5;
    b.speed=Math.cos(worldAngle)*19; b.vy=Math.sin(worldAngle)*19;
    b.sg=true; b.sgSide=i; b._sgLife=0; b.sgOwner=n; b.sgOrigin='pistol';
    b.draw=function(){
        ctx.save(); ctx.translate(this.x+this.w/2,this.y+this.h/2); ctx.rotate(Math.atan2(this.vy,this.speed));
        ctx.globalAlpha=.22; ctx.fillStyle=this.sgSide?'#ffab40':'#54e5ff'; ctx.fillRect(-25,-3,28,6);
        ctx.globalAlpha=1; ctx.fillStyle=this.sgSide?'#ffd180':'#b2f5ff'; ctx.fillRect(-9,-2,this.w+6,4);
        ctx.fillStyle='#fff'; ctx.fillRect(0,-1,6,2); ctx.restore();
    };
    const oldUpdate=b.update;
    b.update=function(){
        const px=this.x,py=this.y;oldUpdate.call(this);
        if(this.sgMerged)sgBreakWeakRounds({x:Math.min(px,this.x),y:Math.min(py,this.y),w:this.w+Math.abs(this.x-px),h:this.h+Math.abs(this.y-py)});
        if(++this._sgLife>95){this.x=worldR()+5000;this.y=5000;}
    };
    projectiles.push(b);
    s.rounds[i]--; s.next=1-i; s.kick[i]=9; s.flash[i]=4; s.angles[i]=angle;
    sgSync(n);
    if(SFX.tone && s.lastShotSound!==frames){SFX.tone(i?390:470,.045,'square',.055,i?130:170);s.lastShotSound=frames;}
    return true;
}
// PLAYER_PART_END s7.sgShot.1

// index.html:100127 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgAirAngle.1 EDITABLE
function sgAirAngle(n){
    const target=gameState==='pvp' && typeof pvpDich==='function' ? pvpDich(n) : bossAimTarget(n.x+n.w/2,n.y+n.h/2);
    if(!target || target.hp<=0) return 0;
    const dir=n.isFacingLeft?-1:1, tx=target.x+target.w/2, ty=target.y+target.h/2;
    let angle=Math.atan2(ty-(n.y+n.h/2),(tx-(n.x+n.w/2))*dir);
    for(let k=0;k<3;k++){
        const p=sgMuzzle(n,sgState(n).next,angle);
        angle=Math.atan2(ty-p.y,(tx-p.x)*dir);
    }
    return angle;
}
// PLAYER_PART_END s7.sgAirAngle.1

// index.html:100138 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgAction.1 EDITABLE
function sgAction(n,kind,duration,dir){
    const s=sgState(n);
    if(s.reload || n.ammo<=0) return false;
    s.action={kind,t:0,duration,dir:dir || (n.isFacingLeft?-1:1),startY:n.y};
    n.aKeyHeldTime=0; n.chargeProgress=0; n.attackCooldown=duration+2;
    const names={vault:['VƯỢT ĐẦU','VAULT'],rain:['MƯA ĐẠN','RAIN SHOT'],spin:['XOÁY SÚNG','SPIN SHOT'],air:['KHÔNG KÍCH · TỰ NGẮM','AIR SHOT · AUTO AIM'],dumpRise:['NHẢY ĐÔI · CANH GÓC','DOUBLE JUMP · LINE UP'],dump:['XẢ BĂNG','DOWNPOUR']};
    if(names[kind]) sgLabel(n,LT(...names[kind]));
    return true;
}
// PLAYER_PART_END s7.sgAction.1

// index.html:100147 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgVaultTarget.1 EDITABLE
function sgVaultTarget(n,dir){
    const cx=n.x+n.w/2;
    return sgTargets(n).filter(o=>{
        if(o._beamClashPoint)return false;
        const dx=(o.x+o.w/2-cx)*dir;
        return dx>=-o.w/2&&dx<=340&&o.y+o.h>n.y;
    }).sort((a,b)=>Math.abs(a.x+a.w/2-cx)-Math.abs(b.x+b.w/2-cx))[0]||null;
}
// PLAYER_PART_END s7.sgVaultTarget.1

// index.html:100155 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgFan.1 EDITABLE
function sgFan(n,kind,dir){
    const s=sgState(n);sgSync(n);
    if(s.reload) return false;
    if(n.ammo<8){
        sgReload(n);sgLabel(n,LT('CẦN 8 VIÊN · NẠP LẠI','NEED 8 ROUNDS · RELOADING'));
        return false;
    }
    if(!sgAction(n,kind,30,dir)) return false;
    // Snapshot the available ammunition; each real round has one evenly spaced angle.
    Object.assign(s.action,{fanCount:Math.min(12,n.ammo),fanSent:0});
    if(kind==='vault'){
        const a=s.action,cx=n.x+n.w/2;
        a.duration=48;a.vaultReady=false;a.target=sgVaultTarget(n,a.dir);
        a.vaultSpeed=a.target?Math.max(3,Math.min(9,Math.abs(a.target.x+a.target.w/2-cx)/20)):7;
    }
    return true;
}
// PLAYER_PART_END s7.sgFan.1

// index.html:100172 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgLuot.1 EDITABLE
function sgLuot(n,dir){
    if(sgOn(n)&&sgState(n).beam)return;
    if(sgRobot(n))return;
    if(sgOn(n)&&sgState(n).mode==='sword'){
        const s=sgState(n);s.lastDash=frames;
        if(frames-(s.lastK??-9999)<=24){sgSwordStart(n,'bladeTornado',dir);s.action.duration=20;s.lastK=-9999;return;}
        if(frames-s.lastJ<=24){sgSwordStart(n,'bladeRush',dir);s.lastJ=-9999;}
        return;
    }
    if(!sgOn(n) || sgState(n).mode!=='pistol') return;
    const s=sgState(n); s.lastDash=frames;
    if(frames-s.lastJ<=24 && !s.action && !s.reload){
        if(n.grounded){
            if(sgFan(n,'vault',dir)){ n.dy=Math.min(-17,n.jumpPower*1.45*dangNhayMul(n)); n.grounded=false; n.canDoubleJump=true; n.jumpCount=1; }
        } else sgFan(n,'rain',dir);
    } else if(s.action && ['air','dumpRise','dump'].includes(s.action.kind)) s.action=null;
}
// PLAYER_PART_END s7.sgLuot.1

// index.html:100189 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgJump.1 EDITABLE
function sgJump(n){
    if(sgOn(n)&&sgState(n).beam)return true;
    if(sgRobot(n)){
        if(n.grounded){n.dy=n.jumpPower;n.grounded=false;n.jumpCount=1;n.canDoubleJump=false;sgRobot(n).hover=240;}
        return true;
    }
    if(sgOn(n)&&sgState(n).mode==='sword'){
        const s=sgState(n);
        if(frames-s.lastJ<=24&&(n.grounded||n.canDoubleJump)){
            const ground=n.grounded;n.dy=n.jumpPower*1.2*dangNhayMul(n);n.grounded=false;
            n.canDoubleJump=ground;n.jumpCount=ground?1:2;n.hoverTimer=0;n.hoverArmed=false;
            sgSwordStart(n,'bladeRise');s.lastJ=-9999;return true;
        }
        return false;
    }
    if(!sgOn(n) || sgState(n).mode!=='pistol') return false;
    const s=sgState(n);
    if(s.reload) return false;
    if(s.action && s.action.kind==='air' && !s.jumpUsed && n.canDoubleJump && !n.grounded){
        if(!sgAction(n,'dumpRise',110)) return false;
        // A real upward second jump, with time to move over the target before the burst.
        s.jumpUsed=true; n.canDoubleJump=false; n.jumpCount=Math.max(2,n.jumpCount||1);
        n.dy=n.jumpPower*1.12*dangNhayMul(n);n.hoverTimer=0;n.hoverArmed=false;
        return true;
    }
    if(!s.action && frames-s.lastJ<=24 && (n.grounded || n.canDoubleJump)){
        let ground=n.grounded;
        if(!sgAction(n,'air',180)) return false;
        Object.assign(s.action,{airShots:0,airCd:5,brake:0});
        n.dy=n.jumpPower*(ground?1.28:1.12)*dangNhayMul(n)*(hasRune('hyperspeed')?1.5:1);
        n.grounded=false; n.canDoubleJump=ground;n.hoverTimer=0;n.hoverArmed=false;
        n.jumpCount=ground?1:2; s.jumpUsed=!ground;
        return true;
    }
    return false;
}
// PLAYER_PART_END s7.sgJump.1

// index.html:100225 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgBefore.1 EDITABLE
function sgBefore(n){
    if(!sgOn(n)) return;
    const s=sgState(n), a=s.action;
    if(s.robot){n.canDoubleJump=false;n.hoverTimer=0;n.hoverArmed=false;
        if(!n.grounded&&(keys.Space||keys.KeyW||keys.ArrowUp)&&!(keys.KeyS||keys.ArrowDown)&&s.robot.hover>0){n.dy=Math.min(n.dy,-1.1-n.gravity);s.robot.hovering=true;}else s.robot.hovering=false;return;}
    if(s.mode==='sword'&&s.swordBrake>0){s.swordBrake--;if(n.dy>0)n.dy=Math.min(n.dy,.35)-n.gravity;}
    if(!a || n.hp<=0) return;
    if(((keys.KeyS || keys.ArrowDown)&&s.mode!=='sword') || n.isShielding()){ s.action=null; return; }
    if(a.kind==='bladeTornado')dashVx=a.dir*14;
    if(a.kind==='bladePlunge'){s.swordBrake=0;if(!n.grounded)n.dy=Math.max(n.dy,15);}
    if(a.kind==='vault'){
        if(a.recoil>0){a.recoil--;dashVx=-a.dir*1.5;}
        else dashVx=a.dir*(a.vaultSpeed||7);
    }
    if(a.kind==='rain') dashVx=a.dir*5;
    if(a.kind==='spin') dashVx=a.dir*3.5;
    if(a.kind==='air' && a.brake>0){
        a.brake--;if(n.dy>0)n.dy=Math.min(n.dy,1.1);
    }
    if(a.kind==='dump') n.dy=-n.gravity;
}
// PLAYER_PART_END s7.sgBefore.1

// index.html:100246 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgTick.1 EDITABLE
function sgTick(n){
    const s=sgState(n);
    sgSync(n);
    if(s.beam){sgCannonBeamTick(n);return;}
    for(let i=0;i<2;i++){ s.kick[i]=Math.max(0,s.kick[i]-1); s.flash[i]=Math.max(0,s.flash[i]-1); }
    if(s.labelT>0) s.labelT--;
    if(s.cannonKick>0)s.cannonKick--;
    if(!s.action) for(let i=0;i<2;i++) if(!s.kick[i]) s.angles[i]*=.7;
    if(n.hp<=0){s.action=null;return;}
    if(n.grounded){s.jumpUsed=false;s.airStep=0;}
    if(s.reload){
        if(--s.reload===0){s.rounds=[6,6];sgSync(n);n.isOverheated=false;n.overheatTimer=0;sgLabel(n,LT('SẴN SÀNG','READY'));if(SFX.tone)SFX.tone(650,.08,'triangle',.08,1000);}
        if(s.mode==='pistol')return;
    }
    if(s.mode==='sword'){sgSwordTick(n);return;}
    if(s.mode==='cannon')return;
    const a=s.action;
    if(a){
        a.t++;
        if(a.kind==='dumpRise' && n.dy>=-1){a.kind='dump';a.t=0;a.duration=10;a.dumpCount=s.rounds[0]+s.rounds[1];a.dumpSent=0;n.dy=0;sgLabel(n,LT('XẢ BĂNG','DOWNPOUR'));}
        const rain=a.kind==='vault'||a.kind==='rain';
        if(a.kind==='vault'&&!a.vaultReady){
            if(!a.target||a.target.hp<=0)a.target=sgVaultTarget(n,a.dir);
            const target=a.target,cx=n.x+n.w/2;
            const above=target&&n.y+n.h<=target.y+8;
            const aligned=target&&Math.abs(cx-(target.x+target.w/2))<=target.w/2+22;
            if((a.t>=8&&above&&aligned)||(!target&&n.dy>=-1)||a.t>=32){
                a.vaultReady=true;a.recoil=5;n.dy=Math.min(n.dy,-7);
                sgLabel(n,LT('VƯỢT ĐẦU · MƯA ĐẠN','VAULT · DOWNPOUR'));
            }
        }
        // Four real rounds per frame: an 8–12 round fan appears in 2–3 frames.
        for(let burst=0;burst<4 && a.fanCount && a.fanSent<a.fanCount && (a.kind!=='vault'||a.vaultReady);burst++){
            const u=a.fanSent/(a.fanCount-1);
            let center=rain?Math.PI/2:0;
            if(a.kind==='vault'&&a.target&&a.target.hp>0&&a.target.y+a.target.h/2>n.y+n.h/2){
                const d=n.isFacingLeft?-1:1;
                center=Math.atan2(a.target.y+a.target.h/2-(n.y+n.h/2),(a.target.x+a.target.w/2-(n.x+n.w/2))*d);
                center=Math.max(Math.PI/2-.35,Math.min(Math.PI/2+.35,center));
            }
            const angle=center+(u-.5)*(Math.PI/3);
            sgShot(n,angle,1);
            a.fanSent++;
        }
        if(a.kind==='dump')for(let burst=0;burst<4 && a.dumpSent<a.dumpCount;burst++){
            const u=a.dumpCount>1?a.dumpSent/(a.dumpCount-1):.5;
            sgShot(n,Math.PI/2+(u-.5)*.32,1);a.dumpSent++;
        }
        if(a.kind==='air'){
            const angle=sgAirAngle(n);s.angles=[angle,angle];
            if(a.airCd>0)a.airCd--;
            if(keys.KeyJ && a.airCd<=0 && a.airShots<4 && sgShot(n,angle,1)){
                a.airShots++;a.airCd=12;a.brake=5;
                if(n.dy>0)n.dy=Math.min(n.dy,1.1);
            }
        }
        const landed=n.grounded && a.t>5 && ['vault','rain','air','dumpRise','dump'].includes(a.kind)
            && (!a.fanCount || a.fanSent>=a.fanCount);
        if(a.t>=a.duration || (n.ammo===0&&!a.fanCount&&a.kind!=='dump') || landed){
            s.action=null; n.attackCooldown=10; if(a.kind==='dump') n.dy=3;
        }
    }
    if(!n.ammo && !s.action) sgReload(n);
}
// PLAYER_PART_END s7.sgTick.1

// index.html:100310 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgDraw.1 EDITABLE
function sgDraw(n,bx,by,P){
    const s=sgState(n);
    if(s.mode==='cannon'){sgDrawCannon(n,bx,by,P);return;}
    if(s.mode==='sword'){sgDrawSwords(n,bx,by,P);return;}
    // Far arm and silver pistol first, near black pistol last.
    for(const i of [1,0]){
        const p=sgPose(n,i), shoulder={x:bx+26,y:by+(i?20:24)};
        ctx.save(); ctx.lineCap='round';
        ctx.strokeStyle=P.out||'#101820';ctx.lineWidth=7;
        ctx.beginPath();ctx.moveTo(shoulder.x,shoulder.y);ctx.lineTo(bx+p.x-6,by+p.y+5);ctx.lineTo(bx+p.x,by+p.y);ctx.stroke();
        ctx.strokeStyle=i?'#8ba1ab':(P.lt||'#bc6046');ctx.lineWidth=4;ctx.stroke();
        ctx.translate(bx+p.x,by+p.y);ctx.rotate(p.angle);
        ctx.strokeStyle='#09121c';ctx.lineWidth=1.3;
        ctx.fillStyle=i?'#dce7ed':'#202b3b';
        ctx.beginPath();ctx.moveTo(-4,-5);ctx.lineTo(20,-5);ctx.lineTo(24,-2);ctx.lineTo(24,3);ctx.lineTo(5,3);ctx.lineTo(2,12);ctx.lineTo(-4,10);ctx.lineTo(-1,2);ctx.lineTo(-4,2);ctx.closePath();ctx.fill();ctx.stroke();
        ctx.fillStyle=i?'#718392':'#4a6075';ctx.fillRect(-2,-7,20,3);
        ctx.fillStyle=i?'#ffab40':'#54e5ff';ctx.fillRect(3,-4,13,1.5);ctx.fillRect(19,-5,2,6);
        ctx.fillStyle='#111923';ctx.fillRect(-1,4,3,5);ctx.fillRect(23,-2,2,4);
        ctx.strokeStyle='#a3b4bc';ctx.lineWidth=.8;ctx.strokeRect(3,3,5,4);
        ctx.fillStyle=i?'#d4ad7d':'#779aa8';ctx.fillRect(10,-8,3,2);
        if(s.flash[i]>0){
            ctx.fillStyle=i?'#ffbe64':'#8eefff';ctx.beginPath();ctx.moveTo(25,-3);ctx.lineTo(34,-7);ctx.lineTo(31,-1);ctx.lineTo(41,1);ctx.lineTo(31,3);ctx.lineTo(34,8);ctx.lineTo(25,4);ctx.closePath();ctx.fill();
            ctx.fillStyle='#fff';ctx.fillRect(25,-1,9,3);
        }
        if(s.charge>15){ctx.globalAlpha=.4+.3*Math.sin(frames*.3);ctx.strokeStyle=i?'#ffab40':'#54e5ff';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(24,1,3+Math.min(5,s.charge/18),0,Math.PI*2);ctx.stroke();}
        ctx.restore();
    }
}
// PLAYER_PART_END s7.sgDraw.1

// index.html:100340 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgTargets.1 EDITABLE
function sgTargets(n){
    const out=gameState==='pvp'&&n?pvpMucCua(n.id):allTargets().slice();
    for(const b of bosses)if(typeof b.minionTargets==='function')for(const t of b.minionTargets()||[])out.push(t);
    return [...new Map(out.filter(o=>o&&Number.isFinite(o.hp)&&o.hp>0).map(o=>[o.__goc||o,o])).values()];
}
// PLAYER_PART_END s7.sgTargets.1

// index.html:100345 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgCredit.1 EDITABLE
function sgCredit(n,origin,amount){
    if(!n || !n.sg || !(amount>0) || !Number.isFinite(amount))return;
    const c=n.sg.cannon,i=origin==='pistol'?0:origin==='sword'?1:-1;
    if(i<0 || c.loaded[i])return;
    c.progress[i]=Math.min(30,c.progress[i]+amount);
    if(c.progress[i]>=30){
        c.loaded[i]=true;c.queue.push(i);c.next=1-i;
        sgLabel(n,LT('ĐẠI BÁC +1 · '+c.queue.length+'/2','CANNON +1 · '+c.queue.length+'/2'));
        if(SFX.tone)SFX.tone(780,.13,'triangle',.12,1200);
    }
    if(sgOn(n))sgSync(n);
}
// PLAYER_PART_END s7.sgCredit.1

// index.html:100357 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgHitSnapshot.1 EDITABLE
function sgHitSnapshot(p){
    if(!p || !p.sg || !p.sgOwner || p.sgOrigin!=='pistol')return null;
    return {n:p.sgOwner,before:sgTargets(p.sgOwner).map(o=>[o,Math.max(0,o.hp)])};
}
// PLAYER_PART_END s7.sgHitSnapshot.1

// index.html:100361 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgHitDone.1 EDITABLE
function sgHitDone(snap){
    if(!snap)return;
    let damage=0;
    for(const [o,hp] of snap.before)damage+=Math.max(0,hp-Math.max(0,o.hp));
    sgCredit(snap.n,'pistol',damage);
}
// PLAYER_PART_END s7.sgHitDone.1

// index.html:100369 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgDamage.1 EDITABLE
function sgDamage(n,o,amount,origin){
    if(!o || o.invulnAll || !(o.hp>0) || !(amount>0))return 0;
    if(o._beamClashPoint)return n?.id===1&&beamClashReceive(o,amount)?amount:0;
    const before=Math.max(0,o.hp);
    const opponent=gameState==='pvp'?pvpDich(n):null;
    if(opponent&&(o===opponent||o===opponent._vo))cusPvpDanh(n,opponent,amount);
    else dealDamage(o,amount,'ammo');
    const dealt=Math.max(0,before-Math.max(0,o.hp));
    sgCredit(n,origin,dealt);return dealt;
}
// PLAYER_PART_END s7.sgDamage.1

// index.html:100379 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgClashTargets.1 EDITABLE
function sgClashTargets(){
    const out=[];
    for(const bp of bossProjectiles)out.push({o:bp,box:{x:bp.x,y:bp.y,w:bp.w||16,h:bp.h||16},kill(){const i=bossProjectiles.indexOf(bp);if(i>=0)bossProjectiles.splice(i,1);}});
    for(const b of bosses)if(typeof b.clashTargets==='function')for(const t of b.clashTargets()||[])out.push(t);
    return out;
}
// PLAYER_PART_END s7.sgClashTargets.1

// index.html:100385 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgBreakWeakRounds.1 EDITABLE
function sgBreakWeakRounds(box){
    // Use the Rune's 1 / 3 / 5 HP classification, with the requested STRICT <3 threshold.
    // This intrinsic effect replaces generic piercing-clash behavior for this round.
    if(gameState==='pvp')return;
    for(const t of sgClashTargets()){
        if(!t.o || t.o._clashDead || !t.box || !checkAABB(box,t.box))continue;
        const hp=t.o.clashHp!==undefined?t.o.clashHp:(t.hp!==undefined?t.hp:clashHpOf(t.o));
        if(!(hp<3))continue;
        t.o._clashDead=true;if(t.kill)t.kill();
        visualEffects.push(new Effect(t.box.x+t.box.w/2,t.box.y+t.box.h/2,'explosion',true,9));
    }
}
// PLAYER_PART_END s7.sgBreakWeakRounds.1

// index.html:100397 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgChargeMuzzle.1 EDITABLE
function sgChargeMuzzle(n){
    const a=sgMuzzle(n,0,0),b=sgMuzzle(n,1,0);
    return {x:(a.x+b.x)/2,y:(a.y+b.y)/2,dir:a.dir};
}
// PLAYER_PART_END s7.sgChargeMuzzle.1

// index.html:100401 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgReleaseCharge.1 EDITABLE
function sgReleaseCharge(n,t){
    const s=sgState(n);
    if(s.rounds.some(r=>r<1)){sgReload(n);sgLabel(n,LT('CHARGE CẦN 1 VIÊN MỖI KHẨU · NẠP LẠI','CHARGE NEEDS 1 ROUND PER GUN · RELOAD'));return;}
    const muzzle=sgChargeMuzzle(n);
    if(t<15){
        sgShot(n,0,1,0);sgShot(n,0,1,1);
        sgLabel(n,LT('BẮN KÉP','DOUBLE SHOT'));
    }else if(t<30){
        sgShot(n,0,3,0,Infinity);s.rounds[1]--;
        const p=projectiles[projectiles.length-1];p.sgMerged=true;
        p.w=24;p.h=10;p.x=muzzle.x-p.w/2;p.y=muzzle.y-p.h/2;
        p.draw=function(){
            ctx.save();ctx.translate(this.x+this.w/2,this.y+this.h/2);ctx.rotate(Math.atan2(this.vy,this.speed));
            ctx.fillStyle='rgba(115,222,239,.24)';ctx.fillRect(-35,-8,53,16);
            ctx.fillStyle='#73deef';ctx.fillRect(-28,-4,43,8);ctx.fillStyle='#ffbf67';ctx.fillRect(-21,-2,34,4);
            ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(22,0);ctx.lineTo(8,-3);ctx.lineTo(-7,0);ctx.lineTo(8,3);ctx.closePath();ctx.fill();
            ctx.strokeStyle='#d4faff';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(0,0,4,9,0,0,Math.PI*2);ctx.stroke();ctx.restore();
        };
        sgLabel(n,LT('HỢP NHẤT · XUYÊN PHÁ','FUSION · PIERCING'));
    }else{
        s.rounds[0]--;s.rounds[1]--;
        const end=muzzle.dir>0?worldR()+60:worldL()-60, height=12*n.getFormScale();
        const rect={x:Math.min(muzzle.x,end),y:muzzle.y-height/2,w:Math.abs(end-muzzle.x),h:height};
        doChieuThu({},rect,5);
        for(const o of sgTargets(n))if(checkAABB(rect,o))sgDamage(n,o,5,'pistol');
        visualEffects.push({timer:0,life:20,update(){this.timer++;},draw(){
            const p=this.timer/this.life;if(p>=1)return;
            ctx.save();ctx.globalAlpha=1-p;ctx.translate(muzzle.x,muzzle.y);ctx.scale(muzzle.dir,1);
            const length=Math.abs(end-muzzle.x);
            ctx.fillStyle='rgba(76,209,255,.2)';ctx.fillRect(0,-height*1.2,length,height*2.4);
            ctx.fillStyle='#66dcff';ctx.fillRect(0,-height*.45,length,height*.9);
            ctx.fillStyle='#fff';ctx.fillRect(0,-height*.13,length,height*.26);
            ctx.strokeStyle='#ffcf7d';ctx.lineWidth=2;
            for(let i=0;i<6;i++){ctx.beginPath();ctx.ellipse(20+i*30+this.timer*9,0,4,height*(.9+i*.12),0,0,Math.PI*2);ctx.stroke();}
            ctx.restore();
        }});
        shakeTimer=Math.max(shakeTimer,7);sgLabel(n,LT('MINI RAIL · 5 SÁT THƯƠNG','MINI RAIL · 5 DAMAGE'));
        if(SFX.tone)SFX.tone(1500,.14,'sawtooth',.13,160);
    }
    s.kick=[9,9];s.flash=[4,4];s.angles=[0,0];s.lastJ=frames;
    n.attackCooldown=16;sgSync(n);
}
// PLAYER_PART_END s7.sgReleaseCharge.1

// index.html:100443 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgChangeForm.1 EDITABLE
function sgChangeForm(n,dir=1){
    if(!sgOn(n)||n.hp<=0||deathCineActive||sgRobot(n)||sgState(n).beam)return;
    const s=sgState(n);s.mode=['pistol','sword','cannon'][(['pistol','sword','cannon'].indexOf(s.mode)+dir+3)%3];
    s.lastK=-9999;s.swordStep=0;s.airStep=0;s.heavyStep=0;s.kQueued=false;s.kPrev=!!keys.KeyK;s.swordBrake=0;
    s.action=null;s.charge=0;s.lastJ=s.lastDash=-9999;
    n.aKeyHeldTime=0;n.chargeProgress=0;n.attackCooldown=10;
    sgSync(n);sgLabel(n,s.mode==='cannon'?LT('ĐẠI BÁC · J KHAI HỎA','CANNON · J FIRE'):s.mode==='sword'?LT('SONG KIẾM','DUAL GUNBLADES'):LT('SONG SÚNG','DUAL PISTOLS'));
    if(SFX.tone)SFX.tone(320,.09,'triangle',.09,600);
}
// PLAYER_PART_END s7.sgChangeForm.1

// index.html:100452 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgBeamAim.1 EDITABLE
function sgBeamAim(n,b){
    if(!b.target||b.target.hp<=0||b.target.dying)b.target=sgCannonTarget(n);
    const z=n.getFormScale(),d=b.dir,p={x:n.x+n.w/2+d*(35*z-n.w/2),y:n.y+24*z};
    let angle=0;
    if(b.target)angle=Math.atan2(b.target.y+b.target.h/2-p.y,(b.target.x+b.target.w/2-p.x)*d);
    angle=Math.max(-1.35,Math.min(1.35,angle));b.angle=angle;
    const vx=d*Math.cos(angle),vy=Math.sin(angle),x=p.x+47*z*vx,y=p.y+47*z*vy;
    const length=Math.max(0,(d>0?worldR()-x:x-worldL())/Math.max(.1,Math.cos(angle)));
    return {x,y,ex:x+vx*length,ey:y+vy*length,vx,vy,length};
}
// PLAYER_PART_END s7.sgBeamAim.1

// index.html:100462 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgCannonBeam.1 EDITABLE
function sgCannonBeam(n){
    const s=sgState(n);if(s.robot||s.beam||s.mode!=='cannon')return;
    if(s.cannon.queue.length<2){sgLabel(n,LT('K CẦN ĐỦ 2 VIÊN','K NEEDS BOTH SHELLS'));return;}
    const target=sgCannonTarget(n),dir=target?(target.x+target.w/2<n.x+n.w/2?-1:1):(n.isFacingLeft?-1:1);
    s.cannon.queue=[];s.cannon.loaded=[false,false];s.cannon.progress=[0,0];
    const b=s.beam={t:0,dir,target,angle:0,x:n.x,y:n.y,clash:0};n.isFacingLeft=dir<0;
    s.action=null;s.charge=0;n.aKeyHeldTime=0;n.chargeProgress=0;n.attackCooldown=132;sgSync(n);
    sgLabel(n,LT('ĐẠI BÁC · CHƯỞNG XOẮN','CANNON · SPIRAL BEAM'));
    visualEffects.push({timer:0,life:145,update(){this.timer++;},draw(){
        if(s.beam!==b||n.hp<=0)return;const p=sgBeamAim(n,b),warm=b.t<12;
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.atan2(p.vy,p.vx));
        if(warm){const R=4+b.t*.65;ctx.strokeStyle='#69e9ff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,R,0,Math.PI*2);ctx.stroke();ctx.restore();return;}
        const fade=Math.min(1,(132-b.t)/8),L=p.length;ctx.globalAlpha=fade;
        ctx.strokeStyle='rgba(105,233,255,.18)';ctx.lineWidth=16;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(L,0);ctx.stroke();
        ctx.strokeStyle='#69e9ff';ctx.lineWidth=6;ctx.stroke();ctx.strokeStyle='#f4ffff';ctx.lineWidth=2;ctx.stroke();
        for(let side=0;side<2;side++)for(let u=0;u<L;u+=36){const phase=u*.045-b.t*.38+side*Math.PI,yy=Math.sin(phase)*12;
            ctx.globalAlpha=fade*(.55+.45*(Math.cos(phase)+1)/2);ctx.fillStyle=side?'#ffb35b':'#a1f6ff';ctx.beginPath();ctx.arc(u,yy,2.5+Math.cos(phase)*.8,0,Math.PI*2);ctx.fill();}
        ctx.restore();
    }});
    if(SFX.tone)SFX.tone(180,.2,'sawtooth',.1,700);
}
// PLAYER_PART_END s7.sgCannonBeam.1

// index.html:100483 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgCannonBeamTick.1 EDITABLE
function sgCannonBeamTick(n){
    const s=sgState(n),b=s.beam;if(!b)return;
    if(n.hp<=0||!sgOn(n)||s.mode!=='cannon'){s.beam=null;return;}
    b.t++;n.x=b.x;n.y=b.y;n.dy=0;n.dashVx=0;n.isCrouching=false;n.isFacingLeft=b.dir<0;
    if(b.t>=12&&b.t<132){
        const p=sgBeamAim(n,b),pulse=(b.t-12)%4===0;
        const beamBox={x:Math.min(p.x,p.ex)-5,y:Math.min(p.y,p.ey)-5,w:Math.abs(p.ex-p.x)+10,h:Math.abs(p.ey-p.y)+10};
        if(pulse&&doChieuCo()&&sgSegmentBox(p.x,p.y,p.ex,p.ey,doChieu,5)!==null)doChieuThu({},beamBox,2);
        for(const o of sgTargets(n))if(sgSegmentBox(p.x,p.y,p.ex,p.ey,o,5)!==null){
            if(pulse)sgDamage(n,o,2,'cannon');
            if(o.hp<=0)continue;
            o.x=Math.max(worldL(),Math.min(worldR()-(o.w||0),o.x+b.dir*6));
            if(o._uFreeze!==undefined)o._uFreeze=Math.max(o._uFreeze||0,6);
            if(o.actionTimer!==undefined)o.actionTimer=Math.max(o.actionTimer||0,10);
        }
        if(b.t%12===0)shakeTimer=Math.max(shakeTimer,3);
    }
    if(b.t>=132){s.beam=null;n.attackCooldown=12;}
}
// PLAYER_PART_END s7.sgCannonBeamTick.1

// index.html:100503 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgCannonMuzzle.1 EDITABLE
function sgCannonMuzzle(n){
    const dir=n.isFacingLeft?-1:1,z=n.getFormScale();
    return {x:n.x+n.w/2+dir*(82*z-n.w/2),y:n.y+(24+(n.isCrouching?12:0))*z,dir};
}
// PLAYER_PART_END s7.sgCannonMuzzle.1

// index.html:100507 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgCannonTarget.1 EDITABLE
function sgCannonTarget(n){
    const live=o=>o&&o.hp>0&&!o.dying;
    let pool=bosses.filter(live);
    if(!pool.length)pool=sgTargets(n).filter(live);
    return pool.reduce((best,o)=>!best||o.hp>best.hp?o:best,null);
}
// PLAYER_PART_END s7.sgCannonTarget.1

// index.html:100513 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgSegmentBox.1 EDITABLE
function sgSegmentBox(x0,y0,x1,y1,b,pad=0){
    let lo=0,hi=1;
    for(const [p,d,min,max] of [[x0,x1-x0,b.x-pad,b.x+(b.w||0)+pad],[y0,y1-y0,b.y-pad,b.y+(b.h||0)+pad]]){
        if(Math.abs(d)<1e-8){if(p<min||p>max)return null;continue;}
        let a=(min-p)/d,z=(max-p)/d;if(a>z)[a,z]=[z,a];lo=Math.max(lo,a);hi=Math.min(hi,z);if(lo>hi)return null;
    }
    return lo;
}
// PLAYER_PART_END s7.sgSegmentBox.1

// index.html:100521 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgBlastDamage.1 EDITABLE
function sgBlastDamage(distance){return Math.max(0,40-8*distance/CM);}
// PLAYER_PART_END s7.sgBlastDamage.1

// index.html:100522 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgCannonBlast.1 EDITABLE
function sgCannonBlast(n,x,y){
    const radius=5*CM;
    for(const o of sgTargets(n)){
        const dx=x-Math.max(o.x,Math.min(x,o.x+(o.w||0))),dy=y-Math.max(o.y,Math.min(y,o.y+(o.h||0)));
        const distance=Math.hypot(dx,dy);if(distance<radius)sgDamage(n,o,sgBlastDamage(distance),'cannon');
    }
    visualEffects.push({timer:0,life:34,update(){this.timer++;},draw(){
        const t=this.timer/this.life,R=radius*Math.min(1,t*3);ctx.save();ctx.globalAlpha=Math.max(0,1-t);
        ctx.fillStyle='rgba(255,131,36,.19)';ctx.beginPath();ctx.arc(x,y,R,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle='#ffbd62';ctx.lineWidth=6*(1-t)+1;ctx.stroke();
        ctx.fillStyle='rgba(255,238,180,.32)';ctx.beginPath();ctx.arc(x,y,R*.38,0,Math.PI*2);ctx.fill();
        for(let i=0;i<14;i++){const a=i*Math.PI*2/14,r=R*(.45+.55*((i*7%11)/11));ctx.fillStyle=i%2?'#ff9a42':'#fff0b3';ctx.fillRect(x+Math.cos(a)*r-3,y+Math.sin(a)*r-3,6,6);}
        ctx.restore();
    }});
    shakeTimer=Math.max(shakeTimer,22);if(SFX.tone)SFX.tone(70,.34,'sawtooth',.23,28);
}
// PLAYER_PART_END s7.sgCannonBlast.1

// index.html:100538 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgFireCannon.1 EDITABLE
function sgFireCannon(n){
    const s=sgState(n),c=s.cannon;
    if(!c.queue.length){n.attackCooldown=20;sgLabel(n,LT('ĐẠI BÁC TRỐNG · NẠP BẰNG SÁT THƯƠNG','CANNON EMPTY · DEAL DAMAGE TO LOAD'));return;}
    const slot=c.queue.shift();c.loaded[slot]=false;c.progress[slot]=0;
    const m=sgCannonMuzzle(n);
    const rocket={timer:0,life:240,x:m.x,y:m.y,angle:m.dir>0?0:Math.PI,target:sgCannonTarget(n),dead:false,
        update(){
            if(this.dead)return;this.timer++;
            if(!this.target||this.target.hp<=0||this.target.dying)this.target=sgCannonTarget(n);
            if(this.target){const want=Math.atan2(this.target.y+this.target.h/2-this.y,this.target.x+this.target.w/2-this.x);let turn=Math.atan2(Math.sin(want-this.angle),Math.cos(want-this.angle));this.angle+=Math.max(-.13,Math.min(.13,turn));}
            const speed=Math.min(14,6+this.timer*.35),nx=this.x+Math.cos(this.angle)*speed,ny=this.y+Math.sin(this.angle)*speed;
            if(sgRocketClash(this,this.x,this.y,nx,ny,40)){this.dead=true;this.timer=this.life;return;}
            let hit=null;
            for(const o of sgTargets(n)){const t=sgSegmentBox(this.x,this.y,nx,ny,o);if(t!==null&&(hit===null||t<hit))hit=t;}
            if(hit!==null){this.x+=(nx-this.x)*hit;this.y+=(ny-this.y)*hit;this.dead=true;sgCannonBlast(n,this.x,this.y);this.timer=this.life;return;}
            this.x=nx;this.y=ny;
            if(this.timer>=this.life){this.dead=true;sgCannonBlast(n,this.x,this.y);}
        },
        draw(){if(this.dead)return;ctx.save();ctx.translate(this.x,this.y);ctx.rotate(this.angle);
            ctx.fillStyle='rgba(255,159,52,.23)';ctx.fillRect(-38,-5,34,10);ctx.fillStyle='#ffb34b';ctx.beginPath();ctx.moveTo(-13,-4);ctx.lineTo(-28-(this.timer%4)*3,0);ctx.lineTo(-13,4);ctx.fill();
            ctx.fillStyle='#dfe7ec';ctx.fillRect(-12,-5,20,10);ctx.strokeStyle='#172330';ctx.lineWidth=1.3;ctx.strokeRect(-12,-5,20,10);
            ctx.fillStyle='#ff7043';ctx.beginPath();ctx.moveTo(8,-5);ctx.lineTo(17,0);ctx.lineTo(8,5);ctx.closePath();ctx.fill();
            ctx.fillStyle='#8196a5';for(const i of [-1,1]){ctx.beginPath();ctx.moveTo(-10,i*3);ctx.lineTo(-17,i*10);ctx.lineTo(-4,i*5);ctx.fill();}
            ctx.fillStyle='#73deef';ctx.fillRect(-7,-2,11,2);ctx.restore();}
    };
    visualEffects.push(rocket);s.cannonKick=14;n.attackCooldown=54;sgSync(n);
    sgLabel(n,LT('ĐẠI BÁC · HOMING','CANNON · HOMING'));if(SFX.tone)SFX.tone(130,.2,'sawtooth',.2,45);
    return rocket;
}
// PLAYER_PART_END s7.sgFireCannon.1

// index.html:100569 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgSwordStart.1 EDITABLE
function sgSwordStart(n,kind,dir){
    const s=sgState(n);
    if(['bladeRush','bladeRise'].includes(kind)&&s.action&&['bladeA','bladeB','bladeX'].includes(s.action.kind)&&s.action.t<3){s.action.t=2;sgSwordTick(n);}
    s.action={kind,t:0,duration:kind==='bladeRush'?60:kind==='bladeCrouch'?12:kind==='bladeHeavy2'?24:22,
        dir:dir||(n.isFacingLeft?-1:1),hits:[new Set(),new Set()],px:n.x,py:n.y};
    s.charge=0;n.aKeyHeldTime=0;n.chargeProgress=0;n.attackCooldown=22;
    if(!n.grounded){s.swordBrake=18;if(n.dy>0)n.dy=Math.min(n.dy,.35);}
    const names={bladeA:'SONG TRẢM I',bladeB:'SONG TRẢM II',bladeX:'GIAO TRẢM',bladeDrop:'SONG KIẾM BỔ',bladeRise:'THĂNG TRẢM',bladeRush:'LIÊN TRẢM',bladeDashX:'LƯỚT GIAO TRẢM',bladeCrouch:'LIÊN TRẢM THẤP',bladeHeavy1:'XOÁY KIẾM I',bladeHeavy2:'XOÁY KIẾM II',bladePlunge:'BỔ KIẾM',bladeTornado:'LỐC KIẾM'};
    sgLabel(n,names[kind]);
    if(SFX.tone)SFX.tone(kind==='bladeX'?520:360,.08,'triangle',.09,110);
}
// PLAYER_PART_END s7.sgSwordStart.1

// index.html:100580 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgSwordJ.1 EDITABLE
function sgSwordJ(n){
    const s=sgState(n);if(s.action)return;
    if(n.isCrouching||((keys.KeyS||keys.ArrowDown)&&n.grounded)){
        sgSwordStart(n,'bladeCrouch');s.action.side=s.next;s.next=1-s.next;
    }else if(!n.grounded){
        const k=s.airStep||0;s.airStep=1-k;sgSwordStart(n,k?'bladePlunge':'bladeA');if(k){s.action.duration=90;s.swordBrake=0;n.dy=15;}
    }else if(frames-s.lastDash<18&&frames-s.lastJ>24){
        sgSwordStart(n,'bladeDashX');dashVx=s.action.dir*Math.max(12,Math.abs(dashVx));s.lastDash=-9999;
    }else{
        if(frames-s.swordAt>48)s.swordStep=0;
        const k=s.swordStep;s.swordStep=(k+1)%3;s.swordAt=frames;
        sgSwordStart(n,k===0?'bladeA':k===1?'bladeB':n.grounded?'bladeX':'bladeDrop');
    }
    s.lastJ=frames;
}
// PLAYER_PART_END s7.sgSwordJ.1

// index.html:100595 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgSwordTick.1 EDITABLE
function sgSwordTick(n){
    const s=sgState(n),a=s.action;
    if(!a||!a.kind.startsWith('blade'))return;
    if(n.hp<=0){s.action=null;return;}
    a.t++;
    const rush=a.kind==='bladeRush',long=a.kind==='bladeDashX',heavy=a.kind.startsWith('bladeHeavy')||a.kind==='bladeTornado',plunge=a.kind==='bladePlunge',crouch=a.kind==='bladeCrouch';
    const active=rush||heavy||plunge||a.t>=3&&a.t<=(crouch?7:11);
    if(active){
        const z=n.getFormScale(),reach=(a.kind==='bladeHeavy2'?112:long?116:88)*z;
        const rise=a.kind==='bladeRise',drop=a.kind==='bladeDrop'||plunge;
        let box={x:a.dir>0?n.x+n.w/2:n.x+n.w/2-reach,y:n.y+(rise?-55:-18)*z,w:reach,h:(rise?105:drop?125:92)*z};
        if(rush||long){ // Swept corridor: targets crossed between frames cannot be missed.
            box={x:Math.min(a.px,n.x)-12*z,y:Math.min(a.py,n.y)-12*z,
                w:Math.abs(n.x-a.px)+n.w+24*z,h:Math.abs(n.y-a.py)+n.h+24*z};
            if(long){box.x-=a.dir<0?reach:0;box.w+=reach;}
        }
        if(heavy){box={x:Math.min(a.px,n.x)+n.w/2-reach,y:n.y+n.h/2-reach*.65,w:Math.abs(n.x-a.px)+2*reach,h:reach*1.3};}
        if(crouch){box.y=n.y+n.h*.35;box.h=Math.max(24,n.h*.65);}
        if(plunge){box.y=Math.min(a.py,n.y);box.h=Math.abs(n.y-a.py)+n.h+75*z;}
        const dmg=a.kind==='bladeTornado'?3:heavy?2.5:crouch?2:['bladeA','bladeB','bladeRise'].includes(a.kind)?2:3;
        doChieuThu(a,box,dmg*(crouch?1:2));
        for(const o of sgTargets(n))if(checkAABB(box,o))for(let i=0;i<2;i++){
            if(crouch&&i!==a.side)continue;
            const id=o.__goc||o;if(a.hits[i].has(id))continue;
            a.hits[i].add(id);sgDamage(n,o,dmg,'sword');
        }
        if(a.t===3||(a.kind==='bladeTornado'&&a.t%6===3)||(rush&&a.t%3===1))sgSwordTrail(n,a);
    }
    a.px=n.x;a.py=n.y;
    if(a.t>=a.duration||(plunge&&n.grounded)||(rush&&a.t>2&&Math.abs(dashVx)<.5)){
        s.action=null;n.attackCooldown=0;
        if(s.kQueued){s.kQueued=false;sgSwordK(n);}
    }
}
// PLAYER_PART_END s7.sgSwordTick.1

// index.html:100629 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgSwordK.1 EDITABLE
function sgSwordK(n){
    const s=sgState(n);
    if(s.action){if(s.action.kind==='bladeHeavy1')s.kQueued=true;return;}
    s.lastK=frames;
    if(!n.grounded){sgSwordStart(n,'bladePlunge');s.action.duration=90;s.swordBrake=0;n.dy=15;s.heavyStep=0;return;}
    const second=s.heavyStep===1&&frames-s.heavyAt<65;
    sgSwordStart(n,second?'bladeHeavy2':'bladeHeavy1');s.heavyStep=second?0:1;s.heavyAt=frames;
    dashVx=s.action.dir*(second?22:7);
}
// PLAYER_PART_END s7.sgSwordK.1

// index.html:100638 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgSwordTrail.1 EDITABLE
function sgSwordTrail(n,a){
    const kind=a.kind,spin=kind.startsWith('bladeHeavy')||kind==='bladeTornado',flat=['bladeA','bladeB','bladeCrouch'].includes(kind),cross=['bladeX','bladeDashX','bladeRush'].includes(kind);
    const r=(kind==='bladeHeavy2'?112:kind==='bladeDashX'?105:82)*n.getFormScale();
    for(let i=0;i<2;i++){
        if(kind==='bladeCrouch'&&i!==a.side)continue;
        const type=spin?'z_spin':kind==='bladeRise'?'z_rise':kind==='bladeDrop'||kind==='bladePlunge'?'z_big':'z_vert';
        const e=new Effect(n.x+n.w/2,n.y+n.h*.5,type,a.dir<0,r*(i?.86:1));
        e.swordCol=i?'#ffb35b':'#69e9ff';e.timer=2;e.life=spin?20:17;
        const draw=e.draw;
        e.draw=function(){ctx.save();ctx.translate(this.x,this.y+(i?4:-4));
            if(flat)ctx.scale(1,.35);else if(cross)ctx.rotate((i?1:-1)*.65);else if(spin)ctx.scale(1,.65);
            if(i&&cross)ctx.scale(1,-1);
            ctx.translate(-this.x,-this.y);draw.call(this);ctx.restore();};
        if(kind!=='bladeRush')e.follow=n;
        visualEffects.push(e);
    }
}
// PLAYER_PART_END s7.sgSwordTrail.1

// index.html:100655 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgDrawSwords.1 EDITABLE
function sgDrawSwords(n,bx,by,P){
    const s=sgState(n),a=s.action,active=a&&a.kind.startsWith('blade');
    for(const i of [1,0]){
        let angle=i?-.18:.18;
        if(active){const t=Math.max(0,Math.min(1,(a.t-(i?1:0))/14)),u=t*t*(3-2*t);
            if(a.kind.startsWith('bladeHeavy')||a.kind==='bladeTornado')angle=-Math.PI/2+Math.PI*2*Math.min(1,a.t/18)+(i?Math.PI:0);
            else if(a.kind==='bladeCrouch')angle=i===a.side?(-1.1+2.2*u):.15;
            else if(['bladeX','bladeDashX','bladeRush'].includes(a.kind))angle=(i?1:-1)*(-1.35+2.7*u);
            else if(a.kind==='bladeDrop'||a.kind==='bladePlunge')angle=-1.65+3*u;
            else if(a.kind==='bladeRise')angle=1.4-3*u;
            else angle=(a.kind==='bladeB'?-1:1)*(-1.3+2.6*u)+(i?.16:0);
        }
        const x=bx+(i?32:28),y=by+(i?22:31)+(n.isCrouching?10:0),col=i?'#ffb35b':'#69e9ff';
        ctx.save();ctx.lineCap='round';ctx.strokeStyle=P.out||'#101820';ctx.lineWidth=7;
        ctx.beginPath();ctx.moveTo(bx+22,by+23);ctx.lineTo(x-7,y+6);ctx.lineTo(x,y);ctx.stroke();
        ctx.strokeStyle=P.lt||'#d58b68';ctx.lineWidth=4;ctx.stroke();
        ctx.translate(x,y);ctx.rotate(angle);
        // Gun receiver remains visible above an elongated under-barrel blade.
        ctx.fillStyle=i?'#bacbd6':'#202e43';ctx.strokeStyle='#09131f';ctx.lineWidth=1.5;
        ctx.beginPath();ctx.moveTo(-6,-7);ctx.lineTo(24,-7);ctx.lineTo(29,-2);ctx.lineTo(27,5);ctx.lineTo(5,5);ctx.lineTo(1,15);ctx.lineTo(-6,12);ctx.lineTo(-2,2);ctx.closePath();ctx.fill();ctx.stroke();
        ctx.fillStyle='#415a6e';ctx.fillRect(0,-10,19,3);ctx.fillStyle=col;ctx.fillRect(4,-5,18,2);
        ctx.fillStyle='#101925';ctx.fillRect(25,-3,5,5);ctx.fillRect(-2,5,4,6);
        ctx.fillStyle=i?'#dce8ef':'#637d99';ctx.beginPath();ctx.moveTo(6,8);ctx.lineTo(59,8);ctx.lineTo(77,0);ctx.lineTo(64,18);ctx.lineTo(13,20);ctx.lineTo(6,16);ctx.closePath();ctx.fill();ctx.stroke();
        ctx.fillStyle=i?'#8199ad':'#30465e';ctx.beginPath();ctx.moveTo(13,11);ctx.lineTo(59,11);ctx.lineTo(68,7);ctx.lineTo(59,15);ctx.lineTo(13,16);ctx.closePath();ctx.fill();
        ctx.strokeStyle=col;ctx.lineWidth=2;ctx.shadowColor=col;ctx.shadowBlur=5;
        ctx.beginPath();ctx.moveTo(13,19);ctx.lineTo(63,17);ctx.lineTo(76,1);ctx.stroke();ctx.shadowBlur=0;
        ctx.fillStyle=col;ctx.fillRect(8,6,3,16);ctx.fillStyle='#effbff';ctx.fillRect(17,9,14,1);ctx.restore();
    }
}
// PLAYER_PART_END s7.sgDrawSwords.1

// index.html:100684 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgDrawCannon.1 EDITABLE
function sgDrawCannon(n,bx,by,P){
    const s=sgState(n),recoil=s.cannonKick*.55,dy=n.isCrouching?12:0;
    ctx.save();if(s.beam){ctx.translate(bx+35,by+24);ctx.rotate(s.beam.angle||0);ctx.translate(-bx-35,-by-24);}
    ctx.translate(bx-(s.beam?0:recoil),by+dy);
    ctx.strokeStyle=P.out||'#101820';ctx.lineWidth=7;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(25,22);ctx.lineTo(38,39);ctx.lineTo(64,32);ctx.stroke();ctx.strokeStyle=P.lt||'#ff8a5c';ctx.lineWidth=4;ctx.stroke();
    ctx.fillStyle='#182837';ctx.strokeStyle='#0a141e';ctx.lineWidth=1.8;
    ctx.beginPath();ctx.moveTo(15,17);ctx.lineTo(28,9);ctx.lineTo(47,9);ctx.lineTo(54,15);ctx.lineTo(78,15);ctx.lineTo(84,20);ctx.lineTo(84,29);ctx.lineTo(76,34);ctx.lineTo(35,34);ctx.lineTo(20,30);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.fillStyle='#637e90';ctx.fillRect(29,13,42,7);ctx.fillStyle='#b7c9d5';ctx.fillRect(37,18,41,3);
    ctx.fillStyle='#314b5b';ctx.fillRect(31,27,43,6);ctx.fillStyle='#101d29';ctx.fillRect(76,17,8,15);
    ctx.strokeStyle='#b8eaf1';ctx.lineWidth=2;ctx.strokeRect(78,18,5,13);
    ctx.fillStyle='#73deef';ctx.fillRect(43,22,29,2);ctx.fillStyle='#ffbc61';ctx.fillRect(23,13,4,16);
    for(let i=0;i<2;i++){ctx.fillStyle=i<s.cannon.queue.length?'#ffc861':'#2b414c';ctx.beginPath();ctx.arc(34+i*8,24,2.5,0,Math.PI*2);ctx.fill();}
    ctx.fillStyle='#253b4a';ctx.fillRect(31,32,6,10);ctx.fillStyle=P.lt||'#ff8a5c';ctx.fillRect(29,33,10,5);
    if(s.cannonKick>9){ctx.fillStyle='#ffe4a0';ctx.beginPath();ctx.moveTo(85,19);ctx.lineTo(110,13);ctx.lineTo(101,24);ctx.lineTo(113,33);ctx.lineTo(85,30);ctx.closePath();ctx.fill();}
    ctx.restore();
}
// PLAYER_PART_END s7.sgDrawCannon.1

// index.html:100701 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgAmmoHud.1 EDITABLE
function sgAmmoHud(n){
    const s=sgState(n);if(s.robot){sgRobotAmmoHud(n);return;}ctx.save();ctx.textAlign='left';ctx.font='bold 11px sans-serif';
    if(s.mode==='pistol'){
        for(let side=0;side<2;side++)for(let i=0;i<6;i++){
            ctx.fillStyle=i<s.rounds[side]?(side?'#ffb35b':'#69e9ff'):'#334652';ctx.fillRect(86+side*88+i*12,56,8,9);
        }
        if(s.reload){ctx.fillStyle='#dbefff';ctx.fillRect(86,68,160*(1-s.reload/84),2);}
    }else{ctx.fillStyle=s.mode==='sword'?'#ffb35b':'#dbefff';ctx.fillText(s.mode==='sword'?LT('SONG KIẾM','GUNBLADES'):LT('ĐẠI BÁC ','CANNON ')+s.cannon.queue.length+'/2',86,65);}
    ctx.restore();
}
// PLAYER_PART_END s7.sgAmmoHud.1

// index.html:100711 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgHud.1 EDITABLE
function sgHud(n,y){
    const s=sgState(n),x=20,w=220;
    if(s.robot){sgRobotHud(n,y);return;}
    if(!Number.isFinite(y))y=hudHangSau()+HUD_HANG+4;
    ctx.save();ctx.fillStyle='rgba(8,19,30,.7)';ctx.fillRect(x,y,w,53);
    const name=LT(({pistol:'SONG SÚNG',sword:'SONG KIẾM',cannon:'ĐẠI BÁC'})[s.mode],({pistol:'PISTOLS',sword:'GUNBLADES',cannon:'CANNON'})[s.mode]);
    ctx.textAlign='left';ctx.font='bold 11px sans-serif';ctx.fillStyle='#e6f1f8';ctx.fillText('Q ‹ '+name+' › E',x+8,y+14);
    ctx.font='10px sans-serif';
    for(let i=0;i<2;i++){ctx.fillStyle=i?'#ffb35b':'#69e9ff';ctx.fillText((i?LT('KIẾM','BLADE'):LT('SÚNG','GUN'))+' '+Math.floor(s.cannon.progress[i])+'/30',x+8,y+29+i*14);}
    // A single rocket, split down its axis: each half fills from the base upwards.
    ctx.translate(x+176,y+5);
    function silhouette(){ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(9,12);ctx.lineTo(9,25);ctx.lineTo(15,35);ctx.lineTo(6,32);ctx.lineTo(6,37);ctx.lineTo(-6,37);ctx.lineTo(-6,32);ctx.lineTo(-15,35);ctx.lineTo(-9,25);ctx.lineTo(-9,12);ctx.closePath();}
    silhouette();ctx.fillStyle='#253b49';ctx.fill();
    ctx.save();ctx.clip();
    for(let i=0;i<2;i++){const p=s.cannon.progress[i]/30;ctx.fillStyle=i?'#ffb35b':'#69e9ff';ctx.fillRect(i?0:-16,37*(1-p),16,37*p);}
    ctx.restore();silhouette();ctx.strokeStyle='#b6cbd9';ctx.lineWidth=1.2;ctx.stroke();
    ctx.beginPath();ctx.moveTo(0,2);ctx.lineTo(0,36);ctx.strokeStyle='#112431';ctx.stroke();
    ctx.textAlign='center';ctx.font='bold 10px sans-serif';ctx.fillStyle='#eff8ff';ctx.fillText(s.cannon.queue.length+'/2',0,46);ctx.restore();
}
// PLAYER_PART_END s7.sgHud.1

// index.html:100731 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRuneLockedBase.1 EDITABLE
const sgRuneLockedBase=runeLocked;
// PLAYER_PART_END s7.sgRuneLockedBase.1

// index.html:100732 · Phạm vi: global
// PLAYER_PART_BEGIN s7.runeLocked.1 EDITABLE
runeLocked=function(id){return currentAmmoType===SG_DAN&&['unity','hover'].includes(id)||sgRuneLockedBase(id);};
// PLAYER_PART_END s7.runeLocked.1

// index.html:100733 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgCleanUnity.1 EDITABLE
function sgCleanUnity(){
    for(let i=0;i<unityPicks.length;i++)if(unityPicks[i]===SG_DAN){
        for(let a=0;a<SG_DAN;a++)if(!unityPicks.includes(a)){unityPicks[i]=a;break;}
    }
}
// PLAYER_PART_END s7.sgCleanUnity.1

// index.html:100738 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgUnityStepBase.1 EDITABLE
const sgUnityStepBase=unityStep;
// PLAYER_PART_END s7.sgUnityStepBase.1

// index.html:100739 · Phạm vi: global
// PLAYER_PART_BEGIN s7.unityStep.1 EDITABLE
unityStep=function(row,dir){sgUnityStepBase(row,dir);if(unityPicks[row]===SG_DAN)sgUnityStepBase(row,dir);};
// PLAYER_PART_END s7.unityStep.1

// index.html:100740 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgUnitySyncBase.1 EDITABLE
const sgUnitySyncBase=unitySync;
// PLAYER_PART_END s7.sgUnitySyncBase.1

// index.html:100741 · Phạm vi: global
// PLAYER_PART_BEGIN s7.unitySync.1 EDITABLE
unitySync=function(){sgCleanUnity();return sgUnitySyncBase();};
// PLAYER_PART_END s7.unitySync.1

// index.html:100742 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgCleanUnity.2 EDITABLE
sgCleanUnity();
// PLAYER_PART_END s7.sgCleanUnity.2

// index.html:100744 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotBob.1 EDITABLE
function sgRobotBob(n){return n.grounded?Math.sin(frames*.22)*1.8:Math.sin(frames*.12)*1.2;}
// PLAYER_PART_END s7.sgRobotBob.1

// index.html:100745 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotPoint.1 EDITABLE
function sgRobotPoint(n,x,y){const d=n.isFacingLeft?-1:1;return {x:n.x+n.w/2+d*1.5*x,y:n.y+n.h+1.5*(-44+sgRobotBob(n)+y),dir:d};}
// PLAYER_PART_END s7.sgRobotPoint.1

// index.html:100746 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotMuzzle.1 EDITABLE
function sgRobotMuzzle(n){const r=sgRobot(n),recoil=r.gunCd>22?(r.gunCd-22)*.85:0;return sgRobotPoint(n,8-recoil+35*Math.cos(-.04),17+35*Math.sin(-.04));}
// PLAYER_PART_END s7.sgRobotMuzzle.1

// index.html:100747 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotSwordPose.1 EDITABLE
function sgRobotSwordPose(n,a,t){
    if(!a)return {shoulderRot:.35+Math.sin(frames*.08)*.04,elbowBend:-.65,wristTilt:.75};
    const u=Math.max(0,Math.min(1,((t??a.t)-2)/14)),e=u*u*(3-2*u);
    const elbowBend=-.4,wristTilt=.8;
    const angle=a.step===2?-Math.PI+e*Math.PI*2:a.step===0?-1.4+e*2.9:-2.5+e*3.5;
    return {shoulderRot:angle+Math.PI/2-elbowBend-wristTilt,elbowBend,wristTilt};
}
// PLAYER_PART_END s7.sgRobotSwordPose.1

// index.html:100754 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotBlade.1 EDITABLE
function sgRobotBlade(n,a,t){
    const p=sgRobotSwordPose(n,a,t),rot=(v,g)=>({x:v.x*Math.cos(g)-v.y*Math.sin(g),y:v.x*Math.sin(g)+v.y*Math.cos(g)});
    function point(x,y){let v=rot({x,y},p.wristTilt);v.x+=12.5;v.y+=.5;v=rot(v,p.elbowBend);v.x+=.5;v.y+=9.5;v=rot(v,p.shoulderRot);return sgRobotPoint(n,v.x-9,v.y*(a&&a.step===2?.45:1)+13);}
    return {base:point(5.8,-9.5),tip:point(2.3,-59.5)};
}
// PLAYER_PART_END s7.sgRobotBlade.1

// index.html:100759 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotSwordSweep.1 EDITABLE
function sgRobotSwordSweep(n,a){
    if(a.t<3||a.t>18)return;
    const dmg=a.step===2?8:6;
    const samples=[];for(let k=0;k<=4;k++)samples.push(sgRobotBlade(n,a,a.t-1+k/4));
    for(const o of sgTargets(n)){
        const id=o.__goc||o;if(a.hit.has(id))continue;
        if(samples.some(v=>sgSegmentBox(v.base.x,v.base.y,v.tip.x,v.tip.y,o,4)!==null)){
            a.hit.add(id);sgDamage(n,o,dmg,'robot');
        }
    }
    if(doChieuCo())for(const v of samples)if(sgSegmentBox(v.base.x,v.base.y,v.tip.x,v.tip.y,doChieu,4)!==null){doChieuThu(a,doChieu,dmg);break;}
    const from=samples[0],to=samples[4];
    visualEffects.push({timer:0,life:9,update(){this.timer++;},draw(){
        const fade=Math.max(0,1-this.timer/this.life);ctx.save();ctx.globalAlpha=fade*.65;ctx.fillStyle='#69e9ff';ctx.beginPath();ctx.moveTo(from.base.x,from.base.y);for(const v of samples)ctx.lineTo(v.tip.x,v.tip.y);ctx.lineTo(to.base.x,to.base.y);ctx.closePath();ctx.fill();
        ctx.globalAlpha=fade;ctx.strokeStyle='#efffff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(from.tip.x,from.tip.y);for(const v of samples)ctx.lineTo(v.tip.x,v.tip.y);ctx.stroke();ctx.restore();
    }});
}
// PLAYER_PART_END s7.sgRobotSwordSweep.1

// index.html:100776 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRocketClash.1 EDITABLE
function sgRocketClash(source,x0,y0,x1,y1,dmg){
    if(!doChieuCo()||sgSegmentBox(x0,y0,x1,y1,doChieu,4)===null)return false;
    return doChieuThu(source,doChieu,dmg);
}
// PLAYER_PART_END s7.sgRocketClash.1

// index.html:100781 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobot.1 EDITABLE
function sgRobot(n){return sgOn(n)&&n.sg&&n.sg.robot||null;}
// PLAYER_PART_END s7.sgRobot.1

// index.html:100782 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotStart.1 EDITABLE
function sgRobotStart(n){
    if(sgRobot(n)||!sgOn(n)||sgState(n).beam||n.hp<=0||gameOver||deathCineActive||ultCharge<100||!sanhChoUlt())return;
    const s=sgState(n),feet=n.y+n.h;
    s.robot={time:1200,armor:10,missiles:20,gunCd:0,missileCd:0,uHold:0,kPrev:!!keys.KeyK,slash:null,step:0,lastK:-9999,queued:false,hover:240,hovering:false,age:0,flash:0};
    s.action=null;s.charge=0;s.reload=0;s.kQueued=false;n.aKeyHeldTime=0;n.chargeProgress=0;n.attackCooldown=0;n.isOverheated=false;n.overheatTimer=0;n.canDoubleJump=false;
    n.w=48;n.h=66;n.y=feet-n.h;ultCharge=0;sgSync(n);sgLabel(n,LT('ROBOT · KÍCH HOẠT','ROBOT · ONLINE'));
    visualEffects.push(new Effect(n.x+n.w/2,n.y+n.h/2,'parry',false,45));
    if(SFX.tone)SFX.tone(160,.35,'sawtooth',.13,900);
}
// PLAYER_PART_END s7.sgRobotStart.1

// index.html:100791 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotEnd.1 EDITABLE
function sgRobotEnd(n,early){
    const s=sgState(n);if(!s.robot)return;const feet=n.y+n.h;
    s.robot=null;s.kPrev=!!keys.KeyK;s.action=null;n.aKeyHeldTime=0;n.chargeProgress=0;n.attackCooldown=12;
    const z=n.getFormScale();n.w=32*z;n.h=44*z;n.y=feet-n.h;n.isCrouching=false;sgSync(n);ultCharge=0;
    visualEffects.push(new Effect(n.x+n.w/2,n.y+n.h/2,'explosion',false,48));
    if(early){n.hp-=1;n.invincible=true;n.invTimer=Math.max(n.invTimer||0,60);n.xuLyChet();}
    sgLabel(n,early?LT('ROBOT KẾT THÚC · -1 HP','ROBOT ENDED · -1 HP'):LT('ROBOT · HẾT THỜI GIAN','ROBOT · TIME UP'));
}
// PLAYER_PART_END s7.sgRobotEnd.1

// index.html:100799 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotAbsorb.1 EDITABLE
function sgRobotAbsorb(n,damage){
    const r=sgRobot(n);if(!r||!(damage>0))return false;
    r.armor=Math.max(0,r.armor-damage);r.flash=12;n.invincible=true;n.invTimer=Math.max(n.invTimer||0,60);
    visualEffects.push(new Effect(n.x+n.w/2,n.y+n.h/2,'parry',false));
    if(!r.armor)sgRobotEnd(n,true);return true;
}
// PLAYER_PART_END s7.sgRobotAbsorb.1

// index.html:100805 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotGun.1 EDITABLE
function sgRobotGun(n){
    const r=sgRobot(n);if(!r||r.gunCd>0)return;
    r.gunCd=30;const m=sgRobotMuzzle(n),dir=m.dir,p=new Projectile(m.x-9,m.y-7,5,0,0,0,dir,n.id);
    p.w=18;p.h=14;p.speed=dir*Math.cos(-.04)*17;p.vy=Math.sin(-.04)*17;p.sgRobotPlasma=true;p.phase=0;
    const update=p.update;p.update=function(){update.call(this);this.phase+=.45;};
    p.draw=function(){ctx.save();ctx.translate(this.x+9,this.y+7);ctx.rotate(this.phase);
        for(let i=0;i<2;i++){ctx.rotate(Math.PI*i);ctx.fillStyle=i?'#ffb35b':'#69e9ff';ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=10;
            ctx.beginPath();ctx.arc(0,0,9,0,Math.PI);ctx.quadraticCurveTo(-1,-5,9,0);ctx.fill();}
        ctx.shadowBlur=0;ctx.strokeStyle='#efffff';ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,9,0,Math.PI*2);ctx.stroke();ctx.restore();
        ctx.save();ctx.strokeStyle='#69e9ff';ctx.lineWidth=2;for(let i=0;i<2;i++){ctx.strokeStyle=i?'#ffb35b':'#69e9ff';ctx.beginPath();for(let j=0;j<24;j++){let x=this.x-dir*j,y=this.y+7+Math.sin(j*.3+this.phase+i*Math.PI)*5;if(j)ctx.lineTo(x,y);else ctx.moveTo(x,y);}ctx.stroke();}ctx.restore();};
    projectiles.push(p);r.gunCd=30;r.flash=4;n.attackCooldown=0;
    if(SFX.tone)SFX.tone(240,.08,'sawtooth',.08,80);
}
// PLAYER_PART_END s7.sgRobotGun.1

// index.html:100818 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotSlash.1 EDITABLE
function sgRobotSlash(n){
    const r=sgRobot(n);if(!r)return;
    if(r.slash){r.queued=true;return;}
    if(frames-r.lastK>60)r.step=0;
    const step=r.step;r.step=(step+1)%3;r.lastK=frames;
    r.slash={step,t:0,hit:new Set(),dir:n.isFacingLeft?-1:1};
}
// PLAYER_PART_END s7.sgRobotSlash.1

// index.html:100825 · Phạm vi: global
// PLAYER_PART_BEGIN s7.sgRobotMissile.1 EDITABLE
function sgRobotMissile(n,slot=0){
    const r=sgRobot(n);if(!r||r.missiles<=0)return;
    const dir=n.isFacingLeft?-1:1,side=slot%2,port=sgRobotPoint(n,-18,5+slot*3.5+(r.uHold>0?-2.5:0));
    const m={timer:0,life:220,x:port.x,y:port.y,angle:(dir>0?-2.1:-1.04)+(slot-1.5)*.12,target:sgCannonTarget(n),dead:false,
        update(){if(this.dead)return;this.timer++;
            if(!this.target||this.target.hp<=0)this.target=sgCannonTarget(n);
            if(this.timer>10){const want=this.target?Math.atan2(this.target.y+this.target.h/2-this.y,this.target.x+this.target.w/2-this.x):(dir>0?0:Math.PI);const turn=Math.atan2(Math.sin(want-this.angle),Math.cos(want-this.angle));this.angle+=Math.max(-.22,Math.min(.22,turn));}
            const speed=this.timer<=10?5:12,nx=this.x+Math.cos(this.angle)*speed,ny=this.y+Math.sin(this.angle)*speed;
            if(sgRocketClash(this,this.x,this.y,nx,ny,4)){this.dead=true;this.timer=this.life;return;}
            let first=null,ht=2;for(const o of sgTargets(n)){const t=sgSegmentBox(this.x,this.y,nx,ny,o);if(t!==null&&t<ht){first=o;ht=t;}}
            if(first){sgDamage(n,first,4,'robot');this.dead=true;this.timer=this.life;visualEffects.push(new Effect(nx,ny,'explosion',false,22));return;}
            this.x=nx;this.y=ny;if(this.timer>=this.life)this.dead=true;
        },draw(){if(this.dead)return;ctx.save();ctx.translate(this.x,this.y);ctx.rotate(this.angle);ctx.fillStyle=side?'#ffb35b':'#69e9ff';ctx.beginPath();ctx.moveTo(-8,-3);ctx.lineTo(-19-this.timer%3*3,0);ctx.lineTo(-8,3);ctx.fill();ctx.fillStyle='#dae8f1';ctx.fillRect(-8,-3,14,6);ctx.fillStyle=side?'#ffb35b':'#69e9ff';ctx.beginPath();ctx.moveTo(6,-3);ctx.lineTo(11,0);ctx.lineTo(6,3);ctx.fill();ctx.restore();}};
    visualEffects.push(m);r.missiles--;r.missileCd=60;sgSync(n);
    if(r.missiles===0)sgRobotEnd(n,false);
}
// PLAYER_PART_END s7.sgRobotMissile.1
