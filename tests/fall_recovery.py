"""Pit rescue: all forms rebound high, keep steering, and land on real terrain."""
import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.add_init_script('requestAnimationFrame=()=>0;')
    page.goto(os.environ.get('DINO_TEST_URL','http://127.0.0.1:8000')+'/games/Dino/index.html')
    print(page.evaluate('''()=>{
        function check(ok,why){if(!ok)throw Error(why);}
        window.fallSetup=(form,map='forest')=>{
            for(const k of Object.keys(keys))delete keys[k];runeSlots=[null,null];phuKien=0;currentPower=0;
            xDatForm(form);startGame('normal');mapTheme=map;camX=camY=0;WORLD_W=1000;
            platforms.length=0;platforms.push({x:0,w:220,top:320,h:80},{x:780,w:220,top:320,h:80},{x:10,w:100,top:210,h:16});
            dino.x=480;dino.y=650;dino.dy=8;dino.grounded=false;dino.invincible=true;dino.invTimer=99999;
            return dino;
        };
        window.fallStep=()=>{frames++;dino.update();xTick();danteTick();};
        for(const map of ['forest','volcano','dinhnui'])for(let form=0;form<11;form++){
            const n=fallSetup(form,map);fallStep();
            check(n._fallRecovery&&n.dy<-14,'no strong rebound '+map+' form '+form);
            check(n.dropTimer===0&&n.canDoubleJump&&!n.grounded,'rescue keeps drop/ground lock '+form);
            const support=n._fallRecovery.platform;check(support&&support.solid!==false,'no real safe platform '+form);
            const startX=n.x;keys.KeyD=true;for(let i=0;i<4;i++)fallStep();keys.KeyD=false;
            check(n.x>startX,'no steering after rebound '+form);
            let minFeet=n.y+n.h,landed=false;
            for(let i=0;i<160;i++){fallStep();minFeet=Math.min(minFeet,n.y+n.h);if(n.grounded){landed=true;break;}}
            check(minFeet<support.top-220,'rescue does not launch high enough '+form);
            check(landed&&Math.abs(n.y+n.h-support.top)<4,'rescue never lands '+map+' form '+form);
            for(let i=0;i<90;i++)fallStep();check(n.grounded&&n.y+n.h<345,'repeated automatic falling '+form);
        }
        for(const form of [0,7,8,9,10]){
            const n=fallSetup(form);n.y=360-n.h;fallStep();
            check(n._fallRecovery&&n.dy<-14,'form waits until far below the pit to rebound '+form);
        }
        // The original fixed Apex x=90 is deliberately a hole here.
        for(let color=0;color<5;color++){
            const n=fallSetup(8);apexSetColor(color);platforms.length=0;platforms.push({x:500,w:400,top:320,h:80},{x:820,w:100,top:210,h:16});
            n.x=60;fallStep();check(n.x>=500&&n.dy<-14,'Apex still returns to the fixed hole '+color);
            for(let i=0;i<170;i++)fallStep();check(n.grounded&&n.x>=500,'Apex variant falls repeatedly '+color);
        }
        return 'PASS all 11 forms on forest/volcano/mountain: high rebound, steering, real landing, no repeated fall; all five Apex variants escape the old fixed respawn hole';
    }'''))
    print(page.evaluate('''()=>{
        function check(ok,why){if(!ok)throw Error(why);}
        for(const form of [0,7,8,9,10]){
            const n=fallSetup(form);fallStep();const support=n._fallRecovery.platform;
            let landed=false;
            for(let i=0;i<120;i++){
                for(const p of platforms)p.x-=2;
                fallStep();
                if(n.grounded){landed=true;break;}
            }
            check(landed&&n.x+n.w>support.x+5&&n.x<support.x+support.w-5,'scrolling terrain moves away during rescue '+form);
        }
        for(const form of [9,10]){
            const n=fallSetup(form);const state=form===9?n.dante:n.vergil;
            state.attack={id:'helm',kind:'slam',age:0,T:100,end:100,wind:90,duration:100,dir:1,sword:form===9};
            state.queue=[{key:'J'}];fallStep();
            check(!state.attack&&n.dy<-14,'plunge immediately overrides rebound '+form);
            for(let i=0;i<90;i++)fallStep();check(n.grounded,'plunge falls repeatedly '+form);
        }
        for(const map of ['forest','volcano','dinhnui']){
            const n=fallSetup(0,map);n.maxHp=n.hp=10;n.invincible=false;n.invTimer=0;fallStep();
            check(n.hp===(map==='forest'?7:8),'existing fall damage changed '+map);
            const hp=n.hp;for(let i=0;i<100;i++)fallStep();check(n.hp===hp&&n.grounded,'fall charges damage again before landing '+map);
        }
        const n=fallSetup(8);n.maxHp=n.hp=8;n.invincible=false;n.invTimer=0;fallStep();check(n.hp===6,'Apex fall penalty changed');
        // Underwater depth and Tetris platforms retain their own movement rules.
        for(const form of [0,7,8,9,10]){
            const water=fallSetup(form,'ocean');water._fallRecovery=null;water.y=390;water.dy=2;fallStep();
            check(!water._fallRecovery,'underwater descent is treated as a pit '+form);
        }
        check(_loiKhung.size===0,'caught frame errors');
        return 'PASS scrolling platforms, downward-attack cancellation, original fall damage, one penalty per fall and underwater exclusion';
    }'''))
    assert not errors,errors
    browser.close()
