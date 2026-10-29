"""Articulated Ironhaul: connected limbs, real weapon geometry, recovery and silver restrictions."""
import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.add_init_script('requestAnimationFrame=()=>0;')
    page.goto(os.environ.get('DINO_TEST_URL','http://127.0.0.1:8009')+'/games/Dino/index.html')
    page.evaluate('''()=>{
        window.check=(ok,why)=>{if(!ok)throw Error(why);};
        window.near=(a,b,e=.0001)=>Math.abs(a-b)<e;
        window.distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
        window.rigSetup=(silver=false,left=false)=>{
            for(const k in keys)delete keys[k];runeSlots=[null,null];currentPower=0;xDatForm(0);testBossSelection=81;startGame('test_boss');
            IronhaulBoss.setupArena();const b=new IronhaulBoss();bosses.length=0;bosses.push(b);b.phase=2;b.silver=silver;b.resizeVehicle(false);b._hp=silver?50:150;b.maxHp=150;b.idle(9999);b.x=400;b.y=b.baseY;b.grounded=true;b.facingLeft=left;b.attackDir=left?-1:1;
            dino.x=left?180:730;dino.y=320-dino.h;dino.invincible=true;dino.invTimer=99999;return b;
        };
        window.rigStep=b=>{frames++;b.update();b.draw();};
        window.validRig=b=>{
            const g=ironhaulWeapons(b),r=g.rig;
            for(const a of [r.sword,r.off]){
                check(near(distance(a.root,a.joint),34)&&near(distance(a.joint,a.end),35),'arm detaches or stretches');
                check(near(distance(a.end,a.hand),11),'hand detaches from wrist');
            }
            for(const l of r.legs)check(near(distance(l.hip,l.knee),40)&&near(distance(l.knee,l.ankle),44),'leg detaches or stretches');
            check(near(g.grip.x,b.cx()+b.dir()*r.sword.hand.x)&&near(g.grip.y,b.y+b.h+r.sword.hand.y),'weapon leaves hand');
            check(near(distance(g.grip,g.tip),(b.slash?.reach||112)*(1-r.fold*.65)),'blade collider length differs from mesh');
            check(g.shieldPoints.every(p=>p.x>=g.shieldBox.x-.001&&p.x<=g.shieldBox.x+g.shieldBox.w+.001&&p.y>=g.shieldBox.y-.001&&p.y<=g.shieldBox.y+g.shieldBox.h+.001),'shield collider misses mesh');
            return g;
        };
    }''')
    print(page.evaluate('''()=>{
        const motion={elbow:[],wrist:[],knee:[],chest:[]};let sampled=0;
        for(const silver of [false,true])for(const left of [false,true]){
            const moves=rigSetup(silver,left).legalMoves();
            for(const move of moves){
                const b=rigSetup(silver,left);b.begin(move);
                for(let i=0;i<400;i++){
                    rigStep(b);if(!b.vehicle){const r=validRig(b).rig;motion.elbow.push(r.sword.joint.x);motion.wrist.push(r.sword.angle);motion.knee.push(r.legs[1].knee.x);motion.chest.push(r.chest.x);sampled++;}
                    if(b.silver)check(!b.vehicle,'silver morphs while fighting');
                    if(b.state==='idle')break;
                }
                check(b.state==='idle'&&!b.slash&&!b.shieldStrike,'attack does not fully release');
            }
        }
        for(const [name,values] of Object.entries(motion))check(Math.max(...values)-Math.min(...values)>(name==='wrist'?2:8),'static '+name);
        return 'PASS '+sampled+' articulated poses: invariant arm/leg lengths, moving elbows/wrists/hips/knees, hand-attached blades/shields and finite recovery';
    }'''))
    print(page.evaluate('''()=>{
        const b=rigSetup(true);b.begin('ih_silvercombo');b.shieldSwing('spin',28);
        const yaw=[],centres=[];
        for(const age of [0,7,14,21,28]){b.shieldStrike.age=age;const g=validRig(b);yaw.push(g.rig.yaw);centres.push(g.shield.x-b.cx());}
        check(yaw[0]>.99&&yaw[2]<-.99&&yaw[4]>.99,'body never turns around');
        check(Math.max(...centres)>30&&Math.min(...centres)<-30,'shield never sweeps both sides');
        b.shieldStrike=null;b.begin('ih_cleaver'); // forbidden in silver
        check(b.state==='ih_silvercombo','silver accepts gunblade moves');
        const c=rigSetup();c.begin('ih_cleaver');
        for(const [kind,reach,life] of [['cut',128,18],['thrust',130,15]]){
            c.swing(kind,reach,life);
            for(let age=0;age<=life;age++){c.slash.age=age;c.slash.angle=c.slash.a0+(c.slash.a1-c.slash.a0)*ironhaulEase(age/life);const r=validRig(c).rig;check(distance(r.sword.hand,r.off.hand)<26,'two-handed '+kind+' loses support hand');}
        }
        const a=rigSetup(true);a.begin('ih_parry');a.subTimer=27;const ga=validRig(a);a.facingLeft=true;a.attackDir=-1;const gb=validRig(a);
        for(const key of ['grip','tip','shield','gun'])check(near(ga[key].x-a.cx(),-(gb[key].x-a.cx()))&&near(ga[key].y,gb[key].y),'left/right rig mismatch '+key);
        return 'PASS full-body shield turn, front/back sweep, two-handed heavy grip and mirrored weapon geometry';
    }'''))
    print(page.evaluate('''()=>{
        for(const left of [false,true]){
            let b=rigSetup(false,left);b.begin('ih_combo');b.swing('cut',112,14);b.slash.age=4;b.slash.angle=b.slash.a0+(b.slash.a1-b.slash.a0)*ironhaulEase(4/14);
            const g=ironhaulWeapons(b);dino.w=dino.h=8;dino.x=g.tip.x-4;dino.y=g.tip.y-4;
            let count=0;dino.takeDamage=()=>count++;dino.isShielding=()=>false;
            for(let i=0;i<18;i++){frames++;b.tickSlash();}
            check(count===1,'swept physical blade misses or repeatedly hits '+count);
            b=rigSetup(true,left);b.begin('ih_silvercombo');b.shieldSwing('spin',28);b.shieldStrike.age=8;
            const h=ironhaulWeapons(b);dino.w=dino.h=8;dino.x=h.shield.x-4;dino.y=h.shield.y-4;
            count=0;dino.takeDamage=()=>count++;dino.isShielding=()=>false;
            for(let i=0;i<30;i++){frames++;b.tickShield();}
            check(count===1,'shield mesh does not hit once '+count);
        }
        const b=rigSetup();b.begin('ih_barrage');b.subTimer=30;const g=ironhaulWeapons(b);b.shoot();let bullet=bossProjectiles.at(-1);
        check(near(bullet.x,g.gun.x)&&near(bullet.y,g.gun.y),'round does not start at barrel');
        check(near(Math.atan2(bullet.vy,bullet.vx),g.gunAngle),'barrel and shot aim differ');
        const c=rigSetup(true);c.begin('ih_aegis');c.subTimer=29;frames++;c.update();let shield=bossProjectiles.find(q=>q.ihKind==='shield');
        const hand=ironhaulWeapons(c).shield;check(shield&&distance({x:shield.x+shield.w/2,y:shield.y+shield.h/2},hand)<1,'throw does not start at hand');
        for(let i=0;i<100;i++){frames++;shield.update();if(shield.x>worldR()+1000)break;}
        check(c.shieldOut===0&&shield.x>worldR()+1000,'shield does not return to hand');
        return 'PASS real blade/shield sweeps hit exactly once; rounds follow barrel, shield releases and returns at the hand';
    }'''))
    print(page.evaluate('''()=>{
        const b=rigSetup();b.begin('ih_combo');b.swing('cut',112,14);b.slash.age=13;b.slash.angle=b.slash.a0+(b.slash.a1-b.slash.a0)*ironhaulEase(13/14);
        frames++;b.tickSlash();const end=ironhaulWeapons(b);frames++;const next=ironhaulWeapons(b);
        check(distance(end.grip,next.grip)<8&&distance(end.tip,next.tip)<16,'blade snaps back after swing');
        const c=rigSetup(true);c.begin('ih_reversal');c.shieldSwing('spin',32);c.shieldStrike.age=31;
        frames++;c.tickShield();const finish=ironhaulWeapons(c);frames++;const recover=ironhaulWeapons(c);
        check(distance(finish.shield,recover.shield)<10,'shield snaps back after spin');
        for(const old of ['ih_morph','ih_unfold','ih_ram']){
            const n=rigSetup(true);const hp=n.hp;check(!n.begin(old),'silver accepts truck action '+old);check(n.resizeVehicle(true)===false&&!n.vehicle,'silver resize becomes truck');
            n.state=old;n.vehicle=true;n.update();check(!n.vehicle&&n.state==='idle'&&n.hp===hp,'stale action restores truck '+old);
        }
        check(!_loiKhung.size,'caught frame errors');
        for(const left of [false,true]){
            const n=rigSetup(false,left),dir=left?-1:1,target=dino.x+dino.w/2;n.begin('ih_flank');
            for(let i=0;i<55;i++){const x=n.x;rigStep(n);check(Math.abs(n.x-x)<=16.001,'flank teleports');}
            check((n.cx()-target)*dir>60&&n.attackDir===-dir,'vault does not cross and face target');
        }
        const guard=rigSetup(true);guard.begin('ih_advance');for(let i=0;i<79;i++)rigStep(guard);
        check(guard.shieldStrike?.kind==='spin'&&!guard.vehicle,'silver approach never chains into shield');
        return 'PASS smooth weapon recovery and silver rejects AI, direct and interrupted vehicle transformations';
    }'''))
    assert not errors,errors
    browser.close()
