"""Supplied Vergil boss extension: combos, pacing, collisions and phase lifecycle.

Run with the repository HTTP server at DINO_TEST_URL (default port 8000).
Requires Python Playwright and Chromium.
"""
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1100, 'height': 800})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.add_init_script('window.requestAnimationFrame=()=>0;')
    page.goto(os.environ.get('DINO_TEST_URL', 'http://127.0.0.1:8000')+'/games/Dino/index.html')
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        window.vgbSetup=function(stage=1){
            for(const k of Object.keys(keys))delete keys[k];
            xDatForm(0);startGame('normal');paused=true;setupVergilArena();
            dino.x=350;dino.y=320-dino.h;dino.grounded=true;dino.invincible=true;dino.invTimer=99999;
            const b=new VergilBoss(1);b.x=500;b.y=b.baseY;b.phase=1;b.stage=stage;b.state='idle';
            b.hp=b.maxHp=1000;b.actionTimer=99999;bosses.push(b);return b;
        };
        window.vgbStep=function(b,n=1){for(let i=0;i<n;i++){frames++;b.update();b.draw();}};
        const snapshot=JSON.stringify(YMT_MOVES),execute=vgBossTriggerStepHit;
        let events=[];
        try{
            vgBossTriggerStepHit=function(b,s,m,i){events.push({id:m.id,index:i,t:s.tick,wind:m.wind});return execute(b,s,m,i);};
            for(const stage of [1,2,3])for(const [id,pattern] of Object.entries(VERGIL_BOSS_STRINGS)){
                const b=vgbSetup(stage),visited=new Set();events=[];let recovery=0;
                check(b.startAttackerString(id),'cannot start '+id);
                for(let i=0;i<600&&b._atkString;i++){
                    if(b._atkString.phase==='sheathe')recovery++;
                    else if(b._atkString.phase==='step')visited.add(b._atkString.index);
                    // Follow the boss at a safe distance so moves finish their sequence instead of legitimately disengaging.
                    dino.x=Math.max(20,Math.min(940,b.x+(b.facingLeft?-105:105)));dino.y=320-dino.h;
                    vgbStep(b);
                    if(b._atkPose)check(Object.values(b._atkPose).every(v=>typeof v!=='number'||Number.isFinite(v)),'invalid pose '+id);
                }
                check(!b._atkString&&!b._atkPose&&!b._atkMove&&b.state==='idle','combo stuck '+stage+'.'+id);
                check(visited.size===pattern.moves.length&&recovery===pattern.sheathePause,'missing steps/recovery '+id);
                check(b._nextMeleeStr>frames,'missing melee cooldown '+id);
                for(const move of pattern.moves){
                    const m=vgBossGetMoveDef(move),actual=events.filter(e=>e.id===move);
                    const expected=m.isJCut||m.spawnRoundTrip||m.slam?1:m.count||m.hits?.length||0;
                    const occurrences=pattern.moves.filter(x=>x===move).length;
                    check(actual.length===expected*occurrences,'lost hit events '+stage+'.'+id+'.'+move+' '+actual.length);
                    check(actual.every(e=>e.t>e.wind),'damage before windup '+id+'.'+move);
                }
            }
        }finally{vgBossTriggerStepHit=execute;}
        check(JSON.stringify(YMT_MOVES)===snapshot,'boss mutated player moves');
        for(const [id,src] of Object.entries(YMT_MOVES)){
            const m=vgBossGetMoveDef(id);
            check(m.wind>=src.wind+2&&m.T>=src.T+3,'missing boss reaction time '+id);
            if(src.hits)check(m.hits.every((v,i)=>v-src.hits[i]===m.wind-src.wind),'hit delay not synchronized '+id);
        }
        return 'PASS 8 full combo strings at all 3 human stages, shared poses/data, warnings and recovery';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        let b=vgbSetup();b.x=650;dino.x=100;b.pickSkill();
        check(b._atkString?.id==='triple_jcut','far AI does not select new strings');
        b=vgbSetup();b.startAttackerString('ymt_combo_a');
        let hits=0;b.hurtP=()=>hits++;
        for(let i=0;i<16;i++)vgbStep(b);
        check(!hits&&b._atkString.phase==='step','warp startup damages player');
        b=vgbSetup();b.startAttackerString('ymt_combo_a');b._atkString.phase='step';
        dino.x=400;vgbStep(b,8);dino.x=900;
        for(let i=0;i<60&&b._atkString?.phase!=='sheathe';i++)vgbStep(b);
        check(b._atkString?.phase==='sheathe','boss keeps chasing escaped player');
        check(danteBossOpening(b)&&danteControlAllowed(b),'sheathe is not a counterattack opening');
        // Finishing a close string leaves an opening, then picks a ranged skill.
        b=vgbSetup();b.startAttackerString('ymt_combo_a');
        for(let i=0;i<400&&b._atkString;i++)vgbStep(b);
        check(b.state==='idle','no idle opening');b.pickSkill();
        check(!b._atkString&&['v_swords','v_jcut','v_void'].includes(b.state),'no ranged break after combo');
        // A direct hit and its lingering slash share one collision path.
        b=vgbSetup();b.x=400;b.facingLeft=false;dino.x=455;dino.y=280;
        const m=vgBossGetMoveDef('a1'),st={dir:1};hits=0;b.hurtP=()=>hits++;
        vgBossTriggerStepHit(b,st,m,0);check(hits===1&&b.slash.hit,'immediate strike missing');
        const rect=b.slashRect();check(checkAABB(dino,rect),'slash volume differs from immediate hit');
        for(let i=0;i<5;i++)vgbStep(b);check(hits===1,'same swing hits twice');
        b=vgbSetup();b.x=400;b.facingLeft=false;dino.x=600;hits=0;b.hurtP=()=>hits++;
        vgBossTriggerStepHit(b,st,m,0);check(!hits&&!b.slash.hit,'off-target sword hits');
        dino.x=455;vgbStep(b);check(hits===1,'lingering slash never hits');
        // Iframes and guard stop launch, as well as health damage.
        b=vgbSetup();b.x=400;b.facingLeft=false;dino.x=455;dino.grounded=true;dino.dy=0;
        vgBossTriggerStepHit(b,st,vgBossGetMoveDef('upper1'),0);
        check(dino.grounded&&dino.dy===0,'uppercut bypassed iframe');
        // A Round Trip expires, and cannot damage after death or phase transition.
        b=vgbSetup();vgBossTriggerStepHit(b,st,vgBossGetMoveDef('m_round'),0);
        check(b._atkFx.roundSword,'Round Trip not spawned');vgbStep(b,96);check(!b._atkFx.roundSword,'Round Trip never expires');
        for(const phase of [1,2]){
            b=vgbSetup();vgBossTriggerStepHit(b,st,vgBossGetMoveDef('m_round'),0);
            b._atkFx.roundSword.x=dino.x;b._atkFx.roundSword.y=dino.y;hits=0;b.hurtP=()=>hits++;
            if(phase===1)b.hp=0;else b.startPhase2();
            vgbStep(b);check(!b._atkFx.roundSword&&!hits,'dead/SDT boss leaves active Round Trip');
        }
        return 'PASS native AI pacing, escape window, single collision, iframe launch exclusion and Round Trip cleanup';
    }'''))
    print(page.evaluate('''() => {
        function check(ok,why){if(!ok)throw Error(why);}
        let b=vgbSetup(2);b.x=500;b.facingLeft=true;
        b.dop={x:0,y:0,left:false,drawn:false,armR:0,slash:null};
        b.hist=[{x:500,y:b.y,left:true,drawn:false,armR:0}];
        b.dop.slash={dir:-1,reach:60,up:0,t:5,hit:false};dino.x=525;dino.y=b.y;
        let hits=0;b.hurtP=()=>hits++;b.tickDop();
        check(b.dop.x===584&&b.dop.y===b.y-12&&hits===1,'Doppelganger visible body/hitbox disagree');
        b.dop.slash=null;b.dopEv=[{t:1,kind:'slash',d:{life:9,dir:-1,reach:60,up:0}}];b.tickDop();
        check(b.dop.slash.dir===-1,'Doppelganger slash faces away from its body');
        // Shared renderers remain intact: base attack state must survive drawing.
        b=vgbSetup();b.startAttackerString('mirage_twin');vgbStep(b,20);
        b.cuts=[{x:300,y:250,r:64,t:20,warn:28,dmg:1,boom:0}];
        b._voidFx={x:300,y:250,t:20,max:32};b.jce={x:350,t:20,max:40};
        b.dome={x:350,t:20,max:40,r:150};b.dim={y:250,t:20,max:40,go:false};
        const refs=[b.cuts,b._voidFx,b.jce,b.dome,b.dim,b.slash],drawn=b.drawn,mirage=b.mirageWep;
        b.draw();check(refs.every((o,i)=>o===[b.cuts,b._voidFx,b.jce,b.dome,b.dim,b.slash][i])&&b.drawn===drawn&&b.mirageWep===mirage,'draw mutated combat state');
        // An internal stage change must cancel the new combo before the next frame.
        b=vgbSetup();b.startAttackerString('ymt_combo_a');b.hp=640;vgbStep(b);
        check(b.stage===2&&b.state==='stagein'&&!b._atkString,'stage transition leaked combo');
        vgbStep(b,75);check(!b.invulnAll&&b.dop,'stage 2 transition stuck');
        b.hp=290;vgbStep(b);check(b.stage===3&&b.state==='stagein','stage 3 transition broken');vgbStep(b,75);
        // SDT, cinematic ultimate and exhausted human recovery keep the engine lifecycle.
        b=vgbSetup();b.startAttackerString('ymt_combo_a');b.startPhase2();vgbStep(b);
        check(b.phase===2&&!b._atkString,'SDT did not cancel melee');
        b.hp=20;for(let i=0;i<900&&!b.sdtUltXong;i++)vgbStep(b);
        check(b.sdtUltXong&&b.phase===1&&b.suYeu>0&&b.spd()===.5,'SDT ultimate -> exhausted human lifecycle broken');
        b.pickSkill();check(!b._atkString,'exhausted boss bypassed original AI');
        check(_loiKhung.size===0,'frame errors');
        return 'PASS Doppelganger alignment, transparent render state, stage changes, SDT ultimate and exhaustion';
    }'''))
    assert not errors, errors
    browser.close()
