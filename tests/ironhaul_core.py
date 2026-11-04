"""Ironhaul proportions, directional energy rendering and finite core-powered sword skills."""
import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.add_init_script('requestAnimationFrame=()=>0;')
    page.goto(os.environ.get('DINO_TEST_URL','http://127.0.0.1:8009')+'/games/Dino/index.html')
    page.evaluate('''()=>{
        window.check=(ok,why)=>{if(!ok)throw Error(why);};
        window.near=(a,b,e=.001)=>Math.abs(a-b)<e;
        window.dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
        window.coreSetup=(silver=false,left=false)=>{
            for(const k in keys)delete keys[k];runeSlots=[null,null];currentPower=0;xDatForm(0);testBossSelection=81;startGame('test_boss');IronhaulBoss.setupArena();
            const b=new IronhaulBoss();bosses.length=0;bosses.push(b);b.phase=2;b.silver=silver;b.resizeVehicle(false);b._hp=silver?50:150;b.maxHp=150;b.idle(9999);b.x=400;b.y=b.baseY;b.facingLeft=left;b.attackDir=left?-1:1;
            dino.x=left?130:790;dino.y=320-dino.h;dino.invincible=true;dino.invTimer=99999;return b;
        };
        window.coreStep=b=>{frames++;b.update();b.draw();};
    }''')
    print(page.evaluate('''()=>{
        for(const silver of [false,true])for(const left of [false,true]){
            const b=coreSetup(silver,left),r=ironhaulRig(b);
            check(r.sword.joint.y>r.sword.root.y+20&&r.sword.end.x>r.sword.joint.x+15,'elbow bends upward/backwards in rest pose');
            check(r.off.joint.y>r.off.root.y+20&&r.off.end.x>r.off.joint.x+15,'offhand elbow inverted');
            check(r.pelvis.y<-90&&dist(r.pelvis,r.chest)<40,'torso not shortened');
            for(const l of r.legs){
                const a=dist(l.hip,l.knee),c=dist(l.knee,l.ankle),chord=dist(l.hip,l.ankle),angle=Math.acos((a*a+c*c-chord*chord)/(2*a*c))*180/Math.PI;
                check(a+c>=84-.001&&angle>150&&l.knee.y>l.hip.y&&l.ankle.y>l.knee.y,'legs remain short / crouched / reversed');
            }
            check(ironhaulWeapons(b).tip.y<322,'resting sword clips below road');
            b.begin('ih_parry');b.subTimer=27;const g=ironhaulWeapons(b);
            check(g.shieldBox.h>95&&g.shieldBox.w>78,'shield was not enlarged');
        }
        return 'PASS natural downward elbows, longer standing legs, shorter torso, enlarged held shield and resting blade above ground';
    }'''))
    print(page.evaluate('''()=>{
        // Inspect actual rendered pixels. The crescent mass and streaks must trail its travel vector.
        function centroid(q){
            ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,180,180);q.x=90-q.w/2;q.y=90-q.h/2;q.draw();
            const data=ctx.getImageData(0,0,180,180).data;let weight=0,x=0,y=0;
            for(let py=0;py<180;py++)for(let px=0;px<180;px++){const a=data[(py*180+px)*4+3];weight+=a;x+=(px+.5)*a;y+=(py+.5)*a;}
            ctx.restore();check(weight>0,'empty projectile rendering');return {x:x/weight-90,y:y/weight-90};
        }
        for(const kind of ['wave','energy'])for(const dir of [-1,1])for(const vy of [0,3,-3]){
            const b=coreSetup(false,dir<0);b.coreBuff=480;const q=kind==='wave'?ironhaulRound(b,90,90,dir*7,vy,'wave'):ironhaulEnergySlash(b,{x:90,y:90});q.vx=dir*7;q.vy=vy;
            const c=centroid(q);check(c.x*q.vx+c.y*q.vy<-4,'crescent faces away from travel '+kind+' '+dir+' '+vy);
            const x=q.x+q.w/2,y=q.y+q.h/2;q.update();check(near(q.x+q.w/2-x,q.vx)&&near(q.y+q.h/2-y,q.vy),'render direction differs from movement');
            q.vx=-q.vx;const reflected=centroid(q);check(reflected.x*q.vx+reflected.y*q.vy<-4,'reflected wave keeps old facing');
        }
        return 'PASS actual crescent pixels face both horizontal / diagonal travel directions and flip after reflection';
    }'''))
    print(page.evaluate('''()=>{
        for(const silver of [false,true])for(const left of [false,true]){
            const b=coreSetup(silver,left),hp=b.hp;b.chooseAttack();check(b.state==='ih_overcharge','core skill never selected');
            for(let i=0;i<71;i++)coreStep(b);check(!b.coreBuff&&!bossProjectiles.some(p=>p.ihKind==='energy'),'core power activates before charge');
            coreStep(b);check(b.coreBuff===480&&b.coreCd>0,'core does not grant finite 8-second buff');
            for(let i=0;i<23;i++)coreStep(b);check(!bossProjectiles.some(p=>p.ihKind==='energy'),'charged slash fires before swing');
            coreStep(b);const first=bossProjectiles.filter(p=>p.ihKind==='energy');check(first.length===1,'core release missing');
            const g=ironhaulWeapons(b),origin={x:g.grip.x+(g.tip.x-g.grip.x)*.6,y:g.grip.y+(g.tip.y-g.grip.y)*.6};
            check(dist(first[0].spawn,origin)<.01&&Math.sign(first[0].vx)===b.attackDir,'energy detached from blade / facing');
            for(let i=0;i<35;i++)coreStep(b);check(b.hp===hp&&b.state==='idle'&&!b.slash,'core skill never recovers / heals boss');
            bossProjectiles.length=0;b.begin('ih_bladefan');for(let i=0;i<143;i++)coreStep(b);
            const fan=bossProjectiles.filter(p=>p.ihKind==='energy');check(fan.length===3&&fan.every(p=>Math.sign(p.vx)===b.attackDir),'fan does not send 3 forward cuts');
            check(b.arcCd>0,'fan has no cooldown');
            b.actionTimer=9999;const remaining=b.coreBuff;for(let i=0;i<remaining;i++)coreStep(b);check(b.coreBuff===0,'buff lasts forever');
            check(!b.vehicle,'core skill turns robot into truck');
        }
        return 'PASS both robot forms × both directions: visible charge before 8-second buff, blade-attached release, 3-cut fan, cooldowns, expiry, no healing / truck form';
    }'''))
    print(page.evaluate('''()=>{
        for(const powered of [false,true]){
            const b=coreSetup();b.coreBuff=powered?300:0;b.begin('ih_combo');b.swing('thrust',130,16);b.slash.age=5;b.slash.angle=-.08;
            const g=ironhaulWeapons(b);dino.w=dino.h=8;dino.x=g.tip.x-4;dino.y=g.tip.y-4;let damage=0;
            dino.isShielding=()=>false;dino.takeDamage=n=>damage+=n;
            for(let i=0;i<20;i++){frames++;b.tickSlash();}
            check(damage===(powered?2:1),'core buff has wrong melee damage '+damage);
        }
        const b=coreSetup();b.coreBuff=300;b.coreCd=300;b.begin('ih_bladefan');for(let i=0;i<73;i++)coreStep(b);check(b.coreBuff>0&&b.slash&&bossProjectiles.some(p=>p._ironhaulOwner===b),'phase-change fixture inactive');b.hp=50;b.combatTick();
        check(b.silver&&!b.coreBuff&&!b.slash&&!bossProjectiles.some(p=>p._ironhaulOwner===b),'phase change leaves old core attack');
        check(!_loiKhung.size,'caught native errors');
        return 'PASS buff changes physical sword damage 1 → 2 once per swing; silver transition cancels old energy state';
    }'''))
    assert not errors,errors
    browser.close()
